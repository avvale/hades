import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindSystemQueryHandler } from './find-system.query-handler';
import { MockSystemRepository } from '@hades/cci/system/infrastructure/mock/mock-system.repository';
import { ISystemRepository } from '@hades/cci/system/domain/system.repository';
import { SystemMapper } from '@hades/cci/system/domain/system.mapper';
import { FindSystemQuery } from './find-system.query';
import { FindSystemService } from './find-system.service';

describe('FindSystemQueryHandler', () => 
{
    let queryHandler: FindSystemQueryHandler;
    let service: FindSystemService;
    let repository: MockSystemRepository;
    let mapper: SystemMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindSystemQueryHandler,
                {
                    provide: ISystemRepository,
                    useClass: MockSystemRepository
                },
                {
                    provide: FindSystemService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindSystemQueryHandler>(FindSystemQueryHandler);
        service         = module.get<FindSystemService>(FindSystemService);
        repository      = <MockSystemRepository>module.get<ISystemRepository>(ISystemRepository);
        mapper          = new SystemMapper();
    });

    describe('main', () => 
    {
        test('FindSystemQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an system founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindSystemQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});