import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BoundedContextResponse } from './../../domain/bounded-context.response';
import { GetBoundedContextsQuery } from './get-bounded-contexts.query';
import { GetBoundedContextsService } from './get-bounded-contexts.service';

@QueryHandler(GetBoundedContextsQuery)
export class GetBoundedContextsQueryHandler implements IQueryHandler<GetBoundedContextsQuery>
{
    constructor(
        private readonly getBoundedContextsService: GetBoundedContextsService
    ) { }

    async execute(query: GetBoundedContextsQuery): Promise<BoundedContextResponse[]>
    {
        return (await this.getBoundedContextsService.main(query.queryStatements)).map(boundedContext => new BoundedContextResponse(
                boundedContext.id.value,
                boundedContext.name.value,
                boundedContext.root.value,
                boundedContext.sort.value,
                boundedContext.isActive.value,
                boundedContext.createdAt.value,
                boundedContext.updatedAt.value,
                boundedContext.deletedAt.value,
                
            ));
    }
}