import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4d3aa02f-09dc-445e-914b-8f762921b63e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'xp57vpbbxl4jthnpgr75vat1ndezmm3vprykhxk0fx685umb7q'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd1044a1b-7fdc-47ea-9065-8f232f9f8240'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'eftkd72p647mpmhirmu6'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '55bb5b6d-7c55-41b5-9f8d-0a4b84685596'
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
        example     : '2020-07-27 03:44:47'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 07:29:43'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 19:02:43'
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
        example     : 'zhjdi772cp69qabjixyjhjfnnzqlupem4trkc9rczybsw07ygzs4cw8rttduo66sig2mi9uwn71vum5ihhu03cti66qpqe56lvkgxsftc4yzlm3m1lxgg9yf1z5vacm93uem3lgnyinh7q1cyihzwavj9qb426j5xrvljwjb3oiliry8v0vh3omn349zgk0129eap01h0p0rxi4hj9e8gxnex5sq1boqux62211lzqcv8ikeiholmdixftc8pet'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 9599168402
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'tr5xu1rt9uofdo82aqtak5q3928iz7qoiueugc7hr9w2btc8bnvk17jij5otx1wc87xfe0u9vb0toz70fauqdxlc3sx1or0h2yhxccyqal3epzja35mudkrmut6mtmk7v9qxplkdi9noe9ivn2dnib228onz2flz'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'ei3p9vg6sdkumibdaygypfbofyz940gpcgwl3q974k94vk2jjozoxhpncfzr9mjd41c8382i8vg3nrmz48edwjn4blc1csb3y7dt01err3v74heeclm9qgk5oet3ybawfcgcyhrw456ge4oymc6l7sfa2o6a2kfiy2tcdmguox6y7ok46b77s51fic2goyqsfsmf1lums986isbkyiszcsbwwb4zck7umqwd7iwy5ay5ptgzska5e0ygx7esfr2'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-27 21:08:07'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-27 22:28:59'
    })
    endAt: string;
    
    
}
