import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from './../../../iam/role/dto/role.dto';    

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '08832010-55a7-467b-866e-ab9df91d99be'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '4kkyhj3a5lm7ljqgai71q080higa6a3yw78ff3q4w3nk1ouppmy89ovp8t1m6u332amylg5cxnlkajnzv796a6yw4xkcepqi7hyvx4v6ur9mibpprqfp52lclnuqu7rf9g9jlwc48d5aezyauibhdzng9pdsudzgb4v1pisyzzgvoaqi231id92sjivchoaawws6c4smkt8i76qsj1yrgrgx85ewqdc6x7i9do0mtzh4ma5ute8d9flxlbrmnhp'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '51d1244c-95f3-45f8-b042-cee2360ece67'
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
        example     : '2020-10-16 10:11:02'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-16 02:28:43'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-16 13:38:33'
    })
    deletedAt: string;
    
    
}
