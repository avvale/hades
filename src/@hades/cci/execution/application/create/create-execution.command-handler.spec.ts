import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';
import { CreateExecutionCommandHandler } from './create-execution.command-handler';
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
                    {
                        id: executions[0].id,
                        tenantId: executions[0].tenantId,
                        tenantCode: executions[0].tenantCode,
                        systemId: executions[0].systemId,
                        systemName: executions[0].systemName,
                        version: executions[0].version,
                        type: executions[0].type,
                        executedAt: executions[0].executedAt,
                        monitoringStartAt: executions[0].monitoringStartAt,
                        monitoringEndAt: executions[0].monitoringEndAt,
                    }
                )
            )).toBe(undefined);
        });
    });
});