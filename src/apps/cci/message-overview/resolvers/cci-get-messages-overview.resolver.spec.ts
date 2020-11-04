import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciGetMessagesOverviewResolver } from './cci-get-messages-overview.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';

describe('CciGetMessagesOverviewResolver', () => 
{
    let resolver:   CciGetMessagesOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciGetMessagesOverviewResolver,
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

        resolver    = module.get<CciGetMessagesOverviewResolver>(CciGetMessagesOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciGetMessagesOverviewResolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        test('CciGetMessagesOverviewResolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a messagesOverview', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesOverview)));
            expect(await resolver.main()).toBe(messagesOverview);
        });
    });
});