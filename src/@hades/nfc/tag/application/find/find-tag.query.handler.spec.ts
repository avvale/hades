import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindTagQueryHandler } from './find-tag.query-handler';
import { MockTagRepository } from '@hades/nfc/tag/infrastructure/mock/mock-tag.repository';
import { ITagRepository } from '@hades/nfc/tag/domain/tag.repository';
import { TagMapper } from '@hades/nfc/tag/domain/tag.mapper';
import { FindTagQuery } from './find-tag.query';
import { FindTagService } from './find-tag.service';

describe('FindTagQueryHandler', () => 
{
    let queryHandler: FindTagQueryHandler;
    let service: FindTagService;
    let repository: MockTagRepository;
    let mapper: TagMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindTagQueryHandler,
                {
                    provide: ITagRepository,
                    useClass: MockTagRepository
                },
                {
                    provide: FindTagService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindTagQueryHandler>(FindTagQueryHandler);
        service         = module.get<FindTagService>(FindTagService);
        repository      = <MockTagRepository>module.get<ITagRepository>(ITagRepository);
        mapper          = new TagMapper();
    });

    describe('main', () => 
    {
        test('FindTagQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tag founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindTagQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});