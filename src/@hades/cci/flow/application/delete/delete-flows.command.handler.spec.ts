import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteFlowsCommandHandler } from './delete-flows.command-handler';
import { DeleteFlowsCommand } from './delete-flows.command';
import { DeleteFlowsService } from './delete-flows.service';

describe('DeleteFlowsCommandHandler', () => 
{
    let commandHandler: DeleteFlowsCommandHandler;
    let service: DeleteFlowsService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteFlowsCommandHandler,
                {
                    provide: DeleteFlowsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteFlowsCommandHandler>(DeleteFlowsCommandHandler);
        service         = module.get<DeleteFlowsService>(DeleteFlowsService);
    });

    describe('main', () => 
    {
        test('DeleteFlowsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteFlowsCommand()
            )).toBe(undefined);
        });
    });
});