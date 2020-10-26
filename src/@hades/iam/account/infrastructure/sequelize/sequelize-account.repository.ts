import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize/types';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IAccountRepository } from './../../domain/account.repository';
import { IamAccount } from './../../domain/account.aggregate';
import { AccountMapper } from './../../domain/account.mapper';
import { IamAccountModel } from './sequelize-account.model';

@Injectable()
export class SequelizeAccountRepository extends SequelizeRepository<IamAccount, IamAccountModel> implements IAccountRepository
{
    public readonly aggregateName: string = 'IamAccount';
    public readonly mapper: AccountMapper = new AccountMapper();

    constructor(
        @InjectModel(IamAccountModel)
        public readonly repository: typeof IamAccountModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }
    // hook called after create aggregate
    async createdAggregateHook(aggregate: IamAccount, model: IamAccountModel)
    {
        // add many to many relation
        if (aggregate.roleIds.length > 0) await model.$add('roles', aggregate.roleIds.value);
        if (aggregate.tenantIds.length > 0) await model.$add('tenants', aggregate.tenantIds.value);
    }

    // hook called after create aggregate
    async updatedAggregateHook(aggregate: IamAccount, model: IamAccountModel)
    {
        // set many to many relation
        if (aggregate.roleIds.isArray()) await model.$set('roles', aggregate.roleIds.value);
        if (aggregate.tenantIds.isArray()) await model.$set('tenants', aggregate.tenantIds.value);
    }
}