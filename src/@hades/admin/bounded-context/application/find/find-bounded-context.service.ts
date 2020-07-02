import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';
import { AdminBoundedContext } from './../../domain/bounded-context.aggregate';

@Injectable()
export class FindBoundedContextService
{
    constructor(
        private readonly repository: IBoundedContextRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<AdminBoundedContext>
    {        
        return await this.repository.find(queryStatements);
    }
}