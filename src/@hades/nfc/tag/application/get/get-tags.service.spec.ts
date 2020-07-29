import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetTagsService } from './get-tags.service';
import { ITagRepository } from './../../domain/tag.repository';
import { MockTagRepository } from './../../infrastructure/mock/mock-tag.repository';

describe('GetTagsService', () => 
{
    let service: GetTagsService;
    let repository: ITagRepository;
    let mockRepository: MockTagRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetTagsService,
                MockTagRepository,
                { 
                    provide: ITagRepository,
                    useValue: {
                        get: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetTagsService);
        repository      = module.get(ITagRepository);
        mockRepository  = module.get(MockTagRepository);
    });

    describe('main', () => 
    {
        test('GetTagsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should get tags', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main([])).toBe(mockRepository.collectionSource);
        });
    });
});