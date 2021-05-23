import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAttachmentFamilyQueryHandler } from './find-attachment-family.query-handler';
import { MockAttachmentFamilyRepository } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.repository';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { AttachmentFamilyMapper } from '@hades/admin/attachment-family/domain/attachment-family.mapper';
import { FindAttachmentFamilyQuery } from './find-attachment-family.query';
import { FindAttachmentFamilyService } from './find-attachment-family.service';

describe('FindAttachmentFamilyQueryHandler', () =>
{
    let queryHandler: FindAttachmentFamilyQueryHandler;
    let service: FindAttachmentFamilyService;
    let repository: MockAttachmentFamilyRepository;
    let mapper: AttachmentFamilyMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAttachmentFamilyQueryHandler,
                {
                    provide: IAttachmentFamilyRepository,
                    useClass: MockAttachmentFamilyRepository
                },
                {
                    provide: FindAttachmentFamilyService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindAttachmentFamilyQueryHandler>(FindAttachmentFamilyQueryHandler);
        service         = module.get<FindAttachmentFamilyService>(FindAttachmentFamilyService);
        repository      = <MockAttachmentFamilyRepository>module.get<IAttachmentFamilyRepository>(IAttachmentFamilyRepository);
        mapper          = new AttachmentFamilyMapper();
    });

    describe('main', () =>
    {
        test('FindAttachmentFamilyQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentFamily founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAttachmentFamilyQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});