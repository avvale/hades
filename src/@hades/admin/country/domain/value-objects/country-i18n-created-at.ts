import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryI18nCreatedAt extends TimestampValueObject
{
    public readonly type: 'CountryI18nCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'CountryI18nCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}