import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateJobDetailResolver } from './create-job-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsDetail } from '@hades/bplus-it-sappi/job-detail/infrastructure/seeds/job-detail.seed'
import { BplusItSappiCreateJobDetailInput } from './../../../../../src/graphql';

describe('CreateJobDetailResolver', () => 
{
    let resolver: CreateJobDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateJobDetailResolver,
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

        resolver    = module.get<CreateJobDetailResolver>(CreateJobDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateJobDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateJobDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an jobDetail created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsDetail[0])));
            expect(await resolver.main(<BplusItSappiCreateJobDetailInput>jobsDetail[0])).toBe(jobsDetail[0]);
        });
    });
});