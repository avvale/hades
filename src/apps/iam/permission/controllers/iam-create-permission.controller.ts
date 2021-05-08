import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreatePermissionDto } from './../dto/create-permission.dto';
import { PermissionDto } from './../dto/permission.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindPermissionByIdQuery } from '@hades/iam/permission/application/find/find-permission-by-id.query';
import { CreatePermissionCommand } from '@hades/iam/permission/application/create/create-permission.command';

@ApiTags('[iam] permission')
@Controller('iam/permission')
@Permissions('iam.permission.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreatePermissionController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create permission' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: PermissionDto })
    async main(
        @Body() payload: CreatePermissionDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreatePermissionCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindPermissionByIdQuery(payload.id, {}, { timezone }));
    }
}