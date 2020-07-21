import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateSummariesController } from './create-summaries.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';

describe('CreateSummariesController', () => 
{
    let controller: CreateSummariesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CreateSummariesController
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

        controller  = module.get<CreateSummariesController>(CreateSummariesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CreateSummariesController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an summaries created', async () => 
        {
            expect(await controller.main(summaries)).toBe(undefined);
        });
    });
});