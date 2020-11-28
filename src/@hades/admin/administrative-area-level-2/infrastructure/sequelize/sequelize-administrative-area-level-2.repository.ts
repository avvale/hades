import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IAdministrativeAreaLevel2Repository } from './../../domain/administrative-area-level-2.repository';
import { AdminAdministrativeAreaLevel2 } from './../../domain/administrative-area-level-2.aggregate';
import { AdministrativeAreaLevel2Mapper } from './../../domain/administrative-area-level-2.mapper';
import { AdminAdministrativeAreaLevel2Model } from './sequelize-administrative-area-level-2.model';

@Injectable()
export class SequelizeAdministrativeAreaLevel2Repository extends SequelizeRepository<AdminAdministrativeAreaLevel2, AdminAdministrativeAreaLevel2Model> implements IAdministrativeAreaLevel2Repository
{
    public readonly aggregateName: string = 'AdminAdministrativeAreaLevel2';
    public readonly mapper: AdministrativeAreaLevel2Mapper = new AdministrativeAreaLevel2Mapper();

    constructor(
        @InjectModel(AdminAdministrativeAreaLevel2Model)
        public readonly repository: typeof AdminAdministrativeAreaLevel2Model,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}