import { Controller, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MessageOverviewDto } from './../dto/message-overview.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindMessageOverviewByIdQuery } from '@hades/cci/message-overview/application/find/find-message-overview-by-id.query';

@ApiTags('[cci] message-overview')
@Controller('cci/message-overview')
@Permissions('cci.messageOverview.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class FindMessageOverviewByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find message-overview by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: MessageOverviewDto })
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Param('id') id: string, @Body('constraint') constraint?: QueryStatement, )
    {
        return await this.queryBus.ask(new FindMessageOverviewByIdQuery(id, constraint));
    }
}