import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2412f3ed-d085-4c94-b97e-35a7b50cc6d4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '81611d4d-e85b-4ae3-9405-fab0b18c73f5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ffe1m5z1mtojwyafe3c2iij4ppns61tnz4b5urjd9njibm5mgo'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '648cfca8-ad0f-4226-8784-294418508a88'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'f96yk6r5ppfh0pevr20i'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '104e97fd-31e6-4673-9382-1b374502a2ed'
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
        example     : '2020-07-29 05:30:29'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 12:20:02'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 02:08:16'
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
        example     : 'k5p5k09cby5o7ry3dc0sg3t43g0b0dluss5ox25rz828px2g9fhcdv2daclpebwewya6let9l7p0hjuhaqbuzz5s3hum4g82udho15pno6gy2a5txnd1epg1ilxonevpwebucm34zw3jzunwcc9vu1lmmcfii0w9gwl6ia0w2gt15v05bmu8ebw0cgc7t5wqkfxgpkv0kefowhf3hcysmogj5rqnyi4waz84s69hbcj8gylpw2dj27bphynd4do'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 7791628301
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '6tg79ohbox5577t8v2ut7n2wlupyv5xm84c6n70jx44yrkdxcpoc8cattp4tsp9yqyxidzffpaeevanmov7o5i4c9j3snj8pgzuz02zh8m6x6jpkxatjw7sd7w8dpvqq3owx1jq9n0jmcmwamqwz6f3hyul6umbn'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '9m0lzoozhqto0h5cbhxhmtwcay0lsyg9nr63sa62dfptp8qzlrm6ajdvipzk8g6ajbya4lsdacrnf56wbo1cgzep7evt2dz88sae2x3ntrs3h456bzcc9unsacupsetylu5a8os5mzpovqqw64rrlyg3rb45ne952udf3jl6ak83hpcyfiunbo9ktbcqmgtmkzf3rad2l7rl4yxyahvnbqh9tquhnqqni7aqlyz3z8cm6bpshnnqjjy8zj75g15'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-28 18:55:32'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 02:46:27'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 00:29:03'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 18:57:08'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 15:55:24'
    })
    deletedAt: string;
    
    
}
