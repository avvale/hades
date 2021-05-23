import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { contacts } from '@hades/cci/contact/infrastructure/seeds/contact.seed';
import { DeleteContactByIdService } from './delete-contact-by-id.service';
import { ContactId } from './../../domain/value-objects';
import { IContactRepository } from './../../domain/contact.repository';
import { MockContactRepository } from './../../infrastructure/mock/mock-contact.repository';

describe('DeleteContactByIdService', () =>
{
    let service: DeleteContactByIdService;
    let repository: IContactRepository;
    let mockRepository: MockContactRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteContactByIdService,
                MockContactRepository,
                {
                    provide: IContactRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteContactByIdService);
        repository      = module.get(IContactRepository);
        mockRepository  = module.get(MockContactRepository);
    });

    describe('main', () =>
    {
        test('DeleteContactByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete contact and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ContactId(contacts[0].id)
            )).toBe(undefined);
        });
    });
});