import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from './../../../iam/role/dto/role.dto';    
import { TenantDto } from './../../../iam/tenant/dto/tenant.dto';    

export class AccountDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cd64e54e-0d77-4206-8e18-2e0c98dab157'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'type [input here api field description]',
        example     : 'SERVICE',
        enum        : ['USER','SERVICE']
    })
    type: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'uujveevle2zeot1sjhe33i5jn1xnq3fq6t1hymikbew0kqgsr1fethlqy7t6a9ps6ffq3w0lfsgghs5d7lov6cwugl99o3el6c27xn52hp1h0m4qq832qphv'
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
        example     : '7db40fe5-6ee1-4c26-a460-3733d2fe1c61'
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
        example     : '2020-10-22 07:38:32'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-22 03:00:54'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-22 17:14:50'
    })
    deletedAt: string;
    
    
}
