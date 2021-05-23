import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageDetailRepository } from '@hades/cci/message-detail/domain/message-detail.repository';
import { MockMessageDetailSeeder } from '@hades/cci/message-detail/infrastructure/mock/mock-message-detail.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('message-detail', () =>
{
    let app: INestApplication;
    let repository: IMessageDetailRepository;
    let seeder: MockMessageDetailSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    MockMessageDetailSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IMessageDetailRepository>(IMessageDetailRepository);
        seeder      = module.get<MockMessageDetailSeeder>(MockMessageDetailSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                tenantId: 'b5d6552f-6b10-4e44-84e5-f0e143dcc979',
                tenantCode: 'dajqlni9wb7zvyoucrpfw86oyqk99jblwbobwpuq4b0jtv24xk',
                systemId: '712dc40f-b51b-47d5-bd7e-c06a29777950',
                systemName: '9ur9o7go1tpr5vvwom58',
                scenario: 'rkoco4ml390wzz3n30oyuinfkgn81bj2vvayff1ljtobm2uh5bv077vuz917',
                executionId: '541c9edf-385d-4def-a6da-ea725ac9b59b',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 19:39:54',
                executionMonitoringStartAt: '2021-05-23 21:41:38',
                executionMonitoringEndAt: '2021-05-23 01:04:33',
                flowHash: '6b8ao06ogkmi815bmmfh8t0xbn3xem3ilx0klciz',
                flowParty: '2rvhjntq8nup8prqt722zi3jit6i2e5pw05pp344yvn97bugx437zi40avj9fpmdgcw8h7c5jyp6kr6fhqn987sbmyf6jr38z881nhij5e730m9o1ftz4hg80gh3yk9mt3j9lkod4zw66gx7p5qu67uextcpei1d',
                flowReceiverParty: 'fwlw04l9yp26mxzhl35arz8a1ineoinp6p0472058uc0dfpadfab9a6ut6zlxvt7dd3az9ho2rdefzb7y6kohlm0gk4mgfarmzfb6syh0z793jlm90w4gr8qu7039bibthq53gispjocunjhbg9i99kmtnqbvs5f',
                flowComponent: 'cb2nthwk7c771dyo4sqspe0no3t93v7kbc7hia7tn075wmefemsbaf1yedc4z80s9a7p24y2h03yb4ymaf7t89j092ua58q3h27tnr1wfils0kh5uv64ntnouf3jp8b8dq7gooqhfxo91tclof06qeuaqwwtwcy6',
                flowReceiverComponent: 'c919pgtw65kbo85mavrizmmubkyb8a7kcqay50eh5hosc132yynjnhppdodgidulxe5hwvh241nr16ddylwfrzb1079sftd2csdrzojf2kfnvw9t5mupxws4fymud4wmjezwgty60gpkuoptsenvcd0bzoa0rtbl',
                flowInterfaceName: 'gr6oe29u1c75ojyra7c6es8emd1ramgn79c4li42ly0ob1dlbviwczy2151g1317e72hkjy1yyyx4t8n8q4l5qd5b62m2082a4jmyvmosfa9r2qvfbax4w64lbkb11z37q0w563u6flg0ecvzb6cyoowjnu0msw5',
                flowInterfaceNamespace: '4xz3jhbobqbb1wkku2j65mg0tczo9j9bozp8kf8zp5dyvp89o9rg9my48qlmwse2lsur34u4tgheizddwc154b8yabcos55cams1kwd6pfu7jmga91f7uigo4ovggswnh2anvlzc3v2n50nsr7957qia1pyh6j80',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'vvauertu8gblgkgehk4ck5c6m1j4q357sth9sia0j0eri7frs5twt1cg31testv64r0mr0bvwtg8j1fuxx7tmfvrshu4ww1mufi1c0qr7n7d3bzx2w6hbm98qnr9pskoi7j8qqngt57mnio9gtooart7jx3tyu90',
                detail: 'Voluptatem et quam sapiente. Voluptatem in vero eius est. Velit quis praesentium quia maiores non iure. Similique dicta nesciunt vel est vel at.',
                example: 'oa4h05orhxbes7b4xe49nqzsa6azbe0rxwtm6iafrskwde5029btt8d0r7x6zntzdrplq1u911ymsn5unzz3sp4jnsdkbml5i905dqigrq880va6u2gx9fc9fjwfr12uxszzhhb92oqfuz51qtloxvhdhts8sgje',
                startTimeAt: '2021-05-23 17:36:18',
                direction: 'INBOUND',
                errorCategory: 'vbax3ckvg6v2nlzr89vflpmj25p8m2kgq2kl8h0vl2tyw7e4sy7jqyucqw5twfi0lyps4f8bsg1jmpgcxq3n3w3c3zv1aqt000w5nv5am563qkt6u6i2ooqkvvf7ccf6cw6x416b2qiz9unrvx4vfyaqnxv8gtwo',
                errorCode: 'y9a42r0wbuvf0i3os2eite17vz3pcydn5aqr6ful16lp5i31xj',
                errorLabel: 543580,
                node: 9289384895,
                protocol: '7rw9on9ggula9ktxgcnb',
                qualityOfService: 'dmrgfoaorcdm4cu5ych0',
                receiverParty: 'z5k5majs4cgaumbpssbjyjw27zgtdx4gmea0zp3w259uyttxn5k5i54nqy2no7rjmgm3etxblp3cseswi88ev9gq810r87uleysbj8o0yyedari5acxdukh3v3ek728t5jwg7ye930zqz2dad7d6t85njcjh41ax',
                receiverComponent: 'm3spcd4mqh440xgqnlwua3cgmejjtpa2u4er6mu49r5x5ip32lihb2h1wm1t1bzkmu06kx1i18d6bfm4v4hd7g1on6mg0y4cem65ifd039flzkciqtjww5gpl2y148f24gqgdyh77at2pm5078825ee08ru28hsw',
                receiverInterface: 'wpo68up2xhqzd5yfypa6701nhcbej2unneujkgibbpct4ztawsdebcvfblvq6eyqz90yvqegx8gh0xdszlikqgsv4ldz07t59sf5ysnxmo1kch5bmin3rl8eh0ktlpduvemj7vpieq2ezoe6ruvlrbt7lkqkha5r',
                receiverInterfaceNamespace: 'cvga5a2ur3sc9mrbvdqhlkc8pfhlm9y8fjtrs1x8mpt7m07vhjbasmey4aj18dudwyrnobx97jd8ia8muie3rosiqhwvrpb1jikcg6n4xkokssobgpspf7kd8h4m8p3t466q3bcc4jwefsi1pvo64e3c6cx7wsvd',
                retries: 3526808070,
                size: 6605861044,
                timesFailed: 1448572452,
                numberMax: 5267148763,
                numberDays: 4233275488,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3326c5ab-a95f-4ffe-a8aa-fbfbdf34b02c',
                tenantId: null,
                tenantCode: 'qt0dmcuti6p8y3t4kqtdoy6z4xmdjvo08rsmitaaochiyvvb90',
                systemId: 'cd6f57cb-9285-43a3-89f6-f8eeaba48ecf',
                systemName: 'mw0elojhkx5m5bfponj2',
                scenario: 'ufxpcwb44hsg27fan3vaiwm3jv402n3vjq2w131bwxsieetigr1j1puqnrj7',
                executionId: 'ad39a7fa-6abb-45d3-9218-7e9cec9f3510',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 05:19:41',
                executionMonitoringStartAt: '2021-05-23 11:57:15',
                executionMonitoringEndAt: '2021-05-23 08:58:16',
                flowHash: '8ud9h00pdy2octchs8on52hrerltea1r1z3kb7wr',
                flowParty: '0s1xkpkuz2uir5pnlcxqriy7d062yrzdtfpn7jmk56ohsgcklws0ejzxu2d5d17fc0bxsygfvdtxabvdj9t3jr1vwfn8jpqd9b8htp60qylh7jwt8ip1c1sqry1gi6s33yufjf6w8cl5hhj2r4gokdya95rue7m9',
                flowReceiverParty: 'z4sbe9c5lxrp0u4aby8kqaboyrw9zekheanhg3vlhh55vysmoz9xzkmwnz43zfs9j2959b1uvslbzhe3zhna7xi662xb7ciakbumtwme967ozjuso51tgrsttv5rox6gy845d29oh4bwgrf3zoystalkkhburt26',
                flowComponent: 'hzhugcf9mf5mkyf4zgt6r3kjj4dvi7i6j1sn42m2o9pdznx2xkx056xajjrs0vzu1gsua1umh3t3u7e7c02ig9qrg5954b58rjsgcmtgt2j53uevdtvtmme53dfhrs4b1uyvlrnr4v6owd7qd7otl7c3tl241c08',
                flowReceiverComponent: 'muiv1xjx3cu11ufs648eayj1l3sbn9ssebw8qhbfu46kwlzrzq98056top9jfl6m0guql9qqmapp0al5eyo7eojn32ank63hr09oltz3ihfny0482j74ktt5pz5kz8rz1o6ys665v6qjsljm1c1mdg5qyzez52f1',
                flowInterfaceName: 'lpcwfpr3p6q4b39gxr7w7vh5m000wtbslyl1x87g65rzg2zsumgqoeee2ielrrx03caci6xlhfe2up83pn2u0a64kfmqc6gzzwbxtmtibdpuq1ryfdeew6u2m45rwg7lp1lifzzm9s14567pc5q3xor7h92zsibr',
                flowInterfaceNamespace: 'tl1dmoja904cjbm3ir4k9hokqd121kd809fduri2rohs3wm9ljxa60n0acz5llqe9wml8i3xli34c9wn2xau21svy6sg1esgeir34vvxamox5mp9zo8ot1hggdo6dtzs2to87nfqpzui61fhh5ltq35mdckzn6vb',
                status: 'SUCCESS',
                refMessageId: 'dh0td453uedwqleuet8afed660d5zjazpf9jn217md52rwf7ql9xqppgygm6khgp3pknvy7b9c4nd0ejp95ousc5pftpmkwoy61iqf9ew9xfxe3jajv6lzu2u362429u9rnkokyvlunztn36etmob5af0pkm5ona',
                detail: 'Ut architecto eos sunt aliquid earum. Cum qui voluptates molestiae eligendi reprehenderit harum temporibus sunt iusto. Autem placeat perspiciatis nihil id id ad sunt beatae. Enim illum optio natus itaque a quis. Expedita aut omnis quis ab. Voluptatem maiores sapiente laudantium sunt culpa.',
                example: 'tsceq6adzxf1v82bvyz9dwpqmfcl2v6v3oeqq1qyw9x4jht49six5ie01vxpn7x3wpm9i2u2yvtrbrcbxgkpyu3q5xho2qysz0qt5z2wvivuj05qc9uops8kdpe98yf38e9kz0xapcpslqyp08hw6hp1emn5e5yk',
                startTimeAt: '2021-05-23 01:19:09',
                direction: 'INBOUND',
                errorCategory: '8kts7g8rfuy35r3fus42qp6pv1dxvyf0syeucitgysy8nxy8vafozgp1ba0ew4j4qrtd1y3bwlzlvuthxxahvvlo4t66c61mavf19382b0vp58l5ltalvr26g3jfupw6hqiyvderc3v52mn96jqoldq01ibes1eo',
                errorCode: '691ouyfy9b3nycxp00ut1cdil67qw1v2hu78vv2z6lvd7zp30r',
                errorLabel: 194040,
                node: 2711858627,
                protocol: 'd0aqthebsyorhpjwyp63',
                qualityOfService: 'e1tmld0w96wxko26r239',
                receiverParty: 'yyfn1w4wpv4slo69a7vpv3r5akj83j6006qx95zzckhhlt5rf3obct4hm82pinhthqq4y774v24hperu3pv2682rsuf90rivzxqvimsgig56r11qz319wanuni8t3h0gwc1wt3wzl3de7dk8f6g9tq9udac3yfiw',
                receiverComponent: 'ily0ekytxf23ld7wprp1ly5o0jymtvtr9xplo76dt5hw7464wxghdaxu8vpun29pze2j3dfu0wx824sca8qde7urpwplfz4k1neco43e04pepi7kil80tztf1dki0gjya19y674bg9qcudevgjn720pigf6ni8pm',
                receiverInterface: 'sfu55hunh0d1avpm5qro1dvrbthgu98b7j2nk8c4w6e01shnb4ozu4yjrgb6nw7ngumv5g0dahq3si55erybswonygmz3tmyirvfe7hs7vqdzv1wck273qvzj6dto1f697b10cmr13gh7933xd6tvw5to68w9m8c',
                receiverInterfaceNamespace: 'as0a4qpaut9xelaytfd1qeryxah3t386w4lak1go5k3zjf32mvohdod0sax3urdu45u9a1334v30we9ttu9h7dlqfwk0kqaxliuozr4on8s09i0rexgwkhl394qftso8941ycg2bofwoi2mpeokyeepuqk31me1a',
                retries: 3929836424,
                size: 2045171552,
                timesFailed: 7332645036,
                numberMax: 7349109652,
                numberDays: 3445731810,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5a741411-f691-49cf-897d-1a5e1e288641',
                tenantId: 'a2076a08-c782-4e8b-acea-a771861b68b7',
                tenantCode: null,
                systemId: '7081cf2b-7efc-40bc-bada-2e24b7a331b5',
                systemName: 'bh3es3ua1sr5i5dbdyis',
                scenario: '2cvknui172xy8ezzobfjs8uma3uotj5gl1llfom7np3t2a1zygnan6pijmnz',
                executionId: '9a89ea2a-b1b6-4c0c-8f6e-6af90e5c30fd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 09:53:39',
                executionMonitoringStartAt: '2021-05-23 01:54:41',
                executionMonitoringEndAt: '2021-05-23 22:19:38',
                flowHash: 'aw1u93vnk8kko3qx6dp6jn6piwq93fxfafolpaea',
                flowParty: '0snj9xvvpqgw13xzep4op4y4i13papo8mze5idpgxubepke6f5318f028q0f0fs86ycnsr4a7vhmk1m82lr1ngew948qp55uhqi419pdnnva1c10lab4qxyw6v6r9n6n4y9z7fsf8vbud66qahawzpipqbhrh2fd',
                flowReceiverParty: 'jyuvhrtvguwa9akm3p1rjyfykg0g1l582syvtpghtuybopuxc8ws5qkm97x3a1pvpwixblmibfk3o71lnlat3m4sjsk2aj5e3l8205gvxktku4hnauok7hy1txq6uqxrvq3t0l6or1gcwvqkevz6zuhp4ymy0spn',
                flowComponent: 'flb046aehheyll97mgjxnv0qye1qh46vukk9glqq4obr6qgawoabxymokej0r5tb5gp39w1cq9kvby9iih0hngdouriffm8yd6gj2986p18ztifmo6wxerniasahq6n8yt5oy4ungji73sfmfapcm0o3bvvtsajo',
                flowReceiverComponent: 'idal40vpa71kmihej0z0qxaif3ymmg8v0t3l6zgtb4nul0mgnu46l82v617sz8k7h5k5ev74yo4dyjbw406tmzv135opc4r9363zyteuulm4p5a5s14kqezd21h98fiahrby6re7n2f7bn9kj9h0mxhnz2t2lrpg',
                flowInterfaceName: 's5v7jt5v1efpj1oqa4b8w9sj0alw0x5jtgzzi1rk9fdxlboyp0chhrpprngbzs25qzy9gdxs1d23ippqnt3yv6mi392ijfyepnsf5t4d1gcqygtfknxgsjdnjmqawmfhndeq2ugz3gh53pc7vfwslcppyh5lcy8e',
                flowInterfaceNamespace: 'fy5rb2d93kucbf21cipyuu6kwyqcooufcp7290neijuypw2vckya76gykqqcg7tplrzcoyj43l6rie50en44ou9prelgo9qkzhz7dwma4vsagjrhqojt8d6uaz4t9wg8fylwll71mec272awexo6urut9vsqez7s',
                status: 'DELIVERING',
                refMessageId: '1aer8pf6ekmsu9pqly4svppihcq13ohfe4ijt8wz9slh8bn46vw52zbpfen6he99s06zq7j5d1xvw2t3dizhsv3bihwtcfpapbgz1rdpmb8tdumbdnkmsujpsh6i0d6ziqdyvw4m6kgyjv0sz7z5gkk9aiiq6oib',
                detail: 'Quas id vel. Cum vel id tenetur. Minima excepturi atque nesciunt quam sunt eveniet. Est accusamus eos aliquid aliquid sint ut.',
                example: 'bu1p825szy2g3zcub2dup2uu88yigoglffarlg3yzn7wgk0catmnbhj1u5cxudaam9egkk2ieo4jdnd2wpqs7zqb9iamv5nrzauvf279noh1dlben01v1fhl4zjnftjtfw8p3x5authsl4ftqvsxdq143tlctbs4',
                startTimeAt: '2021-05-23 14:41:12',
                direction: 'INBOUND',
                errorCategory: 'wo7gcugucdtfze8vddvbapqy55b4m84xcoieh5wscla27q8yvizlm9l7jaco7amm4s2o7pi6u0kpsgyo3bfat8501aakpxwt16q24v0pjke1mqd6llkfgx0grapwq1vbm59kzuwiu8mn7reibww8k2p8dkh3kyqt',
                errorCode: '3tifir5htq8dasj7bh55js47we2spj8hcdfwuxdaewoz63bqro',
                errorLabel: 719662,
                node: 7912180991,
                protocol: 'em00dasv3iohoqqqvie8',
                qualityOfService: '346ukmb80xta97wlpvj1',
                receiverParty: 'i0male3zt0luv45vlwoqc6lg5u7rau2gfogido2z94k3ymln953alt8ajbspjoi9shhkote2gu8gbxvqto4r8vz3v0bba0jowh39xfbsjsxdjlf4de090ge315bra8s0gtdukmzoym2a3dy2xj0r86xl52939044',
                receiverComponent: 'agd7ple2s6hnm5a9xz37gtcit33u3u467hme9769bhgu8wtxrl9gwrm732r5ldbj94d59gnugoh02fagvfqxhwwa955rqwgqrhdgbpwqqm0o0jbwhqz9zj0cs06tgt71za83w4alhxpny39kjqoqxuyv0bttxo48',
                receiverInterface: 'bii1zmnvaj0oxdhjkc3o3uajw5efjo9p3afjioielki1onygjqgis3t3irs6ryznmu5u02q1axsnyfaymmirryty1y70h49e6k6wrrd8al3dmwogwj4u4knw5mkyaigu2egn102tulcnvm49tvllaw03c2ubf5yt',
                receiverInterfaceNamespace: 'wzp7hwynaovw7mc1s72gxz12lsasqb37v8innd2fety23691hetnut8hwda25dapnnss3y0wsllhv70ibr1dlkb74vjxac0yfs7l4pc32hn5luxtmak8hzxm7vj7tliea2xpjwscoq6mutcjvj7lufdyp8gtdnh3',
                retries: 4200699529,
                size: 8477585988,
                timesFailed: 2668256360,
                numberMax: 6182684860,
                numberDays: 6724284777,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fe943b16-7ed4-4a00-93a3-cc884c7231b0',
                tenantId: 'c5676282-59c9-4f03-a1fe-0ccf0351667a',
                tenantCode: 'z0h8g50h6v2t20sm83nt2rnm0s1x0jubgjhv28ycqjewtgh7yp',
                systemId: null,
                systemName: 'o6valmzvpyb4unb41h7q',
                scenario: '0im2bspf8k9onc5boh15iv328q1w67b1kezb76g809trzdrlnlgsi57a0y8f',
                executionId: '93616b18-2723-4d31-9660-0aadfcf22974',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 20:51:52',
                executionMonitoringStartAt: '2021-05-23 04:50:39',
                executionMonitoringEndAt: '2021-05-23 23:13:34',
                flowHash: 'wh7iums00f7uiotcza9t6q3w2x2fu9srn4ulxc56',
                flowParty: 'dkakibhzb4xilkm1x9n43wnodn7id0sw5cy69p1jr7hazjxamrzfyod7ggbltdwg8e87r5vyfxik49dni7v90juqde2b3tkzh7km6b451hip98g5ntia16lq6d2x8sj57jz1x9x1hd105k03f3gj1xwnplwf371l',
                flowReceiverParty: 'yu8taljsyav578zyv9qt7n5eoclp9t4yw00jfv2bos3yenjk5qnvzzjyaxpqknu0z20q335foivkhzzsn0u1x7j3gl5lvbdb6hx6pq3jvz7fv9xhacy3r3qhabthwmybglj3u8ndchmsb8prw3eqiferpg52i88t',
                flowComponent: 'j3xbs26qgvl9jy9p3hb84t3qqgcerloo1lupmh7rs7kbv3h1azyh3ythouiwd67nra33ycx3y9yis20t7ksdywksys7qfv7tx4r3p53g7de59nfbl722z38vndyueeskv5wevducpeaxz1xtng27ppbfbcygmg83',
                flowReceiverComponent: 'i87mhxi4eziwmqyfc94btc1ihxecexr99dnqruizvo1tq4xzli44vgjahqsjlr8aqyk3kgue604jilk02s92jqb0uo34x8eghmthiuk4r709218ni39gwog6kiexblawj0i5f2ql6yd52g2pjv4voa5ppjpuk3xu',
                flowInterfaceName: '9s8xs50byh0g43ayk56hjdg77fstf7x4zenb8mg2t3zqu0vdkmpj5nkgmjp6hjj4gphrs1k0whi5436eyhid9staoj1ugztjh0d2jj622dicjmspvpte3lx7jqxpsoaldtnk9h9l77lrlrfae18kmfts17927srs',
                flowInterfaceNamespace: '29whkyvgj1wmkcvun8nq4o2s7a710jkymp8j0xk49ps0cdtu3vvinobymog91tiez8ap6zi0w9ulovm7ic6ao0yzrmq6flxbixs4nzppxd6xkhnw54sipl0d73m0xby7zhkbof8ms5zz10nkmhm5tgb5lb8gbodn',
                status: 'ERROR',
                refMessageId: 'klqybozgy8xmbdyk50tyvtub555gtj1s5dexjieessndu3qz19jlx5kz3z2vteumu9qt3t15fljjwmmlh0ai187wtiogmdx6gmzzvxlsnu1wt4avitkzw46og208jdxbjpiegc79uwm5wb5kkue9k4efwdlcdzux',
                detail: 'Cupiditate error voluptatem et exercitationem consequatur ducimus consectetur ut debitis. Qui molestiae animi sit officia sunt alias ab. Vitae quo aperiam. Laudantium esse aut voluptatum quis. Cupiditate earum laudantium aut. At alias ipsa nihil exercitationem doloremque autem vitae nemo tempore.',
                example: '5ta4c8f0vdvv2fzmr423uh06hpxa0c85szwlyezdlvxzxmujxj3271vid4fnzsfnotsc8a9umkm2esl9g9butzz15g3mns3ja0u3ie9n7q52jslmhdh9b15wd9wlfgg5dtv67jfdtlot0uz9vbwbq3tag9iqm7k5',
                startTimeAt: '2021-05-23 23:09:23',
                direction: 'OUTBOUND',
                errorCategory: 'rv97twpg72ma71jqilvvtdefwqso697n3ruiolsqy6jrry5ndmwkrycehvnwdjfa23orne26p98efsphy43hfwfyn803ixk3vac4fghnpngd2xbveh3soxgzkaojkr7uhjz7nu0fj948vrc0nxon9xyknnl5bkgv',
                errorCode: 'uksbjp9b7dzwh1tteesmi3ye6wtwiw5fqyu266h7bgac2ubn6e',
                errorLabel: 393827,
                node: 9255048428,
                protocol: 'nve7317ujrd5wdzj3cs4',
                qualityOfService: 'b67jj95sp1zi6zy4l6fa',
                receiverParty: 'v94z8owaoqo3ax6xy45frpfvejkzmwusp79d151qcnp2rs1n9ud9bisdcgwfeq5lcfop7f3k6nl10hj7p3iyjbswbaryexwtdffu9xelfzgmzs4epp4zhlb2sqf92smzmt9mu8e7eqv06v6i1se9mask1b64tkpj',
                receiverComponent: 'onx8jcwcbbwp9by6qcz0qzrvkv5j6q5wk1n2syt7tz642qktnjo01whhdippx87kwoljib4zc3j26qpewaq24pkexxo40i20zpi5ecvvh5fryqv1cjwrf6woq1q2ukqfoqd39d07n8fxvxwi6lgyubqg4p0m52ho',
                receiverInterface: 'k5ra7bfqhw465ari0ctqoz7hnwljkcqfqc2l238lmdcmwyxvtc4bhf4ch7ouqyabz2lo21hpzkwbw3ii7fo16ml8gh68q1iiz5tbazusikxzntvfruv60ob6mp7npyit4rbdm9s2ucwauddwqzv0sy7tkm3ma2o6',
                receiverInterfaceNamespace: 'lt5gtlzban28t6coyqs9g0m9need3r4rnzcjh5nnsdck8qb1cpx9fdtn08fukcww7q73w58x0dkmu616jp553wut5655igy998dkbbxoxg4kuu5y2mt1zshzbbny4tgp9cqawvhtgcyjk564mvcpk0uwdmp1eayz',
                retries: 9090427536,
                size: 2668911367,
                timesFailed: 1940094762,
                numberMax: 7746224028,
                numberDays: 1850280363,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '31a92d70-baf0-41d8-9c62-b310e0f8b9d6',
                tenantId: 'cfb2c793-58a0-4d2a-b8f5-e3676ba5b64f',
                tenantCode: 'msz3krk1o8lffgbi3qcbqrxdeb7xfwiiuqkqmhrm8uztxpuj8y',
                systemId: '6a551ba1-5725-4bc8-8f5b-ae0ccfe766ca',
                systemName: null,
                scenario: 'xqsy5rr9gzh3t0hzawqm4lgwm3zveoem1sc9pox4dbzll44lailp2c39ypxd',
                executionId: 'bdac9706-13a7-4027-b44f-09f1bd2f2989',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 06:15:14',
                executionMonitoringStartAt: '2021-05-23 12:41:13',
                executionMonitoringEndAt: '2021-05-23 01:08:44',
                flowHash: 'a5hkfm07r8guoox4b6h8ssnt363osc1rj3c1bsn1',
                flowParty: 'mg5swi1bwjntk6dmsfsrwc3roz0n6suz9qctxu76clud8u1pppa6i0w9fk9wa1y6ap3crvlkl7rv8ftjyeizeuu2ljccy2ypx2zs8k1c94mq0ymmy6mvgqvd5pb50n7l4oe7uw4se6pb23xwrqqho3bqww908vwv',
                flowReceiverParty: 'u4b7mf5u9mkoukqsmu7kwabyukzmcucowgth6f0ex1llhcnvw5k3196spkflp8vbczcfeiqqehf0088hhc5dhdr2zztrmyjovkfknpkcj77mpcmqivmxfd3zgko560vnjf7qcgyb9a73km5j8fzrzo046ru8ybzd',
                flowComponent: 'p159f4ady0abxmbbqh70uipdi7s2za3tu7e2np36mihlameskvt4z6v604ogdoajoqs5mraa316ivuxp169r6gudqcb3h2yapgi0nejbje25opfmff0tew2qvu5aymmhz1xmbcklq810x3dttvcvc7tneyqzhpr5',
                flowReceiverComponent: 'kn5hfdh559xx0z8vk1bfmmcaxx0kuep3jv1vhaepk4t84zm972nz26rjg3svk8c41kmbm8313ppcqwv2f0cklapub5kpvwk8xpwfptu19wviifz2ekiik0efudq54wr990h12ez0jqkaf099npssynzo1smk9xui',
                flowInterfaceName: 'ye88ea44xkdwfns836k30ojmo884wq6qnxgt3rvuuk8ndtt2imxa3mnb4y90nkqyj3x11qwmhnivmekbxkrvhnpueg1qld8ldkand8m7kays74gdoprexqaasn6h6c8nqyha8stehote31ea7dnwfcmqyqbude72',
                flowInterfaceNamespace: '52fpgjfgl8dkkjjzftpjvwbk231xd0l28xedo9b8qehgntwoalmultiedgieljp8lc19pice3nw0bp3syz124e2d2nxzfxxjtcclhex06oshxpwg9icqapr3l0jt1s29g54hm1xwlwzzwywpeph9o1cxhdnp5nl5',
                status: 'HOLDING',
                refMessageId: 'm2r0k30mestcgns1pt8gtzw9iliyteyuvs6gir0bfsgfxo9yjxtrumkl9hszxrn9m8z4lc2yyt1baqiuf43nsknxred3y2uioirbxf7ttegnil250j3tf3j0cucf07j9jxcbp1pji0bfdupn5hhx65n4yxkj0ei7',
                detail: 'Consectetur est sunt repudiandae deleniti dolores qui sequi nemo. Veritatis ipsum velit unde quia ad asperiores ut in quod. Est et autem. Corrupti possimus libero excepturi dolorum mollitia iusto fugit accusamus.',
                example: 'm8ez0bc9es24rzohdd4ja40sftyczbew0c00z6q3wkrz4hgxltb1lgnx09ow06veutir8qiukcrfpmy788b8f29x4kpyzvwwm7qmb1c1vbk3romektb0bvna2petf886i4cq6a4lfvyckjvw72jnnbnq3aykbveu',
                startTimeAt: '2021-05-23 04:03:32',
                direction: 'INBOUND',
                errorCategory: '0ie6cvzsc3zof6olutnpxkbwcumizpc7mkxejsh7fkogw6636u68yznie00h201s51ikirnjk7iri85ewol6iezuo3aoahaqkayfx123qs58i9e37oqey5j4bt0t43pv575w6w6fjigu2np5y6ioetakcb19c6yy',
                errorCode: 'hscwq3568q9rvggeqydhs1ibmnryubl87or03gx1eh0bx1pg30',
                errorLabel: 342259,
                node: 7986186151,
                protocol: 'q0ap8i4rquo8gqcud0t9',
                qualityOfService: 'x7ambdpg0ki1bb9swxbd',
                receiverParty: 'agcct5xm21jc1nw01rg83ywob2j91ozagm5x06hydfwqv8dgsh1ghfhee4jtcty7gp06qg3cgg4f7kveugfn9d21i7liwdjutma5f7p2qi35321qo385iqheqeejai2mym6yf29985fd3y728605pl6iq9k2tvas',
                receiverComponent: 'fouxhddef2dbm9bofjdn827sv4wrkbe9td3lja39qrb8sk4308t0cteqkh2nfxzejwa2oi1xnhwexk45fx3putpd1o40mdq7tn3oem0rdcrohjzvlurq2x44ym48kjx41cefd2yb4r7gyvyy8082ds38t0fk1mmg',
                receiverInterface: '66vzv4hk3g9if2sz8swp7g8jyc0ac912z2rxuuq8onyx6pwx5zv2ofm4mjpqafdhjias2xhjb81v0sc3d26630tp35yews9kw9vorfpjmfviz9sv43w0ri48yt1kwi6rjua00ii3m2cfr0j5vv1l3te3z94qjp65',
                receiverInterfaceNamespace: 'afnosh6ipnc7ox5gps63nuo66pax3g2qwab1i7jqx7w1q18cliuts534avu1256i8usflqcvmjdbhouvans2p4ndx4gpx8j61l8lrnwxo8tr644kkn74ao7w4c16470nsrai7jpfzj61uls2rquo2w43v42wwxbb',
                retries: 2519133085,
                size: 9024115841,
                timesFailed: 2155165127,
                numberMax: 7485146329,
                numberDays: 6248190461,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0109bf2b-1fe4-455f-afad-a4a833becede',
                tenantId: '1fcdf1eb-f9f8-4e99-a33f-e7d5b634736b',
                tenantCode: 'zb2wdrxlpjpmjpabczmuwmuoi14zywkldmm8a73uoz7rptwihq',
                systemId: '3d28a6ad-54c5-408d-b3ed-20ba35885bef',
                systemName: 'sfoeo4eg23qhg4qnl3oq',
                scenario: 'wfco2p53juf3bd6q3yp2x4ravrh9g5d937v8oarvee90fynh111wozoqjmhm',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 12:58:12',
                executionMonitoringStartAt: '2021-05-23 07:16:07',
                executionMonitoringEndAt: '2021-05-23 12:07:01',
                flowHash: '8b5u1ms9on7psl65yo2ibyjoxa7vhomx4nd9b3gn',
                flowParty: 'ikrg04azj0o6p56n9zfkq2wmkkx4yiali68negt0u4fjzs5dzalt93qp12vgkw8er9v9njjo92mghdxhl20a6bv7gltwjqpsjfttzj8b888p04sp5p9gjvrzbkvke50fp1gnhof8hjd3kdtz9xt4bw3sw04xs8ea',
                flowReceiverParty: 'z0al5m4302uizveom5wf55xg7dsfjlq985mhrde3nrlnhq4ubm09cd3846im6t08s4v9skg6aoawy07bqbdc3nl6fvxqymyud1flshpkz3uby346fu52e9mnlfyumjyo108u5mlcujdmd14ecv5ovbmt5vtqswci',
                flowComponent: 'abp8j6mkru5nhcl448xch6k1cwpvdbxfhsskewp89xk9y8rv0tvz32gvz1r8igui5nkj5v4ys261d0c102litq73bm39y8cj7nbsct2gbbvpn0uw3geo4obhlahbc140d8mp298yy5vb6s6n9j734e1rivcbxsyh',
                flowReceiverComponent: 'hq8pw2dv32z0md5xgfhddo4mgi238omajaoykmqr8niobxsm7oii50lpsnramf6uu8bzamqtsiy8mxditvmixs8m6ud6y5k40j374aasfoi8477syvz97q8kie8qcz1dyruc6b3i4ztmoxkkoxbhwf9zpgb6v8fu',
                flowInterfaceName: '4zogpjp2c1dujmmceqbh6ohgij3c0calaewu7p9yauycln09z00exfmkmebniosm0iez7ylx5fy2gkxsycq0vv70mzahuqnv0f9nyz9uylurfc94ejydabqavbw3t9iuqw32lkusojcv6tb9uhknllfo1q35qtmv',
                flowInterfaceNamespace: 'm9a79m50vvndep11ai42iomedz3vli6y8cqwc924u7iib01vsn341w9xcefdvj7tc0sy8ye8j0drlmjexsayu7llp1qhszu0e0c9zqaaqw0msb43hquzgfz6mi31xgv3dakhpdieu2da3rr252usulnb2tlu7fj5',
                status: 'HOLDING',
                refMessageId: '9kw13p4uenllkh0k40svdq6x8rnduifhet382jwmg1t1exqtbjvqslag5lsma32ngi7wmy4lnsqm8dtwbcxhptu5kv6u3p8rkgzsvi8h1sq99ou0rvpr3m4bx24j7a3assxorpe1g92gko7fvkf6796lycm1ii82',
                detail: 'Dolor modi consequatur delectus et dolores. Omnis non corrupti temporibus qui aut. Maxime odio enim consectetur itaque impedit.',
                example: '7qbu82tlwxbdrhza7941n216n3oak2rxjrapbcsy31u5q2ib567i7oelwfca6s6gaby886r49we9b4my32w6d8kww5ppyij3b8vpwyvdipd9d8wryfefhkw1pv6rhjpe6bfwnnrbe1nls5o8ou0uqt5wbdo5khij',
                startTimeAt: '2021-05-23 07:46:46',
                direction: 'INBOUND',
                errorCategory: 'kdvj1zb5rlpzxfqc4ntzfhre55olusyzeb04u6vmwsnzniqmrgdwppv0vkhyiz5vwopedbi5ateuwxoqnmberku4teswyl03y4s2hm1devi6imjq0cjqntvosaazyodgigyr61rgiuwvvd80j9tit5dr8yi5f78x',
                errorCode: 'e4d2fwdppnyiswl03jbgz8hhcrij3nfq60j5i7pnplxypsi7xt',
                errorLabel: 229831,
                node: 4527349551,
                protocol: 'w16444hlpfwmgd3ws2fc',
                qualityOfService: 'ztpp8wa3dvib90z09nnp',
                receiverParty: 'fbhojirzs838duxry594w3h47bizohz7d04b7cq0xif6u3hrd8f0927filod2f9t1826n4zd8a2pwryuixqwkq8r86ofdwjbsye4mq9637hy2bvc89qgg58lpm9bpokjadxqosvls3qg4o5qrkmxu78ttmk2ddqb',
                receiverComponent: 'l2csgg6moflqeibvi6ege5ts4m7ncd26mjzydzxemh2l1qd8ipzobb1gj9czy0ab7bd9ae0yrlrjkdz6tia0iz9rw8hq5xnkmqwr7z96cmyudv6261lgdjzkm4njhuww5to3gtf7e2nmb1v92ksx4wnhgve9xxmr',
                receiverInterface: 'eftewx7dkrbfbrevvbk3flfviz6uqs1f6yi6ck1ul4slevc52p2i6a590kn21sjq1h84pnxlqe70k9cnhbfmot5u1g8b57lhhx2asntt0sgdo6ocw0ifzvilr57dwbd0gd6ime2p147g97y1lx14goltnt5owt0h',
                receiverInterfaceNamespace: 'k3gi16vaxq1hjnynnwmwiisphnqg6885qth26igplck025c98qo24z9yhrx9wayil0au8luci7hgabksupn4epoh34fpi4roqaf1huyc9709hn9yrrbioejz65ob8e1lvfvwtie1056q257wcoj8rbh5agr839d4',
                retries: 4737169207,
                size: 3902543217,
                timesFailed: 2950670904,
                numberMax: 1487652857,
                numberDays: 9815900416,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0cd62e94-cbde-4f2a-8833-0a26a30817b8',
                tenantId: '074ceb1e-88d2-4749-a07d-3abcc44a7dae',
                tenantCode: 'qn8nuhxt6jym2dgd6acat6dgbveect7pbw09o6ivdfydpcjy9p',
                systemId: 'fd4815dd-7ce1-44f3-a3ea-8c2ab8ffefd4',
                systemName: '7vb0xvyujheqcn47yy0p',
                scenario: '9dwm26aqxflkpo2zd44g7ken239f9qcf0gjo05bkak8sgzyqldk2l1ye4gkv',
                executionId: '80e35266-6164-4465-9c4a-3b7420c4dfd0',
                executionType: null,
                executionExecutedAt: '2021-05-23 22:06:55',
                executionMonitoringStartAt: '2021-05-23 23:21:25',
                executionMonitoringEndAt: '2021-05-23 20:19:54',
                flowHash: 'wxvaxhd7wut8sq7ylv3oyskpobjezfjwodet55dm',
                flowParty: 'sln4j8fursjny7yhfjtviw3kzv9mpzeis748u7whpfk4eeyzha0v63ejx1ibexcf3hqtk8ejh3yej0gp9wan6762u0dgkt0fjhamwxf0zgsrulrwatx1i50cgejqhy2pjgs59xrocyxj5glihpyxxbnyu7zx3hxe',
                flowReceiverParty: '9dim9ov3m29nbqtfo83or5wd8oz1h9dbwn0ck4zlz4xhp1q4vxwru8claycf1la0ayxwosegmx0d476y6n0oi4033avmdj649evkmpekyad6zdaotj5zcvyy7w5nargmlg6vwx5cxunvnqohbgd3pfoaaxatp6db',
                flowComponent: 'bz3v29ws5fteclkgh8mowcriievvgfgrrwmb05x9bruqa2yor5ot5ecku3yf1zswwefzxmeq6wwl2d3n06r74h0d84pj9251pz1o5w1hq3szf3yy68cdw211174d805rcvirl5uprkttspsiitdkx02bp5sz8his',
                flowReceiverComponent: 'uml2f0r0efg5xed4u09ljwfwc6c822dpsixc7xnm5ekqpoceguappfm5mjrgkfo8jt7011fvest0f5l8eh5pzuen0xo08ao4ha964rfqkr90scs1ytudgev0n7zj4llnamowzwrue0qcipuu33pbnmvy5txh8orq',
                flowInterfaceName: '38zfb14qk3rnmyffgpqc1x2vv3fp0ccujxot72m856d7z9hp5yrsdwyelqofee086m41gjw0aehjbeb5x5e51jm1d8k020tm7zzqit9feiv642pwgq072egpvfc271x46d0qispsqwiegb93dg6u5f4d5crbgnwr',
                flowInterfaceNamespace: 'uiqomcu8on6q9zosw5nq7csb5z0p7xgn114goc15gi5acmjh4zj6v8op8djdw9kdyd99csnv6m5vtmd78wnzm92zriphu1vjs6aesk02zcat63o1l7vrr9ijw1xiew7x61ov46vpbwwgwwkyck9nxzbzl0aa4eps',
                status: 'SUCCESS',
                refMessageId: 'ucjj0w18j8olv54i55849gp8jpt8ydbi9unjepy9ydkpjtsy3zc0bvjgu5jt8k4cbpoj79wlg45kcan9y0p1ipt7jof0805ih9lylgfg0mx09we5zlflvn6yvak1p7pobz3yauijplmpwkzksp7luj022xi2ck3p',
                detail: 'Hic quibusdam occaecati voluptates dicta sunt sed consequatur modi. Facilis consequatur et nihil tenetur tempora cupiditate dicta sed eveniet. Numquam enim officia pariatur nostrum porro sed qui dolor aut. Ut saepe quos officia tempora ex a id libero.',
                example: 'i9659yxvso9h7pezqeg4zggokdi9vjw8jocyjnhf15dxvc5bh4pq0k43p2r58cu8pquix9s2t1kwzwl37wzwvju4tpj4qkje2zw5ig99umn7u6yqz7zu2hwa2apfree6ddwz0vd62pluk2ao0pnpn7l82u7qjv0t',
                startTimeAt: '2021-05-23 00:59:44',
                direction: 'INBOUND',
                errorCategory: 'ilbk8rclpr80nk2m0ilwn2axpm08qy7rzy9bln08zp1nz4q0fh9ab30s4vljx1eb9yec6247hf4f8cd5us0zogdyg6dsx4ya97grasf6mny31n9vz67f0qm3eqx4ropn6iqlmvceyt6ijzncxmwl9czzpdxl12wr',
                errorCode: 'hvjadi2nz7mc3vv909ec5nn1t4o41cb7r4vq9y1xlr74vzhtdp',
                errorLabel: 640754,
                node: 1370754537,
                protocol: 'xg90rovxrvqom5qpzs42',
                qualityOfService: '9bptf17ksba9xdrg8nod',
                receiverParty: 'pquh9sf1s2o5djp60iarxj88froaek06cucfi2aaix3b99rk04d0up73l99mn3tvyt9fy887zt5jn8zskgy6ifx19752lcpdon9smh92mw50ka3o7swxzakm5cnsuh37esqxfttg1b6u6ybz7454d3a6cn1pijeq',
                receiverComponent: 'cad81empgs5ki3nwifqpulfpaqvihny65lfjnx0w1e6m2bt1n010zwc5cgh8teu92nfk5tzd2tcn41t204sn746lb7pyalqilivslzzqvk51653nx1giqixmr01o7frvmlosehilh9goynyfgngcam2rx6qwfrvx',
                receiverInterface: '0ty1qk61ssbax6kn89ok91jbaa7of93t1l143tkne7jgp8zxpoliqvj066mv7g7os6r0ze4cdgl0p2r9l3e0nmd5g6q6a9amrqufb0tvrium43yr1ssbp9pn9f3at3vpug4qsogqy61qluvfx958g5e6e6vl8kif',
                receiverInterfaceNamespace: 'dcpwh8uapkv1ok2wmiw96alexe8i2ojjzaaujds18emgl6j7xj64hfcg4tqpmqgk47bs704ertvq4rcaggwhbuyxgi3z5eunll80bl29ulmgdfa9uga7iey5w4s88t8zgww4cng7m4j8usd0tg4bjraogrggbmdb',
                retries: 8874159180,
                size: 8640444091,
                timesFailed: 4332219136,
                numberMax: 4118639689,
                numberDays: 7866656533,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4458fe60-0ef6-49b4-81a2-a916746c5e1d',
                tenantId: '7633af91-857e-4fdc-9a86-0a803e71e0b3',
                tenantCode: 'cdthwnno6ngdxdcthirtlq4fa2zuv751vpl1okmk0a9z7cldft',
                systemId: '043e6f61-008d-4587-851c-8969048bfdd9',
                systemName: 'volkv19nmdulcwge3ysv',
                scenario: 'bo3gxxefzyxi2esuaiwleqq35cz0sac6r70z33nz68g5x393x20qpzpdrplt',
                executionId: 'e0948d86-45a8-4142-91c9-68096aceb791',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2021-05-23 14:43:49',
                executionMonitoringEndAt: '2021-05-23 18:37:22',
                flowHash: '4vv6ps64z6jd0t7yhmkgr75tat35693qduzn1dm0',
                flowParty: '427j00koo2xg9uunxch7hdlfda2mx6thujatdh6gdzrsaa1zzr8jwlis8vu982kygmjpt9ats0p9srhzo05zlvb6mspqis2s2525da3kpy4tgc7ma63d7ckwuxw5701ntjr2t6enhulgcacgr4ae8djcesek47ju',
                flowReceiverParty: 'm14o7do5ojy95nu6d0kq67wwxck3bqeixs1agajx3sa3wqqei2wyhuqm9k2tujnqvtbm0y601j129cb93zfqnine4ax6unxwt6lku7qn36rt1udy19egauyy32t1qd3w2b325hdw4v3b1le19h11ptnx0sx6x583',
                flowComponent: 'mkk5rj1k9kg0lhehl1u7d0bvbwybktxmsjkmm8snkrohjg4xy8rxh08ivniiopuc6148tpql5hljbcdd2j3lws27942kehgfqzeujc75uml8ijoopz4osvdwpa0ag0dlc8r8mycwyg6nk6r6dgo7ye7wdq2142m2',
                flowReceiverComponent: '9h3j7nqkqv3k68cm11funnz7erw208uh3de4azegz16j5jcet8tul72qn9r4leymx4p5bxyugh7w4qf3teciqfbewyitl92vlyhqt50qe4r7gywqdr1wxfsdc80iwselk0as6n8gmxtnd6kkya5zejckr819w2iu',
                flowInterfaceName: 'nq22x3fb9jl74w0yrr32xm0vntajxjx9emepnwgr6lt4v7vqhjmaa99rdk7kcr4bdusry96v9tdl4zbwux3upwtv7arbm0yzr9hlqm9oeax727o3yonqhlndwu0usjbg8228j90i7sx9g0m9h29y5t3z7mzgiq1v',
                flowInterfaceNamespace: 'zcznaybjk92z3h7a41qoiafr6dfmog70h0kcimvnem1s9mrxnr9tkvycp0djg79jwp8a6ib4f6044zzefucg3rsdpnv1fy6nc64ibemxrliz8ucm7ijp8j1en8vlpg9gzuj6d6ng1xan55dapur2cvn0uliecrgb',
                status: 'WAITING',
                refMessageId: '7foqhe4enu5792feqnjm8icpfzh3huwgz677xq7waoonwq0f4x68hfluegy1ef86ofvc6ipo1kfxis6tfbzge5xd6tk92maptfhv8ruto8pog5puqrvymt4xxoq87gxr79lbk3pv1evkzyd7mvubpyoejajoapup',
                detail: 'Magni et iure fugiat sit quibusdam quam. Facilis tempore saepe dolores quidem nihil asperiores id. Maxime vero ut in vero doloribus et.',
                example: '7v3p2p1isibpfwqh293z7smmthgoktqtder2bge9kyyop10dgyjtgs5ngbal0fi7zvc3axmg9e2hhx675wr8hejdm318lsa1iyj3ky7augtj4tjkuc27ith412rjoz9yvj4iz4hafoorlmb69uvblfm1h34yjrpl',
                startTimeAt: '2021-05-23 03:47:05',
                direction: 'OUTBOUND',
                errorCategory: 'q0r883s4kagi65g72h1ceb6xh2go6sqm1o5d1t4lh8afvxs5fwxhqf4yh3qajs5wh1swmm8o4etvg1e5hghokmpq0d6us9q7i70q3k56v48ud3uqmvwzsfdrwej3hljh2i9sd1o14uj81i7te3eqaacx1gb9z8fb',
                errorCode: 'i99fn3zy6m189rq80h2yb439zf2iajcle9jb5rgff9g1oleskb',
                errorLabel: 978938,
                node: 5685605804,
                protocol: '7yh2czpwxtgit7sakjds',
                qualityOfService: 'ep2x4atsh4i6ya9guoow',
                receiverParty: 'yahqr5rc7dzqijyd3zv2b4ayy557jv2kjkrh97j9d50bff9i9vbijgwc3rtpznydwtw5dvhv2xa4mv9go7q6rapuhqhvo283xxdtd6khsbo902yhwrxc9lq9ei6z1rjvdzzm07ii91wzxkf0gkdgcug2ihmq1hij',
                receiverComponent: 'zali9m240dmwe9zp17f8n2skozzgk7nemtafzg7wb74ek75f155ejftffemaeddh4l0onods3zzif5znuzr5m8ssxe0kxfpulutjskk707ynva66lbxth26ugpv6twj0wg1fje7aln4owwnzshtpktfisz1xeu5z',
                receiverInterface: 'blfpo76mk6i3i98cf1jpik5470bf3f905jliflgjwv310hc3lxfsq6fjjv0jym6e1cuihcqotbl3ocots9y55xih3ne6oijd7p25e0j8sqjfxadhw6n7fo6tlu99zdinz6zst818dc2s5ww2ne067ccahv37w6rp',
                receiverInterfaceNamespace: 'to0a01kxmqqfzh774bfw7kukf3i24m5l5vre9neg9nrpnm6u2vy0u0sovwqjyvvw1hfgiwzmwbmprgjqrp8bso2y9tv2ygmjw0st3h8iwa7ftx79l50uprew2o4t89xhxqfcha239kld4hm0lepwulaeavkyhorq',
                retries: 1363564266,
                size: 3161167058,
                timesFailed: 4945011556,
                numberMax: 5502996351,
                numberDays: 9548959744,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bc1caa9b-1e57-425a-b564-2d47e7183ee5',
                tenantId: 'dfe9d831-8421-4713-8763-34be02d9db84',
                tenantCode: 'u11xk0glf44p9mjpw8th5jdwf6xh6iqraoeulyg3v0u8rhiiga',
                systemId: 'b9271fd2-82df-4fbc-ad93-f3b7e8569eda',
                systemName: 'afgaf8vrct1w0ylngq02',
                scenario: '6vym62xk74tduzpujk5iswkv4sy1hmh986ytejyj2ku4jyxtrsjwqst7gduz',
                executionId: '15c3f0d3-538c-4b10-9739-d7b20f16750a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 17:34:31',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2021-05-23 04:02:17',
                flowHash: 'rhh6ay3aiard7p7sucw8fqibr6s6s5n9fbypxckf',
                flowParty: 'd5mm93iaas94snxl6gkso1dz1a7oghk4wgjt55v4w0satnndwf8tzwgxen07yfr3rbiov6fcysi2wv0r6krruvod9oz8abohtf7bsc5yw9hq225mnel3udnpcx722y7f5g3opa7vhl5mw83fbnlot4jbpb1aysn6',
                flowReceiverParty: 'av0lw1gsnfirreope07we7z4nx0qro5h8c0gn7jdyzolhz7aqptmkwoc6n3cbp2u8iywwp5dfq17fwdh85cp84q9q3dzmkfv8s5onu8o0njbu8w79s80yf5ko6fw19axxj0621a2do6f0h6onrojukj753oxdcr1',
                flowComponent: '5oe7llofivebli5wbqwgsae96wgannpt7j8cmydbicd2y1ejmfnraixjxojobyfsl6bg6ebbm1eintg690zfrl0qz45lm98vewteskbzx419631500bhii07ac4zfip6mxdnfrpkn1ecs8g60zgbnk6pmo628i1s',
                flowReceiverComponent: 'vhw6e0wkzg34qaq9seln0cv8musjoj8cg5yj47vxs4wn1flrzp3t7ucj2bj0tgzsyvxylg0ri3l37ao7sg4dfciu8be1tne2irfvh76b9qz674atgt9hohuuc7t1cwwvtur83p2fj20iki85kgkt0lghcejuxcbq',
                flowInterfaceName: '5yemxb5x7qvfpe8wqwarlvhab7oi4d1st25t3gy41vesko6uq6f517x3015n93qkhxkdw5djsyxhesnu2zcoyid1xr4b2e52ggxfusvymvmidkskfynp3lpaix87tgjlubhn4mdeahhb03kjf4d2imqoi122dac5',
                flowInterfaceNamespace: 'e12tylo82wh56wzw6v1sv0monseqhmhtnwrpq6ve8kjj1l026fcvg8zyxra0hfdnkd9pwaqpjfb0qukgs2ft9lqnap7hpqkawxcd44redvvi8dqfdu4cnu7r4xnw25rvvpl0vbing47i2802bxd2451m8oa3ukdl',
                status: 'WAITING',
                refMessageId: 'uq4x0gdql3wavu2m1p6r4gpgcywa8bpwnjvhg3z8r7jpda9vp746lq4suhjpzg0iitvxv95u1ibat2ba2qf7qlyradkwbmgvogbad6ihfrjpbgex0853kfmstx1fnuopwfiffgd3c0pn38qotmuzxfsbs7yxt0d6',
                detail: 'Reprehenderit libero aut quo. Illum consectetur nam nesciunt eveniet eos temporibus consectetur voluptatem. Nobis eius aut quos perferendis at.',
                example: 'raeypfvp0dpbuxgcthnkfcgldlsby8yeu9q04216wnj96k3tuwr7obgm3cf7jokbezum1g0w91ztirfg55n9zvrfv34elttgcjne9qobtsyad1p30uyq9nb0691n9u2kig7x06dj1hvrpsjcy07x2617dj8yht4b',
                startTimeAt: '2021-05-23 13:51:35',
                direction: 'OUTBOUND',
                errorCategory: 'hqw8u5vqplc9g6zyp4f36sxf724pfgyvqacfeu868gjz19t19k80bc8phlvrhcmm12l9n3vm8clogvi87wj16lyyj0wrm05ajimxpaekg27tzvsi42lp1hfbr33qee345uizxwvizs7z5j0x8ztl774kw5nv6pbs',
                errorCode: 'l2p0caesy8pawjb344pz8665hse3whdgxty031tx5pxkr24inn',
                errorLabel: 953293,
                node: 1605035422,
                protocol: 'xlyetnz5eomtluwmo5hl',
                qualityOfService: '8bs3zgtkaujwckya7qhv',
                receiverParty: 'd1aun851o7bwp11oi85eivk5wfxu5f0z2pk7odvsjpemd4fsvgjeldta9vxf4hkpd2af3ts7k1pkr3e2paznq0g2v4orvwi7zsmg8sj65m4eyjn9ymaxqi56z67yblt54ritv5f4q38uicww447c33z9lcugvi1l',
                receiverComponent: 'hfgz893vxle9d1fs9fpiu3mhnzas57dpw7eszb46a9yjifutry3zxm2t2wp7k6z7pp3bbpves6ihs0k2bzhtc7xe9h5m2jta8cd65o1vlz5qfmt54a98ri4q5qyqw0r3jgukg428jtyb5xq207ychnmgqhn4m80w',
                receiverInterface: '4k6t0ijdf33eo0g1lqfwhcato671nj0rpazss3wrl0oz5qyfqkyuvn3knsm7lg0tp2hvqposajjre3ig7y90871fy8zoen1nbpxo0l0jp95myxmuhgi4qowouguond6pxbwtakt4tunhlljiu2bz45s9vko8vmqb',
                receiverInterfaceNamespace: 'chs14na8aldiy6871cr7qlluh56rj0w3j7utbwmc8hyu950fjmk620p9rebs0grz62z6uajt11iq5g9w4lojp875wfxfi1wekcoxts4v7snwyizl866mhuur98fpyt2amcm2lycd135rgblka2mwiez13wfhoh9s',
                retries: 7710198555,
                size: 6640512889,
                timesFailed: 8082407067,
                numberMax: 6990836962,
                numberDays: 6014088195,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '580bb963-0776-4fed-b045-746020066055',
                tenantId: 'b624658f-452b-4790-b371-8ac8614d5c5a',
                tenantCode: 'bmhz2cfkx5edd7lrtt74bsu9xo1xa7pa8zbr1e74vcuurtdd63',
                systemId: '659f28e3-f05f-402d-aa53-5bf95c19a0ed',
                systemName: '3s4z3jstwd2nbv245mt2',
                scenario: 'bhrcx4aq5rtks6ih4yz2l2mtnyw1vv8j3i0wo13u4ey3hwtwkwphjv91h9wo',
                executionId: 'beb05609-f760-4244-be7c-1cda941080d1',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 20:19:16',
                executionMonitoringStartAt: '2021-05-23 16:19:11',
                executionMonitoringEndAt: null,
                flowHash: 'q5s39lksb2nz3xnfdjk8uda97dpa7x4dgidbfvuz',
                flowParty: '2z3sd52vpvl3hjzwanytwsqstkvs7kmv1d4wem0usj89nhwa5o0b1mgqoz3mijxtxpt4igh10wa7l28rn2ev2mstojuhr3ng6pv550wz2h9hxwv0j76etii7dc9ipv990zfitgtete84ikd4s9aoz0jln2pzdp3x',
                flowReceiverParty: 'p0uf1qux9v215poxkzb8rnfaslxwvnwrmf5gdajfqt66yc40oo97hx9r9l5ky4ksprunca8nfgnxzuzwm7qmh35zktaqwvhneutg4pkuk2kgtgzhurrkqgmr9u18wzdlooisepwtsl5zi5drhk9kvlzhklbxanf2',
                flowComponent: '97537mm261znxd4969ogjmuzzvx9i0t747avi8c5lj303qfokjbcxln0xstll7d6a53hbygjl4ldimxruguuu4f8b8mbzjsrzzfi6qngeecnq5qb96t2ogls0yfir81yk1ywb1yy2auel258snh353ajbuqyhuhf',
                flowReceiverComponent: '94vdvywp00iwr6drwu61hddkwdc1sxxm1n5nuvgzs76rbhez6sz4r1hjizk20t5oduptytpih2ma86d2s6iiz65elg93dsqr1vxtbnnwn7y9ym8v23o38br3uzt1gaasq2sa01eeu5915ofrdv0p8lssxovqri8c',
                flowInterfaceName: 'ikm9dkb2lpmnep6c54oos5dilg9na6cjwgnyxkjdx59411lk2cmgm07g5k7ihp9egoyegsfh0ehlnfhf3r13w4sijbkqnmlt7nllnrggeo95ju3mh93wy11mqbs8ovavpp39j30p63vqoblej2536zy1f4lppulk',
                flowInterfaceNamespace: 'se3mq4lljoqoio2gk6v6shsm48jkxjv94dqj6cpuwor1766u4gt8irg2xo25drl0qn54x6x9p1iewkk03xg6ak9qqaeyht1wzrsw2ygnfs3mea2a5jzoybekri9lxj31htm8ryyrk8e3bnte6ruwizo7f1d3jaa1',
                status: 'WAITING',
                refMessageId: 'd5yh427wtjvmr4r79sv57jcqq26vzd3q623tkv8mompe2ee5bt9vz3irbvh88wbwjqpltslumsl6j9x6mfvaz5rd80rc61qnqw1auleev0z2a181vfybubdsbm3puw0mvb6ep83x488sz4y35gza9pi6mbhex0kl',
                detail: 'Et qui consectetur. Est eaque est. Officia mollitia minus maxime aliquam cumque. Quis deleniti molestias nisi. In commodi possimus qui iste.',
                example: 'bgssizwlrvd98f23j56l4jl4e5p08qs82odd7vdpncx7bgoby1qx8q9e4pu2jk53y57rptqhfuff6r9ewbfaoezcqtjinny8vti7ebkoyllkdt40he4ec3ltynr0x502furnzpeufjb0w4c0vo3vrho2y1g0eqc0',
                startTimeAt: '2021-05-23 11:29:26',
                direction: 'INBOUND',
                errorCategory: 'av6fx69sr7w5i5sivp3t21qlguyu1mwsa8mrl2670mrwkzc9jaiqat8c4cm8obpg9owvqhnl9r582tz15qe97l5pq4f3un3f3ljvvsjlybuovwo0rubb9pex96ylao4086w06lf6ky24ucq303892c9a14ghn73m',
                errorCode: '08c9f9dv6aqjd7b3g0afhbdblp8ttc07klsg7bkadwwz2za5sb',
                errorLabel: 350920,
                node: 9921712758,
                protocol: 'qvb0mbce6ek6s7ysei14',
                qualityOfService: '57k32nqfhktqks6b1wdw',
                receiverParty: 'i0ty90cy3xu8xgctooqzq5erppr9zw0xqx7ukat2dxlge98901ns4bckmd9fxrh6wtlk2u1kg6kri62hadfuwa2yhypkssf7swh0mugv5ywmxpx1a5p3ddvpv38equwmgvdbzfpzyknjk3pwbebvntldlzdnugql',
                receiverComponent: 'twnt4xjwe8ztxighge6j6corpv4c2ba3294fb6cfy81mvlmlg3ydphaenfk4ricyur7hzgvhdhre7lm5e8jtc0dirgl0eu2wco0t6mqgfns5jwd9l5a7e3v7uuiwafwad3cvu02zj5ws8fjo6usgrgmh2ngswpii',
                receiverInterface: 'j0lxwonq7fiswnj7vrnamzvq1ka1pa6sdar1alawb9yng0t2fhfqcyfdlvy7wxjkb28d9qlkl9xnk96mdvywix9hhrzpqj225lqe03a86vphpiz4eec3g70exok0mht7s2525s4oavfhco35dhwcfw64lo0czz9s',
                receiverInterfaceNamespace: 'iflc8se9p7mc0t26b3ec53bdmrq5w9ahdyjkoaz7dfh3isjztk29up4pcffou1yan5rccohs6lju4rkyzwsn51yrpo7cjgpnub1rvjksutldydl5mc8fxk996ocq19iusv3lyud9awuy74cb0uw5o3lz7z1jcp65',
                retries: 2928711644,
                size: 4776614265,
                timesFailed: 3804566103,
                numberMax: 9985588873,
                numberDays: 2268910791,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f1832079-a840-4b8b-a5f1-603927d63848',
                tenantId: 'c67548e2-2c00-451a-a036-d7ccc4e47237',
                tenantCode: 'nrkvith8kmk23m0gubqkd9x52tmcdex3r5s2pm0s9sy4v3oht1',
                systemId: '5654a1b0-050a-4227-9696-9b7a601f99b2',
                systemName: 'v1reog4y1ad7ezeyiie0',
                scenario: '4lyb48cdnlm91aaij3xp2qdwcrbep3g5poz0k58pmdkygb0rb92j0vjhsfzf',
                executionId: 'b6c91f08-592b-41eb-bc5f-59964fb17796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 08:40:44',
                executionMonitoringStartAt: '2021-05-23 23:40:45',
                executionMonitoringEndAt: '2021-05-23 15:33:13',
                flowHash: null,
                flowParty: 'kur8pi9wnkpj3t9oafhmsnwu1k9tx6ix9c4tsszzr4uj40ox8e3qg392othur83kqkjeiyi1f4ep21rbik29cugbhd6067lhq3554n96beyf904seixafj6whham0k4c8dx9f0dmkvw2srdy5s67xesy75nknro4',
                flowReceiverParty: '35dxtydoqz1ji5xwsw13j8z4cq87yqi0t21u6z0utm2gvixoadvrqdtj1ccmws4oyvjjrig6o1y2b9d0ks445ntd2pozlgdpp8cprnsfcr7331givmk5h2ngepxan6h42cqo0hkfdcfims68uylb2pga9w6rlqhs',
                flowComponent: 'a4gto15ayhzbsljlu4p4agtjbs8x7ahk4dj2y9ejz8q4d7psqczs11tt6t8ar3i0flrvrkn8uw3h4i4wpeeuh3tcngsi82pup1ujpkxtxlc22hv85w2218m5eqg7yv03fxvccxhya0ngkcn1xpw51brjjfwewxei',
                flowReceiverComponent: 'pp16w3e25ymt2h8qkgjhzdwfg0b6tmrcheue6yacg6klnjoh65ijc0gzruhn6spwbupbg3g1ofqkzcecrlp0ktpmakpwvwfwxc3iz5bodparslncdtww886x4ho0nzx9u2y0k72nto3cijscqbpnjcce5wy7t25f',
                flowInterfaceName: '7ocbi9proae2rwhg5xji0mks2wa1q9nrvzpnhcogkknbpn2qg8vu55sk8gfbe8ndm56c7sjbv1ckxve20lr2vyf1r1bglo2pug91c63rq5siw1pxlbmh5dwjqu45dgc1qltceonyd6mynv438x2lczo7ld0ihlo8',
                flowInterfaceNamespace: 'x932h0g137qglb7z8aqpexsq1cyxyk0h3v0awhdu27or7hkmyzp922itjn39j2th54ws184rtppk3ubrdlodk8b1of37ua9422a5netxufd7kj885q4lcce5flun1rdfcgvpcdz6095ji9ovnaqg6u96xlbehzyn',
                status: 'SUCCESS',
                refMessageId: '6tuea8iuwtmk5xxd41akka5qppmb1v9yen5ikr6rucnfoe85syufdx0ufdcyftydcjyh2up782n4tbse1znggec7rjv4ordrxyx5p40l21wtlw08n0q574kj4f830nw5i6co9arxvu5lct6qlpg3ylrt3wa8xxxl',
                detail: 'Modi cumque at non veniam esse reiciendis. Eos molestias fuga excepturi. Quia culpa aut quis. Aut incidunt minus necessitatibus aspernatur rem. Nihil sunt alias deleniti consequatur quisquam non. Error earum possimus accusantium pariatur ducimus eos magni voluptatem.',
                example: '9s0gon0voepkmjzafpdbiimfqh48u2yx339dohbewpxv8szmlch1whdrjh08wjufnw8f7kpv4wy094kyf9ro8i7mdvzv3tq18318iklr5mrqs3366qqtjkm9usg3x1xyp2esvbjzngkclj8gcau7ymuf6pgi0nyi',
                startTimeAt: '2021-05-23 17:35:23',
                direction: 'INBOUND',
                errorCategory: 'j9xb7azd8crorvmj1gqm4fhcek8vsufm2xcoqwkodrj881jojujjgjken5mx63mzm35r19u654j0eshdsd0lsya0mhv52001o4mxzxdvrl01jhz1p9p6186nyzkfn8fgvl10uh09vwca8k255esqjf091jcrlyti',
                errorCode: 'f1xnodxsdx7dv7rus06sx7bm683bute7qmmf1a48trjncu9rye',
                errorLabel: 852283,
                node: 4506072826,
                protocol: 'n4oqtxgbecojbzy3n26h',
                qualityOfService: 'u0zeraajijmprruqgzeq',
                receiverParty: '9ji1fcfqkpu4ckt4amjyrasi61mvabunzqix3oik8iqw28nqz9xxf61eablri56zigb5j6dqlqbjnvjhlujmv0y3ic3mq11ug505dt8vjxbllj2yrji3qnh05xjoni13wmmzmxqi884jm3v9dz4nv2m8usspjp58',
                receiverComponent: 's59tuje4dw7f72tnjk1r1spmst76iboyfl3q8oowa1bgcykth6c0iwclc9c98hz5gjr48d7pxp0u2stjbpdadzh5pfk8wvymm9220z71yekc9o9q9ejczsi0ucckjasz5jou5c0bnkgqepafhf5opnhtrjrctd6u',
                receiverInterface: 'vs18j708dd0co1m40f0a4x5dyj1ucmlehjlrkc0cd9h0agjk3eae7gx13iotyzxi80z48zrye96gephs7r9782eu82e6rgr8yt7a0q2ym96d6e2t98vfx87tz194qj9yn7q6kh1rggv2yi2hgje3iptb6bfr0pep',
                receiverInterfaceNamespace: '05q2prtnrce9duw4ttrbr4wfczuuuu2xsn230v0p892phe376a610fknwxu8ou9op3unq7k0q5p9py9ooq8uzwuixntu80tzinrboe2z3l16kxfovcu2cln843g5c165dcps080j5s1vas7ka1wrmrc74z93r2vs',
                retries: 3775812714,
                size: 2583685637,
                timesFailed: 1300888511,
                numberMax: 7843640586,
                numberDays: 5201413712,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cee07889-2d10-44fa-be7d-dc5978e1c002',
                tenantId: 'a04dae17-399e-4d70-bb94-12802b06332c',
                tenantCode: 'gszv88qap3t5dcninqf0ihpkh5x8r59tlcnp6nk5ql64xe91rv',
                systemId: '9db6a0bf-729c-460b-90fa-2dd584378120',
                systemName: 's8ly8oy0zvd8c6dt2obs',
                scenario: '2lxjgozznck5ndcngy69vxaiimt6lkqtido01xje6txl5xjnc8hpfxozz6gg',
                executionId: '31fc1804-c167-4c29-8dc7-3cb802f64382',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 07:17:32',
                executionMonitoringStartAt: '2021-05-23 05:11:49',
                executionMonitoringEndAt: '2021-05-23 19:12:34',
                flowHash: 's869rnzjv0yx6uea5l74aq2qvbrnaa73775hpfcg',
                flowParty: 'axioguag5dcl2gzpbx3vzsnvc4i5z207k4bwn4s3suafsuqlt8z8e6qebnubk6kxl0enpbscx0nhoiqcdpqmjocgikzitee9onbm8gkhs58h3g7qeax7k0m7vdcrgns9uuz6zwmm3zt5oov5vztd1atxqv7fqhol',
                flowReceiverParty: 'm06f72esu3l98w4szhcffws2867i9n5f6igseyquxvmz0d8hvb1y2z9nvi26lduigj5jnba125jgyjkvazt1osm4kl4yd0fvnc8nvhjcc842f0tm7rnuatl0tpc4f5fely6nuy1ws3d5kt498rcvmae2qgd6e5ij',
                flowComponent: null,
                flowReceiverComponent: 'k3gd1fj7a99oxu84jom14e2v6ibjeg1ejho4zrq3o0ubupg9pwpqjijfttx0rfsjoe5phls1uhdv7moiqy1r3a41840xo1ardd8aavz9c8izbabs928824yqj3zehvuspl2nmontw24trvz0sc9pzzawrkt5rp9b',
                flowInterfaceName: '51n9p8hukny431y3puudutf6igjpfi4pihdy6fx3v5t61ftbcn6ixr231iwjqkbzndtlk97qgq17buww9mt82onzjhpjgnpjs9irvvt1z8cn5ni8x9sdkhzco0trek6vdrqudwqlwcqv9nrmk47tpe68hr917bct',
                flowInterfaceNamespace: 'f7hh1c2ps7sewz8vhd0yti5rcp9j0x2ccopl64nv3f872apycbyarf5msfoe5kn3a4cavvsvg0bwrj012v50bm2ztwx21mowtocwkg0cznb67l31y63tmxkvadabu7yfm7xqkyk4eifs4jnsctwplf5h47nutaqk',
                status: 'SUCCESS',
                refMessageId: 'n42wfx1avysqecqlike4na0mtyg5bav06od7cfnqzdwler1x58cy9mvj0njg5tvc6ld6yai948zmsh674bmyjdgbbg9rxh2kr394iv5fjvzm36737iqe5kmpzlukxwqf5noexsoqy79m526f3jr3ewdkzw2vkz5j',
                detail: 'Velit ex corrupti similique voluptatibus. Velit perspiciatis est dolor dolor assumenda assumenda a et voluptas. Quis sunt dolore ut repellat porro fuga sint. Amet et est excepturi aut sed nostrum ab. Magnam aut cum labore architecto modi facilis. Alias corporis architecto suscipit debitis qui consequatur voluptas.',
                example: '7vkqazguvyofxx2dhyedg6w4asozd1k20ewfi3imwxntx46sqmnpxzlaz5vsl6nk8p3rjojgbwdbfb074afma7mj9d1p9p6md9gz2s2hc3gyu10cgtbbimscx74b0e0x4ymgmo3a87xl0hwpw25s6asl520qw28v',
                startTimeAt: '2021-05-23 21:46:32',
                direction: 'INBOUND',
                errorCategory: 'xu4xn9yyouhqwgr7u33rdref2d7pmlzsl1mm2j0x6nsrohx3pvej1cm79jw75lbnwq94qty3xb0g9aguagj76g8az6eejmngydjwat3gjxw5z7ju6024qt9mzvoe2y239j5veghsz4pcub28wewwnca7h7k5opt2',
                errorCode: '2w9z2ijm3pva9ibdxks4a83dnwldtez0l1v2pxor6ox2dj43mt',
                errorLabel: 774073,
                node: 7985887512,
                protocol: 'tmpzn4me2gndckq0gb0l',
                qualityOfService: 'onitaixxl138lqm0o9av',
                receiverParty: 'ucjdknhnowg0u3y4j4g8of8s1roh8q5qwopfuz8wwdzs33z6wc1xpqpkokaxq7mu6bmvhy2fx8uedk36tl97gjkyr073tof0fhbew1o3928mqpck20fdteb4sp68el6p80um61g9xruedch91o6wtf6h2xhcme36',
                receiverComponent: 'uy7ta4vyy4c0so6k67r0od95zzx975lft4bnb93h80jaz2fjub417yvv4a5w0k0s3rwggef3qv0qetwcruj4yart0z7v0o32bmwre97fau8ai6ez0y91z5z6q3x4kd5xsb2h1rbip6oq67ammn2n6n0vuct4u7yz',
                receiverInterface: 'vyigoclobs6abe64kb6gjyv78czz6jvb7a4cin54nvzan54t8mipic0yizydvtxzp0sqmfp17wa615cb7u43yhtag8d5jvvjl2ykhjpnu36ncpmq0ku7aqcw6cvpkqsuchfwn4z9xb6hg0wfebxmia3j133thgky',
                receiverInterfaceNamespace: 'ejt4we7nil88f9j4g057o98fpy65ibn14uqww10gidxvmk2g48x51t8c5ayz6k5or0ej0govfxtye0ezoh4c4x2ju7ltk5h81e8ev1qpi93jbc0718wlo5e5mnmjao2si3sgwsywl14oh8jnpkq2f6ak3wolc2pm',
                retries: 2631888517,
                size: 1531989235,
                timesFailed: 1502566773,
                numberMax: 4669761263,
                numberDays: 8911988228,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b06121a1-ab2c-4b38-a89c-3f0989c5c363',
                tenantId: '51e62889-5ecd-4378-9660-5cda9f8b4ce0',
                tenantCode: 'mn30vvhekac5lra5hsnbe0knwgfk9v9ubttiqnzuxzr4187uwj',
                systemId: 'c8e3ee4a-f3e3-4eeb-b49a-9e1712ae8f1d',
                systemName: 'qvfj9k655wqlqd36krnb',
                scenario: '7og0pyhdh490nsbd43bxidtlt976no3c1s5djrv0jlsfgtmxwga0cbx0kjce',
                executionId: '6f4cf67c-11b4-41ec-b1b3-9aa2e021c380',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 12:13:19',
                executionMonitoringStartAt: '2021-05-23 13:04:58',
                executionMonitoringEndAt: '2021-05-23 13:25:46',
                flowHash: '4lobpoptj609iqczobpvthrhu6xel35b8mnf7hva',
                flowParty: '0o7nf6gte97xh0xo296r81s26hmqr8e7j264t0arvix6bhf4zxdlqogzjrrlrnockc0lrmt5jubhfph5mjgdzejxr7sw92slbu134yli12q7ftql4op33vxshk74x3wvwfdljnyt9pi9yec0brvfszyb84dv2pcv',
                flowReceiverParty: 'pw0lh4i2i2nym5dk9r4trd9gkuyum9ro0r1c1ufrx1kun1cxvc5sjts0caab3jpy29jxodq0mmrmi8xllt3fzici3jurgtumn18wmzbib6k0fr6c7r5zxw1xp39edwxcs3etwq5c0hw47r5cinue9p22i3rpvnzb',
                flowComponent: 'wc0yzlqudioy10j8ua04usp4rgzzjreimhptbxw2l6ljnwvamv6xwervxbool7agx2hjvkh8m1q1n7i72gdtkcjdx1ckaa8yx80ckftlo46we0lz4u0rms31f168u32gu6427s7qv6bxkxjv8dz5ik8yd3v1kxep',
                flowReceiverComponent: 'xb0f51fv0lmimewv8z2ssqpo8n2nekuqn330bfmqo6zx386ilvcseynqbwv192buz6syg014w9iefuy3uth6d3h5gkh7dvtldo5u2fh0ro2lqzgadkpo6hicnurc2j7ggd3080cby4fagft7lqvpersd9axxo83h',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'e7ja2jt88u4lywipmt5tictwvcwd7ggqpkfub4upaj93a1ic3ci9ip939pgk6358ft2gsk2ns8kxv8qqw3cysi5t8baskn2xrdquxb6zmvkj0bb4865vbnqce3j8t2go4ru9v5v2if9lvt0dvm2mmwa1q7l1k6wn',
                status: 'WAITING',
                refMessageId: '46eeaqy04ozoim2xcntyed7aksmjmnz5spiwx8gna5mms1tsbnkgkpriap9qglmo24vm7vwchz5qusrs5tt22erg0cfyth7nq7tixq2ikrim5k874gij6xckxklevg09lir9n13ae6ha6f41qx9puhh27ejnmhsv',
                detail: 'Nobis iste sequi ut dolorem voluptatibus. Sint deleniti aliquam minus delectus minima commodi fuga aperiam eaque. Sit est et ipsam veniam. Sint iste officia consequuntur at neque quia et quibusdam.',
                example: 'ib2hlymhfacjfdm1dxaucxm7qyovpzlgw9urh08a1w31by1x87y0jft57y1vd8eitbaotini8zqx00ul8nyua1ljdyz5bfz04ziyrhaokgk8gyrhpflz4rv16vx7qitqpi1vf207fh7h1rxlyscvyt7cgpyk5cva',
                startTimeAt: '2021-05-24 00:28:12',
                direction: 'INBOUND',
                errorCategory: 'ddgonik0u75xz1yt3lwpfm4fl47wh5reetpdvgcvrllhkxlwl8o4fothp26zc8vanm2c10kqarhndowejwbaea9yqpkbkwab0ioxse23hzapqzgwvfrhooiqklpvyxv0nwg31e88yo1e8buxr5g2feikb766tymr',
                errorCode: 'usuo7j7idf65dab1shdoqo1tc5fesdhh0evdu2s9j4bum9njrw',
                errorLabel: 431041,
                node: 1050247654,
                protocol: '28stg1xav7kms9ubmkmx',
                qualityOfService: 'jmcve019wkxcstey58de',
                receiverParty: '5cu040h9mskraz983rc53qebuycrwpx5bx4xle9xl8gxk0dvkjv66bac6h7ex34ve4297afod2stbketd7izlus0q918vouzahh994tgc6n1zkjkpmteqzrv3h7u85qofthqt0t8a32bf609mv2p2q398i72s21k',
                receiverComponent: '3xrf04nt8dol9czmvuc9538hrh35vnwos3jzff2rmz9ncly4xct4m44w86r4xlgwct4y9xj363y4bu2kqjgb3ejoo62kwgur723itkx80fv295i04lglke5udd0ccxr1dm6ygttxc5uq4xt09ny2gcznnrt07kg6',
                receiverInterface: '9cs72tm0xn1hmt3xenl7jof29r055utdpaqcnmj0xmg6p33r9bc5waayxi74u4ubni6gjqokzflfkd63cky2oep2zjut78s5bq8pqroseu5ttu9xi4rz1rqbbp8rxeochvyxuu0q701vbd5n66aqgea6xcq2jt4g',
                receiverInterfaceNamespace: 'rme91rc6bfn1hro0l1mwuyjro1pkkgepr7nctjynsy1zo5hcfxah8ut9fmnrg8fyn2wrp1ex6ujoiyi33bnl9p4vqtas4htp8p2g4jcjtwhea23ydvb8qiv36rh7sz33ffwn3ons5xrifyvu7ye2r3lgbum9m55t',
                retries: 7201186705,
                size: 7010864851,
                timesFailed: 8988497111,
                numberMax: 1247752758,
                numberDays: 9296132630,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '93a85ba5-501f-4634-88a9-4397420dbadc',
                tenantId: '5081090c-5c71-4028-9cea-aa3cd59b2954',
                tenantCode: 'a6bm0m1i3q2u4pr5jyiukyhy9h6zo3eeaohtvm3dqxlabsrrsh',
                systemId: 'd32e63c9-c5a9-4ba4-8368-a39281ba391e',
                systemName: 'f2bxkwuiqck1x6qan9q8',
                scenario: 'a1gwf7m9fcc1uo3fxqjrtll6s2l3xnns28v5q8bdtfs7nl0gdo8yykzux6sp',
                executionId: 'e26c1d61-832e-4636-9e7a-fa87ed4e9b71',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 01:24:40',
                executionMonitoringStartAt: '2021-05-23 03:37:30',
                executionMonitoringEndAt: '2021-05-23 10:25:01',
                flowHash: '87qyf1r8xrra2s2uzord3oeeu2munq7a27rfqw2n',
                flowParty: 'kfjjqqpmhq7ce919ekhlayhvkaetl49jg3a070zswjg4ae5b5czb666j44lsb8rk1rh4gj5f5iys7tq39ro8ljpk7excvp3drqz9vsbke0rqfgb163fgrwdkqswgucplinq6oc1m4zviwgg8bjr3dew8cwtae669',
                flowReceiverParty: 'cuneelpolufo216evl8fr5v0f18ulzo4q6hsyemqweoc73c6ktvaqtmjpx7qm8ne5ymqk29vh3ylm1ed2sojkidckrv9zcw061xm77a19zcwff688z4aafvqio7xh8wdm8unnczwlnih9bcz0unhtx0v9tli9n0k',
                flowComponent: 'jhplwqd9ifnv7oah9l46f6z62467g1qoy0zzoj3pcb0zulcw8hgp4oqfuu2g3be04tdiyzz7mr12a00d5t2zs2tl2zkp6vt3rlsbuxz2fvicajt5p4b4mxkwh3m4rkhhhlibhtzaw8z0y4rpjzb8t0gn2102fs1p',
                flowReceiverComponent: 'hxdtaki5a6hfdw02xmcx6x4yof2uto26domqjq2ythhmy4rjvqlmwetdhuf2ianhuj0eyoox5cqysdpqev2w8iqg4wsj8ey9ior1c4f2l54q8j5c9gp9pd2ycvjptwy0e94djm2rjwyrwzf1wiu71l5qjiqn4yzd',
                flowInterfaceName: 'je900e7floxjng53vjvz81kwwhj2z0whwin7lo3rd594w654w4rxjshlezmwr71404an226oa9aqahe86gw8t80to6q2tqoze1z3i34oc2cdn7nxhluaqfp56nbhl8c44j4cme1egu1coy4xpuuuppk5il9m3wuz',
                flowInterfaceNamespace: null,
                status: 'CANCELLED',
                refMessageId: '0qfrluqel47jikik98ecgety18y8a9giz3i8utvi0hvsiy97stqznihv0y5mxlxlfeft94sia1npt1sj2e4uwlwzcqxjmsx95x219f1pk0845d3l07m5x63ljzttixqsuqvhhr8b4kkkz1h6ws0tkstb2x9f9kwe',
                detail: 'Dolorem earum est tempore totam quia architecto eum odit. Doloremque modi hic veritatis. Placeat maiores aut ducimus numquam.',
                example: '0ket87s23awrgvk5q1vbdf80bsc0exlgmzukwsbpjn98uosb40vbxuyqxtcv2aut3vag2gz8ua9qwna8j3oe1yeg97oymxxh2np5v7v1899y6pan691bqywdt6leyu40rg1472vxr1kky131i2ufd2e3842z06cd',
                startTimeAt: '2021-05-23 08:44:33',
                direction: 'INBOUND',
                errorCategory: 'ctlganfqo58z28gxh0cjp8x8cmsp2a8ka8qfwpv5vfg4pn3vdcidbs5vokq5hh1bsrmg2ee6egp84uqdvicvdg3v3felpnh7c5bm4f8t629np8n2luof4761i02kgcwj5urku0fzvya19dq61thl1wqupnvxer93',
                errorCode: '3ylh8j71obxvhg4cwlvcb70og39s4a85eu5o119xhjcqmf2tpk',
                errorLabel: 366250,
                node: 7612425456,
                protocol: 'tup7vq8qsshy6m8b13hm',
                qualityOfService: '47nk5ouss8xps5f6v3f0',
                receiverParty: 'mrve09tapp2c7gllq6tptytx75ljq4785hi4veunpjtwe9dvz479ehpnt7wur7a3nmjlxzwt8iu369deb93h22huh38gi6l5mrgkaup2bb3pkzszpb0my7nsm10t4z26uoldr6ynscm8nwcpusopsziobgqlj9qy',
                receiverComponent: '4me7n300i0at9av4jheo8btbz4r151a10ywgfeg7ruk6v5ncx0ixyd66hlpssd3ojieormuka90wiev7ifunt13k8u17d60d0hc4nw7yb8uqm0dojgv2pje4sbe7kmfgc7q0kr54m2kxe5ejdpythx6ams8q2ue1',
                receiverInterface: 'rd86kpgvn5uksbkkl1hit2fyykexgj3nttet7lsh0el28l425zh2sv92rmtw6wuiqj08h2hwztki76w2nebv7jnk2b7zpccaeizajycnu9mhmppphwzm7ssfegxdj97pksag0l21h0fcnkomps6d8ix0ltaj5gji',
                receiverInterfaceNamespace: 'izlk06bfw8iozuf4nz5dc826smlft5wt3jb4w2a2kh430b0erhzt06hu2prk08cq615u07nfqolnd4rjb1qtkhgrfaogbwitkboiaz7fmwsea47xiihzj70n1yuuqrthrnciufttseiwy7wtug31wodhfhm5ypyi',
                retries: 2370953006,
                size: 9491455766,
                timesFailed: 1564670206,
                numberMax: 5651351043,
                numberDays: 1909319875,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'eab3506e-b969-4da2-a070-ea9c5a7b39a2',
                tenantId: 'e1852235-ecb2-4087-9671-4ab491ea219e',
                tenantCode: '59au22lcf8nv5s4ddxrzfhhz5ydgbyj8tfks13caz45tah07oi',
                systemId: '99537938-1168-4989-9dee-fd0361cab608',
                systemName: 'i0maxkegk4063ut61o0x',
                scenario: 'f3q9ubnrzgnrpgvpvv26xdqhhj53731oov0pl8hvxwmrabrxi671pgzmulqk',
                executionId: '2ffe051c-8191-4a4d-917e-5511f6a17388',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 23:13:23',
                executionMonitoringStartAt: '2021-05-23 04:47:30',
                executionMonitoringEndAt: '2021-05-23 07:33:50',
                flowHash: 'wucux9nk4fbfzk5x5yuszca1wylu9et0f80wob2q',
                flowParty: '8mk3v8g01as01nef5zy4nu9bjfq14zrnvuemvdupuv1ajmdv0zix4lr4mdxoxuv4zqh6jv4xlel82382tfpcsafuya0wwwpoqkontj4n52eveqna8bg7wc2zyldi4zrwbzq1rs3lqpeikmn6uqvizuxiokcfah4p',
                flowReceiverParty: 'ksmpyuhgts676z45tqc4k8ugrq5tw2ebwqlu9elecpaat4f08g0f48sc5l2hs3gth65gtxkzu6jf1eczrx7k8akblz8s16a7eqlw54qc7t52ls6b0sb7pkhebjn54hnpzxvys8bl0bo7mm4gre5oahw5j3n626x1',
                flowComponent: 'a6i6nuxccfvw2schz8922gchgrm7oce2zv52xogb5nuv2s3774v4cbz1det2yencef98tt6h57yb12vn4ioiigcjcb2c99p2ri7lrp0k8j2y1q6jwdia14srx98jtf9nvzk9whdgw60rgt7dji4537zhuulhpznh',
                flowReceiverComponent: 'gqv59ok00nptwi8649ipl6fyqbl5mlwdaliaa17yn7evfpdzpq172wzkhijr31hcjb5hr4p2i5htviux9c4zayett8mtdsi9n23xrmaybsloo0ropmy21d0q94hcsy0jkdrab26fduif7jdxt8mgr1ufady8ttuq',
                flowInterfaceName: '0dxaund5ejgzcl2a86uaa53s6klwf3xht8pdazm43nzkbjltw6sptfkrulww4bul8tfb62opx43mjiv35uneqrswni8j5debscx6rcfgyfyzz2ovje7l8uvvveae081m73rwyemon4cchumgn6u7x2ur69y9e977',
                flowInterfaceNamespace: 'qt6swytai65apwjr77llqx8bs407qxbohp04a0b32jfz628movemps63da6dshikspi3ecjdpzh7fed2p36cdllsom4sx878v2raplzlciecne564tx8ry8i53pumezqekgvntyb4evwb5te0ilxbo92j7ur3098',
                status: null,
                refMessageId: '4u8ga6jnv3mb8gbvllkwnekrm02lz0wggh6z5m3vm5fautbzuxoq7jbmt5k5hk6firx30s0mvfgwlee5dbs055vxemrcf84b8hlcd8syu5i9z6xup4fxob7pt56g9qt0r9fb7sosxmzscdsngqe5o7aaebfvmcns',
                detail: 'Aut voluptatem aperiam eos placeat est quaerat. Repudiandae omnis recusandae. Natus dolor molestiae commodi reprehenderit. Esse animi fuga consequatur id consectetur nulla vel quam vero. Blanditiis soluta reprehenderit eius ducimus illo quibusdam qui. Qui quis itaque quia.',
                example: 'xria58y8axxdtihuadbc9t8vfupk1j5weqlt621itdy8qlcgqx4a7sgzqwbfg595duoenlavnlltfem1ggbqc7oscishp2jof8woz4xekkla5ajm4gcu2uwt3zlapohgjpixqnm1fssw6n3ydr3bxd1p5ppyt2m7',
                startTimeAt: '2021-05-23 16:52:41',
                direction: 'INBOUND',
                errorCategory: '5sjkus3q0090czn92wzvv7v27rmwni8bc6wmh844rvusaqd13y04kzt0v06s304clhg7y5z1pdh7ekuwvax7sh8ftcibdemk9p60zb11c5wrcbvutdfxzf1clsdlie51xkqbbzo8fkye9ugzqir8bitt5z9ml3dp',
                errorCode: '9u9was3arrg4lta3u28k2ll3oao8m1vz77kmls45wsassxeyf5',
                errorLabel: 909534,
                node: 5125586195,
                protocol: '0gfxz78z4xdr6u0hzpzk',
                qualityOfService: 'cq7tvqbzwks166l1ck3p',
                receiverParty: 'fmlel66qs32358a1samc5h9b63a1uaqsjgw2dh0tg085p3uk55y1h7fsqrlx2x3fnqqf4rfzxegxk1l0tq4yepp12vkyo67vvetpq5h0ievkqzx9c4lffj9da9njs111jdoiyclvf8t6o5217wjbbkcziy0lqjp0',
                receiverComponent: 'c4cghnxlroa5ztq56ttke5tzpkl5ioc3rb9b6vqka61h07fvwlvmbw81xd727led8etocj8tf11wf2l5wj2wd9swmpa8fixzil8xfuhjslzu28qg0yznqny1psykl6f115v1ctdrxc433j2yt1jh0zasc1llx3vc',
                receiverInterface: '4e1xv3dcsbknfrynxfn09vwenc8hg96rtfhp69ruuvzn4sbbhwj7nrzpyghp1xcdp813uksjyfhqkczmgpieqd3whb9vg0r66q9tlsf06iw4rv7qjvcn84waz6aq96cjmz1o5c6noydmwzx9kjwel595srhpt8ub',
                receiverInterfaceNamespace: '34ixdcgikwudyw8nnvfrfkrzfkj1zhko1rjvxs04l8iv7heepge2dkhpxc9pojjup4b1sxzf645txklvo67sclscc9lzemnpcazdm6da4r0wz03odfv17yuifu5oh8zjsknscivunuo2har2yp1hwzjgw5fbe1c8',
                retries: 8558575803,
                size: 9797884125,
                timesFailed: 7519523292,
                numberMax: 1958030861,
                numberDays: 8426718589,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '52a3f5f1-edd2-4387-9ca1-9fe100beeb89',
                tenantId: 'c28cf83d-5806-4ee0-8b8d-0fe765de7a0b',
                tenantCode: 'ws04cq2qimbxhqdh30t8yctzdsgqq9n8nyay9e8svg44potrek',
                systemId: '15b4221e-1f31-4a3f-8960-2c828f8a346b',
                systemName: 'xqkntnvp0oxepkwlldef',
                scenario: 'c3zr1e9k5o2v82rxvm3bxjlcqdbgpx7lh2vv9ey3y2nv4v4is0s0ib6hzia6',
                executionId: '248aaf5b-5182-4c91-9aae-2214c89e3dc3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 00:55:18',
                executionMonitoringStartAt: '2021-05-23 11:29:01',
                executionMonitoringEndAt: '2021-05-23 17:11:02',
                flowHash: '4x73opohq1dxqcfyd34ve4iwz5uf0owjtepbl6lu',
                flowParty: '5ww57l23ztlfkjyy2uj5bas5fr34v1oqodsvrqbfsb3zgcqyswklhncn3c0cbzan1r5d5eqi3izymlwqjbqktldisk30sc0dno044ic9xb1cb530s9lzieo89c5zo06wfdhwqrv1y6zflxv1t8vfszlyewojma2b',
                flowReceiverParty: 'cj7tt6cf5urehi1xineoy7oc0h9e3qmqshcm7s5d993rsnckyysi9id3z7qzdmqrl06574p1ecy61pleixsvmc1vl2hojf8jv1jvigm5k458fmrpr93062y09r6jnawjkn8gu6v5hm4t7f6g3t9ayuua0v2nagub',
                flowComponent: 'moy7s1euaruml9g4aoczdztv6batiktytt0kig9tprtwynto22d5s12labg7cdcs1j1256d22youohacp25h7nx16fv00pzkypqv8bsczgew6pb4y0ce1qnex8650gzg4o2zi65h5s2xre1gh31h46hgiogej499',
                flowReceiverComponent: 'fx4qrfyihaby1qqwtanursp08fsomjnyql8i9xmuok2vffu460jtc294jnpvskouz7x18u2szsxpl9e9gbluebskghq4qctopmj36fivp9djhdgpn2pjgyg2axh5to7gyq5gi6yfq7enrd6dd7f5qubknxfw6nok',
                flowInterfaceName: 'eic48w7jysa1qucg0lzx3y45ywvwnyafalpako9vv071pms31vvbgb7g4ip0xlazubuc2pa580cfk8fefqv8dve5vpxcfccf5uz7i7ic1idesjow169fivnqo9b06a3zpwvluizc4tc5v3z41entjrdxysc8a648',
                flowInterfaceNamespace: 'knpxo8wie2pow9ep52yjkj4akn7syy4geu2ltujxxeiqfkwf571pmnrixnyfquaqiuja7gor57xv0xfxwm5gpqc3dxq17fj0n3x596vva400z6mt0hpj5zlxjyzxtnbkoc8rxb1t7mioblumvac7xh8mjflmrdbm',
                status: 'WAITING',
                refMessageId: 'yahbfbjjsb9079o5kzg7ldcozymg58f8uia9z1t21t0uh24x0qqt7hfl64jjndfa2zg1ghj1tsa149ptc4iof6yfgoq2u64cdif2c0xqst1kn2te25mqafcxxpoi5rya3u9hfa2rc2usha5dyet0bg99refesxhw',
                detail: 'Voluptatum voluptatibus qui blanditiis. Aut reprehenderit hic laudantium eligendi. Et numquam molestiae ipsam suscipit maiores dolorum aut. Aspernatur enim aut nobis est. Expedita et ut ipsa quia provident labore ducimus et. Dicta labore id esse incidunt est.',
                example: 'xg3ucscx1ja3eae4ggys762vwzms99eof68w5beklpvb44gmh7mpjeua1yp88ca0bn5ru8ido3wg9pjsarc446enmhbfy8n97nvok7mjhf93ivmyu8pl88fphj9imd7guzud9ej95fr7rhdxhwovqhkohhvcomn6',
                startTimeAt: '2021-05-23 18:26:48',
                direction: null,
                errorCategory: 'm87qkpc4pifcbptxft56ay4hdbvagqfvtj36myqfddblur4808enh4o4k3bg1zunzuz2kuod1zozk7z0oks151u9o876gi5wonltgoj249397fe4e2d9ytl3kxfc14hll2hnf31whpz04xqwa2q34u7f255ltavj',
                errorCode: '57kfyccjb13goxt4si7f5rhzb54tp4rpuzhcygiy846fkfl0di',
                errorLabel: 700006,
                node: 5745378929,
                protocol: 'ung0gnnzrg7mpyum9lw4',
                qualityOfService: 'de1d507fmr9uuif5bne7',
                receiverParty: 'eb6drodik0hx68c8w2hj7t74ak95psdf1dxwodgnm47nd1sqrf6817zskv90yk09gt5lqslkatkwy0l57kz1ha4w7r1ombzvi8qlz9ccsz84mt0jvs4bsud7sl3s8l9qramqg9mspo9mxr1hycrsvt7w67u82ac5',
                receiverComponent: 'px45728s1km5tt2d04n7f6mccp0q4xibhjuo4xyhpjj6pn2tu9oh7gkg0bj1k6u735wujvwebqxgw068q4ps5dy1x3fele4gswpj0s9kogyx3zwy2wzbid5iblyws0simxv7uc6gsx56qv3egr8wmpxradh1tqfu',
                receiverInterface: '73sbtigwr3it4bbvxcx3p63qn6pi45hvb4mjo8uso3mx5xp80c2334xkxd5m1ovdqiz3ijon9sz9bj873jhwtezqn1ilsrpzl5cpgejq9cknk1a0uuy0lcuvkkq84k3hvojh37ovdanjvqc5oaewmyyux1vpvf3m',
                receiverInterfaceNamespace: 'zc9u4a7ykkoxxcxh8g6lxngh3yz6g7ddwube6j5damy0n9nwjhh00uirin9bi0wjsmnq1ptnoc2zv58nmyvpb2euj7o4oclhjtzovsnes0tz1q4qrgvvknmwojiouz75rgf9paxv8ywlrtthv44v2n75ewjmzci1',
                retries: 5140762466,
                size: 1484225626,
                timesFailed: 8554132359,
                numberMax: 6097562154,
                numberDays: 3024398862,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                tenantId: '5d71d5f2-aa8a-461c-9cc2-ed1b1289fddc',
                tenantCode: 'e7ys0c2ebil3fvt24zdlneuywslvcycjiu5nkq7690ir0q5hu1',
                systemId: '1e495c63-ccd3-4050-8bde-d9d761c70260',
                systemName: 'i6ig4cp3tv3zdvr6l6ut',
                scenario: '5s83necrlueu7g25y3kmtwrrwckmuqh6nk8itggd7x6v4do0qu4ekr8n5cj8',
                executionId: 'b519489d-29fc-4fc1-9027-712efbcea899',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 14:32:04',
                executionMonitoringStartAt: '2021-05-23 06:49:58',
                executionMonitoringEndAt: '2021-05-23 08:53:03',
                flowHash: 'xzzdssvwxuflle3kbz779hvl3pzd37gxyvbkzoqe',
                flowParty: '9enqmgrkzokmm9uxf168jaxwiv50so9u4et11pllgmjqn9qwbu7q3y2s9i4l3cpbzk1mt6wpvgwnxe67bjx78kaiqpk1ld8om02hdm4wkq5p793thcfmfwc5lmbs7m39mhg24cxao37aynu09pz9qv9phg2zer1s',
                flowReceiverParty: '7yb1wxoltvh2xqapflv7y6i34cwiahf31te8uqk72wu0vfpwy8dpko9aiwun9i6m3twu719xivxg7y10rxlugqjpec4lqtuywrrxcc2cjrx15327u9dyrp18h81jt8vn26eb3gqyiycx6utrq61dv5byf9i058u2',
                flowComponent: 'u9gfjn2m3al42m90z8iti4u1g2gfywspgop02vpdq4r381cnwwl58gka14l5ehp6yv6g9etzgobncie7pulvzgw5sgofun6dffm8hsyjrpeq7vtxsv5fgt86c884ym1afifz22fvazsr4mcd96oymrazxbc0fi15',
                flowReceiverComponent: 'oh40gykanbrreg5i6hi6s8lukqoco4ulu4cpslz506gfv8nke07u5q6jy1zshn5qszes3uoktl1dygy1fokokrtj48vfav49oexq4yq1uchivnpmw4dvw9wo5jiqrbfzf8vfbgz3x413xpp0bllorllimv0s4bzz',
                flowInterfaceName: 'nyzjfkx7imupzgrq6cb0v3j1u0ntkrf7pa8tis12vianat8ljsepy56xcvpsqrdmp1s9mt3z8rws8y8rbz0opyths4i24k11xfsr7e61rq9tlx461qh75i2lxar4vh1vdyfdbx7z5a7rkado94qm6tc1t424nl3k',
                flowInterfaceNamespace: '84brk07ep2v5ngnfsgftkj5p6v11yxyt4n830rjc8z9843w8u65hf62vtonrdoz2c1lk0xa6bwua4l7gkaisjbhm4g52er1ohts082sxc5yc3frgomibnpfm77etba1qehl9t5kdpet0kb3g4ji8agskraive386',
                status: 'HOLDING',
                refMessageId: 'dyiytjykv7dczxpvn2te4d3u7io92m1luzuw9zkbyt7ihkxk6wqvwnysln50z7sqenxxhc741pricyzs5trbs1q2kc443iazitdzlepotvqmdldx2zohka37mt5tosf1cp2b7jtbw8zgy840kclj0m6najuekczq',
                detail: 'Eum assumenda est qui repellendus nobis eligendi odit tempora eum. Consequatur est quis. Rerum aut minima voluptas. Magni quaerat deserunt omnis quia sunt ipsam similique. Aut impedit voluptatem nam magnam ipsum dolorem eveniet. Ratione rerum nam blanditiis officia odio quia et.',
                example: 'cj2rd70xzys5osv468tvygot1qmgyj1lm2de42ltm9kad85j5zcz3o7yhapi6p7u82pdkrb0a48iy3jk3cp8uipwy6usqcoqnp0rw3lj0purb4o93rqhk2hi5rlzgoukgn3673hznqebrcf7ehv8dbhu64fd9w9a',
                startTimeAt: '2021-05-23 21:26:21',
                direction: 'INBOUND',
                errorCategory: 's1b13x3bbyysc147mf2hgn3s9jnvucinu5qux6fuyeahjai8ucavbvzcebj5rgfimlpsy0gnid0fzgswpfx2ozjqjg8ymyefgz8zuyakwx4j4y8vkzo6v8ubwb4p99hho5bvu20sni253w54o41owb3h0ox4fmh6',
                errorCode: 's7y7wvugqxg9v2o3hmjupbdsnrumtfype1b4xszy21s0nczjw3',
                errorLabel: 932922,
                node: 6056458179,
                protocol: 'u2pf81c5ymovdx3usnuc',
                qualityOfService: 'ublwp7ap2utgootimwki',
                receiverParty: 'evbwj0scvrwnejqhoun30vsq9c5yvgm81rdd2lk2vgwhpdynur4t2pnyswn08xy1iqpffz9knqe36hgkzw6l54hoby9xd33gdhopsb549c84wr4ko3dtufk5iwluzmskbhas96xof9w938v3apyxcshp9hukww0w',
                receiverComponent: '7f2wa0uirityrwyma14vg04f4gl0j17ql546b1zxog04ap6n6lkz08fmcwxmsipmzp9zqqd9vycdrmgij1ohd5qcchc9946nlixiath6xzflp05cactn7jrwvk8k0yne94krz0l09tgfpzbbfdtb0g7j6ejl8pf3',
                receiverInterface: 'tbgtyt4qn4adl8k2r9awisira06pxgzenfxkq7patt37yydbpkal9uoi386snbunxjsbh18gv4remunvn0mlq5f7s3nlqbymvtnx3k4d36bid53doca8sduwdfwqp5q8kdg576abo4y58dymjljzwp1gwchlw7fh',
                receiverInterfaceNamespace: 'c2zmglu0pawmxblmgxsyzwnchrlfyk7j2aynjv7oowkkmq8on8xe8sii8rcybn1ebj7n7avze6vku9v5axbg1dj6xa4ilbo5eqdg5euxzh8vt4lz7f9aonkov5xa59wnrlvfnxt2k75xvq09iwk1ukufsvhd3r0d',
                retries: 7105685980,
                size: 4617909718,
                timesFailed: 4894222714,
                numberMax: 6888333578,
                numberDays: 5862779782,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9a6dd1fa-83ef-4c9a-b018-d28523bf2750',
                tenantCode: 'n2n7g4qmvjg2idru173unxfvg5bhhj8wtgvclad91bladhgeut',
                systemId: '6e970cca-fbb1-4cb1-b543-7c041a43cf71',
                systemName: 'lyiuv9czobsk68c1jwfm',
                scenario: '0a9noqbf1r3dcz2hy5w9j94g13u943yf0mfnvshm7lm5fkjy2rbsxe3x72ad',
                executionId: 'ed22d3a1-5396-4385-b340-179c60f9934a',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 04:33:19',
                executionMonitoringStartAt: '2021-05-23 11:01:36',
                executionMonitoringEndAt: '2021-05-23 19:49:15',
                flowHash: 'mn4w2aa9rtd0hdqlwsyhr3uy34l2crxewalfgvqr',
                flowParty: 'e6n8vyglr975ij3hgow12z9wdgyx3n84m03mzwaigh9dbgctcyo7jr72bnz1i08afwo5r88r5t6en6pmyov7etu942ce0m7rpzonkbkzkmnztcd36rrw6sxijh32l0x0fjwhj1yheb3ixh1pa6uwqorq0wqg4juz',
                flowReceiverParty: '7hmmdgo6dnb2i7awyact52pobkdicwytfu292qzsobu8j1tpu8ophlwetiensx3733fp6nkkr2fol2p28o58yp84irs7u3zed01021hpxfpkt8jqrtbwcqn0irvg5vquekxwe0jur15k6khsuje0ros1jemkoequ',
                flowComponent: 'nw5nbglggbnqs9783ef9ss97ejhbqd3yf7hfdratrnj8hpwpueamzoc0gt003x1bpzizqbp8on7fxm03tp0lhuwhdjymv3f6r5y4gea744o3z3ygikx9sb20mprqhmjxcpugd91v254rlzcjez5y342zdoc2cjvw',
                flowReceiverComponent: 'fowk16l00i8fdqmwoanckt433uk2vjdddh2fujk0bygpeprw4ioh0zvmw0ok9tt9z4kmahx6kyl6gs93l2gc3d2sqwysk44fy9pil4ceenwctb9f28gn8e50lrkyh39ssi90kxphv8wprbmo45qnkcec2khl111q',
                flowInterfaceName: 'jrjjicg3bun9sv1jlc40e9s5ep8a1sb4hjkl6qn78m5oh4dowrpte1piq5fbhzdz206ofd1iyb94iv4yd9u7j2gvwvyplh35qq9mie5yub0pf6xssrlahcwhdcnvooiz4wxqf1b9dqfj3t4vrsbge64nk9i8lt7n',
                flowInterfaceNamespace: '1zztacpymo04p3mu0lkawht79ce9lm3tmw8yritz3daqb63uju7twgjmdhr2dxi315cs3z01jghj8kmhpwzn018fwt197xa91nayiucscxcezxwmsj496nsve8a83na4w0gv83hajetchjywultvwpfgrkfww9ja',
                status: 'TO_BE_DELIVERED',
                refMessageId: '1s656vtfkf8o0c36eu3fpnzenezqp3scy9uza7qaify4c347ajjt65wu1uq0mjok9mbv73ylf3l1x651o1yb0g09vhbussin2epjo87o5e97bsv56bukixf00k63rlfj6llxj6h6ag4f1fvemi1xoweborej6l6w',
                detail: 'Quia amet molestiae et. Quaerat voluptates consectetur similique eius eius est. Recusandae ipsam voluptatem itaque quidem est quis repellendus. Modi libero aperiam qui quas. Voluptatem reprehenderit veniam quia facere. Fuga sapiente praesentium et beatae nobis quod ut nobis quae.',
                example: '50jdrawyoupgwtkrtnx6qjwz1wguy50s125sprwn1hff7s98j5dupaf1f16emlsonezgl3nbzsrnmly6p7jmdgkm727fjn25tzj5u7qw1rakkh0uvav3slzrnbpqynlp0cahjjgrcfw4isek5xd4cuuxehw97edn',
                startTimeAt: '2021-05-23 02:18:13',
                direction: 'INBOUND',
                errorCategory: 'rotx76do9f9dbunenu9kl0m3isarozld95iiflt4oq4e3r0gl1r5lgucw2tijuh20guh1qi9c4lfhl7vcpnktfvnno0uy0mwpzwbz06aavzyga42nog8zhddcjejzqzdvqahtbrpbkdr9zzetq38mqq1o6jhvt9i',
                errorCode: 'y5ggucrdn8v4bvojcc478dnjg436hnniy5kbltl52xp0vdyyzv',
                errorLabel: 678628,
                node: 4429185658,
                protocol: 'ihd0f1su10e44rqu2toi',
                qualityOfService: 'dbz0ar0vwv2enadpyhtf',
                receiverParty: 'x8ptet29w05etbtomovshh3yblbu79z46yzohe7u5nliqhwwgue5fz5xsyj6thb3f462xihpnjsfcjvi7t4e1bbdcw4gtnq6iumls8b04ewkpgnawbucd66elxklbnk5fbhuijeid116wb25fsei48t0m7xhj83w',
                receiverComponent: '556oaqs4s4l34ymmsc20j9po4i2euov4xp7xlgfw4qz68j79ckdwiz0wpu1a84vm8id1bm9yviirhqoyl9w7offo9wyusjitiewwbxvzdl36hgi73ckyvrbyn5g31ar6t4os7p6rz26z6qpcuift3ew16zujerlf',
                receiverInterface: 'hr1r1hxlwkfuvj5zk3by0suykxbc0eldfl468e9nlmd3s9wiyie34hyfeqwwpwkw0uds7evgg8so42esjuak3wr693kknwryh1b2earwfpnvymlxyw2cbh8r6h86l2l3qg0xvbtl1b8z644uitmoldos1hssjm30',
                receiverInterfaceNamespace: 'omuncod0zxpyf8kv3db4ptt77yk8dabw8x3stgwlc6tzt9hhbt68d7jjvzqf4ojod7d6hom0woaynnmesz0a914qm9p6kl1kf2mohtu320grgd79ppasncbv4vflnveu56geeiwnwz1wxm5gg3eftieo8ei06ldd',
                retries: 9864364148,
                size: 4053332108,
                timesFailed: 8905567837,
                numberMax: 8736213294,
                numberDays: 7223407862,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd910bdf0-100a-4312-920c-77b7d898419d',
                tenantId: '067ad7a4-b8a4-4956-a402-8788c7c59f9b',
                systemId: '9dc98812-1e59-42c7-a6b9-6749a16419c9',
                systemName: 'd8bay1mlw7vlrtpp537o',
                scenario: 'ydt7nk2mjkpjrtfrcpltg4yqy6fhbftz9ibgox88au6n0pu6o2o0olsu7hhk',
                executionId: '4668e9e7-33dd-4d6e-a034-034993e69a8e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 01:32:00',
                executionMonitoringStartAt: '2021-05-23 18:14:48',
                executionMonitoringEndAt: '2021-05-23 12:21:30',
                flowHash: '1a751t70k264zv4irazsclec96zg2l50ngy9d2nu',
                flowParty: 'neigrgp8xwdm78nffmay6y786oan2jq0ywxn4pu5esa62orno6bz2lwnre8xec9r26lk8a999jrpe3hq506f31xsdfnmlk15rt4q4h3jy0n9n70k2vmd89yz0muvidmkqg3zsdagirvaj6u7m13auv6e17tsfs4m',
                flowReceiverParty: '8h4p0t0e26cv1pxsooyyvcyp8he9pp2577imnyk1sxjq32m42bodrzkuni6y3y4e2waahzbuozymp3wdpuzsi5ugrhog737uh92608ugrxlij9zzhgbtov8wcny5vdexbyar3websx9qfly2ool8n2x38icst7c5',
                flowComponent: '04mcnhp7a4llyda55scu93nqb9ox1qd2vjwx9o6o9lgd922kim271r3z0oebsa7q786ldo72dtupkliwvyz1a68sljmzh71z41pnhh5u3f2kykcm0gpxkeulj6mc2e371lkup6ox135db8e86fwoyov6ogfsksd1',
                flowReceiverComponent: '2wpjnhc2ibls7e4y3tsrwpjyiby5l6ilwd9wu4v6fphq6q9euvyru661xgk7mbks2y0yzgfe57ccewa6rsmoatuj9kuqd8fe07b0tac15q1eqtn7hg7d7h6hsn9y8t78e0xakmll98guw79m8vstw1xg9dajvruv',
                flowInterfaceName: '2sxn9zm8csclslp2dnx8j2rsy1wobvih0dqxrlyu68ygap8n4a9n0igrhuiqk7d08cennftu4skgq2eplmxr1f8rvbjfrc56tatnj6ed1t65i19tukzrj7xrustjutxbsx7bw4z4ccnp4kkh9t644cxoi73n865g',
                flowInterfaceNamespace: 'o1dcm6tcta9k9ikhjawqpi49tb6mipgpvq7ls1xw9yybwwo4ap7296lz790e74xacko8jcoheq8lb5jtmq7pyai8qqck0f1eytlus7jq4swzaxhqiax14kdeosa0w2be7chbwg5bttoh9ed8uv81kf88f2muy595',
                status: 'WAITING',
                refMessageId: 'ojdd3xtgsmff0josj9n8aysgbn413x5x28xnmeljlbza0s6s535hp73dowguc25r4omi3h7u6l58gnkabnud5v09rathdre8f7rgng0y1v4qhym0hkkzs17yujvkbqlyu7h55ca7efjzr7uxw71eiwfi7euwgd5m',
                detail: 'Ipsum ipsam est ad omnis iusto sit. Vel ut vel quo excepturi. Voluptatibus rerum illo error debitis sed aut et.',
                example: 'mwmyq6yzs5e00bvng3yxwjozz55c3mw8biior4yu8h1pn74kttydmjw2i50fk4tfho087v79jwnok9targsbx2k506pal6b5m7xycveb7au4w3tzzlud8rg6ase1ijnjp32gdchjk0np3cg3v6webzppezvugfft',
                startTimeAt: '2021-05-23 05:03:30',
                direction: 'INBOUND',
                errorCategory: 'ixaw6c90sm6zabmd0bmpw2orw7d248wznikhw70hf93pybc01gsvd296kaqgfvmecqb40dylw4vynmqgdbugbzcup54jz7pg5uxh7tb9qimvfuooyns70wn4hb9gwf89fovdff2y8j0b90ssqwm8emc8vjiypp7s',
                errorCode: 'c66i8lymdc7b48r8vszrn3f7mtq8l3mlei55e4f1xpi26eml08',
                errorLabel: 852284,
                node: 1680571620,
                protocol: 'tite56jytvd41el6a5yz',
                qualityOfService: '7aaf3j3mmum03xf86z4s',
                receiverParty: 'ss7y4j9cgrtbbyy4mbpl4a3rpq013mocp939ksxo28nkoty3eaacyt8t7gu5d95ztljtfvt2xqnu10fktk3sxm5tlergsct6ckr9yd1e39p62njrfnv3862qs57lx3glyf6kes4d36apxmc6rv6lmr87d1lazjih',
                receiverComponent: 'mhlun4sb7fx8hds4cj77evq1hjq7fzxdh04vf5fnwa42o2tk0tn4oal1yrl1s24iiihqtjzgvvrjmx8ud9hc4k97b469lvdsuzvemcpkv9wbkhrvfnfr5qzhneggrl92v5vnj1pjgnfcgbxz65yfkqrr0xsq4wo9',
                receiverInterface: 'v0k7p52vs1dk27571cstk8bz9h8mvex4h85myxe2l0bi64sri2cbcu66n4ucqpkxmx0az4jojy9eumi3k08wkebo7xqedr4huq06yzyv4454mxfh1kqzowwv6futpu0glosm17adionbdk7ohunt8mwzmcnktlsb',
                receiverInterfaceNamespace: 'tqzr02n2a5i8omunhw1knqzoacm2qwttrsmc8guc16hw85wcesjjudk9n45b97abvf2029pfcutontj0ie2vcdwu5ykke30qc63ek1tucd3h7s1526kwys5yh5yrua6nltouinxac32ehospizkbd7m25j4uupi3',
                retries: 6957810036,
                size: 5054219851,
                timesFailed: 3538754360,
                numberMax: 3217360753,
                numberDays: 5458901089,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '895c099a-5907-4b4e-93b0-99a5fc53623a',
                tenantId: 'aaf987ba-6bd7-4107-95cc-69509b5a6e7f',
                tenantCode: '6wxryc2jm3gxrz5xly07b5kcvzm2of00brq9qp3jf79x7v0hdl',
                systemName: 'i7u954dq19olbt2vqqsa',
                scenario: '0fno28pl6m0d4dytjmeme0pxbw4sin2onqnucgpwewvh97mm4z4yr1cvhsbz',
                executionId: 'd18bacb8-eb04-41ad-9e77-bcce8f8eeab8',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 14:31:06',
                executionMonitoringStartAt: '2021-05-23 15:26:27',
                executionMonitoringEndAt: '2021-05-23 05:37:30',
                flowHash: 'g8t5o6tmgj71dntisqr28cx50w60upww64fejov0',
                flowParty: 'dls52t2qv44xrkl8ot1eg16s997i9zgkpi05t6dbkf1ea3a7rnfa4zy8qo64ljkmb1wzq5fy5pjhzxgc79u9ptlaw90f5lx7mnro351zby4f0y5i6hccqqz2ousy2y08lyqgesc17lfvuds1r0u8ne7dv4nhp0qg',
                flowReceiverParty: 'l3zcbbrlljtpn4g74b089awl50np157ulm6a1709nzmlxa0m8ctq3zahmoxhzly9gkjtcs9wbx8akt9mmpb0p68e3tkqczdsozkywg9iqhs8jp911jsw9onvc185dt5n8jfamv3nhjb36d82mogsrtsa9sa7mvsm',
                flowComponent: '4uuyivvd8bplxws6ews4rs0rpmvmxuf2qt9u3msdo8yx4ih4mx3266viajaykd2digdp8ov8kb3t1icx5h4ewysoi5lbbilemyyeklogw12t6uofve5q9chrhdena5deymdibcftxohms4z2mdpjiys3bnhg5824',
                flowReceiverComponent: 'fy7n3r83xd38mrfk5ohrlwyy8n5o1x7pb8odj7139zmtju8bo3fndq6d84ka8e8e2r4bcvfxqyjx1rhcmkugijkz8m5a1fbrwm9lyo2csqpip18fhn0cm85b64mdtn7b2m6z1nqql77109p7m6bso770cqlh4qm6',
                flowInterfaceName: 'a8cm1rbkbl2rra130j31lnalz6cl7xh07fttnd3r6s09c24wn3796khldaztlvt9u8qme2o5n4qy9xrt0fdy8rcyt6i2gvymdyaluuo48phlytw3fmwl9sdvaxj0948r0dgzfi7mvmyul3uji3fc3wka3yey1rb6',
                flowInterfaceNamespace: 'lqdquu5ed935nalm3ihxwq99vovi791yr6tttzr0o0xexyc5zal6hkeybnhz6ejo52gtw4c8etfj6h3d149v9ao7xsjc4mlshtbhgt7ks7egc9ygh75zqjkn24qbemmi94zuo0dmu7mjst3gdv5fr5loo20eyt5j',
                status: 'SUCCESS',
                refMessageId: 'aauyajhu5ivhzdlqyfkeot7ok02zax3wux7ge0y5c6tajka4h8rs7c2rlvf0l0he5vramdi2dpjip5og5j1krkrg1pyxtccs6vpy2fjo9whz9mx8dti2aem0a6cehzv89agkbmhvnzht1k7fdjdl83e9pwhsj1i2',
                detail: 'Atque totam debitis consequatur sequi earum ad nulla voluptates ipsam. Nihil ea harum ea. Amet commodi molestias assumenda consectetur aut optio iure. Aut aspernatur consectetur qui autem nihil voluptatem sed consequatur voluptatem.',
                example: 'ewsmfz4u0ut4tqnleq52un5phnvid3heqt25s0o0kt3ws9d43pdg1901x4jp1stu4pgfjs8bil8lqrhyew17qbzc6ezp65l6a1xpi6cqt5qgm2nuduf2ay58s6ms4jddi8q1wb6t49o9qy3bzq48fc4iu58wqb12',
                startTimeAt: '2021-05-23 23:09:43',
                direction: 'OUTBOUND',
                errorCategory: 'xputnb03124257v790g2u5da1wwkzhccj11py28vjjnift4w5d2mh4yz3uzuptuqnoh0mioq2veohtycp5mckjsm7g4zgs83kh53q7lu2k1g2ib3rt9nlc1fpgawrfu6y9x7zdajzrxwu6f7zx0xn30an0fdvf6y',
                errorCode: 'b2nqsvgv8ti50uuof0v5gcfzcu0ob6uyrjfp2k750tb3kkkohb',
                errorLabel: 546416,
                node: 3256934173,
                protocol: 'jqjrjfx1iv99o47967dn',
                qualityOfService: 'u07udt0rr4m317fwvrzc',
                receiverParty: '1jdonn6bb7k4wr87nssidd9h9dgz8ywrprhjp4fzoytrmssv62cs12hxzq4s8d2ax6iiwop5soqsveoeh5rezd3d51xazzn2u16f48elfc1xfnuo8ydf4pgk57df5arl3ctvg41h2m6fajl769mkghc578qok5b6',
                receiverComponent: 'qfacuqmaiy7uaadfndkq5bq5eucazh3qishfefsq6jp6a983d5ijf68jrsjhg3we4lk2l4t4s3egi5kyiupd7sjy67voljl81mz0hgnpttagsk43kma5uzobulr7khcxxrr4j663qlxgpcous4pyascoutgzsamf',
                receiverInterface: 'd7mibequakcy7q0k40v3y4237dqrs4ky0njcvv1r7k40xapjyl8e9n67xi9kjf2qup52nbon9zy0d3okg53n4qzn66xjvne6vjcnlyhyn2mcmofbyupn56og9gu2y83ypkvvjrpvj7bsteyl0a5wx0gbyn2gtpeq',
                receiverInterfaceNamespace: 'whip8sx24lxds1uxlcayt4qurc0w53w14p4nm1u4dllktf3kfsh5j0moyu96k34j22u9bnv19zra15wa9h384jbm7jq0qov7vrxpxzdj1df1tkt1te488cilnijpka0myu6wc22s2totpvd9i2rdhug14y7jekvx',
                retries: 5798681905,
                size: 3020177540,
                timesFailed: 5401753685,
                numberMax: 1509572817,
                numberDays: 4140134153,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '710a2511-7dc5-4bae-b9e3-11ec58375347',
                tenantId: 'df420777-9973-4ed9-ab49-c1b3dc0e4c6e',
                tenantCode: 'a4ppd4feubw4951l48xazip12udwoxr8iu68r0zebpe6apwv5q',
                systemId: '21278a6a-f89f-41c7-81eb-6fd9ee496f45',
                scenario: '8cay1ymln17i8mio25p4avx09urzxj0o5ox33iki0dcp9ugtw487i917ivw0',
                executionId: '98bcf6ce-9029-41b0-934c-1a310464e3e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 17:21:58',
                executionMonitoringStartAt: '2021-05-23 16:45:26',
                executionMonitoringEndAt: '2021-05-23 14:01:03',
                flowHash: '07hi5he0uyfzj9hisj184dxc53zel2c7gxndash7',
                flowParty: 'gqw5nspwii3j9mtu6k6ay6yun5uai8u78sr6r6v4gi62abw67lle8u10fihvp7x7aluqnj7o83wbyc804mwrxj85gaholditkaekwh15oh74jk5b0dqavs4jqjlr4wz6j10svh2c1n1eo7xox7h606aed511dqd8',
                flowReceiverParty: 'p2uq7qw144msouthipiaihjjnvuearea3u4yib103d5ec137oqh1mpmufnr7s3ayt8uebfr9u6j536tzw7dpl7t3wv1j0800yrwtnz04xe8wjsm6vkja8nis1fjp64npwg2pilugp3gto0z2v8d6dn9vx01wp210',
                flowComponent: '73grdzwmv5nnp6949uyjoz5l24b49j76wbiy9h2z4n11bpg0hbsedu17jbpsp9j2d53txxkqsbd9tyy8d8g676rbs7ptwtjvhtt6ez7cvfp2o8hkp53ksr2ymf2xi4u7ocl8e4greepk3e8xijxpjtxku6w9i03l',
                flowReceiverComponent: 'xbpj9mjciwiu59mky1a2evvh5ju4jds9ec4y6tz1g3nf9bswpyhkca70y2jibygpg0m59dl9h7o55kdqyh2piq0u3y4rasjk5c39sr8vylwr2t8ptiohjs1s2u3wzoqgaqtd82qp6j3bglqg0rfks8b54gtfgsk2',
                flowInterfaceName: '3e67u6ekykyboisqtv4rhkgy6l0fciey8wxyallsgjq9fowaclbmdjv4gziewpmd788prxw2bkrh5r9to3fbdzn93f8b5q19tcw4qigsbhllyj8l3ih41jgl00fxhtu9ulah3wzkc48ex8u3ntm9p8c3oxak0n9n',
                flowInterfaceNamespace: 'h5gmzpbeelgs8qf553qx4lln7v8ebh51jiy60nljqktrtnfe9maq6wbfs1spjax0cyvovs2q5cd3esg0iu2hngj7s93e2ecb2odelfyp46b5mqyclg5h3ecty66wok7lqzw09aabmbxc5c9m335wjca3r11ksxln',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'p1n66vm7i2i218v8l3ng5uks62jo3952rjppprpwaedpfsozl40ru5lwj4m583bk3nj2d5slutcgbezbqr6kaug5jwhd7krd3tpc0pwb6kx9pzfnmdaqw2wh19mj8mpoopgqcmh87914iojfv781vebnvd6quumx',
                detail: 'Itaque consequatur rem nulla id inventore repudiandae. Dolor voluptatem aliquam natus. Magni qui consequatur at ipsum eum quia ex repudiandae porro. Omnis illum corporis voluptas omnis quia harum doloribus. Libero aperiam et porro voluptas. Tenetur dolores et earum voluptas.',
                example: 'p3xa09bu8xvl0vtvgx3sc3crr86nlu15ap4asz36prnisn7e1lsanqkx5wubmtw88i4lxp9g1cxeob4qx85lgtbr17nr6inj0v4b3lktaiv5k03wwqdbw8di6kz54vaxjgavqew446746dxjuag3dr8oagkzfl03',
                startTimeAt: '2021-05-23 03:55:52',
                direction: 'INBOUND',
                errorCategory: 'j1mn8lalnqqzy002qtzjs1tfj26n6nlq1nxlah9ek2c38cek8425f316al1kbu7n21bkrdnn1xfj25ppuas432mfzf4o9471xwrbss78rw51kgrup2o0cmqwanwaemdfy0d3gdp3dsdfixxn2zq83gm4yfaxbw1a',
                errorCode: '7v21ta8cwo189yph43emupui5iq8tfdhhrs8iejdvmzxi7l8p6',
                errorLabel: 382454,
                node: 3746499974,
                protocol: 'qdao8ptidaglps8z04jo',
                qualityOfService: 'w3j418m8n75i1ovexanf',
                receiverParty: 'rjwt0v8rf6mfhqrisw4jo9kau6ityf9j5zlz18tous1nav6mry5rtzf73z1wstdaqe8twid1e01gm1ustwkrysiliif9u2ey0ysjw5lzcrhvc6oowuow86mjlrh5czkyy3fjsmydli22rg3qz4uf39ykk2p1d0rh',
                receiverComponent: 'ybx8fe00gm82459oyha6dk8xioyn3qpy2m5j0dvae8g6rg4zwpoyunrmxjb8ihophlwna38qeycgg19psxhwuw7s4nxgdtuhy7fl4gdco3liunxpuewux8u8alj0l85qwtj3td74i580ac3y9zmov2dzq1myzvlz',
                receiverInterface: 'ly889fw55fj4vk0qpgg88on9muo28r7joiheztgusfi704mdi33pfm7cpqbt1a86nrjagm8szltgid0ds8umu362rdpz51snak3kqsxjpszfu4f4d6j6kf5k9wklvnnffj7eyb69hyptv4r9sgbjgg8kv8n3buey',
                receiverInterfaceNamespace: 's4wqpr5lxll7gl2ukdj9px2b3nxecif05a9mcng3tz4etp681uxgvln9xfp4rpqkbs4v840ecz86msbite76ohw03u6mgghc04d2iwpt3japfnk2484jy5zz44ry6t75501e8x54g7x8gyzje2x5f9p9twonq9sk',
                retries: 5496777466,
                size: 9582036490,
                timesFailed: 4928588512,
                numberMax: 2867511289,
                numberDays: 6907845322,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8034799c-8b37-41b8-a4c5-0ab93dd84b02',
                tenantId: 'fbab1a8d-cde4-4b46-958f-13bd466a3978',
                tenantCode: 'ty5w8xrchsv93ziwvz4frwyzewwvot8xrw4du9jko11xhvnxzd',
                systemId: '3a03f90f-95c0-46bc-ae4c-beee00a3b8ef',
                systemName: '9qlpt1vkoywt2x8dig0t',
                scenario: 'kumhr277ino2q9fy4nhqyg4dg6vh1icb4i6jj561arzo18ovg8qlnejiayqx',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 08:13:29',
                executionMonitoringStartAt: '2021-05-23 16:28:55',
                executionMonitoringEndAt: '2021-05-23 15:15:41',
                flowHash: '2era9ayz3hkyo7kqks7a4ndgntlbfvs4r32blzum',
                flowParty: '555z2m8eunolhda3v2wco4a48f2fsid04glu5e753ymhadzxwrfjiw3ar3i9afbi4j1pgjiupeh1i7lhav5k2wnqgc0mvazty1ehdrd3e10lkd8a4b2newi0pbkzypz74lavr9ghg7uifxohk7ffdy3ht5d5wbsr',
                flowReceiverParty: 'u4vmm5yqa2jjvbzpdpjikjix9yl22ebhmihs4cj5e23hqy1mjgnum1h3aftrjhcc855naatx8kclbjel41zxlmw4h7gbwto4u2lhlaeckrziotjzunc4suqrqbjhgv1jk31cnrbtjc6o4m1vgz2z47qhp572sm21',
                flowComponent: 's62y2bptp42u4fmh2kllpurie3csueh7cet43pveh54irimqd8y4qjlaghzw8pm3xbxdkjb41w4jhjng6rdqjr4r5jmdhi0zx6ycr6jr268bju0ijsnvaxi703m3sx2xuvbgnh69cx1co4ut4skpnnd1h64a7sfl',
                flowReceiverComponent: '5ev0zm0n6ylvy7juiami5g68sjjgeu5wtqzflpwsa4qwvbmeng4kemonk2zir2dw4bwtj9ib1sefw64gr3l45v479lcjpbn6hb31ecnjwtet1vvtjyb8mbw8a6vrf15wi63v43po5kl4zjfy5e2nz60a1yg7kzek',
                flowInterfaceName: '2qqug3z8yq7o54ym34jm3g1nv2jy28a7g1mnn9th8jwsdpoeulx62c5b86443dagg747m8a1ln8rrj4ldzi8ydhxgo17snoe36or6mgoe7zf90hc140qce8v135un6e32899sq1j6ihgpqve9te6vzm3el94bmxm',
                flowInterfaceNamespace: 'e9htzcghm2aup20bf148ckwujzm0ii428u1o6mgh5rj8lug6f6fuwsisq99qwiwsb21xjtskimv93j9yn7vg62mf3007qou75jot9yho771lw2r52gf3ydzngf4259k5h8etrfim17hdhzbiygl15wyihgm4rgeq',
                status: 'WAITING',
                refMessageId: 'tck4jylblv2aa8dk6pts90xxtz55dszla2lyob6rq6n4y8fl7e6l7sxjs4evlx29hsnlqw0rk7razqwzaalcnexnemzuagim3r9f2e1jjobwaoxe2tcwmwx41kzbqv77hwfv0drky7skotzw0q8zubswxlk5orpu',
                detail: 'Qui nobis sit eligendi quia error error repudiandae odit incidunt. Quia et inventore ratione incidunt voluptatem. Ullam omnis ut expedita unde ullam. Et aut quia aliquid sequi nam sunt fugit. Et deleniti nihil consequuntur nemo fugit laboriosam et magni.',
                example: 'tbpwifz861etxi374ungsjonbt9thcq7o5s9utxg5auleixlgqs3pyis5wscnq2vhheezvjmbsb9sogndmiq6hgdbajs2s36nwhp84vgcvz3dibhfr1w5mmz73dhqj0dtqk7355eh3us79z4jbq792b4qtbeq4md',
                startTimeAt: '2021-05-23 12:18:55',
                direction: 'INBOUND',
                errorCategory: 'hkow5ans1y1wdag52hklhtptpdlcrr9p5lqbr21dpxnsv8czj9quc8zmrbyknwaz14f7hsy9j6bl1tlhm65gsk5cbf2h9g1gohpmmoal76ha7qxkg7py1a23u1l5f3rwfn0smz8r8hvljkxgw4hhbqqepi7y8p0x',
                errorCode: 'vcglcshzzs6jue0s2d4oz6murwcvzbjl56en5y2gvxcbblnthk',
                errorLabel: 116817,
                node: 6353547669,
                protocol: '7r7rl7xtmufm1mq3u1z6',
                qualityOfService: 'gitw3f5j1u6wgmup1gqm',
                receiverParty: 's5z0jbrtzyfe5vbkxgxcqn4qtz6z34u1ig2q1xvtrpxq2ms6ygvznd8772y4z421bvcmp7dig4jz837mjkxl9alrwxu9q4pwi91aduf34pn20qvpwnba6b5a3mx2hsqpgqrl1ilrtbqmp9hqtr4ne937jvhip5s9',
                receiverComponent: 'rm26d4yu7l6hrcb7maoirtk1njgmsc9tvmg1kvsqcwft7243fib99iuk4ef37yuolp7dkkzgzgppjeejv8pqla6x5rtdpxj7p3mf6wewpjoonvvpxnc4z6bnbo789gmspybhpwxx6gt7ojc0i232tbmwnhk325rn',
                receiverInterface: 'iwbwgggnhk9fvqndlt6xff223oh0rdy67j30vg0egyj8dowa0048qk6sldyed7008r3f9btblhy5ktwbg3v0s3gj55lf5siozkbxlpxmyqvy2lh8q1t6lk51zwoy5mzhlaun7x0cf5lei68dc6xqftek39k0ry8o',
                receiverInterfaceNamespace: 'ptfwho3l981cgprg5o6wg2ndrvhvfl689ez5ukdgtj921hv9lgwaqmjgsc1ap0klza3zphomjc6c624fkhauxlimhkx6j12vr76p4trz2c23bwt1ol1fdrnll63ucn1zkbnsei7m0roy7209ub57czrel5dlwllo',
                retries: 7555149480,
                size: 7239846608,
                timesFailed: 2139212671,
                numberMax: 4085679530,
                numberDays: 3388606052,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3b819157-c9c7-4d78-abe6-417ef9e5045a',
                tenantId: '8d354c89-e988-44b2-ac57-e0bb798c77d5',
                tenantCode: '1ehuio37v3y27yib4j6oc5gdv4q0uwrhasrxy1r75c5afiyoks',
                systemId: '8f5ba233-5354-4316-87e7-637ab113cf81',
                systemName: 'kvtxlyrvp8bqydmmbwvj',
                scenario: 'uo82flyo6n0kvtmyiwyp6sogsqp0e4kjg9or2werk356le7zyi1eigu4tkje',
                executionId: '0d3981a1-ab64-4830-af7c-77e869c383ad',
                executionExecutedAt: '2021-05-23 17:01:57',
                executionMonitoringStartAt: '2021-05-23 01:50:49',
                executionMonitoringEndAt: '2021-05-23 17:13:35',
                flowHash: 't9q96ugk4sd38dbyi6ez07fcxjtbb0k6nve97gfl',
                flowParty: 'eqxp7uxwf7sbdjo68bxu0t7tqkmndnnuof3kkrdk0q0rm5vff3zxh4kghoe133fwfslsszj6dkhpry41qd3iykxa0nb9l90m49xvdfxudobfxg16lu3t1ru6wjiplg02oexwl7ugz2xit1payaa8syabwnu88di3',
                flowReceiverParty: 'cituqne7a7hs7n2omp4ix5ik2y7pemehe0ly6lzwgbq9270p4ityp3hn74s0oouxwfnvqkhgx6torfn8mi2oc6ud9iqycdobqb1j8qi1t9fwr66f35yudcwzusnhm8shc1zvoxll56mchc84xjily1gzmiuralty',
                flowComponent: 's0dlql1uhrvkzsf257c7sgsfw3ylzkrte9itwz9exo5gt020cq7wgxccf2uvz2d28mbkuun4wh4jbya49i8yizrofsfmtf011vgi2ul8dqmudj2ger0d5zc6l7n8lf79gy8izezqxchg9ek48gyvjaj6t0wnsswc',
                flowReceiverComponent: '836ypa2edi2ib9n2b0qy8h4vgn3datu3euhaaenm1jfmgnzuknrdp8ec26oertzykwrwafrckapar9j6wwoo6nn75sdjwp2nuc8d3a1rgxlmly4tt4gvt6m9mc8uvcj30pdqcyx3q4wat6nt1zgg1daiyv44na9z',
                flowInterfaceName: 'oj93r1sacekbnqj8jwcqq5aa5k1me5q6654lo3ho93la1b4584fh66ur62zrsdp7lpbmdlyg5tyly9oh42xb9w5jivwh58yv2rw9gj4z7cokvgvx90pbb8pj98wge6xchaolxzp4lpfphy158zvha2k1kd2bdft7',
                flowInterfaceNamespace: '3v3rur9gc5oazg63zmmxs2brgcsgpfzaxazdkktaywan770azytds8t5g0z823bndzj8loohzo63kfj999edv6nlrmjr9pduiqn048kujif4vya64p80gogs8s8s9oqhl9of2il78zry54nd6pfnrerc385cdc44',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'euqj2pmwni7zbk8cbc5gbibdamfpj54du4old4un4srtds9cpqcjgmwslu8mb2fqlfitdycv9it57ga2kp5x7e88lotp03gnkf0k2v7u9f2nvsp1h7o3uxh9pdp1pwx3p8y73hbn7bchixgxcb82j63dm03mfwm6',
                detail: 'Qui non beatae ipsam in dolores. Minus fugit et tempore qui sed. Eos consequatur voluptas ut sapiente tempore suscipit mollitia non. Et eos fugiat suscipit odio consectetur libero consequatur eum. Impedit ab nesciunt consequuntur non voluptate soluta. Alias recusandae aut tempora.',
                example: '3tjnxur1goys9tltpn112uso6m2euu6yn91nr1qp7clmxc4q76esp0oul9qeos56mlqyg8yq58qywp5a65nu3nahhn4cf7lpfdhvefueck32cxj9dd1er45kdexipb8cn5svw4hnkd9h3uivmsjtjc07f6pfyrih',
                startTimeAt: '2021-05-23 20:14:06',
                direction: 'OUTBOUND',
                errorCategory: 'gmjh590v8l8r7a4jppaff47pj7ey2lwrw6mo40fvccscg37qh0gvq5uj13mq7yxn91j2bwbzqat28y9rbga6tm4rzpnt13m8487fsmn6adbr4v9afc169jbhwbxc0ngaaeykyvtjox6v9nxkmy91ps919qisjkov',
                errorCode: 'lf7dhm1cbmqs6ot91ysaj92r4yqq0xacov2gso29fmqi7553d9',
                errorLabel: 401807,
                node: 5575112138,
                protocol: 'o29l5nmivnj2um3xrxgz',
                qualityOfService: 'mu9ngze343p4hd0dz2rs',
                receiverParty: 'xw0i3o967sz5wmyabuzakm6v3ouuvfxoiqrtk9skwjrswakfb6m0vlt1ewgq5vxpuxkx002d6teh55v0mtc4vqn8ms3rjzdlxtm0lxgzzcrzi5cjhxou9f9jjnm4j2ucpxvn35v2k6dthfs6i4fj5kmfc90f65rn',
                receiverComponent: '5t1k1cflrapzwpjqw1ce2w9qs6xtb3sfagdovhgvc23z448njp6lc4prwlicjplkdlakm7cr3wlj9z11dnom37rugh016xin5s8p6f8gnsllwj1ijbnymt6dfoofix2iseshr5xhy25xyzb4nwyixuv4xoryf45k',
                receiverInterface: 'c6ux4jpdpy1up3uqhmjr7vonfvkyi2r7ixueil0i9xsg281hfywvvs5f4c5hlbpzlh91ggrsh7pk4mtx5frztpqejhch4u638y33mmwob7jnyl10oy21smqgk0jvftokwddzvv0l38sc5e24vdh1e4pj8hjkmyqj',
                receiverInterfaceNamespace: '95u2zosavxje58z4vuj9ns3bp8gokxi6f1ho73pk333gmnn4jcja6qhhuk63o7gvgh1yvl5h13rlpvuj781r2jff8nijzcjq3pu54tjvxu7tu0dw2k5ofm2y5fivm8cdpzhi9mmfviu4vncm0axxeojyni5x7we0',
                retries: 4898567975,
                size: 5567690829,
                timesFailed: 6522039057,
                numberMax: 7937903601,
                numberDays: 4206298723,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'da516005-859f-411f-824c-0acb35e4c6d6',
                tenantId: 'da1a2b0a-fbe4-479f-aee9-ef818b9a947f',
                tenantCode: 'qmrgieadeutz59zbygo6t291nxsgco8vcqzwszjzrkikaitpr0',
                systemId: '76005612-2280-4679-91c2-b6d3a789ebb7',
                systemName: '21eu81o202g42coqnggm',
                scenario: 'udl28c0i69ff72hltslfa9gv6c8106vzj5dblr7lw28c52q46ckqseufgoeh',
                executionId: '90e17a56-78c1-4604-b866-ff79148ee9ad',
                executionType: 'DETAIL',
                executionMonitoringStartAt: '2021-05-23 21:00:06',
                executionMonitoringEndAt: '2021-05-23 15:22:18',
                flowHash: 'el3npxuxfwvzx9jj2908wmhul52hukmuxmdhpnlk',
                flowParty: 'v7ifvyrba9c661e4ow531e440l04n7m40y9jghznajafxjari82rea871zsxpcdx9rlgl4ju3764omo0yhh4ki6nlceah3oujgzw4r20yqiatuq3mswvitj2o34sy1k01tm76dk793km5y0wyurjtecityfofueh',
                flowReceiverParty: 'fsgq5ltu1w8snnhlol6zrm8qktrx29fdobg9t6jp9yhstskiwmkwafz1yfv5kfvio74ctk2ch3uqab7kdru4zojmspt4isxckmpgqw7mtgpx1t1easbqv5jqpe1x6kn2ar08svgsjbfmd285l2uvomgs5mbkjydj',
                flowComponent: '3ioo1f6jvv3r45fl95aisfx6te68vgmdc1cy1433olwoo4tonsndhusch59jpgfet563n5r6k6fcuqyeqcgd1fw4r2kt5f3ld99rw366z6om4jgyezc63j9d2xuq61ap4kc6da6ak8teqzvm3jcto5wipqr8johf',
                flowReceiverComponent: '8gdkmkz9zghiiaxge3yzpgapppjb8fw7tz2xgqggdzsssntv85uvd5h3grszephs12g69e2bkju8b1587rkjqdbpf75n8mxbsmd3g58mhembzqyg0xvflwck7ps7xlb3lyyn46xv4p48d1sfyq7iajhm4b8i17wy',
                flowInterfaceName: '2v8gjnnvbyyb8yuk2g1ypiiyin90oxwsokrj3bst387lvn6ughmmy520y31ew3gxse4dajfyuxi2pg4uejf90x192jglz6ezxxiug425o1mggsdjf2g8pqt03vi4aym7odlxbvqp653lojfvr7gai36o5e3de6fe',
                flowInterfaceNamespace: 'a4fhpghg47rohcq1er6g0c6qpxiyquz93yu6kssbijsyuur4o1cxjji8rh9oqleitdyidch2puj8ql3k9cvdb41rkunoe4iciudde3nrzxah5sqgxd44vd9cm3fxw39tui9qbocr6wsq8rk1787mk4bccxznj94b',
                status: 'ERROR',
                refMessageId: 'f1ospvjjgp5kvbla38thlfzzlmsmsd4gxm8wokyxt8c94nllmnprdaug9450tcjpefle9xui0608apk6sjr3jnngzlz1fkevu3dsmngjlywbd240fwfbluxmeple9zj12hgkozi05tnkteq4towy3atkfiqsel2l',
                detail: 'Ex voluptatem quae id voluptas. Eos quibusdam harum nisi sed voluptas et hic provident fuga. In consequatur dolor vel consectetur fugiat sapiente quidem.',
                example: 'fvvodaxpsygjcn5juzqwko6ncn41eu59bcee62e574siowl7vixvyjqotsadn35bv85z867uy072cgw3v6jkvx2wf7xf89bs3vjuc9m3v8yrm0how5kv44dzw4g7suyxv6h1d6i663oalrw37vz230e3hbbl84d9',
                startTimeAt: '2021-05-23 20:36:31',
                direction: 'OUTBOUND',
                errorCategory: 't8ce94rks5hvrodet40dbtfyvjdkuobsjsya1kp1lio7ti02oro9n21hpwkawx1xyjsp8b4baxatri6hlqcct3mmz6ygkh02tx8nvxwgnxbwklswvsubhqlhsx3s4k00u9vfdvkta7kaqlrlluz1kks4fib5dzj3',
                errorCode: 'sfgz0ywzllorgjpqrzyog35cqlrtp6ksntalwwho47i8d87zpc',
                errorLabel: 464624,
                node: 4032679396,
                protocol: '5jtncykcc4i5wjgehra3',
                qualityOfService: 'h7ntb8h4gryo4u1g6axe',
                receiverParty: 's2a1cwsv5b6xr18mxeniy30udw68g7lwpn1c4d7nyeil4uc1yvghsxfkzwkm3s65z4ely2l2fl4ehk4z3pwycxuv1mwmywntu6mz1k0pxghhuchxazk5axwyp102ip7iksxxssxg55213vb78hrswvsmvubpf1q8',
                receiverComponent: 'se2ovj4zieaw6wkif8zyjxi7zzsx8mz1l9m3g6ju95rrzekhsu3t9yu6wlfixfy925amg2ium3wsmhx0oehq1x3ul3xve0bprhjas0aaimupzvkshvcfgnhtucb2u6azhzi7ykugs5xudq79unhdms4jo1gsdr37',
                receiverInterface: '5lxl3rafryq98fjia6ntm8e7tb2utxepn38a93cjs882u7gcsfyji6djmshmu3iawrns128ljbxe1yamegfkxh9b5sdcy46ez2sr3dwik7gnoutjx37drkvp0s89ud2k3aevigj9qkyd9h0two9flyq8kd2k0g40',
                receiverInterfaceNamespace: 'gukjttlbhml7z79u0qw4kte3cscbm01pixbx5tivxolczbir9r59cp9mp27imrornanc7gbljnl6hpj9bhvkbo1t3jd5xoysq0ikphtg8lbamnpqzf9iy3wqe0ui8s1onvdy50hakeye8tn4dqex4nu94jxtjbqm',
                retries: 2368398763,
                size: 1814838366,
                timesFailed: 6061893545,
                numberMax: 7469687837,
                numberDays: 8145694480,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7b03212b-04c4-4c99-b6f2-4ed9b4252030',
                tenantId: '17bce20b-282d-433d-b631-4495bc4f7fbd',
                tenantCode: 'qrpyz0d21csifw0bq8ac4h9s9gg7mwdci0w5brxskpb9im3hu3',
                systemId: 'd2fddca1-9b1a-4ec8-96c0-6ac39428003f',
                systemName: 'ti76rtww6p10q8xxfofz',
                scenario: 'em12gq908470mnkgpnceakn6itpnu5e1mrtzo5o6ln4ehhsay2gdrco2obh7',
                executionId: '0dfbff23-b63b-449d-bec2-2b9d7ba2d0f5',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 19:51:10',
                executionMonitoringEndAt: '2021-05-23 03:11:34',
                flowHash: '6twg37kj78tne7je7sphnyb9z4nmwruougte0jmn',
                flowParty: 'sc8fwprsuih0415vschbdohch8cdjf4w85a1pq49ruwll6lcxio5mnbq7z6rqyvwzscpk7hx7fpm6at0f3fdamphpc4khkxijpeqdwwe5bgbor4850ghtc1iiaph7fxh68uuawoz0mj35k9rl729aszth2r60z7j',
                flowReceiverParty: 'r087crslo22zr4tov8m8wv48wui12k8chd4q8l01ozd6q9rzcnjqj599z6s0jl8qdbxtatxa3pmnl0blehciwx4y5qiakhl47q6afcbbnfrwpwb3kyiagq2ah5ra1dmcy6m1wq3clfv0cywxrzxyw8t75aytvl69',
                flowComponent: 'rrnyu2tmm4v0wl8e39ai1rk007w9qbiksn4tfta9sarrhwvo9a7wkum881vh0ogqvgtwmw6rjpj5sawcmywahuu7cagq0njmhidykna4crjchqvl6ftll5dk0yuod913kxm7abeeqoylqubuqf1gpq17hrbmrlnz',
                flowReceiverComponent: '01j80ntaa3a87we287145y1owd67pazhdlm2eyp9xikmnag741nmg1bnvcvkm8cvs3yd5rizrtr7umbpbo0ghhymka7a6hc8jykpdqubtkht2vfmnekcd7j2rilcpolm9ekbx0nvkpgkiw7tcc5rzqziv7w3jf5m',
                flowInterfaceName: 'bvs93wfc2q3bif68pdln2rgru3urz68yg78nvx5jn9993q33k9e17bhb2zez3zxovg3ji1wxpruqzbckfvig8brgnowvd5k2uytsj3dz5j14k86bspl1umtb1ltzcp8kae1vlm175r6d8jxpos8q846hkqo8yha7',
                flowInterfaceNamespace: 'lnnelqhfrg8j0274u2m7watfzc305g38zn95n89k3dz61t5lkass5astlig2w1xfof98te91zm4vncvxsg1o4d8ybtai2g9cayn19lcwhugzzs5myl5t25tom7vd78e00vp6k7zfk74px15omf7orc24rz6hcvg7',
                status: 'DELIVERING',
                refMessageId: '6jd2osncw7dqeiyugo0b8ktenv97o300vry3n1f1nyelj1o8y4i6pm7pklkvqbh607bcwx7f4qqugui2yt1r7f967v51ove1r3f972oe90kegxpoqf5p9dnll1p8501qjgtw36yvecjxxr77xck24qqwt1spxvnh',
                detail: 'Excepturi eos nulla necessitatibus. Voluptatem nihil culpa explicabo et reiciendis aspernatur. Odio asperiores esse est fugit modi expedita. Sunt odio error autem aut est. Numquam iusto illo corporis reiciendis voluptatem nisi fugiat. Expedita asperiores corrupti quia itaque voluptas.',
                example: 'ocnudtx1j9xdeuca90x0t93a7fihttujm8u1j7wv6wymctuuakkpf0xv4y0jvddho184k0p9rdmywlmleg5kyoortxq7woxrsw0rwcxu2o5u71ddv5tsbvf2j5kpmgu4ypvo0y2dwo1w88tkw7d6x6pvtzjou3v4',
                startTimeAt: '2021-05-23 03:39:59',
                direction: 'INBOUND',
                errorCategory: 'upbhkeg58a1a5q6lce938prpeyc6wwqz1q7aqzpd6fsrqvyfkx0cwoh0se5y6egec10qwfx6kcpi84nrrbab0fmslyy4nfchzftdz62qeo9o7nnh2g0cng31lfu9ktxqw8yq4l11wxrfs7sphaa5tm7ize07ld7v',
                errorCode: 'csdvfanorwhfys048yvs4hrwxp9js3qg97cjey4revlxspag23',
                errorLabel: 661595,
                node: 7826467642,
                protocol: '5fw8tk148wam570x9wi9',
                qualityOfService: 'uqtr2iememdwegtnbhq4',
                receiverParty: '2bv6cw3brti9x8hmw6palzf2zhugg5wtdfm5wffzkwulsu8e28ym8kw3kikl9368ve02s5zdye9mqd7z4ktk06bvl6922ld17um3bfe607l5og77p3dqsd9qd9btlrenrq5wik6sux6pu9uzsz102u9hxx2vy4cc',
                receiverComponent: 'c18s507pp400aci2b2tuuy7xxxkcsknzmxp9vk8wcqwrlksoyzv4knosrg7vvviw4xac78swxh3pfbivl69h6h8lgt6litehvxjeid7ukwzgvr6e4hk5eustbsb199lv8s5ge2yqu5iuruag9jz8drbwdg91c75a',
                receiverInterface: 'ljbm6g3ggmt17u0k4wvje30dmb8ikl7xm1wh1lpxj8c1bhvs4dodat6nuxvurcewnydddq0lqn5pc2gfifriy1qa4dvcmgaody9t7w2tzift9phcitjrbt21m8tjhq7aodzo1btkywjwllixugr2q570mqd053z2',
                receiverInterfaceNamespace: '5erhke5ysdkqituspmztyftef04nx2lhghv5aovcvtkri8p2jv8p86vrr27qvctbjga7uow2lc395149k8reti65cwmolcdt7oeaqtpwmkfmezionsnowcw0ifjvarmmooswloagcrhtf7oeswuwq08prxudzct6',
                retries: 4397600549,
                size: 7095983095,
                timesFailed: 7503005519,
                numberMax: 1622836845,
                numberDays: 3651534074,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1276ed06-49b8-46fd-9d6f-46ce87a15956',
                tenantId: '559e5fc5-1134-448c-9e2d-063f8f0c832a',
                tenantCode: 'b2ralr4p1seicoa0y0j74k5wmdj4eos0zihoqk5tc8t2m4j93f',
                systemId: '1d00a952-f3e7-4d9c-9f75-5756222c4a26',
                systemName: 'hliy1abjtelhznk33kr4',
                scenario: 'p2zrz0rckregxezuel9p6h07k1rwnnsml4auz9f7stpkxkoqbuzj3hs65jmn',
                executionId: 'cf1b3979-5365-41a7-968d-52cdf9612536',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 06:35:18',
                executionMonitoringStartAt: '2021-05-23 20:37:52',
                flowHash: 'y7j12m9grws3sw4iwyl27uj9e1i9i2aqa3w1tjxs',
                flowParty: '53h6upczew28ku7u8gq5nyp3nxmso9rfy1kkp4ks4zhwrbyln3omyykr53344ez96fect3fo3afhl8sghn29g0ahtfzmh04ixv0b9akfcr1v164ciote1hrf59t3g3sszefdd9bnzljfno562itcyiy0rilvbsxt',
                flowReceiverParty: 'f5qbi2u1259fvtotkq1elq7tb3mz38d8tycufiimhjtw9sbc965e52erdsdajjhlh6z77iuk3pfvbh3o0x5xf5puq201ctwieo5o686cdzzifo3jkb7nb7c60a3aplcuup87clpwq58gvvkqx6k0gxezjle9gc0o',
                flowComponent: 'ac1jvqikig98mchg9v1th02e8y3oddhhvthloy9r1yjonohtgucc3b86jyk9gl45koorry802su77esydwzh1xj8i3ioh1wd5rdv1m77ht8i35oj3utemjh4jrggbhutcw2a1dfjfh1swko7udosi3ew5y2x68qo',
                flowReceiverComponent: '562obimqa65grzusdux85d3gvkd3zuoa6l5vsjv5e4wkmjd79jyyuod65m0zeq1bdskhyrm8jvb2raxaqn3pkqtlgofk41z6o1obceih7094s1mhkc20w3ewbdls49fliro2ljrq3i32qkow335elh14maxiv3wu',
                flowInterfaceName: 'el68l9yle8zz879dp48u42fxqmhjg9qrmjo0ezgoqf6xsq99cmu5yz0gntpvvmyj6xjrg6emy0glylebsz1f7lnyxml0ddz7ggvdvpvhhg1cp9k2m0sseuygpoehzzhbu0h6ikjynilkemb8xb193zcedjgoz5c3',
                flowInterfaceNamespace: '43sf5dly62y5mkd0wtf3krjosxmcxnwl0e7nocls75gi8ltcgql4r41jkctusk2jrhdtuipurfo1lvsyr2rd5bgcpji5xb3tv2tzykgrgt05ns1r1n00jct59xa7r3l7c6vk2oe71gi5vps1vktzizshul4t9erw',
                status: 'TO_BE_DELIVERED',
                refMessageId: 't3haxaontbunrtpkc5eeu9eegc4f784j1tgkftizf5p5q9vex76ki3maz7x3d7b0iirg87yy36nkmxy0zdmlkjcel6q55ovv55qfqjowwsgitozqbzxkr75n40w79ldf372rjuhdihkq9chncqs315g0bjac2ywt',
                detail: 'Deleniti dolorum odio quisquam velit tenetur. Odio sed ut. Id iusto mollitia. Eos rerum perspiciatis nulla hic corporis ea. Blanditiis culpa tempora nemo aspernatur blanditiis.',
                example: 'f0ijpsnal5xkue3x9l1o0j8vto499p9auakqjavzulzcfwyzdldpcimsi11w1i3ovv2bwwrb47s0jjbc3s04h0jyx0dgg560s0scdaucc6rntdfmq9t481iumr3fa2kws7hjr8lyfe7vx4mriysi1a7ya4aaomvt',
                startTimeAt: '2021-05-23 12:38:23',
                direction: 'OUTBOUND',
                errorCategory: '7dauty7kf7srkqibsmakwgerugfc4t4vr6yezgelvs9vy0295ip1q0hiimichbrypba4cnn8d2lmfrsgs97fq1hoor7moopb42b1gr7sg8bq22ze2m9b3nci0l65om2do4lqzn44gg66swp9a2cyfkm73tu6ut4w',
                errorCode: 'dh1zpw4hme6sefigfdh57cb2vyyt3a80bzcqiifci9jsmsk4i5',
                errorLabel: 856810,
                node: 8035525763,
                protocol: 'xpnu5to0i9re5ao503z4',
                qualityOfService: 'sp7bbqyz1lpksin7rbom',
                receiverParty: 'e48y6ymy89wwbfwu38vc2fhnp1udp0w4ff3id7lg4l2h46eit07667eeak58sub9yytpdaizwfw5zk1bfvtks08rv5bnfq0l54z166sfa7jye9cpobcnm3771mkon3rvagnfl4h504vwplgq31r38u16wc6zalyw',
                receiverComponent: 'pfj503q43uenn8dgg78mg1jtaf2c414xpco7nepae8gzc3z9rpjm9pvpgkuwk1r3nsornm6myi6pe0fiu2ed2e21ko0lnmyn74efgyz87bm7v645m7fdkr45v0uly0f5f4yj50f0nik3c3z6g3m5vcz6z4t7dgu0',
                receiverInterface: '86to0o9ykqneqnvo271gxut0ttb768qo7irniebwexgjn5gb94zkyjq02knjvzv1siymmzwz2hw8og15nxr3ghq70vdhch1vjvv8uriwqgotgr5t6j6nhy72vnr6duo18h8zeawf9i43js7akcx3zay6zcp55q1d',
                receiverInterfaceNamespace: 'k9hnnx3aaa1pi1winstarsevznx5glil20oellrhq43tyog9bi8j10n45fxuyraqtod95xb8fewvsvr2ogt1ovpewbqwjqx8o97ffzp8x00drdtm6376rgjp5nxnrgevmmzbv5m4vijummu5xhc4qj1o2xtyxe7l',
                retries: 5154990756,
                size: 8473995626,
                timesFailed: 1628473437,
                numberMax: 5595455828,
                numberDays: 2892240149,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c34c148c-ed21-4383-88ea-1ab88914147a',
                tenantId: '2c5a3a55-f768-4494-a1d6-5541d9f8c23e',
                tenantCode: '5ctbm6g4hb79rqpwxiy97saclm70pjdvly2c35ecmug5datmjw',
                systemId: '73fd1166-d493-4b7e-8b23-0a86ae9c2928',
                systemName: '6mh33lax8jzz5yewx8bb',
                scenario: 'j6sht9wi8v93234zwhcknsitszss6l45vvfhibzryzakoub4zmrn4ddi9xjm',
                executionId: 'b124ef50-e566-4086-a000-8a744b2ed2d2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 11:19:29',
                executionMonitoringStartAt: '2021-05-23 15:39:13',
                executionMonitoringEndAt: '2021-05-23 16:02:54',
                flowParty: 'a1ob1gu7k4zac9mlibs76mod1vrz6loz0hj66rlmrsu5u1guztq4kdedh55use9f9bze108bfq27c584qyc8userv6awgtydlnk1aq92fsvh7dfwreuwr5vuyphy395797t4fjyny9q8plfj9dw6eypcdg833iiw',
                flowReceiverParty: 'qfi7ejdr442671iu6houmehkir83ke4zx40xobaffa3nngaohdbqgkcjehiuwftwoqev6bnrnkwnx5kmvn883gosgd2miiduk0c4i6cip95setebpglp60y5nov6jq96zwjps9yyre6uekj7r453jbcqe3q929sv',
                flowComponent: '0iwqws163957xxvqu1qt21e3spyelrv4mqgdhn91h8li4hs0ttpyvfm0sby5q5gq10xpysdkre9ai33ryfzch1n7eflhsuzh89dt6c5azpg34jrmlofc8srvbxuuv0y7m2eqi67j5bs4mo7b6lldrvve1ofj2nsp',
                flowReceiverComponent: 'ex6edzrq1rvzqnjhuxd1g19h8oi8i4v55ievpf43sqewplawrwtxw7419hkviqtdt8lerqznn7wvdq9id5p2eidue373hrzua9mqzal3ltbhn8aaob6w126ps4qfnmh84zsdwx4rwkbv8n3i42kcwfmsp0rds8ot',
                flowInterfaceName: 'ien7jqulvrvyoims7m4tixuw6aqeiia6m318206l447jelfffij9bsaoweyhaxna8sy2iwl0sn93j8kx8harzyvblys1qwy40gai84s2fyogojqf54dw24gvx30yqtiowkgnhc4t2xr4thqcippgfld4q5w9na79',
                flowInterfaceNamespace: 'clcgc5otk52d0s6osrfeouztnxuxzzawbkbc8zj76e91mr7gfsyoovbhn32oqskjazc75j5p6op714wchoc0zx9vpd1dqicg6jbeyik8odsjprcch3u9lat0vc19ie71jjuvw71l899hlalt6ig4p109fzvdielo',
                status: 'CANCELLED',
                refMessageId: 'qhfikj660q0xqxes8u4sdjlmk5yx8wx4a3al2i1clpldroxwxre7rvpanjky4far1kkxu6ohw790t0q8vb98161su45xpqb354s5q07krpfj8gea7ihp1c7nouhhusmjai3eka5qer3hzq360hs1gxl1d4pwvdee',
                detail: 'Libero enim aut qui ad earum autem. Amet qui distinctio sint ea occaecati quisquam fuga similique voluptatem. Esse expedita fugiat. Dolores illum omnis earum sequi. Sed aliquid illo fugit aut architecto eos.',
                example: 'xkhrog60pk68leldv8mf7u404xkl94h10z8ojbk941igfdv0dvyguejg1pxjml3yrmg2257sw3ydkzkpl08y1wvror4fhpwpx8tnd2ll46o5dsys8xqxii49p3magv5cgvf3zsgilbnxly6pz4ibzc0s30ok3fkk',
                startTimeAt: '2021-05-23 16:50:21',
                direction: 'OUTBOUND',
                errorCategory: 'ghxv33hikg0xf8chko7navafhfj4ne6tw2nars96l1l73qg9vd80vay0x1jdzim263rbjyw5ro9z4g4wny2s6ecjy3rr53172p5uitjpbc041awaghculjzqxhjjv7h1645wt1y5nnfe8tclaq3asus7hmvcy9h3',
                errorCode: '8b2nas7043w90ob7pncm29eyjug20yopi9astk64carqs9s5br',
                errorLabel: 572161,
                node: 7775900390,
                protocol: 'gya8sa3zkjv2izn3s1kz',
                qualityOfService: '0pebzc0ytjqdfs7vspol',
                receiverParty: 'cc6f0ljeybyyo7tct9bs42t4yl29ialr0ownpgmbpasxjirz5p69bdfb9qpyxtw6c9je1jq9hgq8gdd9eybmrgsevcqm107h2e5hxetvyl2d2b09udhlp57jpfqvpcxrceh4rxkj1ehzi53cd4jiof35qcisfaa4',
                receiverComponent: '9jrn56doa1psyqyqz40dm7o3uk1mzenrzonnica1ny09gx65k4xjcyf9iat59lo3tyloesbqh7nnp37ks4a2yz7p89ubjw3zskmlhorlxvszl104q78p8vyj1onu9lnbk5i055sm5s7g16ui5l3kat8zsl7yyyuo',
                receiverInterface: 'vyb32f8vczglmwfq32d2uwha8i42czgbgo11fdv6jaeyxtjgammv76eputa9b3l3o2opfhakng0y5db21hjotp62yebx67alztjxnlc5r38wcm2bmluwyg01clrjvtvkojsdx6bpzpeqidzu8wzlzzojmuf3n77k',
                receiverInterfaceNamespace: '6qw69j7r8gtbr7qwgp50l1362rb5gm38xvt1styvla5kygfwc5fswwamcsl1j1fre2g3550rq7zhh5clqg97vcy87s6ne4fj3lge4hzdqi4kifglp0pbx1jlpotdscjkbxeii49vi4n1kj29ldfg9eaf6zhb21t7',
                retries: 7977867069,
                size: 7289636055,
                timesFailed: 6486582896,
                numberMax: 8041751278,
                numberDays: 8693157555,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '08aac968-5aed-4c89-a569-46f50f35647c',
                tenantId: '046a568b-217d-43b0-88c8-7123e144d07b',
                tenantCode: 'sn9wnx7znq9z41o4cf93gd5xib59d2ofz7ebngfhkbv0t904fy',
                systemId: '4bd01dff-cb6f-4d54-870c-aec91e823c71',
                systemName: 'gb3an8pldewfx4hfdsdo',
                scenario: 'vbplmtckupjfal1aaxuolvu4429emygxfmej0idyka28tn10kb3yxqmx4q8v',
                executionId: '5f22ddac-9732-4376-88fb-d929b9676bd5',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 19:53:00',
                executionMonitoringStartAt: '2021-05-23 18:50:08',
                executionMonitoringEndAt: '2021-05-23 02:49:26',
                flowHash: 'izt6xbvrhnzfvdr7vwua42eurschwga1wevz5eve',
                flowParty: 'tnclm2shscoti1fm1gxkv96mlqx9squoj6fcpqhpjhtrn4h0lfh1exf3kbfqlwke3huso4rzg9jw909jt7spyx71e60t4bnk2ihdnyun2kjo7xasxw26tvy7akz25dyr70st1jjhbhaq4phkjn4ln8kx0gpd4a7c',
                flowReceiverParty: 'v84z3cvzs5w92sy98ptamni0brf7uys1fp5eq2a7qnonxt9v3agj3jnqhmogv4u51jtqt9d7akedim55ef6pydzrnlpwox0wks0o02uab9kq46ux6d5z0xw2pxwnz3qc4ispx4loh4uijf2sx2ynmssepnq3pn2s',
                flowReceiverComponent: 'yvmbtypz2grewvy7y9v1anl156o8urbrb6nkpipzpscwyuyb6t2sa2ebtgomoxvqbdbs4exbrlpnlng0smoa7g2y52xhnj05ynd3cbwiyjmtz9goggbdaywn33quvf5k8wt098wxcmfv71sm43xt4lig22zbrlzc',
                flowInterfaceName: 'o037w53xrr5szs4jcffbyl46ltl345el71nycgb2w74jlpjjj1diy9as1z71217nui0ffvaasl4blakg4g6m4mccj5wrzd7c3s7hi2czus55z1vwndjo7oump79fbg8a7a8w17zn3x9i7dvkieogy6tbfv41kjek',
                flowInterfaceNamespace: 'e4r3qgv7qdq7rg7c5xwpnmi4m1ntyli7v3okhjjk6p1lkv6bokfd9alq52qsmbc4ogetlwj63vvrblps6dh987cswhojv65w20kvssk0vyzmajwmy3fdbhqn8e7mc49146s2z3f95z0kn9rl5b3a6s21panyaot0',
                status: 'CANCELLED',
                refMessageId: '54shcx71if9lqqrzfw8c6aq42e87fvqc5w5lh6k3rrb072rz7ccnohon495mnk3ezcj8qrrxs999bfqdbktkxkg0vmxm6wutha3747tsz8vauubazt26ndwsw6nrqz8t4ojluyhgg52pgwq861o19k8oa0swwisl',
                detail: 'Perferendis ab praesentium deleniti quas ipsum doloremque corporis nihil recusandae. Temporibus reprehenderit aut quia labore quo sint et qui. Vitae sapiente qui rerum accusantium quis aut et nobis. Tenetur repellendus eum quia non voluptatem quis temporibus officia.',
                example: '2lwtwkq5j9xutovl7wkc28kt5i24ag3lsgvb3ewytfxmijn71vikz9tga4u6zmchck8fknhpz87fi7qiuj9slbt5k7zgzejeitlkynaiqglnwfjjvs00zg1jnczksdxtgfqyd1qshubcjayp3skdvgfzvai7e7r4',
                startTimeAt: '2021-05-23 07:25:19',
                direction: 'OUTBOUND',
                errorCategory: 'adfhc8cs9nsc8d0n1iufqhqpyqwebrjl4gmvjrg26nlr2hifdraa2k8uiy3ctw16xbnjmaqzsljpyhmprsg56jspvbbqgqowz8xczdy3p4q9httoylc4o59x9064fyrt8yyz96lek4xox8gk2k6pr0max2f7h1vg',
                errorCode: 'goe1v7h4igsmxfxkgg01kv8km8unycg75q2j2imb9rjeidaz77',
                errorLabel: 883268,
                node: 9564778443,
                protocol: 'i307lap7bjo3ffb6k16o',
                qualityOfService: 'dji81mue2rq3vvt7zzed',
                receiverParty: 'v5fkwb6vxse2uu5j42i30441hf3cqb4u7ea59xew5rebsl03g5mxf1oshvawb4l5xhj9kch0l0zaoioltznszyz1rjdo7b3bniz6qyn1ht9byfadgjy2bkc9smzch47xjangkkl9zny9xq6ddbpk2rh5tm4wuuu6',
                receiverComponent: 'elu3ql2xcxdsic1ptdv7vqgdv7xfi1pj4ztmvx182pi75omxh9paejmskdwc0k7mbkjnk5rhdmahxr3408881e4h3zhsvdtmixc5fd0e9cghng9r043tmq5m1qd3l1xfkbs9gatgffrt8sjme8z3qf2v20cx49cr',
                receiverInterface: 'wv5xhvk73whazz6b78axtfk24utasb7ywu4qtudzaof74al1dgsukwoz2ikx2ksku6qiwox36y45jcqqv8fh7wdxgb643arvm1zgp7lwfe85kfb832pa8fkd3e3x8o4v4f2n3azx71hlzx1gl9u78wkn26naf0rb',
                receiverInterfaceNamespace: 'jnmss9h462vv5nz0wa43n28vd8fxxieqt8kbdx7smmqq2y9pf5br2spq6ujobbxbgucvu6un1p9tmuhm57ddsi69ozk8f411rercw9enak22cwssydchlc8090jas22c5jnjz39p51fp1uaivsxrmi3yidpbo80y',
                retries: 6156938165,
                size: 7959493016,
                timesFailed: 9701963264,
                numberMax: 1951734835,
                numberDays: 5123267222,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3d65fcae-31a4-478c-b123-9379b6f0c9d3',
                tenantId: 'b019f3e5-9b4a-48b3-8ac5-412f2672dd7e',
                tenantCode: 'oko41kqps0k97xudr3rvuezxbslt9pbgskpkz4bjnb7jgbxf0o',
                systemId: '254242e9-01cc-4516-8c5b-3b6f0a0761d0',
                systemName: '2le4feh4j465fjmvbvgy',
                scenario: 'quxm1h9zalpr7ybq60f3mo6cxtkvn6iwzc9svayfl3zxz7831n9zqkoqxsa2',
                executionId: '84afdbfa-08af-4460-a854-33f654f690be',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 08:36:03',
                executionMonitoringStartAt: '2021-05-23 18:01:29',
                executionMonitoringEndAt: '2021-05-23 02:35:31',
                flowHash: 'w9a0dfrcekg4bxiy635lqnoqjzkqryilv6hefbsy',
                flowParty: 'srdt42lmissstn130jiw308q9cdyrawge06cmyukvcm3ik5gltxepylzsi5aol7sdfuy21z35h3j4c4b5m558qrjto2oshejk1m1170fp0ocen5dmf34q0fl1cltuwiqpkal4a5tdmm4ceoim8sqc9bb6jp656ve',
                flowReceiverParty: 'izma1gx2v1uf7qn9lqomnz2vjnmmz1qhsrjlrfhvh1e39qbsv22tz0gszhy7lw4iaunklev029ptzwlmip308vsouueimbh2b3i0e6kva9ri22n78p1mw42anokr1vmhruke407ofb2jnstlh9cgfyevrwaertas',
                flowComponent: 'bov7hdjdvt7m26ifqtbwyu9hbgo1jmcruj3oomp5k1fd5vwvrh3sm879x3frmtwga9hkv2cix7k71ki2zp0gopsi47gpsvpop0zgfomage8b178sp9dibrrk7ovbi62z2yopf26sc6bnwbt7lodm1vwji2zydrvq',
                flowReceiverComponent: 'xk7e6no2mkniv76t7iluecn1t7ce7g6w5qr70gy70mhb8xkw3hwyyiaj35q1sovii0910vaqcvvcrhvhieu2shkwpxioytw4vwxjmawj9fnhoorc1y4z4u5ao2kr25as2nl63hrlc8c5vun5rovaxyd347455st7',
                flowInterfaceNamespace: 'wzvhbywapsw39cld3jn1o2se3o0utx09777fj2z0lpi3jhjwevxjvqw6a5xzhy0wz9dv66u4yl9udn3ek00w51w7tkpyn7k8jpempejarvy3g9ayu4jukf76b3521ozdlvfp1s48kpu51ryje3hcergdqzqlbxoq',
                status: 'TO_BE_DELIVERED',
                refMessageId: '4so1f3tzgjoqkvstnx8c8n2fj1p738gc7ldesqhyeezite28rqhqelg395ztwzhgkoz4wa5x3s9l7x2utv360wb9lgivvsp1uezflhlq77gtoso3gma3a3sr0lsmrtm6ha6hp20sxmjpnnsn0b2x8rgyskklx4to',
                detail: 'Consectetur ut et velit. Vitae placeat quibusdam explicabo magni illo aut exercitationem quod in. Sunt magnam qui blanditiis dolorem pariatur sint consequatur porro. Et ut nobis quibusdam atque qui quia. Voluptas incidunt nemo sunt ipsum harum. Fuga voluptatibus velit ut perspiciatis et deleniti voluptatem.',
                example: 'iy0yndnlmw135cur6gfwjuoyqg39v2ou9smpfkvyge3v81o0isljba24x0ijhwhqnacoyfs2ypqkzlvjvw7tywbwnmfsr0xy8px3zmy64limepgt2hyn4zi89m9v0ac85y1hbspg9fo2jpoqkk80883gx4hnmkd8',
                startTimeAt: '2021-05-23 15:53:27',
                direction: 'INBOUND',
                errorCategory: 'gooizy9o6g85m90zz5hpn2guvmpy9whia90mifo3wsz73ik9sg0y7rbhvzm7eshg66bulnpq4j4kxrsvb8i57ajty7dh8krne9wte4amaocur3tbptpr1leo4xhgejrv3xi7vw3v2ec8e4f4j39auyar3v2bhdub',
                errorCode: 'xfiwm1smdwrhxw8lwxg946kg3d0u63q0hg4c04hle4hqmvev6b',
                errorLabel: 635899,
                node: 5992699972,
                protocol: 'l6om26tecqffqepu6sdh',
                qualityOfService: '84ninlr0zv2pc9q6g040',
                receiverParty: 'rvh10uki3ska6270gi0lax3tuvs6o3r7fwwrpyg6bd43aipdyopk39qhwvnu79b1zi15n4pj8vyzdv6w2b0lpamh0660b3o1aifrgx2np9c8qkxibt75vvqe2ka70n8n66ql1i2pcrw8jywdb56k4ogppym8eb5v',
                receiverComponent: 'ecpla8eino4j6egnqnq6igmibnjxuy5bxpz5xmfe02gyc3fepex01ax9wqnc39k3fs4x8wybrdm6tos584b27ofvk9495blpf9tepaqo6y7ld0jiu4ub2hu1gmywgsdl9git2yfpbowrmwc8n093ou9upcjjplcp',
                receiverInterface: 'jfzp16ldct5q7rlfawk8vplishs1g48pmowfwlchgcje8e7nnj984w4wrtaa71r3yu5r8mr2mfujqs79eesudwdss6oz4hj8ml0af0k8132zsr6ngtq9tidwk7lry1xij03vnozwcbctwpb5pvaoc2u9sa9lm5en',
                receiverInterfaceNamespace: 'xzgopw878i1pefcykya3eo8wqurfi69nmg1p91djltzboaxob5b9cy2zy3jtj2oflfc31oxymiknaadlbfxkyb1432i3tzt1tb0sgayysiazfd3lj1yj197nv8uaawp1rrvxioev8qmx6ln42lc8yf26zdmcdbmd',
                retries: 7685005416,
                size: 9858868380,
                timesFailed: 4531213067,
                numberMax: 2379910409,
                numberDays: 8095396147,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b3b4271e-0a6a-420a-89bd-520a8a9e14ce',
                tenantId: '8359f53d-4888-44f0-aacc-eebfa3dca0a5',
                tenantCode: '6cp434woq22uwaw0gf87glklymnysh265cfcr1l7x5dhdke1b3',
                systemId: '532758f2-f541-45ed-a29d-86e04c8322d6',
                systemName: 'sk9o3wiini94edsoy3ru',
                scenario: 'stei5euzjct52sz5ainro6bbbj5rhmfl8b7zi7w7ahg5ws4oz43q9tj61tua',
                executionId: 'ae2d2096-1fe3-484b-b299-03bb1f2fedcd',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 05:13:58',
                executionMonitoringStartAt: '2021-05-23 03:25:51',
                executionMonitoringEndAt: '2021-05-23 02:35:13',
                flowHash: 'z98vp80gm8rj93d8qz2mlvklhfxkwrpirqfmmiyt',
                flowParty: 'zcvf5hy3z6u2z44cjsktzizt4nu9tnhf9pbj9rf7uxznwcgwyvzpmq65geiyonhkhqjy3r837lu4z31j9tygn79ipfnp01eqb97sna9kbrybqmj24rxpphi4az95rq9kw5y9w98bcoc7wgk7ksggv37tonx5cg7h',
                flowReceiverParty: 'nbuafttop29e1f3k145df9ewy9r6fqau538od5nx6inms1duc3m2z2g0nr40krunzdp65wjreonbse899p4v68dzv3ogeyexl0qj9yyazogqadhggv3po3db2zthzqyw1i71bqse44bncdz4i95o11azylkf2o7a',
                flowComponent: 'lm88gzbviyt3b6oq7uk5zoj8xm67xhevhi7ra9ejef5i2iscycy3mob3zkeyu74hppdyieshniep1lhvr6ei4zrp1zx5ycbzszfeou0sf5k6wy4s35t8yt9q101dibyh9yt4tngn3e8wdgty7565nssigvjt41qe',
                flowReceiverComponent: 'j1b3ic9g6hajtpjptxy0wat15l717yq50fkomxsno2ydslil33xmz3gzaspn9n0yt8lju6leni36m1zar36vzn8xp48qedole2ebarqwm62a96lz3n1486mmmp32oeuh11ndb1lhlcpi7phuaz3luutvjraxbizo',
                flowInterfaceName: 'asac5ypg41kxnnbrqrh7lznjzdkszkx8xce4yot1zn5vfw94ovn9h3yhz68wumfr6su1kkdl2xxgtv48ub625wbk5darelecpq7ccf787gxkdwxmlmd3wl3jnzupy07ev2o8uncir9lks70zlmkkyvxqtf4y6mjr',
                status: 'ERROR',
                refMessageId: '9e8hcv51xxphhh7ujbwqgwny4yne976kbeq6eailgbtg98spdarzpm64mtee93nz4hhbqhile6u7k5phlryj1x710l7zew5c5yexs5ywhw7qeg3fzhjp3ivi4s0hxh7i0qpul5q5wtfo51esa76am2u0ah7ahi3u',
                detail: 'Repellat sed corrupti voluptate qui ut consequuntur corporis in numquam. Praesentium et quo. Sint in perspiciatis sit rerum temporibus illum vitae nobis et. Culpa molestias sint quidem accusamus nesciunt. Eligendi ducimus est rerum.',
                example: 'fns8x9mh7wdmgnfm5rcfl0ms4w2r3mr3u5f1ogf9qlgj97wa4qctmcbrs621j9giareqxq5lp04bz1hqetn81cqfi6nbvcxxrvuszkxop6qj965m99sc47hz31ehklffjgfatg4oa6yo7ddlbe0924lml4nxjk97',
                startTimeAt: '2021-05-23 13:14:15',
                direction: 'OUTBOUND',
                errorCategory: '2tlm1lnhm9sv371z39cwf6x7nr4s5dgrvtn8wlnqqz5l84ibxrbxwvrr8o8xd5e2i0zu74soia795og003xe194dskc43yi17hihqqd4k60fwjkn6dcptpu3tw4h05n8nykwy63eck0jrcl521c5q0vloth548ob',
                errorCode: 'prghxrnn25ve67hxxu0ec64a2nwda7syynuq5sne60n5u79oyo',
                errorLabel: 330384,
                node: 5030041825,
                protocol: 'ubjbx54ykrf90hfqxws4',
                qualityOfService: '7mxy1t1xmws6k9l9t8yo',
                receiverParty: 'k8m9bwbaae1kqw6ck6zi4aszsu041lrq569l6x5aq9nwf7o4vi65hoynh4va6jhmw3gbxvv3eyt0sbb7wyqw71807r15559yozq2w6d3nei1jrv4ls7yb0hamw7jjcc2v9bccwni1om760opztoqvgm11qyfbku1',
                receiverComponent: '0hzjap5vy2aihf5lmcuuc2ckvr36cac9j5an9lafv5syap7j0kiddf8wkm0rierkolnbpf9w7syqr2earst7yz202hgxzaollzjvl6b5hqfrwv13q4l1i2lpb1iv67b70ailbyxfcbeacxf8dvz5kg3ihyhv6gqm',
                receiverInterface: '71tm5j9s2e5w0elnjbj0scv7j887ifhr94jcvaucvuyp9vu8av96zi3yb355gp60ieufpmg4edx1i5cekbxg0l35ybbzw870sgw12yo7aqfqtljnjf4m2zmbi8pn60yum1k58rwuoo8eioaprwkcvbnydmqi4svi',
                receiverInterfaceNamespace: 'gqnzl0k74m01u09xhm2yykn53iuevm7bryhb1emmwxxuhi9e0yfren3evqlsosi8u3tqumsrmn4eouwfano6y6cxfs210nuw6x8gxwd6wpye75o2m1i4v8oi6vm9lc0tbv5kythwesjz02db7oper307dvfrumq8',
                retries: 9598296048,
                size: 7280017119,
                timesFailed: 9516911309,
                numberMax: 8901018099,
                numberDays: 8559983963,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f0f4f814-cdef-466e-afbc-ddb99ee5d144',
                tenantId: 'd010aa81-e5dc-4346-bdac-478d67c42bec',
                tenantCode: 'ph86yerqrzhjf0qbfktupchylvda1cc2eo6kh7jtc278yvkax0',
                systemId: '9e7ce69c-301a-46f1-9d8f-c04add58aa05',
                systemName: 'h3xznyyf2k0hik4cfmum',
                scenario: 'xxj50a1udjbik2z6sdzlmnzd1oroea9uz68wuredy46w5qeg2sxs79umt43o',
                executionId: '20a80009-24bb-4442-9975-06eac770a1f2',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 07:03:15',
                executionMonitoringStartAt: '2021-05-23 02:34:50',
                executionMonitoringEndAt: '2021-05-23 02:46:35',
                flowHash: 'go7e1vsbpgstbefuabfhg7qa8us3w9pywz2558es',
                flowParty: '8u9xc4eo6n39n8s1pua1q44yryw9sefkk9u5lrnlgo6itmsl8ov2x2oo6xyo2j3kucs2jhyfi9eio6k5hb89c5pgosepn4y50erylwguqp9nacxzraqz2rur8x9uzpq6lpkjwhr7pso0c7w76p52plrmtdryus88',
                flowReceiverParty: '5pq00o6pg3fynrfzqfx3jisnmgztcj72kbtftdkvvv85wmgcp5mytlq7r7jtzfzqlcd7ak2scvbvbk06bp8wzhjadjamigo4l1jxc5fm688mhr0dnsla8vlirqcco0gijuybnv99kofxwkhk9z5evkcamv4il5yi',
                flowComponent: 't3rzhwec6gdysol2pd4m2ikshkf5htcr3b35xgnxwv23e5qimv919nog48yxj9o4uyah4mi7n9ia6d2l5mfst5o5101scxgfdbr9vd3y9q2vhnejoy8nkhzs5l6lb3fzpvfzl6ogungseg090bmhsg85q91d296a',
                flowReceiverComponent: 'xetnmu4g6jfzcid0ko58hcm2s14g6bkcq0eeoueumkb7tmes9eahja87brijteuo7un3lgs5k5awc50ln9lpojw5web5hyr6ylqwaguiox9ov7mff0m6dr06v1z3h7y9t1pk358j1ddyochy96sotbrvrmshwt5x',
                flowInterfaceName: 'mcyv7zeb0wefz2v4yd3cvwahtvwzl942x7vix4lhf7tkcevr8kzvivzeiulpwcsnlxochlr2q7zdv0gljlb9om0361m62s9rvmszozspoupc067yyhgq41ts7r8yb7nsslmm2vfgzxl9mb2rq3qb3m8wrkm07302',
                flowInterfaceNamespace: 'bjq32f5q7savux23i18rykuau9ssbf39xzievnmainumugp3ebamnm28bcyykwx13bfmu5bh31ufnzyksxsuaufmfav2j78528hxcbaxb92ynon6s5bhvischlewy0lpxdfdnnym43ae8n914b5s8h0xsgrcr94m',
                refMessageId: '32azkx3qngesn3zxuq3yda9q5f9nyfgmqfpanqlvt1w1qsmbmjsgnltu8x9nq225zuxezlz43iqsnh6q6532uvqry8hv1y2kkn0o612hm1wsrg5to9ihohkoj3iu8cxto76h68imhq0c7km3g0s7u5rj7bqy6l1n',
                detail: 'Nostrum autem neque nam quidem. Id omnis voluptas eaque est necessitatibus laborum sequi. Velit aut molestiae soluta iure amet quae.',
                example: 'x33htdqevylkde1qxh1w6aj7mqinib4pthnsmzbwcb6srlct81u8lyyo1c7cmwa8k1cfdezod342zelvx9u3x7tou6woepm94uf1smhb86v6teqpkjfrnvpy7l3j0e4u757arjkczum16kit3n0jn5texft1f3mb',
                startTimeAt: '2021-05-23 14:30:44',
                direction: 'OUTBOUND',
                errorCategory: 'bm2virbd9a7rzydkcvo0qmw3m1ewkyps8pgnl4101g8472mq4twnwsr8ynbosisereo07xs4t3fzqz1xiei1kx801ceza0vyh9ngt8j63t2yy2kpr8vbpinbq8htqrsnu7vt78vxussy3296bwivhp8ds6dx1d23',
                errorCode: 'l49d6gcarhbacf43f7nkmvarqbw8bx6av5ae1zkewdevvt15gz',
                errorLabel: 687358,
                node: 5976223661,
                protocol: '588yfyzn44svkb3cilrx',
                qualityOfService: 'ykjiw6845s8uwkbfwpwj',
                receiverParty: 'w0lwwng16q2mgioxuwjt68tfm9h66d6o6xk5d1xp4bm76byhc57d5sfm4od0739nx7r0zutrqmuo0d8ld14vgukm9oj2xshwo8gde4fn9oew43fo4gqz314e30qiuhoi8hhck6b2fomczzwj3fxtskklamirf197',
                receiverComponent: '2akl10w1sxsoz6nb2g2zhxsufhlk6kmp8tz8awmo8577zts0f4hzmkum2wzf4d62l5rcdnhg3a1klpc7tdr80wd69khxatnbxbwttbft0xjmtwv16ve3vxp9dy3euhekzxkpexeqd8bws07nyxde7cbwqmx2mf11',
                receiverInterface: '4athm853ma1m7lvwvq25oye8ix73v1at6z2b4ndhwsuz5yjd39sb3fehd197pq60vuxq93bruod5263q8ebr6ca1n6v2typuy4ijw79tazphlxxk4b6ub9qn2mcvnweym9kacqnwsvlz6pay441yhn4463xk5iko',
                receiverInterfaceNamespace: 'xqzmfl90tt3502oo881teic4lqu19emjqmt4a5n0o98tq1t2j7e6exhv053nkkrgr39lozx141q0k3rdosyy0s945ecrl2nfjj84g7g9j6bzxl8tr3tmoi7hpjcujwiw7yfb2kfgots2vf2ddiz1scgg8npuok0g',
                retries: 6476304439,
                size: 5890902582,
                timesFailed: 7969791834,
                numberMax: 2097893941,
                numberDays: 1555049723,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'de88146d-4660-4b6f-aae1-a4fcd7011b69',
                tenantId: '810fa572-3488-4a5c-8796-9ba21ead963c',
                tenantCode: '6sglxpodxgqqs0n3ke5y06zxfj2xw64633jg86cfo9b49lehq5',
                systemId: 'e1384eae-3c42-4d35-a29d-dc8f2ac37d5a',
                systemName: 'imc6z292589dz7via9c3',
                scenario: 'do6j4r41qc3isvmnv6c2w2reb87avmjec542sbfqv38apgor05fo1vuhfkf2',
                executionId: 'f42bcb54-a22f-4ab6-898b-052bd8d25ab4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 07:24:53',
                executionMonitoringStartAt: '2021-05-23 21:20:16',
                executionMonitoringEndAt: '2021-05-23 04:44:36',
                flowHash: '3oazl9m9503s1e8f6751x5662jbq0w4wsdkaonsm',
                flowParty: '2lm6fi8ce011koprmpd02hn6p4e3n3vz9qrymb3s8frvdusr7u8thbcq01uodty7x2lnehzlismb3vwoh4ff9872elridmlorjod2h51rhuroglz5nhx24341mn4txc4mx0jwn0u3g10z8oc7dxwc9zl19z3w2r3',
                flowReceiverParty: 'pxsuoeooik2s1pb5gxesc3xxtnyiht065vdgcgn5mt02mirpk4jydtasx4s0y1ifi3qz4brawt9tncvstt4pc88db0bwjwposhll3v2lmvpb5xh8klki6jr2fbzubsklkh4bdzr5ouuimedz7gphbkm6lkydezku',
                flowComponent: 'd4hpjut3dw1ly0od6ti7t927ehyr5nrnnvmgwopek1fki86j4baxsjqee9joiet0z1j4z3624r2n4gii6ygd6o7vpv9uoujuyf04syf3nusprcmpand4kqj6gxdllf81ryhxddjrxr1hnx5shwxd3ucg7icaft2e',
                flowReceiverComponent: 'wn4a122ccalmwbxjqj9vj6tlwzmx6jtl639ma58en7oph0tkx3gdkayo7fiho2k2df36ut7lpkahq2ok4ps7k3ha8sslwsmbal6q5xqk6l0bjuyfvoxnneify8f0ut2ov6zmwc4uzyvs1pq1ei7if0wm6i4wg34j',
                flowInterfaceName: 'zuwzmzd8hse4f8j8iqvzse3re5fyyawvo9et3nn6knnzuwd2uy0kl6o1n0x4crckfg32zdotm0d5amy1n2i4ke1axdr042be6x5mudg3fzuvk9mp7cfgdz3f719o76jyppqsrp1qjxu27sehvxdcxmieqmb82yid',
                flowInterfaceNamespace: 'ruvry3wfd1g52qbu8r5ztfh42dbdktq47o59x2t6why9b007smnn9ytv2la0yt56bx9sdauiagcxszvezg44jgdi0wm4gnzus5p6ida1sxhpxxpf0k8qjzynpdcee93rodebhvsyi0acqx5w9z9bqbmzwkjwbnkg',
                status: 'WAITING',
                refMessageId: 'qg9fakq6tx8816c54zg0taqhmofsjns4opswpb5ogpk9yzelgn4jwgzunvmufadmpm3090xsjqfipger0jdostmu9udy75x062exkx6le376leagenmqgzzl6xaqv5rrz3t7m6ngzf71uoldc7o6z2gj9vdzhwr9',
                detail: 'Facere itaque consectetur architecto veniam quas explicabo magni dignissimos. Asperiores et dolor ut id deleniti voluptatem et sit quidem. Occaecati error nihil sunt est et omnis voluptatem et modi. Rerum beatae officiis. Cumque nemo ea quia qui veritatis autem.',
                example: 'yl00oeafga7pqby7r9oar91ibifoxoo806728uougnwkw9jvpnx1g7qe9qu1j0ixqpewn3wqg0dw4lfa8oernao71qa99gwh3sravantauu4mac812wp59j1h2iu8wzb1sz5cbfw1into2cmx7fk7i3rfrk3swwk',
                startTimeAt: '2021-05-23 08:47:38',
                errorCategory: '1qpflhaz2ipwwat3gvbhxkrikvbfxbh53kqjo2188onoee3cpw5bmuvg149i6hrk7r7zx1licp3l91gmcxe03fmuoga7ymqb07sqx4wu22lw8zz1v6t5g3sme09o5e26rsxsco5vtcpy0uuzxsd373rfwe0oaslc',
                errorCode: '7pkyzzo0g1xksk3bo7hfo49eth0acm0vg95mlyn5pgj1rmk0bu',
                errorLabel: 624900,
                node: 1655427053,
                protocol: 'okpr24swtmsm4r5hjzc6',
                qualityOfService: 'jk1xxsl5qoykuclbe7wx',
                receiverParty: 'qa0cwv5qt8s08m3ve0azjo5kjyauanbharmyiqlnhtlz0w14pb5m1tnr4gzch96lpcnvgsrky1bd3hpmds3aezi3o1pqtwml4z5zyafmqqlsaj2ex8d2ubajnwftchzmtl9la568qy7zn3afhdwb9jzew5su1nhf',
                receiverComponent: '0iqzkugf8wtuyd04tda1e4hr54h2wcg31826snzq8aj0csrurgziopk66vxywnuvh4hx0zj2wgbd6s9xpi88cx8ab8t6amj0ub7veby4o7sc59jwxkr8igbcq2e0fc405xwff3e6gexxkzhlzkq3cdl0jcamgtcg',
                receiverInterface: 'xly8z3sfouxer1hsgdcyjfxma64gtclx21skwz5udtyz458mqtn8qr31erk586gq0anoutk429xafwqfv5lu59sxj13p2gj4shcy43ur3l4j2rd3eivmgkfsfkjgzrblr8q1yqrjs3cro1j5jp1a5dse9l4nj8e6',
                receiverInterfaceNamespace: 'g30slf11ypsjr6nah1c83izujjj3eme8iqge7lpbt61tegsvurakifn1eykv0n8jnqpgexjwyoxq88s8p58r3a2y5pxb2g5sntin14szqk1o9e04jfc7zt37tk1928ywpphaxbqpf4709b1ca9z339ood90z8ohk',
                retries: 9210688576,
                size: 3720287490,
                timesFailed: 8078765256,
                numberMax: 3304708236,
                numberDays: 1886220708,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'obeodrebvmq88jwoviuno8jgate6yqanypwh4',
                tenantId: '19bd20d5-a609-4a2d-82c3-8a38e9eaf8b4',
                tenantCode: 'ezjazjy7vje78dx1zwjbia5cyj6jztu7uyyxkgruymcak5ajbc',
                systemId: '00a0f3b2-6317-4417-b149-6a4636157641',
                systemName: 'tofi50dqmg9g8i0apnz2',
                scenario: 'opk6qvxjvnmquxvqwhrw3cie297ua8da4ik8z15m2afk8xe0tz25k0fe44mw',
                executionId: '21e7a84a-0e0f-44ff-8124-e7cd9db52fa8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 09:36:33',
                executionMonitoringStartAt: '2021-05-23 14:31:28',
                executionMonitoringEndAt: '2021-05-23 06:47:54',
                flowHash: '0m4446f765z3amnwau9vr66itikkieil7kp5t6x2',
                flowParty: 'lhadpstgai65oxim3d8h7x0dfrx2tsw6rt5kzuk2dquxsslyd774ptmxvpv1oy1m00jc1adissuxfwr0v8ttclfhwlntfoc8lfwt9b28mon9utqr1zdjmfkopv1rl8dbippshq5cud49yha0uk8uuus9xg8dwpfy',
                flowReceiverParty: 'l464prv95bu4i8wf3pih59laz639d17ndwftvjitd8a3f7a5fz7jotfszxzrmfxm93km1f9tlcuyefg3wd4w6sbz0u36gaots356jly7rmqyzxiuas0ysoi1fsxifzpu1fn8p71sgypmpt39yfyk0hlx6l0ez2my',
                flowComponent: '4sorxt41gy45je0q5k7wt7w6xj2u6i2oovegiqbt6cipo35fba5n93wi96xt7ykygurf4rn2bvbufz5s1katp8gz371e13tqf2so3jddt85lkvxsn5milq8wsfozhy7z86qzy54m4b4vejnd8cpb50quhvxmyryy',
                flowReceiverComponent: 'z9d9dolmnyv7e4r0m1xw7lw3g5ydx6ojwoq59p1cn249f6a42qi1h502bqblblcqumf0g6akvgzobcaerf9iha5v29i31ra8xzlob6tfibgatyoledrymfniepm2v76jhq6fqxyr135e41egeh5v0z3qzq9ztbcn',
                flowInterfaceName: 'ow7m679gd2j5f3t22zst4qlnyzjbn8hkptheqkuyiipybmftcrfy2kjz5oprf94ujmz51oapuws2dyk5q2yfiadnkttr1ylaxiucvjmwbvj1jmac80zpbon6rvoumharm45xtp5elc7u33b94l24vvr6uomi8n1q',
                flowInterfaceNamespace: 'aoj9bwhtxvywcc1aflly34eb3cykgvx4xx78pnmor673vznk62l0t6ypslzuk3pbtrqt7sjx46d72py558zlecvrtrxecxaa05uk819wr1zuq4tp9ks50ywgq5be44tjf0gs99d90krt8b7j8gvbruxljncjolr0',
                status: 'DELIVERING',
                refMessageId: '8f6ha2b64t5yoa4ga3345keiky2d0ib2y6u6phhprus09x3vxe4hifdesezimnjicamw9j5x5r1ckg9di54c89nldh0xadv3awy47zjlckp3xynvg2k7jxlkr8dvcuqv6t1uooyhezuprgszhxy9jaqaszrwzzvm',
                detail: 'Ipsa nesciunt voluptate et fuga in in ut nobis esse. Similique officia non nobis aut quia. Velit quo et nemo est alias et.',
                example: 'r926qqj6qttso8hfftyon95s53tjlistmgp4n4kf9p1xblmuh3ezhko9tahtw7mi7ucu327dn13sydjfjpafwsyh13xydj9tuh7bgm65woc59vlwtgez94t0n2qq4vkjhude58lvkew4s5yymur6g5mezc3slx4x',
                startTimeAt: '2021-05-23 23:45:57',
                direction: 'OUTBOUND',
                errorCategory: 'qbkjlcw2892hyniop35f87obfdtk3n1mebeodsaymw1ogkxfbvnqhkorlgocz61qt2h224k77dd0jveq3khh46rvvt3e1pywgc8n8xxut448f19d8k31nub9udjni4rsastjrs0i0rvkt2hlakrbzn8el41omhau',
                errorCode: 'yjreh0xvbvegm5fsoopjpurlurk04tfii1v9dpuhn9nnwnrsiy',
                errorLabel: 339629,
                node: 8229182498,
                protocol: 'a1aysbg8t8dqxew2r7bj',
                qualityOfService: '5c7o9jomuhzzcxnwzuc1',
                receiverParty: '5mscmhw4q8vfuo0ax6b6j13qejxzuimmmi73h3lavbpqluxm9omfwj2arwpstvyflk1wdmb490u6czbjnnrfudfjgj4cdztdto1y4oodjid1v4k019kicuda64fe05w0u2fxbybhfrhk2odg32tumdbdogyjgqbw',
                receiverComponent: 'wfpndrlygmcnut124t415tew37g3fw8d5dna67bz7ob32zmh9hqajcgv9604jtg07shzutrnlz49w8z62godhvjabu0ldxoqcze52hdm9hkdezgect4k7hnznt2v31byhbyzscex7ghntiwwyrb90ue2orhl66nn',
                receiverInterface: '92u6h3bes09o6iyblp4ljujkotr1yr9jsnmxcm9e8j1bcnz8nmj8wiycprl0ar4zauy5y3mxhuao2mojzgq5e4j9aqvkomue16mb0szmel8e5o93nxke4iw29bs81sd5poffzagvrutgbhtu0m5soc6rb0rt3m0e',
                receiverInterfaceNamespace: 'yn9ruyqvvsp5bs38bbaqtcjzqf8o8o5rofran5f8ui95vmh1u1syzgoqwq9zgregg7mfcvo9qccw887ciekqnuynxj4mechuaeq6un8yuoweopevrmbqd7t9qve402ufqqucg4z7v5js9pa8yd3ndgafdlqzcbdg',
                retries: 3077090535,
                size: 5467185358,
                timesFailed: 5968261966,
                numberMax: 1560780157,
                numberDays: 2443923954,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '04a6a3c9-b790-44b5-8e46-0d47f20cdc33',
                tenantId: 'n2u3xes9lwrmr8j45tdmc1pu11c62zzt99zzl',
                tenantCode: 'vopmo7ddcqz6sndljdpkg5p5ksr8b678lxtmot4wnbnt7eugf2',
                systemId: 'bdd6131f-4c06-4771-ad2f-ca47109598b7',
                systemName: 'ijhgmibe7xr6yc0lejjj',
                scenario: '8cfmqigt5iqp8vw8hh813tzyrfv3wxuh273m5gujoytoh0zt6hdsxrd6tvb7',
                executionId: '41e0aaa5-5831-4313-942a-4c627c6e0f2a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 12:30:42',
                executionMonitoringStartAt: '2021-05-23 17:38:58',
                executionMonitoringEndAt: '2021-05-23 04:21:35',
                flowHash: '3k2129sz2va6nmso7ev7a1xkagnp3yorezqof19v',
                flowParty: 'c2fppkxsnvl0tdalx9l33y7w4ngvxxf1vhj8snqg80lz2x5j7q7sjh52tntpcs0654r4a1ztmiq6015ovuuy3s259xu9hx4luqmhl1r8j1g4cbujex2owjgbkm8sholdjd2ql6y0gw9xvurn7wuyx70378e62n95',
                flowReceiverParty: 'uwpzkb11ls7sq29prjf1sbqd743dpfec5rfvvw255f74edoz894ugi9dkabbgrs9mogvoc3f71ljh0wfg72hde5w9vrsadq7k6im3twl5ryqwvaer24ncujq5bgdj6gqnjtmygdue2mzq699odq5x3zocz59szw8',
                flowComponent: 'qt923rmij399k7owm2zylu89ra0ekw6n5qiph3622rmtuze3bks5jwzm3avku9g9exslar07o8mhfgjkus3c71yn3o2nzgo4pmk5vevjfb0tjt6m3yk8r3f7prhbtnhwmv7c1rwd673tzby69fy3pncg5v7uraib',
                flowReceiverComponent: 'l6libfikm0imyyeqvckpum6up3arc8m2e9z372x6le28c02wv3zlwmnop4qzn4c8lrwrg6f7x8pzyw4kemaqqagxicqudmc53holxtanir17lw2vz49p1s0va01zgshpydrmnhrf6ok9y51h31tvcjc7bzob2l4b',
                flowInterfaceName: '3y3g3uzif6el4l0vbm4omjuirxgykqbg022rhg4bx8erpfxsif3imuqd3pjazjvsbo5uzihabr91qeanm6zqtai4kbms2jt69at91g7rk1exlha0ow1nnjykor3atr1m61iruksw33bb4zwjgqh34zgu0qmh1ij9',
                flowInterfaceNamespace: 'cvi9a2j44kbr8672ipdum61riaqjgvnyzymmt9yqqb27uqug6l46q4mi19zneevgs9a74phdqvnb84rb10vlymmff346dsj1k6hde3xhd72cqlxzb80uqmfn70dpusgm4eak7a8wtikzlz6spkv6xpdyhvxba5ww',
                status: 'ERROR',
                refMessageId: 'fkbj79qym61dvecnd0jck14t96oec3zgo9fyob1pwwbffrl69azll02jf38yicbgwgt2sfv4uf8jdyer314jf8cpecgg2iy3x9axtkd71ov5pgxbmnh2fqx06a204n61hfkc9z6s5rg3fy5cut17r57qzp27u2bu',
                detail: 'Nostrum sunt reprehenderit vero saepe ab exercitationem laborum placeat possimus. Dignissimos voluptatem impedit aut omnis. Aut aut nihil nostrum et voluptas consequatur dolore neque vel. Nihil rerum aut a est sapiente unde. Et quas explicabo. Optio fugit debitis.',
                example: '5ark0j6gqwjdh9s789wuef1a5vzbd6zwjyg7fjhg83ayutuelt9yxow0v51t0rkl8klgx9s4baxh9yswms9pv0ariaopra2nwsf9hg3e7pik830envbluv1tk48n3060o0fec5kjsx1tnj0riu574srv8lqkdhf6',
                startTimeAt: '2021-05-23 01:53:58',
                direction: 'OUTBOUND',
                errorCategory: 'wkn6lggou31amvjq0sxw9ei61frc9hhgo80jgj5uer04hkvmmmvjeuhz8fxjx53xcwog93xs6bnzk91e89ws657rsy43wxz7i7xprv2fhhtqfwa63m5c3m6pyc7okl8kbxfgqcu3b9splpv0oydmxr9i12zftvgi',
                errorCode: 'x75ayns6tchxvw5zboj3mlm04y13w4fnu7jzbcukiit8wmg2ra',
                errorLabel: 134130,
                node: 2184165854,
                protocol: 's64lian8ieulaj544g99',
                qualityOfService: 'sqqdrzi1oz66lrlfmmtl',
                receiverParty: '5vkcd4xho1plg0mz5j1m3i9qax8anho51za0is8felubgd2s91xikr594ewe9d3uc1rc8fdzqj1xfu82y6fb55uqtpq2q5v45vfdpe84a8n8tvsvtmtlbp3vdfkuewvm1vckasp635i1p7rb348zcrehauu4l8p5',
                receiverComponent: 'xbi4574y02lilqoor2hx32m0sj1oazdpm5y2pjkp394rb7fhijwlbw8d5dyxsgjezznrf78zzj4ncbmy1wuc6e55ddr1gd4wh2hb0t31nkfzud7iksrgocvlqoavu06e0458mhboiaqjpf8dwetp12fw8fa0jor2',
                receiverInterface: '0ygin07dh5pb1pjy51n8hxb83if98gtum7c1arin5i5medngicdnlko7bvpt3rfgwakl3ag2vno6mogswx6rzn6eye8570jx3f1lmqndi6447j99tmb1vewbnul27wwjrpx8bn8ggqlzrvivoxxmglnp8wzwnpp0',
                receiverInterfaceNamespace: 'z83ur91z7cdfps9in4rty3rv7dq4qvhdpmeagi97r5t72l4xnpyq8hff429benf9hegxx7fhhon0zvrbd1y1aspvu2plyitbllscsooz6l0l75xdknda08vrqp0yfim9des0iwfveg0tbn5bj5r1280vfam0hxvg',
                retries: 9166916341,
                size: 3668304988,
                timesFailed: 8492444535,
                numberMax: 6877520565,
                numberDays: 2966818028,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9cc8f5b1-1c9c-4ba9-815a-e436da6f2b7d',
                tenantId: '368f2d2a-a942-4c73-b4e4-e40259ca101b',
                tenantCode: '1w3rgc2j5mmwzhai8davv28kqg03rgfjlfjrz7xpyvlvehqn8h',
                systemId: '83vz90bp55tsec8pecdn7d4bx1d3cy1taio8n',
                systemName: 'gby2oesii5arcpyhks3c',
                scenario: '6mzhk3j7wn5vpylpq9x0xg3t7idpvzkrftkw4j9j6abbeafbgwblis2v6kdx',
                executionId: '9941604c-28c7-4fbc-b120-17c5d1104cc2',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 04:27:10',
                executionMonitoringStartAt: '2021-05-23 11:44:10',
                executionMonitoringEndAt: '2021-05-23 23:20:55',
                flowHash: 'n0n25rmb2495m3cs1xksya9ywi14h2r7xz4wk7o4',
                flowParty: '9ekmav34aw8tyhibqo6x3b9k85ck3tqzvgvnbp6ws70mrqocxuich0gmin0qklet7mma3lf9lolsnmu78kdbokqh0frq433mghk5fq0fbjevsf6tzw2jp4o01do6cz5xp5j91djz7ylb8deqo7p4om1tonsq5qpy',
                flowReceiverParty: 'e4p8wumc4iregn7llx4gvd06jvjxcacs951odyodb1cnr1jdx8u2h4gs00i888lbl1bstae228sykzmnk5sebmm2ma1o6hlauoeuidfdh60tzmzvjsdzro8cb62g44lzfb633qn7k7unb0jtqbr3roc7nzaaoojv',
                flowComponent: '5abw1skdaes9rlnbuqul9l4z4exo9jcih0ldkmjlhp7ndqy6qwiaq22vo3a55j78mwjcrolp5hg6jigok8lmvwx9qeufuxx13tyj0u8u05ricvo2i756c1mg5fgg2olclsrwg5s49ec8np4lka6ijopgwcq660aq',
                flowReceiverComponent: 'vv4lrflqqmh0uw894yd3czv1iq2pjs8g7d56em8t4jyvw6nonaz0wvkoqd2ydj31rvuszibrvmxcc6kcy7hxvvb7hyt7370htu4bgs2d2hrqj5r5r9pnnju5usd6rps2ey0wnx1xjionlmfe6vy3gpe01aos4du3',
                flowInterfaceName: '9i2yqqxj2wleiakoslwk2zlgjtmhdb6w3h8xufjmwrcjaipoepzl35moztit3ayce1gwkckyt2ijxi0lcl1qtkp2py6p2gjydmaxc1hdrajlao963ojevm7fcm5ft5rmh911033uakcabltinfmn1zf1ophmarfq',
                flowInterfaceNamespace: 'o1btesks7ui9r5chfkk7mmdp1978bgs8iff8j5c0fzy5kmjhljxck3irk8oexacyqcde883p0eseler8evmctild37lic3e92yd2lm7lnw33ai4hfux6bww7q2atqd3zrtjxhmt2zu7wl2q7yrv7333cxueqnpbq',
                status: 'CANCELLED',
                refMessageId: '6jjfzc5ckzt72h3bne64m3qywj67wliqvk6hfq4xib6jzd9znqxvnaavr7pnsm7sb45lqrgawtcjlf04hdzrtx8mj6rdrptk4eijiifqh3avukd4ewwhwrqgk4gdezm47aovb87rs410a39l6ujluw2kyokoehio',
                detail: 'Facere rerum officia. Consequatur exercitationem cum nemo optio earum nulla. Fugiat et aliquid nihil voluptate fugiat voluptate velit dignissimos. Ipsum soluta tempore consectetur similique. Minima eum sit modi facilis ipsam provident iure quisquam. Tempora similique excepturi iusto voluptas suscipit ipsam eum.',
                example: 'wl73k5122mna7vjm61sjmwbm3599iy6xgdvjjlf5lpfog92zibgedvcdl30wxrx2pqwpidaot0uplnx9ryy9v9unmus5cmmnsiyfe9xjzn3zko3te5g0n98u0apn7dl6c6s4vemxwbdw7iwof1xtleg4ubueiswo',
                startTimeAt: '2021-05-23 23:22:44',
                direction: 'OUTBOUND',
                errorCategory: 'eu5nv14mls0x6an1ua8u155k7651r3sqew0y5gy428esieie20yj8swix4hx10pviebcpex2quowbclvmz0ik8r824qoefhpvsfnp6ujizikn95v1ud60q1okul5xxca7c3d0i7np5o4thb44h58dizkt0m56u2v',
                errorCode: '45om9fu15yypywjdw4my4imx540jtduxicafs0233n2itibwxq',
                errorLabel: 858524,
                node: 7670374830,
                protocol: 'lyt183uwfvsof0eg2n0y',
                qualityOfService: '2l81fa5fxp7ok85a5f6e',
                receiverParty: 'if0cx3k0ob8qcydwg70de1vnx6zb98bvce89h6ogvnlfay1mpcns9n14nd9wb0s1fjbbjuar8zsex52h3y2an5b969i06qjcpzmnq18vt0e2obsn4wjwpu4nd2dh8p9ayfsza2299v799q6hky8kaobwkx9paq3b',
                receiverComponent: '05be49918g65po6tkkvhv0ptdqy6n8mlev6ko96gsiyr5biy6nrctg1m6xyv1lrka0z3o3dv2zm6e13ag2edak9ifgw4hr8e2y59va0x5094ebf2hr8ty5ykd7o83hustxvbr95z9skxw95t2a6hubl23ks8n695',
                receiverInterface: 'g501b9xi9vaj1pfy9ty2i2nssimtrwjmqy2bc66suw5951pdv55f8pk79m8maygmplq0ys9dvuxeji3d0lwym7gwxdwx2k7kqa9hb88rgtlqba2hqz66bb9sj2voe0ivxn5g57uxcd6b7sbw7d6qxat4lu49eqif',
                receiverInterfaceNamespace: '4iac4bhfhw4ikumdmqd4flg66b1iqrrpx7cqtcqw4wv8hclmt1hvzwux8ep7jcgic4pnaxii60p8w1enmghsx4m73oont06g9gl9sr58jyos7r624fjo1smte6qdah3z8sicgilzz77llffzs6u6flpve6sce15i',
                retries: 6799531133,
                size: 4953797543,
                timesFailed: 9187657847,
                numberMax: 2326363879,
                numberDays: 5351058771,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ca4be693-8667-41ae-bc8a-0b8a3fbd21cf',
                tenantId: '9dab5b68-6d2b-4a28-90f7-604013d64ad3',
                tenantCode: '96l3uu878jolfpn5d34odulzd1aherptrlcmmdxetyvawn0c46',
                systemId: '7aad6ed3-6a22-44a5-aa54-5b9e19d5e968',
                systemName: 'zuvgn1u8g6xvsmnkf47n',
                scenario: 'zdq0s399q5kgh3ot7fxj9nha4kkjkhhk3tm0ws0vqwi3cd73piy5ggfdugby',
                executionId: 'kvny1izkgdri9niunyilzf00rnz6ecggga2yb',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 05:47:03',
                executionMonitoringStartAt: '2021-05-23 22:38:47',
                executionMonitoringEndAt: '2021-05-23 09:23:12',
                flowHash: 'lvfmck7j0gxssw49p4i48ifw3io01afoa8emqh6y',
                flowParty: 'iedvrr9d3a85bv14aajto74flwftr4v3sgollivvbdw6nng8rvrefksykd793xhavswiuq6h8gwb8jmi47a7medwo08gsnjnrh6jbx8x4ct9e8ojgl9mj78oxqyd0fdfpxyh93e8ifx69j183w8nqypsxrttjmxq',
                flowReceiverParty: '3wwc4hwjq1sx157lphb2uydp3okjt2clo7bolqhbvgjk55x7zlis62tllj2b2f8n0gl1rotcqewjv3lsp9rgph7hv4yy4k8iqe7qsvzatx10h6gdpgiypjdj0x4y95uiah2utozy8qpk1rwdhbr65j18uk2i5tv6',
                flowComponent: '74dsohe27qy3xom2fjvhyymuobxk25g50yi2b5pxn5nf4epmzfem5rbk20z9q6bwenok0nq1a9b6t9ugre7igls4n7alndqqo4jipugprhpd8mg24wn4a8ekgi6edkrp6ybnjbm99p1v2kpcd6ucp2hsb9kkmnqp',
                flowReceiverComponent: 'eiw9y41syrlxospgqkoc9xbovvzsx6qhwhnz71j1g5d1094td23i1hyx2ngul4euhaoye3ow2tpucea8vyng8m534t7nibg7xy60lne9d9cpqgwtzou9xgui7d652lsrrwzj716by08u5zwkfbqb4byg6pu3ly4p',
                flowInterfaceName: 'au5j7qyjv0kof2xezbffv1frloxxom392704dzmvwr2d9foa3rgcyz9yuucizr1gbec9wx5fomhcln16q5zkmjf0diuerol34l3i44qx5b90mqaxrc0wdye6y9row1j3rkrgvtlh3ib3xqtk7vitipqw1de272wy',
                flowInterfaceNamespace: 'nuhgu3rtbe5dscjdsf6p8fw2c9h8s5c31r9u2fgs9w59c2612xd2o5ria6tse2f4s3nxnkxr8qof339o6i32jj9lk0umzzjknrnyhs2oz88hm8t18w9xvdi4mlii2u0ri2q3jtltx890e2tntiynbzb0rbehse0p',
                status: 'CANCELLED',
                refMessageId: 'zedgfdlyrdpo854bp2gsn82vobtrgxcjn18y4vdgbu15a7u9ircitiwdsdldfd54hggab66k1jzndu433l91og407pcmd0yptprig81mb0um2k43kqq31e8pz48av02lo23jrn4jcd3cluy3ww4s0q2vwxpdzcgf',
                detail: 'Voluptatem reprehenderit illo aut et et voluptates vitae quaerat eius. Eaque sint fuga molestias quis velit est nostrum eum. Placeat corrupti enim. Totam repellat nisi debitis sunt voluptatem iure et. Architecto fugit vel cum.',
                example: '75ub1rvw0mtqqb9mpb2fhf1thdcgn160vm4h7d5hg9eqsllbtxe4gxl7rkx1cp0i4g4pwoqnvcprqts2da9e6kmcvkk31y2d2wjoust1egje1pb67dfqtghkpbju8v1htolq9libhl014ssryk9anvrbm72u7ura',
                startTimeAt: '2021-05-23 14:53:10',
                direction: 'OUTBOUND',
                errorCategory: '3yr5qb0oowhujz7u1zfvctepbisd9y6ppkyt4oey04nu6hrd1jctgjyb3uizo61mzl4u4itr89zdtx5d9tps9x8graviczkrzd7ezbgcsd3sy8m40dl4ct38wyszls2ksc5jptthyai07viudb4tvqx9survyioh',
                errorCode: 'eas1qjyqbofb7ggev91iqukllmyi1306uydedgck6q6w05xyup',
                errorLabel: 318619,
                node: 5448559701,
                protocol: 'nbv6zehxniyowuvfojzi',
                qualityOfService: 'ye272oo8armo9514vy9z',
                receiverParty: 'dltkmhkdvxqvivzns5j9r1udpz6viktb3hz52ac42yh6ixfqin1wklo3e3swpdohus1d689s1h1d78hork9o7l9ukbd55hz7o06hu7qrptl3r7muqj2r9ayl92e23230r749bh2nv4y0gi62520kyih5usmrruqs',
                receiverComponent: '8g6lg96pokvh9bu2ujp3yqtglt75gt669cqb22n4yiwoz31wt40gta9h1h09768q6ab5eok7ok63gqhs4zg0qfy14eo3i6kp84i6fya77y3hlc8erqqter1bkzp9u98ya18ypjjy488dbzw2n9ldgewgf6y5d7ve',
                receiverInterface: '26au76kco1ut6kxdwhfq87l9n1fv2cvhnnco9htwvruy6heohi4suchndx4l0muwkqxlr231kfbf71cd85way1uask3my6gu7oixkv4ae8so6g7305e5ni42vqbk3i34jo78pvizmv60e11va9fsnppsgenc180z',
                receiverInterfaceNamespace: '4dwce8g8gokj9xhhfms75h0wae39uuiho7gl32s647mg5inppgicr3un3dlv4kldx3qi3lv04emrab7cz2pdwz2drep6reh83ywdautqe1a59h7mw0jsc9hquq1no8g08y9aeiqvtkcnuzgfpnw0dg2hpum0nx0b',
                retries: 7309869834,
                size: 3466041793,
                timesFailed: 9622863173,
                numberMax: 8430240795,
                numberDays: 3515278390,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1be08c86-77ed-49c2-b44b-999ef3156c0a',
                tenantId: 'a8408380-9a6a-425a-a065-afea1db59397',
                tenantCode: '50ygknmvpqo4gvxk13pdn7k3c6l1a81j3qgcg1ip56qxxre97y',
                systemId: '7b86cddd-b849-472a-831f-16504b73e3d9',
                systemName: '8toow4z9oesyzynblijn',
                scenario: '9tpwe0zv4qdb5xn85r3q4vsu9k801mwvne9g5180xftqp92vlnfshgbvpyqr',
                executionId: 'e275900f-6477-4df5-9537-4786b46a38de',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 14:26:58',
                executionMonitoringStartAt: '2021-05-23 01:34:20',
                executionMonitoringEndAt: '2021-05-23 09:44:34',
                flowHash: 'b09u6u2bq7vjg38if7vyvzqztwchyy3w03zxxo01z',
                flowParty: '3j1515uo8i3jcicppzu1hk8no3sp1u0ztaav3uevh21qi9okjza7la2wkv9auve2evc33y39te04ry6e8u3orbjaxl2l15t26nyn9gwscxxn45ltxbl1kuabox70v2x7h31lz8362g52h54qnsgpp0oqwehigigq',
                flowReceiverParty: 'qampeinj8ygcu97ws4j97bdb5u875y65imj5fnjo5h1h0qwao154xm0asgzukqg8sqsur5zvq61fhk7u3wpzpuspntz1j9z67r6yr50b6i9hdd0sh5gmwckdtr67bpwu7azqzprvl1yu4nxj6g1q02nkrn8dvcwg',
                flowComponent: 'ewr2pq804sdayx31mg1a1i992hun06zo9ysz25kkf9zlbc4nwx5jr1n9skyls1u9xvqzf2fhhl3xdru0g2chpmlhrx6p0adieux0j35f77ptah2adzye7g964yk5i73esngnvluqcq42mjfdoxgk8c38gtcislg1',
                flowReceiverComponent: 'cer4md8mnt5hagrqpwo8mwuobiaqne0z0ktnz39dvo1ddrqq1o3nvezjdc0i075b30gv1cfej9kc5vqakn82c5qfgmdekdxck3gsk8hu07bpu9snm0ae7e6tsedio19oqdhq4o6ort2nd9uvnehcst6a221bzckp',
                flowInterfaceName: '1puue7yjjigz2sxqpjqxifq63k4ne9g36nlz9dob5msc0nd3gie7rs0ebx19rqgehhs42de1qhxrmdmio9yb086qtwxnglf3167sf2ibyh72ltntjmdg8jqmnfq83do1uhq6g3hxen9wmuq5xylb77jgfxpf8b00',
                flowInterfaceNamespace: 'qoilykmn7t1migekhg1h6nrhyrl2yt72ir83bsp5ngr57dsa1wwta30hnxwm594717idnuwfx95zaf1sf2l2t90ry1aek3x13br0m0cdz0lllsc3ha0wyj0yq00v1zpdd0dhm2wcxg6td8wxojidkws1w1mcpzij',
                status: 'HOLDING',
                refMessageId: 'bet16p0n2e79x7gptx2p7d31u2tble3zv9qngw5x65422l8iiq4sivuitgpflst7n33rp9eqe2p6q5j9x712yw7go2i6kie4s0witnl5ymwqwcirmtxn4fxi9mbind7pub49bzxix284uyg158hrnnbdcgv5wjgv',
                detail: 'Similique inventore sapiente magni qui. Qui libero aut omnis. Eveniet omnis fugiat dolorum voluptatem omnis voluptatum. Cupiditate sit dolore hic iure molestiae ratione eum. Praesentium et vel eum mollitia omnis dolorem.',
                example: 'tmdwcfkfejioai1yenep2m0ynwf8nrbd8of2asvub0eg35tay2bi10ybuz4umbrmq9k4hohz60q62cvgq726gth3mu6cfpvk2n27waymoc048zzo930l9ht5zmu1maavvallsg65saqr3nnz1j55eu5b994haoao',
                startTimeAt: '2021-05-23 08:27:22',
                direction: 'INBOUND',
                errorCategory: 'snn36k86mbi4vwn8o9gzezn3j29egazmhw8pdiix1neao2nmi6yoj8zvhbuzslmfqbbjdo8w05ysb6elqxr1y3we1ygsoxts9vm8q6rxfw1sykxs606ltcx1m4zcvzerbzyjyp1soypmwdet497tf5wowof0tiyh',
                errorCode: 'hmloua030q6xkvwl34t1s2dhy8tsqa00g1wz7wxfn0nr42i2uv',
                errorLabel: 180716,
                node: 7515644692,
                protocol: 'b0rjjf51lf20p83wd5k9',
                qualityOfService: '5cjhf5arvkoym4lng4am',
                receiverParty: 'pizd5hg5yywycjc6dvzmw1mv5bima2p5n7trahr1q8im4fezzbj1adcucdce89zdzovultpv1hgnn3rfy48kzhuqufubr6uh741tbtl1hww9m169p2vw4738lykuz8kpoo4ubvvyid3dsr5frwogi9vrvx66kxfv',
                receiverComponent: 'aeensweosmf639hjp6z2wpfh2ah5gwj5495mca369qd88ztuf6lxbfv4lvv91vmnx3xlx3spq8itoc75ugepkufp5vf5fhjtvdqo38p3w5n4y3ca6cuzs45v7d01c82nn7bet2m2mjauuqhq4m4lpg3tpdovu1wg',
                receiverInterface: '0h6yy73s9f0g8hupmmv942w0h2ump2647jhi0vv6mkcvo3bmexp12oi0v5jd37k7np7l6x13ld4qs3c3rlix9mpy9dis9y5zpiq3bvzhr88xorlp5jz3w7bkrnfp60cdkwchc76j1vpb0f6a5jxhemsh92oph8bg',
                receiverInterfaceNamespace: '93035m4omvy1rhea7la9iaa26kj7zdzetqfhiz1fdxd9y8nyv6hvwx4xq9jlt356cwxze0125g1sh70bow803q0m7t79bsim0g5sooyxr93qideksufo95duqxs6yg372wmftxf1g4err8nufn0eig6obtjukf30',
                retries: 6951512842,
                size: 3609488268,
                timesFailed: 3917055397,
                numberMax: 2044362693,
                numberDays: 4316874197,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '77d43c17-4022-4758-abe2-cf569b4b3af6',
                tenantId: 'ef906340-3c37-4060-a628-7b18573b0c80',
                tenantCode: '6ej27r5gvd4x1kwj2o443wxb1fmii71fcehh0kj2ffyiywyn0l8',
                systemId: 'dc05944c-61c8-4d57-8aec-f9a9086eb3d3',
                systemName: 'sqd8mqa98ns8p7rawya9',
                scenario: 'vl12m6nhrthqfrnfkr23oliaqn4ijc9wolz5a061rw37s5udw7vhnimfn9p5',
                executionId: '5750d620-5b19-4d98-970f-a066ea04eeed',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 08:57:22',
                executionMonitoringStartAt: '2021-05-23 02:46:32',
                executionMonitoringEndAt: '2021-05-23 02:18:17',
                flowHash: 'cdottte5bwthf0zce7p7wvjklx1p730rdf1c9ghi',
                flowParty: '2otmrb92xoexjdms6z0cyzcjigrr3cj26d8elfs4827rjfk7h1ja4eip5rizhw3e1qy5mgbmwe4odduf35lyejf10vb7l1hyi1nf3nnhmtb48r25ghi6zwnr7dfn73vk62xtmpiea32d67rt1xqdmgs640o0mcy8',
                flowReceiverParty: 'bvx8stzym3vrm3x1idk2xio2220g1erv8yzk0g80tqq0zqv93oiek1licbtn1ovgdsbl5cbmaplgy2ydecurlnh2lrjzpx3tau4496hps3k7nd0mvteuquie3uhk2nohfrj1jwjjhr4hhog01avjv2ok1x0ur4n0',
                flowComponent: '94u5pzu6otznmgrgc93q52tyeye31dwlwxzyvm5du3uvyz1atzp7j3dlfdeycucocum9i3aosnxgns87vw22s8x1c2jl0rknwmv1ekzti8s0ycxs5kje9cgfz9fnv2cbt83z5qvz239hf4ax3i70gns1jyavaih5',
                flowReceiverComponent: 'jalexlwwac0df8ibyjy23v5gdnkabptf3chzgsiou0ye5ffx2fat8dqyfrwrt47dofhr9aecasigxaedvb3uti8rbxdiky29cenfwe7cxpi81wbms2z7yh2nzodx20ob4dchj7l7jwripi1ww782wajt0ubiy8sq',
                flowInterfaceName: 'hxaqd33pen560j90hxki6ghlx01i3276flavavfz14bhyzg05v9kuvnhrufglxg76p9qfxnzby6ytqeyf5l921sfgs3mhoh8vd34ijwyaxig468c4ba0oklo7s0k62dg2itvazqy4hu4ag7pwloq8xsn2d730kzg',
                flowInterfaceNamespace: 'loavqzaefug03wm5kj2kq3ju20gd7a6v0schtq0atm5ioavtksi8fw1dc1a5848mk1cevjycjm7fa7dlqvzl2h5pfz1ojzs1h5wb5fb7vzww5o0he9e7zycygg9w2bcw051vy999j5qaqvviv29csvst8bvnk4xr',
                status: 'SUCCESS',
                refMessageId: 'bucet28m075jkqduc9l26dff0hc233o1l7jl9eopaektwt891r0xtir6x1hfax7b8t46k6yod2l16qvdsjgcne89j0n9y7ls6iu3ejzaw8vonbq4e8lt5bcrvwsdm010dv6r3xp8naiysk75vftnuojywnlp2kcc',
                detail: 'Ut numquam saepe eos sed. Voluptatem neque laudantium veritatis et impedit. Exercitationem officia quis eos. Id aliquid facilis saepe omnis et.',
                example: 'cgexc49a7q1vp5yot7ocvz2ayyypf4eqj52wqqfqbikjmos3tz9ed8c6lybw75fu2hgogf3e0v9m4w70cif6wh03wba593ocuqcidpcp3rhinpk6e80mz3fjyphhroycfj41fy7xmvqqk68aoj61uvf2tkp39o6k',
                startTimeAt: '2021-05-23 12:44:10',
                direction: 'INBOUND',
                errorCategory: 'yf2oysef35a1c6pixctus1508kj1se1njkptxw5l29888o5qecoze4ic703mzj3wzsibkgeab3p7agjjj4evf6w3pq2jakl6trh0j07q33o8ae3xi3y7az2v2s5h207zfrw764lw7xs6isr3qoorgll8sfglwwvd',
                errorCode: 'n2t4uvtqqtp5x9h99bvbjtgcxcq3dructalyxiar0l7znuoi47',
                errorLabel: 496252,
                node: 3276263120,
                protocol: 'yzi44prn553cqdv341yn',
                qualityOfService: '36uwfji4lnbiqeo0f2od',
                receiverParty: 'j3cvjqa1z0yvjdhwvt0xemvujuqcswg6rlwo2lo05mrfkno1h5gk1ycv2nud41idrgv5gbu3cucotmkluw79g92hjim6makzq99q3z61yjgtto77xoodld6bp86o40rkzs7q6ow2qj2j89bd344nub3l48j1dpsc',
                receiverComponent: 'mtnb4rz3hhcerh34n12zqju6lmv0eemajgxzumhgp6gzjpkdm7xp8uckm14db8rok7otnwh96jtereudtwq7htrgr0nbp3t3j6qpupu49rnxo3kmzdvdoe7t7ujzaee9cq8vc77yt9sevz1bpwkcve5c2qzrclv3',
                receiverInterface: 'hngengzhlqn57te2to3p99bdc7lm4bxpqkddwuww155z8phhnocd0bn2t7pj5azkz65ji4jexmd0kt5uj8jqe3ebbetntox6onx49ngrwro3cj9azqqrrpu5mqn4ti99qa0q5693s1si1m5riqn79zbqmeimvqea',
                receiverInterfaceNamespace: 'nnmalvfe0xmo05gegmyurlpt067tfffqv6c8rhlboke179tay91aydg4nxv9bsuejsugkbu4gft1udsfhjhtiu0zhn5o58budoetrwhvx2mh0nrcp6nxg08pdaknggfg6thwqr3x1ilkppycu62a6b3q3gyd2hut',
                retries: 3575606735,
                size: 6647322053,
                timesFailed: 1526018634,
                numberMax: 7477944705,
                numberDays: 9068516364,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9615c096-d062-4d7c-b1ab-59c7655f4b9c',
                tenantId: '4695ec56-9d4b-42b2-ac0f-71ba906ecc0c',
                tenantCode: 'c2gttr82iunngaln4bb4ra0e0l2vr5bvrr9tr3bqyis3qpn959',
                systemId: 'fe4cd82d-1148-4918-88d3-366bf95e77b6',
                systemName: '5ft7npuwujmasoip03iw5',
                scenario: 'tfk02b8jl0v74yw70748ibg48bq2uj42nind5rfwedkdw5zenqc29qct6u2h',
                executionId: '58d73a90-94fe-4088-b42a-654b32404740',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 07:58:40',
                executionMonitoringStartAt: '2021-05-23 22:41:04',
                executionMonitoringEndAt: '2021-05-23 13:29:19',
                flowHash: 'kwg9w1y1gfai4sibpm00vcykee27hpqcg4lxptju',
                flowParty: '3pm59iifhaafrf13mbi5kk7qmm5yzior0qj7hfjvjd2l84uich4cc55kfzr27je8cbcs7yja94wb7elqmxn9br0nv5af8tzxu0lap7y85caat2oumczwvwb140029jc4r3px2czbjghyaj16fgk5edm7xf6411di',
                flowReceiverParty: 'ct1mgfduyl6w1teglxxjki0tr4o45rotltco1k0t99ljeiq2w9jhinurgvd20turql01o4ux9jezuerv6ygumqoerpfxcdpduuketuubovz9pc32hoy1bsp52rspqvgf3p50qk3j3i8m7rgxh22hsxsh66q5646k',
                flowComponent: '1lz2seyyfwkpxjicx9bxyihf2hl7cxzvva37mms0y46ftw4utv578fpfb22jkmirp17hk2ws1c8qzebdc2lhvgquxmx4qaox16t0k19l3b5bt5teitajlvrm4gq7xw4yq28hqtdgtwzbsotq9c3x3tjzmg9bpqi4',
                flowReceiverComponent: 'f93m1uuc0wax8rrs0fb5x4d219hbz7lbhfrmuww6n6zqxy2jh5ycnifj4yjbbkudpbw8srajxyzqkxfv9xxqo9j1proyx01xc08fs3wb0t6rcx9uqawxdntlc3sdc4zl2d0te0taw798c7h5sear5c2f8l65iara',
                flowInterfaceName: 'a0rhh5k4do0fvyggx0by7tc5piss8qn4qb9e0ef0j2x7p0lyw3anofqf3dydsk9z5zqjg0ax140uw4x7f1pm303tbsdcgc9h94yk76irl5ne4thnx6ffvo8eue5hafgpkpam4wsb5jrywwc5zj4tfpy3vfcmkqid',
                flowInterfaceNamespace: 'lt4c7aq1w19n4o2o6825pto8ayxxdgfzru9ncpg6mn9hg2mdg7avibb84m6qegvilcoigcx0uhqe3sge5wp8tyhhym3h4ooxfa01bpk08x21d0x9g937tw3ka2vrsj0g8xvvlel522varvwd2nlj8glv5qojtd2q',
                status: 'CANCELLED',
                refMessageId: 'mj5dri3oq4uze68uh31so266ugq96gnhcldh1u88oblkovefy4ddu8eh61bm3zjotiormog13le8xiec7uhqz130qy8ne0mw97v2k389zt43z8ajhvj1m9za4z3dwvxcy9l0di2abd5beym5686hhasepob3di2y',
                detail: 'Aut officia molestias vitae earum nisi voluptatem molestias quia. Amet id ducimus illum non vitae quia labore. Modi veniam porro sapiente est soluta dolor quos. Animi minus omnis voluptatem vel.',
                example: 'qe4nhdizcz4jj4fszu5uv1dlma5xhn87fiauyrmqd8n8ndi1gxxsg6n259auhj5vfa1o5ymsl31oyfamb20boxxc94jlf156i2aqod4tnwrntgwzrevvsw4qbq4bnbqzsb0aeu9w3ujhbw38pbx1485suaiveqkg',
                startTimeAt: '2021-05-23 14:33:33',
                direction: 'OUTBOUND',
                errorCategory: 'supadxn6en9emux981xj88x477yktqmsgn0180xw648n0yyec9o4gvlgcky2o8o3u3baac8zsuzgu4sigctwodls9zrm7dodrdbv0soz0prdwu1g3youzm1rmk11qkv8amp1x6e5u8krlw2mil0ll3oylors2d8q',
                errorCode: '8qwq8jpl4ls2z5f2ox43ngp6p3e176aeon14irod0iimaqslda',
                errorLabel: 157027,
                node: 4093647425,
                protocol: 'kahnh3qgk2326s125qo2',
                qualityOfService: 'vvwlclwa7rshidecsf6d',
                receiverParty: 'l9g4uvuw8pasevyqieo6lu1f2mv7u3b4f8f84p1xypzhnsmfdkxin6ss949jvc2lh2ywq4c5y81348sdlsmp78golob9itaz3s2u3pin6z34h4f4jo4v5d39d9znx7a4lj3koaq5dypo20qqfprs2ew2m8ui1xqc',
                receiverComponent: '203mwhkhduve2uj5cklqed3jyrqwg0i0186x4si2433shn1ykoj4absskas4duxgtllnm7jq66ref11es0dxm4g5qbuwxjm0gm4dnubc9qx0pzg1sg1exoicclh5yml4875f9lq3zik55258hys1o7y534eq8uq5',
                receiverInterface: 'elvay1gldazscvypc5qj5gwg0xxzg9nysnjpi0wfyy8r6retphsigov6gtbq5jfw8qv2c7xeai0a16rtjh8euaemdhvclo7d223mld8dzdx4a31sb5fd9jrofjah7kjqldtq2lxxi0k3tdzo4gn8tjwym0msn7sk',
                receiverInterfaceNamespace: '46zhuqz5grchid0fxxu1omcn9x9l6duco2d1q074g2wh8swuclfit3xm1wt6vwypxfg2xrc2ed8uwltrcpfugtblpzd62oywr2lw2r38s9rf3e8flf34ldzspyl11odq10kni4xt2sjkfqa552vncps3ryujva5i',
                retries: 4056765628,
                size: 1954427709,
                timesFailed: 5648509395,
                numberMax: 5944555842,
                numberDays: 9479647133,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd73e6219-e402-44c1-b8f6-2086fbe7d958',
                tenantId: '9f526812-f7f1-4f4b-9548-bfe4d8c060f3',
                tenantCode: '655kjk06r1to4kusnx4275h0ln3tfba5qm5daktuhdjh02czsc',
                systemId: '9e3cd45c-31d3-44a2-92fa-5e30bcd9446c',
                systemName: 'rxb0glo0ldoqbn9t9l0g',
                scenario: 'yhlgsqyjxqf3teeun04zzdcmqc1yyc1psgj5jso063qsb7sxkzmo93qmgtzvt',
                executionId: 'a4a1c44c-7dc7-45aa-9ac8-25fbb6e32a7b',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 05:25:58',
                executionMonitoringStartAt: '2021-05-23 10:34:08',
                executionMonitoringEndAt: '2021-05-23 12:21:44',
                flowHash: 'ljkbwk533tz6szi4d8mn9q9j2x408uj26tql1rur',
                flowParty: 'ynt39iuiz1h7nrxcge3yeqhic8bprdyuu1qxflvman4ovn1ewqyan1dcw28r4ljygwe00wzolidwxghqg5fdw0dbljywlbm53v3cr3dfdagwajziwl957uent86p9kthhkpppclr8ekfdjhwd62dave3ysddjodg',
                flowReceiverParty: 'rbnzy4ueckv4mrzzcipa45qz95s63k49pmew36a7kk0jdlof400skwxy2yhyod4eun75knhg1la05sqwfd58yhu43qs0f74umlplv1uax1smy3xu4mfjgoolpnsapgo91mrphtcs6k8szyslx42wkdk1tqsv5bim',
                flowComponent: 'ee8xsfzau033nng37mks897nk215u26dyv4ff4t95qvf7503350mjbqxdzvjcde74auyjmiy50o2vjo86wwjgfdiv6cvgvvunzj3c24dj42u9pdst7h8n3qgysrci360323leqkx64v6y7zr178v3wimjwz6rscu',
                flowReceiverComponent: '7ddn43kdubkt5balnztywbzgyyv1c1tsa44gg5ydb0ff29t2ofysc4jwm1c44tp2boppn3aeyuydbzcc43lag1ljqndnhfnez3b8bvpvew81zxb393gplotkstg2sh0bo9shylb5jj3jcj6pgxu04aruf2kn0gg4',
                flowInterfaceName: '50lke2ijdptcgl88iauwoyu354hdbesrx7bev0zw1tdzc6znzkmh06urkpb0ql9rlvwa39w5yf1xivqpsy58dfi3fy6bw9g71cu27noc0p0k7y2tqgwr7qoveoz20cs3a9hhjssng144bh93iy2jxxvdf34re3rq',
                flowInterfaceNamespace: 'hv30ulfg5n0kerf3br9nl3peeta6z02zrww9bn66aocqdiiset2lh0uaeh0zyj9eghnrzygqixq3lylkb1ohp4mdli42emli46r0r7gmec8lvu8yg1eab5jigbow8mzud9j6odoeh5o4spr17n4sqj4z8srml1kb',
                status: 'SUCCESS',
                refMessageId: 'b03nsb3jwtg4t1s9lc18r3oeovlhbbdnxzws6i55atisirllfkxxuxgvcrh5he3d7z6muod7zdkkclykq0zlufstlh8w958iivbxyjyovaslpl39vlr3ixttsogs5qkw1bynniiwlw5d2kuzrw2xmlop415sagsi',
                detail: 'Expedita et maiores. Sit aut est eos expedita aut repudiandae. Et earum animi fugit. Vitae dolor dolor autem qui iusto ratione consequatur. Error officiis rerum est dolorem aut quod voluptates soluta est. Ex saepe repudiandae rerum consequatur sit placeat asperiores dolores.',
                example: 'jbisql410wlau2cvat0ccomwv11npocv61k2i4iypn6oz0czbnf59wepcfej6p70yc4eu4v0l5vvbrp1yzl6v6cv47b0tazbxv5onq0idllmszxdl4a1iaur7bh2lv17ajs63lz3oksj0l8909pzsksdevy4h292',
                startTimeAt: '2021-05-23 21:48:08',
                direction: 'OUTBOUND',
                errorCategory: 'v12a7rkbrizpjrf8z5v55jk7a8y2szl9zccp3tbhyurtjc343fstq8owjqzsd88hced2wv1dtqqhwdbvwbj78pvzueipjfrvlvkgf2sekz5aqfus76cyjnam4cxcir6jbgypn8av9vzqfa6y82lnp3iz7n4il0ib',
                errorCode: '038gls3v5jkg0cc7vvt4uwqhoynsf599tc3sbz69rckhkbu1eo',
                errorLabel: 346119,
                node: 7939948585,
                protocol: 'klao9jbqdsdroy1dx3x0',
                qualityOfService: '1zk1vrzdeg7tu9eln7bz',
                receiverParty: 'chuwt6xudx0qyqk34do5ieow84f4i716335yac5jwlnwz28143jcd16ehgyk0173fg36rz19gzfkp7ulku43uco0nk65lx509pbnlpsjqg34cjxd9iu2qpymmk0lg9qgxy204m04sa322eosq61w3rzzlcs0x38j',
                receiverComponent: '6xrahfav8mic1mbrd4n7e8w60o9khvdkira9pvv4o0om3t7q73sk0g13vmaax06xqdkw3jhdhe4tzj8kzyw26esaoqgqu0bf6d915yk33zzh6zz8wyfxokloiagi9nkz4d1el0uv2zrh7jf7bfjnnkxdrc5wtv2q',
                receiverInterface: 'iu1yxb3e8edcmwni5ji993ae831lwbiz6jlbgcaqwi2t9bo1g9c3lvrw8xcpto9k1dvriiwa3w6q5j5k9ezgzn9uqyd3kuxg4kyaa3q9h0fx901wdypvz4wr4pc3pab1imrqzl27qldun6b6n4n8ys99o7o8jh0t',
                receiverInterfaceNamespace: 'f0ivtlsh2sm32uk7ogqg5z8sbyngynjmskl73mwl8pjmgsriavf2mzb1xtajebnyraoeg803hkqxr5f2bi5njkpp3p446809pnbbwcc7pndisv5tdr4m3k5jilp1i0nvxrdnvr805caxcykqlzuh34vw59ce3wcf',
                retries: 8957590987,
                size: 3451524432,
                timesFailed: 3507303106,
                numberMax: 9915435311,
                numberDays: 2433359162,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '41a01412-5513-42de-aa4d-1417fb3fc822',
                tenantId: '6aa4ab03-43df-4e36-a821-f63a2f67a915',
                tenantCode: 'xorrw7gdo4nxev1dz11551kzb7wyddj715ldzqk9b64b4w76gw',
                systemId: 'fbaecded-640f-42b5-bf58-d4740db88897',
                systemName: 'a1ivfd0ho0gdcuecfvkn',
                scenario: '79limvsoc4hdb3eno0pn8anlio3mnhqfdazpbz5wyehkkc92os3nl6ei6owb',
                executionId: '898f9a79-9a8c-436c-87b0-e59094f9eca3',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 04:51:09',
                executionMonitoringStartAt: '2021-05-23 16:17:59',
                executionMonitoringEndAt: '2021-05-23 11:09:53',
                flowHash: 'fhuppeasn2pe25pk1omka2505xjxewpexj3f8vnx',
                flowParty: '87qc2v2yrpt13qgz9zz3gj8vx1j3h4f2fwr4s3l5hnim1w1fxyt0tuvuikdcyq1x2nd2cmxuys08gakfl5n8pq3r6tx2h6yisjqgiy4ohwqx6hbnlwrppbuewsybronvxtqewl9tlqnz92xmp68gibubmcywbhbrl',
                flowReceiverParty: '56ejce9umisylnojdd1mwhg3umzyp0iljy5rh3heb6ogd7vncm4umvtaq7t99id4hf112o528eaj90gyilf5dlb6nsa7n4jajss2ptdpu1lllea6684tb8l1z1gs2z7tenejb84hzxl27wz7304yn9epj9ukcyw4',
                flowComponent: 'hr9psip41grh4edplns881mwvawa780p35mzba5etsbacz7bwy0z8snu6tsav7zmhjcjqsgdi9b0lyvs3owixw0a487yocjh1rdqj1t7y4j5m44edu6hr90mgi1wv97av82a4li3y4ck8b2lx4lzvwag92kygxe5',
                flowReceiverComponent: '1y41wybvtl3om6ht6ga37ni0bpkn49jfi6mrdpzl1tgzhhgpzwbv9nruvmot72fwi44j4oouofhgugezfhvmwsedt9hki5eoigh4okob5n9gtgoi70xq026n2cjlz4eoq20lyd34xxh0h6tg93lb9goj04yua6sa',
                flowInterfaceName: 'v94kv4ao1e1g7b5vy8nt1rerb9sqyrqn3zjna6lect19sr98if0xyepb1408izoe8ef3m4vcgddcrbleai1dhbx2jp7penoutkh24vpagipskyt0r0nr6l7u04srz75dwz0vmb1notg4132jpvxfklhqtseheib4',
                flowInterfaceNamespace: 'egwbnxqrhas2h7tkq3phfcwis882t2hd49qxdv6as5jmvii981c969be5latmhug9rrgbnkjfpqs3528230qu980ynp1glld84s26hlvnlrpk2f0l6cp18btznk5zkqdrdr5721kwyv1d3g1yk3ryubaubxpi4dv',
                status: 'DELIVERING',
                refMessageId: 'n85ehn6mgu9bxw2h29st1zrtw2x6n824xgu1vq4h7674bhlplniv8d4agm93rjsdjkrozkkc86jnwd2bhcretj4u20oggvwy7yhjgdluyut5775tlojh9682h1edlur7ociytdvpnyey9muojfnuzzat7cy4o5ex',
                detail: 'Similique et harum sit optio inventore assumenda rerum qui. Praesentium et expedita dolores est et. Minima provident libero.',
                example: 'wc1agzuwiq5qmtkteuxvfeqnhuiotn320tlfldu7vlwdfl417i50s5psox2g49j4hprld4zfg39by6e3vzvtbalm837hfnv4xvaa9zstoj511dxz3y6wpz8o8dcb22ems42e85x08f0d4h5q5hw3tozvnu8sa1k0',
                startTimeAt: '2021-05-23 17:28:07',
                direction: 'OUTBOUND',
                errorCategory: '2bj24de9oxpwixbtsz58svc24jz7az3yugsu6j5v9r31vgiy52ffx8qf68oy86lyz640i0732rviymmkxkjff4i8ox8giad9pmjmacto1eziw9ctu3c2nmr7iheylu67ki2nhuhoj8i3wpq0vpnf9flbcd6busj5',
                errorCode: 'qnbduw5k9eozj3sxeojgtqbl3vc5nd2vcmjt5f9y22v1e5a1lx',
                errorLabel: 641338,
                node: 3527265245,
                protocol: 'w8bl3n5c317ks286vanc',
                qualityOfService: 'lxz8oou1orpppky54mtc',
                receiverParty: '7ocvh5iba4q0xn8dmrz8rzqe854mmuhifu68r9bjd4tt3q45nfwneuc6ha9h5shusjvbjm22acvefl794yv66mtbm6ba4bil4fvmyhmcm27hce8rxorchqsa511zlnpdmjsg4977a6evzb7lg6i2x8xtshnzgq0m',
                receiverComponent: 'b37j8uztgeonj6nwkp9k4jzq7v1oet7hvega33lk8qvwm9uju9pw17p62w2a19yu5whn3mbnvlqbdl4sgxzosl0jawo1fe2ztxjub9qfeo529rrfeayjapmzpbttg32l04lu60m8qfa9xloennm000ck4zr8kkcf',
                receiverInterface: 'q7tascvoo6sp9z1ga28pqhptw8xkcf7wq2e6mjq8qfrq8t31mi7xfh4zxt6nmuxbe24z0h4zuhiv3qddi2taovlx1y5cr7xybnt0u1u9oyw68bn1gasf7vxvtpvf5ocv9l7ffw3om3eq2qbjtnwr1qrb6oui7917',
                receiverInterfaceNamespace: 'xxy3agq74rvyzmj24i0afl6rwde6l16rpebfbo6xrnmy71xee1api8hry6xt7btljgsh2thk9a9ymte6fk9zou30d3tn3nqhvlcugynbef43p0rsqnj7hmh0jm10jzgq5cqtdl1mzva6ji9gz1tj1wjk66zdwvkm',
                retries: 4769368096,
                size: 3787695348,
                timesFailed: 2752525420,
                numberMax: 3766938053,
                numberDays: 8385849487,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '30abfb0d-fb84-40ca-ae02-dfd34b4e0c83',
                tenantId: '93751c98-0941-4ae8-b1c6-e15fb47694ed',
                tenantCode: '2qrp7ngqh0jq98jh975kgsyl04iq4d4m6gu124e0vb0okk7spp',
                systemId: '3d4eb189-b336-479f-9217-af804798e0b6',
                systemName: '7iihsnjwuibo1of5x34r',
                scenario: 'bo3df9kzglxwmbdziowqhsmhi1df0njc70fvunvw57wh82zc1hoxzynjrbgh',
                executionId: '50bea71d-881d-4e14-abea-9ad717496e5e',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 13:55:18',
                executionMonitoringStartAt: '2021-05-23 15:43:44',
                executionMonitoringEndAt: '2021-05-23 15:47:29',
                flowHash: '278z64nn1d0lduzzftnd4pspj23373ekud65rsrv',
                flowParty: 'faribatydsjh0acu2opolbf5dpah1c7h7zyu482ekxyqxhrajw1ule3u5bfzmy4af53e652lct4ytpjzptd64ufsbx55eao0405tlrrynv0lv2k2r7yrvv4txfzlihgdqcymoir5daluqvdlb5r8olo2tnd12we3',
                flowReceiverParty: 't5tnne4g5t996ydge8wr1feu3nt5owi4u51oyz59lulllmfkk58byurjcdicnryxpjphczwb5kqck6gpttef7u15vsw969gxqye0re7a5k9wcox7el2i09y3rt74y4i2ax7p8z8mukokajvobyqcfm31dtumfms2w',
                flowComponent: '5s28vsvguirrr4gd9496hbzen848jqnppj0zueyj5ki9j2an7mxf7vddpo55s1j93etr3krctrhwkuos47itf7frhwwyh2adoum3o6luttt3n4jwv6nsy59bwp196g6wpevhpg2wzvgtjvzj668u5cz5cy05w0l0',
                flowReceiverComponent: 'mro2s6rfxw920h7alu32gmqhqyewonwiyeeotb3ohka41qvsn2a4qeqvlb0ony71sxlnqw1rkcxpm2nmpgzya1bbnhyko5k56yl9j8zgx80uv1tlxpudik0bvi5zerrrzc08q89zv62deod5hnrhnp6pz212c6kf',
                flowInterfaceName: '4sxdc4zupjka6uzh5v2uv6khfkh0a87lcjjsy95g55aolk03nw311jz2cinl4ht5iv8bsdvja485fi0zgv4wkdoi70qdeuqqggu0qe73oefg1o9ruh13cff9q3myvwkwe9rb9fkmvt9y5uydb857d32ujkq7w4x1',
                flowInterfaceNamespace: '5ofbub4a6zmsex0i1u9owzqua5c3sjp7vb5d1zt6r5bqerl1gov8nn51v4l0bmknu0orwmonxj3nrq52vcasz6lg9de2nyrciz1sx1grwerx5xfbhvwnfzjd5zasur9pctwyio822gfknie5uajqvhs7w5j6dcz9',
                status: 'CANCELLED',
                refMessageId: '4zy9ho3lwtx9gcj6fm6vkl5aze51kbcfpeaxziw0z8jgk9uvree0clzv6scxu61djwq8qo6cas7ui54z1t9lr3txx71nlssbhctbrnr334s584rir9qzfpsj1afxh2fr9922gszorku55kntuehwe84h4qqs44d6',
                detail: 'Ea et libero nesciunt. Aut ipsum magnam excepturi sapiente et odit assumenda et dicta. Voluptas soluta nisi quia dignissimos eius inventore odit est ea. Et est odio aut corporis ut facere et ex. Voluptatem id omnis voluptatem at odit velit voluptatum praesentium.',
                example: 'o5zqs2mbp3nne9sr6je9akean8ymhykjz2axeq7iywavou6bepy3zsa7qztedpdh2rvotlkm0sjshe4ipb8gh92inwrfhxjkpb6ma1pa3jqdkihbj0gttetu5u0ileh49keixai2gkgx7cw7zjd68zh2vczrnp3j',
                startTimeAt: '2021-05-23 06:58:10',
                direction: 'OUTBOUND',
                errorCategory: 'njxopgin7xwnx526qkd35b494oc6uiod4phgj8ht1ygn6s1s1w9azwo8e4xhqtp5hg5jxy8jthmpu9pab1adsfbvf9fp810ttn2a30v2t5b7ngzewy51ed1w650pk87m3qkncvkeejfa515jjz9ze8grtnpm6i4q',
                errorCode: 'xoqlbtiatmtstp7ixaoibjsjq81iirwc2nnv8ukhxmmnbem2fq',
                errorLabel: 234484,
                node: 2974274357,
                protocol: '6f0en162r0oh4941qwen',
                qualityOfService: '4azo2cvcxavqgni51ma4',
                receiverParty: 'tqarzxewlr0tgwcdwp9dxrdaxevj7tv8mjq7xy28zk28rcaqgklhmaewez9542b3mbmhno4kwe7bju0htt084120sloycim2162pp7xqwnx7jnz1ub22wo94dv2dc3yemawgb6i3hqcmcdmhcsao3untq7tkzyz7',
                receiverComponent: 'ry3s30vzop4gy84lcb5iamk5yk434m3nq18b9ypoewr9pnorp59sif0knw847lxyhgx98eez4dgnrrpwfjv5iptwsopja6p3k3sjjolney2dzf8za4glikcyz1unfbrykwjk4xsmmmxpc5f9pqa8fd6jl83kqedm',
                receiverInterface: '0l6d1g7hc7zp7xie0o59sjuvkd4xntrselhfutc2zvshywgr5sbwic0hgoiq5bunbh8z1q7c9bwpfbnrfv3chaavwrd8cyjlp52wc8uukrpwvt11bh2a7xcjvj5exienhu29fhho7l1tyffnvmof7eg2s6dmhpcz',
                receiverInterfaceNamespace: 'hgue2hn2ta1wmnkiz2n826ndg0zsgnuqkj7jjvn87gkvqy49n7cot90zfhqvrc59oldm7a9g8qxa8nwq9jjs36knqmtdo3z8dfdfulyyd2qqor0m3eqwdasy44rwduaqdfn0rm0g7rdrpaxzew5r60s0ob91nmwo',
                retries: 8113106544,
                size: 6093984182,
                timesFailed: 9698134197,
                numberMax: 4528290406,
                numberDays: 2724789822,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ac274402-f36b-4d17-bdd9-f0dcf22d1e7f',
                tenantId: '7d7e4ef0-2aca-41ba-8598-eacb15e39968',
                tenantCode: 'n8xb21028b4fxu3ggyfbtlvmtw0t43i2nkq0aknxjn2g1uurz6',
                systemId: 'c78ef0a5-7c47-4a74-bd9c-0e2beeb69243',
                systemName: 'vtuq99pkkges6ef70zow',
                scenario: '3nb0hcb7vf2ijlxem2xca2ybi7ulnwknrgbsvu949gs23wzhebmqd3c65s1w',
                executionId: '48e9bbe1-1a07-494b-b8ae-38071b3e3d04',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 06:26:07',
                executionMonitoringStartAt: '2021-05-23 09:29:29',
                executionMonitoringEndAt: '2021-05-23 00:33:50',
                flowHash: 'e9pqbe9c4t38yv8y2l7avg1r0lupntusjmzdcw7t',
                flowParty: 'ou6676i8j3mp80etvyy825yrsgguoj0yre7x791twmw0s99zl1xo4hus7lnme7anxi4c8xn0d5jqvocgl1vy89wbefa2dhxz0eanea8wz9htwdsdjufzs2v1inqnl7byn8arccjz6y5059kzsg7kmrxnrpxxn0qa',
                flowReceiverParty: 'hig4io6x9yovn6wyqw74w1s537lstzc7tbzei09w6meoa452xt3onna7fnagxncapq5l1vzb0gq2lwyr94v58gvo13dggthxfv9hy0fwyoklgvgavj4r3ts82em417hakz5pjaq5ps3yzudaf0dsvnnz66xxdqog',
                flowComponent: 'r62ybwftq9w6sa4p5oh5ufp0c6ydmkhw84ectxxhyp0rurhmvb8amqunskk6azskhleq1oiamuarg3z2etump3vef51edsy7lsvvid8gxhvgjlywdspbt02aszku4b25i48oap2xrr99qgvx5ucz4fo2ltz7i0zhi',
                flowReceiverComponent: 'az58ljdyx7rx2oy5ugitojz4miehbxghfkzl8ew0prrokfani2c8bz5u5gr7va0w73xu2o1yrqge65vzwslve3tsrrrteiemkyoeebsw4xaja3exbhrc8vxjedl8ozfh4v60qu6irdlam24d23ydhwlspxpotkia',
                flowInterfaceName: 'rd048m2xkkc1tdrk8v6aeczh4b457yv3maxzip5r1py6or7d3p8wvfgqv3u6wa7ec4in6fxrk0a3dmy7d9pbe51fan67t3yt7ucyniwzqh67xu6f71n21tycqr4d1e76r0qeizzwpn0vxorqptheswaewqhgp2gw',
                flowInterfaceNamespace: 'wabvfct2ohkqu4vfxy4lmrngulyrluvs8absiu2sw9ir77f5updxvrkul5yg2xtex33njio83ninzs4jccj56pmbiar9n8tbig5g03gtl4aq91u3fge540rcw4sy76n6g847a0u2f6k9ju56p4tm4os3clv5yffb',
                status: 'WAITING',
                refMessageId: 'a1ro6i000oipjwzp0dr9s697g3smnj5be93w75j9qvr137f20zuhje1v5wymypob49ow5eiiabo9jvjtfi0nh6xwplc8kfuhqao7weoilowg893i2nkn3php53qty55mu3hlc1jv3xu5fp9bifyb7vdsqe8if783',
                detail: 'Praesentium vitae atque. Ab et numquam quibusdam distinctio aspernatur aliquam ut consequuntur iste. Omnis et non. Alias eveniet ut inventore illum tempora in asperiores optio. Debitis porro a. Sit exercitationem non a.',
                example: '5r08ywiyh9xst5igrvnrfkeo39pk1joa3o0b3tfoye5tt2zrvagi3kbis2zhi4g1b3tzfvvh9vbu2pr6w3vbvt8gtobdwd4qs1r4o89aolfx6wnqvhc0g81jnbv65mfe732ylwjk0mfgludqtnf3oi2872defqt2',
                startTimeAt: '2021-05-23 12:52:05',
                direction: 'INBOUND',
                errorCategory: 'f9ppj1bcicoyv64tti0kp4cjnsn8okcfeejwfqlbaewf6p7mw1ph9c2kz3031znxbfb9nxe0dv41kdbos95ca98nns1m7ytpog8bv6u5ko0s1pkz8hhzg2txarzbtap186cdpn1g0fkbneko2h7wqe1k80mz0tle',
                errorCode: 'v5wqhqt96kmm87qm19d52o25zyxgmibb48wao2jxu27d878n2r',
                errorLabel: 863184,
                node: 2034636458,
                protocol: '8deh4vxl0wa66zzzpjzm',
                qualityOfService: 'php6yow7qv8mnff1g05i',
                receiverParty: 'y7bykfz5n6m69k1kyv0v4h34cs0pvor93q1gsms13fv05mtxdpi3u7zog71s1npndedulfhynqbtd637pacrtkaogbits7ujba8lu7kei8sj1uxdewa50of80go5pd0i9ye6yd8w9h18rmlntl78o0fahnicejvt',
                receiverComponent: 'qq3o0ssew3y5cy72w9flcseoo28w5yrgo85a4sfspjp3tad0ghjrhhidrek3plhtkos7wha254zu1ffegkh2be5efg2fr7l4ivndi5828oqnczx38xdgbqap453tx4hcwycmmt3qqrdgifnphp4syvza9sp0k6q3',
                receiverInterface: 'xnp5z2mzbldzird8up7cvyhr6rb8mh58qwmxwmi9zkgky45s25bs8oinh1cxvnmwlyiqafuxk6nmcxavc635xtly6xahfv4h1a8qfyelrr8wzt1kv4vfs85r54nykhgkwpu1p9skku4ehbxlsebekhvi1auudvc0',
                receiverInterfaceNamespace: 'p0vmir3bicipqm9hsjk0t8k1uwdflg5zzxtsg7wzv7e5fih20dgpzqe85f9e71tsqg8x7xkjz5o3vpos1660mdt21qztumo70m3xg5nmwj7nyzt58zmplrwb8ogl234gi79kbkdre5tkiem3cnklln355cqp3per',
                retries: 5484862399,
                size: 9103158910,
                timesFailed: 7879288217,
                numberMax: 6043617963,
                numberDays: 4782071516,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bb21d980-f8a5-4c6f-b86f-6c31d7e7fefd',
                tenantId: '4c76e5d5-4acd-4410-9ccb-3f32bb9def9a',
                tenantCode: 'xxezpmpqnpa6r0gdz02me9aoquhhayh246ku0ecpb3jq4z6x8i',
                systemId: '0c62f20c-c53b-4c28-97db-0e2ff2beb0cb',
                systemName: 'o3vxz5694x976baplw8h',
                scenario: 'rd5j1whnuh8v2fzwy3lt5vb4gp0esstnoyg37sqj9nafmv74ntvokkfi6fqm',
                executionId: '0a61e654-c697-4438-bf1d-b139db02809d',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 14:51:19',
                executionMonitoringStartAt: '2021-05-23 15:21:16',
                executionMonitoringEndAt: '2021-05-23 01:35:31',
                flowHash: '3h1y6663d4uluj3l14dtdq6bsldyu7fmn0cm8xbf',
                flowParty: 'ygnszrth9j79ws4sliai9td5t38n5qqre7zs7solujcs65c8opu1d0ri6oibn1npuny7hmho4whl1aq26cblvvq9e5gii78tr708xx2r2trnzuqsj2fizl91tur9civ8wnxuw7hf5gvgriutfl3piwbac5zfhem1',
                flowReceiverParty: '1ugfsur5i8zk0n6yhrn1c1iek38qefzr6dlqkkr1o68tl7o7nrnps958o4sa8gqffwp2238lf62c4nhsekbztwgeyqdnti4l07ai7qfjit6bssoku4l450vmfyf0xukr7t7x5l4jlzehkio3f8hkj73ljp8wbgrj',
                flowComponent: 'z8b2c133husa2ycl7ixq52bd5s5fsys98jqy7xnwlc23i7t41t5od1p8zchgy765n89brngeaefyeqz2atdfci1uo2c7x63zwghqxhmrgxve2ne77khan2qxlvr0v6c6l5wpg6hdjmb1662qm38hhtyq9dfy58eh',
                flowReceiverComponent: 'a2qiw3f1fx51hu0b3yv12f1pwtafjkps30s9qzl4nisedq4fv06znu1icuzej7zp0ierf3b3jm9mlyq8ty9izeljkftixw7ei5zyz1n7qrbc3944f5s1ohb1hze141bhxxsir8cu0u7apniyurfaie1hkvnrliqbw',
                flowInterfaceName: '0ziqflbvn9c08d89wwnwod2d22d7zixr4rw7unrimqdjae4719wbj3me7oj0rvn8ds0jinwn6c0wevucvpmheaowk2teertfzi454a0pyb0mtinmqap7v07982lz1mvyledyvgv54wrlfae4lvapjq8zwogd2awi',
                flowInterfaceNamespace: 'e4yx0hcdyyds3jttx0dmmjk95qbbqtfafdpzf34o276dws8ggugqt0a0lqzi52pzq84x3oe10ectrrd6d2ufpnjp0iifp0hjfoq2f04jjhnhcpdmbkties6xyppf4w3yhoe2dgedxzuzh011ju54qtf8tdb97e8w',
                status: 'ERROR',
                refMessageId: '8iib5v4v2k193rdhyhnxu1ywtkx78g4lq05dqfdv9ll88b4v7qvkv1l75br2fluuekc4zf8vjjhs8ry5a2nyl401gze335kr19jkw7cdb69u9vxizs256lsed1yn375r76r0ajg1qvh3fkd0b3y259hkiv7gj30x',
                detail: 'Ea voluptate aliquid molestias. Omnis necessitatibus esse voluptatem atque sequi. Rem pariatur ut exercitationem et perspiciatis vel et rem. Illum dolorem corrupti error cumque minima reiciendis aut.',
                example: 'co7byzvy2sskrxecpjlrsfy4zweasvnrsh8z4uhztkropdkjkk0ey99rtmvt9mmfincnx8anfzyizjvxzdvnmqc7xu059qbngtahtv8sy6esmw272ps3yclx8vrc81kcdmsoi0sb60qz0u7xdd8nte4raksnc4ky',
                startTimeAt: '2021-05-23 03:19:05',
                direction: 'INBOUND',
                errorCategory: 'tj3xu2oqjdpm3y7m91o6ubz8se2ha9nue0esjlxlxosubtn12bb4lktijrxpnf4x3uwsw76ekvtdv1m9gz5te60qylhxpt3iaj095umle4zcup04mybgyi16hp4jowx6ip2kajhp7wynvnx5cncwbrq30fevdrzw',
                errorCode: 'kyplf0rka454l670127yqvpylbuugpjq0138ct3jiu55ka1yfe',
                errorLabel: 595587,
                node: 8521998531,
                protocol: 'wi7pq9k67npxw6g0u0a6',
                qualityOfService: 'saw3n9jlam3a2pv31zrj',
                receiverParty: 'x4ca8ojx18otkghasideq6q26zbpzbum0qhc1263a7z4ikln61880si89fd8lonq8butnder7aeo0a77814vdqh9cg5esrpt6kyce6fqw8ayfcs7vyj8usljv5wuak0kxupi15lala4o83iofg4xrfn77ew8jop9',
                receiverComponent: 'z4h7lddt8esj8rs3f3nlfreen5repdsm4ehqwwsptpzerllqinmu0kgfhy2tkba5j7my1py04wxiwnbquisvgbzv2qewrvldtcgcb8a367w1wzw72cc08tfxuoaolx5tnbyw5yeb2fc2dthxrwvqr83lk2ny47g8',
                receiverInterface: '5ct616cat80b4g9xu5g52arlfyn9hn4wptfdj2ql6z9igqzzyp4n6u6yvcciy854r8da8aq7n6cfg9j6gonw0hw2jtplcspzyc4cr1mt8nucny1tvyrp5pbau4t3mosh3g3gu19mtfehxw5uk442ae5fgdkvnmoa',
                receiverInterfaceNamespace: 's427tvyh12g4nznv5hrk73d51oced9h1uziigse1ht9mk5p5dwyldyy6pbvnm14dpql6eegck18p4gq78vu3511yicwemotnce3s7bsf174ur537mlxo1y3rcb19j6gl6oyhqprm23e4b6d8ucdhpo58s5o422fs',
                retries: 6356812095,
                size: 9153493402,
                timesFailed: 1362519281,
                numberMax: 1844388322,
                numberDays: 6081181597,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '56784b01-65ae-40c3-b1bc-4ff2b0861378',
                tenantId: '62e11c56-84eb-45cc-b603-3e3013df3209',
                tenantCode: 'o4k3g4nbmedgm3vchfk8gz8ojzx4jel6qd42x07tbi786m0544',
                systemId: '391b3a97-9ec0-4d30-923e-f23b2aaefe88',
                systemName: 'mhr28ws4nkj0f8t1om09',
                scenario: 'q4krkh77yq5bfs32o09r0jswok482lm3oqpbrb64dly8xtxqoidljsswqh67',
                executionId: '89e2bf57-47ce-4f5b-b501-bfaeb5e8ab6a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 22:03:34',
                executionMonitoringStartAt: '2021-05-23 01:13:46',
                executionMonitoringEndAt: '2021-05-23 04:23:56',
                flowHash: 't5iypeyv5ziykcmalg4nd3ot782gyeo29769remy',
                flowParty: 'ov1cz6sfhr6tdee2s0m0i7zp4tq63ykwm95hswm5cwe1gpus1gqyzj5z5nuvyaq3dz3auico15hkm9it2v9jw0xte9lncrzi2k7qnvy7aook9z7h4bu6qw6867wamh557j51v6oji0goxj0ds9za03wzaajrw6sk',
                flowReceiverParty: 'ew3417ugkvjgd95zolggzkxjnsb0we8xevyi8h49f09jr1p028i077m6u42qzempmxgzkah4zrkjodnhhf0t09dug55tu15l0a8wxu0lkn1vn661rs9djveepw4t3cscpm9wx3pecg2xwjcr02a37bzv4vhn4ljm',
                flowComponent: 'zfx5tbm3lgly3c0i7pg5zsojxe9mu5rnnvacvrbbkho289rf9xzjud80zdl61v50ts31sgs09e65qy6mo4n4hnj7fo65dqtwce9lo6vcj0s1rb19nf70in3ibykxh4fmuqy0fr0jgtadklvz9cmbtqsgyhkrivoj',
                flowReceiverComponent: 'c5w4269f22yf8spr8y6bu35fce4zd14jommoedjqmbjgfum3nlukm9h1s2wbvivlkqme6ghzoqiggr67z3bidtg6l6wss1s2vy8lftqmqoiuonpqunb5srq5yp4edbrjuudrqjv81bg1666lwdfd8mjexmzxaxuu',
                flowInterfaceName: 'ltaicb5tjsx8lnenhxl5yj7815kkicd4zlkc7osn74kjeodyvdj3rodhd7rianwh5imomz7bzovldu9wrl1z5jn594zttyi92wsu2sl6ly89n4r412e7j793tt60edo17b8za9rl4ajvrw9qfcwvei9d0r1bznhc9',
                flowInterfaceNamespace: 'gtiez3ztpd3lt6cy93g7pl0uayce2g52cvze43yx0iymi00r43vk9ijkcyfbwgjho6ovty8gm9vmex6kfbjmhuqpviyfgnytfd0jlu8s8prjuepk6cli8os394ysoojek2pt0ohlc75jr35457f1op52crzsaumv',
                status: 'CANCELLED',
                refMessageId: 'gwsmlv059naaa438gj6i1db5peiv397nbcr98frq6bvjp4km20veldou14bkjmoanivu97nt59wvcgvatncrlb3pyau17x9hdkqw1kck21nfygnk1220yo7pvnpl968e53w1qlk0ofkj6wzhil2qaz6stytmon2d',
                detail: 'Velit explicabo iusto inventore. Dolorem sint vero ut molestiae. Consectetur et earum. Voluptatem quaerat ad earum modi. Ut ab magnam fugit impedit modi cum sed nostrum vel.',
                example: '5gkkyqc668pysl3ar4fg93e4zur7m4kr9vttkyegupuca2o75abu53wf7byk1ag8sb0fpj7vnsztv8yr2uzo4om0lxjm86s1hp40yhtaorlzk5he7bh9vdjkd23v690mj4yqm85h13yccavc5hyb1c2u4o2bd014',
                startTimeAt: '2021-05-23 11:14:45',
                direction: 'INBOUND',
                errorCategory: 'zgpg20lvccrvapp7vryhwve35xsvr6pu2n9pqmlgaivkcmvx1e2wbej0t0eunl0mh15rjom4uixshgh3lgtoe5iezxnirpfw99s6q79i57mezz3rbqpnxjgvs7gyvtaei6u5o84uxylgpa4a5v4dtppsz5ffupaz',
                errorCode: 'kv6i69i2u195kmi0e03yl2pddwjr2xmdgwlu6ifwwwwgiylov0',
                errorLabel: 636644,
                node: 3781318346,
                protocol: 've4qrxuq4u824283erce',
                qualityOfService: 'un601xhk7goyayq3rxvq',
                receiverParty: 'tpcj3bnowol1tngemnrjsiildprbsmqlz9v2r7pd2fakdicnuc42cawv8uut4xn36gro70qft4uoahoubldl23i7asz8snaem08ccs0my9b0hxy707gr00ngz0ujtoo2m1nxzd25s4cs70f6e1q3f209n8rnzmp4',
                receiverComponent: 'nh0162l9og0vi6gejynjs6d93zmragzwkp8ubacwz45f2el5lhs21ux4heolqvqrv6479ev2yox8oq5pesbovjqfl71sd3m58497o6a97j5vi27lafp0946m2h3ilha0w9c4a0zvtrdz024bcn3u84dk6oyp3su3',
                receiverInterface: 'sritmodagr4qdqiqxax9x42hgzhhlvz4jw7bjk4tohimizywiifsho0irsbrtbdn1syyyum3op69wmchyhmc9vig2b4qwp3ud2xp2eiami851e59jmzfrmlgkb72xif7jgxti280l38zxejoalne3p09ytvp4huv',
                receiverInterfaceNamespace: 'vxzyxd4bddw0h5uh50p7kqgb4z8fd92upjamc5b5zf9l26nhry794u11nszx9tk470498cwwlsak875exwtoctws25csyx4q5q3fr4u7p9hlmfu0n17fwiw2y1clvomaos96cgkw6cwm7zxgwal93kuc8e8mxjac',
                retries: 9790454221,
                size: 2386380809,
                timesFailed: 1047839730,
                numberMax: 7488927313,
                numberDays: 6708576676,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '805f79c2-e611-4a59-b835-ef578e0fae17',
                tenantId: 'e91942d5-72ea-4e21-be02-c6524405c0cf',
                tenantCode: '9ena84w0f140tafy2by40aa990xsynvcrmbo8rfz7y8cxdm4d2',
                systemId: '84756221-2fd1-4ca3-990e-5f66f962acb5',
                systemName: '63oquho10ndtdjltfql3',
                scenario: 'gyrhhhaek5nrsaxhr4giyybi3cnj53jorx6gmfhxjqsjnzn23sus4jgcxcdm',
                executionId: 'f6fbcffc-ee90-44e4-a304-c1f67bce1de7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 06:07:40',
                executionMonitoringStartAt: '2021-05-23 04:58:02',
                executionMonitoringEndAt: '2021-05-23 17:58:36',
                flowHash: '11u2ukdny1blmci3sk01kr4py0z1rj0167616j65',
                flowParty: '41oq2kuenkbfjnw2awq9bpjqt3phfi2himq15lptnkssxvejdhjdht6akedcmyi4sfeq7ug1jrnua8qw2lmond8he1jdovl0v4qo3s9b15uermlcdhvf73h58fntv05z1yi9rcxh17j61xj7vt2yfi0iy6ovi415',
                flowReceiverParty: '7tb9n6ofgcbu7v5ml11lky6lc2pz230eg4v9vqau5peobzwphnp97l6gqheo7y123tpfgmluehoez19u0q48zcj9jxvv9jup25dub5ifbvlidunh5r77z77fnex80z42mlr7t7b7jt9s6e6fal17kykcv02ui93z',
                flowComponent: 'gs0qj4b0hpdtxwi49ltg8b46ksll53e0oxv66cdihkcneodrg5ttphe4nkbjd52vbu76ppqseotmlfnvydn8g28ar86q4z0zt3e3bxk48rkqymjqc7vpno3hlwrr50bah0r0ad7qlzrl3a9v9vi7vnpjw2u1pjj6',
                flowReceiverComponent: 'p1guh0o5dejc4zphstih63uanu3p0oqtdqe0b05w44rxe26laazz8zsyid54rtf1ui75fcrv6m316uli3dygi0ca4vniajiypjlil0tx4cd7ro68uevkld3uqyai01xlszr4fj4lg0d06rkuhyfehd8ppxgtb19t',
                flowInterfaceName: '0frfrw0at0h1m1j8n2ty3fr4wvk95lznve4n5qbtiwkz8lxx0a1a0wnke07nt9x7nl3wbzq41nit6sx15njs4bs0hmw69n7s6ivsq5qm1okwvi3brr014o1lpqk7yo6whqgz5dzy8qpvr2islemyqrleu21yuffw',
                flowInterfaceNamespace: '7z3njgypt2dlaj54s8upr6dbqtzkjasjxi8mebhkxxgk7htufl4qkqkby1yxx6ex020ich2yhy4md0kkut0nx1bf6xunx2t286rs3fffvotxmx8qzdceuocp4z8mrohwedslypk24p7t9hknlgc0gj0g3stvawta4',
                status: 'WAITING',
                refMessageId: 'kb3nhgohy2fp1xrfasuqzbqqxq3ydlw0pn4j1nb8frnsiyekmab24e3ur59oaeffqdka96qda6wz3q7yijd1ve64rmwa406wlzuj37ug519uh6wy8tn7btvkq62tianhby5y3algydgkdpagll80okebisif78yu',
                detail: 'Et voluptatibus dolores esse est magni maiores. Molestiae repellendus eum numquam omnis. Amet veritatis excepturi enim qui qui sunt.',
                example: 'hdrrr49h0fanj8vq3njre6bsl4lu66zw39tihs7o9mmv2p9imjkrbgrqe1mhaco4914tqn40fp6fcae4v8j9mlfak82ocxe6d861g8hzbkvtr2rqx10tzdx32a7u2p8veqzi9cc84e4udld7di1aqerfe35yc5mi',
                startTimeAt: '2021-05-23 07:37:02',
                direction: 'INBOUND',
                errorCategory: '8z99o7mgooz22nv1iqn3x52r9uqljby1bj382xpz4x3ginhbyos33agndkczaaqolrh75elkmbqp6r7ys21plind8ayp1vhihf2mfrgxknx6fkvszzzcoizl8eajd02gk5bgd9sn2a0yhj8of5kdkw4dk565pdzh',
                errorCode: 'ow14q9tt6sccjl3q5mb1uh38iql3vxu76q66350avgwx2h6j1i',
                errorLabel: 865014,
                node: 3786161699,
                protocol: '0e7t79q9axtw42ullxfj',
                qualityOfService: 'x2txxsiap79t3jz4tnmt',
                receiverParty: 'de9b6qydl69jp50eoguurzrx3zneb3f4pm84w4x4aypbicd9emgingpoh9lzc7w8r0gpe7f11fb3rdsaa4muq6vdxgfh2b3wc3zrhdvgni2xungruwuscfj8v3dasybvi02zcz3yu69jbrvunc9qhvltfshrma6y',
                receiverComponent: 'wqm9br6zljn7mu4qf4fgqqdhkdop40g8bog3jgafowtcnj49s2z813h7wjpgwrmbd0j0okrta54tz7ehob3dyde5al4p3tiy0g1juzrj97hn8daknmi5ox011k6a1zcdijh43h5eitob2vwpyyyrf32nzumygw36',
                receiverInterface: 'jy3blx9g8axj7dt41zx2imw04n7x096qq0ojv9opt2e7cmxzeylf8bryxkttq9jo4apmc5443l069m2jt43bft4x7mdmdzngll5c0eehtebxp61lrbia5vx4a3sqjiqdql543t3jiq501qb6zsxvyqhk5k9667nd',
                receiverInterfaceNamespace: 'pbi7i0s00bs0d0m9alnkswc8i9kqp25ejbi3df2n4hegfxpcearykmh2gigid673jmfcl1lh6dcvv2kkcwlp5wcd28kzhatq99u2k4b8ln2peznnkt5hfjrvunmqg5z1ogjripucpzgyzg6774g5v025aibqfhdv',
                retries: 9360267916,
                size: 5215183556,
                timesFailed: 1883017016,
                numberMax: 7824922332,
                numberDays: 9550338555,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ee8956fc-71c2-4d51-b8a8-b35a74f40167',
                tenantId: 'b30bfd86-8a40-485b-a603-8735ab920291',
                tenantCode: 'textyxbzralchciwufamppbp9rlfqg8yy7ns8w960b88jz2xyt',
                systemId: '46c8363a-fe6d-4ba6-90dd-ffccd49c3775',
                systemName: 'p96nk2h0p3orqi4u5w2g',
                scenario: 'ksc883pupnt5blcwmgnj2xnwmf7dmeqjmhsy9j2wgf641yqzi8z86rn18c3d',
                executionId: '160fce93-8593-448b-ae9f-d11ee8e34df6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 15:04:41',
                executionMonitoringStartAt: '2021-05-23 05:56:52',
                executionMonitoringEndAt: '2021-05-23 11:55:06',
                flowHash: 'uu0e0i08oc02fsk6svcs5wldqhm3japoplfl0zyf',
                flowParty: '0jlhhyrshedz8jbjsx53wojuj7qrrrgoiszl5fiwhnw4c37i3av0s1wwusdm8el8phq8x7ux5s8851vc5le8j2dus4si40y8uyn6iui7icpxqd7i67cb28k243l545vwysv2pevn6md7gut4fwvy0e987kyhfw4z',
                flowReceiverParty: 'hvqy5gfiqegrhx751y0wy25pu9ltvaaquw1m3430rum3r1q7tr4bh6e16fjmgttqpizomqltitkqkjcdwy3810ewd7bmlr1ny7frq3hgfzz87ujq2g84d5jfhdo24t7nb7wotnmk1lvv2owtfra5lq0ty1xgcu8m',
                flowComponent: 'i5q1b17isxwod3hvt3920r3z0qkzn0scew9kjoj06bu3n0pnk1lyj6udxz12bqptq3nhgbvr1ai7vbab417wiaeal7s28qi7h91gvitg83m7doxser3zevusixi8ciabtcj8ci7z2ozniaujm2dgkacrefkdwlxd',
                flowReceiverComponent: 'b4sqdw0u6kygg7nm59y90nqqyyo4bk9c8jfqbqgqo86jkjph97sri6ds7g41bjo91ej4kaan3vcjy5hggc7mmdwbgg44fpe4fvjoz2my07ghbzw0hkw0fycky8khm962odwqd57phudfkchdrcv5t8n44a0zbzst',
                flowInterfaceName: 'ckkkdj29jy14cx5u5ijk19cjjpd8k6e4uv9wr8gj0nvuor241x4stqcqxkkvc1argbacg37wb75uhg4xigmpnmihh262b7w79543ve6pusdbtyhvy8pmnn7rxdocxef3xzzrypvfs6z1nks4ngmv7i7oyz4kfnlx',
                flowInterfaceNamespace: '85rcxhr32frs2z5k7wnm89oir3iyljuzttfp9nbe9b70t0bmlgxs2bwxogukvgdf39qeynt757sd2hlg6xudosbczqvsmflh3onk76zt0uq3cqjz8f39viffvxnn0xjw0wap0tdqckpk5aw6a60y2i13eugybz65',
                status: 'WAITING',
                refMessageId: 'ppupsldbn0lnh4yajkadphc7y0qg95i1rhj9vy1o86vt55gihvmi0yeopm8h4r7orfitkr3bfgjz44be8n0w6tri99kvxfd3o0bn6w1kj4m21lgm295zlqq77zjq11hqyewkzv3a44dfjauf2xyy6skqril9bem5m',
                detail: 'Eos animi iusto ut. Voluptatem dicta nihil dolor labore officiis numquam dicta blanditiis illo. Cum modi velit ut et. Quia ab fugiat in quia. Perferendis animi necessitatibus occaecati enim cum est rem facilis. Consectetur nisi minima commodi a vel cum incidunt dolorum minus.',
                example: 'kk4z4wytud50w6npkrci1nsm6i7r0ewa45gp9cd7m009ygtfg00705jxebswnwasluw70fad46q396cp93p949zfl0prx03tim7zpewf90zuegcs3gts11p2inugspaim2uh9f75i6b526zmk6mklc5fuxtu618r',
                startTimeAt: '2021-05-23 20:01:11',
                direction: 'OUTBOUND',
                errorCategory: 'ccrejw02tjujbwolankvomqn47s89e7eqxxy1jaghr4ux2n7kc0l9ce3460jmxajst9ro2reqeadx7q78q3js78ncyv2b61b7lh73d22bc6di7htwsiljfx5eia2io85a3wjiy27x8t5des9de9yho7d8ifmghmv',
                errorCode: 'pka2ax1bzr87eg349e3xze2xuvzto21ymmsdl6edf7qu8ix15c',
                errorLabel: 127965,
                node: 8470954153,
                protocol: 'x5yymgh6lbmq40ymdm4z',
                qualityOfService: '5fhd4f4xv4tmzlpt9ln9',
                receiverParty: 'sgprcp6n7jp178k57gbtp6klsgi6e6tahs5ymra574e1yabc07l7ax7ypo64mvjsjabmoiccoaea0b2oq5r75vno1ysa2rddzph3il3w6jgqn2kqtzqeaedq5lbgkujq6ytmvtx9s16mjlvn0by2jdealo33t0ol',
                receiverComponent: 't4rlb5hgq1afym4vn1lujsq14v3871yas1jvz4dnjkyhjtzxe3lfvlf2mggr30bnd4sa7y8vux30blf7xz1aifc4yxu848gq92go2n8otlqcbxzcm221w39t3jhwzb3noqpbovv2mco7k0ng7tzuzmqz8sexvkod',
                receiverInterface: '4fgtpiu1k634tu6i1qx4x9sozdmntu6zl6v55745c59i9ast486ke2icvi134x8kh65ggrhqfdsl4qme23cz3s2zbq691jyrzalq4b2w70dqmmsoc14ynta3mrney6ylhtqkwsc9tgmxsz2mjw2fvgke8f66so0s',
                receiverInterfaceNamespace: 'po22a0gc4exx15jsjinlvodva16yfawxff0dqdu77t4he62wc3ej9wub564lqe2tuqvdw33709xcaaimsluxfc9ewwutze1mzq4cayphzpa5xwl8ajj6856k7zi3vh1y5n0jwtintx23hgvh5zkfzrjriha8feq9',
                retries: 3187390725,
                size: 3781192877,
                timesFailed: 4105679566,
                numberMax: 7916530662,
                numberDays: 9933058914,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fae6257d-4878-4b9a-9d65-4582cd8b7a5d',
                tenantId: '0cb671ec-8ba9-4324-aac2-53be90e8a01d',
                tenantCode: 'czmsjhfdt4rcwleou0vv1z1sa6fo903f7px3nykhg8yaved2pf',
                systemId: '3a8caf6f-9ca2-4ead-ab52-48a183112d51',
                systemName: 'azyga03hdwdrg0e0e3qn',
                scenario: 'iqcrwfi561bp6a8osi41h3xh457g9iady3mvmp1cw8jio46qxeokpobo3upv',
                executionId: '22463443-350b-4eac-a7e2-b0b3e9c004b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 17:06:15',
                executionMonitoringStartAt: '2021-05-23 23:05:11',
                executionMonitoringEndAt: '2021-05-23 18:47:26',
                flowHash: 'prcqc9ns2fcl0p23mqbyarbnpp1bl5lzg3rnt8im',
                flowParty: 'n1oallb8fqcbkjcmpad52idmwd8qc9srd0g9lqjlul8sadvhghsmfus5rvxjqmjoi54kpbgepz3omdhh3fr2kr1makmmyd0meckeg2apsjnbx5u20xppdp716n5bj13ei3uzwtz1jlsjg3y403i52wni74zdkqh1',
                flowReceiverParty: 'd5nvdpvs6fhfuozvtqlmhku5mepjz2f3ysvvkk4q473y05hx5d5ntrzjdry39obdzjlkmncoijtkbrd170y10v0rbbd6gez3x2p326kq7m9hd82qzfc65y8u99m1l0ktbp1e1wgb2xjwjqsad8vzl7r9b0web18c',
                flowComponent: 'ex9staques8im25yzcd530nkaxoyhq3tsyu5q57et7hjlxptnyzjv9lqnzevgqf4keznpqinyievfacqug451w57hl65zjpfapevk9k4ohy90emetuaj2g3ffsxbv8cledtjxbgsswyp90c75yti3442sx9kn307',
                flowReceiverComponent: '8sye5ttxxj4wjav5ywcsy2goho90tajfxws613wdap3m5a65oike29zvtkc32n06bhduelcl462mwbshkc6vmzfko92cdzume6uiq252xt3p4vo3uckqk4imciawo0f1n5jo2cqizfgjr5gjzk9xq9gjl4uv3oh8',
                flowInterfaceName: '32wykooi01l943pkhbdm2iaf4z0tap2ra5fbu0mgqn7x1a9w0zxwqkru2xkbrucsdzjtjmq8hgvoao6ncr9al9abjaswdic8fzggohh3xtkahidnecxjb3a9qb52iitadiptqc2t4o41kego6jl483ehxhcag1as',
                flowInterfaceNamespace: '87nv10rn7r9tm2iwc8st3a64z2ko50usdclthxb3geg45iu3cf5sqneikn75rfm7sofjjpruxw07uebrhw7huv462xx9i7jf2dwy6kmq41vv7ruetppqv3n906vk1w31we1uyapwwso1y0trh1gmhb24f7arddja',
                status: 'DELIVERING',
                refMessageId: 'tccuqq021lem1851ux566mwq9pffpyqb1gi3cbnd01yu3s767mcx1hz4ubo7gzk5fhehunwpvfpf1cv6kobfkopxetbnewclsfhjsezs7utmz1hgytjxez5s4evgbrr7m4a8vi4yjcirzi3xc049uqfzun2jt9as',
                detail: 'Ullam esse odit libero sit eos. Molestias ab in ratione ratione ducimus aut et consequuntur debitis. Nesciunt voluptatem illo dicta dignissimos illum amet numquam voluptas quia. Iusto placeat sapiente molestiae. Rem et beatae unde tempore. Officia animi ut ut in ut.',
                example: 'qq4q24fuu70orlbkg0uiu3ta0m1i0voslfmfbtb57ezf79vcpxr3frn1z60yjz1zd7vbgel7ugmkey2wt5squgsn2q3yu42udsfti5lw9h9xdy4sjw1vbjkgtst4309qq0wvmz6fdhi8nkpuwh13my9agvdd22xyw',
                startTimeAt: '2021-05-23 20:41:35',
                direction: 'INBOUND',
                errorCategory: '1mohtkn1wz6ro7jqysy4cx4t3dclixc7r4jpluas5lp5ubkq7ycqv420djjq8el4p8zqib3ilpf2eig8nmqf1veg0fr6fmpevu6mzg45ikw9xe33x6fwls55qfd0de215ov5laquf50l1y2bvldhvzjgj4tmlxzm',
                errorCode: 'uatsznjy5alod00swyok6wnszojyt7q13u7ywcj0i4m94crlh3',
                errorLabel: 528782,
                node: 6366944297,
                protocol: 'bb0oltuo5gxsu8920nvr',
                qualityOfService: 'tmt6hfr67t1l0k4xxbrf',
                receiverParty: '6emzfxqkiuolusn371dqhpm3v4ivnjw7vuubzvrdfu908g6hc21rhkqfeidcyt2fhcrm1lz5wz8seelxghzcu9mhno5yitlw1s35fw77inzam18gmwqr7dbgtzl1jzlcey6oeoynfd8rw1tnkllzb08f55t184nf',
                receiverComponent: 'tpfuyyw5k1scb2yitjxazbf1ocuil4i11akbydwsq5pj4cpfnlwlwg6x3mxhysx65s7xarewjcabkwbxcb3cbdaw27qbg2lneq0f3ps2vadcamodgzdu87ted326737h9bjqgilxohee4r8lm0q19be2841rrecx',
                receiverInterface: '6rv9vor2kfeq7rn5rb1tlyqo30q0bzzxs4jp65lvxmth06e7augnyhltu491lo5r8otkut8hbb9ul3rml8ewyeljjwubx0wtlwq3s1ze1trmetsys7gz01x0hw8i6brs250wg0fe8hornpbg91it3gl62o27wkgw',
                receiverInterfaceNamespace: 'szt2bjgaafod582nof5chdvo0w3658zrd92mkybismnyvtg61zt2hznca5wc9isqb6db50r70badc1r7q3fxzc3n7csj06yng09zqu4xkpemmfcw37tk195er2aytvve4dzc0l3l9kvcwy698apvjt4axwp08y97',
                retries: 5241781164,
                size: 5803579292,
                timesFailed: 5680117263,
                numberMax: 1978221033,
                numberDays: 4462870226,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd3d071df-ea5e-4be4-8c0b-3125b3b2fc7d',
                tenantId: '7c58dec6-2604-483c-bd80-f9eae2ba1eda',
                tenantCode: '05xucsk3h5rha397w69v5ke7m116uhot6ydoc7sjhk0he0tmcn',
                systemId: 'aa5f7493-3c7a-43e1-8b87-f931fdfd1644',
                systemName: '7cqhslmr00a95rv8kazg',
                scenario: 'ecir5tjarx6puzhkcmh60m1jzbrk88epe4z856aa1k6v18vxv8niv92c7z8x',
                executionId: '2ae10a8c-3bfb-4407-8b97-0725da0365a9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 07:07:48',
                executionMonitoringStartAt: '2021-05-23 18:19:24',
                executionMonitoringEndAt: '2021-05-23 22:19:50',
                flowHash: 'n8aa73tlpnxfyilg111qsqq6chv0fb4zuzx6uytd',
                flowParty: '5phfah41i7zvzq9mi7jc58201o14kq5u00xje7ebrsy3adglp7umxwuaf30wncbc8hui7zupa2nfu03z32sbmlbwkycbhs9eo40p7lavwyjtfffts4rbqtflxizegacv9yr9hz6ndva1j1stdif62i632dpl9izs',
                flowReceiverParty: '4kg96l7vw398hq6t23tiaa82oqmiweriq1jx21vhlgxdq9hz1139y09eglimftdh5uft2rpqmhypubly109vfh06e3fji7x2cmynpaupimizu8lpudg1qmyqi02urcj2pel00kcomu57r3jwim5i4luvua06yei8',
                flowComponent: 'e21khiupaptgpgqlqjgw9oh2honzijbalgcs80t3o576i897j0dvkuzq8xwlh9orkqxndogtv86cz7w00hlc8umjug15luit2s98peq5yd0s5i3onuit94dcgoc8m1je76jjn5576jvtxhjhy18jx9odb0fov826',
                flowReceiverComponent: 'vtctkm6chca1wafxsfb53zxqs5485catt6ajn0qku4cenvomhv9u68getg3n47xbzpaafxdwq04g4jacsby3wo068mazx2ag3u7ntqagouc0oswyi5kyf6g7pf17sag0w71mdj8x6fde2l3h6zpaiv1b6xgfpm7c',
                flowInterfaceName: 'k4gymhvqzm8x1gpy594f08nzv98di5sxgvtxc4zql75vo96exxu3t7it2e4wweqmxncs5srye4jfnabmnt6b3i1ih57o2iv43kvg4jsmlon3qw8wi9jycc5tji4t5235d1awg9uztg111szo2txoyd9pnc2h5dra',
                flowInterfaceNamespace: 'l9fshpduysmlx8g68yuw93u0d7mczaas4tfbz7ifmm0vcaraqk3goimb0sylv0y1fr35h59v9iulqwgruxgflwt0uhgjdavz86920z2947socqbdqk7vw2raopd52i0kuex537ydzr7klt4ds47iu9m5tut393km',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'incl7mfg12pxbpd18nswqzey8rob0svvng9j49ipmgiaueajdd88upmu6bh5it9frz2wjj21sajqozwura4jzrp25tk5xtc34s4innx642pcgl3qepdggm70csdplxvmevxz1r2zyy1dnq0ypf7gh2pxj217vtar',
                detail: 'Temporibus eum quisquam deserunt pariatur sint non et. Voluptatem accusamus non molestiae voluptatem at sequi est provident et. Tempora vero voluptatem aut minus enim sunt facilis. Repellendus similique et voluptatem at dolorum. Sint suscipit nisi et magnam aut magni dolorem.',
                example: 'n7v0utr2nd7xyu6p4377ur7ceu20jenhvmpwhg6dz0wcy35uedhius5pt2zi85cs8z3bay2lygmultzxa2iqceu0u7ty5rptug41bj2kkh5jjq791j859x60o37czev32hizn8szv0xangim75m12pppa2cp7x5k',
                startTimeAt: '2021-05-23 10:34:18',
                direction: 'INBOUND',
                errorCategory: '9ananv17kr3xyf4nev0kegwcm1fvb1bixx656m147xnzzfvj8u6u05wem5wrnnfp8goqg9anyp5zpnr5xc02z8nm5kqhmntdgptmwghlnprdsixma07989zzgzym2cfju24pfg5uomqylaoyc5v7l5td30hxfke5f',
                errorCode: '9iz4k8ljrvmjznwx8voj0do8brlhzebfvoei9waxlg5ij7ap6n',
                errorLabel: 979185,
                node: 6357854804,
                protocol: 'ogoqmhl3i2lkhb0rg7ex',
                qualityOfService: '1gic1o219h3w66wbwbhm',
                receiverParty: 'ozwvh39750wj7bbci245puzktmsam6p7ja14tqtrvblxhank4cvert9jtzflpzemifb0tcn1j36t5y3bimcp1mih4ow6bc9i1y193ajvx5x0nncbot8d00dwqaqnsaopdr1cp7c3qpk0cz748fyo0zfo2h59bk42',
                receiverComponent: 'dco4wllne4y2dk6ppf5szcfmnb6plx3vqoc37pmrqpovc4r0lsvgagn7ltyr2dje5yjsumkvogxsbsfss5qq4dni4m77h9q0vfhuf1ne9jekkb61z0zc8w3qoq6x03gjob6wqg7wbk862r4uf8vx3gqyhyl5ga11',
                receiverInterface: 'ev29ijfzog60w947revnu7hvr4z7ekq4ptb6s60pg6bjarey1gehkxvqbhxacw5nwhrsk2rkzkjxj8km4ql7jd410qa6cm330ttsgfwtozrjjodxjpjnesgazqywa30dptsto6u3sp9mgcgxrky7abi69n7hpy4n',
                receiverInterfaceNamespace: '4gacc2qlzl7wbdwm1z5di7zr9nh5nxu96el1fsv57eu6pa622mmczx0684riyxn3aqe37nir1our1u3p1ulrq5ll4092fxe2r596hwtnw4uios0bwr8kriwwlaxdei1iq8yqdrkzma9regou0v3tltml8p5ql8sd',
                retries: 1456138001,
                size: 8513266836,
                timesFailed: 6791885427,
                numberMax: 6461446313,
                numberDays: 1729261699,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '20cbc5fd-edf7-48ae-8e7e-2a544124db54',
                tenantId: '44e37b5c-60b6-4bd9-9e37-804a8a0f3a2c',
                tenantCode: 'lz5g81j7npozn5qcd6jssq3phfzsy6llxtnnxvrmug086ivjra',
                systemId: 'c2bb3579-e309-4d71-9081-4b0c168ca397',
                systemName: 'rgepvbam3sbuu1g2r03g',
                scenario: '3m8gkcf2vhkib8p56vbjxwf0qx6vd6c036o7136wa3pkzpd75g7ncg4h0vif',
                executionId: '5a77ea7f-0ea7-4e47-93d0-bfaeb2f99562',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 23:15:11',
                executionMonitoringStartAt: '2021-05-23 04:08:45',
                executionMonitoringEndAt: '2021-05-23 01:02:40',
                flowHash: 'zhpwsatwk0xgp4ynp6rh5i1fij3aqq4lne4zfrfb',
                flowParty: 'vmrxqm2gutktria5m8xw5gvxz9bwly882gd8ofwwie6me0sraktjwcfypnpf148860popsdfun5p0fzzekndwl4zzf0wxlgfqzgfmgzztkk6g4oo3bbmtnfqpnpfmfq9i927w8te2u79zjgu7dlc0oly3isqpzdk',
                flowReceiverParty: '2x97tjwin9c45psly83tqgua83grsc1bqe7ip8i1o1ib22gkajg9opkcbqv9tpzjko8eoi79rd9sbvzgc9y4kdmxqxebmj1b5fkc0j3cw95t0j8gtor5pr8fuqz9xbfcxuffhgigf3cu2fhb2ob7rc6s9vd2klp3',
                flowComponent: 'rstuvodqxpqzt8hzqrra9ulnfmfejyzlzeull1wbdqs52af5suly3n2j12jbrpxj43vb0otvotzajibu0g9ulvdk971nsnsp22ghzcaj3ivvib95ae81mn1kdtpm4434f1jhszvecrcg4zbaf1qxhj65bxbawcwd',
                flowReceiverComponent: 'pznl5duvg5qi4ffbcwn9yqrnkqxewbhuvxzekj91783poyg6u9pbvfhwvzbr6wbdf4q2agk4s1pargxh6sj19a07y0a4048fareqen3c1nukp4b6fv8wis2cynr1uv1qn2blgx0xsk49uzqfqqnevz80wg1h9g51',
                flowInterfaceName: 'wha2d0sehev7ahofup9nmlye9ru6j1yp5w27mcdzaea6sbk710dx9bmp475bpva54btsqbe7zd0m0as65gvfcdc70sivkham75y3k887d4uhh9oeolvd01qc96kfpxk4qzlth36ga44raraoyixu7e119uw242uz',
                flowInterfaceNamespace: 'ihmcao0yne6ytyn97k9vaswiuqjahmxdqfpu5m111gc0ax3ksqugenzyei5dnpppl9ckfrhofsf6qkrbatwd4qyxrn6q92h3evx7glrve05nx1skmb83vgo9k30qpwcsjw2xiswl0l51es7fp9uqht4qxpa83v8g',
                status: 'SUCCESS',
                refMessageId: 'ggdpd9uaocl6lx71iua08wvzlz2qnr8sgt897r3krigryt1n1fbwoke1sxwyougi6nmbo66shf8qrw9nakiyf41kr40ldo5lmas3kg3fuv4bxuukgtcc8czirxekzfk8iej7mwomyw5igxpi9nq5by1qtfqlnes1',
                detail: 'Sit quo ullam mollitia. Ex dolores est quas. Sunt quisquam quo ex velit corporis quaerat suscipit. Quis voluptatem ipsam laborum et. Occaecati dicta ea maxime aperiam dolor saepe voluptatem reprehenderit. Ea consequuntur deleniti vero id adipisci fugit libero officia.',
                example: 'g7xdazt6j0qh8400yr5iwlwqdo2py1rrho2frkhebirapdz0uoih74la0b1a1ru7ww3fsbgnvh8b6ajh2xclijd18n9q15jfma68t25dk1zh9bexb5kf1yk946ohuzaaz2qxdvr64w9oh508vppj9z0ueb6s3tp9',
                startTimeAt: '2021-05-23 05:44:04',
                direction: 'INBOUND',
                errorCategory: 'fugppbwtznpcq9eig4zf60crgotf73ekgyfmexyl3z7vnypo1wj57ftikey9pqpkelvddsr6qqzb24rvcbq2qnqmfp7vmzdwmmszby2k9xyl1zwio6kpbcfx1ddrk8nrxwhw5cykink4k2lwaq4dlelhe8hzuxn1',
                errorCode: 'vzd2ycxj2lw3pv69xjrb2sw3zcin0pczidb7ym92j8yimhlc8s5',
                errorLabel: 984449,
                node: 1540124630,
                protocol: 'fnwp024ik46chnwzlqj4',
                qualityOfService: 'x20n2436ecel1x6yygts',
                receiverParty: 'lb5ra62zqxisth3cpiacinpyrf68l8d4ma39h8008rm90dc23jxp48dduibbffswwpdq202fc6hx8lf2qeo4a68f4q6flx9yi6mp8k3tn8r8wpx0123k0zocrh63utaq0y0f09ciyy0tc8pizwv5hxa7trbw305n',
                receiverComponent: 'fbhqnmrftqx62hgb050nmlcd1ny2hnz1k4pfqp56vjp7d6h2e6yu6rmhwe6nindky8x3ivldyvgwrntq1c6pwdo6cxcfmjwzdyomfie21odjcs4mi4twudvstqb1vp3hfzbvy7qbf6q8thrltfv9787bs7pv3fum',
                receiverInterface: '2eimngvhwi9ge3onpk3w25wwpzp2t49jvjmspbzc9dm5mm8k4dgbk22dkcqdqj6homb7j697nroizpqrwkfbu21xeh7d5mpskhjyi2wkqfdyyxepbtc0s7f1ij8h98o4c79n694dlbjjbt7qvd8v2mgb12qby09i',
                receiverInterfaceNamespace: 'ilso8h6bhunsf0harn28vuhsnxghsst1q6u9ro8wwpgwjbqnq7xsd5o522hakcsfw9jwfth2gl6s5c5ju9gg5j5cy2boe7ic2bgm1aknm6y4g7v67nnxhpyb74z07tlh82w5jgsirqglcfhdziq9l47maxhwycpy',
                retries: 7130646131,
                size: 5105523052,
                timesFailed: 8515367333,
                numberMax: 6095301479,
                numberDays: 5916010412,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e7f63c47-0948-4ee4-8421-59c141eb8ee0',
                tenantId: '2d274b43-6dfb-4b6c-8d8d-8170157cbc24',
                tenantCode: 'sghvzk023r49399z08k59imtljitryp4jxt65umi9qzw0rz868',
                systemId: '32e212ff-35bb-42c4-aaf8-fb4877b85e72',
                systemName: '7j56pdtblpx2pc7jfyj6',
                scenario: 'mnk27amripa1wii9vdtbpt9bot4pe86l884iuv4117552xmrgfy4v6lht7iz',
                executionId: '6b7d7393-7574-4023-91bd-e78e326b9842',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 18:04:34',
                executionMonitoringStartAt: '2021-05-23 22:12:42',
                executionMonitoringEndAt: '2021-05-23 05:02:54',
                flowHash: '8bcrn6r4oweavwh9t9qb4zp9n6l3o9mds8yynlxd',
                flowParty: 't8d8bwl5p2dgeuht7mtbvc4ohn6k2qd6hs2pfk75ii0l1xl005gthaeynxtuqvc08onpf78e8kkzpvu3fv161elvy5ypeu09y94qd520ipc8upugmjbu398ic4m3q72qit7jvcd83hlb6puzgfv9zcbnas68ocke',
                flowReceiverParty: 'jxl3fr24f3hi4w7kvvq7ifswnttnovuatyju09tnfzoy8obt8kjerenzujeodqtba6haci9312rmjjdpvin3f7x5fxichwb9l9b9ld6qdrtwrppk7lpe7br6rao2lzjfwo0gb73h4dnyppldn8jbydz01r4xancw',
                flowComponent: 'avp8v0eoz7ddjxr1n6da2sfkoqmun1o8ylo1fak0r7bm3lym1sq0enczly05jn9w99l2j35lzsmex24joavghaaa7ck4utqoon9c9hw5sxoqrf8jexko1pxxxlgjzo672362m2jkqsvmbyhpuboevlk49aearwxh',
                flowReceiverComponent: 'hs2xqi283a1h509qyc8l0cftx2pba3jxng6vo42f69im2ryoof9vhi2phdu4w36v73rzvvsfsen59klqniklpjt5wja9ji5xyjr6pv3ezam8vjs5w2pvbga77rou18yy745u8qm4gch2lszfad9zl3hgwyv1rabi',
                flowInterfaceName: 'fcgg0g8u01g0v44owwh0gzdjjzrv2y9oviyfqayvrtwbmqvdwwhe2r4e41u8guj8db9yinaotco3svvdd6hftijbg995qdbcyantg63kmxf7ftigohhaq7tj4jcpllcgc0dkaq4ypm6bec646bn0ipjqgixqnk78',
                flowInterfaceNamespace: '3gdb25dmc21uezynpbjtx6utn8vcjok27imc9z2mmldza5v2o9l0c74gplcy08qk0kmwi1e6qo0ckqyc3ixi5hibugrxbk8ym2y2497vze0cvwjkqdf2s8l1coc3dct13nimx1gem9ufkoiz4plq33pmscul53y3',
                status: 'CANCELLED',
                refMessageId: 'i9oz6vec3moy1mvrs7bhi9h89olvy0cgcpyw216cwc0lm86prtalqmoe483eajjr2yut1dyx059w3w36sks6480wknwv2makwyg2ksld2g0c35x6ks4h0eu3rd8xv3yp5qhfizniil2d60hd0ahr3bvkmvag24dd',
                detail: 'Eveniet repudiandae assumenda voluptate inventore dolor ea eos ipsam. Aliquam aut maiores iure vero corrupti eligendi placeat. Non perspiciatis eligendi quia hic quibusdam fugit id suscipit fugiat. Velit dicta commodi sint quo. Culpa et qui molestiae dolore dolorum tempora dicta dignissimos quis.',
                example: 'l9hic2vxfv77e0wwjgcktz0b2g8ippl275vxw2fg4n9w8quhqynfv5l113ya12cbu8gt054h5hvoj2qpll4w2yryxiacy7kfhxqq08h0a1n1z8cpfocmvf4rj39nxvn5s2ne5efnf3mkcn7o2pt68b6ewtu6rgyo',
                startTimeAt: '2021-05-23 18:58:12',
                direction: 'OUTBOUND',
                errorCategory: 'fpy1lm8qpjesuke6cr2aqnco22lmiu23bpmfgpurgyo1omal8dmcb2lmuq0fqmm71qb4444odgwsn2oojiqntnvn8whkrqgexgoy8dgplc7tkrgehdnr3sn0qdaj7iir3b7agrvgka4wm65gc8vafv8u0vo2ikmu',
                errorCode: 'mcyj112tj4cm6wf7b95debbz6kkj6v3yrc18yjc9b8j5gkjrap',
                errorLabel: 9198356,
                node: 6757518813,
                protocol: 'ntw8stjvcdc5ui71tjx8',
                qualityOfService: '0o8k1p4vot225amfr9lg',
                receiverParty: 'uopgqbilxy67ypwrulvopuigc379asyt1jjty4bv1jbhnh1oi13lxrr9bl7edp8y4si5e5qbscnqb4emdufubvopupv18xv7cil577xs2nv2ykfn49xw1z2eewcbz5jolo610x20b13x41usmdpurnnadgnqi3k4',
                receiverComponent: '7vdcx2vz2myecvwniomkbw5dacue91cqrkv07m3vhjuiy4jh4nkh0qocww12mnxg96sye0qoi0qwgfibxqywqix5wzn6a8me5uqenx9pju5lk0rp6713ekfk2smoi6zflor9rzy97nw66nad8e5pzdh7owhcr7ul',
                receiverInterface: 'qfjk8qa6e8zi3ou3oygmijitdkgh1ghxqc35v13xsz2d8xugjkw1k38cokrhuh5ah8fwshq95meri3hj73gtdav6kzlm60qvl8yo5p0ysa8y9zwlm2c5ot6y0okxv1mtx3f4lde61jaugw1crafjoman2hoz8kss',
                receiverInterfaceNamespace: 'wkpnq22x667ty4a1h1utfphb5028zwl6ojaa5jrzwrzy9yjpoj4fry36wfqxn1pjeotve4bzvcarfj89598ydk4319ml0ysrcjd13449lqcc64tv765mdpwv2c57zhq9udbywt4crzdbeb3h7bv76kd826qcsjt1',
                retries: 8144456930,
                size: 7352983563,
                timesFailed: 9329610369,
                numberMax: 8034059414,
                numberDays: 6254294781,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '64acce6b-143f-4590-bc70-74374cc19974',
                tenantId: '1c847499-d608-4021-8d76-9a4881f1692f',
                tenantCode: '0b0xm7i8dn9minsbqgwb791l7h3a3lkigo3lh3iub2zj7lws74',
                systemId: '6152baf0-6d35-4130-a7e0-4628c76af5c1',
                systemName: 'ty97rlbph8ovtr0j4prk',
                scenario: '3z3z43k4x8lrtvwohubb21icoznltfigb5485k7lsjh6ow45sekogf1hl7h0',
                executionId: 'e94e3277-f2f6-4869-be95-d54118c951ae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 09:10:51',
                executionMonitoringStartAt: '2021-05-23 03:21:26',
                executionMonitoringEndAt: '2021-05-23 10:03:18',
                flowHash: '3u26qqq50eidyp4w8v8ogc7mpwsdexe40fahcn3a',
                flowParty: '5ebseogt3kq1z1nfxbnns67z2pa7hda4js5vy4zp1a1pw3rnbytdtbzcr24jzx2p59ryf3lmvhtzkrfcgjnr64qizklee3b4y79m6iqszy12ef57ndchmlz4p886xhs1wzblr5mqacagnewrfihq00bffqvy7xng',
                flowReceiverParty: 'd8ortyqpy8nxwo8jdfh58woo3cl8j25il78z1yrpifbbdju3pa6p79mo9dcous6rsguu167kuzob7acmk6hezqvlx9ey1baq55jkvc85850poryyhrp2nnmuvl2qepcezkd05xxgldtq7p58d6tjligywjf44aac',
                flowComponent: 'b3fjzy3n60nbro4obbqf8fwnleis8dk7esh714ynj3rrzagyyx59ckfaufvk04xozcv1o9vf4z41a81n0dbmugnxueb5mvke9mx15vvbpo8cswc84lwdl2775syjljcf4gbxqplmlu2uk7pfn16nmxuvgi1c14c2',
                flowReceiverComponent: '0ejgxjid98an0ie7ngxw26adw8bzlknquotr24pyyrjyr8zoqrqa258frcu7y8tvzq2ouxzmcgepxsfcdqh26ty0w6wencdg90m3d6awk2jak2cqgi4kl3476buo6xbcrhxtle5twgttlgjg9nv9humalxksjm8r',
                flowInterfaceName: 'ikydc1em6a4it7hqrhtqlr4s4nmsuwcoyb4gw0eoxuf6lekiq4vfzirjtso15m0c3wpykwrxcikpv4a5cw4p4akc8zake2sg7y96as0v8p3865s6bs2gfxywivsyt6lmkfq6v6nz04gr4ugo115vppaybfs579an',
                flowInterfaceNamespace: 'kt62mvwyumf3tl4bqxuduzqxbx9ty9zp5rl5a4xkwt5pswu8s9xczugy373xf1ehldh8n8yvfpd3spy1i2a78jcpvnvrzl76005rv222odi7xb1i1wicsjv0n75tqrofi0qemsgo3y3ya4qm90uo79b10a5m7eon',
                status: 'CANCELLED',
                refMessageId: '8dsq7a1w3cahhne9jzcw9474xy13iwnw3by945swsqor6041y5m0ivubdle8340nssg4xgamzrupb0s1ykmmowfsmvn4pm61zh51li1s50eg3mvaamxn0ivbglhquduypczap7og8vmjdbh6ok8w3iv7hxznrk5j',
                detail: 'Sit modi fugit et odit velit consequatur et. Nemo magnam sequi sed. Qui alias impedit rerum excepturi quasi aut quod. Natus necessitatibus id harum at itaque a ut repellendus. Perspiciatis voluptatem nobis atque eligendi harum quas. Perferendis dicta aut.',
                example: '550t6gflfrqpkvmj1i4wiba5w3o74nl1jv474o9tllvj0jp35yahivvad3fhm038s3qcglhcche7dp6khv9v5tmo2g7xxz8l0mz224csbrx0qldvwn8b0h99a6tkkz99phyg0747qi8o5c79940sytqs4xhpzr5v',
                startTimeAt: '2021-05-23 05:35:14',
                direction: 'OUTBOUND',
                errorCategory: 'uhy6gw1eqb8mssf4x8z6iw2qyfonmy6wprojm2x1q1eoj4iw5fcin7thpthe4ww63jz6c2vjiqqr0q8168ogzrz1vt97v2g0t9yrlcxnc0py6gedsyn6exmco8zbmicjyw1a3pfj5zktec0qfamj3d1le3zxzhd4',
                errorCode: 'soznkj4ol9oksn7iwm5w017hw1py86rcvfjtldxa2yrkztt5ig',
                errorLabel: 687144,
                node: 95074818459,
                protocol: '87i0s092150x41op75n9',
                qualityOfService: 'vmnze3qqviqe21fg1gjd',
                receiverParty: 'w02ryrsvadi1z7vdrpvvoib3uimyliz74iwhwtb1c629vi99nm5ar51q1gv0vraql4mg36bhc84e4o91m1arkxiaztic2gsxw2l8bgpdj2im8bd1npj7e62z8htl9vu1koogbikc069btladogk021bljacbm2to',
                receiverComponent: '6u1xprqqzbk8smgvoesun4l45e572t208n6970872viocdjfzu6tnfmf9oabtdeh0br3eleyk3zj6ukvwkolfg4qhe542ucrh4wjinx2ejif210ucklr9kzsd2vyyeljurn56ozpjl1q8xttdqsufp5ifrbhqdkl',
                receiverInterface: 'ilfazktu0uq6xqqlxtqbh23dyokqcur6nb6syz9f9mk3tn3f3kejyuyda30zofzgjsksirc9t4znlmeduypxnx9aq4s09ieeth3lbo9di29t6c6bakkd0x2w3tyoidwx26fgyc82fs2iei23l59hw1k6e0hwrgzc',
                receiverInterfaceNamespace: '29j8ijqxeb3mkvdg733ojkw7xybrhnyufwlnq6pd52mktkht0pymfbjd0gcpettc4dpgwyli627u5umpf8aq9as58qnjj1ir222h2fp9x3ienrt4yx7zwu10nybitqytfeei31ajcx4jhh7ybmmjikwq9z8bdozi',
                retries: 8840009552,
                size: 6424211663,
                timesFailed: 1855590733,
                numberMax: 3363290880,
                numberDays: 2979081211,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8811fefa-baa6-47ad-9d13-24c62a3a0ddb',
                tenantId: 'ca09750d-7732-4f13-91bf-7a4856dd66f2',
                tenantCode: 'eakef37no2qx27m1sacenx1v311v1zl2pb5v6kpe6z1gpw1ezk',
                systemId: '3613794e-6b67-4c56-9785-aa7eaf78a470',
                systemName: 'vaweikv2cg7mn3wm2vnf',
                scenario: 'vodswp8xxln8wo1inv5le30eiocjibn8e4x8ahgr8t8hdkm9yal7xnbnovgp',
                executionId: 'db8f8079-eede-4a79-a7da-b05e9b4f27d9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 22:38:44',
                executionMonitoringStartAt: '2021-05-23 16:08:26',
                executionMonitoringEndAt: '2021-05-23 17:47:03',
                flowHash: '2dd8fu0zc3uzyv0wde98w4aurxuyu908rvvtfc5c',
                flowParty: '674ckmfbib0ziayrgff61mxlwxv4sp2wo5etq3k3yqjxou2d5fxwez9817ws1bhwjkhpdbet925ty48xxh9l069ty0qyvkr3sq1soqr1asa0k0di4foqbj0s96pmiottyfaucc4hrch5hkmqo4sn2lhng6xbk399',
                flowReceiverParty: '3zq8ht0tktg6rz4l8q1l389ax85ij5awb8d0l3c152uu60wfd4z2e6mnbuh06dpsmfupe9dlaiyce84n9fz3qyto0ppbwd08r1ez58v6neqqvb76ndgi2ril2zxq9sjggbu6wvwevuh2vsajpvz68yr5jdlddzlu',
                flowComponent: 'h9x2r16c00n2dte3r20gjlmtu8b8j8zie8bjzxm9bwlap4r30chp9b6wdjhgscft9ulli6mdiylgvqgmc5euz1v0qdl3p6sw7bd035ynb9w2u2rhd9s3ufoijxxl7ll4pqqy391atwchlpr2vdnwkqwd42ebjode',
                flowReceiverComponent: 's0nkccutjmct73obx3dxbu6lw8mrotswpu242f2t73dqou8t98qqiu7puzp5oxnaafu2sohoyuo9p886z4yd9tsnawpurkhicrb44etq8b6dv7r7dqndlowli5lt5b2h6f179fgr4omzsnc5tcmuf3dn59yeuhg3',
                flowInterfaceName: '4pzwrzxknsp1u2ax5pqkfvsykhgg22gs01li6lgecz1bmc82h2x5j923uv2pb6p3d0edh27w975dtm7v3ysy9nzfo49642g9tem6ty5ugx2c7zrgfz9roxbcp6rrkv39r2t28vfmzylr90htocwjb6ylqfaucacd',
                flowInterfaceNamespace: 'iypso1wikzaepzy7ck9ammif7rgubmj0bht9yh5ntj6fvkz18j2kcsf6jdj2u85wytlis6knaajtfcyqk1l7os1ja6h621xvtp84swbfi1t3gwcs15y5w77027uk4fuqoqoofe0hwqesp4oc3xqic4yi1er3opw7',
                status: 'TO_BE_DELIVERED',
                refMessageId: 't25d3drjo6sdxocg5gd0i7bhq5y2tkgdt5wx8zjfuca36daw9sm1h00hmx37ueo6zi7jxr4x6qfd3ju43wqpd4o1wbj3a10j4ng6opz8ay0jm2mxj3ehpj75kb2s4xrjr2rj6rdk51wmwlyn0ulc8emzgt54oh0q',
                detail: 'In illum iusto deserunt totam recusandae harum et sunt culpa. Perferendis recusandae illo vitae rerum dolores. Illum provident ad id non molestiae odio. Deserunt sunt maiores eum ut optio magnam sed est iste.',
                example: 'ymaowcbg9xhp9gm8e0112z9f2kugua1jhss0jfzja13rh3i0jmwqil4as6ce4fvxwyqpre92dkrl49yy0hczrj5ssi40n8e7qcrw516sxifost0aykznk8n9lvi31ks4mic5fwh3yjit1u12yr58uamhp7n9m92r',
                startTimeAt: '2021-05-23 06:55:00',
                direction: 'OUTBOUND',
                errorCategory: 'lgueyurthfhofzibjt5riv5266si9hi90rgn3lrodzvvyrnsc52572qz2dlh51e3mrffqo1aa6l5bi1veyy74j3mgwrjkcbih9ftt2s8n37822fqkahx81p9dauhi5wvqtkrkd9dipp3k7n6y4r4by3xvhy443xm',
                errorCode: 'ddxk2u0e19x1bh6l5l39yb1lr7o596vffk5xayhg8296f2mos9',
                errorLabel: 838887,
                node: 3036472792,
                protocol: 'zp7rpd26mf4fvzwffcqhi',
                qualityOfService: 'kjllfpqd3f5aorl63nvo',
                receiverParty: 'l4n9ix62sqhet0t4uaz8rxxqrhjtsrvdkrid98b111q2x8wos4en7xvd7juq9bc0n05zbjyhrm6fxef9lww12jygf7bkf3xhhu2eaamupl858x6h9uqfuqtuxlk0of1pbc8k0ee8ul6k0iyqmsq6egjw1651he1b',
                receiverComponent: '74ns4o8wdru5t264t1e7w3wh9r2e8q4847gf0w1pv57g3s2k00meicgd08l42jqwndblvfphkik4aeifm8u687m7hfm6tw51fdfu4q11tm6aqhskaa309590ig1qx90xwr2w6nrv6qvcx8tgmn1ulkpul5yhrexn',
                receiverInterface: '7o5ye9fvdbhxyunovge1kaj4xmchzxf3l9hdyu9inr3t7l9mcl7ijbh7b45un0vspymtrvw3ioc5v19mbhr4fkgbrcop1d61k9rnwb8gyxpls8mzjltolb1ugewqjpid7o4fj9b9re71c6xoq8wyy4dbhk6qbo0c',
                receiverInterfaceNamespace: 'tf6km5ngmiu5u9uqqmddpengmgl2a3hh9ab3szvj4iw20kc1dfd5bexa59rxl7szaiuep93tcg048nivqvwlz0nen7acf2i42pmzijvy2vx2t904barg6n5vyi9mlcdgz2qjlp5n525oe1mrteudmojxu1tayq54',
                retries: 1990394916,
                size: 8861548161,
                timesFailed: 5794127067,
                numberMax: 6870153842,
                numberDays: 5857353542,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5ecb4ba3-f44e-4bdb-9373-5d4011c28651',
                tenantId: '9a5e1aa1-7147-4600-9067-355f51d5937c',
                tenantCode: 'wxlrx0nexmks327jun4iacji583kvna3lonri8ifmzr6b35pdb',
                systemId: '1e613794-0cb9-4042-9f26-c47a1502775d',
                systemName: 'bg5fjwhc54xjg2cxpz03',
                scenario: 'tnrchpksb43nycigxcfsfyciuc4dm3gythmw42r5966eqv3w1lin19lk7xxm',
                executionId: 'e19619c2-358f-4356-9704-4e6e237c86a5',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 23:21:17',
                executionMonitoringStartAt: '2021-05-23 11:55:19',
                executionMonitoringEndAt: '2021-05-23 05:09:54',
                flowHash: 'wld9wq7zhzro9znuynhvo87vrremtujmz7hagroa',
                flowParty: '43vqyh5t93a4x9xblcwl1y0mhwzragpchbm3bge4n98gcrx12jazgz7frldz015ybtligkpe6mwx71lhvrczn219d83bpmbzvm4idms0cr0pkie1ub3j5wiq1bpmnqt3v9vrkgtspzyutbk2t6br40cp8sqwr7k1',
                flowReceiverParty: '9l8sqhulkqwebakcik9r09x02x5znt1r7l5omczwf721lzx3io2e6h6s4126l84bkqknju3h8pc12rvbu8dsvff1v7y6b6tmo0sfa2yajwkag4n9prqz5omugl2m0saq8lrj84kjqo0maiditwlnpunamucuxz6d',
                flowComponent: '74qcmx6fqa3wzemu4vnvyyv4s9uf2ubg2v2p20qsty49vt527scatkeil75kkarclw1i0pf8p5s5bavr0rlhj1inozh18wph8evshu0eo7lxxz85wfwaeemp2r08a3og8s6dlcg698xisvkd7u75hcvcbslxrtsc',
                flowReceiverComponent: 'ogyeq16ht3ah0iojh5ztmwlxh33xd451x4oar5cbfuepk97ovmdvigi441lysfvapkj2ueyvllevmlak9kgurpfdoai0ew2jnn9u6l44y4kzx12xv6mu3mxi4im3i0sanlfevuhrpmtzx7fj4yc8nw0px8eg15jo',
                flowInterfaceName: 'k7ludz9tsr620dfdjo1oa6hh54cn42nbuvgekry1vr2y5rx4yb9unzq8lhd3lhd9nd78il6dxv2nlz4mhoca0oymaj1dy2mrh7srn35kc5ry5awc9leh3r1pb2gc42il7h0mq8q4fk1xtisgl8k6mni39ykcvo12',
                flowInterfaceNamespace: 'gsx8qathfka5wex0e8atipno1f32gjiwzmkhk1jxj4jwahmt1g0frybb2c00bshfdj5e4dia2ck8w5k417ojxsonvv391x9323ppj89n3bqkcw0qkxz9sucx4w46je5ep5qmzp1061b45bhyfftxcx8yfxlfw9tg',
                status: 'ERROR',
                refMessageId: 'jjixcyhtzi0cbvg2z609435v1hpezuv5scz5qx55twzdvb2njjnegey7jg842ht4gghfw3ku2qbqnggk9dn3nkbb71ztp746r9zfrpv12vm3913xt6iujxluvhjnuztvtik43yraze6nyab6k0h2vg0jgb1xqanm',
                detail: 'Eius laboriosam sed atque occaecati dolore ipsum. Quis vitae blanditiis pariatur nihil. Quibusdam pariatur id et. Reprehenderit quasi sed esse omnis blanditiis sint. Dicta quo rerum explicabo sint amet.',
                example: 'zoesi6vrwur7bth3p7ew7lxmxgi958moi1xrp8w6y6rs677rf7389ni6m57qx14xfb8a04nyxmrbjcw4i5nyqqzsflcluvyaa6v2xxditqvdauv9r6jujp41nkkt7mvqmx2ap19sd8ymhnpqi4ofpnzx5dzjz59f',
                startTimeAt: '2021-05-23 22:40:51',
                direction: 'INBOUND',
                errorCategory: 'oq27t1id71jeb7wk8sygel11pxy6vu71um6ludu0k2puonb1eaoiqa3rikvfwnvly3ztqbszujw0qo8uudpkekdgyrw7jkesbg64eci0etnxmbb2z3ote19eknxyat3rprfri83x20l9ho0elpybwkzi9v7lfbrz',
                errorCode: 'iz430x8v1jzwm6qdn4eizgouf191rhlpdsvicl6f9qlgnyz9gr',
                errorLabel: 446459,
                node: 3362112012,
                protocol: '2xenyvzn70kdfgngi7nr',
                qualityOfService: 'ict5py0t9zgreq4cpcw0p',
                receiverParty: 'b3497h9q9fq4gomw5cywwfm86l10rizzvrmqp5au6r39pi2kh228g1r5g3o4xo6iaxixd9f8tj3ov05nikcxrm3d5n2vpvnuxdyuye9nxhs15rx642t2uinsarebjf3nnv5a707bc3ov1ktbyr33e3hu0uw42xo0',
                receiverComponent: 'hq9o8klfqffn4wfmgxcajtr6jhm543b6xv88du3xj60jo7nct2zj8jipdomxn08r1p6o93urnn8lrq8dvqujs5rmj7hph35zdwb83tbns0icbqd6wrldtxy2u7vcwr55i45765fpuhcvjffveaqg0654gc2rfwf4',
                receiverInterface: '7loica3ghziqeywvuoiiiekpai74e75rtrk82ou2qj513ru1kobkt44bl80tle3is5puxl7siri28qgu6xylg2m29yqrx0a2btv5iulth1bo6e4gerkbg3uyx8581m6pvottk0h5uz5ypchp5dbgbi008if2thoz',
                receiverInterfaceNamespace: 'fy7l3hb9pin1tin75j8emzzef79icw3ts8dvhg4z2bxax6wpxaennhodr62nziraihef5vtcam8h9vuow67rb3qgpo88dxyuxm0u31vb38ko73dsi18aqj9uskk7gbvjtap539wk7gz5taukcolmv6xiz6b1ix82',
                retries: 8534783210,
                size: 3169141761,
                timesFailed: 4041762072,
                numberMax: 1320030862,
                numberDays: 9421405338,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e0cde6c7-0e9f-4b7d-929a-0e4421e44c96',
                tenantId: '5e94fd84-6987-4217-bc34-81f3f6c9484d',
                tenantCode: '03t4sammg810kbkzdnachmiyoip0t7vwoiuxec9teqmuvjmp8v',
                systemId: '12292492-1f12-470a-8cd3-b29dc92e5ed6',
                systemName: 'vyjurxsvhr0akzfs9xlj',
                scenario: 'by1bg9bdpk5vxted24o1oybqbl5o1xh0foom0nuan49c0430cm2w1qtdjto5',
                executionId: '4a3a3ece-8c80-497e-81dc-c55be46d9700',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 20:00:30',
                executionMonitoringStartAt: '2021-05-23 16:24:15',
                executionMonitoringEndAt: '2021-05-23 20:21:16',
                flowHash: '21kxfe58p52u67t67u90ehc1kvgoj86kzp55lpbo',
                flowParty: 'xwa980rssitc44rf7yj2xblrk15ypw5jxnc1364sbukqz26w902kuysgfmmwwob0ceuv4xsj0xcoic46avcwz6ez0xccws6opmbesvkmimwo83qeqenwxiq1ruo97ur0mcx56ev9cklpxujewj71blyjxv7k5fjj',
                flowReceiverParty: 'ipfa13ubks2502p5oiy1v2ovmgbjyzxp07xwnu5er3a6mh166omi91i8v1e9mrt43dcu82uvgld9xe6eyy8px9k9f3kpep7aofdc55ddh85f04vha5rlh2s6gho4yiicxt9q4cim55f6b1z8rdr33ekauxsongil',
                flowComponent: 'wicjhza8slbcjyugzcpbynpeqj26sdg5df0ocbi51x4zk7qajci2i2xpij2nyof49detpqh7rv6v4p8gzk0cvtp81f0nbv18k1zfjczcoejq6u98hqh065v3r15nky5mmer1iehcrfveqnqtwfoxtkuhomfel4su',
                flowReceiverComponent: '315ywbtq825n1qyun4fahlgdh6t5g7atmhgkgxnzp3fwwmj9vpkmdstiqhlebmn2b02ww0oda6z88wv28ch871a0791r5o36jwthp467bg9vedvwj26oqo8bme6eksn2kt15n7vqm5qb7yz7xehw9p2nkse39u5a',
                flowInterfaceName: '896pnqiqa2rfeibni1co7i2yf7igwqpt34x7w3qrcfcomuvmzdr98tqo4ar8qcz0x7ck9j1gq2zqaycus1usjwsv6mae290eu7x2pfictwilwls0mvnvubnlhjh83xp8d7kukrevfrasqtx7eaaxihvkmelm5svb',
                flowInterfaceNamespace: '2i1a3loezvu3rbxjj2popccuwp6pqfx15p2vl7jzsir80z962qpegnobczn374xjq2ruynm1dpsjfzv1969zml739kwmyiam551syjv0rd6usk0d33idf50bmpjy2m5yb1x3n1f8h3xw6ggxb0ntc5p1os869rrb',
                status: 'WAITING',
                refMessageId: 'g20vpg6l4ncpp5bev5a1q4vkv975yqqxbcssi4rnvrtyksjc4sl9wsy8pw0vrcouc55qhken4ppo2gixk8i7zb038o0g1q1fj71nxpu5ih5qmdudvf8ww2i63yhfftg1v6x4h2e5xrdkjaqaobn2aiagun68euap',
                detail: 'Animi sed nesciunt id odit laboriosam possimus cumque. Fugiat aut deserunt ex qui atque rerum voluptate quo officia. Nisi error mollitia distinctio natus debitis et distinctio modi officia. Necessitatibus ab amet. Voluptatibus distinctio commodi quo.',
                example: 'lkttu7456xgpin0mj5o4xb4g0ym4vamjxsyeq6r24ce44jibui86kjtpoki2wv5t6dzs28mr4fj1ec3fq3zv1xw6j0j3lz5c3jfzqhp8pgb8ppn9oc4en07ouohmfso5k7g0sle4xdn89q08w1yee5ov6torwaru',
                startTimeAt: '2021-05-23 08:34:28',
                direction: 'INBOUND',
                errorCategory: 'mnhh7z0wviadhzk31talt85x02p0gi0jxfptuuq6qarv5b3ad72lsv7ws41otkv1etzrt4el3coy512zert1f3mzy6vlzivx2fgfngpyo4dzf4jiku3pu6lu48cuulzu4zkraplokysfeno7ihwpmxgxt2omiafn',
                errorCode: 'o32z49tjnv01fgtw28pkxnei61rna5kcp0gy504vcajgy0fwle',
                errorLabel: 335326,
                node: 6900467467,
                protocol: 'nhhgs44ciffefz7nwokw',
                qualityOfService: '9ei3hppe22oyao7njgdp',
                receiverParty: 'gz95c1wkqotso8d6sr65wdui6kh3swwo8cnw5f58wl7tq5ovroraqp0hkkgw03ypgokjr4i2rnfdr36wjcx607q06znhpp0m85iaaj1gzw7hfverfwwfaktsb0mra38o6q1gvraymurmi97hvshdz8gpxxkrb7hdy',
                receiverComponent: '35bm4lltqkgxrdgk79zk7iiwt165omlzwnkocfbdcp3udbbot5vi0wzme85203weopa7244lzcxi4lrvj7vqmcgncuffnvam1jpbkrnui4gq80v8gl5rbz12prekdn5xqk7l40d2wrzzfjb4fid86jcaxo3s5xwf',
                receiverInterface: 'fevvo8cssx74rfbs9ckguno75zzo4fjv0y6drt2fveiv2ourj9rq230xj9t7voveabu95oedsj0ymvwl4krdc333f1rxz4k41ssc5zar7hmjdaez670n4ewxb2bzlwlxv8tuafe8apx0o093toy5cwkb8nn2x8kf',
                receiverInterfaceNamespace: 'dqvg8vv2r4q5iiycmqx2titbl0r6r93bzfqds0gxxspk2hbydhjrscs9qjzdonr2znrjq6ftxqodike5iayqf8w1tp39yxquotbn8f4gkxs08ikc53wnst3d5fsa6ftxkz2eopfpvk6tww9nd96zlp3bv9xh06ef',
                retries: 8899255098,
                size: 2684285006,
                timesFailed: 4699065190,
                numberMax: 6446622221,
                numberDays: 2563086135,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cc990c75-8ea0-407b-ae3f-6a221f9c6ecb',
                tenantId: '19e29add-93fc-4b19-8246-a93fb41cba67',
                tenantCode: '0i574fgbqnkzdoue5l99qzta7nn5fwmi1h3r9vq62s1th5qpqh',
                systemId: 'c5bf07b6-a342-493e-81c1-df25e9694071',
                systemName: '1tlcwo2fspnjuqxo14en',
                scenario: 'ui0q0voub3a2ty2m80uj7yskm3w7ybqbmpbf2j46rpox17jp0pe5twcm3q47',
                executionId: '2a517418-6477-44a4-a923-7bad1e1a8e0c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 03:07:52',
                executionMonitoringStartAt: '2021-05-23 19:29:33',
                executionMonitoringEndAt: '2021-05-23 11:54:38',
                flowHash: '0kpet7ihevp40uheuexr61xtmiywu1tng4rcor50',
                flowParty: 'zwuxo1xk6m635qin1k9afzej2tbjts746lyw5fd2w6km6rq5t2hogckfny9kcif2w413ciggofxuovstup9sut185l0ikol1ea8fmfha6xgpfjlahgxw6vac5o5u0f24xh6glj0gdg0dlcsok7ykdxepnsiy34qu',
                flowReceiverParty: 't6egf0i23bigf9h5j8kwcie7god8du44a2v5o7srr2dra03mzpxhsgsbutsyblkcj8kerwg6yuhf5bzgunvbzvlo84hbk1w0hykmiqkaod5nuxke7ighni5y0gxsefx082e4955qz2ntcur56oizhqqb9149iczr',
                flowComponent: 'r2xyjanbtkf2xjwak38lbu1ub7hwsg4lde2uvsuyb3dth6wx1s68u302mud1uaitagss3f4ippx027lq3obfdd6lumz42glcqiluffwfr0idrhrazym4j6lrrivdro3uue4k0w0y5e0is48l16k13lzmxwkq5oyp',
                flowReceiverComponent: 's7yldtp4vownhoj91r5ataz6s0hsibpzz5axsw2ef6nwlod4j96t3ugudutjyyqnf1mnj8nfzxz9o5ev7w9ssesolgglq1c1fx23rpgvblnytakgqwftoasj4pcbqw2w5h7u7yxy02kszus184656rjvgh7f82mi',
                flowInterfaceName: 'jc4hf1qi6duqh9fkxzkn3br0pzrymfzk4xb3lqzwtth3w95rlv42vasbylw1i6cqdspjfjq17mghs8mrkmhpw31rtcakhp9rg09nt2cgxy32ja7e2dhj5w6jiagecx8l7xg4ne0z3uqolk2x9qokmrdxnrgiw295',
                flowInterfaceNamespace: '9p2hm1ddtfcvh5zitfuxblyqz0no67zxpsmpn0ksc1449rkt5ouxsdfaxnf0lgg45vf40a6b3u8tnt3bcyk49yma0fox6eil2aleax9wu1i45keq6bxmf7hoz37c566smrciq591wdkx608wkrhx750c24jbfis9',
                status: 'HOLDING',
                refMessageId: '180n2k5q2ab97dx7ifh1xlcbatw81rj03w4ewhfzji5to1daf20ppipjzfiu7it839ypo3axxf0eii4ba4305g7mautv1samddn2fykclq6x6uiacurkg2li65zo01x703edm8gb97gbhorj407n3lnhx1zs5ydi',
                detail: 'Sit quibusdam rerum cumque ab nesciunt voluptate. Consequuntur ratione odio unde placeat sint ut ut. Deserunt aliquam minima quas. Temporibus quas libero perferendis. Quis quas amet ratione enim earum sed quo dicta dolorum. Ducimus impedit omnis nihil praesentium est repellendus.',
                example: 'gqaxuzpiygzvy7ye1wrfzhdjj1p1edrekvsr0km3tgyivvsrqirzif5iqjwuqsq7069p28ecnajmrr59525d7a4b047h7oisdpy0vpqcshy2pwsvo3wunp6waq1loxw32gaa1sbrvuc9qgvhsbo47ckxgo1ycghk',
                startTimeAt: '2021-05-23 12:33:38',
                direction: 'OUTBOUND',
                errorCategory: 'emj48bwu21kt5783f7hn5yq0toqys671o721s7nnl3iercud91bwmy8kf8ija8sqx5rf9vhdikralkknps8q005il4yhhsc81avy5z18iv7wbbhxcpzcvkjpnkyk8wprj5iu6a55a6vhxq1v41ewq1kjyuix1y34',
                errorCode: '3y9exortxuy1fii1a8jnvh225bxdifvqie9zx17wwusnw81ztb',
                errorLabel: 408689,
                node: 4814089356,
                protocol: '0ubvhrxatb04x4986m1s',
                qualityOfService: 'icaid9zld60f73kvqk2u',
                receiverParty: 'u9fmgocer9nz6tclitycq8w3yss89v3wqdbn30bpg5o26nvzl18f26o6s9e9bwjkf5ccfwa1zb15ytsr4py8cunu5p4f6z46nx7am5puclhy170muo5o7445eznbo1vtow6xebdis9ju0mfdyxg3ae1qwhuaof0w',
                receiverComponent: 'amon2lt0vg4bzqlqa2gyyamuuz4ocdlfjmidc34o6fxx71jbbv8lclqwbldprevpw68v2eb7mye0qdat3koexitmtx3hrli74i6coq4ampqgb8rfivs50qeeexzptzh7dqp6z9dmg45hz1ms04kl6qij1qzysampa',
                receiverInterface: 'aefx0r50je6x3uhcee8k9unmcnap35kp1l0uw4aa7r2j6bjbzem29rivkszqv3zevbk0eiqkuqfg427ryca7n4x0d4yu8g1rwrc34132owe8yy6v2gvvpa908jxqy1ubgiccuw6tme8zzeiqzc7x54mkbif4hi44',
                receiverInterfaceNamespace: 'ylybtf83upkp6ep1tbobh4orqw0mmjpuha1s1mol9yi5xmx8anpud9lx0ms01xd8uof61wi2pihuudywsphj6xjo3aljs7cq7jxc9fjd89rydnirmzx0vqsqrhj3jhbqyiqft067iipd05nlf33upp93ltpf4s1q',
                retries: 9819682335,
                size: 8497971819,
                timesFailed: 6771259297,
                numberMax: 5228507914,
                numberDays: 3914069415,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b419a4e1-7972-452f-b8a5-b16f9f470e04',
                tenantId: 'fd2a4eaa-a517-4079-a030-0d6d6962f97b',
                tenantCode: 'deweirxkpl00s1kt4bonkwdr2ud9bgnr19ud10vb29bf87lji7',
                systemId: '2ffdc0e8-5d53-48d9-b5dc-76f265cb34e2',
                systemName: '7s1w6qt2zwet2sw4of0i',
                scenario: 'p4sfw1hd5fmiz5sll78ewxbo112n4zisv9mk1ra5j128dlhz8dnua6p3kc49',
                executionId: 'fc88b330-eae0-4121-9c76-d71329550810',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 11:16:42',
                executionMonitoringStartAt: '2021-05-23 21:17:20',
                executionMonitoringEndAt: '2021-05-23 18:28:00',
                flowHash: 'ha2ax8r8njdz5etf0iyl6kej0hsooqoz36q4nk4p',
                flowParty: 'g01o75f5po60277bt9vkm1mdtkx8iur7l7msdf3b1lknaorbtgr7o92emvd8o96e1xveohrmc92zzs8m3peqyck7rgg6kmrd1c4mbrjs1s72xd7sp888esipdj47jwpcs94c5xxj2dn1ry2ry9e5fgncq71hb33e',
                flowReceiverParty: 'vupatj75wt7qjecn5bn062m6h6pln3f85eqfsqonrt9pp8z6r3ldx9d2ad0ek3bg95umfn54m59pd77fejgf1jgkxrsfab40utw9j83qkp2ndz5xhs8pb5uhlcuwmb3hvhfsrs9z4dxwbqci1ee8ql49144bws8t',
                flowComponent: 'yz9bl3qvj51uqd3z953hma5t1fad2ugz0zskum5cgofuxw9t66q5iml3uafhbk88k6qxzvsbobk9crljaf1g176602md22c82xmcm4i8rpuk0gsy33ijxjd40lp8le1xz7m9maozgo56of6vwqof0benvzy8gr2n',
                flowReceiverComponent: '1mt2n0hnc18ag03rjetyt2bjfd4m30v1o6tmz7pfmn5r9lwl1berkg6y5ernsdngl23i8lgtb5qynwlolo8s4zms00myug4qz7j0givd3v8l2lcckjztxpjnvjcfp0uvudlv3ghjqjri3t4b891auy6hvvht8svc',
                flowInterfaceName: 'qcmaafy9cshyvvnashfs9bs9cc1pa7e9k14r1ny7gh3l9rl4r87swkheom3rexkgmt1az1vjtzm2ukuca5gtcra0r6om9fiour4tdu67hbdj3mgv874su0mivsw32lac07ax7q8ns5cjn5ytjsl126dq3bgwx69q',
                flowInterfaceNamespace: 'h7vaomu7tmy4qf5boe6hcbhyfl91nenou3443bzb9p7hn6ws7kv4bqg1opgp0mvmkxaovzxbc3eva1vmq0sva8dksxhi0x23za7kylgjouchig26j4zqvw59rmp0yuj47a7rkjm213fnc0vne1eg12p5lgkdhsw1',
                status: 'TO_BE_DELIVERED',
                refMessageId: 'h501ax6zxgkvzu64sokscqkw6qo1tl6f25hbhq83w92fvhlmd09uiqlnz8kpheoxyhh04l0sotjkdvz08rb9t8mgc3mdvjg0onl8jusk78rk9v8hm9h6t97n4con8prk54bcb9m5ykzx24taedlawkahtndz13pc',
                detail: 'Eum voluptas voluptate. Consectetur vel dolores nihil nihil fugiat enim tenetur sequi iure. Explicabo vel suscipit consequatur qui in. Repudiandae expedita magnam quia incidunt quo occaecati.',
                example: 'j2voog85tpsokctv9ahqlp1dy6qkwmhwnjkvb6t0dyl95laowjy1c0ith9mu2robr7prmv5rzzuhdz4l09cd8l41m3vqrmc7ds16qvkepxo8swcp3lchtyzy68gb22z1taqe56ntiwn2leu2omup0z9hcwk7usn6',
                startTimeAt: '2021-05-23 17:39:20',
                direction: 'INBOUND',
                errorCategory: 'u992eetnrqwfyi11n4ekvgxvr252qih4q2z943vt7ei23thlmi42t1e03hny4gdm1jhbr1g9yczaisubu1zeohqn5z6p74lg8iigh112uazu3ga438cbo44hc07ji2fe2kwk385dfdo9mkkbgaavud28lhqmri99',
                errorCode: 'xfu7wtafwsckqd3qy1pd7wscez1uv9v4lix67t4pa8iicgan5n',
                errorLabel: 803768,
                node: 2317559141,
                protocol: '73uiuekuzp68t6rcbp6j',
                qualityOfService: '0r5lmgio7qmkdarj2erv',
                receiverParty: 'vmkt24fcg0rld5y2j7fa8lr8n7hi1ocy3mwmoo8isadckx8gijj15swdp5zw8mniacfohn9rd6obpvd5jytrn9fcgnqx6t6zbzu2csiplv5tpw5ul9kgxlkgczy1gmzj2yg1z6dx0eh85gs9x38pa2w2dh1zgsdn',
                receiverComponent: '5ij4o7gek0hvqktht1cyji09z99h2dg5kt1rmc344bbjs50olfwgbyqlvjyaj37ub8w6ggefkbedz52jyi1kmq2xk2y9ssaf009xmq1r730b3kna2poi8j85r6la0xdyhwri0vlxbtv4xohc6k2ldk3xpax8isrd',
                receiverInterface: 'a7v2ws2kit2g73cn384a52wqc5df10xdjh5eacgzd8qnln8wavq7c7gfce6sbyxqplr40xunuugztsxj08mfhtsdhkeedkfr7gvvec43bqezhekmzux0nd224k7qxvx26m3wwklklpoxhz2n5vb39dvnj51gb3c82',
                receiverInterfaceNamespace: 'lgx1qf7x36yhmj90r5wmegmr7s7bcp1nr3x9z8ce0c3fqbs15uiq17pkcsdmru8f0ex7fepkd66ycp7qs6m2ppw9ga2v5nwqv1jn7btfp7g347irrdfvl8y1677ne5kkirr5yq8f2bppb9gxdco0f9flhv106f7l',
                retries: 5367563857,
                size: 7652469400,
                timesFailed: 4118527818,
                numberMax: 9783204674,
                numberDays: 9485636332,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c9c96a2f-5fef-4e49-8d69-5434e533e037',
                tenantId: 'c623bdcb-0840-4fdf-aa44-fb49cdc8776d',
                tenantCode: 'lxybv0w36dc86gmaykth6yrnfhd1qf7kqp5jzuvg1u1ytuocct',
                systemId: '40200633-7a7a-40a9-be87-190f6ccaff83',
                systemName: 'fdpnh0vrtx48d1n2qvxm',
                scenario: 'awki02dcmrgm8ur4hvmb0fp22cry3ukc84cyhgupd6gudc7ts6z9c1bcodek',
                executionId: '86218992-e554-4565-a977-6fc36046eddc',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 07:31:43',
                executionMonitoringStartAt: '2021-05-23 01:33:47',
                executionMonitoringEndAt: '2021-05-23 18:21:47',
                flowHash: 'dlrln64k695ovlt4w0egn3w80lemjpqr9djgi62w',
                flowParty: 'l62pqag1r69gd2i3th0pqcq0drvl2piowztl2jzx4iofhmbr8hr250n8m2tu04cma2bfhm7kgfbvn2fv27e4tcy6u1i48m5825g33jtmgv5r8taar66xz51atoowb1c5z0t5n46227mndljgnj62h9sjc3fxlzpn',
                flowReceiverParty: 'gxnu7cj7anlh5v4q92xqzyyey6snocgvg4ml2r0v6whndi8aah5y5r2dfvkvrhhxbvq7vkl3mcbjig47ku546dcbqhqp47d931yhjl41mqigpev9bw7036738iibkjrdd09jny16hby5y6as4ora1mmcq41dw5fj',
                flowComponent: 'vl21ebxq72v1edn0uyx1weoifpufs5cffiugbh5m5gb0qtofccaob35vmhb4hw9dlkil2z284il3rgjg7aghg5h21ghkenp59lu8s9eovn4cuvwt6mpv7mmrsnqthustc6gfp2sefstt9osrkri6z14nfn8jt9fr',
                flowReceiverComponent: 'skc67f135ynzirhiyu09oyq5uoa51c1v4nv051xhadp7qbzvkuslfkw1put24auhuxi5ot883j48b7q8bof26dxbr7r0eiovu3ft4uim12b23yex0fypxmyf30j0skvwmbcxzad04jmkh2cz2rsbtt3ng4pv4clz',
                flowInterfaceName: 'cng64006g3fwhqwlx3uyvleppxzqz8t3qqa9pk4lresareuiy151syrzs8eec7nr6b7bhocpl2vm30ru05rp0pvsi9ikv34xp72j42m7yqtbeo3vkhyi2eo8sghxh707mvxpd5hqcmho6m1zc504uc5ukghewf5d',
                flowInterfaceNamespace: '693hok99huik4gkg9u7xgev2vmrwgn5xvggh4jwpx5aevsxt36a3aauqej08wm4ck59z5x0dkq1fak3h492g3e1o8dxq9h5mpbrwesuskklo4nkjmx7hi6770o4n96kf3ywts5cln17bqeiyynph5vuojxch2jtf',
                status: 'WAITING',
                refMessageId: 'n32wbti0bh3h8yaxr1radzns8whfdnttcge4ccrppgkxkvh971dk2lp52kx0kdpvkl2mlx3p8e3oboqjrnfminyebkq3vrgfsjch9q4t7csc42ottj4omx19bf00u63swrk0cjneb7do70yyktt73mxor3xdernm',
                detail: 'Laboriosam qui voluptatum. Et mollitia corrupti et laudantium quia esse accusamus natus non. Dolorem molestiae deleniti harum quia vel sequi minima officia esse. Voluptas aut ut.',
                example: 'sr9d0bhevo990dhbk9673mi3n4luejjphvjbt784ivuzvtd0x3f2dnec1mlkar5bkxoe3dr6jugg4pu7zsrf3raakaim11tc72cpovfoi7d6x61qwj3xhbsg1m2amvdvatf1j8vg1sxjzeo7u1e17lucfm0olqsz',
                startTimeAt: '2021-05-23 16:33:17',
                direction: 'INBOUND',
                errorCategory: 'orq1dyeobirizy2md3hi2so1ihkmhbmdtrdjrbywj67sbyk7vcei0fldy7tlv9vnkz1p2yd4km4lhobizr6vmapydmfqej3wzx6ue11fna4tx46f8ygr7gwa5d8c3c9m8ei0rpg3sddicj08a4a9iuu7r4zmarw9',
                errorCode: 'yh09s484xuxhz1541o9c272gwwytfnni54tt9yge6e7anmbyxa',
                errorLabel: 446982,
                node: 8917166952,
                protocol: '34f59n2amrtdudsn4qve',
                qualityOfService: 'cnat4b04jc4ts0sye2ci',
                receiverParty: 'huis5ypgyv5b330b9xb0rgnmp28n1mmv43l7krhrx2sbg41s2it93tg2wmp8emeteiegzoxxla0vdrqp899yaq8bya427ykqhx0lw3rb3bpvnpqihx563ib4ced3wzdlnpelk2pnr5r6ren19ox1alrypmdi5d31',
                receiverComponent: '8n6zzguwdoegst3gfwtje0cwzyymjj87s493osfwmxfgwejzehlow17ovsx1jr4uiruffypsco5nff6205mfz1gflwkgz0b0ww1ycffw2dp4hvhir64b5tuu9y2449o0t3m0c0ucoxoregw8p7con5phaxrvacy0',
                receiverInterface: 'oyjhgp0cbjq5boeuy9mn497qxi4uotfw4tokw4dj0ikh7nidl3yckk9sgatuershljijo98sx2imxy208w5sl8ep09jzokowaq4086vsg452kzeu6fk34aoc0akmx1qodcbmw42gedjothovtqbesxubdyy9145g',
                receiverInterfaceNamespace: '8kob89mphrd2r7kvpb7zp6yfhq6cn50a9nlmi2zheo9g365wkm29qjj2o1mnh5r7c1u9drrc6nj33p5y7kojlhu11sj765318jldimbyk9cndffcpjj6gbolra4yw48bhd9y9hf01z46jkyipg0nguz04obo3xaxl',
                retries: 8529728175,
                size: 7970664201,
                timesFailed: 4403382535,
                numberMax: 4437397600,
                numberDays: 4556865992,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bb3f92ab-b31c-45e9-abb7-e5abe33bc31c',
                tenantId: '17c9d913-08d8-49c2-97b1-454265142c5d',
                tenantCode: 'vo89j8vwnr02i9n9y19ifzflbguv09oi8433rk2q769odj9gdg',
                systemId: '1fa8cbc4-f657-4592-9327-0e4d9f7e9275',
                systemName: 'lydvb7hmrs1yx58vdg00',
                scenario: '6zs8ea8f278hunnaqppnb9y38cbcllwjefoyglozv7zz3pzjuf1gn867r18r',
                executionId: 'abf24615-0c0b-4ad0-922d-46ec33259e73',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 23:31:10',
                executionMonitoringStartAt: '2021-05-23 06:35:03',
                executionMonitoringEndAt: '2021-05-23 08:41:04',
                flowHash: 'mzoe3kl23fmzmlnyod585rxk7gz9o1o554egondp',
                flowParty: 'oxaz7mwbznwogjolglbcn0i8wiolqdgidgd3wgq5n5rw8p40pr5wf1kxnrfb3gd7g2b9amdjrkqva86fcz7p8emf73qqcdu8irggv9auir044ecih1u3vhs9jy48nhroa4rut87u1e3y1iut3s3tepqdbi877aw3',
                flowReceiverParty: '6grsg62d6pwi5q1gouwzar5mppw9uv8yss86qb5htcx1t4efhrxal2db37qmcz3qprzztds6fqvjceg229g3odtdtsshv6xvugp6yzhfrhuwxgghuv4ekw1dpsekagt13layoxzjcpavsnph4wpmtkb77yzycie3',
                flowComponent: 'z3holmw442sc24hso5gr2vhhj7p1wkd4ol87cpit75t3gjf52cdxv9hvotpdccez1n8vql975dgyw8ktehafhahsjbboyg68aieuz46esinywvm3ofzi1m9p549a3orcqrai2e996yyzxdlbxo92n5vi28l08geo',
                flowReceiverComponent: 'o60nvqs6qau8g89tf80ssy2xfb8ioweb2sajwgjnvc9g20rmgmnsihfn8kj4gb3flfv41mhhd820n3lzv52h0s91ntpkx17stwgb8aq51oh6q3dcebbqi6334z0imfed4cp12sfwlai2nc8hcbr44xjwz8i5od3k',
                flowInterfaceName: 'b5q6nh6r0jqvvf42yz9bg15x8144i1d9m5jd0i2juwi62i6cw0wcssfz38er1h6i21er807drdywhb1js0to78kz1q66fzwvnxor5ecogm8vebjjpjm7d8jqfnysimyosp2yk6mehivi559qs81zs96f1gb8dxa6',
                flowInterfaceNamespace: 's1dzvpfwi3ybj8occbxt9fn48v8ehuiyshv4ig2w7xby46thhcyipqh2fpc9xbhngwobzs240fbsuvwxkr7pzsq5rhsdj6kndlu4yxs40rona51wbew9ichnm2ozg7nd8ecm1hs5g1lizaxaod6tv525kkp3djf8',
                status: 'CANCELLED',
                refMessageId: 'y3gs4i14z0scsvwdgrob62cr7hccdz3um47mlzwvfgcr4au177y2a75tdgui2zsn0an1ejupq74ah56vfa02wzou5racwp6njck672wuam7s7qhxxmily3cj5qedgv24ckl4irc42wwj8tb4h3wm4blr5cbhv8mc',
                detail: 'Minus quibusdam sequi officia. Officia et iure porro perspiciatis quam. Repudiandae accusamus qui ea rem explicabo repellendus cum nostrum aut. Nam qui dolorem amet. Ut incidunt porro unde occaecati dolor atque quasi velit et. Est eos iure atque sit ullam porro consequatur.',
                example: 'v3nvsr0xc8i36qj4esijsmlr9676tt78vchowj7z9y13y8rkjhlzpbmsfllcp3132yk9db3sq6nhjbcpeulgc5ctjryr4q7ln1008oykjjf5g69t588x7l8mcof4l25dhyj1wvtxaujmls4q1dmzdfyq09svb02b',
                startTimeAt: '2021-05-23 13:09:31',
                direction: 'OUTBOUND',
                errorCategory: 'mo7wcp7pmtpd1bnmjzrfa2zt2s0jdj3dhwyf824b0f7n9jj0tuodwqfycmj3ehkpo5zka6libl12om2y2be5w9gqpve743h5p1wacm7dq5ff6q5aqestok7ikp3h2fu3tj33ybigsb01xoybtvg8462oleeyd65a',
                errorCode: 'tvt0wd0astvdqj8htwvbfd0tom023e602entzu03prz7ldn5pl',
                errorLabel: 348707,
                node: 8696267356,
                protocol: '08jto0cuphxrjxvhzm4d',
                qualityOfService: '0qd5jn1isbs1c3q5wflb',
                receiverParty: 'kfu9tpiwhsnrfmdd6n26pp87mh1ox4r9tobdewwf4w1qaem60t7s1qng3xvhxk18r30h7q1q5bhgn8n9r9hl10b5yw11gans7tf8r7b37dc6gg551ym1f55ul1fz1msn0c02emu8v51hxoule4swxinzxl6g0jiy',
                receiverComponent: 'dwnbbdced7q3mbyyr6o4qjjq4wk6zhdvavxmia0fd4pmm1ux7q4c35vvecb3yxpuxmml8nlqyb48b8lz4z9qb5al1cr9ges5dqrjfrqrvfymcgtruzxjh8h28qfk5zt083iggwl10rmmsmtqt6grahwoa0lvixns',
                receiverInterface: 'p97lquhshdaz10njowzhnhz4rp1zbjn27mbo2jdd9o9viie47bx6l66v8sy5s50fy5vs8auzz7wueql9o76nxdoi3kvhxh8sxsj8j5wpst81em0xtphilav5qg7ropl48cwo4kydqre31arr925cf4135bugmm1z',
                receiverInterfaceNamespace: 'v9nnacxrvmrowbd7menx2oqtf88w5qygg1ny6b0iohuy29zjkz55rexlfksfwuoy2im2krsixoixubp7zcnfkdd2csn7pee2nlh0dig796wfe5e7uek6qk44hw12olqjbxux7je9kb5yrykuuoxfkwfw6e1xyl1y',
                retries: 29053583134,
                size: 4848953313,
                timesFailed: 7420785589,
                numberMax: 8159290144,
                numberDays: 8108459763,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8d84f988-94c0-428b-9033-1ba86c61debf',
                tenantId: '29f00f10-57da-4aad-a398-86ba649e600d',
                tenantCode: 'gpcurazwe0k76ub6tw515zgp6q7j4tr3tlazpr7z85xbysznkx',
                systemId: 'fec5af70-64b5-4395-b525-98f99d98faff',
                systemName: 'apuld6xp679q9a2vbc1r',
                scenario: 'npbvsk7nnrpj3uiarnkp0ukag6f7xrqmgyowwpz2n9tf4cjvtf11zdfjzujp',
                executionId: 'ac67b909-ae96-4a11-a8f7-70f36cd85e77',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 22:08:14',
                executionMonitoringStartAt: '2021-05-23 03:04:43',
                executionMonitoringEndAt: '2021-05-23 14:48:18',
                flowHash: '4tfemvuyziawz1brqlzoq078q3gixas13i10yshi',
                flowParty: 'x702j0dru4zgk0n804hiup86sxgehuqmqpcr6jvrae84qnx63b5b4lts2tw0vk3ji8jzyo3plalwrc8e8hnr2y0ojh4xsp0no75sxn9xfo09bmpvmt6boztrqb2kr1bbi117gxbma6ati9uop61h3ufodwyhjaif',
                flowReceiverParty: 'mqj5jevojw0hk1xzcwvmzdyz49c2wgp0i2dfzqmhodji5prsz44i03yysri1dwzyrkpar8grh3hi9tcndvdf0nv04bqgq6yz4eitcwba19nwrj0auvujjhrn59qe5mdaxflp04ymltcfyeuda6h17p703kixtfjp',
                flowComponent: '13aok3tztrqv6q9dvtdzw5a8gej6itjltupdb8w57fuod3fmsec3x2c4ppqfgwejp2k1e1uhhru71475uwxmqkry9czqyugix5nyi34703m6tsogxi5zqurmmnu9r01yxaaan09oam769zwvtbs5g97zf07z4sbc',
                flowReceiverComponent: 'jq3l3ib2jgd55z1oiq2dnqiqqqwtkqg2n2sp60uy3nyvyoujs6ufe6tdkytdzayqwpg6nv4qxjzleh7afw0qo4foy8guyysk2mwbuic9rrmfv1npmxmk1yjak2v1h7d92vafb4xejdrq6c9jng3pfuqfqq0he0v6',
                flowInterfaceName: 'soyedz8w1pca5ri6fprbaykwubbemiwonxomlsx0bjsejwdlc66d74pzo2k3l0360g2xiyzbmzozwq3q2anbkqjau35eifhhcc4v1v2b4hbg5jmasmro1okyuul4tvk80m3ymsd0oxd3nosz4tck513jxyq7g42q',
                flowInterfaceNamespace: 'd3sme2wr7gw7tbgekjl8axiktqahaxy0leru7nyjnm5i7sqmd4h890uw1mkrb7s6encnen8th6pn4jh2qjlgmal9m5yj9f8e6j281j9nwdrc5yh7tqkqt28byh40r80ikl2tx5pz5ubp16n8x7imhk58lf792pix',
                status: 'SUCCESS',
                refMessageId: 'pv5ku70qplvwp2ro67pv5suqnxey4jq56rpq3mm25tjncu75evexrmk0vrohpd3i5kxhohbwo1wrri2atllp9a1zags09irgr2hrvzz0p3r5t09yureylto4xnz7yh88e3qq6w83e63vzyveucfo3t69jyk4ithn',
                detail: 'Molestias eius repellat non veniam autem corrupti voluptatem laborum. In amet vel aut aut consequatur fuga molestiae est. Praesentium quasi sunt quo. Nesciunt qui cum officiis molestiae cum ipsam et cumque. Quibusdam earum voluptatum laboriosam omnis dolores amet et. Dolorem enim praesentium.',
                example: 'rfehtz9q21iti7urv0fm1vruypq7py1qripv4wutg0n34ajiyh1gaim00ltoloceyr5kzz8ouyte99yi3hprvgbiiu12aftw4dzc9gw00plomkswtr7lu6ch5y2l4j5u54mxknze8ybnz22wvnyqynxdftyx2gm3',
                startTimeAt: '2021-05-23 18:37:18',
                direction: 'OUTBOUND',
                errorCategory: 'cbqsookz0erfpb6l67hd7r5piwsmes2g526dhyq51b24cu2lgyepoyvqffit4u65z6cevff6gyysc6toqf7wszdh1pdjkwkswp11eyd1oo7ksihgexpdtwq2shtbtqgczr7lhkrjycr1r630hxenq554kf0l38h1',
                errorCode: 'guuk4q6a460558td467ub8qjdxb5afq58bvcgkcmfijoy4grcy',
                errorLabel: 870348,
                node: 2716570213,
                protocol: 'a89j1up4ckcerqhqcnq6',
                qualityOfService: 'wjlld78qavvuq1m0ob5k',
                receiverParty: 'zuvdvxx3soda1o2axmk9edwh6bakw5j3ovjyinfage6kmmzeh552l78s7dr43shs64sv8kml001fi5i7qw8qs2dumpntsp5tlgl59wwosppk5d6i1qcgv6xe5vs7k5ci35y8accj92h01qlnflvmgurpeq6j31el',
                receiverComponent: 'ula1xmcbk6b84orzd8xbbnjv9ffnh7qkf673i083ga946vc905hesiahzj8jc0gmqqknnm6gjrw1d8arr8ofvws3nifj85wt20n32qged71xgoa7gbyroen06ct03h6go84bxyr7d8277qtgzspl9856wj5b6uya',
                receiverInterface: 'mlvxobrn9nere7pjo4k2avx0zrgadk87xj25zl2i3hm72upl885ri43taxrqurf0adkqm19w7saeappunysc26o4gtm0bpjjjyv8qbuwdwy5wnlhf25s261i7ieel396vmnmltajlijk0r75fg58p1m3f9bvpqm3',
                receiverInterfaceNamespace: '95smwm1qu6zp37hv84seprwarv58ncw88fzi3veetwetx1dt1xsc30cpxgcfrzi5e1596ywzggq3gnc10rj5sflfit8nlle3765mqa8ntnnrho7e4ihopifc1ffxl900vcro6v92k0wb9h8bnmvge4im7cjkc7gc',
                retries: 4804675433,
                size: 68442287228,
                timesFailed: 3343635416,
                numberMax: 5061695493,
                numberDays: 5331832242,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8efc0bba-9772-4c55-9f74-1991e4077044',
                tenantId: '17f8dd67-5877-4721-82e9-2cb37a786faa',
                tenantCode: 'zn4n0urydmt9omhyzuye4bzpxexgwl6vi39xqu2t6k5oqc07vo',
                systemId: '64487aa3-a171-4681-924b-59fd907d076d',
                systemName: 'gqejjl3i83k49xihbqx5',
                scenario: 'k5044q7jsbkmny61xwfqw41g2gjh6o5friy4tbu5k6bx99k6xqooh29b4b3f',
                executionId: 'eacc2bef-c71d-4a6d-834d-af16ca15e765',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 16:16:09',
                executionMonitoringStartAt: '2021-05-23 18:54:26',
                executionMonitoringEndAt: '2021-05-23 16:11:23',
                flowHash: 'fq47mxb7ror2dgukundm0xbn82remfwq3yd7cwy1',
                flowParty: 'n5ba39g4gj2e0cuz5lsjx7n956pdz7veq3s9ou9ezbribcbvbmuep4xoawhoqa2munlxnrmosd4tdwfi34xz04oljy09rmpgofqbuemeag6hylzf4n3gqgnca2akb59ritovnibr8k74k8x1uw6aqzi9h70xxtp0',
                flowReceiverParty: 'myw1n0wb9vfhhtmfk8lkxmzmmtrgyg50f9whpvb32hqbulib0zp6c2n0zymaiu65exjen1svf2i3rmhoz53oxc9xpo1klb1r81isxxu11zq4mn33zrf6st1ko6k467tnrcjuvilpf8jwpwbywy0y9anpulzsx6lj',
                flowComponent: 't3evgl1jhqrls1zw1e7ej7v8xl4wu8stlp1k9bljr2fpkd9lvqfpywavwikipo1a1jj21y4h6j0504ps8llfg29jvl79wxskbc2fpqitdwbhr3jyzqf6rxrjsx6u7c6g15bjkb9njqtz0usmevmwct1de74i6i7j',
                flowReceiverComponent: 'zhjz5ssn0yc9dk1p6a7mztnlvoqmnq4jcbr5ome4it674odmfr94yay0g1f5xscgkuun6n3izl8svwm24ep69iwe9jk69z23yh5m5btk8t49q3st6r98o2cjuqml7k3f9fpb4thao4f1b1kfgt65zj4agmzd84wy',
                flowInterfaceName: '0ha34vcebpoiuelidrpdrlbkn7mh6uikc4zmjkwtfzuc2ley038sp6u0wyof7ne8hvphybcqaiohbvt148i1b8h4bebskary4sva6vlt175c7gbwi40fw16p2dx8o9hns5q2l7v7d01aq0xlolhh4292184ze80p',
                flowInterfaceNamespace: 'lu9c3x31t20xb7ij22el2q6tqqyzm5uvvxgkscyjyf7f5qjcc24jw3m3cx8kqor1kjnc9tlyclqjtrzoupk96genhnperzrzkwjbw6p4bk5jmiuhj275u5b1uab9n73a774dg17oqgeyas1aiu98okvqofjc2ngp',
                status: 'ERROR',
                refMessageId: 'ipnh7l3c03w5ej32ftuegaoii8h6fcm0pflu9h88v0528gm6uqx3ti90fy61tmnmijc39ir2upw1w78dklp7nxjejdssvkwqfou9ktv1gqzdggj7f73iqx70h8l9aul9f9svn54xh73feh4v1yh09t6x803tzcgq',
                detail: 'Eius voluptas natus. Est odio ea ut ea voluptatum ex. Occaecati veritatis non tempore provident quidem qui molestiae culpa. Hic nesciunt tenetur enim voluptatum hic. Explicabo voluptatibus ut non corporis nostrum et cupiditate quam.',
                example: '3eekbkhg7355yf51vv3xasl5fnvedog810wzziorhuoydfjfpugujbp9zbnje61x893c06si0id038o4e3juqu9ldujvb1dfoh2t4u16bk2fzqtx3b7lu0t0hmfcwogxsoqwugrqijg1cbe7kz7in5singcgwadx',
                startTimeAt: '2021-05-23 00:46:31',
                direction: 'INBOUND',
                errorCategory: '61dvy8x2aq1zk8qol0wsm6beqb5qzanl3bok0csyx9xdcixb0feqg3y12t5hci6y20vb2wsjhzvikrcn4hnzivkabhtpfhenqafwsnzxjfrlgt8azqzulcd0vd7lmxlmjntebtgvnpnnbcsty1wkygizsym4fsnw',
                errorCode: 'nfrjuww7jb3nt78uh49mvboxkr7d0w7uyl67xzdrzle9rucppb',
                errorLabel: 580166,
                node: 9746670206,
                protocol: 'v81rm0ftybwa076pwxzj',
                qualityOfService: 'jx8ezvs2jn0hkxm8ipts',
                receiverParty: '0p4ucg0sek0pk4vqrsvib5ue3qohlwf6ohpo6u8oujbzvtnk9zvrmfda3mkzs51c3217ux2uzwbsaktt2pppk1are8akzcd7qrcgkjlzprg97t7wn601me4gek8jmaavy5n8r9bbj2udv95yn3kyb2gkskevl9ug',
                receiverComponent: 'x9p74vlbtvb9ko1i8o2u1fjz47umgenuoqkvxqn4avd0nk8beqinxo08hfvq70vcxh2hp307wwdwjcbdzhkego1z2azkyzjyize54dy9qdy23rtwjljwgww2bmad5cbqfdib8ufzkywh21ukfm1z8ivw5du69izw',
                receiverInterface: 'sya20pumjsl1cgysqac78nejt7scxvj44r6aj2um5kn9z32i4rx0wcfpfsg4e98nse2hkmni4k6suggoymrd6hr4ec98uq76vr9xdfayteuf7zrncvfrtlwt6du532bakx82e7ifk0bekzwosipsfr64tlylbtz0',
                receiverInterfaceNamespace: 'cussdsgig2ztuy7oa1uhctz9ur4hx1ay2686n0wsedsqp5m1k47u4gha51lvwj5agjdsvjmvz06ztplp27xfbu9pdrlbg309tpbhj3tvlgdz3d6kmuvc0ly2z7qeb570xpbc8yb4r58sqsyvtbdpn0w4dc09d4xj',
                retries: 1701940954,
                size: 8514618658,
                timesFailed: 41484698792,
                numberMax: 6824304397,
                numberDays: 8632744110,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '104f768e-71a4-495f-85b2-039dcde85180',
                tenantId: '0fd988a7-f0f8-4acd-86a4-3a802124055b',
                tenantCode: 'kremx53klc0eo55gwlxnkzx7qmw7brl7tmf2zlkyghvxs0nqvh',
                systemId: '60a744ac-cfe9-4c4c-9981-2f96176368ab',
                systemName: '9u5ireuigprleyc538ju',
                scenario: '5tu9rybcy5kasu026t6pi3rlp2zkmgjqgou8gbusbbffwx9pljwlwk45w1p0',
                executionId: '41630367-9b3d-40b2-b92b-a7e8bfee9a9b',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:55:09',
                executionMonitoringStartAt: '2021-05-23 18:42:21',
                executionMonitoringEndAt: '2021-05-23 13:08:37',
                flowHash: '9fifbnty80h09oyi4783thud5z1bphbnulxac35v',
                flowParty: 'ywpyge7jj4osov8hmny4hyxkko11mk4x8m927cv6nas1g2jlc2mbstigfo7w2fqcsv78fd9xkjj7evspybo5joblyj2ojcetcat6gqu5l44y0osovxhdzwdw77ri2xsrja19sehjbzgx1hjoz3ao0o630xnydwun',
                flowReceiverParty: 'ip050yvmygzsnovx7817ljdbw3id3663alchdovzr8axktmx13fbclppwy181lbakm6ap86xggeqc7qdfofh3wsa7onvy8devpp2zwit0zm1dpssewtnh1q4bug29n8mr687al320qvtkkzhsucwgj4o1ruhswv7',
                flowComponent: 'ktnpcwib9fmmejnm62uiux9z0mmzqhwczo49hx1rl6xynnhw09jd6d60ehtq6mqx22vtfwotek574ums9o26w558nwqwuabniwp0hldnakyo3s82qvjkg8wdeybie09flcrahao7zmcyc00ub7b565fleocac8ke',
                flowReceiverComponent: 'gtv7b7l3d42gn0cxt58t96sizchx36mp1caouf404vf309yr7wuu51izek2onvwd10ntzanh2fzma1ac4opm5vrpocolg1hnqiyinuer7rd2xi8c7een6ehl4y64utcwgiog6a6ejm8oz6ej807lmuw3a8kggw5y',
                flowInterfaceName: 'ilv20sz1czbhluxkdlxl64vuo244mubi9c0un3jdmajlnts2xm0obw1omjvruq89e22l20x9ws9zupji9z8ugoljuwt4trdlq0r6jv4njr89vjf6ygcsy5jktym8dmxmif8l618rpwrbogxliasulb2u7vi5bmmx',
                flowInterfaceNamespace: '1zoku019xyxjgebvfrkyo0gst0kgu4zi3vr4356rlt3qqg7qkfzvq4e9i9ddwoi5uzewbhwrdz2cyx0awgdppdbgvt530wwfy1ilfuc4pmbk89kdu8xhwvs6eivsvwu6aavgzy5yxuju30jlfsp6mw19qfcyqp4l',
                status: 'ERROR',
                refMessageId: '0rntyaggx11aak8pwp0j93vu7dc1v28ivea85xrlwdp2b7rlo0kpxbx0an3emuuscta1q015gyaae9y2lzfn3slld3gul90d0jwgopbtu2udssus52le5t5qox9w9ow41j0pd3xya7fs412l898d20g2ql0dz9oj',
                detail: 'Et enim eveniet similique dolor quisquam qui tempora est iure. Laboriosam exercitationem voluptatibus temporibus enim nihil qui neque rem autem. Quos debitis mollitia voluptas sequi qui consectetur nihil. Consectetur nesciunt voluptatem deleniti enim. Illum et expedita nam perferendis quia. Aspernatur optio ut eum.',
                example: 'kv00desp464ladwjfnfbarq5dvis3zi2igf5k3a74uq31qd10mo2l03p7hdv4eyhg459pfqoevznkjl5w9hs8hf0l10zgz9kwelgq94auj6dphho6j0dqi8ry1t4iuwrrpgsm2hrjr8i316t655kafo63m6qwgs2',
                startTimeAt: '2021-05-23 22:30:33',
                direction: 'INBOUND',
                errorCategory: 'ksblgtyrlyn06t5j6aucpbj1g7w1drblay2cmevpofev7trueq67ku3povp859p76l3mjbpzagx3u2tecb2d5n0sd6nycz5lhypx0iib1k4sjoier7quzfgdyhpkxcg0sauutmjrcos6g9us6lzwp8x736wp02zl',
                errorCode: 'e43kop4h01dhttqbvhu8541u2b5ajn774xwes89d3tiu4813qz',
                errorLabel: 740247,
                node: 8266530770,
                protocol: 'num84u1wh1jyr74tazbw',
                qualityOfService: 'dsyynlwa838gmzzb8uoc',
                receiverParty: 'ffv2dl8jx78c3gx3jrgtdzeruezn0kfn6da863ysgwvej1e8y04a3i0gfde408nw6odr0feu9svtl9k3p5i05ctr12n0wn0oqeboqdx1fcmo63f332stq8s9335bbj2yoy5wslxxn11cc4to2hrmuq2lgm12u91s',
                receiverComponent: 'ddexv98d0c2ydu298uqoamkcpua4outs6qcfmimwxpg3jrk0xq1szthe2nhuoizs28jwl9bbvktpjzipgk40syga5tm2kdjtyqwyxw974vf8uqfytam7cznne46leezbclmm1l11xq0i1t5mr6u3qde561vupcmn',
                receiverInterface: 'pfk7a4o6wvpzyn2yenk9k9p07jlficr9xp1d0kqeprumuatrflyl7qlmq0bqc5ix3lvfeacpn2iw86fkxluabl60zdh5dvbwxd9r74k6w8oi3evj7c4ga0uiy6bx0se9i57wj1yddhfnqhpqutj2ko6n1sfkcdbg',
                receiverInterfaceNamespace: 'paaw24opb2v2aqu7g9z3hnqiep47rseqkms673di96dpoqccmo71iyimn1anfszf6dxjzzukjh237fqtzu14sk0gnm6v9qpgco9gestucur4gmp18kwomkhngzefymqzqo4f9ibsxzcn1u8p1ilp4o5b074wqij3',
                retries: 2244081881,
                size: 5598339330,
                timesFailed: 4286333574,
                numberMax: 99525121643,
                numberDays: 5195112046,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '55657a9b-2570-4cbb-ab69-b7ac13308117',
                tenantId: '01d4e1f3-fefa-4ea3-a623-c05f4398532a',
                tenantCode: 'y50yci9pm4vglizmt466jjm8nn1gvhxmp4xxi5ysiva6cjghxl',
                systemId: 'f7e73d0d-d48e-4be1-8d43-88f32dd1ae20',
                systemName: '70vsbknji96lnddsd6ms',
                scenario: 'xuqlle2epvue01kcf38lb4rvf86pz4hbmuelwcr1xq31oqdof5ka3podobkh',
                executionId: '4cdec6c5-3f39-4ab8-acc1-0470dee6db5a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 17:43:55',
                executionMonitoringStartAt: '2021-05-23 06:54:53',
                executionMonitoringEndAt: '2021-05-23 06:03:27',
                flowHash: 'ca6lownd31mnla3ibpmzjnuvwafhbxrqyu3svp0c',
                flowParty: 'tojw8mx52uuiluodqgpwsw62ail377by8pxnq456a93i6avm4nwg1wypr6bao4vwv6x69qukxikx4cm30sfqqxstclr4tvtwetzp5o9oxa9ir1u0jdlvwjwoxp2yzbeyqd7qrzu6ala3pbnp1kou28cjm9qppnxt',
                flowReceiverParty: '3q7ukavxerepybqletr0iig6f1hfrmxt06dvk700s63k9yrwtap8t09ql3zszqpov5a33ax3f8qgdssoiawbzmtc34ow69kvknnsogoh0gg8oste8407frtf0uv7xy17graykrn2anxv03kupochptcwsz58o257',
                flowComponent: 'jicu7uyjlxqa0ki3jqw957xyx0ucuo84ams14ffuaw1nwrjjta83xvkhprvoexu2tks4dr8r43rcv4yn3pblzg91uvmwdy2hlify2kofdmualykcf9y2drit11wmph5xsbzjfljc9r0t59p56m2rq6anwirl8cdp',
                flowReceiverComponent: '211d8v96n1fviejj43n35iv7fayk0nc8uvqfbqknxwxbf7fi6qydlcyp2c31d3hou1gvgz46raec5ndjv9yfrx3kp4z4538p1jdhvr0ky3v1lm0r3eb0hphk3mt81ykthzsgqfxbcknlgeyxdcqvvvj655268fqt',
                flowInterfaceName: '2ta2ycgm4s6ne4hiq3lfsl3d236kc4af3qoagqhig9gtaqulkj1652ci9qjxmfrn8uf2sr5w1rno8r8a92xhxrbc96exa0tpx1pxvbyjvqid8lvpnlrcrukl75v4cov1c7b9me9r9kc49nc4ifdm6grwjbbh98u4',
                flowInterfaceNamespace: '5t0xepppy504rxkfsjx6sqky5l3e15qjxf5t4u00quwn5io3pv0qopw1696s0jvjcuesb5gdhag4r1hx9g4phpdwooz7tueyibkmkett3fc1dgl9zce2smwzf1t6zv684moe5f3nzdtggrqxzjfped00mngcp45b',
                status: 'DELIVERING',
                refMessageId: '28w4u4bahztl4k89k5q1nuenog143sxe7kzjib7yn2un1osidc146cy5y0wu2lrvy40fx586yv88tf5hzj2qfgklaq0bg76dmii3l97wtsqluelb08m4q39ushmru58q8oe7io3vjod472wlrwco9u5qp0r72oj5',
                detail: 'Rerum corporis facere unde et fugit dolor harum. Dolores praesentium fugit quasi qui. Ipsam inventore autem ducimus quam et odio vitae officiis. Illo ex repellendus. Nihil sequi doloremque quos quaerat similique voluptatibus. Alias dolorem iure voluptatem.',
                example: '1xhh4u4ncl4qgwf3bnvbwpcksnm1j1cjxsvnzrnz8rnz1gpze8nhvqhqn6nw75iaa1a5rjcr4tmpf2c2uivr9enp5g9cp81akgzvqg4u7y79exwl795rnl5ncnb4fc8fkspgrgybg669yy78j95vg6xayx1ppqpk',
                startTimeAt: '2021-05-23 01:33:55',
                direction: 'OUTBOUND',
                errorCategory: 'm45ufnu5gtwc2v4vn7rwfoko425k5im5oc5wn7s8y3tx8j23jz78jv2t1kq381v2nx5di6t29wm5jsbyirhviwwclimy4mqmb14cwdyq2xy1yw67pop3fqph7k9g91do3rhxg1gqgo0uuyyexdpdnmnqvepjftem',
                errorCode: '9r022wuuzjtr7ey3zhtcwwmw19k4wrsumqgutd72ylygi2j6xm',
                errorLabel: 507677,
                node: 9387255737,
                protocol: 'h29mwfk0vvkxv3g8a87n',
                qualityOfService: 'n49s2gaq77ntcvdrdhwi',
                receiverParty: 'btfekhn7ecl8w0d9atgafb9twfce2chifa42jpydo6bf4vhm0ixrk4lrmmyeo4q6hgvsay6w4dgecflmb9n2l4t3pnnc8c2ne5zlisej5ilcc96pr893p4wdges2u3dyo7v80ifiatvecd9djk2ohfobdedtz4x9',
                receiverComponent: 'pzgkvmgqjn7t9300pfhjgponu2e9cw4rikbwwpkua4v3t8s7glhcgc9qx14eemhy2g83fdqur215uxr9ju1cu86w89cs9hoz88dk51y0kelf4vgsqylf4pn28rgko9cqku2t15uk3nrhbz72na2ex8jcj3a3p22g',
                receiverInterface: 'cqfo3ulu1j95opaf62c54xd86vo7yv32e8gf71drzywdwxvpuiqsli8prlutrhlnah6oyby2k8f3z4a1sl866xjj3yxm6szwsic1mzjpd3dgfwcy937ft1stfv2ic0wnwhvvwpibprvp0rhr5nle89sg1w99llku',
                receiverInterfaceNamespace: 'rja4637lwjd2lvdakfcyvlnjnplfmvt6psbyh5g5ut4haarbbd47cgy716nzrnnvkajv8wykv8wvwf6upjqrn2v92grxbaq75giuen6g5aedouwg48tk4mm23qs71qozmtq03mtoe62xxr08cdymgrm460t1ywdf',
                retries: 4241095280,
                size: 5713755113,
                timesFailed: 9334757678,
                numberMax: 1649730237,
                numberDays: 16898726619,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2384ba01-8711-4ad0-9a06-34dad8877d57',
                tenantId: '5fd2debb-0a77-409b-aaff-f03150abd62b',
                tenantCode: '3vjm6z1l1m91zuurp8cmtp883yqcj8ulltm2ohx4oos5hmu7vk',
                systemId: '574b1849-fd3d-446a-b916-b828002e0469',
                systemName: '4vc9ednpyb5nvh82n8v0',
                scenario: '23kyqp8wvxwf8o55nmmbk7ypqkdcjidrp1n8n79ay32lzn1recoww47noevt',
                executionId: 'b890c3be-6212-4eb4-b6f4-e4bf99693309',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 13:07:07',
                executionMonitoringStartAt: '2021-05-23 04:30:00',
                executionMonitoringEndAt: '2021-05-23 12:45:56',
                flowHash: 'brnm7y0gu6jqe9yhpfyab68e5tvfu5mco24tzt5w',
                flowParty: 'xpxtgq11mp5qxuwsic5xx1638yz57tzs9ovmrrcokl98jzwzpaf2ztf0e4uy4j5foa6wrl6t60lnnwwubv7bbuv98bphihccuyestn3ge8axbz4rohp5ivccna4hb0mowwafk0ih2tdyq3bmg6cn0gdjnjjoc9el',
                flowReceiverParty: '6r6btojojuojbzvk017xnn3c06fns8hgvp8iezynvqyhrrsrogcyp1j9eu0em4v5huf6crzcdvxtov39xsbeojhse3zirxr0409b0svryp9w15ilu6l0lbmq3te3ufdeev55odvec10cy6e3zmw9xmbk7wnlpvfz',
                flowComponent: 'x8z4dcmx70vc79mwqb4l6wnh58lth7ckfl4hluewb2wu142hhozely345qkl7y6r9ocg83zuj6hwkqkhn3s65fkfg5hfob0emb3y4k5wvdves8ke7ldamykko8a8nlyks7v2i9vpa1ltux4g3xy22g92d6q2iz6r',
                flowReceiverComponent: 'vyirol8kqjm59au56vfltftopv1d8e2waxr72jb9oc1y0p5vezyekkhdjhx3nfdkz8d098k2615l0843874trki9h07e1r9tq23paotftkeupn6r724jmi03ba0tjk9uvz78gqsx97qbec1x4lfp40x8bra05gr3',
                flowInterfaceName: '8x2nbiml83ag73lev1nmkxc5chucorckr5rn5pywv970kkfv1l44bttninvm8ddpborfngr0gdi0t2o8xgrauigzvpsnga5a4v3yhxxme39w4dody4udfjet4pqt6jkyf07oa4tk4yvpqs5vs1sia82kjhybb0zw',
                flowInterfaceNamespace: 'v5eok43rlm30qmpcgnvlaxmx3nlzwviz1ivjfnkl4u1vu51kqg3z1axt6r5tiawrp5h4fze4sopur25nwczodx14q52gcq1kq0iir7aktl9i6k10f8e9nh03mu58sdw4o9aq2cyk1gsle2sjln9e4pc8coqppapd',
                status: 'WAITING',
                refMessageId: '808h0srjg7gglnnj5shbig11tynu59hpil4sgit6ed59sz80ch5tcq5a404t5wrjjzfs2l6hwngbob5t44mt5qwqsyptqqfuioeteou3gxbba7856xuh687v7o6vbxzenabi7yagrib8rnmupf43ro20ftwio8g1',
                detail: 'Ipsa dolor placeat quas enim dicta quo ullam. Beatae eveniet aspernatur odit. Voluptatum ea ut fugiat beatae qui quo beatae quae. Quia accusantium et.',
                example: '98k0cb1vdd1fjb482jr1v1ohrlg279gmzdb7kdluledisb4iqb48gkq3wkvxcznxhqx1wl37h8sj44aj5b0zzpzxfnl7b2pcws2sfx0otof1ji4od00i01noiyxq4vys5i2j77ihgatibf6quvdcu017cktevcp7',
                startTimeAt: '2021-05-23 20:08:42',
                direction: 'OUTBOUND',
                errorCategory: 'pundwbbjdvkpdteyp5ud0qyt3qpe4gumzpfqjfisfluj3x0uodwuj9j2dcqg0trfcc3cfxxtfjykr8uhi137zw4wq9j3bafe2djvxnmovjj7e6kugqcbxo5ri1bwugb3sd4cs80w85f4y8netxyw675nnqttpd87',
                errorCode: 'zin4i5v8nfzmr6ozzzihr3seh9jz5791b7b2r32c0oaaioyuv9',
                errorLabel: 470692,
                node: -9,
                protocol: 's4vusek9jhwtdm5epvau',
                qualityOfService: 'jk2a3wyrct2nf8ml8nbl',
                receiverParty: 'lbkuulpryo51njohhxaeb3h5w09ub2k30haj13ket90emcdonbojbzv4ovszh6kxsdiofcgusbniec78ht29ooosjjqnlhf7s0yvvzbzc4mqe4fzjiyzb9tuk30xcfznqzem2abxk3xpb780ubdp6pj1psz7s6qu',
                receiverComponent: 'v8w9wkmm8tpq20mhgtxy77xrhecd9xf4200rzqw2txodyqcwbmbg79beak4zfr2ubj9wlg7p3kcrmh89qesxbznjczsh6p2l6ze5xaiwxdounlfey3kzu9cz0pmf1umqj81n5u24jn12g5poxfzq3eo0t69qaq4t',
                receiverInterface: 'ya1aowlj93u4bkfhfqn5e2hlvwz2th12doa69nzfphm8r9fvgqpklh0jfsd91ah8re5cnu15gqts5fmq1dpywo6nhid9ro0oo1uyqmbrd0xm1ma2jpwm99drb4d2bo40ahupr2ys10e645z4p8bwwinilc2m84kk',
                receiverInterfaceNamespace: 'x8wxf6q78rd133h26noybfez9elh18eyt5govsm69eqozxmyzoo1dsznnu4pjktrfsqtb6q3nqtdlk2xu2ten17fq9c5g5qgkl66kerxjufgi2zcdije7k3fv74rxwtrln960chj25b75grdl4yqkefcje2mtx9g',
                retries: 3782116802,
                size: 6615765397,
                timesFailed: 9193115594,
                numberMax: 6442445554,
                numberDays: 7627824102,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b0e8c2a1-5f59-4bdb-aad7-37214723f254',
                tenantId: '668e45c4-ad09-424c-8856-b85399aa7213',
                tenantCode: 'lq0zp584zas1nf29y651qf2o0lf4xy435k5nvrkyvptuvm8w9b',
                systemId: '41ef0af3-b816-421f-b22e-68db208b7cdd',
                systemName: 'h817wge9cx5f56s6m3cw',
                scenario: 'lap581dhw9vqk9r08vdu4reydbkyia6qsp6u94iduvkb1jzgup0mpsneebvp',
                executionId: '6cb6399f-d4f1-412c-a332-9d6c113dbe08',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 15:54:32',
                executionMonitoringStartAt: '2021-05-23 06:51:05',
                executionMonitoringEndAt: '2021-05-23 00:48:27',
                flowHash: 'x55s7ihu98l19ccs1kw4250o61b16p38yu50chrk',
                flowParty: '0afrdq8dt0cbosr9fhajfcxonnt8sc96s6bax72hmq5bbmpjhd6vhwgnjxcqxp1d25sse6sm0b0c9e73w5p7z69s5pbj3fia5icy292sks8c9enb3xq2331yj4s8hvkp4t5tkylwsm94x0z8vcm63t7uj06eohs4',
                flowReceiverParty: '2rpl0rsp1aw98ziq69b7xdjls2c652o6zf3ljanfq6fog1roerqw69ssd039vfjec3wwcwplutus40uo3m37qbrshwsbbkw6jcghnau41fvvzyp0xyntn82p7d2rct1kg73sl2ymisiy7tapz90u0ornsh41iruf',
                flowComponent: 'kwj9msjzzp2j8j259pq2bsc9zoapdqocbwv6eychnkv8z8jjc52dw3xiu3l6lxczfve79omfxp4xoqtkgpqzgf99v7pdhyoxoakbbpd5d2m930m2bw68se8v7mrh38lze44lcczlijng7ny21rj0zu37yyq1cc0t',
                flowReceiverComponent: 'e9exffu3wiwgrg2egepm37l3v5rupgnbhv716qa4b6hye91kxapqjcphbd3xa4jt5kb8jx793y5geascpb68blo662nonm7b9pq9mboa4fazfbbisu7adibjqj07hwdonp9egeayjbguqaseyhbe9zqzsnm9qhh7',
                flowInterfaceName: '9qku0t178gp0jwqabitmcv71s6xhi7p38paw5no1y1u2eg5b05ihwtthgsm43e8h117vst70avs0sqj9qgogscn4uqjklbxp0j4mq0e37ifklidop21lc7g8e5vy46rtax2vuq25e4ljebb93adc0x7wmtb8d7oz',
                flowInterfaceNamespace: 'rqkog3mt53cpzqc0692sr2z890r2kifkdqa33c8gsddkfyssrmt5927bf7wl9bpxbt04bkfvpzsfvn0j6aeyenksulfedag8nt03czv1cdtjlrrb2xuamfesfovipym2o6rcii7b11t9cxppktdlujo1kwb85x6x',
                status: 'HOLDING',
                refMessageId: '9j3jj6lmfs3btwnfcawdgp90wv96czoltm8il56m9uaauz4h3b5arxcdsp6k2x6bt11w5t5i3ar5lxjxuvq9hnef7u0ja9f8ydxn404ep0gdulsbz8rfcvl49cmtk6d7jtbsx33n0q53cptz1e9ip2quw5fb40cw',
                detail: 'Excepturi enim molestiae quod dolores quis beatae impedit vel. Vero sunt molestiae. Nesciunt eos totam quia soluta architecto.',
                example: 'j3918vcv3mvfjoy04p4wv308cjr4zi17j7t1394189alyb7cj67bkh7fhdabg1e1z5kn9xk0rhw7wv5g4ihzj87kwjwecaf214s1jcpxs0cfyc3jud4d6egsk7ifzf6fmbrrmn9oy5ool519xltycku47rhi17u8',
                startTimeAt: '2021-05-23 23:51:19',
                direction: 'INBOUND',
                errorCategory: 'ps3q5kwk0rlcdsxv539zaflw8oapuvg1gpavbv6zbv9vsy4zkh0o0xpd0v651zsz26mj0bk8eqts3kz319hs5r5kgouamx8emo2omb35nkbn5ugo64ii3kxgo8465zp4cyes3gkc1gzo10lam6svti06l3q3fxw6',
                errorCode: 'ffw7tfimcfzysrheyfb9a4msokb6um9jva2vfraf21tixrsi9u',
                errorLabel: 677589,
                node: 6052774206,
                protocol: 'ml8rpikaymccl0o9c9a8',
                qualityOfService: 'ncv146ja4kaqtihbps2u',
                receiverParty: 'l8n188qlxppsm4jqrlzr5ve1xobfqd3z5td8i1n54cblb980l58p3qpnmpos0dhivqzy14ia9x5unm7tzuy1f3iwh8rrwcttqdrpdohtg9r36dblt7clhi8xge8arv222f4mapw6x1s375qta4e60046ujg7ivzk',
                receiverComponent: 'yyr8s6kjudkgrgz7v1n9gu95vnjip6hnw2400qcid5pgfil0lt933592po96b2b2xm3guvvqazusgh2sqh0541j850wu3xbg1w2evc8s6q2qirmwkgbop7o34tz0a0v07bmwv0qr8knr808conn2kjrb5uw6xt45',
                receiverInterface: 'ic3di59pt6f74khqwcmp8mkq2bvwgcua8c2vlrrcx4htbankot5h29u0icb975crbjhwbt22ftbjz130ls5rt4zey8642rm3sh9c7dj9t540v0gp19vpnslgp7x2uez7a0sdrz163wgshmnsv1hsvs3gow20kjo5',
                receiverInterfaceNamespace: 'igx5pu8pq6xezpngubcvu1bfa86fvk9va5eb1chzcokepfouu80y9jmqmk1ctsnt0mzzfe1e8o2fwfmadqx44vjqlcl2k04rs6gwj2wjlwbhju5e6c7409uls64kpwerdq46kbt9pi7kzn2e5c8ijqz7z77gdpik',
                retries: -9,
                size: 6588264151,
                timesFailed: 6482891783,
                numberMax: 3632082081,
                numberDays: 6489623869,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7125051a-2993-4659-9be4-8a4701b9418f',
                tenantId: 'c57da868-881a-4cf8-a831-5413ea3a8181',
                tenantCode: 'xobrz2bkpb50ebymvph5a2302m6533sy8mmf0fkm3okl58efr3',
                systemId: '5b50b673-59fa-4b97-9376-13c18fb60147',
                systemName: '3mex1cww557sl2ffa3r9',
                scenario: 'joo6pgge42xcc0hw0zebiagrzzm29js544a7tespdo4wgoe5itt7qdgzoxtz',
                executionId: '941d73f4-82dc-4f41-932d-c27a656c0d6f',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 19:41:51',
                executionMonitoringStartAt: '2021-05-23 08:27:27',
                executionMonitoringEndAt: '2021-05-23 00:51:17',
                flowHash: '7f9cy99xuc69l0zrsde91qcs8ufs7nhxw5j8xxu8',
                flowParty: 'oqc6u5fnod4vwd4ftcwcj2l52up6lhg9sxgoy9xfi3b30bi4q86cxerghk391vpi85px1263gokfqvid3ys3m4uym5k28yoisox09v6cu6xy3kaapj0rstioyddhqip5i9vft8i0ygoyriz10wm3da1xic0i6u34',
                flowReceiverParty: 'dibi9uo6d1fpuv9lt3hariawyki2wd6uas0dz01iik1w1fowilrb66n2m3xg3ou4al29ulw8routa247c92ala96nzt1i5l1vuh2w6hp8btkkcljom8b7o7atb0oj4tk3n9ehtr2c86mr8fsp69w7eu44xt70kvn',
                flowComponent: '0qu1ql78t2jzmunkyx1apeoedzlmtw0utz2a4kv1nxxx9mkfr2z6z6vqg0033724h5uw9n94irjbbxrpwzdwo16dzwahif8oo67dk665rid7k0hkz8f2xd8hq1cjefvom7qwp11zn2u4s9iylpvitllqr2rrwcce',
                flowReceiverComponent: 'tniqhv4a9fh5atwppblxj7p4mlcaw5xwrwsj3szo0im35kqqclaw2wr2ytpiiuhjy1kql84va35tyusaxzv8k49mszm860blw9w9swrng24tlvdggd1w4nkpi1ckx19wvmcd4piyqy6uhmislb5b06uyhwcpkihp',
                flowInterfaceName: '2z59cv1ru9xon7v5cerd0c2yrfn2hxrw1wng10756qpikgrvi67ckz0k38fasaiuxox9w8yg6dt18x1n1sj7l7zcd2tog0a72l1jd3iz2rocob0h2c3zjnsockwtsrkjexsvu2xqpok26k75smwpflno61xwwmap',
                flowInterfaceNamespace: 'a1atswqipm1w2uqj3gqsrpk1dayauqnw9dxiq7lmjc8c8je9qpnmwp6gaj5rvkwtsnhtb67wveugitm3bd3eh72qterezldge5ehgnxkmsraydftmmqqa5ylljn86f9zdr3n4dvpc7dclrqcgg3jax4uceh195zp',
                status: 'SUCCESS',
                refMessageId: 'o9zrom2uozpmbpty7a2ukj3enw8oumae0r3v1wgkdxul3fj18unflad0g2az3le5tv9cve6e8woike4a054vpyyhmu5lf1hlpz2drq9m2x6u760o4bxkn4vr2crra2wozzckjx6jurjt2l0j7iv4ptee8h7hcbi6',
                detail: 'Architecto itaque qui quia at numquam officia. Rerum autem qui accusantium. Eum sit eligendi. Omnis saepe eveniet deserunt porro saepe. Commodi aspernatur ut dolor magni est non asperiores quo.',
                example: 'rrae8xwcvnr7uy67t02x39pf541unv1zgy9h9x5bvkqawwfbnh39svlq0r0su6ecrswg2hx6kyuw44g3t8248dtwzruhqwjpx03bxhsavn7tymvsdt5j7qiuqr0k6o8ltqlbc0jeqa9ubmgpoef9oxea2axwruuv',
                startTimeAt: '2021-05-23 01:27:50',
                direction: 'INBOUND',
                errorCategory: '45xjoaxnanay3h0nw5lg3wh88bbcgnyse4hfewwl0y4mpd8ptndzv4cn2vrhtlbgbo2jw99wgseeh8bgsejq3fd1kr9gzx5jywkv5i4bo14ycxq6fkqwfgkh343u00vn24qu43zp0b43yin44chwmvq7r3c9k1i4',
                errorCode: 'tm7vq3vbpp87itu45m4vfx47ngvdagn0zyue7uxzxfanmwi7k0',
                errorLabel: 913370,
                node: 2640557841,
                protocol: 'ndeu8amvt7c9e4jcl7rh',
                qualityOfService: 'cdhkakgy1a8kfp0y1ctu',
                receiverParty: 'jqj77zmkizyqqrp5ovtpghv27zpyqow3tjufmlfw44s3iusc0cyfdmu5l0rjo9o2raz6fbwubulcx62g5zir2w64e21ouodeyo2pz8h999rb5ebzb4d772quy8iu49l8xs8v5rtduqay7g7j4wioo5zt3e2vebim',
                receiverComponent: 'offs0ywxxkajn3idh7a86o9z3yg149etvibpe9b0ytvh8ebh7eiljiswigu6kyvcpydsfctd4w74e6934703t86ywrjfq7lma56ch3xq6v8ecbg03t5iimik4ppagg7nvc0nc28s8wsvrro00zmrcp8j71f3m6mn',
                receiverInterface: 'mz6g0d6x1vhdshp9cbixm4u5y2h6jhxf0cz481niasqip8qat31acixy28yoi65h5wn2wlv121sbmme7pao7soasih5zmpzieu4qqdvbx2fo5iwnujkynyy9ud2a2nfk57kx81uadu84azflirczvabmtifkqeyp',
                receiverInterfaceNamespace: 'vbayr41nqgcclkzxet459j7vuuob3rrbd7eh262wi6umwe451hth6t497d0oeg25r1185zv2ju26d4duf2w0cjtcuqbetr8te5llplis0rz0lfxb2lparp6vynephhdzklxg7otcmswmlkzxe9o6vj005ke57yae',
                retries: 4486019492,
                size: -9,
                timesFailed: 3638381747,
                numberMax: 9072925356,
                numberDays: 1518870787,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '083ea3b4-9502-4f2d-99ae-5e3fbf861c19',
                tenantId: 'b404c992-1ad5-414f-984f-c26cca88c5b8',
                tenantCode: 'w55f63qjgrdbq8zdxzk8g887wm5ftt63k0rqed9lq9rxai69ae',
                systemId: 'a7038401-e6b4-4119-af7c-e1826868921d',
                systemName: '1d5k0oefw63u2vpc2cw2',
                scenario: '9ge25cdox9qa7pa1oeowf9tvzqbzwpn1az1qrzoxtxh9kvcij4vfzt9b0nvp',
                executionId: 'e2e870a2-f262-4877-ac69-55510d2faaf6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 04:07:11',
                executionMonitoringStartAt: '2021-05-23 13:59:42',
                executionMonitoringEndAt: '2021-05-23 14:04:03',
                flowHash: 'id0bqh0iazlr8fli9o4333f53b3k0qj01azul1s3',
                flowParty: 'l50nmjnsx0ho9b86f6lmza58sp28nmbrz0hys7rd2fgi1iiitc2fpbz8bv1u9gwtge09eabjeg3jeag0mpzsibrxtm6bkcv9zalvkk3k505eg0scdcclwvu8lurcvn2aj2xr6ewpvql8je4i901ia1takvxbo5pa',
                flowReceiverParty: '77cr0z77vsn55ezzu873vb2qergxjoperjpbddr36swqnxgdes8vkz186yhdhpfj0j4foh2v95sjsgilu1qvr18l57mqsvx8jjos4dqu14vj7rvll16s8208py6js8hc79m4fggccj5m07akruvt8nqgdt3k7cqs',
                flowComponent: '470f2hy1ibp78c3a21mfhxs40fpos11ccflfvf6xgqwfbft9s12p86tjiewif4mfecnmzyuh0irlislug15vepvf9skqpbo2xratkmkusqgad5t6549gd8xjk8n2tgual3bitxp97l92oda8viidlbj9qsrfdg1h',
                flowReceiverComponent: 'uwwvodu951mm2kewp07yxih8mz34vagmrh78e3tb0311htuvuuk4qhhe7c02blccgb0dtns5iils7fhci5jzjhk2v8c8j2tn11a094f213org940xkmxknd5ewz2h2jnum64y3sr3m34dfm8kmci48xys4eouyi8',
                flowInterfaceName: '7gufr0e0cjvy8c77ok15kk95lu3nm5y8c092o58z6q82vgn5mw5v5vgkn0j0dw4l7jlcm0wmwb9c9b4544vmpmsutzxpybn2iggpb9y87nlj7nm2uove4z8q5oqpi72bsfkv1nl039xugclaj08jo4sybul71t6g',
                flowInterfaceNamespace: '992j109zh98pcd2xe82y50v729e15fm4ifulkth6wn5nxpxbzzrmhmimnmujdib9d60p5emjj85j16dmiix8jm4g8vckszee0p2pux1khwoosg9ve619ba0za6c56qe77jrsx96xt1kelrneiiszbyqylimlwpn3',
                status: 'HOLDING',
                refMessageId: 'fd25hg4jx013ziojamigwmo8bc6b5u2w3wb2dukexcu768acas2jy5yd0wxvpausc7o4cg32gdpgny8bsvl52cnxnfgdu4hhjumq61373a50yvwjivgbvgrd64yv08422k14x9phf1l86jjqr5h41jgzxpl37u05',
                detail: 'At doloremque sit et nisi et. Est voluptatem libero id dolores. Eveniet facilis dolorem esse voluptate. Quasi minima ut quia eum eligendi corrupti. A labore qui aliquam voluptatum id dolores excepturi. Laudantium voluptatem aut enim culpa quia.',
                example: 'o73fcba773guqsyshpzswlfrcih6vjay3ie1h2qel2qcij4j9ctrf0q1qn09pzio0p28fctp05vwnle5075opvy25bpqsyltfpip06mcoyoe8luazaec2mu7ruggzao3nuprvowa5y6t8w70by6x8shi4lqo53sn',
                startTimeAt: '2021-05-23 21:49:58',
                direction: 'INBOUND',
                errorCategory: '0wwdaawpnqyurf79vxctikzwdf402whavye1i8pat32hrj7p3u216iom26h4801sxvj0ga8a5bx32zwe5g3te8ki0c2s02m115tfnklvzwvwzu3ru0zgc7ptcmjavb9tjy845saps5ztzr63s1ige8v0x03qri2i',
                errorCode: 'aybt3e7u5wqxm6vuhjlc5i9taie2k9r2aa3jronafkhoujwega',
                errorLabel: 385296,
                node: 2706161278,
                protocol: 'qcmiwn7184q2xrh65sce',
                qualityOfService: 'c384vs3t0so7nltfg28j',
                receiverParty: '3lhj4vvz0duc20h25l2w4g48lh1a45349hfspvq31i6n0lv8kpc1cjazhktv8tnaagku4miapnwa0no6w7ehd2sw0ykopjw174t8unb6jgkk6yjphn6e8adfz28i1lz48lk96jjyn7qw4s8dqta72w0h7iys92s6',
                receiverComponent: 'a0zir54f981c6mp2upnr8fisgsffunorgbdf63ov81ybonlefxwy95exo8yprv7vzakd2tslmlwi7a5denrm8fc3x15invb3gg6y1lknymoc88a7vf4gmgcojy67phj0p35whv6ivpm4eni84q2w2wu1vjj8gd7x',
                receiverInterface: '4lsls0gdxs2v8raae3y7nelz6ve38j5d1z9id8dng9c0549wegvmxk6yq14qhb30ov60dhytjs9kxbz6podke9484gg8eu3sgckhhfwa7xpivakn7iykjutqsa0q1kh9sm9abtov3x5dteikucern6kw9huam699',
                receiverInterfaceNamespace: 'el2zak3o5ip0jt25ls19e7nip45det9ntgthx458awhbw38brpbssohj4ouy3h7nppqebc2r50ekpf8ui38k3naeve5g9muu6q01n3xhxhccpimcdzenpjcxt1flqkyp6nul05z22q6xrs26zg4gw5hwpxbqmhlj',
                retries: 3088500284,
                size: 7190131498,
                timesFailed: -9,
                numberMax: 2338837158,
                numberDays: 2411903820,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b44f7701-db80-438d-8f4b-a8616b4510be',
                tenantId: 'd6aae299-240d-49db-b6ae-d58946010fa4',
                tenantCode: '4wj1v3wu36lg7pq98wa0s1mb1c88aitf07ash9og6mjnrd7hrh',
                systemId: '18ab71d0-509b-4ddc-acb8-64a1c99b273d',
                systemName: 'lcas59creahw1b50kcfl',
                scenario: 'ko7pwbytlsnelwnzj06zrv3j0cj0ce1nkox7coz1z3my0i1h5ltxdhrze1r4',
                executionId: '9feae53d-8498-41f7-a721-9b7eecd96c5d',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 18:20:36',
                executionMonitoringStartAt: '2021-05-23 13:19:21',
                executionMonitoringEndAt: '2021-05-23 18:19:21',
                flowHash: 'qn7765k1uvmr0hnbsdi8vv0xj7pg9oulnxiydo2s',
                flowParty: 'cx811wq1fd2wjof3k9rsgtjouxkcjcidosa6yp9eqlnesstcnceqixl73uadn03gc7bm6bd1nx2wwvaax4arcwy6351bcnh3s1a8ib7t90xscwv3v7n3df57cuv3n212hublo0pu2xz6qa8vd8bi5pjwmwv5qyf3',
                flowReceiverParty: '1f15s07ls44xqif4p6unfrzstne6wub0kxq9yl0a9xbu849jseairofhlv5sactytcpmz29hubrqd4rrcdacpscu3spavzlomswbv6rukfs55p0fiwu2fc4weeb6maoxcedqprcjvq0xznjw6upat9ag8ozh0opk',
                flowComponent: 'iz637v10nx1fi5mgxw0zsy56fsmpmueb346n5e4f7lh6uwyqgkho1wv0zadv7ygvpm7r903injm66bpf79i2z7fsj4cknryb96a5689kdn5qb6dksqs0jsrldtby7yhmjrrk2fd3qcsce41xs1xrsbeo4s1ss65w',
                flowReceiverComponent: 't5jnosdhmhhjj461civw6e64e1yrgmytw2fbq7gayhwhe0cl31cvtyuxxq68pua2i3ll2fc6xwwxwbs133ntcj9fv20t4o000syeidwtnwdmpcmb9jkda7jslt493g12kgzt7yk4769fqt62j4fy73wl23ksh3nb',
                flowInterfaceName: '36idsnafgfmag0ui9x5mhl33at5jwhjsce58i1brtucykx8r1i3lecce6fwn4k2td4wazsxni3le5ovd6hj9amfiyt55wajtmyce9l41blq360ik2w60q9kkhucpcilj7nb1gtsazus68i6gs2heb32hthhtcbkq',
                flowInterfaceNamespace: 'vuoiliigvs0qr9bpcc9iow8rg311x8d8eo0231nrqvzx5uj5b6hkp4tmt7uxbo8xydacfl2lkhio9ophdzf44g1d2ihlijov2i06pajnkol8antby48ohsju9x9qa333vniwp6nu3bj0t59z48a2tp8w6v091jtm',
                status: 'DELIVERING',
                refMessageId: 'p74f2kcf5ym26tr6qb05b41htgq2ehuuihuj3jrwb67t383vv9myrgrwp8h92rep30kbcp20ipmlzw5l4ei6lf5csyrf9int7hf7ctad7ip17jva6dj0qt1tqifnveah8h4j5i1gscdkwx3zr7k0hmmb72circep',
                detail: 'Maxime quo aut necessitatibus enim est. Consequatur in reprehenderit quos reiciendis ipsam. Eum ut reiciendis nemo explicabo qui aut quis. Distinctio alias reiciendis ut inventore quam voluptates omnis tempora. Et ut sapiente et amet rerum unde. Reiciendis occaecati possimus magni.',
                example: 'rvpuw3amtxy26ibzlwey8re4z366adyxd3ukkpk78zgw1scavq5g5kzm8vrjqb4v3zb942yxaqcidw5s6dhsj9wueytml8jmof7enf3pgmxiy05v6c8gn66ncfm1u70plgsbc0w2n82xq9kunpkp5xkr91kuj6db',
                startTimeAt: '2021-05-23 08:49:38',
                direction: 'OUTBOUND',
                errorCategory: 'we7h93tex6o4std1lrzfixfxqma7k3au2m47w6v8hcobs5u3elnrwlqcp3u1fh72i35y5hanw77wpaoebynesbkn7fx92ob69ny08jig7380c8nfqwqee0dp98cozh6iod0gn5x1dcpg75x8l963oisczbmxh537',
                errorCode: 'hpbtkphqaheqyp5f640fa1stolmfmrzrwfdkjrz0x78on1ygiw',
                errorLabel: 395634,
                node: 1195396257,
                protocol: 'r5shvu1ncsqklo0ar4pc',
                qualityOfService: '8zlrwf04a97mryeab43q',
                receiverParty: 'g6lvcgsqvmsizcecq7q5zyhixhyd6gcu9wf9gnf7o9gp84aeu7p4veoiih2hrvrz6ozk2tnaycxg2j7nqi0mojrbqs0daqhnlgje523k897jfzwl2q3s84uyjqz8ga2eug9uxhl7y07p1ldp67emmt1uwhbu6yt6',
                receiverComponent: 'a3gvx45om679x5ahycw7k1zrrdviko9ujriv8y5dtb1nh5ca6cj8hkcdjog4ab1wxkp3nxg6n5j1c99xgzy079kx2zvg4wfalibwns6tn5yt762tt3x5hbej8tnx51rb4q9n1kx6eyvsottdhkego45rj2hc3tp5',
                receiverInterface: 'cvpym1uocli0g040jsheaqaast6s8oeo1559vile4oa2kjjag9fsh8ammlq8eix2xiznvei2xbmm7jppgpl7mnr4wveog25x26ej8ce8iefzpvcqwr9inm1rrjn2wc6q4dcp54248fumnoxiva0wd7i4gyhdsk70',
                receiverInterfaceNamespace: 'j8eni7pdi2w7s4oujfvkww6vcub132x807tazmof03cwkiz98r90v2ylux5ct9im711xg6rg8sjy3upuvjdw4i2ya4p13hi95bi7549pf1yi4o1kkwbg9ydb71j5ca6mr6rgrcjgfdq4y18j63z7aws628ggoaz5',
                retries: 1038742164,
                size: 3142645356,
                timesFailed: 4323686539,
                numberMax: -9,
                numberDays: 2677277891,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6e978eac-b918-470f-b0f3-c6aa1418669f',
                tenantId: '2358a017-4289-4d4c-bfdb-29d619de58d7',
                tenantCode: 'rbof5ml72665eax9hmsvp7cgk71ys82tm1bepf5l9av750fv1g',
                systemId: 'fd312f17-3d2c-45ed-a62e-a1c074f421ca',
                systemName: 'xcmrn5djjom0agfykqne',
                scenario: '11eyteb4jcft5xvp30ljjziw5xkpu8y75jtmk2itp0zmre6t9ypk6805pm9x',
                executionId: '2ecf0677-63e5-4d4f-9391-daadc5bb8195',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 14:48:42',
                executionMonitoringStartAt: '2021-05-23 05:10:53',
                executionMonitoringEndAt: '2021-05-23 23:34:30',
                flowHash: '6q75pn54zzy7u9wivuhy780ade99x9g31da5i71l',
                flowParty: '3930vnkv9npfx12lpe5eg6xg4g4w58eebqdnymaz9dnp0bxrjni2tsmul6q4igxh1uut1rwoqe4i08dd6k68bwqqhfz74yrnm3djaplu2nrnq3reoqvavb4n6okckm2qq3apkgg009q5mbd3t6wix2tfjgk4m0qq',
                flowReceiverParty: 'y9nwm56d2v48a1nmndgjkcmhyeza3yhhqjsydvwiu4ehp4l28i4fn1xlnffvtz2ech4oambwkafs004pdygmvw6gfjd3dxok8ng52ib34nl1icz933bgfxvij2mu2bz058ix6cyqy4gggxetniyoys6qoo55misq',
                flowComponent: 'z02dx9fe3a2ritksyu9ld02ezfd9vpdq7cff45ntin9vtyen8tnn4swv59i9bt0azke1icnest9aco6wyih3p7y77kdfywgjmtt5ftq9xyqfz1sqa9m9sp2rlcdwg6he6i1s8tzkylxun0b90phz4ycmy30zkf52',
                flowReceiverComponent: 'wjndz94uaa2nokbtwie7qdkhr7x621a8v3671gu70cr1iq7rrb1225b2uzlhwpan8g6w3ad2huqvo5kl2z2in5qyirnrrbzh8s1eq38j3jsop55q3moz9vqdq7qz0lqnj0s4bkos07dhymbfv9kb0o4242vl6v4q',
                flowInterfaceName: 'sim247un4w8ewl7ddfbzpu9dr0ptkrpbhvmlmz3j956b8crsbn87mrsem7quw6kh1yt5fl4du0qt9twqt16ul450l9xv317xsv12u11mnzfg22xhwlqso0q4j4mnzibqby23xfd262thh3gskhg2sodw67mayo5j',
                flowInterfaceNamespace: 'abor74nqf54wzs79nr7ez6oh66jw8rfgdz1lgaxuhwl33fvsp39a96zjtqg8qzy9jv6ad0fw4sgao3utv9ks2fqeapu84xbgkpyg43bxc6jjch3xzzjgvwibcg1av9z6yp967elw98d0a210qo9cict0xhnndhlg',
                status: 'ERROR',
                refMessageId: 'uhqntpm9uzcq1cmz1ikfd24ozoxzu8ao153cfdfkg9zobdkn3nqyvkiih8u5lunrik2xk8zdizagya0r73taavk9f24tu4oizwc1fl2ocrca6je4pfhs55lyj2g9crxqbsg739900albe3jkbt2q1cj972s8rjwu',
                detail: 'Expedita ut quo ea blanditiis quisquam fugit voluptatem provident est. In magni in vero est sequi amet pariatur. Modi perspiciatis iusto illum qui illo voluptatem quia impedit. Accusantium ipsum repudiandae quis qui cumque adipisci alias quis. Qui veniam quia eos.',
                example: '022romqvzzc6zhbl21lyfa4g8fb2d4n8w4f6ro20hyqehjuftle0nx1r8v1akv247kytlsl0f3hvn5iu3wb87e7kigq9s9pa13rprwm98ejq5wph52wd4whs5fc4as7ay0baqyb5bfmczi6izbppm9y4z0mxgs4z',
                startTimeAt: '2021-05-23 15:26:28',
                direction: 'INBOUND',
                errorCategory: 'k5dqcn36ins6myrkoyf092uegf8zc11puxx6diqd614ij63sa3qlj4f21rzowzm3jxvpdigow1ciplnqnrkooenhd9xj8dj6e2uf38m55o713gb3u0g2xdzvwkvi9jys87m0goyl1qnzcp3vd1rbgptp9piw79ui',
                errorCode: '8jlxe97v64zwafc674s28smz56x0a6lj0nepn1qlxi9e306cbs',
                errorLabel: 312008,
                node: 4538125181,
                protocol: 'racf41g45tj0jshmb9xn',
                qualityOfService: 'ieb4499ib9id3t53f32n',
                receiverParty: 'guqbsjyysj07fxw3svi2vgvbr1ojqet8vtf1ufiv47vc8ro5qo67ca7kwnxzxn5bzbxtqvkwbm4lb3uhubad8069tae68bb1t8pp4tnt7x4nvlhc56mxlnilo2lncymewx8e66xb15vty2go9qoiizk1yviabx9p',
                receiverComponent: 'h53zfou8wwpc4yp7v150s7igvyb71a0xwmcaix0wgcmbkvz2lho442l8kquy1s19dnnqa9kl9iianwbdifh29l0jlkhf1tnys9ro1dvpldb98a9o4mv6m23k72lt06oaof1avzyiastifhtef21lhohv4lhf0c33',
                receiverInterface: 'vxz4sn1eli7hvll6czoeziugvp1j34ot5e907ixsfd5uzmtodaajovmda70jcmux1s0ybtulyjftytzc4ed6mmr0ywr8rjkl7gfidqidczimgsbsh4p824qjhbopqeu4h3bwd82w7vl95y8xndtnnpql8blvhm7p',
                receiverInterfaceNamespace: '9o2wb41z7s6qapf77j44l8g1iirj3mtyqb5zw94mc3y96a65udcjr6b36dx4raf3jo96rnus7p8ojbje5yrtwtwalrlk40k8jzg234wpoqyk05c4lgzmyf8gmqz0c6nu86e12lo573nu8chomworuo2l6wh4rj5h',
                retries: 8645981735,
                size: 6443898483,
                timesFailed: 7657093639,
                numberMax: 9738457660,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd538f57d-5d10-40af-8cfe-5d1f321f2105',
                tenantId: '63fc39a8-1025-4338-8311-be773178f68c',
                tenantCode: 'qsulv375d33h9w90cdguqcv8wk9rtqrenlq2mujrqktvw81xxf',
                systemId: '3cac86ea-a591-4f5a-8a40-31bfdb0e5d42',
                systemName: 'nau7bte52i9nlzyxa60p',
                scenario: 'gjy4dit7b1gl7i5w1bga5jpj7rjp63wp6ajrr9t1hyzc3y0dx1msk6htbrrh',
                executionId: 'f069c5e3-06c4-4f5a-afc3-98985bfdbaf9',
                executionType: 'XXXX',
                executionExecutedAt: '2021-05-23 06:21:00',
                executionMonitoringStartAt: '2021-05-23 14:10:07',
                executionMonitoringEndAt: '2021-05-23 20:59:26',
                flowHash: 'ke6dl07ig5dy9b28j4vwg4e7vvn8vbp946y4rwdt',
                flowParty: 'chq7ekboxwqmac32xleruy91ufgk6yblkn74z5nqzzwvsw4d99cqqgj4rq1r76nf1omjo7zb1n3q8rornj02cf9tifd1kw2vqx5lhhmk9torsno58fq3g59fbyjivpmk1rovjowcbaj137hsz0vhjo9rq1bbpjdk',
                flowReceiverParty: 'dy64gb0rqpkqfnutz8ngfmwnz547oildmmfchwy6ougd5j5wi4qlnhhj8y1nnxixy7zwb98yz6ht2voxv35u4hmnl7qhxzxjgdm02izp77qdjshxpd21qmvwi9cymdt38qzy8rplxyead671q4zm1aygurgpaop9',
                flowComponent: 't93odcscdhenzbh9t4qczmbrq0goh4djkfze1ohshpfeaauh4wfay04hlthieei61alpsn9nvgurifha34h3k442cvlg8f1m33km7i6ptu956vrr51oonvnyykw0flq7oi1he8tco7lif2vtvbzcrmdilkgtfasn',
                flowReceiverComponent: 'g41o69elv95afwicmko8g6gw7v5mbsy5j6yn44w32zcdpznnrkliqhn70uln4xi2qvr51qdg08ylxjate4hf33ko0ijd5qoc3zvd9u91n1gduhjyrud6teqfmj4zfo01qysbaqwde4i8x30m2dyu202yhqs3krea',
                flowInterfaceName: 'toy1j09ueai1crux3kfoz9pav9bqp5tp1pecv5t43vgbe9i8b0owp8ywpua80te1wiqgeoo8qi2xihxtcrtk0rrvd5hl2rb2188lnpx66j14dp5ky7d4jt0ss3pvf0ocipepyu8wijrbrjtb3sh5w8ffa0h3jwnt',
                flowInterfaceNamespace: 'qzvzlqv8ldgffq57oviqbsn6h3grddoje4uijje6mtrb0y2qf9j3kqsymm3slwr9qb0s65cfxaw1lylh95bkktcqet60ygwefyays7dwe78ss3c0u9tur1oxp4vov8iyj356p3t4szhks9sqp04zj37r46bcw58h',
                status: 'HOLDING',
                refMessageId: '4kxie29tid0mswan6117d9w7atltkm2ifz717klnvncy12rgs6o13fcqak90qyrzbaj48v5eavp1c4z4g6apfytu98z8nwfxryr7kw4ozojqd634igke2wxy821sys8btez2cfnc7u9g502dvoszm0xv2usrxhtn',
                detail: 'Dolorem consequatur veritatis perspiciatis eius amet et. Et deserunt error cumque. Sint fuga est sit harum aliquid. Iusto quisquam cumque consequatur magnam ducimus amet dignissimos nobis.',
                example: '9jydlwfsvjg83gaf79c8wh7yrjquv8mblff8kswztje5bev4qh8kili9l5s62phf53h7ergui51lga9m89n1aidq2hr3f5j3e3eumol2qzs8xjyhimg0dxsds5yq1amiha38i0d0wiayahr88rwltghigesqgykr',
                startTimeAt: '2021-05-23 16:29:52',
                direction: 'OUTBOUND',
                errorCategory: '9vqzogw4z9d865bd16tgandidpzbylpp5pns8fk6z9y09fwui5na1qvhlxvknxfoi9qbxzbgn46wxq5kgjk7e2a2kadkaowxvrmfni9ckvrjrmcr0c8x18lz090v8vvav3f9i27mggye0beodl0fyrbd5csx0lgl',
                errorCode: '1kbyp1vb4tl0pk909phl90yvqmyvd09c8jgal3a96mqlv5e4pu',
                errorLabel: 407230,
                node: 2010217630,
                protocol: 'xxbhz0csu871vivtgtn2',
                qualityOfService: 'dcmj088yigjljccdu3l4',
                receiverParty: '5xbzts9r8ddipkxinrrgjwc73vjjro1bz8e5sc601tnlzi17fdsmy2fy1u3hmvp5m0x6kt9td6x5fkg94zdfqcnnrbsfagz8s76ngbi2thv6uf7hz0ztbv64k3lmo0m2keceynslihpjqqaebwmt097p2zzn9src',
                receiverComponent: '2pp1l9ftow0re4v74jofgb9ahzmkxi3gjc9wnht40brwvoinzylvw0bxcqwrp2152p1r2r4lftgfd453ohgphm8kck16k3sq6uqzsk0am0zcnvlk7baprab32qfo3w5ntiq4gq3h1zns1nhr8u9hzh29gp6h88ha',
                receiverInterface: 'imthxb2ssucekuu0c2dmksilgbfhq2wb0qzjzsq0nsbmast0zet51arl6uew1ivdm940tx0h27v3lt0izq76zwnpsx4sx4kb7jelguavi2atv06sn6d7d6ehba3dm36im7tl1fvz9funoptycrh35lhcmbge76vd',
                receiverInterfaceNamespace: '6vmjku5vsjgrop8jvogpmrr5lshni95866b4j3xjb1annc09ubwjxij73q5g7fgpb1pr9olxptfhatle1cljsewlpkzseyw5nq020qzuw4xq3ccefesr1ylpopp3gsbq5at4x9i8nul4pb0kcrndx2mp1lywtb2u',
                retries: 5545534029,
                size: 3514795026,
                timesFailed: 1625237770,
                numberMax: 5378884494,
                numberDays: 9848514831,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c9ebd6d5-cb16-4526-b13d-b370a5de74f1',
                tenantId: 'a995cd05-8e89-4d34-8fae-304a67fdbfab',
                tenantCode: 'j9xzcsdez70la64r2ekc7nd92tbkoepryk9xri2j0vli43eoy2',
                systemId: 'c48eb77b-36ae-4299-a3ea-cfdb1c2718b6',
                systemName: 'lg4zgl0crc41hpkyeuqw',
                scenario: 'z0whxyfaccsa2v686qtmmcy75yetp5v666g077gxdce4uzvvyfncbt40kt5b',
                executionId: '4ced49c7-0f14-4689-889f-78044d99d3ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 04:09:01',
                executionMonitoringStartAt: '2021-05-23 16:36:46',
                executionMonitoringEndAt: '2021-05-23 02:51:05',
                flowHash: '1pj572w0tgvmep12ym6l084ueq2mm56nohc547xs',
                flowParty: '76d9pyxh4zsrlkggbk2rf4g9aah8zmwxfrqbb0wb69t96v1jjo3nyznqnbsxjjyrjavk0aziov9glhigd06hggw590cio2idr1pnwrvot3iaqhkeo79ctz9vj0vsccwwu01ohlzc8fcw1ax5jjpbm3vlf8ircmsc',
                flowReceiverParty: 'dtxqpdxq7kqjm8oqjqxisv1xpm5kwp394i3zznhyd0fh9x6wkdlon9ofjeh58s6c6cnwefzsi3fixxpme0n0ljsd5a6fdj6j1lwmw40njsqu3xdke6koko5w736xfl9x8bn9h0qyxgk24a9xpo2ioicdkm3dfwxa',
                flowComponent: 'byvpxfunelirorp9p72lf1abvyh7tmynhqic5a9v011ss42r50y4ucxomw1id0oo0sz0woql6zurus9eqr6ei2rfuxuubw2i1rt44u7cg952pd1vc5qsrztfeyanh7m0teo56ycmdxo6vvyi1tessdp8fysppe0m',
                flowReceiverComponent: 'thy4b26a0cuj4j3yp58od20kv6kjy4sdjcyr9od11yeduu0z9t4ttt5lvrlassrt9fpmjj6ox08fskvfpwj737amfdfukwmru4kof4en1xse5vqqea1qmkd9mp4n2mjbdktzuq2tj2yisep1reoxa4uyzfijvukf',
                flowInterfaceName: '98gvuq0phgnjmkbs3ihwigmc555vfujn4yxajllhktg6jjnk5u9cu80vb40avpavgqfx8dh7tkffhv3famwefz84ubzldrvuq2znx6hk5rxs0nd1qm3azvsl86itsus2aumeet6xz0xmqvko098v0o5th7asvxrc',
                flowInterfaceNamespace: 'tuqgernmcudhdwigh4edbod2pgldtbfd40rs3z0orila22hifm5kt8ab4mgsjw5z3ub1gqelebsjy5pdw73lbd6q1dlrlblzm4o3gps9xociakomucfnbd9lefu7vi3qph6o02mcqcsjcvzeisz2m4cu3fzjiek1',
                status: 'XXXX',
                refMessageId: 'n2lk0yydxt76its20cql9f42sjwj161tv7g4ghzn9jsazbi0v1g6pegzuf6df4eaa1y2ebtdqanx4d3yn3odyz0kxiajoll4bdvtkyg092uqrld8859mcqzztb7zglcnr6ehem2je8fjlzuk7l9v2dkd83w5def3',
                detail: 'Dicta nisi omnis sed rerum autem accusantium harum ducimus incidunt. Quae sit amet sint aut vero. Nesciunt omnis molestiae voluptas nostrum rerum voluptatibus libero. Sequi molestias beatae tempora ratione eum esse error maxime.',
                example: '0fcbxysi0lfitana1vw95o8flika0bzp813fp5uf5f5ipfomd948vl4tzgu2ze0r5nrim68gg06jcwbvwtfjih36qg2ctxhrai4yw2uva8fnne0mi55r8eqk0rbnoodz479ibijh6be730o9lby9m3obr3nz876i',
                startTimeAt: '2021-05-23 03:51:52',
                direction: 'OUTBOUND',
                errorCategory: 'xouwwd4psqx993yg55o43c0invi625iaj45d53oijj282vs7x3eahkwt0ps73s3bkg5qlr8i49quri22pcv5lgjscz7dc7ak89uutoegyaim2k0qnpp5w2tygwucyqg3qlg8pwb03ousirubk9t6wwcv39667qs2',
                errorCode: 'j2ggvzokatcqqua15rfmos00zu7mfgwihc4dv8jv1yymdfbn0l',
                errorLabel: 579250,
                node: 4144461701,
                protocol: 'g2y8bz1skyo2ym04y0fp',
                qualityOfService: 'dp9r1a5p5o03q0jdb1v7',
                receiverParty: 'n7ky73c6et9ckxfcd3uphdldpqcprp50ubj39tddijkdz3zgeihagtu00re8nh4auzhr5rsw2r5couoc8dao37b2jez7z6p9cqvywjdjy8tvizb4qjn4guim0nm8g7v4hvfxno19lpvyknunbh6ud5fb66l8eupc',
                receiverComponent: 'cpmegz8mpngay4b359mf2zmzs8mkquhfnf9psogruthx54ltm74uai90xv9ga73kz7gnsykyoxbb6370ekkbh0fmotnhuh4kwlx6f4ukkxtet9sdn8eiz9msif9ktv636dq3649ueq8rny2ks5ypga6jh4z2i32l',
                receiverInterface: 'rmqvjjyiikeoyfizcyl65rzgquzdmiycxzvap3ec6xq6xuc0biducmpw9al2u4hvkoi407g68zdeu5xulcl2s7gqg4is28asqwnaxellx7jpumr0x2glxt9iu6fqzvfkcqt8kqu9ge6kdx9asy0o9m6iwzx0vnaw',
                receiverInterfaceNamespace: 'aaq5l48lgt5k5niuaz5b2mjioc1fae4j82eyj1c5vdn4cl0eapwq7aw0tluy9b0anlqs0f3kb4mdhkxy07mawvgeh0o7z5f308ibdkp4j4em948wk20ufvim12vnj44kdmadpen47abyuejzbhhcu8gjadhwm8mt',
                retries: 8473971152,
                size: 5018523095,
                timesFailed: 1642221373,
                numberMax: 1076445514,
                numberDays: 7262082184,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6d612801-73b4-4740-b79a-bcc9e34ef51e',
                tenantId: 'e48a618e-7b70-4cf9-aed3-c3471da69e08',
                tenantCode: 'zrrrx1xqydb57un7pxq4trjqq4hflyfod28c84arcnf4bwz1sp',
                systemId: '5589b756-7810-41bb-a80f-1768274406e9',
                systemName: 'ckfpp29civ83wia50lg1',
                scenario: 'ljmmob0a5qn7a1xrhxagsjifvdzvf41u4uy9830wfixwb22x3fvrphtplkzf',
                executionId: '5c438d29-9672-4944-94fc-c851b02e9829',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 16:14:06',
                executionMonitoringStartAt: '2021-05-23 17:57:42',
                executionMonitoringEndAt: '2021-05-23 11:39:51',
                flowHash: 'payi6x0bzap0qwvlfj2mcfoavshqgfdi0ia8x395',
                flowParty: 'inkd1a8o8f409osy17xusnm3oyz4g703zv3cjaws429m9n7svw8hpi5fbxa26c71ae7g9ea8z09wmrb4t6skfqg6wrtn7xfw1y6s5mof5f7nkp8he5bwkhov3y3tfu3yqqi4qqemulydz0vmx7dadnz37pbbz5au',
                flowReceiverParty: 'pgoc26hz729wlkmzpbk9naaoe8l8vgs1nrpk6w14zlk8ls94pvgykfx1dim28vcmjv0nz29ek20gdxaw58hisq3z9n1qqqmnxiyos9ncip57zp0posjkccu64kcjg9qf8mdr2l07ce825l1nuzltkj4lh5cfag0s',
                flowComponent: 'ysttacvbrb6v80ye2roa1ucgxmvpffzrxvjx3dw1xkmrs0gf50hhvvkodbnaop772ckfbhr04eturu0ah8b00n4tk07k3r3wx7ny2c8iill11dlajfox9j9432b2h02if9m2xpo3wwxzyvcqlbh6tgdlarf4kdga',
                flowReceiverComponent: 'noqycla5zy2y9gc3duyfme4vw2wfykz6i2wl7xjv83xlv0uizw4y04zb9w7vzrpb4rtq7tbdbiqlibnaf4lklor3l36lttzkd4sj69rhni1uyg0hugphnbmc2i47xfnnuprr0vurb3wexjam56oikbcl7p9ph3kd',
                flowInterfaceName: 'ouw5zwl0xbc59i7o90ex9tzfiz9l4hdiwqd8m4je5dd0f3jhnn852qu20an54c38c556jfvi4pxxfvywzpyz8n15ng0osrs9ti8v6c9q1ib3nqj842768wg6cn6kgazs5uev1odc57duhvsag2no4kpe74abnix4',
                flowInterfaceNamespace: '9xv7c9og7rzbzxsoy769x4gsb3hisxi2yijzktajhfcs8ms7z22hvcjp5nq4pki24lhhhy0kf3x6m50autuaf95khm0dnmxjl454kian0nss5nu5uxt5a39wmm8rxeijnqxckoajcjnt0bjf6gykz05j5oy1me2e',
                status: 'HOLDING',
                refMessageId: 'mje2knycaglw36u13gtfnh4t71qha67tfgvmv38xamykoyrj0z3fl9k00kzkzjju4z031ga52sa0bw6awt1rdwi4jbe20bwhurptw8zak831uzmb9y3a3b70d63sp30788hsee3gl5tefonb2oocbs6rtx48zb3k',
                detail: 'Voluptatem ea accusantium inventore. Eum officia dolorum eius aperiam. Vel officiis dolor magni et error sed laudantium odio. Ipsam nihil beatae quae unde aut. Voluptatem aut itaque harum molestiae ducimus.',
                example: 'pysbvzn50gjokqak8rtphplgisnhh9bajq789rypg8zwzv5tsh5yxh3nfzekakw91umaa8cajjyj3hnujvywt7wy9vfp9ad2ds3va35kd8j2e6hglkazk8aw3oekvkl11lt2nmaw426uhdy8k0pvvfkat02owif7',
                startTimeAt: '2021-05-23 15:14:54',
                direction: 'XXXX',
                errorCategory: 'yz5bsfd7y6906dtzz63h108fpws30l2s2d0fr6dvjwa4aw9h7wt1j32w8dwuasguxbgji1ccokbgu1adn8ibzzavvqochpfxg1ino8geuag932k0ghwdjqiiccj8gqxyhyb7l2jabrh8lluvgr4d00am9w4hcfg1',
                errorCode: 'nlnt1md63bbluklqu1aizak3x3esyxkwffxdkswb9f32p0huda',
                errorLabel: 982074,
                node: 9210859750,
                protocol: 'dozxl68qpk4bik7wc45q',
                qualityOfService: 'gyrb8z8wc06n146r6oax',
                receiverParty: 'mbmzbspr42eaorxr5mnhu5ydbst6lw69lgzf7ya1kf1w5yt67vv0rz85kl5ghu68ieokdukcwuwxc1qti5bdzvv4ivuyqa52y9d9afz7748538gjn99v1s1jut5llltoq3jxtjbqkb8clcndpno8pgi022omsjmb',
                receiverComponent: 'qtcpsjhpjj8befcknvd4rfvmkilqb8xwkiqel53whayqswbg47l4dl71znvvzdgsnaf02btg0zkfjzc064pjonkkxanx5mgr8yoq3jvjtarlvpi5vcws5n5m7e41v8c6g411c8awqyyfl4su1voy6abw1dcjkmsq',
                receiverInterface: 'om1o0w0at43tkpmk59v4mm9k3svgko926lw7kcp41t75n93t3lrkzl3rzgm1f1kgo4mtavzrcj36el7y08af8sws1574bvlfl8q8yb9y1s6d3yilfja2ceycztw7b29z4m5vju6nqhlod2iqom43kvm04t9jwtj8',
                receiverInterfaceNamespace: 'f37l50mi7yxjuwqlg7witx7qn14rrksrk1xqd1s2od1k6tyx0petkyz4cxa171pt0gqjvy042p3mdal8kyarlr62s7l58kw6aji692k2kntnfglvx2z0myxnr0aw5evqs1zu8aumfbxd8b1srk5ti01jmt9mj4jw',
                retries: 7322161513,
                size: 3905818380,
                timesFailed: 9314484297,
                numberMax: 9614163475,
                numberDays: 7516795474,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7a66a6f4-316f-4cbc-aad4-6b49d6f97e5c',
                tenantId: 'e9eb57ac-3452-4e79-add3-daf6e0d36fc1',
                tenantCode: 'x5x13vgyhf3ns2r444berzoxfqfzi6kbknazupstvbzukqgf1e',
                systemId: 'a5e19c69-dc5e-4efc-885b-025598e08517',
                systemName: 'aomzdd5luvam69ffqu30',
                scenario: 'no95y33h1wn4w3d66mr3rydpof8dor6iliufk871v2m8v1y9escswdcx6ewx',
                executionId: 'b96f610c-b443-4787-a6f7-6a4214b5aff2',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2021-05-23 05:30:25',
                executionMonitoringEndAt: '2021-05-23 18:41:05',
                flowHash: 'fas3d17tmzeku0ayu8nyf1af225r9eyujzkbikvi',
                flowParty: 'bh30edh44v5qbpauan1f8407c79ezc0p96u2f3e1bt1fqdf7aehx4e1brmkya3ikep9qwbfl5ebuoe84xxpz5cuikdt10ywdzx68ibdxogqlyz8b9ax5zvs5alqx826zfzzzx4ks5ugey9wl4uyzdkb2o1najjzr',
                flowReceiverParty: 'bi6fqrvdheefn3jobgee6l9ba8arlc12jo9oxpwfw8i7d93ddyxh5rlnaof87fo8cnqwnblag7xxfg2m6uz5f6bi33coaruvullbxcibgewl9nifjy3h8p1mh4vndz4siz1th3xoyq2n31jnk53g0imwozyafmh5',
                flowComponent: '0g9nyq96ptxh95zw865g1uyt1nfazhlnxdz2pfina18okqectnl4iini39p0zngir9pmmanc3nf10scfjoaag7e17qnyr5jtdbpxiy1psk7hiqyg7g2z02cv7ligh52dp0d2xgydiipis2d2n987kfdgikkt5rfv',
                flowReceiverComponent: 'z9xt9vk0bni048x1ivnmvm29hrlvyatxzja5p0vryv4og30jagabajt6u97njcgkq5qvdlthytvqd16nr5chgp82ia15rjklm1bm8i4lewcf1pbondp9qmq71grlvqb5rttymnrasuq25e0meznfavaihkcxlv0p',
                flowInterfaceName: 'ynnyarz8zvowtw9xwdxkdo194ao6qwj6hxn2y3ecc5agmtpaxhwdj1ydh5bm1fn6qg5im1c0p2gb33maq7z5oadss1zlk4orurhhlv64771g0o36lwf3cph87el1o7h2jdj7dgea9t8l9topt46albc7dfsp6ew4',
                flowInterfaceNamespace: 'd0xwykx2o3ikjt9sem7ynu9peyj552qalt3iplp5nt7m7af37c1d27wtzqe1s0boefgcs8h2e4yjsfx8cm910y0co18x1352u7bbzagbaekpnm00m78mzcic2kqe29vffv056q8vol2pau8259xu1401iuslsmax',
                status: 'DELIVERING',
                refMessageId: 'hvw3al1gzkmap09uohvsd0wanbpfsmpbz5l1t3dv85u1d5tdbu45h2ljz88psst1o91oc2xbccy3cmaed4loql8tf2dhezqqu81rujdn58y0inlpsy4bn9nethyfgp8qjfedzsb37xs4olczuhev1q3e9uiyu2l8',
                detail: 'Provident reiciendis nihil quaerat fuga et quia nostrum molestiae. Qui est aperiam possimus eum temporibus molestias et molestiae corrupti. Repellendus doloribus est voluptatum qui tempora.',
                example: '8m6iqj8ms2m39vw1pi5rxjmemfyt6e8ej5h1h836m0edeu1tp5tecjvze12deh2nbmayvu0wt14w4pms477q1iol7tdaqu7y1rerwqf0d9g0vn1crfwj4uc3gbqjs0326oymmfmrzt07f1ja49hk0w4l8dv1iksl',
                startTimeAt: '2021-05-23 17:45:40',
                direction: 'OUTBOUND',
                errorCategory: 'qs6fgfwcqkr6j1xa03qjblsnrqf8q5yli3hu9ml53r8rnqxz2u4lru8qf6zsf7wpbjjnaq9jnp0wyohf1k8ikz1hwykow99zbmm5m6ox1fym2e4nbyqyvjrmgsiebj52nqhxkg2jfb8l35fdzggxklt84twla7xo',
                errorCode: 'ekugfdvv4pnj9teuhpsgcnugoi3h8zfgubrrf1fjjp1do6oay9',
                errorLabel: 260557,
                node: 1409160048,
                protocol: 'p24jc5a7tehmuo7vx040',
                qualityOfService: '7sd0mfytoq0010zks1q4',
                receiverParty: 'a6hrho0czid1a944obd9hiz0j8t2r8bv5liefq2y9mxzfzg0lwho95eabvfv6if6nm0dcrn3ssclkrdwwumfw09adxmxzznpsv1xkw8zsq3kqxz3xdg6a32o8v7j0vhtgih6s39xhpneb5kmehyxgyprl7evmkju',
                receiverComponent: 'n1ceq2clwenye22agc66yg867w7gq10rjb13qtvabd6srtkz28l9461qzb3s4uladx8wlrg39otke0fjwn7b1wj70iuxv8k2rfk3i1bdghlh79lly0q5q40ylbmmwb2atj6e0e2mev4lyjddc534pgfnhg9kb8az',
                receiverInterface: 'kvtk9nc4euc4h85z0oh7ghucz557sa1f6f1xuwhxxqv2bead3imefeitr9z8kyfpef69gdr6seorxidvt2ln84f1dojke4eg18v25lvcq81cmiupeandr5oa4uwj2umudj68aqt2dwp2u4eolvsxextvwbxh43gv',
                receiverInterfaceNamespace: 'msv5xfe2j6dx3u2addqa588lvdfqm83w1hfvjjku2gbndx1l120susnud1y2cu8wi949tz9gjjp5dgf0hqhabzl3xc1psv3tfqtjay4omm316shc0xt3ad5rebybu5xy1s283plnw5v92rxkzkubwskrcjn992yv',
                retries: 6499908990,
                size: 9195232684,
                timesFailed: 6600480226,
                numberMax: 5146871105,
                numberDays: 1447099457,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3d444058-e3a9-47e4-a339-529fa0bcda33',
                tenantId: '55a97d28-149f-49cb-85c3-8e386f6b7859',
                tenantCode: 'yhj91g8589bzhiw4fg4qsxzzhkvuy7m30lza1ooech1aucu10o',
                systemId: '90bf92dd-968d-414a-b18a-b9cb99465062',
                systemName: '299cncbg9fvsw3h4h7wp',
                scenario: 'icfkb3e5hxh4sg0chstq1e2czd9lel69bal4n7bbrnwhyf80vbnsbut0v2jh',
                executionId: '30a965b9-4e60-4abc-9c0f-96dafbc70f7b',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 10:14:02',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2021-05-23 05:20:48',
                flowHash: '5dlz4sf7h06koo7q5bglj4l1sakmr3vplfr940j6',
                flowParty: 'twxyzbf5jawp1k1c9dryt6mqza11hkhztjojm8m4lmx6nzmg6v096ticvm569f9lp0def0k5qkdfyr9wts7ovx9xnrrb030ifq48jp4c1hc4o3pep2v2bjnq4rb13omaa8qx0kbt906tr4a3cf6bf2vaf2bn1iyl',
                flowReceiverParty: '0v89h7ad3wahspb1z25qih22cwof7fz9tnwyvkllzlgf4lrldutwlx1ptbpmqy9onsoqudg9vupe5r71nxhqtw8h6jrge36h4t4a8bwmlogkqfxisekntht0lykyluahkc4jvfgoo33sf1s7yjzqxtclfu9qrb6m',
                flowComponent: 'eh5dsndukbcssmm6fcoj2leh35thdhxsqz3qzokfzse1q169qieph0mpxu4hifktqrcx4bxjrs1w4opgu3euehdfkfdjonuz3a2a77cyhvax31ce9iama1a1k04sahn5qyhoh6nmzeswadbg1jxhrwhgv2eevozp',
                flowReceiverComponent: '3j68ekn153lyn1ig9lckitadlbyex5unnlwbog2meye5tzo2x69488hfuraot4ejv2wh2lct56usakieqgbcmmfgymfcsuuqvzp2shi5n6dvedq0t3iu0imvhol4ls5wnvv867xdexyfsp8tf9qpk349bk94q7ed',
                flowInterfaceName: 'pg4wkejtrs02ef8dco3l1943j695x4nxz0mru7y8ub2y7a1lf0i0fb08isuejw462ds7or6fige7xqbvdkm2us1su6v5a2upma2pkng0bpew484n90j2t77yxk1o59h0hga35vp0h1zyjm99x1q2gien7vkh6wl2',
                flowInterfaceNamespace: 'px4cpczspjwnw037oo7se1ehpm4873ert15yzc1xrrtuqn8q7m6y37pmt5yy17t6pfbqu2sa9jxenhck2kp9z5odntpvn6utbq946fzex4kb9rkywbhxscspf5fmou35ednbi9ud3njniia3x0f7x5jnfgf4wsm0',
                status: 'ERROR',
                refMessageId: 'xsycvg5lp5lzhhqyhen4gniyc77dcnunt75em7bnrgwozqpjaizzcww8zn8sxbukyc8h5t328zii7ij8mnij40ydl8pvpheu7slbhr9y7m7wz7k6w53hwu1hzisfxea450r35i4zki56o8yxo363fxqg2f90gkav',
                detail: 'Consequatur dolorum omnis temporibus amet. Illum nulla fugiat ab amet inventore quae eius. Itaque mollitia laboriosam quia fuga neque laborum et nesciunt.',
                example: 'nklafswmlwult1hbi2arq7bw1xecdqh1oixbj6ooj5bx0m1ktjzyopgz72f3g8ktqngnt1um2firr3j4o3jfw0z098inoi8u4jzcxc1a0y2hi4aagjz6mpjeuh1mhklpo199opwtn42t1520qks3crep09ultbpx',
                startTimeAt: '2021-05-23 10:06:45',
                direction: 'INBOUND',
                errorCategory: 'chnnm5ji3s9q60kfsbyvyklsy487ymsy7kgmam9shrmvsq62ytdyi8o86w9fk3wz7u1vhorkv7zzlecd84nbdfxqnvvsna8i79tbom776087hsn0q8jp5bajj5avk1ryxyw0h6ux6t8avjsak83giodsqftfxsyr',
                errorCode: 'ctf6h5pcszcmp1t2gh7m3ps9lhlmrnkmv0mpb41u770m49pt1q',
                errorLabel: 863409,
                node: 2698827063,
                protocol: '9qy82bjuohcgpbp2ki3d',
                qualityOfService: 'qj2d0h9gfrwt35ton4mz',
                receiverParty: 'owjta49rt8w5s8qcnisic5f9i9jn598rmd04guurmpekoej7d7rjxptdo3mjai07s7shfy5mrk5oej54mh6bvmwspkm6rzuaednlix41u3pewpgll1l3xhnjqq79jffojpjimdnj0c978f4urj4ylwqlhbx5j3ve',
                receiverComponent: 'b7w9xnvfhuzk94dhawbioa95hsrkufo08238ibjc7f62vr764anrzaimb1z11x1ket5y106bhp9n688cf4ghrafp6msbalajy8trn3mubbzjd75alr993646mh81wyxj5okl14pq0r6tae4g1r7hgzem05gmmiz1',
                receiverInterface: '1m2lyov5mhp21k7y5lvzf7q1oe4lumrb1seb26081ejx58hvuqdjhmv6p3tjcxdfrhpe6uewq7clgfs1ik87daihpz9hmjnma4f18jfrysrokx5ydk96kj5hys74j67jsy0ktqpp1reww6oopov5iaz086jjc7kv',
                receiverInterfaceNamespace: 'qcz1qnhsh2dtoows89soaupngli0jao1ggchv72sv0dt727y42amiubult3ix81ze1k4hz2xwx6wwe6t5alpittj9e11q7l541k90bw2issj0f9mgir4svfr3mydh7pc5pz524exavfli9z6s55lbdbdy5clvlxo',
                retries: 1879105741,
                size: 4877334058,
                timesFailed: 7293672311,
                numberMax: 7676610874,
                numberDays: 6540925167,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ba67d379-6f34-4867-9528-0b6dcbdb8af6',
                tenantId: 'a615fa87-2581-48e7-a973-d0e27b721cca',
                tenantCode: '2jy950nfbl5d3g9em9mo00j8ipeoqu3370i60ofiit60d9cy3a',
                systemId: 'b04e2d71-b89b-435c-9f25-deedacb824cc',
                systemName: '3y9bis3ow8m0k6hsb592',
                scenario: '81pqsozmi1hjxd7jyltowhfxut521q3eom7o4lpfgmdzisjivuxm9y8rel7k',
                executionId: '20125c04-96b0-4e02-993a-3f4214eebca5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-24 00:18:44',
                executionMonitoringStartAt: '2021-05-23 10:29:07',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 'omwajgv0qb1sufgdyfo4iaxsfkpes3v49xk3jxi4',
                flowParty: '98m68bumvb397k0863gk1aa2hprslu6b5v99f6kt0lcpvvh2m73vrkkml5afs3no1ooqmup37sc0cvk5wxe97laxwn90t1127gkqghxhyd9g43st8fd3abi6463wcuw6brg9yb8r18q983qljhz6ke9aizkkpjb3',
                flowReceiverParty: 't1ojc6tg5it92s2dvks2z7olal1ytq181ps22jz9h88skffvhigp6d42g4g5ot3qwr8ofest13pr5f0il3m7u2t76n02tlzxangrkcm9b11pelr1s43t5ugn22shv0r4iwg1ldrfkpff8en50pphwokk7y3xmlf8',
                flowComponent: '557k9f2o4j36o9lyp6qikkbkrion19lj361f5o1k997swi9l5dbaq6f8dr3shzs9v8guxjkgr1ayvzzs0xkduva5vjhdvv4wwo778yl0a9mo5gaoarqkd3og5hbtf4bhng9mc01wgybs8gyczm1793dt3uvk4iz6',
                flowReceiverComponent: 't8suiiuzwdqoithxhyayx21buhs8zs38m0syxgcxvf4la5xt3vmw7oa6bwxb7eerwnzwrslqou9b5di2h4xioiw2mkcoq9s6lgc7whm1yvs8g89hw3047yge2k8k7uhy2s739bvlqevwmdbxy4iq678htj0f4vbj',
                flowInterfaceName: 'dp76rqr5vd44yjiajrhq0ionf951qdam4w48jvkoskaim2lexfld1egnb3yuqsycx3eqpv4c07pc9twa5365v36n0duq6d5f5itvvu1etgxq31ub78xkdfwl7voeiwja0lzh5lgkueqyrmor5clg35bs9ti62z1z',
                flowInterfaceNamespace: 'ppoqwuyryiq9esoznl9y07xnglz1q6sfu580wux8wydl3j3a5npbmpa31fw64sujmbwtnwvfr7tp1vmexmfokbnph59s5emm5mtkifm0jfyxxumxysbdb4eeisyimlvarkw6h8uothzjqq22x211jd29fli4ty7b',
                status: 'DELIVERING',
                refMessageId: '0infqa9jr09e3loccs54pn1orjtnu7kfsxrn0igxsb10m6j5d68z03pflrloui95l3ap023b0ngp3oykjqa1dswtuhm08t3b58mrgi02xrhx8jkzvkut2xoq53mzqgmo602kf6xcoku2dx934imbshsg5tpqbo27',
                detail: 'Accusantium velit sequi autem laudantium. Dolor ipsa nulla sed labore doloremque perferendis nihil. Perspiciatis impedit qui ipsam ipsam velit voluptas nihil id.',
                example: '3cp5baeweom99e99rba3tfw4dz4ar3hljkisx0aa93w8zrspiqhszl6r4hbsoj9in5bg7amkgjdyq33tak0lksnkmah10pbpi1stpfommslx4mk6pzpmjrw72azzc7xxq1p7iyslfj66sduvallpfhfvgo4kg8bs',
                startTimeAt: '2021-05-23 23:38:42',
                direction: 'OUTBOUND',
                errorCategory: '5pzql9mtf6yxnzxj5mju97s7nmuvvej0ym106dvek5np9y6l696d7kektssuajhkmurr8kgz41hm12i1hzo7jjjmgcsdz0tzcmbfd0spcpcreonvcosi91otadm7yy5hyqfi0va5bnkueco84d57rkftn08yy3ei',
                errorCode: 'q943hbi1pq0wchi30lgrveduv7jc0sxkcqq2vxvwpaklpq3shh',
                errorLabel: 327919,
                node: 9627623627,
                protocol: '3uxg3cn50oty84xeco7c',
                qualityOfService: '27mbcxvmd90vv6jg9mlm',
                receiverParty: 'qamk235allm7k0he8zabykkyinrapbf7ihasz5budz6kkwrzbfkwi4xlfok2pl8pk7sifma264kxgwf1a07oiq5s6y2gw3ecgh5zw7516o7cyuijkvw4lyectidn1o4ep3rdbv6mju460qmfi1d4kijf6mpnoyu3',
                receiverComponent: '77ms2vzzrf5ou7ujplnmil6dkfrr8n94py96hcwlephg3l7935v13szop8zlpd4mve09tcf9a5sgvg54en35lrzo4psbyhl3stiognso99qwpndarbl167131x11347pki664kdwn0t9ddvc9pu8dnief01g0b49',
                receiverInterface: 'pm6oyqlnh56rvq6cf02i8rswr1036c8eu5phlsuew3mcl0z9qlrcj7q2lk04b6osk2geclr1vfzvol5weg3xthmz1oukodaey9hy6keb487pb59cgy4osdmm8ivq9oo1ohv6hkg57fcrjp98jtr92ugn35nkh3k0',
                receiverInterfaceNamespace: '85byyept77t5tnf6kxx5736l4pnx4ot6e4iv6nmo91smxdlfx8ibl71zbkjnseg7ppt5lzj2x4oyez2689n36ncuhf9uydw0pnf61fh522d780wqevqbt07xdpp19unypswwdts1atzfah9fd4v0hecjavu0xyxw',
                retries: 3065079453,
                size: 9875177719,
                timesFailed: 1260324216,
                numberMax: 3704724248,
                numberDays: 8128444140,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '48621956-4689-42f6-ba34-e739a96022d2',
                tenantId: '3f79fcd4-8248-4e65-aa81-a706a3526910',
                tenantCode: 'h9lc03m3da36mh7wzqd8zwgmlxcz6v0nknzttztn0dd9b1ewwf',
                systemId: 'c983a859-52c7-4729-a28c-bf6532104e91',
                systemName: 'e9x5077n7e7lpc4eh9rv',
                scenario: 'k0d0js59onkxizzmpn3j092b5q32ue6kr9fiy8o6idyheq0d3m8atmmwdlxd',
                executionId: '4b5507f6-fcd1-450f-b06b-032bbc2956fe',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 08:42:17',
                executionMonitoringStartAt: '2021-05-23 10:40:57',
                executionMonitoringEndAt: '2021-05-23 07:53:39',
                flowHash: 'wywcrwm46iwof05nensw7q58hb89yew577bz6kwg',
                flowParty: 'ndgsltr9f617ynp7ozfoifylyjp13xmog085w4i4ktodvohcoxhn9sjjdcpgljnpx69dlrn8tvbg4vlahgiock1uv856re2u56f8r0hozxp7ze1isfnzovydj7ysdzni9f9x2vm5oir3de085ozc8vm2w2oran3j',
                flowReceiverParty: 'ui3lgef8w5dia884lw9dlgwgi8zuxm867qmv1tmrkcunyjv5leons8zw7bp68vy089v7jg79j19oz4bpqi75gh3a1brs3a0nsbbil5tvpssb70m07244y3n2wu0257gcmdr5umtdh3jce64n576gwgf5i5r1v4pd',
                flowComponent: 'kr3bcve0kpot3lzfdsopnbb9779th83064kn8ouqck6t4z0lj9qq8vytqeegu3jh1rqn3awnn0bflax7ndxexdsrk5uwsygctff92qmlmcl11jb9fa7i7wsgqj0i5c7jsbr8a0hfnnqzhz9xrjp6228dsghs6rdp',
                flowReceiverComponent: '48z110b4v8po54qanu38jaer9eyb1nmy8ly7fet9vfuur6zkscdmcj0sizd79zdfvejotxifmwutt5yis8e6upv5jkgc1jnlfcpi4gh9xf59loypomtqipm2r60fj0zrbggjref5qxpacao1bx9tyjvqnsh0ct5p',
                flowInterfaceName: 'f56j5o9oo4ibcr6wtn3d4tsek8bwgxxqs3wk51vnl4eoza52r3wltc32tni88lkw1625vr7jck3lx9ouofsnnm4y8bquwfa8m1fr0ykzemvua1uieo5s8d0semxm3o3l5sd2qp4vgn8637l0kpwgy2hm3zgieym7',
                flowInterfaceNamespace: 't2fe6eglslb2b2nph0fhk738d1rf8ij0mcqxxgpys4lqkb1j60zy5mjc3beucc359h91c60rssxz2ik9s8wbtkqfp4vz2lqdafpaqhsexpr26ydutzyul6la9vhqs1hlx49dzvqb6ejeljf7uiic77qmhmqiqk1f',
                status: 'WAITING',
                refMessageId: 'rul6ha7wksk17mg8xjkzheho820mu8fmxjygdsjulk8mgqquj8g72b880hexis5hrcnvc2tvlssx92wrfbhoi674011hu1mpy1plg21sncgm586pnzanqdlxe7qxbvzmdg0le8ewxfm6b4f5fjqm6njtihn5dwe5',
                detail: 'Pariatur qui debitis qui maxime et laborum sint officia facere. Molestiae quia error esse et adipisci. Consequuntur enim sit hic natus.',
                example: 'gpe84otrk5y03tzsrrbnlx0j6ojqqq0ui5g06uy9i89xnpzdgvelfppbtvrczw41czbv8ttfdg2x4pcf4s5euep1nr9vz8kmcsxif148q92xg459iepjnats9f91ro7pjubqyhw531st1axn3xdfuryx336fsovi',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: 'z4wswrmfzuamqeskzaz4ifmu4wffxzwj9ws04mq0apnza67l7i964vpe39l15rhv3g9tkw21b34xngww61659rydzuqos6g5v2x88up7fwv2jckib20myiq91o4l3uleze5kit7ljde88jdkbho4adtkwkuui7sj',
                errorCode: 'akqye0s4wqdqxbyvi5x4r5dz5952oz1nmauvoo4wyddpd566zt',
                errorLabel: 200150,
                node: 8800960997,
                protocol: '8t6gern00s7h638u9tct',
                qualityOfService: 'r50j4oga4dzw4goj5b3f',
                receiverParty: '3bhx9kfplkt8p9qn5uz7wpo4kx7pijupsndlykkm81r88bekx2r521qu4fyppcoznrhy6ycy3vm4jy0h77lqezmchgqewj0f5nmyvlmqqjfku0sy1x1uk0l1160bmhjmedpkbwgkw8llcbn1tf001ubx2ltbgnwk',
                receiverComponent: 'atufyrct8nsqzvbaqgfmt24m7ueus2nsauqbtapy4p3y28tnppmde2yf64wcynfkx2ixkgl6j0w8xdgr8v1z750ueg7n8i7m2v9q1j49634vc2gtk4na45ho7acjzd70kswskckd8pjeejpu9azma89xqlv7fvin',
                receiverInterface: 'dtiu4nb49pmcv8ui72ku0w1mukhord8mi2bkj2s7xia1qx6ir7v6b3ghcte2n3n706a5yi3grkgor05yxnnhmvby22anp63ggarces684hsl9h7xt1n4msm18ay42wz2aasbznctzfec7d0qjbzupb1owsv1q4v3',
                receiverInterfaceNamespace: 'alwjdwf85by2w1j1i1vazlj0unsqtcltf0hvavffufyqenck4njf86tcx68oka0y7809ygdj95f3euf3e9ezi8xqm64m8jz18v02o9lg9bhc454z66sfc6emi9hwpu8rd6ojpff43jqyhcdcwdut460xf1wwl1w8',
                retries: 6825618925,
                size: 6997486759,
                timesFailed: 9205278527,
                numberMax: 5782220741,
                numberDays: 5539461599,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });

    test(`/REST:POST cci/message-detail - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET cci/messages-detail/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/messages-detail/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/messages-detail`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/messages-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET cci/message-detail - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '3986183d-d143-497b-8385-a2090c5eb1a8'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST cci/message-detail`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                scenario: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 21:27:03',
                executionMonitoringStartAt: '2021-05-23 21:27:03',
                executionMonitoringEndAt: '2021-05-23 21:27:03',
                flowHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                flowParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowReceiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowReceiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                status: 'ERROR',
                refMessageId: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                detail: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                example: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                startTimeAt: '2021-05-23 21:27:03',
                direction: 'INBOUND',
                errorCategory: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                errorCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                errorLabel: 691518,
                node: 1596579793,
                protocol: '4iyw9pwsdxcmgcu744j2',
                qualityOfService: '4iyw9pwsdxcmgcu744j2',
                receiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                receiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                receiverInterface: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                receiverInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                retries: 9252283082,
                size: 2113723884,
                timesFailed: 9844180883,
                numberMax: 5316481779,
                numberDays: 1820206900,
            })
            .expect(201);
    });

    test(`/REST:GET cci/message-detail`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET cci/message-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail/cdcd32a9-8539-41cc-84e3-8e22f0f542a7')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET cci/message-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/message-detail/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT cci/message-detail - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                systemName: 'zwdlk281zptz1leq1e77',
                scenario: 'myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduel',
                executionId: '5bca6fc7-b485-49e7-b8fc-703ad456b0b8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2021-05-23 08:00:21',
                executionMonitoringStartAt: '2021-05-23 15:57:44',
                executionMonitoringEndAt: '2021-05-23 15:17:00',
                flowHash: 'yrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8',
                flowParty: 'ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eq',
                flowReceiverParty: 'gg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29',
                flowComponent: 'phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs',
                flowReceiverComponent: '4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9',
                flowInterfaceName: 'm8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdv',
                flowInterfaceNamespace: 'ihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj',
                status: 'TO_BE_DELIVERED',
                refMessageId: '0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswn',
                detail: 'Dolores officiis aut et sit sunt. Doloremque enim quaerat dolorem. Quam et adipisci ad aut quia veniam pariatur quos at. Natus nostrum ipsam aliquid ut et hic. Minus et quo aliquid quos.',
                example: 'cbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef',
                startTimeAt: '2021-05-23 20:22:23',
                direction: 'INBOUND',
                errorCategory: 'ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5',
                errorCode: 'e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0a',
                errorLabel: 351445,
                node: 8272318325,
                protocol: 'ymiddm35tvzvmb4nypou',
                qualityOfService: 'ftdf36pc1yhkdb61qc4v',
                receiverParty: '4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe',
                receiverComponent: '69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpw',
                receiverInterface: 'g5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2g',
                receiverInterfaceNamespace: 'nbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2',
                retries: 8085879359,
                size: 9470378483,
                timesFailed: 3260536224,
                numberMax: 1386174506,
                numberDays: 7114048139,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/message-detail`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/message-detail')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                scenario: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                executionType: 'DETAIL',
                executionExecutedAt: '2021-05-23 21:27:03',
                executionMonitoringStartAt: '2021-05-23 21:27:03',
                executionMonitoringEndAt: '2021-05-23 21:27:03',
                flowHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                flowParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowReceiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowReceiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                status: 'CANCELLED',
                refMessageId: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                detail: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                example: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                startTimeAt: '2021-05-23 21:27:03',
                direction: 'INBOUND',
                errorCategory: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                errorCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                errorLabel: 152606,
                node: 6808576206,
                protocol: '4iyw9pwsdxcmgcu744j2',
                qualityOfService: '4iyw9pwsdxcmgcu744j2',
                receiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                receiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                receiverInterface: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                receiverInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                retries: 3579705592,
                size: 4347268856,
                timesFailed: 9592154973,
                numberMax: 3843770247,
                numberDays: 4360253194,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/message-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-detail/06e93a03-4bee-4df4-a0f0-5c694737defa')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE cci/message-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/message-detail/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL cciCreateMessageDetail - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL cciPaginateMessagesDetail`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                expect(res.body.data.cciPaginateMessagesDetail.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesDetail.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateMessagesDetail.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciGetMessagesDetail`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciCreateMessageDetail`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        scenario: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2021-05-23 21:27:03',
                        executionMonitoringStartAt: '2021-05-23 21:27:03',
                        executionMonitoringEndAt: '2021-05-23 21:27:03',
                        flowHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                        flowParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowReceiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowReceiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        status: 'WAITING',
                        refMessageId: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        detail: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                        example: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        startTimeAt: '2021-05-23 21:27:03',
                        direction: 'INBOUND',
                        errorCategory: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        errorCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        errorLabel: 315770,
                        node: 4959201526,
                        protocol: '4iyw9pwsdxcmgcu744j2',
                        qualityOfService: '4iyw9pwsdxcmgcu744j2',
                        receiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        receiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        receiverInterface: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        receiverInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        retries: 6653728524,
                        size: 9203827262,
                        timesFailed: 1994631053,
                        numberMax: 5984910637,
                        numberDays: 5265068433,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateMessageDetail).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindMessageDetail - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                            id: 'e112f1a8-7e36-424d-ba07-57e335d128f9'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageDetail.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindMessageDetailById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '787efb2f-3cfd-4ec3-9dfd-22f49e0b5e49'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindMessageDetailById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciUpdateMessageDetail - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        tenantId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        tenantCode: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvto',
                        systemId: '9189c277-fd22-4a5a-a692-63a1c56085f6',
                        systemName: 'zwdlk281zptz1leq1e77',
                        scenario: 'myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduel',
                        executionId: '5bca6fc7-b485-49e7-b8fc-703ad456b0b8',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2021-05-23 08:00:21',
                        executionMonitoringStartAt: '2021-05-23 15:57:44',
                        executionMonitoringEndAt: '2021-05-23 15:17:00',
                        flowHash: 'yrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8',
                        flowParty: 'ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eq',
                        flowReceiverParty: 'gg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29',
                        flowComponent: 'phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs',
                        flowReceiverComponent: '4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9',
                        flowInterfaceName: 'm8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdv',
                        flowInterfaceNamespace: 'ihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj',
                        status: 'DELIVERING',
                        refMessageId: '0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswn',
                        detail: 'Dolores officiis aut et sit sunt. Doloremque enim quaerat dolorem. Quam et adipisci ad aut quia veniam pariatur quos at. Natus nostrum ipsam aliquid ut et hic. Minus et quo aliquid quos.',
                        example: 'cbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef',
                        startTimeAt: '2021-05-23 20:22:23',
                        direction: 'OUTBOUND',
                        errorCategory: 'ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff9yo7uxtsg8w34a3f7ecwc6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh2kkzbpkh10hh5',
                        errorCode: 'e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1glb0a',
                        errorLabel: 191123,
                        node: 3793602491,
                        protocol: 'ymiddm35tvzvmb4nypou',
                        qualityOfService: 'ftdf36pc1yhkdb61qc4v',
                        receiverParty: '4324atf9kcdpvzfx9sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe',
                        receiverComponent: '69m3t43mgjqiqozv988o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpw',
                        receiverInterface: 'g5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2g',
                        receiverInterfaceNamespace: 'nbyg2gqc383b9j7j58ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2',
                        retries: 5461462190,
                        size: 8391723753,
                        timesFailed: 5920369909,
                        numberMax: 2382162149,
                        numberDays: 3437136557,
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        scenario: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        executionId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2021-05-23 21:27:03',
                        executionMonitoringStartAt: '2021-05-23 21:27:03',
                        executionMonitoringEndAt: '2021-05-23 21:27:03',
                        flowHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                        flowParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowReceiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowReceiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        status: 'HOLDING',
                        refMessageId: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        detail: 'Delectus eveniet quaerat nihil eveniet omnis autem. Suscipit et qui laboriosam voluptas numquam quia sed perspiciatis vitae. Eum ducimus sapiente magni earum.',
                        example: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        startTimeAt: '2021-05-23 21:27:03',
                        direction: 'OUTBOUND',
                        errorCategory: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        errorCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        errorLabel: 318106,
                        node: 7539542705,
                        protocol: '4iyw9pwsdxcmgcu744j2',
                        qualityOfService: '4iyw9pwsdxcmgcu744j2',
                        receiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        receiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        receiverInterface: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        receiverInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        retries: 7122616467,
                        size: 2680480373,
                        timesFailed: 8652751458,
                        numberMax: 6862704138,
                        numberDays: 3681634163,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateMessageDetail.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciDeleteMessageDetailById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: 'cdda1efa-787f-4bec-9ee9-e3c00896fd1b'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteMessageDetailById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});