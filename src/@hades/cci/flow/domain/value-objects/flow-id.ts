import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowId extends UuidValueObject
{
    public readonly type: 'FlowId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'FlowId',
            nullable: false,
            undefinable: false,
            length: 36,
        }, validationRules), data);
    }
}