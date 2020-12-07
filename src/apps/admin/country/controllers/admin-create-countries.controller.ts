import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CountryDto } from './../dto/country.dto';
import { CreateCountryDto } from './../dto/create-country.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateCountriesCommand } from '@hades/admin/country/application/create/create-countries.command';

@ApiTags('[admin] country')
@Controller('admin/countries')
@Permissions('admin.country.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateCountriesController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create countries in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [CountryDto] })
    @ApiBody({ type: [CreateCountryDto] })
    async main(
        @Body() payload: CreateCountryDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateCountriesCommand(payload, { timezone }));
    }
}