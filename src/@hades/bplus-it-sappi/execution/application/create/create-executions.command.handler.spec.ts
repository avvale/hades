import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateExecutionsCommandHandler } from './create-executions.command-handler';
import { executions } from '@hades/bplus-it-sappi/execution/infrastructure/seeds/execution.seed';
import { CreateExecutionsCommand } from './create-executions.command';
import { CreateExecutionsService } from './create-executions.service';

describe('CreateExecutionsCommandHandler', () => 
{
    let commandHandler: CreateExecutionsCommandHandler;
    let service: CreateExecutionsService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateExecutionsCommandHandler,
                {
                    provide: CreateExecutionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateExecutionsCommandHandler>(CreateExecutionsCommandHandler);
        service         = module.get<CreateExecutionsService>(CreateExecutionsService);
    });

    describe('main', () => 
    {
        test('CreateExecutionsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an execution created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateExecutionsCommand(
                    executions
                
                )
            )).toBe(undefined);
        });
    });
});