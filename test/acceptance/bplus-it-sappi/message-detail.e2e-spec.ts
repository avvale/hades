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
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'wlz5dgxlndw14v6gej64fnt6ri618qades1m7sjq7x6yuroxvf',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'aher8ue4lrudihqvfh5h',
                scenario: 'm2imsik9h8tljwb1uvqewajdf1xpooi19y4meb6qmy2c390xewn5uvs9cjkg',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:30:26',
                executionMonitoringStartAt: '2020-07-29 02:37:17',
                executionMonitoringEndAt: '2020-07-28 22:30:09',
                flowHash: 'qdxh92nt6idgs8hnj7aiuhvn9i162fhoejuzgfrk',
                flowParty: 'kljv2q244qn7453bq4kin8ru0ixwspsok2s5g2a01euhrjdrsyzhfl57szu5nfukhvdrxwaexw8mqfwvqhia8ln8n3xp4clzh3kw8vvngxznokkaiic5bz8p8pdw63pvjd2e6cr807dw3enggh1y7rr8njeoswiq',
                flowComponent: 'gvexjgvt8qpd1bg4mslxfhyhqwrhn1ctxr31md5mv6tahgmza9iw0nhdd5uh2te2yo3wby4i2w36ysgyjx92gkszd6vo6gp4twxgf32bobsg2y1kh1ywb72i5ewo0b883dzbaa9gxdjqaasr7xrczfbvwdxus8xe',
                flowInterfaceName: '9w47crv6gqzdcjucjxjfrryptnr8446mohfc6526zymchv0cb1wtmrtpfa6epmg8q45j8tdgtujt3gejlfwi9rvyun2c24qebh104d52qufo196ca687qvc50mybac3dkuhsr4d9l44qm7y52ohnxs8st3lnhucd',
                flowInterfaceNamespace: '28h2jyf9ic1dkhq66497z0vf1mxhw0hoqka4qvv036j2655xu2k9oghjfz3g5z93kp5qvqumrdodloal6mqqrz772m3knjj6g1g0j3yxo0yyxhnr4q47f45ep2tghf5bh9olq1wnxq3v358nsubb57lwm5mz6g79',
                status: 'TO_BE_DELIVERED',
                detail: 'Reprehenderit iure doloribus atque adipisci dicta vel distinctio ex. Quod magnam ut voluptatum aut natus enim. Soluta nostrum impedit vero saepe ducimus. Doloribus non architecto dolores voluptas aliquid.',
                example: 'nqznc4isspoqstytf5rygl8yfbj7gg9vzzndv3tbahh5u7a8uonwgnw3g4gk9pawjnsvla0wz4yppc1b8dho2imvuydzpcnh5kfciyodta5e0557n6qgq71feberl84kgia3xwbrt011zvcyv4eyo94kx9q9xiqw',
                startTimeAt: '2020-07-29 07:16:52',
                direction: 'INBOUND',
                errorCategory: 'hqymsnevocka9x3wkgyra5xyxchkabzeugwxh7ye3kmobxgdq538t89f6w2molwdww198chm4k6zkd6gqwuld9kzh62zevxo3b19tavi7m9c4z8mbi5ec3sk60f8h0rsg6afktz3336g4tv7kpl3kxvgxc7ez7sn',
                errorCode: '8gvjkngs9rdn6fq3bgcwx57pbhzr4nq8t3isx5h49o6yq8n3ps',
                errorLabel: 854697,
                node: 7944795543,
                protocol: 'jqbhsggmgl2jdj28w91n',
                qualityOfService: 'edoxgj8ymdoqepq7fmzs',
                receiverParty: '24u9vjneox2w7qr6ze0ihit2zrmxs7k0zov5kfgj1uaguiyukmuu3nlmdkztu6l6wp59xpzpddx9xth6jbvj3fmdxsmwi235s678fcyxtx0r7g5fv6jtg1fdtc2d47k17v4b51otini7fq0boim07jloslmrx89p',
                receiverComponent: 'yx3mlwlor5hn8obzd1ir6ighopxsgor41sjfawdodyvw1mhq46am2q4grv16wmq865bjz8txmd9o2js1s1d8b9svkmd06rr3cyi1m2vrd7jtvzwkl8ty1gymi722yok4mxk62lvypfj9l60gwbzsi3l69ha300gj',
                receiverInterface: 'c1w7jca4b2xyyurche5sv82y0jlowd1iqoflitrk4q630qjl02xo4y25b7ekmnnabg1o2h2jioagzbo5rhsgqm05naazs86ef4k33pssswusfz7r6d8oq72z5kyhdcstcswuwsea9ipyz4jjg77tg5gwxq2qr3y7',
                receiverInterfaceNamespace: 'o88ja985tnpt39y1wd1s5ag9xic5df51fitlbd3ja1ekciw39h59pjlipgjeq9bii9r6nx74rorfgiv4mt8woe2vq166aau53npihmhbspfzw184otk7o89owvme0ch6cdn5deo4pqndcovgcj71u8h8kzrvq2ba',
                retries: 4417854668,
                size: 3046481081,
                timesFailed: 5464233438,
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
                
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '4zi0ohop3azjbnn3vz90lvzuu9qlrthabu8g07d93cmw4ma3cg',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'bpluak0p9o8taujqioj6',
                scenario: 'o3ezbmi0ed1bjtozcsbt0d0toqn190dlxrydrxj1ya5hzt90om9i346r6vmq',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:36:37',
                executionMonitoringStartAt: '2020-07-29 04:27:20',
                executionMonitoringEndAt: '2020-07-29 09:06:37',
                flowHash: 'vvzsaa1247rbhjw6jsfxbyd7rurewazmqhbot9ya',
                flowParty: '9epldgqxee68mwbmnozs9qinbe86wsagr127xsxrg35txjxrq9lz3ig9mz0iir25sn7c7s4d0q2rbhobgnujgsknb8cm18fb4luugn0n0bxax7v94x7c0meexlsyz4v2w30u34tzi26t8ucdarae2zr3bwkcjkl7',
                flowComponent: 'owd9apwmbe73nhxy3d0nupud8t5lsz1n9k11lye5wxftrlcqz9ztmwvrn5otb9vh3p62k3hujtbrezimglrnklusuwgpyagda4yuqd0ctwl5nu6dipvvpd3n9yxhvbp8om3ola5vs9lytl78w167mhayh6xvmo2i',
                flowInterfaceName: 'uuhojd5abzbjfovjvyyn63ngldbidfoelycycqhktbuflrxc5iimixfxy4e5hpketqnty911m7hxyaes65vjqwkt1vg7fql1d293n3bdj6fx7fvonmygygixnxc35v674lsbpg974hdeloygsxzowq1u5sxeu8zo',
                flowInterfaceNamespace: 'cf0du3q6bcl95j9rwc0dqvkxufrai100tc6e7ba5b44lfypb24kljrysbl8miclf9s9dqdfahyfe3zmg1cln5e0tawjo6ups4xvmxpxua2scf18cmn9yr63ri6zlzq19qfg1cryx7xyvr0x3f6aj17vry8v1wwvy',
                status: 'CANCELLED',
                detail: 'Magnam praesentium molestiae. Id officiis nulla qui aliquid repellat a voluptatem. Nihil et minus vero enim qui accusamus maxime ratione.',
                example: 't0d519710p4wokx4v5am6gjwyrpy5sreqiya2uv5mo8jozhlh7hhzsvqecrukewnp9z7ggfhqxt6n4mpv0xe5vtz4lpj60ca8fzbh2natcbglucpxza3qxiawoda1rx9f5g18rpwmd6u3trgv7z9qfwejod56ri0',
                startTimeAt: '2020-07-28 21:09:37',
                direction: 'INBOUND',
                errorCategory: '8xwjknrwlpyd0sw5v6zb2mz442pl3oamjcmftnipahm668ts0w8voka1wuc5vfm6jqbr2viyv214al5c342qdow5q1qrgyr8julz3k0y1oamc37t6zwgt9k1jaoxb3ax5ie8umolige3e373droltf7fxcox2xnw',
                errorCode: '6nwmzx90y18p3la470x56wtte8qc3pmb6vvfj0vfrsjtuzllgq',
                errorLabel: 506581,
                node: 2525901037,
                protocol: 'fivzkv6qf342i5ork2pf',
                qualityOfService: 'lhtbqsjerawo5ymq1674',
                receiverParty: 'v3x8guw8j5iblstnup050irqjq9ix1wwry33mhbdxlksqxz7asba86hnjr15eo9fxpbu63fjez2gsy289z98ire94aaq4jrqfnwqv8yi24mu0m991632q7245tctqvjswiw7vig97eqkzbaw0tj6hlft5qczml72',
                receiverComponent: 'k398eqaw2geklabqxmw4n2gyljfa3oo1iszfn1sxmfnbzfgml22ya5cp925omyxnpk49veyd675aoxgsce7cxopaqvoxuodm49bsepkp0q255o5tzmhjryuqgcj7e1dhrn9kdkjnam40cnibt5gsoofcs97k4mto',
                receiverInterface: 's5tifqi06ik3d5mtvcy6nn5bsq8d9e4hba58ce2p3mo5msy7vjbr2wmz370m5chrsvgvt80cv7llvn19j0ezmn6vsoy54j8jvb1lk70fsh1oa5vexlcdh5uvous54ka5sopdte3o5b1345b213l5qlu68ip0ike4',
                receiverInterfaceNamespace: 'fmtjzqs0mlli8ye9v2fhyg4oety8tgv83rwvkewtg0ig7m8dc4cnxjglqoqgfg42hngftk2ca0od6kmemx2kchgcnnkpwl7t8tuuemo2ypnewhabcc6bxwp8xvoceny1qmpv8lduq0b0ib3j9mpw4xw31i4h71pw',
                retries: 5776829581,
                size: 7798319919,
                timesFailed: 9454157284,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: null,
                tenantCode: '9fyjgpv8sjd4ccofhcfiak20ry6d88zldtb6l9ovrmdgj1ysca',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '3pc0tad6phzcofwyof65',
                scenario: '4l0bniejsup0v99s5u3kvpv1hki7vbzylb0cs25d7qkmhyf13as17eegwvxx',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:25:30',
                executionMonitoringStartAt: '2020-07-29 03:58:51',
                executionMonitoringEndAt: '2020-07-29 12:54:53',
                flowHash: 'olvybqbtbhmuyy0nt7t4xkwniiiyrc499ga37q6f',
                flowParty: 'anbb4tqxtmnkula50ze5hh8ogc6pzgcpowb6tusdgpnhj435f4mooesjqi0pkuu0bww7s5mc70ixywzroknt7t7k3u1imdjw4ltff37sogoqkozknzrf2em7iu73gnqs5ch7cwtc5kj9betiie8sswni3oq63ig7',
                flowComponent: 'sbqme0cwnpd44ywslj4gtj81xzoxx4n1s0hj75x3coc13xd8ybzddfewvom54wbjqm39wp6mm3iviwwfg5zvqm2xxfmo2ppv2x2g9ugptzd28r25mfyv7ax2aili5en5nipu3lf9tzn1obid1f47jaxalgaaevtg',
                flowInterfaceName: 'ptvhz1yaoc0jd1u43yxtu95hm060qd1plhvmkkh8budj4ajleblzt9tb33pi2srvqwlffamll7grcjoun0yao8lpql9pu4snk6hksoq0clmvcuqqwrjfh3950osx7vw2ci2c7cijh7uajnhjuk3yvd423r659otr',
                flowInterfaceNamespace: 'fo9yxtuw6lrp5zz5wxw634zi9473ruvbkj7hm0blptbnfd8xlkidf3qhreq3t8u2dwoiw8vtq1ago1s9qrq61726a0np5i203iyc7skkv783yq2cnwi06cm6lfv6qdgitnrhajp37ek6uwybgrarogyssyz5gdnr',
                status: 'ERROR',
                detail: 'Aut qui ex repellat saepe doloremque. Magnam corrupti nihil ipsam excepturi atque. Enim eum voluptatibus.',
                example: 'vsp3geeb87km6yb25bt4iugb2u2v2nozapcxr9wkplmvsa77abc05dtykr6dwzkt6vnn3t8rc3qfn2g6wfr4hveasncmhyfivz0xu1sd1wt4ilxivkme6m1ulnw2s71o5qv9gdasrsab6do5uftx7cntadfjs4p7',
                startTimeAt: '2020-07-29 12:46:12',
                direction: 'INBOUND',
                errorCategory: 'm68sqw40y2npqy9xyqr18hncvsn1hahnrv4pt1zrfnzl7msiznen09thm7yzmhx5ix3ohd7ru3uk08m05zwpuajgtbxrv50rjk5rafd21edcx45d2qpjvmyedsuyq3nu5ktz64vyb74a9d6ffjma48znk2ywsujt',
                errorCode: 'rolbi6fg3zansuhb9zcsdee0pxcjc2ykzcebx0e4m6v8k1u21x',
                errorLabel: 122347,
                node: 2719565805,
                protocol: 'a6rg4zxjv1k78yk0fuf7',
                qualityOfService: '0gvu5w6scytrsjcr1864',
                receiverParty: 'j1er0h751cgthcy5jmuq5hedxddje0sf4ccfr0f20bohnh6pighzkebs90c77rc11ddsktctwvy8oi088xbfx84z1tud4cd5ftvkztawls9g74sva0ujvjqc99ks5o7x4kgqmd9ygklb13zkwrk46zrn7z3c1bj4',
                receiverComponent: 'djqqa443kxvi67smxsk33pxpr79mb45mxyn09dmn7720rn0tfv25eeflq9tbnmkekwx93a3ygdo20fjmm6oh6osk81emrz0yd04takb6nkcph2bgq71yq0twx21qzfw8rhv1wsazxhi9b4yfoyn0csgr4mhgewtr',
                receiverInterface: 'zm695z6eculqza7w1grtkqgpg18lsed7hjqe2a5d4oeb57bdh7ngoehf1f0ba6dnhg7kbg33ft6qpc4s44uldr61bpmzskas82pitjodxghgok5myay5pozgzdiox33x12gy0c9yjykfz5vdp6tyk60gi0gebq25',
                receiverInterfaceNamespace: 'k17pweb4va2vn3igf5fujp5ds967l6jngab6gufqlx3gktoo2m669w0pkmiqf4g00avhncumy30x9b8udcshw56lghvbk8tc8ktmyz8dj66i9gsrwt23uylopeykmtrt51mlk74lppdy36efbjklytgxxeoywbkc',
                retries: 5019488981,
                size: 8248915069,
                timesFailed: 1248472045,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                
                tenantCode: '1oqmhdebxyenxgiybodszvgwcbo60vlcgph4cpar3cf5m478zv',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '1992eh1qc1zecmn670nq',
                scenario: 'ay5t3pfxr3iakprg9kuilyslva4ne26cmop6rbdag0gniumm9buhvprdf6uk',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:07:53',
                executionMonitoringStartAt: '2020-07-29 16:00:52',
                executionMonitoringEndAt: '2020-07-29 00:57:32',
                flowHash: 'qq8t2bcx5mv91e0tl2x204ambdugxre624jl9vtj',
                flowParty: '4on9a1yxefvjzhez2jriqj8mx1lyp2xf5q2t5jbc684rhjns4x4r7jpfxbpml1ckq2qcbw5my3f5yccsci0iv5xit2l8lo69ak4btws7zx3105h23yuvt1130k442olxp17b7pgt6yqz7qhpu8vhjhecamnrgbph',
                flowComponent: 'xxhuixlpstjuknfh173fcqmhza0a58k61ntvqtqisj1pwcsi0c9c9bmf734ocp95batfl6p64yvzraxmhu6fz2gti3lppp9v26my3h4ozcs1main7yezotmcj5pk54svtm5rtj80y0fana9s302feszd1vfta3d5',
                flowInterfaceName: 'ntpqpyzqdqc6srsvxivi8radrt7fpza9mcr20f1w7v0fa489linqj5x44la1r1wdme52hq45aw59o6dlh5cr85xukucm37e3jiy6rhs7z8egjtvzeym308y5jsff8kmgahmcpaqn251kqeldzl0rxtcwdjfa9myt',
                flowInterfaceNamespace: 'svnsgppf3ljl3ii0hucrui92t6i38zkct6m827h7z14s7gwqwf2ydvfhb8rr0t02i7nf0hdp884lk1fs9cg7jh168vos65xa62o5dct69mzvf0fq5oatr8lqucnnel4sb5zvwil3uhrtkzk4csy2j04n81m411fl',
                status: 'SUCCESS',
                detail: 'Iste aut tempora reiciendis officiis molestias modi soluta. Non recusandae et ducimus et beatae explicabo sit. Voluptatem illo laudantium dicta repudiandae vero minima. Voluptas similique sit at quia illo aut. Totam rem sapiente at velit sequi.',
                example: 'n4wqd9al33y125aqt74y6y8ymoa4dp1cz3nvjj98uczomzlgwig07mvnzhqga0nfx86c8ikzvw1ftjmk878c2qn0ftasn0yq4ndglsba2jrggvjufypyghqihk7grqs8qff1tcghndl39fcuhmvpxi6j0aoxc0bi',
                startTimeAt: '2020-07-29 05:30:56',
                direction: 'OUTBOUND',
                errorCategory: 'samifnqg4b7bnxbinjn9fcqjjf2bhtu268hz953bvsqppc20yjrlfwlc1rjdyqtukm60dl0fz2d7znvrb1gjxekbmplj47ztslb57geetbiyh55poquaysr6brsg33vrflk9w3eik6mjxhg41eok5zquxuq8m4p9',
                errorCode: 'hyhu317ys0uanuzxcafvy2851575sch5gw2941lh28qmkz3ha9',
                errorLabel: 562585,
                node: 1873492965,
                protocol: '2xfeswegbphkij583ws5',
                qualityOfService: '8sonplzute11a5s1goyr',
                receiverParty: 'fiok8t7v1pzo49z4ug46diy3bdppm986bitgg8qfws96yxs9s3rdxyhdsxxafmixwicnohzj2qb2bxx4mc7iiikotnhw37uo79ir5v3qdqrjsvp3jaey8tvtwfixg6s2r8kyn9ua87hg4ghag0pqiwschptrf521',
                receiverComponent: 'msi37bqnko66u35vakx6l0evny1f7pccwx3fc8b44tse947ogsafurgcljuczs40x00ojln49bdyddlsa8zirxlm0v4wjvtg8f2j2z98zutt54mponr9iyyqkxs6cje3ekorfc03c9wues542yz4491q27fsxk6a',
                receiverInterface: '5jfkdfgjhzpzmtx40h1e65qgubw410awxxkzh37tlbo7ny0q934tn6p47bawje2e1selr5uezfl7v4ukyhp0b76e80n4cp2oyf1wxr08yyw9g199txydeo4o8x82vqosxp0ktazdpnadh4tr3o5433oat0i0kx1s',
                receiverInterfaceNamespace: 'aee2nz9b9gm754rd2sntx80wyey51x9vnfe0cxuntdota5krax6nx09tj1dpfd4f1hvtm6ryw00jkpax5ugd2es7vmwpbqeypvuw92wgdx2jmxkgcyiu9u0sg87pl94fopno6ohlmlvsoizimjvv2sjyvukqvaah',
                retries: 3312846145,
                size: 8468542929,
                timesFailed: 5719173036,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: null,
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'fy4gitbehhi0nvijecu4',
                scenario: '6w8t62w1qf0s221q680y444t34nedyg5jb8lpok1rlkfkedxp3120ybbtg5b',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:38:47',
                executionMonitoringStartAt: '2020-07-28 22:50:51',
                executionMonitoringEndAt: '2020-07-29 15:46:32',
                flowHash: 'fuy90l4cfj5d5iurjeaq8zzl1nazwq830vb7s758',
                flowParty: 'rxm4sgu1jyttdz2r242uwnl2w2owhfy5askokk4gzrqio3trn0e4qzqqftv0o2cq82n6gs06ij1ehvbjy1oyinybibqjxpor930qombehrxx7n8y83j8eydzsf05392j4ykuiiae8sry6v1mmbmgnqffsfos9h36',
                flowComponent: 'p2hnfcrxsq0fvou20g1x4riolidcrazz6gd9304n3arvrjh1nhcr1e06ssd05ucxockuohox2l79vcr41fwp4g4qj8iu2wo4hzqq5ldtpajr6rx8fsuk5scfqa02pozhye69nhejhmkhsrat518fnud6txnw1grw',
                flowInterfaceName: '5jfkrx0jyfl01pgph7ofsu4yazeclsjgj0plcg7sdlffzu8o9ckjfgw5bgtjwqyk0taphv72ergazq46hgylz49yj3au3tkz62ui9yn4wnax7g5uzi9blvbydusy8bmkes43tmwc2r8nwas4msaynpd76y40mshz',
                flowInterfaceNamespace: '2zbxgozhtf7fpe4l08op1ayslo0l4n6ltytr23s34aunhqg4cb268hbcdd841pe5y4yoeee5mw5lrleu1iabbstdqjfxguh4wcjl4l9kkq6jve2v63p8aczgyc1y23l25tbrat9hicg0bog2t03v4s8jry7d753o',
                status: 'WAITING',
                detail: 'Sit alias voluptas sint adipisci. Fugiat perspiciatis sint nemo et unde assumenda accusamus. Consequatur doloremque deleniti.',
                example: '4e23nozav6ll5fr95mix2rg9d37wcsqoq70soj77e5ghch430p4xqdgs6kdjf4dt0gss1vqlqix0gqn5j4ubey7yadwfzt3b603wi2584d8dj152rx5f5fo7b2zy00d4cxiqm68m2w8gn08xz93mfw08o0umu5sl',
                startTimeAt: '2020-07-29 12:31:39',
                direction: 'OUTBOUND',
                errorCategory: 'vtqab83smb614qy4ow2xro50q8kcxg4a8ibmgtkveucsi1lnj3drzgfktbhfhaq3ydlxggpy6fp9pdxp3fg08gajt58vftgv5aqgrj6bm5kud3enos4jizwx63grf5ad1oycki3tefpbii1nlv0dc2q0hgauyf5i',
                errorCode: 'i83zg1k5wmat4hwg1dq1s82c099ixaoiflvpipu4fj8oeujony',
                errorLabel: 374178,
                node: 5065688499,
                protocol: 'qrzafbeenqvi32awrg6p',
                qualityOfService: 'yqjb0pop60gcxb2jvexm',
                receiverParty: 'bwpbdut3dj351cw9eo8e971xqgh5ts1sitzx1gu36w9yq45hpl3b1xb8ua544kna2crm4qnf7hwzv3xkoumuwdd7b1v240qlxcnuho0cf76scqteojr3twbkih1o7uhoi498lmwytpnyezb2heytn74qqm09wbnq',
                receiverComponent: 'm94nhsz80cvk7r92nr2t1f96jleg4it8mazfwl7li63fc595i7zxz594dkqkba6lps8jlhak52re90s8dvvivjk9x8fit1xhwzjhfl9pl4vu4mjcpdi3bakxmblknii2bcqqofw3n11rj3byoehvbwdz1lewqiwd',
                receiverInterface: 'fc4ja6ow2416gv9k7lpn3mdtgpvzhr9harcqbzvci30pmbea0ifuemgiddn773xrrjty27sz15qlrslb4suz851vkp0sd4lichjnufiw8mitc3kcgdohjm9xr65pca93h3elitsgesg7gx5hokn1nrfed4mfgxix',
                receiverInterfaceNamespace: 'qtukzsbfq6n5enqhevz9b5nv9cuo5bcehoowdklmkt6na89cvok1dzkuvbksdu7lmfir2m7anu8zb4ejmjlte22603tpn9l29vg9hez9islxndo3dur8ll6mg6d1fd4ee61yug5iw2wyaoa64pmu9kcfyw155jcd',
                retries: 1251906874,
                size: 5974773497,
                timesFailed: 1459016653,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '78vxfa8fpas54bh4obd7',
                scenario: '4tlmnovj6r1wg3bq36ol85ua7e1c3itzy7oszu0n6jsr2wtdnz40fm3nqqpc',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:26:00',
                executionMonitoringStartAt: '2020-07-29 03:20:03',
                executionMonitoringEndAt: '2020-07-29 12:54:04',
                flowHash: 'rw72brzmbap117za5bqs2i12zpydtgtuocr7zukx',
                flowParty: 'n1y5hihz7e977tfrlce6h3b2ymvqkivg0x7mkde5v0apj2taqfxq1g88smszr52vgidtilieavngpp8g8bavms6ryx8q68jc8i7gqlt65hh8rrb6h4nkx6maaihz1m2a84csz8zumeelg9tebru5wj31mqiuhja6',
                flowComponent: 'fz9g1f0ac926fpymsn2ackg04s6i3cosl1dpz9mh9eie2afjewgnc2mn7v6ulagp1lr06o17v9voh3xc4lahneiw80q2fnd8nr0ev5ryt058cy9bqujj154bh2oqyxhsvy2mvged9b2g27cv47pzch78rwchlkeh',
                flowInterfaceName: '5pttncc23hm8cg7alncty07m4v4l18mjfmwmoj9os8qrccgfyogavw9kzzfzgtdsn1knug7gh4599cp7ow3rd31id8i7zm464ym39whrd0eauqzrri3htqo2nq9e55oa6b7c4f3c8gckusa32m9xmifbhpyt6rby',
                flowInterfaceNamespace: 'x620hxswczp8kpc58zgxrov5jq4krmbn7d8r92aot0du3henluxomyvt8hpxhhj22stlumznwd65778zqcrjgdm61bd1dzc32jxv1wwuzxr66r0hgdr49lt8vdwv96d19zkp7r4gwdg9acsyg7i1z0g2lft5jphv',
                status: 'SUCCESS',
                detail: 'Nam molestiae quasi explicabo reprehenderit et eos tempore. Eaque rerum in quia. Assumenda neque tempora et et quisquam consequuntur quis et doloribus. Ea distinctio atque et.',
                example: '9mrvn223y5t4vmhazmd8w3yjizfjr74dtg7j3hr10rahipop8ji05t9w05c27jtc9sb4ytnbeyix733dwzt28ngki3y5sp5u8ppa8e4kh6ll0lkqvu14qlnnawui6m598g3io02xcl9kpckfoxswtql0in5kjj2h',
                startTimeAt: '2020-07-29 12:22:48',
                direction: 'OUTBOUND',
                errorCategory: 'qc5x5pr7l06gqkip5vo1bkj6ltnt9p9ioj4izuqwkjcf7qjo92vrpm0gq1ncb3zm04tslmelsmaknpsmhbxeewlnlfrvlmfeswzaokx7n2qv0bnlch10a2ej5pzvdguhiym70cnf4hk9jgxb947hh61xymde6hrb',
                errorCode: 'knyd1nag1jx8ba4lu83h8u3b2427oxnbaq0yv7opkw3ijtx286',
                errorLabel: 706434,
                node: 3359671364,
                protocol: 'g5i2rau2la126jy1byn8',
                qualityOfService: '7kfzp2w5ftulbjx0jwix',
                receiverParty: 'lm6eq3btzmsxniiono6q09qijjfmhoduu3mt7te4c0bvk8jzr46bqqrw2t3xx9f6vcpdnsy1w1y08qvn072mu3e5iy00qdwmcqvetj5mvx0gwfstw0j47ma9givn7oqwfi11ojsr305uw8ijavhue4yinig2o2tv',
                receiverComponent: 'is8512hnboiasv3k3et0nqrtdq709f2qjy4dtdiu66twx548r7gvaiw25ezlm7n4otjtk0mcjepgcvjrq4nhx70sko6n7ru8nzlacodwhij3kl8f2wfk201ps2rqkq9n9flokgp6qmox0q5fspdkoglgnvpzt2xm',
                receiverInterface: 'kb3prt7pdyo49rafwc0sl2mpf0tfd77fsvm7aq31trdzae8hqe1s6kuy831e9g2v8h5oova0vpw3m625y188wcp4ymkhoypcc9kepuonkf5k257tt6amjiixrijzd09q1s0okl363gc47g51keoxynfsfv5936th',
                receiverInterfaceNamespace: 'mt7unjboi14gqbfjn939nted1cm2cpd6i71aesw10o3cyqjpnt3nmzm33uufi2rdqkw0pglrcmi33pc6bsense7x9hsx17srkuqjk5cw820ra0stwcw9zxv50suzjvy78edzp4djxirg2sd73o0f3bvrtvgse3av',
                retries: 1887901264,
                size: 4927866803,
                timesFailed: 4683462746,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'a1cu2frtxw60ctxffd81zv08h3eapc62ttqj3pqqnmygffqqy0',
                systemId: null,
                systemName: '9vqmz7zqg2mnnjzbyigo',
                scenario: '57i89svab3l69erbi8ivwqukvkyi41jqufi8y5bc4q7ycgq0r1qpsbbdjkq1',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:04:43',
                executionMonitoringStartAt: '2020-07-29 18:04:46',
                executionMonitoringEndAt: '2020-07-29 08:40:26',
                flowHash: 's1un92kydzaiy7z6oroaqug8a9xmfey46x0ikaxh',
                flowParty: 'ccaqb5qsftv2p6b9yenmwnc1ul9deio4154snsd4jcc7y0d883wspqx06pihg5nfhazozzaekpy169oprynqgq8z49oq3h7pjxdbqvulchntqxiy0002sfjd9hx2qdt12dh2vxczarok5ofb8grlgvjfj7sb26o3',
                flowComponent: 'aufsq4mv1bck9es137gvbxqy5of16xfmsi6r1qg0jc5f86nc3t5uv83w0cntyx74meq5lo67wlsl4k40lub8s7flx028v4tcplqfjitkud6q7gquiz2965uwhuwov165i09olx1p6np2g7d3qjw4qu646fin9h32',
                flowInterfaceName: 'eczpoej54smo4qn87269zvam6i4iw947bvwllmtwryfw8gknkgowfk9ur12qj9btf48bl2499q2pdg3o9zxvbcw99ljdmapwbhlbdsu0or8hnaqilt12irrsft857t8xxo2fys9hzcmmi76bmyqp2ylk6aprcfk9',
                flowInterfaceNamespace: 'pf4si3chrasnrcmw1kf4rmpdcfp3lbyd16c5cnq08jzn1iltjik4quphgip5l81boeuj0d2igfk4nizjud1ugpoqegad9e0990p2txb7jgrragj9k7ixl7eghysppwl9s4rg2hnfkjl7qop9ygln0uc58z4ryob0',
                status: 'ERROR',
                detail: 'Facilis eos optio distinctio. Quae modi nihil cumque veritatis. Labore quis assumenda dolorum.',
                example: '9h433q5uv1elgo9dr3r42hrm8stb30dvtxmapsavfh3os5usk5eu0glvii3m9f6ai4xqc6bvmzce50mxjnbk4e9p2ycvm4cklu080c3knsujth2j5qyd88e7t1jn7lo3e00od7lrlvyit8m5q85deokcfzmv6a8d',
                startTimeAt: '2020-07-28 20:38:03',
                direction: 'OUTBOUND',
                errorCategory: 'owmc0f56dw68qjtpb93g1d7xbkuzr60esweoqjsca43z50esceq3md5rnjyon2vhyf12t11sud0vkn23mwqz3i5fwa44feyhk1qwh5ug6t3ueo4y4q40f9446taw7fhjb9jw2uvfbovm3ym04zv8lyju6t0xvvqo',
                errorCode: 'wwayde2w6vf21zo8itjol9o8v9czxbmwd891ux2cim0pmbnjy2',
                errorLabel: 423670,
                node: 4270462152,
                protocol: 'kl599ie0cay4jsgxrfpp',
                qualityOfService: 'a5mzpe503pq2t55651as',
                receiverParty: 'zhbr52hj51bjoo6t0f26jw1v9dugwxj3sm5ixca4cpqgtpijgjohu2df4s8ms1ud0iuzegohdcg52gv7ea0hgljsswht9f2fdt62rwqoehkr8qdyskce12f9baf0q59pm8qer51sun8qjszgm70qfcvhy4cosvdj',
                receiverComponent: '3mjtuvzqgu67en66eq8rykqpmgqlv0nsnhkny7fo3kv3gznfe4ds0v14m6zg1dd8q23juwhdk1q46p3ywqj09gy7v6jkbfkmlyxvxgooklnsqc3855zqxtgqtdbj3svmn4lcitjpv1ilqrguqqhd7nxi2997mmot',
                receiverInterface: 'ctyk480fag3pkn8pm1o2qi0e0jqgt9og55ovosr7qm6j8654266xhsjbfft7swy4ncyf9mm8wv3w8659ui5sqxbsm5bkx9w4dmw8jg7wg8gxpe5helyw7em6b9734hbutfhdg46liy0fp4gn8vm8ifu12am0tmfz',
                receiverInterfaceNamespace: 'f0091s330negwurh1b4ukkwn7yxt77py2cso7fe74pkc4i659gukucpjktsyc2po1z4wwvso4r0djlfibi77kytha4plhp7fp7jaxymeiqzjz64ur2fg81dd5eq3bhoo987lucglgxvjwn7tetlusihhuo1mpczn',
                retries: 7591339534,
                size: 8640361692,
                timesFailed: 2061408563,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '28w06s4k0u75ja9xr6om19cuojdr7lw6cxq63xf9gwgcv76umw',
                
                systemName: '0k3rnxq47qxwkcdu98jo',
                scenario: 'bicgqtyzl3m8bw807bztc3n0oj9n3fczbvq8hxee3tr55hjoyhuhfmjy2eub',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:08:19',
                executionMonitoringStartAt: '2020-07-28 21:13:21',
                executionMonitoringEndAt: '2020-07-29 05:25:38',
                flowHash: 'c7etqlm9fcgo0aj6vyf9qosxvpvis3yj61sw8z84',
                flowParty: 'nd2v8gnnp70ydow29w1qdpf84yz6ph9ryd5y7xm3o43d65baga7cj22jsifory1bn0ef9b67yanrqr0otgxtzx3232vsbvm879occrr6pky64szcnd95fjfy8zmog9q54s4d0i733ywosv7pmgdm8kewn7ol1y70',
                flowComponent: '3x1n9mki5jyxt6nmpevyzxf3kmnronck2kpor8htq3jh7otdyjsf6dll1jd5qpa7jh11bsnbkdu55uqx0801yvxmv65eo5q1hsk989rd4uv3stotejpdkrk74zpos2vlbgfbk6jq5s7v3oteqrnrhyovuftck667',
                flowInterfaceName: '12bhrxrok1ua14pz8zc83yzml7kwk9ucwsfqozljs4u86xu6xyg22ia4d6066uhdo1pqrg74jyzz5dkx44f2d5z0196s1mdy6uvstrxsswqh5fag83mylyh7pk8gus6h8rnjle8dkg35d9szb1nkj0wqs8bacvgw',
                flowInterfaceNamespace: 'nohqs8zqxctjpso4xtq07w58a5ax2mtmpgov1aovot5a8er7ohqhg67zrersw5ur57p8p609g3xocv0m751pnub52uf6h7ascyahgx7eotinrs235kq307q7vyjlt1enxrhe3t5jdzs1wf2ckus9uywirvstru4u',
                status: 'CANCELLED',
                detail: 'Consectetur eum nihil iusto laboriosam ut ut. Enim eum facilis consequatur quia laborum velit dolorem. Dolor dolorem provident quae iusto. Aut vel ipsam sed iure repellat mollitia.',
                example: 'aj6citulgf6hiiulhum9el932b0lr0y6l92mdp9ka2xg5429rxywxb11c9yflks4io9r3tfm6iolkoo9blxae269d817tuuesqz5gj3n9nrq85zuypboy2zrw47sl92p71oinoua9t1fi7rbibnrhiujfqnym0dk',
                startTimeAt: '2020-07-29 10:22:09',
                direction: 'INBOUND',
                errorCategory: 'iz07jzmgra47thtvszs6iulqdgm9oqhb5nmdptz4sb23hyo0rv9iqes24jqh84mkv6kdlgaicfc0rwt9zog1vp85vtn5x5p0tpkzrx8p5wd9u92rei8kn5qum3qirj7g82clnpsp7s22nl4h4geykreg5g0vkze8',
                errorCode: 'ktra7q9gthuc745q3ko5c5a8uno1s6i3dax9qqd88ish3g3xqa',
                errorLabel: 163511,
                node: 7023238749,
                protocol: '66e6h96ndlsc1sbg3n43',
                qualityOfService: '3l58ajs0n8c21udd3r6e',
                receiverParty: '1d7e48eu1pe39bjiopr59qg4ta8ri3fwufl36ztv7pb22tuue5oal46tmyi23ijq6ix5n86pboce9azlwmg0lb2z97vpfs4w4ur0gg9qguh3dpj6rggsak2x81e2vntt6fqvrx8ehaxhbzn6sfw4r1th1rqcz2nz',
                receiverComponent: 'vzfh6cdk16u7jifgy9p8lho6py88i5chs1eayt2zdr49i1o8q24sq4xilu3635rf63uzcx4xc2chvuu70lv44lh76fuyn9t0im00yiipws1dmdt5zmuo6flavutvzth4365c94qfhzzkyu7vr33h3q3aw4gs17m8',
                receiverInterface: 'uduad1rcgw9ez4wultidkx0t5ofc0s8kyuczp77159k0hzcm6ukmnfdkvp0kp0ebjmdg4hwj9fr7drrdh1nilh20i0lecjxcgptqvcumq0387ko8xvdzxme0sfknaqm35uu4uilo57e18rxhjaope3u9sv9us399',
                receiverInterfaceNamespace: 'pjagv7hdyiwy31j8f0jrse010oj37i71b95v593hw6u5is5c4sx37dv0pgbuqpun4q4zs0i1iy1gke6v6crjxp2zcwatwaj3b04l5dfd1nj7xpibrsshwax5ez0prvtgt2hn1j23owm34po0d7hmu3etzfsndcg6',
                retries: 7397478395,
                size: 1495332191,
                timesFailed: 7771105210,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'cwgqqln74molnt2a155ctc9ntwef6smriy10stv7lev9f9qsez',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: null,
                scenario: '2otyocii4u01hkljf52d9nytuoq623m6qgxsc51d2kjch8qo3j19a13qezdg',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 17:13:00',
                executionMonitoringStartAt: '2020-07-28 21:59:43',
                executionMonitoringEndAt: '2020-07-29 06:03:21',
                flowHash: '4chdk7nxkrlg785phxbyu8qkrj4769c8dkk31mhk',
                flowParty: 'fzm2qbymti5ipbvhq18gybelfb5doeaxeuu148r94f89qtxgbacmxea8u0cve0a614m1pssn8fxf18w16nzpzsa3ig411icnbaqnjmd764ghq86pcdpwhhpmhzr0vpzq5f5uuqp0zhgpgc094vjp1i7duvefkn6p',
                flowComponent: 'gq0lau0sw884cyvbyeklu8g51952hoi9b0bfw2kueiqd4i4zywkyp7chfnui2p3rv0cfbq6n6j4nl6uhrj458zhfbfvavgeiu6pahmeq9vt9hmfzog0j431gvjk4za3pw659q9qq5ncm2mm7ezgc7xwpbb92bwk7',
                flowInterfaceName: 'b9n0gwlk4jj6o6pypk5ksqce1dho89wxcv63reu0j5ztgvtm4mxnzu5ccvgphd5ai3fx7o6dkxidp3a5udlscccq3qmful3806e21d0008chr95gteeyvj5fzwc6dbz07qa6a8cdeb5v6kl4pn1z3rqlt4qe0t0o',
                flowInterfaceNamespace: 'zjsaoq4redvxavl0pcfahb4de0ak24pg9cvvmaxa7wr2vu48obkfjzrcdwqut405lqip44po4rrmlt0lasxac3jhywgtca7qd2hyg28szb65axmsqr8ctlgkklzbdvv27tfgavwyoh135objczlmcoikql8fpl0f',
                status: 'ERROR',
                detail: 'Dolor necessitatibus et dolores non nobis voluptatem totam. Nostrum saepe porro vitae dolorum ut ipsum maiores qui eveniet. Voluptate non saepe et.',
                example: '8ubu3gqrk93v2w3gu60konkqva2dckv3tf8wtvcxmlllgeg25uw0q0n7j44hkx959diyymoeud5keh2my8m5zgbt0reqtpn0van95l5cfyfor92n1zynn75puqq508kgnpisiyd5492f0gnh7gn57jbizat3x4t5',
                startTimeAt: '2020-07-29 09:36:16',
                direction: 'INBOUND',
                errorCategory: '4twjn8t0uwpbattti77jwspdxvlr0wug8y5peoggykt571ucaqpijr09yjjmgrboaf6nbk1lhzrkkpdxp07fjymw4pzbzechao5mi3p5pe3pspbz6oh8qj1lf5znyr7v68hlqtmfk3ti21y7pg580b5qo4fpbzr0',
                errorCode: '71uodhvl6xpneyje7v47fu6lwzv6b7xdp2hq1pxsgtu092g25b',
                errorLabel: 814237,
                node: 8966805512,
                protocol: 'o8abisiddq4ghg2lsv37',
                qualityOfService: '26vm6efi19bykajrtzaz',
                receiverParty: 'scywh8fral0wegfj6xjh6wk43384uc5can7zvi5bq42s1n6cm5p60tik63aep9mzk01mnegafsw4uxyyhjnandmprlre87evd4xbm3f3lnzedr1r1pkjr5kp65azk11stzvjzvvwlw5y13t17z5hg0a3r8xc3b23',
                receiverComponent: 'sayaisvtbfe46ptxgepso4gb4nugs75sesy782ktjdv5i4rktebd0ssrpvmqjmwuhc8nomh4q7wzs3kr4evbd67tr7j925naxif76z4vd2njgr248ce4ab7yibanf0qytbd1qijp5efcbm24k0nbb7sxhyqlq9p2',
                receiverInterface: 'fc9m2i546p1sl7dctg0u1nop5rorb6ghym15192oizv9f3p3qsrxsvf7idox81vxv2g5bpfzoy7wrcdjnxjhvrp2rhzp90h2xx9ucbfgsxbkgk4guehr21hwad0giq84ukcdxvji8uhccihk8xh61zf850nkstld',
                receiverInterfaceNamespace: '1fpwlfi4n35hbmrvgk3u9s31w5lfjfpu66ls2zkxie503jmblneacflcs2hh3hebfqn638qxkb48q59yd5bq5g2byqeuhsi861srqsny4es37r7kkk3tfrk25zp2ek3naluutjfkgj97vx88z0xtkbpdexg07djj',
                retries: 3130737274,
                size: 8992178458,
                timesFailed: 7693144015,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'oys3zjjcioltaivzy82k79zcy7zfati1v2okdtlj2lk2jny9j9',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                
                scenario: '8igqiyy14auqwtd7eezx9d8on9sqbx0q83a7hwk80gt8ona86sth0tleqrtc',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:23:00',
                executionMonitoringStartAt: '2020-07-28 19:56:19',
                executionMonitoringEndAt: '2020-07-29 00:41:56',
                flowHash: 'zb988qk8akw80o4fzzvjtqy7dxurnha2q7dpkqu7',
                flowParty: '96apkichz2nvjs5ws9zhu9hxfof152i9omzvfyyx2tigvhv2whk9dntccb50037bulzqh77id1eo0cu0wgo02aolmgpp6yblfamd7butc4kgd3a0z3vdevto7ph74h2ft0zv74x84n9olkghqyivgsyz8nuxvq8n',
                flowComponent: 'y7whkrwlg7xj6dctjmovime7fv8eqg8cdlwh4hiajh224rzvqj0vr4uvo10mte312nak4b14uuao9tj35j3gtgu8x376497z93l0fwmbqvc4x4morbr15xv1we6cgk4mbrt4ws7lgftlsjiwq3ha9st7rbh85hlf',
                flowInterfaceName: '4vefhabcylbq3c42zouaykph45bz2qyw24pr8olc2poymgdx90pmzt22qjvxwffc7fobc9pk0r30r8kqsifpy6ivwd1xjm21n2mq17q5elqfsre76plo3qcjptv8jnt81dk3aewnvj8u1467k5750tzymqqvrybi',
                flowInterfaceNamespace: '5v1zypgeryqv5t1lz60i912ozykn2oj4z3vknnb1um1wspll9ydjarfk3lgc28tak8tpnf85p5wogudqz0hr062oxceuqgfpa1a7iglskair5yuatp828z578696v5nzmuy5ehvt4elyvs4t07d7hef41h5rizqu',
                status: 'CANCELLED',
                detail: 'Sed odit quibusdam architecto provident deserunt dolorem iure. Deleniti fugiat omnis at voluptate quod. Rerum asperiores qui molestiae magni aspernatur aperiam consequatur. Quia dolorem nesciunt quia officiis ratione id enim. Ut amet ipsa.',
                example: '0w3gl2klrk3sf8iaumeutxok8me8naerf19xxp3o24018gg1vn5lr3cggg1rm8p13lch5og2ur55tzqo49p5y02wtazy19tc87jl4mvvyfpttdbg6y0sd0altpzo7jwqgl5ht3fughhna46ht90hvfnw56ffwj6u',
                startTimeAt: '2020-07-29 17:54:37',
                direction: 'OUTBOUND',
                errorCategory: 'o58dhwjsbs5am61sbcmohc2qa16j76g0onale3fs7tr2kx0yo4yznppvc66dfn2dtadlt8e9w6h67zqka93gre0tx4c2pyjozepdm7u80ns4aphc8ho3iy5rmglljw8jomdegqar8y993ogq2qvqkcki56vsl1ao',
                errorCode: '1yxvicfp70xwmd26ibpvshfovx6ht4tc9kfxsi33h9a6did1qd',
                errorLabel: 375353,
                node: 7201818090,
                protocol: 'lxrq1d9efgmaubo143x1',
                qualityOfService: 'zeix44t4kbfdh6dsq8xg',
                receiverParty: 'dgxte2d26394cfqun8f9k0ewdntt02yvlretb9qvjx140u4yrwk4qlcag3e3v61dklfy5l8nyxqbj85kfd1h62qljo0z47wjqfxa0rvhz2ig6rc1umo9lv74akuh9ntj7ubqpcjdens2ri46zb4h5timgydcmh60',
                receiverComponent: 'vk5q5p1zcymzo3dzjlsfurfdv8ingaadbayhosmx7jmo7xk7sp0txmoijwvubqfvqv351pw7wl05jqu8qge7b8nhp2ce8bnyddqae85jxyoqay7ik2yhii9tbcgtwimyiz1824i59zhhvwydrbtndk5xhatcxgb8',
                receiverInterface: 'gqr94mug9pcw1gb7zz2qt8wnlt0fznmg1vj80hp4nniimbvc9wr3rta9z0vkyz5fhgqxiufdwbi503fg0tjj9vt9ring5lql67rmfa3calkjow533ilzh2dqhm963i8jsm6pid50rf73k2mi37gwvjz9eu5v3mz4',
                receiverInterfaceNamespace: 'r6hvyri2j1lgymh49mjyeopqo3772ydl4rq7by32zhklbn1piwhgv11ng240mu7or0c0bmnfd9bho5ht3g7j6lfigqek6eq0e25eh93rtxfbg8wlllxj9diu8yj1uzozvtzgivpcc2z4f8e4r629ajrp2cgg1xrs',
                retries: 4677887475,
                size: 9535022077,
                timesFailed: 4260148643,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'wj9wvpjk3glx6wa87iet3vtklpu96okg7lfe7nhz739u8s099f',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'dijy1g8gzc5phexr0z9c',
                scenario: 'bj2izgcw3dix35jqjy3nnrmz7df4ve6y8vuvh92dnc8ttwdano3cktaaj1ye',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:42:52',
                executionMonitoringStartAt: '2020-07-29 14:25:23',
                executionMonitoringEndAt: '2020-07-29 11:35:17',
                flowHash: '6dusbd2deqh6mvhilm1iaagwrg3ieacu5emkk1ev',
                flowParty: 'von4uen59xbtz4hlazmg4tvh8ljyzi3d2w9fhj6mfqqelxshmdptxyvne6xu6ho5wa44ijn89g7j6za1ey1ssway7pwh87ezzncrc3gn3ft56juc6d0elulwcol3b0tv0cbun2p6bmpxjdq1clumjlko5qtt0z2a',
                flowComponent: 'i8ayu5a8ubk37m4kq15qc9yzlesarhy17pnjgvlsq2iujtdsjdos7klpojhiz71vgk2b3hsbpezjdjr176zjlwccc9p1mmdb8ube63o694qifv28wt27423m7cq2ukucuccwoqfpgtyypili41drlz0kyyahn83v',
                flowInterfaceName: 'l704qccxd3w4x6xa4sjph1dxr318htnxi0cza6xj8n1zpc9bqf3cf51rbckzwwxavfj3z7m273dh8xilcz3nvca0naljfz82srj4cu6k3vmyz63bqrs0bvcilgls28iot6etn2e3p9f5unxkebpurchpdt20k6s2',
                flowInterfaceNamespace: '0ysj0hq3kaof8v4w4m808ewdci18jt5fxmn5yi2grmwtxvuqhb7anom9tnv4gicrct3j714m6h7qve0v37r63uvof672ptfzzpm05vs7ejd7tnzvki38l9v5otx1srrhs9pprkq5i0b7yhr2d56igtct7mrahqdv',
                status: 'WAITING',
                detail: 'Nulla nostrum porro quam delectus sit veritatis eligendi provident qui. Atque commodi nisi. Veniam mollitia ipsum natus quos est rerum voluptatibus. Dicta commodi ipsum cupiditate maxime.',
                example: '1sipsat6adat00wvmw85qlqfajw6wix1ku49k5omgpsijs0sm31cu6lzwzaby0dot3txjgwj9cdncaxdmr5pqf469tuja5blo8rmsym5kdf5os05g7hng5jbl6t8vqgz9u6etodo8rmc9sflnc5ughmv4rg7w802',
                startTimeAt: '2020-07-29 10:06:13',
                direction: 'OUTBOUND',
                errorCategory: '631lzduth3k8nuevjxwgzmm6srtev6pnnn6i6v822uq3fl5flzlz9s0y7jolifd94hub8t1w4w0l98axmk3epbuatc3dntf3wuk3je3cvbddz96vkychq61dpg2vbo0cfii4xzusuk19m4c6xiezaeuuk3dceyxk',
                errorCode: 'g827is7dk3h65lmectbobgqjzmma3rzhqxxc38lklaic8tjzt3',
                errorLabel: 625186,
                node: 1363314094,
                protocol: 'zasa054r8mati1mutm92',
                qualityOfService: '5cqai3n3svehpxvfaiy0',
                receiverParty: 'phmfrsydy1gmqd77qgst5ph40br1iz8zptwhwimavbsmef9xgy4nkn07ej4tflp16uiwq9iw665vq6qcx225fiyxjalaq985wd7tpyazs1d951p33rfnxg7jzspkmv4ig8zh15xjmzpxxut0x50sfyrrvihadhyz',
                receiverComponent: 'xil7idj777sov7sfg4cmq79fz5h7pyywfbllbfinn2du2o6mxev68p4s10la3edu2vo6hw2pve0m35l4s43nog6wri5a0sua87m8zmndh9c8dvd94tiewrkhtukljidxvtsn17r701we2jb04fx2j96jbo3ynt1y',
                receiverInterface: 'tyani2qlvixqrfdqoe8zbxbcot1nkjzmrx4stsc5iksy081wd9ofqeiiv1voyix65fjrbxcg0baj2yoakbwxm741lhy4277yt3mno8rtrntsxulr9wxg4lrem6avl0hty1y0709bromxrwfa3ovprkhxqra2s64r',
                receiverInterfaceNamespace: 'zgaeqhk101aorycu54gu19mzkxcf3vdvqkymav4jw9z4jdxkp8vy9hz5ai09w9zmx8jabalxtuwk0rrah77d7nbuty0qhycztschmb7nlva5sqspijdknfywzeblpcdrdwmfdrwpzhk9qdxz0adnpzkkrk0u5enz',
                retries: 9370493528,
                size: 8247290312,
                timesFailed: 8521043854,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '5avgtly7dhzrkzky7imn3n2wjmm4zsnphsu1z0gtw1gvszk3u6',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'zmxk2f3keq6stbnxyvpr',
                scenario: 't4u6k9jn5op53f0ere00gbreco3pmnl5beg8bdbrabmp2bjiknvvwmajzjcy',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:54:27',
                executionMonitoringStartAt: '2020-07-29 16:19:02',
                executionMonitoringEndAt: '2020-07-29 01:17:35',
                flowHash: 'cxsp5eiwxayy1cap01j3oljo2mmnck2nf4uhln7q',
                flowParty: 'owqccsvsh7vhydkgkfn1cd5nq2k2ocu41m0ghaor7fn0w0t80g7zt3x0dfqf8x0lfb8zs3faw7ykmvmftrwgxhkkoue3p6d4xc3tkiri7bwcxw8siebxwsco2sd46qu0kzsj9pu3mnam9t630mql7m6ovmxf90g4',
                flowComponent: 'nrthwh2qmy6r6lxr0eetrsxsxipf5esyvr36e0hyymz9v9tmflm44or6pazmn8vswf9c2184uquk8jm6f3buccfi6f8c8ilym12jqu91qrueymx40bx78z7dk1noxua23diswcswqe6bsu9waxa0bp6c51nzljc8',
                flowInterfaceName: 'bhdtvmzppo7mus6kp929em7bf1pbnnnjxwiswpkwqmzqu1wtczekdqt9b185p6l9nnvpezibqc2jotiez8a546rpy9q2ppx8g3au1iumzp7da1t4u6icdpnx1h6g9toihd3733m8fp3nk0q9hi4s08jrl2xvptlw',
                flowInterfaceNamespace: 'fqz0ul4l4j30dl8vjnwsujc34jvmnllzyfadbyxyqljmqycb9zig6nihix5jph4jl0kp9d7zufy3k18qbxbtnu4bfe9x98abvb6iyfryb7mbleeynve5s7y9zpm3vhrkf6rb7tvat6l8bqzd93tfad0xku03fwa9',
                status: 'ERROR',
                detail: 'Minus eos odio aut recusandae expedita. Itaque incidunt quas quaerat quia eius dolores est soluta in. Eligendi saepe repellendus ut enim repudiandae. Id voluptas provident rerum quia eum alias dolorem. Soluta deleniti architecto. Culpa aut quia suscipit dolorem.',
                example: 'yl5kvoap9zpxisejbw9f2yzuabiq9e06rkb3tc1wa74h9o0h4vrtzlaxwqxz8bzwzpxb3yc755mgrjnpn9l05zuokj1sm9jyd4m6sw4b22wp0w2284nayhz55bv1z80ui8g4t2cc2urdickmk532y34682392a5c',
                startTimeAt: '2020-07-29 07:57:53',
                direction: 'OUTBOUND',
                errorCategory: 'p8ztd05dz5st80i9r4d106mz72x6o00baze5yv1ubojuisg74z6n0lf33vqhv8jxyq2y97ttgdygxwp9o4hkr1frilofakx059bfp5sfipw3rmwkjllgyin6ygv4kmmof16n1ma08j7zm34gi0n00ibcfylzz2l0',
                errorCode: 'cy28czhpelu288p1m08uv0fpgg84gegt6x0uwqb0q7g80ckzsb',
                errorLabel: 296833,
                node: 9068030952,
                protocol: '5z7680l5uviqaisdwk0p',
                qualityOfService: 'obug7lek0vmdbpwlej26',
                receiverParty: 'v78jmjt3emqxt39i01fonwzx5ofi8j6tzfwtioonxv8r2uogtkdb3oeehlewbnx4qn4zg906eouqhwd7czdzwnjadj68bajdbz4mh9lp34l192j9xmsxmrmf7caj1dykjh0o8k31a2h0uj94pgmxtadpk6ha6zu3',
                receiverComponent: 'jyi2qoxwgtaugl2jvjj2c6b073ndo3mwf167c1v4c3n67aqw4mvfaplgpfu81b9mp7jlufg0r9yivgmdgl9906relewqv7cl3pjoedwa2gkbb3id73l7o986a4befj7sc958cvgelg827q5dh1usfgpb7my2ij90',
                receiverInterface: 'xieg50xvctud62chcoio90id54kcoptoua3gmbcu0hxpb2kbjfw24ycelz9e0o6g534f168yhv8u4ef3t40vpmikmxuhmomoed4xbuzmeo16xh08mo7kt5gat30s6kdzsob1rjbiefhk0768ea55l1uu0c3mqmw9',
                receiverInterfaceNamespace: '469qa56q8wmwdo6613raxrj0fo5gvuruv9qkt8j02glm9e7iy7oio59b7q6aqmz5bxm69ewtqxy1q0oykxum9yitmzk48zvt4lygr9n4pf72birdsifim0up07xe8v3pgva8evjax6nqaxrto067c6pszsj9bm1v',
                retries: 4499979880,
                size: 5691188946,
                timesFailed: 4143568007,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '3g0aybltbot3et8lpxtwexoowf83b8bkyya2u2066n0i0v985d',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'op1amkbb4rpq6iej5ha8',
                scenario: '7dnp43cke2z9f7to1ob9epq8izog2sl7e79nj9eexirhp0qdn0d3908sbqxy',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: null,
                executionExecutedAt: '2020-07-28 18:48:30',
                executionMonitoringStartAt: '2020-07-29 04:05:06',
                executionMonitoringEndAt: '2020-07-28 23:16:09',
                flowHash: 'g8aw2211a73nv5uze3dtwa37926j2plf6vsydc24',
                flowParty: 'mgortoffrhtvq3v7fj4wtf54jb5aechdlaazyc6kkz0yfzark3hzouwdhnok20fn1w8pebglvrlhsdqnl0hqxj9jyna9akzks0mlp01n7mex5d8mmi533o3f3ol55rr4o6mlrlgvlqx6m4m0mg4xd06ua7br4m9t',
                flowComponent: 'jba1jewbtt6ba35qu20wwis9c54cxbyyaplv1usnirvex7k20p28idpda6a2a4hl9eeqt8i57w83wt5mj7arrywz853npk7k4gze4an4xti6krfjyarnyyfeecm7oaw9piuxx2erj2ekzsmznxt84kjv0wy7ug5a',
                flowInterfaceName: 'ivfi7l2cfwlf4x38gau9ubl5bpviva8ms848yj3gl11ejo5sz3eoibgtwn2c83baqutebp4j6jg853mvbsmp3j4hxfo9ox60hvo2htsz89i6mit2i9wii7cjiitenrq4rm19oo6jz23eynli8f7p0zsqlj2o5djq',
                flowInterfaceNamespace: 'lid5ncff3y1gu9m9rdr2vvdf8uq77gtyzpszaj221i6z4h5ll6zcod7t9prbz6maayhsfxhdgy6qj114qq0l3q9q9zt2l90vbemxi639xw046da0zx2kqfaignnfckftqwrpgztu6d37a2pq7ujlfoc6v5ex99lj',
                status: 'ERROR',
                detail: 'Minus vitae ipsum ratione voluptatem aut voluptatem magnam rem culpa. Quibusdam voluptatum vel praesentium quia. Blanditiis quis voluptatem corporis aut at commodi. Inventore culpa vitae atque fuga rerum dolorem laboriosam aut et.',
                example: 'm7pxjm05s6u5c3pe910rzbyp2lbv20i4adqwbzyp7v1j918c5op6wqdt5on18wyraesyb97wzu3ro57fn9llulnumj4xj9y5sldkkqdfhbxbrh9720qzix1nuy9kou4l4yb1dwzpxxb2g3q7jfvb92zmqylvw8nb',
                startTimeAt: '2020-07-29 05:39:38',
                direction: 'INBOUND',
                errorCategory: '4zbih5wbpef4aitos475xi8024bccht3uwdcycoo46qhhfw4xr3q53qzi86unlokn0l9le9eb4hoci6wzvimtmjlkwnp62tf86i312tsqkrpoj2quypp6nlekn2zbqr7g6dpgesg67wsjbnbobd49sut1pzoiyxy',
                errorCode: '1pdbimv2sl8blw4yhio9t9xiix7uwo3k0bz7c5rwjgc1wej7su',
                errorLabel: 339490,
                node: 4696192546,
                protocol: 'wr164nrajzzxmbxt45qk',
                qualityOfService: 'dpz59qnzugbwg7iepjue',
                receiverParty: 'rlfpoqyr8csh2cct3h7rpncgnrrwh0b60j2j6vkspzaostbsmydxcidxse2906s04s3f2tqpxuc6gsfbt3qfn60rqch3opamusuinvgsk7d30ulg8sx9an56blhk2f775xg5vdopxivlzuzff2yp6aou2qerawd5',
                receiverComponent: 'sihc3vngq96grs15wjcngb5tfdwe79sddn3zyzylhdqw82a1g6at883yuf48hw13p69luci4aqrkks62ozxd6o7wut2gpwg3t3qlzd4mn8rfxi7gac31f72wqa3q2x7lyz992eslejayk5kth39nix45dtmvjzyz',
                receiverInterface: 'kj0rszgqfi2xg4dwa5kb04ngcvt4h3dhgfcka3j3el0jxb4wn3a36gabrt31q90s2w2icmf2fmhls9stt35cw14sgnz4kfnn705dvqo6trtnlk26d8ym5j5qd01up0ubd3i99de8ll2m9o9clfl0m2ywg8e5lypr',
                receiverInterfaceNamespace: 'gsiw2s2fj1d68sqhcrn15rmmg7deqgt7dzxd5qjfsgn6j8cgz5mtpj9xfk4mjw5sq944phgryra1z1o2t93hewwsberx713kr2duyogbjwpg0zk8r3udd9r1qs7obd4fx02p8uu2g1uqly2nruxvhw2hybnptblz',
                retries: 9198360676,
                size: 8227415374,
                timesFailed: 6039307122,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '3zpgfhlkv1c3eq8efprqrls8lztana3iaez7au56jrohgvxiqp',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'hzylkh9asv2mh4tv1x10',
                scenario: 'k516tgbzufr8zzeww7qh8n9017l2i7atljguqhkbwmfznuu4l5wj2zlqkirs',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                
                executionExecutedAt: '2020-07-29 09:07:53',
                executionMonitoringStartAt: '2020-07-29 06:40:40',
                executionMonitoringEndAt: '2020-07-29 00:14:21',
                flowHash: 'xkzw9bn9mup0ptjv8s42r1pw665rtm42qyyvwmh7',
                flowParty: 'afz62mk682yykgi53vinlvqcqf63j03ifadtfd889yf8xamasdxoevbx6xgd3i915974l64xca9a9xbwk7ll161cz1vwsljw8k3cerg3sybj5jusmxa9bnvsr4kdlpj528haalahdow1nhjihbspn3gfq8paabs3',
                flowComponent: '6t8sse6t8zjsod2hnrh7ajglye3wjatm5jv24r9kuhk8zbrj4cpxnqqeqfe1vhxw8rwigs8vfplolq85o9bk5kdngn3fex4hflc1fn42uqgxwfmfvg8w38mcfbuwf5utjyw9vjty8gfwnk9gxr64q3clpws0dcxh',
                flowInterfaceName: 'cfscd0h7tvdotozoeqf4gqewpqgtaajzhrsojyfs4xph3lp3evr5ek1b35u18sj8ltdzhqagjjsf2s9bc9y26p16sm0odtpzn8x20jv61hrc2na5r1i3oktxmsduomx09zqqt6m1xt7v40h7cmiwxnggu2dqcbzi',
                flowInterfaceNamespace: 'rw3hv2a0eme8vnyuipku0kqaxyhg73vz0uktn4max2io2s8jmnvkxfka5enugjjiwj5xac25cxib2r9c6h2ku5n1dg20mn259fiv93wmq0v9jjfpd2p7lphwio0anoj6slwbmd8ekczuvyq0dwnjm7etnojnqayx',
                status: 'WAITING',
                detail: 'Quam ut ullam. Ratione perferendis et laudantium. Quo quia et rerum nam quasi delectus amet molestiae. Consectetur sunt odit iure voluptates praesentium enim adipisci sint ea. Quidem aut quam sed. Culpa itaque occaecati distinctio rerum blanditiis fugit ex voluptatum aperiam.',
                example: 'qpnlklcggnge4ya4qzs25cjv5zv2w43gwthe7f1kjz4zxuow1todf8rlr2jlvkrdx0yaufm3vgmhlobbe7cfeepw6g5ux8zj21g1gxsi1dlclsie6e8lbw9eqdxnqngkch63ucsvmrntjj3a649k4mngz1cqr349',
                startTimeAt: '2020-07-29 16:31:11',
                direction: 'OUTBOUND',
                errorCategory: 'qs2ql28bb3nwdmy22ox34h94bnt7sux43zvz2z1us4kctilmkkukax64igoq9xejvirjgp6y9vnpr1d66jjt1szdfj5ev02ub0dvlk6luqg5whdwoto9ws3hy8gobi94urti8d9fzhk7z4y0irsrx03rpjiv0iff',
                errorCode: 'e0a1k7i2t662ztqzwvmy3zpccg1iarlp02sb15jbrdldt1daxm',
                errorLabel: 579009,
                node: 2118132146,
                protocol: '5ykn4rorgq9orxen0g8c',
                qualityOfService: 'k8cg2zg9jfhc27tpw0kb',
                receiverParty: '60asavtmtqu126d5cdmq6aotrx5v59b8t67aomqw3nf0g8c4e6svlqh866j0ttoqscr5ol2kl5zke0404g8wki0kvl0qeqr7g9jp1bwv2tkfd47zgvd9armjm831gfbc10txnbz6pf6qw2sto5s49zhtooi3d0sj',
                receiverComponent: 's5u4h6aq85pvdu88l4mhjqq3ziipb54huf0per45d17x8845zveu7qsrp4okpkg8fg284vqqe8m9ys3dukp8p43qsimhdrhw9w1c18s8sd5lurlu368s18e7zusdbq70p16l7pstmu1dj9rpbqjhxwmb54qn53u7',
                receiverInterface: '31hapjft5j7a90drjqeupw8pt34morh9o4jy16p6pxgd4zkpaf79zbikgjizugdcqhy03d5zsxm7q3my4h2gf4yfxyhp2vbk6mn2o78j414hicl1y8dbqkqkna6z1yaozwo81c0an2v88ydr4ajbdgeorid7ngn3',
                receiverInterfaceNamespace: '8me92jzt74wx08f7c154eu2d7kcns41pgw25gm7ywrkkooxfrx90xnh1q0symrsxqmwh7lee4isyndnxzfb5w38pi0h7863a0e7ejf1nsczo3ea5f4uovji1h4hwvyf0t6x5bunitfjhs2x3ysv74jtex5tv16ed',
                retries: 5238641191,
                size: 5038509935,
                timesFailed: 3096127242,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'jjw623he9sqzzvrrc80z2hjavo5u4iw2kvuwb7buhsobfb2zfe',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'p6374qoivikxto7a3p76',
                scenario: 'lk5r9zhc7wffuzfx11co7e01h5eh3vy5pbitw9r017quxoqk61bm6a7euml8',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 01:03:55',
                executionMonitoringEndAt: '2020-07-28 20:50:31',
                flowHash: 't8hi029vwewdzvba7884pv70zurcndcgi3tcod3h',
                flowParty: 'bkqjwd379tb2fxgo981sz492bmj65nj3t3qr2g5szqjrnh3zd8kj25yz8ou5uksxfum5n96otrduhwijg1h0xbeok2l7lixi8tdr13pack4wd8821u0gxjm3k7yr18se6vbx1py2tybylfckex61g936rbaxdjve',
                flowComponent: 'r9zh7uds3sh9k8i7mr62g656vd934c7p1g8mu7rvz9kkfrdpj0w3rix7vure7lyrtj254qs1tsyx7ixgdic8aht4cm9cs4iz52tztksbi49jfs7gof4ggczcuaeqobv9hii5r0zwewg5lnac3mf3cm8cvuy1d86o',
                flowInterfaceName: 'sx9l3igi3117y5uy20amxcohum8cn6d7mdgjedm0uev60po99vhl13bjtic2axl7lcgyo8284avzio7efhremsl5z1hpuazjw0gmtoy71l02av4s1u7xdmd4bi71hk0ievr5p35ovcnvaejaoe3cyl95rx54jh01',
                flowInterfaceNamespace: 'nkmwls9ah2wjds0675rf4w2bbsgipmdpkwfyidcocrnmhxufttar1gmpps3jp2z9ai8x06ldb8u2k1uhst8it3dp37bhfvo195e9ysx6zlbfg4ifmhxrhoc91gww6vrxrh3ffeh9i9yygejimvrnqnuy26d05b8q',
                status: 'CANCELLED',
                detail: 'Est qui delectus commodi ex. Cum rerum soluta placeat in. Magni non tenetur aut reiciendis sunt hic eos. Consequatur natus eligendi autem unde minus suscipit. Animi earum id reiciendis possimus sapiente porro quidem numquam praesentium.',
                example: '2sn4ahet1g3tnbelph584redadqlkfprcslycbljl6f2jll4n7ve7y5ghl4bppm9o21jeihnrw96rr26ifow519apahauxzmcnq3c5ll32gntyhh42cvi60ktavzn2tm8uzlfcmg41p8bkp9wiftdng3peyt5nf3',
                startTimeAt: '2020-07-29 03:37:47',
                direction: 'OUTBOUND',
                errorCategory: 'jkm9h2y3dglzirxjk2wx5v47cuyzgph9ztti6jionmmqhqvmlpe01db6f5y1zri2w8gr8uix1uwcdhc77dvalmdfokwob609wll92rq8jv0xavkprhgp4vwio9w8ds2oaguyaioexc04vben9coqq8904sgwns4a',
                errorCode: '5eipzdf3c8zitticl214iscivrhroj8q34c27qtq2x2kb32edn',
                errorLabel: 724502,
                node: 7599443959,
                protocol: 'jzegtsrocpcu9exk7aej',
                qualityOfService: '7rp0q2kemr8qn00wh8aa',
                receiverParty: 'xbxnmr3wmk2dtxlnjla15p2xldha2qv1hg2k4al8gn46dubq3jsmfk3fzrjnpyfwixo4p5ln6r2zbfk8fc8fzsah6344zjq8bdgvef5qtv98x7iiynf117j2zme71j1tmsmlznec9mh2ist2m6mb19gsj1j5xh2t',
                receiverComponent: '4c58qivmtk0hxvvtdq2he5vd8kzkqwsulhavfz85c6p56ha4fxxqbshm5f2khm670dvarvvngir2zd4vg4fmv6gyfhzepw0im81yjs3dbf8e5x58no41rkpvtsos9vmj0djbfuyaulk2fbxng84c9tkzacnb2sgx',
                receiverInterface: 'eokqt4p764yjgtao3zjme2in19ru7kojsi87abuept23citoxp4vu2qdxxu147d6k1q5lyl2akqr7ldotd1h9st5gkzzpb68xojb8ttodl90yr2n3zrsyl2g3av1o41u84cvkatb3pjshall76u57mpx9axygd99',
                receiverInterfaceNamespace: 'cgtztuahz178ransh3ysi10xiy882tm72dz060er7691fwqvhrebb0ywqqwicf201cu48stprp02lbtpfhnrnjnokpcf20r7duqyd71m8ak68953dv0rv7zxto8223vdp20dd6g0ses9ipkyllnmkbzji840m4p3',
                retries: 8076392396,
                size: 6236723314,
                timesFailed: 3999091662,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'hn7vos6ph1qqg1beravvueqdbuz9ijvy6do3ognpp0m26v2jdg',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'o3jtxsyux5hrv109qyxk',
                scenario: 'ratyp619x6u166bap2rheft96n1zpd0o8kpkx04o8dpx82ifcujoan6guowz',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-29 03:19:04',
                executionMonitoringEndAt: '2020-07-29 18:06:52',
                flowHash: 'vpjzfhhx58uuh41ncz32596xzgkkc7aafk5mxct5',
                flowParty: 'o0lrdcl8odorgri9pt2htxsd09sktj9ukohh1g1gktk2l6geoxwsbx1a1n7bcyh9m88nt70czvyg1ragk86kv83dqgihihdwgyk5q6dd3bzb7250tnjbc9gd5f1981tn9jclwenmbkntg8gay7q5yin8p8rj2lnh',
                flowComponent: 'fsevxtkd8gt8bi5mylw2mjn2c2krwmmeq89jd6njv5f30tc2bqpxeq4wyl00fdbt1psmncszy74dyt5c677kzql6w8ofpe1lwv2qfsilaqq0r86ly9wxkqs1ve8jhl6kok7hakg51lkojp8svq4b8azoulzfuwgr',
                flowInterfaceName: '3f9pnj3kscxz874f6b1gte4j9972dudr0rtq8zza5a5jiq5qb5ix0wfuen3ow5qv8gssqmhjcukbs3q2vtsvtvgw06v496eduy7mdds8tt2ej34ecf1wpfxl5xmp0bgyf3oc03mayfjqjr7yydo8xxiae6jegwun',
                flowInterfaceNamespace: 'l7qxqmq7ruqq76pecvkpqu6gwsdj8xh8xtn9e7mwn993qqnlc276ab6j2fw41ikpgkes6duvi6r00kmg88qr0i72emor33kk7oxml2787pvjqce5jk0h4mg1dsbln8fw7zutp49riifuyvsemta2l8eaz6okrbaj',
                status: 'WAITING',
                detail: 'Vitae nostrum mollitia neque at. Sed est maiores quasi corporis non deserunt nulla. Nesciunt sed voluptatum excepturi maxime. Maxime magnam est eum autem fuga. Error et alias necessitatibus enim neque libero voluptates. Quis dolorum maxime dolorum nostrum sit consequatur ex.',
                example: '0w2vcpwg55joam87sg5e1se0uxdasxy78g4zsfye5qerwoq9ui877tqs1mgsykkfvhaaez1xfpq831kk1k86pw1mvvzzmpe0uwaohr7wppioqvoozbvgka86bg9ncg2s5mlzf3g53ympwj3y67w8d9e25t4q2lfg',
                startTimeAt: '2020-07-29 13:57:15',
                direction: 'INBOUND',
                errorCategory: '3wj9vhgtrbzol14cfiuqbz03r9u44u1aa2w2s63j5an710tvego2o2hjqz3xu5qeypnkxuhd9agszzdbzhiwp25nrn0lfr0es1f3rhmoxskt2gyf13j5mckizkuhw4gfy88ck4twvbuz94dq0qp59m97xh9utg3h',
                errorCode: 'w2j5yg5hhkn43r5xrcbyuuqsixir9yjsaqyo3n0r7253bnusff',
                errorLabel: 329595,
                node: 8798666600,
                protocol: 'xmatcpg69fw5my4ulfrx',
                qualityOfService: 'neak34ddbp5dak1liuoe',
                receiverParty: 'ovxqinu6xtrqp3x2v0cpct5s23e5gkv7z7mpsg61dygwzl74e7jvzli8idsyo21gwlr2yv42vrk0xw4wz46bxsmsyula76zfcrpglnm6d7csn9wv1pflf0mks4292bk688k8dflrlw348vqflztluc2htxqo1bbh',
                receiverComponent: 'p6trj7i7mqp6xbup04oh38pvzxb6vdkk1iwh3yjswzuedkvza0mx5iwnlamh7dwp6ei8cnpbyrn2bv6tkg4clzujjapj3k2qcnaxkzxcatlv26u9yd30kyvmr30fyehf4enxx7gft037jom3hfpkscjmjyrudg5f',
                receiverInterface: '89sek1ufmrgojutsy9w7ntgzoqtdvh7id086aisldb5k1ka11r7q1334ld51q57plzge1c41108owtpapqib07zmjs8zrsdu8iss9usyuchnmrxdxm8xywrzqzb1d8q0grpifga9smyxt6yi1dcvyh4yhtqkmqkm',
                receiverInterfaceNamespace: 'ylrfiuh6eqabq74en2qqiu41k0sdcoi7ljju673jr6106zd2m1n9ok3xxfvxav5795yz95itycal012njknuot9bb2icwh0ttugowtcibvei17eb76nxttammuvbuvq89ntrxqbgrncnwjvtc87nqdk4s4nkroj4',
                retries: 2029045053,
                size: 3443648538,
                timesFailed: 6317650830,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'k3ysylgk7h3ropq2hbv3a2eaqqt51x7tn9glr6b25km5zr4age',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'hcl7jvduu9pabxh0lnqt',
                scenario: '7mvv4jxxlf9n8exdyaitjetk26vuhgoqojf9q20oge6syoqup8b8hvsmjguw',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:18:09',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 14:09:03',
                flowHash: '3bigvsvqrttr49zqvgo241ickx0tlnxnnwqrk6g8',
                flowParty: '6ocb3wpiqipo4tw5u7jn5mv6l2wuvigt42kpfupcf89sr96czihho3b2qh3e6ryar3qtl0qrjub35sahak4391qugtenf4ci2mpq8wgm6ypuqb58vduiin3bay4vzkydwwx5vqi9per2nh38521h2rg2obi1848q',
                flowComponent: 'i07wlbl7dbgn7dqklqzvttnpanns10qtur41shpsn2px59unrv78fd0hflh65gmll04lu3cc7341gzgg93c71a8gpjyxpldi2kn7haoighb1sf2ao0tpckkoj1gdsus7m9n40m0a91ms2eewmcbtod1mv76xktzv',
                flowInterfaceName: 'y2leu5chy4771zbzf2yl07xxh12dq9wf9o0q434jth0930sqwr8qpbz9crkrn78n8rsyryl5apbrkvme2eiobfw17ncxanrriq4iuf0930wcy8jmpbe7mkh6zyqx834eggzoxbdeug43rjm3klg23aivyzq8e6vf',
                flowInterfaceNamespace: '2in169k38lp577bfoe2witwzjwohdvqscqdz3a4lryd5va37y2vp18rdk7d2e82317malrvddc0dih760nxzflkk4rx4syp0x998ytmjyxqv5hdmw4mupu0gbosvl1w4ug2pxuczl6wn0ya1ho5ouk5cyn0xtojj',
                status: 'TO_BE_DELIVERED',
                detail: 'Assumenda quis ut dolor ea perferendis repellendus officiis beatae. Et labore ratione tempora. Eveniet maiores tempora. Unde necessitatibus cum quos in sequi.',
                example: 'o7su6k183r937fbpp3lsdlqe66ex1gnnc9b7k21mabnmn8g2r5prybti11595h5g2anvmnvpngbkfeee3jdfd31j9or8dtsgq5lduh9itqem33y1k5kddb4r6ur1r80zt70rvvkshc3ievtzlht6ses1ebotemtl',
                startTimeAt: '2020-07-29 13:05:51',
                direction: 'INBOUND',
                errorCategory: 'ewlmn7tss3mung9vksjk4pf443ekqa4wsvi86e84xdbz8p2erjh1jgobsxe9fkpsrccdraalvru16fov61d8tgxoszjrrfeb98wgzgv1m6trttvk4uloybocisyd8nd0iumlsxmnv3pugxzg6qyakvbjg41crh8h',
                errorCode: 'ptwse7ruk6doe9je2oun0bzdlq9r5lcogql4wpe4rvujnkzdu6',
                errorLabel: 971925,
                node: 7211431154,
                protocol: 'f95bdol6wjifjc0hq9up',
                qualityOfService: 'ykk4cklbzgj27hk8enxq',
                receiverParty: 's9my8r9fio55ewehzollp8lqk1orxz25sovenz06kel3q7vk5r8pnwhi77mo9su1wj520u9w71mwy5ahk7nu9g8tf48k928bpiajkikw373c4dhoq51bjwtxw7g0nl33w8ib68xmb06s5xkhymjqruwscn70fyuz',
                receiverComponent: 'rfjkkun6piy2rpmlaysspb9qy0ar2zbyhbuqh156f05yd66xir1hghf0ayv1u0vzpd2dmwaybng6qmatlxtdd931xxnttz4hetyhkxacuwj0ayschost4joo8akv396qn28cbthqt7rq9xgzsgxhhk12tj3yrn3b',
                receiverInterface: 'biotzpok6y2m68mn8sb2qbacu78wjwbptu3or7xemx0nnw95ff4od5yxehi7lk21xgrfinvhw7sfux7wl16ixxi6tdjaertxss55l3i1qf4vzfoong0oj1l1xc2t8xalvwhv0fdako270ahk0yw64n7305xlt5k5',
                receiverInterfaceNamespace: 'gf12gfelkf0gvvpgtjxvfohnl8bnlz5e7r6onow21vbfin70pcknwprq7pt0d3ebhrkgrbdl4ewzlwpaq8hkpl3cjv9pjch7ztzzati4u6ghgf095ocne5eg4hgxczbzs974z1cf7vcra3oehzjb04rad49xw2gs',
                retries: 8541296310,
                size: 8655749529,
                timesFailed: 2521257678,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '5ohhwsloo8b2lrhtb79y40i9o67d2upbawkn975i8yxpne41e5',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '1u18fs9lair7pg73mdi5',
                scenario: '8pp1g856hd99v4kv0hiqo64okmxe6cyzqxgcxhi81xamtg5jf8kuq4ktwgzs',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:46:39',
                
                executionMonitoringEndAt: '2020-07-28 20:35:52',
                flowHash: '1fjyjg97id82f49xkhtq69fjifu3biqtappz904x',
                flowParty: 'fhd8mswfrwkd79qv845aw2jov7uux4pnj0zy6ftc6r29x534ml7d6g9wcdu2kzws08nejuc9q1peezhxlpcplybx3typc1yjhjg62aiq5kma7whwq53gemwbdb151b7hbb45vzxk7qo9e4d5hu9ddzp8b28sgyda',
                flowComponent: 'mgb8nbfhxxa62cc9n40tbx83skuelyn3ta0c2pubfcgta12yqp3xto8qm5b2qou4695oz7g8u9w85nky315bnw762yr715bmvu0qxtj1x03tem3zosctlkxf2ra7lfdy0r92u4whoty60mgo3d87owzzcwgop9fn',
                flowInterfaceName: '2heasai3tye6xckxsdpukq11trbz8am2rbrual2twi9sz88t02sn8kl5mmcv1m401hzmelf2r0forjhqvb5di2vnpgimjsrl5idsxkudn0rjz69f5u4wmi0l9cccxk7xcmmzrdgtfx9glp46upcyhk07uagml4rc',
                flowInterfaceNamespace: 'c3t36rssucq4tymwj6i1iyj9eslo4ae6gng7w27unqfb1luw2f5wh47jm5xq64a6taz0hlon5t7y5x8yl26em0js75ks8tg0vkek4rp3rws0epom7n6cltc4962b26cvektg5ekocomes3ju73dfnx773613vf44',
                status: 'SUCCESS',
                detail: 'Porro sit ut facere nostrum. Earum animi sed minima et molestiae illo at non sequi. Atque dolorem exercitationem architecto omnis doloremque dicta quam vitae. Quibusdam accusantium quos rerum. Sint optio recusandae rerum suscipit sequi laborum occaecati.',
                example: 'jcl3l8c5jti768efip8f6vy949cqebzloltn00lrod3cl30v726mb2icdwiolo2d9j5jizmtidqq8zmgchpu64ee0fo35vo8gz6ejsxv9dydjziqzhcolwdb9ntlmpnzpbmabh9389z260xo80lkv9vcrwl8f9qh',
                startTimeAt: '2020-07-29 08:23:03',
                direction: 'OUTBOUND',
                errorCategory: 'b4vdtx5x1xmi8m5luqxgibl2l1w54yyajuocdx1r4k2jbv8reaptegtcrutuo3a6jols12awyfi42vfwn64m6gbfolx45utjgucivdr8jgabx85kz6vurvur8h241j095wjr8snjmx97uxls6nzxsvnz4akqeid2',
                errorCode: 'ytpch7cccpdpyijiz0uvsushf5z76zvb7e7z22zxypzfww4jrm',
                errorLabel: 746404,
                node: 3669887464,
                protocol: '4corjf9khlrqo3pxss4v',
                qualityOfService: 'uoouetx132ou36qulnvh',
                receiverParty: '8gpoaayj2vxmvh65kfyqn7kwo9cj99xl8tlvwkwsdi0ktfa5rdgfv23a1istcx0eee5jgdpg657t8xav3pfhpotmsxg7ay13uw0jbkm16cw4dnhsw6yxp27orttr8posx6qw27vm7ogyw48pkgfy266s3h0dgics',
                receiverComponent: 'rqxjtbfdwvl8mjg2wi1gupy5oysbhiz25zb2xl2z11cmtztr48cc3rixzj5srb2ilyx03qhm2j7l4n02el1h36hjmwyeby078mtzy6xzdsj85i6ooxtd8c9cze4a5hnmd4os7wza8xk8zz1x3ejc9xoqk96g6n7i',
                receiverInterface: 'ainu8vo8ts29y7nlhakuovba2j03edbdew39nidm78hrukig9fa2t4c5waac405g83tgjmyg6si1alxhq1f6zkdhfqn2xygc27qe7ywrq5qcb2ievv5tnip7hoqud8hj6c33xlpjrntwrmckv20yoat2kerdld33',
                receiverInterfaceNamespace: 'zews012pkpl23dcsyv1zeng8jt0y0u1d5fupaej1ozexrf660vt1gm36dqvc1ydz3q556ovaymmyqfd6lc197ultaik8kp4zmadlev7m82sykfbt5pcv6du1ksslv3oyj45z5hzv00bvfzprf1wz219x5q2jcnbi',
                retries: 7235430326,
                size: 8835564169,
                timesFailed: 7377241455,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'jlmkje9fwofetni47m25lqxgitcdok9xciyaroc67f4kgz4m1e',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'j12s5ijw8r2xpaqrd38s',
                scenario: '6q3hrpobbx90eo9ugcsvs6qelzl60wj23jl4fdjjhicrjptwcbmhuc4d9lye',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:11:05',
                executionMonitoringStartAt: '2020-07-29 01:12:47',
                executionMonitoringEndAt: null,
                flowHash: '298j7rp97c44txbccocu80hc4lufpmufvdouyf3u',
                flowParty: '3dtmdxbb0rwzy0adr4u1d4qixz8z9z12o4be8zsn60lqo4q7shm0u2atp2fe0j7gr7j6a7sksf0lrkvvy9mg1ry2oy5ti6engq4k2ianc7igxl7ac66cuu7eyyqm24o8nhmqpuepcdffidrle65d6v9qyoa6fmhj',
                flowComponent: 'kpts07k97eila0yrgcn45iwvr3ilmwi3bz5tpqkspfjgz4sgdstqjs7fj9pjcldh689e968jw62t8hajdzoj45eds77ahbw2bc8tguixm3ulwhncl8wbh82yl74f11brhfmln0gw1gwzsjvm1sh18425b84i55lr',
                flowInterfaceName: '4yf7pbrhfajb8lu6j50zdqvc9l9mt9k87uws8qlinyyff4tb6gqogclzywrj9v8i6q0j2chxoc7wcqaamjzlucb5chl2ogurgvk16ns9oej2nj896stf09zzmk6xjngkqh38syvz6frz7qj4u8i9l5jt2kef59d8',
                flowInterfaceNamespace: 'c7cb7kyzbpxhj6nh2qnlia5nx5u4g0jzotjoc6of962xb55drwne0gs96nayyhygwqke4dpb10cs9jszv03t7oru8cm7w1azm0wild9sx1beukmn8mxyyw7cqjc888mzix0yl5ot0bj48m13cuwmp9igcjmlt703',
                status: 'WAITING',
                detail: 'Recusandae similique esse qui iusto eius quaerat accusantium. Qui aut incidunt nesciunt delectus asperiores et autem. Reiciendis corrupti voluptate rem expedita beatae alias. Velit unde aut enim earum facere. Sunt quia officiis ut optio neque. Est cumque architecto et eaque quos eum dolore sint.',
                example: 'nqax77i3x1v63k177lwg14p04w9e7yr0q2gjy0lp0d5duuaqgps9ca9hfz7x4b3pv4w6pudaikwvqgt5mgd06swqpf6jut7uhbsh4ndenvow02ft7dst10tn7icuphteglnhwddasmbulojtuxawn5utp3xezx7s',
                startTimeAt: '2020-07-29 15:58:22',
                direction: 'INBOUND',
                errorCategory: 'g4lozzirfp69mc1mgeygvvedc0syaqzi1l7ujtx3d0kb2tyiliwiuv4yjp7upr5rccz9tuiu6ka8vi1a4dm5bx3312b0zxmxqet3ezytfovouxo78gplvkfntzo3khv6hekm7ozl85375tz5m24r48f7phc4ppxz',
                errorCode: 'n8cczgebq1jvb6upsxm8yudbrku9mmtrerj3zjzko8a4qvhmiu',
                errorLabel: 867492,
                node: 9720623346,
                protocol: 'uzoiqej1ad09imh0m6xc',
                qualityOfService: 'gq50ri288sv1net73ju4',
                receiverParty: '5vgq0dpayutkd4poo1akyr9r7bn3p3btiqfokn3vlj527pqew2r9x4zoxqldv7gtpyvl2kj8ustxvo08bsdmxgp5hqr6svztq6ralbuqpa7kj70kvfbdvlxg7trivabbrrgjb6u5c0m26ur9aauw5jvkzutf1dcp',
                receiverComponent: '52f8txjekfc9cxqs1ulzcxupshjd08438trw3g5kwtlan6oiijxkwo6xc61b54zn7ovkk3786gnr8b28t1ob94x8j0ccjdl1ht9zvrtz3r3p7hsbz1p69ubcb71f8op1c4n4t0g7rd8tl5hryoveqnda4s2xvqel',
                receiverInterface: 'hbaluaryj31nymbrpkejq3x414tp71zhbcane6461c0goyq9rcfniy4btbhakbc35owj33y9insy8mglxb8p5av64eiwzfny7xeiyfkfv0kfwt6xdse0t4dnbza9h0vij56ysiq6s2nxctggg53b9jp8u3j5z16i',
                receiverInterfaceNamespace: '14is312ci3jhqv9sv274wtwgwk42aa80junjx9q0jh364vb326a3upe2e2kj31y1jrvzrlecvu1un7hhtxj929ax9kjfs218bbrihclostekdt2arumwkl3kzfn3pmmhwn6c4w0s0hixm676dvy1vgqbl2f63w10',
                retries: 9477740458,
                size: 8058331467,
                timesFailed: 1071411383,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'f8d01zv7u6sl6yy4rtv21v0vyiyud3jrshw7ktpw13mdhal0ly',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'xewsm5lf7nxz0mb66bt4',
                scenario: 'fz7p9ukivh2j9wsedltoges1xsjtn5aisayhzzoqhgbvvgo2p1zjq9rz440f',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:29:43',
                executionMonitoringStartAt: '2020-07-29 07:57:34',
                
                flowHash: 'bdvnqb8deqw6yh438yhb4mxvlvjuhmuak2ha3jtr',
                flowParty: 'uzahpxq0cw24bf16rkvhjh4mif5i5zgk4ebahf4k0tczzjtw3gscm3xobs9ivhlk690cp9jfb0ozanqxrwyitzq6d7dah5z54u6kst71padpeq6gc1caqt3gh6sgj5fb0k0vv29tpc9wngjl9xavgj15yfjox05x',
                flowComponent: '88vqtfkz3ul30ijsox33ydezdyt9fb57066f20dc2et87inkmlovu5s9s9qqe5ujl9hzhoou2k6z3ums9aycwwdhwrlcawgq6jh1hn2cb61y0rcld3y8r9424xskvb163gvyir0a3lwnq7djq59wbfbwz80rl4r0',
                flowInterfaceName: 'ictndaqy39dakrnu9q4fdynmp8xozd5ughg4sgxv6hn28dn5gl6txnbsrrdtp1yw9x13y717pim8jzla38r365cig03e8hkcqi6ufeodm9594aituwo27tpf1kmo20ifqfb2lqsx1k53nr151rzulr7snvz9yvbm',
                flowInterfaceNamespace: 'tgzgpyd3zjsfgij95j0mzkxw7u492b8rt6ah9xt0h9s2rec03jh7bzapyy1d3a3kvcrpleqisq20laryx2c2znszsajrwhebyhnais8pz10lsk93noyyszezylmzql773sowxxyzkhp60v99lh0mmb395h501xmm',
                status: 'TO_BE_DELIVERED',
                detail: 'Quo facilis vitae. Qui minima rem enim numquam ea et. Voluptatem nulla eaque officiis accusamus. Vel totam necessitatibus a dolor ut et aut.',
                example: '8ovfq6z2qb529bm3jp2yigxbi340ja7lumv3m02ks37ku92mu8qqm0hja87nnfkr5yc5pfmkq6t0v09uokz8q6nx8zqkmgk5g5czefw3b1ccfm4snkednw47glj4ovxc7hijcbuucdaso3bp8ratsi1pr24lb571',
                startTimeAt: '2020-07-29 05:01:08',
                direction: 'OUTBOUND',
                errorCategory: '1wr4zoaxmdqnhgout68cc3mc7us6ff8j047pnzlxfoqrzk14oqxu22xjsvovfss521q0lzeor7l8bs1o2tafn3i5762iymv5g0efkzu0aiaypie4zvx852e3xlcaxnuuht2ha0k8i7w9w1i19rnn3dvmerxwklnq',
                errorCode: 'zw6u6i978ro05of0d4hkze2xsn9959chayivemt6njtedo887r',
                errorLabel: 853106,
                node: 1278398324,
                protocol: 'fjvryu47iz1r19uwknej',
                qualityOfService: 'bvndci3iccje7yjsxb0u',
                receiverParty: 'hi2kdev7ej7kr3qcps6qv5p0z5tr1zcbs18sdzr3y3m3gb3siqtbu82dvgx37h4h6hd2xdefhq0epphub5am65zd8bvzzqwk3rxtits9081yj7m0k3w43a12uqjiuemjz9amwoq7k9ztsm3jkgkyj239a0n82bxx',
                receiverComponent: '8rle93qfuclw5a6lcv21njyh94nbs1uiwiak9f8lyw9lxqy2zq599jmd16svd1nb7994qjafh8d0768zkyx1d7vako7qfwv6jztpkzv6ks2sxl4ys5i7lr7998sbpuvgr06phc0ptiqjzw5atkvbb47nqbh6qur5',
                receiverInterface: '2lsbncrbu4gum5ohxlpauxgdptac4cab58on3vmczomwr6u4xzws536vh0o076m1mvm8ycdlt2pt4h7hgmbqazvsfwy3sg75ur12kcv9h4n1sc0gdymtejtm2yp6cv4yk2rystawpo4j8v5176ulxaucz4ogbewu',
                receiverInterfaceNamespace: 's4fhz0tt6oyi2h5jvl0xwt62ij209kgubjrg0zrlm8y2tvgzf34c68pw7mz5g3fhz32ibh65uaq5kadl9xi0664jw6fycanckrth7z62t8qesmedgx8xuuugrl88pk22hv8qeu1mvijvrdzkvoy79kvp2sooq6uf',
                retries: 7084801958,
                size: 6897504981,
                timesFailed: 5664953232,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'f5pod9hf5myyqbtikthfndanc0jj9pxho67r6vesq43jcgrkon',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'ftioh552srhrm8m6f6zn',
                scenario: '24btbgv60v6mda1pkop248rfb9l0m33qogykzcl7wjdcxmstcxr80wgdfpyc',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:13:34',
                executionMonitoringStartAt: '2020-07-29 03:35:25',
                executionMonitoringEndAt: '2020-07-28 20:22:00',
                flowHash: null,
                flowParty: 'm0dso2t3sfeo5ijhfzx576365clqvlr9nk2jx2o5sa3wd3w6n8budhw3i1chnlt2bqlzhbq2f7vjwa5ebi7mkdm4clxt17d4fllxstuoxp43cd8a07dfvn1998ufld8m1invjod4dkxm706pa5g2fjb54mbtsq4e',
                flowComponent: 'hz4r2tt00yvglxqvwf7wdszktbjkwtfaxoheximurwnsf0k6s6io76rvlivzp4y8u73bzr749wdn8uyk5erjjmvu9q1wd2bsgndhcn4qklv07m21f4js3byl2puip3dvwjfg4rofwzuao73hkh0g3ts3ldbkw5sv',
                flowInterfaceName: '9elxbg3h64nlnwka0o2finufdn4wh3vbbg5hwt0nsqfsgdj664nl2exqe4hxmao7nrx34uvn5bkuovcrnh1miav2gywmxuqfrd871luw6ululse7sd3vz125ouc6fngxpzkhb2atmpxa5d2pevn6plzvtv97l74d',
                flowInterfaceNamespace: 'uwq2j2iu92427jleejdjnvy38dulhv6gjxhrreippnjem00eqrm225xcjj2vvizs2uv1o78gsxs5qfpx4x2wlkzx9n0ir01dsqpngckexxpr28wot4qhovwpea0kgrm58alq2d3djl5t34ftkt0gmj7ekk65s9w8',
                status: 'TO_BE_DELIVERED',
                detail: 'Officiis velit iste a facilis ipsa voluptas quisquam. Eum corrupti ut cum aut rerum. Consequatur sint mollitia voluptatum nobis earum impedit deserunt. Assumenda inventore dicta quia ullam ut nesciunt adipisci doloribus. Quam maxime ullam fugit inventore vel.',
                example: 'ihi7gqln9bb8rtcaw59qud1dcsvw7ly3tzvkjrkf6r1lqis6htap3c5ex1wug5x6e9rhpqdho50el3xh5hg80bd20exf7nbeje393g6w2n0xva7el1ynotw0wz2d31bpspzsvh7zdm4fu3tlxg3fl1e60drc84at',
                startTimeAt: '2020-07-29 09:08:30',
                direction: 'INBOUND',
                errorCategory: 'yawsufcqxrsasavahnax4xcls6fm6jdipgi8eusgl88p2wd0nxei72lrbiudjfau68u7iae004kyoj4m2yeruet3976gxhns3kvtwwadbe7a4nod93jpjrpw8q0mpovlro0jwh10y4b9s2cikie0p1jsy134y62w',
                errorCode: 'ugurohidcze8riwsavc0tifuft220ab49jpnyr3880tl39u2ne',
                errorLabel: 713334,
                node: 3537857030,
                protocol: '13gbz9n002ipp2wt5jif',
                qualityOfService: '0bz6yiv4kc8jcdlt8fth',
                receiverParty: '1br4xhwqo6j4l5o25ku6cec6jr9cqnne0t4jn9sbpyn4d2pu8itvdbna4kh3um7syg2giqj9wu20vrqy6sdl4te8hrvh56ix67q71ctr02wrp0cqpgeqpi4ho6jbwk67yvb2acq1qzvxvgioin2btu58k76k18ky',
                receiverComponent: 's6u5t0o3tghntkkffse9vvddzcfnphgfjq8pm7zi4hrfzshz2oh3sxdomfpan6rap4z1akt7clxw204y01j6h2qio8gx6cyabw28twklqysohcw78d2lg9h121jaw0mx7jd047o85qbfew1isbjc4bckvtk6cyyr',
                receiverInterface: 'mmgqc1v90s3f5p6d047c3x7u5rwtwrujpz6r94bvfuq9novmiswyxhqi3m4sewq69dal1itps5vc2nojcqalalb1ooh4k6xnl8e4wqzdr3xnpkosooponhb4s0sjj9wk2yh8ukurkwj05nd9p3plwbjsj79894pz',
                receiverInterfaceNamespace: 'p7zhjsrertlwerz9vq7g7c24msvvo93if4yv7ttx50yhl7bqu1eipr1j5ryawb8g2eee556cyweowej2noxnjm3g5xrl2j087dfu6fbxz0s2mxlqgsne1layn25l9nf2mafkh9gylnot9i3vl7464314y1buayl0',
                retries: 3883762757,
                size: 3454991980,
                timesFailed: 5388696265,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'lj28ajwvzbwfimuwzbos70awr2s0l7uyxp38jtbp2rhbqgipwe',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'eyfaauulskgupx69vnrb',
                scenario: 'dzeyc91p076c3fh1gbs9nd37y2ni6z3ko46mhgg6sgyn2b0rz9u3ia66iu4j',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:25:24',
                executionMonitoringStartAt: '2020-07-28 20:19:30',
                executionMonitoringEndAt: '2020-07-28 22:19:12',
                
                flowParty: 'lylb1vnkxutjkau2md1r8iexfvi39rmui7v6lxkb60n5sjmjtt88vmedxr0wpbe1j16c0f8fw7q80dg8e28svq8dvd8g3po25d9qt7hhpf88q4y4vz5f7pjljz54z583o3fvo0etoksgpt7wl1gdj7lm1mqmxigx',
                flowComponent: '3dn8kgs0vim84e8xwvf1mcflem6q4lj14lbp0c4j7yu9q5i1xug5jl8mjlkvrrn3d2iyoabk79gzu1lfofm509fsc7ihph0aw5gyf07zjk49gf0m4btm6hdxctp112fpdjuzsobc024cihkomd8agl2u8t7gz0zg',
                flowInterfaceName: 'x586fvlkwfxt8hldjmpokj5aemsmgugq1lsqxsagd6alzktfbh2pkkrwstxq4jn82ocg9vk5i37qgc4sifvu74a6iq9tewmnuwjd530tdy4vdlmn7z8x4eo8qe0ukwwjev1lkjjwok4z6gvb0vjm5ljcj9m3dnrp',
                flowInterfaceNamespace: 'jn16vua8vof2x79943yv6pf2unx3bmszgge0ot6k9bm1bdqeu833zjzslch8zycpqdd5mx545szcekii1qogwab4lb2wy2rqzujulmzj3bz991mczvw2qe07fnahccer1ls8anu1z8wv8pdfmwdg3k50oquo8iht',
                status: 'ERROR',
                detail: 'Soluta molestiae excepturi error rerum. Optio quis qui tempore corrupti. Ut ad delectus repudiandae eos tempora earum corporis nihil temporibus.',
                example: '9v383rkvl0uafi62alhs1o86ow6ycduvu3887yahiutziplb3umlgqpjze3m2dpqom3fti5n8yqsifdfra0uf59wdm55yfj723113kyu4vvr63khfje00d5rxbnl47xzzf2chmun5xzz7jdb0udeb1y3rpvsejfg',
                startTimeAt: '2020-07-29 17:05:00',
                direction: 'OUTBOUND',
                errorCategory: 'm5m44xik8w6t05pblrye61i3tjccqzmzeb5hu6drqmjziaoapm0cnvie6woql8o95utrocm0mz4yjin2kyphnyix7dtytw2qo43io3nx3huyzjp0tt0hrycxndxdijlhlmlfvl4ffpm8x9o7824nh4yd8j7f9g5i',
                errorCode: 'u8psnuqo2kfdjcpkwyqwrvzesh4n5jka1fmokvievch37w5aaa',
                errorLabel: 469998,
                node: 2952707736,
                protocol: '56psyevh9gjtxl7s0t1i',
                qualityOfService: 'k66m995vdkvyx20b5xcl',
                receiverParty: '5knw8trhccoq0nfxpg74v88uxw7fvfm82gwkaixexv60ybeuzzp53o4rchnkxxwjj45nh0vbu244jucq86no42xnzrwwvxoh0ezjsqfmbi8o3i58bzaao77ke4s3m35v6f444sqi8m2av4kggds6p4cuvd47yzcb',
                receiverComponent: '9hruq3mkfvl43ba3o12xz8eoad775dyxa25zq8cs6a43w4onkh5ie8dakmpdu4plag3197ohcxgy5ewqzsnnff3qynnp1h8ubgqdmkh39g50f3lc8nlnd4dbo0veycgxo75qfw951qyb9e1hp2jyebw3pjlors3v',
                receiverInterface: 'o7kk9v3wr5c2xao87qjox9kcdo420kebzeh4mio4waggfd4stabpu5bn8hjc786q5b035a8h3st2jss3s51ojz1smqbm6ij6wuucb41vdxrep52grmvrlztu2fzn0prnrxt6w6b5tt2uxbnq5anvaynbox0wmph8',
                receiverInterfaceNamespace: 'o9cpxkvr6b51r1w7io2ekrpt16vjgfhyppdav8h0kvm5yi461ws7yzu01lnx5fae6zclq970wtzygi3yuqqr5mrm7o4a358d3mndzdlueoisj39q6a8f44mcd3ucil50hjvir7r8rcn2pink2zo56vss3fdy5fxl',
                retries: 7894842080,
                size: 5089007827,
                timesFailed: 1512771571,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'luecihsigbnuq3a60oepc04p9jysfec904m27cfgshoa6zd62t',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '8sze7jwad1efekme1o82',
                scenario: 'mrdc5wxjjlr58ti4tzyw5zptk5y29qi7d04ch0dzc59xltabinjmyqe6ug5s',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:03:19',
                executionMonitoringStartAt: '2020-07-29 03:18:21',
                executionMonitoringEndAt: '2020-07-29 08:13:03',
                flowHash: 'ov4d14tf6q3lg8wd3hjtpda1hryf13rg1rff1t5b',
                flowParty: '7xzkotm7pza7mf7a5w5z3ptmin3h1cqriqp7605zzdbwm179rh81ww70shiz7hzf2a0qqz2vp4ls43xcux0wholdelfyabvsa8l870xjpngicghbmv8o7lkflrsqth98qf42wtejcz0ugw2x7tdl7gkcg6vywhb7',
                flowComponent: null,
                flowInterfaceName: 'weribqemezq5kjxv2369g2bohe5ib30wiwrl20gnoafhcskh8trbpuibvnt4j8q3akkawtxtqjnk202eqhpmumgr7vlq2k85mr9551b7z9x3vocdl92t39nzlc11nj23vzj1voyhpdt7lu4xc3qkf88e37fsp0oy',
                flowInterfaceNamespace: 'm8swheu239mdw56lmm0udn01iwit8aqpy48143q494qfrco4sznhbwh4agrv5hfyz6u8qugdh58yk06m1u4uibysnz3ocwlcbd5oeq612zvv3ks350trj0iqnrzrlnrp5ghe0y0itt3xlzvqiut7wypmy56x3cbo',
                status: 'WAITING',
                detail: 'Incidunt dignissimos eos blanditiis aut. Error delectus qui eligendi culpa est. Aut ex similique. Quae voluptas sapiente est beatae. Iusto dolor et nihil.',
                example: 'p879ymr2vrtfgtyffiwd4slbj0bbd8y17q0x3vkg9uid9cpgby5z6fgw5zjgjm26ann56hfpggqkoihpg9xoqmos4m6n7fsxngeexw9su0kyqwdk6ca64038017n416e9w5fkcr8p2jqf9770j491jp8jiizh1ga',
                startTimeAt: '2020-07-29 03:23:09',
                direction: 'INBOUND',
                errorCategory: 'mc0m8ck5z4mnmdw4u1lcfqj08hvr6uoc1gos8mh4llkecsyj4z27g7nh2363u7z8j30l6diuqii7p1lx56bypqlrbagiwk9dlkc1fpsgmgzup7ej0cxycgyxaabxog5ag9pfuwxe32ljnrreyzi0uzdzebxl8346',
                errorCode: '0kmvl96mi95hiw5qkvmmd808bmjjfhbb9ki54qs1by5i8thh59',
                errorLabel: 170974,
                node: 9144755290,
                protocol: '8qha9liw6d3b8yf1obuf',
                qualityOfService: '2inhg9obftkxydo76hgx',
                receiverParty: 'mb4zvacyupufj8orj47pa8ovf5krm8nyhy8d3jfa4ezb8fju1mnxadaxq0272sv57pmxk3lzmqonrfofd0r0gtqop4e1y82x1sm65q6ajq28lskgdy4xu37onj2kmq68jnmv6paexypxwsnhzzue5vkgs99w2w51',
                receiverComponent: 's4obn754eoi3f5gwnsee6hzi0lfeymp8ga8h4nbw7esyjsk9y9q1mw9otg16rdzpp88uw24nvqv97nctwklfyj37oxqht1secqosvczv47xguhp5p8d799592ii3e9dpvt0s1ukujij6khbhq9a6vv55jdosyrqj',
                receiverInterface: 'dix0cahpq1izm51ly5bfmz3zgl01dbqe4opy3fpdc7f4k8tivau7k4fqr446zhsagwydxa3zlwjfhdv1azq59kh9ou9apr0bypp4sawu0ybkdz2vrmkf5lhtg30rbjypr0xfp79cbtmk1ula79a2qxod1vb8nuke',
                receiverInterfaceNamespace: 'mswa82rsmwxh9ig9bxvtqzjbbfmyzskchkrpyx9ozm1jgbk2w951vn5qbv8pxrpqvgq0p7qbveergeaw1wur6eqi904oa58ppt0y3i6oih8mayrjo283sauixs9x01fqy88z1z5yfaiquf0kdsm46fppa6zg1qcs',
                retries: 4924254832,
                size: 4194147040,
                timesFailed: 6943833767,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '3c07jcyuz65greft99haa5k0ixxlg24m6ty11bg45k6xh1xpjc',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '517xkhqm7yyi0jolpc5o',
                scenario: 'crt4dh65656t7ni66i7569vhwycohxnbygd1174e9q2t36c89i6nxga0h3os',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:46:18',
                executionMonitoringStartAt: '2020-07-29 15:18:04',
                executionMonitoringEndAt: '2020-07-29 15:26:52',
                flowHash: '8pz4vtujcbza1lhzr0xjvuyzojos8ao5b79z44ap',
                flowParty: 'bdh6nc8tb4icyct4w4po5ut3pkavtk8xko7wl5wdhohy1tyq45thl3nq8xz3ivns3l038sw2r0vq17cnoyv44vdp9h9pvn0iooor8nz0gos6boym3064hx6r8styoa5ary41x9iisbkt08vccfwwe07agppyygcq',
                
                flowInterfaceName: 'hp69893s7ne2ewy0rne7o8fxy54w4ia3atgp850y171xycdyika4y3d5y4c4pz3kcmshin7b9ssvbex6ugezbdvfd36i52h4uo3ax9o3j1bxr18r4zmsaog8qnfexo5k7zxdju88plcjzo3bgq49ynv6a4wr6ewk',
                flowInterfaceNamespace: 'tz32zj1kkc04m9k73k41bbom72dnhyzg92auiroox6q9x2k6pr8rtginr5xr537wxuabfbzlz68rs9c8n5uowzq5vkbh1tiev9oymkvc8nrz6ysu0fmthnhx3jr0qmr5skj2yhe72al1ikxrs91pn0ibkfp9evsf',
                status: 'CANCELLED',
                detail: 'Non dolorem numquam. Beatae molestiae veritatis provident temporibus omnis ipsam autem. Vitae provident est vel consequatur assumenda dicta rerum.',
                example: 'y42t587pjhj3h24mjy1ix8b0ei48xl7o1pka1rd1niwiee25ly9lqn8ify1udl4lxptfzxbl3kkxxy97bqy8s6yyvgl95j882g3pkahaqfn9do0avj1vbjbhjxi4mtv5uza2p57cu6507zc9ab8flgh4sy3td8gu',
                startTimeAt: '2020-07-29 01:10:39',
                direction: 'OUTBOUND',
                errorCategory: 'gcrem1y07g869jdixfuh12ugc9abnyx85jveg8q7yugtvwuheicmle5pciphp6vk7ic78f6mv61a5nyshof5369d4365vwh4riwuo6c0iyhyncezi8jlk4y399nbssh881f32vlgjrl52w9t50lsc4a3zufqqn7n',
                errorCode: 'sdvsv34umni3siui1yf9u4eqlm1b3bhzlafyf3cnlvxj6myw7v',
                errorLabel: 383980,
                node: 1015463517,
                protocol: 'jwv5em5d5n50yfslamlj',
                qualityOfService: 'doq63g7x1qbz2vw5dc6z',
                receiverParty: 'jbmunjhrfw0udr7c64x45g5oblfmwjky0reyh6hjanj9jgrshr8tv4klmrvs4p9fslmtjsmp6pqdpe39bw2i2iysdzxovzh3p49s6qq5m88fkzf3iig9g0pjbipdkggcpq4m3lfsft5cv18xyw87ss4yg5t106i4',
                receiverComponent: '9hdzt9jjal53xwozek6mupw9w57burrovyq833nvstyilxaneud8b1faa6ypkk97tlda21uqlrpx7uajlexd6kzcdf21nxq2bj25xtkc0nalz2wel5ww8tt2dt4kjvb6fcb5h5ypesq6cyb1ffp2b44hwb9gvpkh',
                receiverInterface: 'sxwad5p90xcrc52kgrih5b7dleesw9g9dzr62ndozflirrnc8h6mu2lt77i4z8zawq51sh7oqnmo2hs29d5012aabxz1o2xudm7t8tej6475vp06mrengsd6qpvo2pl1um1rj31luavetojs5lbsy2l918hggcai',
                receiverInterfaceNamespace: 'c6is3m4es48kpw85gpuuha84csc5e8arvydmui9dlkznjagxwhyvkto5yvxst1qjhtv07uc0dsyji73o4iprqx7n9ltg3snoz34e5pumpsulqcakp5xvjyc9gfvbgk5jghfvo5tjm7sod2i6qywuufunmwpe0yiw',
                retries: 6445141567,
                size: 7239292567,
                timesFailed: 3705386952,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'qal8o9mqpa6z6bu650dcy8ewpq6mdllubgzqgs8ph193lbb3yo',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'p3wrxdjoeo251zukgmrb',
                scenario: 'zheeg0jvqi2g2b2w9l4mwoco20rid6da3egk67tcsv1aeo0hkb7ijgt3wepl',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:45:03',
                executionMonitoringStartAt: '2020-07-29 14:38:02',
                executionMonitoringEndAt: '2020-07-28 23:41:20',
                flowHash: '40ehvmm3lkra87w44ahedm57x44b3bydc1aj6az3',
                flowParty: '8i0o17todgc8k192qqhxo31qyif6hqm7arfon1wm9o8fwc1yzuiqrv38bng9vxcbiwc5269540vlh1rdg5i2m8c8q4q2wc04a4qcujv37b0v927kz2llef9ou77w009aixbyoxa0mqba12ozllquq43d32471873',
                flowComponent: '4yw7n9l7akw7pfqem2846nmd9bjg8t4dmkkbfqx8aiidsmjai29albh1tpwh94onsyt65254zwjrcf0duox8fgfip5pdzwolh6keldrb2aneu5geqdc0m2juv4851ez0a3k6gufmnnzyl2e51vdyoow14r2r9953',
                flowInterfaceName: null,
                flowInterfaceNamespace: '777ynkz988js17con03bpcpwsr79endxuqdmgr78k2uc1pny9pmlrsvg3oy10gil7iqfa3yw8tbqiwld0maxuxt00c8zcb9d1jpjqni5z07qm8sh03rxnj5f1t5xpldshc85cbtswzgtfn69icd01b1vci0tiywz',
                status: 'SUCCESS',
                detail: 'Consequatur excepturi repudiandae veniam qui soluta. Corrupti accusamus sed delectus necessitatibus nisi neque earum sint. Aut iusto voluptas.',
                example: 'l2jysr5vjf39r3u1y2ahaq0dhv4k0nq91kj3m84syjb9c37k80bengxcmwhwojz9w27okd3ckj02m0udctsweaw9nfwwuw7uzqjodqz3pc2we1n27a67zaqo19pe1960dwfk5wo9afxkltv2tg2bkpqem90hb5i0',
                startTimeAt: '2020-07-29 13:22:42',
                direction: 'INBOUND',
                errorCategory: 'vk9xri7weluomead3bhhunyfnl1x5km4jgmx7s1h6x048o0jr28u0e56hlfar1c34qf4wmiau6nevpn290pwrsxnariv49zu6ijqlacshysd8uf0lfpox6l21dp8odl7my8vzs5fho4jfl4io83m6ze9fjth041p',
                errorCode: '0p6surqm7g0hdb9i1iot74782rpy1hl7lt7qnk3a09096ai154',
                errorLabel: 635288,
                node: 5361947807,
                protocol: 'aaq4zwo0wsife8eqqwt9',
                qualityOfService: 'c3k75b117cz0xo8jpejw',
                receiverParty: 'cm7irn83xyp93pbmxwmllejhp93cgulvwmm8sxov6o3srsufpdn6zmcdyqgbsjb46y7btw3tzdlwq9w3mjxww52rud74y246n3gsipd44xbyhgnd9ke8osuf6biwkmim5p8i4os2oyn63gvzwvma1lbi0l4eff3g',
                receiverComponent: '2wrthy6mdha9j7pfb0pmfi4yefee20t5bztrqdu4ve9slx1z7x5kah59v4qzi2ak5ebahlat1mgb9tqnuowst75cxxp1jcclb4vblkj2v2k4duoitwph6nak34ovki4klzy5zgmmygc5av5okbrncty0wk9edqwg',
                receiverInterface: 'wtqjczhrffnrnvi3b1jhcvb9kbh06jf6qc6b11ct3moqog7scvobgbmtk3olbasyt06we43bic8w9vxzbc1zywkfb72f7nnypjgovl39696pdpxcunrvxkino7p9a1j7k5h0tg7m4n6chencjyd91e7lsk0zanci',
                receiverInterfaceNamespace: 'g1wzi3l32xgoyaoz888ytetfw1njupx20fqtu4fm2m5szd9mq2djb179uc10mwjsl9atzjll7hzh6jt16f4mv4vs6vpjcmgbbd4q41h7t3qnxb077xeme4a6acu0lzh97fle92e0cficpem3h3exxwwo9kell7i0',
                retries: 6035888645,
                size: 3550164651,
                timesFailed: 9450895994,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '6kwkvaieo0wso7v6gmo0f76781u90et34j9tdvb16syw9tmjy2',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'rynj67l3z3uvuv1n722i',
                scenario: '1trjwxy46nxxkh2o5lt1k7q5syxpws0v8yzyghdg6412cqbaji26mj1oc2fu',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:05:10',
                executionMonitoringStartAt: '2020-07-29 16:01:51',
                executionMonitoringEndAt: '2020-07-29 14:32:58',
                flowHash: 'v8g1w4e1qnz8ypoute54kiurvrtv30olw2lry8tj',
                flowParty: 'unslef0jxp8psy1b0rszfajg674x3jn825g78q0cbvla7o324ja0qkmyfpum9z6m0lkhnepw5f8y5am6b983l66shlonq2naze4m0ucc0pf978i1zzkmjgvevptfv41qd21tb1fx2g35kzxp060ps1brby4dwxjj',
                flowComponent: '5fpr7udxaj5ozvc69pq48ifkpujnamqchfsht5q2f2ffw9sgqiv7v4l1py7ernq5pgon44rm4l1flj3ckc9dsgx28rb6c506moue84cia9zeqrymobvjrm0hug46ly1axyqlsn07fwtz3xjhmof4wwljiju0rps7',
                
                flowInterfaceNamespace: 'o5nret34jr8g3hkzwqzzjqtjsbugxpmzq6a1o845dqwc6pdc7dpr8z1xuh61kcmmey80tadvnjq4261vyeyluw8ckby29mo6j5lccrtu5esl6wo1ck0e0fbmp39by8p3icwpmd49ziywqsl30jcjv3spu1937vsb',
                status: 'WAITING',
                detail: 'At quia inventore excepturi est iure rerum magni. Inventore recusandae esse quia excepturi dolor quibusdam. Numquam omnis expedita aut deserunt quod mollitia rerum repellat. Accusamus sunt delectus quia quia repellat eos et dolore et. Occaecati velit similique consequatur in fugiat qui. Illum alias sit porro occaecati.',
                example: '9hd5tgsrxqvk80apyyspcrx9tftjbzva31egfph6azoqzgkrf6c9y0o0rlbv0u9fiu2ztps1irw1h3a7ech0ny0axzi4q5513p6uuqnhdjoks3lz10gvf1ichfesabta47vx3qnpqrg0lz9m4kl3dhgqt0ccu371',
                startTimeAt: '2020-07-29 12:08:27',
                direction: 'INBOUND',
                errorCategory: 'kqtvgltx87f4u9hajv37cwjoj5tf2950k9pl1vva1rvlkd7fd9adtrpjfz965vnjom5501m50tqqo8nbr0aswvtlsmciva50h8dxojg1yo0ixyfkqmi9rrnqhv7nmvxqpd1n8p9xxyn64su1ul632eq9yd0mivpu',
                errorCode: '16dgbo1o9qm88yfs524z448s3gd7qsy2rr0yaage9v6zadpyyf',
                errorLabel: 930838,
                node: 3781339584,
                protocol: 'egc0swb5w4wamriio24z',
                qualityOfService: 'g85plenieqnowa4m3y4a',
                receiverParty: 'odp3russym1zmz4ny2bqt8jipbrqipeitwfkp8689kjy9bd0sflfprsewatyrywjbxvchcu1znh38gp95s2xcugpybcambktb0iwr921o0o9dnlzqip2cjfo4lrha9iol231c06ah57xeln7k4hhkksoieycmnh4',
                receiverComponent: '5jo07155fw7d4tx0u0pp7mh3dukj6267kat35c7rimh7jgkp3wl9l54k50wbrej9ommvgmvekbmcjlrzaqk4cxqtcdxn078fn9fcna8kom7088renfnijckmevvml9wrys5trfiz95lfd2guyz8q1cuga21nxlzr',
                receiverInterface: '5gx5ana8mb7erl7ih4vauq6orbmmnpaxh4z0bjyagnvdabc9mhzl8fqc4us2wh3thikerz95593kv271cp1ji4t7u33ghh49yfik0n90bk1f1kl93jga3kp6r65e8ywqc5a02zl293ypbj1xea3tvs3qtpfxkp72',
                receiverInterfaceNamespace: 'tj8ypfdn7xqr9uybo4syh32f437j43s9hhc48sllvxa7f3x87qoxcow6fjjzlulnwth5t1wn719ow2cqmzntztzsatm1sb0kn5m8bvkskwpi9tim7bh3stbkjhsldclbfmtqfjtx2jhfmn8tiwapmb1o03plzyfp',
                retries: 1168434845,
                size: 7831405619,
                timesFailed: 6463335073,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '1ytukk7delfhdcc0oc0v97fu9utd2r5wscgaom6luvro437hr3',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'c6fdmm5vhgrk3vbs2ivj',
                scenario: '74svwm3v5z8safh1p33riogaz342nsac1eeimx3mhfo6146myb5v60ohrsxi',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:44:51',
                executionMonitoringStartAt: '2020-07-29 18:16:09',
                executionMonitoringEndAt: '2020-07-29 13:56:13',
                flowHash: 'o3740k6wsg9f5wsktoh7pl0grrhroj4oeydbc8sj',
                flowParty: '3gox2x5r47xvm2aicluzzs6wg7qbgp93m3ct5axg1ouhmow7bq2urarudw1dvypnskrkpq33tj3fjh1gzxnsexnqv5samgd7byr4enorqqnflf6wmw4702fu89b0acts3ak284zlf9f7kxcmqye0tdz9nnaw1525',
                flowComponent: 'ic5fzysdzg59l8tx2ujhy2pglz3257s39d0axa9hzptqexsnnfsqdgvnlick81oo9081j401gbwqgujn1jihxiins8nh6m39gsjnxa7au0g9fqzsr2mbnnhd9c4p05kndzvekhcotl1rz4wvwnwmlv9w54j0en6c',
                flowInterfaceName: 'vnmu69d3w8xjvlyfoo2lqq9skuhhmv0yrmw6z76ugazlsrt75fdk75nosyfcqj2aiosxii29z2s9vwkb18731rdolxh2e4gbnmgfqbdcw0et566jnz4ics5rl0yvdtkrdiajv18acdq12yrw6ntm6y7ypzegfy5o',
                flowInterfaceNamespace: null,
                status: 'SUCCESS',
                detail: 'Accusamus magni facere cupiditate accusamus quisquam tempore alias est. Quibusdam quos rerum voluptatem ea earum. Qui dolorem quam. Rerum quo nobis fuga libero maxime. Aliquam nisi vel aliquid dolorum.',
                example: 'r4i59thakpowwhoi577tmxntekai2s0kznv2zwiwkofzdjo6cxosolb73mr1r0h4l0odm1zs4s0nxkx6s8qhiffvlpv7jk4cib5dkrbyae57gz65o7q98ut4uk599r6ghl4k0nuyta11l3ghlceorop2zsx4ucvj',
                startTimeAt: '2020-07-29 03:10:45',
                direction: 'INBOUND',
                errorCategory: '6fftpj04g0k8frpcc594tfxin54jbpvb0m37bdnt8gtl3t8ia1zlgae99j4k3prpzquazx36psu5b7g476mg23fwvolbdtj37qm6zbcje37hd4tu7xiw6hyt1x3uigxayuv3ovt7o6uoudh66l88nkuohidaiq52',
                errorCode: 'ptmxm02lg90eh3dnz9fxqqsql2pedoypjilhy7d2drnd0ujvf7',
                errorLabel: 498959,
                node: 6008445912,
                protocol: 'r9y7dzjdygacpirw4qxo',
                qualityOfService: '3l8nl50zg93ortz4aahw',
                receiverParty: '0c2ybws3s4xzmh7t14gqvwa70ehrp91s3rd9e0ng8203k65f39pgklh09udl7a4x8ew2b19icr5a24oto2ex2wzhmwfk5yp4lk9mgi68azc8ocgfxsauenbkssao1its0ilhg6ifl22o6hz28466squurmedn2di',
                receiverComponent: 'p3o2d6gisn6zdlbei020uxep1zumnhd8jh4dc775c21m0136idqnc0m9nz3q6bp8xbz2ukjjw9m945giueytjfk6z1b75e6d7iuiwu97ta7tflu2uvi52jg15g48kpbjxeofpo782r0fy4ydy985ci9bt0bjshb9',
                receiverInterface: 'zgspvdcd0q3cir68jqv39pjkvc5tby1lumdydp9zrgbtsvxxhk1sg855uwx9l2e3s6gzwq1l2b8weebyfjfpkx46wpi1ky0qybqiir08ssng1erw6ibfg952ryf9047qfr6mrxjk1vc5s5b9qdkcsqqqd3kyzkaj',
                receiverInterfaceNamespace: 'ovrqelj5nqdmvhkcm3c4e23byktana4vp1c2466s6xegfbc4dsqe12283oxfi9thlg05cvhnmrlyavacdak9ayo745h34m7hdkwrlm2m46vcl80pj8estqf86xd2212huup9lc6s7n9mse2ibrh085z6soujxd2z',
                retries: 1151612381,
                size: 9569960866,
                timesFailed: 5063355164,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'o94uei4tm6t8ttqtimknwjk177wu6hb7osluiygvwb87xsf2tn',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '05e8ig6a6313gjsyca0t',
                scenario: 'zs9jg5r89qbz6wecwkzddbm4qy5pohtrgdda1dufhzw7jps09vntb7wpv85c',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:34:27',
                executionMonitoringStartAt: '2020-07-29 06:01:41',
                executionMonitoringEndAt: '2020-07-29 05:34:02',
                flowHash: 'il53xzisazewdncgvdpdw1070n7952goioje07ap',
                flowParty: 'mybfy7hvd4sa9nv9k2c08w55tohevaphvwa00532v6vebi6u4yhz8ij6xp73bq8yisxq5o5eiwtn8o181onkohhvf61m5z1rp5nh917i77xs2jp47cqrejpjlcury6kg6w0jeanmvpl34rk8qlbfcm1uva315g9o',
                flowComponent: 'n8cub5s603i3e4atozj4t9nk8cg4ghhl7kfixubwplq9jgzsvcuy7eo5xqet4fj5dtswfey1s3fz2pofdruaav2rskwph9z2oonhiqkurtbsb6vyccerta9l61io3h7lxefx0zho9s12qoryrhpbcuq7v1tr10ik',
                flowInterfaceName: 'h0w22pdx7zdospks89ykb6zr3wapbf8zwqphmjcewd814okreuxitpnxk9pvyklt2pib39y3vopye72w7ayfcvj5j0l9bczxfo69lr21zz6xdt4xgkfkdlb0cg865vjye1e3ttpo8jadlhc1tchv4oxt8akoj85v',
                
                status: 'WAITING',
                detail: 'Rerum itaque explicabo adipisci sapiente saepe adipisci praesentium. Sunt eum excepturi facilis qui reiciendis nesciunt. Eveniet doloribus mollitia explicabo delectus magni possimus rerum.',
                example: '1lciv818qx73k80zszfcsroidvguka3iwp8jb6kx16n3jicmpbmgqtf6xjqh276bsumngsqgowep6pc7uz0c03iyncke6zlf1vvadwo9ztx369vayjtu56g2dg5t4lzc4goa8tybvt7out8bbr3gxdnlfw73a6fy',
                startTimeAt: '2020-07-29 10:30:02',
                direction: 'INBOUND',
                errorCategory: 'c17ohe2nw2zzhe1uhqdkdm3qawd596br8jh7aedg79t89msh5ue0bv545p2tgp0kleejl1j19qh51cgd9t945qh83s2fpw2g6alzr8t2qg2f99nakej37xeerj8kpac09i5k8bssk7m469i465rj9zjoroni94rc',
                errorCode: 'gksrataw16brg0mmbuc2f57gxzcp5pq2j4tnnvlb745fn3x6ys',
                errorLabel: 335462,
                node: 2988854998,
                protocol: 'oms5098oh2lev4bns5zc',
                qualityOfService: 'no1lyy0a0qznn35bay59',
                receiverParty: 'g01nyhecduokpglmt0ftm5mwbgd6ox02pxbfxzos3u7vhciy7wdurvog1mbcf1n0pnjz7seq93hunljfi1fetlbyav51q58mm4qcale94808z3y6es7blj61rtv9ufcetn6mc00tslh7w28ocby9m8ceo30szx79',
                receiverComponent: 'sqscn0jovdegc114at2dhqjtgjpmtqo457z6x6tdlh8csnt5oo8qhe87xq0oobbzekdu8uodo4vyj14kzwvjxft47pbhtkdbkfpbp619x9a05xwufviirh2z8dka2sp5cccfx12bgzzxbd4lbtexuzrj3q10u3ao',
                receiverInterface: 'ok6ink3rzaitwokdea2u0xsuap1ychhexlghwy34sxt65fssntaha8mgk9gz9lgruc7mgaizbt1zakb1ga7ufiovgi9cndulwg54nyecovuxue62vtqchzdi84r7ce5dzxrmya2iqlnkb2qrmrkgc5pqqctny0pk',
                receiverInterfaceNamespace: 'ckdkdwyyiqbtldottbieyjlld63kojrf167sn6ois8imh46l57f9ygs3lbfjkjx62gkt8e6tv8v19ry1dwq78tjqvl6hu42ebfs379uuf8amvwrdpu2ti9mhe2ueizsiwlv087f7lozkmf4pow7bx71ojti0gkaq',
                retries: 2283967415,
                size: 1054156069,
                timesFailed: 1695830693,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'nf2t46lf9lx46oh98c34fbhy7hanktnf3rqhiqk5fqwx1hjh4w',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 't3gmnsljfzk6zgajmp9j',
                scenario: 'ffb05plwtruroh941mg2vtjxmto6hfsz7zh4nlutz7ixknjn0t6abtinzdzk',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:31:40',
                executionMonitoringStartAt: '2020-07-29 02:17:46',
                executionMonitoringEndAt: '2020-07-28 18:39:51',
                flowHash: '685oo7vk5dye6t3bd1yxvjl7ox2b01p7idxlbzbc',
                flowParty: 'z2ec7e1n2van37m3dsy7zcfrr7knfw3n1x52kegm3gqhhmm9xey5y6jsmyzwnswmph6vqk8mjgv4tro0x7ig8hprxf8ytfcd0cw58eup6w3im4vra0mpcwbncgna7lbs063qzkh8uu7lxad17dqa8lgxl3hzzp1f',
                flowComponent: '44mblydoje7zm8suvxk46f14z95ftel64htpo1magrgcku3h14bbysg94nfnkk5g7jin8r7bgplk39kdbmiu0lo5wb8xhiznq112f5vv2ultdnao5h7bs8j6kjgh9x4674u62ybzqjnzeqc2pk9ec0077f0er4bp',
                flowInterfaceName: 'ata2gemqdxiastnbjxiu7sr4fq2d9z7zvdqxg09fsr9cjk2m4y2x6vlpn7bai8fczoh9gwbjkccjntizrortyhktaabrdcp0i5ndmy4v0gchznhf54w57i5c8ezk7fr3tos2r3y2chmrzbzg0pgubbhs0h082o1s',
                flowInterfaceNamespace: 'ebrwljrqyd0hksp8g1b9c9c5bjr38crkuvmdqk0y4i85nijz4y0xtr1zmhpz3akmk2gus164ov842ocu55yyqdgsuy27vl7mdvz4lgqnj9qe9bwgbyooez9skcvglayb5stht13wf8dtmtoo142pxlbug31y895o',
                status: null,
                detail: 'Omnis eos sapiente iste enim explicabo. Veritatis veniam non alias labore modi corrupti quia. Rem voluptas ex voluptas est.',
                example: 'ggi4zrrybb1dqeuzezqsc0r87h0pnjow92ensu26au3an0m1sknjc80gsc7t717qh79fc9asn95iytitmx9rg9s78ox23d7ef8lavfszsa37y3sm4l3oorr96e955o0mxkax24rw6fx0lcgkd9e75fyrqwf1xlfx',
                startTimeAt: '2020-07-29 03:33:31',
                direction: 'OUTBOUND',
                errorCategory: 'eq3a3dbxyo3f9f9xa61gehc7h1wae1ch8sh11s4h13j5htx445ijf9i1gmh0a5lk7bor23rpg4af1iumrjg63dtmz7kyb3owhgeodzsz0g0vf64kqhebiuox292xarghhhwpbfv38cf933ggsvh2sb8dm9d6bp6k',
                errorCode: '9ijam4eujrsfylp5k9c4bmi07cvlvg4a5d8tqfysu1bsuypjaj',
                errorLabel: 359904,
                node: 3016969490,
                protocol: 'ulniw2ilesxhuqmioczs',
                qualityOfService: '6b7fiqvt3tho9wkg164e',
                receiverParty: 'gvso363wnbqnf0zl79mtxrzp5ouzylz7s0ptdmio3uph2ng2bok7ww8fmrq4u0zc1xmfuzuqb1c6swk9vkx9opok8n2r3f49b6q1aaxobf6q3nkxey8ozjc6ztdf53q9m0t86rzgwhocbsle68db4iscoj8axm3l',
                receiverComponent: 'jgwcpen6g2g02m024rypji99n42f6msqssyzicogmdsqpsi0actlngy1gh519ot20h4pq0cqavc9p3yh9bkumknmklkgcp0rb0jtheqbcm6x69ji3i0gr5f8upra2kmuoh04w66afdtgkok5nnhzb45mcwah83mc',
                receiverInterface: 'nbqcdn4hmzwy5htlrhxcp5akt7u44uu1zge29apxrsgnk9csak9keijox5n0yw393cm0iw5gamxhhqzm6sdsigiqzagk7i1dqs5g1mo3oteuretf16id4gipg9u4fqfhnehljjmd5mjabwkhba9v3ofze4xcv9ij',
                receiverInterfaceNamespace: '0vmvvxtdbwnuy4qqq2rmyi90bfg9gc2kxhwg2tpsdhtm3z0kkiw0mg5mzrlxtsle6fkjorback9x8dk3mby7k29llv0fwzwhtgvujchyupl2celzhp1b7hkki7jy2jgca5fafe3zmj9gfasrxmdjc6nvqb5zyc8h',
                retries: 9981869942,
                size: 8680423020,
                timesFailed: 9290937456,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'o4fdhe9dc3tjwb7624r26c0t9ts3g8u2uif5bmp8fszha5syt0',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'qjbw3i7qw5vtyodxr56x',
                scenario: 'q0h5bfi3bcsu3fb0fhbzog0jmr89kr2rnjzqhlbt0educ2fbdysmk57na810',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:48:31',
                executionMonitoringStartAt: '2020-07-28 20:24:40',
                executionMonitoringEndAt: '2020-07-29 09:07:50',
                flowHash: 'g2o3wfqbampthzutvjkujzfp7pm51ylvbq4nf646',
                flowParty: 'x33p5r5x5y7xryj2ri3mmzns326oxxezhwpiddyye4ykczwncnfuvf4jj83dwu5o9g5dlsyb7apm6qlyy7p0qlo9ylwhg2d1dawqk9wcn2z25ii83gzx6v14aswh51oo5w2k2noq4ro4crgs31cu7lk5rbndasjt',
                flowComponent: 'mdepvpon4cu8wwb1rngyfzxn88gchebzspr1boog1c6fom6w1996xnfkuxeguhgfbzt0fb55w7wezy70w3uiaic52el7t70gbc9olv6viohywoacpoqtwmvw4si6vyrtxa1t76kj912unds7hlu0kfp82xz6xztj',
                flowInterfaceName: 'zli7aesnang8axrmochl9hhhlkxi0atew8iuhwqebu84tg0bhhdhruhco6iycu4vx4gx0m19q0up7smht180zy0n9b3avi1tdlmlyueuv1qznv670gksx4962w20erbszatnb9nf2mjnr2lk1t59rqo0pggwygx3',
                flowInterfaceNamespace: 'km6lvon3fh20g799obscqyg6mmd8jdksc4ehuh5rfpj93mhfznk1801nj841a42dmqhfbtwogmvz4v730t72sp8nbv9h3j890u6y6yq9ymzfsr88wug2x3o6yt1k8zk8q059c4tjsyg0eekuvp32m6pp9bj7f1ei',
                
                detail: 'Eum provident ut vel laborum in. Quae consectetur molestias quia et eum aut dolore. Possimus labore ut blanditiis.',
                example: 'nqlm5oi11vh4gh60g9us606y7isnbrw2mscheb2rmqtqboaoz5bzoz36u70c9u5rzfjzwvoqs4y3qudjclstdtfm1hp3rxt146e62chpqh1q0nskxx0zri6snutq30zfp0djc6n4wcuc03c1dtalnzhwxlw3qagw',
                startTimeAt: '2020-07-29 16:59:31',
                direction: 'OUTBOUND',
                errorCategory: 'sthbg79w5c8nmkg1zuyeqbkka0gxkf60j34le6v8qyza8m8s7t8ebyjrzuw0onx7hj4bi9n2o5ev0pumap972ofeb986oms98hys08ksxd7buzry99l3mf21t3n1hmtot8pszyqzviji9e44366pnjm7tjbcmxbt',
                errorCode: '99xjhzudw9s2lzbp8cw9rq1l6mkh4w34tfpgbfwet1kyhht7bh',
                errorLabel: 644447,
                node: 5515389079,
                protocol: 'hfceeykkre2n8hx3fpdu',
                qualityOfService: 'b4rj612fzx06mlu27b1l',
                receiverParty: 'jeu0cji9q2ya74kjn9om9gt1ar7pvzitvp4dgkfm32jyryxg4ws0u313y71olg4rcf2djcufae16rnbcjj8qzi3bue0hiz4d2tnvoqpwt272gee0mr9tb540ndb0at9zlzx7mmac56waoeobqrji0tom76574b4w',
                receiverComponent: 'sq6rz3ilcqgdb9o7k75x2o57tt6imzwgdjexkbwbfra6afek990ng434nr2uss5bj43pq94fzt6j0sp58vr3qm1nthr1kakwtiutp2sk7xil4zvsbuznro6e3c2jzz8atmq8lu5kgfc65ey2m2vpag60fp2714ov',
                receiverInterface: 'ze5oy4sw38kwubahqjh18c1676z6nyedy8rifmx3cn3bhrlbztu8othgah26tldapvabwbyie6fe1l9exggn6b4ura1tidkc6zjdcloqa7k4lfok8lpgritls94iebfp0c89xwq0mjjoauazjtkg4yhygxw1zjk1',
                receiverInterfaceNamespace: 'k96xon4lmo3p6dnwgfptzsbaxyjcu23tlwf74t5hr3q179r059hdb35tcknvgtar0gs9gsjb5mik1tn5g1w1ugp3jvepowuh137bv9pp2vejzii0vq2pzekocji6rjtop1g379xid1djquekmwi0ztul6etxf26l',
                retries: 1223100313,
                size: 6122395181,
                timesFailed: 7661789834,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'hcnrqm0cdkqlhhesiv4v4sz4pf3wd4890ik6r0fm5apwm1r34t',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '8pquxp3vq4ojaxkn72d4',
                scenario: '3du2sx5g37t5vhik0uojfi9dvxsldw6eonua9oxpp7xdx9a40586chd4xsdf',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:57:03',
                executionMonitoringStartAt: '2020-07-29 16:54:11',
                executionMonitoringEndAt: '2020-07-29 14:36:36',
                flowHash: 'qisu51pf7gxkgevbo04dakzqh6quzqdt64vzowee',
                flowParty: 'ri35szmg2s804b62b8nlyby4unyw4j0iobh3pr0jij2i4i3r4camvz7uim7h3tb4ztyv14sk789p8r9f5m48420oalhlpt5swupx03s2c2a331rh43qxel737r8wzyyhkjy5ekz1to8lo8ynr793lpq1gm2uonu3',
                flowComponent: '3xw3m5wpmt4165s73frwe1errd96ewlwjq5063qtzwxk8n2ez30k69zqxp6g52wgtibc5sivzzqbzs0d0lh2ucespnybn3za2k0rlikc6s8ncdsqu7fbraiq51mxhuy518rej7ajx98kbwskoi2p91hllamnnp3i',
                flowInterfaceName: '5ho3zrxsnzeh90sm8reruyf48fw7s97p14k8wl9ylvyv58jqpan1c1jze3uzdqy92cyr1x1qsfnzux1t4ky2qh80nomyiusy6z17vsf5bd7o187gdxnxajb7mhyz80y5pzkd3opo8xi7rzoutn64xfrbqgn2od6g',
                flowInterfaceNamespace: 'kjvvwfra8m013h0o7gq52ndaf25r7bvru3ytjx65bbnp3qke0mgc1wtptul0yi235e8txay5afu45ut220v2u3k3kolluuughqfmchktrrgvaqn8ebm1oxnox8en7yo3ngrpqkfids52qm7lpi1txcs2dojo9j8w',
                status: 'ERROR',
                detail: 'Animi est tempore dolores. Nesciunt omnis corporis consequatur magni doloremque praesentium. Aliquam illum autem provident et qui consequatur voluptatem. Nemo ipsa rerum dolorum odit voluptas enim.',
                example: 'rl5vi08ig2gmwnmhsbncfbf0pf8vgxcf7qkwqz0sjd4zsjbgb5tg1lif6xf3j86iztysfv8mr07i53izdiivgge5iul9541nj8kkbbtate30x4q9ysjtvz8tft6zyhm9rrct6fp9bybzy4i311daalwob0alhyhx',
                startTimeAt: '2020-07-29 10:15:19',
                direction: null,
                errorCategory: 'np2r42dlbdtz652p6f0654a7fo6j44z4olhxpc1za5oyqjvdlf0vsf209j3t0dtanpfibmvno4v69u63qcbaonxlo6hynuo9nngv7rjiw8c0w4zm34guvev8irho4dga64ytgjdggu6vdrtnbcmg5jas37hpc6v0',
                errorCode: 'bcf682xcodeao99a1ts835r3umgqkstiiuir4y7np3v5595cfk',
                errorLabel: 238538,
                node: 2119545049,
                protocol: 'ccif6b1v5dsmy1tcejho',
                qualityOfService: 'cr282c1z4kmubjj05aly',
                receiverParty: 'ao5jh98gh95p7kpmvqxrkhrb0j4bii3tbs02oqlpxqb7lx9ux69q3qthyydenge34km3pd0nyqxo7moc9eg8jylaqifoxhduk34sxiud89qb2gqskxh7hq47x4g0wqop8b9mpniswj88xzd5i4nx9c3egej1g4h0',
                receiverComponent: 'rmv1mtf3h692j4y4s5rne85p3ijo7dzwzjxtkiv4yi66e2ynhrsvftpo8mqs6tyhgjs7pp6z5q9nqgr01aes23uqy2fswraczdd3g3smkphv9hg04yjiyk21eol1stsgi7tei8kvztdlznl3sigcbgoewk7ab4td',
                receiverInterface: 'wzjfq4nh67llb7nv6pv6audjhgz1n2y23w7j73m52ndgaf2e15ai722nv0vlb4j5axlekgfdpzvn8nwumxrv5iz9sl5tnxo50nyes41ta15mmwgt28s2glllnousw9vsnyxl6ml06jfa6g9k77c3iybkbslbfk8d',
                receiverInterfaceNamespace: '242o0c8vjmgerdsfvf3jhk1te4gkd1q8mlyqv9w9aok5oz05gxgwmr1qqmohmw20q8yppi0qthh44nqgqp84dzjtmd61und932xd0kb4mwmtk5z1lukzjvgx4sd5s5fghfa9rkzkxqrwef2edqs8x2ht8wq2ge0f',
                retries: 3683057082,
                size: 6859190060,
                timesFailed: 4153766787,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'txez9svwr7c18j26vled3sgjam7edov2p48dxc8w8c9tfdtscv',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'lp674insh514fc3a4ma3',
                scenario: 'zx7qp9mvvhjekyu0oor5aacw7xgbwtgdsbisj5n1ewbek940rg94cjiu0znt',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:09:51',
                executionMonitoringStartAt: '2020-07-28 20:36:16',
                executionMonitoringEndAt: '2020-07-29 07:42:34',
                flowHash: 'pyihdh8upd079b380x9uvj57s61uqdqhbg1erxdw',
                flowParty: 'ir3d0htzsix9c9vb3zcau6mba78lww7y5denvpq225vmyxi41ajpnx3g8c17a3a5gn2yspi6xjga4813ch84lbduy2js7mh5n0nlnusphj54m7sq2ma45khpmzbhnhhm0521gsp66ivc9byf44nc9g83bgs8jbid',
                flowComponent: 'd91gtqrxek0xrqhxc5n0newmr8yaogeew1pucm9whpb0lurob1qbce4lblc05d0g90dkzkfpkb5vlq9p6kc5p5r7bwrdq1y6sbvm0y1xd5zpui0bghdxohqsgaywbjfjk8sys18gne5evbet8rytuvsszepimaze',
                flowInterfaceName: 'q133no6gpkklaswla98zu0xsc6ojpjqzcq3xz7mbx234ggwdsgpx9hyueq8nn50bcq3dq9w3gu1vgjnbya30tdoazopvmmxcw4h3fqdup5vhzca4b69nw2n6iy359f7jcq3k3m2ou4y17ud4fmdsydug7log1ur9',
                flowInterfaceNamespace: 'z5444vnanscdmim4x75h47a4p355hba8picssxs285q9sky0gz6v4q3zzvk1y335daf1y7ircgdb9uh0zxl6ti7xorqp8l96stjk2j7gj7swuh0aq3xurwohd4ccld24xg6ep51k28wooh6gu2ec1i2s2827u9xx',
                status: 'CANCELLED',
                detail: 'Qui fuga aperiam quaerat voluptatem qui occaecati. Saepe accusantium explicabo voluptate molestiae veniam voluptatem. Totam labore ducimus iusto dolorem. Et optio molestiae exercitationem natus quo.',
                example: 'm08aqvc73phoor4e9iwg8vlxbqyf0o316uux7f9zzgp2gk44optjt0mktvmg76glcgfgutmalcukhbupllhmigw322iemg41bdd91cfrba42wxukhnlk2dikk4cvan39gk2hlagmnurbtkdyrrv61a3xvqcpxrwn',
                startTimeAt: '2020-07-29 08:44:33',
                
                errorCategory: '3nf4brl3bp9sp52ljp2ktwi05ksgn29g8i3lwl9sx0fl2onvqo6qkzoh35i9z0j7odir2tn87wm8kw4y2wpze6j6cvhmoh0k8ufrubij3ytm959wdmkqjzym3jzy3ncio6r9wdudx4llhdfhrlj8pu6b1o7ofct7',
                errorCode: 'w9z6wme5hfp1qmvqibl3qnpfe6rhpkzx1o2el8fddyji1mcjtv',
                errorLabel: 551571,
                node: 3082820003,
                protocol: 'fpu9n1quqnggfkrlz0zc',
                qualityOfService: '025asnckpb92mxg46r3q',
                receiverParty: 'z1z8w680u90zmwngehi9udh88wy11mouz48hxbqsybxqrp4iv7zakxl6cg2pg4obgjpls9vve8x94aeu0csrhvqu9jb53n4yrv7xxlgf4mgos7pvxtnv3xaowvkh65cm5nj6tgnaervi0pc8dwyjwsyfjt84yqs0',
                receiverComponent: 'dhefr6nlogt81knngmx1ba22dg5736yv6084d7i6as2iwy99noh8452f43aw921qccrhdm01oozq1td2t05zvdjjim98fmsk3rxq1e1oey6ju9k28lghnk1irhjiyjgxegi9m5qu4dt9jjj3evyl91t4rierehed',
                receiverInterface: '7ucfr9p0j7pxdty73x1geyeabv1itqg0smny77sowan00tro5alxg9djw1wx06fni7lfo3c1tefqn3czggrlw9qm4q5t1ua2qh1m0nbth7ybh8tqiz51e8evm6y582lxangqhm9b6xx1k0fv9bdmw21vxzdfyta7',
                receiverInterfaceNamespace: '4u23e5v84rccsz5eywatfi71zabh4dm34rcw7w9zpcckcto3kky9t47dr5t0jzef4nqiagsipwjskml6ge79n8cpwmver9ohjrfoekas1x66q9mfzc2sqtt3lywv6leily7u2z1pmhd3vpm6g3jx63kua5bbpa8w',
                retries: 7669455438,
                size: 4442881242,
                timesFailed: 7647560408,
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
                id: 'jvgjit6eoj6omqr5qce675aa31ebv85g3rg10',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '7ru6n4ehomdb67zz5spxeu2ud0ypz4df7r66a1utb7insfz05n',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '1sxpktqzmzga5e7tidgd',
                scenario: '8561x0bxumxfdp04mljcy74h8cbax9qe2nlb8edqzgxsvcodn5gg2l31z5lv',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:33:02',
                executionMonitoringStartAt: '2020-07-29 11:05:45',
                executionMonitoringEndAt: '2020-07-29 02:41:42',
                flowHash: '6583zjuf15w1jnbfofe6bnqgswmpoksb6hy0t91z',
                flowParty: 'onr73j340vrtvxabvl79890izx4srngyxpt27odczsn55gwmpskae3k65e9ea3hkeujvd033hb9n9zf3e5hzsfftwf8p3a2bu2pjgqoytsalsj6gyrnzlas6unmgmubyqrd81y6vqu0sluv9njbacgvwd9vs8cyw',
                flowComponent: '8s0mwewkrchsms48pw41zlp9zne194x5dj7l141ce1y2bsqguw8028elws0819s7js8fk401evsqhj8vh4qm7xpf459t7yn0c6gxgxk8pfqk8ktguutueb4xuqbcrbqvfi7g9sdiy8ih4erff95xazzxgf5u3cz9',
                flowInterfaceName: 'bfljs6ky4dt9hobyvnq756819a4rlyhxisdhbvajemdblwp8ft2morgzox8zfcfyvpxcap06xyj691xbm3zw1qiefep29uvr429xrsk6h1ofyzfnibmojhaxp5h99ozvr0htcmwh3xygjx9asa09zdvno0zxfu0v',
                flowInterfaceNamespace: 'zwfwj17mjajiituk0otrzbf4vny0281kkg7d6b8790q1kig4swn6aajcfg19nsdv3inyj0np3pekjyyh9gjdw4md9ilrvu9168y029p3bx3bbzn4buofxabs9kmcik86tmx81kq00fdnqyxposj6k09lnyfcdnf7',
                status: 'DELIVERING',
                detail: 'Velit non sapiente deleniti corrupti voluptatum sint aut id nihil. Laboriosam ipsum quo et perspiciatis quos eligendi eum maxime. Eum sed eius enim tenetur tempore non expedita aliquam.',
                example: 'v9ovnjn471qpafjzxt2ipzwj5i4m6w4zgipu2y6bz8iz9lsjxaq6d1xeej4ldaagb8raxak726pg9jznra4afueypz6081hmpoe2uua0dyw1dli399sttz81r6dob7mlp1s79zb4os2tdstd48hnjikck4g7xtp2',
                startTimeAt: '2020-07-29 10:59:14',
                direction: 'OUTBOUND',
                errorCategory: 'meodbonqs3n8hefrdyruh5pm4v49mef7c7ve2vnri633ga3vsfahhq15mkxw5va2t8u5jkpr0c4ya0o32vzt4wfke0u9j1baszicppgwfxda9i84bs2ah0k34nyxb5taylvmy6gfdea3yxk689zqwqqb3e5na1g9',
                errorCode: '6sc1mnv3bpq7oijpyvutlm9dtmt3m2ygigx9hg37r907n4s20g',
                errorLabel: 265257,
                node: 7482121363,
                protocol: 'w3rk7jnpkce5ez5bjtlk',
                qualityOfService: '0dots4u6k93v1aw4nm5b',
                receiverParty: '0dwyyaighq3jkaw6pysmmirfqg7lldpre3ilkkxvazcp0fh0ivt3p8m52fjdltcqyrzyofce55yvd34xxfw0hulmytx055oaha47ms78kotyt3o27mj99edc6gyrfhosqi0kbvksdw3w0tun1ybodht5d3y5m1rm',
                receiverComponent: '1jygp2q58584y1gvm7banxz30t6o5c3axw4zv75srl6nhceb2gbcngropplhryydv7i1eut28m0uccap9rki2cor4qaa5nz2obaxqlae9smct24tfba0z3v1lwbv4m7poa4wm4gwa7czap3gfqn1pdvqhrvaaeq3',
                receiverInterface: '3l1fgiaq0hcxwliq5zj7opjz6jrjfkpezp1y4poxydvweaspvw4ipjincvy8j6ac7rxp13dk3x5g8vx5gicfs1jbkcpllcsb7ayzuueqwfy7r1gugbds5ylyco3gbg19vyb9mu51ugzqszrf0rhfsugeuybt2e8n',
                receiverInterfaceNamespace: '1gmp86fmvl5nyukojxzch5skschi1g8uudql1a5h7nsuxbjz17z11bgbotyd2vo5jqi8700209u9l2b613r5qrv4brhvd0dnt90j9ygp47bufzjumv0ahfsu131kn4ssmw2qfd2t5q6l5k03yjdc566iqjm2zctz',
                retries: 4483793567,
                size: 6071173506,
                timesFailed: 3359563612,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: 'hy4tbqbmspq9b0u5g4gjw2eoigylx4x2wqe02',
                tenantCode: '00ne6t6tnlm89cqtinyaxzydxk0scpikk4aoecftpxsugrticp',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '9d1hne0keic8jcl3rsfr',
                scenario: 'kjtj9uwpvit1nupwp5waq9gulznm3z61rk6t2ulfcjobjqjpszdk11im5jab',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:43:14',
                executionMonitoringStartAt: '2020-07-29 02:26:38',
                executionMonitoringEndAt: '2020-07-28 20:18:05',
                flowHash: '19ege9713yylsl8q2msjf02ak6284doiosjtunxu',
                flowParty: '8tlb1yh7gixk4f1v8lzm2zyiu7akwyc4rwiwnojwt5mo27anbt0ozs1dqjx5w2brj2bqnretpw2m1iv29c6tpej449pzduiskukx9yoft4jf9gt4ur7c7aj95wym7ivnaqubcg39d5e77akp9xontdtw98p3s1a4',
                flowComponent: 'dnomp7p5cjz8re8sbpy4vk0g5gkdx37bgtrs4mpwwn0g9siojd0usmg1m1b5k3xa62zyefhfq3omo4mjfv3hmuhpaq7szyqguhic5iwhu819rj0bnruhanou1kjfb0wdoy6qi10tr0cpdw649eumhpgtr7ibctsd',
                flowInterfaceName: 'hwta0tdggi1jhoxyoccgbjsvzvxpdc7rsdezf324fv5riki0l3f6j1f8tfe73tpvcrwpo0rttk1y4ioo7l37l63pdy4t8a2mtcni4az1xpsapkzlyb4kd8zjf0189a32qs49pwguqoaoz4lk5j1wi39sle1y6fty',
                flowInterfaceNamespace: 'lrrmcmpdd9c1fatdoun1tncss1bvieisiqago664ig8v3b7wxyq63vgxfztzrcmpn3rl36bwen4jlihvaydn6zc0ikinyp208lzlgxkhws5tc859cg85dgudz8p2i1vluolloyzrqfly8wr63kmofncigmud2km0',
                status: 'WAITING',
                detail: 'Aut eveniet occaecati voluptas blanditiis quis omnis. Deleniti voluptas non et. Aliquam unde eos earum sapiente est similique omnis.',
                example: '8ges1oe42c0grg7jxsk75f8jp7c7vsv44ymzu8dufwz84mvfbivooga9v6xselgrvit8zegco4ff5spahre22kj2de815tvsb57font465m9wucs3vq1fwawlwrup7qf4cl8y5dnbtlwvjmeb6ey1zf4jdr21cii',
                startTimeAt: '2020-07-29 05:17:25',
                direction: 'OUTBOUND',
                errorCategory: 'i2dcckg47vq7n8sp51sazgfxpwve0n2v99exqyutl34yw7gcrfcyawvi3144ibb5wal63q2b7f9346fbmcvh4mx6u16aqjwqwtnaivzvu9s8grjsqc6wv38pvgg7yu1713rtsk8mog7qwh76pwv8o5v19jd0171s',
                errorCode: '4hxp976jwb81jafe9imzdsg2m8ncjjjgzg4gymbu404ei5tsgt',
                errorLabel: 648694,
                node: 4324302311,
                protocol: 'aypxa2nuakmwt2wwlrbp',
                qualityOfService: 'nsfcwut7hob4p1lyr6vq',
                receiverParty: 'q7w9eq3g5ncvq7kl00ua4j5c8zy3uk6t7hm6wu6ds477llp533fktxbj8mp6prmbe5agurb1bq4retf30xu9c79p8lyuflhs3rj5jnmahcnlgc2j6uv28mo0lrhv35bje74zixznd3g49mq3erkap5p00ckvpf6p',
                receiverComponent: 'hyjuvcfojnwf2hu5xzj3dlxpuxox8slo3xj2ufz8vwt3l1ustdne6fihn8mfpcuqtjcuq4h2wi894dy6koig4awx61xuaejuca345zbauqw7ue4ncupv9zilx2fiy95vh1mr0zskvwgisjfbq11336h7e4ezrg8e',
                receiverInterface: 'wps1gbio5xkujlmnoz2393u0x57ybbyxpuzkx2xkt6sw5o2vlwkdbrbwwalbnyhpnnto2r331vm2yak1dwqjxxa6dif5r8t0pepm4fjt00xbqr19435wfybbetzka9ctdud57ht3akc7yx1nz0xhnigy1ailico6',
                receiverInterfaceNamespace: 'qpyc58k9uyegi3oq0ys84um6euh5f98e2dm8j2ct7zxjo9i9fzk6v5o110mr2z3yjowfoq1xz7gaeatsgk8yfb1nw0mrt2b6y6u2yjhw5okcqdm18mtycaq6kc7ca0qla5mek9kb25p50hb16o2vzzkmms4mfgk7',
                retries: 7464119925,
                size: 4409035663,
                timesFailed: 5500135548,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '3bnybmcbalcco5muyzdwyg9ba2zjgvj2djwtyxxvs93lgyr90j',
                systemId: 'jvurtwx8gqlgo4q4zic2d16387og9xefzs33t',
                systemName: 'mdzobc15old754xcbtnf',
                scenario: 'sxw98dsn8mf52h8vmeuskotq3dntyfsjwpht5ewsvuaywawo27zpy32ynt06',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:17:58',
                executionMonitoringStartAt: '2020-07-28 22:41:53',
                executionMonitoringEndAt: '2020-07-29 17:56:37',
                flowHash: 's9u665z7919toyz8720hessw7jjdwmjqcfgw28e9',
                flowParty: 'ktmf6ecffmpy9mpl4i6if6gb2kas94o3apldff57u7bxx1376298dqx8ocxbkxfxye42921x66x2zyrnq6xgeae9q7z6oabem06vbywri1zvlxjb5ncdwmwnsk99pxtinmx6ohkcaol2cdsy0guovdgqsrog78aj',
                flowComponent: 'i4yq1ole6kjn7wmjzdvk72q36wit3a0pjtjr92xjbmg4lrz452a6n1arfx719yqhi8a0nm2169q3uqavixf29vtki62iru310lblbmb72ab0br00wm0uwfuxmyj5sl4l8hw489urrie7ltuo8ywp5h30zibaamb5',
                flowInterfaceName: 'w7h3j5hnad5lb79wglsc9jiok9qkxwwtt22gnsbxr5glp572mg1ymn2nbt6wm4rq2e0ri53kzjjde07obhqn31j7yy179cwmphsx5qpm0ikh2e306ezegq3lpyr53u2hgzf4znlrigqu2gmaei7caqrdwcny4xd5',
                flowInterfaceNamespace: 'y0zzn0xz3lbuc3iirdvgdpmb2q4c975mvq36jo4undyrf6jxwhl15n451w4mzlru9l4wnn7nzpvdxli106r1pudkc22fuf77idwfs4grx2xeu2s4axoxlhrex3lhz1tfxghgrx7xxbypdbiukd2d642txq728da8',
                status: 'ERROR',
                detail: 'Provident quam et voluptatem exercitationem voluptatem qui repellendus. Esse ut sunt rerum voluptatum. Recusandae explicabo est id id laboriosam qui debitis.',
                example: 'qe09zmxw4oa8ewk4f6ab0s6ph7qj0s1xs39qogt7mi9v04clq2s6fstjkpnz2w47280vb9yc43q8xu6z7k6y4abgbjsbfy5kv0fx326dpsw2htktuduotbsieh8mzyzapfy9wc8hwmmh2cqai8gbr5brco5527py',
                startTimeAt: '2020-07-29 14:55:09',
                direction: 'INBOUND',
                errorCategory: '5j9ps0l3um9wm788ywd2ofh5u8620o8vc3wr9c5fx797yct9hoja5kudnqqqrto62va1dzf92z053xjwgvpzoqgu2q4zx5c4jyfxzdiqh1ljd8kgirwuizs870tbjr8i8411vm1mmza0ymubqmlex6syk17hyzu2',
                errorCode: '0nd135fbth2rrlxg0vm461t9cgkbt9gwmylitxafj3fteqrsat',
                errorLabel: 327406,
                node: 7726874029,
                protocol: 'm5si6qfvwm92vyj7m3tv',
                qualityOfService: 'zfvhsk97rqeobplr5ewu',
                receiverParty: 'rlrb2176rpbtoyqmfp6kxko0ysmkkrgrgrz4tcade5jljoxz5eog60teaq8oe1fs7o9191t5p49am8u67evbg2iklgyc9zbjxa34y6tq6ku45sdat3epwx9h647y4bm1zd7mqry5jyuoykv9bbi4qfcvwf8b7tdi',
                receiverComponent: '5ta22kaj9193zx47vtf1fk7zpopuayr8wjkm17j6ozksqu3r2b7pwja2fw5282u8fjuoisrt9wlg68orx47bw4ga43a1o9gfklgymzrpot7j8slpagy2p6hwseofcqtsl5etw7w9t58pmmh6uuvemyxm6om7nepb',
                receiverInterface: '5fgoo6o0i62btsif8yx2y2a6lit2fownuccnqvw7f7a71o90ky4d1bzgasu9mfdhflwy3eg7fv0ewh4ok80r63fe0c46665zouucmj0e4057dobgxr3tquh3090vgaml4d1aoolobej59k03lvxinwg0rr9s7dfw',
                receiverInterfaceNamespace: '9yptxxmn225z0ttix328k1jjer8dydccimul24un3lmc9v5jp84kw210uiatqm6cefhdxz4hghzpvkcqlgv69rjo47rx4z5pmi8a5xf9augmsyga6ebawf51eg9va9gnw6hndjqvtysylcztpbeprscgykhwz9xe',
                retries: 7401438665,
                size: 8643716134,
                timesFailed: 6971413491,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '0v8aq271agts0gzye98z0dzhlahncru4d8ssy1m0ju0ohqjt44',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'lgu8uvw1z83vr0lxx05p',
                scenario: '4w55c9qaedzt6zk9bfil4kc27wjz4di06tt0lc81zxj0yh8ic3rjja0jqbay',
                executionId: 'p2r4g8zdudhd25bkjc6xz21g9ltkfon67x19p',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:39:11',
                executionMonitoringStartAt: '2020-07-29 10:11:17',
                executionMonitoringEndAt: '2020-07-28 19:40:10',
                flowHash: '9e6hmi6o6x0cerun2wn3md2pq4ahxuxjx2h5d3k8',
                flowParty: 'w3uqgr976r7el5dplg8m88hptcan6pyvxwvx8wzjkqz3rax336bs4mcoagk4m01v80dl7i4kktv9qyk0ckb86u14qt22pw45hkqs3c2jn6vgae21l1clfi2lvmwkozsgdyszeav8c4c474b91lejf491zl0aytmk',
                flowComponent: '0flss3bof3w7h4hwxelhrkyxi4nyf57dq2mbbobd4l4q35s57xz61x5t4rvd8x6qc7x4hsjgq0wfzjvcm8m802kj7o7t2tfzjmhj53pju3qkkorr1gticgsdbqol0h2hxoblc454b7iifkipsudfpsonc0082i88',
                flowInterfaceName: 's4slix37tpalt48grrtvl8eexopibjeii2xqcxb5ifoxlg8ougazei3ndagpirelyjhputp26iuzb9alkc5bdfgphc07009u5f9dm6k5f3ezvkl0v4pnrumkxxesv2ym002w33z0tetx9djlifqeu8ohqkqyixav',
                flowInterfaceNamespace: '6k86hlo1y193auu1i9ad4b28hxqgoazppuj9cjtd5m8xhluh391osng99dc8y20n7r6qtwpyg44h7a2wt5hfxmxifcucbpnwl5t3nch2q7wc4awquj6vfoa3ogwjt8hodyu3npoktaj2qbe3x5r65eysbdef4b4r',
                status: 'ERROR',
                detail: 'Molestiae modi qui id minima tempora. Id sit et molestiae dolores magnam enim laborum. Rem repellendus dolorem est est laudantium voluptatem doloremque. Est iure rerum dolores necessitatibus eum.',
                example: 'tdjsdgyygrivebshghaj013oat9m83zi6pb6g1qcybn5iizt6dx91mixvsxr76sorhz43hy1powwgu6m71zfwd7n1k04paje705t7sw5tsa3ys685ij0zymd0fu5ko9c6ai5rxqh6hlebmj063diys7umpjxpdfg',
                startTimeAt: '2020-07-29 16:32:03',
                direction: 'OUTBOUND',
                errorCategory: '4vnjvofjgvtos1ejpb14tjuw84b2zw2k7qm4ucm696037z7b60c7szp9rurm2z3vye6f3w09s2trikbbe283cm5xdltnlahq7yqmmkx1dlmmx63teo00bxfqwpg841iy7nvp75jwskrpvryznh2wbj8x708ppw8z',
                errorCode: 'j1pdifuae8uqkowuzi6il0t9oxjjjhpi8dpuhsj2u9oh9u1oo1',
                errorLabel: 363686,
                node: 4855818779,
                protocol: 'pjmj8uop0208reupjrz2',
                qualityOfService: '4mo1haz2cu9svh4izan6',
                receiverParty: 'n4et96ktl5dajxwsqtyux1s6cq5r7oarcqfiibn1izb51sim3meu3v60ac010a0vzsobn6q2efz8vbt492iukgdbhthm1br5690g240dcotkly73umgy0263vtmd73mnq8ik8zd8xntj3whtiusyc16bph6kj9q4',
                receiverComponent: 'i33kt5eoe1gam75rrr6u5u1spdgx0mp6v4xq4or18d0e70ideev4vh91zjdmyfq53058q1hc6cgsgch4zpuvq0bkw1nfe15mf8st8k9n4lqvnlfn6ary4kx7uqlzss551qotdq2py6b888lp9e9hkoqouslmyyc4',
                receiverInterface: 'the6wnx2g7yf8b133vgedfxoujyg7k02qtzk27mpgas4lexmfci2ewf7tz0ywrwlgzogk1i444gndwt5dhye9yb92f4mieac9f775nd2091sfsivv2mh9w3xnls1qmr74r51590rmndgm9w3fkp91gqme5btfm31',
                receiverInterfaceNamespace: '7svfem6kk5g4wx2gsrb5k6wvl1n2r69413l7yl2zkpstg6ptjw3phmhtjnldjihm9xqdepo7k31n8u5qlyyt4ns3pdc7yugxafed0yid4fcfatnn8zklooha4ap1xp6wrgl06q855afon22lxprll61hdbfkeo8p',
                retries: 1409205506,
                size: 5103017051,
                timesFailed: 8134210037,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'pow6nojcsfg42mm3ecpku5vxy6qmlkvx358fqx4veacp0d0fd9',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'luj022hf9bib1dls14p6',
                scenario: 'a5xwr8t8fihefq360uw98qyj6yxhualovdute6abnk4hfn94bwrgvmku04bh',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:11:16',
                executionMonitoringStartAt: '2020-07-29 05:30:04',
                executionMonitoringEndAt: '2020-07-29 07:39:41',
                flowHash: 'wmqmc7majn70be6abwnmv059evnf7zcr340cwldlc',
                flowParty: 'utaa8mz15nwfpk30xwaybzjr9uak5delr1n350c6ysh3xvpvhjsn0ccr3ii44d2spuii5879undeh2h6nifnf7m5wjfoh8xrgyyvx9967lwrfhgkcvc65t2szun8p9kfhqt2dc7ziy1nef1sfgr5zk06cvy53pzg',
                flowComponent: 'tosjwcyvv03nm6ff3c1wxkrpobwda8m8dhjgev99yas1gb2ix29c9znq5xp0n0lo6lfiwz3q5b6b3792r2ij7bq6n5rq7nhl0482sbfbppc6kf3w2w1ijk3e4nvs3ummwzeec0746ggmv498tfoza0g1ybgew442',
                flowInterfaceName: '3szbjlgzwbzxfod5837ndr6bxoe6awc8m4xc2frxylowhgsxfi10ri8xp5t08yjldbx1p9e6xihjn7b4q10l4083kkzjl3x7dduqjxnbbbudg5fsp1fg9y2sxoeq45v4b0cnqqp14usglahd8vty94jvj671r3a5',
                flowInterfaceNamespace: '2mce9ys1kdputmr7udmql64rudddmdsge50whjbf2m6hd8gcoxei2725gzr770ayolj95auv5dfwxjyv2qdaxxbetdri4wjvyt17uonq29n5m69ziq6k3gdtfozplcm5foq0cifb2uticmbxy6kkufqsbxjolsxp',
                status: 'SUCCESS',
                detail: 'Quia velit accusantium aliquam accusamus similique aut. Corrupti voluptatem atque aperiam. Rerum non enim porro commodi doloremque accusamus et fuga.',
                example: '7d8zfhcpeumkks3hprqmom3s73gzh9yitxn8p13cgco4ukwopjy3ri2n7278s6yhtylb7yc5s65awwcqy6frl4rd4p0ea4gz0auuhs0ilblnszb17ji3zvjdz3qnnfq66bjqni2gmk601yp6bp3cl3alcgc16lmj',
                startTimeAt: '2020-07-29 09:40:03',
                direction: 'OUTBOUND',
                errorCategory: '668i2f6sogepb7j5p8yma3ewdsiefbz6mqlpl9yqyj014ay0zzlotz8l9bsclrok2ud1alptykpte0d1wykzalkww325vk6kcjjyddgkzub8z6km4po5epavn76jinf00r48pz8wwnabvmtnbfnfcb1skv2wyp5i',
                errorCode: 'crco7t5gtw7s0g8fbffmdexe8oc53baonkoyr8ed6f76xrz5sc',
                errorLabel: 739102,
                node: 3807180427,
                protocol: 'q44pugrjcuunaklw19t3',
                qualityOfService: '0si16gfmnxjw6vo97bf9',
                receiverParty: 'cnjfkf3xx3dejeztxvn0cp99aseocpishf0zm87w7rqrozhufw58jwgpnf6r9ci5pu76w8wp40znj80fo3628rfx6hwpxvdfg30cxzkugeilhjp158appaexkot46v0ifkw5t1it2ov7o5lygc6obop0uztypuul',
                receiverComponent: 'uwjab2lofo4pkwf6rkrugqiu5hjh8f2gybvxhyhnlv0rlue09lz9ovggqcw30o40vtj3bpjava9sg2vgk2x2l3s2yinfx8m8jvlbqhkym5tzw6vng1vq9kflnhrfzrvirldpovcuncjvk7bki0iz7zcwrqa4ppit',
                receiverInterface: 'dxd444hvee4mjjt8pib670hfgfvv8pqg35czbs3f506y2npsxlfjztirqq2rjn8ydqzwbbah10j36v1tvy0i7yvgo1m092ze3qednploqskibgf6a5h9sdbvq5g15zddqnumesbyrw4xi67s7yp8zf8fd50fczb8',
                receiverInterfaceNamespace: '4l4u74fczdyloizgkossh1vr6ofyq7iis0bkkkioat0qizafgl4ily2e7fraxczsflwx1bkzm7xo8wrd8a2ya171sulq1y2okoxw1fvwb1r4ki6yz7ogcm9jppkrm7etxa1qyjbikqo5ryg1ukf1zo4bw4dpjl2a',
                retries: 4966525301,
                size: 2477015345,
                timesFailed: 3806303112,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'hnoyxrazsevgiv90e4hyq4bt8ujjxw81hy5yjy1doweps23s4xi',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '5ook8usyeptdezqgca16',
                scenario: 'ppbljnwl1jsc2o7h4p2ivm3u2eqh2ywdt8ti3033up0jvaxriihvcjo74dof',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:57:46',
                executionMonitoringStartAt: '2020-07-29 11:13:25',
                executionMonitoringEndAt: '2020-07-29 01:25:38',
                flowHash: 'k9dvuygscbzu5om50f69wi2kx50neeez96i69yji',
                flowParty: '2u55zzucgkagtxz2jjmlqz1ulo0aeq39rr51en67btm3k76a6uoqtfp3nvj4o3vzphzenpwoo78lw9n6gmpbptz9uxg18qyjlc70hsjf6cixk8pyd5jadylrwf6gg82s9nqbit20jqruiyuel3a5y1xxlpz9tzpa',
                flowComponent: 'pwc55z39l7z6sb50rcjfdjns0x67ispihh2i5eth1y0satf82bx5au7buawzf5idjsogcvxi7v1odlbqhkpjhf577o1abstf4lrtsrjd04oua35apzwhocayphnb9ranmejuqvgvr35dtw0ug4bpj5l175b2v54d',
                flowInterfaceName: 'wujo1m18rzgy6jarsuoemyn9hre5dq23efc8ifhwq1ym1hx4v9d74bvud3sim2sbm0hzaollh31perlggpw4fco6dr6pebz402ldkay639q1efptcsxj8ew7f787ew9eeezpm0fcuubpvms2ffuqewyv0scmzq5x',
                flowInterfaceNamespace: 'mmu209jbxtnjk3c1gudw92agutrg629a06c6g5gbkc7ynhjhtba8ui2yxvnmgga5z3kn052d3o7n38fcocsflew9z4b96esdml9rxch2d5xkyxaenrzq3fw9ht0zcywdgevhkbpwcqipskozg06tw4nr487f6dke',
                status: 'SUCCESS',
                detail: 'Eligendi quidem animi dolore ut maiores nihil et sapiente. Rem dolore vel. Dolores dolorum non sit magnam autem ad architecto praesentium totam.',
                example: 'czp0w2p64vgz40gz8a2dmsfa71g4itiq4zd0htpdte5c89vb2jcl4zogbj7imh2zdrb27xns43g2x7ozgczj4588pypc1zmi7gxau6bfi044ur89z95w12fxv0n8v0594j5k017vg84epjhsiul8oq5idmvv2ncz',
                startTimeAt: '2020-07-28 23:30:10',
                direction: 'INBOUND',
                errorCategory: 'pjct037kpqaxqxa9lphp452ldg7x7ezl8horwaykwjokxh4b6nfv6lt83z9a244c71s9ajwg3aqpjrqyywhbp7z4ivjy80dg24aiydta1a8zc9sgkj8niizwbhscciy42p7t1zpdkno38hp7uk1tnjn4st9ccqih',
                errorCode: '8ceqkyhhsspwk16ipdhnbaeab10gr75y7vn3sr42dr1pbnacaf',
                errorLabel: 323083,
                node: 5003278660,
                protocol: 'sj8qb7yy5m5m3bgkcnxl',
                qualityOfService: 'bh0m7rx3db1ti9gsdano',
                receiverParty: 'obo9gha571oscapim3mpfce7v2alzg808t42w424v59m61ivnuk0hyt9cvon8who1k3pbx6a3m3bmyzz8cxq36v7osyl1kjamyu8koztshtmguae12z9dl5fam5v7xbs7t431cooczesqwspbo833n30hoblgpcd',
                receiverComponent: '0cka3j42xdq8ukvbdozm07ktc8g86794s9e6vcjmludl3ovl98rxjoproo90v6lbwigjo22w5htt4oph0fi116t2qimi8fibxxn2f3jhze8bqft3n0c8bxa2w7poao2h1j9l9nxnl80v8p6pv76zqhhvoehahqth',
                receiverInterface: 'cn86ihzz0oyo1z8hxmsms1fthopmtakwluqlkt5zqaohasnf91mn6oo2m94309auwt3lsqxt0iao6efv6oihvgiktkg864mp5yvl4cie3wqv0inqk8ur3cjrakfziopv35yixb7rhzcp2o0vu3k36puieh3l9d3r',
                receiverInterfaceNamespace: 'lsxobrf6c2mrlp2yr1jieegsnozzo0d442xjikti4kogy4b1f5i63nuoks1jpsgp2nduwlcipmf99nfwtfeegisvdkk1h74af605zuq8th4cmwg0ltw9f53gzlkcs8k3kp7id7v7w8u7qps5it3yejix6oz3p0wc',
                retries: 7050074216,
                size: 3755914591,
                timesFailed: 4195415078,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'rip41ewe4gxh4mjyf5l0hq88iet3r0ptoymolsoyiju305su8o',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'tbgjay9sd92ezcxutfagq',
                scenario: 'lh05u6eh97x2csuypq9ljr34sib5eumbh0kcozqtbxc1nrrogptgejq4tull',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:15:48',
                executionMonitoringStartAt: '2020-07-29 02:16:20',
                executionMonitoringEndAt: '2020-07-28 19:24:04',
                flowHash: 'o7mb38139da5wc6ngfxslkin0xt16m4rr9wyolbx',
                flowParty: 'bvsjg1di3w3p8el3aiuzwmvyttrmrfjtkyfpgzhsic5quf7ajw2wk7pmf5e812jj09bqbwyjbow8i5g2fjhmf3otowj029ppg7lo97uietvzqq2se7ijju08aq64sz1o7oyx8p19wt2n7m149c4yvps6hx5icfag',
                flowComponent: 'kdnizgnkc3gp3iol0lufuelurjf5ep9z9e6idmdqz2y6cwv0pyohefb7k83rdplfjb7ouvpuhnxhfuhxk9j5fbpi89q1xqugi163fws5pfmoxo675y44mad5vujeiiht63ccux0qwfhgm09ak70hrciaud9r2e2f',
                flowInterfaceName: '57ejet43uj3d5k06n6efu85pd7royvrelyqr76de1fsx7ms85eoopmnsgsp2v9sfnaztdne6ss5dj0roh1zp77dkexc56h1k8bctcvue4v0xnq0joez9qqwgzo1p0lf31zj8c13uiw407c8u8rui28ib7to0lmwj',
                flowInterfaceNamespace: 'aqhx0htsyexvc42otuxm0hcrfsfnk7ghs8326ax13c4mqcnlz4ssg2e9v714hfl5lo30m0thoi1krzvwkbld8n92r0f6n7eugc5cazkmyyafggja42y1k75yah43cvhdjc33nkw7ryur95cregbu8v455th071bg',
                status: 'DELIVERING',
                detail: 'Eum reprehenderit quod sint. Veritatis placeat sed dolorem non commodi quidem aut ea officia. Aliquid est ducimus autem nihil dolorem. Quisquam commodi aliquam fugit possimus. Neque harum cumque sed et necessitatibus fugiat sapiente saepe facere. Cumque tempore et a.',
                example: 'nzdi521c9j30g97jlnzz62yjsr0cxjppeoh6fbji4g721e5jl9lle09wvarfyqnbn8b7bp6t0kahrig7e0yf4v6bxckdd0fjxm5t98svejc4j8yz0at29an2sklwyj9hftfqc2b45vzt5nf34izpgr3jvzhkplk3',
                startTimeAt: '2020-07-29 03:49:54',
                direction: 'OUTBOUND',
                errorCategory: '1p37pf5yxjdfm6rrxwrpi6x9qphj91wd1ah5he376xq0284blt06yi2a3i4s2wd8jhc2hc5373z5noctcv9p8cz89k8t9mf0l37x00o260kuoxdqxir8yp9d33fpq5gck1ydcxhmdndzhxggya3c97fcfn9cgquu',
                errorCode: 'kxn45ljrhneti1hvsuu33qqq0itfum25zn8j26dsja0b7rnzqw',
                errorLabel: 677046,
                node: 1998303360,
                protocol: 'kpiemi6o65rx3izjl8i5',
                qualityOfService: 'm7xa5h2z4mpz60j67wa1',
                receiverParty: 'gt96wwbhhepgayls4nuoh54i2shdunsc3rm92bply59pd665mup5v1diy88esdj44varn0sab5tdjm5x6amn0ht6ofdk17zxyew1et6xbmoosaveuz6ad4pn4ezhbuwceoumwqfirm8n2vr5osbodawd0dah37hr',
                receiverComponent: '4ftj7f5dlk6o5pr7ns0mfoxytpk2o7ob3umsqts5kfe8icgbn10gatc8mir0wfs9faorfmvaniduq0tuoqv6jf9ejfzre7hejxvrj73k43l1dctabv5v9yknlqlyft9sxj678ug8gr8teptxlco20kdoaie1qb5g',
                receiverInterface: 'n6c6c91jog1dd9llhclhd9i2zysmfilplvrf2s8xr7zirbnuhath9hj465vkmucorots5ikg2qlbfqo5dmcs6elu4mpdd1vpohn1di2zodz4v8dtniff6zmr2s6jwa7cddj6afknuzszkysp4b29aeoe2nfudfs0',
                receiverInterfaceNamespace: '2s32ffvxfs4kr6n11vkxra4zbvze0qk37ai8t6fh4jeyv223q2tofpxn0fwpkbvluah80wg0jotcemeaikx0wlf233j93zc5hl4wexe6f14684sodh2wo666mzin295bhdzzjpp0nya49hlzrmyl8ednj31w3h27',
                retries: 1501456904,
                size: 4480408068,
                timesFailed: 2655481145,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '092ysoy0tlrh53iqlfhkoqaywbdz34vzzjbad7xtab2syn732d',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'nhelk3z81k12ick57zr4',
                scenario: 'n8dia3z1kuv0l61v4rluf02d33vmplvhikvjm991krlx793aithlz15znim2x',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:37:48',
                executionMonitoringStartAt: '2020-07-29 05:45:59',
                executionMonitoringEndAt: '2020-07-29 16:20:28',
                flowHash: 'kp355fyq3ly3wjj9jo9n18m0oicos2w830a76gdg',
                flowParty: '3c6wzc8yxvtlldwl6rny6hu2qpen7qw1jxfgg7dppj494tpw5eku9n6oyau8iptzzg1i7ncq2m8tajkvw5ustinafhh4fkc7kltpjzf5u8ev855ne2ovh3pp3krg3pj9xin9bx2us5zrj9ia0s3dt45ck6657ket',
                flowComponent: 'tci3cu8zfpcv45gmyezfu3rf5fb32n1qwe9huhnqn5lj38wdvceai61r3ys7d664zn5sl3nh3kr9pdwfq1cn6i9djwb3ifeqsmzjj8d6dfu6pp52u95chzn9tfh77sr9bog7jam5zoyocsf9pvzuauw3q0l2cow3',
                flowInterfaceName: '990rpt13amo8tu57jrcnpus9ynd6651w22rvofzd2riqb9sbkld4kphrpilb5ymc0u7eo8eqiv040vvs1tr9gr07fys8pq268id2deglrg1hdwots0rpu3t905ih8iskqtpis9ru6fddv9yf2bnko211junxw5i8',
                flowInterfaceNamespace: 'oyrjkbis7xfjcinuxtmigw214l4z4xeyljjdhq4n6g0u3afm7twovkkuleqmlj9znxftzouvdr7kifg60ri004pljlxsrfj7uxiypettfnhi0o7kknacdy3jdpvwlq2okadf0r7epdpsmopszmdy7s9bntvgppq8',
                status: 'HOLDING',
                detail: 'Soluta sed sint ut ad facere. Alias tenetur eos corrupti hic porro sit provident enim qui. Ullam facilis occaecati aut nulla.',
                example: '0bltojez14rdju2p7s6dg6mljrni1pcorcp2iamgbs6g44pd583x6nhkiwej14z1inly5m29mzceicg3z1v6eomuajhfyi85xzoz8cj5i8qgihvbd7sgy7y7csvdmuegon44t9x7pcxvaerldeiy7v0pj4m5r00s',
                startTimeAt: '2020-07-29 09:44:01',
                direction: 'INBOUND',
                errorCategory: '14tnane5loe5dp0vd4covtm86d8wqj4hqd1684iudscn3u10c8ot2q7aqjgzmli6q8qnph4g7v46y66h57v2qgdjchfmlzcfkwdovd8whtob7rrhy073hvayr65dqap1y2on6hz9cz7loj7avyyexs8n7mpsukqa',
                errorCode: 's325fhbrs7arivds01316m7wvxyvwcmrhmsmj5zd6urmxdj0r2',
                errorLabel: 760414,
                node: 8036613443,
                protocol: '1u4r5208nyc3o6iybbvb',
                qualityOfService: 'n21wl5os31wrtjzkg8ft',
                receiverParty: '1t0xgwxtxehltfue1pmhxs2ey494xvhfxkqttu0ahnde47ynem4anzl6j8d4qfbln5c3msns1nplt9iho9xe30z4b3c2mqxvugnhjjqfxezlblf1pbunksik3ix7p17eek3mxjj4phqglkm9ydjwgsswjcav79u4',
                receiverComponent: 'e4hnp5v428u0gk9635eho9bcjply2tum6qf6kyzotja6uw7nbuq6hzj5eqdg1w3vd7vz9e2nqxjs5oq310pfhqs054oa17vrkx7pavs3kt4qaswlcc0esyyi9fst4mkz8309dpjigk8yh7s9eqi665sptdk2cq39',
                receiverInterface: 'vozbqkbcyk6rnee972qtxiuwde4fth7iuv22yas0upih9vyh21c5svsuo1z542z7114f8of4rqlbsbf42skt6s5th0n50cuucyapcylsw43wvjb26hsirr7k25gz0ofsrg218kjo4rgrxsn34objz6j5kab0xo5m',
                receiverInterfaceNamespace: 'qlt627axkp2azi59w5ewd9d51mpomf30uafpf1xaugjr5rjwm8e7hh33rv74jej0hx132cjhvdltw2pwqj6a7q6tjeiwze6rr0m0f4gnrcihnlgyxvv0mtriiggs0uoly4unkxsagqk60g88jkas1avhcmfp9vdl',
                retries: 7919246010,
                size: 6614726683,
                timesFailed: 8422398184,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'lfyx37tkghndnirjskaop2p6ginxh9sp6fdv0zqggkr9qexnf3',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '9drby31dbs0qllzn7bw0',
                scenario: 'c50jtazz3j2tflqa53qtopc3uwx03mujpyc4q2mywbwfrfglkevuvsqv4744',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:54:16',
                executionMonitoringStartAt: '2020-07-29 03:59:51',
                executionMonitoringEndAt: '2020-07-29 14:39:27',
                flowHash: '3yiq3xs5bs6jwk1hjcebbyej18yiijpgml24331f',
                flowParty: 'kfxmoe1dul1aogzu5o1expob1q29zpptp3ltwpynzsmh29ghriv3y0bstlxvt0uljwvygqvadknhdan4o3b472g1hz39z2ihevy05igq79trsjb76hv1vb4zoand0lahp2p688vulamkfpxkie78ve7lc20t44ccl',
                flowComponent: '4stp4yylob4fessrafwhbsf5umsev3rruerdhj45gv3ace3bzknt39cdu1ps2adq86vt75jp9ruu6difnsnpt6duycmeea065neqt7yl4b70apxl3uk8vua1tfmm5drhwfimq1ayf2gywmxtr22tn8nayaxd11wy',
                flowInterfaceName: 'fpmne1y82a8bdbscjvk5m4nr0eg4fvqru29rzrobeip9r2b8i74k1824ar16d4d7jaoqjkdmzdi5npisneucic2c361g833t233gy815cqpua40xdp22mid95gcirr9f4c1z5zynnt3l98nk9dd45zwvm7z8tmav',
                flowInterfaceNamespace: 'oc0q6ghxnwst8bpo96i0e271hsmz0u0xprjz9ed4x2a47ynr5ybybz07sg734txm3rwqdpxxygiwatrdm520kgiol0n926garbcrlt2jpu3cajeyqmdm6nue8n6yfhn5drhhvt0tokmjz9mfzw1rrc4yfc42x56q',
                status: 'HOLDING',
                detail: 'Eaque a aliquid eum. Nihil deserunt molestiae voluptas vel aut dolor perferendis. Dolorem et harum qui qui quam.',
                example: 'cmdsk9qoxy834h9il8mp3rnmipukg1xvzulpvrynql33k0f0zjgddddskwyjxofoc3fqo0v130trpxkudspkipbphwdegnxuu1ndwxh21lnta9cnvid658p5u27lweu21tep79o4w6wme4m8qq502dznikbio2vr',
                startTimeAt: '2020-07-29 04:17:34',
                direction: 'OUTBOUND',
                errorCategory: 'xiuaf6r1fcqmfemi18dtb4r79ob7tptgtj7exnajph366ac9kap6nymjm1hrr3tl7apfkw5rqga0yjw487xio59l67ppn3saie8epdjqz2815265waulbn00mtvskkr01c4019x1w3vd0mbi8509eidztjhfuqtu',
                errorCode: 'rmw2spkn4z018myv3n0hnru7zpveb03rs744w50f3u4pu66spv',
                errorLabel: 605195,
                node: 3010646588,
                protocol: 'vggz2j6gv3cywyrgfyiz',
                qualityOfService: 'x1ojdvew5x41su5rwcvi',
                receiverParty: '96pn4bvbofbralzkntqebspudrlbegucsq9t67e92z3dksjx7i174gdclzrwtcd44o1eqo7n5vkd4uuym44tkahilnj92mvftsm8v53fz2tkip5hkt346p96jnm0y3yjjddqrlrzbp0jhgb0tlsau3i1hoznh8b9',
                receiverComponent: 'fectj263trxspgndg6w3fp0f8d2wniyfzzmszsz9qip56tvjk2yba70nyo2y3k4c3ztwd57coivrkgrdpa7olzyvvv39rvglyatt537oxxqlzm7pa45z4h179amgfxr7eyu8huhg3nt3lcxmaf1rr167zovdcd4k',
                receiverInterface: 'xw6k6a18ac34ykwam1o5vzgjrqk686k4xyqpdv9lbrkt6ggjscvdpzo8who2zqhhr912hkkyt5h90vu1wxvn89dfu29xce6bjcc930cnqzag81oc3zheh46bm548m37ufz399am339tsxep90emhanfbs8p7pcdu',
                receiverInterfaceNamespace: 'mfpfuv9dcmml108w0eyeglquyhrjk1946i74ye3ko2rcu15awmhq0sqqzqyfgj8wxlxltoseh3q0flppl865fk2q0rrc59z1f4cz7lljtds802i1rbj3picl57gkd8cbzxncgk5q58t9kkz61zitu5cw236lq29n',
                retries: 1448745077,
                size: 7901087701,
                timesFailed: 8287204655,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'id4dajornah7sx0xzvs1mdbox426epyivpuiyhebmm54dpbn1a',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'ymjwvaykqpynd2cxup96',
                scenario: 'cwuco3nz41g80k6b2otudd2ej9tdy1cqoqypdzwd28otfs99jr5i58ngn4u8',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:14:41',
                executionMonitoringStartAt: '2020-07-29 11:12:48',
                executionMonitoringEndAt: '2020-07-29 13:07:47',
                flowHash: '6em28bx06rwmx3for7r8a91trbeibg2ump3saxr2',
                flowParty: 'hyx5j3113hhte514ng7k8xew34plib41ylq40vyccnp2m91uhy2vhn8a8if1h06c882qawgy0f0md15mwql398912u6of6yfiyf6g67bwxaahnzu4lxlvysz6ujai6u3pmsdjz3jfghs4vpi94b84pddk6rfak3d',
                flowComponent: 'dbgfzbxlz0csviy3q3flsnpp088dwdochv9angcbwxd26i17lpug1q6o2etcuxkg17061jtqlvtei1g65h2i9sln5qw1ltzu6mf5lf97ymr984f8l6kxkht6el8bpxpkboil735s0315h0ycj91kou52tf22v3r8q',
                flowInterfaceName: '7hnlufcrqoiw7x0z21ao6g42d23v3rqubohyhe403y6othnobj4wpinx9m51xlap8hgp87d2x5jcnoyqoxavdxpc7g1b1mukhlf1sug1tqwprx4sjzths7ffkl1ly0r92mx5wd0r8b9ayegrlefptzwvsnt8ztsv',
                flowInterfaceNamespace: 'tvr34c4fxsj2c8z516hnhzlq7pcxfc2eul0cwueebo67ards407i959j79f13uncytzauje45fvdk87qzgmfm5wlirh6vfa6attj2zsjhj8v27vqouukhe76n7zs4smozfflisidow3ehszvvw7k1ymsh9o6rj0d',
                status: 'SUCCESS',
                detail: 'Voluptate est explicabo eius est natus harum. Qui soluta repellat vitae quae corrupti et. Quas nam quia. Tempora ullam qui. Debitis et et mollitia iusto quisquam optio et ex praesentium. Quibusdam pariatur non quae veniam odio velit.',
                example: '9l740hp1k29jpzqwzm24mph0ozhqm1c8rh2kwznepxlt2tfzgzpi93iclkopp99yb2m3f53z4op9bxw6erfrt9quwdnr2gwvaychp7lnp14oyhs2make8fvxm9spgxov64f23mu7ghyp1jzsxm85h39839ha49zs',
                startTimeAt: '2020-07-28 23:38:13',
                direction: 'INBOUND',
                errorCategory: 'o645tfv0qc6hyjfmqg7517nrladx6l1neqzq176ivj3w27k0r2t2imr3557q5sgxayzbfp9s7gkxl1dthqf80byzvpplaw9ekmvqvrxh0fe0pbbxvspg2v6728k23s89fhw6ry6ysu9s1fj2im96asrxxxtx082v',
                errorCode: '5k18350kofpacpi2254cg0rboe3scg0ri4qsn981l2cuj36wbv',
                errorLabel: 425189,
                node: 1111819590,
                protocol: 'h7krcj29t15pydkfv1s6',
                qualityOfService: '0k5m8q7m5l6jq4j0boc7',
                receiverParty: '8ff7z5g67bskiguvbdk4ecx4g1dfit5d5h8s8c3d5esmks1nm1ufqb0jzrvc2dm17xf36xh2nz2zkbjyrsq1tr7bfy0unstklttbrzc9r8tssrgavcdatld07926um2n1ern0t5uyqrfj6mlbe9m51mtpnqrkodp',
                receiverComponent: '5oqn8979bvzonp9im07gvn4w9m3yuoe80wwwbl3l0kqmcp96zm6ca854fk8iqnxmg6lc7ko6md9ljx5bkzs153d3tcr5iylpsdhmnk7puz7gejv9sfae7rd5ox3ua61qfwtklnm7fbhpvprq6pkx7rv2k7s0runk',
                receiverInterface: 'v72vfk0aj8ah4lmk78wd58zeq6jl4xfneovod7k8cilnylz7i2td6ogb1ge5iacu1jme0amloz79eaxve3xvzwndem417xn3tyuvo2vity6j4xdcxjqzxcq7dic7uky0e6v4vf3wlyu042hguolpmprdc8gt5aco',
                receiverInterfaceNamespace: 'qnyn03alhso3w0h0691dig3hhjgib4msqbwhn1ctqnralr0bpuv96thgtbuhjg85nysutljdoh41txmyt7lunm8hr14rl15lcm3dcaicigdrds8zae3iik52cnhxhplq32xzdvkyxflyu89kjjm22bgtd86rr8ak',
                retries: 6795763354,
                size: 7807108950,
                timesFailed: 2674486235,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'hiz7ffogblqo9p8smms2bnu6uoqvsnkz3240vcipvh3kogt5vv',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'vjc8zfizbj0dybfc1qx1',
                scenario: 'vqi7o32qmsikikn9qn85z95uxyw1yn3jdxddnqhvckg21rxl1o1lz852v1jd',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:41:05',
                executionMonitoringStartAt: '2020-07-29 00:18:04',
                executionMonitoringEndAt: '2020-07-29 05:56:19',
                flowHash: 'p0jr9e9d9726yku7hudphx35wx873675hovj9a08',
                flowParty: '13mbit3no7k824y570y9e4vkcy2cwztj6xe9jm7kumoxo2drxk8n8f0ffardz3y27c31h4vv74jbdth6espc9p2z3gx1r0u3ykg14a8jf0x2nkq9d041al8tcrv129f26m3m2jcelcffrqzsllkzhde5enjjvuja',
                flowComponent: '8laq30aj6i17kxx5brtyqwj16yeaycyxi1tpffc7ny5me981fjqrjz78nrq8qrehg9nx7knge5skosa5x5em6f2bsa82si2vvmqhwhk1garwncarqzvxolis3qqsypce8uwhn9vnxbspu2no8ix5dj3rmhhqf8qp',
                flowInterfaceName: '0h3csn9maakk4zvnc3bcqh55ndyn3i4d7jz8ukgefj8xzti3n5ch5guk7uy6h5mjxownqukg8eay6xxxqlar1up7qreiqtpvsjtwxfyg70xghxf9zhk25zw72rrn54gz7s3gi71agjb49lezuk73gbe2kolysn8n7',
                flowInterfaceNamespace: 'pm79eu4cs52zxil5wmrhfqchbqflxcspwgegrnuj9h30hp4tvbkd2xaq6l430h997z21px26w71sf94hc5jlyhs5q89o1lng7xaulddn4pba0amrcefd9lbg7p6vg0py0n5ksdzwrur3742ptdm7qtmiro0bows0',
                status: 'TO_BE_DELIVERED',
                detail: 'Sapiente corrupti fugit ipsam maiores voluptatem omnis voluptates. Ut porro enim vel quia sequi omnis nihil atque officiis. Molestiae et at quae ut. Aut quia sed sed voluptatibus. Amet vel qui minima.',
                example: 'yxywla06t0bxx9mie2ffdz1jbe9x3kxi36wj914ph7311fv6h2o96z37r0si1ak5ya2duggk9swijljl0yij1ulain2uahkqsiaw4ppf3rfym4z5ctbfgar9j2v3uys6rpcu9w1mvpm0e3iz0g3e2tj1mmsp2u8x',
                startTimeAt: '2020-07-29 01:19:38',
                direction: 'INBOUND',
                errorCategory: 'nfxpg5akt3owtaejk9wummn84pojzugdnisyodrhjs0pvzckaq5hi3hazknorwp1e4w2246myl6r0zbt83u1uj7jpldh22avyxzhueieqar7qu84uqr6lc1ne17rh1940xec0t16c2cjicyhoy3x937w1kb1ah9u',
                errorCode: 'gue77fy55yvn92inyuq67kdsj7zixukkf3jhomsbqazir9eelu',
                errorLabel: 746369,
                node: 5271298701,
                protocol: 'x32r25p83ofth4iehrsu',
                qualityOfService: '3c5n13tblz4898xr4crq',
                receiverParty: 'krk6v5ofcl4mn76q2evri4yjt4ypamlxkl13mq0lqsf0ae0tggoijxrma1k1bw8u50f1nj1lf6fx1nw90moyqsspe4duqdtpi05cca4w6p9qmkhnpcm54wcrv7lsrod42rixnajohpbo78zjgdpylnpdkjdq8ron',
                receiverComponent: 'towv5b64mqwea0lelh4y54mpsivjlo0lp0k2cpue0sefma7ngm881nqgqk42v4hcehbhve9jxfcq3pinprng608wiptizqy11ia9hc6u4j25wsollluloskq4ak26vwnmnp3ynn3dqq29ctqpa17n86akf917t4x',
                receiverInterface: 'fzx7u4mbp7f8xz5emmr6xwc4c6tewm9io2mefqanxevbbrpobj74racl0yoq71gpdzs0bdv3f6xaru3i2k2qop6m4np9ta73839d1hxdwpbcgwpigswhvxidxob1zc39gn2dhisyljnl5yhlk218wxlkp3io7rli',
                receiverInterfaceNamespace: 'ivvqwsmola3q8qr86zixvjo090nfhffovoq6lwbje9bcyfnxrygc95spbnmmk1kwxfd3hx68joa16ajiihwwxfv2qx2g2lgzasmg6m3j2brjlxyfugwa3j70md8bijokiep6pxeix7zy7eg1g83sdd0u1uaqfovn',
                retries: 1612077816,
                size: 3516745885,
                timesFailed: 7463413347,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'vezdn9028b66ie4jgufpeu38jr3ygvo8a2imkc57esz8vibol2',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'q2fa39carwirnlsch83b',
                scenario: '9hrszc3lephh090csm4ydx54ybozrx3cnx099uixrkj8qoo3tb5jpcllw4r0',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:50:36',
                executionMonitoringStartAt: '2020-07-28 23:20:55',
                executionMonitoringEndAt: '2020-07-29 01:47:47',
                flowHash: 'lwczsbnkirkrhyx0yq4xdjdeg6l69b2jlhubatjo',
                flowParty: 'v8ne58ntainiayg8mwzz97f63d1nicku1f4vuteq4bmwmwgzi4urg9qt6jl6qvdvpulhej9a8azz6lyviyvv32d483h10l3h0maxm2509j7knjd8tx6xp6pjtc76zi0l92ov5r2rlfkcx9in6thack145rs39akd',
                flowComponent: 'iy3m5xepce57rp97zn72ibuj7mk07nzdzes7qt1cu2c160kiy02irqklkjdtokeiv1ql7tcfdsgr1nm9iif1e793b4n27vqqyqyxbel28f8zykgihgfxzq222warzu5m9s4rclaptm8qed4wr798dhz7f32g9r3o',
                flowInterfaceName: 'phvg60a2v220ya1ecfmw5d6qryp5mo795ftczizo66zuxbiebv81omnd6u7nxntwjxtm0z3yj74y4k2g2g4oj287kttler38xkjg3vtdymn69fa550w0uuoaj5aqwkrdm8f9uqm75imfnj5h6zet55ktgrcuoryu',
                flowInterfaceNamespace: 'vlwshsu5fkeu0rqxd5dd50fgwyj3rodul3ega7qa4w1bpzvxkjcqezppqvjuvak5crfrinumprfjqx43z85kuzlqmg0r6y642m5ok0uv3rj51h00li7ufsvt54zenat9op7n745qp2q3jk76xs6fq76nztzia1jny',
                status: 'SUCCESS',
                detail: 'Et quibusdam rerum expedita laboriosam. Voluptates quia eligendi consequatur sunt ullam magnam consequuntur voluptas. Dolores et ut fuga autem sequi.',
                example: '4u1om1apewr20836sldq2a3i4sajg4az8polpi9v1h8ppeuk3gwniyo57twu9ain0iwdp3rzoukalf1ghxtcyxvkh0rkzo3knzos5xtbqqdbof29j8ir94dqchesyyizzf9ndllzkndb2kiare33xh8y2yvcki8e',
                startTimeAt: '2020-07-29 10:56:57',
                direction: 'INBOUND',
                errorCategory: '6er5jx9c13gfk61xbmxqpu70t1mrejsaln9gdrh0i7ip7nonyagrfk5i98qzrr9rojru7y6o55p04is4t3x7nrb8od76poqei3ttfc3wnm5tvudpr7fuu2gwtust3p1qsj32gytqaqfn7zyb7ahk4d0y76pgo9vo',
                errorCode: 'vbj5292es4lor75y4jcoj6n2smpqbar7n9quhdnkdd1lyqh4a0',
                errorLabel: 690550,
                node: 2729235909,
                protocol: '7wsi2hnhhhn8i2racm08',
                qualityOfService: '3vtfe3hkrk8jb7tvccss',
                receiverParty: 'uqtpa8xa8eyydt2x9jgodkhe86marbw03x586cw3iihcmf3pimuwfbb9oq6blsna7i4mmjshdwpmz04nsl3ltis7sa6geq5y3t105visatvkaumbjumwrs1qle8hy8eyyo2cknholuwi8dpxhry65h7hyfwudgts',
                receiverComponent: '43esad2428z6kjyfs34ru1fx4qvaf3hkffm064rkbxycm4hpt5bkjgbyhkdte3giiwm8cohg49fjza5sfo8olcxyeyr1k5enuxt2jfus5a5a6379l5srj5efjkajssx56d6jbs9r9zwko7fv0d9qa0m5ko5f7s8h',
                receiverInterface: '0i34je4lhbdelntagpc1odb3y9k0qd5x1sxjz8x2w9vu3vseh9egfsretx86s2u7k7b24w77ik6vujwdxjcypuqnhodub8zrawk5y6gmv15bdnzy8durp6zxgfgidstukzca78yodqqkhysvjaz146avu5rlc2za',
                receiverInterfaceNamespace: 'r2j694k9xgq75tclrtehqsboeddhc64abkupnzg6lr378s3lx9vhkmnqlxzuqqdkkusnlqfkoou45l17vuoi200qtvtd8qlg4icdzpox4u0zdbh5mykczccp9fvs7ba6olsyv0nav7epe2mmeswcyd94wte8pqvw',
                retries: 6594793003,
                size: 2410268511,
                timesFailed: 8988611215,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'bn0nn7qvgcce9lsh9x3wqz30gdazwqy1mi9kx7q2jqhequ2hf6',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '5bw9ahcfkxxtwtwozwts',
                scenario: 'l1tez9s9i0gafbtd1nuti1xd3sa64eas2vauvg9fkv9i1lz5lhcsgsdl5vrs',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:55:18',
                executionMonitoringStartAt: '2020-07-29 01:08:27',
                executionMonitoringEndAt: '2020-07-29 16:05:54',
                flowHash: '0b6zz1sdex3t1gwsx93wg2037qtnrm9z3c5ir0sl',
                flowParty: 'pp3nzrmfzt15qfcixhwqibmlpo24kecw02ynvf5t7aepfea2tjyqltomuu2gy9qpd1y6v8ni7dqq8g9bo3dndl0cn9rjn1o9fxs32ob6c85cw7m7qtltnxxrm0alriudzu62k9d0u9xdjefsmaxunmhjtminptv0',
                flowComponent: '9nfidkt7vr9gv15mffb4e3nmvh5qhbnvmwx4xb6iv7va0gt9y2tahppdfojna5926jhvw0doemmucntdr16ulm28c5k35qkm961zf0nurxcqerak5vt2rj99rhtxgga3d8p50x8x6gizlwffpd8orvw84edhqdh1',
                flowInterfaceName: '3gq33wa0kbqg9x1v199bmshrcjgmxilijj90121vewki5wj17vnzcsproonc8ve032y9rjudgfcxfsil0q9z7f2653va5pk9fwuybbrdqip849lmsnw8r7rdh35ud4czbz2sbu66v41vzqp0umse25ki6rhjte0u',
                flowInterfaceNamespace: 'z96lmshbvdfj3rx0e5tzc5ntutj0v9wk1ylwrq30irrqd7nh6qi5ar942sqzlu31yisuq95qnlk0setdicvit5bbhv6sum9syy02j7w220ezmdvi9k9udrice9bmrvuo2qkrkmj02w0gk32asecztfqffwl4u4bb',
                status: 'ERROR',
                detail: 'In animi sit ut similique porro est. Cumque est officiis quia et aspernatur ut nulla nesciunt dolor. Voluptatibus veniam optio natus aut rerum qui. A animi totam qui. Quae excepturi optio.',
                example: 'vpj9v2fsy5msgl3f04ysrusxes683pyvicnubfbueb9fuxhx2win3sbdr62ryc8yuo0ha8ybld4t147wrpviudbrnahc5oahc83vpj77l0a6gut4b5f95z4egvj321m6oagseyf2ud1wd46c6n9fj5y4d0vwn3mo9',
                startTimeAt: '2020-07-29 06:48:15',
                direction: 'OUTBOUND',
                errorCategory: 'yp10pbun196aynhk5xzyrop74xk9g9tjqz03niirkqp30d8d72c929m4my4r7bbcwj1sw5mbhy7x1ri5fw3rjb25lusuo71r3utzabuppfjfjbn1d9yuz51rvj53ux2yzfrwk17nlxbxmmx6w49pg6d9e29rbo0e',
                errorCode: 'a7muwqsgvecmp7k2zrjxw2fxkcosbvnoxpboar8g1uz9ho6tbg',
                errorLabel: 642154,
                node: 5548870173,
                protocol: 'usf32l6v3sfb97qp33ad',
                qualityOfService: 'zbhoxzy5uwcix4iou2sx',
                receiverParty: 'fs8cbba7rxfqvd66snxaba5woyo7wqohw22n6zh9dcd9kypee08az3hu1epxxshzvgyrheyw8d8ci9iuqwc0a3g8vgz6b3ugfsambksuau4jweq4smnuzc0ginmhpwn3g7hlfl5nf54vkcn85oyj6mqyoc75jtoo',
                receiverComponent: 'y7y6yp18nhzvj5v6kevvprbgo2y7luzc7m15wk6n3ndw3bb6cc1nnz7fckvvnc9qkae9u2ib93igfkz9pzkt9aetw9sxpg0zr1w8d5ln6nlrkqgb917z8mmtlwqmleq9goyzodqtfk0e3fn4gw0ze8a64cf8tw0d',
                receiverInterface: 'udp9astdek3j4j1p1otftfk41ybk0mbsem1gy7tystb5i2oadd3l9aip2wgb88yswr58o1nd6fpspyiqfsdmgkvj3eib9rhb7pnhmd7yzl7hmykr3n7zg2walagsoy05zxh67tjtkldr1g1ykvjmgob4876783s9',
                receiverInterfaceNamespace: 'eyc1vnlyal46x3c0od4eax6mvxi8porn3t2aiopcqnj3vbm4fd67p2h4hca4ys34qxnxs3sa80h9knv42o4tdr68gp76zw9enbwjqk525vdyltqnb9y7ff32tqsiukt73zes2c7xbb62gotqvj55sznunv95b09o',
                retries: 6349121406,
                size: 4138850003,
                timesFailed: 6616623321,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'bohdl4mt3q1lllcrco385lgn0mqenppvidu4e3vjcrsxz1eism',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'gwbd1t1n7mzx6ivxmx12',
                scenario: 'b5zqibazmzgpsgwn3ra5iexlol0pewxma5bal5qko7atkjnxhudz9q6axiop',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:19:57',
                executionMonitoringStartAt: '2020-07-28 21:22:43',
                executionMonitoringEndAt: '2020-07-29 07:37:02',
                flowHash: 'cwpbpjb0aatd83xdr1xc14bqzpi2dtwzqyh1abkq',
                flowParty: '906th0iibfe7vkeje5g9q7o6ldr7389188amp34naiccfhlrb21nftvmrw4cme7mh3vyk9j1u1cch6o56uolx64y47jzr4mvhiwdsur95gh0cc0d76d4ac8ptaacjee4abeyfu4t5x762t6ks2s7wfldn8wtjuos',
                flowComponent: 'h0s5ooxrdb6uh9xtz6e99l9aqe0tgxgghkbl75viwyrx86p6xcypamp78jow25ivqxtduy42cxoygaywteumnuhyswh79jgvungrh92s85b5t0b5gs8rztp5l6uyfr8u09gstgtv0f2gq64wds1lb62e53x4lxt0',
                flowInterfaceName: '0ldtyt8clikyghgil66hhd0seajrjuiagd6w41ddvems5g4ztgsw8elzd9lzcpb789x20c4unjv7twa95trdqfogglw4hgtbilundkmil1ky9yfkt377q12hr5escok9b66qhcny6tymfdajcowdaac1y5c0se6l',
                flowInterfaceNamespace: 'u5mdn66p7hxc1lhmjad2uj0pd0qb86eunjgbvgsillre8hx2hu8c8geti4qchmsho66os23qki86k7nkd0a344lh5qls9gz5428ks3dtdmzwjbdaigrtbxae79ynaya8oqwhnpjo8378d1pja6wu794galio8lpi',
                status: 'DELIVERING',
                detail: 'Natus sint iusto beatae quas necessitatibus harum aut nihil ea. Quisquam reiciendis perferendis. Id temporibus sit necessitatibus nihil occaecati harum repellat laudantium. Voluptatum quia nemo ut.',
                example: 'cxfsz4dmkm3hg6r0q7igrlvjplll1i6fs0m18ys7yysl3fogsjixzd4xaulizp27msoxhmx6yvyb7w6ozdr3vc2axfs1qjn0vdjue3966boa9obp02x23xzybps16jso7qhv7b98dj09pcfxnyz3xox3b5w2pn6g',
                startTimeAt: '2020-07-29 13:47:36',
                direction: 'OUTBOUND',
                errorCategory: '8be7e4at1w8pzrymv4a6jz9i3rm1hv5iv42h80y7gnjzh39uk8zifsp08i8uawzh0yughh9jd78xodiyvjvivk8deklf604s08g720fev0oh0tyclety55jteav93vh8e8ixwgkbbqe0mdz7t5k4pjeihj65a6aho',
                errorCode: 'qzd8gy01ob8rzy6attnsb498ga7kc1jmpcnd48fk6n6g6iv6gs',
                errorLabel: 298899,
                node: 6153585481,
                protocol: '0tgdq8g2mxwlx79xcj2l',
                qualityOfService: 'exy7i2xlf17mqhprl5ve',
                receiverParty: '1la0pc53z1lk9i34sidfx7r979ijwghutyzwe013whhwjjaijjt880kykcarvsnrrb1b3rq3bfrlqpkftz7np9jg4rujlxe29wkbyv5k5e7ph2ygl9a484cqwtmh0oomdvu95xa52kr2k08nmmkzl1x720wrnrsq',
                receiverComponent: 'shn7mlmsewcwl539qlqwn0hwpwrzxnlnwv03vmh0wnenj1hu3sepeh8bfav6z62xxl4fvpcky2m5xn1epqp2glh56ck80yts0iir22b32pzctq81gcpspe0anoz5lzl6t3d2ghg83dmrm9hl6rt741ishmudyi3b',
                receiverInterface: '102bakdynhs39cx1yejigvhky38xzpo9a1otwt4hb0uby25fuul9v9nc126jxtqus5mu5ukpsgfkomftua2x8r421yltfhmc8gvu1v9t1rr8j66yyciei7d5xx6q7r0bdeoeyt35o0z1d7nrg4qo6ze4p25eq1bq',
                receiverInterfaceNamespace: 'd01gsivwmgo57zjunloxzh89o6rcblbb8b3zvqumgyo19gbuw4rh7byu9tj3dtaojdktq8hhw1fwe5e1c9gxxdlfjjfe78m3gzzekrqq41avz2g5xp8csl6zdyljimfs3p3wscg7d12prifi3s59bu5zplup11fd',
                retries: 9540544405,
                size: 2799476138,
                timesFailed: 8128673242,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'tu72uj48mbvwtf2n93i4z29b7iylalamytv6kwiuccl32lvrrn',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'zkqcfannk1ir2m9i3eng',
                scenario: 'lzposvmncm7gvqfwx4iignvyrgc768t99etdwb3lug5hjbtwgda4nmk32vhh',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:36:55',
                executionMonitoringStartAt: '2020-07-29 09:38:59',
                executionMonitoringEndAt: '2020-07-29 03:13:19',
                flowHash: 'm56fqpd921jfr552pd04luj8c5fdhqm9hz0ur0al',
                flowParty: 'uhlf4vitc4ezrdahkl7xx4nwwxfdde2doxo4qdzghejo7no5glp38xhcc72tv552w1omeou9w13m555shjlzqznznodbqezd7a09m2q2x3ah39xjxhm2cxj1sx31ovlrbis1dno3bzsp41528dximy6tcrg81liz',
                flowComponent: 'nvgye22fiktomha9mndve2r4cewz3740jrdoacqqb6g1453r0gpui6cf9dilrpmiveai1exp1paj0irhg8ege177178883swgf1fb0w0yt7ry41ffvvf6juft2jiqq23e0kakjicq7qfpi3pnr8crfstdavt317v',
                flowInterfaceName: '1rvwsy1wyo3nw1h9gvs1smf7man6egmt3kmmzyya6sg439gmvfqqxg1nqqrrcmmbia8adbj2x01secv4i0o38te9ioho20sz86nd7cvpih2j3hyphk51m0d8zobui8z4p41ylzgxves4tfpo5nemtrzaa0dfmkgx',
                flowInterfaceNamespace: '7enbs8cq957ip4qwmv32582vl85dbxvtpzmt4864kxlwktxqyqtnpiqcbox88jskmn8o8p8nh14r2443uhpbvq942mm0f0hp8s53lsa2ow5twfzp0niuo3hhk3iwmhzqs5ta0gd21pl3t8xyj3nzm2lhoeq58qag',
                status: 'WAITING',
                detail: 'Quis sunt repellendus quisquam adipisci eius necessitatibus. Tempore provident sunt fugiat officia. Dolor animi qui ipsa est ipsum. Quisquam eos ut sit. Consectetur rerum corrupti totam dolorem ut eum ipsam nam. Dolores alias assumenda.',
                example: 'hvze0f9xca373dbxz7mizl2d2h7b1jshndze8ckq63xwpj0k94qub7tqrlstua17w6i6qaveax9s7hsjipj3og8xvjvdc3fns2ouojhumlw5frvpogj5lp7sp4b1dj5qg9jcnoyxyzdy8qlzw92dabkf2d8pyxzb',
                startTimeAt: '2020-07-29 08:32:56',
                direction: 'INBOUND',
                errorCategory: 'u7qg5a1it1e48zoe03poffmqteetrjj88z134r9cmaak5ve6v93re79i6h503z0clqpqzwa2glmuq3bpty4stdrds76eqllc5hawenz9og9k4t47r6qzrsfnsfh75xe4zps18mtqh2imgvrpswg1xkai9at1u226',
                errorCode: 'xe7ugw2to30bthcdsvi3tzfmv7hm9s13iqthrry55tohjfs3hzy',
                errorLabel: 652989,
                node: 8798170838,
                protocol: 'x3wipxrw93r85zd19em4',
                qualityOfService: 'm1pcdxum031j5xidbp9c',
                receiverParty: 'uzmrgjn9bfm3ajsyrtmgc7hvejvwaknw45ekyw1txp76pebjf9o9vqm6cuctnvma7x034no7mjujup10jz5igzhoalj8b069l1be2ukxfyqfscfocsf05mrj231j7lkm5c6k7kw1rrpdmq04hqiv5trlshkls41f',
                receiverComponent: 't0mzdjqp6603a3hafnttrgbw6hpzmu8f105z1awz4a422xb8hjdfgjxur8hot9r9wtguekbu5hc5ku099br6iezqi1epqsff6cq91th5sdkoqw61bmq175zz1irga2e5j76qf2jrm8wzwswzfyneoj9r9nkpve5g',
                receiverInterface: 'cuxupka88jn6129e4exmcfu3kqwinscpuz6h2622iacprwbi53znffi9s8skr33o7blahz4f2w6pz2uul1skpoeuhkf8jfd00h68ierg2wqisa7ielmpjujd16qmz5vyb9dyyak5qm4n47m8vpdhygjirlulv6ig',
                receiverInterfaceNamespace: 'ayy1pa3dnxzssd67rwmq3pe2o08pf6pg7i09wy5k3cjr6knk9d617wzpgo6csc4hf28sti1i9xcn5bqr92vfj6quprdtmndgrpnrrjjl11o5m2zpxzl87cc8bwpeaecz4wglvxty7gve71rgmqyqb8adhtakn1md',
                retries: 3488569643,
                size: 9188841471,
                timesFailed: 1860014606,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'tn6afketcg86zkqco2kra8htdpc64lr6fw0ppt4zpyu1ytfpth',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'ycvog5zjjnjhtcawrj7n',
                scenario: 'rdtxwi8owaxht12x81ddu3jn8umaofpndv2sa2qok79npo4y0fjy1loa4dd5',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:17:21',
                executionMonitoringStartAt: '2020-07-29 08:12:15',
                executionMonitoringEndAt: '2020-07-28 21:18:03',
                flowHash: '637c40sfk2bq5zyj6zhxaihehtnder5fmtiwxkg3',
                flowParty: 'c2lorrfo2vvi74xkwb66975gvscpedipk0olyuluxzpi80apvmmhzetrl1r9w3be7egb0mket8zu2vx01bnvd7szclso5dgpxxf1oif2ng5ayb162t2gya4eacwytfxdtwl61k6mljnhlkj35gl5u10tal854cvx',
                flowComponent: '4t7vbpreivhp3p051d79y3ved27qs8kr1z8ues9pixqmagylio8344e0tdal5rr0s6mjzg0mur3f8w9awlvul0xbsbkkz7j43ktaodas9rksrylbfz4g86g7vq9l85dxckg6iad3tlpom3uufhy2jqtvuq9mbooi',
                flowInterfaceName: 'dbk46bmi1l5sc6bhoari6egrj6qnovlv0nd4821u79gukmqwga9pae9whkb62m807coazst65dhl5y9rp1hynrcyl7inmia8ll4a49afsc67zfoeuqtslh385xmsac324hyesp5dw5iobh3vqpeioxwksm0ptyz2',
                flowInterfaceNamespace: 'hbom4b0965kgnu3j7j9p7iu7v7ie7tqutikmz4uon8bz5lntvczk89mj23x3dsin3y62ke93rlu0zzitdfewp3rt85zsn5ib74i8wwi9uhp37sya3eb2hjfced750nrsc9jli911mbjsn63chq36jp7xu67x5lnf',
                status: 'HOLDING',
                detail: 'Non qui sit et. Minima suscipit maxime et quia illo. Cum corporis sed dolore numquam qui.',
                example: 'h5ut2wlzk54damkbedxjg1rm340t6unk0ml17e8z97nhs0ds1eintvumrx239i00hg5fem2265hmsmt277al0mgwxkg7dsz86e9qfjoie507jzeexvplzi3rarzs8krd6hi52ytlqzv5resxgzm6lqwszxfhe1r3',
                startTimeAt: '2020-07-28 19:01:25',
                direction: 'INBOUND',
                errorCategory: 'jugy8lm9szob50i7q6vdtrgw4l15mhx34edsst3rs6a1xjd7onkuq9k21gy5l0p40okpr7fzdw5bss8nrkgagtqqvwb60zkd8cg03cb7ih40i9y3k7gi6x5u5kvf5au2c6vjiy7q0aznzcggs3wqxjzh4lxvavlb',
                errorCode: '0mbblvjw3cfijfh4u4pbnmr89rez2z8kcw7s48jlqq2y8687l7',
                errorLabel: 6216722,
                node: 6796731167,
                protocol: '7idkf56ruskjqgp6m13l',
                qualityOfService: 'yk4l8xjluvce0lebl66w',
                receiverParty: '182purbl7xo6cait24qz0c4awtt5p8wtlk5khy0nq0swu590kz8i5j5m7bmpiq8zrq7vbpzf4ck64ab5cztzomjx2csb8cdcklrfp1umhxxsby97flx1jbk2emsbzvqadj3b3vsfy8vlmcnrl7mipau435wh7r5a',
                receiverComponent: 'rt6g254zxef6448vcv819lvh9psrlocj5gq3ycxzj38svxjln5csd9rylwd6z27xet3v0njm5a8n48je2ja0ha9o7qxhnvaczevla5i2vouki8bzsf6803difj7b3q1jhwxvqd0sfjk8yl7ek2kwl15gs86rs88n',
                receiverInterface: 'p9k5mwdkz7kvgcy4o6evdszo7w4h0y5o0433lvgaez3pszzueaks5wx8v5wo5rs2a4m4taauyi5kwzyx7qzl31r3psvu2hxdcs8w36jjtudnpmox52bgnnvu649csqz4doofc0yn65022rufe9r6tr7zfwd9b7eu',
                receiverInterfaceNamespace: 'iu4actnza9ynuomuuminezq1h8e6ix32bzxf1wu6vjwh26qogdoufxj845nonu9nrb4p34ibxvikgragmzmyocxusgr7xze6qrql7f4tt4foz1cmq0lc2pez8o1imun0t4eaup9cnqcsurknwn878dx2o4ikvpec',
                retries: 2356601330,
                size: 2525831096,
                timesFailed: 9895406660,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'sup5uiccqujj2e0ct0d65pxs6du5gqdmnjzjzckekscgfln23s',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'ans5ldwix3uank4gey7z',
                scenario: 'ps87z5g9mqibeuq2057fq3w3u5frvi1nvtbf9l2gsitxd6e9cxn49i1bm49u',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:15:51',
                executionMonitoringStartAt: '2020-07-29 06:03:32',
                executionMonitoringEndAt: '2020-07-28 23:29:28',
                flowHash: '3bn7tkqp9s61625vsdudndgv9ipe166sdjnn50pm',
                flowParty: 'gcsdsq8pcf243kt59xe49i6xo29kourrkn6zzna03yzgqcb1cek39x7e4kz3tvsuhqw4vrbhowilknstnf2977hx2kyeo67gn10bfjvzi7mf4r74ullste51yurmj6y6yj30ooaxqacw56mf0hwkg0u17fa5hwkz',
                flowComponent: 'dyxrwy270joh08aqdizvvhe5bzynskfx4ahdb1uev60vd7c6prlglz0bwj3tohspunkv33197496iac012hoqrtbanid0e6nodhbh39kh5qj3uehm81a7d0rckkie1kppmk8q1kl93jkkuyjtmkpn1ncf6hr6g10',
                flowInterfaceName: 'v2z59xsy0yn89llauw6pfxt9r1f7u204y2aos540sn2aa77w9144yah71un5un1hjav251q0lbevz0rjhrl9kww0ayk8xnvksl7ikofrfrc30g0e6wt9twgtodys7rd5pqes47gqrwjb6hosr5m40g2j05hq4odh',
                flowInterfaceNamespace: '6ljqad1m8w82ef61wz5cwh2i2jfef4gwcnosmfu1u24szamo4hac4n6weuabttdzh8yf6u72lniftqlhi18k5l3cvz4myh4o7r4x1yzabkgyaaccwgjzzt0izmlmw8jk8oy0rl82nu2wb72dgntsu3i9e6xftomr',
                status: 'DELIVERING',
                detail: 'Quasi sunt sint soluta nesciunt quo nesciunt quia optio. Dignissimos deleniti explicabo odit ea unde quod suscipit mollitia saepe. Commodi dignissimos quo aliquam rerum sint. Recusandae quae suscipit quia molestiae delectus cupiditate provident. Voluptates ea numquam. Neque ea id minima accusantium et corrupti nam.',
                example: '0iqbaifntc8827ci5rhdc9n7c3jo6mjhddbe7txm0yc19iy9wh24os18n0y7cwj5dlnbouqhhujfolbrku6ys2i3t6c96poovuezc4pdvpwqqcscopgp2mnw0clu2v0odwcw6ka3e60rpxkiyulgfc44ai8bfal8',
                startTimeAt: '2020-07-29 11:52:57',
                direction: 'OUTBOUND',
                errorCategory: 'tqhyhyvi2lc57hbgbrfpyibui6329fz52votxe7a9do896d7vwlfpmqudgj8eu8zjuvi8gnu0cwn8mjsa5gx4eu2cwx7czuyhh0x5qpdvq3n15hcahsxhllqlahig19fsevj4egik370t7sa9d2lug01ftr056sr',
                errorCode: 'd5q8he8iwoj2mvcuqhz0qs31ko6a4dgjkt35929b65x1amu7yc',
                errorLabel: 434798,
                node: 27384447683,
                protocol: 'm7koowdrgjix3n6n0ksr',
                qualityOfService: 'd77awj8gb5fx62noire4',
                receiverParty: 'inxtihc678kvspp4r7g71zw5j6girdug0n4cblk2je1q9fl5lo2qeg9wneze1gc0n4hyuur1zqnvirzqcojoyuxj0z6uszl4862nu52f4pbmcm7vz5w0vleigktz9rqwry9g5r9ume7o0xgilbqc4kohomeknzkx',
                receiverComponent: 'm4j3yznekgni7h62tisk69jm2exxsn77d63pe6f7at6blix50toao0veojiz7vz45008ubjsjpdqwh5ghv8biwhz3e1rrdwvpdv42qgy1d2nrf24deod85pfsew5ol6u0qduiw98lsw5abmys4dto7ygm99aget1',
                receiverInterface: '819brwhfg158lu0u8iic7wqp079nnpjpzgniewogsm4b93kidq66px3f2ofgpbtzrj73qvtw7f5hhvopcx7g22gl79t3stv4rgb90mo7vj3jge48en4xr1ink1lgi1ffigfeswpba2lygln04yj0dwp9pluwmf1z',
                receiverInterfaceNamespace: 'a5ncxw9dt4humc25r6z1og7u5v3er62jtkb25g6699rjoawuzw6iibo39s12x11blpthgur93kww44ugwt37r07tvx0gt7ni4b72asx6ho2qzfpq0cm24bxmrj0xx1wpcmg9ht6b85am5b1w9rsjql0jr7oc50wp',
                retries: 4734203595,
                size: 5845631409,
                timesFailed: 3759497058,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'cow4uglwjfe2ntdqs65g4mj0ybweuuajbc8q245z90ja3c78sr',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'wd3br8e8rljoypasywlr',
                scenario: '8mx4u61m7v8ysub3k51r3i8l6tfekrxpb8sr7ypdk96okaf2yg1gau777qd3',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:54:02',
                executionMonitoringStartAt: '2020-07-29 04:43:42',
                executionMonitoringEndAt: '2020-07-29 17:31:10',
                flowHash: 'py9llwtnsvfu4t6jtp86dfiqvd5i03wlqwr3tr5m',
                flowParty: 'trgj2rd5jr1e0ps58nl0xdgumtonptuduywh2r1ki7v7ahl6xm6t4tosv2zst9gmhq4jbywq3xxm9a2vbjfgj1ojduuwdtkoyct0qupygven8q1qcaxovok396042fpwojc780sejpbkt5hqzwn6qajqaqrtupg5',
                flowComponent: 'l3e9z9sj74mu1vubwwpfkdwft7jnyorc57ida35h8yhrb6n5mnlufa2nsqwyiubq0xx39ulaeq3uwf6t4k35r0hiksm1anltcmk5ad4led1w4amgrglpcg0aprl0jwygor0dvcxatvb7y1g093f1kuzbgta4jt4f',
                flowInterfaceName: '84e2o5gf7nbaizv2xjimoq4xctdi58d1d84w1ztzyf0b8i0r6l23m8pig3st4foz4j6v9qv3x92zizvtohwzk3wx3zi08m5t3tovyf06rgiogafkcx4hq2lfm8ys4cz0rjf1255u288m5tskzpzuznsqv0u8f3fq',
                flowInterfaceNamespace: 'swy47cv7bt0mp7p4rrbow71x64sqnn7k9cwtnkp6u638i8fqxa0nws2kdaz225afatv0806jkdb6bnbf1k8meeu4p0123jgqlmu5l8b3hw1xiehp7fmmv494wjpgdqzkoko9b3fx2anjiidr8ym9k93618eyz0ta',
                status: 'DELIVERING',
                detail: 'Qui nisi consequatur eveniet ut et et. Sed et mollitia non in architecto quam. Aut error doloribus neque repellendus. Vel reiciendis a qui. Mollitia perspiciatis sint aspernatur dolor magni unde aperiam magnam nam. Eum dolorem quibusdam quisquam provident possimus similique quia.',
                example: '2u45506f0v372ri4mqq6ncz1xmaql95y1behj59qkwn6yqlcc6p636hsra60a45bl58trpfxabbdc4tj78718fji280wxtgnhgib0jfiva5nsoiboiesqpu8f7f26onff95hmqz0lw5l04zmnkoe4tmz4rxrasyl',
                startTimeAt: '2020-07-29 08:17:52',
                direction: 'INBOUND',
                errorCategory: 'dqgdj3m44q1q7yktoh2ovdirux9zeutz2s5acm79t516158t0hrjcqtks3gwu610u3ncdofd74ka4krq0xfh3jihncom5lexw5krby289kyg9ugidhtw28128krzifpc5whus5u97zoanv0wlg3qm42hprrqeqid',
                errorCode: '1bpwruhf0rhtrdkr2re2dbyvn778kewniqe1umb6eknjwq7p9x',
                errorLabel: 470246,
                node: 5014058425,
                protocol: 'kvmigf4ahr4y62so559aw',
                qualityOfService: 'jhxwd4fimhvtsroxtbuh',
                receiverParty: 'rddbzc47az4uftcvvrcrgfg4wzg2dopnlw9qgnwdfghnqlnmarepc47yfj2dnhrfay129vm3h7qoajtxj4msuy5tkw8jupkqcy7743q6al8l5n09if44tlacfog55caq7s2q8u8uqhn4979lbupuwh1s3dpoauz8',
                receiverComponent: 'v3crj0cgb6iepuxnx5a6adzo1xset8l92b6edqzlfd8nuyjp9ghpxnjgbncun0e6n2qqdtjlinchs1g52c1z6ljvzyx3m4dtzzhqm3jgbaa82katuxhck2nipmusgtqrtwkpdumepvst5ao9zvt6rc3qjvvatpia',
                receiverInterface: 'sum89idoe2fh44byeve2e95mpbf2fvtw163wwx7zom7uk6tfhe37k9s3a85j40p2erhdat1dsbhu06xil8k1uwsbbbc071ffqsedj2zhjdwpfiljdxig7e2il8h9fcm58j0dzfeabsjiu2b4ah158qgwp685869w',
                receiverInterfaceNamespace: '6ok7xg855n6qgw4u1h4b245o0s6d2cbru5216xj7bwjeko7f4egbr26wzrnyba00faqsaugp76f60opjiusy96szydh1hqh1nsvxkiw4m8f95pki9lpzu0cxqc30zjark0636jt0psa5wnzudzzl8ryqyjai3add',
                retries: 1834819370,
                size: 9193641655,
                timesFailed: 9714689174,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'gjihwxk78i6fvoz5zfvy2wtc8kgk2oe8rmmp2akmm8m541vkdk',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '3h6q8qvgujw82f2akfkm',
                scenario: '9p8p9heew31hztwkt3fo4gsbbyv76beh2gtag72pwdmj8do5mvgyh3yq2enm',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:16:52',
                executionMonitoringStartAt: '2020-07-29 14:14:33',
                executionMonitoringEndAt: '2020-07-29 07:15:53',
                flowHash: '8fhbohzqix27tmhzgx5ma5mc99b3il3mi3qwvq0u',
                flowParty: '4s0a0cobvwpbbr6z54mg184fbyov40xpzngvsseicr9vcnsdf5fngckoul7oitti6xqrhim5ttd1jlqqv5oydv0q892z6i97aqx35d5amp8gun78mva1giwx4uxpjgn2es3swtfwyheo1vg3zu5lr2uvpiphgxi1',
                flowComponent: '6c30uonuvhitpw1a2ntjp7c76i4hq03xk0b3q5p3unab08287k7011xe4zcaedc1hlwrk72tiivm9gm95r3dwed04ee7o1dbzbuvnsyuejw5i5za89kvl3pi7oqqrmo0orb8z3ucusrgvz3w3gy9ches963b4hna',
                flowInterfaceName: 'qyk40a94mnlqcvjawos1pch5j04w3sxr2m8rlpxfg9p9j4rf2tmcka95qmq913p8wxc4u43um4186my02x0to1tlsl2jnwmxcisjir5db9uzbnpunu5u662yz9nd9abjtclbhgq43c0f5z4wj5qenjz7gm1zky2f',
                flowInterfaceNamespace: 'vjoeqege330u75v4yxlxb7x0uk0jtdxu3kkj8pi6u00liq1uwl7j7mgw1095ejgxza8f48tkn3jezv2k5ckrs5jjk80ytpecmj144bg1fyku2pbbnf1fkwb281zptadxxeoq9ugqkq45rhudxntytzkqep0b1qb1',
                status: 'ERROR',
                detail: 'Rem tempore tenetur quae. Voluptatem quod similique aliquam nostrum mollitia nam aut. Ad sint quisquam eum qui eaque eveniet. Rerum incidunt asperiores in et est. Et error rerum nemo.',
                example: 'k79muflcu3br5rlhd48opj7byolyny2t9qzf6kdwwxl3ybowd4q39y428azcqadxjvryq2ebydf10o42ifs625spbxhucjbulltg8f8r0r4woaubmxgh9c4zmf05wh4jrvi6hkjy6c296ol7b89o7bkl0qh95i8i',
                startTimeAt: '2020-07-28 22:24:15',
                direction: 'INBOUND',
                errorCategory: 'u3xv5d6ye0ahenfy3f1kkuwh2u1lwg6wiru4d84exiz79nht4nnh1zuwa71c9gwmwmncv88wwyhu8wj4b5sv98fxltwu0flegg7pq91m1j53blzy7e8ewrstvftilrililmwt7p4x7alhufgkaqrh4jxbueqrj4x',
                errorCode: 'r1wft2nw6zyton9n5lphl3ciyq4dq6z6e5fhfcz187a4ylvh80',
                errorLabel: 485004,
                node: 8610881990,
                protocol: 'sfzn3lm0cd09hmxvfru8',
                qualityOfService: 'vo24qukcnzuqmoaot489r',
                receiverParty: 'c1jbqhwtuhujz1neg69d245814p1ok62r1x6vj96w1resrn82zyda2ssruvxjg6qkhsgbihusu0hidxwaroowsh4xsmo2jk29k499urhirsxsg7p8ulvbgnyu33qoo97fs0868on1raoy1fqtgz8qu9cz5reiizj',
                receiverComponent: '22tady54y0nv2vcdc8xyl8enzej7cvdsavq1qv2crhtvpwbqus6jfgkuwa4csa382zqnb4wp94bt9vx7ze11wdbur2zslkl9zd2glowx4gmjlovxom64kgmzu3q31705fxook04y3l412g7liwozubhyya2blu3m',
                receiverInterface: 'qbzhfbpfxfj1sa4i1j0avzaarzecybdghjftrxwqbx6mat156cvhs42yug410mhyn5fxxo4oz58hjoohvqv76mtfohfl44umzbm7ijzpis49thyzfv9v32b5eh7oivpr3v3f5ha3b6oee0r2q6dvc6y4el4s83qx',
                receiverInterfaceNamespace: 'd1d9qmbnr5tzqdlrafy7acve3zt1n3fzjdd3idoh4s3vz9oepi2eva1v3hcjh89ujfxyf4e78k3ggdzlkcf4uev1lfznlu0e6w500wt9w0qecgcvafhqk7y7m6dfba8x8fsmlru2wc6cn86qq4drunhb3dp6jn60',
                retries: 3864731077,
                size: 4204646276,
                timesFailed: 1284209022,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'm9yypmkaxgg6dgh7fsvycc3eyhijz70c3hd3n40ywitxzio9q3',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'aisr8o2abs8sxutj5qtf',
                scenario: 'vz2igufbb5xqo16bnqk0g3jw9q7u0yrw8oxxm3p7s6bwp4zyweqt6bv62fi1',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:25:38',
                executionMonitoringStartAt: '2020-07-29 09:06:39',
                executionMonitoringEndAt: '2020-07-28 22:34:54',
                flowHash: 'pucsqhrbyuuc5v9j79fz6dkejp669du3o1x8zlus',
                flowParty: 'r4foe4dsehtyabhn8af8o8u7peryr7wj0qrjfux0tf8zt4jlcfjg28h4x56qdgk42emq6pl9bwr5p25c2w2ni5dogp657jliq6o8qz2fi2n7dbdqtbfkt84yk6q8l562dbpd05llp6xss50952hszbt5neycsbtk',
                flowComponent: 'g6n4k21b4arsgb3r5y465j5baak12eamf7ufwj8qzavpdc1efr7wh6thsn7ulurhhr48412pzi7bcz2ostmwe0hedaqh7ib9zksw42pkbp529iaeaydrnq4kfkjtaxhc7hapsy8b0j8jknw188259bku50z5lmh0',
                flowInterfaceName: '8xp76ndp7c69m2k8fti88boekbaand2mpzpx4nehsj2b22ozaghtt8zwskqhp99ou7ur630p0fwke7vtfzgtxt8mq4nup6m7t1ju17yrc5owwlnclyk8s7or3dnapy7id5ypkv0ixkw6rj7wrblcbeqw6zd5072s',
                flowInterfaceNamespace: '9tybmjz6v6vvq6eults4123ciennv5nz7692bm8ilo4fjsqeok8qo1gxovvv2y2w9zsx277a3dw8ynf4pyrory3o0znzldoxoxpcl3qp9pttz0c8l487bf0b6tq4g3wkn78sb8dv8o7ft6jh8b60gvryivqoa27z',
                status: 'TO_BE_DELIVERED',
                detail: 'Aut non omnis. Cupiditate aut veritatis aut magnam enim autem excepturi veniam facere. Tempore laudantium eius est qui. Quod omnis vitae culpa ut architecto quisquam consequatur. Cupiditate magnam fugiat nisi in quos porro modi perspiciatis.',
                example: 'h9ppvcaudru9pfpwfc1tblkio60rj4hq10kxqnq1l716d9cuhpkt4j2tt878d9y32rvwq95kyyj3ff7666eiqa5pohdpoojjys7tz68vhgkj9ydddjvvgsngnxpt0nq9tngpcilgy1zhdj6b3k9gccpbnwmtvikf',
                startTimeAt: '2020-07-29 16:37:25',
                direction: 'OUTBOUND',
                errorCategory: '45u0ajphnc8mgm6fyuyaujrkrhl4mu0sifxeaf7m7mmivn0jatzg4l2uqxrfopftsfqvlcm1za4jvmvwcqkixcahoctgjbj5zhg33wl5pcch1tolqmxolnbpheh5g1t67hm7fre9n0lkwictm3tvx6vz4jvyh6fg',
                errorCode: 'cnebioqf2ht6cqq5gln8coihqpgf3kktmi0j6yoqt1aecz25qd',
                errorLabel: 813454,
                node: 4759835424,
                protocol: 'l3h9ovi1c1f6ml1lm9g3',
                qualityOfService: '9fzzbsq1wcomp6ktisam',
                receiverParty: 'jz0spib6ggcmbtwuz27pgnlp0gxhd1hyh2q5izb30rfj21tg4s9j97e79tulw5zm1qkljx556nqivnub5m3w4cpn3q2rluz4n4se8egkizxvwi07xxyoouveon78htaxoeshoat5svlxjuqqfwyq3str5x6b252x8',
                receiverComponent: 'wvtspwxicld2owsxy5s11tix5jf05ec05pof0yxhw8s4i3t9240a31m5vks49xcq7ako3l9tswrcqsmlvdlk98irpw6ivzwm2mpgcsjj1o1kfit2sy26mfc5ewin6i6h36by0wzf1iwlqemv6u48md961mmyx84l',
                receiverInterface: 'xw43dmczhnajozt2hp3sd2okk167wgz3w2vbbp2qgnqduew51pifrrfydlhh41yosj8c08w0n8f844pouvyurr926hnr7d5fvopcg2cx6qp8el216ez0umb88boy9wxk2vnqk8yz1zspxrszfsq13l7zpc8l3h18',
                receiverInterfaceNamespace: 'lgtbtoaj2w5pg781j8uazo1ql2dc991xg8ze9z0rgn2qg4td397dtq86v6pwcxhza7vorelr5v5tgttb3q757yr0gpsuxv47jlrayvnnokmu4j2jw09ce9ecwobf39xzbpt1gjo6c583shhaur3el0r6vfkwznw6',
                retries: 7221229385,
                size: 1847609975,
                timesFailed: 1359617319,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'mi66gxj9zf7xbtjsvt4tx7ez84wz6lvqvdm0o7f8kgai72x00s',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'jj1udg88qbfqplzj9ahw',
                scenario: '0qjvlvnpwjfum7mzex6nde03v8e3vrvk7dwve02r33bi04prg4paahkdddm2',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:54:21',
                executionMonitoringStartAt: '2020-07-29 14:17:45',
                executionMonitoringEndAt: '2020-07-28 22:33:03',
                flowHash: 'rako4az1qlbzof5defycm8vxm6pbczlgz2mjfxwa',
                flowParty: 'uoi3hy5361vm682sad4f3i5c3qurr2lgc4xminj5025bpfbn9srsx53m3l4n9sm06qz9m4dl4e34orh9v1svsnc0p5idaqlq2opfv69xtrjdajnphqhvw6zhs3dku7e4428cihpa9did90z109nh51k5ya2nixju',
                flowComponent: 'lxz6oqgrz0jkypdordzeqlv424vzploxxb3esu0vf0qirlyrjwqgbjrukqpok18anlncufpqmfbyzcyidvjfvgdgt1xypltcanyd745g3xgv0g5v7wmmfj4w3heqyielh7ethtwqyfo46a6o11b0nm9ulvelan6m',
                flowInterfaceName: 'uk2xgszoop8ex5jtpmn0gqgpbek5sevp1ryoyzhyljedme15u8qkbnw2h56dl86rtxjzl55fdf3nbnpw0usbmyqv0ct2j0v9skycnxsd3x74l9lkhx34bx1ue42mho37bfd452qhz460t09urgd5n31ryhtqjjib',
                flowInterfaceNamespace: 's442qpbu9dvvrrzydvknsiv9bs8wkahujb2kk330jdq01ocyj794oju3gfxthfphy0jrkads3co6hdoanpragh4z0bpzpx1duol078sni8fe6oloj8c6uo1npf8x1u2mfwy3ujfik9h1p7guy8aritfyxwaqhe24',
                status: 'CANCELLED',
                detail: 'Aut architecto molestiae et sint maxime unde aut. Nulla explicabo hic. Sapiente repudiandae illo qui praesentium. Libero voluptatem ut quos.',
                example: 'exhhhyas0rht7gzdjai72x4scx5u72bd6uzwmg337n8eydsyxsgaiim9pfbw1talci8dylsof5revf11obdn58ga65oy9mm1gi07m5ezdp70i13euphqcsde3zr2zlgkbalpewq9x3mc7rk4cuqnvgiyiu1qdxo5',
                startTimeAt: '2020-07-29 12:41:48',
                direction: 'OUTBOUND',
                errorCategory: '8vvi407s0tvhfqn693hbb4hnuxn1ebvw4l7o4n9ekzvyibbqros040vuqqlbv86qtrmifk3b3hi8bbwh1h6m6jmqmu0qk2ue1e7sjbw65o9z9fexdte8gyjjll5y03ru89iiqszwbnfzeet6knb15zm433ywxqg8',
                errorCode: 'bsmlr8u9gf7kbmt8ph5qx684ffb58qcn6vygteoc2agfubrg92',
                errorLabel: 466436,
                node: 2339403411,
                protocol: 'rsdjvlq6dtb86fap9qux',
                qualityOfService: 'z9s7z0nwb5ejfxdu65wh',
                receiverParty: 'ip7bmuwl2qo76l8bwh5msnop4nhsin042r9ouef20rua9uor1m6gur4o7oyw6ywyf50m83ja6ydyxqms7j7hmqzbma6lmvk4x6l0969jd677k7jyjg9aql2uszuea2zalf07lb6cutatpdtincyh8d06oqquhqz6',
                receiverComponent: 'v0ovth23g7vr4mpei5ykkinzlkkii3lgsty1g2mlpulu77zlpu3xysqc907qh9wsmryhdhsn1wm0yf71wizxunp04v5dn60nml5htna8q1on8urlaa0l4a43r24g49wmapcwxbfwfqhdu1pw07zecz6ubsr57ydfs',
                receiverInterface: 'eno29f4ycrsnm3rf5i5gwdj0qg00yst8v1rh2ex7rmkgcugk840y8jwezr7iktltzwdz11z5rg9mc2524ycz24kkc4d21813urtad5bemdmnwa247wzgotlflibh7chbf0bhhdqqideufxoaibmc37qbutun5lub',
                receiverInterfaceNamespace: '0p9fydrtt5u95hlpjo9kivp5dc2fuvpz9imt2yib7624ozihkap3jqz4hth4d2nixocox2l21uplp86dt4q6ny0j4ia2j7lyxjq9wbzn4n01qm5jmvqa6pxhlmfjx0grxmktisuf2ukrn7225cbz4n6sd7pta6dm',
                retries: 2401190725,
                size: 3754523849,
                timesFailed: 6721473472,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'rq1n2j6pefm485tk3ba8qyvdu6v8zc8kkyvofmsqnzu3729lck',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'b06nlyz2phl7m1un8nop',
                scenario: '77zxshbp661j1ckk6vcd6v8advgcnnd3sk8cq1g783ur04avnqen8wlbwu18',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:11:22',
                executionMonitoringStartAt: '2020-07-29 14:10:36',
                executionMonitoringEndAt: '2020-07-29 08:56:34',
                flowHash: 'cqapdgvzko1smm6j1t70nuwr63allk9ildz1aay1',
                flowParty: '8tig8cgrj2s0ih59zwacuupbfxof7ld97dkneqnqrmkunoccneqr5ge3prc7wcwoaxouaif55ydlkhrg5pzkp4sholq5l0ftmz9ynigzr2u9aacaf764y8nf9wkk4xok5t3w00tsvfp8tjw2ktb4l4n2ihv7a4ru',
                flowComponent: 'u8mnrlzk422hwv7f069n6tiborw6m4jmj69b1zekjreyp2fo9i5xzs4yzknawqek4hiszorem8b20dvncw3ckwntob0ewxw19jfvcxy65rw225vwj7ki7f151hq5t0omq7fznyjilyu71mai20l42snco5xnbcvd',
                flowInterfaceName: 'e2ofhb7uwhry8yowf2yzvih0djiuqvearg5a7cvkh8bht0bilgziyuxrvkhrdvye6mypetis2mxp0tbu6upkf4kyolk83e383pxwkjevwnkz22px83pbrnm4m7ihqw3i8r4zpv5evtnljtzohvru8u0g3df824eb',
                flowInterfaceNamespace: '1iea02rqlp4cvd8t3a6hks02vq008yjdudbeerq7jazbf9qeg4tydzpiysonb1hupdx82opavgl7tqjjjo2elkvhvur95fgkvmomx7htwlemwjmegvoqw9zwd8jc3lmnxwh3vk0nips8p57py6ae9re76w7rjed2',
                status: 'CANCELLED',
                detail: 'Dicta et animi nemo magnam libero ut qui repellat. Ullam aperiam autem. Labore quo quia perferendis dolores et rerum placeat. Eos iste id quam qui odio ad sit quo. Molestiae eaque ullam dolorem corrupti magni consequatur aliquid. Quam dolor occaecati non officia eveniet.',
                example: 'iu2qo0vmdxqkajdgtv32sx90x33vbxsd7g0jq7hecwbwhn3qcyoiqxzvwnketn0pm8cwd43aey35rc1pfb1rcacbsns2d5pdy5wm9d7tg3u3pparlf10k2qg4s14m26fje7bpwfh21u9wfpitnzkgup16eqrvdz3',
                startTimeAt: '2020-07-29 07:58:49',
                direction: 'OUTBOUND',
                errorCategory: 'b52sytonq1ziy64vg7mqrrbu3t6ycu3x91d8p5d61yz0ra78stg1l8pa0f3k20haah079djuq3icmrdqekemcve91omoszyqnh0cdjohqpdmaiwy3j9izr3peic0v2whyd60rnzbykfslzl4ddlipib97zttxyy4',
                errorCode: '8az4bffnklajqwus45do4qrufvhbm9yja1bsn6yw2dbohmqy21',
                errorLabel: 714110,
                node: 4734524006,
                protocol: '0rirpwctnec4ilexbjgl',
                qualityOfService: 'whxxkbipjahfwwaxqodx',
                receiverParty: '58ljd6rmfoietnet27yifuocxkpr2xzhfa7yrk51zlgreydxi9kexrznhvrmm5ymu1o0g4390y6vak6l2zcty0l4rieg0qpeefki6kf81mk7g9l0g0h5ts6xx620gb65qoaem7gvmdny3k9qtksim9ljuoavbpdw',
                receiverComponent: '2s6fymljihnl6cmyyyhtrhimdwogb3qtw3xa2oy953c8rhwbm22905mqf43geyhap986vnu7g8kg2tzi590m78ecxphjzozp0fu2o0t53u7s8cni3ja68vqx6iyhphk6j1nkcsk3s1mw1w0sp7ke9ibs7cen4kg2',
                receiverInterface: '7ibnbif7838pruoadznkykj5p4coz3i4ndkm3dimogg84fz0mp0s1fvmnaupugu2q5s5hhuad101gdj83kzyb4vxtx82iadw2uvdnciu3s8y5axqwswddblsiaambg7gwkh68nrg6oobnk89mii2n2lyglt8t4yqb',
                receiverInterfaceNamespace: 'p239www2wr8hav7x6wsly1rp66wc29i12012qffcw4y00dvfmr2g2b8wj81pjpykunvslxqfnixbm8kb97tjp7xvh1qcuv1uch8k96qtq19tsv3k3gjjgkftm8z1xq2v05zmmdh7nl5x4jr6g5n8htw7s0cf7q2a',
                retries: 9565260284,
                size: 7798661008,
                timesFailed: 3461612833,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'uccmd4nkrmvfdk8dge9vbn53ijnq49jtc6az7fezgpnljfax8b',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'hmqf9hmlhova28xspxbo',
                scenario: 'xrsnquh2hsnf1ao8r5cqmbm3iyqtpmyfjcei34i76fegqpbub1au3xwgfnpp',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:48:18',
                executionMonitoringStartAt: '2020-07-28 21:40:45',
                executionMonitoringEndAt: '2020-07-29 05:37:03',
                flowHash: '1wwy9et5rskt32w2oy83tg6mn7k4pevu8fo9lbul',
                flowParty: 'oowo03ufr1q7mk6thqffpbej4767af63c99yn86mo2cat6gxo8sah09sgsoxd8hneqxfnd4hmmk0trhwthmw2hn3i5t1h6dg2uqtqnstghunsbgqr56hmzowg6bs0fog19w4sgrhs0q843mdgb8hbh1u5gij6zrd',
                flowComponent: '4wkj3k48b9r2bzdqxbe0tgl2li7obgmbxmaz8wno2o8jp0gct96h4fotcfb2rs7si6x1xlpj9bpvm2l3fwmv4hgwcd4aqdjicansz89b5m5o3v23ou2ge73yd9b4ka534n8jpqqt8j2stw3sxy5nijalbdv6y7a0',
                flowInterfaceName: 'rjme4ebseams27ffpc72izkpfi7qopjh7050qti4gdvx91kb15epqpnj78ejaunqq03pvf1ysno170p11zlamkluf03u2of7hl16ann05jcwzw35nm2jeoehuqsorilz4z5dqelpbsqhymit4diqyoosy2jb6jtg',
                flowInterfaceNamespace: 'iahr9uhpif3eo2y60yqvbkqfpttpbdbc6c5k8bxnx0riwnz2tq45eznu15uinxhv0f0x2s9fvl94iek2ngfbf4uhlgsy8elhekkjpu7xzuirfqj27x9524c4a1rre7sfk2egl83u0ze4i7uqx8lcf03c1ha2rvd4',
                status: 'CANCELLED',
                detail: 'Ut molestias et nulla eveniet. Minima quia magni in neque maiores. Est quia id perspiciatis sint totam aut.',
                example: 'p9v2cbcpm5byoj46n7gtyj5cgl4uk6ufwhrechmjt477fp8db6ix4aitqyxxapzpqe8gaajb2hlg385oebp2lc5xvbkqeqtirt0687c4ahnht3pogalwm3u72i91gtp442xy7i4ttltfaofqruly2bfswt2z7bli',
                startTimeAt: '2020-07-29 00:58:59',
                direction: 'INBOUND',
                errorCategory: 'fgh7uj739wi6dlebx4k282dl2kdy80fjljufrje2phz8pj5x9mgg9yj7kg09gforx66jqouwmn4ed2a8ek0krcdvsmgi8h8jsil0zie58txyqylj9achb3hhp7y8f5egbwku2ey7hi87krv6bpv7mkzvslty1kgl',
                errorCode: '45ym0tbpf5lreesei0lbzpsgwodoqggtn5ukzmmaw71sz46sux',
                errorLabel: 146158,
                node: 3541688051,
                protocol: 'mwcgriygg8zunuwbt6t6',
                qualityOfService: '5kg8y1bzihnwoyn4cwu3',
                receiverParty: 'e74fvhxf16blf8492vd8aresdskfbxuoebqg8kjmmu6tjd40hp3keqdcmwff4o7y50m4et7e309v5gw77llp1j8e2vcqo60m29qfw86qwdwv1qcif867wgtfklsen0bdcsib1ft6t90w24oqxnjgszflfsv3z800',
                receiverComponent: 'dbbt6uo2pi6gti7mf342fq2b3ywxbkbbejrgkh1iulnoih0cd6qwsv2980qxkunrpr9macuvglr76oi5gj9v12q4dop5wu2a6kvekxfhlf4dck6914fd6gmush1rc6x6nn4lbvwzgcl6ls5h431vdwolcga7naeb',
                receiverInterface: 'fg10jsw4sokrkreq2uzjyjdk4unqut9cgklhsgaw9jqqhzydu95riv0tiq2llytq3n2klp2959taeo3uu7tj764u88d8hazgvwj073sko9p3989fx0jksooyeh5m9falfuja9vjzum9vh99ldtf8j329tgufya5k',
                receiverInterfaceNamespace: '6ubbq72h9texwkn9vtfc74083mkvxybz6wx4um5v4xodslcp6uj9vcwjc5tzk8m3ima2w7zups91783yac4ktr8kvmdh2utzp57jwh9680s3z2nfvzmn2pe6f4rezc7c32q8td0ueebn5vsxawt2g0srz7aiqwiqs',
                retries: 9691422256,
                size: 6718321686,
                timesFailed: 2274879098,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'qrpipo0mvkjvfau1uh47kn5g61l1z039j3iyua6n6g4uw8tslu',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '9p787mr0ff0l2fs1hdpb',
                scenario: 'fzep7s6mv9gj1uw3mskuuyg5rg9bljpiucy3xg7fq8ali0pl8aml1aupx8du',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:58:44',
                executionMonitoringStartAt: '2020-07-29 17:25:01',
                executionMonitoringEndAt: '2020-07-29 05:24:12',
                flowHash: 'p9w0z6ijshknlmvwg3icy74yyql3kt2ulykuv0h9',
                flowParty: 'eyqcru3nmgws8jhe5tm1z7lglid2ue1or5ien16ilfy91npd0b9rebsx32z0667gocvt0x6w34fwzbd4e2n665qdhq5z6tf9foyrc8e77dlt84h8wh4p1yc7yjd3tflitjb61ah04bjukku3zodl8r5vlgla2mdu',
                flowComponent: 'xd52gf7c77kyslgk5za3r8r06kzqrvv3dk3tq0b6ip5r95tzm8fo494akw6eyta2ughkq6cyteekf98ao2dtxyfuo26epx4w16y1z9qawg1i016atruqmgp2x1geoyzyjvwwv7lqhir2ci0eqw7o3qpgkkz6i186',
                flowInterfaceName: 'f90smhotk78lw0t2ueyztf6rf4rncfd2u1rpgc3rwjhwt14t4sib8fab6qecw47vm5bfs79m7q1ucel2odpt7jz7hyiz7newziqasiardu1ikqkl5hvcguzfod22kqye4vrv7abm3ljxgf5p0m6kuymf4e80wjwv',
                flowInterfaceNamespace: 'stu1k6p3uf914rd4bdsz7mgl14da5yr0qt4mtebr781iy6boqec8pvvtgpodkyab429n8id78tb5g2bgo2rjebtlzzy1qx5hjixfpp01y6oikegrpcr5yt66vl71vg6r68fd76n0cc9m4k1tjfkvlt2wlf4nm8mq',
                status: 'WAITING',
                detail: 'Sunt amet error. Id doloribus sapiente et unde velit explicabo. Et molestiae facilis sequi exercitationem. Molestias est ut labore earum culpa qui aut ut. Aliquid et et inventore voluptatem numquam fugit voluptas. Voluptatem nemo corporis impedit accusamus in beatae qui.',
                example: 'ff2ygrofm4wgcdowztba57y3hav3du4s4wwp5qf5r5ptq9mp3v9iya58kcrwm84ceb79w3t7xt78012ewi2kze0oq6vp27zga9btrhielwvyqngyinnmnwhxptj5yutorong098l06wvhpcyxxur4rl6qn0agtm4',
                startTimeAt: '2020-07-29 00:10:39',
                direction: 'INBOUND',
                errorCategory: 'yxdrzrskxb4zcpjzua6e4td00b2mh1eh1k3ivvf1nvhdf83bomshr32nq27sn1ugqqn8jtpchxlyz0nzb10n8477gz5vd6zwocxuxlatf017ghrvkqnr86l0vujtj6evs91028xhynb7cve856qila2cv4s2nzxc',
                errorCode: 'raija6blxfel5ve9et6dgluqy8txlrlnzwi2jshkkgqrx732x8',
                errorLabel: 851290,
                node: 1131467155,
                protocol: 'aglybd3t0snwbsm0en71',
                qualityOfService: 'qx0j0dpwdly3bry8pxsb',
                receiverParty: 'zfb18w6pzalt0f21okkkd8qfaf205l3ze97qpv1fvy4a4bihp0gyf7krss8wqtsagunmma2mp2o4lk6z1kk9c0p8hkrrsjn3wzlmzxr39cabtn6ttm2n9ewg7iu1eviy8leeogexdrcpb9lsbk2eg0ebumkgbrn3',
                receiverComponent: 'p49v766cgcu4ktufaz361ao1xlaxxiqi3gsshj9sk2qqgikcm9eds88jliqfjhlsbg5290f4ibzwf7ilqbd9an41arjpyzrsuaihx2jxvy9xjdqc701eb12zbegnoeunjdssn6m67sdgfn1wy0vyngebvkb7n563',
                receiverInterface: '8aj7v4ww6yufvkmkq1u5udsts4wh2nax08ylqixqo4y69afkju91zrarpz2i326wgv0y97vtx5egcd1yrugrtane4tt3comgygb1t67figxjzahqjvt51uzee4mk9bqpzjxuzr69uacehv3tliwgtzywu99621uy',
                receiverInterfaceNamespace: 'ie3dvbbgl6imacsshjobqrjjsov33clqp7j65pnvl1qf8duoic6pfb912dsw685dhn868sbkj5l8ott666ludyrgpsf0liw6yprv2w8eogjaqrmpr575gwaakf2j0x99rg9ey4enxai5xgv950iib6gwj4a1uxvn',
                retries: 48098126113,
                size: 8804018767,
                timesFailed: 9247777009,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'rems3i9ex3md1y38drprkhc613kz93scxv1ixllsgs9au1n1m9',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '5kmw1z9bmhmr1am3mie0',
                scenario: 'kejsyks060yz78j1d6v350eqpm89a15qujveumbo51bbpsglm6ljyuyp0fhi',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:48:30',
                executionMonitoringStartAt: '2020-07-28 21:36:41',
                executionMonitoringEndAt: '2020-07-29 05:31:06',
                flowHash: '6g9do1g17xhrxosh0uirgrfb8yjrnqrzqza8eh4l',
                flowParty: 'zl71f1s5ae3qtvflpnk8pjep1xcjw9scqcu2m6bf6bfwday5sqiu74of0z20ng4tm6tqhgc1fszwslojg1fa9giwb7f8psz7t3hs86vxxfnsdhihrojmji2opgy7ny5mxw154e0hmwdbvscv6kkjsilcw7boon41',
                flowComponent: 'de6eh9l5na8headxxsn7i8augzqkex3bf7fz3i3happquzoepst8o3usi6w8ztewong615t6jo1mgoudkgvjk9mdbgkis9sd7kujooovypoo4tiw1lybw4pa05q5ur894t83dxtwmstcgiapr8ybz2ifmus6h54j',
                flowInterfaceName: 'q9nh7kw5jbqx9whumpneajbdztnhrhfgp8paxucdbm3e1j1lb21boej0m50qde66802wcxpx8ev8swpz5ygw0wljkx2m97dazgczwjkpwo9pb5a04gih4p1g76xetxbqvyff02c733z12ksn8vrto5unjuoursgp',
                flowInterfaceNamespace: '8mmbko2wmtkj0v6jisfliezg54zybebf3rcmpyjuewsxhlr0ckjipm5cjnnuk9i7mt8zg4otgj8a7r38lnsu00p8c3mztcwrhqjwk6m8fgsnvxk0id6s51kiy4mp4jx273duluyxk824h6b1ag4gt22gwxzzcehh',
                status: 'TO_BE_DELIVERED',
                detail: 'Et sit vitae nostrum. Aliquid mollitia sed. Incidunt doloremque asperiores earum quaerat. Quia modi fuga unde.',
                example: 'wcersvbkcyti920uwxb9uxu9wxrkzvbd64dz9982hhxbjmc2t3crf2okwenhnova87852evs1gja71ouebegclcxcaewyexakxjbcoyki7tfb6yhyu3ibg0uprtpmppb34vivzhswxqz51olai8vlfhqx5wpm2uc',
                startTimeAt: '2020-07-29 04:41:15',
                direction: 'INBOUND',
                errorCategory: 'vcgcwfu1lmncx6m06jssvflp7etd91pppxnxgicvpn8mqwgydyo86vw8sgxytinq5tsli5o9gpr4szcg7v4s4s2ycu8icjo5mklzc9597m2xu3fev4enwnabpy3pvshoav4q2p7doovn4cb1yp624y6yzfp3rke0',
                errorCode: 'd3mm0tzx1wiwzw7rdup2d10gam2u6lgq5r2hek48kndzqjm28z',
                errorLabel: 129821,
                node: 2767083077,
                protocol: 'hoo2dj064x894twv4ko8',
                qualityOfService: 'd7xcebzxeup60vdmb6d4',
                receiverParty: 'vsrxxrclg8cresvxakhtjdsh7ovbzsecixoqhpgvq3wmxouk4z4xnrnxp2barhtc27yo64rcs8zfalh5zpb6qr8s4ta3atteng1a5x8nsr8kd5aqvav8s4awa0ndxe05pri7kottuyaybt5u9y1x10a18ct3v72o',
                receiverComponent: '7bkzwawcdhu05jeuw2790r9m4uc9pk04ctrd1povwfju74147l2ajur93dm49f75xjzqspjf7a050gdvh62co7y4pycnhpuc5n1z0eq6uzv29jmg72ni0j2wbbo2u69713rw6vg3da89682c18a01xu5dsint2ae',
                receiverInterface: 'wj489wr40wd4kky0qnwoc52qm1l25sc7harnz19g2fc64vtg6gfd6rwabvdd59obgxx4ss3npogwu0n2mjkoorjyy1rsatnjbggqymfpzc2l5d178g8l68s74gji1q1ws3c9aunleel3hn9izxn7nvnl2rw6ceqp',
                receiverInterfaceNamespace: 'g42pbp9vr6sg7ydeiy1qnujyhjjzdmuzfe55lzjxfm0drug62fnuh28eqgke80xpwtk49m1pacngekb9p0232cnwzksbxd46jt5zocmjeuxhscssoe9gmm7zfckzp9qru773f3c99llida5zaribapgx8ikx1em1',
                retries: 4486175791,
                size: 55915908159,
                timesFailed: 4596291396,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'a7a0kb82vp1kbic39nmdf0o16peg5mfdx96ro5sx5xgmi6kqyd',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'hcgsmb4x6x1vfja4nuc3',
                scenario: 'm256qn3uy6qpogugfh7f47pjwyoqidf0npmnsl5qzykmeaf3j460ljjsqstf',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:09:39',
                executionMonitoringStartAt: '2020-07-29 12:08:43',
                executionMonitoringEndAt: '2020-07-29 17:42:03',
                flowHash: 'di6sjf48h6u886iv2m7j08bblvxmqq3psu6bej6f',
                flowParty: 'vsoc3lhap9rrwmoychjmnmwmll0acge773u24j2vv8z53sg6iv081kfcuh5lzr194br7w7ern94rdldorrj0uhig2g2e7xysyc0y7m0k1nk5v119lnl6fbebbjdmfdz7m5555sugvbl1ggtk95qz33bdy6jv1qym',
                flowComponent: 'yc74mmz098calcm98eesvqfscm9atth51koavfbeeti52bh2nqctf3tn78b2xf77f5bh48rri7dcjtxy8a6du2exwa3vovmkg1hq297lvm2f7x3ue7rulytmidrfsqczt6sp1wu6e09ustt927fflnqnq347tc2q',
                flowInterfaceName: 'nanqptigxjm6fezzsyzo1gwgbblb9hog8zecwexv3qnecn5ucs1ajqzniq0msnkceww9hqds15cm7bdhcnusink2utldwl374xehex44r4stlwryreuwa0zllku0ayrhdm7a7lk4sshd8u6l0qkr1inb5wzxbgoo',
                flowInterfaceNamespace: 'l340pub2g1o6zae7augfjhnh4g5db595kww0fvhae7r402xizm5m2enh5jogp7mxxs0qewa98gmi7hq8pjlbud2ujxoj103bh5at9177ouq4ewg6bp4481rackoucc61d4usdhpdlxg567gqflgssntcfrdvnxik',
                status: 'CANCELLED',
                detail: 'Delectus dolorem sapiente at repudiandae iure numquam. Eum velit sequi labore. Optio hic aut iusto voluptatibus nihil ut error. Ratione saepe enim cum aliquam ducimus ipsam. Sequi pariatur omnis quo rerum. Aspernatur consequatur sequi sit.',
                example: '6lvgj53k5xinrojmjewjmmfj8ki16yb522xh55rftzojddbpxglnn2njjrp57cuzy6ph48gfs0of046cfufy0asen1b2bpuftlh4r0ghptra0ci6g74xg9mcscfdp9daoogpwvey77y377q7xiucqos2af4bl6p5',
                startTimeAt: '2020-07-28 20:59:03',
                direction: 'INBOUND',
                errorCategory: 'omjshcplsczfmwgkltqoisp6a5ep64yqi0q7t82vbwn7kmj6evi3gbbvaofg8gac5wxvrmtvsnc810n5ev7gwqwmj4ul5z2otmmdwn02obgc684mkkrs861dyumdsi7371lrsmhrmbk9gxl0nno5yn1xmcc1sarp',
                errorCode: '6golf14pe2wfjfky94gtpcmhhynd0jxiqo2z1cywpryrd8m21w',
                errorLabel: 969641,
                node: 9173986352,
                protocol: 'eti8ku9k6l30m2jk6loj',
                qualityOfService: '685leh25gj9eyrr33d60',
                receiverParty: 'gsgtm2hirt6e8q9shup5z1bg4123w10surxyhk14n6wgwcj93guspkuv8vodksba8w3e1mh609r5a9s2g7fny7gybvlfn3mbn87yltksg6numjpsamnpf0vj7h4xem5mwin7tweavebjva00yyd1oallzqg8zpxc',
                receiverComponent: 'l54w0vk7drti56vxt4c1o0ut96slpgfskgbi4wvvwh2ax0r0avq9o3ves5ntp19gvxv1b040gssm4m7bxkhxp4lcj9wu42uiblnhd0j50rsjc5w4owboqj6dm1qulxigdnpnb90l4wcjo481pki3zgfs52gjxy69',
                receiverInterface: 'wtclq4o66j56mn149ru5uyujexoyljkomya77ck1ll7lltzxzbirsfirtwnasol0t6mvihtjnejyz5fw4qq4dtbd80tvayga4urkbwa1kk77drowm0h04amq8j8z45y47kei9z3mbwstrqs41nhofgzi4i9r9u54',
                receiverInterfaceNamespace: '30qtt6f4rnw6ifne01jxyucnnp4yrk32lk77ggjthxgsijyqaw5xd3n6z77voi6kl3c7wk2j905qxhlelr6cfdoytsccq3jq90zdqhyslgt12stxlwoqrx9ebfasyzwutpjah4a85ji75u4okf67asiz806qx3mg',
                retries: 6748902752,
                size: 6379989669,
                timesFailed: 95830375271,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '1880t5hmh3zrvz1nr141dq5w23o8j458jgirafre4eq66xl7pa',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '841skql7vvstkf3uair7',
                scenario: 'myajw1m4dpvfq56ze24q5ipg0arnhzcyejx205ezmo2oroemt242p8viovbh',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:00:18',
                executionMonitoringStartAt: '2020-07-28 20:51:29',
                executionMonitoringEndAt: '2020-07-29 17:14:37',
                flowHash: 'lw6n6d3ibvrckpj2b9348vxeiw3zkvum92urqwii',
                flowParty: 'cvqne0t23479snvctdmrg7hmg9caq70qozftpq8u3g1vf41jvoijuy8g1aiz42jjo1mnew1kg91gvfaqyhajimhogf3ovu7ipcwo7drnyycweqbclcfuophk0ef1bp00gvmwkqf7y3dnbr232lh55gdt6g3049z4',
                flowComponent: '4encn32y88ctw2ku9awid5nj61vhx1s2b0azc9eu2n4zsmrsi36v7qs2iw15hb9rwtecrwredrbmsvcoejuosb08poahu2nwzau44qo22aqlbygnh2ku2zo3h8awxau153n4a3j9zw0v8oo12wt5465bbohkrvxw',
                flowInterfaceName: 'uirfcpr3onjkhy6jpkuaxrreyqvi5rzl4se3fts41dx6i8g5bsisphkqoyk6msge2ks2v8ssxn85n3izfpjpbjydvugeofa3dyw3kn4cfbumpmhsuuxwnr9swz3yz25kdpmbzfgxvr8e14ls897wci2hgelex5cc',
                flowInterfaceNamespace: 'qsj5hw9foser6506twj718qxbc2ja45ot3xygq2zxbeoja4rb1uid5azynkg1b4j6t61bmcqr92j95k1hhj1uq9u3s1ckdghru3q5hkpv1dmll96yr3gpkj3gnohtn1qqa45jwg18sds4il5jmo9b3qawpd3oqc1',
                status: 'TO_BE_DELIVERED',
                detail: 'Est voluptatem blanditiis natus voluptates. Nesciunt cum voluptatem ratione. Quas nihil praesentium debitis dolores quos neque deserunt qui sit. Omnis repellat voluptatum reiciendis culpa sit eligendi consequatur.',
                example: '3tb350t4wqwk3eqz04tiewpopcbui5n48pjeb6oi5e2r8rjshywcpxzq069ih5xmm7ay64rmg8ezwdzvlkd7rek15287va8l6y66x5x34dlgxkbv7bbf9tkbsn3t0xwyxuuk8pasiwl8x3cl8xh4i6voxo3b9c94',
                startTimeAt: '2020-07-28 18:48:48',
                direction: 'INBOUND',
                errorCategory: 'lusa1boabyp7gtyyr77xxh3up4fgsfjb2ombvo8qb8a71ulj024mtwnioekbzygrmhadufutvhun50d8jpc51f9a0j0xi154m7cw78fmxnxz8flrfdq1pe8w91j73lyupapeg59x4kcpnn1s4oarjrkfwobk3q4k',
                errorCode: '7n25fvr6nqpygmy6eelmjjfk16o2vga1b3h8z0envbou2lqhvg',
                errorLabel: 946563,
                node: -9,
                protocol: 'oj1m6gw9afh5supylxmr',
                qualityOfService: 'jxruumkmdik4te0y4gb2',
                receiverParty: 'n5vdk4gbu31a6i2nuq7d2ojfdpws3rr5tkl56wrp1w6b0fk3oowooeb4cr3esvh3w9bws58283zuzria7q3w27zrdhy2snv3xlw4dpand3td13emtu6j6t5inh1cvdbravg1e7vau54ocdzqy65ot4sio8uhus0t',
                receiverComponent: 'vxla1aia2b4zlr9n5vgmufku1hqs8s5w5x8ykdy3o59yiz9hcb2sy6v34x0mfrnlty6unnq8fr5drtiqo5f2it4a8y57qhozw6yq963txzrjoq7pkxv3r1ayvc300pte5ucrhdyhgj5o6ckye5wajn3eqgtkih1r',
                receiverInterface: 'ydap0djbo17ct6sslijk7cydsl38cws71yn4om5sw08gi9iebu4er701ftiky0g9wi3bdstcz29lo5k0daprjiz0qi86u4f4tfmkal3n1bzs4t3dncbwy2jtmwxvgzmyhvsnphbguv39km1k2ht0cpvu45ljwqdv',
                receiverInterfaceNamespace: '1u5oxyb0sqghjhpopvp81r8gyfmswa9d7rc9m24nnoxtnu54wkh05gx5xxfnkm8ccfegeo0ofipnv33qc1p57zn7edy50p3cojtn0ungksgkc65pnasct7pifmwq6bqf557l5te75wbhp8mv5csj57sdi2p2qg2r',
                retries: 9886272181,
                size: 9400101301,
                timesFailed: 5970114660,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '1v8ze234p2kbpnwzlziei4cgyqutf0so9cr7vjblhptifvb6fu',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'wdb5ac9rtyc1c16gnwli',
                scenario: 'zex5lhkmacv1jw9zwhy0lmobtiu3ibbkk28wi53d5gtwftaczu1mns3xrvr4',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:03:24',
                executionMonitoringStartAt: '2020-07-29 14:39:12',
                executionMonitoringEndAt: '2020-07-29 11:32:59',
                flowHash: 'i1loxbriibim0pjcblo2npiixi7tpvhowk0k5jxt',
                flowParty: '38jh3hf89vels7a1m60yvb02vz9ir2gpspfuscww0h360i93d2yaimjc4qua35gu4vrfwmg31kijiamnf3tepqit1v4ibuux2n5u8ax0fnyg1y2pg2zggjoyqhp5z94nus75wnzzq10mgqj8vwdxe64fhqynhphd',
                flowComponent: 'rlecls8kobpyjfb7lv7enprfbexlbztg7845p2tdzqzfiscoknydj1z0gve2jiwncrr2px4yb0qgy79dr1wdw0vy1suz4bolxuhkkjg8g0snwhvu5dbyb87phdtm41bdea8vabprqgl5pi8fapgoz1p71i1re7p2',
                flowInterfaceName: 'zq8jzjzmolxbo5as2xxdnuiet8lto0h5hqj87vj299ohnkm9kv5rayokrejf5utouf7jaa6009cunpxzkacio2pf12pwvz6suy5ja133cua8ckz1o8qmrz4jcm0n2iqr4yh6oa8847h7qrh24v7v28jhcsinxcdq',
                flowInterfaceNamespace: 'cgp3xh01pvr267kuzlyv3pih6xk8xoh4fz5mzfptu84w3quphze97e0z0kpbvocg4lg4tubgj4oqrf8ufkhaykz69jqfhwxsebwqsh7pbfvk9atmiw5f41pmifa3fk2ur552zuspzmhq5nbx8pqq93qfefhb5a7t',
                status: 'HOLDING',
                detail: 'Ipsam exercitationem voluptatem unde. Non aperiam laborum aliquam sunt. Expedita sunt architecto.',
                example: 'f3l98pvxdi11c56dap5yrzk5qo4pkfyqbb74dsf84w4usag5e1cy2x1irl07s0cdd9r9xmz3r0sn51wmw384q80wkczi5a9gek7dr9dwz83r8mcrrcxq7le86sb4az7ct54jukl77w0a04d7rte4mn8ojm13iy8o',
                startTimeAt: '2020-07-29 07:16:09',
                direction: 'OUTBOUND',
                errorCategory: 'o7yfvfpjbum978ad9dc4vz7305pxanew7vrdgoqddts2i3dfjukik45j11tm1ypot1cri58qf6s4z825aht4ztapez2rhiercww5pbsdggw4aafgg2n5s49rsttrkm75bi2np7zx3s7odhbanrppytj7ny8pqp4y',
                errorCode: 'b4rjrulbtr41g899255nbxdvs2f98asdthyu6umonnx6feggid',
                errorLabel: 169679,
                node: 3044191087,
                protocol: 'spakwrwkedio736bxnyk',
                qualityOfService: 'hxvis2l0v65a569cg4xj',
                receiverParty: '2bxt1pwdyyhmidab87mu4htbsrwrw2ocg2owcn78clma14n6ckeym9o1upk89w7ngciulisn4n53x3ca4uu1y3vn17orhbnt2tmf758760wdeviuqyrfopuoapa4hlmojb33g9jc4k24bpxyejwvlsxh8g19ou94',
                receiverComponent: '266ro2b92g2tvyh77v0h76sgm2pby4pfqe9n0wy3hfe38uv9y9z35535ck11dut6go4cf666hij7c0yq41wv8m24q93b2m3kcth5342afz5em3h1p310igdf3plxnar2yo2ked6lfz4li48vdoe79826mvl6jgwt',
                receiverInterface: '1837gfmv19kijkv107k7mi7om17crpybkmwb7t27964hv7cyo2jafg2mdn9uu3qelngk3ira1zagjfw4xyw2ylkd8coyiglnpwwhr4mxlrzj20otqrx6cmxazgaqx98xlrdkd941mwtrwb768pf0rwgto0qd2fhb',
                receiverInterfaceNamespace: 'g0ubqaaipb09af96uvy9xk1mxcp41mw41rr6ysyu1o9rv4bm991vsyv14kgq47ylpw8jbvuk62176hyp4gxksnpnsxl9a6z4uhmyw2crw2rzlqmlzquwm5pshl48m3bdf2k1xph703gkilxj9gwsgimch60v5mw2',
                retries: -9,
                size: 8976231710,
                timesFailed: 3586921466,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '4nkdewvek5uqb7suyjychn51tofktxfjagefuahcqogq0frcfv',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '4hey4157vf4aw57kzh1v',
                scenario: '52ixw25z8vajopg2suk2qjmah87dqvb2198vny7ak5tcvkjp3vz03ra2w1y0',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:21:12',
                executionMonitoringStartAt: '2020-07-29 02:03:55',
                executionMonitoringEndAt: '2020-07-29 16:58:16',
                flowHash: 'vnqt3q8nnnnlvcucjbz95i8ki7nrtsxs3wkkr0jt',
                flowParty: 'c766v7o0qfldvzswqlocwo44xzbdhzmiazbc1ycr2mmtysvwruwaj682q66ghzy14h0aesn6g5n9rzf3918ciefcxc49p7hexxmjq1fi2c7gviahz3mjizjddnfokab3dl6hkulaeknvv4w9dyop6jyj4lgdowwp',
                flowComponent: 'rdire60f3pnt5e86swuqiyc2rnmeidcv0x01op3qqh3i3o3tetc5vmizgqj0sa3d6qru73vi4cxqp7r292r8oomq9uginf6o9yc9jrlw0b0w202n5ouist5azf6nk2o3x6wdfuoa7l2a35sr33iu3l7qmkfd5kc7',
                flowInterfaceName: '5zyr7o90p998zst7cj4blxi779o766cermjqsstetn83lj63of8ui57pf8je5h8kx2qdxd6xgzuj12h2cr1zx2h8ffm4267s6utagbeamny39wc6d5h5l9ataf91g8vnpdz31cx893ywbsvd5cp1uafrihxxc18i',
                flowInterfaceNamespace: '6ghzzejirdknzz1pcucuiamf5ruq8tvhze9ixco5wa8sj4rqbu7rh0ysjwqzatzzy595itkie49zl15o696o4nsiy3k65lqjystjxjtepz9e0pcgf4adu3kf7n6gv9mfd9slcv6x6icu7sxfw6ovli22bgzfafm8',
                status: 'CANCELLED',
                detail: 'Ea quos delectus debitis quia veritatis quos. In pariatur eveniet velit. Unde molestias sunt ea provident dolores quaerat rerum. Vero animi fuga sunt in qui iure numquam.',
                example: '8tit1eqjbskf6lw8j7dbeomdc8ibfhxsob9lda05rfznuttq96191ktckwjotm0r8ou6kaf5x8rffkrvkwto59hwrck60rnbpwcszh4jsqyxhe7l3050s9gmo30lcyqf91jzg20ljvz8wosmlrm7betio76xe3pn',
                startTimeAt: '2020-07-28 23:47:31',
                direction: 'OUTBOUND',
                errorCategory: '1fule444rci7dffux4pn2q5675za6637x856y953zfzc8smsld3f2s883y0jro5sja53vk5wus3zr09u8l4aselmldpglcy1vd9q3wro5syb0qscp84jipwnv3ln5pd3lw7473bqdxlm3srrda2wrfx2jcdzi65l',
                errorCode: 'tcdkp2wco9yg8y6nuk81483nin97ntvccnx2edjqiw50o7cnrm',
                errorLabel: 432359,
                node: 8951085016,
                protocol: 'h0mvxat1pou8usid1t0f',
                qualityOfService: 'okm6i30bxyv7bll6ac08',
                receiverParty: 'niqurxfehgms3v8kc1vhndoumz34ojkiivzwshaezno0ze2r1ajqo1dz0zk5y5e2s8i5imq07ah6jfqfsc7elo1bvuibzgd0icrkra8ksowydfnflvl7hqq8glnxa1bl80gkcon8kisnox1ige115zzkhux2cz92',
                receiverComponent: '2mb9nsipohl1402f2ra7qcxdo2a0n8isy488vmugvqctfrbh2osmrqjbznpgk2rzjp288jcy9fay28c67joo077a3txr41r11i1rfl4xwlybdwfbg7k7mumrpzy18cf2jtc1elfqvrp5sc4u24z3nhq1l7mjfqgl',
                receiverInterface: '33vqpie0itsb7s6yphwou8vwh0kefkpoqk1zrfki7a8u9bz2h4unafny91mqewd8w3eabu563v5hrsj7v20iikwlw0aud99a3r5xqgljyv7tt37znw2zi1a5dp0h955chdnnpxjswj38iapf9shea7jkejujlbtk',
                receiverInterfaceNamespace: '13rxbds2f4q4kkhihp2hhanrz1422f9m79cir9ipquu0meuvejt78v3znigi10gw2wix5w2wf51h58l2s506hb1p8u6dimiyg0ejrvb48p8h75qnjkrpi6rq5chhxdy0z3vv0nytgctxjwm5khjl9lcrl380011j',
                retries: 5560125726,
                size: -9,
                timesFailed: 8983186902,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'in56jdtkt56goy3qwo2d8hmc5d4w864e8hvwkicgxdtlmaj2yh',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '2u2voka45w9oeolm6c4s',
                scenario: 'i085z3p00vibqwog03lz2u3wy7o47ry8odpc6rllofamhqrmrfj52mtrbolf',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:57:23',
                executionMonitoringStartAt: '2020-07-29 17:54:22',
                executionMonitoringEndAt: '2020-07-28 18:39:19',
                flowHash: 'qlyng6w4zrjcr5lyalv848kdy0hwnhf78byaqjxu',
                flowParty: '96d2s9var323s194gj4c1jd3xd7u54u64rb3h0fmhsciu7i9mm021oee80ddxe5o0lvtuzif7je3yqj0nb5f6h4iaiig0mqoryf5pmv78pptirdplewscbxe7anpn2i19dch3vdduq7mxt9adzyrcu611iwthw4q',
                flowComponent: 'wew0pao6p41pngfchaojxf6e57zzyjk8571tpwippzi58i38jgvgqy6xbfd9omzgockqleuu742nuifdi3cn7dv4f7qheg392n7adzvh9ttkcbrtqfk3pvgazjzebbyi3v0pdtab4w8l0lhxewwjmcsi5jg7rwiy',
                flowInterfaceName: 'gx0ouht5d3j6eomi2v2x23r7lrhlee7przvmh0iqnxo0dl3izfysa7zj6l2fdpjuomgqlhdrilleu5e5pq3ps64ovwbk4xdbvyc18cw3emj1ic6ntvovk8vede8nqq05hft289viw0zw8vxyd6p9faqlh6nkmt60',
                flowInterfaceNamespace: '2hhrx8u69bmqjlhepu5q8e214u8gsqmmwdsslzvp8fzup8b4hp65x0t4pzzpi3pz14aqu4umrned02vjo453cw1j73v3c7chyo6j02p2zmyuivjqtizhi1bcwjx8vkjlfithlqfwy09a4whwg2xkar4wxcz4p98w',
                status: 'WAITING',
                detail: 'Consequatur provident et. Magni dolore nisi dolor. Est ut tempore est aperiam consectetur. Odit voluptates beatae numquam voluptas. Esse natus sint. Doloremque dolores voluptatem laudantium voluptatem commodi.',
                example: 'upwuev7u31ppc3q12t90cokth162mv1fbiend6pbdg6vncto8v7oewerujlvyqgg64a4us1d1c2rl0wps8fj11nuhikfgln204q426qk4u5boxn6f50yf0a8dc2v7i7obqu3cc8cs6f51bxs64y40useaysfmvtm',
                startTimeAt: '2020-07-29 12:41:07',
                direction: 'OUTBOUND',
                errorCategory: 'pdausw6n67me925ja9536e762ltnuwhy4pjpcfypkvo6dpdaew9bbye7m9w8nj6qlqqe9ye12s9omxnaazshige6kifz7q8kzcetr0mqi9zu0g829u00hm4k1ut03ljal3l7wf5yxe70oare2i0dfxkj5gt2qzgh',
                errorCode: 'ej5et565weg87c6cznbjmh64qafin823e0kvp0koiixh8smbed',
                errorLabel: 972968,
                node: 5517404315,
                protocol: 'eetz8x538n1mqosrjpnb',
                qualityOfService: 'rrb5ilwwqxv7xnz0kwt9',
                receiverParty: 'ps6ttp3qmg6cyxosqen819fznq4b21cdaizhxtanmo6wzst1vql8lct0a52izdyryhr7eg66uaxe5dw9zg4xr8r0jpqynnv60kspusx1ae2f6i9l19ucysabsjmdjaenatv7bj2rjbinf2luhilud0o3zzgr3x6d',
                receiverComponent: 'f9gu1g0haiiayjl3ijb4u6xi1loagv7vqd4pqsfq145ehhhgeh3vwughhaubglhp8flc0fulr1lk7rt1h2k3u1oqukw9x3o1c8ismt9fm10facaal3sg0vn8ba0w6enq9brwf0bg5q6a61iilcnde0lp6pk9gqt7',
                receiverInterface: 'ep34o978o3x1gj2p6xd1f84co7d642ryvn7mvkzqq3h68o0gzqbl0jcqtexcu01cojjktci5j4yjbvpxkfbxamkctaz4fp36jgbs90lc7nieoec0ou61hmnhi0jhacp1556xc28hbpaxptxym2t2p6nihn50m8o7',
                receiverInterfaceNamespace: 'kyru32im16bift1ilxwduku2x49orxv4oe4rr11vcc41jqbnntcavc8c4fbuh1t6b4k22vdlqlqkknbjpqkn1rtp0wuj64lxkou4m1a87sa28gz4vhewwpu4z0ijav4has3sx188cyldfdt74wbvc5sw638l7s2f',
                retries: 4017451001,
                size: 2997219961,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '3ywk8ojnd3hmqcj0igq0t14sb93ouukk1f01vkqcvr6ebif9ys',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '64xmyhlhcg74700f4to1',
                scenario: '7z4pyc4iqeyjl3oe2irapbyedaih9ic3je1v2caeghr5mbkqdl56tor8n0kt',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 23:28:25',
                executionMonitoringStartAt: '2020-07-28 22:26:26',
                executionMonitoringEndAt: '2020-07-29 11:43:07',
                flowHash: 'c8h0xysrcchogk74lorcc6jkqpu5wuuam0un4t6f',
                flowParty: 'knp44got4pdomkvxbew0pm3acirdfx0e1jwd4s3a012ttcaaovhgd7oinniohhga3cnbqc05y2d9lxm32ihzty7h888d8umq52jonyh7mrx2d76owfxmktirgf6q0unvl42koj5ov7e3mwsweorje9envo9yxptm',
                flowComponent: 'lalk1ddhmviyfznsdhiyt3h2hxad4606f46ctbot2jzyubzsgotxul3zt44dmn8pn5wrq1q4nn583xqy2z7a5sndf0z41glgm9ibu0a74y9tyia7l276gxvlntdalc5cyc4dfkjskvvsh71e6gscx9425g9kp0uh',
                flowInterfaceName: 'g5rvzc10mtqh5oxi3w8oj0k0m2e7ug9ulj4rhebzsj81zs5xpolt1a6mm1lubtp8zuj721o7sl2qpg2kibyj9s7goz4qoojz55vfrfwnj5wyt7kmktka0ex2ncasob9clvwobi7fla2051dsxi7iqxj3wkmb7mzn',
                flowInterfaceNamespace: 'mnpysjm89d8bjndfqp0srixxl0gdad5p95wjsqjymqcm5u1gio35yt4y5qcb3oa8icvowgjzmgm6x1kpq9maqa1qre8jw5usc1iwnv9uisfjlmalcu76ey3l0akbv0lu60u8axp3ufnpw9lw0haiohenhop68gok',
                status: 'DELIVERING',
                detail: 'Et natus recusandae eius fuga vero molestiae quas. Quia omnis aut sed occaecati explicabo et. Eum est quos qui odit repellat laudantium. Enim et deserunt molestiae tempore mollitia ratione cupiditate perferendis.',
                example: '4b9ufxldeytfr2vo08wjgock7kmpantjmfe3k8me8iokkhgu7t1ipqlu41gq8seea2krfvlg3xyloczu3wkyigu0zphf9iaezjijd5o4zorsl098c8o2v8lc4t1phcb9os2ij9yrcn5qlnc6teyt97ivyvmwkoxz',
                startTimeAt: '2020-07-29 17:27:10',
                direction: 'OUTBOUND',
                errorCategory: 'eza6yeevi5xs2q2pl8c2kte76xfrpftpude6m1qs8y9nxuahvtcpmzdopn1b7xxp6cl8u3rjnzhmuw9qgpnfifmidebylukg3dqnny98w491rvjms3cmtxusobpqd0wl01at7v75xclrznzk4dsnosdybtcn9qjf',
                errorCode: '8jv8aok6ya70vddv42s6g5jxuer7ctzvkl31jsokgasypm0p81',
                errorLabel: 170432,
                node: 1973380683,
                protocol: 'ymps98s8r2mwycj9qcqe',
                qualityOfService: 'reatyo3glltxi4b22q3s',
                receiverParty: 'y74t54d0kl0mv75fn2b6otipo0d6e0y2m64s63791f5dui6h7ki9rehijmiki68584osyccpvjddukl8y3eizzhy7n4vy0m3hudfgw24snpi25pbscs02gp9z2oroq6jpwvz8qpxfncdgegn5vaes7ruqaoe1hew',
                receiverComponent: '2cw1idgoh1ruw5nptfc5jdpt1suf1ans5wuu677atfdeiejoc034uobyn1titutrml0zptw1fts1xsziv5vu684zc0w1m0jmjsjsc2b2p47tfd91m08nh54uarlhh01zlgdsucleyr6u0mcbqg98ieso83b9qi4k',
                receiverInterface: 'y8xhnc1kclmn63qpbixn3vqnivkzpja0jypd1fjkulyvgev2zao8yknqnw1mpfnnkqhmz32dos4g98fycezifpxpljxnkpzmj9u6v26uf3oymb8w0ma1ngyuxcm9ht1glpgy5gff1sd1i9av9hwg1nd8keu8ai94',
                receiverInterfaceNamespace: 'pr88pl4pzaz3l3j1uztgtfp4vxx9qqpo3gth8v0rxragtjyh9mr9j5ovqkvwwbizqx8n85mtiti3axu0t54a92ec8xfpzwsz3j5s3kmedqif1wj4nd4cz8bb01yldftjid417kv29l01r3pclug4okb7rpsg5g0l',
                retries: 5760345436,
                size: 1562130472,
                timesFailed: 4682416424,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'bjr5t984kc7822p02ctvk3karybb6jvd80sw9kspc9vvj1wzfu',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'hebqyzp6cbdhaf8g52ke',
                scenario: 'm1bgdtcckaocsvh4nmt8cvifihh8dwbp3j0iu50jof7vc5gfdie3k8g9b5y9',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:51:51',
                executionMonitoringStartAt: '2020-07-28 19:02:16',
                executionMonitoringEndAt: '2020-07-28 19:21:44',
                flowHash: 'boezeztsfxvg4yws8sibfeel0u2qs6iceb7qxava',
                flowParty: 'gljona0qbndxae97ute03j0914hlvnxjvwhul52enrwu3dgpmrkuyaph96cffr7kmtyxfzixtf6f61gz8ioanhpakqn0yqqf53ol4r9jsgggutaexod6nwnzw8lk146viufxtqe68edi1m3f12kerkix01efxep9',
                flowComponent: 'lsmae0xjzq0bfemltglkeh9qckxmx02xdhy0x4a5sfpvd59es1h2znkkv09le4wdfnlfr0cboh2tcwxbka8pmo28v12cslawczcoeasaivf8wsc66cz2ix16334j4yyrgl9m0gmfhn273dzlvitpono59tje2fk4',
                flowInterfaceName: 'zbt51ukk9anpw2cecydsw4jfcn91g61h0x6k3jbr9vgnbtp6g570ny1lmyyjpv1chtrsm44cid2adliewbn5a6l0opf785zl55k8r416qnd757bsnce8o9jbryaokcau283gcv1dt8vu3bh1fpim0sy5ceqzyhnv',
                flowInterfaceNamespace: 'hgemnmku5y0g61rv9hq29ft9k5kn8a6u2s6sny3wl0n2nofzbic8kllzoum8u9suryzrgh3rk537n3qasgdov4lmzvyy8glgcqub9e4763cntnba2lixxhle9zso5r5bw5wo6va9t2celxi2siyd5da2gqjj4nnd',
                status: 'XXXX',
                detail: 'Nobis quo vel nulla asperiores officia voluptas reprehenderit voluptatibus molestiae. Placeat voluptatum earum dolor. Praesentium rerum temporibus eaque. Dolore tenetur deleniti incidunt molestiae voluptatem deserunt dolore.',
                example: 'rcmucekindunma8vhd8aij0wzx5yp5ws7hhnoj0ul827vbf40ggv3ii52ffgz8lyi0bec08nuraxy8fzk5klan12l2q4t76fqa6i67932ce3mziibydyy4m1dwj6uv9goebti1u3mwtcvxr4vy90q9rhh4gfwx0f',
                startTimeAt: '2020-07-29 09:35:15',
                direction: 'OUTBOUND',
                errorCategory: 'vhmrbjil691lbdlqfc4m8mpyigf970baihafrd0g6bkivfw9kc6zffuta4m9fh8vjwk34m212xg6yblz2nl1tb68jd3p35dnnfquvxdlhemd565dvsbc8ho5yex7v2wo4nlnpf0p2mlwv1nmxjm4ct1h5pfzv3br',
                errorCode: 'ktauucb3t9mat0gm30l44iwy0ipewc4l6l0d12sqc6wnn7yluo',
                errorLabel: 882064,
                node: 3811264982,
                protocol: '187owy3mom8jmhltr26c',
                qualityOfService: '9n232642b33uygo97cvs',
                receiverParty: 'cn04wmt6nytvsty1m2ol6tyc8mrwxnxfc5m9c40hsw1e4lpg3q81k0q828u2nywir03d74qgix0jz8pzrhfir8vh0uwlqmpxiwrffupjldkx4vf3f8ef7nu1rl8gjgu30z99ecxuibbeeuyawq77sr7eutio91rm',
                receiverComponent: 'f82jwmf619gp0xxojm30o6035vn6clu1mmvniu5zyu1m3vksl2scqhalgh1gt9jedzy4oqa6yqpr35gjt3f5ql8903zlmqahzecqnb4qixs376hp23bjmy1hm9vl7g22v166fmx7dhfk2h9fzigczgw7ukjfzdko',
                receiverInterface: 'uf7zfktu2t59p1hyjy3m705frhc0sqvcii3asskoouylptp2uf072fm47y3npexbq3hhssfb9pxd2ssvuq3l1w5swta5q9ck22xe1q1zjvugu7eq1l2k1zhsu6r5fr1hbvtwlm6pl3cjmn3t51hvlpbngr6a03xo',
                receiverInterfaceNamespace: 'cdy2j36ms5hd91kbdgp8fj8dot9t3aimkrtk0pvpkh9nkivt0y7id442c3wb0lv3z0uvyfnffcz0vv0eqxhdfn6r5mb6m6dzzoi8yaov2mwjnzqfvf2eexx06a2c15cacj9ruj7la7to274sxmavbxk6ycd62lb3',
                retries: 4018149006,
                size: 1428970071,
                timesFailed: 9529410365,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'dt693olop5ncq2xzb06sjmd305upzbo65bm8q2eyewhcttvi6z',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'kzbrrst38rssvzj2tesw',
                scenario: '30l408l18qbx8blig72rz8f44slqcyxgix94yraxgr8m6upjyvizv4p1cznk',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:02:43',
                executionMonitoringStartAt: '2020-07-29 13:51:03',
                executionMonitoringEndAt: '2020-07-29 02:49:19',
                flowHash: 'yqx2a9ddntu498lpc04awb6ku4le35aojt6mruub',
                flowParty: '20dkbrhw2oonvvyy4l9pg0tuxql9cqewv7klygtkkdn422fm4vgf5bwsf1253tc1u62gwhjsmzk8afk3xvt3nbnctf3u75qu9h2mrb76wjg94qo6wcm1g3txjxzvn494m2p6xjy6b4f4dgoy2fv8unt5556l2x2r',
                flowComponent: '60un5j0kwf8l2ecdugmk87aua4s1fj1j3i918sh00191f52nc4glnndbirh2a04h3h5yxp0dfflua25etm4fq0ym2g7cgs3ur7syfhncq9xg62qn6g3dt2auk2061zl7t1lmknxe1zgbv0gu6omydrlz6915yesw',
                flowInterfaceName: 'yd1v9gjefvco33rd8wk2n8pxzn1tdo3g2gu37oudu7psjvnjat6z259mcvw4rzjycrybg789rbtpayhnn1qxzi73i5rb6dzm4q8wlr2y4tkimlud74qpuurm1yqemxrbhcx5pl3en8jtmyw0s7rrw6encvcznq0m',
                flowInterfaceNamespace: 'riavz4fftyisn8c8fgzlhv9tmrvshfsj6swj1k1d8w325l5fmhvvk0letqvj0fp4qt0hdp9gfnsfw8ke678qcpdrf3692ga3j0526bnrkke9l27pypi2fpd4538sux8yjrttgx5f1s2tgoedcfib1mytf32pxeev',
                status: 'CANCELLED',
                detail: 'Reiciendis minus dolore dolorem est ut dolor sunt laudantium. Voluptatem voluptatum recusandae ut ipsam magni labore. Et eum necessitatibus ipsum veritatis enim dolorem quis. Nobis rem pariatur aut officiis ut impedit. Aspernatur sunt veniam.',
                example: 'fgv4iyqq2qltqf5cu3cma8o42diuhneyveffsmaypoqsnpl5v6wzolfdfef3phxhjstiw98audbbxtmvv5cvkwj5jjwujva8z8gkdhw3ls2vhtcnnr1pgd6ag6xynwtdjqerwp2me8vpfhv3nvrwvfjrw5lnwh80',
                startTimeAt: '2020-07-29 14:17:51',
                direction: 'XXXX',
                errorCategory: 'bm0wltkxo96op2ni10ifsisvjsaynml0q9iip8e80lsrnvswnk9pjsl282nxnaq2ha9twqy3t0y4uofs63z6zh9fyywjoi5h80r49lfpi3uxwohcan85wngge1xa2u9uexraev78nf7nvh9cizm61s8ynbk8rd1u',
                errorCode: 'npy78l2skgnnkr0otyrvufh0se26exej3kkwwa6sc1zfjo836e',
                errorLabel: 778584,
                node: 6421819041,
                protocol: '3e9yfchhgcy0s3wwugsd',
                qualityOfService: 'n4xfsui0rrrkz8ugi97r',
                receiverParty: '3rip8jjcgi10bn2cji6ngrxxo6hg7yk6nsuwcscjl9i9klzgr2juk41xnd151mfbaogjds347lgbvida9ykht8dbnpzuvzfsx5qi6gn37d753rc6lx4wyu83r1hm00krf3seqvxbifgc1z6x0a5dm4k8l0vepg7a',
                receiverComponent: '4701tr7cjkkv5qrzh4bkx2vmrbwhvzticxd2m57ftatw99rlce51wjzkp0y9khdxl66z2usnojotuy3aw94mi9n2m7b2xhnu9ce1ggtnomwxqh6ejdzqhpl41m8dbkm2rcuakwss6vho6rz9zlejap1147go5c2v',
                receiverInterface: 'ymu4kkenq61q2hipk7sp38yl5qo03cccxb2k7emdbbnd7k707beqcki5mjz45sqgr09jlmd2s13gvdericbpl61ogmwykid1k4gs0159d10l7jn065vj79zuopcciweggv8lugpf73jg8bh2df2uvkbk1dmudeo4',
                receiverInterfaceNamespace: 'ttvkiqk2bid6esn1tb3k1ps0pmdrqovdx4y8pcnzw6lqsf2ldhyqhtmg45vev7u3wzktq8tiygit5gaelsl36cgx12bp3m06cv6vaeyqgw1erc9fexoojrrexp54qwuve02o3ibnvf0kk6j3x52jic12mdpiyl8r',
                retries: 3151292990,
                size: 8639104537,
                timesFailed: 8145912487,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'wiuikbvif7hlwnvn80icu7qvn5pclpszaugazez6mvlph2ahtc',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '9ukslltw68sikdht82fq',
                scenario: '601vc19doq6o7jf544rkpw1ov0jfjo0zyadskyj9y3o95pvr61fpn6ygm76p',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 05:48:53',
                executionMonitoringEndAt: '2020-07-29 07:46:44',
                flowHash: 'tjqozc2nhmwnk2bwrxvmqlfa0r3u96zji87epuwo',
                flowParty: 'g94eszrtfeehfae2f25v7bowobg5twb6jl6ktvplouv8g94g1k8xdhvhvu8n7mkgjzziavm85givm04bmdh2qtsqqlbzwntfltctzz5g87zbcr0yewe403o10w20s7tj30j4d7u4c8geldst445udkegpigemjfg',
                flowComponent: 'opkiaqudz7naap8etwgczp0h7nipp86g915tn7cqf7epzpfvl9dwnp876ut42b5a5c3oszy6pz2b6a7fdx8me910fzpplp8nfyq2271acrtba7tf2ibtxm9goi6s00nhf4o258zkad6jde5kqd76n4ne835u6b8s',
                flowInterfaceName: 'i8joykgsj94sl0b4cfg1rhebyoaylwxvlqcq7ychpsmvghp1js6h2pjcotbr6q52f9rqc5fxwg335cpifqbk7bj63ngevu8g8u6p2uc9onea3qi8d3827phy6ys1gjz6x9hhr8ckpv2ul29z60copjieoqv42qa0',
                flowInterfaceNamespace: 'hxxjqxu6fty1v099hs7zaliu01kgfst0lbccq4jxrlo66qlb3o0s8pxhpg8q3l9nfio5x9hbe3uq24kc4qhzagafvh8cl6f8qy0aocdqidwhmiheeo05eue02cq1d1vthhs1jsmz455oja4wjrhlfeo8vaa40ohb',
                status: 'TO_BE_DELIVERED',
                detail: 'Magni quisquam officia. Harum id omnis nesciunt eum facere sed. Numquam qui consequatur adipisci officia.',
                example: '17e9u4y408o36lo08ziv4bb11fybtofzguuzpftw6k1e6qyevbficfjfvrb25b5q73vrkzj6yc4t9k785ky6vp7d3hr30driz0zaquz300typs959dusv9n1ky4lndfh5d291i1xhbfr5s44dq76dhg50s2a2bpb',
                startTimeAt: '2020-07-29 08:55:12',
                direction: 'OUTBOUND',
                errorCategory: '3pgc29s8ifecfxn900lfc61uqrm857p3jnbcfmgoxlwxsnqokhss9fw3phpsm7g8lbp9pmmh3lu1zzizmb6wdcytgg5b6aleyxvlstdubl2ukscfs5nayl3i5gqlttfm2hbzclbl75t7y7x8tz9q3amftqjo006o',
                errorCode: 'l84jzyczqekmzi4e0y28vqzxe1kv8p7dhtsvjvigq3fxo7mymw',
                errorLabel: 165609,
                node: 2252868741,
                protocol: '7z5nkkso754w8pzczbxk',
                qualityOfService: 'gdmz6bj452ax705unlcx',
                receiverParty: 'g740wh6w0vyuerp2j5ywu1b3p1nfutigpho9lhjbd5ic33dcov9gj64bzj3j47sz0wwr7th0gb8g5aztoprbvlrc3us2dsiatr0zkhqsarn2wiek7bmxl2aczhrmuqz4iqmp51z0p84woh6niriz44m2dwcxteub',
                receiverComponent: 'kmr6ubn46zl1v6r9yqvc1m7kxw64je10nmn3yma8nqyucmylozlvdotmtndb9blbh3ogbx0zpovspu2upeo0btzx4a9c2sf5in0jaj7v1jp1gdmuj4001wen4a5qf2vy4pb3m24ke8eiq6fbf90ht0ej314bvxff',
                receiverInterface: 'qa805zzpxi6pkdk6ml2zc27juxtcnvuax8iei3zcw82pohqs92o098mnkurh0vwyqqat6abnoe680m1kb2qp3lxtdtnwks5qmd950jo2du7zcynkimqayip91j4dicmilz9sgx17y2an77a66a1jeevxv2246ibe',
                receiverInterfaceNamespace: 'xusjjrrgrjyd9u6tbq9wy51ho9teef39rxtxl4p48hltdickh5501dulo8f5sq0un19dduvn1aoqcxn5v2xus6xpaerpeqvgowrf5ol8y2l0im0oq354qqbb2yd9393glgmod1xcvmqqjf4vuw5pggor7ok5sqt6',
                retries: 9047098937,
                size: 1169482097,
                timesFailed: 5551899006,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'mzcv2wpxprxm3gx8jcoj7ttbs5x7hwnuwjqe5hlyytikpnkygp',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 't6kb1tf6xye79lnvb572',
                scenario: 'qv42px9l8tin67q27mik8hx6gmgt9mbz88ui8z2ldn1od3qzgw5qbi9l12xh',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:53:17',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-28 22:22:59',
                flowHash: '8skwcrpmzl72zqcxld735r1u8wjeb3njn9pj53r0',
                flowParty: '6hzco7njn5o71f1tdu57kbswqoy611t2ls8wzmlle5759k8nj286txn0jg1h58roxhvv010hnkol5jc0r4gw5pf5fqh87bi474lznxm7p57latt6d6q69ifmg71qk0o5ntl961qcbomgd20bm3huvheljuijfn79',
                flowComponent: '9lo6shk1jd5qyqbau65he8x9099b14ek2tz7z7yu77ybj12ev8jpq2uxksbmmyzs6hf446p4wxw2y11kl554ex4a7rgo98xslpqv9nnft6j5w5l9fqvkdvjpnmspjp9nf9m42hoghj1eq9hy2r53jstdet8s5q02',
                flowInterfaceName: 'h6q2mlwlmj4za1c0n21edoeegvxy9lhoxz0hmv1sj2ashbh76g14p38gwpmow3vxqeio9emtnuv1jgadau4j3ixhyyv0022d8ht5hzi7cjnnlj5qvnv9i6r6b2feq2omvp6g3p8boq3hssiswiriwter12fxs2yz',
                flowInterfaceNamespace: 'ywkloh8wgtj60ngd98k0eg368t1xa5h3a15fsdvb9yvc9p4gbg0tjns39rm8c6v39kr4c2ealliv8ii8olgg8ao4139py0mr9lg0s4dcjmqkuc62rhto6a6r3ranirsy6xpx2ga3dn642m2mbfeliumw6qdkxyvr',
                status: 'WAITING',
                detail: 'Omnis explicabo voluptatem rerum. Ut recusandae rerum totam ut earum enim voluptate quasi. Quo officiis excepturi doloribus autem ea. Hic laborum sit praesentium doloremque in soluta provident.',
                example: '5z3wq1hmn58lqyaq37akocm2n89pe0xf9csr6ru1rsfq6yzee4vfzrhk4q3ymym95abomab16m7q0z11cx48l8cvnddcopxodwxav816dasl85pz10cjsb677xpyi1xsszgwcvi6qnuueshiw803w6gkjjrsxwgn',
                startTimeAt: '2020-07-28 23:33:15',
                direction: 'INBOUND',
                errorCategory: 'z485glavd55off57kbhgmw3dd3nthr7w9z2fu5t1jbw8zvb96gwgxc8kqkhw2o5a2ibyf3i05d4dbpzcs1827iy6m7rb6rp515mhegmve1q7ojsf46kijz1kjs9bxpxyawbc904fwzm11ssq7yvfnyyb971dxj2s',
                errorCode: 'jb1zhsb6rqy9v71oy8cidcocvp62swogo3rclqdk31nzi6cvcg',
                errorLabel: 156041,
                node: 3331672069,
                protocol: 'zu4d9z68vkdatp14t4ox',
                qualityOfService: 'zssda0esrxabc0zsd8ct',
                receiverParty: 'o9osgfy59x9sj0zyx3b0fmgp6sse9tththnudlk099y0dqqcmptyp4c9q5tve4hw7cev4ecv259khiq203ocpsrbv9ard15gsy0lz9lhfoi9jod5c8kvsxpifdna3rjeprqvs9wsnck03vwugxpku3k14w01l1xu',
                receiverComponent: 'mrw13iixuuubq8jzl3f5t92xi5h31j3fjfi69gav118igkev7h5bxunichny34puaiaavgrfvwtjtrh4bhvr1hf2pwg0r2qg6b8enyyw48pc94oktan9hlxqgeqfzdd5awm1rj2u6ab9l9ooiqvemo5v0ykbfnld',
                receiverInterface: '46fe66e4kp7fxzkaasuj2lcq9fvesog4zg2xpovfosixdyuky0nl5l7ghwzb7lqg0trafcr02b668pz5k7d0rk7ac0lz4tvwbn79ud68qs26mwlr6xbw2zjekg9cjl6uqq5y1om6zz55989v55itjvd1yx3vd1ok',
                receiverInterfaceNamespace: 'ml70yseehyx09hj90ekijsl1pv366hcofjlnax74bvlu6qokxxv3bj9eq84z4f83ew0lvwtgblpa3j83itrjb3il5a3lakm5llgz6fx9vmfh97cihw9pd5yr2jax9eavj3o8e5j3td5gulzbsfbqkf2d277u4gf7',
                retries: 2943807044,
                size: 9233514379,
                timesFailed: 2273335786,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'vzqwsxh616bjofu78428pzuatz6p61tu6cbvn7ffbxkw1g8lfz',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'oah1glzf1cd0vl9xs725',
                scenario: '66c044w374q6wkncmey3hw7k19yq8bls6q0a2dqfk64wh6nrykd5zg8tp97j',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:22:25',
                executionMonitoringStartAt: '2020-07-29 05:02:09',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 'uvjns4x61747e8u5rw51xhqpncfr5ljwde953f33',
                flowParty: 'shkvjp0ai20stwdy9c2j65dczaeuerpgbd3s049ik54urfr823m43c2h41kjgojklqyrit5cegbjiocblktdufwg3z0w77sgi6hityx2osdop1c7zlhy672tbstzdk7hrurwe15wzsq2djx82wjz5rsnidpn8k65',
                flowComponent: 'c7w252gp54gadeeeowqleqialm2u4ucmemljer3xq7fw6ckoan0ekf0j2vu9scldjj41vgloi9gqsf1xc4faagoevu7bz3jl87njk536dav0j4q9i9yij4echn8hesu57v8ywnkseqptqfouceuhrq9viucvzjoq',
                flowInterfaceName: '11wf0x10roobzxckcnw9ke11s7k3rh3z1stxl1xeenm8upyu0hoj41mhi0gfx9nu8v4yoeunr6soivikn8sg6od5frlz1h8yrl066geqxe9swni12wdzb1grbs8wl74wkd4xzcl2by9s92x7ugd1qxhje9cguzq9',
                flowInterfaceNamespace: 't40a2bv40iamorz9vu67k0hbyv1sqdobwg8s3nadxqg4tpxglwde39zc70gv6mb5kvps5cm1kzno0u0ola2dbvtjpe5a4jijn7oqxzzsyt2ms8vs9t1iyu0u6kqyhfl4icaipkv5pa6fp85w8athx1si2wmhkwr6',
                status: 'SUCCESS',
                detail: 'Modi porro aut. Recusandae modi quibusdam pariatur molestiae velit. Qui ipsam maxime ad.',
                example: '7hhn3bl2x6hsaa03y6hjxalkg9di50ajn9679uk7o3hkop38c9xpeim9hfgqitzbz7no8cgj4cf66rolc7ahtzexgr5gtbsvxinraheui317b965h9phscgbz3684wsbm5hzbrseykwdph8nlgy6cb65tci2pufg',
                startTimeAt: '2020-07-29 03:39:00',
                direction: 'INBOUND',
                errorCategory: 'sys9rxe2p1pj2b0ctwhkqcuuswse7xy09hy1cyn6r7f1spy3iz9500o6zsu7d05a70169y8ziljlzjg0mg714ex6evjmw00nhzz61ole9o0wuz6ujolye88slbf8zywls6pxp9nfdh3sdot6sqdw7tu1dlq1ya4g',
                errorCode: 'n4dwmiwisz2btxx8q2xz5lcyofl4knjj80q0tiybzyd0cd7fm3',
                errorLabel: 172655,
                node: 1395734578,
                protocol: 'sqnq1w90n0habywnukrr',
                qualityOfService: 'l6s9zh1lmz44ql9wtj9t',
                receiverParty: 'h6s6zwi11mliayelgbye2irp9js9puppcawjk8fyzcj5scxnkklgxinm8hwjs1k9695hd3o7kp9z31ux3zz3649q8qkzcz84lgvx7h3zygo3m5ef35lzwq2jngyrj9tzhwpotytdnsx1izmnxvcs4xoost0kh36t',
                receiverComponent: '8jsfujccmzmwdj6a17a32opidmi2c4ylizqui9idxmfi8n5wu1hpr90iyq3pqyfejoe510tc4cduzjh7qoz3tfs2etz7iptm62rfkbph0r2rqzwe5x6pxddwuf9wnu0qrvcfaqg1gysyjf5esonpl3f701ret2hu',
                receiverInterface: 'omhowf7hcdentkp86stx8hu72bhow6fb6rdovkfhpbjqsgwz6w9ogxjdp3ac6apnbfhmrcqyhg0x3qsb7c4muqqfo1mv11z915vchhbwjz9nqgi04ht03bir0oesgaphyo6ixxi16dhztg6u7l5ou9mt7mwobtgf',
                receiverInterfaceNamespace: 'wuhc5ldwvm8bn8b448rk6q48vh632p868fkgvtvmgj8lj06wnpzgju4wcxyr8nkro5i08iwbfu701nk3cd8yu79mgepg192wslah3ggwr8efincvtk7ddgkkgprx9uagdnwaiu8ynmcgu25lropbwgxxut70ibm4',
                retries: 5148699727,
                size: 6727665169,
                timesFailed: 3302059085,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'q38jdic3yo5jrpxjhqozrxo0w6ickaxl2rg7mc3jzcaa3pbdcq',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'vgnlme2ze0hraa8dkcdu',
                scenario: 'q61uda7rf9mrilyunvdk3w8z8u0xrloy550xstffj2txkhdvezy7c6ae737n',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:16:06',
                executionMonitoringStartAt: '2020-07-29 05:27:39',
                executionMonitoringEndAt: '2020-07-28 20:40:49',
                flowHash: 'k9ctacpyfbuf45df0wvz3tabvqd6s620q1rkuvjk',
                flowParty: '9b148zvxpmzbr5se8z7vweoh0hy7uoyxd71xnypwul9w66p7etw8cwljbgp1fahm6i55ucg0uz03bkktqmijg88nyir20a0witmroixu2ah24rt1l92kpebvmnop4eiah87olkwy9u7w8hc3yaqul82ekkbwmm1n',
                flowComponent: 'ahbbblzl8zvs49x98dgguq1f5z2hwz89omn8tom60y5efnsscy25d65n76ehlx5sq04xvp3swgb9zngjgkbr4urjf58op481gczfirvhabu279gzb68qf9hi9m168wm51sr52sovu3irkcer3lal03qn1125ncdi',
                flowInterfaceName: 'e96uz41dthf0i3vhf1eb3c86g63uobf5ya19zpb8guvk6u4w0lxtbatryxt8cx2jvny8iimdntihieqiatcyw0gz7pn0k47pfyldjinsuo2y5luqxc4vf4ma8iqga3enxj51xvchl7mbty8mv9jmscbx58ky8xrh',
                flowInterfaceNamespace: 'lovsrq0vra3ak7nmuqtpi3xtp24s0zq7n4wpdqx5b9xchx6qc4lhny2il0n9xu7xxozpahxufpz0h52it479d93hivdenjd1rlvghmyfkd6etabbzoqj3wj9bk8ov9wp22n4glf8jxo87h0vigjz81d51xmo17j7',
                status: 'WAITING',
                detail: 'Est sunt ipsum unde asperiores aut alias ea. Est autem dolor cum. Libero eos ad. Accusantium nam unde blanditiis ratione incidunt sapiente iure aut. Et saepe ipsa aliquam facilis quo.',
                example: 'y9jivuifkf4xr2cm6e0dd94lj4cqyv8tsjpxtpjfhoa8mbcqkj0p7zay0ynqjtffyvx2memepy8eixa1oph80i0bhrolaawdmjlv5dnfmsxqriwi2ko0y5miefu8apy2wzkumumxhpt5oqdn5d0dnpzt01tw3wbc',
                startTimeAt: 'XXXXXXXX',
                direction: 'OUTBOUND',
                errorCategory: 'ic83cquywm1nzir5hd1kajvsls77c87eviz9ykj51ephz7ca53a16zpq044ptrrpd4wanrlabqheboq5iwkce86mmvgskj2vrhc0t1pptpmcdvrtwfqweh3q7z04gfjei7hmq2ie7p9lfvp8jcyhfue7ctpyjcnu',
                errorCode: 'd3uwvnjxsjb028r1xsovuqpl69rwcsu64fzdyyuk0nlcdgy42m',
                errorLabel: 151129,
                node: 9667204714,
                protocol: '36zsy19o6na8yurt25rg',
                qualityOfService: 'e2b5ebx08num9l0inphb',
                receiverParty: '6qax0at874b4uybbebo6tdswiuagi44w4f12sl282v4xih5solzcsmkkzjehnt3v7ohylklmx977un1o3a2vmh19yzsrkarx3afjz9tms598uywhvbuudidvookkd2v9oxiogfur1jbwakm1e8car9o5lhs3ofrt',
                receiverComponent: '1de8h4yd66nq5dw0l0sv3fd6fueq8ocoyn6782k8mfld4f09au7v8zg1pe408vuxc5fmjeskd0vecjp1z22mpwv42urv59d60ms2buy0a4senzrgqqdxl3zgucz9glp9tmcqiyv3k035bbzp40nj0jcoy7ikvrpb',
                receiverInterface: '1jwef9e7og90p267v8cqquizl4mjeddz1lur6zpoidml51ahacsu8hu4mbey3oz76zyswqk0aley9tk83zhf0351iz7p4wb65urhtamntv4ulfklui7ziv7r5v9ogxpffuyov2ce6wpb34e8xoixat9obv8i2ewb',
                receiverInterfaceNamespace: 'ev9a6pr4zevz4xwc1rj1vrq0736zvbtftpp3j44opyty95gimmb8rhqcidumohz3te7ozpnsv7sjckiabgj4i667livl697ue4s3zfilll8cn8rn1u5u4rg5nwpwvilltyv7wb2jp1453s2cb9xyoupd7g3h6gq4',
                retries: 1608715439,
                size: 9384496371,
                timesFailed: 5157562951,
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
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: '92r1r5rxgvhqkzqaebopsbemeuz51qwwi4zjojvo66fj7ebibr',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: '0erswnwpy49fvmpyyfp6',
                scenario: 'iay2x1vot2vrgn81lzj5w2yxaxqmpu8mqhg4tfz7da9s02dhn38vw6jyvzl3',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:29:10',
                executionMonitoringStartAt: '2020-07-29 10:42:01',
                executionMonitoringEndAt: '2020-07-29 11:34:54',
                flowHash: 'pi8sp5zp2o55b9l2zcps1vprcupbh2ud89v48jpg',
                flowParty: 'bgu0kbr74ankvuxjp2tfy0yaga7r2zyu3fcmxqqfpw4h0738ml18sdx7xggmmfqa3paougermluulidzpw0k1gen3dh33brko8h0w0ux4idv169km8qz9itfcorwlwbk9sbeh5hywnsph7uab99u309xtrk27oot',
                flowComponent: '8fc2o6acwiig9xl386x9ttti57x10y1syhxaq0y04sqxd7bd9s7k2xzgwvxl96l4dfyngtf94v2wss9wdmzz55xb66wv0camjlars14qjbe4cez7x75se4f1ime264gf9bpe22h5u0g0ehiw4bey0t8vkh0h7c93',
                flowInterfaceName: '3nghdvie0gx6wxxkl1cdvo9xgw3z6vxsjhpixmb15b27pdevmi0m43jele9m0kahlgbe8rird3qxodoynukocdw8t478b2jc7ifsaa96xg445ah9bcs4lcfnqpu4b3ne7xw7fto6ceot6ougokjsyx5hywa3m3dd',
                flowInterfaceNamespace: 'qlahh5kdqqx8xvb5i8qpsw14gdkjd28npzncvbd3quzphzs1tduxfvc6ka5sic1rnt6y76y9wx72dl27p2mcfiqj55zfdrxun7zcg7ibarho0txzwnlx7t7a12divf562j3weerx1gkckltja4ll9kllxh4jnaxv',
                status: 'CANCELLED',
                detail: 'Aliquid alias unde libero hic reprehenderit et. Unde dignissimos sequi ut rerum vitae autem alias. Id iusto ut eius. Optio perferendis ratione.',
                example: '9a6ipi9lyz76593ijlmasc8k1cb1fpt2shicrv2kvpnt3odu1ofnl96lf8onsbjigyl1924y6hf93pqwq2zlbcfp8z9d2dz5alcjfyyicpl4x2c42mcgnhk33doofwym2wd6ktgj5egtysd1j10qmqnan6mz2nlq',
                startTimeAt: '2020-07-28 23:23:33',
                direction: 'INBOUND',
                errorCategory: 'myq4ha0uq09m18tfdb6n9xx17htan61uh8qgjr76hnabvkk50emy7xxodnctrz0l1mmsooky7fzyps9s6xrgpop7xav7ik42pp2dqpj1mifbwjkodig34l6jqowuwb2fkbwskvvyuhib6h41ewvh99br3eli0e22',
                errorCode: '4e2kyt5h20lb5lb0skj9x1bijk9zq77kf0zvufpb9fl5fu4caj',
                errorLabel: 492784,
                node: 5057899528,
                protocol: 'q61jc5auamy9seei0lvc',
                qualityOfService: 'fa8qmqk1lu2bpfcdi8bi',
                receiverParty: 'tvshyppz6a4spyv3yf9jq7lhgozrrrtowgpf5akeadx6rx37z86fomro4s6cfwwtgsuxchheitbfiqx8pflpxn363dcupks2uq3c341h5t9039qyn9hgg9d9cs0zvqa197hw4kl8oudkaemwe2fzmioe8schb8qr',
                receiverComponent: 'wg9g7trof93vlp3mhiuht1drh5slzjkhujvmqtieo2rl6ux5xdtesh9vtqoer8d39vvz6nm1v0ypheom39c5qnwqq7unkjj0jfir4wrftvqzamojkcdz4evjlyk08zc24qi89vd1h1ho34lwv5nn10s7jhbys8rm',
                receiverInterface: 'lmfgfk8n4sqaz13nrourvkr0kayqp66vchae2wybpgmqln62kiwxlc496pgqb62y1oz1l0witswl1dahy2cwdb6zp9gixbxenoy1egm0kav1hkqmckh3fklejtptl6mwuzgqg0094rtsrg4r3827lvphp2nivaj8',
                receiverInterfaceNamespace: 'ckevsnn3iz4trxff49gp05gqhcvni3b3ma2mdxoh4lbfllvmhk2ksz3038kj93cg6fd31c6x8e97oblcn9q2i1su2xs6oftrk22ww5cd07j75f4q3579qfk07ge3s2pwuk6ien34zzxrpruuxej7i9vnpo8zre2u',
                retries: 3137041584,
                size: 6315374209,
                timesFailed: 4149028125,
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
                        value   : 'a56e39ce-0050-4fa0-9356-a26cfcbbca59'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a56e39ce-0050-4fa0-9356-a26cfcbbca59'));
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
            .get('/bplus-it-sappi/message-detail/a56e39ce-0050-4fa0-9356-a26cfcbbca59')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a56e39ce-0050-4fa0-9356-a26cfcbbca59'));
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
                
                id: 'b0b0b6ba-00f2-4b88-8b9a-d1ca4f9a0558',
                tenantId: '18ffed1c-1eea-470c-be3f-41c53d7ef8cc',
                tenantCode: 'vgwh85q43hn6vohja6sqb3oo65oszxfgfun8jo9q4692hjunno',
                systemId: 'fad6ede1-36a3-4796-9fe1-98d1b33fd257',
                systemName: '1a3jg9lemhxli8xqnz1s',
                scenario: 'c531c6w4wd18ibmz4nu3a6c5zvsy9z33c23kq9vdv7rqmu86uc9suz8ftb52',
                executionId: '82c2c2e2-eee0-4473-866d-7e8729972005',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:11:30',
                executionMonitoringStartAt: '2020-07-29 00:41:34',
                executionMonitoringEndAt: '2020-07-28 21:45:30',
                flowHash: 'wml3pwwql2om1ywfcllmcpcebs8e9i6o8d8vwvxh',
                flowParty: 'u8ps4yhi71j4snf9bxbcbl3o1eyfopf4z4cxuzxfxj9k9nz3mufd5n84sdbycb6rrsoixtmzb4k76p9a4kd6cvjzzllqg3iu84z1h3k1mqnkx3v4rpd77dzmzhys8f44z6b8lsty64j4qguu3hmisp2o11i424n2',
                flowComponent: '4hwbetf7fwxpqteza84jim3vswizusr547oj612mqo7skkjlvm5r3j4aevc6dpkd10z0qsept0uq7rbxbn3qc7mfylckdhibgdg36wf0dk64d7njxjw5bp6o070i2fbhl2n3mb3ez23huyh8lrs46n9cu776lkcx',
                flowInterfaceName: 'wtt6ebnwz18hhhox70ixy5t82lebejofyiugune079gp16upkhpuxrm8vrrfh63q13flpznkzeg79jugywdus5sgp1xyoxsoq48r60tdpketljne1on9bqg7c3slnqk1f1n4ncw1pnb13mhhyccocnzwme81rh75',
                flowInterfaceNamespace: '8czixj9t4iy6i6g0uoce1q2pv6529323vr2b01sxjm7jckffz2dhjefzaxv31fz8fro3fki7qj6lnence05gt1d75db3fp5fksqrfq67qerpakotb1jlcaemfwyo91hhb7z760rnm1vjef3ogy63vc0g0hejhw50',
                status: 'DELIVERING',
                detail: 'Qui nostrum voluptatem pariatur. Est doloremque ducimus ut aperiam voluptas cupiditate nobis cumque soluta. Corporis sed iusto qui iusto neque reprehenderit et.',
                example: '3wkuppnu6tklehl1idh8r809ojcgovojpcl82jv5qa2muuolyjz6ep3ictvji9ldm1npp7dpe43ivcmheid9hqpfpa2iqbi1jokk7vpvdy0eq163e8rk6f6tri4w82vpwe7fvpam6tyoo17408dv5jut2gzkvl2o',
                startTimeAt: '2020-07-28 23:06:08',
                direction: 'INBOUND',
                errorCategory: '70fasrh5un99af1rfazgoha9kwohitnnb3lmumc1kdtdnzuj8g4l5r3w0k8yhc7ylg6ni7ndfa4jy3y0b2t5b863ecv04ri6qn2bvctvvif286ed6zemmy67xsfzqe39f5q74v71t3an5e4quq74rtgkv6nz8hup',
                errorCode: '5krqm50jjoern4gdjz74fyxjb1ttmrsufop07v55dqbz0s3xze',
                errorLabel: 128042,
                node: 7811580965,
                protocol: 'fkuc5fb1zb8ljq614lpg',
                qualityOfService: 'yv2vlmav4vnx8p2xnsn6',
                receiverParty: 'zvgswv7vtvpxyvfv5afv8vvw0qwyuekq9j2rukct17cgkb6aj40pby24ns23703kyiupzpm8jj2h950d3d4wsxjkyqkuar69b999oifch5ad28x9yi248x8d8f36bb2mftjja6r6pdovnmh1us0lbdtn9dyxf9mi',
                receiverComponent: 'o58j5hbnnr4frvv4mjvd6vf8fmpc306tqiv46fp267yq4ifcik54jzxurgfpjxe0kye68x9ot6mvqol5nsvu3sue72yovisvany44io3d9w4fcu0phu932uduevkdy25e26ky7hryp9g2qk3lmu5w47yb33pkfs2',
                receiverInterface: 'l4eaogif272b13wpgeixxkvqvgo95uqtnht4bfcvnnwn56u92b79mvpzem8cr4ao4i96hoxhvf7io1l3whmotr14ke7phnmf2ysxcx5gvchv1uhybemm42j5icfy4vyee71r8y155tzmpmra9qt121icu26st33b',
                receiverInterfaceNamespace: 'hrq9yrm81u8asuo22ytjb7ub4egbmsoehbeko5hli4bom3iless1wpl6djjj9ma2mnwsn4czkdeywgf2klnkdkxtsbm6atw5quq73kahxna80s4wiyp2i5kilrv920oa1je215hbl2exd36iqn2zgs58adaqwnff',
                retries: 7922231090,
                size: 9275629684,
                timesFailed: 5870587563,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                tenantCode: 'v4mmqcpqcaq414167n1qu2h01or9gg0tkr8jzjgbxrtozvs999',
                systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                systemName: 'eybn69bck65rp8don0s1',
                scenario: 'n6ss2iqz6hvo29ewy8g90y259xzlhiikbvbm6pb0ynn60nh26nrrbutggego',
                executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:27:01',
                executionMonitoringStartAt: '2020-07-29 03:14:55',
                executionMonitoringEndAt: '2020-07-29 04:55:21',
                flowHash: 'gtwcxc9vi0lfmtt3m58rzdye5a1iy8y73kpih37l',
                flowParty: 'gbcjw05ntmqen1imbaq7icgotmzbjqugjlcljymu6hxbs3dfz1vospa4phjq0xcs9gcdhr6mg7qb8gupqca6ccekab5ucrlh0k6nmu1gf4892i5jynnmw5t2mfjl5lpq9d2qtdi42jzf79g7n4dwtm3bjxu4a4lr',
                flowComponent: '75j33wd9x06h7jr2v2o77t2hp0v64q5itw7ydoe647hmqkoqsqrh03g8su2j2y7anc7jwxtx6avejj17lvrusf910ktrekhnjlffe3tu4wrj2ebwjl1pqxteu8k5if2jvdwu7vt5yoiy6lbkvdvpqgq5b7a8lxcs',
                flowInterfaceName: 'y53dz37rf2580vjn9twk2qiudpven0esbm2jqxbgi88ar5wyu9xuu64jqigb8ikvuhwx6582jsc81euvmc3ceovub9nyh0vypw9xb6fwvcz3rk3w6sytqxd6c5s2jo1g62nvea06qk6upagqzdmvfpvgxren3qej',
                flowInterfaceNamespace: 'rp45jtytmgsdnc0ybwnz0i6uw4bj7e9vn9uwzuzv3pua9bvw3dres2ctp339lc0ycovbq3muqal4rflhc8yd4dqy6j0umm0fjia0xhuhiffta3dyopustpav3h6okhokcgyhpvfqzyf2qll694d8lr14z7kphycr',
                status: 'TO_BE_DELIVERED',
                detail: 'Voluptas nemo magnam deleniti dolore. Qui corporis qui ut quia quas velit eveniet sint. Illo nulla quia quis enim culpa. Consequatur laboriosam et neque. Quibusdam et architecto impedit recusandae et adipisci. Cumque quia non.',
                example: 's824jqa06p700f7aj5dvb0s5201zuaoabsjhl34pc95xg25s0dh3uw5fkv4cfux44wr2nhdja8j341nvo16fxy3ytj848r3t3p4ac4sgvzi3rlda5k3pw6vlhmja2ipjxsey6wkdflxlo5vjyjt3krxtz00b40rw',
                startTimeAt: '2020-07-29 16:08:54',
                direction: 'INBOUND',
                errorCategory: 'xgy5ibawwaic6xgb9tbx46to2ork87yjt50vk1tespz4dw41ivmzi6fuc7xg0uzamvwuhwk37cx88zvi9eyf14i66kw4ubjk5v6tw5b7bjlryicwlhugay1796kzxw3rl6t9f8lhortykpspn8scfj6xn9bwloux',
                errorCode: 'am8nzh933uhvcvdgxz0ssx3ym4xpbffjfjpjy6khktegl510em',
                errorLabel: 528950,
                node: 3282830193,
                protocol: 'sp7p6g0st69muf0id8eq',
                qualityOfService: 'l113nicrfhd4xq1nm97n',
                receiverParty: '1aqtndjzyewo0soe57iozuub9azwa1nk9qi1hcn8rl2wiiewhnqwu11462mju2d2pe0qx2pafznwrzgw3gu706gby567f1l83q1d9bv8h4akeai13rild7pnxx0t6kgmzfq8p8x0yoyvm581xhmhmg4pijrl23xw',
                receiverComponent: 'fhcos1cwitr059wintlabibnhajn2266lh60krobtl08mrw6cg67fqexhr3tr2uabmcyd6lcq6rvnqwzx3adno01bmtk0f6vlbe3q339arn7q7l5n3y98usbrsqsyycou5kmdm3usn2p84wvy7virulfdsit0iga',
                receiverInterface: 'gpx3iyyd6k3o1mi09fnl047f5an49ogkp2rrnh6rydydabo1aj5t5tu5tw72fnfkvlmnszfir7zgrd3k95nxrra1damsy9rk0kh13xbjj6mb2zkra1g2ugtdacs57bktc473xxy06jl10z91oczsfks7npb5wo4m',
                receiverInterfaceNamespace: 'tim0yh1ijp405oonoinwr64i0n8r9skoaps3ml8spdqqp5y8l3i9wgb8grbpkad5wqlldmlx96ylrdmzaie4vtptvmuu5cndocri3zlohy9k80rj1yef5j6csalrce4cq4iggt0e478zxuyzd0xhnv4tnrouto86',
                retries: 5377812799,
                size: 1825586261,
                timesFailed: 1056852548,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a56e39ce-0050-4fa0-9356-a26cfcbbca59'));
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
            .delete('/bplus-it-sappi/message-detail/a56e39ce-0050-4fa0-9356-a26cfcbbca59')
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
                            flowHash
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
                            flowHash
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
                        id: '3b6ee8c4-9231-42a7-bbd1-5f6b4aae9e24',
                        tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                        tenantCode: 'kz58y40raz03m4nd5ro14uo9vma5wmty10hln8tnwjnoob676s',
                        systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                        systemName: '44gj9exizwb7u1ejuwd5',
                        scenario: '31z7dsf4tlyjm6palwnbkf77icbb74g2urx7w9z6l2q1mfycgorbsxpqhy9p',
                        executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 22:18:28',
                        executionMonitoringStartAt: '2020-07-29 17:46:12',
                        executionMonitoringEndAt: '2020-07-29 16:53:35',
                        flowHash: 'u59pi2cv02rqvhid8llg6w74crxdv136hu473gbl',
                        flowParty: 'o74ljm46r7yyu5cx1s2eo06s0z73caugbaws20if0nxifvd4wqin642g4w1gbdoiald1t72in5cfnxxc53gi9duhyqlwcwjw8qdawuqlb1q7wc83o2raxv57lg6jtqn5uc5s3cgbht2naij9lsmpnfu34weosdba',
                        flowComponent: 'l56bno149y86wd10qklh9z8tl7kgi0fo806de8938o6cfzzicyyt939dhl7ft86nu53tekre4jayp7nf6a4cy834zsn4ib1d1tz25cukejz22q5jplqjrcokzz0gw8aycznkr5sgz89bq0e9il7nymbv1vpuuuf1',
                        flowInterfaceName: 'zgsvw0ejvx7ti435s971qeh23r8zke6j5j9tgltlvvw8shlwpxx2r710ygd50aiegm4q46cd86wdkonorlxekxz2htbi90cqnjli4e1imywssaqy7l1trr7mdqqa6jhsrna7v5699pdzjgmw70nu04um3shj4cvm',
                        flowInterfaceNamespace: 's3iusbx9shkbf0hoy4fw1yyp24meqa713e9s2gxu3lsqlwrfyibdlyaym1u03b75lbuiaw0ht24ckplmjwn0bnfid74q51tkosfbd7gss4q5zrqsy95g90z9yk74oq06vt1t7x8fkc0y28e2old8cy7z4vybwcr1',
                        status: 'HOLDING',
                        detail: 'Necessitatibus ea consequatur incidunt possimus voluptatem sed magni consectetur sed. Possimus nostrum quia et laboriosam laudantium est. Ut iure hic debitis. Et est et occaecati. Iure qui eum quo ea sed similique animi.',
                        example: '6x2wa4y73p3i4xo5yhz9p2kvn3l6kaebzegcicx1c6nsgp3slwdt2p3yvj1qb6iao674omcpsyudd18nmo4wt9kt35k1wjmef8i1t85i6b5umspz0wr2wyvk4swxfqrsoxx251u00qoe5oaj71p1zb9zyznlc7qp',
                        startTimeAt: '2020-07-29 06:03:32',
                        direction: 'OUTBOUND',
                        errorCategory: 'b0uupgslevliubd8smwu80762f7m6dc0mg29e9p9ma8g58llv32xa58ovgedzm71hmzeswdrm4sd670rqgeapgaftynl6h2vd44alnh6bv9ig6cpvelu5r3sbtyswu5c2zcetn81qn2ef1m5oziqjvt8nn0rmrjo',
                        errorCode: '3240be6ukjyie4izjb5dlm4p2hhxwfsfan9myrinx0uw2xtnhl',
                        errorLabel: 201672,
                        node: 1017791987,
                        protocol: 'wij01zqz0vhgd8btlnia',
                        qualityOfService: '5f3rlmf84mu0vzvl3dxz',
                        receiverParty: 'z63ny9d195k8rb2d4kt6hxf6xqvvmvbhu1ygptb3xsle932a0eg3mjbaamcxta19ft2kru6klbqiqkk0fuaxad040x8u5gk509ow67lg298085l4kpc4ifzo61ofow5ney5ixb7z0z5rijchg4ylnjr8r2d2aijg',
                        receiverComponent: 'kijllyrke0yded53urw5q23fuvxsscmv0lpmi7wrlmwndlodjja4gu34nkbxp2ez588a23dyzj72kuusf8wrlh1f2k18d3it8x8z09h8ueb01egtpbxto8j1f1hj0e6kfgay013jmuhr0smqbowo1ifm5uf9q45r',
                        receiverInterface: 's792qjjmn6i6l8fpjtxm38o1ymv0ynua9q0squt3m7ky0lf5eazjoqglj2xlmvt9t55tmsjbvfmrveosk40j4bhsm9aarwkzakcizrq8r1cu2g8xcdzufdhpkh2ysh1b96ycp7ua942us3qrbir865ux4gi5d0nj',
                        receiverInterfaceNamespace: 'l1d1387h843g027s18f11utd5ey8quvll9yzfslandvxtjc3jtovdx5t2j54vx8zpzaghxh5fu16utsem053p145lg6stnymbknf8ip1f8nej2573kkmtkf9ht3me2cdfpk3hvgmgsvfqw0bi3u62wr7cogn8p8l',
                        retries: 3020029700,
                        size: 5221533336,
                        timesFailed: 5415303604,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', '3b6ee8c4-9231-42a7-bbd1-5f6b4aae9e24');
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
                            flowHash
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
                            flowHash
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
                            value   : 'a56e39ce-0050-4fa0-9356-a26cfcbbca59'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('a56e39ce-0050-4fa0-9356-a26cfcbbca59');
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
                            flowHash
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
                            flowHash
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
                    id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('a56e39ce-0050-4fa0-9356-a26cfcbbca59');
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
                            flowHash
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
                            flowHash
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
                        
                        id: '25b74049-dd62-48d3-8c59-82e1d1f6b93b',
                        tenantId: '2e398389-7829-4f7c-8791-cc455a562ad3',
                        tenantCode: 'krmsu1cp7t3vw09ugj3vtbi4yhp6ucqpikz2vd31925w04ik26',
                        systemId: '87c8b0f2-cb81-4a9a-9d00-ffd30acfb4a9',
                        systemName: 'j2bjhhyte7ym4xhhkxco',
                        scenario: 'e5vyg66iarw7xdvgmyte6thazmlxx2b97qjrgbma57wh3rlhxqiducvit0hl',
                        executionId: 'f95e0b60-1281-473f-b11c-59588071986b',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 10:44:16',
                        executionMonitoringStartAt: '2020-07-29 17:03:46',
                        executionMonitoringEndAt: '2020-07-29 09:16:24',
                        flowHash: '5dbfa07iiz6wkejxcdaok9qsijk7kqyktqyvre01',
                        flowParty: 'wejwj7uxao7aqn3ckec99gybt47k9gjcb4vrltgq17dzgix3qlsb4kewdedyl8xam7qr08w2eudpjffjx7tf1vv545i1n0vzlvdyn3hghwmk0g1e67iqxf9lx4si24mddcvc2w4s1w58b03q8dz3z1ivb4p1u8cg',
                        flowComponent: '33du9t7kwwvl08w6jvfli56t6f1oigh9jf74tlr39jgd9xbzd2tr20i0eybtftocacve0067f1d7ufc5a2dzy21bgenzlz4g2u8jywgagmb8k57hz6a23f9h9im2z6iya54xk4c6k2wgbuye3eaj5rkc5qaae9o7',
                        flowInterfaceName: 'h2pxz10jsk1jrwx8vjuwar3611p85mapc404zzwcv06sab3nawctv45ong5dcq9p1z3peegntc4cdj1x6ict5313ap9o6ym6ey5fxgkio9e8y76m4gj5nf9a2vtvhmmcgoz94ajc0azzhr47vfl08cgw297iz5ie',
                        flowInterfaceNamespace: 'ym9bgtazoycfx13ib99w0kej1hdzhv4m58uvzm03g0tf8pdeq95ahxnabjuj2quz06cuf7nifpeqw826d3e7ec33fj8dbuxy5tlow09fywb83rmpcy0ny5f87vn101plqm4vmmjcrr5t26dmysvejg5dunipulyt',
                        status: 'CANCELLED',
                        detail: 'Facere est provident ullam odio magnam minus explicabo eum deserunt. Assumenda enim saepe quidem. Iure debitis aliquam voluptatem perspiciatis totam et deserunt consequatur. Accusantium in unde. Modi dignissimos perferendis voluptas architecto.',
                        example: '8ydg5sqwnid3gb589lar945fbzgsrb88dyghrypycbphsnl3eoy15vnx6wo5mdcu8k7ywgi9s6a83ybzvxecad9zmc55zectmf17r67yal0ikdsb7ib4jjtp66xfeeolhe5algemipf64hyvuspwhhq3c51zwciw',
                        startTimeAt: '2020-07-28 21:45:03',
                        direction: 'OUTBOUND',
                        errorCategory: 'ed82vadl9uhbexp0nrk0ay9nei608b6cbc9onxmbvx1lsnoc2wgyrxpih4y8zk03nu6bsv9m1dt8akivplet34ne4tj76qu6x18dr5u8zw1rhdc1i1uoecph7c0ixkseje655y3apdf04mte9r78iqevy19jzore',
                        errorCode: 'zq71btaqz643v9ayqi3ni5yo738jb9t9z8hsz4jqanxdmy6scs',
                        errorLabel: 235232,
                        node: 9142742626,
                        protocol: 'lv8jaeyug7m1inyb6n9e',
                        qualityOfService: 'ii4m2jdnru91qb37cj8x',
                        receiverParty: '2il41k7jsdtup9fbcqiu4fxc43s1k04wvgh53sf6vyu69ph9zjro0lo8s58v1m18cej8jne94xf305p77k0f7acdno8zf2ezseeb6z87ulkvd8g3oqogfdrpm8ms3my6i0sc6yror1ju25lvkx328gvaad55y7zs',
                        receiverComponent: 'o5ze6s70cemrpp6mqiofmhxx3lr5ds35kp7vnfayhxxjz1m906xcxonc0r0aw4zkz8lz7irnz9tgr8fkzhfhif61bvf6ny921ek8kedhegffwfgaufmr8hgp11m26ng64b7cbi5ivootbv84iholr1wnv8pbkh9i',
                        receiverInterface: 'ayvkholhxfwtwq95fuwt26jkt5h2atrz9gbk072gukl6t02e5ida1a4x9u3v1xhxno9g7xl7c8wfobivq9wowcqatjgamf04mlzigigx80di9x5nv4lyhigfv3bkd5fitd0ubcowrrzvvwnbgvm8g1e9tqddicz9',
                        receiverInterfaceNamespace: 'snjke19dwhszxkvbl45affqipuuoctkdgo21zkjrwpoffxpcxyw6csw0b4sydi4a3shsbd8uunzm38gf9yi704upu9sszz13846h3zjpevdibblnxsj5nrk2nlz9xd0ea1yuuppf6z28qev7mtd1z288ywp6uvrp',
                        retries: 7952847975,
                        size: 7618245191,
                        timesFailed: 9477073884,
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
                            flowHash
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
                        
                        id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59',
                        tenantId: '24b73bdd-0bb4-4f6d-a1cb-ba20d063d19f',
                        tenantCode: 'lu9tnqdl36ta0r3xcodxegnrermq0us5l6457vo07g1scr8hta',
                        systemId: 'a05fc733-12cc-47f8-a5d4-734e5a6bca62',
                        systemName: 'hxy4oc9r6f704bg9axyq',
                        scenario: '7hn0uydcveqnxhyjmyeujc9er8seiwubdd7jx8hof4bgkrcfjv8mr1cz5ypc',
                        executionId: '0e297b28-3cac-4657-b8f3-cdf8bd827157',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 09:16:29',
                        executionMonitoringStartAt: '2020-07-29 09:05:55',
                        executionMonitoringEndAt: '2020-07-29 06:03:13',
                        flowHash: 'd7rl6zunpp8wyujehllqv02vdtmoqcjru8bmyybr',
                        flowParty: 'mzeu1jlr84bh9lhbldiyl6epsmnsm6zuc3j7slu8bhx5aaa06v2s31e8r33uk9ftppbdgsy8lp25b1x0o9odoi30uvn3iopvpofvkiy4km17vogjsro57hi1a3z38hjr7optuo97gwwdat64jthbp2jyel04iw6z',
                        flowComponent: 'mt2p5f1uu0gnp7iyjt6v66agmu3b5zsmt5593f7q8e2lsesvamifsly57932486mqi29ctguv1ezakihusbqk8gznntu5smp9i38eeydwie7s6jgq2dmzawvcwwoszxvcq1iom0xvrh2y7b6c20wfn3eskrt2nqw',
                        flowInterfaceName: 'i9gfd2yza4qhkjpl8i0wn6o1vv1xbdc88exfo79dse7j507lllkp3ncu609bzdr1t4dw489o03jv57lauymqefqrrta3co9rmcjdsv70nm6zflulbli05oa4zs6ij60u1gst36rh9689bmn17yi11ruvj5ktzyi3',
                        flowInterfaceNamespace: '8gvszjtuz5hohjmh3swbopgmgn2v350s9hb4injckzllwnk9locb11cj8q9xwvkztsam7mvxil4c0tc3pwij8k0bvnamt4zeoylgwv2a5klbahgcs199i1de5y8cg1zvsogofjfkljkaa9pc83wb669bsqfk9ypu',
                        status: 'DELIVERING',
                        detail: 'Similique est natus necessitatibus ut rem. Mollitia optio veniam. Aperiam veniam voluptas dicta earum voluptatibus ut sit possimus aut. Ullam quia voluptatem.',
                        example: 'nb8g2j3sb6jeisel4rn1yto7yyn13tiwh5a7d5ekv6pegx9vwi36l55h3jdbe2hbo8gjqoqo69spc1473b5nw4gjoni3gcjfr9a7ycb9l8bs7ly7hemf9b4w5a1zlkh10spfh06cai50e9b49wtg8qnrjfmynto9',
                        startTimeAt: '2020-07-28 20:11:00',
                        direction: 'OUTBOUND',
                        errorCategory: 'e9vm9pjhtmcjex4b7m22jabxge6dju6gnmbeq60xddgnrxkqt93phrejtupo2hzln92yj6p5cxe3bggj88wgwj3zqb7xohceui2ar33d2zjfejftfcg2wvjt2w0plyrrv1vmecfjhntthmjunddlnk2s04pm6im3',
                        errorCode: '6rurcrzqzp21w6sh3jyum3rit95rnbvmy5h5j89bzzz21x0rzh',
                        errorLabel: 556985,
                        node: 7930611234,
                        protocol: 'frl015qpv4ntfspbj1ps',
                        qualityOfService: 'ryrjcinl17sdlobp1yyo',
                        receiverParty: 'wfyxkzlcen1zflea3mdezlhx6zmdav8j3518k6dpetbi7h3xs4ejrxrfdcoqvovgovzvradwycxlyx9gc9queiiivpb9llhjtx77npvikfarw2r23jr78dafj4lg9hjkke8ya1dw87r42guk41dazx4hpn4ydwle',
                        receiverComponent: 'xn6i5sq6ll750e7zw2biu0v4jd4owwhx9sl30yp66xrkurppc05lw9b8osu7m8r3x1mmmd1hjjmm78lyub4mrzr98ug65h33fz27bjkcmb239leo7k85e6km3hrws7aaf1adz7k4imp5huntv9agju0fywnhewu2',
                        receiverInterface: 'a3q53i1kbxvjg47bp25hgn7ms2srt0wlnk3hd2tv0mrpenb5t4eldkleldh8vgjrcfj5npiwvqhpssndxx1b2mnc6hcun2ior417m5ksgrl83y9sqecixs8mu7hl0jdb5trpar1r28mwe95f5dgsxf2x0u1cod90',
                        receiverInterfaceNamespace: 'lfgbe1h7laugxdionp8ki1re1yy9gjvhv5sozm9abyksl263kazob53h7k89vtdgceivio02ifjchzeqztgmjllnx3y4shtxhpeg7vgs4dtml8227gex0tmnxorp8ot48m1fib0kt07dy00ch7nl1g5vol2buobs',
                        retries: 4265842777,
                        size: 4901786886,
                        timesFailed: 1751934932,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('a56e39ce-0050-4fa0-9356-a26cfcbbca59');
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
                            flowHash
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
                            flowHash
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
                    id: 'a56e39ce-0050-4fa0-9356-a26cfcbbca59'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('a56e39ce-0050-4fa0-9356-a26cfcbbca59');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});