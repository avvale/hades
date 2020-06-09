import { EntitySchema } from 'typeorm';
import { AdminLang } from './../../domain/lang.entity';
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
} from './../../domain/value-objects';

export const LangSchema = new EntitySchema<AdminLang>({
    name: 'AdminLang',
    target: AdminLang,
    tableName: 'admin_lang',
    columns: {
        id: {
            primary: true,
            name: 'id',
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
        },
        name: {
            name: 'name',
            type: 'varchar',
            length: 255,
            unique: true,
            transformer: {
                from(value: string): LangName {
                    return new LangName(value);
                },
                to(value: LangName): string {
                    return value.value
                }
            }
        },
        image: {
            name: 'image',
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
        },
        iso6392: {
            name: 'iso_639_2',
            type: 'char',
            length: 2,
            unique: true,
            transformer: {
                from(value: string): LangIso6392 {
                    return new LangIso6392(value);
                },
                to(value: LangIso6392): string {
                    return value.value
                }
            }
        },
        iso6393: {
            name: 'iso_639_3',
            type: 'char',
            length: 3,
            unique: true,
            transformer: {
                from(value: string): LangIso6393 {
                    return new LangIso6393(value);
                },
                to(value: LangIso6393): string {
                    return value.value
                }
            }
        },
        ietf: {
            name: 'ietf',
            type: 'char',
            length: 5,
            unique: true,
            transformer: {
                from(value: string): LangIetf {
                    return new LangIetf(value);
                },
                to(value: LangIetf): string {
                    return value.value
                }
            }
        },
        sort: {
            name: 'sort',
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
        },
        isActive: {
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
        },
        createdAt: {
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
        },
        updatedAt: {
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
        },
        deletedAt: {
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
        }
    }
});