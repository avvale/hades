import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from './../dto/update-user.dto';
import { UserDto } from './../dto/user.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateUserCommand } from '@hades/iam/user/application/update/update-user.command';
import { FindUserByIdQuery } from '@hades/iam/user/application/find/find-user-by-id.query';

@ApiTags('[iam] user')
@Controller('iam/user')
export class UpdateUserController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update user' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: UserDto})
    async main(@Body() payload: UpdateUserDto)
    {
        await this.commandBus.dispatch(new UpdateUserCommand(
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