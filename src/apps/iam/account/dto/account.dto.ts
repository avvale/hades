import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from './../../../iam/role/dto/role.dto';    
import { TenantDto } from './../../../iam/tenant/dto/tenant.dto';    

export class AccountDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '570aa66b-4abe-47c9-ba43-6eb63188b8d9'
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
        example     : 'esrdq7yix3zy6txe10nnlaofhycyvlk0yn44c15lyw4x4nj5tfw3gvhdgxcz4ocmmd2tqotztqxobu8e80sovl7ndcj10nlm2louk3kb2e82cfng24aqw0ul'
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
        example     : '387953c1-95a9-47f1-9274-b0448b4178bf'
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
        example     : '2020-10-22 21:05:45'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-22 19:48:43'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-22 03:23:39'
    })
    deletedAt: string;
    
    
}
