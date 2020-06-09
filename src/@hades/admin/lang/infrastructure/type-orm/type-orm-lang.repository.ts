import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmRepository } from '@hades/shared/infrastructure/persistence/type-orm/type-orm.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ILangRepository } from './../../domain/lang.repository';
import { AdminLang } from './../../domain/lang.entity';
import { LangSchema } from './type-orm-lang.schema';

@Injectable()
export class TypeOrmLangRepository extends TypeOrmRepository<AdminLang> implements ILangRepository
{
    public readonly entityName: string = 'AdminLang';

    constructor(
        @InjectRepository(LangSchema)
        public readonly repository: Repository<AdminLang>,
        public readonly criteriaService: ICriteria
    ) {
        super();
    }
}