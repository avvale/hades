import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';
import { IamBoundedContext } from './../../domain/bounded-context.aggregate';
import { BoundedContextId } from './../../domain/value-objects';

@Injectable()
export class FindBoundedContextByIdService
{
    constructor(
        private readonly repository: IBoundedContextRepository,
    ) {}

    public async main(id: BoundedContextId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamBoundedContext>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}