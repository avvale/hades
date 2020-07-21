import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { FlowDto } from './../dto/flow.dto';
import { CreateFlowDto } from './../dto/create-flow.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateFlowsCommand } from '@hades/bplus-it-sappi/flow/application/create/create-flows.command';

@ApiTags('[bplus-it-sappi] flow')
@Controller('bplus-it-sappi/flows')
export class CreateFlowsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create flows in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [FlowDto] })
    @ApiBody({ type: [CreateFlowDto] })
    async main(@Body() payload: CreateFlowDto[])
    {
        await this.commandBus.dispatch(new CreateFlowsCommand(payload));
    }
}