import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IContactRepository } from './../../domain/contact.repository';
import { CciContact } from './../../domain/contact.aggregate';

@Injectable()
export class FindContactService
{
    constructor(
        private readonly repository: IContactRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<CciContact>
    {        
        return await this.repository.find(queryStatement);
    }
}