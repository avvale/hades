import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindTenantByIdController } from './iam-find-tenant-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tenants } from '@hades/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamFindTenantByIdController', () => 
{
    let controller: IamFindTenantByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamFindTenantByIdController
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

        controller  = module.get<IamFindTenantByIdController>(IamFindTenantByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('IamFindTenantByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an tenant by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await controller.main(tenants[0].id)).toBe(tenants[0]);
        });
    });
});