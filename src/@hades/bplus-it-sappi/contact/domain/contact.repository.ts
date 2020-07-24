
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiContact } from './contact.aggregate';
import { ContactId } from './value-objects';

export abstract class IContactRepository implements IRepository<BplusItSappiContact>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiContact>>;

    // create a single record
    abstract async create(contact: BplusItSappiContact): Promise<void>;

    // create a single or multiple records
    abstract async insert(contacts: BplusItSappiContact[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiContact | null>;

    // find a single record by id
    abstract async findById(id: ContactId): Promise<BplusItSappiContact | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiContact[]>;

    // update record
    abstract async update(contact: BplusItSappiContact): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ContactId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}