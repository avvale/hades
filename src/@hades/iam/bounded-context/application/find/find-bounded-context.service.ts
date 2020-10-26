import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';
import { IamBoundedContext } from './../../domain/bounded-context.aggregate';

@Injectable()
export class FindBoundedContextService
{
    constructor(
        private readonly repository: IBoundedContextRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<IamBoundedContext>
    {
        return await this.repository.find(queryStatement);
    }
}