import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IRoleRepository } from '@hades/iam/role/domain/role.repository';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from '@hades/iam/role/domain/value-objects';
import { IamRole } from './../../domain/role.aggregate';
import { roles } from './../seeds/role.seed';

@Injectable()
export class MockRoleRepository extends MockRepository<IamRole> implements IRoleRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamRole';
    public collectionSource: IamRole[];
    public deletedAtInstance: RoleDeletedAt = new RoleDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset()
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>roles)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamRole.register(
                    new RoleId(itemCollection.id),
                    new RoleName(itemCollection.name),
                    new RoleIsMaster(itemCollection.isMaster),
                    new RolePermissionIds(itemCollection.permissionIds),
                    new RoleAccountIds(itemCollection.accountIds),
                    new RoleCreatedAt(itemCollection.createdAt),
                    new RoleUpdatedAt(itemCollection.updatedAt),
                    new RoleDeletedAt(itemCollection.deletedAt),
                ));
        }
    }
}