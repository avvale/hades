import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { ILangRepository } from './../../domain/lang.repository';
import { AdminLang } from './../../domain/lang.aggregate';

@Injectable()
export class GetLangsService
{
    constructor(
        private readonly repository: ILangRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<AdminLang[]>
    {        
        return await this.repository.get(queryStatement);
    }
}