import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateLangsQueryHandler } from './paginate-langs.query-handler';
import { MockLangRepository } from '@hades/admin/lang/infrastructure/mock/mock-lang.repository';
import { ILangRepository } from '@hades/admin/lang/domain/lang.repository';
import { LangMapper } from '@hades/admin/lang/domain/lang.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateLangsQuery } from './paginate-langs.query';
import { PaginateLangsService } from './paginate-langs.service';

describe('PaginateLangsQueryHandler', () => 
{
    let queryHandler: PaginateLangsQueryHandler;
    let service: PaginateLangsService;
    let repository: MockLangRepository;
    let mapper: LangMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateLangsQueryHandler,
                {
                    provide: ILangRepository,
                    useClass: MockLangRepository
                },
                {
                    provide: PaginateLangsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateLangsQueryHandler>(PaginateLangsQueryHandler);
        service         = module.get<PaginateLangsService>(PaginateLangsService);
        repository      = <MockLangRepository>module.get<ILangRepository>(ILangRepository);
        mapper          = new LangMapper();
    });

    describe('main', () => 
    {
        test('PaginateLangsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an langs paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateLangsQuery(
                    [
                        {
                            'command': Command.OFFSET,
                            'value': 0
                        },
                        {
                            'command': Command.LIMIT,
                            'value': 10
                        }
                    ]
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