import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateFlowDto } from './../dto/create-flow.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { InsertFlowsCommand } from '@hades/bplus-it-sappi/flow/application/insert/insert-flows.command';

@ApiTags('[bplus-it-sappi] flow')
@ApiCreatedResponse({ description: 'The records has been created successfully.'})
@Controller('bplus-it-sappi/flows')
export class InsertFlowsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert flows in batch' })
    @ApiBody({ 
        type: [CreateFlowDto]
    })
    async main(@Body() payload: CreateFlowDto[])
    {
        await this.commandBus.dispatch(new InsertFlowsCommand(payload));
    }
}