import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IResourceRepository } from './../../domain/resource.repository';
import { AdminResource } from './../../domain/resource.aggregate';

@Injectable()
export class PaginateResourcesService
{
    constructor(
        private readonly repository: IResourceRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminResource>>
    {
        return await this.repository.paginate(queryStatement, constraint, cQMetadata);
    }
}