import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserDto } from './../dto/user.dto';
import { CreateUserDto } from './../dto/create-user.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateUsersCommand } from '@hades/iam/user/application/create/create-users.command';

@ApiTags('[iam] user')
@Controller('iam/users')
@Permissions('iam.user.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateUsersController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create users in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [UserDto] })
    @ApiBody({ type: [CreateUserDto] })
    async main(@Body() payload: CreateUserDto[])
    {
        await this.commandBus.dispatch(new CreateUsersCommand(payload));
    }
}