import chaiHttp from "chai-http";
import app from '../../src/app';
import chai, { expect } from 'chai';
import { setupServer } from "../utils";


chai.use(chaiHttp);

describe('health functional tests', () => {
    before(setupServer);

    describe('/GET healthcheck', () => {
        it('it should return healthy', (done) => {
            chai.request(app)
                .get('/healthcheck')
                .end((err, res) => {
                    const { body, status } = res;
                    expect(status).to.equal(200);
                    expect(body).to.deep.equal({ hello: "world" })
                    done();
                });
        });
    });
})