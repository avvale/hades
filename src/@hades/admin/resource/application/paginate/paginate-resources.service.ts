import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IResourceRepository } from './../../domain/resource.repository';
import { AdminResource } from './../../domain/resource.aggregate';

@Injectable()
export class PaginateResourcesService
{
    constructor(
        private readonly repository: IResourceRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<AdminResource>>
    {        
        return await this.repository.paginate(queryStatements, constraints);
    }
}