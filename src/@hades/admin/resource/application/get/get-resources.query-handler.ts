import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ResourceResponse } from './../../domain/resource.response';
import { ResourceMapper } from './../../domain/resource.mapper';
import { GetResourcesQuery } from './get-resources.query';
import { GetResourcesService } from './get-resources.service';

@QueryHandler(GetResourcesQuery)
export class GetResourcesQueryHandler implements IQueryHandler<GetResourcesQuery>
{
    private readonly mapper: ResourceMapper = new ResourceMapper();

    constructor(
        private readonly getResourcesService: GetResourcesService,
    ) {}

    async execute(query: GetResourcesQuery): Promise<ResourceResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getResourcesService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}