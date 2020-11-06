import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowIflowName extends StringValueObject
{
    public readonly type: 'FlowIflowName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'FlowIflowName',
            nullable: true,
            undefinable: true,
            maxLength: 160,
        }, validationRules));
    }
}