import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateMessagesOverviewResolver } from './create-messages-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';
import { CciCreateMessageOverviewInput } from './../../../../graphql';

describe('CreateMessagesOverviewResolver', () => 
{
    let resolver: CreateMessagesOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateMessagesOverviewResolver,
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

        resolver    = module.get<CreateMessagesOverviewResolver>(CreateMessagesOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateMessagesOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateMessagesOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an messagesOverview created', async () => 
        {
            expect(await resolver.main(<CciCreateMessageOverviewInput[]>messagesOverview)).toBe(true);
        });
    });
});