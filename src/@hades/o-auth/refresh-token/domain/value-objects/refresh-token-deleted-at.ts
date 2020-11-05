import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class RefreshTokenDeletedAt extends TimestampValueObject
{
    public readonly type: 'RefreshTokenDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'RefreshTokenDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}