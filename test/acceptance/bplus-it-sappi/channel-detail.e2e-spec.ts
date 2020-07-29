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
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'uh9su44ykkelngtmvfmialpqqlc7ni4zr1xtea5we9wgnxx7bl',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'q5x39ji43h879f205rzh',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:28:21',
                executionMonitoringStartAt: '2020-07-28 22:21:15',
                executionMonitoringEndAt: '2020-07-28 21:19:08',
                status: 'ERROR',
                channelHash: '5j4usa3mfytx5677zal0szdg3mlojo4w8yllzswh',
                channelSapId: 'kzisy9l5o75ab4hjdgf3ikui8fh74o0ovk5fltwohnsrqgd95l',
                channelParty: 'hcukv3an6sfvd98egdbisi10th8e4prqlw0sdk09l150u6495rze2dcxlae8yyxo43hdkftwumsuo7yrwhzbfzai87hnwsswvflnhev2f6sp7qnnx4sn902lw31u8hfcppyz0ppd5teyp5prmk7pmq7sm7h3ozv0',
                channelComponent: 'jv2fzulq0kv8njvyrcjvjzzoqbiq6qunv3ha6ou9p1nk7kaedkx4lddrkx0694sgupippi0oil8z3lniynldw6wqdw0hy4zrwod24iu1r3yhenho2firk7zfrul25rzgi9dbj9ke3ouizy9qobod0t0rkk94wi4p',
                channelName: 'whw7om4hc5cxdn8wbj6ie1klef9yhsvhkwpw07v7e8cnw8n2gycp780h6rkno6viu5gj2xtdmarzphm09faoj75m815phlf1hfphocqbcx9hf5fff3044j7bkcz8qpyhzf96poooeprb6je5h6x527n44gyrcyti',
                detail: 'Magni dolor ipsum. Doloremque aut unde quaerat culpa minima voluptatem rerum et. Similique incidunt sit quod. Eos nostrum nulla dolor ex perspiciatis mollitia dicta ut autem.',
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
                
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: '5fgrnl93ccdgvu7dxwdxqyjnm22hhtq2ri9ctyjtubeljzkz13',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: '3v9wxkusauzky5326hld',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:32:53',
                executionMonitoringStartAt: '2020-07-29 03:17:06',
                executionMonitoringEndAt: '2020-07-29 00:08:40',
                status: 'INACTIVE',
                channelHash: '9qnb0pbv50dj9j8anpwqtxqf9n1ksj8u1dpzzcwz',
                channelSapId: '0fjo1coe4du1ihxv2yfaht7g3vvxa9eexjpo7pocyp3ovex4b2',
                channelParty: '0oycj1v8jht8df2y6aoq0q4achsx64kv3bm35qyy4gb44j4bojkkfej0d0mayx0lp3vpww0o6qo1osmuk6y6colxbqoptwxat93d7gaa0h1nxpge5tog55tkkkp2r4bb37m00avguidtuk43ewjz0c5aibtwzdrh',
                channelComponent: 'upg6nju7xkzfws6kwkd1yuc5gyrvv4ck49y4wu8hlnape719cl5d2g0t8thvh7kydmsmuog96rti25gjbi14oqxhc7dvr5ssf04v25yv6tb17lmqhins8uoscrsholbytw52tn326636fdiz5pfz79f8g53futrj',
                channelName: 'c5xip7s8w27xgr215iswtzeof6aahawo3ehmiz5ojtmgqze65sinwg1ujqx3u5eao9gtm42jr0upsqy5zckc37frg5no0bbysppq2fvaxzoda35i94h07wix13p3bq6vxqf8b66xfz5q1fr3s1raz11uh88fwe4d',
                detail: 'Vel dolores fugiat consequuntur. Nihil nobis natus. Ut sequi dignissimos neque sequi illum maiores veniam.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: null,
                tenantCode: 'd8yxwinuxrs2937sjiqj6eo1i0no68jijfhrewtxrbxig072if',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: '5jemyvdr9ebunm4kv5jh',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:04:15',
                executionMonitoringStartAt: '2020-07-29 12:01:39',
                executionMonitoringEndAt: '2020-07-29 02:42:59',
                status: 'STOPPED',
                channelHash: 'edszbks7sx99qnj3nmgntrrtvfpk1ekv6428vmze',
                channelSapId: 'kgoyl2nujx7rrp896okbzt3d0utvms25hbe6gxbx3ragbi49ek',
                channelParty: 'kisy4aphy07dwnf3k17vqevjqqngdyljlo77x7840fl8ibvbq4gvvlsvzmtf2ysluw66iekr9zx5wk5yubrpurj9jgrtbr4v2108czfre46h4prc0is0bj6lhu6bw5ykwv3dw43hskw90uekzf6osqc3qq6h64l2',
                channelComponent: 'xam7u1f5sfjy39fcpk7q8lx7svr6wlmlrvpdsw7juf9mqad455e7ohki7nsujnkb63rh3t47c2ttumx3fu76ud5wsvzxflpuhha0dltivfjw2158ctankrkdf56uih0p216wy8j7hl6sok0oxdj6rjlegy5jsoed',
                channelName: '3cc882fcquawozae7q1f8o54kmkzjfqe4n96o0pow0aj4khy27i1wjiriz70s4tny8zzodwrqcu90htggc4mb7eu714p1q4fyv573phitqwcdas424govg3lobsqmctrjq6o3y6wfujh6izorrdutnuq85xm84nf',
                detail: 'Repellat commodi dolorem cum voluptatum voluptatum dolorum dignissimos non aut. Totam iusto est eos id quis. Magnam est sequi aperiam molestias sunt dignissimos ut et. Quo quae modi inventore facilis cumque ipsum aut eos. Accusamus et quasi deleniti ullam explicabo voluptate. Quis aliquam iusto doloribus dolore.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                
                tenantCode: '795u548qq9x4wbraohokmwfpoojqje4c6hmgw452ul6smx9zer',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: '09ekzujnrduwb61bgn5j',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:59:43',
                executionMonitoringStartAt: '2020-07-29 14:43:44',
                executionMonitoringEndAt: '2020-07-29 08:10:25',
                status: 'UNKNOWN',
                channelHash: 'fujexfoj96g29vpcv246nyycowuchsoo3k0esm65',
                channelSapId: 'xdywdxghmeu23fouiu1p5nj2nc1vui6ufftwm9s2bxy9yvpyiy',
                channelParty: 'lw03ds2hssi3yjl4gpguynn7an6q4xzo342io8i5udg87atuxzgfqxuskwq7cie6psjf8doyyc4r6vdj22xkdctvdvt2pe6omzwtpzbtjmeds0hzd2ke7v9y1cmlexu3kvphf3o56yim54c9uf9zrniv927fbehb',
                channelComponent: '4498s1g7niblp22iy43c9orby9ccvf0ao9rws5i5zwr9ksykrorycetbrqtgayhqc4zxenj1fd8ae9tg1v5209ccs9srx40i2ic8a66ljp3yximc18ftp76zpn9la90aszw78ku6gj9f14jlwxu1rop0d6trokzz',
                channelName: 'zr9ulyfgdioxdeurniq2d5lub01aomoa97klezj6d69eomcgkrqmxv5n0bu1byz90foahq1iz9sxpt4ymc549ugc9xwpt67hphdhjjmnkuvxs6jz67kakdimwdfbbweiw0nkdqkq011uyo7r9jakij6xv25t2sv7',
                detail: 'Quia quae et ipsa quaerat nisi accusantium ipsa. Qui non repellat accusantium quaerat est veniam totam aut nesciunt. Voluptatum repudiandae doloremque molestias nobis.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: null,
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'lqg2j5fdagtzj5d5uqf0',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:14:26',
                executionMonitoringStartAt: '2020-07-29 11:00:38',
                executionMonitoringEndAt: '2020-07-29 00:21:30',
                status: 'INACTIVE',
                channelHash: 'wn3geuqu4uu0pc2n5gb8q1x00q67uls4k00nlgmx',
                channelSapId: '9ewzyx0o48rot0qkqp8pp9i2sw189eiy8b9tjgw27mtpids6lz',
                channelParty: '2zvj91d792au57c6z0j1puu6g219dp7kyfs4zttvvdk8zja7271j3vbf4idj1hhhjbmrfb37hklni665b6b1qpjkc0uh2m4bkhrsd8r831oyouqe9sz7z6iehe5lam8jhiu7u74px8cg0roz4x0jqwyd9oob4nje',
                channelComponent: 'epldj9746k2jvs6juhya8g35vju1j33doy7tqyr1bx8tw17wf6j5ws07zlwov8je50841sqlbv5q0b2gevsd7maz73l79n16ag8drrm8a7qn1ilte32epx7g2ti2yfd40i4vw43tqdowszne4y1uwgcc7q4mus0e',
                channelName: 'z1boxoa44knop90zp0fzr881vxnz17jk5kj8mdzdn04symw4xh0lmpzlqbxbanattyyawe27i3bb5k3phzg595gv6vfty966u5hdxq6vo4cckvd9p2o4ns0ow2bjfe0dzbqtmnbi6xklc1yuhlqo3yj4whkcpcs5',
                detail: 'Consequatur atque eius dolores nostrum in dolores dolorum beatae. Ratione non qui ducimus aliquid. Quia voluptate et et porro expedita corrupti repellendus ratione. Qui et totam nostrum repudiandae vero dolores quod ex. Eaque error quis neque laudantium enim ipsa eaque inventore.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'g3xsycwuz1wdkpbqx22p',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:51:08',
                executionMonitoringStartAt: '2020-07-28 21:42:21',
                executionMonitoringEndAt: '2020-07-29 11:52:36',
                status: 'ERROR',
                channelHash: 'q2gjc2hetd78676i82gkqb39muhrfjdwaejro020',
                channelSapId: 'xu81zase36ay1bp1ww9dj522grkaq2prsxzspusv2921rnc0tc',
                channelParty: 'fncn94syaebqhy8sfszo99b9kzpa612nlgy7kcl5ko5e4skq0lgfm9xqtkpetti3ujoos3lwfstqnbayjj85rag4q0wp1e5lordwjspl6tjoik183030e4t1z59e526x6ycvht5j52ea8cvy67n5mwsk0vhuedul',
                channelComponent: 't1q6seqapilrmmh5ujnkkak75w5y3v3v1y0kqsc23ujmggpa58lkg66d71rxubo5lwd4v2k42sd6mstvwnzuizwnklzuwo0t5szco6mlcm84kn2rkp56sctwfmffhochpzqliintfmo5b8hqh2x91armttieg003',
                channelName: '07853o6insogrxfnbsautgldg73hkoz7ljlu8z5zjail0fmc177vvzja8ps0pc0s4xswwzsz6lo90mh3xklw14j91ljjfv3a2hri2nnsbqo7960ixrxcp8vxzfczetjvk3by9saaezppm4d65sjw6ggqkh21xduv',
                detail: 'Sit dolor autem voluptas laudantium excepturi doloremque delectus. Quia temporibus maxime voluptas et dolore ut voluptates. Suscipit eveniet sunt dolor voluptas nulla assumenda error. Labore dolores eveniet accusamus qui optio sed necessitatibus cupiditate est. In quis sit et nesciunt quo.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: '5eizpqpi5y0z4an3xu52sd4kqya9xu4ow30koyihf7vvxwthlr',
                systemId: null,
                systemName: 'zoss3epyuetgzu1nclz9',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:57:37',
                executionMonitoringStartAt: '2020-07-29 04:04:43',
                executionMonitoringEndAt: '2020-07-28 16:21:21',
                status: 'ERROR',
                channelHash: 'dc2soh2t527w1vq5iv8kakws50dop8ewitiyg18w',
                channelSapId: '5sp2sjypobp3ocjvnlfafaizebcrjktsdtvwn7qtm0lw46ljav',
                channelParty: '1g5tj7ifk1qc6ctekmec6klwfv14isqdjt9l11zeguscw8m479zuvmmd4sl0lz9ljdxtqxxd2dxtxyic2qvyyhbni2nfczefc7ejovnu4br62udqujrpkunxjplrsoruxy8cgc87tk0d0c5wm5mo0q0vuyaudwb1',
                channelComponent: '3emn9ope6bgmwgsqosguikzqvocwnl1jjxyh6ef7r3b50x6nqa42renh6d4fl0ywct4ke9f1lcqszkc2kdc0ab1zcv552lmhcs7j5i9xki6e87jw55rp5hrsg1191lqq23uo867zepb4x8v2f0y080no0obd26g6',
                channelName: 'k690wbjrtvbwhkryf06ebp5t0ksajkp4ab9uxm1mct3dte7xbymc094zpyp5ufes20mapaa873kwjwk9825s4d8vkqox75l59vhqlx8ax2ybu7g938a4bs231mz6f563y9zcbqllqsks6m4jof3vt6n1s6275z7i',
                detail: 'Velit adipisci dolores et laboriosam. Alias illo odio incidunt quo et. Et doloribus omnis architecto ea ad. Qui quisquam provident.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: '1h3wym9qt9igh88qr3usb9n5rl8j2wpwbx1nm2iowgaqj7uaxo',
                
                systemName: 'i574erda8gp70lhyedke',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:21:56',
                executionMonitoringStartAt: '2020-07-29 13:55:28',
                executionMonitoringEndAt: '2020-07-28 16:33:42',
                status: 'INACTIVE',
                channelHash: 'wanaryxcvnpdf6c6e10tihavgzigh1tvmx6xya9a',
                channelSapId: '9ut6rlgq20frpboxyrboxdajobd7kab5p2fp3zyi3ovjwm6i60',
                channelParty: 'pukdkvx47fnmkwtdsk13etm1lwzsrwgwdy7nq43i3nuteljzo5miy9dhjzjzj9s4vulpa2s09vfsd2ymv6t21m2oq1s3g8ag7exeom4mhobttzqxdlppyofygae273cobqwstp5pd1l6sfqmsojlb10g47mv6xdq',
                channelComponent: 'dg1v0d58oc4wjhk2mhu0forhwb8c8vqhjt8hoqhw28mb0kxn2xpcr3cirlcbvd6mulvbbr32j7wvvoktfj5g2u53xlaztr7czap285un0fdb0mc5vuqgv2no7saofafbk1sycctxitchlfs1zjm2hbmuakqad208',
                channelName: '975hwy4gu6783o5ere6gxfbcam3jse865v27oi05tx393mpwk0y75lnbhdmrdkppgi9v1saxc726qd79r237kddged9hk0ykc2vs9jod4zvkvctn6d47mo6ol2ls3abx3x44u7wk41i0zqz6149zertvh1uek729',
                detail: 'Inventore et ea impedit dolorem perspiciatis reiciendis nesciunt placeat laudantium. Voluptates fuga itaque quos dolores a est sit enim ducimus. Ut voluptatem quis voluptas aut nihil provident sit.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'vrjsf4sppwcoioi29ydy5rxfzjashchc8ijh4o36zyvz7mmvvd',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: null,
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:23:41',
                executionMonitoringStartAt: '2020-07-28 20:11:15',
                executionMonitoringEndAt: '2020-07-29 00:00:27',
                status: 'UNREGISTERED',
                channelHash: 'rdrgbv4b4c54kwu562wd1fmqzz291vajfyyzcf55',
                channelSapId: 'mmu4qtdgq05ihm7i1vz743ts7u229uozjdqlx70kn8rpkvrrmj',
                channelParty: 'pzayq0uvotfrmbxiaant4gmhgceutbbxi4gmmh8fp3id2zj6f7m0co3i4ziwli6tasbxbnwwywill475sphnda37thfw6rgbtnimbrrpbggtxhn3bbva5zml53y4liz2mdebgh63h1mtcvf4dmc5kbywxq50swum',
                channelComponent: '7izz3m6zhdnnv5d9sato4rw04oez9msy39n26n7kmvarg9lzbo3ti0vavqr8h18e6nua5ve7iil4v5xmpbzeywr1z5wqxjg4rzpz34as6y2qhviv2nuvefa292c8jsdo40oj80x9fewh4f1ha0gag06zpj1vi5cg',
                channelName: '2sa7cili0djsh5jpya0t42j442chnsp6tnyu9wg5s6i0kluffwgvx84vcxa0k0cilalswkpbmwopi2g8vvk6bcy21lrc4thi8zx1mae81ao2mquys7wftgp7gvc2jqe2e6y2wey0d9tgmji9h1rtnq1cap2f0sg0',
                detail: 'Rerum quia voluptates praesentium dolores velit vel. Nemo quam voluptas enim expedita deserunt assumenda sed sunt dolorum. Architecto accusantium quos et dolor. Non dolor atque eum eum sunt laudantium animi et eum.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'mcogoe161a5dpgwwadlc4747n77mm0m604mvq901c5ywmnun78',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:48:39',
                executionMonitoringStartAt: '2020-07-29 04:35:51',
                executionMonitoringEndAt: '2020-07-29 09:05:26',
                status: 'UNREGISTERED',
                channelHash: 'feyyvpqhll2wmphuq2vzso1j535eenybeu26cxd4',
                channelSapId: 'q1wlqxurgzebg64mmi533lmhcm2pk89cnit3f8y2ilkbq1qbhs',
                channelParty: 'bjsevxo7l740w0y2mzifalh3os6iit9tbzv2u4q41v7kvs489u3b9c8l2hj1zlts2fa2kp8ejif2x3cjft3gq14xzaftggrsnzcvh9a97itwhecy82jckt9nekut3cz03we1ywgn879jvh9zfyy9z9htxh7ofcd4',
                channelComponent: '2epiysw4r1e2e0qkpjuehzf85jowuhkk3kyr2wb3htg1bibr46vkavicd3h5fjmdr469mgyxtwz7jf8tsuvw4fs0kgux1wttbe45og86h4qx42yimpzxl5x0hzbsmqf3ikj5xvdr1oz4ascs1qe6t8el5fi8m21v',
                channelName: 'pgovuow36leq8ewyhxt6ks4o21iiops2mxf5r37hdhhlhs3t9miwlb08yxosb1ejba7cbvx5r9gfrlsb7xqog3qtz1234h0rgrjme9ublrmviymdxdjzhk9rycc2ku0fl506w3utkq4v6cmahnq2csyvahy0ld3y',
                detail: 'Omnis ab quo. Laboriosam reprehenderit minus officia necessitatibus non. Voluptates corporis possimus soluta. Dicta veniam maxime sapiente odit laboriosam ut sint placeat expedita. Minima dolor aut non consequatur tempora blanditiis quaerat atque impedit. Alias necessitatibus voluptas aut aut recusandae odio iure hic occaecati.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'b1m2ifjtljefim84paair0vmbdc9j517r67z5klyws2c1xa2qg',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: '196266izzzbguxv22bc0',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:46:11',
                executionMonitoringStartAt: '2020-07-28 18:54:45',
                executionMonitoringEndAt: '2020-07-29 02:19:55',
                status: 'SUCCESSFUL',
                channelHash: 'ls4mulrspsckj686a4os0e2nv5j9iilsevu9vh27',
                channelSapId: 'kyfjo5ojpslhbi6asmbd2d4sghs87w1p1ktivmayah5rwoc8ps',
                channelParty: 'tdu6elw1z21voax1y0gydaphjdx9wc02b81h439lnxgte65ain7tswfk57otxxvcynh0bm1jnbkcd7uwa29f4n6340tfqcjy5f3rjeapnofndkuz4n0sc68r5v9z1u8asrva3y8twfnv68dysdy18h36ag7ayr8c',
                channelComponent: 'esagxqh0agl019dbtowwzpsw11wngkumnjaaosrw1jhete3ryvkffllgfhpi9foohbo9jmik2k1hexbr3yfnpoiwlf1nonlqpg5wl8sh58wy9gugbw5hkcxsbhv3mkpv9n3aflci07c20v3eu2trd7u7mlzovzvs',
                channelName: 'tp1xl7gvw3l1ja6fjk2oulknxwj4biblgjcq5f3iae5258lx3mp0l6etsn73jjta17qvg7bxvn5ui9bzusc8u7zp2l680a9bg02zcgt2u4x6x8ve0qmwm2kbu1ry7dsy2cyovttkw8dkvdl1os3tph7mk6cfqu1k',
                detail: 'Dicta laudantium maiores nobis et voluptate doloribus. Veritatis voluptatem qui qui dicta reiciendis. Magni nesciunt deserunt aut at nihil deserunt est officiis. Voluptas omnis enim dolores assumenda atque. Culpa totam sit enim error qui. Non est dolores id sit odio quaerat debitis facere.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'a16geubuwihibu37tsbz1dcfsqdg1ii3z6dk2pllbu2ldrvhf5',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'lbgbjpy02j7pg5ypm3ln',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:29:29',
                executionMonitoringStartAt: '2020-07-28 17:20:48',
                executionMonitoringEndAt: '2020-07-28 20:39:59',
                status: 'INACTIVE',
                channelHash: 'ns0ngjhzs59hg09g1xjcadqvy08nlx9vwfenuuip',
                channelSapId: 'u5dm38i7rac4aogk8vb0svur7z8pfkqe2srjb2yqz89lf79alm',
                channelParty: 'vjfo3r0dg9l93q2ygqrc69b8bb0qonvmwhuc0c82yfnzcgye7qcf3nintnx3dpn3gdqaalrlfjgrufo8vt2cppycjoip3fqr1tqe4pgo5ayimgaz3t2zipglakeq9efe66fo3ey9zxbl0ce135obrwepbmcvaqna',
                channelComponent: '34fkcpk9p67rgcnmcl5t2sn81wr6biijnn5zkzpate72rlag1b9q0dhnnmwiaxknmhthtfgwu1w0cxxf9mol8r9akamu3vsrv4pd248l899r8xa56li4bjfw9lwz59d9ccjl8ijalqwke88jqxt3rezqbrhyskuy',
                channelName: 'uy5l9bjvgc0ere5zrdhdjpxhj6kv2b3m32l7aojc52404jzdbciee21xr6q02g0e7sykwruwby6b6ne22ejw1qujx9jeoae2u3egzd8glkd6c6gj0x6ldfrll91wppw8ws2xgxdqinh6j08nl068hgvwn5obkb9t',
                detail: 'Adipisci eum voluptatem amet. Atque neque earum blanditiis ut est quia. Corporis recusandae sit et. Temporibus expedita debitis. Rem sunt laudantium totam eveniet repellendus veniam enim.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'ncvlfoc5wa56eqbcsk6hzr482ctjtxap9qjfjd6vzqy7j2m4kl',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'lponfg9ofsttung90089',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: null,
                executionExecutedAt: '2020-07-29 11:18:42',
                executionMonitoringStartAt: '2020-07-28 19:03:08',
                executionMonitoringEndAt: '2020-07-29 01:10:20',
                status: 'ERROR',
                channelHash: 'oghc8w5fgmtw9m8ugpmhf99yxhjb3zl1hm1acavu',
                channelSapId: 'l0zmfplzi9nfj05wwh91l782af74mngs13wm5a7hhw7o6mppme',
                channelParty: 'lsrsqw46bexfx95fzht5z777vzwqht7xat0j44bxy3msh69ej8ldxmp92pkp6nkyf5h6yvnobe0opnngd7un5v8cwoypg1w36agp2decnvynyebtxza20vro2tgdoe8gqrx53mqzxtp6c0akxz3r3jowb9cy543b',
                channelComponent: '40g2mtzc2ptbnceiq46ysz6rinac14blc6otwu037fgmrn1z4juwsm8va362p8zzmuv9ngpxfu56e6hk3ad6asmwi23kfe1lskkus7pchctkis81q3f3ntlk1q540qsrpabm4s6w1lk7p9gzp4i84apqfuhhoovc',
                channelName: '9jn24oby3k30hg800gw1d4h3kxc9f1n6k2yjjwhgycf85h0d632rmm1eijgp6rucwqc61ry64e3505vgfnwxn3ksh2qoh0psuft6o6ko1h3of63w6xc06wjsl5m808qlz6kn82mdc4kpyzksxvdi7ss2t8m5x3ld',
                detail: 'Quidem quia ut laboriosam aut. Odit quia quos aut quia laboriosam assumenda ut suscipit. Deleniti dolorem laborum eos reprehenderit commodi. Ducimus qui omnis consectetur ipsam laudantium reprehenderit. Vel porro vel alias enim qui assumenda maxime recusandae. Sit sequi atque.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: '7wnk14xafkcyod0kv3yphqqnfar6twx1s6ocfb6134shhocjm2',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'fyjunq4fu0ke3zqb7tu3',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                
                executionExecutedAt: '2020-07-28 16:27:58',
                executionMonitoringStartAt: '2020-07-28 21:02:38',
                executionMonitoringEndAt: '2020-07-28 19:29:54',
                status: 'UNKNOWN',
                channelHash: 'qsgjkiajme6mrn6p9rhej7q930c8nv3suftk0xsj',
                channelSapId: '35xzadpepakjpk2krn87pnpk5e1dm0z5hlc56lo15760y7a5c9',
                channelParty: '926tmd2mi63d3urafrnwk6lbe5ownox960yijjgmy50t63l1gqlctd8720j62jrtqjprp5hlhjd79lyq1sdg0t9yrng2s3i8tt77zi93qrmqahmffsfufeymiq4anm4k24yigz9phm43nz957n4cssuj4pzwnnyh',
                channelComponent: '1tf0xacvqaorwj3g2d1jnze1z3kyyxd96yqt58hq6gu250gzgym6xbxawjqf6jque58x58f2mrds5748yhwwploix9obfcb95ljoyk5xvi90ug3do912noicl2r3nym2wunlh19fv7fjint32fijrg72e5jov7km',
                channelName: 'ct60jr7oqp8kezkftz022a5kec4910j8z6zzeb012p3isa54dmrktstezxnn8t4wdki5xc1a6nafq93gvlex01mgr2gorm3edfebo87vnasy3b84xfm8v6czbgjjh07u3e1a5kg9cie14jmj9e3y3qwfq10vqau0',
                detail: 'Quisquam alias quos nemo velit quibusdam in voluptatibus. Quia dolores molestiae non perspiciatis officiis quae et et. Ducimus quibusdam cum velit consequuntur totam sunt deleniti quod. Asperiores sunt qui. Minus et rem voluptatem maxime deserunt totam in sequi eum.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: '7v63dhipeblswr93o92foapglodwngwssquiautzw37c1435nv',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: '62wj63peab2feuo9pf63',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 02:17:02',
                executionMonitoringEndAt: '2020-07-29 00:38:31',
                status: 'UNREGISTERED',
                channelHash: 'jwm7yk0x3gx9lkajg8h185jnh9opkhi8g3vrs4me',
                channelSapId: '0nhiubc1sphlolck9sie8mnggn5rljnez7wka4aq8fwj3bf077',
                channelParty: 'ovmvkc74ly3p965qscgkqy462el20w5w3v2036i1t85tuo84hlwumcbyzarl09xxfxf7xv4z4i0nnl9wen9ablqzwdtfwiya5jtn71i6ptkrpicuaipxscxrwufqv3q6tgk7e0o8098jt0znsh5earsb1zlc0di4',
                channelComponent: 't5u1cljhhoku0bdiwscbgzpc8enhrwumgpzg4ozd4kz31pulmukqydjk9kx17gmnuexa7bs42i6tnryf5uw3u9p5etcq1f9omgyzmq228t5uqrx2exo9opj141z8kkqv5kq9qgtnhx2vwl434isp3iez5qvgfk4w',
                channelName: 'wc5rht9afbuqg0vt7wg4j75i942y3lvsm1xhh8gatqk874c10h2x08usjwalt8evl7964jnsykrh3likj845pplm5fawfau5ihztdcsiptvoc6y00nzyrmjxhef2gb9nhf6wmpwlnfhe9aij5w8pb2wpfkddwjqt',
                detail: 'Ipsam debitis dolores sequi neque ut qui non. Rerum nostrum necessitatibus molestias et similique. Qui ad optio ullam non quo eos. Est laboriosam dicta sint quia exercitationem dolore non. Qui iusto maxime non nihil quisquam. Iusto asperiores recusandae aperiam.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'p7elggg9cve8hurz5fctuxxhr857745b1bsdu5r5w0sibs461u',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: '4ue4thhlpk8axs1cx2d6',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-28 19:02:28',
                executionMonitoringEndAt: '2020-07-28 18:33:09',
                status: 'SUCCESSFUL',
                channelHash: 'bs0kr6t3p01lmy4dcchltx6jz7y89rgyyn4gw300',
                channelSapId: 'ouepdpl55jsitywdlk6rrzctlrldq123ep8u2cpkvuz5ylmxvl',
                channelParty: 'ct4ukzon5y7gxlimgu3dfxiv7vjd8lg23y1df000z7ncge4i63um83aq6ov4g5eu78suoltdkpntyb9y00ngbew41mbbkq37tvd7hcq68sw6r901wwjn7dpbib9ueyt0268sajvgxyrh6z1c0n1u25g34d9heryl',
                channelComponent: 'x5c533cfqxfsu60thnr5jxw8t6jbh1x020c479bdm3ldesndiyuhv8lljxpq07w23lbvk04hoyzvr1hlop7q86pfnhbn8w82qred5yygzj0x3jcoxigm3ku45cv6l0vvwpr90yff7wmnqmopysah6opujnys58cr',
                channelName: 'en1md4lmhwycwwinbkdemm7dtp62q297nc8npb8zez2ncmyldz3nroiuwzu6kw7mzfcux4hlbnfj6ep2ver9uamzqx190b87fz188usa8ykijvqiaojb9tpivou3iaka2iji0s2c39twiq14rd16zvwqbrp7sj4p',
                detail: 'Ratione dolor sed libero iure veniam vel dolorum quo facere. Dolore ut aliquam et impedit facere impedit sed deserunt. Sunt et dolor facilis repellendus molestias laudantium. Ut autem et iste praesentium. Ea laudantium et temporibus ex aliquam iure veritatis pariatur eum.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: '3aumoclm9sy99slba2ckkufowunfzkn4r2b0axxu07mmhbvvyz',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'y7t2qoetyb60bmbis2nd',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:19:10',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 18:59:11',
                status: 'ERROR',
                channelHash: 'hpby1x3lt1hxcok94a0xkhtd570ocdldhqmjs8u6',
                channelSapId: 'f73njhlrvy6f4yvnvzzpkrpr9a79a9tmi43h7sh36hc49zgp0i',
                channelParty: 'zyoxo8phjikrb4tnthozxrjvj4w4m8wpb9xft9hl2toqw6jej44xxs94w6x3s81urt9om4pe9emojp0s8snt4gv6g62qorcqr063nmin006ebhl6bnmsp1htggd29uvtt17jp2tzedgmnxo72q0vicqmcx4nhaa7',
                channelComponent: 'xw581e2u1j2iehlfe0fsr19egixr9faiai6981tkcd6dv9zfbls32d3uutdpoet8slwtqo2decaooc33j41kl2rjlzbzztxvar4tu1q27m23lzx2ikbpxrf583rk9qdhrdh1kfllviww4awv7vj4esnwv835k2lh',
                channelName: 'qaolwai822mzv61t182q67tnvh2bumdyjj8ue9f2jxk0wt5ugpxyiqjc2jabruds5643j6iddj4t4tty64wnqgsubics9bt52njzlvnl5g4tlslmla52yjsfln1boc0ldec5v8jzoej42jf267nhafhla137pm0w',
                detail: 'Enim assumenda libero placeat aut voluptatibus. Alias veniam eaque sed voluptatem qui dolores. Enim ducimus eos amet sint ut consequatur autem et hic. Molestias in dolor.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'jznshe9dimeineqw7uekhyd0jzs9jymwuc5s1oxqwx2lixzxsq',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'l46jw5egmcjt45wfmjj6',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:34:37',
                
                executionMonitoringEndAt: '2020-07-28 23:34:27',
                status: 'UNREGISTERED',
                channelHash: 'ghgzxtyxd90fwi7vvttacfimr1wnq3amu21sbzkc',
                channelSapId: 'czb8izvx7xvi6dwmdp6zk2styar2z9wafw8xdqfdo5ypza6qgz',
                channelParty: 'w50nvp461kplvjvks64259ggwsznt0qzfed6i41ee3k1nm26zumgbzza3a6tkxh0ws2w7aya341ikv43io7wobsfyefyr9qdp0imfxmmxfz7ouptz1qoidadpfggx3p4voi3jynvct30qdzdembxks5hg1529s94',
                channelComponent: 'tb5acs9fzhqflof9da216w3w18da6lwqn05cr69hav6wj0xpz05ig7a75yc8nwx1895cbfcesiiiv4mw96k9ky99s3etikg6q5gdi5809womph9nk4ddph7xwwy7r251huj2uzq7d7gjlqhv1lwu57t5ebzo9cff',
                channelName: 'xybza15laxqe25sncveuypxyz5q1aufu7480yihtc19lisahnmqu3hbrub5ywjvl1avo49jgia7r8jr7y8snw2l8cbyiago3uzlbsadtppqvy4357d8ib1fnszugb5s44k90bhc8phctnd8sc687sufb2r17fq2d',
                detail: 'Recusandae aut dolore non cum adipisci rerum quibusdam. Sunt dolorum quibusdam molestiae aut consequatur. Ad incidunt consequuntur itaque. Aliquid quas non officia repellat mollitia sunt.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: '8kw49gzwvbg9g5mwzbruqjemzklxta0lidgzxo0ef9cet5mebe',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'a7bju66zlce8rh4pccmv',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:47:31',
                executionMonitoringStartAt: '2020-07-28 23:36:05',
                executionMonitoringEndAt: null,
                status: 'INACTIVE',
                channelHash: 'd0sx00fmdjc3s4rvvz1q6p89c1p5j3rrgrclfnbn',
                channelSapId: 'pd891ga0rclv4xgj2xb9f6oj1asavn3nhi5kvzo0rugw92jfs9',
                channelParty: '9l3q6qwzr2cs5e2xd2yu0eqdt7osf3edo90eumtftqcyq2kjkhwm040jedykp4fckvkivylyxfrnjx8fwslof2zc9fp8d5hknxaamau566b8s96m6tp93sfwknhivz0bn14vkrs3zfb23ch63isi9ci44kztp89n',
                channelComponent: '9q8xxo034nti1wgn3apnxzr6pmvvq3fnsf0zuamg72ytxaoki9u0oz7ai1pou8a9nypah9q3g7yw4e7k79fd4qqus5ft4r9m1xp0ol1lbiml5b6v9g4h7xp05qo33ybpey5e266j3iqlyew0fk7c7vwqpupp01ij',
                channelName: 'tgomx7hoz9j1cumovz9ko9wmujz53gaf6xbrqwyvzbt4o5lrvbk3nevfi5yxwt55bak4asto5lrelux89t8q44te6anbhk0pwuoglq7pqs7gt1cavwm3horcpwyqniiw3l0vtt591b6uzqw1j2p6oz2uo66augg2',
                detail: 'Veritatis nobis ducimus qui aliquid est. Cupiditate doloremque aliquam labore vero eius inventore fugit laudantium. Libero debitis corrupti. Consectetur omnis quidem est inventore officia perspiciatis vel. Voluptatem nihil illo et aut assumenda.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: '9ng70jyel3o1t2jcdlbzh3iu7j4dvb7dtt5ypopek2n1g1722j',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'k5znpack3nyevhol5h5u',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:45:53',
                executionMonitoringStartAt: '2020-07-29 05:07:04',
                
                status: 'SUCCESSFUL',
                channelHash: 'pi4pt8sx54k3njgqd44wenf6k9hbn0jdn5eg2k7j',
                channelSapId: '2h6bmohcwwsbbrkf3obpabsjavlkm5ielkkxwczmaps7zxar71',
                channelParty: 'mdtr7ds54yga0proow58atmx2ohgapxyxrr69z574v320mo23giji577if1rz5s7t8vqx9m9so7kf9es8w4xsgs8w2zjull0k0ixqplt51bc8371w3lhqlgfap8u22pg38q8bqiqzrh31wfwm7amhlqzwm51kpor',
                channelComponent: 'clcube1ukwuy5osnn9b0h15ytj8850tpwcczwsew3rb3q5f3efmnf5vn7mmml24t4wwe35b5p1gygz6g6x76evgstjps8ey1rhncdafvjpvnesjsa4a895wqyzbj2kgkrw0z53nw3x5mgc15gf2ecyhoiah6ptu4',
                channelName: '0vwfme4n0exnyhbr5ck425cqi1fjdp8sur6xcuj3276ul40eg6u34d64p7ieuog7ykuhf0g9buyo1syhqbnijtm96x46a6nu3wm4j34qpdet6pdo5ln2bu3mqbzu491u5tpjm4jg6ndtnunuuy3jjlmyblbnrozg',
                detail: 'Incidunt laudantium incidunt ut aut rerum ut amet. Rerum eligendi illum illum nemo. Modi iste doloremque. Rem aut voluptatem.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'u81ov070vljvxo0vlvnhvqg3h1git7vszpb281zgkoaxkkjozt',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'tbli22demj9bj3zr4zx0',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:55:09',
                executionMonitoringStartAt: '2020-07-29 15:46:27',
                executionMonitoringEndAt: '2020-07-29 15:40:57',
                status: null,
                channelHash: '05upz058ao2doojpdmps7h4zmuxmfuj128x1drno',
                channelSapId: '15e7ifhzth8si2z2vj2d6e5v8rdjvj8vubtlhkoohnf5t20dpf',
                channelParty: 'zg5cmdiwvkhlzeeuqkgcofmj6f029e5abezgarmxtdu4ixr9gaskgxfzfx2rgdzpv05bdg90k2l3qiyv9nl3vsvhjyqcy889rtd9y0qudk82q3qffeyk9ej84yjzpxw18gee7hmlte9yx33v6j128dcd3oxvq4k2',
                channelComponent: 'xaf3dhnchq7yapg639io0csvt9smjobr4ri6hm05x6rf5wv2e40niua4g0uf80u0xpssn6m9b7j712zl71awxteu2pqs4tnexgzjfuljh99djjxuvr06sfi7tru8qztzscaiar2v2ylzw2jeh7nrw3dcum138rx4',
                channelName: 'kcnlzffcvoi3ixrpbykej54tcpiqbne8wfp8ll81g87wvn9rljdaky3vyl6qpsmxeh8638g5hyzldsxohkpdslpfg5m6hlbbdzqtwadwl5ohm1v5r0shlzgm3gmtbmmkhb11yct8p5zj8ecz9p33ptfbph3u5qyp',
                detail: 'Error voluptatem quo accusantium qui sunt facere illum totam. Id expedita non facere perspiciatis qui delectus non tempore. Similique voluptatem libero. Pariatur necessitatibus amet voluptatibus aut velit quam unde dignissimos iste. Enim explicabo voluptatibus voluptatum.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'z2izaviolzhqzp7yc8nq8olem580f8a6uawsugiwz19of41gkp',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: '5ywjthv4bgetg6uljw0g',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:57:25',
                executionMonitoringStartAt: '2020-07-29 14:54:45',
                executionMonitoringEndAt: '2020-07-29 10:10:52',
                
                channelHash: 'ty7443w788z1p7patbc3mxx1me2ecajkaes0bvik',
                channelSapId: 'za8idfitsdm6nioa15ejimznflz80mdrh4ina0fspzf5vh551i',
                channelParty: 'y1qoqhwvtgdnklx3ahh9dqhxgbulrogivxfmaglojxyyc1hpat4zhz4r9eh3ca3r7rh45k4jek1pnp2emo9hyud0134blynqw8ronkj0syfe2yso93sexlrk369vafs9uvgmuvrja8ihecab0bmwjppk75a58qbl',
                channelComponent: 'r24f05kilkygmzr8mlv70gyf3xp9ab52yyrut053j6llc72351og0bmlsekzt63g404d8hnjwukrl2c1a12tlikyh49iguajipwxgh9oy744lqc8wuj6kinrgvij3hsbkjuxrv5s9ffkxahy4mtg8bk3dc7d9l4h',
                channelName: 'jrgwupn8m0ebx45s5svmlso2wshd1v237g1f0h5ywhjhzmm62az7jrvu238t1zdk45p4ea151ljidzhyqbphveegl5hvnz6j1meavb4ztmvfjxe7zy14eiqn0o895j98au3ixkqqacinyqif4jp358up2ww0nzg6',
                detail: 'Ut ex asperiores. Dolor ducimus laborum corporis nulla. Et a est. Cupiditate ut nostrum repudiandae quis eaque quasi sunt cum.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'vqnmiujvxdppznpgozw91v68jco41il1zww60ia865y2esyhzh',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'qa58bwtmqz93v21jawqv',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:27:19',
                executionMonitoringStartAt: '2020-07-29 08:07:20',
                executionMonitoringEndAt: '2020-07-28 19:25:00',
                status: 'UNKNOWN',
                channelHash: null,
                channelSapId: 'xah44hxfbu5ylqfq7t4sy2dmmzrzwkawqkwostkeq8q29vn2w0',
                channelParty: 'dqyxzalb6lu11skv0t53026otrci1if8xtubt98vr20uridev2wu4z5engu5ymb07htdra5d4uqoa4t2p60qlu6kgmg4qalndezg851kp79z3dx49xjmtxywtvc8zx3ra33bwpp6lirwv9cm4ga8z9gtt5qnc645',
                channelComponent: '7ss3yshclmwrm36b6fr1womjkgw0wep3uc7ntljwgytyr1gacyewflbw66qqqspfuxauo0bljp6i7v11x572d8wy2xk1tpyslr66ihd8i22negevq0gzro1l8rioeoj5bxfopd118pm3p19qqh8inory3vqllr4q',
                channelName: 'ng8thfnfkbt5lavimxj884ch50w3xm86zzs4n98t9ju8xxexfg5i0gpa1aw05dpdgp6jldzdlpxx5q71kodhu6kq9a28i2me98usf826fcu5qz1e3qd0n0kfmki2xji6754cxi3qdoizgzlpfcv9g0n0b0uvjz0c',
                detail: 'Natus alias amet eius ut error dolorem totam. Totam similique non quia maxime. Temporibus ullam esse enim rerum earum non. Nam ut odio aliquam dolorem sunt ad magnam recusandae deserunt. Recusandae consequuntur inventore aperiam ea excepturi. Reprehenderit eum nesciunt et omnis porro omnis blanditiis fugit.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'kcvwfgddgdjiakpe0z55jn8dcoup6brnzf5j3pz7mv71xezy5u',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'w7ezm9qn14bh8ot1mq93',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:50:22',
                executionMonitoringStartAt: '2020-07-29 11:15:58',
                executionMonitoringEndAt: '2020-07-29 04:07:05',
                status: 'ERROR',
                
                channelSapId: '5omtnl7tc7g0r90q6wxsn28i7buadxd6lvgwo56s6tnsne5nyw',
                channelParty: 'mwn9miyhe1c00us5h2g05ppmz4zx14fkuz3nqnhw1qiuge11wpgay4k2pavfeh6m8rq14madzisntigps8uq3sak42cysdhgiw1w1kxoztzuna3v3qbhreusvi21ivlsvink11q9zwtboh5kes88d91tc3x3642e',
                channelComponent: '5k8p2m0rbpwqat0a4bxcgq7pcfcapr83k5p3utz5nubz4m89x1a9k4whcbuboc550yx2fka2hq133g5bhpjp6x3phz8fc7yldrdaeq4uq8g1ypacn5vz5t81ht5awyne88tlz2yjil0z8hdqe3kd4wjsguwcyjbc',
                channelName: 'bbatnz19qtiz95d2fqu7astz0p8chnnr8dmzs3vfzvue064o8871zi2xe5acq3zzegh6qwse1vjh6pbp9zzph9nbptw5uh7ctlbhyme8h8bqp5u353wz3zvsctyz66zldp7mbfj75hnufabycvmph41b51mwn1tg',
                detail: 'Consequatur et officiis ipsum est. Aut eaque ut ipsa. Et voluptatem nostrum explicabo excepturi velit sit optio. Rerum delectus id. Iure nulla cum neque vero.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'njl9b0qc9szandjogrromxobwm7fz4f44co0unuy9w39o7couz',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'xim6ncfnx8sfexybs93z',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:42:25',
                executionMonitoringStartAt: '2020-07-28 21:04:46',
                executionMonitoringEndAt: '2020-07-28 20:04:02',
                status: 'ERROR',
                channelHash: 'q156adpar619sbak5aa2a3luwlgno5m439yb9ex9',
                channelSapId: null,
                channelParty: 'o5rr3tdl64lsyi91trcac4441ead5f05vqe7mitgfvtzajx0dzjg47nsjnufft0xe6dmgjzgf4d9hpsustdtdwqjr1dnamm9ye0xg3xwv9rkjnpmpmjt4qh2c7oos9a85l3ygqkw4kemv3tivt7eoscfifqrua9b',
                channelComponent: 'xjlwbpjdcos0i3v9xky9mri3yzpcb3d8271od9eq11ict38oxuxttmxssyw85oav0ifl89erh6j45b0j2idakwinfv9ujyg68epoe0q1n4cxcmtxcf6tm9q79hlbd5g0zdj5hhdmxleftqngdqoceaemoulvdny2',
                channelName: 'hrq8p679krdkxy5af6tudo8ggblx8e7oy8vadxbiaaskqc3q8dnfwfonk8x0zdzwkpquotne928pgyjbp08hha711g7u8tyyr1ifpqxp3qiozlga9rog050golyet6idonq3sn73tj8vycfsuvar385cnfax775h',
                detail: 'Aliquam fuga repudiandae magni quam. Aspernatur dolorem error dolores esse culpa. Dolores distinctio fugiat qui consectetur atque voluptas. Voluptas ipsum numquam atque ipsam eius ipsum soluta rerum aspernatur.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'j54rq1eg131yobovdnwppsx19l3azbukjkn09u1t40c3pev4yh',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'm99nief0hm8i3febech5',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:12:17',
                executionMonitoringStartAt: '2020-07-29 08:07:41',
                executionMonitoringEndAt: '2020-07-29 11:18:41',
                status: 'UNKNOWN',
                channelHash: '245ng7s6edtn0cbekcagtuhafk076ug6ob5v35wn',
                
                channelParty: 'jk90axwh8yfiggjs0xh0r66q31i9irhhoavqhwidvdo58tj4l3z83jutnmatwlsvolw2yvglp2vzmhkjxq0m4qfr0hhyyhwu1m73vmp3m1m5uqktfr9d2gdelna8kaqsadqc6ph25gfjzheizwsi0202fcld0v1v',
                channelComponent: '1j2cokvnn1elxmn3so8tqk0466nmry31ri52b5u240drooo8cx9vlfstav1fgui9hmutkvlhm4shxt91nz4jqymky6qu59piqq3l9arbjgernuskb9wzbt3nhf22bhuk08659rhn0kl22d7v7zsihqy0v1rma2oj',
                channelName: '5stp3xsld3pypzptifec1e4qoexh008rxv70upssz9c7i6uurbul2cp6pv24z9bdknoge3s9d4weyirkk6gcus3kfhnwod2ru6t37io39l3mq09d2v91x2rdn2n1jfsggdwjj769mazx2xzsqem9ifa6an97bzch',
                detail: 'Qui saepe voluptatum rerum rerum eum. Beatae consequatur accusantium laborum officia explicabo quis minima cupiditate. Laborum ullam impedit ipsa ratione. Perferendis sit libero necessitatibus incidunt hic cum. Eveniet suscipit voluptas est cum suscipit reprehenderit. Sit iste a minima reprehenderit maiores.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'xokhk1lip5db65dlf0dphru47cectl6lyk55ldq3ap0t53ycfc',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'nin96heigfdyisihlboz',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:21:05',
                executionMonitoringStartAt: '2020-07-29 02:21:30',
                executionMonitoringEndAt: '2020-07-29 12:08:23',
                status: 'UNKNOWN',
                channelHash: 'onfkodbiwk9l7dd9sp93851wl7hcgglfgr9u0abw',
                channelSapId: '85g6iknoby5fkplx6pgd4z1sj8m7kqtez34cu6dtna4zr43ffg',
                channelParty: '5ylv5wnz0s5fy46wfax7tjphsmvkj4y4nk2ks0qxsvqggp2cqkke0mnn68hmx561ua92w5ifgs9sfwk6uvofr4vjpx46kyjbb063zkbmz2nwd6llscmjcw8z2i86s6fh8bpkvitwrznniu564c01oiukii4sw5by',
                channelComponent: null,
                channelName: '6o9x6d2efhpokjmhuuk86vq4m7s176ebreor04mb2unxjqy7f2h3ywp9ttec679b7ezuff1t8rg5fkpzbzwxuxaoe4n8rjryy4kr6reolef3n8hunymutfhtibyopr8h7m5ymqpuode7a1qxtm3ey9bcmsbn4s4g',
                detail: 'Porro sit rem rem sit maiores id. Vitae doloremque veniam. Eos velit autem sed optio quia cum soluta. Consequuntur ea eum. Dolorem maxime vitae molestiae quo eos.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'h8qj84i6jb7yl4gfb13lchhsxkhlv5w1u5yjtmt9nh6i8hvfpp',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'uriqyi28xflzne3meco3',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:12:20',
                executionMonitoringStartAt: '2020-07-28 22:23:48',
                executionMonitoringEndAt: '2020-07-28 18:10:27',
                status: 'INACTIVE',
                channelHash: 'hhuuk593mgveamo5ksylo2y1nbsvphfjbd3n5syr',
                channelSapId: 'gpr2obsck725rwric26cs1eqn2kj5d60046qdwjsslfoqpwtw3',
                channelParty: 'posgnbl710grns84pgcexwoo2o1h0e09f1y65uj3zyxr9gldg3i0xbk595vges9gmkuc09bupezj5e44lvvcx9x3ap7gd58dxd567uoyhpsbygqa1xzitj9qerh0gs7ryqi7gqp6sksim0geb0muxztsjiihyotn',
                
                channelName: '57cc16l18q86ot3hbml1t4kqbuilfxq0enprakaoappdt8u70nel41kjpnjknte96czar7fmjo89q4xhro0zo7akkmpi3m3pn8yud860dtwmyfgqe9j8ep9hshpnu83h9g7l6rfecubjclilukbn6i91uun153qo',
                detail: 'Voluptatem provident molestiae minima non quibusdam consequatur mollitia rerum. Voluptatem labore et doloribus autem. Quae quis vitae.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'rtawtttgl257yo5ecfin570ot19qfbfkwfwyeul2lc92u0d92o',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'b9gu05srlp5fz9bpdz9w',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:07:03',
                executionMonitoringStartAt: '2020-07-29 00:03:31',
                executionMonitoringEndAt: '2020-07-28 20:46:26',
                status: 'INACTIVE',
                channelHash: '6bqixko786qnaqd4q28lgohlcq27qnx116k10vk9',
                channelSapId: 'l1eq24snnz609mgkdcaqmj3bahwcr1zwqa0nvc6s39hdfz9981',
                channelParty: '7g2me8mudzqcofum4zjsrq845mse8o44nvet3swmeiapz0v2uf3hksiufeyfxnot0pzmnmtdk5pl0hesj5kpnfwglpwng55v75jqza8mgdykfokx1y0l51hyz09d19qnkmdm8covquexoz0gmvsnbq5i7pdsm2s0',
                channelComponent: 'exx00fnv6n5psi13tdlpek7meo5w96cjqlpajwmt1w9flc6ed1rnsl4j9fxekok0vilcp6vrx2kxcocczfkqjk6d8l1b18y34jhn4o7prj69zw798nn7f2zssibpjpyxo43lnt4fmmojdo10ggezyz6h9n359h4l',
                channelName: null,
                detail: 'Doloribus quam est qui qui qui nisi. Sint accusantium voluptas deleniti sint impedit perspiciatis aperiam voluptatem et. At reiciendis iusto quod et sunt vitae dolorem voluptate. Aut unde ratione veritatis. Iste quidem harum.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'vvuqa0gcyh3pzh2sx005eqpodqgi24ci4w95u70z6nmnpwdkcg',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 's3wo4lqbo0ywsyrc7xhq',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:50:40',
                executionMonitoringStartAt: '2020-07-29 14:49:12',
                executionMonitoringEndAt: '2020-07-29 13:55:43',
                status: 'STOPPED',
                channelHash: 'yv0bv0h6m7jtruarsiwltxrk8c0rwpd4hcrav4m2',
                channelSapId: '6zn6osskli62q1pv3w5maw8x96hkiqpdipwfgd8uhopmqjne9m',
                channelParty: 'fwzr7612b09lkkt62cmldpxu4yc7tekuhgtty6mxd9ohtthihnh5op8iwegl05btt42q9mxmqigm48ut50hf0ble6taqfl0kjyc3prfzbdesam1u8l9de7pytwbi0r1b3k9loxiaa9q8riig40pqn8hw0piwej4p',
                channelComponent: '92qou6wy58s8mcdmtrv0ycpfz4swx9xmjrdokkhza5rw2xo6hkybt52zp0mtqqmaqtbb4n42xpdkhclndsph9snw6nmkmt4p81dai82b7gg2f4ladgj4i63xogq8epqkggs9xuporgtxmoseq8w9arhvqo8tkuy2',
                
                detail: 'Accusantium ab natus. Quis magni quia labore. Eum quia fuga at aut vero. Excepturi omnis saepe soluta aperiam aut quas perferendis non. Aut ut sequi repellendus tempore et excepturi reiciendis at. Et aut quia illo debitis.',
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
                id: 'trqvcyimzkvpua21eaxayu8hhypv0bp9dnxdy',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: '63x3h4v0snviijg864ikiyorvwj1aro8lwrsrkhnytuj5l79ja',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'r6f0txbi30esfwgbqudc',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:45:28',
                executionMonitoringStartAt: '2020-07-29 06:22:06',
                executionMonitoringEndAt: '2020-07-28 18:42:17',
                status: 'SUCCESSFUL',
                channelHash: '2jeqmme0x64svrjmhk03cpes0h30rmsn92qd9wqs',
                channelSapId: 'mknk1k3b5ol55ecdi4rhifuxx1m7qpkrp8bnmoxmrvonnezsxd',
                channelParty: 'ni79a2te6agylzv03rqvv56nvax032o22fmgtvcsil8zo4vguicqnhudyfg16f4uxgw7w2erdxyji4g67gb3fbmxso72atotcupfbj3vd36yi34ifhkljlrffn1lq7i20t8p1pjeaa26ra9of0rxe7r2umjbp82y',
                channelComponent: 'lsr1h5slftppz5hz7z3qg4iha57a6bydmu6ldctiv5z63fowyz978p71th5r0agijn74bj4m6ymudega6syz9oedlwd6clg8o8zu51ct7robhhwj4h244ed070mfzd2s7flj1teguzvyly18pq6toe25ex0nc579',
                channelName: 'ownh975u051myb3w6iczyouek971lnw41vy8yoycam0qp4qmnaxwk7wlrrdce52ddbfcskiivc1wk5lfm4h7k8izb4wdievb1jqx9fuvua828wmbpfl6azahr1it0nckmtjo937u7qyoue51l753syqxe54vyzfr',
                detail: 'Nam praesentium tempore explicabo iure aut asperiores fugiat. Et dolor quia eveniet totam. Iste aut at nisi sit illum consequatur omnis sit. Magnam itaque voluptatum facere cumque voluptatum quo rerum nam. Corrupti aut voluptatem. Quibusdam impedit sed sunt et.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'tbx69ioqv2dl35p3vxhkzivn353pnh8nzwzww',
                tenantCode: '7pmt08c642qpe2rkbxk3jtjocu1sx9thx40nhxw5vgxm7n1i6h',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: '4nkd7jzdxq1djztzsibo',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:12:55',
                executionMonitoringStartAt: '2020-07-28 19:27:34',
                executionMonitoringEndAt: '2020-07-29 00:25:16',
                status: 'ERROR',
                channelHash: '5y4xqcjxy9amno67w7ua46do1217htqgbkuvxmep',
                channelSapId: 'ibji6z4cusbx8c924s1dtprcjyahs1vpe9z88a8pkc3umf334j',
                channelParty: 'jwp8uowbtsyym3o13paioiw0z76dbh0yfry9io7n1m46z2aa158tn6476rsmx67x5jlfobfbd7xj0d5bsrl6xfqmf0w15s6mu5gqvj3h23eh4xwh9v0d6wdyy2dv6fva8snvyi4c0pineqspeny101kfyp2o10it',
                channelComponent: 'dwhbjslgnpeai0b29k4flnlg25ur9r57kl7xpc6hyz3fm2jxu47nzhyyp4f4g00y4iy5n4z22rrpf7moiuhyt4yg3wapefyqnu164tc1umhe3hc6040hnbadfv26zto5leq1s75cufsstc7u77ybuhffaqeptcvi',
                channelName: 'nw20m885lud0s26xbn6ffyi3h7x7nmert7l18qcs8rtpn1plmggu7xrtzhzx6gp9s8b5eajmffyx6et7r5tccns0qczrlxbsk6lhcqc0o9gjgn4pah118hentyzuzmv3guoaihcz3igu3bnhl0v59ojrbmpuaazm',
                detail: 'Qui illum ratione laudantium cum repellat id ut. Perferendis expedita nulla sequi dicta eius inventore consequatur excepturi. Modi aspernatur est vero aut. Quas eius labore sed sequi cupiditate est est qui. Omnis ipsa maxime aut sint est. Dolor itaque non necessitatibus perferendis perferendis mollitia sit.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: '3f6i9vgxgs66dpsvk5go0wajlotkpo80yont7qhoob2bijni81',
                systemId: 'pm44ze0nw6fnf4d0e2qym8n2y8m4q43zn23fc',
                systemName: 'a9bp23x7urdbyj1lfk5o',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:44:27',
                executionMonitoringStartAt: '2020-07-29 08:21:02',
                executionMonitoringEndAt: '2020-07-29 02:04:24',
                status: 'UNREGISTERED',
                channelHash: 'z3km0wt42fc89fnrs1kovf22xbekwaatlc78lmzv',
                channelSapId: 'ixnz8a3334r4gft2fgwy6etch83jgaaylc5q5hae3memzvzlki',
                channelParty: 'cqh25tujvq19o8xr51888clzcspgejda28l8pnycg5h36adegm7h9ow306jkw48avxzd2t0kl4a6ayb0eii5ybs25c03u9lt1swkwpcwitue12143b7hy1klohfdolpukvy57i3pxgq52tbw8ac0a63uk4z1x2yh',
                channelComponent: 'r5icjqy7bc78et8zkzopw51vj03vjawksnbablke5e4klcvez2gq28qmfr3mu9q9bpdt0d53tqoix0r0zqua0mxeq5dbd4zm6bsztx9nl1ytwzydlg8plkg0vl48fwf772m9amatouprxed2feccv5e5w595g89w',
                channelName: '4jyomzn6w1fv05xv20vnaipmndbowu48jj4sfv8pnt4440btjsi8nv5l490l5g41468aq3q52kgogkd74zpmkxcj0kcswgeyhr7vbpcdjrem2diuconyr3u5gj2hthqxmfluujnk8yaxxags3931ad5r24cq6crt',
                detail: 'Esse aperiam molestias in tempora consequatur et occaecati. Dolor ut necessitatibus aut ut alias eligendi voluptatem vitae. Odit illo delectus consectetur natus corrupti omnis. Sapiente inventore aliquid id nihil expedita. Sunt vel et omnis.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: '95irzrhm4sk9b4zepc4pgstpjks6ry767mocop67kof7cbe7c9',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'q2jyqt5zqer6c92wlarf',
                executionId: 'xsh1hub6z4242l40zqdf7jhoawut3005x0hhp',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:50:54',
                executionMonitoringStartAt: '2020-07-29 07:37:33',
                executionMonitoringEndAt: '2020-07-29 10:37:10',
                status: 'SUCCESSFUL',
                channelHash: 'g6txsyws48vlvs3ugbtnhar16u8rz7a0gmmncssg',
                channelSapId: 'f6axiz8q98uookr425ld8pifxbnfcce9ecrti818cbv6xvc90x',
                channelParty: '1paxtb011ux0h50z75xgj4jvhn4lso8yl9egqn9k975t8e617t77bjluexr6hk6g2tvq34ispob9p8zkhxil33e0dzlle6tx82w99w7c98n576t8u51q9p6x0h426t9a3s7t0q95jjsr6d0fugph84ga9qhsxk3t',
                channelComponent: 'pumhj0uk21pdig1nul5wzzwxrt6yui8i59ic0tcvk3l1k5llivb7q2oplgqy6qbcjw0m7o9f1dio7t6k896dpln8sruaktpgoxfvx6h3xe7fv3chgma2p4i8s5r7zzc47nsayexzdy2hcmf4qv9lrczjphgckw57',
                channelName: '1l888xrrqfanhaehzlzbtjn8c7f5ekcov1whx4vm1jxvwqh2yqte6v42kjk8zo5p5gdsmi52y6lkme8oc8p36127amejh31p84bv10xxvgph8x4gelj5j89aj0nu6q6vwwwfulzykhufh3e3tz5yyz5p9atxqnm6',
                detail: 'Quo quasi voluptatem quis a. Voluptas impedit vitae odio sint labore veniam nisi earum. Quia sint harum a. Voluptatem quo consequatur eaque repellendus aliquid enim. Possimus quas qui enim quis error tenetur cum laudantium ut.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'tzwhjuvi1rty0bwhwfh3r5gtyz5pfc64ubl3635lzmm6l2jhfg',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'pkx1pt8ybhkiumgw2in9',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:13:09',
                executionMonitoringStartAt: '2020-07-29 04:17:57',
                executionMonitoringEndAt: '2020-07-28 23:35:24',
                status: 'UNKNOWN',
                channelHash: 's0imfmt2atb48xfg4ccq647uf4p2xvy9wr1xdu4uq',
                channelSapId: 'lkummk291fdw13t776fuklyjbkh3zc01pjm6s3aht1zx5o7tkr',
                channelParty: 'wk7g0ve4y26d8b196jxl5pjc51x41g4j4qih3vjxk5dwuu88l78hi7aojl9jdhhtcobcmfh1p74x9i7t9xuiya7vskr56inlal2r1qevzk1n0k0gqgctyz9in72cr989s2tv3zo2ls3q9hsexxztab74f3fbd1q3',
                channelComponent: 'z4k2ewj1md734yu76or7kx58yv922tpl3e6b6ulhl9h53x4jqrs479n4u61ouxz5fl763eqwm0m2iftnsy0wu7w14iboz1e0yg2y9kyne40difwa3dg9jv0oexjoyf9ib3wxsf5tsbqs91ce25ee948tb2omxazj',
                channelName: '2phtw2azqx9y045jwwelb12ydl0hzw3bg8s10828s10zlklhwj58xhzii5xeiattydkylfb4tae79l1tvn69m1jvunrncv43yfj9pujusa96plrm9j3o5jelnljxclsyuusyd97oq3iqp6ikm5szq60oa8ew8tku',
                detail: 'Recusandae facere aut natus. Placeat qui voluptatem. Qui quidem et et. Quia accusamus quo similique rerum.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'tdog7eg96l6p7a8dr5i1up00suqsh2b1pu8wxgzttad723b40jm',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: '5z73vf1t29seccaexbev',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:15:43',
                executionMonitoringStartAt: '2020-07-28 16:08:31',
                executionMonitoringEndAt: '2020-07-28 16:00:56',
                status: 'ERROR',
                channelHash: 'elhacusw8nvfw53ann64rx37rjlxeuxl7yboe7y3',
                channelSapId: '07m0tyswis97uc8g6qvpp2zf3okcxpmza7wmkztwrrypmnpqc6',
                channelParty: 'inch3ve61qc7bvlr3xs6nrxtgyhg87xhmq7e286nhenjqwx5wq2yg5h8qb7l0ahxx8zb4q4dmpgo870ishfo23vjoz097j610hkj7wm6jnhzcc48qdvr5moq2m6qt2zczwanbeqq7carkqzzgdt9c2poys9s9vwe',
                channelComponent: '6w4ie5wo2zw6wlwm5jgh4hhbngs3ujh31zhkxkqhut7stjp0mdm3w6uxgj74ujhky47jaur9rzrbtwnglnobl1por4all8hzlusvcdi2qr2i0w2yoa744nh9tg8c2hbx8cazsuuq24py9tvlp66qf8exfixiulp4',
                channelName: 'b3ixnzlkti1a7azm3kozjqpzzuwe5l1fu38o9dwl7ynzccu817r2iztoyiv3rsf2ovkgytvgrgaunl06vqgjydqrh3mgix3f4nvsmbzl30o1zdspldy8icmgqr29d9ajnt1hnwhgedop8p12drqknen3wjow08v6',
                detail: 'Nulla aut quod odit doloremque harum numquam officiis. Rerum neque eos enim. Quos ut minima. Rerum laboriosam est. Ut eos sunt. Ullam repellendus animi non odit quo id adipisci quia.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'dl3onqkzpojq0ixr298y4ng8rhv3w7a6k4kr179i8hmzdn1fbx',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: '7v40h58grd63wg6mrrb0d',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:55:06',
                executionMonitoringStartAt: '2020-07-29 14:15:30',
                executionMonitoringEndAt: '2020-07-29 02:39:46',
                status: 'ERROR',
                channelHash: 'j4xe9l58p0s13dlqtfcyw6t6j58o4rgh3d0b3yis',
                channelSapId: 'cg5nfwu1iq4wiigkf3qkpubbmast3ig1pnl2d68vwb7i70l1ej',
                channelParty: 'ul623v1s9q43xfrgkndte9smlwah8ie0m3zpsvjhsw1zr84dp876dif6wevs5atm6509bb8q5e8lswrdv32mnpdkyujn5fp9fh4stfh0s5axgg9e85544srybkksenr5nqs2op1h7lu0zvnfzclqlyzihu2ube4p',
                channelComponent: 'zlggqlkw5ujvwtlle4mdpl5zn7theamo0ely09enx619dy6tbhvbipdqez4pmek793um5b0hy1bk9073l4adckjss5zfsvaikohhfighg1jlrxuev26b0x9sh8289b2aenyweeoocotwerg42m480wv0ttn4a21e',
                channelName: 'hk6z2mec88chbhrsrtlf6vox6utw2yjh6iocxlwo8ztqszsna6vs98pa6xpojz1dwoa87nj3dsv3ws0d8pud4pop01rl3oivg3nzym6hhla3hcn0kks2n4k99vht1e03xnv0eg9xbbgz1rh295wntpqskvcc992m',
                detail: 'Tempore sit nihil eum ipsam aut. In assumenda sint adipisci omnis rerum. Architecto eveniet qui nihil veniam aut ad architecto. Animi blanditiis dolore non dignissimos sunt debitis. Aut maxime non velit rerum. Possimus fugit provident adipisci recusandae nobis vel.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'w236803qa2ws13dkd5g3tcapneo2zadniunoc8qx4v5vrtcj49',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: '0wpdqqmegtqoscupzn5z',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:57:29',
                executionMonitoringStartAt: '2020-07-29 14:30:18',
                executionMonitoringEndAt: '2020-07-29 11:27:52',
                status: 'ERROR',
                channelHash: 'ljfr5obfov3y1scxd37zghj1by7763sah45p73xa',
                channelSapId: 'x3t51p1mys4ek3x4l3nxrb7lckup92e82f9w2204bxfiv3bgj8f',
                channelParty: '8s89yugte8ndy9953qr0snli12c4fybzgc3u8seytk3h1d0x3z154p723sjmc5a01vikjhff8czlz7loqusyef48d75uk4pu1akm90tgpqa165216vk9wbz4g6sh2m1dp31esbftxsozxpzi4za6hrdmvuqzjumb',
                channelComponent: 'coux4xiqzw28miafnyp6xh2nw729sg5f09nh48g06sae1bra9d5knsfsaqhnq2wswwz044ieh2twq4tlmt4spiy7pwo9bsg3mg5tweeth451joe7c5s1vu8i12kfphaf52z9mvbz5rl5y881g9rljwuk3e3gsxod',
                channelName: 'v4jh1xj47c7khxbpxp671hsew264zaxet7wf63kmbeo3dc4g4cglqxcfi73ksiivgdgkcmzmttc2vfxzlxn4d43t7dd9xzyo02m4lk33dbtq2335xsjotrcgksftret2pcq6oyxfdm34jm08g5047od1s7l6atma',
                detail: 'Sunt quasi voluptatibus sunt dolores aut rerum delectus aliquid sint. Nulla fugit ratione. Omnis quis rem vel aperiam consectetur labore repellat et vitae. Optio commodi unde qui fugiat libero officia occaecati aliquam. Neque earum corporis assumenda voluptatibus.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: '2u4woejrt3wkodnpn42yvkalk34c6z33yr9b51cdgt8cajqusd',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'sa964e26vj1qhcuhx1jq',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:03:49',
                executionMonitoringStartAt: '2020-07-29 06:12:46',
                executionMonitoringEndAt: '2020-07-29 05:59:13',
                status: 'UNREGISTERED',
                channelHash: '2n2tjfkm1potglkops3v58zrx80pvytfbe0qeb8t',
                channelSapId: 'tdszh49k92ii8aasp0g2az5r65gqam2y8guugn1wrcqu105ovh',
                channelParty: '3jm2877cmgaf2fztamwje3n76jfcupsnejl3zlxv8sdydokaymgy4szvmiuzjdeitp1skmx1c4ua9b718m1pxg6tzd2m3t6xxrau28qmw7fjfjfoqsd48x1l9wjhnedwd8c0gsdp4xjrfvh2f8qozb18venoxccch',
                channelComponent: 'i23jfj5crryt5s1sviit36hs7w7b8fd5n6wb2r9qngrt4r0iv3mxk29rk4vdr3annixvfnx24x0cr9w3f4mpe2no9mrmfkjye4vp4ucmupeival30w8a0yvld6dik690uith7ojem15ayq2yuuoquku0qme5w3av',
                channelName: '5kod2ah6wl2dcmma9aqkyz7rq1rptp8j7v525z9pa71011dhwm4gj6q46cawivh7mybmeqnshz1jfg5cx18f2f188xwvy7z0oti7xi08106hqd2ogpvnmnh5gpcah8gelq9shalmlpov4xh1ysfvpmlmyn7vvj8f',
                detail: 'Aut sit enim quia aut consequatur et a blanditiis qui. Eos asperiores architecto rem quia ut. Optio aliquam animi magni eveniet magnam non eum.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'kn8uslvq691qohmivczmnpuce7cuw9munuo8nzyp74ht74xe2g',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: '6g7r37vlzgvz6f0d1ygz',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:14:39',
                executionMonitoringStartAt: '2020-07-28 20:52:32',
                executionMonitoringEndAt: '2020-07-29 11:29:23',
                status: 'STOPPED',
                channelHash: 'ssea9uldezfn7vixqs1hvhamp7ak65qsahyiskif',
                channelSapId: 'b8r0dw5bjn4r31q88brsbbda6vrv7l9oyiphwtg1za7b8lsjqb',
                channelParty: 'adoa0z0r8hleds2i3y3z0ktf222xfovsq37h6fg7q72sbzokt2boff7b1835b6hjkl5hv8lfrjkmzqwetnofoi18jr7iypfz9y7gej4452o3oyw54j3awe4zscqhfucq5vkw01jps31lfzhg1a4xovjmedftozwr',
                channelComponent: '8u1ijivceqq2fub8upkd21x59ddbkss11ia4zqrq4tr421z93fjpiew05kxaqa228nnjtjmj42en04pqn6ow8ljmuq0bvqs2nqaoml5uuk7glmj4d2djv9h20pswkj0asrpxl873bwysoikq7anca8z5zbx4t21uw',
                channelName: 'gyu91hxbnpouv0132bbvxztgm4wmgdktwdgrp0gw40byfwah8cd486d3b5m2eo3bbcg8blct1xmxyh42kk8vlurq3qtad64qg293avh76x1dnbzo8moeenxqw91q3z175p2i30n10mkixlmqtij4nxtkdstz78yl',
                detail: 'Et voluptas tempora. Libero eum quia ipsa autem voluptatibus et est et. Quaerat rerum accusamus laudantium facilis at ad. Quam consequatur temporibus beatae error minus nesciunt harum. Provident dicta at et praesentium qui.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: '8h75ijg2zp6wdapp0v6sr0uowfydg7t4a7lxd2cce4dbs2spl0',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'hthbstk9p4ujqavlymsn',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:56:42',
                executionMonitoringStartAt: '2020-07-29 04:55:45',
                executionMonitoringEndAt: '2020-07-29 08:22:43',
                status: 'STOPPED',
                channelHash: 'lvmjnp6ra82b5kg86gjx67g43q68x5wtv5w7xcih',
                channelSapId: 'v1xmh8e18txjpqo1jtawlitsyrww3j4w2mtm450i8jer514jt5',
                channelParty: 'e3l1vsx8sjx5lfht0wb87dsczldth8g42kpfi3p491ekx0kakm5wqdhevgzhsogvcgwuiehzr4zeourab7k2414rd532p5hct8coalltgbe8ldxfwbat7jv44x4kxefaa8m2tlcpcgqtcrf4x73dyc1ef9mubphh',
                channelComponent: 'vj84u0b04l1svvhwl8zrci4kmc0pnr2w6446j5c7m57ilezj4ojewfsa9ikijytxzcd09mz7v5s5nzkemfas68izznjx6mydmvvo9cwfz32129i0pp308rfok5uew7pn5cuus9uus5d47kxyooj20cl8ogltznx7',
                channelName: 'yf8xsas5msitf5nhbkzktp41c1c0bspzdssosubs7wji0jdrffmproiahedl7v806j4lyc4rlydkspa49maxcm2qvynat43jz7fopvhuhphy5haoqaphtay37rp70opw5n7lq9xm6y20bumkk1p4euxy95htymion',
                detail: 'Expedita quod qui dolor et reprehenderit dolor quis dolores vel. Autem velit quia. Sint non est velit tempora. Non quasi temporibus inventore voluptatum explicabo voluptates unde accusantium maiores. Dolore qui quaerat.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'a2g5u2n6mvd4t3rmrth0u4virhtodw3vcbuu2ge7dm7br90cps',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: '3ozatan9aae8zefdqn5l',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 18:17:47',
                executionMonitoringStartAt: '2020-07-28 22:25:45',
                executionMonitoringEndAt: '2020-07-28 22:16:39',
                status: 'UNREGISTERED',
                channelHash: 'rmf70nymnk5robwbfc8jpsq4qt6bg0bm78cs6n59',
                channelSapId: '5g74xpq806055rvkz8lpbfdgiier4a8s8i3h64vmd6h3x352tb',
                channelParty: 'n5gjjfw0z2lvz8ajro68o4gwml8xo1f7wzv0ooyjy08bfc4h2kqdlvm1vt81xyhzwyt94fhrnrj3mlm8k3a3rhtkntil7t18ctzakd9s7mxia6dooj4f2q89ipsom4epx1yn2yifrp2uignt6kx6zbk1dbzl8dra',
                channelComponent: 'mf2j0505dhvn1jd196g7hf9vtz0y5fqwphrkcoemdrqmomveos7wwhm6uyexvv5jgac8v8oj6acg48ttvxqes8sinnc2a03vdlb2x03fu5eyqfjd7smk31ayus15xaalr55bvmqdgm1ilcf6ilwdsyz0948gzirc',
                channelName: 'rjv9qpg9musi83bm5yr2e1z23blddfrj3ilkh0opg2vzgsq2o42kwuniyf3s8io35dod8zolm38qjfmoir3452npu3iie9gb1735yaqdb2bis7ensxesrh1y4q22s39w4vup4a79e4lg65yq5m8ipa95631ny2mo',
                detail: 'Ullam fuga et molestiae nulla repellendus voluptas et. Et harum eum iusto quibusdam saepe omnis quae optio. Consequuntur non quis ad eos velit aut ad. Fuga neque est dolores quaerat dolore vitae atque. Perspiciatis numquam quis cupiditate sed.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'fhdc03v6ynyracwya3bsux1lv50glziq1bmpfes81vdk2usa3f',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'q3755kbg1f8c7f4la4vj',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:15:40',
                executionMonitoringStartAt: '2020-07-29 10:03:54',
                executionMonitoringEndAt: '2020-07-29 14:28:59',
                status: 'XXXX',
                channelHash: 'q2yn90t8sddj4ebr5drhjnjv00x5gfa4fpsfhd0f',
                channelSapId: '5brucpe1sb7rnnw2d24kftrvzriyzrn15g6ql57e05g94czaxu',
                channelParty: '3un1zlcpuewnklyirq928diavvhho5udzoo10hydqbixeim5cg9yu6jjx6luvyppnv39kpt8mz2fvt3z701lt1b2p3bls2l9olabg811dstf2se75xmr5o6ccv1ktpqq2pxg39uggvn8e3owt7rzeysz2v2nrksc',
                channelComponent: 'zh4ocoobops5xkhke00svtdj8si48qunwyzrxlkica3yily6rt0pxytn9vmufux1vcomcfjzv7ugdjap6g7gvm1t36ejg86dwabx3owp6idbcfet14n7g08a4r8eck1y55a1uliy8f1vsx88pc723mf1z6icg8sf',
                channelName: 'jzl5n5j9vc3q1xkjq29ztfq20mubwagcj3e1vg609zsrl4z8we2ppxu0d0gtn4xm66eux9i017x169ybrycjkjkp7n415gjm5rtvoo6i37jtdk3mhdictxsncseit43aaofy8f3eu92og12uzq99z2pelgovxbsa',
                detail: 'Et necessitatibus libero minima qui maxime officia quibusdam veniam eligendi. Sint molestiae officiis consequatur quo nam sed et nobis tenetur. Dolorem placeat aut rerum expedita sunt. Dolores molestiae et eligendi eaque laudantium. Eum nihil culpa doloribus.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'obdr55dugay75taneyy1f2hi1ax9rdd9a9hopbkuyfvzk0qugt',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'ts56mrhuvn8rw3r916n3',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-28 18:14:20',
                executionMonitoringEndAt: '2020-07-29 02:01:42',
                status: 'UNREGISTERED',
                channelHash: 'bac70kyaga2cmvz0ze2cjhf0u9fnbxwitkhi5rvr',
                channelSapId: 'r8stopk5jbeyq8guccatmq8yt6t3uqdcxw2z4k4n36nmtowesy',
                channelParty: '6oqn77avaur9stzxc6duykek7y6q4m5gjqp3lb09ccnhkxngzg3txy8xlwpzs80rjvallwt4xvqqiw2qmiq65lozdduwcfm7b0a2xi6z53u5gf2zata5yqrs2nonlcu9q4vuyzj3tj6duxzocg936frt0ximy2yp',
                channelComponent: 'qx6cavapgy8i25kp17pcsvwu2pevcvep3jrkxdjphf1n580ai4s4upglwqmtbqpczw2w85134p7mwjb9xxi5enl8slx8bl6e5vypb9wkdpt5op7juv0hbvjvgrsz4ytdu8yib7h33hp4e9n2b3e0a6qzgvia2d0m',
                channelName: '2lof38qvqyg4b73gw0xxhzmk7t3f9l1gvzlfe9vu77oebia2qjv574614ndl2j2goniqrd1i56x5ib6jzup5j6rl1xq2cjrou17bi1k8c70ddtoxyruswmvsofe9ch25t52y8wo4c43yyuowdw4mbc4hseb99dll',
                detail: 'Ut minima natus facere. Sapiente dolorem iure ad occaecati. Rerum aut et aut sint expedita dolor earum totam magni. Tempora id sed aliquam quis sint et veniam. Natus qui eveniet labore ea sunt et exercitationem.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'ahtksw5jl9ci3pzs43fbcoamosy1j24gavoj8ydm8x3ckcixfe',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'k4ehfs75reuwzk32n2qw',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:23:49',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 02:52:34',
                status: 'SUCCESSFUL',
                channelHash: 'b603losz3qu4wojqp28q2fbh1p3qqmz5quuh1axy',
                channelSapId: 'ond4ua2c1q4h4l3faov327neea9rjz1y9sx3mdc850pdo92hje',
                channelParty: '1s5p22f2wo56102wdtjwhp2n1fg7p4gc7m2299bsckqntrf01pfvee3p643jalqzm5bap3tsjed0mkya70t7pf2pfja4ku1tp5cw3ehqi1yzwsz12xljbssy5ss9jkz3lddo973y78hpy2iv9sx5435m4789adot',
                channelComponent: 'hsvv0jt00uqxh70076ac4ivqtxamcxoadq1lifex46cv4d4qvrb2t25626ifdsyz50ev3xhvlmtanwx62tx748p9wki3yccayyz659q3kxrcerl185ustywg582v5rkcgq4xqsi37oanzgbkgz1ccflnjlk3fkwj',
                channelName: 'qnvykdm32ou28stlutoxh20adw4eokcq31c2k2zxc2txylc8f7qswbkhq5n12csh550agwxfd5o8r1o11h5qeek52w9tw7fll9jtyngsqiigw50bck3kmxolblfww6wbvvu4zv3y7ix1c0xeune2qmlx2gi3baof',
                detail: 'Incidunt error error. Voluptas alias qui. Aspernatur commodi quidem exercitationem. Tempora est expedita. Odit nemo harum. Excepturi nihil quia doloribus.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'q9q48tj9w0rsudbig35gxuqjv2o0w96gm4m3aujgjfa039qltk',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'joizqludhq4jcktxyuoa',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:33:43',
                executionMonitoringStartAt: '2020-07-28 22:49:57',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'SUCCESSFUL',
                channelHash: '3go4bie30yqw7ajy4vv351kdbf4egn0hlmgjogb6',
                channelSapId: 'j39j9v25ckwfgguj9pbyrc734nc9y6rimfvfcl2mgarapaokxj',
                channelParty: '4gy6rc2lbewmzgchg53movyki2996u96f2w24v4wxld4bwu34j0pngs20ck8ypo8g4zckoq9kkdpt1kmwhds7af5iowzvr631watttloakvc231awau7bqfdnu4qaapglv6yuus8s5s923q6wx8a1fosziyqyese',
                channelComponent: 'sf6ne4w6ltwdic4ut5mcvi13c5zauchpeg7n5vg32ekyf4bzvcb3pkmytjcjjjjftbuv661aoopl3mozuagb424pfmhytm00aaxrovmew6k8c4uan7n8xayofhnbh9bs1c6kbrosf62btu60vue8s1y1190d5vzd',
                channelName: '801pgdwg87aaeoxn7aw2jes08s4zc72j13irx0mahw9cnvu7klnzub1qgaqpfw7v9hu8u7tdaq9ki2lb5biywq50onu6krrmccdx6003zmsyat2klrv2vdwq109sr3q0nqjwizuzfh948xfxqjtw9a30smrn3ckd',
                detail: 'Odio velit voluptates eaque dolores atque quaerat vel. Atque voluptas eligendi. Vitae eligendi incidunt.',
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
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'c5ou99f2hkfuyyj9e2d1vzwftd7l2vkal5efa6aab94cqg1yyg',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'bf83yd9tawkxudzck28x',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:35:46',
                executionMonitoringStartAt: '2020-07-28 21:58:42',
                executionMonitoringEndAt: '2020-07-29 14:06:09',
                status: 'ERROR',
                channelHash: 'qr1olqedzg6ogis9ghqj47mt6624bul9lr2vepwx',
                channelSapId: '2fq0967rdcxby3huhdu9rmo9itz395tydvb7c7ttmfykashy8g',
                channelParty: 'y0f4qw9e05r3ayd08pircgamgazsgy5n8agss9wqk1vr62iokrtp17sb2pmb1vucyfaraj8sgc7mtv4n2xn3u5hqt7gh2b9lqyz9jpakwas3aaokqa2t67d0bi7jkf5dblg3lwtbreus0cka8xac73eea584qqq6',
                channelComponent: 'f3f5h6scz120yo4wwfawg73b0n63trm1ld4kicham3gtlimungu9qlp6ifhrbb0yib6hjyqms5oe8jkx6n89p0n5d9xqs7ynajkze2erl87f544cmxrqpwysjl3hflismv3qyzp2rd5m3p7wk8rdme52ey9q78j9',
                channelName: 'jso0mbb0kanvxt2aiyo3x6q6pxh9jq5wn8e17ncwxzrx4m2zyaii0txordpfnejkpc1xft2eyrneiaexe26kpdo5z7nx5fgwn7zwiigwra5887yv6sj40trq22q406jybitykw6573zzlj1jyqf1sxqiq17wlqrc',
                detail: 'Ratione ea ea iusto quisquam sint quisquam. Voluptatem reiciendis modi assumenda. Assumenda magnam explicabo cumque sed velit consequuntur. Et ullam suscipit ipsam aut culpa.',
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
                        value   : 'dc46ba40-8746-4735-9f39-e0322bf00392'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'dc46ba40-8746-4735-9f39-e0322bf00392'));
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
            .get('/bplus-it-sappi/channel-detail/dc46ba40-8746-4735-9f39-e0322bf00392')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dc46ba40-8746-4735-9f39-e0322bf00392'));
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
                
                id: '88ad43c6-82af-41c8-81bc-1ded504f035e',
                tenantId: 'd197ccae-5e97-4856-8fc5-138acc0de2d5',
                tenantCode: 'ncfj1yuqg6l8ma5ch7smbeyf0ttctj4cayqyf4qx68entxmhbz',
                systemId: '04e1f8b4-9920-4ed2-9eb5-0fab1586c22d',
                systemName: 'm00uyel291n4b0byqgp8',
                executionId: 'd5d3ca79-984c-432d-acfc-512a38f203ba',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:16:43',
                executionMonitoringStartAt: '2020-07-29 08:23:27',
                executionMonitoringEndAt: '2020-07-29 13:42:28',
                status: 'UNREGISTERED',
                channelHash: '2ml1um4m4dzqd9fy9pdr6cq97psbfybxia1m9689',
                channelSapId: 'pv0lpl6ww9y1i3jk3ue0qvxwp7ftz6o3gsigry03y0e5980n3m',
                channelParty: '65mv4chbo09pb0vzr6p2sbdq8rpsltqz70sqm7xgcc6cr2vc22el4k143lrp448yqr9ehib1pvuc1t5jox5zn1oh1okx5byigazaoeykefjnr9azhofz7cbvbnnxcunjb8z09qxspjaxdhcvw4h0in5nbcen7b15',
                channelComponent: 'ayztcxawp4dg39q6pltrcq92hb9mtjp6ce1gpmvrzr34crdkaa57j00wv9efci3oka7zyamytbsx5isyoin16n80u75dpgppz7777k9ywggpcgozlgsoul3g2p40oviyy0seuf4v3efcqjm750nhfukgbwmdvmtx',
                channelName: 'o4ct5h81ww53bs8373gk1imf6xfbodbdt8j2c9cggjtevo6jzkj74imf8gsswc2o3m3aab7e9vqi3oobqgfrszb46akasdziz7jqd9ddu812vzgcq6cd3n4fafe98cg051wnrqwcjigk42t3gp1zobhse8boz9fm',
                detail: 'Commodi voluptatem et est vero. Optio eligendi deserunt nesciunt iusto ad molestiae est vel. Dolorem consequatur exercitationem non est dolor dolore recusandae.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                tenantCode: 'a40atcg9zfe69s31caxkd2hdmzr8rj3whdztuepm1dml8azawu',
                systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                systemName: 'ninast25o472iprqpes8',
                executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:05:28',
                executionMonitoringStartAt: '2020-07-29 14:11:42',
                executionMonitoringEndAt: '2020-07-29 04:05:33',
                status: 'SUCCESSFUL',
                channelHash: 'if658g20id1y6hr7myki8b2twjgu8y0gv8bq911r',
                channelSapId: 'v7s8qasd6j4of70a4y55ymximwh0zretlhln17jjd7vj9ycc9q',
                channelParty: 'ej12uz7o1dr27j71y763olobb9uyhyoe0urlqems21lgkjuce1i24nfg5zbf15gg29ia6px9svql6b2rs41o9h5fyvdnzgizta9b6a0d8wwn13gpu1hscgewpue9mu8gdq0aha25wshs7xjf8v7q8wyust3ss3on',
                channelComponent: '7qz7dra0blxyvlk2a0l3nhm48ab5aua7tywn8038kkua4rwbnvhckohxd7ov8p4042t991w8wj0klfpus387hd17nkuxnfr7jj0sdvpagujn0i2k6mt4k8vdko3j9pobis6q8l25wlqn1aq0w4hd90r4hu5m0dud',
                channelName: '85hpyhfd2cr8xasb1m8tq01uyownybfhcju70jkbgu1r9uvy0ptvfxj4oged1xn2fcp6qjucw2rkz63ogyvpa7534etoy14adx2wjv48qygq0ofruytgtcsal69j4u33dl0ki6ocoau9wnlt3p6sqfinohincjld',
                detail: 'Assumenda laborum ea qui velit illo. Quisquam eveniet quis accusamus. Quo cupiditate ipsam velit vero libero non expedita velit.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dc46ba40-8746-4735-9f39-e0322bf00392'));
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
            .delete('/bplus-it-sappi/channel-detail/dc46ba40-8746-4735-9f39-e0322bf00392')
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
                        id: '8935972d-0678-442f-8c28-382ef112982a',
                        tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                        tenantCode: 'ec4bkyw6orvplakdp1litlll2t27mb568izhzfil62o4vg61ha',
                        systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                        systemName: '530891rqdzr15t256qsu',
                        executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 16:57:21',
                        executionMonitoringStartAt: '2020-07-29 14:03:06',
                        executionMonitoringEndAt: '2020-07-29 05:07:05',
                        status: 'UNKNOWN',
                        channelHash: 'xhlchboytuwdil54i9a4i997hzzt89c8fd27l5ix',
                        channelSapId: 'sphx58eout583kcrrrkxdsvsq7t1pm4uy7j7bw04cvjvq3nyem',
                        channelParty: '2eglyvaboiftu5vcy3l1krad9f0712toxtv4epypmjim4nsi2t1r9zvg4nr0ez4iuaeuar37yliwbu1hmko8ucpo6fitfnxkw9suhaxjpgzj6agjfor4w0vt0r6pjoem2jigku8v2puv4ng2cy1h76z2g8egcxrw',
                        channelComponent: '3a13ww30rbx617b3ihtkbb33nbkzal0brbvmiwov0kr66266bd69xbylhw8qhk7h21eaxob4w6imxczyy0uppit2olxt2f5sleg6i3ceu50bmt7h3m6801stru73495sgjp2v3t9onz7lnia6jnwai54kem5w1as',
                        channelName: 'l989jorhz9v12w0un13944p1o8g7k03tdbsguohm4j6sc8llo7lmcwywk5qedqxpkkin7t6mbu9psvoda8l67k0fszlioci6mmu94cdhn0r4l1ta2ekiyfmudm7hxtga6u2s7awesm3c6wkts2d47wl63wp6ibix',
                        detail: 'Nam dolorum ut voluptatum laboriosam sapiente. Animi nostrum laborum ratione corporis et voluptatibus quam. Consequuntur vero dolorem quae quasi voluptas a iure saepe quasi. Dolores omnis quam.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '8935972d-0678-442f-8c28-382ef112982a');
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
                            value   : 'dc46ba40-8746-4735-9f39-e0322bf00392'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('dc46ba40-8746-4735-9f39-e0322bf00392');
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
                    id: 'dc46ba40-8746-4735-9f39-e0322bf00392'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('dc46ba40-8746-4735-9f39-e0322bf00392');
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
                        
                        id: '564b5ec0-1e22-4d0d-995f-cec617edf137',
                        tenantId: '1c4bd813-ef51-44c2-8a52-b7381011a834',
                        tenantCode: '5udaliqn49n60cej63h8ilbfuf812siopio1604bcp6fhfulha',
                        systemId: 'ac4396e3-e580-477b-86db-a05a1720fb42',
                        systemName: '49zo57w5cx4ep9kie6ji',
                        executionId: '39fecf59-4945-4873-a3e1-2ade28f27259',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 03:05:22',
                        executionMonitoringStartAt: '2020-07-29 00:10:45',
                        executionMonitoringEndAt: '2020-07-29 15:30:42',
                        status: 'INACTIVE',
                        channelHash: '8z51zfnkfdk42aphspawyd1asyimo0n9y7ltlskp',
                        channelSapId: 'gv9ab9d38c2wkw0lxemm9cxnqsrn38pxkl7v2n32t3kfrve0kn',
                        channelParty: '9dme6sg7f3mprzqsowvqqj06yr6wkn8ii6fblgi8swxlayx8um3ojnjfnwjkf8eall7i8rssdz6ctijaq4j2m99ycsrijdkfy2z7xysdikxlupzt25hmofpx801v2r6ua2b3l70xuyrrha1o70wje1zzyiunk4m1',
                        channelComponent: 'rbpxshp23x8dov1l6vszmguqaa8dgqknvsnw1hzf6ctjaqudjh8veua4k65qquhaa80xtk9njty0k6p6p7zwpgh8q5wvagv3sqlm22mo8hf01re7feamfhfm2nf0qtr9wxl3kfn24k1074qa5y4vetmibh13hqac',
                        channelName: 'oioj7yy01rkacmjqju48ioqw97rtyevbgyyt3ni9r3psp3ag8101f4eot7vqy5v8d5b1iqnktsr3m3wd5mbgm3vxedvvmxqqvco1amiv2fm4hw5y93cg35wfr3dzv8xqc964yzy0mvedkc5d1d4c98n0brorfuto',
                        detail: 'Est quos nihil nulla ut quod aut. Doloribus modi exercitationem odit. Dolores aliquam illum quidem placeat et aut. Itaque est voluptatem tenetur ratione odit. Exercitationem quibusdam voluptatem velit ipsam blanditiis quis iusto ut id. Sed maiores enim non sunt.',
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
                        
                        id: 'dc46ba40-8746-4735-9f39-e0322bf00392',
                        tenantId: 'd9481fd0-b445-4a6b-a3c3-1a426349f042',
                        tenantCode: 's470djh1w388kalft27dd0w0yuha01f02ir1akwoge8deeps0w',
                        systemId: 'b43908ab-f52f-428e-b7d6-ee1b805bf069',
                        systemName: 'd5angt6f9hm6p8drl0zs',
                        executionId: '60baa61e-ca17-4a2f-90d8-6bd2adcd466e',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 05:16:42',
                        executionMonitoringStartAt: '2020-07-28 20:26:57',
                        executionMonitoringEndAt: '2020-07-28 19:00:03',
                        status: 'STOPPED',
                        channelHash: 'qzckd00jc5l8oyri90b7nl3kb4u1qle9xzi48xw2',
                        channelSapId: 'x6n24rbrnm7kj4wnyufmonkfqs5ynjpsnbd75ram8tiwmlv9lp',
                        channelParty: 'pvo8d73vrxqo6vgw07jgbe5okq6pmu4xoxwvlyydejfswzcqfcjfg2u5wd53y28krosbs5ytvhl906554klsngmzazh4bvlq0kqnahwxybv00orc24hvzaelgu92ubv8m37a1ucc5dngsr82akz461vhguswsnpy',
                        channelComponent: 'mmzaig8tubir1c7gl3apgs7mvs2cpb5ugcd8zjy4q1xnhnop7c911180xsdzv8u4mwe03dzp6tjvnelriol9k066soxko922ilggsbwd6khv5whv3hx231g8if6nrwa99hdmo7yqewr93e9xtsi8fav75duy2rrq',
                        channelName: 'zyuwdqv4fkqbamus95oxg9mnxrlt0z47dcvu5qctf4g4jsljnrcdfrgjw3u9ad4nt0hengx9zjzpjjkqeb4c3vcg0tvyyihik0oz8e4e9ac36gb6r65crcfmy8l6x24bju06k0x5p3hd14f8ixpa0g1cva9216gk',
                        detail: 'Velit optio enim vero. Amet omnis est voluptatem ipsa qui et at nostrum eum. Quis beatae officia id enim illum magni.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('dc46ba40-8746-4735-9f39-e0322bf00392');
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
                    id: 'dc46ba40-8746-4735-9f39-e0322bf00392'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('dc46ba40-8746-4735-9f39-e0322bf00392');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});