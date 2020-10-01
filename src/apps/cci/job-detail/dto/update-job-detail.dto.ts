import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
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
        example     : 'lmm9xmqkvj0p2s11php057e2r5gwk07z87jj1whtbjibxix9bc'
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
        example     : '3p9juf3xpgbf2f0bd3ro'
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
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-09-20 01:52:17'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-09-20 10:51:39'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-09-20 14:04:26'
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
        example     : 'if3dggnzcfmttpryfci66eeppse7npxq273saw0qy2xrknyn05qehv979lp9bwyvmhss2uwg8oqaedaoz66pn641fl2yigltml94zpw6ilwq5dgka9fstzlz2jni63r2bq7rolmt3915h2aal33wtfr5qmsw4nr62w6nsfeq978maxf67xyia4hk4emmg3fohlz4l0i031sm2uyezjglfr0r38gsexd0yct8wmlllsp0n7ox1y48bgj055srllw'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 8262704944
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'iygcbcv8my45j2c1oirk2k8hme6poo6foszmh9nsfpaejra0i9byqabf48f3hqt012z8wkvmfwg28u83fs5h4cfkmhz7yzvke1o10u7xdtd85m28607o3vot50g37me5doq4vjhg6mk42ib5tqwyww22p19hj2nf'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'rhdkpuae7sidksgwzqcdvf68sz2hw1q0j11hfrn9tv9aa8z2ipfgwrfcplkv4fj2uocca70sroed84yfog02cnkvb6xa3riln1v0e1yjpbzlxrqk1g08ajll1u6mizwpk8a1npm9d8004vbejoct3e9up0r3fk1tocxqtksax97ip33wm040epd1rrinko29bijoet2nfyh2g4rc96ecr1rct1xfmu4m4jba4pbauq3xetyfq0l8nst75nho70b'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-09-20 08:38:11'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-09-19 23:53:21'
    })
    endAt: string;
    
    
}
