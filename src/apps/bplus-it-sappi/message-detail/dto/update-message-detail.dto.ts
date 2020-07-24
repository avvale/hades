import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
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
        example     : 'uwpiur6kz2bnr6wkpl035zimwg8laygu8outr73qg2d6sjwn5b'
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
        example     : 'cp6qmue5xs9bh6i5bcta'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '6if2ymo4f0ap263k9379eg7uipnk2cgxpk6g6wf4jy25hhhnq8jk0bvwpfqt'
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
        example     : '2020-07-24 01:42:10'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-24 06:29:07'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-24 03:48:02'
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
        example     : '13n0tus9y3h86csb850imn1no1cxd8hznenb6yl77bcvofnlr4wl85mflii7bxb5hpc0v89nwcst882ikm7jnqa5q3byplegsm8v10j27e80kl1ig9wpp9d8k9w4fr79fohx9dvcpqg39tp3gtwdd5jzhbqts6sy'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'v6fiu75yfwsxl8kqmbjn0a16cdp7kzg21liim0klo1azibtioz1njrpxnpyrhru8vxegyz0rscmw61g0k3q9tui5xad8zvkx7h61dw8gkvkou87rzgr0iexc44jtkgwl7h94ns2p5lsfyscpzt9uim226bhxbokb'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'rczmpkd6s8kb84jqk09pmwzvreyrhlyfc9mk2oq1jpdmuets7o2k5wskvu8fkjszhtulw22rf09liin69jrk7xxqcuiaeacziuz28bji3f895aydkxuyyk1hzyh9y98rip9fxvwpm4tl6br7t0esz01aaqh808ve'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '6zdxngt9u8d52iylurthvxg9vtift4uqg2fglfrzg9zwpg1vqb5adn6yqbg3uhy8avjdtef6uum27gffssujs3ht20655p8oqwhvxdfw0f5gt837wn6636lqxw42zxpujx2uz0eptwzm4nc6u4au83yay9y9scc9'
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
        example     : 'Accusantium dolorum harum tenetur. Et atque nulla itaque nobis non et magnam vero totam. Dolore amet exercitationem magnam provident quasi consequatur ea hic.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'wn2dnk8cme9royputjmohx2zj58pt02m5z2pkv1p7ze6z0uoqagko2l3iqt4wtje9fi6h1wcpkwiu0dhrabmndkyw00h1pza3h296gkqn6gsdzbymjnc2aslnp4khe5sly618k84oqxh3uau02pxg4ju7o6hlw06'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-23 23:55:31'
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
        example     : 'wlmiutlft0xj8hbw1uuqs9axx3aufw7j50ffa8e2ax7yo7jh65nhpxncccctrtevwikgugd2k6v1p69un7yeshhvrro8kay4ik8j6tbjz8rsfvyh6zzfeput4auo8jqcyc7ewi5hy2sz9649yevk5qtlqtwtb2bz'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'x21ct7t0dwgeyt6xn41o'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 745275
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 7732835624
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'kxz8orme1qff2t764u3s'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'gd62v5ccm0ow9880h6pf'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '544wxce78rd2s9t8lrza5clfadx75yaysju8vu0zqfo5gkpy8elckuycdtpw1maf2twpmbf1oin56acu65h094c8hidwy6mhbp9exhsn7k38sb4woozsdrisaujnlo8vmyxr1t721j9p64qwvuisju4rmznxmbu4'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '266tgrda6hyvauzeqf036dcccuci337iyvrxa8lh2zmbq2va4b1xzrvy8n5kof6na8vlpmfdfzwl6mpbhayjydzmup7oxnpei04efkk86iqoi4s9yo5j0ujvz35ioqag7rn68d7wg4ued4o22ubciee1el1ix2f7'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'h19pqm1yags5e9e59iv09cy8pckolycyosyxsidjkife1mg1nvblsrgp69vriqbyg7et5dvxufl8x611blsoauog4aj47e1wi157hq18r6t9w49f31r8y6qjvx3rhugotp277derfkftjyql84epf194cs7v94ps'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'lmurj8xh59yl29mbcdm9qi2yfxzunm2qpb0fz1p9yf28bcawwikv15dvyjk293nny5xbfz1b1vv1im09c6l0mxbd020l406j30u5y1u9w15wd5kjqdxu5z28ii3tew0hg3m28eh8vpcdbs0mzv9egme3b7w2mkti'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 3205671897
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 7181632596
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 7027029042
    })
    timesFailed: number;
    
    
}
