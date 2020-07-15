import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertMessagesDetailResolver } from './insert-messages-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesDetail } from '@hades/bplus-it-sappi/message-detail/infrastructure/seeds/message-detail.seed';
import { BplusItSappiCreateMessageDetailInput } from './../../../../../src/graphql';

describe('InsertMessagesDetailResolver', () => 
{
    let resolver: InsertMessagesDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertMessagesDetailResolver,
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

        resolver    = module.get<InsertMessagesDetailResolver>(InsertMessagesDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertMessagesDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertMessagesDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an messagesDetail created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateMessageDetailInput[]>messagesDetail)).toBe(true);
        });
    });
});