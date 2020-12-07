import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CountryDto } from './../dto/country.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetCountriesQuery } from '@hades/admin/country/application/get/get-countries.query';
import { DeleteCountriesCommand } from '@hades/admin/country/application/delete/delete-countries.command';

@ApiTags('[admin] country')
@Controller('admin/countries')
@Permissions('admin.country.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminDeleteCountriesController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete countries in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [CountryDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const countries = await this.queryBus.ask(new GetCountriesQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteCountriesCommand(queryStatement, constraint, { timezone }));

        return countries;
    }
}