import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '24af86f1-ca66-463e-9ec3-225a479de7b4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '85be8694-947e-4a9e-b932-5efd98d56480'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'p2cwp33dbu0x6uns8f3ikmf21o1sblpqpm78ch3mkmfljrxm72'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'kbzahk4enmcm139o0qh1'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '452508ad-9976-4bc0-9ae8-266fcf4f626c'
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
        example     : '2020-07-27 11:32:19'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 05:09:31'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-26 20:04:46'
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
        example     : '1o5brgwc259m9q2dcmwmp7g0kmcsovkpl4qx8xkumbdsh44b3d8dfe08wsfbdtxttqj2ce857dixt664qrqv7rr9ww95vh2io2xqltm3vu4yhblijvd2ufwb3ajukgu3u9s84w4pnlsmjfuld5f2qhfmo0nh33p03z81ulcs95yloy0zmgkyogka8qdd0z3k75l7wb7xtuopiwztdm9fo8jycgfv1wv3y1iaop7q3rwd4aosb3o7uqov7ffmc38'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 6467640231
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '40uhf1ahg559zd3whoyz5xd92ipyv5e5mujon9fzqij00armircdwjwl40vgiow0js704aa83zmtcfgsthi9jlgcl7f0bckw95xk2he732ubqfoj0vua4fypxowsv552mrkodefitdnnaomqi91l44betwryp68m'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'jmklqm9quo69erlkz0g4xpry8ih3fogsx0u536eitdywcusfg2jlmou8wcx384k3p16kbuw6j9hl46g6wi9tp5dq4scb4grn71v7ohey79n5g3hv6lajki3jsng3ht6lme896peizedwu837sm11qv4pn46zceo9ou6jxvmh2thnjezvvzwju6whlo433w8l0oxuajzz31kmaqhhdrr0qw1x2vsva6lxybidi8t83yw3io9jkipzyqbdlm8ooro'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-26 23:44:20'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-27 13:22:07'
    })
    endAt: string;
    
    
}
