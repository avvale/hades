import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ApplicationDto } from './../dto/application.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateApplicationsQuery } from '@hades/o-auth/application/application/paginate/paginate-applications.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications/paginate')
@Permissions('oAuth.application.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class PaginateApplicationsController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get()
    @ApiOperation({ summary: 'Paginate applications' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement, @Body('constraint') constraint?: QueryStatement)
    {
        return await this.queryBus.ask(new PaginateApplicationsQuery(queryStatement, constraint));   
    }
}