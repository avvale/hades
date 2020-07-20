import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindPermissionQueryHandler } from './find-permission.query-handler';
import { MockPermissionRepository } from '@hades/admin/permission/infrastructure/mock/mock-permission.repository';
import { IPermissionRepository } from '@hades/admin/permission/domain/permission.repository';
import { PermissionMapper } from '@hades/admin/permission/domain/permission.mapper';
import { FindPermissionQuery } from './find-permission.query';
import { FindPermissionService } from './find-permission.service';

describe('FindPermissionQueryHandler', () => 
{
    let queryHandler: FindPermissionQueryHandler;
    let service: FindPermissionService;
    let repository: MockPermissionRepository;
    let mapper: PermissionMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindPermissionQueryHandler,
                {
                    provide: IPermissionRepository,
                    useClass: MockPermissionRepository
                },
                {
                    provide: FindPermissionService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindPermissionQueryHandler>(FindPermissionQueryHandler);
        service         = module.get<FindPermissionService>(FindPermissionService);
        repository      = <MockPermissionRepository>module.get<IPermissionRepository>(IPermissionRepository);
        mapper          = new PermissionMapper();
    });

    it('FindPermissionQueryHandler should be defined', () => 
    {
        expect(queryHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('FindPermissionQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        it('should return an permission founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindPermissionQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});