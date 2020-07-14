import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindSessionByIdController } from './find-session-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';

describe('FindSessionByIdController', () => 
{
    let controller: FindSessionByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                FindSessionByIdController
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

        controller  = module.get<FindSessionByIdController>(FindSessionByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindSessionByIdController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindSessionByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an session by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(sessions[0])));
            expect(await controller.main(sessions[0].id)).toBe(sessions[0]);
        });
    });
});