import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAttachmentLibraryByIdQueryHandler } from './find-attachment-library-by-id.query-handler';
import { MockAttachmentLibraryRepository } from '@hades/admin/attachment-library/infrastructure/mock/mock-attachment-library.repository';
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';
import { IAttachmentLibraryRepository } from '@hades/admin/attachment-library/domain/attachment-library.repository';
import { AttachmentLibraryMapper } from '@hades/admin/attachment-library/domain/attachment-library.mapper';
import { FindAttachmentLibraryByIdQuery } from './find-attachment-library-by-id.query';
import { FindAttachmentLibraryByIdService } from './find-attachment-library-by-id.service';

describe('FindAttachmentLibraryByIdQueryHandler', () => 
{
    let queryHandler: FindAttachmentLibraryByIdQueryHandler;
    let service: FindAttachmentLibraryByIdService;
    let repository: MockAttachmentLibraryRepository;
    let mapper: AttachmentLibraryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAttachmentLibraryByIdQueryHandler,
                {
                    provide: IAttachmentLibraryRepository,
                    useClass: MockAttachmentLibraryRepository
                },
                {
                    provide: FindAttachmentLibraryByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindAttachmentLibraryByIdQueryHandler>(FindAttachmentLibraryByIdQueryHandler);
        service         = module.get<FindAttachmentLibraryByIdService>(FindAttachmentLibraryByIdService);
        repository      = <MockAttachmentLibraryRepository>module.get<IAttachmentLibraryRepository>(IAttachmentLibraryRepository);
        mapper          = new AttachmentLibraryMapper();
    });

    describe('main', () =>
    {
        test('FindAttachmentLibraryByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentLibrary founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAttachmentLibraryByIdQuery(
                    attachmentLibraries[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});