import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IContactRepository } from './../../domain/contact.repository';
import { BplusItSappiContact } from './../../domain/contact.aggregate';

@Injectable()
export class FindContactService
{
    constructor(
        private readonly repository: IContactRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiContact>
    {        
        return await this.repository.find(queryStatements);
    }
}