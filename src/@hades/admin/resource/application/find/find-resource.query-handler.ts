import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ResourceResponse } from './../../domain/resource.response';
import { FindResourceQuery } from './find-resource.query';
import { FindResourceService } from './find-resource.service';

@QueryHandler(FindResourceQuery)
export class FindResourceQueryHandler implements IQueryHandler<FindResourceQuery>
{
    constructor(
        private readonly findResourceService: FindResourceService
    ) { }

    async execute(query: FindResourceQuery): Promise<ResourceResponse>
    {
        const resource = await this.findResourceService.main(query.queryStatements);

        return new ResourceResponse(
                resource.id.value,
                resource.boundedContextId.value,
                resource.name.value,
                resource.hasCustomFields.value,
                resource.hasAttachments.value,
                resource.createdAt.value,
                resource.updatedAt.value,
                resource.deletedAt.value,
                
            );
    }
}