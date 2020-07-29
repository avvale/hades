import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '627c5997-66bf-4e3d-80f6-7a26763a2ebf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '17b0817f-fbe8-41e3-a7d2-061e71833fb3'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 's988crqa35t6bhtfnxlc37najwgwhxc2f0opgonpy9dwhjo8e4m4vvf2mb8bq4jhmz4kim9npdc6o686cbalfhrouvwmb69926gmtnfjbba2h4qwi9zitx9g949e4b4rx2exepr4lue3meb6z8pfya551uai6ts2b74ntmisfp2m2o009qad6u7y3tczxpdya53h3azpcgg4xhperp59cw5r0ijj71mym8jzkl4xxu0wxp2rtiumiddj7rqfqtf'
    })
    name: string;
    
    
}
