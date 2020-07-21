import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '5b766746-0377-422f-9532-537209df1406'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'f0dfcb1d-30b6-4adc-878c-b25b89bca551'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : '8yf91rznl2g4s4caqflb'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791'
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
            example     : '2020-07-21 21:24:18'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 14:40:13'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 22:39:06'
        })
        executionMonitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'status [input here api field description]',
            example     : 'UNKNOWN',
            enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
        })
        status: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'channelId [input here api field description]',
            example     : '86589264-60af-4ace-a380-4c2761014c43'
        })
        channelId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelParty [input here api field description]',
            example     : 's72za48mccv9kqn7ppc8mh80m3vv7ilejp3553c7nej7wnisaxmprqe51wk9tnltvgzit383p9ecggnonjtfoji9qkkap93qgw37btbf5gpvlnya48tkkws3nx0jj25q3af4st6vs9n6bdzvuhlplgu88u54cuf5'
        })
        channelParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelComponent [input here api field description]',
            example     : 'zh2xrnpzlyegb4heffsb9sliv3n5m7b0n0bf3jxys165oq2w8mtd4tq8zw4wn461oajvm9ytomiyz3ez7td7m8cmmkp1gqx9kyl26cijfessw0k0fyzmkhteqm6xknjvc061m24p24kpmbqfurg0yaf40lsnccn3'
        })
        channelComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelName [input here api field description]',
            example     : 'qvm6a6x0asbxcig9gsd6lhfmj4hjao01ec6nyc28wbhul23twu5tne29yf6iw3lqf2txlhngq06ghdcc3d9ptj7x4kgifhaaldjhb3cx2bf5h8duisf699yp96zbwmdysb0jfempiwf2g8qgq3g8742np0pm2ogu'
        })
        channelName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'detail [input here api field description]',
            example     : 'Dolores sed modi. Id cum maxime eos. Soluta quidem at labore voluptatem unde. Consequatur aspernatur illum ut corrupti tempore est. Assumenda in sit architecto voluptatem quidem quisquam ut rem reprehenderit.'
        })
        detail: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'example [input here api field description]',
            example     : 'fksbxtrr1f608a3sunvn0hcafy8wx7gszewpi4x2mdh8e6b1aezsbhvbskjchrweahxy5dcnvds017klgjrt43fq4xxrp0d3jg1r5vpoi9h7atjnq7fxshebzmoy0v9xhcgsv7qg1dtls7zpgqlmqifdofogkuvp'
        })
        example: string;
    
    
}
