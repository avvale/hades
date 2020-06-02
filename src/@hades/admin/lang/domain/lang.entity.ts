import { AggregateRoot } from '@nestjs/cqrs';
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
    LangDeletedAt 
} from './value-objects';
import { CreatedLangEvent } from './../application/events/created-lang.event';
import { UpdatedLangEvent } from './../application/events/updated-lang.event';
import { DeletedLangEvent } from './../application/events/deleted-lang.event';

export class Lang extends AggregateRoot
{
    id: LangId;
    name: LangName;   
    image: LangImage;
    iso6392: LangIso6392;
    iso6393: LangIso6393;
    ietf: LangIetf;
    sort: LangSort;
    isActive: LangIsActive;
    createdAt: LangCreatedAt;
    updatedAt: LangUpdatedAt;
    deletedAt: LangDeletedAt;

    constructor(id?: LangId, name?: LangName, image?: LangImage, iso6392?: LangIso6392, iso6393?: LangIso6393, ietf?: LangIetf, sort?: LangSort, isActive?: LangIsActive, createdAt?: LangCreatedAt, updatedAt?: LangUpdatedAt, deletedAt?: LangDeletedAt) 
    {
       super();

        this.id         = id;
        this.name       = name;
        this.image      = image;
        this.iso6392    = iso6392;
        this.iso6393    = iso6393;
        this.ietf       = ietf;
        this.sort       = sort;
        this.isActive   = isActive;
        this.createdAt  = createdAt;
        this.updatedAt  = updatedAt;
        this.deletedAt  = deletedAt;
    }

    static register (id: LangId, name?: LangName, image?: LangImage, iso6392?: LangIso6392, iso6393?: LangIso6393, ietf?: LangIetf, sort?: LangSort, isActive?: LangIsActive, createdAt?: LangCreatedAt, updatedAt?: LangUpdatedAt, deletedAt?: LangDeletedAt): Lang
    {
        return new Lang(id, name, image, iso6392, iso6393, ietf, sort, isActive, createdAt, updatedAt, deletedAt);
    }

    created(lang: Lang)
    {
        this.apply(
            new CreatedLangEvent(
                lang.id.value, 
                lang.name.value, 
                lang.image?.value, 
                lang.iso6392.value, 
                lang.iso6393.value, 
                lang.ietf.value, 
                lang.sort.value, 
                lang.isActive.value, 
                lang.createdAt.value, 
                lang.updatedAt.value, 
                lang.deletedAt?.value
            )
        );
    }

    updated(lang: Lang)
    {
        this.apply(
            new UpdatedLangEvent(
                lang.id.value, 
                lang.name?.value, 
                lang.image?.value, 
                lang.iso6392?.value, 
                lang.iso6393?.value, 
                lang.ietf?.value, 
                lang.sort?.value, 
                lang.isActive?.value, 
                lang.createdAt?.value, 
                lang.updatedAt?.value, 
                lang.deletedAt?.value
            )
        );
    }

    deleted(lang: Lang)
    {
        this.apply(
            new DeletedLangEvent(
                lang.id.value, 
                lang.name.value, 
                lang.image?.value, 
                lang.iso6392.value, 
                lang.iso6393.value, 
                lang.ietf.value, 
                lang.sort.value, 
                lang.isActive.value, 
                lang.createdAt.value, 
                lang.updatedAt.value, 
                lang.deletedAt?.value
            )
        );
    }
}