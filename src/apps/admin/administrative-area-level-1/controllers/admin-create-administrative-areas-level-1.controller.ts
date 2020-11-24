import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AdministrativeAreaLevel1Dto } from './../dto/administrative-area-level-1.dto';
import { CreateAdministrativeAreaLevel1Dto } from './../dto/create-administrative-area-level-1.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantPolicy } from './../../../shared/decorators/tenant-policy.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAdministrativeAreasLevel1Command } from '@hades/admin/administrative-area-level-1/application/create/create-administrative-areas-level-1.command';

@ApiTags('[admin] administrative-area-level-1')
@Controller('admin/administrative-areas-level-1')
@Permissions('admin.administrativeAreaLevel1.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAdministrativeAreasLevel1Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create administrative-areas-level-1 in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AdministrativeAreaLevel1Dto] })
    @ApiBody({ type: [CreateAdministrativeAreaLevel1Dto] })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateAdministrativeAreaLevel1Dto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreasLevel1Command(payload, { timezone }));
    }
}