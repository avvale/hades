import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryI18nDeletedAt extends TimestampValueObject
{
    public readonly type: 'CountryI18nDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'CountryI18nDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}