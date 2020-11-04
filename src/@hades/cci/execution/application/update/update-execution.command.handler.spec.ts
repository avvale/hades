import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateExecutionCommandHandler } from './update-execution.command-handler';
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';
import { UpdateExecutionCommand } from './update-execution.command';
import { UpdateExecutionService } from './update-execution.service';

describe('UpdateExecutionCommandHandler', () =>
{
    let commandHandler: UpdateExecutionCommandHandler;
    let service: UpdateExecutionService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateExecutionCommandHandler,
                {
                    provide: UpdateExecutionService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateExecutionCommandHandler>(UpdateExecutionCommandHandler);
        service         = module.get<UpdateExecutionService>(UpdateExecutionService);
    });

    describe('main', () =>
    {
        test('UpdateExecutionCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an execution created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateExecutionCommand(
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