import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IAttachmentFamilyRepository } from './../../domain/attachment-family.repository';
import { AdminAttachmentFamily } from './../../domain/attachment-family.aggregate';

@Injectable()
export class PaginateAttachmentFamiliesService
{
    constructor(
        private readonly repository: IAttachmentFamilyRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminAttachmentFamily>>
    {
        return await this.repository.paginate(queryStatement, constraint, cQMetadata);
    }
}