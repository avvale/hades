import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ResourceResponse } from './../../domain/resource.response';
import { ResourceMapper } from './../../domain/resource.mapper';
import { ResourceId } from './../../domain/value-objects';
import { FindResourceByIdQuery } from './find-resource-by-id.query';
import { FindResourceByIdService } from './find-resource-by-id.service';

@QueryHandler(FindResourceByIdQuery)
export class FindResourceByIdQueryHandler implements IQueryHandler<FindResourceByIdQuery>
{
    private readonly mapper: ResourceMapper = new ResourceMapper();

    constructor(
        private readonly findResourceByIdService: FindResourceByIdService
    ) { }

    async execute(query: FindResourceByIdQuery): Promise<ResourceResponse>
    {
        const resource = await this.findResourceByIdService.main(new ResourceId(query.id));

        return this.mapper.mapAggregateToResponse(resource);
    }
}