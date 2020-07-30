import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '502a5f46-8674-49ff-9c7c-9c608bc06786'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '33b3b361-a914-4658-bc9e-d141522a506b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'o13jpqjlcj9ctwu5omswnch2uytxl05rxyay41v68mjl42bwod'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'de86c386-6677-4382-b18f-7bedb33a7b09'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5jqr0623382dbl8il8bs'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '97409111-8a55-4be9-a414-e586b1b3b3c0'
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
        example     : '2020-07-29 15:17:39'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 02:17:47'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 02:51:57'
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
        example     : '2w41xwhexievvlsfu3w8ss8k7e77bssty3adgped'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '0u9u29u2wms1jw3jyaeeqhwe16m4kvmzs672v908v1detalvgx'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'sfmxz1a64g9a5gbz7515wz92mb2mbw6x02ey28zhjh1r5ogelrwqktxp9iulyac0qgi24w55bc0a33llh26fbwxucgp6v4juizk9ul5t0zd7ahdj1fnyf9pwtyekioxopymnzk9xovcixd21x239cje4js85vyn4'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'p3ain6urjs147vp5i9smre6lfdhuel5lfl2h2rtr78je98n3yq7ipuqjc6hmk38krl5dlim8xqe5s6sh27aku4yyx0rd3n2zbuiosmqs2f2do3p8yi53nc1ru7jthupezwjyzm5njlstclabpdhkuz2jeu367ty1'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'euheknpi4ahig3v5kzofy6sltnd2lo27fz2kzmz0ok1eymegh14qduza4deiu0o2nb3i7bu7qbj9kugm18r9ri5erticiqiimtp5u1f3d64y8mock9w8e4phzcg94we75vy2akib8kd0fdpsnwt40ypd1dy97ylk'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Eos omnis eum quo vel asperiores autem fuga qui quis. Recusandae cumque fugiat dignissimos minima dolores est ipsum rem a. Enim quia sunt placeat aut illo. Earum ea odit minima incidunt veniam laboriosam. Est asperiores dolorem. Itaque quis officia debitis voluptatem rerum.'
    })
    detail: string;
    
    
}
