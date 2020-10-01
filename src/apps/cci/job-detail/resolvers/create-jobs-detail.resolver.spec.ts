import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateJobsDetailResolver } from './create-jobs-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsDetail } from '@hades/cci/job-detail/infrastructure/seeds/job-detail.seed';
import { CciCreateJobDetailInput } from './../../../../graphql';

describe('CreateJobsDetailResolver', () => 
{
    let resolver: CreateJobsDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateJobsDetailResolver,
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

        resolver    = module.get<CreateJobsDetailResolver>(CreateJobsDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateJobsDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateJobsDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an jobsDetail created', async () => 
        {
            expect(await resolver.main(<CciCreateJobDetailInput[]>jobsDetail)).toBe(true);
        });
    });
});