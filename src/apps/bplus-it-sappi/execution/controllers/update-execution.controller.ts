import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateExecutionDto } from './../dto/update-execution.dto';
import { ExecutionDto } from './../dto/execution.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateExecutionCommand } from '@hades/bplus-it-sappi/execution/application/update/update-execution.command';
import { FindExecutionByIdQuery } from '@hades/bplus-it-sappi/execution/application/find/find-execution-by-id.query';

@ApiTags('[bplus-it-sappi] execution')
@Controller('bplus-it-sappi/execution')
export class UpdateExecutionController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update execution' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ExecutionDto})
    async main(@Body() payload: UpdateExecutionDto)
    {
        await this.commandBus.dispatch(new UpdateExecutionCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.type,
            payload.monitoringStartAt,
            payload.monitoringEndAt,
            payload.executedAt,
            
        ));

        return await this.queryBus.ask(new FindExecutionByIdQuery(payload.id));
    }
}