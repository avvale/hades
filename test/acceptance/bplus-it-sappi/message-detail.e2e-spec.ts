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
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'ccrd53yrnnhsuuew4cmcus7xboctd3b0pnmxo0coie0li0nw79',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 't5pm1getssty9xah3d8x',
                scenario: 'lse1cqo5mssav15po5vm2z2xlhpzgp06ifqpv9xb717yep79dq1jlfiyai84',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:24:58',
                executionMonitoringStartAt: '2020-07-29 16:44:43',
                executionMonitoringEndAt: '2020-07-29 22:42:11',
                flowHash: 'gldtbftp9j1h9i6pu920gzt9t7e0j2tvhz3yl08y',
                flowParty: 'g6wkccv6vd3s406i3ptboqbijkxtut07g3pug060zuznm2ie7nnqvy2z68oa3vy24wcxcdgruwzr2jkhb6dnwa92kkxyw5ujzkhbd0jn1129jm3h88zlp0rgsquojlrraqk0rt711hnocxl9knmn2axq0sj21iu9',
                flowComponent: '7rk61zifcysfhgghbqhmnzdgwpcggxp4wv35jj5d3zibdrn5dmb4y3rdw5vddyld6w23cjufylyr8y3m8k6lasr42xy2yg3u0rqznpqrayvfgqhpm09p1azsblp9l0bw4kfvaa7l1lfpq12m9mo1d1yul4gyf5za',
                flowInterfaceName: 'du2hj6mmwz18fv1uxxitxszpw3r5o33piqfubcpabmjrsuw1lugu22haxylc2l2lbozguo73zryxdqu3snvz0wbext7tb1d2jtmysnohk80u7hdwodi00shjo20v3aufw0zkaq87i6kff0q18wh1wwolnlw447i2',
                flowInterfaceNamespace: 'xlgn5com8eo89sa6jnwqstaajmfh6pdvmlhjrupt2gz57fr493xj518lyqfwgzeuqh9mm6devvwz0upn737tl2ol67d69ldibdrlrptx8xel276ghw8ywbui9v0tjf1xa9yo7zwrnr6gdayrk5y5r7d7mfjigbwd',
                status: 'HOLDING',
                detail: 'Placeat quis voluptatem ex tempora quos sunt eveniet nemo quam. Sed fugit debitis molestiae iusto aut. Est numquam consequatur. Vel optio beatae suscipit dolorem sapiente numquam tempore aliquid. Nemo a omnis laborum repellendus qui eaque error.',
                example: 'nutobrr7tjpgncozjivzdvimqztk6mrpffuikzpa614imy1cghb3mirn236e6zmp6c8qsga31vy6gqaryj3ozefavoy3cxnrcr8bd9ft3nwke5q98plya4wwyqzlic9jyy8z6111ivoeaoqnholkkdr96blujs6j',
                startTimeAt: '2020-07-29 19:13:08',
                direction: 'OUTBOUND',
                errorCategory: 'psxdkag3xdnmb0pxmuguiaeul4qv5u907kz9wj2a7hkysutnq5mr9os8mysaxvawd7z92jxe6fnkjazyezkm1e9uasy0amhfscivkp82e6rqaqr8l5nf4amx8c6pnvyupys5yd27vs2ghipt2xh0qvr2g126gdpo',
                errorCode: 'mih67pbqluxn0y6oucr2t17k307xnidb639wqk7j7lbibvmbab',
                errorLabel: 365939,
                node: 6983726423,
                protocol: '7zdwq2nam26do83drx10',
                qualityOfService: '2vyzwrp35rm77f2xivgj',
                receiverParty: 'vpkfcfnx7zazgny0io0mwd9idh4acwrwtqo4nwfuze58j3htyt0a2rlprmd1qymstcon73ji0hbl2r2p56dcrmoqx2wz8mi1q0vuv33het0w89fohsa4lkkyvcgq23ch1b9kmdw70c9getz1khmm6banitqs5gm0',
                receiverComponent: 'ety3s0t3z1g3lqldbsd5rurc91lhiox1py56mt0kv7zq2jbpbu5n51ensw5n664lymyb1x0xiors868cickepexixs4dgcyjv2a7viz4127fqyuzxx9uwnl1sz201vwph73nfemg3pi52w9xqixo55eclxp0edh1',
                receiverInterface: 'amj9xsaa9umon34fxgz5k6o94wfqcicldpvi2f9w60mhtdjrwslsnk5ji3f4sd4yp8furtr2nihjm6dkpjmloxgwnwei05azr1rb5wtcid50tks2ienghnpxgylefdqob9utl5ehuep48oely56dau7f1mqnl0p0',
                receiverInterfaceNamespace: 'cwuh5qigmsp02xq4mq5ooc86vdq3rnv0cnm6vnegw48df64eull33fvc9td7h8p7if2nefq0t4s3avzlmvda06jprlla30z8dcwpemczaczd3ti0vyl0f6xhgf0662by57r68kqchq5zog32vzq2lummz6y024xb',
                retries: 6500138333,
                size: 1821297903,
                timesFailed: 9594276723,
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
                
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'q8m2coh6d2ubq31u91jhzhvcrdgr21yss8akm4c507l9di7gp3',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'bl5jwxvvkn58i54mr1zs',
                scenario: 'e5mfxdm4ohmiilhicz6ak157jrf2v5ejk44arnoqum34xnlc2bfi9rbbqxwm',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:49:26',
                executionMonitoringStartAt: '2020-07-29 14:24:00',
                executionMonitoringEndAt: '2020-07-29 17:31:48',
                flowHash: 'e0jhm28h5ecco1hmc77r3z58ma5hozwojhvsqrd4',
                flowParty: 'tetz4pnik0j2ej5sm4iozim5ns068eyhhlflu39j1kgf6hdpmf8t45nfzmkb3n53hex9ldoqrbwd6kjfjybqmavd2u8o3k11job6mj6a2mcbmwle93uplxf7j78pma1pdtpxtulsnwja873g8qx87ikvmecpu5ey',
                flowComponent: 'gyga5d7jblz23nviejp65b3ooaaiaj5c4r3e7wijfpntwhcmk0b0tfqgpcuzon3k74vynfx4u5tqip3cckhq5unvkpj1vxef8w7nbc8eqebg9iuv3e7oqb02csw2cv89mktt5jkolwiksah0mrj2ne3id9h68iw3',
                flowInterfaceName: 'ldry2up57vmbqxyfipkw7ncenh7u4w6axy8u2gi4bxs6bmbo7ikdenyddrk3r485g7colxkhr7oq5jwoz4rd2rjah1i3ln1yrzfmwcrehruksgdcj23kcsz3xoy4fmy88ha3ecn1qym1lcf6l2p4eulwvaqqhtk9',
                flowInterfaceNamespace: 'rfy9gi22vfvy7ufl97zuo9yh2dlpgijkgul09i65tefqwlo0a5rf2xp9xlwr5xouvk9i241sz8crnz1r74sds7kozg5tvj4jtltsmraytjf2w52usw1lmzop2wbkkcuul52hjmvuxbou7xbmokaa2wsp2hhxjhcg',
                status: 'CANCELLED',
                detail: 'Necessitatibus repellendus ut voluptas et hic ipsum consequuntur nulla. Magnam et soluta quasi tempore dignissimos molestiae quis aut eum. Dolorem culpa perspiciatis exercitationem saepe cum at est expedita. Eum repellendus odio officiis voluptas. Totam adipisci ut cumque.',
                example: 'sidjudwloteln3o4w9tmo7asqtlq2mshstjkrzj03gcy45wegy30lbo6vcv2kzs2e66fspqy11as5jnmvpxqa17vjcdiehj9kkm4kjj9pnvftzmr0mge9z7jtljjipsqlkuvn1kr5gg49n26wttqi15t3x80ylr9',
                startTimeAt: '2020-07-30 00:35:23',
                direction: 'INBOUND',
                errorCategory: 'z4l1ly9ek6a4p1vz0f44fgob540wugjo8v2gis0curuw1vgynhqjace421b011mr1wg5ria1siutatyg8sj1fsyhsy6ckedfueushvmcha6zoawkjfok6skswjylilhlpf9giijktqtwsjbxvfz2btgu0ij4cayh',
                errorCode: 'f00jz74zmdztfeydr6ky66nipw810uwwdfx6eodmhie7ipxpfh',
                errorLabel: 306488,
                node: 7011578348,
                protocol: 'hz7brq7ssvvrapxnstob',
                qualityOfService: '10e3ptwmgv0dssj82fnk',
                receiverParty: 'nksfw5b9z699dwro900iyfmbd1sw3yaw4rxxaatk6dqzx1w3oagdytcza42lim6dh59tj9kq5i1tk9a72wj5lij8lvve5mwhmm8bpli3n5f81x02u44lghpqixnha4mjwopnmz5zutgzv7uj0nr4ibqnhygmw81c',
                receiverComponent: 'iglpkl7af56vbxjm4nxbr58j9znbgcmv2f80z9xahe4sz28ypq1emwt2cuhewtr3leyewqizj8g9mtesbv2ep3bzc8h9ukgynxz0bk4x62p9zeqw5vwl5e5p02nmo4lco0it8c22r0yxwtjnklszkl8ownlbfd55',
                receiverInterface: 'zkj7pq2gwnxmrnhpr17kyeet6go4h02012c93t8ho27q0ef0htmmgdda5xfq2p4zmkm07k66o8j67wyr5krlqdomdg5xf2wqawhdiz44l8sjltcelr7mfb9sm0g6qmj1lz5o5cauy4g2uqmbjdhstreveavlf0rk',
                receiverInterfaceNamespace: '93yspsl970lkpgpw4yo9zea9sme5uhu11menavev3jgn6fj4efb79fe1tmdb4vpogbvqok75ls157fjyge9ewk8nprsrt97ddpr50x6xvfykm6b2aux1vob7tofij0w57uckxx9f466ctema9ij766q1qxlhgk2k',
                retries: 3922478898,
                size: 3567821051,
                timesFailed: 3926945874,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: null,
                tenantCode: '9eunhnjdt38fpz3ftlfz35hhsjbmkjb6qbqu1sg3pu3mmnvn5x',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'trwkb6rqy3bz79po3f07',
                scenario: 'voyfwpboxqgum2xdszyvw0vdqf39z28q0w1swxs4ypgtnk1se2ggtz6kvwpm',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:46:55',
                executionMonitoringStartAt: '2020-07-30 00:59:28',
                executionMonitoringEndAt: '2020-07-29 05:16:19',
                flowHash: 'dcx3xvzz01hh0z2bjh149omhfzmwb5qsqlgm6w8l',
                flowParty: 'qdytffwo9aav4341r3qp1xk43p37ks7z4w27xe6xsc37ujdz9f6f9uugwda8jny9uuviraaryp8me18vz9ts9kf62ck48vkieba4ckaqq9rfe6bgrybzgqrfl8s48c8786c74sxpb6gxeyisfahcfs8yu3pwziq7',
                flowComponent: 'ahdu32iwxhf8trl6ft6s1u8tz9lko9ddde6xrvv22r5h10wi3bpsmij4c9bknm82v0nmd5iqgbcpkkx55bx3bntxybbutdvz7g5pze4ckcyftfargg2bjtc9xpspxvmilnhygu1d94po4t5a3hbbp6hv0cwur3yk',
                flowInterfaceName: 'b5n7fhkt25bhdkl8ioma61u562bwzpg9snmz46bd41t1ox654s8a7am2pyodrjikeiq05cp0ux85cvf57tyzzmey4x5dqwqdql0pbu95h3v881a164w9sqab61apqv2e4p1ifylf2dioxfhb8n2kukf862yvq5p9',
                flowInterfaceNamespace: 'cknl2zx2ipj493exbavxd1b54oymr8lamqnos6y5vxnro0b7ymjldrh02lgp2vtntext5gwykxyc8wel9bk743wpcqcvniry3b2p4gjjlfivapdpq4z0crav4mt7atccyg7nqw67pu6ifi1xus2dtffyzuofq7ht',
                status: 'SUCCESS',
                detail: 'Sunt illum est ad explicabo dolorum itaque perferendis accusantium. Harum et quasi porro expedita libero nam minima quia sequi. Omnis illo sint est maiores consequatur quos provident. Qui distinctio necessitatibus cumque sit a quia eius iusto. Praesentium cum voluptatem aut vero voluptatum voluptates autem.',
                example: 'o5w2lkv2csrhztl4lw1fnlh3i601u2qfz2pbtxkijufkxwe3uvbi9b40dekdkbf3whdkj62d1rqdxxdhp2mjjv3lr291pqr8jnqmqv53rwsww83ptfajns2oiyfw796y584rehz0jep88niy6y82osflllc9zjo8',
                startTimeAt: '2020-07-29 15:21:40',
                direction: 'INBOUND',
                errorCategory: 'jwi016psck8r78061l1430deb06pjlba3n1ccb37ts34zfarjetf26nsifw2fh4fven40rk7myl6p0dzyvumgpec3huumjfh8xhy162d3ixv2zb4dpeskcazyem0s342rphpx01dzusga5956mq5mee9mi7j05nx',
                errorCode: '4zfkvs687h2g1ril52gx48rlntjla4hqhrtwcnck5c9jh8fofm',
                errorLabel: 761455,
                node: 2978280553,
                protocol: 'sk38phncmf49pkheetsa',
                qualityOfService: 'trugf5ecwryii9hdtepr',
                receiverParty: '8kl75som5qi5fdhv9ru07qc5j7p5qctxxdhvm7gudc1de67ekfpll5o2e4xjhj98y988i3uvu624nu3hjih0ouuxyeo6nqnc90w6e8f49uswzlfn4og1l2dvmgyjubgqgsd2n08sjwzxbmoq66ibkuofgv16jds6',
                receiverComponent: 'sxdnk9sirs6is1sntvu8wkbglm6hzz15lwrme35zx5wj8qat2lhcdy27ea008xvhf982tdjdme4x27g1675la9n0suxl60i7j5gg5cq06vgf0dxb11arjsfoayuto2ad6t1vh4gr0mppk5rxyguzpyfby4e6wgmc',
                receiverInterface: 'd1bwh0ndlazigtyvok91q28tp61yskybkbdn9d0rh3c7vmwb4bspwkpl3ztsdlbse6jzl06nymbwg2x4l8d8f57x7ffe3outk7vlb0j6wbov47qpinsilxmx7t7ne932mdqsjadh8akirsrlecmiv6gmd2phblh4',
                receiverInterfaceNamespace: 'tz4j618wg8zopnx0nq2czx76ki60efup62t7k30ik8leh55qd84bymkpmom4x8lyxt4o92ksnedk65nq84l86jh9vr6evq129kridpmr6pui26j525zcq3lzizvhppjpzduo3io1jf3yfl33qna2twlr8t1ef91x',
                retries: 9398431389,
                size: 6370426506,
                timesFailed: 7451478458,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                
                tenantCode: '7th28celtsq1ouizu0g9baekitqpi9ew2r7od0chycbezyo3y4',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'rbldn9fdbqftoy9f8n60',
                scenario: 'ub0lyfejl22uydley658qsebhfdlhgjksta2j0uxkwmyam8kpcpj17ljzdvd',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 00:45:27',
                executionMonitoringStartAt: '2020-07-29 20:38:15',
                executionMonitoringEndAt: '2020-07-30 00:51:39',
                flowHash: 'q2n1q1igsagkm8j4f4gvaieztruoioqysom8th2m',
                flowParty: 'owwj61hdo3qvws4s56js156x9bmibbxf0v7zhqa6jjdjayrx3lehd342v9z5qqbtmldoainu3mtowhsgmxrclx066vc3dwzdb7igtgbrtgglpqm7tuwqkcppr5fohh1hetgtup98pyemc01qgfy9zbgc8bcdn29v',
                flowComponent: '6ul9ljaezj5ltes7wrm2l9agjzchm8mtuagrh84zaurydyf4lv6jicm04jiutv9e56vjwabl4qtp6d97k59f144qhhkp74pj9vk72ycbtluatle00wdo8fckf288yi4wyf5qlz1ktuvtruu44f7my1939nzw52i0',
                flowInterfaceName: 'ohdaqyod30wqbwmf0eg6mlm2xs9q6jxzi8eontonhj93bt409zt7731nkwxslcoe73c5h37tv6zvhz9rnkm3ul7vut8hbpwh6u31wwhs865vungi61i3y6w2ngc9iovgppj6olqwka3bwcua5cpncnff8sup8wjv',
                flowInterfaceNamespace: 'zuiu3c1j8ebiqk2dytr4wy00tng1ifeqtd7cdpsyxxoy424yjowexauat2x2xfhqla53umqczj4vainfd1o1iekzlr1puw1nco4lgrkbsudpiz7xs9wph6djxql5l9g4atemnypdw5f64tat6bp9aehnp89yxu3f',
                status: 'HOLDING',
                detail: 'Harum ea ut qui asperiores. Molestiae cum ut reprehenderit expedita est et. In rerum recusandae est est qui commodi quidem. Repudiandae accusantium hic ut est eos harum ab. Dignissimos modi voluptatem nemo dolores alias nulla. Quia placeat ipsam hic dolore sunt a nemo eum.',
                example: 'j713x6kq484633x6sera8iypi0cx96iwte8ide0wi1jllhe3no99pxmbsesnlwif9zhputw1xn54c6u68v9svxwi6alrfmfr7sgfylhyf3l6o98frh75dqsdruyop9w0ln4x0lt8x8exz8f5mn73hq0u2ew0idzu',
                startTimeAt: '2020-07-29 07:07:52',
                direction: 'OUTBOUND',
                errorCategory: 'xpo2fyxsq15tnk3fow239vmaxu6fmf1h6kxbd6d6ega91eyk1ulxdpfvt2qeha4zwjbrdjq85kz1xhxntgvaubi38l25q1ysr0y1f5f88k45shqz0dlu861xvckmcz3trkpvb4r5tqd21ihggchd46rtgb12ll8r',
                errorCode: 'omjt5hgqkm1ar4nk0ik569tbpf4ub117j6n1k37kvo1n0ewqbf',
                errorLabel: 443759,
                node: 2659132907,
                protocol: 'xcbobvphklk7hsolwsxy',
                qualityOfService: 'e0b54tj5qs8tke6z0t2a',
                receiverParty: 'f9bkvvcy2y2xvaspdtivs884i7hmfp1qvrz1274yxvmkt3fq8mdjvsoxe7b9qm3xfkna4s4s9ihmcu21i2fmwwz8wbaq30onv1is4ywtbwpk7txqw7tpwiwo7yxo2cca51p7o6qdo0urrg2ze2m9k65snrw3armc',
                receiverComponent: 'ihjsz9m072ury8o1gt5l5bojake2zjq2el1nbn7ubp7loa2efojwq93gksfswtpdtws3m7wygwnecd7kabe63di5ebr1ft8qdwti4xb30rnnke5xtw37bygt545xj036z3d7thkrkkmiakg0k50n5k5tmxhi50q0',
                receiverInterface: 'ehuoix0gqy4b39q0bl5myo5c74307ehi1szcrhlxkx3vrz0pfvmbnjf6pe0069rrtiqyejsihdyimp68zundk69hj96sf6qfbzuv7d898mxojxqc8z47hsm3u0n85fa6nlk9px8040va2bv9jagkv1ij31whpdia',
                receiverInterfaceNamespace: '4zb4gjr20omwkl8qzkzedyqq3kkvfh2aty20ej56zey0spfc5ni6dharwssyq288xcc7yek9iry0qoee39bdzlfemhi73afnisbyhyhp55jepr6zarb6r857uetz4cumxylbkevrorzjcl2krftd4npbgpiyv3d1',
                retries: 7536261163,
                size: 4013299568,
                timesFailed: 7750560231,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: null,
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: '3qoe6cppxrj0n95kprus',
                scenario: '15epcc5n0i6wu4zipf5hy07h3yekqgibdbw94pm3mggfbt2jj6sz8vbsqy99',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:23:18',
                executionMonitoringStartAt: '2020-07-29 12:32:03',
                executionMonitoringEndAt: '2020-07-29 10:40:35',
                flowHash: 'trul3of0zobdvswje01l3uyhnmzez7zjtz7y5bu1',
                flowParty: 'cjxq4vahdruurdvmsn5tykkvl0eluyn522hntwvrl8t3h2udd68y60h1ysju55hzmw18s2zc1kveoht5a6kohfxj1txcigx3lsrttzswg7pa5z6z0j1xq5bq6u0fgeoui5urwj0xslf6vj62rm4yral8b1y2aemv',
                flowComponent: '8spzuivmfu4gp0dkf0ilgy4r2wjup2p12udmgd1gtton5qiydb9ggz8as61n65guigqr0s9lj4q92qdj7raigmx7suxmqfsa2wbgigvr1t2d4jtif02jpe07l5lb6fybfktj6m1frsrnqdvqgvkoyc91auvhi5na',
                flowInterfaceName: 'v7x4d9peh8rfa9qn6hc3mp0axds0fueek1efprbcy3jtbvec0pu0dqkk1zgul58gpyp70lo712udu4p2kzdbf3l5br8fzufm2divmblv0mfoxn3ilbnwl38xajb8d7fkptg0yitqyfaajbxnefhk9wyeoy1an9p9',
                flowInterfaceNamespace: 'qh5clps88lkd6xl77dhg63afjcd8k74867n3qoze4g2vyemdyclbghmb1iziooom22q6httljq9n1kil0gilt900bh2nanowv6bwl2wipkxyquf2p0bd52ekuig3khfj9lwprxxws2uxny0cyh5tz32p4t13zx52',
                status: 'WAITING',
                detail: 'Dolorem placeat sed omnis quo nemo totam autem. Tenetur in non dolorem dolorum sit enim. Perspiciatis optio at. Esse repudiandae quis blanditiis. Voluptatem non facere vitae sunt consequatur reprehenderit est est.',
                example: 'ovy6b96lk9i9u58x2ydhxqyallwauve9rirkmytgzzjkpakb0smftyik4ewa95lb1yrc52jvo29k5q9iedhhyntrumt5fqr4tu5dt824ugwtbzphqw1tq43rdvpzipboa4wfm3yy2h6auqsczsd8qm1avuk84i5b',
                startTimeAt: '2020-07-29 13:30:01',
                direction: 'OUTBOUND',
                errorCategory: 'eh894gd5dv7ktrpiq4flt4ha4oz6dcw5f4mhsud4rwpngheq122fycjic9nxqi65ltjjaxpy02tluoyfwicrajeq7z6ya1nrq984cdbaapcgvffwiwa44zzkfh63gju7d73pl3y78jrnrg3j3f05yb4ng1foc0lf',
                errorCode: '0s9h95vvdirzvtv9jzvku2x4yc6cuz2q09r0zu1kwtq96mf032',
                errorLabel: 953417,
                node: 2085838527,
                protocol: 'ssih8nxvoxhe9kdbcugo',
                qualityOfService: '1nnbbsvgeemb461a1v8b',
                receiverParty: '3mmkdwuxw8toxuixzuh42twkfkex7tprfnn6zn0f79tyk89xnkliub1gwjyyai7pss7zqfvsdel3q4bkmnterj1s6ml54imoivc4kl89t5rv4a9auef6c9m3hvisxt7toiljwhsxw1gxstd5cfer5i4romntntew',
                receiverComponent: 'untmrcspy2jqgbyhx8ah68js4khpadt4kd5j42gt0zgam68cy6kryjldv7gls5j1p86rsz3ok1bzjcv9r9uyxfzmgxbzlsf7vtr63wentx1bkdnz5ytm78ra84jdf0i28s6bevza0js158wza6qkaeghbu607sjf',
                receiverInterface: 'gahvf7jng2zounjbwoe5wmw17xjdfw855hyvcq4dncrwq962f8o8ul8oxxs4ixqtghz339iwrj18dpgy6mzy4wpd3wj2dal7z19grpdp3f1uu55mvzsnpnyhgwzs66r9grycr39gbrxjuir9vv7hkbydaq4dfqo1',
                receiverInterfaceNamespace: '3cfto0rgl2hzvsflo51ea5e8uy3owofi6c8tah1v32lhlobiusxecjtzolh6kd1xvo9cz980taf2pmzbg78ng063u1fs2w0pbqcggawrm9rua4eyk1bnzc8cmnedrpqsjzo56x5ej1wcgv6b8v4jpl4uugam34mp',
                retries: 1771327111,
                size: 8350358684,
                timesFailed: 8493703678,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'e4kwm6451cysgc11n271',
                scenario: 'u6emm4dvvhwlfwl27ov2si547xahdqb06zm2508skcw95ce5mtidpyj4f449',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:41:32',
                executionMonitoringStartAt: '2020-07-29 01:46:20',
                executionMonitoringEndAt: '2020-07-29 07:03:14',
                flowHash: 'dquywpxnuzb0qa40rh4c3iq6fmi2p6hz90ldzn03',
                flowParty: 'orzz0fkdlkfxl3wqi2ruybapjg253pl0y9bbqf95qypvd80lke8ckpofgnaik7ly0i1uzkfc9o2hzik4kpqxugaiand9qy9s6abhbjq0l7vka8wnxfi1kaktkely3qc5m325uiwew4sjy30s8ht3gx7m1xsq23ai',
                flowComponent: 'ml9y7no5eg7luj33wcelpi09mfrgeu8lpoqb2aatmfjvhyiipb7nkf8d9yoo4ko7amy250zmsa5fblv8zi9ffoc41madksm5hfgyi1kq4qeyhosyoa9aqmnhot39hdw6k51p6r0oo34oum0s14lsbea70ja2602n',
                flowInterfaceName: 'zbe1shdrceesxrwuin2fyth3d85y39714lq7v6rhiimq9yaa8lpal8y1tyamrqvuxmg163mdbhu7xzhwdlzu4nelq3l43lxhz3v0ii9w2xd56ccshizmnw9kb6wacjr92ri7kad7mss4y4cq2n2bqatdoappw0dl',
                flowInterfaceNamespace: 's8uc0k2qit9juttpeme308alrkopsk8mpguoywcdumv0g5sev8z3le3u60b68tcbtv1vsipoocxecw6k7bnwe6weqk3bfqtandqvz1c4xoq89bqarccnx2wl3hhcufajitczspqp98xpyss49j2mwewjw6smkahe',
                status: 'CANCELLED',
                detail: 'Magni neque quisquam debitis illum et eligendi aliquid dolor. Dolor ratione illo fugiat aspernatur quis ut ut dignissimos. Sed odio qui eum dignissimos voluptatem minima natus ducimus.',
                example: 'm93bmv50ep1hpje68v0legqkxxp2zshffw0lp0ytrk0005g1gjrunjnzmiamsk680ru8xj8dk9d1bibs0hk5r4cqohvjqsjk369ztb76vasz82zfjzqp9qjwnm75lt9ricsa1rnyyh6ofp5fxfz04fwgvzehsw8g',
                startTimeAt: '2020-07-29 02:31:15',
                direction: 'OUTBOUND',
                errorCategory: 'p1gxps1nqgqtog4yx4mfn7ybum8jqe83hockzxuio6sfjo0zsbbmtnq1mvfte0vzjfxa28hiy6strf13atfv7a7ilngmxc41885myeffmcrbq6keogfpfffo2cx1tqdwh6kxqy2r1yjjfgf4x8dkv5bmehn9i2f8',
                errorCode: 'qe8up20vjheljnsduxugib3asd0ptescnrhi219du0wldwrbe0',
                errorLabel: 464146,
                node: 6744447695,
                protocol: 'y9srsna0e69r09rwj3ud',
                qualityOfService: 'wm253zsp8b8s0dbyayji',
                receiverParty: '6ewuf3y8mr7iykz3weju6uw4hny4xf4u1i2wvj6fh8drk7w41qnfc56mxbtz1brzd1gbg5z1xkr4vnv3s8fklpq0nizgr23lz8sonzg3fjfxci0ejvv3vt73fb94up91z8363llrl4qc91i7rfliabv8o78ho4dl',
                receiverComponent: 'sz16lqizdnv22gwo3ivbq8i9miiseziwoj6x8xaw3fw2p76n2lsip7c6nrga1fydqfgc74ro17hx7mj6hcwa7623fjtu36khh6sg8jm8r27mmgkz6il20dvej7znxscyu7ggn7ypi916jylyyrhqiesltk7dhedo',
                receiverInterface: 'cw5mtkczcss476kg168agkiya5i06dnpat12y786bkq0ozv1y911c3kw2vlgkv5vrngmdivypwcs2sncwus61sc4bhbyb4pnsdbryj81hsxnm6rftpyxra794pitmert7fnmvffzgi7zm9g6f2vbn90wuc7dkku0',
                receiverInterfaceNamespace: 'wst2gjzgjigy6dg4j5e6i1uwf69u4gvjunx6h1j3n3xpnacp2u4liveqgi2srht8fwyw4t15ydwqpqvhi426ykkze6thdyzvt8lf3xiczwlwb3xkpxitu81qgih85tgaghgu8b3y7xxfbq4byr4s34j50rprqwa8',
                retries: 6204013686,
                size: 2209405987,
                timesFailed: 6600379639,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'kok80xj76j2d0k5llj5szb7n0zesesxym61oe4x2pmw3wntnre',
                systemId: null,
                systemName: 'vv3c49fxm66ywxrdjt8l',
                scenario: 'kzirzlyohlbzaljdjzmijnwnsh9z2xzomvwlpj4sm7ylv5xcyzuqpo8wn26e',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:37:01',
                executionMonitoringStartAt: '2020-07-29 04:31:29',
                executionMonitoringEndAt: '2020-07-29 03:21:19',
                flowHash: '7l4cgeqfjm2fnatgmnug6xtguywksrtj1kuvymwo',
                flowParty: '5ivdfds6yrenps9trg3i2pp81y5r1gwj4vbv9eauf0g2paro1h0uk6ar26u77z1t6xww7hdb0g9vjsvc2k6kcrj7i59lrxrwijp9w8zdstxbvp5j8ina28ftmqeh3q47nvem6nvrv9xdwa222gtoe2397zgpb0tm',
                flowComponent: '36c5bn5rr0b43fy2p2v8czcv74rstzr6cg0gc0e8jyagn5j6x1qwfyxfkmy389bg076ejqqm5jpv02p9n4ff96hgpk6fkt7pwhtjo33newfvzzlxkulk35i0258zb2ikbdk4tz2zlw518c8p3l0cw3qh6rlyaglf',
                flowInterfaceName: '67y8kfeeynrvykhs0sh11gojv236jul2lbpw7xhqcood5cx6tkaafz647k41ymcz1shzeldze8t14vx6ubjjyx14g3ef6n8eoc0osc3g7hwft7puftzow6gi7fg52p6nzkd0nahsocntszrvs8m5chj4e9kc76zu',
                flowInterfaceNamespace: 'dk8a3c0gemdtcupqrypv6uimr89r13zw8bpvcymvmr3i69nqykth03lqicezn2tnkisk5kw8pwboqsvofelbpoz89mfky6oyuu1gxu2gwuh4j6ivlbq16hv21tovuikuc6jjnk328oenf0r2g7pkdh1a357c0lls',
                status: 'CANCELLED',
                detail: 'Omnis ex non non quia mollitia expedita facere corporis ea. Tempore numquam animi atque dolore voluptatem quasi quia. Voluptatem eius iste est voluptatem aliquam molestiae. Aut quaerat qui. Quidem odit rerum quasi eligendi voluptas dolor amet. Fuga ut ipsum aut vitae animi iste quisquam est quia.',
                example: 'dcct3efl5zx8w585phir2hmxga5ckqwrgelbxvnpmdb4g03g820dc6jhylkiy8jrxhwz374l9oqhix1i9mcugxip4bofy647rdodzz0vtympgiw04vmdxcakcd7einz66p4e9iqedu3ns16hfxfhxwyztj9x8kas',
                startTimeAt: '2020-07-29 13:15:08',
                direction: 'OUTBOUND',
                errorCategory: '7zijw9t6bloe1uvk4usv0dlctogxn1khhel1yavxj9v1fztsw5abokq2bt0rrp2420gegk725zreipide2znqeg5eaow344jkcio8dy61jokglxzi3wo967sy3hlp9ni50knqtfg8gl281txz5i3965mlnn9avey',
                errorCode: 'i6abgcx67ai7cx9i93f6jj0sfmc9h6tmcx76fg7c57c8v0fm6d',
                errorLabel: 915424,
                node: 5375873194,
                protocol: 'wkr2xvmb3hp5dxt9vanx',
                qualityOfService: 'nphff22m66k1zn02vsg0',
                receiverParty: 'bxycoejofia3a3an5gidha7lq97mdhso7io0lw2sds8q4gl52pquoi1epxqnyicewp4srbnywf47hn0l8q2y1nhdqcyi1wef8gahc566i8p7a6hztmibiyb63xry77k76ug1mhd2wlgk8nkqsmfkxn5ymgrt3bmo',
                receiverComponent: 'n2r5r7wuk20sm7wq12alptuy1k1oplz4m9cfjbt9gfibhez6t3t4h9ccgq6zufz6hxd0kfthox2m7pnxek03zdozt4c8wzt6y65uu5z9ysi0y2ychd0xe7twa7zk9oghmeyu61ilbuk24klt3zck5204f4j7bnyv',
                receiverInterface: '2vkvpp7dnxgt1cwgjb6douvubmujgxual1rmbemq07qf8xytcsorde3olwe784kkesim620jhn5cpfez4mhk0yhbnwwnlbugcf8q9qevim2rqyerr39s4wv1rv04hc4kw66wac6li615ogvjdarap3rn1udvilb4',
                receiverInterfaceNamespace: 'qmhi6p5v24lubqs5ht49mlorh26a12zmhfdbz2u9w62lyyk40wuhw89omr655rj1jty5dbwzlao4ktmhq0geaqmzlxiix5ho87p3rprr3ii84k5lwbngv4ucflhpu5ziv18s98l7hsulrytwiuasto2esgxex99z',
                retries: 8590909324,
                size: 7639308550,
                timesFailed: 6981695984,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'tdgizzmec0f8djad7tysqjxsat2xzdsbse7c8uyt3rflm4kwl8',
                
                systemName: '8xqj8b1ojnp40m97j0g1',
                scenario: '9cpt2jv0eoo6bs69hxnifefgcxqjtx9je3c7pknw24df0zxohf97dgyn614m',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:20:51',
                executionMonitoringStartAt: '2020-07-29 03:25:34',
                executionMonitoringEndAt: '2020-07-29 05:20:22',
                flowHash: '7ig5n8cpx7do00bix3pkswa9hphnyzsscxfmaww5',
                flowParty: 's2w8khmrcdt5dy5h68xgsb4jch4zfel55lrhef7fqjabbdxtcfv59cokjwrky27cr26dm9fn8thaunddog8ivz2gfbzonfys1g8inxpbhhbr7b9xf8w4jioxp8bsy9nioljbadu1an3aj6lyaptedgisjd0hajg3',
                flowComponent: 'f1nqx45q8qs8v8bqlz7t4xw62wfquxx9irnq6wddo2t9gqj1es50xmg2v0rgvs5pvzfejfy48y5jbp91ybb24m9y82xzbzvnpr6tzhy9bsgewv9w7shhu5hpecay93n7ao92h2ozqo2teaxvo0iop6lx8s1ssddw',
                flowInterfaceName: 'lru9twe0saxal97xw1lsxsr6czkmp87d9e1chi3glwprwdsqd6gldacropgmj0zr0jk414qnaxtss9j767byan4w2vb7kf4q4ymu6b1keaxxmgyw2n6kgl39umz8qo631htkdykh9kygc0aed72n1qt8z57dmm74',
                flowInterfaceNamespace: 'lln0dkxzrq5yaksl93qcgbfen5i87cf3t5ke14ug4pphr2otbncdq1n47519zwm8pnvomd77ajz5ljdc7wu9qqz4vpku46gkrv2b1pzkaz224ped485qb64nt9tto3cm22jeidksry3tjcx3hn34lrj01hzxjl47',
                status: 'TO_BE_DELIVERED',
                detail: 'Ut sit exercitationem sapiente autem est velit consequuntur dolore et. Esse iure ratione expedita est. Dolorum porro ut vel quasi perspiciatis expedita quod quasi voluptatem. Tenetur est et minima et aperiam facere voluptates. Dolorum ratione voluptatibus sint dolores.',
                example: '3hkml4o1v6tvnl8nm7alfg82dafwxesam7fddkdyy1ejs0zgp2t1a8r0zyeld6nlbdx38feswp6jh0w59tnbpj6bdni7rhid5nqncy1lkqvzhe1ta3me26e3r0aw2c5c2u43r19ttlomeajyuig3vb2yy061vwmn',
                startTimeAt: '2020-07-29 07:18:33',
                direction: 'OUTBOUND',
                errorCategory: '5eq8pnhshulboo6rzn7utyyusf5casiwb06b2ty0aijoz503prf5ql501thekixke4yqgb6hwc250y0hz3oxaki72domy3puqi92746rk0o3t74033m75tgcn3ytga0p3u5aoaqc1zs3rqoetwwyviu8rue7gwe2',
                errorCode: 'boncgbhhw3hc8gbrfy1hftuk005sz9ozqsmo16bht0fof44s1u',
                errorLabel: 178472,
                node: 4427752666,
                protocol: 'd1e9e0nurxlx4nukwoz8',
                qualityOfService: 'j4oiopmezt10m4kfbx1r',
                receiverParty: 'rqpk0iqur549y20usdusj73lakivgd4p7vzez0w15u9gh06jxdo7r8jnduk5ona3qkcle7yn0gxu3gsm5mbvsp5nrpc6dwb1286zcc09t1rqame5cvocu1ysxebjso618585zopwra9gi6438aygvkre84xgvgzo',
                receiverComponent: 'i3wz57os6pc5gt8px5c4dk0nqselo82423w7456c58t6qgfd9il6qs4wj2x6e5p96zcwfpo1lzwgt5zkkpbxsszm63lj1wiuzehyter92ghz6i1y3jamynnbw6e2owsdfrbo7xdumwpxcmny0rhef5soiymrwf4c',
                receiverInterface: 'ubvcw8mxowq7ch5q797cl5y3iu25uka1dmu2b9t17q5j6wnv14a38qskpwk8d9a7xxij4tu97j83wxyolfcvjf0pk3865m3n0h21a8rao78d7n29mziv1yn041oraenprzua5p28ixam8ifmh7v2lg9sigh7qd48',
                receiverInterfaceNamespace: '8b12wb02c6q7f4085jrpqjc4m8jzfberkylque2lmwg6hhe8x9gxt20gzao36h43i0btalbqlmw0ogpd8ohot1h6oxb4957z1r9hvxbv48x0xyhy0fjznooovsdbkbbibfhduhl5cadzjj74ovkeq3udfozgqydl',
                retries: 7129316287,
                size: 8795015531,
                timesFailed: 9724377860,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'y5w3up7fpv2iwkzdqt6wp5nbi0jj0ull4t0uwcjw8c2ftjve08',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: null,
                scenario: 'y26dxbhl89xfbwxp071czfdourl1aosdv90r73gamrpo8wamawn65pr5pphn',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:29:51',
                executionMonitoringStartAt: '2020-07-29 16:37:51',
                executionMonitoringEndAt: '2020-07-29 13:12:18',
                flowHash: '98q085wwytetbx8vxgsf1cr8pv7zelbp55jc5f5q',
                flowParty: 'cok1vw8iiktfgvolqzgy0dtvmgfrb9c8rgs9l74xfuun89td6xosogp3khvcitl0w0kss6cbdepp8zq6td1sv6cr661br9jj31hyhrnppvjovskg70008aijm7isf0wngb0tpa2ud0robxpjmamaopj03lj6vnls',
                flowComponent: '1quvznjkm2qn02xuzaso4p1l6pq8lyqsa0qrkv30k46txt4okyplgv8pqxcc2emgb5bek2hkkjikmp2b3ngaf6jen6f53u656fx6saqs47rhnwyl2xme2ljlnmv2rhtlbmr66f100wye7tj8jl5s4gxfxjpqhg5x',
                flowInterfaceName: 'vadnm07qajjs9ubroxjjjp97ipnun0qmeinb4leku1d52bn3c0rb98qs3jcik9pzle2fx4rxork275k1hxxlk4txqel8ve58rhmnnpw2tn6lmsgcz9wr119py96p0vp2g4a3ev1iqpi9zw3osx8ahf2fozdzfktm',
                flowInterfaceNamespace: 'ys8g0pz0udrv5h63ucfyeyz1o6p8pndx9f4kwz3kmxqmd0bsm1nefnu0rnuhq1azk0nsahi6scly2jpw8a1qt985qy3c78ebzw4azkxrkuqr2j0yfe6e32aux6pmincjudu77q70bt7ciws103hla62l1cxvlhvp',
                status: 'SUCCESS',
                detail: 'Labore maiores voluptate id praesentium suscipit ad. Aut voluptatum maxime eos ut inventore. Voluptate aut et non. Reiciendis necessitatibus nesciunt porro.',
                example: 'm4x4g2afu9e3nsggzl7wmj04k34n9y01xdgojeuuyjqiqa5h9ifzwu8n8xpry9bzcd9curxva945gvje9wkhlurfuco4npjpf2uq4wxevjy8vu83bhjkaihsfj9u5nzmf5xh92dun7uvfjqmxkyq1c6y71m37rig',
                startTimeAt: '2020-07-29 17:41:40',
                direction: 'OUTBOUND',
                errorCategory: 'qjz2o06f278wl3r42cry41ux4h8k55x0kngvv8yfnmwe8if7amc6hcyh7lnkafgyrt8uxbsrxmb57wvyyylbzf33ru9rjixxy4jsyix2v3d4vugjvo9hqwy60vtq3gjruls7s2o38b6g1b8h2bgvo5my2xa3nadw',
                errorCode: 'opqxz03r9ewoewdbvv2b55tqs3uuhzns3q8sd0avz8vry4fzwv',
                errorLabel: 402897,
                node: 8931137626,
                protocol: '32pn70mfr913h7ap8ljw',
                qualityOfService: 'c04v51t0nkmzfaak0qr0',
                receiverParty: 'nd1kg32od5iopksryps3zzn2ke41t5xat6cymt3tn7xeey5cnvu19qhoxtjvtxf9u1iz8eb7sbc4k2ysaeqnlcs94uz5q8chxq8xmfc7gmkfvq3p730y0en9mzfzvlep40201c5r6zpaz9muupe7bpvgyg8scj5t',
                receiverComponent: 'yg8dusdchexrnx5d0akkxhep2donswl6x3kovrsdimps8jm169zod7s27jeg9ndyl5keshmitmdbmgdqykjk7sqffee6683paeyto8klwinnrlk47wyddhfg5e2thryy8d1n1fyu0tvw644wi9jq9gbehfavlmhk',
                receiverInterface: 'ngey6vizxiuqpy47vgcfiarh99a4ff7n0zqw0axj8rx6a5yuguyo63csowj22ux9hbqjdtatnxkt9n1mmbi2dvdz19dnsa6d2u40v9rpoud4wf5oyu16wp6yehvk00vjkacu49n8x1xyaz4hxux0k0jy4p58v0w4',
                receiverInterfaceNamespace: 'pj52s6v39tazf0phzu9yc7hn4d4dd27qewz9de02wlt0hfms26grk5rtppll2mbz8p755kebx6hk8ur9ziy6r6x45m0iedsglgk5cb91jc5ktwwquvrmonnnfc6dqgspsbv2v5eug7p746pucmjfwyrer7r0xgj9',
                retries: 1986261849,
                size: 3321460215,
                timesFailed: 8175021306,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'joxh59o4dzvrw30q1477ltlq80borynsj0m45egvb88bvfkf74',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                
                scenario: 'yes1mcmag6sndpjq7nbsggopiu8uda6bmxz793dbvadtnd7spcnstd2fk2et',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:41:27',
                executionMonitoringStartAt: '2020-07-29 04:30:01',
                executionMonitoringEndAt: '2020-07-29 19:26:04',
                flowHash: 'su8841icj390vjabwdpmurnu0f8nm9f4i4m5iuj9',
                flowParty: 'zpzi4vt946gyp9z3c9eh6t64cgfoxrllpdel6m4i4rpd0hsg7izz23xr1mpc64duck3s8lgjppn1m12q3vniy8982errdwbqhgcp27urlwacw0su5gda3vkvbe2tzxp7p8hp7fnzrabjps3rvqjs3y4intuakp96',
                flowComponent: '0onm5e32pgvk7bm8phmfrn6onvlpavfmg5t8mfvcfdsugmcs544gkr7ohc716rbfiqf7y77rlwmlxu3u7me9562zfdu9r9rkr9mod0kbklf34iosuj8ae9mro8iacnokhrnsokpy0fhmpw6t0x318zec7spy3lvo',
                flowInterfaceName: 'uykv1xwudw62vgqtcancsx4tthosjxyhba4ubzn90sgfmioq5cg2th5mknbz1sptnnud3udpr2s3ytcl4j26zhkzdwwx9y5qtypw66nx0fbqcqrir3nbk9bik3fwg4acgwf8gfyfomgc1t7xxp62un73nl1de24q',
                flowInterfaceNamespace: 'pu9ah5103vsuzbl70z76tr2y2gztoqxwlg9ahubjuzor5m7t2hop8y4lhncm0la5w41084lh2jnuxtvon117knsb4czaxi5cp4g8f3t4n2v52z3hqj9xeyd2bjjxdyzrunkrj0n41er798ccssfxz0p9l38lkqwl',
                status: 'TO_BE_DELIVERED',
                detail: 'Harum dolorem quaerat expedita tempore nisi sapiente vitae alias debitis. Quia blanditiis vel nisi sunt dolore. Fuga facere quam ut. Deserunt excepturi eum a. Nulla ut incidunt a nihil. Et blanditiis temporibus.',
                example: '6pfuk9652q9yfmtpvoapd80wgh65objlv0jf1btz7ovx6u49sfp0nvyiw0hy2jr61tso6k6et9i3le456sn10yay0fh7wfrji6ixy518lxjxt75jz1mci1k3m864xa77cv77swyt2py73lutuz9zft2iq1dmb1p6',
                startTimeAt: '2020-07-29 11:48:23',
                direction: 'INBOUND',
                errorCategory: 'kleilo1xkw6ooruk05vwmqlkh27u6id9tr30a7qsizkhgf6qqh732jk3y9h9kp9wyjh4rt9olyyg8mvptuuscch7oy6isqjah6wh554xy32xg0e1pv0d3s5fvvzycnhne84k4dw5qteql17qqgvns0r6w397u3mb',
                errorCode: 'i0b1ki8stroz5bzpiltrw910jstahpt9jb6hml19h1csr6ma2n',
                errorLabel: 597466,
                node: 4483491306,
                protocol: 'lr50qxmmup9x47ta48nc',
                qualityOfService: '60srky2nl32fa50n4jpx',
                receiverParty: '9oq3a0g2onflxao1bmnk3odj34xyojmefmuofo6101522d5ikcl2vlyvk04wtg5wymkfsj2ylh0wtb2yoktfvp1wpmyhm0obia1yg7hj02wooqvqwng61sk1paelp6gojvqck6541jxxyycjsgkimztwjby40j2o',
                receiverComponent: '0pish7i9deelrq9t9exzkbrwjifnarxd8ef6c5w9lk0h0bgjseoitnqp5q75mk9dllhh4rg5usihf9g8idryw1kdprqjrv5dusslhwo8p02cywhi5wvhm2es7m03hwy65l5ggvl18m2n3ylq15ysys4w4r7fxglf',
                receiverInterface: '4m8ugnfcjymg8k4g66fi3sxzz8ooxm54ui9qx8xbzi7fpw10jajg8oaih3u30q6w667n9lmpxl9li7mxqfl0gcv8pb6zbd6vhkpg5y54ilus12y0jtign4fm1a9jnp7bzqxn5zm2d5rvbwcdm32lbte7b5rp5f4k',
                receiverInterfaceNamespace: 'qezrz0ciawvjem4dx5vmun2w62ptbnl42z33dtwsonquifz9sb1h8ujgw8gtnd4wkocs6afcodjj3ljbwiylm5xr8fqqwgrp3e8sqlzogmvdg82vzm00irm6rl8ebduxsxacifk79tdr1rwthnwxz3ciyjqhw229',
                retries: 6998515056,
                size: 3245901544,
                timesFailed: 6594651384,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '2c0o2isuo72ks9ns2oz71i6kgt2w7mh2zj87342jysleyglrlw',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: '2ivqzksj9hfj1k41p2jf',
                scenario: 'ecdisc3wgplcblpb5q15qlelg1vfo2019qp9kn8xwc28aiwquvy6rpm52w0c',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:47:49',
                executionMonitoringStartAt: '2020-07-29 21:27:21',
                executionMonitoringEndAt: '2020-07-29 05:57:58',
                flowHash: '4x7c3vk8nc65ysauvl0xxgdwttav78fkewe8grux',
                flowParty: 'e1vkbzjzbxisknjg88mxeb3hrempr091uap3xrf9f7tzjmht3u3fbs2k282ptjbqec6ywupwzm192ao2egwrvf53xg7ae529dl36ai56mkhcjjy8jwc8k39126o44pgsk683f2hr0cibatox71ifvak56tb8diro',
                flowComponent: 'k9o27deej7dxzd674ps269pb923209w736pzakbcg8cr17lixeexvz1g8t0zf16vacf298lhg4fcblqjw8h3mhv7mydxwg2g3q2ljkben6lv2h9jfwsv9cghbtruzut1inzwzqd0tv56m6gwufbicublgjag0e1c',
                flowInterfaceName: 'f3gsqck7z3sd2mtcp1f3bg4nguug6ibji2xo1ozk4ggnqu5ejvd9zzhbfeeac2f59n0mvmbazm92f00dzxaewqjz2ne518xskkbpf4mpymrtljdiazkortgjasbo3tlkgpheb1hd78isr6ikc4elgncevboruxmn',
                flowInterfaceNamespace: 'h3srees4eolkknsx18jggo9i09w7ehnrbya25oqhyng7o0wqx1j0y91ve95ehyaluy29rzay0b1vj680gm4ta5e9orl9bykolcpkhj74omx9vkbwmio68og533cv8o4zdtqu33ycmeiowrp1xfpaybahwejtjp45',
                status: 'WAITING',
                detail: 'Est et est facere veniam voluptates laudantium harum ipsa mollitia. Repellat qui occaecati quia dignissimos nihil dolores adipisci. Tempore adipisci rerum ad sunt eum commodi nemo cumque. Doloribus est voluptate ut quia nam. Nesciunt non aut et in. Ullam et ducimus provident aspernatur eum.',
                example: '3rwq7pqlc0h71utgqlqjaa7b5grmktkhjpdwnsy1z1l5jkmuwf0o3mgw88shp7educ1ul53drsh1sccyp27xy1ncaf2l1dql6kaffmd05v9y3322bzpkswjjvb6enkt5bssvf9ayl89pdu2onkssc3mrwg2053ar',
                startTimeAt: '2020-07-29 09:31:25',
                direction: 'INBOUND',
                errorCategory: 'engxok6r3iqr1xckg7sap3k96amh5ekamx57vzschmztmjsd366dgblogrhwrss2ac17egfcshsdrpj0ut52gcuj3dnnmqol60v5wgdpg8nbb0hj1xm0f398o812kfqplcajqemvsxvb2aqscpgqvfpym36i736v',
                errorCode: 'k16k18lxr9ihqav0d5kz5nz60dvb53h4xixrmcs9ucxv5fdnnj',
                errorLabel: 468346,
                node: 8112819359,
                protocol: '864lydii3i09lv2adogm',
                qualityOfService: '6ftol7yz19p0mc4w06gq',
                receiverParty: 'n2jf9pcw26dh8qo02mtt1cr7be8fes9jmd21nudmscoxetpd6pl4qx9obr14gk4mdc0d5ojh9sed13ehuf2m4ctwtp6vjapegahve7qnw3lg16ro5wwdoyxwyev00wjt10mmv352mrwbhytzajo192mz5bzm92n8',
                receiverComponent: 'gwl25qedycniuontimcq9spw78qbbk7o7s5dq6cvpnx7sv65l66lschb5zb3691rzap66te791k9sdwzet1mcdoefq5l5xu5ghivqi3ug2pcsgr1xbnegty02z0hi4wfxrjyx43x3m6t7i86p7llmsul9jbbgbpv',
                receiverInterface: '1tnhulif929gaapsr6jxqkm2x01x0j57cm3fysxnhzpu9lkrxevzb9mampey2ynn5foo512bl94uz9xme9tblqnc2nep95dq9xkfgjbc2eh1bjodg5jqqxh6lv5ov38rjnkg9lxn2y8iivx8ia90zhhdj2yrvecq',
                receiverInterfaceNamespace: 'g6lpqpgg5uq1bluoj8poiftjpd2we0ns3zyhshz2id1vkyuiei4imlvm61oz24c2cmrcuy5avrhdmudxaeyr0bx2r7sqqlnbvzj0m2hc46pgnxv0uhcongjsp28p7ex5jh4ex9xakebymftaxkfpeucwxnzyd2fy',
                retries: 6693377032,
                size: 8331657121,
                timesFailed: 5142498035,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'cnen87gh7sx6ox2fd1p837qjnveqpphczm3nnl164r745hrs9p',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'io0p2lm1nznr1qqo62ri',
                scenario: 'd676on5029db04ebc2k5a29olh8zwl7wuu4yf76tl4yqjxaz9ih0uxqn7npy',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:43:43',
                executionMonitoringStartAt: '2020-07-29 02:40:59',
                executionMonitoringEndAt: '2020-07-29 21:22:27',
                flowHash: 'p5103vamtvignasro28uqr2dqo678sebe6vcqsty',
                flowParty: 'a2ffhizbqfac5qes7mjrs8ehwu3wn7dr10xjzua7s1nndk15fdjbdeye7fp1tlis9xgy4jmbggwwd85axyjk5jt83s7blk5j2zoksp73dog0fjvc4jb83mvb5ap6ladr6chvcaav4nq257rhuo09hzqcw46dyxht',
                flowComponent: 'plb34jftwz9j8x8imo2gf13ek6kfmrz4qma4isjppecdyqjtx9ow74kpin6sez0v08ma9s57plo0gnh93ky9vao5v3prgwz80kiizzrvfeub93c3tcoujwclxa5b40ud09kt33ns008md6ckfgrc6ntnabpbd0rv',
                flowInterfaceName: '2ltcfzrjzgb8j1sv4bhs3kr7tidmvxfr6ribnk75fdsfbr0z8q3gjb7iv6ob2fo6tjqrt9rsqidajfs84dym9705th3gu7tt2f08qhljix0svidlbp53z5c8ep2nahkc4ag0v1ilet7nay2eexvgzes3n83o3pt3',
                flowInterfaceNamespace: 'nwezqdvvw6fsgi897rdyar7g5z1x647lmziys013jk5ikq0b17r7fuyp0oy9s23dtx90da9015kdm00nfm4lyqlcywcka890z57o7rhhikon4vnepo3t6inmdqtzuz4dm2fdqe94de6wf158wdxdo9gdf8nlbf0o',
                status: 'TO_BE_DELIVERED',
                detail: 'Reprehenderit eaque qui dicta facere laborum. Aut in in minus sit aut. Impedit aperiam sequi quo natus nostrum laborum excepturi illum eius.',
                example: 'e3r5x7utnnjs1a2m1emf03yt3ctqx9l83o0vuyxgo41ci8a86thv6i3k8i2fn2lj25kbn71phqfgawvob20ocpyusbqve9azq1nz4qv6826j6807zt56lhffejo0bb82kxjl36jqpwegykeuhneuyhd11c88lvzz',
                startTimeAt: '2020-07-29 12:51:07',
                direction: 'OUTBOUND',
                errorCategory: 'h8bbd8st1brg47frwsrpxntqhgj5hkvyyanx2rye02umxkcmzzps6mia83fkfxso932hmh9u3csj4ycnhertmq1giuhtqjbq8om2pfcvs0tuit323o8ok9vmvm6oqnsc3tj3yiawpt1oob3uqz9z9z1wez1145r1',
                errorCode: 'z9t0wzc1e6waxmqmum2s75lkp6563ud7ksg41arom80q8gwvvj',
                errorLabel: 503699,
                node: 5368222190,
                protocol: 'axg3a1ctykicdwipphrr',
                qualityOfService: 'plal35ipproxpduirja2',
                receiverParty: 'sclsa0i5lr0aew2cie3jvdmpwdf12bc610z7u9dkdvd6ih6fsxlfaeh7unwl24364866shgie5amywcfmx7guzebno93v52808l9mhiuai33bdzykb53978pqzau4rovpwlodg8vth8zlcls3fp3twr36n3jdlry',
                receiverComponent: '4nbz8rks7yb4eezr62ic9pt4fuh2xniqa9fzzsdlyynrpya0pc1cume11usz32idnbsumpii3sr4pakttw4cflht72hqkzcv5wdfdmdh3kkrmy4az6pxjq31xtfahi5rboee7egfktbxafsg9gqljmzk89zltvoa',
                receiverInterface: '92hvh3lwsyctvuiixpm2am4nyqnmohjb4ccc4exw93j9wmykh4e70gs5iid8oze2v2futr3vph6q95nwg7zzjwkys6a5ph6f03fu9ctdb7rb9xlw1jilrjrnwx15s3jpur9avtyalp7j82mihggfjabthtfoiiqt',
                receiverInterfaceNamespace: 'br9u12jfz33r5sulcwudntrhwujnf0mfhjtf8d4m1t0qqpral4rw9szgfzsp20m4edolofque0pym9u3233f1u1nt706avojovi04mxcvmcxv3hbpihrdo45ezuwiuzajgiwnwgi3fu0do8skn1jgznaranulgr6',
                retries: 7570913951,
                size: 9931763767,
                timesFailed: 7982376406,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'kegpw9kh3tg0q2qk23u94u8ir1ljfmku28pdum0cox8b1iv3w3',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'muctq3etla56hqmhqaxu',
                scenario: '5p641ariubhypuucstit90bl00awfsbtj0v6yhx2a4m04ebbvtlyahl0p66m',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: null,
                executionExecutedAt: '2020-07-30 00:07:55',
                executionMonitoringStartAt: '2020-07-29 14:22:06',
                executionMonitoringEndAt: '2020-07-29 19:01:26',
                flowHash: 'w5ipclrmxt35wlne39b3ph09a1irmllv6njg0wjw',
                flowParty: '7c8bg22sssq80k5litj3h1ffdfyzur7p2zxe6nv2blmtnwazbylcpm7rat4mzvpjy9cvjeo1t1m4jdsm9r93l9ozvv2dt9q4six2t18gha2uv6vdw7rxfk0sp3kqqauef0558vw7phd4lyk9b340lsm8xqsjg282',
                flowComponent: 'ilqqpne27tz2o3wmnl4r5ff89x4k9jks5vps9rigwunkb10zly1w3yvbj03m28nwa7kgysbpgocabx6gi7eim19sqvpnseqi8zmmc5i47sn6fcol4io3qb9cgh1j5kksb1p7edgwh4hisedrp40hh0e389bkfior',
                flowInterfaceName: 'dprixujtykfbguzo1wkmfrr4eeltdsptufyzkn1rrjxtlaf6ad4s9rxmlwhkl4vj6s222ag0nnchjaj3czhuexc6xy1b4uqqwumonsvn2cwpv7qr6dk4ga6p9x6wemzwlu66w035y464jyxlj6fs13ppm9r9iadf',
                flowInterfaceNamespace: 'zn6tzimhliudqf5dtjoppuyqq6se4vtvoxy7n3cjtez1f45n1kg07anau158nk0gw0kgmobz69g1qc13tfbg9ww2f2t5wngzpain7pp72sfcpbdhcf703clf9dqf1crpfmnv4aff84k8gfknd6rjgybjpzmfn76r',
                status: 'WAITING',
                detail: 'Eligendi ipsum beatae eos odit pariatur atque voluptates. Aliquid ut laborum aut quaerat voluptate. Est consectetur sunt iusto et. Nihil doloribus facere. Sunt odio consequatur molestiae praesentium nemo.',
                example: '0fvje003nimjv4fgutpybuesthozo60jswe8hnp86cntfjzu7xuq8lrv9pz3pa5rbr9xytr0wxxnosi508le7cwwt6rmyqkn8fnqn7pjydmm43zt0h48zulm22u2szwxe3nbow8whu25rx3toyd3c44bidmov6bb',
                startTimeAt: '2020-07-29 17:10:09',
                direction: 'OUTBOUND',
                errorCategory: 't3r0brkrygrb49zwusa2xlbm3yvoueib7w5ky06ovqich8g4sltrjikpu2s5wiv4oraj8ujtkudvw4cxl3bg1xyjr8y4fc2x5bbwmxrnd8a4o4eo8oyy1ssvw9vcsitad6szf3i4eolsktmfu7eygzo5bkcm3a7d',
                errorCode: 'xrho965jeredpe7yq0jtkqbi34l0zyg5i33vdsyze1bhksuykf',
                errorLabel: 396535,
                node: 2719746112,
                protocol: '3kw4azomo3hboduvkjt4',
                qualityOfService: '9vb90k3di7xx1af2s097',
                receiverParty: 'm0hoxn6vyqrqd7lem07xepkqfyugjs528zfgfuc55d56qr7uq5f18s7bt00v8eebf9uk3ezfe350t03ylve8tqhfk6ookfj0rlubd7q1vcl8bt7mii08w3iagfutn6xz53rqiffi4vx3thadc3o7yexj2w8086y9',
                receiverComponent: 'iztst7itbr7gm1zqxi3qc8aa6uuzcw4i9e8nb4ptlxx8epvyuttim5664oq0tecemxwtw0rzqaad8zmjxelh2c6nrq2e8d1ud4dnl1k3vc0dbnihq37pqq6790z4tey6ivnehffrs0gf1aht5y9027f9im1it6uq',
                receiverInterface: 'qws1anjsm4olr523j3rdhz3101j4jgev0w95ygop5xtxfefbz0xrz48soyyc7ikaihy5yk631r6tiyf75pe7n0bq9sxawpgculvn03fkoz545zdheqaen4kesvdx1pg35h6ji4ekda6waqh5cmougo1vb4nrmd1b',
                receiverInterfaceNamespace: 'qncn29hdba5rv9aj5toupvg4b5s8vwwcpt5qwrbbv56zd87fxd3hzgjcscpaxaw0gp1qzucyvzjyr58plc329mq4sdt4p0hdzy3ucfrdn7i6s19z1hkwi6vd490x9y0ink45oipdnkw8wj63g5f5gecm3p7vsc0h',
                retries: 1364218538,
                size: 9164425751,
                timesFailed: 1973161194,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '4bavhlc89u5cqohg7618jyj3jhkb4c6f1t292zxbmkgll45s7m',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'w0h7k9p5mo7vsycipan1',
                scenario: 'r7zv90fd8ww3r68ir0wg5w3l61altyxjs89d1ty4o1judggw59fysn4yfi90',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                
                executionExecutedAt: '2020-07-29 17:54:44',
                executionMonitoringStartAt: '2020-07-29 03:57:44',
                executionMonitoringEndAt: '2020-07-29 16:42:48',
                flowHash: 'plcl31r0chq54nd3u0ndzlmo9vg6ivcnxyhrikyv',
                flowParty: '18r7a16eid2fejixp95f708q49pyo1hpskmlr290bu639fz0rup4dlg36015gig7kn54cgkmp30ve3tej6egamyfp6o0utl08azvph807qj3qgbpmwgv0g1bj99qbbvs0jx6mhn4pcw75gqutnomvmkmsnsa9w6h',
                flowComponent: 'lgl5g1nxao50obfopomaiyozy9v5buox12ndpscibifzz81f0sbasrhaa0c9e8s1o4g1gebkhqatvl3xmx9u30unuolr7pobrsh14a99uf4blepc9u7g97on5z6so07l62lnejubqb958npxdtff7aj1rrtg1ffw',
                flowInterfaceName: 'bg2yuco2z2l36qn9ni48v4h88osj4m6r8i2x2qkdmwyp04spmce4y76vho5iwgq5ur8je0rb8ycv13x2rdymqhs83bl9wmg6ziuv3atcjo2cozb9evzoyrd2n9npd55oz5l276d8ee63069xp5ig3c90fa9086ep',
                flowInterfaceNamespace: 'zt5l40nc8s7gla0lhp923kkdfbx5a7g8n0rgmirwv46jhn68zlptf3nzlfafwyrmgxkxilvhiyua7on9ik086l2qtnirpmtm4vme8xdk8fghnsek5d45j32ew5esc6xbxbmez3xz282lcasccfdg0jo8fl61zuze',
                status: 'SUCCESS',
                detail: 'Quidem optio tempore adipisci et aut. Illum sit fuga aut ipsum necessitatibus itaque optio molestiae consequuntur. Dolorem quasi fugiat optio numquam impedit. Voluptatibus dolorem aliquid pariatur magni voluptas pariatur.',
                example: '4saq1d87kw9vzi11bvnofnprtiq6sq42vfz0cez8bipxnyy8bibsxw0ioqjvefv747ej6d55vdhgu9ix6pdo168c1xjn2qpsnp0wfjyjlepziualr0bi6bavp0oaj82ckdkk6bysl401hmc3favttll176oqieba',
                startTimeAt: '2020-07-29 08:26:58',
                direction: 'INBOUND',
                errorCategory: '5jlulkb86hn06v59o1a34xdhyve7rtfm1ty7rkgwclf8d2lhj226exuwas3uxwye4wc7stqbmfdwpn9gkvkavo87vy2rz18fbto5hmuq0dsf618pmxfn1rho9durduqbeg5kgm0egj73xnwocpkccn34uhpbxwoc',
                errorCode: 'anuf9s9om06djfwqsc4o3m9w6288miqqiqb6qjat2xl3tnky1o',
                errorLabel: 531497,
                node: 1931642926,
                protocol: '4bx1ap965njx3jynrz71',
                qualityOfService: 'ftf5f5358d1x8rh673cb',
                receiverParty: '1trvtwld9bjb05xnqexapwobhh1h8xxxi99yrfjfx477sjpiwoilovpzkzkbec61b4jx91z4x5sph6xuv4wr3wfjyyhj22qiijkjb0jh79qtha0hezti45ud2ihv1n3xvr7s2keg9cpyo3ikiwdvhyk6gn8hhiv7',
                receiverComponent: 'qgungfd8zer4bjx7wahx3jsbtl3gqhe0dds9ruspnzstzf96h947nlbr1tsb9f02sh8qbwkz9jprxb67xlweb3nnjv74dux5o9mdzq44wqojuul75ftwl2ljgomh1iqovd5o15f9i22gs9m06aj6pkvukr9a9gca',
                receiverInterface: 'vyl7uks9vfgnacj0o6k7bb52d50i8c4tlo18a0dpg9ty995bzab7ycl2nlkberzwc19yg78m6y5ku1nnlm4u8exc10ny2gju99o8a5k3xzyegyi7gf2tiqsp1l17i6pupsvsrkxvxfsf7ht94jmhqvh38ns7hphj',
                receiverInterfaceNamespace: 'e2dc8d6erxotentdbw138o4i3mubyfi9yi12p3xwf2wbp3n818wnn6x0h5s7vmc25l63et05crb908zslxl6v12z7strgeqhl4g3xujg16cq0b433wh5hfe3w755m70n0mi0dozgtd410iisv8mjuuaflgkjb5bn',
                retries: 7874592513,
                size: 9457131798,
                timesFailed: 2066464733,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'ivd7f8wtc4z5btwzq2eem3tzoh9quzhxufyu599n0ca7l975xs',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'asf5t4nw419x8hmde65j',
                scenario: 'hyvrzw09xo2q0opnlm8b5j765o9eqrap85687luxpqk4q12vbslc0zw053y3',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 17:32:53',
                executionMonitoringEndAt: '2020-07-29 18:52:40',
                flowHash: 'w8ji5psuu6714plcmkjwoll1m6d9myvf6xcqac23',
                flowParty: '7exjhzrt8f76glbi8z8hvuibi4zols8lvltipc6c9nrsg1ja89cnm9t6yzif3x1ocu001z8kwcvk9e4ucfrw47x320y6ridl40cv5ic3cgd1cemon43zov66odoc0n5qtfxyi32imeis41jlnlbkulwna4d6om6b',
                flowComponent: 'buzpnrc5nxnafuqtjak2t28a4qqrb81dj2yf9r8tiv8rrnh11myfx2mrqm6w2pghog289eij24p34r3rhcjyh3vkujbjfdojxc9hkewra1kc3um82dnl5014y73nmafll47nke9m3ahu9i8on0z5gtb81tmgpzb8',
                flowInterfaceName: '92df0qvhd9j160wrxx518e41sfrsg0umm9he7hue5mc02un7fc8ns2rga3q32c4uai6vbfqxy54w50vbkzmhlfpvshlimnt2edc9s3tpg09zfhmm5w3wh0okikzgygpmhj21okasnrusnm8hvd18v45mj2etvt0j',
                flowInterfaceNamespace: 'vrwih1dnkntpmiixvwjkrn0jalb1ft2138eba4jw2hr2syide5se3uo5bvfviwg1r5rozqw38d9cmlskdutxxebtzilo46yt22em35hvb33tni5hoeeiwlbvjmy8dm66wy5qugmk601u2mhnf7ibkknjp4pyqjpc',
                status: 'WAITING',
                detail: 'Exercitationem voluptates molestiae. Quia tempore quia unde hic. Quisquam explicabo beatae at voluptatem ad quia ut ut. Et qui laborum sed non aspernatur. Repellendus voluptatem vel autem deleniti non reprehenderit.',
                example: 'z52fxxl99wgzu5d6pp9o9so05sn24b7a578o6jx3evgsfjwz7z6yzrr857xxrojit6wgnsmjwvtef58mar0eoeefmxoyuuzjqf9aipxcinncu6ai7f5aw10pfhw7bb6lgpdq1r2zt50vc01c4k0jxxuqq9z7tky2',
                startTimeAt: '2020-07-29 19:00:56',
                direction: 'INBOUND',
                errorCategory: 'cbctxngjph2hx6a04vu44ybsoldhci2mz51lbmtd507zpr16npz2da2sixlxwkhv8ozkldv33mrjnld69rv1ma65ykoooltwt8zc2dm7mmusym5hkv4m1aw6q38wluduaoptf0w1awy2froag7jk216c2p8a3zrh',
                errorCode: 'jeki1d2zqbv7a7hw917hrukkhfy7c4i3osq7xd80mopqeewbh3',
                errorLabel: 372787,
                node: 5850823380,
                protocol: 'fdyvtb61pcqixpj2x214',
                qualityOfService: 'trl8etkv3eu6f5wvtuyo',
                receiverParty: 's61zkqfc2fqaa7re9sxoay192lrf7f9yf1yo9gaobj70qog6mc086vymy4y0ygvziahvkto4shmfh3kdd4zi4fg7w1uh5zgjfkz0kzmq0we6fcb2yj1hcy6kxsllajd1x9fier7o20q31m6v7c5xhuuduio7nv7y',
                receiverComponent: 'u4t4bqbjp17zqg5kt6dog138g2ue4ctf7mbwu03unq3puvunq918dylp8jfyc2aa6ji1e11km2vwps7uqvwog2ywb44gujdvqrq1ql6lkqe94f3xhi9is0yyscf4r4is6ug1op683vom2h0ph3hwsitwpn9ctv8e',
                receiverInterface: 'pw4ki88xedx70giu6omqc08497psxxpwkc4r2jr1wkv72s5jifglhp72pfqk5k75nyrfj31ek851fozvc47vfstx4iw67tz73joag0y9gwd8qagazm17vubjtk3anyugbgfc5kbn9dygx7fio1nde0vjsjpfiqi5',
                receiverInterfaceNamespace: 'crisv3h0g3hbf4ivnsglxp73n9q861zr0aif5ogt98hzqv3xzh2f0evtldfy27999x3u65vq7p12hvctim5v155irjbaarqp2l96sdbi91kmti967f8u1v0zcwsy1n6q8x0qjqrbkituyb74bh9uyvxjv1ah8j3r',
                retries: 7349026318,
                size: 7483626088,
                timesFailed: 1452488661,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'a1amhu6efzdm7r26fa3gmtn7mfn1ll2vw5ncnusxx886d6sa1c',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: '27jzv1ng31ykdxsnu7te',
                scenario: '4v1js80zl7fwcpyspns05qbexxvx0ic4x4wolthlozipmeps640sqma23om0',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 05:56:44',
                executionMonitoringEndAt: '2020-07-29 10:21:59',
                flowHash: 'xdltbubh3mrrxkjgs173fdbck7u4ha62prp279s3',
                flowParty: 'f0obhervvauvpyu2kq9oqucj4jbw89w9lasugslxcmpqtembmnw7gh79z0xvqkcy3uj6s7rvp6a74v3u0pkvojji15qg6q36fqe7lme8k6vp87jwp4pyzmidtv5z3r699yaqz3dk4oem922ni4s6puz2u0mqwgx7',
                flowComponent: '5eo0q6ek3ji09o7cawpn7d7nk9ri47qs2n6l39jfj492f0cr3mqe9otvlmsrtyoaci9lt6nkpdaylx38qowgno5yigndgjpjulmakotwhgdw6jl034rl85mu0e9o5687fnjnuqiw40r1awf4d0i89xxfw75yh4od',
                flowInterfaceName: 'p2rjjndzci7j70ooiee0cflq28knyv9zfyybr6fz2w9gr4blekpepd4exvm3wd047gzc3pyqe7w55l9l0sh51rilyq8dq221vtokgx51a58tlsu29p8o39q2dg9ybvjbi2ykbi8unq9rvyaibmme8xpone9sk5o1',
                flowInterfaceNamespace: 'w6po7iozy144yy51us6gyi9t4airv8h2eu5jqsumdlacj2aa0om51mz64s0nqmnsrzthhr1ycjr5zt1511hfmjhw69dfppu3fwwfpcyme2u5sto6735x32xntoos4573p627g032gfhtzfnhnolb3uytc1hp4qqy',
                status: 'WAITING',
                detail: 'Aut aut sint unde earum ipsum enim quas. Ducimus temporibus voluptatibus asperiores id accusantium est. Illum voluptatibus temporibus dolorum libero neque molestiae. Autem atque facere quo veniam. Distinctio non repellendus in omnis molestias. Itaque qui magni exercitationem debitis vitae explicabo.',
                example: 'scdtlaco2e08is9ut552pfew31fy3i1jpkcsc17yx8en4l7vrgt6mnpg9bont3ma4zr1nu6jta6zrxx8elil50ox5s8bwssd8qnim9vt6fxkw521l7pdod5f13wje1bavt7th7tqndfr31hd8jzutu9ns6r5z2r0',
                startTimeAt: '2020-07-29 03:16:52',
                direction: 'OUTBOUND',
                errorCategory: 'xwcylp15nbptxythpoem1r4g3ntj3nvjxri9spi534x943ows61dip9h3jk41a3v8na2xb6aq4gdc62c8tgtlumo5ft4izwgs38t4zzu39mich2egajuq7id9w56fne9x8mr0947spwvxgx2o6t1clp8ish8f6vd',
                errorCode: 'n6irug5dd1v6j38t05lrdy23rxangm4mewmib8846mnb63kr7m',
                errorLabel: 802488,
                node: 8698776985,
                protocol: 'zqxpy1o7mc54o0mjv131',
                qualityOfService: 'p9g9jdh8b7f5f3y5ik8m',
                receiverParty: 'x5weev74kd9ovbx4isefhuta8ef9b3kdo79v9616vfftncuyg0gleprb0pzl3ksbvky7c605j5n7dcrptumbebasaww3yhu59u35jqokwxscrjlycyfrkfx08og0096wwjgdjgmuny7uxa8nlkz6y8limwb9xibn',
                receiverComponent: 'b074zbfukwydtn435hgjhtm3lj8vejhndryf2yrhesijclaatupb7bupudwdhe0jewnqd3ke7lbjpmx24bur1hop99ae34n4fdlrun5t1tk4d1862l4rkoul9kppoippxszv8em504rrwnki1tfddqsn8eiq8dvr',
                receiverInterface: 'x04xq1b91d5y6bqdn8ssbihnusbroehwgl560bm7n4ekd4jvdqqvw3cctq2i9w033zqou1gwzt4g2grnzoft1d3kcjp0cb12wzayb7n9wj63f00fdon33lt7opp53jgs7kznogsht727qfsk98emhmy7q70m53lx',
                receiverInterfaceNamespace: 'kc6ataji7ndj78nwcmv4s6fv6w4pbxaevi14fnw31fm9497lgndfv0ru2s5hwaympb5dcb7a3trhyocwxb4om9bdnn541txdtr9s50rmswdlr1zo2rbq4fnq2ydap3rtwo6dzzx1scb59b1ozpzp07oscwqmga6z',
                retries: 4690351026,
                size: 4571243116,
                timesFailed: 4767861437,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '5q3z6eqmkzkh0sey3tcc0kpq0unfv0r0a4s6yz6pm2eksgx6lr',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'yq58ohoyqnkpafcjbjgv',
                scenario: 'jiyjlbw0wcba27bvgbcn70unebj1bf0m8mhydzqpyv0ymt2t2xc21jeicldt',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:37:41',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 23:54:15',
                flowHash: '8kr4vny2sob5cfttjbigqdbbsmnbwk7hp30mvqdz',
                flowParty: 'mtww0x5lcu4d0k416myd0m5hay3cwxlc8v55a9uw6q2egjdwf3xyxb539o6t7r97qbso5j75wpted4xtd7j8aeaqj5w4xgifjpfssl27wnaglfunj32foml4l54xz95oqf17qf7w61789bn36nexo9jptcj3tpqk',
                flowComponent: '26ljfm2o67dtpr82fmtgm5o7latwl16lv621yroh41pf4z71sbt080p81syk6wx5dtpc1bsev5yerddydh11yllyakwinxn5b73piqp139jleepjl7ld88rwu3h2avdw3xifj9sv4887wrewxtvg08esp72e4ktk',
                flowInterfaceName: 'g15ygpyh9cwlnfva30fcvtruu0x7gttdn3m1kgdn821ub4sijwrpd1l1a4ay85pgsnfe7c0zgzywn2ttphowmadohni3kkjaf9k4mgquymephuzkcmmzbcrpvaw2lpnmh162uz329kq4gegz6ove56mf88w8fv6d',
                flowInterfaceNamespace: 'wdq8qk8jpy1hptvfdlgyow3l3o2e5hoyj259ndvjbgt2vz4axkjpyf5svrb0y3i28ge7a89ujxvmfv8unixdbnyedwgckgnztuwu9tpf20h2djooa6oh8auczqnwv9ali9jbh8nkswk2jgwzses96u65f3n0v8o3',
                status: 'WAITING',
                detail: 'Omnis dolore et iste magni fugiat dolorum qui. Odio rerum deserunt qui qui et quam minus ex. In qui quo. Harum dolore est minima sunt. Aspernatur voluptatibus porro est sapiente repudiandae. Sequi doloremque qui sed accusantium qui vero sint hic.',
                example: 'lb7odmczkref6fk7nr7pxwiv8tiimtb6huneuk2khzu61cv3l4vdijdsvg3pzfjiarxhnyezcszbnftspdg8ma8hppt6e0iizwy7vv41sslw23d5yy2kko8icb37b22wxih0t7g6yiy19nej24krw31pmpai5a9h',
                startTimeAt: '2020-07-29 13:43:30',
                direction: 'OUTBOUND',
                errorCategory: 'przzaiabdd5f34l363aa0yo0r6ec002pp9b8yci3h1uw1aljbb3ibcsalvbkr7mh9cczt2mkjlc9ro1mw0qzp0rt1p69irp135ljostb1rpnfv3lchkqfzlwbirah2svw1ldmi072yzbc45vhkb92dtifv72nomt',
                errorCode: 'lqktc0xmywkcwkar6wzvivq0sszjqg7615xeiw6fiib8q2wb22',
                errorLabel: 572793,
                node: 3373503779,
                protocol: 'w9f52dp2x8641s4qmjvp',
                qualityOfService: '4tg71eurc168fq2gwbn2',
                receiverParty: 'ilh3uc8zb9b8a7v4pb6jmurly62cpkueovtogw888l1t966oq4eb2tbl6a762cjgculr76jjbca8kr661orep4407k1t9qsbn75bh4g9a23u79inb4o7fvbqvx632r45vmubfpt378cn6tf8ewwl13fix3v46usd',
                receiverComponent: 'qb6xiyksq8358trltpoz5mqz1zszcarl7bm3m00amp4a9du66b96xmgqhev314198q67bblp6932po270q6qfz4ghg52ol8ibnhqsye0czz9btgyl85ebyu1x1ft18ic5n2yu337rayvzuafw22t3xptf36cznja',
                receiverInterface: '16xla8wwqf2f9acos8479m1azu36omcq7yu2b9c2ne2lc7w4navbzzvjcf42e18zqt0a4m2kq5io037y9b15n56he5xhqb2g4kzr2p76ns19dqprruwharyjem5ocwh0m41dwvhsyi06pqzxx4ds01wkjm9yv0f3',
                receiverInterfaceNamespace: 'vu039pvhgwe5r3s6q3h7fuuupw3mogd7kz9axlecu17sbnxtx2r38sr403sr4rnb73www9no1q4x685mhsxtbsg9w4jt05j0lgg9qkr3skxnv6l4mny38mmfpsj7khdvie8d88dapgpo69opkjx0l4sed91d33pa',
                retries: 3088058942,
                size: 7476453039,
                timesFailed: 8809543900,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '2s7gtk0ezlyqc7u9amwb2tw9xk2kt2mpw29or0brjcbs7g515s',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'ne979dwc81rylhvggblc',
                scenario: '6jvnmcrjkpafqkwezuujf1lc0jvhwari0fgby14pwpj38cju5bpvyq51fxm3',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:08:09',
                
                executionMonitoringEndAt: '2020-07-29 11:32:39',
                flowHash: '0vbb7gm0dg12c9elovmdfzf5dl0ceea98cm4wxx3',
                flowParty: 'kd237lqr8qio3q1twmrfo5nqxqv5toz5emnauge226jag80ztedcf0s6b7e0d650sy4e1y9uoixfxhzbpyv29ctai10oj5tq72mw9dtvbtuyl8rpxmnjp6b0chevwsnbei01f4d65182s87rayypxiakpqkndnrv',
                flowComponent: 'gtrrhoxifrf7owts0vsorbxq5ehwf5ei8u24t2yqvxismvj4o4mmnv6dh4sjr2n59pe2uwactv41169yn5ap8homtntmgs8n74rkpmv3h9ljb9809pggykktw5t6xh8ucr4uk8oz0algr9gbsitkwljbg5ry60mg',
                flowInterfaceName: 'hh8a91q8rkq6j4zn193t3sm2wi450084xtnyur7c187247740odq3ll6e24vr1e4cxfljj1hfldnxdz73z1v8714o90nxsd28zdvyc2ne6233xhmf7rjfxaolfz70kp1xewfih7e28gm2saaxl4agwcntco2qjwq',
                flowInterfaceNamespace: 'hknzyrmhjtta8uggoz15osnqjdphf0hffmrdb47lr64e8k0blwr25c82cinxbj43cegukiv7xnnbyl3tf14025r4kied7gku3bjew8q5llig4laz555tq39k0j7qfeu25ta5lmpuwili3io4nmyofxuifpwtma0u',
                status: 'ERROR',
                detail: 'Non quas magni suscipit perferendis laboriosam aperiam aut nemo. Sequi velit recusandae cumque assumenda. Eum nostrum beatae non quia. Odio suscipit non. Deleniti et a ad sunt qui qui et.',
                example: 'mw9gugc78md2qr8hwuh0dm6w5aoi5iynl93jq9xe9n3xd6590e80q8zpm67f10hg2mf0vqiem6fsyh3z96ukusaf8dv5mmmprw2b6ac4wmrpifuxf2xvcfwv909wqgqh3eewppev540hru437r46qqtqjkeg7053',
                startTimeAt: '2020-07-29 02:01:13',
                direction: 'OUTBOUND',
                errorCategory: '2f1o6anzmwx2ev6qtxgky0b013ehc6n6j80p6axr8namad2fptpnuicuk9en17bvuemb2f1wxf251v15yapyx34bm4v6oorp5kkw5b84fp018t9xf9rfd1z7danpa4irz4fovg6h3s2pivlf3agrbe8e7qcg0gm2',
                errorCode: '9eil92dqksmeftsrgrv11p800sjnpj7d1v3pk0s3byla5sut6r',
                errorLabel: 168487,
                node: 1948488556,
                protocol: 'vjj2xvotofy2kmcghnch',
                qualityOfService: 'wna6vcvkooa6a44n8jn4',
                receiverParty: '1lubzousk0perxplpvuivq1c63z1jhbgkpoh7ehk3neb8dy3l1mdc9yimvaoxbc0leyynhov2clabajev8rct4wf0eb0ia167r7oic0blixa5az3lwubattify96w38gq2o5xyideryffzmuaunf2rs8012h54co',
                receiverComponent: '8uvorxqctcx9tr43h9p0a5bs0sriequ1tlrxl5tpa3z589sn7ml34anjyqs4ucn12zd2hbjec4qjed405zenxb44tcjx7ip8j3unoor2zs1ekee932pb0w6qqoqlz6txqv7e1uygk64erz659eoyt8mkuifsowss',
                receiverInterface: 'm0s13ohtk967w55lpks2p1x8q25mtafsadzxzywc89zzdscuxcs4mici7fp4h5sfpxryxwmi0gw4n1qpzz9t6qimcx0vnn1rbssj8yxzc20up55y5j0kvljm0uqp4jk3xweyxz8l2gbpijufbea6eegxtmhut8te',
                receiverInterfaceNamespace: '1ff90oiohhc7bi30jz0y3rbting29d1g64gklvfko0wfrjg8v7mzipl5p2giq5csn9ig2hld2l1dc990ojth0gh5ur5aaw31r14c7l9gena6tx7ebxzvf1walqx0rsrlsp5znjl7371jmr2q627cgsq3h73aaxbd',
                retries: 3818861502,
                size: 7301160190,
                timesFailed: 8059205239,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'biwifncwej39yvbjj6geeqknpcy0syji1inpk1mk210ed302jk',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'zgtu18pxd02abz6r1jm1',
                scenario: 'yot9rzatomld5i7kqf9y3xoaz4hyy71y9hjbkkxwrxo21fwcq174o76e43r7',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:35:18',
                executionMonitoringStartAt: '2020-07-29 06:32:30',
                executionMonitoringEndAt: null,
                flowHash: 'exbdngn7dcaokncubqfgiav4r1f6ni8324sne0ny',
                flowParty: '9dcvw1a9pesmls9dcv0ybewyd31lhvqcm5xak7wjl3gkmyvgargrcwlw0j0d8du4tedsgltb1mglznackkiqrzjboen6t58o09t8td950vmfx67kbi7lbn17l2zniefmng6rp2vai5nchewu6b0ysfjjjotl3vdt',
                flowComponent: 'mh6gwd1bit85s4jlk3cpu6b7qkculovm77r4yx95vjaa8avnkiw4rk0vp1385tsuoz4qhpay4oaknukueukipmo719cex31veubqy7x9rwuq1gyygj1nep6jrhk1uwe5gkhptv1knhu8ur2h8to7dcw46uji15u8',
                flowInterfaceName: 'dh3u2ck63cx4l5oilecq6hd86pdzb5ep68wvs1tr3s2qon1o7ng4goa01z0lcaetsb798z8p44xhysvt2azxd9paammdirtwr2tl10cr37vkb703xs395ryc10mmpgvknz42vcaaapo5pyqkv6kjh43d9mecx1m2',
                flowInterfaceNamespace: '6k2fv4j2367xkh198v4tyxdzs8sbkzdtdheheim1hyxwc0xpviuhnmyo3ezdvb2h47rj9d9j0g1iahcqzmj3mfq1obslbpef550bb101w5kf3yy8zspxsvod6aqi0dlyd6l9jucwa32blpzc4ic2g1qrjpmyeu0q',
                status: 'TO_BE_DELIVERED',
                detail: 'Praesentium explicabo autem incidunt nihil dicta earum inventore quisquam et. Modi necessitatibus fugit minima ad distinctio. Doloremque dolorem possimus accusamus minus animi. Sequi laboriosam suscipit minus omnis natus esse.',
                example: 'flmzo14r0sqsuhblx87usi8qc2nsiawm1cn57l8mdkjs9bwy0yqbi34x237t6n7kpz9j9e5yo9d7p4evcpheq74aeig7mdv4fod8tc566fw1vl1a4grtpbdj7rsfmz50mo6l6vb6iyur5p7hfh0p9f9j47hb01ai',
                startTimeAt: '2020-07-29 01:58:16',
                direction: 'OUTBOUND',
                errorCategory: '5159kk8jdezt4ih49aa79ys3o5r6rtvxf1cdnkn4fjb1tu1bsg2flzw44qd0t1klat5f9yxgcgdu9cou6lyxt3m7ixw1d4on8gejv0fdb3ba3arsv0e5r2xy2uggsxubhg4mjydgf9indumjsa6acsayqsr6pxsd',
                errorCode: 'umycd9tq5jcp1sazsv22hy1xnweiwtv11ggzu7kkphryt9cy68',
                errorLabel: 335843,
                node: 9971233798,
                protocol: '2yhp1xzc9z07n2ro54ge',
                qualityOfService: '4le034e8iy18rrl4q2wc',
                receiverParty: '0t8f9rijp19kf1ijpwkng0rvj96yvfq5qv1z872baww8gbemc4wo06ppxglefd0kgee9bh7t31seff3fpt5lqz4u5ez91iuzg5qa3flrblpk1fbm12pzylj3uif4fusmacmi7ocfha1dvh1n8qsly9p2vog3qk91',
                receiverComponent: 'jahmvuqqtfrqg7xpr7v8bpc23r8pxq7ve7e6s0op0k9mvd2t7c91idxl3wgak6vdd76n2wpmnskkptwaojh7um25hg7ty4a7li5iaveojny0wobub2s45pqlsya9u3vsclgzwwchbkd9b6nm7zpcp7h1qdk68zj4',
                receiverInterface: 'acqo8ft3s5ubrnpfdwnyls94jhzh918y9byzjon5sch8tc5rz85g6da5xpz03odjmmi5nppdkaj4pi6huyjju6m1mrlbom0o2qamk5w4g6itrjlwmwmlzbojg5cfk3g47fdqlz18y8b9hjl1aqy7i19xv3e5ujvq',
                receiverInterfaceNamespace: 'jq7d96w19uja4b9kz3q1nigwlxsrr795pt799f8lmy0lx9jskihs3bkl4vo70ym9fmwqk8cd84luhx7no5amzvgr6uyz99b2bx51vz8vo1ygdm0criuh0lni5h1pzm8ybq17gbnk3wbah6pgw5blb07yi92sq7a2',
                retries: 7638844970,
                size: 1688312033,
                timesFailed: 9925449956,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'g3wevf4c23m58w2rhkskqaiqjfbw9ntvu9f6xvx20rhrvqqvn6',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'rrrpmq4pywtoqn7rkz87',
                scenario: 'qyc6tp8nrmigwz2y21fi9yeaubullwkoywpjbqcyn7ddlt2pomv5x49kojwr',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 22:38:23',
                executionMonitoringStartAt: '2020-07-29 14:23:01',
                
                flowHash: 'c7gn3ptgyjxa96xc2jzopb60msh1rbonzcq6s6qh',
                flowParty: 'i270bdigasx2t04ridxlxzw7xbxhigqchb4og8fzitgi8ppt3opu291kvondgru3ogdqfg5w7mytvo4v1adrq5zwkufeks30wjzccjz9053jnby3faystswv027pp6xrw027z29vk5ww0ww7t0vwra2x91imh4ip',
                flowComponent: 'tfv4caaymc4kvahu8kswi3tkh33mmx9ivaxph9j461jpda48dhqaqh2clsae46610nwmn6ekcedc3abqyg8nzlikoubwxbrixuqtb21jmy4veqlcwh9hbotey37nzxbjh12jzm6he4ak5gwrus8dhz1sey91fslh',
                flowInterfaceName: 'ywopot0wtoi6d02i6kyno3xxrhxrzpfjupxtbjvzoncc6jj2dfx25ql127fim5blh8rz9qyi6sctlvmmerj53a5fr6g6o15oyvq3vufur17g404c9ogef6to1d28srssyaqwmqiik3c7ccvyby7h4gjrad7h1hwb',
                flowInterfaceNamespace: 'j22p8d6qcm1oacpjfgyl56n61dp893gf9sk5e5rs8v5oofime6b09dez87hhzljhm63niccpd2p7fyr2duzrxo5qfmo15h8yiu9ipybwymcc44ijc6s1dhk0g11sfo1kodlrm63m6ry70ow3z6uaxhcsjko9y3vd',
                status: 'HOLDING',
                detail: 'Et doloremque aliquam amet. Aspernatur tenetur sit velit totam voluptatem modi nulla. Fuga similique quasi facere cumque. Tenetur et magni vel ut aut quia. Labore itaque voluptas.',
                example: '61iuzkn88mmuxtfqmrbs3jm6sn4dcvyx3zd45mpbl93d3w9lpb9avm073hfb2eww5ugjpa14hjpuq2w4h58bctsj1b6k4op1fgkc7eeg3zvmr2avah83fyyv2heaadpq5pgujqzrhaa6ihk5y4iop7dk2zih1mti',
                startTimeAt: '2020-07-29 22:45:11',
                direction: 'INBOUND',
                errorCategory: '86sxjb1vf0pxoa30wtgl2wrr22ryx9jympk3iqudjgt3f9ugy1bn2vp3y6ct9huz5d8l560h4iyua8lvkqo40xhny711682xfnv2u83eu4ksjqikw9z9n466yoe6148oyl5e9uatzydrammefid4t1whkk6iijk6',
                errorCode: '97d1ri7njm48lxrgx1w3p2ztpod53zmrac8ymisqiuyx0fqn4y',
                errorLabel: 765437,
                node: 1377596949,
                protocol: 'k0fxpjbs55u8pu5xudak',
                qualityOfService: 't9h8haip4qasxupr3krw',
                receiverParty: '7vkay54fxwkwged2c8kqt5031o01mjtfq4lkl5hua3o2feit5963bjpbqvjj9v2v0bg188ij5ca7xu8wc6tgdi6tdspoptxiqpxsolbs9bpsbe1wd8btfawhmryifyefe6b2ldpc2s00vbwbgwyecwg667cpelxq',
                receiverComponent: 'bdxie5mn2u0jrwp4xt9t9ylr1ug5by40kx1kqvcbpoy4h7zed61x7bja7ibea46f3buga1fyiyfbx40vyc487lme1qlb5kax0w2ev3jk7a0901idue8w8f49e8f7i4v27owkawpaj5qpjo98f89d6p3xiavypvg9',
                receiverInterface: '4m947lucboqsbgfsvibwf0k9xj7snrp51g52aljq4klmgr3m9pk1f7vcw8nkpk8f0hbeig1z1tsb0fwq3mb3zcilhg0pbb2aqangogggyjdfb1zzktfewq0lhjvn9q58gukvcc6oze46njhe120lz6wo5ykauvxb',
                receiverInterfaceNamespace: 'k70cndio6f76bt4st56um4wx46d59btt3msc1hqe5ajvnmiy745vyf5str5xriwxz21ukh9er22y8yo6d65nrm3mx7sqngkqwd736jw87ae0c1nj5yujxl6rskt8fptg1cjuqhzmf9xlr8b49yrapp94oq9o68hi',
                retries: 7377746950,
                size: 3571666560,
                timesFailed: 3431980075,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'beux9o9lhddfmqook5d11yv5fdjdulkk0zs9wai51cp849hpvd',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'mmcdp3nlxotzqz457tyl',
                scenario: '1bffjve9f9x1ny18jiqki94k3jh8j3598ze66tuyx8z2e4cl2pacb9ff5t1g',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 18:50:55',
                executionMonitoringStartAt: '2020-07-29 19:37:54',
                executionMonitoringEndAt: '2020-07-30 00:29:13',
                flowHash: null,
                flowParty: 'p6jrrex6x0440hvxma6nf7shw01l691j2ws37fpgdl3ltif73pe5yiwzgp34owmd64q5k2djjkl9jtjo5fxu0ff9ecx2965invxsasfkv64umz7czk6x8h5ulhlr8p77nh9k0jnjacif7e475vyb9pzfxltazug0',
                flowComponent: 'xu99z8ae6svvss2omuyj07cw0nzeolte3cyknjpzx9fxpo9qeho8eu819kvvelx8y7khyl091ssfqkc4xrw0ut2bvg0wff4k5yro63ptmvyi4ftezzqwrtngg8emgjizix83li12af671y5kp9vw1fnj20kg4t4j',
                flowInterfaceName: '5ckp0p2naq1r6ovxouoama5ghkuszy9hyx84mwffbrem2nebaj363rvjx1bz651u0zk4vg1bpdcwtoer5zdcodf7zx2p3769zh103s7hlc2em3d4r9kwimlcw90xxjd9l0lv5utosbu90k7toaczv71fxvstszfv',
                flowInterfaceNamespace: 'ygysdhz6yobtbz3u7fpx9k246naey5bzb8pck1x3v1cru09e91te0eydhwrxvnvywal8wtx17kp67nq8l0l2ikfi6c3m1oa4hexboxubptldkhlx4qqdo13d95ihw66z0yuygunrmno5raruf61yn862mt7kvbfi',
                status: 'SUCCESS',
                detail: 'Non totam at saepe rerum natus iusto magni esse est. Inventore consectetur maxime pariatur iste. Eveniet iure tempore eaque est. Non est sunt sit fugit dolorum vitae. Asperiores natus et molestiae voluptas est et.',
                example: '51uwtzy1c4m6qaqg9fn1murjz9ypgxbybk4qqgjgioc8jly4neywvmsvhjjty7ogs6wwyehl8yolh49eqsdtthsreo1x7cpt76ga5cpvo7r7d7for6fhzy378i7g47f2ojz38kpediqsrxuj0gcsie6ft9f08vwp',
                startTimeAt: '2020-07-29 09:47:17',
                direction: 'INBOUND',
                errorCategory: 'k49glh3rkjnageus527jjnjuqhgrb961xhymuzxs5mdqiollr1iu3w6ahemwsn5em4cyirxy2m885dyppomqn3iuu1tjug76dwbqp3bcjlnw32e4y3coafw13wgmleuuikpsq8xza5o9dxcbqsvhg6e4u4yjy32z',
                errorCode: '32npilynyv79bimdme3ca918a0r6kax2jm9qjq9xxwx0rkbryg',
                errorLabel: 930880,
                node: 1956690764,
                protocol: '28jh9tyi5fh37sjr3o85',
                qualityOfService: 'tp0fcoh352buv220n2zu',
                receiverParty: 'f39ogldaz2bwwuape0vmgezmfks7xws6czr3fqsw48rdgcfoh7qfvaoyjuw4wdjwv0pcqoh14ue4cgd5pocex79twb90ialc63bdy4iiv7p7cognn4lau0l4ok9cblyrlz4ecseh7qlsfg6a5kfzb9kt4dcsh5al',
                receiverComponent: 'nzeqeqefcwakomx2o3t442l53n5qq4e3d0hb2a10t0ewg2pkbdod10impwg7qs0n75dnmxz3v34leiemfjuqt54w3fc8atunm6025t87wr55ku1qi361cmyuayipisz7hlwit7i86m9jj7jzmo99e9hswaj2ctjl',
                receiverInterface: '26f10a65tyuy6r1prh1myqqcfvuxeyjek5znyr392m0k975grvq6rxd5vu1bzbsjxgnzq1szcf2etab9pdoctpcch98ld23j75pplmxgtivdh4q8dpotvglcm4fflqqldb5g70z0eost6kq74msciekawfrox60x',
                receiverInterfaceNamespace: 'vdqypzzod2ohcnvap0vww711jjnmmyl9jthlfn5qnsgwr7ok1lo7qvdlzwwsxvtcnxoag4vu8pb1s5fubh7j68sdpn3woww6a1eju1uq3f2rtt0kjo9jp2x4v5pcdrpblxtjgrnr8k8im3056ks95w90fjcxr0xv',
                retries: 9794390495,
                size: 7474197403,
                timesFailed: 8802658998,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'v48fx24aeoh8oulxkiiguueoojtn8085n37k6rlx1dsn960caq',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'a1lckn2woh1reauxgeks',
                scenario: 'm9r5tkcvcpcaypekqstj9z6qm7sohj27azp2f2dj2mi3kza96b48hmc5v4ca',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:31:43',
                executionMonitoringStartAt: '2020-07-29 06:05:06',
                executionMonitoringEndAt: '2020-07-29 05:55:26',
                
                flowParty: 'vhd987f5xuki522zd67t764t8jrbwfx7ibi366a903w7txj7p2rzsam2lsmmotit83uoqdfyxy2d1p6ygeibnbdf5lefx9gd2h2pl82516j3g8urm1i1ovubcq9me90e7t5coqki1q1sfw20f1fjk8flakal6ejg',
                flowComponent: '1j8xcx86tjfbfap5e3kt1mz6xx41vzup0nxsxnm7hnn3sf9gqa0yr5j7kn0pibmno701n0makgcqufpv3ugc0l0k9u645g93pr7aed6vsfg2fjjw93tvg3kiry5llv7rimp00s0na193kftap3felnyqlkaegzqw',
                flowInterfaceName: '8a79i5kdvp5ghjnssqy856hxpr7hk1bbw4jxcts4xxmhw4tdpe4cxlrxlfvnqujarskt7iyucujt5gouo9bqtgkh9qkz5id7wpkm53v7twp2g03l4g2uaj7gmglqccddjte45riaj5fpe17r6j6jr7y4jzbwcgzh',
                flowInterfaceNamespace: '4ocsb91shb2jns1ollfia8v6rws3su40sn18clruugzb5y0zfi2f18ha9rtcn8sjzla86lbsb8xb1swmhzheodd73usxlhldrl2y446h7tc3dvlsjg7b0ufyffh6v8cibmgud1a4iimwump80y974r3wdc8pism6',
                status: 'ERROR',
                detail: 'Voluptatem perferendis cupiditate ea. Quia esse quis. Corporis ut placeat rem. Accusamus id earum corporis atque consequatur. Dolores quasi blanditiis et minima dolorum.',
                example: '7hxh2pvz9vtjrxekihj3opb4m9m71myl5ykqxab827wyfbmh6xh6ei09om14x0rd94irqug1bwl04jlrkyszfexl2kjavryd52awcgowdv7v97pz5qe5h95a13nj9e8pwhe0y9gvabqle6m8hv47zock9vv3fx48',
                startTimeAt: '2020-07-29 20:34:52',
                direction: 'INBOUND',
                errorCategory: 'z32mie245pktnb10ul1nydlkb1j547ty3x54ao8avn6iwed64n98tnwmbt8lyxjcvlc61ra63pk4b95gw3y5ippisxlgahlyhe256blop8j526ddro3u8ii6c2pabmx0ekj7kn8jgq9a320img2tw5ja4s0mn2gx',
                errorCode: 'vavfdztsdgfz8yh1qwgfz1cn3r1nvs6eobnavoy2oemt6lablz',
                errorLabel: 311821,
                node: 8534834054,
                protocol: '3v4adlsso0jjo4yjdfdf',
                qualityOfService: 'gcdpfpdmk2eagvg478cs',
                receiverParty: 'o6qxoa54b5dgn9apdy1zd1qwaj78oxoesca9qhnb62jgrplvmq37yy2yv477h2zd52qrccsoxnim849ssizqiooptfcm82xlgh8ozxg7ji293fof4kkimqxjxhf2hx0pmd5m8sehzvbvplir76h2jzyzoc20xex9',
                receiverComponent: 'jyrvjfepuxvs0lsqgsjz3cbn02v7qcgm6h9eooqsarlmx79z8avfzyrwalzj90lmg6ndex8h3mytqefln1cie2kchm1wsxk8bms597pyl92erhtf6jz9emq7zer8tx6u0gy76dup0vgtquikori3g9786zu6u7qp',
                receiverInterface: 'x6fhi3m11nwjta9e8j1h3x1385njx0xxviqb4wkyf29kroqcv1iykzwnmrnw0ygc6hkntqp0d4qq5ank4lgwj10lar4ppqpohvj4374tccxxn5w5tullozrc4he53yx99zw884ysh9zqqmpciwx5etycsk2gqw2s',
                receiverInterfaceNamespace: '1cdwnam32kja9ttpxztim7rmoa4g4gllacagkwo1ym2w0k2ssxau5i39fawg5wz1tmwyc2f9e1jgqooek2bu3ur60tcqp60ylpvnjaxkdyalnak6yian2an5lh0cmbudtkxouhtr5ybmkhisxugvvxfwtst3q6i5',
                retries: 5609587990,
                size: 4653502557,
                timesFailed: 6750210107,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'e1rr42l0n4hcp3uyexgkhmvpitd1tw11xfay7o1jo5icydh5zx',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'kfg7v82pav1mmgi9ny5a',
                scenario: 'zpr1az7wcq0j0edoakpb4piyvhbinv6d5fwcmfjb4zokfezan3x513l5e49t',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:41:08',
                executionMonitoringStartAt: '2020-07-29 09:10:42',
                executionMonitoringEndAt: '2020-07-29 17:49:25',
                flowHash: '83n6r2cmdbp2fqaowfucbxkm2v9jk7xlvxja7ddp',
                flowParty: 'ha00n8x3vq9gnwniw2xrkzd2dqa04l9h2e3g7358gzlfn18ar9t4daxhksr9lgi7d2cdtro8obp1d5uzhg0nvawqntyyovhyfa1nd4zge1v7gt6y0wc6783qjbkzwx19zjhe2vxo9ln24m7n4m327y7xahdjjvmt',
                flowComponent: null,
                flowInterfaceName: '6ycy0t0chbtvpzjcco3wl2clgthavpt2bwcywjz2raumxg6fbtubcatdjtd7fhpj93un9dk70dzxn926j3xt4fwyrvcf3hk97735n8fgakq6hlngl3l9n1mbk776mhdwjkr5gu6mxu2dbpr0r49zk04xx699xy04',
                flowInterfaceNamespace: '9c8fn5d54pdmb9e8ayss8kluobmh3fd3be4stbu7alk43vrijm0h8qcktqxyb08em2d6syrt3fg8en4v4ofj48pszi1gps8k5ytk6e21o8vf3u5801svvw7852lwoehrhwtlftsvx5kn3c7ctzwmkremlmb3h7gz',
                status: 'WAITING',
                detail: 'Voluptatem et velit vitae tempore et omnis. Consequatur et nihil sit. Facilis dignissimos laborum eligendi amet ea beatae provident sed autem. Veniam enim qui deserunt ipsa. Consequuntur cumque nihil velit ea.',
                example: 'yg146rqcnvn62f57gotw3vis5x81nqzq6foxfeg4kx2cgv44mn74dfos4nxttq5r9lnstjszqmzxqtobq818qe1p2wkao9dqmqq3q5k5qc4bme3w8u3lk809zseezm4ivnsbo9ftcsehiqq46wnypdxrb1teyxh6',
                startTimeAt: '2020-07-29 13:03:19',
                direction: 'INBOUND',
                errorCategory: '7znf5chqyxk1nfsp55kz29eazjawyxpg8s1op5rrcke1n6m6rvpmbn6w4ufmce9x505r0ooyirs6dwsax9zbjo9v3yfzq3agelot7sk9ty6rb6rif1ykj38n8sbezyy2vd66924c3ce3ldrr962v2cbj7hnz84mi',
                errorCode: 't4jiacgy5d06bsviaz2oze6lcyoej4ha4qa4hf3999ytmn8alc',
                errorLabel: 507836,
                node: 7338941232,
                protocol: 'f6xbwdyqxykv7l8xbaeb',
                qualityOfService: 'xan7pv3hv7wkjy61gdjd',
                receiverParty: '1da2wzxlgm3bty1jafbepnizcm5m6nzef8yk6uwwqlfnb6bzryvoj2blyawew0yei192vs86fgvf1912awysqres0095qp8jarabcb9l6f2aeiyo3b1iqhs1xo0z958f5xdl0frwv89prmnr1d8h3qla8i8v9x5u',
                receiverComponent: 'qc7szzjqwce3k7utv8sr649kfr6ct9ae411odh555qr6vscksph65a84zd3hd2k4mbazaas4ew1fsi99ptepdoqs8uyeemacbf8dpd9s596id05qeu9r27kp4h4tvtasb9sncrvjuuuf0ztkv60zo3i883aj001k',
                receiverInterface: 'mpxbnoxxns4touvp6w36u0iw7wa9l2cc7f18p8v4rlx4iqjgte0i4vnwt2vwpdkdb3bi2r2ntp12euz5ij24jayxzc13xdnn4zmkevbscvnansgjt9eyy5v817vr4tgy4i2ks5wmjjhx0io3dx9xxv08lo9zem6p',
                receiverInterfaceNamespace: '1wdcwkireql1alyruteglchphz1szmwduxi5st7ovn6oqwkdegkkozzv5j1y98rqgi8j28qf10t0vhxojvmwmsugxzn7e19648kuvjvl46byki6inn0hg8q6je7q0kqutcc7slnswya3yw69g8zt66exuvofmbhm',
                retries: 8287351671,
                size: 9363622940,
                timesFailed: 7361495528,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'xl5q1vllt9394ghsoxywn3sg3zkw8qyoa6e9klzn38u7c6ewdz',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: '0djtc41bujz7n2qunsmz',
                scenario: '8fbn4msxa14f06yrih5p0xxnovam80jiv2dwwgvwgm6lv574ozq1lb0g4m4h',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 00:23:42',
                executionMonitoringStartAt: '2020-07-29 05:00:21',
                executionMonitoringEndAt: '2020-07-29 01:21:06',
                flowHash: 't0c4i107z2v405gkzlfjhinaw645pvchuvirnfg4',
                flowParty: 'ylhwnr7zcol2iv83k1gch3w7qo4rbn9gw6lbb0mv0rt05cu70u5rf9env7ybpu40plhs6xjx2ts5wd8q4cm2rjoslthu9w0ns6y0vsywlmuikjqzevms0d9kn70zst6570zoijm6gefnh6fp6lq9srs48ial4ny7',
                
                flowInterfaceName: 'plvz3t1h2a1qyoem1gnrgurx9bono8idueeyw73fkorg4awniqulyue494wpj0n31uhtgfnpxuucu9w243b6qz7y0wbms1dryghopcy6v8m8p6b99xaxkaxo2gr67fr9pejy04yw13411ykdnmye1qqx6r8t45ir',
                flowInterfaceNamespace: '0qrfjs559mz3co6jb9zj2t73d4jq82nbsm0jkq3dhg7ppsb594ofp2ghnj7spclyn9f24g9ii6oun24m69vjuum8bnrki9rhit36r8x2m1vfgpsclfxiukwpymrfh2n3bgpuccl8qbs37bleuhjb1a1zm5nxe3mm',
                status: 'DELIVERING',
                detail: 'Sit quas excepturi quia. Et libero aut temporibus quia et voluptas eos aut eum. Quod dignissimos vitae qui. Perferendis aliquam aut porro vero qui nihil. Assumenda quidem voluptatem dolor ipsum omnis reprehenderit nostrum. Corporis labore tenetur doloribus cupiditate qui.',
                example: 'sbzh7dlf9sict8aocclvzl1yy8wgs7btie4vqqsqb6zbttw7fbv7md84mfn6lodk09rb9vmpvt8qjbn0osb0h67h8fer2vnoxdcfaz1ilh5sy351jogxd6dvch7xl905ltz9b77rr8okraej7mc5ncxazz94e8hj',
                startTimeAt: '2020-07-29 07:33:07',
                direction: 'OUTBOUND',
                errorCategory: 'oq9sto6yzaqx5xlvsl5lrwql7sz4khuh2igb29vd6xxjp0eamzvb6gj0mpqynsjy7a16bdy1cjouwj3tzrr9zr8jbahw0zzupn51uo5r71h0rl58uh3omqi8xbifijz37u0wpyja58az0bvkqi6zuq5eoyexsmxx',
                errorCode: 'phzzph48zcph6qqe8njpiqttm1og1rrc9qx1wkpu0mtv1ptyo3',
                errorLabel: 258350,
                node: 2286045958,
                protocol: '6ji9lg5biz1legru4v0j',
                qualityOfService: 'kfvnroutk1u4lh8dgqis',
                receiverParty: 's1yjib2ln19vwmvb0mm8dbnfvqslbx1i6lt86sbz09k7h5liu33xm8mogwsmb7qw71ufuhdxrbn1bh1nafp3atjcmham1kpyp2sos46lydebf00yun1dhsy446yzwplrtipkdzow27bnmlnxczcb7dpun30ip3u1',
                receiverComponent: '0zeg5v4gthz94rlv0817phqxfk4ipn0dvsn2dnyxig343s7w5mihzifk3lf39efqea2krnkvd1skk3g9m8miroz7ef12le18n8tiutcuh22a08chsjm4sxzfsnln23oqviurr28htzxj36d2c8ae6kw5udk53va6',
                receiverInterface: 'hrrvu6vnwgbxcffbh7cy1rnwnwkv1hym8qafrtck7kp0p3hv7jzc2pio48g9dk8zyt5atbib52lwf42flbg2o1rjm192s91mstvq3147rartd369otlkpdf6acr4r9u931gpshekazzhzomb2ho5ohlzmp1vvt5p',
                receiverInterfaceNamespace: 'a9ym0gdm1voutyu5o4ksxm3mfkdvi6w9cctos1ayoc8nw62oygoy806bgmvweaat1hn8w1lacjtds7n9q2hx571ejqb4yzy43p5ifg0x8acq2v6nk3bvg6vnfcw9orrfz0benz1qqt87c8tvwzqwbey31pi2ost4',
                retries: 1264578520,
                size: 9130185115,
                timesFailed: 8140087788,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'aneo3cyq1qcsdl3xn4qbfs2052rs936g74lwht4fyqqob0uqez',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'f0mjdk8ayxt8q29xx1sw',
                scenario: '8owjfytciilxitv05feazvp0ol6g6di7a8lhxddyrtx8u3mx772rw9it9th4',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:33:34',
                executionMonitoringStartAt: '2020-07-29 02:02:43',
                executionMonitoringEndAt: '2020-07-29 13:44:37',
                flowHash: 'xlgafwjxwft9en4blaifyizl9e1oukpo3wjfmg53',
                flowParty: 'p4qkf0y9ec6wkqbln25jz35wb7a8w7o3ka4ydit1udd1259imtz2y0ecx3kvctpahnavb59x0vyt9vcw4rhvhss4ht30ea9l6emtnuyhw9sjwi9mywj7m5iisifep83xxbhlntccixne5td4pqrokdmck9gs1xt4',
                flowComponent: 'sci7k4lvvvb09f5iq9b6x9ptycizch5rza28e91cc62nj0mt1ny2zdqe6pnzceftf9p043l23089kuhyzvywnwuaqfh2jb548t47c6ybmzkvfgq3em38fdihsw0mvdw4mf2onno0jko4yw198sodttq7in2vj9qm',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'besmfsij03gbtl5phr523yt1kyb0hyxo4wlaa5nlygn2dhr3mtzpnbtbyndfuikyajdpsgne6h7m0unrfbs785r8ej35mbm9hs2ogg0tctg1rar3q5q8lgctirho8e1upsgo3cwa74wrk4u27bhjex7k2alkjtiz',
                status: 'DELIVERING',
                detail: 'Et quod rerum ea numquam minus tempora. Quos iusto et ullam voluptas dicta enim voluptas. Corporis dicta sed vel molestiae soluta neque. Incidunt qui consequatur natus adipisci. Iste occaecati laboriosam quo aut eligendi deleniti. Deserunt molestiae error tempore at et ullam qui et aliquam.',
                example: 'ccvljoxvuw9c04dgcwt4koqsq4wq87rbf0ckcrxpp90opcqmqn07bsf4r24bn0szfaq59avedj62t9xx097vrlw6hyre9hcs8em86v73m74kcflzmfzp5tstwpk2435ar6fklq327gz5kqevt2qocy7xe749u3t7',
                startTimeAt: '2020-07-29 04:30:01',
                direction: 'INBOUND',
                errorCategory: '8yjo3ccobo18lsn0bmqq6kod4wxackqxtuvaiwfz9djqgpvzq3asexhji7fcbu1kg3i4wilc5250ae2095d2jra1s6pagruwscy0ilglnubyqv10jf37tv6n23iyps5txo3ujslfn8rc5zufvdqt7enpeyjk1jc8',
                errorCode: '887qrqvtluvssbk3cel2n7whngkog3qvy22vkd8ggxbfp8q10r',
                errorLabel: 546647,
                node: 7117628442,
                protocol: 'husonztfdm87q1rz12cy',
                qualityOfService: '1fm9f3s37ka2enlb557g',
                receiverParty: 'r6pdgipdxcpn4amdcuiia2r0ahb84kq9kpuaiimdxdjieisbge7quot57l81gtx8jy38j034cqoz2uikkvgojhlbibwum15vfvirjx9yz6s90wwoelve8qodssp4e96v20pdc78581x7ifw7v6g2dnr0rmrft5y0',
                receiverComponent: '82c1y9tnyzegd98hjke5fcgrkng1q1shhl2cm365mcyf64tp4uknlbdxd9kckttjenfn0jpt9pesh2eyxu57d8yqvsf53694usaqbvipsgjpj2x4ah37qxb91wbah2tstj110w83jyxvrq9jfnng758v1dnsydu3',
                receiverInterface: 'th6k1a3b57vwfrvu6wxjtl5vp2tyijlgxl073wu23af1jf2kp2h28mlbrrtdz9dotoaog6poyj7z8n5gsyqv7e9w0zc9pesjic0dcdk5edxoqaf13ibji3vbgk9ty63mavxw47l7l7m0ria1dicqeuqeov3p7l74',
                receiverInterfaceNamespace: '0nqmvct28hz4qciqjr59j1f9jfozk96tdt0xcq3pm0bsmt6t1yl2bzvl4prs4g2ubckknukad7rc26y5d2svx0x28m10gpl9992i19tg64wq0jprmpn0repu88wj8epo0knyy18yl3chocrsstyqzszz343dmhjx',
                retries: 6727237710,
                size: 1090028942,
                timesFailed: 8257301423,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'asds2g9qfxglvm5i2v30dzghn6qj28318zk69t0oqmaqxkmb3k',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'otawtxco6cqfprupjpzc',
                scenario: 'xv5d0o36mcspr2lkqw86oatvivhpcbs8vr47jibg59qgpxes56cu3xmegktq',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 22:36:07',
                executionMonitoringStartAt: '2020-07-29 19:17:09',
                executionMonitoringEndAt: '2020-07-29 13:46:19',
                flowHash: 'rijkd1ydbarlmxb95ftbs1sa9ipj6u5lwafzajz4',
                flowParty: 'g6v3q04d1gvrwpe1i0oeq8511re7cwvfxcscv8wjvus1kvjo85096ifbuebmh6wacg6rvbyhddid90boqd6f8ltshwi1n2me8rlycsg0kpk3k4pw8w7qz65g3wwhj2ndep7qdl2n2sy41siosqfumj30wdi40g86',
                flowComponent: 'l9389y1sn2cf7oouxzjkrl6uljxz9vo3uptldfxze07bd8810aa4bb7o2uoqqfmnvzu2yz4l34vgnoturw0lcear97jhov5bm5btlu72ilemo93q7m51417axfjogvw4hebbrkdustoaye57s3thnlegjcg0ysm2',
                
                flowInterfaceNamespace: 'c37wfdw7ejik0jfrovquh9eir6by34heiqiwox7m56089h0llm80r1sulg0lagzifw08qijew5w5p6otbtk59mmfgbiz9jz0j9zbmsixr56xejdh3b3vse1438rojmewh2hzw6cnionkdp5z475rq8iwstndhxqv',
                status: 'HOLDING',
                detail: 'In voluptatem sed iure rerum rerum nobis architecto ducimus fugiat. In unde amet deleniti explicabo. Dolorem fugiat iusto ea ipsum non. Et consequatur culpa voluptas sed. Et similique delectus cupiditate et cupiditate distinctio voluptatem.',
                example: 'om2hjf09vjfw0ik7mfrsxhffmmdqqxwo1rqksqv0yzbym35i4r815eszk99eg2tlttga8i30qbz4dags1wplqus97s27g82i7e4j56rak5bpre2zwbeckdw6o2w8fppqq4ci18dggheqzix21uf66bt9e7bggury',
                startTimeAt: '2020-07-29 04:27:46',
                direction: 'INBOUND',
                errorCategory: 'gpafxk24tdeyclhk1iquwt0i5ccy2ptj46jxjf3he8ia27xklp2bi5dtc2ociwzsxyp08z3ts91rd2t4urxfzacu8ng52yf09i0rwnh5pt19gbaybkngtmi554v3old4sg9xiv3uni2mhq7qtsw2fcb878s5mg56',
                errorCode: '55y865g2ty3i95kznpb2vibkml2svk8sydjxrmktkiufr4u71y',
                errorLabel: 609925,
                node: 7316501664,
                protocol: 's57q8kw4zbtdr0q0r3n2',
                qualityOfService: '6rz3nagtwnj3h700tjhd',
                receiverParty: 'r71fzpera9syots8dqqx91oqvx33ynoqo7krtw4slzabnwomcbcj74vaxf6eylk508t8ppwuxoctwq13xtkj50xvyne79n7b18nw652vdpwo5z8mjr8bxvk29bhsqlkal9sqkcfqcq8irvszn7e1vf0aa38s5x2w',
                receiverComponent: 'zp2wtkx2u0qgc6mz181fbmejy9apmfhphbqp02p0a3czqtxe5nu9y4yjxojp1h9d3hizv9lo5rro6xsm8xzy2qaubiror7xmoobj26x8h6ey938s7nqfh79q0inw266qt9qmyeo9coxpthdus51w6igh7cjbf8nj',
                receiverInterface: 'mcwflohvsg21qss2cvh1i7dq71isx14nolhu9mz16gphr876y0hcyd268a3gznh9n08u5cv1cscoizc7sr374sq1o80bynavpzd5goj3d4mw0w4ps4gxrt8jpfzyepx6vcmfuiaqgv7o55xrkql1vjnxbfg4e3h4',
                receiverInterfaceNamespace: 'pdqdqd1uzi166zb4qnm4hclhj7sjt2a5mf2l76zqwb0oedh5u7s1q21mbmfv1w9rmfw93ktriqqrbt5896x6a7vcitn0glhgvwrx3ze556ap4xs1ddwnua69n8hocix54fqsdphxl6w9vvrmclr8y0tfzh0gtbh8',
                retries: 6844558675,
                size: 6743034056,
                timesFailed: 8417840907,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'ohi39boyg1qucjl4sap5pycs0tnvr3wxiq7u2x8h2jbjk301im',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'zvx97w4q3cgt10j4fgz1',
                scenario: 'pf33ow71i3pnxzsd3mffzh61nyoh72cwalz7oyif4dlzppducqqrdow9ibo6',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:17:43',
                executionMonitoringStartAt: '2020-07-29 17:58:28',
                executionMonitoringEndAt: '2020-07-29 14:15:58',
                flowHash: 'gibo0nfls4fuclkxkbwflsl42txvl08qf6qqhl7o',
                flowParty: 'j2u9vuab26zcuascftteorqokcty3yfs2dfis1es1q54b0srube25xk1dfd0cvn3hadtvf1qqwb5guvndyjbn04hhw9wghu5c1ul4amlaewyp6fp5bli2b4z6xrc58jq9tb0dwjt5ltqekjnppzphhxiur8atm3b',
                flowComponent: '94a6bpzpmw2le13wz62wt9f05sxid5frlpq9hwp3tn2ztiuql798vbax8r8arjs1yuyyt7njyb48a1due1mh5y4ajuty724cynobsiumouqbgyaiv4ykb6flqr281mk63pu5m975atyzjl4tybbepzbaxl2iixo4',
                flowInterfaceName: 'g5dvwtzysk7xvxr899jal1swjzocl82phyxq6sqyzqp4fys977z09nvabooslzwxxz51h0o3w9c56ihs4n7wa8fiqqtbxjdrf7zj1v59froma31xndnabo7f0fx9smtrblgqmhcvsdonfg0evcorn6cz57wpo31o',
                flowInterfaceNamespace: null,
                status: 'HOLDING',
                detail: 'Illo distinctio et perspiciatis culpa. Enim rerum ab atque quidem unde tempore distinctio omnis praesentium. Qui ut in doloribus optio alias. Consequatur quas explicabo cupiditate nisi. Vel est error.',
                example: 'ndxwe3q9g31q6fxfcvxsjarr33q5uhrxvex341cb6hbxpgufsry7i98y2ffxcaplq9cxx5s2cevv4qjzcng9t3rwns6req7j895snbbyx7a8rxulbzkxjpb8nwb8i7fz49s0eivv59aktc5grd0ci7y81b65hilh',
                startTimeAt: '2020-07-29 19:42:49',
                direction: 'OUTBOUND',
                errorCategory: 'ryh9xo0otrhre7yq419u55efsc29g5itban5q4tnm3s1u9qb5krtsy49g7plnyztw8qathq4ybg50p8cjnng8yxz65now97at1q8gjkjvqbi79sw3ym8cb2po6hwikobgn33mel5ia6uxoih7fch1ambp6dw288d',
                errorCode: 'x7nj04slhl22bm5z6qa2k3ja96zleqw68ii980v13tgesbirys',
                errorLabel: 131865,
                node: 9096276283,
                protocol: 'mrlc72y76ktt7ccopi65',
                qualityOfService: 'j768ve883ham12v3s1su',
                receiverParty: 'qyf41j3dtkbks9m48tuc4wxh93zcy6ig3flbxx70pbx5f78r6c5pmyl6vte9kzdecgdmahypmdjkaeztd272gh2p2u6h8m8en40ygpgnoluwraetdyi5zb0mrwmy6xnt26q64z9873y65bbx3n5f7u2d76hl8ki2',
                receiverComponent: 'xxj12tvlbmkdn5ufwifd1k9ytfgypo2s8gi66x9ewmskfg4sjd1tsyqqsyq0kf4yhcxnlsqa3l6eslc337c5x7wsu64nyi4biy99ea0xu8lw880j2w1h7k44lzf3p9539ucwkn1ckjxv1ejlijqg27fpyko8urfb',
                receiverInterface: 't1l4a3mips42888px7b2yy15yo0boeukhgdbplpksecks4w76820ikknfiuq1fsjs022slp9tyzyvsfljga9br41m844t8ifa2t1ol1hm02y3kfi89g9249gge79rywyxut0xvwpn3wejh0b53ectj39gd3v9mti',
                receiverInterfaceNamespace: '132x60cna6r3ngbq5p08i30tt1h45cxxumsacf6twzyyimzocga81bmqf3hl7ck5ji6nxv04yhxz59uz6bc23cij77533lvdzsx7pqo62iy44qlm7kolpuzftt5b3ny1idltfbzeuu1hjaiahzv5mp32bmxi6op1',
                retries: 3765169345,
                size: 1955521621,
                timesFailed: 6747490010,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'bn7qzhrr80yyrkob1yn5bwkt1izz4rr0cjwm3cm23kjsspd4ze',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: '1fs0amzp8ym5gnastww3',
                scenario: 'hn5uzbptivcjla1nx35etn32j5vecmvkfab0hv9lofsymtbna968i4xh1zhb',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:25:09',
                executionMonitoringStartAt: '2020-07-29 15:41:41',
                executionMonitoringEndAt: '2020-07-30 00:41:22',
                flowHash: 'uzs883cag7zuedop9unfpfagsdocheu0d3wf5o53',
                flowParty: 'blxlslyoj8769vm28avvii9j60q27hchp4a8sgj4xr7cnhms6ydws2zp9a9av2kpkev9z3hryi3vlcaduwa7mx2fvz3hmzp55oj2g6j4bmoickv51gwtv0e15vnozlqlphnwpw0obg464ra7r00slcmj9hyiaqgq',
                flowComponent: 'ayn7fknw7n9w01j6mp37l729evpk8qham7xesjh794n8033zfwxmrgocyynmre94zxo7vwsuoetuzsq2lvdl46t3um83miy4qujnjg8f69sstu7xdfvonw8xmgytqu369vsoi4qx713pc9alcgzng0rpm1voi9nb',
                flowInterfaceName: 'hw50pdcrbgbsn66cduxjn8mqj6f9wmqpc746kz2iofjn4oz49khpmwcbxi6lbe9wgbgtfh5s2tf3ztl4n2o0w9lt2om6dbveed9f8te293iux8ljlmc31rgv8vvn3rrg0xiz25g6wcb6v1uu77k1tltjm4ythtvr',
                
                status: 'CANCELLED',
                detail: 'Voluptas possimus fuga qui. Impedit et veniam exercitationem eius sunt vel enim quibusdam assumenda. Veniam quia et perferendis sit. Qui error similique cum consequatur. Asperiores excepturi culpa debitis dignissimos id laboriosam. Qui est suscipit officiis vitae aut exercitationem.',
                example: 'bu9iyp1deibf8ow7z9csymjdv0ivgpyqdkneqdt69azfrk9jzt9z4ask3el1e0fftjvy39zpn3s0m70vqeu3gh8ilh2h63x63lcfh1a8kzp2je2qfdzudv55xb6urtcjztn7s6hod8s32vsoam0s1t5wnwmx9ati',
                startTimeAt: '2020-07-29 07:32:49',
                direction: 'OUTBOUND',
                errorCategory: 'ov0wa30c6rw946z3l5huti8qo1iibkby8231a46vtfrl97en4n4v50vtsptcjzjn2ewvct5ofheqvo9abflun6fgwucbm89wvbhslicnmz3lwyd6xhaf8322enx8syojctaoj8fp5s3kjowbt3sq81f4udgl1ttq',
                errorCode: 'ur6eajkdty9e4ku856qm0rbsrvwzvm7itmnjvvfj9twheidwe2',
                errorLabel: 983221,
                node: 2146026314,
                protocol: '2e4emtaygndl38jshajf',
                qualityOfService: '31bsvfz8cwrmtf9d24hl',
                receiverParty: 'urkx7akm7zusuqv7m7ymxu47ltfmqxjwk4w81f22r5bb00254j7ej411t643d1jirawmb23hhoilqds3f675x7ustl03pvu7qen0agwgab9o9lz9v1yp4legx6g5henbvjf44qxcw0swi89chd1qmn08yipdemfh',
                receiverComponent: 'mzmqjypneuya0k7gwp972kayzy1qixeukpm080c35h3w4cntnmmlqf27qnprdtsdof6zvxywsksajoxvsacopp9hootjjyr41ggh3xpxzv1ijae9wuu8r9pxchffu5tiugpalsj6b0bxzpv25fdquamcd8sedlv1',
                receiverInterface: '8tsmud1kugecfpax7gqif9z4kjfveofffrru25m0gff7psq4pu85sfx2uvanq2lfj7rzc68uan73q1c8f6f2hr1fm88qa0ewxvow3iui9nhvya2rxn0fbwt01o9anu8bhfmcfd3tnut51zj9ptm1ci5m91i05f2t',
                receiverInterfaceNamespace: '1qysdfcv337gx2awvyl2hkdrbo5qarry0coyo5v3ofusvwlu2v43rkv8pzsmude3a2qtxzw0bsfc87azx6uygk5w7195pzfcnqsggpmve9at6etfjx37wuymomizu2o1ack08hib4uf9v1whimqvehw7sfftpvuc',
                retries: 3435285518,
                size: 4672689852,
                timesFailed: 8631328771,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 's9somi6bscs78gwas8cntauznowt9nc1j7pkjcas5vgxo4me28',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'gvqvbrvlkxauipc422n4',
                scenario: 'yknb3p84ng94dmt1tfozxzyph6i8nuzpyaeq9he2ofa9a9h6sds2jln9n72h',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:01:48',
                executionMonitoringStartAt: '2020-07-29 23:24:21',
                executionMonitoringEndAt: '2020-07-29 13:27:43',
                flowHash: 'sxnab5220loejmevu09cwb97ycy40jak7mzs5k8v',
                flowParty: 'n7z9ov0c6v2obos3dua74kc44avq4h7q09jpyx030nqw5pmjjh6fsx64nlrz9822o64ddj3ogrnq5hm08hdehkk946nk4ulc4hwq4pld6fpwb439ncxvvban7vyjsvkvnaynzj8y6l8o6jbn8yjjeoh0onlh8iko',
                flowComponent: 'fz1972sjf7w9hnli9s3zqweumftilz8b7wp2thb3g0tj7zpsjrbqjs535sp6otidy0vt91czzipn7pidqp7rz18vjcmkyuv66qb4tlvknwodtxsq4l0jvijrcqvf35k2yf5299ynetlilr61y517vuggrp9veev9',
                flowInterfaceName: 'w4bfrhv0og9g5z3raj6umzjhfdgo8g0539b31lvp9o4ywlfgpxniqtf4tn1z3rsnqoedll4kt9emdpdrvdr51ol2nk3u7j7zmrznr7uzz59946ylvpkpdgjkxe0043tf8gb9nnhcfampjf27lzkxgdombj1dgymp',
                flowInterfaceNamespace: 'aah2spq7h5c1egmoni9z426ia3slsrrq2agw6etoqi9vr0m7au9xnbortp3k40sgycxdqdqb656bdvno8lv2urhq7l86dzxopxcd7b34thkwzekp1c2k9v6jfq9hzx6jbmgv77cezvbs641islbdnucj6waqeo8x',
                status: null,
                detail: 'Et laudantium adipisci aliquam aut odit sapiente. Error consequatur pariatur illo voluptas reiciendis. Distinctio ut at sapiente soluta quam non delectus unde. Illo sit nihil facilis molestias sit. Explicabo repellendus ut sed consequatur voluptates aperiam molestias. Fugiat voluptas earum delectus debitis dolor.',
                example: 'gi8f8vqd5g4lr49d639zalrje10h2xe0fspjwlgkgqvk6vpi5uqv8z3vx4sop4ib0wldw9aug8vw6pjejeibnrdbj3rii92hvajry82sbck6tj6ca6jsuce65uan9nu2fnlwq8yezf7b6y6leubk588r5wdyvrc9',
                startTimeAt: '2020-07-29 17:48:04',
                direction: 'OUTBOUND',
                errorCategory: 'pxir1i8830ldf36tven4twurpgi7sezss55ce8jp3k2zbq0ykt3bix0del6ayw497njgpwqtqd7i9af22hpxf0dl3ah7ugzp5z5c7itfvm7ba8g9gr7p0fsxqjhvyp4swbuzfoeilnmb7aao2zae1dsylo12dh4k',
                errorCode: 'iw74tn1a3g3p2xpv42bs7k1pmqo47wqbuxsgh3pkkm7e9elzj8',
                errorLabel: 227987,
                node: 4186434348,
                protocol: '3ihwv7jzs4tafqrpev51',
                qualityOfService: 'c2kfbikxdarwwfkly18v',
                receiverParty: '1bwe4b3ec5ib3r08323thzebawqno82dxm4oj8h9ta0ot1edkv7jm8zbscbuitg92iilhwn39vj07zcj5n9vk435rv1n87xafsup5zkyfw4d84y4uq0k662k65a68wx02r0a9a1vormd5hvggrhdkm47822210ob',
                receiverComponent: 'be9xeyr3jl8vefgnx88qb9hhcsuvypj9gidqvg5sqsd5121a35ymesspcmc2441f7tw8tvb8hyipdngy8uw0fkt0zkr7lcr2eh4ps9zd21mz7ekts6ufhrfq7s8rjx2hmutbtf855iutrogk79ydl4037o5img8o',
                receiverInterface: '6xh26jqscwmqurx7f77tqbzlbvb8ftuic9hsqqnjfm0u8qycuz8mesogu984ulyrfpkl57kjj9hdktbj5dij35jd4ty7ic8z95e3hsuapr0359xqhpczfwd2rl6ojv4lyhjuh5ccht91r49z4wp5jsi9ukaprt1x',
                receiverInterfaceNamespace: '25nwcfjp3bewwlfoi7z23uznyuitko0qnyg8ewom1tuh5ep54my4bu2nwbh0otmodwrxc92kbhl4qcnz4omtaaf8qoyd187c1slhplxe2koav80wx6ibwhlreljyd4ldrr4qjxg1zmaknv3r3q6e1nhrp9og0k4v',
                retries: 2253380570,
                size: 1691173523,
                timesFailed: 2344995949,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'i5i1vx93op48fn553vmwl6zgjvqzt9fp1aaaf2ikwjkvyajjng',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'qoz761efwe8zwsu8mss2',
                scenario: 'vyk7mfc5z9lh9ffbez4qb6uz7uazk0wvc9sjz76c102p56706sfulgzi882g',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:44:57',
                executionMonitoringStartAt: '2020-07-29 14:13:05',
                executionMonitoringEndAt: '2020-07-29 04:32:10',
                flowHash: 'uh51vvsrlhgbqgfu7vh8d9xw9dhp5hz6px8n3ih5',
                flowParty: 'z1xxn24yvkahx8mdn05z32v56v0lmwm495gpgbsn2jmbpw944q15mcnihs26cxfazszzdn39cws99wka5i2ydsxgcfgr6j3gkn38ok4vbx4hnu531sipm7s7qyv8tjg910xgov1dc0cv3136pq12y98seqmemy5e',
                flowComponent: '2w4u1eg64kczmhhp1gx8t0hhe072qr6xlygbh861yzfj8cx4r7coc4eqgz81a0qh20k3djycz7twxa6qo3arwxck5szce5vlj9t0qni5ih3xjg2sdr5ywh94pqx04sfmjl4hb59paw4xcec0jgv21hij22nthn08',
                flowInterfaceName: '162yj7ji25g690wju4aicwk16hi56aljvx8tu0e4gzv3h07inegipudewuprvqfqy7yg3n3o86ltgixexpxhvh2itvn9f59vciuuteedpt57ps1f4sfh09kqrg9434oqeuv4nc1ii7a3txb43fr0m6ux3wyumexj',
                flowInterfaceNamespace: 'z38rtm4ucbn1kx7d2j2xl16ik5o31emmg98j754q6zat6uvxws0r64m7yropb021fycfg1d41pbk9fiwf2dpkhudqvf9ca9kwvw1h38qlpxz6rhc99y5y3ktl5qubqjnkau4ou3ejfdikknqttnuffbe3pdty9r2',
                
                detail: 'Voluptate est et voluptate enim tenetur laborum. Nesciunt ipsam et dignissimos et beatae quam omnis accusantium. Ipsum esse ratione temporibus autem et voluptatum corrupti dignissimos nihil. Quae rerum excepturi dolores ut sit quam sed facere.',
                example: 'snpc3gps35bep5c7sugaq9eclmndk2qtjbqv22sc6glehqyru8adrgubus0s9lq5oj18w9w19our5q0n7evyic9n866agsbn3xzxz6a0lw330zhc0ukv9rc0g64awmczq18tgw99aen93yuqhump1i58fcfy7vqf',
                startTimeAt: '2020-07-29 10:19:10',
                direction: 'OUTBOUND',
                errorCategory: '3xcxct62iutvbjupm1jar0a26183aklx83m3dx3pb2n8ab01l0ieupgl78jbesmluerbe8jds88escg3wuio7wz9jpgq34o98y9717b2pjrz51k1h1uizlp4hmbnin02fcvhbjgnimdye4qx4f58gjqevmlwt5s5',
                errorCode: 'td27gma656b5939vrbgj6456yftsioc1lussac5phw7jh5jqrf',
                errorLabel: 424134,
                node: 8222655667,
                protocol: 'xdqyfc8jab5tukym3q7d',
                qualityOfService: 'dp2gjs2rk2l1gajyq9u4',
                receiverParty: 'm2binngiln1yjksei4qpscf2djhkjwiedujdwbvv9jlyjlf76uchpg04q1egqstugbc38jl5nbfcyly6f3vm3zg2wu2udtojoo0rlofa7i27d3orsvo4dx5eucr8k37vaia0z0nx4swihblsog8mx4x61nk3d394',
                receiverComponent: 'ziy86tjr9vbyu4v2z35gesk48z1houq6wv4xw741lqjmsids4nby3xoymchznmfpp0twrno1qf3kd0l4xriyan0lmljizdjkv3anoggiwv4vd0l51s9zpmclsrn3b4li9bgwacj2p8jkzg0py4h0kvkey187c839',
                receiverInterface: '3uejkdnp3obui8qdudq0mo9a48hydbx1xc2p1wpu9d6pv7lxhednblwviq9l6u358mm5667rvo5xt70ee2h49y879as2m88a3ymziwdrpzi0sbqy241i8y9uzmvpntpq8yj5k164b1k6ouzz2ewd5mkh8wafwo6a',
                receiverInterfaceNamespace: 'crfkvuiw8yy1qviz4ago0y16a9y5862dnznxb05ql0hku1pe3uh24acw6ncm36i8bmom2jo0zu7rtci3uhuwlhvgwniqeys32cd0f1j87qvi2bi5a5zy1bn2gdplj6o4xqzqt5gwwmixxkbmxi68clrd17mv65rt',
                retries: 6664635148,
                size: 5778245399,
                timesFailed: 2884354910,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'wbbyrq45bwhpbeepn1nih69ziy7lyf9se4d8r62om2glcvbgbi',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'u0tg8k0i0sx926pql8jc',
                scenario: 'zza7bmf0muiprpexejgd01q9yfj0bh3mgbt6o9l04ihc907ol1c8h0ri61pi',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:12:54',
                executionMonitoringStartAt: '2020-07-29 17:30:24',
                executionMonitoringEndAt: '2020-07-29 18:19:54',
                flowHash: 'xcoifnp62s9ku2chaeatir6all0tmzhr6mnynujy',
                flowParty: 'm567ctsoag8e7bckdmsc1m4nnfcaaoe4qvqh42rw47pvrpcwkoweickq1vtbwz4u08vs8mlhdzph8txn0njhbf6l8pot66adzuywhyb4fmfgj3a6apmi0laye91324rs658jnwmog6rxr19f1wlnhrs1hp6vr8ue',
                flowComponent: 'rwr8zbrfgq9yhue1y6ld95xvup12bz8i4vmqjyh29m7k5b2wydfokbpm3h97yr8mwev4uuv5tdyq0crle88epm2ww79ue8hbcs1btxzdt3xtpjh2djznveedqeleelpo3bi0lc1glf4i0g6fxk3fkb1zpim2r8re',
                flowInterfaceName: 'noddr8nz6861hdmto60oezp5adsqbwxjid36lz1frow2xogihgllp8k7yvd0rmd41p0xpygm4mwk7hvuwgtdeipkfaskx2dfvmcztjtfebgswbf2uqhbwjbucbjgvve8ewap7qla47veyudbt92r5p0suf5kr8q3',
                flowInterfaceNamespace: '4n1ojqwwqlf6wmr5rninmiisashfaoqf45p49eux2ym1rkqhvltypdhi35yd85xabugwb0p6r3lfhyxid182fyh57m9n0zd3rfw1qpldbl7lo6ixrnay4n5fhsy5k2i0yf2uwq6x0omb4hsbxo86aoja5keln7d0',
                status: 'WAITING',
                detail: 'Doloremque soluta est nesciunt explicabo tempora enim sed distinctio. Accusantium alias repellat et aut accusantium. Voluptatum voluptatem eos. Consequatur consequuntur veritatis non commodi et. Accusamus dolorem mollitia et excepturi officiis est distinctio et aut.',
                example: '9pmcttkwu2hf1id5e9b00mb4yagazjk3nzv02tcughplnzt1qul5uuptthw2gmbac7ielrg19f6s1ddpsye066belxgrpqvdp9hk5sf6afnnfhh2i4z0volr4qase7ib0mmut1v0www16knqunv3qatx2ofazuzi',
                startTimeAt: '2020-07-29 10:39:06',
                direction: null,
                errorCategory: 'kmmzlcsavur2byuge6nsniiese0vao1injxoqvirzi36ftxmx427sblrvjvz9kpfo1uibmm35n27fbws2kd8lui5yewc5mncwyz0vofuy282sfsw94qo9go8nolijthq9y3yenf4f9yk7bed1ix7klye3w00yk19',
                errorCode: 'wdp7g0o9g7j7zvkwruzfx8zg3vgdtmwnn30ts3isd5jcujk8bo',
                errorLabel: 550545,
                node: 3194867196,
                protocol: '842rhajdr6f6osvsi4ay',
                qualityOfService: 'hqvhoyhu186qbnl2wsco',
                receiverParty: '5al3pj1q3m30a2jyrxu2pguodo17iccylsc7tsajrevwesmgqcj2v2btviffvoqykbev2t0ndz622gnlrqmhgsla5kfre7uzfz5cn194zk91ajgubvtrk1bjx405w3fufeobbov0ltmr0equs4cf6dpjabx8h2wi',
                receiverComponent: 'v1zmsj9jgr26eylg1r55i9jdoxn45890g9hiblafmzatiwyj67wide38o8amiqruuuu1d4bi0mqdjhemv0nb1o3snat2r9ougp0xly8d5tvgfx1oiowfcw42degcee2xtymulovcwcvhzikn2xgntlgdru95g3vw',
                receiverInterface: 'unaqn8lw6z3uuwocyopj6e9wcu9c4yix90ljdvrw2zp7j7bzgiv3alihjoh8cuqxzeny5z38u66cqtvaxe76xwgeg71oiwtf84xcr237qzcrvkqyy1csn83s1jbkqa68cif9lfavgneum7lmlyc3lyrp0709sbsf',
                receiverInterfaceNamespace: 'v7q80kdyjz2dqos7t9ou5b4bjodl1kz226tkppiw5cfc2b8bu0pvktu6yswi9mpgmzvtf9qgi4ia3m204girj2lvml3ej275eed0s1m9lat948ea9ffnkwg65v22bzgjxtuifsu8yzqmdnwsl9us34q6f46limcc',
                retries: 5938174458,
                size: 3811691036,
                timesFailed: 1708812186,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'zbd6xsglbfb37mjcfrailzt2sruhfjl9d080vktj4tzf41s6xh',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'ylltj3im7ppc308r2tyc',
                scenario: '07lfhkfdgcjiztpc5hobw5twr2hyvkphegceiw5pz6tqr25a20zedz2opar0',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 23:13:12',
                executionMonitoringStartAt: '2020-07-29 14:33:29',
                executionMonitoringEndAt: '2020-07-29 08:18:52',
                flowHash: 'qcptkkajy2zawptg6eyaurzftt76qd0n2gs5p0z4',
                flowParty: '0eiseogygdfzr0xygznez784hrrdnkvmhmfuaubkzqg6ooj7b0od7pj55jxqflr8ybwold9cb69lbdfhyu9t4ehlviebxucm2e0gle6zbxzwdv80hy6goewe5tqvqxkd0p2y2npkvegbtp6mwvz31qhsdun1jfhw',
                flowComponent: 'wwq07ld273nrp4hb3cbclooetndw15auips18h309vlqd4smgma8oxx1xtn5uch1wt23stsafe9nm24bifddmoj5h2mrervq4pcnr4chol0wiwzctzt0xa9fzp6o9esb05giwn20n8japl7rwaa4mf863gsb9sbn',
                flowInterfaceName: 'yq3fbao5sw9xijy351mnfuirqlb8fsxvclalptzwd0c94y12jl4i40hdb0bvhiqwdg4artrunhtbuverkjt4mjputqoxzyg7xse74bf6tx49s3343wsqg1xx8jtcoqdpkb1gn5k0auhgkmr5zwhnwa414lij4hds',
                flowInterfaceNamespace: 'vybczw7a3h1k2abrazwis2s7nu8c5n61mzq2yuyq9r5gjezu2e28madom03elu4lui3rq9gukiu4zm9m11bi65fixpt9f3yg7evmt9axtgyjpdmiqjzfpklocvmqp8q3l7hsjlnjg93wtwuhwxs67f2khvkkzy05',
                status: 'TO_BE_DELIVERED',
                detail: 'Eos voluptatem modi. Exercitationem numquam in debitis similique minus. Cupiditate minus error qui ea laborum voluptatem dignissimos. Repudiandae corrupti non fugit atque explicabo. Dolor odio occaecati. Mollitia aut in sint qui deleniti deleniti quae dolor.',
                example: 'g5rns1ibu0bdvrga6bf6rk8bs2c4hc9lj9scp7pj7v26rorypbl6wom0y4o4ay0bye1kxt8sgkhigl71ufhtlaqufwubf3pjaxvu9o0vfxbfzq4mlnq9gqzsc0v1vdobbln2kw42nb4c6a3fz70xdxys1jhxl3hv',
                startTimeAt: '2020-07-29 14:32:04',
                
                errorCategory: 'ytf2toi2lf5rols0pnd5estk9h0r22t5dgca0ckn4mka5gw0fsjuod38dwtghjye2ukwgue7261kyroby737x2a6xn41xxtt3m2hbg0l0bsybisrma7gucnsznb0xbamhrf1i9f4rzk2kczltd3d4fit4c9nx7l5',
                errorCode: '8q3hdp3kalgb3sre2ttp0b17drittbt0ihjx5suh9fia8i34li',
                errorLabel: 627488,
                node: 9685486198,
                protocol: 'wmn36vqpk4emowd3unv9',
                qualityOfService: 'vwd43gwufaafelv4vwx0',
                receiverParty: '1yq7f3gwvlltuq3jx53dm884j09939xr0kdwxuwblno50ehxcqcbo9zqhycvyszzpftqe15ge2qh34cpgih66z4ni9uyz4folxbkylckje3ult85gcommdnh1e22jxe8kyryy61i9ermd5c3chgkjg2okc285ddp',
                receiverComponent: 'rmgkny62rla4jcwxhmsp9zkmli8o664xr0q4hdj1lgr4efg1cahe7kqfj5vgn0y660xmwuhd22ljo8eydjurygt3n30dvsj44if8bius14cfdjq4k77fy7jvk8ozrtvuumjjwgp9skiotyepxdpbxwtqn1c4xy34',
                receiverInterface: 'ijbe83syusiunbj22fxebbebujx3fc2u9f6tx062nl4v6ocwfmrmmkqacr6mlfkq4ghvw0oa0zw1unojxxbrk9li4w2ix7amxh9mzh7b5z25pdwk4ftgq30xz0ocm4rwllm6mtwmajgi85qf4bwbojpmnvzc06wr',
                receiverInterfaceNamespace: 'wvm578lkeati2ky2phc6dutj3kx2mqzifmmntb7gmuw5li21v47htcgfuyst7buv29cqjg08ndtv3mfyeq0kp7b2jduj3c6bj7k330o1myl0u9r4cnwbj2prze89nzl7uyfwpq1np3galg0giqhvb4aydwugpsui',
                retries: 5862956437,
                size: 4491565711,
                timesFailed: 4514973269,
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
                id: 'trrdtbobkw3pj2ckh7xqmug6tvwccr0qazm37',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '8ixibjq2wchu2bpbok1o1i48kykqg5qdeupyb3yyfvprnexftd',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'wpiefziu0fsvwfji4hzr',
                scenario: 't6xpnd4i8behkpxe83jfok0mrfbx8kew7t11hlbgdyob476c40zqtz6nofu1',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:22:34',
                executionMonitoringStartAt: '2020-07-30 00:08:41',
                executionMonitoringEndAt: '2020-07-29 16:53:08',
                flowHash: 'nee4xonqg307jefvoute580r89kd8sjyfog7cpbp',
                flowParty: 'iuiq4p728d84oy554caxxm2v6cpd8s055501fn771v131m14fupmk54yrsd5issyf1qeypxn5lh0jk5lr7q8rsj5hi26g0yuvi2z6zal5njkyi208q218rcep7p8baqidk1vnin2e9kp405ucx59ke0dyr0cuxg1',
                flowComponent: 'g7h4pkq78694ejfp6adyh0erusbbv9m13k5lqs2n5lbc9th7rksiu8nieeg5xdpj9vetw6rtnwdcg7inndcjwvif367v5eddsjgwfygano3dulxdhw8ldsbbmypbmih730cqngh1wljverffwsvtbwkexka8d8dg',
                flowInterfaceName: 'm8hxrywf564c6binihjp6wu64ueyp1g17rnt8jsugo9dyg9qx3koijubtexw2r7vc0kyfdy0el5f6rqosxotvpvldwqp3e2yvsdsl27ztxzydpoox58636l5b5o7f6ckni1dz26weatp21q2k0b6gvxjkp1u9z83',
                flowInterfaceNamespace: 'l8rocnib8btt97503ufgdgmev37zhybvdyab7m57i4qpuucxeeiwve4gb4ke9sk25rcxzdlttkbzjhh5vvv52dm691m82t1pf3ntmqxmbissi31tk7deeh0mzo46ys9csabfte0s1ufv7u4xhywzosh85yv12nyf',
                status: 'HOLDING',
                detail: 'Exercitationem qui sapiente facilis asperiores aperiam. Nobis quis ut numquam est explicabo iure. Cum blanditiis magnam ut iusto amet aut consequatur ad. Sint sint rem. Id deleniti quisquam tempore quos quis quia aut.',
                example: 't9qoy4xkpn7co30ee4donvyuvsnjhdgpfydms6yc39c9ytqig8g50brswlvq8wv4drnig5x1w0ofqskng4cbpzb1dvqhoywcvv24m5yfmcbo0cc877s8r8142e1lacig60tqmffipkat1a2vrt3iiz2l230j3u10',
                startTimeAt: '2020-07-29 11:50:38',
                direction: 'OUTBOUND',
                errorCategory: 'ntb9k6soijmldk3wclijq89d6cey1ykk7bfrdo9emmammhisi16ecwg4pv83p3h865ms9irpifpguaw9mg78i5lupad2da4zctyvzjv64oraw350zegi133bm8n983r4q5j84ixm8y3bpdydzz3qrxfchkjkfcyh',
                errorCode: 'q8lvd1nwzerw59p784lgxy2l03a7lmvjvbk1jttxyn8c88p76o',
                errorLabel: 758258,
                node: 7936644115,
                protocol: 'odi647tk9oud5t88f2l1',
                qualityOfService: 'motzh4932sp76vhf5jo4',
                receiverParty: 'ro3fooeku2cdiymuuj1v97hbh0ktmyuc40fppio8wv9izj8k8s5lcj6np7xs79cpcnlu24ss2xc431vx0l2xon2h0ynsjosx23h8n28j33ug2p7tirpkkxn431ioftx0itlns2zwhz6ir689k33zmstkharwhlep',
                receiverComponent: 'w0c0ffjb5jmmz7vbxq02xkxhdlkl7mecbc7ylfet1nymcxt91196jjgeudrb90lc70jd46z1k6bowgilya7y73owpjnyii5nlbfzel9d21hpnqca8r7zwo21ty94zec1g528069tnamflmn0ze984u38hhjhd69f',
                receiverInterface: 'fzo8ltc4u9p3w1of8evbqc41xb8w98mui7h75rde4eib2q3r2h2y8utzfxion7s0qvp5w7b8151baenmr4dfpjg5v3ycp6j6mcgmp7s9cygw44lheqqfh0xjgqdmfzzqmr85xrsmo8z0cpoupy0sd89tgz5qfq2x',
                receiverInterfaceNamespace: 'ygqyedqcnm9ql03sxm39a69debwekfzawmqthao0cmkiq2t6jnfvesph83i2tpctl3a7ye3wfahbwaoh33elhzcsbn0gjwr94jpjbuurmey6or0fy5kql985ahfl7czljtz2vsuebb4fel7476rgmvw3eqjk6f1z',
                retries: 2248801505,
                size: 4992567458,
                timesFailed: 6122655257,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'vpm4sl9drk37oe9k11aqkrvo8kqmysft2w69h',
                tenantCode: 'wlfp9xyv0oh0hp6xgpc2cipcvm6f210wdn1hkzyos2nymdcnbz',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'usi1ouwmbcag1qlerl0p',
                scenario: 'w02ev8g5ea5vcuqjewudx9hkghtmhrwhfzeu6ahuablv7yz2b4iwwyozhgw2',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 00:43:29',
                executionMonitoringStartAt: '2020-07-29 09:41:43',
                executionMonitoringEndAt: '2020-07-29 12:43:11',
                flowHash: 'uphyyi4lgoy0tjcl8yj9yhw9txo8h5r0uufhgifu',
                flowParty: '2gzr75rbepremrro4lmjotqyzglfjc5ju5yoyubovrg2gpv1ny3c8yf59zz3780fv93synj8p7j7b25npxw3cc9aydznrj3k49wvmcsvyugz735byhckpk8nt7mumtlbwanwpa1fcxl2c4gfuh12bqwbgjrnu75s',
                flowComponent: 'cu3tu2scyymy63sso14129h8j72rtrmbb71s3bljz3m34y6q2hjbueh6enot22c7fbee2gf1592l3u5nx7cq6kb59jejfn8lkrr70l9nl46mky70yv90cenjawq3wejwrbfugyvtnbm35l4oq6itwnhobgbye2qs',
                flowInterfaceName: 'tq9erxpmjba52gu4rjy290bzkhprl0ug858e22md2szp4blu473k3lmh7ncqgt6jcb8tui7ppqazofha0y0bascgx7tqpr2xzjeieti4f4dq0su3ta3mj1xqwrpxy6eq0lhn8ss1m9xjchpe60hs0h9ss07v0lqb',
                flowInterfaceNamespace: 'h3nlzd9zhkg4dmov5jjtk5104jtyg5ithkve5c9ku3al43qdck3wt5vjl4lkv6rvphiohpyl5bnx3k911mbizppsx9z07fqlpagh35ytfen6mddqbwpb8qjuimjddvt40lw5jkj8logzyx7rnyio5snbutzs2tqj',
                status: 'TO_BE_DELIVERED',
                detail: 'Repellendus qui ipsum rem consequatur. Quibusdam saepe hic qui quibusdam voluptates modi ut cum. Quae animi et quia. Natus hic quis architecto illum et quidem suscipit libero vel.',
                example: 'l399639cu9h6f4l809g4z2qoop5sa7b0jlam0l4f1wnw2g6kgn3tlw18b760pu8fwkndtwprrjndccwhkourapz6q25hniea3xxuplh0iu05a719gv5lu9n0medlp22xjnc7tqplydn6s5qbjwu5kp93uj2lbf7d',
                startTimeAt: '2020-07-29 01:32:47',
                direction: 'INBOUND',
                errorCategory: 'qt1krotkdbj358at5i5ztqu0t2hharzyswep1vfrtyxi4x9ucnb1jf3ha1o46nryok2wmsjy36r461uvvvtyipjlp1k0wto6xgiisk7u4xxlsls9dirj78gxs9gag6h1vt4my5wc6256g62plhw1e80am943utv7',
                errorCode: 'k5jioc5nd6zu1qqkgygnipmxi9t3xuvm2m392w68085423wwai',
                errorLabel: 454525,
                node: 9771120544,
                protocol: 'hfo03ntheqskp8jgc5a2',
                qualityOfService: 'syic592wh5rdoipdfk9j',
                receiverParty: 'zp8wkys785zda3di93i6olzrkc0iies6aw6nhpw3tjbc5k4pg8ock14y8c2h0oru3s6v79smgn025zdsuucbed34394k5qc34n52t3zoyu4aq2dpxsb6dw4fhkqszxu8zsk3r5l5xoyqcq3r4snoya6o9yn2rpy7',
                receiverComponent: 'y0tnkuec65uf6chrkcs3axtd7zuiyoo3n370f84sbzy0qssin75iu7oj5bm6t1url8yhzlu2l489k82xgoiyh7r9r5cdrpeitk6pjnqm18byjw12ph5sfin9setrah7fvg6n5g8lc5mnrpveew7p9f5ljutqgud6',
                receiverInterface: 'hvsfmckzclsqs2vgrnh23o6vj6sndew32pzrypb3cjg1rk1w87xysy4tc11viqlns5f7smo7ui0mbykpzqxlktuiewp7nb2obykhfpcsgudiwc3iydi4vqbmmknje50bj862xvsjut95f1gxt8qw766yechphl3p',
                receiverInterfaceNamespace: 'nz82zl2ihnmzsyvk5vw25atl2gp0pt290crkmq0vfxe633qqvazv8hlmf07l4t68ezyn6lmxek5a4jh6pz2j6tgb25eejhi0htqmwpspu6ld32xwtgnu2pzl45ipj2ca3t9tgzjorv9ug86rvdq8d1ybdnhgobse',
                retries: 3532388151,
                size: 7577317281,
                timesFailed: 3051841387,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '7mmhq3x8bl6a13c09ocqjbtlky23utuczgsc0qw94fbgcp8vu7',
                systemId: 'upohl3vqfchdf6gdipx902o5l7u68o6rwsm1v',
                systemName: 'iz51x82u1s6lh2n75v6o',
                scenario: 'pxss2pqxgwkvgz0gag22bzrxo1j27qcmk5zrnszzbk4idqq6lb8mbve3xv9b',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:44:23',
                executionMonitoringStartAt: '2020-07-29 15:18:57',
                executionMonitoringEndAt: '2020-07-29 01:58:47',
                flowHash: 'n94y7rlil9coiy2ays4oi5tfi84ps8jkq9ya6ki8',
                flowParty: 'hjo9bklsxvm28rt4kw22r2abjojj36viwnsipv2c6ndj6gm02b165v5wtmpxaelhxcfo2kk4zsj69ydtys18hiz3qkzdl288f7fn9aeezlrw2avp5vjowd7hrmj0klzmpkkjb37d74avvx2jgh3p0dqkpfwoj1y9',
                flowComponent: 'bb4h66avtkeu4hy4v3nfa8mvcgfyg850yjsqpqaxz2ilcl3vxuddav7w9dbx6v0rio6hd10eo51tvfrow2rn0xu4kqddbddo0tdxb7oweeak67slnirc2kte5vwv2rerx540s08tlu0q7igzp1sstu4azxx4aszg',
                flowInterfaceName: 'q940u7s4mqqjtdv6te5k8yybgobvynkdllt82cufais89pgmam29flqqilo99k56mkaohizdit8u7n58f6tptvw0n7nogfx8sfbdmrtalwm5ood0q3kfwf4debnekiozj0ncee4h7c40b3lg8rlsciu9tg8yklr9',
                flowInterfaceNamespace: 'jbj0c1zet8pc2m22yacpceyoqfwff6t178nmvy6m9h8u8av9agoebbg7aubl0farzgw6xtdp0knwiwmbp4rvpaxg8yqfqnh90n75f0g7d9nmhr4nno9gk9pl98ywne2y68ilm0f916c7pgf672z3jyjigau7xhxy',
                status: 'HOLDING',
                detail: 'Natus sed et voluptas sed temporibus et ad quam. Autem omnis repellendus vitae est aut qui. Beatae provident qui numquam repudiandae aut voluptatum ut rerum. Voluptatum atque culpa maxime et qui vel consectetur.',
                example: 'mlmc8lphm67j854e5r9g6jrxak8mf7ul6v7xlh4k2f9pdozoq46vq8ypj7d1xwh85przzai0l0ociznl5ci2cc2pujbihsci5icdn9l9oste0x6rv54iwvshl2fwcz8isdr8mhrjt2bnttyacycx8uw734k8sfp8',
                startTimeAt: '2020-07-30 00:15:54',
                direction: 'OUTBOUND',
                errorCategory: '4z10ce3utz7t9oehcrfkcqmu3y30gnwqiua5doh8ul2c7isivhq05jra8b9kge3wnfb1q0mld7881l3bf7kba3psw5wsa64mxmmgrktthcs1l6kt7izdyt0z519p6hbf4jxqx91lbepm2okaz1hwfcyw79v0ea2l',
                errorCode: 'vrbqjr2nmwoiibpikd06vl3tc2aii4po4rj9gsaihosggeof7s',
                errorLabel: 701474,
                node: 6646493393,
                protocol: 'vk71fni0077bcjq98ahs',
                qualityOfService: 'cmovixiokttr0f79l2ie',
                receiverParty: 'pqi4dbwmwvjwwpt87ohvaek6glswmtvjtbir68ty476gnoyoqjn394g2gm5c9w2arqfn6332tkr934kxpc22j5ltoh4amrvv80v3426in3ss9eoma4mf7d9y98jzwi7yr49up9pd73p4rpp68zp68qo6z321t8hn',
                receiverComponent: 'xn1emt3wfecuod4zidmi5llzrvrqxmiuayrekefn4buin9xcdnshucwivce71a2p8dcikvx5aqd6hu3cac598w3609dnucjsno4xc8mlnlnodub53m4kdzakuk2hrri5ueiygllbj82jf0wb17pb5r9luqqcx0lo',
                receiverInterface: '0pwrdeqyuih0o2xhion8ub02h4e06jrnz6r81280tzai90nko1xw1dy85wxvz97j74eexvosvjgdfdhm1h3zpkcpwt4zxjqwzhtqtexb6om8fjjq26kcwd1bvshsyvqb6jwdmfeain5ld8alndo5712x3fojk91u',
                receiverInterfaceNamespace: '4n8wy7e1ek0vn3olpunsbl2sg8krbjcba1yfwyzi69bob8frn82whzkljloal1h4bfgp3qo8gp01ahqnw1s3yv49h1hx4zju4e4rmeha34uw1kk13xo4ka9erinr6r58a127ydy098yudii7stm29n5e6kih1fq8',
                retries: 5030900389,
                size: 7626129612,
                timesFailed: 5176744159,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '90ejh0dk6m6vn4dygr6rcgah24h77t2tt3opxyanafhtw1e11o',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'wtxd0n4trv0ndph26aca',
                scenario: 'acqort3n5mjv7nc6nzgearqpxvh8jeevpkpawocp75t0qzo2q9jyr9de3nlc',
                executionId: 'jhkfojazpss91a5lqa3bexmtmpp2suqc5bp5x',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:36:50',
                executionMonitoringStartAt: '2020-07-29 04:48:36',
                executionMonitoringEndAt: '2020-07-29 23:40:37',
                flowHash: 'hzq6sxksos19u2pqvjs9ixev2owl750bvbyj2585',
                flowParty: '6sq49jyv0l0ps5dgdpvpk77enzoa0p41zdxxo9ozz5a3kmnsu612xymeufg22zxm4nb4ennfdsp3uxj9vl1hpnqce32kxvy97d4i5ry9hhkx2j513dsaui4xa9npjw10o5dfkxiau9gzqyc6udvsbzgrvsadf029',
                flowComponent: 'hadyn6yj4mikqgva9pjj0xjatj0uu6umlw3amdlgaafla8hgjjxa0zhqya77r79wkpf4caumvf0wxoxc5pwhb93vruingkmfc7v8cj9pu9umnntlnllavm3nar0j69xmcnm7q0o8ms9rnjx6buemy0jcmaodl8ui',
                flowInterfaceName: 'k67kjdufgrjm9foyw3o8pps5qp2k9rgbayh6ipqv91w17nqgrt5k95bfw8qzfzpnh9hjiniredju40j34qf4i45gyv2onzutiwtqq50jop13wau827i1kd53evuvushgo1138t2w1de2ex9utyho0hhvlpdbxenz',
                flowInterfaceNamespace: 'whbe705s7fv83x51scx572xy6986g36p5o0n2xy2cuj1rnmjb0klug4y9p4tdg8qjmpchveix0uv0ow1slotoixus1xgr9zu6dapupucal7l56x4l306bs7x45aumgg71y1uy9skq9rmr3rsbnnlaauw84om4f47',
                status: 'HOLDING',
                detail: 'Et assumenda saepe aut dolor eos. Qui eum aut incidunt non molestiae qui soluta magni error. Soluta non voluptas voluptas nisi vel in. Adipisci veritatis distinctio. Distinctio quia consequuntur totam atque et.',
                example: 'u1chqpyfpxfwb30g1bztylkff3edegjhcs90h065l4q24vno9accbrrc6jou4bjdvn2egovkhzcd5qs5f02ao5dix7gmbipqxt3rgehyn0vb7hiu3vzp2zkvhntt624t6keer5dc5nlr34r1pmnolhoqzcd8weo3',
                startTimeAt: '2020-07-29 04:36:58',
                direction: 'INBOUND',
                errorCategory: 'o8omxe6s1mw46yz93atxf67660pwihb248gpeyi5f6o6yegbpfsy0whauu1z8molj9vdxgt1hl1pv1iu800l0l8wgmcykp0k1uir8o7hqsmd79x4ogwbp5a3khuxln883jyr5tspon4i1h6u5p3htzkuwhjapbux',
                errorCode: 'zafepkb588dkc0sdxb2d77f85wnv57n18oljb7eztozk4laph3',
                errorLabel: 131504,
                node: 2187956568,
                protocol: 'm2t9he93yick3km13bi5',
                qualityOfService: 'smkdazdg9pixybjbsww1',
                receiverParty: '39aegfrd4g7s6bx0zi06c249ikqczb8h4u5797ylw5q9r83myps6pimnuh36qieirq989yygzhvsi6xz4fxfvru1j0fe7vd9arrzxq4art4bff1rxsabvocilswjcs8zdbu4w5mrl2fip4etjqgu3illicux2t6o',
                receiverComponent: 'pp9vst3migkc94wer8jh03z05wcxi0z0bt674ugb2t32mh8smq8zrmtzkwev4ngkusqa2gtqum3e1nzxpjwx9tv3woi0l8fd9a7kcz4scb9cpixlon72na1te4ab1x2q0gddsqh7oymmy63obknzxq6a9nq77ult',
                receiverInterface: '2r26frnmy4i2vy2cxunpw36h4gftisbm9cplbdi3jw11lpfxgbdi9gf9vn8npg81gqbde7xyhk44z77qskd2liqk1ql3r22a3mc0xid79xdl7hi6i1hayomvhy2mt5w92h9k7wocgx1mhhgevhejz41szm33yggb',
                receiverInterfaceNamespace: 'hj18qwhcairytxxho5veahxadv86j56l6fglem75uz3fsyf5pxfz0q0v0t0xnz2cgbktqqtniwjqf33w7pa0c7ky43isvx024rqku784gguwszo3bl0q620csz86c3lc1xrbwnm19y888bcvf7hzoix5mf0nrxza',
                retries: 9864744602,
                size: 4290041031,
                timesFailed: 7693771376,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'eh7szytki7v4wvua1b281b3m1slu0i2hbem5qemarrpiei76yk',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'wkp3aopya75sgmg8sxby',
                scenario: 's28im3w2bqofail65w1q3a7ws3r1bers1mps7aaklca4x4s4yxt87qd4ijxg',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:56:41',
                executionMonitoringStartAt: '2020-07-29 07:30:22',
                executionMonitoringEndAt: '2020-07-29 12:35:50',
                flowHash: '927oxy72oa8z0594yd03r4qb4s2pepgg5yhaenywq',
                flowParty: 'p6v3lyee3izoycxmc9vmift2djo963i57j44pwrrluh8l7aggs7n6wvlje3jg9z8fdl8oenyjl49idw753m943smio9lxg0e02qvns93bc9krf9em864dm5d9owfl9uuxr21zmfbih6407kuf36hy93k68j464ki',
                flowComponent: 'h2ugcyj41b7cnsgxiscqsjv3idfmwgtfywscgr0imd1zqqktfmzrtc2zum8jpoaqpycxo3z0eonxr56dlkmnkj5n476hq4xbxcw7x0ocsl4w0q5gs6hwb3vwfyn7yff6ogtqm7sd9gpebvu3argeyppdzgboyzg0',
                flowInterfaceName: 'dsxnpvs66g9ug7fsi43d5igx8pwa7xcgiaaq5htybmp4saj6ho6zg2fm5q6zh85wbqltqhtwtp09i6ucod57n7d13r0gbtkmvhnfxy2082vedway155ethn8v4dtcogqikuk1xxs03ac4w1wa10zoc9ol5unhun3',
                flowInterfaceNamespace: '9ok3gutxv9gd5bz4n2bj4glrbcpjvh5ttgpjhji8bzfh8prhlyxjk8priqwnb3vq4pmfdrfakml8oygoqykb9aseyawa935nx7bul87gfh32hjx5ex909od1yd6rv8k0hvi99kkebxoxrg19en5wlavvsnuom3ma',
                status: 'CANCELLED',
                detail: 'Soluta maiores deleniti et praesentium rerum sint ea aperiam et. Asperiores minus nihil excepturi at fugit tenetur. Quae est et ipsam voluptas repellat. Iusto exercitationem odit distinctio. Culpa error fuga voluptas.',
                example: '1glddspheuj7eyeyft2zh9yorbffwupbvotgl50ul6q0si0wagvpspkpst9r3ogqx3quruskqxnc1yuzemxcit4y9nm66bpdhpffp84q52f6ow3h4lznuyo1m92mnyn9z2u8qt80f2x7f0p95p6vpqdf76uvbvkk',
                startTimeAt: '2020-07-29 02:35:30',
                direction: 'OUTBOUND',
                errorCategory: 'x6vdgsi4ypf65vgr868hvue9fgbg5ldnhrc5p7ywlh18gndi55bx627ov2dyn9gzgcmxo3hkh0nm2ufak5my8xpspevmupm34glqs0zyvqdl3gd0rbb7yswtv2nh09wi7ehdim09a3wuy2y7vpkwym97hy4m05f0',
                errorCode: '25pz5cazzib104ouf672689pegg5ytcxrcv0yfo6uajuh8vjgo',
                errorLabel: 344527,
                node: 6068288066,
                protocol: 'tbh0jzut0tdwbqj7tvqq',
                qualityOfService: '6wcgglwlthaa64qxi4ej',
                receiverParty: 'yf00xff3njedhpqr2bw8u1uo3nkvkht33vlrliw8col00l7nsu9q0b5q0vkyek4piv0wf6ngeuzzyfmu7t1ejaklm6x996xnmubamqnwdqadssn15qsw9l39kbcfzmvwlftbwz7s9t0xsnr01cfrw4erxozmn7nc',
                receiverComponent: '65ow19k4iu9ytrtkejbglkh26mbbehjpoh2ko574qtuap08uafg6oit1cgru2yjm3idk22n3a2zu8gjvdp4pwp04lfzpwijx6itq5mblg67jwiy9adjpxdzhl1vvfsez67ij9ghigfp1q3b0373rya08lst97t19',
                receiverInterface: 't4jyqqvt9w1bg1lk9573rbv90kjzz77w4udtr8lcfwyxc0cefjkbgu0ninyg7ltk93z5oqsuyox6b2smd5d8cjkjbixo5nppbt6jmgjx65lf8ot8drpcaykqtg34lshxo1q0es5u11ln8bpz9g5e9xmu1j2dtvq8',
                receiverInterfaceNamespace: 'y4jui147kcrskv60san995g8er0mrlmgxhjer8071992ypw7yakl4dldrp6v34v5j2o61cpm2kdnmubq8f49v571c0w537mw9wfl8754j174accr0q7gsb7kgvcevh3agbir77onqa0h1jmtq7v2mbz3p1v9ya7p',
                retries: 9907078795,
                size: 2911266351,
                timesFailed: 5456039355,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'n88zxpidw0j7s2fvoy629ktfk6daeh8gk0yp7fzzplqd5z9krwt',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: '64iacyej2m4vb78ny5of',
                scenario: 'n7ebqr9e9wearyibu2lunmqrg7uk57kplyns3zk70ywp6phmowldd13c86fy',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:53:15',
                executionMonitoringStartAt: '2020-07-29 07:34:19',
                executionMonitoringEndAt: '2020-07-29 01:32:14',
                flowHash: 'e5u7dh1cam0l6at6h6zkq0l2eq1fkok3uaxy3wi2',
                flowParty: '2r6bf3ad2egbvd102mo4mla902r3bskmptp726mltkkv8j9kaba847v31d8j9x4j8tuqfessoh17rvyropa8whiivi6u7d5zbx2j8t6p8nvazpugq1xxsytr25nr5quuvc9vjhfwukk2yhsowgmp3cc569gktnjq',
                flowComponent: '9zzf802k54kc5vl53medxdpwf6odi3rtbr64i84uwn256ildem592ppg4l7ymjzfmxmxeqk97gtl88frlgdbh7pta7azdubhpobxvhs1tsea17q3p1eymdem8vnt6jurhi50qcdlrj966opxcsjdudltt497ebn1',
                flowInterfaceName: '5yvhhqrn5sr72xybpa0uvjfmtc6ukddlh0fd0ixm0yzduu0sf2vsdupzabd2pcc1p2trnfncb274gsizdfe8vpguy2zmjeck11wlhs7th0p1je92a0yqctyz4p9mqox5dihuz8jgoyzfm7qj8ghr6wnb2aj5yrr2',
                flowInterfaceNamespace: 'scesgekjzo1az4bpyqezi7c2o6u0as2ypkqmjeo7be42yg424f3gkuasmrj76drmo4c3bthmutzq0ckmf1exhfhuiia96fnfuyfxsdug4v6auhnjlykk0alcczwbb5sejs18hkvygh7qjq9okdiv0etwi2yjyb96',
                status: 'CANCELLED',
                detail: 'Aut consequatur corrupti dignissimos ipsum eaque iusto natus. Saepe a aliquam autem commodi fugiat. Dolores dolor occaecati itaque qui. Quia illum suscipit inventore autem. Minima quaerat autem aliquam consectetur est id.',
                example: 'gogkl9ecp8a24367s91w7z4jmqtm4esmioolgdnn5wxfbyijkxbo2an8lpo5tpzqbjgd35oe93eolc6an7xedsbo2h5j49o1z1w7oi3vpe0h5fwayfi44jl7rig331s86727vqpgz47v0hx31o62f41uj0wt4eum',
                startTimeAt: '2020-07-29 19:31:03',
                direction: 'OUTBOUND',
                errorCategory: 'vapmum3kwm8pibt0wji0e7tkcfdk4f2exi7y6w4n0e3ej039mursdc2jiebaldoiuqr26r4kic17tb9rv6d13zf9yv6rgdvyfjcco747dj8r6vl7lk9jvesbcupak02sgf4m7z65fuja257mr4uap2i35z78by33',
                errorCode: '2p70qis76vf6hv1a85ovc4vbzvsbf47gwxi28068xeagmyiq7p',
                errorLabel: 420447,
                node: 3103750916,
                protocol: 'cij221pw7j6umibf1p34',
                qualityOfService: 'up9rsei7e473ot4qu3jx',
                receiverParty: '7lxi5ekg2b06e38b04smccrt2bssbe7nehcs978e6b329i19calpmd0nvgv2ppj9n2tueeeynj50plutjtr23r8k1lq7952l17c9hy0zgctv91nzpc7vf2ewplym42nrjb60p43rvhev06ko94565trb53r0f3oe',
                receiverComponent: 'ihvbaf352stqhykampp0gnq8aldmxk19y857fvm5xeuv4e1x3kuwlriqw3ltf9o96fy52bs02hph153140bczj0umasq71lgkdy2n2hjic6cpdwhf3sligdtufdnvz6jczj5z8wu0bdw51wgottg4efl037zbmdw',
                receiverInterface: 'n19s2dxhstgfs5dih0rtqxda3frp14irjdjs06ildtt267fr527z4kg1v6dj65ourezb8hj49rxx2nglq5fkqld0v4obua2f2g4rpfkq0swi6uevx73v5rdys193gvesck51qo73w74x9qe374nluivrpn49445m',
                receiverInterfaceNamespace: '4n6jlv6o1d9thiep3bsxb2iks08cek7xnwvbc6qx5n0v6jzi4bogjb2jz8qdjec5p50ofowcali043nuum2otkfpgjufl8g0z75v9m8tzhct6pcg830qca1qfilmaapk7icrlj0y87bk2ho67rraw91ijfbj0ycg',
                retries: 8871512856,
                size: 7725267197,
                timesFailed: 6886987212,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'tmn4kw847yifqahupo12rgi2gr5g0rxsasiaxhs0ntucmog2yz',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'a6vyvmffcm5or736rxfsi',
                scenario: 'm7mp3c02jt6hyzdknxrilcioauecdr8jcvm9980no0io20jafjhatm0w755g',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:32:49',
                executionMonitoringStartAt: '2020-07-29 21:46:03',
                executionMonitoringEndAt: '2020-07-29 03:41:52',
                flowHash: 'gcvvcojf0ewbyt86x30282xzna45uih0dywln4nb',
                flowParty: 'sg7arc94akptm8xeczgx5dmroi4c0s2qo6xe465j63d5swq0cfwwel5mmo7neb7f54ejalx2m14a1kusgm4pxzumlihkg7vj99owgbs4p1zxvu5cumazmggft9cv2xtssx1vqeuv9w2uxbigpu750c6ncg48d7v4',
                flowComponent: 'f0tqd63qd12b3osywvpuexvs5szwfksgxpc38izah2c7uztpfntkgy019fmnkc9a3kk6etlmgbiutwnir91ouo94vmyvm424vkfea01ylo1r1jxpbcngrl7ra9vducxey0fkwtc415xv1w6wdo48ajl2qcuh2d0b',
                flowInterfaceName: 'druk47c8hepyu21bo2ufqli2d2tsg01xj37n4xm7dy40cv8p9mu0o2ixdd2epjgxmpdr2ef9d8zv6zwe2zouxbedcabek6oy7ala8crx43qcaldqre4mi4i5pftd20m9cuoyi0f30qmq7tq0f2cf3jmbr4d5o4s2',
                flowInterfaceNamespace: 'vtkxy5v5z1u6ffd2hf0q1rqlkwhiiru347ar1opjhfpm9c1twgojt9b84cjdfdnquhy73fmwbh3llanwc0pejgao61cvod8nsfk28v0ntjx2ok0xx8prj5c2deyd9cpyeemkyd7y9j0tmaeopotu4ca09hnneqf8',
                status: 'DELIVERING',
                detail: 'Expedita ut quia ex ut architecto. Aliquid consequatur nihil vitae sed perspiciatis voluptas nihil. Ipsa quo quo quod unde vel.',
                example: 'wg2k1vldglgmu118lp3bio8moqt1i6zmirsdii5b3kx8syp3k2dmq4qzyogblojzt29vx2vxobhdwb2igpwcediem9tfvr7jkhydwpl680kyml8dbc9r9yaz0b0g098g74g580s3cbz1wzthjen2ulxwx3pq81dh',
                startTimeAt: '2020-07-29 18:32:34',
                direction: 'OUTBOUND',
                errorCategory: 'ydq42v9s31104owo4krmg6xhy6bc8ofyvtuiztqmjxorymdkl3cnwlt2ht59b1mjpd8ikc2nf6ychlalr5tlljm96zlrd8rmv6aezxcusb070lr9ljp2129bwotv0xvgv49n5a2gc5xw8gyrdyuzuaodf4g1r0qd',
                errorCode: '61esphax05zyen7bfhyvx8q5azk4v8dgteh35nh4xcmaf94a1g',
                errorLabel: 705279,
                node: 1889194902,
                protocol: 'oyustbxdm7van989rbaq',
                qualityOfService: 'jnsyhdzkmnag2dv2cdrt',
                receiverParty: 'k9w93ojyhoul45e7mbs3pm2vlfwkys72jthyb1mgqgz7wbgeq8zkf0cy8itz2yabftvpuui8fcv9u72jix4dxtpgkdw5rriosv9pvpyard9o5wmhkkgmvo1ac9kvij1x1etk0kqhaf67uvxb2bztpozh24f1pr31',
                receiverComponent: 'swdpak8yr6t19t19dcjacp4tpb52zggg8nbbchip3wc3ygpwf0skcdkz4v04dvbayjay97fi4lhsjyjtm99263pvh3gzbdhw91kpz7hrgmr0y1a6vy8uqyvv2hbi2n4yvsymn0k7t7upau90qu58fr977831u8ov',
                receiverInterface: 'jrervjqfvxlpzzi8ti818pcax3n4ytuwnmf1qziea036zxp1p2qxphcjzrnwaztfto854wy1t5wrzea1bgf5kzpfn8lqywepmszfpwcuuq6nlkf1fa3feyqixr8culh9yjpv5n2wkkixhuk8tez7373jsfwevrc3',
                receiverInterfaceNamespace: 'kwmlkl4bk7w2ucyeptt15syb77yr95upblcm02zoc5r7hkxyfb76ktwi48am5gc0rboyiuv3bfcz83z6o8m9zv3wb2x3447ncmmnx0kz58hnjribyyii9ay1z8mawl2bocotakzgm05ruqdbbzx44iplrvmdtnrw',
                retries: 2181757240,
                size: 5217077706,
                timesFailed: 7916880150,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'twf0xlc8v34l4h0mu6d3xvj0accguf7u9tu97aa88bmijfhn3q',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'ij6bfmcbvbs3bu1r59u7',
                scenario: 'exos70anbgqptft8oxgzzajsngwaavlrwp4msem4empx0uhngoifpy327wmpy',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:55:39',
                executionMonitoringStartAt: '2020-07-29 18:09:18',
                executionMonitoringEndAt: '2020-07-29 09:13:11',
                flowHash: 'zoizlk2ugg6ucgnw4v203iczd0ev942djivv1bkr',
                flowParty: '887wixrd8ke7wrj5md838exyqz36yv7kobl4p9fi5042jwxxidvkr7phcaivlivt5twh7tuaqffu4wdcbcbuutcdte7yg5n3clfzc3d9erskvjzpkojfeiawc45h1pk0an7873tnnbci27drejeqeoqcxvfuoanu',
                flowComponent: 'igyl093joaf66wacq84juz9ozzmrdcr83t1ngkwqqc0fwmyn7frqzj2hulsf3tpt0lreucyugqikd541j1jd06ud9vqejkdiptq6hxc4j27fsfrua8d7ykpw9jnrk98gbk1bqwqpwaeflqp85o3l1e8jeijiqi7t',
                flowInterfaceName: '8kl6ax61xjsxysr607ib0dne6hcvzmp02rfco2y3s0vhezth05xzlmezferz9pi5uakmqhrjyrho2nk8op8w8kur7qai9gg66ejw5z4u4iof9qzo51p9uz4bmjazcptdrrltj5sm75cdlcprmfcrs1u5mc12etji',
                flowInterfaceNamespace: '1hx6qbhcsuzldssyxtou65d0cikpif50jeghosb8wrpus6pv6ahfgs9t1s9hjhin0055mcxl2x4eodwtit1v85i75g9yo0fdnhgk2mdmadp6tijx1t6nozugim13x2k6w4tgazkoumb0hzydoa7l8kklf1b1zfge',
                status: 'WAITING',
                detail: 'Quia dignissimos a fugiat repudiandae officia quo sapiente ab repudiandae. Ab voluptatibus non incidunt libero. Voluptatum beatae voluptatem illum sint doloremque. Atque dolores dolorum laudantium veniam vel debitis earum.',
                example: 'uaqay409q05iqc6xgxxm68fk81mbd8nh2aecdrx2rkrtkfoiaiah8am2utbslo1hmcvxu6mqrvbhqr8lyh2ofqhcvaeasz8nvh1ewata223pzk7q837qrg3mm4mi8k43bir72bpqorwqp8zuagiyz70re9k86aky',
                startTimeAt: '2020-07-29 18:58:37',
                direction: 'INBOUND',
                errorCategory: 'leeb60x0zprcy4u1p6ipt8t6zj0lmsb1vpjr4tzwpb7uhk30fm19e5vlte20wvugmdov8pec4tb4ykc99gi0s5cazc601zvscfla0fd2qea304ynxemiiv4crj3dh330khy59w6q03c8b1tsaec8rs3wdqsflqdj',
                errorCode: '174exr5qdh9f8mmtim3i7r9jx1l183aa6q54w5qpgivzb0cqk5',
                errorLabel: 437554,
                node: 1992225038,
                protocol: 'xzs8uavlz6qi36h8r53o',
                qualityOfService: '0vj9w2sltnf1juaas01n',
                receiverParty: 'enaj3u7opqj8w2a1drd6zxdpld0u3aakfuzj6ex8qxgak2bxjq6l7273nludyfsg64mwe2a6in83g7pyvpkge86ajk6xsteftvubskbov6vuaoylr7mklmp0c3g6bs3c0g8pbj7qnfie7hjw0n4ey2e7xy2iy1fi',
                receiverComponent: 'fj4ya2b1s7z567qi3v5y444odcj1vf58zz2ufunssqpv7dht1pz94vqpwlxwr07280ouoizygnwjdvzdfw5ovtj4pkir7rxy4a7igd1xqi88cnqt3tldis9giu4qaanmjvclat5cjxb5srhk6brthzj5kf47mmll',
                receiverInterface: '62d1fsl4s5u5ck34db0dainviq8gpow40ieqchoq2y6drnupo8sa9dylqoxaxuoest6gq2hnfx0oevcdy25alhotxxdiso59o057lweu16bozj7rr2vo83ex10gl1bsvtgwp5crdg78aje8a0waiyqm49tafv04l',
                receiverInterfaceNamespace: 'nndxtf3jw6owus1p3wef80hs933mkftzwz3edp4yiyr384vfdawbbpc2t3wdnohb046t4ohcd0loh9xvca3v09j4sqb0ep0b0wyztib92q746o72y4ztoghayq4g9chv8f3pw4konkjy75hsn2b527k3697zoi2f',
                retries: 4359988362,
                size: 3817326985,
                timesFailed: 1628221758,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '1iz0qy6gzj7jfjmualntof8dtjep3elrey6wp3iyw0k0flzuc0',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'y5kg6kxxndr00otl3ejf',
                scenario: '6yeb5v3j1h551pjephrofgd83jwo4t173v3m4t741o9p4bd5ckt8ttsruk7q',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:34:36',
                executionMonitoringStartAt: '2020-07-29 18:46:13',
                executionMonitoringEndAt: '2020-07-29 16:14:50',
                flowHash: 'kebj3ej58f2i8kkkxhx9q7vgsi5u8b3w2zelcm4n',
                flowParty: '7b9oz6slo8idkvtomqcbo11kc9d5zckq1w19sw7ytctjbdzus7skrzmidsbeq8j6ayzpdvyayc2857e68sezuamrm4s8vly1d8b8k8xnl7r4jx17v9dzouzfaslf566cxhmsiwgbepeud47p0ymshdyalqwc79kw4',
                flowComponent: 'zwef1gf6roj83msvgy8o9bmd8zq68lkmimw3a9cnnq7ff296352pdh8j9lc7x9ub2le2urapbf7xlfv6xdn0qd44gngpl7b55abiby9d3z390m1pxhr60wdvfhrq8yfuj6tel1rg46onja4ooas59m3aepcaqbr6',
                flowInterfaceName: '6fv81lt5t93pjylecqz1k89ro5ovnlinis801adbgiyt0suatd77iisp2ggq3wbbhu7sfrnfrgqvj67b8cslz472bvfes4hl03p7uvjyvymbzyb3mrrzemzv5whmkoz2ahiwdryiv8xr3uubnwd36kebryktl5k4',
                flowInterfaceNamespace: '34d3csfnem24aqnjheqjvk3zsocjfv6witd6vr3p856nvhbwsjxv8yitjkh6qifpxafa9hf5oml58xpbqj01h33vhjo4go8a54nasoajdiaxfwzpxgkpq5tk89h8e3shetr8qxn9ydnahx0bj62qv18g2w1r1snd',
                status: 'HOLDING',
                detail: 'Sed quia minus omnis quia repudiandae et et eius quam. Molestiae incidunt dicta voluptatem consequatur optio assumenda. Quis excepturi ab eius quia illum voluptate dolorem. Sit dolor aut at.',
                example: 'y7ig7w3e24gu46iwecmfmugk0ajkxumgoieeondfvzxem3y98c8c2k908k64gu7swu9nkg7m5r582b330tc7mlxi1aqju4mth153pdprnyc6dbyxoki32aowj56s5zb2f70mmr0y5zf63vmzzwz9372y1arnjfic',
                startTimeAt: '2020-07-29 20:14:00',
                direction: 'INBOUND',
                errorCategory: 'pqyaaj3eu0tvrpmbv5m344w1xwsarmt5qr29nfzi2s8u7u4h3xcvijifu4j8tks2detpqtsqm8qvbpkdq0prmd1xgdi1khufryte69do0dcyx8c9ilhtto1rxmf4latninq99gqsqt039it4gq5wgx4ip2qb4082',
                errorCode: '9mqivy839o7qay1s3ounelwpc2gh2v8h178uzlyv5yq3r0g48s',
                errorLabel: 811612,
                node: 4492379465,
                protocol: 'gcjvozhd2vuazh79j73w',
                qualityOfService: 'o29dgmbfvdb0bws4v35x',
                receiverParty: '2fi93wjocya0uafcc2kn80pbt754ym1mcpnj05ah050dozsbijafjiswr0970rfp0awbm50r2ekjca01t17lthqcjzr7uw7031ef5h5sqs09x2tcb3i6ar3e9raq0lypl9u1l35qxus60mzirgi8h2gokvj0iqtb',
                receiverComponent: 'yyr6ih6uk6mxno1nklnxcsibtmf1svjleicg437lrhlxt0ovqvuf5gyz7qvt1ntmjcngjbst2k9b0f9oictwfvgdfdvv8gsbhsr548jvbpzfcyzwmxejl4nc4vzt4vxx4128whk4v76z3hnu3kdzmr5zcxm51brx',
                receiverInterface: 'cmvrq5uwbxkrdg6uoyx79t6cgfdf6gpq4on8ero7l3ar7dxx3sq8yhpas40pqgefoxvffve5c51rqkxno4lp12bwp1iur5rxzkmt5zbldrg5jn95i7yv1ut5k7aaqija1p59w0xznt3iti884jyrg0qbzga3qq87',
                receiverInterfaceNamespace: '5luvb31yj4qxgimjv2usqribv10m9szsoz6b7sv0qmoasot082pojdu9qmdmnlv04xjp3o3pq1ibvinyyf5zzt0yq026f74ugq36l21xjck4rk2h6a76l4zvfjv3l7bkzcscm5ua9ef4f6b7zskgvautdx5v822l',
                retries: 6093049530,
                size: 3115178024,
                timesFailed: 5513789959,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'zk73itrlb8yaw3o7mfb7r06ulfpgvl6rteyk0em1lghq8v1d3w',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'bpwd4t4xyo6uueam2rgw',
                scenario: '7z07t2wqf7724u9tfq4xe0qcz8y1k6um2vybrwnhm5zm8a4dikcedfreu55e',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:47:06',
                executionMonitoringStartAt: '2020-07-29 22:25:22',
                executionMonitoringEndAt: '2020-07-29 01:04:24',
                flowHash: 't87dbaa2qydyt7gcy4kqfzqh2r8jmqaiviyx8jeh',
                flowParty: 'dqzxit67lyiy7xv2a1lqywnofw4gy57tzwh31imvgm1i1k1waj3oij6zn2673js44b8j1icypc73g9jty11ximn9fx351rlqxvemri7wztv90ad83n0kfnk7ulab1u35nhvnfun2dojdzdfuz8f00m4cpzubn286',
                flowComponent: 'avzc90zvlad5s9vsgqcheno2emiu45wudnggzhcf79xsf59xuq6136sd3co2iplyt4eikijskg0p0vptfvu4yx48naqt65dgbct2skag472r7g5s8mdxt1rn6ulel7aju7ebyehi5x7slt9kqvvpq6anfgjhada94',
                flowInterfaceName: '07kd5cgy7arvld2ltpsyr9fyy973hcm3tasxcavikpvmfv5w8lt2vdemrf5ctkg8r0klswjdyvs7d21omips89m5j5zp53242nuq9xvzefpp2q682du6um6uu3s1djuiewdi237hiocepf44edk22xwc2b3287c3',
                flowInterfaceNamespace: 'p5xui08w82guhw56giojq0rjcxlhy3ajohg33lag4qu3ti1lj63h5txjma59nnrqaz18jmf4jnz1krwf02gjrhvlly74djjq2cddjmz393iimepzk76et2si41uo0ytd3hr5o19rb6f9ysyrc4a8jt2qtyhnrihw',
                status: 'SUCCESS',
                detail: 'Saepe reiciendis nisi vero qui excepturi mollitia similique odit et. Quidem sed voluptas reiciendis est sint in. Sunt neque et recusandae quasi beatae quis temporibus. Et vel labore. Non ad omnis corporis. Aut sit labore praesentium enim eos nihil voluptatem rerum.',
                example: 'm1ndg0rljf14qd5k2o40vaessjlgm5ekh0iyugclarrsnbmg9csjjv90v2v52pnrjucm5qw29fizgpwd40yjmkfv9m9m0e45jefj1r13n0xdcepoycgblbh0xa1883oxk1129l3s63oep1o86klikfpcl67wy68o',
                startTimeAt: '2020-07-29 22:26:30',
                direction: 'INBOUND',
                errorCategory: 'eri37r6apnlul2curmh9o5idin5zq5qz1cc4jujy3ryburmfvt00mnjib2b7259vh8ys4gpq11ctc3tu35mew0xl8yicxly238la90hijjgi96s57b3102df4d91hs0s3dcdb6pck334f05taxxfsf3ffdw6xd12',
                errorCode: 'fgxyacq32dnghvra6kx4f1bkevhg02h89j9p1bmrwez0ct7vqy',
                errorLabel: 438425,
                node: 4664332009,
                protocol: 'zdzmc6c9a9zl2k18umb6',
                qualityOfService: 'paypwjglao7zx1rsutkn',
                receiverParty: 'yu7j6twdw0i4marpcauqgizymtathtatrnej7smntbcxcp7n56sap78177eegbw668j4vz6x5d6bhc0cf8uhz78vuecen9fhhrkhwdpqw0ivodhrrub5t3icyqv1a3t5y6x49sr79uo50b1akdw353j8pcxqliug',
                receiverComponent: '8rw7z9ctfao8tky7201gxk2scrxr5qekt50acvx2lz16nuq8y8ixnoyvtuzsk23l2qea4tvqeh5t5gxim7hai83hn5ipy9ofifsm7iy3cde7jw1o4v2pv3qxgus54jvj3vtmw59xgmstuof5sf6x05fqlebvhqc4',
                receiverInterface: 'n8zgh91j26qk2dde14na6rlyds4wkf09pbhoo0guvsqvauz48enlk2fsxem7nm1rp38olx3idy6cxrrssneb9ya374exmckqbabldqp1vjuzva6rfkb5xj0qj41gl9qekh630smjixn0aycobupc4kp2zq9pxdu0',
                receiverInterfaceNamespace: '1b0ib9enqdlgdsdqom3ltjxtvcb9im3ocb4vh6b2pe7zjfiyr98aufs7f3hxc6y2z42qgz6kmbfhdwgo2of9rbgp1wcleg34s3ejd7il7dkpne7h02suuhv132f12yae6mumvbdieug2ldxo2gg0sjnclgsewwbu',
                retries: 9676372164,
                size: 1395767004,
                timesFailed: 1817456752,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'fzdmuiewnyylrzv3nw3eoxvt1aqfm53h33s6q32c6ecq80ebei',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: '0j3il3ax0kcckmyka52r',
                scenario: 'w0nk3oafovj5lsd1eki25iyo77l6l8ogh0pew23jsrxq0ekzzsfmygfzm4j0',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:55:15',
                executionMonitoringStartAt: '2020-07-29 02:05:29',
                executionMonitoringEndAt: '2020-07-29 12:04:41',
                flowHash: 'rdevy5mm3x8nxf62vy9j1dvaxt56oml03iqqjgv3',
                flowParty: 't63q02avs880lhopo6n4wzpp72b3jhs1jc1cxwd3vhqhtwjiygw1oatfbbrdea41ebkdkz7lg2elmr05jhmrwdhbhx93zuf43izdckv1o59dgt91csdpuxpkovb03a0pv1e1jl4ux2ascfri7crl9nnmp6j64k93',
                flowComponent: 'u9j4rpp6y920u0whlen9dtq2440hqj48gc5sq3ct5g2eyr9s0mfl9bdkrs32m5wyfdpmz4nk6egr7a06md0oooxj7ma32ur86w811ixcuvfy0s22co4me79j8yqunphjwdgmu0ss5osojlmd3jd4k94pk5mgjggy',
                flowInterfaceName: 'gmh4ujtq0ak2bbmdxum0yfk7ve3px3bew4fhi8zewbsvihvy3mn4rej2w0bk4jq720cs5ert5jkvjsxx9er77k2dib1imcxsc4xa5xh9qmoausb6l0ya901tprw5vxoteqnzasd9qyaepb72czk423hfl0ngie25e',
                flowInterfaceNamespace: 'zh7bk7p9rwbf55jzvuegph00daerw2fe5wwwekd0qplj8f036kn9spwusktxhyvf5qesktwyca3k2kuu3ob73bltplksll6e6hk4jdhiwmhftuxvrvlybb1jep11tqj62likaxnhmseb2hrhqbyqy5mpr7uwt7i1',
                status: 'WAITING',
                detail: 'Possimus doloremque libero sed animi. Porro sit excepturi laboriosam ipsum fugit ut nam voluptatem. Deserunt corporis qui. Dolore omnis quo.',
                example: 'z7ehx1rm7y25wn3xir8gofru3ch7vzfckqoxocv0ulrll9k60qjpa1w5s2nd4wf03otn81d1v4bvcvhfyxr2j68a19jdpvbgorwc5wosn5p54cepqbwd1a4h7qxob0lqxux3k1dh3vnbddn0mimrpjtu2h1t7811',
                startTimeAt: '2020-07-29 11:25:10',
                direction: 'INBOUND',
                errorCategory: 'sqpoara1ffmfzkbm58hrdzmtcmsw7dk5csnedevrzrkdw125ggn81f3d2mi0x4a7vpwedo9uxalelrn3yw2r2f53nlwylv99r7gpwk5uvsjneaxnsd1kal3clmof1su0q8ege0rddigtve78vo0cna45yixlfoz7',
                errorCode: '1dev89jjggrhy8mmzx9b2hh5ul62ogesd2rqzm7ztpc55ium32',
                errorLabel: 294827,
                node: 5810366796,
                protocol: 'of5dfh5y5ivx3vxuxgob',
                qualityOfService: 'doaxyq92qcj52mxg5zcs',
                receiverParty: 'tc8goox1eq04341xmjx07yq5qd1u6zuekhysznhut8vjr2q85tjippqtm4hdyw3ajzra4iewwgcoxvan4h3isrvjbf8cl1nzak5gg76l8fmw0vq1qz9uxx2kx9sm7v2b53tewhpj8y9kpb961wd6z7ti6nq526tw',
                receiverComponent: '9jwkozoala3bop93i3sk2b870f7mlk360dtdbkfwgv4a74c5rkmraqjb3jm1jfdngudsj6j14jn1mk0u7vdztcop7xbwa5lg3kw6w9oveiachyneo6sakqo55uxs5sopxsszfheltutyrufqup6q4wa9lvzjisrn',
                receiverInterface: 'er5xfxmiese4iu1y4jzya3e68k2kropbmon3h0w61gcrhdvy4vs01kcj0vctz1imo2w21vacrczmbgigxhg8l092y52eekf9vmvppkcmevz97qsm8oixdml1biuqmw8c3ckpfme8ef62omi2e5eihu0512gng9mh',
                receiverInterfaceNamespace: '5gmsgfjqfssueddb4ni760zr1bb0smle9jkpecpt0n611odd2tusvi5y2nt11zry0p0p97xmqs4w6vvijenm2bq0bt9wit30m5nhhddntrjmho5xyhzvu58ovetq0j6ocdcae6qbouyannf1t4phgzm7nmwm9qnm',
                retries: 3692720001,
                size: 1666058844,
                timesFailed: 4143553286,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '36tqsucv7i8lcde53sq1yjduyvifi5w75is2jrbzv87yjxl7xj',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'hdc5s7b1pvtg9uodp7n9',
                scenario: 'amcuq4pyxuvn1rxml27s1i4ca1sdx56lhxl1oi0h830cxsp9en99qnvhmuyz',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:37:45',
                executionMonitoringStartAt: '2020-07-29 18:26:09',
                executionMonitoringEndAt: '2020-07-29 14:40:19',
                flowHash: 'c9jvzbq84mnxrcpo3860g7z9o6himqxpzqudpnuu',
                flowParty: 'qls0cgh495lopft3wvftgytsomwhak6jj3dobvv0sjdbewuytucvaj2wo7112uinr2do48ncubdkxg3qn0ebr379jz9urrlgc2bm9gq2j889pkobuyf1vlxc8c6p7mcdrapvwedmlsd414s23hpywrmaco5jxxce',
                flowComponent: 'f8a9vz3q31hg8gel311kn1ngde53ebao9ystg57bf892um3ur9l8kq1xp8bqlsdz5rdzglfvrvttp4gmk2rj4cioccmg16fovuhpt71l1vnnfut6sutpycnz7l0w2weoj68oix90vj7it0iu69hltqgeevmel96k',
                flowInterfaceName: 'ubbfzb2akodydbx5k5q6ma3zm7fuuzof5rrmjehiu8v23ea8hokf670mehyv7eyrxqa0of1f3frll1bvvgylznfj3ztovm7v82v4sgrnbc1p2m0a66imxrjh25a1bu7o5t32qbirmtv88em33ayigbhm9lldrc0w',
                flowInterfaceNamespace: 'czw9f9wzy3z7qrq9ffa2jw24w50hqha8xxzvwanp44qc8vlpw0mtahhxd6qw0g4i0eiznc9oxv6xc7ekix6bucog2zahfm9ag70r7hc3uf1dmyly5rvx2ncplnc1iu0xtnjfsxyqs6yn9rt1jpqoys1jxhh9p920e',
                status: 'CANCELLED',
                detail: 'Qui voluptates asperiores voluptate accusantium iste corporis earum. Doloribus ipsa doloribus eaque natus consequatur. Fugiat autem aperiam quas voluptatibus. Dolorum est aut.',
                example: 'frddranye219tlqzyoxxjuozi8dttlvi8atu2h32t9es69pgdq9522fwo2xbduv69jrk2jqiztxitkfmoftowmytcpyek82yy45360h4t0mfqbqady5ey8lipzpkvqqelm8ke8ml2174qyx1aw61a6lypbm03xfz',
                startTimeAt: '2020-07-29 22:40:02',
                direction: 'OUTBOUND',
                errorCategory: 'zx42jw7a6yioru5w76rgkkrughlpkv2uizpkcbrz3gbwbzvqu1ekih5b853ruyz3td0jef8u1aaltjg9ypkeluntwrcapsz5di9wtd56xhmfk28whf38ut0nxh76o6728y8f2u6759z3zap1bx75m0ex8ykv4qur',
                errorCode: 'sf3c6d94udcrh0s6e7sqm6ephjxughjftfdb8brkv6rgsfxbia',
                errorLabel: 786092,
                node: 3146543843,
                protocol: 'tjjedq1x4gtrse5bl15e',
                qualityOfService: 'elu5na7fmr6qyn08k6nr',
                receiverParty: 'quwgt1ibqumwgv4vamh246mqf64vckuzslhh2w6o8oxb0up6q100cgardpo4d445e7upuaxd20dr1klccsgg589w9ltxpibkm0gieyjucmlp1ld5p6x921m3wbmiug4alu8cl11v8bu0lmcemvfx3an218efjax5',
                receiverComponent: 'n9gfyhfuo1md1cuxoy92h5gw0pmjkh4qg0zwzjgs5uhicfbocn89oy7ctcnbt9xu68c06inbvl0xq5leigd7tn525d6g7rv1ho8htdj5x0tvn0mrme78jsmv1l8vfi7lih7l3e77cd96csukuv7nx41trd3zfr9b',
                receiverInterface: 'wotnylzhqa314uty0rou8175pwncudkc64fy7volsbjk4it8fcoccgby5ypp8nl96u8ktkoh0igo2unfpc67z5m9tgd3iwtfx4o2wmazokfia7v9dnv6qj5mduaohj2lwtsjo8hg2ggyxifj3skv3oac0rfrqhes',
                receiverInterfaceNamespace: '69kl5o0dyqyfgts1pu3kxk9gp7zwyjuygluzotfrnwoxdbmqhoyhlsskhwzad9o5jkgf4n13brpj02byo1s58j8xcb4l8x00umwcljl10eycj6jffxl6bdl7wqpx03lyl1rvfcsk7iqmxkbakcqz0vs41u75o7q4',
                retries: 9841498635,
                size: 1286137849,
                timesFailed: 3266761338,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'ko6chftw52u7w1gql1jqiqvaq4upyh2ih46ffp0ju36q0w7v70',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'e7hezd7lc5ss0x71m53g',
                scenario: '8a1ahi90kfpvg6zo3tuwrmzja9tvmj6gnr5vpa5h7ijapmrfcz3jnby41bad',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:38:53',
                executionMonitoringStartAt: '2020-07-29 13:40:06',
                executionMonitoringEndAt: '2020-07-29 06:32:03',
                flowHash: 'g6632qjky9n4bl2ocy3zlf45gbp15wgwe6js01om',
                flowParty: 'i9das9whp6vtcrskabzvl00kcdoq87l0mrz245zy5d7rdam2x8cwihm4v9aoj4acmon82mnzmgkmdviyt16ol45vbjov7nygrsrctez556c0c0iwoeyhel03or0u1djw1zweicp5fozhaa58ihhk04fpwlmgjvhf',
                flowComponent: 'hlub42yz5i26s5x9k3fmjs1j329qe88drpy5kml9dzcszxtvn1cv5q7wnvqbqxy5qm302jqhup3emhubhtpgbg0ww0sqnla7eddqx7b2j5tnczxc3h1sc37bykur0ovdzr1oi2qfi0v69pu997ok5j8hvxzc815y',
                flowInterfaceName: 'oj0irixgclqol0hoiqyhpxg9vvms2sy3k00wcc22d88wg8vq7limpqlbq4lrighwbh2an8whuuwlgrxep8pr4c0g4580jq3l4uthuvuykpai4ouwg9xz95eqs5ot0ki1yt7rnyknq1mt81i6at2ypg9x1c941lt4',
                flowInterfaceNamespace: 'kz28bxe4kiftatrtrksqn1ujtciizfj37hwmb3n9ie443cjj0mnizbt5bv6uv2p3faersfwhv5powzc542vrs1hr6kvtrcg044f6lset3ux8a4e7fkzrax8t8t45d4s9cttyuhtshou2g7to52wkisl8ivq1fgch',
                status: 'ERROR',
                detail: 'Dolorem dolores cupiditate in rerum fugiat. Non at fuga qui similique accusamus qui. Laborum perspiciatis quae voluptatibus autem id ea voluptate voluptates dolorem. Rerum sed aperiam non nostrum cumque. Facere officia ut nulla occaecati asperiores quo quidem repudiandae.',
                example: '13dnks0anlm5w14ye45imnpnxd8527a00wfq3wgcf8x1h1y4yaaicyp5fixylzoca56i9bscsez4abqmo9erkm66m15qh4p90ycp4rx4cknuv04cv17i9q1wycks7wxsnekfuita1h4yng842mpvz6pfyyh843vrq',
                startTimeAt: '2020-07-29 19:24:42',
                direction: 'OUTBOUND',
                errorCategory: 'jzy5df6x8fbpv53k5wb2mwntzqpa9duj3fw1t017ql0m26qabyrp8by10dho0wr00qm0m61e6c9g1731asimvpnn9jkafwpbxr6f9chnz0yf0bzxr7qy6uo4i2h7w38425jn5fdo0v0f1rsou4s68hgmr47ulp3t',
                errorCode: 'ch9hzldj6b43oeztwjlsmau2prlg5ba0zd13hryr6rwv1kw9fp',
                errorLabel: 870174,
                node: 1332618405,
                protocol: 'cna3ippdo2pdghhm7qoj',
                qualityOfService: '0xx9wi81iq1dmx6kv47m',
                receiverParty: 'r1qjaeh7slehx84ixhzbeulvcsf75wlzdzolgu89zw1zvp81sxgaovjpt034hc136kmgbafm2y0mncbapvi6vcfpboy0rntiqtsj57oagfeyrnz4682kmneu7gpxnrnk6apexxp8juyvu912jkq98ddl26xdky63',
                receiverComponent: '99c2gejjfr3ctxtznlq2asc3u0zyon2o2pn7j5j9j838fix0pfl6e9f7dzgklbhdqyv7b47cmclizbtd170rwy6l1y6ylxu6czdvp5xgpa6dxa3z0a94qs1skvqvv59e3z1gsxcqamhd5qadby2mltzo7a9ypoag',
                receiverInterface: 'pj3hf7zeeadi3n8wg091g3zz0rweeghcmoxoo7y07c21r9itizhkhamk6wssvf7z014rf2euy4t775w3b8x46g2ueobuuggleakcfoe0i29zu4e2s3s96lq02oq0javu9vfb5wja2cnqrgkdbsthyoko3zp4ynf0',
                receiverInterfaceNamespace: '686r1204sb64x1t3mg63os0y9i6s8m03837yh5qb1a12hhuedkh37l0hk0ebp0hp422z7mkqt73yz31sxh0wpwec4oby2qdw8wj8f7l22y002d9t6a7d14vx3fb283lb5hxcxmero76qda40zotpj8c455gwaksi',
                retries: 4055345613,
                size: 8455992329,
                timesFailed: 4035205778,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '92jvpp86s978in0j64awagu91ob3ia3b5dm8z7ad1kab6zj0ai',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'qhyucttit39zi4fexxgy',
                scenario: 'te7bnj438lqz22vdlbnpov0av09qvik99ywejfdyuc9azxl31tbx1xhr7pga',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 23:53:34',
                executionMonitoringStartAt: '2020-07-29 01:43:47',
                executionMonitoringEndAt: '2020-07-29 22:13:33',
                flowHash: 'u9gkf9ygupjreyxv7vg7c2rgqr10k34i4u2gbn5s',
                flowParty: 'rinyhyxewc2psxd0qolj4lg994hxlibogwukan1aek5xm2aaynxfqeqza28kktkvox9a4h84eed8i4vw70xwyh7rh8od006ro1k8a146y5o7szlfioemwaxdrem2cje30qpsgjpunq17zucxpsflm5749ys9kj7r',
                flowComponent: '6l8kzj3fh51jca4h22tcko1uiwpzx61ahouf7skz4kgpxb0lvnnux9sh4z1xs7vstmtor0pa638brz059yg1j40gsf3t56dnuetod2y9zx0hs8hksnnitm8tz0smunqudji9cpfjbkt1rzlgerhjmb1jdkoibbx8',
                flowInterfaceName: 'kbc0kqp9swh89le1aksdwncfxolwmexfr2ybdyv8szep5r6ihutmxnqbst4cq5gv0mv0rpcgif9gro2i3vgxnm3vltdcwmb18f9z7hwyqa9aojmo83ogzzozkk7txxr2o4zy7mxbjc7y4sgq3wb2sm2xaf3280gt',
                flowInterfaceNamespace: '1rr3jcex2abdgfetqztcex1h4dphpfa4azmjztf8lpuvrme88rv4hx0g34uuc0ims70zxrhh2f9tune63hyokrptgqiiowgu0u9pxuasay4inhsdhju9r4c5lkg6d8w1kyejongjf5sv2yvpyeite198ra8jhbs1',
                status: 'TO_BE_DELIVERED',
                detail: 'Adipisci blanditiis tenetur dolor optio voluptatibus harum. Ea officiis maxime tenetur autem doloribus minima maxime consequatur. Voluptatum voluptatum veritatis est non maiores delectus omnis sit odit. Quam et sint nobis. Reiciendis facilis est mollitia qui id provident deleniti explicabo corporis.',
                example: '31b7valc0q47uccr6hn9ouw4yh1009jnzuidgkqghokjm95akpdzvfxsh8wu9wg88olodrhe7r9s5dyc0wp09zk5flucbeazz0cyugotrij5pm8xnfs7z67etc2jkdwwpx9qdbhp7ic88qwpt9rf5tveo4jl2gut',
                startTimeAt: '2020-07-29 16:21:49',
                direction: 'INBOUND',
                errorCategory: 'gw0ttp0dv2lmx0zdr94245avxxzt95n7tqg9vzyw40ecnzuteip6db266hcg2gc87c8vza0rx3uomarqeoy27cbkm62sc0mptzi87y069hplpnxojyth7o38dej6qx0afhon599nsw28zmwaugbcptlwonn6hpv2p',
                errorCode: '098dlmdc52qphuelzeinehpla024gwvocmmr7qq3ujax65vcyn',
                errorLabel: 314823,
                node: 9208007402,
                protocol: 'g39kiefbc59c8hu5wwa0',
                qualityOfService: 'z1dtf5sz4nef8c3w8xxy',
                receiverParty: '6um1p1bl4p3qywzjqg0hm2lrw6idjhmxvse184ivwgcu908enml7ekwqv6vgzwqomud08t6vsa5thpy6cqechrglcgjwhjfnnrpeqya9h8p52u1gchx5lc17ss19arsgrlqgzl5tq0dqinf8cin5gk0ljpwg7duh',
                receiverComponent: '82fsj82i4g5f5fxrxk4lcev2s7e3nzyg21apqj92rgmsrzt28kzgqhcf85ahttirjh56gtaxzry3ysffkbly89kktegkosrjjc5i749tgpvtnnhd5t21qpq4269exa13eczi34zutopryyq1od6ae0e2wmwp1v7g',
                receiverInterface: 'echminyj87kojkgph2kddu5oel55i4xjiph0d1o5mckze709o977yijaxzdzz6bdlvzw7g4ofu4tbq882482glfxl6voi3imivpiy9g2kivldsel0zi9rnczxrjo2zc5d09is67wlxhf3psog73qdwfonic6h7bg',
                receiverInterfaceNamespace: '6a0fnr0dmsowvqtuiv3vwgavzizkhqlr1r2pfowaggypgc479vpqewnfs0fq7dfjm2ialc4ksuy36e1nycoty7k53dfbm87yocj9l3zqu8gqcu030pax9nyyfd7vumw5cbfx7ik3hst4swj2j3kg5549km2v4khb',
                retries: 6754708911,
                size: 8824135209,
                timesFailed: 2724018058,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '8ts1a1xpc571wh607t9zr9s5eeer97tci50dwh288j0vxxuy6z',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'n6l14fc926bqhrmxy3yw',
                scenario: 'g2igdqsfd11b9bm626lx6eoymix6al3c6znzbuo3p2tqewkhck7klw4gpv7l',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 20:08:22',
                executionMonitoringStartAt: '2020-07-29 12:56:49',
                executionMonitoringEndAt: '2020-07-29 04:50:21',
                flowHash: '09qhrswjtnukrh09muqpmvb85jy1e65ilblunm3w',
                flowParty: 'f25u3c8k5ekiju0t110nf3kndu89z4zdq2qjs70aj8vy3s952xtn3mjubd9tsmkn31pwux3bw9atkg6py7c8jg5coj8so2pxcr581aopkg7blueuen069fwkpnb36hh77z35uik2dm2phrag230c8xshp4h4g0oq',
                flowComponent: 'sdq44p3iq7v5h1eu5kykz3gjb659yopoiavouy0pj1fdfzn0uhhar4lqui454523ntk9il37pu1xuepc2jqzqu5gueelhtbsdfia0gsmmfxmiblgaamqlftu5alf2x80mys8r6q0i20igp3xt90vm0vn7a6y2net',
                flowInterfaceName: 'wqwefh2c6n98wsbd1i40n5rti0q8c90sqhitde02bw5i3jqg5feaxdfo4n54bywmyqffrg19zp7nhsocokqwlo5n00qi98f8196eeylic8ivhrjzq7dgoj8kvjt9zosmhcvidydc3bsa5f10t988p45eaweh4yyf',
                flowInterfaceNamespace: 'xgbuv809zr3msyfld2zm7jcynd2iw5xl74rvcpjwrt6gg6dho9fr3nh6ehpbmgwjkz2yq0onj7qqh9xhblk87g9iar3zaxu025f0ntfjya14zhievk4h3o3kk84rhj6ur0mk4vh03wz4igym0vzphq75otia990b',
                status: 'CANCELLED',
                detail: 'Impedit incidunt autem. Nostrum soluta omnis. Et at cumque ut. Consequatur reprehenderit hic molestiae veritatis error itaque consequatur voluptatem. Qui ea libero culpa eveniet nihil autem.',
                example: 'upfl0qcygvznyj5fs5ga5kens3c7rnwalxk45n0hl5qd827halo1e38e14g87nv3jkd5yu575d6o8kxsi9zk8szvc3xfud5r4iclj9axb6qb8xk133bjoj13nepgsjkfcuptgg44ieoavhyq6iausqldahiw3hr5',
                startTimeAt: '2020-07-30 00:00:19',
                direction: 'OUTBOUND',
                errorCategory: 'mzcvqjkv0vpwb9k6cw7gj72txedzt06ew25bxguof4mi7phvdcs1ap4ez498sruujp4z24d7suevx4lfyumvjs3kyu3xhlji27m03hje0uxssmzsoyed711noq6av8kig8mj2xxbbvlkmo594x8o6p30pvyt07o2',
                errorCode: 'pfl5lxzezvzofbmax8lyl2hb8kgkozwxfrimk3sgwllfhs9uy90',
                errorLabel: 358565,
                node: 6952066153,
                protocol: 'x09vx6tigjr8w9bg9syt',
                qualityOfService: 'nbs530p0foqfvcxg5fg5',
                receiverParty: 'pnwsn6i8u7fxtuy5f2zcvbeekwkbig213682lypv1oisqytvs2rp7ojhxjid576bp29g9jg4qrr4lvmhfgmyaae4cuhnxsi6ij7kd5n3hwhb05l0xqi4ne7rvvuj3qha32d8oiya54j3jq17xgns731bx6hb87lo',
                receiverComponent: 'kp1evzlgeqgz0hbtqe92wufu7p8orue4wxcbjp38lvjara4p2v38fiz4onz0g92t6hskhvzqwakn3hxc91oohmqy5g5p7lo8f9jrqb6djkl0dnz1khxd4msja75ajmvxrc7bxzm7pj812i9s0i2zm42kiwh21w5s',
                receiverInterface: '0zfqorelhg9dy3whcl1ijt9pfdvu4pm9d3g1gvzafxxgkevxekqthu73sngy0qrhvnz2ecqmutzcefbfmh9l8vpowfr8sx1jrpugxsxepknehrtzicar6br8gj5twl1xoatqdx0beqi2d9z26sff5n0v21f4s4v1',
                receiverInterfaceNamespace: 'cp43n55ccoatoky3ibfql28ea7k5c1if8zsujvy9jq13wpgv8bwwqiroes4h7u7xnhlnrclr0psp2p21oen2fh3l040zq2s3uv2danlwr2k5beksftqp3d42ebhzbbgxoaz35ktepaut2240ntfc3bgy7nfplybr',
                retries: 6484744594,
                size: 4449123748,
                timesFailed: 6316866123,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 't2r5vonk66f97q4cust3p9tc7dmvq6abhy0n6q2d3c5f3maaoi',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'kcf8ek4j0jc78kwff00i',
                scenario: 'wrf2912i6nk8d5o4ka5w01v2rt1ldv2f1y7z77qdp341qpnq9rorutvah7g5',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 23:03:11',
                executionMonitoringStartAt: '2020-07-30 00:46:26',
                executionMonitoringEndAt: '2020-07-29 02:20:02',
                flowHash: 'ptmga23xbxfeb5cd9o1cq7s8tr28b6b5alphe4ky',
                flowParty: '0byt267nhpegovzudp0c11wd96r3ct1fdezsayg34m5do8lgqosspg55o56kp7z1o3eqekmyfvkjn3m9zsxwo4sbd7aypyux8ezajl2v2i4ibir43t4s6umrbz61h6ovon927oureiuhuagyynqrcjyq4o1yux4x',
                flowComponent: 'w2t721yceg85ttntva0h4hu1k25j7oxkfkyb930jbwv8bmasnlew5955tul4dqnmlusz0mg4309ogtjctrietxk2aarx6qlwp0ppr33b3mwkozm9p75h0y8zzvwpp1rbfwhxpk2nnlu2cjwiq5urg7v6ehd7j6bq',
                flowInterfaceName: '6n4n3fffxnv1k1tlcgydu0yrfv9v2h2z8ctq84z11jm9igcfk99sn0e3089yytgcfsxszqx0smzyo6y092gis1zshg9svdy49emnrb6zym93ajkwc5s9vl1jd7gwktdp4925jxv759a3bpwzpaurzz68zcan3a58',
                flowInterfaceNamespace: 'ydcrjhu79w2rukj5ptcq9edo7wy838zfsayqb2kgqsqxx4pwiy9282d3y6pfttgpyclnwq94zbdndu6lgsuaewkrm5a2x3gzpifz4b1jdritahlt2ur54udl91ri4bjnw75q1c2cfda3wyre1cblzaskizxllxec',
                status: 'WAITING',
                detail: 'Ab omnis quia in dolore. Et at ea modi laborum. Ut quis ipsam asperiores. Sint impedit eligendi cum libero. Cum reiciendis ea enim rerum eum et praesentium.',
                example: 'rbpzez9gnerakkxn979caraunc4g2j5ec6bjcxrh3etacr1uiqnimzdp9oku1bsd6mdqam8sp5uc35n29dlwest6zny5hu9u4hphua9oojx03d9b3wbs1babpg1333lef3yduqmsihhukmtga64ly2302xt0bh8y',
                startTimeAt: '2020-07-29 14:13:19',
                direction: 'OUTBOUND',
                errorCategory: '7d80yuntd0zyztf64i4tuh2m82d6acvioegc3165d9anlv16bzgz6wa9vj43q0p12iiod7sfyzilrqwgtuf9vrl7yp8k4qcqrj64jvl0zzmspa94m112lx95hiv5tno0ps07qojfqkgiqy618tz2bg4q9kzcqn73',
                errorCode: '6qa29b9cdo4wp2a7ajat7s77g6wgomd4t8x6nazw1tnsnsxidl',
                errorLabel: 4301269,
                node: 2592064866,
                protocol: 'snp2vpo0tuyz9ghti5fw',
                qualityOfService: 'wpxiqyzdslzzujujosio',
                receiverParty: '2g1hyhfeqry4fi9myej59uondyg8rji19vnjecqon55aoxyim8un2282bk1koobffixzwgygto1r9wcd9b3d8rjndrjpox31js1dwpd5i639ehujdsx5eivnqdb134n1aovqb36z52abzegwhtd550gr86wcla2x',
                receiverComponent: '6i9ldtyyxsy3tucz9l355ec7ake6n385trkbc5hw0edna6t5q6efsyagi8121jp6me5d6n75lfk8dqdtzi228j41orz07s75gthhu85vr704hqqlggiin2f6t4igk0zpqzlsqp291wcuy7c7uqzy39t0r4cr630m',
                receiverInterface: 'mn1gfrc3eolf1b5ebp3gxmw54gqehyp7udq9v3l0ci312v2u5yrtj8zo0wvp88thjeu5d034cjkvlc8zme4dni4wdbw6klblgqox0fdmj4ezdqeuk8r46m5vw4k7qdb9n2aqb31kmxwfcxwq4i3gd1cpodnewf6k',
                receiverInterfaceNamespace: 'accaz68tjlzkkpxt3ul8gueyiy9y8v8s497voestxrux6bcrcr95cgegbhdml8j2y8yt8mgy6ylkpat49ch4x82wapghskzvns6wobmc6t60vbn09izzvib0u9rg5moj1w3bqutroyt1fzy5vxypxrwu9dc37ivg',
                retries: 1326297674,
                size: 2218051222,
                timesFailed: 1967904293,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'hk0j0xyuxksy5xkw34jkbcean1kc573wisf5tfdt0ujzm850oj',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'k7aq8dpzj0k3l7w7q5ey',
                scenario: '7964ad8ix4zzgik52w3gkpasrcq91kgk8z7dtgnezmu9cilwylpclndj0hcf',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:31:54',
                executionMonitoringStartAt: '2020-07-29 21:37:45',
                executionMonitoringEndAt: '2020-07-29 11:23:55',
                flowHash: 'uwn2lvj5lemuga3phcqzthh91pcb5k34crlraobz',
                flowParty: 'e9ofjprx4puj0ufdcuaei8wi5qj8y7fmzugq2n2xzl52k6kqof8wimku3liaghth49hy561xnwfgo5yuozrhzxt1websk1t55eaka5rw8pb0wtiyeyad1o09ysr6m8jycc2brabw9y23ds1362scwqhe2l0qdaea',
                flowComponent: 'vr0883r8h75miw352vng816ncgh43hl6eoe40t68drqk1d7yoriol9figu4k0i4oxpdl0z77ht1njle5inn55zernhdvsqwy91kzvo5h498c4uosysie0gei8b4gfac3e8ueokbdfz6jflyedt2inrjmwmaemyyx',
                flowInterfaceName: 'xwp7v8j4z33aesj4t2t6fz7f8lgd4leb3fgpqy478rc4osaym42d857g6571mzgvh8garqfk3uwzxdznx5ymdi44tjuc8zvbrrdv6prffqvgj5nzosy6hlqas77vduqd4ggh37deunj5uzdndjgeqkgsze0e7t38',
                flowInterfaceNamespace: 'w02rjuomke9fc29k61ep05xbg6pu5ckldpyzt4hvk1ihtyr9lksk8zt90oq3o8bjhhwpfyxztalq6rpnnz4njpmgzxd6undxjm4zvg41f3q9bz0l2w4hcpj3axk3ezrub6rsxblaxp48x7tyrhig0ssw84scwlbo',
                status: 'SUCCESS',
                detail: 'Sequi consequuntur accusantium voluptate in deserunt eum nihil fuga quia. Voluptas aut accusamus repellendus eum. Dolores et quam aut recusandae accusamus. Repellat cumque impedit ipsa sequi provident voluptatem ipsam. Sed fugit architecto sed enim sed perspiciatis et.',
                example: 'nc0huiuap9aoyh5m9r8qm2ufax15ingere8vu6hzeznxfwdwgfxlt18qu47esulnpynaknbqtdf81nmmp52bj6pytnzovp52vp8ewuhxf2hco4agd1jsz2gk1joydf5og0em7zue1dmog974ckqrlzbiw1yamap2',
                startTimeAt: '2020-07-29 21:15:07',
                direction: 'OUTBOUND',
                errorCategory: 'f1chdtfjumjd4camsrdpbubskhadmd0i1541wd8o01h535g4jh2si1iiab1m1lpojgr5og7wgav7mpsebvpzp1r3kofytrdxv114wekmjhe5xkjh7t2w7nyn3lu7omdty1j1akmzjnx4ijk2l3t92jfcsaf3i1jw',
                errorCode: 'jatj1o5pdotcmzmzowhaeqj707tmpk6eq0p8my70i2bnea536d',
                errorLabel: 445819,
                node: 69995076759,
                protocol: 'ld4apjgacf1v0n89iwa4',
                qualityOfService: '04bh826m1vl4tnh7f741',
                receiverParty: 'iu58aq69l4csptfu33u3cgj1rqyulmajjxd9lyd71q9pomitlx8q49jfn9xdv74epbew9iov9uvozle511b17cbb634d8gui50pm42xkjx3m6fi6o029ti58xxnz8c3qf7ob7s062ylvorxn6r8jmo8hfk4kox5a',
                receiverComponent: '0uvd9zqx6xgiqz8foxi4je69ghg9jamaslcf0yaywvggfctr79ekpj2044635xm0lvl80dqei4ntmr7itvhsuytpprohddldne3pzx0sg42902emllevtvd4ynl3b3ya1fy5s3345t30px69fb7292h96kq27l4x',
                receiverInterface: '9xwk9ds35gejqj6mpj1p5319x7be6paz60ecynep2iolu41xqxlprnf93m9gw3sd0521e723runj2yhtpkg5tobaig86gzotc9g2wdfn4yup3emlfgrf72n4zf11lnpjn6bg7ycctes7lhzu4kbwvs4yep9uui16',
                receiverInterfaceNamespace: '9btfi5vws55loibw3y4pnaxbw1cnzdul3e9oki5h4sfizfjentc6jk5ee4avf64dlqpl09yhus0smmlinsrxmciju2pxz39wrgm0qrgktucx0vba5wnpbj2lggh3117936pt800yu5ymvgm5wltb6nwrkys5r03c',
                retries: 3787003489,
                size: 3769072534,
                timesFailed: 8481973588,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'am4jiftci4gktw4h7gdrx49p8t35voencnz7shytimwkqxml4v',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: '5qhy6lbr3dpe3w2svzy0',
                scenario: '8nxscmdscjaafxknmopgjve2hrlwyn49zpfriuqu7e3o4n50s0vsyp8y49ge',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 23:47:38',
                executionMonitoringStartAt: '2020-07-29 23:45:02',
                executionMonitoringEndAt: '2020-07-29 05:24:05',
                flowHash: '6ztnw28gapo8tbypkm71m3tcez8l3munnv8h0jkq',
                flowParty: 'yonxo3uhe4msnwf1w8q8v5w6vbvrqv5crrrefl5xm1vij0fwcp774jzli0uj95e2vy1ckvuaxph91e4awifunnyh6eeatbdn0ff7srkjsm7wqbfvv116kv1v1ujtn4ir12v9lzl58y5d5c9bfwff0nqm7425gxd0',
                flowComponent: 'fuykxy04bx1moq0azb9db5zjzaq2nr58dejz01899nbstiph3p3033r8zzgkxl8gb6ksfnyjsn7w4jzeopnkcx34qmb6bm25b08batby6l1i646xk037p04m3zmco6nlwogswpox8kjz488aj5qbo4j6xfk7ucvn',
                flowInterfaceName: '7clfnq1awv64wizmzyfk8shyld09oo6ywg8lp5r7bg8d1br9j2tm7zmi22cktaws9yn59jpsrietnukxj0fr37a4ddv952tdp1brkafwwx6h3ph79nunt2qsjinufk95megn8b27zgnqziexy6s7niosr6l517i5',
                flowInterfaceNamespace: 'o66bl85nff4k9tsgyden0x2ogv589vwd0lcb9ln7m2b9adypvy6zurwlry6m4hdaik250l104gkclz7iz5xi7dkr8u5hc7najp9c5i87q6omyw0sliz3drodayfbpie802u6vql5ppmz33mftcsrfh26etq3b75i',
                status: 'CANCELLED',
                detail: 'At non ut suscipit sed tempora exercitationem omnis iste eveniet. Id nobis tempore enim voluptas porro fugiat mollitia quos omnis. Voluptatem rerum illum doloribus iste. Error cupiditate voluptatum modi suscipit modi quia quia sint. Nesciunt debitis eum qui blanditiis debitis et repellat soluta rerum.',
                example: 'vul90nytls0xzn7clg7n27knx9gcst9w1ff2sb6xcm5n6vep143cmdlcycvqqn2ct8g71jveae86h7tirwvlc0dsbwzq4cz33eac7l9rvfcrp1zxagir5nm9nfrxqlm8uyy9o7jo0u3zxjy6lrtbzzimjyxlf83i',
                startTimeAt: '2020-07-29 12:54:21',
                direction: 'OUTBOUND',
                errorCategory: 'uld5mt6rt26h2sd5yhezr7aa5yk1ka0kh5l8itcq012kpsftku0hjky6nvxszakgzgdy2rp49gz42cewuq9s4n34ti4ihobxjzs1u5hdl7qnujuopvntw7k010fulf8uuhpfikalhuxdy4enu4spkk8uyec036ab',
                errorCode: 'j8os8srmtsbcr4l421etz2uvqdm16f34j52ib1su8d8ilshutl',
                errorLabel: 670828,
                node: 6992171593,
                protocol: '36tmnbtersd7vwcedwo9o',
                qualityOfService: 'nv5wtu6c30208r00u5hk',
                receiverParty: '9vpqtqosism8kcrs0of9qebjpvqg8j3lfw5h1vw4auobwt4o56r7kxd0qectvu0ddcmgxd9wni8zcbivon7kr4369u0m5oil2ttp0rwfolrgw2pn49yem1i9ozazglkdy7pe5znl6d677tzrqcimsohvetzc4yjc',
                receiverComponent: 'le3p7hz8kqkaal58o3yshgbdd5p8inqlw3aeszl7hu52ir0cyh4jx07wd81k2o98hvxozlvc58e3g262o9rf43m7nqoo6a9w7donnv797wdvvm5dk8hbrr375p6rhnwewqd2m9xxxzraooc34ee4kq3tehk8b97g',
                receiverInterface: 'ty3jnn0ks3kyqym854qgrhrb3m0ejvc7c85m9ndw27ftct413v5c2up96fs5ohmyykwijtm73wzxt9eoy8fquavggj8bv1wnozn2a5b87uqfwgh0741j5t0vcowii167m77shsmqqihq2m8r985rjzusv1rylj9d',
                receiverInterfaceNamespace: 'cs77nk5t8rv9n3bdppa64hx39bp0u1z9ytl9fff2wdkk73ogtp1p7jdj3po895f5tryv7f0a3duu8znzf5zh6jla47mpmgssn952nsxpftydn6dg1w58kui8tgxleol9wt1k5knxinccb9ov4pxc9vag96e7dfqu',
                retries: 9493837091,
                size: 3875744385,
                timesFailed: 8258401378,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'e8jbe6cc1iuoy75tcah22izqswomsh5mcmcglbdmd6npvhp82o',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'npvk51y35hu6buageu8t',
                scenario: 'cuquyge7scofwa97s3v3azqislstr64dv22m92e53t2myjsdvwutpzj5ytk1',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 19:29:04',
                executionMonitoringStartAt: '2020-07-29 21:41:12',
                executionMonitoringEndAt: '2020-07-29 09:17:24',
                flowHash: 'z52cbowugkv5ia8tnyb2au90xo8kkrq2pe6bs7ii',
                flowParty: 'wn0lixcf9h51dntjlg2lg3qoyki3znnfh3ce51nf478thn2gd9nwvx1dz3cp8xxbpucsk3avwf1qeq3r89miuv3wvoaf5k5rt97tcsb3oya9xgblv3uzq5wek0gtov8wmzlfaznqud2swnzj3gf5tgyuumkzo9jq',
                flowComponent: 'vd4tzk062sg4znk84cy09zkka30916ofn9sm3hs7dvbzop2i3asicnbld83uvobztvykwshioy9i0sx4z0oeug5m51jm6d5n66ykk9xhu0verxnw8pyhw1k1p986r1udroml8er6nmjm7o71mukinbtefvkfbwlv',
                flowInterfaceName: 'bphov12ls4j0zzuiwyjlsrc50qksfp0ot3qn322h3is1o375x9s4ouchbhsehs2xreouwu7pq54hpar95pl5lysj6acg99jqtt3mikuviepujttfpqndc7uhlm20l7x50c1l58k0sjfhmanycgqu3wa6822ij1of',
                flowInterfaceNamespace: 'pf0bks9azq80um2qw80cw612bxpqhunqx7hhtf2jconbfytf2wpjgav8b14l4h71jtzrgsoohsn837clie2a41l5ja3i90yj52gd9yt7xoyzn6ii9toujpupg4m5o1i3jodrfx44caajxsf69oku3kve8z02cuyb',
                status: 'TO_BE_DELIVERED',
                detail: 'Id voluptatem consequatur. Placeat ad eligendi et cum illum in eaque quasi. Incidunt iure repellat quibusdam eos vel enim perferendis. Consectetur adipisci aut optio aut modi ab.',
                example: '02mqw57x3e23hjespc150j36gjt8nciowb2bg1fc67f72sopnzl402ox0vg8nlaiorreiecdjbdnsjcaqqm83gmklj5hf0hvbpui5110w68h541mt7v1tl8jnyn12bebjgdimypvgmvttk72odvh5vi98l99zi7l',
                startTimeAt: '2020-07-29 18:55:49',
                direction: 'INBOUND',
                errorCategory: '2ld7iw9kgkyhwzky1v3i2be8r6cst0tzv9rf5f0kplor28equ1l1ivf67usimb3p8a0q51kwq0gvyqbrb5s4mqsierdrfuhcmxrwf0kefk5vbsglan4j221s7h04cf0by1z2ckszo7npqfuhbxbogagama08pj7k',
                errorCode: 'x1a1em3uubri4hjqt6hixzdpu8uvzatkibt9uv4d1okauptslo',
                errorLabel: 844269,
                node: 6313835019,
                protocol: 'z5evqvm3bpcwrzol0nr1',
                qualityOfService: 'wknoq06tog492cwf0okb2',
                receiverParty: 'fr3vdx2hr79jhlzrz3v5zblsgulehsylafy6zvkak300eso9d213zjw36db7uw8ta0axv2zgu1cy3ur2x3ocwj3ax38if8u76pxju4nsjq20k58aypoqst6eyanps3n92pi4iipd65rqe43k2rqw4ft5rccnob2l',
                receiverComponent: 'tp2dal31oam4u7d60avhukfnd9661rj5eaam44luicpbr2f18woa1872r3jo4etjuovpb59sah0tp00n2mzq0w40lq1wvrzp1owp2ko3zmh1jy6yj564bo7ev9lnbyfaxypyrhdpz1q5ikns5u7i75uljdhl6dr1',
                receiverInterface: '6u5bxm6o8jc5xw20lom7z2p2atpb7xbcb1eifeefj0efsojtd741pcbyaafiqgcynw5wnwqdg3dqmd0rssvrgn1zxolfvq24g0qhcetzugp82v23l3lkikf0pa9syhespefffylkhuvfck4lh40tfv3z710krpz3',
                receiverInterfaceNamespace: 'nxh2xowkq3axkesxx2uy12zfnwpcg4iol75sivy1v124e3bsueuw8vbg3v4y4jzav2azrrx6x4jkcp45z6vy3ua21dmuxxgow4y4xeup3lqmsphwdl7dp92r2co7an7lslwxmrmz81aie0ksud5rwuihhbgif41e',
                retries: 2227623892,
                size: 6635057301,
                timesFailed: 7978992270,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'e0g3tvnnoybc02fxmxpitiaznwqeigsyhmqa4rhlhk3c821156',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: '2i1o96ldhv8mmt7xccdt',
                scenario: 'c5gln30kfv0k2t73fvyvk7ig62qkqo0ja2slkbgcwaow13j6ky08z2tvb0lf',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:52:33',
                executionMonitoringStartAt: '2020-07-29 07:34:48',
                executionMonitoringEndAt: '2020-07-29 22:01:49',
                flowHash: 'gsqszamhwjd7kdtmqktak3ldhm89f9b4mpsta13p',
                flowParty: '5qe6tder0n1npt5vy9b4sa44cgbkpr9lkwz04h6koarpgjvldl5ug9uqzrzkikyqf7fst3g4i99kiyk9vvhnrsdsi7prbk64h609e6es284yw0ckfxk6f1ulaozwku7d7bj24o834cn9mk5zmjy1p4op2cs9t8z7',
                flowComponent: 'ehvb3cku59e6svp76z9cym20sqif2gfojv7yj4r4swcjde3fg5amvi34wlwdxfdk4q917ac0257svxpp5b2sik7remg4stz6kcdu70wxzqxq0tnbzk2kvysodnk6j4welhnom661r83m41lkkk1l91fopk5ldm92',
                flowInterfaceName: 'cczlrt6yhl3vn7rhd1869sbxh34lrrixtpyuf5n5hxprfu38uq8uso07bml9g06kgxmalqg5ys320qzxvwy9qdfs4aujnm4oi9fjhxo7uc8jdv3cljuajlae4gludxpt7tf9gxvt08e1e12b6n9kj3psd75pbqb8',
                flowInterfaceNamespace: '1hn4h312jzxftl8an9o2h7l96wzvqas4tl506u180e7gwvpp92zxknja6b2mxcuxm168yiy1wyrdahl57dolcarznb8rp7u46fe6fiwotcx8l7mfvscsgaq7em6a79hiiz9fp8t2f118o3z59dz8qm6wth7f8mfb',
                status: 'DELIVERING',
                detail: 'Architecto aut nisi fuga dolorum rerum. Neque libero ratione quibusdam quasi. Rerum occaecati architecto et dolorem autem et quidem. Quidem aut maxime culpa aut ad debitis. A ducimus mollitia facilis quo deleniti. Fugit ad nam facilis earum.',
                example: 'ju8uk5elvbt47toqxqubo089vjpsnpc1bg3dztm7q7uakasc3ehj4is8s2emprrtwtku2zlyhhwstwa8yep3y1ha21r7ev1p462g4z158tmkaxmewmaky3g5z7v0ptqfhq7x059uhcv40npqkx69i5ds1ui93ivv',
                startTimeAt: '2020-07-29 19:13:08',
                direction: 'OUTBOUND',
                errorCategory: 'csje788sx76m22xz1jch8lob0cjspi8sgnlrazvps7f823sil6147pca89k0jik96uvjdk9uvrjttz4b4ocen65savbopj7xrg3f9o8gbjhttbrutykm2c6cifli88htg32buqkok2zp781rjpkyiirlsf7admyj',
                errorCode: 'ldkq1ffvf7rpc0z4g1kvzpqu4yvqqb0qcdllhncfovdjfr0sey',
                errorLabel: 235073,
                node: 4915535041,
                protocol: '6jp8lr4u02rxvopsyvfp',
                qualityOfService: '75jmiwo9tdqfhvba1ctz',
                receiverParty: '0lz7db9q183vpomrygdooz701279zd7lm9oqaptqso9ptra5ms0m2jhpiyiwsww0srie98d1fvksrejo01hgw0u7nzbmxhmg95o0segm6qzem3cdmo1zlr66z4bfj7ewuici9zkh5k3m5n2iehf9mwjv6gzzzpkiv',
                receiverComponent: 'lnv7m3822qv0f5xgunv7pkgtk3vxniczoelgae9as8upqwb5pv65kuewnjcca2sbm27mry73r2ijgfy7owadnc5nqvays1tctrsec9gzlpdeaw8l5003pzq8ehzstqtq5vd6ys08t5b53nv9koufl8jgktczfuov',
                receiverInterface: 'ho94b90739cbn2bkw8iyb68wpfe3qr9i8xzi95s92db95eld6426lw8ad6g1zqbipyilexjpuezh1r3hnjyrbfdq2sx6mszv7rnpc9k6hyb83xt98me2e0v7uo6w2hwb3qfbg33jd7snxarmkskvg1vtwf99s8t4',
                receiverInterfaceNamespace: 'qz8i43pdgafdpmki0dmlsthquo1lsbv811sxqinj8zg7wma0oiu2drnr050c5ao5q6kl1q1vihcnt7kwv9evap4vmkx6m8qgbb1fhyiqpwo42ys1s8z826g73vsa60e28dt6z8tumcs9z2ud9arc33e7pif8jsxp',
                retries: 6875080510,
                size: 8674863295,
                timesFailed: 6200007127,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'ru3qujr136t73tc8q1x2yf5gczlbhl8leq30mpi4oq85be9j5h',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'gp7lv1k64jniwhzdq6tw',
                scenario: 'yf0petkgqdpmb2m4n2ft2fye6j6r7b6f78yusi4md7pjziws27uevizktchx',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:24:36',
                executionMonitoringStartAt: '2020-07-29 08:18:31',
                executionMonitoringEndAt: '2020-07-29 01:59:22',
                flowHash: 'mjlo0ldlu2vyfe1l0s5j2sfcyydip89g1gtsgxju',
                flowParty: '83itb59c51zqeublxhjifjzf47p9ij5mkjurxsslq7qqr4ytkn8n7zyasqw7gbptq558lrkkrm11cz5xysrm3a6ipccs7utvroo9xffg7wnykmeyq6yshkp3g9tu9srabz8dijb70vlrha7esssaxntkk1wh0ugn',
                flowComponent: '93if44opca7fkmwjxcnygccf7uks398lsdesjp0i2i6s39yq16bpflrm4c9ybdiwakbvgbchj40e5i7lctkckwsiyur1sja3rxge8xh8pt97gj9equan32ljbxyp4i1qnb90goro6lh62jyt5hm0pwcx62qt7g8r',
                flowInterfaceName: 'rra7wedry60ttvemylcxdowvrlbos01r2q1emufdjjthihjaa0p5lvqurzklzi5k79cyb5r4uycmxt52anbg2mqn4s3fny4ci5xfhofbc1re7jnuibpbvb25836az7hikzxcr3nmmil97crvziiakb1ge2ml50n6',
                flowInterfaceNamespace: 'ts7q5nvmkkljnyk4r5ylbrcyb8rx22b8r2iuy8ltbetghocb4f26lwu1cadnk2iqnjazh1yq4ry7h1ok4xtnaqd1vrmgezrkyxr59j0zge2sjficaowa7jitmo4o4laruk46s6h2a7o762k4kfxz6ox0wkqtroc3',
                status: 'ERROR',
                detail: 'Voluptas et accusamus cumque. Iusto aut dolor quidem deleniti vero eos. A ad est laborum provident. Adipisci in aut fuga labore ratione magni quae voluptatem. Voluptatibus eos qui. Explicabo iure cumque quia non.',
                example: 'iiw4e35ap79aeuwhw7b79covdw9cv4q9fr43devhuy4vsp5mo4e58pj0lbs480ee21qnyugxjgniiqbksd0iorfzt7to5tu4493ccyiy0zkm38rs7isx4slt8a6m6tl9qkj1f5ykd06w94iw8mfvlim9sluwbqb5',
                startTimeAt: '2020-07-29 20:53:36',
                direction: 'OUTBOUND',
                errorCategory: 'fu9uz3x4z67pfr6gb5grm7a4jb0ls2o8qxu78y4vg1qe8yq7g56zwlbussgu3n9g3qlrriq59gc8r4h7uiphpnoxdmo07txh2r2is49ylft42y20z9qvxmfbr4mxpofk484qzp4ruk8f2e3xh40zagvebbvl1efn',
                errorCode: 'disfh5eph9jbv0q8foflqkryi6u6zmxh6q07mf50v2vj0c7o8l',
                errorLabel: 362905,
                node: 8641560313,
                protocol: 'yewsticr78difqsantsx',
                qualityOfService: 'asynqt0f0fngnp826iqk',
                receiverParty: '8f8fj6rtejyihco92xd32p4ggh3uzucffpk3x7ftz7adofcch6qpyf4843aaaxeustred1s1d3yvg1hxdpqpwjxzhbm2npw8d09ggbklcq8e106sgqkmqlvs9hfrsd93q8q7svn4n93ew6svpvanxnunbgyb7648',
                receiverComponent: 'b8em5swi4zsaha8kklvcv62p6w2rv6bpwo15h4ekk3uwtvfbau00cv176oe4olmeqf8msk6uddqomxp52ltd1063t92ir3gm3ms2jvc2im77vr06e005s5y80fvwjrnveenmq3odflecs0u00bxff6qsdm6zrglan',
                receiverInterface: 'ur8gdjjz4h4pbq53tn28wquk0iixof87kz03un1htggklrupwsil85bvdtwftnoyegcri62zu9cl41o5jeai5o27ea85yemusjto6nagu6imh7ypkmy94loeeaa8mg3qq32tev62lio1yb35uw8io7h5spmk9l8i',
                receiverInterfaceNamespace: 'v26o2f2o9th5xt8qrvghcsllu0w83v2h2heb9qfglapbycx7se82s8l5w5rs3k3uzsxew8xwamol9m0gzoyvdmawyxnfxjevl232qdtwlbtzyfyk6zd1e5ybtd4xepzsx3mwo820i0l3izcnn8s2elk8twuah4gi',
                retries: 7324299233,
                size: 6634769455,
                timesFailed: 4353476130,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'q9xy1dg72zv0uobtu9wyzyv644c0kpth649vgscje5ha6jusb5',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'izdf4x3dqwrkjonp2d7j',
                scenario: 'bs0lum2e2guciebz2w7xab6xnf1lw66wlnwetqs0ymngpz38s0m5h96l7byh',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:04:05',
                executionMonitoringStartAt: '2020-07-29 13:03:39',
                executionMonitoringEndAt: '2020-07-29 12:22:01',
                flowHash: '0g6eu5j6o8ju3at5axitplrtr1mqnbd243bzi5sk',
                flowParty: 'aqz8ewokg77v4h46lpw02fmi6u0l0o7gmxlu3mkbtgai337q1xrvbkc9diqrgzma505o88uvas90j9jkdg8mo9vbpgc5trkq7rbdgkex6sau1ihh9cmvrtuj63mjysot90z04foqrnowya6waq3pzik5cjjmz0c7',
                flowComponent: '3udrbeynq5ll25aje3mamc5lipd56end2205f4zo14o4a22mx589ixwb16sgbejo9mvfqkp0fn8brkqofikoygkj9x7272lwrge4cd6ghi4038dgft66rv0mj9wuw9brkqr3q2zdg4bijpu6cqb6ufphhlzksxk2',
                flowInterfaceName: '2fhkro0aoiurts8uy2v6urvhl3ls5buj69uclpu88npjwud1ssh49uqesiyo1ym6fwg9sajarnioyzddpihzi0q5c5bqcxrms6tovtimzudeavf6rntfng7skoqe4b7o1efdhduzwii2br4shqo9i7nye2qoz0at',
                flowInterfaceNamespace: 'ozk8cs5ikmjf6e49ogr5qcef1lmc4xgtph2qbitgir8elqb3cdkc2qvro1c01la37naobn4u9p4nxtp0w2coxny2eda0cn4fzhkrlreeklhsyhc9fbt7uq0hx2tcuxk6rtvopj36m29mxexzgpc70u4mu3kilyox',
                status: 'WAITING',
                detail: 'Sunt deleniti numquam et est minima est asperiores architecto. Omnis sed animi. Dolore beatae amet.',
                example: 'qtzxu6alnyi7demaqa9427zzwsncd5enqzw1kvlc5hum3eww5ysf4ndt7crkzavrr9nml240vybvlbfhb93apgmbfff2p7xg24czgweo9pw14j9ltwq9ldnhpjx9xjclwx6w991qncwosegul7slhx09fwy487zw',
                startTimeAt: '2020-07-29 12:19:34',
                direction: 'OUTBOUND',
                errorCategory: '3qcuzhz8rqz7qxfi9sp5trqe8es1kjhukbxinev9w0g94b5spht1nbc58e4m7qvvsr7bgjfcpsz7tpl38moelqbv7oxvm6ryznpx5db3gveuakow64lywg0zsjhpwcbexfkk99gqeuuf9hbuscs7zev5afpjicrx',
                errorCode: 'hxmvezvzxaljo8l8ycbingcycpjl47szofg5u885habgh47kva',
                errorLabel: 781857,
                node: 5049107439,
                protocol: '2469e0buws4z7ec1ay2t',
                qualityOfService: '8si0lk6ca7o4psur6tde',
                receiverParty: '4ivgcyrl058stnnemts5256n5vfv3r4xid2y3ghiprci6bjk8cur114fu1xpitwzbzas8fizwyjx6f23ms4g10mip8uvh495sscca62cvb51hb30a2yey450am7et7ydpz52cfgy59996m1rcgm02lrtd7gurqx0',
                receiverComponent: 'nq3gx9qolhosmw604b1c8fmcbvuug19tngtdyi8byy782dmejl52wcbpbvclo8grps4ed9jgugqmb0rxoivhjvo9kyjewm06u5yqf77ww01bk6quja736wmzvvwnz4kg1eon5u5zfzxkiesfx56k2x14ynixaitm',
                receiverInterface: 'nh6fwjead94hfwcelbzkwvowl8hkwfgr087dgnexq8ejfejl2wqk8bng8wp5iyodi3q4ftb3djhnemivvilrn8lr94aaao9rt5l85cr43dolbx68fcu9rj9zexkv90cr8cqsmd664j6zftzon8l2ftnrzdtegngt4',
                receiverInterfaceNamespace: 'np9ddnsm47m22w9tu0smxe505h08j5hqoyk9151nma0l13pdypuiu3gswk0go2lg2kye7x8lsy00konlq2m2bplvnmgnspnic0cgzqsz3cbdgkt69ymqfmuc1affsyqv4ualkb2w24pfz9c6823wyndpdtt9thhj',
                retries: 4405382798,
                size: 4234582401,
                timesFailed: 9905887461,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'rvpxdj4mc1kew5ek6ja4zutmufxiiczqfmlfxbflba54owuzwy',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'vq0bkftx9tjhwwm7hzpb',
                scenario: 'pi8dx7y7i9mo55gd8qfhvox2axjzx0ma8mqyz4w07n4you6ydt1prehleq1m',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:10:04',
                executionMonitoringStartAt: '2020-07-29 17:16:13',
                executionMonitoringEndAt: '2020-07-29 22:56:53',
                flowHash: 'rhbqgf8yxb3rjfsoq7qkm0sensgw5gr5g6wihusy',
                flowParty: '49exkb1d4biu1nry80wo5wfi72tx4081dxqzxccabwiy8z0epg0m5qnz6h0tsz4gqska0rpuelkh4bqczisu5ods2zki7t7plj5ti9g70e14kgzz62tcqty2jil5ya27kq6o30lhpwagtgxw9wkjy4bxdojlngla',
                flowComponent: '5n9p43ujvi6otud6j7r2ybho6oygq7awd8qzkgxj2ty0hcq0mlcckxv6xby7yyxc0yw0lxrae1hlrtmwjczie6epgul9i8o496twzcygcwvb11jfaiiogtra2by5d4lj2dfzr40syaj1og6b1as39746c0t1r4ck',
                flowInterfaceName: '3lqnoh7t5dro86nqcv5z8ljvy0q5ylj3wntn0kuji5lqnccfdllnu8hk2n6m7ftlnj9cjnmi5eus6n3hvhamu4crrmd9mgmcachj53a7fvk9e5ukurpdk6ycy99xsgctr9v6tgsd0p9fwd7pu6wrnqy792qs4p11',
                flowInterfaceNamespace: 'mzxdsr8gtpe839nw7asf69fvqjawpw3wwaakmao0g8dznrqn67pjds6rqn030r8kg31thu43sijjxdvlw5t106y16cel604mvfb532boqkvonpidrxtfu1ynspomi03516k0uoe7enp1cscgvpcvx3zd5zakl0b9',
                status: 'ERROR',
                detail: 'Est vero ex qui. Praesentium consectetur delectus. Ea maiores enim et. Cum neque facere qui suscipit libero.',
                example: '4maapz6lf86544261f6b9mrtbiwrk4lte3kt7t4c9ej62bkffzvvl2bhj73oeq267v0jeq6ki6jgzkt0it0h8trg4xc3i0ltw9ixjtlqgj2zr8pobsl44lmaaq5offlxhelendd0ogsvv940720qoopyxl1suowz',
                startTimeAt: '2020-07-29 19:34:11',
                direction: 'OUTBOUND',
                errorCategory: '3nnul1i990of46drparb66zrrype4uxfksonrqoihuujrefks44ycs8rniq8rwb3lojjc23kdp0xisehbm9klporbudsexjy87hvadx3mx36xvukpt93ki9al0oq2w9a1j8dmf4nrmtb714lb0oyztg2gudho31j',
                errorCode: '6vwqco2niyoiyu971u60hl3f3970ufshidejm1oxiuww6xb5hi',
                errorLabel: 291708,
                node: 9356705450,
                protocol: 'y0zart7xwrvgt1uzdzyb',
                qualityOfService: 'n57xnqvx4o3c6lva5tig',
                receiverParty: '1s0lj0kkafmzfk5kyigzqrb5qkb3bhv9qu28eehu6p9ip5e90cnuk6h4a4nn2z27wdwdjqwpp8lds391yatmftte3zypgklsg786ct9mdmfu34uvdl60egpz03mdpwk6hmbi5cpv53shun0kdpyjv56w0qac858q',
                receiverComponent: '5zp39yld8hun593dvii14sfizhoxni9ii35ln2h2jkcuyjalvkg8c9c9wtb5ki9pxm0q8vjamkee8ue9zowdei6h5y6z5ibfcgxror1gql4p71cxypz4v9dolk9rk3n8vr9hp4uprfz1bqhuyquc2v0r0sadu2zb',
                receiverInterface: 'shsq2w2yjje76djr42mgk02f2q6emast4arm7g52xm79ano16hh48qxt0pzoyl70tu1ik7h4pyi62s72h94zur7mru0v31z6rrxd6944r3pnsd6kdfwrf4zhphymcckwhkus789twlh2bmv2034izg8r7zym433q',
                receiverInterfaceNamespace: 'r409lmnechuaz8596v66gle5cwfpcm5hexwca100i45iql8s8xuanzhynbteermo1k4q42k6hh9xhn141ptejg70f3qvx98eeckx2vg36uqj0zv2tnscvvvrkqu7w39hwffpj1mmxvtrk6thmt27pv1byiuirvq86',
                retries: 8389349617,
                size: 4873218521,
                timesFailed: 1530968701,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'gcf034fnpz4m1bwyoe2mmkcdfr2z021rew5hkudwd7vhn5820y',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: '6ve3l6zibw0y7upbzdec',
                scenario: 'gdvgkx4wz8zbymqd092w6fzxaanmiu175g4pl1zcp2rmkjy5lalxp15j1vx5',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:10:32',
                executionMonitoringStartAt: '2020-07-29 20:48:58',
                executionMonitoringEndAt: '2020-07-29 12:43:15',
                flowHash: '1425ohgfrwv2ybu89ply5ywsv3xevzcr6ghusseb',
                flowParty: '1s4k3x18c98t5bp5ueac1u0npitk808bj2j6559ippwe9chtlxoapbiyltb836n1oif62p62lqvf4c9yd3blwdectgzh3vuk47ebig6gi5tpcc6rpfq3wuoq6b668t36ehj1i9pui586bjy8rumth6sromupeqqv',
                flowComponent: 'vxs8toq8hd3ggeo35u9bgo11aym1ra269ndrqs7ewjn4d21ddeth64vb4yv7yu3yeiz8rcegciwriiw0l92ckzs7f8h0vpf48sj0tn3qdklkmt5s67lo1jxflywzfew0kxrtih6m94p1lf8kfhnwwqqmb27n5m1q',
                flowInterfaceName: 'wvrpger3lyf0airobjx163c2avn6di1v9xf5iobsxiiesb7y51maytc00niwzw2b7ygfdmz47kdokkb790d2c827zq4ashbocxfbg2xcublu7n2v3p864bjypd24t7uglnih5nx1d6p5hvk5nm5ylah84fetiwrt',
                flowInterfaceNamespace: 'pcsys1luq1v1rm78nbf231tocqhkw9c9y5nsbv8elq1am3bl86cemhsely5a52ojqg26bult4ahlknx2gw58kt2ils4e7am08lvv4i7lscc8kmlfe2axld8y7y2mc6pwkuk5bf3ghfmdj0znzeqsow60gjeynbs7',
                status: 'ERROR',
                detail: 'Nemo repellat maxime quia cupiditate voluptates placeat fugit et. Quia corporis saepe qui ut expedita blanditiis eos atque omnis. Eum autem ut sunt. Voluptate velit consectetur voluptatum asperiores sunt corporis non. Totam laborum sit aut delectus beatae magni aperiam incidunt placeat. Reprehenderit voluptatum sint earum.',
                example: '4779ouqqpkq0qyltx8cznfcgsklj7mg2j018ve1ipydqn1cnpaek9iacwtnj0pu2yx17xavexgn0i0xbhmj9enw48b5dmc4ojktk2sp8lj7eg572q7wels4jvey5xgpmzcsa4q5bj1dy7hosuoe6yxczkbq4m8t4',
                startTimeAt: '2020-07-29 16:32:46',
                direction: 'OUTBOUND',
                errorCategory: '527ptxcv6ontnmpot94kh9fiztqi935c2s2mwkq7ub40agthdcered64wdnmxho5qbt0i2tgbt7oy898103w9seehxi6sdf3yvcrp111z66gtqhn24cxv1udxwspx919tc01tr7az29meqx837rxwym16sh8bfdl',
                errorCode: 'w6wx0jduzusqi57js4oquvkpm6pfl6uqeaicmwyqjzikqj98nb',
                errorLabel: 284856,
                node: 2806790361,
                protocol: 'xf8skscif2r5haszxx8z',
                qualityOfService: 'vzft7aimcin1nnmuwp4f',
                receiverParty: '6t8q545zjfiafzcbepgk53md0jbm2942gmzgcfgg9srp984m15zyg1cf69obm09q3gfvg9gd9nkvfct7upwbu3wcejq207nxhkzkvybxtbroj4myu1vgtaoh16uvu4zc4fi5e699b3q6l8ky7fi9dq5nmb21njgv',
                receiverComponent: 'zvv5frr35kddnwedcne6wj7zdly60c8smcmqjuqxo3f4oreug0vfwiv2vsyaabdkq3tmqpdevlyc4xhbo7ct73rpc4wcls58s18k3lo0lv3nbjukr94d8c2jxw4htc0t62k9b5uaj0ppk5g85cgt1nfgss17y6zu',
                receiverInterface: '92zo3ik6zj764ajfd74o5mpsz9i9wy7oo93k48ry7bf3h3t87fc3mxslqrp0xqh215pw9x1wzsuo1lagg5nto8b6mk6au3rvkq0ook968egoehcspzw4t57hl78k64lu4y9o5k6mwp8org5hkzhv9fzr88ft8gpy',
                receiverInterfaceNamespace: 'cj0szqpbiaeljwz5iz59na2ctd8tvfwmm41le5s7vwgd1ecvtnkrmp3cn9kvabcoygaz0agkc04njbhf3zdx446n6trsa7r7jlx9mbloy104pi0undm8xdwk1gclb01mdwg1sbenu61hwzfjxua0gm8qnp16w3hp',
                retries: 14786144932,
                size: 9730668423,
                timesFailed: 1150287329,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '01tr8k7twzkla2arsncs7fu4e4vd8qkrg34849h7wl2o58xmec',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'jiev75j8wu0rhdqlj6n1',
                scenario: 'lgilcospg3ci7ar923781hr3bgzm4m1uw9vihqp9rogknbn9guwtmgctuhra',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:48:44',
                executionMonitoringStartAt: '2020-07-29 23:57:25',
                executionMonitoringEndAt: '2020-07-29 08:45:39',
                flowHash: 'tlz1p86zox4trkf6qdntj1khv52bjwydkp838u4g',
                flowParty: 'yu2ofoeq2qrt4mn9yvwntfun40zt0pj7f37kqs3jz524jg49n1q9x5djjhdos24oa4ra1x6o9q6r54juz5t230sgd80xbbsg2twoyhbbdkhdlbf3h0c2g0nllg4px25lz6em9fxr218mpja8c7qb3z6l39mvhtf9',
                flowComponent: 'cgk5rb1natk27ov3ulch5bl0wsijtn4kwizbpcnkkxhodxlylaw0l86kibh14anbr65r32t1xxtkgoaxujetqrjdy75g731zzsjfj3acvcg2kdszrws2d1pepzgydic384lpmwf1f4lvyhash17mzoucgfxl0akz',
                flowInterfaceName: 'q0uoo4d1n83j0m6wbrdglu8ghqhpokyehq4c9gk49kij9yu7tzo54dyzqzvgdl56u1vpgx0jd7w6lmz3yjnud46bgy40heyqg7f0auc0s21angeasf6uigunk1ucl2caa2gnzm8uuuwwj3ui3gzb3twv1795z9t5',
                flowInterfaceNamespace: 'olsn4i6irerxfvz0o32l23bgk8oipxj4tlu786av7bb1c3d07581uyywagqn9uy73di2qspxoo72wl53ccrjl1mpjek3nf2lz7doo1hxxpcxijwwl58a25aolr8m1ywxxtw57se0f61n9mk49ke6pyhqplrdwj2m',
                status: 'TO_BE_DELIVERED',
                detail: 'Sint aperiam et. Distinctio commodi saepe in sint. Temporibus saepe accusantium. Eos quasi cum. Esse ipsam eius quis voluptates aut voluptatibus cumque. Culpa deleniti accusamus quia.',
                example: 'oh8rfje5twizd5cr8axuse5ov05ltifsy8yd279gzdr4qxbiyhpp6nj8ydmvwhbjr1i1wdjz3ixhg33uk2swxfre329l84xygztl95wk77nmg7zrg2i6yrrgswo9816b52n1lhhquc8l10asptq4cworw2avorso',
                startTimeAt: '2020-07-29 17:25:30',
                direction: 'OUTBOUND',
                errorCategory: 'zrzxfgzon4ixzqgfqainri15x5o2vt6ljwqaum81f92z4fmrn5angvueyijzglx1vt8shaln73fmnl17r8ol7ois9lyx54d4a0ancmvzxzx1p40fy4ccaejf0s9wcycgsjcj6ejeqwsvtlhcn5olu2vyhlgfdz8n',
                errorCode: '1cflhhgyxf3xi3fqmymlsbmrclpbdkfu34vu2wdz7lnd488gcl',
                errorLabel: 641902,
                node: 6101980240,
                protocol: 'bnahqizqlmhn0xgiulpd',
                qualityOfService: '9niyntlweex3r3ypyat6',
                receiverParty: 'ye612eg5ihmzlqodv8snis3ahz9y3gv7hipa40v5netlrifcihrx32fupla7ajs6oey0ixwopoccgjvwqn3he3q7fo2n68vyockwnbho4ti7zed8m0e9k8fsib6vlvr1ookub0pj1avn2ol37olxh7glwsgg5nai',
                receiverComponent: 'lzopujhx0kk03ai84pixszuxwb2izrm1cyxq3b6d98nck359tc77onlch8o2ij51uqz350568fe3kfszfrn8iq2mf5tenfoo9hynrqny0qsnzrfye2fsne8kk90h5uoc7zfn6wc974pxrd7wqsieebf2hf3f8jg2',
                receiverInterface: 'yqvl1y4c1ckli0nfupwjhxon7eof9s9wek7rvqn27a1mqxeu98b10h33udki76g31sohb7tzx0hrqzrhkjkjw2qy6ip2zgk51ch34rq1ff6ziue0fvmlz6irdfsflxkykj37jmnrrqigeg83l94ogtphp3ca1zod',
                receiverInterfaceNamespace: 'hkph41i64st0395snoty1tgnu8js3u77tgj3bko7bccosv8brvrly5e1s286c356o1zi3yh3qmzwk665orkuil71x6z5bbarrtxqlftgq8rshe47g3ncyqnbli042n4490y97od3dxos4va8xi2h9efv1h3pocl0',
                retries: 3428579658,
                size: 18892100114,
                timesFailed: 3681505270,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'ekqtrm5ayfo4kvcu5ngjhkizuxb35y91cgw158qbl0rf4i533x',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: '5tr2rblo57h1bmzw9so1',
                scenario: 'm6kr3597o80581lalpywntl5r3mewebkemhx0pfy86zf53n8dpdgqg8lbel4',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:44:06',
                executionMonitoringStartAt: '2020-07-29 01:49:47',
                executionMonitoringEndAt: '2020-07-29 03:18:06',
                flowHash: 'vzlwuix8z7sna2hem7tu9r5rkzxtzz6mwptuhc6s',
                flowParty: 'utr0pxbeonqs2h8awu6y5wayslraymhbvggk3ibozgxvpi5i13c9h4hdjh93mo263gsbm2p9ewd17pgr0rcbee4k2v49j7m14kj4xpvecqdc2pmm4cffb3q7d88uloot7qf0cay77e8u3pgwf0wzx2r0049ei5dz',
                flowComponent: 'r2mt0qx9eruomevia24qx0jeyvr7pg1hh0npxtrdbwr93k5s3e7gv8wi4jqliyjdegsgw1us46n507pq0g9k08fxxxqxmkpfjp0eh2r18srizen91j558swgp50e4r0v5vynu66aaceewzivupo5eh64encdoek1',
                flowInterfaceName: 'a49wq0shzsage8bip21j78bpenz5c54p7075sq0y9jmk12774eobuhebfy61vjr4emqj4rcuuaywrk1w5p24x1wf6n2ywdxrta3e8wwte4i4u8sa4fwdudp4po0ndg9e2qqe9p8rmyw403rri3rpoh0d256sbgci',
                flowInterfaceNamespace: 'qe6u46hnv5ua7zfdnr616bvgacqo0kae4jn2npn6ajekdtd7ix4obiqaw4cxkqcqqciu7xuhcj6xsbwinpnzdqmf0a296clyg6wiqr2lh3edt3n6brvlz9gd9mpqjnszaqmh2cig4whb7bij3notsxwc9di1buso',
                status: 'ERROR',
                detail: 'Quaerat totam beatae est quam consequatur omnis corporis. Impedit pariatur exercitationem quaerat et error aut ullam in eligendi. Nostrum aut ut in et eum ut consequuntur. Voluptate facere optio exercitationem asperiores voluptas. Ut sint laboriosam ut repellendus autem velit reprehenderit voluptates aliquam.',
                example: 'e0pf348126ylzu95qifueod2q4nve31jf43mui8zvv0ckj132it74m50a1e2wpsrvhm9tf88kszvsnxvyj8h5v36bpekp35gwp3kr4x434eb08vyhaqxm3yne5m9awv7g9llimbiu3yg3vik9o3yzmpu9rhr20a0',
                startTimeAt: '2020-07-29 02:37:04',
                direction: 'OUTBOUND',
                errorCategory: '0wiy0q3acfnr23vx1e6u3a2xwuywf0h43otpyujj81qbndqcioeelbdx9bfavs48rab7t2vj3dw93ksvggaouegmhkgy2f7sr488zxtgq2u1i3frstr30pnz8b83vmvgl7gda5ggxmogy44nalq4w30yabfr1lqu',
                errorCode: 'ed3ah0x0ktpk80mb3e505wfswjzs2z168yqt7pif58sddjilqb',
                errorLabel: 282670,
                node: 9469860787,
                protocol: '90e0tm4yq2yzv1ks8wfm',
                qualityOfService: 'y29c9scevrun2vrfy3vv',
                receiverParty: 'nxv6w4ki9htjvb9p3yvi1vt3d64qzteqiabfncgezfkcte8te5jid5062zo92fjnbo9dhyii0zgz5bb3ap5odh7yqzp4cvpdesttn91um4mka25h0f4h8f1yxk03blvd4jpw0dzgnz9pffbiygdjlw4fpzqfb9eq',
                receiverComponent: 'ru2s232mzwg3xy39m0fajfuwoymupmwiaaej5unerzhxjebogo427okmbvo6olpazcxpbfrtm7zezxozr2r5ctegncg0xrkn660ibakg6nhbj7o86fznh0ay1krscb1k4ifamzn8q4qm6nv3oh6g8buaq0ngnib6',
                receiverInterface: 'td8br25ef3nwwh9d2mgxbvc83bi4vqnjt3ofiz6jpnaxywoq91uly2hukpsvhzpdskfzqcnffo4bjxgnl2xnzgsqijh1yviq7eji8q9swpefa8akzjymwgu32o3lg5tv7xojgjulnd0hklu6a5eminsfyun2evyp',
                receiverInterfaceNamespace: '2gfjxgusx41bw4n9llohdmni3bsssosdhsr5p2jrehm1f9apgul4oar5pg0wyl8adh4pvqaml0wmmzo49x7vlm31oejjn1m4dvc2xgaep79e3d7ng2kmuspa5me024msyci0dfhkkajfd49ri8bihiag0ws9uoor',
                retries: 9318212708,
                size: 8893843042,
                timesFailed: 16323512854,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'ibvjatj27bycsi3ck4xi1k12rtdfui0lpclrdbvmhhmqqxo6tn',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: '2g1w6y0a6ertu0o8ueiq',
                scenario: '7tgsotsquf7bw528gwjs4n6lccycyrojv57s89prtdw78q173wv4xfbrwi56',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:49:21',
                executionMonitoringStartAt: '2020-07-29 12:52:26',
                executionMonitoringEndAt: '2020-07-29 16:49:15',
                flowHash: 'g692xv4zasnzb8kge8mvqnc8vwv92o8j4qd1drps',
                flowParty: '492zm1xcnow196c6gfg5shwkhzhsh2iwn9k8coeoakii5cmiz62qxi57wctyr0p6jmk8yw2nd1tz30e5d4imfrgeeq2edjd88nnu0bas5w8s1p6aue28l9qffr47vmta1rs05wgkcu3hkwtwu55ixb35wy5r2okd',
                flowComponent: 'cbzwftavfor8lzvp1jjbm20zo7vfe87r822um8oxvqh9o2oepxmqc2xhs32daukezegl5ps7tmthygbulgfvw9dadn8ymgq8jkl0097s64azzslt70x7dg8yudg0ge994indrj1ouo619o90yth2gvrwk1sqxop1',
                flowInterfaceName: 'ra6xf2dpxbzz47kfqvlfwn6h4d93swcjm8isc2v9n3995jgv04xgltwfdsooj2lhkdkosgkx7iyegqoxjj1w6k2xt8z7lzs4xo0w1p2hejc4l9v7uscypupxmfufw40ratjgvouts06idq205z4qicbpikypu5yi',
                flowInterfaceNamespace: 'e7wd0oje4y1f1zqpqnflrpmvwpfmv3p2p6342dpszmss1ar3dptgkq0ya6s9c0hcnhjlgqhagxhdij09bw1n71u2zcfmqd20xbkymez1t3e1y28zjrxfot47l9u4hvdyu1629vjz1ykfsnr28vbhd4wgesbcv3pi',
                status: 'WAITING',
                detail: 'Accusantium eum dignissimos totam et quibusdam eaque dolor et distinctio. Veritatis voluptas nisi in ea earum animi. Qui consequatur animi fugit numquam expedita explicabo distinctio et qui.',
                example: 'k27rcgqme7pzvlc7mj2fqmatkwl4fyslg3w7a4gjfngelvqaqknpt5k3om7j3mj49kyzwmpyhfvk2ipf4285ntf0ppdmssl2wevkvcl1hkl3gag34fjnl78y4rlrpof8kt1g23mz7nizao8qlvgb7mb9k31pa2s3',
                startTimeAt: '2020-07-29 07:31:33',
                direction: 'INBOUND',
                errorCategory: 'g7rdmz7u02x9cumaq2d5gcn5xii5odndq971a4dfue43uiv7ifuys2wmnaetm7bwhr2khfrg872bdx9j3r73ft5bldisub37q8umpb730o5678eyt4peoi9mgzzo1vckli9qqz5mf3gxi55bah8qinz3ri5z29uy',
                errorCode: 'lf64sslz8ru3dtizgz9q6fgkwjk3pqsk3r0qapwi6u7eue065v',
                errorLabel: 730913,
                node: -9,
                protocol: '47ar65kq7w168xpa1yry',
                qualityOfService: 'dgevyrmn4nx585fhksqb',
                receiverParty: '6i4aaj0jkucjjhunfptum1jgp5rvdnuytwjl5o72db3blh6h7b2nei8ih6wxt1s3gtlarexsm973gzo5badsifadjhf0whqlatbbi7fa9wxy8etcmskrr3xy4rckz324523p1ac5fac3kxyst1ntjszbx4g276wq',
                receiverComponent: 'ts5d03bx7w4hsi7p94bu49ugv2vn27bjrv4hgdqmzpm18sftjrms5swbypjgas843r4gxmtgwsnm8dt1zp2t0mo374jui84zp9wj88oa73hujlb0kvt4v2l1pnqosjmtokcir3atd11m03qw1uzeuku7riwb3nmj',
                receiverInterface: 'noufrv52izd6uxsz6aaabqroijmhx94za8fsbzlyl3yzfs031q0lnxbrtjbpcsyleekz4gevjceic1tpqxt56i3nef0jrv50xqibti2kyv02etgtz8lymq7rxqgfveizg3y7dejgx1q2rpttgredyg88ti8foavi',
                receiverInterfaceNamespace: '1rjdluwgwifv3dabdgi0zh40c14acio8njkslja3bn6wrunsnr49gi3ea2giiual12kfp0if86q8pchlbexnhu8ewopx38mkgbtfb7kwevxxpkf9g31lerdh4aozboun04v7vy7wo1y8rtk9dsbxpavqtioimq57',
                retries: 3576820945,
                size: 6506826592,
                timesFailed: 4389255092,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'wlg66nn4nx5brjsxz3c1wtw53k1tme7cuujvnsvfnzlfhkelkx',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'h26yyk5lpy7uwp5nvphq',
                scenario: '9f24hvv40q7x7fyib2dy8lkqshj7u8j2ojh8shnvh5k6h8c7qtflxukofrno',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:29:56',
                executionMonitoringStartAt: '2020-07-29 03:59:56',
                executionMonitoringEndAt: '2020-07-29 10:46:30',
                flowHash: 'b8bbtjrl1ydk06vacr0vo1co6dsjq29nwacwz5zt',
                flowParty: 'cuiokf66cdkn8v6byndmyiy5bws6jj3huxg73sau8rw8wa3bll4h75psndfl76z2i24p80hphkd2ofmmvc1z90xthu9gnzlj9ldrhaoubzwy7wd6iwsecj1q2oij6fv34kf05ddzoxi58hpe3418nx4e3buslpf9',
                flowComponent: 'u5djkt52sb2ianidishhjjid92eutv3vi36ry1x8xakhmdiej95d9kieilqphf7n5nadpnp8wl22tyw7whpw9wvzdkwg3gl4e4qzmrzsok7fqid9xhwewfnpfylep1mjnzjfy6ku1afgpld7mxemwwt9chm4bjxz',
                flowInterfaceName: 'bspp80fd0pimi4sp512xv2w9mf8ecei9fdgs7sufvwfd45nzocvdrg38o48zv6t5kenjoicom004k2yink8ltivsbgf3a1zxxpv0jdu4l04hin47u71qtcuclfndix85hz8fa3s28nn06ypzivvw4fvq3rodnbzb',
                flowInterfaceNamespace: 'w5qtd0xlkoq07e4j994agkpubfgylp53inuypa9a4m15fpa3b8hnzhtkbrza2a9qt33208mfh56epg15vd0o7dar3bg6gwigmsojdpiliiamivvnqr0sonf0dmzc9dbwjsngche8igx5dcktenq655tkvg3w4r3i',
                status: 'ERROR',
                detail: 'Velit a quas. Impedit occaecati fugiat consequuntur ea at ut sit. Omnis vero et esse at quam ut. Voluptatem aut error eveniet repellat corrupti quos. Iusto laudantium voluptatem architecto doloribus nam sit sint et quaerat. Fuga ipsa voluptas non quam.',
                example: 'r5fslu2fwvxgu33jlq2ail9zg76t639avsquq37zztvg3mxr8oekzxddjir9a186a9n5aklukbbtfhqnyw5ztkhljv2a43jt4xtay8p1dzam6b44t6u7fdmcvfr3ibem5o710i6l3fdn3xeigu5wwa7gn0div9py',
                startTimeAt: '2020-07-29 08:40:56',
                direction: 'INBOUND',
                errorCategory: 'po20u04kolsv1j1tq8mlh3m9no1yltlz7cjvqp9965mvmj222bh8p7j44w9jm80ey6fouprkk2zbf0a5dcu15do3ddb1tbw0toj2pu9nhh38rp7eoalquhdjbs7ikja8jrkmpygdo3dcecj66xvlutru7omn8m1x',
                errorCode: 'wp0te2zw4c205ucgbu4fnud15xdpgg089mdnelanpq5s40ktah',
                errorLabel: 917996,
                node: 6632783729,
                protocol: '6zr6ht3mk1kolskqw9ko',
                qualityOfService: '2zm6zulttvq9kwxtrze1',
                receiverParty: '3k3kuhnzme58kbhx29nq11jb7usylccbi02anqxw28kbzmd8dni0amu8q991kyqjkm89sb2vt7b595b0bjx1tkfipubp8gtd62i6npbr9r70ka4ayfkwcupksw754lbn6eo2om3k3vm8o2c3k55ty5i0037q8qjv',
                receiverComponent: 'lp79m4n37xf3gurcbdf4dz7ckfv5fti5t7dnq86b6hn7fkvjfvcdukwrzvi6zfqilfqbaa9e7ymjbuwlm2kgzld8oyag6gbdh22bll48sfz4uig27o53ia0j2x8gmwltna9mskcxxyry3oyhtzxw74vwa351dwmx',
                receiverInterface: 'osg3kbf2mqdraejtrbvhzl7zp6idys1ufapigfeldqt3m4hvs6u25zt2btm2d74rec394u43csrajan1r193dckshxx30yae1lsguy00f1tq6hd9yzh8atc5audf1a9ateo4ff2dco4ylzdtcblsplb0sc0szpc1',
                receiverInterfaceNamespace: 'zm98c0rbjb78jpyh60u0hk2gv2h52zrft66rhn3wuz550e52jyiz887xflwgy54t8ze13leam3a7qtqf993x3kgj1niancag6apmtzkuanudo1gaqnaozc7uunsartadctw7atxqljic8tjrelg6o946wi5hpz96',
                retries: -9,
                size: 4867629689,
                timesFailed: 9492560653,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'eo6jeqsf0hk2k1s7e1wl0c5rcf6s33dy4boj7cnrs7vv5gpm2c',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'llrqklqx5j65fo6neq86',
                scenario: '3citswq1o7tlbdpw2g4xisdq9kcokja1e9axjnxfy7knp65mimhuhctrtene',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 00:58:38',
                executionMonitoringStartAt: '2020-07-29 02:57:24',
                executionMonitoringEndAt: '2020-07-29 21:41:10',
                flowHash: 'nlf56q1sf3a2qzgscpnmicaftgto5c5wy66xw6ez',
                flowParty: '7oiext6209ssohrpuwp481tg1wbgr6yg4kh6emwqu86lmhw971d8ovqtgw2rr99eztknx7d33qmlianfs12mmh7hxm0l33kqhg7sm509web0vtbr5a4z9u6mu4fvss26e0olft8863fhc967dx8vfual4828d4um',
                flowComponent: 'mcd5fsyav7s6b3jospej3tpitiag3ayzaeolvhy28gadm6jl2de9u9sh0twuql51fxd62gugtgn29pnjsrypf5k6sywm7gd9xy7gqnr0a8hyt9wwcj8tmh8c4bj3owzs8z4vxg6y3o2866ktwzml949mx1d0bi8x',
                flowInterfaceName: '1l5dphtmqthv5lfbdfh8rrppyhcpo2621grjdl39wa0fb2unfcejzskbg5x2hi4dsdjbpyv8nm0j8caxbiryz8n0r3jhwdl3noscjhjmw50zdrg9xlpc82dk13y6tqbe3vjsln2oh4dqoe8elbjqd5m35kwmqru7',
                flowInterfaceNamespace: 'y8lnx5i6fxyeszy0yisdxgtwljk0lsrg19aahjcptveqev6kjddnwz04fg1ged5cbi48vo4qly8un45n3jfkjeh2s9cr9m18tcrflmlt4br6n0w6lwfn7kdvk4defhnfwvb4kvqez5dkfxeafyudzduui6xuad0v',
                status: 'SUCCESS',
                detail: 'Natus dolorem omnis quod quaerat eius cum dolores est enim. Voluptatum ex et. Eum ut et. Blanditiis commodi aliquid tempore sit non quisquam nulla molestias vel. Soluta dolor nobis est.',
                example: 'jgpb2ofl6jslk1qhma42tvn0n66nrv4i9mv8e8ab10fogjtab9u9cu3a4ku9fy1u0yiu34ct6b08c6sbx9tw4xxvqyxyvkhae4wnl88i2htb4ifmismue9vj32io1shz351rcmsyqn67spdvck12gmkjcvroom7b',
                startTimeAt: '2020-07-29 10:44:48',
                direction: 'OUTBOUND',
                errorCategory: 'cw6urycxrrmu9qmwna0w8txvjxjbkpiup346cmycnl2ph5clq45635utmpl1a6kwl55qv8p4qa9oait9aw3156t9bt3uww9z1izm0smmzkc7q5exobh0s2czkii6egq45bns14vly8prn7b61x4839k2xz78uij3',
                errorCode: 'nrnw6fpx3xj3c2owtcwhgatrblw0mspi696rs5mfelgwoeb8ct',
                errorLabel: 239668,
                node: 8350624440,
                protocol: 'ixaplcm8vp36i3yj73ay',
                qualityOfService: '36l43lqjl06g3sodajva',
                receiverParty: 'cw27czxp06z6ew6n7ngdlj9ds7h2vqldp80yee8ui6tet2msv0zmttjo0g6yxka73rl4omulvneaq6lfzykz3188bbpq17qcyfr1ozip9tpe0hkn317e45gtvtg9uzjm3xj04r4t3ngkn5c0sq9k0khl2yg0mt8u',
                receiverComponent: 'g2oalrd96zxdiwuhbe4onlvrgfcodakeb28urmeyq086jxbohoa76n2ivy7ikqtoy3oqhbnao3j5724rrn9bq3off66j03ev6fy9h270nw1lsvbpegjscigxvlpwvmgsrenw78wq0ffu6x8ujvow3zwtj4kkwm3l',
                receiverInterface: 'xiju8jsnw93q5wmdafg71q4d0d6v5ctw34fohfo0spqv66hef3b8mtuov4pqa1n0f550p0l0qgrsu1ey6bsku3yr3ntvpejvduy1wz49s4d8rynvkx230eens1enkghbh2f0v127tpkz3l63ajmkxo8dz29gnarc',
                receiverInterfaceNamespace: 'b2g8n7lum9awu7zmc0tf6h7lvdbggfxm8qry8fserhzo3tg0d3angnm0armm4bd1qfucg87xj6lb7lne4yadk4nh7pnuwlc9i1a13t6p401gpgk2w2jly9tjf19yh9ys6pjp6jeryx8tx39uqdojczaab0m167bl',
                retries: 7408121619,
                size: -9,
                timesFailed: 8179511430,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '67qh2e2u3d6c9q6j59ozzkx35p6m52rz8cztxd9bch8y4mllnj',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'pqhz64pf4bwm2la8i9d0',
                scenario: 'abk47lrkh7ukn8kvjo5yi63iag8qtym3s5cjdqogdns3ocmz86pa8tlrfv3x',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:20:06',
                executionMonitoringStartAt: '2020-07-29 17:27:31',
                executionMonitoringEndAt: '2020-07-29 20:21:18',
                flowHash: '9orz8oaf21nz4j6uzpr7br7qi0pusbv8jn2c9mmi',
                flowParty: 'iqlrlhwxzz6m23ljcur93ht6caqnlalzchxhr2zwwfbvsgkwqu3enb21m213kx2i2025rklfci6x5pphztvtrvunov0uhnmavo4ajgmeo0iiib5hs2f85xhv3tevtbfcf2entwsbnk09pz9vi4z63zd0l8563wur',
                flowComponent: 'or3hftzi61dlt44u9sb4at7a95k88ml47rxa2v9zysakd2caul71uy5xc4riehby7169msrt9qeggtaky98dpkh91nyaic8wddc1tulzdd69260lics93iqcqmgitd7vfiuk9smwwlqf6gpowu4yr9jausata7j7',
                flowInterfaceName: 'tw7ls9f5gi6l207dyierwl2l0i211ptaitvyfhexxjcwh2uuvqodcxoyqypyu7vvs6bkvlkzuhudx8vj6gvlmuvmd6x1u8irgqw49modnf6s6dffi39wn2q70ghlqj8xdroems7xa9ce6n3dm9bj7vq86f5akogv',
                flowInterfaceNamespace: 'b7cf41ilzkqh6kw0rfsofz3y006dh7vnk5cb8f9j4olxz94xu96axkil9geuaa4oi5cydnlyuqfh6lwnh44rfo93fljix948ght1xvwocp7f2tpnumfcmajvo3giib53lsqhh2flj6pp9nxzxam2rjvtdofi14pn',
                status: 'HOLDING',
                detail: 'Doloribus nulla qui laudantium cupiditate dolores sit atque. Iure laudantium et dolor ea omnis quis similique. Dolorem dolor blanditiis. Nemo in aut vitae fugiat.',
                example: 'hyl2si3vvnjyl48ttawdbnz3tnc7dzlh8re50hd50xm0i94rv3jfaszsshmvhxlio4a1cha3xr505nmoeb9djd52obom3tli7y3zenze6wd5swuz52y4bj8my8zqc2aq8xlht6zekhyalgyc4ja7euxtdoprybxd',
                startTimeAt: '2020-07-29 15:43:22',
                direction: 'INBOUND',
                errorCategory: 'm8oa0697l2az24jw87o6o6ytxilpkvu5lrm2gtmr8ib8u6ogo0owqac0opphkjksw307ccs0rkc0yejk9nevnajbu6ouah04yr1mlw2wklb8954qzzokgqa41r1um5zysoe6gwa7lq1un2ak4t2unyz9zi1jfk7w',
                errorCode: 'mk7jcn386anaezqeqf68e1oxivh8d2slzr61xfsu8ut66w9h24',
                errorLabel: 437312,
                node: 2759291309,
                protocol: 'tdq0y0ksyluxge4nxjz2',
                qualityOfService: 'nt083hdk7gx1vdy65jlb',
                receiverParty: 'y8a3gnjy3unkaopknrt5gjzrz5f35qnmiij7l5mwydsmssp4ne7fe3hqsm79t7apks3vukfaa31e5bi6lfoucjfhlq26u7nu6pst05t56osdgi7vin1q9vua9thiez8ixkkca089qaywim6xrwu46x8uo65is9vq',
                receiverComponent: 'd0w2k92hpbbd318gwyoxszwqihly0p27t31c8pzailiccy2ehongtin304sjzmlou1gdemryqlxgo95jwiqzryru3mxf82zet2v4oc9kd0krhfh248cxgah3l92vhnnt8p6l6mn5xba0welljnnh0o2trc0y4w0u',
                receiverInterface: '5bcti9ky0z0hx9pb5n9boe543kepiclmyjhnmxsqnkutvff4k5hc5n11x06r718tssdq4hwukboincfvaom7tk9iqus1482jm89jnq8nfolm1yyuf4dpti86pzhgimoip1sgrjaw0wcy2gl4cxaxvteu68bpxpum',
                receiverInterfaceNamespace: '6ttoovgyuf9ldjdvgq44qd6371fbgau2jwl8attu425ha639dtnd4lqdua4pmosd6usdnpa6mtw02nd67ty1pfanwgq98vvwmvukag2432u4d6i38fhq3kcabhhj6nf4n699efptdjxxi3uae7g8tj90hg1pjwir',
                retries: 4665586257,
                size: 3876911688,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '9laqfl36jmrddwrkl64y8ckqgak63gsd66i5ipzfbslask6d9p',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'rftua24djsxu1t9p4rw5',
                scenario: '0ie67y7uo55ole2jvizj7nbebthpiuxgcgb4teqad32ntxggd70zea34iorm',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-30 00:27:56',
                executionMonitoringStartAt: '2020-07-29 13:48:14',
                executionMonitoringEndAt: '2020-07-29 02:52:57',
                flowHash: 'swyvye8mont1hsr0tzqq2rocaomvxh796dec909q',
                flowParty: '67gvo068hw3qpdbenwxhtkas4tcpfae12vq6ush4jm9l1ly53kp7bcjxyzhbqq6ixv14ij8qj0y2q7xzkdf8jf41omifn9bcchoqekqkxs8v4vfanbox341sh72gd110nfk0c8t93w7c0yhcqoskk9kmsly75uwi',
                flowComponent: '12nfs984e5bjvd9m4yz9qg2o3b4hshgpj0pykx0ghu9iexft3coxlmsmcsabfnouq7lr1tqch7bmjs4yftptse080dybdu5txkxfdbqdefa0z0jtoahzletxv383ho2kp9sgyxxv0od604bd5nontbpq2qhut15g',
                flowInterfaceName: 'piugh8gbozodte5fk3iwpzzut256nrl4bu4r33eesb1ur6uvyho48t9lqd3b3e1lmsipo3y6z2knozgj8wieslm42pf3qdxzcpj7vgtg6ef1h9e0qbmj5m0dl6xn2wbkc616ayt0l1s2lwb3hyliw99xbq4impnb',
                flowInterfaceNamespace: 'stlryhbsx464f8neek2ruqefbgd2slurpjsag5zx5etw7tft4u3e6sbe9n0y1ka27bax1d8vytwtjfz245mcrlbwtlwufu24bbypa7q9xigfkzn7gtadtuzyvfv1cwhat33nm36p22zkfalxct667bwzi7cvjrld',
                status: 'CANCELLED',
                detail: 'Similique qui quia officiis expedita vel officiis sit. Exercitationem sint occaecati atque. Ut quasi hic iusto doloribus cupiditate doloremque veniam laborum. Ullam quae voluptatibus.',
                example: 't9fyzf6t3sokq2shrr526aqx6r8c7g9tvj1e6ox3a880uc0tuexc9bin5hjqes9wdzk1h85fs7niimyc3nmstq27vvrph5v2d4wlwvj2fxyb6qxjug69xvy2fl33lksdr5499te02ub8ixzgxescbu4sdd82faak',
                startTimeAt: '2020-07-29 15:58:53',
                direction: 'OUTBOUND',
                errorCategory: 'c1b840yqvam2htk08cileam8vz05lpa196vqg127afe2wl9fl1oil1h7cdh6q6hd0ov8cxpkkda7vvd77zymazm2he9p3vnicmhy9dj72f95fjzdwlto457boyqqwsv95jmd9s8ej53f297h979gcyzoq597q7p1',
                errorCode: 'p66fip379e5bhnqvcz0vj6m1k3bpo2yuvo2n3gcvvfw632n9rg',
                errorLabel: 329043,
                node: 9098591545,
                protocol: 'nhabtitq9wt0fh0a30kd',
                qualityOfService: 'olqyi1c0scwcb00zhoo0',
                receiverParty: '8j7wd96sedmfllcec4qwjbtvwrvlatof00judymazf7sv23oj2cx9vog4f5xsblheyg4znrxjl7w82r7lmxjx4qkcx1qb7nj1i7seq4ndfuukz4f0t0u00tae3zsdrz8txoz9evkjxqtj6es9pt5q1v48ruvbquz',
                receiverComponent: '4wo6lkqrp64dx3thaaxdftyte3l4bzd8yrdee90zvozdw9dl6mjz7wu1jn8vr1tl92sipsp4uk5pkn46woyfn2vmcc86ukbf92qvdh97nxf30m1bgh9zvlh5muolagi7me7l33xb8xvjqwn7yoqvpiyp2u62v3gr',
                receiverInterface: 'swc8k2dx56p7cl6m3h5acpk2xxis59xjsprqsoru0tieht5zrx6ie4ri5qahotlb3osfq3pkrpl8yrjskp7ft43u17bqiqc7hrulwiu8sbpg6jqf9g355ez2z271it603n1bqb9kv45wq88xtoowpewv305o6k74',
                receiverInterfaceNamespace: 'r4kfuxkm8x9d5xs89362gl4kzwoii95fspythm1xvdxuomjgunq3ot46z0hglvxcnelcc0uj5818g8qzwiji99ubfxi15fofei8djdy5uuzt0jkf5nns10clhi7v7ayfpqs3d0mdwhfkygauk9fhzzr14pkgue3m',
                retries: 3861925560,
                size: 6167692104,
                timesFailed: 9064110919,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '74iwfbvqskolr351wdhs51nfb2sqql0j97keqm6fszd59z4g8o',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'z5tanbphi59hkrwiuf24',
                scenario: '2zcli500s7lajp5fbl9qq6qvankdc9tlrl9mn3ymsn9s3c6p94bv3q90bknp',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 21:35:17',
                executionMonitoringStartAt: '2020-07-29 15:29:40',
                executionMonitoringEndAt: '2020-07-29 08:57:42',
                flowHash: '5g1qq5waeelf4gog1g1o4t4lxx52lkmlvrsr90rk',
                flowParty: 'vu3tahe5figkkh4p1b3h4s78lwkjc6sc0bq7o55ap4fgqjqz5w7m1s3rjjzeyldm54uh39nltwkb9b4n3q6weqezuti60vjhiky4c864hzgvfv3hnwznhxv5pw4yojq1v7pta49cpb3ai1svnwq4i4eikc8lcngl',
                flowComponent: 'x4okhbo20w8cmwflxii4aa6ynkbts7axvla2drcfhfim5z4vs7xml5lhvs5spll2hviw4u4ty3eotqccezn7izshnnxn9nr260ur4uxyeguk5bpqz93d92efgyf55mqm34b4bejqwoty6rdwhysvcwqw7eui5qdl',
                flowInterfaceName: 'kwfhymzxkni2lp2e5z41svhdiw3icjj8unqm8t5enk4r91z0ylhe4hymkv89e8mvj1l1eoqiymtr0ezgxoi9i21lhw6razegk2povur9xqvx2fwgr2zp9j9pv3jr4lvgke3296iw18th1p4cu6duhu2joihfxi7x',
                flowInterfaceNamespace: '3a4ccwypl5t2h1edk4ohut1i6u65kvzwor3v9zv0quw5t843fwatnnnzlvkhn3sy2raj5fa2v6nnm3s6l3z8rzdweos50028xnzu93yfcnjf8e39ybnqptpu0iegbcg612ac7233bzshvohio7ei0becz75jjorj',
                status: 'XXXX',
                detail: 'Quos fuga ut quas assumenda. Maiores suscipit numquam numquam nesciunt molestiae tenetur voluptas quisquam sed. Corporis consectetur culpa sequi esse impedit minima. Optio aut non doloribus quis adipisci dolores. Vero natus sed consectetur aut. Possimus aut aut aut perspiciatis.',
                example: 'ej3s8suwp7bjbvipi7c4nv4w5ukef1a6iyu8r3f9zvnqc6tecx6n2qsarrlq9c8v2scdljp59rsyp1eajzt9njquanv457qfhkty5mwudbn2pr8t5x1prtykw4d8pikjntrd4rsd9edhj4ylykyqjyz19eb4je39',
                startTimeAt: '2020-07-29 13:17:05',
                direction: 'INBOUND',
                errorCategory: 'flqiplpsylhhl2sril3ifbqwbuvrz7ldg08sd8i7s6oxlaxkc2931pel5d1679w9m8qqm4rdddnf9v5rberu028grduov7dhthuxdahfwqfet41umhceu4q26dl9djoocsp45uwhbxzo0vcsa7myn6kw5icogmw9',
                errorCode: '45ckgdhguy72ctoc2pf8rr8nbsm3q52yzuxs2oethgj8ocksxc',
                errorLabel: 156476,
                node: 5147830294,
                protocol: '1xjn9100o9vsbngugguf',
                qualityOfService: '85l1g6re8s2fdj4wtk9x',
                receiverParty: 'q7kpiuvjvgz3fpyl771gdmjf5414k6xdwwtl3b14wr3hd0iu9asx1rh7vq262q3slez24kobfxo6u1gpxr60m7b1op9tulra17cdhpx6qbd10uyzzzhhfih8bdlwc2o75o5i08ye9df2q7ejugok824iji94b6hz',
                receiverComponent: '4wat3m83ain78ayk6xcyl1u8cr9p01o8ale5a9wh2v3bconxn6710pou08x3wluxv6nvnvyd6ocz8njb1yjucn8407p5k8mei8eemampx32ndo25wh2310fdy1suaz8ljem0msknl0nmij47dbcwc6omgdine504',
                receiverInterface: 'dxa0xn40y89x4arp7u65bmj54t1vtt3gx45ohx40csk5451h7gdtb4ulwva5138qgtgn06bsis6hud1z1q2clm8u553kyh8955kruv412vbxdbn43v0v9vqy4asppislc0xri45m8vrdyowqyrvfrhao7mb0d9gy',
                receiverInterfaceNamespace: 'x51ec2j7bh7kxe6pinumqqtc9i4u4gdw38hydizpm96td9koz8t5j5i0iezg5nxb9p4r7zyq6fi3nfmycncf892qb93ca638194notbuun4be6vqogfjcvtp1qq96ecbofbp8ca8v4szngvzojybxs73ebani8xw',
                retries: 4786957324,
                size: 5822335639,
                timesFailed: 7823373573,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'gl55kiu80a6o3qllsqlxbcso37j2zenh6s3lgxbssh10ek6loi',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'ttcgusrg6d2in1tq44h2',
                scenario: 'm9j7tuhhtj5je9bhvkeyhn0empg8fwwnk39ale8n96qybcqq0rccfy6agyct',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:33:46',
                executionMonitoringStartAt: '2020-07-29 10:07:30',
                executionMonitoringEndAt: '2020-07-29 22:21:10',
                flowHash: 'e4bd0ajj08ehlfs5pibc99zh44edkihxjpvju6fi',
                flowParty: '2rnqmsa3gmitbij61rr7ldv8clh5c7dl8f3dy9pmp8n41js3ui9injt9h1y67a3nbd59t1aj07zh0bsfj9cytijkhs0863lvaqwsm7pso8a7wvc8hr55q4scv5o6r04v7ffpu3x4wvz3sawkswdo7rd6biim9t31',
                flowComponent: '2056n28285iuurvx985eui0yt3fofhffd68cpsakjirsimcx8ga5rpyyi8kr7tdwlnrg7ghunvie6kdf9jfmgw5kej3knm8k7ky9r0diszckqybs20oeej7bi52dn86tcg8nfmoow9rgn7387m59sr9my9ipilw6',
                flowInterfaceName: '5mms2z08v9s8fkncmtqhessq9gao7rue9ddm5asbwb8hdc8yhsqu1z7mgnznxm3rkx4rlwx5u1pxbqewqd5jvx3wkjce1021mau6xfnlaovdkr2d96ao67vftopr268o8kof0ape9uh4yqm0sgdynm5auhxl0tt3',
                flowInterfaceNamespace: 'yypom5kjpq6gd0nx48h72lqim5fem5755p035b7bsop59wwzig6zupmsm663hdkr9nwtjcyd56q3atifyxsxdvip6j2z2fr9uw373clv78tuh4p08el4870wn7pwh6qlqbdz89yxzu3n3wvm8joivhkyowmstzh6',
                status: 'CANCELLED',
                detail: 'Et libero assumenda sunt eum fugit labore sunt libero eius. Quaerat placeat ullam quod ut omnis. Vel laboriosam veritatis sed qui harum. Error placeat voluptas voluptates cum illo in officiis natus ab. Ducimus animi aut voluptatem minima iure.',
                example: '6jb4hh8b5n1o46rhqqfo30cwx2n1dcaad4m6is78ml84vy1i57i4r0kd4n3f3syibec9kiezd6gzsquarzbgaqymogrfln3hwx6b0dfr6m977mwt3hrucsw1pzydualz2n6fgo8p2tqq8me22bgrkhkqick4khl6',
                startTimeAt: '2020-07-29 06:47:50',
                direction: 'XXXX',
                errorCategory: 'ke1cn4eq2pqp15seu049kla53sjoxeinicp4czffglolkoasli7zi6rtfajcp5adll5hd4imh0o5zd7csbt8ye252fxiqb7s5fx2yzd0eygm6chdhh1mdxwfaaniz5doc7w684ftua2n4hlnm68h4rwjzcg3eumj',
                errorCode: '4i6s2u3x7302u7m7qv0scbij6x41jun69902pfw9ksuuvrw7zv',
                errorLabel: 418871,
                node: 7603169484,
                protocol: 'mr60forpd0k5rk8tuv9b',
                qualityOfService: 'dp6xnpuff6vnkjrymxr9',
                receiverParty: 'dp48p76h3letct3nzbum4g3vat4ceea8dshbd50r4t5h5e03q6sy2nns8b0oyziaw94abydcv47to5ldq48h760rvl7efisl4zwbsh7khpoqi5bzw8atyj3c4sxbx5wt4af5nu7dt4si9eclmql5ardccidamfun',
                receiverComponent: 'wfsp97uwykxzxvbso6sjmaku3xs0vteelvl6n7t6a85iu5763j45a3i2omvy5fw4a4vj1lr2y0wxjt0sjv4746y1dlsicvdbkmm02p1s7gur3n1j3ts7369gmzq2i0vq1ayaj2q3g7c9kphzt2eu096qex7oncaf',
                receiverInterface: 'kzyxfr8s0mice8wczyqczduggwemgmdavx0o81x76g51dw9skb4uehedflz170pbtw9s08j50ckwp5j6sbs3avkz36a5lop0ijvz7wr0xrmotyxa0z3r13mwpbjqkyzpdlyr3ptj44rq7tr3l9lbtgyazig6bclm',
                receiverInterfaceNamespace: '9bflmtzag76tmn2cd4d58mfo2uv68pljt9nsgkmfpdm6g6c61bm2h6vg2807cz0qlsp7xpa8g5ybpjqo8djw97o1k1bumuqqhlt045v3j0du3h1d912gqqd33936jgbx76fa7k968ecf8kic7pjbzbyc7tszdzes',
                retries: 6474725999,
                size: 5951398262,
                timesFailed: 7464119034,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'h7eu3iwsfyismiif2zu68a2bukg7ut6oljxozpfkfkmndocsmp',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'hivtclhxinspv2g8ntpf',
                scenario: 'l1rq4qnftmaoblu0fnn5u8zuwxtu9lrxthar3p76th7xx7xswcmxzi3snnyq',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 09:32:32',
                executionMonitoringEndAt: '2020-07-29 20:58:58',
                flowHash: 'k9zxlivbhq3jhh8lkiybvgfgwi7qsj0zcod81vdd',
                flowParty: '0c0o0fps5c9ai26muk2pyq33lr4sgjvgg2nhwxwxurdnrjad3wp0gbry1fj2lbbxkq3cmd9o6n8mdbwhr7ezi3qqb93xj7w3k0m43gesgp8xzjz8uvxepp2wp3kony48eh0s7yhj1xiveg7elrtd3u0xpvptzir1',
                flowComponent: 'nr6l3hz1b0bmnu0cwoygqx6ooffrvfo121vjdbwap6b18a4l3e91psx79so22vztx8rxlrsw1niglo4iu6fqhc9usypzm4edkdmtvnuhybqux52h3uv72vydtec709yunzh5cvbi1v1dg1f67m1knh30vrldsc3s',
                flowInterfaceName: '1rjixe28iqoys8krapx573g50w41skcmpj8ee6h3229qrbjv13u8w5jdhz6ebgxjorofbc3i366rrghagwy4k7mhnw0azcqbqs47ilw2qa4tns2j5olqydxt3mnqv7bzh3vgvdj9j23j8p5b1txg7nvz4n3xgyy6',
                flowInterfaceNamespace: 'vkaoz3t6p7pbza3df46v2y86g8dvo9otql1j5z2v9aklex4uvcbfnbghhclh73v52lwe55su3y023xhgkrxvt0hjclymae47l0p19aefvhnrgprj07wlesw8c437ao0ssnu3eo3znjqkrkfgu8wewa3p42czh6a6',
                status: 'DELIVERING',
                detail: 'Ea optio eum accusantium veritatis eius in. Sit sit repellendus omnis nisi laborum numquam aut consequuntur. Enim omnis tempora quo sed omnis dolor illum rerum. Dolorem et non recusandae autem quis cumque consequatur eum.',
                example: 'cx1jiaqhp77z1d8nxd8t7r2qrr9xr122gtx96srxfp1n3oq17bjvdv193r8hphnaaqb3u9ism74azo8qlqd7eiky4fbsuviyuu1243fmvtalmmz8ogpv5m1oacvvicy6zg5z2oi51ar87bccx3wrjdzv5yt4fg3l',
                startTimeAt: '2020-07-29 06:02:18',
                direction: 'OUTBOUND',
                errorCategory: 'h331pqyey72nzqnq4ycbdzrf9lw960dshbnptpo84h92x6cntmpsq8ew6fjeekgtd4igh48s7d3guucvugc8zqs36i0i66fbhlqo47v1ujzkr78s1jmk1qrz2ax6ew71lbdsupdyafe6eru66746wn2yuj2zfqfb',
                errorCode: 'ldenb07a3332d1440861tv8tg6iwavstqc46unkvsdp1o55xby',
                errorLabel: 567411,
                node: 3922796911,
                protocol: 'lamj0yi6c0lzheqcl9qu',
                qualityOfService: 'ysxaicsug5lk3o7x3m43',
                receiverParty: '7xr3r3vrsa8yafw9zmh9ceyj14jk9059y129bahpx3u2vkkklsj4fosftyu0afm4571liaewnx9348wy345hi10segy0lkyykqxwuuahyz79yiogvjii9bc0c9d8upkex4s1j3ao1bcz8g1lbvbl8fleg99r0tcj',
                receiverComponent: 'he1yqb8h4pgq8e4hytjiv37e965sp571ee7wirozgp7wj4vwwqd9emwlzp23jvojr5hp7nlyaxg6vswltt8ho5c2i00hkpfwjyeyt5ys7t12hoqsaj2l79zmlppiuuclx7xggz32c6pz5twhyjfk1drjhzor18mz',
                receiverInterface: 'myg4us2qsbteobcr9cckcikdcadbt4gjduadx1j0nx7pm9cck5ehgyxqr783stn2466xg7n50ynfy8x4tk1y1q0gp0skdw0ugey4bkq0vds1e420ay0x91j1qvoh6reuwvsb1vihgp7cfqee1wk020ogtywjd7px',
                receiverInterfaceNamespace: 'erk47y5xwlsq5hsjn9ut606hm503e8d3z1eiltwlrjf2lxaecaf7e39kzcidf0mtie61o0imt5sepxhcte9txe7xwnzwknj6pg1uh57h68v5tgpbff7y3x6f7uaq3zq46fkj8nqxh6zs72pmdhzl15wv1fzfkhns',
                retries: 2731214537,
                size: 7658433539,
                timesFailed: 3933647733,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '9xj9of3jcob94mnb5ezzi12ope1q5p67d0p55buulcxvjip0om',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'd16mo3hvbo0pxygkawck',
                scenario: 'dx04ez7mvru2rsz0acq5xrm5p6pja0nl61hfo3prqkzli9i3ve2la0l7x7ef',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:16:28',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 14:50:17',
                flowHash: 'sp9zk7xdz37y8z3kayj5afx000zgyyhu1g7m5ots',
                flowParty: 'lorp4n27rwzjm6gy5aqfqf02r0dvvbe0lt8eypl2gn118jdr9kalzic1tklqvq0n5hy7qb1ivyzw0vjg9leqycy481p53m9bhg85rpdhv6y99w6ezcd4oayhzy5lor0jbe7ums1h8qratm2tpp8t7jx0488giivs',
                flowComponent: '18cqzjqye4c8mczd8ostvmnqf8f7v7beqfmnezgkds195voc8c5kukarzoitrtiq15ncsqedbs3koj63nx8vrlnacoho1amdnw0qv7zkfsqwuzof5buv204jrpo5mi3ix52as5caziq06sfqtgp6kmfws1b20ani',
                flowInterfaceName: 'rzlom3xs222jys1tu4yceh8n72c32yi0mekq8rnv070zutu0kvwcvjk8ior1fvnm48aq54iku2j5xu5yug0qozvmob8oks3ookxezdd9ow2cckzbgv034d6tcvtgwtdrssx55icxe4deek4bopfh8eg7jhqbokgm',
                flowInterfaceNamespace: 'f03nnqkwcuohgnnbxt3mo9tp2m084a1y164m9jri08di8579fnnbvjlxdtn13i76vlr6i3i1e87nc74qp9ep4kng8qv0qtxa3136d42cx659evhsciz85oi3p6b6kpqv36qz6ei238mevnicj9k09tl85heiizey',
                status: 'TO_BE_DELIVERED',
                detail: 'Facere perspiciatis ipsum facere non nobis dolores et sint. Distinctio saepe alias repellendus eaque. Minus nam libero ut. At consequuntur nihil amet consequuntur. Maiores beatae unde velit enim et ducimus doloremque numquam repellendus. Dolor sapiente qui saepe deserunt facilis dicta adipisci.',
                example: '3sjksoa81ziiu6qtujwgmlkdztcg1usquskmo2oyo4m46cwxxb3ur9sghsooojwx1n6dsppgw9szob0o7jncr40hju4xejvk0pbcunyj3ogqmexkynxv4sfodlj6vly4w7goudxuh58oh3okydldwfd7tre7iiq8',
                startTimeAt: '2020-07-29 04:19:58',
                direction: 'OUTBOUND',
                errorCategory: 'cigspsbjwriya63bnsr1jpfy7753wh22tnrhxrsq314rekool7guhhe83xqmumgzjk4earyvpgtr8sez7jhtyrds4ontivumzp06bvur4zhba4p6nd0tpq42hcimsoz4b7h3suhbi4mesduzbygukxc2z6tp7uqj',
                errorCode: 'tl08xnejgh2l5uzjv3vand3hgoik9jj1n6z24lovym04x85yd3',
                errorLabel: 983987,
                node: 5784055834,
                protocol: 'ra6nkagf2nwcbcl5yjfg',
                qualityOfService: 'eaxfbjbtwz7xqzfit4qw',
                receiverParty: '2wocwstey1kp52tl60sm77kpkvxwaxvvvkhxgurp7epj9ikp5thvtw9b2xcida57rifiyah2zilm2cb856ox1wipafab8a65ka9ckgpzl8y7y3nhxebz1ssuukpm7jnxc06xz1rcflqwrrleevwlbm0ty7sgnq44',
                receiverComponent: 'jzi28b39g2z11518sm4rg9wime495t4a4yooxvqmt6r0d0p7ccwic2lveqg1d4sh3psp3jys7gcasgttdrk849gmgwqbrmvar68e83bv3obj3wd3pbss78oorr0sp0vai2uriz6zm2e7vu28s6bbdk6bldmxjtyy',
                receiverInterface: '73954ce0rlx73zxlklmf2hkmf9brar8kuwpuxod1ewcpsdlnz7xo3q3uvavwnvdpk3fyqofhkuonhsmgr4ebb4tj1y0kxs7rcq472x2fq7ja4xida07uk4yb76zjtaeecc1vrp1wrcgydysrn8oqauwpbz9ed8ym',
                receiverInterfaceNamespace: 's302fbajb8nqssg9ekvj0k42n7h2r8o5uddsm8vi67ijzs66nuranxi901omg9opwflf41kb1x98ttotp0m248714wtemvces17ritpwnhfb6i58owi6q7af9lx0u62ymhbjl7312i84dd3sr3s2332xrk84dus4',
                retries: 5880991670,
                size: 2971064456,
                timesFailed: 2629415810,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '1ewm6v5rflub0yoay82g9h166wep1q6afrsf8gme3aj57tv1d3',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: '0aurlmn2e6ptnoikoctu',
                scenario: 'qkc27j5gy5tmr3hf8c0x67tkzm48uy1wsvp3ihohrj6rxvrxe6g9stz109th',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:51:49',
                executionMonitoringStartAt: '2020-07-29 04:35:03',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: '48pzkievhituthpp3dxqb948rzr7y0tkr09x57zc',
                flowParty: 't9qdrjv16df1oh289i83rm2kmy9skx0gyr9h8nq4kubaxs2p2b5bo19dwywblb010bmogg3p0x8qm0kdkqudezt427utp6kghfqgkumxewh33ohodhb0zgyiixgqvnl4l5jmdkrb36z1bg618sjnw9tj8pl2a5r9',
                flowComponent: '1ry435rf5wps0dnkzvnkvsknl0q99ebo8x0e1bbs36be03hlutvuxabfbvuez54ni290fr3azzivp0jdfz9lurz88b1zvxmu1pc6nic7fj2vt5e4blwkgd8syt3b55b06jlzofitq886lub3b8hpg742l59ppmkr',
                flowInterfaceName: '216u8z8bqueudttljoybf1gu2k87bzv1tei2nhf2os6p9fn5ve39tqynfg4fue6hg0u9veh2bm4dfp7ez6mzjr1bg1p0xf25lwdojhe70h4skcu6mk0yaoew4214gkxo9c5rtybxpmcaftwpqe4pb6mp5kr41gob',
                flowInterfaceNamespace: 'cd16ekoo4uk3vxyugkdrdfnjl4a96fc14ev3i0z8uj7ayk42kjaenww576sc0fllmrj40ap384lrphjb08315jyum1y3jc2cynltr3kzqcgcrtv5fxuwbne2ueze9r67sa50qor9jbblxo5ikwmho4utjxino3j3',
                status: 'ERROR',
                detail: 'Voluptatibus nesciunt blanditiis voluptatem voluptatem. Qui alias alias aut ab occaecati quisquam iure. Autem quaerat pariatur cupiditate molestiae rem fugiat saepe modi. Velit tenetur consequuntur.',
                example: 'sdkengvaxwi8jpzd9lwwi2d6j9lw1y4vqdefm01stz1vy8d53w3ysu5uurxc5xm183fvqhhn2a4grgfva61kwfp6gate06dmcv4184vib9akv776gblgx8qjsb651je4jvono3isjag1j86d5vg09i1amchag7od',
                startTimeAt: '2020-07-29 10:41:32',
                direction: 'OUTBOUND',
                errorCategory: 'uju302zzav190t7i93hz33g3qzl1dt5pice1pfd3sqgs2ughgc2gh9iv4tbr0jcldh9d9g166r78la2nh08jocwgy011gbkmn175zm5yzpss12lufi6tj4e7qopggfquuwp35yaa9ef5i5fqh7lc9w7lri1kgt50',
                errorCode: 'si8gci022vor1rv2deiiibuv7re848r21p2hi2jmgtnm4g2mw4',
                errorLabel: 262334,
                node: 9751983235,
                protocol: '0q3ecf0jcugtfi4f0hid',
                qualityOfService: 'c0fykasvk77ti8v8fe4o',
                receiverParty: 'qe96ypjqb5xt87oh1e0nka3uaugedcbi8ibwk9gryo4ys1k8rypmr81lj6u3482fc2wxcev48il8kw6yykx7nbjizqesnue0gbaa1pc3dsbag436bawalm4jojz9s5btv7e93vcbh6cv3b92cnrtlu6bqtcw741o',
                receiverComponent: 'ao2z7shnxvqklcjq8go6atiz354lqx09klwopm58hv9o982780gg0dzzi74ohu4jobyxl5ma2nheoex3cr5ivcb4y3g5pzn7eh23hy94brwvlaux6egoh71sjvgs3byctqqxe7ti5tf9i57us1n2kaaobnze3r01',
                receiverInterface: '6wq3i33wq3dmwbqraard2t77ktzmbxh8z1tnzomx4x3tslercekkvvlgs3ciwd9p1v3ea4ks8l7z3fg8ugdeyr7qdn976apmx2h8pbuj8v8txq5m1jn05fymzfxdh3izcnl5ss7awwnvhabvpxx1rrljndnv76xn',
                receiverInterfaceNamespace: '00zh58yaojr2zse3lgk24stohnttjucfsz13xqjjj33kuiavvl903vvkb6eb1r8birwh2np066ykt8gw79tbbl4gb2vycpppm1s5jukt3xy1h7k4phx48e0mw72d8flrmtdwyic91hu9ohcd1ylisxe7iongkp9c',
                retries: 5537260542,
                size: 9917053777,
                timesFailed: 9302577982,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: '3r5p3bsktpzdscpfeayganlrbjhu3glq84ag6jjgi96py9tc2g',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'pgzeghxnvr27h107vfb9',
                scenario: 'bhyxgwhpludwewtrpic8xf00wpxkpble06ibaw3t40pb0wdrbucwd3ylv3c0',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 00:10:43',
                executionMonitoringStartAt: '2020-07-29 21:52:29',
                executionMonitoringEndAt: '2020-07-29 08:16:50',
                flowHash: 'vpxl3rvy8zkl008s5gl9up4v2ortczscexyf3pxi',
                flowParty: 'if6wedo8yun9t534s40wczq020um2x3qoeqr3krxfduhpqi7tbyb2derrz7pnv2hpt5u1nerfr5yn1qnm3x1qkizdh3dkovtkbzypjwae52wqujbhougq4r5q6wr9yds0mvyro6treurfbd0ifxoo3avlg9e3s0c',
                flowComponent: '107n4uw7vzjrel3nutot5rwslvyh5qcgshdshj8httujtmtlrkaqkfcys8ffj5ezkduceftwnzmuphfm1vqxj85t7q2fi4jmwu755vp9sl3q6qidpxzkh0urp9hyv5awrhj1o25e0qffh5hldovet3h0f0rpm7dt',
                flowInterfaceName: 'e4djcpzuroruo6zt143uvt1cc4lpdgjk8rmvndywhdwyp0ng87bxva21cznpfrysop0kc0ajp864hb3nxvdh4b7v7rxo0b0y5nbdujoinnzfvspcqnqm3fvxrsd6ijvpkum78zsj4ot1eva4t7wb47gahqu8i5rv',
                flowInterfaceNamespace: 'iz5brfat40rw5qu7hdxrkq271bqhpne1c6jpsrdtmahmgz39c02st1jxrvxu8a13ttg537yfbv005hzv9t53vlm049ftpn859jd364eg53qd5rn4hevcu6oh9nhiqvoqsbdn16tke4rs1vuw52a7pjn61jax816m',
                status: 'ERROR',
                detail: 'Explicabo necessitatibus quas eum ea. Est accusantium quia reiciendis. Quis quia esse. Impedit est qui sed nam et illo fugit.',
                example: 'ghv5w0tqoww2f3kt9m69rq8217niv3ngkeyg9skblb6l3sdg9vl5hjgg2513jlofodrkau0l4g0x7lgfv8a4ragy7vg99ixcxcgmqvmws2xx87k0bhvgbuz2kxyljbnrmcnvbg4qxw7zoocsubwcvux5xzu1lc0w',
                startTimeAt: 'XXXXXXXX',
                direction: 'INBOUND',
                errorCategory: '0hl5vhmqlp50zz30zwgc7fnq0yq3wfxhfgsqeaa18yzi233u35bql15pftimtas6pcslf7cm2y23452ydyhmxmqgxzs2jmhw5z32kf3ccf7fqn7dunphibed6nsek0qor8m8l655i3xh05u4wugqlcu052yswyls',
                errorCode: 'c3zmmrdee2kbqvwlo8jkxot4d21vrof6bo1332xm9qjpiyfty0',
                errorLabel: 757735,
                node: 5434053227,
                protocol: 'byfwgon9diawsj7tor31',
                qualityOfService: 'zkpq9ube1qsm54pkk5d1',
                receiverParty: '3wavtuc2yysoupbt9qj7jm3p3kcbrg3mcrcyabyhihvtgc91jnlmh7c0yxslsbge4d94fny3wvsf5isqi0jgxp0qu7jfkcwxtmhdi7fl0kj957awws3yp1w74tgpr6rlw9mzandqoq6hoyxzr9isb4w2z8vcaqae',
                receiverComponent: 'a34nhw4fg9wsh096rlrzmmy79gqtpzi5c15ygy3ndb69ew2e20uj1uie7ccfzr40vjgz1rdsh42tlw33kdn1gy2q7d43znp38k6l1zap3h9sjt4lmhs0tt2lz6kt6d5pneck4tyoq8nu8eobkgeff1be1noabbd1',
                receiverInterface: 'n2wzh0elv5vjj8tr1sovbweya4cegbl0wsc5wzpdzwp8f1lb04jm4yqh0txgzbo0navm0z9zkh9ew4anwuu4dwxr4rx5vmblbhz74jwun6oy36rrgx4l1buicb0ce4x0am2ckzs3ugk502pgmunypr5xn2z4wfbv',
                receiverInterfaceNamespace: 'fzt4ujnkfc9groculxi38sy0gzslgwae94ib71qrxzybnxwdvnodbe7c9lnxaqwdhp3jrmp0jt7e30zazyz7u2y1514bf8uqaqwp55o462do4agluocqjo700v3e9ea4ph7t6bsbfw2qyd3afugybarq99ljacuv',
                retries: 8041268642,
                size: 1759979934,
                timesFailed: 4727808888,
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
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'ofzr90q27w6dwwbgns0blrcen0s3yd2kq7534vkvwggbcu3hmt',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'm0ct9boa0ipmmhvwy8uv',
                scenario: '4v1j5nlgf8dxw4crai45y3qtpy468n7912ibgvr72f6mftgaftmgipyij856',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 23:32:07',
                executionMonitoringStartAt: '2020-07-29 23:51:10',
                executionMonitoringEndAt: '2020-07-29 15:01:53',
                flowHash: '3guukfpzmyfxm0ld5bm174twtz38685ck0k787wv',
                flowParty: '0vqy5qwffwyzteo564v1zsuaotc0zijnzk6x77ynidwx13d3wgeknsoft6cabf324yxa9pf2d9rwaovmf9vva4ex1uqida4rrp7415jfrzpp1h1bap24hbgkptdk8o84aodouvfo15frjubahkqroegezjz3ft3q',
                flowComponent: '9jwg8oxo7ptxf09dt15w5x3ct9369bprq4tcbqvcw5ykd2kio8heuvrbvmd8s42uvdnc68w1639xjow1vy50oewfy5jjwhlb1od4p1d6mr0mtlqs7pqn82xm0tbkwyvema2iw0qh3nh67b5donzju9nyofktddmb',
                flowInterfaceName: 'rnvkqipnfhtm11wsp7o4mdvxhznq1gbstgvwtalff44moilh4jzumroqsxv71pwlgicf6i04p5eyfnydlv58gq3174nddhq0abllx4arusjksrycey5gbo22a5qaai5d043r52rjbgt8846p6biqym0xc41j3wgl',
                flowInterfaceNamespace: '7jwmiob3xu9358cqcilxsvany43fp3w653btcozdppfcwggi5w8i4llt1kx58r8a4arjy4sicy79sx6cbi7i0qlkps8um0gv2lb6hbci2je3rw85ip477ktrtbbcnosqsgefcdiyst6u3don27bq2x0rha25g2kv',
                status: 'CANCELLED',
                detail: 'A incidunt sit quidem. Quaerat esse laudantium est doloribus. Reiciendis incidunt voluptates dolorem velit nihil rem eum. Voluptas quia aliquam nesciunt quam. Pariatur odio recusandae explicabo doloremque quia commodi.',
                example: 'rki2v68t04t1s8rmybkk32k242vf8v7n9deoab493eh8w8xdv1c7ejg85veoznfskbzs1rf5lgy0cpqq7zm9h70aicfoj6zgvhl4zd0amdfdqzl6cdaks3hh0yc5bolhnn5rqwgw2xe9ik73z88bipu7c7w1rrbg',
                startTimeAt: '2020-07-29 01:38:04',
                direction: 'OUTBOUND',
                errorCategory: 'tmh4xhiswfgj26uh0quoterycrxh5r68mpp7nvlzbvjviihnnp1q79ch8473xhwrwgkjjnxajd8ma8iy63vy6zhy5zorhko94zmt4tixgt4b5i41wftg0lp2hu095twc44a1savf0rvfpfe1cglcia8s5csum00y',
                errorCode: 'tpet8zwfqo8wmqf6ek5y086pgjjwv4ijnmiq31mmk9aqxeeaog',
                errorLabel: 271797,
                node: 8435743462,
                protocol: 'vs6uggccn0i3tzh4cl0q',
                qualityOfService: 'oyrlq3o6c8899yj3puvy',
                receiverParty: 'r9np3ot2ldlwkzzabdwf2sdk0mrga4zc76thzqlz2j641y87offj547s1qbkg7if6q7dt2fc89w4pzctle47a3o1b3bdnzjivgm6d7ulcugd5ehg37m30oonugolwg0iymfv0hhf4k3i65x9kjjupjdfcsilqj4n',
                receiverComponent: '709iljg7lzzvt2gabq3d6qu9o134uu97po7lsmsfrkg13znnns0wpbwe7pt5x29otp8fakqzl55dahcnjzvbheqm8lr185166s51nwppuuxmdorxt93io90z5qeylbeis08sjqzbavb08sh5dzzemw43qvyb0mte',
                receiverInterface: '0lmpl95agihs7xk9q27xj71p3tgvxtw4dtfmcms9704c47nfpmuut2sku1mjfdpkn2axdyfvupw1yjajnnxpblryifdfx4ywyxyaabmvz9khs519rfib1d2f4xorng8fjicvzgk6mek6hjbnxaf8lcc419nc4ukd',
                receiverInterfaceNamespace: 'hspkpzrqy4e85ebfwateujnkhghwh5w7wwaqnjcxt00643opf72tmnmse6lxfzsm003e88hcgrq5k9q57cz8jveqxjd7jn5duz2xm3028fonffas8frclxm5yegy3d7na8kn9ap5b50ibg85jli3ivfp12d91xtm',
                retries: 5321762490,
                size: 1100313191,
                timesFailed: 6554303297,
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
                        value   : '60e83bd7-296d-42b2-992c-05bfd2d6b7da'
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
                        value   : 'f7e41556-9598-49e1-9961-cb409cc7525e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f7e41556-9598-49e1-9961-cb409cc7525e'));
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/019c8881-3a81-4681-8ba6-c146f3d8cef6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/f7e41556-9598-49e1-9961-cb409cc7525e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f7e41556-9598-49e1-9961-cb409cc7525e'));
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
                
                id: '7d0294b7-cd7e-4364-ba8c-4e0d9c46f06a',
                tenantId: '69188b80-f9ae-4307-ae9b-17b5f61d985c',
                tenantCode: 'ay9vrzxr759mtbqfar9hdg08sgbwgks4pzz2vkgat11mholk5z',
                systemId: '090b0299-da9f-4494-b24b-1515f5f02501',
                systemName: 'ty6maen4i2oqoqj1fz4s',
                scenario: '7tn4e12o9d7zjy5q6xv7u7bdaz3mxc9pg2p8nacjx42xc9pr7ma1j957ti19',
                executionId: '28b47f2e-ba63-4a7f-bfec-50246748fdfe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:40:09',
                executionMonitoringStartAt: '2020-07-29 13:34:56',
                executionMonitoringEndAt: '2020-07-29 05:38:16',
                flowHash: '9hftej4u5qth5y2kffly6nkgojhsx44lk5v28bhy',
                flowParty: 's5x1whlfrog3060rhbpfmd7ayt05pf8hviuz22juuyr5l8feuazm3h0wcidv8m238wn66yxf6imqimtp68wtp2o28bstsb2vsi4kdptrjkrmvfl0knoknyalgahinu797271b7lzv5zny1ccjx4zhswbcwp4mrxv',
                flowComponent: 'ikksjxyk1zx1986iuoj18y1zob5kh0t0vdxr9fb3ifrlbffrv604zjqs8zqwk94m86ma3z0f6tc54a7qbygzrdff73a1t777rfaq8cssv53ddfhhehfpsnjzjmpenegusj4hiod8mzsbibs4xeb7kgueqmb5n5e2',
                flowInterfaceName: 'mmssq33krtk9dvmi0ccnb3khau1423ovxh2k9gl6ucnohzgef8gqmsfqcqedphrus8ccjij7ecyda2iig4as1pgz3himbyp5ebaxv165at3mxspmn3r3a5tz9wazq5jx1fw4cz2513jxjxych112rdzcsdsbnbhb',
                flowInterfaceNamespace: 'eijhb0kqrt29wyyqdql8njiae1dtxf6tq5um3gyyvmcukzf4k1t8c5rkxi5xkczmlfx9tktfqocmj77ajzos46jffut6uh8sh7xr4r37zrg33t214qde51pctqgf8gg1zr1sgj2muz0yicgjk7m54auj08hcp7d1',
                status: 'ERROR',
                detail: 'Aperiam architecto debitis et et nobis doloremque mollitia consequatur. Impedit mollitia quasi consequatur et consequuntur rem et et. Non quaerat cupiditate. Culpa sequi rerum asperiores saepe et nostrum est ex adipisci. Aperiam earum quos et.',
                example: 'kqdyq1ywym9b90cfnus2x4yxphtbbyeekcnxwtt4twe36mjikon3xz1vr4n33xmaydh4719h6m21jl2o5g431bqoyq8mb8r7it11w6ixmtooazt8v8ox7xrulzs97vrlcdg373emqqqdk68cl75nb2eobl0ve908',
                startTimeAt: '2020-07-29 01:44:06',
                direction: 'INBOUND',
                errorCategory: '4oz3mv37jsch7zvm7uhb4bxcrqf0ndfccbfewxronjxs6panelkfwn26z1xvamg7jfdsrqvqye5wac1oxls5lxx83fjb16t4cfcc4mbfgqqa591z34wpzf6kt2h8d4gfq6azsnxircyazz5dgjvkehla2lkyxt5l',
                errorCode: '4uvc5lyjc50a3hunmof33yyzh0luj3oy1qq3y4n0tnum9yavme',
                errorLabel: 142496,
                node: 7187920801,
                protocol: 'x0avrptdksux2t5r0t0t',
                qualityOfService: 'canravaylxz38tjq4209',
                receiverParty: 'jtwj7knckbt0duvpofmb86vx6h0r1lzy1x6te1m8g3orgl6746aab1zluslw10h7is3eboorh92e5us8a8cnhboqo4q22g12b0mdm9lu30xge718jh5krcsq6o0aimki5ym53aq3by2dhup80ce6h2jljsqe5jwj',
                receiverComponent: '6dlpx59u1gf97k8e3xocxfi2r0dgzjqqjcnvf5uunnjp9w18v174lmsoewqkki5yz5jtoszhgcn44ayre2jujnr4wtmqx8s4oi0ls0dqapwn106tox9evby4t4ls4ablekei3fw8jcgd47pg5a2jhis7xoagnju4',
                receiverInterface: 'kublvobt2hjnft7ltp94uv52f25e8b47ied1gz53busfw7gt4ua3qsinnu27kh7zv1usjjuvqj7nhmwvb2980s3brmphmuz6rlj8dxkk18ly0a7fn2plj49f5uefjgcs7lxpvat2wpu5sa07qf293jp6apw0udj6',
                receiverInterfaceNamespace: 'rujsgckixjxm9ln1d6b1848gxnxb6ktm87er2k6f4q9p0rblnd53cxujgs8i79y30sssa1lfik3q51c5jdbqz6en3whbkr75a36coqak9gshcemr895r43fsk1crmgqv105pdug6qy3rfa9tg23zg8ysqnljfx9u',
                retries: 4116776113,
                size: 4190083892,
                timesFailed: 7166759741,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                tenantCode: 'sc4ramsptbqw8n2hxwmlh4hnkpmat0fpawyispr6pulgtjptv2',
                systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                systemName: 'uo548ao9xnh5b3w79e45',
                scenario: 'l2vsjlfvt1ptcmdwifeuabkskf2yr5hqgi8epqhjbvdp2nd0tyrey9mkjv6g',
                executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 23:34:55',
                executionMonitoringStartAt: '2020-07-29 05:38:03',
                executionMonitoringEndAt: '2020-07-29 02:03:20',
                flowHash: 'u7y4cflcpz7d1n8y0z143jx6atlatxii667xrhsz',
                flowParty: 'jtv8fggvx5hf6w7c7qw6aeix7e2i05lg4jtxl5sdugkgddwqkjj4yd645z5vczxvbfpniauypcc1papn2k0ed3rdgxyfrwzsjb0txe5hznxcwo02e7mwqo7y5v7b9m81h65qa7gmq9amvjishlb3b4x5152goktw',
                flowComponent: 'vrk5o2brww1u9led7zri4sqgwhlnch2k99u7ac7a5scj8mp6q53cra416mhim59jpmr572sigh2yb0vq1husohos6d81uum2hifg4eiq75lndy7i6g4iw7vrjrckprgj4r0bk1o0gso3ydg7smgw6k5933w163gg',
                flowInterfaceName: '52pwpj1q0jyeukl4w5zr5tg80ympzpgxn6bqkp0vyxobgim0b95m7t3liq4t13p6zyxbs19smb66eitm0oybfsoenqnwboku8op6dpq1s0k2xk94a3pepsuhwif4uzwknhv12ztne3dp14ynslz1ubs40wgmx5v9',
                flowInterfaceNamespace: '8btjjjn5u7bcq0sutjru9i3r90h9zlhvbbmip8i51jm7cf48q2d3x38xejoo8f94lc9th8od8up4tam5seqlete2dxu8d8kixi730qm94o3a7imm8dmzvukepbs9we9s2ebojnza4g4wio6yjlhoz0xm1r846t22',
                status: 'CANCELLED',
                detail: 'Velit et aut aut ducimus dolorem sint ut explicabo excepturi. Harum totam velit aut animi quos. Ut in nulla labore quasi et quia ex. Est ab doloremque vel maxime dolor iste dolorum. Maxime sunt non.',
                example: 'r0f3z12jru65ag4i8uckf3kxdxm3xga3nzaa9mu8pgljmargt1zkl7csw93wj479wc9cte96exp9v5ynpca0yrkmgkqw7mfp3r6qoaqkdxr8ybro9w4cdr56vigxe7a18ib8vtflchgh5eqelnrlxgq89pbx5g6h',
                startTimeAt: '2020-07-29 10:48:15',
                direction: 'INBOUND',
                errorCategory: 'ao8o8aunuea7bbzs39m2tdcex1g8zz9fnbt78tatzgzdeptmuev3p4fnscg39s10kdx1d1dxrhbsunbojr0l82tpirepp6yzr3yj2hom425s9ix8kguv4kpbpou0epko7v5hiw7fy83pogh2maz0a591f9jg3i4r',
                errorCode: 'tqpe8baqfdrkdf9lv46kefsltonouoq8d08su6hgbejv1z6vwn',
                errorLabel: 371634,
                node: 2587227364,
                protocol: 'fnzgya49lgedh4rnc7qb',
                qualityOfService: '08i6jsn1hga9sxirq7w4',
                receiverParty: 'qpgmxnxsk9ioo5q4ddqcri9l19ksc1gbyygt4bt9kkjfqbslhssdqet5z6f9frhkq32mtkkg0gptnuxd78p4lggss2uf814t6hnzniwydgzlawjn79a3exeesqqcbuvvxa6h2tcjlf6f328gwtks7sgk7i3k5fbn',
                receiverComponent: 'xqa6yfb1jc09rms4b00pguf46s19mnq4ihzs4zzkzut8zposlsxvsp2fdwgw85yclkmilpwam35624fq9dvtu79rd3rkgidrl11eknc4n1mdhx3btm9npalkn15oqu2w5kef88i8gnskdh9xvds4islqbelfeo0s',
                receiverInterface: 'mhfwh8kik5wwehrycmgrxevs9l8b4i8g6zwcrdew4u3etuillyu6wmc1kvtqsxt8bjfcqt6r67rrshe06ks01spp2jrjdwd3n825nr2z3hx9div1xav673oy6t3t02i4o7uso23wpsjfaruq1ike4jpuccxe11z6',
                receiverInterfaceNamespace: '0wj87iug9ap6y5h5yvpu07kza42615jk0mwzwy8j9q9hi1d4sw93k00iwbfmq8gm2x9oj9ynlckfj39sw7swix8u4pnynyhj380rkvk9sfhzndrnso1nij1lulm0wf57c4bp8b7xwrhqcmbiqbbzpspghpk4h8e6',
                retries: 1756149547,
                size: 6595945941,
                timesFailed: 3398773343,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f7e41556-9598-49e1-9961-cb409cc7525e'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/d18f8616-1929-4d12-ac36-258db33f4b5e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/f7e41556-9598-49e1-9961-cb409cc7525e')
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
                        id: '1695fcb6-aa45-4f9f-95ac-9ca67d7da360',
                        tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                        tenantCode: '0j7spy4biudl2tcauaskscdsdiwxdjq6dutfuvr72tg2cw1ihi',
                        systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                        systemName: 'c4mafwoe3ao86j3scpfx',
                        scenario: '6c398gicy0v86vs0z396nkx2c59if2dg6k3ifnvnq7f87y2cfymz3q2oxzw0',
                        executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 10:07:09',
                        executionMonitoringStartAt: '2020-07-29 03:56:35',
                        executionMonitoringEndAt: '2020-07-30 00:38:11',
                        flowHash: 'mye3r6ap8p7iyhv6tc4qdtn72jbqhphbunsn0g7w',
                        flowParty: 'cdzsnx8b31506cp55tqvuuucxfmlkdr1tb08i3fqr9sw6lcjtw8fcdz2sm2s3hx70hlkpaeq0felowws87rssox0ztra5iey1wb0tcl2uvpqp7logkhjv47kh2x9ge0el4xx499gk1pi162yx9nrbnuk9ic0wfmx',
                        flowComponent: 'jzoz8y4nwlfo5ofgs4cz6hs8v6hki85w08rjx5tznkc2a6rnngi8xaxz0g80qalluflcl80c9p1vkpb341l7cwr88neyid4eaq9xap2k77h4p0dv2cvxls4v255ne8znxo9e1qgooie01jb767mmmsgwu80fhg7q',
                        flowInterfaceName: 'mkzjuop2ikkz35rwpbycugdbrx4gangrmxm4ve4x6h2skmod06dwrj6xkh55tnx9ttntv6w3jszixz9xq3g3shoha90ofdji33wdytag2melklg5q7mmxzg0f4i1pbprzbl1x8c6s01b86yyod7tyenzbj5gnfxd',
                        flowInterfaceNamespace: 'mid4v8ynrf8qhi1ihnw4lb074vz8huda1uicjqe4cmr7etiu58x3l36ut852ov5vnqawbmuzkgcjgvrxwk887me38bc5r958k51clkdyh8y5rpe35xqcu6c6c6dqqv0pjdj1zbuu4cpojgty6ebdqbpo7hw1uxdm',
                        status: 'TO_BE_DELIVERED',
                        detail: 'Aut qui minus ut voluptate. Est quaerat odio ullam. Voluptas numquam sed voluptatem aut. Sit et ut quo.',
                        example: 'e02xr7z4hg0vdftgg58mqh6ebccvlxlx9s5hni8hyp19xgx04qthugh84rpha51c28jeovg43hbaevkyvseuwnfewqnksx9w551m24uy4tj05xk334tm55nb4pdosd8f4dcjt2iag0acb54bvrjyy56t6fxo5p0m',
                        startTimeAt: '2020-07-29 23:44:37',
                        direction: 'OUTBOUND',
                        errorCategory: '3k2cn8208n1snal5zx2rpv6ohh5rb2v8wlu5bz2fehuw8hp01j6m6p93k4gaa2jc01qybmyiu1bna4a209ya4cssp1qjgkkc2va04dsvgscchp4d9d2l07adzqaz15sng6bbboa0khomgjdanlzyiffsytqkraqz',
                        errorCode: 'imqv2pyddpxjy2c3ndi074mohctzoqzzu6bzrad1yj13pxdenf',
                        errorLabel: 272476,
                        node: 8149409458,
                        protocol: 'bcobsygbt8evqubt0bi1',
                        qualityOfService: '2oqbdr9qi7r5r7jcxt3s',
                        receiverParty: 't66wjxq130ek1p5a9qlxi89337pnb80jmnv9pllz9pthpptaqhilpypwndx467odk09a7qzoe7h8k2eeqqumrcighuyk53hyt1wk6u45j0h8ndn2npp9wrox0346wi8a75ju0108hs4bwsii4ho0q0d5rmdli8fy',
                        receiverComponent: 't77kz0rznkyim0g4tswmvcdft72kw4zcaatuxwekamb0r4s2uodp0v2qmk7mmawtdn5yt7k4vr4o59aeaq6y2vcx00488pb1jtkoe3b38lyccre51agnov2u0krdetmgqcx31eyjwii5ou4qjarwbr2vzdzfye4i',
                        receiverInterface: 'c1vl9vx46du5knb0ycavmkkirf7b1namcaxknbxm5eg729m1dkopg27fwqx8hfurma5rw5u25xsw4jvsvmmaxr1cokl77rppssb6zmnnm0ronhj6d6xzjzcq4f3hpkxmwd9v8jbu33g885b74w559dxbkiljo9c0',
                        receiverInterfaceNamespace: 'l9ui9yceya0tqorskqcoh3a9lhzjl18nsihq6qcce0bvivr21wfmz15as9p9iftq44xa0cym08k7c2eokd9b62fbgg3ai629tbit3djcw0zvr3a861lv2meexcrlz46qzze6jel8j3nqgsbca77056thfujcfw3d',
                        retries: 5470086418,
                        size: 8215328367,
                        timesFailed: 9263325230,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', '1695fcb6-aa45-4f9f-95ac-9ca67d7da360');
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
                            value   : 'b8b13461-0442-4d07-9ac1-012b9bf55a23'
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
                            value   : 'f7e41556-9598-49e1-9961-cb409cc7525e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('f7e41556-9598-49e1-9961-cb409cc7525e');
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
                    id: '4e92ebb0-6b45-44ec-a05b-cd2f41da45f6'
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
                    id: 'f7e41556-9598-49e1-9961-cb409cc7525e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('f7e41556-9598-49e1-9961-cb409cc7525e');
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
                        
                        id: '0a2ace3c-678c-431e-bfc4-bbc39bc495d9',
                        tenantId: '55b5fbd8-0dda-4aa5-b113-8ffaef61ba61',
                        tenantCode: 'eufnredtl1dzgluswohh0jh4un96f3qezi1vdku3g36uxw2an7',
                        systemId: '4a1cfd43-7bdf-4601-9efa-5775d1d714cb',
                        systemName: 'pzo4z4nitbqsazi5mtw8',
                        scenario: 'e2cloofbudnyu6g67fggci3y039owu6mafqfwtgycyo6lpu19o46ipgo4bk4',
                        executionId: '3bb1bed0-74e9-4bbf-8970-db415c08e193',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 21:18:37',
                        executionMonitoringStartAt: '2020-07-29 19:45:25',
                        executionMonitoringEndAt: '2020-07-29 13:14:54',
                        flowHash: '9x0gpphzc6ag83atllcsvmn1h1erzacxate89zrz',
                        flowParty: 'l8cw0gqm3vzm6qxkpp2133n7tntua871axw2t25jos372e5ojm2wftpwns3ryfrenmgvevthz0692sigc8278m46hkhtp6oh2g6x1f3qec4ph9xu2h8zdl5er2orpsgcj8nmh1gfrsajyqthzkc31ro792blvngm',
                        flowComponent: '21mp70n44oqivngju4qt1ygn0yvo0n8hz6bcmhp3mhfqqrblorc6zxkbb2dcwl85q995pa01deh938f2ipduprn43a3okatn5paekegl7b4b6wc24op9bg93dx6ex302i5r8dkwa89vxl2ryxj5bduzu7whhgoly',
                        flowInterfaceName: 'e655qkl9uuhrvyqxmpm3jldzvbkr4cumtn8fyu6lti71knj99mddbbvkw4drante5ev4m125wyqufyx3i8uigchaxgqvrum8ge23loprb1gf2onse6rjgfe0qlzzmqjgb3l8cq76x5o5hgf3f5cpiteippjyod9h',
                        flowInterfaceNamespace: 'eq8du1n6g4dfltpq9ue4l7i41uosdci5b68ruelxwe88t55jiy2gbtpu0qypbw5jg5qfyurca6na6gxdrhgxppelkn7e9jkgjarhc52mvp6g20es7j5m92wjm57xvksqjwk7clyi53oztvdgbqyhdryb191v6ywe',
                        status: 'WAITING',
                        detail: 'Amet ut dicta nobis autem quaerat sunt doloribus. In necessitatibus esse temporibus rerum sequi laudantium corporis illum numquam. Voluptas et sint sunt autem tenetur hic quis voluptas iure. In deleniti repellendus consequuntur animi quis deleniti perferendis.',
                        example: '32qj8ln0lfvv162kudvoo569zs1osw91lwo60dldbwxpqtgmct7anm1zvh5i6y5t9blagulx50pwxejf9i84u94dn7u12e2onj70su86mm45n4pb2buh0h9fx66wesqw7syrgerm1o1ipofmg1dxz1nccfpdkzvs',
                        startTimeAt: '2020-07-29 15:54:03',
                        direction: 'INBOUND',
                        errorCategory: 'a5e69laipebz3ue87uf032nkmd99feqkwq8eyqyo38rfdxc2nuxr995hmy31cusopv5b3j2xm6don3t5nvzinltwfzy1i5uoohfqq6ttaigsl70dvbufr4fkh934082wesszukl32tsad42m6e3mmihkmkxzhzms',
                        errorCode: 'dsv1jwxalhyunrsajnznc2mc5kcb24cxikl0vexcufutkbd61a',
                        errorLabel: 388022,
                        node: 4655647711,
                        protocol: '05kuj6ed613j8jbtzjlu',
                        qualityOfService: 'gtf5nzircw9ilinwa9bg',
                        receiverParty: '1ncalj2r436jjf21rxufgkdwvg5xpx1lgizuuy1anhnckxqglyu5ledulolpuyf788ithlxv9c7j92ohzdmarc0qjs7y8km33omv3vjeqsytsxez7gg4vo0a39sr0on0045wa5lnjea1b11psu5be33bvk6jbkn2',
                        receiverComponent: '04vyqnkj8siozzbqp5kogzjb110btd3bzafxc3k7ckkqp34y3co87i14k2cgmh3hcndtxfl4umdohhf4tpfnxaadxcboklcno3504l44lqf61p9r0n8rxctdb7el5bukrszo9w0r0jlcbbkfsy9i7h5v4iolylyg',
                        receiverInterface: '0gutzgecr7z70xzwems5toh2h6g2sb9khekbnstyu4l0p6lyyt7k6axpjmb1fn6arrfkvmn48r4g903v12xi70b9pal2x788gn187sl1xaqt7fetdrs7krua39g3avqh3j3ftpqhhx6ajmud8yaixowwec918dgm',
                        receiverInterfaceNamespace: 'p0oed1x8xnaxyzpsifc4a2ag9zbkh06rtrf9mu6fg9zdxkm2s949cua2lt1bkx5ecf7oxyzvl9ydb6wu8r94jgqdko5h518kcrjncumfly9pwzzxo32ouo55e7w6e5xi6x60tjs595w7a398bjsj3zq2xpuuje4j',
                        retries: 1704072498,
                        size: 9790756088,
                        timesFailed: 2062862806,
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
                        
                        id: 'f7e41556-9598-49e1-9961-cb409cc7525e',
                        tenantId: 'beb63308-f14e-4889-be91-42e05e3d7aeb',
                        tenantCode: 'nci5dcxiohxpc695cutg0gdmrnm2ktahvc1urhdnbkpt1cvifu',
                        systemId: 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703',
                        systemName: 'ywvq0l2jfwuxfbpp2wgt',
                        scenario: 'boo35vdd984gogq9vntv1s3qk1jff3jzkrjp47m4a0ujq2jzqdnycaskc1bi',
                        executionId: 'c8949b41-3c40-4aca-a429-2cc6c174d507',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 23:23:43',
                        executionMonitoringStartAt: '2020-07-29 10:35:09',
                        executionMonitoringEndAt: '2020-07-29 05:39:18',
                        flowHash: 'xk4xfh5cn9sppiwvlb4rycai9teg8duaihe1n9z7',
                        flowParty: 'k5el2r02q45nil4lbrl3ljn2wwvaycmf95va7sfz8btupyjq5sfmsp3b64yoz24olo9uwhfm0g8qqh744yg5wwc1zm345km9tjt8059nr8r8go64q37bvvcnl8oe3wvwl6xij4rzg0nmttulod0sqcmwvcegf5zj',
                        flowComponent: 'kxjgdanbanjktgq4b7kors6autxrrbajv4e4bxv6v761wqqf5wlc2zhoxiy53b73cp0tz52z8qo1zvyb630arr5k43cprmoza9pjmmk2i6cxaoj2tm5amc2jcw1u79it05vscgf03va12toofv35v651680pa2p1',
                        flowInterfaceName: 'znrwdkwu9eaqkfd0fds41srqnxrvdhg47wz9q7km4xdm8u5st9u4nb0e50m8vyxbncxju7y9b5vdnjqp8ydot2bss93jm27qdo0o88v00vrpit4xid6eaxtfp6iy0zuupo56w9nk3ht2gd5t5qknlhit80d2ezoc',
                        flowInterfaceNamespace: 'wu5vftnpd21aw80zkmf1sae80ds1c7ky1x1nxyxwb26adinjdpz9kp80lz241p4maz5weolp5ce0pfchrft8zo5ooynso6gmnfcn9ce3x1pl1awpxisq8p8kgu4lm0lzx8xgivh6avstz95q4kbz7jsqpm4gj8ig',
                        status: 'HOLDING',
                        detail: 'Rerum eos cum voluptatem. Ducimus sapiente doloremque magni dignissimos inventore id rerum officia. Nihil saepe non autem velit repellendus. Unde doloremque rem et quos deserunt cum tempore in cum.',
                        example: 'n21zsloeouy2f9ft97n7ry6fjq1l91hl0js12kg0mpxb32ti5hx3dj4rjjxlt88axc875mwxxlat8p4fob4d4kt12tock427925npfenizt4gj0wf7nau3c4b0u27g4pvyospyamupomaip61hprx4izdxk6c1sy',
                        startTimeAt: '2020-07-29 15:05:18',
                        direction: 'INBOUND',
                        errorCategory: '9t071rcnfx9ln9rq1xd0frc691eeaz9kn4j2hhqu2ez6al508n5tz2lc0o2pfoknugfp2p664jxdlb6130sy7kc0k94xhowegomdj2tl9803ji4mwksp8phedvvroc41i5t2l1fumsa8pxm4fqa1zdbwxo104z8n',
                        errorCode: 'k1hfdl2vo93p6zar5dhdk8az6fj9nmaoq0up9xb1za74qri5ji',
                        errorLabel: 540878,
                        node: 3120326084,
                        protocol: 'ph9t5taikq6ej2hjj9wq',
                        qualityOfService: 'www6qz6zuqznyb24pzzd',
                        receiverParty: '2g609imde2yfjdv188e1qdvjpw3br9pbgx95nxrfvgn498gxwhxn9lvvi24mbr661pj7ho6i76tkfbipwiakqnqfq7yfa7kfahuru4nrs3oya8dlojei575twhd94cot97w87lj04jb7xlos0dxqasqsoab4t3tt',
                        receiverComponent: 'ol6k83xoka8s6pnuu2ngruxd6as77y6lpornygb8s45jukymt4yl6uqjb1ybvgrdynbzh9y5lol6q1nsn6bsj3nwxpe31xa3sn434zp6lphmd6jydfyxzvfh429u796s0t1ut5w99maw5m4j7k38jupcn68latsk',
                        receiverInterface: 'veabm6xyy8wb0juh661t5kojan7ip3yxnuezgquwolikchxt02ec0oe2xld1nqomqznu0q1xau1agj0jdnsa3i9t8ozshvaifo4pdbycj9c6qe0zr1qky882lscano9lhfj3rbjyqcatxzsuhrmlzf5sal4tbm09',
                        receiverInterfaceNamespace: 'usycwaqe50tto8ukf03x3xclbcrfzuk7nm8z775kkxzifnes1gbx8101xa1vx3fa7weq5820ymwqlto14s1b5rgulo5uzcpsd922v7z8gftp3ph6ysjfp43po95chyeqbnr8cc5yke6f04hnpbciauyl319ifhl4',
                        retries: 5281999945,
                        size: 1214130684,
                        timesFailed: 7177306333,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('f7e41556-9598-49e1-9961-cb409cc7525e');
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
                    id: '3cf1128b-3c93-4f2a-bf8d-9d58c3333e65'
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
                    id: 'f7e41556-9598-49e1-9961-cb409cc7525e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('f7e41556-9598-49e1-9961-cb409cc7525e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});