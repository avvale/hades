import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ClientIsMaster extends BooleanValueObject
{
    public readonly type: 'ClientIsMaster';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ClientIsMaster',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}