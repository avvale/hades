import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    LangId,
    LangName,
    LangImage,
    LangIso6392,
    LangIso6393,
    LangIetf,
    LangDir,
    LangSort,
    LangIsActive,
    LangCreatedAt,
    LangUpdatedAt,
    LangDeletedAt,
} from './../../domain/value-objects';
import { AdminLang } from './../../domain/lang.aggregate';
import { langs } from './../seeds/lang.seed';

@Injectable()
export class MockLangSeeder extends MockSeeder<AdminLang>
{
    public collectionSource: AdminLang[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let lang of langs)
        {
            this.collectionSource.push(
                AdminLang.register(
                    new LangId(lang.id),
                    new LangName(lang.name),
                    new LangImage(lang.image),
                    new LangIso6392(lang.iso6392),
                    new LangIso6393(lang.iso6393),
                    new LangIetf(lang.ietf),
                    new LangDir(lang.dir),
                    new LangSort(lang.sort),
                    new LangIsActive(lang.isActive),
                    new LangCreatedAt({currentTimestamp: true}),
                    new LangUpdatedAt({currentTimestamp: true}),
                    new LangDeletedAt(null),
                )
            );
        }
    }
}