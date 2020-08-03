import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7d41aa45-7431-4e79-aadc-eb95aca1ea02'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a649482b-1ca5-45dc-99d1-8690b37f148b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '0obzk8kwoqyokmftxxxshaz1q4jki6nqr2afrx08q2ena4hwbs'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c54583b2-fec0-451f-a242-d0b420eb0e08'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'l04x93bgfvgplee9v0xe'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'd0d02e01-04a9-4e55-9204-79480e083c31'
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
        example     : '2020-08-03 06:53:28'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-03 02:02:53'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 12:12:58'
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
        example     : 's4wqh6mamtd5h3btw7u2hllvbwfsy3ssd1zoxbjyzaydxszf4nr2z9sm1jldvx4j4h1mt2t4lyilcyccvzmpurvteyo31bg4zz256yyou6s6iozqocqb4xzvjg8b9bbb0fy4t0moqb1gz0o6xim9clsirwk3lawi0sg0ay6bmmsni2jkeojvmxjyw193lksvufefkfzyq409k1eo8b30esg3194zuoqjq6jl6453p6qi9lmiu4nzz4rpo7w0pjh'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 6357325549
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'qh4rrbvyw1qpwxkt0m9nfytcvb6wr4ba9g33gebas1c1cjuw261n2cbh6h1g1jsot2uwh6mtt38tcjyt41uhepatmuo3kzjeu0ksz9udxoy11caj3i9bw3j7s4j3k9w9und5l3dsi4ji2dz4pkrmhe6srg4tcwu9'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'ml6b8jd2b61fj9zongwd69vw9y2gncoalgc0ixw2zfrlztayztoepla3m57lbat3jo3hl63ih5f9pucc5f8iph78ifmw3rnqpv05zfjle50teityu4z65rpuwr357e4ifymhiks0h737c9fbgw50tl2z0knwys9voco3a2q209grg11ev0yv6ie4ar8uelm6kpdf338eu9dlb93djixzrji690sqct8si7dim83zk1vqaqyxwy5z34113svkm6l'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-08-02 23:09:47'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-08-02 18:39:36'
    })
    endAt: string;
    
    
}
