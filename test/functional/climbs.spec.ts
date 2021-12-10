import chaiHttp from "chai-http";
import app from '../../src/app';
import chai, { expect } from 'chai';
import { setupServer } from "../utils";
import { BoulderEntry, SportEntry, TopeRopeEntry, TradEntry } from "../../src/models/climbs.model";
import { connect } from "../../src/db/db";

chai.use(chaiHttp);

const mockClimbs = require('../../mockdata/climbs');

describe.only('/climbs functional tests', () => {
    before(setupServer);

    beforeEach(async () => {
        const client = await connect()
        await client.db('tracker').collection('climbs').deleteMany({})
        await client.db('tracker').collection('climbs').insertMany(mockClimbs)
    })

    afterEach(async () => {
        const client = await connect()
        await client.db('tracker').collection('climbs').deleteMany({})
    })


    describe('POST', () => {
        describe('POST /climbs/trad', () => {
            const validEntry: TradEntry = {
                date: '2021-11-25',
                isOutdoors: true,
                climbName: "super crack",
                climbingAreaName: "new river gorge",
                grade: "5.8",
                style: "onsight",
                cragName: "some crag",
                type: "trad"
            }

            it('should successfully add a trad climb', async () => {
                const res = await chai.request(app)
                    .post('/climbs/trad')
                    .send(validEntry)

                const { status, body } = res;
                expect(status).to.equal(201);
                expect(body).to.deep.include(validEntry)
                expect(body).to.have.property('_id')
            });
        });

        describe('POST /climbs/sport', () => {
            const validEntry: SportEntry = {
                date: '2021-11-25',
                isOutdoors: true,
                climbName: "super crack",
                climbingAreaName: "new river gorge",
                grade: "5.8",
                style: "onsight",
                cragName: "some crag",
                type: "sport"
            }

            it('should successfully add a sport climb', async () => {
                const res = await chai.request(app)
                    .post('/climbs/sport')
                    .send(validEntry)

                const { status, body } = res;
                expect(status).to.equal(201);
                expect(body).to.deep.include(validEntry)
                expect(body).to.have.property('_id')
            });
        });

        describe('POST /climbs/top_rope', () => {
            const validEntry: TopeRopeEntry = {
                date: '2021-11-25',
                isOutdoors: true,
                climbName: "super crack",
                climbingAreaName: "new river gorge",
                grade: "5.8",
                style: "onsight",
                cragName: "some crag",
                type: "top rope"
            }

            it('should successfully add a top rope climb', async () => {
                const res = await chai.request(app)
                    .post('/climbs/top_rope')
                    .send(validEntry)

                const { status, body } = res;
                expect(status).to.equal(201);
                expect(body).to.deep.include(validEntry)
                expect(body).to.have.property('_id')
            });
        });

        describe('POST /climbs/boulder', () => {
            const validEntry: BoulderEntry = {
                date: '2021-11-25',
                isOutdoors: true,
                climbName: "super crack",
                climbingAreaName: "new river gorge",
                type: "boulder",
                grade: "v0",
                style: "send",
                boulderName: "whale boulder"
            }

            it('should successfully add a boulder problem', async () => {
                const res = await chai.request(app)
                    .post('/climbs/boulder')
                    .send(validEntry)

                const { status, body } = res;
                expect(status).to.equal(201);
                expect(body).to.deep.include(validEntry)
                expect(body).to.have.property('_id')
            });
        });



        it('should fail if the url does not contain a valid climb type', async () => {
            const res = await chai.request(app)
                .post('/climbs/invalidUrl')
                .send({})

            const { status } = res;
            expect(status).to.equal(404);
        });
    })
})