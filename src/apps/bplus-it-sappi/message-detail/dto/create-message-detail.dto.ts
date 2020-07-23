import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
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
        example     : '0sqodcbjz0dtvrq80fk1q3smhwpfoffb9b27it4gtrlotnhftj'
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
        example     : 'ltp9zvmoj3b82lblooyd'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'acrn3bhboc9iv0o8k2kjs2hvmeczn7ft8lrbnchz7jjtzvgzlxmc3ju346mf'
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
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-22 19:25:35'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-23 10:02:44'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-23 17:01:53'
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
        example     : 'br1p2re63cply4bux9tmlcg5dgid6yuo7wax1hnyt5i93wrqoat9xwt1occip0bzn7rk3ep1y6sh2jxgmucjrms7u912b3qh8u2mt89pivk6e9iuim8wgng4lvuckihrjz4fnq3uj3rh6sbs4w44lx4shvg4p4os'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '0j1nbp664zrq1un2kzi6zgf6efmpwnxoytbo5aq29e2u3rukt5njg2r11q6s1vakq1it3ze4qlqqqd6lmcvp7gjxjzjinif13mujql76puyclsb62jfryi97dc0etjb1j5huzk5poip8nhb0zpq9clej15va1paz'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '0i1brw8gbm6pjz0h58hesiykrdplxunq0n9augggitksdqnm3z7kh7a7iamso9zzhk3aq8buugksvandw29uaz27kzndjeulgzv1p6s0kl1nydu6sgknjgfq8e3labqj9isv4dz1kir2i9taqwkq45l3e7c9363l'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'jdvw4c5xvj10rzh79rwg9jjf4o4n1c57zy3hlq80om91kc10hap77j5j60hf1n4vfx2unyu3ad9170vasmcsykbfgnlbpbxk2pwr2o77t9hh2ancud5zgovvqb8fkmh0o2i4ufojb8ioty8v59of1twtwhs93xdg'
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
        example     : 'Vero qui est qui est voluptas molestiae voluptate. Voluptates odio laboriosam sit ut omnis maiores molestias. Ut necessitatibus eius eum dolore ut dolor assumenda.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'lme6wyejosghp65ator1beh07xu1oa86n93ij9vny9v39bjjjph37lue09u167rpw5zlonb9gk574zwt551yym7zwfvujop6941yfpwdqz5vgmqjn5nousei8ha9acuak9kq9xm9qd5s8506h1rq42mhwl6ykdr7'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-23 09:26:17'
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
        example     : 'u1oo62p0v7ojy8uof4j4elfxesjwvr1rtc3gm1xptrr6pnwgt0buyg7tdkb8l8h286lwa2m4iobvn65iet4svpark13ewj05yikuf25ofdn1erijulto8dwwbb4f4dqry27t834w7s3aqj1z9hratmlxawkwe96o'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'mjo4mtxv4yq4fp63gty2'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 960557
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 4007782873
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'e3qx05bnbys3yzc7p9at'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'xx7o6aiti1w1r1o2fz9o'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'gufue859dt25rn35ti7878eupqna8knfe7fe8og0pkkssxptma16fq8e4e3jhj4y45aeiydoymv7qvmeak0e1c0ievri69pfirrrs4qn0bgq74ojfbx3qqf5jpbmualeq4ughde7q2hv2gf9jyvn7l5w3n7hhy3c'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'duv1xrhbmku8djsmuhrj0puq3b8v2ikniynxzuxehemu5tmr8d0v4rze3378jkifnivp5s4i92hmt6r3kja12g3tmsac8linway1d08k0uufkgytbi8hnrgfl3o714ze7cr0ce4daeuj92laqd9deb9h00f1hdm7'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '2k4fn0xuzayl4tvee0vnlwf2c2lnmgqgzj215p4nauthwurpuw1so5a5rf0d08qtfodr3kmp97uoho8mmv8so2eitza3d2spsz4lzzx7tos2pt261dkp476u7psoi1cs8rfn0d9l2k8xtja0dxhljjyhsyksij4y'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'hr50g37o36hb5l7327okx4lg3kf4ah7bxwgfskqryaiq6vobx3nve50qow7rhv2evmaotvpbkjmv2jmbsu5u5vcu9y2e5ou6og8yqda9hpm034qqimuyzlibivjrursjh2zly6hh4jxlw8ee287qiter0of9n4iw'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 2091116987
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 7419518573
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 5028023326
    })
    timesFailed: number;
    
    
}
