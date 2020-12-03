import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindPartnerService } from './find-partner.service';
import { IPartnerRepository } from './../../domain/partner.repository';
import { MockPartnerRepository } from './../../infrastructure/mock/mock-partner.repository';

describe('FindPartnerService', () => 
{
    let service: FindPartnerService;
    let repository: IPartnerRepository;
    let mockRepository: MockPartnerRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindPartnerService,
                MockPartnerRepository,
                { 
                    provide: IPartnerRepository,
                    useValue: {
                        find: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindPartnerService);
        repository      = module.get(IPartnerRepository);
        mockRepository  = module.get(MockPartnerRepository);
    });

    describe('main', () => 
    {
        test('FindPartnerService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find partner', async () => 
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});