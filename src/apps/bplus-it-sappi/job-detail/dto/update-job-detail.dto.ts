import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
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
        example     : 'tbyybmectrhsh1d83tpdw83grrtzowos7aaqijttyquf2ng0kh'
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
        example     : 'rom85gfq6ns3l8yvvxct'
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
        example     : '2020-07-29 19:37:29'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 09:16:12'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 13:32:07'
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
        example     : '8tv7yq4qqfb4vx6px2nh1zyo2mo54swaf3c9o9x29egevsx62et91w0x1p1i9d1o7i9ju4stnx7f2r1wl4pq35r2ytn5l0zued1bo3w3yg8rlphqahmkug1hcz9ky5mskktxjmv0sqmt0m78s2rdgn60xgpxyp6wdfqbns6n0g13gh9kop18gsmbglvnwe5u5bbnrkvh9v9aopdqhntwioeuopl79p8crvx39rghuetdvintjozxxkhq00ebip0'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 4244921748
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '021wotp3bvuqjhp1zcavwwc9eoze2mw7k9dkig6se326dxoo2lxj203zsp5djpcm6kj731s7j8kuek41xg6jrukp95p1bt9vfruottkc1k20m6adopcsd5p2eqhyz12qqd5jsh7d4zmyhcmr6meyk02cgz95wqw2'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'zyzs196l22q35l3jk9nndrcbmerzswzah05ewlcpgs7wsvj3hzvmajomc6mynqcs2j46p6f836l2b2erg39ayjf8pjnznhde2imzz6r0sznsx20ta260a7cxy32smb76dzacf02f784kgv0dmzaosucpx50lds1m5ah42vi8g0vlvaq97s0winpmp3ilzfrl4keid7l7kyzsa3lwh7jxqqo9vp12zvqhqyylvpcrdv7o9l8juib6nkrd16f5ozi'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-29 02:49:17'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 05:18:19'
    })
    endAt: string;
    
    
}
