import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ClientDto } from './../dto/client.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindClientQuery } from '@hades/o-auth/client/application/find/find-client.query';

@ApiTags('[o-auth] client')
@Controller('o-auth/client')
@Permissions('oAuth.client.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class FindClientController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find client according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ClientDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement, @Body('constraint') constraint?: QueryStatement, )
    {
        return await this.queryBus.ask(new FindClientQuery(queryStatement, constraint));   
    }
}