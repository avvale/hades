import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionResponse } from './../../domain/permission.response';
import { PermissionId } from './../../domain/value-objects';
import { FindPermissionByIdQuery } from './find-permission-by-id.query';
import { FindPermissionByIdService } from './find-permission-by-id.service';

@QueryHandler(FindPermissionByIdQuery)
export class FindPermissionByIdQueryHandler implements IQueryHandler<FindPermissionByIdQuery>
{
    constructor(
        private readonly findPermissionByIdService: FindPermissionByIdService
    ) { }

    async execute(query: FindPermissionByIdQuery): Promise<PermissionResponse>
    {
        const permission = await this.findPermissionByIdService.main(new PermissionId(query.id));

        return new PermissionResponse(
                permission.id.value,
                permission.moduleId.value,
                permission.name.value,
                permission.createdAt.value,
                permission.updatedAt.value,
                permission.deletedAt.value,
                
            );
    }
}