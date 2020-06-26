import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { UpdateSystemDto } from './../dto/update-system.dto';
import { SystemDto } from './../dto/system.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateSystemCommand } from '@hades/bplus-it-sappi/system/application/update/update-system.command';
import { FindSystemByIdQuery } from '@hades/bplus-it-sappi/system/application/find/find-system-by-id.query';

@ApiTags('system')
@ApiCreatedResponse({ description: 'The record has been successfully updated.', type: SystemDto})
@Controller('bplus-it-sappi/system')
export class UpdateSystemController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    async main(@Body() payload: UpdateSystemDto)
    {
        await this.commandBus.dispatch(new UpdateSystemCommand(
            payload.id,
            payload.tenantId,
            payload.name,
            payload.tenantCode,
            payload.environment,
            payload.version,
            payload.isActive,
            payload.cancelledAt,
            
        ));

        return await this.queryBus.ask(new FindSystemByIdQuery(payload.id));
    }
}