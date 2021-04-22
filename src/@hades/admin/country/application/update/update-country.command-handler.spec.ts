import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';
import { UpdateCountryCommandHandler } from './update-country.command-handler';
import { UpdateCountryCommand } from './update-country.command';
import { UpdateCountryService } from './update-country.service';

describe('UpdateCountryCommandHandler', () =>
{
    let commandHandler: UpdateCountryCommandHandler;
    let service: UpdateCountryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateCountryCommandHandler,
                {
                    provide: UpdateCountryService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateCountryCommandHandler>(UpdateCountryCommandHandler);
        service         = module.get<UpdateCountryService>(UpdateCountryService);
    });

    describe('main', () =>
    {
        test('UpdateCountryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an country created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateCountryCommand(
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