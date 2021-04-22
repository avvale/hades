import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';
import { CreateResourceCommandHandler } from './create-resource.command-handler';
import { CreateResourceCommand } from './create-resource.command';
import { CreateResourceService } from './create-resource.service';

describe('CreateResourceCommandHandler', () =>
{
    let commandHandler: CreateResourceCommandHandler;
    let service: CreateResourceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateResourceCommandHandler,
                {
                    provide: CreateResourceService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateResourceCommandHandler>(CreateResourceCommandHandler);
        service         = module.get<CreateResourceService>(CreateResourceService);
    });

    describe('main', () =>
    {
        test('CreateResourceCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateResourceService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateResourceCommand(
                    {
                        id : resources[0].id,
                        boundedContextId : resources[0].boundedContextId,
                        attachmentFamilyIds : resources[0].attachmentFamilyIds,
                        name : resources[0].name,
                        hasCustomFields : resources[0].hasCustomFields,
                        hasAttachments : resources[0].hasAttachments,
                    }
                )
            )).toBe(undefined);
        });
    });
});