import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { roles } from '@hades/cci/role/infrastructure/seeds/role.seed';
import { CreateRoleService } from './create-role.service';
import { 
    RoleId,
    RoleTenantId,
    RoleTenantCode,
    RoleName
    
} from './../../domain/value-objects';
import { IRoleRepository } from './../../domain/role.repository';
import { MockRoleRepository } from './../../infrastructure/mock/mock-role.repository';

describe('CreateRoleService', () => 
{
    let service: CreateRoleService;
    let repository: IRoleRepository;
    let mockRepository: MockRoleRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateRoleService,
                MockRoleRepository,
                { 
                    provide: IRoleRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateRoleService);
        repository      = module.get(IRoleRepository);
        mockRepository  = module.get(MockRoleRepository);
    });

    describe('main', () => 
    {
        test('CreateRoleService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a role and emit event', async () => 
        {
            expect(await service.main(
                new RoleId(roles[0].id),
                new RoleTenantId(roles[0].tenantId),
                new RoleTenantCode(roles[0].tenantCode),
                new RoleName(roles[0].name),
                
            )).toBe(undefined);
        });
    });
});