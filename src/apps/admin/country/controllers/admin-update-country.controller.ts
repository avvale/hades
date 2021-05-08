import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateCountryDto } from './../dto/update-country.dto';
import { CountryDto } from './../dto/country.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateCountryCommand } from '@hades/admin/country/application/update/update-country.command';
import { FindCountryByIdQuery } from '@hades/admin/country/application/find/find-country-by-id.query';

@ApiTags('[admin] country')
@Controller('admin/country')
@Permissions('admin.country.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminUpdateCountryController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update country' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CountryDto})
    async main(
        @Body() payload: UpdateCountryDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateCountryCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindCountryByIdQuery(payload.id, constraint, { timezone }));
    }
}