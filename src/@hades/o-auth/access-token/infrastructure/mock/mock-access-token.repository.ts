import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IAccessTokenRepository } from './../../domain/access-token.repository';
import { 
    AccessTokenId, 
    AccessTokenClientId, 
    AccessTokenToken, 
    AccessTokenName, 
    AccessTokenIsRevoked, 
    AccessTokenExpiresAt, 
    AccessTokenCreatedAt, 
    AccessTokenUpdatedAt, 
    AccessTokenDeletedAt
    
} from '@hades/o-auth/access-token/domain/value-objects';
import { OAuthAccessToken } from './../../domain/access-token.aggregate';
import { accessTokens } from './../seeds/access-token.seed';

@Injectable()
export class MockAccessTokenRepository implements IAccessTokenRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthAccessToken';
    public collectionSource: OAuthAccessToken[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(accessToken => accessToken.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>accessTokens)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(OAuthAccessToken.register(
                    new AccessTokenId(itemCollection.id),
                    new AccessTokenClientId(itemCollection.clientId),
                    new AccessTokenToken(itemCollection.token),
                    new AccessTokenName(itemCollection.name),
                    new AccessTokenIsRevoked(itemCollection.isRevoked),
                    new AccessTokenExpiresAt(itemCollection.expiresAt),
                    new AccessTokenCreatedAt(itemCollection.createdAt),
                    new AccessTokenUpdatedAt(itemCollection.updatedAt),
                    new AccessTokenDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<OAuthAccessToken>>
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
    
    async create(accessToken: OAuthAccessToken): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === accessToken.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${accessToken.id.value} already exist in database`);

        // create deletedAt null 
        accessToken.deletedAt = new AccessTokenDeletedAt(null);

        this.collectionSource.push(accessToken);
    }

    async insert(accessToken: OAuthAccessToken[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<OAuthAccessToken> 
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

    async findById(id: UuidValueObject): Promise<OAuthAccessToken>
    {
        const aggregate = this.collectionSource.find(accessToken => accessToken.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<OAuthAccessToken[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: OAuthAccessToken): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(accessToken => {
            if (accessToken.id.value === aggregate.id.value) return aggregate;
            return accessToken;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(accessToken => accessToken.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}