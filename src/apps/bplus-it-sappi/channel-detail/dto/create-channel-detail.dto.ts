import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '30f5a7e9-171d-4304-93a7-17f61f8f5370'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'b0tr76gw3sz7qzrln3jeburqh1y1evgxx7ce0mficimr7oao4b'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4bf38c59-048d-459c-aaae-c5851480e77e'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'xj9y412c8j4nsiif9bu2'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '5ddc25c1-3dce-4b49-86af-c940712436d0'
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
        example     : '2020-07-28 20:17:59'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 17:27:08'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 14:57:48'
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
        description : 'channelHash [input here api field description]',
        example     : 'cnhqq2ucoiesamky5491prcfte557su0qxg947cq'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'rpxohv0l0scs7ml3h5luvx1ce8gbc262osskq46qfb14kzu1xm'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'mbfyjmjrtm84q7cn99c1ucg5ff1ju7l2d2x06gmhiqgkuk4tminj2h3r2u9ee1x11w3dfasm4vfjqcz5e4lqz6l9x3n1kgzqgnh13v79uptd5e5eiizisipnzvmrhckgm1pvwzcpiefbf9kewhtblrhv7qimsjzk'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '89b1oc3bziktjm3qlofhe7hzdgztd6pu0m3za36gah9b8zcpwxu9v8n70ijb1ryv6ookeptuh7suyi6ijtj1q87ls1xy4r4fi8w69kzc69f5y078gp7roptbihenjblg3li98mqb4witf239ihch7dui5qhy4w4m'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '1756z8x68tol2wi4ityyb2csmi6q6xtxvq316rt43sjhyeemf373nh0pvzdbnaxl2pr7ekjvrcu8q1n5z84rcz106mxtkaudd7b7jggar79lfr5073occ8lkkgt93u9l52u1qipmdflk590mmj8sj1bov470vjf5'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Beatae aspernatur autem et quaerat repudiandae similique voluptatem suscipit iste. Facilis expedita illum. Et sapiente aspernatur voluptas aut tempora distinctio aut repudiandae iure. Eligendi delectus occaecati modi.'
    })
    detail: string;
    
    
}
