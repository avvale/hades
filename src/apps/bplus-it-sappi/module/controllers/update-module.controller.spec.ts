import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateModuleController } from './update-module.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/bplus-it-sappi/module/infrastructure/seeds/module.seed'

describe('UpdateModuleController', () => 
{
    let controller: UpdateModuleController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                UpdateModuleController
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

        controller  = module.get<UpdateModuleController>(UpdateModuleController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateModuleController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateModuleController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a module created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(modules[0])));
            expect(await controller.main(modules[0])).toBe(modules[0]);
        });
    });
});