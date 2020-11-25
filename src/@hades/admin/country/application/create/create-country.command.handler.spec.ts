import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateCountryCommandHandler } from './create-country.command-handler';
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';
import { CreateCountryCommand } from './create-country.command';
import { CreateCountryService } from './create-country.service';

describe('CreateCountryCommandHandler', () =>
{
    let commandHandler: CreateCountryCommandHandler;
    let service: CreateCountryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateCountryCommandHandler,
                {
                    provide: CreateCountryService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateCountryCommandHandler>(CreateCountryCommandHandler);
        service         = module.get<CreateCountryService>(CreateCountryService);
    });

    describe('main', () =>
    {
        test('CreateCountryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateCountryService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateCountryCommand(
                    countries[0].id,
                    countries[0].commonId,
                    countries[0].langId,
                    countries[0].iso3166Alpha2,
                    countries[0].iso3166Alpha3,
                    countries[0].iso3166Numeric,
                    countries[0].customCode,
                    countries[0].prefix,
                    countries[0].name,
                    countries[0].slug,
                    countries[0].image,
                    countries[0].sort,
                    countries[0].administrativeAreaLevel1,
                    countries[0].administrativeAreaLevel2,
                    countries[0].administrativeAreaLevel3,
                    countries[0].administrativeAreas,
                    countries[0].latitude,
                    countries[0].longitude,
                    countries[0].zoom,
                    countries[0].dataLang,
                )
            )).toBe(undefined);
        });
    });
});