import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PermissionDto } from './../dto/permission.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindPermissionByIdQuery } from '@hades/iam/permission/application/find/find-permission-by-id.query';
import { DeletePermissionByIdCommand } from '@hades/iam/permission/application/delete/delete-permission-by-id.command';

@ApiTags('[iam] permission')
@Controller('iam/permission')
@Permissions('iam.permission.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeletePermissionByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete permission by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: PermissionDto })
    async main(@Param('id') id: string, @Body('constraint') constraint?: QueryStatement)
    {
        const permission = await this.queryBus.ask(new FindPermissionByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeletePermissionByIdCommand(id, constraint));

        return permission;
    }
}