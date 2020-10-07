import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AccessTokenDto } from './../dto/access-token.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAccessTokensQuery } from '@hades/o-auth/access-token/application/get/get-access-tokens.query';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-tokens')
export class GetAccessTokensController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find access-tokens according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [AccessTokenDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        return await this.queryBus.ask(new GetAccessTokensQuery(queryStatement));   
    }
}