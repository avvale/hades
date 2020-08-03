import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '744cd95d-2717-4c7a-b502-d6716e3180d6'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '392a71aa-3c08-405b-8595-17f6e43eff96'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ecou9tltxtinuzo0a3256e131fies1oobepslusvnj7bo4zupy'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1010a45e-2eb2-432b-9245-4efa085cf125'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'xp4jf532hhpxr0qbcslc'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'rp5kxnc0t5aoeo8fem8y4343lu0l4j9ixo83x4tohhg74tj1f88m58gz57zi'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '4a889ed0-086c-48bb-a605-a24f36815e81'
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
        example     : '2020-08-03 06:18:23'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-03 18:26:19'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 06:53:06'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '80pe0xssq54w31q4go3jgw1hw8pk4wjsifllxz7f'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '4dq5kai5qczcz0a326x2zjpo22deqoey0sy09jxgprdkpc2l51j2c67eecd7oyeh3q83ba963e21dlaivek8aawujw88ogespdn0yq19ru5v2x0vmsyue6c5thvgsgqpvoxlnaxyph4j420x57ti7hzlawq4hgoj'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'qa3q4gcertq5ha66qpvy0lw26blf938iowks3nfm0ig5sex21z1x8kkw5iw4wic499iczd2g1h01m7yeifne7p4zgoef0gsj2jjknlzx9muxqt1cinds10riahvt2ey9lzvee7e6r9plzuvvvif30bpvflkd6s43'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '7s1gbn9qqir5t2o404fkj2a7ogfuy0jnxspjuwsqeyoj61rsks7jaap1ozu4m1e0wehd8aui4051puyn3s18jr1wzlsesesdgo864kb69bvk11h0p0bvbqq7sy3acb38qmpgg0gjn2vsr1k9lmehktfqoh7c14hj'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'wqk2nhcmtgbw18wwwlbarlylqufzr5ptb9y3wehfjxljtqcfccui17d6ewmewjuv8anmwpboksrfyyfs848k3lm3e6wjprckzxybzjfxfaupcpvvy6coubfkv2o6vra8pklqk4m70epb7j96aj8bud4tkp09uvq8'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'WAITING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Fugiat soluta ipsa beatae quis velit. Commodi debitis ab. Voluptatem eos dolorem. A quo repellat esse. Pariatur tempore et ex accusamus ullam praesentium. Voluptas illo dolores ut enim dolor hic delectus numquam ut.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'eb0nbo5kuzcfbdbwtqoi7tof0kdzm9odsvn1d3hn5nru1m7iot4rkf8munfygxzl2xntm5rpvuvhnf37vksw64t77oeitdb30qpwjtkgq9ynxv19huh8r3ntx12i6aafbd3asahcxw18nk5x4vlgs57mjgqh8qti'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-08-02 23:19:53'
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
        example     : 'wa4tkqh5i9szaxarmep6z2bqbxga212mkz08mx13b4q42ikuztv2wl4cstdjvaoedhe634k5y9gijmbz6aa2p87m5v85ogww8sv5mmvx48k2gdp288eypzgectugqlbhshdrhg23i9m0ewww7ea66nqcsw7rfrdi'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '0zbdg2h5783dfv649i6p2j3kleuduguel1t7oegx5s19a7htuy'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 236971
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 9054317701
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'xxfdp3cqzwztvze3mj1m'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'afe3hc3b18u3yakojzjj'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '5axy34wzrrcjg1v7dsk0ojlbl57lbsv4ml8ef0dniq8ehea0y6d89i9jwtz3t1lmj8jf730myxmiu3d73k132mxj3ei0f6g8vqrrzf5bvei7229io3xxlitm6161ftzs0ldld0ngw4f9xyyhjilnbxhov7xjkws2'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '9i9juk9eagpjkdu4zsdzjk7vxzmevz3vt3kw1h4p4bl7ufr41urq8rn0qv68v817a7bez9wxsqkub1ha8bwgm3o53s47a1ujimhbzmtctraqvb7k6hktyy8nhpbtxr5ly98vmlr3almy4bqin4laueyqwgjcjx0t'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'gzxohaeczxu01xp6b4jzcvkn3gj1tedzna2h6whg6p1h62an1a0aftm9uw0sow3wwi6yb689ym8dp6nixlk476g7de4cyo66uczk5up4o9q5h3h4it639u3bkego0j94ppqi0zh35tz51qa79lsrftwoyxyriu7z'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'ru5z6scq90voizg8oe9v4guz1i8ec6wtwdez1hp70sypvu36cgfs520w5yoibcmtsmc1nvj6vvse0ttgpfs7i64pf5pizfq34stcsz3qrwdl1ewfldc5g3c4cdlt2ak4apu4sh2vfyyh6t9f0effy7yivf6kd4sd'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 8107186596
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 9814503610
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 3685188936
    })
    timesFailed: number;
    
    
}
