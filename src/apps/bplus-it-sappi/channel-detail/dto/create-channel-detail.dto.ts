import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a8a619c0-f32a-48f1-8b56-87821e187ac9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'db5bad96-c700-4aee-a85c-dfe278dc97f1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 's2d91srhhj4wghmxywo91pa6bt6sm6xm347ee5sn3j6gccby39'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '9daa226c-1e69-4364-859f-98f77ce408a0'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'uaameod2ctnrnulkqe82'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '3d9ed954-a7e6-4415-9558-c588f3a67d5f'
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
        example     : '2020-07-29 09:11:23'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 10:25:50'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 00:32:52'
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
        description : 'channelHash [input here api field description]',
        example     : 'a1rz4g7a5kcjuuow5o4z2c495e2lcecp2rtg7b3a'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'g2jca8tdv9zmrf7izuj42fm3z9mnk6hvobi7yditqz0nawds1b'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '96d5p58ghev2z9ilke7mia8dzme2fg4f06jnm5xwirt4eal36i78xz1xbqiky30j6ygypznylcv32jksofs1mushw7jiybier0j0194edh696xpc5wwqg69vx7eqhakwtq45voo9u1r4lf4jd3dm87t740i2pp8s'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'm456xq516hr92z78i1gnsloq51ucx4845etljskjc689nyzitr35gvx81cc8pvc8lmg8zpcd20oyqy7lxgjtlx9pcvoi4h19t4swxwb2xmtip4y0pd6tkbjz8fxmkm8eesazmf5h9gj2zv75toupv3u8mlebdkvi'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 's2lqo6ch1bjcqmvlmexoi72bhfe50twfye6ay738h7ldpilp2hyxd0byect6c1utjwtzsx5gebzbyjrg1x8w14br67qb1sqxuc4mr9o3s4tw7ikzcbyh8tc6pwu053o0o6bxbogi06kbxbdhs36mebld9xn8ma5b'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Sed qui aspernatur eum debitis sunt. Beatae est corporis in esse placeat quia adipisci. Aut vitae dolorem. Excepturi non ullam rerum nulla quibusdam. Illo nisi quod rerum provident tempora. Eius deleniti velit et vel voluptas voluptatum tempore odit perspiciatis.'
    })
    detail: string;
    
    
}
