import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateAttachmentFamiliesQueryHandler } from './paginate-attachment-families.query-handler';
import { MockAttachmentFamilyRepository } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.repository';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { AttachmentFamilyMapper } from '@hades/admin/attachment-family/domain/attachment-family.mapper';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateAttachmentFamiliesQuery } from './paginate-attachment-families.query';
import { PaginateAttachmentFamiliesService } from './paginate-attachment-families.service';

describe('PaginateAttachmentFamiliesQueryHandler', () =>
{
    let queryHandler: PaginateAttachmentFamiliesQueryHandler;
    let service: PaginateAttachmentFamiliesService;
    let repository: MockAttachmentFamilyRepository;
    let mapper: AttachmentFamilyMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateAttachmentFamiliesQueryHandler,
                {
                    provide: IAttachmentFamilyRepository,
                    useClass: MockAttachmentFamilyRepository
                },
                {
                    provide: PaginateAttachmentFamiliesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateAttachmentFamiliesQueryHandler>(PaginateAttachmentFamiliesQueryHandler);
        service         = module.get<PaginateAttachmentFamiliesService>(PaginateAttachmentFamiliesService);
        repository      = <MockAttachmentFamilyRepository>module.get<IAttachmentFamilyRepository>(IAttachmentFamilyRepository);
        mapper          = new AttachmentFamilyMapper();
    });

    describe('main', () => 
    {
        test('PaginateAttachmentFamiliesQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentFamilies paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateAttachmentFamiliesQuery(
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