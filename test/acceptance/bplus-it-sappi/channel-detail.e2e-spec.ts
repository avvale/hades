import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelDetailRepository } from '@hades/bplus-it-sappi/channel-detail/domain/channel-detail.repository';
import { MockChannelDetailRepository } from '@hades/bplus-it-sappi/channel-detail/infrastructure/mock/mock-channel-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('channel-detail', () => 
{
    let app: INestApplication;
    let repository: MockChannelDetailRepository;
    
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
            .overrideProvider(IChannelDetailRepository)
            .useClass(MockChannelDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelDetailRepository>module.get<IChannelDetailRepository>(IChannelDetailRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'j5rd58houwvjfwz2suhe3le5zc1qr8lu35hwyf5kjd75dtkfpo',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '7wf6b38dyaq8yqngi2gd',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 05:37:34',
                executionMonitoringStartAt: '2020-08-04 14:21:37',
                executionMonitoringEndAt: '2020-08-04 16:12:55',
                status: 'INACTIVE',
                channelHash: '4xp71i9vzwanud22pzfbeib099fv59w2mzp44856',
                channelSapId: 'duhzvcjxefkluiycknlq4hbpy42jmbbzej6bvoh43ajho8zhe2',
                channelParty: 'vw8g0m2nv8w5bi2kyjno9zjdgl7pt5j8doee654cl6c0xdw5lqc9xytaiowg3adteinxl48w1znapwi6xanqiluo5bt7axj1dsgj1iu4emffan17ll8l6odd3mnfzm8sw299eh33mag36yofiegjlh85o3ieobdq',
                channelComponent: '5yyig06cl8irfz3vhzo5lpr1go4bd9gmcx83wwkasfoarpz270aforx0ww2q07hte0bd16sr09bebo9yd67sviy9lhkzf7cvsqjd57jck0xbcjh41z9moz8jkl2cah404un8v4shhn3wr916660krivc3c9b66k1',
                channelName: 'q8vvsu1rzifekxmj5ydq9yumj18rmzpfop1km11exrtts6zkvtz6gx223mjn7pd41shrg8aru8tgdawbe09eg6rvt0vwjpj94uh83chyitjbd66b921l1v2vog9hn1tkabc89i0d8p1undj91o4gvp1v6fc9wonh',
                detail: 'In culpa quo saepe veritatis dignissimos. Dolorem at itaque ipsa eos qui. Impedit dolores qui architecto officiis molestias officiis sed maxime. Dolorem aut optio minima eum dolor sit. Repellat omnis quae omnis. Aliquid eveniet qui.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'in6vbjv129chvboc4e88osjmcttinprlw0prx7vfmgh82ptgib',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '9s3esz2wn92t734fq12j',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 04:44:22',
                executionMonitoringStartAt: '2020-08-04 21:00:29',
                executionMonitoringEndAt: '2020-08-04 17:52:40',
                status: 'UNREGISTERED',
                channelHash: 'pg6xqbqr821tfw9t7t6emybhlz1pl8x1dn8j2m7i',
                channelSapId: 'yx3nokbm57ms17egauv132j12qfsxlrza41ab5rfvvhnnhho1q',
                channelParty: 'eq1t3wl5dpg92fhyz21vhis8mur88myvwoogxhbxg3i6jpu2v68r10id3zgqdph9rzuej9txd3lwr2vg0z6zgv9pke7h4h8lxpn8o1mdd9f1hljw5atu8vzyl5n2p4pk7icy9wyk13bwdnm1nz3yfs9cghav6tpk',
                channelComponent: 's8lkk6pt68zqzr65gv0jsmkbfnij8im3li32dpowv2e6pc9be9ymfghh5ow2lus2en7nkav8yv4zylsxgvr5e0zluw7vdkg3ciscn0yb4vh557r644er5pkwgdbcvj7g0t5d9fmmug0glvu7pj19jv9m2axxsm2u',
                channelName: '4dls4zvig1qgjjer6h1txae7focbb6j06ovk5w2fdvrrdt8ikfm9iexkwr0rtx7gloruxyj2dtb4rlioy28kno0ig4zn8zjj8xjpw5jguzspy3fwwu0irpzfxxeo6ka0ks7yx362hdhdcbe98fd7invle5pw24sg',
                detail: 'Velit omnis expedita laborum id neque. Maxime nam hic repudiandae dolores eos. Ducimus cumque tempore repellendus minima nihil saepe sit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: null,
                tenantCode: 'srpxxum9f9wkxpmbdhgk2qs0gkqqi4gdyxirgt2t1xhr7ggrog',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '3cgtzgm9b7jevdkfnje8',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 21:48:11',
                executionMonitoringStartAt: '2020-08-05 07:39:27',
                executionMonitoringEndAt: '2020-08-04 18:41:10',
                status: 'STOPPED',
                channelHash: 'woy9u469ndjlvhli6p2hq2gjziacly2web4p9lba',
                channelSapId: 'wg2b992jweco2qqlrpcwob710xsqb0xs63wi79nrfkzfjxo6dm',
                channelParty: '1z6jffvht448518uhy9igflg1oxauhc1hjok94auuencsfdkdca9g458it6e5ljiq802jig74vjod8umkf06mj0s06xhux4wznpj3irlc2t7f7b32tst4jlb9niiurqo0gy6bkqa2xagjohgfgzqvlsoxkiklw5j',
                channelComponent: 'a9t5u62x3itwyu7lyxzh1v2fxsd9rof77z8pfd0ucs81zez5lr7jo8d491fazamgursaip83r76ntnlha7vb74be9i2c0y7n11u14o45g0l9vyfa7g73h5qi0qt194m6o5ea6kwtv9i8glzxjv4i99ycn1hlkhwb',
                channelName: '38trfd4ssetlzfegr2iioskwasugvnszxnkw0qmfd1ouvcytivq1fi5ol05nqf8thlan3qtuyt8hkww20xqyc7fcvrh4qkk6tok3wlm89elz9az5x7opnqeirnr53ckk0jaa7z6v98rvx1t3syytdr4rkqbzgy28',
                detail: 'Impedit fuga consequatur soluta. Qui et facilis. Autem aut qui est in. Quidem itaque aut quibusdam quam voluptatem quam occaecati dolorem et. Nulla doloribus voluptate autem at. Rerum facilis commodi ad quia harum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                
                tenantCode: 'oebxzqns5161cugxb45j4vym3yz2w1y8ldfwyucdw4pjls2jwe',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'haoshvu5bklo8i5atvm5',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 17:53:24',
                executionMonitoringStartAt: '2020-08-05 07:48:17',
                executionMonitoringEndAt: '2020-08-05 04:52:06',
                status: 'ERROR',
                channelHash: 'uwnabqy9dqe4fli6398mtpsxyp8en4gnwkbqo1ui',
                channelSapId: 'iwf60s141do33ehle0c4amxpcimaubr7md1qldhk0uobo1fw1m',
                channelParty: '2x50kzgygh9h2wblx34rv97h74q2kl12u86cmsj9qhl0uyu9sxhyingi5dw9u0wzm7cvuh1b8n9fu30ekvhi5hapz7mx94p740hqnysc6hiz4id452tbyx89efqmk4a6uvmdee3wiu7ahrdj5kofwmdypsasq7n2',
                channelComponent: '82i1tfx1959rgu5ymzsvvfxot61ln3v0iy7y6fwh4nuufgcj8r2dg91ituc58jyhmfr0o75zr5wtzgvjkmlyopvt6s8j3q0g8lf9kirqxz6iuswkio84ude7cgg993uo5zl6iskdwm062yzk8540svkzpzjqw9nx',
                channelName: 'zd9psrjfpv63lgxk5iv09gjx4jxo1gpsi4d2l8ozxw8fcrdceaittfy2x01xm7f2qpwj1aqaq2y0xbcka11b6rxfxodmwj7ntchwa27o2xjhxh6p2o2ovqhs3jrfevakqw289zww5gy7vgd9z64xmled5ynjeesv',
                detail: 'Quia expedita dignissimos perspiciatis. Fuga expedita perspiciatis rem officiis omnis eos ea. Unde officiis tempore corrupti veritatis magnam molestiae. Omnis libero velit rerum esse vitae consequatur. Consequuntur quae aliquam fugit ut quis impedit similique. Non vel vel et porro.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: null,
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'upvhh74k0eq1eddvl2mk',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 14:15:18',
                executionMonitoringStartAt: '2020-08-05 08:46:42',
                executionMonitoringEndAt: '2020-08-05 00:43:38',
                status: 'STOPPED',
                channelHash: '540qnnbhfsjpz27vpajs3scvvrd7xmpj80vve0e3',
                channelSapId: '8npos6vxz3haf18khw7xtt2k5ljem7f76gk94ci5sovout39lu',
                channelParty: 'ynolzca8fh17h42siqrd9hjpbz1gyt0rptevbl59lsug5pw7vve254rzej6xxnp32fdkd3hlsdszxcdp1dnhlfvprw5yn6gq8utijw9zm1rll4hajzdmp9it09bhap0hc4wii6bajw7t5x5mcg2pov401uw5iyhh',
                channelComponent: 'mywd20tgi23wc8g0lgazyttept8zppzku80p3ps14gf9i8zmjamzv4w5p08numshgbgnz5bm8qch5culus04z4lp3qdk9o4c9p4lyoyaaljfxw93hjje8stum8uotn4qlugs10mwmgm4dxwj2rra6511pnx1s9s7',
                channelName: 'h4u1c1ibnyuk7q6anst6y8f1ndjrna0wpojv8dctmqx7anmj4s916nqui9ll5ytlnrbme55qqwjo5059sz46fs1srw8f9yobdto1xbbt0cj1ggri3x7mek2q8f1uvonce0vpotszc5k7abkfmnc04ik5mq2zxn2v',
                detail: 'Quia non tenetur eum incidunt incidunt. Omnis accusamus odio. Sed quia rerum quis nobis animi et qui. Autem fuga repellat qui eos. Qui voluptatem vel quisquam hic.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '4hrt43b3z2asc2k6roat',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 21:41:07',
                executionMonitoringStartAt: '2020-08-05 02:14:39',
                executionMonitoringEndAt: '2020-08-04 11:19:41',
                status: 'INACTIVE',
                channelHash: 'p4581hpuccsbzcroom3gvolqnj2ze063jsdznrrb',
                channelSapId: 'j83esdw7kj7xf8uy4sficu2vmwd265qtuyeixccjv7wki0mpxd',
                channelParty: '8ijwu6yd9wlxd3ghynizj3mmqwoau1hsdc8jewhi5eyd92e85h4p69igsfcj9pcc9jlffwl32vzezko5inxrg0qnfq2djzbsu66g0mgmnp0jn03lbe4n0fydcmpfjign2nxti86ni7tvr9tmsmvb33fo52xjvncb',
                channelComponent: 'rowr0gs03th4dte8urxt0opprptbu1qh5xeei750lwegh2k7fl0sz9dr8wjutb1tnpmrhisg3qqwhcehtdhu4i0o2skjb96ip1ym5seo46v0y5dw7vaauctpdzhwya0wcn6hbbehkztkk5ce9snmdckuu705vwzg',
                channelName: 'p3yo62x9aa18fkcghfx600hhri1vzfi90zh7o0ovbtl8c8qavfarrx8h8fxgdpi0uxz6kpti944yarujg78ynnyz08d6hsymadtw5fjg0g68rfdgtx60cekues47bb73zlgqs58qvcrgpxo141ywg80ez3j4huoq',
                detail: 'Enim quae quibusdam. Aut blanditiis error architecto et. Voluptatem reprehenderit repudiandae voluptas. At cumque earum doloremque perspiciatis voluptatibus nemo et voluptatem. Quasi porro ipsum accusamus omnis autem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'a238e9ooc7odfuiek8shntc9k44h07qlkhup5f5ejvl3j32qp7',
                systemId: null,
                systemName: '711l6oieqz45bpx1ajoz',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 00:10:12',
                executionMonitoringStartAt: '2020-08-04 21:00:12',
                executionMonitoringEndAt: '2020-08-04 18:33:10',
                status: 'STOPPED',
                channelHash: 'cq2p9oyoyhx58o4hmbte55699ttrd96neaf06kjy',
                channelSapId: 'p2hbkf6enzmtrj1dw332ej8xskzi0w0dtn338grw2rtl3vu7ll',
                channelParty: '3xnj351exgeufxdi662bhko3tcij5yr1xbbfd052612rjg5p7ihlh08b6btsw63pviobviwo72923124s5gf6epsgztqv8iutvxlwjeoikspta8lyardgfaz0wvmkkwfiudwf66nfmv1z0fhtuadcdamqq5jp8yp',
                channelComponent: 'gqd45m6s2jjtr4688m8687jktstafhrp11fdac8yawncxx2o2ja5wpgz0zj7rez8cyxb5zgumpdryc4hh049agzdk6jpb10jfvuiywco5u9m4kibhpi6n1axhj2t7pay1pjs0h8hskj90zcre5qnlk9fuo8x4uoj',
                channelName: '89a3t0vkfhrbezbg996xpxfow6ruojob50ry9me4zn10ikb3f0gu3z0oaeoib3dd9a79ezup9oijibdve9l701xemv4axwtf7flbw0vs91smqwuvte8jxgb606wgr7hlspie0vbm982wdoimsl5bc4kwd3kv5m2q',
                detail: 'Perspiciatis necessitatibus sed aperiam et eaque voluptatibus. Sit nemo a aut aut non eius qui facere illo. Id quis at cupiditate animi expedita dolores.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'lolctg069ocdbhgr9htd03fxqrvrews35e4a1jgc5eyx94q1tz',
                
                systemName: 'djloa1y3w8lvrv89gnxg',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 12:28:06',
                executionMonitoringStartAt: '2020-08-04 21:14:05',
                executionMonitoringEndAt: '2020-08-04 23:36:16',
                status: 'STOPPED',
                channelHash: '3rzuij2mzyx7uofm8hpvu4ucu3o4orsjlxy9xdx7',
                channelSapId: 'jxsgsg2v5hm1gruk0xdf08tier8yp2aso49hnzxckbf284fma4',
                channelParty: 'qf5f2rvbocl4jcof7b20xrsrfvx7ve7wcrx8y06nreficifu6fsyqg8p73j48uqh59f4fekzuz4my21f7nmd3sndi2f1wm58iwvrx0crhheylwpzdcvnifwnzcxs78fwkyd1crixtnpq3p8k8wio45olizk10skx',
                channelComponent: 'rh7b2qxm4idgbbvkl4pii0lpfhk1kj6oc9id64s2gnsjye1xhsh97ljdchxaxmia31esiyrninji1qwinpi68umsutlzl6pdoc7og2tqn2y20g5pj45lx000ws52wfr593cnftfxydvhp1lzjtn1tybpbxv2ot0t',
                channelName: '2gdfyeyqa1fql45toh9blh09192a7lxwigz8a5wy6xkwmr8rv3n25x18aju22uml3jura8a1yvpf3me3aopp9yx9cf52vxfg1o2p01nxm6e8cxw1etpusdfcwalcumkku0jxzqcx9fevz5gjv293dmgljf3sorah',
                detail: 'Consequuntur unde quisquam. Incidunt accusamus minima facilis voluptatum soluta ut culpa. Molestiae nostrum beatae ea voluptatibus omnis. Consequatur magni laborum quam vero et totam. Consequatur aperiam veritatis enim quia exercitationem id. Consequatur quis unde velit maiores consequuntur consequatur quia voluptatem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'h294fexpk4ii3udo8c83e4m8734oh2hsvuzaktc3p7b6xe89hz',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: null,
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 12:25:52',
                executionMonitoringStartAt: '2020-08-04 19:29:16',
                executionMonitoringEndAt: '2020-08-05 05:05:35',
                status: 'INACTIVE',
                channelHash: '8gt44tcb03b9batea1mldh4jegecwazn53p1aa5f',
                channelSapId: 'r8nngmsxsg5a207ohcq512w2fyvnbebrcnyf32hrb8q1ep026d',
                channelParty: 'cu34vxulqogs1pr9zjo3hc12pscga2lhl5i2x39c36creq2b8j7tqshjok7wa9eq68vpbtj8vec92xqowdiz4ucij4hpeug0tvms2chssn1mdtwronocbn7y9tr9vbiypzx94ra7y7weezsobc3zgp3155f4b7oy',
                channelComponent: 'j9w6f87cklh5ylfukn5pjkoeb24ghbm55jxht7251gx40ck9d7l5y7ap02s8kmq1vszzjrmysvq71pgzojibzw6mybk8x1s1wkzcnw9dfoywyzz15tv9kdxsnfjdu8jaoxnnw60twj7rxo8xccsm7703su7ecqu1',
                channelName: 'x22ez6bq6dexx480ygkw2nr281nl5mq37km1mdbiq6kt9wr98pvw0jf0ousnttl9njphnyvpff2kab8fnipoaumraxljkkfrkyyh572v4qrjj41n7m9kqw63ntv89myl26euukszgh57umqm5d8gwvxkw9k7ee8d',
                detail: 'Dolorem quaerat mollitia odio mollitia dicta porro aut sunt. Vel voluptatem labore. Voluptatem magnam aliquid ducimus repellendus non. Et iusto illum. Atque quisquam ipsam et perferendis molestias nisi ea quia praesentium.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'nnqodhudps9vn5ey9av3zt3wgfanggikggb2oiq80htt95w2jx',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 18:01:14',
                executionMonitoringStartAt: '2020-08-04 19:04:58',
                executionMonitoringEndAt: '2020-08-04 16:38:57',
                status: 'STOPPED',
                channelHash: '6a4sf6zv3i7ygjrl9h9rzzcfh77c8sedkv2hdrys',
                channelSapId: 'jduzp14qlgeqtf85xyrt5bjtqx12rdg5epwa5p8b0kv9ej6ah4',
                channelParty: 'syq7y5ubgftv62f0a037fllag7a8omh69zwnovq5wmfna4maz4xzri0lfulunxeoo3xeq8dch1ew8zzdyleu0dttv2awbsuzd60vosvg10qfcpq6h74q34k2wwa0uh7j08xpq69385k5wwbpmjp4j9g3d9my641z',
                channelComponent: 'xcwinauawrsg2kmvk52zkfsugcpwr9tfmok4x8bpljnkj2qope2egvc09803y8snng1w9kbvlv0nmnw4ebmbch5rodztx87stru1oqnz3ryi6zdv9a0844s04ownwqj8wi138ici8kpmhio3n1rvaim9bgflanvr',
                channelName: 'jfeafk6s8curbxyyftmqrb81f3glltdxvmsh5y4su7a226q9u74575u5yiok2bu9qn82nol2980ywiqkn0lav2j5zoo4tm9izdr5woprzmrqyut4juzxyi1jfmuwcq3nw21vn3vi5yqjf37vf87wiiey1m5epak9',
                detail: 'Totam in atque corrupti in perferendis doloribus ratione dolorem. Sit vero blanditiis cum enim perferendis vel suscipit. Et corporis unde aut ex ea iure illum expedita. Consequatur est enim ut. Similique enim est odit natus. Molestias adipisci qui fugit sunt vel dolorum dolorum magni tenetur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: '8ljq9831ngep1xt3gg44yk0dl4k08mw2s5osoaej73qqz5vkul',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '7ugb1tobi4ykryqfmoyj',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 17:09:49',
                executionMonitoringStartAt: '2020-08-04 19:19:28',
                executionMonitoringEndAt: '2020-08-04 17:59:37',
                status: 'ERROR',
                channelHash: 'r5ad0va5akgw3114r0v0y49qiw2pyzo32wxa0pw1',
                channelSapId: '2g2c1xsoty2cvrv15w82cf6vxk1w5onay2oti3xv42yc46uq1r',
                channelParty: '50q2ejrs00ncy75ei0qjuxxpt0474dcqhvj2n7iq8mu4hnystojc8dimx8rv5opak686rdvd4fsqmm9l43n6irvdedtjwrlzp5gani51ly4p9mvhbq1bki7fl0jfowlqit6c3tolgkedbmb4f52crkzl9y4m650s',
                channelComponent: '8ivxt87hizg0x6uw2gtm3w23rg1ja5lakt1w83akkrziedy9k20g4ddz487buqgitl2lue9hd954w253foajbajv7rlmesio1o6qjrbhv87soeqlcki0pbjawryfqnul61xz49ped7z7ohwio1719i1f5g4bx9ec',
                channelName: '23s3yloxo6stts240x1gjcl7qswehwn4kjfvz6rl2pb0en2jxjijb2886en8zod5t9dhc0w7ig21udupyqemimwmteoh69t89y5klne90ajtx220udpkxkh5o6fau0kr3pv0hroehzv0ef3jbjiepi861hvavv3j',
                detail: 'Consequuntur voluptatem voluptate ea inventore sunt assumenda ut. Inventore iusto dicta. Possimus vero nisi qui ut officiis sed harum. Voluptatem fugit ratione.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'j3i288lacty2w0hganzfnhu422s0ax84fvrlm402kme1d16d99',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'pw5mqoca6vgfwccnwktl',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 05:27:52',
                executionMonitoringStartAt: '2020-08-05 07:53:28',
                executionMonitoringEndAt: '2020-08-04 17:26:37',
                status: 'SUCCESSFUL',
                channelHash: 'ugw5wm9bj023xdson76allhwc3ymjjb9jddv493e',
                channelSapId: 'dkkj6g00y47immaxah0wdp6xwabu3elu8hwsub0swoz8b3ww9i',
                channelParty: 'gvtic6wktyeqdffqfoquffxbcpdku7ric39x4ogz20ran6v0p4qhz4jyrl7c4xi43x822excybexir5kg4wa2lk28imyht1pynkftisblh01ljwzcysw1ikusemeed4mxz4l7eyewfp8p1x9r6343ean4noqkosu',
                channelComponent: '77bv0qe4qfuc76i9j66n8u5502uh8xx5blj4293x47e8r5fblwfgpe28jcmzov41kuq8ky73rt6nhp099th47ffs1tsdy5eseb6udipouaoidmpzdaft4jsn6cr2zgtd52ikzxvxrlo9tbd8x0k2bivhfgiwkg5b',
                channelName: 'a9dhmx4bsid1egvcn34doa5szbd4fuk0f0suuq4jzoshzuxehoo9y0e41oj6yhsjtaxd2bm81yi3w1scx361dnnj2t6qng5lxnin2onqrncevt1ho6xx7l4m7dj54j4hgecam78t8d4tckye0ed4oebibzmboir9',
                detail: 'Perspiciatis iure maxime aut est porro. Labore accusamus illum quam eos repellendus inventore sit aliquid excepturi. Deleniti error doloremque error qui eum culpa. Ut esse distinctio. Rerum asperiores deleniti dolores odio ea.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: '0608zmwjwb259zzg7x93206z6v4djuaeia1c1s4rfhwdr8rdme',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '08e9cp43zefanil3vu7u',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: null,
                executionExecutedAt: '2020-08-04 23:44:11',
                executionMonitoringStartAt: '2020-08-04 20:12:57',
                executionMonitoringEndAt: '2020-08-04 23:15:55',
                status: 'INACTIVE',
                channelHash: 'iyomj9kbasyy2ng2o16yjeqk2tf9vfmmcv3m4jok',
                channelSapId: '5vacn6hp878gv2cukhjztqxcc7lnc7xv1lzwx7x64yzfksumwn',
                channelParty: 'k0va4gw9oegnp0pfeybbyvq9b7c67zqfsjwwzwystn1jjropvdw9kc3psveag4qobx3s5zgu209ga4bu3dljdddnb9ya7lzjv678nytrnr50vx9wcu50fr8p4ok1c433993zlseor1hl1e850gw04szj8u199jjg',
                channelComponent: '8s771jxmneh9griq0hgsb0rebk788w4bbkl6gfwus8e0a9b63211f0l3gmk0nr5z6yt7crbapzsgtcvl2og8l038jzzatj67lzajkq5ho0iqu98xvkvp6s06mpfe7e9zb8w01izc5x0sxtq2wfz1es1jobczj2xv',
                channelName: 'p6cjfmk36gub0oaqedu374k1gwmd30jslfpebek8j5xrjqxfweyu8rzf4tu18t23b5z133jz7dzr66u6fwxmwbjow26z175e2psdexrwz3wv8bcmigzzh3mvwec90upufgeu9oixr3q5imp5wlmskqt6xgnu31ze',
                detail: 'Maiores molestias vel laborum ea sit qui. Ratione distinctio modi. Iste iure perferendis. Quidem sint doloribus eum quis aliquam eum. Rerum accusantium quia.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'hnl8i309stguip7d1wdf017g0el2d0mnxup8mtr2ifk7ms07bs',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'rmj27acob638pw2fbx4l',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                
                executionExecutedAt: '2020-08-05 00:12:15',
                executionMonitoringStartAt: '2020-08-04 23:53:26',
                executionMonitoringEndAt: '2020-08-05 03:17:33',
                status: 'SUCCESSFUL',
                channelHash: '646ba7kgc59l8ck9wzjpos5of3o0f5etsz600euf',
                channelSapId: 'd0h3dcrg44kdfhnll22bf94sxpu0uopy9dvu94eyobhqs6o8kf',
                channelParty: 'u9nz8k3ckuoboff6w3uwxb2hwclms7q2es8ym3sq7cnznggeg42jktvnr9xd3hulagqywnl6smsq71zh7dp5o20wr1mxu1ilkecj6824w9967jgz7k2fhq7giibi85qa4e5brqnm62od9wwex1og5f0glql7sma0',
                channelComponent: '639ir33udxzeyjv1baz8k7ownhco4kk1kbk3n6y0vmxizgmuiddvlvotobpdzq45r2twtk9dro4izpx7gj1pdayz64yg4j9l7hoqe5ecr38pks83e0gj8dzhkybnxbjamd1wkd9of3ltridze3f75wq82e0qi46r',
                channelName: 'bx4x6byd0eu4gv2lgwczfnsjbwt3rc67fhjnkfes7j9v2yyyo0vmcjt3i2jdlpugitap00ky4z1pllwsdmew5u4r5qll2kcnxtl76cn9oyps07b2o92dhoiexz0s0xg494c6kygt7to97taeshmp9ldfe7nwgi72',
                detail: 'Voluptas a excepturi laudantium quo magnam aliquid suscipit. Nulla ut temporibus dolores. Facere ipsum temporibus dolores velit et est numquam. Non quia ut porro. Sint culpa odio est consequuntur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: '1ud1olokg35ucw85ympp27apvcx3zv3ofbuhw6eh96d7akknwd',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '2rn86hro8cu3kn761p4g',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-04 12:44:54',
                executionMonitoringEndAt: '2020-08-04 13:24:01',
                status: 'UNKNOWN',
                channelHash: 'nn7c4b7c4lpvl3ed7z7pxql7t6evnek9q4al44ts',
                channelSapId: '0d6srh2en4akocds7ul1udxjcyaimy8ep884tokxk5lpcqxki4',
                channelParty: 'cgndw7owjwvri6ymyic8hvo7dkzm6c1fsz3bntecrwp4d8wsecjby03z8vx9y7b2xgiw2m6064lad1koi7hjpbgb7aywex5ik77k5jxf05yvl7g40osspjnxxzacwdth98elitf05lt2vw1274q5fr0b2lz7vwos',
                channelComponent: 'gi09p9kpkn0khkk5i3tip9ft9ufw3r8g6ul5x3q0qzu2z8ht3k41qf8ic1w0sopic64n49cz8sui31g8ebll7amh3dq14rzgndbr9mpyo9u3gq3qc1ecfax87ur4kfwrjfgi9lzeqoz2cvx1x5o8e05t68g0t70u',
                channelName: 'rxgzxui61ffzffpket2w68s0hplngryxj00yg3i77l7a59a2zr8amusekuwi1nl65otpd9irzs3yjvkyyn7642tod0i7oniv0yt4k4ons4a4l8rooi4ovcj4by8uwd5sj6m9m7g3g7egk1m69cgn2x6r3y6tpq3f',
                detail: 'Magni quo autem perspiciatis nostrum cum laboriosam eos. Tempore minima repellendus voluptatem ut placeat dicta non totam. Ratione quibusdam et voluptatibus quibusdam sed molestiae veritatis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'ipec1mg4ldebx7zefefw5znfsypu9v26iomtekmc3jzhvkd4wj',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'uegzw1g75ga4zk6xni2p',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-08-04 22:53:49',
                executionMonitoringEndAt: '2020-08-04 23:34:43',
                status: 'SUCCESSFUL',
                channelHash: '45lot36c2u4d0jr2vmkz1okdtxsl4dj2fhillzeb',
                channelSapId: 'wppd8xns16dyek0be1eogrhod2zir096h1lv77msja2uadimcy',
                channelParty: 'd9vtghtenmggcqtdxop0t5wyzk3sg5k69hn0klk1waz3jattd2c9xhy8ijtikyv5dniedstjpo6bpsln9ozic654zbh1h12qpms8qmdgslzl6cgk4qci49a1anno3efks0f7nai40llo5osuifehcu6txflz7fqm',
                channelComponent: 'zmz4ftfa3wlva1k83yfi3hs846d7yl9mr90h55ng42uwiclenu3h3yaouz4kyibqzpxaalzta41tj9vvqf0g11o84v5e60kqqok6hexzxe40xdhn1aubi0pivxvulzyx21p0rii56m85dgs71bi2jm0b5grlcwkt',
                channelName: 'kjpoamf8gaom6aktyr605olyz4a6pcwkr1ghpeshvxify1jygg30usi05gh5mjdt7gn70z4aveggfyu7b7kv0y3iakw6kjefuqezqrlcyawi1qhmnai2ojn6dn7t8uivkblj7t6p3jvj18xndvh41reahg6zcqju',
                detail: 'Quo velit sequi. Ratione qui adipisci. Expedita sit eum ut id. Et nesciunt odio possimus ipsa dolor non. Ad illo maxime. Quo natus eos.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: '980fchjxerzb70xajroc1zkaegfbm4gmrj8ddm0bwmt8936at9',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'q4sjeon43h8zf28gr4wu',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 11:27:19',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-04 13:59:10',
                status: 'INACTIVE',
                channelHash: '8fb36isd3hz95q97jafv36ylz301q8d9vmtgmlx9',
                channelSapId: 'i5bdz8oagif3e2xxkf1xuhacl0c94dqu0vdfcw9x5ey5brvdko',
                channelParty: 'cbcf62ds4zel5ueho02omb4gio2nprgl3ae3x85tc3heg5kxy2ya58aga6ycwhot0q6xcfajn1j6pkz1m435h012fj9bmmd9xyk05t4tyta6wi4y07ri047xyx960qdq8qd66yb70xiw7f78j1k6pm5l8ckf36n6',
                channelComponent: 'vvqxzu5g7hla5boa5kt3ottiatkh24swb899aigfbztajhvfaghb8u4v9fufdfqxpab0wgkilu0001d4kax8djbc9kv8kc95s3sn3amw1n8smf65bp83fjadivk9o93ondrq0y75uiycs7bfstnvyppvcga6wq3l',
                channelName: 'tx5twgxixmz7v84iz9kwdbbf2hre5g4eohz79y6j8rtfbzf8gt9361z9jmkxk0k3rvtwx467hegj1kvtozh8s00jrhgo5cgdogks3jwno2qmo41brr3wxstcdm4q12hflw72o6u53gadf72u8tsv5xo1ov8lorhp',
                detail: 'Dolor voluptatum eum officiis ullam sed explicabo esse praesentium. Est distinctio sequi in neque blanditiis iste ut et et. Aut non inventore.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'imed2fzhsee73x5eoh32d33gqph5yf9ggmlow6ih0h6xp57zgy',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'aduezki6wbmnuuwgpcgj',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 14:01:43',
                
                executionMonitoringEndAt: '2020-08-04 23:52:02',
                status: 'STOPPED',
                channelHash: '1qv4mffwald4qnrns9nq7i19516v90qmei14r0du',
                channelSapId: 'oo7dcui18phridscoh7ir9y5kjpoqqu3rc73kbrkltwnzjyi0v',
                channelParty: '9d49at70pq0wvqr0s7fbipq5nxo2m19ta99a2rmu06rn6ykb3obtgswl67bs0obe5tpv5eenq3jh2mrbnxhmxyv9y1upclqqig711e4njygkarf320gjzhfbms493u8m61j6gv8my8ihal6r91zvhh2lechzi99b',
                channelComponent: 'vz0c1wkcvjr6xsr8mbtpjphmpvbb8oc4p3d98r7nitevn7b5852xopgr0ageufo252n2w9ve9klkhjplh7v26u3a6yt8l3kkxn1w3x0ztvtcj6o5mx06vbtval45db07ed1s954s8ioosvmqukkqgtvp6qjmmyjv',
                channelName: '2fkw2hoj50xfmvhwsym1a0alr306rp3v0r7y2u2bweg9sgveg3u7hy6to5uh52vtw68h3vfjdqf8iojbsdrb2dk4wzml1zcohahhclkl9k2wy2qglucw05z2p9px9wz19kf4lwfmq85o10hoq08xocsp0dydhowz',
                detail: 'Asperiores impedit non optio adipisci est. Non laborum sed aliquam accusantium quia. Adipisci adipisci dignissimos nostrum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'bti6faqqm2e2l02czhj901ytdjnfdqkwv3t9m8jnawp5rq0e78',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'cjy7elnmvdd6vpwol2ir',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 23:50:41',
                executionMonitoringStartAt: '2020-08-04 15:59:23',
                executionMonitoringEndAt: null,
                status: 'SUCCESSFUL',
                channelHash: 'rw3lab1kyxdhfv1lhe2c3z2ffpcu8kr37ig2hr6m',
                channelSapId: '8epxz73vipwzxs72ubntlej9pncsgu1bt7k77vwrtwinqat3o4',
                channelParty: 'z6dbphe3wnk9wm6l80igexkl3qb14yld89it6sw9kcm31mwpiz4ocfn3x6oqg9330w22onaiq45zcm3pkin2ijaz4m7d75r6daqfqj3g27pn2x117mvsk6snsqlbyhw4ef0bl2f3e6ezf6xuhytyqqri1rnsg00p',
                channelComponent: 'cd6sxpsmt3m76fnm5njak5ii493auhuep50ixzon73zbkqhnhj01vfzrd8o2jf7nbxa7irrf5rzhe0hjsu65oqaeqjyuv3hk267gfzln2cv42oy9r2uyi1o9acs0jiy5wmrmwwm8afci7awhx0xcqwm1wzg5c9y8',
                channelName: 'st6ykt31twc2wbfxe8xz9hfkptri0ex29jm8qgyjkdqzqeq2uhteqt9jgcsvjnc9mvufxtzocim17cl4lp57rtc1v1hwjzcun9t1ruvridzx6bzzxzvyapqvtqc207loglwgqi76jg8eb759522o0rhtjz4crc6r',
                detail: 'Laudantium repellat ex corrupti reprehenderit soluta. Consectetur vero voluptate commodi. Qui labore ipsam itaque incidunt unde laudantium officia et. Doloribus consequatur veritatis mollitia. Dolores enim iure reprehenderit molestiae hic.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'qnnq60788o0yhfjkvxoumanynw6k5b68t69pd37jh8a3nxr2m2',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'jop8odt60hnn6gsp590k',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 23:17:47',
                executionMonitoringStartAt: '2020-08-04 18:20:43',
                
                status: 'UNREGISTERED',
                channelHash: '8knfvvhz5m0xsxj1ywq9bj5krxhmnc1lrr1o5lkp',
                channelSapId: 'pbvccvk3jr3vf9a6asnkkyrsjbm8ohgjylecqqlo4wvznp0cqc',
                channelParty: 'yrq760y6fbexeyiztrj3tyn8nnxgbinryq0jchmftmmuitj0uj1293kyg68khtdyqdllqj5o6wadqc6ty7suimb9a21luepuf5dl1jrzitygkj004xa0px6kww4rr21ie8btk79gisd7cit9nldptrzggzwm1t2r',
                channelComponent: '4t4sret856z9ql4k2a33vcwe9oe4sonodl57mxnmzah7mfdph3r6qygih850bsc8i9b9r8y5qnqp4b86w2bkx9idl7h6e64l60ndtwzu9iqkmnuw5iykodideureu196e4gxty6on8mzlo03y96h700e5pu7ubwr',
                channelName: 'qqf0kl51xpfl509zlx6jetqyw51xdplw3mt8a2mq0tq3c4e1p1vkmmcxunayiuli503tedvni1vasaochwe7l3ps626q796igo4v0v7ws00vznvhlyrtp65rcj33xnx50k3l6oqyabyg91db0vbxa2aft0uklywj',
                detail: 'Aspernatur et minima sequi dolor tempore reiciendis. Odio ea laboriosam quasi mollitia. Non modi velit sint sed odit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'bs9wfvelfvvigwghkmbexmg6rri0w085nyx0ialzhgpenyg06c',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '9ufbu9n0toht1tz8xw9v',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 19:24:14',
                executionMonitoringStartAt: '2020-08-04 13:07:46',
                executionMonitoringEndAt: '2020-08-04 13:50:09',
                status: null,
                channelHash: 'uavxgi99i25jc0jgynf8dingb9prtqs3ppgs9ppz',
                channelSapId: '5t2qr03n4daxje9b4je1iaiqdtv9bsu6vv0p2jzf17ickgel1i',
                channelParty: 'vcca48fceoe78a494e1d0f9woffap6yjccvsz5uj90s23s0hghb6xymwxyttedpbymzf85esd6a9ke039tvvkb7zec2a37059gtnhhr6wd25l4iym5wk63ktxbvnce39kh71vhdlh2604ejoujefwy4vziyjd5ps',
                channelComponent: 'jo7b9b8wwa8y1ml1tm0c4f84s42b1357qdb9a2alv4y5i2e10z6su76x483wrsgk4r1ez0nyi42scrwbmty0fg9odrz3e5yv79qdkms7mdzlfqa8x28xovw0s6c31i8lw2l4tgqkv931h6k51ex22vtw0ag5wwdl',
                channelName: 'otmbq47awkvuvypjc1tpseh4fpzquhezutnp169xla9tbcq08jvn8n9s7d5h40wx0f29frml8meyy2tpbxc37o27n0p0xr1xm5xchi7y8vhpysumwzzyjggywtzbs1dxxmg302xtohg3mtgut6ui7dwgjhsb57n0',
                detail: 'Laudantium consequatur illum eaque non quia dolorem. Et explicabo voluptatem assumenda. Aut ratione autem alias earum dolores repellat. Consequatur tenetur illo labore. Et earum qui corporis accusamus sint eos quo. Maxime est vel id aliquam consequatur voluptatem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'du8cbzf2tryofjrdrvomnoo8cvxy4n8dgznvutgict2m2a2rp5',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'pgoqk00iiyz4zts00fxt',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 09:42:40',
                executionMonitoringStartAt: '2020-08-05 03:37:47',
                executionMonitoringEndAt: '2020-08-04 20:26:31',
                
                channelHash: 'z8f6tkbdk1jmt213d9cz72qd431n5ptsemas5hki',
                channelSapId: 'w5j2yxxh2znnj52f4puu5e4t68amfh2dblachxgvoy83ldra3n',
                channelParty: '7tv2qvo00onlh55axxd71y3lssb04es2impazfp667ywxiyiue0r8m47rdbtjhf5xd5fs6jgcl1r4tfh4gknyru8upv1gfqlrzrr8ihvrlvoxjvidcm5nsfmhekfwrh5yoegvzqw25o8dp4r8uaz9kq4h3ueqkbi',
                channelComponent: '1ho1fmik0ssyom9iujpadzuzzpimguuyzotckmvyftytl2xbln2g8unv9ure8q1kemttu5b0hn0cxs7lah66svpq9e5wbwilqyb6hk16x3lzel2q26es1kvmnqe4vmjrx91vu7ldji8ym09n52o64gx1c8n8p3ck',
                channelName: 'y0fsbahpaz9opinhbogxqnivtrmdbrpf9qv2edp1wisq55zf8modjmfnlrkmhjsbnr4eex8n7elmvc96ef5e2iq466w1l4rlz6g4xcs2fc2bqtfu5hpk6z8mk25raa7ogicptp579sl30f11nr6jed11jxkthyrk',
                detail: 'Nesciunt sint enim enim deserunt tenetur beatae repellat voluptatem eligendi. Voluptatem et qui. Excepturi labore saepe id vitae consectetur repellat eligendi. Dolore doloribus est ea dicta quia alias.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'k507nhz2wx3m8lnsuulnk1435szgowfzsl90x6quzwm1zv30mi',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'm3u3y4b610duimsgirv7',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 15:16:25',
                executionMonitoringStartAt: '2020-08-04 13:48:55',
                executionMonitoringEndAt: '2020-08-05 06:56:33',
                status: 'SUCCESSFUL',
                channelHash: null,
                channelSapId: 'dy9obwq64cgjbmk8pwz29zgnwyo2xckv8hjxpt8sos6gl8p84d',
                channelParty: '5g35yg53p4qd6b2esjr0dr3ejxip3lv29i1uzn027ilk4cpm72oymbagjemi74l4qqt1tu9sdfdxigkyc58a9yqf74czb95wqbszkvvbnn1331le5vvtkjr8wotzjbjgax517lvzyvbupeuf29troryq62blzc2c',
                channelComponent: 'og6kpw9nc9u42jznw3m6f8yo9an9i6x0upzi6mv71p2dam76rxbsrdp70lypje7qzlvabrg9iji63t9a1w3kkwf4rsrdrz8ect3i5khdsb9q9dk5bpp318yc3hgzt7ww8oyn54dykxpjvqhd5jk7hy8dosx21ost',
                channelName: 'ebin77bwh2xd4g4q56h7tle89nqo1yklwra961bifzpngyvipbg7ys02m6v6d7lea6iz8xqde6ddnysl7qwe6fzfm3pzoslkgdm0cinnvlpp389oqul0rjlouflaorq2fl7v5654qth7794ql36q4yzi93i2mbny',
                detail: 'Amet nulla voluptatem ut. Enim maiores aut reprehenderit provident. Qui provident temporibus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'jwi5mnph9aobvohz9dlk0igbj6jfdvpvvx3yvumui3xhfei74r',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'elzn5ey6mavcy39dus5a',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 04:02:38',
                executionMonitoringStartAt: '2020-08-05 06:44:58',
                executionMonitoringEndAt: '2020-08-04 20:02:42',
                status: 'UNREGISTERED',
                
                channelSapId: 'y5na69w1ky8mbgtt2e0vt6ksgzb8jlnq0qm7imykjcmf2wgvbb',
                channelParty: 'djvkkivbjr0w0oy363tc04jc8wmixvsi14ghuewi80jyluffhiokpeg4gmytbfua5rafvjbdx7c8l1ruivinbv5t404l7xz1pc9x7o21f2k9a4l8cfp0483u2uldvugsw2ttx7rfurn9u457wpe3n9f8q796r8e3',
                channelComponent: 'yeu94ea7i2b4ibfy8b5hut7t2icmc3h0fxcukrqfvln8ff1rqle70pqh30i3ycvtqjpscvpx4xct6dzm678540fhe45reon5wj94wqaxc4tm4zuduzeqhxdbcwh9g59uff3ml7lnsrs3hl4dobncrr0lsyl26y1i',
                channelName: 'pyzkzpfy1wgqnd9ug5psxnz9zj6h93h5snp73bscvhds7nrriel2mu5ls6gdll55gfbb6o3pz6y90gbggkfi85kbtvqkz2dhhyb0ykmipnh0704j4dxpdba1zexj9ww5jcu77973wsykdghuqbh51abolg6ikbtc',
                detail: 'Consequatur eos amet eum accusantium. Exercitationem veritatis quia rem error odio. Rerum qui eveniet id quibusdam in eius facere. Ipsam expedita autem dignissimos omnis eos ut veniam velit. Quis id nobis ea molestiae.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'f2p0iactyv38ymkfylgf1zsp8s5t24pd8hkbq9bg6pmi4erf0p',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'ybugh5rcseyfwuw5pbs2',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 16:33:15',
                executionMonitoringStartAt: '2020-08-04 20:17:47',
                executionMonitoringEndAt: '2020-08-05 04:14:57',
                status: 'UNREGISTERED',
                channelHash: 'ig4u0lt9vtfcodjo2b2cfuhxka9dn87ka4uyv9sn',
                channelSapId: null,
                channelParty: 'lof4wtz0mdwwcsc4sltfjotakg28x1aralvtbf8h5a48qdtlop7cq7bis7dz0i7lupbqbjh9isggq2upmk978li6u4ikwupj7d2l3cext53apedbpn4ynt3xprokfvk0929q6g5fp40vr8a49dikq80xqf9h6pxl',
                channelComponent: 'whsq63qf9afp5d6vbpaepznfefcegx9a7rm4v37v5sbwfcbk9w85qblk7uq21vpnn1q3zsdu81rjwo4urg9dtoe9d1ldyc1qlldz2vayalqyz6jfukqwiw6i2eo0gmnspkoqfjwuun1jocyiafwpjauta4zmy56b',
                channelName: 'w7fqgh21q668919cpjwpdrixv46v5hopux09cpti6bwzvxclknvyqxrun7le1i1419l6mn337tmw2liacagh1pe8dnz0jmu3gigtqetymltho8q2uplqxpgpgjxvvg8uj02yane6mxyg0pp54p1085s0k6ye5m3y',
                detail: 'Aperiam ut aut officiis. Quis aspernatur esse consequatur laboriosam nulla aut non sequi aut. Dolores cum quae officia illum. Esse error ducimus est possimus unde hic ea. Esse nulla incidunt. Natus illum impedit ipsum culpa debitis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: '6ij7qzurorqq8ujbhkd143l5ychncmy5gkz22ibo8i7pz8e4sc',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'c2s7w5u8lvkq5svdwhgz',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 20:04:04',
                executionMonitoringStartAt: '2020-08-05 08:28:55',
                executionMonitoringEndAt: '2020-08-05 05:50:31',
                status: 'STOPPED',
                channelHash: 'kg68g30hqiup3qumc0qjndqzk2hcvttkxfgeeomb',
                
                channelParty: '3dl28aaz4hnpipbo7u6amn3gvgcion8wi321ytku8vs4gfnv3h4wsuatgy5qt22mspqlugefaayi9qizpzxtswgdauo2z1wwh2rz65im7sfdhax45uxz8impra6fd91xty3lxn1jhav2ilb0g8203csds0veo6tp',
                channelComponent: 'hqlcv9d1vna714d7e3jqwpi5tcfu61l9m1isb9dfdl4p56s6sskxcil63zgeewqrhx917sq2y0pvx4g1g3l1w9l0eyhskylp6o87gkc7s9ox3fjinx97sa4h0ir6jk26lf9qcz9vb99hpb9ze3uzlq3fgs5j35rz',
                channelName: 'r7n7gikl6rkfq4liv61cwtfpbp3ixe6uspxafiiyx8j9mcttjeysh7wtd5kzat31n8aviezaq9hp37idgzrmp09vf9lxz6paw7hg9k3xqfsk5iupfuz92j1464wl8al1kfk4mx9l0em1vwqfbv17ikf9hvr85xrz',
                detail: 'Dolorem omnis et quam earum placeat voluptatem sed non omnis. Qui nisi repellat sit adipisci voluptatem. Occaecati quos est nulla iste asperiores excepturi. Incidunt quia accusantium aliquid iste dignissimos dolorem sed nobis. Culpa velit sint maiores officiis qui.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: '6j5owf8kz2g4ainqsdsgh1gq95575rjnwzrbtqsubc5gql8y4q',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'v028jkuah6i0mz72oac2',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 19:28:08',
                executionMonitoringStartAt: '2020-08-04 20:29:03',
                executionMonitoringEndAt: '2020-08-04 14:08:39',
                status: 'INACTIVE',
                channelHash: '76a5pqefnqlb6zjkzj1i6xumw9crqv8mrt4fkxqx',
                channelSapId: '9b3s7vk676kcv9dugyls1bsxt2nvv439h5xxv9f5osifqlxc3t',
                channelParty: 'gbpkvfl5zmvsp7deszdzfpi1e31y2mys0rj6zq8k53n03bghyxwqha9feg1r1o3qp3g9ry717lhev6ucprzpxdxdj5he5ei8q90sj6rmsd2v48dwk5zleld8sobwbtt13u7apg4tnlw2bjlf1qw07yjirf9e9hf9',
                channelComponent: null,
                channelName: 'qm7zz87laweegb4q7i4q24ah64r4q4t2hggiw2d8g6q08syr3fxfinuy6vuadkp3ypk0ko4f5ov2bivt1ah9dnvu915kr3kiinujvf1gson4ogrmt580ywzham16hfan3017nanb2v4zvud5uaywxykrt7noz3gb',
                detail: 'Incidunt explicabo est aut consequuntur. Sequi sed sed unde atque sit velit excepturi officia. Repellat voluptas quis molestias eius nihil dolores.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'lfnigihyebq2d8sxafud205ykjzo6abaihyojd58bt9b4rcxf9',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'wpbkac8a2im1c1xezwk1',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 00:56:15',
                executionMonitoringStartAt: '2020-08-04 10:26:14',
                executionMonitoringEndAt: '2020-08-04 20:48:25',
                status: 'SUCCESSFUL',
                channelHash: '469hipxury9ydq6rn2094dghater9lzwpmmu0kbw',
                channelSapId: 'zagcn5ohcqn5kcb8ofzqy5uqgbam5vm4p2cgh276el2femoe6p',
                channelParty: '67l5kbby06r6uoa4hh6d387879wn4q5pp7hrgnabg3q3i6xm9yf2ix33i8hqw5mautsirx00finn4rx9sox0rikfj35s2hnsn172dj15dxk7fkjh5dd28gy85lc8l5zhmxq3wzlcaq4soel9t7327gzpmgm8cvbh',
                
                channelName: 'wum52pnxvdrh6439x1aeaxzhn29dyla3ep2im8yukhf805gb25k240y8ma48j00k2qkxz98krry25qi9l7z5ey9rihl2g06bck3udiyifrayycxuszh7znvrb0kofqrbth2lf89b5sd1bqsbx3bkcrnsjkez2g37',
                detail: 'Ut veniam nobis sit nesciunt. Consequuntur facere tempore id est. Eveniet odio sit vitae repellendus. Voluptatem ipsa autem ut in. Fugiat architecto enim non sit. Odit est pariatur alias.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'br1j63hczz63vqaawqq01b4f5g7xhnls3eujc9ice96jo9dptm',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '5nkn98z351vg9rxunqso',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 01:31:59',
                executionMonitoringStartAt: '2020-08-04 22:34:51',
                executionMonitoringEndAt: '2020-08-04 15:52:32',
                status: 'UNKNOWN',
                channelHash: '3o09krrfkm5quu064aa1ayrj10l89pkp2gvmkika',
                channelSapId: 'creb5a42mgs3163mgkrzan0f2giblk9ghjeugh0i0yceyrvozo',
                channelParty: 'vgahh5orv62imnp41o9neqfrvv4j9htydr21hihm2s0xyfvb7y2bpftaox2om38l7nzobpvsoqajxa6b0pa15wa7d8nloyz7z4o7ao0pbpx4sqwgqdidpzhcj20hsoczu1z72iq81zg9lmrc03wegamdupnxshkf',
                channelComponent: 'kfadvjrd37z6xypa15doxur0vri4q8v7pjdmg5zu03ozupin2vp8s7c3mqhuvvzykzh2tj8noc2hc8s97lfxplr88snrpgk4x1luah9y112dqtp2kcrtbd77wkmvkn3kiu82530d8we7zxg9x9kb15sd2hao9ojc',
                channelName: null,
                detail: 'Harum vero eligendi et nihil similique delectus mollitia est. Esse error aliquam vitae ut. Harum voluptatem recusandae accusantium aliquam qui et delectus et sunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'gti8tqy8rk395siplpqwzwtdg59kjlqjo01bvhzhh780qdjd5o',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'zjqmtoil07u3x8rw8c9w',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 08:20:57',
                executionMonitoringStartAt: '2020-08-04 09:36:00',
                executionMonitoringEndAt: '2020-08-04 17:04:12',
                status: 'STOPPED',
                channelHash: 'a2p86de07xiupo7d7gj6bzo2p5iiv8f7dfvwycu8',
                channelSapId: 'vxe8y3d75lp6imtkcd803zsdcyxrunbo8cn93ejora4rwnwana',
                channelParty: 'pq1qnhdthcoyz7piv5pg9rakguxqjhaxfdqpeaarhu0ygjlnohzpwdljprtjlhbvpxh8xrfi54qy7307fp81n21fvk5x6s1i0lmih3n3qpt2h1g2egndkuz7gmodrpmaj9k4o4e863khxk1lz0xtx4l11to6s1so',
                channelComponent: 'ehjy7zrv0fs4hs17jq05b48n4klikqrltmczlxckyqifzroeb4f6a9f6c7x6go26e5s4r83z5p35gncvndj6ws6gpvbdr8jme7jkn6s15c6f4ck37flzynvlt8g08bacatnr6ic598v46nrnkxhccowbmugjn5w4',
                
                detail: 'Sint molestiae odio sequi nemo porro doloribus reprehenderit. Quos quisquam ullam cupiditate. Voluptas officiis unde excepturi amet ipsam voluptatem porro veniam laudantium.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'aiyz7yvc4qcmcqdotgmh4esznf1iz3eqby6ez',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'dmzlgbdckciw9pkvfxi5wqgz2gnbg1cbdh6yecmbceedny7dp7',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'ogwu3yl3j4oqnza0a951',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 10:29:36',
                executionMonitoringStartAt: '2020-08-04 21:07:24',
                executionMonitoringEndAt: '2020-08-04 11:31:12',
                status: 'SUCCESSFUL',
                channelHash: 'fconj2at1ij98zi4x78bneotvhduxfgbijqwazrj',
                channelSapId: '7u61oqx3xwnexowtprtoqe79exoyyn3r3fwafwph176u1ikhqw',
                channelParty: 'utf2u0mfo5j162lrzqyb7vqcdm390g1c5ps3dpygxqu9khswwh4b0l7ry5pifq07puykhu5e8bihgom0xb5vq4zpdl9qnzi7s8dooxaxnd17f6piebhf29f0uhqoyhpanw8ylk6crc9er0l0sii2gy6hrpqgojt3',
                channelComponent: 'gqmb737xmojsbl4r2s7jiaubrdhjktzneo670kc9xc17r0t4vw3m2l4o2zbr4yhc49hvr29y9qyvgjs4htjikqsiyd9rf7xvw1y0w3n3aoqy7pnq7dexhv7wljj5ug2508dd2jyca4altxxsprjezyo0mej8lzqq',
                channelName: 'upjepxqnveie21wh0hv4fttcm5qhgm663mqmj2vszuo50yxmnw1kxp30anj8mswwkuhit4b5oclie1lvzenmxbduwq4vsd9fz3bu4kom9612y7dw5l0e5emlw54vr17ebj9tnklddw1d73hp1lszv4bw1tjrn8gm',
                detail: 'Veritatis laborum optio accusamus quae excepturi maxime quam ut eligendi. Quae numquam quia ipsum omnis vero voluptas nihil et voluptates. Omnis voluptatem et at dolore. Ratione minima aperiam odio non est.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: '28td93i547fe3xrakb10epat4robekivdyayk',
                tenantCode: 'opo19dy35lkab7pr1bm1qh77kri7wgww9r4nta0vqrx7bvgwgl',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '92db4ns29jnc7vumpzh8',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 11:52:24',
                executionMonitoringStartAt: '2020-08-04 20:06:29',
                executionMonitoringEndAt: '2020-08-04 12:16:19',
                status: 'SUCCESSFUL',
                channelHash: 'vk5ne9cu0byqtivtt2o35ks6qob8knv2cc4zco7p',
                channelSapId: '2a6ljdnh02j4yus13o9vzeij3ef749tw94k8s2wl8t0ov315m2',
                channelParty: '4macimkymqkqvkuhsj0z723jh8gyq0gm8gf2ugl84tkjm9dxwz03t6mzp5occpzv2pbl0i96j6jtvs1mib3kxirch7fi5clzhbk1xbjo014tvsaffpzey2s0shlezobaprithpl7x2x9hf20ypp9n9fkd8dwczw1',
                channelComponent: 'ff0m7b4acq5tjhs7s40mx9tffruor7ji61lbynr7asyaerif78yg7d4liv12a1lpsqv95vkybt8sh5msotssx77gfaqoi2t4geh1wyy2nog5jydeirc5ydmh8u7xp52pqn74yunxz5jvsjblfoxbu3vmca3e2hob',
                channelName: '9rv17m21pak02gpwzpzmhkdmxn331ws1uuuilsl18isgbd0w3kiy2fj5pxln4vtlt4qn6c5ei43932k4q6nwkcc7lb719fveznjuxm5lkzdp3carcq266f81mt9kxluna7eoaflu03banecyplfw0pebrpguaevb',
                detail: 'Eius esse quidem repellat eos dolorem et tempora saepe. Eligendi incidunt adipisci aut aut architecto sunt doloremque neque. Voluptas iusto totam et eius optio dolores tempore et. Esse inventore eligendi eum possimus. Natus accusantium est in voluptatem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'vyo4y2ryu5mimnkgk01khyrmyw7oar2tdnbzdaigy5fpakcn36',
                systemId: 'hbtsa09xx7fwqd6mw1w9vromby9v1msc6ozte',
                systemName: 'ohvsorizbg04lezg1ru5',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 22:50:46',
                executionMonitoringStartAt: '2020-08-04 14:25:10',
                executionMonitoringEndAt: '2020-08-04 23:30:52',
                status: 'ERROR',
                channelHash: 'jwdjc35ea0pptmnj15p9o3nkasn8bxmephhjm2qw',
                channelSapId: '9eaj89vnennqt95tocz9fne67p5m9ibd90tgar1jyd031z2vdf',
                channelParty: 'wokcs9ok7r730fi2sv24vk7k43so4unl9tgpwc9xj62c8likem7t2cf17o8rvkdje6c4mkj96penb8czab6xr5jk08rk8d6edraxezy7suk7patrdkxstsqtqww61l308sfuw7zqyajge2gyoatice9tj59591vy',
                channelComponent: 'el42v87h49lzoi0vt7wximtttt7oq2pdzkndes0bmrqmw7wzfqbwmqvfuep16equvaful3v4atiy0pxtijb371b0i1mp507z5urjlqhtbsuq4p9ysrmu1ea9qhrtwxlt1vsugq7z3eg9mdca5p93b2gg0l6u4aik',
                channelName: 'blcb233bw7yd2mqse8j8617dnfosbcf7svj2sears0g1l8azldk812hba4jzpc0hfhupq1j8y3c58phtkiezi2mrs589xvn25ph9try9zlcylzpwtxufyukydt1ek986qkmn5le3bh8cw7v2j53pm9vkqjdtuskl',
                detail: 'Vitae quam iusto id asperiores ea nihil dolores et. Aut et eos cum quo cum. Neque porro dolor corrupti aliquid ab cumque. Commodi magnam nostrum similique. Repudiandae vero dolorem architecto. Id sit soluta et mollitia earum et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'm52s8l9nqnvg0y9bik1s5b8r3bgw1opbuoy7ghb8x5doz7993k',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '4pc4wmi87pqna22hpdyf',
                executionId: '072fmv4pfffalk6k2j3bwi1mtihkk2x92uuyh',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 13:05:57',
                executionMonitoringStartAt: '2020-08-04 17:42:00',
                executionMonitoringEndAt: '2020-08-05 00:34:23',
                status: 'STOPPED',
                channelHash: '8fly2ki86a6zdvy2hz4xfrfl91uppemo9lvhkgyx',
                channelSapId: 'gfkfboaioc7bf82jrq94vityzxz75l2gaiwzt2q9d50vgoq3tp',
                channelParty: 'rlqts5rme12hjq8a51cjza8xfgk90jtjp3pr1398j2l93hgccytj6dsf43qe8keiys7l9jaudn5bc88uab6gooknuj5hfoxytxv9nij0j6fc12ht4o3eamme4wqeehj9wi2j2mxoc6r7prqpdwas6aatc0qv1wzm',
                channelComponent: 'u7wximx7825mcvhs1440h03nfwsw13yhczgn3lfb7gnnxw1sa406k04nl23tej3s3qql20re568v2zqds3ra4895mypd8r0x8ezjhu5c9puliu6vucuj36n0gqiydqf5f5q5dlotaaaf8kfb8xbjr1zvddecdjbu',
                channelName: 'n3dv77xphv56rwy749cfyqzxa5v2afqni2bmrwofn4rlazc992ewwwgyoxyblpc6z1ceorhauh5eyvzdbjkhw2jovr7ipxw932e4relwkgwtsmkh9xw0f6ogjc47t8dy8waw0px77gndld8m4stp08j1wlka0148',
                detail: 'Qui inventore iste omnis sunt amet. Veritatis natus corporis. Minima repellat at.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 's7ovv6w6anxy4gqtebleg1si4skiudeboc5v0hflnb3x2rtrej',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '0mcv3ps5fhixzth80ef1',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 04:10:07',
                executionMonitoringStartAt: '2020-08-05 06:10:29',
                executionMonitoringEndAt: '2020-08-05 03:40:38',
                status: 'INACTIVE',
                channelHash: 'jojjgl3pi9hdl9aenx4x25ynzmnbicua1vnfpada8',
                channelSapId: 'e5czl7b4a60c345ppily5v2nx2oesqfhxy0qwvqvurso5la75v',
                channelParty: '5kw7evsu22f383kqyxgebzyb92pq842m0ha2rp1ri034tgckiby1gfmd1yg6l6bb0qqsq9bx1zblxwajh1xtuqbrpk5yppgvsj4gsg7oyfu8snuquuof4tnprcyi77zcw6fcdwqw2nv1ol81bwtunqqyzgf4lupf',
                channelComponent: '03i15br33dktyozycxii1kp0triwday8qty6l6mrbazp8bzxajjj1k2cu50kugh1wsp2j8eh7nq1e54o4on6d04tpcmo3sq203je6gkgbkc7dd0wfgbf5m3ho1ptik2z1hy0a6exuwtmdcqbf5t4n81b6mvmcqdc',
                channelName: 'n21t38udcwy3jzexl4m82gdo4byk2cfu2srk9erf1rw2sjaci9if20b3971cdwqnk7s0in13mxorb70gdnvsx1lmb3qc49mml1q6i97bw4exi3sj8y89yqogrivngs2ugracil4idi1eg9ksvjfrxyqx4vvr114l',
                detail: 'Corporis officia fugit reiciendis nulla quas dolores eius libero. Corrupti libero ipsum. Sunt harum earum. Consectetur quasi ut ea sequi laudantium et sint. Ea repudiandae dignissimos voluptatem doloremque minus similique.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'jbq2jc0nh9j43np8x0ifyddhr6si9853k8jszgv9c0mf68udk8c',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'ue50grtuzyx98rs8ozhd',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 20:01:45',
                executionMonitoringStartAt: '2020-08-04 19:28:50',
                executionMonitoringEndAt: '2020-08-05 04:35:35',
                status: 'UNKNOWN',
                channelHash: 'kep9ywqkoqboty626g0iuw4s55egf8lz3redux4r',
                channelSapId: 'hbj95gr9o5dpgn7m21xmoaeactkoe6ggo5ge6oe2g3ih8gb6nf',
                channelParty: 'gzi9lbvpd2x5cww4flz5yf5xlatgkxpn1trub378pdhezf1htke2pz9ikxz2sb935y090uk3vu5t3hfbv1cpbmnqzkjw9clyqx3s95lgvln0f8lichcr7jqhpv7sqsbs1qv3jfobprwxrwhc5x20z7ecokduv2bv',
                channelComponent: '7qnrewleva1vdyd0oya6le45l2jgm5dk6qh7c4x3wcr113jylltkvqx3r36plkx4aakzy30s8198lx8r6fqlbjkdxfxleblop2cr97okbccvl9miwevi6oganerj6l38vgiz5a2lm5s7kqoaxso1nupy2hzvddrb',
                channelName: 'wki16lrt8zpevlh6mihhux1d064tyem58e11vtqcuhpzhvjs4fy20ffgy6m6ameuj7skuwm0mu4smfwu0hpxdyra92umv14weevwp5k0j59bxnbp6gndlefj0iosuz285rkikypoynkq1pt5f0bbkmcvok05ohwz',
                detail: 'Aut ab repellat est autem consequuntur. Maiores omnis et. Ipsam tempore qui beatae ut non quibusdam distinctio. Impedit nihil voluptates nemo sit est nesciunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'clot5xkmqligzqr9ic8b4gx3ms0byb3tvqbm8ugoervmj7is43',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'd3wpbscjhsumgwy23m2qr',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 16:41:37',
                executionMonitoringStartAt: '2020-08-05 08:42:52',
                executionMonitoringEndAt: '2020-08-04 13:54:28',
                status: 'UNKNOWN',
                channelHash: 'xayq7ohtdep9mbsauxvefbxwcoqt0mv8ruqayh2y',
                channelSapId: 'rzmi8zl9pr0lh4ub45hv0kr74c3lcq11lipm77bfevgc1p6b2q',
                channelParty: 'zdm0ft9z8rohb9fkn7gyw0101tqqngntvfjexxuvl8nsm4ycwyma566pxfblvv53jmzsp464u0d4odlznh5ey2z4kuxzyz6c6y0290jpvl39nyylfkjdm8wqnx4fdte8yy8f56ys1ven5wabogwoinblokh8flxu',
                channelComponent: '35f0gh8mie6jz3s59fw03xdj4xviibnwuvs7c4mn414o2p47esuyaosmesd2l8jm6by78s3wmz10y862536wbbagwu2qid1zc5hgnrz27qeu1id2rmtnq87og8mylmuq1sdtj8izm4qwxyk7jpnwqrk8pojafeks',
                channelName: '002gdtccncffmy6xtapizdcv0wfztgivp2s64ny9uj068fq9zaxue9bv8ej1pdmilon9fqw2138121xsnsu6bmtcznsx4qaud8r2vmoxsegwia0gdhf6h565xpsir2ymcwp0b9grrk9sha6i9d7w4c1oo1l8zr4q',
                detail: 'Perferendis aliquam eum ipsum. Illum eos dolores dolorum et qui sed officia. Quisquam sit neque aperiam dolor dolorem eius. Facere suscipit doloribus omnis omnis veritatis eum quia ab et. Ipsam voluptatibus quaerat earum eligendi. Architecto sint tenetur perferendis nihil omnis ea pariatur incidunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: '2s47pa35btiiqltnlebmuq0k2erwjo80lu0qk0y64gn3ivzq6y',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '5i1b0pyt2w8yz0dhiyvd',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 09:58:47',
                executionMonitoringStartAt: '2020-08-04 11:54:33',
                executionMonitoringEndAt: '2020-08-04 14:18:36',
                status: 'STOPPED',
                channelHash: '23g32cjszrpqhkherq87eeb5dtmz7l7mmgspw1zb',
                channelSapId: 'k731u6irs3z5oucys166p4d6c1p9olslogjbys8wmy6pzfnmbyf',
                channelParty: 'gdw6j9s47onwt46k9pnr7wxnsj6e5yghtz3zqcjtsjhjro2qskjcv6hou1yz5r7aytj4olqrm7v9jepoz6xjt7aczv8gne2km9amplkrbu2ljewoxw36kmqpcri2cqchsi5540xj9h8clz3sgtccoqdmb0mzvms7',
                channelComponent: '0m45lxy79mqu8e8geo97ke86m793ua002xu8ht8vib1c9rkt42lz5opkk7rz6dl813mey3pa24pk8j4y1ctreveh268589b0guitngamk9yg1mo5yyem12c8egum8pkkis0qzjc17b5w9o89263x6f9qan65b025',
                channelName: 'm2vxvu4dzbko56w7qstmuzcswk0bp2ywffd5tl1p4bcwiu54k7sfpynjn3d00fora677ozj31v8zhv3ppofyqeum4um0uxb2r0017ejfpgtnwm0dpqgxiepkimyd1jkk30e8nnxk4wvk2gemasvhcguam5t0imhp',
                detail: 'Magnam quis eum omnis rerum fuga. Quidem eos dolor quo fugiat dolore sit ipsam. Autem distinctio sit et ut. In aliquid est itaque inventore sed. Totam eos ut odit fugit ea temporibus omnis ea nesciunt. Esse commodi labore officia quos nesciunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'huxaeo6cohyycy6joa7imhaofz7p5g3ibmnqdkuxbg0veox2ss',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'gmzaxyfj9qaznhwquprl',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 20:09:01',
                executionMonitoringStartAt: '2020-08-04 12:22:17',
                executionMonitoringEndAt: '2020-08-04 19:06:58',
                status: 'UNREGISTERED',
                channelHash: '8ukg7p4a9go9mum9b0hmhwcs4q7l8mb0wd38yx53',
                channelSapId: 'u9ux18qkgdagnkxlfkut96e0v0sjm7m0whe4jg1ffoosnszz6s',
                channelParty: 'p0821t6y8j8iwek9mvaasfrsfsa0hw5jfinzzgzfdpvrmh5ch14720a8lcbgr4opjk71kmrhql8t5yk1rt6pk5mj99uopk4jjodpbefaabvy3iaoxnqvi38s76y2oaxbdonr9d56szaxvkk8zv66zkt3bu1sdp6iz',
                channelComponent: '5kc7azad1arvy8rpnoq4mk6bsu1frt792aw9nu8h6at3681m3vmn8fsx9tf72y7d0xq88i6ylbebss7goi7k4h1avl4l1dlmtwq5ijys6tum5yf4f8pxzth369gje7onjttq117nrlr8v7fdg5nt3jto79lsbrp3',
                channelName: '1g75mua7yi90m5bg4ewpxx0awqc29ujb28g4d627y2nkp21gmugtxx2dwz26rkafdlbsae4ux6ll5wr8niuynuxsb9m69jzc229hmyom66gcwhyadkcefnlnsu6cwyzd57bxaa081lxhcg7lxptwlve4u9bs5ij3',
                detail: 'Natus illum minima molestiae qui consequatur unde amet vero. Molestias amet omnis quo odit veniam illo ipsum. Tempore inventore debitis a culpa fugiat eos ipsa. Itaque praesentium sit quasi aliquid in hic deserunt. Non impedit voluptas hic atque aut voluptatem adipisci. Inventore et autem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: '87dd7q6tpj38424mbyu52f8psdufdxbbykullyo97uk6cecvfk',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'hqiadt7vmp5flh9g19td',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 15:10:06',
                executionMonitoringStartAt: '2020-08-04 13:19:50',
                executionMonitoringEndAt: '2020-08-04 22:52:52',
                status: 'UNKNOWN',
                channelHash: 'ou8q74r9g4zuygp1vc9h54lfj56wzuacwzzuldxr',
                channelSapId: '1hxdv5g41o6ybu146p6nfnax0mcjs4uxmgvybcq3916ky9opmp',
                channelParty: '18c8a0r18accel5g8be13ebuotaatlmuu2418elu18fh8l1zwptduefgoq2d1f5dfuxm3yr3xhe3p6cqrojcqom412sysuqbjl05hyo5gcz268u8y9kljeg1uqxum4xg8b3wyfi1ox3y85qmwseeb0kv6kav4om7',
                channelComponent: '27a8r25dw9qv703g6oph26re9dmc3jyif7z74azg8134cyvhl3yyozo29zn2iqfmmh9nslpltnk2thqubzgaki7dotnilzydz0zmfesek9qq6cq1pmuaixlauj4la7ms5l2wqscsh3rzhv4sp0t1uj7k5um4v39jg',
                channelName: '1q8zdm7vnf8c5ow0d7pllhnvv09hlkdl01h3kkbo9votm3cxvfarht590hh5qhzz9q1jvjr11gqfniwzr2zxzsplmfx1jlwl3ge3xorv01xf6zuyv1iasgthybsln65hn2fq1sjtkaddkzqdrd69q6aywkyq6bn0',
                detail: 'Quidem eos ut molestiae in voluptatem consequatur aperiam. Vel dolore nostrum. Et ut animi minima at repellendus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'ai8qgvmnznzi6a2049vyytiqft83vsi4pcwhnkhhxwxuro1gmn',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '5r1twutb2ub7jk35wgos',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 16:37:41',
                executionMonitoringStartAt: '2020-08-04 17:15:13',
                executionMonitoringEndAt: '2020-08-05 01:52:18',
                status: 'SUCCESSFUL',
                channelHash: '1skwzvcdeou9w2iadytfds5wqkjuu2n66d8rn2z7',
                channelSapId: 'k82hy2hxq5qv8shuijqz772ui8kfu7xabukh4142ebdhpau7ns',
                channelParty: 'vbd44q9t3gnlnoxbrlh8e3n3ehokmekrvdgoimdr22pburnw282qbdsvije6yju4cxkb97myp2qzxzlcib4svuqz8wonkacfnv0vpb08l00lcyvjrmbo1vpgp807v8clbhk8jyiduwwxmlv5jmlxu3mwcwkc8gut',
                channelComponent: 'ii2u5p1awekkke76u300vx478kjne1jjt9ut606q8xs6e2yqsmga1kl1icjv2aqltyvn52xpzqp8do1cmsre3wtzc1ukrjnnpu55f8gawegsk47djfai1ttn9tubwxobtm93silfz80y9dqrqoajhomoi1ns2lus',
                channelName: 'tliqb0ubgrwjoid28lvski1op66alu9z8ber4vye7pntywbowx4f1hyum7upw1gyagmmwz5s705nu448bnmgye7a09vlebahv3ddym5854ulyh9gzgjhvdn54ezkduib8mov6xz45baxpa6oowyu25dgew9zgz1ne',
                detail: 'Sit perspiciatis facilis nulla deserunt unde eveniet. Deleniti esse est ipsum magni. Nostrum rerum facilis odio quos maiores. Assumenda beatae tempora similique est a et aliquam perspiciatis voluptatum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName is too large, has a maximum length of 160');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'grgwdd9yuzpcj4by5b4flyrmvc2u6gx52elulwhuj4mpfv2k4y',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'slbe7db6zr9sr79o68bp',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-05 04:59:09',
                executionMonitoringStartAt: '2020-08-04 21:46:45',
                executionMonitoringEndAt: '2020-08-05 03:03:30',
                status: 'ERROR',
                channelHash: 'ghf26f70snetbnn9189cx55o1cx5tqact3s3d681',
                channelSapId: 'vldd4wwy3f7waz53lf3cib685wwhsj0rtal0fpxwd91r5wvrca',
                channelParty: 'qos999gy43r6k6lxnr8r9rekl5ipdi8s34k59z6u1wg9il8mvcyjahguu8u4h7mdrc5omcnbn23cf1pn0bmbq67i5kbanjyzo5yb7jzecpx9efpbn7jqybpapqmm2f42yh29ionjzv3fygybi8p4a9sm875dj9zc',
                channelComponent: 'rmc9x6oqm8w4znq81y1g5byf4faupp9eclc71r4yme0sr5s0narcht4mi8nggdiid9lxxf35ohoyj0dc9cirodaizbbjltsvwei1almjrf4nsy2703a6kpauje89a1p4sl6zwhavuae5ae6gmx7zvvhfh2xq9ze9',
                channelName: '9xjtyhgld5ewu8il00zga0ib6mg606v6jrpthejbohre3zqts1tjbnfo1ncbubs39p2v8ke8rbdi7nv77i4yql9qjplj26bdab0v28ppa9uzaz69csayis0n1sseu6sw283gl9lher2e0wyb5bz46m7f6foovc41',
                detail: 'Quasi rerum magni ad necessitatibus. Beatae consequuntur rerum et illum dolorem recusandae vero. Dolorum reiciendis accusamus non nisi sit. Magnam quidem voluptate voluptatem corrupti iure labore delectus. Aspernatur quod amet ex. Est magni laudantium ea atque dolorem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus has to be a enum option of ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'e76vj2upt3pp8nmojictynv9e8bqj0clyidhinkp0nzr74qll2',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'xiqjthya3r455agwctxo',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 00:28:36',
                executionMonitoringStartAt: '2020-08-04 16:45:16',
                executionMonitoringEndAt: '2020-08-04 12:14:36',
                status: 'XXXX',
                channelHash: 'pfsm8hx8fdpaegy2jhq1qyg4oogq4q8cbpy6fyd8',
                channelSapId: 'kylnlei885ec91s1inahpfnw2ya6yl83wl2v2l4rsb6zbelpup',
                channelParty: 'kahpge5zhldpk4qyjs0cpon66mwn1cfx1qnyix175ckgpf0m20lgw4aox5bu8k3bxt2fcmmymtyx0w5t5o1yalxo8nirdzinfwykkj8oe0u8ygxau69utip81kfkxid3y5bit3i1scphumu1g2plavmrwlewzhe0',
                channelComponent: '6qtrqph71l231j2c8xx2ncjmanlw3dfdlpsnqt7rlz7l3nmjw5eg1w0p87kux8jlzcm5o9zlqvugt5njrybeax21ylfzdfz5cqt0adbe7so3ecyuc94i0b3olpgvjcpt58t6xrbhj2ey2g3lvni7gdsh5wstr0ah',
                channelName: 'ssm8ieez3wqz5yzcbu5bv24j1p3kbroyhrzq5ylq9f0om4chytfprie7gta4pdzukbr8c2rvgz1u9tmu4epjyxfmy8h2hf8gyol9ujlxk20hnnj7svkih928fajxbya2bfku6b0jl50rk9gbb87ypsd7yib4adbt',
                detail: 'Nostrum impedit facilis consectetur eos illum ut omnis voluptatem. Et nam officia voluptas eius fuga consequatur voluptas quaerat iure. Sed sunt consequuntur. Quis ducimus odio. Atque illum minima est ducimus nemo rem enim explicabo. Repellendus aperiam similique molestias ducimus ipsa quia.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus has to be any of this options: ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'zygk86exy8pe24fm90woj5mslkxl0nhv6xpb6mb00v9gvkroz0',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'qm2pvqz6tum5fe7ohe74',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-05 06:03:23',
                executionMonitoringEndAt: '2020-08-04 17:13:29',
                status: 'ERROR',
                channelHash: 'ofrj1zicxo65chtn8m5ehxl2h1ki8ky724nbm2cu',
                channelSapId: '2uyyan8pq47avfhyx1czvi6f9kmu6w5utyjn9oghsn1ff187qm',
                channelParty: 'kpz3t5iwbqpkm9b0s3btczj80ptf8ttr92b54nia0epw0b3thp307k4b5wmmgqn2zjanr37n2e3v4osbm4ndgao60hj480sdwohum18v345pr9ygbc6s864pb4pmkeblswiezq3tqt4aigxy0cmdp9pcggx4peqe',
                channelComponent: 'gr95tzf4z3ix1sgkvhbbzjn10ea0q37omgl89vyn9hbilmgevpgeu060l0gzw30gzckatbnbgr9wlxxyp02qci9db8to1oarz3psc7m56e8bp35m771q703pln4qgeqo2u9mtbeka412bgmzuvq0kf1gji677tcu',
                channelName: 'oeubez54bl64jbdodaoojefadeu2oeq544fhsip95vv6kpw6aljqnxk60kjpi7z3i1ugkubnc4gvlackhnsjbqf76l7bois929154l3nbu06co1vz009x8qxn7rys4skwgycmvyzqa12csut1rc22mra7pycxnag',
                detail: 'Consequatur quam ea deleniti molestiae qui mollitia itaque voluptas dolor. Reiciendis assumenda est. Et odio placeat quas id quod commodi.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'wpihrjnd10rxwv3ey60i5kyuwymflzrlwb6r9u3fl4m5wlli6c',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: '67dnyvwl9lt5wm7o6eut',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 01:45:58',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-04 14:41:21',
                status: 'SUCCESSFUL',
                channelHash: 'itixr7xo1689ku077ef2lwerc8rrysf11t5x00vp',
                channelSapId: 'i8q5layidfmfo1u4y0agv6gbgdfc6l3oxchx8nndxim2txtiht',
                channelParty: 'nsfa8o0wy6w105k4ieuxx6pcfeb4sz42wzxwpwdm6ec26nlaenqrv69062a5ieqxf4lz0cahi3grvq4m3g7j9hfls4d9geueppho6ncra4i5ejq8x9rorbw5dnvksi3gzotzfdf1164776i2t59g9wowmiwwutva',
                channelComponent: '0qxan0lqgz4qwvysawnpvdlpkak002n906y51ge37isfeum5bq32y8y8gcccsouudujs7742lkbyci4cibzlpp2mma5pi5ilqhet80hjhreljevd07xmwjr0gwgulbzjprrcskx2wsf2r1lnirydd8nmviqrb38k',
                channelName: '1ngdyc1wsmsvg3h3g866g7l1r0nb3w839ka4v6asbhemfb0uko90oa1pmnnk76tk2g2uxwc3yx9jd1xbmhx30rcz39vqclz37l41wkfwob9gcb8u5prz3ig6fq7ud5gkb6uufd0ogplw9cq9l2xqo15y2txkecdy',
                detail: 'Id sed placeat amet animi in odit quod. Reprehenderit recusandae doloribus quo beatae nulla explicabo perspiciatis voluptas et. Dolores recusandae consequatur fuga nulla. Labore ipsam excepturi sed voluptates accusamus necessitatibus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: 'asmjjdl6v2h01se3rb7t37yff52ckkuftfww1v2ymym4djlp1i',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'kzuw1vj30wxrp2jrkd6u',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 06:01:30',
                executionMonitoringStartAt: '2020-08-05 01:37:31',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'UNKNOWN',
                channelHash: 'ez1vsze19ylpd1wl648gtuvh4n1y1aojb6r8u1s2',
                channelSapId: 'mx2x0z128ymobo1xdqqhr8ic5m2znpb72pc2my1kys044ajls3',
                channelParty: 'pco8p7uphc17ijq19kte26warfp2wzakyt1g8nnfw6vkfsj6l3qgso136wv61jpsaiqoj1uz6zkwxbh16r01bed9nenhvpm68l5x8urels5uyt1tsdo50tziy95h2tp7t4qvkezdx1wg84xidmbt148t4fj3iplr',
                channelComponent: 'qacvgrkj442y5fhei306tctf8rp4u4aedfirqbccmwuo5z166wf9y9dtl41he6c4qgj3gteogymaj7ofl8ajvjuft590ev0yrgoz48zzjn5g0rjml2mh3gqhyl1bu9nr97w4bwqdgxooqxijl17cv54afo6vfrpr',
                channelName: 'q9k6rh01miesro1u0stb4b33myqc4m6q062j55ndyeh1nsunyts80iycu2umredvp63lkidww3to0jl0a2mahv25u1k3u9t94s0mr23ujw3w57hyg7ucja63aowhlij2b7l1yaqveltpyjxr0amb79ua9b3wsxv6',
                detail: 'Perferendis eligendi esse qui vitae magni eum et. Velit voluptatem cum dolores suscipit architecto rerum esse nihil. Delectus architecto alias molestiae atque. Et ut tenetur qui. Recusandae et unde modi incidunt alias aut a exercitationem. Reiciendis est nesciunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: '6f3zx4x8h8s0hwxngyaqqhaho6tvar8a5ctk6xkc60krxmaykm',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'kva0whn3cd054b3q9vua',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 07:45:38',
                executionMonitoringStartAt: '2020-08-04 23:53:21',
                executionMonitoringEndAt: '2020-08-04 21:35:59',
                status: 'INACTIVE',
                channelHash: '3bn5s9mm5atg6pt38ztsamk6fwacjpluudae63oj',
                channelSapId: 'ulvfxjm3z0m37v1aw0poguix37dy1p1851gv9v8be2m2838zfc',
                channelParty: '9ra3wlbcefyklmmn5bg1m7ix5u8h83i290c0ib7ccnmg5ospv9rwtyh7enlglxo20v4yfg8n70xyl5qgroxnoj774w9qe4rcvsobizgjsl452letxwi315u1jz2to0pfkpun50zc7tgq8tllb1a8bq55pqhe7gt3',
                channelComponent: 'sodq1n1tq1m71il077az55vojo5qbmdwtbk3a1oceawngdbs5tmil374ka512tp5ck88zg77vb122ko8mst8cyuqzrjeeci77dcoj4k2envacnjf07su000qvrrk0wqhxaryagu7qpajvddbdyeo899svtw2rt2b',
                channelName: 'p9d16k2yom381tcurzfsv4h540f74zrx1gs541tmjugwngftlnelqj1teqt2pd753dwkjgxfmzfktfhmlm1dzuso5a41sivh8evgiidymbe936ihtjh07hqx75g854115r89f8n0a4twcuzdckz0vwhavmykz9go',
                detail: 'Enim maiores quaerat adipisci et est eum suscipit perspiciatis at. Nulla doloremque voluptatem corporis id omnis consequatur possimus. Ut non saepe excepturi est ea quidem aut. Saepe architecto cupiditate ut. Autem ad et in laboriosam consequatur rerum odit et. Sunt asperiores est consectetur inventore molestiae nobis distinctio quia ipsam.',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/channels-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-detail/paginate')
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

    test(`/REST:GET bplus-it-sappi/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '2a9b11e1-0b66-4d70-9f53-e57a59c2562a'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'c665e62f-88c2-46bf-9488-96f4c064c3d5'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c665e62f-88c2-46bf-9488-96f4c064c3d5'));
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/fb557b14-cdf7-4359-a35f-d459bbf1b6c2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/c665e62f-88c2-46bf-9488-96f4c064c3d5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c665e62f-88c2-46bf-9488-96f4c064c3d5'));
    });

    test(`/REST:GET bplus-it-sappi/channels-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '4b60ead9-eed1-4911-8bc7-295bb79258d9',
                tenantId: '7e57a938-2bb1-4ce3-b977-4213387b06c6',
                tenantCode: 'n30a7g2nx4y05r7q5lngizg1pm8u70lqpngby1oyws2dgks1tq',
                systemId: '696f7c66-f1be-4c54-b474-e15507ebf708',
                systemName: 'ixhr12kqlugsiknzj2a8',
                executionId: '99f8a81c-79e5-4d1a-8ac6-5d2ef35ede4c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 19:55:11',
                executionMonitoringStartAt: '2020-08-05 05:18:14',
                executionMonitoringEndAt: '2020-08-05 01:37:16',
                status: 'STOPPED',
                channelHash: 'kvkj35u5apzax66n88cl1bx8jfddhlpztpn6p8jd',
                channelSapId: 'm5sk0wm0l37rz3wh914i8sbjwxukqf919mskycyw56yjmu2jvq',
                channelParty: 'zvxye6wh80sw6es0puzxdbw68erwmgsb4dybk0m6mhy9657diks2wg8rb1qn3rudp6ue0ykjq23wjn5yuxdgdqmit6zmr6xlpvz9fn3eifq36obmwvn9jepi8mtxf7i44xzcx5scgck8vpwyqod6sxg0v7k3a679',
                channelComponent: 'd1ljemqtza820sm80515a311xy40dozi25z1lwcwru9ciweziabaqae3dtxvwn3wyu0llqqu9zxkaaee9ut6ubs48r9052sc5u02r3k6n7ykyxmsiy814963xr3bkb98jzl8wyo7laiul1tsufe04dly35hhefom',
                channelName: 'jir0olslw3jna6tfcduwow9s5vu7ff6idcpbwtij6aozz0wbfg1asc28026irwk16xitgfspug6a1t7d7h0fvexz7l5vrqmchgpuhkqbaahwj6m2won9bej46wjiuxb1847p4xjmn0ueb9mgevdnrf2ak2r00y0f',
                detail: 'Dolor placeat velit deleniti aut iusto omnis sequi. Error magnam atque quam repellendus voluptas. Temporibus eligendi veritatis praesentium. Velit illo non eos officia eius consequatur reiciendis ex.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                tenantCode: '73o96kmqlpcso0o62v2ldakmpnhgoweaormr65swgi79ubwzs2',
                systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                systemName: 'f4sakj659q5mkij54q9u',
                executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 22:07:23',
                executionMonitoringStartAt: '2020-08-05 07:34:06',
                executionMonitoringEndAt: '2020-08-04 09:29:02',
                status: 'UNREGISTERED',
                channelHash: 'gi163r09vdepgk840ioqoask3h88tzdzg9qtu4c8',
                channelSapId: '9m0uuh8aczctcw8u4i7ep9fu50wbem9zc3hmpygilohvswsnux',
                channelParty: 'clqiaid1m1gzsi7oo52zns0a865oa4sgb59zf5hr5tazp2ggcr0y2hyzbr2ytuzbx7c7yxi9zhkdiio676byeaz0bfseo6hs6ltd1sr6cny74aej4l5jkuu0dvi1vpvz5313r48qb9mkafr0b8xbhl9qkjxkwj0u',
                channelComponent: 'ht60gm2ik1gdals3ai9deqwp40c2tu8knvb0oejdblkyjvc9wy6cwz7cv16fwh16vljfup7vz238fd33usjgbj2orkura0y911e3ggcbqzhk8uqsnjidjhxxap6q3uxzn1q0r3w36p4pkonx7lnmh5k20h5jga0l',
                channelName: '6acfq1b0ksw8l2emm0sz4916rkoui2rk3i4mnj9f2gwkzgrdjw6fqty0pl53xwb9iur01gncr91q0wl49qdxed4uryzpnff9a7o0tznwoa7wl45mxbxswz9akiwu4om0ok2bi2qelpazzukxvsf89ceeqmi2jo8r',
                detail: 'Omnis minus inventore molestiae. Possimus explicabo omnis molestias in. Tempora rem quia rerum et voluptatem itaque est facilis commodi. Inventore id quo distinctio alias provident.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c665e62f-88c2-46bf-9488-96f4c064c3d5'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/0a1ea264-5e40-4128-a063-d086a8e37fa4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/c665e62f-88c2-46bf-9488-96f4c064c3d5')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateChannelDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelDetailInput!)
                    {
                        bplusItSappiCreateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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

    test(`/GraphQL bplusItSappiCreateChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelDetailInput!)
                    {
                        bplusItSappiCreateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '99a040e1-2400-4bff-a8dd-bcd71fd5f589',
                        tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                        tenantCode: '0c2p30efbcxecseb1418dbemj0gted6p9k2bkneg5uemyzkjsj',
                        systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                        systemName: '1lq71jvehphq1s10231j',
                        executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 21:28:58',
                        executionMonitoringStartAt: '2020-08-05 00:06:30',
                        executionMonitoringEndAt: '2020-08-04 23:20:53',
                        status: 'STOPPED',
                        channelHash: 'dklijk85nxb1u4njxlr44zjbd00rhjg619s7ovhz',
                        channelSapId: '9ku9r0oz9f9wplvabh0552otqrmqpihzzn59mx9gw6x4omr8y5',
                        channelParty: 'uemjf7za7k6lja2w9w1au17z565nluzmuo6bb8n91fia2vupjwzd1zfrr44sbyhjyx2gtkmrbcfjpngum6p55cv9pcwd380pwuzdx7n8nquzo7ke8cdtnq45o3g4wpmhv28029dzwpywszlb8xeaaoek15ccrbny',
                        channelComponent: '2lerxoxv1l3032wycr5b28gci0n8zg7riu8e97yromblpdqxh3w3ion5ardyjeg43oxp91f95w7fziwou716vu5n6ku3lwulfmdrczpfh1rvrlsaqy7z67ep6yvg7pq0xf33s1v6fkf0hob7ulyr066e71l0ip3f',
                        channelName: 'x1ucqlwu9r0vmkcey5xr2obf1yrlc1jsaea0im6le0x940h6uz1vry2eylv0gcriema66krpjbdd7szbhewtesdov1inojxkc39myx6u06f8dyo4sqhfxxqq4yv3kymnbb50r0vbusl71s716dr7he6b2d7grq30',
                        detail: 'Qui consequuntur non eligendi omnis dolorum quisquam deserunt. Perferendis eius nostrum unde rerum sunt est ut voluptas. Eligendi non asperiores voluptatem animi repellendus inventore aperiam. Qui voluptatem est ex blanditiis. Qui maxime ab magni.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '99a040e1-2400-4bff-a8dd-bcd71fd5f589');
            });
    });

    test(`/GraphQL bplusItSappiPaginateChannelsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannelsDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateChannelsDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindChannelDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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
                            value   : '05f00127-2cea-45e2-b1e2-7ce23320e76b'
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

    test(`/GraphQL bplusItSappiFindChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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
                            value   : 'c665e62f-88c2-46bf-9488-96f4c064c3d5'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('c665e62f-88c2-46bf-9488-96f4c064c3d5');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bfb92eba-4f13-442c-ac90-b681d250cea0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('c665e62f-88c2-46bf-9488-96f4c064c3d5');
            });
    });

    test(`/GraphQL bplusItSappiGetChannelsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannelsDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannelsDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateChannelDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelDetailInput!)
                    {
                        bplusItSappiUpdateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8e1acea9-b82f-4f08-8e8f-182e50b81f15',
                        tenantId: '3dbbe366-042a-4a50-bee6-15f49ee38a4e',
                        tenantCode: '6d5j4w5d2or934opp1qjn37405x6fqe7hx4mbfb9z0hgi28bsp',
                        systemId: '56e327ec-5c66-41de-863e-a685bd515b5d',
                        systemName: 'bkxhupc6m3z74huexx45',
                        executionId: 'db6e0573-c04f-4c13-9765-a9ef633f314f',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 11:11:15',
                        executionMonitoringStartAt: '2020-08-04 14:24:18',
                        executionMonitoringEndAt: '2020-08-05 08:51:09',
                        status: 'SUCCESSFUL',
                        channelHash: 'vizomnwm0gapw423h8fflutcb5q3tuwu9g3u8tpt',
                        channelSapId: 'alq64nn5ra0gdrrq5m79vr21ikzk6a8kqngjq7neq5h7xmkbjn',
                        channelParty: 's0epjbkfppybbd1x57t21rbiie63at27hkx8wt459wqd069fteodrnxapvifha84g4p843d67pulb0bvqk1plbquj5xhdqqy9t7nb4zj1wcelmdzvzacwu1bvyqv8xrhfo1jsd249jeq43k75ru2pqbng9b6eujl',
                        channelComponent: 'qcipnux43vaay3lugehfhcuy9tbrecttuh8p3ueoovpu5sinw9uo75c41f6b7o1rh9yqdmkq8kltdwkd75tb37et8yrkongjxj74xc448g9o5d8q5fk3dfru8zlme6zled8mo4jn7ct3ry6zwfta3mjqw3wxm7yd',
                        channelName: 'suyjrgh8jjskv27nhf2zr1uvej8zxndwjyme8ycgg2toun4mlbsaxfmjys3ogtqfxj3plorp28mdgcd1z98ez5qdzc510epje7c3fcesyntsiz3if3dfpa8y1e42hedfleax3rl81g3idq8d1kj3jcukrhpglocl',
                        detail: 'Assumenda enim rerum aut reiciendis error deserunt est ut nostrum. Et fugit modi eos fuga. Consequuntur nemo eius rerum suscipit quia nobis eius minus. Velit qui quae optio similique autem illo.',
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

    test(`/GraphQL bplusItSappiUpdateChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelDetailInput!)
                    {
                        bplusItSappiUpdateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5',
                        tenantId: 'cde92c0c-99c9-48b4-9e95-54222e6de843',
                        tenantCode: 't31j4c2p8eg96v993ab9sxprgdpf4ci1ia4ldg8mynpftw292d',
                        systemId: '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff',
                        systemName: '4us368v47spszcwsb0lw',
                        executionId: '7a2c0d25-1de7-463f-bd98-7b34289c8947',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 12:13:41',
                        executionMonitoringStartAt: '2020-08-05 03:36:18',
                        executionMonitoringEndAt: '2020-08-04 18:32:25',
                        status: 'UNKNOWN',
                        channelHash: 'wljhxmd226ub0ba85m6bikicgj6q4aszwznp7e5q',
                        channelSapId: '9uf64gxn4p70e8q9lmhou616y7htq24e99x7tiljxmsqwr71ch',
                        channelParty: '772e5oxqn2jtycohpeejmkca9i6ax9e94utx1tn0q3hm71w7ftdzvobyadmo9xmhng2k77d3x24fwffo5szekqwpeld8klz0cz3ddv07vuc2sk0rg3f0d6cunyw3itegulxcy6pt9m23c7qti9yjyjccdwelmu2g',
                        channelComponent: '5kbvvmultm5a0cdphn9vil4be9heyfjecclpn7vqbpby90dcttin6u0h0gwssgn9i52js68qdq3kfvt7gr394grfu1sdrig9ifpm0gmxtj3lu975g6id2imxft54anwhm6sn488adogkagwykr4fdc845utityn6',
                        channelName: 'sm7zjwyd6olr55mv3coh2xgf52i0exiq3u3p3bxg6s5ddxep26epefpb3f7uh0f18vry17rmz0g888to0j9mgl1y7qprmntd5j7l8ugkqf6zqaiy8po7s8fobl3fh9aicb1g4f5tj4tcyya1i36rvds6k1vef1xx',
                        detail: 'Error mollitia et maiores. Magni quis est non unde aut pariatur est. Ut similique dolores itaque molestiae. Consectetur nam illo aspernatur est quidem autem et.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('c665e62f-88c2-46bf-9488-96f4c064c3d5');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '719a0358-4548-44b7-9a92-bef48fe70ff2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelHash
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c665e62f-88c2-46bf-9488-96f4c064c3d5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('c665e62f-88c2-46bf-9488-96f4c064c3d5');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});