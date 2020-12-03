import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IPartnerRepository } from './../../domain/partner.repository';
import { OrigenPartner } from './../../domain/partner.aggregate';
import { PartnerMapper } from './../../domain/partner.mapper';
import { OrigenPartnerModel } from './sequelize-partner.model';

@Injectable()
export class SequelizePartnerRepository extends SequelizeRepository<OrigenPartner, OrigenPartnerModel> implements IPartnerRepository
{
    public readonly aggregateName: string = 'OrigenPartner';
    public readonly mapper: PartnerMapper = new PartnerMapper();

    constructor(
        @InjectModel(OrigenPartnerModel)
        public readonly repository: typeof OrigenPartnerModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}