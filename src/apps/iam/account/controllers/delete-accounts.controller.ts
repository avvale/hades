import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AccountDto } from './../dto/account.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { DeleteAccountsCommand } from '@hades/iam/account/application/delete/delete-accounts.command';

@ApiTags('[iam] account')
@Controller('iam/accounts')
export class DeleteAccountsController 
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
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const accounts = await this.queryBus.ask(new GetAccountsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteAccountsCommand(queryStatement));

        return accounts;
    }
}