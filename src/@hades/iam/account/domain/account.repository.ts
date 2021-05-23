
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IamAccount } from './account.aggregate';
import { AccountId } from './value-objects';

export abstract class IAccountRepository implements IRepository<IamAccount>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<IamAccount>>;

    // create a single record
    abstract create(account: IamAccount): Promise<void>;

    // create a single or multiple records
    abstract insert(accounts: IamAccount[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamAccount | null>;

    // find a single record by id
    abstract findById(id: AccountId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamAccount | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamAccount[]>;

    // update record
    abstract update(account: IamAccount, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: AccountId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}