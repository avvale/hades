
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IamAccount } from './account.aggregate';
import { AccountId } from './value-objects';

export abstract class IAccountRepository implements IRepository<IamAccount>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<IamAccount>>;

    // create a single record
    abstract async create(account: IamAccount): Promise<void>;

    // create a single or multiple records
    abstract async insert(accounts: IamAccount[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<IamAccount | null>;

    // find a single record by id
    abstract async findById(id: AccountId): Promise<IamAccount | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<IamAccount[]>;

    // update record
    abstract async update(account: IamAccount): Promise<void>;
  
    // delete record
    abstract async deleteById(id: AccountId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}