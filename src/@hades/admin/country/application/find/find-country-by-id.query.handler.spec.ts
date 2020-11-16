import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindCountryByIdQueryHandler } from './find-country-by-id.query-handler';
import { MockCountryRepository } from '@hades/admin/country/infrastructure/mock/mock-country.repository';
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';
import { ICountryRepository } from '@hades/admin/country/domain/country.repository';
import { CountryMapper } from '@hades/admin/country/domain/country.mapper';
import { FindCountryByIdQuery } from './find-country-by-id.query';
import { FindCountryByIdService } from './find-country-by-id.service';

describe('FindCountryByIdQueryHandler', () => 
{
    let queryHandler: FindCountryByIdQueryHandler;
    let service: FindCountryByIdService;
    let repository: MockCountryRepository;
    let mapper: CountryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindCountryByIdQueryHandler,
                {
                    provide: ICountryRepository,
                    useClass: MockCountryRepository
                },
                {
                    provide: FindCountryByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindCountryByIdQueryHandler>(FindCountryByIdQueryHandler);
        service         = module.get<FindCountryByIdService>(FindCountryByIdService);
        repository      = <MockCountryRepository>module.get<ICountryRepository>(ICountryRepository);
        mapper          = new CountryMapper();
    });

    describe('main', () =>
    {
        test('FindCountryByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an country founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindCountryByIdQuery(
                    countries[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});