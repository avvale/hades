import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '820ecb20-b97a-433b-a4d8-35a4a3df7e14'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'mwl80qkddj0g4waq5olvrqsn5rmaq7ugtrreqmc0e3pruq8yxx'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '0bc27a1c-220f-43de-a154-c67655924e86'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'w9u96yepew6umj4hjdr2'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '5c630944-af1e-4115-9a84-9b3e04feea1b'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-29 15:36:01'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 15:55:17'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 02:21:52'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'r6ptcm8f2hcckd9dziorv7jomn24qd5qn3b5izetanzu1mwz91t6gdk8st4qz2uribkmaugsvcb4zvro98nufv01a8i6ytoqu0cbyzpjucdtlciw0c17atidelp5fkl5bo0m9bqmkc0vbmmrek7stnln0aj82crl075385xafqj5kdraob70i2dxfgsostbsuaoml7tdz76lr8xdakhxtj7mpkbaoovg4tfcwyyxgaa0oumemvvc0c3bgrbfana'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 2484256341
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '8lobca8lbpdie6lfm6b066ewa1iie2mi8zqfpcuhaagffcrys7lmo7mth0zx1p6iwc0rkkab33y9wvf8sorit5orwfiemtw7lw0nq21gzzjnfy2llp4azxabzzk8zlaasntnwt99xlep3g4ljw43mhttavpphlko'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'm8id0ho6g2tu4s5lzzouuvd039hfy43cx7cewcrsuw6ceclqh8321galvb1us1zc30pjptwdsbkv1bklkazpjb0dz1r5k9vx6clc3yzsduazmbfh4n23k8vlvfdcsbzps72b3p1jek33j1pttvevuf7ry2kb7vw82ccly0q19j5fgv657i16urpnh54wvla8ewb41sbe9znr5f9v85hkrfxtbd2j7sclxipj1v8dvfilq63vr0n05d3y9vvjh45'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-29 21:10:35'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 19:37:53'
    })
    endAt: string;
    
    
}
