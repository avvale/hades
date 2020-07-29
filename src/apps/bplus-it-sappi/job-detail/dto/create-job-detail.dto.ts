import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fbceb3a2-82ef-4d60-baae-34bd68feb493'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b3d2be37-3976-430d-a139-3fd79e8f6f14'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'e2m27ylqmeg9r21qm86ysqpqt6193jjks0x9eet6nfdc6otnmf'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a7fd06d3-5360-4bd9-853f-22751f93032a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'lkjyyrn6dxs1qbsf81fp'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '42fc27d2-6add-419b-bd64-16a446c49580'
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
        example     : '2020-07-28 22:15:11'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 05:59:11'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 07:03:18'
    })
    executionMonitoringEndAt: string;
    
    
    
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
        example     : 'vuu21ycamhisfbxizz070jryayku08tfcktvy8baet0da7o282t5ig930qlkyaqztzcg8ryeaqyq9h3eimmoaupn3ha5er8wt4hjx6duy3gyiwatk6jzzkpmbg0ftd9pqbiux4r34ub3bt3t08s8asjftobfr1fnp9f4lqgkx9nhd0f0p94oo6q0uyd3mmch56k570hiipwfu631vne3r28irbrs70p842qby24t30flp6cvn4lkux2n6fby1wl'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 7573654925
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '2yq2xvwgk54qui8kz51wrk0ln5w6ermt71vp0ln5782efq5cmqgt2j1ha9cw2xwqtywzdxukrxt6ymbuekj08jagi1tkqzob5n8hd3kyppd3gt1rknjfblzw1lp8911m93xebezwyx8w24mv1p6r91uyip2nv84x'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '33tnrgwvxlt0az4p15boey675jigyei7vga8k6qyaapg237x3ui62mqgdj9p052qln0fw1ef6jdwoslwrmz1sj7kdai9i4otvqnqem7oegj7m8j9zqmrp0oxg5y9x9t5965877t6odjx7t8j3tic7zz5jlgtlaolzv8sc8rgk7xf601li52mew0l5e52xagmqs2m4km1k6d6zg3o1xcomlfta9q8sazf0nrvbcpn8608v5jnpkvjxw4j69lzhiu'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-29 01:34:13'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 05:58:54'
    })
    endAt: string;
    
    
}
