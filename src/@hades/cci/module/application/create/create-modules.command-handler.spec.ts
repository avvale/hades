import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';
import { CreateModulesCommandHandler } from './create-modules.command-handler';
import { CreateModulesCommand } from './create-modules.command';
import { CreateModulesService } from './create-modules.service';

describe('CreateModulesCommandHandler', () =>
{
    let commandHandler: CreateModulesCommandHandler;
    let service: CreateModulesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateModulesCommandHandler,
                {
                    provide: CreateModulesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateModulesCommandHandler>(CreateModulesCommandHandler);
        service         = module.get<CreateModulesService>(CreateModulesService);
    });

    describe('main', () =>
    {
        test('CreateModulesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an module created', async () =>
        {
            expect(await commandHandler.execute(
                new CreateModulesCommand(
                    modules

                )
            )).toBe(undefined);
        });
    });
});