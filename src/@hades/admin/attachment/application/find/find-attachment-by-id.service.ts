import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAttachmentRepository } from './../../domain/attachment.repository';
import { AdminAttachment } from './../../domain/attachment.aggregate';
import { AttachmentId } from './../../domain/value-objects';

@Injectable()
export class FindAttachmentByIdService
{
    constructor(
        private readonly repository: IAttachmentRepository,
    ) {}

    public async main(id: AttachmentId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachment>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}