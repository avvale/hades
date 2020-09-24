import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4d0ac56d-f3b0-438d-8300-893a83247ff8'
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
        description : 'name [input here api field description]',
        example     : 'umzjs6tahi2je6ws81ki7g3fqkm5tx1g3q6c52yof8ofwa3vg6rw47w0pwpv7yuygdzv70kw4nzy3sqqnhfc4re3ylr2oy88tix7oiqyg9n8tfknnoxzy6ray6c0f1ug1vpr832kioo6vdbh0rp4j9hwzcb0617rjs2e6v4ub4b0m1tmqa562dwo93zzxd78dq9kwi4fnm6elbclahw8qhhc1fuprcllr2sosf5chw4pyph3zxnhp779t9jgjah'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '7f54f196-12ab-47f6-aada-06243f1d4b22'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'applicationCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    applicationCodes: any;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'permissions [input here api field description]',
        example     : { "foo" : "bar" }
    })
    permissions: any;
    
    
    
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
