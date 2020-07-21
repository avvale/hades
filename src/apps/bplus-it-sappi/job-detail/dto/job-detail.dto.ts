import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '59563238-3020-4aac-957b-1e8e91805f46'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c05f19c8-3590-4d2f-a384-427e73afcd57'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'fgb9yx3lp6iwumvm6o9d'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d'
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
        example     : '2020-07-21 20:50:09'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-21 12:55:26'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-21 06:44:14'
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
        example     : 'i3h1pvjh405lrxw0y78setx80zcr6f6jsg2p2mh0p1f8i5dx2ohq06i4lizdv0o1b2wguuojv8wqvkjc2tlj4mgk8ogjd0k14bt7pofsecsceg5wmnn07jsdxlqt5034qcgx0u2ook6qkwjmrrkw4knlpx6ufa05ff9xvdgjogv2ggv9sry2qcokoxv45es8bx5ueyat4e7z2e61xtg891p6r9v3vg4xta8ltcbo2n7yjwpdvp0hqixqc1ru1yx'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 3561684819
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'xwamd697aya1xwpcuqbkuuybu7o2w7qvtjcfuu2rdesbblkj423ac6jh9q1z38pb7zvvrsl2oz96vnspl5d4hjtz9ambovsahi0b3m78m2becytwu2rxq19ii7g7ysenfgxbh2acp1n9ejnp3uq6u5j1k37lp1w6'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'j92j1bygf3ioiz6nekkv2sgj78g0o5t9mn4bc7dc5os62mw15u2oma36ch63s2seg4dhm7zvgrmwkh5ewy0bp1ah336i1vmd43ugrd6gaingh8me4ytvfu5gw0qslpkglc4yp39hli5s1kgp29au3igtqzgvb2mrkbi0eh2v76r6u7bd4hen8is4nme73az32kl99fjj6k3khtvvyrrd8ohgwy8gmwnbk5jtzmsoncwwd7jdt8u63t9k9b981ii'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 14:30:36'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 05:58:42'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 11:44:49'
    })
    deletedAt: string;
    
    
}
