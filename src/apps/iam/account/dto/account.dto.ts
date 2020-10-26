import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from './../../../iam/role/dto/role.dto';    
import { TenantDto } from './../../../iam/tenant/dto/tenant.dto';    

export class AccountDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2cfed5bc-4b22-4e23-8e07-b8678a877fd0'
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
        example     : 'cekx7ejj1mstuld9mety0h3rcn0ujp0ecz4smqw0t6wslagbers5tml1r3xhl61dhm365nel76rndna5qd4o483tbuhrvt55bo4t2pb87wvtnycxow5chcpp'
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
        example     : '20ff0e82-fb3e-4685-aed0-e1945a1884a7'
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
        example     : '2020-10-25 04:14:54'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-25 11:55:37'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-25 12:14:08'
    })
    deletedAt: string;
    
    
}
