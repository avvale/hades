import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateSummaryResolver } from './update-summary.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';
import { NfcUpdateSummaryInput } from './../../../../graphql';

describe('UpdateSummaryResolver', () => 
{
    let resolver: UpdateSummaryResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateSummaryResolver,
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

        resolver  = module.get<UpdateSummaryResolver>(UpdateSummaryResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('UpdateSummaryResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('UpdateSummaryResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a summary created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(summaries[0])));
            expect(await resolver.main(<NfcUpdateSummaryInput>summaries[0])).toBe(summaries[0]);
        });
    });
});