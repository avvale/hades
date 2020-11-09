import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AccessTokenDto } from './../dto/access-token.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindAccessTokenQuery } from '@hades/o-auth/access-token/application/find/find-access-token.query';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token')
@Permissions('oAuth.accessToken.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthFindAccessTokenController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find access-token according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AccessTokenDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindAccessTokenQuery(queryStatement, constraint, { timezone }));
    }
}