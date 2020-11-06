import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowLastChangedAt extends TimestampValueObject
{
    public readonly type: 'FlowLastChangedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'FlowLastChangedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}