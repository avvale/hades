import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailSystemId extends UuidValueObject
{
    public readonly type: 'MessageDetailSystemId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'MessageDetailSystemId',
            nullable:  false ,
            undefinable:  false ,
            length: 36,
        }, validationRules), data);
    }
}
