import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BoundedContextResponse } from './../../domain/bounded-context.response';
import { BoundedContextId } from './../../domain/value-objects';
import { FindBoundedContextByIdQuery } from './find-bounded-context-by-id.query';
import { FindBoundedContextByIdService } from './find-bounded-context-by-id.service';

@QueryHandler(FindBoundedContextByIdQuery)
export class FindBoundedContextByIdQueryHandler implements IQueryHandler<FindBoundedContextByIdQuery>
{
    constructor(
        private readonly findBoundedContextByIdService: FindBoundedContextByIdService
    ) { }

    async execute(query: FindBoundedContextByIdQuery): Promise<BoundedContextResponse>
    {
        const boundedContext = await this.findBoundedContextByIdService.main(new BoundedContextId(query.id));

        return new BoundedContextResponse(
                boundedContext.id.value,
                boundedContext.name.value,
                boundedContext.root.value,
                boundedContext.sort.value,
                boundedContext.isActive.value,
                boundedContext.createdAt.value,
                boundedContext.updatedAt.value,
                boundedContext.deletedAt.value,
                
            );
    }
}