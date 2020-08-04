import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteExecutionsCommandHandler } from './delete-executions.command-handler';
import { DeleteExecutionsCommand } from './delete-executions.command';
import { DeleteExecutionsService } from './delete-executions.service';

describe('DeleteExecutionsCommandHandler', () => 
{
    let commandHandler: DeleteExecutionsCommandHandler;
    let service: DeleteExecutionsService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteExecutionsCommandHandler,
                {
                    provide: DeleteExecutionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteExecutionsCommandHandler>(DeleteExecutionsCommandHandler);
        service         = module.get<DeleteExecutionsService>(DeleteExecutionsService);
    });

    describe('main', () => 
    {
        test('DeleteExecutionsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteExecutionsCommand()
            )).toBe(undefined);
        });
    });
});