import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AdministrativeAreaLevel1UpdatedAt extends TimestampValueObject
{
    public readonly type: 'AdministrativeAreaLevel1UpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'AdministrativeAreaLevel1UpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}