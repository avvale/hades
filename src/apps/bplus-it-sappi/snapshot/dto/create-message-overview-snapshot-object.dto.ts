import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageOverviewSnapshotObjectDto 
{
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 7013159521
    })
    numberMax: number;
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 1914448402
    })
    numberDays: number;
    
    @ApiProperty({
        type        : Number,
        description : 'success [input here api field description]',
        example     : 6480641544
    })
    success: number;
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 6199491218
    })
    cancelled: number;
    
    @ApiProperty({
        type        : Number,
        description : 'delivering [input here api field description]',
        example     : 9354324587
    })
    delivering: number;
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 6082074689
    })
    error: number;
    
    @ApiProperty({
        type        : Number,
        description : 'holding [input here api field description]',
        example     : 5225680849
    })
    holding: number;
    
    @ApiProperty({
        type        : Number,
        description : 'toBeDelivered [input here api field description]',
        example     : 6541725411
    })
    toBeDelivered: number;
    
    @ApiProperty({
        type        : Number,
        description : 'waiting [input here api field description]',
        example     : 1610654187
    })
    waiting: number;
}
