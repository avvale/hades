import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LangId } from './../../domain/value-objects/lang-id';
import { ILangRepository } from './../../domain/lang.repository';
import { Lang } from './../../domain/lang';

@Injectable()
export class TypeOrmLangRepository implements ILangRepository
{
    constructor(
        @InjectRepository(Lang)
        public readonly repository: Repository<Lang>
    ) {}

    async save(lang: Lang): Promise<Lang>
    {
        const langEntity =  await this.repository.save(lang);

        // TODO, TypeOrm Error: https://github.com/typeorm/typeorm/issues/5719
        // Cuando das de alta un modelo llama 3 veces al transfor y te crea una anidación incorrecta
        if (typeof langEntity.id.value === 'object') langEntity.id.value = langEntity.id.value['value'];

        return langEntity;
    }

    async findAll(): Promise<Lang[]> 
    {
        return await this.repository.find();
    }

    findOneById(id: LangId): Promise<Lang | null>
    {
        return null;
    }
}