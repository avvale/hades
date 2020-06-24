import { Injectable } from '@nestjs/common';
import { ILangRepository } from './../../domain/lang.repository';
import { AdminLang } from './../../domain/lang.entity';
import { LangId } from './../../domain/value-objects';

@Injectable()
export class FindLangByIdService
{
    constructor(
        private readonly repository: ILangRepository
    ) {}

    public async main(id: LangId): Promise<AdminLang>
    {        
        return await this.repository.findById(id);
    }
}