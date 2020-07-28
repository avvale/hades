import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateDataLakeDto } from './../dto/update-data-lake.dto';
import { DataLakeDto } from './../dto/data-lake.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateDataLakeCommand } from '@hades/bplus-it-sappi/data-lake/application/update/update-data-lake.command';
import { FindDataLakeByIdQuery } from '@hades/bplus-it-sappi/data-lake/application/find/find-data-lake-by-id.query';

@ApiTags('[bplus-it-sappi] data-lake')
@Controller('bplus-it-sappi/data-lake')
export class UpdateDataLakeController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update data-lake' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: DataLakeDto})
    async main(@Body() payload: UpdateDataLakeDto)
    {
        await this.commandBus.dispatch(new UpdateDataLakeCommand(
            payload.id,
            payload.executionId,
            payload.tenantId,
            payload.tenantCode,
            payload.payload,
            
        ));

        return await this.queryBus.ask(new FindDataLakeByIdQuery(payload.id));
    }
}