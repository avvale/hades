import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindDataLakeQueryHandler } from './find-data-lake.query-handler';
import { MockDataLakeRepository } from '@hades/bplus-it-sappi/data-lake/infrastructure/mock/mock-data-lake.repository';
import { IDataLakeRepository } from '@hades/bplus-it-sappi/data-lake/domain/data-lake.repository';
import { DataLakeMapper } from '@hades/bplus-it-sappi/data-lake/domain/data-lake.mapper';
import { FindDataLakeQuery } from './find-data-lake.query';
import { FindDataLakeService } from './find-data-lake.service';

describe('FindDataLakeQueryHandler', () => 
{
    let queryHandler: FindDataLakeQueryHandler;
    let service: FindDataLakeService;
    let repository: MockDataLakeRepository;
    let mapper: DataLakeMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindDataLakeQueryHandler,
                {
                    provide: IDataLakeRepository,
                    useClass: MockDataLakeRepository
                },
                {
                    provide: FindDataLakeService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindDataLakeQueryHandler>(FindDataLakeQueryHandler);
        service         = module.get<FindDataLakeService>(FindDataLakeService);
        repository      = <MockDataLakeRepository>module.get<IDataLakeRepository>(IDataLakeRepository);
        mapper          = new DataLakeMapper();
    });

    describe('main', () => 
    {
        test('FindDataLakeQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an dataLake founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindDataLakeQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});