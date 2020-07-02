import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BoundedContextResponse } from './../../domain/bounded-context.response';
import { FindBoundedContextQuery } from './find-bounded-context.query';
import { FindBoundedContextService } from './find-bounded-context.service';

@QueryHandler(FindBoundedContextQuery)
export class FindBoundedContextQueryHandler implements IQueryHandler<FindBoundedContextQuery>
{
    constructor(
        private readonly findBoundedContextService: FindBoundedContextService
    ) { }

    async execute(query: FindBoundedContextQuery): Promise<BoundedContextResponse>
    {
        const boundedContext = await this.findBoundedContextService.main(query.queryStatements);

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