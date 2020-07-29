import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';
import { DeleteTagByIdService } from './delete-tag-by-id.service';
import { TagId } from './../../domain/value-objects';
import { ITagRepository } from './../../domain/tag.repository';
import { MockTagRepository } from './../../infrastructure/mock/mock-tag.repository';

describe('DeleteTagByIdService', () => 
{
    let service: DeleteTagByIdService;
    let repository: ITagRepository;
    let mockRepository: MockTagRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteTagByIdService,
                MockTagRepository,
                { 
                    provide: ITagRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteTagByIdService);
        repository      = module.get(ITagRepository);
        mockRepository  = module.get(MockTagRepository);
    });

    describe('main', () => 
    {
        test('DeleteTagByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete tag and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new TagId(tags[0].id)
            )).toBe(undefined);
        });
    });
});