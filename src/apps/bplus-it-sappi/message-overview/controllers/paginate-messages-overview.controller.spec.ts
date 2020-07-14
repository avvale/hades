import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateMessagesOverviewController } from './paginate-messages-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/bplus-it-sappi/message-overview/infrastructure/seeds/message-overview.seed';

describe('PaginateMessagesOverviewController', () => 
{
    let controller: PaginateMessagesOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                PaginateMessagesOverviewController
            ],
            providers: [
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

        controller  = module.get<PaginateMessagesOverviewController>(PaginateMessagesOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('PaginateMessagesOverviewController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('PaginateMessagesOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a messagesOverview', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesOverview)));
            expect(await controller.main([], [])).toBe(messagesOverview);
        });
    });
});