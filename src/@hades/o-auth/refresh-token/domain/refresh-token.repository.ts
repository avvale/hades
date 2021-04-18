
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { OAuthRefreshToken } from './refresh-token.aggregate';
import { RefreshTokenId } from './value-objects';

export abstract class IRefreshTokenRepository implements IRepository<OAuthRefreshToken>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<OAuthRefreshToken>>;

    // create a single record
    abstract create(refreshToken: OAuthRefreshToken): Promise<void>;

    // create a single or multiple records
    abstract insert(refreshTokens: OAuthRefreshToken[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthRefreshToken | null>;

    // find a single record by id
    abstract findById(id: RefreshTokenId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthRefreshToken | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthRefreshToken[]>;

    // update record
    abstract update(refreshToken: OAuthRefreshToken, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: RefreshTokenId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}