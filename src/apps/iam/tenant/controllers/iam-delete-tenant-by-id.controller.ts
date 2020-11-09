import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { TenantDto } from './../dto/tenant.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindTenantByIdQuery } from '@hades/iam/tenant/application/find/find-tenant-by-id.query';
import { DeleteTenantByIdCommand } from '@hades/iam/tenant/application/delete/delete-tenant-by-id.command';

@ApiTags('[iam] tenant')
@Controller('iam/tenant')
@Permissions('iam.tenant.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeleteTenantByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete tenant by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: TenantDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const tenant = await this.queryBus.ask(new FindTenantByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteTenantByIdCommand(id, constraint, { timezone }));

        return tenant;
    }
}