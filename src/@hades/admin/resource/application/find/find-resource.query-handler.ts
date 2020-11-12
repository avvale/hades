import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ResourceResponse } from './../../domain/resource.response';
import { ResourceMapper } from './../../domain/resource.mapper';
import { FindResourceQuery } from './find-resource.query';
import { FindResourceService } from './find-resource.service';

@QueryHandler(FindResourceQuery)
export class FindResourceQueryHandler implements IQueryHandler<FindResourceQuery>
{
    private readonly mapper: ResourceMapper = new ResourceMapper();

    constructor(
        private readonly findResourceService: FindResourceService,
    ) {}

    async execute(query: FindResourceQuery): Promise<ResourceResponse>
    {
        const resource = await this.findResourceService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(resource);
    }
}