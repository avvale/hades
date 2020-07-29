import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cb42f3ad-6a02-424f-acff-4235af79f568'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '379b11ff-6d08-41ba-8e5d-e2ce9413b96b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'sbpwm80hlu6dghe3bhc8s4w55imq18zc0hl7r54mre7ot1jeem'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a00af397-acb8-4d11-8b6a-72d04eec80e8'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '8qwwg3j5upyaja5mlxb2'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'd445db73-8d9d-4c6b-9125-7f6f60e8267f'
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
        example     : '2020-07-29 18:19:56'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 04:10:21'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 02:05:13'
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
        example     : 'qoj8hgi3un1ma74s9lm38xoywl4o7aayqf0icj99j9ct0g9qarwlhhyxxz4vn6o9dp59n44pmvc0ys580erb9jyabp4lry9zg2tu9plgpa9vhqae67dmn91358myupz75hzfqznyxzvdpxwr3wlhw1mukup24urfife931guoilkzzc7lmxe0sh4ri8qkvg8tkyrz20hum4xz94rci7tx5ro1he081mq7q2sogbxgehb64zhth492qj2o37vcx5'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 5580863682
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'ybqtr8n6vdw8mfsrsp7l494mzk7oyzdjuw3sh6zdmyspf7w2wu2gxfkpf96jtmmcrsdvf099t9qfsa4vyqvstub7ooh3jdawue65hct0ja64aqgzrv1ut95horlv58iuo67ybf7obig6j9pwbycg47v37d6tpzip'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '9wjql40vb5p298mdknovhae3ttf1zdb4o8sor28dt26ista7p0zo4uljn2w4p74qy12f8po2xw8r5b8eryqq9r7dt5u4k67i9b2gc0jkks5hsnqwxp5nuvic2nle658v8uishn5m63sfyqb4mtp4p0jgt8v4kguj3s40n6xisnf193ger9hcuwvqki6m5lsjzkbjjpl5h9cmk4ok9v2fhfiaxndthfmk67p6uymhcw6w0vutkxnwvpqdo5ftqg3'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-29 06:12:02'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 04:10:28'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 02:22:19'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 04:12:56'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 21:19:09'
    })
    deletedAt: string;
    
    
}
