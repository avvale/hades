import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a27ac773-ed3b-4f9f-8dff-685c65f983ec'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3af88c70-a54c-4562-990d-44ab464f5c5d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'adgumzwnyusqugj21dbgtc03ri4k2npgr16fyg1nj9o2at4jl3'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '0080f5b7-8930-47f7-8197-62402c76fdea'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'vab7hgpdkuo3uhh8mp03'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'ggsyccnzzipbk2udeye1ys0ubzfkmawc0wetyr8t1ngiw1gwsbphhm2sswdb'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'ff016f67-887c-4146-bd38-356134465749'
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
        example     : '2020-07-29 10:05:40'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 02:24:07'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 08:29:24'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'thh2kllbwl6mm9wg4iqzfpgiuh43b1c4hikrgq0z'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'rbt1t8o6wh30pr8naecvcsc9vrn72r8m14zk9p46yrva2okdfu1xmatoo99c8vcqlgsy8zdxmge838fju0jh15i4d9nl76910tsbrh0zt46gylgj70yy8q40k7l7whyugaa00wtunzfkuds7q42n2htdchwlmea4'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'mblbxahqsk6fq7oejoyq1jseuo8au3pjh1vhj6hp0f0xsia2lt31jv2bihkrn680zjq616m4af2kc7ojch4ay8ligqbapd6hbjd649i2mktz1aofbpb000v37c4f0n67stqv092qmx66u26c7tpe5jw3v98txkjr'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'o806tqxwg2quqbq6pq5pkdi5wsh6c3ntwoo2ahu361zmdywvhwk5bd6x6lw0cra5s0p0017xgtesojarnzk1kp17wxyyl5eze6ryv2sqgr5btbil1wgi3unpp9b718hufyabgdzu7ryrycy30meweeeyrrd0nxmg'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '6pdffrg736n8hix0rqyhg0rml0lszbw8gj9bntkqcvj3u7nmpaezmw7mw5os7ad54j0ipoievchd9uwgnmjtzqom4piav12iugf3pqoo6m2t4uteg2v8s12zlvyda4a2aojh9jdfp8u2k1ehelpf1ff3h6c1yxzk'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'HOLDING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Repellendus consequatur minima labore maxime iste ipsam ullam. Enim cumque sequi tempore sed. Similique et natus. Ad quia nulla. Modi modi temporibus odio aut quia voluptatum voluptas eius. Dolor est deserunt perferendis esse quo soluta.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'dewrpjw74zmm4dacg2iehxuytew2bnogxnfkm4c0j0yvfpeblmdekzdgc0loxkn1wwmc62n881zpe85c8x4emz0hei1im24p5c9w8kpi1bbl80m7b1dsb14ocaiqswqq3fxetcqsynxm8hg5a1p16turhclutru9'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-28 17:41:34'
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
        example     : 'q2sb838uljtzrfq0uhmzzttbyrj3igyyq2lyg95xi48zewa0v7hjaped6p6gzhrrz9j7731z8u4q5uk8vnjeereqt3wlgy8k6d74ynwsbkanl2bvgzmil7bwn803qwlwvne4osg2cjf7juppnjlojasaol1srfak'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'hwyvwsl9vbkptiug69dawx33u6kln6dy0xyjr64ckadpuav9pq'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 427898
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 7869381600
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '7leea9jdfjex2t67z0mg'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'yr16v0y1an15tizmyvd8'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '3epr0ltqsza0t050rwgn258xg7w92veard25u7lw1vyi1osu16cghcj09tj2hubi0egltrl7ntmqf6nv2c9s6bo72vryb53kc5ihsmuvnorbereigf2cxsgwzlzwc3riz2ndknwc4v5zmpg9cnfn623xce4niwxk'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'izercvyvvsxhuy7kki5fw7qzvr68a9htdtld7mxtxqge01w2mys0w58pprdebb26w4yaasvj0j01pvj71uef6npfxu50ihmohb5zz8k40oop8ozxernyelkhkatt4383pjzp4sdl4v87lt2us16q611nmeqarpgz'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '1z3srjvvbwgpxruulzpa699ehsshatml159rmrat0fs973o582ru3qlqxwvxsmjjh7xnvjy7cyy4ojnt03cuohv0lkp2dhj86i66kguj5b0b08unrx4s4vhj2adqqojw6s8mes8izafln1m8znwxrkwnmr5jadys'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '0im6a5585w46maihsblz3iiyn08mvdc6rryzwplf52k4dwnr3gnaag00n6ztutjjoywpoaexigdscjug9p8z3tkpenchxuvzewr348nm86dxbw2817sugapvqcttw5xf8crrc1u9v9m2qms1u5vtcwpkfpuubm55'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 9316150907
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 2181840361
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 4283107051
    })
    timesFailed: number;
    
    
}
