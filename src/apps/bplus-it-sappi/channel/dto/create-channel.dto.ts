import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5b0f85d4-de3b-483e-8d47-5943196ac792'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0ba7dc83-44bc-4eaa-8df7-16acda49c833'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'awgvwtomn60p526l6k6nr5inctaot1qjc66l5xxq6762dsvuji'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd84fcfdd-607d-4396-81a1-7d832b23a85c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '7pthzeeajsajon6lyoab'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ruteqqn8v273qpxpghfqi3bvus6qgo32bytzumx93t2pymx9itjjd2l5avvomtdezylxp3jeiupxl1q7h0g2j4q5o718nb1g2wgbxd4p5x1y1rv970ub4wbrz5jkfip4c0b5lhf3v0z4jery9liu04ln5n93g9yz'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '1f4w35norc3d45sgm1vin528dmz9iup1auiwtz8bkw341tbdpt59cwojwlixf7lhbb8w9dawi0z3e4q4mb3zrbncpykuss06pls4xs9du6vlf7exq3d8ghiekftlitsmjhhukooe8bzy1o4tt38bn6smlh8v723f'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'l29ybh7g8qk6n3f02jg88a8xvpfhw13cf2ux6m0xgf8cwnjrhclmu2cp9yqq6vbw5el7ne8tzl5htc2pqgizol1rrfjopfrmc2juug5chz3fer2e48xeqq3ff3lwuzsijf58eyhnxpq3qq210hci6nbsfdhu2sh3'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '9fc4c1ef-349c-4ff4-a507-4caff97516ae'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'k1cqc9lzvc3umnwxm2aamll0u6bqw6i6ektfi0pkg7gi8byg4anzhrkskon48ph66cfyetmxbwvhrw68yharqcav8otohi695fzjiqhzxtkwft8im3ztxaji87f7ff3rwdobj0ezw9jtte59l0ypun3c9yfwpl4q'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'miaa9rytdn2lejp7x4ejhotpaquer5o2sij8hazuzvgz11ncagbu3kie2j1so5c6lmtpepl7qzrmnasc1pjgk3r0ah9evssmamxcbt8arovk00645uh08sqq8wb4q48yql1rl3euzfdwx7i8ux7cdm1w4fosc06r'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'exyfgf6dhx3m0g8jitkafs7ga97h0ejiu5whfem2d9qatk028ipi8t4rc9d5gp2is6uwugis2bl81h5cxxdp2vlobcri6sjhpt18ev8c807pokzlupqhrzchr951bu8pewq5flmq8hlypf9dhfexnn1l8ktg0eo5'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '4lmnanwml5vnd2vhkwier12q83m8ce4wi5qt8oku2yrn60oan0pmp7nr0i9pdg15qdeb79xd01ygavkvjjccrbn8c4jwas821dk97dofbkdwo0sevjobnymsz8zfb5vxvhzmo3ehjxdc2oymdy8t2vdl46d5vsh3'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'y60xpqjqe16uhrv4w8yr'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'm1q9u1ubunvwbizi5wf98m0zhrl5azuur1ih41k6tgbuzlyfv3g74l6a08un'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'SENDER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'yjl8k8dmruf6ssmy5ho6gi2rurencz302udwpw6tig8v4mxsxxabzce5zsky'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'lic6pq929blvn5ls30s7vl4g2w65z9o4sskzxwkrmcuehfvfc15u81lh9dml'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'nu2zmq9i0zhewxyul08qkhzxmgwgmu6rkxfe5fv9bvp08z9967cfqqxrq6v8e9ou8o20vmzexu8atpy7pcb3coam75rmwtktlz3evhwi21il56b2hb5ia7y8qq8zio9i957blmkigi5wfy1mjys16dh9jxws1p6m'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '2f3qcx08koz056flddt5ssso8qmgqn0raauk1biamno5xm2n7dfwj3bobb0kp4vszna1e4c6zas5vwwueqf7dmjdec1cm1atv52bm5of2mh39mmtww1i1bn39mhyxlukigaf8rcfln1sbz7llocrhx37x6o57bi2fhnmwvkuofq14v6cppahqts3zdajfjw5pnus2034ecbky60nea40l6udqfga6875txhmdq7s9317ogz7nf99hntthsx61s7sanc59og9gc2vuog4yjw2p064hzv10jh8qynbrzgt63kcjkhx0ux9k1qjzxv625he'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'li0dee7gb6hxi88dx818ps20qfz25wiwpm0o3o9nod49dbqkd0slbgbwclgb'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'iuq4rwok5n1fkzl1z7d0ro0z7n41pfn2uwar7wxe6ek6ek6009flo6uhtnfysbe5g9cwifoqscrpsdwao36zm79g343ukhxcdqjnj45ykqt4kccavr3rdoc6o3kp2y3lpvaca3x3o6mnbpy1h68g6yld9mnhydqc'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 8511245474
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'igkf2sbbomc3uf5xwi2uijrmgo2ulr7098h35l3t1532ctxdhbmwuhn1xcrvp9kyviieb60m7ddb2u9aa3d1bq5m630l2c654zhii6z0ocz4thx18wh0iho3x0jkoep1r63b4z0y1cwytj5jcish8kqkv8nmj7guj0amm2siz6prj24pfk721x49p02fpno6xv8ppg4chc4pwk8am5s6rfqvgf50hgdi48iq7kp9k5ygrdxamrslyhub6bigv835m03nsys6f36tatp3jsepaxhlvtiuwv3o2tfzbs8zc3hdncy3j5pud2mdd887hl47c2th052b4pvbx8laery5zzykr3y9gsk0wjw5jdyr37gy8aipgjury0zg38auh0xopc68boohurp9ufke7wcv5f6yn49d5mszvey3ms7uyux5poe891jsb2uwlk04z903eiv75lyvz3s7fdy0lysqnyggxbbyxr7gxsfwdyz4iulwi7t2ird2oi3fy1opcamuvga2982x8nclxtgifwklpwsva156c8onw1hp35k3aarlmfthr0cink8xd6nbn1uh43891napblbp5jf7hbchflo8nijlzkjyxi53lmofoxiuvkivi1vmizzx0qn1vmgty5hk90tcygm26nipnfwxx35juc98skviv5av4car4t6z31ix9flkobedytbfp88k8z4a6bx396c8d9gs6wo1ln39qx4j7zksog34n0nju96smwzoumb0ph2clhth3xz0rvnucqn4aj2svr99jebrrfg12a3tzkvup6c056k2qndj3eqargowvp2wbu05shkrbnhwz2bgsxt851e3hfhuw5ycoyid8s7adk9s2rxxa047hjnuzu2pq0poxzeopcainavurnm8bicdgfrt4uyw4s2h9eb78jrk71u52ebje00gle6f3xp0urgs4d6vue1jtp4jcmnnzddclt419gv3qtaq6r5z2ovzwkw5o8n87c103oz0yxzcsdf7dtvak89z'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'fmjdzv8v964lpxxz6drmhyb0x3b2n5wxnzvr2gpyfdyl0driq2i9vouy7f08zvx69v05om9qe070wlwxi6vuam42f9o072fcug9evo84aycq7tzmqt22ib3bm2vygyy4tb74nrt6z3lyiyfv785ucn314t6b6scuelkgsb8uzah5xyzy15riu52pbh3vhalb3oe77ijpaq3sf7pl0uibbsx92686kcpsng00hxtahkduwxosvqvsms5fxyhr742iv706an6bqd5eu2ec5cqtpv86gj14x9jscufyy4xz8k7wh0xi1j3mh1icns697bzvu0bgtmk54sb9dktf3k34lmpth1cdjknrhhj8xtj2c33mvwq2256kqoat4pb3cav5jpfw8mrsiavx9rt1nlhdg7wi3qyoe6i7h3i9m2nxvcw4taj12wzo5h26x1svxmlc52wthqx2z8ps79yap92s0hotl9vo2iih8t9y0fyc4h3lfiu23ucu4rgrob37orx6uagr8mdl0qf1gnzns7uw2sikt7fansc41ru5igchfyjd0ow5uxx03i1y6q313tsitsfwhou5kea1dj86rocf6wfuim6o4lu9uw5b5bstp5mlxckv5notn8t68tgkrzysbmh6enuk6dx6ijbbu7yg7tvaujw48de623mko6yhya4eyi4gves81c4y1p61h0jxq7nvap44mwbm12suw0k68nzdth6z9ethhl9yp3myw1z0mod6ms3mpyih64ofgwk1mfsvzog8f2md4tosmztamej1ap2qecnp9v3fyj4o11fjghy64syprkgaizfwgudsgbwof11qv7bu6to1620xj7d8k7569uhmdv962lsvuda8f9y2o26qtzx7k5vziflu2mvs30g7gv3ahtpd4xwmmqz4s4c4emqxwzk0bvx7nyhcj35oc1ewwuxl2ejyt85vwk3do2ijvoop4qqr49wt849lxvlk1c09jorkk79r54kvd7oqjzkaadxlsufs4ky5'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'p7sdmz470hranpt8eypcqykqkf36zi11lb9o6kdk8f4ifa7bwqy2e7osovuo'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 4321325160
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'dx98u7d14y2wnuh2dzrcwe0er2466h9ti9zta0nwvdo7am7iqkc8lqssyf6rsq9ev467uboqx1gs08co8zwvv8h93ppfi1zbj6vq5yh7unlx89ysj8zuo9mk0jsbvxehuswuxef9udztgatyx4l4x3asi9roppcw'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'INACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'gmqn41zmtno1eybr8qotftxqnfnb7kfa5laz5zliyuaz345mt6dysnd694ibv0bk1ncspwf7ah2pvub71pd7jp5dr831kww5prsg8p0ivyzn6n92nj4rc62v0q12mi7sc8p5sfoup6ypzbe9radj1176opdr5z47'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'k81meg3j7u2nr8qyznqd'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '2owlx8k9zyk0sax7mbx2'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 19:42:04'
    })
    lastChangedAt: string;
    
    
}
