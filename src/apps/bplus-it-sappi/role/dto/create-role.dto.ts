import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '6c68c5e4-ee23-44b4-855d-20ac92d58daa'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '4ea53cf0-4253-42b5-b7ff-460ba94e25f4'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'zx4icfaf3o6nhbmq3255kykx76rjjzaajnf9mn6dcnircyn5pibv8snwkfqct7boi9gc31biph7ay1rlcjagw9u5z8eavtejfvb02y472nfrtzicup8cklub0goj8br1yz6y9169nh7j4yoipnqec88lr92jazhe92r93ry1thowcx1zxpf0h6jxe74806t3zeyh4qkn6cu8n5lgmdg1mahsgipa3rhbwjd60jwmi47tjc0horbumylxdh4z3x7'
        })
        name: string;
    
    
}
