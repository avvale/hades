import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RoleDto } from './../dto/role.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindRoleByIdQuery } from '@hades/iam/role/application/find/find-role-by-id.query';
import { DeleteRoleByIdCommand } from '@hades/iam/role/application/delete/delete-role-by-id.command';

@ApiTags('[iam] role')
@Controller('iam/role')
@Permissions('iam.role.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeleteRoleByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete role by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: RoleDto })
    async main(@Param('id') id: string, @Body('constraint') constraint?: QueryStatement, )
    {
        const role = await this.queryBus.ask(new FindRoleByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeleteRoleByIdCommand(id, constraint));

        return role;
    }
}