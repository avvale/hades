import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { systems } from '@hades/cci/system/infrastructure/seeds/system.seed';
import { CreateSystemCommandHandler } from './create-system.command-handler';
import { CreateSystemCommand } from './create-system.command';
import { CreateSystemService } from './create-system.service';

describe('CreateSystemCommandHandler', () =>
{
    let commandHandler: CreateSystemCommandHandler;
    let service: CreateSystemService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSystemCommandHandler,
                {
                    provide: CreateSystemService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateSystemCommandHandler>(CreateSystemCommandHandler);
        service         = module.get<CreateSystemService>(CreateSystemService);
    });

    describe('main', () =>
    {
        test('CreateSystemCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateSystemService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateSystemCommand(
                    {
                        id: systems[0].id,
                        tenantId: systems[0].tenantId,
                        tenantCode: systems[0].tenantCode,
                        version: systems[0].version,
                        name: systems[0].name,
                        environment: systems[0].environment,
                        technology: systems[0].technology,
                        isActive: systems[0].isActive,
                        cancelledAt: systems[0].cancelledAt,
                    }
                )
            )).toBe(undefined);
        });
    });
});