import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateRoleDto } from './../dto/update-role.dto';
import { RoleDto } from './../dto/role.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateRoleCommand } from '@hades/iam/role/application/update/update-role.command';
import { FindRoleByIdQuery } from '@hades/iam/role/application/find/find-role-by-id.query';

@ApiTags('[iam] role')
@Controller('iam/role')
@Permissions('iam.role.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateRoleController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update role' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: RoleDto})
    async main(
        @Body() payload: UpdateRoleDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateRoleCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id, constraint, { timezone }));
    }
}