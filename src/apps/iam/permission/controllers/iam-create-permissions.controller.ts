import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { PermissionDto } from './../dto/permission.dto';
import { CreatePermissionDto } from './../dto/create-permission.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreatePermissionsCommand } from '@hades/iam/permission/application/create/create-permissions.command';

@ApiTags('[iam] permission')
@Controller('iam/permissions')
@Permissions('iam.permission.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreatePermissionsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create permissions in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [PermissionDto] })
    @ApiBody({ type: [CreatePermissionDto] })
    async main(@Body() payload: CreatePermissionDto[])
    {
        await this.commandBus.dispatch(new CreatePermissionsCommand(payload));
    }
}