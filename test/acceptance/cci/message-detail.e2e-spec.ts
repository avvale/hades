import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageDetailRepository } from '@hades/cci/message-detail/domain/message-detail.repository';
import { MockMessageDetailRepository } from '@hades/cci/message-detail/infrastructure/mock/mock-message-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('message-detail', () =>
{
    let app: INestApplication;
    let repository: MockMessageDetailRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IMessageDetailRepository)
            .useClass(MockMessageDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageDetailRepository>module.get<IMessageDetailRepository>(IMessageDetailRepository);

        await app.init();
    });

    test(`/REST:POST cci/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'b12uv113iyk291c079319g2ef4gq47mnufk6n7prlho3n4es68',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '6hat135phrpjap8cxihv',
                scenario: '7iyhtpdbgt9mmia9t2c21xidrz4mrjliui255thxyz5ex8orxgmgdp00y3ol',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:31:17',
                executionMonitoringStartAt: '2020-11-03 17:43:48',
                executionMonitoringEndAt: '2020-11-04 09:00:47',
                flowHash: 'sbvt1q7mr47qhl5ukt5y8cezri2uiak0wmstqr92',
                flowParty: 'bvsajualqtlh0a90f0elz4ivhz49tzf9xxndtg78a44t13v28b4xcybs2cqy510aklazp6le9hbelt4ypo3mpo9leowmdtwisnc9bhijkc0ai40utknb5yo4ta2eiz2tuqo7fqfiyk9h4azuhmgcxkwhtkl6akjf',
                flowReceiverParty: 'zkodqy0fmsvo5ndd8tdxwcqbdojcc7pr9mwf8fdx66vv5v5d98f9awfb5kvlgxgb6452anzfzy9tummeo6xe88cbsl76wchaapn7v6o6zrcvdxqx1y0e0zuezras9bpt48fmg6mqcn9hleup55nf2g0puaky7t3r',
                flowComponent: '8bi80d5z3hvqh5cjh3f9jdiqapbppm4rws1ertsu8z4lx39c2en1e8o1lyluz54bjo8ik22nyje8zgangl3uue59loxhty4urofgx4ahft5mimezu3b7gc6yqpnh1467a724cixbvms8zw061r01nuymynycjycu',
                flowReceiverComponent: '5czqap7b8qsqsxd4tabojniegltaqdviinqdvxs8fqnwfhiauelr6yvsdhij9csry6ufnbnuvpjp0h87meqk1akal0bfn4bfvajdvpovvjc33exoqwy8wnnfqvalcx2g8pzcu2x7lppfgxattb6i622aj92d5snr',
                flowInterfaceName: 'jmuawqrlr1mwh6zfqc50gfk4qtf2ytolqbz6on9dkjvtul1hxn51u0xf5wcyw5qorrpcry1wrydqwwwozm5wlggbhk1s2wfin27ejaj12ey3f1x34mxzgvd3umgd7285ppfb2yt26gautcdo47egquoytar0m87n',
                flowInterfaceNamespace: 'vq83qy1ltdg6x5f4u5a6flaf5jowkx6to7kag13mr841ujg4cg30ihnvhomih63n9wheq0fremx65ues2vzhcpajyhr429orl233xo5d7xat9viqzfv2qheveqtugb35h2kf4wgjk4s8awzmpxiet94q1ua0xnoj',
                status: 'WAITING',
                refMessageId: '3718p84qv1guym5pi4xpgmoqco30946i5yttp5lav3dhqzu25icr4o3kr41wpcaoetwfho8jkbr2ugeumq1nghk64wqgdlj153qb84dk1xc3x2b7ni0wwpqeod4p7wwvqu9azcx3se30tbsgwml4jkw40g1acbc1',
                detail: 'Ullam harum omnis pariatur eaque. Dolorum molestiae et sapiente in. Alias est aspernatur id.',
                example: '0bj00wetptif10sen6p7gjdjwi2uvv49vtft35xhsa7m0qafe8rmbpmihzww3t1su8errpkts49as02aaykkiix1jfhqe8120rpz3bwbvfcso940u44i11gzt9sr5yv3xjtauc2p2j3saet7rmr76mrek5p8p5q7',
                startTimeAt: '2020-11-04 04:25:56',
                direction: 'INBOUND',
                errorCategory: 'nq4irirq9riaep40q36quyfvvfvt64mpn134hnvefbny75cgvcm2de1pp45ahvrnymiqx4tp37pflqy4sdclmvn378xapgett9aiaw2zuokuxnjipn39l9r0a9tycm07t6icg6nrmyd94ixivbbllrn0f67xs97f',
                errorCode: 'nmuq6q0o0cgak3cr8dd6zzvh5gec56fgqzgvclcaw6fy5pu9cb',
                errorLabel: 104827,
                node: 4265860787,
                protocol: 'p9ow64q1ajhd8z7b6ln2',
                qualityOfService: 'vgeexyl2gmo8vd373wuh',
                receiverParty: 'c5ky0lihdj2b5y3icadqdu9daxaabf8femc0zim9pp3fg156k3x650xi5u4e75kv0n01mz4gxbc0rv8rzaweyenx4p3f9x20rpuu7my9x9dpb12onsi6fpevi8ujftp7brnmofrew9a1th2pn16g4hkaclag1rxu',
                receiverComponent: 'knvvbm46urbbjf9jag29mw3oqi5akvnmc87269ytf5mve34orff7zeh5nh5f6rss0qcxrh9bowndizdj8if9xlgxzz7x9pc2jvcbrsdw4ltlt2rn9h3yym5muag47wot6ctlsf8jfjbbeqtqac0vbgpnrpjcf6bt',
                receiverInterface: 'sddkkx7f3umbuqtqri4e296i3jnc61f0uh717jw2iwn8a6qfhkon3mbv3etatjr3u452qeg5njmqvnjfiqus3cs76rxj5tfoafvfj8da19zwerxdeevp4t1jz0tsmmrwux29r7z3wo9ongw868pg26x6i8asnbvn',
                receiverInterfaceNamespace: 'ri4r39nwgj9hymn3p27m8idm7k831v55i6zkqatlo17kep8qfi0sd4wetdo9z4vf91ana0yeg6h5g0upubl4u19g6ha7n9pnygtqplrn033mx1auf1aso4ockw0chhguecjoiuupfqb73rhaq5avr3rxeoopvu51',
                retries: 5631939866,
                size: 6023019298,
                timesFailed: 4858117746,
                numberMax: 7131103123,
                numberDays: 7823118098,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'd8m8lc733zx5w65qs083xf5ryf89y7mm3r6ke2h9np02rhhtwy',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'pt2liu3b2hnlc75r4lpj',
                scenario: 'xstxi2895vopktw5l1rn4gg1zt00c2ywlsbdxvdkq059wkzsg5e5bgtu1v58',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:43:18',
                executionMonitoringStartAt: '2020-11-04 11:12:51',
                executionMonitoringEndAt: '2020-11-03 22:38:25',
                flowHash: '8pla3j2fx9k7828ddwfkymn0h2ey5env63z7js61',
                flowParty: 'mxc12a5tgngabmbywbmztvnbo8xccuz6oe3kubsosxh1hldwlmxx5m7pnwm8a6xjgelv4e2029iu2wydz8rz81oly5t8401apeafk3h788rrs4lvrnrz7yofkkmnkk840vz6v5xefswusgcw30x0mk6tum4254il',
                flowReceiverParty: 'wbg9n2bqbsi52schq2j7ptmw2j5qwldmuh611jhdmfyg085286rb9eri4ah98mogg5z2gmvkinbfjh9hgwm6hmuc3ppapcc9cdkuu7xhr5qnfsshhbq3965l5555pqmqjlxsdvy3z1h10rs1n9ckqj8fq7mf006v',
                flowComponent: 'b87z3r00g6chajzp6zqyfrgkwzloy3yhxx4mzuxlo3h6n5iyp6093ns0ikd3cets2ugh4r0iixkehyldxtdjyzypha1g3ggjce0xigaka6jxez249owd4b9n5oc7xpym6j48hhtkgvmshcsno88pumv3x7u4pl95',
                flowReceiverComponent: 'ldy9q4ewrwybj414z0kp1eqylklb8t02vy7l9nbp60eqw3s1a2ina38xk2patzrhq37dfupc961ebsqcwxo9xx6wdqruu0ype2v8k0g9dlcww910is6vblf97gkkld48atpdhf4xf3bsiw1d92gnjz2a3cmrqnuc',
                flowInterfaceName: 'gr2e37hg399u5xgccg3t9z5mdhlp6kb7x8hf84dsly202gayt1lr91zbfn02npunbowdlfi0f85y2t9ehvqczpew6qo43gmyohu5a6d30iq1y154chwc13gr4pylrwnktbkv5r2lyc0kfaaisi8wxwomsmdaove4',
                flowInterfaceNamespace: '5ipimikxyoax8pjkni1unqrpfa4frl1ibhon54k911bbeuj0mp35jzhf7p96ek648v9sp5tpx2hk7lgy9vp1st351ur3k1anwy9m4v4czr53pgf58th0jceu4325hf2x9ykjdodtwqfzect29k10dzfadrc0hri2',
                status: 'DELIVERING',
                refMessageId: 'u1vdeol5ymuwl8uhdudcbpj4jip4jbhqo9v5nqqokqvfgrvhk2f21170odbos66sz3s7bj1tkraputqu6f4n4blfqpw76i74fcezt4rak5knp25qrjz9jiauclr6t68wsscpcu4ybmjbi7cqwyy63xcl35w6ab6l',
                detail: 'Rerum molestiae dolor nam eveniet hic. Ut doloribus ea provident. Nostrum voluptatem culpa quia est corporis commodi ut.',
                example: 'thl4r187qhivckls3gt0e0ck8n66hmu506v9cnk7obgrbv0egi1ir54jjzny2wu8vah81rqwvo98tvrroixw19tckwu2kmqbmoawbn534qimqzl0fuyxm4j4u8qjiegx2k1ad3ht5gfjv7f03xp1skp3dfjg04kz',
                startTimeAt: '2020-11-04 11:15:46',
                direction: 'OUTBOUND',
                errorCategory: '14xsvghk6orj80eoxo6fpgrdkr2pqygtxmvsoett1kq2hliwpo6d9p9twydop0ebd4f9vutrnfsjn1pjnlsoi02676cpgjhzwk9xgdmynv0euwol8uas9e75o17slgw3kzgw67m6prnahdx18pufn4rkjdz4rmz5',
                errorCode: 'd1l4uwug0xvnmdgommt1yo68iekdttvwywid6lvfsiaaa90z9f',
                errorLabel: 968563,
                node: 7777591262,
                protocol: 'qqw5pvg30mbgja81z2wu',
                qualityOfService: '04dkuiben2zuu05h418p',
                receiverParty: 'l4wj1p7ppz8f6hza0ln6qd54vxd3ewyo69o2qf2t82xxdqoh68ybgkpqdraybr0tva785wlceqcexk8kcckupps3dxkl3jes2r1gww37ouus8iawbhxjdvibz43qktk79ath009pbp7qh4v83q5j5ypybi325j8y',
                receiverComponent: 'hwzgqv5teq91hxjvh39bp5oqipcxisr9ut940puln7hesu2svcb2g4d6a2wn00wtauqzaw11smwlhpz69ccr7wg46ch79vukw9gztkq3hgo41v6ggpfbj5vmy5nr4b2mbqlhhegf9c59rfe9j8fg02z2e43l74rt',
                receiverInterface: 'bvo5j4apz1b4tksvzbt2dbyh4rntsm87gwtku9u7r2fxdsthru892zi6883mdtg9txs4gvylhygkur6kjmqy8c2h2gr1etlabkj4c3vft2z0ujvdw6axwb99dqc9rzibikda37eiq4h9q9oihy3t55ow55iij014',
                receiverInterfaceNamespace: '8t739koi89alamhmrlao07hz4it0aas1c1h4ti28bb0ieaq9m084k03h076d00h4qhwzp8vwzekp6zklqx472ovr8rrrnjntttvfvgvj5f3jj4qwmivzrw3cp1f4ut2rfa5jgnje36pz9r8yqzqlt8xpdhfito8q',
                retries: 9814086225,
                size: 3713373565,
                timesFailed: 5734056202,
                numberMax: 5607282227,
                numberDays: 9698488537,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: null,
                tenantCode: 'qi2iq41ts89lt3uox0x00vy1zmc9lb5rphqu99mqdxnkiihumh',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'r140rsoizg7lugstdrqx',
                scenario: 'er1eubbdfiudc61dzyzobzapcnca0pbahvcyo53w08i7cnoi9mnvkp71jjxs',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:39:49',
                executionMonitoringStartAt: '2020-11-03 18:47:23',
                executionMonitoringEndAt: '2020-11-04 01:08:23',
                flowHash: '96vzoxefrvzk4s22nms33yvashfgaojyf50mb7ta',
                flowParty: '4oobxq9vmycsx03xpt4mputyykwg5kfinbyexcwl973qqwy3pggcgbyrmd5eh1wyqxob89k5j2x1ur9lzgy7ygp9b61qgyvt7v58uiqdaz19t91rqur7h26bd3cugsm31aetkwwcj6lhrgwkhwnd01kqd1gyoo97',
                flowReceiverParty: 'r6ezlxy7o1eghbdsybo2kwzijh7ggv5xbz61j9ztj5b8lbylvrvqzolt9pfxmnaqwgnwnq5ubqlcixrz4fo7t73dl4yb6cv9wtftomscn4t2xhfd2sfqx090ig94xe99ufuykrgcvdspx1hhtjp0bmst8ccygekf',
                flowComponent: '9pht515y3y9odjejebj4nsbvco5euz1u55bwr5si2zq0cenh4iz4gixrjzn8wvkt859hzcxzhkogai6isdqmbg1iu4w4uhc7nevpjoumrlwol40p3wqxj0zq8r75ch83e8v0bnjqo7q0wz8zrrfb8wagv644si2s',
                flowReceiverComponent: '8nacluij3az11fhevxry2c3gkqm3xvkn1e9kcklp64kfl0vin6o59i1fpz3xdkyzmpwy7n9egiggzwz4rknhww4vne4n8ev59bk1wub86xfe2rq65geav968k1i2571a867e02xs0f5wsnxbz18dhmm97eglnwp7',
                flowInterfaceName: 'jki4ekn9nkgd1juwu94e9zlvvc2egrd95r1ow7a3sgtwxy3n88ffpy9ysg5otkzx6z27nopczf8rtqkb3isjn79lw37x08ek7ddxy6lbi4hqggfpy0o09ezj3qz40gzz6p4soz608i7mbz1c11qjwe98vmssrwan',
                flowInterfaceNamespace: 'bqa8lnu41h0g0boxiw6yluo3xak10sq7gi45nk4cbza5bmpidt6zw0fyd53pus71gyhdww1srmhar9evfuui65yjjjv5ovhwsed67j9zeie1dwc2oc6bjzfno411seaxuenile0245sdzlas1y5zp4jmbfoi9z5o',
                status: 'ERROR',
                refMessageId: 'plypix8fi7vem8b2v9n5t80i4wuijxah8jnj9u7p3y1qowraj1020asyjnvtf22ow9chzyx53jc3aos1rppkkue979sp54dorq85iyqeizzworxgll4tesah2cys1pqsonkwzlgtwb0y8lfs5eatsfqjmkkqlf0h',
                detail: 'Sit eum rerum quia rem molestiae. Deleniti est hic dolores dignissimos enim non perspiciatis. Id qui asperiores fugiat nihil illo quo.',
                example: 'f1mflreapjudiotb9c3y7nea996pyg1fnba254dge4b43rgz7pdlhrg7vxtqqowqwxezh8tj5z0zlmz8d1dlsw09cz95zpe0a4s2sxogayhmux6lnnrgvzqkw51dazr0ufz58zsctrr1j6q9nn1j41z5b0q7z683',
                startTimeAt: '2020-11-03 20:43:05',
                direction: 'INBOUND',
                errorCategory: 'lhkl3t8klf78oom6fi0xp8su1oqneykq0tcushyzechywxm2vnql4oknq7g9i5tpvd0ti3e9vudscs4wa6f2ut1f5herqtp6j4df2tgao0yimi11c0m8infut2e0whje04xobqpwfuzqdlqph4b6ijk6ep1riyiv',
                errorCode: 'rn1bnszhfq8gait9qgmpz7y760u3nl3sijhm48rm3rom9hassf',
                errorLabel: 523775,
                node: 1424513072,
                protocol: '6hvr9k1ioxlt9x4g1lkx',
                qualityOfService: 'umbqjdvg3cp1rlyo0wmi',
                receiverParty: '0sdsvviwpafve2u978ceiphbgf8gx0vcrlkir9mufb2u5dxakzc426uobhad7lraxygqcbpoe3xlpi7l29j9li0ufxn90zgi0j9fmu0a0xj5y03lzn1v8n6449hqc221nmrk6chsqnx476xv4kasc2lwcmuyppxm',
                receiverComponent: 'j7qceuptodrrcxlq546qf0g9nz92ow92ir3lkp2hxvbbtxwz69g0v4ha9b8yaelvm6mzdmhtb9pwic1bqixit82nx9gv724rgwv3u5m37wwellb51x3dizn4gi5y7jzp570pwgfw6m7x6usn0npiy6k1xal1yfmo',
                receiverInterface: 'bd2mi4nnexjl8s1qw6wvw6yg2mvs8b2yo3srfwupuj0ywyl9b8q0ozpy759jtjor2i0sjxkmfv2l75x7jaaq58he8g2dlmv9orrr6qpvbn3g9vu8nfa9wuryq9mxhjehut1scz7buwrxahjjrbhlffrq2t22eihs',
                receiverInterfaceNamespace: 'xyippjhykuvk1m6qra9yxs6xxm5f7sgddr733o75nouoywz498gh6xa83ucfqg57fczc0jesgiqfrkpshzfx90aigwyxle95ze24m67cy4hqq369mo6bjrpeydfr9ahcjvpfjkczunqs30xtkhm63h8meqw7uanp',
                retries: 8883400228,
                size: 5724414436,
                timesFailed: 7791684375,
                numberMax: 6638082638,
                numberDays: 5498239525,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                
                tenantCode: 'mjthl325hawwln4oynm9gkbgdf878q1mm2zu73z4h57txo5tfx',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '0cbcy0ftoyh3qnw7nq3w',
                scenario: '5teutlpnd2fxpqqs4tut84o07h8ek70mhkqyu382b8m5dqjcronhtwmv87xi',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 19:42:36',
                executionMonitoringStartAt: '2020-11-04 13:29:50',
                executionMonitoringEndAt: '2020-11-04 12:10:30',
                flowHash: 'pglkq9bbku6ig7erpfx69sbg4pd7rdw3qlfsafuy',
                flowParty: 'ij8mox05ziu52qb2anr47ldptv82eb60dj7k2k1o0q2szkvgc24a6ba4h6sfrc9vxy6v90eg3iq04brodontksjuv8r8kc8rzipqfr2bzd4hdauwiabu7husoyu16w3qff6i2mgf8evr4782o7leai33eulkb658',
                flowReceiverParty: '7vy0txblkylorxgk560jj49rnd8zx0o7uqus6lfrs6mx6y87tuc29v0rwhc7zpl86b6vb99sx6fihu8b5vf1ecd416ku217p6qx9c36mymx8655x5aduii1ashgueo1phkt77rp5dnmr68wle4vc3c0kaxm8pen6',
                flowComponent: '6cdlsjd16ljv9mntwc7s1hmlrtfq5h6z98yawwzwpex5ercdkfzbs3otop2bfekr33et02crh9gxgppynhxc3y07b4jzompd6yvx9e569b0aczyapjkely7klmx4f14sy48dmj50js61jicktxywucd0hjbea2pf',
                flowReceiverComponent: '9jwpu9wgd9bteio5z08pzypmmhf39idkv1zouomon6j0ydu9amcfud42qdgiy7aujjdqrjoe6g9hdu0vfme0lglbx4cllvswtho58fa6xnql3xipnu2sd6hg0tkw6ptr36qnkscvafbzw542z841nv3pmisp9l6q',
                flowInterfaceName: 'jytv3tt6iuj649624ib12qlcefo04568d2d6kv5904lguh6ifbto4hmit370axxc0b00zszog7vq94rcui7vjl5dyiz46y12sg8fhfsvddq6p1gbz8vr7h49ceb2acql77a2bbbjyvfoeqwxii6j9ldbpaodnhr6',
                flowInterfaceNamespace: 'ncl3cqxsz106nifu5xjy83aaiz9aiofpeajw4k62bv3gqkoqpopgg59h65y3x90r18r04o0vst5esf63w0fds269k1fqroyzovnbw5wn5cds45i14yj0dy2jsc2p0ewaedqk0iku7yk3ejys6r2ij0jwtojeg5l3',
                status: 'SUCCESS',
                refMessageId: 'rd81htpcfp60v94thbftzwtb9rbybzyz1yd4aolj0nusfbudqdi9ip17m85rb2dk2xlpt60mt6a0lr42ke7rl9ouc1mm4pu6dxmee3xy9xqt8pnd7osmek1o6819gljouqrqu0um8zg2wfdhef16zgvy2mlslio8',
                detail: 'Necessitatibus consequatur et earum. Qui dolores nihil. Aperiam molestias unde vitae delectus quas unde aut voluptas cumque. Ea quas itaque similique sit odit consequuntur enim.',
                example: 'vlf5hg5pue812afp2dv0x77kp37f362429z71uyl124evkamfdm05wcjfmda3k19wjo5o30gsrgb2zlm7th57jxb2cg9kmyabent1grt3h3x3f2v7l2qxrdov9d8fy5h8dg6u3191oh65ir0k2blxrw076s8a3cf',
                startTimeAt: '2020-11-04 00:05:22',
                direction: 'OUTBOUND',
                errorCategory: 'b2gmrhqjpfse61vqymhxoa6lc2kfnsy2ipa8jgk44d0lom743omx7yi4fn43pzyqplnz7z2zud2wn9a1njsf3io5v9r05smzhh57wr4zv06p56m0cfpkcw1sld2mjwx69i8j18ohbtgs2lc7ble4d1utqwv623x7',
                errorCode: 'hog69tgf76a7up9z6bsgw9lyyfsq6veokeanvxatxs95k4jwax',
                errorLabel: 496791,
                node: 2863991707,
                protocol: 'hvvfhjlcc6w1fkzhndqr',
                qualityOfService: 'ff08x62e98dldytg5i2h',
                receiverParty: 'dmshr7bvaqq5fk9efoeynkskdz7t0xuh3my1bvld8z8kc4ely8n5c4djtrqzj10gy5ji91o91xghrr4qmhqvj6suvtt7muajfokzib9euwwx3hbn4tiyvtxy4asobxjvfg4fytvensrllynn3glve571qvs2uh7u',
                receiverComponent: '6hozxlfktyhtkk47x71oblfu33t8imf6rxgg6ljddrqxjej7g79xe56r4gfmp8adwjw719lfy4xjnz5zicj2i3gge0h8qzveau0r2wek7jithijyh039ggnjxbpq151uqinzh5n0c6wixiwcbwo8l1huwqtcbb6r',
                receiverInterface: 'oinxog2uuyb64bdriui1zo4664ny3rtwf598dpo5kxck7z194b3e6wp0onuh4vs0uuxz3e0ftvwhg5kbad987wranl2l401ikh1w2paj3jqa4ism3n4u3z37e54jfdkf9t7z1o4tfdhgx0pwbt3m27mqjmia6u4g',
                receiverInterfaceNamespace: '6s3m8ax66zijankgirs75mn0kpg9ywn37m099m3hvbbj5q6l63o0i56turj1urflqbr3bql2kezmx83xgxzbkjbpsiv67k8hxtj6bs38y7a8927sccvpexj5yygfmkf6luph75rgxv0rxeqm1ehs2ln2ra3d7dpc',
                retries: 8853414230,
                size: 6430100433,
                timesFailed: 4988219719,
                numberMax: 3245318827,
                numberDays: 4067167270,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: null,
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'xv4yp831jvzjfyecii34',
                scenario: 'en118ukens16xpnfviiy4ayn30yoac1j07jd1458iz0jz6h1ghf377glt78j',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:29:31',
                executionMonitoringStartAt: '2020-11-04 14:46:17',
                executionMonitoringEndAt: '2020-11-03 16:32:05',
                flowHash: 'qvllzapns49qvyxncjfa9mxbbr5dcfz6zh4bq5s2',
                flowParty: '07jhs9ycy9n6twemlquzqeauk4ax5jwjneh6dahh95d71thohadgyta7fczxiuwh473s95ihwiervfhzbgdu0iewzrqyvqy6nh787hl9bfpf92vgecuyozp5ttyy2qyfaveduyxwdwwihfbi4t5qmq54cpcaqtof',
                flowReceiverParty: 'sepq8j77tch98bg0s5oto3ep6pyybk4zkg6a98rwo1bo15xz6f5u42ltu7oeil21ull5a9snvnf0js0df3i98sb56xl9ggueup2h0w7d8d2sep8xve77b916sqpowwjlui3f5opomxkau2oylursw44afcgcjf7h',
                flowComponent: '4h1wg9vica8x3kaixszmly5jag26nl38ua23dljn9fz74bqpgr18dqnhnpnnpsiyia65fjzsh1gxopdgrtm7d9i2prnfulkjgtaubt0r75mwd0cbz8imt8oglehzqyx081m7l032ilqosaah99qhalhwbwjienz9',
                flowReceiverComponent: 'wxy7dfzfdq21ke6mgxr9zozjjzsyfktxj1n8pk0de1mm07x3y1rrqqvpbe4caj85xf2aa35bp9k39blokvaw1462zur9idhiempu2wexc9z0mr5u7wpb5ql9a2uhxxzq7qudnvu1y9pe6jile90pl3qxz7qalx52',
                flowInterfaceName: 'ainqxgrv4mr9trokce2m8yyl9m39nwa07iy0j8eozqjfupvi6csb0vt6pi96m9nplb6qgny08ykkxbrcqi6uzn620h8wpbgysqrcd96karfqg18r7df4tsbictkql8ydcoqmicn0cm8jw9lf10drt5fehiz01pai',
                flowInterfaceNamespace: 'y2b4uhll3x4n5ynynidxwh95szpdvdc8ftwtvuxma0wims93fku3e90ciujh9ietlyp00m7zxubaxpiqszjs11r1v096gzillmfmd1o8vtepiq0plqi08xubrtl1nhxpjqs7l36ikmcjd93g5yhn5dbhac83jhk7',
                status: 'DELIVERING',
                refMessageId: 'st0ug8mrc38odveda0owo45ad3jpf3r5kpqudfww22zm75la1ed58j39ktzw7ocn1wwy8pf4utucay26rfnfr3xmax60gozpk26h4kkdmm5u6pjuszgykr64dkixb8oo390gbvus7cr13wrv66lcfqsusvl2hvzz',
                detail: 'Et sapiente quasi molestias consequatur. Eum commodi sapiente esse. Praesentium inventore quod beatae debitis laboriosam. Rem non voluptas reprehenderit dolorem accusamus dolor nostrum quis. Eos suscipit hic et fugiat qui nesciunt corrupti.',
                example: 'ec01lzw74pmkw7qsl1xyr9opgpa0gbw1xsmoys8m0q3bjji4ampbdk1x1oy5i9302c8394zyotpphtqy9dlh1c019u82z2afrrfamb6sl809007lyuiaw5ovdpbapbicg0ranvv989cyriifm3wat01xch83r7kw',
                startTimeAt: '2020-11-04 04:06:07',
                direction: 'OUTBOUND',
                errorCategory: 'y6l5bs75rk2m19rdrgi5jaibiefkzv4uwret2b61htd6p8ysvh4112gyly4pbawmt62se4jsao3qa57hl83ftvh0kmtgd5sov5xd7irrbnbu5msej9hfrcbn3xav0rc5midwjx624wh5ihs6wdq04icck2agsyjx',
                errorCode: 'x9vht9scxs4k3mue58kd4joecard1vztlpe0794iddqk1yhr4b',
                errorLabel: 965989,
                node: 4086181612,
                protocol: '0uspms6150z0y3u8juny',
                qualityOfService: '9cic1i3l32ibg2dbgu7r',
                receiverParty: '6p5ard4pkjy7iycd6cm3o2tu37v5yz0ne6kfgz5p96i2lqbsd283lb5o7saon2zpl4t7mqtfa0glfvgzwz4jkg7jb4epouycomakb6ftpn5jyvlzcaz88zhsx44nh0tdczmfkdot4takktyl1rh8cq74n1cvuhx3',
                receiverComponent: 'mfrshljnyagdqzeqqgfbnghio07do03lajck5j3drfx1k97lsm84ng3dj3wlzvx3bagvx66mhen3rgtovw9ur1ib1srvjdbo5zmy6ta7mzar3frre6s40li6qv9r8gnjyudq19vzfkqjl3i1zcfydxjwt73ioxfz',
                receiverInterface: 'x8uj34ibf1okg8apvs2yj4grt2ol3za2950g307j6cdzv4qa6xvy7u51gdwz2pxnyguddpgpjkh5fx4r8rkdj0yi11co6xz4cclcqjn1r7zuwpa76r3v7uk906wq8r5oxtysgxihf4r8v62ge5pm1x9ygixqx47u',
                receiverInterfaceNamespace: '9dz4kepg2wqlh0q1vbqe80bwyxexypiqe97vc0503j3odovw0jqyzv1sht7kkxfr1dtzsd9nuo070sxwkm6ev4xt0lwpr0g2f8zoj4kdkrodalamfcmpdszh67loigwlga6lw71vs04venizjb0f4u373gcpur29',
                retries: 8578681844,
                size: 7894229102,
                timesFailed: 3421602734,
                numberMax: 7675595777,
                numberDays: 3629402437,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '90jnaid0mp0wpicd6ftx',
                scenario: 'k47cnxzklsxg3mdribhavqd2x731sz7sab1gvfkiaj78j2yqb1tawdyfvvi9',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:23:57',
                executionMonitoringStartAt: '2020-11-04 02:51:21',
                executionMonitoringEndAt: '2020-11-04 11:37:38',
                flowHash: 'acpl8nyx23zg0yqyl0ztfg1cxolscuj3fysxddu1',
                flowParty: 'm5lguy860fa51x53ab6lx3mgx26kgxqsfxwj7osugbfqhl0hd4kfdholdhgw7go6wpeubi7mapj5zyxexp5qptu6pqe07fvqcdkc5fn6l9p2wj5yyvbqg94dl4wk84zdk8w8u5p79yk28fmcrcoze5zjv3g1lx0b',
                flowReceiverParty: 'yqrfhm738swnyvwo0hu329y8wng928uxq1ts988id40o3c6mqz671j077kn7svlqnq91f3he6arq2wrakcme87uh1ggl54z9g79e9ucpnhygf7ezfuk6qi7b8dh64tbvfgwnyi8ydml2l9ugt6xamy3bio1grlp8',
                flowComponent: 'mdvren41ylajmm27t9huj1zw6syidsg0fuhmar0smr4fzrfcz980ip9ecs7gjar7d85iz4zkliidcjkrgccx5jcas9w11oiz8hwcaqsxf04yeynochy99l6hzzwqko1kr1kpvjobbjq66ii4f5ko6xps4m3o9rpg',
                flowReceiverComponent: 'bthjlg1bhf97fa1o2dbb0i9ec1w6v80daiw9uzs17skrbw7756yjpat4pdthss5wp7m3t6uw1wmh8imnhty9urptf4bmzux131vk68q93wekp9fy5ngbh719wsjm3yuj77ot49i4nu4lx1yedlkieeurkw9qugm5',
                flowInterfaceName: '4oxpyafnjmefe9xian9n1famil9s9sijavoz9s98nt5oxasggwqnrkribb4fekvgce8ls04gdr61bpcorp8mygma1hdoke2i4egvzvxz2j4ndzfure0rqh0wn9cmg7gxvznlxf8nfoq3fv4v081dbi3fibfrfblv',
                flowInterfaceNamespace: '9jcksmgnhaoyn6tg1ynjvn0o51ctnyfyu1cp3ohpura2afd6f30rw471q4sz487y5ul4h82paz6e2814k2m3ymwl5try2nytm8no1qfld9e38ydbn5yw4wgwjw9j16fxo8gtykc9zi161c5ywzuoljizvzmsz1vt',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'go87cuh9rla3b27mipjhqzk0zpg1l6ef22i7sh3lceglf6htxhp5aktct0qhj15wza3dd6sorlpzojt68zr88szkg5wkixnz8b0sll00cad7o2p4hhkjyabx5ydnajj6rq6k8arzw46lkxdkdl1yodcizhm3b79k',
                detail: 'Iusto molestias iusto autem corrupti explicabo et in voluptatem. Quae aut totam doloremque facere nesciunt numquam similique soluta. Facilis explicabo voluptatem sed ut aut ea aut veritatis non. Aut facilis fugit aliquam doloremque animi voluptas voluptas. Quis omnis sunt et libero sunt porro. Vel ducimus sunt quasi ad sapiente reprehenderit error magni vel.',
                example: '8bnndte8avl3xr79egtj8rmbhcy71i28p2fk9ltpfm0cnt3atsvhppgfx60zn28ecj5ucpbliww5pz4b4z8ljx1j6st2pg5p2s9t9d2clcae4nt7wzv6v4en3y0grkcimkqis70vtzr9t889a25u390q0sqp5viz',
                startTimeAt: '2020-11-03 16:29:52',
                direction: 'INBOUND',
                errorCategory: 'mhdslxxhsplu9b4uxlynvdboc1jkzca7vhoev8qlpr3htedo3sckznhb0g9i4cugzri70lkfmiw3ol5amezsxwwbzqwn486sfthdyst3ul8zvs9idasm3pyy1exmmtba0c8khwkbadk40ub93q3nqx02tvm6vn5i',
                errorCode: '5t411jayxnxs0fja4zjktiwe1e3cyvjazdjx33eh9i2n0ev848',
                errorLabel: 966487,
                node: 3383252858,
                protocol: '6gukak73bmsmu0oqaqbo',
                qualityOfService: 'dos9ot8co6qxg7h51tg7',
                receiverParty: 'qsp7tu0hk7m51qgxp7who0bmxjtkun9jwbuidnzqs32io6fa5kklmv30y1kv27nib1sxrevfbt2ttat0l3ag2eupidfr7yr1p4kbxzm95vw8ivbi9r4430y8wutepc36gu8u2jue6eskk7cgkwz2dvs2ho85skfz',
                receiverComponent: '1sim15rqr4zx4kfwc8zvurpa0byn6nm7pthwwd0fwgv22m7vw3fh9gagya1hq2j6vd9q7x3yr8ehw86mrdqalkadx4hxym0shpbeyet9odnvcu84qtnk098ip6fou12r34gylg68xph4wvr3jcziicmofxyloquf',
                receiverInterface: '2m9h155w1ii9aecxv7wem4mlamuol3ha0inikfe10fb9qc5smw36da8ykhw4p6h9g5jmoqi60smietze16dubz2mil5uyztidg2vn5osyp91uxtbwjolupx4445qcbdq81zy13h5v4eill6t99mks8om9ewwy463',
                receiverInterfaceNamespace: 'ldqpilbvbugemsn2i4qb4nl8lz0t7z5jsslggf853zykl5h2np4fma3eh8udgejn9yjml8k8tr05rgrh7594nfuuyro1od1bzjavudvvi7j8m7hcs9q9va6p15438a5vq7msm3sftmndtnafk9bkyiectyiuxmdl',
                retries: 9811817619,
                size: 5844117964,
                timesFailed: 8070118135,
                numberMax: 8738038481,
                numberDays: 8689132368,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'ayytmswiiyic2kpp1x7ptbqh5deq4wh1mkkaa701at5vwiayt6',
                systemId: null,
                systemName: 'uahrq428qtgjbw08g8ky',
                scenario: 'lueqe5sbabu9yor89h71w3ahqetvbnr3wrtdkv7tdttsk3yzew8o69cpn00x',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 20:56:09',
                executionMonitoringStartAt: '2020-11-03 17:40:48',
                executionMonitoringEndAt: '2020-11-04 01:26:36',
                flowHash: 'yg58ni04v3prrgjfg3bywgq8b54cvge8aou46jwb',
                flowParty: 'hj8i2zqey21nmjfqxcoqinp1xwnojikgg20rs90vs1lo78xousv7emtxu797f7ynzkx9zp645jqhdgv3ixo8ofpfs61nikpeorrub023bgel2mlvo3one9pcvkana2pn2rb6clt935fzbv9m9ouq3s0n75anhw06',
                flowReceiverParty: '1fljcu3rbklo8bly99z0qu78cf5s0qbpgpluovt0dn9cfxmc9es8o1i1hrsg9tkzvtthf3mq56u78w4tou4baxbne343ef2ed0gynngr1zjhi9w0helglztt1047sdq0lhiwddo1zfust18advfrcz6gf1ura2c0',
                flowComponent: '9rp71rzgk27s59nfomkrusq1hqcubdj2monfdtde0qjtthk4xeam7fstqlqoa6vmr1q6ifr0pofrw9u8hur89c83rtugziqejkad0frpky6i1lyh1u60lypavd1sztiscagka8d7b2va3tssi1qj1un347u8suqm',
                flowReceiverComponent: 'n0u4nqgx5ztc1ifuwbbgahcb67folr153x2tfqzkqwcuutx5jwh3fds34bbyg31gmj0byekw6kvppsa9jky2rqlznsj6p9us3xzh76ktynxp5uuk2svcntqrq7nlsklwtg13nrunhyxhlqfh4jny03gykq89ip3s',
                flowInterfaceName: 'vmmyq8gg0o025ne7pd2cuehd6w91bzz5e6dlefemsa5b4yfpqcwhijdpt9gkpuqzaa3y8bavmii7ehuht5fjzzkzb6kveuiw5zugv7c02r4p98x87s2d27io5c4a1bo79dd51mb75lbdpz98ux5dqmkheflmv6nf',
                flowInterfaceNamespace: 'xfrcm76uo7da53bclyt2u97r466h9owm2r41wtr6xgq924j3o0832wh50ehlbqzuyfdktezegco9i3nv4pk24dsaglvjfmh986j9ychs1mchiibfxuvbeaqyujrfnsefalz1eb522s31yb8380ylb7se367pesqd',
                status: 'DELIVERING',
                refMessageId: 'br0pozcl208x5r36vv72rm97kfs6o8o6nt1aysg4ujsa107ls9lyu89rajsxaavf7tb2mxzjdx7xyc1b185otwkxj6z666y9eaj2lpfvwru4448jr8kzi1ro95ndlhenlqraqjr7nfsged7u7e04ectdbemgk6l9',
                detail: 'Eum neque temporibus amet sunt sit asperiores provident vel. Et quaerat enim similique ea ut quibusdam. Quia quo cumque consequatur ab similique.',
                example: '8tjfntds8mwxdwf8q8ek6cunstazig5r6j7dsaz4f8n9yhy8ls6lmyk2y1and0lniobdk4hiq3ugn7ia3j4n4celurjylke2gox04wplyl4tbz6rjxge0dh16g12vf51moe7s8pocciof2akwf6t7q724zkw9sf7',
                startTimeAt: '2020-11-03 17:56:59',
                direction: 'INBOUND',
                errorCategory: 'o4w8eclxwgshaevghe8te4totege64ml57hg1ih38zcqx1xuxnhp3h4ozobrvom4l8el6246jcw6uqg4latt8stvbaplaie3vkcui7xez4egkguwq5ei08wini8vzqd79ko76f6snv3qra4mi3yq0ccvfx3dks8g',
                errorCode: '2mtujh156rhpd0t8ieb3963uhgrk53fr13e0zjqrdc9mfyu96e',
                errorLabel: 520159,
                node: 9010796958,
                protocol: 'zfswjx9c4nyjt3j1k09r',
                qualityOfService: 'hbmatvpfclj78xdjte1m',
                receiverParty: 'vu7eoy6ix8sfj2xusnab3gjjj5ceuqattwtlu0b9qcwf1mfwoa31qp0cfz8cwnixxn0d0rozs5qmt0gtsjkmwzecc7oswiepn0zh7lft9bc00ska1s8t4inayl7qkai4ea60eq1nxdss7cvbo1njuabov8r5qzxl',
                receiverComponent: 'ics60wwsey8p6rtkrwsibt1l0qc0e9818ateybuuib4f93w6694pz5qkb49c5i4sxupd92yojkqe8z8ti7h756tlc4grb7t48acb4zitcpxikl9muxktumhxztqsn8bol3upgzaaa5b87qd16y2b9cejpq5mu7wd',
                receiverInterface: 's928ari3vlgpvphlp3izyotzwg5hguhp4ctys5mfo0f4rl0lrrhjkzs9nz0rgg4msocsqutzkjzb8xlwl15343ktiu2h9jbueo87j22k160nibeld9ts81z2twj0249y6n8bq2qmrox0n9ebhrlgtjxejys2ckug',
                receiverInterfaceNamespace: '9rdkhj0c2vgs88ivg94hkk1lpwuveb52qqwk10oeo2tijkeytvi6bv7ko4t9adgt2ur3jzedmykxapu88mb9fs2pix2u087e0l7oxgufaidxis2m6pg12w5eltrozma68jm60qipwcjboknjpggq177zrb3ko52w',
                retries: 7279960250,
                size: 7387342886,
                timesFailed: 4604509523,
                numberMax: 8543629193,
                numberDays: 6094645876,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'c6vt4o2vskmjhm0h6rcotg5rnrtbp4q1lczsrir7bspqh1frzq',
                
                systemName: 'l053gdrs43oprk9kd8j1',
                scenario: '88rup6mq3iwhzgcwem8uevto3s1z8lg29yw7oborsxm1tkxqsm264fkx1riz',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:29:03',
                executionMonitoringStartAt: '2020-11-03 19:26:35',
                executionMonitoringEndAt: '2020-11-04 14:55:18',
                flowHash: 'mnxtb1880tx0504rtozo87a775bv386820s6i84m',
                flowParty: 'cqn7peifbpp65w552mxu0hy4meoegku3ln5ra38y8nsrbqcnfk7a7fyjhzw7e5rcyfcudjic6u77i2nfox1c5hk3a1tqc6d1qk0vnt900csfvxfp3tb995fufp1dloopohv1n34dwja9qlechoxx0edrju0yv4iv',
                flowReceiverParty: 'x6zoeov38m6v5txjy73nbs8ibanqylrr08ho048vjqsc1e80vitigpzuekz17q11fo1sjpmnh6au8shutfvhchu68qg3nhsau8lviitqugue0jly5st39a4kuxya1gyb8x7y4tdcq6kdxvf4scq25clayh4r95ji',
                flowComponent: 'r91iglxq3kj5r6wtm34wfgkdmogwka04jnd7sg6pyltfv42vule0s7lh7zzdf0nu2z1787pbay0f9g0c76is6p00tzpvnky3unnqf0y04do4cnwbfdjzk7i0h334980dwhx5cdy5pwcsafu5i0vgodwhkxbyh3yh',
                flowReceiverComponent: 'ejcmlaivdalo6ve2nbfxdd5vd7eqpe1c65047d8enh4hvd0no3tr8u5c3rws62gizfutml4v8l5k47kxtwcmrvuu65imo1ggrh9x9xprw42ukjvb8mav1bwmz9uyj6tbem8bzw9wgy7ds3w0zi842v2l3zme2132',
                flowInterfaceName: 'jq37azjxm8sswilejrgimq3kevt3wijlbihs4rt2simocziyktf63jjp3ujecb0onwdph2czczeppg3b6nu59jgsxer92acrgbo94gq0s52mwa3xg8xvaapeay005l0gep9cb8jwvd5bv0cjvp2odq1htetje0un',
                flowInterfaceNamespace: 'iqvh1ou0bjryfkluf9kl266upp65nmcleo62slhghn7vwufq6qn50hjtmrmysqzbskpywqhltris8yqeolr0jj0i9ymmydsfaex8lp8zeroah10d9jz5lijb2sx2c731ijx6dnspdpvjp1w1p5u2mf0icxtkzhme',
                status: 'SUCCESS',
                refMessageId: 'c00z63nuou82q8j1tft0zlj7u0as3p01fg1cuheuzc7dm0t8ggbszgr0drkh4ckqnrxqo7k1xj7xeb477xq4pw4eaphhcqd8nzl3hiurb2p99ntrvw4yy2jw2w3sz9m9u3ki191t563xcj4prbpfsu3vdqo1njs8',
                detail: 'Error eligendi deserunt non error. Et delectus aut quia repellat fugit quia et occaecati voluptatum. Sit ab consequatur facilis fuga. Qui dolor rerum vel aut expedita totam et.',
                example: 'm3pmdmyiw9vk1zotgbi03n1lpc6bud4ntion2ru2d8pzk5kcb1pcqnlost3py09idjbpvgzx3vxrwash6mlkjmoivsnf05bj3cpkcf42ysp7hyr8ge2xp3gxz54v24uzwb24n81lzmzkmr1xyjdwso3z5la0714e',
                startTimeAt: '2020-11-03 19:25:34',
                direction: 'INBOUND',
                errorCategory: '98grvm49ifbylfdexptvbb1bj2mjsho2a8m53yl0825aoj14e6hilnyu9640igp9dz1p7xe4ahxq7yuuksi11k0xqsw6xeh4ywyywlb7zr66bav3i6pm5a0nihnlwujlav2mbocydt4a0wjdqtfo4pyyfn07gt7l',
                errorCode: '4a1tepp2ljaipedmror44hp0oposlk1wvm39udscrb7h1axyq5',
                errorLabel: 781966,
                node: 6354057221,
                protocol: 'mwayv092oubxjg6k5hrp',
                qualityOfService: 'zt3yeu2yxq1efjajo1d0',
                receiverParty: 'mpazfvedpyau5235tlroulm0mrb7bojyxz0ugsmovyf1ypzrwzql7c9ta45dhhhjxaz8ttl5hi2om4ebo0jl34uo6e7xmexq6oxv3a3qg0thnbtuz1rt8xnubhoqoim96hegupd2q09sg7rbjq3c9dz4ivvlo6vq',
                receiverComponent: 'r4a9hllkjrzoj2mqc70ndlqihfoc8x4w4dcbebr2uyj6lu1ilidwfy2q0vdn5lqlhnlaihhbe2htofszs4b64za18uegqb65e6hpkxeepd2j5loox84bvqcpd2n2gpjg0dfu8zwai6y3gq3tdn8al2tww2gjqnwf',
                receiverInterface: 'zvq48exwuuhn65m5gl6cpt3kn5tug5xezp77bsdj1sar6ej7ig9tnel28kxqmb6abg6ujw5wxds4rn8lrm7l1r22qoyr75rpqsivy5c7ckd03lu1ffkbu7sl1t2d9empk3giega2dtw75fbvbr0h22jxvnvwdixi',
                receiverInterfaceNamespace: 'us6oby7sl5pwekte4edwrlwbcwn0dubj1nh9lpft5ac6a6d76rasu6coz17wx8yvbhojh5p2kg7xjt4fd73bgo448zjbuo26thiqno0r8f5ejd2f5tbefmr60d9270lh0txzuw7iouv13wlcvasppq6kgnl0fsq4',
                retries: 1288197262,
                size: 1452964604,
                timesFailed: 6122479111,
                numberMax: 9030159862,
                numberDays: 2148496509,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'qrj434k9ptb4x80ouwyvsi8fcwgz98dromjimp4k2wglft14ot',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: null,
                scenario: 'odiui15lorw552gma8geeies1iduajw2x5m19h0yj6552aq3gxmy8cfiglpb',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:40:24',
                executionMonitoringStartAt: '2020-11-04 08:50:56',
                executionMonitoringEndAt: '2020-11-03 22:50:10',
                flowHash: '8e44t2b16r2ybc6tmb0iut64je53546hem8ewv7k',
                flowParty: 'ee9zv0m54szyhz8h5frb0ryrjzd17aykvzj4c6x5p2j50w4gyh4wnqhz1lx0xjliuas773kcoeiosh8dnbck8zztmb1b9ehijqni7zcudn48y7hc8h2h09plvovnc7lp9lbktueh2944qfrpjtxp3j45en5q5zpa',
                flowReceiverParty: 'pfqqqtdcm5usdrx3nxmdx9uizwa53njwq15poqiy544668yjc273evjncccy6eoly0bxcruhroogby235k0ro4464ccfv7rwsa0tz0u9lzexzejsqlsk47mjaynr4w95r72eeywtj045tsjc2awzl2vv62a1yfhd',
                flowComponent: 'jswaw9zndo4w7wxgm8rk09da5jri4sj64wsrxf8jee7nty4d6b7szmmyxlyrple8sr0m7kp12tuanhlt1hnqvpxzv5q4xlzrbtlgd6wob35l6cdz6bm44wkib5grj34cgilkjnsgjomc4aucf5flh9p2k0e8j09v',
                flowReceiverComponent: '9gcawc5r8a8oiviuxj7uraqpmlw3dfl9n8lxt3oc6ohblzxwybydst9un2a04pan0vrc5y1o3jukcwpxv2kl74bamyq972gf6e56vhp0zmh04nxf1pf1ny2uy8dg1r4885kae16s3aq2ysj55i2lo61nitvtkdld',
                flowInterfaceName: 'b3kv3ubyktsspieyogqy5v2pyk2hn4xn6fqczo2crsoyohhv8gi77j4amy9ueiha2vkcmxd2xs6e6dd0tys3kyw0hzs2lrt5wm3lp5m317ezufvgu9yzvvsbrivn245o1g0372lp7fjth3f5k79fmyl0n2sb4wlf',
                flowInterfaceNamespace: 'sxy1sufoe6bl2dy1wvkdf89x3p8qrki1bs7e6tiz1smuykm1rejvwqliu1j6oybr06q7gpb0m5vmhmgs858rhu9isdohi1ep0gni87gspe36b1wsdne77q0s9kw48gb72ws26c0a42md9vby5534p23q4uvh594y',
                status: 'SUCCESS',
                refMessageId: 'gbemj2wix3lhtizn5nx1yd2kl9e6iyebw2aui206ul9kzihprxwk6peop1mt0nna31bp2w810n01dh8nywi58ubtfsjwn5r7u73nbqtzn4uqa2rs3723gydlwtor8ur0qk4waa4eisa2rmx53dowblbpdn4m9lx5',
                detail: 'Et enim itaque quia saepe eum laborum voluptates omnis. Fuga consectetur at doloribus omnis dolores veniam recusandae dolore earum. Accusamus porro ad reiciendis. Aspernatur et voluptas placeat consequatur. Odit eum culpa rerum. Expedita ducimus adipisci facilis alias nihil laborum ut.',
                example: 'fnfgg9qudjvtno785agvwry9qlh3i8vmh0z1c017qjesrhfrvrplhm7att8zc8gxk9rdj2ax9vvpsxlakg6rmg4jsej130lb6ugvoor45sg39jq3dgibvxxufdd5hxdtrxou0nhmmi5zv73ahbfdjtv4zzqgbd1p',
                startTimeAt: '2020-11-04 05:30:16',
                direction: 'OUTBOUND',
                errorCategory: 'tv4mioe0lrg4w4xpbm96yo6h095h320ufyxokadxwslat6317bqs94dhqohlz8xglzv3bgcsblgbwj4sid664cvy595f5uicxihipwocxr9hy0846949id6ewlw4p32er49dr194efuw3iqswwdnmymxkwmho4r2',
                errorCode: '710zlc8h58bze2htis4drpt788zm0s8ojec3l3ypfwdg5v2qxb',
                errorLabel: 872793,
                node: 5975051285,
                protocol: 'olfkkcul8gzelm22v0xs',
                qualityOfService: 'bjskzhaj7s5c450l0ssg',
                receiverParty: '2uispxpffik5f8gnz8bzdpuqviyvqkh448kmkxa9176x6mem4uldis4ltlzmzu8kvzrq0oevtk5a45zp6s2pu51id2pa91sp79gpippu7dwwqu7o0o6khovyeozih4on6wd479bd3391tjle3cfv98ldv4qdl6jk',
                receiverComponent: 'pb7k3pc32ldd8uxn677sasbcxx9j8utn9adfwb20de170mqoeu6y19mzb6ga5usibuf0f2qk65wkdl4o17eyn86bm0tgwceeb55b5xir0koaayonpwv75mkeyh0dz460kg22z33s6z6oy3dw716mb5elptep1hwi',
                receiverInterface: 'mp91oqglz8xms9itva48v6ndzucbldkmpkrcvfrd7e4hk56923eye544vfb99jye83kwi7p0ms8mb82zx9fi3g5roinpp7fwzyd7is7otma5ubilajzw372v0groetpnyht9p7qr3vqlkqu2uztl03wo61eku41k',
                receiverInterfaceNamespace: 'w47918fsbyyig1ia86b8x3xxwsf41ecpk7i68oku15p9c08vms7m4ieez769chix3oollerkqrki55s5pbclzkyyceimg86c0x0pgsjqxqsmsl1br19vidc883zcfvwmn2m79s4sml9ssunoglrshktu5it4cvw8',
                retries: 7213696493,
                size: 6002947128,
                timesFailed: 8095484577,
                numberMax: 3460923562,
                numberDays: 1697014525,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'jp6t8569vhhqnhukmuo7mq27wulgaqvb6rjh6dhai1lfwli8rd',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                
                scenario: 'g4r6ksfssivuxh849wi88x40yviz6cmrx1k1ueyeq0xjm3fi2mjmavi7jwyv',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 09:15:39',
                executionMonitoringStartAt: '2020-11-04 04:35:09',
                executionMonitoringEndAt: '2020-11-04 12:54:34',
                flowHash: '68wfiu3jfjjg7mtdkzw4vkulnbk568co6sd9hipm',
                flowParty: 'xeswqpag2gezregl38e494l93j4q5b175zbvmwndjbhjo81g4tduwyh2mjnjla4ktdrjf2a47q7pbz9zfulrn7aap3yj18210i3xbpuwmwbf74mde97yjutw6fmevbe5f1l8ly6k6erccm33xuv77td8aeil1qll',
                flowReceiverParty: '0smoiu4zarejaadzcc7okcgfma1cmzg8of6y56p4to8v10bta5wbsu39fjmhfr1j89r5s86pvevn22j2ioxd7hi83us7h7r20cpccojmh7x1phasx8megdzjegu7gkjwakt0nmifp59terxh0965lx66dtfilz6m',
                flowComponent: 'abiclh3dj7228prvs23fpql9a05o2l461m82vw5vbhghr31m47ima4jkaotwtr9yx901ycs0hkyfmwdxdsumprrizs2hlh960jmpw19qwlaf7d90jyuib1bifx9sdi698iwcu7sxqsxshd6kd2vdoq3x5gmoxgf6',
                flowReceiverComponent: '3tmikt7zpvq3capd0h0b5dqsav66wbctg1k3w4s6l67pbaind2883zihv7lor44bczmnihz0x3zy9xy57v76kb40qy1ttl0arwtreqs38qdelkxvigywj2moov4ro0628arj036fnjuyppo2fwkdy2kf3kz35f94',
                flowInterfaceName: 'nvbopiz993c00anddzurugjvc2u99hb0rcmuq6a5oeq2pbjuv5f34wgnvqtfdvbesolngmsuudzbou8sopm0g8xq9sztwiuj3w7bxsaoirzf3blqn4x8v6fnodzqfzzvey5bq84g86ilx23j7ywuvbflwwqsg0j5',
                flowInterfaceNamespace: 'acbe6309fmttq11gfyjwar57xknb6aiiuqjilxlihgwv2su2gntqu9xop5djwhns6oq2zgdjzylywpdb2k9pidq3aw3hay0sisrynsp9twm04e7fw5qzadrer46t40i9of5v3nyqxdl1g4iwtjl9doractkpk4np',
                status: 'TO_BE_DELIVERED',
                refMessageId: 't0rclooyd5qfg7quox4w2wqz9e34bvuyas05w5nw99lfyfyocpm99xitm2ihfzbwixirf65rw5foknmf6uoqgbxu52vpnjm3gmrx8rfdrht5c6nf3vjdenhkkz2qbx8s2l1pnz1ivbcsy974taxxrklq6qez67pd',
                detail: 'Id repudiandae atque consequatur aut et voluptate et. Qui tempore cupiditate velit et voluptatem illum laboriosam. Cum quas reiciendis. Possimus ut quibusdam doloremque voluptatem tenetur commodi et. Quos nostrum deserunt fugiat quod et necessitatibus non. Modi quo esse.',
                example: '8hwb995or6575l9g90h6g4ay7pa0zhb99zak8j1yfjv30739qk2ai2kwa27swxz6jrn07hb4f3bs4zg27e4t4hgstuf7hjkrw57zwesj23ppsfo3rn7ebzmyw2j5qtykyyypof9lr2gk1udnr6nci0ww14jzb5sw',
                startTimeAt: '2020-11-04 08:25:00',
                direction: 'OUTBOUND',
                errorCategory: 'gtjgziyek4apxfvfvrc8r1kpcfj21o760nv7gvouzbx8453gg1je2ysdnlx6nh9jsvsnt18icm2r4p5dtd43tp6m2u2hadmem2c745vfo9da6ne9yr2tdaqfdoe3zws5x94s2gmsn16btu559sahs4hrl46ur4el',
                errorCode: 'knwpodbkz3p81v93xmy89jb62jlggvtwhhmbz4f5fgjehfa9a2',
                errorLabel: 157285,
                node: 3260411331,
                protocol: 'e6u19uenmfh2y071r327',
                qualityOfService: 'e1yzh8m79eppsuwksen2',
                receiverParty: '21yhduxjm2geofgvpddxukquni3bdp570mnh9nyn08ht8hvqsdo239y0bvyl3av93z4dvbhi2wlbofjgkmds357k6vix269ty713t1dxy2r6lihxm46poj6qfrz1xp4q45a00mh789mkkn4sn9pl7ktforliqsv9',
                receiverComponent: 'hae6e4cxyu67nbb7kkb2y7gtb4g38acmk3u16xyz1da35ikg6ccug6ai5e5crgl3mv792rf827b6dwsc57bvenwnbcb2659cgu2rya3l9g4293rzlrtz9cz22hcfkbawg7nfm1o6ph1mipsk7v9s8nwz3f5boqvc',
                receiverInterface: 'tl0zltbb4r00odb4qvrwxk7783pm6epfby2xod3wtn7hny97lzj03ziyvs6j26glealt93e5sntjwx1pkaxviswh9mt3mh5w163ne6huiq23hdssx5pvc516i0yi15mqu2q9ekreo5cxrsa94n58rulfbinfci5q',
                receiverInterfaceNamespace: 'kw4dsthvhmrsnte9yu0cwyvussk1b0berdauiz5i171m9v42ol1dth8wcczqqshedk2maivbhs3d27fz8gphtpgi0g7pdmn3qyqov2qsm51e3oxkmcf847oej1mvskdxkq6tdhewwkmcs7bx7ab1uzol4cufxxnv',
                retries: 4905048753,
                size: 1187780556,
                timesFailed: 5858875142,
                numberMax: 2305409310,
                numberDays: 2858763990,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'oukagwnxpcsojdsvd355bayftl604bdd3ynxo07u1inqk3661s',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'fuaufguslpe2ek5je5mi',
                scenario: '30y3q9nhyf6blcy5bqythn5wedbyrbpah54jjc46hdjrq4ibyqww5eoj9whc',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:49:29',
                executionMonitoringStartAt: '2020-11-04 03:24:34',
                executionMonitoringEndAt: '2020-11-03 18:32:05',
                flowHash: 'lkim44is2niq6reh3x7178v4mr2h3yv7alf94old',
                flowParty: '2f1rplozmtxr9gfqsns1wwg7mgqnr41dj57jguxvvs150qq65h1frtdose8wl5dpxbjipk4oebb5yzg9843d14rkwl1r82d289z1blwfilz7lvb506lzp79aomyy0gf5jq4z180qix06pwsp5agn7vervgac2bu7',
                flowReceiverParty: 'wn6scwrrv7qrditfx473a1p8ghe374634zwwogtfff6nq9s9ielb32zd0ocf5gwp8259xt3d0nisfnp2xu61frn4wn7387w1m91d4ck3ys73x1wy9xi8kkwk0qli91ruivwt91r6vqk62vft98lepg549p5iafjm',
                flowComponent: 'bwspul5wcws5tru4o95aarh8xxce7i1j2r7dn4jk0sv7n1fl6dg81tibuzimoyljj3wwsk5pye2ikd0j5qycp5gecorsb1zl7d88vwkgffm0ogbduuztdk6qacgq13xprteov93pc0cfoe7noj92jw0mslyf3yf5',
                flowReceiverComponent: '7m7ilezcp9u516sslhsorjgohliju9r5lxrrrrzvndliy0mjdbm182mk158rnk7xl6zotwpo3yl0jhse4pobe0mj9e9wcx282wqsbw038v9s6odiuv5ekl9rru1euhq81j4og5zuj068xpfwguu2431wh8dscngj',
                flowInterfaceName: '2yudts7z9o912i1i2bkvp7wfkek10fdi0gz14sdxwyakodbyanzp862rmecvw0kfpc3go2lj69we2kxv945jf8gvn5rj5tf1q0qme1e1k6dnon46qg368wbtvhekvdh2ddwtpfqzfnmmce18hp0nkiynidxwzh4z',
                flowInterfaceNamespace: '6ovsu39ejytx2zd1u43wgbk683diakj5lqf8ycx16hqhr3n67yrpb9v4q1bdg5xxzaqi93k49e010pxhhorfw4bkuku1b5i726drlaiv0y3jej955clj8cjzz2sghbvky5rbhn3h7a6k0esav3kq1knp072qy1cc',
                status: 'DELIVERING',
                refMessageId: 'bzaut3s6l0fsq4tx25mt6qhjtpw55pk6ru287pj1ksdmp3k4r5fclstugxu5djfpqm7px23u2bcp3ii351fd5a400g2pyn98d104pfwmfqmz1zr4jcy856ox18t6yyuhidyjzd29jg0zgl5xwn6mbkbceq9zu12v',
                detail: 'Voluptas ipsum adipisci animi veritatis commodi est eum. A occaecati ut praesentium repellat numquam cumque et perferendis qui. Aperiam facilis dolore aliquid.',
                example: 'l0350uuprp1jv9bf5i2zvx4gpf5vixhicu1bpy9ba4ixx6pm2ptp8ee8sf8otx09afn0as5fb6z10l5r6vvq79f6a36ve9kymarzbneoquob1mz0l3s7rt8jdtqq5dmobo3lnjckxs23az89m3t2n2cluu4wm520',
                startTimeAt: '2020-11-03 20:42:40',
                direction: 'OUTBOUND',
                errorCategory: 'b2n6v6tzp7gr2pboffmzsyjctq7rdylxta05zc8moaghs4hdq49eo76iyutmp4l8e0akv4lv9u60e4w2k9yry95c5x16obvff52rhw42htgwgo6wcgrsk8ckey9upbgbr7c1thsyp5cpbxbvgpvtfyaoqbgzm8zp',
                errorCode: 'rboe0d45t08t5014l3t7y3mlizbl2i0nbkg8iy2dawyi24ujq6',
                errorLabel: 578869,
                node: 9515027106,
                protocol: 'gvxbyj8cchdk8ehp4gmo',
                qualityOfService: 'oq34lw1i5wj5amu7mykt',
                receiverParty: 'a0dy6zefuglowhquxjovehngmdp43c1ytyrpgj7a4w1gy5pks61h8k0l63w6i1d1dlta5q7otvr7xpsh0ajswj9xwwszm4b3exdi9smjgokuy058f66y40dorpqygyrg3nqvdyyc5usk36zlifk0vrd0zbtrj6nc',
                receiverComponent: 'd6xtknszuabybhwiquo3jc9peevhzxamony0hy1zmzgzmftxv0gfmhn08ztgckjmx3qzs3kf6amf2lyie6y4lhxy8d8r2hqeixkv6v4ff9egxpejhrucbkwzbshjnkgf4hbqdc6qzzc8y8r8vr63qcjp47xag7tq',
                receiverInterface: '0rvwncl2v61184t3dnmpc25vz1spcwsbpjvrgudcv9mutz8b7b0ory5pa8td54u2s2w98w47knss9spqdoj5h1if3nyscf62paot9dehcl1wnpmccn4gpwv9f0sapz4k0hfaugr5d7z5g88tyrhug3xn5aoldslc',
                receiverInterfaceNamespace: '3i77mxvp59s9irrg4864vijvyfa4nes9mjpotg8i8zc2xbnj7bs41j3ee5fuusjss76wszs8f2afdpw6yiccs46dns9h6h4gcwu7p4j93cob4lgzwxwntqdctpbtf4q9a2pa8hqvnwg9hxwx4c1c7v5egv2f2ecw',
                retries: 1695267643,
                size: 4364868484,
                timesFailed: 6410972417,
                numberMax: 2301586865,
                numberDays: 2381163414,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'p1v3i4ht0dp7z5lw1b39y1vdgg8rl2aoxxc81cfodnarzfzqb6',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'nqcd7q3ar5rltj05e01j',
                scenario: 'o5mvo6w9j00cajzb2liixe1igtvrzus4a30vlpc73dn5opsmrhkglab95w83',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:30:51',
                executionMonitoringStartAt: '2020-11-03 17:23:46',
                executionMonitoringEndAt: '2020-11-04 08:53:32',
                flowHash: '7ycax57fi6cqk459ftgo6avuhdks2aws3aqofkra',
                flowParty: 'yi5celmrjo64y9u4w5n81jwtwz1k9l5ttmtlk246kclc12w6r0685f1bz93vumc7is9qs9ohnorv8myttcrj6rzc6leujcoovgx62445ty163vp4rlomsj8xq3fsx23swd38l5stt75dvcaaumrmcle2i10p2rjz',
                flowReceiverParty: '24lku1wyhqqd4kirij0ebqc3lyq29tk18n53tfd5ty0ejwwpbotp8dvu0cubazhpoqw10xr2k5cwpitzptkxoyonieuzts90zbgv5nxxoj8g3f8eod29a8eoqn6k6yt4fli0orv5jxyc4dgl6qtq261tdtc8cgwh',
                flowComponent: 'ykxoo6cbhrhe4fbyrvltq0sq87xh7tcskyruju8l6paeygod0w2qc6hvxt6luji0nk8dhpzlik9ejiayamk01l35ainfgc7gwdqmsnq9vninxsfzxbgmhef0ixd5gnci7sdbsf4mtsr1xjx65featrsww8tpjm9h',
                flowReceiverComponent: 'smxtdeztfe6kgmkmysljh4lnht50t1eooueqkmi93p3xrh670l60oyv460o3f94p008t2n55xs7ykbz0k18lhmmqg7brqz06g1426x4ouc8fqmoxdcc5ss2688r72vwqgvod4xpnjdld9y8nbpwr0k1fqskxth9v',
                flowInterfaceName: 'kxipej4c35gvnao4j9hzm9rwdihnvf6jv2w7ipscvsgglujjcmajc6b4arcmtmxgii1b751840rbt0hm2f7iwfx6f2zv4qia9j7567wofmiedunikvfe09ym11ifsxf7vwlz9nwzifrys12ssgg4i35qj274gg8i',
                flowInterfaceNamespace: '3s1q7uv5v6w6ml1y4epp7v54be0ve9xxvmnhi2waydafm7xsrihvtfbo5izco9ciayp9otwajotib57qmx4o4d8kbfgz3spy2ay9jwqt4ybv4dichbuubp6b1qf7icoxb4fo3zb0aag5rc7jynuookwylbdunwjf',
                status: 'WAITING',
                refMessageId: 'h4vii6uojdny6w5ndwbyqy1lndxtywc56hnnac5rzngdwuc94mcq0z0mf51vhr975d8rv7k5ff9b65o9tiscwwcn99yvrsond7omq61v1rkj9o8s0ksibnj6xwul9bpbtrhvxhjkpeiyjb4ku2cpozw1fme97q5v',
                detail: 'Cum doloribus minima quo recusandae. Tempore soluta pariatur porro aliquid natus repellat. Mollitia voluptatem dolorem alias. Sint non distinctio assumenda aut dolores. Molestias quia neque reprehenderit aut fugit amet esse et. Repellat velit cumque laborum consectetur.',
                example: 'pnx05q79fj5b7u4xg5b4cvz0riovnirekgdhgeq2pkuzmfl08xqnq80dahbbmou4yqydzr5n7fpxxy5mlb3hixlzurlikr3czg6sapshw4a4ostrz1gjft7far6vc65s3jpqqxdnbqczu59o4mo2wgh3w7xums43',
                startTimeAt: '2020-11-04 02:25:50',
                direction: 'INBOUND',
                errorCategory: 'ile4i1932nma9znyj7rqhahis45u57yo9b18tmiodtpqd38fl5bdkoyik0p30329dqderev6j8rprvk13d14ehmvps8kfaaj2mx8h9nb1vq4l0tk3umbfzfr38b8412osrlki1cfp6gtc4abkxqxg8ti8tlkcsu6',
                errorCode: 'p4pdp4i6ivo50g29iiy3j59rmwu2t18tewlndomruleqh7mq6e',
                errorLabel: 678643,
                node: 5958794456,
                protocol: 'f5ac97hki3jffmoi8z50',
                qualityOfService: 'es4jbae11hjpcg29nmf6',
                receiverParty: '8cot1u52tfk8it6d8dbvt2a2vzrzmu6v8e7ke25aazdg3kzuh3vith9cieijf32uvu8padgg748w2e40p8e3qgwfegu420lz8cgq5wfr7oln6674hynstdrqbnyl2gxn8vuzdz3hiopxdkpkwsmc68f7j7b6tu59',
                receiverComponent: 'y80k2dmk7c7fwj0tzsarg5jupr0x04yg2f172rw1ev6zqxunhvddg0nwrloz00pmf6j7wz2yd2xjfvdj6l5ksmbipy9l389yz1kn1mepente6h05qjbl212nia8gp77kid604xnn9aqi8mmrke6fc18q0495582c',
                receiverInterface: '1osr8qy4en8gcoj39a8v6jj37ormhlisvym6trls93xibr5aglzam8j1brh0he3a91i2igykwmfzgp1rz86i0ny9wz076dmkdfh8a9q5884pfw3znrlszsbp8hdwwwfkdyvavf13qn0ghjokfni568a12ec9thwj',
                receiverInterfaceNamespace: 'c0lq6dzk4y2vhbwlbmec5ttn5rbr1c8db689o4q4upiylh3axvtgyokxa3gdgwn7iwmfjnil726mh1jlnbwf7q8h79j4arv00f6ah7vrn1mgkwmaj8bamnltmbhnfyk6mt8rzpcstha4c98kltsavwd7zj34ednn',
                retries: 6834207527,
                size: 5839037260,
                timesFailed: 7078661861,
                numberMax: 8463708934,
                numberDays: 5068946527,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'rn3ecbyzepmjl9ctd1dqfgcrdm95d4wkbq80te8bqqb7fmb2u5',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '7m86mjpyk25rrowleni6',
                scenario: 'wjrq0kbfd889x36zk6b4dvlyja5zujiqfp8y9bzrgrqe43vl2hax14mknegr',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: null,
                executionExecutedAt: '2020-11-03 20:22:31',
                executionMonitoringStartAt: '2020-11-04 04:18:28',
                executionMonitoringEndAt: '2020-11-04 10:22:16',
                flowHash: 'ifplcfmgx7983vu2q11ufutjuoans5k0vmprjvjg',
                flowParty: 'vded26lp5hjr7ikd7nsjdg0stoekwpou00b91jgw4qw87v17rcpjllv290wtdvoehjpyveikz8eluuzk5jdo9oiqo5228xvjzr856hrlcnxuzls0r4i25imaf7a0xhtzbpjxy0dqms41fa2uwv4kqfh0449nabkg',
                flowReceiverParty: 'rcuufa661dfubuagyhu6isw6kyktya2xmit93osbx6q09wcfy95jrshejo0mualcrulakt6if4bfv7fkzqggr3sofumnzwq24she9p2qrvkpowqa4snf0nrnse06eht3rfnabfvqoq0z85asibddp26vrc26pyi7',
                flowComponent: '8pgwuhrtfjplwpqtc7w4j3p3db4fhahyhvmorf0mywahfs16etu589wtdtxy71yvzfn70rpqjpkawbaevoupntq547lgmljaz0ravddp8i0pwaiqcgggptne1ojd3fn1pchuf6tvxmdy7r584sgirpw9ippqye4a',
                flowReceiverComponent: 'u59udjrxcx2mq475o3zihhxetmry3bve750mwymhh78q0tks7e2v0rvk1ldc3z5m1b8g324djkfqdkei134zg75yu7186vp9tcrrt2ifqytw87ivssod93nd1lc0y5p9m5dke61zisnukkczf68s6pxufxcpfngb',
                flowInterfaceName: '7z76nizbkp2epawuj1ow26fq0wqkxwg3ay8vy0qjzktdhh9fu6gb87de6w3s8zi3iwsza17v1r5bm4g05x44c1iihzarqnt1alztonshgxz06vut740tnevw359kizin52bxzslvqj06xzoqu127w7j9x4z6slth',
                flowInterfaceNamespace: 'pmxxc6ys4q2gz2wy6auh4kdce4k3afl0501l0gv2di96c1wdjdarauswle7hcvzp9wbfpsvklhlptoz0xha2ibh430aah5843sdqxxtiju6a8jwrgkz2g9gzmo8bssyipr0xdi9t2o6l46oh08pbnwlsd4q7fta7',
                status: 'TO_BE_DELIVERED',
                refMessageId: '67wz29ly2o0f2nomwd85wk2j9hescwzzc6sjcorbayq0i5pa01qnmoob09ulfgd3cqmnvw1ma3zozsdfnimlgxzipie9xojugemtgqk1ym30mgl2a2dmgc637nqwp6xvc0ks8a20qd1stxsua867ndn5qptebudp',
                detail: 'In vel eum voluptatum ipsum dolor inventore aut. Asperiores debitis magni vel aut non. Quia in at non tenetur officia natus ab. Quia minus ratione aut enim. Amet illo sit debitis nobis nisi dolores dolor. Sequi sit explicabo id.',
                example: 'zj9ghsm58f41ribcd7nde4cp8z4czle2k81s3en3p5xorpminlleogbi63x9nefsh3b9o8ad0n9vshyltdku5mcakmldfz4nsp4q298l4ug0nk7z146vcf2gz26fdg0ezlzi8r7p5j92awiah99m48p8np31un25',
                startTimeAt: '2020-11-03 23:39:26',
                direction: 'OUTBOUND',
                errorCategory: 'eug6e4a21ei77v0vx7zwdnijpxtv12p3jzjyb630f489jr0pui0sjzl7gqk0wqdba4on0nu0ckrp2oh9lssvcpbptew7qubhxe91r1f5f2mi6ixxkihbi8wxfec7qb7mwebggf3g0ens2aln0ih9rui1lccwimay',
                errorCode: '6mlgjxrz9prehgkn5xd4pwvserimzh4d0rc0shw9ep22kjngj2',
                errorLabel: 247772,
                node: 4283669853,
                protocol: '8t20jf3vr42hwb5xnv3p',
                qualityOfService: 'r4smx3mzo2ui3th4gkh9',
                receiverParty: 'vn5ktdovmvbfnjh8cvpnkamxbth9pltdhg4rrhpfr8dif0i0gv1sjykck5zodwmjldehki8uui78n00zrc3s12lvxmpfevljv1xesuf9lvfev574uhetkoa0m43egg1xknxukuf1yvwayfrznqxz0dk16rvmdh1d',
                receiverComponent: '3llpyaqezk55xkrp5sjofwxdxgdb2nkmvnfz3tsq30wwp39xok6pibn0uea2r8exrgs3dnwhz3seg1ixyqh79wmjfd6j6hkmoas0d2sbbtjk55yiawt8vra5vynpjgbjdv4do9tkupi19ipufzmbuynom0o8lvkt',
                receiverInterface: 'zwly87jqxqc6jtebnlo1tcs3lcmk4s7gb62kwi4jn7j4xjov2ua06a9s1f6oox65okm3i54xidbpzyuq3v3s7n70ncbl8keeh3k06ywwqpbihpza7pc6rzr0acujm4z6pzb1sq75yupnmq1ohxgd3af31qn5t23e',
                receiverInterfaceNamespace: 'x2yr0884f0ngbuzvavav7lg2o00hhkkrqpn2wpj8n71wjrg81gt8a99qsf10dqr95mswo2148eh5noj7x3hoeqdpwy2lf24kqz96m1mikzxdod6swso0p3d515vluzej02i2lfzamjvlgofa4mt825oi1o954f7r',
                retries: 4769252657,
                size: 9419329480,
                timesFailed: 1929898925,
                numberMax: 4021421153,
                numberDays: 3254095262,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '10e52md7rho8ev01pdo1j88iaphqeqfxhspsqxhtbu3oeebgmk',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '83lp7vn726cq7ju4b9b9',
                scenario: '8tj6fxm9krwca2idlexl7ohew63vrwbfxsczffysyqrq2vr5wxnjrs83vw9x',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                
                executionExecutedAt: '2020-11-04 01:10:11',
                executionMonitoringStartAt: '2020-11-03 15:54:18',
                executionMonitoringEndAt: '2020-11-04 07:15:29',
                flowHash: 'gnf0un1s125b3rqa8o87zb2whydygmukbol8zd23',
                flowParty: 'ial24ez8pq7wjqhxx0q1ohf7t938736jd8eksb00iclre8aqt0v157xys7irhm1qrwz44ab3zkf7cuc11qpj5n8rxida16zf6839vupha3qjtvxtp4vh6quo0gi8bh23ct2pj58s78idplb2pu6a6w1mtnlhexos',
                flowReceiverParty: 'qwy4ncjq2yig8oyxxtr5v7zwn8lkwr4kjq0t55tfgrzcojboaaw3ltxcoadjy504jkywzp3rjisb48fsd7oaoiat41u8l7a69wukw38q26q5zko49gxd07jidcmfb58sv7w0ggynaww6hhqbumqiujx1meg3acv2',
                flowComponent: 's5q4z8gmx9dwevjlzc1at4w5o32bs24pv1rw6he9hjon8jqctzkq1pvghl1ak7uf75sa234b3xgxrqmvelgru6nerqrh1i2kaqgj89klhh3a5tdklspdbk2y0aii6eyad8zwx22hr0c22ckmijkwqaesc1ksa4z6',
                flowReceiverComponent: '56hmumqrj6qb551ztj4makvb7cc9951bulqiagiv5hjclxdvlqw8oyg4xi017zn0nimdwds1fr57ah6ec3kljj98ferojtwymz7fxe3j4r6nuo4fa9znkyy89kpjr4jkcfikuxayay8ka5b7x9va1jf6mg1fhnut',
                flowInterfaceName: 'h5p9wci3hqiku9c2q2fjcccb0xcgfj3m0gwfazgwcci7cduf9q9hpmb786x60eoyc0unwwfcw6nudq9z344wjwx84ytf3ls37lpcaanazp3o221ic02oza8myhkaodmfy8lqntoh5yodce55mj439576goszca3u',
                flowInterfaceNamespace: '028zui74h5bhv2kuy4r2oxnqn52ju8nzgsay6k1iux7o34lksholk7jeavoe5bdegvtu73gulk8kvcxzawkaoy1hp8hfg9z2n4v0l4nmyaka0y7xo97q41to554m15kqvr07smpptsimcsngczfxul2h8n5i844o',
                status: 'ERROR',
                refMessageId: 'lnk9o5iz3eq323vo85d6ci8ky51o3gq2ggdsok3yuic4q711penjehvg08s099gxyi83ieqj8fdxekk2fwskikkapeogzygublq26rl499afb1weduifig0a0x6tvnv4k2ogbpauxod4wksgg1oauipauw8nfllz',
                detail: 'Nulla fugiat reiciendis molestiae officiis voluptas consequatur enim. Facilis est doloremque rerum. Minus sunt aliquam et dolor. Dolorum ad labore voluptas. Tempora laboriosam quas quae sequi eveniet quos aut aut.',
                example: 'dnbxayp07jb3iltbuasz3si9bkhg1y9c7ghxx4gizawhseebb9lx2y49al2tzyy7ejachd3yomplfynn2296hs13yzvml83nn1p64kesswbqcjzwawfw9isan0j2hzt0lswp3riw6xhmvxdba6xgblbslpg1a0c0',
                startTimeAt: '2020-11-04 10:06:37',
                direction: 'INBOUND',
                errorCategory: 'f1qt6opvd818o93b8lxf67mbcf0wd2jm1bq6qx3k8ylpiddzyjmqywx9yroqqa55ytciqnesjxnedpmbk3pip5dwscn14ut67ljt67ai3fsdcmf13uy9vlq1daoyvczpxbj4k4q11y6xv493t9213l6mulmhax85',
                errorCode: 'wpey2pved896lge7xtqrv46beq2b9k17s2dy89bxtz5gak29gq',
                errorLabel: 176653,
                node: 4490775824,
                protocol: 'sy3ho8hal5pr3d5pt91u',
                qualityOfService: 'xyf93vsuqkjybf24w2ts',
                receiverParty: 'vkf53ogpxxxeaoig3wysuzqdmqmdf71ze2zc7g5vi2dm3dpupkdieql7liojwxh4w3wpr49pk1jtsrknvpwxg9d8cj1ygai9l5h0sq028qs28msb5djl71dtqx7c3o2z7pvf5vtm69giappqeogusc0cv4mi1zrm',
                receiverComponent: '71wh70fll67q7gj1r90lnac5w6yfpy5qkxgdoovyc8nfacm1cx4ssrft0sgutr0todpkt7vjor1gvow22l574pp6ktco34onoxeskafh3zkiw6kfaplf0jfpmsggxl9r7vtq0uccvup197ouj3p1i74ctxna0d6n',
                receiverInterface: 'cud0yo3jr05ekwqfiycxn6soogv10byd3f9xmdh5f20sosm79e68kk0s8cx6mpl7ptpzww4pbewcgzzsip3azpc9js5c9huwnq18yt2uktow5kuzqpnnv21pjtyc9xvklglogd8jq0zl1w6mh5u38lp4bv6h4dl5',
                receiverInterfaceNamespace: '82taoe5w8r9wo8xwwscge8d3lat8juddwe8xr7fjt7po9w202l8qrekgzednns770fj5u2347tnk00c7nx6ezkyfmn3dou8ehvub1b4t7rt84d2qqxyntogdu8obcsp84zl28kmt3cpqc4nqredrwg8lrfs7h8zm',
                retries: 2522753751,
                size: 1709276228,
                timesFailed: 1293414585,
                numberMax: 9022472110,
                numberDays: 6223135859,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'ynbfavdydcra3dyau6hn5xomdq3kc3f2ekewcykxl0ozvzjy1q',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'tvinuhiutt42tnlgnljy',
                scenario: 'h7nikxko9o9d6fk6s7eml1qbbonfg91wj4gjg546s2hcfdhqaodi714escwr',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-03 21:26:40',
                executionMonitoringEndAt: '2020-11-04 00:50:08',
                flowHash: 'ny9zcx3pac7w63udyefci2lstdy2w52smjnehk59',
                flowParty: 'aifatjs1ehlamy78q6evmbd9er4was1et2a51n2lm62zkdkqkeoufl6lkgiu0babu44fxx9ed43bywpu1132pon6n0siagen42cukr8e3bclqiwkew0oufjj5vnvg1slfuu1695bplsusbqm6t45i8hdjulhqej3',
                flowReceiverParty: 'mp4nr83upynhnr6w7bsgs9r2xwmv13mnmgthcw43f7etp09dfg11veeuscknlx6urbtvhsizqi2ylo9efj3a1uzcz9m4wx9gkos1i4t30300igrbl9skjqbfh7d85d9j2ue80sfz8imzko4t4hvtsyoudue8f10n',
                flowComponent: 'qes7qk58ueioqkg442pwlpgtkc4ssolz8q53s2iq6qvtx6e8hiosibxvwe3m5iix6hxvv7cwvpeprkjb85u445vzgjr73lxcm66su27iuxx0al9dqm8zno8i9ap9sn7iwxww2g3q5giliph5u40zy7fxywaa6cti',
                flowReceiverComponent: 'h1tcb1hcxbjoao0hz4zv8fz0j68fgy3ld3mob7u4f0r6vba2avx3c5keuudkgjkygwpn3aq2oz5k0l709ek02nzibnc1qeevayrky5vf4ts5b00iymehyzpbcavhpbgxzqwoio2evu0bb2u187d86c0wz3kawrac',
                flowInterfaceName: 'm6f20lx4dp0yorxsymow1fhlhh3l5uvvw8zpwkwqj0t3lp2hoqyaibjreusf3avzv1e8iqny6lktssi4k8v9v1abs86epvxejtk3v3wivmnbghdt2j9dangzk4oa7buoauvaiyledmfknfx0txpcbd7ix560fc56',
                flowInterfaceNamespace: 'wud1h5rvynsk0zh9xm3yqj5z3eapov2dj7elv06buyjnldcy5n3f6btx6osc4qako70yjeipks4y5std3iyy1tagt88yw38v2dk7caxr3uctw91058iisegzni12lmwjpeyphksod8qv3s4xfg1uhndd61ylb5yz',
                status: 'CANCELLED',
                refMessageId: 'i7qtvo9khv26qci31n420ntewgxz21bhose5eovqqur2wx34lhseol3pnfq8o0d0x4n5v25zxmwwxo2y7m7fe82c0fq9m3tmvuv7679u2j9atgspoikaxeuya0z4btuz50i2rqqme8iun5qq3919cuokfmhpc3ix',
                detail: 'Reprehenderit officia aut a natus est officiis. Tempore placeat corporis ipsa. Et eum qui aliquam velit sapiente voluptatibus aut quasi omnis.',
                example: '0znbwmsf9v1d8tdh4lltw0o6zxmdflk54esnpvgv7vcia98i7txmcujdpmdjc71q7zdidwqy6tq1g3ivnp6ect08t0fr2wekguuasd22lbm9io7szyx8021snpsagybpc0al0b9s1hf4h31cvz7b0iv28o07lhn9',
                startTimeAt: '2020-11-04 14:39:06',
                direction: 'INBOUND',
                errorCategory: '2tbh56x5nantaoalq09bucpzo1oz1ckq4tb0812was7ejub2n1t0znpulx7spy5vlv080sxknjstwkaxo5bkf297eamltwlg3919rfb9d177sf3zjbphjesqrzr4qjq1hcne8yb8do51dvnxoni6peeksh17f5cx',
                errorCode: 'kwivd7bb363q7vzdk6v3bj0qhzrdgrr2gzi729fd6gr41z35cu',
                errorLabel: 703626,
                node: 9053957865,
                protocol: '7n402swaxio8ef17ixe3',
                qualityOfService: '8ilj2bn1ss739tlzn9zb',
                receiverParty: 'lhvi2ol2h0qcfzxvdqilocm9idgq0cmqbit8qbroll8cqcqdxzapyrdqtvqxbpmd03mbzakta2b87aqhis1zbq91rxdk8f4xodxys5suh1q0tvjdo39zv8094mz89u4eetpw4a33vwg8o2hxkrb0rrhf5b87vocp',
                receiverComponent: 'dtbj83ixc5bmunffthcdmqv0qwh5btlksv1zwcom4rsbxbgw7uhjgiuhmyvkm27fb70q1qrvi3uf4j3xfa4z8bghgh7362oy1jvnsnkpdkyyuhc0jzwtq3d6rbni485e2mrts815ov6e2dtgl1p5hdd7wbre1fpj',
                receiverInterface: 'a6yfp6mvptbwdlxynon3hoyu70uuckkcrkphrbodhyp0tygowwefy29w22yg8bg9pgl74ergvigq4k1f00dmahgvp65daltkmatw3ui7ycvy6n2yyj9itbkfeqxnfbueg29vn27hxrwnrecpy2j9e86c54v1j794',
                receiverInterfaceNamespace: 'p7yv7qaiyz8t4my8ou4asp3j1w5chx1vlkb6bke4mz2q0568ytxzur0gl1tqbh5tmahh2p9xva8ujkim7o39puq5c8m5815o5g2pvu89jlwpdnt8sz1zcsc0nylzghxp02epx0t0lktt2z7jid48uogov88nn7k2',
                retries: 5630526806,
                size: 3202066075,
                timesFailed: 8393865813,
                numberMax: 1857900214,
                numberDays: 4173390755,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'lf514ibzjayklycjkpxp8k2qekuidnu5htfr23wbdx6ngo1w2e',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'y29napyg7hg1hf5q4j7j',
                scenario: 'i4v7v5cbprla0j5l1ugo6q74wcc8ehkcg493sk7sv8r3tqpj31tjkxx3a0zo',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-11-03 19:22:08',
                executionMonitoringEndAt: '2020-11-03 17:44:05',
                flowHash: '6bt0wopmpdmaxkuqqljnh4r3y4sl90mbne40305l',
                flowParty: 'gvjawmmkpoear0uvk2ezherd5xkchubmoa15rcs8ympar36l5jd56hijputilqd1we2i4kl077s6zu9fx0fi3odq2s0lmz4kbj8lzcvxpa6c8a64al991qn3kyzuwqtqn71f8ddgi3vtxlx3sh9bkigq9tup1dze',
                flowReceiverParty: '7a0xuyo7e4e022ms8k8bosnuqqn6s9ngs6jleyvjphbsys6rjyzkr3h9zn53npykhjx4uobef7a8xhw5q5iwzsbdn70n2bw5ngr4u6t7zqcwa745hbd1rtlanz8egoclzapnnxjxfk0j2622knczk41iwcqywoy8',
                flowComponent: 'd6j3uaqrc4oh7ifly3pzar2v1obhysfhjx845fwv5k7zayhy9bsgxduw5ro00uetvcf4fd3i3h7bmzjho06buk21u50ontsdo2yfui2yuv0tvwb5fu17v3ffaywcf06c0mqvxd8vbo3orxwrfvyue2mtajeoit27',
                flowReceiverComponent: 'hlkwmy4o37tgc8ztsdwmra15jro2ymvbolmc67a2or8ntr169xot9o7a2j5uavu5gyxnyog16h8pa0uda2mf49ms0aouoxdwngeh5dnj3l3odwe1h6aafu1tvdx7r8ttnn2gx3epjhopdle4eb74xbi6mmc5splc',
                flowInterfaceName: 'r70nwocwy0l72abioejn2chl30wihp4jklqk62czudy479le4v235b5z3a9mxmwyideyafdplisztn7bxj7amzzzp9yij4isojwan6cm6qkeyzsb4w3brfihylba54d66as0ha7psn8v06vgqupb6fae53qnoa5a',
                flowInterfaceNamespace: 'kary3ht7r7t9h9fo9x8pscfzqppfaxn4fyf5zwhjwyjuw18muera4v7uoxcmo34giap2kz9a3klocvjlu9hzty2ssfn516e8gmcaytqotwdg9ch0wad53btrgr687taeq9q7opj84nou0bbyyc2gsqk5sed2585c',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'o1gieyxpfqxeasp29ri3c6dq3op19mpprn7uwekyuoxhrl0morbhr05c3n6o3mr0okr6604y0v95yy4wthuagrc6f0jfq73nqbhpbz16vgo7uifrc6ox3fduyobp59igwgayrit9jvgytjla3tbvagtoebrtrkhq',
                detail: 'Quia possimus et enim consequatur. Sint explicabo velit sunt vero hic itaque dolor in. Officiis voluptas fugit hic quae exercitationem earum dolorum. Laborum cum accusamus temporibus consequuntur numquam. Harum distinctio dolorem praesentium.',
                example: 'zui7dc8vult3awacmfijwp5vss3h2n7blmb54r0fu0qqcy96sxh6y433ah3oyr495e24ey7m77f977tc5ghnvnptxia72u47go7gztvgyhwpj4iziqk114u79gu7byvegsdyi7twtztljc8xzfz6e4o5ddtvpivs',
                startTimeAt: '2020-11-04 14:46:44',
                direction: 'OUTBOUND',
                errorCategory: 'c4k6cut4uouclpku1wylthd5uubzmckq3b9ls6y4mkqinsg057yes3wpzb3s9ubgd9m1zxx5esnxsjrxlhtg88r68f9sayqu6xcjvuoc5pmrvjzz7frfw58iwh1dxnwfwvp7khgykh2hta7st89k7tevnoh3iod4',
                errorCode: 'salkoknuvc3tkwadej5e99qghrmpumxnwkt7yipbkuanmlr5v4',
                errorLabel: 360105,
                node: 1699187349,
                protocol: '4ujcntbwxqnq0pp6lcvv',
                qualityOfService: 'wiizhh76o8ydkj09fqk7',
                receiverParty: '41p4s0he8k0ym5j3cyi771r3k3991qqsgxypup3i878axytzyoao91p1xew1m551cisgc1xe755jr4c4bva0telp0cw3qomt5le3vakr9msym79nrrdlof8cznvtit5wqc3i4i78upd8fv9csxhqmegf0k0el8qh',
                receiverComponent: 'b1gpsz8ckjg1hhagukrg8xsrhn65m7wnwvwqiex7nj3tg9k3jwcp5d6g3nvik3wljuyzd6x6022wjfmsi6g89gtzaur9yvec0hmfbq98zlkd47bxbj77irmaxocejfyloox0r0t65wcc5lenwdpf5b1vez8xec1w',
                receiverInterface: 'vamos1swg1h0pdwask6ar13nf43ykucb2gb66bwtzprml88y1roojwx8kt398xpqhk6czxtml6aouruhyzjp652iuuj3uqdiqpkzsjsguiv62ikx8ilg8v8btu4qg6h0bt67zxhqd118ddcc3w3itj4yxe5t8bsn',
                receiverInterfaceNamespace: 'uma2a97dzr4vucv5p89w9ohb9fgtgcw2mz8bk389q8fte7etvvb6gfa9wi5kqvwom5lo500a58nnd2ctwwqo5zy24tmgdb6h81v4caig1xjf9w2ht90spgrtlqflk0o0u21wzetvtnud0exwgnb0ryfgpx82bcoh',
                retries: 8817943532,
                size: 2228317549,
                timesFailed: 2308204370,
                numberMax: 7635054181,
                numberDays: 2488054910,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '832t59x129270m11vcty3s6macdcmsyfkouapu7bihcb71legi',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'dspw4ccts35c95477hix',
                scenario: 'ud3oxgo8z8eql64lg8n1nmjr8v1qrpwqf1htzdka8ou2tje1yg3evl09k50c',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:33:58',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-04 06:26:17',
                flowHash: '649bjaddvkn5lwbr58ueoz989j67a3iudj3whi2x',
                flowParty: '6r22zs2pgrecf1awdgx10304wvz63kkrtlegcubao0cyy6p096vwkz7rkwjf2yrpiauzgribiv3oo9y6s9333zirjzwisce72lsa6wxtc6icljlc97ig0aqqxcedmnooo6j546ih1dnt457fateixfrhojfss2kb',
                flowReceiverParty: 'xd4tf42xf2j2pdecc9ntibsz8ecig8xk93uu643vbuart6pitzpy3wjm5o0ls5zh83p1gk5ia6ij8witpnuvkk300vrjiooh60vjn4x3p39hijeirae701zmpjbvk39kt3dpc57e33du928nbpvmq7ytbi2gyb0v',
                flowComponent: 'lf1apwg0z9nh7amkckwrfyvw7vdtxospk0fgc6urxbt83yy07jrx6py0y3nqppyn7sb098xfvjv5qv987sbn8e8dicqm2tvtlvc7bgb5y4otgk7yw9hptm89ihxr23ccu6ociyahy0a18moubmsguomhhjmsj9ia',
                flowReceiverComponent: 'hgh0ev9aggp0tuvy94qj259gmxducuuwcbwt6rbe6hzstm8pwklosjmx5u6vd42nvtjau1wkcwa5ouaie422o4sb3jbpgnujey74foao9cu2w48d10cy0wwvm3nx8wwjfqeljo0wlqc51uemgu95zb09jcqz0kv0',
                flowInterfaceName: 'up3gi5zqgb67wjlv12f23f2k1id3xwpzx5e6ei6td8rqt014v02p54f1jwmxzvompzqo0j28irge3v5ywg4wf92s3il48zykjh33a21ll7buv6qnqwz4mcpux9b146qjofjf87py2seispbd0ctn7d7c3j213nre',
                flowInterfaceNamespace: 'k6rcg026t9pbucw9e6k1trn3xhcal96dv8z3vfpzfff2518728ee987hkchu47r8ibxm2bzx6lrgb41e0fl3m0nqthsj0nrjtl92aj90nml6bzga01dftqpmvk43b67ome91s46libfjs552x2tj0zbgubhwgzif',
                status: 'CANCELLED',
                refMessageId: 'k3k1auja5st52c7wu0pmhx9kd5qpskubw64d8x9t003ci2qzkn51hg1qpyv12xz70xlk61gs1p77o7ksgsqaqyj9qso7up1n3huszolg02kk6k6j3szeunm8zkismzwkqeeyfy3f0lil1os4r8mu8zzpmv28noxc',
                detail: 'Harum quam id ut dolor et dolores sed qui assumenda. Alias ratione ratione tempore aut omnis sed. Quo dignissimos aut aut quaerat et vero nihil incidunt qui. Consequuntur atque id ratione. Voluptate sed doloribus expedita sunt aperiam voluptatem laborum doloribus. Fugiat itaque et officia.',
                example: '7psi49w1uz644m4cvoex0pff85fvx4gng2hx2h1syvfnqjpu9flqqvh1l1imveouwnycxev0zqe30un2afzrq7rsnxxrwpp9akuzzfdk33ofecn9xc8yn6xh8dsy3autif0rvu9eviq4cyxmdj9wfagwv7uzwcz9',
                startTimeAt: '2020-11-03 17:46:13',
                direction: 'INBOUND',
                errorCategory: '16arglnt0coz19acghzrjnml3jqjgjjzewnuf4yr1fdfacbfnux2jpqib4bueoo7aho18kgpcgtzi01krp2caafr1eirrp6bm6gz2gf9x0ejof8kqopenrf7t4b7zompuo9whbro0uzbu0hm8540atcmgbj7w4x6',
                errorCode: '2o4tm1b4t5eu40h9wb7tk3ns3mvxqp502b5nxn1s45bvng0835',
                errorLabel: 227345,
                node: 2440987618,
                protocol: 'kqsq5si5fx24th37ia6y',
                qualityOfService: 'z4ue5qtw3y8cwkz0edj4',
                receiverParty: '660r3ggqck6rhpker4x48fjnihl0il3kexe6ecd8nt1bd3du6ngrm86jslgoprnonjxbhxvqfvtxjto1va218gbncafugwx8oo07mf27wuws9kuayz7tvd98h1pa78ejeux2ui7zoh4kf0m3zpfsff3v6kk5rxb0',
                receiverComponent: 'i6ckgz3275dqueovxptiw3pmr189hiewcghb1yipjshz1sd8ulwlhqm3d0dgfkyzmrt1ayqxr31kf5ingkaawskez0sp2y7k2gs4xo4nywhglilmho5507ullr6g1ibikua6li18e1m7e91dwlxcqnakq75plp1y',
                receiverInterface: 'kywc7y2ifnca97exkiyywana7sfaziqtlzs028lw7ux18v92q43pfp1wza3b8epuy3jnlm13syuq54evf8i0oyu1hjsleae11o47ihqidbz2wpfko3dw0wndjcyoye1s3xora9kvzrpjb2ukgea8697oe04xfd2a',
                receiverInterfaceNamespace: 'o3g8wmev5s50kjnv36kou84cbczf6n68q02fg2ea0gswd11ictfzx2vd6mxmqwucrrb2caed2o4rh3om9jw193pwxap72mkhvo78g84v0n9i8cp9zw9o5hl3alkpnkfu1w7oh779zwgjo50yp9odqqjmeryao0s9',
                retries: 3190742704,
                size: 6343719428,
                timesFailed: 5073867639,
                numberMax: 2140749681,
                numberDays: 5474985906,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'azy9zhm433h9gcfi0u11ou7dtklqbnlmdqi9cczizmw554pu9b',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'ws22zvigyw0qhmo0f5ao',
                scenario: 'pr23w79xojstdqqmi5xd87o8i5t4smvv9i6ayljcwcx9ua3bg7n6y6vz9iq7',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 08:37:56',
                
                executionMonitoringEndAt: '2020-11-04 08:55:37',
                flowHash: '4685q27zyrtyszciej8b7yxau42x83xpkxvctvwf',
                flowParty: '8tmo9tqe55qgr1728xks4khe85jwjrx7abzol4gkitwy86j9vchi46kebyr1wbtubyx6iiam9t8biub0h1s1rtnyxdyqshqqnr45kuy9rofnapgor1ikh3nsm3o39fzgzgl8cak9sigwt7njl5z7qae9c62iy75v',
                flowReceiverParty: 'u67baamkyoxsmee9posef72adi0inap92rwmgmcmbzai6ne4d95skl4is3sfp0b84grybj64y2uhm10ouy76qo3d893pute08whfomtzwmu78lsrt44lovv34l6lgeokepj51xxxjyalm2mhcuti6ms4v0ixvgh8',
                flowComponent: 'nybdd01ipz5wv1ziqki1t1zpy2zv81pgf604ony3kclh9d39tx9lto8bj6netpltno1svcmmnjja2ozujklncxvkl51kyxp6xdu5ohe92whk54v4alhliz1kyjnhkg85w9ermg4qekyit1okndfugc30b3pcvlvh',
                flowReceiverComponent: '009wx3q0vpl5uzzptpjmbul7l4iagzidkzn1c8a7d5i742e2f5spoe35q3qtzuox1xfonnyy902cc0oioh9zoq4e1gtvavb0hm1d296tlqo38opuajaqoctuonpnhoe8z8xub1lzm53f95i7ciprk1udpi3nzmhr',
                flowInterfaceName: 'vkdbhc65ad9lf1rsh07h6oegjybpllmkjv3rq13hl22f14bih9cvlxjqho6pylc3epkcixzqedv0th5inv6nb9mhc3fafzo0wlp79vpl0kf9y4bqr1pmvd9cl7cyihyqw1smac2jotil6v0dq3wspv5rup6wtagq',
                flowInterfaceNamespace: '35c21wz89skjro4ut825tcozcc8xh8c15kalx8pcp0ooakea9yyqn4c731grkmyqvlmnb3ma382n41ozhw28bawn3gjjsx7ilpw0ngb5qiasnuv08hqxxdprwd4necbybr46c788lwuqk8wpk6m4r2rf981z4oht',
                status: 'WAITING',
                refMessageId: 'huz4cnzxr60sgfubt5ism0qdflqcbk0l2z233hnrd2iy5zzpjqdyb5m1fqtoqxs0itso5kyxdk2h5fwk5iu54etb0bn311jmbcxbyf6sxxc0fk1pwer2v9xqmqeyf8zyly2j8yq553f2z9wlwf4gxo53h5i0ed45',
                detail: 'Tenetur eius illum hic nesciunt iusto quia et. Quo delectus quae consectetur. Vel dolore natus nihil.',
                example: 'tkp4qiig476b04rx1vbjr19c3ptpm54k09n9wgnet8rje3b47cyz4udhub14lhfsrqrn4y2yqz0jvxj0zjf17w0xlp2frxa429jvi3ll7cy9k78tazxq6zg3xq6xfz56pqpv8at9p6m89foc32a8mfpvopepy3ij',
                startTimeAt: '2020-11-04 15:28:36',
                direction: 'INBOUND',
                errorCategory: 'i38epg4llrromxd1yduthalo17zgxj1bak27gkoi3evij3brjrmob3rs1kmkr38o9xpuywcxq1pu6wqiz45k2aufm7l4xz4zwh1664mw7le613ujv4hkeov4jj33nb6ohzezcxo4mjh6r72qbtbe7dh32pro3yvr',
                errorCode: 'yiteme1ojz1kc7n3fqf8qgb85g4zrg1t9evcnn5ckivpn40bwo',
                errorLabel: 319565,
                node: 7698392609,
                protocol: 'lonfvv2nsly1w7fmzf8l',
                qualityOfService: '8ch61l8oim65tn07kuwz',
                receiverParty: 'j0penfhxa1okgwzn4kl0wrsfxh6whxijvsj302qq701vpcc2bh7a0ltsfqzcnhmsadfxm8wl969nq7rlhrmx57majud1notywskg0stqgqsr64e66dfkd9ho3587cio20frwhhqo7t2x8rv2bnobyzxcavvzl49l',
                receiverComponent: '1njdx5iyzarinziovwcycmbpf47bd0ik4kdyp2as8oueq3ttz8kephyp6090e4xj9jjfrl5gwjdbakkjxxjfecevzwuirit6vslul5bsslly6ezzaurmn2pnq5460rjf9peit90ui8i92ww8pz1obmaroew2lahj',
                receiverInterface: 'xw3pfvk8vc2vqpqzaenq8jm668mbasqpo6oyb4imfd744t616zpjcyg3czg9vwj8jmkb8456mifpr2yojnju8xcce0qcm7kvqpjzeelty8og5tid6aowyg1ochcz2cparood65xcxtyq98y4qu3r28p1lgq8npw3',
                receiverInterfaceNamespace: 'srysxkp3lxvwkiwxcsxw7lklb9aftzjwpgzuk0purbfo3hxo4vudvmc7rycpoq9xbnvtj18vq2tn4qbp8lh9578vpbefjys7ufucoh2nkw9cvumc78er9gh8zen8d4hc388e5547f0wuz48dc5sb2du91cegmcf3',
                retries: 5006380137,
                size: 1212447891,
                timesFailed: 3550920513,
                numberMax: 2717468314,
                numberDays: 8997001463,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'hjvueb926088bs7sowq2mh9rgystxcfp2t8e661npoe4i33lum',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'qprht0c3fkdevo3fnxj9',
                scenario: '2y1k2mabgxx61r1ipzp8glgl7ibt1z9wz8t83qtsz5ttyoghwi2jlbncfsb5',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:42:09',
                executionMonitoringStartAt: '2020-11-03 22:12:39',
                executionMonitoringEndAt: null,
                flowHash: '1ni4lcchp8bfj0murkfytnkjavjyvseq13jpw2qv',
                flowParty: '04rqv2try9wpee20ljnrxjd23gopmszefpqqvuog85jfej5ids50q8c9wog7vtda56ik1m4rabttmi4a9dc7w85tj58kdbcoxljq8b4xp3yblxt7hiakmpkk5fvg8h5r1oq2y7hautd4noi11b7qkwwtvcr61pwj',
                flowReceiverParty: 'nt4xy49avedxip523924rhkvmgzd3mqi0wxipb5at7fe08gekbrz63vhiq0hzegmuiquk7axa1km94carbn6ek1o5ugfgtbttg89zave0i0olnqqjjv4ei5hf2wtwvoz3e4agjwyed3mioxw1m6estee8c8ufmcn',
                flowComponent: '6ztv8lqn2rg9mb6mmzwkrnjump0a44xx7pr3v0rb455e136oj3oi7vz345hauiem0jtyv4k6zolcbnxokzgegpnc2l6vl7tni7aavpzlh2m20snezb9tu8cdww5fpn0am8oexqyydxox4qtykycr8lsqlsh25bkb',
                flowReceiverComponent: 'tkcdfklfsfna4rfqp62r65sybl64q1h41n8obekphlekjhgrcs1ln8z6knh2ivp1h852cw6dyf0n0ndfimkr6cir1tbdrfl691nl41gsu4i1ybaoiy9edr387vlh7zj270gwedfo4xj68xmrtlcdeuc0haeak1wf',
                flowInterfaceName: 'xdnw5qwujznpw90mx5imtal2kwnq7blm08ciproscar4wfxkhdz7l0lxwgr9nlq9afdgua1k6r2i0muh4n113ilrizzmi6tqaxv28y52ieskwd9h8cxwkmm283thgc1a7aecciwb34cwtxulrrye7hbpbetheidl',
                flowInterfaceNamespace: 'dsmh9y5mp5socd3ovgg7spz54cpezzlghjyt2809bnoty2rbab52a3fuoim6zaap9050c6q9gech3870c3j9qcq0ob646butigwofowmffhzfdhpw3kh91rtm7e4u8dv5i29g3nzjmqgvy1ai97g7pvrp5dduyok',
                status: 'CANCELLED',
                refMessageId: 'ezwkpgfj2fgil50kichecpouynjiehagos7cnn9ituoqfpzqollmc4iof1588y8l49i82khseuakfbgo4qmpjcnh2z7v4rstvjcbxpzvapev1jrg0grj4up6uybke8ke0i2i8q64tpxitmu3aa3nnd1p92yhfgtj',
                detail: 'Ratione officia hic tenetur nostrum eius aperiam id asperiores natus. Molestias nihil sit natus illum. Quia sit qui in autem non perspiciatis occaecati. Voluptatem deleniti numquam accusamus. Veritatis quo qui quidem animi pariatur et quo numquam et.',
                example: 'qrczvqw1ip0gtz88y16u6s2jay85g5cfy769deo85hp98m8x6ou44hu3dmsvq4euoq15c2imnd0gs5bivz2k9ytyql86mfvbd2pbc72fqxogb6mo60stmd2xc5xulwhs3ex6wb0iv7k1x5kibx2xyo1qgir4dfqq',
                startTimeAt: '2020-11-04 10:10:59',
                direction: 'INBOUND',
                errorCategory: 'irj53l86r592qefpgn1dc7u79du8y4b78vy91nicris557jj4u2rn0lqyx0gqvwnuxrcsm9auo3rauj5pa89lp7k7z5wyn7abevexb42n4k8zkcoqg2rwlcc9w9qj4qxut6pt3f5frk9w2ued7303w4n2ail9x8z',
                errorCode: 'awql977bxk8i1e390ib07d9sjg6a4nzeisq5iok3ilapvdlkgg',
                errorLabel: 438591,
                node: 1675405040,
                protocol: 'sofb3bhccc2ygu2mut7r',
                qualityOfService: 'pyj8qmd6q7807vh8xoqc',
                receiverParty: 'lwt7qwthr2027lioyd5zektbb3tgqw4lzapnxp3t42mg4f9evv1j06jl79a6afgfnmyms4m4z1wkp982c16j7sa2z6nxwsdsewihyblnijzaf80ssbyrnrbqt6srbz1t3c3qbpcx6ih87v3qtav2zxfsfkiqiwij',
                receiverComponent: '9nmj5a8wrhhjyt9inzdwv4v40zqzr80h4c3rsvby4ju12c4w1kd2c34j0f92q9d233bllrs8l1nzc2k0u99db61pqiq9yw4kkjxtrocli5h5wht5yrfu2appm3k1rjnjqmemm0g0xi89cje3bn39k467qs5rk9qe',
                receiverInterface: 'mpnzswt5jx5l7dxlhfnpqatpszt21nbu5uoa1vyyljmojleq965spvgh3k7iigxi4a1iyjxfsl2h5yxmkaclpf8gftkoowyg7t190jmcdwz6wmjzxnatvrm65tdusgbr0224toqy5ya4zk4fn1iwarwvmfcnr32t',
                receiverInterfaceNamespace: 'n86pjhhyaty3fo2sh8myfdueioiqps9er5xu12ohl2as5a1grqgycqxxvam7ju7k6gngf1jv9cb4rkhlam2au6f0oqn8jopkit7aayano14s35guojihb2b5d0il3jiqeqhd8zi55kz0ui6aa2nrxig96az74q1b',
                retries: 6457293172,
                size: 8617343048,
                timesFailed: 8215335967,
                numberMax: 9688449498,
                numberDays: 7401023736,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'iibcko0yuo4voaxyrrjhik0jjl3xgpv92kxlmsjo4m00zkbf3m',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'm1vl4xuf19z5r10narou',
                scenario: '2w01xqtyrtozirlfk995z9gzfrojglfa4w4g7ywe80j8z32mp9gbtmp1erd4',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:49:47',
                executionMonitoringStartAt: '2020-11-04 04:09:07',
                
                flowHash: '21tlk0e1rjzds2yl7fmeulhc5z3g0phadiy4wzth',
                flowParty: '6hof5upym6uksgmh441yowghwqhku2xq8i4ymhp9rgseikdxxngaypk8r7whsa7u06w03hon32td4b8zelmxolpnyy79pcvae232rxjhoy7xt9athci131v4cxy8ki6cul9bvsvjuo7l6txac9wvghmkn1h9kzwe',
                flowReceiverParty: 'y7a4ksyu4svghf56wzhjjdt4lr4qaeu7rs4gykwirknnlskcsogksg9rdxnu5gzby4tbc5b2tfxyouyxw2s4ud8l4oo082uf7rputkxto38slj6u11ys2sxu7az1zp439smze6wcmzxgynmzde00k6nigk1kejlc',
                flowComponent: '47mqco0ttns76uamprg0zgp0ff17nzzdzsp8968eri2ifsumiz9ouxhhlfymi8wlkgo5b6syb7p3joexlis5sswe1oj8i92mr4s4fuc9g022307tewjs2huszvebe1wqhrhxt6vacdfs386a07hp9xu6tsmfegu1',
                flowReceiverComponent: 'q25cxa61gmskfrxxo967t7pr6m8u3z0b2nt7jfky8r3fczotvbwrl6zilrh43lpfe4o9rxzzj2skmyjplz3ibesz7e5ffa7k44e6gqk3jaon41y1czophnmzeswdvmon3stt8dwkynqpsn3q20mugv99whwkf2kp',
                flowInterfaceName: 'zjb0ctt9jl32mn1p1kw6h8552uwjehggkud798t4eaiyfwbysestxxxru8zdd25g8uwn4c9l2cvlbhi0eceoo2bff8dr2lv8rkzf3m1xyxport10wm1nuyovag4jcw9ekxlknh1grrl2ruwwlss5eytwe305lwl1',
                flowInterfaceNamespace: 'hgeb3bna2mnr5xbum45uhdcz571mvdzqrf1j2zowq93em5zaxuhxai2xntreamrchi3xq7snqhz64dq00erhzj4rvapwuu4ztsgqfdoor75mkdppp4vbemnkysc0qwgoaxk69umlxuo6h3kzjvfwxbdt0pcmrvea',
                status: 'CANCELLED',
                refMessageId: '5xsih8jvzwm7is7pbhmtmj1lsqduzk0decobggb73lkar7nkw0aiuuppibjmnzhxcvq9kpmar5o40nanpm54y7mox3jzwgra5ddh8juxl4pzmdipm6qf6mdo8rlpnq5bjlth3pq3aivg6oz0pscbmo6hqhaal1kh',
                detail: 'Soluta itaque dolor aut rerum quis iure esse. Enim eos culpa. Aliquam maxime iure harum eum aut dolorem. Error eligendi esse est nostrum.',
                example: '35hsnp5hr3s6zogzlnqnub7freh1dcqnp66r67kt2cf95o2r3bdejosq8obuor8us0cdf95a3ba58r4phcnwsuq06fft49yqmf8dlpry8nq9oskwwmsjthy584r52q2p4pxs573ul8tstgobwkqggbw6z9rz4dis',
                startTimeAt: '2020-11-03 17:52:56',
                direction: 'OUTBOUND',
                errorCategory: 'bhm5oqv1awbqhbvi2mth0i24htvs4nd92a1b75vib7a7lb2bklqd4c32765kojcnh92iyifa626bbjlj1f28uajfodotwrf6rejz7yhd173y56p4hwsiab118pfg0k69rtf6u73u9ox9207nwib4ahn3hlltiuxu',
                errorCode: 'v703t2j1i4fpool9z2ieltejp2c4clav065ibp43utpoqgj70n',
                errorLabel: 684797,
                node: 7093809092,
                protocol: '994o3e3klykgl7u03pqi',
                qualityOfService: '5a6vcv7bh34s3l3ta5dm',
                receiverParty: 'vvfwhv1awpqgr894shubaevo6z2h2d3cahkxk9ekbpo6w24b2z01cp3pw1mzjvrkpsia99bjfdved76hdaxxh7q12kwq82o9vth8mbogkyororqi2l6xa9m8eascs80d9k453qvwgmkh3ebffn8vsiolpsr85bju',
                receiverComponent: 'cgdb2uv286n0sl2ptv6hfvr2lbdelh41ejffoqow4x417pt4qomf4wxo2ppr6jbe2jre863he9668wzmli9v71hem5qaplbwdyu11qmhbtwnxq1nlh2e3bnmjvmg74qzsi61172sthgqiu26iidggvrqjhs0etb2',
                receiverInterface: 'zya1t62q9pvlmw1jumnv7a954bn80vsu179942aohlnde7rrknvnemb017iq60fcmow4uo9wb7cy1wih4m0wkhmndplaunlim2nn23jumlkdfl55tpxuhk2u9rozm3txbcm127w9delybmncdytle5piisjnfewc',
                receiverInterfaceNamespace: 'uglj40llll98ivsxb7r4maj46ujlyb3battntc5gyznlo5hhuk7j9syqb72j604m1etjeqswo8hwkmswhe4pun600l1upewgxa2str8z1ogu2p7r1nzn7cqc8yc5f9dgqipbu19mgy3c9nldrg9ihv4ldb5h8n2m',
                retries: 7051599606,
                size: 5145143163,
                timesFailed: 6277451492,
                numberMax: 4855970025,
                numberDays: 3788042230,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'jy5upfa71mqkfexc37z57q2f84xelk0rzfgobemzkbtbirpgh5',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'aq6ofjj1h2h6uvv1kfza',
                scenario: 'nejoes8f51l4brphz0odkhjrle8oo9ekqu32hfjg0265w40i2pla65fsivqb',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 18:52:57',
                executionMonitoringStartAt: '2020-11-04 09:53:21',
                executionMonitoringEndAt: '2020-11-04 13:03:07',
                flowHash: null,
                flowParty: '7bet2ix2c1tpawwvzm0eafesgfgyxm6720w5d1vst9d7o9xzew7ydk0ipn3oxfarmvpejl63bnxx8pa9vcfv2u4kaa4wj9jwa6l08ij66x8xxqarh1z9fqakozmbpxen1n0qjfxm01kf517tcumpam0il659k8nc',
                flowReceiverParty: 'qstchwl037714n8uc5t4ce0qi63qbkoxsfparsjhxpozvff8s7d8uxg5gpg783ro45qqxgeyougoetzy7mjkgnwoxvflw9oun90jb5w4rc6nqeb1aeycfpb5ub00lhu893g6p0s7vm27sdyffs96es5wytg0th1f',
                flowComponent: 'u6uydauqk7mjhmudoze4qw0hhywwrxiugt1ns051fo0llprdnkxd3h94dalae0trs39xhs9evppqkzrzo59gqppppi60n97wv75w70ptiskv4npwjdydexz14mibuissr0qdoreiikigqr9y05mnbopogmrchuti',
                flowReceiverComponent: 'usmbdu7djow4qmexp0kie1bgvsp5x18s9j3uv61rmyd64fymxs3sqgqtfaoquilrwt1t30engkywkz5bluxyab8ujn4gln3krxunxk5uhr4rugivc9pqsvb8rkgbojynnys1azmlowgfe7weqhvqtrd4nod077j3',
                flowInterfaceName: 'xmo5i17iv75y858fgj9bocdavp7tpxera0ujqkmbvrhqvtivnmemdovzj1jdw2x84wxnba23v6fk120bnchhbb6jigrffo4fg2w2at40tivgzdldi57k5b7ohuv8926kx5zqp76am5ofewut5jgxylkyuwyskeo6',
                flowInterfaceNamespace: 'wadtp8d7pisj9flybdgtzmpt569i459jr0stvfxrmdb74bsgka60okrl9gumpnpf11ojtizhjdb8rsztt8n5rb3sxc60unuceruh2bipwl5hdsvy60t8tddj3ekg4oc7g5gl20blyxk1ur0qgg1kycr8jtmvyp7f',
                status: 'CANCELLED',
                refMessageId: '8o0ik4oju5jiu4z9lgjsggjmhjvi4zlzd573hbw8ybb9kbt5lyvqfh4db0ngapjvtzhnwl3mrtvrpmyp0v0yg0ehtq4x4fxda27udsv2fz983jt3gbk60ew31rml34l45g8ofhk33acmrfo5kpwnztp0tmpiwzok',
                detail: 'Fuga animi autem. Laborum fugit rerum architecto voluptatem a. Ut consequuntur sint nam eius veritatis. Dignissimos dolor error ut quidem quae. Non assumenda aut officiis sed.',
                example: 'pdkbqtw3m0erdnm70novjihg3v91x8wy1euqo9q4iszkkyzoijzlqfgkbmdb6kbnnozd50n8emf55jel98og97d4entqqh1vnotys2y3aa8v20j4n6nuy0m7084tqzvub7j6zv4wkcwr8rueei61hps57dof7c19',
                startTimeAt: '2020-11-04 10:03:02',
                direction: 'OUTBOUND',
                errorCategory: 'lfwb6oclxiyqw65nvhrcsg8ho6bluyuej7168hrgvbu81r2i87gfn5yoyr4nwz1cxpn46i1xwyvvrppnvigz6felcy41rxldzygqfuwxw1lw0950l94jyt979s1bb0bld6lesc62ubvaekunqkf97ntya85g3w1m',
                errorCode: 'il0rsj44z8bkzpwrf24u8zy2comrez0rbzizpl74atk53c8gab',
                errorLabel: 258917,
                node: 3830180691,
                protocol: 'jq9knnptj4rs0j8fiy7y',
                qualityOfService: 'pngi4kbwd2qvs0riewjq',
                receiverParty: 'wpsqf7hpfq6ogsotuy12r1168dhrpm6c924yiv838sgzyrl6osds7a9bq4hniew5rqfr7nkpmog7jf4yssndj2tbjv7qh19t30y7vbkg6ffp0x5r2grx2ipk558of0vqz052n6mw4zb3pvfrh3n8rrziwce2d5k9',
                receiverComponent: 'ih72jryf3gclfads970qbnx7ilh7ij6s1j1s36m6eos398i0bmc9c26umxuwmmngj2khw5x28mbmpq2gpjpyyupmx583834zpa1wqjr9vgvfqeyzfoyp8358qb45wtbquonhp9kc0ts29b4r77tdzhvawnhhwf22',
                receiverInterface: 'tg6f6ynqlwhje03i9xwx7gqwoqrq23uh0dufcir5oy86n0x2tx6ojsfs2s9mr8yo7a9lw358xuirs3wg77ugeuyzouqffm112oekqr4vchfv5t1dgi4265h0nu78aor59fyi82wsj8e8s9yoncknjy3zb0c4fua4',
                receiverInterfaceNamespace: 'nvagevfu8qohrt312zs2k8ik9q64pd6alalr8ztrtm46rvhm9nw85msnr2x9nr5b4mxf0zdscdbjnccyxh5owz63cutzbq4sku39ppiw9xw2erl803sn7yt7c6on82sbqjt0r82wbgu8tu5wu6j7lv32zsi6of2s',
                retries: 5067190229,
                size: 1266519461,
                timesFailed: 6295132156,
                numberMax: 5808040011,
                numberDays: 1943721313,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'kc0p9cmltxt79jvptr1b4tukrtk31t085qrwmrpzjurwncqff7',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '5bx4zpowntstnm38zeuc',
                scenario: 'g5eyh6ltf8cuz9tqqd4wv0foauuy9jbi6sjj06dl8b3aqc52a35bmhef39r3',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:26:45',
                executionMonitoringStartAt: '2020-11-04 15:31:56',
                executionMonitoringEndAt: '2020-11-03 19:43:44',
                
                flowParty: 'tgltdzj110ifgbnry50zw4cky9aqmnqjxyoxq71ibki2zfms07iet165vgg9cf0jhyhvoe455r90m3kmnqs8c9bnvnot3vfccl3rezcfqeisgep8bbp8uw3ljv9p4kr1vzl5urkxgkjechij2ih7dbpsj0ilviar',
                flowReceiverParty: 'h7ju5agz4be90jzaz9npb2h53ghgtnr2tjwfmq3m7c2sri7k020napuvd30hdhniby4pofsvp78t6rb9175zbgq9s7zbakkms4c35r3vu7gdcx5vy4kyf7mp972ntoqxv4jq7d7apos3gvi919dqxf283cronrqn',
                flowComponent: 'vzjl7ol1iywog78lpqoqehg6573bfgam1xhk6xj0dbs9rwkpc3hnn5tz93g6h2r56pqb68xrfd9xgd4ecfhlirkn9n2vxbnkcdswlvkxm1odwgr1qtws1ug6fad7o027fkv8e79uiln6ze8ic5idfz1p7hzsqdvw',
                flowReceiverComponent: 'xadeq8iw80nnqdr2t98t05y9jv99fscpw4shoxs9cjno56xarrw2xfgdfxz1f0lfj33fjdavrw5l8wk7i99i6bn4ow5ves3jz0u06827074ggu6h0t30cpzn3icr5njh1rhaf32zc9ucfubv9a79if0naajn16bf',
                flowInterfaceName: '9ftvsf47y45fcwd7ytlieq0ztj85ezna4k7zc3880o6uq3u1t77qj7gxxa0g4ldnqx3q1ira0sien7gdgcipwgs5y2pv1n2dq9cjktx11lhnqgohgp0seb8q7e2tr4ehtpphorx9ppi4ixzaaepfkeq6r8suxub8',
                flowInterfaceNamespace: '1lctk3njseyk2fxqffp2f1n5wsc2p47m73pcug100yzlnztsr08y88gp449eimtfgc3r09maiji23z9d3p4l5vv85ug3ar4h84inwlmqe7so86uwfgp5srljv4p6bxxjk72ddyzbjsl8jekeadcxcbab0d0jl03i',
                status: 'HOLDING',
                refMessageId: 'z87zngzk842flpbkiasfa1fadu7dqc0k4rera2akt7nzko9imgx5gd6mofiuk37kpwy1pj8g000p4ku1lakbx5mwspb7b5y4p2focvrl1rkneacfdsa4ocqil3wqte2rqq9axq1fhonzqt8icf7qfr35zmi5g95g',
                detail: 'Aperiam numquam pariatur error ut ut voluptas veniam consequatur. Sit eligendi nostrum aut. Temporibus ea incidunt libero est odit eos recusandae accusamus. Repellat quisquam repellat totam aut voluptatem et ab. Amet eaque ut consectetur dolorem quas quas aut repellendus. Adipisci qui placeat debitis accusantium est ut dicta provident fugit.',
                example: 'qbbhp1jouib51hytdlxk6k6o10rn2wd2jl6sa310o2jg4e5cfhdatugzsw634snoo2r0dca2rvfkv4mkq6krnp1r9s6p84xr02kvo2539gq2x2pq7zofv1wx3es4sfbnxvvixzsjtitw1iz3vpv6clb7l7nm4xxz',
                startTimeAt: '2020-11-04 08:57:59',
                direction: 'INBOUND',
                errorCategory: '8u2myj4ner8gakockzh9ugkmkwhv5jbnpl7mv5ujzrzzlcv954cgcxmz7kvn92au24gdhzpmsl13mb7sw3zjg3lccqghanr77vrev83x4ahk13ic71pfkiidutgkpx605v9oqeor93ge4x94krktgo6s03y1ju7z',
                errorCode: 'm733n1mjrybie7v4oec9squxnoenw1iqahekypho1fc33k3qoc',
                errorLabel: 694977,
                node: 2677559255,
                protocol: 'x7c8x62kj817394fsg6a',
                qualityOfService: '1wun39z52u9f7i8a2rvw',
                receiverParty: 'fdq4jcewvm57ta9rq8aw04bl563qo0899baukklh6shzcr63vrpbpvzzkad4qib16uuzirgp1i2ed6b3232oafgydfdbbw28rbhs13dmap73jqux0rie1nztxxhlujnt3ynalesda79p52k4uj9juhukxtv4u09f',
                receiverComponent: '5hizbcr27v1p7etun3j6szqu3t1lcjyawvipxff3p5ehrrhiqqbbe0dwy4ne4v1z3uva16i7icye6fp5mmvlx5ddrrn6vfx9acy6j7iqtznrhs4va3wn06byt9e8buafepo2vb6mudvchrq5gvd5p7otitp61gmq',
                receiverInterface: 'qqqnledzt57zh09x02686ku4qyfh4llxfexzfx5da3p7l9c86wmh8p8q7kdymarjp02g4wtlg94r94md9la62x0cwjvi280q3l6ls3zcwnom0wxs8iczvhjog45557wx97jr0iywsabfspdft5bwqsklc700nozf',
                receiverInterfaceNamespace: 'q079a0l4a40a07qml81gd3q2hxlhiuvcf1unwdxs4hx9zfdjf7cnxnaei8yd5ni1c21sod3np4rh8zfjv15kq66zx4ohtkf347eiobtn85jmkd3u54fq8hzg3s5dgjp5c74y4459gvpqob1hgr2cchy98qk0570h',
                retries: 2401210268,
                size: 8604255475,
                timesFailed: 9751548083,
                numberMax: 8391689483,
                numberDays: 8617828668,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'ee8c9l36lnr87nlim4azgn19y969dte0rgcma567tc7qh91xec',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'kse1hn1vf56a6bol9rdl',
                scenario: 'osvjnuqt6z7lexeuqlxnfd9pobujs0fh5dhqavrxfvdqfm0uqxajh7jnn444',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:21:42',
                executionMonitoringStartAt: '2020-11-04 01:15:25',
                executionMonitoringEndAt: '2020-11-04 08:12:18',
                flowHash: 'ml7b1izsr1dslomjirt9llpljhhqq1a56oncpun4',
                flowParty: 'juk5hbkj9dhis6f5dxvj53cqpbd9sxisugji5kxxxdbkdecfxtutl4p54po4se4k53zlkcedi99lmo47g03wyzqa5pwgcqk694n34x91thb6y01k9tbnj9q44aj2m5ysod8d1tmpl9getbox9b4ehny4ot9xsx6j',
                flowReceiverParty: 'tmnpevup1f7lv9xyyaj0kfzj8v7rd5kf65ohdqhok2z4g4ss6z9isevbfvz8afme7r6q0hpd0sh4ls88880d5nr0g0i674x4a83o1w9j80k3hj3b2y9u31lzgm9xmt9ij07hybhntld7yv2080dx8byx6zuv352o',
                flowComponent: null,
                flowReceiverComponent: 'lnza4mgq7jgofn3ljubs7g1nv38bxqmjdxzhixmwy7uydon8y5iy2ke1w9hn10b9xz2n08cqttapshfa3syor5f88dypf79up0jtu0lvuufu92g0rv4x7veoblopvfcwirafv4yscv6nwsh8la8tdxqt4jbn0lzn',
                flowInterfaceName: '4qedx7dt7gahh12u2jqq6eq00ge2fit5drb51afkq0oufkdj8gssgkpgagq814w9ric8kxz2rhrzfdgkqxyfz3d7kwtap9op2n9qvm7s6t6v1jp733otw9uywiw84jollgcfh7g3gtowq3uxbg9wgkgt0laq5dxl',
                flowInterfaceNamespace: 'enpyyujd78lmc1d9lx7yzaj3dfb3uuwlha36biutm4xeytqawfcj2ed3y3ro4718vsx6xt3wy9dpyqyqxrwu5j0quhsbhku7ku4of1a1a0wl21xrfcpqo4y0rh8gsbb7pok62z8l2qjk0uftnjtuqevplrx5jy52',
                status: 'ERROR',
                refMessageId: '6sxbio48iu6qh7c13u5gfm0o9q2h3pyo18q07k2f2ac3j644islccfrr0ne6x3ma3l6i9dvektte3k30wzkz7xhpcwpepmx3mjjh40suw34fttoeunk9r9td369qergrj3vzvodmbir8j7q70luvbr0wzyd1jvef',
                detail: 'Dolores harum molestiae illo modi at autem est occaecati. Provident qui in dicta ut illum natus cumque sed. Facilis nobis error ducimus qui voluptas illo provident quod ullam. Perspiciatis natus eos. Ut laborum ad blanditiis et ut ut ipsam eligendi.',
                example: 'sko2s4tl97f1dqnn53ldz04bgdby0zybqbsb0n3shy93np0ec0a8u96w2jghn31snssxdra8qo231zqtgi8nr24yerc03icv5htzepf5khyil29ffx6xl4hlh096q975uc2ywltgm3qbjioaeqbm69l2487o4lcd',
                startTimeAt: '2020-11-04 04:39:46',
                direction: 'OUTBOUND',
                errorCategory: 'yqnldj1rhyn2zzekj2c0t3pdt8jbu85dv68orx50e3eg3ltb3fttqozlxfl99vld886mtqtc8ditnp8e9h2asxf46u4pj3uyj3d73zu3njfv8odk2mfa35eqquyxoick312s6i6u6uolivzdim7x231pl540jk54',
                errorCode: 'rcy7bdnjpj6whtb5syvseh56cfhci63xsxyyqj6mzpwzkhwih5',
                errorLabel: 437664,
                node: 1119560606,
                protocol: 'q0pvalj5meitkgvz1dvu',
                qualityOfService: '2oq8isz62xhh8donypkw',
                receiverParty: 'fmptfq9btioo7nksyw8xtqxv6v9tzxum086bbqflbygfn8q9s076hd3u5mauxvfxagzfunktn3anb8111ibb3ak01ebg6iba5ifeg6h0879np3h03bvjs9zz8st88cwpk6u5f2tjdfzf8bub666cuyuj9pom14y1',
                receiverComponent: 'yensiami3bgfpb1b5k0x7djmfxbdvu5rc1hzt81kak3ju0i7kjtfe167i60311mc38s7fppb1i94h7cwd4mjvmc092m1zgi3b3bup5xciheahzt4jb03ffec0noqs86iiq9mese93kv6r2hi749sejafhcbpchm5',
                receiverInterface: 'g9a437nrieq6nmsakghnvoe7216ripr5n2b96uvuo6eestvuuhr5pmdkt97ov1eqfy8pd4sdb9cbw2jsu226wbg9kjq815x61kf6msqmf0ye1jbu6w6aej07t410q9ci26niww1b9bjosg20f3nyyjpax5beer2i',
                receiverInterfaceNamespace: 'e0me4whv6ep1iqrlwse34dkmv0c8g50btyxhc8s4brd9r3jtb25cagstm9nxuepcphqua9if670qlt281lzf1lq9kodqjujb2s2xy625eu7m963n1snhojqdtfta6zpxn5bnqhfh7lr3v0n6hpssiof9ce49yc0d',
                retries: 2890095120,
                size: 7501842618,
                timesFailed: 5644542136,
                numberMax: 6775255843,
                numberDays: 9669931477,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'wbmlkousje9nyxekm4jpy379hde1d0g64rih81zlvce0qrkks4',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'n9nv02vuwww0w9y86cy1',
                scenario: 'c9zhz91lwax4bja0q3gpfvl8snbt2mtkvbotb0vejhz2hcyzji54qa4nwbdl',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 13:27:09',
                executionMonitoringStartAt: '2020-11-04 15:30:31',
                executionMonitoringEndAt: '2020-11-03 22:26:37',
                flowHash: 'y26im0wj9n76b3jfo09rc3emz5yxwimdappq4p15',
                flowParty: 'nny30ebbu1jbj5e49m56nwrkmygtqfv6ur1srt33difmxoquxcyonrgk2plghlk9eur1hr4buvyuetioi5q2a68j9rpt426k2wr9jzb8b7a4ja4qsydixhg6dxi6oo50atmtwcn59nmkulmiztyg1ss5qm8ym5tc',
                flowReceiverParty: 'sbsiwpco893bru901nnovem84d2wvc089iii08msviyczov86mgxq8zll48xkwtk2axx196cqcmphe8ku3w2ji0696parwuja3r0mgw5892euiqww1vzndzp28wp6mgif5t9es1yzzdjacu37r6iqy4t2lhwlpi0',
                
                flowReceiverComponent: '3ttfviz4ht14klcdcdjprbzncu1ambuyvd6p48s0rul9gmw0ebbefve5zyt29ycw4v4n4sioeah4vqgmikzsfkkieo1tfdk3mtohbg572l0921rh3k7agagb6v0rffc3kaengsz9rtv8dz7aa6z7mej0s4myn622',
                flowInterfaceName: 'n9pq8lel8pk8smkcrpvv8o3c8llj5mgcewndjgwxms1byph2fd4zyl954h4mc460oa95x5an3wddpoyg0vu7d1foddu0w4b3yxsdw8mdl4ll6hl7k6lzttryqg1t6d1huipl8nhbarqciucj2xyd0j9s8p042nsn',
                flowInterfaceNamespace: '6ewkcqal596r2pe86g5hqog4kwlyvrarfnjapawmbda9q1iuomaas0swz0zspmtnv3nix0z7fsz23aup1iqpksj0ll66svs00w9tqognanc5r4vjg4eajg5kr77f3w7ocszylwe3mw0jfxtvry448hd5j1935mf8',
                status: 'CANCELLED',
                refMessageId: 'gvyeu0m69q8ix1p157emkgfayp4jsfuzsjucbwtbb64wlchpzp9cca9vzuq9rymbq06adl66bsvkwq3bt1aoitwygfqr5esn9hdt9yxtahv7368pnbue2qy5ocy4lpsjvfpyw00ofqcsklcf7p46iypcgem916bx',
                detail: 'Sunt sapiente enim unde. Quia qui adipisci occaecati quod exercitationem qui provident aut. Quas ut eaque quia. Omnis perspiciatis dolores saepe dolor vel omnis eos. Explicabo eaque doloribus odit enim.',
                example: 'ypwi5yf54lwjqkrxss9t9ca3z5nrur5n0l0ibtqyb1hb2ts48k7s39h1fy0g8asix4rep9rk03cuv8xldz2m39vjn5qhtdtt06fdlbgo1ycvdzj157h25rxfz2j2ckzsoirbaa06d2ch1bk0t4w13jqk32grtx6k',
                startTimeAt: '2020-11-03 16:29:49',
                direction: 'OUTBOUND',
                errorCategory: 'nxzqdcx9h4y7z113p5pru7m5lz0eqmayi33j3wkb5l14xnd40xu1wco5177851a0937g13p5z7klyqv9oxabc7kijvrf9e8uk9uhasiwoj3wfq7ijd2r59640qx7mggg5yak6fs1jfu6d0wjn0rxg7pj0ze96uij',
                errorCode: 'h8b6lvt6fkb4g394xa86fdndn3ebm3n7gixgpt442l0flwj7le',
                errorLabel: 921706,
                node: 8163867203,
                protocol: '3px9vc0lh0bdcnhiex90',
                qualityOfService: 'zh4v0sfizuton0xcjk01',
                receiverParty: 'mdwsegn3pt9c22kzchhe5jxs8ar0kzvp5yjijzhyzspchkaobsidtn3quwnum99ztk3pzhfjpjx1fb1rettl66lfxsr15k5gudsfgo711xg6lkai85z05fmzyxnzxbn2nhxjcdsqfyzwng8ti9btpkfngbs0o8ce',
                receiverComponent: 'ox2u0tu1fln6c64vs6ot1278wyhvrtyek1yp9y1gksdiua505m7xfz5jgiqu8uw994lskj6wt2xnowgcseazwb5f75sbe3wigbk72h03xoexplaecdxg90flzz1dqh6v8k3lmrotbq8gtn07636i29gi4z01rewd',
                receiverInterface: '7bo70fjo1e29bteas1hdgcx2e8vopwevxixqdaeyqghs8eopl7rv2oyetdfptrfth57k380nqmafk1z9s4gl8xzitnzme0ptnf19ban660y7h5nkng87n9t5zqk1jxgyzsziqryzz3h5q1g8gcv3l0y5bgbzqkl1',
                receiverInterfaceNamespace: 'zgx55yb5qits5fpywcl1vq5s77164kfq92j4u8g21nab3zdbkx0y9qp6pxc31tv32p9h645fa0pj09oq6qi1is6venzl378ay0fc5kv5kxvpc21a6tuunm55elp9d65gvg8jtwd8nayjj2iy571xqpvkbkh8lzc9',
                retries: 3873221405,
                size: 4624344576,
                timesFailed: 3863052565,
                numberMax: 8152280914,
                numberDays: 7943403763,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'wpip7kywnmy4mrl24w723l9yr9k5l47of3vzjigq25ysqp0du1',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'vspopt1ep1chda6vsm9c',
                scenario: 'axnwtwjs8fucvwiqevmnf8ovkyozstwg20972y8czwo6j0l5sl1ovon9x24q',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 15:43:00',
                executionMonitoringStartAt: '2020-11-04 13:23:44',
                executionMonitoringEndAt: '2020-11-03 21:30:16',
                flowHash: 'ndfct8x6irgwh2eiks2rmzsqt7lnkc1exxu51749',
                flowParty: 'cj147p2st9rdckrzovsx23d9kjajfgwjyirflry0je2h83ahu9wixhqbo27h7ju3bybhoud5pdtyl2lwzzdzdc9a1jmr85305r3dsmidrkk3bnm23x4zqoh49hpw1mmxo6yxyzpixlu060el5zewh5usaj492x4p',
                flowReceiverParty: 'snx0y9agsbha3pdosvtx5t373jncck2tvwlt4fvg6jlux108hx8ace4i0gtq8gi5dzbhcfu8y48cq8oge46jf0929yfbjk4fd86mp266espyza2pxwqg9ejeacywa06b2xd998r22n4y7ykf0kgpgx9ver8kcdks',
                flowComponent: 'vwjw69i8cjzy4s9og887mwxrl9cvikgvgppb8pg0kmlggesxdubk84qgdzv4w3kqjk53xtdp9ej9xq7xfujk3cslkqo7fp6vo01506bfkyfcm8q9eaol246qqv90hr0nqdkqgiz2c9hm12g0tw6yu9diwish0zf8',
                flowReceiverComponent: 'y3bx4ol10al9h4aqtxovakfsupb77axj4fbwoshegwii06hhku0s4res6a01yoom0j5j4c9jo6ne5x8jdfmkb5wfck5362ap0h6kq0ylvwugfonf014uwhe2yuaq5v85a2k265j1bq2hyaqgfnvvl0x9xvcdt88b',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'kgzvfq7hzgda9r1whn3wqvgwhdz0rfnuj1mgg0yd4uq4dt6r94tkqvibw99blbqzo37qky7rigvd4wsl8wccit1nc5qszkj0q24k6qq1gexxcuh74pargb62qqnxzm7oz8pwahbkamr2uv66q6oyvx9sh9ewvbqw',
                status: 'WAITING',
                refMessageId: 'nsnt2q4vbfbyha5gzlo5e8hyogq4g0gmoye8c26pqmew413ihz5k3apyf9dov3zxte05vqwxnd2anlh1osawu9rb5060qzcrlwk38o5f0ysrzafi89zhonx6yyav0aiwk1revvib9h9tjn5qsl34pm6wixs9ta7l',
                detail: 'Dolorem et aut architecto aut expedita sed id vero. Vitae quia maxime sunt est molestiae qui quidem ut. Voluptatem a beatae accusantium itaque omnis iusto. Dolorum sit expedita quaerat molestiae. Ut nulla non sint sed quaerat quibusdam. Vel nulla nesciunt et magnam omnis.',
                example: 'acrs0abiy4wjwe6ibucojdzco1hr2l2nkm3xjfd0ul5qrlc0li2fqw6jrub1zilk4gs3s7nhmlcmpiyg4ddqe0coaqzn6jjjdyj58407kfipnwjscico1z70187o7t0hozznfoideczp2j4l3yvowrhd0w6hrth9',
                startTimeAt: '2020-11-04 07:40:46',
                direction: 'INBOUND',
                errorCategory: 'bej1lrdvqq5mx46p32t8j4btcyq20u367bjw3jj7salfpj2aztg7k8fa1xwpg6ox9dwbk6pp92fbgzmzosuood6pwcnbr5yguszwtow8j0jqrg5aetaovxm9t2tn6bjc93ofszqyt7422zxlmsqba8dsjm6a12r4',
                errorCode: 'o9qwb4nxo126eavrycvwsi2aydgquqbslnuda33kra7zd1jlbu',
                errorLabel: 299993,
                node: 9364862527,
                protocol: 'l4f3xa7r42qfg38syqmv',
                qualityOfService: 'yuckpcna8ybwuj7778rr',
                receiverParty: 'f702vbui1omtgnjmhyovztfhmj79f8jhudahfhs8uaoxngwe7z5y8r6stanoqsh2emzisancc7s1i4xk7kmjvvxxuuxnwic8lwimz36xwr2z2qfhh30kcat1muurna4u7zgaji9npidxp8an512fxjl3n77jidi3',
                receiverComponent: 'nu2r8lakbxisok76v7u1hs380qgzv6uibm6r9jkdpbh0h40szuj1tilr7p3m9y4bx76gyak2351cj8a50fbz9jb7rny5ekjuk5gpcqwzmzkki2j4jd94lsxn7v6nl6w5emq4gn9lt3rrgatmpqfna6omgv36lxa4',
                receiverInterface: 'gfekkluz0xtniuu1z9we2re7yscj8tavm05bybv6nkbblolmedsc3avbk7iutwzic1nrwwoifl2kq88ea9b42gwvx8olbhx95c7eti6guybep4rq4l89kr7wgpnxtrrg3mm64llxlohsm07a6nlpcyzzeqp1toa5',
                receiverInterfaceNamespace: 'yb790gg878twhiz491i2v5v97qsxs2dt4qa0z8n0z1oox0cnf4143jo0e3rpuy6fz4itc7lqegoh9hnnu50lox55qlfhojrpvr9ntevxliz5i72y06lz2q4blcquy1bggidcj0ic01o0cnypc0rn80bfzyh57wdg',
                retries: 5949066325,
                size: 8829328861,
                timesFailed: 1351368691,
                numberMax: 7354419650,
                numberDays: 9957407876,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '4zgozzfcdsf0xrxbv849x9q7m3g3sahkp22vrwnn6nl4fidsm4',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '4t5qh49t84eqh8vmvegz',
                scenario: 'mjo4tv4mal3ndlo26x6muyhvl3q5u45pqpi53sm507bitgmqu7wndyucsggl',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 02:41:21',
                executionMonitoringStartAt: '2020-11-04 04:12:29',
                executionMonitoringEndAt: '2020-11-04 05:49:45',
                flowHash: '6bodk39pqxnpjckjhh723m3snjbij6ge7ua9vwgn',
                flowParty: 'r6lir5tt0xpgk49smpyky5fppl42t3yke73p6nh43jwb9l7svr0twvvmi95rsirp9vwh4ozbn7yasl6qi2uhbvrh4yn64av8u1pnuk2th8nalnpwrxkyq76e210lnp4m2qiz9w7vtsz13blwpqwrm8tw5sqdqn6w',
                flowReceiverParty: '3h4rtbvfkjt01ikbwlzvasj2m0nrkedsjkszk62ag1vvop9rapaw9yvaqvgrbgktwtqqa78j9w4tajjs9d9b9ey3lxbyb9mqqdqidbfm3end7kye8o4f59h7kgt0ia8pmu1mreoeenku0yfnq882esfvns6sai17',
                flowComponent: '2ewt2c1gaw9ea2ga5u2771s2zzamntwh1ila66ljfxrgpb1fp2gw0ke2ok6k4xke6gb4ant4ii3qqc0l8z8m8a59077f6tu10jeheqyvufbo0itx9k6t6hzyrtul5exmew7g4ki65uez24tglz7feg6nau299ms7',
                flowReceiverComponent: 'ni7efd8x4br2b0hg1lb6hr1sdjdgb3lz71bzrgdkl80bhwi84b33b0j96aix5ndodupxt5kcw7xt0smusyjadc1i73gako42te28jk58eli0srhsayj078ozu5j04mn8tewq1gq40pa2vyjoivnl88dya6zt0ylp',
                
                flowInterfaceNamespace: 'khewewxljtgnetvxosual01kl9ygj3krlzlojkta6zab3ce6b3exicrm5724mvm80y1geefugb1ysq747urtirx4k4rbdsu52uvre29v8j7m4dpb6p4te860v4zie23a2f63xf6fw0i9otq4q1idxszf8pd8fa88',
                status: 'WAITING',
                refMessageId: '38r3b8hj37kwo2fd8y351usr7pgt74zlvggeh9i0c7g73mq94h9b9zerep0n0v9bduokw0665ots04sn90wpuptbe98ahzjdlkc9f50f1a7w17pmkz559zvo0u6qc9tic0rtza3c32fnx3zgm3uhyz1k0fbc8rcf',
                detail: 'Ut molestiae rerum. Omnis accusamus cumque consectetur rerum. Delectus quis exercitationem. Ut quia et molestiae accusamus et placeat nam. Quo perspiciatis et adipisci.',
                example: 'm5uwfj0koi03qo7qa6lq0icau0ogbchxzokvqoas15k8gfrzax3amk5tuuxzxercxgil8hepf0teu9crtoaheupue11iq04weli2nlpw9w3g5csptk56qmhwqrj7cj5wsh5e18gxt7fz1samm1mfgzn0cvjmfg72',
                startTimeAt: '2020-11-04 00:46:37',
                direction: 'INBOUND',
                errorCategory: 'wseuezo28ciji9f9d60lyzqiy4s59zgi9bia7ufqqxntysi7wf9fix4p17swu9n3bkpmh7koy7rhe23un2alx3cw9if03dhabvrbigfd851ar2636yev9fzxh3np6v02a621ri4vfxfpcuq5glc4mo3dawj6hwt8',
                errorCode: 'en1bmo7n003yqmmyuwbpfi9a39w142enpzqlvmhm35xcecfzyp',
                errorLabel: 157783,
                node: 4152502932,
                protocol: 'ebr0g836lin8vky9qi9a',
                qualityOfService: '7gsedydaq9co6qy46tcc',
                receiverParty: 'doyijrmme8audq2q2qwa7x6i9xh9xs378dx2pkyxgux8t3xynxe97ymsyvbdaqcsyc33ugsphw192ja7seg21mqk0wgnwqwkixdhwtf2iglxua0tp1tx7s23mq2tmqp30kfn36e5h8qsr567ub1ic7mw789ei8yy',
                receiverComponent: '7yjt6u6ath29dh6fk2xew1na8ipatm2j1h0rxyck7egmbmn7lmabtlgk3u7vbhk2iuwuc92c1mhpeyumiur8ora8uzu4cgmclblg03homywkclvbda9fvv5btv3d0wvycm3i5x3ew7320fweebm9oloqrinnxuk9',
                receiverInterface: 'oy21osfg4eqt5aoapov0r6rox9ee47p3mflt9p6a4tufi42fnef5bo3dp0orpgkacz6muv5ggtbrs18jjq7enunxfpoc0stlilza8i2f9kp0utcqikhj8ljpec83wk03l9mhck7h00sxshyh2uo5noons83yl224',
                receiverInterfaceNamespace: '15xoa5whxs5hzq9yppjcu931k5sjqwsnhp9zq7oyooon7tkzx44p49d7tgf3m0e9r92q3l2rh0gxeogcs1slx7keruapmeypcnim3vhp0cnqu6ahto338pb9tylhs032bnuyhe21xtby09ybovcuttg0fhrrbbz6',
                retries: 3453784635,
                size: 6669779735,
                timesFailed: 6003498286,
                numberMax: 8545188042,
                numberDays: 3670114478,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'lq88p3oku0cun17tj0yvpnvtesplcbhujj7hiasaz9ao5zazfg',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'de3mtf081u6fcf6mbheb',
                scenario: 'ndeshjz46hd5fl3v6bl3r3zijnycde8a2exw6m6c9onqqaisuglv2c75oye5',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:11:16',
                executionMonitoringStartAt: '2020-11-03 20:14:15',
                executionMonitoringEndAt: '2020-11-04 02:21:13',
                flowHash: 'c51ruhc07crn47jdbbf1c163p5jn8we2ego423qm',
                flowParty: 'cexeoq4tvbjpb3dbf0a1y0it76q83ad022659gtymifgylrm5eg6ksoogsfgacvqsw20ebtv3xry2vb562cvfl15wvfb4qx4s4khj1hdpbo604g06m32vtv5n91hzdnd9mky9wldpfx5vf1q4oo986ami8an7xay',
                flowReceiverParty: '977zjt5lqedckazttuu0ivdor5hzaapf09jx623r7txbutg202k9okquhmt5yko106f9ydq11auyb9j4hlyajijx7ihmybxg1b1pbkefflqgsx4yvtg82v666ew9302mw3jh4tqmr7agwlgrubjcigteqgbokzuw',
                flowComponent: 'kcw7rdx2dynl9rrbczivd32ul0xz6ay8umzaxwsn3wd2iy38fowj8bet6wzflmy59bnddm41v60fgi3xjgwt2657oilqp09b8b0llrnhnvwxfm2yslzv7m6b6dce1fmb9gsfsxd5a1bx2f6ph3xt8qgqrkblxmwu',
                flowReceiverComponent: 'kw5qiejrq6fbbkwk5e7m1vlwd87axec2du7zehs2llh1vr7xcrs2u9cmw0pf1ditaf24due5hme4ums6quwgrv8yqzfutfx0piag6gymnn3g8zvtkrl9ouyj9j6qqujktxi6us6x32604l4y0bqsf6oo8ewv1ebf',
                flowInterfaceName: 'jcfgiwdvzpz9ie3ug9t6hng6355lo8s2b4ssiw0dbsj2bnz5ba16wsed1bgpiyhkqw17tktzdahn9j1rwafaiw6xl1x7lu6rhw22pnd9ca6j5jm9jffratzjb0aepdyrvdxiyixgazbqprklyo2j546we01mzx95',
                flowInterfaceNamespace: null,
                status: 'CANCELLED',
                refMessageId: 'la7e352qa66347hllx19cr4ih49uxrtvkni3lut9euar4ehlv3q4vik679zemthp9c6h4vw1av7wk8s4sackjpxgvchldz4e83q8kagpx88cotwhpf64u6lq4et0kuwd1izlfte3r0udt9hvld04huedosp3hns3',
                detail: 'Incidunt quia voluptates aut consequatur possimus sed ducimus. Ut consequuntur perferendis quia qui vitae suscipit. Et et nemo officiis quibusdam distinctio dicta et.',
                example: 'xkiroqsnwa11p3d45vwwmvt63urkildqmzyrycq4g3xmx3lob29td6uj9njwe8p933qaksgr8rfw6piiwmydlr9d86i05ycuuylfkqny0ktop9g7infhdwp24bzck7kq9wnhv1b1cibuqn9lhj1tpznnsbv4x3k5',
                startTimeAt: '2020-11-04 08:02:39',
                direction: 'OUTBOUND',
                errorCategory: 'o83zgqnqy53fb4bpz3moth4jm91y7od2zg8wjwmputq3sorp7n5rxj5iyky2ltpzo1twuu1upllfnwlpr7cqzz6ew8kta22btoyn768by2xear1hr7suktatv1c2xbkhffs83ryn323xe6rocqifez9kft90gomb',
                errorCode: 'y2jh5d6ct89d3k34xjt5ilgjbluf4kpoxt52yma82q40w7j9u0',
                errorLabel: 896555,
                node: 2210819086,
                protocol: 'gveq8bagg10h9fjty5yb',
                qualityOfService: 'mcmpau3ynkbkl9va0x52',
                receiverParty: '6pgouat3m2tvar4wzfi8854s4furifpv9gjopv9p3mx6pykik2xqkg2fivt9yiw60hy6a7f4ixy30iza7lxf7l5utiil8nbnfrh6hq04s4igwa7yffcd7f6x3073ja229lnphsvz8vsgualt8285749a2xgtaock',
                receiverComponent: '6bgvkelixxir13mfm35kaakt8refitu66gskfxx3wc4lyzu7vd4ko6p59z87dn2rr0wrs1lf5w3b9y0isnxgffrrpwf2g2bl90t0b20z0o6taomt2gk3xtqu2fcd89lywoo4vcljomk6xr5mzlmetqxpe3tkc684',
                receiverInterface: '0fyt7kvbgva4t2v26tpa9j5vrh8a9y1md2840oqzrbjzlbe8se1k5g0p82ioirt9i457kiirxymxp57ftmkuw4fhobfj904vvjtsg79w2kqqpxgo7lczcu17kmm2mgymnbq9f2lpgl2iegbm2gcay9b10eq19sb4',
                receiverInterfaceNamespace: 'mciztsln5db47a77b2sibmpvqcmr18gffc72aywexc6ro5363wvchae0yhty89c9ofuzxk5wnjeeaawlydzsq3uintctauyxa7yw46duy8h7nx6zqqklhtfa8jdq6u72aztchxhns471d9vlh4muhmzrojap3lrq',
                retries: 9521218392,
                size: 1508688309,
                timesFailed: 5860801596,
                numberMax: 9646709561,
                numberDays: 2890032841,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '9imjezbhylmbkacwgn9gh1zsabxwx3ll3q7jm112jlwkzpp8zj',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'avn3b8squqjcinrlewu9',
                scenario: 'vd52dlxuv1wsub6xfrrys5kd7c9ux8g5pm0l2klpctugg2dp61h261mwqw6c',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 01:08:26',
                executionMonitoringStartAt: '2020-11-04 04:46:38',
                executionMonitoringEndAt: '2020-11-04 14:49:42',
                flowHash: 'c35i7y2nftroqywn2knlruy3lplkczdiwmh48z0y',
                flowParty: 'qw9d9hbjanjbx6z530ucwdjqbtqrkob29u9e8kao3fuc2bvvf5keqhqn6suax9knxagqso5avtd6k31gbxdwtt85ojna61p0pwsn9z8cirgaf1tikblmdotpi1nhr46frqfodc8iei80genyot3fp9paz9cmymkp',
                flowReceiverParty: 'zpetdw5b0431bvfmj9dzwm1t26olc41cgq78krsl45flsvw93qbmj12vkswlnxjuomvbv6dcecgu480mu2t8gyv07rawp6dpb50a61hz0rjuurk1mt4bcsecgseshb3ohinjbk73y192oujfvd2ehlw034591b7e',
                flowComponent: 'mzfyvvt2my9zkue6s6v0wx8bak8svbol6woj73zrfyjfxpz44duceurul1lzfajf1id86drc7aiakxs8bg2iedxuevpt2bejpzdnkboyw89k8q6ysb18uqui3wlwcpxcmm6xobcemtsy3f13i8e4gmu3mrb0qhra',
                flowReceiverComponent: 'fx241dt21oevg656hgadhvnxxotctr4yb06givldd3ur4oa612o3kcigdsl9ifokh2h6nrjajgpsoly5tt1bzgyiz3nt8ylvmoqx746kip64oowc0pv1gx8azi74q84dkqr2k3dqpiv6sorip3gseuzjrk8ggyix',
                flowInterfaceName: '8ihe2wly0dyq3m8hysvk0g49dxxsqsuh27qwhrcemylbogvcyb5hgk54a92240t452o1vlrbl2xjduvgylqsg8ypwebhrjkkihdeyoz6bydkxg9zpgfm4w8z4p6eakb5xl16r1fm2vpy1wwpfl77jmj9cf5i34i5',
                
                status: 'WAITING',
                refMessageId: 'i75rwotqxzk29e0xyszg8q3473cy1alxu7oyxj3nm5wif1r9ny3ycjr18v16n1nkiu3lufbx7ko4myb3cwug730uroa9r56pt72fz1gd34tdk4gd9xv73f5g5x7uz592hvetz1nemh7h544xr6uyuupy17z9bhnn',
                detail: 'Expedita qui hic illum enim voluptatem. Eaque tempora temporibus ut. Qui non vel voluptas eveniet qui sunt ratione fuga. Possimus laboriosam rem sint excepturi fugit numquam et. Voluptas nemo nihil iure natus ut eius.',
                example: '3davutaa4apr881834f93jgkbz5tueztrzhl17zs67apmd4d9xxe45tjf8fx8prhbwtaydqlid08va31tvnvgxj387jpm6vkq9v6vztmtdmf53lui87tnvxk9ovjzns6vus5ihpa2i3xp9lyqeu801plefhu2rka',
                startTimeAt: '2020-11-04 00:32:26',
                direction: 'INBOUND',
                errorCategory: 'dhmowiwify88vcowk6gclsi3cfg60lwsxzu6quibb305bux4oly4zlewfxi85wpn5qrf1xid1tb7ngfh5z9fxpp5tb4cgop2kqe0oksx3myblx2o9y02wi5nl08tnhxbo6y0vd0go2qq4i0f2ezodl4l8xvlacdv',
                errorCode: 'u79gyuz9v2yevt895bbhstzjucsvv6guvjroehtjz6y5ndhwvr',
                errorLabel: 358008,
                node: 5318160004,
                protocol: '2n2rsk0u42xtffvltk14',
                qualityOfService: 'b4s6kqu6llygdnx2cckk',
                receiverParty: 'jxjscf0n7u9m4csobphdtee9n5o1e3kd5tmykfcyka2x2ff78flc5an55cxzp8zv6xakbhoj8pacob2mg5qen8n0jvo1sljxfn6pachyzfs44r3gjyemw2js4sdcb3etinfjhhex88muauucihkjisjnv4hbmx40',
                receiverComponent: 'ki9f16o5ooicmud1v4hveqrp8efkr0avcxw6t7ds2ac67gq5rm3qmbo7rnwsntafjlw2o6wld26ij92s5nuzz8hkasxb5zfl2ewvvgaoqjgkea34urpgpmjw32gxeos0gkxrofiovwkauefzz7pwvhna4qgt3nar',
                receiverInterface: 'ma9m00i97uvqkx5mkwv15ee2h6onr5cx76gaahfe5hx0hv08n0maldoq6hbeayyfist4r9g2sxcj2s96wwwvw537rx7ghukuqjh7ggauesoklrondrajr5cch2qxyrsglg4aapxaco1mi7uc5qr0uau7ap0399s7',
                receiverInterfaceNamespace: 'op9lbyu0rhhgfsdu49etofqk91juv8pgsym7lv3onbkj3lklz9r2hzfnc4c6qtixwxzjbazzzvwjq0vmg2f56njd5o7b8j44giaexov2onds27vk7eb46tkfv9r4besce5ndbcsfdrjfzn911q2bnl5agg8ji5ab',
                retries: 4668850330,
                size: 7662522095,
                timesFailed: 2608612981,
                numberMax: 3666019048,
                numberDays: 5120646676,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'zkh9ummfw9fflh51084c6ppg8en4bzd5z8k1knm3efokshuaog',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'e5s2u8bcb6tga7umr38g',
                scenario: 'nvj92lhhkyng2xzed3adzb46bvlptroc6agwsk0evkd5t5hwm395ia4rpuqy',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 21:42:25',
                executionMonitoringStartAt: '2020-11-03 20:31:43',
                executionMonitoringEndAt: '2020-11-04 01:24:35',
                flowHash: 'optoscigow3mkcfcdlxy56dk9arc5a6k4elkobze',
                flowParty: 'feoo89jlt73yk38rnu6afp5o8ezxj91i42019s48yyxfbs18rlmrilff4y3lw6p10ogns1t4q2oybsnau2nr8es1a0qf07p3qlc4whoqultrvyrcjutz95nanqp8ggg2uluna5h748gik73o62ob4djw9m8i42op',
                flowReceiverParty: '8s3zajucc8itrynrfiai013e1idai3mb61ttv0jtm42xy9ju53hmq4cjj73dckc5exrim1jkpinjutwie9lt9ylpwnswuanyl5n8nbmobzgatxt2639m2ksmq519ds2ebzd028q1t9t95v64kesruov4eq0pqpzu',
                flowComponent: 'd6d9mqz6b042tr2fygbz1lbmosbi8bocio3e0ffk5oeletspazrnouicnkthx8va3bzomverw2c0783nioxlhyr8rfdd6t4bxxwt3gm9db88h6tn59jwow856xhvud103sw9b21jrmx6j00sw3pia5ba8yp3biob',
                flowReceiverComponent: 'p431p531inszc7o7m3levwwb3tzthdmsivnse1zn4g4ctrei1v3s6musqhk5uc96y1qlofgb3sx9p9fuhuwmsdwxcoqkq51elcj3pso7qn8rp7sg9fwirstg2dssa54oasb5nyz5tumd6bq5lz62o8god1c5av2b',
                flowInterfaceName: '3lfzdrjxr1b09bbpfpu9gavltrhdnpfjcvinss6q4k3b9ogelu1xsn94gg18269q775qycn96fi4p3e2gxa414o3nsjw6xuf5k6onf8htidxqmpiv7o96qgj2lxuxws6qptj9lbr3tnnxxqtozl7pzy87h3h73qm',
                flowInterfaceNamespace: '87xux01yh5ey34se3p8at1057wxh931969kn6htetw2teji624w4yvksh0mm7y72xsdz5kab6olv5sdwtmsahuoctod7t65t8yp49mnwmci3uompaoducegxlz0250g7ycl0fo4zddwx2bmwirwf3fdeq2qxppyn',
                status: null,
                refMessageId: '1e2swnf4nv3qwc9qwwm7495s9j4bl8ne1r0dcm0zm7wv0a73aydyid8nrb14g80r315yf04lj5bm8scbkjjd655yj8kzdzxu0jnael9ha9cq7zje4ucz3g2sob8d12as6knvhed3ppkelssqb4eklbe5rslqmk9f',
                detail: 'In magnam exercitationem. Explicabo sit eum tempore quis eos molestias autem. Ut et cumque voluptatem.',
                example: 'kdn4unlb06ffm3r0375hccq09xnzcmhq3ula5teaqhqrs0v775yyvhau69tp6xq1v2x44v5b8tqwy6yt2c56yqzsg0ht7g6i3xr3j3da1oonyive5thi713stfv1xv4oyftvzy5dgrmy5z4mrnqn2mtngdg4p63q',
                startTimeAt: '2020-11-03 16:53:01',
                direction: 'OUTBOUND',
                errorCategory: '47nl4vdpx762lfxbhw2cku5rf825tk06yvxbymdvsr47el6jkh7me3nl3dm3xjoeon9erdyv70eozexwdc8sdyd7nyxq8qv8l5clv5w3pqrpi7t3tupl51oy0uq8lblchd7zpulg9vtd3f3rq78604ljbpbqeou6',
                errorCode: '6wzsogjra16w1ayku0b9ujctkyexn27icjw27l83ik63ighycm',
                errorLabel: 210735,
                node: 7558675638,
                protocol: 'eh5s1k1j7tkkv0hangb8',
                qualityOfService: 'asmbcc3rse82dhg9mgfc',
                receiverParty: 'x4tnatqr6jt0fixjui1s7y59h2n7ueda30idknihiqenbxoflwo0eap8h7hlg1plxq1kwu6iweodpqz17k3jeaj06q81sepwt3t7plzs35psotlvlegbihqg9js11p40qgxs684o6xuh4pu3uvn4e1re0l0cml8t',
                receiverComponent: 'p8uzygx0eu5cwmgav68j75583bp2tdd96zwomqbvzq2su6axfrozwkjl6ibf6izw4lq2jkcb2t5hu9b6d08ojj7aiipkp7a4rsukbefvufj8vh20it95ugwfrrartmdrgczrami2r6dy62ii6qryp4pvrhxhdow3',
                receiverInterface: 'dvs3qeulf4735x06ncv8htallm38jvwzv1lorpprzhiri1q9u6k9aaheh8rmhbm6adj93t67vtdp077lh1y226wa6bff3kstpnyu4tegpbjse9sf8kkdhmnbltt9t62wq8mqve6sz0raajh28yaufe3f189708av',
                receiverInterfaceNamespace: 'j105jmoa1s9hrkykxgeann2aqmxxrvzf557w7bft2xjflgspjl8pvlw8a9k9s88a2ok8g2h68laj0r8vh0dnet8eb3oyzcwvwrb7nxdo8gnw7mzfijcihmh5d4ghcp51fcsn5p2vkgtu2wnrzwreotbga6z4hfkq',
                retries: 6348210047,
                size: 1548629950,
                timesFailed: 4788767203,
                numberMax: 4870312853,
                numberDays: 6433758092,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'zs5vj115lik343roqjcbxpnzrmujw538pxlmbvmf5i4stg9rng',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'cm2ruoqdpai8hpd4sem2',
                scenario: 'euhntocyd49fo0tiyxnv9bjmnc2bafpjlns5g8ihyuh6pm0bijn553mgq1v9',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 13:05:58',
                executionMonitoringStartAt: '2020-11-04 03:02:39',
                executionMonitoringEndAt: '2020-11-04 12:57:24',
                flowHash: 'i8zbd9l3z2uwg9qefqshltl1xfbwnjz4nvk06g5v',
                flowParty: '6t8dx0wv2933pq8gv43i15z1td1jmv7u8xkqkfy9aaz51os8dvryi12x1jflzaubndlkj9j7hpu4ekhr3clrvla60dz6khw8jh4teibbw30m7vhk3avwc6caj6lax5lbnxmzoxzg1ju90f2crjs5m5x24bs42oo8',
                flowReceiverParty: '92pqeto9ms90hfqtwk52vjt7ycxemejlhaa8oxmcftymunbk0ghfv55i8tribqzrwzuw30ofn67gw263uwbyowo3h3f4giptpnwo7h0ov6sm5tadl9vwh7bn9z0m9c5m4rq9yt3n4yjm5l9im6cntxb3idjghodz',
                flowComponent: 'rfhb5ttzfo4840z5dfvagylo06q1gp56j9dy7m2zerkzgy1msqdyo6jwj1603jlztw1iyajlhnwknu4awmdazww95rw5iiv22ubd077gosjru9bu1hzv9u8rrrl2ckmf5nzu4tgf8ofu00bl5yhyds95g3ht9lxw',
                flowReceiverComponent: 'w69rvp05cd1mntkc4mf0gsyvlx56nfpb4jdfepvs8t720uj1e8zrfaqt7vf8ezl0ykg196txlbb4dt1baifmpms12k7mwvo749tc3kxzma0tyb16b8azlqfyqox30k7f2tzwi9cq2phzzejsi9daine5pjsxthl1',
                flowInterfaceName: 'ohyqjr8rokq7u2rpfkpscydfbx2j4ja0ae7kxdty4duosw2rvqal6jkc1bs39k3kwxk0izzcbyfqdr5q0z1gfive9yccvgzn587g2nuqbrculnqn7c6u29ccpbsqq9x3zg0kqzezjj6xfx3pm4ov4mol42etgwnw',
                flowInterfaceNamespace: 'na3gscvrfktn26a54024isd7fwo9gctgyf8bpleih2x348vf3u96m9f6wgzggxn09z6s6ytz0anrdijsf76rrw7a3qaflk3la69aidaht3t0cy62vfzi8o6ssvr5qu7a1991mqgwemfmgjdftctmucwtyh7bs2lf',
                
                refMessageId: 'xed86qodc2c7wcbwkbswuc8agr9k4tyjxjli6eazm33nnc6ydumixopg92wpkyr2yrfrce25igqd5js71xj28evudvrwr1jngldv94ydg7raettcyu5qbmathklvma2td8eg76fqn2hyghf0l32b6zgku150zutk',
                detail: 'Eum assumenda est. Nesciunt qui vel et beatae molestiae eveniet corporis veritatis. Et quia ut aut modi voluptatem. Adipisci autem fuga molestias mollitia asperiores error. Aut ducimus officia aliquid. Impedit vel recusandae et mollitia voluptatibus eligendi illum.',
                example: 'shml9htw7a2j1fmnmxvcna3msjrea6rqdmsqytwgjezzt9k6otrkeyy8olkd3nnxnecold7i97f4rq0d7yppynp2znx6f763kqjflf81gp6mv90el53ynmk7eekd40vij4yhk7qk4rjfrfw6y8gkaeqzugjbuzhh',
                startTimeAt: '2020-11-04 10:41:16',
                direction: 'OUTBOUND',
                errorCategory: 'jsia0eze3n4imbda6pi7ek3qswtgdc3zvy8826u3fbr79hrban9bgfliabkycefojdwl3gvx8e74tq1qpid5apibeg3adq1jgvqsrq9bvzcdayh4lptk30d3c0byrwp9asiod686wd7sq52613ebphtujggiz94k',
                errorCode: 'tsy73kipm2sgkswczp4m6migj0kv8y7fa3ol27o4g1yz96trqw',
                errorLabel: 928476,
                node: 9329777217,
                protocol: 't3ddpe4zilwxexhdksrb',
                qualityOfService: '5rvl1calqs365d1wrdic',
                receiverParty: 'felpvcvd0w95yvo9iz7jz9xeek7hrz2sajodqdmgos9xsbydzaclwvm4ur8oqf87qt570e4bfcqucbwejliwhj3u042532xr4rsgr7mmrc051mq86tzyletgxbgedt3wxythf88odm2kgei6ywtxzeguoqhso0kv',
                receiverComponent: 'ubieedbuoedye3e6drgy3x68v7ssbr9q43731pf491fzhcp7s3z6wnki6z5o76ja8vf025cnt4jggvbuds7q1ros4a2xfoirkdpyuunn7gc88qmqtx6er2hiczap02vhx5zgvi0cmek1uiu0162ufbnp7rfj7si2',
                receiverInterface: '3fffhchftl7mwtv8mnv8xh2m7m0hm2ap7hpm6iudzhq6q54ee7dvx8cgz9qgkiv25jfw8wlvdaafvwq7q407ylky84u3j30sq4v3jthdhbac1p0ovuaxk5hazgb0674x97xq58q6s1zmmxwo5ud27v92y4p0pnyu',
                receiverInterfaceNamespace: '7sbyt5e1nl4sej1xuhazc9od2jcoc035btpugweg2fr4mcfsb48iff5h1tya6i767doyoahohwu1cz7ap1fdqw1ni09k20on1x1a8r96ww3f75sadrxhucgoq5cdoh1y8oq5esad2hrounkqet9v80rxan381bgh',
                retries: 7027244097,
                size: 1324836226,
                timesFailed: 5844029966,
                numberMax: 7421031583,
                numberDays: 7399551729,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '08uatu4gc05oa5sphwh486x9h1lhvl2c3jc0zn0irc1xklc18c',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '0fs6ctpypsqh6mqvqhgw',
                scenario: 'ahl43ebzzge1c1sgkumkt68r35e65eucef7gbsx4kf8jiexcs49cratljo3a',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 19:16:07',
                executionMonitoringStartAt: '2020-11-04 14:42:31',
                executionMonitoringEndAt: '2020-11-03 16:03:23',
                flowHash: '9uci7e121h86t8c17aki9aafws1eiklhmvvrte0s',
                flowParty: 'yxd22ou2f7ugovrra8vt6j3b6ly6lh9c9u2x6zg3z3b0iks4ghtxl45wbdz7ixysvgpmyt2e5vnppgyw945h2cgmnr8dpdjllrm63c5w3plkg97u64mw8bp56rch0c887y4as7e5dlymq5a7vvvq8az4yu8fvwni',
                flowReceiverParty: 'j86ioukazqey2m929zmisktrypm5nhh2c8kh9bbf4n6bkegfx4ws785h7hx05sh5j7xnaryh99lfhzzmypk83nk14sni3caxqezsm4zbk6zc30btmeupl2hpggvv7s270n4gr4mt3qsxq18p0b1xic57wr1x32n7',
                flowComponent: '59pkd2cwo78koya9pfhe4mkghfd1np32fdayq3y58v6zlui2rx2qpw00tgvn5r4mvr4or84qn6r7uhtllbuqz14yjc3ftkp5br09fxsb6l597qdyoui0ogydt4w7eeyywp6v38amyuhz8e9g1yn2erxmcn6ug7a2',
                flowReceiverComponent: '7o199xamm5g0dawc2tll8eya48apz39pdunc6karwrbqd1cnk3q9dmcz1o8jsef2ytlsysyzr3ffwo58p16xoodeg7hq7m8ixuxv7lr6l9blbiq4uwq8v85ygvj876f8lvxm5krhn2hho8dvwc75evcsafhg2udp',
                flowInterfaceName: 'dkqcqrgfyar33cpu55v4d0c0rzygh5e9frhd0plb8mf4cz4s7pokch4x5v3p0iqj2uofx3fczy1iiq5065xdxju4eu9mf7jp6vf01l30bk5v6unue83494kfvm0dmyb1peap309vg6s8iwemo8f13n2sxx4ll6h6',
                flowInterfaceNamespace: 'cn8i0m7km4azekbas6p10z1rc212memi56tqvacxty9dzu6zmm7ddbzc5v3djvjzowmoq6ye9x86ryl9qxwar9nfjlgo5wqarsagf6lj6yx393nn14o06mnjwtsb8f5v2hfhniv38cv917g7x6ub5rqz49tkae62',
                status: 'SUCCESS',
                refMessageId: 'ntr6styj2z153rdgqfduyfaqhauz7oaw1gxb91e1v8les9j0ti4425j4zzav4v1abt7j3onwyhs03dwzxsra9d9w1wko7ozd7j4jgcczevqidy1gbhqz4shkr9obaf2crhl4wej022tsien7solx9vthe43jcqjp',
                detail: 'Illum libero maxime consequatur quidem. Explicabo incidunt aspernatur omnis nulla laboriosam. Eum reiciendis quasi qui. Et ut laudantium eligendi.',
                example: 'p06hqelin4evo5yuwr0f1ccivyr30fe553igkc3wqj0ear15b2mjdum43viyrgbq4nglm642u0pqkqfbx7cmqmodgjvonxwti7kwaagsvyv7eattgiamy1h872up9te1l5jzhw0jarnliqe0bna0041ecwbfsy6v',
                startTimeAt: '2020-11-03 20:30:55',
                direction: null,
                errorCategory: 'khlbbl95rl8bfr9ghnequ7qr3suitzo2erw5d25c3hobrohp8cy6iaxy96wxrikbk1wmlyhcm49qwo0rjuvlnawj2112tru9du7n3l6z15u26tp3hrn2614usjgol7mrf6q4cya1ze6rckk5r41kjb3el7dnib3m',
                errorCode: '5xqifpnljersswz9nhbdkwi7sl5mnhe81p2d8skdt4laqama51',
                errorLabel: 239757,
                node: 2422747577,
                protocol: '4u2lr34cvtum3zk9k7wl',
                qualityOfService: '2jzywwei25hymv9i3kyf',
                receiverParty: 'dyimoz9wu88k1adyvk3lu48pmz1fclfvko2cccdoajtg089g3ty4twcmco0wjp5r63ao3moq05z842ub5wsbibrew1botez205cy1pjf53xmqzdmsn190dbr6iaikwhcbnkb3hjucym1nkrr8uzjmt86u35mnd4j',
                receiverComponent: 'iuxnh2izwm3zpccmdli568tywmjsfgq5nhzo3cg2hm73kvzgbfzmgken7piqehag95ledgmr79afrv4jjst5nsl5dxq4tk5p8q99gkmo16u94cy9jbs8c2yw8neyk3cmeolo6c9xr2hs2hz5hhk8881oq5uff49p',
                receiverInterface: '6g02h3e8h8ioj9ae0dtpbnrstz67odtn4j4l01djkkmfsev0lx7soea3ogt2f6qknc743bhraac040wjxxjk9ll4njknen33g8qnsmdgqjbi87tb0y6mq9glh9qekjifsiblw8dq4xhz09c05lubgsxkdoy799qf',
                receiverInterfaceNamespace: 'soj9e9b1xybabq4dp5wfc0kradbtqxjdm3oyndudarmpiznhiduztelv8uzez79otqo6cc9c6no4kd2x2ozfcwcrxkhnp6yl9637xjqz9t0vgg8ytife9r9r8k65iy6ofgz3jnzipruxuh07xqxshbr90lf4kn6i',
                retries: 8567621901,
                size: 7537325798,
                timesFailed: 9061220994,
                numberMax: 4243525628,
                numberDays: 8020680481,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '7kuxxb2umml5kkm9u6b2ud67zpm1q917t0cmh0t9j1o3gu8iyy',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'g4y4w4xz8jfgcggntk11',
                scenario: '85bgc046t3j4ermox99ipdhgpuucfq6i8r873fs6qj19swirkilxzf0t8wpp',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 16:13:54',
                executionMonitoringStartAt: '2020-11-04 07:18:09',
                executionMonitoringEndAt: '2020-11-03 18:28:37',
                flowHash: 'exvs3aaoohaxfwrokpvfgu1zhpupv7kl7pbt9ive',
                flowParty: 'pf8tjac5fgm6sk8r9gchp3mx6sa7j0dzgf5otrfwcqkj4gb0d00l5ip3f6ws91tkqplatssy5jv1v5zvp4tuf9i4e9xdkumjaw26sx24gcz99t6v84vghzy8bg5qru1ocv4iwawwgizi04pl95321fdqi9lxjjzm',
                flowReceiverParty: '6cm4dx4h0wtssn5t94z0c9lqv4o6zlvcfrkzgqoaai15mwuhnhoij43votft6plkeg69mz9pnks2dmv423fwwqd3hah8pwqhnvqafqeed7873fhhdg5tzptri3ddwdku1mpnw1sewz5uer3141om9lau41sovi86',
                flowComponent: 'caf9vvpx5kxv5nisg4fcrzm9nperqkw4wfhynyrmhw0fme2wn33dzqw52nwg4f1nbkqmk4ribcs9m60o9lcx0xw6pjk7ijb2bv4d1wqxtu2d1qqhstf7zpq7udk37kjgl6i8e7s9jiztei11vl4spxxkd9nzi2mm',
                flowReceiverComponent: 'wnjam8s8icg0b2h2t3nt0lkwhnmzbo8bk1qlun7s2wm1n72m45d3pno1v89falrp6fmu6w2g4v4m21mluka0cziv2opldl4uqefg0q2viu6a0ncax60otd1faozqmvzuk24yqmwscgxkq5m30j2bp8iu413fj70h',
                flowInterfaceName: '6hhde5l4ojrp4g54ahsi7k7l9p2d4cvqs6uzy1tbak3qqccmxpvcgvxovega5hfhrh6dvzana5s15ne7amkzmb14ldgw3wrmih08ffqx2tpmf4bk51pxa8nkiop7oyitma6fvkr52x577czapyd1cwyohvz8diyb',
                flowInterfaceNamespace: 'o9mnriflwjhy8cl5ys13fjwtgu31apg3yn12llitrawhjldxu9sxsu0mq2ugag7c98dxmebx20eadizn0dm9b84vhkwey1nvajuy47w8w5i4gn93fp067tacikbpp4mmfjxpz9z6o3dz0km0oxixnp8a0zgtgrb5',
                status: 'WAITING',
                refMessageId: 'fy7jbo8akc8j7zmtjpxnlw0sm2d7xrjal9pjwlh8ikn8ymye67j4ikwpau6xp1pzr6gnod0rn0ccmpwzb5m20bguubf9xw700exxp64atw0pkwdysw5dn69daf2vor2jchyhun0wfa0hq2f8c5stfoak481f6e0o',
                detail: 'Beatae placeat unde maxime deleniti voluptas quia consequuntur. Quasi mollitia rem minima adipisci ducimus et eaque. At nulla possimus omnis minus. Quas et repellendus assumenda assumenda deleniti nobis et earum cum.',
                example: '3py9h8lf67uwi924hwqdvswo2qn2yhcnkplxmke70ysmc3pemgfi5w400rbvjh16aubmolb3de1zrvc5p3h3x0evu2ud5ykbibdzp3731uiut2r2a76f4zkkreqqsnzrgsa05i83uiig3wgeuzzoolr4ec2idyf7',
                startTimeAt: '2020-11-04 02:47:05',
                
                errorCategory: 'y0jmoryfqoy71ymrcxwmkqmcquv480skjoacoionxp62ft3d53ppociexvgx1gc9zz5mfqe4f0dqesibazyrjbfv7c6mm3s4pnsi2etcye847ml3t1evj6uyp6u8scx5ircwd4tb8iq4dyh8w4uti3lih57yyfxe',
                errorCode: 'swwc7teyyr1eyuofhyxmn1xg7qjxxggpapkiaapp1t885n6hdc',
                errorLabel: 154447,
                node: 8942107654,
                protocol: '4kqw7wmuqgbrgnrgz1c5',
                qualityOfService: 'ttsmf7va056slawza2vn',
                receiverParty: '98qz9d7eb1wnhvgargidvkq07zclmg1bv9daul270l506b8z4yr3rujl6t76yc2exvbkmgnr3g20v51xgc6zscpb8smswtrkbusq9aztxgruqiduivmr11b7h3i03gkh9226lgu912a3vhonata0c1shmt0aoqq3',
                receiverComponent: 'rolnfnutp2jkrf7oz3jrdtr1sf6h3rktkzi37nll5v22ki5hv9ftz8h71yy4xrjibku7bz3npw7emn2lu061fvdj8mvimjcexx2ug85qlmffjrivg18w2jllmdmk7p6v6ku8vsls473zcbghi4ex589o2mmi420s',
                receiverInterface: 'xhu922r5qse344u90cqu70qnberv532oofp7bkdoj221tey8g1eaze76gac052ifghb534chawdyf5x4zloc2889fw6o2jv53k6njiv7uvv14a5yzf283bg1i0z3uvbkxwvo3j2ymvgfdgj2oiptqrl69z4vvm5l',
                receiverInterfaceNamespace: 'gdddmmh7y5d929u6phko8e5ax17m3j19jedaay8mm7bksdix8dpr2s7jjv8ytrawnup0xqlhsubiee70llmganpgp9ynw9y9hec703xs2sxhkvmdd5l12xmvgxp1ecgu2fwe28c1de98ftem12t5hverx5r6w013',
                retries: 5401129030,
                size: 8046409127,
                timesFailed: 6755993819,
                numberMax: 4519023961,
                numberDays: 5144557627,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'eqdxyi4g4vy1gnudte9a8x2thvm0nf2ea6cp4',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'bljg7k5yu4fb3mdd0gzm1qnwt0p295uo6p7gzdjw1c18c39e2m',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'mu96ku72mi3z6c2i0zgv',
                scenario: 'vp9231ppm2vk916dhqh67rv9chhmifjnr96juwbjdb8c1ftzsl89bnndlugg',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:52:36',
                executionMonitoringStartAt: '2020-11-04 07:09:38',
                executionMonitoringEndAt: '2020-11-03 23:45:47',
                flowHash: 'lba3r64vu5boy35zezglgn3aeysb20usfq6yvjcu',
                flowParty: '3zo1pvs9odkjdmzig7tinjbgtflgdx6b8kyxakaai0ejsddhioaztfcws3hdebw99oi1l4ma2li1rxirfxopo5yddkfc8qemh83y6eujm2dyg3qq8vavbsaczrtcgo8vikinb6yzqn3f27v2j4152jxq5xc47038',
                flowReceiverParty: '02t08my01h26sz3aig48oex4fvrg54btpfxmp3166sfbc8o1aq6qkttkaktnqc5fmmqt3vcp5uateafr0pny5yqid07x3s8zml23zrehclxze7z28ts7w78yk9a3bshulkuk5o0slrmjfbf5t99lcb72pja6ymru',
                flowComponent: 'fa9xdyh1mx0c81t6h08tlgipr8f7endvqwp05c7tpb2w5wvs89oztoq8ows2d6fn2yjkp329d2q26hhleyk97jesqrixes6j10qxdexh0i0rv6tl5g50qqfumhfyd8of0vflvgl12vztvttdhqq9p2nc3111asg9',
                flowReceiverComponent: 'xvchi6160c5crbl5c3bn7eg6fjwf9d8z4e9159mtpkajxijuhtjsywjr6tn73azsusnls0kaub1de20uiyq1x9t9tvgalpjndoxa0p4sdpno2ciuovx5ceekvhhdilaqxd8rg48daiw1hrkfd9tq8vtvnvqilduw',
                flowInterfaceName: 'q5fmm74ghsja2htl4zjsze755w71gi9f8cr2tb2n7xmpbcmczrb6rhc0ty14j18c2f46z0w7vc2t39jc6kw149baft0ulra221zhhejaubucmt78df1im4nyhhodq98g0zsc9t4bbnz1alpka2ncb39kkl62ff9w',
                flowInterfaceNamespace: 'feqyxtenushztb6unoavz5u659bwxiowond6msuma401ff0h9jmyschcsiz0tyk5dk2two4xckwm5iueiju6x4frw4t74z7b6pzd88ckq1ktuf0rny41ysqkemrae2jn270s36chx407rqy6vq02g6e2p3gu8crc',
                status: 'SUCCESS',
                refMessageId: 'e2vu2gkccqjbcotmnvhou67nthrxga3qkilvc4wixn7ckyykot4oin4x70m8ash9fd19mr5cew7q024qjom3r99ieglpfqtu0j0m6e9jb5m8147nbsfuo7juxlx8w8zj96g1g7qeqwyadpxzkzyys1xb5xz0eop5',
                detail: 'Illum voluptatem accusamus ea. Fugiat nostrum ipsam est perspiciatis repellat natus rerum libero. Voluptates cupiditate ut. Quia voluptas ipsam placeat quibusdam aliquid ex labore ut nobis. Numquam debitis magni quos blanditiis aliquam quis.',
                example: 'fgy8l2a6conjfr6gu3muevskaw72vm323mapxxvy0y3fyheu7sdcvqutuhhb8wr3io0uzslej71smaquspi6af7xv7rr3ajjjqxsnplgmx87u154rch7kja0ht061soggdfa4z73dnmq4e9e1gtf43h7ub7u837x',
                startTimeAt: '2020-11-04 10:28:54',
                direction: 'INBOUND',
                errorCategory: 'tr57w8s9pkyurcan2gbxb77jefha1d1vsnyfq7f08jznic1pv7d38nxmfhcwwyq02cn4w89vzla0wt1hg4u666y7l5x4f48xwcyu85hxs3r3vosm92yhlcmu9kgfxsx0tgaymshsgndq8g30vej0fy0ppry8xjux',
                errorCode: 'iuhuxnvw8ufcd4dnsu467ecg2wsonf0hujf3zd5y9fbympf9qb',
                errorLabel: 985367,
                node: 4051952954,
                protocol: 'rix1yn7f55e0sr3u85cl',
                qualityOfService: 'fxukpf8e5la1ekss9fvn',
                receiverParty: 'ew4dihgk7igjkz0a0hs6avu0w1ogga4xd54zb20x9cm9rd1agmafasbdvk1r9d9a5ew2hv5r0cuyvzldwno6r3c9iuahx4ps42whe48ar26ij9e5eiwvgu37h6rgmzztr83eogwpnd61ss3sxngrrcx3pghkmubx',
                receiverComponent: 'pnej99j7xomf2r60wvre49htuoaslql1bsuhvi2kgicvyamo2gvob6suhy04jqu9gemzervebbxe2wrjbfsivlf50u69yqie3gxormcmvwgl1i1hx15pa3k317w7lfaelz0qrftlrif8edf7kc2vyzvdmxtzzuwj',
                receiverInterface: 'yfpearvplbsxl2m0m08apaw8imsv41aiumcqge76g1getkkctcv1yrt5c65vkke5p4ndekyo9jezylg4t4alo0bg6opx5lsxash8qkdscdulcbxakeihv55jrgejcsu0qzcuyiwrndtjs9b41ul6w4fe4d1p4l6b',
                receiverInterfaceNamespace: '8hifkgprddn0xacofr6p4ozh1bwsmrjq0etqku283rirtcznayn9qb510fin4pt735ii4s2j55qemkx3fsq7nbh8jj67hgcbn4qgusb1pqz794e2kdesmmgrjzqtaakxz0yv6vo7k64v6ntfio33gvbd5hc5f66p',
                retries: 6118869558,
                size: 3100061284,
                timesFailed: 9946574930,
                numberMax: 1444842256,
                numberDays: 1341887216,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: '2o77ew0c0ecakkmo034rb95i8jxuquathnmhm',
                tenantCode: 'zpnq3pl0g6pkua57lsk4qn2ej11wkph7xobu84isthzlcvorql',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '3p2ol95yp3axs8ukxbc0',
                scenario: 'gk64kee8j4dknpvkr0d0aq0yf5pw7vvz1oxcn12g6euqnp2024l4m3zx8yek',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 19:10:43',
                executionMonitoringStartAt: '2020-11-03 18:15:40',
                executionMonitoringEndAt: '2020-11-04 08:58:24',
                flowHash: 'wn83377ffsipt7jl6gl5u16adcrvw7kl8ut1nn3h',
                flowParty: 'mzi0usa4zxkushrg98ibf52wc3sjb5mqlvefvvwzedtae15xy8st8nkz1f3h7w8npezn9t9ewgf5jm2dj680kgptvrhcyeddom98zjcdrv30ugm54eid4ux6kgg2dtosj7mx859mzhavarbrmgumwvmloux5ofic',
                flowReceiverParty: 'q3pgzaip52ml945a3za9epsr8k7rgwkyogatewsb7ykk0u6zytj2xbgabenpcu7ra6qb3mcy7ui8jif4tbuy5smtov5d3rw6eez2cfleoozjk3j9lz66s94ru3kxsqv5yghtj2fpvucf4fbtpf3gkb9a12vny5wo',
                flowComponent: '6oom9y6rm25ogspgek0poedgubnic8je1dvs1697uzr9rx9s9801iajgooy9xe0jvpszrk31ktxer065dwe1eubjmrkn2sclppbls49amxrfk0c0aoajrqqwiqm2py4qmteyoszod4py61xtkq2d8h1w5fscf4jp',
                flowReceiverComponent: 'izlv74aw7zz1rleqy4mzfiq5qqpr9gm0u9ne06717wl9y3jmb2ull6hb6fq53qvkeqoos2wwqhfmez8lubsjtl9yf1j2rd7jc5raoxly6anfle05l749pj8v06loc10ycntmxjd2slsk0x78rxp79m478y7xk9dr',
                flowInterfaceName: 'wdt0yjm7xei8dtsiu43xgwll8fx5fkc6fpnpxklm2hm8frp8jxv7hfo59q1joilsgq3dj9ee3yeigjdkp1jsedy115jz352y5ijhpyfcurwyl5stg2ry0kklctwxhpv3t9ku0c34qf10zsg0qx3f7xm2e9bre53z',
                flowInterfaceNamespace: 'vkcapal382dmo1a3pkfojihe4xfx8doiq8gp66bntjq016fo62l8drg3rrgz8en7l5e898ologr0rrqi9ar4o3p21b1dwi28cdhokvsii4yvds66oek4f5vpqycyd7lmvghc7lyb1jsgdjl50ihz3rt4qb2ny1w0',
                status: 'WAITING',
                refMessageId: '47m0bpmahqwt5q7pb01ulovgqxisfwogsiy08x50w5fu0zmp6sy84qlsxlyfvm9sw6odi66lgftla068f1ix52mm4haz0stplnwyi56kiaydwyylp8jayih1pm66w4renc2i8f04b7uzrgwvktid4h7oimze987z',
                detail: 'Eveniet id est perferendis voluptates nisi dolor quia. Vel ut velit et officiis qui at. Quod culpa reiciendis voluptatem ipsum ducimus dolor. Optio optio dolorum sequi et. Vero error eveniet possimus. Mollitia ut accusantium temporibus ullam.',
                example: 'a30v2ouqlcy93wvbijrvd24vrgsppbz5yjcmah3ubsyb421vkfdyzatib68baqaf43jr5xsjv3tfivcdois5p5zbsatwbvyomyaules0kq6dp6nvtumxtd7kfn8oghsgfiq76ud4ojnrkhubzs8x7qvd90e6l1za',
                startTimeAt: '2020-11-04 11:02:23',
                direction: 'OUTBOUND',
                errorCategory: 'zrlj06gld7w4tcm66l8ja7ctyk3njfnoljpy6p1nvxt1egc4quc68jozht3hgtla33ezl8wrmkf5fuxbs77oi9qfu7u64ubzf72lentlvmziyuoed8kk1if8cziiy9x49tyf1ih3ihvrwfepy8jiqc9gt3kt0qc5',
                errorCode: '2k5exq455q1m5y50hcm21yu1yfoe14i5vk467qjndmurgjofbi',
                errorLabel: 801629,
                node: 9712237736,
                protocol: '8wy9oqi4ojc855s9yw6g',
                qualityOfService: 'mzgah5ntp97kpcj0q8ul',
                receiverParty: 'j8eotgyi0sqbt6e5hof0xeeatjr7kv3ym7fqoyc3i31zgcnppnfsbtuippfyfwc52pa3lstptic16eacoyf7hbwph3z0kd6i1t479kjdln2diqkkxqbd8bnfia8oq8syobfe45vc89xod68cv34pl6cjp2fhec0s',
                receiverComponent: 'l3w8fm8eyvlhpmjb08l2lgg7jdpr2binp3krtsht4xdu5jiuiokpfpcncpnzdvdx1pgi9zg7m8goze09vdzj5vr25jeqqdwdx2qla47z5qp064z61pgvmy71pvjr5j86ye3jngxz0l85a4sq81mqrsv4g5pkvmzv',
                receiverInterface: 't6bg1erhedva8uj467rmd0tea366s92tga5nl7se10pvrwbz8ik4d0ngaw91gvnhj75k0dl5765syujigmpy0ei5xqxs7t1fo94weyngfsb4bcs74gukuyysoopzxmroo4wqny3pcsaau38atfifz2934h54vcmo',
                receiverInterfaceNamespace: 'mb6i7k6t7rgwlmnrtl6nj9i8cxtcf7cueu7984t0jviznzh9jccf9erouku4iujtqenlj3sevod2w3x1zdlmbnq3wb1m39h8k0l7w1k8xgkku3600es9izw4iy5rvaeh6f4j3vs03myivhs1vuhyra0wk35x7f4m',
                retries: 3423523318,
                size: 9705417563,
                timesFailed: 5689912426,
                numberMax: 8854600918,
                numberDays: 5219682478,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'tas5gr06ljufct6zlfeuurkr6h4qhnppxny1g5zm8ymk1dk2y0',
                systemId: '6ta2h07za7as7q6n6dx7gcejt88jbq77x5gcm',
                systemName: '3opwt3akb6txfdegrzy6',
                scenario: 'h31dizdbrxzow2nu8hp5diex4cw33mam2oe9usm8ooba3y66aqgu39wpnhxa',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:09:03',
                executionMonitoringStartAt: '2020-11-04 08:31:57',
                executionMonitoringEndAt: '2020-11-04 13:38:25',
                flowHash: 'm0m73wreld9bpvimneqb17ewsqqzblz1zaipj6mn',
                flowParty: '88gm9f71oxtmftxiqu91bx1upxm7ilpvz0utf2rn2ok7znd68nk9ly2hskuo4x5nxogr9t0cyttixqubhthpgfxjmh8cgaj53edl4022y5qebtzhcewnobuacxcekfx6r66ulz4xx8z21wd5ocakbwzplegccgix',
                flowReceiverParty: '8ntqzzocatfn9mtgeqnkllyckbbeyoac5pb6akt7y2gt23bdu6vligekxpbdbj1evgfdvy5hjluj8je9wb9o8eksx5qp83h32hr0qas4wtady99qnl11ezkndtvlshnqvy3mebr092wxhim9v13hv4d3i89v6afn',
                flowComponent: '11xprezu44z0iigm25e7h0r50xfcndvp3serh29zg9r9df16xpe21f05fzaawt7wbhtdy961f4bsd585sw2oevslg2taxlm7z605zb9fbu5j6eb4ud8bm8e4yltajwl6oavt2gxg6v2ltc5kg8ou39h5zwjveapq',
                flowReceiverComponent: 'o267l5nxbbay4v996grmpovluklgor1704cfz61welckyyzvel4nmmx9x94ctf4hguyhqwqm16fyh85f8hsih5wsvui2ik2zqo99gtiok9rmoh57vtv2ggf3a0vepbn61w1zi1x26m1ovmkqkxacfytu9uetz22r',
                flowInterfaceName: 'oqhn6eo7kn7msq999h1zp0v68ufj0cc7om0f6yaynnmshuymduliyzw0mbf3xakd9m21pvjr8r4xilmomwazcbw7r4fw9due2cp029qii02kdoxa2uq9erdee56d61wjj5kbxb1u68f0rv9klk6hzdn3gmnvzsdb',
                flowInterfaceNamespace: 'pvpn2vqia4knc0uqi150p90w2q94eugwuim1yiwnpuj6v8qnjnh74kni9daf5zw1327xeead41l9z0m5h12loqt4wwg334wfyacxciwk4mxsn9ei6twv1szfwz13iw0o01d7l0b45io2ue3xmyz5g1gtukpdzy3y',
                status: 'WAITING',
                refMessageId: '0y6bbxwtofmcj8ym5fznxu3eotfr51yhr939jou2tex9kby9drzmp3c4zb3bu3o8f198zpttpumepl5uytszmlp45c8dpnex9yreji6kb0ojb2csi8ouup857hw9cwn91xw7oyf9eos54beftb4fk8hubaq5vrwq',
                detail: 'Nihil dolor animi quo autem consequatur. Et nihil officiis soluta nulla et. Nam magni quae debitis et amet nam consequatur est libero. Ducimus omnis corrupti.',
                example: 'cvh4s614sqq0nm672ckk1auvyna6hszx18eat38i6jd415j93r0v4zddwy85cw33qdw84sd4ba34tdjd0wmfiz9txlc9kdo68uvx7ya2rrhfgsni79mkutpwqr9lv1vro4lk48hnhkquycu44j5jlpnd3zt5fndm',
                startTimeAt: '2020-11-03 21:33:58',
                direction: 'INBOUND',
                errorCategory: 'x5gl5c7r6u9ba2vnbbe4ggjh772nard2mlkj9co5oo7a1qf0gjqe46jfdwy252ux98x1mi2p0itn2azrvjrijdcviqna94d1dhrpkkf7uvz9qrhpgmziwcwnd5okikpenx4fnl6el0sk5jcvmxlj7h5th61k784g',
                errorCode: 'h9u80z9c225zxe8ec9r8y19rnqs2sblf14xwyh2me8ij7uybk1',
                errorLabel: 703384,
                node: 5070048296,
                protocol: '18d8zd65cfo09p78x764',
                qualityOfService: 'bbie3enh23mobatg3cpu',
                receiverParty: 'v0e8k31r48ne36n6upc7j0ih7mh2bds2s0cwladlur32wj7k37kw6cmdyrw2g8xzooe5exrrzdgnfnl54cnbi8vo19t285rzl57w8lbd6bxk9qt1rahw0ou7ucrik2tbt1sf6nnlmn7a9f2z990trsz0hw9k8qlu',
                receiverComponent: 'lm18ckcb4n744gjmn59v5sakvpy333jw58ihuwxftlju80q6mgpz0mlztsgg9j0sxdfptk9wmn86v4x8fxjnwf0pnmyzrxpj96xesbkcprah5luq39u4c8wp9uketa02fi32p2ov4mlybh13wnxg8fumgd0xsumb',
                receiverInterface: 'gw73ug9ahauqhyor4zk5vqcfrau8lev9d1ktogbbmctim02i0zecygi2lny5uewuo42pi2b9tutscpdjvek9r82xeve9rz0pm0ye09chq3hbsqrlwd0fdix78ujnlsixgok37tet6pfayjc23xsf0gc09c62fhuo',
                receiverInterfaceNamespace: '680v754kotaot6hywbfjz67i32oy317r9bcfy8fe6pl370my3yceakv6a0ca9c7kzp2smil0gs4fidoliojf4kflpqlquw49tyeecbmo3bhik3gdihtivpfvuccp6fj74xn7fm1efzb9uls1g1ispxy1fmzjt64o',
                retries: 8433940814,
                size: 7465519645,
                timesFailed: 2095402878,
                numberMax: 1736875488,
                numberDays: 2373423168,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'cw3go894738fr9e96d8wpqlohca4gbr3ool33sbg37dz4yu46w',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'l7ovxcz6lolgaqflid1o',
                scenario: 'tpsihw4sapghqmaclbk2y6pwsvk5mdsb0nxfmjq5zsgg1eh6apszo9ptzes4',
                executionId: 'lja5wt0x9ayj31lxkgtnvyuk2nvyxe1usrt6p',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:21:05',
                executionMonitoringStartAt: '2020-11-04 04:35:17',
                executionMonitoringEndAt: '2020-11-04 06:47:19',
                flowHash: 'ri5184qwy939redss2m7496lww9uodf4vjjzh5qx',
                flowParty: 'o0k3ee7j5oiz9aymsdkty9o37ijl92hv029zoauitu2y0qmbh53mp7b2m0w3fzq9r7dj04aboejfdb2dbyjz5ta0ui4698vp1uis2ri0wwhuy4hrr6hvvnrjrq5zgy1qy3i4m8uj30ytu0ybmbddc2b32e9558xq',
                flowReceiverParty: 'lo65d5x3q8vcxremrtpwhm9q85xef5w7l95ql56cuzfqaeqfyvbzr7rqp2f4bnirl6em8g10d6pyxqfgylry6b1kdkc6ttj8l9528f1dcq8ssiehn69tu9lky14rub3ya8dmivjcdogbtij0spnsicameclp2p28',
                flowComponent: '119rx7lm5ql5y8657q6mryd9q5oh2bc476dgjatsnc7j339pwitt574p4btuuduibcjl4160aloidjtuly3b8vj4fcs7042rwjs84lhwsozuqdzfdebzvipm3k94ui5tl3acqrdt6tglvlsykndc1auvwri85uy0',
                flowReceiverComponent: 'e1fbr03k1421x1v6h4ookod216nfamvhukm5powwrtx68cjt4wqx12t3dwqhjr5jdzj3jr5gzc7pargulhfplbhubkz9xt0viwgg0dsquolc5s1ytbujijvne0i9i0yavx3qvma4hk8ik9lsl3cvbrd0f1usmrnh',
                flowInterfaceName: 'qdwl9a88xvzsrpovykjtlc9nbuvn2hopal20pzdgx2yjjffg19ikoxmbf601oo9rz9ffuvqk5ndh0sizipozx1ppae09htn6krry9qnslop1fhiapg31409x1irtvdkqwqvmq5lqq511mht9zs5vl6cx96x9n2pb',
                flowInterfaceNamespace: 'cm577owe9f0tymule8txa1ejoeny1iicticc1ckzkin06564hie7956kmd9i0stdu70iq1d4d8gsbdxj8o5nrt042i0z2y245bv7xz0r70ufgff7uo8gw2x4heaa1x95nhefecp5lhc1eg4gl13xoux9p9honf07',
                status: 'CANCELLED',
                refMessageId: 'dm351egtda158zuht2kihl1puap0rdjadcdm4tqc79xug93n31yt6ogay8j1d8c47tn72cwce409v9cbt2mx2qj1sz0ritmw8nsd8k1wi4jpmghv0o1j6zcfx5ypy0v7zofrayvt059ztmdfyiwe3q71gfm401ty',
                detail: 'Doloremque eos delectus eius totam sed natus nostrum magni nam. Harum aut molestias sunt autem fuga maxime molestiae. Sint eligendi est sit asperiores nulla id omnis dolor. Aspernatur ducimus voluptate doloribus dicta enim neque ut voluptatem commodi. Natus magni rem nihil.',
                example: '6vrfc53gh6scchqrcdlpaxtfane8vy205fwg9pw1ahz6maup6xd02rd3j1l115rlv8gm1fb2mxljnoulxl75zent95j7bsutf8aqr2yuw818as3jpx23g9gla875p9ejhv9t4b7k2cq6z8y1a7hz82pg6kiqfu1e',
                startTimeAt: '2020-11-04 00:27:40',
                direction: 'OUTBOUND',
                errorCategory: 'serep7c6v5gd9aol684kl45lzc1tposbym6re9qazpyg3u5zolix6wy68eh4sgc1czys8g4yw9pmhbel22bqc8yv39skme4yvhi1gjgmxjbwluoojs1t3q7o6a2yazzxxr3f8gyz7mo2u1mxr8tugt60wzzmclnl',
                errorCode: 'gctshary4t7a2hqpadlzh9d3dr8cujxwqx5im5icoo2xtq3mda',
                errorLabel: 543059,
                node: 1963984026,
                protocol: 'zzqpnwr3zunfl6qgmdpl',
                qualityOfService: 'px6f54lqp2pilupn4wab',
                receiverParty: 'wjk0152kksjaimo4lltd2km1ewg4aalumuu1p1mw94negya1i5kwn35ieyj5v8rboockgbxf54xvs6ctt2tj0ciymv5mtpitawav8o4zvc0jyyzpt377o2103406y7h5uchjp5hgoko0lqygm7gey2q35b553qsg',
                receiverComponent: 'vfhaq8ui0v62a5i40ds238srjrej56ii8d98fdcy9uskzlx482oc26jn5xrxzv1zcy27mpwd4bmcxgksv9aun8v205j1l2gx180t1ffhown0o5cyjk1bdf0y1jnot5t3pjdepo42hqrtstf6frg6br95e19ypz1b',
                receiverInterface: '1e0xibmnp7n5pbt6ei9fnz033j1igimzozhpuppj0i2ez8fw99de46sbumkk2hx2hgc8or4a29dp8b6d1kco4dy7bjhlof4385b4t7jsv7hfya803wab54em1edabhcu36s1pqjlvhe4bpaecrq9lq57qgnguskb',
                receiverInterfaceNamespace: 'dri6nsnwu74me0gscukk2byovlc2fvo6yvc5yljlig82ct77txmdmtqev6otnqt7npyentkowm7rm95v9hbx2ohk8gh45tc5yq10cpag5nw8lb1bdiom0fs2rppej3hn2ibjjcrbpwjirk5yaxzx4vo8jiz3zgin',
                retries: 4006577339,
                size: 9207874642,
                timesFailed: 5819570409,
                numberMax: 2069181612,
                numberDays: 2603892036,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'k9qk0xt8ealqmfm56cl2ws1t92t87hvqvmo2zndkvp4l3qy2lw',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'zk21fiu2raf030tyg3wa',
                scenario: 'jrs9dcdlnb6focwz3mt3z2wr56tb6m4ysphnn5779qkqeoh3vgxoycnpg5kb',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 23:45:36',
                executionMonitoringStartAt: '2020-11-04 04:10:19',
                executionMonitoringEndAt: '2020-11-04 04:13:54',
                flowHash: 'x7amxgn5d77mk7z1q793x6xox20f2m66rut9f5oow',
                flowParty: '2xbcbzw2p69m0db18kmsor4k77zwxazp5kzcxf61dw8v1838kvky0bomitcob7vy0mohvn9tblskrutagrcg1us8lmvn5w6n31drz0578cm9br63to649tdglg2vx337ujyh9hwbxihoqmwdgdk6ciwtgintxb56',
                flowReceiverParty: 'i8t1kfjwpkm8jovz50990ahycoki9v2uww21v3z88sgd9efe20ym2x5e4899jrq23z4nq82ykm851lw1dm4xcps4be3ot2aswiftna61i69p8xl4x0x1lrur197dt9t3i0nym1sckprnshkaq44livwmw9g2us18',
                flowComponent: 'ehbaqtozh38uzcrkmc57dm07cojpddvb6axmm2gyh8xgdzauhhjeqq3qcibl7yfrtked71y5ig844o33dwqs1u3vioobwvnycqso69js23x821gske3drutdxt5phipd1n609hgphjwe85xt9cbv7oa0q9qhiu66',
                flowReceiverComponent: 'w8ozwapsbtppq1jtmp13zvr6ybpm3bvgbewgib9cdu7bh76crhubzyii7gbe7us8ut52leb8uulfj7pvo9yipiecqj7pyo1cvbg6lpfb2kkvvflzyaclriufd0vxme4ti1ralrouifv7ybvivvjr4puursz1yi8a',
                flowInterfaceName: '07is0ekjf8b363m7gkxpqhxkeejc3svjhx6oee7p1wwxgxgsjh61rdwctt4yqxu3uyocmna568tv2hsglw83q8lnw23t881ikfex80h8u0b8ff11z8b7riaa3clg7h0za2g4e7ovz8fdkcu8htp9tilc47y999un',
                flowInterfaceNamespace: 'wfwk9bylnb8fxanxlu2sg59zbfj9nmasurny8mvs9s3uvx7gwtf6pqa8whnu5z9hzj0aqbosx2wsepl9z2tsflfg21ltkx9dtag1xvlhf5sifsr15d5454vixpf0jtwdtm0oxzjscr5wayxnc7h9ancgiqfua7af',
                status: 'ERROR',
                refMessageId: '2h19a19ralt8oqdh4q8j6un94n07driwi4pszbrbg7ffgqxwlxw5jt7b8vlrrw6mj7frg3fscntp8gmfdn9lmix9qdzeac2v8g5mtoa3gikx40jfzci3xyjbluz293558y55hun55iuo0mc6uwknle94hu0siizz',
                detail: 'Eius impedit aperiam. Quam voluptates eligendi et. Similique ea repellat sit ut itaque blanditiis ut voluptatem est. Ut impedit quia laboriosam hic. Aliquam blanditiis totam asperiores. Debitis rerum porro est magni.',
                example: 'x20uqfhyo827b8cko8pcoibt5hd5ixgkzau819mdy02rif6l0ngg3uatpt8ndg8c4r67vcsqwgg68rk93s0d6bcxuguaknidbjjcfz9i1c7x1c8b6fu3h4d0nb2rcljcuhcwpgmsnkghtozd7r2rr4pp3zjjliak',
                startTimeAt: '2020-11-03 23:39:25',
                direction: 'INBOUND',
                errorCategory: '1yzqxumt7c30p8amje58kvzp9xbxgpmwqm2unrgk6gbyyydwijg3nc32k7e1ogn639iw03l54pq8gsiisgr4lel5mtnohwmlnl1mqtjrko21oxl79vxeean7one6osk2p3mwohmvtx1ogl86id9rlan7ioasg9px',
                errorCode: 'a76suroswksdx7fatphbufkouu82w6s9fm8tetlh7iu6cr141o',
                errorLabel: 157611,
                node: 4956701047,
                protocol: 'z90lj65ti2s27hch7dcg',
                qualityOfService: '7nmkn3tu3qeop5cuflda',
                receiverParty: 'z8fj08kn9da7wji69m5o059po17ad3zg203bznmg8fotnst9djjjmd8gchr8hs9n95ijbqg7kiql39nclvkta3l5ked8rhe9n6ssx7mrv89p8ta5ac15kvmvbfvyf68a4tb7yijqo9wkpp8ywkyl7gsh3s6svnj8',
                receiverComponent: 'tv94o3nc5147yzoorx60dxp4goy968ixguehpqirefg3r666wpbsov940ou27lfbia53tt5jx564im2gkxyrdjdt9m2ky9wv78g9q3jvwler9065iqtwzw3r8g4cleh8990cqk6b6ansdb2k3ti4xkj40l3mc9q1',
                receiverInterface: '9jk43vve3dhsfhkuwf2p15nlpqj11lnwt0rly0hp4jei35x2g0lmblqsajgcn8xp5434abinxk4j1q4w5ba43he0koxy8lzukemkq7861ki56gts29tm10f2k9yub3coafcyf91p7tpo6vwy5bjlzcteyvn1byek',
                receiverInterfaceNamespace: 'pugyzgolbw978canb48sv53lqedll0atjxtv94kq2m0ey1fhcymq7507wyzhu3rnsqsjh01vqwf0lhmpwbr3u9juev9cf93x8oh0dowejh6rlh8vd768ajmae8uo88txxxuupndgb3gbzq35ewnnj0m3amw39kfk',
                retries: 7482555700,
                size: 9725398864,
                timesFailed: 2057626523,
                numberMax: 7678427246,
                numberDays: 8481902383,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'q8zfrq3nwjdqly9x98qc6pmr1fvug3qorykhv5crxeay2os5bl8',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'dzr6xs10qmyn3v3vbhfh',
                scenario: 'yp51qqur36zqp6n5h8uqtked1ps4n8i0zm9bq8zhvhzulgwj8bat36er02io',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:09:39',
                executionMonitoringStartAt: '2020-11-04 03:55:10',
                executionMonitoringEndAt: '2020-11-04 15:26:40',
                flowHash: '3zpjlbdbsatc7e5nah8yuiqhz37tkjnyztiiaqfa',
                flowParty: 'otvcco5yd36fy0r0kn63k5hzs17cc0bd6fgvh3fx8v272dxibcoxacbjzxdw7iji0cd6v40sn9sfktvkbz7865niq24m9eh5z6uqj3dmbv41fc8lmc8mvyln0ghea7pr51qsb25tgmk0ip9fgn24s2oue67sa297',
                flowReceiverParty: 'pxn7a7lud85wz3b4hiikuprf4waexdr0l2qk8pfabzds1bawnwfsmlotb3dbs8n94ufpl0qyyujj81u6kg3laqackn3usgg7o9jsbdoqcx6djhrkpvldpkot0fel4db17noej556y1i0jtyxuenom40ed9dnzqfb',
                flowComponent: 'kbry9e4zqa6kit9jcphfregnz50mlj0qodhwzun0c0pcfbtozabr79ny0xvbs1lh08orojp8jh0yrqqvu033bv3ttjo4lztptylg4xj2ejbfexma2mfa3yvsbud673avz0ubjntpv8lnlv1l4mjz2mh4eg8f0j0v',
                flowReceiverComponent: '27sjhgn1p79qtfb7fhhykmr94epd5sm5d6qp102uw6mzhao49wnye0cxbtug06zgylppm66bmkbrriv8utxxeac7aw83gafml9t5y2qoieupivh9yjh6kxnyw8epkfp77zauujw51iaaxjl9zo8xewrzq4avco97',
                flowInterfaceName: 'ccopm0cstlzabvz0qjj9uyabxtbav02jxnlbyea745s3h1eqmyel8zqbd21yyw7rih8po1ycekkeg028x7c4tsi5iuer0rs7ro50urt0w5hcz3y63kfcocwrverr8idgci9iap7lj6tqy5yh5wpvzjcb8ujumg2y',
                flowInterfaceNamespace: 'cdt5plf4w89bikjp9l3h590m3dzx85ev12s5qgj1wxoqzfnh2t9y4u7eroscdi617qloio595ebasfpwl69wjgzflipxyp3umk3w8mxq8ypvpisl9agy4p6bgycjvp8koyus5d09ohnnbzuclb1v8kh2botpctpq',
                status: 'ERROR',
                refMessageId: 'cm0ri44fy0xsasypi8darupvhyv2cdu148i0wzd7swetmzp7qbp6a5foynlbl8zww45wtvlkyy3mbirj4ej9igum2x3ujd05343szrmnt0ycizppc3o5e7dk4oh9cekejleany9p5m1q2iq1fjeq5797q1byk41l',
                detail: 'Dolorem molestiae quia. Saepe voluptatibus asperiores ut. Laudantium sint voluptatum quod id natus quas ex. Quia aliquam consequuntur itaque cum praesentium consequatur placeat tenetur. Aut odit sunt at culpa veritatis sed. Nesciunt omnis nihil.',
                example: '8wa5bhlh8wnx7if4kvrjd5ocm4xostp13wrdel0ord3k8dqzo46xzru93zniv78purjmmbb953qm3luzof7jykhkqjs6koahupncqcgfk1k5e3c8nurog2meun5vrfmqg5je0rso167valw794xwkzqtuhg571n4',
                startTimeAt: '2020-11-04 02:35:13',
                direction: 'OUTBOUND',
                errorCategory: 'fnwmq2m7e56n3u4twag6oqb03wkvqsl2baw229amaq2m6bgkdc393ui8ju45gndi657k7n9ujhqaa8ck0igdzyj56j8zr9qmfm9s7jb5uqobxxgvea0m0csbgnmk8a6sicma1hyne00tbca8t7h2ba76x6mfe4ou',
                errorCode: '0oeo1f3hyzrx0e41q08b1ekklseyyatcincjv30x9ft11qcypo',
                errorLabel: 665597,
                node: 7791076833,
                protocol: '1t8mx4z6m3ekj389n85e',
                qualityOfService: 'wvbeqicg6wuhn4rq50k9',
                receiverParty: 'kpn5ujuggj6u8xa6ie4imh41kn0jsavfxaujrezp8jdn9ucxct2cjbz8yoei6xt87odky9283b7oz2bv2tl56jmc85u7t6988xmjoslp8h86w0j5vi3yhf1xy1hv5tsth90fksoypg2cleay5dygnwarm4e2c467',
                receiverComponent: '14wqv2euntnfor9mef53y3r1icab3m72778sbd48rqa21r6ot8tgiiuy5x66adm3p8pek949jtlkrlrsx5jm1ixlv1owpc5b51c18icoqqzvn44iltgcwnrl4ueswzut7wu0n72sz7yr85fukps8lx4oxukz1n5t',
                receiverInterface: 'h0y855dprwtm9r35ywt1w3ka0xemy3norx43vsd9jxzdgvtwe4711xpeva23taxqjdjvbuyzbzmfrycx767d00w2lja0hsoo7vamab1wh33rduy7g4drxswy8jhhytxrbol9zb982jxxf038ugag50kd5v00ts3g',
                receiverInterfaceNamespace: 'nf8nbejojoa3cgzwhkg0ogbsiup04i9tmqlhrnuct4e1wfgda3n8dgnpyi9dda34zwzvuk6l74w31kfssyrslke5pubu4qbbvy71ixlfvyr9o5o21cgeie8ptcej2t8j033h09267d6e645whod234j5iimnky1r',
                retries: 8509457509,
                size: 1501542085,
                timesFailed: 4719024093,
                numberMax: 2195839577,
                numberDays: 6171664669,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '3pab12xk6b9qpz2nltj7js9wtdwyixvvab5je8pzfidyobggb4',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '33jrbdv5o38n4xg3rgu3y',
                scenario: 'dd8ml5ennld2dpigwgl94zbzn1vsv059cm2kwj0hy90j8v0j3liwbtfqqhr2',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 23:44:35',
                executionMonitoringStartAt: '2020-11-04 07:45:10',
                executionMonitoringEndAt: '2020-11-04 08:25:23',
                flowHash: '92v1j9fiirtj3o5xd488qwmo91u0avvzz43tauav',
                flowParty: 'rosybzgjyvetjx8dvrwux4rw2azoq2edh7pt5bxxcgmz9wh6myjbtb9b1s3ohzcai6do5rvupvf8hhj8ibnnpae54szqgpgl4wpi6vtdvyoz6re428gmn9p6yksbjcfxx7e2naqpsz4gtg5hxivgxfvydt7dfb8x',
                flowReceiverParty: 'e5eaxzci9pu4br08adcqcsmts0c1lrqipd728ib94sm5jdg1pf1dmy3ywstt9wnbw81sjor4znbo078qma0ordg4drx0zp5l6v563x90hoh64odggcvmk09fp2hu59deegwzz0eb39yxbpfloxgd8o9qtvbs262y',
                flowComponent: '0f41wydzs7q5k5024ooom3apvxr1ejzgkeg3920j2sh15fexoo2o661ian1ipoa9t585uzuxlz56480k9x1vofhvpcsqi4q7ec3v1ycpcn20syyeee0fdtbqtjw7slsnvt5hb00r7p0e3muoqioy5ny5mwwalt72',
                flowReceiverComponent: '4hn1rkhabia16tqfg4o7qqmpr3awt9ggfgw417ywiig59hie1ycweotey3teii134u85koueory5mgowlxra3515c3crutkrpg00zdlq3dve9m7lwze7ksasuf9966aoi6atz8pj7bm2wzk16bsd4tsr0j3jo1r0',
                flowInterfaceName: '2lzkerkoicevzd44u32kttjdu33xhs6372idk46ljl9s62ju2wyjkvxw44rfz1wjo6c7x760lfgzb8tvw5fapaw9g6dll7w0q4v9loxqfaglgt5h1o4f14pacfvvb60y8bydhfotoo81z5hp4eh195sxb4c6cnab',
                flowInterfaceNamespace: '1ar0xt3dd36e8b6rirw5cn4kpqu4rbjtkxpbbibn2o9a1ay9x6noqayihw2dcenjwsz12ckjnoezxc0p9t5200ikkbudy9wtwixaekliyzgbzyj9g060pwc1y2i5b5wmc39yptmtb1bl0u6sz0mmjlfku3zj07zx',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'etdko7yt3hb0wmyxiyporjsjglomz6r169dgtkk3qxstol6zd7li1k225uivyjp0mrvuy6yrelh3hfhfcbreosq9mn4edhi7afkm5tkuuvdcjt201duxkyy1qe8uik3zirf9k112d9t79jjucuq7xc9w059ep6aq',
                detail: 'Hic inventore deleniti voluptatem voluptatibus natus qui aliquam. Amet eligendi consequatur qui placeat quod et iste. Reprehenderit ea eos asperiores quia nemo et aut.',
                example: 'b21yw1s132gafwni2bmrijnkf8rik7c1e4iktit12ulxu528q2xjcvvndrtqtbo4704mxaidua56xjc1vutloz6ugfzwgxzohwj73ejfem8xwatodz7bpmelswj8o9rvb9mjx79zgvslclgg49ufuc3uqnf5u1ty',
                startTimeAt: '2020-11-04 06:21:09',
                direction: 'INBOUND',
                errorCategory: 'glyy23kvf3vq2flpajog5jbogwdh76vfnosm5xocevnwl7tfxtkgfdzk87cg7ch471kopii7cd7oxx5q8w1tk7x1cnq2ks1zq0pzi87ia2exvnpevp5e8qibyw6exn5xohhytfsg6wmyp8ybdqlbvnoz0wgd62ln',
                errorCode: 'wl1u5o26tceaczjtlr9prqi72ucroyy1cy5ieygjfu30xb2px6',
                errorLabel: 761795,
                node: 2711256087,
                protocol: 'mezhr0vp18vftzq6vu6w',
                qualityOfService: 'jpz60bppl1f20z942c5c',
                receiverParty: '0enfy2osu6op67qf92bttvk0vveq30zpmwp88n7kccxwvrr64fv8or4zrnff79wgsuxlutdb5b1xqdq9ot0szgv3u8a6shysqjcm7p38pp32kp41sq698t2o18k44b8zlhcq9ccmu71avk8yzs4iikti2t9dznc8',
                receiverComponent: '61y3tp4e6kuyles2il7gis7tk8aud735wifm9jukxyu9z4j7pvqehcke0swnbpihisqzvtf7l8g3lxe9bc9tultjyv3f4bb086wrc4bx3xy52zjl7exibhha5k4x00ozh6do4mwni9w6meklbhkzc7w8j05xy6yg',
                receiverInterface: 'yhlot1fmuklmkq3kh3ice9xrmgtjfeygenijasn4920m86d0tshaqda4qe11dws91cp1xp3ch29feb4og31rthohh1q5m4hye5j2z0ca0hrgyuiqyh6aln4qn8osiixp56dujyzlygyvqjdyrxrq08tmae3yik0z',
                receiverInterfaceNamespace: 's3vpxaansnajgrnjuh3epu8ecw50feavhpcb5zasxjutvgx90qrfp24xc3j45k5zearrf573lcti0cguq7zrno2amhgks08em1d0qrzl0srixtwiwcc43y6kwj3m4k011e934306wfazxwzqhty7seaq16i5mwjm',
                retries: 9941406015,
                size: 2483153110,
                timesFailed: 5798876794,
                numberMax: 1926846683,
                numberDays: 8815806113,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'mlhw0btohkb3fuhzawyjyx5qaarlo93zue63dkfxhasbiznjbb',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'cpfts0062x5739gniroc',
                scenario: 'n6so8biv9bnijn72v1v4jzsp51oucc38dnb6a5g85p0vttbbzv7j0jz6f7qge',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:24:42',
                executionMonitoringStartAt: '2020-11-04 01:04:27',
                executionMonitoringEndAt: '2020-11-04 08:23:15',
                flowHash: 'cywls6a5xe5720wq2e552ue0bpr19fshj761vrvk',
                flowParty: 'bevdtqiipkv5vwop4huoy7z8679se2i2o3y1uw4hcnsbkf312t54sk341mwypytf0azzx2bfn6ppxrl2rzh7ccs2u2tazwmqr7qstzejlubdacy5m2qtok49o07e4419e69gwhafxpemailoy1hq4enodqh2pl8q',
                flowReceiverParty: 'vcqafr6w1gpeqslnq2t4whp6a83pth5cmpnb0ebqlkuuncjkt16e62qsmuynifb0b94bc058aqge6f2e80bj34a3f03bmj0zdgqstk58nferkzkx9yf1vt6wl3r0c4stjg4w9rncn66ut6m72a3kh8gcealdamyj',
                flowComponent: 'ln40esl8gsqiukpqc9z4rkubvz0xr37e5taqfhf1q81tgyxu0plmikoog1xr45cxcoakvjpzeo5g2dbfog5mmp6ylw1xyk7g0zffsjgttsuufn467h5v6t3qtg75mi116u87e7ojyz68r6qysxcyzqrosdpzmoap',
                flowReceiverComponent: '248t1jouwhyt66j5yvj4jclcow0g181mh5h7kvqt4jjkt7yt2dx242cvvzoe94ribro93489r9enduw3l2lultj9gkgniiyu3zipywzytmdbfmjr9cenw2k5qump8gpsooj3zzexcmn9eq3wzg5zv07gidi1tq78',
                flowInterfaceName: 'b7v1scaqmuh9olfjx4eh2n1g1hm31p6v6oba5px9qly3xf9hmjleiq2dxzod3g4yu7l1iivv640cb1dz5v9ax3x84dif2mz3esubaelz337uvfe2dzbp2xtsgilt2bi7q7naz85sl5zj46bt6caqoy7776o7ev4l',
                flowInterfaceNamespace: '7r5k50crmb4kv9pwxkidvyjvpn923chd8gzuyqlmzffam715csnabnspb0o032z4ufirqn8jfosyviq0k6qcjl9x02gixki7o4fuxwj9c7zknes2ku9105bo0nwifnghykyh1htvrz4utopecohjssub6urbridt',
                status: 'CANCELLED',
                refMessageId: 'zfoza6b6nsn09yg3712xxauclyom0e9z5xdraybaqketkm1ziyufjyrajiw1ajy0vwk6rf2em27qvedi0574c02nbeppqf5ts9cywcanpqazeu5kaneutjm4nx3jf5nncyzx434q2ch2waau61tpcgzi1u5k3ism',
                detail: 'Facere eius assumenda veniam hic possimus voluptatibus. Minus assumenda incidunt placeat provident sit reiciendis earum ea cum. A quod in ipsa voluptas ea sint et. Harum doloremque rem quae enim eos necessitatibus quo voluptate. Doloremque dolores consequatur sed impedit sed voluptatem rerum. Ullam quod et rem consequatur ea ut autem sed cum.',
                example: 'u8p57hbzq6f11ebo6ubspp0u3uj7ocufd3v55b2tcuc2t3t72c4eb7ngytvl3cjxrsob3ty7aecuehk78w9wb3wnmu0bgiz6rz44f393ga77hwg29pyikv1s8w6gbdus0ki5gaqf3hkamzambfqzumdijoi26see',
                startTimeAt: '2020-11-04 06:04:00',
                direction: 'OUTBOUND',
                errorCategory: 'cagzzqfu53q1wzajlf4v14kg3jj80lrn448dh9o31ev2ujpc39swnxms6492s1blblow1iijm4yv4xba8hnpr9zi313iljxgxt5ktu0gc1jgtftm7vx9geovqd7bp1arlb5s8na6eszaqujk23vnm7wl98km3x2h',
                errorCode: 'i1krl4zo59ob1egq72t0jr0hbcx6w8q7jhnclsbd18yfu110mo',
                errorLabel: 860126,
                node: 9871617566,
                protocol: 'wwjnyv6tn0ocyvke64qj',
                qualityOfService: '487rw43gc4rh6cwp4vpb',
                receiverParty: 'y4z0gpzjjj66tjzeve2kceypgqstynfq78sxrc1ypolp96areffk8ns4ybx75rmhesyms67zsn1d6tlsr5tynpm6invrs7kpgwwxqc2irgx7g1kpbvawjhmx2grp3vc3zrdrkgaaspkgrtfdx35sl6c6gd7enzrx',
                receiverComponent: 'ob4txn28b1xxyqak7b7grhvaokb3f1xf68jbm0mv8y8mg1gyrw6m1xr3q7eptxqqn35zj5ekuby5jx5033494quk5cz5g337vd6do5th2xrn1tmxj0v9ntxbwbekv4t6rqbm42rwh7i7wlw3f3eyobck6pz8jagb',
                receiverInterface: '97dyoaeuhamledzu5vyq3spcqmqg72a9mb6ljm30wecxgih53t10rmlf16n84v6iqlpvr2os0mmn8okdw2w4n2bz44bg2sz143d3crgt3z97a15sun4iwl5q4z0bgnf15yp2a754ujo4k4d7cr8ussnwylpxtv2g',
                receiverInterfaceNamespace: 'bcin7cus07j6phqxeic6rn8yng6qoeaxdlxgrm37qnj670lk5xro5ujaqcbllc7uqcadwg491nxqz4soi1s3r2031k91o4qe7gplvrut0ayjs89cd21jrqmpzxdjtv8xz79je6e9t8b7dgi6m6zx3wh77sfj4k38',
                retries: 1631947980,
                size: 7196259414,
                timesFailed: 3162598191,
                numberMax: 9791247392,
                numberDays: 7892101325,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'h4fsxjm99g5vqmdicsmink1bbwdyv6bs0hgfr6g5jdxstk7c7q',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'vsiibsr8qbbuhgwseltt',
                scenario: 'htp1y25f4k03bsig90rk1n46jse360aojbos5jkrt81jsorif04fjra54c64',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 16:29:30',
                executionMonitoringStartAt: '2020-11-04 15:30:14',
                executionMonitoringEndAt: '2020-11-03 19:13:55',
                flowHash: 'e6dp6tu9hi7tmtkdih86xgr9u4085xdtonfru7df',
                flowParty: '6wp2aqpemvajcbps331s4ogwlesxopsjaol6p19ja1zy0j8nh405vetv6nha0rt84em0qxosztpgdb90bxvzvj8ujlbtucx13h8coppqkivgn0i3853fids2bm2gavskej2g4arqzlal4gdfnweb3deneu3ss27fn',
                flowReceiverParty: 'b287s5uwt4lh4fbu1lwo2af3qiza2jus8xdbzunyrpw2uxwna2aavksuj0gxltwvro6e530c8n2bqgdfud9c5xm4dqdh4tfyrf9bkb943lbmvnhpxc83g1cm3r4zju7otmcv9s10och5sl5w541qxox32c9hojhe',
                flowComponent: 'm5fba5vfaeg6o7n16vbboidpveo7nirb132p5vyv22u6sr1hbzf041n1jsd3czaf2dlehkuwpbl9zee0dyfeydhtn4hnjv1wga2lxe7o66299x1nn9dlaaxeusyk8yzvpte86hbalueg06294ousanue4c0fvv7p',
                flowReceiverComponent: 'zxhxgmsf7u4zmlm56tv2nup47gju922ajptpwtofxfrb12cwg955bglszesdrgupe4a7mnvwuqdskxj6rb4zl37o72am2l0yisdc4pjw74g4uwqahwiceh50gf4ezm98xfuhg2omtatxbrz8qvuco1a7y3g5424b',
                flowInterfaceName: 'aa1xrgc6hqjdif0emtkazsd1b4bc6ss2vjnhdvec1r5e74jv8418u6rctylab7wd76kfz46x3rypkzjpd8kpzi3phbik7nvr2nh4d1wgqz0s73v1rtl3e05c0c0v6mm6c92wlvpccauicphx4tr34op8i5ezdsv0',
                flowInterfaceNamespace: 'trlvpx4mwwqgpqv3r8mrcm1vyx3c7d4x4gihonsp7xyw9a48q5c7hebwul3hopqxt0i2sdtczg5dr7hfz4nt3fhte3lx4mvhp4nb5ca0su6nppn2nubj3qucc3hk7rsoi6bo83hw40fdzzt4sv8zze0cp8sm7ub3',
                status: 'CANCELLED',
                refMessageId: 'lxnmfdgtexc0tt4tydrxf9bdpk4wv80tbh8rt0ooidy5adxcad4qup32gbyrwmkme9jrr309tcqbsugrgpy02kln6ov5k9q3x0dhw5capnzd989byh5q2esmbhe2syeqvwtb688b2knelidaauqr8naxvkwp1fdj',
                detail: 'Debitis dolorum voluptatem itaque explicabo esse mollitia repudiandae sit. Voluptas qui aut quidem. Qui soluta iusto nemo tempore numquam neque iure. Aut aut voluptatum. Similique ipsam consequatur. Tempore excepturi est sit facilis nemo et saepe.',
                example: 'er33dwpkow76bnwu5bztrnaxivxfxmldmxw3zarz5wwunjlf4vunwzz2v7tqcn790egt5mrot2w8w5i4omybbx6o83sc0xq6oev0j5oxrewo43632ewcrwifw9qx5niia9m34xqrtzn5tfliplfdpt8gyj31ntge',
                startTimeAt: '2020-11-03 17:30:54',
                direction: 'OUTBOUND',
                errorCategory: 'h8isl3v0tehqhcqv2ifid66xcclzuz6nkcdm8y9xaww7dfkzwmtyx4hk5noc5oxisoebp8w2x6bdgqb82ctkmm37f2j9ubl00syfj1ylefj39idxe3j06bk1fxrlq0v52wbb2yv9ezxchzbgucoa25rs7nd69k36',
                errorCode: 'p4jm2x3srl7cyjk7tnw4iqe05a92479tv5jty86zplk6b03idj',
                errorLabel: 147697,
                node: 1800553811,
                protocol: 'xbatfdkl6q83jvw17hiv',
                qualityOfService: '9dqra1cuadx3kjkt2c0d',
                receiverParty: '7irkv54uol32up2xuxokzvas02v8ki0wwvu5rwpuedzo59m3ybhynlvf1ymzac6hz0ias9rc4yp8sht5uh4ittlbg8kn0z14rdd4jyhejrsr4oukg7u1urhoe6y7kk5cydk6esq0jztw2613ai10str52odjnk5z',
                receiverComponent: '8gbrbkaj90aaaugpyle7jjiz8p8v84zmjxlv58plpg28et28s0nb803h0qu8gz6fjmz1ewnjxib8prjgnime8m2fwhkk6ypj72udwuqb61ibfaeogr3ldmfwcya50a3yg8h4p6ykstcogb2buv41cv0v72njchho',
                receiverInterface: '8nlx454r6uvgccy196eis3atq3wxut40exl6mczkorz3zb3zj3snlay7fhhv56438akc7l780jt1q42qh3f1b2gz1n10thgqw3r17kz78vfimmo2tfc44evghkrfqaf81g0apu9glzmxsd0fpj45bvrkebs3qcfc',
                receiverInterfaceNamespace: '5cw6etsw6vqoj25xbcq42togwrwce0xutydbactyxehp6n5w7u5i974v4unbf7olydr8yjnbne9pu425y0eyue13gd243pvz63dyyux6qc3gsoiqo21qmxvm4ohvrf3un11xdb9dyhysnloij319yp1db93g2nvw',
                retries: 3865046931,
                size: 6830136294,
                timesFailed: 5555649891,
                numberMax: 4374735516,
                numberDays: 5883295532,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '1k8btex1l90ejuwvcy7onm9b7jk8xp4yiffmnatqoch9yi006d',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'zz1if1dsax67uuhp50i4',
                scenario: 'vjzz7fo6qzcvrdhqc2l06jaeen4fkr2147br5mgyrs42kevorih3tpyd9q45',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 21:51:56',
                executionMonitoringStartAt: '2020-11-04 07:22:33',
                executionMonitoringEndAt: '2020-11-04 01:11:34',
                flowHash: 'vdr7rhu1a3go26plbroor9rgg9dmsmtf3230tqqk',
                flowParty: '9t1wzryg9oz1tzhkw5rc5wsbtzog9tjh8juwko5foqf5l39jw1z6uy4upkkrkmxroa77bfpnlws2xg1ruhwddqvj1l3836agrtjyny0cd1itnddgi3b0fpsbqn5nlqbibt2frnofd8wxkn1fjfcf5q5vqi0wlc43',
                flowReceiverParty: 'y4ezu929o9zr2s0hnwu6jfc3em45uw0bfqgde2g64vro66u8h6r4r2hwvxoo2cr0bbymqm6xqsudg5b936vsho4tkfd43xzpuanf125npb10haengq0rreyg4mbfp5wd6irnfa41w1wwfwry73qs4uh921962kphp',
                flowComponent: 'nc5kex74xsvtfb8xl2z9efn3soro4gemuz3l2etddx3j9bos7jrfbvgbko9d6wx78dk6i0q4cuq5x8p6sx5dr879o2uhzllhi8lss2laxn9g0ig9ferpnqjwg6x535ysj7nqsbpfii6hhfbjvyz2qggrr20c9ymt',
                flowReceiverComponent: '8bfn9af1u7r0a5xspbocnemv57ki7usg678gy09kis3lvu6doq0tjpb59eq08me3d4r4i5r3gkvzias28vt93itenesferwcvku2bu6qqkz8b2pcfax1uix8njwr8x410m0f06flks62u2m5bhy3ml38oqck62uh',
                flowInterfaceName: 'do7q6ct0hmi0orf1jk6hltobe2w3j0actejn2xqtp4xg7o7zvcqptdwhipiazkurcv53bscotjauaz3metttk7l40hnfe0t7vzl8qbxthyexlhgs0ucssaepd3wzncdu91huja82dee49bvl954jk5ejsshcggki',
                flowInterfaceNamespace: 'f4wvpnuronm7h0mna0ipza7n1dijl97in34ycpm9ijiymmejau9q6ub8xb9h7tru9q6nvmxcgfczunctfthhsbhv1rlr1cmpccgwqmob5v1ahfx12qgakjnmbi110dq6t7dgct156viypoo5c14ygn88xwf64snu',
                status: 'CANCELLED',
                refMessageId: 'iatvwu833shwo42wp1ws7sa0xfytdkhf0wv73tre9cb03rhtedfmsi1ihusfqbhzwpdhvqwm50rwh3yae9bk08wom4he0e5yxnelq2i9t5g5r57gn68tl1sl8sqy239a2yqc0pzje6y9fu2zzngznmtocl59kpyd',
                detail: 'At ducimus nobis consequatur cum aut iure. Iure perspiciatis corporis earum adipisci voluptates occaecati et nostrum. Et autem soluta eum eum dolores. Dolor molestiae ea sit qui eos qui veritatis perspiciatis. Cum quisquam consequuntur in sint error recusandae.',
                example: '79dwf6cau9xy4yfboqc2uwz6q8cv77bb0abg31j6k690c6slhsly0t3yrkeuok19m8j69a0vj4axdl4nq2g7rhcn74neereu8scs9w1hjma1jmtkrpal1y7981xplnzizi2fytoqgzyb94vznxxe2jz9o6zyf7gz',
                startTimeAt: '2020-11-04 12:32:19',
                direction: 'OUTBOUND',
                errorCategory: 'zkx2hp0giomg5m2ymrdigjbz8g4vxma0ei9thkw41pbxfqav3lefh92yvz4o3am0vfb7bn9mf5z5lnwk2ornvqixkg8mx5aaigo065wtn89s9da9k6dvjgno1ydvq8fsvbm1mflelehom6s9ka3sy5dvemoswybr',
                errorCode: 'a5yeox4rvptleq83xoryhkhc3h401h2t2g1n8j4fs7m8vjycbn',
                errorLabel: 567056,
                node: 7725399545,
                protocol: 'yednc36ad5xjs445f5lh',
                qualityOfService: 'qc1rdm7aqraxz9mywthu',
                receiverParty: 'uzv21u8qzhx42eiixdw6m2158krwthbtfpmq6eia2w77n9dswjgxknujvz349h1929uhujitcgvvjp8lozd85g5x7cnbaiqzi7p2i48cej4v4z8wacn2yj7zwtfx68ejga6z7qfn3hive7sc83v2mu91x17lfwb5',
                receiverComponent: 'v9wdxan1maipbe9jj1sxz5pyzwky93dztukeqxq8ne5ksk5su6ngdwyfiu7p6bz9wq6vpal2o711ru3nnkx7rzojjh0g9qoyceoewfxuy3h8kuku1agtyhvfbq5p2az8hmw73x88hc9za66dob6ihubj1flsc6su',
                receiverInterface: 'r0tjf3edjrdvc29uh33vuxjzfd8gpu5gj7522aong0ek8fvn4dr94et6efd9fvhvp2g75zgubd8ygp8qyzittcpmbc4ozvzrzqe9gmqd3ckjb241tonoywk7msijue3zoobvfqe5q3aexlja2urulefmafb3kaln',
                receiverInterfaceNamespace: 'v1t23all5jy6e1p91zy2a4gi7566rcntmnwofv5lfcr1bfaws4k4dgv5ge1h8ma1wo6t7w34vr78nhv2iquhmbt77i8xn9iip918tzr1rpilye0i5uivoovjy0m6ihq1tpwk4ahm1ry9t6ow63m3yl00rj36dphk',
                retries: 2496895861,
                size: 7949678996,
                timesFailed: 6214110772,
                numberMax: 9157118741,
                numberDays: 9410362027,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'mqnnnhi9w49xm81uq9thni31y5nwcvg7ody4xmpu14ds4xrtqh',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '3ts5g0cnhg5jm3cor3ma',
                scenario: 'xrld4u76hyv8572ey9mty87r4683kk0bv97juehm8lcir8zsuhbpk69dee9d',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 20:02:46',
                executionMonitoringStartAt: '2020-11-03 22:08:08',
                executionMonitoringEndAt: '2020-11-03 19:28:53',
                flowHash: 'ojfukf1rxi7gonnwrduzop4ft9i4uqv0i5srkgbn',
                flowParty: 'hi304svcopjiehsfn4691e5qsg6rkuu9fd4o1medi0f0a3a79goh99ej0ve3o0bieev3c7euch8mh91cdwq98ngt6f4ew2ln4jjyzhcvm5ulp9wzwhcz99hc3kc1fxifgas8wmvvbx8b7b0w0nc9xjpu4jlulf0m',
                flowReceiverParty: 'abkuszl661kv5qfnrgkxo9kluv7w72m9r5b7mfaydc5cdt7sgx989pnkxxd7txv01nfqjf0gyxqt2kalkekpbhcg4xg54ztq03ddvxjdpdnritk3ibujf8uetuclknz5opobmd80g0iim0b04kx5ahedjfydre99',
                flowComponent: 'dan7oxaref9sbw8bi8017pk9xs4h1uxs96761a9i2owjsvtl2jt02u1pat8yr7e91an4u0pt9bcrci0z4jfofey14lm438s26z12i1s19s1kxay6yea82ei0f578e7l2jfechg389xdyjr8rofxsbyqba5uh9qk3v',
                flowReceiverComponent: 'hfoh93b1ti41pj0hg60wksxhclsd0vjj9oi5hbbve9i113srxvgu16ta6rbvl0h6jgslz195hmp6outz2f0jq0xnckf5mm3l2tq3m60f0263mgtib0rbfz9hm4buzvgvl4dvrqjx72ulmu3cwzkqr841ks6mo5ed',
                flowInterfaceName: '09yxhmgqjvz4vdyfyhhz3vkhb3fuywgc0zh3wavgk46abnaa0vzh70djouruwqv7fl7psf62xxnjqo1hvkoapff2a7rez6qw66dc72josaturxtd3am3pz5ju581sk3tdvkulhv9h7riyw4j6brsay5335qx2cz8',
                flowInterfaceNamespace: '4rwyg18otdy12np6cgxcm1kol0020zvm31skkffm7si6opxyt8xsng7m2znhuzgetw5sd3i98fup0qpv9lno9g0ca3f8ct7gzscki40coxj5b5jxa91ocaet8ay0luusxyjmcnqiz04vyg4gntmuwyrqjceqbdqc',
                status: 'DELIVERING',
                refMessageId: 'smzc6ubf94h6y0grs4b5fybno30rfgqedhnyxqmdw04d2kpmoe3kdzpe8g5w1154wdnqav8g2el74zt0ybrs3p1l9km60pm0m4cguwzdyr4caovumck1x4x7k004n1j9vwy09b2mxm53to15jjc78zn0ecqat3wn',
                detail: 'Esse et quas et architecto. Cum voluptas dolorem ut. Voluptate numquam repellat quis voluptatibus labore maiores iste provident. Totam et qui possimus et maxime modi rem dolorem. Aspernatur dolor ducimus. Necessitatibus omnis ipsum perferendis dolor adipisci.',
                example: 'o4rx9g1pd5mglkty3foemmxz44ajf6ph8hgg6uy39815w0bswx96ebjuge8krnhfpc4czsooz58ux65q8jnhs48mg92me5lkcv3w3t3kxo3x2k2m9f7xsrbh1as29vxqfg7xntl2v7wkf3y6rbp8nhc42reqq39r',
                startTimeAt: '2020-11-04 05:22:48',
                direction: 'OUTBOUND',
                errorCategory: 'mv7ijo5dg6jp90a5k9nwma0riqi71in3iuhaip08f7hzub8o9qwnx62jqxm9k8mhvrkhasz4dli9jx834gofw690nvgoh11l73ymnv8s6p49vpepwzoqlh1bqw702juwo7pu1edlkubvkvau507eoetkszyghvc4',
                errorCode: 'fvb5g9f7402ngzogj0bl88nubgz8131e5igkq95wqwga9dq8es',
                errorLabel: 162467,
                node: 7334820076,
                protocol: '1uskt4ak63n81vwouxcz',
                qualityOfService: 'bw0bgg1x8muff9tb6v8w',
                receiverParty: 'sjd2z6ss0ro0wenm414n2g10ytd5ac5l8aja5u6kcef55kc3n0etfu0zcs8jn02n7dwiuuvepga3yshmvon5d0fz3d83a96hisk8sohma5vzds28okbrxv1e7qgos3bu89vg468rwswo6v7u7vvyfpperyefhnj6',
                receiverComponent: 't2i7daqy10vtff6pg9uo9o4p48bnd85yax00nw1pn2epxqn9hqeju1vpqnx3x47kwlw07g31utgobel64n7yqdcdfeagbasmoejemo3bugo7an5ceot3btb91rzqnebvclbxb9cr34w12ahyf2wa0mkl0vt5f2dg',
                receiverInterface: 'j6l2bn4yrdxoap37cnpb4flediqhrk78vf9lezyenpjy72ojut7rzss9pey2uvkkufwhi08hvpi907bt7czgsqms8092gsl0hrcqgo2s4f0elblerdsp0fmy8vri7cgixw60es67ubpt1hbhvmw8opi0gjooci9j',
                receiverInterfaceNamespace: 'ww9gucp8dh4xd4gl950eze0yhl3gwdv6v8fxj3hb7bkm2kyufo5nafwh0tgtlrob1xpfzjnr3b7tnx4kapkfnlb0qnzjeu8mm03llpy1grbufqxwnyojc8emg4na59bf9m8z4g1nc2jgy0m2bsdhu02souy6qzoe',
                retries: 4713175915,
                size: 6731498176,
                timesFailed: 3296802987,
                numberMax: 1321681532,
                numberDays: 9393628342,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'le50nnaook3ol42t16wn8lwdqgatsbbqptp3z5fnx2c2ffiky9',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'rdj16wip91fxlppppzwu',
                scenario: '6y3n4zm9itr5ksm0t1ntt0es2ap5awkbw1i9910tabpu4rbrtz62a7mwbc71',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:42:47',
                executionMonitoringStartAt: '2020-11-03 20:30:28',
                executionMonitoringEndAt: '2020-11-04 15:22:54',
                flowHash: 'xbxrycoo85kpar25zao4vxheymg3n8s9jlngy1j4',
                flowParty: '3gu8xli0nuvun5proaaihibmbpy4a4zyx63qjvaf7iq8ha3w5hxvimku45btzjwli60vmvpmukf4bf7u9ddbz6q58edyaz3ztbwx3xxxmpxzrhr5thqk10s68gzs1erudsz9ngur3ny9jxr1468ysi8ir3m42lkv',
                flowReceiverParty: '9z3uh4j6rdwao785fg7zc6vwuke5fbkm43w5713nr7ap1ttha0ff66ap4zecdb9yka8rf2401i10b6qng8jmacddsyhhbopej6t3ifszh263xyd6a4zhqe299h3pexcbn1hf6gaol37c2xw5ab7th2szqxtfy96z',
                flowComponent: '9gqbh9urt8cczbd7nu8f0sun5amhb31errtochls5xxqgvge8v1ae3uoaf4v7rf2bnzlyzw5xq34egd5abqma0n1fmb2oi0pvyqcozangku6c28jf0ao6l2ejpexx6gxxvoobeiq3awuu5hvczk6at04f7cqg66l',
                flowReceiverComponent: '3u74vaa3rfh7v3ndal7ffpbfvncadds6fvm5vp8gktpjy0kl5wwf8fc6irdr49shzvqzr845i7ozrrtijvp2c2ckdgjec0xaje2arjxhl2pl4b0ksj24napsph2eduhszsbsau83aqjcjedyl2ck1yh4odynwswa2',
                flowInterfaceName: 'qrci86u6tz7kc0oth1w1t1c51i26i5h3td6yhbfrqh0qzht8hcbwu0h7aebm0qpaihrl7uejydvzvbvmji2meqouomz5kynks540qzta4mqaotfqd5uj79meijaws8jea8atw1j82kg0m2hadl8un1gxwofm6a2a',
                flowInterfaceNamespace: 'rl58su9kwhkydto2i92p9rhosmtxs7sf3nb2xdimjcopq9axpmvtjxdnfgvunge4r5zbj6p3d0q0ub7fenpzg02zgxzm6n819zu2ciq1xpjdrvgvblo00s9gwig3q1bvsqgc9s4sa7zakeid3w4jnr71cb4rzhre',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'vqves4i0s1jvxxxqxg56uhagfdx11me4y0fryak9biduxn6xigo1m70upqqcbz1lb2i5e69ao6x32c33rub36xr9c6nd51bau6kzb7gpawh426bgoi8rml36bw1n51n9sg143pzps3fagfx26j2uzbs0hmfinrx1',
                detail: 'Quisquam sit officia. Dolorem qui sunt. Placeat ducimus voluptate rerum et assumenda molestiae sed aut. Voluptatem recusandae quo ut. Qui provident facilis alias molestiae voluptatum.',
                example: 'ufedfjim03yj2d2rvw97iifb7s3qpuqp9o1lgej4wfd8yzzoj06gt7noib2nwrpateq9i8l2fi8n352mslejcgk30usedjz1y7k6h778qrdy6a7rido95bon1sz5sjfpyr6pdoufu7g5odb7nqyfqpbdu1jg2uzv',
                startTimeAt: '2020-11-03 21:31:06',
                direction: 'OUTBOUND',
                errorCategory: 'gosjgko3oka6tor68crerhv0obdapool50yfq3kvnfrtcy6igrvf27dx7chall83ibd1rb350o08qbunoptwqpmrcp9q6jtcjrc43jqlhcdq4qgr3whaxxqoeq6h6d8s6xunuirvkjwp4ap55l530hdgjte4nhqa',
                errorCode: '65gh07w5blfxcpr6yf1t2h559p86etaas2zdolnduc7oporo5l',
                errorLabel: 241363,
                node: 5067794823,
                protocol: 'i4br38kozahwd2u2w8z5',
                qualityOfService: '3c9gcg67jsdst46qr8eu',
                receiverParty: '63i0jn60pjwoze3n6g6n2ynwxum3xjj0c52ugai1idyy9gc85arh59lu8eruawrp3rr4atbhntbz09uhae4zb6jnsvy16teg0hout5expyts2x7ql1nruwv6ynxdula4pvlo9j8p44f4rod5otmf2fpdts3uzgem',
                receiverComponent: 'ql3f8lwhpf5ydmxqrw0fbz561zt0v0sci66w0zsqv2l7t2w3n6qzods9dno55yc8u2h4geym9smai32apkbpgv44ebh7a6mzcobwd8268wpog2rc6smco1wrscgxnvdcbbityju0s3ugnxtn9la80hd8kiab8j30',
                receiverInterface: '38pm2v28zyav2pjvwubw59jb4z7bmkm15d0mx22c8fr5nbpjlb6o4034hgqr40yhjldkjws5pdgwqefmrp9m6o8548kn9lkpv6kun6jbfe9hc70ktzyxpmnv9hg68k7ra7qxc6flcgqg82h9cmgnqlm8ynn3qlm4',
                receiverInterfaceNamespace: '8347j3qwgc0tv3pp0ltm2pp04zugwtofj99z7rx8ouxx0ih26petk397v7h7zttq2juq91fx4jqsm7k9g8h7hfcd0v7p6c67qtpxshpwdmxmictdgv578qqyltvk45xhd2fsj7bm05dbfwyxe4g1y6xa07qbkh7m',
                retries: 7292737985,
                size: 8759278899,
                timesFailed: 3585804152,
                numberMax: 8397140086,
                numberDays: 8439620917,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '5kupnyjt6g5gxpk1p6bu8vmpjrz6f5eb887w1z8rxhgs6o1sij',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'fzk1y3lm1khx8po2pqud',
                scenario: 'zuk88sc4l1x5qjwiar2gy736gakrmxq3yzc2lww9szl76cm1hkylkx0gym8k',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:41:02',
                executionMonitoringStartAt: '2020-11-04 01:52:17',
                executionMonitoringEndAt: '2020-11-04 03:04:36',
                flowHash: 'hitjfnoznnsog7igt416k23flos6sebjfvtbnhcj',
                flowParty: '4tqhj5m83kuz1meo36hnn03tdbdv2hvnk4c8cgw7vh7dtt507mltwlcd98paqe98e8cekcipk133pgjk47ykhvnvfk3e91diyfzdxv5jeb7ia03g1vxhxt24shlbw07sicuo3zv8zacg9zrg6jg4d2pqqmwvm4dr',
                flowReceiverParty: 'znjk9czqde7myimb6pi8yk8191cywgb0bxupissh887bs7h5aynn30z28t23vnuv9xauwsce70l0bfk52ad2ip2fb0zapx7aiwnvp7qjlgzgaklak6os15lmkjdboym7z1dxkuvvvvedpvf2corrgc9yu1m66qyi',
                flowComponent: 't2bd80zh83yv6ypqnzxeq87hqqu1oo7uj8ld0h9wgu3iran0sup4mdgzufizqgd7xc9zvvtje93z3q5j7o7yb0zvt1w49f9fk8aplg66w2x73dfzk012iudf0dmgvkywg5exk2ptircdv3pvod1avpbkrcik6rdd',
                flowReceiverComponent: '9idczkgclcmf69c6vz4o721mto195wevz6ggmoq376cf3e5ozd7wb6u3wrcloorblw600odwjhurdq1ln7icluy4krmrgnf7912ckv6vv0ln6yz79a8j8rrhykkfraegcz8junxp8wdh31meh4rpiirhdampdvbm',
                flowInterfaceName: 'zkmr953gpae2a9wmlqxnhwmnpv2m78afcmm8miv8wd8zly4jrygghp2uteiul9ee4vzk2x2vk8tfjx9q90fm76jvoewqn5k0x7ujzyh02p2tkuv4b9ul1fr3923z041hqwxl3u12hqy2e2eqwuvupfl55i65q0n5h',
                flowInterfaceNamespace: 'lo9d6rx04padcwq5kec3jadf1wc3fl5cw4t3bqjuobg8ivf76qgbl386alleexgyhx2pb68g4x0mg1ek56ilx6srs7q9txb1eq31xomrb6cv5kxwg0via15r87psddyhzfxmq21b6sv83i5yitz7pisz3oeg4uvr',
                status: 'WAITING',
                refMessageId: '73z1aobljllzjmpw88e5n19toz9lwjzt5973v0uex898atnuq7a0vgodgpaaxrmxumsy7i8gihekiyz8cp9n2hk1xsuxmw2qehl2iuswlr7onv2wgsc9ufyzsrsq6c5zie1tw4039m2jfs64e9tzlpm278cdiqzf',
                detail: 'Est hic et neque porro. Ipsa ut earum esse nisi aut ipsa voluptatibus rerum. Qui sint possimus rerum in inventore.',
                example: '5e5bipcajchxduppmfvol8jek6vrioxjzrstrv2tconhmjl7lkgi1clib4u8av80s62rtbubedym2m6gfsro0444qmsxnmr3napsbobwfcy56y4e6l5nxdsvo2y8ydqeo9wjjlib0vpgo3zc4ws35s3deghivttw',
                startTimeAt: '2020-11-03 17:24:51',
                direction: 'INBOUND',
                errorCategory: 'io7bg7gs0vurrb2em2pdqmif8xvv54p5z3kym8x2e5la450jrn0cthdlz54ajf7t6gntztc4q9sm3gm5pk3piikitxxz3nwcwxg8caogxjm60zq2m6o4oeys0kn11rixqskz329fw88gadnrcj7p6h9rrmsi8k41',
                errorCode: 'maam2jrov6az64em6k0q6hybrnk7qxk7oturw6nzlo6eml99sg',
                errorLabel: 622811,
                node: 6466651985,
                protocol: 'sbqa13sm66fpmuu2tubx',
                qualityOfService: '25vaamts869ouskrna93',
                receiverParty: 'vmvy0awp39jfg028djnj9gzurck1pqf51xwh4gr8bc78ame24j832rkmgfi8nga6ffab80cq0w443c754d8z6usv51xg9rqm976gg8iqcppnnr0zu15a840obfndp32pkqnp56mtwhm24xm5anm3iougiqa1rj57',
                receiverComponent: 'jat7vpxfwgyrjmmqrhbss3f4twjw7y0a3vx79v47c7z0gid163ey09qfadnkumyl5iodfiwgihkonottlqanixxj6h77sk2w1h1nqy2xjcta0lm4qx9llbsctjm6x2x7wawarom9hic99zriejg8cd6qyboz7r2y',
                receiverInterface: 'dpbwvl3dnum4de03q8szj873hhs6o5v7pgeluwlz77fejsub99uil1vop014w8k9cbevzc3s9748tnlqyopxe8qjahrh1uto66nwbb720czwje7mksntoomo0ovt0y5yxxp2jly4g35l9vztmynlyxk52dgumrhu',
                receiverInterfaceNamespace: 'w9av3i77cct5owfutccvu90ce5cwttwtiy3sngubb4l8qqfbxyamma4tiufclj5gbsr0zlo2gqm4hwfhyu9mkvtcz266mx2gamsh5ozwxergocbh6hjivg5rwss71lyk1vfkt6wcnxsrnfat01eo699qnyc7b001',
                retries: 5802370280,
                size: 6449147441,
                timesFailed: 9656173947,
                numberMax: 6117410171,
                numberDays: 6197234820,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '8l3o6p63jtr59wv0zvl7cdrbc1wkv41u7h2f2mn2w5i8wsqqpw',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'mjx9atrb6m5ca640jq1j',
                scenario: '4ahk70o7el97ixat66y7h4y6ncmcynvybkxy88h8o2n24z0lk8ywcmcfgg7g',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:40:04',
                executionMonitoringStartAt: '2020-11-03 22:15:25',
                executionMonitoringEndAt: '2020-11-03 22:24:50',
                flowHash: 'ziqlfs3azturcpkaxeeakycq64x7tzw3cg3k5uce',
                flowParty: 'in62mdn3mzou82yxsglrgax6pn3lfiyxdc51vnp8llu4f1gfnf7j7zct7dy665dm9pgws4rardndfk9l6xlsf866x67339kqpsph2h29ijdc0wwqwtbdbyvir93gcua6sl6pr9p2si2lefyt0aa87zpiuqcp0qce',
                flowReceiverParty: 'y0kcg72rf787vb4hsxjhd428xqncd4wep3vetar5l2593v7lz48fk85mhji7vf8brmwgh12uziiwbd811lr14qeeneona96g8z213hyiovq3gyxwt70wyz2j4elmyagfrz2cogdcpa27hdiy9idk8jj8jc0e2li1',
                flowComponent: 'g058iztm7itje9qpsnst7vjluvrr2y99n70ub4z25k7dw1jhhu9fwtyveohy91882vhjenzp72u7bmnlrz93ncu0u4j8vjqo7sszs3cbqrc6w602lm922uu2mfh14h0qv3vzbuy8muec0kb5x0pklpc089yhvnjs',
                flowReceiverComponent: 'zz04xcpx9mzsig3ba67ruiq10zqijr88gpfsfsab3yihmhekb9bf1rjntg2n1ns0uzdhnar6sfins5uf0ceqxj6gcb457lxo7ysv9b0qqnw5lre8uvsnrj5v9ve1jj3pqawwuf6wamb8mxpzkybtz07s68e7i831',
                flowInterfaceName: 'eh37l4hkrwk8bljt9vsp1i3htb4aho33zinr6y9jn19tr7lae8fj9vdr284g2y6rlfauidt1iyz3mdsgxy85p79ejdqtmzgsmsdk6qpe5l40cjrdhzxvznnuob8d86ynr9o8xdp0ebucnwd8d7c3vpxfjqv29wdd',
                flowInterfaceNamespace: '2t9knygdan4c4n7k1y7w5e6c3v53pwo6xfepj6b4rjr0kjlovbzapwpkl2frisx9hwc0s4eos64yg12yht6tk9wb3vqjkunn6mqpbszn0vemdhifdd4gppz7bgiymltv68qttrbuhq94utmqu6i93tjkazbu5xodt',
                status: 'TO_BE_DELIVERED',
                refMessageId: '3kjk2tp4g634uyuga232mulup1sko7spxhn1jv0ovj2nn7eo12sk76n01qks1czhdd6ce1s1vytho4rm0u9xtxiybp1zysijzwkiewp7xpudisgljgvfx8r25sls0v7iozsvcw8kc4r9n3ru0nownhmm41m3m3gl',
                detail: 'Nemo dolore sit quia rerum est. Tempora nostrum incidunt mollitia et. Illo cumque rerum distinctio sunt est sint excepturi itaque. Et est dicta hic. Et quas ut delectus rerum sint qui inventore enim.',
                example: 'urxy9cpbhbwcni1i1c5qyf5r290173hj1dsexmzznrc29m7p47ettc5lk81zos73wkbqcm2chsvpsrymhntvdkg19td0hj7jwsqnab5eu6gtwps908e2ie1b5zatv921l0jdd8o4fiurchmieppfp0gjyg9u47fh',
                startTimeAt: '2020-11-03 22:23:08',
                direction: 'OUTBOUND',
                errorCategory: 'jq8ax3iqme08wnnris1wa5ngjyvrhlb8v35q2an8167c71kkbzhcp15m2ilw5cb3469q2bszae3rbw8kfjcj1mfd3f1dqnroswv03f3hnw7p7f4wgir02fm3nagfsbpbyufg0pyzwvsnxunzap2vq527066vr28b',
                errorCode: 'lj7kng77kymbtmvmk97la3jxt1pszs7vcegfcb861vu08k1fze',
                errorLabel: 916320,
                node: 1361325580,
                protocol: 'lkzvpsjx5jwaatg4hann',
                qualityOfService: '4804mr5j62tu959nacnh',
                receiverParty: '3papu1ov7nay05m28t30jioaa7312zxshgjl3krwtwfga8p1z4lcamgqg4ez0uu2nt20alfakyh0l97uvqdaadic7uzgb122v9yhzzbh9l3hzqwtda0ru8uc1m48ksw4o47he6hovotl5w4h0pmf71swdywc1cwy',
                receiverComponent: '1bw3fb38p2quyegc8n2mhwlp0wwgzyi0j765na79fm0x6ee42gfcfafqmnjne368c5scw6818sywbu797l8hynvrscysv8uxlbjdfowxkofjnj20ub3qdw46pi05i5bpwfw8mwoorzsikdkdwflhckofo4bi9s3g',
                receiverInterface: '7yd4e9jjdvom6a83quz6lgrfkjqqupxcdifgn6k4iastxjjsj2ytekkc49lvtiar2155b6tjuctq5qs2bsg7ghpeu3tm9cnm7u54bu9s550ebsf0wmr9nhd179txuss9rpdvj7ly8x8ygjqqq8nqfvbhx08egiw1',
                receiverInterfaceNamespace: 'ft7i25pqselg2tkg6u6iqc1jksubg9fqp5o4ienk8yhk3740919r5o8kvu84mxrjm66fd0gjt44ktxvm3a5rxax9669hh6qt1b8js4gyxxzoqvgymgblmgiijulwo3vyb26ds2bodttngdvvoemklfh1smnfnld5',
                retries: 5863735873,
                size: 1109602046,
                timesFailed: 2422361095,
                numberMax: 5770269760,
                numberDays: 7032011288,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRefMessageId is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '306wx17uf3ix6p7dxp7nale3ds3ynm780e68imfoa13vjrpr6k',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'ejz5k7s7qosy2ud3khda',
                scenario: '38p0ou5nomgy9m52v3552lqkrg9wbaryou7sj1zwxy8fifki2s7dw0d7hmae',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:38:15',
                executionMonitoringStartAt: '2020-11-04 00:57:34',
                executionMonitoringEndAt: '2020-11-04 12:01:51',
                flowHash: '9kw1abwxpa1sygs6ojncjwuhi1kctcci9vtyd6j2',
                flowParty: 'ad7torkoc8dmd6sku1c488ropqcabqc08fmj1nb5qk8ndq3jig0u5r5wxo5ta2jkbhmbgr9f2393wuqkttfa8vq75wf6reea5ntjqeoqtoz5wx5sedd53zga64xyq5e24eps9bedef1z94yniep6xkdz4vht6b6h',
                flowReceiverParty: 'b2l9sseeqpf7s2k0ykc8z0zazlbvicli4vojdqwm9tk7shjv68pjp0pdgg30ibfdbkjnrmmqmr96abbpob1pi9vyz7yeq3n5fhsyamrq628mzq07h3yb2rycu2qn98ytmrr1bl38pxy9v6sllb5398w9hd863g59',
                flowComponent: 'l0cvnkpjdpusy1mbahrunmmfy8yadbwn2ag9qj8bu73wraavrl85ntt5xobpvti3139fsfc9oopibdmi5j6q0dokvd2gz7lylatmfu0brli09f265q01lsuypl984f3v0y3ct0rlgw9teslh6c1m4d2imr5gh9bh',
                flowReceiverComponent: 'mj59p9s4bxlx046gmz1zkg7vx5yfhikcujsw58sg2at8quhqjnxlzgwjzv3squukvd8k8aouqawpmmh8p4io2xu3ufguzt04ewervdx26qaniu2fy0zb69jberwhy0f2uw38hjd17g5j05e6gbb0p2l3l0smrlff',
                flowInterfaceName: 'ypehjzxmwhav83kg7l0r6nri1f4n382jv0mgz0ljhnyvnj751xh3c6089z0dc397hmun1k0co40zujk71190rli3icce7jzbm6ip70ksqxsb0kx9dzh47xlp879xh1l0i1y77yan04nqxoc9v5cceqlpe96tlqvw',
                flowInterfaceNamespace: 'x3wfifgpdqmpdl7zrydlaxro7oip03somyu1ze611nzlmkmkryc62bcybtc4cc2h7lelhwmckucklm29c8zxa7hjkjhbbwavh74cs5lkgg5vbezr3l084d1ql27mfoob2q027atotwucxrt9sbstfxvuc1x56wfp',
                status: 'CANCELLED',
                refMessageId: 'k5ud8jvbjyl74tv975erc0ebjha6ocdu79w3oa0pv7lb31lwyvixb1knngbmbruss3181wu7mnyh850de9hkrh0j9l48vk2j9zichccmvsr2lyi18ae6xfene9vusmw96t25kv7hb9lokmnvmji5nyrzmj1yo32ej',
                detail: 'Minima ipsam ut. In tenetur et quidem quisquam deleniti consectetur ut repellat tempore. Vitae sunt in omnis voluptas sed dicta ab voluptatem.',
                example: 'yd0muxv8a80b1nw0gc646152bbi2cgqaaxxp148zn53y6t5w8pbmufhsf6gef8dqcayqlqclqrqawl1uhri0fhswzlgoik25yf1zxtqoy10vmpxh5p8ksxl34n2gj74nk6j4ldyi9livhu3r8vvpzb2lf98md4fd',
                startTimeAt: '2020-11-04 06:24:28',
                direction: 'OUTBOUND',
                errorCategory: '7nim3woku2au02gnfavk1lovdpnnxq8pnl8wpbn1r0pvq3fabrwst4zyct9rtn3sd4iwpcn8p1o1g4ws26dc2yio10c2auu1cz8k6emn5un6pk428i6he232f0ehurf3aruzlvnxj038xbyx2mpjeubbfw5eushq',
                errorCode: '3ill14zs6hj1348408l41q8tfcyjkv57eywkr44g0fu96fo354',
                errorLabel: 916883,
                node: 6099322039,
                protocol: 'aoca9jms3cx55eunx0vl',
                qualityOfService: 'qnks0p72ddvuuc23dutz',
                receiverParty: '5ism4anglezn6lgnpwww1z94q6r8u2po65aq6jxu6r93n4cjh7nubqzibd3tr5eec0hsf0ugd2mb67h64nnbhka89k3958flfoi34ejf4hmz0bkb7vqk5fv2h3dlckpmxgi3ep350oy39njgenfa9z2er94gp783',
                receiverComponent: 'z1fty1ynoqsl0jkagpstv83xtdnt8rfssf1scblvquesp6busstmvphk7joj1297p974pjhndc0tv2hde1bo30s40cbs0fr7w2kqn2422lok7nwx0ykja8pjx41v0ponnh773l02y36tfltxyut2byrxoh03knis',
                receiverInterface: 'otvtl9t9hwdzfs1p6lm7crqn13zl6q5d0442e88r2xlhzdxz5axju69hqzcpw1nmm4mccr29o77zjh5tdflhn62aauxaum7zqu6tegvvvyb0y1mqh5pzy21jjtbgwmqp5ahlofcdxidjv74qzhkqz6fvnqtjpt4j',
                receiverInterfaceNamespace: '1q5mnlp0bji6cghlkiysi4duqtexjy6crbnwj1p611h39vlu9vjvcyx1csikam844s5wjht4vsy0xawpzc2smx5j3634hc4izu9fefws67u8x5jbsmej7qkbo3ajsxfdxkm9mcl2shpgd2n5r0cv42s6oitneotu',
                retries: 4128860257,
                size: 1140449893,
                timesFailed: 4474732283,
                numberMax: 2912820943,
                numberDays: 8497904487,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRefMessageId is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '8b7t9fgi6jhda4a32ucc92v876ge1nepocmn4gyn4dutbfztk8',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'at5ucwmhmrlj0oilsz2e',
                scenario: 'o824ti05cpip32wsrbcdrv6tpf7fvdse8u16wtao2zme9836lhvyv0x2uja8',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 02:36:55',
                executionMonitoringStartAt: '2020-11-03 23:26:00',
                executionMonitoringEndAt: '2020-11-04 10:38:37',
                flowHash: '33t7e2elprsxocp9z6l30dl444qgcx4u329mueyz',
                flowParty: 'uasktvadq3f06hxse1dqzfo5u1ilfz3xhiy88e89se6kiiqz015ji09pw0yosxyj0rqb4rs80susdjx870p9l6hljbgczskutx3nflrx7ll0btr09gu0f18dmwedte455mzt0yrihbhckv4tc9h33s0qz5i25del',
                flowReceiverParty: 'qye6yqv3az6q5n883dry56z0cla981br7g3jrgqtvejr3dpzq5844wdfdsaq0ydxdsnc7wbgst1sllbsyoekoe1caejw8s6vgf1amv5io0ajhgoyrzr2qdrhdevd86e86fuc8eez13rq9kfdo5ba20n1kesrrrx7',
                flowComponent: 'd35mwbfdlhn74fxeax2t4i6lxhtsey5h29tfk55936btysimuq9nts4vvxodkc1i2y8mx3a3dpe0412t6k3hepk1n5iiw5swcxu9av3xsf59rd67huhn0ildxnyvr5cvvmoe47b3sunklvomicb6rw1djak4a94e',
                flowReceiverComponent: 'w64dkv1kfoy5xwl50d7r9dz2sjz8hgjcx1xl9nr9oxi2eld05w8d9csqsq5xwtdf9jqfenvbrxpo2s08nx06b7iuzle0709egwkzzq0xrwg6hjg000occ1icjwoabkt7iaq27kl6fgxmq7qnzikz6j0y5mkpkogm',
                flowInterfaceName: 'iuxnnjnj9ipp2zwfb6p9gbt639sjn145zzg837dkauwpav0phl9tf0gqoc30tnga1ap3sy2h7kgr23o4ps9gl1f955bctn9usleots5fq1bzyxvsr5e6upnk0335fughjbvt78pzql4n5oubmphc15zofvclcp4a',
                flowInterfaceNamespace: 'zcb8l8i2x00vg9tm981vdyl1b51kby01yljsle92uin2dtkoe979lg1mkz2vy6nxuj9q0irq34a9chd9uvlr6lfb4v95ofyjf8jz0sfg5d3krfi3b3cxwgwknb2vk500tsv4pj4unptlms6smhr32ga2dcphr2yt',
                status: 'WAITING',
                refMessageId: 'v0qibdb7zow3i5dxntyfyvnnwipwrluich42l9bcw8q9or5wor4ik6obqm1oc4uqc5gsdw16s0367n8sf6dty9hre8jxu7mvzt9qmdlfdqr5eyx8q3jxfwpg2l9dznv1uw6z6gvmle0qxv2mfiphi1gw7g7ypfkh',
                detail: 'Nemo iusto voluptates totam excepturi ducimus molestias. Ad impedit in qui non libero et adipisci. Repellendus aliquam necessitatibus qui eos voluptatem. Est veritatis voluptate ipsa et similique eveniet eum qui. Ratione harum laboriosam et architecto.',
                example: 'bbs23osjn21zsl5w7p8wxoeddq1doml2y58xx0xsnrtlj47srokc4q9u2fhos660wltaldsz7gwathca61fhtct1jxyqovhysu3peic020xnpvi0gce9o6yfjrpe2kj5ytjb5y29rxxy9rdvmq2298lwz25ns3328',
                startTimeAt: '2020-11-04 12:42:13',
                direction: 'OUTBOUND',
                errorCategory: '3kd24ac134iuirn3xqln6uuz2u5iheqwn36qba8qgzha4rkxux53s7dininsok634fd4wpqanplt8c2kmsfa759e117iie27uvrf2pueiguu0cvfygrgk935tj2td1xbi52a3wqt6lcmz57v55fleqhfg0f44rxx',
                errorCode: '8eegf8b5a6raro152m9tkdznox6sfsl8y6smhqz7um0mj8jng4',
                errorLabel: 402090,
                node: 3184437239,
                protocol: '3waf64nz0ddwqquhdk3n',
                qualityOfService: 'naedavrxpgcyvnpgijqb',
                receiverParty: 'olfqyfupiouj1kmgel6jnnr9808txu65r55y6rnxmnj0w0yb3ri4bhv0ofodazr6qv5it6rz5eddqzr07jbcwx5wj3jr2lm1nto2r0jscie22ahnrug9d4xl7mu5x0xhmrnbybkgw1qfk6lnh68s82ga8l4k6fee',
                receiverComponent: 'iz90fs16v99ahcn1eujmpxl12sftusck4e98stddzf03au32goua9c4q0g838hbf4y84zvxdkuztq4vv16raohmd6y191she9ot4ytwfmcmbp4vxs8ekogwgsvm24xqwj5ok9pua8qzf35a1nng9sqkh3m5dfz4t',
                receiverInterface: 'vdwscay17uf7zkzeoebqgehdq68rd2o05lo0nzc11ohqipxscu5pt9po5mq92o9eska5x15bgaxo6nmbv3s9mhxdc26jk1ijirzlidd50hfd2hmz0hi2h0q8qukzgwfp28ymbbd0jy0567aciivkwawo6triggkv',
                receiverInterfaceNamespace: 'gsqw4g8a6emsp0dy27hmcve2km051ro07enqxqnmawasnt69nmrwpu53ppsf4che4ehv818upeq9no1azn6gqda4up4rea254aq73eljjwp9rgaph9lshy1tusgowrtbna6yub2za7r55lpq0gu5wez3odhesdxs',
                retries: 9434668141,
                size: 6345262002,
                timesFailed: 7395169236,
                numberMax: 8208974111,
                numberDays: 5080909187,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'brzbt2wn0d14cstzplr7ctwvk2n21idc94alkqpevgcut3e474',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'dh12j9w541fsrneo937k',
                scenario: 'niouv54h1n8molremqm06c2z580m5mtgfuq5nxkk69hlvxt663e0motjzd0q',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 18:45:52',
                executionMonitoringStartAt: '2020-11-04 01:58:19',
                executionMonitoringEndAt: '2020-11-04 04:21:47',
                flowHash: '5t2a0so7dnhhpez7znfvw9bw0y0tn3zy0dn3aig2',
                flowParty: 'htlz0sqzv5nh0y7jtbjfpc5lycox9j2g7xc9u5znaugfizlh76yskhsccldnu5djhr0hnvcp9yalrljmilm643tgmngka731fo2vkthrfok66xnab8cpshwdat73cvjtdf8f8tig9qncq9khggkh3xcrqtx9miv3',
                flowReceiverParty: 's38m7cxc4heztl3v1o2r9gbex0suefi4h9yl4hvmwa8wti7zvdjb02pyspolalrj6lmglrtp6eh0s9wxn7akn93cao0jpkgkuhz11j5dh6ld699wrqq63fjas11x76dtl7fxdle78i8uzv2jafb0cqyjpub4z1zs',
                flowComponent: 'c8ra9w4w8tdag63hiy27o8pod9hs3qsdhl4kyhtuhttpisyo50jkubwthqdcy76n9n5bn73p3aexex5a4et2igp6hrd78zikxhrgf5e84zul0fsxnni49pzdebn6axkjfbia7mleohk62utluro6ai0rluw9hazi',
                flowReceiverComponent: 'j7xy94ev9t9bqxhalgl77sxypni67at7mheecklitwhhr73tawzfzlfcij84wd4hivgfj3xzrdtaommtwpepl8b24yhcrpwty74uluh2v5txekoxgc4ag355hu9dpr0pplxp5xcjtrs14fme33m9n61y9nzmwslf',
                flowInterfaceName: '17spnvdsasp2v4fsa9f9u9t1aovx8t5zpmj9m230frcmzuq17xirdjolp1bjctqvkmr7rqj1duucxtxazi30w54kq15g0r8lcjb3qym0ca0hq73ermvqlumr0i6ipevma2642xvf1ifi8t9ynkziqpgz1pje12bc',
                flowInterfaceNamespace: 'a97jju2yioz5mtm5i9ky873rsqw9g412mkwqaqfdh3c4x6wjqia559w4r55i9cp4rtp3ij5494fdwucjwvd2pwqzzhdev8948l9jft4lucui2gap9c1gitapa1e91yodq1ruqlhdzf1sfxstcon6rzwhv7nobwru',
                status: 'CANCELLED',
                refMessageId: 'exktcbfqvh2pzizf0j58vjm32l6yavd0vtzmg1gp7jla9ih1vaz4t67bgug230s4pds8o0ti9jdk2hbnnmmu7am2pqdxhpic31ppbz985jdlukba4szc3a38qqyv6hf3i66kqk44vh6nyi96f2id8fuggk7lkqxt',
                detail: 'Fugit unde incidunt cumque. Voluptatem in nihil unde esse odit minima eos. Delectus consequatur ut dolores assumenda non accusamus et quis.',
                example: 'dyi9t4ny5jsh86ftbaxcjo2guss3lwtn8hcgu12bwwnanmqmyblsdjfcdjvtbivnt7y64sawoyiwygftmbwzlcwzb2ilp9kpz9zmgt75mnjhary96qmnukdx3nuagxuldpqjly4o4v1hse1ohbals1wd6rglmrgp',
                startTimeAt: '2020-11-04 05:58:26',
                direction: 'INBOUND',
                errorCategory: 'o9s422t2ot2lop548kgf8ybxfbhg0nood8hvsi567xb4rygfya3w8kha2hrk3krgkizpevw2nzpwpo4rs8pdw4p7hjiqdne13wot0umzmp45qrekm2zneuzaps0l0c3wn17jwc2ffjxar93pgdf670ftn60g59web',
                errorCode: 'l1edxzru1jh8cnp4yx3x8t94mobwqblxsdvdhhj69ng166ysw6',
                errorLabel: 982972,
                node: 8850111814,
                protocol: '34sto1hx3gqx49k54v6p',
                qualityOfService: 'iypchy9iubf3jk631hbt',
                receiverParty: 'er1bus7ik4ob1wilqelz0fovapdyl4omw9ezjujwapopzvlbih5r03f24kh92lwx3dw6ehe09tkcdjckafgnn9vvx45cgwpv150m5pvc40ndbc0mh6esojn3081lf9n42rt0od5p0nvgk41qfkz1f9mc6wleqkn3',
                receiverComponent: 'ecgs08j0x1szrlh7mr3rltvpu4doqvw38mdxcpi1j1e553ds82ox6r2xot7yi0wiqq4vdcd6mpn30v9kvf2ozr8p6yekuo2bo2yzet7r87vvdrbvp82tz3uwow8p768ie45g8fqsyrcs4vu73ne8190h44qnsafc',
                receiverInterface: 'zqbzknb2may44w2klez0vof93x3kotdu34peh9dmkjoyjmnorgrhwc1o6uwbedkundl8957wf87dfaoew8ip21g9bz0l1x6ry0le9gyozi6qwiktyzsriggkbwr0mtinnhlshd275srgqoiqenmdz74l7agj5plq',
                receiverInterfaceNamespace: '8oxf7ibzmg0hvo2yxm6b2c1cvieyfekbcyjpfsjlhwnlrj8r4rxsadurzuepxornzfg2dye4zmed91rzti7pak0cured92ix63ti30lwe9ozupybqcg6cq3guarxdnyh464dpgfncxc2w2f0vra9hi4z1f5t8b1b',
                retries: 3294893092,
                size: 3722515992,
                timesFailed: 5431662084,
                numberMax: 5372782085,
                numberDays: 1366389785,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'kbbrbsl9ob9ne1vuoyz2ytpq2jasx2doh8jd21yfu6gbrncqsq',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'xukq0mkusy4u169por2g',
                scenario: 'r8s93kvk4n8stfo941lzrc09p1u2gqmk6bsdcguzi8tsql3d5c6hvmjr0jnw',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 20:10:02',
                executionMonitoringStartAt: '2020-11-04 05:42:40',
                executionMonitoringEndAt: '2020-11-03 17:42:43',
                flowHash: 'q1tjigjer2gb532ki8zs95bkzxxw40h2k2bzu4hx',
                flowParty: 'ec8q3uvedx161t0ms3h5cxqss3py6ljz3n6ud99q0wfyrrdjsrto0ccj8cjh4edz4q3n47ilvt1a1mb3o82ub17khsldjmm4dau65wg1p0m5utr5rgvc1phpcr4i66rfo5qgo6uyj2jbogv640uxg4hq2tjf5fhu',
                flowReceiverParty: 'qv073ovfrzlo3psksvrgc8p61nid1rkdjjgimbc74pa0ac8za8rohtxpov6pzzgxzfmjupit91rire8fg95y6v1kavqx6armkkze61wwi7fz2mbhcx6d0oliydsr528hnsbh6mkt0hbj52zu4g593ddup1zfm0ss',
                flowComponent: 'n4e2jdmn35e20h9e6wb75gmnqx4yjqp2ibuomxjzzafsx2ma92zo48efual0dxdgjahecisl02bhla4d8jtpggtsoxwl7c36pho4hxw51tzfr5bkhouz6y43rag8yt28mmss96rly71l1ui6t7f1kqifu4tfipte',
                flowReceiverComponent: 'vikkksps3q2jlgxwre16yarx13l0la2v8vangcauf6dg8op2lo50mzabatk5izei3ppd4vo1tacu57dwgjtqf3g87zorgjsuiukikwkgsy2lemojf0lykr6njh7foho2339sf2bwsmcmbd7du2wcq34tuik9embc',
                flowInterfaceName: 'gbumzaegwgksyvspge8fr284tadnlno5685l8wg692jdhnngy094xx8dlf3fa1lyrymoomg7nza6dbptf6atvhm82xhil1fjmzbswhn37bz0z0n0f66or13hvx97it3jtclzia38ztzsskp3uud0duzuo5iednof',
                flowInterfaceNamespace: '6dlnyj5lgw0pawavy894gb5btjov6svob02zw8jyx7sbqvrmarq93z1beubbiiqgwvrh8f7ewqr5lzr2fpfgpy31k465srgwkohvv6t02zlo4pdd38dsshpjblu823smubakhaqnfail79q0i3wowse5o7h57ps0',
                status: 'ERROR',
                refMessageId: 'dxjdsemgphvrqwnxrsxn9mcey3deanmre3a4bgpa7c8fnmt5fo46h3e2fgdw1ba2kt32ixtjgi1ccswdjgmu2a1jjls9vaco8ieomsd0njn809rfw20rur27ax6cguhi9ad20zcbhg4be6pq24yj0ugeakjo05i3',
                detail: 'Voluptatem id pariatur aut est explicabo consequatur ut quibusdam adipisci. Ab ut numquam accusamus sit id omnis minima possimus. Libero voluptatem sit dolore maxime architecto velit. Omnis omnis provident qui laborum nostrum ut deleniti quia incidunt. Iste delectus molestiae rem. Est fugit iusto assumenda ex quaerat quis cupiditate.',
                example: 'lmfhh4oexe5fvefiuizti9zstdjjn38qrwzd6z8meihr0qiguq0kjsdzodimjuz77pb9br84ierzidal92pajyw9rkwltce3vb33e2sgsa7waavmevgvnew8q7mqwcxpfbtpe0b03o5mkzisfd7yanyqtxnunbyt',
                startTimeAt: '2020-11-04 06:38:24',
                direction: 'OUTBOUND',
                errorCategory: 'aaoantiz1ggahul5ckzn0d2rtoxp58gc535iv0qlnc7pmvzlbx5f963ce2bv6wqwh7z0atrslpc5erph165grl0xoz0xuf3eb1gha7ay1iw45ldchhx95b3qvmlv8nwodop34gzz257kwvvbv4sk921tzj3ptmuu',
                errorCode: 'eer0b1h0ch682en3e8syuiw24m9ahv7qqqqoxdnvx2ccx1pmojq',
                errorLabel: 713155,
                node: 8249877549,
                protocol: 'wazsiowsbhk2f6j145eq',
                qualityOfService: '8oq3h3ndvvhzdk1v5yrl',
                receiverParty: 'wallfod2i1m470tt2us4p71s1kxxzf76gv5bq0zkqso8nstic5wxx1lm4hznxv2on5e47hqm8my289uut15ndbka1jmsbscni305g06rw7x3c5zdwms947al2e5awa0vbnxr9n67lg8wwgru8ht7pled60qvyldf',
                receiverComponent: 'rsq7z02070m0qfv5vyulc8yk0d5uo2ptt71xklibjhx7597cu73cowuyokhfx9se4qfdipy21e4nlht8a3dtafd8er0ohzjqtvk8vhgn0pw1wdw9497z45hm3ejbdbvea5fswps1bfdh8zwlbz9rprzwn15bx3ux',
                receiverInterface: '29c587lro4hkt3p8zhoj7faituchp62cfqgha19f1k269lvnwe26dafr92avlq4v6g17dxo7c5zel166bpy53hjhf1izrr5q9y3bnt31rxe4n2zw191c6iq4f83ffb6atu58aq5duwwfinjmmiplvhd1snzaejut',
                receiverInterfaceNamespace: 'd7dflvg9lwoj52628ktps3aw2jyeqr9c984o540amfo1ecs1kd1yww2e9ctp56bzaxe3mn0e1zuqa0aq7a566bkfxqrp4457dm5r9fy8460p2weu1w5l7i3s987uf1p3e33iloccpd9io5fmv3ejbtuu1pmxhtpd',
                retries: 2503473952,
                size: 3067998028,
                timesFailed: 4040464457,
                numberMax: 9576152634,
                numberDays: 7405166708,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '307zkvr7f31owwy8kp1mk8zhs5yqbmmcybcr2qzpn1cgt4ml33',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'xoqb4hhrxnzwsiqq1j9x',
                scenario: 'tnbvcptangz59v7l02pa64zmhdjy6474igyz0v3rrp0mgq9y2bkg7rubuz3n',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:40:26',
                executionMonitoringStartAt: '2020-11-04 04:01:53',
                executionMonitoringEndAt: '2020-11-04 07:59:16',
                flowHash: 'na9d7d37acic51ny3d2eurswh9qme5xo5ijs2zb1',
                flowParty: 'ib1kzgarx5erbsonrgmm6m1bco531aml9mdur2alipk5hg8o89btfex1t1ask9nuvn8322prqricvlqecnlhlw44pwgvyasmywxsz0rgiozrv5u4lms47b671lhfiaptjyd3j7sszh700ztpbkbh0e5s23qln95y',
                flowReceiverParty: 'rbwlo36bsdvb227yrhhaelj1jp6p406lvz8zhp2n4aok0n7g0bcu2awmhdifjlt32p03bbcvc8wrvcoqm0m0y40p1uuiceegosqq5mctua903kusqqsr5qrinm8qsg88fkgofuernp3ea9jz9utobpy8v6187s5f',
                flowComponent: '6cjpfsxcnknkdwfi2gzayuf9mw3i23r7ex9vtzv4ivhgkqm232ry9aud1fog0aqi5h41c3wspvmp67mu1arka5sfhthczxsq41olla7rm53wf1cky4w3kissl1jlz32serpv3ncta7amyycc1312aa86mjtmjrc6',
                flowReceiverComponent: 't9id407h2ff9y7pwfl5pkuizanha7n8raazznvzz26n866yytlau0irhqgwwnly6eu35r5gsjyp3490y4itifh1zs2ukxu21l0sdcn9t6dttt73akyzqw31k9x1d8raufo3108tvsv6dqh9ey6t8hq7omv2fexu3',
                flowInterfaceName: 'famk549hdrhb8w3n6fugo5h06cyuteenowvmr30f51q8go1ojdf2vtoxtrbjpf7pgahhyr3nj6rqwhqrrl4hsccxvv9fy86pmke4l4riprmed14q6mccm3b9mmtmm8447cob7ajt6v9yzvlf8xs0gvn054ble59h',
                flowInterfaceNamespace: '3d48nygq6r0fnvb80spa67ifwcwfkhq3olm2twn0d39p9hvxp13c2rmgkj8xuui8lw0ucn6pb2bfh21ldic5lsvl1lvbuzt4p4todg4eg42pqimd5un4lq24n94ivad1z3mg8iiyr21t6ap52k8le1xuhlmccy9u',
                status: 'WAITING',
                refMessageId: 'ah87bcre9ah2llrqn7rn6nh4hyicqvjbxmdsgrw8w253y4f9cynu1a2x83vksq7lkgb8r9wmtdbmicj5w93c39u3frnpda79vbjifacvey8r51i4bvb67umza74iile4c4r1ky2q8e7yzgrvobln4ezke6vyjeqy',
                detail: 'Voluptatem deserunt totam sequi. Unde ut doloribus possimus et labore corrupti. Sit nobis unde aspernatur reprehenderit aut optio dolorum. Enim maiores nesciunt rem eos eius autem expedita. Quidem eius rem. Maxime et eum mollitia quos non sint quia.',
                example: '7wl3v4somemc19kl1czdmxdhb0s4t9m8t7zf5eud087zv8xxcvt0hcfjbyl7wpyf593yxsv5cvy0euxnhnc4lghjxnisqpwpwst8znziabuwafa0p3fa10cpkz0p9dzu7r9odleqe63e5d3561stew2gy9fflujn',
                startTimeAt: '2020-11-04 09:11:33',
                direction: 'INBOUND',
                errorCategory: 'dxcw3nd4jwi7bhg19qvv8ug49ca72ban0kog0ibl89ej8fz4hzi2iluhhhijjb2rsxcuiheiuhftq79j5blgke5f2myavmm8qy2nk3kivkobv3zjns9chsvdvpafeidkdp7m7g7zpiu72wtoszoo6gwejrzrj2lu',
                errorCode: 'nf2zj0in9upv65a7wo2pv64tgraj6zg1b94lypqajmpaxx55qc',
                errorLabel: 5733716,
                node: 2501307388,
                protocol: 'dvergupb46j3dw8oee94',
                qualityOfService: 'sthvcp88to68kb0e893r',
                receiverParty: '3st0a0kr19q5wr8mu8omi2fbocwcji6risqcpph9w4lcyknwj69acfk216iy9rnra1bkco3b8pr1a821xc4tlugtqqba3i06sk1r8grysbjksjpcfx5udmq9ee34gno103ez2q1xqtk3avoh2zevvgyhww6yusv8',
                receiverComponent: 'qqs34j2t20axpn3q59l9xqw0ylri2bpzcmkesstqvn6l8dedr2cxmhcug3hadyv4vnfrn504ufho769w62po96i6f19n1jhuzskmejo90zymdvko48sqp2a50zmkp84fpx9k5kqhapdc45pgi508s634n7hl07vi',
                receiverInterface: 'seuf78wt4z1tufimtguzf2aa2bxs9gzavw6hu1649wycbrn13k3o7e0rlf0zpjek2fuhp6kqetrgc58wj1mj7l2kynmr5rzsg3zb7k2rruhe7bml4ba9wfzgr5e8ziox491fln6ebdr95jtoj5bwtvv2yace2jas',
                receiverInterfaceNamespace: 'rid1pdr36xn3hhfp466cyhm50zfkpfxe1tzzeskk6kzbkqbz4ymywuexbkkiwh1axzwixyi4wedrij02fn1nhv27ksb3m0150uywba2fxg1rkm02p1e3zunaluwkloj6lmv5hc16hhxtnhyg46765gvw8jykg0wa',
                retries: 1408725368,
                size: 6700723601,
                timesFailed: 8595187067,
                numberMax: 4507427204,
                numberDays: 5133811742,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'qjktububhflvd7evxa5n5z8uujavfdebi86hoox87795406ccl',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'k153shyb8tns99hh198n',
                scenario: 'o3mg6b7a8oo6as6qsa4qenypp2a8r2mvy84ry4v9c5ezrn5swmoip3a3jvod',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 18:18:42',
                executionMonitoringStartAt: '2020-11-04 09:20:54',
                executionMonitoringEndAt: '2020-11-04 08:04:54',
                flowHash: 'fnvn7e7jt66j3cmbg51jagmj830qnn18nqxekzif',
                flowParty: 'rjcmcngx9kg6rn80nuaehf32hzuauo50zrlbg7bwng85p54tffnl3nta14fl2k87nmuc0wxvzb8xkyvrbhoug7fjgiw4wjwfkpj5xpo95z3498h0f26h0ztn0f2g5fo945aum6xbebyitokuqr3pnk7po1s24u5z',
                flowReceiverParty: 'fdaob8tp01r5cq2deoxjpzmzi7zdjylnwmd1yrtvblq1jkz3rxvxikk3bqafv0eh3jqv4up10ejbbxtydee0l21s3dr6mp3jg74bm42csk4t3e5ux9cih1xhdznin68qp8nl7547pd7wr5215nqud2e1ishyvn4a',
                flowComponent: '8o05zgyqcjh25zvbegcxzqhbtwpenyn82b24c1ik62be9tcapop1ysq730ko3qdxjs20t7sqfm035ukuvhsg36sd839uhxhs54i03fcp4r6zftvpbnrvsb65ng937shufxkg1bqqv58013hkr2y8771c15qchp3g',
                flowReceiverComponent: 'nof1xcciqrsxvuy32rk18iph5opkpokdnq4gsena92xowijrlcyu203djjfasr7wf8hepn55a20h14o7g9myykrl15btpv2349h147z1373nemyvchnfimytbs1aho0jlwnpgc0it89w4v0zbtfoki94ov8zsky1',
                flowInterfaceName: 'ucm9rd2hr57ouj45wkedd560xb3ih4mmqo7dxf8inwyeyi98423bo3tio74h1qrc7bdcou42xcbdjaoyf3nx6j6sw4lhgimk77pit7dywcnonahew2zd44eut4vk36i7ny6ve6x4p1ahlbpb6slreu420wkf42qo',
                flowInterfaceNamespace: 'zjoe77tgdh75vy0toldktuvczz9t5wysbzhk2b3el5iphflk5olz6eqp2o9gxv2q1hia01jf2f4x2bk5g2w3z96wiqzrmu36v1p5lz3ntm3f7rxksla8kzbo2on4d8msv7d1k3wj3f7n82mb0gz0dfnhq07qg614',
                status: 'DELIVERING',
                refMessageId: 'nzfi8zlij3l79zfboxiqkv2jwwdabg3yvvyp12q5ydf7hz8lkyuxff33bz7zp8u5zwuvwn501woybjpg3eqm91oyhoc2w5thpt2rjl7qc341719j9qy92r8dtwvo3fa1mxfv126ha78e3ajizllqwzxx7i2vwvly',
                detail: 'Qui eos similique eveniet ipsam. Sit quia perspiciatis qui vel impedit temporibus aut. Doloremque mollitia et. Soluta exercitationem impedit quisquam dolores pariatur aut qui. Officia officiis magni eos quaerat officiis fuga at.',
                example: 'z8d1xbpallhki3696a5hd4hrqcz87gjk0d2dzc27phcwlwjh015iub4ha61gaig5z6g7b2sep5lnyp17mh97g3i93u6lwqu1cnt87113uawo1cv19c8ihp7h41jwq36cupv16spf4ftzxr3m6i0421te3fbtv3ds',
                startTimeAt: '2020-11-04 12:16:02',
                direction: 'INBOUND',
                errorCategory: 'aiv0k8dd8yvmybki076r2a5s50urukzz2ajmzy0vpd1w2uo7vmmf3h1aswoen4r3rlwuxn1uy1qoxmv4240t37uro9yi1f1s4bftko7sk03ph6cpfsvqrhhwhzy9ssbbj8n1an6eqsiwcl1t0cjw8zhdzzjca8b4',
                errorCode: 'yupo1152zdt1gs872c5ggm2q7td10zgfh4oqxf7v2wvandakb2',
                errorLabel: 918910,
                node: 32876737564,
                protocol: 'ao94bgotpd36z8yg6qbu',
                qualityOfService: 'nnbjn33lfb632kso1cp1',
                receiverParty: '4scbelzt7bgj1czyce2fq83p5lddgqu6bqtm3bz0ckuodjbsydpcx2j3tbafykih362fd942a2su38tm1tc7u0nlmhb1osa6y6z37ynng5ipte5r7s5ftf4ggvb78jzl3gsw864zpxh887wf1ivavu50f2uux5o1',
                receiverComponent: 'kccws75nbvthkl4v4ag35iel06w727kvdgd0solckvk78l51kzq082kwcanlpbibsj4kuphddz1c5nvsc4urgk71pxz9yd8z6c2ee3bbek8zvc408yc0od0hjag4r4qp1ihg23bktbozwl1bl11ot6cop020wtec',
                receiverInterface: 'qjibfsxgterydni4ca2nmqtaiqy8ot6gjtnk91695vvkeahd3fad626y87dw5w60kz65qu4chjsom27lr7ycrcbpdauprdso4xi3gse0qwxezedir4gubpc45bcn8t5xaf6azbsxt2v4zuhmm5kz6w6a0r4nn5ov',
                receiverInterfaceNamespace: '7g6xgcp5vnh6il2w33la7hhwkyqtizcix2kuky2y3w9a24gjf6z38dwp7zazpgw8aazwvy9y95qwy2x3p9h1zcmj704sh33j6g13akq80nym7ygk7scls5dka92e6wynuqunzagv0j74ziw3y1j1lykio7nkb85n',
                retries: 5511455352,
                size: 5665209348,
                timesFailed: 2909270618,
                numberMax: 7854413502,
                numberDays: 6234552310,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'fn1nbw2razaiz155hziyihypku851qw79ewe74tu6v74sj5l9s',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'adptc5medhsvje7n0roy',
                scenario: '234fy3t839yyyxaqazc21dsydlvxez5vz7xjmv8asv6rzkubts38a2uxy2sj',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:23:18',
                executionMonitoringStartAt: '2020-11-04 08:30:56',
                executionMonitoringEndAt: '2020-11-04 07:13:09',
                flowHash: 'qs8268rb1h4j9wh93uvl7tfmljkwrl8bkz7zqnwr',
                flowParty: 'fu1dwpb3o60uq5uzy0zjopdfb10v1x7gn222h3b25zpi764cab27p26ol3gn1qvj20qa8hqer7fosuk1l1y9kmz1al6v5hobewixxbw9o1lfj6cyy5b5hnmh8im87fb2obam7je1e1d65eyhnlhukmtigefhg1k2',
                flowReceiverParty: 'zbvfefl3eezbdywujc1g77da8p77o7ndufzwkrc9ti39nkisyw9y4p0wr89js12evvzuu9eidr9rcb71xuuey8bdcfdloetk6oy2h5r6j27mmwg2t0iriuzj3i1kbkelc0dwt5ld09i1qm56veudp8lg647cek81',
                flowComponent: '7pbhgt8o896s08ckigvddsporyt1w9t6syne72al9v2qk1947am6nq5n47tqlripsmaaml79loh1kum2cae5cgf9jlnv4ylgsn76jzf7kmlizw1g9amyz67dsd9akb1dhhizhdk22l9ypj10imy1kur91wx57dpz',
                flowReceiverComponent: 'mr7hd2hmaji9hitoy1n4lgtfowtdwxa6xxemoxw3j31ln1p34r0fnvlisa9elxjac8u78u875f750s5zf1mfaqltkrjdcxwluoi7xbv4s56kdqeehqtmkwiz63rpd4gd5s0y07l53bo92d5dsqq6fx9yb7c8j55y',
                flowInterfaceName: '8p1h1sax0okpcw0nbgc13a9rx6kb7bztugjdmdt9h1uahnsijar5hskck0id3duvtr3bjacsbo7vlrosv9xgdbjbdbpaz6s79dr283kdok6f5qvn0gul78lmdq31sntvr1pya64rrmfjb944m7zlhenr96a6lj13',
                flowInterfaceNamespace: 'z6lzazycusv8a5ekbfdatni81kjcu3es923jsz906r25abqy9h06tsyt7fcd20vsee6vfbvym8vbgg32lu0j7h6lkcigfl4uqmby62qywok0xd20ir3auvqou6jdyxe2ylro08h09n2405v8eee5terqj32gtbqc',
                status: 'SUCCESS',
                refMessageId: 'lgpx9sz83l6cenpjzb94ksczb8d3rb0m8fn89syz827aa2ij8dg4yik4zuvujxltrobdum1tyzsowycf9dzbvs6ytwbud94rxne96ecz8fctw16axu8g4ll5sgq50qrou4em40sztq9wmsdtyn0hflrmpef7843x',
                detail: 'Ea dolor qui consequatur optio ea autem laudantium inventore. Id quis quis accusamus accusamus vel nihil in et eum. Nisi fugiat molestias porro nam molestiae sed. Vel libero eos expedita error.',
                example: 'qgny2gw4rs8e177gtmuimwxfg6k6pgkcsjcrdhuss69hq55e8spi19k6knba9qd3v6lzfkrs0uskc9di1meuj6prn7q2ylro3h77hevq03j3zgtjln20rnso5wvtd4gbpfs2togli8fta9myhww9agqwybbk61x0',
                startTimeAt: '2020-11-04 14:24:01',
                direction: 'OUTBOUND',
                errorCategory: '7kgm9gug2hvkxqfsaymfbnyou61lnjno8q4inyi3polh25z1xe5bmtsikpca9yujfr4u50xpkmzm57kb8g3eyuuxk33op07e1g17mqrikq8dqginb3ryevkx7ugfi3200i2zk5h9mekb3u2kdmrqucor87cxqmmg',
                errorCode: '071h8fvyu41lkd6x6vga8nfubis46mqetm09ik8nhf8pyitw8e',
                errorLabel: 748613,
                node: 4091250691,
                protocol: 'x1pkdi0yivs20xq03c7o6',
                qualityOfService: '5x8xg1e2sdc7ujj1156n',
                receiverParty: 'ohxdr2ib1c617j795f1lnx2p4f2141uxxrqa5wrzh8pu96isvuyun9atpdwkq6gojc0dhxlbdej0emhnxjpcvg8zc9885y6xy1nf2nrkbrpvnhxhak81xcrzf3crcvqemdexx1aka1skorbsjtidq6teohi7yfcr',
                receiverComponent: '0e223z4su8cqylazo7tfl451ec75ea59dt8xyv2o56m0528wr52jchqw2gamsm98basnqgcu7es1xpqn8a1sh40ltxh4rsgq9y10au65gkpacruameei9m5zp5y2letuu431utfyx9mcqb6gu1v3u4hc07tq933s',
                receiverInterface: 'th0x8cgzrkb1zxq4cmjnsbzfmg5ecdjbq0on5mqg8s0dw77q4tafuc1bh1skhnyhg86hq7xws7d5yalwsw7w9tjoc3ltdc219n290myz3i4isc14aynz57q6qcu2yn6cpjq87a4q1gr5gbjc7pkw879gzyxrk4ig',
                receiverInterfaceNamespace: 'yns23zzt2w3p40wey92qwy9ounubvmw7wtxajvf10hz9p302g66k8qiezs606dgckzmdghzlw7a94c8zhtjxs49pddgl9oyxjatv8lte7wqommpam1g2v0aw2w0uvzt9uoua2hsqf2ktw0o4y87kas4vhierov7b',
                retries: 1117476382,
                size: 5492200318,
                timesFailed: 9679552777,
                numberMax: 1660381970,
                numberDays: 7425508846,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'tdv2kjfhf4gzkgzoa2kxlpgd0p1suc934c1kk2lfhtxqht6dfx',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'rtqw7by7bk3hsuzahq9x',
                scenario: 'wuvynxyl9ldxfp0pc1xmvw7p3xq3cga6nd5nf90yccdav1frosgh1fb52403',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:18:28',
                executionMonitoringStartAt: '2020-11-04 09:40:23',
                executionMonitoringEndAt: '2020-11-04 15:19:36',
                flowHash: 'b0jv9rjn1503r1xdytsheo187v51mf5xoha54n81',
                flowParty: 'cj5heac41u00tu9tejc9b7oruekycjub9gh19kvmt4oslk8tkw42d9ime4dpci9zrzn7irl9b2v4s2gdhwskjynqfvv6grdhg2s9xw31m32qg6zlmm8inxn0wpzvw1hbmqdxmj35re3z7b7xkbsk2jdw89gyeoyw',
                flowReceiverParty: 'fisp75l0ck2sunvkh6k74hyvviv4d2w4oxvl42ro2irocwhh03aatim2parg96q68qxc6ftasrn7kalp0k8q5y2c1016xrq6iszijg22avvavqnwgflhb2ld9cgpfj9h121r5yt4caoolyxc9zz2e5h0nm61iv6t',
                flowComponent: 'qnthvhtd9wdg7s6gpp2ak17igora2qk8kxa7km2cp2dfrbig6szmdxq0txi5k4gl44yqk58d3ullv377yjnvf814e7movzspwz88914ekryuj0m29p8iwua2v1ysm02drszf0iopcten5u93iagmohksr41fsz4k',
                flowReceiverComponent: 'yzdfz304e4rnwvxldx73t1bq2zhm1zpvclntax8avfr4ouu90f3zywrziznl4n4eaod3bo95thqdf0z9vytqyctcoipvyrflnosa9fd30xeixt1hqzuu0lgoqxjcfp2pi6epjvd1p3w8ac80bjna7x4k0ibplkxw',
                flowInterfaceName: '4nkko2oql1n195wqp1hns6dow89vxkm2fimy9y2u6gvvuqswbgkouz9arde000jswjirfpqgwmke3nj3skckk0w5fuk60ctn0u8u34dtn0gvo9u1442tase50dxg7eww0o7te07mudz8s7q0y5liz60yl3ilp6gs',
                flowInterfaceNamespace: '6ic12n863mq53pexhv335suw05mykxtrc22c1fyld24xjmrb95bh7vsy3rdrbqu9c3jinpzgvhblsmqug064wstxxvkcd1ls01v3gksupt2o33a26ji0y1stszo1hnoani94atj5830xqufcs57t6kzii3unkq64',
                status: 'HOLDING',
                refMessageId: '2jzpuhx4t2em1yisy4oqsuhyzcnyp69jjicvx46ipqlfysztajjryr9jh44ae8o0m3tm0fagn7mqu4qomny4kz6d6dp9iyw3jjzmf6tpeaxj0melig4tuxh0j85idalxl9kf2z64aj4tf3i234v3vdnnv69jxjn2',
                detail: 'Cupiditate est velit quaerat dolorum. Aut quia enim magni. Asperiores assumenda aspernatur vero explicabo veritatis laborum ea neque placeat. Ipsa beatae nihil.',
                example: 'fe8tyidsk7v5g3u5c75c8czlzp67lta442qamq96abltrd4038igt0zoneg3audysyrlcxqrpywi60fy1dfs5zoe5uy10r1fth0kvjz6yji7q4483r18u3fc3cj11k17ucxhjzw4r00rkxaifokskkzx4ffxhxyg',
                startTimeAt: '2020-11-04 06:46:25',
                direction: 'OUTBOUND',
                errorCategory: 'ivus9xnx7o4wj7momgd5cpek9pcka2z6gipupze1cxiguvrh44q18ttc6vwnoex2skrbydqa8t48hqcaqlkgisw8xj2iqecevzrq61wl7s3jiqgjp3t0i49wwkoqck4kpxa8a9m1xtbuhsjoyz994ybjll94wihf',
                errorCode: 'rlnnilnajx6un4a3vaolv0offrh069fvm7veqmbggt5kc56m7h',
                errorLabel: 631229,
                node: 4755389976,
                protocol: 'dhlul0p5dkof1kt010ac',
                qualityOfService: 'i8l7hlzfz0hs5p676hokd',
                receiverParty: 'op5t9tivrcdyhlzwik8a9vui3q33um665vwikneyif2wqm4fkpv9krazxqf7o3z8ctglu3ckzu66z9pq9p4cxnr3h8u0qaid2retvdurem4r0o1z9h0oyt9a0ayzsmjnvxk2xt3743iddja0nakbnk9jymgwcve9',
                receiverComponent: '94aehoi2mea36nem6jche293z34r4mob91op3t0wtiriaue7dt8e2nae37nnqzqno2d46zvh7bcsm7vmlx3scyfpmyvuc5cjmenasjtum95w19qxj62e7znq0sh3pk0hbv3ecp456nu6ldvebaivm5f4b2zs6pms',
                receiverInterface: 'n8ok1guottpg75biastlgj7hmxoilnobooq3b3kdjxf7155y4qloj4fagvt4dolntuywha9phuudicz05cl0qsqygfaaeu8na62sc9wvsn578dls7rikftqivc7s5iiv7bs2erv0aal588inr8xohefbrj3s4ohz',
                receiverInterfaceNamespace: 'j1hf6zl7zrs9zu9f0taosj845tdd6m5y9idf3i4alklb1mjlsu5bqu66g81kajli0cu4sidwxovornxsnvta6ei0vlbcscimp58mhcu5gl7otj7gjf4j4gocehv90kgc3k9q14yye47u81ko9bp3s7n6brjepe4j',
                retries: 7166146744,
                size: 3467952564,
                timesFailed: 2242126477,
                numberMax: 5774150606,
                numberDays: 3724774503,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'knxlevvfvur79zr8f0irxu83ntxq8b0b3n4tfinms5x60e9acs',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'f54oepl8ipwbp9bm9mrb',
                scenario: 'rbglsebetg1qcpl0uwoydr87fahr6lgoyu0svuwx6l9gln11094o6o81vpc3',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:52:47',
                executionMonitoringStartAt: '2020-11-03 18:58:53',
                executionMonitoringEndAt: '2020-11-03 17:50:32',
                flowHash: '3sd0mvfcrmcmpc76ufq2d0ip77zzr2xv1en0xupu',
                flowParty: 'cbg7qznh9h3ss1e1oj81ddgpodli0hlp45jq127oxfr4w1agtynz0m6govfgs7euhkztk850sr0mun1uv2j1qygnjrqe89p1xv7cxywufir6lnlkz9ri2evk40rt6d4v793o5ziedn9n857fh1u80om2co3wn4m9',
                flowReceiverParty: '7btulkjkvzj55ynpnjcvbfdocug9lc94wrfp26jvo4h9f3n5wtxr1jt17ah83hg2te2e05pejb3rs8sej6sugvlv1u9m2zcbbc7uotsvxrvx4le0wjw67ikhqrcb4o0xdbo42d8b10a14kohcsq8hzhgpvxnob4x',
                flowComponent: 'etshyuqt7ue6oe4ask4jxh5hg9d7jrw5t6ztr2exgie9fv366lqzww5vaa5539l881r00sv98adnmj2wn538vzw8vnj889vigpw48sqiuf0gwo7jsl79gix5rtj8wkoqivtaean1xxndan7i3n03m979ncyou5fd',
                flowReceiverComponent: '8q1xpochrtbv4ujwici7jiqlflgagi98rrf3ofqdpj1e67580nmf8j3k4ddlw54ymbsb1barqkx78koz74r5zqk32weatawpuggezxkeyo0tsul2nvcmvjy0ny4iec2xqpbup2yggw43kp7519xk7hp14iy07z3n',
                flowInterfaceName: 'thxcp478hhtrqbmjh2aoe04ziyck0pqu7q12xxgg7azri55f9s3q56xv3su07ph5v90vpc0ayxjrsppg98ltptdgzsmixws9dsrsb4t3pxi3ac3orkqcbmx4s7z1kv9ma9rtuh49bb7dgkjfvm1hxferwugzw40q',
                flowInterfaceNamespace: 'ln0nj9voxpjhy5jgds4n9c40ydsthurzci6ckj7u75os15zhk2ujekrcovfkp7fpg16ionrz8ir71myfkqkx65jz149idwvrf31hv5gkotyxf8wdkjyms1i7y80qd6wztpnjv76l387a34slk3zd9xrtsmvy8944',
                status: 'HOLDING',
                refMessageId: '29haxi9gb5hfspsmtkqa587lpc6v10yyz9h8u5u7fgkun1ur3z1u3gqebrwo2t9q1hsry3nln1r909u1hgggpjs3crinrmtil999gvnkjeftpnjj8tw4kepmiqx9yk3769lrlll2sshhnwjanmy7y5u5mj9ei95n',
                detail: 'Alias consequatur molestiae fugit voluptatem consequatur modi recusandae. Dolore excepturi ut dolore illo rem. Libero sapiente praesentium dolorum ipsam eos. Non nobis accusantium autem quia et eveniet consequatur. Et assumenda suscipit odio et quis laudantium nostrum totam.',
                example: 'rx5mltg1hgko8m0nkd20r29ac502yz75xz3fv0d8vso4jvj99gm5smrr7ee2ooqpg2fkr8ew8nwnyt1iw9qrtf0yrexi4oag7papvrgt25tbc7sn9ecbm7ijre2c4d4szdgqyksobza17meh8ytqnq4597umn48e',
                startTimeAt: '2020-11-04 10:08:22',
                direction: 'OUTBOUND',
                errorCategory: 'orjrfd2wbno9whw8w2yyh449k0sh3cl1gv7zbc15k340crx2g4zr489htfqib4bxxzeblzjpt3mbj9f9gvbqqdfs56veg3fcu94sikw0dxzab8r8my19y2d0sm1jypvftwg0v1mr2nnoyp1g8uhoksorib7wml40',
                errorCode: 'pjoslf4tnkyqo81ps2o5efsst2nl9f0zsflfxagsl8fovxz39d',
                errorLabel: 770159,
                node: 4902337348,
                protocol: 'i78l2vgnhrd6w7mkni01',
                qualityOfService: 'qj2f0dieyyq0uri54grg',
                receiverParty: '5s9twx1u8a2mlnza21h235731a5v8k6sgucae80ekleheahlo0qk9szla47288u4s5536i1pjz3chndc6fvm0qm6ymzwkdwxhu1ru7xr2xb7sgp03kvseynon9k861dd5vovfhutemopdun9846t6ut68mn6oyaqy',
                receiverComponent: 'qo8ayvq3sfavp3u6yjmg3hy38nngoergvs9qao7tktbjqiy48z915ykl1n1iyu5s4bp3krqfhnjktjptdvkvynfb4f2w1utghtwvspkmg6hrjk0ie7uufl18kiu4fdyejxl5y8bwqxhzp7dykbo9n59snatzuy28',
                receiverInterface: '8xfoc8wfs4i45l6bwh4acf0oxi1iv6aphbt82mnqjzttlwu7h12u0sntytrntwcd4jkvzb6ev488jsdt5nql9qoj18evoy10n2za7mk005exx3so4aim0igxw9i7akdpcfazyogvf55xn67jlvn7k98g49go6r77',
                receiverInterfaceNamespace: 'jwrj1za02xqe2sunua0e0na2pbaoj9oaniz45dq266gu48gxi1atg9c1pevo6i1rycbhx5yttjvjf8ymzx5q3pb8qwx7z7jb90j3m7g8qz79i9a0qjt31j9127m8sqvr7xi0q3xxmyyn01sh367fgp5isdcmno3d',
                retries: 4206344353,
                size: 4400945902,
                timesFailed: 2781642356,
                numberMax: 9381218388,
                numberDays: 2745070856,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '644rl0fkk7cogdjgyzfz2oyc6hd6o6jo99pqxvqc6j7vez3a6a',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'yiu53nk9h95wsqt3ul51',
                scenario: 'lhkv8q28brb2dao8scije6okgqao2cju5k4n1y5ds5ldtqqf83ic0ta8shbq',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:03:08',
                executionMonitoringStartAt: '2020-11-04 04:19:47',
                executionMonitoringEndAt: '2020-11-04 13:17:29',
                flowHash: 'g81npxfpej2khlmt4lyhe5qzc3x7qxbjer4n3jer',
                flowParty: 'tt51nvkc5hb1c4284l08y1hnpr453pp8giytuqvmakve8n681bg4tiygjl8plaiktikt3j0mianbx4fsqndl3z5h2f07gwmwevyexxhubcf0spoxox3om6rvv2vkauwc5c1av5zen23ngrijjlk1xuh16ivvdava',
                flowReceiverParty: 'gkcwugcb3nn76vmcw7wrqv5df4v7kga4k0rk316q33nn0qlts9aq7s3925bq11lmdav3dz5pp5r0jfor6dvxcidcx7dxsgxbgswjf8ewl3tzdcm4g8lpd368bdot2s66ni6skr5zkxszodz7baaotd5ca0azkpno',
                flowComponent: 'a4zh7c272d8evcqwc5s4wv9beq45dz3twa4dza9mr0m71kab02tvduwshgvwwja2fir4dn1vcju61sglo0cvct98llrlgsw34plf92rj2d87zvmt91u2f8ow59q6yxrgeqow3nu07aw1g6s2xbou401trc500yvw',
                flowReceiverComponent: 's6vyr4vybqvs6y546e77se1v3nkfqw60catseketri6z5nftor0736d6dwu6ozb4qiy9s8wx13nvnrmvkpiw1t1dpz0dlxorbgr53uc7xaa24jvlsg639wzgxx2c1ra5vn749x7cu7brfa8bm55jxvrj5o2apfys',
                flowInterfaceName: 'w3i478i6podvgbil898dqzsg553uvlv021uhzgolcyugptsc53cosawnhpo8drfa13db9oec8ngi6l4ug234ms5x89tshk0tu024ao32yls4eg1xemrrwbdv46y6f1owt2t7d2pbayj47mtslgut5rog3x3dul1r',
                flowInterfaceNamespace: 'ri4mvbn78vp7yu6g6mnppnjrqiyxyw6k5ht3mleuj9t10nrg10qse8c0ngjlox7xvka94vckhqn96gqycmge0tyatsoywvyho1eywnp9jvvgulbocc11jo8yts4illk97rxxz635alrsnnlkwwhq0swpryh3kqgb',
                status: 'ERROR',
                refMessageId: '8yheuxji82w3jb9069o8dfymr33wuux4uny6ceho9a6htwnonkmqkiwks95fxtk4mzpusgn6z8fdgtq7gqf3y12153wpgy5w7gxtqd2grm8hgdg90je0jzq7u7o4eigeis7l5ecixxpo50cwobvvkkdyjzu75lbu',
                detail: 'Illum nemo omnis et enim fugit odit atque voluptatem sed. Sint in officiis non aspernatur quo ut accusamus. Qui eius accusantium illum quis aliquam beatae cum eaque et. Dolorem officiis eum.',
                example: '7rvccdac3djnh7398zcl8j62oru4omtlehwoertkmpab3bn0qzdcy3ztdv9x4wlywhfyfsn737vsb6ivgffr2bvs25ougmdwtbhkc6j3w5gq8gxhq12o37fnuii8elofnv9d1gppwn6jgysaep47af24ue8gwdp1',
                startTimeAt: '2020-11-04 02:33:38',
                direction: 'INBOUND',
                errorCategory: 'ugq4fcosc5hiw3yzsjmfh79e6ihkpd8h5gvf7qf99vg9c7kk1q509bu01upr2usfo11o2djc4203kyvzhqxdewniz7dxkbk9z5988zvbkk3mfautghvpzx0e4cipeumllh91t9d21otk8iuqbqqlybx4ccqiy7cb',
                errorCode: 'eqwid3lpxgb1j1aj12lfgxk70vtsgrqc2tzn842rk070g4obic',
                errorLabel: 994961,
                node: 9564063695,
                protocol: 'e9jbo6imlclw1t89r4yz',
                qualityOfService: 'wvpp9lflg64t1x3cinjm',
                receiverParty: 'u53eyg5buybmi7735ak6lcredxhezi9a18x5iua9eyurr6lbievxhi9t8askdcp7bnqqp5ujl0k4up0oncj724zh47bcbxhlskvavcyjekm90pjxtjvmlpr1vnmytrg96vnxchlhtb2myf13twov6zvl3znwp7nz',
                receiverComponent: 'lxxlwuhn2fj6ysg69uk35f2g33b5z6ap49g37hx3t4tj2fodzx36hfw4je4ycayagm2oc35yixq552o7aqr1jcv8yie404llktq6kenjnjb42pwo7g0kicxdshonwisaf11xi4ibu9tenjgnshx1jrl0kesbk32lu',
                receiverInterface: 'oodox8opcmb43mli5g41cb1wxrl4v65wsksvola71jxyy48zdmj17tuu8q9y1x1uqmdh53gnxbjpuiyw9lj653ef50a4uaq71u3vjhysve90fs6ypcpavzuaq7jyevrw18pe7yfmye35sj8ylzcvdybaodisu4t1',
                receiverInterfaceNamespace: 'wean8otxv9gfmnsoqhp4rw9zp2uxayw8m6qdlqr5wcuj9zimpj8w4cila6eyf8v2aej4c0sjiax4x27x2cuxs349c308ouv3j2ak1lbn39phgnfjrrych80q4cjldr9bp2zqm1ww8hw8c5mijmft80jkke5daw6z',
                retries: 4950113344,
                size: 4541892306,
                timesFailed: 4159185494,
                numberMax: 1544540138,
                numberDays: 5915707920,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'ax40s33u33c9vxw8buc83i35irahgo7gghummhuiz418nsj9rt',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'fwii28n84zqnd650bh94',
                scenario: '2upm6tkeoued9quxys8s8fwih00imcnh95n8ipmgfl9pv867y0ua9vuilm45',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:27:26',
                executionMonitoringStartAt: '2020-11-04 14:05:22',
                executionMonitoringEndAt: '2020-11-04 14:12:10',
                flowHash: '3hr4cgwa0csbnp7ck6ureirgdet5lf44wae64ziq',
                flowParty: 'bb9q58c9ru9pqd25bdhs6jkvxg2nr0kv7v7ul45lrbt1v160vslak84dwlb6uuvz8jrjcx45pgacrgco4keh970b5d4vq6p8hao56nbbj76xl4941lax0utb2woodoyc9heqgr6y5wmw0f1eyxxywebd9lx754zc',
                flowReceiverParty: 'zdeut61uqz1be0epjqrcckcz4nqakqksteogjpthhhbv8ppsai0q6s1b03tln8j5jg1qq6bslekdd6pgx2o5zz6msvhn9x96zmdw0gmulhi4ktwv76bt1qaz5cr334nxmvfaujvfgud5zifule0rb9y50xxtajfm',
                flowComponent: 'd6wr6wgtmo2u4dcrxg00nrugmvwyaypiy7zashefua9bd5cr777wq8rj841nkfiulmwu985q3qw0y87k929mrsp29zk02tt5j3jnmusvfqmh814y3923kj3hjykf1zv7wp2hk5rz551pm8dt17hklhh5fyf17hqp',
                flowReceiverComponent: 'l85q1met14e86hthak92mrg64jna55954an86e0pzjf7ygjea9edl9lj3ecjx3jy5ys1q6inag5yf5j8t6csv3jrikubv1le6lltb7ccv9edhz7nrclq297hupi8y90261rz65p9mx4p4238yk4t3lcq7iy5zrd3',
                flowInterfaceName: 'ghgx3uymah4qojkfruz29qcs2uckzgx9s9q156qimlsyesvyubgbwsxn5tgz380yo01afmy8di28i1y7ei1muyl2rtdz4nmm1miir7q4ejn3a23dtc0tslfnv5aquqgkecdg2p0x37rxlrxohdkud6pkzpbycrzn',
                flowInterfaceNamespace: 'vse14iamqkz3vylk39f3c6xg1a1r57pcnwykm56p9qzrigv8c7vdplf1s3hw9k1kdp1hmtuub327xcos1f7z2ft20gxuadawnj3bpiid2u9aw42y0a4twsmstfswughiq9bk23wosg5ru24d2xsch8j3eprqxry3',
                status: 'DELIVERING',
                refMessageId: '4uvr0mb1fesvtx3v21uu01qtjaiwe7wb9hrg39iy9cblgzsrodbrdzh57bc5ekb9i9yolla59isbwowq015shdf6iatdqdq6yvouodvrpeswfhg6hyz57b1miqvjp2l60tu6azw2eot7huyijueh3e75xymveprc',
                detail: 'Possimus tenetur debitis voluptas debitis accusantium. Fugiat expedita enim nisi aut sit temporibus. Nostrum et nostrum aut cupiditate quia iste. Quasi dolore id dolorem.',
                example: 'y18stp6umaemu9ng53unwrf1kcu19r8t8akypb193x6m8hyb7yp46l42c2ay7xtezydko4j7ozdlflw04854lpi3xmyvf9euz0nmfbz56kpvmboak8zt86epn8h3mohnf1cayyhcyvyc4l79kf79xsvnz0354vfw',
                startTimeAt: '2020-11-04 14:35:41',
                direction: 'INBOUND',
                errorCategory: 'e7epdgd4i8pnx7s18vuy13ukn0ijx2y2whq9csxsimr24pt5b6si23o6vm4jahep2921ts2mkcr352kdyj3vcqnvjvlre85mct9sxy8zphmyr73uaatkoxxyizpy85goyga53qpho282ljze37erkwoi67tcvw1b',
                errorCode: 'qmkf3rckx1p7sa8cuezir9skdyzd15dtn14dp21w2lgx8z0c7m',
                errorLabel: 212886,
                node: 3425571226,
                protocol: 'is6hgf0mdwsbgcl86pcg',
                qualityOfService: 'h46y4y14npavggbwubg5',
                receiverParty: '464imkmuu68k9occqfnhw4q7tf7oakrfte73mbz8rwjdkkplmf2b3jyhlcdudmvov4mylwe9p6h22i37h0xsd2viuh5r1j98z8gfo6uf082dh1d43myfqxrtw6y2ayxh5h5itjh73pbwoa8ybc2ggwthkgk1kw1l',
                receiverComponent: '61epp8thp988u401lrr4ges01vftypeezza5o9wieydt804fbb0c603zays80w71ed56xj7ecp8q53euj23pzbm7rzgawin8utldw54llax4bc89abcci2s26ap8lij0ofvuspfut97tznkr19xbvrimqtz988tm',
                receiverInterface: 'chwu9xziygtyr09n522cg14cpc5c04oowpiewqsefue6u6gmkmef9763blq97aalhdsthcibk6a2scc012iphh6xh9azrvhp7l1w88faxg8rjs5gdlhxfotjdwto9swahm4ri2iyaqoywoix3khpqrhvlr9adh5c6',
                receiverInterfaceNamespace: 'odun5nt7ykw2176kvh2pvbui1rdphiprn12qppt0c22ib16ahjrzuu34t8nxbzwp429w1agfpahz9wq7ujyk2bhck125qus4p1sagml7p6h1mnxbel8iy3v9yrzj2i45z3vhw6b7vn8yzpc5lj662qzs60rfa1ny',
                retries: 1629874362,
                size: 4414914707,
                timesFailed: 6372585792,
                numberMax: 5746998722,
                numberDays: 7081930076,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '9gs1449x9gpcz8vq3iwb4bw58ckryz9muls48v3sio7nnch0jk',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '2qqs1wgi0sl29a6fejcy',
                scenario: 'm75f0nhsjdv21hsu99vbucagjkvry535zmsk18ki48jimtep75asvtob0pqa',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:17:46',
                executionMonitoringStartAt: '2020-11-04 09:36:01',
                executionMonitoringEndAt: '2020-11-04 15:11:48',
                flowHash: 'brs8ur6ym3fyp51n0uj0dtwk9ujm48l8dsa9e9ry',
                flowParty: '5g6pnk12cgtcv8x0plwnogj7gw9wnb39r3tx7gnzhmf8ya23aac6kcxcs3umjvwgk5ci4dd4z9gkyswn0d5rct9qunow79yj8wxohreqjdxyydnj07hcmal34y93a9jyc2dybf85axc7q29us6l746viqqrl8inh',
                flowReceiverParty: '3cjpkwq52hvytec6iyyno6j5lc67dziubmdgajvnicly16adw64rm70x57wo2qrh1wt8jatgu2cmya1992pa4009o7pgfk4iy2031vci8gjn3chlenmjwm6a0kap07qm3ri73i3unqw17sltijkzmwfersjxl501',
                flowComponent: 'rk4y3hemebug40erpjvb4vjgjrzqkchyu4j8ar2osovakmsq63lbyi7tunvrwcf0gj1dgam9qwz3gmfrwo1wflpgrjsbwb61yw4q75kt2hljzjqz47kt06qewaduwd5v7zszpwo89dvfhcg7xotq9adjmtprrtss',
                flowReceiverComponent: 'jkyeinapbegtgj0x0vfk6sbsoen4dlvleqglr8352u5l351a4a59vc48dn4fxg17t4g6ed4uimaxa9k6l6gplguel1trr8gii7uhuxmvufz8145mlv8fvkxb67fb7txxg251mslid0an41v5y7dkoft8f3iedzo3',
                flowInterfaceName: '76xbotzjszk6v8w4bmd9wrdd14umc9qwpcz6knlxpcq5cnhsdejmhxifn4p9es329rbumwwbto68qxyr6vjiki6s6dbvcfra7xag6lnd281493ylzda78usm45rtdy8iiqgfwp2cxa7ar1kt55u8xmv8igjsqoph',
                flowInterfaceNamespace: '4cz1mx4fob8mf8nngsp9ahs34vd17mvr8hzbcnnvbu0ryr5f2be5s2fshdt8b4bohgs3dgtdh3vleuk506jz8y1qn091a1imdumugb9f7tsnbgdt5m1l6iwadi0mr7ksyma9ophawkn7un1hwell7kgpm57m9wwi',
                status: 'SUCCESS',
                refMessageId: 'iqei2nhfxcqlm0dcapknb7drfe5ri2zocd5wb7x1ctyp8awbyavhxuv026pxil5z9z4v6den986l0imj7nfkgpmtg0v5p3cc51sebasom1wh7rcww9zkvqwi8zoq7a2i9p1ho8rioqfqup9g18e7r25zvhwjo7ya',
                detail: 'Est sunt aut magni est ipsa. Et eveniet magni nulla non necessitatibus dolore consequatur quisquam. Cum suscipit maxime.',
                example: 'oz01wvd3nh0vj8uwn64ga2itdbt24xs7pfgx8o0crkgn4u63omqq82mrr5pbfwhfevhogmb1cv6au33gz5jj1ir1yo5dq5a6tbnwqkn8gbsvmj1bdwf3u0weq3b73kjm3omf7wppdnyt72a3zw5no9qmdpi0coqi',
                startTimeAt: '2020-11-04 13:40:53',
                direction: 'INBOUND',
                errorCategory: 'c0x5hxumhi3xuxl7km6a6wol204l5wuvygs1amn7akt4a597y94hzmjwhiymqflxdr2mf2wzrs6s8nuedxblqukrlyqiuwgn49ykmhzcrgn1md09jm3oekb0lhuobrfdf1f9m8zlsajs21oekxq9eg11dmafwjap',
                errorCode: '32bk4nufb9sk0ngj286kefudvmipmualn2h06zpa5e9hwd0ne9',
                errorLabel: 174352,
                node: 3403146182,
                protocol: 'v4aqoyx3pju8vyxk4e5q',
                qualityOfService: 'pdxti0qk7tdt99kftpix',
                receiverParty: 'syaadwh0laby3j1akq3p7ttp9jq5a5y68v42916gnutyx8o1s67g7yt8xdm7cm5adlfz1pguguxc6yy3qsnp8ku3bbj72yrriu6xil3dy194fiyql3c7k9esjns4jj6o0xge3aydlegf1pob5vg6kq9qdqnzttd2',
                receiverComponent: 'zz7tsu0uo3gfmjgqc9t7500o36zhbihsrpmn09zqqo6lpp239zc1g34k0bkfuxhz07de162cpvuox14emzsa84u00htwfhjracb04qaj2rciwk267tnpungamq8h4h8pxer2151p6mheflbx00t8sxiycynpjsvi',
                receiverInterface: '9ba745787jbrqc4bzboja4r8lwzxpzmaz0gw4rp163ilu2i2dzwi19orcph4n7o7uqgf1o2ilo5yoahw65n6oj2u6zo5bhafdhlve4r4erpq29gvf8dgjo7jl4zq3cq8wrvr2rns0ayi9kvcvjk7km546kytbk9b',
                receiverInterfaceNamespace: 'agk7i1uykb83mbt95qd773ovwkt5kwqnoxl7obxrxcnfhi4m3j4ehraub90k2njdeorqmvr4s9ho4429zo1kjbyhhjqvc2270vec9mn7a4qfdyuwxr6cqkpw4ck8k599ihzsius1ib6lmrvhksyk3kbw2hnw3x87w',
                retries: 9494354957,
                size: 6386128833,
                timesFailed: 6617872798,
                numberMax: 7953650219,
                numberDays: 6896230330,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'g8da0vp4q5dx0ki0mh2xno15hnhnp88uyaiw179ktwikttcpn9',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'ceirfg2fzuje1pby1v0u',
                scenario: 'nsmlwr7oedq94s1bqpdrcxy2rw7fg96nw3npcykdcwi9o9pknh2n7o655kwv',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:01:39',
                executionMonitoringStartAt: '2020-11-04 08:11:44',
                executionMonitoringEndAt: '2020-11-04 11:09:51',
                flowHash: 'z4hcruk0zveqv3qy2fjm4l43fokt031kflb6ikcm',
                flowParty: 'mkacqf9kmz38irracnbel1dr41cdsjnd4mcn6eu2seqhc51p7yfwg9tglz5enhfibi7zt7eodstfxjwtcilt8r2g4q0gu47ioxssndqryo0cwv3ll3j99mnch29fff7p0tbkbtafmn32ugzyguv0wwy0jd8nd0ab',
                flowReceiverParty: 'cv8ihe8wo32h87d8poqfm493psxo03v38nfg1sg8j24v688d37f3be3yc2sh0bpbrpg21w5wum8dnnsf842vht4wyzrc3q15j0gpl1uj47w9zgv2pdlu98hd2g3z53n67nbqbp5xlkrl08587v1qq1xoenb9dzee',
                flowComponent: '389gvhy0fsk8zbiya4y5gihim8988qlfxub5j7rrq3eerf99a0nu65is1bg0lcfgzunrrobwodno87vlx47gyb8qcknxghr2o3x4zpjjwgr948q8x7rytp2352jd8q9ad7dq4ia06mk8urrkeyj7rv8bqhinmtqh',
                flowReceiverComponent: 'p5ky6yrwtvvwv8cnrz3imd5pf0pdby8nuew4sk2alz8iij9hkmukjmmv76rdcdxizsrek1lvsjp9oma1m4rf81te32wsj6acudxp49f6pxzclqrgoard841qm58g56gytf460i7j7pqnbhmaxl20n9vujua9xvhu',
                flowInterfaceName: 'h1flbzjvvtpohovkkzf8mjpox2v2urtk92sh2y1o8pu0yoq45934mp6znsxbfte86e0vuxngwox5qyhmqknby0bekuo6ekag1f3oq8cx5foppo709vsyy45aoxcs981wxfus2vdgww4yv8argw5e4h1exn7r1k33',
                flowInterfaceNamespace: 'yxqvb4y5m5t9tf2zwl02gml7xvwvos5owha38e8qivsgpzh1n50m9s26wadj3713jk0un5fep2nm27x182mnszsagfp9e71qi42sl7fvxaqak7z4cn0r8ey4tnigl9w0eoguz5jwvlnva7orb9gz7oqh6mxchj71',
                status: 'ERROR',
                refMessageId: 'tjyfjca2lejueen5567orq972c43bg4o9ppuvf5aqq69vzz7zs6w052pih6y7jpg7zqyabvlgp7wp5s38s7sh50ptwnro3ktsaygej7minh5vy19maqs2n3s8ewglcp2r30m4aax2oiitgrxaot7tnn2w2ym5tv5',
                detail: 'Temporibus et excepturi nemo quam nostrum. Atque nulla possimus. Impedit qui molestiae voluptatem eligendi aliquid magnam nobis enim. Exercitationem ut alias.',
                example: 'mulcmrm9vuqogzrpjsj2a4t5hf0o2t47rvxk0eeip9xk7yl1yc25s4d6nkasm9qiplvpum3e4fwl8orzjhx38b27ahhice8nys3v5ng69n46pg165c0vtozz8n39f9ztfo0jhlrrt0rcm3z3k4jznucui6u49k6t',
                startTimeAt: '2020-11-04 06:28:35',
                direction: 'INBOUND',
                errorCategory: 'oc0a2x2a02r9cwnq03lgvo4v330w245mnhezbmdqty6xf8fiv5mou58clysla74jw68fi6z1br5fy1n0phcn8tg8ef3ia40xy0a2yu73ippc5rm4ocbw6jgcqpc3j52e9b28bjwnlhzgffubycpzn0be6m5swc99',
                errorCode: 'ki39rnmncrfbp5bxpsjsdtpla8nag3qo6ihl61wcqnvkust6ms',
                errorLabel: 314641,
                node: 1185478451,
                protocol: 'zd8wg01up76u097nkh33',
                qualityOfService: '139yigirz4d2wymko65j',
                receiverParty: 'udy30tv8tyd3mj7093flrypbx24jrr17b444bc59g7z1zx2enqu18ju5jsjioeswwhbirjy3gvv9grz210hcp2mkrip3id25m2xuygib2sqpk098q12nigtlrixtteuhypa47l3eceqdz67qerjs2dsyhvkzynud',
                receiverComponent: 'gi1ummbhqnhl61f1rybs3xt2beox3c7nap12ecd0u1j6ly11v95pgu10soe58irhraw0ogbhuf1otku5nj8nw7sb8hsyu4szhh5r4wzpk2ji612z30mpxm3d48crbok0bfhf7xylo90wupkm5jy3rx5n1qrl7bmr',
                receiverInterface: 'w271kjlgkbox473hm4kxum9gic21qbsup0gox38sua8qvd538o10c7uxuod4w28b2w5269qsoqu9mz5s5kp0quosod24egzbqfd4phgnv23j19ed0y9wacicywcq2cmix6rh19s1gnazvrx6y1fgl456ujxzf55g',
                receiverInterfaceNamespace: '0d9w0h8tn53dtfxzr6gh35en2tnahnizyeeesgrf4bs8wc2lsyyeucioq7vf3gopdmky0we2kuoa85gh9rustl44c28dot30zprojnbh898asr3budd6hhd21fgc1mkf0q8a5dtfqejh1bsnh788dj92blijgrtm',
                retries: 25379368903,
                size: 5168495429,
                timesFailed: 6993475400,
                numberMax: 3862196561,
                numberDays: 7726700472,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '9uht21d7bvi3qbaeqmp7l5xdmwf945q1ucol1q3dmbntzho02o',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '1upx0oqd33wzu6qiai23',
                scenario: '043gi5lebuwcercrsgn6zlgsqm9et2whzzao6mogcjjl51z227gflscg4r31',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:34:17',
                executionMonitoringStartAt: '2020-11-04 12:07:36',
                executionMonitoringEndAt: '2020-11-04 09:05:17',
                flowHash: 'i8atadp0t2npq8i836ih9mqd8sp5dcepwocul33d',
                flowParty: '0uona769f9l0h3apg2565jm7xm8dp10fh54ehmk2pau4r27wze2gdgcpcwcvmyo7vjjuhlhhq3r8fe3xmyutf14b5tsi003etou3kb05fsexjt248vnzmy51c5z2dlbdw0y06tmyxrdfy8kb9qirw9o81ninh2ke',
                flowReceiverParty: 'guv59afspfefkti5o44rn38s9bbcmas8xh6anihfo8s6q46d0tpukj51p9q9njoogkznbyv9hih4ayjcxvu9oo3daly6626pigbrksj6vlkdrbjptavo9pvmdp3yysh49rcr12jg8r4s86ksg808swv78lor41rk',
                flowComponent: 'av0hr2kb4qagp59l5wxb5b5uzqshznaxqfutnu3yakxfq6knvg48fo9erqj397kcoo35anot1ej4z5taf2pfrxcbf6w7mnzabxn1517iphn5gekugriq0d81p4qmrbp9vs0abp3ngm4dcbsknj1junvb8tfg2ngr',
                flowReceiverComponent: 'b2xpier4nz4uu0rw4fl5uhjrnjdjvj5env91krvsng212y6e5n12blmdou1yd31kqg79j4dqslr07xh6n737pzqk76rjuyc2ofrsfngkgq5qcofx73m9jo4e7f093emfeoouwp1e43wnfgqvtm8ep9o5zjy46my8',
                flowInterfaceName: 'nvkpw9af5djr4ugnj1nqarr581mtn8age6p515am3o9p9fo4fseee5ed5qs7bua3g78bsp6o8rretoo6xt1vw7o4lf0d0v9357hcm05n0gqaohderpzyys3442hfa37nfzyg97n7jgi5h99jks65bzl29umsc1e7',
                flowInterfaceNamespace: 'yvy9kmk9meb9ay5nx0sj425fl01oojn44xigj4ctqrnewqj307jm1rv4hbpp9o9ntp763e6gsyc43yuwsc7ecyuagmi7iz0xlru934983cd6k2b3ul1lq1yiiv5pdm5x6qduvfqk9rm6grmxpw268vrua4jd4zeg',
                status: 'CANCELLED',
                refMessageId: 'fgkfjm4wq1s28cyxkp1nrs6b41bez7g2egm734rw13d216s15k17mro7ro2yhv4xxseevd5prglil832pvgrzruellzew5foaeso14vaq88xuvjhukwbn33neb2hpllm31knu02zb5rd40nv4z02vgosh38yh09j',
                detail: 'Cum consequatur veniam dolorum tenetur. Dolor commodi perferendis. Debitis dolore maiores fugiat qui minus. Ullam quisquam officia temporibus ea reiciendis et excepturi nobis. Ducimus et aut velit dolor odit mollitia deleniti.',
                example: '8bvif77fi0i4zxiq5250b63e3t6y7crcxusedr2bla28ibqpd9nkbzw2nogfa4e4a8ctny3zl3gin4c74sml3a84270m3ekyym1if6xux1fjk0pcawhiiv9hxxaytl10mdc8reicnosk3hmkk101sc8jr9uuytrs',
                startTimeAt: '2020-11-03 17:10:53',
                direction: 'INBOUND',
                errorCategory: 'ic4xw957orpsmb7eem70ugxwtt3xd6r7709nhsl8gmfv5cio1b25yrv7bxelyxf1u8guk5z08pox6bohtfsaxwq4nhxjsqnrn2mqk2wpf87xv6207z8241cjelzau8l282hvamoq29jaikye6m1879ku8pxdfa5x',
                errorCode: 'x8l3g8ezhh8yfsbu33u62nhotc1hjg82swe4609gou7rdlv8m4',
                errorLabel: 359477,
                node: 2155417792,
                protocol: '62ctnio6ik20cxs6tnm0',
                qualityOfService: 'dzmihcwbby4zoxxqjpud',
                receiverParty: 'ti4oprl0dxbzwsni87ey9eajh2gj1kljdluemlrz26b8pgn9gx1ik5qdyu5ar8ht8u4b21gins1i6io8ffokrts55cojdks8xn0fs34in7g5v8a4x6tpzk88qgc7avd6tsk7nljrs5fcm415nz9lx8k7o656urmr',
                receiverComponent: 'ae18my29c6ggzbj5vkqaslk8mbjdffg5rpqug7hmgtjyf09ktgpw6m538nwsfufz9cpsna4pugnco3yloxk5tzo2dcsjakclebr6oovlf8gq74gzwcekv6knfo42ytcmmux1mgzf1q70yomjzdlyyhqcoarq7iyj',
                receiverInterface: 'ld2bokkspl4dibl7foara743cl8tj1w4ljeje1z441fganwkvd80iq3fu4bbg3q6enphmb5dqqnjv2kp89dymhfum7j3ghzreb9ig5pfxg2mgpupo77sldj7m3i3wkkszpcmqzf1t8ijtr0m3ah591dx74rnq9br',
                receiverInterfaceNamespace: 'plauy5nqimthz8gwupqb15xd5o99tjv4ckru9f0jkgufrwlkacehwowrrvzndley4ygolzcwru2p6ih7shpmrsfu55lz27aqakr0i71hdm7zgp06jxrlxndjlstkyhw6jrtbsgi1ydol4al08puoixdp8ve0yaxm',
                retries: 5949555287,
                size: 18863496027,
                timesFailed: 1269815819,
                numberMax: 6103394633,
                numberDays: 7596922229,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '5ngd9qdspetb1mzn353buuyx6xoexre93ez3s14ukll6n3jybl',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'oytlqe1pu6lwesdzolju',
                scenario: 'ndtdeipjwytpuqz3rv7116ffwvftvkm92vrwh6wbo5ftubuky5qq5grlersb',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 09:59:59',
                executionMonitoringStartAt: '2020-11-03 15:52:51',
                executionMonitoringEndAt: '2020-11-04 07:06:05',
                flowHash: 'adjr74c4lp17ncea8tlzgy668jg9qu7utub7bom5',
                flowParty: '5wpjldbw18ohrkn7aiyb6a6iccpkzkle3iqlsbaw0bcxb3o7vhnci9by85zbjxqoej1atettnr4y7n4el32ov6lvq3jkwah95r9s4sbc37sp81wxvtjhkitk9uebz3kr028k05ttcnq6pbq48a2vlwqpe16w0imi',
                flowReceiverParty: '2cachq4394aze4p0t5iteez13wqugm2rn9v9zppbkz7wro2b5luj0hf1vluxjg5pdfz33ou165irphta38mu5hzv7obi5v03k61m9tb7qpm8fuv6qswvtw1bhqsfhfrcldc5u3augzglbk28gtblg1pgnw3ualyu',
                flowComponent: 'trvyes2asjfrbq7h6yfiie2r0kneuzdenmcicj8g5e4gcx8g2fvwb6ah60faufez1qvvv7yj0ks61jjuvwyiemva3z6gzyrkqhwp4ziai1v6tauqkdk3vmkowmmkz8njgb5w1jo4zhtmf5gvdcf7xiqvaxr7rngx',
                flowReceiverComponent: 'fvxap9a4649zfjxib9yhfkpmx2kf719i5eq7yukdeq7byh5kwvar8rcfg14ohfhs6igwyr7o6xgia4ph5xm3msu8ro5slyg1qk1glni47chux3r8gqdjqkefmhvsa902s11p31e5bzd2np9taogiszt6kr85jqaa',
                flowInterfaceName: 'ywzhs6st8wi8bsy71s0001r9m0in7syxyfmroz80cynioy2e0662uptq6whqac79worzc1cat779piy5ypgl8fcqev27bm3p7jwqhse91knn7minf0u716ygmji5wkut78d620hmvz4ei8b5x87sjshv9cd33l2u',
                flowInterfaceNamespace: '9tpbspsx0x4ad6pwfr8xb9uh7gdeoca6cem5yr88zow2de71wstqzjzeey86xbyq809lh7zyogzztuh4f6v0r0afnmjupdhq1msbq9r2158lpqp2okn5kcagpcnzg76xk2yrz5uzj5le0wxomzzg9tymw48icua3',
                status: 'SUCCESS',
                refMessageId: 'w55pjml7l9gllodcqi7qoqctabvrj9u4zzl8qq25sfjvxkfodx1dzf9qszibfsv9qsu34ly2ant2sa71eqbj5uvql0zctp1da1nrmnx33u1ac8k9ety0dxfe51wp37s7pdjhn8njibddqmzp00jn8k71ssvane8p',
                detail: 'Laudantium explicabo corporis eum dolore dolor est. Rerum quos et perferendis earum quia perferendis. Cumque aut minima nemo reiciendis. Perferendis hic alias eum facilis quia vel similique.',
                example: '3x1jes0ije9w8rleyc5a5owcqkxe7iwzqrct1vug8rfnyhx1o9r9b7iliu69391gvpalbrw33o837ax1bkddoiqxztd9yfla5pwivp52h0bzo8l3nmfdfxplwp5o227khx6ddizs9weo9zppa6xhknt94ho9alhu',
                startTimeAt: '2020-11-04 03:53:24',
                direction: 'INBOUND',
                errorCategory: '3cgfjgztp6sb5ysbvx5sjhbo52vbltb3z70o55o69927qe9fw445ltr5dr1d9p13hbv37kmmc613qze453b6opkpau27mfa6g7y9yu7697s7rll1zz3qyinnrer6k0xbprkho1adr8uwyz4bpd025kcm8drcjtws',
                errorCode: 'cxq6aijus9rs7ll00u40cwtyave0x2rtgrxpmhdyy3oel4u3vo',
                errorLabel: 661531,
                node: 8225606447,
                protocol: 'dhqfm05e78rp775uzf63',
                qualityOfService: 'gbxj75e40irxzqc01msf',
                receiverParty: 'c5wk9cmbl0brk4zk435sj8rkac0dz89dfp39bntgp74xc8jyswrgbi6j8plf0m6y874khgjc60r0pua49hqib5krdwijet76gecc2wn3pkvz5mzio7eruu4tnwong3yb93jkjh3a9l3l9zr6nt4pvaoq98d6j1f7',
                receiverComponent: '6w0scgleiax5n8upmu68jigf3l3k529rdbky9mnk6vyvywjrv62dzuxlyo0bklpyyofe8l2tpfrp9cnpvutlfap0rsqckxzv4oqljd4wbu5xffiifla3wymnmnskvh1pjyje4notoyu5unz84gi46ih0vsov3qap',
                receiverInterface: 'tc9cfnz0hhkjlq5n56l3rbnf9qanq2t6yuuqo0o08ymbdz7knnyb8qmdxr7tj40ostwcppq2rm23l5h3k6mdb69fahmq0myvjtc1a4d07rsu63oe75hxqxogftjnumx572uoitv6misnc6vo8moh7gtflkgg1n02',
                receiverInterfaceNamespace: '5w5j1gw0c7lyhe31mkuu8gotk6elbp8z5m6dc4khfjiuk9u70m4boh0tc7sit2z6yhz4m60y4gejbyc5ku7dzt9xhzu1joht24rkrppc5avi8z63ozhkbd3jf1un56jxpozl24wk9tijepdk4j4c9an2s4lzbkeh',
                retries: 4606257063,
                size: 9668584500,
                timesFailed: 61339937533,
                numberMax: 9942321353,
                numberDays: 5397701693,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberMax is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'loyicv5l0tejktwd2zzvvn2fj1yothnld49bbym4kf00fenrnt',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '1jf7s5d5gfy9dfiq1w3e',
                scenario: '43n8qbthffzcyjirdrmc94ljy3kt9bjqbw3owq6aj2a89wyaxww7amtbvk7c',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 02:19:10',
                executionMonitoringStartAt: '2020-11-04 06:50:48',
                executionMonitoringEndAt: '2020-11-04 02:53:42',
                flowHash: '7ublzn2ltxiqwhn433syvryb1an2ype3x8o4l1c5',
                flowParty: 'kz89ampb69t37cjqrivzne1wxqhqfsfsixt2qb6klkdtplqkl4r8jvn43sk4gas6hluj6r4vtoxco2uexcyjhz7fa229zwb5gz4m3jhp0ab29pl40t984h8c22onp01gpucq3jl2d3kzyfnv1akpn28fwohwhp77',
                flowReceiverParty: 'af35kq2w3zurbr12673jrpql7ehgtkgg8ez1ifvdg29pwxxxf1b4p40x5vmoo2jiq84sgvrepnl1on8srr6jq4qxcgciedw3knyutfh460d4iw94xdj0ke2j9murjewtg9bcwuua4ez7wj1mlvpzngxlus4mxbfo',
                flowComponent: 'tyex24oi7dywac8fzoqmcz3ze7rzhrdt4algcsyg46kqr1tkarfjd0ggi3jj4lf31tr5qo2qrnwgetwpo591wubts9vufacr04kvp145l4ty4tmh79xakc87efzwo4i3puozsjeexfax5ynyktl4ahebia98hxl3',
                flowReceiverComponent: 'kghx4bj75ogl69sxwgvpkpg0btu5nlsm7fsgc2xfycqaz7xj9ziw59sgr6nbf2a16e5ip2pgpuxyr5yf7uv0q4o49y7p7p9kkxxj5t0e2kp4z32emqu4kcuk429uj4024i2k13243ha3z76j8auhh6547u57kaj3',
                flowInterfaceName: 'susaqsmeezpdxs530t1idk2axr3nc77snd1p29hcavyz7o6nnikppgvc5timjda4h9ge1xn901emlkox1oqxepcol6xcxqo1j52d2vfcwar1utpu12lpg7npgol51jelxyhdst2us43apf7t66kyxh2xkdt347iy',
                flowInterfaceNamespace: 'u33lp9amyko3c56t4xq4k1fs03v90y6y17fqqg5wjklej242l6g80o2dh776skozxsxg75cahvlfn72zdq1fi5nxd2dkc0njf2plznlmrawlqrq0w85oiqtapxujppz4p5usgieqn5i6ghdsio4ktwf4dq8osns7',
                status: 'TO_BE_DELIVERED',
                refMessageId: '7xaqcltk5rod0umqhtscukfnyqz4ff8gf9mk27e85jdgianihlbxpkoa5alddai49j23egkqoft7rfs1eif9ggcjd59qgu3nf6v9c9lyzlghkjqgm0itjkez0aavvdl2zep3yg84vuv7cntgsy58yrl2xh2n5kvs',
                detail: 'Est nihil omnis aut. Quo voluptatem et esse qui omnis ullam esse at vel. Dolore adipisci reprehenderit voluptatum delectus quasi saepe consectetur. Nihil voluptatem voluptatem. Harum est suscipit omnis qui tenetur voluptas. Aut nemo nobis harum possimus impedit voluptatem.',
                example: '3lox0np2wxk7noo54myldgg4rz5v1i8u9o7g8ngtugbu86p7z0ome2uyblwn66iv6a4fpef0f3vmph99aujxta1tnj6foh1k7eh3zf9u0pbiia1uckovlsjqdku0kcipfhczczpftqjkhoy436tyo0dgplky62uf',
                startTimeAt: '2020-11-03 23:37:33',
                direction: 'INBOUND',
                errorCategory: 'q5ppqdquherizitrmfk0rcr28o1zttux65mbmejqedp9zijjhohiobv9skhxkiq2r5421a4zj45lly4cqb2omgivsamkqhkwir93vse41zyyx0r07eyh8lu6an2zm19m5mztica2uvj93scta9yl4pjb323idx9l',
                errorCode: '0j4wh8yzx626g1b4wvv64fvxtl0gj4nxivh42orztd39y2lfgr',
                errorLabel: 427709,
                node: 6910118879,
                protocol: 'qsb71zzmxkgy9z76hoc0',
                qualityOfService: '3v400lffq1ua3abq16a5',
                receiverParty: 'g06zxb66s91nur2htixioi1ciix59ohb6cfpiuf16uhenjcn44mntu6op9daqn4z1oazrvzsecw0h3fecz7ha8oh0xa8t9udcljfilhc7341rzvpc0tqz0dpdtq75wqnt9ph0gv7b7lo8f50dfdb14owntlayg9e',
                receiverComponent: '2njobmtx05jzw902laqm5qq2904r47v4fluj1hecex8iji5ofj8gs9q2rux4xko5v0kw4mafxbsc6tx6scb9cvt9xkau8oosxd8805y193v1ti7vz9sun9ppgahy3ga1prqp2r4jqkwxuk1poco0y43t4w8p99tp',
                receiverInterface: 'fiwmto326rjc5hp16ap6qsn0l32wthcflp666jqj8cpc7m66201d9mx51sl76zqf40qr2oe4nk1gx5ezjp8yyob73exahon78rtqt3ewb94sb23s42jfh11lf3t1g8kn5p5rs49aujpn55zu2etm7njppjvnvs0d',
                receiverInterfaceNamespace: 'nmoz9yzn9p5rgotgvgcpgpwyaoo2ewklutshinwpqkw6669b8ly9w5ltxl3jo9ldch4epza7q0jj3zu5l13mk9sykiq32je7zeujxetd6zc4y6mljthgd3aqbdvkig5u98quozazgsc1mged09twalnsea76xl6g',
                retries: 5467876298,
                size: 3933257896,
                timesFailed: 2374689030,
                numberMax: 50174513123,
                numberDays: 5691652216,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNumberMax is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberDays is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '439t9wpnppmh63lfanze9w38ve24wldf7sqvpt753kmw7hue8y',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'pawxzcyiwtylaiws57zm',
                scenario: 'qgv6g754gikbg9z4347lpykut7rin8mcb1tgzukz8c7i48grsj6cij08ljib',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:25:13',
                executionMonitoringStartAt: '2020-11-04 12:23:49',
                executionMonitoringEndAt: '2020-11-04 12:49:28',
                flowHash: 'aq5kac1f8zzbe7ojdn0rlbfscwy8g8mwcykn5ucb',
                flowParty: 'opvkcel7nhmbo3drph29vn3q0uwz61i91o0poj24024nm7302nym28zetz7h95xohxd6q009axiaahbb6hiz1hdz5x796vwyr9dtt63w5kw7e29wu15w8anmgasy5c2bsbhq72cryhh1pgrxvxoe2c4egisxh9ro',
                flowReceiverParty: '11cjnihmi39k8s0vl5ttbf4kczekz4ty4mvtqzq3ugyb5r4drzdxbpvkcefhcwttbc3gqmd4tu07fygformr4o30w512ef9p6iuxl7fs7vavvkf4i4o2ioh3pokfiemuft8md5hap096j40ok8m7ggzo3e47nx4o',
                flowComponent: 'z3lq40h8eqcwbd1mpnxjypt4p7orns6wt23xkvniihli4gtqfq8q5hv3a9zhk3kfxb4ps63xkotr479n55ep3y6c2qabd5iuv1dnnmfnhj052drgjjpdwzz69cwubv192oe407kbh75r3nxavdhcj4v40c5zo096',
                flowReceiverComponent: 'wpb60q2hmnuoct6r2243gq1j5d287deshszptg9ih7d8jprkmg9trw1s4a8wp6bq4wkcmnzkkqyw27vqbdryutqrdflb6iwqa01ypv1rxby2edz8vekddxsybbz6m0j5jvnbyv5vx8ogmhx8bsnrc38axuupevpo',
                flowInterfaceName: 'avbbw6o4pi1w0o8kd26csm7ht13vjxvsonoem11xwqxcbgeko4vclz2p921ig56ziaiqnfojj25zcs3l5zrhksdy4pmdwk7km54rha5y1ex5gi73vs7h21exdujch7yq3df61tuxe234ze1v82deq9bsxytngl5e',
                flowInterfaceNamespace: 'm1tgw6u1nrpu8vw0oxev8oh25ec5ehgt6dfbejo35u3wl7vs2nu9q6wteb8qbntvmb0n0qfrvhrxg4zq8nq7mvjzskbnew0w9p2xtk96e2t7om42n55lprhaxa6hz551fcizdd2uyz1guty24avsqpir1suw257q',
                status: 'HOLDING',
                refMessageId: 'qtku7nw1shmqj7skbx45ct5iwj3shu4zczh0wwi9z3ov0yu9rsu4imekytm00fv1wkohh02g4rlct1dpqhao270n70kmqmml6snqn3oggkay4j2n5fsg36jxfd4jc4pyeg317zdjwhkefetdi6vc8ubv97t6mdkd',
                detail: 'Dolor est voluptas. Perspiciatis rerum dolores aut incidunt delectus. Accusamus at quasi perferendis. Explicabo quo temporibus ex hic nobis quia quasi ut beatae. Autem ut alias quia laborum ex accusamus iure. Et aut enim voluptatum nihil.',
                example: 'fjlev5znqfyteng0rhmf9qxgo2zcgi1nvtm3po7sx8mlpow2no52rl7yvkqxhlp81ud1ak0yz65we2aqbqjmlg3a88k255q0mcxwvj4bdoefsaguwctaserxkrvabz1on6vtycm55vfjuxt6djrblmwhyb8kha3s',
                startTimeAt: '2020-11-04 03:02:55',
                direction: 'OUTBOUND',
                errorCategory: 'by3wpmwaa7hpfxb5i1gmy8rfr2kfd01u7w40iqlw6ueq8mwdfy67q5rqkqtmbfcwsy114ho3r81nfw8oe8lf1n36ls631mkwineqmcw11hghukn1t4g1w20rjgd4fl57yi9c61a6rlqmz9bcrhu6b7iq7g4qiv7w',
                errorCode: 'z864m8e76ny7vmbnu7ce6ook7or8imcwhwapsml3c8vptrzf9j',
                errorLabel: 738607,
                node: 7076747892,
                protocol: 'duckzytgak6a6cdiohd8',
                qualityOfService: 'lky4v8lxry2jc0odnr3d',
                receiverParty: '4ax1jpv7lk9ae4pz3ce6em6vf71sbsefqwn9jz6spm5geoizw7f09edby4uorc41ow62pz1uc5h20cr4011gvelu33zdydthp4upineway8qqf0f8zbfdurqwbtkx5c1lfvcgkhvwa3u1smec5wr0okrngxksjjy',
                receiverComponent: 'pax437pdm7usfu1bxl19v14qpk6nqoj1dxo84032s6jq8m71poqsqq317fxwfi3xag77airk6171ctw5s0dlyh3sw1wac1xvs9qrxjqqzyps1tvpbi4ye3mwy0kbnjrhd5gw0bu26lt2vzczjki20e6a55vrbhak',
                receiverInterface: 'sshhskmxgkfv0agn3cdnwdjnfbzr3dhd50zfasl4mkhsjyzsz60uphdn1fl07iv5puo33li9ne6qjiaugabuornjaf4th3p3128f7g592jmhnylyp915szab6r0sy7fxhvwmpzcib6e4dg400lxotfniaqs621u0',
                receiverInterfaceNamespace: 'idqtztsxmlwpe2z4g6j97wh12mmc2p4aqdvvorhhtbg0mdt66s4h9mv0w553neoxzkojrrbwv5a38jw2hdto6veeq7og6nk16ih43yt9xtjxfvyr8odj0yrij6rig0nat69w8amnbdppcjhy36thdntxmorajbh3',
                retries: 6661518512,
                size: 3465081294,
                timesFailed: 3257181510,
                numberMax: 8024986245,
                numberDays: 88926965755,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNumberDays is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'pfp35ocb67h84h5jaqxz879lwtzzqeuomy0bmv7uqab3e2kg6q',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'y6rh0g6sjjju2s6ieb9o',
                scenario: '9c9vr89cf14mw30iwkzerxhil095a7p2fwc4n7ic717ci963m94szsc27xbv',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:06:08',
                executionMonitoringStartAt: '2020-11-03 23:07:22',
                executionMonitoringEndAt: '2020-11-04 03:26:24',
                flowHash: '2ncmludfbniffaztcx1dk0mnm1r62bci8o6hxh7j',
                flowParty: '1qyboszyfacah6v6cipxo3lix6agi16qt9qmv4o2x05rjjjo9rgeiv6cl55fgribs5bmf2t9zsswjfpczfww8ncfmvouk6pembyxxl7fi7hixy2h9z25togdze097rc1jbhvfd59zpo1tmn3opqvxy8knpwb8fs1',
                flowReceiverParty: 'x0wpf0bilcrh9fd9fje0jtdeogj8e6up8fbrtmdw1dhsa3xf8uzjplnf1azgbmcs0n9jq7j0uxnguguhgerm2h3lvdv7cinozq8174hmbbrpjhtk91atrdux5zj70qpuv1htaek9tcwhywg2ac9ii9upznqj7pdb',
                flowComponent: 'c9d0128bjfgiwe1wvysqrmfcy6oc5l68364lrwyjol28qu272z243n97obicsf7st13ylqcqz727z1mafwjd2fzussn8kskd7z93gl9zsz8f5smacob3wbxj3bpj7mfgrjbulwh496bqhypl1wz3rnk21uln8sb9',
                flowReceiverComponent: 'focbmhsy29utda7rja3bsifw2z39p7vsdpdow4brvel6c4o4z5ko86mbatwc5b0yobtzij2mb41eis2m4e3gys2cxpmoj4p7dwnzzqt0ady9sw0bnx6i0rwmoyiy5nse6zursnrz7mh7je382ypq4ioh78ppm8i3',
                flowInterfaceName: '0h8l1faag9v0mxiiapvh45fbu9qjzdn5cp5piafc240cj6lkjeiylwpdoeq3vcvgxmcskjdzmuqm1x5fk97kd9fd0ahrbdlx5jacqrytrdltvbcn80dwl4lvt8z6xmxpxigpr4yf2mb42d4kedycpjp0j11onozc',
                flowInterfaceNamespace: '19m9jwj8ycjxkw04ozvszudcnlfkizci7n7drbtl9aiu7qwum1seqhbm36qeh53o1v5yh5wg547rn63hp1fxcb8rnk6fo6nsu4gbzo5h9ned67u8pyzckjvxv7hc09d28il8afv5thnt0mq6myaks7fafxj995l5',
                status: 'SUCCESS',
                refMessageId: 'e0syqeb74v3xxuorrweig7pt1n39mcnge1fwq7szr6o5s46rz8632ugmp3e3vrp6afo09uvyjccde3olfr5rvbmss3z6pn9uj7cavp4m4wjeg2tch77q4h2yp5u5mkmijyjgrjmii0welqmeht445ekjlc1vcu62',
                detail: 'Perspiciatis atque dolorum et. Aut et maiores modi et. Ea sunt fugiat animi reiciendis.',
                example: 'tyt3nbikh2qf2s2fel9vshhl29ej8gedmfrpjjts5v8l2uxf7xf8f970rnwevwqdjryxbjc9fpthlcsorht3aifqfbh99hi2rlm15xdoftlw5n88fpzlt0owo4w7u37358fsssxka9ywtzdlkbpqwjezsi866t13',
                startTimeAt: '2020-11-04 13:36:47',
                direction: 'INBOUND',
                errorCategory: 'l1jemf94jpj36pmrdbeep0slktzcvbnk34tuwbrovreczpgaf2y50x3g38j2lw4tyqarxw48u5sf93c7m5k8lhrjqnwx7j4fq5nj3h86wzags8om9w86iz7rrn2s7j6zxopzrhpztm6cayb5e9dftjxfr0cmfmsw',
                errorCode: 'zmz94tt75jfw0gp2c3uu8o2693i4ut0afhwbxc19vwav3ayp35',
                errorLabel: 325967,
                node: -9,
                protocol: 'x6at3ki7k7iogzha4lea',
                qualityOfService: '4l2hizluf5cci01iemgy',
                receiverParty: 'dfwvhudtmd5hfz6ogd1dtjflhn3nlsltcamf910plxkkbcztdc65d8v7lxa9d66g8xvsv3rhyo7o69aluzkkzivkkdq76nj5ujfqv9guapn4qwvou5cfe5vrej3z0ytg9bqf7yu5r2vlbekm42q77unojg5zlw1g',
                receiverComponent: 'm9ygosixtsb8w7huf9hhmkt026t2vxyl8xr5p6irna8035bnu9vdte4oarsa2fvzgto47ndzvy0aaxeudfjylw2lzn3et1imqdrp99c8eqmnzg5rukc9osehqrvdczy6mq95n5my39e03w9hweobnya6ry2k8xrv',
                receiverInterface: '1241v480ug3how638971y2p1akghpsz1rsk1oc2e9gyknt0dtzysevz7j624k9ero8ve9mbppbn7wsrh4tt64e98i01zgqducc9k9bkjooli2npvqynm4j8eaj1woaf3y1hez0a8azjbc2c4luzkyats8idvoxja',
                receiverInterfaceNamespace: 'q9t7zppl8xabr6mofe8142qbu7qxnuooxwh3ylp2709344gwni1kzmag7h3z0c0tg6k2y3132q6jvs3kz6qyu37fswd1p83il5lhvc0ccgfabzmhn8w78q3ifd5dlrzdjgxno2b2fn8ugbw2unwhs7nd2ouzq7vm',
                retries: 5053170111,
                size: 2757019651,
                timesFailed: 4440616636,
                numberMax: 8290457201,
                numberDays: 3350485123,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'dki3irmuadxta8ch9b5i1qkflp5dyvz629bhxv3swbu6qa8a5v',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'apsxucbpwt3vuuv75p1u',
                scenario: 'l9mfpzeq40rtg7cd65culxy5yexhlkzuj171a3z855jovdf535wwzkyf0kpl',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:00:45',
                executionMonitoringStartAt: '2020-11-04 10:00:48',
                executionMonitoringEndAt: '2020-11-04 14:33:18',
                flowHash: 'fhxh5aiidmvttl1yb9jq0s06fm3omue0hfkp5pfb',
                flowParty: 'jz606v36vrgzq4s598a836pt57ay3y67xmv4jfgift9havx05svrhnrph1ir77nix9cu34pdwhzeklrrq4tem1d0pm3j0ix1q47x672ego1115kleir0z01pgbonw1b90i6e51tszfh6nihfr70stlvglwgz4ads',
                flowReceiverParty: 'cf6qiynfxqow4n9sg9o1yyfvx5zpj1g532r9um067kn5sswir39e347f33ggqros7ki6kqwmfv4azls40dho6nelm7tk6hlpx26a28h4mwn09a5pj1xguzqxilm1stm9f3ylw2zc7qavmty99rs4h353dj35d2p8',
                flowComponent: '6d5vxz8gkmptfia4k2yqflttyhj8e4a79wwphqxi4sd3nje877oz51pwtxjp07zrqmak2xde1breub0thuf4ef1kry6bbbvwtczzbvxxf0pbpokq88zjx3ty1y1p0wqfv81nxnhed1fywgjz2zez3u3yet53ddq0',
                flowReceiverComponent: 'rd8ruoq1wcs4mn5wstw3jrq36aalo678y2nqtxzjg7mtfmud0boytardvmbul35j0ddavca15cg7eskraqgijwg1ihbng43csdq4ek5t1ffflks9c0kkliolxj9aoax9fy7j87acw3nt9vicjp7h4udkvtqlsrbh',
                flowInterfaceName: 'jabq74nip6rhiyvbfsmfqxhn7nshhazqfeu7i2susmdhicvtl6akijzuiyctim0v786u21ewqqugsn8j8nk3cihr6nkuw2ff8uwxvz91gl94pee24d9yvuaxd1sd0fxdil6qxkz7q6e3ihego4y85ub1e0cq5imw',
                flowInterfaceNamespace: 'kc4u6wthuf2s9lolt2q8158vx1rpy9j6slvkwtq9ncgg89gultmopjhjvnlo2xcuf3yszbgus9u0yqnb56nh6rnakk8h74h6wola7y5ysokjz0nbe5j886xfkgib95jntf22tofxujp2jbs97fisnbaqbern06av',
                status: 'SUCCESS',
                refMessageId: '3fvh5mf3haz1919h6d0i88rm82udsj7mmzuoc0w1gkp5ojr42y0wstax3t2k6zrf8irxv27ka19o9317sesqk4zr5w8twmqcxzgk14nsp2wxa2hxejalj8ig16814elreaoo9tfea6si0nxv14zplxbju7r9ywzb',
                detail: 'Repellat distinctio minima maiores unde placeat animi. Odit in sapiente ipsam blanditiis occaecati vitae magni. Modi voluptas magni.',
                example: '45rmxly13od79esrh67tqtzhskwf0t2mcxbngrg22agxb78hl20uirwh6lyud0794pn6byc7bzqhpdmdv0zzn3wplojayxh3eyn78y39xmy9fdoo3e1zlw6mq7xt8q4laagjd35cidhdfnkianlgfmdcll2iyx3j',
                startTimeAt: '2020-11-04 05:11:49',
                direction: 'INBOUND',
                errorCategory: 'pkzpfsmt4i9ursr6rp2jnreb1mtcuriifzoh54yegsbjbq5aaao1xpnobrj2h4pom8z1tjhqjb49cmuf8h1nt6xrjb75wwndo3s37x9sihnl1nq6oixi7aa3jq7boljhbttxgivwdtwf7w26g6m11g7hxkgiz6ip',
                errorCode: 'k7myna3fu7ethxf7m89q8kqcgyv1np84jqxhx8m9oc2ydi8q02',
                errorLabel: 192288,
                node: 1032966496,
                protocol: 'bvd10dnp6bbkqfr8m9ll',
                qualityOfService: 'qgfmvpp6d8roddvsimds',
                receiverParty: 'k93h905gkwl0hwnxuwlqr37j8z3kt6e31z25qoc0mgk6he44i098ivswbjnjx6vcaip3bdwkczhs7m63h4t4osdzdmf7geq7scraxa0jcr7xwwr12f1dqrtcoekejxxx53njr7p4mzcktnokvajct7fpgc3baonj',
                receiverComponent: 'kr2nf1wjql01ljuggtoruoymzbur1jje1hy5u3f3aeg4oxtjc20p77076krvldwzzdvkslwulsywt5znonmt2e8q57thmjibnsrllh318p8sevnaglv3is71e5v4ay1r9jmhdoregclz4q2wgbyr29eab4i6uy3n',
                receiverInterface: 'tmhmub4rz9cps3gl624erw9dkyrnkxq3aqtjo94vi2jdb3rauk0geongm97qnjj4gkes28u4yiiqkui4hlrds0h8abcsib5rtuhp6ppejz0mjgmhf3mbwx347q2exspoxvef8anha1lg30bv87kbgfr3lpnm68jm',
                receiverInterfaceNamespace: 'rmgm64ji8s83roauxgt75vd2nujq6ouj95xi4wbdz92a34a5dohnzpuw3rt37fshszx6remwnnuwx396jbhn4mi2ipif6jem454caxjfwh356uo43l6kw247famf9cckit5gikcvzst96gsc2sk99midgnjkl12j',
                retries: -9,
                size: 5594843547,
                timesFailed: 8861382281,
                numberMax: 5754358013,
                numberDays: 2985251089,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '2l58nqxamdfze2t4jhawj444bz9efzco5btu02u2c7v8cw096g',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '2k1a3rzn2xcpwii1kp58',
                scenario: 'ud5te35okd5pumuduh9s8wg5n55viz45ko1g7ivgrpg0oboc8m57q9q8id3n',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:25:28',
                executionMonitoringStartAt: '2020-11-04 13:18:00',
                executionMonitoringEndAt: '2020-11-03 18:44:10',
                flowHash: 'luozw5izql64o6nnzd8q96benicuplmixpcg0n8r',
                flowParty: 'nx23jare1c0a77juc459kp84xmwcnabmwafntswp7fnda0u5mhsiiz72wrmces2pbm6v93l8lx0tu9ute8td5fh0pz7bags6g2abljwqkqm8ha9624zg6w5rve0ucm6r55h817oc7z5de205skwha729lqe6rml9',
                flowReceiverParty: 'nur0ywcr064rpyidien4gafbb469uxu27hiod7jc44abqskihd1xwksrmdglt1qagzlmm7yvtprv7p151izssny37vmhs91pwd8igzgdub3bxy2xn8dbbfvluy7mfgf4dgnfveugejb462j7ckvqyw4kr3s8bly9',
                flowComponent: '14ag61qmscex9eqtaooknb94tvx5pf38p5k8zmey7x0pdripzgul0wj4xykugp2lif2u6yo5ciguwdaevj001glsr072y2e6wa6iew6nk586iaihyzcpew1lle5hy4kn1yils6luqaux93pfj39du4vf4ziea46j',
                flowReceiverComponent: 'ux5j9uo0arwbpmc0fpz3ttb16na5b3v6fb6q3rmyaf109dg4gt5ijoc26shjrqsc277cn7riqn3096oo83ujeq6v27dq19t0cnwyvwt5b6d3nj7ub1a3jj37wj9s79qdv0h8kn5m22t3yxxmspq8iwke6i64wyic',
                flowInterfaceName: '1y19g7q2fw9nn25opmbbb0amt11vwcld3zxhnn996914zvb5kz4zjqeohjb4pyfkmrwbbdr72qr7yk2asu0x54u8sfrvj1uvq07ugintzoqsamiqvyssnze60040h40y2i6xc3v88ybzue5gbzbmey6685ny8b49',
                flowInterfaceNamespace: 'kczfyf0jscvdp3s5je6qbvu1aw1g8zmw5unfqel4d6zr0fyxt5idl6qrf1gftdl8sixe6cvvanxyq2kobsbc2g0jbnrze3s9xqxdlgkuo2f31ay89tw6b4im79hz0sdddz6c2je4dy442sjpz8ityu782pezenwh',
                status: 'HOLDING',
                refMessageId: 'bnqu8rqjwi1mf3h8cec8nyzl3ttm9vn3zy2cgq7q3aar7nfaa7xiiqjcemlowhvq1m68fiqxhixi90hiwzgcxad9dkzfklcnpm6wca7rg1fj0fksss7qx3mm4sr4zkklneo2gfegsn5l6imq0vcgj1zfj9vp3q8j',
                detail: 'Consequatur cum vel rerum harum veritatis est laudantium. Commodi sed voluptatem iusto iure. Excepturi exercitationem et vitae vero rerum iste neque est voluptates. Et temporibus nesciunt. Omnis nisi quia sit ex in aliquid.',
                example: '28rn8dgt3gy3yoms7ipqvfuxa3ovzauzb540k8fr8pl4j7pr6irf4eld8pol58mx4ibkhjt4mwzh6kiz1jpo1vpmpyhs5t8vdnqt6xix6ue243qnaqfw5grgi8j2gp0495x4n0mdzma05wly9q09qepq7yxtp8mx',
                startTimeAt: '2020-11-04 05:25:32',
                direction: 'OUTBOUND',
                errorCategory: 'sugjktt9qq9s8e6yvivbresduox2oih80ry6ky1tx6u0ranz4qc4qpez0h3vzwcn3kny9tzes6ylp4oclux8xj9c4ijrcn6vaydoqjtpao0wjlpg8pm76xkmfyli907j7fv49hnnitq6j0ssd96wt8g2j96h5z5t',
                errorCode: 'agl2vrnyhy2h7yf2shjtzozq85gz8t1agelston0ihaviv5aex',
                errorLabel: 966378,
                node: 6753067875,
                protocol: '3nacdkhdfi6qpg4px75p',
                qualityOfService: '40q7qqiby3ae2gksc1gu',
                receiverParty: '935pv76le23g4rfekk6igeqak09ulcf1z2scvw9fn1q4vxt0rl6jy6l2rfk22mkpbi18jd1dpq9gd8clw6tse4wnpnbgvye6vzsz7kql5v7umyvama5jifvng9o4a11rbgbzxkhpbut5q2xlvkk0nnk89tyueblj',
                receiverComponent: 'lz7cjeakfx7cepclaofz476pdxpmgppf2cxyhqpavsh8osrtuch9mrrlqp7vvl4vd6zn0hjbgkp8y61anm68vezpzdpfhkfph97slv49ofv08labpmopltw1iwe7x1b5ttsa4rqyuiblm5oqs7txwpqkx9cwwzke',
                receiverInterface: 'aj66fe2hdiseged6sylvs7vz750xql11et2gl1wua0gfceifo0itz6jctd0c00ygwnhzvwq929clt0g7h4hfrmozoihzr0sqqzksch9cll8qnloz5g8bnirj3nsbfzm260ejat1amgwxy4tripafwiku1kzeksn1',
                receiverInterfaceNamespace: '7ivkncnjppbm3vvuzqxxkpor7ci3gxjxyd3cnqco4xvtlrkzqj5azq51qjwhximzshg2e7cz4eheh1katsjss1i8fztcem4p2opntp9unem44m6b2ix5t3si08vu80rsindf2rs99dbp5xodx6d3j2zcidubsbcq',
                retries: 9912714113,
                size: -9,
                timesFailed: 7488422287,
                numberMax: 6457605339,
                numberDays: 8538945989,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '8gvkxvx6q7vifhlazgedhzlnwquv5knzhgltfxpg96v0g08rzn',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'snvackms7eh1k6rzordo',
                scenario: 'txmfxij447dg5drwo2dexz1a6p7tu7tgl0x0t9arsqkybhev28tn3ggd71bp',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:33:27',
                executionMonitoringStartAt: '2020-11-03 17:57:51',
                executionMonitoringEndAt: '2020-11-04 14:35:16',
                flowHash: 'xheg2detthvty3w46mtjdqpfg291wk4o18h3exvv',
                flowParty: '2hqxcw1aidp0vjculmfegpmxqxxqupw445dk6l92xvdtlsui1u8aw89c5m0fjdi9k7642l694hbtr32md8mrms6eajg676p3w6lvah286yistsd2kuw38ul3cfiirfus4uw7enrpogkdwn7pni0nkmc8hio4uh8y',
                flowReceiverParty: 'n4o8mawfu3opzsi436f506fpeut2k1m4hje3upw72avhoaekb0ro5axn0ayva1chksxjff9hnlinhn9nj42gq8vuxgd639fu5oal1bjqg2z0o3wrgn8w54w9g7ar1kdq3o4w8aqaviyxujzw5sbv8u1oygxkqakt',
                flowComponent: 'xuvabq1ua02oqayxyl0prvrtrkt7bxz2x3fvek874cw6i9gcxlpa6tvw1e8lx5n93g3w6rj2p2jgv82yohcc1bv7ymgwckc7p22zxwnuzxywnwm6lody2pkj5mp66hnxfh5ogqzld3iel9xyk88ae39vaie2pmnt',
                flowReceiverComponent: 'ljxckyx3lwyll16fsaml3geglfl731xu85ukwzx3rpnvsew3psbmlcxh4ewurn585r0d0al0me98e6c6x5op0omxqkr5gwlg13u902pz2udk8xoe99q8pmxvgmhhwsvos52rdn34299epzmom23rskd1fp3mce35',
                flowInterfaceName: 'jti4f8omzpviquwgybl05pl08bml2xs6fk5aawlqcgaf2t652e35fhqexogk3cynt1phghph98be1dzyt9oqesajtl3hri3uqvhyiitrjtvcdqbcexskzunldzxwcx0pge0qwizep19daqcd3be3m5ldswxgj1fk',
                flowInterfaceNamespace: 'du9orubuz5dffserewodbuhh9zj8ogayky2y7fu4m40wese6pdh36hbyc1p723if1owis7oy3xswyxadb3qbfip750y1g6a77prqauthq0f0ee22jldjnh3npd9ro796ckqx9cba1yvo9y2w3xpc0v1jzvqiv8cg',
                status: 'CANCELLED',
                refMessageId: '00w5btgiyepyl8fa5hnkmb52di3kyzh99hd2aa7wx8z5vfmywyh8799vcuh5osf7rt0mb56g66kxpt8gdj8h18p6xgk74rrt3xjfb21zqm0y0y6k0yso24e4ipy4m3z2lc7bbh00yjopxw1w2wcgdpcyi6obm73a',
                detail: 'Et et id harum et officia consequatur architecto. Voluptates quia aut. Quo ex expedita. Nobis quisquam totam dignissimos ducimus sit quisquam provident nemo qui. Dolorem voluptates quas. Aut quidem sapiente repellendus occaecati labore non vel beatae incidunt.',
                example: '2utbo6th1lblmnzrpesunkkncua6j07207gs797uj6qxejeu9lp95cqvav1dh7dppufp94kuy9hifnxdaiswq19mww2mpgk1227dr5d2ekjvhu2mnzeywzbqlmw981k0jqxnzwodm59gb4c21ii78f5wexmc155d',
                startTimeAt: '2020-11-04 11:54:09',
                direction: 'OUTBOUND',
                errorCategory: '018eilo05w6bbfn4zby1ha8s167vf19muwb5g39lebi404ojq4sj6tpzq5vxna6atfeepdc1or3jxzs3wbcitu4z75asbq9xcu8814vp2w5u989cr02i00vba5sdsfiqtzoc280l4uxlowkj2scfdp5g3ganqs18',
                errorCode: '4gicuy9jm1wbyz4byksjqfqnubilpp2xtybybc31yz3usrvi4m',
                errorLabel: 880873,
                node: 9517157972,
                protocol: 'bdijiznnjl27ckqag6bu',
                qualityOfService: 'qxfp475zj65pfcl64iw2',
                receiverParty: '216zor4i6s2ru8ofmtqzw78b8aj0azvpy25p0ny2wmfskk27xhvvlui65byjmj47rnm9g89hvxfv1269e7nokoyt1w2sj6iylb1mqbvpfecyotg4i5ysv0146y73j99xi4s1d638c3178gkkz1epv3jn1auykfvu',
                receiverComponent: '1j6oiznnpvydr79r7fcr04q0hn367er78oi5ah482inm2zpqfoohudi7uz8eb5qvr1pxc0lfso1utwlb8hatk41w0sxv6fpntvx20ukkun0zlj6yocu6awaaaxh6gyo6rv99nxxzi83bv0rhl74vmh07x9g6b04f',
                receiverInterface: 'g5s6eyhcoteljsdikysjv988os2lurteikgz8f2ktmb9462bomvcl9tcs2bs5y8l2gqeb2aipbx6hg3h5lgbrh4helg1hkf686khi0quji20jfyswx621caifvrfvybw7vpjrl1ktboldr8ga8c6a4y8kz6irdu1',
                receiverInterfaceNamespace: 'gjb02wn9lud36buxl4nc8dvqf7zhpyrm99c18spco0i923sqz6qrbvl9ca0ccef1i9d1r83hsg23w18tz07orc6i17v6p948rt9ddzgwx59q21c8rwhzq84gen48trmh2jbnmuqz0706pyg0fh6zuskj4jocgxmc',
                retries: 9155464429,
                size: 2868453758,
                timesFailed: -9,
                numberMax: 4444052612,
                numberDays: 9521151287,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberMax must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '723b2hm1avuq8jbofls42vfsoxo071chg2078wn17mph4zsjso',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'bge1xw3pis3ja8vi43ci',
                scenario: 'hpwud22no1jwzj9kpluegbdjnuvif1j5u2oyc32qeulfxhmfunq5s42o9fqq',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 05:48:37',
                executionMonitoringStartAt: '2020-11-04 13:48:57',
                executionMonitoringEndAt: '2020-11-03 23:50:32',
                flowHash: '64rcdxs4t0cuzrczyza1hir8k17jtxnbjsoyseo6',
                flowParty: 'z4u8oikwt1lvfmce491fr5g51h382cs0jlw95q87mvzlrbbcugws5fk1jms51r3cvsy5eo2iy0fbluwvvtflkt3buyxvrpm64jrwov6tehn1cpsfwhbg63jkc7412ocp741x99z5fy1bmeni1yewutu9tdhas0xh',
                flowReceiverParty: 'pv0s5bira9c61o56ulbfr0piz6p6sxq3zbdtfnef4ysetee88r57fpap6f69o2d7tbsw0gavy81yanv1qdjmzowooiomj1ru4dc3me05n5ucbw5cn6tms7pdb1u75yvt8s36j79qvgjrau9sygf5q5qo57lvjts2',
                flowComponent: 'xa36l8iksq21ek0oqda4hhjmm4rowjmt39h9ohm860c3viz6olstlyzdh0blawir7pc3bscfuhluj0a8e3aypcpu4xgumha3vy20ox1q89lpn2nnunm4ogryd7mbmg74zbod6flz8aptjhyeczi4qo3vrdwmzkwa',
                flowReceiverComponent: 'q02evjqeww7ezwzwdy6mx8kw47f48uordi4uv63mvn287fx2potng05f482vblc8lonab9z5ib8w1f4l5ycw9ewjhiraxu0kovf0gli7j5dqtuqf2j8gev3pifrg2wt04559br0dpwxjk1efnq2qdxpyuyjvjqu3',
                flowInterfaceName: 'zqvke1g0jxfq7w6vc1wdk8d2s39lqb9ei28wfqkf09czozs134494rinxyba13p265sak76n9ov5icnvo8b8zlh20fnz40pooqc4sz2x2u8z5wti43ttywsujt4nlzjqnmxqm9yl0x0dmir6v6e59yuea3tg0s0r',
                flowInterfaceNamespace: 'xxmdezo1ds6iqoorz57p9dux7ccsfeyaoz7ftyeaw58ars6vrvm0u6afokp4c6ojr78r9wi6aglherne0jjohh0o9ts6kzzbszwloin9v5mo6s4ss4c370azzwaqtgb61ojjcbu829a7t6wuypzei98xshqupjbd',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'qbr6egso5nw7saqvvbb4wpkxjpjct30eeh1wkh507g5bi7q7h3bp92qymv50q0b6zsurwo9ccmxyvurqbmd0tc7utj2j37amn1wqijpdjoiw8g2cu53z3t5157i6v8mnfho9da5bcr9h1devttccy2sjm9avmdlp',
                detail: 'Consequatur ea iusto. Cumque veritatis placeat. Ipsam inventore nulla quaerat. Id voluptatem sapiente dolores dolores voluptates veritatis. Laborum iusto aspernatur odio in.',
                example: 'kcwvlsxmdtax2hnb6h73qmv4e7vaa78d95wj7x3ett4ozcgsjwer25pujubswqknbhp1glbx2rpvlsdzgyo690qs7elb138ui57lmyvbg9y94wow5h2ni8shrccf21nenl3jg73izag5ptkx58bnbt6nwk5xw3d6',
                startTimeAt: '2020-11-03 22:10:17',
                direction: 'OUTBOUND',
                errorCategory: 'oisc18epnynvi4hpcdf2wjqszlxcn2ie12hjbta1ciu3o59kozi4987vrkfbra8y859utm52m03flfo5mvmzvzm0vbertgm1zxha6awuds9ix7dyomd1rwl6946c4vk5krgedsowjtz1qgokppqbsdut7duv52m6',
                errorCode: '1lgz0bzyvbi2hzra37hfcgpia0r4nf9iofdt9xh03j1jcdnjzj',
                errorLabel: 182684,
                node: 8234110752,
                protocol: 'gq3lijbb28xkngdt4i0j',
                qualityOfService: '345dywwzc07c51ohwszq',
                receiverParty: '1xff5xhzgez9wo7n5eow555dss3mw9pycrww7r098tpo4k4oxdkbqg1b6fupx149vpdagxlf4etu2a5vf2bw0r08swn0cpkkitndtwf83qdw5g6fh4bf2p0ix7iyvhvaqh9o7l9te6basa8qik6ly02w0j3i05zf',
                receiverComponent: '24lz86c4scr8hh4a9qv6xp0xf4j59xa7zr583sy72gdq2pbdberaqz86rvwb3yoyh1fudffqmc2txsz78y6f4rk6skzvrln0bc4xkwiirt8zmp59ba9u72rng0udrqf8jizoz9z7iy611q2sy1rvmee8t1h8da8d',
                receiverInterface: '1uj8ov2h7eemrgqg16ipcnx6ukecfziljpu4mu7zhmn7r4ewxqo4uhnwdwsocrpeiwfmx10yfq4adbnukskfp8w5dl5yih5iovrpopq7dtg7w8nsom3eywjntbavy6mm2qywqp1oplj5eims49az4f9y8kfle2vo',
                receiverInterfaceNamespace: 'qbiyh83wnmr7c4ohl89xggxmi57adotaaazzseef9k51k8ejxtgeh0411xiqkgv3zhhwxwuagm806046ml6ibwxvzxzx5h1oq3okb9p75f0u5y8upme2qr3hh54ob4ft0b5argtdrt3g9zsrnhqer9c80dzz236b',
                retries: 4895219486,
                size: 3261312364,
                timesFailed: 2593449966,
                numberMax: -9,
                numberDays: 5401426740,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNumberMax must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailNumberDays must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '8k2w5yvvtlg3trq62985q6tmgupmzsmfatleywmtehsxtjjfzc',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'pc2x1969n32f5klyd83b',
                scenario: 'ftzgibj12hhw044ltnd0zvcbq82m5du527to44afydg804yfxbkltcea7w4h',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 17:52:49',
                executionMonitoringStartAt: '2020-11-04 10:50:57',
                executionMonitoringEndAt: '2020-11-04 13:09:25',
                flowHash: 'wremfahhycvutx14bpff9rq5i67tu6ifirw6z26q',
                flowParty: 'pxkeamv6yv3tuvfj5xk8c8xu5b3pa9go4p3y8a1g1flxv4ozoj8r4hxb3ljtcyhh8fn1y1mbux5u4mfm9jrkv92fbrjdrd0va4jhjskwoxd0cjp9bv9g9je5nwwk5yw7ur5vg0vb0am404j8nrxht73mlljuuok2',
                flowReceiverParty: 'c6ojc7ugh3v1qpc44g0zarasa8alj1r2xltsi6u071xcraxkrh8zr8u8yvsul1r632t9uah254kwmbw4yy5drbf1ypniy29bnc7ccl8n11v7zw97xqolt79hmnewmvul957pgmu8ro9tad2tli6c2f8ft7yd2m4v',
                flowComponent: 'ljt5dmchmo5l4fwuqsrsmho1txxfiiduw7gfpsb6xphgy4xatqxdv8dbk2p5ykc16628o71ktk994hjrli4ju0x2k76ew7tacaekq6ziz0c0p8nn5gjsl34og7yx30yjq74s01jrn32btagmvp1xr99hhjl05vw3',
                flowReceiverComponent: 'rjwlqbuvdw6lndyh1judmtcn9v65rfv407a3e0r6ncgfr11503hv41fhnt5c1hdyd9sq4jdx79lhdo37o1z2bsqj0xj7i3dav54ptmozc1sfl9k3gj4ww2m2psvkhtku9gjmzcex7mtppgvnvv6m6wts72bwh0g3',
                flowInterfaceName: 'y3rtcbyixnd7pjaseol6hxdmhper2n2bd3yjjyh5lrksw9fxbs0u5qm2ag77jv7evpivypsz49nhoz8odhlxnagu49matujbngooqe6vq8grg5bb8t8qrx144tlyq4xeqiyecxt3tey6o4rn0dx5l1vvue6i84hc',
                flowInterfaceNamespace: '2ut8yukt6dm15zsnvf7ue3o3flhcjhvkgxrw6w7wemhg4ppvjucx41u358rnunhly3bbko7p09qgyfug4y2gk4clho9qbepbr0mf2rbduxlr1h63tnmnsad1h6w30znb38xzpfv5w4pqmijppwr10xdy0uig8k0i',
                status: 'ERROR',
                refMessageId: '2lo61kuzfxaunqwqtzzfs9golbza9rjx7ix48uxyuzze7g7bl6uj8lrmt8t5bw29b3ag7i7t02vms28lj2h3m3ps95s9favqsdhw4k1gm8v1gxlo6pql5l9q80kr9ndk0dqcojt8wua1fvygode8tzv8k0ibfkti',
                detail: 'Magni occaecati omnis alias esse architecto. Quasi est hic commodi distinctio aut aspernatur repudiandae earum recusandae. Sunt animi consectetur aut deserunt quibusdam odio. Optio delectus ullam consequatur esse. Deserunt tempore officia dolorum error ullam ipsa at.',
                example: 'kbi1yex4kxp3kbq7hu8hsf90m982rgi1mc73ozglhoheupfynbqgvnjxzhby73rlnhidaupk2ywmbbjea7ucgky44sdtzonxz5ks65xifddl7r4q70hre5hpf5w6f9ca88kedgn8b77g21fj0kk8piw1vityrqxa',
                startTimeAt: '2020-11-04 13:15:29',
                direction: 'INBOUND',
                errorCategory: '4jha5ub86jp2jetvw9ko1smb0b9nuzfs5bzx5b1meg37zj1etv6be5a0gs8qptbod2ub8bonw5t3kmw3usmrd5x838zocdqub3ihm9s348jb1g3dkznxoemjov1ibevtizvayet7t5ctc8x1c08gjb0g5alyfvxn',
                errorCode: '53ltvsn9xg1mxfsvy89auqckpmvtohnwxww10uexgkmju2h501',
                errorLabel: 114088,
                node: 3171298531,
                protocol: 'vk417476t93rflhf1qld',
                qualityOfService: 'uqgf7o45aek8y45n8x4f',
                receiverParty: '8ulrur284wu7i0n5xgqcnltdrou4s387ynon80fxyt8ttpo4dh05qvkihhs545mgrw920o8stvzr0dmqcb3x9sjpmfumkm7gcw5kff9sh1l8763rkso8pl81jfof3bu0sgginq2ofobdgxbkyp705xdgqa5a1arr',
                receiverComponent: '6r9bsrheq8mvk8g5n77wwz9g54i21x16asdx0e9p1exlpz4byxd77fajjv0p918ctkqv2fdvk1mw1usvxb5ali3e11qutxv7601yz0ojkahv7pe5e6dkm97jcqrty3572yfvavrkegc45guwl41r5jtgojgrcbmw',
                receiverInterface: '1vkgum26j10dkw2vkj0d6u04mxu1qbh47g3uc1honz7tiuad0fobpfk8woyticv5o526w4tdl5g07kmeznqavogvvi9wq0k7kq8ll1myycntghgymplxge54rh0s5pt8f9782uhekvay9bwrne69b4mpl2p1wmkh',
                receiverInterfaceNamespace: 'eqp92y77ncxfcp5mqasg4ip1g5o2ajh9go2nkmyzi98z88sf05vlx36e8bbqh2zf3758apu25ui9swraewv2tm20zgmcnl18bddyr8aam58iwqf151wm52nwtv4mls9rn8a3ni3x7bzv55e86j4mdq8hjp2fmeqc',
                retries: 7751590188,
                size: 2981887214,
                timesFailed: 3542219900,
                numberMax: 1946126074,
                numberDays: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNumberDays must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'xnz8zi1oyopsuhrwyt8p7mbyxocan9dfd5glt9eb5rhnpyjkjk',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'wnp53zz0espy9cg87kaf',
                scenario: '2iev6o0bdey315p4ko4m1osb5afu543pm8vrw1pb6dbwuz6oggf6eewh9xvp',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-03 21:45:44',
                executionMonitoringStartAt: '2020-11-03 17:25:53',
                executionMonitoringEndAt: '2020-11-03 23:50:37',
                flowHash: 'xsbv5env0x7fb0zv73519qk8r9hf8rvggc7io92n',
                flowParty: 'd0yvg52h4bbk3jymiopy59o0ycwqjevy79slu7p0g1yyeibnvna9si3v6610lzfd34yd0o2nj8sdx126j14cac3w3g1sblbjoyvam1kc8zr4vc9xgh0r2tl18lsaiajyjhjs0owmatgoo5j2kgixmsqx0k0gvyg2',
                flowReceiverParty: 'm9n6tmsm58f6uxdle8qr1867joh0lsk4w7u1w2zqixngguhpl0cutyz8ailhg78pb7154sla6yhe3g0sfukonyjqmcvsm6dmi837jajnsioanibpl3ys8rtfpomwlwlynjawz2qom8gvushp1p0ko42iak9ckrk6',
                flowComponent: 'jrgyj3gcbr2nj7wija8hmfcnztazqxhbv2nybvgmlh8bt479x5k5elu445xmod34z24u5s4v044g6wn03albcnx8nsxovpyphoq6gd95qtyaf9gequ1rpvytednxf8qnsh0ecyb012rk38tyrbk83jv1llea49xc',
                flowReceiverComponent: 'bbmh39dehi05kafoolqr5pbdwd6l00gjnen45i5626fplv7bxtlyii76pf31lgnzvu45xqdo8bej9k1kgft2mv7io6rm47lfkzn1isshis1hvzpys6f1w9u3uc761ixjc2ehutzhxlalagg7gz1m3ye6m7fy6gn6',
                flowInterfaceName: '9mzxzxg9xkwtzwexi864iqxs8eg622bxpzswcj299d31h1b3xqu2gasj4ebyr7cdn9ym0ty1dojqppniorsixtb1wjqx0nyaa8n50gbf92d7u5z6tgql7vdlpj44m5womrtn18206x5snnldcflavrcat1clq9k5',
                flowInterfaceNamespace: '5kolc08bl6ymr8bbgte85le2mvj77ti380vwfocoajh4h2fbjyblgn04t3h843kd1nmqm59npx8cc0wkca2wr5xadaekubdc7wopl2l6r7026tdareeaf4j9po1sgn48zllil67s2so3h4qex62rbsucfj5w2716',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'lbcfrb4lhly52t6xkk5yuap80cgk6597lwhftz21vin1ueu9554jtb209y0pcn9rjup8c7xfb1igbpotkakw7d0h2sqcut016lymcilmlm4wydfcay5v93coaeyssenahoo7bxoj4phs0cl5ia2ir1ptkumab8g7',
                detail: 'Corrupti dolorum vel. Officia adipisci beatae enim voluptate quos. Praesentium voluptatum velit. Voluptatem beatae corrupti beatae impedit voluptate dicta. Iusto doloremque optio enim officia a. Et dolores corporis est praesentium et voluptatum magni ut.',
                example: 'dsffdashn2smkqcavma6p7cdkookuexhqwrn87ko2v85zr3vgoodsnn6lmqyhpp9e4i51ny0ki5xwfjuw98ybbmsq8eqf6d8osi6bpu08sg3p31cn4p6gtt4f0zx0xxm1gzg1v37jss2anz220bcnbvvvx8kqp5d',
                startTimeAt: '2020-11-04 10:49:37',
                direction: 'INBOUND',
                errorCategory: 'o7hfa2hh172u3x4upw2einuov4lm793jl5g0ssoe843sn3kq9qb0s9m295ie9puebuqjietr843fyhh5dgqzgo3wpis3c11q8unasvppf8p0pkgc3s30qcqpnpd5b30cyxekmefrguizdjgwbtwdjc7y9sgur39t',
                errorCode: 'ciu4wq0qrtdhiy4l4cgekrjz79agsjamivlyp1odw46ksbdm7o',
                errorLabel: 544302,
                node: 2332391809,
                protocol: 'djhtcsmyk75qxh333v15',
                qualityOfService: 'o5jlozdzh6ptdjzlf103',
                receiverParty: '9okr54lfdpozkb21l3syuwts9e3i9kndidkshfted65fywgwokzdvr1vs9jqsztrbme2yvpdc9n9dtzh55l0gm4zrdktq2gvg60eawukanrhi77rvr9qwhqrmoedr0w392iv0y05g8wr9t0o3fz3o6r5g3ikskui',
                receiverComponent: '4vvhcelcxci5y6ccwg7ja1347920rmndivhvex4urksh4wk9zedyftasq958d9vlzgew9sh1a2wp5vmevm7db9snrxb7j6wmsk4a1bc4zaj4ho0r92o449smacfq1yk3aq64ybsiljw0rr38dki478tazytzwm2b',
                receiverInterface: 'ws0b7ltkgwxtj510iuhfqggwr7z20uzm5tqhpcngi17f914jcvk3rb3f6qntqr87yg752ocr7f4nbskzrhuw44068tmc16jjhc3mngof7l4qz5dkumyrql02veka8rpayffvlwv1yskijgrufb51gp6htr65f410',
                receiverInterfaceNamespace: '6aigr86yy3jxng1sf5c6vmc8xzxtfflrlud173ycem9e1ky0k2j58vk5gtgglm5jcuadts48w9w73wtdrvv8qwyh7q5fso9e1x0crd0k1pidpnradexvouxtg8tekfh8fbrpxfxfmupkymy4d2zstp4ad799b54m',
                retries: 9548882118,
                size: 7996622756,
                timesFailed: 7106016206,
                numberMax: 6049384957,
                numberDays: 4471532973,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'xfei0nvn88e0vx4xpczpmpccy6rw28kk3cv7d81edjuu869mtu',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '67g3wubzgtpy3fi9q1cp',
                scenario: 'rqv631342ga81sl7bxixxes7quhq9m3dqzhd1gj7x4i78cbhm1kzfzklpkxh',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 00:11:22',
                executionMonitoringStartAt: '2020-11-03 16:27:39',
                executionMonitoringEndAt: '2020-11-03 22:20:34',
                flowHash: 'lqebdlbglrksfkoj5085l8szrsmy6fvjhjcguni9',
                flowParty: 'on1nmgxdw2q4ds774ac4r0kv6ud1jnvknrhrgeyhg4stieefafylljh4sx880779qc60xnso1bwcxke9dx57iun4crmwimmrdho7i21xu9k9eu8ivp6yr66z5i60e0kbhgahlwfepfag0jyo88szp1apuhzv1i57',
                flowReceiverParty: 'q17e844spgyb3gt7mz17ozvk6favi9tjt8hv3lgn2z5efk9i2ohkheg8ka4pxhg3rybg50244nwwjhbthc7aalvsczuf9x0jerc5ny9zq1a0xq4ck3ugqwhshsuus9e11lfz7osdmynywssl63gpuvi0vc7w3oqk',
                flowComponent: 'mqj308rf5e29mk4w7c73f3ucnuzhrk08enzkzoznhv74hwbe8a7k871g7mu1xnldpadz0ku8i918da0gi0vzs2x7af7fwwo3qqrcc5hrjis3i8soky0htax4tueb5falmrxhyhu8vc1vp30yjh0nl5xo2gak9lid',
                flowReceiverComponent: 'j3441bp8b79eapslc6wpvhk38kn47ry7meehz8957le0jzzobev1wcazuxrh5jfzpc85jcu8xzadq29jpvz0bix7rnufqd5zwcdb3qza50eoqfva85061lvxfuknrxkexyg6771758rj37x2zwz0ahskflshajn4',
                flowInterfaceName: 'v6d7g48fwm561evv2tjjqvjc9lmoobgtfijgsrpkomog3evjb2d75vpns6fqg3zxsivod187pnzhth3xaq33cybse7s11xwx4b0vqdxui3m87w6hrq4xrcu7tpk8ndg3d5yrww01w1mumfmel0ahuet0ufkx8vuc',
                flowInterfaceNamespace: 'zaqkt3eirtpxz7hmslroy4nue4v60khwqhisqlsw649kdnnphrx0je3fquqtnx7hzmigo2r27mr736616ix6x09d2xipfkx5af388vpv1ml4rk7658gmuw56l5i9ntiqq91w57hi1te801wqjboh3xfa44vsoktu',
                status: 'XXXX',
                refMessageId: 'syhh8dsxk7tbqf38aq7rw8ygfrz6iqy7uq6k1r1hlsw8hj62d4optx71pdjijzt4ekcywg58tuunbmm573js8ren90c34whcwz3k5ckm6b2k9eoqrxsczegz5ps9qtoc7v1py24uvxdf4bjqesba9edzuiy7rfq3',
                detail: 'Cumque porro cumque. Suscipit et repudiandae aut velit delectus. Ut doloribus sint provident. Est dolor iusto veniam modi officia repellat ipsum. Dolor eos quis quisquam voluptas et nihil sit. Iure et impedit alias commodi voluptas tenetur qui beatae.',
                example: 'r572h3qp1nku0gfz7r26hpqhtcuiq3r82hc6g542lu0u6l9svx33wexvuivv40yr087p9l6vrb785o5y820f0hhtz7m4enzvdn9nw6jb5myp71co7owhw46pnghlr3mmkkq55u3swq1d5x3fwiqtfizbr8linkny',
                startTimeAt: '2020-11-04 11:36:19',
                direction: 'OUTBOUND',
                errorCategory: 'lhffajhhedpmv9rvm396ln431xsxdac8go9zqeai24sr9tv7s9kp3ce5woobs38u675v06z82wd98i4a718ho6goyiq00z6odzdndhdvfpby3jy2onfghdumvi0ddb9ot19mnle8xhmofkd15aawo12gahadoich',
                errorCode: 'eie3nvdh7fovt41n05e0izmi48wkkorbnat0gmygnsrt9rxaqs',
                errorLabel: 268586,
                node: 1125980748,
                protocol: '006nquvclffm6w3kv1fl',
                qualityOfService: 'nbicmpg3a94538hxyfrk',
                receiverParty: 'dylxiuadrypxzm15f5im8ubjbi5l46vwb4sn606lmc6k8wsm9c1hlri496fi1a72ra832tb0bdoaam9b79cvyk3y7vwn97gis7bt6sekdr4ska5f39nxem11vry3tsnsiy3gie2sovmmxsnhnfjgs6h86xy14sd1',
                receiverComponent: '57om4f3pnbbihake8sdcoovvrw3kn06l7hbr60g9m25g1vhyicj1ak426dq1u45yrf7l9os2qlis7bek2t2ue8u2ospglo9ee3zihs2gjzyhi0gu50mormkx4b1p969kkd1miqbbk266ehk31h5zq849j99ul2a6',
                receiverInterface: '80f5ixh8bgv7mgsiwqf9dk7m15s6etrxlplkk7ybwl3zcybmmrmypjfrce7kpiiyvc1686ej048r8b343l9ksg8vfiu4z7hsbj0vpbi7fmx27tgw349njreooxgdfdx9lunyi0st992iz3vxlg849nw8g9cqcq44',
                receiverInterfaceNamespace: 'dl5rvl22a8ahz38427v3z4kx9m80yjkt2ryushco0xviy8np9abax4vuc9aoxr1hbeqdi7pzffdnopzpjrmfe20xagq5jd6b53hki4434f94j5kn7io5zaftb4pfucak5ww6fd48vso2bhsudp2brjoxq23d1eek',
                retries: 4053878940,
                size: 5162595419,
                timesFailed: 9091260907,
                numberMax: 2476611560,
                numberDays: 9435734183,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection has to be a enum option of INBOUND, OUTBOUND`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'l40m3cfhv15i45rv5xd7erognr775iavmsirsoe83ylvi49d5q',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'ucncy7l0ptc8o3z44oyb',
                scenario: 'if5cq3faksqs14p8qo7oessw4a8meomowog2yrz8ibo6tncduh0yi4jvuga5',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:14:16',
                executionMonitoringStartAt: '2020-11-04 03:01:42',
                executionMonitoringEndAt: '2020-11-04 08:05:41',
                flowHash: 'svh0tegep0o4huwm7p2m3tquxker5pz6643436gy',
                flowParty: '25c2gl6wiwgs6tc2hx2iiillqchw3gorg8fdrr2l09mgy7ealfyfyc4hvr3tzjuvr6un4kj2p0qf52dd07xbzozqgls2dcul8r31myivrabnomvp49k2a3ppsm8rcawb8slxz6fr1sff94dqrbdhk93t4w02qfca',
                flowReceiverParty: '3hp1c3lcxmtg35kf76b1s5x92tmzylw08tbze60tuxdi3zceapc1h5peqrfg9m9mhbzq4dlkvg9ynyl3injrmq7qyqnsdhi3i6p6dgv4pjenk5gvou9723lq4thibmdgrs79mvnggjm8ii8da4432rt90lmy3ngj',
                flowComponent: 'mktg3he8c7u1i5q7mpys6idh2ulz0i82kxuiuhrfuxb3x2fj8g71f5oyy3s449e2la2ji466t0z6ymowpc4el8d565gfv6o94h4ngidwbnedne3g9dm3ihrewu2ptzgxf9ae4rcznoumjpbta2cmrsfbayf6ds8q',
                flowReceiverComponent: '62yk0tneggvkioj8voy8sd7o9uhb006xrjtdki9h7k88dxr497y03vphcnswgve2t9y9pxr4ls3qhq3wyroq1v2lqmypd3mf232hm8g3zl1ao5v60b2m1yh8kilc6zxvhihmr1qmlutkdfmluga46dxskrg4gx44',
                flowInterfaceName: 'upbgkxqy1blix2ibbhppbvoxkx6c7u6fjf7t0hwa7wyzs2zfc2s44antvdjnoat1n02sw9eir52blue8g2100mn4kcqhlpjdxg0hdaqv53g3ky1kynuigbt1weq0jfx0dmapnn5ij2u5lhcrrxctj850vw6v8zio',
                flowInterfaceNamespace: 'nioszfj7npuz5pw18chp8rq9abxgrvwaymmqyizrjvq68y2uyke1rxvdsu49w3dzl7fi6mu8yo2etrwm9hkm82od9kz37kgj679vpozr175567qbomc2gcv0aelf35m3pqb6yo3ms54csw49taz6a1k9pze8kzo8',
                status: 'CANCELLED',
                refMessageId: '1ot0avaso5k051zipqp4hx263xvhl70urf88wqv9rv0kcn7gc6zd1j5z8ibj0cbvto8gdvm5jnze4y3158k97hpfbzw2w0i9svr9455vq7rszkradutfvda6zuih2ajwiwnqgfcznuwvse77zor2ntlo2bnqhk0a',
                detail: 'Amet nam laudantium quis et voluptatem expedita. Eum saepe cupiditate dolor sit pariatur animi sunt autem modi. Deleniti mollitia eos fugiat maiores eum est est quia. Eveniet illum sint itaque quae et aut. Neque laboriosam quis aut velit voluptatem. Voluptatem ipsam impedit quo quis aspernatur repellendus.',
                example: 'tppwzmmfi1ycrd4bbitj15h2i97zci59dpw0tw5kayuoik87yg4wypp1g5vzry5x16uhxrmqz9j3fgdl8cxma07afny7sah4zsid8a6vmfld953a4gl7rxjmhf5ts513mh9sv0b8rmf7fvf0lbenm6udht2dax88',
                startTimeAt: '2020-11-04 07:05:51',
                direction: 'XXXX',
                errorCategory: 'g40z7htzg0ggv1aa3zl62exv6g1nm9icjtwp01slk691mmyexk78n7epp2an2773gq6xzcws0ru616pwqll5rnjvpevefu33mef16otu4c6m4upulxiqs4zyo895g5sesz5u2nqmcnafpo9e1le5iv1x1smxvnau',
                errorCode: 'mq0f1zrumkba2g6y2wp0cuynbl0ql707iim7y51uxv67aluluu',
                errorLabel: 528277,
                node: 1765174250,
                protocol: '0slvtd7akfwbij8zzuh8',
                qualityOfService: 'dh5lq5h7pgjmtm62w0zt',
                receiverParty: '79pd7tpdd21j3ojfssf0kcaa5h99vxq9tu5ar222r4pthg922fucyddi3w2bt7ijw92e1sc23u5pq10yebhxuc2unzstj3dfj2h9t1urkg4jc5w53qikmofrx8t754rndbfmwe3evvxycofoxfe2fy2tubtgsg8b',
                receiverComponent: '64t63usumygmgdelmpkek8811mtr9art9ydkj82faemjpdwai1v8s2obmoaq80x2m4gdev3mf87zskxmrvnur5hbadr131egbl29osr9fyptq0rky27dxznt4xfmzwh8laxryvm1m1rj40n9rbhn1ov9ozptt971',
                receiverInterface: 'adhzyv6ejvg5rydit4irau2vlycoamm4j7p6kpl7h3fdxwc9ea8dii9ptxj5loxc8ko9ucru0tliwr59gvbs7fn79cs0gn5ao3l8e12f0zsjy0h5uqk0yazcnpy35ue8y90a4c066bht5y13a0zlp40ux40y459w',
                receiverInterfaceNamespace: 'gqj6na6prux9pk6cfpa559pxo02398nwz00l4v9prbyiz9lfbtjchahdbuus3hx0tl5fh28s94dbdkzzsyx5lc4v8abafnfvd5r6u4tweux7xbi06o8d4uck770bab3cot96hqy6cy5ep5719tkgmbfqf1nekwdi',
                retries: 1051400166,
                size: 9541317474,
                timesFailed: 7194876358,
                numberMax: 2829091092,
                numberDays: 6802168627,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection has to be any of this options: INBOUND, OUTBOUND');
            });
    });
    

    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'nzclthr41uc2d0bhx1lmfak7a9mdf0kjir0ezlde40p5si1uoa',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '7x8dx2qdxc9vbs8trml7',
                scenario: '6uhtou0wflmufxp3dwcz3kt3oz0ca3rdaak64bu076hc40kcze7j5rfp7a5a',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-04 06:33:23',
                executionMonitoringEndAt: '2020-11-03 17:01:34',
                flowHash: 'knzorhi2vc0s72xcq5ihur3x6ixsd69vfo0bcl7g',
                flowParty: 'apoue0jb9jw04v0uj7es5z0wf0afvoedcl4ym5li7brqlmrek0uo97k5vrkpfwo4irfgaq3ygj8ui70a7thehrj8jkruztv7q5xf64tm6t4bgasl97tvv71uvx7ahtbvtcey30ukm7kwahrsv9dznf4q2nkii1ay',
                flowReceiverParty: '5t97ez7amavegtgx779isgi8vmcf5fr8lccgf01d6wtf76rjbv4flb4y75lilev7ffnrgmk7icb8o74ctv2th84clvz43fl5uim95gucy6kxxtg87yrox835fyhao54anjul0ghpowxj1zmn6rh60cbx6wlivgkr',
                flowComponent: 'aqqqcx9vtizfvbmfz4k52ojw30u9q1z6t8376l2e08jqyp96l689g5eyzzc2jks1cdputok1up3jovnqu2wuws3505jdcjrbwpmzpnvx0ap1356biakc264hgiv6ouheunem4b50sca9pwthc0ny4hlj6b2mon8r',
                flowReceiverComponent: 'gqotsjd2awnewr8e7wevqmqzj5q9sb6wfpxvlp42j3aaq7ojwpa0dn9j9qnjjhscisec7w85oeig8tsaojtupgsdd05gyth0jvkxvhsxjl53ih73qrfwf7ja6q7huq08ucexcfry6ypnuy7xhuv3od9hqzymei3d',
                flowInterfaceName: '7xd00d3zfhm76er1odboc5cihlua0w9pcqgo9en724yvge5rti9swom87wnn1xiup3v8vaixttdrpvz99v2exqnt94aggjv2m69l01ms4mjomrraofdb3k8uaxqfiiha2dm6a95v67gfyo1cw85sifs73tmn0z4g',
                flowInterfaceNamespace: 'g5mkfdzit7mkzftc8sn9cn0hh1zguz0tu75oz0kq5ijux1t7ohn0k3kgvvi6ob8lotfvygj8klycd685l2t2nsy88kdjzqn6i4c6n36ruzb9qwbg2qwo2c3yono88sum1ft8ouglox0kyhuf4mvazhrs6adb2y4b',
                status: 'SUCCESS',
                refMessageId: 'nmogqwzfb4g9w6cilkrnt1z3jykcpsqi88wgte5d3vhgxwz7wsd68y6xdqkh7softru2gkt1mrt6ok7da48s831gg2bwmjkcwfzimred9ivuswo2g72jp6mbrpkhllvn9c1jzcjjk9mpk3kn9vyqkwy1sftq8siz',
                detail: 'Ea quidem fuga dolorem et reprehenderit assumenda. Ipsam nemo unde sed eum veniam ipsa. Itaque vero facilis. Recusandae dolorem iusto minima ut praesentium molestias et ut.',
                example: 'ewj4bcowzgsuu0ozns2aqyjiwgmli9cl3txq9i42i1bvmg3qrfbq074bznahesc73r50hupbfjt0oo2hfqt0w29f40ocrk3dk081h75tu0h57xf7iadsngem4yo7dbkyfj9ukbjc6mrrn8kjp3d0ahijci6akoks',
                startTimeAt: '2020-11-04 10:40:57',
                direction: 'OUTBOUND',
                errorCategory: 'bjd9bughchtk3i8iw7iautd9low23oct0aw8yvz0y9h2nev68ebs901iw9bq9wqywuemevdqj6t3ujugz9jswkltdvhh6z8hwlob9mhjnrzqi0df3ovsi0n509cca5o72ip6i56fds2w02g9dudxeqyvl1otp9dj',
                errorCode: 'f3q42wp1ujqr7l6yt9gqp76k8aj87b2z1srvz76dlycboiwpd2',
                errorLabel: 515399,
                node: 9705248130,
                protocol: 'khpajte7n8yzfqpswqxm',
                qualityOfService: 'm0e2fieazxajfgaxwwyh',
                receiverParty: 'o4o8gzpqxngylgohoul5xtjrgc3x97v8qxtsmstrmq2oycbnutphhhuyecpcu2fmse0riti5cc1hflns8hevkci18ghqou6kyi73mx8pxijekr8np19l6pzi100l9vqxoxwfwyphhvcqcq9zl482x3emmluo31qb',
                receiverComponent: 'aa1ro1ea5hr07kwhzcn2wwf5idw6mjc4mpxvh0wmeplo5gfqw5dd41g19cn9jle329omsdfhyie69cos5uij5q2h7xygs1o11hcjhnl7xpmkn59sq1tbsdzmessjn157tt33h1ajxu5nzjbn9h8i2wda6uhrhhyk',
                receiverInterface: '285rzmtbq2encoi38fa7bha1ha686di1yo8ohbxun3zvi2q6z5nqlgzsvs741e4itq7znvfgod3z3t1mebjpqcwavsguv950jh5wf0xl54bbrhshj2fi865ryt8k2s90u59hxt63zpmu41amgn1mrrgmg8op3okv',
                receiverInterfaceNamespace: 'lhddawbtxpmaeetrk2tj1qzw2lhnv00sh7c9ruzfc7wu6fm6fw6jvhtg82ntuiurf2gz0ei5br3qt05cy6lr2mri9o2r5gvwmk7il37554ni0clc10aey2746h986l5tk1uzcq1mjyssrcsjzk0afdp8gowtti9z',
                retries: 4875293066,
                size: 8739085250,
                timesFailed: 7928117416,
                numberMax: 8094229230,
                numberDays: 9996093958,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'clkbdn1anc1kh475skzlo2wgnvzwe6tprej76jzpc87jacnwc4',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '2l2xmdpzdgokyh6kuftm',
                scenario: '5dqyyr1mb6tqyj505pxc42o0xw3itfqif2v8k7b3toqtvtby3qo3v76o9oeu',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 20:29:09',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 14:20:50',
                flowHash: 'lehjnnt1gbr3kq9s7z4usam754v97t3wczto8bet',
                flowParty: '7xtj4ne2hyazbolkymqtdgyfcpy8dkzdf9gvv0k4qa545kx2v9bnhn629evwx6gvu3qfdp1gej2m5ujxj941w6onc036ipelawcy57xv4uo641d7897c1bthr28gbznof5zvf5hpqw21508cwu9oigvcrvkgpy19',
                flowReceiverParty: '6pa4iohav87f4dad1p9emnzu9ali37qtgjbfgf9j457p5kgb30qasemniatqks9jbq4673r9vsiz7qvamsqp4l9qh9z7ap8ddg758bpl7cs2vbgrn04prt82kja3v81s5bgta1elej4og5lbu3j5lfh0vox8pn38',
                flowComponent: 'gb020uqyfgup15ug0ejck4rd6ou3dh05sasuoiydtopzy9xpdcogx8931qk386rgdd2qaa64z943jw348wl4ctoeame4siasuhvh88dd20jz2quwdjhwx99gf8hu3aej1jrbf9q7cx4tnp164hb5ip8tocfakp83',
                flowReceiverComponent: 'gan17z76wv9043lh91wcbpys0q0axjhkiwt5aln6jgzhkavlatpc9ah7mq3nyq95l1aaselgl1slu403g1uj4lrz1jqq8org2x0yd9u9r2664d7f07f3mlb8veh276n3ail4u7tc1e0m7wm5nnd85i5fd6nhvx3h',
                flowInterfaceName: 'm8tdh731w91gxh875ux0t31gxxplj6pz1egswhacrs9aj03adykubdgob85fxmnkkj9i86a0iyp6lxtpfj9xtug6wjrlen1vp4p51tiz0nqkq258839zod8ka3y9h7kpecy6d3ezdyawt68cgrgnxlk83i78cwmr',
                flowInterfaceNamespace: 'r6m2earntp7hgk3bsu1n8b0w34ikegtvmmpsa040aoteyssycsaziqasc7gcd3j65oe3ev9ql5d258vrdznpatkk341y9kaclf99blvkx1z3abckgeyaiwq8db2nppzpu4utcwxo59ov8ozln7keeoflaunfpkdt',
                status: 'CANCELLED',
                refMessageId: 'mfqviuxa8ldh4fpzj15libjwp0tmktm4rf5x77h60un6f0bww97ebo3v5yux4ic1j5jplwt2wd9uug84ittr5ap0tqgjnav6ktewc79ma1q61pjxajpgw4znjvtxtj4tplbo89fnbsop6qm7b4u35vf7jqwl8gwv',
                detail: 'Quia delectus hic et. Quidem fuga et. Quisquam consequuntur voluptates qui debitis necessitatibus. Est ea consequatur cumque qui.',
                example: '63ofl4uh0xfjsj4k12kh4ef7oahfmqq120s1ipw0b028hsfh784tch3g9qdcs7o9ff8qq44orh7mp7dh9tlf2xi51i76abksagi5r1kv65acusaep3ue7tny4x50phxypueycn69v95o8qy6envrcpaltcdstlb7',
                startTimeAt: '2020-11-03 23:19:15',
                direction: 'INBOUND',
                errorCategory: '5zvi437txwtqdpi1eiasu8p7w6tqci1s2g50b1jtv6eae3qkzh2l9i29qmaf8n07fov7s2pg908r7e0y0cjm3eecvjz99rix0vrhtkr9qqcky24y1rooljxgbpp50tuiu6bpgr839mlqaf7vr73vffkgi3reow1t',
                errorCode: 'm1okbzrxu5qt88l9jwwh7zaz13d6c4rvyzzazrp86j1o0hxsz3',
                errorLabel: 438261,
                node: 7978122069,
                protocol: 'gdimera5ctn630gbk0r4',
                qualityOfService: '4qd7h2vgqddtmdzwxflu',
                receiverParty: 'l4xov0ogw96a1lyaf3bzs5ozsi4oqd9qraojptyxqr2zrqis93iyuo4tim28gc7s673249qtvd9hnv5cv0pdlag9kye3nnb06bxp9dndt1tkfwcd9mwyfx3dn2zlsbeovh486o9jog4zmqxvt5f5ppl90d6v8ko1',
                receiverComponent: 'fj8hz1vd0dgfzml0ejrt1nfm3wcqbzdg1kayruhpx9it4hdszj6e337s0fa6p6wkxygpdwnb7ugzotbn3qj6irhljau4i3455rcmv6mnx0m90t31brrlt16zjcrzipa7jeo4pay02kfxon5q2oac0y91p37tgapo',
                receiverInterface: 'fgfpcrxlj4yh2c5gtzdc1j329zoryapsi3fahfteaqvtyi2wxilo9cdtklq2g4xca7qi17h8trnwgkg4xfvvb04fz7gsodgtc8raf5qayqab2buzvgwo4z31psdi4oj9cwx6dz6f65dsboij73c71avrn0jg8hdv',
                receiverInterfaceNamespace: '447e6cqf1mr71oym2yrtz2i0olnziuecoznqzt746ouu9vuxmjk9jvz0ovq70a96qucpm5w95r38p8c651dk7zwj8fw10ctt7cve9gj57jvk9j7mdivpnxuw5pplqyigs6nogzawl2jwupawgi4p7wn7092sxz6r',
                retries: 3755377431,
                size: 3093682684,
                timesFailed: 9569357957,
                numberMax: 6227000268,
                numberDays: 8313906246,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'iar0f3xh5kvqila8781q8d1lkl3xif3n7an3w1f9gnc8g10s7z',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'b00d1wfxk9z3khwmw3zs',
                scenario: '6fwgzxlpwtqc0dojo2tqfa9954ghwz4uhu03gpf9ldu28sgepm9byhhlqvop',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 15:49:21',
                executionMonitoringStartAt: '2020-11-04 13:18:20',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 'n546ls7xdpw6wn3c272a9oq9orz26gnaxdv8khm1',
                flowParty: '9mcsfm8emjlj27ftuo1gosmu0cvic7e6xy1xwa7xsy0dkrn61h2edku7e5cetz2lvyhoam2ed2ibcy65n9oopsgsnbgw12hhhfsqrtxvkvc4u5v3n0sliscnuo87poemr5m3ucutxma5r2l6az01je7vllhwmke2',
                flowReceiverParty: 'e9wd46u4zlz7vukwz1a8mf9olzb10z2o82e5mdxkrn7h1t7uc39pf6484f8uisucy3gkgq688detato4dudjbw0yasaxu3fm7rxl35tgmmygfho3f7i6ab7s17bb470sa2eez5owximhqzspiq56knwfqvrsh0tg',
                flowComponent: '26oycb0cr2jox7r8vypuff4gcxjro7e4n2dard7a1yu3p44m3gkb5eqhpxorgthx1qgpg0g5vpskluvodbom5to4l1qcnaj1ssudmxmfph8cwpbcn4aen08m6hcg32ku71hf64sqxrqpcwrwlgbtpmyx5gwa27y9',
                flowReceiverComponent: 'g73wd6tnhm87qhgpqitnw0f4p6mhmf21voziustyu1a44o40yuowo1ypq1o7c5fzs9ct3pdq1oro44405k56w4iw9fticuxwirvdc5jtythhpbrce4n57egl2vta1m7xwf81w9999fu8n7t4w77o9de3amfbjwn9',
                flowInterfaceName: 'xue1twigz1twj7rf8cowp4ab2fi5pjs1p807kdqouow1e2wz85aw744u1e8rzy3wshytidvc8y0imn87fsastnkc4i36l1pcqkdlrricsx7yq3emwk4a61j9ljpqqbaig3tykr7x5s3xa45wwz9a1nowrf87w4hg',
                flowInterfaceNamespace: 'f30tfflo6ew7fhhdxa7zn2pst4tlezqem822st8caj34fiziulbsxszbjl0zbztz4zchoxdh64prkx7y3iybx56jz1i8mawxngarhfjrmfsyrzk7ads23dx3x79p8zhfz7466llum63e8x26y4ml3lk4ecs9bx56',
                status: 'ERROR',
                refMessageId: '0bk1eo42zymuqrasur3kxr2sbmn38db2dwqe13wi437arrcask1bjw13a275y89gv28vecqq9micm2jbucvlci0agq0nz7tqi0wt6sty9aemphfbljnmyz3y7xo83am9gw5xl2qqz9xj2y6vxo61mr0wmbnn4agj',
                detail: 'Voluptas qui optio doloribus. Fugiat molestias suscipit ut aliquam. Officiis totam magni. Quia totam minima. Vel itaque commodi doloribus maiores dolores dolores.',
                example: 'wzgtly9is29g4tv1q1n5ksk7l5ys92ilenjj74l7fjkk5qxhg5wiaxl2m6lozed9731g482bg4vmn4b8788qh5f5ngbz8p0dx9d09jqx75bwjm49ppx4dj6d32xq9pb3evo7vertjecquixdwvl1tsjb8vcprh91',
                startTimeAt: '2020-11-04 13:56:14',
                direction: 'OUTBOUND',
                errorCategory: 'zgv8v7euofad92mby70aynu3k4s246eh8u8le8wazyj43k4ls35i8dn8rthfz3fxu4letdtjx64ckd9uzmct2eezzktqms2tvjateqzzdlmkqz4cq5c9wyxgcwtzcc25v6hp26nim6npchkvsm2zh6csgcuwea6x',
                errorCode: 'n4klcohd87icj92akmn7cwg68hh4umhwbe59t1gb0ou2qnzgdz',
                errorLabel: 852327,
                node: 9114602812,
                protocol: 'kanv0s75zjvq2smkddd7',
                qualityOfService: 'eydfmpg607wotu5yvcmv',
                receiverParty: 'uu0bcp7f45jdpsjevwd5lstblg6qye8j88rb6a6jaijxbay76c2nluklrrrn58w20d98qt3w85jegamrzf1bfwglk7q8yce7i84xo49mh0r2uskwuug9wb7c4pi7jvwqsa32pv3nchf9zyv3w74p7pg3k3ep7tai',
                receiverComponent: 'snt7ily93x4ww036ipo1ktxlc25zjyjcjkl4l9vlwtqka1ca3ggk089xbkp30mi0n96l5pywwmqkb6e9dqfmzci2i4rk0rfetq9mj2o8uslljrkjr9bkro8p0fvxz2iw25pcujsvc9erb4gebilluirv5yt1x424',
                receiverInterface: 'zhm7u93t12b5wp8kmmagp499b0o9btrhbuqk6g9rfn5uwe13dxatlpwfjtaq8o9qplmdejjmhocapx31fwetvxepmgjnwbuflvjisw2m56ofitb3jkn64r6c8bgmj1ps914r30iw6ts1hsqme5kz01argyp8bc2n',
                receiverInterfaceNamespace: 'wwuf13ek9uaqd5ygohjtsdljez0zbqtzm39ldwjmg4n3yomt4c5ta9z1o2cl98sdkmhfsucezzyzwz1whydyjbfyntv2o9tqcqfzqe4a8mo7dab7vhftogxqgo76yju8liewbp7kgsua97i7kq8gd55y6dgcidur',
                retries: 3561900658,
                size: 9055777983,
                timesFailed: 1307583547,
                numberMax: 4237304716,
                numberDays: 5547453465,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'l3z9nxc1rmvot41vsz0mvnvk7cudaf3va8sb0zg57j1v4ykpj0',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: '0613uvtvgpgv2uyjtl03',
                scenario: '3ipmutv27tfms07mn0ixtg5lrin8a78dy0jqppuuo1pxqxfjlcrb054f4tg2',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 09:04:52',
                executionMonitoringStartAt: '2020-11-03 21:42:12',
                executionMonitoringEndAt: '2020-11-04 11:32:52',
                flowHash: 'gcunup4zxqcofqwo09cevuif084u4gndjm61mzye',
                flowParty: '6lk376fkgznmmrwwwp2w7pv8lluhmtnoyer8zpalk53j44mm2sxq2w1fcuwf7q4v7nk1b19fr5jjcun04smr5ao716wzdmxg512iyrgv4fsf251pob59wyrvu4b4oxfvmbcro9i2uqsnh8x9hg4o91kirhwieqg5',
                flowReceiverParty: 'fskvdfm88yqfz3n1cnxci5wukossn23t9qzw6o80djqox1e54tps1vly383dpzswquj2hlqu7wwujyne04ylsb45q0hg60nvbwgypi2oyvf0o7x3fb1p8ix1mr15jqahg6zl33vjy52of211t5iv57hds3bfyc4t',
                flowComponent: 'cuh65hrrsa4vman5vci1etx30wut3ryex5kvfzr152s461lm6ylv7l0hllzrwshvt6w6yt4a9aza6k8wsgdufl3ho2bj969e24wcc3n7ur6p9n1v1mlw45x7neecqvnb329pfczy7pf53c7u7tei5unc9lakoemk',
                flowReceiverComponent: 'x11dr1eh288d2gbn3uznndxy3r5iw6lvk2rqiftp9t8vxvv95kkocl1o9blsdbp5jq35wio7oar9nr7ib40bfxb7kyyd2ce03kh5upjdbyvx77qyjyls1sgcbbvqt0nyr9jm50rfewsqw5zai48iccvjyer5let5',
                flowInterfaceName: '04rpy7phizoczflla7051y3mpus09fbxgrw47ejveq0t5xj7ppbyvpf0yuvftvuiufeo4e0pelahflhzog3weuj54rnt5or5iktf1actyklj1hmit70tojvxq0h2x16axgurr3qenzk7ryrsi556bvevw7jzj2oi',
                flowInterfaceNamespace: '3esimf682e0xr4ep9t2ebwx5y79lp0lsqhrp0tzf0xdwmxh6ip0po6x32g843dagz7n4832qo2ol54chhehvzvqx8l1gqzxiqofuqbqeb2hhrr5ljcsdhddpyi4dm9eshqcl310m1i65mx1jsvtlj2kyfk4pvo5a',
                status: 'DELIVERING',
                refMessageId: 'f78oh3awh13k6w73tvs2uqwawjc38ku2ogast6wljdl1cfe5vkciwru3wdo548ybv6fk1udqse3s4msy2gsvuclssru7uqg87pygg63lmvhdsnxx1og2kvneyd67j5v37dotr0kgabr4kpevygph4ebe8td03bo8',
                detail: 'Qui dolores quam. Aut dicta pariatur aut deleniti dolor dolorum similique alias. Beatae voluptatum qui sint et voluptas consequatur.',
                example: 'tglufc7y6qvwexdtmslzsk20hsyhuugmreyt648i0mes360pudz1ngc1orrwyhsl844g4jxznt38spc68cfhzno92xisli29b58v36r1zulb8ojb6ay3ahcjk30u286zbkbiyz20sq4g8yz53xy94yaoopp3c4ss',
                startTimeAt: 'XXXXXXXX',
                direction: 'INBOUND',
                errorCategory: '1vl4bzy0i1mkjzmuvw5mwoion0k5e16tz6w3t6ix5eq1nvdlvj4cqppjtt6ckdrylrw4l0xm2qt9k0pkjlxu42ouhi7in87mgltrev5hvrkjfaey0o7j51hqnlk7w2105qptl5ic0vuzulvvkxwgtsqt87qityjd',
                errorCode: '5de8yn20ymbo40jlruq7uguancmu598sscr8khato3pwdovn5p',
                errorLabel: 976661,
                node: 2026658977,
                protocol: '7i5k8jwo6u1v0jlftcxc',
                qualityOfService: '6irxtph34jlvbzyc6ekl',
                receiverParty: 'ieolunua60mc6cj8f0am9vkdflwztb8sl6pmnddje1sg8nfqnhtxa0fh4v2ztknewwypfmdzlps5x89guad6v35zzolws7hy1du1liog12dslrjegg8hrhzc72hf90669nlp815xj9fv85a1p15umt4nvn3n9u5u',
                receiverComponent: '3d9oyr4hayzc5e7qfzjz9pho3a4ekpsy6oedwsppy0qyaqnv3oozha36gmx3biehcrohftsb4uwakmv8ylov5cot39gg7ldjpzpylz66rjrl0deuok2d9h0zfbdp8c4lupqpeuhzidmdws7sk6swlesznpzfyitv',
                receiverInterface: 'pkxxd5fb0tege1bhv77cvpaethnz3k8fp6lv282n4aaia1399wl39667mdh9adjkkim27lq0dy5c1biy5v0jkoo34kr1qrxva684feedw4xwb0eosqmi2b475acnekephnyx7u8u6eg5q5kbvan27z7c2juujfch',
                receiverInterfaceNamespace: '3ar0mevwmy1ws9vpubao2feeozipzj9r9jignerkbd2vgyuv48aoox2rrqamu4zynl9qyhf78cg6ld6hrfo6i5tmzbvp7yqd1ig8ukwnci37dh7zoirc5sj0kfhgolbmjsg6f2nnm1kkmr4yv1jt6bvh2daryt9b',
                retries: 3560880550,
                size: 5895619252,
                timesFailed: 3716739299,
                numberMax: 6247513762,
                numberDays: 7120464581,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: 'rzh22kbhgy6k0ci7bh6qj2whrat1k90ulxc09xsmvk1du3o1vs',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'ji33iqnrck0578ztw26d',
                scenario: 'nb4wl6094lxse4ukb4x7d90pqxd9lnmhvopote72zjs2r29cjq2uf9inctjp',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 16:35:20',
                executionMonitoringStartAt: '2020-11-04 07:52:16',
                executionMonitoringEndAt: '2020-11-04 08:57:45',
                flowHash: 'wmqesa6hy6aasxnijfcrtvpti9ahhq1ce32p3cv9',
                flowParty: 'av5qf2s7yxze64k6xpn16butleo59ei1v15ikcg5yfsjtanomxiit53z6vt15alt0ygm9hjhsyhgi7q91v67nqb72cmjuccn45w9cdtc42cvypw2ahy1xwc027ff4acctlpfpvj11t14k96lx92ayn945po4ve0m',
                flowReceiverParty: 'v15702gjk17mhdnwcewrumwpv0iztc5odbvici4mw4uh062zkc6b2uke0o3scwa24hnhn53zg531ncr85udf8ymtp0p4h75qprc06aaon6henabjg4vd4pvo5xzjw2od585jfpvennokrkbfvxk3vq4e7llbd0sh',
                flowComponent: 'nxrqsh490y6k673lpmxi4wffie568p1m6ubpvr2enf9xnticb0asl2bo9bfjyrk5u9pfohiiw6avzlgcm228c1vngslkksqt6tuuwv12jlmrkcksmgsmf5njwnlupn0jye6y74w6wj5lz434es0i4ueblahp0tll',
                flowReceiverComponent: '1xawlln0hl2z269y7rlahfabu2ouzjgkcgbxmyit3oknjpj93depcwkia98m5yckdwn1prwsss5bxiv1l3yvfkjdlscwel9xxq16anol8zn71och697jpjdxig07vp2vnuv9rxuyyub4nit1kx270v2k851q9gwi',
                flowInterfaceName: 'jkk1urg3ztfc474ixs8wm3j7e4msculgr1klbnijoqg3caawi0pxe6mlpd6dvgoffsn2zmpo977bpslq2ha0fvv3kgo41iq3up7swuzmz727eliumiu4jba5uk62r1skeum4btcspv2uzwqvfkb6cc2xnlm6r16k',
                flowInterfaceNamespace: 's44ne7gqcugjacxt3zgpdzlw1clemv2vd840c140hd95npdle7vhi1bk1xjab097d489luhxl1ufihswdddtwz8gnrowgcxe6iwaeyc4b7tvixt6sxvd0kizst0f0tn516ev601xgj6l41c5gu6jotjw507nfusp',
                status: 'CANCELLED',
                refMessageId: 'fzdrlopoguj77syed1xgh9g40cwdsn2nk0u79a9dd4rbssxag9rhj3rfd82vmb421349i5nljc8e3ww831a5px359c1xgv5itsv122rx5bd3wwi5440woh7sktas4nrvfyjcb1fvisfnt2bsfrtz44z7tlzx0tjw',
                detail: 'Voluptatem temporibus omnis dolores qui. Quis quis velit ipsum. Et id vel cum voluptas aut deserunt odit omnis. Id at ut provident error illum fugiat sint asperiores a.',
                example: 'ljdni2e2fsdm2bbw0nmw25dktjfyni23wdd03tqiokntir813vhpkgln68i9cs5mrg9kaof65qlrsgd8jols0ucdjaybcdt7gggioawjwon32alkxeaz2mh5tp3wa6gsi1stxaanfucdq0ct5wee382dat6mu17z',
                startTimeAt: '2020-11-04 14:00:55',
                direction: 'OUTBOUND',
                errorCategory: 'lfmbefdiqbd8uj8ceyzgqrwdrlnb49gare8u26qic0sbapamwzi392e2o98e1nndipqkav11i1xiiyfx97sjnhiwrd7a6scqgazhgcaakzpgars6sw9ihqxg8av3ajv9rs3xdm7ils5kn5fo8f7o6jr2gefouvn7',
                errorCode: 'mmz6tsqhoumicapbosdesi56lv2bio9ql415vuh31kr9kxb71o',
                errorLabel: 248341,
                node: 8344059798,
                protocol: 'gs3jvppj2vyhowz7zeju',
                qualityOfService: '906pqwws0fr8rt8560d1',
                receiverParty: 'pp73ec8w95jkqyalkp35gganp7qrs0wm5o87st41cmfyrwaui18m5q5snqcivhs4peo3v410bk2i34s8j8eijs1uzw1sq956q8kggwwdsklcm7w3l8lb5e13dcfifvchinocblyhyky0whbimx9apn1rphkoiyg7',
                receiverComponent: 'jp6zrtkobiyfwwka946vehw7volfbeaxz41y1g292hfk4vlde3ecxzwanwxjsrbf1pqx17ecj3z1l1azid4tat6t8w923kpz41dghs7tjwemjof0mpxw9w8i2ecw79ftkp93j077gr93bd506otswpppacaoxn2i',
                receiverInterface: 'wfy20qjech6uf0kh19dztzqwfveqlc1p6ghuzhbcae15dn1uq66mjs1wwzi2ydhzc1ptc3d3voh9nsmyolhv1jkku7lpezqgpr273qsf88pn8eu597919r92yhzh8uvdokmp1kr0thtz7nw3uf0ksja191hn24zk',
                receiverInterfaceNamespace: 'tuimmhtl1gvaiupauih7fwpzifrvnibm10mgcij7hfut5kmlgv8yf0iayq2x84iius30a9enb9mhy2exmoebia8dnidk9gvorm3eldxvn8mi82nc852zuchjsb1w4xuam2egsw71itzzfxg1x6soyhklkp58o8ww',
                retries: 7507705615,
                size: 9146666526,
                timesFailed: 6913093884,
                numberMax: 6671379613,
                numberDays: 2695421340,
            })
            .expect(201);
    });

    test(`/REST:GET cci/messages-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-detail/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '47a82dec-7277-4325-a8ba-2bb477356042'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363'));
    });

    test(`/REST:GET cci/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail/0599820f-f3e3-4ab9-a3ec-9b6f0fe2536c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail/d78d30cc-6ee2-4cb7-9282-14fb53c0e363')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363'));
    });

    test(`/REST:GET cci/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '0c655d1c-9463-4699-8f3b-7932e0ef24a2',
                tenantId: '1c8ee28b-cebc-4f29-9e57-4f81932bf663',
                tenantCode: '9e17er7qt24bz2g7uo7xajdytumwjawv97v7b4d50v7jv8flw4',
                systemId: '73c96793-ee1a-4392-9e2d-85b88d79c6e9',
                systemName: 'szgl1d8s5jjm92vl2q36',
                scenario: 'lay81vmnssq0fjis037pm2d9beldne53ka5trhzpxmz7ea55i9drnrt7928v',
                executionId: 'b1d2671f-34a3-4fe1-a54d-7c707739c4eb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:33:05',
                executionMonitoringStartAt: '2020-11-03 22:16:35',
                executionMonitoringEndAt: '2020-11-03 21:02:09',
                flowHash: 'o95oar20tf29f12ny00wrahevvkv03q0c4v87o6c',
                flowParty: 'q7xo538zwu8v79vss14k7ic1gq5ipxogrq3gscor2zntebsf5ap4eelcbjd415ztjwod6ae2hwyjtd3npfi3jrv0ldk6s9ybottzxp5q7ieljnbj6eur94e2fknof9k7ao3btshtogzdommpcn2k4x6if5eeegmr',
                flowReceiverParty: '14nyzi1nka76yf42k39vonh9jwic3kaw0tez7bxwzuh37pj6gapagxetvcny60f5o4tn1vqhmyrcpvwa3iaxx9jc7b2bfyjlwacpczy0btbgzmytg9ecjel2yqpn38a2dgtm33rilf2cf3qbm5mw2ohpu5uprak3',
                flowComponent: 'fpziva01w9mcu7e8uua2sx9cpjzvdk11sjytjvjitmn273l32g5eo9by5cwtge218cees1zlqfz4de4zm7xy1xxur5q33keylxbha16k7nj7b9cxhncmcc1fqrqd1ncpvvlx1ogeab29rjn0vubrohzmnk8eyaro',
                flowReceiverComponent: 'twdgpccmgk24g9z4ywkdkmdarwtzdx10pf9ldsr4gb7p4j19y2wqs1peqiroynpdbgw95m38yg665sfel34g19bga29vucvsst6ajfnpqi2xg6pfesve6wgexu8k1w0fc5k220x9yu5eani5zqtj915iqw15k85c',
                flowInterfaceName: 'ckdmjswhzrfrb8t9t751587xna3h5cvzimbax4zo99ozb13k6pigmxpqy9r80gzfijeru6thvaoeq2tz6czzuasg40rwd259lmyxdgvur0g835di8aflyafo6d2zf2at81d1hjkymt2e3bmiqmt8g1f0bygannh1',
                flowInterfaceNamespace: 'k81ytr09fwfx280bdpdjyx0sfgfgp4r4csu1vod5qkllg1mozqea264hkol8mtpbrh7agd966v3qr4iujugx4kb699vfuv8f5emjekcq59slxxu1mhytz8zee7hmdj6evllz4bhkt1e2qnxxhdew7v8sazuy1n1z',
                status: 'HOLDING',
                refMessageId: 'o2xpkilxq4o9upm7ymi09x3m9i759zab70rt65863ynxjj3mv0tx27gvikpb7j9o79a5ba8szl7j8u8slc9lc07lso3cqkh3g25x8mbfkf7ti1trppkr2yh2qk6c1ahgp9prhnrdft6rwd06oxbzb3zcfbbicgkr',
                detail: 'Debitis veritatis vero animi sed corrupti. Recusandae atque in commodi non magnam expedita. Harum optio quae unde consectetur at voluptatem eum.',
                example: '7mfkza77tqiqon1omeb5xg3kq450avprtvvrimml8rq6111pni0gglzbhofh125l2ze677cc9jfyrmvuv8ezwtxyaa9ozj0bcr70ipjs7e8z2x908tdwyf4xotp3994795nzhhcdqvp1ywnp2o0itqldn78thl6n',
                startTimeAt: '2020-11-03 21:57:24',
                direction: 'OUTBOUND',
                errorCategory: 'xgv1jyextk4jl2r3j2a6pyt98zsy3ceolmwfukp3wo6ocvw6m3bjhydo3sertdrpwhkkul98qhdtsq9n7vlfce4xkce8ejlbe6ys7sr2xd7xrhfo5cekha915uuba14nay5ssu0ggm1iyjnl5lpc027jqdo5kjtv',
                errorCode: 'q9s5b8nznet2j8uyk2eyn7w1dppl90krzw7rmv4zwivtpvth6b',
                errorLabel: 669538,
                node: 9485253760,
                protocol: 'eqs0cuy5klhixu395t5m',
                qualityOfService: '46q7covmjrvx8ynbmii1',
                receiverParty: '4uvme1ynxofoa0fshsk2dokwrycg8j04gk51f58sz4s94pubfy1qoy7pgvckb8xioarbm1cuhtrhro5gwlfbri91vtcv9ok38lxmp23gbc0g2ug4866blnhlc8kynv3b5690s13bkdflrjbf19oz4bta06w7g04c',
                receiverComponent: 'pdpqj1p1sqj0pgqkxjybuojocxpiw6iyie0yn1uspk0omshca83cptr93stb0fxhkbl9oe4furj0hsn9p48whcnid0j8dr3lz5xsp5w6hnyctyyfgrzobwh6q7jcfq1t8ls2ucjuojh728cn9f14vma2c9egsis5',
                receiverInterface: 'wy9q4squqygqtxr91y38l1icu72ua4qvqc5ir1kpi1eqrob3ltsleton0ohsnbh7u92gn6c98550a5t7s1tgydluc39uqjsaiw57n3u3upsorwyfwktdynge9clz1e2faz607qpictchrbnq7584wzidfk3s80yi',
                receiverInterfaceNamespace: 'x20ukhnk0wz3ipvh7mqbzw9kh5kkutofd2grk3tsztp97a7368mylsstxjwdsdo6kqu12ipj6q341jwf5d51nnj0rejej6a4qkcw6ikprqjuqc5lr3ewe5lnowrhpsk5712kwqmh8jy3e09oi2jywpiui5omrq55',
                retries: 5373115618,
                size: 5704001344,
                timesFailed: 2264913520,
                numberMax: 5145946079,
                numberDays: 8806833837,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                tenantCode: '8qg1bm5z5l7d19zqf8gxnbbfxxa0vgfoqp1cyn30zc8x7ly2dn',
                systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                systemName: 'alzamngn9bljs2heoc1f',
                scenario: 'hg9tvx8nha1j6t4vzrxqrnko0wxl4f09fiynl2mjbagdza66racpmcsmykg0',
                executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:55:11',
                executionMonitoringStartAt: '2020-11-04 15:29:06',
                executionMonitoringEndAt: '2020-11-04 12:20:04',
                flowHash: '1bb95b1bmfbpvfet591kxqrxion11lpyf51w80t5',
                flowParty: 'oc5r62gh83yg6rensjbxvb5niz9aw0o1pbcm8tcxhx71mco73bkwc1m714b1r65rfnz38dxt5871zrqwp3sqfxu987tc6mcd32vtmc87o797knsmisgy1b23wkbe4maogyto7saxlitjz4abqdep8rbppjl22u6k',
                flowReceiverParty: '5rxatjrnw5qkrf9asg8as0vm3jmvbrg7nc0v0yhhu1kdwcu6q6fao446uk05nucyirwd89w04zmwvtgm5zqwhoemghghkk5snozxkgyt0hdl3vbifn2rdlx8vkcpbph793ehz91pp2kbg148pnexf9dmdpm9wm54',
                flowComponent: 'akgt1gb5fh8x3vkz962npd6pnvbnyibxeuphctl3vuix2fmeloyw0taqsorptfs67s8uoe7018066y8mva3kt1llk0xo7uvhdnvflebdftmbxs85ilb7ux6wyh0lxmjrngh5rv50d1h0epc2z6r2n5dw7jevlfzl',
                flowReceiverComponent: 'wfb90lmwcbunwos5lr0pn4qvwshxthq5xrdn2lqn8tug47g0ozey0r77a5h9m9bh8ts86c6j78v2p4vd8pnivlqnpmtaz456d7me8uyjqkap7oqb78908ywobaqwq9ublw8r7ttstk8b564ep5wjrp8mrpygo90g',
                flowInterfaceName: 'jo99tc0hwiumzql3xety7gqtn5jeq0risj5vk42wqmwjspmvt4wa679biuijxq3cd66t4dw4xelr084i1l1mgi2cw4ozixnfghok1l094ho2zjz4o1fllemfthzbk0xee375ssst9cexgkgel24jo8tnooyo97z4',
                flowInterfaceNamespace: 'rwjowmkyqrw81tsipe0ryrss3tizqkcfuw9s976r2fz62aes71rji6lx4o2s1a3jyjd7wghcal077k8ou5mntb09y8kcrfqm6b0b3l4qt8nzmkdfbpf2e3bykio25tvfcxtcoooy960nhvoro6e1cmop8mavroaf',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'vh244f16ahleoqimie919c6ybi9uingkdlm5c1v9sabba23zv5se4q31e48u7lym8nqngzpw7qutyk83k3tp91unb7uqbg3r43wn193nok6xu888w3xfa4u7ebe5jortogu6juqy825aeb1b5d7cytn1x3yq51dn',
                detail: 'Voluptatem autem nam asperiores earum quidem non suscipit corrupti. Qui quia maxime quis. Eaque minima non. Ut minima eum excepturi nisi molestiae ut.',
                example: 'ymnsb41zlsovgtnt7nzgpzg0einb8irrs5pzgg69nyjsrdsh7g4r31phbexom20kpmhg3f2gzh2kpxsfvnv5m7y8g7uhs6wvmye7i83bfa1ulx33hcp8uf6183krgp8zjfjfgh91nd2bfea74xswne5967xzrc4i',
                startTimeAt: '2020-11-04 04:58:50',
                direction: 'OUTBOUND',
                errorCategory: '378gjra0pi5gv25zhg1suiowlo0rpq0kp01k552uyu45zl4uxlyg1xz8vtd590kgwm41n6fijdyleca2dm6w1rj0r99pab7g1yof10pacl7usu8cqd3cfr1t5yh23gb4ak291pwvh3uebcausidg3d4qyo9xvfmb',
                errorCode: 'kmfvg0nc1dbddnpvr1j743ag0m2hmxtm3ks8dho83kgfrahvhk',
                errorLabel: 602503,
                node: 5317699013,
                protocol: 'zozxcmqa34j6m0ai5n9p',
                qualityOfService: 'moxlrnd2phhn838ud1m7',
                receiverParty: 'yeftt7m2rebxakvh84dez22zsgsqqyrf4lmp9zxrtmijnl94gg3p1347ifxzksaqs57m2yro5ii2wh6tx598dmr8aygamewj9b56k3670y0yg0c51l0qnn6b4koqzwlbtp0fznzzwxojnnrwr9q18iqktlz6x3f7',
                receiverComponent: '8e3k7uewzg4pp3youhzm3ivvvr3rekazxy89oq4nyezf2ypxc6uyumhhvombz5p55qm53kjwfqju40q69k6qi9yrlfiy4neg1vf469a5c206pz6teiwt8864mq8ovnfst0tormudcdoyi4uwl7fxp976lzcbtiu1',
                receiverInterface: 'qgeqfkaawhxx4bc2wfe4hzagehpxp33q2h2m2seem5ta7i2n9q2cf4u9k1rlp8l9m9onw3g8h50x7e90s6g2a3h66xl4aowkxubankf78ksc7tmjsi1yp86113kixqnjprj83k3tg3zye211vttzp46zdh9xv0o8',
                receiverInterfaceNamespace: '6csf2qb6og8vddpqd83yx7od7ch8to7bg2kzrwg34jbytao0nso6ejrlx5mby4op2z7hg5k0yaybovavtw30u6ya1remos3rm0kngsj2xnk0qg382mgzm8ztpid0ft7onw0w6qp7bddyey1h416q0lvmj3h550j0',
                retries: 5612851760,
                size: 3491960730,
                timesFailed: 1135633702,
                numberMax: 1300606218,
                numberDays: 7020448403,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363'));
    });

    test(`/REST:DELETE cci/message-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-detail/703eedeb-7626-4e34-aa73-f409782ba5fe')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/message-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-detail/d78d30cc-6ee2-4cb7-9282-14fb53c0e363')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateMessageDetailInput!)
                    {
                        cciCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL cciCreateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateMessageDetailInput!)
                    {
                        cciCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'a4692f76-f068-4c06-a394-59e29edaf185',
                        tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                        tenantCode: '78ok37n2tmayjfsyw4btykxuray03tcjdgonsxdw4frxpn9vrl',
                        systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                        systemName: '54hfb3eiganb60sgbpt2',
                        scenario: 'mwpoma9qngk5b6saharw6hyw2jkrsau5n5kzxcoiig4x2phz50j5mu6lchvp',
                        executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 03:08:05',
                        executionMonitoringStartAt: '2020-11-04 01:02:17',
                        executionMonitoringEndAt: '2020-11-04 06:48:56',
                        flowHash: '4pz08jr1qf52oft1zwf2d27st3dgvr7o3fxa0mf5',
                        flowParty: 'wf3rdthvegqllvkdv80iipvdux1lganc3nkx0savuv6scogs1q1q0l2ptpcybycqy9drsn5606nr9k118fen9gy3wrg4vs3asw4bbgd4vrhg06fss9304ljznxtirijmb15bu98qxy91tgt8dw988tm9fvjt2bp2',
                        flowReceiverParty: '6h3mg9cj5p9pblks2ij7uda7w7a1va90eoymvn264e1dd0nzn5hnpomamdazkdpz7yixu10enzmy1pdhdvwjnd7tgfeyya9ieq55kb91pvo6m59hprb5eupivwjh80ge3zgm00uvw49hfpvtxy7wdspfnjsx450q',
                        flowComponent: 'iv0e4v42k7rt11pi894nj4mtpc9aurz7n6duz2uyie0eao7tf73bnu079xo5dfnr3yxd4pmm9h06hth1wbfozhs6jmvwfq95phrovi1z58ke361mqcuu5au4z3d31ln1n0rvddhjhe8efzbn9b5pft99qoogp1nt',
                        flowReceiverComponent: 'qmm1bj2x6jkzs6qgjjro7xe2jix1vbkrj1v0gtdizsbohpjcg5li3vcyl4wlg95hzh5jlwgz4aamgbt5nldove15dg0sx563i754rv5pc5x6471u3616qdtlcatqsbmfvalp0sg31v4rttxqm9t9otxaz7648j5n',
                        flowInterfaceName: 'munv96x2sysq004q5l3zc71qayzq3ctu3xvtw6kbh90fxu5rxgyse87g2n6z14w42mbs1rlbyki19lze5iaksnerttyvtdy5ftu2knrl68e3rmoe7ak2ukf4sclor4ogrtmu5bass0m349bb7j8gde7vel2g3v76',
                        flowInterfaceNamespace: 'eifinvclg9rvdfmaixgep3jxmh6vgx5ptr9c9g6bmdjkhr3rqip1czplhj6xu13zn0yebpe8e175mg3zvjdy9r5o64x6u8l6yftw48nguhrlfkdpoo0zmyn2bbjr0ciabdszqbnqo46mjz9yuafp6xebq30mty6g',
                        status: 'HOLDING',
                        refMessageId: '7mtshbi0fg37k49bc8o6ugvw3apleurn15h46otjzqv4kr4rsjcoiluqrzm4t85sf8d5qukup4mjnqgoqlxeh9riph12jgalj9dwcakwxuaxoar347tio8i4gwj64oxfsfrymssqmv2m8v9o54koyxy2bjaqf4c3',
                        detail: 'Voluptatem sint similique qui nemo qui est laboriosam. Eius quam nesciunt quod iusto qui optio. Nemo minus dignissimos et deleniti. Et molestias tempore.',
                        example: 'tw8l13xakjjvbi7r2mntlzomj1x00mj6ll1zrpci1ti3zkjo1mkbpiuxae8dj9y0ie8dre77bd9tqar2l831033s58ha97rm7944942b947ubf0rb0m2mreocauoczcidblz9p27t4w9ds0nklu1ujjbnvzvidzw',
                        startTimeAt: '2020-11-04 07:43:24',
                        direction: 'OUTBOUND',
                        errorCategory: '8rf289ge3sr3ve9qewryifwwjj5nnvvuwh09s5hbqweafzwj6m8duyasf1a9k6eyrlaadvdsspo9h85bgqf88gwhvtj7odn0ksoal66ayche0ofk9gchrtx7zml5ilnxcnjr6ekcnl3ohq86r7l1qmmuh6lsy5nc',
                        errorCode: 'x8tpqpetxhhbqmx74iqmh929cy5xeb55l0tyx57zxpe5qum48x',
                        errorLabel: 657533,
                        node: 6173339131,
                        protocol: 'f37i8c35z3sy887y6ff5',
                        qualityOfService: 'v6t5ej2x3mhi6g7ogqd7',
                        receiverParty: 'v5yfh90cmuqqtgw7fpqq5tglr705qvv6hnb75oj4oyyj6nucucidj2vrgk1fbnwnehcouctjbfrctkdqnfvwankv9tkx44mhzzse13xd3j595hv01cgv5qkr2v2ogatvwptzv9b4nebuk0hx2gmac32vzkqktuj3',
                        receiverComponent: '73dolpxe97838vis46etr5uh4w45tjr49iwlk5t1p9mhitqoy61jzq4i1nbc8fv39bdc5m4nz84ni9udnoggdh9frfjb94uwspqi6gxztkmnwebdjcf9pvatdgq3k36yq47gm9gwf6nzovx3ef6ge22veive2tph',
                        receiverInterface: '18ued6shb2mkp6trtvw8gs0gx8lyigqat67jj5j77eyjqh89e14v5xqsecpjcclnbb6iakbk5gkq76mlvpg3rg8kqv8z9avvnzyeg2keahr8s1342p9a6sy0q4dngt3g6vpflwq7ezbv70cnyeirhifl9i0w8x9y',
                        receiverInterfaceNamespace: 'd8py7jyk1yt39atlilbt1e46rorhbbs94xalwd0qn6cf89hoxvcmlku5a2r3q3ced10smbwerz21e7el7wsbx2fdxigxu0c9ko77jt6is9r1g2hj0qykfs6ifzevodlnrvxesspdec2pfwdcur2qb0datk6ukj2d',
                        retries: 4690009779,
                        size: 9906125930,
                        timesFailed: 1017060550,
                        numberMax: 3957223051,
                        numberDays: 5235416358,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateMessageDetail).toHaveProperty('id', 'a4692f76-f068-4c06-a394-59e29edaf185');
            });
    });

    test(`/GraphQL cciPaginateMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateMessagesDetail (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciPaginateMessagesDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '5a17adcd-eb5e-42b3-b647-064efc5ef69e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindMessageDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageDetail.id).toStrictEqual('d78d30cc-6ee2-4cb7-9282-14fb53c0e363');
            });
    });

    test(`/GraphQL cciFindMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7d99f1bc-2364-43aa-af78-45c274358b07'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageDetailById.id).toStrictEqual('d78d30cc-6ee2-4cb7-9282-14fb53c0e363');
            });
    });

    test(`/GraphQL cciGetMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetMessagesDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetMessagesDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateMessageDetailInput!)
                    {
                        cciUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4e74d980-514f-4bd3-ab26-3dd74430479c',
                        tenantId: 'b0a93bc9-b44f-499e-af80-a850f781b52d',
                        tenantCode: 'lx2e2anirrkmpgqxlcwfr288vjxhhyis4vh2rx99y49glqld0g',
                        systemId: '194f7839-10a8-4ca7-bc66-d98b15166a05',
                        systemName: 'b00ixbz0aphi3jx4rx3d',
                        scenario: '9tlxyerunk21tggwao1yffs4wjb7ywjigxubnbs0o54nd4wgvy6lw4qlnz5v',
                        executionId: '059910d9-bbc6-47f3-8cda-cc6f4e989740',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-03 19:33:57',
                        executionMonitoringStartAt: '2020-11-03 21:48:28',
                        executionMonitoringEndAt: '2020-11-04 04:21:05',
                        flowHash: 'l0dv2wj3tozpd7o1bc20xwv5wcmw7gw11z23ijtx',
                        flowParty: 'n1nc6ql4vshzgt40xl7xy49ia8avec2x83kri6f5w961ldn2fornk3wew3n09k16p8xeiru0jqfgkzwqgr91dq7z1ir98dbck4tmwwmu27yae3gwj2gua6dbtoo0cdqwv9a4r2kldvnews1usojvzwi38xf3iic5',
                        flowReceiverParty: 'w00siyrdz6z4uie7y7avrkzinnfrv7ifew0tyuwt4poolacbygauncbsm8qfjo5615au8rbrx7lq00ehe23asg99qhxugqc6xyq53adi44m397hdc3hbrkkb1dw0s2yrp84sc31w815bzckraqhqtdzn5dxxt3wl',
                        flowComponent: 'mv56bmbxgvrx0qqqtlma3mx4qfjot27pspjmvmmy7idpmi2ew478x0s8wfl6opz8ps4h1jqd1wt8hix478vdzi2xyx3g6zxp06n3xmrwrscqm9erk75or4ts4xflf2fb3bcmtv2dme97gh4fudw59t0wtq9aod4q',
                        flowReceiverComponent: 'ou5n9jnc10boj5wqwywfaz89owy28lacdengxh735m7a1oc3y7gy1sfwp7t49hqobbphje04y6bz8h2rij8z2v4r32jlx4ugbgy2mbzq2qp3luz8aw40fivkns5ozxhgo06csiw7350heerano7og5ne3i25gxj1',
                        flowInterfaceName: 'i77m1fkx6j18vuyd1lqx16ys805hadmbfpqd2vwr8m3rnsfaickwuliqf52zz5pxlf5hzdsuxegfsv03nfy9qu1t8bwivqlblsxuez6wow8tv5awr3int2lerenq1wk1l6oqlx8fk3vkmr8lsu9d2smh0qoaa7u8',
                        flowInterfaceNamespace: 'lnkdz6f6hsxys0fxsf1aiofmlicd9mujcuqva11vxsd0kg9vqtz5a8ehe8av6na0965pr32kxqn3691nwiw9ize9j2ar2bflxe9qjf7u43ohqguf9926uj2c8jjy44szvcr31rzy2xxv2my5df2b3n7in16cz61s',
                        status: 'CANCELLED',
                        refMessageId: 'ig188odhgqono5tro7juqgakatjfd0aua3rwcx5khgd31vey4zbahcx7mepcp1lfyx2lc1i17autrr3ng8fki43qdo0jlq3cag4airfgdqgbhyk3rugyhbl3lowgwpl7pbya6exaj6cpc8jh8yxzax8rv0y7x698',
                        detail: 'Quaerat saepe earum et. Aperiam minus cum fugiat sit commodi omnis totam. Reiciendis vel nihil sed officia ut quis autem. Impedit voluptas cupiditate debitis sed rerum. Aut reprehenderit iste cupiditate velit.',
                        example: 'utg4nbocdjlut9bti6rfhbw6u3bpx0mmtyfn2v1bpjyu6jhdcut98ai40divt4vft7urpt4ss9ju65motvms1c2rnl7wywbcam025csz7n5di72yjzviv2ouhtgplbxb5nwf8zezvws7hnf4v0o5qvpkyepjiksu',
                        startTimeAt: '2020-11-04 03:46:52',
                        direction: 'INBOUND',
                        errorCategory: '11rlfleodgcv6fixxx55nniirgzz7ocx3qplyxf01nwrawvmbd5nz1ixmk9lsoqyf0glcoysx61yl17cw3yupk4n1igywt2c7caurpp5o6w4r1pvq2d2py6avg62fqjm77ipl4hgl2wooklvr2qlkae2k7fsrmcl',
                        errorCode: 'jzi4qvmzjrzkxujmdppkfq1buzj7dvcm8jkysy79dr0xdjp5ci',
                        errorLabel: 632932,
                        node: 7363847841,
                        protocol: 'ytqwesncxdnmfbs6g5of',
                        qualityOfService: 'l49f32njpch46pue9ogr',
                        receiverParty: 'kib13k8fro9k4knjrs9lbsy4f6f7f5ez5jrpiunxhwmw4418ah4wpyz3cx1ahbvev7nrmjjscsywp3qmrqjjmz1e68qbyrgv6blro4oh0lz3xb68c9ypys22yzn6hy3s4rmtapgc4iuq850mxzwzc3o7ko5y9oaj',
                        receiverComponent: 'f1sm5axhqp550camawpibv2chlcw8yp6aohnoqub1lzra909qgpzcn87sqhvec0ea51xwhckaz9j5rnla7crfk8ev4occxrq1150al0hoi5fdm08a16c03nlih5ke5j9pygkwfpajtgvw9dobrdsbozpl37oxs10',
                        receiverInterface: 'ld15tp8rdigw5z0a808nxib1id6kzou2a3p6dehzb7kzyapwjj2pk4gszh3pjzyc3bvyb720mubihfu6kp3pzjvytggtuf9d3v24u5qmy6b6xrno12bdzpbhky929enwlp2uxhjpxqi6lwarm8a8su1svjsj4ntv',
                        receiverInterfaceNamespace: 'lxqquxt0hx6wp0rzm2sevep8gdneknig9c4ddjdcxerr0buttlr96p0u208s2jipxx38uqtxuxpfxj9n5516u7mdd88ielj0uwvo9j5dmb0b5z9rr6aaohukzj8nvm569650kclj3j8vhan7mzn7xk11d64usze0',
                        retries: 3317041694,
                        size: 8549928212,
                        timesFailed: 4763216479,
                        numberMax: 1975022298,
                        numberDays: 4430773926,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciUpdateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateMessageDetailInput!)
                    {
                        cciUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363',
                        tenantId: 'e5fcf6a6-dfae-44f6-8f05-da807c388ceb',
                        tenantCode: 'te7ba29j3g4q5gj9g9hpj4vaga1pgzhj2hrwjgtvu761nqnvh1',
                        systemId: 'dac9f6e8-3f87-43c7-a74e-1c5dd1d4e57f',
                        systemName: 'ufzbzk8vfftotxaj4xif',
                        scenario: '2drisyt7u7dsvizoyfsp4secbz4u6plmwlm652siqpyrwvfbe9tctwj4q17d',
                        executionId: '2eff17f6-bab3-4bc7-9947-56d3e490caa0',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-03 18:21:04',
                        executionMonitoringStartAt: '2020-11-03 20:52:42',
                        executionMonitoringEndAt: '2020-11-04 06:36:24',
                        flowHash: 'ndid1sues59uhus19np83yjqh6o5nz7fwzn2b2k9',
                        flowParty: 'r40hr7dy5o853w5ch2q1rhjdy7fatgz7y236asp4mljl76snf4dx1xy3d720v07egjc98yw3rg2bp74xyrb316lh3bv4p5i03t4age42of4lmyj74wah597jb9jwhd2aul5q2yz03e1hgeuigy50x4hzswvh94e9',
                        flowReceiverParty: 'hhqynfwpzq7z7uot1ds4ous4e5itrvvbeb3uzj5vz5lold084mqz1xkhodh2dpi0lqkxenxie0dkcyeyr4p6uv1v4zkf11ku72adwkc2481g3f4q36myetm73sk14yynb98zb13y4mz68de8quxqkfu44zre64bu',
                        flowComponent: 'swcd01nt32daji30ks4k3599fjzpka3q41su58zr0ochuaw16xq3j3nn4wjucfcpshl5j9sl5559kh4rahl1klh8zalngrmxli79lvpe2r1v1lwy105g14wsawxbf3ffedwrir0x64jem9uegp47sjg6gebnpu5d',
                        flowReceiverComponent: '3law3n8ap4wbcjh0ple3rughhd7d4s9ymigrsp5hw16b9vrf400apebnnsb5nfvm7gl1foz1u3e2gkepo7reh0p9xtpyf9qcxpy8l9htn4b11nl7m7lhh51fu2zk57imgh9v1n5ra949tz4zr91jo9cg76axpglj',
                        flowInterfaceName: 'dkqzemckxm1wl99ycnf0g8z2ktf9algttqqgixupfy6v44ov7wbe11kow5d9lsnn3mpm8el3woky59ex5em49pcn1ka5ykkv5xkasqpv5zdb2upo478ffzd6qgmofkf2easj24gnk7byv4qinsw6pc4d5curf542',
                        flowInterfaceNamespace: 'qymx72si2el8p0nrxrgo03w43g2nniwl8agh8le9duzx8jr3241wg48vd2pkw0d6q23t5w4dkt9rn9juqzmzuxj3dmw1ns4hnm1lxvpgx9ynjowrcp258bk1jzeyhuhn9co1wot3wkph32zkl7y87lq1goj5nake',
                        status: 'CANCELLED',
                        refMessageId: 'fl47fk57kumefeju9erx2pj5lo40n5av9wl9jlecuucjrdtkraywcmdh9tjlu7ooxljhyvd45w5tl87hpsma7jdlm5teel1of5c9g53qubzjjbr2r2svwsqg92kkzqrqo86k3ionmrbbps3b5dzoe4d14230j076',
                        detail: 'Itaque nobis ullam qui necessitatibus similique laudantium dolores harum. Cum voluptatum debitis. Aspernatur est id. Dolor quia non praesentium velit ut quas vero. Commodi itaque similique iusto laborum. Et ullam architecto eveniet.',
                        example: '3umi1pfketzhio4nuxdaul053tk9z1j0ir97zxubfxuydbg4unchjz8cownkqrtlicgu36cl7jodsu3xphr84gygq1yawr63s8s4d0j5kjbn6nm5hxvyij1gycq6ixlhuc5f66eorfl1nqj92l8d4nbdp6tnmist',
                        startTimeAt: '2020-11-04 09:57:40',
                        direction: 'OUTBOUND',
                        errorCategory: '5ojtwbtf8btd8coi7ps425vhdivxsqleui9hus7ldeef7z4wro2qyxci2gt9w3g2gohj3o06zelgmqivcvl8jd4mld5w5ve63tpfkd8r6hzdq4un3giwawmf2kow42qlzgke6kp141rcwjyxlgdh415ayt4aamkc',
                        errorCode: 'zneunjsif6zzo2tlx8b0flil7dsxfw2xa0alkks21myimy36k7',
                        errorLabel: 146490,
                        node: 5543609577,
                        protocol: 'xbucymbt22g97pywlei8',
                        qualityOfService: 'icuzjhac87truzno6aog',
                        receiverParty: 'zal2zblg7jqhvws9i08f0vb6ekx38xpgp8ci1dymzgqkqkcanxafqsiu28n198r1hpmbq54y9n8e9flxrwdji4uo3jmarjtxezzt73cnzndldpfjdisz9cbhg7tq59no57zrg717e0ur15ld6t46zdxc101qs122',
                        receiverComponent: 'alofl1u41s7ri810e9l61zagra6d7ag8m65ll11u3o9run9p39psajrjb7o6wt6k5b36h5i3hyxwkduvdfrezl2jiahma8epgo4647y3jxz550vi6i8law9vg19awr2xxp8okubxak3npbl26uktwt2gg4l6bu2s',
                        receiverInterface: 's9avsddpxda109bla71p8dzbecgcaxhkhfd27g99zs0d7ubcy77ncc6v3rakrdneprly1cnh9pijv5tp5j6a4ip70sudmxyfl942c2vo0n4z2vfegtm9z0iw4bdlfltby9mylxuegsuei5nqjmm04qbbbc5d8iv8',
                        receiverInterfaceNamespace: 'bzwo052iwy8dpetk4vdov9z67wdj6dix1b4spp57u4tyxtypeqy8jipwb7unvaotq1jptm275klhuga5o6pd0sj5bse9t5e29b6v9vtq4ufn84m174fo6g2q7b2sxxu7c93h5kkh8rpl9g71r9pkqqiziy4msx5w',
                        retries: 7060341970,
                        size: 4183718229,
                        timesFailed: 9902355839,
                        numberMax: 9568516606,
                        numberDays: 1834473954,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateMessageDetail.id).toStrictEqual('d78d30cc-6ee2-4cb7-9282-14fb53c0e363');
            });
    });

    test(`/GraphQL cciDeleteMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a8d992b1-b6d9-4173-93ea-e4a829ff0134'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            scenario
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            refMessageId
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            numberMax
                            numberDays
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd78d30cc-6ee2-4cb7-9282-14fb53c0e363'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteMessageDetailById.id).toStrictEqual('d78d30cc-6ee2-4cb7-9282-14fb53c0e363');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});