
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { NfcAction } from './action.aggregate';
import { ActionId } from './value-objects';

export abstract class IActionRepository implements IRepository<NfcAction>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<NfcAction>>;

    // create a single record
    abstract async create(action: NfcAction): Promise<void>;

    // create a single or multiple records
    abstract async insert(actions: NfcAction[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<NfcAction | null>;

    // find a single record by id
    abstract async findById(id: ActionId): Promise<NfcAction | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<NfcAction[]>;

    // update record
    abstract async update(action: NfcAction): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ActionId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}