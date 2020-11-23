import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IAdministrativeAreaLevel1Repository } from './../../domain/administrative-area-level-1.repository';
import { AdminAdministrativeAreaLevel1 } from './../../domain/administrative-area-level-1.aggregate';
import { AdministrativeAreaLevel1Mapper } from './../../domain/administrative-area-level-1.mapper';
import { AdminAdministrativeAreaLevel1Model } from './sequelize-administrative-area-level-1.model';

@Injectable()
export class SequelizeAdministrativeAreaLevel1Repository extends SequelizeRepository<AdminAdministrativeAreaLevel1, AdminAdministrativeAreaLevel1Model> implements IAdministrativeAreaLevel1Repository
{
    public readonly aggregateName: string = 'AdminAdministrativeAreaLevel1';
    public readonly mapper: AdministrativeAreaLevel1Mapper = new AdministrativeAreaLevel1Mapper();

    constructor(
        @InjectModel(AdminAdministrativeAreaLevel1Model)
        public readonly repository: typeof AdminAdministrativeAreaLevel1Model,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}