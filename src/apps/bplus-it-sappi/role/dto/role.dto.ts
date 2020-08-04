import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '5accecd0-2bc3-4c36-810f-22977ac0d21a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'o1o3pv7gaoi3pligivifvup3oj6axqka6y6wegh5ufieshw2v2'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'c2xmzasyrqhmr343kl6op661xc0j3u5pegipoc62tk7wxuak6rdse2nplxo3zctgoqykhtmyo6ugt3um7fhmawl8nifrrj8can2ubh5xs7fif87hk4x0v5zrxchjqp0yclaqnknv4xknesdmu83b1nszkhq10446xde8ui838rdo19mhj8ecp3vx7616qhlf3yzjx01bm9awenhsba2fesfmitas190ku93uev9lh88gwjoeeefj3009dwkrtmf'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-04 06:30:45'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 17:48:54'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 05:57:09'
    })
    deletedAt: string;
    
    
}
