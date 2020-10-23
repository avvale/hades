import { ApiProperty } from '@nestjs/swagger';
import { PermissionDto } from './../../../iam/permission/dto/permission.dto';    
import { AccountDto } from './../../../iam/account/dto/account.dto';    

export class RoleDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4d6b143d-885f-403b-a4d5-b14966719c9e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ef95id9yzk1dc1gk81yv008vcpq760byc2tfq4opq1n9o2rj5utn58zr4fncnl1nmt5w53zr0vhw0i155agw9n1lsq85nvtwdgimvgcp4750854znkgz3kji2v50lajcbbnk9ppako9i3s97hmq17xzc79xah5xk8dsvqbma3srvcrqvhgh7wc6q9nfgy8v6z2i2avxba3ldy3i128nwqke8s80rwvc0zizjvxn0x2yet8mc5d61c1enhzmj4fn'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [PermissionDto],
        description : 'permissionIds [input here api field description]',
        example     : '',
    })
    permissions: PermissionDto[];
    
    
    
    @ApiProperty({
        type        : [AccountDto],
        description : 'accountIds [input here api field description]',
        example     : '',
    })
    accounts: AccountDto[];
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-22 15:28:51'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-22 23:57:19'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-22 17:32:06'
    })
    deletedAt: string;
    
    
}
