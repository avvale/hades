import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSummariesController } from './delete-summaries.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed'

describe('DeleteSummariesController', () => 
{
    let controller: DeleteSummariesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteSummariesController
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

        controller  = module.get<DeleteSummariesController>(DeleteSummariesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteSummariesController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteSummariesController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an summaries deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(summaries)));
            expect(await controller.main([])).toBe(summaries);
        });
    });
});