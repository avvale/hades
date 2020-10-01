import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from './../../../iam/role/dto/role.dto';    

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7b405718-cd71-43f1-8611-2ae0120c241a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'nyt4op1jfbh2xohs5yeay6xv2u4v5guwqy7314usrmjoqqlk8iml67abnekw0t6s0kgow5fremgqbxylqq9lc4ijr0luvmqdz9hxtqnsq8vkswkf6q3isohcz1jnc50l69x9caeolefd5pac161muv38uxpft22zrk2ag7g6tfxlb9bm6sejhhpskqfpvmqkaxetrz6xi3cbsj3yp9f0qc3wlzcjlx5zxn6t6wxdu1r951mytzut9cqt3gnckhg'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'c0b489a6-e83b-4664-b5b8-845049630726'
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
        example     : '2020-09-23 11:43:44'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-23 12:30:52'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-23 12:10:36'
    })
    deletedAt: string;
    
    
}
