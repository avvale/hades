import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AccountDto } from './../dto/account.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { DeleteAccountsCommand } from '@hades/iam/account/application/delete/delete-accounts.command';

@ApiTags('[iam] account')
@Controller('iam/accounts')
@Permissions('iam.account.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeleteAccountsController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete accounts in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AccountDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement, @Body('constraint') constraint?: QueryStatement)
    {
        const accounts = await this.queryBus.ask(new GetAccountsQuery(queryStatement, constraint));

        await this.commandBus.dispatch(new DeleteAccountsCommand(queryStatement, constraint));

        return accounts;
    }
}