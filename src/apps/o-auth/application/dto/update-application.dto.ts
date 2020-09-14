import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a519ff03-db35-49ee-9162-bb4398fa8e45'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ard3h31upmfxyd1h69ufhjruqf3gr3sog44wyt6scnv4x8w4k7v051eex7qnkxsswntnd9u9jp39nlvj7ekn7z52n7o1wma4z81ztsua0joo9652qgtd2dac60bfxbg5p5jd1mbau2sfyanf4cxmbizm01o7cwgk91prcyzs9e612qsovsfaztcnjbvzyx936u1glleg1hxfn2aj08n1nt8q8ompgksf6hdyybjavi8xq8572n1bi2hs5p89ij8'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'm7y7gn1o970vsqnkvs8gt8oidjp2oacuittp5ddflvb7vchm7h'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '888q8z8zvxyj96psn1a06hyhldzn73bar2le1wm5xxwkup8kxzvkrhnh2d6bbxtmal8hmiyve0nhtauh8wh0byggkl'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
}
