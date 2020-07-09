import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetSessionsController } from './get-sessions.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed'

describe('GetSessionsController', () => 
{
    let controller: GetSessionsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                GetSessionsController
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

        controller  = module.get<GetSessionsController>(GetSessionsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('GetSessionsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('GetSessionsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a sessions', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sessions)));
            expect(await controller.main([])).toBe(sessions);
        });
    });
});