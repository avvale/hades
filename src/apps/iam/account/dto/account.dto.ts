import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from './../../../iam/role/dto/role.dto';    
import { TenantDto } from './../../../iam/tenant/dto/tenant.dto';    

export class AccountDto 
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
        example     : 'ugb0gv8wm9jc4z6y1ttdaq9rbdvvut50c8r7tjay09treds4fe5qzyoa0t5tnhxug3lqxfck5mp3fvf5iqavcv913dp31belctji8zfhf6nnmpxbznl386u9'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
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
        description : 'dTenants [input here api field description]',
        example     : { "foo" : "bar" }
    })
    dTenants: any;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : [RoleDto],
        description : 'roleIds [input here api field description]',
        example     : '',
    })
    roles: RoleDto[];
    
    
    
    @ApiProperty({
        type        : [TenantDto],
        description : 'tenantIds [input here api field description]',
        example     : '',
    })
    tenants: TenantDto[];
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-07 00:40:20'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-07 21:12:11'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-07 20:03:15'
    })
    deletedAt: string;
    
    
}
