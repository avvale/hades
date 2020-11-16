import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindTenantController } from './iam-find-tenant.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tenants } from '@hades/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamFindTenantController', () => 
{
    let controller: IamFindTenantController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamFindTenantController
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

        controller  = module.get<IamFindTenantController>(IamFindTenantController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('IamFindTenantController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a tenant', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await controller.main()).toBe(tenants[0]);
        });
    });
});