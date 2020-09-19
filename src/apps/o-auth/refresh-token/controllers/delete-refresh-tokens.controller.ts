import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { RefreshTokenDto } from './../dto/refresh-token.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetRefreshTokensQuery } from '@hades/o-auth/refresh-token/application/get/get-refresh-tokens.query';
import { DeleteRefreshTokensCommand } from '@hades/o-auth/refresh-token/application/delete/delete-refresh-tokens.command';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-tokens')
export class DeleteRefreshTokensController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete refresh-tokens in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [RefreshTokenDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement: QueryStatement)
    {
        const refreshTokens = await this.queryBus.ask(new GetRefreshTokensQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteRefreshTokensCommand(queryStatement));

        return refreshTokens;
    }
}