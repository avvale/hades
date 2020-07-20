import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelOverviewSnapshotDto 
{   
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 2030240320
    })
    error: number;
    
    @ApiProperty({
        type        : Number,
        description : 'inactive [input here api field description]',
        example     : 3778055146
    })
    inactive: number;
    
    @ApiProperty({
        type        : Number,
        description : 'successful [input here api field description]',
        example     : 9813857548
    })
    successful: number;
    
    @ApiProperty({
        type        : Number,
        description : 'stopped [input here api field description]',
        example     : 8676241270
    })
    stopped: number;
    
    @ApiProperty({
        type        : Number,
        description : 'unknown [input here api field description]',
        example     : 9239258781
    })
    unknown: number;
    
    @ApiProperty({
        type        : Number,
        description : 'unregistered [input here api field description]',
        example     : 6010607854
    })
    unregistered: number;
    
}
