import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateSystemDto } from './../dto/update-system.dto';
import { SystemDto } from './../dto/system.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateSystemCommand } from '@hades/cci/system/application/update/update-system.command';
import { FindSystemByIdQuery } from '@hades/cci/system/application/find/find-system-by-id.query';

@ApiTags('[cci] system')
@Controller('cci/system')
export class UpdateSystemController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update system' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: SystemDto})
    async main(@Body() payload: UpdateSystemDto)
    {
        await this.commandBus.dispatch(new UpdateSystemCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.version,
            payload.name,
            payload.environment,
            payload.isActive,
            payload.cancelledAt,
            
        ));

        return await this.queryBus.ask(new FindSystemByIdQuery(payload.id));
    }
}