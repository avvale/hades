import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateApplicationDto } from './../dto/create-application.dto';
import { ApplicationDto } from './../dto/application.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindApplicationByIdQuery } from '@hades/o-auth/application/application/find/find-application-by-id.query';
import { CreateApplicationCommand } from '@hades/o-auth/application/application/create/create-application.command';

@ApiTags('[o-auth] application')
@Controller('o-auth/application')
@Permissions('oAuth.application.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateApplicationController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ApplicationDto })
    async main(
        @Body() payload: CreateApplicationDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateApplicationCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindApplicationByIdQuery(payload.id, {}, { timezone }));
    }
}