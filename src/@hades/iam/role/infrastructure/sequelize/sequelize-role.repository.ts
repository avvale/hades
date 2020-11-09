import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IRoleRepository } from './../../domain/role.repository';
import { IamRole } from './../../domain/role.aggregate';
import { RoleMapper } from './../../domain/role.mapper';
import { IamRoleModel } from './sequelize-role.model';

@Injectable()
export class SequelizeRoleRepository extends SequelizeRepository<IamRole, IamRoleModel> implements IRoleRepository
{
    public readonly aggregateName: string = 'IamRole';
    public readonly mapper: RoleMapper = new RoleMapper();
    public readonly timezoneColumns: string[] = ['createdAt','updatedAt','deletedAt'];

    constructor(
        @InjectModel(IamRoleModel)
        public readonly repository: typeof IamRoleModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }

    // hook called after create aggregate
    async createdAggregateHook(aggregate: IamRole, model: IamRoleModel)
    {
        // add many to many relation
        if (aggregate.permissionIds.length > 0) await model.$add('permissions', aggregate.permissionIds.value);
        if (aggregate.accountIds.length > 0) await model.$add('accounts', aggregate.accountIds.value);
    }

    // hook called after create aggregate
    async updatedAggregateHook(aggregate: IamRole, model: IamRoleModel)
    {
        // set many to many relation
        if (aggregate.permissionIds.isArray()) await model.$set('permissions', aggregate.permissionIds.value);
        if (aggregate.accountIds.isArray()) await model.$set('accounts', aggregate.accountIds.value);
    }
}