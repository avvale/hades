import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IRefreshTokenRepository } from './../../domain/refresh-token.repository';
import { 
    RefreshTokenId, 
    RefreshTokenAccessTokenId, 
    RefreshTokenToken, 
    RefreshTokenIsRevoked, 
    RefreshTokenExpiresAt, 
    RefreshTokenCreatedAt, 
    RefreshTokenUpdatedAt, 
    RefreshTokenDeletedAt
    
} from '@hades/o-auth/refresh-token/domain/value-objects';
import { OAuthRefreshToken } from './../../domain/refresh-token.aggregate';
import { refreshTokens } from './../seeds/refresh-token.seed';

@Injectable()
export class MockRefreshTokenRepository implements IRefreshTokenRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthRefreshToken';
    public collectionSource: OAuthRefreshToken[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(refreshToken => refreshToken.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>refreshTokens)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(OAuthRefreshToken.register(
                    new RefreshTokenId(itemCollection.id),
                    new RefreshTokenAccessTokenId(itemCollection.accessTokenId),
                    new RefreshTokenToken(itemCollection.token),
                    new RefreshTokenIsRevoked(itemCollection.isRevoked),
                    new RefreshTokenExpiresAt(itemCollection.expiresAt),
                    new RefreshTokenCreatedAt(itemCollection.createdAt),
                    new RefreshTokenUpdatedAt(itemCollection.updatedAt),
                    new RefreshTokenDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<OAuthRefreshToken>>
    {
        let offset  = 0;
        let limit   = this.collectionSource.length;
        for (const queryStatement of queryStatements)
        {
            if (queryStatement.command === Command.OFFSET)  offset = queryStatement.value;
            if (queryStatement.command === Command.LIMIT)   limit = queryStatement.value;
        }
        return { 
            total   : this.collectionSource.length, 
            count   : this.collectionSource.length, 
            rows    : this.collectionSource.slice(offset,limit)
        };
    }
    
    async create(refreshToken: OAuthRefreshToken): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === refreshToken.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${refreshToken.id.value} already exist in database`);

        // create deletedAt null 
        refreshToken.deletedAt = new RefreshTokenDeletedAt(null);

        this.collectionSource.push(refreshToken);
    }

    async insert(refreshToken: OAuthRefreshToken[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<OAuthRefreshToken> 
    {
        const response = this.collectionSource.filter(aggregate => {
            let result = true;
            for (const queryStatement of queryStatements)
            {
                result = aggregate[queryStatement.column].value === queryStatement.value
            }
            return result;
        });

        const aggregate = response[0];

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async findById(id: UuidValueObject): Promise<OAuthRefreshToken>
    {
        const aggregate = this.collectionSource.find(refreshToken => refreshToken.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<OAuthRefreshToken[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: OAuthRefreshToken): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(refreshToken => {
            if (refreshToken.id.value === aggregate.id.value) return aggregate;
            return refreshToken;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(refreshToken => refreshToken.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}