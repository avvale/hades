import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateFlowsCommandHandler } from './create-flows.command-handler';
import { flows } from '@hades/bplus-it-sappi/flow/infrastructure/seeds/flow.seed';
import { CreateFlowsCommand } from './create-flows.command';
import { CreateFlowsService } from './create-flows.service';

describe('CreateFlowsCommandHandler', () => 
{
    let commandHandler: CreateFlowsCommandHandler;
    let service: CreateFlowsService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateFlowsCommandHandler,
                {
                    provide: CreateFlowsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateFlowsCommandHandler>(CreateFlowsCommandHandler);
        service         = module.get<CreateFlowsService>(CreateFlowsService);
    });

    describe('main', () => 
    {
        test('CreateFlowsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an flow created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateFlowsCommand(
                    flows
                
                )
            )).toBe(undefined);
        });
    });
});