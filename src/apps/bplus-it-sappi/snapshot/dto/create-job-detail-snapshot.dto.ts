import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailSnapshotDto 
{   
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'BPMMailReaderJob'
    })
    name: string;
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 2029462869
    })
    returnCode: number;
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'Server 00 00_18111'
    })
    node: string;
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '...'
    })
    user: string;

    @ApiProperty({
        type        : String,
        description : 'Timestamp when job start',
        example     : '2020-07-22 19:31:22'
    })
    startAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'Timestamp when job end',
        example     : '2020-07-23 10:25:59'
    })
    endAt: string;
}
