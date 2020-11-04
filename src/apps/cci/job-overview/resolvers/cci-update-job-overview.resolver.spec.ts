import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateJobOverviewResolver } from './cci-update-job-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/cci/job-overview/infrastructure/seeds/job-overview.seed';
import { CciUpdateJobOverviewInput } from './../../../../graphql';

describe('CciUpdateJobOverviewResolver', () => 
{
    let resolver: CciUpdateJobOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciUpdateJobOverviewResolver,
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

        resolver  = module.get<CciUpdateJobOverviewResolver>(CciUpdateJobOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciUpdateJobOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciUpdateJobOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a jobOverview created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsOverview[0])));
            expect(await resolver.main(<CciUpdateJobOverviewInput>jobsOverview[0])).toBe(jobsOverview[0]);
        });
    });
});