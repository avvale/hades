import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ILangRepository } from './../../domain/lang.repository';
import { AdminLang } from './../../domain/lang.entity';
import { LangModel } from './sequelize-lang.model';

@Injectable()
export class SequelizeLangRepository extends SequelizeRepository<AdminLang> implements ILangRepository
{
    public readonly entityName: string = 'AdminLang';

    constructor(
        @InjectModel(LangModel)
        public readonly repository: typeof LangModel,
        public readonly criteriaService: ICriteria
    ) {
        super();
    }
}