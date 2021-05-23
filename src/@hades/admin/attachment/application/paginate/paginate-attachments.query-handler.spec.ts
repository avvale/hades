import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateAttachmentsQueryHandler } from './paginate-attachments.query-handler';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { AttachmentMapper } from '@hades/admin/attachment/domain/attachment.mapper';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateAttachmentsQuery } from './paginate-attachments.query';
import { PaginateAttachmentsService } from './paginate-attachments.service';

describe('PaginateAttachmentsQueryHandler', () =>
{
    let queryHandler: PaginateAttachmentsQueryHandler;
    let service: PaginateAttachmentsService;
    let repository: MockAttachmentRepository;
    let mapper: AttachmentMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateAttachmentsQueryHandler,
                {
                    provide: IAttachmentRepository,
                    useClass: MockAttachmentRepository
                },
                {
                    provide: PaginateAttachmentsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateAttachmentsQueryHandler>(PaginateAttachmentsQueryHandler);
        service         = module.get<PaginateAttachmentsService>(PaginateAttachmentsService);
        repository      = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);
        mapper          = new AttachmentMapper();
    });

    describe('main', () =>
    {
        test('PaginateAttachmentsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachments paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateAttachmentsQuery(
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