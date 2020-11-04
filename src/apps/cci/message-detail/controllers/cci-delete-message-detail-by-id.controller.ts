import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MessageDetailDto } from './../dto/message-detail.dto';
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
import { FindMessageDetailByIdQuery } from '@hades/cci/message-detail/application/find/find-message-detail-by-id.query';
import { DeleteMessageDetailByIdCommand } from '@hades/cci/message-detail/application/delete/delete-message-detail-by-id.command';

@ApiTags('[cci] message-detail')
@Controller('cci/message-detail')
@Permissions('cci.messageDetail.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteMessageDetailByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete message-detail by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: MessageDetailDto })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const messageDetail = await this.queryBus.ask(new FindMessageDetailByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteMessageDetailByIdCommand(id, constraint, { timezone }));

        return messageDetail;
    }
}