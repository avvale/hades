import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
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
        example     : 'zhxk9yy5aug0vg9l0g04q9athm2r978i9zo4f125l2up26zu7bo5gww1b6cw1rahdy4uxrgoiu3w8p65l2aq3h1wc3wajntl3y1sfvnju0mzet6lajmcw43362jfg6pxz3iso11hagmimz8vs6cqckotgepvaim7u77l06u7ojc23df7h3bi0ehmy1f9akmost7ldpcls4m1iirqm6esqdng9lkumwiydh84zk9i8jbgmezbnfv08vzo0f36vt1'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'nhl7gllcwot3malp97ra'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 770011
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
