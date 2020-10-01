import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IRoleRepository } from '@hades/cci/role/domain/role.repository';
import { 
    RoleId,
    RoleTenantId,
    RoleTenantCode,
    RoleName,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt
    
} from '@hades/cci/role/domain/value-objects';
import { CciRole } from './../../domain/role.aggregate';
import { roles } from './../seeds/role.seed';

@Injectable()
export class MockRoleRepository extends MockRepository<CciRole> implements IRoleRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CciRole';
    public collectionSource: CciRole[];
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
            
            this.collectionSource.push(CciRole.register(
                    new RoleId(itemCollection.id),
                    new RoleTenantId(itemCollection.tenantId),
                    new RoleTenantCode(itemCollection.tenantCode),
                    new RoleName(itemCollection.name),
                    new RoleCreatedAt(itemCollection.createdAt),
                    new RoleUpdatedAt(itemCollection.updatedAt),
                    new RoleDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }
}