import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelDetailRepository } from '@hades/cci/channel-detail/domain/channel-detail.repository';
import { MockChannelDetailRepository } from '@hades/cci/channel-detail/infrastructure/mock/mock-channel-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
            .overrideProvider(IChannelDetailRepository)
            .useClass(MockChannelDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelDetailRepository>module.get<IChannelDetailRepository>(IChannelDetailRepository);

        await app.init();
    });

    test(`/REST:POST cci/channel-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'fj34js2fxqwp6cg0th0p08a95nu37stmcnyqyz9d9twlrv372b',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 't8j16pbd6ffqyvzwh540',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:31:36',
                executionMonitoringStartAt: '2020-11-04 00:36:32',
                executionMonitoringEndAt: '2020-11-04 01:05:30',
                status: 'INACTIVE',
                channelHash: 's96wki8kszeyqap8vw2diyprq1fsn940mwtjjl5y',
                channelSapId: 'ccb77t3ikr6azdqar85dotxs42tlv4bf1xlqsg16ar1u74bqm2',
                channelParty: 'dyfm7ievv3rgaakbq2h2dq0xg8dh5001f6kw0y4oqj0f011uim2fkh3bugh0oxldeawpdlqgif7a7smzpoqte5z2qrwdavpgek6x1bp72f8m4hbev95ktz4611swmwap6v0nxz84v490zxuy9nivwigahao7rtif',
                channelComponent: 'zecjr7bv0mwdu00bqwqt8odpvvkk2f4st2pv414yyvll58iemdcros2eohicnkc09k1mkdxo3lurycuh217aixijqf4x3ehiklqv9t91ubl5cy99x7yf8e62fqpxo9plrnh4y2re4q0qbe5qh7j0skj4j563dtep',
                channelName: '6rxhv6b97is7ck7jpd6pwtx7vugynu5hmuklo16ndb6ph60bf44ndf5p4w7glj3qo7dl9tx0rfjxlemeanydrrf7goftbv10wcxtd00onqt5nx5yxee44hd4fhjcfxd0oa8ncs6onf564krtbt0gvhq6fqiuodkf',
                detail: 'Ipsum unde dicta placeat numquam non quidem magnam aut. Accusamus dolor alias illum blanditiis perferendis. Officiis nihil voluptatem rerum veritatis consequatur ut minima et. Quia beatae vel ut debitis ratione ad quis dolores iure.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'mvb2rmmqe5w78d438l7658rnkd7iqymuodzv7deh6h4yr4wkb4',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '069o0bnlemxc3zxety6z',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:41:56',
                executionMonitoringStartAt: '2020-11-04 15:53:06',
                executionMonitoringEndAt: '2020-11-03 20:45:52',
                status: 'UNREGISTERED',
                channelHash: '90aak7n5scvxi0ssw0cexc4gvhucpbywaxtbsez5',
                channelSapId: 'w67untd2bnsvr2xip1fsmaoqvxxhv7sucnt6pin4wv1ru1v2ur',
                channelParty: '7x81tb1gu0fbq63563t9fwv7zann8zt2o6w3um4f0s93s8rpt0v10eh6fdcqnd86zdu2wxebeeof0t1bwnokxdi3i9c7g3vfmdb58hphk8km0usgaargd873zpgc89jqr7yadlz4ae0wl2h4rnkx1a4wehwmdl3q',
                channelComponent: 'ppjt2uv44yvfvqdj1yuwdowm9hizxi42w53qqmjky5fnxpo5iq779vf8uko1hui0uhky0n1kxi20ys4zaksa4ui3i2i4x02cd19oqs0ky9wf5369bbf7wzr3jvtkoi1l14bmauqk496nvqwm9644u2h7j987ibt9',
                channelName: 'nbz7ty7ptfg5m1lv1qqp051qa6lgsmsyheyerrl7q05kwu9ggb6366c4jqzzx0lh2y23pot49e0js916r5dm3626uyn5n2yecksnp6a0qzyzuiw6fvzodjaabjd4ms52fju1mxdbi185okhk45lamcbjk9pu4ill',
                detail: 'Excepturi molestiae alias quia sit aspernatur iusto voluptas aspernatur. Nulla qui et in consectetur ea quos saepe velit sunt. Numquam exercitationem ab et. Est numquam amet veritatis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: null,
                tenantCode: '4f8yoqtcebcwgm7v8hsk2skip0tk8fa0fkxuhm45qyyng3a9bm',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'pw0s1yrp42q6yzbdzjqt',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:46:25',
                executionMonitoringStartAt: '2020-11-04 02:49:38',
                executionMonitoringEndAt: '2020-11-04 07:46:29',
                status: 'UNREGISTERED',
                channelHash: 'nyke2zgqpuxavjd0j509le4un7mhe6v2uniyy6jb',
                channelSapId: '1c8i9n0lpavibeijwdgg3yx7xfu5wgx4wz2fn6nv6bvozvvsgy',
                channelParty: '6higodgalnbmp86hb74ni3rm1ru8t6c7izjt43og0ywfibxezo0hp68i4l7yhlizwojuzngtzu3wzgovrbf6osm3q62u5h34xlxbvnxxy50nghz70v9eogrqpoud2x2g3u3srz27cyvcd1w4g32kz2gabktxpz6u',
                channelComponent: '027rpkeo1nczsglzkhq53pua6jtwwg0rbhlsfcasikjnu9il53k8aj5hnm5loukdq8zajg6q2lb8zp2ebjpuzpenma5rzv71u3pojnx9u4co1i7b7okqxtlh9mvu03gbewskqfaks18gvi6mexubns2ovn7eomn8',
                channelName: '6cuic6sfnby04340vnju58n21r7seqkhf60ko5aqyzdkoa2t9jyikwsw7s20yolfb9g0pt9rq4kt3ca4f4yokewhxuyb47fpxlq2d6xedlu9lddk8d1ysbvi54ir4bl4v09xrilnrwncsgojf37x8u6ahu1nrr14',
                detail: 'Beatae repellendus et occaecati. Et harum rem aut et vero. Est qui sint tenetur. Quia quidem aut eum rerum. Non itaque nesciunt ut cupiditate. Voluptate autem exercitationem debitis voluptates officiis voluptatem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                
                tenantCode: 's07aau0wydrpckpeefc63g3n3i2t1k1tcwtr2y2l42eqx1ed5z',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '26j89ctoyfnt2y0pjczk',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 13:17:15',
                executionMonitoringStartAt: '2020-11-04 10:24:26',
                executionMonitoringEndAt: '2020-11-03 21:18:42',
                status: 'STOPPED',
                channelHash: 'jufy2fh5fh2dpw137gchlq7gjtx9ofq48743o8sn',
                channelSapId: 'dicb0ycjvarjexgpjrrhmo6outdclvzua1tg6rcryg9v11pvp4',
                channelParty: '5huvv9a817uoxyel11c5cxkgtbtlq7hr2rpzowo6ul3miu7hna26j638yn3z6ooy16gkn32a6bx61ckfbm09x378m3oz1dsge4srzd767s7vokkekc6i4yy1ovipt6lsq2pz1ohdsllglmrwvriin77x0jvxez9e',
                channelComponent: '50pp60etc2ijpotnqu881wq3acbq3kxdwc0k8cfkre7tqnd1q8e45ie1plr7gokuutfb3wq95p9dswouxa7pwaq6gorgd4eu3ei39uaoym94rpwd723mxer2a2bn3jq1zklwwe7866bqr5ait53zde9xebjwtx7d',
                channelName: 'j6l0mjb0fn31w7itnr8r1v5lfne6oovlzzuoyfsszcapiz1t65vwswoy2drhkfx6hklmdcy4t0bhtg5uvj0rrqdofqlu56051bociqz0utwn1wodm23gn35jg46h5wjnh2ismc19rl28or0jaxki4ip7yemjxte3',
                detail: 'Ut dolore ipsa omnis unde pariatur aliquid quis dolores et. Sit qui sunt vero hic deleniti est voluptatem. Aut occaecati et eveniet labore error est impedit. Tenetur est consequuntur. Eum quisquam ipsa earum quo eius quaerat qui.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: null,
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'avpgpwakhtxcp86bjrpy',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:08:50',
                executionMonitoringStartAt: '2020-11-04 00:39:18',
                executionMonitoringEndAt: '2020-11-04 12:12:48',
                status: 'UNREGISTERED',
                channelHash: '1ml4np3211pczliquk4qdtp11fiqf9xb47anah1b',
                channelSapId: 'gnzuh1zo9zs4yd7n9z96x2iw6hbgsgfjy70iuhzkgrwxcjd2a8',
                channelParty: 'k8xylpcs6ijoy67rk3f0ho4b7xvgbb9mweva3wygw2603t1uq2gybltsxx175r2v7qkps8d46gmxqioko92e6kn9ci3pyj5mciwts2m5cpgxc0hshwcvblcjmr2iyl9fbpl5w2nveveca90ip4slvyjiazirhbde',
                channelComponent: 'g8ybdvfwfx8kjjlyntus24fsjdueps2wuroctiw4e34r91tbeao259ph9bm3k2v35wtdyz121f859n8gr2300zol36w2wjde4rznoauqagikvpnkl7zayxl60deh5r0t50bj9cizaq5k4vd3zkae2l1z5f9xmpq5',
                channelName: 'aai3j1f7pr09qp54p5y8usv85nd0hjyf212z2qv1ralmd8ae3a453n107zwohu90pr8wpqnmxkyd428abg9q1euflj7p2lw3i44dy02pwxlobe7meeoomswmsfu73p82slk1r65ugd0iqkkyipsllddgy5zh9v4p',
                detail: 'Itaque quod hic eos enim odit cumque explicabo veniam ipsam. Nulla expedita voluptatibus nisi est iste. Quos placeat dolor aliquid et culpa accusamus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '6my7toy2ye5nbd6ax1t2',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:15:51',
                executionMonitoringStartAt: '2020-11-04 11:34:32',
                executionMonitoringEndAt: '2020-11-04 06:30:15',
                status: 'ERROR',
                channelHash: 'l70y333av4d8mymnemxswig0j7bhqtn5bqumyq05',
                channelSapId: 'a3yllnop3ljusfc5dlaeynlwnb81og6ggsv7herklgej5732wn',
                channelParty: 'm2oc3qa3on9oy6ygj771ar8swasmks7yxyx4uhnmd4fziig2tx0khh18adppr0hztn0uckhm4fub66qpskiyrjik9r0tpwtrzguxinzrz9tvr2yoxnlt9tbjcgx49iw25vnmzbsulrzarl06gl2fjyafybnsqnrf',
                channelComponent: 'niyjd0jqh8d2czu7djg0iniw9f6ntia1ixmqb1zdj5kwpeisl9yijryioe3ke9x7trz5gzu8dpo7vpw55n28wjanyemohb8sbr8cxyh0i0mz7hqje4leceg99178n82ktzvhf60jvd42rwaon2nn8fqk7sfa7zbf',
                channelName: '00pphhdam3ef32ius9bx8el87gao266vgtneo8tw8bvf942qffdjti8jmjjaxuoosbz3ds9spq8efdc8doenfvk20iezkravsesfni6a7jwf1dubi0k70am896e6bvintfwg0ny9fyjdemzfvve7xw8zpzicagyr',
                detail: 'Et placeat non. Quia est iusto quisquam. Tempora dolores voluptatem debitis praesentium. Blanditiis quia aspernatur vel nam blanditiis perspiciatis corrupti voluptatibus similique. Perspiciatis voluptatum eligendi. Odio officiis blanditiis aliquid et tempore omnis laborum neque.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 's024q1x9yrqi7gm8getd0gcxaftb42zhjebwbdq12375excd1n',
                systemId: null,
                systemName: 'mtguj96zf6erk3ettnuu',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:45:53',
                executionMonitoringStartAt: '2020-11-04 03:51:05',
                executionMonitoringEndAt: '2020-11-04 17:45:06',
                status: 'STOPPED',
                channelHash: 'h899im2nr77popiwnsx6duj6nwjmt3zpz1bsxa4s',
                channelSapId: 'yynis0ru0af5261evgmvzcp6hsxx6we4p9snz42798on64fblz',
                channelParty: '7wbh12xf7fr1jzubop64affhknvu7qbb3bmddugc1ri717onp0qltwwr4b60wje6qqdh91mdowkl8egiuii1fv0h3j90v36tvawfafw8sjprhxv2nmwqkjjwvldby8vh8eg05b7gb7t4jlk02oh0qtp7i46j4z0c',
                channelComponent: 'cqi1np4u4nz2votg6aujjezpg3vuc0cysy1fqiiv398qxz1w62pcpixu8gyfmsq14e0acdjtcte422yf8l01h0dow8qd03683kem7cxcj5edpganh77hf9syib7c16222qyxu4d3vpqst4etcde9say5f0rqbzws',
                channelName: '262ip39exp2wu6oh5xtxpiyuhfxf82u3pv1oxqptt4egqoeh6axkwom11i9jiaiv9bip6nb94xqh005dsgwat12d5yhpklkipgof2vjbhjj9a41wutmts3kf3vh6m64ykyo4cacl7b3fe1gcq97ixm5c8ft344qw',
                detail: 'Doloremque et rerum et qui. Veniam incidunt aut rem at inventore. Qui ad ullam similique ut sed corrupti quia ut itaque. Id ex iusto eos. Suscipit pariatur tempora consequatur maiores illo doloremque fuga beatae totam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'sw8lkx9vw14feooxjr3ixljvnyucj1oetef9wfv3b8ttii1tyh',
                
                systemName: 'x16rvv85u0q5su65sxp6',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:25:50',
                executionMonitoringStartAt: '2020-11-04 15:54:06',
                executionMonitoringEndAt: '2020-11-04 05:01:35',
                status: 'UNREGISTERED',
                channelHash: 'ak3q381wli8dt379vnk1k8sx3nuj0w7a3lirofzd',
                channelSapId: 'c41cjtn7jnfmq3b44vqn8dbm7dl924ywuxk0q1rymw61ugw63j',
                channelParty: 'gkd909jzm4uyp905j9kpnntd21n0m2fb1l1rpyanuopuhhvc5aseomda4rh3rzi019j49ez54rrg5ykcgr8by3yg3aa93up1rv3m42my41inwdmwd9fem08hom29rxwx9j09iu2fga5eup06r959dr81b5zzizbd',
                channelComponent: '2hfnihw35hfysxpo46xgqx8cfzpjjv0ixp1jrsopcyxosd6zkotaaudtavl2e11bo21kvncp2fhvskrfjsvntvf23xen17105aim6k86zojbvrt8jfchzab8o08txino89vuw4i6qop0b1y66si1ze5hdl228b42',
                channelName: '1mdgjiwnznggs6cn5z341xfrqopk5lzsgegimwcnjooywzl0xfm4xrj78og69qgyn4fl87hr5lykqq3cxkiwwy43wapfw56cce4wbj5jtrazcyfst3fdi29d8ulnoonq3w4u37ha1obs8ys6jwvdt51hncwsps8r',
                detail: 'Explicabo mollitia id ut rerum molestias. Rem aliquid laborum est esse. Quia cupiditate doloremque praesentium. Culpa minus voluptatum quod. Velit accusantium nobis commodi accusantium ut fugiat dolores. Sit tempora modi modi dolores officia aperiam similique.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 's9ajueyj96vzhxty0tqarf3fladkjeh3o16b894kx7ni50wcld',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: null,
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:54:05',
                executionMonitoringStartAt: '2020-11-04 12:40:41',
                executionMonitoringEndAt: '2020-11-04 18:43:00',
                status: 'SUCCESSFUL',
                channelHash: 'l07z6byjbikcmhy4xodvh7avf4wiu102alcet0r0',
                channelSapId: 'xz4baxlrz3zg0rhyps2rt7cfupiiz6thk2809x757itrh7fnmt',
                channelParty: 'akvz9xzho68vbpq5sv1p0el75wguqt9tsp1nsptced8dh0vyw5b2w0wym6mw5d6ws62lq1s7t1xxr4ovg8tv4veutbaws1lvkhpg8yzy4m96zlxutakx63lpe6wjjzkfa3f7163dkb15hukz6ly0zofddl6cfsqw',
                channelComponent: 'q4gh2iwmc3tde61nirxy11wuser05w0nuwkro1ym0s5s116ofvzxgborntsvah0xl5q79iop3eq5em4s1b9qeen3lbvcoll2t89qwmen8bya6hhq13g6sfxxfiq624tkg3gbwnswmgu5r1rpidalwasrtsmdoqud',
                channelName: 'x8yaunj3mlbmr6kiuzsgmlyijtpffq9qf4q8f02b1u6t05pqupiuoujdmksleqm59vm9ql3gajr3rzkxnv498vvyy9s9j2zc3q1owauu30u9hdb7eje2x2fu5s71ofebpqz8n94gny9bdfxqbtaswt53theqs2x7',
                detail: 'Harum sint dolorum vitae cum. Incidunt tenetur at repellat dolorum similique quia hic vel porro. Totam nam aut occaecati quis quia. Dolore unde facilis a provident vero. Sit dolorem itaque aut vero voluptas ducimus velit. Odit enim aut voluptas ipsam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'apdbahojdqv2a5hvnzkgnmxg7ygk8wh5muw4n5s9h3zh2rbhcg',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 21:35:24',
                executionMonitoringStartAt: '2020-11-04 00:31:17',
                executionMonitoringEndAt: '2020-11-04 18:10:11',
                status: 'UNKNOWN',
                channelHash: '1wd0beelbsr3k6jokv41ohcimjwefxgnnn9cgi0f',
                channelSapId: 't6k1xqkbfj5im5dp641ph3yfltv7bkbwghm822cl7w0kmkh0nw',
                channelParty: 'r4v93avvytp60gpuxm5r7dlfm0gydtiuyhqr52ei6qpig08v75r1pfp8fymqijmtsxvkq5jtm84sr9z1sp4b0q169eisk4ttreey8ft134ghubvzkx3w9cqa5h8rwq77wosce9lauitju4bhgy9adfx0csxy5xzm',
                channelComponent: 'f921gfuaf5sg3twpk1nus066a4zs4ulg8xjnvfnsthqanw2bh9ak7cwpmw2dh9uj770rgeawok4dhjnyler7jq1x6zlqo6ndanb55c1flaqqeooizpkpy6hocsmcyj04fpavbo4heyz7czzlizl61np8vjhd9o88',
                channelName: 'yf1tf4m78pzx5ubsbpfxab8sfygbe2pfm5l2p3q612dqe7uvodoy50021q85a2l26oh3xvrji5wbfjm0oyxoqzahg32lcs1mtvuvugmmgv4782nm3u9gopjasd5otm1r3pa5ryafgs0cyvlalerus0ss821k83yj',
                detail: 'Reprehenderit assumenda sed nostrum soluta enim dolores rerum esse. Enim dolor quas officia pariatur aperiam explicabo aut. Architecto autem qui ut quibusdam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'eehrgszpbrqhpjvblux5ght4il3mtjcewb72bfnnfrhsx1yby1',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'k15xyaxva8lkqki7em4s',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:12:59',
                executionMonitoringStartAt: '2020-11-04 11:49:11',
                executionMonitoringEndAt: '2020-11-04 14:25:59',
                status: 'SUCCESSFUL',
                channelHash: 'scp55hm02hc4egt930q6310a6mydov234pbyhut6',
                channelSapId: 'w3ocl18mv6e1iewy9w5vfdo82o5j6upge23bfldz4qyn17f40a',
                channelParty: '201y0y2gvlzpfwcsvg8z3sdvrnz9t8p7k9bx30p93mlz2hgaunkiorgvdl1jm1vyskmxbga8vt2b7gs1ai67new90fzhe5ifmou3ql6xjoyzdac1k172qj97shyocvpw1y0r7khu14tm69sybtxfkll8icek7ka1',
                channelComponent: 'i963rv986v8a3xe3ruciog0oq2f48q036wzp8ywould3flv4wizo98b18lmrnb4r5s6jhhbtlqjyhpsvjd7o913xtd31ufjfmg8is1dlt1el2r2py2z1o0sxmyv7g0kusce21n7qjo0vskpe5lzcaw3zbtys8df3',
                channelName: '2lir4mcu0i3xubx9tdjkzm7jxf5yof5f8qh7r2jwhiv3dovzkxqtbun8wcplzj1pptudd5ex6weysy5dknojl0ilb4h3pkdtxz18ull4yfyuurt1gca6vdq2x0xtwhrgshb5l256v6wuttvqgt3jfqdglqjc8kyi',
                detail: 'Quo accusantium perferendis porro hic. Eveniet ut eum velit voluptatum nemo soluta. Voluptatibus error qui maiores voluptatem nam similique. Qui nihil aliquid ad. Voluptatem aspernatur excepturi. Numquam cumque hic ut dolores eveniet numquam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'rj3hqaqhioi4dvtum2ut1q8bwf0kvjuvt20f6wuagbkko1v07c',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'scesykhsne17k6i3488a',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 11:44:01',
                executionMonitoringStartAt: '2020-11-03 19:48:48',
                executionMonitoringEndAt: '2020-11-03 22:08:11',
                status: 'INACTIVE',
                channelHash: 'b7u8101lpoi8vht7ws9b5ot06e9gm01kpjcz7a8d',
                channelSapId: 'wvxotm3o7vjfxrvzvjpty8cru846vixh7m6p935wux2zk6xvxh',
                channelParty: 'yitp3aaatkpisn5ip4cblk723953ix7f22c9khaixayr09cf4g4g4zwswra0zf64isdv0qw9qnsr3qosw99o5p3bki8xf62x06vg3daera1yfw4j8e2limnk1q5rkr7zr44q4zl8zswug3jelic2827z71k59a4z',
                channelComponent: 'bzz54rgis5q26l8agyfii254n0vht4okaxck81q4o2gfj2gpudzlz6krhhugibw03rhcvze2hoc69mxdtr0p3v28x97sm9abojrv3cbbkjtql4oxa19gm0ftooz9lz2xvuio5sqhm3j9tbm62ht7hzqd3ftmjazx',
                channelName: 'u9n2adywbyejspgbds04mb34iefgeqnhp4pb3ap86l5juq2enb3y8njejeuztk0gwbn2o0c4hwtcywawlkne7o5hzzjlzvnaq19hzvt92u468cbnsfftuv1aqhjxbgw12l2ccjtbjbv3ab8z6qpgq3n5o1w79w9h',
                detail: 'Necessitatibus rerum perspiciatis expedita voluptatem architecto alias eos magnam voluptas. In maiores qui qui. Dignissimos illum quasi voluptas quis necessitatibus amet in quis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'f1mis7jpbdfb4j2bz755mtjqq6t5b4ha9gl8tfztjm7kixqqpi',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'khnpzxfv38vrpkcx6lv2',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: null,
                executionExecutedAt: '2020-11-04 11:32:37',
                executionMonitoringStartAt: '2020-11-04 07:31:28',
                executionMonitoringEndAt: '2020-11-03 21:22:26',
                status: 'UNKNOWN',
                channelHash: 'k30d1my9ty2qpe4p8yvemt8c5s60yvohw9df21da',
                channelSapId: '7j4t7ecsjt824768dgncpu4a5w19p8nbgypj52n4hhiuyyta7x',
                channelParty: 'dkrqqhcuvpi2e5cga1pt9ksb61lgwiicvaarel752m2yjbmc3bxgb6akijxq14ev4svqx5mlcw4c1thq3qkjfv77adrfjdk8bdo9daxevt1vab5eitw0fesx64g74k0ocog9zeh5mp78ysyq0f1nlwtiqzi8u999',
                channelComponent: 'suc2fjvnwflgmvtlr4kq1n4f7q84jf37khatrkfdr65o7ju8h36d0l35mmtp49q4ek1t8pyd9nalffida8kilhb82hmr4ncher7l9rxe8g5dpawk46xvbacy1awr9tq1w3y2f7fs69nn7i9ssu41wy5rfwl8scj2',
                channelName: '59vz900h1bgfkftowcd2n9s8zwn6vqmkwxrphl36oz5f5nm0ts294s6qck7b0c1xqzdhl5ytt2u1kme7wip192moortmj9cw1xxaq4srnlc92pakb3bkpq79f9zzbde9nmgsh1omtbn03ze8cbr02k1coa8omef6',
                detail: 'Itaque et voluptatem iusto. Illum ut quis rerum unde beatae consequatur placeat ipsam est. Nisi voluptas labore modi.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'h4h4jcwnu5ljskr8birmnz4wkoi79p6vpgufa42k9z44e9posq',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'y9nz2lby2ni1vf9juuod',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                
                executionExecutedAt: '2020-11-03 22:44:35',
                executionMonitoringStartAt: '2020-11-04 14:21:57',
                executionMonitoringEndAt: '2020-11-04 02:44:46',
                status: 'SUCCESSFUL',
                channelHash: 'zig60cneon4401z0ym5fibhf3eukz3jzwddnpf5u',
                channelSapId: 'zdecxja1wsmpm3hbs2sqb1hho7diarkqkzioryxgnroc6jyz1q',
                channelParty: 'dj2liloi5cqodds3qd7jgkkoh4y0gc6e3l70v6k9yvelo5njvhpl0eo8oe3b1uhy9islpxpxy4qza81cbauws118q3zb28iw9m69zto1979lptw6zemlm2xa6p5dxw10mykg8vseh2270lbugie6rudp1qgf7ccj',
                channelComponent: 'lqhyydfzg4xgl438wyy0ylchzsocwdzkeicifwyc3ef9o2wvpkcg8bpgo7wt6lnusbbwgkmq8zrw5pxjmtm5hhv53urdmuj4jjeyswj7nm9a64indn2we1ju0hz22k3ndnw45kzdshw24bf5szdxu80qdyd3qk7p',
                channelName: 'ohz3hfrzqzaj1x17kcgxlczgvyh41tdvjellrrpyhq0yvq1xb0kfefjrmi3ln4jov35gokl3lx6mvggy2eilcle6tejqr45szf8t4aevg730lc2obwz28pn54ec66lr2v7mos9h1dyj84xzfewljdjh7xa7nijkk',
                detail: 'Asperiores sit voluptatibus quo voluptas earum minima ducimus. Rem qui dolorem placeat. Molestiae illo ratione quis distinctio corporis soluta.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'hob02pypi5xmz85ya3qpi6yogflfhc4ynowlykdfua02h1lb6h',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'nr19gfcxyoo1bbhg2xpl',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-04 11:30:17',
                executionMonitoringEndAt: '2020-11-04 02:14:56',
                status: 'INACTIVE',
                channelHash: 'zrncd3ztfrqlocp9uyqd3yworh9kk60s5hstuzkm',
                channelSapId: '0gcf5naltftnhocisulteclw6v4oymxcvncq5n0pbkuh1u7nyi',
                channelParty: '34qd35udjxuwljog48iylgj4jubrq1uit9u7p20rmrirxsovkapx2cws50g4beukxveqh799wm0yh8kip0x6c06uxyxmteuv8c2rq4xrbzq6vx7580xutya36q4fgqwjyf0fr8j4duyt7sf2i8ghwrdi8zzk02tn',
                channelComponent: 'bstqkgl9mu27vet1accj46akauvb9ntanxeguxsi3h0ywanpsxmesxhqlg5wlqy6twtpf7jl23zfijjdf0qg5sgr278w9zz32iexolzvzbw4c88aap73hpagbw2b1k55prlq3ozl3bsap38l9n956z4mpuorlcsk',
                channelName: 'qakp3my28kd6w6yzl1tp6souynh8qz6ebbbb0s7rxyctusk5gmlhr3u7jsjmmvkyvwf2xdici3f20gidr2lcfbaawjkhnptzcktdkzoajhnd3x5tgio9t48e2g7ucs02jo0i2fh743g6866aj3yagqxjlzjj97qb',
                detail: 'Excepturi sint enim eos et quo officia et. Ipsum ut est esse aperiam enim. Quas aperiam odit qui iste molestiae maxime. Maxime vitae non est autem tenetur eos.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'ylf1yjhdqrwfqc5klo8c7wlpd1u5bbori6jx00v2vy310dn3pt',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '4zys3gbqfi02niafrd96',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-11-04 10:03:19',
                executionMonitoringEndAt: '2020-11-04 04:22:22',
                status: 'UNKNOWN',
                channelHash: 'b89gltkauwdlof4c4e8fcvpmjwo5peibmm5n6jq7',
                channelSapId: 'zso3waoh6llvhhvjvb5t95s0smbqhlbnm8zwhhw85xwod8wrru',
                channelParty: 'ymxryq46c1ymb48ibnmjpirwp4yhdd06bmycpj6v6ltmeh13646xsbsaxyra2lbu8n4xm4m476t9hobb58yogs040imsliszkxex6ev9xvfkdjadav33cm712wn1xf4zrdq0zfh31r3ol7e0p22afadcvftqf93w',
                channelComponent: 'ateiwvui1pvpyb5cgjfoy9jld7yhz9zkv0ai35voc22vyq0upnixd6wvsktuhugxcdv3fsasdg0z3kq8ii0t681va73gdetykdrr38q40jrummbfosq72c6431hpy3hpdzqftfaiyvucncjtxa9h0m5x1xumx7qr',
                channelName: '84px639tf5grv78d2vzoaku7idff7dmdeo2aw9xavmeiib60ygwgcu5o4dgxtqq0qu0w8ygfj7m2nbjt8t54m8p2h16qcq8n8ogownfjzka84m6ecmha4hujw1rfd2xgq7kcl7o6180pyupmp3h5wjqo4afwcycf',
                detail: 'Ipsam harum nulla impedit vel rerum hic architecto inventore officiis. Corrupti voluptatum vel occaecati cum ratione voluptas. Sint rerum dicta voluptas ad omnis. Amet fuga ad et in voluptatibus suscipit nihil eum quis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: '3si4c1hq7ykstpiw9jra352kbfs0vzsmwgonnfo5jrrhzcz8uq',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '2phsmtk5baw1ng82wxat',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 00:24:14',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-04 17:31:49',
                status: 'SUCCESSFUL',
                channelHash: 'updsvu30r0ln3czvjhqe2ynvbjxumbzx6ql4yb4r',
                channelSapId: 'wlqf9dcr0xxg0hn1fx7ecocgy0oeutdaofzeu307b2fad74cya',
                channelParty: '3xsjyskpby016wcpm5j99v4v96vwzjpil1o7ood4agat0dlqwgb0npfci265mrq86x6irq5yf4jgy0ypsowmhg3ee0oklhmhcmhj4rls16jaxe7iepwj1jppojb5qd5yq6mp4qjv5v3cl4kaqwpu122nhmlgq7f4',
                channelComponent: 'q5su3j3u6xqmi5ubuextp0q69zpo3bv88oae9jn33n485qfqtjvyaev6mxg3gs8ftpcleqv4htcnkcs2xivlnh7nox4z2ul9l2iv6eu8un5wd9e9u6jxsvgntk9678sn8x286roznpa78w3v2vkjogafhws2z3qf',
                channelName: '54xabwaf50a2ovvyer7t98y8fj1z4argqajt8pv8wcpnnft7p2lrbh4nx5xbzrbdrd5c0m91fvcmy4rd5g7hxsq5j29s5ph76cmbyh5x8xycg1ksuup5cr1t1u5fh3fl4mq3y4i333bxoijqtd28u6wau90fcqpa',
                detail: 'Vitae rerum et aut sit fugit doloribus. Provident et consequatur nemo. Minima minima id qui animi est autem est modi. Ut vitae non qui est est. Assumenda soluta voluptas soluta placeat voluptas nihil. Ipsa officia inventore impedit architecto veritatis voluptas rerum voluptatum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'ax2bz3n0ywbg3azj6adx5p3rymhjz0pi3p25c1gzrcd464bbqc',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'vbedwdl8il0trvhz9y4g',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:16:03',
                
                executionMonitoringEndAt: '2020-11-04 04:36:45',
                status: 'INACTIVE',
                channelHash: 'qbs67j6jx4fy4wyyzoylmmmuh0xiupyq1bycw8c0',
                channelSapId: 'ty13ww3m283vmyyjqoc2ppvpzvnl8773cckyzkhyoyzaem4shn',
                channelParty: '1ci44kg21iomwnq3aqs3wrlysl5qj4tnd6x62av8pu9dn4p8j34i1y1hvl2cu807vwhbf0d3xb5xwvy1znyvflezoqx1bapzjvgqh8tux3798i1bu74w47a4nan6jpkan6q4ou1gr8izvwopzyazv1yvuzofu7zi',
                channelComponent: '555403fhxxz8c6ow3xfhtn4f4xxlfy0nltaoroml1lq8mutu1ckt7i0l8m1n734bnwuelmbzpptfyl56phgas34xfq6fmm1wnzklv0ui3j9u035e9sjefzgjmfvvrjti8wblmg82vawxqbprts4j1u2sx34h26gn',
                channelName: 'gfhgkr5gnoqxo36x8y2ft8cvc9seqiwr43jyv68ra0r16d6lqqpn0sgyuo0a72d6jq062rx5sh9ujxe9hivy2t5mgjfeucry90jb0r7xgzkvn5s4krjijlu952l4foz7b9anxkfn1v9swpyvd1li4j1k0v9awsth',
                detail: 'Occaecati id consequatur esse nisi qui magni pariatur. Exercitationem voluptate quos. Odio dolore est delectus qui distinctio velit nostrum labore. Quo qui consequatur velit id cumque possimus molestiae. Incidunt dolorem sit reprehenderit non eveniet. Placeat aut est sit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: '931izdn1k7hygacv4o7nt8l7ri8ag779zu88z3p8znu9uq54bx',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'cf9upcgcfx86i695m40f',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:13:10',
                executionMonitoringStartAt: '2020-11-04 18:21:40',
                executionMonitoringEndAt: null,
                status: 'UNKNOWN',
                channelHash: 'r6xsl71xz62z0y1jtggmarekqbe5ebslddt5lbym',
                channelSapId: 'xxi1934i408bvild02j65bl1ffuimk6e0ikxe9fioyjzajdb4v',
                channelParty: 'wzpdtetqjda6fi9wc30yf0hlqj4h9f7nu7bx7mmvj1sptxl2m4871ok2vppwx2c32u7e6lydhu0fhm1y2l9khtgvg5xaxcww2t21z9m93i696jb9ty6bo6v2ea6xoxsowzsoksnj6nnimqgrtq225zc42o9ilqnd',
                channelComponent: 'ex39yhd4pb8k0h703dx49ap1o6e53enpjqjork6xga6of3iny3km4z5n20fh4yufsyoftfzyyy1fwwwfx1d3alfztpm69h14fvok942m4pni5kv5054cuh204vy3efaynggykdig2d0001a4f6yltz8bo6kmjvx9',
                channelName: '8f8up1bcndj70acjlccd44rbmwja8t394axw3mw4xrpv897s7jyny7hyzf0rumzcajlk85wnu2uh7c7ic1qgpuki8pmnfkjxugz7pvrxej66slubwtslt7m9jsgf85tik9wx84mdbe0vtbov3xwmy28me3z7gixr',
                detail: 'Ut sint animi impedit voluptas qui molestiae ea architecto velit. Facere illo optio vero. Sunt esse nihil consectetur. Nam unde recusandae facilis eveniet at aliquam laboriosam labore. Rerum in pariatur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'aqul6w74uezx6a7glysfgz1wbhosy4gjfw6t7dxcj8h4i2y7gn',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'fvw058jjynatb9hkkyki',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 11:54:12',
                executionMonitoringStartAt: '2020-11-03 19:53:37',
                
                status: 'SUCCESSFUL',
                channelHash: 'kxikm0re3aaiu1engn5ogtopr4uzudwanoby4cjs',
                channelSapId: 'fjojy4a75ixn1l82bl3tcj00vfwh35zyq8astmci33qw27bczj',
                channelParty: 'ur8v82ug8poo0smnnazdouel3ej72kqax87qbcjfyvc7skzeqwboqz1qljl27h6roj2qvgw8mvuj3fvmdydqx78hvelwxrfglt7d843xnujw3r5iowds2l7ci2xxwof1ph5r7rm3mme7h9pgi1rtne0xtxjju6xf',
                channelComponent: 'anpvwjyj2r8wg68p1qyux6i0ra044o5n75xhsylyofkl9jm8gayu0sbrrdp95qyms05wyxp7z9jkz5b8lspbva6c12tvbbruw2l4oos7cjm0fyfekcz3oz8uwcljragf4sxb61hm3u2labzl2prkc24ltknv1xa3',
                channelName: 'wblmi7bze9zsmv2523kmomjdrd81rueggezbx4mrvukwj3pdz9l6ww28za26wwbzwz8mc0oi6hzzlm2qnej40iisqvk5przo1g79am8ncc9aci5sy4gog1za6fp087v7pzj5kpowqgo62h9t3bz23ywr73sogqpl',
                detail: 'Asperiores omnis voluptatum occaecati dolor. Ad at animi dolore enim qui praesentium. Qui est laboriosam incidunt assumenda et ea. Aliquid quaerat aut temporibus qui consequatur perspiciatis recusandae.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'opfgmn8ndu8xt0ui6dbnljfff7gaepy7gvvwpp3mgwgi5eje4y',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'ok5dd8o5u1adjub9eop0',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 19:29:46',
                executionMonitoringStartAt: '2020-11-04 15:24:44',
                executionMonitoringEndAt: '2020-11-04 05:43:56',
                status: null,
                channelHash: 'pu6fljycr4tcu769m0xu52j5zjrbguj094nnodot',
                channelSapId: 'ag20vku7p2udlyxv3oxkeapowqr3yx4zqdyi0wij0zmb34ojbv',
                channelParty: 'hcaf76srha0b3p9xpni6hjfa92hs96knptvngq98a4lfewbmiaxdepyjub13qqqg2wjl4boh3y9di6qk3wg2hbmpf3gafvc4hh1j5dtc1idwn54p57xdv50ujdfxn6qidwh3kz2r2zzjgdhpbrtfsw68lup04y4p',
                channelComponent: '33ka7ah211lp68qqmfei513nd7n7ejehfgluolt87v6997ml0dw2dzwsjasip2iawypv1lqkow8oobng2j055bsp8fnsrsawh0qsrougmblkwuoevz1dwsbw2nlza8rycgzo24e9r9whhuypfj9467qvxixzv8aw',
                channelName: 'isla7w397mzg3a02bpt1uv379h3l652ugcr21m4ehotmgsghljxd9gbldvdiongdmn4qizi0oy8rknca3jv94n56i90f30d831tanyjkki9phf9g86l91j1uo7liblf2n5tusjrev5swcdxlxhxdtkalu14q9b18',
                detail: 'Ad non expedita error corporis. Quia ea consectetur rem ipsum necessitatibus illo asperiores. Aperiam dolorem ea vero temporibus necessitatibus. Ut omnis magni voluptas natus quia consequatur eveniet inventore.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'f283iw3qal76lkzop7h5wzh4go0ftnlxqm217tqs1hglqyzb28',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'yjurmeqkmpucnuwokoup',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:16:22',
                executionMonitoringStartAt: '2020-11-04 02:59:03',
                executionMonitoringEndAt: '2020-11-04 18:35:06',
                
                channelHash: 'usy0qfoj260bygnc5kevdey7l8jpyx6snxxuhvwf',
                channelSapId: 'ltw6jumho49ubh50ijkwpab7idurmdpvus9c40eqi5gnvgy12l',
                channelParty: '7nfy54134fcfl2juushiq1q5yvp0awx6jd9vzergjuwlijr39hmnbc7q5j406t44716g008jkdam5lxmoyi7gmsl7bwhsrqamonztj1oo2i4de6t65shdeljprcxzoixg571e63c40p3qhtow27o8ciihm2srpm2',
                channelComponent: 'kh7zmjbjc7miza5qsj1z69ku2pg66tf6asudecn1whvhowjfi978iktmzxuazhhopexn9j22bc2axnpifjlupi7axqh5km7qrgl16fzeagcnuxdkjpdqq89fkti6dx5ct5f3ugh5u5b32m3zn25vpiyq9y9zff71',
                channelName: 'b9gz8gts0cht925oby7s9oym3fh8ql9jsem8z5zl73dognzfjpohjbdlwn8k0c4af9rxazunybc464dakh5ulsws9e93jjoc41eegboveipdln877px62m6yrgznajefkaz3m0opctbjjo05xqn3u9nq54lx1kni',
                detail: 'Nobis possimus consequatur animi beatae delectus praesentium dicta. Dolor ut illo. Autem nihil distinctio consectetur. Est et ipsam omnis sit eaque aut dolor eaque. Nisi quod voluptatibus enim.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'ckxf7h6npuzza2m18fjoo79jj1wi9irodd1ndniu9x4s2558k1',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '1ytxkybpuaoexrx2aum9',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:07:49',
                executionMonitoringStartAt: '2020-11-04 09:08:01',
                executionMonitoringEndAt: '2020-11-04 10:00:30',
                status: 'SUCCESSFUL',
                channelHash: null,
                channelSapId: '3a146inrs5jnh76lxrpt72avn3f7x6ueizktaibojnv8s0mkus',
                channelParty: 'i5fpt0s2wzackvwveu7i9slhz1fcsnvn717o6krf89yyjm143acvbfrz5wgjf40sx5qe0q0xr30f9ru02opwtukge748nqzb5zjhmmpkpzr58pik319ryx0cslffqyv7qbcz710vwmzrg8lpimzr80v5eblznc9j',
                channelComponent: 'espje0d7b4fqsk33hgrp7wak910fdm014lk9ni1d9e3v4qdg024kmzl7kch4kq5lijmw9pcgsdsyr6rnkhwhori001iswjguh1iyzwg3c0fr7zkegxmmbyh3ro39empcozo2z8wku9t8udpa78gl8bmbz7caufgz',
                channelName: '02jpo9osrwv6q3r3k18lgrceuzo5bi17c0qswv03oog9nr0dmx2ez7a5vs3l5ofd0uvt3dhh0jttrjnbex750v7lg34rx7unsilp76vf3g0gowzak1scyp3p35ib8uw4mzgof2f9ojwl2xfin77bl9no8wg0goub',
                detail: 'Quia quis nulla fugit laborum at quia. Dolor earum aut autem laboriosam aut pariatur et in. Magnam ut debitis cum accusantium ut. Vel est ut aut dolores repellat voluptatem in occaecati possimus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: '2ul59tcgu76i5bczu10qszhjx4p3axuawjxlaj2jyq5kdvsveg',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '2qq3ewde5ljxncnm3ku5',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:05:40',
                executionMonitoringStartAt: '2020-11-04 06:05:04',
                executionMonitoringEndAt: '2020-11-04 14:22:13',
                status: 'UNREGISTERED',
                
                channelSapId: 'cgrl13d4migoommwlblzkzr1gprwrxbxrshn9wtukejhbt7lw9',
                channelParty: 'wh91dky00s1exdfxzl1ams1yr39hf88li5n2lnrelzcuvdxilgq7vln9cbxf5tg631qj8d0n06umrwhcnxcw4ulo44fykdklcy5cwyb3r1g8p52duw5mpdxfjmc7a88fl2rh8agbeba56t1gvtimcm3fojdb0yir',
                channelComponent: 'qico1unbx9ps75px8d5n6yjb81tujy8m8tijjwayofzn69qv8ez9w2c1gl1neecupa46k29kzm2fpougrxc2l3vk26wt82y576eo7h0w1p3ven0jg2392n3hjzol6mnvule93ybyuvrnd8ph4gxxxh5045im48dv',
                channelName: '6velcfez01kynnpkatx94uigz1u356d0971iqcfofov4ctgt70v4oblovvq4zuoxrbykrgbxpjeeddn0m2j3u9frjcmjb8dsfjqjfqgbr73ovrp23btmcagr3miiemcfx6dyt8jbcxg4bqjj0xgge279pz20ppui',
                detail: 'Consequatur temporibus quia rerum similique sed. Aut illum quia. Reprehenderit debitis optio expedita maiores et ullam id sint eius. At facere et enim quisquam corporis ea qui ea.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'wgtfh8nwqfhx1945rrs5h5xmydkvrnv0j3n2mgr4ghiw19c473',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '9igx81b0dqfyxbn1k3vc',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 20:00:16',
                executionMonitoringStartAt: '2020-11-03 20:12:51',
                executionMonitoringEndAt: '2020-11-04 11:11:13',
                status: 'STOPPED',
                channelHash: 'fcqp5qthsp25p2lwc85ec764r0urzhytykmuqyb7',
                channelSapId: null,
                channelParty: 'ptcu7qc6snbn7mdriysuz0q9auq5ndsdhy72ce4tungkdgimd0e2zqhacgaxozv1yzx3sdepctirmkvii99zbi26f4tuwj6dpg9nlyrfp2l891fqx0ekf2sb0fnjnean0n5baepwsxl38kdm3kku03d467yzb1mj',
                channelComponent: 'g35112qgsf0711xvhkzrbwthtosep0o68yksjqr4fwyl281voqb0ccn1zvjqcm1bx807a7iq1gigjrb9b9gf9xkel8mvglc4x27mkwttlrgalbmi1o3bv27mmum4kzgpbioaay98iv65g9ourx1o9hqe9h3zldko',
                channelName: 'ev0z8u7fs1oocmn4jkj2x0bq2nzi67so0q6qaodtc9uz5sjxozfhcjn5qm1416y37rx0gc66sm0f598w81f6qrr7u45555in5zwynif17ba3cbv69rpj1yzep4mvw2g9o4ba1hzo5rochjw4kr79mupzwttamkix',
                detail: 'Necessitatibus delectus maiores quam. Aliquam et eaque consequuntur velit libero voluptatum et. Qui porro ut odio fugit asperiores libero quo. Nisi omnis laboriosam quaerat. Ipsa dolore ut vitae.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: '15zt38htioih6xix95d63bpvncenuxn879i3fiqkswkptbxb9l',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '9pfymzfmsq0skgv131kp',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:10:01',
                executionMonitoringStartAt: '2020-11-03 22:08:41',
                executionMonitoringEndAt: '2020-11-04 16:00:17',
                status: 'INACTIVE',
                channelHash: 'cz3hfiwi2qes3tbwhlx01l5zfx5bblqyfx1zp3j0',
                
                channelParty: 'i484x39ixt3k1lml89oxo3u3mizqbu057u18b2xxn8oqce5hyqz1fi4j0u2yk2cspwos09r6p7mjib4qgecu7rtsd0r9ywvoct466ddmyzcwdf40y9xovnfnyt8rihxk5hxkdryfzot27khfbglu4c2h5uixkk1k',
                channelComponent: 'hjs7erziuqqddjbf8kj5ohr9tff3e1bfsytdltvgr5i5w60z9n3liek0e70pzxsab98h2qfarlj9avhxit7kt33oslhe1el0gyf4swupw6rdyudn43e62yvn0tl7iqinp4ndf053sxz4uypypyup46nwv7spawho',
                channelName: 'huxnu97sbjehno8im57y4t2b9ph82klu7pid33ssp4z0j4lfcfjgy0375x0xhlmr45cokr631hqzm8hnncz8q2bq8m4pmc8992y46n4rahsux3byqcq46cyiy74pntls45ye61geifmapnznsfd3ihiyei4yohyv',
                detail: 'Consequatur exercitationem temporibus eveniet quisquam. Quia ex facilis deserunt laudantium voluptas aut est id aliquid. Unde velit ut. Quod eius quia qui cum magnam provident et libero quidem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'uhl8kg838a388kxsizaldxj9ln0sejyxd5brnotho00cx60bg8',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'kvxf1fvo02dnwwl1fgfe',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 19:08:34',
                executionMonitoringStartAt: '2020-11-03 21:44:20',
                executionMonitoringEndAt: '2020-11-04 18:35:54',
                status: 'SUCCESSFUL',
                channelHash: 'nzymigbzd9ad734fw35pcaos5crojywytqymmy0s',
                channelSapId: '0i002ew37d85qb9dphcmgjlfcti65f4mhvqv2i99s9xg0hphmv',
                channelParty: '42ram5ogx74pqovnw6v1pks41mumnx2nvnk97kdpj3d3ia3qxw01z4w0ihe8nx4v781v0hukitvr7h2my3u717cdm4u0yx7j0n2lfe1lhw124uvslq31gugtpw6ax98rwcllyf3qv69vfa0ijf1gh2alfa3f90m3',
                channelComponent: null,
                channelName: '9sds1nm9rrujcb7u65s754enyx643e735kxtukha4umscj5d92jhu0p2qwrztpgbgladseut91uh2emd93vu1u0kxz0yl6dxqekfn672u3hpwz2fohmiacncbk6c0us074gn13msj65n4923gnhipsyvia8u18a4',
                detail: 'Quae ad aut fugiat molestias. Maxime sunt et libero deserunt ut distinctio omnis. Qui nam quo iure officia cumque.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'ouvg0m1hxdu12xabcpmrw0v854cslg5fq9nof2m730g01z2hb9',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'dc2mh7x8r8n1373666lt',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:01:42',
                executionMonitoringStartAt: '2020-11-04 13:55:23',
                executionMonitoringEndAt: '2020-11-04 06:05:54',
                status: 'UNREGISTERED',
                channelHash: 'ij148yvzixmx372iagzn1x6l37um9vu99e2zw4x1',
                channelSapId: 'n7e7ali0bovsvuzwcei6mew9bt1lnbizn4n2b3g0h9narl2l2o',
                channelParty: 'vc8rimr9ts0h2oejqoqj2gul2ddjy133260glb3ea71gcue1tbb5r6opgu2d50x2vf8ov5kg203zr6qpb1yjmdafa9fwrk87kmiuyxe35spb4rhd62bc8pm2jmilf9ypy68unnckiczdba3kpgc23dnmf3li562r',
                
                channelName: 'r2wo2lkm772b6uczhskodymdqhbu0uczjrko94iz4jnnxxeyj8hy0qdiu30fjf9vmfy3dss9zc1uqgiqm1qv26jqwsvpd90kizd6tg16n3emd81lpp3parriy2o55jbz0hgajmpa8wp881hvz9mdpzw3la4rfctw',
                detail: 'Sunt aut nostrum et. Eaque minus accusantium dolorem eos quod voluptate consequatur maxime qui. Nihil deserunt mollitia asperiores. Rerum non perspiciatis. Quia magnam voluptates. Cum neque possimus ut veniam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'xfzo74u0y1mhrvcyaynn3zvbfrd2cnt2uxrqhw3wxxzfkcoujx',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'qup3ni91besqozlevdt4',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:03:13',
                executionMonitoringStartAt: '2020-11-04 13:05:53',
                executionMonitoringEndAt: '2020-11-03 21:29:35',
                status: 'SUCCESSFUL',
                channelHash: 'jg9qmev38991zrwvc5ww54etjzjavdu0xhivpg7z',
                channelSapId: 'm3rxsw1zg5i5uwcz9nen6ias3ptw8l3cldozoo57j2ed20mh0i',
                channelParty: '6g58m5cc4q20cgxonof690ox3qqpyow15xdoebp4xrnk2lghu60aqw0vpsi8rbc7dkvt1e7hzmmg0llomynkt0pw8fo5y46gfl1c9bgq4vkkul680yyuzeha2eqivxuxrf5aqssjcpyhgdffz73w4dhwtpflnaa6',
                channelComponent: '3e9za865xznni4u9dwh83xtdkf8wyiq1q66sg1dmqhlinc5nsgticdtox3855f8shlnluc0wbrfc1d1u68mnu05oklmuher1766p2w5rqtrowcxgmibrx7pp40q3ag1p5izezgm68l266w3gsf8vmbu2zwbiymn0',
                channelName: null,
                detail: 'Quisquam sapiente natus dolore voluptate reiciendis beatae quia odio. Provident qui autem asperiores porro debitis fuga aut. Iure odio sint suscipit corrupti est omnis. Cupiditate voluptas assumenda asperiores id non nemo. Error provident aperiam qui sed aspernatur sed dignissimos.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'e6p7rkoxqcwoa8kuxhb3nwnpkfxcb4mhsui65lnwdpnevn21ex',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'nhob63t1b7j1l59jit1l',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:17:32',
                executionMonitoringStartAt: '2020-11-04 07:49:59',
                executionMonitoringEndAt: '2020-11-04 01:48:10',
                status: 'ERROR',
                channelHash: '5zexu1f80xzfqv3d4142735nbic8d07eyry0xxkr',
                channelSapId: 'xuxrbq0sqfxt7r6o0dtinnub7if0fi6yxf1rvml27vwkdx8kc9',
                channelParty: 'i9qtnirqvdx9mw7buqdo8w39du6v4cr5be02k36fglzdvtas22czzmx6nt50yv09keyp106m18y23xoqftixckoi6y3kd7gwer454dhwimuiv075gnr7lmcz8y5dm2sjbedkwmqbuww26vei4786jbbydawybd99',
                channelComponent: '3s7cez64ybj67590x5q20rt7zix5jho6elvr5229k436fbggx54sklnp976c63hft19rtzbsnsmpddsio1ht7xi3gj6ea5c06w62shu5lp7j93porz4kxkbibus8glbthaaxhyjewwxvymanc8xtykk77b8jszxm',
                
                detail: 'Dolorem debitis eaque. Repudiandae numquam neque nihil quia. Voluptas consequuntur labore illum quas. Adipisci quis dolore possimus. Voluptatem veniam reprehenderit eum. Eligendi ut necessitatibus aspernatur et dolores.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '244tdbkoo5yw9fgeoox1bl4j008ybo9qczaty',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'flk8f0vkygfi7o3ybw2yp12clm0r9ikr13jryhtjsao47twiur',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '9orzfskrz7tbdopwq4r9',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:30:36',
                executionMonitoringStartAt: '2020-11-04 03:14:30',
                executionMonitoringEndAt: '2020-11-04 19:28:14',
                status: 'ERROR',
                channelHash: 'yd4ubs4ex05v2yapm8wo6bqtgg1c56qmadpwputz',
                channelSapId: '8dpl71rk52aphho213cipbdq9j9l6h93mrrhtv0w2p8gdry2cf',
                channelParty: 'uby1mw40vxhndelj2dvvuwgqtm1wwt78nh8bp4d1doxcrsnw4y8jerl5rrzn7ley69x8ov64xpv8meq98fc2llgipm0wd2vg3nl9xpmaevoqn7oc1qlmeqivp5096w4gu53m7ws3dykh87rk66sqyugu0tuqeuzt',
                channelComponent: '1475px9e26dc9u7lic4lsgc82rw8dopv74d30cr1j2ctsgw4vp6jjngndcymquwx0kxf1pwufg3tv3b424chcwosjj5kh9oiz10z5lpfpevkwx7qxjqa97le9t8ext0muksmwn4qcea28it8jbn9a0ucthwfu4zt',
                channelName: '3n8spb7m86nieiqu00ep99jt4h0gpsqquhdxmdmh2y79cv19ho0qpd3muaoz6qkxz3ymcb0aaonvino2xx6kau90bos5tday2nuwd4r04fzchapplvhs0bbh8vfw036izhm5wuh6rnx7xb2u8bjqx2stlc98lt6o',
                detail: 'Adipisci nemo reiciendis aperiam qui repudiandae molestiae aut sit. Omnis optio enim quis enim molestiae. Voluptas hic quidem quae quibusdam qui pariatur officiis dolorem. Illo ab ad. Numquam aspernatur quod sint quo dolores. Vel aliquam reiciendis officiis ducimus recusandae reiciendis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: '87tr6ka4aao6650qthtj1ff3jsp9jpo0q076q',
                tenantCode: 't4gklrzv0p9blhvt8o0e04w9sn46toes64kj0cnagymwekl7ep',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'pyjkj7yykcud1sdcwfd8',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:15:24',
                executionMonitoringStartAt: '2020-11-04 16:26:59',
                executionMonitoringEndAt: '2020-11-04 19:10:24',
                status: 'ERROR',
                channelHash: 'avkruqzimyfmyzmeyogu4neazenk51rud646woy5',
                channelSapId: 'kox20qysdpuq10y4nzse5gudy8poqflb5mw2eh6rhrvrduajzw',
                channelParty: '8viflnovf6jjbqqessnyx5jb6c6a4xeood6q8jl0jg2ws4k2lbb9kwmbgfotaedrb4jjffmu0jhmvppr1qbz9f1xlaz0ssvhuakkdsqku65fj6cn8x5jljkhwq8ebz9xdopqipywww700qiiaiye27q30v7528me',
                channelComponent: 'aue2wu5f3yqkpnypkwoopt40hbure1xvfx1as2u0jsp2wgfqxsdgzjf3dpph0q0yu570eqf1fyqu3ixf2w9ar4ntrekx9mace80j2hj4hw0aklrwtnxp92mjh2314wzhww3do4xcd4vm95b6g2gdogvwm2fissoe',
                channelName: 'rgmzsdndo6ryc7p1qjl8ilucjkxujmp3k75qe3aj59yv2qf70iyjarsw9qc86ri2nyxet9sypmb16u8si1b1i2clz8x3102897lfdipofd49maxrds8tot2tals6daoq4hbw2olvumoe3aogcnk6um1tfn9yhpt4',
                detail: 'Iste neque aut. Voluptas laborum accusantium dolor debitis temporibus eius consequatur ipsam. Nemo eos voluptatibus. Quas voluptatum et aut quo impedit. Qui reprehenderit deleniti. Est ratione rerum qui nemo dolorem exercitationem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'cq2ru8snaithcdb4fqrl7v5zu76ds1fy1vsbjsay3xyhgf5p14',
                systemId: 'ia2yonow1mb1967750m2lwlj3q7czc8xiy24f',
                systemName: 'p7m6eb08brnc28t3yx60',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:47:05',
                executionMonitoringStartAt: '2020-11-03 20:53:36',
                executionMonitoringEndAt: '2020-11-03 20:58:17',
                status: 'UNKNOWN',
                channelHash: 'sgq77jis6hn6r6w3ht7jki3gn2fay5aeejmwvt3z',
                channelSapId: 'tmqhp76k6bvvqmd17da96mis023je4ob9vhxss19bi4qn5nf6i',
                channelParty: 'oau9fq1jfpkhvunh47442r9wrl396oun0sughvoba1bwp0du7ez7k50sorw62091mrk3npk2xi9mir81plarm58nnd7jt705q2tscn17use4m2dld92o1ebu5n2zyghoxfr08waflt5c2n1ve4t7ewg5cn20yf4u',
                channelComponent: 'qhnxli8gelu26i3ox4669v0vy203ojboqhufi18tdmrjlrgu1soaqdaticmo1czed1bl3b24o19ht2b897imih782i2h4mw5sz0p4ise8qy49m7gegcd1s92wum3gq5uur1arhhemf7501972x9hgu4089imcwpc',
                channelName: '5l7d8p38uweg467ogzj1g8ovl3og06fe77bo0e62si955wsx0u811644moui6pbdvakraf337hkeeszjyapkyzqom9ciw08ivi6tkfdbdxdnquugbx2dt6bomd5zxk0a3dnq83kz8ezsyw8meippwq00xhmcq5ln',
                detail: 'Quia minima et saepe explicabo. Culpa ea nemo corporis laborum omnis. Rerum quia quia ut et nostrum minima similique necessitatibus. Ab quos reiciendis voluptas quidem quas. Aliquam nostrum molestiae dolorum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'hrw7059x7cegt81f8ap3xi0s6akj9oo9fv1syla17g5s54uiz6',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'uoigpjl9v8rnywjkr83l',
                executionId: 'jjtj2n1yqvjn5are1tukvo6l84fostn5nqafo',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 19:08:53',
                executionMonitoringStartAt: '2020-11-04 04:55:52',
                executionMonitoringEndAt: '2020-11-04 12:11:05',
                status: 'INACTIVE',
                channelHash: 'xbqz7qayttlxs1rvlxu49qhqel5u0slej5xk9p7b',
                channelSapId: 'ibrw3w2u1giuvsswa9sutkz67xrb47hw6459trqbgzedqdsx63',
                channelParty: 'f6stgpcu04r4jocowu1o0zbb5wfpbfdlef39qtqq8xdvhits6so815qtuc7tkvzqrzpph3927uk2sy7usebgdjn80fbdk6cq06t086m5592o0sy29hrthi8girxs7ovznghb2z495l2415j8kk6m31ctu2vxalyk',
                channelComponent: '9gdjbi1u8t4maaztbw6a4357s457mrt6atilg43y5ci7kqup2pnvk9xdpkzmxn0uzdidlote1o85q0aa9tuy47gokyfymnc6g2wam82wb9bjut4mxrabvc8l6nuoyz9je11youxk8khe5f1fy0yut8nlcr2uxub8',
                channelName: '7g3end7ssx7m499donjhllmduakcvlngo50kkm6wgf8zj181rcsf9x6o5kw1upbv5qf0u8xyphps33wfvo0kcjqiv9498qc9db2bfva1m1n77r0x5qy44iwbnpe8cwhaubjho70n65v32hx1g1gm8947p6thswf1',
                detail: 'Voluptatem atque repudiandae asperiores et. Consequuntur illum modi molestiae deserunt vel cupiditate quia ad aut. Perferendis cupiditate sequi quasi sint labore quasi ab veritatis id. Dolorem voluptatibus ex. Iusto doloribus nemo alias sit voluptas optio. Aut aut laudantium harum enim quos voluptatem placeat.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'j7yq86mvlk6v32ezmqfvzesgcfx5efwk8cq5i6z4khpvkpztt7',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'w9a1x7voldu5q0weolhs',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:37:13',
                executionMonitoringStartAt: '2020-11-04 11:34:44',
                executionMonitoringEndAt: '2020-11-04 08:31:50',
                status: 'SUCCESSFUL',
                channelHash: 'zil165zrq5nm1veriyvbqfcim05a2igc0idy2dm2o',
                channelSapId: '2hbej67rmxw145zmbusp398rxhure7aar44yan51wnhcrldaav',
                channelParty: '68br3dbfc3le3knhhhibs4med6wh0711illr0pa4w29hu45zo144qzvy12adv9jvzaru764rh3zafttvqgu38la17aco7x4wvf4xi3x7415wj9stut3gnpyp3okdsmegzy9ohyv6yvf66b6o98osl116dhqpcfyv',
                channelComponent: 'yp847q6p69ypprlrr1bc5wjzgqvj68ph20v9m1owig0vije0ip38prxvvb31h5tbuoib9oxskj2krui0i3dfzxfinljrlwo9euc8falthpmyqqddtn1pg35cz26kzmobudokkbnod34ks1bded7nkjgy26pskgww',
                channelName: 'ie055v8muml0tnjnbuw8wczisuz7og8lug22p0t7iace12lqrjf5z63cvxojeja8q8fy9scljt1p9vfd9kzsl3qo7xfcfilcmvtd5n6r1zk52bv2chxmlnx4e50zxrroc1i0iq8jctiagcgx9fb9t1bd5ma6xlc1',
                detail: 'Non maxime id beatae. Dolorem exercitationem similique necessitatibus id alias sed in dignissimos. Quisquam laborum sed quidem reiciendis impedit vitae animi neque. Dolor ea sequi temporibus mollitia adipisci. Neque atque veniam est accusantium dolor vero voluptate officiis dolorum. Magni et vero.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: '9nx8x5x4ochab8zz8pqxf67co0y5ml2tccugcmj70lrkfwqmskk',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'q6y333c18uoqaf6v4as4',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 18:58:31',
                executionMonitoringStartAt: '2020-11-04 03:48:03',
                executionMonitoringEndAt: '2020-11-04 07:39:32',
                status: 'UNREGISTERED',
                channelHash: '2nrxe4e6tmgtaida117kn6a0wxkmm6wjhuhxw1mn',
                channelSapId: 'e1j9allzv16d0zshr65d6i6xekdhhmhwvi21qcq7oxbo9orhan',
                channelParty: 'wxtuvlxonnonsogxev3t9z05d2wdjewtwjrzk58mpxawmr3ayvenipq22a73j52643rr7rysaxm11zy20zgmse6jq6j3ax730oksnv2ci9c6hosiedd80lfh4yburbq1zhtvt6nczrkmxifowkmqqt3tcq9zhl2h',
                channelComponent: 'orr86ddkac8i88ie7zbd5h70bd7kcjktkb6xsr6z3i2uksjpupus6q6xm3yame71rp1x7cphsjt26ydvg9zy6n4ad9rw60nsd2hmxlc2t8osb14qv5kasprq2brtcv5l902642paskhw0dadcw00g8lllcs0oouj',
                channelName: '47xu1zp53i25ae0plr3nwu7azmyn6wmb1deiumfvf8u7oi632b6inauhakls6kql6ywxte2v2ouyq3ahzixdvsckl9i7jtq4dg5l2aw832x61769hhpqkx4v05k8echmooxkpkmjg68302s3blaxgtuavvgd5an7',
                detail: 'Voluptatem quis error perferendis nam corrupti odit tempora autem. Voluptas molestias consequatur laudantium. Omnis excepturi fugit doloremque delectus natus soluta ut.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'r5le1rc12s9mz8g7m2wyrznhoccu7cltsf5z5lifuchvmw6kxn',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '4bbqo7ptgtwdom9wlegjs',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:59:51',
                executionMonitoringStartAt: '2020-11-04 17:43:13',
                executionMonitoringEndAt: '2020-11-04 04:39:11',
                status: 'ERROR',
                channelHash: '62hvc8zm79r42rhy7r44pohwj6vplxdp1wnfh8je',
                channelSapId: '6z4r2f5t55bpbxb0g9ltu5xcrg2r24dvmvu5v64upttpzvse7v',
                channelParty: 'gciq9jdw1o922wg0f7onelxr83zbdv8v25u6srus23qnfq02blanphszgisag3dplt220sr32249vnjd13xodpguh5fu19rbg8nubim8xzgom4vjh8i2m6d4iwxyxblj3ynf12y2d4hm9l1clzccpuc9usu7hlda',
                channelComponent: '9647ze24ro734t2z5asl0vjt3b7m3qov3mjx67a45uhmmet02cm4p3ib2g5beck92a1d0eqjnpska4ocpnh6msux2sev9kncb0j7csytmd90fm27mgiblpmivlp0ob3ac42dqiiqh45a04abw0lilmbrz4j99feb',
                channelName: 'h7tak8c4jyy92omkmyavu54fkei2yro1uuqw321mwn02ls2v4tqnvmk961oakyuiuqfnr3pcze4hdl23reoga5is27oyeaky723v2276yv03dqmd64ow39bpd2ei8e2oupbba2ze0f8ynpwyxq7dv2ver973zjjz',
                detail: 'Repellat dolorem incidunt fuga dolores velit. Eaque dolore impedit itaque cumque tenetur voluptas quis temporibus suscipit. Voluptatibus consequuntur assumenda omnis ut dolores illum et dolores. Minima veritatis deserunt doloribus vel aliquid doloremque qui voluptas vero.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'mlwcv7dj20c77mwggjn6qt2isbaxgk8z2vf5crleev4q95pdjr',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'n93173kx04mzg6en1tsx',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:14:46',
                executionMonitoringStartAt: '2020-11-04 11:34:44',
                executionMonitoringEndAt: '2020-11-04 08:11:48',
                status: 'ERROR',
                channelHash: 'lhi055emu9d9ojwowqy5q9ihttt9nrhqgsd81wz5',
                channelSapId: '4vods5lqs3v0p2z28kzz4scoq20u6zd45h44jfhw1snzywi1nni',
                channelParty: 'jouoaqlj5yi49atzqslk28i5jh4uf0r5503xh7xzjnolexagyojpasfhzrod2b1oi96syvd35sq99e7a50vetrb8sg77tw8zw21lbz3o8m8pv5pn4sbe0nsgotxlkcfm74rp0nxv6qq3duzp6v557hi356f47bof',
                channelComponent: '7akx8uq4o9woinxp9g1348ly0rubfshwj998j3owqm92jnkjfpetxbdy5bld765ibpppcaznt7x7y96wmbieqaie4lpzpt3vaq2kjtfokwgd5cow5xtwuisjt0c8lczfkbrzsqu2k0iuqtu1obfgxuh01sez5lkt',
                channelName: 'v46feapahbebveoqzx2cdwtd1ncmq2xh0q8a5gsgqumnjb81czfvkzv5td6xphylhvgdu1b9hcxis0vyfe5n993bnio3o2ky9j81w6xfxpl1tjxohidfep7rc279na6w36wy2bzhh7c7m5xi7whujwvaxoc39zcn',
                detail: 'Eveniet aliquid eos aut amet quos alias autem excepturi. Dolore omnis mollitia. Minima sunt quibusdam velit voluptate doloremque. Dolores adipisci id doloremque qui et iste earum temporibus iste.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'zitused34eer42wdgu8lrmj4ff44plnpmt3oayxjlz58urb9k2',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'ykh4q2he1dpuyrkpa3dy',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:44:07',
                executionMonitoringStartAt: '2020-11-03 21:12:22',
                executionMonitoringEndAt: '2020-11-03 22:13:13',
                status: 'UNREGISTERED',
                channelHash: '2k15s6if90ezg8vomghngn6ylmyt4tpy9qa82fwk',
                channelSapId: 'zfuaa11268dqawy98lam76m6jqsqc2lirhqfbzas2io8ricboj',
                channelParty: 'twx3upbox97vs6tvw14swfolyu5pjk9zwalod8acg6chjd7e8jtdiva46c7ahd92pjzkpgfjpibm1115p1sc0xn0mszb12hnxot6zypjb8voebpghxve44seojm61xr31rdd858vfgg77uhbgveaj530c3cgo9mpo',
                channelComponent: 'rmittkn6yjmcbkh8r6s8pc2175ko4b1jjpnd07bssl8g8z104xtfjnq5ekkryigv9u1977jplrxlxuxo93dju5vqsis5hw8hvutkf2gmcmbcbjik39aamwxs74yoxs1tjgcgn9wbg8vwu5i2bmpwmzpp4yarja3o',
                channelName: 'pnra4gkff0qj170dibucbj3zr9rvifwsuxh1m7211ovumdcj66rho5w6d9spat2y8aublsc5lepq3uqegfyvmtbq67x9ygsyp173e8696r9jn4z2yh5f3qej4ca29v0kkyurml3m39b4yvqgm0zf2op0yo134x42',
                detail: 'Assumenda voluptas quis voluptates odio aperiam. Quod quod est qui sequi. Fugit ea cum non et nostrum officiis. Qui quia et asperiores. Laboriosam est sint quam iure sequi aliquam. Autem non quod vel non iure non voluptatem sed.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'zzn6j48ph6il9sov22dsp2zw8ogsn7n8yaqk2k6l909yfc6stb',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '0f0dx7npkr83wd2hgpz4',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:36:13',
                executionMonitoringStartAt: '2020-11-04 14:16:48',
                executionMonitoringEndAt: '2020-11-04 15:53:19',
                status: 'UNKNOWN',
                channelHash: 'udwybiwpnl9k25j048d02rf1cnymjwbl3orsl8ru',
                channelSapId: '91kwgora6cl7hkdqs14xdctwlqgre2wskp7e7ew0k9s8p2x0pr',
                channelParty: 'tqyum77sa9c3iqgnn9yr27c1gyg8rhpbtzwgorp2qefclcxhgezey57e4cva64930dpdfkt9txtkxwclxzec6d94hsuenmqc7hjgoevmru4fctwndk3undmg954a2pe1hjmt4vwfnw0u3h2cw6z695tqaecx6jjl',
                channelComponent: '60uxa3bj2xxr2i5556q774okevdqdcu71tdmfk6dpkgedds9lji5mncgxu2j4g4cplbvj06h9zlwc0xqrsfbvtj1yz5t0tbvn0uugfl0loebll794jd7hy6i2ah1pm3f3iyxqg70qoso4e6hi23mnr3kn93p3yyq6',
                channelName: '24dmkhxkpua6bpdyrvnvrr8cae0q5uxeh3tem5i89qqgs6rth3906s0c094e8y9mz41x2tid2ogybc7915380jtdaud2cfirx2u9bh2l4he4upv1i06i0poqdz9rf0cnydhl9lrzd0azpkj0ht8vq330mgrxd1mr',
                detail: 'Dolore est rerum animi placeat. Ipsa quia distinctio suscipit animi dignissimos est pariatur. Reprehenderit aut explicabo voluptatem. Voluptatem iste vitae quidem quibusdam dignissimos ut et consectetur omnis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: '63p7sor6ksyrs5y89i7sa71krzcxurcejfct3l6gslhlwufv1y',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'qkhjfk9v37k9x86tm6s1',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 19:38:54',
                executionMonitoringStartAt: '2020-11-04 02:51:07',
                executionMonitoringEndAt: '2020-11-04 16:33:16',
                status: 'ERROR',
                channelHash: 'x2l8eoo1z2bc9vq5tqgv6dvz75m8foi7tuht98qy',
                channelSapId: '4go83plvf5mfa6nxzc7uhjai603lzh1b1tgnrlaflvzrqlkrz7',
                channelParty: '7uzjtt1xotcelvz5epj9f210w8vi2hfzgcwdajopxhm5ryxy7xf0dm5esdc142kmqn0v3p8lpgudknkmfttwn1sr19hf1eh4lcdl3lvjl29mwrdn9pm1d7vjv1h9a4gjam6y11mpveid0ie7hyp435jooowq4omy',
                channelComponent: 'akgaedygede6fr6dfcdehv0s1ugvikp20az6yurr4vlg1dvidsn45vx0v3e502fvh8vr8fwxhcnotqicj2adsvddnirqapz5uj9odtkolp4llobpcv8q7ijtm63v5kqmz05vvj7qt5e5nbi5ydr1f9nmhfcjpe3f',
                channelName: 'nedxxyko9yiz7f1ac4sbfo69hni42iko6m1sy76kg1dpvk9icbj84gtxaxm3rorqxn3u82rzedcyqm8ge5d3hfih2yzbz1foclxpxb8f7jltbz1azgr26the09a6bvfq6s8kd5sg9oal449naqjiosum4c4tp3otp',
                detail: 'Et quae odit sunt earum ut aut nesciunt dolorem ipsa. Non labore soluta. Et rem vel corporis quibusdam. Exercitationem occaecati et non debitis nam ut est. Labore impedit vitae dolore est unde debitis quis sint.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName is too large, has a maximum length of 160');
            });
    });
    

    

    

    

    

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'gmjokso6f6yxacw0ngm54joslmfpabhex5kmrqriacxq6qjdwp',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'v4ho7qq5sust0v581fyl',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-04 10:13:58',
                executionMonitoringStartAt: '2020-11-04 11:00:10',
                executionMonitoringEndAt: '2020-11-04 04:50:46',
                status: 'UNREGISTERED',
                channelHash: 'lx1abedugon0a7qit6stfqw3q8k3wdji0hv7zir5',
                channelSapId: 'dg0kr0hlckp3g8ig8v25h27gkziu5zxyi7x7l5iwb8hpcgfviz',
                channelParty: 'pqnfz97hynfz13rrj49uuh9tt2b0cz4vkfbay6n3gn01ks6eamwatp5845d6m6wpk7sntdwzbixswchznz4uw0ctp1pc2mejrp62auh70jinh991sgrn0vj4f5dd0o2tnm17xv60v4xy3v3jmhob12cfafkqspo8',
                channelComponent: 'sid6jbm12s6fk3z1hy4eh1qc5hvzz8o0m040d1j35ac6oab3inm8dxdvr6c380zqzmici0cffjpx77s62doavk9udykup761jz13i9mv4tdy2zqbhy3dt87emysurcf9ke7bq01a34n4i3usm159zr2bzta2zydu',
                channelName: 'ku6fkaekuf64kqlly894rqx9bp0mf4nfj8pkrcx0bj4p1wzo7hywvd451mptm9i9ip4snljxq61dbs2tq43fgfe8web6kuzy6qqgehdb6rlihqa5y6hj2g3m5ol9c8u9e28kx9p97zkzyp6d6b3lfln7n9eld4vc',
                detail: 'Aspernatur fugiat non error itaque voluptatibus. Ipsum aspernatur est saepe veniam in. Et eum quod aperiam. Aut earum earum similique.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailStatus has to be a enum option of ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'eknml06kf0c9s2sip13ftqpb0gy34p16z11ucksjsmcy5ktfek',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'vmbgdc5q51xyvhqw7naf',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 08:23:51',
                executionMonitoringStartAt: '2020-11-04 14:48:02',
                executionMonitoringEndAt: '2020-11-04 18:50:51',
                status: 'XXXX',
                channelHash: 'cz0psdp38wyoob6ibuejuu8gs6e3vtiq538xgelb',
                channelSapId: 'rho91v3jfft212sqpe647tn5cte7o5mchoenc5ucravhbt4y0x',
                channelParty: 'ca7f0j784zdda7zemwdxbstkvnzy603eo63axfr3pmk6x6idki6d49so2n74pjlahwopgi75z44w29lfs9upxoj78y8kmhyq24wxyomwf7vrdvk01lv6nsng2z9v57a1yfyoxvq4y6yi5c3spc0uyz4fznbeyqm5',
                channelComponent: 'c9d2t2rtxevpdhfwdvomgts6c06cgye61nka7ij7hno79ll7h5genngwsq5rrq0mayqwrsyppbpmmpcm67jfle3v8pn4ksklmnhf6czrexo6sbg04bdp6wr2qz1hrnkgh25yjwcmyp0c4g7sfw9q2cis6zg4bjws',
                channelName: '37pkzlnsqrrxy6gr94vcvd5iyamo2qkvp01ezfjyjrnjvcqml43h54kub6u3tfuf9vt6uwy04pqf9de7fbhttp9oa4xvhxpfh5ltzjm0f4u9ut26kvec41497h5g5plbdlqq91fszgdlojnjsb94ranlanl2ppso',
                detail: 'Sequi adipisci tenetur est ipsum ratione voluptatum deserunt voluptatem vitae. Quia vitae dolor dolores assumenda quos dolorum reprehenderit. Consectetur ad et sit possimus fugit maiores. Quam provident enim sunt vitae voluptates. Ab ad consequatur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus has to be any of this options: ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED');
            });
    });
    

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: '8v7zul6kjw6wq6qfjphgluqtjtwnl6qltjijb6xlxt6ywvhkqq',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'hlxkd63etjbdy5rq0p1o',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-04 04:32:06',
                executionMonitoringEndAt: '2020-11-04 14:36:18',
                status: 'UNREGISTERED',
                channelHash: 'dbsrkmap8j93eyfjquv4bbri7l29hqx1xn22ckd3',
                channelSapId: 'w5qk2noroy30j1nnif5j6049cd1cbezwv609tymnhwlpkunkn5',
                channelParty: 'vrkv5gl8nnh7kyz7to695nw3hyaj9jhd1breq8fgq4urlu9nsh4lhg1nfa4s5coo5wdswfvoo0047kpdhfr8p3eun437yoxqgqhj822f6r02z4wznxklpwt7x7jcj2d9qglyky3tg4a7j8wt0l4zw2su7p6br1nf',
                channelComponent: 'iclxofrsxxfedxnlf27bwn72lk8n2dm91ex07om8y599ubrtnkrf12f8fe0b4mrmepg7zi0ftj2mp2eui0kz4fod2tcuhcj4vyijib36n403868lfmzepxnzsh4eox7laacx0uc1n70asql7g30m268hrwls0841',
                channelName: '11agr7lgdvtz7741t5jhabwdd1e9wib3pxmfqy5y6xphheqf9kt8tcf528ls6h298zxdegterfyltod0ms3q1zl4awkizu5u4l62hhd21hmu83d8a6e1zfhza3884r7clqhmejsi5leihsccg2wmi76p6rdpt63d',
                detail: 'Voluptas eaque sint voluptatem aut. Distinctio facilis molestiae aut. Excepturi in pariatur rerum aperiam officiis hic. Enim sit corrupti ullam recusandae. Quis quod delectus voluptatibus beatae quia id vero in.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'w1p7ld2mk6a8zf9osnolbmlnvk3gbw0jb60o4ya9vljbav7s9v',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '9beidjpfnx8bz0ivxk4y',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 08:37:53',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 07:32:17',
                status: 'UNKNOWN',
                channelHash: 'lbooqwhffxjvg9vciejy75tcq7ifn33k4vmcanpk',
                channelSapId: '77a99d08waysa1umzjoi1vkqgjkztlxxgnoj221hqbai5pgdme',
                channelParty: 'g71gy63v7lmpt89tg3ystkcypsyvvyscivoyt8uqeyzqrd7bc4qe7knaqr8i71du50zof6afo9kyriwwewyyzokw7a6ycuoyca1yiv0arxawwe1b3drszwcuwd00fyy64nys53bkf2f2h8uney28iswv04tzzami',
                channelComponent: 'oiuxa34zlsaxoyjtpvsnhr2v3nb3a8mg4wy9jatbpnzxukjti80x4jdjkpgyppd05qfpcih4v2wzmcacw9vhmsa8otdjzwvar13cluv826zs9wfntpqmsveru0u1iqunnum1m249k5l5ktrcorxlhh169xchs2oo',
                channelName: '52y336r3uht9zjmv438pnrszbtccgqds5h17n4531e4uvhnlkf17yy2rfle6hm1fqigko5pp47ceq432lceczmhqfpbf0f35ssy3mohlib6oxh4qqz686l85c5qkko8w22a2v65zopfk3tahfddwwy3dbj9w8tbo',
                detail: 'Hic rerum id voluptatem laborum omnis. Unde ab culpa quis explicabo voluptates. Omnis expedita odio et mollitia sequi nobis. Enim quia amet adipisci repellat molestias ipsam sunt consequatur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'ntz8d8hkdjzqm27wwogainanwzu0qmlhiqlrlc0t31wkjwt57m',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '3m41zn2iu2qiuvnqxsoj',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:23:53',
                executionMonitoringStartAt: '2020-11-04 13:03:07',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'INACTIVE',
                channelHash: '2b1o8nxhj01taq3hi6uea2fsylxt1fg0aqg5d3v3',
                channelSapId: 'f4mccya3wzlkblx8ejc2lbkxvbogqvlvsfscwms2nubnhpaeqt',
                channelParty: '5yze0rvy10dsbf87oyj0x4vwc998vecgtadzv8phuc3l65deiebc0n2jvpmg1z8ryeviw8dhq181v9ay9sw3xxww5f7nzzkg5fu8fc0ftjgev2d521t5ejj6jx1lwgb5r0g8j2ow8gny1zd3r3s5e58ez14le51t',
                channelComponent: 'zx9h2vjmejk9qo0oaqjiub33hsgjb478m27iq7eekz2mxtkobv5swu539r4vv2ol3fi5xbyz9q8ptyqqhutcly7bkj9o1f8f7q2y4k5j47han8cbtxlhdboi3zixqsah2so18bflm6ahmfpokr7bc1m9et3u8w23',
                channelName: '7nklea2cmdooxarjjyjekxf2ir9f1t2ymxzzrccicc5gd2c5rpqorvpnqk60u4mys91bz8iwjiwglmkqegfbhz82z1r76s6kourg4xenrt5cq6zi34942tcbqxen54klao7m68zx7cca2fw0g19cu85b1mxl2eem',
                detail: 'Aliquam autem quia eveniet. Quae quod reprehenderit ullam id omnis et et. Debitis nostrum similique provident. Sed ad temporibus nobis quaerat.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'up90tqxw53bkgqvbhi0wm40u7cicw9b3r19eauhe4v6zpmaf3h',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: '88pkavt04ehl5ogxhn1n',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:13:08',
                executionMonitoringStartAt: '2020-11-04 12:47:37',
                executionMonitoringEndAt: '2020-11-04 17:55:11',
                status: 'INACTIVE',
                channelHash: '264bswaj92xouwbdqe5a9v1r166c0nlvejmv3o23',
                channelSapId: 'tf2kg3e62em6743qaeiz75porr367ktjwd2qe6bmxoyphj3l7d',
                channelParty: 'l5qgf4fmez0qzimx5p07vr5impnb31nu751kzwghw758elfd8pbbihitcbdkzbqvjnxao5fh9c3snptcxqfh1dozjsth8n47tq2tzlqpybe8o2zi35z8shbdt5i1bu89hj3w6g42gwct84g3ldt1mk4vdsq0f77b',
                channelComponent: 'ufjg7zufvz8j3g5w7zxdyx2rra3q4a2tx2s8c7p9ww8vhm1knmbxx0sr2jsaqzqlbqik808ufilav24azen5ryavhonfflwpjy3nzmgarqkb93chwnb16g1sse3ddt0xgrsu48z06fbvb9ho3lyjdzul6tx5lqq4',
                channelName: 'joqh4hj6fnjyajy7bbmobq0aze6x4rh4lej0esl3ff3n4lvsi7m0ghaug8fbznq5e0krvkhv0ex66mz15pgkeb8vm99nv1vicqxqqi2xpac3o9wotxyu7c4wqnb3mwoj6wcznggl40uzob7vwm4u9ddy2n0vea62',
                detail: 'Et cupiditate expedita quam quas ducimus praesentium sed. Minima omnis cupiditate et. Animi dolorem rem dolorem officiis repellat et aut exercitationem reiciendis. Maiores laboriosam rem voluptas quam vel nam corporis. Ut esse repellendus qui sequi molestiae iste.',
            })
            .expect(201);
    });

    test(`/REST:GET cci/channels-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels-detail/paginate')
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

    test(`/REST:GET cci/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'c63f6a81-695e-4788-9ff4-72b40ba3dd1b'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '7632adc1-d06a-43f7-b096-76f299ad12a1'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7632adc1-d06a-43f7-b096-76f299ad12a1'));
    });

    test(`/REST:GET cci/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail/4fec1c71-a766-4a54-90a9-68199597ef1f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail/7632adc1-d06a-43f7-b096-76f299ad12a1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7632adc1-d06a-43f7-b096-76f299ad12a1'));
    });

    test(`/REST:GET cci/channels-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c42dd41a-edd5-4c6c-b79c-e9d4919c8d22',
                tenantId: 'e4ebd203-c9e2-4ba4-91c2-cf5ef5374402',
                tenantCode: '3gsvme0rfygjfu58tml9tgwrti5lvria3zrkbb2wzmvkuvbdnm',
                systemId: '56983c4f-091a-411a-a4b1-d7135180f88d',
                systemName: 'zpnzrsl7pzgbhs2s1rra',
                executionId: '8ea56700-c9f0-4cd6-81b8-b63ee714b87f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 17:25:13',
                executionMonitoringStartAt: '2020-11-04 09:14:34',
                executionMonitoringEndAt: '2020-11-04 13:33:10',
                status: 'UNREGISTERED',
                channelHash: 'is293qep5601wgxz2wt1czzkgaqy8hb3pafqvadh',
                channelSapId: 'q7ctp4kws28vjyzeyiqlbcsuxd22untqtm5u3b92at5dmb8u25',
                channelParty: 'a2mn91qczsac082vetf5ts9aynd6kiggcjqq6s37ww0psyb6c00ovnjxl2jj6wv4s8frnqorw85clugw4ay5sruvso5boyqew09wwyie9rb4pecedh5u2txn2rdauzkm11mff5jldwkgd9j4qmn0wzyhl80zd52s',
                channelComponent: '67vxaqehxgbvi5mz7lzqatp5ovb82zq8xq7fw5ybkkfqdnav38z9kjx0j8vbbpv5mw96cr4x7a8uv49u921w6fjsuqvajwy0819mbia495u1k53ktbodyitmg6bcqudyei1t8vv57dkc8yyd39qa3pv8onvnlz9u',
                channelName: '759i0nusfzs7dil0ssznak2dkfjyrs8shfye26ntgux831yfc8yuaok9st26x8jzyd5gsluhlnfkaxj5r1e16lyi4w865aw0plp3bopixsgxoph6piba0mxn598dcr3h8me7s9xm50ovxtk9tj3ypjhjlabfx17t',
                detail: 'Ut nulla magni modi. Possimus dolores aspernatur est facilis. Corrupti doloremque provident qui. Unde cupiditate itaque distinctio omnis dolore optio. Placeat sunt in dolorem vel dolor et ut aspernatur. Perferendis eos facere dicta omnis ipsa non quia.',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                tenantCode: 'wk7ia53wvg4c0kq05zht959ccdvk855r0o7ho2v20cbg4gb69l',
                systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                systemName: 'sl8ugc0exzvdwm4635ka',
                executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 11:52:08',
                executionMonitoringStartAt: '2020-11-03 23:19:00',
                executionMonitoringEndAt: '2020-11-04 04:57:59',
                status: 'UNKNOWN',
                channelHash: 'tcaw02haftc3hgjx8nx0ugn6ul13txwx0nf4urez',
                channelSapId: 'mv06u8yu68mdygl1dvaptbkbn6y6k5pm3lumm98b8x7t996yg9',
                channelParty: '7zpm18kitcv2sykhly32fvywc2e88exvzg2rnw4vo6dz111djcgukerdpatbirzk1c4dme9wu60i6gujw3pqzwmtcxexz6hcigqyz13jckxa56w98hfa2bc5snjevgmu0f2qterjfo4d68kyg0gz6br7m9fezygr',
                channelComponent: 'a1syyz1l91zp5a47o5p5e7uq1wd4evt2nzj6cp26d80nuhwbquygn3xbozdhb1hitmabbounybv36xhygk4csv8yds6qrxjse07q1niwyrf4d47qm2vwnxczpzloxd9zihrdxd6v8sahqfoup6t4abe6in3205ki',
                channelName: 'umplbauqtbxt7nwo4aei8bo7umt2r4riu35n6l2rl8h3jkpi48dctyu0pbii7opdbmeirh9apw6ep8ocvh0qqg5fr6y5cao5dbi1cnh54oyyzj4zppv6uua336pjji3u2xy70ie13kw1zgld7bc0marhbd1bzbyl',
                detail: 'Quam voluptate magnam commodi enim eveniet ipsa nihil distinctio. Aut assumenda qui. Architecto dolor qui dicta et repudiandae quos cum veniam.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7632adc1-d06a-43f7-b096-76f299ad12a1'));
    });

    test(`/REST:DELETE cci/channel-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-detail/1caf680a-7872-4c4b-a905-9f7274c3b464')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-detail/7632adc1-d06a-43f7-b096-76f299ad12a1')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateChannelDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelDetailInput!)
                    {
                        cciCreateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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

    test(`/GraphQL cciCreateChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelDetailInput!)
                    {
                        cciCreateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        id: '2262b03f-ab3b-4eb3-a0e8-695ac36e38a8',
                        tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                        tenantCode: '0plye50qej05h7gknl20rgfzd7hqi33jiz4zixjsd24bkkk6xz',
                        systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                        systemName: 'x2xofgrjmswasocar7r3',
                        executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 03:37:10',
                        executionMonitoringStartAt: '2020-11-04 17:40:38',
                        executionMonitoringEndAt: '2020-11-03 21:16:59',
                        status: 'INACTIVE',
                        channelHash: 'cs5guh3upmx3336yrvmabcqrj4uspwx8z0v7q3oy',
                        channelSapId: 'hzw95ksmlyihm72vs3v6rrxpzu31d5vthebd4yyh19foea2lpm',
                        channelParty: '6xcevxswvrmrfy0iql1lslgeifbxg15949jum4c4p4rjslmhscry9yphtjmlxffosnjga6asyevgsjyn015boujrjvxg7u8p8ukwjzhq9pp033cj5e161zxsny65yngcwq0u4uix0badvyat66zgbs988l2ygg3w',
                        channelComponent: '2a6d2jpc7woc6o2wc0mlpetj9hdfhxpgaa8mg79t8axw2igwhwxlpqx5eexzfwdo68g14apgopzqs2vgvnmsefjaog36unriw446563oa72qkj4f49ze9hk2s88tj8xsvkdo8igg655a689s2qhjtid4oopii7o4',
                        channelName: 'h26jng9g5g7wsci7xfqzca7sbzcl91zo64pysb4kw87a7gz80wdy9vvwr666a9911fo9er64nnsudy2yyt2zftfs29qyyf18ckrdh5olbm134esy4oqz9tq0butaj5invjedooymrnb9pdnijceu4oacgn44qddz',
                        detail: 'Omnis facilis a autem eos aperiam quia aut non. A beatae tempore laborum. Excepturi id laborum voluptates ut quos eligendi in. Similique nulla tenetur.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannelDetail).toHaveProperty('id', '2262b03f-ab3b-4eb3-a0e8-695ac36e38a8');
            });
    });

    test(`/GraphQL cciPaginateChannelsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateChannelsDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateChannelsDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannelsDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannelsDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindChannelDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannelDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '146af2f7-0db9-48ee-bbec-745cdc7a5184'
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

    test(`/GraphQL cciFindChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannelDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '7632adc1-d06a-43f7-b096-76f299ad12a1'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelDetail.id).toStrictEqual('7632adc1-d06a-43f7-b096-76f299ad12a1');
            });
    });

    test(`/GraphQL cciFindChannelDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'cf8ece6f-5f76-4171-8a2f-fa3f3784371b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindChannelDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '7632adc1-d06a-43f7-b096-76f299ad12a1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelDetailById.id).toStrictEqual('7632adc1-d06a-43f7-b096-76f299ad12a1');
            });
    });

    test(`/GraphQL cciGetChannelsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetChannelsDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetChannelsDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateChannelDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelDetailInput!)
                    {
                        cciUpdateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: 'c867545d-03b0-4560-8fac-c0e6404e7361',
                        tenantId: '808e1e93-d9ac-4dde-a3bf-8a0ef8a67b4c',
                        tenantCode: 'maovg87cyh97vw0qz373m7bkvo5cup7tzqwelkiglwwsck3jv4',
                        systemId: '87931a48-fb68-4b58-a389-b51117f4f732',
                        systemName: 'larc83hu9400nudgmknl',
                        executionId: 'be4baf87-ccec-470b-b5d1-130ae32fdba9',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 10:29:02',
                        executionMonitoringStartAt: '2020-11-03 19:39:52',
                        executionMonitoringEndAt: '2020-11-03 23:51:16',
                        status: 'ERROR',
                        channelHash: 'x6sxbergrdplc0h074gx4izrq49t06v5rcg9dsf2',
                        channelSapId: 'xs9zt9fz6hr3mykwfqie9rq1d3wif20fufgc6ovkvsees5d39g',
                        channelParty: 'mk7v7cf89febzt2swa862yqjvy08em8x2fcqn7z7m7icw4lxxxl9h0ky4eqpt89w6dktzy612w3fvf59vpt4jgyerbm4ialz1klhnib58oj6phemxzolta8upbz8uig4l0z2tr4xk2gzmajicrek7xrpp1lhxl1x',
                        channelComponent: 'rz06l4n94vg05vofiqckqpmnc0gne8tma90ojjuujxmpn9zfotfg1t13w2tmo6bul932sjjpx5bphyyz1qbjau4erukuqr5nh8hcxedo64z9g82pz4lvfs094egypwybgnyndm9ih6pg12xg2k2ogsg7l5vax95m',
                        channelName: '78hwkqasw34ybioszif45zfljz2kgvoq82pc8ewo39wqw38gmphq2ueb3yj529nmtlsn02sicw73ajgwqwv5w9zl6aq4y64ssvwk9uc57ziqvg8hosd1l24974t11zexe4tmconb7deblj8qsjw2nu9pxadthjfx',
                        detail: 'Distinctio sunt aliquam culpa necessitatibus sequi sint sed nam. Molestiae quia laudantium nihil asperiores est labore earum voluptatem voluptas. Sequi beatae explicabo corrupti eos similique a.',
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

    test(`/GraphQL cciUpdateChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelDetailInput!)
                    {
                        cciUpdateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: '7632adc1-d06a-43f7-b096-76f299ad12a1',
                        tenantId: 'bb048ea6-40b4-4120-8614-a62f938e68b7',
                        tenantCode: 'r22pg1qpp7p68k6i8llyjftzn8i4d1fqxdknpjs6bvke6inipm',
                        systemId: 'bbd07a95-c65d-413a-8228-fd933aa30206',
                        systemName: 'yxep60u4b7s5x4e37qxv',
                        executionId: 'b73393b5-8e81-4511-9b28-095171592ba7',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-03 22:56:25',
                        executionMonitoringStartAt: '2020-11-04 17:45:07',
                        executionMonitoringEndAt: '2020-11-04 04:46:06',
                        status: 'UNKNOWN',
                        channelHash: 'wuzfh0nx21xmxkvteq713qgj93nubc2nq4dbp95d',
                        channelSapId: 'm30l8gm8j1q58cgh1zlk98hhpgre9c1audd95z7umzlunan1ep',
                        channelParty: 'qnqwuq0jfobiyzz6nhcb6llihkf6cmzcoe1x73iybmmirig7qso9t5m9vh95p7vsk4jbrk19bt4miwv2njo687sdcrkakmp61f2a7vrypx9rik9ss2chkez8m2ra4eqqmcwazeh7et96qbr273hr7a6aas8poqse',
                        channelComponent: '18v3inopzqkeq43icxz2kfaw5gd3cmx61z4bznlrsgx8y7dumlzpqlw1z7fdzymzop9oh9epj3lbbap8eou7frlqvtq58gdrb4h5paut4ctfcm5ki4tmci1xvq4lo8np2aha79qk2aydbb8ec0og5elpub88gz0r',
                        channelName: 'za4o9nf83mehtozpbedi6bmy8gssnwsyuu4ly724pggshq9abweg22sff0vkltz2lwpnh165j7hj1sjwbafrmhnpok67isa78wn073f965cf7p9srovvtvc8qa80gux1prxks6g5xvn30c9qsy1jtg8gjjvd92tp',
                        detail: 'Qui quo vel odio sed nobis similique. Amet architecto distinctio voluptatem cum laudantium cumque voluptatem autem doloremque. Magnam iste iusto.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannelDetail.id).toStrictEqual('7632adc1-d06a-43f7-b096-76f299ad12a1');
            });
    });

    test(`/GraphQL cciDeleteChannelDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '432e382a-26c8-48e9-820b-29dc7e663e61'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteChannelDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '7632adc1-d06a-43f7-b096-76f299ad12a1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelDetailById.id).toStrictEqual('7632adc1-d06a-43f7-b096-76f299ad12a1');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});