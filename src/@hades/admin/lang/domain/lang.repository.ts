
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminLang } from './lang.aggregate';
import { LangId } from './value-objects';

export abstract class ILangRepository implements IRepository<AdminLang>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<AdminLang>>;

    // create a single record
    abstract async create(lang: AdminLang): Promise<void>;

    // create a single or multiple records
    abstract async insert(langs: AdminLang[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<AdminLang | null>;

    // find a single record by id
    abstract async findById(id: LangId): Promise<AdminLang | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<AdminLang[]>;

    // update record
    abstract async update(lang: AdminLang): Promise<void>;
  
    // delete record
    abstract async deleteById(id: LangId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}