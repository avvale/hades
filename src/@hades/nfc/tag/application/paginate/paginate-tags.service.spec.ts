import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';

// custom items
import { PaginateTagsService } from './paginate-tags.service';
import { ITagRepository } from './../../domain/tag.repository';
import { MockTagRepository } from './../../infrastructure/mock/mock-tag.repository';

describe('PaginateTagsService', () => 
{
    let service: PaginateTagsService;
    let repository: ITagRepository;
    let mockRepository: MockTagRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateTagsService,
                MockTagRepository,
                { 
                    provide: ITagRepository,
                    useValue: {
                        paginate: (queryStatements, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateTagsService);
        repository      = module.get(ITagRepository);
        mockRepository  = module.get(MockTagRepository);
    });

    describe('main', () => 
    {
        test('PaginateTagsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should paginate tags', async () => 
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            })));
            expect(await service.main([
                {
                    'command': Command.OFFSET,
                    'value': 0
                },
                {
                    'command': Command.LIMIT,
                    'value': 10
                }
            ], [])).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            });
        });
    });
});