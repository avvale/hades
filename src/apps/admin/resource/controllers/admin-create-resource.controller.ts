import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateResourceDto } from './../dto/create-resource.dto';
import { ResourceDto } from './../dto/resource.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindResourceByIdQuery } from '@hades/admin/resource/application/find/find-resource-by-id.query';
import { CreateResourceCommand } from '@hades/admin/resource/application/create/create-resource.command';

@ApiTags('[admin] resource')
@Controller('admin/resource')
@Permissions('admin.resource.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateResourceController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create resource' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ResourceDto })
    async main(
        @Body() payload: CreateResourceDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateResourceCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindResourceByIdQuery(payload.id, {}, { timezone }));
    }
}