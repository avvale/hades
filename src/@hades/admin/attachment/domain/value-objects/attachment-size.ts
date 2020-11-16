import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentSize extends IntValueObject
{
    public readonly type: 'AttachmentSize';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentSize',
            nullable: false,
            undefinable: false,
            maxLength: 10,
            unsigned: true,
        }, validationRules));
    }
}