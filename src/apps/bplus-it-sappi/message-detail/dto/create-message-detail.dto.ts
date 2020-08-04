import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '06285d2d-62df-428b-857d-f52c1510d28d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0b9307a6-02de-466b-a2f9-f5b805430e80'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'gxphfi224pj5bq3fexbc0unqk7llp3tulyeofrdccze2bbekgm'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7fc3a9c6-e88a-4bf2-a6e0-25ac8e5e1dd0'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '0kt37xfrbydr775u3ln0'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'dd7t7otpmql11uafa29zm04fiigj2p8eiihbr5klpjl73zyn6c8rmmwhcq69'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '007725de-94ce-425a-b101-485f94f9dd59'
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
        example     : '2020-08-04 03:42:29'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-04 04:08:45'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 18:59:35'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '9jamzk1vxadjg5dq8s53lwei1bo0t2xze5sinrj3'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'euuwkfma94g4jipvv1ff5ix4a2yk0i812bavwmzkrlo9fhghru2hp7vhk5hb9x2hfgkyjix1ek2hl0cpl3wsh60kf1z0mhe2x3m8h18yri9e1wqd2qn7052m6u30m5aj9atavj3qf7v23vmizy1y2uvwmyn492kw'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'rxxp07tf7bwkpot2wknl5a8kwqkc9k76chvb6bccnbtp8r0dnfxohkbpcz4pfny1rh6ubcvxkhh0ir1nlkbllzzhtsgnlh2se6b6ec42wi51pc3vqeagj3gdmla2wg9kj4r9e5dgxu04afztd3611l0rlqbewrlg'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'nxjqelgcdn5gj2exlzbw3tmhu7gr0qept9carq53fdxkzwzuq2wv2ekpg53ebxhxjw2gt22edryuez20gua7gkmdvwsryhw95wk2onp0t826pyz93dvqdpv9afzlpcusb38t406o5fgw9hu558vjkcayh9lh4r1w'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'qj8ll5z2t8ffd3lwon1lhw5txi10lix0sexg9469tay2vv8zwi1p6ip7gsumigh18id3s9e00tdq1fhkj0v1uyt6f0954413jd0y6unk6qbnbopot7kf5qvhijn9ir87wdvj4j4r93u94yion3mrgl8epzdihh0y'
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
        example     : 'Est commodi placeat sunt sed autem. Vel et ratione. A odio eum voluptatem et corrupti eius quis. Nam et cum magnam. Nemo consequatur facilis ut qui quo a. In nihil magnam ut tempora.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '76a8ahp2bbmjtgc28gpm81tlahfr8z8z05wmdjn7l9as64jrxokpmnd10b1kj4ho2c8v1qlhd5ofwmt9qo90v6xrwlaw6r58niwlao5jg4ryi8yt5w2f1tfkfcfxhqi01egck63urht2xyhuchhf1kdukgo8k29b'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-08-04 08:23:09'
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
        example     : 'a84ukhc4l34bis8ddxy2z7phdvuwifopcoyruf91kjselyv2tk9mscplcba46jh1qiedmyyw9okk9m6zzoyfjc91qk8xqndmlaki4x0egrfxott4imxilv6ymq2j6n4021nma25asfipa6nhuiici5nluul2ijiw'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'hl8rj8zfasc1tpg0xmgo1ckhvjhckab5kme6bzryx3btj6n9xf'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 836607
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 3701409733
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'ineh5xgx2mde9qhs5gqp'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'pgz3vy7yoyhg6otdv7o4'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'n56ang8n5ozdf9ekas94otykkj870lleobviwc4g9emht2e62ynhoe91z3efth5kckp0juicgk8x3resnb0ud08ue2dzx1lz6j23c8c0vnfv4naroqy415v7iuor4tnldgp4jqbst9c2ddurbrqjdybiy764ijp5'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'tdd8bb03xzxv051zzw55qpdf4agmcq9dife7puose7epxp0rdzmiocbv8axv7wph178p7m06t3qyn09q29xqxnp9y00nj0y1p5x2ysp2hrsi9prme9dotio88b89amyew8fi5cgjxa31lnrv8qq4py5mj7jt65t7'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'otgjpc6zipx3hgjcl12l88q8b6xfh74nr7ivseq2jcwtsson6noei2ommwzt7rwb7tf405zrlkiq6lst3liid6ty0o1an8jo6657995kzs444j0hnodjxx0g13vgwvtf9basyolfaqol4j66vd2ragxzt4h6zgor'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'od936mmioc5akt1aa9nhkk2w06dldx1b0lf8z6d66tsyu4uvy1c9rjazexfpiqhnt8gfq30acdlfir8zdkfdd95iwvo6hs6jtcqb77r9oxb4mofkxvxudq1w9ip6gd2u97ba24coisk3akibx3uict4djqofgls3'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 6570546878
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 6136105450
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 8976667450
    })
    timesFailed: number;
    
    
}
