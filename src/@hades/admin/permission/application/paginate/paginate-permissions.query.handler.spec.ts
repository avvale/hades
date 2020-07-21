import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginatePermissionsQueryHandler } from './paginate-permissions.query-handler';
import { MockPermissionRepository } from '@hades/admin/permission/infrastructure/mock/mock-permission.repository';
import { IPermissionRepository } from '@hades/admin/permission/domain/permission.repository';
import { PermissionMapper } from '@hades/admin/permission/domain/permission.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginatePermissionsQuery } from './paginate-permissions.query';
import { PaginatePermissionsService } from './paginate-permissions.service';

describe('PaginatePermissionsQueryHandler', () => 
{
    let queryHandler: PaginatePermissionsQueryHandler;
    let service: PaginatePermissionsService;
    let repository: MockPermissionRepository;
    let mapper: PermissionMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginatePermissionsQueryHandler,
                {
                    provide: IPermissionRepository,
                    useClass: MockPermissionRepository
                },
                {
                    provide: PaginatePermissionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginatePermissionsQueryHandler>(PaginatePermissionsQueryHandler);
        service         = module.get<PaginatePermissionsService>(PaginatePermissionsService);
        repository      = <MockPermissionRepository>module.get<IPermissionRepository>(IPermissionRepository);
        mapper          = new PermissionMapper();
    });

    describe('main', () => 
    {
        test('PaginatePermissionsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an permissions paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginatePermissionsQuery(
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