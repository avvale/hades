import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { CciMessageDetail } from './../../domain/message-detail.aggregate';

@Injectable()
export class GetMessagesDetailService
{
    constructor(
        private readonly repository: IMessageDetailRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<CciMessageDetail[]>
    {        
        return await this.repository.get(queryStatement);
    }
}