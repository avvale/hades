
import { Repository } from 'typeorm';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { Lang } from './lang';
import { LangId } from './value-objects';

export abstract class ILangRepository implements IRepository<Lang>
{
    abstract repository: Repository<Lang>;
    
    // save a single record
    abstract async save(lang: Lang): Promise<void>;

    // save a single or multiple records
    abstract async insert(langs: Lang[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<Lang | null>;

    // find a single record by id
    abstract async findById(id: LangId): Promise<Lang | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<Lang[]>;

    // update record
    abstract async update(lang: Lang): Promise<void>;
  
    // delete record
    abstract async delete(id: LangId): Promise<void>;
}