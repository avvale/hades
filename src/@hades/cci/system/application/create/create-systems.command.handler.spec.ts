import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateSystemsCommandHandler } from './create-systems.command-handler';
import { systems } from '@hades/cci/system/infrastructure/seeds/system.seed';
import { CreateSystemsCommand } from './create-systems.command';
import { CreateSystemsService } from './create-systems.service';

describe('CreateSystemsCommandHandler', () => 
{
    let commandHandler: CreateSystemsCommandHandler;
    let service: CreateSystemsService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSystemsCommandHandler,
                {
                    provide: CreateSystemsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateSystemsCommandHandler>(CreateSystemsCommandHandler);
        service         = module.get<CreateSystemsService>(CreateSystemsService);
    });

    describe('main', () => 
    {
        test('CreateSystemsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an system created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateSystemsCommand(
                    systems
                
                )
            )).toBe(undefined);
        });
    });
});