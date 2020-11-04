import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowFieldGroupId extends UuidValueObject
{
    public readonly type: 'FlowFieldGroupId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'FlowFieldGroupId',
            nullable:  true ,
            undefinable:  true ,
            length: 36,
        }, validationRules), data);
    }
}
