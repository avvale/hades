import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetMessagesOverviewResolver } from './get-messages-overview.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/bplus-it-sappi/message-overview/infrastructure/seeds/message-overview.seed';

describe('GetMessagesOverviewResolver', () => 
{
    let resolver:   GetMessagesOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetMessagesOverviewResolver,
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

        resolver    = module.get<GetMessagesOverviewResolver>(GetMessagesOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('GetMessagesOverviewResolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        it('GetMessagesOverviewResolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        it('should return a messagesOverview', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesOverview)));
            expect(await resolver.main([])).toBe(messagesOverview);
        });
    });
});