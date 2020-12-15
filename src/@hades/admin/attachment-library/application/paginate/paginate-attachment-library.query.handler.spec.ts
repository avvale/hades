import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateAttachmentLibraryQueryHandler } from './paginate-attachment-library.query-handler';
import { MockAttachmentLibraryRepository } from '@hades/admin/attachment-library/infrastructure/mock/mock-attachment-library.repository';
import { IAttachmentLibraryRepository } from '@hades/admin/attachment-library/domain/attachment-library.repository';
import { AttachmentLibraryMapper } from '@hades/admin/attachment-library/domain/attachment-library.mapper';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateAttachmentLibraryQuery } from './paginate-attachment-library.query';
import { PaginateAttachmentLibraryService } from './paginate-attachment-library.service';

describe('PaginateAttachmentLibraryQueryHandler', () =>
{
    let queryHandler: PaginateAttachmentLibraryQueryHandler;
    let service: PaginateAttachmentLibraryService;
    let repository: MockAttachmentLibraryRepository;
    let mapper: AttachmentLibraryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateAttachmentLibraryQueryHandler,
                {
                    provide: IAttachmentLibraryRepository,
                    useClass: MockAttachmentLibraryRepository
                },
                {
                    provide: PaginateAttachmentLibraryService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateAttachmentLibraryQueryHandler>(PaginateAttachmentLibraryQueryHandler);
        service         = module.get<PaginateAttachmentLibraryService>(PaginateAttachmentLibraryService);
        repository      = <MockAttachmentLibraryRepository>module.get<IAttachmentLibraryRepository>(IAttachmentLibraryRepository);
        mapper          = new AttachmentLibraryMapper();
    });

    describe('main', () => 
    {
        test('PaginateAttachmentLibraryQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentLibrary paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateAttachmentLibraryQuery(
                    {
                        offset: 0,
                        limit: 10
                    }
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