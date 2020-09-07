import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteResourceByIdCommandHandler } from './delete-resource-by-id.command-handler';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';
import { DeleteResourceByIdCommand } from './delete-resource-by-id.command';
import { DeleteResourceByIdService } from './delete-resource-by-id.service';

describe('DeleteResourceByIdCommandHandler', () => 
{
    let commandHandler: DeleteResourceByIdCommandHandler;
    let service: DeleteResourceByIdService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteResourceByIdCommandHandler,
                {
                    provide: DeleteResourceByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteResourceByIdCommandHandler>(DeleteResourceByIdCommandHandler);
        service         = module.get<DeleteResourceByIdService>(DeleteResourceByIdService);
    });

    describe('main', () => 
    {
        test('DeleteResourceByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteResourceByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteResourceByIdCommand(
                    resources[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});