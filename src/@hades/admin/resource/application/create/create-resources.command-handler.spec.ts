import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';
import { CreateResourcesCommandHandler } from './create-resources.command-handler';
import { CreateResourcesCommand } from './create-resources.command';
import { CreateResourcesService } from './create-resources.service';

describe('CreateResourcesCommandHandler', () =>
{
    let commandHandler: CreateResourcesCommandHandler;
    let service: CreateResourcesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateResourcesCommandHandler,
                {
                    provide: CreateResourcesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateResourcesCommandHandler>(CreateResourcesCommandHandler);
        service         = module.get<CreateResourcesService>(CreateResourcesService);
    });

    describe('main', () =>
    {
        test('CreateResourcesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an resource created', async () =>
        {
            expect(await commandHandler.execute(
                new CreateResourcesCommand(
                    resources

                )
            )).toBe(undefined);
        });
    });
});