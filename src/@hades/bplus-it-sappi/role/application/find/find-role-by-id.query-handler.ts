import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleResponse } from './../../domain/role.response';
import { RoleId } from './../../domain/value-objects';
import { FindRoleByIdQuery } from './find-role-by-id.query';
import { FindRoleByIdService } from './find-role-by-id.service';

@QueryHandler(FindRoleByIdQuery)
export class FindRoleByIdQueryHandler implements IQueryHandler<FindRoleByIdQuery>
{
    constructor(
        private readonly findRoleByIdService: FindRoleByIdService
    ) { }

    async execute(query: FindRoleByIdQuery): Promise<RoleResponse>
    {
        const role = await this.findRoleByIdService.main(new RoleId(query.id));

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