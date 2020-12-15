import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IAttachmentLibraryRepository } from './../../domain/attachment-library.repository';
import { AdminAttachmentLibrary } from './../../domain/attachment-library.aggregate';

@Injectable()
export class GetAttachmentLibraryService
{
    constructor(
        private readonly repository: IAttachmentLibraryRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentLibrary[]>
    {
        return await this.repository.get(queryStatement, constraint, cQMetadata);
    }
}