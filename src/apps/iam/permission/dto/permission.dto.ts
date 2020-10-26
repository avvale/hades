import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from './../../../iam/role/dto/role.dto';    

export class PermissionDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5dc42d11-c3c6-475d-b72d-1d8a8d733813'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'e1ez44d55s4jhlazadzjpllwojv0yjctwcwf9ha1246m0mfs2ceg51u0ylr9qikq1svu2x3vak4h31uc7cr9go0oc0mewyetbjtprkddh6h6ylkvpk4bsmou3g119vsc9621is5bopr9yzhfphdu0igns0fxkno8slaa3zhbytgbnlqj398sixfh3ia9s691e3anojebd91po8rv6one0yynyli6wppnzsp25htgnbkow0s8sovizqerq9jhq0i'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'a849eac0-3664-43d8-8329-12c1973ffcc2'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : [RoleDto],
        description : 'roleIds [input here api field description]',
        example     : '',
    })
    roles: RoleDto[];
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-23 08:15:14'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-23 05:38:39'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-23 12:31:20'
    })
    deletedAt: string;
    
    
}
