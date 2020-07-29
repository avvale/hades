import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '6axg9bjvunimrat4k214x9uau5lwrvogf4fcslsjycsj33spmc'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5e5a9aac-0829-4694-ac34-9b453b70cb58'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'f4khk79vybz9e1acsynz'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '82c807dd-f496-4b60-b7b2-46295ea32038'
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
        example     : '2020-07-29 11:37:04'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 16:59:09'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 14:17:34'
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
        example     : '9cful9bgd33s977ybt61q01o9twuauk3z7vpimh4vjmgiqse9c3vor2lps7ygwtka2heqjvrmy6wyq5lekmwd53930pl5lfuivfhey6fl13sgd2ay5kaamcplfbn4frbufoa94hposr2g2klikce5g9ccxqobrgtj62o0j258eqkgxymefxs6rwutfvffcwgek7ma3t4rh36vjer8xc38hfv6wr6sfi32crrgyywcpz4bm8h1h6i6kjty26nasq'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 7182410005
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'u4kvrp37ucnabc0gkhty49fyza7lxvvtlgr26cdjoi7abe07sck8rzjbq9do9c0m7cyucb39sf72varzj0z6aicn32dhekov4ijmv8xsrbh80ltwgtm83d7clcv90mcedbaz50macckk5jgko3l1q3ti7hiu6d3r'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '4itwbud00cdyq0n1c1ccezdoocvkitkkmntz910outnu2t6egklyz7uf8fyjdi1d1dmrdgdhxy2nn3btfa37trmx4py8vsvrkbp5fl8gcsfff3w95hs87e9fiwq8plz51o8wnbxyvaxfkl4w2eyql2dso8tby1iovn8tfrqy2ozdhw6kg3ksvzale82eomcft815ydhmhy9xus51ahqpr9xsqipui0nr3s4m3th5iqerycvgrnxqyblkpzcmc18'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-28 21:52:45'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-28 23:06:23'
    })
    endAt: string;
    
    
}
