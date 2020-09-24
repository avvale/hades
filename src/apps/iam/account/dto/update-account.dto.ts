import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto 
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
        example     : 'q4c0t48stc6b54x2op8bvucdwu10am2jsy45awf9xgrslxr2qjzciosa3zjy9uduxzz07t0w4y9f7cooi14vxs42840v8k4mgtalkj0phxox2n38ll0f0193u1crhah4xfu0v1sz18l6x1zp0u3tf0fkewrtogxm5pwq0fjh0mhiidwjdh8ehjw4nnphmeds77pt5b123wjjnn8pohud8irjtmf3rkjr7amgo9a1bmfmfaq41wahpj8lo32jaxy'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
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
