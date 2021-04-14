import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetAttachmentsQueryHandler } from './get-attachments.query-handler';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { AttachmentMapper } from '@hades/admin/attachment/domain/attachment.mapper';
import { GetAttachmentsQuery } from './get-attachments.query';
import { GetAttachmentsService } from './get-attachments.service';

describe('GetAttachmentsQueryHandler', () =>
{
    let queryHandler: GetAttachmentsQueryHandler;
    let service: GetAttachmentsService;
    let repository: MockAttachmentRepository;
    let mapper: AttachmentMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAttachmentsQueryHandler,
                {
                    provide: IAttachmentRepository,
                    useClass: MockAttachmentRepository
                },
                {
                    provide: GetAttachmentsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetAttachmentsQueryHandler>(GetAttachmentsQueryHandler);
        service         = module.get<GetAttachmentsService>(GetAttachmentsService);
        repository      = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);
        mapper          = new AttachmentMapper();
    });

    describe('main', () =>
    {
        test('GetAttachmentsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachments founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetAttachmentsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});