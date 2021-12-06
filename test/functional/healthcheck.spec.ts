import chaiHttp from "chai-http";
import app from '../../src/app';
import chai, { expect } from 'chai';
import { setupServer } from "../utils";


chai.use(chaiHttp);

describe('caffeine functional tests', () => {
    before(setupServer);

    describe('/GET book', () => {
        it('it should GET all the books', (done) => {
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