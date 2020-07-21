import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '45700825-9f4d-403d-9d36-a21fbf331a93'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '136c296a-11a8-436a-aab6-0a9f7e4c22ee'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f0aafb29-c406-4ece-9787-2e632eec3833'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'zsnx7738sqxd6vydhwek'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'j5jlxd8iinaa0o41y20y2hmb9dvrl4wt005towtheaeqrkqgzpymhg928x6o'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '784d23da-a6b7-4fd1-b66d-b546b3825386'
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
        example     : '2020-07-21 02:14:38'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-21 07:24:36'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-21 05:47:48'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '90a21551-3c36-445a-ac70-43eabce33ab8'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'uyzhj81fyh20of4xd7bm13b64z4bnlcqae1yyq9pusmna8cxsem5rnkvfz2joqrygd7ynmwrgxb79axpgx8b7tdiko2is42dalu05p2grk1ymxo5t5wpwqyuqxorpzpoev0uavzgvyxj2f9tibarb1cjib5jnm8s'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'hu857jwny4ql8h9vu9ldt0rrigjmv5auo4y2jj4pz4lw6y02xayvid1lbtodoesd20ivuy72duji9p681r3d64z6mbc5kqeqizlswepaucumzxu42mtllxs0andfccgevz7il05kpkw3ly0vedphs4hw4p6utmt6'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'c4wk7nwg95hcvvu7pmqe2ezcctrj8zhubhel4t9mpdy8md2o3870nh6kbzp3gknnvvskreul1vzow9ly29176j5vd27kfi4i679byokst4uz2lu03wbr2s3w80h7q6j75wm5fdhqxtk9v4fct39uujyoqg8hqvus'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'qtk6wi7bo1j3kr6uzt8d3zgwl98tklh01nxv6tenwkhvex0vj8mk0cyz3rfhm50hz42ut7htuhhjtxq8p7iz16sp7025z4do83x8vpenk4vf8a1a8tx0ct2diwx3rgsprudn15vinl5m27gqhjaeuw5osfsubtvs'
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
        example     : 'Dolorem dolores expedita odio nulla inventore nesciunt natus explicabo. Ullam nihil nesciunt molestiae animi corporis quis. Unde illo voluptatem eius porro veritatis aut consequatur aut.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'ujaawbxebn1sv8krvjnc1f498jwg5nxhdgeluscjqlvcr959rptwa3fwesptbzpsrgkfjyzqnwzx19kgia6bckbqo8euajgwae4m16aks9j20ijym5e0zdead2t2gra0xxqeq48rfen2tm2eczdno4lc55lp93ln'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-21 08:45:40'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : '15f3bgmej50ag4tlj2t7'
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'gn7p1sy8s6mhm1nk6y8csz2frbgzo8jwckap9regmmkgpoee66xvrnzxr2ae5cbupkc6p334gw7jwuhdqeokldebldykv15vhh8dkjgwupqdzj0qqyiboc496xj0udevbz2gwtopcl2tj9ciylnmq1c83tdhl9kj'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'ulmkrvsrlupoyegczapv'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorLabel [input here api field description]',
        example     : 'wr18chz5wv7m2fd9fms661i6mphuwvp5piul4fx8xyts54ml5n2z6y2c23ktrgx6hjtkeo9luf5ux4r9sgktb174ec7puehvt36y5k9scekkaehf6os0i1joh4shlua3t9hidi0vshylhl8yta60l1s2rhxcgq1w'
    })
    errorLabel: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 7069174016
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'adytb6dufe93oobna3jo'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '88kvzzn0xtgi8m6r5szp'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'qeepa946nixhuu8u51n8axgydvlzpsopg70155m23gvp5j32fmvollj1usxb9jwjggdw3pqivjvarmqrhov1zxifjdoksr8eom1izgzj66yihuyie55up0rox1mrzke1pk2o3s5a4zwcrvidvo2i58sc2qoduqxq'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'lqpgzvhg6brp9b8wewbo0r4unlic0iwgwtn44obtt679g21vqkhhx34kcybjv3i2uo0k8izg8iza9t6gwtb1jmhkmwjfydov9k23bp3gakidhjipqw6fnqlkw35nnyeruef2ufnycaqioz2m7rw1w51bud3ocd69'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'm1kvvxwf048hadgw37ut1fa7iu0nro6js5wayvle07ec0iahwu8ot9jibng9yvgc071d7za8f8plv3e2x87s3m2iytejqmkyx9s3ombbciprayx5o90fdwj3wmspj13msjxfdv42ko4d8gt64czm5eps7nwsunbd'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'baqojqzxbrfjwnwn4yljprvyshfw2cdt2ynq4fstmjvm5c0q8s5ap7ag5qyehbtn453t61qip4xzvrdkjswh4nmgy3ta8d6qbqrbglg2rrodt9k1t7e3uavx4micl1jozlk6txt3679pzy3h353j6vwmqrvhm5wo'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 3106281605
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 7651683270
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 5869588721
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 22:43:19'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 09:37:12'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 02:44:08'
    })
    deletedAt: string;
    
    
}
