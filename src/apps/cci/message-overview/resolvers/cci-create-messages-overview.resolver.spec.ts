import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateMessagesOverviewResolver } from './cci-create-messages-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';
import { CciCreateMessageOverviewInput } from './../../../../graphql';

describe('CciCreateMessagesOverviewResolver', () =>
{
    let resolver: CciCreateMessagesOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateMessagesOverviewResolver,
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

        resolver    = module.get<CciCreateMessagesOverviewResolver>(CciCreateMessagesOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateMessagesOverviewResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciCreateMessagesOverviewResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an messagesOverview created', async () =>
        {
            expect(await resolver.main(<CciCreateMessageOverviewInput[]>messagesOverview)).toBe(true);
        });
    });
});