import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelDetailTenantCode extends StringValueObject 
{
    public readonly type: 'ChannelDetailTenantCode';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDetailTenantCode',
            nullable: false,
            undefinable: false,
            maxLength: 50,            
        }, validationRules));
    }
}