
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { OAuthAccessToken } from './access-token.aggregate';
import { AccessTokenId } from './value-objects';

export abstract class IAccessTokenRepository implements IRepository<OAuthAccessToken>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<OAuthAccessToken>>;

    // create a single record
    abstract create(accessToken: OAuthAccessToken): Promise<void>;

    // create a single or multiple records
    abstract insert(accessTokens: OAuthAccessToken[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthAccessToken | null>;

    // find a single record by id
    abstract findById(id: AccessTokenId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthAccessToken | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthAccessToken[]>;

    // update record
    abstract update(accessToken: OAuthAccessToken, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: AccessTokenId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}