import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { ISessionRepository } from './../../domain/session.repository';
import { 
    SessionId, 
    SessionIp, 
    SessionTagId, 
    SessionUid, 
    SessionCounter, 
    SessionExpiredAt, 
    SessionCreatedAt, 
    SessionUpdatedAt, 
    SessionDeletedAt
    
} from '@hades/nfc/session/domain/value-objects';
import { NfcSession } from './../../domain/session.aggregate';
import { sessions } from './../seeds/session.seed';

@Injectable()
export class MockSessionRepository implements ISessionRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'NfcSession';
    public collectionSource: NfcSession[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(session => session.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>sessions)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(NfcSession.register(
                    new SessionId(itemCollection.id),
                    new SessionIp(itemCollection.ip),
                    new SessionTagId(itemCollection.tagId),
                    new SessionUid(itemCollection.uid),
                    new SessionCounter(itemCollection.counter),
                    new SessionExpiredAt(itemCollection.expiredAt),
                    new SessionCreatedAt(itemCollection.createdAt),
                    new SessionUpdatedAt(itemCollection.updatedAt),
                    new SessionDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<NfcSession>>
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
    
    async create(session: NfcSession): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === session.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${session.id.value} already exist in database`);

        // create deletedAt null 
        session.deletedAt = new SessionDeletedAt(null);

        this.collectionSource.push(session);
    }

    async insert(session: NfcSession[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<NfcSession> 
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

    async findById(id: UuidValueObject): Promise<NfcSession>
    {
        const aggregate = this.collectionSource.find(session => session.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<NfcSession[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: NfcSession): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(session => {
            if (session.id.value === aggregate.id.value) return aggregate;
            return session;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(session => session.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}