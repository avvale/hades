import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ILangRepository } from './../../domain/lang.repository';
import { AdminLang } from './../../domain/lang.aggregate';
import { LangMapper } from './../../domain/lang.mapper';
import { AdminLangModel } from './sequelize-lang.model';

@Injectable()
export class SequelizeLangRepository extends SequelizeRepository<AdminLang, AdminLangModel> implements ILangRepository
{
    public readonly aggregateName: string = 'AdminLang';
    public readonly mapper: LangMapper = new LangMapper();

    constructor(
        @InjectModel(AdminLangModel)
        public readonly repository: typeof AdminLangModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}