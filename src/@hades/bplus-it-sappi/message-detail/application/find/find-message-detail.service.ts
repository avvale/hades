import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { BplusItSappiMessageDetail } from './../../domain/message-detail.aggregate';

@Injectable()
export class FindMessageDetailService
{
    constructor(
        private readonly repository: IMessageDetailRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiMessageDetail>
    {        
        return await this.repository.find(queryStatements);
    }
}