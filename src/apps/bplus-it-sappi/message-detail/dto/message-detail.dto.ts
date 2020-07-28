import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
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
        example     : 'b29j1s2sx39l8mau58vujbu3j2un76v6ysfbodzuxqjfjarkqb'
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
        example     : '6gb0no4nddykzm70rnp8'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'tzddcdcufgjt17hvxahba6c0h2gq10oanlntbw3hqx8o5csdus3ychng7spn'
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
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-28 09:36:41'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 15:22:02'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 04:15:43'
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
        example     : 'zhiqyzh57grn5vxoc4urfdejtvacuxglh41mz2aurv46mrg8eoyu79t64r48xd7g50tvb0fk200meeqj89x7eaj4vi2v29c1zmryk0ozt809pftv7vl6ihemz0rxfxh1prgm8g5lv7n56eg0c6dmt912erev7rw9'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'vwbaoz7l4vdife0jiqep1txq9toxs7ghs1swqrht2zbb2p9aj8c1p75xmn6qmecazhaf7q0506z9xskzbcl5np2phmiqg8z8is50oeqhhq8y0facjjyr5ef5m2ik7bswzchhzdeueyqamoaosdwzwy7190xzevjs'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 's9hrrcc7l3css8lr1y6ijkza97g4g53seac205zkqvvoau4awvuvm9bz2i8t0xehcmcj1osdl1i94valm63iktiabhdqc7hpm0at6estmwqyuqcz52dct3ymliaxjjjzvj1jw55heywm3pm73na97ft3x9bi05ij'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'tjsooi4qdkpv05up99t752s52jhec5lamoixgq1mqfqu1uo20ojbebu40ixrrzqvkra7wwm1vc3faa2k3iysli5vufnyly1bpo4srhkbwaprha119nhiyms7yy3vlv2d2hd6ux9ej7xh6tyxnicdzhjz6r6ab92k'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Illum architecto voluptas dolore. Ipsa voluptatem officia. Pariatur praesentium ipsam omnis. Recusandae voluptatem nobis consequuntur rerum nemo maiores reprehenderit fugiat ratione. Illum tempore sunt magnam non.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'oye4e1lit08xrjptgucqd887ivu51psckftmlg6jg6nzy5i2jlll0k2gwmdltne6a1yhshe1atf779tnisuxh2zg62766d660hc7nrp3i383dp5lxl2x5wikot798sy73yu9hy4k38nm0kwiqkykdocxxaht6rmm'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-27 16:45:34'
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
        example     : '8hk96mwb3s17ggeijptbleplbicix8ks8ugmoaynpsy5dy4zyrlcj4jamvzfub63xsbssbvh5ivf55rf6huyb0wz0pc96sep0bvgv18f0gvu0ve3jcqouxrr4b69t827ts4gticdn6mj7qfrhspl4nrp51atqrp4'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'p30mo2brarg6d07goj78xalve0uapznhi4if832huii1gj79fg'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 877751
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 4398850785
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'cludjpusu75hw0hvvm0l'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'y4vvskm6y6isgbw6484r'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'mgp72h5eh3radk2h9jmt3vo2tekfqbrqiipu66jvxf96gifzdksbr4m1q4gfgo2yipgxfmftoycygcf9y1a1yuezqayqeneehdjr6xcwss7lkz4erzdo4r2gpzv6sza0m8vb3isy07aci6h91asckvtlxyns8rj1'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'u1owcebrjuc69xil8e57hzcax5wa1ku52hc4fpmoyb55f01lxubk3ove453994uyav0iomf006u5iwpa4004cl24r45p6bb50xtign5yd3k72jw27olfectuwoq21ywyc51t1n4pxyqbvykln18vtb16avvg1keb'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'xv0rhtognj08cnibg0gdp58f3kvybopxyzqcrr04ywj1r7ae0ddlktuyztnb7vnulbm916516fdsneua1jslxzqu3ezif0wie2k622ug1etxwgfyffmjwpqt9husk87qpj5324nb7xzguu6bvwtfcsavnbewy821'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '2ywnlsa08o1j3wzxbreklmdzi8q4w3jainn2jduasc2kjy0m634d1pft5cve8f8wmmbyyyq2f7uv52ti5lvgpzx4vg5k106h1qua0tdb2ap2s36swqvx5p1t3ptexkgj7ktyl5270wrzyb0rq5cotyfrwgoa3nb6'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 5827210409
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 8548281458
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 6737460718
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 10:16:13'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 00:15:51'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 19:53:54'
    })
    deletedAt: string;
    
    
}
