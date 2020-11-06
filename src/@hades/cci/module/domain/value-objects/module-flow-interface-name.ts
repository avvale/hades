import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ModuleFlowInterfaceName extends StringValueObject
{
    public readonly type: 'ModuleFlowInterfaceName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ModuleFlowInterfaceName',
            nullable: true,
            undefinable: true,
            maxLength: 160,
        }, validationRules));
    }
}