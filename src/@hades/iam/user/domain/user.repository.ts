
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IamUser } from './user.aggregate';
import { UserId } from './value-objects';

export abstract class IUserRepository implements IRepository<IamUser>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<IamUser>>;

    // create a single record
    abstract async create(user: IamUser): Promise<void>;

    // create a single or multiple records
    abstract async insert(users: IamUser[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<IamUser | null>;

    // find a single record by id
    abstract async findById(id: UserId): Promise<IamUser | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<IamUser[]>;

    // update record
    abstract async update(user: IamUser): Promise<void>;
  
    // delete record
    abstract async deleteById(id: UserId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}