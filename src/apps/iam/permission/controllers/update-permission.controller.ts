import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdatePermissionDto } from './../dto/update-permission.dto';
import { PermissionDto } from './../dto/permission.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdatePermissionCommand } from '@hades/iam/permission/application/update/update-permission.command';
import { FindPermissionByIdQuery } from '@hades/iam/permission/application/find/find-permission-by-id.query';

@ApiTags('[iam] permission')
@Controller('iam/permission')
@Permissions('iam.permission.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class UpdatePermissionController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update permission' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: PermissionDto})
    async main(@Body() payload: UpdatePermissionDto, @Body('constraint') constraint?: QueryStatement, )
    {
        await this.commandBus.dispatch(new UpdatePermissionCommand(
            payload.id,
            payload.name,
            payload.boundedContextId,
            payload.roleIds,
            constraint,
        ));

        return await this.queryBus.ask(new FindPermissionByIdQuery(payload.id, constraint));
    }
}