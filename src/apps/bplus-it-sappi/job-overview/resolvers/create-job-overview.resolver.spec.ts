import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateJobOverviewResolver } from './create-job-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/bplus-it-sappi/job-overview/infrastructure/seeds/job-overview.seed';
import { BplusItSappiCreateJobOverviewInput } from './../../../../graphql';

describe('CreateJobOverviewResolver', () => 
{
    let resolver: CreateJobOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateJobOverviewResolver,
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

        resolver    = module.get<CreateJobOverviewResolver>(CreateJobOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateJobOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateJobOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an jobOverview created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsOverview[0])));
            expect(await resolver.main(<BplusItSappiCreateJobOverviewInput>jobsOverview[0])).toBe(jobsOverview[0]);
        });
    });
});