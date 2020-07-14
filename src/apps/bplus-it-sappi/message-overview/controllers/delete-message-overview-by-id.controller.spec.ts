import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteMessageOverviewByIdController } from './delete-message-overview-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { messagesOverview } from '@hades/bplus-it-sappi/message-overview/infrastructure/seeds/message-overview.seed'

describe('DeleteMessageOverviewByIdController', () => 
{
    let controller: DeleteMessageOverviewByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteMessageOverviewByIdController
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

        controller  = module.get<DeleteMessageOverviewByIdController>(DeleteMessageOverviewByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteMessageOverviewByIdController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteMessageOverviewByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an messageOverview deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messagesOverview[0])));
            expect(await controller.main(messagesOverview[0].id)).toBe(messagesOverview[0]);
        });
    });
});