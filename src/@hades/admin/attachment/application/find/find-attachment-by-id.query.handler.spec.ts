import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAttachmentByIdQueryHandler } from './find-attachment-by-id.query-handler';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { AttachmentMapper } from '@hades/admin/attachment/domain/attachment.mapper';
import { FindAttachmentByIdQuery } from './find-attachment-by-id.query';
import { FindAttachmentByIdService } from './find-attachment-by-id.service';

describe('FindAttachmentByIdQueryHandler', () => 
{
    let queryHandler: FindAttachmentByIdQueryHandler;
    let service: FindAttachmentByIdService;
    let repository: MockAttachmentRepository;
    let mapper: AttachmentMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAttachmentByIdQueryHandler,
                {
                    provide: IAttachmentRepository,
                    useClass: MockAttachmentRepository
                },
                {
                    provide: FindAttachmentByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindAttachmentByIdQueryHandler>(FindAttachmentByIdQueryHandler);
        service         = module.get<FindAttachmentByIdService>(FindAttachmentByIdService);
        repository      = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);
        mapper          = new AttachmentMapper();
    });

    describe('main', () =>
    {
        test('FindAttachmentByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachment founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAttachmentByIdQuery(
                    attachments[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});