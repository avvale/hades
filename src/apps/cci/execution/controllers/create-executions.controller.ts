import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ExecutionDto } from './../dto/execution.dto';
import { CreateExecutionDto } from './../dto/create-execution.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateExecutionsCommand } from '@hades/cci/execution/application/create/create-executions.command';

@ApiTags('[cci] execution')
@Controller('cci/executions')
export class CreateExecutionsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create executions in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ExecutionDto] })
    @ApiBody({ type: [CreateExecutionDto] })
    async main(@Body() payload: CreateExecutionDto[])
    {
        await this.commandBus.dispatch(new CreateExecutionsCommand(payload));
    }
}