import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateRolesQueryHandler } from './paginate-roles.query-handler';
import { MockRoleRepository } from '@hades/admin/role/infrastructure/mock/mock-role.repository';
import { IRoleRepository } from '@hades/admin/role/domain/role.repository';
import { RoleMapper } from '@hades/admin/role/domain/role.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateRolesQuery } from './paginate-roles.query';
import { PaginateRolesService } from './paginate-roles.service';

describe('PaginateRolesQueryHandler', () => 
{
    let queryHandler: PaginateRolesQueryHandler;
    let service: PaginateRolesService;
    let repository: MockRoleRepository;
    let mapper: RoleMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateRolesQueryHandler,
                {
                    provide: IRoleRepository,
                    useClass: MockRoleRepository
                },
                {
                    provide: PaginateRolesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateRolesQueryHandler>(PaginateRolesQueryHandler);
        service         = module.get<PaginateRolesService>(PaginateRolesService);
        repository      = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);
        mapper          = new RoleMapper();
    });

    describe('main', () => 
    {
        test('PaginateRolesQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an roles paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateRolesQuery(
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