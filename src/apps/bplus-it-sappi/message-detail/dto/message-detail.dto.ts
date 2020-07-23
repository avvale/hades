import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f81822f8-1b02-48c7-904a-5b6065e948da'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '68b6f949-4079-442b-b6a3-e1dee017c9e4'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '226o23u49ndac85lowuc7wb35tcnak045whs9rmy9riwohlzjf'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2eaed4f5-6368-4be0-8502-748a2eb4c853'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6rj8vxavr3qzqb2x14c0'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '9bctu3vvsb0pi4db6vmmdnvnh8v23ejctni43627n3rzjk2m906yarl5wft7'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '8fea31d0-e7fc-4b34-a633-2babb168114d'
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
        example     : '2020-07-23 17:23:24'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-23 16:36:25'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-23 01:25:38'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '9ffd3ec1-ad51-4e28-be31-d94d80a15728'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '91gga16rue17gn278nh3nh1p03fhiv36b7s6vjivhazwht1zc9oeggb7llla500xe64gizijb6zdf8374v1dauj5stami99oya7ob6hz4tpehlahidkii7trvgy4vkrbwkbm8cn27qdaagcgc7rhicm8rh0s7hh2'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ph5cpxp6vmxrozsc5gsz56lhcu1jvg4bvmrgs2nil51z7bl8lcgy6s8tr0mrl5nb48e2xt5rpr9g0ikysgo3jfi6y8sg2dpt75d94t20xl46ptiui74o9yicd1gvc8822tkrkho5lh89x1tenbmd4bb8mekcbfs2'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'xrgir0puc186n5engh1qt2xqqzyag2tb89yjd1f1wyuqkoentvqug00euqtc9cousvlnmoxeh3xt9jy4un9vv6wsu3c1pkx6qou9cc3xj9t93w2shhn4o1f73itoeq1u0x2ruf1hd157zckh2juaqz2beglqunjq'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'qkcbqaceystpxa1ryrjddaw1yf8fjrdawx5j9hvhcqh9dzqi1wr9rltpzk47k0sscb4g9i5es4mdww3iyowy8niwck2vbxq8fm0fxsudn295cr0s39g1hxtwhvwd4evlm1r6nx9rbac6pxfyej1k2y16j9vyollh'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'TO_BE_DELIVERED',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Adipisci est asperiores optio. Repudiandae dolor ut minus dolorem aut. Iste natus voluptas in natus recusandae. Et voluptatum voluptatum accusantium et nostrum eos quia sint id. Facilis at necessitatibus eveniet impedit sunt inventore repudiandae animi. Ipsum modi enim aliquam rem cumque repellat qui quisquam et.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'z89u2t6pcnqp66eqhz3rocekes0g3jrxk2utqwraotbu7yblg94brp4ujsgbh1eg07cbp1sibap3edesr4xtdlbov38x7xg3b9c6402urqilczz7vtroh1j4ej1hssyrrmhv1kpl7kxy3u268u98xnupotwjb1s6'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-23 14:16:47'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'OUTBOUND',
        enum        : ['INBOUND','OUTBOUND']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'vb6sdx1ugh0z266iwpryg3u6bn8dw7jnv3tgauj9x8fym3pii0e1gppkthq99munezi8zlxg886hpn8r5ci2cdqzadz6l5qasrqc0w5vylnlpude5ao1od35nfswizofmai6mwwcforwjwwov3r9rsh40npdtv6q'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '8spv6dokmmjducsw30da'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 810175
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 2038625703
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'scse84e2ipt828nvoi7i'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'm5nwczbeijc8zgm1dkjy'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 't5aciqdo9k6ftn4k3cnabfe6cb8v7i25up28dasv1mcu53v8e0ayltqeojj2mqef4gbvet4afyjvkywx7ef0kr4zvpde2nk6q6sr7efrs0u70p8mcmawu2chm84vi5rxdl7uwcq64yyogasjgz2w0plqtym5asop'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'gmc3oplxtv7kve0wntnjg3lg19vej5oxikexrrvlrq9wftazsesc096mtlj2b05f9jkwqmelr1qdu7a8bqs0x86zi9fqmfx8olndt5sq9ol9py5ld5cxjl6u4ai4eiqwggizeim0x4c91tlvomosnytd82wmearq'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'p6ojbih35y9xhhdmdoqgdoxpjseb52tropklzcfwdvfmp2ttesdnhvb67fjg2j7yueghutnbfv1cjjkx7o3sroew2zhilm7gnc69u5grra8w12gvk3jk7w4l5d1tgqctg94acc1u34gxcrgnb1u3g1m7u4i6q5ym'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 're10aq2vdijp945xof4yqsxxrr0k3okn18kiydwct2ecooazp85gc5tcf84tu3v3xq76sgzu9hmntv891rg4gebk3e8d2vitorfo6s7xmj4pk7y7w67x6mq5s0is5d6atv9ctyecr3auycasayfoyogt399wkwup'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 4981817229
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 8230587085
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 5181292188
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-22 18:45:47'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-23 07:07:57'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 17:23:13'
    })
    deletedAt: string;
    
    
}
