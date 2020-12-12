import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentData extends JsonValueObject
{
    public readonly type: 'AttachmentData';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentData',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}