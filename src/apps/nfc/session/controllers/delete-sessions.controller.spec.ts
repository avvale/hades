import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSessionsController } from './delete-sessions.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';

describe('DeleteSessionsController', () => 
{
    let controller: DeleteSessionsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteSessionsController
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

        controller  = module.get<DeleteSessionsController>(DeleteSessionsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteSessionsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteSessionsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an sessions deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sessions)));
            expect(await controller.main([])).toBe(sessions);
        });
    });
});