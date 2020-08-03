import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '50256894-b4a5-44f5-808a-cc75dec00e7b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '29q456ikipoqm3kovodouekk0ljjds0nk4hdpqp7txs375imao'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'pai87xd0ruiucw9djk86'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '143be2e1-e31b-4a87-8a70-5fe8ee6318da'
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
        example     : '2020-08-03 09:37:43'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-03 02:10:29'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-02 23:41:22'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'UNREGISTERED',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'uunryxtl8pywqx2yl68tw50yurzvp8muqhsqyh10'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'yqcwiuk8yu6o5a5ee81fcpb08jwr9tgc4vctzybf7shdsuw59m'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '0qu5n6p1o7b5y2axaln244pkemq7x35jwo4n0qt7qw6wacvp2zbqi7pvx4msv5g21wqchik14bf542ifbv2ycbbsv6eoyi0w6xb6qevft66eikku8ytqc7b7s3vnfmhk4mpf3ghqr3t6gstuuuyfcmogw32m70rk'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'fu1vbh9aqy8j3padxjktw4xh94r58j9601xyjn0idrnpq82e4iay8qa6mjvas0mkihhmmqbknayqch63xudmlkyocielq75esehwac1imr7ha44lpbjldhboivbjhp36zdlwdme252vamgyvk84sobbijgq5zbpb'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'mmb5zcjewb9ens75uyi40ufptxt0f56awtwtvts8g2ei1wmiwhqa81cygx1oa4t9rlc0gzqw0pkm7i8upgvpd7yzvqpyukqwov15bu39tx632nwr5u2umwp56iof5vpyjqw9rf5ychgpg15yxw9axy8r1s3imtf3'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Ut qui velit saepe totam ipsum sit voluptatem. Aspernatur consequatur esse magni. Molestiae odio illum itaque eligendi doloribus magni et. Nihil atque eos in sunt harum.'
    })
    detail: string;
    
    
}
