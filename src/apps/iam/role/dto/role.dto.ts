import { ApiProperty } from '@nestjs/swagger';
import { PermissionDto } from './../../../iam/permission/dto/permission.dto';    
import { AccountDto } from './../../../iam/account/dto/account.dto';    

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '24lln7h5knez4dfl4nn2h698khnjfh07vaivkfqgukxc9k4e908qwke361v2cnnzp7fhlx3hb4roobg862awg944qfs69jcu4uy8299aw9n3474k6ysevsogvdlswzzndzveze0fqozzvyq0g19x8gzaz1n28742s41jfybxzw0awx3spxqgztcdav4duwaquf4a3nkk5qiejy1zuiv9f4ywz6p8witfrwa71logsvhc85fp1ujzsv8ol4diapi'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
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
        example     : '2020-10-16 00:50:09'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-16 02:04:50'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-16 00:08:00'
    })
    deletedAt: string;
    
    
}
