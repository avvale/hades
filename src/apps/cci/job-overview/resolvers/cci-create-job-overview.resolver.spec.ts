import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateJobOverviewResolver } from './cci-create-job-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/cci/job-overview/infrastructure/seeds/job-overview.seed';
import { CciCreateJobOverviewInput } from './../../../../graphql';

describe('CciCreateJobOverviewResolver', () =>
{
    let resolver: CciCreateJobOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateJobOverviewResolver,
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

        resolver    = module.get<CciCreateJobOverviewResolver>(CciCreateJobOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateJobOverviewResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciCreateJobOverviewResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an jobOverview created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsOverview[0])));
            expect(await resolver.main(<CciCreateJobOverviewInput>jobsOverview[0])).toBe(jobsOverview[0]);
        });
    });
});