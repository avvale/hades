import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteCountriesService } from './delete-countries.service';
import { ICountryRepository } from './../../domain/country.repository';
import { MockCountryRepository } from './../../infrastructure/mock/mock-country.repository';

describe('DeleteCountriesService', () => 
{
    let service: DeleteCountriesService;
    let repository: ICountryRepository;
    let mockRepository: MockCountryRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteCountriesService,
                MockCountryRepository,
                { 
                    provide: ICountryRepository,
                    useValue: {
                        get: (queryStatement) => {},
                        delete: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteCountriesService);
        repository      = module.get(ICountryRepository);
        mockRepository  = module.get(MockCountryRepository);
    });

    describe('main', () => 
    {
        test('DeleteCountriesService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete country and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});