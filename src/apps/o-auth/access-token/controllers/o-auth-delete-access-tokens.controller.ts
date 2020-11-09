import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AccessTokenDto } from './../dto/access-token.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAccessTokensQuery } from '@hades/o-auth/access-token/application/get/get-access-tokens.query';
import { DeleteAccessTokensCommand } from '@hades/o-auth/access-token/application/delete/delete-access-tokens.command';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-tokens')
@Permissions('oAuth.accessToken.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthDeleteAccessTokensController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete access-tokens in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AccessTokenDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const accessTokens = await this.queryBus.ask(new GetAccessTokensQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAccessTokensCommand(queryStatement, constraint, { timezone }));

        return accessTokens;
    }
}