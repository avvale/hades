import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateSessionController } from './update-session.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';

describe('UpdateSessionController', () => 
{
    let controller: UpdateSessionController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                UpdateSessionController
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

        controller  = module.get<UpdateSessionController>(UpdateSessionController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateSessionController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateSessionController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a session created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sessions[0])));
            expect(await controller.main(sessions[0])).toBe(sessions[0]);
        });
    });
});