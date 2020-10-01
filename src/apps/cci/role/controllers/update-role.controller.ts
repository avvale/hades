import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateRoleDto } from './../dto/update-role.dto';
import { RoleDto } from './../dto/role.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateRoleCommand } from '@hades/cci/role/application/update/update-role.command';
import { FindRoleByIdQuery } from '@hades/cci/role/application/find/find-role-by-id.query';

@ApiTags('[cci] role')
@Controller('cci/role')
export class UpdateRoleController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update role' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: RoleDto})
    async main(@Body() payload: UpdateRoleDto)
    {
        await this.commandBus.dispatch(new UpdateRoleCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.name,
            
        ));

        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id));
    }
}