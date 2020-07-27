import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateExecutionDto } from './../dto/create-execution.dto';
import { ExecutionDto } from './../dto/execution.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindExecutionByIdQuery } from '@hades/bplus-it-sappi/execution/application/find/find-execution-by-id.query';
import { CreateExecutionCommand } from '@hades/bplus-it-sappi/execution/application/create/create-execution.command';

@ApiTags('[bplus-it-sappi] execution')
@Controller('bplus-it-sappi/execution')
export class CreateExecutionController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create execution' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ExecutionDto })
    async main(@Body() payload: CreateExecutionDto)
    {
        await this.commandBus.dispatch(new CreateExecutionCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.version,
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