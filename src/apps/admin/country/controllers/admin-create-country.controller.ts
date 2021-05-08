import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateCountryDto } from './../dto/create-country.dto';
import { CountryDto } from './../dto/country.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindCountryByIdQuery } from '@hades/admin/country/application/find/find-country-by-id.query';
import { CreateCountryCommand } from '@hades/admin/country/application/create/create-country.command';

@ApiTags('[admin] country')
@Controller('admin/country')
@Permissions('admin.country.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateCountryController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create country' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: CountryDto })
    async main(
        @Body() payload: CreateCountryDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateCountryCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindCountryByIdQuery(payload.id, {}, { timezone }));
    }
}