import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IContactRepository } from './../../domain/contact.repository';
import { BplusItSappiContact } from './../../domain/contact.aggregate';
import { BplusItSappiContactModel } from './sequelize-contact.model';
import { SequelizeContactMapper } from './sequelize-contact.mapper';

@Injectable()
export class SequelizeContactRepository extends SequelizeRepository<BplusItSappiContact> implements IContactRepository
{
    public readonly aggregateName: string = 'BplusItSappiContact';
    public readonly mapper: SequelizeContactMapper = new SequelizeContactMapper();

    constructor(
        @InjectModel(BplusItSappiContactModel)
        public readonly repository: typeof BplusItSappiContactModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}