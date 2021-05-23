import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt,
} from './../../domain/value-objects';
import { IamPermission } from './../../domain/permission.aggregate';
import { permissions } from './../seeds/permission.seed';

@Injectable()
export class MockPermissionSeeder extends MockSeeder<IamPermission>
{
    public collectionSource: IamPermission[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let permission of permissions)
        {
            this.collectionSource.push(
                IamPermission.register(
                    new PermissionId(permission.id),
                    new PermissionName(permission.name),
                    new PermissionBoundedContextId(permission.boundedContextId),
                    new PermissionRoleIds(permission.roleIds),
                    new PermissionCreatedAt({currentTimestamp: true}),
                    new PermissionUpdatedAt({currentTimestamp: true}),
                    new PermissionDeletedAt(null),
                )
            );
        }
    }
}