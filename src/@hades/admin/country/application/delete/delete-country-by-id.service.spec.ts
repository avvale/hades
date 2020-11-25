import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { countries } from '@hades/admin/country/infrastructure/seeds/country.seed';
import { DeleteCountryByIdService } from './delete-country-by-id.service';
import { CountryId } from './../../domain/value-objects';
import { ICountryRepository } from './../../domain/country.repository';
import { MockCountryRepository } from './../../infrastructure/mock/mock-country.repository';

describe('DeleteCountryByIdService', () => 
{
    let service: DeleteCountryByIdService;
    let repository: ICountryRepository;
    let mockRepository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteCountryByIdService,
                MockCountryRepository,
                {
                    provide: ICountryRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteCountryByIdService);
        repository      = module.get(ICountryRepository);
        mockRepository  = module.get(MockCountryRepository);
    });

    describe('main', () => 
    {
        test('DeleteCountryByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete country and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new CountryId(countries[0].id)
            )).toBe(undefined);
        });
    });
});