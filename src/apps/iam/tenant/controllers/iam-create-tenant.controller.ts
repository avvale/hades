import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateTenantDto } from './../dto/create-tenant.dto';
import { TenantDto } from './../dto/tenant.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindTenantByIdQuery } from '@hades/iam/tenant/application/find/find-tenant-by-id.query';
import { CreateTenantCommand } from '@hades/iam/tenant/application/create/create-tenant.command';

@ApiTags('[iam] tenant')
@Controller('iam/tenant')
@Permissions('iam.tenant.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateTenantController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create tenant' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: TenantDto })
    async main(
        @Body() payload: CreateTenantDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateTenantCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id, {}, { timezone }));
    }
}