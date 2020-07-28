import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '11e36733-928e-4ff3-99e2-523d69ae370f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c8ec4d98-010d-4b1e-941d-a7a86c30a653'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '3tzpwfwgk76q42p6z1kt5db4y0s2s29s5aw55fqwx7m1j85gky'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5dbbfb28-421f-4131-9f54-668dc4f9273d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'hyyvrzk36ux4q414rvuv'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'c30b8a03-f9ca-4346-944c-918dc83d6aef'
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
        example     : '2020-07-27 13:36:46'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 01:11:07'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 09:49:31'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'STOPPED',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'b9ac1ac4-324f-449c-8260-37cef826edbd'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'v9qtne4atjt7a9bvr1h78mvjymnirlg7x4b7bpk36ohi1figur'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'dz6phwoo055c9xn4wmav6os0ahiw5ntihykttk4719vu61dzp099qy0073gw52bi409ss5vx7039nlqm4s8fwvbrs4prt341dtukst7gkoszfz1euxik1fhx19sksmampnf87eymnn8g5gspogaporxlbkfmauzc'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'alcgf8ahk8r02kfmjserg5mrlijf0d7aphnpf9fxl8ryh3ecpakn0caiedqgbw9saah9jvuuft8ur4198yestn0hayimvl2978ma116fnqqkiamakliuhnqh1x9c1lcn6643kuh7he8fxqnsyznmkhms8e47nsic'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '7drijk2s2lnpttzdp2th5u74io1fp68inc0qzbu6w0qwdjtbakt526smeklp4dhdrfn2zppx9wk6prj3jgthbg943v7176fos2yqdgmw02yh6zdjqbcaf90e3b4h3fmla8yjnj2tyhz26up8lzeexrb4habeac2z'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Quaerat nihil est sint consectetur minus vel nesciunt. Ducimus nesciunt ex porro est ab illum distinctio velit eum. Eum delectus iste odit ipsa nesciunt eius omnis cumque commodi. Sit numquam itaque sit eligendi numquam nesciunt dolor minima. Est in nesciunt.'
    })
    detail: string;
    
    
}
