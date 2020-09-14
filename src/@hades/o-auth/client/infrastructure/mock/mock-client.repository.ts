import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IClientRepository } from './../../domain/client.repository';
import { 
    ClientId, 
    ClientGrantType, 
    ClientName, 
    ClientSecret, 
    ClientAuthUrl, 
    ClientRedirect, 
    ClientResourceCodes, 
    ClientExpiredAccessToken, 
    ClientExpiredRefreshToken, 
    ClientIsRevoked, 
    ClientIsMaster, 
    ClientCreatedAt, 
    ClientUpdatedAt, 
    ClientDeletedAt
    
} from '@hades/o-auth/client/domain/value-objects';
import { OAuthClient } from './../../domain/client.aggregate';
import { clients } from './../seeds/client.seed';

@Injectable()
export class MockClientRepository implements IClientRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthClient';
    public collectionSource: OAuthClient[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(client => client.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>clients)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(OAuthClient.register(
                    new ClientId(itemCollection.id),
                    new ClientGrantType(itemCollection.grantType),
                    new ClientName(itemCollection.name),
                    new ClientSecret(itemCollection.secret),
                    new ClientAuthUrl(itemCollection.authUrl),
                    new ClientRedirect(itemCollection.redirect),
                    new ClientResourceCodes(itemCollection.resourceCodes),
                    new ClientExpiredAccessToken(itemCollection.expiredAccessToken),
                    new ClientExpiredRefreshToken(itemCollection.expiredRefreshToken),
                    new ClientIsRevoked(itemCollection.isRevoked),
                    new ClientIsMaster(itemCollection.isMaster),
                    new ClientCreatedAt(itemCollection.createdAt),
                    new ClientUpdatedAt(itemCollection.updatedAt),
                    new ClientDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<OAuthClient>>
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
    
    async create(client: OAuthClient): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === client.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${client.id.value} already exist in database`);

        // create deletedAt null 
        client.deletedAt = new ClientDeletedAt(null);

        this.collectionSource.push(client);
    }

    async insert(client: OAuthClient[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<OAuthClient> 
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

    async findById(id: UuidValueObject): Promise<OAuthClient>
    {
        const aggregate = this.collectionSource.find(client => client.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<OAuthClient[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: OAuthClient): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(client => {
            if (client.id.value === aggregate.id.value) return aggregate;
            return client;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(client => client.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}