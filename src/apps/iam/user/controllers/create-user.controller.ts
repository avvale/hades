import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './../dto/create-user.dto';
import { UserDto } from './../dto/user.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindUserByIdQuery } from '@hades/iam/user/application/find/find-user-by-id.query';
import { CreateUserCommand } from '@hades/iam/user/application/create/create-user.command';

@ApiTags('[iam] user')
@Controller('iam/user')
export class CreateUserController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: UserDto })
    async main(@Body() payload: CreateUserDto)
    {
        await this.commandBus.dispatch(new CreateUserCommand(
            payload.id,
            payload.accountId,
            payload.name,
            payload.surname,
            payload.avatar,
            payload.mobile,
            payload.langId,
            payload.username,
            payload.password,
            payload.rememberToken,
            payload.data,
            
        ));

        return await this.queryBus.ask(new FindUserByIdQuery(payload.id));
    }
}