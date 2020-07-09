import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSummaryByIdController } from './delete-summary-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed'

describe('DeleteSummaryByIdController', () => 
{
    let controller: DeleteSummaryByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteSummaryByIdController
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

        controller  = module.get<DeleteSummaryByIdController>(DeleteSummaryByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteSummaryByIdController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteSummaryByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an summary deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(summaries[0])));
            expect(await controller.main(summaries[0].id)).toBe(summaries[0]);
        });
    });
});