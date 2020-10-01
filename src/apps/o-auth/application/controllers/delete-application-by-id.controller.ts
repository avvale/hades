import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApplicationDto } from './../dto/application.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindApplicationByIdQuery } from '@hades/o-auth/application/application/find/find-application-by-id.query';
import { DeleteApplicationByIdCommand } from '@hades/o-auth/application/application/delete/delete-application-by-id.command';

@ApiTags('[o-auth] application')
@Controller('o-auth/application')
export class DeleteApplicationByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete application by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: ApplicationDto })
    async main(@Param('id') id: string)
    {
        const application = await this.queryBus.ask(new FindApplicationByIdQuery(id));

        await this.commandBus.dispatch(new DeleteApplicationByIdCommand(id));

        return application;
    }
}