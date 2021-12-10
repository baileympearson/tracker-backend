import chaiHttp from "chai-http";
import app from '../../src/app';
import chai, { expect } from 'chai';
import { setupServer } from "../utils";
import { CaffeineEntry } from "../../src/models/caffeine.model";
import { connect } from "../../src/db/db";

chai.use(chaiHttp);

const mockCaffeineData = require('../../mockdata/caffeine');

describe('/caffeine functional tests', () => {
    before(setupServer);

    beforeEach(async () => {
        const client = await connect()
        await client.db('tracker').collection('caffeine').deleteMany({})
        await client.db('tracker').collection('caffeine').insertMany(mockCaffeineData)
    })

    afterEach(async () => {
        const client = await connect()
        await client.db('tracker').collection('caffeine').deleteMany({})
    })

    describe('POST', () => {
        describe('POST /caffeine', () => {
            const invalidEntries: Partial<CaffeineEntry>[] = [
                {},
                { value: 'decaf' },
                { numericValue: .5 }
            ]
            invalidEntries.forEach(entry => {
                it(`fails when the entry is ${entry}`, async () => {
                    const invalidEntry: Partial<CaffeineEntry> = entry
                    const res = await chai.request(app)
                        .post('/caffeine')
                        .send(invalidEntry)
                    const { body, status } = res;
                    expect(status).to.equal(400);
                    expect(body).to.deep.equal({
                        error: "malformed request"
                    })
                });
            })

            const validEntry: CaffeineEntry = {
                date: '2021-11-25',
                value: 'full caffeine',
                numericValue: 1
            }

            it('should successfully add the document', async () => {
                const res = await chai.request(app)
                    .post('/caffeine')
                    .send(validEntry)

                const { status } = res;
                const body = res.body as CaffeineEntry
                expect(status).to.equal(201);
                expect(body).to.deep.include(validEntry);
                expect(body).to.have.property('_id')
            });
        });
    })

    describe('GET', () => {
        describe('GET /', () => {
            it('with no filter options, it returns everything in db', async () => {
                const res = await chai.request(app)
                    .get('/caffeine')
                    .send({})
                const { status } = res;
                const body = res.body
                expect(status).to.equal(200);
                expect(body).to.have.property('length').to.equal(mockCaffeineData.length)
            });

            it('returns all the entries for a given day', async () => {
                const res = await chai.request(app)
                    .get('/caffeine')
                    .send({ date: "2021-12-07" })

                const { status } = res;
                const body = res.body
                expect(status).to.equal(200);
                expect(body).to.have.property('length').to.equal(3)
            });
        });

        describe('GET /totalCaffeine', () => {
            it('return the total if the days exist and no mg caffeine specified', async () => {
                const res = await chai.request(app)
                    .get('/caffeine/totalCaffeine')
                    .send({ date: "2021-12-07" })

                const { status } = res;
                const body = res.body
                expect(status).to.equal(200);
                expect(body.total).to.equal(2)
            });

            it('return the total of 0 if the date DNE in the database', async () => {
                const res = await chai.request(app)
                    .get('/caffeine/totalCaffeine')
                    .send({ date: "2019-12-07" })

                const { status } = res;
                const body = res.body
                expect(status).to.equal(200);
                expect(body.total).to.equal(0)
            });

            it('return the total mg of caffeine if returnMgCaffeine is set to true', async () => {
                const res = await chai.request(app)
                    .get('/caffeine/totalCaffeine')
                    .send({ date: "2021-12-07", returnMgCaffeine: true })

                const { status } = res;
                const body = res.body
                expect(status).to.equal(200);
                expect(body.total).to.equal(280)
            });
        });
    })
})