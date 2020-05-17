import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ILangRepository } from './../../domain/lang.repository';
import { Lang } from './../../domain/lang';

@Injectable()
export class FindLangService
{
    constructor(
        private readonly repository: ILangRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<Lang>
    {        
        return await this.repository.find(queryStatements);
    }
}