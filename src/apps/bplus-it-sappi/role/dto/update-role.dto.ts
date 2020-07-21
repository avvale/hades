import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '8fd69091-78d9-4942-be62-d502744fda3b'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : 'd0706715-b701-4bb1-9baf-372f4a71accd'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : '3mq2thmhfc3gdx5fn2zyvz3tltc1he28yfz7yi5ytqb5nf4rtpi7ubof3z4176xos7on8vkvx8v7je74rdjn7oollnlh68kw9np1wa701kfqtguj8rllfhi1p2v3uwm0q0vpbz0rtkk1dcz83a86el09zqk4tqtzzrfa2du9nv5mhuarkvga5vlxqb6pw5w07dxqhk9atxir0id8ehmo1ttzrrccalf9cn8x8o3o7oarfj9o924f1hez80irl18'
        })
        name: string;
    
    
}
