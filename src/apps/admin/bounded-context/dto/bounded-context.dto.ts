import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9de10197-9c32-4f68-8ae9-acf02f56ed77'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'xezgzijvjpfy44286vnx4y2t67yfyy2eoivo571i5rksq5gtegtfe6b0fu6fsr8be94m4q5koxf7wozqn8y7d8k5kvsnh3bx98iv99w6lul1nudi9rkis38lsp3kwthq0quoea3ae7fdnuuizn07vnpehumccbg7ry3396nxsu08eedz7175wzmfwymswhp4w3omayi7rsamd0mmmnbetxzxs09gz70z1u5uhfc6ljjexqr0wmpxg6thi4niiha'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '07kdvqciqyy5z8ahv7r6'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 477063
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-24 03:55:52'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-23 14:12:14'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-24 08:41:16'
    })
    deletedAt: string;
    
    
}
