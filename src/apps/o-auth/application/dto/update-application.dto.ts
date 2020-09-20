import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c9bcd7d2-a670-49e5-a90a-dd55226fad87'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'pcebuxeylpryi2gskcuulp1lvb0tlb9jfq9hxb9tfov40rt4hlsq2yakla3rgbtfa716ogbnbx7khte3hhkbdh9j3s8s6sf7aaio7a2kebn3wczipzx82587yrkcds9d5zahhi8nqsw2x97dp0m63eregyw9h5ku93a2jb084m4eg0sq7v23h7nan4xd86xu9pmd09sslzmpj9d9mco1p3rbsekfujy222xo68fv3nspv7auyqt7oj45hl44zb6'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'ec9oiye9esrcahzitdq7h39dh29fp2g2jmra2ca0qgpgl2kqh4'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'rr8yjyrhkgep6dtjswn4ssyewnvic86kuhfsacy1qzhkji0gmev2d4fwgqah9vw5h9s63pskx60r7fe1anqtj05fyc'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
}
