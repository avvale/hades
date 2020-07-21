import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateSummariesResolver } from './create-summaries.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';
import { NfcCreateSummaryInput } from './../../../../graphql';

describe('CreateSummariesResolver', () => 
{
    let resolver: CreateSummariesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSummariesResolver,
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

        resolver    = module.get<CreateSummariesResolver>(CreateSummariesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateSummariesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateSummariesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an summaries created', async () => 
        {
            expect(await resolver.main(<NfcCreateSummaryInput[]>summaries)).toBe(true);
        });
    });
});