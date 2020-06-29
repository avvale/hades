import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { DataLakeDto } from './../dto/data-lake.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindDataLakeByIdQuery } from '@hades/bplus-it-sappi/data-lake/application/find/find-data-lake-by-id.query';
import { DeleteDataLakeByIdCommand } from '@hades/bplus-it-sappi/data-lake/application/delete/delete-data-lake-by-id.command';

@ApiTags('[bplus-it-sappi] data-lake')
@ApiOkResponse({ description: 'The record has been deleted successfully.', type: DataLakeDto})
@Controller('bplus-it-sappi/data-lake')
export class DeleteDataLakeByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete data-lake by id' })
    async main(@Param('id') id: string)
    {
        const dataLake = await this.queryBus.ask(new FindDataLakeByIdQuery(id));

        await this.commandBus.dispatch(new DeleteDataLakeByIdCommand(id));

        return dataLake;
    }
}