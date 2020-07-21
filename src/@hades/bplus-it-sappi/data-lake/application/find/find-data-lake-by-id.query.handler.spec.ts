import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindDataLakeByIdQueryHandler } from './find-data-lake-by-id.query-handler';
import { MockDataLakeRepository } from '@hades/bplus-it-sappi/data-lake/infrastructure/mock/mock-data-lake.repository';
import { dataLakes } from '@hades/bplus-it-sappi/data-lake/infrastructure/seeds/data-lake.seed';
import { IDataLakeRepository } from '@hades/bplus-it-sappi/data-lake/domain/data-lake.repository';
import { DataLakeMapper } from '@hades/bplus-it-sappi/data-lake/domain/data-lake.mapper';
import { FindDataLakeByIdQuery } from './find-data-lake-by-id.query';
import { FindDataLakeByIdService } from './find-data-lake-by-id.service';

describe('FindDataLakeByIdQueryHandler', () => 
{
    let queryHandler: FindDataLakeByIdQueryHandler;
    let service: FindDataLakeByIdService;
    let repository: MockDataLakeRepository;
    let mapper: DataLakeMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindDataLakeByIdQueryHandler,
                {
                    provide: IDataLakeRepository,
                    useClass: MockDataLakeRepository
                },
                {
                    provide: FindDataLakeByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindDataLakeByIdQueryHandler>(FindDataLakeByIdQueryHandler);
        service         = module.get<FindDataLakeByIdService>(FindDataLakeByIdService);
        repository      = <MockDataLakeRepository>module.get<IDataLakeRepository>(IDataLakeRepository);
        mapper          = new DataLakeMapper();
    });

    describe('main', () => 
    {
        test('FindDataLakeByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an dataLake founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindDataLakeByIdQuery(
                    dataLakes[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});