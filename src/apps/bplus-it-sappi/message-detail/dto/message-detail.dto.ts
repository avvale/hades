import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5ccae1b9-af59-412e-bfac-deb9d5c66536'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4b3424f4-bfc0-4855-b611-92ce0ca257c8'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'jpce1y4gotc507gy6bsl53cljyf3r2ifjvfff31n3xqndwblro'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '63f20a59-070c-42ca-a5b9-596d3dae92c8'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ycok7xzirjih3k1oo59o'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '3qs7ysj3n5c0khvh610afuhjqkd5k64dnl5n4ueuhmokswqps9of7dvinsik'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '0c5378da-c2e6-448d-9500-30bc48c60bbc'
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
        example     : '2020-07-31 05:50:51'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-31 00:51:37'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-30 15:59:20'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '563kjffs5pcvi454eup7jjcf34qghcw1syq1qbbj'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'p38bb2de6ewrkcovevslcvn560wy5ypdbihadwumm3g7lls356vwm2l34x2fdk5fx95nu6j4mtmwt9g8hj4jpyj68sufhnlkzcee12dy0eoqvhxsctorneuq3crta9ifzndy9kjctgup7cte6yjol717i8y356np'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'e1rjtctkgi9pag5l8abh3wfjp57vw5xn4va98ezg6i3ne6gymvus8pk5gqubk9vfbwh1ezlpy8qewaovrcucofpdrihceysi3kff97b81ggcutt8t4eg8qlraydwtehfudqa1emk7gvgyngh71luhok19fy07ymt'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '9salkg4ive4f14gejcab8aiyuvf9uzt62klg9uhjcx1y2l48pnpl60rh1b5c2szh4ptxjn2jqdyuof0ro9nu53unrm1oxj5d83l6gylmjudih2wwdw966rloh9wyddsk99wwectirltor8cpo7jwj7fymyqsxlrs'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '14cgzodnoqna2rh1vheaf7i21fpxhorwqjrakan6wihy7dbj4wkqqcpe1b7m69p8t82hfoj4y1r5f4emtfbn1kuba08w8mj63r8klbac4tg2b864nu11spnl40rk16walr65755nyxwoaa5fgwuf9ciixj1tq78n'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'DELIVERING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Sunt sed sit tempora unde architecto velit et explicabo. Velit et voluptas eligendi consequuntur dolor voluptas. Cum ab sed ut.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'fxi5dvl557wmhhfxn3o8fbusogbth51uokj0flbqbssvnc4v7n949jbsv7anxn23bkx7qqnj8r2v80t0p366jalfsm3jbt7htn1xjb3k4gsnjyhybf71ax8zekol21994wjfcu0hujefjji3x5jybtnmlvq8p6wo'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-30 15:02:30'
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
        example     : 'viijfwv9274a76yg6s887uia6qxsbeghwng63c7cizyv63poqz1aa84stm3bu4vw1d9qodd9gwqxfcoikc1mh7k926gv44yno4bobzlyr4q3z0j1qceqjwmm4depiqcptohmsy2cq6a6cy51ey83lpi3jps9gx3s'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'ad88itea6m5fmrqovauc52y51tmab53ds1rvpog5wj4jnawk8m'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 599317
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 2487760076
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'hdshiiwtjyn0qwcmeq3h'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '2c7kcodzgehk5u764s9w'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'l6d7lcvvgad20o4ze12n550buj5v3ziy4han8ffwgux1q1r32c0t0j4920xez9y4gswx6tn234ir8j8gpreshe86y9t6inotovznjgu9329trntvbhni95v7laqj8o1wffahk1l8bq118a30mrampql2ndv3nwai'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'i1ek057q2webd9yqq4tumvs8920zd9w8c8jp0xb27yfj8ihv4vrmu5wbhiy5q6f9295a23c8nqd5hnq9nx2cdmbo0wgap7h9ydxttbsx5ufb0qdvevh5tsugjzxab1u4kuqrsf7674itk14qgyqw31w55xoxfwr6'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'vi8xppp9ix159kcj0pukoupgm6jte66wfmz6x62emj0sf6hjqv61qg73v2feyayau93ekh7vn6tpr847ltwmgofx2szhu1g69tkcj1fal0algbi2myprt0f9fxntbgydwpmzwht8j0isy60xy5fhg56rk0wipeim'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'bgr3ghxta7xrvugskec03nmnuzrq8sy5h6e6wxfq3wpi81c27hdy1sk3l67l90pmix34ygs28yvgvhgi801gsuwr81h3wpbwf2m53ev3dc7f8oui0vj5klzhmviesdtf752r8uczvvfgymb546ivt277ymj04ke3'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 8634936381
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 3172850879
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 6033776138
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-30 15:06:44'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-31 06:27:34'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-30 18:01:49'
    })
    deletedAt: string;
    
    
}
