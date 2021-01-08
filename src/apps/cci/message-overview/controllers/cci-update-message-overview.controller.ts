import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateMessageOverviewDto } from './../dto/update-message-overview.dto';
import { MessageOverviewDto } from './../dto/message-overview.dto';
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
import { UpdateMessageOverviewCommand } from '@hades/cci/message-overview/application/update/update-message-overview.command';
import { FindMessageOverviewByIdQuery } from '@hades/cci/message-overview/application/find/find-message-overview-by-id.query';

@ApiTags('[cci] message-overview')
@Controller('cci/message-overview')
@Permissions('cci.messageOverview.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciUpdateMessageOverviewController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update message-overview' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: MessageOverviewDto})
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: UpdateMessageOverviewDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateMessageOverviewCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindMessageOverviewByIdQuery(payload.id, constraint, { timezone }));
    }
}