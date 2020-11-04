import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateJobDetailResolver } from './cci-update-job-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsDetail } from '@hades/cci/job-detail/infrastructure/seeds/job-detail.seed';
import { CciUpdateJobDetailInput } from './../../../../graphql';

describe('CciUpdateJobDetailResolver', () => 
{
    let resolver: CciUpdateJobDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciUpdateJobDetailResolver,
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

        resolver  = module.get<CciUpdateJobDetailResolver>(CciUpdateJobDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciUpdateJobDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciUpdateJobDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a jobDetail created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsDetail[0])));
            expect(await resolver.main(<CciUpdateJobDetailInput>jobsDetail[0])).toBe(jobsDetail[0]);
        });
    });
});