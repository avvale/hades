import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { dataLakes } from '@hades/cci/data-lake/infrastructure/seeds/data-lake.seed';
import { UpdateDataLakeCommandHandler } from './update-data-lake.command-handler';
import { UpdateDataLakeCommand } from './update-data-lake.command';
import { UpdateDataLakeService } from './update-data-lake.service';

describe('UpdateDataLakeCommandHandler', () =>
{
    let commandHandler: UpdateDataLakeCommandHandler;
    let service: UpdateDataLakeService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateDataLakeCommandHandler,
                {
                    provide: UpdateDataLakeService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateDataLakeCommandHandler>(UpdateDataLakeCommandHandler);
        service         = module.get<UpdateDataLakeService>(UpdateDataLakeService);
    });

    describe('main', () =>
    {
        test('UpdateDataLakeCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an dataLake created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateDataLakeCommand(
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