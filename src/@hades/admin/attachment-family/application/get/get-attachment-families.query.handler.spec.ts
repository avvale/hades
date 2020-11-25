import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetAttachmentFamiliesQueryHandler } from './get-attachment-families.query-handler';
import { MockAttachmentFamilyRepository } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.repository';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { AttachmentFamilyMapper } from '@hades/admin/attachment-family/domain/attachment-family.mapper';
import { GetAttachmentFamiliesQuery } from './get-attachment-families.query';
import { GetAttachmentFamiliesService } from './get-attachment-families.service';

describe('GetAttachmentFamiliesQueryHandler', () => 
{
    let queryHandler: GetAttachmentFamiliesQueryHandler;
    let service: GetAttachmentFamiliesService;
    let repository: MockAttachmentFamilyRepository;
    let mapper: AttachmentFamilyMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAttachmentFamiliesQueryHandler,
                {
                    provide: IAttachmentFamilyRepository,
                    useClass: MockAttachmentFamilyRepository
                },
                {
                    provide: GetAttachmentFamiliesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetAttachmentFamiliesQueryHandler>(GetAttachmentFamiliesQueryHandler);
        service         = module.get<GetAttachmentFamiliesService>(GetAttachmentFamiliesService);
        repository      = <MockAttachmentFamilyRepository>module.get<IAttachmentFamilyRepository>(IAttachmentFamilyRepository);
        mapper          = new AttachmentFamilyMapper();
    });

    describe('main', () => 
    {
        test('GetAttachmentFamiliesQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an attachmentFamilies founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetAttachmentFamiliesQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});