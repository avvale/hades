
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { AdminLang } from './lang.entity';
import { LangId } from './value-objects';

export abstract class ILangRepository implements IRepository<AdminLang>
{
    abstract readonly repository: any;
    
    // save a single record
    abstract async save(lang: AdminLang): Promise<void>;

    // save a single or multiple records
    abstract async insert(langs: AdminLang[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<AdminLang | null>;

    // find a single record by id
    abstract async findById(id: LangId): Promise<AdminLang | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<AdminLang[]>;

    // update record
    abstract async update(lang: AdminLang): Promise<void>;
  
    // delete record
    abstract async delete(id: LangId): Promise<void>;
}