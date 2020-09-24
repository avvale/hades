import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AccountDto } from './../dto/account.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';

@ApiTags('[iam] account')
@Controller('iam/accounts')
export class GetAccountsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find accounts according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AccountDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new GetAccountsQuery(queryStatement));   
    }
}