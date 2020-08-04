import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateDataLakesQueryHandler } from './paginate-data-lakes.query-handler';
import { MockDataLakeRepository } from '@hades/bplus-it-sappi/data-lake/infrastructure/mock/mock-data-lake.repository';
import { IDataLakeRepository } from '@hades/bplus-it-sappi/data-lake/domain/data-lake.repository';
import { DataLakeMapper } from '@hades/bplus-it-sappi/data-lake/domain/data-lake.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateDataLakesQuery } from './paginate-data-lakes.query';
import { PaginateDataLakesService } from './paginate-data-lakes.service';

describe('PaginateDataLakesQueryHandler', () => 
{
    let queryHandler: PaginateDataLakesQueryHandler;
    let service: PaginateDataLakesService;
    let repository: MockDataLakeRepository;
    let mapper: DataLakeMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateDataLakesQueryHandler,
                {
                    provide: IDataLakeRepository,
                    useClass: MockDataLakeRepository
                },
                {
                    provide: PaginateDataLakesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateDataLakesQueryHandler>(PaginateDataLakesQueryHandler);
        service         = module.get<PaginateDataLakesService>(PaginateDataLakesService);
        repository      = <MockDataLakeRepository>module.get<IDataLakeRepository>(IDataLakeRepository);
        mapper          = new DataLakeMapper();
    });

    describe('main', () => 
    {
        test('PaginateDataLakesQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an dataLakes paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateDataLakesQuery(
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