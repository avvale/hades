import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateSystemsQueryHandler } from './paginate-systems.query-handler';
import { MockSystemRepository } from '@hades/bplus-it-sappi/system/infrastructure/mock/mock-system.repository';
import { ISystemRepository } from '@hades/bplus-it-sappi/system/domain/system.repository';
import { SystemMapper } from '@hades/bplus-it-sappi/system/domain/system.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateSystemsQuery } from './paginate-systems.query';
import { PaginateSystemsService } from './paginate-systems.service';

describe('PaginateSystemsQueryHandler', () => 
{
    let queryHandler: PaginateSystemsQueryHandler;
    let service: PaginateSystemsService;
    let repository: MockSystemRepository;
    let mapper: SystemMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateSystemsQueryHandler,
                {
                    provide: ISystemRepository,
                    useClass: MockSystemRepository
                },
                {
                    provide: PaginateSystemsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateSystemsQueryHandler>(PaginateSystemsQueryHandler);
        service         = module.get<PaginateSystemsService>(PaginateSystemsService);
        repository      = <MockSystemRepository>module.get<ISystemRepository>(ISystemRepository);
        mapper          = new SystemMapper();
    });

    describe('main', () => 
    {
        test('PaginateSystemsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an systems paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateSystemsQuery(
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