import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RefreshTokenDto } from './../dto/refresh-token.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindRefreshTokenByIdQuery } from '@hades/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';
import { DeleteRefreshTokenByIdCommand } from '@hades/o-auth/refresh-token/application/delete/delete-refresh-token-by-id.command';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token')
@Permissions('oAuth.refreshToken.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthDeleteRefreshTokenByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete refresh-token by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: RefreshTokenDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const refreshToken = await this.queryBus.ask(new FindRefreshTokenByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteRefreshTokenByIdCommand(id, constraint, { timezone }));

        return refreshToken;
    }
}