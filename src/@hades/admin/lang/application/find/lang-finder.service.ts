import { Injectable } from '@nestjs/common';
import { ILangRepository } from './../../domain/lang.repository';
import { Lang } from '../../domain/lang';

@Injectable()
export class LangFinderService
{
    constructor(
        private readonly repository: ILangRepository
    ) {}

    public async main(): Promise<Lang[]>
    {        
        return await this.repository.findAll();
    }
}