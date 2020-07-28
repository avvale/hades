import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f1bab725-d0cc-4461-869b-ca3886b9abf8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '679670c0-574b-4c85-978a-7c0014391c3c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'x4nrb1q3z4nkxm2skllbtsojw4ifzzy81u4vzuko9qba48jtfh'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'qxbdkxmu8eu38p53f2op'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'bba0qwef86ouek64x1c1pf95odrq54pvqhn9sjevj4gawgdexcwrftpr01sp'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb'
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
        example     : '2020-07-27 19:07:03'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 11:24:49'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 07:57:15'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'ee8bea4b-821c-4791-8cc8-c239cc03b91c'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'oftt8yevcp0irqk2rdi97n6oaj0crdo9vc8ojtfgd0d042s6oezua26l2yacm8p2ma8ibyl17hbsm695znxn2waz371aza9v6rgle9vs4sqs4bgvi0p5s60l4y7u1dca198yshv861xlj9v3kvsxzrwntvyi23og'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '4cifmj495p7mmnqsri2cbsam5wzix8o9w3qb48agoy2uobx1itcy8p081xi1lllx4o44jncf1r2c3trp6ekkm2j52fv38z1d1se2xu29qcyn6nfbm91sbro6xadmtne9i5s65i4ldc9v85825anhhqvh1ywsjrk5'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'kxah1lc4ccgy6fhcb745vjwfwilbi2ywdeek6284p621vw6eodg0yd62c777wwymjw0piz0jc4xr8w6n8e8uiqzlziomw2ol56qos5qto0lodpx5p71h6gnx593r2bw41vf8azlmk5gm4ntg2aw09uaxzwdcbnsc'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'unn8ab19bx3awjajg7y61jzv25dishy5deon6zcmhgmjgmrva0repmv8bgtlmuq6cr3ho2xspfir0vukeuhnyzwa07zflkcmvozzd4xrgg6bbikc9zail169rdy1cy543pttgg4cdfwym2sojuebkgjnvswrl8g7'
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
        example     : 'Aliquam pariatur quia nihil non est. Magni repellendus culpa non cumque et. Ab ea perspiciatis.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'ka674o56g6vh5eo5q72da239p43o92cgcf51nguzlhv6cvdy4tqgnnro9tt32etuyazjb0zus4s1v6hwjcgwmz0d77sff4dxu3krf6vxl0glqvvq8s7ga3kzrh9bca56j5tv9gmvoje2y2fa0jnajq55plq3h16g'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-27 19:15:15'
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
        example     : 'somnv4r7swftlqx4i954car6eb20ljx5k9sbl94m7m9kw36rplsyspsokahrmsmk0stlhrr8t49arofi97czmeau1iuyepxiwqmpol3jcmpnbqimo6uuhlrckgj69oasoitra8wliv5xez1pz7nibtip54hoi58c'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'kz0hrt1xo81bq75b6jjdshlsfo4h8cypdcrccg0hcmys5yvmvp'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 749701
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 1246845190
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'qk4jdciat3e5hrgntumz'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'kqnu810qrgm7j1n10adf'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'l8allt2bg0rymyapdze5ufzsd7p0vml2mg5t1mdmru8k0yz7q4o3l6cencyfcm11scknyox3nrxea3hosuoi0lwoywld6p2f9py741f0qx1zg56pya5pkf45jvam0c1mqlrwvswutbp5adsqxriefkyi5y2huixg'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'djpz8a3ybiod3toqdf0dkl17bys3z5pngl5lgrbdjsdx3maclu2qxffu1je1666ti35hl8x2f9x53ke7rapgp1gg0zg8f4lur6iv151pzykjjmzr6gf5kmucfr8gtui9xbidad2qbj6c6f2wkv6zkd1zw9cu1yy2'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '3jr8kiqpqqawxfhe2b7nydwav4zvgz5auowafx8yao8gurowvnrk0wbxmrle4m6llm4m5zes4gbwhpvhkgwtjj2x73kw0p6o7xosw6rgomdjklk1fulznyfzapqy4h8kary3pguyudc21v2tkh9mpph98ptirleq'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'i2pipoaib0ixnpd0eckyzn3inwayroljaccn6utk297ofwt46arpw23r5j34zmig5e5xmfruogfzfe3mrxlvc4e9dm1ewbrqoyqzyzhtiy9pvnm4a9y82dyil1gv64dnme8emsybnxjq8hwhdgaq4gm1yam6pz7l'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 1917262534
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 6628714042
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 3422130222
    })
    timesFailed: number;
    
    
}
