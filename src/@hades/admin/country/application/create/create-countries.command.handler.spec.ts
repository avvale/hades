import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateCountriesCommandHandler } from './create-countries.command-handler';
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';
import { CreateCountriesCommand } from './create-countries.command';
import { CreateCountriesService } from './create-countries.service';

describe('CreateCountriesCommandHandler', () => 
{
    let commandHandler: CreateCountriesCommandHandler;
    let service: CreateCountriesService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateCountriesCommandHandler,
                {
                    provide: CreateCountriesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateCountriesCommandHandler>(CreateCountriesCommandHandler);
        service         = module.get<CreateCountriesService>(CreateCountriesService);
    });

    describe('main', () => 
    {
        test('CreateCountriesCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an country created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateCountriesCommand(
                    countries
                
                )
            )).toBe(undefined);
        });
    });
});