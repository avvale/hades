import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateTenantDto } from './../dto/update-tenant.dto';
import { TenantDto } from './../dto/tenant.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateTenantCommand } from '@hades/iam/tenant/application/update/update-tenant.command';
import { FindTenantByIdQuery } from '@hades/iam/tenant/application/find/find-tenant-by-id.query';

@ApiTags('[iam] tenant')
@Controller('iam/tenant')
@Permissions('iam.tenant.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateTenantController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update tenant' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: TenantDto})
    async main(@Body() payload: UpdateTenantDto, @Body('constraint') constraint?: QueryStatement)
    {
        await this.commandBus.dispatch(new UpdateTenantCommand(
            payload.id,
            payload.name,
            payload.code,
            payload.logo,
            payload.isActive,
            payload.data,
            payload.accountIds,
            constraint,
        ));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id, constraint));
    }
}