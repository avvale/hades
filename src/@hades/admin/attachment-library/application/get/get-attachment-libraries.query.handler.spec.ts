import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetAttachmentLibrariesQueryHandler } from './get-attachment-libraries.query-handler';
import { MockAttachmentLibraryRepository } from '@hades/admin/attachment-library/infrastructure/mock/mock-attachment-library.repository';
import { IAttachmentLibraryRepository } from '@hades/admin/attachment-library/domain/attachment-library.repository';
import { AttachmentLibraryMapper } from '@hades/admin/attachment-library/domain/attachment-library.mapper';
import { GetAttachmentLibrariesQuery } from './get-attachment-libraries.query';
import { GetAttachmentLibrariesService } from './get-attachment-libraries.service';

describe('GetAttachmentLibrariesQueryHandler', () => 
{
    let queryHandler: GetAttachmentLibrariesQueryHandler;
    let service: GetAttachmentLibrariesService;
    let repository: MockAttachmentLibraryRepository;
    let mapper: AttachmentLibraryMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAttachmentLibrariesQueryHandler,
                {
                    provide: IAttachmentLibraryRepository,
                    useClass: MockAttachmentLibraryRepository
                },
                {
                    provide: GetAttachmentLibrariesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetAttachmentLibrariesQueryHandler>(GetAttachmentLibrariesQueryHandler);
        service         = module.get<GetAttachmentLibrariesService>(GetAttachmentLibrariesService);
        repository      = <MockAttachmentLibraryRepository>module.get<IAttachmentLibraryRepository>(IAttachmentLibraryRepository);
        mapper          = new AttachmentLibraryMapper();
    });

    describe('main', () => 
    {
        test('GetAttachmentLibrariesQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentLibraries founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetAttachmentLibrariesQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});