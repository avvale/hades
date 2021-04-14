import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAttachmentQueryHandler } from './find-attachment.query-handler';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { AttachmentMapper } from '@hades/admin/attachment/domain/attachment.mapper';
import { FindAttachmentQuery } from './find-attachment.query';
import { FindAttachmentService } from './find-attachment.service';

describe('FindAttachmentQueryHandler', () =>
{
    let queryHandler: FindAttachmentQueryHandler;
    let service: FindAttachmentService;
    let repository: MockAttachmentRepository;
    let mapper: AttachmentMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAttachmentQueryHandler,
                {
                    provide: IAttachmentRepository,
                    useClass: MockAttachmentRepository
                },
                {
                    provide: FindAttachmentService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindAttachmentQueryHandler>(FindAttachmentQueryHandler);
        service         = module.get<FindAttachmentService>(FindAttachmentService);
        repository      = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);
        mapper          = new AttachmentMapper();
    });

    describe('main', () =>
    {
        test('FindAttachmentQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachment founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAttachmentQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});