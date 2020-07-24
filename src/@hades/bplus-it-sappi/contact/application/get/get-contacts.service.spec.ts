import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetContactsService } from './get-contacts.service';
import { IContactRepository } from './../../domain/contact.repository';
import { MockContactRepository } from './../../infrastructure/mock/mock-contact.repository';

describe('GetContactsService', () => 
{
    let service: GetContactsService;
    let repository: IContactRepository;
    let mockRepository: MockContactRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetContactsService,
                MockContactRepository,
                { 
                    provide: IContactRepository,
                    useValue: {
                        get: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetContactsService);
        repository      = module.get(IContactRepository);
        mockRepository  = module.get(MockContactRepository);
    });

    describe('main', () => 
    {
        test('GetContactsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should get contacts', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main([])).toBe(mockRepository.collectionSource);
        });
    });
});