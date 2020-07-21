import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetTagsQueryHandler } from './get-tags.query-handler';
import { MockTagRepository } from '@hades/nfc/tag/infrastructure/mock/mock-tag.repository';
import { ITagRepository } from '@hades/nfc/tag/domain/tag.repository';
import { TagMapper } from '@hades/nfc/tag/domain/tag.mapper';
import { GetTagsQuery } from './get-tags.query';
import { GetTagsService } from './get-tags.service';

describe('GetTagsQueryHandler', () => 
{
    let queryHandler: GetTagsQueryHandler;
    let service: GetTagsService;
    let repository: MockTagRepository;
    let mapper: TagMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetTagsQueryHandler,
                {
                    provide: ITagRepository,
                    useClass: MockTagRepository
                },
                {
                    provide: GetTagsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetTagsQueryHandler>(GetTagsQueryHandler);
        service         = module.get<GetTagsService>(GetTagsService);
        repository      = <MockTagRepository>module.get<ITagRepository>(ITagRepository);
        mapper          = new TagMapper();
    });

    describe('main', () => 
    {
        test('GetTagsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tags founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetTagsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});