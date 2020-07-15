import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '35c7033a-a9f1-4378-b2f6-31ac10190849',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'be1e4846-c166-4a63-b080-cdbb12d02b42',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '34d50977-a2a5-4f06-b2df-b3411f41a587',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'iei04is2cr0srmdjrsh0',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'bb68760a-bd5c-4ff9-b194-14faef31ade6',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-15 05:20:07',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-15 14:04:44',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-15 21:55:18',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '66b34d6c-887e-465b-a19c-8f850de1f93a',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'i7vsc11g04dnrbazm8rmvtepo0j75g7nfdpgaefx3qln91zuvw1y6zrl6k9vffumupw00qyzdjupkjjpupwcczw98r7n0pfoyycsw9oqg252s1g4grg3hq99l5h6a1xx2glmzjj4lqkivq2n0x0yr1dd4p7ke6py',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '88lh27scf8pjbc3haswgp4u9ya51pwksadrmnehpc95unsdgrz4j21krakp94o2imxwtr3qbfx9084yku0b7yjibg40ulcly3sc7mpmjc54m7epvxzzje7jytg6914il8ox7mtxh58ntof1pll05kckdaj8hy6b6',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'yo3gi533ery52mucqqqt40ja47n7rgck3zc5ohf010si1fqt0xrt09vwcafsgluhsawz9mtnlmybfu9jp1rue1lsmt1ps4lezy346xwbr7wvpb3ie81ywqm2k0oqhqq9mmxvygm19fzz5ayb6d5cjrqdxgaq5q7r',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Et neque sit totam velit eos et. At cum corporis quisquam hic quia. Debitis ea sed corporis facere architecto sit. Occaecati delectus veritatis. Quia qui ut est voluptatem.',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'r1nkylzh19pvy3syr89v0qpsb0ak0tzn98sfktlruly9vwyjsnik0tnrjbpc6hokih9hr8kroym4ufc8o897uudfcy1dvun0u4t70in1b08r28gjnn065i81csypzfg922xd885dpq2hmjdxbhqwpg26l0hfhk1z',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-15 08:38:04',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-15 15:29:45',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-15 16:26:24',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
