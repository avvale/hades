import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteExecutionByIdCommandHandler } from './delete-execution-by-id.command-handler';
import { executions } from '@hades/bplus-it-sappi/execution/infrastructure/seeds/execution.seed';
import { DeleteExecutionByIdCommand } from './delete-execution-by-id.command';
import { DeleteExecutionByIdService } from './delete-execution-by-id.service';

describe('DeleteExecutionByIdCommandHandler', () => 
{
    let commandHandler: DeleteExecutionByIdCommandHandler;
    let service: DeleteExecutionByIdService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteExecutionByIdCommandHandler,
                {
                    provide: DeleteExecutionByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteExecutionByIdCommandHandler>(DeleteExecutionByIdCommandHandler);
        service         = module.get<DeleteExecutionByIdService>(DeleteExecutionByIdService);
    });

    describe('main', () => 
    {
        test('DeleteExecutionByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteExecutionByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteExecutionByIdCommand(
                    executions[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});