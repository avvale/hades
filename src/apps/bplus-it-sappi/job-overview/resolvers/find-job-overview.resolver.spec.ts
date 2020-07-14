import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindJobOverviewResolver } from './find-job-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/bplus-it-sappi/job-overview/infrastructure/seeds/job-overview.seed';

describe('FindJobOverviewResolver', () => 
{
    let resolver: FindJobOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindJobOverviewResolver,
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

        resolver    = module.get<FindJobOverviewResolver>(FindJobOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindJobOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindJobOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a jobOverview', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsOverview[0])));
            expect(await resolver.main([])).toBe(jobsOverview[0]);
        });
    });
});