import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AccessTokenDto } from './../dto/access-token.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAccessTokensQuery } from '@hades/o-auth/access-token/application/get/get-access-tokens.query';
import { DeleteAccessTokensCommand } from '@hades/o-auth/access-token/application/delete/delete-access-tokens.command';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-tokens')
export class DeleteAccessTokensController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete access-tokens in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AccessTokenDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const accessTokens = await this.queryBus.ask(new GetAccessTokensQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteAccessTokensCommand(queryStatement));

        return accessTokens;
    }
}