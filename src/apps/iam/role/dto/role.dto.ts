import { ApiProperty } from '@nestjs/swagger';
import { PermissionDto } from './../../../iam/permission/dto/permission.dto';    
import { AccountDto } from './../../../iam/account/dto/account.dto';    

export class RoleDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6dff0dda-5a79-49fe-87b0-fd9378dbc58e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '36camwuxzcafo8expsh4fw03v7uirmjshwtq99529o622m5s3xu2ppsslnmz0n9wqezwf22bsdpjehdm42n7b2rixs5ztag43ygsejxnue6oboojaqcff1nv6wp4m76wb2d3cyiplwr47ncgsc3ubdnzovxvw5ebwwg9gy6newy6up3lj1q0fua249olfio4vf0p0d0fkz7stdj1rssivuanh43ahatiazqo2rnbrg3bzbpkfi0q01dsji0rnrm'
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
        example     : '2020-10-23 10:41:42'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-22 22:55:06'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-23 11:53:36'
    })
    deletedAt: string;
    
    
}
