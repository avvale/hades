import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionResponse } from './../../domain/permission.response';
import { FindPermissionQuery } from './find-permission.query';
import { FindPermissionService } from './find-permission.service';

@QueryHandler(FindPermissionQuery)
export class FindPermissionQueryHandler implements IQueryHandler<FindPermissionQuery>
{
    constructor(
        private readonly findPermissionService: FindPermissionService
    ) { }

    async execute(query: FindPermissionQuery): Promise<PermissionResponse>
    {
        const permission = await this.findPermissionService.main(query.queryStatements);

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