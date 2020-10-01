import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteTenantByIdController } from './delete-tenant-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tenants } from '@hades/iam/tenant/infrastructure/seeds/tenant.seed';

describe('DeleteTenantByIdController', () => 
{
    let controller: DeleteTenantByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteTenantByIdController
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

        controller  = module.get<DeleteTenantByIdController>(DeleteTenantByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('DeleteTenantByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an tenant deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await controller.main(tenants[0].id)).toBe(tenants[0]);
        });
    });
});