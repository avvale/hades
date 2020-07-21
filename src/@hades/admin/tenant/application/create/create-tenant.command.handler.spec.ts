import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateTenantCommandHandler } from './create-tenant.command-handler';
import { tenants } from '@hades/admin/tenant/infrastructure/seeds/tenant.seed';
import { CreateTenantCommand } from './create-tenant.command';
import { CreateTenantService } from './create-tenant.service';

describe('CreateTenantCommandHandler', () => 
{
    let commandHandler: CreateTenantCommandHandler;
    let service: CreateTenantService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateTenantCommandHandler,
                {
                    provide: CreateTenantService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateTenantCommandHandler>(CreateTenantCommandHandler);
        service         = module.get<CreateTenantService>(CreateTenantService);
    });

    describe('main', () => 
    {
        test('CreateTenantCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateTenantService', async () => 
        {
            expect(await commandHandler.execute(
                new CreateTenantCommand(
                    tenants[0].id,
                    tenants[0].name,
                    tenants[0].code,
                    tenants[0].logo,
                    tenants[0].isActive,
                    tenants[0].data,
                    
                )
            )).toBe(undefined);
        });
    });
});