import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowIsCritical extends BooleanValueObject
{
    public readonly type: 'FlowIsCritical';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'FlowIsCritical',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}