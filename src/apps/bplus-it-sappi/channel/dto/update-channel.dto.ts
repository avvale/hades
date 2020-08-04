import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '82fd1860-d84e-481f-88fe-0f047985f5d4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'c4bhe5ojgqq2tz04r00ipmkdl87gjtf3f6t66l8e'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3ccf397e-23f4-469c-846b-5ea87b4cf089'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'zdkoi9dqmzxz7yyws2487zjvrj86ip9lyn1rbrwexnfc72j7jo'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2494b540-d8d3-4767-9202-8197a494f31b'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '0tt2x2ddwtnlsvc7ugvx'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '3hb82drtdm9ervs4tjdsdsby6yoyjc7ovp74wm4v8p2s5tz0r9ug66urm7nb50wj06hnym9dv71hzk2efic7egjiuc8oc3fm2zv2famm6yh43ttthzmu4zetd1cpht6t9ork1f1shnmnqteurvld4os40yz2lh9r'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'jnq8hfzke0dqx0it94z2zvlj6a1enxw2c3fnhpscdca0zwb7gl1xm64ea8eo9ywq8y7hsy47k75b9l8pk2vlqc9m4u5z75aebtvzqe25ne0bsoci6eogw7diq5dzx8yo3a08bt5eceqa82jxjaotj7zgm5ptoijw'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '9vohp2fweig02v7cctgb7sacof4pd1s2scb371z4h125zz9u0wlaxqgpr7vm9zz9r73hraqhdt7vbawsqxzqjwzlhubc1wrk6hq8nc201o6ya5y8noy6ce8rh48x870azuw3x5l0wdb9gkx8f0m4o9fxfblg3wc6'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'bnriz2u3xc8x6jmkmzor1ad6pdtuhbsquofhtd59'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'jw9anmj8zbffsxgn9up2hg6e2jnc3h30vwh9qnw5zr4czxdoj41ea0r5nwwt724fm2vexut77hw4hgu3by6tk8nv5oj8f0wgaay6fjcmi0ft32xyhet0he7pcbtseb4lklplyqt76dbpu8nylbd576m5wz1yhqvs'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'gw4ppac778tu56pa2nu3rm0uuutqyonr2s0u3cgz8h3ov0oej7n2msdr99yyz7vh0zeez7qpxlcefmypt6akwo6e5to4dhcwzb2dzeox4v3x5auvrpq9rto9ihl30ejrjw0juy77e0p2kag55xd44w0x0g3z3whr'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'lfqvixf29wnpy5ay649076thvijnrfo5fouw77e0zb5axzcymbuw9is7cdorf0n8b3j9kgq4wvw9jc4ghnbqerzsel8jqgnni9xb4uqkd0h532lbmfj21m8ypv0msy7yxrutw63z1nd0mushyly4fjn9rpuxadrx'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'r91hjrwsw39wtr3vyk4vbof63fjhxiul3bzf1lg5m8u24cyhew2pvet1w9t7t4osasfu1bs73byd11qoho1pa9z4y2bh5qm3npt4cri177g9rhmvazkvqzr6q1e3zxlt62n3h2h0yc0s9cbmp9rb8y1g5fhfod0t'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '4z94zprxuiyeqewq6pvp'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '0md4varlt5gbq16p8zqupg1uo0v3r3mma6thegepomuaicoarsickgvqq0hx'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'RECEIVER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'sbtsj4yurlpb6g0sreadtcbyc6i0ylswzulgz7x9n2hng2e5vctptsbmdftk'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'aeh1e741rydxayjhfyl6l3bcvff8g85bzachzona55w2qy3tnd5dh9l7g83e'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '6ok1rjrsiwez7yu2o9vv1lx0yqbk4fz6a5ctxbyqga6muog4cwl66s16c49qndcgxrmivzitb6o6ofci0wgjm040xb5slsyb8uqgt3mx9nz4dzojp5r4incwp3bh8uqleh4xrxj2gxhixi61w5ua9znqu0g0e55f'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '6qsvt9c4p13rfaczbyarr3s6kuwnxqywlkcuam8x65soaeh8xwh7d106e1r5q92gi4rzezhquf8qzxb3jce6pn6juswcou7fd9lu4bezlxkmaizlhab2glz193f3dibnd4v9woofablhg0e9hk52f4ypb07xjyomfaud3odvq8bktygn151khld4hq9o9m6d2k9ylbo7h2nheq6sirdvkh35lqhvfs7pwd30oqufa2lr2anfmbzuppqnff2vjcfr1bf795tmzt08o4kxd27uc5an1e7q143gtbfdistr24gt8pk5dpes2f0zb6alrfd7'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'oxgc1xsxgzrrdeab75jyah1avejvs5ugeofz9p1vwvoqhh5pm39olaianmj7'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '0rp22u08b9jtii02r5chnzecu2u81fiibs8l9vyc1xolro9787megow2g0b0h04jp6g03lclmvoywlynqq29cy93086alqxqj168si24cxy4at6hihgz1420qpodyzygv68nx9gcu8x9s3ipj54tc8rhqg9os1lb'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 6172938984
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'z28gck6hx5wwhoi9iz8v3pom3s9mttaw5hral4x4g5ed73ryxghftyf9i82ve4pu7weox3zdf135lv06uli9m433zo7rsh6h63mdovij9icjn6z98avjrtwpuyf544jr2nmg5qj5s71b5q44qmlxbs635ugn7xonv8nxmecmm61ntbtw4xpwas5ochdv6u11o9cs3kryp3unxh8eokbkpa19q4axfpiimygfyp79p4femkq36x2xwxmhvieqa3n4kseo02dpm0c9kl62enudoj9rzj8aoted9aoentnc86k4h46dekhhjjjyx99dex10a86jt0wmrgz11226pf2z08se8t3s18dlv9fghhoouhxg3cpzyvzop3t12k4epr5bdp49pxj2hbix8vj0e2ue9icmwci2wz7ddx10v2ertmq2lrlfoi1479rc19hqktl2d5zo9q26215d93yzp6shpqo1c8oc30o10888tmh4fcniajutijbtnhdz7l3b0ebad3iqkdy32t2mepkdhsqve5csqvmmp3xhuuarpwdfoaqvsraj5jb9vlbiodbmw5ett4u6bl3an2a8dgyhmdldvkjofkek403t31xlrbqxjp76o7p5gt5yzm5t027xmr4ctfqolykn6meg77ryulet0xt6c0uhpxarw8rphq8jvfrv9tm907uu21ro18a8j41l4y0vcoyest2f4kx0g3zg8do1ka2vtf40u2uo7cazu3phy021is8ydecyqy2voorb5usl65pzu5477fh95tjabqz4i0iyfe79nr5qhe8622ahkce3ds3351ozmar6yc6i52b6dud1fmqptzlcty0nfl6ruyuazpvxq1byfrxppgcgy414cugcdw2sxa28f89ewhp8bat9ys4wtbty6ja1nnndfrj5hm48h5cyc23xi70shwausdxt7vjydc5d6ev6z5l3e3iuoegiim0l02y5uou8ogfmtptvkr9tsl871irvlzaoksp9kgazpoves13i'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '1kfxcaxwt4t1qj7ln8xdb4a6146clnhj11hile8a3ll81drzkgwxhcr4wef67qggdxo3sgi08j0esg30qnslmcb0igzc2yagupn979w7vacolszly6f88r8wmt2gwn672pio6enjd2w7vjkt1g46iqagrdqr25b7kfqtvv61sa0okbx3xkfo7mpuyeva4kohwfl4am1qtoaxhvkgshfz9aj4tuqlia9w5lhm3ir0ot8oc783wwztaljxxx16dfipxkj7n8krqctlne6px9qzb92rfdjlpdzu8v3s6petp30afg69jwzqn3tlmcmw5r58gfisw6bep2xfyymdrhq9mggafnjr682z6d4d97b5959uczyyvw4xhscm8khpl2m2sa4sb0y0s72uj2xuugncw1h4dr911rcur28siivlw6tru8wpw58nh8zd9ki1nnvxq6z15fhy8dy921ysay99rr9ug3y1lmkygy73cma046n0f3azkrs434mgnts7uby3xarioii5jbvpjzejmfaf3v8r2u03fs7auy79hegp8w316d1f5eux8w8ep54m7krb7wl7y3eaqk075o2ugvzhde2flbgky2ol9vcp5zshhox1dbeysx60h3prydl1yml83x65br9cco4vx1fpvrntgl0i3isbn3isggi01rzltvrcyoc1mbf0s4bar5yck4yi6fheqcvy83zez45s4xfy6i0vtjy3bm6hwhm92yuuma212e69pkp4xyopfbp1un8jrpjmt8m2nvsqri0c5wy7ako0piro0oiwnxp710tjm2q95y9nuamw3hexhirnz2nrm358uwd7mg880y762cciezfnoj0693a7totgqwou33ci4wqw8r4rt12yf0206cn7bmlu9857bc9sr3shw5b6ghybyhbw50u8yiolru3yn47ra8xmj7txmounevwudp318ihyttjjaratunvajn4w94xn3dmb3qev3avc4y7di1lx43116isl9lniqi1p1ocw'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : '2v8i0bubajbqlu7b5z7hi97kkvysc3rfit0nghjrpwes5kr29lxrjs2wbq7v'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 5711065982
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'b5b8kmykekgtsvc3lu4843sie3g7pbucu5phkwlik9m3pcg9f7kbagzocxj1xsn01v7p7k4lxodx82n7kg9d49js98flr8r50uli02820edw4o6i56yb7eysrrr7y8khbp4u8x1ddb30th7ag8two8qntryidbgy'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'ACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : '7pq8qvekbfiq06mbpzf3w0l220t4vhqzgg5upypumpepsrwzr3y1ja0ljs5rksfqlrz05lbvpf66hgyq8lxhe77iukkzats2cfgilffvg7zdkaosqmkdx9kta6osfku3fixvygu0b3nr7ond1zvosv72tuanvx4f'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'oqrbw3neadbxdy0n2fyl'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'zl0fdffrky71y01011ha'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-03 23:15:35'
    })
    lastChangedAt: string;
    
    
}
