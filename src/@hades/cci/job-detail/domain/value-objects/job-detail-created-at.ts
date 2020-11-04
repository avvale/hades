import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobDetailCreatedAt extends TimestampValueObject
{
    public readonly type: 'JobDetailCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'JobDetailCreatedAt',
            nullable:  true ,
            undefinable:  true ,
        }, validationRules), data);
    }
}