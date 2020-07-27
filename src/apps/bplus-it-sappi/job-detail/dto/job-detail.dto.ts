import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ef0326c1-65d3-4515-a38d-627a6bfec5cd'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '76klzh1ejksoljpye63tgl7dbjos1u49do0ewt59gk1a2oyrqj'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '666ce5a8-7b9a-4d53-ad66-ed1e4c464391'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5q7uqgwiq3xxtzd6o14o'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'a8d0b3de-9107-424c-926a-deb2e2399796'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-27 09:15:08'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 00:07:30'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 11:04:21'
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
        example     : 'mzw7miyf0n945kudgrr1jgqm1esmj8hchgk52u6mhd7fa10w0akhzorzmpbi8khsoni8dfsnj2j6ausvxzv55etw3b98404arxlvhbq13x4721o775qkas13kma8na59ewa8cg3vveqrwpxyitjttfsszgsr80vp15m5vlujlk72sqfbi12eiz5cs85g5n55hg48ummd701inz35ztzwxvykcfhmyo9y4c4e9s4yqecikrmkeqspdn5jxi3mdrk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 6322030875
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'hxhyhzjf5rw9k9sajt9a29o0ggfp2yzqnnwbec17e028vbu2wyuuuc80z7qqbu1mlzgpwtfueua9h48ku6ogf3emuwk8i6v7wgkidaiwetw3952o5y9c49oodlr5uv2ckgxvmg3fovlmp0yrqxijr4j9gvk81wdk'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'd9cn06zyb4l8yqsvczq2d9jzohubfaym0sgekxlrywcuudz464g7mmce5c07qotqqy026kzv0frnzk1dq82h0xb70yuusu04x1x4zor865x5fwnxzjf90gi3ywgubdn8egp0x2an8y4xqf9knvcdhediwwrxan7oeuhpsb541i2dns0yfltnq93hkktca8c7oxyh2rzgkhd96z15lf1fq8881riy85uw65d18ajt129mkdorrd46xwfht3gv20y'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-26 21:25:03'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-27 06:32:46'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 12:20:30'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 13:07:55'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 07:40:25'
    })
    deletedAt: string;
    
    
}
