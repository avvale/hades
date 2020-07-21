import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindTagByIdQueryHandler } from './find-tag-by-id.query-handler';
import { MockTagRepository } from '@hades/nfc/tag/infrastructure/mock/mock-tag.repository';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';
import { ITagRepository } from '@hades/nfc/tag/domain/tag.repository';
import { TagMapper } from '@hades/nfc/tag/domain/tag.mapper';
import { FindTagByIdQuery } from './find-tag-by-id.query';
import { FindTagByIdService } from './find-tag-by-id.service';

describe('FindTagByIdQueryHandler', () => 
{
    let queryHandler: FindTagByIdQueryHandler;
    let service: FindTagByIdService;
    let repository: MockTagRepository;
    let mapper: TagMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindTagByIdQueryHandler,
                {
                    provide: ITagRepository,
                    useClass: MockTagRepository
                },
                {
                    provide: FindTagByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindTagByIdQueryHandler>(FindTagByIdQueryHandler);
        service         = module.get<FindTagByIdService>(FindTagByIdService);
        repository      = <MockTagRepository>module.get<ITagRepository>(ITagRepository);
        mapper          = new TagMapper();
    });

    describe('main', () => 
    {
        test('FindTagByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tag founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindTagByIdQuery(
                    tags[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});