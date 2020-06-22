import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';

export class TenantName extends StringValueObject 
{
    public readonly type: 'TenantName';   

    constructor(value: string) 
    {
        super(value, { 
            name: 'TenantName',
            nullable: false,
            length: 255,                                    
        });
    }
}