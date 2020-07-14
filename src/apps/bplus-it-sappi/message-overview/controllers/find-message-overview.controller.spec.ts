import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindMessageOverviewController } from './find-message-overview.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/bplus-it-sappi/message-overview/infrastructure/seeds/message-overview.seed';

describe('FindMessageOverviewController', () => 
{
    let controller: FindMessageOverviewController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                FindMessageOverviewController
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

        controller  = module.get<FindMessageOverviewController>(FindMessageOverviewController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindMessageOverviewController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindMessageOverviewController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a messageOverview', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesOverview[0])));
            expect(await controller.main([])).toBe(messagesOverview[0]);
        });
    });
});