import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateMessageOverviewResolver } from './cci-update-message-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';
import { CciUpdateMessageOverviewInput } from './../../../../graphql';

describe('CciUpdateMessageOverviewResolver', () =>
{
    let resolver: CciUpdateMessageOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciUpdateMessageOverviewResolver,
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

        resolver    = module.get<CciUpdateMessageOverviewResolver>(CciUpdateMessageOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciUpdateMessageOverviewResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciUpdateMessageOverviewResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a messageOverview created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesOverview[0])));
            expect(await resolver.main(<CciUpdateMessageOverviewInput>messagesOverview[0])).toBe(messagesOverview[0]);
        });
    });
});