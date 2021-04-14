import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAttachmentLibraryQueryHandler } from './find-attachment-library.query-handler';
import { MockAttachmentLibraryRepository } from '@hades/admin/attachment-library/infrastructure/mock/mock-attachment-library.repository';
import { IAttachmentLibraryRepository } from '@hades/admin/attachment-library/domain/attachment-library.repository';
import { AttachmentLibraryMapper } from '@hades/admin/attachment-library/domain/attachment-library.mapper';
import { FindAttachmentLibraryQuery } from './find-attachment-library.query';
import { FindAttachmentLibraryService } from './find-attachment-library.service';

describe('FindAttachmentLibraryQueryHandler', () =>
{
    let queryHandler: FindAttachmentLibraryQueryHandler;
    let service: FindAttachmentLibraryService;
    let repository: MockAttachmentLibraryRepository;
    let mapper: AttachmentLibraryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAttachmentLibraryQueryHandler,
                {
                    provide: IAttachmentLibraryRepository,
                    useClass: MockAttachmentLibraryRepository
                },
                {
                    provide: FindAttachmentLibraryService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindAttachmentLibraryQueryHandler>(FindAttachmentLibraryQueryHandler);
        service         = module.get<FindAttachmentLibraryService>(FindAttachmentLibraryService);
        repository      = <MockAttachmentLibraryRepository>module.get<IAttachmentLibraryRepository>(IAttachmentLibraryRepository);
        mapper          = new AttachmentLibraryMapper();
    });

    describe('main', () =>
    {
        test('FindAttachmentLibraryQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentLibrary founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAttachmentLibraryQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});