import { expect } from 'chai';
import Sinon, { mock, SinonStub } from 'sinon';
import caffeineService from '../../src/db/caffeine.db';

describe.only('caffeine db test', () => {
    const sandbox = Sinon.createSandbox()
    const mockCollection = {
        aggregate: () => mockCollection,
        toArray: () => Promise.resolve([]) 
    } 

    let handlers: any;

    before(() => {
        sandbox.spy(mockCollection)
        handlers = caffeineService(mockCollection as any);
    })

    afterEach(() => sandbox.reset())

    describe.skip('totalCaffeinePerDay tests', () => {
        it('defaults to numeric value', async () => {
            const { totalCaffeinePerDay } = handlers;     

            const result = await totalCaffeinePerDay("test day")

            expect(result).to.deep.equal([])
            expect((mockCollection.aggregate as any).called).to.be.true
            const args = (mockCollection.aggregate as any).lastCall.lastArg
            expect(args.length).to.equal(2)
        });

        it('defaults to can calculate the mg of caffeine', async () => {
            const { totalCaffeinePerDay } = handlers;     

            const result = await totalCaffeinePerDay("test day", { returnMgCaffeine: true })

            expect(result).to.deep.equal([])
            expect((mockCollection.aggregate as any).called).to.be.true
            const args = (mockCollection.aggregate as any).lastCall.lastArg
            expect(args.length).to.equal(2)
        });
    })
});