import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateSummaryResolver } from './create-summary.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';
import { NfcCreateSummaryInput } from './../../../../graphql';

describe('CreateSummaryResolver', () => 
{
    let resolver: CreateSummaryResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSummaryResolver,
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

        resolver    = module.get<CreateSummaryResolver>(CreateSummaryResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateSummaryResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateSummaryResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an summary created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(summaries[0])));
            expect(await resolver.main(<NfcCreateSummaryInput>summaries[0])).toBe(summaries[0]);
        });
    });
});