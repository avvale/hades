import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { dataLakes } from '@hades/cci/data-lake/infrastructure/seeds/data-lake.seed';
import { CreateDataLakeCommandHandler } from './create-data-lake.command-handler';
import { CreateDataLakeCommand } from './create-data-lake.command';
import { CreateDataLakeService } from './create-data-lake.service';

describe('CreateDataLakeCommandHandler', () =>
{
    let commandHandler: CreateDataLakeCommandHandler;
    let service: CreateDataLakeService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateDataLakeCommandHandler,
                {
                    provide: CreateDataLakeService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateDataLakeCommandHandler>(CreateDataLakeCommandHandler);
        service         = module.get<CreateDataLakeService>(CreateDataLakeService);
    });

    describe('main', () =>
    {
        test('CreateDataLakeCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateDataLakeService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateDataLakeCommand(
                    {
                        id: dataLakes[0].id,
                        tenantId: dataLakes[0].tenantId,
                        executionId: dataLakes[0].executionId,
                        tenantCode: dataLakes[0].tenantCode,
                        payload: dataLakes[0].payload,
                    }
                )
            )).toBe(undefined);
        });
    });
});