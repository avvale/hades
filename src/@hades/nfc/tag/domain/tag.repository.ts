
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { NfcTag } from './tag.aggregate';
import { TagId } from './value-objects';

export abstract class ITagRepository implements IRepository<NfcTag>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<NfcTag>>;

    // create a single record
    abstract async create(tag: NfcTag): Promise<void>;

    // create a single or multiple records
    abstract async insert(tags: NfcTag[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<NfcTag | null>;

    // find a single record by id
    abstract async findById(id: TagId): Promise<NfcTag | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<NfcTag[]>;

    // update record
    abstract async update(tag: NfcTag): Promise<void>;
  
    // delete record
    abstract async deleteById(id: TagId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}