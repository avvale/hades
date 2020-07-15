import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateMessagesDetailResolver } from './paginate-messages-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesDetail } from '@hades/bplus-it-sappi/message-detail/infrastructure/seeds/message-detail.seed';

describe('PaginateMessagesDetailResolver', () => 
{
    let resolver: PaginateMessagesDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateMessagesDetailResolver,
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

        resolver    = module.get<PaginateMessagesDetailResolver>(PaginateMessagesDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('PaginateMessagesDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('PaginateMessagesDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a messagesDetail', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesDetail)));
            expect(await resolver.main([], [])).toBe(messagesDetail);
        });
    });
});