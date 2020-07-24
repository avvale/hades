import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { contacts } from '@hades/bplus-it-sappi/contact/infrastructure/seeds/contact.seed';
import { FindContactByIdService } from './find-contact-by-id.service';
import { ContactId } from './../../domain/value-objects';
import { IContactRepository } from './../../domain/contact.repository';
import { MockContactRepository } from './../../infrastructure/mock/mock-contact.repository';

describe('FindContactByIdService', () => 
{
    let service: FindContactByIdService;
    let repository: IContactRepository;
    let mockRepository: MockContactRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindContactByIdService,
                MockContactRepository,
                { 
                    provide: IContactRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindContactByIdService);
        repository      = module.get(IContactRepository);
        mockRepository  = module.get(MockContactRepository);
    });

    describe('main', () => 
    {
        test('FindContactByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find contact by id', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ContactId(contacts[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});