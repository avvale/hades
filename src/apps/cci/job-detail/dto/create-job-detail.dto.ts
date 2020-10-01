import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fe808535-8dd1-4751-a2d7-bd73067fe444'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '1447cf6a-9d90-46c0-b445-e6540d5e9627'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'qo0t8037bfva4wamqw67dsdcozh13m59kgn31d2zo64m65xptu'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b9cee3e5-2d42-4934-829c-878f3060053d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '9ior1g2dzpt07gefsp37'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '9e2da0d4-31ae-4b7e-b3fe-f5075933a1eb'
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
        example     : '2020-09-20 16:25:50'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-09-20 08:09:33'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-09-20 02:43:06'
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
        example     : '1g0twgew1mqy6pz73kibenpcb6vmxkepqu1xo473a6y1l9bqswoxy00ogfecfdymuz2dpvxl81ublmjha4mrh1o5edl731e6yixnnmv07cyty1wipr5c87epd2v5z42h0463727k4if3det1cizx5tmdlcecsrtbzsafam2s8rwrwpldjrtggf65zgoixmzqr6knh66darohpl814r6vxhp1p22evyggibh3xv0copfkog6nkz0v9d3pswcaw7u'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 1522925295
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'sch2sybdbyxleixicxgsb2ojf6brgsx8yhygd6l7v0oow30x9f3t8pbxx1e7x4bfgta79wwig0j5bx7tcoyyepoappfhh9v6y7jxm11gnjx45mtbugmopmbiu1p2mllck9cmmep5jmnkvailnv6azo16qaz2vuih'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'v5con8zvepm5jn9m8o559z5v30ni8wjl3zmf9mdzrgb32msxoeqhhus0dc4gix361euhjjas7fql1uxmzpj9oafwjqnv47o6k72k3x3i6dm6mofnosscalnczqegbn2i4vm3voou1o9n4hnj3ch1917ir29r616j0k9was73luz77klryja6614yb7xi4gx5thkblro1vr4h8jzjvn3wl9637oqc66z25dw1qebixcy469i2eq303m588qha4ev'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-09-20 16:37:44'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-09-19 20:31:18'
    })
    endAt: string;
    
    
}
