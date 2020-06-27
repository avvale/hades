import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateExecutionDto } from './../dto/update-execution.dto';
import { ExecutionDto } from './../dto/execution.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateExecutionCommand } from '@hades/bplus-it-sappi/execution/application/update/update-execution.command';
import { FindExecutionByIdQuery } from '@hades/bplus-it-sappi/execution/application/find/find-execution-by-id.query';

@ApiTags('[bplus-it-sappi] execution')
@ApiCreatedResponse({ description: 'The record has been successfully updated.', type: ExecutionDto})
@Controller('bplus-it-sappi/execution')
export class UpdateExecutionController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update execution' })
    async main(@Body() payload: UpdateExecutionDto)
    {
        await this.commandBus.dispatch(new UpdateExecutionCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.type,
            payload.monitoringStartAt,
            payload.monitoringEndAt,
            payload.executedAt,
            
        ));

        return await this.queryBus.ask(new FindExecutionByIdQuery(payload.id));
    }
}