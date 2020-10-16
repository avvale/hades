import { Controller, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApplicationDto } from './../dto/application.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindApplicationByIdQuery } from '@hades/o-auth/application/application/find/find-application-by-id.query';

@ApiTags('[o-auth] application')
@Controller('o-auth/application')
@Permissions('oAuth.application.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class FindApplicationByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find application by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ApplicationDto })
    async main(@Param('id') id: string, @Body('constraint') constraint?: QueryStatement, )
    {
        return await this.queryBus.ask(new FindApplicationByIdQuery(id, constraint));
    }
}