import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    RoleId,
    RoleTenantId,
    RoleTenantCode,
    RoleName,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from './../../domain/value-objects';
import { CciRole } from './../../domain/role.aggregate';
import { roles } from './../seeds/role.seed';

@Injectable()
export class MockRoleSeeder extends MockSeeder<CciRole>
{
    public collectionSource: CciRole[];

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
                CciRole.register(
                    new RoleId(role.id),
                    new RoleTenantId(role.tenantId),
                    new RoleTenantCode(role.tenantCode),
                    new RoleName(role.name),
                    new RoleCreatedAt({currentTimestamp: true}),
                    new RoleUpdatedAt({currentTimestamp: true}),
                    new RoleDeletedAt(null),
                )
            );
        }
    }
}