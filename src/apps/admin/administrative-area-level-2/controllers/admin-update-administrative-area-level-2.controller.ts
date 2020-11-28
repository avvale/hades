import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateAdministrativeAreaLevel2Dto } from './../dto/update-administrative-area-level-2.dto';
import { AdministrativeAreaLevel2Dto } from './../dto/administrative-area-level-2.dto';
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
import { UpdateAdministrativeAreaLevel2Command } from '@hades/admin/administrative-area-level-2/application/update/update-administrative-area-level-2.command';
import { FindAdministrativeAreaLevel2ByIdQuery } from '@hades/admin/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';

@ApiTags('[admin] administrative-area-level-2')
@Controller('admin/administrative-area-level-2')
@Permissions('admin.administrativeAreaLevel2.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminUpdateAdministrativeAreaLevel2Controller
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-area-level-2' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AdministrativeAreaLevel2Dto})
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: UpdateAdministrativeAreaLevel2Dto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreaLevel2Command(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(payload.id, constraint, { timezone }));
    }
}