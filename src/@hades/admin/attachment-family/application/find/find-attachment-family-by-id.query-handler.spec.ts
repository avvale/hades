import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAttachmentFamilyByIdQueryHandler } from './find-attachment-family-by-id.query-handler';
import { MockAttachmentFamilyRepository } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.repository';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { AttachmentFamilyMapper } from '@hades/admin/attachment-family/domain/attachment-family.mapper';
import { FindAttachmentFamilyByIdQuery } from './find-attachment-family-by-id.query';
import { FindAttachmentFamilyByIdService } from './find-attachment-family-by-id.service';

describe('FindAttachmentFamilyByIdQueryHandler', () =>
{
    let queryHandler: FindAttachmentFamilyByIdQueryHandler;
    let service: FindAttachmentFamilyByIdService;
    let repository: MockAttachmentFamilyRepository;
    let mapper: AttachmentFamilyMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAttachmentFamilyByIdQueryHandler,
                {
                    provide: IAttachmentFamilyRepository,
                    useClass: MockAttachmentFamilyRepository
                },
                {
                    provide: FindAttachmentFamilyByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindAttachmentFamilyByIdQueryHandler>(FindAttachmentFamilyByIdQueryHandler);
        service         = module.get<FindAttachmentFamilyByIdService>(FindAttachmentFamilyByIdService);
        repository      = <MockAttachmentFamilyRepository>module.get<IAttachmentFamilyRepository>(IAttachmentFamilyRepository);
        mapper          = new AttachmentFamilyMapper();
    });

    describe('main', () =>
    {
        test('FindAttachmentFamilyByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentFamily founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAttachmentFamilyByIdQuery(
                    attachmentFamilies[0].id,

                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});