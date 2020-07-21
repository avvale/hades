import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateMessagesDetailResolver } from './create-messages-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesDetail } from '@hades/bplus-it-sappi/message-detail/infrastructure/seeds/message-detail.seed';
import { BplusItSappiCreateMessageDetailInput } from './../../../../../src/graphql';

describe('CreateMessagesDetailResolver', () => 
{
    let resolver: CreateMessagesDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateMessagesDetailResolver,
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

        resolver    = module.get<CreateMessagesDetailResolver>(CreateMessagesDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateMessagesDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateMessagesDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an messagesDetail created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateMessageDetailInput[]>messagesDetail)).toBe(true);
        });
    });
});