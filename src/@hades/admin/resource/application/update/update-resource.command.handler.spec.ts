import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateResourceCommandHandler } from './update-resource.command-handler';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';
import { UpdateResourceCommand } from './update-resource.command';
import { UpdateResourceService } from './update-resource.service';

describe('UpdateResourceCommandHandler', () =>
{
    let commandHandler: UpdateResourceCommandHandler;
    let service: UpdateResourceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateResourceCommandHandler,
                {
                    provide: UpdateResourceService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateResourceCommandHandler>(UpdateResourceCommandHandler);
        service         = module.get<UpdateResourceService>(UpdateResourceService);
    });

    describe('main', () =>
    {
        test('UpdateResourceCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an resource created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateResourceCommand(
                    resources[0].id,
                    resources[0].boundedContextId,
                    resources[0].name,
                    resources[0].hasCustomFields,
                    resources[0].hasAttachments,
                )
            )).toBe(undefined);
        });
    });
});