import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciGetMessagesDetailResolver } from './cci-get-messages-detail.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesDetail } from '@hades/cci/message-detail/infrastructure/seeds/message-detail.seed';

describe('CciGetMessagesDetailResolver', () => 
{
    let resolver:   CciGetMessagesDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciGetMessagesDetailResolver,
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

        resolver    = module.get<CciGetMessagesDetailResolver>(CciGetMessagesDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciGetMessagesDetailResolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        test('CciGetMessagesDetailResolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a messagesDetail', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesDetail)));
            expect(await resolver.main()).toBe(messagesDetail);
        });
    });
});