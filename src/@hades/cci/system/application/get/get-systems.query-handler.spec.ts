import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetSystemsQueryHandler } from './get-systems.query-handler';
import { MockSystemRepository } from '@hades/cci/system/infrastructure/mock/mock-system.repository';
import { ISystemRepository } from '@hades/cci/system/domain/system.repository';
import { SystemMapper } from '@hades/cci/system/domain/system.mapper';
import { GetSystemsQuery } from './get-systems.query';
import { GetSystemsService } from './get-systems.service';

describe('GetSystemsQueryHandler', () =>
{
    let queryHandler: GetSystemsQueryHandler;
    let service: GetSystemsService;
    let repository: MockSystemRepository;
    let mapper: SystemMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetSystemsQueryHandler,
                {
                    provide: ISystemRepository,
                    useClass: MockSystemRepository
                },
                {
                    provide: GetSystemsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetSystemsQueryHandler>(GetSystemsQueryHandler);
        service         = module.get<GetSystemsService>(GetSystemsService);
        repository      = <MockSystemRepository>module.get<ISystemRepository>(ISystemRepository);
        mapper          = new SystemMapper();
    });

    describe('main', () =>
    {
        test('GetSystemsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an systems founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetSystemsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});