import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateTagsQueryHandler } from './paginate-tags.query-handler';
import { MockTagRepository } from '@hades/nfc/tag/infrastructure/mock/mock-tag.repository';
import { ITagRepository } from '@hades/nfc/tag/domain/tag.repository';
import { TagMapper } from '@hades/nfc/tag/domain/tag.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateTagsQuery } from './paginate-tags.query';
import { PaginateTagsService } from './paginate-tags.service';

describe('PaginateTagsQueryHandler', () => 
{
    let queryHandler: PaginateTagsQueryHandler;
    let service: PaginateTagsService;
    let repository: MockTagRepository;
    let mapper: TagMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateTagsQueryHandler,
                {
                    provide: ITagRepository,
                    useClass: MockTagRepository
                },
                {
                    provide: PaginateTagsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateTagsQueryHandler>(PaginateTagsQueryHandler);
        service         = module.get<PaginateTagsService>(PaginateTagsService);
        repository      = <MockTagRepository>module.get<ITagRepository>(ITagRepository);
        mapper          = new TagMapper();
    });

    describe('main', () => 
    {
        test('PaginateTagsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tags paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateTagsQuery(
                    [
                        {
                            'command': Command.OFFSET,
                            'value': 0
                        },
                        {
                            'command': Command.LIMIT,
                            'value': 10
                        }
                    ]
                )
            )).toStrictEqual(
                new PaginationResponse(
                    100, 
                    10, 
                    repository.collectionSource.slice(0,10).map(item => item.toDTO())
                )
            );
        });
    });
});