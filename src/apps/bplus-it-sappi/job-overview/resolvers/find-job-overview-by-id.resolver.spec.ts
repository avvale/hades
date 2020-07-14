import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindJobOverviewByIdResolver } from './find-job-overview-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/bplus-it-sappi/job-overview/infrastructure/seeds/job-overview.seed'

describe('FindJobOverviewByIdResolver', () => 
{
    let resolver: FindJobOverviewByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindJobOverviewByIdResolver,
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

        resolver    = module.get<FindJobOverviewByIdResolver>(FindJobOverviewByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindJobOverviewByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindJobOverviewByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an jobOverview by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsOverview[0])));
            expect(await resolver.main(jobsOverview[0].id)).toBe(jobsOverview[0]);
        });
    });
});