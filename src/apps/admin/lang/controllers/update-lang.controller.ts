import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateLangDto } from './../dto/update-lang.dto';
import { LangDto } from './../dto/lang.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateLangCommand } from '@hades/admin/lang/application/update/update-lang.command';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';

@ApiTags('[admin] lang')
@Controller('admin/lang')
@Permissions('admin.lang.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class UpdateLangController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update lang' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: LangDto})
    async main(@Body() payload: UpdateLangDto, @Body('constraint') constraint?: QueryStatement, )
    {
        await this.commandBus.dispatch(new UpdateLangCommand(
            payload.id,
            payload.name,
            payload.image,
            payload.iso6392,
            payload.iso6393,
            payload.ietf,
            payload.sort,
            payload.isActive,
            constraint,
        ));

        return await this.queryBus.ask(new FindLangByIdQuery(payload.id, constraint));
    }
}