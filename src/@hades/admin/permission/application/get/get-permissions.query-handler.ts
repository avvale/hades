import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionResponse } from './../../domain/permission.response';
import { GetPermissionsQuery } from './get-permissions.query';
import { GetPermissionsService } from './get-permissions.service';

@QueryHandler(GetPermissionsQuery)
export class GetPermissionsQueryHandler implements IQueryHandler<GetPermissionsQuery>
{
    constructor(
        private readonly getPermissionsService: GetPermissionsService
    ) { }

    async execute(query: GetPermissionsQuery): Promise<PermissionResponse[]>
    {
        return (await this.getPermissionsService.main(query.queryStatements)).map(permission => new PermissionResponse(
                permission.id.value,
                permission.moduleId.value,
                permission.name.value,
                permission.createdAt.value,
                permission.updatedAt.value,
                permission.deletedAt.value,
                
            ));
    }
}