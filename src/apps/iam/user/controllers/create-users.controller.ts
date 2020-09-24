import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserDto } from './../dto/user.dto';
import { CreateUserDto } from './../dto/create-user.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateUsersCommand } from '@hades/iam/user/application/create/create-users.command';

@ApiTags('[iam] user')
@Controller('iam/users')
export class CreateUsersController 
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