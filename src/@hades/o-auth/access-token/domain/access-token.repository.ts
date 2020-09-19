
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { OAuthAccessToken } from './access-token.aggregate';
import { AccessTokenId } from './value-objects';

export abstract class IAccessTokenRepository implements IRepository<OAuthAccessToken>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<OAuthAccessToken>>;

    // create a single record
    abstract async create(accessToken: OAuthAccessToken): Promise<void>;

    // create a single or multiple records
    abstract async insert(accessTokens: OAuthAccessToken[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<OAuthAccessToken | null>;

    // find a single record by id
    abstract async findById(id: AccessTokenId): Promise<OAuthAccessToken | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<OAuthAccessToken[]>;

    // update record
    abstract async update(accessToken: OAuthAccessToken): Promise<void>;
  
    // delete record
    abstract async deleteById(id: AccessTokenId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}