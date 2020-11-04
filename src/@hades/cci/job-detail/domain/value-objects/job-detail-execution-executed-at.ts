import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobDetailExecutionExecutedAt extends TimestampValueObject
{
    public readonly type: 'JobDetailExecutionExecutedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'JobDetailExecutionExecutedAt',
            nullable:  false ,
            undefinable:  false ,
        }, validationRules), data);
    }
}