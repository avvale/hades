import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ILangRepository } from './../../domain/lang.repository';
import { AdminLang } from './../../domain/lang.entity';
import { AdminLangModel } from './sequelize-lang.model';
import { SequelizeLangMapper } from './sequelize-lang.mapper';

@Injectable()
export class SequelizeLangRepository extends SequelizeRepository<AdminLang> implements ILangRepository
{
    public readonly entityName: string = 'AdminLang';
    public readonly mapper: SequelizeLangMapper = new SequelizeLangMapper();

    constructor(
        @InjectModel(AdminLangModel)
        public readonly repository: typeof AdminLangModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }
}