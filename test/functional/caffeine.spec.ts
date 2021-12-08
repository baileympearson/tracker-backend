import chaiHttp from "chai-http";
import app from '../../src/app';
import chai, { expect } from 'chai';
import { setupServer } from "../utils";
import { CaffeineEntry } from "../../src/models/caffeine.model";

chai.use(chaiHttp);

describe('/caffeine functional tests', () => {
    before(setupServer);

    describe('POST', () => {
        describe('POST /caffeine', () => {
            const invalidEntries: Partial<CaffeineEntry>[] = [
                {},
                { value: 'decaf' },
                { numericValue: .5 }
            ]
            invalidEntries.forEach(entry => {
                it('it fails when the entry is empty', (done) => {
                    const invalidEntry: Partial<CaffeineEntry> = {}
                    chai.request(app)
                        .post('/caffeine')
                        .send(invalidEntry)
                        .end((err, res) => {
                            const { body, status } = res;
                            expect(status).to.equal(400);
                            expect(body).to.deep.equal({
                                error: "malformed request"
                            })
                            done();
                        });
                });
            })

            const validEntry: CaffeineEntry = {
                date: '2021-11-25',
                value: 'full caffeine',
                numericValue: 1
            }

            it('should successfully add the document', (done) => {
                chai.request(app)
                    .post('/caffeine')
                    .send(validEntry)
                    .end((err, res) => {
                        const { status } = res;
                        const body = res.body as CaffeineEntry
                        expect(status).to.equal(201);
                        expect(body.date).to.equal(validEntry.date)
                        expect(body.numericValue).to.equal(validEntry.numericValue)
                        expect(body.value).to.equal(validEntry.value)
                        expect(body).to.have.property('_id')
                        done();
                    });
            });
        });
    })

    describe('GET', () => {
        describe('GET /totalCaffeine', () => {
            it('return the total if the days exist and no mg caffeine specified', (done) => {
                chai.request(app)
                    .get('/caffeine/totalCaffeine')
                    .send({ date: "2021-12-07"})
                    .end((err, res) => {
                        const { status } = res;
                        const body = res.body 
                        expect(status).to.equal(200);
                        expect(body.total).to.equal(2)
                        done();
                    });
            });

            it('return the total of 0 if the date DNE in the database', (done) => {
                chai.request(app)
                    .get('/caffeine/totalCaffeine')
                    .send({ date: "2019-12-07"})
                    .end((err, res) => {
                        const { status } = res;
                        const body = res.body 
                        expect(status).to.equal(200);
                        expect(body.total).to.equal(0)
                        done();
                    });
            });

            it('return the total mg of caffeine if returnMgCaffeine is set to true', (done) => {
                chai.request(app)
                    .get('/caffeine/totalCaffeine')
                    .send({ date: "2021-12-07", returnMgCaffeine: true })
                    .end((err, res) => {
                        const { status } = res;
                        const body = res.body 
                        expect(status).to.equal(200);
                        expect(body.total).to.equal(280)
                        done();
                    });
            });
        });
    })
})