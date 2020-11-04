import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateSystemCommandHandler } from './update-system.command-handler';
import { systems } from '@hades/cci/system/infrastructure/seeds/system.seed';
import { UpdateSystemCommand } from './update-system.command';
import { UpdateSystemService } from './update-system.service';

describe('UpdateSystemCommandHandler', () =>
{
    let commandHandler: UpdateSystemCommandHandler;
    let service: UpdateSystemService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateSystemCommandHandler,
                {
                    provide: UpdateSystemService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateSystemCommandHandler>(UpdateSystemCommandHandler);
        service         = module.get<UpdateSystemService>(UpdateSystemService);
    });

    describe('main', () =>
    {
        test('UpdateSystemCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an system created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateSystemCommand(
                    systems[0].id,
                    systems[0].tenantId,
                    systems[0].tenantCode,
                    systems[0].version,
                    systems[0].name,
                    systems[0].environment,
                    systems[0].technology,
                    systems[0].isActive,
                    systems[0].cancelledAt,
                )
            )).toBe(undefined);
        });
    });
});