import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResourceDto } from './../dto/resource.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindResourceByIdQuery } from '@hades/admin/resource/application/find/find-resource-by-id.query';
import { DeleteResourceByIdCommand } from '@hades/admin/resource/application/delete/delete-resource-by-id.command';

@ApiTags('[admin] resource')
@Controller('admin/resource')
@Permissions('admin.resource.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminDeleteResourceByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete resource by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: ResourceDto })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const resource = await this.queryBus.ask(new FindResourceByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteResourceByIdCommand(id, constraint, { timezone }));

        return resource;
    }
}