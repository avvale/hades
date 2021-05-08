import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateLangDto } from './../dto/update-lang.dto';
import { LangDto } from './../dto/lang.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

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
export class AdminUpdateLangController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update lang' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: LangDto})
    async main(
        @Body() payload: UpdateLangDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateLangCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindLangByIdQuery(payload.id, constraint, { timezone }));
    }
}