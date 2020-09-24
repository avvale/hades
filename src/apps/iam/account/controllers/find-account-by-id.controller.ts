import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AccountDto } from './../dto/account.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';

@ApiTags('[iam] account')
@Controller('iam/account')
export class FindAccountByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find account by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AccountDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindAccountByIdQuery(id));
    }
}