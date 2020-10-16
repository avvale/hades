import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AccessTokenDto } from './../dto/access-token.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindAccessTokenByIdQuery } from '@hades/o-auth/access-token/application/find/find-access-token-by-id.query';
import { DeleteAccessTokenByIdCommand } from '@hades/o-auth/access-token/application/delete/delete-access-token-by-id.command';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token')
@Permissions('oAuth.accessToken.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeleteAccessTokenByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete access-token by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AccessTokenDto })
    async main(@Param('id') id: string, @Body('constraint') constraint?: QueryStatement, )
    {
        const accessToken = await this.queryBus.ask(new FindAccessTokenByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeleteAccessTokenByIdCommand(id, constraint));

        return accessToken;
    }
}