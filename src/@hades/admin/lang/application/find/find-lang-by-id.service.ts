import { Injectable } from '@nestjs/common';
import { ILangRepository } from './../../domain/lang.repository';
import { Lang } from './../../domain/lang';
import { LangId } from './../../domain/value-objects';

@Injectable()
export class FindLangByIdService
{
    constructor(
        private readonly repository: ILangRepository
    ) {}

    public async main(id: LangId): Promise<Lang>
    {        
        return await this.repository.findById(id);
    }
}