import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateTenantCommandHandler } from './update-tenant.command-handler';
import { tenants } from '@hades/iam/tenant/infrastructure/seeds/tenant.seed';
import { UpdateTenantCommand } from './update-tenant.command';
import { UpdateTenantService } from './update-tenant.service';

describe('UpdateTenantCommandHandler', () =>
{
    let commandHandler: UpdateTenantCommandHandler;
    let service: UpdateTenantService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateTenantCommandHandler,
                {
                    provide: UpdateTenantService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateTenantCommandHandler>(UpdateTenantCommandHandler);
        service         = module.get<UpdateTenantService>(UpdateTenantService);
    });

    describe('main', () =>
    {
        test('UpdateTenantCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an tenant created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateTenantCommand(
                    tenants[0].id,
                    tenants[0].name,
                    tenants[0].code,
                    tenants[0].logo,
                    tenants[0].isActive,
                    tenants[0].data,
                    tenants[0].accountIds,
                )
            )).toBe(undefined);
        });
    });
});