import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';
import { AdminBoundedContext } from './../../domain/bounded-context.aggregate';

@Injectable()
export class PaginateBoundedContextsService
{
    constructor(
        private readonly repository: IBoundedContextRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<AdminBoundedContext>>
    {        
        return await this.repository.paginate(queryStatements, constraints);
    }
}