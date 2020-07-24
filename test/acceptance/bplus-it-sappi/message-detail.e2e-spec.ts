import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/domain/message-detail.repository';
import { MockMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/infrastructure/mock/mock-message-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
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
                    BplusItSappiModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
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

    test(`/REST:POST bplus-it-sappi/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'd58556h51zzjjqmns3x2tz31ojimilg2tbmo2zy9rn5l2zvjyu',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'm8fsjneofak0dk6mtcri',
                scenario: 'xq3ekhpno364kbpakjpdhktp38i4ekzmsvkbpklsyi0gnlvrabehbno2rcw5',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 01:23:56',
                executionMonitoringStartAt: '2020-07-24 17:51:58',
                executionMonitoringEndAt: '2020-07-24 02:07:42',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'ggsmgx2c0rsmb7f7fay8dwrm8v33p7rfrk0s0sncpnwomfir97bxzhqgu32iye6va21n6ab7isile24p3umrlvioskjkjxmj47umyc31iy09i7l8bn7a8qvyp6dwet20lqds726qlsml7miqdozfx4230l29j8vt',
                flowComponent: 'ndvxs0mvtgsj2hc2lpatgl8rubxsu22yi1jrmfz9mm923h7kfqjzsfde7s3f6jlw02pbzhc8pqx4fwxuomupl59fb8jx9evalvj46dwwh7rtvip0bhtqb53r73c045qlckwwv09ocuo5iocr8httxp45lkrox2k6',
                flowInterfaceName: 'nroyfxg5v1wddil5khi4u27swqxyaygjvystxp5hr2e9jsrtpcl712n2gnz0445wv0gdbg6rycow8oe66o8fn98xhqj1l4vmw02ibkbfvnjb6y5z9r1sbqrfigayna36drmmiuzct08sel1dxe7173hwu54pcw8z',
                flowInterfaceNamespace: 'f9jgdyrc8n9v7lz68odbf78q097wyes8pn8lih0rjeizgybhwppkwgf1kqxmwxlpkt4h42l13e47qv46wen2dwn7koz5t86uuf5iepz8sxa894sedx9rr6thon22je9vb16651m79x3tc2z8svz48xf6bhmvrasf',
                status: 'WAITING',
                detail: 'Enim tenetur ducimus sapiente porro labore. Perspiciatis quisquam unde non adipisci temporibus esse. Quis minus quasi explicabo minima adipisci vel itaque distinctio. Et totam repudiandae quidem cupiditate aliquam enim odio ea. Facilis perferendis eos rerum perferendis ut qui.',
                example: '195lk1cdbnqrdgsc3fcsr7ehg4gj7740hg9sjwbd9lit6ypaxmw280wiltsybd52w70eoyssan651w2rue0mpijixo4aqgrsqe5lvcr5ba9ud69a3ylljndszu8v31xg0pnjm5n7mvlwsapoljgi5xjhuozmxtia',
                startTimeAt: '2020-07-24 09:23:32',
                direction: 'INBOUND',
                errorCategory: 'nfzzrp5hpq7t30ed7u2gvx9f7h5uzdgox0rr0z6olluekt218xuf4klropro543h4m1sqdo0g38w48daakprqc6f02p2mp5j8jy0248sfw1glaonmnx2mdksdiw16g2y8bavshitk3jja4zzud4670xoqwvxo4wk',
                errorCode: '3d8lo1txx9l9eqfdapy0',
                errorLabel: 807563,
                node: 5589686131,
                protocol: 'yfrwvoof8m0d8zxrqk9s',
                qualityOfService: '4fbazuzq5kkq1pmra3om',
                receiverParty: 'co11dhhnbdt3gd6167z76ca67s1fc6twp6565r0p7691mhxivsayn6rs30l3by9l9zw2mqy5qumi5jfdl0c0ku878zdfrj2li0v6fu9e1ifd2ni9l4scpz5r5rhpa9iqynlfhgmdw8g87zqyr5426lvxbuqfgzkd',
                receiverComponent: 'ezq5gh5z4aqjgnmgd9d67rghmt9n8w7aqppk388wf4duyh9k0q751ppza2nbafqzlinbymb4shmg8urxt2l75xbt030wxou2ydamvrbt65jwh67g19s5z07bbg7k5suke8bcvj1frv1vfzdhd1ms844l91dtc9pa',
                receiverInterface: 'xauaazhagi9d32ttis51ahgn6sjw4ai18hyha9711xqxaebiz7fom8nkj74ooebjec1forhtus1qz2o6dbfvo3qp51gf8pisqi2oicjuxe8spn5x2t5cym00io9uca0phy302iu53ne1jkqfxm1v6jsbma2klv9m',
                receiverInterfaceNamespace: 'oyokb3b4krpv6thvhetqde76bedq4d3tgfsj2tnuvl6mbt0jylfpuslocahz2e09qcig4etqyracsvkradhd8tpxagak7qd3p43e6k2pgt33vttddhbtzdffoft2tb1up0rmpy5to2xazm5afca23s68guep1rm5',
                retries: 7814720136,
                size: 4054137081,
                timesFailed: 7723205973,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'anzbxksxi595lvd7owmf6xaukbpkcpocwficwnp3sgxlfbiez1',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'uiik8ax2x04861o0orfs',
                scenario: 'fku6dkf49vrpautw6l96hwn50d58on16blxdblycgozrb6wliyo6zydaie7r',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 11:02:06',
                executionMonitoringStartAt: '2020-07-24 13:34:40',
                executionMonitoringEndAt: '2020-07-24 13:23:32',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'ftf7ml0gjovv4580cdnccnhlfos75w9rz51oekwnwzqr8oj4a6ssw32ikzk666s0cbi0vncqcsr9e115s11yiarpy7t305wnwrsq2a0st9pui8n91hvic4dh64uxk604qzeqhpbytzl82uyx0mqj7nl6pq4427vj',
                flowComponent: 'g0b734cx87ted9k9opx4psn5w63zkvxzkxt77yl22j5n6cp15z7tvxzgqt387f8i00sajc3e2fw1pjolqn36zwylsyld2cably03w4d03dqw4ywh8seqejotx4fxzf1f3jzlui6qcyvmm1rbb9up7aan91fndfzm',
                flowInterfaceName: 'nbhx4yi636lc49m68pycigsyqtalvi8ptibtmmtp56nh0q06ft8ft4yv6ehmy8trxpsq2kpic71p2qwu51a939rpdsusd7kh6nv8359up37im6q9unmqwod47bzea8mf41zlps6vd1pa52r5uvez3z7dq6v8awa0',
                flowInterfaceNamespace: '3t1n3i1u21el7q4dwab8qrdf47kt0lt1p5p1uqxn2hsuhc59zgnkg9qooco10pc9qe3mrvp2irzip28lci7lz5l7li1vj5t2wayluj7djj8mzyx8acy6x5imx2sqcj4u7f9n20sblx3mtq6jbbdaeg86b0ddqpaw',
                status: 'SUCCESS',
                detail: 'Ab consequatur reprehenderit eaque et voluptates cupiditate omnis libero aut. In expedita non nostrum facilis quos dolore quia vitae. Occaecati architecto et eos ut. Excepturi rerum atque iste accusantium est quis in. Sit in vitae soluta neque quas.',
                example: 'kb2bns0ovo3lrd7qy1brxrannko52ytqom7soq7wtgo7u90hmq54qctixr48jwopa4u21cldmh8nkdtekax76i9wn3tdowqexpxq9kz3n7v95deq3lrwwa2gkrmpnai7r7j494qskd3dq2dpn692kwxq6jtslm81',
                startTimeAt: '2020-07-24 13:55:33',
                direction: 'INBOUND',
                errorCategory: 'hm0nc2gckjtmz7gst15oun9zzzcr7ghn9fe9bvm7h8ieehzke2vuzta7k8mqg99awosn99ivmyyhsx58uy10e435a9ycq4x10x4hgrpdieib25n5y460eayzwpes2os74cjd2sxjylt4t3u8gh99tq2jfy29un4x',
                errorCode: '7t29q7udzc8gwkitdny3',
                errorLabel: 469000,
                node: 5409589969,
                protocol: 'rln67fm0rvdmiukmrbhd',
                qualityOfService: 'p1al9xvcxaw0pey2r7a3',
                receiverParty: 'ji4o59awxmwigm4tuioyqi3bo1nss0aoo6vzny4nom8ia5awzydsuqxuszdljfy0ho86rwthify2e7p7zjeawaivqjner6sspzh01vwhcg8kdv2kf3r9v70eai372g7e4qx9ajrphl2l6dq6b3st3q90m9hz0ypz',
                receiverComponent: 'c2zgbpt8pehddu1g16qtwblghh7j73u8u9crtyxnb561ws8vp3o12ho28jp8woqhf70r63z8dhwybqudoipdip1tc04m2b7x8f8p9hwbllajdro4qrz7wc3p8ahbkq7kk1xr1g9t3afzi8okq0w8ta29xex0gldp',
                receiverInterface: 'f9mj2skes5dchn6z4hq60jmkn54pvokgz3fr6lxgicowwtyfyhk2gixwqx1fmaejjfo6nug3jffljatjdod1of4vcmxi2wwtl6dwj5p1c6wobo6os9nexuf3p6quz3hhk7751feb30xmzntwv34ryhj56gqn5fo5',
                receiverInterfaceNamespace: '0007hwntubixtkryk62t1kgd57ixg9rjyutmj913yqj9bysddrqx1i2gyrmucjc08wct7n7fvvo04t98z8amlsjt2xta57q70ggszhd3riv9oy7x00gvdumu0c7cex619hwcdok2nn8xazlh37ftfyt48hldvzln',
                retries: 6655520006,
                size: 6051030145,
                timesFailed: 7920807276,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: null,
                tenantCode: 'y0skzu6n33ybsumvsgn8lwdf5aumsofbnzqc844kwpfsk9vssa',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'v43jbvd7vv7t41fbcwim',
                scenario: 'jx2wtw37oqlm6fk8jbu1m84ebrlrrusbmkqkxq2od685qskcju8973txpb4j',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 10:25:31',
                executionMonitoringStartAt: '2020-07-24 07:50:45',
                executionMonitoringEndAt: '2020-07-24 14:28:05',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'pca7ovzkdqp93shpulhenccn8glsu40bsc8k18g2muo62dj2aogk7tqcucw4uo29vicjtxsek26ewuw0iirxrwuond4igc99rtpaehch4kg4h1kxee0a47hkygtrp4w72jr9e4d94q20luxf3t037276jkzt7a92',
                flowComponent: '9gok8fi5z4nu0sbkkb4t7jpkhjweigu0ek4m6fxyqov9u1wawzvqvqcj3m4yltt76m3nuujg50q9nsv63ji2nz5dlilsijkdkpz4629s98wuveckzcltg21prrlqh3pi1tpcwenrnffa3d39mvcmgyqkw668brqt',
                flowInterfaceName: 'jntnd5kk60ed4zjbcoaurxebjxdoh2bzmhbzcbe9ao37r66bnv6jtbq608ljwxznotwc1hxfwtpo5qgzpagwcafz9pvh5aahnssubq926mn67bz75wf8zfpwms5376p2olbo6d50rqxo65t0cd5bxml85w0azg5p',
                flowInterfaceNamespace: 'n27xkelyzolk0qoy734bz64bgoynvw22eklkk5tkro7b89ycrb26eyf1x0scjw387dbqapq9a4goiohjq127ufsp7pzaxzdi6g5z1z9sfq1yq5ov3v2vxryklupxcxmkqb3oodq6vx7q4cmjpmklgguzonl9o8h4',
                status: 'WAITING',
                detail: 'Omnis ut minus sunt sit vel soluta quae. Ut doloribus eveniet quia rerum voluptatem perspiciatis harum quod dolor. Vel molestiae quae eligendi aut nihil soluta itaque.',
                example: '2acwhgdw14dn5atbuagvb177glbmhurn2id61cpg0m532pmwkaqdr36bjta6v6d0rxepph6n8ratin1ass1stho4qttnj35ft3rzlhxvivx3c5ny5qg81elxfilpq83tgom4x74fekii7c8s1vqy164zta9ywhn1',
                startTimeAt: '2020-07-24 01:56:26',
                direction: 'OUTBOUND',
                errorCategory: '342q4991s0j1g8hcsc3hlefj5xnxafvoefwtmj3roofinfg1c636p9zxh6pgbs9ikxn8xsci6dkr39y9jiwilomycunxjs5a2rvzl4roj05a9224cx2wged4wwu2r063gcq07dut59t42h8j6ixxbl3b4arvf0p9',
                errorCode: 'r26j5wjzl3ga7y7rpf7f',
                errorLabel: 657780,
                node: 5098966844,
                protocol: 'lkc8p5cmxda65upr4vnz',
                qualityOfService: '6mpjaa7t55gtgzju2eer',
                receiverParty: 'z04zrum79va52e4bt3wqv39q7xxk9225tt1a2cfboww9wcg0evq1h1pmsgyi67f8nfvdzxibqdrlc4ck7gbrmfjt2wdj9rbk6zkxa1fin38cyeb4aavuapwfbi0do1mestwb7vc7332csnjvalzg8e7phqiu4b4f',
                receiverComponent: 'e1u833k65uurgott6ojaddjnmrrnxvgwd60jzdam6417tf0s5wozrhqcpfsdx6is0q74nizlfwll69kdiu9itcpyzohl0y94zwlmkx8pnnf7iu3bp4eofldti5i1fj85qbs6yg0eafe50mb0g3908qy2xvj7lywf',
                receiverInterface: 'rnx9jmntv7qmiegs43qd1wbnsrgw9ncckqegczxz82z1q7z4mm0m9whsn20z9akh29r2uy1ty7ev6nrjsjkt2gop0i8pjlkzd596sgu959zv16bdqkhqqc29xeu3pmjrneo6mkkm6j601fesp8a5kgix167c5yy6',
                receiverInterfaceNamespace: '83vobpsx46k7gerrevn1j2b0l2nlfz8urxyw74d29h78pk2cs6i5yjdmvz5fniyclvts9rjj0yfe1vvdymnnml77tbaivu3etlw1m58dpeqjp8m5x9fgenicfktbl0zmjfmgaz66ngsxg946kceckwifwxjnzjl0',
                retries: 5573263366,
                size: 7718343804,
                timesFailed: 3559665815,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                
                tenantCode: 'gvgf4w2122vswnjq2cn7ohety0nd4to3jyxzhg1qaghta0p4ro',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '8v3czyic2koyhgieykoi',
                scenario: '26chea46wk44s64q9ys8uq3xipo007y936onksqnoqke5dg285txesel4hbi',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 05:48:52',
                executionMonitoringStartAt: '2020-07-23 23:15:58',
                executionMonitoringEndAt: '2020-07-24 13:55:44',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'c2dwsouo2mmueokd4t3dtmr8iedjhlao9t44n102kt1r2y1bmdbjrjlzkl8vbdt9h0emo3dg1vae92wvwz0dc8umk2ugbs8dq3bp5c9z23ftzocqlnm1j4oofk7dvwgsqcofwppau8ftpikv062fprsle3prj7rt',
                flowComponent: '9sc9c2685lnwn2fsctwlagxyq3vz8lbwz267ulmrqop7jmukod2uwg0rmcb5s8qb1clqrmujuaztl7l1nsk4mcdi8c8b5fsju3a53k5773wc2818wkqg7f8d62kcxo5sq3aulctwr50gekgzjzwmnt2xd0bfh73p',
                flowInterfaceName: 'gkj01u5f2uxz50c4v8yc3s8og7tw3pp4p47sljzqyigf4q3h66hwk3y4mraoy8zf009ic6bs8u396b7qklhdc869g3zp1iwlf7mu9o5cw233c9k567dyigc0y7q5sd8293r0lay490ypgxgedb8uz565hsb6gs78',
                flowInterfaceNamespace: 'i0g6a1szmguzz6gd1rwzx8ekp0yzlua74bk67mmuw2kedfxmhr1vtvauj5jzx1sm9d2hnsvadlt11qkeczok2kyzkyne3ymptlcc2zfyrdlmtjo0zoxcd8owfa2equ87ytxd5qiz9cygphpvxfwpa6z3sead3zkr',
                status: 'HOLDING',
                detail: 'Rerum asperiores consequatur assumenda. Illum consequatur commodi at dolorem. Dignissimos tenetur ut ipsam molestias ea repellendus.',
                example: 'gmw1gtfcg636csnumpg2dhs6g6vaeqnt0idescbhhdjvymtorcils0m5r16zndmxyjr3r56d3nl75qdh3raite96btn6w0295xstrbto6bhr7e1dgcbbjgsis5o2ta6wb9jvd50e1q2o2wfwr4gyvj4z41d4xx6y',
                startTimeAt: '2020-07-24 03:50:55',
                direction: 'OUTBOUND',
                errorCategory: 'x6dykim91t2c5v2akupsu1skx0mrvkgk05fdxsm3y5jcdiuh8wlr3abekbv9kcssw5xawmnsm1zzb7oe1d0i60bie659m1sadupiikwhh8mbc9laoh99n2jlm8jx7xkihzriq6g6qfm1qpma3pngkq54deefx3gk',
                errorCode: 'g2s1kuew5qbz5xlxjjzw',
                errorLabel: 750560,
                node: 3596377881,
                protocol: 'p3w168dtt3dlkbf5mujv',
                qualityOfService: 's93h0ftg8jlrtagz6pqg',
                receiverParty: '013so9rg5ov6ramjfl6un1sz81ia1iakcaes896w5tnxixa8llx58inu6k9mxd7vw44bqshhfzmzmkpkui62dgz949rzh2kvefkd2ee1uh50a4rlet6s6rzqrevn4tmpa3jmo695a5a82w4ydvpuz5fv1v0kcx1g',
                receiverComponent: 'yg4qkko6kt9q03f8lwqlqejf09lpbikede7j1daic29zbf3eo3kbxl5wx7i4tbgi2qoyl2sat7gisi06g90nteeqc8im7oscntu9tcd535r84iejynzcs6eaq7sy6yua3qhvpiuta0f4gugrtfqc3cxeyz9c67nh',
                receiverInterface: 'hf0r8kqu33vqc9p2rh50ws6eqjym5p63n9wdbopg09jbteekv5hwwxntibiqvtj8o43rg51vphsxat3cc10cwa1v64163icvqtfm3rfywq9wp3s5ud1o51uqr4qnp249oip2z1sekpxgr3m6y5pvtfjws435d0c7',
                receiverInterfaceNamespace: 'ssbf9b58orqf6nhy4go2y2le4s5u3xnx8ov4hu7lfzxeb1fbrzg5cb0rg0i2dhej87g9fnne60otj35yvm8i0od6g05w9zxkqef71gubl34db8czfzf2ceha4y7cw0ev30zd3a9v1yvx9s005lwhbjk4y4vx1ixe',
                retries: 5066052391,
                size: 3865630721,
                timesFailed: 8968911381,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: null,
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 's65gng92c4ccbcq0gya5',
                scenario: '777f3pwgd1kxjukh5ohmgpod7fx8wxyx5nty5iosa4vb0v1dnugv4hspwj8i',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 11:53:57',
                executionMonitoringStartAt: '2020-07-24 06:07:53',
                executionMonitoringEndAt: '2020-07-23 18:16:39',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'xocurkhzb8qbwnodhqcp2x2nrrbf4lyyj1upp7105uq4b6143qwmpomyqiku6hzd4zys75qrnwjyq2xpf6byf78x9a9hj3h7jbkvrft7oqe9lle2qik1va2isc67lz3ugfgi7n9i7wprrnnl1fmtpetga1luym8h',
                flowComponent: 'cxxxrh2ye5spwrs6iloss88fg5pfqymhjvjxaxp8q8ek6ewn3gzmmbm7k4urahe0rwxs6ijwnfcdv7rjfy75zbrqez6umhvq38y1e0v665ktdd01km670yoib01q4mfkj5sgsl9dw83fps1jbyj01g6xknzv0k2d',
                flowInterfaceName: 'jueydiexgzpbcxsntshpcxss8xp8k6eqnipbsfm5eo50dh1r3ycnk0xqiqshz247rxdptq7o5iy7cexpyenbb4j77buuzwlqnwmnp7366v7frd5b3rqjqpy3h2lbeyxuk9fpoforleze0h1mhpa9snyd5omma1qj',
                flowInterfaceNamespace: 'mmla38tvn07s9ihco5yt5d5iykca4f0hy4f6en20ejk33hh8fy4zodnvbquudq7zd09fk0mrmt9w2g8d2yvfk79qrs5psaqgkiu5xgr2pqcvhwe6fkh9ovxcd4r57zyy85riwzzbnw5q6yx4u1724e5niyox2end',
                status: 'HOLDING',
                detail: 'Non repellendus quis voluptas. Ipsa qui nisi eum quaerat nihil. Vero voluptas enim dolores rem est dolor repudiandae. Aspernatur omnis deserunt eligendi quam recusandae et. Labore ut perspiciatis quo labore velit expedita magni tenetur. Error a atque velit.',
                example: '6106nlrru54dgf9v3r852p6m6oh1e81fccx45l8sfne1yumpzjgds3t4kvky0yee8ctwpr3xn4yekyhx4t044evvsvd4c8edhg7wbc1o51x1zaw9pqpku6xvsfqc8m9td6fp2ofa9p3ncupns7tezm7rn7tkkp01',
                startTimeAt: '2020-07-24 09:59:35',
                direction: 'OUTBOUND',
                errorCategory: 'yte5lnmk9f7z86ofidd3x6tr176hzvccnakl3ow8jdwh26zbinf0f3rt0er3d439hn96ld63pr13n6exj8c0cpvokckltni5xhavi1yqed9tnj1g99orwwtd26wrukqekgcgmim1wl3fb06e4djt1t1jlfy5gx2m',
                errorCode: 'fss774kow0g1dafxgfan',
                errorLabel: 386168,
                node: 1784801297,
                protocol: 'w2sfnhatcynfm3yb413m',
                qualityOfService: '9dc75kykpwmaylerk94k',
                receiverParty: 'lsgzdg8v1il9y6415fp09fhlix9l9oe4qoepkwiko2fmetj48osg03o50kvyejosw71nz5qaq5e53hdcvivovwtx2sonb4ccljsjz2ql2uclxlpgnq2zvyezr3fpoadxdtkdd9cyvfzp6kqe1cj7suzzgamnx56u',
                receiverComponent: 'kgd686oa4qcnicd60ygfyv9mdw8c75h0inyygl5u1qqcm8yp1eee5xxr9ybm9wx9ssxmc9298qf1kr6qgwqxs43tvif7zgisjgww7shqgs8idxjy3ss85vxktsvhnwwkbqalqgg6g01m8twix1d2jk60yypejaf7',
                receiverInterface: 'hsm4zle33649qkqpshsfy7jx3rtoalqgz1ojefmqfaefgvo7n41t5vip3z2ju5w61ufw4xsth8h6wkdf5hexrmbqqm5rd4fi55vru8dc2qyjaskp59m66bjli3texx315z8jk4dzzddnov8imyoaaloc405i183e',
                receiverInterfaceNamespace: '240ju0b3b72vjdc94p3fqrnxt09salhlm4g2eiuajxywv822muxs9sso1n3eacon9yaynknktv5lhbdsg8fc6c61sdego1ar5bz2uelmhhio3sy6vnm40bw3swk40bbej1o60z9fg5q90bmkmg3sz5bjjazbswgv',
                retries: 7422583758,
                size: 4471553901,
                timesFailed: 1705311269,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'bre7v039cgjajg2fmaai',
                scenario: 'own73ivgj8b1qjbpemvyx2dp73w67a8t1hff8g6ylcs3trioq92bmk6akaej',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 10:39:36',
                executionMonitoringStartAt: '2020-07-24 04:24:21',
                executionMonitoringEndAt: '2020-07-24 13:33:49',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'e9zbbgwvtv9bszraojdo8am3d4nwytxqywhfcqxl03rv1hs1bfbwoo6r67g7231e33ln387cbmuo23l7jbfl6ive9p5ghk7f5p3sx5qamp3tgoe5t4oo1791gaklldd2ejedvh7uxg87ub2lfqn67vxql8kye86a',
                flowComponent: 'ynhw9kyhju6e1c5czxwukq3gd168910szsg2s46ww2eqwzoqupca9nqqywfxor8gcv2yvdnm0qjaky76kdp3keykpocfqgdekqnukarb7zigjku3820r5q2lvep3f7nd99m5qhyd9vkww8cyab3iglg8hbl96zvp',
                flowInterfaceName: '1imdjlgxnkxbr0w7j5tzh4nkffaoz35zx3vtuuqt0pxef4trvw82mrfu3v1dpwaf7wcj8oh0hciisphmokveq642zsqu0o7m315nxrr6d1u84rpaop07ifjvvbz4rkzgvfq7qzv68vi9ed7u3zm7xjqtmfm76l1d',
                flowInterfaceNamespace: 'vts5wj6e684ho1tnbjdt20w0ewjs0rlsw7ddog6pxnta05vqg4u0t6k9wjphe7i4c9c67ndbpiyruz3ep5xd7b5b7s1qadqskdgsegdbhfs0zar7h8grv5gongvsalrtf34ms8psmmdjlyp9tl5crjpw91m81afu',
                status: 'ERROR',
                detail: 'Voluptates qui maiores quia corporis laborum nemo. Est adipisci tenetur aut ipsum vel. Perferendis consequuntur odio corporis autem odio quo minima debitis. Officiis eos autem blanditiis distinctio. Eum veniam vel eum aut neque fuga repellendus dolores. Rerum et possimus error asperiores.',
                example: 'r228zx3ru8uoziypf6ls7z8amkk6y5bz9fkqmpuzek1yt2cdli4f4sjf0cj000k3c328hcpeodjz7nybxnl1wxvr1ws06pj5iwdd710jfecl6szc7ga6dnv4af73j019okjc1m1b2aexlgb15c99l0z3e6ymuh3i',
                startTimeAt: '2020-07-24 03:38:02',
                direction: 'OUTBOUND',
                errorCategory: '257y4kiyrjkifs1btmlrb3m99tfczmrj7qgeoz0z86kt01y9er0u5xy3f6jy068tr0h5a55x3y13kaon99sn0c1bmt2ljqk4v8ujuqjrs5p90xy95kwrlsp7d12v2ymyz88xqzbs4da1ijv632n2uc4izby2a9nf',
                errorCode: 'zxp3nlgi69rahszjxl5g',
                errorLabel: 834226,
                node: 1493070087,
                protocol: 'fu0siikf7o38bpcp4mqy',
                qualityOfService: 'g267boejvw1wlyrbc4pt',
                receiverParty: '43anip2xr5grw2p6nopgwl28cn0s4gk5e0nd4al4xda1vf21rv550xrnzv5sy9lxkb1wov77xnwwqx3kshe9qbsoane1kvij8nihx2kg57m16xe8iilebyqlu2l76silnhgdjnjwcwe3dax34y8yu1m2411co1tt',
                receiverComponent: 'qoy8kw2uw7to29wn0skawu0i01cv1ja2r9m70lm5av1vtrqws8d92tvc2cgcfritx25fuyu7eddbf7eikkrsp55s14qy0sm52gqerich81udxqkezj8xeca4wynuua5blfxn8ig25lmmsscg3z5r2cpzt0cs5hhg',
                receiverInterface: 'rwvm6z40ht2zr02s9by466po7l721ea5pkbfy0bhcdxmmhxk4stjjm9jpbt4cssv4odmld887bu4sdajrrxp2ftkdmgkhl8d0xjoc2lfmmwl4jc7jupqs74olftmqiwq004ajz4uv8c0q1yzxqzet7ifmxj0j3qn',
                receiverInterfaceNamespace: 'r1l1ok4w50d9aov9iwimwlogw8xbfgkq5z40yacmt5x91sqybe1s07l6rs1uqpna1ju1hyb5a192yjz1f948zvto2jt1dintu4aczgzt5hpixtlizv97r6xmdc5xjjei78lea8zohmnpiqx7ifqhozsd0ndw6yoz',
                retries: 7458767259,
                size: 4519162153,
                timesFailed: 4232934688,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'wzk7dz7pbyvw0e9wbyd6tkuiv1plbktmo3rbcvdkfi4m922j3u',
                systemId: null,
                systemName: '620he0vmx1bpxikldr4r',
                scenario: 'uktb6jumfxn987m4c0g73tkvwrcip6bys2v8clbv8enj20k2kdp2sihe90r6',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 06:55:41',
                executionMonitoringStartAt: '2020-07-24 14:12:45',
                executionMonitoringEndAt: '2020-07-24 12:18:23',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'k4plbi203p9604y8agf81h7z9biufpe5d6wrnhx4w8goa6p2hcfiefb47e0n4n3mmlvlassqxsdut9qbqcfjksly7jnna1ed33okeks8wx4530n01guy6mbgkzo96gms135npsq8j300oii47meyzpiig0rv08ot',
                flowComponent: 'q5eew61gh9mvkn2w10kcmsjaybhserw0whz79xr1jzdytbkhus4kyl508omduk8tztou3qgt2p59fzhpzauti490geq69zf1pf6ey1741l42iuvb5j0cwsovffv7ivq2h7eea6tbuc486na0626ahnkcss7x8scj',
                flowInterfaceName: 'lj87tqle5ywlrv8t985ete9upz025xv8qtw4cge3c98mhemyqudp5rd2fxiu5jqnwldcbm2ar194f60kae5exlfvp1wb2yreup353fp4r3ydhja2vmurv164bmnc7jh5jwgfpxsv98uvgt1h1jehs5spd08pe7iu',
                flowInterfaceNamespace: 'fpvv4xujecrunresr41dkymp4w48jcswzggcsd1vtjw3538rqum5ja8g9hoiyl9upelx0h2i3asqpb51k88humztotoe1y6n2mgmxcf8tr2q7hi20mpp396a41uttta87e3zq1jfbb834n88ndyi4qr08wk1w2ze',
                status: 'ERROR',
                detail: 'Cupiditate ut facilis doloremque corrupti. Natus et reprehenderit. Aut commodi consequatur sed vel voluptatibus alias quo.',
                example: '5g2uzjatucm9pgjlyth1saqaav9611gae7f1r96kq3a07jjk382o2p21wfv47lpqvba4s6l7kwla9u7z7nh61tx0kn72mrmiyn33xadxm9gio2igctsmmj36y1sd09p1u2h0skfoirisq0dbh20jtk2ycb2j5don',
                startTimeAt: '2020-07-24 04:31:07',
                direction: 'INBOUND',
                errorCategory: 'wpmak2jv9mu21ynm5ywijc13tejidfhglnhtggzfdd93j8qaf6g2egt8b2je6wsod17j4nprk127s0oeml8r4j3jjg15pdpa7oaw9vw0dn33wuos6g7unqgs61t9gqjjw0aivhitlgp82ruvisi9tg4dy2qibi4l',
                errorCode: 'a0bl701w2cpdrjrswi5a',
                errorLabel: 389274,
                node: 8176994211,
                protocol: 'a7yxnh290erleaat1wmn',
                qualityOfService: 'brjypuxx0jf4upsp97dc',
                receiverParty: 'oqeyob20eg2ogb8jo4tdeqkrk2y7go3yi3p0sbcxup051y7r9vnq3orelk3j42bn3ajl2t80e59ntpvj0fk4syepyvs4yemvuh49qje9u0rj2gesfxx9ooazzp98xtspvbvpqauyz31zpfmy51zv3mq2p26xvf5j',
                receiverComponent: 'vtucr5ay4zqfp6gspf83a9xfsxj73e3vfyqtvaxle13xarxr4drf7dhnejzd88xs632f9ku54zqj945h7ugqqqorhejng7pb4mjnduk5cjw1ogyutmsbn5wcxkna5bq6r6d4ahu0qyi4fykvs5nvpnrk96xf30jv',
                receiverInterface: 'g09jx7m647f4huh68ungx3fw0ksmdpgc362stfsmevmrc3k0p0r4h4h5xedl5a2pz6mx7gphvmsca4w315q87ex0g5k01e7tlmf1m3j6cb8sum5ka36mq41o1b4653gryuodpwovgdo9xqa8bst051igy6kto90t',
                receiverInterfaceNamespace: '7kghn0radmdo1j58ki29tbvtqiatnsar1ptazhrq7x3l9lf0j2xvef2siypehbmae3ehemywqi70khmhq5q4nbu81xsa14hfd8ftu8eshopk17qwppgxjq7c8cnym5u40175ayzgggmaub07d3itskit1ewrz0ww',
                retries: 2180827230,
                size: 2781877141,
                timesFailed: 9115988927,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'c7tt4fjiw9w5gkb7cgghhoovjj1jk7xfqy3mntkbmayicii3x1',
                
                systemName: 'ztrz0049337rhi9st2is',
                scenario: 'qt2yijsjmg1fmqlk2wwr1wesjt7zzlt5loc3huda5riljd2h36a73gl1etbh',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 02:09:53',
                executionMonitoringStartAt: '2020-07-24 11:46:45',
                executionMonitoringEndAt: '2020-07-24 09:34:07',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: '5zcxjh01va2q85kxigdenv8ltjfwmxmfkzcdgaxlep8sgbv5jfedfdwvb2amiwamp4xgaglv61q7q9llrc5mc2zu9mpozaoqohyqu4kdr619oycvjg7ga3xyfdsz8mj858ibl2p8ab2bkpq6g2cmvaztly8uckdv',
                flowComponent: 'w6yinop682n4enbdquh97vrw1usdljhcilyf7zhbvqnuuh1rg0ftwp9gjfe48n62bqo21is3qamjo88u7523d125uf32syi08t0fpzufl7wxviaqd1s74gqywupc14hkjpye4bktrwgcrxsio46fzss50cp31i34',
                flowInterfaceName: '55x1n0b14s8f0w2cq0pcvp4sru7darr9snb57601gfdefe1p56z0x0rq97wwo3ikz7kaa92bfxyvstngyla8vt5sgervo2gfft2bg6fl8tz55ie8nvo7indn4y16foy4zgscqnd7phsgk72f1tt9uy748jjmtspn',
                flowInterfaceNamespace: 'd3w14r98uln4r8z41zwdj2wslu70146zig7igj500m75l4lnjvl2dsci3w4wkx6w7zv2gyyql9vtsxgcjs09v365trt1f3d6shysbuq0fzdeoaeys0ils3wp7wsyc4admwckdipndsi9oiqfccwit59r66wqtl67',
                status: 'HOLDING',
                detail: 'Illo libero doloremque quis quasi voluptatum dolorum. Repellat recusandae consequatur soluta. Deserunt ipsam ut.',
                example: 'jb5242edm7c4lbjbot0i4inb9r41rzn3st36zwc52in7rnzkyz3fgwrb6mz5ft1t3ohlmnimh6a5km6vhfm7hyi8c94ilbj4uehyzwdmh3t9x2pahwneee7ta1nrg4ohej9ntsl87uzxk8wsuerl05rkjc4e0c59',
                startTimeAt: '2020-07-23 18:41:04',
                direction: 'INBOUND',
                errorCategory: '56zvafob20jhi1knqin53upybsdk4axk147gqclvl06kb4935nzlxc8wv4a6a25atit43281wo0qe42eynoq87oa4yjv1n0lfcqbuexj8qfk1wq4fqzjhpmba3x8txa87by39bihdvggv4l9nk4nktkv3g757x2c',
                errorCode: 'ybujatf4oqbg9tmq4lhj',
                errorLabel: 338709,
                node: 5166453370,
                protocol: 'dwuxeq9416hsdta0201y',
                qualityOfService: 'xh6r3il7s2gbvoqbbsgp',
                receiverParty: 'pw4w7itapvflb1q2carj8k3nie8lw8a2e4ccvqov0cj7ibibsl4w5erka7olkgt6ha8ioa2bmg2qheg6t2wt0vz84tdtwg5qqngphcq7d8a30b9lzynphitwuud6a5b65jgihbj47hru4bwc599mqrp65vir6n0z',
                receiverComponent: '0ybr4rt87ckop6vlm0620s0yrs4zxgcr0zwla15pvcx4hrsly1ds61lrymctw0s6ia66mzdnsoj82y1h40jizpc392fd67eht13nqsg4fgak3w2nzsjpg88xmsgfbkh61tgfx0e0cr0c0rhnvr3bj7rki3ro1oq5',
                receiverInterface: '5vxcjer8xy70wgvxle9lwzr2twfd7xxmu04yr8ldf0ycz6mou8mue51t6aqn6e33fg8yp8f4uzi45jun8gr7397gh6biq4mwq4hvqc4ame3y6g49adzq1m71jdlyeambw0hijpe86dgefxi5j0okqr0id0t3opje',
                receiverInterfaceNamespace: 'j7if843gffdvvteowfjaoqcmc9sijfbq6u39enx2uc2fhri7mglp99jeotvdmco5hpokjxt0oorey1eq38hy7nhgx4g4cek160rysmo4yoi32fzzhggteimwfpd9o5mvd27nqpsnn0obbqp6ina9m29qnnea0c40',
                retries: 9981766117,
                size: 6967314378,
                timesFailed: 2831415948,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'd51jxcaucn9yv5c5yf4gjnsdckqa2o8jb8phmiew4i6iaupto6',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: null,
                scenario: 'mgi87lufk36nofqf8cjgewvsg5bp20te3nj6yf4yh405clanvgq5239mugjg',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 22:43:04',
                executionMonitoringStartAt: '2020-07-24 17:23:04',
                executionMonitoringEndAt: '2020-07-24 02:40:38',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'pgoemlwu7cyjg91ckc6uupi8wlvks3gltez00fjhg56pva5ailsyzoznbp0avrhomi0cabjmzp8l72zyh785une3kp2ugkmoqlhwe4fgp15p30k4zpqpzumi8a5v2en8b607vn7svipbxge5lzs86p92uxttayei',
                flowComponent: 'hyskxpi26j1tqxtngzqo039e2jwswgmptvyp86r6r1oayuwgjgautek7auw9gid4gm2osq1oupk650hoyugshpsgakivb41x9m4uqbmsmwkouajzdtip181nvw9scpm6ybs031scguk1a9f9j9mh97izaefckve9',
                flowInterfaceName: 'p68zseub8ct6m82ejf8ulzjaldal5e6c2d28jy0dbt8q1rxze5pw28j2lakx85qkvqnmock9pdhv16mh98zkbdg44dsklpz2lprjq1v3plbtwf8k2u39fmui9n889upszh6wuswu25acniefquz7wcfq7269jq27',
                flowInterfaceNamespace: 'v1fdvkyu1bllhs0m91392jv6rsjagyh70n2801whn96916lx2dc7wi6eya0x7cbgycca5ugv6vpxwtc5irh3crd10uyos7yjj2awcwvimgetoc0zo9hen2lphtmm4ky18lip1vvuo4hzwwp5xtbi1l0p8dlh7jeq',
                status: 'TO_BE_DELIVERED',
                detail: 'Et rerum facere est cupiditate cumque. Labore odit ut mollitia quis amet reprehenderit. Et autem rerum veritatis eum veritatis quo eos perferendis asperiores. Dignissimos optio minima nesciunt quae sint ut est. Occaecati ut commodi ratione vel omnis.',
                example: '2hy2lnalus1gb1tybgosb2usc81hatabmtc8mmuz4yio5o47bm2e4ajqfiyal5w0g25eyb95pijt7okpjp4zsymidmo5tzzr3zjqbnw0zsznpgdeoiixne5cu1h0exfi798unjiw5ysx79inx11s6z9epfs1pjy2',
                startTimeAt: '2020-07-24 01:00:52',
                direction: 'OUTBOUND',
                errorCategory: 'qqk4bvyaavohgbrvzpyibu1xh2ysd51oqvjydghsfxf4giuioflpcuubgxe1h94wo2pgqlagn9yclsk3tmno6f4qx640pe7sdndeu7w4vo68vjg35xv0enpd70ai6v9wufbqvqesu3h5pljn99ksrevhr510ro12',
                errorCode: 'indl4xt8vygalohdo8pn',
                errorLabel: 215075,
                node: 9519909299,
                protocol: 'm4ddrva60x69t8uughsv',
                qualityOfService: '0e0n03ra4n0zeg5bi3wz',
                receiverParty: 'rrbmt0ftg13h9xwxbyucfsgv5glbnpusnzkuhha4cwiqen525d260t9q4oid1fsre80750ki0wrchva91sfp4q7clr3vtuskyetrqr1vygrt5a9hu82z8yajbkwefdfy8zwugr3ukpmk3wjcqkqvpcaabmaa8jca',
                receiverComponent: 'rtejdi2t3prxklbwaup0ordz1ptna0s8fv024b5vh94cwsnn6f1zo5qc1w5anv9acqjw4qm32hvsgv0q4dxtykos0evw06nz6g9ybzxw8q7gwuht13969gvyrrs94ch2movntb10k2ytay2tym3cisqfusifzc6l',
                receiverInterface: '3892phjrqxn30sv9zspwz0vme483qo4aoa23vzr2supf9mr3wc2jx58p0zx1yzdjl0ac96ondpyvazpeea3bz0ltd27s9udb51mx30wo2zz0bae0co5oaanwun6q0uyqaoxhaoprzo1ud0u82gvo46wvwle6n5nh',
                receiverInterfaceNamespace: 'f9shzwrzd5ky7qrk5gn95p9cc32dl3c6j70avqu1ns49nrjusa4g6i1owvym8u70dv6hkcrz46ulbupagp5gh0ieyeefevhlafrw1f2jbhoqjb4dqpzqgvjdqv9mh8fp0pf5yfn7ce3ii3banit1yps4uo3mtyl1',
                retries: 5537642473,
                size: 2226190432,
                timesFailed: 3334900370,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'nlprw3s1qt64kj5o8d05k96f154t9q1zv9lo9cyyj595tyclom',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                
                scenario: 'lv8f1wpg7fqm43k1mmim98ai3r1pxjwrkxm5eag9ujsrv3h1lqefw0d80ob5',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 09:20:46',
                executionMonitoringStartAt: '2020-07-24 03:48:05',
                executionMonitoringEndAt: '2020-07-24 09:48:58',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'p0g09x44hxtma17y4ydiyo919qn2ugezsg6wqx1blqo0lmgnovfw9d1p7xa9qxhf651qhzex94l7w11pkas87a1mf49rtx67n01tutvgvv7ss7jpthf09hjbk9mfvimssbmiok8444xkrsv2g5a0qulwxl5isf99',
                flowComponent: 'vdwnh435bjpkz3v5up8d7zvj344pl4kkr9bwneuvcw58705a14k8k3ryr1jcdevwvxtb0q0uuss1s1n0kz38w28yd0yp3mszncsyrb4r7g1c1lb5wl26r9vxxn3xkcs8jlmjplj8h1jmes3pq6x08fp9tilc9p7i',
                flowInterfaceName: '47y05djfob1k58b5w04y6uzk4q3vom6rpkwuyrefhlzhrpvgt6aw6jb1teu5nl4yyiif49m1w4rdtd6pgmf9k6j343lpvdp7maz5y2hvqovq810yu734hum5g5k2vh35t2njvp33fo6rbxlp3p16rxjuilqbopel',
                flowInterfaceNamespace: '96l7mz2vwmreaao8nslxirnh3n7heh64s2yoc09giv5iblgrjayx187rgfitsb1jd4xe77g41bnfmb6x513391nr5hvbbws6uv8vndzyc6945kv55bxwvgtztbb4vth55gcg692hh5n9o9mjcr8prvzuvo5r9n68',
                status: 'CANCELLED',
                detail: 'Non amet fuga. Omnis eos corrupti tempora aliquid voluptatem facere ipsum eos magnam. Est aliquam non sed voluptas dolorum molestias vel et. Soluta dolores non aut quia provident ab et eum id.',
                example: 'gngn7uawdlnm9041gtw8bmxipyrgemlxhtjv2d48hdxs34vitfk3bjwz9wtjqpdh500g10l9ozv9jj8lzhl0gpia4h3g07bz9w6eli8ottgvr1upv7luri9ceu5estoi2jroi1l7rin7mh3pyn8hztnfh81p9yn1',
                startTimeAt: '2020-07-24 02:13:40',
                direction: 'OUTBOUND',
                errorCategory: 'fwblbvyjav8h6l2xyf6n61eic6lkca9wq3o0c6i6vmzpxjt0p5bsfj3rb9kol2nojp08bfppxhu3suwxp0avaiamvwcwvfoigqdwaq1no6v65m50zyp619sc7chw7hek41hel1m77uveiz7qles2sx0a4uqf1yyh',
                errorCode: 'hcekgqg0jcr25j6i1h4m',
                errorLabel: 469222,
                node: 5970682284,
                protocol: 'a3i20vcekf1w4puiwbsi',
                qualityOfService: 'ukssirzvmc2rh1bvq579',
                receiverParty: 'do4tuz5dkmzeqefnd6bxn3h40js44wc8nu2unk130a454crzpip5bdldxwmiggz3c64198z5rmfnog3m4axft53kcgx2wx7p0fi7qzys11rzaugfhc1mm0qtz8x5o439lzpuq5bnrra2960p3a5k7gh91c64dvjd',
                receiverComponent: '6thg5ybvovlm7qhuvq1fp75jo0ryxhqsq2plm3gs5mj4pnk18c7s5m6fl64vodihjcj7btnp14e6j0944386aifl4y558kb7p7xj4buev7s7afm22kcbbndnnpnmkjgebauzbgacstme78gdoiarqgnqt45bmdm3',
                receiverInterface: '7owoet852mlb9ln44t6fbha5pfl3tmy3jwuj0iidfa19yyghyxn06w0qh4lm374mmksiwhnmrpss4pwz94wz9oaism1m1t7gku6za34a9yfdbwzen88xkqghhsnit3t35kaxo4yg4zr3q1dk3kv5fvq3m12zd66x',
                receiverInterfaceNamespace: '75cn80zmo06pfl8agb719f1r1mnwqfp0kpfbu5wyutbfak8sf6uij66j0bl3c1xgzhv8t6drj073d116e2fkv4tg0x9v6bwiivrax7oft6fpwi5smnywscfsqa5sedamssq1ucaec535e2vehymeyytb6h404onj',
                retries: 2585079083,
                size: 5133793535,
                timesFailed: 3612031777,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'oyjqa8nhtv0vth89nayvzbka65k8i76ia42luut4pl17zmp03b',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '9t7bdyq2m4lb4h39rese',
                scenario: 'qjw90qmsxl3nphfmmv9du648efc76ixr594r45npre53eokabdu0mwbd277s',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 15:53:29',
                executionMonitoringStartAt: '2020-07-23 21:13:34',
                executionMonitoringEndAt: '2020-07-24 16:07:08',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'o1eiewb8n8izqwxcen90e1rde8bn3vqkg2d4xb63rew6ncr9jsrf2d7r2avav850x3wekrxpydktmnvm0bm9lxalbhiwylt3r5m1y5ldxviyxmi0k4uzoat1dh6399fbowjvge4w6gurx6oowe8o0xotrdwr83gz',
                flowComponent: '1l5b6blio0hrfgnspsn6mw3my58e8putugqh57jsyxd27kvudnvc2p0xpp454qsdykvs2hxn9p410qi6ltokcp382jsa1wpp095n0swyfr0od9hb101i5essoo1bjowa6ewugko81idg3p4um8ih518jynq8qnfd',
                flowInterfaceName: 'sj94737gwrm2f1ck7fdf0opmolvxnltoae0l6560x2tkes19wm9s89w9s95venljw20xoxtyrloqsz0k9irqwbcdj166otb1tj1gvz900q0vupa2fdd57ev0ubp7rzn7tmbt4zs4jxwufr1mkh15r5q8ojmf2snj',
                flowInterfaceNamespace: '79sqmi7q8i0dlcolbvfy6pznnol1r16u9y5wnqgow8fdsyxcq0hdx48gfoy7qzvmksp7355mlx60iq28kx86id541fo87t6a6je1smczk6ts0u6g7mbk45j908f8khw6pdjbt3iuv2lhh4p1sddbdzv6clreinol',
                status: 'SUCCESS',
                detail: 'Quibusdam ipsa et deleniti a aliquid nulla quasi ex. Totam qui corporis vel. Officiis inventore omnis repudiandae rerum non. Sit ut et quo. Sed nihil et ullam ut possimus fuga omnis ad ducimus.',
                example: 'yr59af1aasybp5tuelw9nfmvt3cylcy8d3y7wxroeft38mzwut0dfos9t4oxgdue6kbbn4kxbtavquim5h9060rz2x7t7zbgqhsqbm7y7u69mhdyrh1h5xoaap91dcmm0l2kpms5n47uob15lbrsqwtq3987wzg0',
                startTimeAt: '2020-07-23 19:07:58',
                direction: 'INBOUND',
                errorCategory: 'q41a7yw2v0ygncmgcahyz25872yy6jlqeuyghbwyckbmmt9tvska783y6fl4yxbamo6lbchibdbgea2klz12i2b2jsatdbk5b4g4306eyulybs9p5sw3ntfcacmrka68bfkuvq09jvqu3idjeqt1j6eni2zfdtc2',
                errorCode: 'ylajvwk8wheap6w0el0v',
                errorLabel: 574897,
                node: 7869790294,
                protocol: '3ou8umfuvdpie8ker634',
                qualityOfService: 'kxf03nb0mkx7j6r2aaoy',
                receiverParty: '84ptt74nhr9nwvq7u24ta81d1vb5gfp34c6lf300k9wz0po7tice4t9jxqucmv3lk9iz53vhqjoa9prt3w11h4cimw3koy9p50wmelvf0qegzc53e7uufz3wepoc8tvqf42du0r1984x7losy2ai9hanr1h1931y',
                receiverComponent: '1hkztc29xlq6hg72aolmxaxf7qx4cvuzxsr3030k3mrm4indb68ybuzx9rkefbqcvmau79q8loh97bgnr5dshusyuz4mpgpoew6u22y7hejydhw331gc26gvqm9nrvwmy0s1zqhfplpy83ytyonboy5hg4tabjoy',
                receiverInterface: 'k0t20zwor3bqi0ydthd9pehqh4b85zxq24ltfis1yy2gxo5mh5cu95eaipfekr36tsipc2944294dwsq2yo03c3o7g9mjxw3lk0p87n29l21pnkqoxlv1bbn9tde7xa3sg1nqiujfzszye2veiyrvtwwpcsv7mx9',
                receiverInterfaceNamespace: 'd37z5gtowmtja8nnea96iwdlg0ymlb4rm2awix1feirput590a0iw6p800bqs208zm5xm1mywf5pzv3bkozppf5jwnc4pio547h86omug9581kmf3gsq29hm9hket6xp0aqgxs3wccticoqss9kv5vtydyt0sgrn',
                retries: 4777347642,
                size: 3796536462,
                timesFailed: 5971567387,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'na5ch7ym8h7tvbe3wizig2798jk9pw74hredn957fwm021ayew',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'oj1nhow1ltgrxpdxa183',
                scenario: 'yjlwkir25w6eubjk2y8q0lukjdawv3s0swkl43n0poz8n8a72zhqzsd8d0xv',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 03:55:21',
                executionMonitoringStartAt: '2020-07-24 00:40:39',
                executionMonitoringEndAt: '2020-07-24 13:59:19',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'zcghpzgsl8lbvhqh9h5v4rjs3kf70chkaxs1iw8s7t7nt2wknq1za5ndz9layl8k4emdu9kd4vmengjtp7hf5q12x31o2yqyd7hf5zpozskhawzn5hfkilqp66v9uwp4qsqsuay0w88ntp4aj0dj692vuzg4fmzx',
                flowComponent: 'lwr4im2os9y5evotyi4eyzinki3inqys2pw3ut0dyeo3oijixrmqiabaf6n3k4ws7udxrsmtdsio5ysi5lbf3xqb10ijyjmehoe1utnh3rjee8hyduquqyj7qu22y2chhompzkq0s4w3sqgq0l89mm0kmdik8jz4',
                flowInterfaceName: 'm94z50zkg12kwxv3i1zg8zbaosybg3bntr4w5w7asqwy0tc092dp0plaif1luko7sjxtkuo3axmts762httj7cf6ajknlab47wt8rt8z4z0o1lllarqfk7c3dvk7amkdp2rj2hkg6bh4nqlk24nancqamp48yf56',
                flowInterfaceNamespace: 'f4zc4en5x3v3sinlc4mnmkjw71uazsz2ticyqid96ojpykvabvvf6feo7bzcr3ps88cj0bo1dhcf6kitqsdzmh4xzckkfr5ksfocdcc7im94zzalm2lcogh1jzkovjr2uyb31507gkopbk5qicvzvquhvwee8tdl',
                status: 'SUCCESS',
                detail: 'Consequatur tenetur dicta dolor distinctio dignissimos aut ab. Ipsum sapiente et harum quasi voluptatibus iure sed quas et. Laboriosam quibusdam incidunt in aliquam nemo maiores. Dolorum cum itaque illo harum consequuntur.',
                example: '222w9wfw8ko219knnjn59mv654nse4kt1h35c9ky5idpzqdnc0zjwgy3fxrkxhxxjdfk0fq2dh5lh1cn3xzgjl3kl70q9ydaay5u8l9on6dn3cxbmm4dxqfqfx0185zdrsc4c3ek6rt0lf7uugfw68p738tndl0b',
                startTimeAt: '2020-07-23 21:15:09',
                direction: 'INBOUND',
                errorCategory: 'tlbq03fmsk3gid1475xi6jxbkgcrtjcxunw5rhw4ursbd4kgpjns2c2b6i4y48blzxxggavjghdqhmwf81fo2bdgfy40hpgl13drf1aah32mmveqwbkfn5lrukhn2w0po8txx0xjnfgx4411q9nbme1h2muz5wfb',
                errorCode: 'is684quztxmrlvvp5p8j',
                errorLabel: 658813,
                node: 5475998284,
                protocol: 'qjlz9abnkd4th651vw25',
                qualityOfService: 'jgb948xjs8zwf62w85vs',
                receiverParty: 'vn9a952i6ozgzf4vmsr36wwygwxhutvinjfretvukx7vh70a6ekq5n3yss3mqua6lw7mtdld3xb7yu7hnc7hygb3xl1y4nt6nqmrxb5g4uzvwukmegwl77x75wfni385xrw00bhy08hs9lhdtsc19pc3wujwlina',
                receiverComponent: 'ojfztf7px1vn5hx9gsbyx2uz9y69rqqxxxfrb5xoiv4usndyvkp6k3kj4teq6yhyd55wo1ajg8earlijbrlp346fh5l1n0fim0ptlk8gbfgp91yu8twl8ekco6s1v9usv2leecgijb1jqn3kmsuu25nst4pnyzdx',
                receiverInterface: 'fza6dqv61zvu8cj6driopabykonraqb8q3ixkjjrceepj01f6jani8m7qnjzonfw15bmkvhwjq5d5352u74k57hrvhbcif8tp4rsayz7hcs04ia58robfel7nkn47d6njefzf4oc3od0eo5eiezqf6q4np9k24pv',
                receiverInterfaceNamespace: '8qf9js4eedj1f4n4upb1xb1fg1xr0amb2ipurd2v0n6grx6qtrt3mnrap613zctuw9skez4jzn2td0pd21l1nnft6g07trgqofupz630ypevk7uo1cemk9vu0qz3uzmnki9qxg0xwatfegrq250vk5ju7mwfloeh',
                retries: 4828223105,
                size: 1706689151,
                timesFailed: 2058963372,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'm0lgtlpfu922d0tuicxbuf107ab5eafdk7l5k00ekz5r9vrt1e',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'fdwyc962tcozqft7588p',
                scenario: 's8n6yjwapx6ze9wp56ptjwaepl6s644ox41dlcyga2rk1u0e5sy6v1o6n9ur',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: null,
                executionExecutedAt: '2020-07-24 07:41:37',
                executionMonitoringStartAt: '2020-07-23 19:17:47',
                executionMonitoringEndAt: '2020-07-24 03:51:56',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'kvws0nc8ly7yqsh7n4or5l1tz9eqxk1deps55l3o33y6oczovpo5ftcy5dyurhc2xby0jtqnepshzf00iv1djk9r55en9iss3smkgp1tjnfua8x9omjp9vwa0x04bxkanzvy7yorijed8hve0js0t40e5pao5h7q',
                flowComponent: 'kxjgp40iogdyng1yhze6hfo4tsrskdbcao4qfeq64z9vy5gxo12g75c0vud70mruibtkptzr1lz0cksk2tg822j1ocx01pyf8sij4v0ka1bedjfeaegs61m2dgr7qq49bg71epsgc8vjh929huaz1wjmgc6ook5q',
                flowInterfaceName: 'tg7c50l256uy1g6m9tqdpnmlf8efj00a2o1po44k8wyq7mf37fha9cweszx818fdvuhjh2jashquglidehxgzr0b478poxm1zzy7oszn5eictabtbi6veiptc5bmzen9756tnu6iuzwli3n0q4jvpxd1jfv1xmmp',
                flowInterfaceNamespace: 'ohet0nmtfipie8sy13ugu6w182dqrbhnsxcjh6f5n7w228g0lh7ynmy3stbpvzijaefvps3tge9q1pfq04t660jxhio3ampaicmkq255nluoqt7r09p68jpjyukwybv7z40kz7fajatomtxrqfnlhv3na6w3slw2',
                status: 'ERROR',
                detail: 'Dolorum et assumenda aperiam sapiente vel qui sint. Sed cum dolores et delectus aut enim. Voluptatibus vero sed animi a. Et distinctio ullam sint. Unde maxime ab enim et.',
                example: 'iu8c331ur5pj75o6cmr4zdnqbd722eoswutrln69hmr50qlkxzkurhsm8x3inhulbze93ryeq5nmerpvdeqihtj4dr7ez4cp26oyk7y73ogr3y1yxqnqi8at06wu3m5eny431c3v9e4w2jmz4obfqyxz8hvd2mqy',
                startTimeAt: '2020-07-23 18:57:00',
                direction: 'INBOUND',
                errorCategory: '0oy39vogo3r7bpny5yyxhh5ww18jopxlkpkt6xik2blvstc2fpvya6a7ab7bheu5ybvfpn4ox0v2on2h9x5fu622aq8jg0us4b1du4sto0t2jhy2hb50i79et22q496ynmopflw35y2uifdyhwik6ulfesqpdpi1',
                errorCode: 'fce941nb8pvsmv2hcbzv',
                errorLabel: 240024,
                node: 3647516141,
                protocol: 'qez0w52bsnzlyu5xvjb6',
                qualityOfService: 'wojy8misl64fousosofi',
                receiverParty: 'w50jyg30ldn65w32g6opged6twf4o6fskywc6q1am25d9mxknp0skbfq6wt6w6meihae6p4nafk8ijgcos9hc6zabyy84fxawr6j99ztsha4kx75fkhxpsfs7hh1aos1k66k5wu0h1alxzks550vehb1oihvhdld',
                receiverComponent: 'jtjbkh7n0i02y4u3rp3asbxwodovj3u7mnep0a1r2lp7pcvh230uqd0r704zcwf8xjl78e7g2hczxyyjlg2gftqht0rkcfyhpfb22q94nyggcrgfeqsrtvxm72oy94c1na7vtw7qs1wetbxombf79shgwexqs5z8',
                receiverInterface: 'j6x6yjsi9low8nb58wi4o3iwz4b6q2juvtmyu91snpiw7i6fah21ijegi0dhfj6e1tbeaij54rxkjq696uycqi0u3y7iroher2er7psn6enmcd555wlvhjyxa5g6gssl7fuimjulkkfck14d099chee3ofrjl89x',
                receiverInterfaceNamespace: 'wz0nttfyr4whgrp1bdznwf76d2o8dip2xywixagqn02heon92a12wdlzfju3d2kg1q5fk42nmztsk65tqhqgmlg9gee1a5u7wrzby4qgryyemc8ctnz91pen7f0b7hddxjl73obqinjapggl2nsonsfy9whqvh6c',
                retries: 8150406230,
                size: 1631474152,
                timesFailed: 1491665908,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'ng5004x0vvq2et91jkar08oaa6kp8n01eo9dya5ek0kdg3566g',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'uo47b805jjtnswdjygud',
                scenario: 'h75xbn4uw47ayv02bdsiyplu18getfchh2eejjhzpacx75jtnl83zcdqxs46',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                
                executionExecutedAt: '2020-07-23 19:25:56',
                executionMonitoringStartAt: '2020-07-24 12:46:52',
                executionMonitoringEndAt: '2020-07-23 23:55:00',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: '4bcz285xs7697hvjgb27ysw3hufyjsal1i3rvhzub82s7inme69y1xlyumjn679ls07dk2wvmvrsgut5g2l8zjj12xv56f9w3tamwe6q3y9nw7aiiqm7qyhos4vhgmpy0yn7byagm8w7g7vk7uk8zlzxo8dlft4b',
                flowComponent: 'ucm4k4lm41rblyfnzi8klmnlr17fxa6o3tyqnd5tc10tjy9dawdjtk4bijtahy9c5z4ej6rp55ddcbflrlwnxud015w2gp1c19fyvg6ydkh76an7n95lo0vhwkk006c7ctcql45xewmnbxx3jsqs4fl9e0qty21m',
                flowInterfaceName: '5z6ykoveoifbqwmh4hvr9wo00f5yyklr0qr2ii3aeqiqxxux6p4x2lu0qe0lgbikk2mj7xdsezg235y753ghy35lycd5jxphyt7djmm9czdqvy89sz2owq3icw1ln124i83vmx52q13lp4yz0rt8kd7pjands0zo',
                flowInterfaceNamespace: '2qme2t459muuoxd0u4otcv3fc9c1lmzeqniij0bsd2h8bqzpn08rq6243rrr988r57vk7h9jd4ups5nbh3irs3ye9ljb5s7ej9r0v4v19c4uojgj48ar3aj12qci3oapoi5so2ordjukq31fua740hg5n2mzmp0w',
                status: 'ERROR',
                detail: 'Fugiat inventore enim quia ipsa non quis nemo pariatur veniam. Hic quam blanditiis consequatur non officiis est aut et. Itaque possimus architecto aliquid est sed error saepe harum repellat. Et vel quaerat. Deserunt reprehenderit in eum in vel quaerat et cupiditate placeat. Earum porro veritatis aut ut sunt illum aut.',
                example: 'n4xprdzcijba3fr9coqpbzp2rgxto3psigsmaeweezk7bkdtscbjdxu2r22dmt91bzbym2bogtxsg6m7kidfqzn72l2dt5wf7v9vuqmuvt9uftgpttka4a2zh73hjxh8ezwtqt0v0gjdp55q212ayr6ugxbg5t8f',
                startTimeAt: '2020-07-24 12:12:31',
                direction: 'OUTBOUND',
                errorCategory: '9wxfnpld7i37fsplbc8om0bji7qnhi95kbuuylszg9a29ze2ldmab0c6ylrfsta29vyyhceu9jebjqwijfuv06iv6qqq9jgdnoiqw341mx83p5edt70qobkw1uvt3l9m971mbbp9k4xxzt2i8u8upkww5wjrcikd',
                errorCode: 'jet215r9pbnpmrr2lmm4',
                errorLabel: 947714,
                node: 9054491603,
                protocol: '9xrb16n2fqhlb6nxuqi3',
                qualityOfService: 'iwldpoqo72nvm92y8a9l',
                receiverParty: '6o4p94p90bllq225nafe1mztrveuepgaenq8gv6myf0x734pjo9g2k9nbs3vh0b6yf40tem64uwz4cgrgnvfgi2bwq8572apfkllezq85yq4d667s9xmm4aora92ilm7t59iwlgo5n77louysbogspecdonre04m',
                receiverComponent: 'mhvnaginaknpaim6gil3r9vz8bgptrwtk6r7c8m7wptpe1q0v6qpxa7h285vg4nf0t3ps6i3oqmpurans0rxxeqhunsyc2l5v51y7mg56fw4ri793qyrc533a7hou5h3943dv8vk0urpzhix468glgt0tmfhvb5v',
                receiverInterface: 'b5g2c1y7x0ibcjm53utd5udz4on6ax6p6tuzbmy4o8v4wy0xc80kjfegvk4hj87okvui2g6o8a028z72upetptx3moum8lk9yq487wcy7aw9v9xu6y432hj0gmjdr99wh2erf4z2osav0xe83yjt641b1q6135m4',
                receiverInterfaceNamespace: 'lml4i4s51vv673nt20ruk7yiawme7jhbt8sd2rpcpxhewoxpy86ji2nt1d2bz334ijhu84ax1qtbv824qu7qn611g5okvo0dbp1lt6jam7x06y7nztz6wdg1px49tzcaeui6jh2q5ehpqosf3nq7eci70p2h5nyb',
                retries: 6731814913,
                size: 9769728866,
                timesFailed: 8129867921,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 't67jw7idi7hzxwc86socbxf7g3h8c603x0cssidjfy3w18hzjt',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'jf3kitgt2upreuntsmji',
                scenario: 'gpd9src5gmzsu05nmqs2kwt6bgctudqiujkrtdukql7mz2pr49spyo5fitu8',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-24 03:33:11',
                executionMonitoringEndAt: '2020-07-24 05:44:00',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'lf6vlewi1v1fthj5rzb48tx37nguq8j25zn3m1oybmcy37m1xo9udph4gtx8glzoqzljq67bi4y2x1hggp72ezyozr0gfkq1kqnxrou5mlr3fa1anmp6l098cnegzb8d1a0g8ab9qxvcr2gl2sde0gga6o2edsem',
                flowComponent: '8diog5y9znwe9w5j1hrvrhvn1xr6d0mjk3tctg141tkqa79nv5ssx6ve6ouhbflu5w6qjsmbfoyyqs5mezm2gkg3ph9jpvqrjppbjfw3gaupdn60lj5j0c56hn4rtq3ttq3u8lpi84xqwogi6k62iy5ogfjfy21n',
                flowInterfaceName: 'tsg6tuopznpn5hynb911isqd3rchjk2lcshl766mkgzeamc9gdcp1b2fp5s2s2mkmoqp7u0u9ex9rm6z74ywehlfpfypat0h7wksptgefin4w8ekz2otkibnhes37znqd5lrgnt2066uagd0zyukp3cgbwfpxfwf',
                flowInterfaceNamespace: 'i9032bvni365rd2i2pmgu5d3modc6qtnjcvcxljym9xhrnz5oe76lyz0aptojwkhj5arig8pgbydxls4eybxqozdodxup9ot9o7zhxhdnnva8bts8z8m61ajdavpufolys9gppivzworh46tq477hdwukxuydpva',
                status: 'DELIVERING',
                detail: 'Tenetur recusandae voluptas. Provident magnam illum. Nihil ad esse et ex.',
                example: '2h4zux451y7b1ya2201w33n0uot2p6ns8r34ssfdu60sgf8w116tcsgoaner11ej1bjoj3ydckotsn2ci3h17aavtp9o1vrp2cbhqw93fke11wm1cp547u9s9ejts1xklgc82eh4n8yeopzojwcq64f3smlplpsj',
                startTimeAt: '2020-07-23 23:00:53',
                direction: 'OUTBOUND',
                errorCategory: '435i08jz0kjabv1x1ur0zl35v0hv2x7u6qfl0phr5871so23cz7nvg2lfhxo33e6x7l2u1hb6f6xyk16mye6s4bh8ewgldxgghwm558k293213itevvd4bbjjwygu0u02qa07sfo8ct7684yjhojp7ls1ganicbq',
                errorCode: '4qbwr8gsjzkih7onuw8p',
                errorLabel: 452211,
                node: 8720679716,
                protocol: '1v2lo1pgfex8u2fdja1d',
                qualityOfService: 'wvnce0evcgmsoe9ir10x',
                receiverParty: '4zw0mwz12lme4gnao8npw23l49e2v2zz4zuduf0ob5629wyarsoo1ssg0l9ox7diyufvcbee7bbi6x7ddd5b6vigf2a4x9fmpkw96jbcrnwswiu1coaog8jhrri7zx273wn5nej5k0efi1gyszrzvllafyo3b2ew',
                receiverComponent: 'hmln1ma0pd8a6lzw5lhq9woqyg6xg1hlye1h9x42as987lzbliu6oh8vdfendciwxdjw13y7u5ku7ij1rcqqz6oxtvlgm56j81m0a4n0pzo7qxj1xbk3ygqr9q3rxvsfiif8bfy380azuq2ehilcmzsd0iljbsze',
                receiverInterface: 'zlc1kqs58tp9upfgkv2cct88h2e5l3n7ylwrdiogh3cvdg1s1bhbnvnti91j2irznhaorszisxhsnioo62x5gv2br8mhrqaidp8jtz2ezw04ci6vzpn5b9kdgqk3zjvm7y6klk9gyy20xh7q6t8t2f6bgx04lap8',
                receiverInterfaceNamespace: '6ah857jjl21ifyejoxgkjwtvb1qif4mm42v0aqdkvrvzn221u3jpl0k9dd0mws52ac2m7dmm6gczn14ed70ybk3v3cwx48rxwrk1c8lppbr0k13l8j8x2xsgzgn06kj0i7n5zo2ieijqf2to997k2zus0vioqucc',
                retries: 5034985211,
                size: 7422035708,
                timesFailed: 3838333515,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'x4iihmtb4nmv24a0e1k9632fgbghgybogobokk8k43p6thq0u3',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 't34t3hu44cpv1a9ualy3',
                scenario: 'hc2z1czn2mjf687wm9exgz2l0f6yj7m2n7elaaupik81ewnbhfmsp9r9vvi4',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-24 07:29:50',
                executionMonitoringEndAt: '2020-07-24 08:52:10',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'oe04mn9dilyh0fylbqloqjpvlw1c27ucmshup4bksz5gl7xrqe4n29oz5xpn7yjii43qadtl1400wkj80lrlivwqwpyyytbhf9ly3chpxti9vqqigt0fe6qrsfi3kqw51iojao4lwhdhnh68x6wtfgogh9qql03e',
                flowComponent: 'nsp0n18f4zfb65wba8o3vm2i2vr20h43arz6r9pevqtucpohowei8epjeu8i67800rz5bubxul0y2bsl1lzapsckjauvrv8zqgh4e608z7mh3mzs3bpi33iotmbyaoy5d0k2npn3a5pgrayhvh4gtc95sngef396',
                flowInterfaceName: 't29g6wlov0z4kjnagao0hg7vqedlxg46tyce6o0j36gg6n1o4k5shpvij12ssn375o99poydixm5sepl3yqr0te2rbgiiqlvebaadfa7g5kgcptse7ozd7zrtd6zlz9g8hhwue8vvxqh7fhsrbmrx6a3x3pzc6fw',
                flowInterfaceNamespace: '5ln5od21m8gclbjqytkaf7jhg1coqjbao93wkdinqrh6795egz06veiq0zrtpdmbbomi6e30ekgje51gqpw8m0sm6jghss8wb9uekyefcqd1pbyazp113raf0u7r5au452qlxeu7mm7ezxtu7pbtmfmyddjty2tx',
                status: 'ERROR',
                detail: 'Et earum assumenda quibusdam. Aperiam libero ab tenetur. Velit est ut aut dolore culpa cumque. Autem qui et aliquam velit quia in aspernatur autem dignissimos. Non ut ea est et sunt delectus quia.',
                example: '2n8h9xu02tu00b5j71sosfnwkqid3uq49x9hetnm15ewmgmr3kg3q1wjfjfazgsx8797oz0g6eh21z855ihj6dp9lwa5lovhbf9qvgzvi2v7tgdqzg4w85l2lg4k3h30u0o3iybcgrs3a1fu8z57v15926u0lz23',
                startTimeAt: '2020-07-23 23:24:35',
                direction: 'INBOUND',
                errorCategory: 'rqq1n4wiie08qia8a3j4j3n1eapjx3wmnpjx6a4iu9e7fctse9opywd7f1v84ve89r8nsjjq20926jc4u9jytdwmjj0lc7hx05seuf59bd9uwapgyswlfugz9wqcvv5u23yv9pq4ndp09anvv8ycggsu9cj47tt7',
                errorCode: 'j4k22jcaqbu9k0k4muvg',
                errorLabel: 895585,
                node: 2034964494,
                protocol: 'z0z8l4ln2qkhca6l2n39',
                qualityOfService: 'zuqarkil3ibz71xj7h23',
                receiverParty: '2qwm4rxxcky2s1l8yif6eik5qmh8knkfeczwksocipycjsp70kapa51hg78wi8mso0f8d6s1zsvc92razxtr4iyaute2u55wo2t5qw2afheq2ztvqhddjat8rqojdywltr19x85ssqnzniilr5rcbofyprobpsm4',
                receiverComponent: '4rug92em1cal3c5kk52dju7202lvkn19ufxt4qt8voos614xhibosvck4p16zqtxe8mcxi373ikpeu01s4itkofiffnmwdl3hpydoik1dn1f023lahd2ukoyfgvxkn1z2zfdwwoudpqmiuq0v5ihq4zyraojkzcl',
                receiverInterface: 'xn16b8hyosijf93tmyofl9plmcmjb8llgvu7k27ppcqeb24n8yvp87pgegkldotnworav3wpr8ti5d2yl08rcm5rnxr4lv841goaqihc44bccmuhd6m8k27hkdkd2p50tl6h5jjvavsxl4s5hack7auz2r762j6a',
                receiverInterfaceNamespace: 'wwngj0epbj01xd2xjyvv0zqz0tgot3vh7x45glm3lau2xutjuhxb57bt9vha13ltc7ivdx6h00r9i4tbhjq6bgwqx9wuox0tcqcu5mox9kwq0m0b18xhnmzg1yogty4cl0ixmw2nyrhzsjy76ugprvhh9zht86ht',
                retries: 2508781017,
                size: 2560936329,
                timesFailed: 9953888502,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'itqn60gglmptsvao59qfu31fqmm8cgugf0bu1drabpq1skexnw',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '28m817dwvm1y6scvynzp',
                scenario: 'wr82l5jr1sy10uzryzv12alyvpfk7lm75jaz3hhf395u1igad1ajtfcdj8m5',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 18:04:03',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-23 21:22:41',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'c6xalp5p0haonhhq3iylsnbuqowc2knrg627my6ogiuvhdy6z23koiy2wwyhcgcycb99adgy2c5j41qyt4lsbex0sxob6xqnq52g8r36zcrkjgxzagn8dgrrmkizz5wajrkzmnnoyh2df1sf2jt8xzilrht7fzn3',
                flowComponent: 'qvd4p65omjn1zxytcmcd7scch3cuozb8on0w2hplc73z1wmn6kn6mm58wvqe19k3reovvkddhgmyh9l80y6ea69e3i1626ggw7f7se2fc5eldb6y76o62vik19mk8cfy8psr6d0ntleogt99e9t8681g9o3pzebx',
                flowInterfaceName: 'w6d8a9gyu80m0el0uu6tyd8arqggtil0rnbypt2bf1414mdu9ggs863syr8frruz9mb8p4mmhbnk84hy28r30rsrz9b4lii5qrkh0ymsahmg25g44ax4ff7cevfzu4at1fxb9gh8q6ewe9lrbvl2u8bg3eptmex4',
                flowInterfaceNamespace: 'bfavr52vno16ithfqxsv5vk5g704kl5fgvdavd2chq14rzwaoj0r7u3e90aivsqybqdzfeplgmh5x308ghkzf0fuwtn6v8ls1ivj4wgktdf7ipc6dj5m884m8d9j85c1fs4mavwxtt6tu8yx8slwylkiogtusmmj',
                status: 'TO_BE_DELIVERED',
                detail: 'Aspernatur aliquam et error iusto quasi voluptate. Atque aut sit a. Quo sint distinctio cumque quo a minima voluptatem et. Officia dolores consequatur aut provident quia omnis dolorum voluptate. Id dolor rem ipsum consequuntur aliquid aliquid sed et architecto. Dignissimos culpa consectetur non fuga.',
                example: '2i5kwk9chl4dv1gjgolchwpqahz351ckydzrj4gkoq4ajw9xlugb740rp1axw59zero6ys9fu6ujexz2hddto4rkwsvygsw0mzphtowo78lytce6apnaoga421oo0rfaxn3zfgv8u6ts8kob6y638q7cw52s8xft',
                startTimeAt: '2020-07-24 12:49:18',
                direction: 'OUTBOUND',
                errorCategory: 'lxvdj96p10jya5w3eb63oz42n4gwwyair4ppmufq5xxa5wjdrdqti2nw4nfbkl2mf7s8loanbiyhm7ybx3gk2b0aju212dbnzppflf9riofev9iw38lclsrgtpybpe8no5rgocvgozjizg3mvqseuo8xgnklyxs7',
                errorCode: 'igdbxpb4ghtlvq49ihyu',
                errorLabel: 495494,
                node: 1559390663,
                protocol: 'ld8tdhs5womg3mntznxt',
                qualityOfService: 'gome376rlwkagrrm7vf0',
                receiverParty: 'epkrl4w8vcelt1kw7giflagm75xkshv78vz6fyvtwidykpuucadsj2e8dknh93ox3db28jwkqoqfkrw588hzvcd91c5nibjvwho8dzap6w6kqsv5kz68z6aa020a85s67bisz2qqvevaondy9zjsh4l5q6a7yutt',
                receiverComponent: 'wymx5kh5xcp56a39t3v3hlpsimadep08munkhv0xp0j0mjcrgv29g5ihk4jxui3tlw1so9i5xaa6gks6dsora699ybmmtysis0nbe1kbaere2jenuwa4fjc09ldcsyqjm9qg89stskld0751dtrkkih1wicor3eq',
                receiverInterface: 'mhxd7sgkv92axcv48pbd0jnmu4eqk3xzt4kpuz69xlfapdl24te7chxk9kgmrhhl0qfye7j4njgftyp5eltryofs004hcufey8qfz0ye4yt6xn3igtku3ay2l2u2wmzvp7bwmntjdakrqhijh64ryejxfdkdaja0',
                receiverInterfaceNamespace: '31sjxickrumbubhnxicwdwnwx3ql1vv0uvq7qodkvkxmkn4m3nseg6cvhukvfs9zc77xxwnobs63kul66ijdla9mtex3t7q1zfv39do67uqxyum54vyfcpm2socfpgxr046ovdwlbcklznoo3xn0zn5fxs03h4h9',
                retries: 9536073919,
                size: 7453425243,
                timesFailed: 4333933349,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'cayxc0dgjy3vkjdcswe88xoatsfoab8jgwfgbw515kai4i7dgq',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'frbf89gskxy98uvwdwfr',
                scenario: 'jel21uqdplu0su87nuq4b4wkiqfwkax2n1m69i9vcubp10qrfslhoc3eimiw',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 00:04:20',
                
                executionMonitoringEndAt: '2020-07-23 19:02:45',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'vczpnx63yilae0dgkag5l9bq44nzw8bh3u4tet2g736qvrkse8u43z3pvny7qnt82p26eq4ji0jyn51pgz3m9fjeez6pcoxsodxstbtosn6fwwofgnqd9qohb2eljp2vlm8swwiea7sx9vyfj9a4ivpf9ph9xyd6',
                flowComponent: 'xarjoj7txl9xiampawcaomuh0tajvkk09yrskh7zej9jc5vt7a3g5heevctxdcidam5xm1jnhe9vkx4ibyczxtguce5rjfu27psp5uo3tzbgovpmottnthkcpduwd6111elmakmczfsbmct1tjdhlbt1jyw5s0xx',
                flowInterfaceName: 'yv0u5d4mpa9q6udmekzhcxvqw7kotz9qrz834c7o97pcrtizqirr009v0hvyci3q0lgacrc1uxmm3p0bx45rffjh1aspskxgeatyji4cr2dzhc7btvtndztgs7qomc9lpud5utqtu7wej86nu4d7dpupyzsfkylf',
                flowInterfaceNamespace: '56rwjwn6cgopvb5a1sm8zc17kx7tqr95q6fljhm9h3st9ogypmgqu0794jioi9q2b2og7oxmlhjt1k9ixqasc8okiwo3bvtrgyatpo117z6jhaiz09kkdmrxpl8nuqnyxejlrjb7y2pq9r3ac10sdmr654ov23gz',
                status: 'CANCELLED',
                detail: 'Culpa praesentium voluptatem vel officia vel repellat in. Provident quod doloribus ipsa labore minus dolorum repudiandae. Et voluptas est assumenda soluta sunt similique quia. Aspernatur labore sed et vero quae assumenda. Est ad omnis praesentium omnis quia sunt. Quia inventore qui rerum facere voluptatum aliquam.',
                example: 'x2sh83n74xplovwqpomnrb3no1v0rjrpqgercsskb5f1gfylug3yqjopkvvstxdv3mk3hvkp8wowv0i81hc40muivjtt0t8ajryludwtdekkqyew5t6dqv5f7zy407ht6rjq8pttzxnv1u58fw2i0pw4franpe3i',
                startTimeAt: '2020-07-24 14:47:15',
                direction: 'INBOUND',
                errorCategory: 'dcgt29bfia3nw4gng7mub8mcy1oewz09i0958sshng7lfn4gcawd7896tmbwhfpmf3ejlb3mrw09awrk489dfg53ti864sydrgjg3bxq307z1e4jlmkjopwm6gb91nt2bdns0hevrdpo2g6gehzg22j09qinnvwc',
                errorCode: 'dci3t0zr41wj5k0ta1b1',
                errorLabel: 230957,
                node: 6204403681,
                protocol: '5g2ysuqasyofri1xzzfk',
                qualityOfService: 'en07ng2makh9gdih1esl',
                receiverParty: 'qkzmxqdxpfjtpcc74b4fyal1yc26b808b88f9ka2cq5t2ap0qtbqza37edk7jpxv7e1wylg0bsuiyr9khdk11ub92gkvzgyvzr8mneshmzbdxg7qplco2o1fgaipi2bwhif3ru58xgx5gbyssx6lvw3fbcfbzb9y',
                receiverComponent: '8bnzqh4zpp05x2nvi4u5ruqhhs8w85jlr1ig4ny4ql4jtcvt0y6b17jdajzsv0prlvl0nwx693m8oodccbetkfjp7y39zduv7ntdww2apce5djriwmyadasskhyuur0ann3srss23zk0cn718845x44drsn7bewh',
                receiverInterface: 'm8kuylhm0gkwbpc7i9noecjcs4tl9ivt4o6z8ycbaev09mly0chuis1glsl4c32aihz7tr1r9xwfqgfj8xif2bsmy0itouzfhnfx4k4uiqf4fdx0ardt3326hv224a4al2bohwekzgiy3seas5jfweor2ssjti5s',
                receiverInterfaceNamespace: 'n03195ds6zdxs6wmz98au0bhfodiiim7r19n88prri123ib9f655cwvq73l771qm77lcsnzipdp8ub0os3ovnby9s42fy0hpy0x6o25079860u8d947zjkw8di73j5fhtc4t9wvnp79ockcmu5oczeugswh2zqfb',
                retries: 9729530640,
                size: 1414644198,
                timesFailed: 3661346492,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '03oay0i8cno30s9pcbda12a5nw4f43u8op9k5w4e2qjmo5y1bo',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'eb55fv5cfl2i60ast22b',
                scenario: 'kgbxn7psjzb5lq7hspsgtq88zsm5u6iwgjox0n6e9efcr0dyu9up3ftmqyey',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 08:21:32',
                executionMonitoringStartAt: '2020-07-23 20:51:26',
                executionMonitoringEndAt: null,
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'vfxod4j44m8xvcxtsx2yu7rurvt86txih09wg1vqjt2qvfgct03srd6gvaiqgg6n9lgb3o3fw4os69rd56xa7hihuuys8544rj29bkt06pyxg8cfen3rhm79lvar5j801f55zbu28gr9x3peuogn00t8z79xy5e4',
                flowComponent: 'btbdedpkia4adyvso8uorbkl1n2t4xtggkqmjxvr3u2bkwaihuocfe965s8mpv3bgkuqqoq4wycfc0prfixxv4dcd7td2wonpk8wd7gb3360mkjikflooe8knfpn3ghz64drhpz8yjxdbx1uuloh43quoox03gmd',
                flowInterfaceName: 'yhytrjrcibubelmqil842f3pejxgi2wepybsd8hxsogv40yyo5feka62z1qc2php32ox0gvo47r2dk7rvex1kjyubb0ssy28nvde2a1rmgbaebkh6it1v816rjrcp39f4d2diy6mfb2pyr74uruc1yzd0udsgop4',
                flowInterfaceNamespace: 'h6cf8c5tagg4leal1tuwnub7jqeemydb5o23mpkov08jwc94scvreqdgrrpndp64nx2w8b3xnbp56luckpcg6dk5z30oag7qblqolyiewi10lau1fvelfytgo1pwcddxgdvg3krs7nmnqlzjbj041fgeteqd33ee',
                status: 'WAITING',
                detail: 'Sit doloribus iure fugiat vero ut error sit et. Perferendis debitis accusantium sunt delectus tempora hic vero cumque quisquam. Pariatur sint vel iste ratione exercitationem ipsam minus eveniet. Molestias ut voluptas ratione ea sit vel id veniam fuga. Dolorum officiis molestias ipsum earum nam deleniti. Rem minus tenetur.',
                example: '3u0kkblqw12dldwoept8zm3fv8sf195kue6807bhp27ody1rj4mp7gpj1fb74gl0641qowa7mz19s13ra2iupac4nnyp82vxrxuupprz8h6cuc6jyars2voxodgi1g5h10qdf9uzd9v6s3dl6vqilr4x94aa0jgi',
                startTimeAt: '2020-07-24 14:19:06',
                direction: 'INBOUND',
                errorCategory: '84v6mzn9w9740i9tq7plcwq4q0v5m9d6xms61xgof2qobaceqeyccl0xm920clo40airmuakl9cuvsfynkfy3sw9q8kw7fu54igfeeaite3wvi39dhessbz3ncgnl8culln5u7a2tb2jl9aeq9w2k5sh3qpvnwyk',
                errorCode: '5wn7oriw3dy7853ohovh',
                errorLabel: 647331,
                node: 3306939254,
                protocol: 'udd35bhk9qkr29yux28c',
                qualityOfService: 'vnv8ty74o13resng326k',
                receiverParty: '759qd0aqw46srlr1cobud5do8l4zqkf8t9q9v3h8gdhgiimjlph2k4i5fo38z8ixx5z6eey6joexnwgbypsx3ep9xebw6ch3zvc5y40u4c4d91u705ajn0v3x1kxku2zv3xh36jwut6l17s8zfehd267h7th3cg3',
                receiverComponent: 'vc94e2u6pd1shwnasel9fnpdh3p974cihadrreh5la1e2co37fqqbucpgbxzjmmht6v1eb58a36skf0oggqimv0yrifcr62wvs9cz8gzrc0puohtqqiq6gpjuzkx5mogn6b58q9lck2q58qu7nudmvsgxlcv5n5x',
                receiverInterface: 'u4ds0z6oqkep34d2ixuyfri55kcrlh7du8wdw5al4v6ts7521744u0bw23rg6yeqsjicisuc9dx0nnrsy56zkwb8owjptg4t601vt51mvcstgd42oefz0bf8nywfcrkosbmfmuwaijbbqki9fh3s3c8z3qusgbce',
                receiverInterfaceNamespace: 'xq9uhof84af93x0ogun12ero10i2gj0gc3rek9rwov24lf5tm8fn7eoj3suy9km5gbb56yc2jetsg3ww2m5lsfhv87z6vrd8booz5srly35dksatwdwgmj7qxwvgu9uy8lymyqyovtch8ql3gch4d3cq0lyiwhrp',
                retries: 3722266831,
                size: 2911103136,
                timesFailed: 6239572927,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'bctkfrvj3o84vk5rsicv0w3f4bdnxcisv4mxae2y0ajpzrtuxd',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'nlp850arx44y22ixuy5h',
                scenario: '5sm68y126kdo1m7brrufxemiw6bk5kewr6e82prpykmatnfv2ww08rcubmhw',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 11:44:25',
                executionMonitoringStartAt: '2020-07-24 06:30:33',
                
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: '7g56dr7c5zfegisluvzqo44gh6r2x7rc2tsrzweisxkafrlwrxxoicj8hrwp1og6oyx110wob93k42lfyd5fmcp1nirmqafsyii29iq7l6kva5oqek25tul0fo21w9ja2zr7x0uhbxnvgdxagx0nuuva8lavnrlo',
                flowComponent: 'e75iz0s3rt1qxpzliegp7zvzfasscda4knd6v25sx5ow7om06zpbrvivxkd74ls0gvfu3girfaqkwytm6lxix3lj1xtwpwf0pzjnzloex8tc4cy8cm397xu2g4pcdk7ytgmcbbq5h5nf29iyhy1xllsfhj8eb5ma',
                flowInterfaceName: 'iv4jp3j1le8jqbw76nh4j9numbw3bz53bas1fmm260sw3r74sx17nxnurr4h4rww5yrjyr8gbkkdryvbcn5hikqv2o483u21g92np44m2nxlx98w202893lnm8z52pslx390qk9w0aakqdhrxpgirje295b1rrae',
                flowInterfaceNamespace: 'ba6crb6pjdzi15x8crfw3el7pewgqmv74gq6kzk8hmq0je20l3chpqymnpc4y0flxxqcjpozjqp5bjpeu5yj3h5nbgm2mkg9njf2gd43uhnfiabogu7l8m3cpm9tji0heowjtbkg9xrak39uiju2fg2mrxz2euk3',
                status: 'WAITING',
                detail: 'Illum voluptas quod qui aut qui aperiam impedit sequi. Et molestiae voluptatibus earum praesentium et. Dignissimos voluptatibus eligendi pariatur ex optio.',
                example: 'g91crg3wqwbaasqt120oci9jv3f1osl7rqhtu6uaisa2r06pg6xt6x5g9cz54ddm466jugung050b5uxxroojenrfo93406984wxxjhcyygnfkw7t7dx3v9vy16ib7u6ywj0hssbaaeyrl8qn9cs6kkv3jz37mq4',
                startTimeAt: '2020-07-24 14:38:00',
                direction: 'INBOUND',
                errorCategory: 's3rwhq8knfjrpa4000rr254p1dnhqjkb078zqtgiwpfs44rbr7awdvxhomkexm6cw8hdjxl52u1ua9pbb2lbco277oqwtdnklbqv0uayufbkeq0hq591nt2ksw1jng4hqypf9oeg149m7r8xq8n7fnvertfceswo',
                errorCode: 'hvtfiwdwpoyhogu2kkbo',
                errorLabel: 418561,
                node: 1332461660,
                protocol: 'qqa3dxw40neev107r830',
                qualityOfService: 'ufndvasi7anxjxg2ok27',
                receiverParty: '52dn7jyktwi59fnvogxl1wtnqa6loghwldh8w6ud87jh1jdz82o5b2ig5q4s530po5viejj3k18hyyjiwg109wxrhlgwd5b4v9cekkhobhrzi21w6ay2f1w75gnpc91rg2pc05jl2cu1oocdww8ozffh4r8fwo23',
                receiverComponent: '6z45m0g0e16iiahme8r6v6q06yd5pj5b63qnem9o4r4r4yy57tbmpigz7g787x7t727j8xx3x74z39p5tisxvoq9nioe9nfw0t7jnx8ih8qwmga1n3up1342f1esafrzhnkb1ddqv8sry8h27nm77tb6oxjcl2h1',
                receiverInterface: '29srug7u3wmrr0bm578e6qc6qk0x1s9ll76fip96d4urgvi4rludrzt24kja87yq7ta8aqtkrzzzbqnluhip15iuxzmb94c8w6u3nxsggbfu3bbvdxkizmvo4xq6r8kon1vvkx0tn272ba44ag7kwewveqn8129f',
                receiverInterfaceNamespace: 'pbmu20kx7ow11swats3zguapojg8z2te86zpidg2f0bgv8m0mvtzyo2qxamfkzh7xm6kwqh96crwying8dtvwo3hypuwmpmtafifubm05tlhrce7uv5zyee948bemhp67hig0pptxfn4v32k4lphukxaprsgeboc',
                retries: 8036050734,
                size: 7127368558,
                timesFailed: 9725835987,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'k0i4e319lz5lc19qp0sl3kz6urqkl13t4r9kkocjskbnr2f4fx',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'uf30tnhbhjrq6wq1cx55',
                scenario: '2nnpnv8at7aogpebklbs3neqtk3fzn02jt0jwx1wi17rsxiw4q7ypfju6cno',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 12:21:20',
                executionMonitoringStartAt: '2020-07-24 02:49:01',
                executionMonitoringEndAt: '2020-07-24 06:20:23',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'sq941bmia637h5fif3ocxpombsfvtr9w3yrqvv1o4h6717mk2197g3x2r0w9cgo8drmz8i1cj4ebytw1fg4lcln71xl1xlu0rqmxct1jxcnbdrjaagsd9tpxrzfufcnn6q4wk4gzycw0cxlcrij0668khagznkbe',
                flowComponent: null,
                flowInterfaceName: 'a8jvrqzu8sr8274cbsi0htr35kcuezb6ijzdkbnpeo8wgx0qbk1c9wp3gq79hifj6jtg4m5e4zy6zogpcd345b88h8zkclpagz4i4hodkc8850mvtmwaqedf3niht58ss0djjnfh77pn155tndtwjlhk5zk7u4qg',
                flowInterfaceNamespace: 'js4bgntl2hy1vw5w5cwa3trvuv6qqwgefuv67wk9elyhfmihsa6yvcct8aha5f4zk5y272saq989b1n1bwyc75q7ip7ypn2kk08rpcrwqq07vi464wpi46n6h31g12umkspbcnx82ir45lz83996anjbjwqhg3ck',
                status: 'WAITING',
                detail: 'Veritatis iure fugiat assumenda exercitationem alias odio. Et recusandae inventore reprehenderit blanditiis. Repellat sit recusandae quis et sequi. Sit qui non minus totam cumque amet aut. Et aliquam nisi odit dignissimos.',
                example: '8vgfb4hz1g1uiz3kh6v5tfa04d2ow4q2jp4sfh3fsuernl2adjzifw5sks5qjs7qd49ai3qs32p2k0qzyz5gseuvlnzi88a0vys1xwn2tu5diqefk81vflpzml7ai2wrjgw32aue1wexbnh323u4k6cod8c5nh9y',
                startTimeAt: '2020-07-24 17:32:32',
                direction: 'OUTBOUND',
                errorCategory: 'c8rqniij0rqujkv70g3tggnx97vawr3jsb4r3m2q6oqlyfssuhglzhz7oys9elp9hazaabn24791jkm7zstkpq1o64cize6c50da2o6fjyzydm0hijrxmrobgo85x4jdt9xwwd7011t26wfl99zxp8twetu7l5vx',
                errorCode: 'hqre0okyh0x0thfragig',
                errorLabel: 919423,
                node: 7607542219,
                protocol: 'e6rykbb34wlf1pif4caz',
                qualityOfService: '5ae895r5fj9e7dhn5zro',
                receiverParty: 'rvpahef0tyujsbsraz5nttnus2i075lz7kvl1tif46grbg8qbpzl5gjswsk8e1lemmrau1hhhq4hiap6mftm61i2t8n1337167cw7toq2m2ujkwfr1ij4dc7c130dtc701tnykzsrevh6seowaix0v5y82zxdr8o',
                receiverComponent: 'qbrtkv0cwshblavbx743hnrmnx335tioygp81livz8pvksj8qtq6anue9a1xtey69715i4eok6uqm1l9zs2za8mo3fzd0ljxjlgpmb0w6mwqyue3pb4lmbi0ncgvkp6rccr9s1q6aqxd1aggkq5lpl5nkj09gayx',
                receiverInterface: 'zb9qcchidpgl1j03abkmvsbm4f3drxqiva7uqnpyp2wrb1copuch9kt85ukchxgmjkxtx9ycwcxjnfhx0nwngv4t5k9dd57rysgt8bv28i5tspgdcgtzix58cxpeaje4igg1knsqtkjiysjfu3ovdhneqsfc4nz3',
                receiverInterfaceNamespace: 'ym8ndmbzgrcbkj2slxxhur7dwkxavcmhest4pjgkuv97aossu4qcnm4nci2b4rt3pz0mzhidhbbtet0jsubaxmrarw0b2vssa62atgl2fogld0nnr3g1sfww8s5qmfx4of3dy6dkdwqte5f445pgcrrimjgpvu1b',
                retries: 7752953191,
                size: 2220532076,
                timesFailed: 1766392910,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'wkdbelyv2frbrd96kdjra6nr6wzn93396hx0gswgga9ppdqc2o',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '6bqtvr9tujcotktrw3si',
                scenario: 'ttj37togwosgeme0uudoyu1ray5x9yrtoot4hb7bw65f3cljsedc8b4ktp2q',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 13:45:41',
                executionMonitoringStartAt: '2020-07-24 16:30:44',
                executionMonitoringEndAt: '2020-07-23 19:48:40',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: '963ygywfv6nzfkwmj5g0uykiblpnvncuu86rzq9m90g0poh4s9jdfn3p06sal83icogt90b64m2ab7t7fylz36avu93cqy6cso37urfgph4welj110z5kplgxuid7vntlgb79macwnugmuj9v1u3qwn5uh2bujmf',
                
                flowInterfaceName: '7khp98ho5yecb3wm3xw1hr9xmrxl1wsez7e8wmmhxdb88xg3obq7n8wxnuh1e749wfj07d213jzcja169ea6hvr4i8wx2zly7gu3q4seorla6i0carsbqzfa82pm3b0ydk2cozwdj6r4icc3qenoayj3lcyro6tk',
                flowInterfaceNamespace: '4cy54ksgrhxq67kj0p7j780j6iwk678qvipjm9fb5ofdelf0jw0dc2k7baf3eo66k12g98ohs3a32557cowapfhw9clmj8fc3f6wdiuv7zcu6h4h2sw93nfg5u68cgysuzi0w7rybe0ryo7fcqaui6abxv7icf5e',
                status: 'HOLDING',
                detail: 'Qui accusantium placeat. Provident est et. In unde optio nam eaque non molestiae fugit sequi. Inventore quia doloremque perferendis rerum quia. Modi tenetur neque ut dolor fugit repellendus quia. Nobis nisi omnis mollitia rem omnis blanditiis.',
                example: 'few8fe6znjc8tqrjfaanvs8svx6mir4akoxt352z27lpb8npq99o5jbhf0wkmoa5yinq4wb48r7r32jq8th4qzjlb9sh00xusajtut8s0jclki01oiv0sg3o79vg01mse30neec8gkoj6o3smpu2l0fik7f0wlr4',
                startTimeAt: '2020-07-24 15:21:48',
                direction: 'OUTBOUND',
                errorCategory: 'd5qfwmdg3i234ryaanq0e7s6fougpr6a4rs8o77w2q6w4zn7lqkwggcc6eq78zpiorfeulwuabgufr8rtd8bprbpw13z81sb80r8rq1fsnie5cs2bn8wv8tg3lv6n3js7d997syke6qvv2ya0rgmt8kyryoc7xza',
                errorCode: 'g6pce1xw6aper11pq2fk',
                errorLabel: 469566,
                node: 5795015717,
                protocol: '5twlekfcb9wllr48knbq',
                qualityOfService: '377xnm4xkq7yi5o73jv8',
                receiverParty: 'sh0w3d9zkxf7mps4jprimqlkio9voehh5rwd0me1akdavzs4624h1ghkno6k1za9fh7fj18apbj1cqc7ohw8eomlkjydrh3pqu79h5c7a3775jx9x9fxz4sjxob722pzjojs21ojti0h4ohm7acp39nef62mncf1',
                receiverComponent: '4x1i4jms5nsje3qbaabmwclspl6ecet8u4gn0ed0s5hckhe74rn9fsz7n82jje0dwtexp8sdo0n9hjmr9aicof2jabbcyguepecdlar0egea2c7fembrxvxme3slktjcsp0jtuc8w3m250jh0rrjzcjwe7mm6k06',
                receiverInterface: 'k0hzjgzwyge57ohzua9dfqob3qz5driwu49lq0vx3ubeqyb075886vndv8fi0xqetzqfmjkt8tmvfve6v1wl1ywvh3828kbhwzcaok6iyw0kadklw0jdjg0862fu93e2eae991xizazhwvob5gewse20m1mr7csv',
                receiverInterfaceNamespace: '7hhzguxjb9qh2vcraqqwfkqs9x7nvpbpou3h7mymrhtrxja10fz6vkfp66y7iym2i114vj6uwkpbt20srf2v9a9nt51mpowdilire39538uditmmfo9err6ggivdh2bdy8j3dclcm4ram6ac04a6ubnhvvnj0tef',
                retries: 1460661805,
                size: 8486496313,
                timesFailed: 8045253350,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '70xtlgd4cms9exq2l4jw0zvu71jssf4lx04ezkiaki38tmjcsm',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'w39m4ruj3vrov6xbwwzv',
                scenario: 'v1jjj72e7pf7py7byxf6zl9wh5uoz2d9yb3sshb8o4hudqvctg7amctbd2dx',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 03:00:29',
                executionMonitoringStartAt: '2020-07-23 23:49:18',
                executionMonitoringEndAt: '2020-07-24 13:23:10',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'mjskdtabsoit9qikowmie8ll60fferl67hfiy91daot9uveur0r978nrfz29l95xj6eqa0zws2xdks6zwy0dn26qinaqk9611iqq863ssq3fm6u1fn08018l4t4rpdvp6gbp06rpyaqvvrlr9ns8oko2mkhjlwda',
                flowComponent: 'r1z6b6y17032m5ntwa6yyunpqui7vjzbkr4660w02zgi7w1tidu0v8hmquxxxev2j6rw21q7vlp2hj7qqdv99252jm18yhxc6vjpk20zu9yvk7isinydp65jyb3xhfr2xupwth3xirbbzj5kmkn8vj7gn91mf1dt',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'zoi5bbzmur55brstshg0ta7q7t6b290bhpvhfpfahqwjtdupcsgdp8ore5itu1eiff1ue0yzpzkx0zkknbd64lx9jly2lbqoeg1nzrk4ou38bmxu5wkmgw8ielwjj11mfoqggmgf2xazrms0it4hv407z71q5733',
                status: 'DELIVERING',
                detail: 'Est tempora soluta dolores et. Cumque beatae accusantium cum iusto est dolores. Et sunt reprehenderit est delectus ducimus accusantium porro dolorum. Odio placeat porro illo magnam delectus in omnis sit nihil.',
                example: 'gqhogacbmejhy0yaw52bfawikosbw2w653om3bfybbf63dkublpjb0q4gy36ura7nmcq4ymt5mgje8pnhdfqclov72b8ps6ougktd2r0enlmel0pki6p7s3rtuceljwsn37xlk9x1x48q1fxoafjw8ir6jourwd9',
                startTimeAt: '2020-07-24 05:41:22',
                direction: 'INBOUND',
                errorCategory: '0f53yynfqb5tz7xt9hemox18nhsmo2lslpfuvaxhgvtrhbh00jhxrema4v7ro8iv4w2nxyxwiks13ukims995r7c2r69qxkd641ty458bnxjcfxh2fl6kg940xk3j6hlp9j3x1qxzodfsg028uev18mwel9eyfuq',
                errorCode: '1dl2mj00bjft8b4df08z',
                errorLabel: 512938,
                node: 5272406947,
                protocol: 'hg7bv2yu4fq3a3j288tz',
                qualityOfService: '3h3558wu0gnm4s3lv5po',
                receiverParty: '6vtgbxvcqsqdqy9oul1qaid192a05mqk6e7dncejqja8w2lfwrwko6v7r1jajh6jdqpm1rf4xay2adhash6ajj3rtptsnuz8ls4u71yu8vlcuqlg4jj7xxzbkbwi8e7c2c51dmeprlukatmdzctdxbp5c1d26nwf',
                receiverComponent: 'qzgv5oj23qsv8ukda0evns1g0n62l9zrmnqki5n92hwrsqkz2o0x4c0tuunyfrvqvzm9myvdc7nsdyj10mn2145cugrs6txld96luiko0qvxaxj879zmfp9vicim1k7an3uu5gjyrkcageruh0vxujy2kkiy9k3n',
                receiverInterface: '0gjgu0gdycdhh2cyvux55h0i073gjfnpqog2y1qcb3tvss4xg3xvvr5txrfl6w3cfspt4grtmz03tk7ehzgiqqi4f44k20lgysauo85zwsrvbhyppmb3ai0cuyaxskty8dcjwzarbt17k44ms5tnyfawvc7cvj2a',
                receiverInterfaceNamespace: 'jscibrdsjrx5zk2g4at4we6fh6oggft7bgpux7hdfz0isvn0kxrkzrs08v0eeolu6sixlpix40auu5cenpoduhcbgqbeem98epu5gpufyou11xg25xqtgaae1j8ikfnyzp0f5likpaqpt8c0wctqpou49khstfe7',
                retries: 5866951433,
                size: 3297630343,
                timesFailed: 2889279359,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'cybcryh2fd0fij8cjkotg1ud0yb7qsspfayhha2a2kliqtkgqa',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'tespe28hblqazs806d88',
                scenario: 'b2emoknsq8zly82k701v3p04k629h6ly6ukmpwoyo25ambitqft0ktcdpycc',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 16:14:55',
                executionMonitoringStartAt: '2020-07-24 11:20:12',
                executionMonitoringEndAt: '2020-07-24 03:06:46',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'ml9kfipsjupockmzje5kdbrg5ijix1hxp7xckb061aivqyp1pscaz88ynyavcfjtagupluz6nmg2cppphk5zf3mtbxbct8v7wg906cf5z7hk21tcfhokgqfveqkof62868gddyusvwmbu1knu06c6d2kzen8ad91',
                flowComponent: 'ndf8d8v9pfr8zpi75uecheenplwqa26gd9jc1f4b5qv3d6o81cx6s13pk30pm063js6qcdriituexy445gvr7rajbe3j98me2qrphtjr0y468mkjm27jkjxmfngzmfv75ii01vxy58t1rigj55uhpuolop9osp3k',
                
                flowInterfaceNamespace: 'hhsf59vkm7jubij1zvi0zjnqe0zj273jzj211n2uh3379bcdttdduwiyplmknwwsxy58nx4974jhn5654gub6yggl4hy4t1hmuq8pmz7yozepetg5riyr5mf3xstnc7yyempf0amiu8rgp1fs7m070kz2m4fuiwq',
                status: 'SUCCESS',
                detail: 'Quidem vero culpa sed et modi in est repellendus nihil. Excepturi exercitationem consequatur possimus. Et aut corrupti. Repellendus est dolorem. Atque mollitia fugiat. Ratione libero magnam consectetur rerum neque odit sed eius ipsa.',
                example: 'iee7yu40mblxws3cludaksn7dkdylnaeisp2hyd461fl2aany3hry7glokxb7d3isxwxgnstfqam42e5yz75z9lsbxl5mvgt9vbqh8ncvx10926ewxb7ajx2jf65r6gdwsosptyxofy7jkq549m3g0nwit03pwco',
                startTimeAt: '2020-07-23 20:18:06',
                direction: 'OUTBOUND',
                errorCategory: 'n2pu6alh23ekayesj90iud6i2wdyw4ri0qt0fsdu6gqxwskb9n3f0ywefyqqspkjdx6v3xkncjbenxwy6qyvp3us3mmwikjxy30rg12lngt0yvp31lq8dmz6anvx06i43imoks3b31rku4kmvvo4vja15gymueun',
                errorCode: '52i7bwcb1sq81dy1ph1o',
                errorLabel: 913282,
                node: 5574559441,
                protocol: 'vcw696y8bm8rge0qobf7',
                qualityOfService: 'z8a9mcd1u0esda5zljj4',
                receiverParty: 'y5c5oo7unr1gwq763fmx0s0ah0t5bav3bzq5ieq9quh1plno4yvzdw8qc5s43mz8602g9yg169io4rvguqauavit6p3lr6bkepbl4af5sm81ubezce7k7xvbxkycy9h9xuk7sc2gqrwupchddey4ym8snxtytxkt',
                receiverComponent: 'uh50k5b9hnhhi34izalzu8gjid3j57kiyw01cud7qznlxfu5to5rpnnnrsm1byxppvzhyws0phbukk284vfmopt2zh8eylx3shs2wqmt13gh190evs5fpln28rjg4vj7uuyijyzvnmour6fqk65f1ng4inv64ga6',
                receiverInterface: 'f9o8bzd8skfmhltuynxnvl837yv92xb37n7lsmkdxt5zrsycnn8yayelyzf51kwc7hfynw7u41y1yvyit0ommytiljrvtrwupemfyyf1bag96bz6zxm3g1i3e0gag2kux8a0a0zgoogrqeefze0o5moy5cm8lyt2',
                receiverInterfaceNamespace: '8had9z4voabf7yr5zkrxrlotuu3vw5yzlof576mbqns1uynygav8so53db2hbvn9hj478bxow6m0176ln9ndg0xrvyd8cbzpu9vo4pmmiyvv53x0lf4wnq9tmz56eg1cr0ro077c45rtv5dwqngx6bq86078p9ld',
                retries: 3547084878,
                size: 7936447922,
                timesFailed: 9222096508,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'd1tcclug9m9y4odnp8u0maqwarxf9fwsxlv7iyljf0gy24720n',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'c95klftpinry03d829l0',
                scenario: '8lraj9haxzhqbq2fd1k5ixeuyudb1wfl75j32cg68rc81bpmqap9o8ci4j3o',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 07:09:37',
                executionMonitoringStartAt: '2020-07-24 02:50:45',
                executionMonitoringEndAt: '2020-07-24 00:57:56',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'brge1oo3e4o9xpjqa77ga7cc4i0u5ego7h4iyx9vttldg04p6h8g0detkh4m1ve3oic2ylidv7wmg0evf8853hs86f8832z1zj9npmnrpxmhq3yto8gpnzbq742xvpk09xg0jr2s6n9wfphamxl0ldoupm2i0mmz',
                flowComponent: '7v78h6dvobgskqaqgoaa8pgqzcg8bqms8mvdvnkxynpue6rldog5qxsg4ufeczt61ffwfam87umny00taalr1rnzd8j7nip0ihfjfgiqwgdusafrvbxgps6felpz0y2g06xlw2nmojxd90uthvwn0wpff40ekgib',
                flowInterfaceName: 'zksk35jjxm86f2ih6x9854bwfbcf2c6qgd9z1by574nm8dj7avshdur944dm8ydzz6psgkkc6pura0peov1da9jfg25oifpj9bvfzbdtym2uw5k3511ltsc7bc9fk83cae464dh03xrcztwxsu4fggo7usbtu2c1',
                flowInterfaceNamespace: null,
                status: 'DELIVERING',
                detail: 'Quae vel vel. Quae aut aut quam harum qui. Possimus omnis in quia laudantium in velit porro eum iure. Et rerum non sint unde quo nemo.',
                example: 'kwk3bh6tdaimrnykyo7e98863192uq44n15c9vbopf4d9otx1dw8wl7cutlcefbl7byd5wcattth9v04uxqmtk29cd08ratfmmqm4arkv5jiepo7pofni4hss4ufgc0r1fok5nqdtth15hmsfu3stovhn81cd6vj',
                startTimeAt: '2020-07-24 00:36:23',
                direction: 'OUTBOUND',
                errorCategory: 'bhmx0kswckj6twecd1lddiczujb8ghyb3v8liqiv87w2h2qsf2ran3nv00rg4ycydy7zb14347zw9phb75wc9dvx1dsuy84exa6qxh7mqzz371r9tiwj8dy60gyaqfa7fohn97mjpslbx5botlals7b8c9yvujt0',
                errorCode: '1j5r9r7d7a7tos54r5pd',
                errorLabel: 838985,
                node: 6246331001,
                protocol: 'q990udm8d2xoerv5qowo',
                qualityOfService: 'hcr9ptyjbqkqz79a5y9a',
                receiverParty: '2iczduuok3tm5xaig6ff9cjy2ir6uy2plnc3bb60ytdoqqb4hwfdl0zshhz0nzyibn37p1s5lz8e1inro9vd7ritske9y4r5izvcat6epah54c3n9fyes31avwy6rboxgibny67p9uyuvlyfxlid32e9jm92nsa6',
                receiverComponent: '8ke6tsujmjghna2mlziewmw1rqrvvu8bkeymnlwqtctzce2ulgnx834gg9toffthumf4gvqqzd9wi26zbzi162zaen2roz1ntc011eknfg120boa6cm1t32cd8cieocc3dpcldl9kdorngksp92qujt0fekbn3ba',
                receiverInterface: 'bd05ndy4atsvx17lrdqze1gszcjh526tfd3s1e6t2m24th8kdmv2khq000643uu4mqq3dyqpumist8p4goo65rg6yzzfueu82mfutyjcaqsjsmpxp1mkgd88ihquhobvzrfrphkour130plhyhl8basenevhh8ww',
                receiverInterfaceNamespace: '1p0dx2xn7js8hfuv6jrrp40q750bne0tgejub2mcigbzt6fw18bp5ur1lp65a8fzcujutlpvpjwzndiwthcq9g70rj35io53t56727xabcziwvqwyin33ffbfeq70h7bvxjku12acs2jvyuv1icsdq49vsnotb66',
                retries: 2998776256,
                size: 1646390644,
                timesFailed: 8413043109,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'xmbk4qlgb0r3z8ezk8w13b2lmltdk31f1xuyuhocffd1kzurv9',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'u9g2m06fiee2oxlduov4',
                scenario: 'azl2id3t8v2yusbr50j0yhaa01u0bozahgfnotcmejfeh3wqt5oy20xqz1jt',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 16:55:57',
                executionMonitoringStartAt: '2020-07-24 16:06:22',
                executionMonitoringEndAt: '2020-07-24 05:54:38',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'jnyy79cs89v3m0yrne5l3shwgpz8jxz0nt7mhjhdhbgl02bka5z0t7sne8xhqo2d25gjsp16gd5zga9s2s1heko5mbdhjciiemkxhtyuwgvr1a9fme0rxza27w3nij4vyufs5gmxtsfaddssae4wmhlh6n515zrr',
                flowComponent: 'be8i101h2p2v21pcj2e7vlh7beycyo4vxo7heh0iiesski3okbyoy8j8bgez3xl6oziamqyxp2hdslm2zshzw4hdre6q1gx1zvnfsynacclx3m3io7peusgmsp2dslckihgq4mz4bwkizzhkko9ua1rmby25hayo',
                flowInterfaceName: '9ytc1it2crh05d7dfd0hjne4becfmyzaacolyyyu8jymhvu8yzbbqwqs312gmwf60duzhxmavrvusc6ro69kncd2yjp6hdn03z4kltfz8wtma9awlsjbnzfe818nee22dq39zkkhn3dxfgqizqsdl52yw276og9q',
                
                status: 'CANCELLED',
                detail: 'Eveniet adipisci omnis. Quaerat deleniti iure in atque possimus qui doloremque officiis. Pariatur deleniti quidem rem placeat et. Quia possimus voluptatem. Ut animi iste suscipit sed eveniet neque autem voluptatem. Magnam explicabo numquam.',
                example: 'qci911neghuc6b0f3otzimr9v1zweh63h36j7476dwr6lwyy7qhh03iyouwu65mq9v6l0h48mhlw6olb2gleos8o2x111nvtga1yzen6yxu540m3ev3d2ua0qal1guhou9mdxoepqvdf58jfjzf1w507n5npqih7',
                startTimeAt: '2020-07-24 07:17:31',
                direction: 'INBOUND',
                errorCategory: 'fe6t8n35dz5wqxsi5xedi2dpi904terrcbktybdh4vdknn24jsupfgst77q947yz01061w5ajyyb20lun1h4utzp0aea3fghaoznzvohfdgnbi7xk4nhwo8in7297bouddt1323egs1trn6helvgbeus9i5b3kvf',
                errorCode: 'l7613f1gk65q5koh78by',
                errorLabel: 226726,
                node: 7191712568,
                protocol: 'hwn29j76oof1x2g9tzrc',
                qualityOfService: 'xlnpf05ied2l5o4bwroj',
                receiverParty: '26dmj34u999f4x2xhn9p6hbe6ats94pmedjg4ksm3ckwip3e4kwcu8ratgnzk5cwbd0cabcmykd6i2mhqtnv7tdtwk2uvb108cleqm7phdddyvg5gex3rt3drk9bmnxgwiy5xac1s8w16jpeep5wwhd7w5zciqn4',
                receiverComponent: 'r92n7ufsjum5a0w7fhmf8gujsy94d5ko3ss3vwjeuhgvr7d0cyez80e20do2344apmre7lbqqev3d8559rz2dg6adh4e0kgy6rozpnvlwahgrodbipkvvipd8v9ajwbf4oswes1kmuncq38w4hehzo3kc74c6bgk',
                receiverInterface: 'q2ce1kqof08iyirdxgud9amsfj35rraul6nvgwg9oyjuo38w3new1gidcnvxldkiaa834419wzjx0kk1rc8lcgdrq6lf5v40o195oit9oa2g420ue7t8tuvfq2jbh4l9pbdmv1upz5lkz0u77laz8c7ca5cwga1o',
                receiverInterfaceNamespace: '24dcr0z1c937rgsw176f7dc9rfl3rc0ivl3pgjgtqreynfpcb0cdh6qmjquijgb5rlcq1omvbwa6jgvkynzc3y5e7fb120y25kkvvg5lyp1sonigt3cihro2v0qnjy6f61v702y7xg2omba2wq7d32mqf065up2t',
                retries: 9183353708,
                size: 7127605160,
                timesFailed: 7397552318,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'jtxei8indd2foogn1g06kwuc3nn5uui9ktchyann9a666phqqp',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '5l0kc63z441zk41sa5lz',
                scenario: '032gxv38ff1660ce24ciouydq1w2sgjwcb7c0o2uumbnb3ge3wo68zk88k3n',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 13:55:25',
                executionMonitoringStartAt: '2020-07-24 01:23:49',
                executionMonitoringEndAt: '2020-07-24 02:35:42',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: '9bvoa85y697k17bhian74dxwkm13qpgxzn5uxwpw8uvbj35vhyfyqhu1jab5sso1os0gqsdvttzvq8ctbyl6bzr8om2by5wygl3g0h6mevnm61o5m6ni7g6737xt2k597xnefkcsd149gbqqjkyn7iuq0yi4isbk',
                flowComponent: '626zu1sr0rn6mk9gcsj0mvr8vtuiorqyg6ch3clrg8cj0fdpje9gmipumsgwsvnesfe1ity3powqettf2xagzy0pefntgety14d2h2aqov0k971lbxc6cy8cpdv2jro1rolqyml23rv6iwt088jzr1s2xtbu1drt',
                flowInterfaceName: 'j59i8g6licccqabjdtn5p2sg6bgnedbgj1yqc3ack5oecdc1qu899owottusw3uepshzmfm1g6axnzjp6mlng9kyunb91zlwbsk9gphsd6g20grj461vss74n8en751vv6gprj4pcg3cph0saotsah6t4jw5qmoo',
                flowInterfaceNamespace: 'squ5xbus9h4eaekfmw6uxypmk1ex7df320zwtadrjjwrsookvqquh9e3j38zhxxtght0abtxytcipv2qnib0qj0ebvmdgqhi233moeiqnlj93n1dhmybnaroxnqdxobj6la4xyj0l6xrdycnubxj6ic5pf9eb6t0',
                status: null,
                detail: 'Neque nesciunt beatae rem accusantium hic. Voluptas et perspiciatis et repellendus. Quae molestias adipisci sequi est laudantium sunt. Quo adipisci laboriosam esse nisi sapiente eveniet modi rem.',
                example: '7auadr7ufibdg89a329hzd92pp1rtxodes3m7l7utc1iybee4xdq0vw7v9u8iiiffk3adzk4xjh3haid53jgyyzfa469ahgjo3uysqx6maijnf2zlcsj13ty5xsinws4vk9surflh1rx0m773cmdmjii8ddngzhr',
                startTimeAt: '2020-07-24 04:29:30',
                direction: 'OUTBOUND',
                errorCategory: 'c288x3ru2e9fs8zkgauiqeca8yu31a3aj9fbw29j0ctqsvu22994ydymbuuncws4ih30nvbxu7nfvndfgp65nqi91jx1lvos9dqivil0u9owuttrcgs2xhek1l7ehaskbin00i083piblgwwl2dvsixxfs7p55f1',
                errorCode: 'u3ycoa0ki09xw0mq7acw',
                errorLabel: 701135,
                node: 9298994604,
                protocol: '602xomuniiki1lo0bio3',
                qualityOfService: 'bedhh2aueiz661tpg9iv',
                receiverParty: 'p31blj8w74wwvhwkyfh24xwapiv5gh08f9duks8x6vvm9vn6ao30vb5kfq5qq2zuj25q1ky6mf6r6tvygaa7ocbsoe3w8u322dvy4pk7rne5khx00qgtp8wmkrfa6zpgpc9eg04vfp62kvwvry2l7sqi2cqs0wwq',
                receiverComponent: 'z1rv4nteyxlvr0675joo3sw3vtmk0n1lkjbqmhd2j6klvxjo5h7aor9cei6bgmfmsnkeom9qaln754pk2bxiocqqqbhstriv6ddd3szsm8u0z0c6c1n9wc0fs5tvgvxkbzlz4yhgysw32q9jlsxp1ok977hl334y',
                receiverInterface: 'v32jm7g6ycziivfhd73uco9h1hs13rk405ijuot8pp0izqcl6ydryccdsw29vz3ujaj6jubtaalio81ekaw1y6adurtbytf2q2k0bnhzsid9f2b5ld0dlcu3qhgobvxjbrosddk54r4r402nn91c5p3xb2x79oor',
                receiverInterfaceNamespace: 'tvriroywiwoc84bl5weln35ofe3pwz3h0lwe6ogfxmxr8v18lmhji86lu7os3508dn1wcuucj7u198n5o7bqg8ay30mdwrnxavwoyt11888wtiets5agglt4qrvq8twtp3thgnsbk7o8j8mloyb7j5fu13j8d1gc',
                retries: 5729845734,
                size: 8325493403,
                timesFailed: 3330916967,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '5w1npsex93neclw72r3cthiruc2jj3hfvuez0f7clu6gegfl6m',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'f420dj6w2bwdeofe7bor',
                scenario: 'l4llgvsovvw4jzhsmohu2t1cxilwfadc8bp5i6wnzldlsyj8lp2zqh4dv9jq',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 22:45:55',
                executionMonitoringStartAt: '2020-07-23 19:43:44',
                executionMonitoringEndAt: '2020-07-23 21:46:15',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: '1nlbz3qen68w7u9v2f9b6i3yviij76jlkz9c1t8imlldxhl25uwnyr2usa0whmu6prs0o6mspddbydta6qj6i1jastvlrkmbh5rn0gh2nwtmi3wmqgxcc92sxao3kqie7x78hfa0nqfb8c2rk9jzaneoh07nntkr',
                flowComponent: 'e1ad97hl7jxzwhhqiyocv3wk3rbdkgfon2p1vmtfv8dpujloartqtmvino2wwn8qcep1jhy55nk2jx6w5z85frb02fybhnelvcrkd8bh1y5agztm3w1clpzs8bggp77im5pwmixys55ejoi6fzan6nyfiva1whbz',
                flowInterfaceName: '93o46h0mgmtjmp3dtph3hsmpd38mx2dt1b8ocb6imi2mn0l2w8ff27vtxmtw5z6r8o058e6y2n7h76n82mew2ke6iknwb3dhxlxy9fmt59gsnxygy3j6xtwflh8iqto7llwnm6brdncamqvjsxw78vt11kflv7q8',
                flowInterfaceNamespace: 'gsb008nelmvpfzkn4tnd7l12v2cu95u848r3dt3e16689fl8kpdln6133oafk3iszc5jwsq207uudkow3lm24s2mu1n7s8x9kqkvpba6vbcl9sm1mi1osgsyu06zuivpes9yjmfv3svsoiz27zc0uqi58wjw4jsr',
                
                detail: 'Alias numquam odit libero eveniet vel tenetur. Rem assumenda doloremque delectus natus. Ipsam eum ex accusantium iste nesciunt assumenda aut id. Vero assumenda laboriosam delectus minus pariatur quibusdam. Blanditiis quia sed officia et cumque at minima. Nesciunt nobis cum.',
                example: 'o0wvjdn03o3vp2u8kqwwgppndyoften087ap2iv9q17vbk9j9jvcvv851alj0xhu1r2is5abksy8fryinnw9cf86n7jsob80nf2xjb8wkcp3za7cz7gbl3bdwjmfo591en9926kyrvw5h1ue70gf1bgyxmueggp9',
                startTimeAt: '2020-07-23 21:15:59',
                direction: 'INBOUND',
                errorCategory: 'k67qykpcc9g2c8gwvd3nyvkin9x35xhe0n16d5izpc5sfkgvk98qs4jc6gdrvw40o98mmbn1zh6k8hop5n1tvkd3vco8slyd6ssak1iw4wcqrm28uq914j9bckqnyzfhh9ey85ypkkjaskdzf9lr7vcd4qw1j9gd',
                errorCode: '14lz1drv2x0h0locjecg',
                errorLabel: 416373,
                node: 3951772731,
                protocol: '16oyotne5g5cj2c2iygg',
                qualityOfService: 'u2yuhebxxp7uu7i57jy5',
                receiverParty: 'j7ks4otcewgdk5xe573r9rtz7xbzkviirxf2ij5rtjl4qnjjzyejkfnvzrnqz1dbmlrkyzxabjfg45zycxwyia3eufkh0p1mfasqael05v09wzs2rv1br2jzox3mengrk3nr7sn89cedzcywo047z6fgcg8m6e0o',
                receiverComponent: 'en9ct2gk4nm09yiw33xu389m4kcjbl1ri2znqsoddaotlmwzq5ll795je5uenujti0ayt82rik7x81mkzjy1srdpddqit6mvgztn22401jevz3v11yf3y6dai34kk5d5lxr6vj27qbn323am4xeqg0pt4zc15zrr',
                receiverInterface: 'tavqit76vt2i7aalx3bt3r3gv1xq1u5ggmeyayye9mbvchnssye3dvcskmg2t7nhc5cnfdtg7i7j2qdmkd9j4ktag3ony02coivlki98k82woz3ha23j8jb42prcmw7z9txrwc2jw0htjxv0b7ga7j5p2vaftkfa',
                receiverInterfaceNamespace: '4xxft2po2p4xs49kgaflkfixva9xmu1fo4r1n54oeql4tr4gtheln83d6qn30dmvcf7vgajyx7uognjl8e7zi6767ew3ah2ekowpii8teq89nqtqdmnsssgzy774tijw3y1o0z8dun16lng77oqmxvhfprq74mfd',
                retries: 3670651116,
                size: 6951375154,
                timesFailed: 9915476214,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'ryv4bkmrh2gtokzxxzq37m8gbq7eh5iidtbhr0fogi28fisfug',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '3aittrqah7spg4sbnbcs',
                scenario: 'i3e206qaa7s7k1tcos7p9k0wjif72rrxm0xadv79pv3uh2t9kghow25fn7c1',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 01:44:42',
                executionMonitoringStartAt: '2020-07-24 15:57:24',
                executionMonitoringEndAt: '2020-07-23 21:30:12',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: '2mou5zt1pcv44r1pfh2amxvpal68lhd6oifa0jcnxubhurky12itj7bnb2nuusxlr3m9l50fp3rjbvz88h5v9ws30z81jttlh0n43054rg2fztf7qt99rvtrx7ek8qfuuh8dotm1qnq91uul4wzakubye0znkfuz',
                flowComponent: 'gpv4mvoi9cwsfxhf09gyq5v7ts5w8u9abqen13n5fo8sv4febnygrgley6g1w6uvmd7adyx13m1j4m1rn1veqj5c0wdfolcawlod9h97xkwzopjf5heb3y9uhdhblucw4vzgfo58zskfa0ztrz55ch0qdp7yq30l',
                flowInterfaceName: 'n815r32hrgqajtuwfm6b3qwpq3pmnlhrl568crdqhybzq0ovggybug5dhja8mgvlqtpdqtdntb1h0xmonc59eny3shn2nii9q1aqsvlczra4z7dj64qzflyhfrxzg1a9pgo5dxankml2p98wo5opfvkw6z0wxffe',
                flowInterfaceNamespace: 'u9u0k2t47h52b0tqbc9040vpjwsk9eq8dp63p68soq4s0c6pm7fo7b4guzdqpiy98z7bvyw8o5vfci5v9y4vznqmgnlatncjud26zyercuc504ewaob1n0ffi42w1okeo3lufs9lqjznez9oaeh36bq6wsdhfcps',
                status: 'HOLDING',
                detail: 'Error maxime reprehenderit dicta ex veritatis. Alias sed quae non quod vitae ab id at quisquam. Omnis consectetur nesciunt officia est aut tempore praesentium hic. Neque necessitatibus deserunt qui assumenda ipsam dolor. Eos fugit quis sit esse. Inventore itaque sint sit delectus nesciunt quas rerum sit id.',
                example: '0oe7enrsokp5miz5hrfstcslw6uwdwkpy8rzh5e7qquhkhzyo67868io58z80eict6k19z82k2zdle37xeau55orwxd68jdlfcnvvbhbahzmbm2ipf0cj5vd8ub9g52so4ajpujllfkfpfekmatwqekualuchnp0',
                startTimeAt: '2020-07-24 03:19:26',
                direction: null,
                errorCategory: 'fc0n3if55zn0037vvcw58gabzu3i3vm4ftat3f5vz6nb8i60qtaxjbqs7a3sacbmn2flrkcqem5u12drkw9zkou0rrdhawngpc5l90am0eq6pw65ukohhtuo0pw51l34ncgjy76z7ftjbt2l5fx56uh0h2u1nkwx',
                errorCode: 'd893pmwsjuyyqwibqeiy',
                errorLabel: 903898,
                node: 1829956252,
                protocol: '95dbluncnrcssfdqi6of',
                qualityOfService: 'fj0zvq8sekufx5pbdi9n',
                receiverParty: 'v8elviahilwtr3wc5tzm2uq56mpjfpb62fh7hr1vclr3s75c6qmrg4zs59zj1nbamp2r8jt6czif5x1rnptiio7ob6cclzfnn4d7dvcf4ii63h5c9bphfsxino42nwl1dogoy5izt7apm1us4fegnue5t3ovmm8e',
                receiverComponent: 'sk80pahkakmsvjsc3te4zxv43a4aowzrzqg885x2j17nd5h8djbv889kgsskx19kpyyx1mapd0rk0b0v1x1rhzxid504lpk1dj341qqbg9x5n4cztrs8y9prdnsbr2s31oe2wkdlbb4j619j2l1q6l81f1mncktp',
                receiverInterface: 'uo3d5ei50cuucn9jx6owreef6d55zh6rb6pcjyo4z9t8kzortw0t8betmkce6an08xbmoo3lbgtzm5xnn9cx7ouebz3tvcxjrjh1wtfglke6b8ldbhbfj5xkrtn8mpxvhc8hxa47chjksi2dkqn4mc42yrb9kf67',
                receiverInterfaceNamespace: '9loaxcdvzseboxhw9wpwc2qv9hp7degupt75gtvcd69ehksdjna7sz0kyc07ooldxpr84lja81xxdsmwzrxndx5t2wst7s34zic1gern79sxlvszq06ed4xxk93oenmjgdnfahfnnhpsp3e4rgj5f27qdcyg7y4g',
                retries: 9254649628,
                size: 8813660172,
                timesFailed: 6175542938,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'zr76ldpom9x5m6kf4lyytlnkjyrcapfltq6g2x9oj9sylc6qg9',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'g8j8yzq93yuy7y9po63u',
                scenario: 'azcygpe9vezov4hs10bfy2mpzrwhs0dhh7x3o6kac98gf4zgiji4x9zyxkck',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 17:21:57',
                executionMonitoringStartAt: '2020-07-24 03:45:01',
                executionMonitoringEndAt: '2020-07-24 02:03:32',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'fd63odpf4fgjit4jz974nsrasqaqmq3j6gzt55g4645wvb68c6ccuh34t8jeyvdnpmrii5wjqoa2v9plu1l5v1uzfo5um83q48qfrytuiwflv2mhbnzn1unz0ntskwhuaknynyi6jby8sd59p4qb360paa2t836p',
                flowComponent: 'jjpuvmj4x2fu6nhjhffyxfca4jo2zrhrkkfkhk8ut7pc739me5ecoxj2vs4ttcg3c6nlmlmexi4fyc9yg780uucmdaovbc77rmqaimyhlxkk6ce7lb4j84vl1lqe22ap61cu52rry5h0x9b0igq68stbbbzdmum1',
                flowInterfaceName: 'kibjsu1wuercib4mn9a9fl9y0ux5m1z2bgf2p0269uhhf3mpsnr7cn5m9jhhet19e5g854cfxwraia0862ogg2axsml3lrp3lc91vzky21m9mybkf3q3uuqvpfq2qjlzy9u4tktnc590uusygnlxq551l3ueuvso',
                flowInterfaceNamespace: 'v3zrl2zn7wdudrooqaexdvaz7ip541hv3u42x35kk30fsst9foo8ccydex4ztynz7u3c7fvjrp8v837xrgfml93oc4oszc6zwjpqt9huvdh805adu1nssrrldt7alrfufxqkgakq0snbc8lds1113spqpp3k0q37',
                status: 'DELIVERING',
                detail: 'Et eum sit temporibus iure dolor ipsa nostrum libero. Molestiae eius praesentium. Illo qui perferendis hic quasi reprehenderit sit. Eius quaerat maxime ullam minus ratione et reprehenderit reiciendis. Ducimus odit sit voluptas quas corporis dolorem vel voluptatem. Labore delectus voluptatem.',
                example: 'tudqmwp0teo51kt31uhp2qp69dz4usuox8c75krsstchw22d3vvdnervonfkhz1lecddu0xn0cqgtuckdjpbpz8g2clp00o2csrep64zzadpk3fft944yq1gqtbkv3w88emhuea8l21f9y35gmw63t460z4nlqbc',
                startTimeAt: '2020-07-24 10:42:54',
                
                errorCategory: '3bzgel6xhylgab9f1ifuvc95kvd5hyqzm15k7z06gkdvzlwe4vw0tfahb4eo39oclgm390pbq8srgb6cp8k6le5tzw9a84swe6zk3abg82ted23mmyiqtise5rw88b0qj1bht99ch8yxg4vm7hveb17kc0yxv76v',
                errorCode: 'ccwmg8dlgx9ihatxtorw',
                errorLabel: 181220,
                node: 9279058233,
                protocol: '6g42ukk06anqyurskoke',
                qualityOfService: '189vrdnxlmgjfm2pkzi0',
                receiverParty: 'jc50xq9eawwdjczx9wtrh0luofgopwm00pb5iei7no0qlveav7x4d3599ocmb0pxw4mll5n5b4f0glrhtuq9wf0hnsjl485kaqgttaqppvtndn0zuhsdt68esj6ccwzboq3xj101gbuhmw4etaokus66i1z5b6m1',
                receiverComponent: '9oebaqzgsozqfq84tt3yv7vqw6bz2k7dvwk5grocblvxs2r5qd4gigub132sy4vy01y7mp2n74axugldstn0gzzwb4redbv3zef50qx611xwfvd22iwfwhqggk5zl4x7b94qheiblhbx5rpkpat5cb1oq8s6wdk1',
                receiverInterface: 'mhcs7zfi3yn6g3vn4xatt4ablh1h0ntlc0e4e669yp5zf6uv5adb4wy63zxg253xpjvaw7rnkfu476rjtfcaodo97veqzeteo4c6yhmxsy3u7wzm0l6xm0n0lgm0e1yzes7fcsxk2fmwkxinas5xjqnhnzpe2niu',
                receiverInterfaceNamespace: 's0b7bfs6ehb4aahbqj2ecn59kbj4eqk3noblprg8gfjlthu68iy3sxrc6zywpjerpyom419w747elgib3zuaf1qf8woqdeehooabqx74ljz67s01pzoktltflxr197hq8njfgrdue416eucomxk2mk4zm3tft481',
                retries: 9700248179,
                size: 8970437745,
                timesFailed: 9108208365,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'k8jj26dbwrz3pop9uwpig7fmjdij1m3kg1sut',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'arh240orbxnxp230mpgzmoyp1wdlcbn3vhom4a3hnl8zma1suf',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'wvz5ht4wx88dlxzuvm2j',
                scenario: 'cu1qmm0hl8thkmy8o6gi87p1ox2xhmo4yigjqp30vjlx4eyo31q87h6wc5f5',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 10:21:03',
                executionMonitoringStartAt: '2020-07-23 22:11:59',
                executionMonitoringEndAt: '2020-07-23 22:28:32',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'wmkb6omu6m42ycw1s73vz62vfpto6c4fodtybwn138qj6tl4g2nl8c1sze0owl78medmuq4d5m1cf5szw9ss7b9t8pia5kco8p0mjernea0xli7onpf48gk3aj3pyyvdsg37e13gnz996t4tvs7uqj1415a6txcx',
                flowComponent: 'xgupqbtwzc2j0xhc9c7hrz8rdsdtjkbbv49gc3mjuofsagkgeqmcxa5fg6uv6ft99c7v1mh7a6f16ghg2txotz9p02dgqqv2bqn146y8m0l8jij8lw1fzj1ub8ke3d1minbmp475mo6shnksdl24y38l2sp74try',
                flowInterfaceName: '3vbd5u4gpvi5th4mvayjc8yf4ckpmyzyhd7d4ajsr5lda35wict2lb3qakzcwgc50jqlvi9f09gf0ca536cwl6j5leohkeuje8mt7zzc8cgwdpsxnjktp9tx6r044l4rlt299pr7fjcxnkx68aavncg0ptyl5nkf',
                flowInterfaceNamespace: 'pcjmmuct3iaf5n4x4qy2e1kvs1hfzvst4y6hj0ol80guoijydkw59jvq89fjpicojls3iaqvq71da1qkpmwcc4lo4a3k4yzfvid94cnigjlta8883kc9gjaqm65370l1e8vgg6kp6yz8j03fatz1ilz30kxxyqm0',
                status: 'HOLDING',
                detail: 'Amet sed distinctio. Rerum quo quia beatae. Sint aliquam enim doloremque omnis consequatur sequi. Est quidem dolorem possimus. Ab quod aliquam ut velit voluptate enim ex.',
                example: 'xdu4kly4ot1cyuosyqv2nx7n84iji7nnx1wz913c1fgatgkxx8yald6sm3txne0rapii58x95sup5xoutvqeqo6n1wdj2yyuij5zt57resb5k6l816p0m6fryaat6mo5rq9r4lljkbap4nb66iib06884b7kvcnd',
                startTimeAt: '2020-07-24 07:10:56',
                direction: 'OUTBOUND',
                errorCategory: 'l59aes16dq6tzxnctwtry3ou049cuar3x0hr19swjmgzwebh3f543rhz4nkx3urlhcfmian7cq46b110vdq3x725tlbudqn47thmwfjkmha5o0w28f4yq6ff6dbzs8ypop7qiridgdhmrjvojl67bb0pyv4evfdc',
                errorCode: 'ya9c0sfhflqitj5yletn',
                errorLabel: 516292,
                node: 6001947358,
                protocol: 'nteb14qludax0hh0e4i6',
                qualityOfService: 'wiej3ywuyev77l0b9oi8',
                receiverParty: 'kl3bkxz6aw4533hcirrznd0h6ro4vl68pl13tcyiadaini671nvbtsjqm9nejwo278aglx43wsgin5kilxijas73hi7zwd53yupfkw28kua08hj9nkruvqa6447lxdhq2rfxwtaswj7nzufqpl7bzhsvlqu64uxq',
                receiverComponent: '33vp9caao0jd5u8k41zxn1a4tviqjy17793tivu379t5m6ezfdksqy6wyx04bi8efaamk8tbamwx6lkadda4srgiy93a00si4t2q3mcgj3o2lffoi05vwggxb90af75v3vgr194drtdexqx8bhoxiev92jcqf7zb',
                receiverInterface: 'v8oq9fz146avvdjgsm2ozeyb44yg6s7zid49i3griahsn1j8bksvu30g3t0aicu1h0swc2imr38pwq0lvwt0ntfm4l6ttqjip3clofpc6xbgq5k1ltu18stoad4b71hvfj4t8b37ddq978bpafzysccs33fewyzu',
                receiverInterfaceNamespace: 'yt9wczehmgcmgdlyzm6udy4jk7z5q592c5qbg34p6wl7eii03qm2ohds30e1hrkobfy5m5rh29wfgsn6yb07h9wqsl3lru3cm0m0pqs9p8d2ltivhhttt6867a2g9rqpitz6rnf9nhvkh6s74fkfgy1v7j2xetk8',
                retries: 8138600802,
                size: 1042866278,
                timesFailed: 4324149159,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: 'q32gumhijw1oxuysurt72jtfiaazfjsebmdgz',
                tenantCode: 'xslymbpdt13h0w1nnmbo3a0ralmaierwupvgpa0uv5e1h8tpeo',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '5nbbt66d0hyxmt6lbduc',
                scenario: 'e22e2coq4wegybyszymxhkd2b2t96j5k1lhk0snd5dzhja49k4id5pa08op0',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 17:41:09',
                executionMonitoringStartAt: '2020-07-23 21:13:19',
                executionMonitoringEndAt: '2020-07-24 17:00:37',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: '7k6k8jo4ppotv7fw9b4w9fkpu2vqpwlf4x76l7xfpdjvsoe28rul0e52we0ib9e7fq9h3qguxa0qnjo2t15cmh6cs4i1y61wnegw433beejzv3pz2xcy2259r2722nmsvytcj3rfovartprrxev7o32ek61gficy',
                flowComponent: 'zpcexnbvdeha594sb1qtnwnnispf3dto1p8sddngp4497wl625e94ups0ciknkizxatcu72lboxosk4bijg8mjl4cus08e1oakly4ky7onogr0xud7wwyjinuf5ejjycphr0xn2bnzrnxvwi8ubd9b9049ohlx3h',
                flowInterfaceName: '2q6tzsijm6ltoigp0kz7ci5at5tb62uppyur0kbczofsduty4dl4z7c0opf4ypk0p7jvqevjriwbn97j1gmdqnqwwnytu752p36fufvrkbxitnzk2xtlj2s4iimayprfk8lcnuuv6jvikwk7xo56gh5izcpqxf5m',
                flowInterfaceNamespace: '508tj0p9ajt6mgwfwls5wp2vxxd8wuyewc0286r6mh1x1558rbyfus8ozkjqakqckyvua595n49iog8ero236h6mad9nes7jgv57i4fuqbicvobtiwufferfzrzxnwg746d2f1nchw2wktgp5h82ca8vaat6ix1e',
                status: 'CANCELLED',
                detail: 'Et explicabo ratione. Id sunt fugit in soluta odit ea. Ducimus consectetur est. Culpa quaerat enim nesciunt laborum maxime ab officiis deserunt enim.',
                example: '0cv3wttl4neu33bocn0i0hyg4ufuu092bbfv6h5jb2an37quq3c8ewcz518d4yw4sxzbmktqc8mfd4ox7lehszcwydlw4p4joekv61pcs9fmuwc7bca0yr4vo3ova3z4tsx8ta54m43jhgvdfowq91r2xji6pdv5',
                startTimeAt: '2020-07-24 15:41:48',
                direction: 'OUTBOUND',
                errorCategory: 'd26e13vji608lks4qlatnh2e8m0hdk952t4szfadrecbqbupir6kivi4m7isvfzifxx9ln360ef65060l40nmwpzv4hi2zq7h0bds81x5mwrk8vdo4lgyt9s4icbutyy5f0hb3xxpchd57wm26usxscwyswu6i9o',
                errorCode: 'hjjj0efwzurh6q4s46a4',
                errorLabel: 564216,
                node: 3455858463,
                protocol: 'zdh1w0w24m56voa2lu6m',
                qualityOfService: '1o4oyusz0dd2cdsob3qx',
                receiverParty: 'r5mw24vx50iqqns761umeft50hpv31379dvykc81zar93r4ropdatartyulw3xyg7j2s6vyn4pbqx2mg330m3qre95ev05vzvbw6xuki0q1tahrjsk59egdudykvnpw1ywxyvhpqc95ul1xkdj6b4hiyqzefv7tz',
                receiverComponent: 'ybr8fr8e0qwx41qb8vc366oba5fjakbttn6yblkajgl6rkrjz7gcy2ze3eulm9el9xcoxljmeohmydoppdspboenaq79b3agr3yly5dqd483s3af4nh6fz17r7dm4577dwmn0lh63yv3y7jemygkhxvrm69rgh4x',
                receiverInterface: '97twdr7iu8z1l4n6gch3soodowjevack1w7280vvjh220qg3h4mgcncviuuqhapzs1m8hijh07arziq0yr6cn74a1fjhjm1gm9a7dsv2huct6tpu9ql12kbz12mk7v26979xvuf9aaytfcwgkk5tu8eyw3lyrf4z',
                receiverInterfaceNamespace: 'ypxe4sz21sbandkq10ga9qvyl6shyiqdkjzhlwoei339ghcv5dei53c9hizg5mzfs7e0bi4f5hmox733pphdkz0j3ker7jqesxvumxmkoo9efzov0b1quk4ee5985ybz90v3ioq9mytbd76mxvuhbfvl63uavn7n',
                retries: 1704243840,
                size: 3283713293,
                timesFailed: 9122317591,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'wvwim93xmy9o3iyx5dz1koelrmz72whq77mynnjeaox581p5c1',
                systemId: 'n6uz1xyat3biw6hn10iz61ufkholz7rnwnotx',
                systemName: '9q1dvqqwcw20ru18418i',
                scenario: 'mofqfdk2pnqn3g85ws5bkn6rbi4zxrqdj60hwheaahe9mx9gpqr4adn6920t',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 22:33:08',
                executionMonitoringStartAt: '2020-07-24 15:55:05',
                executionMonitoringEndAt: '2020-07-24 13:17:36',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'og1kkpzku0dgrl0squapzh8txqp780czegf41u3neuhln06tn5nho9dh5mblm3q5wsfdp2aha0vymemsj0wg72msejkuclzyc9oernnu4dmr4fo3zszzt5ro2lplqahmhu2cuzh0or8hymcujrsqovp3ebatlpqi',
                flowComponent: '8lwejro924amf5gjtzn1w49jv0gwa1ueuab8yof2y55gk79uvfs4vp5bgts63p4je4rqbvnm5tm25nyb7tf3zkfs8tk8uji20ev2vyiwiqxry25et0r4j8lq0fqd06joqy0t3udu4dx3jfilqh0wq4ksphship8x',
                flowInterfaceName: 'dv1dvk6mama9tjbf6xp76eh7hoaqahilz6bnnvujl4viohp8sv895eelek6um3nnc50tjhltzcw0uo8oiqa7btm5387yxqa7d6r4bj41g9cexqwxr7jl94j9zhyw0jsbwteyfz075a4xjq42k8wz5siz4rcexkgs',
                flowInterfaceNamespace: '74ujjv6mk6n7ri9d9gywr13l4ehqxtj07qazdgcq0uipwvk53fuzajus2t6o0pfaow4u101oh10h40mpqbl7oqc05naa2k9x11hwxssv8hzckoqaeafm5r6r6hynu663h411hoy03yzrca9n0y5s6w37qabr7yx5',
                status: 'WAITING',
                detail: 'Quasi et molestias aliquam aut perferendis esse sint. Cumque sed sit sunt adipisci quam minima id sit. Voluptatem ea quis adipisci neque.',
                example: 'oo3x7kcexaonvobhotum2mofgasp4ot6xbt7dl7fipf59of889ky7vbrgj1mkbn8407b9ntrmeioat1bbgtjx68urxfvuydnhxbw38i1rs8uvrja470zhczqo5wpbw2ccldsottzt2xbz68an822r6zs29dnds5r',
                startTimeAt: '2020-07-23 18:40:50',
                direction: 'INBOUND',
                errorCategory: 'hyab3p3wmr5ons35dhttenpbfx37d36747lsez0gfmmyol12k9fmtqebm2bc74wty3n7uyzj2v2p7phasv2qn31ybetefm6jl5ub4vojpa16gb8baknm08ku9h0hzykfor0n7dmlkv9oa12nzpu12b5t2spf4oip',
                errorCode: '1f1mq7doz8rdoc8sy72v',
                errorLabel: 597373,
                node: 5203561142,
                protocol: 'l29l77ubn5icmhcbr6b2',
                qualityOfService: '63qb1mj8dauofqx3lfdv',
                receiverParty: 'njdymvthlhipjnp5ahmqea27e7c2cmchk5erc8u6wms0djw8kjagjp9rnymx2k9pl4w46xz0kf3orsiwrheur9g9wmtewn7v36lam6bxcjkytccmjwrrlgktoruxm74unbmr30f3175z5pcwx1qgriv780jfqxh5',
                receiverComponent: 'g0qrgsq65c5vtjjgyaq1veavphyaahuod1658hu4k26bkv01g4d2rjnhseltc135mqo251xnevhyiuaao483xjaqxlwp3r9c7743w4wdojs9djkd4mut0c3f88ox5ebzvx6h89vca5lmqzv63ejrctum8hxpi4gt',
                receiverInterface: 'zg47m4qs7komxvk2qbkfpmjv9ay5h4zul6itmcyo972uo16eefqxz77n29rte5b4j5bq3peoutw24fqo4ckv7vu0dxeojkvsok4mgv904j5vf6xrgsmq7lvpobbvc9ivzhngveojnwmhi5us8fp5qdncazeycfvu',
                receiverInterfaceNamespace: 'yruhvvax069cv4yg17y97l2ekkxw5h1lr3dycvkd7zcmqtbva8863mebjk7hdpzm68dlslb80e2p43phx3wknauv7rcg3jh2ytjg3wncibbmij3il2meosl6cjirf44bfakqz2zqmtdoelhtkga27shsp52zx14g',
                retries: 9677992276,
                size: 3413153166,
                timesFailed: 9525027185,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'dnols6hq6ed7jeijc5eomhyztdsal6zqawwdccdkfg88n9zvwd',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'vcv5tupyxq9b1ro6591i',
                scenario: 'ywll2jgtopn73duynqxw5umyqvu8j8kdqxbw9esp138deq4rwhljvoetsit3',
                executionId: 'bx7syw4g9zvd6ggk8b48it5sunt4h3ju41d68',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 21:05:03',
                executionMonitoringStartAt: '2020-07-23 21:19:24',
                executionMonitoringEndAt: '2020-07-24 14:02:13',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: '3u1cy9z0zjixnvb1ib8ltmd1inehar9tue5urqojnodxfurlqsgb0fcf3kuspr3rxvaicjarmea79z60lr61kzjjteuom28i3m933r5j83cd9709sk8t2515tet1n5gra84qyeiwxjnygnv4idllq0sd2rqrp1ko',
                flowComponent: 'hrtagnxl0k46zg44ljg9u8o791fx7p2yss7dv19tmywwy6zxu0xq2aw1tysqk4phui2j7cml1i0t38y26nkaecwby6dgeshisqyca74x1y8wgdas9ckockuuqmkkszr4sffpqjtreqduujexyljbxrt3hse6ja3u',
                flowInterfaceName: 'kken0tr4wc5ba7wgfpaaxxnqs0hyr7tivziivxyd9br74sv1wwbxy6pdiuzpni45ij1ox4xahne026igzqapoktjl2h685w1a7lnr23w7cr2w32ytp40lftesw133018zpmk3assc3jedfom3kx8p8cgdbirtaur',
                flowInterfaceNamespace: 'qsha5cddemevnblwq3116qhsu8a0ej2qs9bgqrrvvsdsit2qzc37jfwtyysi0c7d63nxygcory0axnuoyq8dfq85n0e0zxajg9yxhpff3riy4jpzimnid7194novw5995khwfp5f7xckky732at09tgxytk1bb7e',
                status: 'DELIVERING',
                detail: 'Odio consectetur quibusdam consequatur a sequi veniam et rerum qui. Pariatur aliquid repellat illum doloribus perspiciatis iusto aut. Architecto molestiae modi. Sunt vero consectetur. Voluptas consequatur quod.',
                example: 'bdhovhmk7k7sgenr98mg63ssgu0rbrfga4xy9ojp1xt82t633cttiri67espa6fasrhp91c5wz51wtkb7rv7yw8193yn0zctkafuvz4rvkqg2j537rszwljd7gpkfltivt1ud45n1mduo1kfrio3pbv0zc4ir0iq',
                startTimeAt: '2020-07-23 18:23:59',
                direction: 'OUTBOUND',
                errorCategory: 'gqbq5ma9jh9to98ydx6qw7k7brjdqkecqy4mgj9veiajx0wyfh06m16jef3mi3it9s6c8ty7iwt24chbc2p3es00smvuqjixb57zltnpo7roiw4s7aq9r7n8fyk0ypx4zkr6xr9m5jzd0nqijgvhybv6nwlkqndm',
                errorCode: 'cpo7njg20nv2syl2df33',
                errorLabel: 152430,
                node: 7137500229,
                protocol: '12kb2vv0in7n58hagjq0',
                qualityOfService: 'mrcnclgpkzmnfw2xrywr',
                receiverParty: 'm0k5e3sfey2wfiv4sprkr1xhhr0rqd7ah8maorooffpdzru4igprdtzckje48lvajg3cidpolvtf1k4wqou9t9x0s1epqhaevd2jn051fekqex0f5wp9qokbaqwk6sblkk25pksumduki00uf3hhhs62v2hk0oq5',
                receiverComponent: 'fa0ts6e60xnc6w6eynnvk4oy642bvwg5dg0ag5h7f09qe1ummd52fqtbllz89xzdkzd3kdntcf7vhykvqbyrphtv9d7omg9j4ccziaca4l0qv5y634c7n8geg1o3pyizb2lmq47obnmdtusemzd4z2pyvjixh8uq',
                receiverInterface: 'biwg0jaxem45nrxl2f6bd1lpnyij5g84ahsqej37i89htmsv2cx0d6f32950aj53rkm5dx7b0wrrlo1fjtqsbck0lxmue6i1xqy3slkyqvrsum4behpc6s12xctgbqbzcjeer1g1cydefl133vmnbe2bu2gnd0mu',
                receiverInterfaceNamespace: 'ergmhq62polbexg6y0x39it09aesbejj7zzxubki4u5h68dtxsrkzld12i21r7bgldx0ofv0eaiex5yb9aya6nv2hk96opidbflhf456dfayrasnef33zmh8slwx692nk64fbpy7f1te4kbh20bpupn88g3mar12',
                retries: 2074760324,
                size: 9246582821,
                timesFailed: 7046536371,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '9tr7zum70pdk0v9bqagskwdhbjkrqhxmcndwli8dxmy04f8x01',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '631mhgu3q4j5ot3asjaz',
                scenario: 'l7trzwh8dfiahylimuncb1dsijszkspf48o8d8gwsj3taityffu63hqedrkb',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 09:29:53',
                executionMonitoringStartAt: '2020-07-23 22:30:20',
                executionMonitoringEndAt: '2020-07-24 04:46:34',
                flowId: 'x6ii3bf0cze0a5n0n96vbllq2zuu9mif2d5xh',
                flowParty: 'swrlwrn2u3pd61cwyh0x3tho4uciatb89pdzj44fnc12gaozpgh0uenp7w32clcf4k8tjsi9vf1r6yfm3tkbck0foqpujanz2i9la9qyzwpvh7f0x6u4f8ze8esc6yz0cy8by13z0p8h4or09u5dbg69a3914m3y',
                flowComponent: 'wm9aqorgceewvp01eon774rxtsfi1n35fnsbkie8u0bbo2c7mur3x6wsdto2ffgkz6ktu3yhlinpr1ebonpnazlcuxzdtnea5uvoj76q7rkg5520mdwe6ou1lxz0bak651tyjit73f1uoiuawfr4dltcglaypvyc',
                flowInterfaceName: '4qv1r9h59cf5eaytm8tzx1s07sl189eg0pyxuo2j7plvhmjuandwr0bqk893yjruk1o7chw74stck9lefbr4i0tjz0vr0ugf0xmkoa2nyoshnojakt8dn5irr0atv9k6ytyqn6t7rvuqino88stps0233omtlapz',
                flowInterfaceNamespace: 'l6u3h92y9jnp9rd3fyf1vugt1gldnyx5sg1izzrsrllganpvwhyedek4eiayvtwobwl8vn2prkad0eqr9p4jky4ley80iihfe5h2dyelx51pncstdo6v8aa5jdmf9yxyp7l445hn4nnc0tg6oh2c0qgyglfi30u6',
                status: 'SUCCESS',
                detail: 'Voluptates itaque quis in velit officiis voluptas quae. Odio doloribus omnis ut nesciunt. Sit possimus minima commodi.',
                example: 'gddiivtvt3gmqjp01r4ku6619u6ocelhmsl405k49l7vryj1j5u0kc7omtr0j2q7ecm8kfpabzorsjv9yw8ipjdm2abq4m6qxzaq1w6xqvapyx1flj6dqk5ealjo02yit6e7pcnf0n37oip7e65hxbym4x4e5a17',
                startTimeAt: '2020-07-23 22:31:06',
                direction: 'INBOUND',
                errorCategory: 'aboheiyurrlzb1zaq6yp5rrh0st10eyfdoyxh1whh6recn9kd3meoj4bjvi18bd48zzx5dbn1vur5xh63gsdmox6p5b32dspbn3yi5w0l2x0m7lbya3a4qiuv5hv8bng9lptc5r0cnd1m1354gbze1vshnhrf62a',
                errorCode: '1f8q8c5pasln66g5p5dv',
                errorLabel: 991807,
                node: 7199628549,
                protocol: '9mwraw5ykk593cnmgkcn',
                qualityOfService: '7bvoarbo9dwostrnr5zm',
                receiverParty: 'rkj7yrnnkmxwl5l60n8juaav37rdwbaia6oyse0gl3s991xsvwoc6nywl0v7d56n5f6z0us1irdt00c69rygt3d2ok8p9zhkxxc73i23axyzkpqi7msthh8alpdyf7mod3xc1j3agupvakj8wor39oxhy5vd6ogk',
                receiverComponent: 'kkx8c5f4nwxgn5c18pk8fuiyxhbdzjrufxu71maczm9jst7fex5iyxrinz2bujye43aoxzfjtn9uwmuftflftmyowrtswo5zq4qsfcleio6et7xl08v7r1n4ugjmrqtx83y936pixew5mx016gk4lxp2gcogd9mk',
                receiverInterface: '4roaym2k9lfthz4om4zo7n5ziau0loibrdtz4kuk6zmrlddpobqwpydjm4th549fpfhcupoyflurrf8be3ihdpp90xtd21gkgj9t246ukscxp6wxsc4qug0aeumdh17ptpt8rnfffpr4s399eenkzwrzjf65ieqc',
                receiverInterfaceNamespace: 'dmgmbxhocvjf06j85nfknsh1wranr1lo6vpjwde9kbejexw3fav8r0y2153vhwlm80rlc5a4axjqsetypvj0f63kfhwh6v15m01k7vv40xca27dlw17gn0tbrvrgprbrzt4ivlippn7vc9aikq8yljztai3cflmy',
                retries: 1097471807,
                size: 5055346347,
                timesFailed: 1421445286,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'al6a3av0ajng33ln08y49d6z9nzye1l6mqv298723ol0a25of2r',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'sn88uct7su653ia5ggl6',
                scenario: 'm40vym88wz9h1tcbzws1oq7e6d5f3hb1mk2cyijyzsmqjw1egzv0llp0j27a',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 18:28:12',
                executionMonitoringStartAt: '2020-07-24 03:00:17',
                executionMonitoringEndAt: '2020-07-24 14:30:56',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'iphj2uyqscy686d6xzulduxkopp5q9tw5bp8rtn56lv3dbbjlsieklfzvk6acxxcrd4swumt387o8ug2cfo6qo5f68svo9ssezb8sj1xljzcd0ti39u51mj2bfj2nh7qo7ni4mxgzn2z1rvtpvewxc2jq6ynzxk7',
                flowComponent: 'pjcdezhxcfcwgy5g924y24sbjp0zjqrqswluwtk0bqwmohv55p7edijb8ebjsaywsgcauy8h3u9rdqge8yjm6e4wob9vwxego9659ej2ykku3oi1rxasn942z4glz5xh46k7osnq5el3zwjpqs1t4mx2ekpk5cv6',
                flowInterfaceName: '2np3gme719o48ot1mryaap7ub5pwxqi6csk54wgw46s83nqhfzd2qc22lkssqw7proera1s1m0ei3juxc5qe31pwjqlt88mbskm6iy7eo737u9l4axu55hpixmkbcxclsur0gx4zwigk851zgi3c93e9j8mcu5gy',
                flowInterfaceNamespace: 'brdllr0f1qvijalljqegw923oduw4jzn0w2n7q4l1gunp70u0aqqfn4z3oydhis3r5kykiwdqt5sk59p28dhal7op58nijobzkh7ryegdk7h4xnyes0i5vr5tk7vc2p48is4d778d1vm22rqbhtmpraweczew6fo',
                status: 'CANCELLED',
                detail: 'Minus consequatur aut a ut officiis doloribus corporis. Qui rerum necessitatibus et debitis est. Consequatur ut molestias. Ipsum quia deserunt dicta corporis saepe.',
                example: 'qh7008n1n8rmum8e3pnqwbfj8yt6qzpbg13fdctz6m5nq91epqdehi3srrh56paxz18kufqmrvj8qc2xqqnbk7u6tjhkirc1wnsked7ad5phc3j6rgy81i3m90qh18ktihwd9sf7j8goy0mdsbbc7jj3rfkii9fr',
                startTimeAt: '2020-07-24 07:56:27',
                direction: 'INBOUND',
                errorCategory: '9v317ta9tqwy6p2kcyvui1m035ovc4cczuhmittrln88jh5vz99lzviq5pir7876rxmjjs65crie95zum2z1izg0vev7t43tppjf04eumsa70urkjdwyus0sdrst46ocsbvv2ijv95y1lr4yu8gw8h03y085kc4t',
                errorCode: 'pnwclkmwrbma6p5vm2qg',
                errorLabel: 513031,
                node: 6587234502,
                protocol: 'cjls6gcuvjvoz19qff9c',
                qualityOfService: 'es8i4t3qkwlok501w4m9',
                receiverParty: 'dweufkj5ov704k9e9brf6ind3r3ii93t85b9ts2pk4p8jtwo808s3ovlmfq6wd20edjwf6g8a0ht7qvc3t50l1ml896zkuwqh6bijdfxaq5z48f1kxevnb260wafc4hgiwu5dcfcif3xp6db506b7j0t36a69b9g',
                receiverComponent: '4fmzna956e32jt0ef1cpuke8lqxj9vdesdzf1rxkdmavr48gku4jlvmvgdc51iiatsagax50j9zcxqdv6cslp2h84owjnqbdjvueg74bwnilucg54lm18xl354p69plf5rh9okbo94oa03dhj2uurwis0tscg1u4',
                receiverInterface: '7teuo08oymy8coha26cpd0ehwxje5x6jr7sb8nv4gntj8vktvpx19q2dvalgkt5j3fbf05nonu85bpizkgywud5edt268dvvdbj09v0yroztlnbucqvgvvlzgbkns156igxycvnlytbr6y135ynlt4qjff1fuco7',
                receiverInterfaceNamespace: 'pq4ow5ug0e9ofwm4msu41j6xfocy69gikqcpk1s706ju7jce8ltpvna3iuhtwhiu7x0a1z4swmgif37bipqj0mt6deaaaten23pazzapt8nqbmgu26da6ta2n34rkbogg5s0qr47qprihhjbf912r1m37vkyugpb',
                retries: 9787586289,
                size: 5505090728,
                timesFailed: 7978909102,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '82p7jbznhjzo4zjubdw6oo9o6pplgt5s174mvqrfn6d90qbrks',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'vqit65gjy6cfo2cp23jzc',
                scenario: 'z7wah5ruufqvie2lr00s6rnffwuhkz28d5ms248p9xtjkg2ycmcwffdwpisd',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 06:27:15',
                executionMonitoringStartAt: '2020-07-23 19:33:19',
                executionMonitoringEndAt: '2020-07-24 03:38:53',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: '5wjlw2dew7xsui49lw9x0ydlgecylvdhkqtve3i1e0qohl82qem0ygw4vjqmxvulpvrkuc2j9gtj963s9hch8knsqkxnahpopy905ij582ilbf8x34sd0ynch7tanxirii3dnauayjc9ughmyk0dshqxgrsvdphs',
                flowComponent: 'ebccho9mktwyyoywdzbq2cat02hi3vj9r1tvblaesmf9ep5l1gamdsmkuocs7cxkgf0h744iu3ws2ctkr8eeze8x6mypfsiiyhltigr7m83d54gozzhqr5xgyes1ldw344xoq3zfm5s3c767ix3fkgaskq0bq13n',
                flowInterfaceName: 'whwt9scqnzxb5w8vsqalphi929uq6xyyd2dkjr6m61zyifiwqhf4nax951c4b382spb4g7iv5bbk3aqm6kxqhy42ats21bp63dh52my9ewx4pk6as0o6jwj9z7kegvhxisr0rfd1e9m3qrbq4wlq2tavmo9hdrn8',
                flowInterfaceNamespace: 'a2ftpka14gva0dehkxg3xona3756fz1mkkgl5213r2lsefsh7v9o309k9o66gin23yo75z540y297jnke0rip3ksjx2shlvy1pfw34rme4bmos4rw61ufzmnz6acz750m4jn2ozrokw5v6pldvzcqmw6t8r1gs33',
                status: 'ERROR',
                detail: 'Vero recusandae quaerat. Autem ut officia aspernatur sed dolor eveniet sit. Error voluptas adipisci ipsam. Perspiciatis unde culpa alias dolores adipisci esse qui dolores harum. Sint magni ex rerum. Ut porro eaque sequi autem qui.',
                example: 'varevpave4kqgm5cvca4ukbit6dc4prkt567svsqjmkwlw4jy3u8styn5laq6a9o1vhmjutwd8whdgj48c7y05do5hzvezgccf64dmoevgbik28z2zwhxptpnm3q5c32trj0kix6vsuzp5eic5lhcuhclzifwmb7',
                startTimeAt: '2020-07-24 13:41:36',
                direction: 'INBOUND',
                errorCategory: 'ptvhjmom604b86hs5dv9t7k44pjoyknrgsgmj3e66909ri09hgnz0nzvt7361bw0i95iwh5gi6slihsrepunkwmeiitr1rw27hwtyuawgqd3ne4jweo0al25y25gpcxg0uw47h26z0frwy2rykj8k8vuata21x1f',
                errorCode: 'k5h11vxs1jtvz4xwk8fk',
                errorLabel: 918653,
                node: 4493029626,
                protocol: '7v3lv5eheprs7jhn7sg2',
                qualityOfService: 'ku05aq3gu403g1zw1uet',
                receiverParty: '2bvz3wnoqy5tppgwa0ln5u8lz1dz3jzmnrzioz9fstp7xhvcbhrkoxbc4yqqz7fhoa9crjinks8kx61m555opnflah9jux02oduh6dgko600e71g5ep45p7w7woc7qfx6yqqjle86c32ezk6sald8g1tfip60jzx',
                receiverComponent: '7qgj649nyv2nwqenqrs0166w0i95lffojqch8xemw41bhfpijy34w16dwonalzb15kph158gqvao0zwpy8tuetq0746n0e8f00valxavzwroxos5a2i6fquk9cbp96hojjxy0ypscb8t2qppc4xzcie2pgo8540h',
                receiverInterface: 'h73c55fst2ocap92eo950svq597ohi78qxumhcyq0k6x2epvkpl15pd293k07f8yswzm6ewh9vvjcxivmkpl88oy9uu8zmjr9wqnuw3vbjo3ugfvtnk0twvscmeasddea0hlpjk8serpvxn80jy1c10czk89tbug',
                receiverInterfaceNamespace: '1e5rsdt8zxv8atm437eor9u4z7ogu4mcjfmq828qz5oul4fzvsf4jl0px5c0t0nsxhr2v0glyblfynnirnwcmksjkm9t1kmpvd8xdtssjm4qdw9j6cf4coyxqq9ihlq1ogyr4x2o6udsssuj65bfw1gz0jg3futg',
                retries: 6369055113,
                size: 8784815711,
                timesFailed: 5726570234,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '720jri8q2erf6qrbrqnpxxzhzhd810y1r259hye5kju13zqp7i',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '2swjceodbtp716tiaqii',
                scenario: '6sbmfvgbemgta5cn4b6d1a5nefuulknoucduee7pvbmoyuiv6guyvp34e0g5n',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 04:25:21',
                executionMonitoringStartAt: '2020-07-24 00:26:55',
                executionMonitoringEndAt: '2020-07-23 17:59:04',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'w0scne8qqev8m7e1ucoszaaknks6ttb6plap5f4h7w9in87ssft88cxwn7adjy9v3irz7j6o8l2gtx3j9iuvtvaiauauvty46au5j67a8yxenqj89kcfvx42qdklqszydxtc2wbq3sshu7eqb158dkitieweu2lf',
                flowComponent: '9wmyiiwyylk69ttkkijt4e31pzbk7p9na7t2zvppjkt3lhmspwlhspasuzrye2j1lslz8zl52br9gwmpgqmdcahx9pumclrghj59z0zh2qsagziuwes0ap1581owk0kxqyj96b8oy62wx8inrwt2ybh7gmj1xqrs',
                flowInterfaceName: '92hjdz73terw0fz9gnljdm416ayl9pbn8pnztidhwre5vmqqens7rez713evtfzq60a03ejcxlbh75rs3oyrqgdytdppqo9eg4dz9gd0aynuj9rg3i9vk60n0i6vwtbjxbtsbr9wxo4tg8lfb6i6hsjl5kxkwmxs',
                flowInterfaceNamespace: '3shpcvk0pddw9rgrl7zl8ljbztho7rrbp3j7p4xdj4qew7cdx2jvjyrccjdsfcoheq00uldapgy99vffos9fqor3hakokz3a2ac0w7lc3bsyt20i324bjxqt9d3l2xdxgw0zn5mdy1yg8ns2dd8iw6jvfy3f14b8',
                status: 'SUCCESS',
                detail: 'Quas mollitia ratione quidem velit dignissimos rem dignissimos quo quia. Error eaque qui quia accusamus. Commodi soluta quod dolorem. Excepturi accusamus et et quos ratione omnis. Maxime quis magni cum voluptas ratione unde qui.',
                example: '3kxvkb6y01lhp5lgbv6nu3jacog4r5qzo6x650nl0tvr1urd6rwo3suer2enifu7zfcx0sid9q26qo0qctv2iid0y9q6ip6i4r73k9ibhwyeiplmsxo595tz5nf39pl5g7k8rth94d38d59hp6u96esficwsku0r',
                startTimeAt: '2020-07-24 02:44:48',
                direction: 'INBOUND',
                errorCategory: 'dns9n4x7mzgke5uzu3aait0rhgt73tglncv0t77zufv40hheyri77hp0xkr5ggbhu1lcbepkzg99r4l3rama2x0u0x04esnvpibpy4n7qzv6siymjl6es8ehqj9odd1sfovr7exmrn9cjo6x9psm5bsnjp3f23md',
                errorCode: 'ke183meirdmew8rnc9mh',
                errorLabel: 557220,
                node: 5250510990,
                protocol: 'hq8wyqhkol1zkpbu30vr',
                qualityOfService: '5ifvqej13b4iszz3lsb5',
                receiverParty: 'ycslz1lxzlstrhvyqghciwrenbcxf74g29z7utgeru17z0gzhw3aiht4vj68em3smax7ovmf35qcpa8nd0lytn3oa3msu31qymexdeyi6dxpb4rj0mqeyoifstuhkc3cs9ctxdscue7q0hmob5o50mbu0q6slgfy',
                receiverComponent: 'kc2qzja3lt92gmud0g79use2wn3txvazrhk4u9tkw44o2wytm1h9vzxva0ygjshgf1xzof96jle1gqnp9dksljgsbbb3ynj6m8b48zoc0uk7cpz8uuh3rna4s8liaw87s6qa4vlhs18htv157n8khs3jihkaw7kq',
                receiverInterface: 'ywhxcgewdgzinvmfewm47ovz7w6aao4wy3wueq5y7n4uvnl1ev2v2lbjd9q72h1id9444rp5prhh50l3nyb2juf3nbe2wwoa1plv4v1sd5fh5babz2kg0dlq8e8ck6lfkxy2gbfebofkrncn6y7v918t9nzjvlet',
                receiverInterfaceNamespace: 'h3kpxnb8k1msxkctr6xp1ourapchfyip4sdz7s8jmke5bnzast6a1mhdikuvhh7ii8dy8xqctuyuoxpraylu4leyk7m4rjbm1ilbg4rqg4kzg4zcw6q0j6hlnbm87l89jsnpi8q5hzyo2ebnux0llrmdynjma7ti',
                retries: 6845683349,
                size: 8410343531,
                timesFailed: 6658773120,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'lzqttaajgs9kvjng4bv3nzqbjojrc41resuytq0p82de00n9ra',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'zbyyld8wxkfxl1u99zpi',
                scenario: '6rf5vbxydyf35b9r7k82efbmem19dem7wze1xty0mxh6qroq6thrzeno7u2o',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 00:29:49',
                executionMonitoringStartAt: '2020-07-24 02:09:40',
                executionMonitoringEndAt: '2020-07-24 17:19:54',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'rsz9annawnu28lghar0xt576asf5fr0bs8uxnof8kqhp3ztvko6k0nxvj6jhguulhw8xidlg9w92a65ar24udl73epe1wfrygtsjdw3upu8yoobk1az65aklwhb6hfjosbqs1h1fimqdom62m9k994645jatiw1ss',
                flowComponent: '7992bwv3j3l2ncut9z60vc0azdpdcdqe0wzo2vqs058qvrubo1ifi0pgvapqshcvjvlpw4cmlm27ppge52xfy3e26kikjrhgpx2fu3yrg3xcue62czwcmv0fakrw3bse6lub4yl0d1h36wl54dbl0waji663zor1',
                flowInterfaceName: 'rwsk6wibblsu92vazmabr583mnfowva2b65ki5vxs11xon8pnk95071iicleybeib9918usklk0qox0zol0qkmvu4x411ipzzw7jyfvuu1yv1l31viediuu207nnik1lpx0g8d14rwg8e69jygp0b9flelzp5w26',
                flowInterfaceNamespace: 'hahj4b1les818mkoc5x7nz7dzvrgthxo6mk8si3ufooi5hgkepnjr0ktuvfjurubqavxkwspa41vk5t935gfr0dijl1mxtnk6c9yc532qzh671x3zc7sfdf5scu8eqj2wjv3javoa0capqlxg3b8rh9q538900k7',
                status: 'TO_BE_DELIVERED',
                detail: 'Ratione totam aut dolore. Voluptas aspernatur aut ab consectetur veritatis nihil. Perferendis magnam et incidunt dolore enim a pariatur sint ipsam. Sint quidem optio temporibus facere voluptatem non. Dolores et minima nulla aliquam minima consequatur rerum delectus non. Eos quas quisquam alias est.',
                example: 'wu3dfg4jqte5d56r2b7n70ewlx0hguyyrmzronqjqaiww5wg5ikojytpndiho8o0ndau58sn96obmeswi22twfo1tb4uoy5dtwzkb8rh8zq92lgq4x72nr8cjt8gisr6azqtp3j5e28bcja63bkm23q92n6stw9y',
                startTimeAt: '2020-07-24 04:26:44',
                direction: 'OUTBOUND',
                errorCategory: 'd205mlnhypvdgytba8ouqhs6a3gjwcbc2zge8re4bicqh9ms6njox41ntv2yzvdojekrscl19azr6z4vjxwu0z1qyrs7he2osqsk666olbu61s3dzawal2hk23jwgkiszxvpvejou7do6jfy4axjw9ukc1fv7tbp',
                errorCode: '6baii4sjxwt9w7s9zzcx',
                errorLabel: 819177,
                node: 8449322257,
                protocol: 'c0psstjxi0dc9yjupb8f',
                qualityOfService: '7f3trnw6zsad1l720apv',
                receiverParty: 'lnzk6t2qpywflwsnf3z8b61np7n8umy86y932gcvcsmzzof8tz84ehzapwo2uk2o8pkycznq7a5xkz15qtbc843ugxjwbygw5px0alymyshyfhyxy33vpjq5z3lgoap15pgwfi94xdvekx3dehpgldyks961e8g4',
                receiverComponent: '1hociiuyi7vg0rcspt3pz6x8eqjq9m70gwmve5b09e2lslwpv0btwffzxv7iq3lxqo44qumtell9cds1s0yfqclfpjhbbpo2wgk0376zmpa318x0thpzz97b7hoq8ixo9348twyvbavrdizgu1ey0zh431b1k7lh',
                receiverInterface: '8de0hszv0j5kbk7xi89jn27hu3p8lm20bzfevdc2dx2f4t1vw2nnvlu9rt7okq0012uoehukht236e54c831ab1ct4duv9ddx0piocmailie8oogz8izeo324c5qlfka2yzmlvinxvra7vrfe17smhcldeg4md97',
                receiverInterfaceNamespace: '8u4iuz6ihvmdjm5z55mtfcosv1vlyz2dfdyfyq1i7wfo8h0ln8odloxj24jiwcodfmdthf9gost9gtlh67z4rcsb8spc11lcrko8rxja8hwqd0xkosjgh2sp38l4jsuiz1k5j8863ohvk9635rnrlurzja7llscj',
                retries: 7089324386,
                size: 5313170213,
                timesFailed: 4271997317,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'ppf6er73oexf4t2rthifjrr9mdyvm9g2le4xf2bxfoel0s4dx1',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '64abx7art7n44ip99adg',
                scenario: 's8x09x3rgbm7u7avdt4i5barufk02dh8dypfvof2jayggd8m2tcjmsn5xs0e',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 14:18:55',
                executionMonitoringStartAt: '2020-07-23 22:28:19',
                executionMonitoringEndAt: '2020-07-24 15:43:34',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'uxn532u3d33lv1b3clnpgulv0m5lagv6c64kqd934j9fnkzrvnpyhqnwhos80yow77n6bp2ct6049jvv78mbl9k8l9ylz7479jyizolmlahvsj0kjta4h9hnlksmzc5j5dx3p9ee1e8snnwijw7pziqq23pkqnjc',
                flowComponent: '0ms6i133rb2k9btfhvdk35e9t1nlxb9b7c6mfygetnkhxoqucu7gaarfkgw7kpr9p4q2fxq288vd3krdupehkurj1y1g3d5ur8n3tenmttw67hvr0y16wkcuidgh515oni2kn7i1ekrktp2kd4hfqz6wco71g1ww2',
                flowInterfaceName: 'hmsh6nbins95b90hefyyqmsgmzqyt85db96n4wla87i5bbs8vdjvhar79bhzkhzdj42tvkefgn6kdljrv5ow05s0jsz6osyoa48uxzfs5qnfqn662kbpybln818z4q6aj57tq94w78sl3hhnuc39jdyzqynfmgqs',
                flowInterfaceNamespace: '8s2folqcp23zvm7xs26frv9eaefhwcu8wow75qxjm4u3qrko3fwf7axxkok0oujbxnwc7eh0vwartdrh6ibbtr8c2cqbprjwgzjswgql5bimjemn5r2jj7xpsctuptkslyda6thngv26oyfpwuk7ssy07egw9jd5',
                status: 'DELIVERING',
                detail: 'Maxime aut atque ipsum facere illum modi. Repudiandae rerum ullam laborum nobis adipisci. Consequatur voluptatem ut perspiciatis nobis eligendi.',
                example: 'oq98l3jkpxwkc72fiykrqbtknnojgjg060as7hwzkh1rgbnulionaq3uue2lxtpt54o0de895k7b02htt755k9u273uh7f16qd65eb2gvwpk2mqnhjv5cfws6ujjfwfpe89pn0ot9rfcb6c21msqso9puwvjin9x',
                startTimeAt: '2020-07-24 17:51:15',
                direction: 'OUTBOUND',
                errorCategory: 'z2te349f9kfpd0ggm1q5asovawfnfysa16bgxwuizdeqxwbtgdai5lzvljdo2wb9a2wigk9n82qbouafy71o89lub9rbd96rykz26kxvnzw52isrzrmna9ah4sg3y2v439stpiuh6x8rg8ocu4s7mlql7tapzto1',
                errorCode: 'v5ctxrp8eq9s729qdv4u',
                errorLabel: 499999,
                node: 7407638179,
                protocol: 'i0jg148s5tf0s3z3rwtv',
                qualityOfService: 'yum99sg90bhvpq75xno1',
                receiverParty: 'tf8z11040jeo05222wgc2f082tgxna8rfl0w3djv0byljlcihf4yg35nr5jsz9z7yihtv7ge8dqi8eiaat9044y97b0nihbub97pd9mdrjspodx7dkwiprgt3hsygxo6zujg5f7jws2swvps1ts12hh0q1osgrpw',
                receiverComponent: 'm52t528jm4g3h27f4sq7z7l8vavrohed97vt3qsdovoa94qz2d85qnf3i3vztjah0z59k75ttfipsoxipao48capfk8w58sf2mqq7tfb6r8vjz7bhyki95s7i0toi504wiz36nmwgm0jdayz71pkx5w9t0ugt42o',
                receiverInterface: 'vrgdfxkw77c9765blpalgb5ql4efbgqcmwndopgxzvvnpbr5hc2101s70ha4bmdbnyr0b6bmm7oayu80lynm8agw6ju8ex2ns2qg0j3diulumgbu3pwjnzu8mdvhjz04x4rs6dg2567de79mf4wzo1wx5st034ti',
                receiverInterfaceNamespace: 't2d07pgzky0pwibvxa18zt6rtcs20d55og76pyq9llztpoduoq5toupa4te1pju37ywp616y4h98rvsmtit81nygasedpn2oexrpoyqou2mzys7h7zbkjx84bexe8hq492paanj1sa1wbqlurqvjon1xkhnrvll4',
                retries: 1823437970,
                size: 9999143163,
                timesFailed: 3548551995,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'tnrv542vc94be2p4ralzrtkuh3csh48nccrf6mz3t6flt6x06y',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '00m91jovde7ovyt38wym',
                scenario: 'bj8q4fgmuhchp4u6ymsbqvz40rbxarimg9xzbw35ldwntzxhmkseaaurdmat',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 20:44:41',
                executionMonitoringStartAt: '2020-07-23 23:05:13',
                executionMonitoringEndAt: '2020-07-23 23:59:47',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'b2j7s5tqf40czrl33kt9kbx1ssp3vimuw63ja0ue42r55kvi0ej1lary617a9zf32vuce3gwgrywij36wrzcs9nxu2yy8uatvx34lpr68mw6ji7148gvq6dg1567ettrpz3agw7mq66of391f5czvhu6u6hkl1qc',
                flowComponent: 'rtjed30z66x85ommsz4xhcwupcqq029klczy5y1x0qybrbb93d8xwf9s85hfjddw4yh2syc7wts3so05zllf997y77okandmro4d8hq8e9az7dioje8ulg9h3ufj0tcsg9nsmtvoukbvlnta87246w7vwu3x99ta',
                flowInterfaceName: 'ggsnrvdmywp7h3gf02urjy7otlmj5l2zywauasx3az6jlft92nejqmexa2ks7u8ess5l1iynrni7p30ozcut7m0p3riyu180bkafbh4yvgkovbc4uhr5aechn8a7kyczb7mqroydaykv8g648d5brfcq33doetilh',
                flowInterfaceNamespace: 'txtqnsr2awtg2hh8py0ts08rcnd3tkqsmt86nva2bel1p7htf735vci2in3f70lae8s4hnmim5we5c41fqxzl4fpxf1plml4sy6oh3xbl2kon8mo6bymiy836f6jpdhziwrvry7mp6a6grqh6jd0lnmhxfgs2zb0',
                status: 'HOLDING',
                detail: 'Aut expedita molestiae. Laboriosam ea ea dignissimos velit soluta aut id aut voluptatibus. Dolores consequatur cum qui aspernatur dolorem et dicta cum non.',
                example: '9v9nwkofn6orkr5cc3evepeyo24hjnwmtlawo2okp5rrkxqzayq78c1ylvuoq7eur5huqm698z3khju1vea8wat0fhf0ami5q0oosdfqm5ruj01p8lwk609gsnmnins8hli5w6ozsvnqm6pq0bskxvol2xziu1rs',
                startTimeAt: '2020-07-24 04:19:23',
                direction: 'INBOUND',
                errorCategory: '6layap3ogryzwo97v25taaoietjskd0qs6g4g4xilcqv3xze0qcr7gzfz3uvdwkkicpzuok0zo26ol5wqiuvugqbyfq1pfftr230jpue2qno7rjmvhiyztzme7n6t4wlju8gunvc9lylbj00banjhdmn444jw9q1',
                errorCode: '4oaolq75wcgds45dfed3',
                errorLabel: 408158,
                node: 5908076727,
                protocol: 'uepbgcozoh9a6hspj9gr',
                qualityOfService: 'nv1iwh6yecv9e9l92q13',
                receiverParty: 'u3v2r5s2ijk26rlzg37g0fjp7b4lo9dacmqtzm4xtbhh9z0gvqzk0qajih75lszp5erntm47kv1orgitr3ey5owpssugi8t3zcu4sxzir6mtuqb9i73d3yy8afi929bmrtlygqi89pc268ee86t3n0emp6zxgn8z',
                receiverComponent: 'i087bub0xs3urrnip8umyick1o911pevret8wu3da7xtibof5bznrxy4bmt5d39xlazttmof51zjetzvsytndteu150w6fhpqobzygyujpgq5fid3180m4fy1xva4hr7xk7gb9liqb8f7c5fe0v7dvp9shnko3kz',
                receiverInterface: 'w46mfs9zb0ylalxiuuuwk96dre3qu1tbgnv68f433vgd2oltihb3103pe78i4mowex1a2gguntfk04sigyjmzvkntdd3ifaq8mmwmzeywz81ubq4ojs7i5pwnnf3ujxwx1ypbb7awpm2kth1kbf43n0gu5jh8uem',
                receiverInterfaceNamespace: 'qm3v2gp1v3o5czksq43viedl65opcvs1c6xupzqgh0i8i7kdtzro1ajfz67t3il316ynobsp87oq17x35lmf2k103kdhn9pamlu3tv0e5kaqzw4rcs5o1ut1yddc3tid8u59w6d6soz7m0pung1j1iq3yn39gsqv',
                retries: 7809664254,
                size: 9283741435,
                timesFailed: 4565865253,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'mo9n0g0ejc7egib0updjtuiukme14h4ay1bicwapa8ri7kfqih',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'a856t143hb1reo5iky9l',
                scenario: 'k0u8t7iu05sldxvdvn805huolttlm8d82taex654mc9iknpleo42b9w8rlqr',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 18:54:38',
                executionMonitoringStartAt: '2020-07-24 00:54:23',
                executionMonitoringEndAt: '2020-07-23 18:41:49',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'dwuot42abfv1f9put7emxllg6lnntryc3gm4wwznc024rptf92c4ahsbuazt1sa0sbt42cm61z3aeasg6s39xz90nmmpr02w6919u2rw5f2sxy2uvdshkbqsp9cavzuyxebrerlfzjyp9f93j4xjcej358m1h9zg',
                flowComponent: 'ras0lxzp2wyjwdqx4o7mk2d4xcj5e6pgv2d5j87i39o3frp6bihxidcwadc2gq8soe83v7zk08rrbiyplowhxyv3hfpx9l85z94mfnev69k0zjid4mham6wni789ggkrta62ohbgdrxr0ca6e5wukp5r0w67x4w4',
                flowInterfaceName: '0nwhugf6fzpm3cgcrm2jvh2gvvpoye20hmymq6gi89fnb0prk2pfr0nwpl4y1ur1oyv1ec8xtzhjvnsu3h752ktdyakhi4l1fp6gak2ebdqf5fooo16i6onkcp9qtxm8b6o4kbom0eubcgbtswc4paesm17v1nkj',
                flowInterfaceNamespace: 'o8f36meblvainqc1q7c0tqz8t6ik54o8yid9kphzi0i8c7eo3kuhg492b3l7lz0j8gc5qc8m5k7r76h6e221a9bd7vxczr5lo6zfifr2evlz79l8dwmvaveequ76k9neia3adehd6lgizj8k86gjuuz2fwp7m7hfk',
                status: 'TO_BE_DELIVERED',
                detail: 'Non exercitationem vel aliquam. Quaerat qui quod ea dolorem recusandae saepe. Quasi iure vel officia quia laudantium sed quaerat dolorum. Et expedita non hic architecto voluptatem facere nihil debitis. Pariatur placeat ut. Velit commodi sunt illum.',
                example: '1flyl6556q8og5ylhjjdhe3nxgcdwiyo0krmgk547397eubifjkdeah0d754yllgei9tmcc1gdvzabvpiu5cwj44ix7he6ovuangk3ai67csnp2usg8es8w6z2szk10mk643yptnhrs6fd1hpsczpkyzdc614yk3',
                startTimeAt: '2020-07-24 03:35:17',
                direction: 'INBOUND',
                errorCategory: 'pntn18wi0lyavk4njteq8p1vdvg2gd3spgu9i9o61d64t8miht2kefue3tvh2r728zl9fdp1u6j42krx7c36hx27n736412za845j2fbw4gnrbj5tpqnngwl73ir72fflq9czpfeloc4ckmu63omcj1lwughh6dy',
                errorCode: 'l1cdk9trb9rtu0iplwfy',
                errorLabel: 641925,
                node: 7710316313,
                protocol: 'rfyglwgxkwsakex5mqa5',
                qualityOfService: 'f1y787ct4fzvpp878jqx',
                receiverParty: 'xuqgyp46hayhccmcsbj36hsy1kooy0ruaaerheb3a3lej2ab1sb1iufxm6ckpmbjc3cg33c62qq48pbel3yr824aie9znbqpij106a5repp2wt8hfojzmcrrltu4tg37svj2re8s68musyovdfxdc3oq1xpuocu3',
                receiverComponent: 'z04r1to176djmjdiw76d8pluu9emapu1aqkq8ykt2wffh2ad8kwxhx06vm2kucdy6k3d0hcdeup4wj5m8juux47yc4qbxzwiqo1wkc8hgyr6lu46i84gtqjw2n1kmq8axts0460z0hzl5dx33w9q161754f5qcrl',
                receiverInterface: '68yv3s8rxm95kfjo4x9fg110ed5wjxzudzc55rg3pltpt0inlvskr7wvuj9s8vzu52pg5xar6gu5pasmbd8icag8viagmuvcnz6pph1am369fkt84i8tsh2nq4v2kx5u7ni3rrccaw78ndomhw9sa4yaeo88yc2l',
                receiverInterfaceNamespace: '7tbj5h6jphc77ftourhg6dilaunsrktk9cmeoipsazo92lvhkozrf4yny02qxghogqirj640gy71zvkp6y0chsqxppijnoqy5dzcmam5371cqrxvtp70jy49yu3f1twvu35qo3thpz31mtqh2o47s0nfso65a8o3',
                retries: 2900531676,
                size: 6272494974,
                timesFailed: 4734465133,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'vyqhg7e4s5ufneeoyqx1acir0a97nnca8kmlbi014sin45l9jb',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'romqcndoaoile2716cgn',
                scenario: 'qxxt6x2crkwd10d42dcyhmncsafvisxu6yjshvyvj9oy4mc7kcf5kfqb0cky',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 12:40:41',
                executionMonitoringStartAt: '2020-07-24 09:30:36',
                executionMonitoringEndAt: '2020-07-24 16:38:45',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'tj39einkq2iwl1u1th6wv05dpmmhc8xp1yz0hxpnfof04y9zzvt02ma7pgcf8i275tu59pnkbg74rql8l243wb8vo443s499gsehmj0ik3swxgr9piif6s20d856rqzusw5mjqd0scy2g6kh2k6r92s8yt8tphci',
                flowComponent: 'l4sgsprv4236lyg42izflt0cgubu56f6b0n4bglyn99zak91ajotdgz5fkwmu0nhxkdb6wlv779m245tm14feelbinsxwjl8hs2iuzb54gdyweoi6cdmw6ki47bmpozlyv3mn1ivtlw1e8gpc30bm6f0c0tyciis',
                flowInterfaceName: '2n9qho8v9s1xjl5m09oj1o27jdnwxr8m3iwoq12k8xiwfh50ft1fhgs2anne1318077jbikibgfn4juje45golv9vhhrlhh5wamta7rinedynd1659auonj3eky9zz3ov2lanivn6lf3ycf2xwkfe4d098t44por',
                flowInterfaceNamespace: '46k39olsjcvouzgw2znq104tjt8v9ji79slpq1agyx22cm49ztjn9wqj6cma9aeyxmq630l83mtfe23tyegl7kcbdemfybpab14zl8aaq48rmw9wjgttqrh4kb7rqz3za5i637cjdpg8pja1paq5myv2d61e6x2i',
                status: 'HOLDING',
                detail: 'Natus animi et est enim explicabo. Et veniam ut deserunt. Omnis nulla inventore placeat minima ipsa nihil itaque rerum. Aut est voluptatem ea eligendi quo fuga commodi sint.',
                example: '6spskojtdj8ke0s6me8l69ern14a7gwk1kjh5to3o1c977ertysph15l5lbupztv3pcd4fe1e5gj2vw13o63plxlppc2dxnwh0ig7qlwogdetlw624z3uc6socjqqpzbgvx3zl389vhsnxqpmwrqeebvybt159n0j',
                startTimeAt: '2020-07-24 05:04:46',
                direction: 'INBOUND',
                errorCategory: '37plsjhyf31ufi4xmbiydo47ph2r7bv8ozjn27us8sax785qv50p7gks2r9cg8cyzam38jyvyvlu6gquparkn9t4lfern6exzf6gverwguizpld9d2f0yly1xn075vv93c85sb0loobj99uv0r2m51jcgj6yhg3n',
                errorCode: '05vb2i9atsh1rqf53w0d',
                errorLabel: 959675,
                node: 7997801362,
                protocol: 'xe7oldxt0y3cs3m24s0l',
                qualityOfService: 'o5egtw5dkh8cjasukaf8',
                receiverParty: '2fn5r33jlgry6bm37web98szxk2yy669dz5adorgfp0fl0s56u5cd2rt38wobpr4n6o89l27m9pxahta0tbdu48w507bot887qqablimjuws539mz32odzs5afryifsxhgdsgrs28zl1aqgrcveulxs2b0p4cvfq',
                receiverComponent: '4t4kd96sgtjj1qd3u63bodrmmfhp24msp8fs2j6p5um15im30l36osbszq75km2crdybd4aq15juo55s2s5mkyq3ncmi68p0y0hijr3006dwwrox21ul8jshrptk8dbzf8hjk8p4hy5zjw4x193ese7i9w5fywmd',
                receiverInterface: '17a28nv1qb2qcd5o2qhi9cs6s03ampficnemw8t3bhhf0ms99i2sebm886g3w1b0kdqrlj09rtt9jnzt6d5josxwqukz8ghmbiuwm5dbb6e4qs2nvevida1or3g5kspxuomn7p9am2ck4i30q450vzazwoqhkswo',
                receiverInterfaceNamespace: 'n5pb60rh6nvzkd562p8xi6wq8kixrs2po994ij3sw9hvjy6uf4nzelc1k156j0s760rwziveqxboip13s8k0vz8v2qp5el6h2i5bhglmbh0vthis1bfczzx5gawpz1g1ovant4t7m6s88h4gw0e3zaz6usqpbzhn',
                retries: 1359245661,
                size: 2995160060,
                timesFailed: 1426384593,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'znjw6lj6jhsvq92ysmwp8vu6ilf82tooegkr1zzttpq01wkas9',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'y5y04pec8rbeevt4wqyr',
                scenario: 'mi3ugyiag31ls8jh4n2sshk67xdm43ift4fy2jmptmyd2scsddi2r0bdhom6',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 04:04:51',
                executionMonitoringStartAt: '2020-07-24 12:29:19',
                executionMonitoringEndAt: '2020-07-23 19:04:19',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: '8bm4kkk10q86oyhjb1u2rg9bz1tzwdby2uwzrgc5ziemw01lawsymbtulbz3upa1acxuoxiizrwbt2k7n6gv5piben41uyppkf62k8ncm3a3vf0pl0n7266ppgrwf5lajfyf9ap55jfsmra5h5ymiw18fmen7e6j',
                flowComponent: '12kdvywggjcz1ff25zjydsjshc8t50bbc4dvyidn1rgv8hmpqurkqhtkku9cmrruh063keo1p3awaxztk5ihyeudo0vnw701p57vc10z1dthpfd29noeygqv3shl4tp23q27fs9jczqarhh5yg0tbnldaplrfim1',
                flowInterfaceName: 'ejwu7dxeiirg5hdr31cx1rocmw0s14e3p5udjsbqy35jsy30v2dqlmvxub0wonk2775ithj5r6w5yl646bn1rav9tnib2ppr14m1keip3ob4n3n1p2h54ybbcx7uit7117d6hnz3mg0spda5jntsr96zz4d0e2fy',
                flowInterfaceNamespace: 'tz0g4yjm9l2wc9mn47o333xk6o36u69vqnhfem5lb2xwwp6t38dn16k4d1npsccjfmz5ot7jttnujahgx19js5ondbuqiux9empycp468drt9tkij2rar15rs4jxanjwd9q0p2ilfanust8i68en2nw2m5gxi12x',
                status: 'TO_BE_DELIVERED',
                detail: 'Numquam ipsa voluptatem deserunt neque. Provident quis sunt architecto voluptatem similique sit possimus recusandae. Dicta dolorem error eaque magnam ut quidem qui autem. Harum tempora voluptates ipsam alias. Nisi quisquam dolor nostrum enim sit voluptate odio iusto. Quos tempore tenetur omnis dolores iusto libero nihil.',
                example: 'zjdv40keydz0b7lqpse4ykjspoxlp8wt283sr5qc63num9dm85j33d7uxfhcrhpyecg9ny5pl4dojawyqfax3ycabf46rf1kscxh926js0sjojcmiwnr93bos5p8ba6ar6rq0qyhf9nyeclw0kiq6vosq5i6jrk4',
                startTimeAt: '2020-07-24 08:44:19',
                direction: 'INBOUND',
                errorCategory: 'hrmu33259twsqtim2unzqudhhptqyt80mzvjal2on04ni5uprj9gulc7xbwivk7bi326kznmyh0uf0bbg8v3w2k5uszwohhvv69pmzq9e8tsq89urrwatk2v4gmeu6xidtlrh8xl48ewyroj6v4zay1jrb1ed7mqz',
                errorCode: 'cr36mt2cdvqhprwien3h',
                errorLabel: 265081,
                node: 8475134172,
                protocol: 'f8nxkx8eolqjb6zzrw7p',
                qualityOfService: 'c1lzm4mu6bimzl49bfr2',
                receiverParty: '9v06ytasz6vo9qui4xj7lu5628jmqqetq6xojjwd2yccdbftk19wdzd3nfzxs1qmwkkoer2gyc8drsvhh0ops21uxebf1jw0ng6a9g6ncox2yg9zqflgnqj5ygqqc76qr6n9nkcqhztl54u8pdtd9h77uj3h3oy9',
                receiverComponent: 'cf608vj6zuwszfj0y4rnn4d3ri75ihl7h7ofv1irhpymqiko0tau21jiper64bxb0vs55ttqc0p99c895zu765i5dsrux0vz0txzqzx6f2vyoes17qndwe3qrvl93fpesafkh6gejvwlvbasagt2uqjxq2udlsqp',
                receiverInterface: 'qghutaio8qr5eww9nx2a2truxzpuv7jxaxovxm1nszit6vvpv4uuyaws7t7w6xcm5li2fewh8bz04l8se4t42a5sw5db6ec91lix325p2ufn74h4otta6dj0pqnlrk12xk2pf8yzq57cmjcqp4hjr4gzqd4hg7qt',
                receiverInterfaceNamespace: 'kuhkoc8n5tu5lw5u7ydfefoi2c66lh8kjjeh8497yf5dzui3b0q3abrbms2m5zjiuavc7soazqwhsnlja9v6aayd05wrdrv52xc70cbh6fxa7f4imbj1023mo3xbwa9k0jqpwclz6ses42q6xxo3bd89l74xv5m5',
                retries: 5320717397,
                size: 4868629188,
                timesFailed: 1849557572,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '3l3u07g884wi7ffv3gz16rn6bb91rcnj3nevze4nj7bfhrdkha',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'x1vf6tn6b4oxwcpajhux',
                scenario: 'lbb1djbz2221z0v9qk3zdx93mqunozshwauk5x7qs9etq849pzrmvdw2wazj',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 05:34:20',
                executionMonitoringStartAt: '2020-07-23 22:01:25',
                executionMonitoringEndAt: '2020-07-24 06:33:20',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'aigtru0zilwjbik15a8xwdejf9v5itjd9b0da8m0e4rair10hu7mi8se02rwqmezpqwz06nk0fp40c4uq77y5mvk4trhd12ttayu8d1ewyopg84banh4n5m9mqnp0t8nxinroet48i2mwd9cseiq99l3s3d6ynm9',
                flowComponent: 'r24hdn77neh9igpz135vhh1igjwnb2knt1amum2eqw0uefyp6w7uibd80iv1pk0pux8eod1ngfcucuv10absxoju7v9z1wh14hdh1bfh1q41ssbnnv28c5e0fqehnv46iqq1zn51n02idv90nvcp5aka3dkq9uc1',
                flowInterfaceName: 'g8e5112d4fjpn7vsf0bxtfieqs12ra6yl4hfkot5yuj1ttrdrjdffhv0ntf5axvfad2vjvz3loj4sgtalbmn6ib73z2v99t6668fsy5zsar94bqrpqzcio9g0gtw0mmhp6qs6njmq95xetasvbi3ui8plqnruyce',
                flowInterfaceNamespace: 'q6ggk59s10zrxdccss2l5q20junh1a2z7cnn4w72l7g4pkmwf7kd9g3sm8rdw0jonf73tm36prldhe00btpyurupvteh7l2lb9u0k895y4rauwihsyi0i85gkh7ij2fprqrfvnkksaqzeha2bqzhhmqyvc12s7k1',
                status: 'WAITING',
                detail: 'Vitae accusantium dolor sed quaerat enim ut. Quibusdam ut omnis libero vel at dolores. Est similique nulla rerum nihil expedita. Placeat autem iste quia dolore illo laudantium laudantium. Laboriosam qui excepturi tempore et. At eum nesciunt veritatis officiis aut qui.',
                example: 'yi4ft7ik30p8z0m1yc51mwsd4lv5s7ricugqlie8m1kcq7hjqp6y895zh4t5eddhb15mru6g932z9dfzl3l7090b2wtiy0yawg8y7rst0kx3iia5ik3fiiovtyqnq461e3iswouhv4ui3ctvurjspp56k6a1dqwj',
                startTimeAt: '2020-07-24 07:24:08',
                direction: 'INBOUND',
                errorCategory: 'aon69j9wnpug3fdip3lt8qu913y0t53tdb9rs530hsxgogp7dyplm59iu49uoggkpdk1nfj71admd03w98posqxo4bomlsq97yophwwslw7wwhkksm0caxsgww508xoqxyj6lpo6uipidq3qkzpsss5lyuftuqu7',
                errorCode: 'uu97b4f7sqftbkmn7h24l',
                errorLabel: 438363,
                node: 4583877287,
                protocol: 'kzvt29q1swcrlymtmxe2',
                qualityOfService: 'wqx81shlldremwum1jxh',
                receiverParty: 'lwud3xl08p2iqvbmf7wl4avh8idikh279xef1t6mqt8085dvx1gxog89of81eio4kn10m6qqjx1sydniilw1u6aaeujlel8vaz70dwtnm6br7dentkccx2223l6pp4snbid0x2nnaho70jlumkuig198bd8w1x96',
                receiverComponent: 'n42z8dhdbet40917y0wbvzjdaimftazuur45m12gc2xgs1j6bh6o17kjtc631itvrqh5pztok1d35hewl9u9q4lf1a0qh4araopu5zz788vef30g0hwngeppkbitpq54bn99svan1ttalnie9bm6ck8c3p007wtv',
                receiverInterface: '9l68by5jjrawm53ui3v86ifld7u3rm8hf3qga2b9mzlpme8xjtbpky3e6n62uaulfr8jf0vq9eojucta4tvtrulydycdbx54ql87bpzej4ukoqm1ywo015yap68ez5xw6cdgpm07i1s5x3uggp6p357ltxaslaad',
                receiverInterfaceNamespace: 'h15f3t75b60ol33a99q8b8ng27u5bh90xyd5m6hd38gyt1g0zzx8qqlpcg21ss7szgrjdcehy42rpc8cjaza286e6qcxdgbk0b9oeq1j58wkr6ubcjd2p63g7uesjpsoh13jf878bdozt8mv6t0tm3xox6vu9xnn',
                retries: 6636054613,
                size: 8362494317,
                timesFailed: 8744099271,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '8ta3otjxe5pt474gpryoxojrtytpzuim0g7ebbqdoo29tl5az9',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'idwzv1lq8moz1ex1k1fy',
                scenario: 'xt56tfxmc9dfjl6j82qh06dzos925dhytq3vjcbi5hqlcfon8n3f08ln8kkn',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 20:05:20',
                executionMonitoringStartAt: '2020-07-24 13:56:03',
                executionMonitoringEndAt: '2020-07-23 21:57:47',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'r8izs7bghlq3ei493a5mldoty5y6cjx4noouygci1wm3jqmtdj2ko4v6dx9430ktlcal0ypc1pl27matsm9uiqpl5898nb9zs15snkr83ztjsch4u4hf5pdlzhq4xfxk0vxv8vudjuynhkc4srt9syydbtybxa0e',
                flowComponent: 'wq8gijyrvex79h9g1c334dtb8mh66pzpdmezoyl0k5vcmp7t12lcrfkaycsgo7hnoj82c2lf451qut2cioi7tzuukaqd60iiq6q4kb0ycbmjwbfda72j5i4of17uadc4o22luv7ayi56izkd7vxghl16bm5tms2u',
                flowInterfaceName: 'tczvjdnmscxnuqprnv595wrfdydphbvfztro5l4w93ldcijyy6jq3k4wj24o2gooivgxar2y3jarb4p9dxjgvzhhxv7i7drhmhqzh44iaoqp4f18o2yhszwhki65f58nznxvlknngztka0m73cc3phq3ntjdtghg',
                flowInterfaceNamespace: '2l88k2q5x83gwx78job61i3qvg23ualjtp668z5i7qc0r5eltyw8wbidkbwekyn21q0uhad3fj71ayn6lkjgkjgb9gi837leyez68z1xu0jehge97zrqpn5yjsinuor5fkfxnwzcxd1iuqvbbkp51vmtjaz0f2d8',
                status: 'WAITING',
                detail: 'Ipsam quia nulla hic cupiditate quibusdam aut eum eos. Consequatur praesentium voluptatem quia aut vel quia aut aut. Sint libero eius dolor voluptas dolores. Corporis pariatur nihil rerum sapiente consequuntur omnis illo corporis. Voluptatem autem dolores quod sunt eligendi rem illum labore. Maiores qui ea est quisquam in enim ut.',
                example: 't27lsuhq31nj2kizbtw18zg8k12c7s9w0yykpympkzkuyrm6ronm99u0lufqqlh48bjxfa3b1ppidub3hd1weqrudyn3gohtfb9rv46pjv7ikehz4l9dcfndjjh1kr5a4g1jemvqk0ly2hltarqdx6bgbkaj264f',
                startTimeAt: '2020-07-24 10:27:28',
                direction: 'INBOUND',
                errorCategory: 'qpzsjrictn19ecq544qdx93rxpw0k8p2ki9nwvhiipdwlptlhgmgim57dvalthkqbzm6qgeckg0onlpwat1mrnz8dgi99on0y283oo96109enndfq5r6ktj0tp2op1p83qfw608wtqx8vmus429oqkxrvm1z3mft',
                errorCode: '5r3wqz9awr3drqugihir',
                errorLabel: 8344468,
                node: 7630249336,
                protocol: 'nd0972r6niyi51xw34mz',
                qualityOfService: 'ccw13l9tmxs3g4t9cki9',
                receiverParty: 'hsda01p70svqetrz29cfj244v6pkxa8sgotcf141rn88tnlcjnlbfms9a4vsj8rxe094zaxooyzszgf513dg42jvvr11sl10rw7uh51ijkrp4v1mwliobd3k0ubw9uanry96wfpz4npea15gn2tnxqkhyhxljoj6',
                receiverComponent: 'x4befibgwz388npuu01dytg1istyn3p22hky6awdq3jme45zz7m5rt2cs6ypse9h0hrk49qn9pzfm1u72208kqwqa3ua637gl9jv0j302l8v1w76otv68cs5r5lsatmmc84g75ai5y0q8xduoupf9dvznwogeg1w',
                receiverInterface: 'zvds615vy84wbv9pcjyaf1b6u7dev0s5v41oo0ulvr4536llx2b3ci32mnjbpmp71qsxvk8xmxoziyjaykru37o6lw55d248hzz88ekziru6bylryimp2pqmcpwvbfo1544ax1cf2pmap6rqgrzcpawfntn8fyca',
                receiverInterfaceNamespace: 'o6b5jnvsfr48wxttyd40u995dxl1w1u39zlx6p4ng3xxa1daglt5nt5regeb700cl4dashttrn3nlmem4msts72vkwwm7ib622sfe4jmbsp8jc17vj2c8gces0ar2j01tdset7wbtx95et8ud55ql51ra7jf950c',
                retries: 4864169856,
                size: 6342858113,
                timesFailed: 9531039393,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'jqg04wr40h63fv5w6mlfup6vrtzu55kalypmu4u18dw8zpuw97',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'i3mcfkz6d3pvuv8zp55b',
                scenario: 'cbssv4k7yaw7cyv34usovz9lbtqswae7g1bb52yjtvi0mub4rvnp5grvh4sd',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 20:55:40',
                executionMonitoringStartAt: '2020-07-23 20:02:06',
                executionMonitoringEndAt: '2020-07-24 05:09:37',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'afilysu745lunia5i71gqypyna2hybtusdlft3bpki56d87xcig9otrh3mbx8hmht31vnv19jwa5itpiz7rzqka9dd5b0b70xwzfam21ki4uqohix5j972jxcnx4g6a2zxdvw8ws7wpv377nkixd4qovwqyxjmll',
                flowComponent: '80yy12746j7wfi7s44tf52vqp8a0qbyi6zb5fcf9ogue0uid2i1d6zipemcukc9xz46stt86c2jf3rqw6ysrvi0rumw716ckf75fjuo2y3grwdow986i69q60egapbyaip537dcfgasxm42yg3wzt50sfqo50anc',
                flowInterfaceName: '6r7vouef47e4swq0tk54g58oqjojcmxi6vsit6gei817n55ehpemlack2vafo428mj4qu52l62wzda27elvc1kjrv6egovqscl7gy3gkvbf6azn9lhzwwlm2z5vypup0tlekeuhpn42l5cp9ev861ve16stzt7fv',
                flowInterfaceNamespace: 'rn71fdo8r6o06jarkcdvvgfms0or2xdbwdelzoamkf0sx75towjg2fty6ntdcnmneaexnzbuz5r907yx6qm5lay4aopkqqtwrpge93meligybijg02bgpf3z8hl69y5yxk8ra7o1jqbw9uc5q3i3jn4riwjtli6b',
                status: 'DELIVERING',
                detail: 'Animi veniam culpa sed qui qui sunt. Repellat minima nesciunt enim autem placeat quasi. Dignissimos ratione odit est. Expedita cumque eos voluptatem.',
                example: 'mz6401c132c48h03jdnrujfxvexyqx66e9r3obgdm3r7k7ur38sxug4fuu9bokkcy00nbjlx32hszw6ekzujxtsqlbzop5f39828vgh4yceizq5kyq64b58sgucohqsomifj1d32cf7feva76bpxg9zc35bi55qw',
                startTimeAt: '2020-07-24 11:56:51',
                direction: 'INBOUND',
                errorCategory: 'bsh4kaklybbfhxk5n4nykw9n6l66iz2tyyv74o8a86b8o86g600e3ss489wltp89z0gcy3ted2r3hvu9xgc3a7lht3466i0t3b0vh9bxvgdacatj0ub681v3np4tykv4v2dvcb1omvrrejt11jy6aofo668edh2b',
                errorCode: 'dyh3y33iaq3dor0g8x7o',
                errorLabel: 945875,
                node: 64902272064,
                protocol: 'k9vkf6jv6acy83em7z18',
                qualityOfService: '9nlnvf6s8wm4hbjs6ljc',
                receiverParty: 'am2oy2qfn2255m1xdeczp4z3u92aeie3qh2mnci7uesbtrs9heusxzwdzfqmfow8xh37z0j7nb0qq9py44jgzrdtaie1jq9bca4j4thuhrzm5mtzcj23vrfd9nscq7gewxc4ba22bb13uohmfofsrtstuw1i2ozo',
                receiverComponent: '92g0ae64bl512jiz6gcwiogof6z9m22f0s5ar8n8223gn2qqavc3xog8lcd0p2th1ufbrj1fkscc5x539ybgguturnurm69098vppmf7biyscsmaf9cqd6y4l3g90mjmhnwyt32tpl4bv0psifya7x42e7d76lla',
                receiverInterface: '5yfra5myu722reicrxgbtqkm1hn1gj6jdwo4u96p5kelh6xgbzuh5o7brlhevepveta2gd25oq40w95ccwi2lxqca98t4yyhus962fphnmwganbjyzhltsf3sn61oy68x1jhx4cdq44viftrl3z4obn3wsm174k7',
                receiverInterfaceNamespace: 'dq0m90s8qlgej0tur2og54j9xl9f3uaiyqc6rayeetaty998rfjzlyqjuunzdz2b7bscs9tj35h4gd9g9gyj0warqpvhjpgzy6tik3bbci625johdwxrl5of9wsrehq8m8g71bya75s1ohvm6cd52pfriiz1srso',
                retries: 6985092756,
                size: 6181028581,
                timesFailed: 9866423599,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'r5ol3mkbgm68zwhwdivas2fzdvsntvnxkpexp2uqv6qg5rv67j',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'n04qa672xc7kpfrizkd8',
                scenario: 'act9srkpnxb9pk197i69bq1bgg6h8b0ykthw1upjii25zrvzumx3fyd99ar5',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 22:53:15',
                executionMonitoringStartAt: '2020-07-24 10:17:42',
                executionMonitoringEndAt: '2020-07-24 07:46:05',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'vg3zid74u2gd2uc7amnibw837u5fmpi7cxkyg4uq5pofxam14uq6inmmoxfae8kr972rigap25tyk0o7dz94aleucxe5x4149j3hwco63k5v7pfr7d8mnw2clve36rl0mku9msfnfhd2ip3qmxmgxpe07wsfl4k6',
                flowComponent: 'rdrv5p9tx60bf8z3twqgfzgghjq5fsr24e4m2fs083usrxv6w4u0hsyern5zv0kpu915c94rv7tzui8ma94khso52las3ulu18637w60tgljwla1pbicsmc1fdn1bqwk3rbyjk7dp9aegr1p6sjpohucc93vd14k',
                flowInterfaceName: 'o6fb4qquha6fokqufioziv6d2f32obiczt8k9u3udl65ov33xrbj1k31i4qjhm20nwbtwv0v2gkoxpgmcish12v9egbhwuhgvotc281zzccnbb2qeu9u6ota85u30eb6k40ed2eewe83gkrqujdcuuac3kww5d7a',
                flowInterfaceNamespace: 'js0xyb4d99l0pkbh9ker2vgrideftyp7mr0hj2b4ijtzymdjzxzuee39yksnatacl60bz5m3kf378dvsyucw1fehmmxnsrua5ok2cdkz4yt6llew3x1tn54zkpq68p46fmvzsd9z9xy242hd0bzh9unhhfdml10z',
                status: 'HOLDING',
                detail: 'Dolorum quo vitae consequatur. Aliquid inventore sint quo aut. Ea blanditiis ad omnis. Debitis aliquam accusamus suscipit tempore pariatur et distinctio est.',
                example: 'kaksciy4o57dpe0dgl8gfks8cp01ms7mbtbuq1gdwt3us1ct3z45ae73ji4ugyrmiza56t9jogdbxdpthire88bxkglthfb6pec6ccex0ls78z2naqnlusmq9hm459hbsuy9pkqrwwfvhzdaomeo4c4ao5m777c3',
                startTimeAt: '2020-07-23 21:52:16',
                direction: 'OUTBOUND',
                errorCategory: 'okobmtkcgji8uamrszgf2dzcx9fselv6g1k46wvufp38d93avbwinoi7igwjof8to2u8wvgie7mya78uqjab4ww94avaqypxjghwl58c9effo10k2w3uasc6m2ekk9ki68gxufoabt1ykpi5bqnk9d8c6so8aph7',
                errorCode: 'qc51941tjmy7r3iz3yr2',
                errorLabel: 542337,
                node: 8980520833,
                protocol: 'pfriahwjn139vcq5fjbts',
                qualityOfService: '15nc223xy6pawp8dxvpy',
                receiverParty: 'fqiweb1b9ymeodnsnahdnb804n829ekf9r9975rzk43lnkr7ls5n8toj9ke54al4sokewr0h4f6t5cvd6b8u6iaxewbbgb2cc10l1x9b4sqfdy2pb31quogq7s7c6wiaglvm54559bn619c8k6qx1ltter5b48sy',
                receiverComponent: 'tyq79bgzjh0w839irxf30q6cer9gmd0epghnm9an0272kl2ka3ka66kt3zx9rstjl6abmfr2waz91qmr1ccovtcv52bag0x77iewfw20gpp6ye8ae9wlk85pby2p9m2z2j4ej92i6e3o5tg27tttuh2cvmg4tjwq',
                receiverInterface: '2kgtt7saog80a1xp00qm99fk8pujb59u5pr79kbh6c1orta1obtd7tymo95ft8sixi3st2lz9pwt7x7d4dmeh1icpuc9y3ny7h1hvcm5w9l2r3vokkvda7r7voapy5td823gol590btdf0esjkrbqrljm0iw60k4',
                receiverInterfaceNamespace: '4zgcpsx7421sxq8vuj4h81y4jezpsn6dl30xot3phq5n9rqcdraigh8p7b2k5y5powuhnqvmvujkynydw9xkzdub2czkpsqp1j05dfqsrliqpp4r5yp3qf1i9cbeq9i8nkv941xt1ojmd7nuu2215ichh3zo1ok1',
                retries: 5823247055,
                size: 6366307321,
                timesFailed: 3697955045,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'mme7whcc0jxvwordr9sei2ixtt8tlatw7ornkhitk3z96s4hfd',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'aui9w8af42l33fbf0hdu',
                scenario: '543yhtfupie8da0tcuirrepmd5upc764dawuk5e3ngvqb14sr16id7drqpa6',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 08:55:00',
                executionMonitoringStartAt: '2020-07-24 16:11:30',
                executionMonitoringEndAt: '2020-07-23 21:21:27',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'm8eua2kiksvzl778o9ytlmccl5ujvntibnxdqqqaxxbykdz1tkjmib1bcrt9isztowlh91n4ndmc3hejel07grtz5i8d7e0d8jo2ws3bcu07ena28g0zmv4lmm26xoecqen105rbf0s73qo3d9a06zsyb5b5lcyc',
                flowComponent: 'dsrexgdt1b0s6d54rn4ujqcnmk6gn7okbzxyttg4i91ryvk15js4nh2w98fcbh07t7fjykalksfw5frvq9xbvmb1v331q7tj4nvqv5x6as4j1e5vqbav4ppsr4ee21ezywo895c0l5cjf8g5jg9a8g1gr33u5px9',
                flowInterfaceName: 'klke8sciii0s1ike95bqg03rd8wb3habtudvkj4oeqv5vbv3anw67wjszjmpvbtaryt7yldmr8fc1yryb0u8g8uxqlbplazlu35fh4kwzhd5wanvt9gd3c0vidw0v6zrom1izjqlgb0nleng5z857ad66r59cg8r',
                flowInterfaceNamespace: 'mgqlhwjbmecs6haz6x3ysh8srcoxga9uuhfqn9cn8ssctyyyie6ovpkwt6xgyw36sreqkvngkdquq4yegp6cqqo3gh3bav74k2y12whmidfw051spig95beaee5vqi4zzsl3b7ngc4a4rgt54qkla1lhd5vv0dlc',
                status: 'HOLDING',
                detail: 'Velit accusamus nihil vitae earum est. Quia rem eaque doloremque et quos quas quia. Incidunt neque occaecati reprehenderit quisquam. Et nostrum et aut et vitae.',
                example: 'rr1f46txtbghkivu7a0tzhicd24f45r43xsd0fkt6fhrj5o066s3rnkbrhhxypg3vjyg0qw7qp2mg7s5pwxdgy4rtrzux0oiz8v9iq0oj6a6p3glqferz7y8c4smdxzooixb45mcl3z5t8sxnqy65mrg2b7lyobw',
                startTimeAt: '2020-07-23 18:53:00',
                direction: 'INBOUND',
                errorCategory: 'vs8tqpeotd5j5p9soy00z54vrua6ghqkq1thszxodr8xnf967fy9mlo6yotsjk6hvqwwt36o96nr3ghd3r0pott4w71c0rmgp1gj2cn0q9ytgtdrczahmcr63959pswpe4opo3qevqlu7yqow01voob4d86xxouq',
                errorCode: 'cfte2m3raw56bvccajsz',
                errorLabel: 290200,
                node: 2101420754,
                protocol: '1ronjt4fwu186l5jm7do',
                qualityOfService: 'whw6kgpjmkzh61isjn2fh',
                receiverParty: 'jus17hfn5bk2jktxjd7s2zvy9x72o3laaz0p14zr995gvurmyxx3lhonpm04ndjlejzfhbynpy023suhs6vtlbwuiva7yas3iro64ac4oh6diefi1ucrga9s4kpewat2j9bdytissr8genkuq0r1ap6snal3lhvl',
                receiverComponent: '6kw862a63a12vm5eufp8anv9tgnny0a3qp7nef99bii0j241ocpxjvoyu8ji8vie98m0rc5nkt6wpeh74ylvbafe56hgntr6k791xyqc3cgykslo223ek7bcnup96wj0lsn31k10qdyl8kh5sl3yvv6xaxhkcehs',
                receiverInterface: '79lxjsmu8db0p3nyz240kuyngw24ua70mvwjqbpx7csj7o9gh5jg6uzsd05uu7bur865jy6a60n8k3s2h2fuw95z26ipnz9rdtu8s3xswt1hml4jgqk5zmxp3od3skh6nogza7vln0iici86dndxjj2w0i7ry7rh',
                receiverInterfaceNamespace: 'us8ordvtl8zepgza5hwb5eex23ye72eczhomyqi9qjb5god8s9ji8swr4z9d14wdrl8x3j0uyrvryzy07y975rw7ttz0uryouazuris0km64mk7ad7i77gbrimjji1cerznauxes0c0nowegbwhvr5gog29bazwt',
                retries: 5581447603,
                size: 8554289659,
                timesFailed: 1186374173,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'uvbjrnttmr7maohwnu8yroqsgkcn6ehwuhh1zsb6qfx7a4tl6o',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '7l15ynbvvuri0qs3pjw5',
                scenario: 'h5l1u96qzxf4m38b5a9p5ftm1f4q9xt89xp4jdqlrpoi3qzimsaloakc22xj',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 20:48:11',
                executionMonitoringStartAt: '2020-07-24 07:06:20',
                executionMonitoringEndAt: '2020-07-23 19:20:13',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'p2amjerr0npziwohjdm9gwzkmykw2ybzrm2xjdajns86jqepuy3zjeqh25p1pvaxbdbrol7o2od1subk5hulz9vj4cerlodbh5vikxeng0ysbsjyzivjwhunwhffolrtaqr4ezx9ir0cbbgqr5o7f2aub85eawc3',
                flowComponent: '0lgrv5kf5vfl6q1a4m5lmbog0wtv7f70ff6k3rshtemx4bn7djglztdpnlu9ft6bx9iejgbi2sjrlcrjh4nqutz2k2wthu5a4ly0qiui6r02brew4v429ts8pt4pxrzhbovx1mh6dqdkj8ai88moprntj821h6rj',
                flowInterfaceName: 'ifefdvt2aoq9bq0340v3ulbqburf7u3t3zh89169kq2e63xfwf4xt43onpemcz7nydmoz9394vxr4uvdvoi1g3ves8m0zeb2xy7ir6tkhjujvgc7xhyttchp2y6zs8i6x0sardjyp25f3awby8e52p8q8l49fwh3',
                flowInterfaceNamespace: '0euc2jkc8t26mfmdfxngzpj50017d9phwprxa7jlhxuvgaj97aci67f9swmhptt0ll7cgsr1h4ty34tp3g2mhrss71pxq58vff0hm4vjq26tjs9m5lgjeu3uukfitll2zfvxf043wussq163gaznxg8cjk6soodu',
                status: 'SUCCESS',
                detail: 'Et unde facilis saepe ut temporibus eligendi accusamus eos. Autem omnis autem et sed voluptatibus illum. Sint corrupti hic non. Quia adipisci dolorem praesentium.',
                example: 'kr0fpoolk5azxh42idd2latdps5u41pglow0r0ih1facnbxug84siwn5amao595eq6fsukms34py2kqjjppgoo1av09lp52bkivd60eddwvc63kq2uwcf4p0gp3iyilmyh9s79ephzf6rwo8z0p4fcuwaauac7eh',
                startTimeAt: '2020-07-23 23:58:41',
                direction: 'INBOUND',
                errorCategory: 'pxsqititu3wjltfv3vbi5tbcvmbvugyq7o1xar0mvny800boww2x55qqzc45fwdoqe9ubdq2p5s8ngqswcc137143xgq7jdejabqgifyzbymdd8o8y85z7g8lfe8pqdlqz6r7v25j3g22tur4hwvvrc30texeofp',
                errorCode: '474bguglof41666wmboc',
                errorLabel: 988428,
                node: 2242981574,
                protocol: '5t0onh298fqz24o7qrby',
                qualityOfService: 'mapwhxa9a1sp11z7pug9',
                receiverParty: 'n3z8sxcbf1mejhrzj5hs7wyps4m9nl418v4jm13xf5re7ipkx4rqxlha4tfd15nq27vgdmlc3ks2uagfcaw99r4xgqq243trj3xo2cxwtaqfdp39f27g7uc9z6pv6upet1thu47vp75id0gydo2qsnplhuuveesj5',
                receiverComponent: '5spcwg6jbh16hhbot9t38vgjn79bonigh9spny9wine9upx37rn72acyrg2mjowe92hkhs3l2f53werdnzrp9mltdcuq26ltb25sy76bc3aigdiwm7h53hwa8r95qghdq7u4z37udvjsw385vjbhaepj3rta9f0i',
                receiverInterface: 'id0149s2jtyb6tllayc4bit02y0b347dw3bxwc5ajni8tcbnmq2vluunwpnctvv4k19kk67vvhj0q75ezd1x67t7v9w9ceoe0kifw9afna48gb2j3g6atfudxhusaq41suc6pefu4p1hfs1tk2d7pxmrh8tlvxo3',
                receiverInterfaceNamespace: '1l16gsfx9apqbtz9hpq8a0mf2fm7iz5oaw83kehbu8yysfswb37lhb0vba53xxhvuwd0ktuvz5hqnzp3kr80sou43ftelhtovfcpc0169ff4eog735blzj05tweszc3w6r2x6uxd4d62n1doby02frd831iedhm6',
                retries: 1297115464,
                size: 6230259507,
                timesFailed: 5742513647,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '1ugg9ohvek15p5155q763mhrqzm1swftyxvm4izq0ykexhsgux',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '48e2hv0vzncdf4uh50l3',
                scenario: 'xsw0umkfd131i0gq8tmb9wpglvkpxqelarcy9vn1rcddpox6uxz28iu5c3lw',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 01:58:56',
                executionMonitoringStartAt: '2020-07-24 08:53:21',
                executionMonitoringEndAt: '2020-07-24 02:32:03',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'qvrfwk8zqga7hjfxieptiw8lbn32vx7kauf0rfdpv9yxxvwwzz03jza36ed6goh2w12tnit3v265q5nw1sqkjlf5z67nj3m583nm4wq8rrqh0fcmldbkuj2m442juii9kfw0fg2hlm1258m9ibbckvuv0832xhyi',
                flowComponent: 'u5y5ca7059knan6gi0jtbcyt3ogxnuyudl1haimamb5tlrt8428zoc61013ahzpllq2af337y4s3vi9un5yrn3ke9twhuz1m1msydf8ih83y2ny6i83b2bkhahcs9r14nce57gntww5d6rxfjcyygwd28sb0vuq8',
                flowInterfaceName: 'j921r8th6vmj6vdtuv6xwenmr1ps2tcxif6uosmf544q8uuu63tgl6p7kvvgjo27uuferonq2ih5p2nnzdv8v7ujrp0wgr7kg6bux5skxk68ga4bldijb9sfd4y5kzcgdjdt3i06l89sokq7pusvcjxbn2i28ibn',
                flowInterfaceNamespace: 'su8c01n1je16mcgdxtzftsvbxg62oqb3flozdfruhkynl0a1d2b7rhatfcsidzoi7exeah4jbs2os1951jomhy0grsvsq7wsvfdynoy3b21bnndwejg6f5bd6vu9rf2js2xw4fklnacljg2uxsn7e3y3njb303ot',
                status: 'HOLDING',
                detail: 'Qui consectetur commodi consequuntur mollitia quia odit nostrum nesciunt rerum. Doloribus in consequuntur mollitia debitis. Minus accusamus ut atque fuga omnis rerum quas incidunt et. Sequi nostrum omnis est. Inventore qui cumque eius.',
                example: 'rg1tbpfe3dblqdlvgobc0mg1m5ul8uqgmd8kkovb90xjx62ed7elt83gudkfplibe3qf5f4983ensl4ojfofza0xxllzxprmna9442dfwr5rjfb8mqai1zh557hf8cm1m355ejvr4boas3byhx25r255919wjzjg',
                startTimeAt: '2020-07-23 21:01:56',
                direction: 'OUTBOUND',
                errorCategory: 'hsyo0esx32r2q1bixtkdm62m6wxselppjfgkpsqhg5kb79ckpfft0ch1e4f3x2c6o54p18wyi9nxa1xpfec6p86jm11ng1a4edu8ux5p5ldhb3zbfxas1p4zpeayo2i2c5jeuembk13a46n0s3fogarikaurg9lo',
                errorCode: 'vppyjigqd5og4395wo37',
                errorLabel: 758363,
                node: 7078296311,
                protocol: '2j7ebsebyeo5ajavvhnv',
                qualityOfService: '8mugeqqmm0j5mxp0mcgq',
                receiverParty: 'suksfuiny9ayc26sb5mqtjh8xdxqes8babi65xnzr8udvz6svtijwck8ggbnr26xzo9zz2vsh5tdp03yauike2nfkh8zjj4uajzqxlceyox388zlpgzzob39cvl4nxaeugqblkp7j5z8mnjxflv0q76gxhe5kgl9',
                receiverComponent: 'a1yio65z4q2gqpckiqf0jz46tfspfeynr2cme32om691mlsez5rkw1kr5dmgsciuzg0z0rguxmmf2jspql6ogoslfouuef8x874lf5uxcef5v3m7b428b1a4yvs5grw3hi5qvjpkuzx9k7k8u8r1semm26dgum0t1',
                receiverInterface: 'eaepy2f0u8aastm06fap7jadr9pu9d2jj9om4doq0fp9ymalxq1hlnhiqqa9607an02gbpyig3g2sqriwnj7db67qqr7339dol0k126hy3krgf8n1abkri305xp20b4mu5eh6jjo2cnc7fxixlnc9l72sj32v7ck',
                receiverInterfaceNamespace: 'shr1om7p83zf1ft5mk4ylxej6w1d0aj0w7jrma7vdk05l1i5pyzba8y9aon2ly7ki1v7r4g61te3r6t3dyq8dm2iqxc9uyipxrdc3z926wgglo1jxebmvgsjona8y6ch2lyyg0dbjlssb4n8r27wgu40f30gph37',
                retries: 9118288097,
                size: 9709841569,
                timesFailed: 8093819333,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '1dxi0dcl5h9h5hrsz2peb68cqad070uldqm7hyfryticj8uyna',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'zr3f23wxmyzax1hmm0zn',
                scenario: 'q42dia2bxmo5atfrjl0xm05k942pgim419ia0sg4b6tmpxxlf6sbxj5jp2bi',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 22:24:37',
                executionMonitoringStartAt: '2020-07-24 04:24:28',
                executionMonitoringEndAt: '2020-07-23 19:33:53',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'feg52cam01p843m629w1tk8rwj6zj1xv95712de4k7nctawxyz6f8y9pb5yhzkgv3cqfygwntpdklyws6xf3s8exneb1pz6kxg9r1ngbzuk6z2iuq1n1rxkblwgslgqyn9wldymb9q0xnd6jfc1behc9gjbblqn7',
                flowComponent: 'p0t79aq2sx0app10qo8p2k5pw9wiimviqk58pp91n30zaz6o9ypvp4e6cztf6hmul65fhfb6qn146iz5nefoven5inkzdbfbgukk7bb8jv1n4233f5ux8s8utyykjuhoyet8a7sngpq34dy1zknutxid63vrg48y',
                flowInterfaceName: 'xopcwjz7ls1hafyf2erz2nkg4gnsww7w0am9akuy0zd9z31ztuga4nlhfv31looxv1c7f5px65hoev17cyj8usrlh2y7rcbchjaqjbub06g9fe6qmkxbth220ud3h9ho7i48w39amo6h6k020ius5l5uux589wij',
                flowInterfaceNamespace: '74skd1brhrnw8myn18be3dh5hy0e1cj68onl1my4tz5bfwtrjwamtppe1iw6q1cqb9s17roua4di96poqd7m0t9py3eewirxznpr90sy51wr4ghkmlwh357cm94n1aq4fgambn24yerpgjbkoomzmyu76t9kqtp4',
                status: 'ERROR',
                detail: 'Molestiae ea nostrum nostrum repudiandae ut corporis eius sit. Sequi ipsam dolores est perspiciatis eos expedita. Officiis eveniet voluptatem aut molestias unde culpa vel aliquid. Distinctio sed sequi possimus sit est voluptas possimus voluptates. Sunt eum quod asperiores veritatis repellat quia perspiciatis error quia. Reiciendis consequatur voluptatem accusamus est sed rerum asperiores.',
                example: '2y10vaxlfo0ml4qut052c25r98vj4wyfvvvbuk2xhc09067lkearw8658m8tw1uakmcc7pgoa4mihyg6oia34misd8s1zaoz9hm38fabt9fpsq2ct8aec2bj5gungddvi98p5w4vrdy9bsu6yi3kqf4mflbkdc9w',
                startTimeAt: '2020-07-24 00:02:14',
                direction: 'OUTBOUND',
                errorCategory: '020rtt3d1jbuz7lub57cjzi62cpkdibaowxa63kiyzr69s3tjlzwx4b0tp4sexdjb0wfm7lh9be8mi3eejog9tq6bdwkgoygj758zne3cneu8uhvugpln6v8fwvzd46bebheosbgthi8dah259bcjfbtkigaep24',
                errorCode: 'u3bapflbmjla5sn5dhrt',
                errorLabel: 687883,
                node: 3426383650,
                protocol: 'kvdn53fqsxssa2vow6vw',
                qualityOfService: 'dvbr93u92jyd02u1ov38',
                receiverParty: 'casj8mgy73p66cltoj6k64zaw409ogvn418z30sf3ib92i9g1q3p68i7837jwkl8v6ohcmmj0gqkiw76xuewbkn4yj3kskdo1ynbvg28wzhqe6j58yxwm73sqzink3qwa9yluktrdw13jxqztgohamunrra5j9mf',
                receiverComponent: '0nwrnz7xx5boxi2csferyusoknv06k0fkl3dfsx5ljp785g31o51j8ik5teza9pukmy7arrq0d8buiftm0q9oyjn91eom66ccsur10r7swzvf40gx5w7ljk7ywanoaiakh5ofc506xjrzxpuajevmxabyhsci5u1',
                receiverInterface: 'hbrvrvtr9vqakeavh2nxzfqzne0pa2v08ibetygkhg5l5g01qdrq8nzjap0fl2oae70wjv1wb71zvaewdnky3sm4l9o8ewpq59ylri9hb3y3od76lcahs2kxktnbw0z3vask6ritznaarblu63mzj5p697qaobf84',
                receiverInterfaceNamespace: 'vxdgkt9n1z3rk2a3yt78z5daa3xyjn1tdbd1ny89nxkhwonaaxjmdogad14lnp3tfsn9r91bfb354xuu31okw9cgqjdkqxf8mbbrqbzsjlksp5yvfolamlun1tca55cmfk356ku0g5ix14hb8ufm6e0ipbqexhqb',
                retries: 9697862118,
                size: 2797758644,
                timesFailed: 6741990879,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'j1yes9w0fimgbbxrbmafhk06u8gs17m670hwipl9yr5lfwnjpf',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 's64dnlw4ouj1aq6qdsp8',
                scenario: 'fhi5qkyy99eapiervt2cdfvnzp6v5iigvymbzsb9wowwd5m6yzl5wj921jkn',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 02:54:58',
                executionMonitoringStartAt: '2020-07-24 01:08:45',
                executionMonitoringEndAt: '2020-07-24 14:43:15',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'j5chjmk712vdaupth534b60ylja169jiqc77b2whn61nduuwde6b7tsyqg8vrzgggwm5x18rufg7crhuq3tquyt6cwdz0vt4t6jk3hu1r18bqem32d37fa120kaqaebj87rejpb4taz9laenyzborzftuap4u3yb',
                flowComponent: 'p247iminogd7c3li2pidzavbp7yrnf2mx9geltidqo2sf40fpoasi8d47nkoekrzn8fzseneezueljf3ce7gmmz2iw7ww4eeqz5cx2dptg45w0evcgnj9ljudpwc9wlme5i4nmmxbym83r7ro1jzc156bkt035xy',
                flowInterfaceName: 'heg6tfyqtbfzgbnygheyipxzxtvn2gmxm3qo0v2kce6vsze5nyzn890ge5iyf22qpjme5v5ld813ryfa8zfnsg37wuzowt8r13kf1ndz264rn2eydp6689tyrzruuyy9k4g1p8pj2jykgwbxqp8yijlwu2j9amx6',
                flowInterfaceNamespace: '5jwt22e1zqack0pcsha4tlk49lebvmweq86toaeo5unrrdpduih9fgodjja5vcbzpru8flh9nma9dxrstk0csjz5sd2xoov510kyyyxjh00t3cswo6752v6bbm03gpsr3okb2gummamcr3ouwu2en3xps6vaqjua',
                status: 'TO_BE_DELIVERED',
                detail: 'Ducimus laboriosam quia ad perspiciatis molestiae repellendus mollitia ut. Iusto rerum et sed quia saepe numquam quas pariatur dolor. Qui molestias vel autem. Repellendus suscipit dolores quia qui voluptatem sit. Tempore soluta veniam earum.',
                example: 'sv9kfkii1o3o2s1kz6m2nym60tj5pg1ietwaq1uv1wqj90w2a3859myk7ly74z0cl13v443b4a497eoeopr8o82aegl5ybgw3qmtxq1pit8mo9c3kj51856kugzzcse7ron8edaz80j8ibuoxdqytiofs054wuyn',
                startTimeAt: '2020-07-23 18:45:15',
                direction: 'INBOUND',
                errorCategory: 'i249i3uu9kfxkotsmbypi3dn59on5qv72pkludblp16nwhhl6oivk2gvnpowaylu3kw3jeqeyeso4xs4z8yrb2ny9o9vjk5me9xbr9ct4pmbcll8bh3xndnuu2r8s41164eprpkk51a35kajazhvzp03t9iox4gg',
                errorCode: 'zj71kn9qx9reqsy2tr2z',
                errorLabel: 630273,
                node: 9396566030,
                protocol: 'dov9v4rcwvvppxtc4wzs',
                qualityOfService: '9gvv5k4ep2tagmqcgsu6',
                receiverParty: 'km9efxomklak0e8smm5tavpl2pkes8tj9row4ioug6wn16lnmb3oy52wabhsork7loak1ueg5smg5tatdimqhve4v5yrwucs13urvd51acweqcv6mn55u3e2njxkzmj6jqkhihqq4hmyuih196ke6g6prcdtn7ei',
                receiverComponent: '7yin2cui2790l0j69jvjmtrk7iak8k2zuj7isb0mv4a5gdafv7m7z0hrnxxi9vovm4ujcj7u6blfu4y5k1baminoie16y4vn3rhf5qjjx49kna53cjhrh13ejqw6gfhazv9p1o3vm1jchc0cjwnxrlt6rrktv6r9',
                receiverInterface: 'vggm3bi0qlo1giyia04y3e83fnvfob48t8b33a8ry6309hzvo784q9n6wy5bt2etj2a7r9qr2ipbh6rtut11qlx27o3smpqezksjkhtvwnrb3np9epdimvduviqomv37orcokf5y14iq21nebovbmij66wtuwczs',
                receiverInterfaceNamespace: 'dcxnk84f8f1t90llsf34jn17q099aj16kqzrbf8ohx1rh0xfz8an2z7sv0cjbc3z3dyjpnbkcvf3tg8k9rzj2upeox7ehalvr0tmo8uvj4mxan8hv75tm56ua850oofbz1r2p4w4cqtw5i5of37g2ksalf7a3pttn',
                retries: 1633405176,
                size: 9680628342,
                timesFailed: 3999592333,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'n4m5i2dewjxle9x429ex6393wuzrpgdy1q5mktn0bkk9vq23xz',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '3slyj551huinoz7lhqct',
                scenario: '44k9ect2h25hsbvt8tqazux7mzo0rpy4fnody4fxqhvhhj3takihb9mrf4uy',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 05:04:46',
                executionMonitoringStartAt: '2020-07-24 05:45:37',
                executionMonitoringEndAt: '2020-07-24 01:20:18',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'd3xcp8tbfrxocgfk1fyxas8iz2a4r637q4fjv2ekfhtos0lfhhx6u0ouhuzn8n2i80ff15a4vdfirq512v7vvnqbg0xpopr298wp051gkc1731673tnaspz44xmf8716lyi34hjliaiw05i30cun7gxw0lcx8e2y',
                flowComponent: '3qu05t78a8ynwbpq9te3xhzkh2enng8nma1tdv87judvc9ow2jw5eft5tce68k4r3at7epdgfrynkvjmu2uvcitkqtdm22p4cvtctcnytyp2le7wdd86dedvnvtjz96qj2elu3et2scka80dk4ia9tky11b766rg',
                flowInterfaceName: '1l2u8s7lf8cdhtsj3ltz18uz1voson4sinkfofp313qsldyupjxuh84xs2j5p0jyyc9quviz3k62vs3st04gjdpv9lfytrogx2tfapi5zji4ribgvndxmu1fjj8q6ebzno6wh48xbjv7je9ql825x2th417j3je8',
                flowInterfaceNamespace: 'fo7ofaa3f0hadec4d0mg6g7rre1o31of5ml9pu1jby7c846ddns0yioky16tcobyhahjw59e2oq2sormmts7es0ydnmep3i44nr768dj6icgs1omo41kupe9ql9sna7532lslm5hmjd3s6fgo9c0t0btkbr6yhe0',
                status: 'WAITING',
                detail: 'Nisi asperiores non voluptas nihil. Eligendi nostrum assumenda voluptas quos natus sequi aspernatur corrupti quia. Dolores vitae quae cumque nam corporis quia nobis facere sapiente. Voluptate sint voluptate omnis sint omnis eveniet ratione sed quasi.',
                example: '5wylrt02bieynjmjf01prptuj8g8nqdqbbw8eb3cbo4bfaha9gjffesh5ybwel3gbdq7r78gzaz19couc7a1rly2cwcbc9uvnnfcwkl0wxy640pi3rblrhliwkamgo2c1h3q1fhtlz1okbn3v30iduprjqrwqqaq',
                startTimeAt: '2020-07-23 19:05:05',
                direction: 'OUTBOUND',
                errorCategory: 'mejv9euaijiiygg5lnmzigss6enh6wz7v563idu49a1req1ftd3c8r5y5pppoi0kxcv3wudvryxz4f5hyiltns13ym5anq9j9y3cxsefip58pnidov12yhlijpajmotjoq81nwwkho30nyekp1rmzesgyu9zuvp0',
                errorCode: 'jypb7qp5v6kss3oq2pxk',
                errorLabel: 544419,
                node: 3591927374,
                protocol: 'mkwug5etfnfhpxgu8u63',
                qualityOfService: 'i7q1i68wl7tmrinhwiz7',
                receiverParty: 'rjaqgh5040yyu3qxspztjclv9i9u0zfw3umm0sa8uumb9v9y3edw7cgh27i3xo7q5nit2z6mkhuip5hyjl5scjfnubxnxpizqxc52vm842cr6071qtx5mkdeawhcyzu2s6cfjvjmpmi26bkgsth30wq32z08pk0t',
                receiverComponent: 'un3y2p0qtf1c2nckpl4lyhmgcnn3mrxlgyp3jv0inln9g20vwa3l3kgta8a3wp9cqysmf946aa8b57jr64obr702pebgu0vk5fexc6uo32hkiu2lo8t7abmkgsjmh8isrtv7siyyci206g2wrrejf9geinwb4t1e',
                receiverInterface: '573riekd56zuvfpmtfq5a743ovt56gnk6s7nkzewcixdekrycnch3xzee8vsool3619trgyhd1qlgahv7h5dc76o110yd0sgiyg98qzad0ex3r3a9krek6gn33ymgrukcihnqsiovbtuogg6sj7aev705iouh1b8',
                receiverInterfaceNamespace: 'qpsn9bbsx9v543zcbqg4mdth8mchys670ri9wcaj7m4nffi01o42uuj9lnv0tqzql7oo4m8ekegev62b3tfkdyt9k6m4lhuo2rculvgl04k4pys3rfncpcw544bbd4n8zvmm5bvsia09ocehoyq5l18f95kxjyy0',
                retries: 60109000212,
                size: 5618898252,
                timesFailed: 7794545912,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '65nwoty7r3phghq1iqfjdqoysiv0iwcq1e6jb9v2486ng4v1r5',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '2xuo5k6n0fro2dukajxn',
                scenario: 'bm76g34u7572nwqzmzlha59qe1hryw0cncd5jinzuntdiwjmn402ugh62q9o',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 09:41:19',
                executionMonitoringStartAt: '2020-07-24 04:10:23',
                executionMonitoringEndAt: '2020-07-24 06:04:57',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 't8f3uruzc3dbkzqfdqc2wrmbq1csim4283bd0c4139u4qv6g3kozd8udan0qtotgziw3mcescjeiik8n9aqtyrjwcy23ha2glr2raw8s3ostjmn8wu4i5b27rdv4p9y67nfku29iag0tkwlq4kp02cx3gr2z4pii',
                flowComponent: 'ncc24u1897nvmugf3q3mkrcbld5bqvz0xvuht88a5s4gxnxyi6l0m36ik6fi62hjnl8d427h2ln2457vc5z8pmlodgkwzfsupo1ero1lc7ify6q0hkiyy1x6lihw9zkdai8po4tfmv6vgp60rdgs7i7uf6nw6rxb',
                flowInterfaceName: 'zdqjd9vn1bn5lczvzeu3parloe9kpznuz5dor4cyx16truypx6grzr0jooc31h0zjv6wq7qw2gzobdw1gu206vzvyywbwldnom8d53xyk2jt5otstkqepbmpwy2q85vrbs2167xtu63c43ww2yfc5tvwwav6i53f',
                flowInterfaceNamespace: '5xy2zanfgzro696i9xder9hyy8usz3mkzp00rubyda238cad4p7rm2uoop9xme3bkgbp66kd3bn0c758shqmy18q0ypq81p44w785y3faehvto0gqh04r2r4uo4zo4r9ja28wczt99gqe7idggnxfduh5v7fyruj',
                status: 'ERROR',
                detail: 'Nulla dolore autem dolor dolore libero. Ut et ab voluptatum nesciunt ratione. Ea distinctio aut facilis sit quos neque. Autem sit reiciendis occaecati quae perspiciatis libero quia. Ut veritatis sed vel voluptate nemo hic soluta velit minima. Ut sed et laboriosam rerum voluptatem voluptatem commodi porro.',
                example: '3qhow3rdjcd8vgpeuvzuyqfub7j9ws62nu9ozdj0iw5qe36yll34c7s2u7z5lqdmcc3356nn01xukiidvpe7ut53lqidbmzhwgkbkq5uol4wjg4y3j6tr8wul5nsidtmott6zsblde404y7hgm5zcwfwci1y5x3v',
                startTimeAt: '2020-07-24 02:52:57',
                direction: 'OUTBOUND',
                errorCategory: 'qmvhr0263hvy3g4q7e1s3ujn522wsv0lu56e5habqajvsgr1tmz8a49em5yhmrelgu2zfz7e71wkg1j8p5dnpf309cg21ba2soel6bnynsputy68u6gj1o5n0io6sz08kov21y64lb5xk0dv8k9ai5naj2ztocd2',
                errorCode: 's1g65huvjkkp1h91lxia',
                errorLabel: 880836,
                node: 9111908027,
                protocol: '0fpcnfxe6kiphvb89orj',
                qualityOfService: 'cu1hdnfrc690r65qqdkv',
                receiverParty: 'oe69dnsq2elk5x44mbl7mr153dkulklb7ttl7qvwcywtqg8qe3vorj3f9j0qpkhguoqsn678omrg20984zcdvpibf8w9smjc5wa64itnuu6kvzw5ozen7wunfsogpgi3yb7y2mzh0d3radsmq1sjb57f65ow8dpt',
                receiverComponent: 'xz3bl7e2cp2nk1rodthywjk2d7kb2yf4zz0a4f06vqtzzr51tl7n9juw7hwfa3t4f1x4noaqwmf8mt4d1uuuzp37fe6gthn3kqpcg352x33p382lib5za030rsln1ofdd9jyc16myow4qen5eje7988psf4fdg12',
                receiverInterface: 'hiw3sl68fkoqabcp8hqtdf5jqskiwj7m47xtxabavpskcbaj4827wyz2giihkxdfgc3x82yg3aniw51pe855n9x09be3jr02xruvo5lmiy2ya59zoz31qxzwgyrs9mwbww9vfv6ese8ndqjm7a5xkx9j0kas4qq6',
                receiverInterfaceNamespace: 'c1rqpre76krhd2asaw5fyaw4um4hp4e9oaol7rtur3cpga4hzr0eivwvnmoih241alhib00tvgf3hg1ijeazf6575452zgju94ox5it2tnrom7ututil1djeiu45r5syq00p9xukqq2db3le52m2dyd6xudhwf7o',
                retries: 9289624265,
                size: 90465110793,
                timesFailed: 2704460409,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'kbz2osqecsfxnnd074bgnyp9ebg6td7midr7votuydynilg6xx',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'dcdbthpj96zvyz1umqmb',
                scenario: 'py5531ho6ht3idgt2q2fp1bt0xi9qyj96obanlz5jhp4724ilut2ps99ysbx',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 11:28:58',
                executionMonitoringStartAt: '2020-07-24 15:51:05',
                executionMonitoringEndAt: '2020-07-24 11:50:56',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'szmshfoyt64et5ear00w0fp93nk9mxn1ae2cus8lepsjijb4ynuj9wkbewzz79pp13c6dcrzmnrrnmgvzvd0ammc2lm9qr3odu6a8tsqzdrcxo38linhz8vhx2qmwvz9kz19r6bv4liueqicuvh46l3k04wll35h',
                flowComponent: 'g3ros3p9dgwhnmjsexk6fgcs4g11f5quksxv62nxxif3cm5svrkopjcw4hxdnp6onhup54dx3iusd9odcoe6ibohfu36j2d2a338e6w4gssre2bfsk5pjl1cvcsa5pa5q0stk1cl42o2rql9f2hwfix0686p16bm',
                flowInterfaceName: 'q0e11809qcb2l8njlikux99tps3vhxvy7l7vmnqnoxoc8i32mk3z9v4947knbow8rnjpvfmb61rnq4g2teyetsuwn6olt7lwdehpkfovgd6lwsgt3wvlpbxiq8i18400u6yc6osctczlr3jr5y8vlzsxm5w9yhbt',
                flowInterfaceNamespace: 'tm54ow09t7z8t6a3eqqlqp5ahfb9anlzdjg4drhskh4mm4waou3cg4bbr64ousr90xmf257mzkir6ibb590yir8x1tltjmz1ykibb043r3uwjg5z6u2xlxhwoq42ab29j644r8czzcm3xv91cuptb59kgkaqjjd6',
                status: 'SUCCESS',
                detail: 'Est amet sunt esse soluta et eligendi et repellat blanditiis. Veritatis perspiciatis facilis delectus numquam suscipit. Natus laborum qui eius optio similique. Magni est voluptas sequi maxime suscipit. Blanditiis voluptas alias voluptatem aut molestiae placeat dolorem.',
                example: 'jqqzma4owwezm3hgjsgnlwco7hzt2v8pn9mnj3qznk1lya7yq7hoj2vvabj869ppo7u9k5dtti498d24aqdsuxw5cycck8keej1jh2m7f2iss4sasf0d8nknks869yu73bn34i2t136scpdjn87c6984ng9ncgvz',
                startTimeAt: '2020-07-24 04:35:35',
                direction: 'OUTBOUND',
                errorCategory: 'vite8fulz9q80paqef47vlozyxpjm70uaobmeabhaid5qc13upq2o3f4e1o42ytrfyh0eci3t85iw0m4c34i1g87a37fkbcwshmr4w1aaor172v49mbct73x9tixy7ok59c7swgu9zmf0r8446xh8yz013erwtg5',
                errorCode: 'n8paorhbg284722mx5yt',
                errorLabel: 993519,
                node: 8651209134,
                protocol: 'ftrdl9xb5kiwncj42m98',
                qualityOfService: 'vy5nnxeroslqpgq1ghwr',
                receiverParty: 'mj89watllrunq4ggfuhqo0493hgxi5u8qhiq40bwlky127hbj1kcoi4gudh9cj0tp7jhom36i5388jazvv5kaxngmzhsdlivqnp9le6aq7gpmnikhcz8lthe0wqgdp1n31g2azp3uxo0urfvvn6v9t9kesl7l7lf',
                receiverComponent: 'gb494vhribe8hsrxf16xi611vocr5th7w9s7t59s86a95a2nbzgmdvh7poafeq8lnlnvrkbvk5svksilv97qfnqdoojvuhszxndl2tk9qcel6ytox2xrnoc5e04t17iabur3s3pi0hkgvvqyo5y7gp3j1lf36tb5',
                receiverInterface: 'uyrvnfawyb506oz8c8398nm3kd2difqb2dorck1jkxzpscm58crfeep7ev61lr6nxvyg3ky6au5omn7cgyrzhpszs185x1hmeyrchvbvupsyu2qdbwu7hokq7c6c73q01kh642kesysy6e2e3eea84d8pmi33uqg',
                receiverInterfaceNamespace: '17njhlv7udpw793gjd0pyt8oxwtb4av2yj0v90yjij93ourrftr1n9fj6kifncw2np9bul2b37xsir3dcjdgb2kjyfdpph4uh47wip8gapecty0de5eshkq4194hzlv456w4nke76cscdopahqw5uidyizkcvhg2',
                retries: 3242122990,
                size: 9612867194,
                timesFailed: 90051903040,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'a9no64m1n3z6ph81rsg73y268z2m547fnn41zg8kxd1wm9wxmd',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '0h7fyntc0uukqhdcoxm3',
                scenario: 'wl89qzx2mka9ml6va6ckddk2xbe7f5ur52mfrbk8l0047g5w0j4zeg9a8sox',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 00:41:34',
                executionMonitoringStartAt: '2020-07-24 16:51:19',
                executionMonitoringEndAt: '2020-07-24 07:18:14',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'zp2yl26bqvvlr7qy1u1g30ksa1xd44jpq4fkazhnuvi03rg34wf7oytl8zxlx124fhmz33v1w4egl61bhuo6ikoa9fby7hq7qtz5fvm8cp3i20b7qzdafykluvvai7178fkt32w2i529oscmkrv7e48ppepzd50h',
                flowComponent: 'hwntoadvyrmqw5r7dgom9vwxc779jcfen4omryim4jskxcwzi8um4h667r3n22pl78dqg8dkzm46j59tywz7h5xosmazfst662r44e4qmmfs6t8vwfpad4c0p1b0xdsm7d3tq5ec12vxpo76nht1yo2s8so254o9',
                flowInterfaceName: 'wm8i7kkxw4s80zg3x9ma4gewaov1xjnqpjpxbaulrt2s720ltph0i6gh43ekclkengflnasn10k9kg5k6ej2f41xr78hauq9299mzpip3cukocwuuywm4neh0zzkqaeqnwujs4jmzssfih5ju0dx60uebal2mqtj',
                flowInterfaceNamespace: 'jgw5ien82182pqee2xgkm1h9ror5he6s8kys5946ffougrx8yx4872ewtap4hpwtqv84g4w9c6o9mn6xj2getpw6za37kbkckmwy1qnxo5htpropofj0o098xaziaj1sj1w4wwq7wlt9gisp1aklehkighfhecnm',
                status: 'WAITING',
                detail: 'Illum quae nihil sed molestiae deserunt totam magnam veritatis qui. Incidunt officia officia. Id nisi assumenda molestiae cupiditate qui. Labore fugiat quisquam voluptatem voluptatem vitae sequi ab ea. Ipsam dolorem quod facilis ea ratione non.',
                example: 'awetl62lxgtu1s8e5cjemfwhmeq1pyqjn3olec891pzso7apidk3bbq6q9w4qepewtm8v3cgk6b0f3g4ss5ctb1c0r3qcsbetalcrjobnej1mls8nvpaxdbx91tk4quwzw19ga955oi725ufais7a4atquf7uamd',
                startTimeAt: '2020-07-23 21:07:14',
                direction: 'OUTBOUND',
                errorCategory: 'ce625shnwewck9enpa93t0otm35hdo3wgddeobzq0cm5v8l2s464k3xwu7y85vue3ytijdwrwxiyv28sgui8ue3hawn2k293crjefr9ipcwxe4dygw274seed0ijuu9or1y2dvimbkeb0zdr41fsxkc7xbd3cszq',
                errorCode: 'qms38386i8jj9etzr8k4',
                errorLabel: 621413,
                node: -9,
                protocol: '4hzuccuu3q3q406nl508',
                qualityOfService: 'aa4d1gesuskagfalnhaj',
                receiverParty: 'ryaqs036bc9yminlu37w7int0tq4bieap8xnvkypi1m2mhcmvx6kbiiapwtibo1p24piymlvdwdcnht449ns42qwbb7dexul0k0j43w2k0wo21yihb9337rseh5ce527effp7ziyrp8a112mvklzcande54dq9kk',
                receiverComponent: '231vrrb4kvnwutz3i6thdpfx0uy6t3na9p3flzft1ryzlhzopydvu62vjbbp35poy2dos1o7dwfd713l95pu05zwyfhy1v2fyv3r5diw7vykiv31bkf7d58269kg18z8seipku54kev4aod7dr95bwsdd2b6euk3',
                receiverInterface: 'je2usyv0u0smckefq6whsi9xe19shbol61g4hmxvjcozsf60a4qsrcb8lt3g3thqqmy6ont6uczuiuqfnf1cb4lmo152dqer2bbfg1qt9qey313sb9pwihfqkeljmc9vp4zey7087ltn5esuy6o2nx6qgzmhyoal',
                receiverInterfaceNamespace: 'qkpxpeaa2o00bcjheacx5yih410v86rcc9rdoctawbt6u77x4ied8ardwqbnnchio6rp4izefm5sktc0oaslbnxjo80ocezkrdo9azrglgfrg3t9ttkrx8lzcx2ybsflwpf0cm1m4owgjrvk7e9a86osoj2dyees',
                retries: 9823244852,
                size: 5671441344,
                timesFailed: 7983885108,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'hy4vuu5hxjfvg4c4jzgbd1q4tfhlbpaf7zli1gicm7fpixnnby',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'eh4mfvz7gm91y9h21lzv',
                scenario: 'k3z5cshtrf4yyl02oevzc4932hgo0xjervxabmyopdragye13o09svfhtl1o',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 08:06:58',
                executionMonitoringStartAt: '2020-07-24 04:41:44',
                executionMonitoringEndAt: '2020-07-24 03:46:19',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'o4vavjrcx1fglz5jmggrvw34t8t5gfjrkrdll9hnz011s9cj47kp7u48nynrm6g1p3je9ahqx4hxm5jo95fec6a5zrracze5gzqxfnrujjsqbws98k22t4artqgtxptmb840okt2qk3c2ut8mcmmgm7q7uzf6she',
                flowComponent: 'pzklb3uq1jes1bgq4sw9wlpjifayca90ki3rzkm65nk4bvir6dwjdbi8yjvggsd2yi5vqjj4bm56n70gbt5u44pw79758ayedk6jp4n6najwe3kk24536lc788go90hvnw3z0k60nrmbeiinptsohl6rll2gkr8t',
                flowInterfaceName: 'wom6lj0f1wbb0m1z5yt4idng99nfc6ghc1jk6xyyojo15zan3v859qx61xobxkr4hkbt97mgs5wmd0fqww42onp6xqsfnko3crwmtl3gcowtpjqnbkdfyp4e4qrt4bvv124faebr3rgxyv7g5e9njehqbu5l3ny8',
                flowInterfaceNamespace: '4pumnnfj7w29nuwkuzun2lnc1lf4gon5jg7gbr83ent870qc2amnwek619gyqpf9h2as2et7jsmhl0wq7qmd4u36s64n8yc8tp9j2n3e7s8f0ivzcb57n0zc26fcld7w0tbvn7dfrb3xyk0ulb1i8gx5aubwrtta',
                status: 'CANCELLED',
                detail: 'Totam nam placeat tenetur quaerat at. Earum voluptatum et quos non. Neque in saepe reprehenderit veritatis temporibus voluptatem et. Aliquam quia assumenda veritatis voluptatibus et.',
                example: '5faazpsv1ik9rlb6zlkc9cyc0mdzoz62sbpmashlhampxi36smu8keyx79wathevjx9y2gbovr1fxjbj5z8bxcu5ixedgnh4zmqwrqko8hkomn9su0h73ln4ak268mbj8mguz18ntrdh9wmbf2uq60wslyx47vai',
                startTimeAt: '2020-07-24 05:00:00',
                direction: 'OUTBOUND',
                errorCategory: 'gqvzskkspcrn5phu0hmsqx9w6qgtakudcyebrd5324lapn0tx5vng07dmiks540sbehy1q4zad8srwo8cggd1u04n32hts953vzsrtxffoqrjcdt4twfgyorcygxqiuos12lsalq9wjol6ikmj7y4gncz40mnk4i',
                errorCode: '4vuwadfthu88cwf38pa9',
                errorLabel: 744613,
                node: 1360113477,
                protocol: 'cnp4zzmd1v3zpdgpsmdj',
                qualityOfService: 'z5f75fj24zayo1fubmjz',
                receiverParty: 'j3tlt3xjrgkvjmymdv38qlufzduiyso5etjaidscab1b7ttcvhmde76owkepjtwbqh44ulgvxrhrgpe8cafxdb4tqleulwv0hc0105psdx50qd3k1f0xqp00woo3nycp45agayn3l1bymmqi2azg2dpe6uobsfwx',
                receiverComponent: 'y5qqnl077owvqwpvp1gpzqw1sz0gb2esba91ji54qntlnq6wg1di43u2182yyjaq00luyxx9eit9rrik89l9kw8j8fvnof9c89xd57bwgm361ojqh6ujyyzy5u39yv70czfjz9f30edgqpm0o8h3eeaovdbzq5w4',
                receiverInterface: 'upha7ti78a3bfv47ipq7x2204yu2elcbcfdcj4vdqaa4ty4b3tmfglpyj9quvf3yfsxwmyrchyc1ejs5e2mmbq0kdntrhvx7bpgonz0jjvhsu907gx1pb3sjnuowkv7a5fq0hedtc8y4reqjdfgi9x2l1r1p5w4k',
                receiverInterfaceNamespace: 'l6gm4xx6nwpevyrndvsattbu86ezzayf7cgz7kqyrsxcvmino825m4jy35y0axtnive77bw3f3xmwgrwg7xarqrm03kukd61kprzbqrr0rwkbtilh2esdrxg5u6om6pp6ylthuamv9lu289xonm393sge7305ihp',
                retries: -9,
                size: 7085614750,
                timesFailed: 6928225158,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '9p47kya2gb3qkszjzot3h0uqjz1o9wxk0m6g42pz33bwan8ygy',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'xevf59ro45cbndrwfan4',
                scenario: 'k0e6q1eck0c51o2dz78th5ycsymkaa21yc3bm8c33r950rstluu58s2cl8ap',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 00:08:47',
                executionMonitoringStartAt: '2020-07-24 04:08:57',
                executionMonitoringEndAt: '2020-07-24 00:29:32',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'vnt0k1esy9krtmplfxdkwmjd0oneq84mlvp9oz5znovgdgfd60jegt574woqfnab9tykz0yvk6wzprc29u5ur0tx9n7mpi89lyr1kyb24amr0hr5xsr9bzghhrfxb0usqkb1iatxwpo18k1nme611un6vntyv9zh',
                flowComponent: '4b9lvuxise2qwlcelyahl63ly513auir9aaj3ywgikwdly01vn0cxv4fux9v63wfx5f4i1rk0b41uqul2yac1xhn805tvf3j7334odp47rhgc6j38cvzzcpphildty1nt0imvkc9opyd32y17xn8vhzz9pdlie02',
                flowInterfaceName: 'i57xrs8tbtkfsviv7ddxtvar9bcct5o6bleyq6wxkgpff9bg8rvjh3ae4q4a5ng4ixxt7dszpuokn12wmbszge4lszt0vie2t9z4n2g7stz02s4k9sktmmvzfdkcyu89p7jjwm7p623vh2rwhv78g64b68wshtld',
                flowInterfaceNamespace: 'twpm923bi0hxr97i1o7w2l1ed8aqa4pkbn1qlrbpxgkduj4cvt7zeqxpe9h7vmdyw159glro7b8594fqqc2vnlc5hu33r4w2yrwqr2ge9zcybsf5q9duzqgi76nt5d7vc0e9falm3nm774pnqbd7inxsjy5ypki3',
                status: 'SUCCESS',
                detail: 'Natus saepe et aliquam ipsa quos amet. Voluptatum minus repellat dolor. Ad quia dolore blanditiis quisquam sunt. Et commodi exercitationem consequatur et.',
                example: 'dh8ktugwi3ggjeky62s0ygq9lww07e0ygitlrcbdivbkie8lfsz43nzwku5stxcfuhi7385kixweawer0cdouzmi5w6kyes95nxtodx0marvwoy7uy621iyncrlit31iczjqv5w1de033ar67naqr5b4zs3nvwls',
                startTimeAt: '2020-07-24 11:05:59',
                direction: 'INBOUND',
                errorCategory: '1buzca6v6tgl5g7218pt2dhdrrdkqduo1vw299mssl9ag1efym8tcsnkwrjk2psdcqyi6ubehv1wxkvna3bp2e8zji1883nk7ju5tg8w6uc5mwb7dipbp6pvc0psn7nqxh0dkrmutpdvvuinorb9tp2ljspvh5mc',
                errorCode: '1orwfsu7ixf3cjmhoeqe',
                errorLabel: 803259,
                node: 1763599681,
                protocol: 't79svzr3rcqp0d7yjrls',
                qualityOfService: 'x9m2xe5b07p15sni3axf',
                receiverParty: 'v1my6jpjklxal9am4ruqqua52brb26u430cykdl4abm0jwd2yhahrhnwdvjlip9swga3xrw8rgp99qd30uthrbdfbf8iec2zyl7ewt42tijqlaj8lbwyecw9gmow1ouyi4gmlmydfqwkya5ddznldn5gabwhxi3d',
                receiverComponent: '5fm6f1f2trcqhikifrd5tmkvh1zausnn2w8i3oc23id9tlg7sfkin18ot8jsgjuay99796pm1ojnrx5g96idwrlg9m15jw9xwvo3r84fn26kiboe59rwd4wlnuqlxrl0n9l76nq9c88nfw519hn8gtm1wvod3deq',
                receiverInterface: 'pmlvu005mwraizp0frl75inq0zco0q6wi41jxs61wk9glu57y8f4qlcnmwvjx8bddetu7j06mreptbypg3l17kziqas00570f2u4axk44zs7ynlhn8a5gx49drg8s6yeo8ff7zgyz9eu8apkjk3gakbxg9la6ihw',
                receiverInterfaceNamespace: '72fpbi0hxahz9jwnf3nbgsokvnbp5u2v1wim2t3z2wvxe4am5q2zf793mh3a8cnfaef2ocx02anr00061175wolvtfs7etza6xpvfzo8irlu85brsntkbnqdcac4cmwd3971rys9a3vf09fd4eroh01eikfvmlxe',
                retries: 3210316061,
                size: -9,
                timesFailed: 5087116163,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'r941uwqs6ucs9dn5p5317egsfel6kl2446syv09h6rpqtkxmrf',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'd4dqcwggbblrfhg0kctj',
                scenario: '5l77o85klzju52i43ujdvsql6da27qusf5i3325asripl4aepsyujtj3l3jw',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 03:43:29',
                executionMonitoringStartAt: '2020-07-24 12:14:38',
                executionMonitoringEndAt: '2020-07-24 08:53:59',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'm5r4gv81a02yv3brbsnqh1zi3v8nuhankyjh7xi2xq4c5coq219hicepf8v53rfglz8xhz040gfm6aqxe8mqe4xrvu7a960a1tcagxuyqmwqylriqs0pk3ykx9ykuvsg6ty7eb626zdsudpv3oltuxvda04dy0vq',
                flowComponent: '29hbaab639u43hgufwk30k36soroe23f31ftep58qsfy902zpk2deb5jakvdha9abuf11qgjudo9sztclqfgxuxgtwysj5cq03fh3zuj50pkbxf8c47k602mmp8pva4y5lh0wpknlynyr95d6irs4npf266ltz31',
                flowInterfaceName: 'dnufy3johslx0l3is4r2r1xzpn0wcgkt3ox1q9gfredw3ipcaju96htvc7ezzasom0kuxrbgs30f6vsm8qtwvobyn3p97h9cahaapxla5ks7qhnq8ylqepctlca1ob4tgk0rw47jqa5d5hs7ta85r2bup1f8trag',
                flowInterfaceNamespace: '33xcign96ccv4ttuinfidfa1pltue0ftbthz6vtvv3nw4zjz0thcdrqgtkzjgs4fc9xxq1ow1atsgb8b6190aqfaj8qssocgf9nu1fcxs14djqjjb802qnpp3erv9kf4bkdotzfcz29td6eib3btpynxquy6xazl',
                status: 'DELIVERING',
                detail: 'Odio est error. Fuga quibusdam consequatur perferendis qui optio modi odit consequuntur. Totam cum ipsa est ut enim fugiat cumque molestias. Nihil cupiditate reiciendis nesciunt a qui consequatur.',
                example: 'hlk8g33ixlkg943flrozc6ywnz9zd5xnmplxmwxbkfnw59ylq5lyr7wamd3rb79m0g66pvwz8e8bfpjfij5dc2aq3rfk6u9mu4mtol9jui5qif3jps6dfayoaw7ihfl3n01fg33fbndj1jsk4a6w8awh21tltznf',
                startTimeAt: '2020-07-24 05:08:49',
                direction: 'INBOUND',
                errorCategory: 'vzkjy7v8x0xbcs87lk0s3cpgzic41dep34awtvu4e5207jj4ppwmm0ofgsgib8811jpjuuzzfxk5p2stv9memfcilfrutx69wygajgzndnab8qi0g81sqvqbpl1r1sapqefkxe8rwaljnrjmvnvfg5nvepvyobni',
                errorCode: 'e92lvt5t0lz64qv2zk1c',
                errorLabel: 358164,
                node: 6645035831,
                protocol: 'h1b1ckaq9c0k50huwz33',
                qualityOfService: '4ulv57kksdawz2ggbnwy',
                receiverParty: 'smws6zya74cszr9nxd2bpte2x0eukpg90m9uim3bk5wdrjnzctcfvopoewy25d4lapziqure2vds3tovpbozz4dfg20rn2m5eg7v9jkh0hbbbqcnz025mygphxbz8ue7xzdu41b1dtq10bkybjtrglrkix5hu4zh',
                receiverComponent: 'm73g3dvvpg267cksir7n212l229si6ngu9vklnmg2566dk60kxwhllua3gwdtn2bscha40kdp9omtvkbs83pvnz96jnwqb6ot2cocjqc6hjskh5zvmq345pcxgexjo7buv7h5466y7bznl04y0iocgz54ald8caq',
                receiverInterface: 's3vcapvlexylp4qqqwa169tq5znx32ga3pspkeoh3k6agfy0t6yppp2r81f4ae35z1zgnzoojk2qqpq8t18tgvi111vt2nctzr17spok9n3e2nldc1nqaqebsk3zf0oo0mlc21bcx3df2v4o26702lz1gdgi0g8b',
                receiverInterfaceNamespace: '1ynjt1mjjtwxvy8r4kgrzox790hiq4b09b1avad5724obty6oafqjqtlchi0274ph3bzmtzdeumsssent5wyw1yfgr58hy1vgqids9vmrs2doyuveeykf6cu0q48idvz4olhwkpoyy2dw8t7xgyq3ko2ini71ygs',
                retries: 3031467356,
                size: 5668635969,
                timesFailed: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'i2kfxsm28863aww5enuwzr7169n92a7z49zz6ldf6fj4i0h54j',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'ngwxouzalsp05q8maqyy',
                scenario: '0rls0o65bmdtp2qdu6ubq3nrbe9rsn43f6v0oemd761f34uxry7s0sezg8ib',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-24 11:57:22',
                executionMonitoringStartAt: '2020-07-24 17:10:44',
                executionMonitoringEndAt: '2020-07-24 15:59:19',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: '7f293a9qgstvr9p69zss46ykwif4zomhgbspx8386tz5dk3cznsqd14crk97kb246xffyrrgon39yw27i2vx4uv1iqjk40qss7xabvkfngywpq8zdsmsge3o6mwpukkqqs7yuvlzfupymlsccitarctc8x7bl25n',
                flowComponent: 'kpj42zt4x0vju29evgq5eahd1bskstqfa8r1y0j8lwizsucnrzzaoo2xk5qrkc1o15jz383ijgdm7aeojueit72jtironfu8724w0sdo6n3rct59oucbehdu4wwv51btepim48hf8n944e01wvekneq4j07t702g',
                flowInterfaceName: 'jw99cdjkvkho4s838nr7f036mmus1xvf3vcati44z2kqqvc7slptfnuq8te81qyd6ptl347u2g82dujyqwk7259bzobuidglo0in0ve3ioinj2ocylls93vamfxnewl33rg8ggtmm4mtjl1ywybdepr4a01qjru0',
                flowInterfaceNamespace: '2zs0pgz6oguwy7xbcxlld1bc9fnya3rby460au7r4bfwu2zkfroh2d2dptwxmujfdk7ynsn87jbx5y0q2x2kcx5g0t9dovxg43s431nsfs3hhlccdop4e2wddr2iv7ggiclxtrw9riz7fchbe0sy69jo65xib04v',
                status: 'ERROR',
                detail: 'Facere tempora provident cupiditate aliquid mollitia incidunt quia. Id sint fugiat. Velit soluta itaque rerum facilis ad dolore nulla reiciendis. Quam molestias cum cum eum qui incidunt sunt illum id. Est rerum modi cumque similique velit. Recusandae minima dolores qui ullam enim.',
                example: 'k0pn41g2gdl3vxepomh5ecbyk9fjfv8ak4p201ekkr1qfarpgcqnjf6nn9mq7v93msxh4stnsbcpql76t16bq4eq998f9b4vhsyikbrhborm472buviwkf1bx1z7i5nt87q3zkd75olcdrb6kq3olmjpdudtim4e',
                startTimeAt: '2020-07-24 05:31:53',
                direction: 'INBOUND',
                errorCategory: 'w0dmlknql6gt5ohlejimwsvq1gxj3m6nh4o9dp6bt4vu2ifw5jl0tiwvj5v0pevmufmgsgyz58ngzhgdfblcig8ymx6eqttczbvcrqpope53upq9hfzm5f45frapa1slbaq3lk8dfcsxcxci4jwxso86aifor2gb',
                errorCode: 'fmnjytczwmu5frdbd2tx',
                errorLabel: 812771,
                node: 1993537144,
                protocol: 'drudml4t1woqihkao681',
                qualityOfService: 'vxbjbhapp2fibp93c8h4',
                receiverParty: '4k44le1gyuotfgp97il5mu82vwdozcp2bqee99qbikl677hjvgwet70sv7blb7dd0nykpviqyxamsav70f4gq64h6ov4cggggiznea3pba758udj57595vbvwtk1g8y6lue0wdhu46uh2w0wnxi9o49yagydq4fi',
                receiverComponent: 'srvklx8cx5dky949lfp1qne4qzjelkqpxaq8bas9a3fd2ddbjvqgwierw4nqahzluue1x1uh9q8yjkwgwdn2j35a8q51tfvpegxpxdh2h5akvi4g7xrgy23buwvavra3am5sygxupf5ei296i660v5028534i3g1',
                receiverInterface: 'wyl7f08he3njgs53zypeya48qrph7ry8kq17cg8e9fu612rag5ntrzomp8j2lo8yda9g24ah2ymq3128gs1117xkp8x2e47nnaf8lpzla7vd9e4ysrxyauyldaad2o909f6la5r07dr3zj6iqetx6eqv10x1l7ft',
                receiverInterfaceNamespace: 'q1slkrtbtrb5vw48u2eev30gb85tk3xl9buuh9knvcwj3q7hqdmqvw95okyhizurhlcsbr4173jz706xa2u9m0u1gtpedj656yo9fq9ffwo6zywkmaklwivg0ep3dwuwsq5wlmn027xa2zsdfmufe1jccfu9egpw',
                retries: 2902127016,
                size: 4471012659,
                timesFailed: 1748478212,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '5verw9uglzu7b4kv30b58x45uvcycuxhp42cmqsjcbf1mdu2x0',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'u9b94978w8uhrsno4e4j',
                scenario: 'vnlryukjda74xd7fwcjlnxidf6hrlwwoqkk9n2tlm70cey741oslahrmyhy3',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 17:15:17',
                executionMonitoringStartAt: '2020-07-24 00:21:27',
                executionMonitoringEndAt: '2020-07-24 17:45:38',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'ry9l6cwqc8tlof1nd5fde2oy75hr6mtjrhijdqi2cd9f549d894intng6we1c05mcokutpcetk8qgn5lj2isqbr3iboiuamkycb8f4g9vtdnj9tj5upo9syt5t8hm8p5js4c6kn0tbgze305yzgx4pzfrx5c9qp3',
                flowComponent: 'te49sfpf6ujuaunake03mnqre9rdk72qrtsb308ekrhylrkobkgf83ku3wadpougpxeq0dwiyr7oi1hsju452j7logtf803lv0hs7chp3lcz83isb2yxe8tzyyesd1783aw92dsjsi37ukcrosm7vrqe76s7kw3v',
                flowInterfaceName: 'nzdq4o6zwe4siyk3td7z6pj3j80j3xo7yborci2z25j3xxg3hp1ag32llk6su3p614nxo9xio4vqrznosbg3d63ezdf14xe3k0xqa759ccqy46bqxtmjaoi98f01468m4qdtdsp397966ae169z660hgnjoo0mjt',
                flowInterfaceNamespace: 'kiwjq63ffn9cxiinlb51n9xag68onuazp1asz60zhbaejgmxc7bxrwqcdypktnurz3pt039g7mz47666oslm5xav4yxsrx4cfn87bpr2zhq6u0rgxcqdz1w4vsw7wp35l89uzlyubu1ed1o443zoyonqxxpot3h9',
                status: 'XXXX',
                detail: 'Aut quos repellat asperiores illum fugit ut cumque quia. Sit expedita dolorem beatae fugiat cum veniam culpa est. Facilis consequuntur vitae in et dolore asperiores ipsum.',
                example: '2brwii0lbsi6xto3nrcmpp7xqmf5rmqwvcm118kenv3vxe0tmuf5xq29v242ywx83wbnyf0sr1p4oun1t3ocw6o9iix4p0wj8cqnocrh40lcnf1joow6k8zg863eq9fqa5917yxh165zhxtc7xsz80l1ys43f3nf',
                startTimeAt: '2020-07-24 00:29:35',
                direction: 'OUTBOUND',
                errorCategory: 'jmrm4j7or5oym827s4jhkyzegws4lpbsclfn28hpl8qkmhl81j1clb0taabtwgl17qeeqf79t56whiwikwcyt0z5k3999rl2djj3p9f8zapylhyi9oegb19u37npm63u9t0mhuw40vgg147svvdmhmtwnybkm9f7',
                errorCode: '5d3lhqmbv3vkt4nhjgod',
                errorLabel: 176944,
                node: 8189327058,
                protocol: 's07au6dvkzs5qw0pscms',
                qualityOfService: 'xkkadvz5gvx1du5d5np3',
                receiverParty: 'cq1efv9h2w0kglnkgriyfuvdk322653x9ml1u0yx03iea0h1uh82vqud81z7p68runza2xqrippaf12v0mvvv89ikomtck4u4kg06xqy89tb9qp2s7t4b4hg27rnf44la24y6k6g3pf7uyyc0f7e8ztu0hlnh4wk',
                receiverComponent: 'nkwx5gfdksmgbween53bu5s4tstg5hbptbxgsua4jhusqalgd2wdkussfz124ovf79z57ldfsnalbeqazlha9sov34g5wad3rnwigford3djhyshmla81cbb852adxh1uxxbegp3jjwy09m0bootooemqio0qs3d',
                receiverInterface: 'vqsdrm6kqq052kc3v70bdlirk385zesslf86t1tz9yxgzkdzr34762tajzgxaug4l9934u0fyngc9chxve0u3x1t2fr0omxtuaf4j8267gvieht77eirtvep1rrqsomx4vydsrbhj3v61rhkgekqh0j9ok64lst1',
                receiverInterfaceNamespace: '4rm8whim1dddtue4agxrbgb0u0gmorftnpaszl2jyde28ln6bmrjwduomr8kc24dboc0skf5zg3z4i480kqc9nea47bjy5kw9pfdzpdine60clil8tyj0uwwhl7i696zeqg8ztrio16te3ollljkohnxsbaupvqg',
                retries: 5888335931,
                size: 1517353367,
                timesFailed: 2047438664,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection has to be a enum option of INBOUND, OUTBOUND`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '0fy97n1p1nfdihoe6bwqf7yxa4j04tak5xeqhzyh7wnd5yuax9',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'p8maonew7w828jq2ozu7',
                scenario: 'wezzz6zmyzvqffyv3pptm9pywz3xt3p9fsnaoef8rg1gupkx12rbh5nm3wvn',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 08:22:16',
                executionMonitoringStartAt: '2020-07-24 08:17:45',
                executionMonitoringEndAt: '2020-07-24 12:00:03',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: '8lq5j4pjkxgyms9fv8dr8rpnbzgqpjvzb4yd52gth8mggb0z0upv1t8cpm9alw3m9re8paumnu9850bin681aaoyiq8sfcf1gw4p1zwgg2tkznp02u5jmhkip8du721aswrmn06i1gtk4bgwqmejyfy2ai7x3yis',
                flowComponent: '2e8dmewklsff51tblw5y2pdaqo1xd049ec8vbcspqamexqrtt8nzud9lar2rlqds40sniylfe3cer96dsojfemuo937c1x0291ghpoqapiryqhtm267jvc07791gr6nrrcz6zajb459yu325p9px2wf8zljl5tjx',
                flowInterfaceName: 'x6e3amcx3ggve1k63karnzz9l4cat28w67f0qa8k58kauws9lvpaw8iwp3l0vy4zxmyh02bfo0r2c3r1g23h87481s6rjhdgpi1189892jjnhbs4ryod2ne26k9d8m7jqp9mh4t7b4b11gmlbm1zx2j4bbdw7e6z',
                flowInterfaceNamespace: 'rbrxktamq3c5p3xjbzzdaoomhxa98fxhtr9gwmrs5x7actb9whiffw92jo1hm45t67nikpx5iude1za36uytah82h2neta9nwl7wkw092bb30fvm5w8wohz9tjxsdmylnf7wdhjiz6baejll61v5zrny37foawmg',
                status: 'ERROR',
                detail: 'Aliquid aliquam voluptates sequi corrupti eaque voluptas accusantium. Ipsum omnis eos exercitationem. Similique rerum distinctio optio sed error qui aut ipsa.',
                example: '74wap6bs0k0x33w065xt8jqsivebbxw08oocrf9cec4xyangj135484602dqhqiu1zd19c5066yxcfsneozg4qj2lkfm6w1mrkjoqeomah6ab0ajh29a8z6gwrdzwj6in6aerddvk9n3drn44yeksqs2gf2x0x3y',
                startTimeAt: '2020-07-24 15:53:40',
                direction: 'XXXX',
                errorCategory: 'gpp4e9im5sqe9klcof4uu5dh5j1csbndkatqkfzfz90tgbp3r03zkqapt1c4z4pv4al3910std87v7q0bvdasmh1wtchbz4bp96fw30v8tl5ct3vzwd2rqq7kpl9u4w2cl2tc0nl0fgllf2jkfooaxldoxi3orua',
                errorCode: '0dexmvh7m7rdqw2awige',
                errorLabel: 303762,
                node: 8944281484,
                protocol: 'odlsmc9f7l63esl7t3mu',
                qualityOfService: 'x62bf5gani7kzi5qxgp7',
                receiverParty: 'pj8w3r2v6im2x8zlo1w8pl296nmymkcuyl7sym75kvo2z65g0ngjnflbkholyzqk5idkemoirfxh2zg4k92dyde9tklkq11ylt9rd87ptxemy5fmowbmeffuqgi9a4ebz8onz91h3wfgpcuyo7teuwmmkuwo6vw5',
                receiverComponent: 'wxtx7cgzh35mv4c5mg5hv10d3q66jzu8iqq0ukzojrbviyosycok50d9wf89e8so26av96qpo705joql4v97isz56tj206v6zkw7fubz3ggtovhwhlq44mqmw27cf1lcaph7cl4qfnpzkgybondbqewl8txo6072',
                receiverInterface: 'h2sqa4t20dyceajni7bb9h9i5dmnpcaxfd3m4q53r22zsfl3l78x8x60jdic6mioey5cyv19oswtarh50oep2dbe2rjvv2biblzq7rf7wv1dh0exv462zilj3ehr820x7xeugu4m8eboj1gw3mp5i7ga8zcvirdm',
                receiverInterfaceNamespace: 'c97vbpz4ric8fnzaaqonzv35g31etl00annav6xj3itf8jfmatxmguf7t9rmrnspdh3o27fslt52re8hs9psxcdmuv30nvxgbpovcnk7thxoyfx04fcl8yjnnqdqqjs2t6om65eopj90i7bql4chp30ba56ka4fs',
                retries: 6373084365,
                size: 2232171794,
                timesFailed: 3182308042,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection has to be any of this options: INBOUND, OUTBOUND');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '1cfq5w0m0z3ydtv4toowfsccjyfu4pooyt1nivehz7c2w0lqj2',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'bdw1n17u868fcdws4012',
                scenario: 'b60dxmeaikj77y74871ojxnk9185gry8rpsgr2go8h9i3ijhxwwzhhn53gcv',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-24 02:24:45',
                executionMonitoringEndAt: '2020-07-24 00:32:26',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'eede0ti8x630cizjkk2ofhaqsnuj6xobxxycaseroruhovracxr1k7jwg6gf7z4jk3hin4or9rqao530yj0ad2p1b9xfhck3i7bto0qr8a0080uuzohtua5tou1ril3qzrqo4cdhm68z38okk54eco52f5rglkt8',
                flowComponent: 'h8z6i86ckiajga0yf8vlpg1hxm6rkulzgag216j65o95w5l4o9mw7cm4uge4yqowccboc53m1bwvy59u19rjnojoxosha07c8mz2t50jphceipd3e7ad31ak4anh48jfmwssz0glq3usst4li49rfp895yyt926r',
                flowInterfaceName: 'gep0bvwuf0yt0zmlmfu03e8vhvvu1qvcd4ciqrt5xiyf5yz0tdd8r0s6hfc2r1rswfyj5qw91znyb7ytx89y7p75vybgpadnsn3s3nx3h1w72ksvefeand6sj3edweeuxlra02a5d6almn96p7taobybcbi4g6cp',
                flowInterfaceNamespace: 'v0hn4oobd6cqx13nq3czyh5w2nrels3xj4stcqa1obivt42cyybtyjkbd149zcsds0utnrb9j79isce6eef9jrlqpm8o8z3r2o1hsrhwqf4vhunjvwqxe7dztjmot0f94af1jzqlj64a8ujozbw6gyoo5k2tzsqw',
                status: 'TO_BE_DELIVERED',
                detail: 'Consequatur assumenda ut tempore. Quis voluptas corrupti praesentium qui molestias dolorum architecto. Quo atque est suscipit. Nobis laudantium non provident ut tenetur et aut expedita. Quis sunt iure. Asperiores quis incidunt ab enim.',
                example: 'bo7t16u01xf9yja4nfq1zdfl3z2e3iy51qthpigi6xu8izee1w1ee0lhbvo299q8le8u3ob0lnxr86s2dlus37fyets6tb8n5rbs8d60f41odl3mm4oxxmirwkgf8huynwq3djndn3kmq8vuj3f1g35qrzu0u740',
                startTimeAt: '2020-07-24 12:11:07',
                direction: 'OUTBOUND',
                errorCategory: 'kmdgkvjejlh3q3gr8jb9uqu62x7obb0f4z1r37qxmf3v568ds8i48f2lscbbc7j3faoqe5esmz3i6223dnmpmoh8i51v79rr38in7wf6tlh69aashscmgrrasiabp96c308s0m6rnz5v1brvebmnxtmi4hsxulmk',
                errorCode: 'dqokmm62w1berjhlv20h',
                errorLabel: 466010,
                node: 7269966503,
                protocol: '4fz3yp74z7w08dv17mir',
                qualityOfService: 'yvbv9lrqwzr7nklqgibo',
                receiverParty: '0ylosoxhg47k536ntvkwfmfmbtcdsbmfwg95grvab2eoizejiwdypbx52b7zbjvn1cn1vfo38zez34gjir5sx6aaqsonrxufsqn3608zxwop5cvr2ihuqjts4eiw7mqxxff80ojyrhacegbgjmq5bs951sup2dkn',
                receiverComponent: '7g9pp5u86a1qnjk0o42bunupjt2sajgfyh6qa5qv2cdq6r60cwasw259v5hlw5jj3jqax3fkh7lezfhixx7xqwg9l9fo2e250ntpgrrbqk1826x9zxid2d19ojcl9w2gnlgrpkqdy6gz4i194xa6gorngqo560yc',
                receiverInterface: '8bg0u6mphc19q699ccq4t55no5r6rz2nh2bnjfxwnb6rdiiohss1b15gybom4a0cnz0544utq5u8ok4ovj2gntt2s2zb6ahydxgxrm0lk6mv488zuaecrztll89qcql2mk4c9n0q46y65lwamfn5u63j9unup70f',
                receiverInterfaceNamespace: 'yo2n3a6shuyot8csxlhb6t0olp5z4ykdw5ejpr8nm6p40ygjsfio9jk6m18t32hvl9x7g7fnnl2v1g942gar4k9a0tajiw4rrvqw9uht2313nkxe1w5559iwe89qlgcjcuvhqx04rjhhw9kw3s23socnz1v1m4u7',
                retries: 6205359071,
                size: 6970038896,
                timesFailed: 5622971499,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '9h275243bjt9kkne3rhymhz44ohusmuxxtykz04bqi0ofzj9ij',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'udfozac9an9zdwt46ww6',
                scenario: '00r7kh82msekiww7j4bvcyad5zciyewwikcobofyvshgfrttbdfvwjf1n6h6',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 15:59:12',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-24 10:37:40',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'ilen938q8z926rjmr8gjfw2x8tto52xt24x6mxuz1jus28w4mff8vyjh1nxw01aoimzl1yg9my0v2xciikbgmj1pnluni7w1c8ahxrkc7bcpeyjpngnahtgt1ekbb810x51yc7wg9aph7xfl1ockzexslr79vl54',
                flowComponent: 'g23zbhvzg14o5yemaeivo82ros4uyb6q3uyseaskpyq0pzazil8ihreui8teamwh0jek1ths54nvz5witwrgkquf55g3pvk9kygs5zqhq6um8bddr8xhlsybvkz7df7yhuaq62z3diwla3j6mh8j2j7njvwwrod9',
                flowInterfaceName: 'mzdfp1xs83doz8se0ioa2teb2te18qqpmaaoxiy58p9vcjvk177sm4yo59cvq3hw10oabpm44zexzi39sgyy49lgsl78p85k9rh84tvuempenrtwr7ci0bejq98q4abzg0go4zqe38em81f60vakm12wgph14rs4',
                flowInterfaceNamespace: '4hrqp18ctefaks83imjpgl0k7kni3s3im9osoqh9n4907wmlmd2fwlmoez64q4h69nastaixl0njfozhxevbpfuvuj8zmabrdssfrf5xsb20ovk8vhzus7rq7q32hokrhgsjbnwuvaab2bpkg6cs3e1ctphxzrru',
                status: 'DELIVERING',
                detail: 'Autem est voluptates numquam. Quod nobis repudiandae perspiciatis provident similique. Culpa dolorem fuga porro molestias error. Quia ducimus in repellendus commodi voluptas est quo voluptatum molestias. Labore qui est omnis sed debitis et hic aliquam.',
                example: 'g51qpx2yvhz21ede0mp7w9zxcpd0o050c91hgby7y4ssgtp554iuoih8bg0cy6eozx5q8nptgjz4j2h1nw4h545ksapc3sn05pym16meexkeazfborqb5fuiy3vsjx9pzmm2oq5reneqi8linkv8q67y4ot8rcu2',
                startTimeAt: '2020-07-24 10:24:18',
                direction: 'INBOUND',
                errorCategory: 'j1xas2ni9ms51nk697l733tmkr4ak80zt4irq4xp2u63gzgnzcq4xnle283vbov5fo13xo62akx8apdg0w56kturl7nt4up53g1akwh6imtb1po2zvcr9zfnhixecn3uwnrp9oyw6rj5urazf2sourg25andgz8r',
                errorCode: 'kn8mnda0k3dgbhrkf9vk',
                errorLabel: 709963,
                node: 6262229963,
                protocol: '9ytxxustxwg0d04p9ccy',
                qualityOfService: 'fcyzvezyy7d3e89e0ywb',
                receiverParty: 'aot8ozhr3tg88yn085vinh2tjzhmwdxma3a3lgjewjqg6v9vhb7fw2pgt762gqhyvryba5s4exzqsyt9ckrjroodbfk1dm9eb46qeptwpjentv55fr31yvjp773lfe6nu0t93c2e1114dwk2qwfpncggdsx4y5js',
                receiverComponent: 'h8ab0b3fe3rcqwz1azovi68awgqni6ckgmyoaaehveazcwldvepf59jyadxj74slli8ivw0qd3lwxsniqgnhvstouet4dhvv0zj99qdflv5jheb8ad6o2gcsel9wsjsm7gkehgaaayqebrwsz3fvcsx63rw0jl6z',
                receiverInterface: '781b98saim5wg07snr1168dcnfifrugpbixiyotvdt7t1d8vgpno59zh7ksrwik5n8fhtttcagnrfy2buteuc7wf33kp2e3exni641qbgsgh5bpzhfhofd24ozv6p6w9lae6ie6y4m1ozyzq6escqgccvp1yaffa',
                receiverInterfaceNamespace: '3hvrajet2qk3449seych2ngidhzznxirlkfyhmbxz0yuunb7v742mk53du6pygvmvcnn3cvegmtz3gflmqz6u07k8022fjv2le6b2f27x7oholg9zobhsz7uafl0p4ge33xbblovlp9r9t6swrz3h5vibc4nuak5',
                retries: 4077981224,
                size: 7516591470,
                timesFailed: 6136591719,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: 'jgutoa8aqkmap8k7tccisbxgnq1p4lb36xuur0ou6tsd3zy6qi',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'h7mrkbp71gvhx6cif0pl',
                scenario: '1ru7ydcdwxq1dcvpn7tkqpe4rvdyh8egmpjxz86biizw0zjb8zjyhc901msj',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 21:07:58',
                executionMonitoringStartAt: '2020-07-24 00:27:15',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'bru1ujnps2o0oywu2n0vaicx8wamvstc2xevr0n32uacfmb9yans71sxha7rcsm6w7dk4ssu2mf1rvjmgk51v2kxstg3r1h3i6revg7xmqtdfos2kcpinqzc2you5l1s8d0ro96u0klns43svj7wzwauxd7c1znx',
                flowComponent: 'pewelbk5iox3pgpb9ydbb8222pzjqphu7p3dz48zmk3wuh5pyly9kb5crz1gl25kynxwecbyw9aytwkwgx88doa2wo3ij5q7ql5grsspn6t3t8w4zpfyed4ikv0tl4hy18xe9l6z36613nclqxvtoqpwq8csr2q8',
                flowInterfaceName: 'cwytirq2k2lld0mtvl9wclfsi44uclc26ygxt8ryul500tee0s6wl3mv1jfjnf0szorsj0xgvj16whay7058w8opruskmzn0hx7q2zdrvaglz9o3swz8s6l8gihp651m81uidw2dp7v15l5iet8akzxc5rk5y4c7',
                flowInterfaceNamespace: 'e6mt61y5nvvv9d9q3gueupkov4vdpfvy32lc2y2eicmivqgp8lrlwqhhe1n36kmdrpidgvrag5mrgt2ji9t7fkpqi2hubbooiyil3wlys399mmw5d9phdjbvgrj01nt4b6ogxa35cn8jn63f9ue6bfxidtml8bz9',
                status: 'DELIVERING',
                detail: 'Ad consequuntur sed. In velit commodi officia id vero. Et soluta voluptatem voluptas accusamus.',
                example: 'r5xt5xx4wcwsy0zqakczzog9brkmqwjpa8fuk3u6i47c611ytg7yioz4v7iuoiqrv7z4o26j8my12b91jz6305sqr5fbiyh4leu4ztxatcy2wvunzqh9jt2yv00rowdn1h4hso888gvx5lx1sphismh3vhqxom6s',
                startTimeAt: '2020-07-24 10:51:20',
                direction: 'INBOUND',
                errorCategory: 'nvoytl9kygbpooo5bp7ea2n5l7j4jy24wvy8rhjz2ke512ox4afa358syu68uyvrq11ec1cno62y2cx5h3p7g90b009ex1a08x0f6m0bltu898e0bg5uyzrr2q87p8rsuxeqlzds6q0ehc6vjg9nj0lqyth8re0f',
                errorCode: '1yb1k7qh186oftqd1xsp',
                errorLabel: 352692,
                node: 2488348373,
                protocol: 'ov7my9ykxhfpkvqeeb9w',
                qualityOfService: '41kzl87xgdlfbyduz1am',
                receiverParty: 'ralwrqsonnsxwpiekbj2izcgd918tvugae6uqagl2r5gswmqma4c4dihddm15m22qa7az3z6uymp8h0xmu8r26jjso3f0g2l5ll5lqkll6310a7os0lpr01v4klsqhzqaoqet10jq2o5ddjto6dkmwb3dd7o173u',
                receiverComponent: 'gzaj487ykegrpny9xakmowt6eu1aukox16zby3gejgi8e3oktaj3ysmhgaxbvqnmbeqi1ijvs5xkjfaxkr3t8v0pzl1fafg81ns6obgxpyrienxka35249vo8c5w9ukfs9neqq7k8dl2g1ux07m13f45anbz77vn',
                receiverInterface: 'ytbgika8ak2owjp6n0w6ky25fpc8r25oqh6sytaib89ylzx2ov3xktpw4rskdkbvpcwqat5pg21ezbhvekmf2x2ekrwbigimhfqvh66auaf4am3u9oakbjfczendt8eohzt8l3g2d82tzexpe8n1v2crqkfd5fm5',
                receiverInterfaceNamespace: 'b1pbstbrdsc0udvf1sdn33pn2py821o5zmzzoyb2ssi373x1mfcioix7dnee8pvkhpu8d6j6x275w98y0r0kf07z0e4g75syr7a46yy0s834r07eam4fg4nsmvwyuwdtzmmcjysurw6o81kiarb29x6709ta208j',
                retries: 4806696184,
                size: 4465964589,
                timesFailed: 3573521915,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '972346chziuxaycnoch2io62q89hin187f0iu4yfu3g3ta59lg',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'ubtvy33l0ojxu90i4r3x',
                scenario: 'm17q6wk3t0usb3f4dn4j29t1y5ot5oblno1gt2y803hl9buazz0am0b07eju',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 00:31:05',
                executionMonitoringStartAt: '2020-07-24 16:36:19',
                executionMonitoringEndAt: '2020-07-24 00:36:07',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'k9n0c18taczqt2oqo6oqstfv90kgsphvbkd76fsqfznggz1e7evcnudhfcfbdfjoaudw12i0j67k51uifgcjz5ig6763de7zkibho9mznblkz4m6wgzym1ik36e2057ccdz04mu27xbmn6nj8ap030z8vgnsz4bp',
                flowComponent: 'dyk70zdikx4g27lalwmb5u5aqggrc4xl0zmoo84f2k3i9kgpqzvlp9oea46rxic115ate7ente1ltxfab23bpsyh5y4xjg8c7qhb9tmr3pcni9vny11y94vtqiyix90gecxej0ljlmvyahnxru9efz58mo87nkwr',
                flowInterfaceName: 'nmng7p0xbjj1lmn8eyze043g27cf6ii24zg90g42mzmb0sauc6xc1jjwjii2wlbb8wud972t4gibxxi66rqmuukrqeu3tk76m85d8wi32ym5olzf2xsv6z6rwsay8k83469jwdg3kw5kcr869z0ff8w9qvkj4zzp',
                flowInterfaceNamespace: '313hxnsr9l3nrnbkttje10jwjixkfrrmcet3t0v5pgzfh42g3l1zhhwe0c4pmpjdnzrypa88avd933hiuqbbonizns71ejux1xv7riqzdj0erkv8z008t87tgi3mjb3j0zg0nvh14kuqcxycylz6z77mz1fjy27t',
                status: 'CANCELLED',
                detail: 'Quas ducimus sed autem quia ex qui nulla placeat. Suscipit et quis fugiat dolores nihil repellat. Ut nemo esse. Eveniet voluptatum optio assumenda. Veritatis rerum nihil commodi facere. Sed sit atque.',
                example: '82yfxmy2kmw0p3ey2r18bc579qcagrcom7owte9gj8deaq0hpclkbxp3yn7lahk2uta3mgmnv0al7y8nomh577629edyw6fce79invj7q3j3bk559mobpe62qd5a8zpjpgp57aqcjkd73dmwlcsns74v8m2auo2n',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: 'eu2anox1cysjbljukq92rgm87w32cpl2e16m7naoc39ne7t1nmx5wu6c6z40uixlftounqrvzmee250set9edkbbhvbhbioqf2jrrhve1uqina1wxvhyyohwcvoh2gdg6isbpqf7k1hf6nyh0xx87ify5m9gkb2z',
                errorCode: 'yvjwntrasjhem9447hn1',
                errorLabel: 776804,
                node: 7294883870,
                protocol: '5ivaqa8if5w7415xal8t',
                qualityOfService: '07cozi1sfj7uefa7uwij',
                receiverParty: '6dz3z2dir2ggswoyi5f1f2m5kn1lnd84yxibw5m2li4qsk9o6nbgnz63huass34e46nwuvgitfbob10u6fk8dvhezf9dvpm8i35a3bdumou11w12pge8c4qy6s6k0llrbptdid75b35qq4i3qymjfgfykn6l4gob',
                receiverComponent: 'hvw4086h463j37slsvcioemgucnnxc590y9hurvl3cv0g2cn18i2a94rg3x715lphh5iz4t0ixbfur7y0ccoushu8ftrgdtxqeq0lfe7m384xaylzlxrinl78vq2knwjhadeuqr0rhcgz3q7s4b8f681rjkcyge4',
                receiverInterface: 'mntas1yemdlqhedifti0eikjk1dut2wsflsz3uy8a9ehffdle8byd30em562v3qvl71pshbkchj26zy61ss87ao91qcsar7fwmoi272tmueybo2zpkp6xytuhdmfyt9ksyfcrisu4ltqt28cnl6udzq9p3p19496',
                receiverInterfaceNamespace: '3catvj3f32ucpu407y6k9rsq9cf86xjeaaim9ca91jovxwq3bq27qjgpr8td7jbauho25ypcj1ppwhbqb7nrselpgs4gag77roatyy8ze85w6m26vmkg20lyslrw12redxz3d4mcj9x7x4tahnglkm7qc5keqtft',
                retries: 6003078024,
                size: 9727380030,
                timesFailed: 7305261603,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '2q6dna911k2dzzkdeyvrviqdpt0vk22hc126i6fkm00j3mc5qz',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: '8k69y0dxiw43o439ne94',
                scenario: 'voaxo1ff6o3fkoljoqp40cl9lvpuqzpafoivabciuk7vwnqfyr5e4nll13zg',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 18:52:59',
                executionMonitoringStartAt: '2020-07-24 10:23:50',
                executionMonitoringEndAt: '2020-07-24 02:03:24',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: '9e9o4imw4ucrthop5ukhqyxlbe1ulyjv13tvsb9azru11wgjq4796v1o068vxz9d5s5v2ufgbhwnlxg8xog7pw4kmv06mlkkgmc8wie5lii0nkqv9g4e5oveddhvalxi8iw2n0q2iwza0pu8unt69o8xj52s7grr',
                flowComponent: 'wfmpw7x01h3107iedq07c9nms8ti5001h6wuq9u89dup49v7xf47jvtock9xk2ozvbfwu0exzny5mfre3wrdzigshyaxpswj8pmie8v9urz6mipgyrgnvygdfw5ln1s21r9sqoqxij6yoqhmr86rypx24eaxpblf',
                flowInterfaceName: '2unakqi4t7swuta8mhm90uq2rlyoiatp3rqw2go4smwm5bhm3mld0azfcypp9kcpofgiul9mck7w0kr9v4ynyge9di0byd0nkyqrmqr4cwqcjes0475bxr71mzhbwgi03dbaox71a2pr9uiyni7n2rah63gmoief',
                flowInterfaceNamespace: '65lud8qwnb2pvms81z0nsqsg7ros8wq150b23q7gc9u4i2c00f0cjbz6ar2jjk6gcgi3913u1dyniduiq9z70yfn8pjjxb7r38seluqlyfty4ny073ms6kn7lmoqe7bu5kx8rt1se7mqsal8ysr2523jltrv47ah',
                status: 'ERROR',
                detail: 'Velit fugiat consequuntur et quaerat quia iure. Ex sed velit ad aut. Sed rerum ab temporibus placeat est velit.',
                example: 'xfmmvwtrjya2jyeq3wlwlsnirq4kvuarwc7286kbx86jifklsqln9bhh99h2aahgxc9na08y45esi3xmy06u3yur4ra3n798tz62bpc9lay4ch60lfmso72vmsrkmp2vdivuzxkf9s2qaj9sr6sx315v58vja9ea',
                startTimeAt: '2020-07-24 12:20:35',
                direction: 'OUTBOUND',
                errorCategory: 'quh5m0odivl8r1x33ewjvc3ji3bj11sgdul8ux3ggn355lngnw87ib4xvjxandgxc13km2n35s7iycoevs1yppw60xewti1wkzlk62popjckjp1pytktasg54vpicijvmk4o9bjmufwgrak69ofp4i0lf79o3i81',
                errorCode: 'fkpo59zdketrigwkd3hh',
                errorLabel: 537820,
                node: 2270063679,
                protocol: 'kq2ugx8whucyk7arlbcd',
                qualityOfService: 'eo4s8vc3ifl8lgv6y4vt',
                receiverParty: 'hcl1svihe7p90gjbcr7z7tbxroksz44jpzzy1tjqoi0kybrsem6x1b2a6neqxzav80eamwdyad0hniwnukm7l9rt59e1tvcdqhwwo98tzfzzdd683zn5dpnmr7h5dslie723w13pgvc08w44pzddt4er7mgr24o0',
                receiverComponent: '8fqd6106zft2mo4k7dgignper0upo9dopqv0mhfzzib84tjfa6prkvticzm1kmi9gij4573vtstomd13d6ot53dgjcaczjwf6hm2c5gkeb0laxr87hann6hr8hd9u5e9macsd8svpyslrgvpsvj12efje6mv0kck',
                receiverInterface: '7lfyvysa4ne24axwmsh9tf2uwctdj1gi3pvwz6nj1b8s04ftny2c3m4i5hi7uuynjiqb1u198hgylwzcljjd5v8r49bsxkzhblpadmjg537h90daiqh7afei55frmzsyw758y4vkae07of0qbrnstmif12w6tcqd',
                receiverInterfaceNamespace: '9f4rh1qhu6xl9j70xrrqx8hc3i6jexi6akeaoqacfi658hfs0bttxxnrrwvmtahbbldkmpv4cd6klswn7ol8v7kgelolczuvid2y8u98o9lm4u78ohv4o4jvyf2bkxyz6ronlyxpfx1cvsdaxi4bb971b8exvv59',
                retries: 7332845606,
                size: 7812298402,
                timesFailed: 2528200784,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/messages-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    test(`/REST:GET bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'baf9e4dd-353a-418b-a13d-40063a154583'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'baf9e4dd-353a-418b-a13d-40063a154583'));
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/baf9e4dd-353a-418b-a13d-40063a154583')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'baf9e4dd-353a-418b-a13d-40063a154583'));
    });

    test(`/REST:GET bplus-it-sappi/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '892a60ae-ce9d-45b2-b2a1-052f4b08305f',
                tenantId: 'da0eaff5-39ab-4f72-ab70-998e09181c5e',
                tenantCode: '7ob4jheb5gevg28fsau7wnsl0dl8f8qtcis7t7hnax6mqxjrf1',
                systemId: '9b7a29f5-d5b6-4f6d-8044-18eb1e8f8189',
                systemName: '6bbdl0vont5hhws3ddx9',
                scenario: '3vemq3da7be3sjfts3z1fruh4uo3mzfolufvcjnjjr23pfhzzznwn2kj9ha8',
                executionId: 'f381e832-73d2-4f1c-bbf4-50d72d050e03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 12:42:14',
                executionMonitoringStartAt: '2020-07-24 03:08:35',
                executionMonitoringEndAt: '2020-07-24 13:56:33',
                flowId: 'b9fd3186-b993-4e9b-aac1-699ef0741d38',
                flowParty: 'nb1iv2aog8a1jvwftpf85u446lae28ywzp9jswl0dyefys3q132d3p15x06rr6blwo2fn2qfsohic6qm17jjwbfcy27lklik59x0xl1s5iwughxbzxttb2rn7v75fvmqwzqk87qcwcj0dh5474grqnbcknstagdl',
                flowComponent: 'j7p8ednlegzhzvikodxyzytk5lzowi1uwzx1wh3t7s9urp2y6ivbjnc89wav81yijg85z255u2cgfxa6yew9iby1ac62gp3wb1lcemt5xz8oumqli1mkjtjkh4y4r776wywdhgcyhbxf4zpqwnr8yuru37db7bm7',
                flowInterfaceName: 'o0r38xfh58iqf88cwdjkfak5ix9mmev0fvvbkut8e230s36pnwdcj5x3slset0c217blbvm1yi5mhuew7aoqcidvlhwilox2m61w81jhfvpuyr5kk7qgdzfqfk5q4we8fezcdt83o2wxnc5r5s3m9sg6akmlcsq7',
                flowInterfaceNamespace: 'f7nsopzqiec9y1kb4g5bz35ks9xjos433glv3q63cbwaiueoos9ogvqiwvhbg52wu3aqevcxntwmc7hswad552ypsjfnpw5hsx2606gtunlrupxpmbxxuzfigskvvsco8rypi5ja6dsauti247euwmnl120stkz1',
                status: 'TO_BE_DELIVERED',
                detail: 'Dolorum officiis quo velit. Qui eum pariatur accusamus et totam quibusdam eveniet in itaque. Quia officiis libero qui cupiditate autem eum quam officia.',
                example: 'rqa6xh5830vzv9mlffcoyxmoo45ne93fxysg8zij8sx9vg39lyyrmzha4g0m439likcrv91gx0iyzpbw1e5nz15gpys9ci41pg8f92pn55618akp3tqqvuczkkarwg5opzw5fcq1x7mt1cotbn4rlkx6t02ipsgw',
                startTimeAt: '2020-07-24 15:54:42',
                direction: 'OUTBOUND',
                errorCategory: 'mged4ugkxefhvxlh9vt8m8mlfmg0qujglaxs7u2jpwahvuda4urkzi3dor3p6djmnjgx3l5koeau46ahg8psgnxi60e907akd7e5frgzsyw4zxvlzumwzfdcbreuaftcp7e76vr7x5loavofe1xthveqjcr98257',
                errorCode: 'm7qw3vm09xkholq6p0xu',
                errorLabel: 181855,
                node: 9993449085,
                protocol: 'hff9x0u1oda6xqx20dbz',
                qualityOfService: '1db2vxnqj3zvuzbv1tgx',
                receiverParty: 'hnl47nmyxk7muzcc4x4yud7iyhavo5milplc7kjkrs52kmdkrz54m97dsg4nohxjvnfxnveu638zlptjgrcbp26y73x7a2gancbqdf46owen5fsijfpmcrn284d16jye7kf46nbq35a2uttiguwab358b58qstqi',
                receiverComponent: 'yl5kj0k8e6l44x3cgcjgdwdtbzqflo64b0shzud5geygp3wvsxi3zlp2he9cit7m9ne6o8mkbwt2nttrf8brm31mc3mjqv1ba8wueqsgu2uzpbxmisjzqije719037njgdfgft8v33osngno6vrnx9v4tysgfy5y',
                receiverInterface: 'wxggk2hin9h3szqg8d0sp6bl6m0xwwzjg9h0kzf73kz84qx4sc6tlfoefzuef4tnz7tjvooaij5y9q81vohsg391u75us4zyu849hlz1ngxt7wns3rqoqsl0qobvjmcmbdgy5i062nneii704rvxyheihosn1bue',
                receiverInterfaceNamespace: 'q583t4zr9x9w311v9xxaj0ok7ii9y2cmc0n8i5s4h411huyb0bo3agorqbiyexpgl7lyqbqjypvgc4vr3xj5ljj62661ot0fgodlr4o4rydepu0uas5xpkp2b0vb8lxcjf4g5p2a79jsrzi59mtx6mm02ols40pz',
                retries: 7100749066,
                size: 6077133873,
                timesFailed: 2534395311,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                tenantCode: '8hr5sgdbrl89l81g4kw9mu4hspzkoaoqyww6ni5r3co0f2j590',
                systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                systemName: 'ze6xhla3t7u1v0l8hq5k',
                scenario: 'p0qebujmk7di4xpfkr6gdenj5q9nsf4avceegowpyc8q92uw5u1cro86wlen',
                executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 05:51:30',
                executionMonitoringStartAt: '2020-07-24 11:58:21',
                executionMonitoringEndAt: '2020-07-24 03:52:36',
                flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                flowParty: 'zzdqo9ixvyyspxpj0iu552u72osti745ichsuw0lak80ij80ijjz247yit95obnghvz9c7rzkfcynbqq2v87b1cfccxnk1tnfbvry387wzjxhugxc28tvv459v3g4hhw4sa3533knhf65ov3yvmavxe64dk0uwvx',
                flowComponent: '3tn072hg4v8xuzndvqcc8utjyaqhkntrgrmjh7s5j3ux3glddxby0rs9voudwpvuj1hhsegh4ozylo3xjvqjhj2gb69s2xqeqm1044j4vox21a0vrpmvxhw0y3k0rzzhtothfm2ftgckh3x2owux4ndhfx22344y',
                flowInterfaceName: 'q3x1324i3qa1268av3evbcfpe5mkd2dq6slbo3nb8eay1rtnreyee7adsuboecl2udq69c72lp9hxpd12qfht41mcwhg88r2y8kc8wihsdlvwn9w6neespn4q3y683fz2lv82s8c6egomezoilfrduc11ijn9uju',
                flowInterfaceNamespace: 'emp9qvbselejiqihseujz0g3uee06meq0wuxnnfg5biqgxlg14fgu0bhwdnbcohngjxdjs8r3gfz2l70wasf1uoootsganzuvmr01h6rmxl8qkmrmomj94df1s63t4qljnax6qz3atvvp0bkfrn8862a346g8a31',
                status: 'HOLDING',
                detail: 'Eos et iusto autem qui harum eos aperiam non quibusdam. Inventore iure consequatur autem iste sit et. Quia sequi nesciunt et sunt sit voluptatem sit. Qui molestiae sequi enim cum rem non voluptate quos quibusdam. Qui optio harum distinctio voluptatibus quis voluptas consequatur.',
                example: 'ts1l7hoy7ez3rdal4p79vrvo1u4vzpxc51lggsdftuftio1au6bxjmi1ygqckiv44rqdmh9css9ametqeucjq256qzdkk7oh2s074cke7eokczsael6poqfpndlss2s9m0jfw1v7jefue60fd8pinyfuqx3aqmnu',
                startTimeAt: '2020-07-23 19:23:09',
                direction: 'INBOUND',
                errorCategory: 'qoht3yxaejiyhjfipin4m48bk4abx00gx2tfu0m81gzzrz9ids4qvbrr0aaq7yykqbd4cxeucrk6i1x9yf2qc92428q3eingt8p9ty6o8ldc6cdcazqvdfvde5avw9b6dx5yzeg3cryhch7oug1hjgnh1fqxfb2j',
                errorCode: 'zn4lhjd5vio3cg8klg5o',
                errorLabel: 846546,
                node: 2127167968,
                protocol: '0ly3bqet0b0lca55jxgq',
                qualityOfService: 'z48x6ooyc20aq0b73a5f',
                receiverParty: 'x9wszzw0tq0emndv4yy4oxgaekd7x8fr3nz4tno6qmd9yq363e8dpkdiracrfnb9w32x3h7c3jfzm571pn2vlj2yzebkzj289mynam0l41m83nl2ziab8edfkthd2q117u0lvqc27a74mf5rba37ru5nxtvabaa7',
                receiverComponent: '4efwmrmkjsf8jjzcy08hor0xnvkoaadvk7ts9e16exfkuxv5dcgbzj44dgyozvzlfk8ojrsgow9bvyqs1mfiflrfn04bc96flcpe40je2cm88gqpgldc2goxo9nxpfzsafiguo2v6mcoszoxn2k2g2tf27oqaf51',
                receiverInterface: 'ggoqrjbn1xlwpt18nl75v1yf6eorw1x4jn42qma7ewkr94w5770x8dw79s5ouoqw5wlicr6rswmsg8p0jbsc5fjeaczc2ktqvkhr0432e4rbkfgxrxyx73y5nvs9u5aetac4apfld4iy3ga8wywwtfqmscffr670',
                receiverInterfaceNamespace: 'vrxllwcfa6br9tz8v9djf0e53b4y5ixucbzcy8vqjueyy1adfffbweoe2hqncmsh8p1hnrukmkn5k9ypqqxxmwtxtcrqxfi049e7f0tcnphr4n09tudti1eep1r0a9swhpv2yd34g8x27gw1w1eozuoksjpncerv',
                retries: 1991149088,
                size: 2366946094,
                timesFailed: 7368625886,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'baf9e4dd-353a-418b-a13d-40063a154583'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/baf9e4dd-353a-418b-a13d-40063a154583')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
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

    test(`/GraphQL bplusItSappiCreateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'dfdeb27a-4677-47be-8b46-98d650cad69d',
                        tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                        tenantCode: 'rypsx2u6oh2p576za5y5iklru9vmwck9qzl7dfpa0ct1n2wyu6',
                        systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                        systemName: '1upnbfzmvl6wokz4gimn',
                        scenario: '08lx0cwhvsuc56ldhzh7q8if6yerx4a6tnk2ez4mn5rwtatvl1ym3ipu37et',
                        executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 20:10:50',
                        executionMonitoringStartAt: '2020-07-24 04:33:58',
                        executionMonitoringEndAt: '2020-07-24 06:08:49',
                        flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                        flowParty: 'rmyeiq9wkq65flr6r8ct0hjs1aiur75hpakolj7sg7darss5ayqbnc6k319ndwd7ycpb2edkhof0owu2nr8u40b070bemhu8gcejpf61di9b8tmz43fheinls9u1yyxqlpap98qr07ls7oqwqh79qfikynoqidud',
                        flowComponent: 'negzcoejqhqa5x443efj0lwxz3bjeqfvcgj6wvjpv0ubha727ydksyjacki22n76glddrzoq4epsv8t2z2k1z259ede0w5x2mrdfi2m0z2uyf1ghml0izppm5wmhlvdzyukuh8efdrdl0g9iwtlzlazo8znva711',
                        flowInterfaceName: 't8tdnkbo10ps01l8d8jt0k4xp9oihtxrw6g2t5qlyjkakl2khykm11mzle47c1g4h3mpwvjg85eeilss0cyn1sw3wr5yx8k4zo3i6hs2f631wwe5brwszpppxqi5zas9p7b30g01xq5hrsuhk8w3g9wmd7b17fl9',
                        flowInterfaceNamespace: 'jbx2wyiaxp5vlspgljer9qmrqdb6qm6dn3e5onovy8s4uqbriulonve6shqb7ci37ibzgzbjt730y3sp1g8u8fvx457yd69s74glwfx7h9dbgn5djxxlh1vimwccs9peqswe8y83yxh99icynqazyjwap01st20p',
                        status: 'CANCELLED',
                        detail: 'Sit voluptas ea aut commodi maiores natus vel sed eligendi. Est nesciunt ut sed rem qui et magnam quisquam. Ipsa soluta temporibus.',
                        example: 'ku8sszjpribn1ekhyrh6fdeztdz9rsz3tjiwbq5tam7epk11sh67bmgy8znd9lfuo2j0g4yixls6xdtdq7ifgdsjty8wlhc9nexrnzhbunt6npb1720akup38clc37zzswuqxer1pryclj0g0u57fjv6qsp5ztue',
                        startTimeAt: '2020-07-24 07:36:16',
                        direction: 'INBOUND',
                        errorCategory: 'q6ffb7ms3gsiq1kgc2rz0q9bzocy8lviyv93brijeqw0ad4qp6l85x8r3jxthdogcr38nycezzpg0756qthhhgxp69mxgiai8b06i7qi5p21xy94bxz02uda9d2a4oage62vdwtf99jk4n0gebokqmvp1jqxap5u',
                        errorCode: 'dt110kvq2phm3d3yffli',
                        errorLabel: 905318,
                        node: 2011082147,
                        protocol: 'dezmtrsrrjaqh1qm5rjn',
                        qualityOfService: '5whexvnuxeblxhfnf1vn',
                        receiverParty: 'rw3d69nps94ls94e3m8whh0cofzs5z4mtjnwz8rtkb9ph5oveltq8sz65rpjvinzyrlnmyg7mjl06dwdbzkpcm8xcq04vlgzn7savldidxz6btdxqw1j5j4kree90y9ff1hjiv2ojjjt8ejb9jxpr13qspc00u9p',
                        receiverComponent: 'ys1u0siu3xzn2degg6fqxvuxew15vbp1gamxbl7wgmwlvg3z5d9nfov4b1vued98wqcl194ktcff9azx8ajz8uf5yz7m12aqhdglyz7u9ngw2d484bd114rzn5ubewky9g0n4neyt3hikoporj6zfjiq8q15rukd',
                        receiverInterface: 'rl0eykagrrz3g2f23poqn3rzvbdcrl7j29aix74q15dv79inxfa1gnnscy32a4gbuj36ev9i6x9kh1668r1m0ffcqfyndas0rl1xcsv7uk1j8r1ukm6et80bsuyum39na9uvtbgfs6o04tivbjr6cdex9orsvg3j',
                        receiverInterfaceNamespace: '24vg7wn2ddrjc2c3nlbrcmtegk9sqq8ajpyhe5q7zgpy28qfaijljpc8djnsg9seldq2lgu63cfio7esv1uw9q3734lbd7qi0krgl9m1xtr3mw0htnoh9emx8u20uf2ht85n1ztpuabpmhv4x2ly4vq8bbzzvpgq',
                        retries: 1890374305,
                        size: 9975410559,
                        timesFailed: 8664990796,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', 'dfdeb27a-4677-47be-8b46-98d650cad69d');
            });
    });

    test(`/GraphQL bplusItSappiPaginateMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateMessagesDetail (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'baf9e4dd-353a-418b-a13d-40063a154583'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('baf9e4dd-353a-418b-a13d-40063a154583');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'baf9e4dd-353a-418b-a13d-40063a154583'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('baf9e4dd-353a-418b-a13d-40063a154583');
            });
    });

    test(`/GraphQL bplusItSappiGetMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetMessagesDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetMessagesDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c8bff652-f696-4c05-83d6-969d28898e68',
                        tenantId: '14ab05e1-0afd-40fa-ac83-5195f340c752',
                        tenantCode: 'p8h3dfsgxuzbqecjcfl0ueb2gvfun6nggi4st6ekldg1nb1sgz',
                        systemId: '8f275b7e-397b-4c25-bf93-a3f77079b5b0',
                        systemName: 'nd1d74mca8r5u0cugpv7',
                        scenario: 'ugtnbqyqgftvitg9lk05qjeonf6j5m4z7fixiu3lmzrl2g6evoqi84cibth8',
                        executionId: 'f065db2b-7f56-4549-8a77-a18de75d7aeb',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 21:02:43',
                        executionMonitoringStartAt: '2020-07-23 18:17:37',
                        executionMonitoringEndAt: '2020-07-24 02:58:12',
                        flowId: '95a89df6-c14f-4a26-8acd-e587e5f32ab6',
                        flowParty: 'k2wegpjem3kdzyzdweqfq15n6fritc9lpzvjvn87w4rdvw810wh1n39ekgi9427qbbogptwe4f2byw1u5eajxj06x456vd825bwzim8ylluj5cpibyxjtat1714pdd4uggzcu4fsxxnrzgkcztfk8yrmaxj49sic',
                        flowComponent: '0rfo0r9z77h3oz772vip8537y90xum77nbyfhccszhfq8yhp7g4hjatgyzc5tc0iwabld44621hygh8jl136rxo14wna3f1r1tn7eyhcnyf2cuosuqzlnhc72mb6s3nfrza8fdd7j31qh2yu7bebr90bg81pdrz7',
                        flowInterfaceName: '3okrs0juutwphp8nfdgnp1hhx8mfbh0dvbutla84xemh85qmmv34cdvfg7y5vdyvtyov9jd6scef823hu529tq11pehbpi2oijxymo04ti8c34k1ri6krc4k1408xr7zsq7lgnch45z1vrpm9cgtt9ipoxuyse9d',
                        flowInterfaceNamespace: '2o43r4bx87btqcfs1dh7h5miaf2lx37apzvbvtcsmibliot11b3exawypod4aptjdd61s15bkit17a3i8exwzsrrj87bee3kb1w9xy8ihfmtex7ta9i9kckxk6cs4gaintknyyjhs7z3xowp3ejt070k9y80pn5q',
                        status: 'HOLDING',
                        detail: 'Dolor iste eligendi deleniti dolores. Qui ratione veritatis qui et sit fugit. Nihil ipsam quod nemo.',
                        example: 'cccfq7zgy4rtcxoaeepskqt2dqn3kzjnc6smp5eug3lt2ligaigskua03i0o2qqc6piuaks5rpiat6whtgi4ntinfzgrwejlhmaiol043qrgcwccy457njyfca8atjeqp6w53ovpv9p3i7gqei40av3ivbh0nt1s',
                        startTimeAt: '2020-07-24 16:10:46',
                        direction: 'OUTBOUND',
                        errorCategory: 'ltl3soa0p3gff48s66mkwudgfml7gove2e5mco0wv9fxb3r6vjuxsxxam6wbo55t90gj273az8vasjzyydys58jr9z33cnyz2xbkwto76htarbs0rj10g8renbw4yq33vopm3xr55yylm7k10ws6ooiyrjutf4iy',
                        errorCode: 'goipvpuebagkvsbbwk7s',
                        errorLabel: 577104,
                        node: 4412313936,
                        protocol: '4s37guo6cvjgqcyhid7t',
                        qualityOfService: '0hll75q7epl31f268lvf',
                        receiverParty: 'xi9dwz79g5j96paq2dtg3px5b03to1nuodsfxmvosg0ce47joswcsallxyla61u5qfbgy7mfictx213z6q0s2f108azxc8b1cp0vkb2zd3s0u2o3fln0ighaxrwwaswdtn27lebb4n61o17g7wlhz0usw7d0nvzn',
                        receiverComponent: 'o0njav50vy3wbd5o6t38bd5a7xm83lt4aqqm6popjzcgkq64sokrd95jrh2jzi1t4d1da3spv7pidobvvxtbf5581jf9yys4hdg0f9lstoa2f0ookaxoznlhpsbk7hy4y51x6n5rjoymgw6fvh0xvh31w8kb7emc',
                        receiverInterface: 'e6wenvfv3v1rej7ugygi4xq7suy06e3mehvxs4w9w4bsvxgf0rcr645xlv33xxti38qhl7egspdqws8katlij3jtdf5sdhfc03ys7yeolesvqr484506n1y4sdnfvgdgy8nij4gz37pxi9rcigzybtm3vp9tlgjc',
                        receiverInterfaceNamespace: 'y3fqambp30pf3pumtf149840s4rbsgnqc7qk6n8lv0402nyt7j1dhraetxkucz26x4nsn7tqt0ao13zwroxkbn2vjmlvrz236izm7og8lxmr0mclphtotcwy5udhzci68xgr3edu7pfnt0eg1y5ddow1qvtk0ovs',
                        retries: 7753912968,
                        size: 9028201631,
                        timesFailed: 8553428832,
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

    test(`/GraphQL bplusItSappiUpdateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'baf9e4dd-353a-418b-a13d-40063a154583',
                        tenantId: '89d56833-9f23-4d1e-afdf-3e3b485ee7db',
                        tenantCode: '5iinnmpn3ns33w5jgztcad89y62r5w9ksw6ttcfb37xq90yfts',
                        systemId: 'b0afe8ec-ae62-4d48-a2db-7d00d2602923',
                        systemName: 'khmaby6ii21ewphnp9rk',
                        scenario: 'gyjjyd3lp3jv3r01pb0v8rl7zhaskfke6z6k5qr1khr72qdvtzu32myv7h8n',
                        executionId: '7fdaeb58-b101-46b6-84fb-1d8d18a226ce',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-23 22:06:53',
                        executionMonitoringStartAt: '2020-07-24 06:55:54',
                        executionMonitoringEndAt: '2020-07-24 16:28:39',
                        flowId: '48d5d753-efb1-478c-8e77-4bbbdca30c42',
                        flowParty: 'mswwws1xcit1o84fwsk5p1lcwsnhe3oe1cb88oybodnzyiy13qsqa4i81d3gbkcuohnrk0wrorua98ugxlbrhij7atcrgtad47jmhepnb27lvn8k1rnvy79lsl9377yc2srbfy0oi8oxnrcudl47djle2bjh59b7',
                        flowComponent: 'oh6hmokc6f30h59ya1xnk05d1qt2ogisiaiserfav7pgm44qx0cf6gcnvpiucvdnkrcn3iqv07vyizmagyt8sv64ooioqakw2yuu836zclystug26mnf5f8iuwxfp7xrnfg6qq7ji5y9tpdn1pfrtksqhjyzshe8',
                        flowInterfaceName: 'bdwbqrd1qvlu6fllv2chglinm606fm1zknge62aog8lcts20z8pkf7sadhki4vydmspm5i5ucttksjnj7m4yby0ec3v1s0tpvubtiigj4pt467v85rjyxujixfwy4dpqsv3kcrwafqxecu5a7txs064dx0bf8g6o',
                        flowInterfaceNamespace: 'jq13znltjdb7t0z51dw0ju1d2w3u5af7gcr985rygm01bpfukm7b0grgu5kiho74nuus9izxmlgbouef11hx88whydlnyi8lsr45s7cdiw7oz06vh37t62rru4lgvjqzth2tm9ze3xzox3kq5t84viqipl6yj37u',
                        status: 'HOLDING',
                        detail: 'Molestias at qui facere vel eaque. Enim voluptatem temporibus asperiores dolore adipisci necessitatibus dolore. Dolor excepturi sequi aut autem qui rem molestiae qui. Sed voluptas omnis hic sapiente quo rerum beatae. In magnam ea sit enim. Delectus non eligendi laborum quae excepturi et id neque qui.',
                        example: 'aebi0mp8gr7918zpffv55dzzg4kb0hmzzvml5kscd55m4cwdvjlg03bw2f8eqazeyimt2pbumsxexv0m1hnf0uwtjo3022ayw9216nx1yp672s5ez6wmusiszz8wnudzsuxfix248300hicpfuu2wpm9vtdfi287',
                        startTimeAt: '2020-07-24 11:33:38',
                        direction: 'INBOUND',
                        errorCategory: 'bpzlhwk8lsz72a51b4minhy5v0cm25jfdygx2i70dqxyq7et1xmedb8602egjjacmp87auh1qerh3qf0zkdilghqyiqsjvfyl9t52tw5lboowm83h6d4k28ria1aa79s224dta9ucpi0z2yx3s4stv4ljito0z0r',
                        errorCode: 'aq4ufqlyjhtqp95c8g6l',
                        errorLabel: 814283,
                        node: 5050712010,
                        protocol: 'cuocmhpry5ea2zcjmxiw',
                        qualityOfService: '0bxkub3r2o2nywagtkrr',
                        receiverParty: 'sdhnu5hndhn2bgg865obf8aklzsni8kod6h7erf7wa5osrll2l7tj22nd35r9wrmocda186urh5cdrjyke3wsw3lx2mxaeelc3x2ernc7myeac8enoqtshnkfrstgqibqb1auplaa6kv2h0i3z7s1jw9q78sfrdn',
                        receiverComponent: '2xdja5qv7uz5urc8i1339ff4vfw31ns54ows36zgcpuqijyd8c8xan34km12j3apwcu0qqmen8htfgozklh6o3k2veaksrvc0m8lovkw2cxib3joud5padzz523909a0741ne1r9bphdcsp55xdyhkjq8altszuv',
                        receiverInterface: '8uw6l3qq2rpom1q0vyh5m1k4x39qfr5bdh8jy9tq1k6ftuozq7i1hr0vm3jwajwvopqxtbpoyzemj788zjp4zdx009do6v8nxskwxcnbf6j2q79gu2nrxfkg0r5ps1z8r3568bs1snuhrui3pm7yljpp02bsiyz7',
                        receiverInterfaceNamespace: 'e3cgm0s3q41u7vn6vpugadlqrvlmjgpie3wbw9on5r9ig8lt9pydjfztr8y55xms6m0ltt29zikia1wiasbze3oab9vptz7d76tn1cdcnsc72bpkxdi5m1dqjd5y9ub1rpzgxvbgp0ek6wbqatbui78vvi0959sn',
                        retries: 8908859506,
                        size: 2013474348,
                        timesFailed: 2319765764,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('baf9e4dd-353a-418b-a13d-40063a154583');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'baf9e4dd-353a-418b-a13d-40063a154583'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('baf9e4dd-353a-418b-a13d-40063a154583');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});