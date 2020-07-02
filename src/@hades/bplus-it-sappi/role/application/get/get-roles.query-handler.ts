import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleResponse } from './../../domain/role.response';
import { GetRolesQuery } from './get-roles.query';
import { GetRolesService } from './get-roles.service';

@QueryHandler(GetRolesQuery)
export class GetRolesQueryHandler implements IQueryHandler<GetRolesQuery>
{
    constructor(
        private readonly getRolesService: GetRolesService
    ) { }

    async execute(query: GetRolesQuery): Promise<RoleResponse[]>
    {
        return (await this.getRolesService.main(query.queryStatements)).map(role => new RoleResponse(
                role.id.value,
                role.tenantId.value,
                role.name.value,
                role.createdAt.value,
                role.updatedAt.value,
                role.deletedAt.value,
                
            ));
    }
}