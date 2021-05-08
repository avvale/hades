import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from './../../domain/value-objects';
import { IamRole } from './../../domain/role.aggregate';
import { roles } from './../seeds/role.seed';

@Injectable()
export class MockRoleSeeder extends MockSeeder<IamRole>
{
    public collectionSource: IamRole[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let role of roles)
        {
            this.collectionSource.push(
                IamRole.register(
                    new RoleId(role.id),
                    new RoleName(role.name),
                    new RoleIsMaster(role.isMaster),
                    new RolePermissionIds(role.permissions.map(permission => permission.id)),
                    new RoleAccountIds(['948a5308-a49d-42dc-9ea3-7490e120000b']),
                    new RoleCreatedAt({currentTimestamp: true}),
                    new RoleUpdatedAt({currentTimestamp: true}),
                    new RoleDeletedAt(null),
                )
            );
        }
    }
}