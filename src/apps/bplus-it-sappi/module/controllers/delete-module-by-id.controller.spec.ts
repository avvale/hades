import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteModuleByIdController } from './delete-module-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/bplus-it-sappi/module/infrastructure/seeds/module.seed';

describe('DeleteModuleByIdController', () => 
{
    let controller: DeleteModuleByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteModuleByIdController
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

        controller  = module.get<DeleteModuleByIdController>(DeleteModuleByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteModuleByIdController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteModuleByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an module deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(modules[0])));
            expect(await controller.main(modules[0].id)).toBe(modules[0]);
        });
    });
});