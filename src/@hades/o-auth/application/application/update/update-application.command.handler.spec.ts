import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateApplicationCommandHandler } from './update-application.command-handler';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';
import { UpdateApplicationCommand } from './update-application.command';
import { UpdateApplicationService } from './update-application.service';

describe('UpdateApplicationCommandHandler', () =>
{
    let commandHandler: UpdateApplicationCommandHandler;
    let service: UpdateApplicationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateApplicationCommandHandler,
                {
                    provide: UpdateApplicationService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateApplicationCommandHandler>(UpdateApplicationCommandHandler);
        service         = module.get<UpdateApplicationService>(UpdateApplicationService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an application created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateApplicationCommand(
                    applications[0].id,
                    applications[0].name,
                    applications[0].code,
                    applications[0].secret,
                    applications[0].isMaster,
                    applications[0].clientIds,
                )
            )).toBe(undefined);
        });
    });
});