import { LangId } from './value-objects/lang-id';
import { Repository } from 'typeorm';
import { Lang } from './lang';

export abstract class ILangRepository 
{
    abstract repository: Repository<Lang>;
    
    abstract async save(lang: Lang): Promise<Lang>;

    abstract async findOneById(id: LangId): Promise<Lang | null>;

    abstract async findAll(): Promise<Lang[]>;
}