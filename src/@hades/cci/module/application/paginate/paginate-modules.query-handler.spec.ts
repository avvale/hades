import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateModulesQueryHandler } from './paginate-modules.query-handler';
import { MockModuleRepository } from '@hades/cci/module/infrastructure/mock/mock-module.repository';
import { IModuleRepository } from '@hades/cci/module/domain/module.repository';
import { ModuleMapper } from '@hades/cci/module/domain/module.mapper';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateModulesQuery } from './paginate-modules.query';
import { PaginateModulesService } from './paginate-modules.service';

describe('PaginateModulesQueryHandler', () =>
{
    let queryHandler: PaginateModulesQueryHandler;
    let service: PaginateModulesService;
    let repository: MockModuleRepository;
    let mapper: ModuleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateModulesQueryHandler,
                {
                    provide: IModuleRepository,
                    useClass: MockModuleRepository
                },
                {
                    provide: PaginateModulesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateModulesQueryHandler>(PaginateModulesQueryHandler);
        service         = module.get<PaginateModulesService>(PaginateModulesService);
        repository      = <MockModuleRepository>module.get<IModuleRepository>(IModuleRepository);
        mapper          = new ModuleMapper();
    });

    describe('main', () =>
    {
        test('PaginateModulesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an modules paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateModulesQuery(
                    {
                        offset: 0,
                        limit: 10
                    }
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