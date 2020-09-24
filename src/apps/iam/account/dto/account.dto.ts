import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from './../../../iam/role/dto/role.dto';    
import { TenantDto } from './../../../iam/tenant/dto/tenant.dto';    

export class AccountDto 
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
        example     : 'akcabdtpul2igz9b3ioxhe1nxwvca826pxggw8spaaw7kumjs5y7m3h1tx6p0bi6yadfivgpfgpo5zlsdk8s8pddlho85xg66xl116v4vmjiocbhgv5hj63d5s21z7dqd0ymk6xflu3nii9l7oveafajemh9x8wmq8jht13qd5ynhmmefc4ni20i8sww9ia05d6s7v5ll0opbqfzt0z9tcxjay5ns7a5lw62kztw99urhhvmbbafknu5ehivl8k'
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
        example     : '2020-09-24 06:07:22'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-24 15:41:31'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-24 06:29:33'
    })
    deletedAt: string;
    
    
}
