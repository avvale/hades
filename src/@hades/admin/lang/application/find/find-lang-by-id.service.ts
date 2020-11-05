import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ILangRepository } from './../../domain/lang.repository';
import { AdminLang } from './../../domain/lang.aggregate';
import { LangId } from './../../domain/value-objects';

@Injectable()
export class FindLangByIdService
{
    constructor(
        private readonly repository: ILangRepository,
    ) {}

    public async main(id: LangId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminLang>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}