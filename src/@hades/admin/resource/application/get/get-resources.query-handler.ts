import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ResourceResponse } from './../../domain/resource.response';
import { GetResourcesQuery } from './get-resources.query';
import { GetResourcesService } from './get-resources.service';

@QueryHandler(GetResourcesQuery)
export class GetResourcesQueryHandler implements IQueryHandler<GetResourcesQuery>
{
    constructor(
        private readonly getResourcesService: GetResourcesService
    ) { }

    async execute(query: GetResourcesQuery): Promise<ResourceResponse[]>
    {
        return (await this.getResourcesService.main(query.queryStatements)).map(resource => new ResourceResponse(
                resource.id.value,
                resource.boundedContextId.value,
                resource.name.value,
                resource.hasCustomFields.value,
                resource.hasAttachments.value,
                resource.createdAt.value,
                resource.updatedAt.value,
                resource.deletedAt.value,
                
            ));
    }
}