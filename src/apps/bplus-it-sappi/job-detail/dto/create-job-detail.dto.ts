import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4d4604ef-36ec-4231-8ea3-df91fc2646e0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fb3abe84-8b28-4426-bbdc-cc202aca33e0'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'losa5eoyrvr4eeo2b2u8f2sk3h5g745nzh5unkehxxa7uzo7lc'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '88c30783-e234-4aca-8d22-1508f0033aec'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'e3ltb84vce993et90aa2'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'cf4614ed-748a-4f8f-b59c-2091b234167d'
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
        example     : '2020-08-03 22:03:47'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-04 04:04:04'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-04 05:33:09'
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
        example     : '60qq0k7q473nukpeg6inotjwicmq1bz1gswv0nk50f9mk6ufi52qmjq3hlz7i60fgf5n8hb4tq3tlhakxxzwqo4g3ivjuur5ef52k0v8nllf7yqdq2lz25hurac09s4sykrgy7jwjenb9zu58h3fuoblvvtgx9b4w1egww1bzbtzskmoewhv6wtya0pryv5urk1rtb1bp4o31dsijjb51xwilbyoq47zrmq4w92y91a42uxetybgioqmg5h7vog'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 6176635845
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'z3dw818ab5wt1qgm8aeo79klgtnwdajum3m8adb7y6t7d6nsiwyek7o3hpf37og5hf6m83blq9yamoi46h1roogaq7aiw8kj9uymp6iaal864r6rpncg70r5ecfbye7phc3r1j7fg8b0685kim98yudnqpd3ktk3'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'aqen3m9wx7rcp9i6sfpizcnvm9y9nb06zqaa21qyotq41gpu97e7t4vdou7oiyrgfjlrpvpnv71p92oze3p3gzw0trlyee60o1d3v9jnr6jh5kcn2kavxt94lbjgk9udcqffjwbp9sw8kzx6i6e4h1x74lbcjb2lvjd5junr59j4qb5dukp66ngcfnh9tp8ny0uqvnhrxcyejp5xxoo8bu8vq80r599a6jktqrthr7cv8ew2toi17z74g69d386'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-08-04 06:07:54'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-08-04 03:45:15'
    })
    endAt: string;
    
    
}
