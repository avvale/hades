import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AdministrativeAreaLevel2CountryCommonId extends UuidValueObject
{
    public readonly type: 'AdministrativeAreaLevel2CountryCommonId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'AdministrativeAreaLevel2CountryCommonId',
            nullable: false,
            undefinable: false,
            length: 36,
        }, validationRules), data);
    }
}