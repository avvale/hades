import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
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
        example     : '184pakss6ntd21s29whiis0f2q7aai63vvez4y5w7panm867kb'
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
        example     : '15b28fj87cevttaip8eu'
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
        example     : '2020-07-26 23:55:19'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-26 18:30:45'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 00:15:46'
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
        example     : 'w6mdsl4s8dcuwl3mdod6eeq6pvxy418mo5g8h6bvsgp0q1vbovwdt2mrvy19byaw590ult1xw40hrshhoqh3prwtm4e0itcb1fl8p411t2q4883rak587xem7c1fce3x1bhnh27l986i20otn8kscndk0u4mry2r4q33d949w3fy7m4yjo8azglahn1livqgwy1uyir50icufmqyl82qnl22xwggttr0ezgh1ewp2dgp9mb2lwmrw07jim2iuai'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 2648651810
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '6wtsfy04pnwkkxfdvgyd92ejg7wwvsybbk0kncsn08u8itq0gro8739qcbwmje3vjy73u92985xin8fvlzmyfc56ncxr7g0c53hcze85kjnjcoapv7p2h6hxcm79056yxynuogino7e8ywjs2qfw0tkhksqprq27'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'p7cmqkbwqoqz63bssxu522acgy1oxwikh20lube4hf8ovz0e85rlxrrr4rewtnzdljvmywahbh93692jxht2z63a62et5uq68vnjwxwcevnkkw8mxkkofyf6bmcoo9rft9q7bg39xxdqflu5dhgn814ky8xkw54kgjw950kdkvd0m0bm6r81ap60mvpciqhrb0j4tjr2bflsttss6zy6fgci4w107fsit09nlc4k1megu04ntkhmbilgen5apqn'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-27 11:29:46'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-27 16:04:05'
    })
    endAt: string;
    
    
}
