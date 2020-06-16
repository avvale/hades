import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { ILangRepository } from './../../domain/lang.repository';
import { AdminLang } from './../../domain/lang.entity';

@Injectable()
export class PaginateLangsService
{
    constructor(
        private readonly repository: ILangRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<AdminLang>>
    {        
        return await this.repository.paginate(queryStatements, constraints);
    }
}