import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailExecutionMonitoringEndAt extends TimestampValueObject
{
    public readonly type: 'MessageDetailExecutionMonitoringEndAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'MessageDetailExecutionMonitoringEndAt',
            nullable: false,
            undefinable: false,
        }, validationRules), data);
    }
}