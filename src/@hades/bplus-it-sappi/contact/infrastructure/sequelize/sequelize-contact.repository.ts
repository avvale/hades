import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IContactRepository } from './../../domain/contact.repository';
import { BplusItSappiContact } from './../../domain/contact.aggregate';
import { ContactMapper } from './../../domain/contact.mapper';
import { BplusItSappiContactModel } from './sequelize-contact.model';

@Injectable()
export class SequelizeContactRepository extends SequelizeRepository<BplusItSappiContact> implements IContactRepository
{
    public readonly aggregateName: string = 'BplusItSappiContact';
    public readonly mapper: ContactMapper = new ContactMapper();

    constructor(
        @InjectModel(BplusItSappiContactModel)
        public readonly repository: typeof BplusItSappiContactModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}