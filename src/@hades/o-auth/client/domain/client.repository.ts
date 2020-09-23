
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { OAuthClient } from './client.aggregate';
import { ClientId } from './value-objects';

export abstract class IClientRepository implements IRepository<OAuthClient>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<OAuthClient>>;

    // create a single record
    abstract async create(client: OAuthClient): Promise<void>;

    // create a single or multiple records
    abstract async insert(clients: OAuthClient[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<OAuthClient | null>;

    // find a single record by id
    abstract async findById(id: ClientId): Promise<OAuthClient | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<OAuthClient[]>;

    // update record
    abstract async update(client: OAuthClient): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ClientId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}