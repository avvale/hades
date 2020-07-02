import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateRoleDto } from './../dto/create-role.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { InsertRolesCommand } from '@hades/bplus-it-sappi/role/application/insert/insert-roles.command';

@ApiTags('[bplus-it-sappi] role')
@ApiCreatedResponse({ description: 'The records has been created successfully.'})
@Controller('bplus-it-sappi/roles')
export class InsertRolesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert roles in batch' })
    @ApiBody({ 
        type: [CreateRoleDto]
    })
    async main(@Body() payload: CreateRoleDto[])
    {
        await this.commandBus.dispatch(new InsertRolesCommand(payload));
    }
}