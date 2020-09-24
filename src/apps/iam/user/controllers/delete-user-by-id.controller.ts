import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserDto } from './../dto/user.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindUserByIdQuery } from '@hades/iam/user/application/find/find-user-by-id.query';
import { DeleteUserByIdCommand } from '@hades/iam/user/application/delete/delete-user-by-id.command';

@ApiTags('[iam] user')
@Controller('iam/user')
export class DeleteUserByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: UserDto })
    async main(@Param('id') id: string)
    {
        const user = await this.queryBus.ask(new FindUserByIdQuery(id));

        await this.commandBus.dispatch(new DeleteUserByIdCommand(id));

        return user;
    }
}