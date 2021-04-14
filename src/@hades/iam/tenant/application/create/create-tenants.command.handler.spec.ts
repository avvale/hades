import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateTenantsCommandHandler } from './create-tenants.command-handler';
import { tenants } from '@hades/iam/tenant/infrastructure/seeds/tenant.seed';
import { CreateTenantsCommand } from './create-tenants.command';
import { CreateTenantsService } from './create-tenants.service';

describe('CreateTenantsCommandHandler', () =>
{
    let commandHandler: CreateTenantsCommandHandler;
    let service: CreateTenantsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateTenantsCommandHandler,
                {
                    provide: CreateTenantsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateTenantsCommandHandler>(CreateTenantsCommandHandler);
        service         = module.get<CreateTenantsService>(CreateTenantsService);
    });

    describe('main', () =>
    {
        test('CreateTenantsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an tenant created', async () =>
        {
            expect(await commandHandler.execute(
                new CreateTenantsCommand(
                    tenants

                )
            )).toBe(undefined);
        });
    });
});