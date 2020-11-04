import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobDetailDeletedAt extends TimestampValueObject
{
    public readonly type: 'JobDetailDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'JobDetailDeletedAt',
            nullable:  true ,
            undefinable:  true ,
        }, validationRules), data);
    }
}