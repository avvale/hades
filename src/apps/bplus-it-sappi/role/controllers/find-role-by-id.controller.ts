import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RoleDto } from './../dto/role.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRoleByIdQuery } from '@hades/bplus-it-sappi/role/application/find/find-role-by-id.query';

@ApiTags('[bplus-it-sappi] role')
@Controller('bplus-it-sappi/role')
export class FindRoleByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find role by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: RoleDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindRoleByIdQuery(id));
    }
}