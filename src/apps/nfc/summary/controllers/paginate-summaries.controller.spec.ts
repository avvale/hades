import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateSummariesController } from './paginate-summaries.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';

describe('PaginateSummariesController', () => 
{
    let controller: PaginateSummariesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                PaginateSummariesController
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

        controller  = module.get<PaginateSummariesController>(PaginateSummariesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('PaginateSummariesController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('PaginateSummariesController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a summaries', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(summaries)));
            expect(await controller.main([], [])).toBe(summaries);
        });
    });
});