import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAttachmentFamilyRepository } from './../../domain/attachment-family.repository';
import { AdminAttachmentFamily } from './../../domain/attachment-family.aggregate';
import { AttachmentFamilyId } from './../../domain/value-objects';

@Injectable()
export class FindAttachmentFamilyByIdService
{
    constructor(
        private readonly repository: IAttachmentFamilyRepository,
    ) {}

    public async main(id: AttachmentFamilyId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentFamily>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}