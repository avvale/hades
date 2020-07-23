import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IContactRepository } from './../../domain/contact.repository';
import { 
    ContactId, 
    ContactTenantId, 
    ContactTenantCode, 
    ContactSystemId, 
    ContactSystemName, 
    ContactRoleId, 
    ContactRoleName, 
    ContactName, 
    ContactSurname, 
    ContactEmail, 
    ContactMobile, 
    ContactArea, 
    ContactHasConsentEmail, 
    ContactHasConsentMobile, 
    ContactIsActive, 
    ContactCreatedAt, 
    ContactUpdatedAt, 
    ContactDeletedAt
    
} from '@hades/bplus-it-sappi/contact/domain/value-objects';
import { BplusItSappiContact } from './../../domain/contact.aggregate';
import { contacts } from './../seeds/contact.seed';

@Injectable()
export class MockContactRepository implements IContactRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'BplusItSappiContact';
    public collectionSource: BplusItSappiContact[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(contact => contact.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>contacts)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(BplusItSappiContact.register(
                    new ContactId(itemCollection.id),
                    new ContactTenantId(itemCollection.tenantId),
                    new ContactTenantCode(itemCollection.tenantCode),
                    new ContactSystemId(itemCollection.systemId),
                    new ContactSystemName(itemCollection.systemName),
                    new ContactRoleId(itemCollection.roleId),
                    new ContactRoleName(itemCollection.roleName),
                    new ContactName(itemCollection.name),
                    new ContactSurname(itemCollection.surname),
                    new ContactEmail(itemCollection.email),
                    new ContactMobile(itemCollection.mobile),
                    new ContactArea(itemCollection.area),
                    new ContactHasConsentEmail(itemCollection.hasConsentEmail),
                    new ContactHasConsentMobile(itemCollection.hasConsentMobile),
                    new ContactIsActive(itemCollection.isActive),
                    new ContactCreatedAt(itemCollection.createdAt),
                    new ContactUpdatedAt(itemCollection.updatedAt),
                    new ContactDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiContact>>
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
    
    async create(contact: BplusItSappiContact): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === contact.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${contact.id.value} already exist in database`);

        // create deletedAt null 
        contact.deletedAt = new ContactDeletedAt(null);

        this.collectionSource.push(contact);
    }

    async insert(contact: BplusItSappiContact[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiContact> 
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

    async findById(id: UuidValueObject): Promise<BplusItSappiContact>
    {
        const aggregate = this.collectionSource.find(contact => contact.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiContact[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: BplusItSappiContact): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(contact => {
            if (contact.id.value === aggregate.id.value) return aggregate;
            return contact;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(contact => contact.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}