import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize/types';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ITenantRepository } from './../../domain/tenant.repository';
import { IamTenant } from './../../domain/tenant.aggregate';
import { TenantMapper } from './../../domain/tenant.mapper';
import { IamTenantModel } from './sequelize-tenant.model';

@Injectable()
export class SequelizeTenantRepository extends SequelizeRepository<IamTenant, IamTenantModel> implements ITenantRepository
{
    public readonly aggregateName: string = 'IamTenant';
    public readonly mapper: TenantMapper = new TenantMapper();

    constructor(
        @InjectModel(IamTenantModel)
        public readonly repository: typeof IamTenantModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }
    
    // hook called after create aggregate
    async createdAggregateHook(aggregate: IamTenant, model: IamTenantModel) 
    {
        // add many to many relation
        
        if (aggregate.accountIds.length > 0) await model.$add('accountIds', aggregate.accountIds.value);
        
    }

    // hook called after create aggregate
    async updatedAggregateHook(aggregate: IamTenant, model: IamTenantModel) 
    {
        // set many to many relation
        
        if (aggregate.accountIds.isArray()) await model.$set('accountIds', aggregate.accountIds.value);
         
    }
    
}