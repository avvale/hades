import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciDeleteJobsDetailResolver } from './cci-delete-jobs-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsDetail } from '@hades/cci/job-detail/infrastructure/seeds/job-detail.seed';

describe('CciDeleteJobsDetailResolver', () =>
{
    let resolver: CciDeleteJobsDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciDeleteJobsDetailResolver,
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

        resolver    = module.get<CciDeleteJobsDetailResolver>(CciDeleteJobsDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciDeleteJobsDetailResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciDeleteJobsDetailResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an jobsDetail deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsDetail)));
            expect(await resolver.main()).toBe(jobsDetail);
        });
    });
});