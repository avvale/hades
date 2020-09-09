import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IApplicationRepository } from './../../domain/application.repository';
import { OAuthApplication } from './../../domain/application.aggregate';
import { ApplicationMapper } from './../../domain/application.mapper';
import { OAuthApplicationModel } from './sequelize-application.model';

@Injectable()
export class SequelizeApplicationRepository extends SequelizeRepository<OAuthApplication> implements IApplicationRepository
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

    
}