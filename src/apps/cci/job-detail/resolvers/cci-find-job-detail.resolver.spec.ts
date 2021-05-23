import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindJobDetailResolver } from './cci-find-job-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsDetail } from '@hades/cci/job-detail/infrastructure/seeds/job-detail.seed';

describe('CciFindJobDetailResolver', () =>
{
    let resolver: CciFindJobDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciFindJobDetailResolver,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {},
                    }
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {},
                    }
                },
            ]
        }).compile();

        resolver    = module.get<CciFindJobDetailResolver>(CciFindJobDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciFindJobDetailResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciFindJobDetailResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a jobDetail', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsDetail[0])));
            expect(await resolver.main()).toBe(jobsDetail[0]);
        });
    });
});