import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize/types';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IContactRepository } from './../../domain/contact.repository';
import { CciContact } from './../../domain/contact.aggregate';
import { ContactMapper } from './../../domain/contact.mapper';
import { CciContactModel } from './sequelize-contact.model';

@Injectable()
export class SequelizeContactRepository extends SequelizeRepository<CciContact, CciContactModel> implements IContactRepository
{
    public readonly aggregateName: string = 'CciContact';
    public readonly mapper: ContactMapper = new ContactMapper();

    constructor(
        @InjectModel(CciContactModel)
        public readonly repository: typeof CciContactModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }
    
}