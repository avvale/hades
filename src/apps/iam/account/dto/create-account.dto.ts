import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a1116da9-e76d-41ab-a195-c0a8fc527e15'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'type [input here api field description]',
        example     : 'USER',
        enum        : ['USER','SERVICE']
    })
    type: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'hwhtuzpbwpj3i2mqayq3hdbxn1s00cln298xug9oy4yn15tzt0tn6i37st3203co89e5i0rpxwdomcajhhx2n6zrh5ye5l4bnzopewpamlxyr2au1p9r3qx6'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '58cad0be-cb7c-4784-b485-8c8ff6e56414'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'dApplicationCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    dApplicationCodes: any;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'dPermissions [input here api field description]',
        example     : { "foo" : "bar" }
    })
    dPermissions: any;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'roleIds [input here api field description]',
        example     : '',
    })
    roleIds: string[];
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'tenantIds [input here api field description]',
        example     : '',
    })
    tenantIds: string[];
    
    
}
