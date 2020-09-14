import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8fbfc1b5-e1a4-4095-87c9-87b848c159f0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Sed explicabo excepturi nihil. Consequatur a quaerat adipisci rerum delectus. Enim sunt voluptas corporis est voluptas sapiente vel. Perferendis vero ut at atque architecto eius impedit.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ofsx41jykc1n9ysvyub5f3aqx96b6fqpxxztpo8comkcsgeansr6ji853dsxcr827s1owgc0t2hbd3r9je0hd9rj3xsmzhn2c446zqsno8m3me4tnozhherifx48p9zap7gqhb4fr4s0bhnva72nxpikt5eo0f846agbi0us3kpsud6mxk6csbgiiaondyee9p5lc90w9xdx1ize96qeq6i2qsabr3wuui6lrew6z9mqx5ja8w5lrzlvcex0sqp'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-09-14 13:44:58'
    })
    expiresAt: string;
    
    
}
