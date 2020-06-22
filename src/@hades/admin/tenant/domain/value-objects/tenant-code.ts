import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';

export class TenantCode extends StringValueObject 
{
    public readonly type: 'TenantCode';   

    constructor(value: string) 
    {
        super(value, { 
            name: 'TenantCode',
            nullable: false,
            length: 50,                                    
        });
    }
}