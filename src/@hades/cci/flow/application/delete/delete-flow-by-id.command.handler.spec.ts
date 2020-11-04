import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteFlowByIdCommandHandler } from './delete-flow-by-id.command-handler';
import { flows } from '@hades/cci/flow/infrastructure/seeds/flow.seed';
import { DeleteFlowByIdCommand } from './delete-flow-by-id.command';
import { DeleteFlowByIdService } from './delete-flow-by-id.service';

describe('DeleteFlowByIdCommandHandler', () => 
{
    let commandHandler: DeleteFlowByIdCommandHandler;
    let service: DeleteFlowByIdService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteFlowByIdCommandHandler,
                {
                    provide: DeleteFlowByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteFlowByIdCommandHandler>(DeleteFlowByIdCommandHandler);
        service         = module.get<DeleteFlowByIdService>(DeleteFlowByIdService);
    });

    describe('main', () => 
    {
        test('DeleteFlowByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteFlowByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteFlowByIdCommand(
                    flows[0].id,
                )
            )).toBe(undefined);
        });
    });
});