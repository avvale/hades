import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobDetailStartAt extends TimestampValueObject
{
    public readonly type: 'JobDetailStartAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'JobDetailStartAt',
            nullable:  false ,
            undefinable:  false ,
        }, validationRules), data);
    }
}