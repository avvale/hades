// ignored file
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { rolesToCreate } from '@hades/iam/role/infrastructure/seeds/role-to-create.seed';
import { UpdateRoleService } from './update-role.service';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds,
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
                {
                    id: new RoleId(rolesToCreate[0].id),
                    name: new RoleName(rolesToCreate[0].name),
                    isMaster: new RoleIsMaster(rolesToCreate[0].isMaster),
                    permissionIds: new RolePermissionIds(rolesToCreate[0].permissionIds),
                    accountIds: new RoleAccountIds(rolesToCreate[0].accountIds),
                }
            )).toBe(undefined);
        });
    });
});