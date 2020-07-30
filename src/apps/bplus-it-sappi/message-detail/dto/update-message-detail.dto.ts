import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8a09ed00-b5a1-4b6b-bde8-24a33db85b35'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b526d247-1650-4b81-b503-12d4fc3b323c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '5nzuu9eqepngh0ldobsgrxc6oizpxnktxspxm8e1cxw49xx7v1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5383beef-9793-4b37-8b36-a0d1e4f1bedb'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 've611gtqj5ptybn2cyju'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'p0o4dip6i3ffozllqjeineanhicuwlozl2jca0xedoan6ra0m0a88lzyh3cj'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '8b3851f0-069b-490d-abe9-e46bc46c3dc1'
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
        example     : '2020-07-29 23:59:51'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 15:41:21'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 19:03:22'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '668mdrsggzq96035p7ksfl4in7t7c7ctlvsgcvt9'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'n8jfbgndojsdp80b6wvibtueq2mto56djby9ahievt93zlyqh1t6vzu37o5ftgz994kd0djiydixz9ktbxav0yzursngdus95iunn5a0eg3cm445rzxleqynjpjd4ltqz5w04ol5tvka1vdut7hpmwhqemxzhvt0'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'h29dzofkud01d1jtr3v3nl8jvcfs1oxk0aoverxchn7emvcyt54yet207p6v83bh2opaqrfouaaeargx7a99atsqxm5jot1o87j8ga73fygf23rh8079uligds8a3w6rg8y3fr0jrres7g2i1k1k0wd0bpg692ev'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '6vo31vcdrqap2n7ton9yecffjy5cedw1neg90skyn2swz6oa2i1iwd6e9jdhduigwa91y1i02x2swp5lf6fe2l2bjs5mu81hdpyiwycois7meva04gd23q8mskb65iflf52kjvm5ib9lxajv0wbyd1cbm1zorzk6'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'dfwk4kxu5wzgnws6qg35ajd6ywq7e19phmr70pofq6v4sie0s3vkszl8pirryc4ksmox62h8fe6wdu3ly2pq0ei29no1ob68yxfhyz8dkfncxtb8csgqdrxxkshtz901mqmm6xej6q7455ychbevil03u5tsr6c4'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'SUCCESS',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Sit ducimus laudantium illum omnis voluptatem consequatur necessitatibus sunt. Officia exercitationem perferendis perferendis ullam. Quia nihil occaecati itaque alias explicabo blanditiis et repellat et. Ut voluptate ab qui voluptate saepe. Magni non quod magni non.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '0v6o8wvgny5u5hg1l0kruc5ibo393fzo711o4mg1l5zdvi9w88pcuvh2h4n90lfm4jy9cz79rhlquij82f0rigwvqxhkvn3dcpjx4j7gmu47xofpc91zdcy3h9im28b51allo5666fap87qfidd6hy4wal8lb34t'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-29 19:24:15'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'INBOUND',
        enum        : ['INBOUND','OUTBOUND']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'g4fy4iurq7p975sk568dxzltdces2rufqi1amlwplu344grcpsykmvtbj2al9lqs2zrz1rhrosk3qt7y4eetw06yboeeyp4z0vzsmbezz61wdwa50hukveh2z0p06yz848p9ez3pb9qrrtwbip712wqa2cpqpbh9'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '55u9qil10hnbzc3ux2zqzruztxn0a8ca2joyigfe6pb765ed7h'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 918991
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 7883704416
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '2feshutcovzjrc9s8xve'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'imxvwxh633yo288q2cj1'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'p1iedrhh3grlqbfq0ckg43ahbjzxbqamq86fozt8oi6dtlb1nvhu9csp7s3wguzqjl23k8dviqizu8vcirh98q69kn2ys90vzge3l48qdpe2pqhurjjy60c4ieo95o9psa28idi1i5nqd3s1t6z0bn56kk8606rh'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'kedkhuduofyafbsmm1opup0ukgjvb3mbd4ba80lo4qqd0kf7g2dfqduiw14z54na1s6ng6cth6co0v65vx73re342ki4n67afadisrongu32681l3pvlxeuzlgeipvzhg0t7osm5pdh79898r0kfodud07x98ola'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'wl6mw570qgl68u4o5hexcd2iq1gnln87x0oyytj512snfhjtgbdmi00153nry58i5z7a0qhfh4yynl4ozojwlb8cmxmz11075emk8akn4v390qqlblscpdskjxem1qviluqzkyr9z4348cwywntc4ib90pt7j743'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '4pig5ja8sqhv14xh5it9ll5x7fefkplg4cq62r20r8ns1jl3bwtbvb0c3fjdqvwusul96lqtv80hlot7xyckckl456u5hlob4impvtz44lusutojvefkfhukbrmyf42j20lhfra0ga7hyytxjj974zkm5cqg84gh'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 7195174986
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 8157834945
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 1439967535
    })
    timesFailed: number;
    
    
}
