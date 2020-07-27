import { ApiProperty } from '@nestjs/swagger';

export class CreateExecutionSnapshotDto 
{ 
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '1.0.0'
    })
    version: string;

    @ApiProperty({
        type        : String,
        description : 'type [input here api field description]',
        example     : 'SUMMARY'
    })
    type: string;
    
    @ApiProperty({
        type        : String,
        description : 'monitoringStartAt [input here api field description]',
        example     : '2020-07-17 10:51:32'
    })
    monitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'monitoringEndAt [input here api field description]',
        example     : '2020-07-17 06:08:00'
    })
    monitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executedAt [input here api field description]',
        example     : '2020-07-17 02:11:04'
    })
    executedAt: string;
    
}
