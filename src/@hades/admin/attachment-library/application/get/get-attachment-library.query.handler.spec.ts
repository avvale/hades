import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetAttachmentLibraryQueryHandler } from './get-attachment-library.query-handler';
import { MockAttachmentLibraryRepository } from '@hades/admin/attachment-library/infrastructure/mock/mock-attachment-library.repository';
import { IAttachmentLibraryRepository } from '@hades/admin/attachment-library/domain/attachment-library.repository';
import { AttachmentLibraryMapper } from '@hades/admin/attachment-library/domain/attachment-library.mapper';
import { GetAttachmentLibraryQuery } from './get-attachment-library.query';
import { GetAttachmentLibraryService } from './get-attachment-library.service';

describe('GetAttachmentLibraryQueryHandler', () => 
{
    let queryHandler: GetAttachmentLibraryQueryHandler;
    let service: GetAttachmentLibraryService;
    let repository: MockAttachmentLibraryRepository;
    let mapper: AttachmentLibraryMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAttachmentLibraryQueryHandler,
                {
                    provide: IAttachmentLibraryRepository,
                    useClass: MockAttachmentLibraryRepository
                },
                {
                    provide: GetAttachmentLibraryService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetAttachmentLibraryQueryHandler>(GetAttachmentLibraryQueryHandler);
        service         = module.get<GetAttachmentLibraryService>(GetAttachmentLibraryService);
        repository      = <MockAttachmentLibraryRepository>module.get<IAttachmentLibraryRepository>(IAttachmentLibraryRepository);
        mapper          = new AttachmentLibraryMapper();
    });

    describe('main', () => 
    {
        test('GetAttachmentLibraryQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentLibrary founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetAttachmentLibraryQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});