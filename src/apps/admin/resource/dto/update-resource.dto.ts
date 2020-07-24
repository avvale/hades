import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'eb375bd5-0f7a-4b15-b617-8ace4437c646'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '14e8adae-7ae9-4146-817e-36f43618ad8b'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '0d08spyxok2hkigfxsk7oi04j442sgkiee42hjepv60jtqfmhbw5s537ia38g0x1bsxxcdc53oi0bapfo4ohffm473jmecbrmudyg5aujro4yrdjonu6jacycppug2y22ebsdyc98ex3rk4zpzgfmb1mkbxtyh7ey4ct95xg30imn54p03e56no5tesqagqhpkl9bmuulivopwfajt8u6tlrik9tnuztna8jfw2nil7a6wn128ekrsp22r88ebd'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : true
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : true
    })
    hasAttachments: boolean;
    
    
}
