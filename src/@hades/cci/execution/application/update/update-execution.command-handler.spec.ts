import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';
import { UpdateExecutionCommandHandler } from './update-execution.command-handler';
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