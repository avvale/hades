import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ResourceResponse } from './../../domain/resource.response';
import { ResourceId } from './../../domain/value-objects';
import { FindResourceByIdQuery } from './find-resource-by-id.query';
import { FindResourceByIdService } from './find-resource-by-id.service';

@QueryHandler(FindResourceByIdQuery)
export class FindResourceByIdQueryHandler implements IQueryHandler<FindResourceByIdQuery>
{
    constructor(
        private readonly findResourceByIdService: FindResourceByIdService
    ) { }

    async execute(query: FindResourceByIdQuery): Promise<ResourceResponse>
    {
        const resource = await this.findResourceByIdService.main(new ResourceId(query.id));

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