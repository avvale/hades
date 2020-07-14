import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateSummaryController } from './update-summary.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';

describe('UpdateSummaryController', () => 
{
    let controller: UpdateSummaryController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                UpdateSummaryController
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

        controller  = module.get<UpdateSummaryController>(UpdateSummaryController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateSummaryController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateSummaryController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a summary created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(summaries[0])));
            expect(await controller.main(summaries[0])).toBe(summaries[0]);
        });
    });
});