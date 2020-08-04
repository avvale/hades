import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetDataLakesQueryHandler } from './get-data-lakes.query-handler';
import { MockDataLakeRepository } from '@hades/bplus-it-sappi/data-lake/infrastructure/mock/mock-data-lake.repository';
import { IDataLakeRepository } from '@hades/bplus-it-sappi/data-lake/domain/data-lake.repository';
import { DataLakeMapper } from '@hades/bplus-it-sappi/data-lake/domain/data-lake.mapper';
import { GetDataLakesQuery } from './get-data-lakes.query';
import { GetDataLakesService } from './get-data-lakes.service';

describe('GetDataLakesQueryHandler', () => 
{
    let queryHandler: GetDataLakesQueryHandler;
    let service: GetDataLakesService;
    let repository: MockDataLakeRepository;
    let mapper: DataLakeMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetDataLakesQueryHandler,
                {
                    provide: IDataLakeRepository,
                    useClass: MockDataLakeRepository
                },
                {
                    provide: GetDataLakesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetDataLakesQueryHandler>(GetDataLakesQueryHandler);
        service         = module.get<GetDataLakesService>(GetDataLakesService);
        repository      = <MockDataLakeRepository>module.get<IDataLakeRepository>(IDataLakeRepository);
        mapper          = new DataLakeMapper();
    });

    describe('main', () => 
    {
        test('GetDataLakesQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an dataLakes founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetDataLakesQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});