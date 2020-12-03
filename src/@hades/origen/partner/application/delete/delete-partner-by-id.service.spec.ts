import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { partners } from '@hades/origen/partner/infrastructure/seeds/partner.seed';
import { DeletePartnerByIdService } from './delete-partner-by-id.service';
import { PartnerId } from './../../domain/value-objects';
import { IPartnerRepository } from './../../domain/partner.repository';
import { MockPartnerRepository } from './../../infrastructure/mock/mock-partner.repository';

describe('DeletePartnerByIdService', () => 
{
    let service: DeletePartnerByIdService;
    let repository: IPartnerRepository;
    let mockRepository: MockPartnerRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeletePartnerByIdService,
                MockPartnerRepository,
                {
                    provide: IPartnerRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeletePartnerByIdService);
        repository      = module.get(IPartnerRepository);
        mockRepository  = module.get(MockPartnerRepository);
    });

    describe('main', () => 
    {
        test('DeletePartnerByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete partner and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new PartnerId(partners[0].id)
            )).toBe(undefined);
        });
    });
});