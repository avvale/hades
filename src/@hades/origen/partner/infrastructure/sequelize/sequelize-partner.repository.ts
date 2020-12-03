import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IPartnerRepository } from './../../domain/partner.repository';
import { OriginPartner } from './../../domain/partner.aggregate';
import { PartnerMapper } from './../../domain/partner.mapper';
import { OriginPartnerModel } from './sequelize-partner.model';

@Injectable()
export class SequelizePartnerRepository extends SequelizeRepository<OriginPartner, OriginPartnerModel> implements IPartnerRepository
{
    public readonly aggregateName: string = 'OriginPartner';
    public readonly mapper: PartnerMapper = new PartnerMapper();

    constructor(
        @InjectModel(OriginPartnerModel)
        public readonly repository: typeof OriginPartnerModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}