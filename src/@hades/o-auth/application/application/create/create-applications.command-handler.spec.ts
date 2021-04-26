import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';
import { CreateApplicationsCommandHandler } from './create-applications.command-handler';
import { CreateApplicationsCommand } from './create-applications.command';
import { CreateApplicationsService } from './create-applications.service';

describe('CreateApplicationsCommandHandler', () =>
{
    let commandHandler: CreateApplicationsCommandHandler;
    let service: CreateApplicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateApplicationsCommandHandler,
                {
                    provide: CreateApplicationsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateApplicationsCommandHandler>(CreateApplicationsCommandHandler);
        service         = module.get<CreateApplicationsService>(CreateApplicationsService);
    });

    describe('main', () =>
    {
        test('CreateApplicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an application created', async () =>
        {
            expect(await commandHandler.execute(
                new CreateApplicationsCommand(
                    applications

                )
            )).toBe(undefined);
        });
    });
});