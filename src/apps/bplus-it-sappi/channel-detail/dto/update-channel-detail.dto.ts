import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e636b2a9-ee7d-497d-a883-416b32afc714'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ed0938ec-0d62-439e-86cb-794b0b61e2f2'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ef5krlfly2kcxz5t0ywnecdoke8ockadfbanilkn2m9x35qupk'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'dd23336f-d048-422d-a38c-4c41d9da6581'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'xjhjhs1a1ra29ihfe9h5'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '1d26e770-ca38-42fb-b0b9-6c173a189292'
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
        example     : '2020-07-24 15:28:35'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-23 19:14:38'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-24 16:18:47'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'SUCCESSFUL',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'a6dpi66ylloelbr4idjlxeznfk5wie9ppu176dw1kzj6wzbobt'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'f0k0kheqwhq0lntwt8qi6mq1fjvcwj7602j8qt08kkdtohudimjgdvepfps0cs5x2ta06rnf6p332kbjj1wez73dvmj3uuusfdzr9eok1i4w9fxq3bnrjofcmngjkqpx4fty2u9p0bq5hkg3t0c15me7f2hzg5uw'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'ahod0yw9kjkd4pkprormtqvthwwodn92ll8plb1pp2rf20kfjc1pyvobbxike1v7ld4jzav0e6htnp0olmbbz68vwulcmf3ebfqyo1ombqrrzi5141gum1jun6ivib26fg04zdanduz9gi7maysfpkun8vhr7sto'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'pvembmznmkn310wdbvqeq26dtsllmg82sh478638lz8kygrul5h4wwff7q0qbamw5xphppht53fpw6jl10vk379krefp1k9vbw3f14xcir3r5mheborzyw7bp9irh9t6vlm8ofh6plmzhefn18ogjp1ksjh3vw16'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Maiores vero aut aspernatur sapiente aut eligendi. Sint in minus unde nihil natus non dolor et. Est id consequatur quia.'
    })
    detail: string;
    
    
}
