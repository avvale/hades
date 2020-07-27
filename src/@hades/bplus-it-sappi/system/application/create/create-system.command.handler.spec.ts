import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateSystemCommandHandler } from './create-system.command-handler';
import { systems } from '@hades/bplus-it-sappi/system/infrastructure/seeds/system.seed';
import { CreateSystemCommand } from './create-system.command';
import { CreateSystemService } from './create-system.service';

describe('CreateSystemCommandHandler', () => 
{
    let commandHandler: CreateSystemCommandHandler;
    let service: CreateSystemService;

    beforeEach(async () => 
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
                    systems[0].id,
                    systems[0].tenantId,
                    systems[0].tenantCode,
                    systems[0].version,
                    systems[0].name,
                    systems[0].environment,
                    systems[0].isActive,
                    systems[0].cancelledAt,
                    
                )
            )).toBe(undefined);
        });
    });
});