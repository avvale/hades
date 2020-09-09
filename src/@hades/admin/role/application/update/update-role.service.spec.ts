import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { roles } from '@hades/admin/role/infrastructure/seeds/role.seed';
import { UpdateRoleService } from './update-role.service';
import { 
    RoleId, 
    RoleName, 
    RoleIsMaster, 
    RoleCreatedAt, 
    RoleUpdatedAt, 
    RoleDeletedAt
    
} from './../../domain/value-objects';
import { IRoleRepository } from './../../domain/role.repository';
import { MockRoleRepository } from './../../infrastructure/mock/mock-role.repository';

describe('UpdateRoleService', () => 
{
    let service: UpdateRoleService;
    let repository: IRoleRepository;
    let mockRepository: MockRoleRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateRoleService,
                MockRoleRepository,
                { 
                    provide: IRoleRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateRoleService);
        repository      = module.get(IRoleRepository);
        mockRepository  = module.get(MockRoleRepository);
    });

    describe('main', () => 
    {
        test('UpdateRoleService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should update a role and emit event', async () => 
        {
            expect(await service.main(
                new RoleId(roles[0].id),
                new RoleName(roles[0].name),
                new RoleIsMaster(roles[0].isMaster),
                
            )).toBe(undefined);
        });
    });
});