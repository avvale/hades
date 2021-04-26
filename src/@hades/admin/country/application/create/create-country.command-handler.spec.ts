import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';
import { CreateCountryCommandHandler } from './create-country.command-handler';
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
                    {
                        id: countries[0].id,
                        commonId: countries[0].commonId,
                        langId: countries[0].langId,
                        iso3166Alpha2: countries[0].iso3166Alpha2,
                        iso3166Alpha3: countries[0].iso3166Alpha3,
                        iso3166Numeric: countries[0].iso3166Numeric,
                        customCode: countries[0].customCode,
                        prefix: countries[0].prefix,
                        name: countries[0].name,
                        slug: countries[0].slug,
                        image: countries[0].image,
                        sort: countries[0].sort,
                        administrativeAreaLevel1: countries[0].administrativeAreaLevel1,
                        administrativeAreaLevel2: countries[0].administrativeAreaLevel2,
                        administrativeAreaLevel3: countries[0].administrativeAreaLevel3,
                        administrativeAreas: countries[0].administrativeAreas,
                        latitude: countries[0].latitude,
                        longitude: countries[0].longitude,
                        zoom: countries[0].zoom,
                        dataLang: countries[0].dataLang,
                    }
                )
            )).toBe(undefined);
        });
    });
});