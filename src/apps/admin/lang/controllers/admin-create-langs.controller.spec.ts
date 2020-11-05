import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminCreateLangsController } from './admin-create-langs.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';

describe('AdminCreateLangsController', () => 
{
    let controller: AdminCreateLangsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminCreateLangsController
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

        controller  = module.get<AdminCreateLangsController>(AdminCreateLangsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('AdminCreateLangsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an langs created', async () => 
        {
            expect(await controller.main(langs)).toBe(undefined);
        });
    });
});