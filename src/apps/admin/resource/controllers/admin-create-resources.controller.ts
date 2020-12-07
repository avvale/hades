import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ResourceDto } from './../dto/resource.dto';
import { CreateResourceDto } from './../dto/create-resource.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateResourcesCommand } from '@hades/admin/resource/application/create/create-resources.command';

@ApiTags('[admin] resource')
@Controller('admin/resources')
@Permissions('admin.resource.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateResourcesController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create resources in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ResourceDto] })
    @ApiBody({ type: [CreateResourceDto] })
    async main(
        @Body() payload: CreateResourceDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateResourcesCommand(payload, { timezone }));
    }
}