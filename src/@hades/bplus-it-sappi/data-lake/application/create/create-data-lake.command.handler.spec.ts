import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateDataLakeCommandHandler } from './create-data-lake.command-handler';
import { dataLakes } from '@hades/bplus-it-sappi/data-lake/infrastructure/seeds/data-lake.seed';
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
                    dataLakes[0].id,
                    dataLakes[0].tenantId,
                    dataLakes[0].executionId,
                    dataLakes[0].tenantCode,
                    dataLakes[0].payload,
                    
                )
            )).toBe(undefined);
        });
    });
});