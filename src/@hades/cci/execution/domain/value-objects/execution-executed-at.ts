import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ExecutionExecutedAt extends TimestampValueObject
{
    public readonly type: 'ExecutionExecutedAt';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ExecutionExecutedAt',
            nullable:  false ,
            undefinable:  false ,
        }, validationRules));
    }
}