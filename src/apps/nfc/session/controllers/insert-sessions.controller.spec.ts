import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertSessionsController } from './insert-sessions.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';

describe('InsertSessionsController', () => 
{
    let controller: InsertSessionsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                InsertSessionsController
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

        controller  = module.get<InsertSessionsController>(InsertSessionsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertSessionsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertSessionsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an sessions created', async () => 
        {
            expect(await controller.main(sessions)).toBe(undefined);
        });
    });
});