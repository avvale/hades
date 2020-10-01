
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciContact } from './contact.aggregate';
import { ContactId } from './value-objects';

export abstract class IContactRepository implements IRepository<CciContact>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<CciContact>>;

    // create a single record
    abstract async create(contact: CciContact): Promise<void>;

    // create a single or multiple records
    abstract async insert(contacts: CciContact[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<CciContact | null>;

    // find a single record by id
    abstract async findById(id: ContactId): Promise<CciContact | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<CciContact[]>;

    // update record
    abstract async update(contact: CciContact): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ContactId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}