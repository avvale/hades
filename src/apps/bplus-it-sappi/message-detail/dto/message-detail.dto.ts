import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'baf9e4dd-353a-418b-a13d-40063a154583'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '89d56833-9f23-4d1e-afdf-3e3b485ee7db'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'm62cq2k3h592s2xq38i2h8f5kjlwbe9f10uv85iapihi5tykq8'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b0afe8ec-ae62-4d48-a2db-7d00d2602923'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '7phcp7m3m2fle3wab5d6'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '841gwhhhjciifiw7qjbdt77xe6jc9omkj2auklszeyhgmr7f6vs2vpsn8usf'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '7fdaeb58-b101-46b6-84fb-1d8d18a226ce'
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
        example     : '2020-07-24 15:18:05'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-24 04:00:07'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-23 21:37:44'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '48d5d753-efb1-478c-8e77-4bbbdca30c42'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '2ezxwc4wtev7ki7bpbuviw0wfyl74oblfsfmx8oiuo26kw6mk01xegu1a556gm0zl40pwyt31vukuur6hrf6zkfnxzu7ka401b1zbuo0xewbeiu9sgou38xkvp71tao65hecg2y20zx3mm0c890fxv8gihggzz1d'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'uajr2s76cu6r51qb9vkevvuzs6qxq17jj666vsyje6s9cvfykgzjzzas8zakduur0h49ot4z3eu3zuan7qg1n5fazt6so9tbwm9lymzk2rwwxpjcdsbffwz6mo6f0wom35xrz6c83y2ba1zmczvgvzljlxjme75e'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '15ahm1xad7do3ten625j42tdvyttpjejhvq4ulk9oulzxjraqtnytb55jf57sgsy2yujky7ltb937dx9nf1flm5mbaior1sak0xrmhh5aegnsrb5ftj1sklbzyl9m1wr88gfomv78pbdp3kb7gjvvj0jz9g4vyfc'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'uhoq2ewpzb446k14nlpwel8ugz74r023ade3ds7d18lhvj6i98vb1khyah36rffqforh1f7e5oocexnh86zu4uj170ampktwtflvvblz61s8osfxy7elp0x5fmgmt82bs0mtc85pyl0cpw5ilea5qsq0qg96f269'
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
        example     : 'Necessitatibus molestiae est aut omnis. Sed velit sit voluptatem nobis ipsam incidunt dolor animi. Expedita reiciendis animi. Eos sequi vero ducimus amet eum neque neque.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'pgded5mj5oyofkcfsfrdi17dsqy95n879sbtq4zq0not6af5binifmbt357vsdmqgquzmgpspoqnp5rmmlrkw5y3zjqtsj9aoyhxz561g0wx4qqlj7u7ermxkffobvoqt99lz2n2awz2ir7iib6grpfmbfy1f06p'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-24 13:09:06'
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
        example     : '0yammo2vioxn53keakijh3hun3hsy37km534l09i4c4qjgrryux5mb4fqm3dkos91ht0nwmk6e3kzbhe3fpv14nrwutrt4dzu7x0ftkl4485s7zfv1fyo4h02cqed7fdg1p8vemnytwvehhcav67wcb1jqc59br1'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '63bq1tpn0m7daxurbcjw'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 836605
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 3531473107
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '2q3yw37ycshp20fl7w8a'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'oo1b3udq0av2lju0kzbg'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '7xwtqsokaw91pxd4tzb1te7977ioarbqnxgtfkfzatvfyjvlburrb9j9ffsg0bt58zbcfoesp2xv1dhrah902md0cbhvlni7wjq8gwhwkfpghfdcpg0axkj476egto6d4ji5vgbjtaw4xjpt3o1gkgtmh3bmp97z'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'a8ns2fpckixcsg4a02drzb5pw1rocfls9zxkl84g1g18fx532radb4g7lino20rrjgfhvfo3wae633drq1uruiiv6a6smuk1mdtpefd1zugrdfo0ohyyw2giiwqm8da6w8yen0o8554k2ut80yyk563pxhpoa6m3'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'kqu53j7hbowzh6ucl717r8njudsikj0s8kydqjdwyf3cnd1eid9kxerxj5a773cpbuv6n7i3xtu5x1wy99fpskb0ycjppg1n1kd7n9zevh8821dq9h0p4gq6me76wqnmyw4eooyk3xcq0khvpgvwmjr2vts4xpdc'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'bybngrvu09z1xf9d1ljlvye0t04owoha9lob3vjitwoezzdj9x23fuipwynxf70iemvcbhqcks0q6ph5o6ser5jpzplekokmkyk68rf2yca7qknqar6ovqm9aqszqh8yyqybk2eoaol89ppxhz9b2qebsap88lol'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 2445356274
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 9112599227
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 3008336148
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-24 15:24:24'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-24 06:01:49'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 22:01:26'
    })
    deletedAt: string;
    
    
}
