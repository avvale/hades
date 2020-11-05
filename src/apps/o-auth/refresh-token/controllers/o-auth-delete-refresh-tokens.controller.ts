import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { RefreshTokenDto } from './../dto/refresh-token.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetRefreshTokensQuery } from '@hades/o-auth/refresh-token/application/get/get-refresh-tokens.query';
import { DeleteRefreshTokensCommand } from '@hades/o-auth/refresh-token/application/delete/delete-refresh-tokens.command';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-tokens')
@Permissions('oAuth.refreshToken.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthDeleteRefreshTokensController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete refresh-tokens in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [RefreshTokenDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const refreshTokens = await this.queryBus.ask(new GetRefreshTokensQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteRefreshTokensCommand(queryStatement, constraint, { timezone }));

        return refreshTokens;
    }
}