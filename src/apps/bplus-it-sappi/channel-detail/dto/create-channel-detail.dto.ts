import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '436f18ff-0a01-4f81-84cc-50bc62254e61'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3417d5ec-1f10-477a-87fb-f7d0fa0562a3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'iholw9mhd33myp4owc9y8wbpdamlne84fzj5u8n6lmkg0crj8h'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '74e7e1cf-88f4-425d-8795-33103ff20f73'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ajxr6a7qbojuwlsspdff'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '5ecca706-d8e1-4495-b131-c36f7cc3cfab'
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
        example     : '2020-07-27 07:24:58'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 02:27:52'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 10:08:49'
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
        example     : 'b1050b31-ad63-421c-ab5e-174a0084d9d9'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '19v9pxmt8jula0ovv2eys8z7sc3l4uu37sx629e1ace2k7c840'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '2wyp2g3swzinrobgasnnfb5a3l6c7m1ffdhpisp71wmi5in73l9ffsm0fuops4nr2qnyiguzixwj4p0db3m33blp4dhryartcpnc2r7wnuxew36gpyuwtrd6rzhg2rtui60ll7c9g8z1o9ih1qz1nkt01vpgxdri'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '8c69emr25bywin1cawwxgx6ks47px47ocj53g32fdz7kxc65rd6bbvjr54jo6c8su9gd14k2mkcx5x8w6sma354r671gryyicqdp54sox15vicf3aoxjtdb6p3hb8v7go2lptpdaph0hkcwgg5j2opuxpu7d2oa7'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '0tgz5f34fi5lfkte74qqni975ayijd2santgr6qv9qjpu6b3dgtp18i3hvlvcn1pm6rzdq0rn7y62snp3mrzjr4u1wl8on1skadr1tu21vcb2ltj411sifb83a4uyjxnbhedm36x6r1b05nxbzp6d09bbsiavr5g'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Quia sed rem non pariatur corrupti aut expedita in omnis. Numquam numquam dolorem sint soluta numquam voluptatem cupiditate veritatis debitis. Quia voluptas ut voluptatum porro voluptatum sed repellat architecto vero. Corrupti cum necessitatibus aut illum sequi.'
    })
    detail: string;
    
    
}
