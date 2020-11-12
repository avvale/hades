import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';
import { UpdateCountryService } from './update-country.service';
import {
    CountryId,
    CountryCommonId,
    CountryLangId,
    CountryIso3166Alpha2,
    CountryIso3166Alpha3,
    CountryIso3166Numeric,
    CountryCustomCode,
    CountryPrefix,
    CountryName,
    CountrySlug,
    CountryImage,
    CountrySort,
    CountryAdministrativeAreaLevel1,
    CountryAdministrativeAreaLevel2,
    CountryAdministrativeAreaLevel3,
    CountryAdministrativeAreas,
    CountryLatitude,
    CountryLongitude,
    CountryZoom,
    CountryDataLang,
    CountryCreatedAt,
    CountryUpdatedAt,
    CountryDeletedAt,
} from './../../domain/value-objects';
import { ICountryRepository } from './../../domain/country.repository';
import { MockCountryRepository } from './../../infrastructure/mock/mock-country.repository';

describe('UpdateCountryService', () =>
{
    let service: UpdateCountryService;
    let repository: ICountryRepository;
    let mockRepository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateCountryService,
                MockCountryRepository,
                {
                    provide: ICountryRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateCountryService);
        repository      = module.get(ICountryRepository);
        mockRepository  = module.get(MockCountryRepository);
    });

    describe('main', () =>
    {
        test('UpdateCountryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a country and emit event', async () =>
        {
            expect(await service.main(
                new CountryId(countries[0].id),
                new CountryCommonId(countries[0].commonId),
                new CountryLangId(countries[0].langId),
                new CountryIso3166Alpha2(countries[0].iso3166Alpha2),
                new CountryIso3166Alpha3(countries[0].iso3166Alpha3),
                new CountryIso3166Numeric(countries[0].iso3166Numeric),
                new CountryCustomCode(countries[0].customCode),
                new CountryPrefix(countries[0].prefix),
                new CountryName(countries[0].name),
                new CountrySlug(countries[0].slug),
                new CountryImage(countries[0].image),
                new CountrySort(countries[0].sort),
                new CountryAdministrativeAreaLevel1(countries[0].administrativeAreaLevel1),
                new CountryAdministrativeAreaLevel2(countries[0].administrativeAreaLevel2),
                new CountryAdministrativeAreaLevel3(countries[0].administrativeAreaLevel3),
                new CountryAdministrativeAreas(countries[0].administrativeAreas),
                new CountryLatitude(countries[0].latitude),
                new CountryLongitude(countries[0].longitude),
                new CountryZoom(countries[0].zoom),
                new CountryDataLang(countries[0].dataLang),
            )).toBe(undefined);
        });
    });
});