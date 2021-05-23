import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { dataLakes } from '@hades/cci/data-lake/infrastructure/seeds/data-lake.seed';
import { CreateDataLakesCommandHandler } from './create-data-lakes.command-handler';
import { CreateDataLakesCommand } from './create-data-lakes.command';
import { CreateDataLakesService } from './create-data-lakes.service';

describe('CreateDataLakesCommandHandler', () =>
{
    let commandHandler: CreateDataLakesCommandHandler;
    let service: CreateDataLakesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateDataLakesCommandHandler,
                {
                    provide: CreateDataLakesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateDataLakesCommandHandler>(CreateDataLakesCommandHandler);
        service         = module.get<CreateDataLakesService>(CreateDataLakesService);
    });

    describe('main', () =>
    {
        test('CreateDataLakesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an dataLake created', async () =>
        {
            expect(await commandHandler.execute(
                new CreateDataLakesCommand(
                    dataLakes

                )
            )).toBe(undefined);
        });
    });
});