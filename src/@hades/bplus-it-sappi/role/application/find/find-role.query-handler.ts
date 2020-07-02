import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleResponse } from './../../domain/role.response';
import { FindRoleQuery } from './find-role.query';
import { FindRoleService } from './find-role.service';

@QueryHandler(FindRoleQuery)
export class FindRoleQueryHandler implements IQueryHandler<FindRoleQuery>
{
    constructor(
        private readonly findRoleService: FindRoleService
    ) { }

    async execute(query: FindRoleQuery): Promise<RoleResponse>
    {
        const role = await this.findRoleService.main(query.queryStatements);

        return new RoleResponse(
                role.id.value,
                role.tenantId.value,
                role.name.value,
                role.createdAt.value,
                role.updatedAt.value,
                role.deletedAt.value,
                
            );
    }
}