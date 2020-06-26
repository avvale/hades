import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { SystemDto } from './../dto/system.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindSystemByIdQuery } from '@hades/bplus-it-sappi/system/application/find/find-system-by-id.query';
import { DeleteSystemByIdCommand } from '@hades/bplus-it-sappi/system/application/delete/delete-system-by-id.command';

@ApiTags('system')
@ApiOkResponse({ description: 'The record has been deleted successfully.', type: SystemDto})
@Controller('bplus-it-sappi/system')
export class DeleteSystemByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    async main(@Param('id') id: string)
    {
        const system = await this.queryBus.ask(new FindSystemByIdQuery(id));

        await this.commandBus.dispatch(new DeleteSystemByIdCommand(id));

        return system;
    }
}