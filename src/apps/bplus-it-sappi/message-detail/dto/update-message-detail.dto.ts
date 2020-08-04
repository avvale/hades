import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
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
        example     : '6o1nksfyjmdz7jroujlv3hoxy7cwqfne3tpb2w3rcn7680zc01'
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
        example     : 'ftszvujhjs6b9sbq9q71'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'tsucjfu68086umi1gb708i2hqj6mwvx7mhooh04piyayywwe3ahgbs5g45dz'
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
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-08-04 02:39:06'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-04 10:26:31'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 19:24:20'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'em6s6sfb0mzkmiv34o5589xf2e9swoa5jqnom9il'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '3lhbb98m69rfj4fhi96jmwpt9cmqjdul56g0k2zduyl5x84h3vtd1u56htro21ksxjpo3snmd57mcnsljj1nmelxtbbgrsopegicq5duu8dexfiqebhl1o6bw5r8p1l3u82ysn901ck4z2ce0t5wonizp5y1nkk7'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'h69qvmm6ba2713deyay808pcpdd3coka4lhlcc2tv5qw7gjpcauwp9buyr1cds84s7avoaeg1t4pxnc3ql624qsmzjokoh0rmr1zn2x4c90ojb2zmnuww8uf2sp6vm9knjradmklcwt1wih6lumk4hmie1u2jiip'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '6t0l95y96i37972i7fovy57ywbfv47hlqdiez2plheiuzx1sc8jvygpkpylhbusdt05kztk6q44qhkvyjrwh9ul7vyfhhzc7whp3mm331g8h6346eot7nzxl8gkt9upcg0lg9imx4ji2cocre1mlg83km62gfgsq'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'lczpn4ut1qvzchh2gbok0gljqbzbm6z2v996bnb7fzsjsa6xjhv3mmn2aioxnm202nb1f9uaqlagw7u5rd4f1k4mya5z3okjzhltkttbqgtpp4yrwoyw5hy030yfp1dkzjbs7uat81u5tbsqyq10timjkg7tz6ye'
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
        example     : 'Voluptatibus rerum quisquam voluptas fugiat dicta. Et itaque modi animi aspernatur fugit dicta quae esse et. Similique quisquam quis. Nobis consequuntur velit et. Hic facilis voluptas quia cupiditate magni.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'dmy7y3k49xdkdhdimesq2wflkssjg5hsv1rzg7h196455uracjp9zszc7106jf8qqmt3c24l6qv7ccjta69w2mt0duzraqjj8i63mlud0g4b1b28fbk097ov9je64v1n0ja8bg3v8kqp7itgm57t4jb3gj7155zd'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-08-04 02:56:13'
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
        example     : 'powaxxm8atb2h6w7fhpzu3ppizbrjts6edgmmemvsoa1pvnwo1c8l47ps8npcgcji5fyi06xcey3m55ier5sehcf2sfy4q6whv531sxro7xfe5xl098zwwz4uka51dek54i9aypt7ggo4o6frz100e143bni141w'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'kul9ochzj7nxy9211qwd55zp3n0zy1f9kybqu1uvkgv6iw1b4q'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 423428
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 3276617894
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'cvolh7dnmcav0ck21sav'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '6y0phjl1orwgxy2si341'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'l1yewn2zdr153w0jik8nla4ws34x1vbld7cztz9lrwwbrax2zet26vda3pn8yqese0r21lipb83g3kwec1gki6vg5hl5oq5bvy17q2n7qes12c4m4qqqrqvnd04j6nkgn2vso2o3zbld182rdcxk5rtnql99xb8z'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'fcyp9tvxwoz3bbfbwltngwxhg2vcy1947au7ms95dpjd4u1kx00gqny44fbwwzh3012yxr724ktsr6x0acjx13i476h6yhwj45h649wk3r7ndu00n23wa6s03k462nl6ptwgmr2ngvdydo76k7kdpvf1taaiftwu'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '5k2sp13vyh4zo2hteb4to17v60lt27aynzembgy0fokwumax8y7wqz03jm9wfvs5fn5ap9bhh6f96zgfwblb0e0jqqs166iili9t6b9a1xmg2dig2d8f3s0hqlr2eoonnghrao9pi8nu931g4cmkkd2anxcsx7t1'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'hro4ywcod76w8wrnht16mqeit874zm8c05luqhd0m68pjoebl3siwxgncj9vpdaepky5tyr09nwaaqe5y0gpw1ahka19uhvvb9dfmct5qfs4zj6irroklt3dio2z3nlffnhzlkgnecf758e0w8p0bdhus8orpzxn'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 9207483353
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 3030712852
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 1955563564
    })
    timesFailed: number;
    
    
}
