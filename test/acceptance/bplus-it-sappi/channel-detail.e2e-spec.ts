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
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'x9c2hgh306cov27be98peytyim70k829roe6e5vghoog5032ls',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'noum5vailw0um3fjb6gu',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 09:10:09',
                executionMonitoringStartAt: '2020-07-24 15:29:12',
                executionMonitoringEndAt: '2020-07-24 01:13:13',
                status: 'INACTIVE',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'tjnrkzq6konwyxy4i6tbpq03wrohloztz5f4dr1wvl5xnd1qoy',
                channelParty: 'x1xjkvd2cirrifncnme3pwzshhujrw7gzojszvhnri7ivkjf180r0pwbsktz6wqecbrcfxn6ywc7tjooj80c1lty8tppfrv6llgyrdu0kd7iq0wm7qyld86vm94gyugm2jron8dmvv14d9oek3diw04ncdilne3v',
                channelComponent: 'lwqn1w1pkjnfg79tjs0sotnctbfxm13f3tsx31q9txc0kjzhc2a81835mf6buoqpa1xk6cbz5qq7fx2hjkh4ubs8m8ou7hqgxsh193zfiqqgfmcorfyg9smfd4xr41ebuo34ttcymivgy8unbwbi24odipxwgss4',
                channelName: 'lhwh5tvsd3kx19zv15h8nyqd7zpnu3wrytz9cg7895zcqqfn7jw3pt7l22vu8tfxmzw9yca90w6x94vzsijw9hhshbxj9u6d0dnuia1wsttfm48tjggc4fanwagd6zov55ns67zetcio4f5c4bcxyogvvjjezpmg',
                detail: 'Aspernatur occaecati id voluptatibus aut aut neque impedit illo quod. Omnis aut vitae qui ea sint illo temporibus. Repellendus voluptatem voluptatem. Fugiat quos voluptatum debitis quia hic sit totam.',
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
                
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'f1y73dibjyttwss0vwlpv1r08xfezofhbfb40s7aw8hxx9lc51',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '58xu8fd5jtdhakljn2fy',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 02:57:33',
                executionMonitoringStartAt: '2020-07-24 05:56:21',
                executionMonitoringEndAt: '2020-07-24 03:46:44',
                status: 'STOPPED',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: '4bpliurk4ahoghrezlq4p0gcr1sdgb2sg8ge3b757dn3gzyyog',
                channelParty: 'empj83pceuhhzrbxvb73bcizasbsdd27dzk879kt4n1zyvk9ejgrupswds9jd6j9gv0brvunn37xno4flpswjuow8xlrl1jswh5axyk4fhwt2pvyzihhhm04ap502cis64tujwtwosnde4yzdo9wjdm8xjzuisf3',
                channelComponent: '2v0u50k0ubzg834hmchzli0p84ttapl1lkvizi2zckz0ajdwkjm9yekndrvcvtpgs2af3rxojtgut4jttin6o2xmswes7bhzwzbwc9lz23nici350owguu93jc0ws05y28958kldg9xd4nk2i0rygtgzgaf9jps4',
                channelName: 'gpw52fpuycp3nf3px2mxdxjfbkym60fct5fygfqqq3vex7asnc313q31z2d6wjnupzv6vioq1igcwnpnp2fn8u8l0a3ovra76ms5jcudgx3ryyggznkzgb5jrpfjz6n2wrctmtm5rp2bdrijdy3q24q0xcllrw4d',
                detail: 'Expedita incidunt voluptatem qui. Non dolore repellendus et eaque ut. Minima est perspiciatis quia sed sit odit. Voluptate amet dignissimos eos quibusdam. Natus necessitatibus nihil dolores consequatur. Facere soluta sed dolore.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: null,
                tenantCode: 'oehjxxnugsib8yziezb8hcdlarkry229tc9n9dhk1ktc3zoav1',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'sml9w37jaxn8sme14xu6',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 06:21:30',
                executionMonitoringStartAt: '2020-07-24 08:58:20',
                executionMonitoringEndAt: '2020-07-24 00:33:53',
                status: 'UNREGISTERED',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'gsi9gyihbhxy3wb9f68z09up0nml2jrvbdad1q47zcj3y7nfd3',
                channelParty: '3avi0nm3s2f77aeqrnmhfw57vjvtpbzaoszu0ctpt88o7hyafkiuxqshh741uemqiye8j27xb06m3pppjeyz0kfvz0tka631fdc56zu6mm0qruxkeqhraa8uscducmwjn4ejwqf30p63e043oxruhwd2um8dbwh3',
                channelComponent: '9it9kw9c277wmw62eyxf00x1w3zrhhsmc1iphawbpam3dxstdm0ciqg0r9nqcllipic5uno2vdd27z1rbedokkywr4qy7xz36dhvmwwihrrcah7j12uv6erf8zvprjawb929v5v48usmbkk3zopm7wiwmftboxo7',
                channelName: '8qbnjpcomut85lezbuko6obz3h1sqocvhbk8s37utyr9ox3p07e5a57woqs4pu6mixwyh2w6a373gitb8gwk74iqu0tbfvjtmguf8nxvmclnqyofvqy71815qqjzc4ptv7prhbyfj8bsufb7htii0gop11f24blm',
                detail: 'Occaecati dicta aut ullam deleniti debitis dolore aut nemo autem. Aut ipsa odio aspernatur in. Et modi id quod.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                
                tenantCode: 'x2awkz4ekllrk81pdak1jke1splh963w6kpxjriw1ht9jhq21c',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '2clav8raag62v8qp4jvb',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 21:38:22',
                executionMonitoringStartAt: '2020-07-24 13:25:56',
                executionMonitoringEndAt: '2020-07-23 22:44:43',
                status: 'INACTIVE',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'a1h810t75wfmsd9htqozdnkhm8zadctpgui2oog3sdkjmuww1m',
                channelParty: '2kbr4gkvsgs9x1uphr6oypgihi05tczykww3blax7m4cgxcj1x384il87cwdgudn58hjndu3fl88h0y8z0lg7r9fkj3xwvczdpj831wk7eawqfz8zvq1r6yqzngamcnyy1ov2zhuge8ikra2o60al7bmrlegmmjn',
                channelComponent: 'bthlqfbwczwbma7cerp9osqzhlkbbfucau6niqi24d46su6oilok53w5f3zctolsx6x93xglvwwg7ax48ymyhm1ipuczlmzfvfoi3yhh4sbc9x7cj557o3a5jcxdhezw53jy4nz9v29q5q8u6xgq00gb8nkru5t7',
                channelName: '9d5741pmnyb7fuepey2r235gr0jufuy3lb4wrvsbxv6xz1wcz1ww9fjoslh8a581l8rckg60lwsuhzhnezeapodeco2dswj2z9of4qkr78txe6xrsb4qvishzh7hszb94wsn1qquc8q7mh9t6l7x1e2olhub69qh',
                detail: 'Magni vel non quisquam illo mollitia sunt et. Aliquid et est qui ipsum amet reiciendis. Quod excepturi nam sint ad nihil ut a.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: null,
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'oc4b4axvyyfwu9em6u6x',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 22:16:11',
                executionMonitoringStartAt: '2020-07-23 18:15:05',
                executionMonitoringEndAt: '2020-07-24 16:39:51',
                status: 'ERROR',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: '5z20sr2f13wtd5lc0g61t8k58xwkva3rg5b293ural00t0m8yr',
                channelParty: 'gkikfhnydiirchlx3jltvr5ce0rpzkx883o4ib12jlg53w0bvsvw32eogrt47djr9d51q55pfmlbycxluaj0mhssu4jqek017sa5firtz6gx9ouoj9ore1uwbg4b86e22rrvpedktcc94fdz8umg5l4mbc9500cu',
                channelComponent: 'a2g9fauipa57w2ot8hifrc6a62jx1vllqjrb5w3zivfjfq11iaa3thbys3gz5av8ix9fqlcdpzju03lpo6om4tvyye9keljg63kdp9mlts5ld6nv8bufeqz53sgrj4nxtlbhhxs5on827xdyn90h3whlgev0o1pn',
                channelName: 'csp299qhga03kr0dx8mhtf6zris48cql8eis8xxcbdq0v627nef26mhelm1lw196ocmxbewkuepsp8rl1n5tuqnqs0xvx2o00a9hwd9g6vsc8vn72siymkjpgemldgmqugppkst2nbbsgy7ze6wd0sauxv3kolac',
                detail: 'Et pariatur est. Sunt maxime ea et odit modi voluptas sunt dolorem. Quasi laborum in aut est tempore et nam eligendi nostrum. Dolores neque natus. Quia facilis assumenda. Minus porro voluptate non corrupti vel aut doloremque facere.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '4mgdfnaryu0xq8whc9w3',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 19:37:36',
                executionMonitoringStartAt: '2020-07-24 05:10:39',
                executionMonitoringEndAt: '2020-07-24 07:20:55',
                status: 'SUCCESSFUL',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'dd0mxqjvplk15xqbl0uu4w4mnxwq0hi55yp6lxhihw7mdr5u4g',
                channelParty: 'auixsorodcna7l8w13fz23a1dkkxmrntlgthkt2z16xb7118seelwg3gxif6x6jxcs6rgbv6lejeizhhdog5lkaf73gzvi9idzwp615lxcp805il9wnmj1whxi6hb1eiiddz7jvu7jzo8kk8erk8uvgnbpebhhvb',
                channelComponent: '7lfsaydvulsu134f3r8473c1wo0edaev6ybd90g2xl82k0o397wa5etu80zp64qm8pksrzrcjof6vhrrw9i6yufxamjn92bhda9vckndqn04eeilt6u82hlhat3ze1kv23v97gel0sfqyq2bluybcgjzp8dexjdm',
                channelName: '9qxhmer5mo48b5xy8e121nvtohymbxdobr1eqe522vx97nf4elp2hwxvdymhj99dmo1ubypt5drjktnum20bb6don6cujqf2cth2qcjbkn300we03hwbrvfa0mttiywrqnboyuokhrwizgojflzbm39pofd93ek5',
                detail: 'Voluptatum est quas temporibus provident alias modi quaerat ipsa. Vero enim est suscipit id veniam harum. Corporis illum culpa.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: '8rqjivzlesbv2pbqfb9thuzv2pzw8c1p9aj9ibyf7ardlak62e',
                systemId: null,
                systemName: 'x5n21nucbnnbxh45kcvj',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 21:14:56',
                executionMonitoringStartAt: '2020-07-24 02:26:39',
                executionMonitoringEndAt: '2020-07-24 17:41:52',
                status: 'INACTIVE',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'kv0e8da8atu1mr7lo2740507f6a2h0wtio1ovxktwpiimtzetc',
                channelParty: '1pevzfw397nvts51jxp9v4ygnubb7fxn1zuyklyhby9qr17lqsnpl6h45jn9kyrjg2rt5urivbm7vzlch6nwn6wohhfgymlxfb05wmtxyiykd3by8s9zf3auae99cdyey6cz8v2jpbf3emhp3xg60yddgkps9ezl',
                channelComponent: 'x8428pnox4srhq842bb5oizvoo0eu74nswnlqpievq3qp693r82juzjqbgp7usbyfy90exqk7381t01v1bdhwx1vs24xv9aly510pgfv0rba8u7zt2ptwma72yc2q2jeryfp80s1miut15mji6i9ibp1orwyh6tx',
                channelName: 'ktokt9xp6pwvtmpup32nl8jtknbb716bh9due1okpnn8ln3zwcpx6f6uif638llbsy9hbgkx8x6kb8lto8rqts17tqod8fotf49n25kyv0dnd923helhnholsx4fjer0i3s5dhmuifgbmrq6zr15lqv1554jtntz',
                detail: 'Atque nobis et consequatur molestias. Error laudantium non eius ut cupiditate. Maiores et voluptatem similique voluptatum. Iure ut quis ex itaque numquam. Animi alias odit aut est iure ut.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: '8qnn9hkd488kxtocz4wt96mhr77hflbusfk5xym4stboz9czc4',
                
                systemName: '4j4ugq8y49iyfka4501v',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 17:50:00',
                executionMonitoringStartAt: '2020-07-24 08:10:19',
                executionMonitoringEndAt: '2020-07-24 16:09:12',
                status: 'UNREGISTERED',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'l2tivfbf9r8mut145z6di9kj2bu3awwn1ppo6d4989wth0f5x2',
                channelParty: 'h7jmzo0juzfhcibk1jh127mvs7w2q7qbdkux3vqhaz8o94ozs7vykgcauyzrxfqmk9wee8k2zgwnm4zime1gmrpaq2b0bo14v70eq8wd2irr4sar01j1uio3pddhyxw55zk3zlkra176kqsbzh84gap1668qntgp',
                channelComponent: 'gxiiwoszcpw28rf72bbwh0todn909108b0646ya22fw3r77l6z3cxzuubuxb3q6u3h8tzx0273jd2ec4p2nd2p8rrzv2s5twqafceyaqq9qp0myzoo5hinogupsfxs0ix8g9oh91lsn0pmjwmyfrh3t2f4xcem7k',
                channelName: 'ckgi9aweqinskfeeywr3yvp8jjhgmos1krzvnfdrclvr25q2f3x7oo59dpx837l4zbka5i6s56w8heb3nyfgu37claf79p4u9tsx6biimsyt4t7nbym9k1gsw0kf7v5i1fo6jua69n06kaust5i7c1m470g89s56',
                detail: 'At rerum nisi nihil ullam repudiandae dolores et nesciunt quo. Non maxime sed dicta sapiente dignissimos odio nihil voluptas. Amet magnam non natus nisi. Aut maxime reiciendis est ullam explicabo illum numquam a voluptatem. Maiores fugiat nihil necessitatibus non tempora nulla sed maiores illum.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: '3q2nrcu4jazbeo5xdpssjrvdid168s6jpgakjn9wxccxl5pgqs',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: null,
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 22:50:04',
                executionMonitoringStartAt: '2020-07-24 04:12:31',
                executionMonitoringEndAt: '2020-07-24 11:15:10',
                status: 'STOPPED',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'fv1dkuroxcrssgekqd3715xw9a8tz2fais3k5yu1eib644ufzz',
                channelParty: 'lxsrz4yjzhe3j8f9jfxy1rd60zhz7m84i5j0ko4cgz03a8pq6c5124p76y1c952r58wsmafbuo10tixlxxhmefmzlm3wkkbvt5it4elztsft30cy84jb5pg73ysukh1r254pu7saxrv24ascrkjv134mhktnxwqf',
                channelComponent: 'knj1iukatjxrjkcyzkfk4z3y5mnt5e6c9qqsceottuzlxk655tuqt9z7iow9fdl1m3gwxnjp4mckmhp53jo5cderbmvcszou7m7ac8iaviypfbmdrwtjnk522hbm89d08xwx8majn2o15tw5ja1o6au28j8cm36g',
                channelName: 'vwi9sqhk0qkcftqj75k53oz48ouk6z8p9xgsv9jg93lzvjvrps80wdxvg2dxzkj57sysbl2jph7vrigj77vxuzhy2upxx3iuf0zdyiadz8loomu8tl9s8mlqdvrjslxrfxsbloqcgei85drs2nat7kyz149grmk8',
                detail: 'Dolores commodi est est rem et deleniti distinctio. Quam reiciendis quam aut qui quisquam. Harum reprehenderit itaque possimus vitae.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'env8wuqqstxs67c81wvk6f42yx7iwujmcwglk8crkvjdt90kj1',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 15:34:32',
                executionMonitoringStartAt: '2020-07-23 22:44:12',
                executionMonitoringEndAt: '2020-07-24 10:49:57',
                status: 'ERROR',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'yos55u8hvp09ttilt39g9ia14rykivpya3k6j4u7prumrv7z6o',
                channelParty: 'eo7ofp9olsmqjc84c2er8qxiptexydse5gvlbim8qvmfzot8bfsejbq9rp0x388rumkymqzhwda7hv8b31cpvc5srmv106bcedqvp5180xr5ej7coyee8ld8tmp322tk5sik2w1pj7xy1n97yie46mml3e5bo60o',
                channelComponent: '8x7tf3bfe8o0g1qkbbh91q7wc9ofwzxzjgbl2gpz1chu1qsymosyvd5agv0lrfko7pqcmkuik1mdcf5ly1rv6h176oqy32h8sij9slnl4uf6bc7zeuh5n92bkxarodkko1gss22vqvo5247rj796vqpygczoen6n',
                channelName: 'split1crmktlzv4e6a9t24jye0rg0rby7iuy3gr0nhu7aeiwtip13jlxb8ilxd08ylps5ku8qbw25occnwylm7qbyrhll184z7j3ucbubfvjonx7xkp0hgbfx2gg0ofa9eii8xzvq91qi8trimdfo97t9543ukxh',
                detail: 'Maxime quia sit impedit. Recusandae esse ea natus doloribus. Cum eligendi sit animi reiciendis. Assumenda voluptas odit sint ipsa veritatis et eum.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: '7h78xq9uqh7zv9vwfb4irbi88fstz3iy5w042vufyovsq0kzi0',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 's9vu7ekwkuh2nk0y8mq8',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 18:03:28',
                executionMonitoringStartAt: '2020-07-24 15:31:25',
                executionMonitoringEndAt: '2020-07-24 08:11:07',
                status: 'SUCCESSFUL',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'yj636y5tzc41auvcmz4y7b26jityko2o3sebbc22puw319hmjv',
                channelParty: 'po0f9k059qji7shwa2s483pbw2s0in68an41ghp5ryuf1mjedqr1ml6grtc26sjtpmt6knxpaga670xyi94jpipiiiy6ylszyjumpg41d86ezcxk9n0n6unn2klo98gy00x67y1spzk3zaui0kykttafq1f73kwr',
                channelComponent: '9sj078bl7ojpsy8c6rvc8g5kc5o7i5cihen2tqnwvxn51dqqccrnb9uxjfgi7wqtqjtx1g7bfutaln1w2olozwlnwolmx8qqvwfs65pvro3dwshzpjbqo05kuxh4s6i25r3iphtkkudpz66pp3aqk7fhp6mv10x1',
                channelName: '3ph8aj3peeorj5jmqrdw6nutirlf3cimkt5rjuyqgfdfbnx2zd4qrw1uxtj8coaj6uj42vfuoz6x3mthae20cx7xvpf718ce6xdmgfobb6y0x7gtzypzyywp4xp7sw3f4rp6dqbt3nzhge7pe8hv4gs4thxx8e4h',
                detail: 'Modi minima voluptates eos aut quasi fugiat molestiae. Et commodi sapiente et et vel ipsam. Iste aut voluptate reprehenderit unde ut aperiam quis.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'opb8saujborx6egq67h9lwwnccre9fa2adklwctntmgcaqz15w',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'b8si8yt7liycw1cdawrp',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 03:17:40',
                executionMonitoringStartAt: '2020-07-24 16:10:12',
                executionMonitoringEndAt: '2020-07-24 13:57:56',
                status: 'UNKNOWN',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'njaomgcbqzk7ntj5e625znhz3c12fxvv9bqaurwboosafjfn64',
                channelParty: 'o6wopfwxuaveheoid92emjd9xcyglcf8nspoj08ikcx5ks8arsafxqz3sk7k064buaw3z3ptl0uph7x2hj7isj2nnwx55phw0977fmsekzgoh8koqbk8e8v9j7nqjjo0m8b5rruk8x6uu4qoi4dmnly2evu6ptxi',
                channelComponent: 'b5lhyfrlk32jbzpjiyoejp2wbuiqvg6rxkayjf36nk79xalyiorw8rpoell7layrsfl69956s9ob7nkpqk8v1wpen6w1732r8e9o8aflymej1b8nxi3a4hz2ckh55mu3januf89wovs8l7w69n7uim5bbwje81mk',
                channelName: 'vt6f3cj2w4l5sec0byid1jbkmqopld1kkknzvsiu3b03pxga8d7ivk6o8f4kw8lfpr0knop45vl5aoc7uj96cq3iv74ffm8ia7vmixztan6sxvrjypj82m24dvyais43q5ezrt8cql632bfmjg07g5w9mlxh1r5y',
                detail: 'Consequatur vitae mollitia nobis eligendi velit dolore eligendi. Nemo voluptatem deserunt enim voluptatum et similique quia est accusantium. Rem consequuntur officia iusto maxime hic quo. Inventore sit quas sunt. Dolorem aut earum saepe et et.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'ztppt0b12rqhbj950wpp6byjrqku69tj9ojvxj4a4lkjuj8zni',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '7pvmdqv40feq1ao9w5u1',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: null,
                executionExecutedAt: '2020-07-24 10:57:46',
                executionMonitoringStartAt: '2020-07-24 15:25:39',
                executionMonitoringEndAt: '2020-07-24 06:40:34',
                status: 'SUCCESSFUL',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: '93015os4sq9jp6oyt3ti8rjtk9jnu2wzoo0yejplkvdm7wow4z',
                channelParty: 'abh3xobjne05q8ntfif1s8pa9cfmfxc49rfwesk7omt5nb9p7kvo19okbr91i9sxihsm9hi7cqk3o9vw8ggkk7b78sl6s20trs4z5snza4tvn2a4byy40g87iaxkut3htryivx58butkvscx79xa904dhv92u19o',
                channelComponent: 'zdq6im4zltvs76ure80qp83h7rpfysktdz9sq3a5778f6pa92gs7wo2a7grjra94waroa4e0la990f8a0ymc9kygn0hcnybym5hd5hj5o5nwd29owq3ylocpwy0fhym9l63o7npzvknbt4vjbqffq8x39r3mb3ge',
                channelName: '2trwg3b1j57hqy0f9n6j3qhpatyuwg2h91dos8lwrg0wwmygjry5cmc14eremqx7ba3i9mm1yvq73jbhxzayrldhvurqb2w0j4nxmav5b4s7qgyknzsas62gdruj2k4t5ezgnorth7shtloi7f2k31zpez27525y',
                detail: 'Illo maxime illo cupiditate quos ducimus enim esse. Labore qui aut. Aperiam et porro quisquam accusamus quidem quisquam ad.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: '2t23iz4hyzzieqmu6u78bfrxnkepc09iqm8rbod4ep9wdqne06',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'gpcy2en0nq1osywrsixz',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                
                executionExecutedAt: '2020-07-24 01:33:44',
                executionMonitoringStartAt: '2020-07-24 00:32:13',
                executionMonitoringEndAt: '2020-07-24 16:01:42',
                status: 'STOPPED',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'ic2idf435o7v2xavfmd8nsciw7kp0bjky3zsk5bbany82r1xk3',
                channelParty: 'gfogzr3fvasu3fbwmqkp8o2qx3m4u8uwwznv8whmxu9pmup0efzoqu173829un2735udlv1sepjou2kv20fiw9wkyrwzsmrwmx0kt5vzpngy7g9rxs8d6esf2sjbw8kb2mhg6qipad0gidboo23r4szfxy9zj0o7',
                channelComponent: 'ckwktcwfwim5ufwayyt944ieywmb8wk1cdxe1sip9ofsafi8zirgm5js595vjv0msz0r33d9tpzhv8iftskgr6k3x42cwhpuqg1h5hpqjjj9noql9494jc76nq3ob3oygodz7hhe7djq1z5bpbkvwtdnxq6fpde8',
                channelName: 'em23yf48eg0lnynnmifgvps9eunub19mw1isphhimuub098bejwt4zdj9gktan5vq8pfyylnuww54ad4a0w2xh61cu3ukjgi6dn1vfefeso99pompk1fuqgcw450ekf6re11v6a4aeqr0ooat09jz8yugluzwxkt',
                detail: 'Quod ipsa excepturi et non modi. Maiores magni fugiat. Pariatur sit voluptatem debitis. Qui ut earum et necessitatibus inventore totam. Sit nemo quos laboriosam. Tempore fugiat sequi ea possimus voluptate quod id.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: '0gp9hmpmh011u0vg52mb3ks7p92bqf911ftsscty17f4vrz40b',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'eb2enrtahen1gzug2lis',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-24 15:02:34',
                executionMonitoringEndAt: '2020-07-24 15:53:44',
                status: 'STOPPED',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'kbuo080ou28pd2c78pd4q0fosrs8llog9olpnr37f80sbkqkil',
                channelParty: 'upymylkdii786qp6lforkp9gw1ladt3e8w8heemhre8sd6ozin86nthk4s3l9wfqnhm5oktul4xxvt6kspj0kbnax7y06rjit9juhs79debf1an5kxofj247er8pulk48fyldi7bxr119mcfsnn5v55ui7zl0d37',
                channelComponent: 'sxsba7d5rdp8hgn59ena8mu2javmr4h2vhg1egiptflrts4wtqwo5maqgh65arr2udopgqucb21lvci1kxgmhvf0y2xuo3jjmydg1gpkguf053983p2qwwbai8v9rj5cyfggprb4je90psbzoegmpvd2y7x1q5to',
                channelName: 'ldus9xnk152opcdpb5l3g95scg5u0snp51b92q9ls0wfwnm9ul68hry0enzsn2md5dz60h2pquzq2stueykjcnd39p1ddcbyaxe7xjd0x0l6lkhtzu0sq4zmsu34oilz6d07vhb95pww9zmhvsu4mqtqjchyhwl7',
                detail: 'Aut placeat aut voluptatem ducimus necessitatibus. Quod atque nobis fuga consequatur iure doloremque. Fugit sunt aut sit rerum omnis. Magni fugit qui in distinctio vel officia autem est omnis.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'k6b0tvsahsd0n71msfhg2tplu2kl0v1pwypm0lvellyvtaom3z',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'nu3zonpp0v9bivy29w1v',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-24 04:02:05',
                executionMonitoringEndAt: '2020-07-24 11:03:26',
                status: 'UNREGISTERED',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'z7zlodjewyrh3cwm99rnz1bdvz5a2wwfkogleb5w3dwfenrnv1',
                channelParty: '94x0mcxzi5q91bltsfl46tntdup25ia9dg60htpnyk2xqk9loiu0a3kyhrfjruhmq5941e1ldltkv3y9ghoewl744okohq5v7ew8vjvfyco8abgy3bobyqolyypym3mo0gp9j7cpp7hzbdjzglvfwtex610qp343',
                channelComponent: 'rwwunatlwwouabb44bq0r8yzlhn7m2pl99fxugd4gjfwgkznz6jxl52te5jhw64uxcwveqkyr5ce7ynf5eia9chvas2a327hk4hlketzv1l5r1knnm2q2q7yn90wsp5votseemmmhkwvhuc1w7icawxmjadmhsvi',
                channelName: '4i0acbqaurkdc7eoph5k62fwm5v4qb6qq1w97y7gsqlab23s4t0avnhnre22nozx9g2u2ufkbwq1ceeite3h9ag0nlti10nqlsephm01d7fop6kgzys0h1kpbemp4uuchdaczkoasrq6jbp5saayxmtf75ixmcze',
                detail: 'Commodi voluptas quia eveniet. Consequatur omnis odit ea aliquam in voluptas. Enim consequatur quae maxime perferendis nulla.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: '9l9q0wi322o1wihyy21rjfmb3ktts0n6n8y1ier7nk0lty1u46',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'ny1zpsl1u2jtz877wxca',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 03:38:14',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-24 09:51:34',
                status: 'ERROR',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'ysewjtwhsstd66iju89cxa5cq0df5ivwyw69gp0uzv24r4uo7v',
                channelParty: '992vkjevq0lh17cnmplstn6urca3e7vktkvmjfafc0z1ceykmmr5qe5qrifyduzex8hxqkhylrv31u445mavpij1j8kzgmapcatlcsd7cqmm5mcwgn9sc9jmok2n946ius8teekozna4q3dop1pvy9cdohmu9hsl',
                channelComponent: 'j5gfqoimdeidzlft1z4whaasr66jkeh3q9sugo7pg13oq7c70unhadw89hhnp8vruquahw9l3xfn4ktmr4tjtu2ak3rx1zzgxiao5vlvupgwvgkln11fn2vfbdby14xitmobnka57xpt3f11gybbjy2a4g092yra',
                channelName: 'c30jvamnm7h6de2th8t1q8jlqec2vp1zmukd6xu24j6rllyefu5hvc929xgry6y8ufnbnlhgqqmnzj4k54svfup62v4p3fb8ip7vwrgo73g4gdhe5g04lohmafh28n0f7yvcmi0witoi24nbm8g4y4o4eexg7t38',
                detail: 'Velit ab consequuntur in tempore. Quis et eum quos ex impedit consequatur cum deserunt. Qui quis quaerat. Voluptates dolorem distinctio accusantium ut et.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'h1n04fmlw1tj1m1yxfjw7k7j6nqscvlbjx3lxlx7hcmiig2p11',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'mik4kkat2esb6b9j65od',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 00:16:28',
                
                executionMonitoringEndAt: '2020-07-23 21:58:51',
                status: 'STOPPED',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'osniy6lvdr5a7oefc8x5xjzzupveiozcb0w7101g0g407fxb8f',
                channelParty: '2slbxhuukjipply98vjofa9wzy8rg7fcknlxssb16g6waazeuy1ms5xuhfw6tgrxgskvdbz5nr2s1h4mbpoqmpkobnrk3m0xff31seit2zak6g7yd27gh20ui5cqlzrs4n65krsszle12k51y8eiicy601axktjs',
                channelComponent: '6mdstebi28gpbad80nqyvl9jacxwxlgoc4kjvq91b60knt9sv8jzb6qdcbmv8iuuav1q4x7ebahuhvp5lpa7jq76wh2r0thsvluki1dbl0qfavr30v5zeuxm6c4bi92d00hmc38sjy71it217wqaxopvmwukc48o',
                channelName: 'z68i8p6k9z2u1whvbbsmbobd3aoexje5rsastuv7ffacaz8qv68z8byfugptj006w6ssdlhszn843ex9zjmb1zeqiknft6l57y937w6hoe3k2e5w3pk6lf7cumveb4ozwklq4xv3byld9y6sm8e37w7lqs8b91to',
                detail: 'Quasi nam quaerat placeat. Deserunt iusto et aspernatur in voluptatem molestiae. Inventore est est reiciendis et. Quae autem aut beatae temporibus. Non sed quidem. Ut libero voluptas a iste ipsum velit est.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'lnje6paqn8bavwu53ex26qcrmy6ltodaoimbmirb3r5tzwuh8c',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '013i5v4gofhygjwffjtc',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 01:03:01',
                executionMonitoringStartAt: '2020-07-23 18:29:43',
                executionMonitoringEndAt: null,
                status: 'STOPPED',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'iop37hq4a2c4r1ljud6wcs4ua6ozntsoptsi5ryhjdq48h3dg6',
                channelParty: 'y37u4w5fiirtbl1n2nxuagfh10wep6k082xwj6s4zb3bgcvmx0k42gqghwsexsbwdtu7mj2qjh2e0ilylmp77tn690j7rsisbw7krnd778tetr4t2p5g29sqjyrwlx6gyyv6ib4rms7whyl5suz7o5u2y2xm1ydk',
                channelComponent: 'wku51gi5sl6kw2v8zvz93cywhmt09otaqfqikhias78ce3aacc3r4awant5dp80v946t8ynq5l3euhzu1kws0m9s3ibp618fcywv2oc2v7ajaxxv9zkhfejlzr0u08v4bnb78778h2tzmlhnkyejrf1x1ld7iqio',
                channelName: 'yugxreqeo9gyaayrcadr10a1bzgzrlm1lt5rhcret4ih73kumxa49pjs52a10o717gixsfec3qmd8cxy5vuuzvy66gij6z23f9hf5ez63h6kbamr3511g11c9e9icdbp4w2b5xv9yz0dkzo54wnx43biyi4lymsm',
                detail: 'Saepe enim corporis assumenda aliquam voluptas. Velit aut velit ab dolores ut et iusto. Voluptas dolorem omnis quia fugiat et sed fugit ducimus dolores. Velit quam quos eos sit sed deserunt. Iste porro vero earum et quibusdam velit accusamus et quod. Nesciunt natus corporis.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'tk6fc5d1ss6pp7fxeg16les6365hr4fv77zmsqe09cph64rh70',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'di0ogmspd4q9fd1ddpjh',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 18:07:08',
                executionMonitoringStartAt: '2020-07-24 01:46:42',
                
                status: 'STOPPED',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 've6lr1g2bwyi7rar9taog5r83zq8l3xp0n0j9drsj64yquze09',
                channelParty: 'he1rq7xubdtrjk713w5tk7v7gczdahnup2dfhbcvku9ughtb6tdhvt4uu9yl2e35rkd3po5f51gwvwpp2to6ee3q1nv1docli5eyhepwx0zllubdjtwdyu46mrqbajlug660wi5hg8l646qutlfdv770hr3clehk',
                channelComponent: 'hik6aj6i55dsx9b9a60gzgcfrylsdq1o7orrtdq3s2mtmn9w3iea8sswqxi0avdoyb4mhenm6r34bow7lnpks7x5mpfe150fzgx0h0kl0pwpw6h2jjmgut65a7a0dgzbbk9z6rtnc1pobiszqke05682l01ljvq4',
                channelName: 'hr4wdcbwtc0c0pf74e6mjabymgdijjwh98svnw6unmebgv0blsu01uevsne41w0p14z6g61r26xyefp41f9088s3tgii9t7x9yixqgfczxx1c1r0c2vxkunkjos3rt6t2eulqaaofg8w739b9ek0q1ex2ivkiyb2',
                detail: 'In velit molestiae dignissimos ullam natus recusandae nisi autem voluptas. Aperiam sint repudiandae quia. Architecto provident harum enim quis assumenda velit. Perspiciatis et odio.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'og70e5gc6o0gwwaj6z9ldyc3redzzj8wiyi4o4w86eqe9srt76',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '9mpz1pfbbjne0ze14ryq',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 06:59:27',
                executionMonitoringStartAt: '2020-07-24 08:15:05',
                executionMonitoringEndAt: '2020-07-24 02:15:36',
                status: null,
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'ctw3k667xf8p34c4hpw2mppp5gepcnuovxxpat6f19iuzlzj62',
                channelParty: 'js7vfvkmgrdjrgkroac1kpzhxsqnjo4xr5ld588nul1msepxtlmd5af5yqxtq018fpzdavv9lswf78mqhl3kgud0rppf0fh7ht3ryh75shpjvaw1wxpg5uhomt77hkh30lsuuxo3gzff06fik2hs0fv5z7xb6f9n',
                channelComponent: 'agzfr62vayq28sp2mdtif5niwtau3e727mpx9w6jcjc9rasxlctcuxuufjb9jph6tc5r7bqoq5b65q6d7rff8cgbz0raft6z7doygh08s2s7fa9l0blyk1gqufgjor1x7sza1mj5m5rylu5kuk8hwivbsvtbeouv',
                channelName: 'yudoy57fxmariks6euonwakcpljpr1yp13ud0ppfkexxsl29k1ku674nme8q734fsmhi4macxai0lnomor3rvbgwvz0hx67d0dnjzb2x1j3bw6prnfagfiih9l4e0qm35t3uy95lza9pb36r8kue55j6dmn8txi8',
                detail: 'Error nesciunt et consequuntur reprehenderit ut. Amet corrupti sed quia et nihil quae. Cumque quaerat omnis amet ipsum et odio voluptate in. Libero harum sint aut.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'ro3vdul6fjne1h1bjlld079hdssv6rdxqv5oc0pw8qmoz3gdj5',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'nnriwgqikavxibt7q34a',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 16:32:49',
                executionMonitoringStartAt: '2020-07-24 13:07:28',
                executionMonitoringEndAt: '2020-07-24 14:41:37',
                
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'snvpoc8cgsrwmqxzf8ex0e973chwp6k4em5vdbxvdlixjbypfd',
                channelParty: 's0f98r700bz07yx8qzyzs0norpclss48eppn86087mzd77vno4tuesbypm40tk6ybwo4aicskdlkowmw1puie87tnh4m8b8gba2ti9qjap8xmjizdpa58osvntqtsnnmhtvo977bd82ksmdxfup3d801rmf3bu4a',
                channelComponent: 'y8at249qwadoqb1eoqh40efb71vy2ugq1tp3o0jwilafddls2cwykxkxc6qnpuvbnjo55r22rrdfz892a4ne8x7bl5d4njb2vyp4oyqw6xb3jb0nyw75g4renr55daxatusr1g8utge0077iwp94q9swumha811v',
                channelName: '9jr6b55uoh4esaqz6z0viw7ob2zsa8gzz475r6ov70322v98wnh0lwbju0hkolpstbc0e93tbqgkievfti1i9ux2q9du9yo16vp10lg0qzt6ic5d66o16x2aseus3ba707y5px3jkb5inebdsjxp4s1mcc2ymb2q',
                detail: 'Molestiae quibusdam eaque. Nemo nemo ut atque. Quibusdam numquam nisi aut quo.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: '70lbogwoof3nxrhatukzmwkvrx70ywebwdal3quvjrdb0rceev',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '02pgm0dw64dovkhj6bov',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 11:24:07',
                executionMonitoringStartAt: '2020-07-24 03:05:02',
                executionMonitoringEndAt: '2020-07-23 20:54:01',
                status: 'INACTIVE',
                channelId: null,
                channelSapId: '9p890yr1k03g6hj8pl60wsbb6z9972ijcfiax1elmf0i30fy75',
                channelParty: 'n0qdbgr5tg47dsqb1u7yara7c89j1aputmswdto25crrch6vry4h6x6738g9qoa8w4weu1aloiysnyvs8o7lznzflw08yo90ghmy11jp111f8eyftyfwipb7hmunruvh5gmdr0kql2avf4ufj6t4evi92dpl4cot',
                channelComponent: 'hrgim3ivjrgzva9sro7xlt33nsoce85khvjvu8xomsdtppsw5axtdieigivfw7bm1uza8usj81rti54ijb5va6b1qruf6wu0lihgcpr8xgs3u4jo5sl213kqdaugl455x7j3zqtsayqrf1y65fztsrh7o3jv5h6l',
                channelName: '3xlxd8ax2p0d6brbkvrbtkn0a4x0nuuojb6u3p23pyuj8rcunue0gh75xn8py07m79178k6teklm8j8kqak9ahtijd8sg8qp41nbmobk9mun3qzud0d6jryee1ih97l65v25llb5qso1yea3k392f73j3j61w310',
                detail: 'Ut et occaecati. Fugiat corporis qui earum. Exercitationem nihil ut illo autem. Fugit quidem magni.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'avjnvs70nx8c1e8jc0pbr6mwp3l1m8obzp8trim666zodf6kj3',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '0j1h3rpwn2yt0xf7mgsf',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 21:55:11',
                executionMonitoringStartAt: '2020-07-24 09:13:59',
                executionMonitoringEndAt: '2020-07-24 14:28:08',
                status: 'UNKNOWN',
                
                channelSapId: 'cks1yoxy14w61jk66zh8z9mjovj7fyomtboew9wldw4my9mdvo',
                channelParty: 'xh9lrnoxrsnplobkp11oxkq5bu6av0ia9twoxq8rutal9a4i1xz74w8cznmn1orv24ovzsoainj6eqdclndt0mbz3skacoer6ys3f093qf3kvss7cxfo4mnsojxip9bx3zykjcdoc6ja451clolp7ohwlbtl2y3l',
                channelComponent: 'u7fdgdlvwrlvr0sioohi01d7hyajpy00w86aavtuaoh35l7qcvdr7gf8difqnz639y6s09fch3buwhpn1lwbhccmgsk65k5rdjllv38wmyx4o0efpz6t0bwvvxbf9sz37oqbflagcnd58vaijp0sc607wxrqln9e',
                channelName: '1twcfbtalzz5otg1bsryxvqbnzu3r34tzxrpmyrxr3ffpj89zulqlf3cmw436cr2qmujk0cvv8f5p2zti58y42aeoov8wwjb0yzvfa6lm74pg3o3i178yj3ssmym5vtgae6som4ns8lxms23b79skr48gw75kqfm',
                detail: 'Excepturi accusamus sint eaque sed saepe voluptatum recusandae. Nemo modi sit. Fuga quia est nulla a dolor. Inventore saepe quae odio in quod blanditiis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'hkgje2pw53dzsfeh8hjqwgru9vx9hwrk69xn4g3uqj8495ja5k',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '96cc37xndnhe6fy8kqf7',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 05:04:13',
                executionMonitoringStartAt: '2020-07-23 22:49:35',
                executionMonitoringEndAt: '2020-07-24 08:29:33',
                status: 'UNKNOWN',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: null,
                channelParty: 'ho17fvzviui4nz3by8xh11x6beeumkf3108f0cgjaqg4q2esver6pcllwv7qi58p6tez547r5w3nq32canlwhqzktlf193xq4ic0n79te34fp1u5xulqbo19oh40wyz8rnynpry52u5yemztpjlfvo2pwso7ezt5',
                channelComponent: 'dtv76fe0briqr558ckhbklpea37dau9c1remwg1jid3832lo0649r7zpvaxbne659kukyk3rqroc022kxamvvz8h9pvrj6hycykkuvoehh9memkk3vn8xdwhpvp7y6fjwjs74k9vc4whs5r32ahiwjvpu0i3mk12',
                channelName: 'm5ix7r63qbo8bccx5t63b5f2q6pa3eolaqndt0m8q4b97k8gaq0nlweiebq68pb6qs11tin2s8yb13a9vepeuwcwai6jkk0wlh9e1oflyxr99zhoarwcj4672blnhvzi9ebcz5pyga4e67dw863xbatoypupsfj1',
                detail: 'Repellendus illum aliquam. Quis sed illo ipsum hic. Cumque ex qui eum sunt quaerat molestias est. Molestias consequatur nostrum qui.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'j4e1masxco84n0xxhjp59r11ucuv17p593ae1w79d7kfrkcojj',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'a97y20v6a9x1duypjwjn',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 03:50:58',
                executionMonitoringStartAt: '2020-07-24 00:28:00',
                executionMonitoringEndAt: '2020-07-24 15:29:06',
                status: 'UNREGISTERED',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                
                channelParty: 'q2p8dkp1vxmg5u9r28962k7gwm1e1bwr94subcabzee7leb2uzbzfu83xajrugnn0rcn2v9acguwhutc1246hrlwxx0c5goyh4jihlhstuumosgtp1nktlhirsjejvt8feb33y6l1fn65uhos246hekt78lnncr3',
                channelComponent: 'z57d081nanbz4efbfeh7koa51ydiricx4i7f1j1aw6dz6kjksfashr89nqe1hw2i02mlce26f7x78q3cinzsj93abe88lnnnbkhjmksix5yu2jzyviw7bvm3v6cas3fnu9v0szb76ckvkm5y66rjbzjuv254przg',
                channelName: 'w7h2pl83p1y2emc2c3curfx3srcadsi2wer507bx2iaejpelbt5hegddrzei2c48ki0asmawzqg6ggi4ffpxqb2x91bowmz1x5nrsd9wwc3p73tdcvqgikmyie4c8an38mv0vgard8vecp4yg2veqrwuct2ensj3',
                detail: 'Quod hic odit ducimus. Ea quae dolore et repellat exercitationem dolorem. Ea libero et et et rem eligendi.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'c5p02a9gnp2fuu60j0c4xneakwqdyiqsb55d9feq52pv0s7xfb',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '3h25w3st7bsgvl7mkp5s',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 20:40:05',
                executionMonitoringStartAt: '2020-07-23 22:45:42',
                executionMonitoringEndAt: '2020-07-23 19:35:25',
                status: 'UNKNOWN',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'h23caaaiba6x3q0cke0x38olozgesot6bi8jyo9c8mbbwifmjy',
                channelParty: 'u0nlqjpd8l0tqd3zn9a8egyzra509zbexnzglonvnjdkxotm8ycyzj3krhrefxjigrpwua02u7byvb1ab3ot3f1r3e614w1xlbzh5d4lqho4znjr9hql3j3lalwxv52m015ixk8etxbxx6fxyoqefgqran2qleyf',
                channelComponent: null,
                channelName: 'fv8avehmpxez2btnc9uzyalzwyxhtjm48iq3s48ctg2zp4d5ptfqob3ukdjriw5yz2qm5g1sbes47pk3tl8cotennolplenfvrxt6ljtohauvo9fep9i3umfqkl7lw5bhrthayxeg1wdwsm2o8cxvm65ek7uzqru',
                detail: 'Incidunt aut ea non. Delectus corrupti sunt quia ut tempora ab dolore ad dolores. Dolorem at consequatur.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'tmy2dzfagu31qbsrtko5k2ic3wvzah7hxknebkdgc6o1oi0q9c',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'qq8c8np26zmy5cm1m25j',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 04:46:01',
                executionMonitoringStartAt: '2020-07-24 06:33:42',
                executionMonitoringEndAt: '2020-07-23 21:29:31',
                status: 'SUCCESSFUL',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: '300ssmscn15lernktqs66tcpe7wmblqp035y2s0qijtbm2a8kb',
                channelParty: 'u0nwfsions1z0pp9iuprlh0gr3yqpzez2nwyidz1tj8prtbzoon27cb98z9dyfyb8s7snj456nmc9d6yolm34ufebdqkwygqsmu6a7irh7lhrfwx3naleufkdbox668hy3l0ks9fwbaamz8b4r1bpllah4jyjdgr',
                
                channelName: '466bmbst705x2ebf1bhkpcksa0ppdf94z8mdk59ylg4hxkod78awu90d9m5fgpndlci9jy5tee7glpr2bgxsqlsg7lwwa1exhbjnnaovngdc2hk634vmiztfv5uikpo3q70hyz96u7eiphhqgcxoi6lcw701iea0',
                detail: 'Voluptatem nihil itaque quidem. Iste ea et ex. Voluptas laudantium non magni tenetur enim voluptas quia nihil. Eaque voluptas a doloremque facilis nam aut. Sit in vero ut voluptates consequuntur.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: '5t1bojridi4gz53fyam6cf3legqvwje14yio6m2dzwoy671zuy',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'co2vqv0ni5825pl2i0l7',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 14:41:04',
                executionMonitoringStartAt: '2020-07-23 21:37:40',
                executionMonitoringEndAt: '2020-07-23 18:17:35',
                status: 'ERROR',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: '9tj5l2tnqmh3xx6y2fsy3u7d5x0g4jjv6bxa6bbngi2m3dd71r',
                channelParty: 'twd3ivpqrq4cjoj6como5wunzsk4xk3uea4yxikssjqm4p1zowomht6ypeg6fohv789ctdcaho0oyja627st8tegam3oql8ncwo4bjqvjcf3jz302uytilispsxzjn6y2vca8qi6f2ux8ds6fhiq9jt6x5k6x702',
                channelComponent: 'ka8vzuad068zipvfsfl10kzuarqno6042r6b791f50l6sn9gvhhmnkx3o1vrho2bhq9zrtm06ti5qq2emxmn7aeupf1w7t7wsnu6wquasvm6tzgxzn1gk0q8ew6c3rtk6ikvm78mmfei33mgu01rwmuieu0at0t3',
                channelName: null,
                detail: 'Nam perspiciatis sit et quia doloribus molestiae. Cumque laudantium nam accusantium voluptates. Cum ut ratione perferendis dolor recusandae rerum enim ea. Et illo id. Cum explicabo impedit sed. Magnam aut quos at porro dignissimos doloremque.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'z50sefxh60io9s92bzp5snpun6fd0rjeiyptn80oqk714azvmc',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'dncn80fjre22dngi4xnj',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 23:47:20',
                executionMonitoringStartAt: '2020-07-24 01:46:07',
                executionMonitoringEndAt: '2020-07-24 14:07:24',
                status: 'UNREGISTERED',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'wpeckkhwbch60zx5kxh5zpj2qtb0sqbzmt35jy2gmel8germpg',
                channelParty: 'jta5iuj730srdiepcgytg6hb1e6kv1gxjjcbzm16taumyc85slo1ezkx06neyp8h7birhbh42idzog571n8ig18j9k8c23gfk0e4fzhvnybd0tj4o00fp91hf3r7i2ne3wc5xs9qr5qr8yw0k6fd5kwjavmttsn9',
                channelComponent: '4a72oqsi6u8g3dhld45489i4nu1sgfetltzrxpgjl5q82d2ej3715o0frfzgr4i4tktdor2cqr1zh2aruqf5plc9y7vb3d3efabc0tcrugyalj8mei0f84i412k2y317pb64aen5bcc23nkt262ru8ui5rl9lolx',
                
                detail: 'Reprehenderit exercitationem hic minus excepturi optio est sed. Non placeat qui et magni. Deleniti voluptatibus omnis inventore culpa est impedit eum. In ipsa est eius qui quidem quas quibusdam dignissimos autem. Reprehenderit sequi qui fugit. Mollitia non aut soluta et quia animi nobis saepe.',
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
                id: 'qe253y0slbcto5cnqyd4mc862966p6phay3zz',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'lllvt38vfhywqtojoj2n33fetpt23z4gutjjjjueyd6i0vguf0',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '0c4kdhyr0dfjlzvmn26o',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 17:33:08',
                executionMonitoringStartAt: '2020-07-24 13:42:18',
                executionMonitoringEndAt: '2020-07-24 04:51:26',
                status: 'SUCCESSFUL',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: '0az5d8a1yuv4hmiasa192ty1vd59xerw0e9g2bgnbjjcgheyca',
                channelParty: 'vjmg2ka8pqg4rm8f5wii1czgaj0jmzw22xf2n3u8s05cgzqpowdgmko5x8xw0o8z5zwnsw7j0sw2lv4zcjdk2tiooqbt0h8cy2pnq9rd1wuwpzak0hewlqse2jg0l24pbwvcpaz9rqym82earpt4xco5pz5kg8zi',
                channelComponent: '5v8a6vp92darung2mb5f969ewuvxsd4pnlxldabklb9ogc197a4bala5alm2lmyt2a3ytdwin0o3lxsy461dcv2ds8kanr3vc72vhqu33kvd5x9ohjklr0qqjtgqxhg1illpn8hzcqfbvmvvxbtxj2t6vugpk09e',
                channelName: 'dedgd8tp6nqw3cplwygyxd07wqwhr8qcacgqk9vwsphub0fbubpod4d5es1dp5yigcgdiw2hotfoyhqhou7rh97drrpcibc2phmbxixddbpek81gw3lzpmdx9x9v06sbf0nmw7elu2l376h77feb4onm94vnz5hf',
                detail: 'Ut inventore soluta doloremque quas voluptatem repudiandae iste. Nisi eos nisi magni. Occaecati tempora voluptatem quo est ut est dolorem. Reprehenderit necessitatibus qui. Consequatur laborum animi odit autem.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'bgy8ymaffzg4idrfpbgkrlz92xmdhvsqpr2zp',
                tenantCode: 'xwovifigvq882z4f8wgrw3ypb4l8dkzvetfn27ljr7jxy8sowj',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'cipnq6nxwlibexhmezd8',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 06:13:30',
                executionMonitoringStartAt: '2020-07-24 03:49:48',
                executionMonitoringEndAt: '2020-07-24 16:15:31',
                status: 'STOPPED',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'mj08rpno1mu0lusunnv1t85idwcqyr2x0f2i1th7pff5dq9f3v',
                channelParty: '46u41aynt3eb06djwys5x9u6ssk2dmatdxp18nxoxo4ci9hmtgq79jtyrgujfkb6m8264ydxr1v6yxn1j6ym161b0zl1ljfooyyqg51xpa7bmabljyr3lenn7b3pqzhdsj20s7bp3xngmxennsow5fh01vdiiuoa',
                channelComponent: 'my2suhbf4qo860memcoqs72qfuawrlcf5gercd8qvosjuzyzgu8djr0fevyqooodgekgg2ukd70yjhudoglbv5w2in8oo6bys9ysp49rbmf2xou0csyym72i8nrpkcjfjwpwftcfauvumvbpvdpu30rnrytqwi84',
                channelName: '61a0zk89ltz19g55lpwqlwvahtm1d43r8i222ewo6sn1szflcv2dth0crv9961lhsr47zoffxrbj4p2e60ssj3zg7o8wfxooxhax5trtk5cjvfh31r1qb0izoqj9d6ryq48x6asc5f6shvrg7qzdi7xl0rgeweis',
                detail: 'Labore vel voluptates qui. Cum consequatur error doloribus labore nam. Aspernatur laborum voluptas deleniti. Ea et fuga.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'twzd658909e8zveiwemqw1s9o1rbkzv1zyv584wfr1w109xrha',
                systemId: 'rexies7j1nbqav0kfe5r79oq1nayflctsrvqi',
                systemName: 'jma3cgi8ufs9fijf48ha',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 02:02:27',
                executionMonitoringStartAt: '2020-07-24 13:53:19',
                executionMonitoringEndAt: '2020-07-23 20:03:14',
                status: 'SUCCESSFUL',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'xbgn0vyowc7uviomnooaye22k97zmrw04fhyki6tz5h6m3rh4k',
                channelParty: 'hx2oo94mrvokltnpjoikamgrdvh6epg3cot6f8bfizjtxajyfksbue32ivedej5knhrk8jg99pctik39r0o91z7aq5unjtnmyw2ltk6apgr37aupaimnh9a6fjstn2jxhp7ravj0nv83b4nf4fai44zclsf8xupu',
                channelComponent: 'k5o4tdi4iiavn6kk788vki8f6ho3wt2vumkb5bj6umnq8umhl7wf6an4hph1oakvg6xyhv0r7mdsqcdye91zvuh15r4obk84eabp3gmb2bhf10mkoxzh8hwluv9g9s4ytqxvycd3kq4tobpqk81v957f8ddy720d',
                channelName: '64qgumjffe4xt3hyot9w4ynvx317o5pvh0jcgmhiuenma9gxne2v9f7799wp4wmj0p4qi5l0hx0fwtiqzejqfwbqps0e78d6f5vu61gerrrmbpcn65vgu3zlxn3zz2jjcep2m825p5wlpygk4gmy7d1klnf05584',
                detail: 'Voluptas perspiciatis delectus eveniet minus quia pariatur assumenda dolores. Iure voluptatem omnis quo illum velit quis sint perspiciatis. Perspiciatis qui non. Non non alias iure quis tenetur omnis nobis nobis. Dolor sequi vitae et sed ipsam et.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'y31cxsqxda8ss339ceeiynoqk9mrzmackxb0oeb7x3po429qvj',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '45rwvvtayooks6itm7wl',
                executionId: 'wt67ctbksbsj944t60tcb7550is5mo6oagvup',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 17:20:15',
                executionMonitoringStartAt: '2020-07-24 13:59:29',
                executionMonitoringEndAt: '2020-07-23 19:14:04',
                status: 'SUCCESSFUL',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'f5zreqfodj8e7977l65qaodxx5bx5xs8p547aiaxzsuaz7o4c0',
                channelParty: 'n4dc4zwo0xw72646t3z15bpjejey04uouwutoozxmlvge168z4x49lno6lygrlf82ej2ax3n9i5lay5qvqkgfp0qkdu7qycz282jmihzcyb2sv9ko3nxfcbq2gycedv9lt9gfqpk0sj0b1olx6fxjzkrp7099y0v',
                channelComponent: '53ybceww4u128bgjjh1rkeicqpy6qjlwxlqt51xvrq80f84787in9kpjxoeuh9tdps69a4dlly5aq3jnp8jdl5t175j8v88qatggx9ti9ea1ti20fumyacw1zmf8w82ti3abiuezesc7ogerv69ntxov3d3dvneh',
                channelName: 'doucsdz2gxxfh8dlawwdckm97fiqz149q4jje4khehemqpsx8sst1xrpktj32x3vndwim4vdkrnk91052w1ng9srq9etn9kuwyol0u6mzd62uk3srysa0apz9bfkqz7vtjhuvff37x4fa0yy6gxp6h9n2h5cx8yo',
                detail: 'Reprehenderit dolor sunt voluptas quam. Aut et suscipit et voluptatem ut numquam. Accusamus numquam natus. Hic hic vitae est pariatur hic et perferendis consequuntur nemo. Beatae eum optio natus provident sapiente sunt eos.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'q1cvzrz6aa6sgmuot1hn2d7bnb70fx69jpacvimpvz5z2btav2',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'ru0m2pjmjux8phct6e7m',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 13:08:33',
                executionMonitoringStartAt: '2020-07-24 13:34:29',
                executionMonitoringEndAt: '2020-07-23 21:52:20',
                status: 'UNKNOWN',
                channelId: '2qthiqq6aco8lzum6rm7mfbddwuirui9qtm7w',
                channelSapId: '1cp245xierfkmajy5bqi9m3cvmvhjqxf4qdes5a1dtiyvg60y2',
                channelParty: 'xeoogjrjkhhgo25ps5g4mrhfya00wz86nloe5d2pjwa0ydb6jjwip4bmpbwogaz11b0rkjbz07uitdeza86ztcecivij748l5ap9rcsnqoitp9dkt4z32yr297ofy4ladtn1ydtu6x0zysx44t9l4pq1luffzahk',
                channelComponent: '96k71nlnlzbnh1ulj80mst0md4veax9s9nydq0aekxon5uqz040b8upl53zeuegama8pshppkk55wh0ek6o343i2e6h07t35me1evur2vt7un1d2nalm7mj0joli2sbytcpa0mag541gcg6jhkoryl0nqerigsgd',
                channelName: '4q3n105e6mix93nkek1sly2v6hk55bon07cwhzyxzbcbm30675d9b6ju3nmlhhpeckffcggh5wn9enxuxhd9mhjkuxex3ncenf32fx05jxr3uuqky0h0a9fgrk9g2jhttv1d9p1hf6wwl2fa7wlnc1xsn8qm9pmw',
                detail: 'Quia modi illum rerum perspiciatis cumque vitae voluptatem. Sequi provident modi nisi quod possimus excepturi et. Facilis voluptates corporis quisquam vero expedita voluptatem. Omnis explicabo eveniet eius nam deleniti explicabo earum earum velit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'wektca26f55vivtazjvw2rarclhn8l8flwtndpj05jsw7666aip',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '1kpo8wkuqocprg06sjpz',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 04:32:52',
                executionMonitoringStartAt: '2020-07-23 22:47:02',
                executionMonitoringEndAt: '2020-07-23 18:30:02',
                status: 'INACTIVE',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: '4gtpafn6fe39bw2r42039r3maytjparjjgsheaa41w86i7ohoa',
                channelParty: 'd9mrm6f8mvdpoglzpbmrpj9mqxw4le9pwdoihmbkgdyhydp2mcb9g7u6o5vyijg6cb1vr44xiu3gb962q3xj1tx6rcma5gdzpaw6mchp0zhquhmfpxreobbj9shf7pnlr9odz624boblabjpehfn1v0h2fu13vz9',
                channelComponent: 'v443ah94yrcti64j3cfow53sa8oll45mzl8g6eg4y2it6qjstetr98p8yvpaabam4q3p4cd5sqd1jkog89emlwk5juyxwm87xvbz6omosk3282q81y27gvzysz8n8wrosbva5tq4po6ybgf2hfrqib5e8swyz4gr',
                channelName: 'p0wty9g82l4x4nzm1bjlp2b8kfhi8keej5y8ckx0iki1jvglo6r3xzz4hlbiypxffga5j3fpw5by166319oj0sghbo23bzizwkkst4p9y56wamexlx9j20ku421ynu5m8f8ob67yc8ovkq682q28wrh29ctlnr4h',
                detail: 'Et sed accusantium qui quas. Ipsum dolor omnis in. Saepe eum autem cum nihil dolores aut occaecati pariatur laboriosam.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: '1q2u8hi1b3zr2xvotw9jxy4qbhwrplm9vs41dn0svdi4vqkg7l',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'qiqh0zivmjry4jsia0x5w',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 15:39:19',
                executionMonitoringStartAt: '2020-07-24 14:48:55',
                executionMonitoringEndAt: '2020-07-24 04:42:24',
                status: 'UNKNOWN',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'fdus0tr0aijxhci8o1w81gf4pp8lk0lbol9nqnpp5mpnuiy7yo',
                channelParty: 'e7kt3n5ti072fyjni6i7m0nyvaf8ui6vb5afpwxom8bs1guk7fwg5dhroshaezqoi15495m5g81hqehfiepy8xwfhzbh6dhbwljvlapsn1tw6rt64i5rg0gf3gmutxmr89j21f9zkv3qrsuaxrm3etv5q3pkcnhz',
                channelComponent: 'vfw5pg0ugv8kqjhebf4beddkqllyg1j2y2uj06nylrhk78ihz0mpzprdh3ryo0ab5mgi2evri3xf05pycjdmzyey30q1ac0olsenssi8d1wxviwqnzsovthqtqhue42ct12f0ng9oc039b50kgujlxmf178xhwb0',
                channelName: 'b6tqcu85psvmagg7uqzejrl7hmyukjb2wydvoq4v674pdtrjm517d5fkrlcxbd1opsp3193yc2lpn2p6q3wdprcrcmps49yp23knv8tkprjvkuvhp7hg08oe0amvi9ootgf3bbkxdj1dwg1pqx7g4e1r4r4v6y7w',
                detail: 'Porro et itaque. Ullam qui pariatur sed distinctio quasi laboriosam placeat rerum rem. Rerum consequatur dignissimos. Minus ullam hic. At aperiam quod.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'or2fafgwiihpidfkpes2p0b5161vz1coay19w30uz4pecu733o',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'lwugy3uwiyv8wx5n431l',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 20:18:51',
                executionMonitoringStartAt: '2020-07-24 17:48:09',
                executionMonitoringEndAt: '2020-07-24 06:53:31',
                status: 'ERROR',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: '9tee43esh9zdeiym2qatgyseq9xemch74tv8et4nrkfyozueegm',
                channelParty: 'xfgqkcgorxbvwzuriogtdat52mmz38xbgacwtxp97hf1wtul5o9mty0feoqrf113n6ha799t40modh5chebeyyuo9l6o9g60dqdjlc0k2y3s3se0hqdt8c0wfiwilb37ooamea2ij51bgpqjy6yjkqwx037q9a74',
                channelComponent: '0irmint9uj7n9ry1u0u5l6g1vaj53rwvkqryljld284kqc1wljzkzaxmtquplrp4exaaq38ytxclxzg3n83a4dxxt5hashlsosf6anqfg448dzimg721e4ylsrd149zc08slaydjm5l5m1dh91u64wbb38ea884y',
                channelName: 'fdm27sh42mfq5is1a6nxh5391ut5v3ceeforfq4xzbgopv7b3xksyzgs79ruuycfuidkpw515hbwy985hwgh6euoyszvyygoh3j7y0qnlomk5yc2e4hokt0vme9ywawczv8afpardf8yyn1kyc9qwhhig69svfy4',
                detail: 'Commodi enim reprehenderit quia tenetur. Sunt labore deleniti alias quae explicabo in qui labore. Ipsam dignissimos sit perferendis rerum neque et non quas tenetur.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'zqk512gfd61diu8pico1vbzubltjbdyhr22ahpv2pzsb0hrk5s',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'gpmdbu87h4c3zglmivwf',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 23:58:48',
                executionMonitoringStartAt: '2020-07-23 22:09:21',
                executionMonitoringEndAt: '2020-07-24 06:13:17',
                status: 'INACTIVE',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'kpmat0zrjylqm6d4cpik22545o0bemxjvkfx23vsisfrastdpm',
                channelParty: 'ppeudotrd5f55thl7rcd282l9wbmaa9t3bq00hj3cnhnuy53uaa6mequzuh41i0gx1w5dfs1z6hhfc68dl8vfo2nw4havg0iasmt5d6t5v0y3438kckuzus5zmdwii36bikpbcazzcn3llmxws2merwytuh82b1sg',
                channelComponent: 'q5tnwmz3bccac7vcp7qon630cmptqkzyzgqfnod39wa0gbl5gt5ob5ufbpeo1gzbab7g80u411aqizs0ubzs439774udcmze9ur93jym83sopkxtilq3h7qk33veiqhq9u0s1zusjbooff9xa8nokte4bpykk9ca',
                channelName: 'ogol1ki98brb99tryluri4ie9hnkc69s1hfq6fr5ai6syiw14rdqlyg626qehynbepqfpzcsch9t3yxqwh7uademm3dhlg6oo5ztexfrar76g49zdcpy7lshb0rdqw0szinj4jzdee5ri3xe1rk98xoii163tbz7',
                detail: 'Dolor harum qui unde. Et voluptates alias officia dolorem quia eaque. Praesentium architecto dolores dolor laborum vel eum.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'o0b0kbx326htzg8gz8wn8jzn5pgrwq0ggvxez5xp7l8bv92tcr',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'zh28501ey6db44n9ffha',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 12:30:03',
                executionMonitoringStartAt: '2020-07-23 23:07:43',
                executionMonitoringEndAt: '2020-07-24 09:58:23',
                status: 'SUCCESSFUL',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: '8jpl8tqvjpsas3a9bg4dm3grskld097ixdszpho8dt62m5tuah',
                channelParty: 'nraoyinbblti8pbe3uv0u1cpgqt7tfm4s2gkwr8b7e6wjv270nls8fu9w6c7kk6pe514m1zo9ingprdnsxpqizotehtuepdbftkt508kuvgyxu208jxgfqhu0ldna1s33oft4x0b49ngt97m93q9rppeizy8msr4',
                channelComponent: 'z5pvztjjj3edxa5j4lofwe0rlu5yiwn17o816r9ib4hp8fny7wxpu3950nll7wj06u3zjus8gw7aymuc5bb38vs27r9za8une4c088f1fxopib67os4vfw5enwke2m66f6jq9173nipnfsgv85xt7vmcclfyf688e',
                channelName: 'l03pkjtak0eeno6w7c7ilvkhxmmyy71ruwdqpnex903un0kndml4eqcaqw0941o4jedmswxk4mb8h1316bq3v4y9gj45r6yewerx7ndqi70wu59hkv4uagqlwfbjvak6cjyy3bh46y2apz7srw1vsnfw03d4ygkt',
                detail: 'Vel harum labore ex. Sapiente ex aliquam nostrum rerum voluptatum sunt. Consequuntur ut alias architecto voluptas est magni ipsa earum. Reprehenderit excepturi non delectus molestiae id.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'koa1pd80t08vjz6h2bx6pok4fya1blog4fe10nhqs3x6zkoo08',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'xtph6awyni39jvvmctg8',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 16:22:06',
                executionMonitoringStartAt: '2020-07-23 19:39:55',
                executionMonitoringEndAt: '2020-07-24 09:57:06',
                status: 'UNKNOWN',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'dyc1j3u6lbtg91ozc29m9xcgt2f0yraehe1q7ou5i3mpjks5n8',
                channelParty: '3sf4xbcnpmslvd62bxw82bukq8agt2qjd4xneqlfk1x282qag6n73ai08cox9ao55zfftuxx9t8evdae8qna7vw41jynmh50pck403igev7len30agzagvauarpyj6y8mof8u9tfid6nfqazwl69cblfqd9xcxhy',
                channelComponent: '2dr80gk4ei5791r1dnwdna1k2xh0vrvyf85imdmdahuw2rvfudxekm0z9fsszg987n2iqs4zqitixh4tqkgna41yoptd7i7jy657163r7xd9vbf64gklxvocb97t9alzzg8p5fso7gr5gblh1kxisjllok4gvln7',
                channelName: '6lfnfgffnti5hvie0105v4l9dbqixc48cw32xelm56v3e3v8rssiwiqz6mcg41589yfi2fm5gq6m7atc6xrhw80utew4n0p6h1cbjjzc5buq4kwxl93x3t5u2e1myo24kisuthgsjtz8h0xgepjgy110pcpw8sm6a',
                detail: 'Atque omnis tempora. Cum ipsum adipisci tenetur quis accusantium aspernatur molestiae non. Provident incidunt voluptatem sint non. Repellat eum est dolorum quia et ut commodi ad eveniet. Magnam dolore temporibus.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: '012rw1yyiw9rctrctfu4wgqojabgofb5197l0en4z0xuu88qux',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'ra49kvd7jehxupzu14uw',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-24 16:25:52',
                executionMonitoringStartAt: '2020-07-24 01:49:52',
                executionMonitoringEndAt: '2020-07-24 08:33:33',
                status: 'ERROR',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'wb6xpdb22m5ih1gwulxttcae38ly0a0xtjeb8v9xeohovxbu9r',
                channelParty: 'aqx7zefqoplxtaqffwbvzido2aim87dnnptz0a2gg0nik245dbg12uenzkfm2es7otqm9r75fly5ka4ef7bedqr33qwq9twl9rcpqlm6tyiky7vm8vheq988a1abb0mm1f85evn7rgle6sapq1tdhsbvxvz25jgr',
                channelComponent: 'nv717llmj8lfmkp2nb080nbyupv3frp91cdjshhsbcd6dlj8e4aj5357dpaordtzqtxwws9as7x5tlkaabzvcvu8n0vjzxe9w541weyji8elo5hlpixme1aqwr1urn5san6ihmky53dcpu1kqnggn9d2da1iarrv',
                channelName: '274c1ke1mlaxky6zban2ttt45om2lnb5azog8qxoy0ruwig83v5lgdtvj5yf9p6rlewomvkcx314ez36ovp27a812jj4rq475ftycvfoxvbe9f6n26zzt8rmtthc2ercnhjkzuuomdxt7datq6sn3s9yxlno9pug',
                detail: 'Assumenda eos voluptatem neque fugiat unde quo tempore odio ratione. Laudantium sit expedita est ipsum voluptatem rerum culpa aliquam repellat. Adipisci voluptas debitis neque soluta nulla magni. Esse sit architecto et aut ea. Quam sapiente sequi voluptatibus et unde architecto tenetur sed alias.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'ydrq3qhrxrx96yme0zfgfuyt6kkzhgl4k3c672m8jeg1mxw6fy',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'ly44i4vkil9u9ne992aw',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 22:30:58',
                executionMonitoringStartAt: '2020-07-24 13:28:33',
                executionMonitoringEndAt: '2020-07-24 02:35:23',
                status: 'XXXX',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'f6mo37p4zh6ylx0y1ekwsg44t02a2m194rtgpd1w49r65kiwit',
                channelParty: 'wkqmmhvbgwxagmx697xm8j11bd4unloi3b9yhpcjcuq3zrtytv1wymdqztbuq1e260ap7k091wgj4359jtyc9z4dz67u94lbrxmdqm8kov0ohqhxe61louv6e5t3gcmsq4l72s7hlm4tm0xldl9clysl9r1b3fhy',
                channelComponent: '9et9ibk3wflfit3sk83ucxfb1sbxk02ihi9o4e8oj4owth4j8p17kotx2xoyo3yeuhcpg4hh85udw6ch3hlml3e0m3h6ntzvnjv9mijrgncnqygg87hqge5b3vnl8h09gy1fos52k8r9bwtld20reba5pfmsrapo',
                channelName: '49f2l3v71lkr6t64yoiolyg1elnlt0hs1ogw4b3ioaqhrt0tbgktdnrd4zhda5ynuw6cfivpfy3fdlh345hawe6p1gv378zgzvw7yjj90mcp0vekbqpcj2gzft584w9i3gtqzbha0l2sdeb61pxvviu2i9q2w8br',
                detail: 'Qui minima esse cupiditate et quos. Officiis consequatur eligendi labore a numquam officiis maiores. Cum nemo corporis dolorem tempore quisquam. Animi neque numquam voluptatum ut. Temporibus minus sapiente. Id ducimus vel.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: '2uhind3f0r9i27o2uqygzq89t58msppdgra99ai4ksnybc0m3p',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'c377diupnw0evygqwhxj',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-24 08:42:54',
                executionMonitoringEndAt: '2020-07-24 07:03:25',
                status: 'UNKNOWN',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: '9vthsih2i6v2hq8jcysk70cumq6w9ecxq68dbvq1jyltl718lt',
                channelParty: '0mmsk4h42cwc8dmgi6f3zpim6f1fwnfnie0ot4rnlg4hl6md33o25f4b4qbuqxnk8zzvfpd7p88wxomjx31gerrsomwkxecv4vq3ecvfe3fyzzv6x3afn1zyzxlo59qt6nnkyb8vujzo8i2011zidzs5mmvtpibl',
                channelComponent: 'yeahv221o18s5021dn62i7pj9o2euubpht57lfhsl5h1fv956d02yiay8iplklfvjcbus3uni5nbggvexy8mvlrudp62b3y12d34ykzlml5qb6iixu2nphu3lq74ei7yi1ws20uhdkkgg3a28giumv77fzdjhkut',
                channelName: 'j5mgcv20a64a6tz0mu896wrorxv4g69nghh14c2do1ersh1jvflteghzb7c9f1g21jdh707l7frum3dcam2pl2haer9yiu7dtrkly6pcdqfdlmo0p2pcg7cw512bg7mydhex4hjiz5h3keixhrlm4k6qvwikqe9n',
                detail: 'Recusandae rerum maiores maxime. Veritatis sit sed nesciunt. Odit repudiandae sequi explicabo voluptas sit iusto ratione quisquam. Temporibus suscipit iure necessitatibus et iste fugiat ut.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'kj3md1giepfq9q4vc3e2tisodac6807zvai4ln3fb25s3i0cp8',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '6prj9xgwrqkflqlsngs0',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 01:50:40',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-24 16:57:05',
                status: 'ERROR',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: '51qh9becxvqr7kui25cson17odjydrl8khvogf3afnhrhgs1fv',
                channelParty: 'rss0bci7n64b5f62mj48190frz7e65xdu84qz691gbboh41nvf7oy07ft4h55in29eoyzxbffqf4b0ox1aa8dghs38kb4v67d25k1w6giaznjlakgmjsteo6swhj8ol2sleuzv93yi4q5y84jmhyh2d6cq7hpnre',
                channelComponent: '32nf33ste3vap3nft0j74i08x9hzk5s1zt0kfgnb82ucw2ooii6kp9zz6xpp2npyoj1m5cozgfdrhuizx1v5r24byi13q4q1tcxaghbgixufjfu7i32nbc7mcjf9hba1hothulc3n5oq2xirducgztgyudthh1iy',
                channelName: 'mixr3km79cip0vsitlvn9xv7g1zvjpkx6jk4b87mkdrivmnp9w1eb41grt1w8kgge3dacs6l0rqwes9e55nm301dta1ub0olrtqidvwlhk8s8vcy82do1psx4eubk4r73l5day10zvpglxol7ch4qdp25c9k3uh4',
                detail: 'Maxime maxime id assumenda occaecati adipisci laudantium sit. Sapiente veniam voluptatem. Animi harum fugit illo ut eveniet eius animi perspiciatis. Quisquam magnam consectetur totam voluptates dolor nihil. Qui doloribus deleniti provident quis vero in quo et praesentium.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'xkv2wa4f9nqwd60xk2rnx3y7xj7k2izhs61i8jkxmg76gbswj4',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'ppevirc5zrp2mumxue1d',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 09:38:51',
                executionMonitoringStartAt: '2020-07-24 02:26:23',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: '0pu9xg8hpwg8bwr3xbzm4v63u22bn7gna0ryhq6yb3tuhwyjrc',
                channelParty: 'tkxhwnpjkgfhf1fiymyawmhtt2l516dxd6h3kicmkon8ugurrazy3x91vi5ks9lbedq2vdajwyrq3ciwsv6kw4kfcbuxq80tmjfyz9rckgc07ovknmaln6evvxadt89styhqo0u3ntrc1enwknyw1pjcwul8vuyl',
                channelComponent: 'acyje4t3ukvit3wg7ffa4cllt55mapobtq6iie6q8gs4610m20mmhf8ynd5fptc5nu76se3bcl6la9nmn15sfgcszeouhm2zy7vs7fsh618a5iolkq96f7nb17uis16x6ibyxsizsdh8acmhvc0z1c7fxc7tmcdo',
                channelName: 'vm4weizyxj0vyeiyp0dv1nrcjedolztaitnq8vahgurliqc00a62jgsk2s5nwk6u417bmdsucag5cil4bfuufafqj2btb00lgcqcrug2gox3izybk08s1gbfycjpfy7v671jw59q162kg01yfar8a98m4dvh4h16',
                detail: 'Debitis et temporibus porro optio porro repudiandae unde. Recusandae optio at. Dolores culpa molestiae ratione delectus consequatur itaque rerum libero. Praesentium dolores ad omnis iure facilis debitis omnis mollitia. Esse nisi et ut placeat illo ut quo accusantium.',
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
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: '400jbdt253khhqgc2rpi29urfhvqdr9nf36hrq9rzzsvnzop6k',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: '7mqm4log11nywcujd0fv',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 14:34:18',
                executionMonitoringStartAt: '2020-07-24 04:23:14',
                executionMonitoringEndAt: '2020-07-24 00:10:49',
                status: 'UNREGISTERED',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'x8sig47dp3ntes00shuptmgcvxmd7owy5hawhyap3mn17w345a',
                channelParty: '19csujxaz6cld525m5ymx15vmw6vtn0j9vdqkxqp9auhynuqb7r0c23mpqhcnt2hl7kgmpv0mjol2ft6k5yamhopozlkkujo61n53sow0i434e8olt8tfdwvpq3ez5t7ngfu4ogpad4xpkmv93mffshx9yz0g2zn',
                channelComponent: 'peq45gdahjsu745t2d9p10glgku2fcsba2hygooh49ndn0jlla2jbnz4mggyfe9g6o0aquwgvz91k7d9083venvdpdhj8q3jhlywadmhawttgb8l23b3q9lnfh0tx5xlxq9ucfw9feiadgzy248ewjqybqylgzix',
                channelName: 'l3fwtyejvm961wrnrbdy7ve7vray5x0mrtefi6vuogta2qn7lbw2s8mrc3oy1crzlkk6mdkiwrhy8olfc37bl1je4h5zv9yhqdup2it4mubrxftox1vsrc10j9jrqyd5eqvnocpwfr9iyxm2i5bstzf109wxcl68',
                detail: 'Aut qui dolores ut provident est accusantium distinctio ea ut. Ea amet ab unde. Alias sunt magnam perferendis maxime sint harum.',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : 'e636b2a9-ee7d-497d-a883-416b32afc714'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e636b2a9-ee7d-497d-a883-416b32afc714'));
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/e636b2a9-ee7d-497d-a883-416b32afc714')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e636b2a9-ee7d-497d-a883-416b32afc714'));
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
                
                id: 'bc1d1f8b-44e9-46eb-8ad3-f9e32f2e866a',
                tenantId: 'd7b7e5ec-531b-431c-8a19-ef3c4a739ad2',
                tenantCode: 'habpsfrlsbua2xmes7mgt2bxjeb98h8g2byx2wv7n7xl7lct39',
                systemId: '953d19aa-c101-4fd8-a976-371a67510c27',
                systemName: 'swaxe5jk70wqevfr72h4',
                executionId: '5673a685-eaa1-4299-afaa-bf310045f93b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 20:31:14',
                executionMonitoringStartAt: '2020-07-24 08:07:23',
                executionMonitoringEndAt: '2020-07-24 08:33:20',
                status: 'STOPPED',
                channelId: '1eac2244-7561-4a10-a986-5beb9c4ba274',
                channelSapId: '8oll2kj1sme3vmpx4yvf9lwsxgma6l3y7o7ais56t4xqn4iiur',
                channelParty: '6bsffgqmqlhr6xyglspzpwz0tefo3yjleuzmfakwhqcpjy4hz2yoaedpyebvzrq3zd1qlabg17g1c8mkwtyt8bla636cgyi7q2agbg29nqqgpwtfqp7gjbiaa2yflwa70cvtldeu2nkgnmyu4k2kuym1ts7dnxq2',
                channelComponent: '0udtxnngiia1exyktyllaguw0p5632wn9ccuu4dmi4xdlzlu9fzax6yys1e19v5fznycxwezmpo9zflhvl146bp3nfa99dg5oyvqydjzruwdjh8v99gdvbqxcp5lspano47asq8rcfr6tehxxrp1wzhm9zzlx85h',
                channelName: 'e8pne7dcbykgtj7zf14btvlt3jgmobd7ka1t8aeex9n1cazif2ccvbksk30rwxlm5rhyiyi2vs3kfw9hwr9k4as7j861is7d1d3tv50fyyc9o7sqap6ytdbqx964xnw0opbk1q3i41qijeumvo6nalp1je7w9jwa',
                detail: 'Ut et repudiandae saepe. Quaerat omnis quasi sit odit provident molestiae qui aperiam quis. Omnis at velit temporibus est. Provident iste sapiente porro autem.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                tenantCode: 'rfavuq1fv820fshxkila67cte3tk3pcjk5a7k08i7k9apeji49',
                systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                systemName: 'bh1u3q6dfu9wsc5y8h1o',
                executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 12:55:57',
                executionMonitoringStartAt: '2020-07-23 18:23:43',
                executionMonitoringEndAt: '2020-07-24 06:42:39',
                status: 'ERROR',
                channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                channelSapId: 'l8jf3hsi8qegybtpoa6fgn6b10uv7pp378dkzkfah6jwpql7e8',
                channelParty: 'o74ou9fg50nl92woniij0osc75vrnr76avni0777c84dtp3sn8lbi3ll1e7wf4yu22ewl32e1aae5y0k8vdybjrdbyxnjluxteuo6uz7j8l81kfu21k4mcvq09cvtiu2puw8kxeqllg72fxzp8j1jwm18x2b0myu',
                channelComponent: 'eg3jgb3anbet215myv788mbam2mwtspqmao5rwpbol4uuw3ajlsqmmp63jk88h0kzqo6zqz3e3e1727c1oub5w4nt5cijdlric9mzfkzjjo6y8apyvylvxovz7p288eo5natovwvrvy7q46ivq6onr81pj0kxpxy',
                channelName: 'ih0q7ufh9xzakzpdfc0v36dfekicbh1l14u6i5073v5jsqxd0xc0m33ztbstdyeqz9wt4wa682l7hcgnarq32ry8h6drtbi02cqpj3nln2ns24urvod6lsievh82aky0bz29s8xq879azvkdc2h8mzzm17sv4827',
                detail: 'Quasi ab autem quam quos ut. Minima ut iste quae. Eum recusandae eum illo porro fugit. Est mollitia reiciendis sed est at voluptas dolor consequatur vel.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e636b2a9-ee7d-497d-a883-416b32afc714'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/e636b2a9-ee7d-497d-a883-416b32afc714')
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
                            channelId
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
                            channelId
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
                        id: 'ad459d24-61e3-43a5-8fc9-92fcfd1064d7',
                        tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                        tenantCode: '1vfakm1myrgr7u6uezc4zhcctns4tsklj6urzfv54xgq2ikdxx',
                        systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                        systemName: 't4oijkpcesgw5jk9yk3o',
                        executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-24 08:20:00',
                        executionMonitoringStartAt: '2020-07-24 02:19:04',
                        executionMonitoringEndAt: '2020-07-24 17:53:44',
                        status: 'ERROR',
                        channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                        channelSapId: 'xrf5970unbvd0xa5i3ibjvbespd3t7fxnmvr5yrawvp25f877o',
                        channelParty: 'ik921ojvqliji4soa6evh9czutaf5oymm13symttj1amyra96a5ezhxz9onbqt3s4496dfmgot9jiptbus3085epe7l2dvguke77eah4ane3j12m5k3183i1eimak483lxjy9isc4fvq4yd9b616t3wuxub5eeo3',
                        channelComponent: 'gk2q862snvkyr4jiby1vrdptujw2qz56585ysnmz51wmdvli9bhzwlzb8vxkonxitib6zxjcu71nruecqgo8ibpo4zni6t50m3oj2xxu4rif1qet68e5ytvk4s9zm7mv85c4lwy2cclrkulc9qbuhcc6rrstguf6',
                        channelName: 'ie1d8y88oje17x3j7xcmn8adzc5ljq5rjuufo9d7a6fiokmpcx7bpc7tmdzzx5bcojuptm8itduvf32jkjlhg05o2ut2dxg4dgk1h53clfiqzfxt552opoe4hlofqtx4qfumgv5qbcsv4rljizzj4mtcx0m8qwux',
                        detail: 'Eligendi dolorum officiis cum quasi nobis nisi voluptates. Et ut nemo. Consequatur accusantium labore vel necessitatibus et ut. Est accusantium eum reprehenderit mollitia. Sit aut accusamus consequatur repudiandae. Qui dolor beatae doloribus.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', 'ad459d24-61e3-43a5-8fc9-92fcfd1064d7');
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
                            channelId
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
                            channelId
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
                            value   : 'e636b2a9-ee7d-497d-a883-416b32afc714'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('e636b2a9-ee7d-497d-a883-416b32afc714');
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
                            channelId
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
                            channelId
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
                    id: 'e636b2a9-ee7d-497d-a883-416b32afc714'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('e636b2a9-ee7d-497d-a883-416b32afc714');
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
                            channelId
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
                            channelId
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
                        
                        id: '721e83a3-cf0d-4faa-bd2e-772820443ad6',
                        tenantId: '0d993691-b84e-4adf-b966-1004f983f5f0',
                        tenantCode: 'h1cows1ofm3md5bwmwqzkrfwqragp7cg5c057srpgunlh9oxso',
                        systemId: 'd7b446ad-3acb-40ae-9be2-1deeadeba8ad',
                        systemName: 'nexdry4aobnt7pqk1bx6',
                        executionId: '030a81f2-c0a0-4106-84fb-563060962d61',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 20:33:09',
                        executionMonitoringStartAt: '2020-07-24 10:41:40',
                        executionMonitoringEndAt: '2020-07-24 06:39:08',
                        status: 'STOPPED',
                        channelId: '0229c0e4-1161-414e-83ae-75ad1cbc1d57',
                        channelSapId: 'kwd8rlqio3h8m3k3wq0g77ko697txhb4fgbllow9ub54bgmwws',
                        channelParty: 'u4ov6r16m5iklmfxn6l89iy5ii33ob0f32sur2g1jgxv4csj1ey8qtynmnrxxhsix6n1k1owrwfn93eypuil9xwt3werhe5n3g58y8iodmv7vqv4fsv2o3arcpojb6w9w7ve63o64j35qmn7nxitzrtgt3gy6y53',
                        channelComponent: 'qsys2pedj6ko6xy8thrt55s4bd4mxabg5gczzpqjlu4cqtlwldzchzjferx8vbe17q7hb7yv5430iyu4wwkv08kitrr7clp5zxbo7e3jrsv870l996ccix9lil3x4hq2rudq1emlnnvnt3ag6tn4jol10r0br1j9',
                        channelName: '01wv7v7clmah8ib5tl6h892f3g8vdcxta8u239qx9fzihts1daig0hukiz1sps7h136sz41nft6ex4tr7iwyviz9zc0uzn4obb35mkc2ymb8wrmpwc3apcku8v7q9usck24etsnpb6950ulvbyyl9eo2s0nmbj0m',
                        detail: 'Doloribus et et temporibus saepe fugit sit exercitationem fuga. Qui et eos ut. Illo architecto ut voluptatum rerum quia est rem. Rerum cumque vero architecto.',
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
                            channelId
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
                        
                        id: 'e636b2a9-ee7d-497d-a883-416b32afc714',
                        tenantId: 'ed0938ec-0d62-439e-86cb-794b0b61e2f2',
                        tenantCode: '3zgzuh12r03c06y2zj95iy78gn6lnchdik83hzupfrke9cscq6',
                        systemId: 'dd23336f-d048-422d-a38c-4c41d9da6581',
                        systemName: 'gjgy2royuccq5a2x04vt',
                        executionId: '1d26e770-ca38-42fb-b0b9-6c173a189292',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-24 02:18:18',
                        executionMonitoringStartAt: '2020-07-24 08:21:27',
                        executionMonitoringEndAt: '2020-07-24 10:21:40',
                        status: 'UNKNOWN',
                        channelId: '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f',
                        channelSapId: 'p7pury1ws4nzvt9f3pmw3y23a0j3m7jqzz312fmacmifckbo0v',
                        channelParty: '24slzvwt61xwyb64ujw7lxlndiskys7oqdi8rbvu7g39z4utetdavvpufoazct1r9yerltu8x2fa13pg0ww72n8nfqbmquqndctqj73hie8wdfh2gxu0znpg9u6sb3lln5r62t0b3wgo78wonjmezlmf0mqz31oa',
                        channelComponent: '8vs7f2img1od2ln96f2qnihf60upjk1fbwpdjhiy8l3hf6yrr0pv83mu2splty6qs345c6w4r99rjoay4t12cax5szitt5pajnmy0pof2dluuphotjhmja9ar31h4gw3xwjuco8pxwma3ckogd3l40t825b4hpk9',
                        channelName: 'a2jk47qvf6rpz4uu28zvn22qzztfh31m5u2mwzogo75rsrkg1c96z01b348tmzgo4d5wu63cyeavxow3f7yklhbm60qwq6szu42979tlyima6jm59mu1ocutoqf1li1im82rjoghcepz6pre39xvh2iinq2o4wib',
                        detail: 'Ratione illum a cumque quod. Ut voluptas sed recusandae expedita ea unde. Cupiditate facere cupiditate dolorum itaque ab facere rerum dolore. Dolorum nostrum ea sequi enim tempora sint alias. Sunt qui autem culpa architecto aliquid consequatur. Incidunt quia inventore cumque consequatur alias.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('e636b2a9-ee7d-497d-a883-416b32afc714');
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
                            channelId
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
                            channelId
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
                    id: 'e636b2a9-ee7d-497d-a883-416b32afc714'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('e636b2a9-ee7d-497d-a883-416b32afc714');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});