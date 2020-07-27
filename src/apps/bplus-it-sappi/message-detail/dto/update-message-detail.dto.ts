import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
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
        example     : '1j6mb5tv5zkhs3phppqpiwbcip8882iazoppvj9or8dm3lv75k'
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
        example     : 'h1jucjiyiief1zokgisb'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'dm7tcdrrt4y2w3xgqc51yv3ggkt4oe15efwtxv8lbi4cozpckyg82164io60'
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
        example     : '2020-07-27 03:14:45'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 00:31:11'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 06:28:34'
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
        example     : '502j2cjqet8selfhsi642ke35lpeyuynv92ne1mnt2r650476cwmqoils76hbo6h8a87li1ftqcunm9pix9dqn29cbymjvj6nyud88gxu53yd62qwdd1sjlqbiyxqowpe6racojh3huqgadcoumgcnt6dabeexzt'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '020o8cp81ln2v9jkslubdffcwxqy2qi6uf8chrfjgujr25gwj7ipzkshlnvvd5mgcer13osvvoxl9fp470somdlfb8m4gr494quj1bn09o07cw0hmjuhjascyg6leqvp71wm7josbc8gofd990rjj7ldni8h9caw'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'p7k3f5c5snm7779dxjx2h1d5zjgc10zv69d95dwham4713txxbqf0ch96pw2poq19pauqflrv6t0vqo1odoaknu1zxgqa81dcca02vbh2srh6maxconceku39b7u9w0d8ts8u38efomlhsg32bsl3l863slghmap'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '27242g8oiwjzt5qu91r9bf2phelpuqffxjiyubx8jrgg7gn6ntmqic4w207r2mpwhueg94e0jxy2mkozvn8kf9lx7xho3g6upsgmau40rykb6ttzi4aspx93z08owza2oeii8i27vbux7evrubh7rutv968c50ft'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'TO_BE_DELIVERED',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Fugiat et blanditiis sit vitae mollitia quidem id. Et quae repudiandae. Consequatur officia eaque. Distinctio sed et eaque qui voluptas vel soluta eligendi. Quae nesciunt sed eveniet aliquid vitae. Deleniti quia minima excepturi voluptatibus asperiores incidunt omnis error.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'rexlma4t23t6bvn2z7wsscejf9cjfrk0xyhj9rjmd4tn6v6gqyou4eanxr0ms1eq2lzry21e69qo8uruhzf0xpjepsnbwjwln2znldungr5tvq07wi397clgqtwoujp4fjfvnqxicjvcanmssy5i2eh5optkieoc'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-27 20:16:07'
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
        example     : '6l5umeqoy49frycl5p0g263gdbn7cyj3a8qkoxgnty6izg4jnzbjmp8csnpwrnllm2iuxwjte8w2hngju0kclqheh345ca59wpqwaggsriuj9laviliklub8wgzjecqos72ywk6ro7ybvkkakr3odf2fv9un9olr'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'nujb71uuwinp3ff065ga58icw17rvvp0bo95yw0x791nb9i78f'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 816815
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 3879086269
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'fpaq2vodhw1jdelfsgls'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'f5gomlymtmd8oye5xf7y'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'cfna0rcb18lykq3y53hx7bmoreniaprfwots7nb16rfsn0aoxpyn9l7av391zihjec5idgsanfdryimpxd1mc4ymu5f1lunrhsvpqhe5nif81iy14fcrtm6caqojppthn6z6cq45v7ctmoum4og006937j4hipa6'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'ck9ukk2m80iqgiwiiq1qu3pq7q8y6q5ax470wnimr1cfhwm1yixp8qdiwhgbap7u7mvi59zvddj6a95tsjl28f0c5wv427tmkvg6hmpijgtsfct12ix4zdapkla23wg6a8b6fy3n2z56u6a3tt2k7fqo6hnk7l9u'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '5z8vy6l9gy1v36tt9y8kkf8b6bxvsf1n9er3txcxpttkgpq6m5jsmuion6z859siuknppg1qeeqpduediufudhmy8w20ee11ycjofzcodqbvea2ptfdo6romccz68q12x2qonsewae154zlwexhatc8jjj26fv6e'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'bp4qyo69kgwtagrjznwrwad9vbhyt5u4egkjjosgvac15buise8veoql7pzbboibh072dsp8ov6peklp6gwu3k7j50bw48uy3xfd9vee3t6ninw8p48tgl008xdlp33ojm3mot9mg5nexqku6xavls5tyk5tf1de'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 8634641371
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 3925085999
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 2456851094
    })
    timesFailed: number;
    
    
}
