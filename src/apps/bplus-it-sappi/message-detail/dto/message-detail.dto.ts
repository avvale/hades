import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3a4ab88e-5a0d-4644-828a-834ca446cdf4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '0qwun70nv09916tkrwy6o3052olwb6fz0xsxtcqgdeeio18fs2'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '62c25b1d-785c-4414-8fa4-f5954855e72d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'qklsq6411htq6uzjx1js'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'w48f80o79ce184z975xs0k8f7z8b4awobtcgvjiuvgyser78i0b88gz4yvpe'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '037868d3-322c-4179-bada-292eeba79554'
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
        example     : '2020-07-27 06:16:27'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 18:25:51'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 08:17:13'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'ad9fb78d-ea7e-486c-9312-32dce5d85c46'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'ykd9orlrewfp27uwem8dyio5yplbnxy3h8mm209kjy92119v6f5va4ks45q9gd0dzz818g69v7vl0nxnmtmjihy00516sqkpcd82ztsc2ofnk45o00lb6hwxqj5xn670ofstsnzing8nzf84og9jg4jfleb5e4n4'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '7j7a09zrv9ontdkmccvnieiszrpsx5d1vg732nishtxnpx1525g1pzyso3wly58am0xv33ff3q7gxp4vuef9nin9c6p9ed7yjjq25en7u3mkcc4f5hxt0zv1l4w07cdf9x5as3g0wb5fhci2efxfo0ndseqtpzqx'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 't2o8p5cpgqmf7te6oen1xm4lj5sf6s1tniiwulv7li43gjjjmusajo4m1pw381wt3yczadbrmwwb1hyg565dxfmnr53pyvq17ug17xc4zorz2flduopptxgvtxz1ii4ry1wkf516fa41nmc47rc2a7029r2zl4ws'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'h9dov7bapsybogy7gl81gpxlcy1m68hzveohh6on7rg6wohjqtwb4u7na9liqzttyjtl3f1ae73zeiapflzxxq33wbthtt43m5i5lyg3kc9ar0e1ql62bc60ghux15gweotww4u4px5bfgyteqmf5nncdjgcop43'
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
        example     : 'Voluptatem in earum illo. Ut voluptas itaque consequatur dolores culpa itaque odio itaque aspernatur. Ea voluptate ut et non dolorem ratione officiis voluptatem consectetur.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '25ekklkepubk55sdfed8t3dr125s4o43wpyd3s8uuoo65zk2s8ugek544nfmak70uku5adirc8skp5t9pd43q3ss6w8yol8i41yg4ja9yb7hioxlf6s5bx1yz6yddpmy9lenux38tu5lzmegh2182x6fbz9ucmgw'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-27 10:11:18'
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
        example     : 'acpn4ikbntr54l0g3yb7mks4g16hi3rtwazjfufbf4v234g37kjie0f1bugq2otiifz4kdyh0o6ge8gpy46h8p27cnuun1gd3attmulinnnng4oe8hfa2is2yqbht1b4a6i2u771ubdeu4c7vo7nndjlc7f4dezm'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'azc12hd7mxtnbh5eai2ma956td1a4qfj5vg4w3xfk5fkpl6857'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 968206
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 9450034166
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '8gu0tqz9leiae1jku6pl'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '2yzlwgvj7zped9zchpgq'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'yiveobupvxxn41bmlbzvtk4fa0d4qn17v3xq43kzp02mkns4mtskpn30mp57cl9urg6m2pv1jrgseck9zkl4a4vd6xxvwwpv68oxafpgv70poybqxqzspqwpdtnan84z4h81l7o71080g19xs0446f7e45e52tth'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'r0i28egeh04f5ahd65olpaqm86m2pc3wyo8kdyb7r4m9m0v83njqalj7vsi12368yjbhltvxoj06utv468p196b2tiggr6g4ii0co8cbs29vrt3yv8sw1ifv4yf8c6ghuquzbyfarum5fu4koibvjg266miid5g7'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'ioj0v4nxd66b7q3hv15p7qxfvoppdlw06agdvgawii0tzo0rak6bsd27pvmfv35q1omnlh4bh5rmi2ucaeem8omoyy6cwgt6du7814z0v3tf6a7mfx1xcbhx908tx48cbel6etp46nubd1to9okrcvmiep8metfi'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '8ztq7xw1dwlgh0b0ogs9dva34cdk583xzuupbhu6x9xkjmhf5uepcv1f0elkwq4axnt1fiyq3xqokchkbo4tcj0tlna4rcvrpd7bq0r95bytwyd11klh0lmgnkptdchtc0f73wnjeslk6vqmec4jwbv103y2ax0e'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 8433952393
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 4266527711
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 6428278299
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 09:11:51'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 11:59:54'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 09:25:44'
    })
    deletedAt: string;
    
    
}
