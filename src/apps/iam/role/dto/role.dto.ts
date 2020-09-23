import { ApiProperty } from '@nestjs/swagger';
import { PermissionDto } from './../../../iam/permission/dto/permission.dto';    
import { AccountDto } from './../../../iam/account/dto/account.dto';    

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '922e168c-712d-48b3-9f45-137677eba31e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'u88aakyshepu6xvqa1lh6iqntovzkq31lyi30xo3aknh57lnktaocnw7ife7eu8xlw9x9owo82jls81m68hli0pmph7ew5490jgowngiewoqn64igmp184oyj12inyhk9gwe6ftr3gno9z7ssp8ez6jwxdfnmrkv9svsvcojil5hb2u3sg273l00knn5g01ncakrd7k1n3fr2prpjzinh48j2285s04izc5vkyfzjg8pmfbtkz6hfmcp0mrve39'
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
        example     : '2020-09-23 10:51:21'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-22 21:02:10'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-23 08:39:00'
    })
    deletedAt: string;
    
    
}
