import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IAdministrativeAreaLevel3Repository } from './../../domain/administrative-area-level-3.repository';
import { AdminAdministrativeAreaLevel3 } from './../../domain/administrative-area-level-3.aggregate';
import { AdministrativeAreaLevel3Mapper } from './../../domain/administrative-area-level-3.mapper';
import { AdminAdministrativeAreaLevel3Model } from './sequelize-administrative-area-level-3.model';

@Injectable()
export class SequelizeAdministrativeAreaLevel3Repository extends SequelizeRepository<AdminAdministrativeAreaLevel3, AdminAdministrativeAreaLevel3Model> implements IAdministrativeAreaLevel3Repository
{
    public readonly aggregateName: string = 'AdminAdministrativeAreaLevel3';
    public readonly mapper: AdministrativeAreaLevel3Mapper = new AdministrativeAreaLevel3Mapper();

    constructor(
        @InjectModel(AdminAdministrativeAreaLevel3Model)
        public readonly repository: typeof AdminAdministrativeAreaLevel3Model,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}