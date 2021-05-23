import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateMessagesDetailResolver } from './cci-create-messages-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesDetail } from '@hades/cci/message-detail/infrastructure/seeds/message-detail.seed';
import { CciCreateMessageDetailInput } from './../../../../graphql';

describe('CciCreateMessagesDetailResolver', () =>
{
    let resolver: CciCreateMessagesDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateMessagesDetailResolver,
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

        resolver    = module.get<CciCreateMessagesDetailResolver>(CciCreateMessagesDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateMessagesDetailResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciCreateMessagesDetailResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an messagesDetail created', async () =>
        {
            expect(await resolver.main(<CciCreateMessageDetailInput[]>messagesDetail)).toBe(true);
        });
    });
});