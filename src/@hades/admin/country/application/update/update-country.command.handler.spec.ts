import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateCountryCommandHandler } from './update-country.command-handler';
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';
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