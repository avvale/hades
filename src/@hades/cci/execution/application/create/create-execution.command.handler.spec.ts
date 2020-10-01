import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateExecutionCommandHandler } from './create-execution.command-handler';
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';
import { CreateExecutionCommand } from './create-execution.command';
import { CreateExecutionService } from './create-execution.service';

describe('CreateExecutionCommandHandler', () => 
{
    let commandHandler: CreateExecutionCommandHandler;
    let service: CreateExecutionService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateExecutionCommandHandler,
                {
                    provide: CreateExecutionService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateExecutionCommandHandler>(CreateExecutionCommandHandler);
        service         = module.get<CreateExecutionService>(CreateExecutionService);
    });

    describe('main', () => 
    {
        test('CreateExecutionCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateExecutionService', async () => 
        {
            expect(await commandHandler.execute(
                new CreateExecutionCommand(
                    executions[0].id,
                    executions[0].tenantId,
                    executions[0].tenantCode,
                    executions[0].systemId,
                    executions[0].systemName,
                    executions[0].version,
                    executions[0].type,
                    executions[0].executedAt,
                    executions[0].monitoringStartAt,
                    executions[0].monitoringEndAt,
                    
                )
            )).toBe(undefined);
        });
    });
});