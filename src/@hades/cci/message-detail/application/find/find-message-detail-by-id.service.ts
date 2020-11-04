import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { CciMessageDetail } from './../../domain/message-detail.aggregate';
import { MessageDetailId } from './../../domain/value-objects';

@Injectable()
export class FindMessageDetailByIdService
{
    constructor(
        private readonly repository: IMessageDetailRepository,
    ) {}

    public async main(id: MessageDetailId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciMessageDetail>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}