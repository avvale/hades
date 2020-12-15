import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateAttachmentLibrariesQueryHandler } from './paginate-attachment-libraries.query-handler';
import { MockAttachmentLibraryRepository } from '@hades/admin/attachment-library/infrastructure/mock/mock-attachment-library.repository';
import { IAttachmentLibraryRepository } from '@hades/admin/attachment-library/domain/attachment-library.repository';
import { AttachmentLibraryMapper } from '@hades/admin/attachment-library/domain/attachment-library.mapper';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateAttachmentLibrariesQuery } from './paginate-attachment-libraries.query';
import { PaginateAttachmentLibrariesService } from './paginate-attachment-libraries.service';

describe('PaginateAttachmentLibrariesQueryHandler', () =>
{
    let queryHandler: PaginateAttachmentLibrariesQueryHandler;
    let service: PaginateAttachmentLibrariesService;
    let repository: MockAttachmentLibraryRepository;
    let mapper: AttachmentLibraryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateAttachmentLibrariesQueryHandler,
                {
                    provide: IAttachmentLibraryRepository,
                    useClass: MockAttachmentLibraryRepository
                },
                {
                    provide: PaginateAttachmentLibrariesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateAttachmentLibrariesQueryHandler>(PaginateAttachmentLibrariesQueryHandler);
        service         = module.get<PaginateAttachmentLibrariesService>(PaginateAttachmentLibrariesService);
        repository      = <MockAttachmentLibraryRepository>module.get<IAttachmentLibraryRepository>(IAttachmentLibraryRepository);
        mapper          = new AttachmentLibraryMapper();
    });

    describe('main', () => 
    {
        test('PaginateAttachmentLibrariesQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentLibraries paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateAttachmentLibrariesQuery(
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