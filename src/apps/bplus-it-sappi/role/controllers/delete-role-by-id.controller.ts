import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RoleDto } from './../dto/role.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindRoleByIdQuery } from '@hades/bplus-it-sappi/role/application/find/find-role-by-id.query';
import { DeleteRoleByIdCommand } from '@hades/bplus-it-sappi/role/application/delete/delete-role-by-id.command';

@ApiTags('[bplus-it-sappi] role')
@ApiOkResponse({ description: 'The record has been deleted successfully.', type: RoleDto})
@Controller('bplus-it-sappi/role')
export class DeleteRoleByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete role by id' })
    async main(@Param('id') id: string)
    {
        const role = await this.queryBus.ask(new FindRoleByIdQuery(id));

        await this.commandBus.dispatch(new DeleteRoleByIdCommand(id));

        return role;
    }
}