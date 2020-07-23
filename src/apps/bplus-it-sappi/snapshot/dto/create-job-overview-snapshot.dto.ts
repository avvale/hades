import { ApiProperty } from '@nestjs/swagger';

export class CreateJobOverviewSnapshotDto 
{   
        @ApiProperty({
            type        : Number,
            description : 'cancelled [input here api field description]',
            example     : 6303684757
        })
        cancelled: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'completed [input here api field description]',
            example     : 6394614523
        })
        completed: number;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'error [input here api field description]',
            example     : 8340008599
        })
        error: number;
}
