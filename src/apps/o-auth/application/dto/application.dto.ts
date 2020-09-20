import { ApiProperty } from '@nestjs/swagger';

export class ApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '9d3ibo52y31gsk3pqfxkch1mkpokckmjwaxz6qruphzh0aqlid3pck59gm8bsh1xsdcvobl6ht54nv3oaz01feabpavx4zef8tm8o8phbgeoafsytu6rblsie2pk3p5nad52vbm5l2acgswj33ewdg8xczktpwo9y1bcgm6yw651j89hoqxodgluzmmp48c5roj4kdr0f9d2yjqgkmgxoydg7975dgt3vd7phsm7wc0signxia6ypp6k6okx1gp'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : '4j7e5x2f9skl2quf2xvdn7qqhts5zxe43ghieetkoge43xonm3'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '1il0wuoydyak5f1k2uweyqvlv7chi23uyy93mdmmlebpg0dmlt20lru3sf5mvxhzynyb8ohuv2ui0p8dqlq1b64gqo'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-20 08:09:45'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 01:22:04'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-19 23:32:00'
    })
    deletedAt: string;
    
    
}
