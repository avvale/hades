import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowScenario extends StringValueObject
{
    public readonly type: 'FlowScenario';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'FlowScenario',
            nullable: true,
            undefinable: true,
            maxLength: 60,
        }, validationRules));
    }
}