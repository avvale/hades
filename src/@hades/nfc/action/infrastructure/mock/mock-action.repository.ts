import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IActionRepository } from './../../domain/action.repository';
import { 
    ActionId, 
    ActionTagId, 
    ActionType, 
    ActionSectionId, 
    ActionData, 
    ActionCreatedAt, 
    ActionUpdatedAt, 
    ActionDeletedAt
    
} from '@hades/nfc/action/domain/value-objects';
import { NfcAction } from './../../domain/action.aggregate';
import { actions } from './../seeds/action.seed';

@Injectable()
export class MockActionRepository implements IActionRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'NfcAction';
    public collectionSource: NfcAction[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(action => action.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>actions)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(NfcAction.register(
                    new ActionId(itemCollection.id),
                    new ActionTagId(itemCollection.tagId),
                    new ActionType(itemCollection.type),
                    new ActionSectionId(itemCollection.sectionId),
                    new ActionData(itemCollection.data),
                    new ActionCreatedAt(itemCollection.createdAt),
                    new ActionUpdatedAt(itemCollection.updatedAt),
                    new ActionDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<NfcAction>>
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
    
    async create(action: NfcAction): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === action.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${action.id.value} already exist in database`);

        // create deletedAt null 
        action.deletedAt = new ActionDeletedAt(null);

        this.collectionSource.push(action);
    }

    async insert(action: NfcAction[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<NfcAction> 
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

    async findById(id: UuidValueObject): Promise<NfcAction>
    {
        const aggregate = this.collectionSource.find(action => action.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<NfcAction[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: NfcAction): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(action => {
            if (action.id.value === aggregate.id.value) return aggregate;
            return action;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(action => action.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}