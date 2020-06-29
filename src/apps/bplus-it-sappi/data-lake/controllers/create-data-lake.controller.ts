import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateDataLakeDto } from './../dto/create-data-lake.dto';
import { DataLakeDto } from './../dto/data-lake.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindDataLakeByIdQuery } from '@hades/bplus-it-sappi/data-lake/application/find/find-data-lake-by-id.query';
import { CreateDataLakeCommand } from '@hades/bplus-it-sappi/data-lake/application/create/create-data-lake.command';

@ApiTags('[bplus-it-sappi] data-lake')
@ApiCreatedResponse({ description: 'The record has been successfully created.', type: DataLakeDto})
@Controller('bplus-it-sappi/data-lake')
export class CreateDataLakeController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create data-lake' })
    async main(@Body() payload: CreateDataLakeDto)
    {
        await this.commandBus.dispatch(new CreateDataLakeCommand(
            payload.id,
            payload.data,
            
        ));

        return await this.queryBus.ask(new FindDataLakeByIdQuery(payload.id));
    }
}