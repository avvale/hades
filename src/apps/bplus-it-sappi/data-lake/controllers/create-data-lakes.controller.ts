import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { DataLakeDto } from './../dto/data-lake.dto';
import { CreateDataLakeDto } from './../dto/create-data-lake.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateDataLakesCommand } from '@hades/bplus-it-sappi/data-lake/application/create/create-data-lakes.command';

@ApiTags('[bplus-it-sappi] data-lake')
@Controller('bplus-it-sappi/data-lakes')
export class CreateDataLakesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create data-lakes in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [DataLakeDto] })
    @ApiBody({ type: [CreateDataLakeDto] })
    async main(@Body() payload: CreateDataLakeDto[])
    {
        await this.commandBus.dispatch(new CreateDataLakesCommand(payload));
    }
}