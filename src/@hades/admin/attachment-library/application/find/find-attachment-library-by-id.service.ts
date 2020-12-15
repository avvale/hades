import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAttachmentLibraryRepository } from './../../domain/attachment-library.repository';
import { AdminAttachmentLibrary } from './../../domain/attachment-library.aggregate';
import { AttachmentLibraryId } from './../../domain/value-objects';

@Injectable()
export class FindAttachmentLibraryByIdService
{
    constructor(
        private readonly repository: IAttachmentLibraryRepository,
    ) {}

    public async main(id: AttachmentLibraryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentLibrary>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}