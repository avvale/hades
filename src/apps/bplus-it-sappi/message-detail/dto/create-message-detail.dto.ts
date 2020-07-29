import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '686f3cd9-ad20-499a-b195-28c763b2a673'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c8c21ec5-32ea-43f6-aa2d-b6963399e1d6'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'qlnrun08q244k8lyclfc5e4t0e68i6fdfmq1qyctmtclrxdo03'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a4992708-ee8f-490c-a300-5474e2899a21'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'agozu6hdxkhe3zozlu1n'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '2gj74uq48er9fgxkk1hhp4vxbz1rhtt4a8v1186ujo54z4qjdbs5ybxtmpmu'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '90b57892-902d-44ca-865f-21eae0add625'
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
        example     : '2020-07-29 06:19:41'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 08:44:42'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 01:02:42'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'n8n51ixetnrm1rei7vr37884z6f6v6j8z1exgy8c'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'xd198d545yc8ohgqdpnl8o8rvguq5sz01ii9d228ahkcb3uzk5qjyozlp3ujde8ikf9zqj2q8uy35k83rmbyqpet0t5eycbhrpze3b9h5coz2ovinxqywssfur23et3aqb3jwk53v4uvgi7myo57mk2l7s6tzyp3'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'rajsiejo0ygqkvgns2c7t4v9p2af153pqt2xit41dmhtym1nq2kmdc7u3s1ptknmvkhl69o3hkygubdt9yjz1xlk4cl539nuvity5u7osykcgr2p5rusir51jvde0nec2g25babpi7x6y0hr5tvth9794vsd5c1f'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 's0pjrhhydynk4po5spvs0oibymi0icrj7wk337u5neepnwhusj02gbdscjui0g3nlw2zc54v0d4gexcysujuvlc2ugid4cb3fnbv3155df6l6hdpfzp31jddidj1casdvom5sducatyebxo385afpc7ib3pdyu6k'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '2zm8dnt2eihmmpflhtwshbm1n6o9g3f6swsen07lijvi3vd6t1pt87m2otfe1wkv9gibv66810pq0d7k124e3mt33jo7xabfpgeh46r4h2o5bkd4hbwqblod5jicjw6bgktft19qwfqwdljmo1hk3dgg0fnezpxv'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Fuga dicta voluptatibus. Dolore at ipsum aliquam. Beatae consequatur dolor nostrum doloribus aut excepturi. Facere minus et quia. At explicabo ab odit aspernatur quis nisi. Id nesciunt cum cupiditate eligendi similique voluptatem ea rerum voluptatem.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'cjlrhczsnat2qf0z9i90byop496sht15jvu5f7dlfe3futbbg1hyulm79vwo3dkaym4e4ryftykswj17wk3lo8ued97aspr0mlv4866agy5dr09nxwo3ub78esba5h9qk9j2b9jy1bzcyzcdcdx8uiahuxaziz0y'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-29 02:47:14'
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
        example     : 'kdqs3ytmedznbn5jsf6ztvtakp4q0marb4wmtgtqr21sj4xuupeze79zj5lnph11961drqk95bar528sf7tfihx76hxlgtyqx0gfxzciwzveju2kiajku2z7nrqy53x5yr4aoz2bcpfk52cwk8rlpczfulgbyff5'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'ndu5vjvo7jcutti6wwt9l7ot995itcvk00kxn3vhopjpr9oppl'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 782273
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 7310937804
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'gjvwfud6gqavu7kzry8j'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '53gqzsz7dfjonutml9n9'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'nx9c3035gf4477t8kqvryy9be3f32ak65kblfzgsokcve46h43ucvjdgjzg13thp48m51symxvsggesxwkum5jqcmgnpdbyuy5nwr9vt4vbwh365ah6u87dg99s4p3254265mp4y5nf5dp018wmoqj4azd1yba34'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '8v2yk3vz8wtcg3mdrilrrp0jc7ga1faifyttymk364eg1byaeg4h4bw0vnqctf2qh0a6n6lckx79y6l91rybnxoefsdqpfosxlsfp3xp34n4nsoxa4s4twuu8hei9kg0b2rai93nu740rfum57a4ukw4hclmfu0r'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'fyi2173eae0ytw4ioka5bv7h6ryhn4jh4rpx6dvvtu4q5q0unyxev52ktjxwonx8wbu6g9l2vrx5879wdev0hmelqzwphzoysvvc1e9m0i0rn4n9u1w7zulccmeglpphldpomne9tkj96y7q02gtkeouneagd6xf'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '4svwtyvhht3p2sut5e76q4eitf0g0neiqsget0fct3nebzdxlumgm2be078w9tchi5a66xl4yflzcmiitjj6s6smbgsdaxyxg5a4960jcrw80t53kxu7vamyo6gmcrpl12qlmbzrisf69czyokgnutfc9xjioahk'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 8581152296
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 1877486447
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 1030254041
    })
    timesFailed: number;
    
    
}
