import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f7e41556-9598-49e1-9961-cb409cc7525e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'beb63308-f14e-4889-be91-42e05e3d7aeb'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '8qrwyh0jkbkaojwkxl781ojx9zadxcea1ltjpndpw0bxz1ma26'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'otbaiydv45brd3jtbqdb'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'mp4nux2y8irskwhf4py2usinmnj743hz33d7afnc1464rr3g2d3sznv0jcnx'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'c8949b41-3c40-4aca-a429-2cc6c174d507'
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
        example     : '2020-07-29 12:01:21'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 13:13:00'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 05:40:58'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'wildbtbrywz97ncto909e8l6h5701rubaf21ct3i'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '5rblibjys9gxmcr5ljkdg4m1pbde7w8461k2kw2qzknu8rmi99l5vznwz2j6dbh4g3yjnri8zovk2qhn8eudoc43o8jztisefu3ngesij08kneiwxb8wfeuwws8glsfuugdd6qipznepehg5smmau2lunejne44r'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '8o62zmx2uqb0lm5vb4mzlpphzr821ic81w8qevhi493ldscmv5pq7jevzj0hbguapxr9jh9u34for7xst6qydzvpgncdcf0mcgf9qjojdhtfcelsdib9iss269e2u2czc910b2a6iwf8eq9wewdmwj10te2h6qz2'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'lzmlrhm04ij4h0jm2kx72suubw8vaiz7hevbxbbjtw1ck4cpw0defjvk7mp5dcbuo1gjz5td6wqsdyxgdh2da35o9kqg4hmvn3kg5rar6xlwbhsffpoknm3bpsbacgrnkpzxiex9l2s3f74mk4heprd916a4hptt'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'mv920ckw9d1efsk3ahir720o7ipkpgfhcej0pibue5qa21t585hgkcqaknrb6ys2jlr5aikjvzqn2g8m7gpzz1qhr8b6aclmxuhakqhal9kqx6imite5is97dzbx6dnjm4chqn4vrkte3vqhp9qtkwl3kbw0gvhj'
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
        example     : 'Ut nesciunt harum illo dolorem veritatis veniam. Magni quae nam ipsum numquam ut magnam ut at. Enim distinctio qui rerum laborum et recusandae rerum assumenda. Eligendi sint quidem consequatur at et unde nihil.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'x2f4ft3i3wsqjt5u85ji1mw93822mho1rrx6c8f23qlugr2iosko3xnqn6hwjnx4lpcs3uci5blb7wdkehy0agzyvectkftpdm33ps9k6o8ul7a0ffbucrgi1hy9i8tskt9ra8ipl0z4lcxmtvrxewaug9t4f3qx'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-29 03:55:28'
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
        example     : 'tcnxoyhcleoyrkl86a37ueko82nrwxyg8qc4g7xsuyd2k48nykxss3knhydnzzx317clzlb9vz8mmpz0on0ab77pgpcosetx4abtxakah1z50xro01gfnpihfh7e83aaqg4x3qy5ni3po23v6zrpb6gqz8hp7rhz'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 's8m6g5l81c35jgnrb11md4sft7iy3yi8z2f390x3rocslog4s1'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 909419
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 1877784611
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'qtm73tx1575064ngwfru'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'okj5evd23ubw6zqpxa1p'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'xyqrz5huhrn9rr3gvd4r1248nn792djo1o5b4zqtytw5kvwg7wk55co0p1p77kktalszcduq5bmct392nykah4x7342ylr3kegeruz3y85fypzvjatxrj8lhe9wo4uhm46zeh93h4q55gd2t5ckj004k3epup0qe'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'aa3jlz48fzyoce4dnmd0ozmqmlbo3zviyb5rfustyvha16cfnn84o8fhrobyuw3hems0dmznl8zoh6itdmdv2yk1w54nda6mi2b2qlu6ojzujxa9smozijddgbjp1qsx95pb2ahevuywhlh4kwm5yomze5geuu9h'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'btr9zujcva4b5iu0k7a2fx6fi87a3uuz7gmtt56x6g0vulpz73viedwwbmtcsf7oulslyfzcfrux7c72mqj6lorlpya3tvney3ulxona7q5cy8rzv30mjt2tq9dsxnt0lhrz3q65s62xwpy709uwzqnhcycwd6sf'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'jdlemf50s5s1ga859kwpeb1go0yfabpf3se41vvvu0zu44zpxfrusirv1ji9ybe6kedcv3ad15wge2az6tq8cnx3v3xfz1r4aqi74nn7wvgt88kr4j2etk39rrzxarxfcqhnooqv66tbx97t5jvfhvjcvwgbmyls'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 7823458449
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 9729193594
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 4023716903
    })
    timesFailed: number;
    
    
}
