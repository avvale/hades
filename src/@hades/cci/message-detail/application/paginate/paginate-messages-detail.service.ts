import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { CciMessageDetail } from './../../domain/message-detail.aggregate';

@Injectable()
export class PaginateMessagesDetailService
{
    constructor(
        private readonly repository: IMessageDetailRepository
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement): Promise<Pagination<CciMessageDetail>>
    {        
        return await this.repository.paginate(queryStatement, constraint);
    }
}