import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreatePartnersService } from './create-partners.service';
import { IPartnerRepository } from './../../domain/partner.repository';
import { MockPartnerRepository } from './../../infrastructure/mock/mock-partner.repository';

describe('CreatePartnersService', () => 
{
    let service: CreatePartnersService;
    let repository: IPartnerRepository;
    let mockRepository: MockPartnerRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreatePartnersService,
                MockPartnerRepository,
                { 
                    provide: IPartnerRepository,
                    useValue: {
                        insert: (items) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreatePartnersService);
        repository      = module.get(IPartnerRepository);
        mockRepository  = module.get(MockPartnerRepository);
    });

    describe('main', () => 
    {
        test('CreatePartnersService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create partners and emit event', async () => 
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});