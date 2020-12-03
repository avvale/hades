import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeletePartnersService } from './delete-partners.service';
import { IPartnerRepository } from './../../domain/partner.repository';
import { MockPartnerRepository } from './../../infrastructure/mock/mock-partner.repository';

describe('DeletePartnersService', () => 
{
    let service: DeletePartnersService;
    let repository: IPartnerRepository;
    let mockRepository: MockPartnerRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeletePartnersService,
                MockPartnerRepository,
                { 
                    provide: IPartnerRepository,
                    useValue: {
                        get: (queryStatement) => {},
                        delete: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeletePartnersService);
        repository      = module.get(IPartnerRepository);
        mockRepository  = module.get(MockPartnerRepository);
    });

    describe('main', () => 
    {
        test('DeletePartnersService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete partner and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});