import { SmallintValueObject } from '@hades/shared/domain/value-objects/smallint.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentHeight extends SmallintValueObject
{
    public readonly type: 'AttachmentHeight';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentHeight',
            nullable: true,
            undefinable: true,
            maxLength: 6,
            unsigned: true,
        }, validationRules));
    }
}