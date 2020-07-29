import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateTagsService } from './create-tags.service';
import { ITagRepository } from './../../domain/tag.repository';
import { MockTagRepository } from './../../infrastructure/mock/mock-tag.repository';

describe('CreateTagsService', () => 
{
    let service: CreateTagsService;
    let repository: ITagRepository;
    let mockRepository: MockTagRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateTagsService,
                MockTagRepository,
                { 
                    provide: ITagRepository,
                    useValue: {
                        insert: (items) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateTagsService);
        repository      = module.get(ITagRepository);
        mockRepository  = module.get(MockTagRepository);
    });

    describe('main', () => 
    {
        test('CreateTagsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create tags and emit event', async () => 
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});