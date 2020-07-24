import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { BplusItSappiMessageDetail } from './../../domain/message-detail.aggregate';

@Injectable()
export class PaginateMessagesDetailService
{
    constructor(
        private readonly repository: IMessageDetailRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiMessageDetail>>
    {        
        return await this.repository.paginate(queryStatements, constraints);
    }
}