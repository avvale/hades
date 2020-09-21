import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize/types';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IApplicationRepository } from './../../domain/application.repository';
import { OAuthApplication } from './../../domain/application.aggregate';
import { ApplicationMapper } from './../../domain/application.mapper';
import { OAuthApplicationModel } from './sequelize-application.model';

@Injectable()
export class SequelizeApplicationRepository extends SequelizeRepository<OAuthApplication, OAuthApplicationModel> implements IApplicationRepository
{
    public readonly aggregateName: string = 'OAuthApplication';
    public readonly mapper: ApplicationMapper = new ApplicationMapper();

    constructor(
        @InjectModel(OAuthApplicationModel)
        public readonly repository: typeof OAuthApplicationModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }
    
    // hook called after create aggregate
    createdAggregateHook(aggregate: OAuthApplication, model: OAuthApplicationModel) 
    {
        // add many to many relation
        
        if (aggregate.clientIds.length > 0) model.$add('clientIds', aggregate.clientIds.value);
        
    }

    // hook called after create aggregate
    updatedAggregateHook(aggregate: OAuthApplication, model: OAuthApplicationModel) 
    {
         // set many to many relation
        
        if (aggregate.clientIds.isArray()) model.$set('clientIds', aggregate.clientIds.value);
         
    }
    
}