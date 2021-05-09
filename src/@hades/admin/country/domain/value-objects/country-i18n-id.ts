import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryI18nId extends UuidValueObject
{
    public readonly type: 'CountryI18nId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'CountryI18nId',
            nullable: false,
            undefinable: false,
            length: 36,
        }, validationRules), data);
    }
}