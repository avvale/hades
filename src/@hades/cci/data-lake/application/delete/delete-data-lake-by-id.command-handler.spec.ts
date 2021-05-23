import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteDataLakeByIdCommandHandler } from './delete-data-lake-by-id.command-handler';
import { dataLakes } from '@hades/cci/data-lake/infrastructure/seeds/data-lake.seed';
import { DeleteDataLakeByIdCommand } from './delete-data-lake-by-id.command';
import { DeleteDataLakeByIdService } from './delete-data-lake-by-id.service';

describe('DeleteDataLakeByIdCommandHandler', () =>
{
    let commandHandler: DeleteDataLakeByIdCommandHandler;
    let service: DeleteDataLakeByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteDataLakeByIdCommandHandler,
                {
                    provide: DeleteDataLakeByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteDataLakeByIdCommandHandler>(DeleteDataLakeByIdCommandHandler);
        service         = module.get<DeleteDataLakeByIdService>(DeleteDataLakeByIdService);
    });

    describe('main', () =>
    {
        test('DeleteDataLakeByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteDataLakeByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteDataLakeByIdCommand(
                    dataLakes[0].id,
                )
            )).toBe(undefined);
        });
    });
});