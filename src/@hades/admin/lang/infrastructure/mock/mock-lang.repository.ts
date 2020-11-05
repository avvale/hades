import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { ILangRepository } from '@hades/admin/lang/domain/lang.repository';
import {
    LangId,
    LangName,
    LangImage,
    LangIso6392,
    LangIso6393,
    LangIetf,
    LangSort,
    LangIsActive,
    LangCreatedAt,
    LangUpdatedAt,
    LangDeletedAt,
} from '@hades/admin/lang/domain/value-objects';
import { AdminLang } from './../../domain/lang.aggregate';
import { langs } from './../seeds/lang.seed';

@Injectable()
export class MockLangRepository extends MockRepository<AdminLang> implements ILangRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AdminLang';
    public collectionSource: AdminLang[];
    public deletedAtInstance: LangDeletedAt = new LangDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset()
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>langs)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AdminLang.register(
                    new LangId(itemCollection.id),
                    new LangName(itemCollection.name),
                    new LangImage(itemCollection.image),
                    new LangIso6392(itemCollection.iso6392),
                    new LangIso6393(itemCollection.iso6393),
                    new LangIetf(itemCollection.ietf),
                    new LangSort(itemCollection.sort),
                    new LangIsActive(itemCollection.isActive),
                    new LangCreatedAt(itemCollection.createdAt),
                    new LangUpdatedAt(itemCollection.updatedAt),
                    new LangDeletedAt(itemCollection.deletedAt),
                ));
        }
    }
}