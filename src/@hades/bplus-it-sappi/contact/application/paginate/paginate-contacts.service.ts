import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IContactRepository } from './../../domain/contact.repository';
import { BplusItSappiContact } from './../../domain/contact.aggregate';

@Injectable()
export class PaginateContactsService
{
    constructor(
        private readonly repository: IContactRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiContact>>
    {        
        return await this.repository.paginate(queryStatements, constraints);
    }
}