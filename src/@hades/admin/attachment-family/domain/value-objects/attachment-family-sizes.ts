import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentFamilySizes extends JsonValueObject
{
    public readonly type: 'AttachmentFamilySizes';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentFamilySizes',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}