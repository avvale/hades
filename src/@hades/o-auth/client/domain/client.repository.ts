
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { OAuthClient } from './client.aggregate';
import { ClientId } from './value-objects';

export abstract class IClientRepository implements IRepository<OAuthClient>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<OAuthClient>>;

    // create a single record
    abstract create(client: OAuthClient): Promise<void>;

    // create a single or multiple records
    abstract insert(clients: OAuthClient[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthClient | null>;

    // find a single record by id
    abstract findById(id: ClientId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthClient | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthClient[]>;

    // update record
    abstract update(client: OAuthClient, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: ClientId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}