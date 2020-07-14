import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateJobsDetailResolver } from './paginate-jobs-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsDetail } from '@hades/bplus-it-sappi/job-detail/infrastructure/seeds/job-detail.seed';

describe('PaginateJobsDetailResolver', () => 
{
    let resolver: PaginateJobsDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateJobsDetailResolver,
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

        resolver    = module.get<PaginateJobsDetailResolver>(PaginateJobsDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('PaginateJobsDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('PaginateJobsDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a jobsDetail', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsDetail)));
            expect(await resolver.main([], [])).toBe(jobsDetail);
        });
    });
});