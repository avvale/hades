import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAttachmentRepository } from './../../domain/attachment.repository';
import { AdminAttachment } from './../../domain/attachment.aggregate';

@Injectable()
export class GetAttachmentsService
{
    constructor(
        private readonly repository: IAttachmentRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachment[]>
    {
        return await this.repository.get(queryStatement, constraint, cQMetadata);
    }
}