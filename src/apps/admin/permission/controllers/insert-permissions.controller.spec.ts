import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertPermissionsController } from './insert-permissions.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { permissions } from '@hades/admin/permission/infrastructure/seeds/permission.seed'

describe('InsertPermissionsController', () => 
{
    let controller: InsertPermissionsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                InsertPermissionsController
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

        controller  = module.get<InsertPermissionsController>(InsertPermissionsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertPermissionsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertPermissionsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an permissions created', async () => 
        {
            expect(await controller.main(permissions)).toBe(undefined);
        });
    });
});