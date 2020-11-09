import { UuidArrayValueObject } from '@hades/shared/domain/value-objects/uuid-array.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ClientApplicationIds extends UuidArrayValueObject
{
    public readonly type: 'ClientApplicationIds';

    constructor(value: string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ClientApplicationIds',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}