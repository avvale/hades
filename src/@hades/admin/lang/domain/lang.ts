import { AggregateRoot } from '@nestjs/cqrs';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, Unique, PrimaryColumn, Index } from 'typeorm';
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
import { LangCreatedEvent } from '../application/events/lang-created.event';

// TODO desacoplar schema de typeorm del modelo
// https://typeorm.io/#/separating-entity-definition
@Entity('admin_lang')
@Unique(['name'])
@Unique(['iso6392'])
@Unique(['iso6393'])
@Unique(['ietf'])
export class Lang extends AggregateRoot
{
    @PrimaryColumn({
        type: 'char',
        length: 36,
        transformer: {
            from(value: string): LangId {
                return new LangId(value);
            },
            to(value: LangId): string {
                return value.value
            }
        }
    })
    id: LangId;

    @Column({
        type: 'varchar',
        length: 255,
        transformer: {
            from(value: string): LangName {
                return new LangName(value);
            },
            to(value: LangName): string {
                return value.value
            }
        }
    })
    name: LangName;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
        transformer: {
            from(value: string): LangImage {
                return new LangImage(value);
            },
            to(value: LangImage): string {
                return value.value
            }
        }
    })
    image: LangImage;

    @Column({
        name: 'iso_639_2',
        type: 'char',
        length: 2,
       // unique: true,
        transformer: {
            from(value: string): LangIso6392 {
                return new LangIso6392(value);
            },
            to(value: LangIso6392): string {
                return value.value
            }
        }
    })
    iso6392: LangIso6392;

    @Column({
        name: 'iso_639_3',
        type: 'char',
        length: 3,
        //unique: true,
        transformer: {
            from(value: string): LangIso6393 {
                return new LangIso6393(value);
            },
            to(value: LangIso6393): string {
                return value.value
            }
        }
    })
    iso6393: LangIso6393;

    @Column({
        type: 'char',
        length: 5,
        //unique: true,
        transformer: {
            from(value: string): LangIetf {
                return new LangIetf(value);
            },
            to(value: LangIetf): string {
                return value.value
            }
        }
    })
    ietf: LangIetf;

    @Column({
        type: 'smallint',
        unsigned: true,
        width: 5,
        nullable: true,
        transformer: {
            from(value: number): LangSort {
                return new LangSort(value);
            },
            to(value: LangSort): number {
                return value.value
            }
        }
    })
    sort: LangSort;

    @Column({ 
        name: 'is_active', 
        type: 'boolean',
        default: false,
        transformer: {
            from(value: boolean): LangIsActive {
                return new LangIsActive(value);
            },
            to(value: LangIsActive): boolean {
                return value.value
            }
        }
    })
    isActive: LangIsActive;

    @Column({ 
        name: 'created_at', 
        type: 'timestamp', 
        nullable: true,
        transformer: {
            from(value: string): LangCreatedAt {
                return new LangCreatedAt(value);
            },
            to(value: LangCreatedAt): string {
                return value?.value
            }
        }
    })
    createdAt: LangCreatedAt;

    @Column({ 
        name: 'updated_at', 
        type: 'timestamp', 
        nullable: true,
        transformer: {
            from(value: string): LangUpdatedAt {
                return new LangUpdatedAt(value);
            },
            to(value: LangUpdatedAt): string {
                return value?.value
            }
        }
    })
    updatedAt: LangUpdatedAt;

    @Column({ 
        name: 'deleted_at', 
        type: 'timestamp', 
        nullable: true,
        transformer: {
            from(value: string): LangDeletedAt {
                return new LangDeletedAt(value);
            },
            to(value: LangDeletedAt): string {
                return value?.value
            }
        }
    })
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

    static register (id: LangId, name: LangName, image: LangImage, iso6392: LangIso6392, iso6393: LangIso6393, ietf: LangIetf, sort: LangSort, isActive: LangIsActive, createdAt: LangCreatedAt, updatedAt: LangUpdatedAt, deletedAt: LangDeletedAt): Lang
    {
        return new Lang(id, name, image, iso6392, iso6393, ietf, sort, isActive, createdAt, updatedAt, deletedAt);
    }

    langCreated(lang: Lang)
    {
        this.apply(
            new LangCreatedEvent(
                lang.id.value, 
                lang.name.value, 
                lang.image.value, 
                lang.iso6392.value, 
                lang.iso6393.value, 
                lang.ietf.value, 
                lang.sort.value, 
                lang.isActive.value, 
                lang.createdAt.value, 
                lang.updatedAt.value, 
                lang.deletedAt.value
            )
        );
    }
}
