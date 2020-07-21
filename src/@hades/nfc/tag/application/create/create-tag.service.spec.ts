import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';
import { CreateTagService } from './create-tag.service';
import { 
    TagId, 
    TagCode, 
    TagTenantId, 
    TagTenantCode, 
    TagUrlBase, 
    TagParams, 
    TagOffset, 
    TagIsSessionRequired
    
} from './../../domain/value-objects';
import { ITagRepository } from '../../domain/tag.repository';
import { MockTagRepository } from '../../infrastructure/mock/mock-tag.repository';

describe('CreateTagService', () => 
{
    let service: CreateTagService;
    let repository: ITagRepository;
    let mockRepository: MockTagRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateTagService,
                MockTagRepository,
                { 
                    provide: ITagRepository,
                    useValue: {
                        create: (item) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateTagService);
        repository      = module.get(ITagRepository);
        mockRepository  = module.get(MockTagRepository);
    });

    describe('main', () => 
    {
        test('CreateTagService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a tag and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new TagId(tags[0].id),
                new TagCode(tags[0].code),
                new TagTenantId(tags[0].tenantId),
                new TagTenantCode(tags[0].tenantCode),
                new TagUrlBase(tags[0].urlBase),
                new TagParams(tags[0].params),
                new TagOffset(tags[0].offset),
                new TagIsSessionRequired(tags[0].isSessionRequired),
                
            )).toBe(undefined);
        });
    });
});