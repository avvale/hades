import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ILangRepository } from './../../domain/lang.repository';
import { Lang } from './../../domain/lang.entity';

@Injectable()
export class GetLangsService
{
    constructor(
        private readonly repository: ILangRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<Lang[]>
    {        
        return await this.repository.get(queryStatements);
    }
}