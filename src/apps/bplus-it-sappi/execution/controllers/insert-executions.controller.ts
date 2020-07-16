import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ExecutionDto } from './../dto/execution.dto';
import { CreateExecutionDto } from './../dto/create-execution.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertExecutionsCommand } from '@hades/bplus-it-sappi/execution/application/insert/insert-executions.command';

@ApiTags('[bplus-it-sappi] execution')
@Controller('bplus-it-sappi/executions')
export class InsertExecutionsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert executions in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ExecutionDto] })
    @ApiBody({ type: [CreateExecutionDto] })
    async main(@Body() payload: CreateExecutionDto[])
    {
        await this.commandBus.dispatch(new InsertExecutionsCommand(payload));
    }
}