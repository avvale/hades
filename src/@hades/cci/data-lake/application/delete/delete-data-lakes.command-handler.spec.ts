import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteDataLakesCommandHandler } from './delete-data-lakes.command-handler';
import { DeleteDataLakesCommand } from './delete-data-lakes.command';
import { DeleteDataLakesService } from './delete-data-lakes.service';

describe('DeleteDataLakesCommandHandler', () =>
{
    let commandHandler: DeleteDataLakesCommandHandler;
    let service: DeleteDataLakesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteDataLakesCommandHandler,
                {
                    provide: DeleteDataLakesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteDataLakesCommandHandler>(DeleteDataLakesCommandHandler);
        service         = module.get<DeleteDataLakesService>(DeleteDataLakesService);
    });

    describe('main', () =>
    {
        test('DeleteDataLakesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteDataLakesCommand()
            )).toBe(undefined);
        });
    });
});