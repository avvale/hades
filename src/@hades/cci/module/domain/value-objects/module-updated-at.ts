import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ModuleUpdatedAt extends TimestampValueObject
{
    public readonly type: 'ModuleUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'ModuleUpdatedAt',
            nullable:  true ,
            undefinable:  true ,
        }, validationRules), data);
    }
}