import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '63e94615-5741-48f8-8632-fb55e367792f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'hto9wvvvalx1q3n6vfui85p1uqbe0jw5w3ldqtlrf4qrcqwwlc'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '7mt4xolfhh4tjiimvtcl'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783'
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
        example     : '2020-07-30 17:03:06'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-31 04:50:02'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-31 00:19:31'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'COMPLETED',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'lmbb64ukzice4un7prqoxgzx6jltyn06t9pacdmehxh9t1c6ddfag0kcywsd177wrcckb1uxywqebat447a4zk62drw6ytlaeigrttentz6evt4sgef03pj79un3tnzsv1urndvtfu7tqc4b6u3frzpnyrkbg9rehwuf4aeuqwzdvl9zmjggexeo5yybfjz3ryfw8et2855vf5adhc671yxl67ou0g8vlkjxg0jsfmp6pidwd4347xdt4flhgvg'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 8948066814
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'kickemb71d8g287moqy8dwd52zinir8pwq7ngupxiepk7cfsbowemzbjwlgm40q1nonp2kx28wf7m7bp0eyawsgnkurkr9kj1xtqpnmo2las1hfn2jvk8y6cis0tu6zyumv2yj6lj3q6jofp9d3en7phqrvzixza'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '8akpekholcp6mrp9669r941ilx9wmha0zdfx5et6mah68rln4xzf8k5dh55uxaavydyaqyfd756e5456a5g47nyl9c73n80qlady6rh3tm9fu2osa0znhf316awg3s7i6isx0jpmzy8tt7ss20lohb7z0ko4rxtboyolhw4gxtirtiz5pnm7offwb83eod5fuk8s3eritcxwntckqus82g52v89g9nzj5177nnismxy0wfdkndi69d1wnc0iwus'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-31 05:34:05'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-31 03:07:38'
    })
    endAt: string;
    
    
}
