import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ApplicationDto } from './../dto/application.dto';
import { CreateApplicationDto } from './../dto/create-application.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateApplicationsCommand } from '@hades/o-auth/application/application/create/create-applications.command';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications')
@Permissions('oAuth.application.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateApplicationsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create applications in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ApplicationDto] })
    @ApiBody({ type: [CreateApplicationDto] })
    async main(
        @Body() payload: CreateApplicationDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateApplicationsCommand(payload, { timezone }));
    }
}