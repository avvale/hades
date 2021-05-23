import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { boundedContexts } from '@hades/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { CreateBoundedContextsCommandHandler } from './create-bounded-contexts.command-handler';
import { CreateBoundedContextsCommand } from './create-bounded-contexts.command';
import { CreateBoundedContextsService } from './create-bounded-contexts.service';

describe('CreateBoundedContextsCommandHandler', () =>
{
    let commandHandler: CreateBoundedContextsCommandHandler;
    let service: CreateBoundedContextsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateBoundedContextsCommandHandler,
                {
                    provide: CreateBoundedContextsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateBoundedContextsCommandHandler>(CreateBoundedContextsCommandHandler);
        service         = module.get<CreateBoundedContextsService>(CreateBoundedContextsService);
    });

    describe('main', () =>
    {
        test('CreateBoundedContextsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an boundedContext created', async () =>
        {
            expect(await commandHandler.execute(
                new CreateBoundedContextsCommand(
                    boundedContexts

                )
            )).toBe(undefined);
        });
    });
});