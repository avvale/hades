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
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'levzims5r1c778vfc70x0l7e6ig16c7vsq58as8bnhfljozpgt',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'evymaog688xu3gmxvfom',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 22:45:52',
                executionMonitoringStartAt: '2020-07-23 13:34:02',
                executionMonitoringEndAt: '2020-07-23 05:48:28',
                status: 'STOPPED',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'qgoqz1lc7i361ih01luj7eogosq8o4smxdto26j9msuc4rfmcq',
                channelParty: 'elyywywrhy7qqypbj7zd7v51js0pcew2sf6j4wnzofgp8fcnuzv21uiu8luabgq937xfx41zqy7qe82hhf3acbsu3ms66wexahgrm2sa2je9gicfanhdm7igce39fgrr0rsg8zlgbo6nizg52srjk1d1q87gk19p',
                channelComponent: 'yzzexwawanmtg5bnn31b5o0b4sffoladz8dd14sx2ctg5pqv87qc15kl31hhspv5p6ms8chzux1qbtsxr0wy60knm6zbzkenmi6dpo1bgx9jwi24clt87d556ukk2arpg2i3r55un0nqug7rks10gedca40sl1zc',
                channelName: 'auzuiefviht3uk1m4ulp8dl50yun0d2xomkn9kxuc5j8t36tolgfbqgc76hrwmhwghbgxfm1ozxt584fgcg11db6q21vhe93y90s321x0b1y25pu25ru4l5qzmkvbhvats1ga1o8lpxqecl2r7stojrygwhbdzmu',
                detail: 'Et veniam dolores est. Est aliquam ut et ea voluptas quasi placeat iste. A id dolor vero qui quia praesentium est fuga.',
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
                
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'pobnioiej40u452p3vcc8qv320wqpn95vj2rk3w74u2hsy7hpl',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'q4lpbe34cl2tivsai29o',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 18:17:06',
                executionMonitoringStartAt: '2020-07-23 08:41:08',
                executionMonitoringEndAt: '2020-07-23 07:51:04',
                status: 'ERROR',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 't73xrkoevh5ryeynpiwtxde2hrtm0mx5wciaxpymi68qp8sagd',
                channelParty: 'bzncncmglw61lzut0u7m8ejw1yrq6losqokwewsnp96gcjqw0iwjstqu0dla3v0v0vmhuehvk72s2q0vly5qwwyc0g08idj0kxh196s35r8nhu0qve2ddlhbpz9d78vzsbfu7tvoa8sk10ydb3l9imcqmxzdw5rv',
                channelComponent: 'i3a3tiu1j7m282ne9vqx0e0uu70ai2e5ik6j2idkmkatri0od4219jkyw9r53844iaz9ln2fcpjzz4kv00lvkv41fmtdscjwah3fn73km8h51hmjczqeux5okp3sb8tgvhm4elqczsay56wigonf0261llxf60ld',
                channelName: 'qhm3v7ndpd6mrzwc6pi1dzkgxgh88ec57u97ck3gpe5udaqumvj82o12ab9btrictpgptqbk47nx4iam85z5804qda71smpgri82e8puul2ms01ybw2mc463r2esi05mbov3mwt4eq1kh1ljih1raxex1ws6efcg',
                detail: 'Quasi perferendis ut expedita perferendis officiis sapiente blanditiis eos. Maiores necessitatibus provident voluptatem nam quis. Similique qui veniam id rerum voluptatem excepturi. Nostrum omnis voluptas eum quod velit qui molestiae iure consequatur.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: null,
                tenantCode: 'ph804vmewta15t4na1h8jaybxmuuz0ueg6ti1cvxjd54q5mn8u',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'y11rixfklbvufu03hjkb',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 15:45:28',
                executionMonitoringStartAt: '2020-07-23 13:50:06',
                executionMonitoringEndAt: '2020-07-23 03:50:16',
                status: 'STOPPED',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'dwwv5cgu2biehy72mi4dzverqdupsge0p094y6g7u788l46gho',
                channelParty: '0krn0uvw9kze3k7qnye2re3jerf0szxn8bt3ufee0ybm45wzlspbp655onbxdhfl0cphj7849dn6920wh29fuhbqvf3xl73ttz282ydnf6fyf4qfx78p9zo8q0kcfj22j4k31d9cc77zlxl62wk6jqvmjy8hzs4p',
                channelComponent: '4i5jihezj6rd35egon42wna16i91vx6sbcmm26rpkywrxg6dzakp74ee861l369ezhph05qrtigf7cab79tzbs1iefv4vl3vqhayeonv2p72mo63qjdksyu3t42mppyryxynrsk53e5yaecnm32op7wozmy9xp6m',
                channelName: '3y1p6h28r5dhzjktkof8tda2ebxwrqp734v2f58pn3dpeofz6bicwuq15i7qw6lsxqpc3ghpah7h7c0a4uf18kztqnsflarf2fk2l1990vy4vj9ej9to81godvmrt6kzamczcao5dsg8tmfk70yagfj1t31so8zu',
                detail: 'Qui doloribus ut molestias sunt non sed ab. Et sit eos distinctio sit eligendi aut dolorem cumque. Voluptas et aut accusantium qui.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                
                tenantCode: 'w760xis578xewqzyj4f6q4xi9coqq9dri670t9jav88sb5fp9l',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'y2jawweoguichqozyerx',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 05:48:33',
                executionMonitoringStartAt: '2020-07-23 10:21:01',
                executionMonitoringEndAt: '2020-07-22 22:47:24',
                status: 'UNKNOWN',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'aoi5ngao2zf9kccgvl7hfc4tqmyt5qtqqu5dtigukdz6k7n2mg',
                channelParty: 'edm8y8lo7nhyn4fo5a78js7k8occejfyexi5o572gxyqldaxv8438elxecyohjjvhn85zuligp803gh7x4u4ksf2m4cfsqstqui26hiauvhgzfllz5suraodm9bctoasi54tpe9ts2yiyl8fn8lygkvszaafj7nm',
                channelComponent: '9qyhaf8byb0t4p73tvtdk4u4msm5i9s1vpisv92trcs1pomz469ohex495raf5zfjik0cxhbukedohgithxu5auvzxsage969p2y4v9e22j5sm7blby5f1epaopw8xs1xxe89u4bsgrc5vgxd1pnc45y00p7xnq8',
                channelName: '93iyxprtecf6sbsw14ozbaqr2zy2cdhmomyecqdsv3xsmvt353nmfz4s2sjqors2j5c3pnxuichjes6lpznuv0yy2ufklb69vscpjysw0pwku5b8rqmcrrn3phn8ub7dcbptsp5wk8zj7mbp0zne8ko5exrdwbop',
                detail: 'Minima eligendi optio ut voluptate doloribus accusantium et. Voluptatem modi autem odit quo omnis aut quo a blanditiis. Officia officia velit consectetur libero excepturi ipsam et qui eos.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: null,
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'ng4alsxq3a8f7tszfeki',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 21:47:44',
                executionMonitoringStartAt: '2020-07-23 09:28:01',
                executionMonitoringEndAt: '2020-07-23 09:28:42',
                status: 'STOPPED',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'b0jjofm7o53ccd6eqlyvzxg2zgk0u1vk108s321wm7ioxam00c',
                channelParty: '4i2peopb9l5kt815xixzjobp4na8bxditcd0gcvcf9m7xnwvrl9kkcckd1dh10xl6fhz93gtkubx2le2uzd0oatbfq2pbn6w9g6viyr7py4iesldx7egbcpztwlt4cdi4tzuuzw0jdwth1dpsdnj6gw5tv51c3pa',
                channelComponent: 'mrakzpyovwxjl4lz9pnh4lgvtbsnefbxuwey8d5rg83kgrsosnyom74exj7b150jg684py4zjb3xmd87iq03hfuppw2oio256ypfu1nbo41lzkoqupuorowe13643l458bisb9seyr45qzc50sqpv9vpio668f0t',
                channelName: 'b38wt17g79zaddlz8j6cor0xij7tmcunb6obwgicd1in4d30adnnijp42z1ur4g7vge35eq5sr7q63bv49gf33e1zzivan46mbya4gequc3b1v0mkponl3l2tf3aneidkq0p50ly4ii1i6x3jy33t6m52gio58dx',
                detail: 'Qui non voluptatem est culpa unde est fugit odit. Perspiciatis sit aliquid ut aut saepe. Dignissimos rerum sit repellat consequatur facilis. Deleniti animi sit quae fugiat corrupti. Aut quis aspernatur earum fuga expedita. Aut architecto rerum.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'pct93xpjzkc6wz480rov',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 22:28:31',
                executionMonitoringStartAt: '2020-07-23 04:17:00',
                executionMonitoringEndAt: '2020-07-23 16:11:55',
                status: 'INACTIVE',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: '2qx3mjprg7r6poh5co5shymaqip4czsy5dt8v4a6nik315zk6u',
                channelParty: 'efeomw1g6ha1q4ag3q447zsy6ytrxwajfcc09kqsjzez0m7tok5jzyaadfneuruxn5sgnjs2j7cwttg2xz0o4k280kbsjdr4eoi7x1kk4v0nus4j2lbugvskhquzn434wr3fk9zp6erqczgvt905qrw0zusdgtdd',
                channelComponent: 'clpetk0frpbn1xeg24lzmbfzkxx3qhdg8iu9d0eqaogtdx1xw4dmzqwzipr39asje1qbxei6v49tdvs8at9h6fk1ofm1uynwu58af5vnu7esmu1lw1w0n5p1w9v9vc6dn8ljdy9lfq9yww47kds8ji0lh7gcltfd',
                channelName: 'k0u9dsgzqaw26z5b5jvnk0xjwgzq5m3yjd7u9om8gtpnkchoab41ek90ffvhv0i1o42t1c9hiff592vppfk3ouoqx1zlf8vn5ciqr4o06skzp4vjra629icn88d2jybppwe9ygb2sdplsarbvjarwafkrkl5c74f',
                detail: 'Et quaerat itaque totam ut eos qui velit. Explicabo ipsum non odio veniam a. Accusantium doloremque repellat nihil.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: '1m1wwo0j87dfj0mmfvbbh0ajlhbq9bsmp1jeinw4g48o4d2yj4',
                systemId: null,
                systemName: 'k63tljpkwek8td690x0n',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 15:36:40',
                executionMonitoringStartAt: '2020-07-22 22:05:13',
                executionMonitoringEndAt: '2020-07-23 12:48:09',
                status: 'ERROR',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'r14uvd3b2mcw14gamynkk1s3rkociowkqpk50yxjxv3adtv5rk',
                channelParty: 'p4y8lt21356c7srl6k0xtrck94le9q9mqe5bopvx3z4umjkcqpb808mbk8h14fs0d5weicfuv1029483ruqdtvzpyis1zhaz5mjwm2io164rsp6pyciyd11mfxjpijbnr17x2mw1187ldtucfmdyfb7vkecx6uvp',
                channelComponent: 'qq14ojf5k8naanp8v5t6vq4dnb747gpttxdj3evnd9u7u5rv0dlwk1bito88475pggie6o9ez36vnl7vjqyo5qctfuhig2a9beql1g96o34q3i02d13p362j76ym2ngllgnsy9hm1ml6hc4hjl1irae2ese7l46n',
                channelName: 'wifg09n8dchpu2u9rnqpezg7i9kneit4qmex2w06u5tmg2nd002wrorj7f2oi6bussqrneuapd6arbu2gz7oghr5za01k6cm8t7roqv9j48bi7ld7rwzz2wtv6uham8wnph0cxgfkpemf6uuzogcnhmjrvzroodq',
                detail: 'Non alias quo voluptas debitis aliquid voluptate. Voluptatem tenetur vero voluptatem id blanditiis et voluptatem. Aut possimus explicabo eos. Iusto non maxime perspiciatis dicta laudantium eligendi porro in autem. Sed repellat repudiandae delectus rerum perferendis quibusdam dolor aliquam.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: '75mvegr2ioiyne93s7rhvhy36sx4wkv6mkyalhde7vyip3sbx8',
                
                systemName: 'jcsui6r1j5rrb9syg1ie',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 04:55:23',
                executionMonitoringStartAt: '2020-07-23 14:46:33',
                executionMonitoringEndAt: '2020-07-23 12:53:03',
                status: 'SUCCESSFUL',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'hohea92rstg5en9iri052iruyyaygzt4g7cqueu4rph6mcg5h5',
                channelParty: 'synf1zetlu2vknegnlv2d7f2mfg6ucjdexr7yolojkc5f3ya933d6rwvheyt5p6ossxaif2m1l5g206i3nn474j06amxlqvskiry0fcgxz00emo1txe0yc3jkeyut1xn0um07rhxnkqjdnfrubq66m43meemw8xx',
                channelComponent: 'wqu4foqbizzbgppbxfvxlxs7gz3bwifmmx8d6xuzt6u17w57p2enjs3vmu2aa3ijtxw3pa8kgwsoo840fsdba8mwxmg8yc7rjtgghg2fucflwt0fiubg0c09pmd4h3e3ilhk8g269g1p9rpdu8s0352ygsjvpolf',
                channelName: '8l9lzcv5tz2xdo3lpz7dftd2o3lgk51fotraxssmpeg8e2k1n1cau8fbfq9ns0h5lbs3b084570tkliyixz97vehaau6pyjg5mcwy85lvmj18z3xxnhn5ukylch9hjbqh1tcf79kz1nwf2lb2cz2evrjain0j35c',
                detail: 'Dicta laboriosam voluptatem aperiam aut culpa rem. Quod nihil suscipit iusto rerum. Iste voluptas perspiciatis laborum nam rerum commodi necessitatibus unde inventore. Ut cumque sint aut rerum quo voluptas eveniet in tempora. Est sapiente fugit error quibusdam aut necessitatibus omnis sit. Atque sapiente unde.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'mh0odu8wup832g5szssr8k3pyndwu5zpn0t0pyxzmm9ctdkpl1',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: null,
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 04:45:55',
                executionMonitoringStartAt: '2020-07-23 06:33:35',
                executionMonitoringEndAt: '2020-07-22 20:56:43',
                status: 'UNKNOWN',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'qr6yrs7bq6synea52hk0wqzxjjco8lj1g1kn4dsza0z5t551xa',
                channelParty: 'u8shkoun5vp6gnckmxo0sev0ltdsbwr2u1vyvsw9zsvv4mcwi00u6tdovk15bic6qcfw1f5fn4qscghevsv8cuy7fz7a8iq6zg0qrunaqqcw8ecpuduovvyfba6brolklu2rhxs44j150ybinosteo5y1fa1g893',
                channelComponent: 'k649jwlgaclsx1kicwmlrq8sgq3rcfp4gf8mgmpjw0f5pg5elvpwy3jzuzzytga2r7hkcmt1bx3qe90krj9pylme1k95r9a7ox2meh7j6ldfp1879aq4fwqxq4rmv6ajgv86xxszzdvpzgor06bvg3qsd2t39yef',
                channelName: 's93j7nsttrd3s161n4ij88dwbwbp76v7m8cbh4jo9gm7issy3a9f36110fxs1baxgpf1iz8v9m8nenimn7n0kkv8wson05wexhe6xhn8iesqjql7g08uzzzk7lf4purpl8m8f9hxc2j5y34qiwvn0v9hoinzh2h0',
                detail: 'Facilis rem suscipit repellat molestiae et iure inventore. Animi voluptatem dolore ipsam nulla velit placeat assumenda natus provident. Necessitatibus reprehenderit rerum est fuga aut deserunt omnis similique dicta. In atque voluptas autem voluptas rem alias enim distinctio.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'tn5iku0lzzd5s4vs08fyn6wr2ldjxmoduzg6ysldwagddnlbc0',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 20:18:31',
                executionMonitoringStartAt: '2020-07-23 13:20:18',
                executionMonitoringEndAt: '2020-07-22 20:42:06',
                status: 'INACTIVE',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'gxd01mykz1aicl8caic8509ldwnaj0m2wwi8896zox73e8e1d7',
                channelParty: 'ac9ogh8bjlfzwany6h1i26d4m92ye1v110l53sto4udvz5benthizylkf5pjg2so3rr4dtl2cg1f687uui660vgtev039zb39p7d1el1wcxhdsliefhuaboern6u7zviitre0wfmmy2hcuavj6woglt7bdxup0u6',
                channelComponent: 'uvr8arwv4fmerihci6qh2krsynsz0n5jw3jfzc6k6cxs673jgw2xf78a7sdy6emrz6benuncfmjo4b17muvy4ktt7fd570zio5sw35kuhu0xy898w4w0gw5nlyo9drzu2zunu0wmec7twtezhcy70wwdvsgf4frd',
                channelName: 'ufu5va8a3wh2oiujsnja4i0fkk84yrsbedj8jhkvty0dm1mrfnps69i6mftm24njbd4zgy77p2fvs7w3ofug0673j6mqm87h6es8v655ijtibopwokvochjkipr5ujuuby49id1jf8x78s62c5wfwuikat4agtut',
                detail: 'Facilis architecto hic cupiditate consectetur corrupti illo rerum molestiae. Ipsa et consequatur et aut assumenda neque rerum autem eos. Nesciunt exercitationem voluptas nobis distinctio excepturi commodi quidem cumque. Amet perspiciatis maiores fuga similique quae. Et nesciunt fugiat accusantium et libero facere.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'oan1u1ekpihpjjt13emz5jv21v3ku40shvqgzyayakgula4ze6',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: '9015crt922gnxuyg8b5y',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 03:45:47',
                executionMonitoringStartAt: '2020-07-23 14:44:22',
                executionMonitoringEndAt: '2020-07-23 02:33:01',
                status: 'STOPPED',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'puexxa2si271shx1w71hdxqmgqoplw74jmwqe4bar3wvr8h86p',
                channelParty: 't8o9v026m95ufo3jjr4m4vufkmm66t3n6lg2x2df52dqpzdopa2iempmqk6ybpwylp5w4wlkxgn0ioaqr515aeb1ewis2yugkl3fob6g4ldccp9uwkah9mqc1m8574wgjotg999vpolgq1pxydcfjzevshajh0go',
                channelComponent: 'sk1rsnp0ueot55p9tg98rl0o8dioctrh0v1k7hp4he2fwc7a3t2qvi2pmn8qc9ubpx4cjyrrkncda1c1oqqmg5zqj8yavbz1essbh7cl48beu6c8633hn9coifip95rr0g4vdyy9ojly0wokqgunwsfz4if7ysfn',
                channelName: '4m0ltts0fwidl1t6yio0dmf1sa3xi1jwzdh5mw6v9v6f3dy40rdoq3vpj4k4z17ty59932tscb6pfqi8vom2rr9j0hzhtcn0afkddmpk191muhrnkn4hhw575g9q2sbhncupch7jstorca63o4vz9byeizc2fbp5',
                detail: 'Ipsa rerum aut quia et modi ipsam. Amet numquam quos. Iste eum culpa labore aut amet laudantium sed. Quo autem tempora est. Minus esse earum nihil perspiciatis minima laboriosam consectetur et.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'k649d3y7u0fcbnjqycycr6o38rb3bvrhupxas2hxilc1skqfuk',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'cicla5g3mut177ckkzmv',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 14:36:22',
                executionMonitoringStartAt: '2020-07-23 06:43:53',
                executionMonitoringEndAt: '2020-07-23 02:56:07',
                status: 'UNKNOWN',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: '71rr3svxpabbv7ws9gxevkz9qkrpt7k5artu6v20vjyyvse9b6',
                channelParty: 'kmt56oxlw9gxipfacu0bz0og9fso5v9z3flzcetfk0dsbfusrioyak802w0fio9ky28rtj2yme6qys0qqzd03cm03koed7w81sr42b7vdstdz83mdb2ctd20vw096gmczb0vqztp6szljeyggcmt7g829wvcemiq',
                channelComponent: 'cwk7tqt1gcd4g7lvlrh06errryfclbg190lgyhavor75hilw1dzkt5sqhwqq2kxzmralc5w4t99f8zc7trveg9wsn3l91hsyg12l10eq9h5wfaphkex6t0fknnjyk8ad72ry4qxb8ej03etet6guuptju8td2yif',
                channelName: 'gzm4cfbovfh9a7240ae7k58ubsua28zhabp6xt2w839hzulvntyffm7el09xsa68ulo02a1gspv9ybn8q7fxrtwl4a7re09j7cju0f7rgcgw2swz9zt1vmn7l45n5xn154535ro8svc12ccmtaglikc1vokjyrrw',
                detail: 'Error dicta nesciunt in. Aut qui repellendus dolorem ab laboriosam veniam quae vel. A et unde eos perspiciatis.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'xvdaoqhyyre0wa544mhz8obrr2x2181ux66r6e9cme5rcr4ixz',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'ouikfarjot6ehe155392',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: null,
                executionExecutedAt: '2020-07-23 14:42:33',
                executionMonitoringStartAt: '2020-07-23 11:24:08',
                executionMonitoringEndAt: '2020-07-23 04:53:44',
                status: 'ERROR',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'lgh5pj82pl9wsfmxfhvjarue4012uvuleld29e5o0xk8ctrrw9',
                channelParty: '98eht95g1wqe890v7lzbricansxeu6hsa2vrtnoz0z5o54jddc1689s8smm0wkhdglo4y3wttacts3hcb24kuwbo8i4x5jf6cyan6b0ttxc1xrth98dwbp67cnvm6nsy2m4dkuunfkvjg4c8uiwjdgfaxvvh1eog',
                channelComponent: '9sxjuek06t6icrznrxec5hfibcxr3augmbnu0szw9d3vecx1g45p0jkgjl7f4qpecujhcvdswjug8yzoauu42f8kh9golihkl1exdmjivecu94s1eig3x4wafiurchkf2pbne121q5jispz9cqr0fosxq7xf7ku6',
                channelName: '4d2ombv7wzs0b3x5zb7qxtswedtkw1x67o4a5elgahokedylvu9cz7rj9dxrlm688il99xdjsjprxg08n5zqrpb04qpjssh1gp0nzzomqh9jsw2yntu2x1fcbegfezqot7qc9n9bni933qomj9bza4aqdstfv74e',
                detail: 'Voluptatum perspiciatis ab. Aperiam nesciunt similique quam porro nihil quo. Sequi suscipit nisi sed et deleniti omnis quia.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'darjkwhzcsgpg6oj171alq1kpzd6qpq07o7zf4c1lgjoy8m4s5',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'alovanuj38rq6qab5qma',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                
                executionExecutedAt: '2020-07-23 13:07:14',
                executionMonitoringStartAt: '2020-07-22 23:31:17',
                executionMonitoringEndAt: '2020-07-23 05:03:37',
                status: 'UNREGISTERED',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'eylfhfejrnj23t6r393cdy5y95n1x37oci9ehsdafwwxs7y31a',
                channelParty: 'rxry2la11x7ngb20sett3fbv2c38fzr1xl70zlhaxvjkhgjjdhnjzhayftjv9nmjpmip2fdaai94y5ymuv3sj6esjgmy62dtp7usllfgits9kakzg0nudg3kxur47vbtau7wlm7h951q0t5dg0o80uw2ifmdo2at',
                channelComponent: 'frz3955rpwmndfvl5v0fvcr9przlh1u453lmuinva5uxnm5nnwuvbzvbrgf0vv4vgv6hedbzwsq4n4dvno64jklmd53dfyoouw966feiswhg7b80uw2hwurnft4myokv9b24cnikho7z4b94dmm73m3zji1iurxd',
                channelName: 'p9zopocw3k974byo5gnjxtxkx73csg82jgbu7h06c51doc41d4uf2k548oarhbofxs2fxq27r6haa04b7x174hneqsnoidzo3nn3d1clchgnokuhq25fsr16gskxi8njyrbebapjqnkmstku8pcml6iywngcy2w6',
                detail: 'Rem vitae voluptates nisi dolores perspiciatis corrupti in repudiandae. Autem eos vel numquam dolores quod vero molestiae itaque voluptatem. Sit consequuntur provident. Vitae corrupti ipsa fugit eum. Doloremque error officia sequi porro.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: '5w23aj8iwisdvksembr4w3bywvu04r2ajqpjab0tqfqc6nd8p7',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: '3q0585oqlkw5j4pl3fjv',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-22 19:30:58',
                executionMonitoringEndAt: '2020-07-23 15:18:58',
                status: 'ERROR',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'fmbe2w0q8nc90ub4yk39xmaexwl3bc219dnwds2wnytlxoiqne',
                channelParty: 'xszahia0g7tik4rqowoh981imj072ygsqkgtlh0172nnfyqncqf9dwoaiurqrvhirsrn7u3uiq5gyu6hbfsyg5m7m12nz30tf5piykx42tefg8k3garnfbj1dhemylngjfhfk952qvyqln6b5eheifxbczplthcw',
                channelComponent: 'mbtov54gcqlcrxkuisdows4k5feqgmvwkth0ope0r705iwxqy8ffyi0h1wspb4ynq3uljhtiwff1e26lq8ae0qz9o6nuwfs04g957bbmnrighaijyza7dizkphvfe2ig5uvmdd6v6blpoxtj2uomm7qn4dn19z6a',
                channelName: 'rzhjlh8tfhmk010yy4ninw4t1wucr9020baboa7k4zc2fj8yu1eae5yd3ln0ajocu1xqui14yuopf2l9jr1c2dgaoqnrfge8mwx39none8x72p0ilrndvxaiz7xd4pgk0vxizs1ofac88qfmuig1g3g3sch9czx9',
                detail: 'Nulla alias rerum vero et fugit. Recusandae odit est pariatur adipisci et qui ipsam cum. Odit aut sunt est et ab.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: '2oezq855ovgdm0vsylphnzdoppzlbaqp6erxkqj25xt32hl7u2',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: '2ex1txc4v9qlqle71jju',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-22 21:48:38',
                executionMonitoringEndAt: '2020-07-23 14:24:29',
                status: 'ERROR',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: '4njskbb2b95jk2p1w4nloih2q2snf4ri8tsxfmx77zhu9mfoz1',
                channelParty: 'y9ibrvkkoif2nsdzs1p7g9f21x61m3exuecae0pvqx0l7yt91tyv8xiefcu2ax1vglcirda2rz26vy050mkh9dmttni08h1dxhlr57l6xof6dp28md9vggve23p6jl1l3hoqgnfcjakxw3tflx362j3sgi3jhhet',
                channelComponent: 'i2m70lmg30a9gq7hhr80rj6ouhmpjeywb0y0zm5p8qzngn03omcs8m0gfmhnwscl6562z2fdiszmol3aqsjmikw73ljzt72fi2hgymt8r71wemrsqd4quhjwulxzmvr0rvs52sx6z4sh0zxqdq7rvuc57u9m6ypm',
                channelName: 'bbfjmjkylnrzggc30ly0sg45jwoysu7t5fc25kl6k8dwlv23rb11woldgo8dyt7dkp72thmlz6kvbfofc6r6sfswqm2kr0xtwznourwiylxubi5ogilx59asex04hp5jawqxhq1l6vak9e0qh83x3uwc82kf1ads',
                detail: 'Doloremque enim aliquid iusto nostrum. Delectus similique sint. Esse aut excepturi quia minima earum natus. Id qui quaerat numquam laborum laudantium saepe. Molestias maxime dignissimos.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'yatzkj9wvfai3tjfjvw3yaujlnf2jy5yorf3j2xf2mr1eqi3lm',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'gsdoo74yvlgnww7l4qpp',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 15:22:19',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-23 08:42:35',
                status: 'SUCCESSFUL',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'k4xvnp9wfmjiw68er76y9lg7tbj02d0dd4djb3zqjkq23t9zlu',
                channelParty: 'vzzoxk9i6kh3bmwrhhn5ss3msfqiyvylof2di48b1muui8i4lj7p5pyzkuiyaalf717mz7o2cu01iuo7xguyvw2k01yplyhtqfdml3j392suq8inr24o31tgfh67qqjeeacxppavf4vsvs20fufdr3wz8g2m3zdk',
                channelComponent: 'lr5bwl8auoy1pice4ykxlapq3mgetpaq1pl2u2v5fhok5i78f4hkduq0qrwm5ce0lu1rro62qsj6y9wxdynfi7ij6nxi0m8jf8gtbd0yfxeogkf8q0odyh6ov090m8qv4uv5e3385r97v5je1ixoin2dkffek7nw',
                channelName: 'rq5s6g79qvfmnqxk5v6y7vrbwde838trbmqwcafq9qng3e67mu5bbcrhqkhdraxfcsbmjqm8ick7atszkikigvlsqdplt8r6cmm61pmigysvcf4gyamoramft0hapuki3t4wo33za9jvnv5e7v1xbfanz6maxwbj',
                detail: 'Cumque magni quibusdam vitae veritatis ipsam reiciendis sed. Pariatur eius omnis hic mollitia asperiores ut explicabo distinctio. Sed ratione temporibus eum odio quod placeat a.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'uo8khfgxm5x9osr2mfcjggums2mojciggcf3f2f4iznmcn1kzp',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'nhp4dp0kfm5h6x2vdqla',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 07:43:10',
                
                executionMonitoringEndAt: '2020-07-23 11:52:45',
                status: 'SUCCESSFUL',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 't68mmkruwme8s5i66hnmcwur2arewqnzfk93lfmolrj2gn3t6v',
                channelParty: '5qv6a0n346idzm0kwmw7x2g5gb4ko19h56nl9thir23e7d9t4fu6zommxocatwb7nuq8lpkn6sp8olfh019fyag4882s8nxtlweuh6qh62zuq6kr06fn97xhnhryqgvhbkk1wir310ceryxzasao9h5179wg03rl',
                channelComponent: '82qibk7z4b7fmeghhl0z3eohy1daowq9qecyihrqub14h6w7zdm9yw3kswlzlho6bhblpv6hqids3fj19nqu7oaxujy1j5tg6s5e8uik1qdmnclmbsjg9i6a90ksu4jt30mg24atg20ehj6tmonzhf854wsqtrrv',
                channelName: 'wq9ch2wuvhiks3nrw0a18j7732vhxz68ziozp16js9dhiaxhzy4u5zk7ii6yyei1e2i3rw4ozzpa26dwyalln5ej1a2vez7ksa99z151pajbjau8hvh1bioxy4uixd2okfzwi3tlicx15oi7uowuii18jplwsl6b',
                detail: 'Magni ea officiis vel veritatis nam numquam dolor voluptatem. Velit ad dolorum non quia ducimus. Sed et quos et et nisi nulla distinctio. Aliquam nihil tempore minima rem esse numquam laudantium. Eos dolorem autem voluptatum et. Accusantium non minima.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'azy9prle3dhyxtoudy3dxumgy1tbwqzx5qfp5fwbd3r9w27zwz',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'qghdlw0hz9cvs33jy18a',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 11:25:58',
                executionMonitoringStartAt: '2020-07-23 06:41:13',
                executionMonitoringEndAt: null,
                status: 'INACTIVE',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: '9devhkf8kxl9f46yhuz9e60azm1jczw1dt98g2t67i31cv8flk',
                channelParty: 'atyewoegsjg5ppfi350uvbpbqxudeyhpwpbxvo4fpymkmvqa2a96ujuzur1d3d1tcfg0eoa9om0i8m4dd0zyvj8xyl892r3ntflpmuoaxi30n10v53te82e9wk1tcbb5cevsih40jepbgbl18wd2smt4fnd8ogux',
                channelComponent: '0ry3ub9wyfj8agkhst0ujem84ga4mddlwcvmx0qrq9f7jgkaskha99jxte1mp6c57didvyx3yc4q2aqu2dorf3c64rediz5orw37drzim4d6j6je0zvbc87nj2vlhqblo0i3ic35p0kgfe2l1nojea0i986b5cad',
                channelName: 'ckch083bgqvtweogwcrxjcsag86d845bfzu9e1z8vgjazxdqb93utto4doacf712z830cc8l33dknp1d4nt98k3wui3y8bxhxljxv3is7wfjgvy4b2eig6gsm7ga8utrj7bsbza6gtwnu6y32s7z387s0cockxoo',
                detail: 'Enim harum ab in voluptas rerum non voluptas temporibus magni. Et consequuntur doloremque autem rerum. Necessitatibus iure distinctio. Esse voluptatum libero rerum voluptatum corrupti.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'a6upijpa8ruc9afki51v7o3h3z9j42kep84pi89qm6zx6tfhdu',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: '2k6aji4h49gyfaifzlqs',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 20:27:51',
                executionMonitoringStartAt: '2020-07-23 05:11:22',
                
                status: 'ERROR',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: '17dks8x9r6xhvb6qisqma5x0zcxx5xiqw1ggqrf8hkrd0085g9',
                channelParty: 'rfh3kt2c3iing280cagx1kjp7q01ntm3u2gzgx72jbqtnbp77280fpd4sb7sbdti42wvjw0w2ig8h8vpy6dw62memmcjeq229d3vysn6c1vw70796xckrmmto5kjue7p855twpzbbbrtixj4ud68lwev010729op',
                channelComponent: 'zztcenbpvhwlu40yboo1iqaho36t8rs3np0cnp54hnf2vflw4v839tqsnwgf2c8v5pllgrmncae820jwp2tg1l5f0r7asysladi1is1md8n9buoq0734mzjy9z270oeo62p6ffnrz223q9cbxev8j1dkxxg0j7iq',
                channelName: 'uczkfetaybvkfujhehgqs0gk6cso1j2tgfv8kvaux20j9cm6run260o5x286h1q1bl4yr7h4x46biyd7bpvn8zht2045komepq5zps7l1h7ab0mni00w0ccpsnrv5gd5gtgmzkz589d4xpbfifvp0zwljy7v48jy',
                detail: 'Ad aut nostrum aut deserunt accusamus. Ipsam iusto facilis. Sed minima nihil inventore possimus necessitatibus quis est. Libero officiis minus dolorum et nihil beatae. Reprehenderit nostrum ullam numquam omnis sed. Dolorem et quia libero laboriosam itaque eos.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'ctg5xr8w07uv0t6hfnirjbnmefx3bid8pyprukr1w25z83n0tx',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'blqqgq5bt9qvyaii5nci',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 06:55:09',
                executionMonitoringStartAt: '2020-07-23 06:55:33',
                executionMonitoringEndAt: '2020-07-23 02:35:30',
                status: null,
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'femy8o014m77pc3jh3axrbqtsb3w7owruxc0etxsgks5kkh2lk',
                channelParty: 'x62vsiwdv30g3omtphhyirfo2v9aczn4mw3u7d5hw5e04862a5kub04uz9247ytazzdhaik59zqgbe5q08xb9le1f8mc52zambe6t9dgtrhx2zpl76bxn8yr2eaxrilweu45vp6c9ty8xz2uc0a7tnhknbrr523c',
                channelComponent: 'jum46fpeldpw9zl252zbjt1ogt0jd0itkkzpxd6763txysz9ex2hs7g1ia40z4nuqu9w84pczm0qlzv4m4y4t5vowswbd3zut75wh032cwrsev0fbb06524e1c18ixsocqomdh6q0zk3uaqwk2pdz9fnboovg7fx',
                channelName: '9v4kkj8f84cku9etpgbxxot0niap0yvtlwj3ns0m5v6blyiyfle8tmrzy2w34k0ialkpuafo6rf9sizrk6u9keowi7myukf517d8n6r4w073wkbaf4qc9czpmqoo3a42way49s1smargv8tgj70z9b9mtyxoqlus',
                detail: 'Blanditiis sed qui sit accusamus et voluptatibus sit vel. A aliquid neque. Porro quia voluptatem suscipit voluptatem repudiandae.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: '9cy33uzf7dbvquxabg4kddtymhz8ff2xbg1jmza08c670vlkjw',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: '72toi2p8lca1twxtu75y',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 18:24:04',
                executionMonitoringStartAt: '2020-07-23 17:12:17',
                executionMonitoringEndAt: '2020-07-23 15:17:52',
                
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'k196c86hkixmcezgcl03mpeazdh7qpxzadzj8esym8cq6nj0tj',
                channelParty: 'gb187r6zkvzzga2ongtstbd2r2gffomidln6k0h4idamj3ra27ghd3ys8snjysw7lnq16qmjuohma74c4bjf3d8elndr3cg7obd7xsc05h1cnhbax6190ok0ddd3gwz7ufbup2ky4oq8gcnqnu2pjpsawvr2913x',
                channelComponent: 'whrkahonpbc7ef8dehwweigkmspedjfzttiievrrev2gwpgndmig2ts7cmi8loyxw1m0t98x080j7bhyq554iwy5c010ocgvtramf7jwjfk05md2oje3x3nknpok7vxklwoo9f5i291tyybcqjgvbqoi9ly9xvs0',
                channelName: '4w6y5yk9qn853r9xza3g7rhud1tl0yq5zp344buoqmu9esgd8htf467l34j1zvglvlnn0e6qlzfnkizqpure5zzszkcyhuzhwi7boku5pflfe64mzxci6b4jjnfy2p5fyghjef7ykwt9gzi57wzwsf7z92715uz1',
                detail: 'Iste est fugiat. Aut perspiciatis distinctio similique officia blanditiis quis asperiores odio. Veritatis quidem in. Velit et totam aut quia. Sapiente est voluptas est voluptas odio. Vitae voluptatem necessitatibus doloremque error explicabo recusandae nihil.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'nsw721itg30a3tin7u50c70mbsc9zajecze3pxirbq2kojz6o5',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'ngjryjf87ss48n61htby',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 03:38:45',
                executionMonitoringStartAt: '2020-07-23 11:40:47',
                executionMonitoringEndAt: '2020-07-23 14:12:47',
                status: 'ERROR',
                channelId: null,
                channelSapId: 'kxmldwdh9ksqq7nl7c9sygquph6ef5rr7yc3n146dz7e4weg15',
                channelParty: '8c1k1ijp6zxj8pkpbv9nd9wiyqxgv3tmrn76gctz72nqqexqnof41eyfwmjsgmy1pcrgqxd7tydbowa6ewm3dmgtxl09ga59dj3nutf3e2d1y5fsg1t7li8rlle8fzwjpc3yhidawqjp6lygz4g2fvxga2f369hh',
                channelComponent: 'o9wm4qhd5mvrq2di22u1g4skmgli0dpkscrcjtm59bm9rj5gvr12n7f7mte8x1sgxir0kywo2pligh4wf1syuuk8r4vvcycbhvxhfgni9htjzc97fyrt9qh40wc3ip94926ktacmt5k0rfalxlwenoofd531mdhy',
                channelName: '5dx1f00soyqqr5dq0tg0ne074z8nn53wxllp7x66130hf5ordpudf7rio70gbyhwdhjq036msq3dsa1z9ijcpw0q5hsfdz8kwzyyx3percdjly8y80oyz18g3p15hhwlpuv3orn2pjn7is8kqnu84b5r57x4py6k',
                detail: 'Voluptatem iste ipsam praesentium veniam. Non eos consequatur impedit perspiciatis eligendi. Maxime ut voluptas.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'z4lgdtoxom9ein5izspzblvy5e5uuaj26yvqbeummzdcqlr6rk',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: '5k1x3ev5y381hmzqzwq2',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 18:35:30',
                executionMonitoringStartAt: '2020-07-22 21:58:50',
                executionMonitoringEndAt: '2020-07-22 22:21:01',
                status: 'SUCCESSFUL',
                
                channelSapId: 'lr3bdnbfi1qf6u0lku4hsjgha0d84p0edtcv2jqp2i4wnvboa5',
                channelParty: 'pv0rm0dbfip2jki27yckuqf2swk337za8onx9d01mk4gk2g1szax8yrg8vxy4ekrt9sbqcmz8w2pemz3k3g7xonvry575imxg4d30ha5qg2l05la2pl99ah4md72zcoexgfgedexor5w0k6kzjh2afmas2fmblp2',
                channelComponent: 'wlmnci6h1kdgfmt8tlbp9dhfarvus2k3w3omcgnhxeczqral9gt0thtbfqxwijegtngw29ppfandvvlsbi8uuat4aobenrgj0uzu0vwblz6dqbhqrqkeoymknheu9q7klsxbs5p5k522vpupshhqca58w0edfw2i',
                channelName: '4vc8z40rxzae9obuvypd2189uufetm07assd9n0x2uc68pa95f6lqzw2e49e2ntggylk20q7kd80u3ls6s4066qrm35rpmo66ufi1jakdfz4pa2wnme8tf4snbm2uqi54bt1xewv53a9raui165u9aiw7ei6rwlj',
                detail: 'Quam dolor necessitatibus soluta odio. Dolorem est ea qui commodi. Illum aspernatur aliquam vitae fuga magni deserunt sed ut natus. Omnis sunt sed ipsa. Veniam esse rem cumque doloribus adipisci quos ut. Saepe ducimus ex neque commodi blanditiis.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'pjzbm35evay7daqapabuura4zdyejdwl7gsjx7elojxm1cq3z6',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: '8p7uuodmawu8ngrvdijl',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 02:09:47',
                executionMonitoringStartAt: '2020-07-22 22:32:52',
                executionMonitoringEndAt: '2020-07-23 12:10:03',
                status: 'INACTIVE',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: null,
                channelParty: 'wt1lcbv91vwx7ge9p2sgilvpvbr64x1zvbd9p12uyizj5nzhcxxfhlv68nmnts71gfj3k2xqo9imr8amg7wnbzr2784l9v5ib4co0vh3c69d903faopr0yl3j5b7o6ry3a9ioohk08ex707apypxdf4842msdjoi',
                channelComponent: 'uhk9vq0blaiiiazl2m7c6kf04fvk87sljarn7d13nj33kyae3oy9g38c1r8i7ivixgjcm42gs0ikc9d34093gppir1em31trgjmryk8zcqukvmdpfdhb6mmi1y2n8j9f6xvclgjczo73noxl747b3ga2m5t50a6m',
                channelName: 'zi0pt3b75ckk9epk605di5kxe4go53l1nlzh2id0wzhz6belpbfi9sy40kdx75u871du5ibbplcv0zqcnyo6ozr0243yvdx1thet3y35m899gf7eqyumjxeptrg5gpwlq6c7ykmqi0x8f2xonou7t9w6u914cusa',
                detail: 'Omnis sed qui ut dolorum ea perspiciatis amet sint natus. Ipsam adipisci tempora nihil et laborum ullam hic quo. Nisi tempora esse eligendi non. Mollitia sapiente ut aut ex cupiditate atque omnis aut voluptatem. Quasi quod quod illum dolores dolore nam eum autem quo. Voluptatem at molestias itaque consectetur.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'c9kvr9zbdi4hgr6xjqpm0wm1hft8zx2fvph24i9sp21dueromv',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'ryehkhc25wxbe19lj0ck',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 05:06:51',
                executionMonitoringStartAt: '2020-07-23 05:37:15',
                executionMonitoringEndAt: '2020-07-22 19:13:27',
                status: 'INACTIVE',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                
                channelParty: 'ri1pjfu5dqa4r3v1146zhybqacnmj06dxnl1blqep54a8h8872dt47pda975i5cs6w7898zm9uq0lmma99xhsjtzg3djz22nmkk40mpkk371blcwy9x2lyf9jco8ps1ihcd8ph2bzonc3tlzuwls8jkrnpe82upw',
                channelComponent: '6jhymtttvq39rapb3viwwvqziquc3ybe5o4lmicu5nsy5ltc7dkuukvwi10295vqp31tf9gfjiuh85dur59rzcng34wd5om5rxm4qjkhs5n821u2yj1ot7a9r2i3lzuztklyacoxn5fpznm0u2kko2w6tu07guwp',
                channelName: 'so44bp1you7wdxyvx43i9670lz8e79dqtn78tgzebylxaqghxh71gqnt22ojp1k5din1ly1qxjx8gzf0ilehehpbnuesbmjlgehfpar0g3f9ntga72izf6g3fyd1xathvcq9lv0oora3cxh945kl7wihn9804imr',
                detail: 'Pariatur perferendis magni ipsa a delectus reprehenderit. Eveniet architecto sit sed id id consequatur. Corrupti voluptate sit tempore. Dolorem occaecati dolorem. Eligendi nulla temporibus aperiam officiis rem similique adipisci.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'f5wersq0fqpcq3snwphcri8yn7qwiyprkz047j5duiiybv9uzx',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: '38sqj1ornq4axim9s8lo',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 00:10:58',
                executionMonitoringStartAt: '2020-07-23 07:52:59',
                executionMonitoringEndAt: '2020-07-23 17:26:53',
                status: 'UNKNOWN',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: '4jte5ocbybnmazef1k20ss21neeq6itq296urgqoxkqv960jvu',
                channelParty: 'wtuta49tvom3gbjfzizixu5xpl6t8sujwarpn462j9zxgtansoug2at62orlaj0cwmwpe925kkynz2r3sn6ovfvew74y70v6kovxn42vl5pqrx0uftn8nh2ddsaehnp203tthx7vf7reetwojvj2bw3gra08vtm2',
                channelComponent: null,
                channelName: 'qiu6pfwto2ioo0qerb0l18h3q5d0ytfec8trayocxzqnnm8fqghpjfvbkyvb2mziduy17ltso781bpgvsff6cdb6l4okf70o5pdkl25r4hwyk5vbxtwz06r663mda45z1pf3wrh26ig4td6wlbaxwzg3og5bcbeq',
                detail: 'Sed inventore pariatur dolores est. Qui voluptas iusto id qui esse doloribus qui suscipit. Perspiciatis vitae eveniet neque debitis.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'h8he0lumqm9lu2djgp5pt91m5839rck8jh88vcyx069u41ssjn',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: '2o0bpqxsdlkuez4lskz1',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 03:09:04',
                executionMonitoringStartAt: '2020-07-23 16:38:24',
                executionMonitoringEndAt: '2020-07-23 04:35:25',
                status: 'STOPPED',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'qvnu7luj4de6n9bo7us25xh55l4plqu43hrfvqjtyhjd7a0mas',
                channelParty: 'oklqo3x630sp2ygeljjlhkp10ba9qpnwpl5k9zghzk5po7y56kormug6zzddgpcn8fn7zjkc3x7mjdqcy5tmv54yi0g9pbay5yivyr41cbaom1hayc96y8ldmux5opicnc5ss32xv52las7wh0p5f04zj2i7dn2i',
                
                channelName: '6psfe2gl0sbq64ncmm1q9qqt1ct9w6he8e5b1rzb2chuckh3zms2dd3c2zkr3406f1zp3u56ylnecvur633gtb3ot24pgy2xikh7xd7rvizh14t79n866itehvjxwvb0r38e73xk6ytzrsdq7ib2u86z8ysjvfuh',
                detail: 'Quibusdam architecto nesciunt repellat nam sit. Harum laboriosam non. Sed excepturi quia molestias voluptatibus. Vero quasi laborum laboriosam accusantium ipsa culpa ullam.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: '6td60hwmyn4dpvdrzlrbvy15lv7r78qgecfdcgof9nsdkq1phz',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: '02q1noxd6w87qhfzdg9g',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 10:21:26',
                executionMonitoringStartAt: '2020-07-23 08:25:02',
                executionMonitoringEndAt: '2020-07-23 15:06:38',
                status: 'UNKNOWN',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: '5rtfsv0gh2v0dfy2eix62c3vcmp7p8v2if0u03sfks6g85ahr5',
                channelParty: 'cuid93g6lhp1f28veh01n1kzttbvd839d8pkglw6nlsymqk87mu2jrxrzdymynq3z51aguhyyreu23dxf4oy4uxsijo2uei4itzeyosy2oq6rqviglmf04g0ksvleho1v2xizo8phb41weqkg5b7yjz74xyafb0r',
                channelComponent: 'de17pafcqksrpx2ts2tl3dtld78qc2311zw084fpzajccbafhq915bbl3kyk2pom22umqcc79bu4dmm9r4g61a9govdlplya6mrk3sqfd7fq74f1gplmtuye7ujvakxks8zau1o35h5sgio4mpn48btjd6y1pjqx',
                channelName: null,
                detail: 'Consequatur rerum quo sed nemo quis unde. Ut voluptas id. Odio iusto voluptas dolor sed nihil. Nam maxime quae fugit ipsam eos voluptatibus. Voluptatum rem rerum consequuntur est.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: '1nfse9ah1n9jlbbmz1ksa2h0gtpus5gyojbdw66btr3nsmrkeh',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'd4meado73hrl7hzrpqpc',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 11:50:03',
                executionMonitoringStartAt: '2020-07-22 23:48:28',
                executionMonitoringEndAt: '2020-07-23 09:37:06',
                status: 'STOPPED',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'd2mipnerf6kgtobjk0rbvctq0i6des6a2as1azde50dybpuh9g',
                channelParty: '7lkytyakwwhhis3cf2ezcpio6ovtemw3tde7yiby52mr47de0q8g7yg3q0n3oitncyf69ehxcb44kvvv26p2nzkjwc2km52pjvbki3ds34j3xx1wnot2peu0cclvzes3czc6t14s5n2w5g7mltfp41g01w5ckww1',
                channelComponent: 'd5a68xcknxtnjymz0k9r3o7vaooo226treiw7dj8tqpz3rgbuabgl8c260in7wkygc2h647j6isqygi9oak0x8i1zjgjmiix0rb3vfrxlaujaeyfk547nv4mhcvdhsrll93hmf6t27rfhohxr8xgslrb8ucjaq7c',
                
                detail: 'Laudantium aliquid dolor similique possimus voluptas laborum repudiandae est. Accusantium eos inventore ipsum modi necessitatibus optio sed aliquam. Ea rerum quis temporibus expedita. Fugit dolor pariatur omnis. Dolore sed maxime quia aut ea dolor quia assumenda. Tempore voluptas magnam deserunt voluptatem accusantium qui necessitatibus nesciunt mollitia.',
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
                id: 'cu2gbaccjrwshqslx4fz5f7quxysava2il4dz',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: '508nscwyivg7hu3t58caaxex2hsjhdd7v0qsvgadc2v8friinn',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: '9o8j5yfvl5aio18ihjvl',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 09:25:37',
                executionMonitoringStartAt: '2020-07-23 10:38:09',
                executionMonitoringEndAt: '2020-07-23 12:07:07',
                status: 'UNKNOWN',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'o3trbid4204clged7ujui9hd8bmles5yolitfojs06mjk6ynrh',
                channelParty: 'z7vb6o45mmifh9co3h3q455rfpj72j3m84d7cukdcx3swznyjcygdl44geuh0aoalhaq4pax59q3db73sc90ov48010w6101l9c597erlw1pavizoo5hepokkx0fiena93wcxajlsrbe4k9takwzmx3vwrnf1142',
                channelComponent: 'nwpdqdiijm14ml6d3epl7c053cw6tyd16dl3mqguaz09bx76a4lxl3g91oqc13dj9v2b87rblh4uob63bb9flrax37u50rumb5hwwt9sadd8of28wqowr9ukc6eyqshlbbeqb0ln4p30qwsah979acu0noajq5zn',
                channelName: 'wz3wgqitrlvojehj1p3be44qkjv40tg6977hvk0w5ctvmc6oq8er3hxb1tivvtrfcd6b4ci8osbm23lw3nehq26g9g7tbjnvh6z4bzgiozqg332z0sdu64er4huchgvi46vu9lv0zdgm7q36b4f9w0a2gewocpsj',
                detail: 'Tempora qui cupiditate maxime rerum et. Eos vitae incidunt est facere deleniti est consequuntur. Nobis ut porro velit sit sunt deleniti.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: '04logfzji27g3k2vz65rmt4fbil6grh210vh2',
                tenantCode: 'ufnuw9o6bdpcll1zcev6fypzutgqfyygfjuu28phlb44mtyswf',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'lka5a991cptci1p8aanu',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 09:02:16',
                executionMonitoringStartAt: '2020-07-23 00:22:27',
                executionMonitoringEndAt: '2020-07-23 13:24:51',
                status: 'UNREGISTERED',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'y5k5waugeprzqhae4tb2uv3by3y1byivt7shzqifmfoswizbwk',
                channelParty: 'lwfyhrwje6h1jnz1k0d217op2xavqaolp94ftv61g7oa58lm8of6xqojpa55phymeri7ruqcbdractfo7q0jj6xbbuc1n6254aglxcfi6r66ct16kk7bog9pe654zrhblsuamjz3rhl12ap9lh2ehj54udniqckn',
                channelComponent: '0ah7zcfrw3gr4yxhwcu3e0frgsfmzuf6qpk8f64885x1fs23atht5e6vzf8y4h0iaqwpedykevqz6t1jbuuinpzu9w22czmi0o14kmz76sas8e1ha6kbuc0s2nzwm25iyogj2jyx6rs0q037sxr6v1rm4rh6ini8',
                channelName: '9v8jfkxqwdbr73xatoycsqxy0j948yaeqa40rzp4mr7am4hu4oztp5tich08rznj3l3jagkw115v275w19iv4b4jiltx7vthlhvbe3n7kt6j5qtdgf56qvpk1l4t37cfygixxay2nsc0ggdvw3rmh5pfsc6z57j2',
                detail: 'Pariatur dolores dolor. Accusantium ad corporis. Mollitia aut ducimus quia dolores. Voluptatem voluptas voluptate. Autem ut soluta ipsam vel a ut aut maiores fugiat.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: '4gd3jvo93xbrsuezynricjln8hjdquv48xvm8rzr0qlrn1wmiv',
                systemId: 'yxe6dbp70oes6psgyu2iqfef80xmofbjjoj8j',
                systemName: 'mlu6p8bp9y4sqn7bhvww',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 06:21:43',
                executionMonitoringStartAt: '2020-07-23 17:28:39',
                executionMonitoringEndAt: '2020-07-23 12:06:18',
                status: 'ERROR',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: '1l9l7b5awx8o47fba3spmod1qihnu1588fia7qwocxx1fpians',
                channelParty: 'tasg5fbnbjdnx08kjhmkneeca5wyzdymbt6gvz12fzfiavmil5mrh4peepf0jan3kfbxqldqny10qs8axoeu7faw1x9rtbcnqapuo3j2l51gyndj4410huphqpqz70d9zd3wxta2584hw1cldr2b21efh13p4fej',
                channelComponent: 'iwbyibgivuc9w3iv6p5o4w5m7329upn5su7b7n9bf2zaxf48ixpir8yz62pm4zqz5xhwqjtzdx1hcar8wdyq2za9csxokuh2ogjoyvysipcwmvwggnf0xf9vvrz3dzwyihxw9o9aiof57fk4xmsr44w4yxuy3ejg',
                channelName: 'upzs9a7yunqv82x8uyenrb8lff0seqw8ub40c270ce0vugv19fvdvjxkabcrgztg2c9658zly9xqun52nyvgfoborihcegvit9jf4k38p69r9gcy65ww8xjx77cv60x9855bcslubo21xsy4pvnlyht0uxesgoc7',
                detail: 'Enim placeat illum consequatur. Officiis suscipit eum. Facilis numquam maiores non voluptas. Neque suscipit quos a ut. Hic aut excepturi autem rerum repellat eos.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: '5svn0t29hif0j09ukzlb97f4ro5ll812c9garns4na0hxh65hp',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'zf2ztb0hiab0fgi0i6nt',
                executionId: '44qf7zc3rf2m8t55w50rp02zo4aoamukql1ch',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 05:51:36',
                executionMonitoringStartAt: '2020-07-23 17:01:51',
                executionMonitoringEndAt: '2020-07-23 04:36:43',
                status: 'ERROR',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'uhewjhm8xlfjjccz1litnzz3fkt6fbjso6dtozjibcf7rsougm',
                channelParty: 'wz4fiect3djwnnpqacxnzosqr8rtuvtqitse96tmzgkv81eo8k06d5jw2vv17h7omlf85vu37rvn1cix286227dc66b4cddobduhtem3t0jmvpdev0fku9hqy3ru5z7nn2m4pz438m49l6i3nze4o1tiwn9mmbin',
                channelComponent: 'mpeckvshatz48o00h992pmulwcenkqcn88qwuoltcglbwxovdyhynhwrvbrf3px0u4pzkx4dwy5ht9dxzfht27ewiydkj0nv5rpkfzzka6ug3ql8o8tn09e1s3w60tpo60nof16u2j27c8fs54jzh23c598ilkwr',
                channelName: 'ovrw8i3d4ps3w4p9gkrzcyt8u7gmfu20a0zb8q8cnzcx6p4ice471a8d1xny1hmi37ra6dxvlochobcavjr69a8npov45ik4wnvuzu8oqu5umlmk2ovg2se94xvribw7jndgozto85dm469g2pirdgp2w9q1sntb',
                detail: 'Officiis numquam ut et. Voluptates perspiciatis sequi facilis voluptatibus sit alias et. Iste et sit qui tempore officia vel qui et unde. Et omnis adipisci excepturi delectus ut ut. Asperiores dolores harum maiores et sed necessitatibus tenetur. Quibusdam ut est dolorem sed.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'lj5djdqzpixst45f3gf7lv9u5zqwymx85vggswdd2qfh0eu1yb',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: '9nuyh5deh5ktho9egp09',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 03:36:03',
                executionMonitoringStartAt: '2020-07-23 11:18:24',
                executionMonitoringEndAt: '2020-07-23 16:22:50',
                status: 'UNREGISTERED',
                channelId: '65p8votoq1drxb8v7xnuy5fya8ysp3ub5ag3h',
                channelSapId: 'f09hxjv7japbh3wl76it2hs0kulym0yfnirdx1pp9ioaoyz192',
                channelParty: 'hs6iluqv7inwk9zr141dcrdafyldse4qzbuxhcpx70gs1lz7naupys8mbd1163meo2s6r830twu4v4pgg75sv61qxkq3qzj50tqpum4ok06bnf7e8q6htlsffmvzr5e4cjlq1mogwayoool0knqxr57ew7ig69j0',
                channelComponent: 'cca32nl5spb5ulywub89ou0hk02wqvygz3ehyyf7g2hdwlyd3rzf90x2tma8vjryrfidq43vxgbx99qbq7eb36gkhgs7y8j03dpitwyetosw0yqgcljmaff4qsve1r0flw8jfbcx8i4k6v9e4bsr780usg1a7u0l',
                channelName: '26j4vl6vg6pqkeqql6wdbz3adc89uyao9hktf70g4ag40lrkzd2loe3qfia78zg1lnl0osc9xykjz9eklev9n3385fqeoxptydl2esdf1ho9g60ssrt8fuk3qtsu1nr4wpb16tajqna6f3e0t1te0ixmwvnzruxf',
                detail: 'Voluptatem repudiandae eligendi sed. Quo aut labore culpa ipsum odit est quibusdam. Recusandae est vero aspernatur placeat animi voluptates amet optio. Id doloremque voluptatem accusantium aut aliquid. Cum non mollitia nobis blanditiis nostrum.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'supxrw7vmmd0cxl0v2uw9s2e8zrtrj47nto9geh9awxplipzlqj',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'pknbd4xrlgkdvgys4pc6',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 21:59:32',
                executionMonitoringStartAt: '2020-07-23 08:27:21',
                executionMonitoringEndAt: '2020-07-22 18:54:49',
                status: 'STOPPED',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'v0fmjc9m8szepicf5lu41u3jxdlo8ia09fokhkceit9f486tcs',
                channelParty: 'giztxtuqcxgqq3xs1v8qxmm90rn2e3vrat0955fr8qnawzyul8lqsyneuwx986zyhfokvx22dj6sp8s4udflmivjkg3662bifmmj5wz9pejc6t10zhzhwqg8ecihdleyjgumw5e6q45x099mg2rwi0tbqjkwup9r',
                channelComponent: 'vzzgkxclkldyhmft2nm26w93qredzrmr38swwhz9tj3knx1gjrh8plov1uh0t1x4mnmw47l9gcjq1j2a0p7nvsg6aappjw2qxplemslq24xa0voo3c25vq7s18hj1f3iifeq5bcikef1tqea8ab4ueag5lwrz60w',
                channelName: '4zej0fphjbkowgqj7pd2wl2zt65w2aj84ft3kx7wfzs6ewi9cmrqlhrlz4svlli2l3fx4gh9a5ctjfxngpfrmvhg61wwu0lb6cs7j8j1dniia96cd7l9ohdzpzhemk46d5c79px738bznsekf9qbj0muozha0btu',
                detail: 'Quam quibusdam deleniti asperiores accusamus sunt nisi. Eos fugit molestias ad rem. Ratione consequuntur impedit qui. Eius quo est deserunt qui.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'vgdnxm3g7r2t66ylk963twrq70cqu5c4m5uanwu2rjzgvlmohf',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'ht25caiodgtfthvau1rqa',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 16:43:43',
                executionMonitoringStartAt: '2020-07-23 13:08:19',
                executionMonitoringEndAt: '2020-07-23 14:14:41',
                status: 'UNKNOWN',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'th1f5wjopl6vxo5ogrout4ceq59s0vpqa9ekr4a41d98xxrvf4',
                channelParty: 'gxso1m9tt0uhx85pmekfvrvkoxw5uheso23d7f0kbuk6iq98mxmwfd2casf0odstkcu8g609z428lwvax9gzjcxwmpzycvs60sy3b74mill51d98oafexx4rhi70lqdq37cuylynkrg8jezho26empqxjhj3rm8c',
                channelComponent: 'bzr7jlktagm8rph0v9kao8tria3b93sllcyrickspk94xcpj87cg4nrasr220sqdstnzak9696kroc2ose1nd296izfet8eohvci58q2rv1lqvwyt6p4rc03o7myxe095ijy0linmry6fx04072jg7sotyq9pjy0',
                channelName: '97b6ofeu7r4oep6b9j8xdu0oo9nibdclnguq7qcwxe6wrahypv64y0vnx7tp48d5dq9eicy2va77rhffswi9hxqqdewna1kqhl28bifgq1xwvw53l9p1fla8msvxlhvuee9zruww6ozgk7iblnb1qu3klv9t7xjv',
                detail: 'Perferendis in quam. Dolorem vel odio molestias. Mollitia repellendus incidunt incidunt non. Veritatis eligendi itaque minus.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'zoomzkyodywilbqdlrf6fw6fiirpa4twlg1rc7y3glscc4xk58',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'ga7ixxmyw6l97pe1e3cm',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 19:57:34',
                executionMonitoringStartAt: '2020-07-23 09:15:09',
                executionMonitoringEndAt: '2020-07-22 21:13:12',
                status: 'UNKNOWN',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: '2vy4u86158b2j8qfc04lurbwpj3qsf0f7peh18fwh4ix9ofmlpo',
                channelParty: 'bojxmvrc47igo97h366qd0ihjwtduq8p8dki1zqik70o7ztg6e7h6oo93jfeodfd4kqbjpuv0ff96gwflzhysmhtny3kvb9v19317bc339ktk0va118z2k26z471k0qlk3xj2wtmg8f298qagveqjw4gdazww20a',
                channelComponent: 'mdrcjpvrt0vgal7gqes9m7bqoe2wn80o9cl0tidkegv3ee6phyjqggxowmv2teuu1lgayai2o7k2grqk8ltdvyrufvys2yesraqemgjhl29m60w2hv5z2he7wwisz3ozzj73x35oofu9y6bkaesgd4oaca60z6ku',
                channelName: 'p8turt8q1saowocpyexe4bdroti77a4hil6y4s9ims0vjvsi1cqjmenu9ympictjxuq0r91m9j16x53karej2m6sj5gqrhbrg61f91tjzewj97t453jn6fxpt9u37uvcmy7hu3f8wt16tego2djyh1kn4ys8osns',
                detail: 'Earum omnis dicta est eius. Quibusdam ab non ea aspernatur et. Magnam veniam rerum et recusandae qui molestias itaque voluptatem. Facere quibusdam nostrum ut. Nam vero quae aut perspiciatis quia quae. Aut dignissimos cupiditate.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'iobnik9usf4r9njhcluthmou8h7qaw0zrlwofx14ioyp8hs2qd',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'wyzp6hfynjt7sc7mi38v',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 04:57:50',
                executionMonitoringStartAt: '2020-07-23 03:28:05',
                executionMonitoringEndAt: '2020-07-23 14:54:35',
                status: 'UNKNOWN',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'zm1cdj8u5nzxo90bcmrd8gko4p340q0vm99gjou3sufv5fqkr1',
                channelParty: '3wsh6lygjq4arqb2a16f7b5qp6bqmf3yl557q9cvteylyphcvyo5z5juujkgatjunzg2aslha8i398i8tdnfn283n1od7rydef1xcd4h0gth9ea5gdmfyi4z8598gl5tdmuuf4rrw5w0ol93c3teu2g5zqiluj8er',
                channelComponent: 'f6oomb72v5mqge1x15esb5y9hfi52h7yadaf4wb68ncuk6ogagv7gbs3mwucwgr3cro2lwmuluvmhqr9n5lq5pe4o9iuovh6m5qqsjzogil5v2yu5rs6krorqptz0g6i3rsoklx4uaj019a0gv1fk9jg7fggc79j',
                channelName: 'jycfn94lad1f9dj68r7o6sskq4niohq7gcjxy7mngp5snf1kvizq124c09iyb0p7ay4mohieaw5k116cs7p3k3fltn791mjfgr0gxq67puhdb98dzvc2ka7x2qne7xm6w6m49soewfy1d46sjmhcgf9xx2ih8rtp',
                detail: 'Quia dolorem fugiat quae possimus voluptatibus in autem quisquam. Quo et deleniti omnis cupiditate minima voluptas cum. Deleniti adipisci ipsum dolores porro.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'bwun2siwmt9fdfjiw2q85l36z7wgqv28tp6g5fogsx8atv83y6',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'hi1lls9yrv52tuz61g7u',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 03:31:17',
                executionMonitoringStartAt: '2020-07-23 16:10:23',
                executionMonitoringEndAt: '2020-07-23 04:49:22',
                status: 'UNREGISTERED',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: '5un48r4ee20835mruifhw2ihgqsl5d9dqe3vj28ry5yrmelhyi',
                channelParty: '9sacyp27x04sqc2g8wonfg7myxtkdcasm0d68o4vmw9rvnq78hi58846xw4z8r5crg0qqhxslx3jd4raoywp15hsn56zpikz9w6zmuenytfsrye04bqdtkt93zn6esu0ppnlbk9o1hyu57vragvwzbs496pqnt1q',
                channelComponent: 'f6aibpg6ji4udlvlhten02gtp84pi3hirh19b98e43dpu8kg2pbkgqlzu1ufdb0bm9gnjafwn12w96tdfo9miwg2bj65jkoargtks7nkmpyt1bci2k9e2wau5g9lyg2arwjjps2rqdfepa5ezxhkqukibi48xpl36',
                channelName: 'nj22msi6rrofaz8o38u3gpf716txlrkb52xmjhib24wbvxbocz5kh9xsh6c9ijry2kwx0j6rouixeldjs5pd3q2hph53kcb4zd7bxf40hbcw5yfteokjk344emgv1eoat1ehng2iyv8iismntnmvp3k52omhq82d',
                detail: 'Ut et officiis. Eos aut autem ullam eaque quisquam magnam. Quo magnam et. Fugiat architecto similique fugit.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'u2g2dz3y09bwx5nvchswduho2hmbf88kp5dc69hq5fdtjfp1za',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: '925en1twqb3o0udjgcc1',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 08:23:44',
                executionMonitoringStartAt: '2020-07-22 23:38:35',
                executionMonitoringEndAt: '2020-07-23 11:49:06',
                status: 'STOPPED',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'tq8p4tc29bjyqz6r6gcad1emsh4ki3xff0c8ajo30655kou7w6',
                channelParty: 'kxtukf77twk2zk6g3570e10j6d3mlm2cijyg1qpkbv1wpzqsq7j43vdz60nhklj46burdkpdd9h9utkes47vtiy8dromnvba8u79cy7giy0btki4bzikm7h33qiqx3k4fx54gmf3uf0i8gg24uaatxbvjv0tsuds',
                channelComponent: 'bkrz6p3ak8x31uhhl53yc3mxjoaav0sem8zs98hyd8anxtvbreayzfbf065zsrsvbili1qzcjaw86a4zw4ytpi4d2shffpi8ddnon85ljl8ojm488td79zjdq1dlq9v6miq37s4ocx3o9zwzgclbjec4akq21kdi',
                channelName: 'prqw2ldkxikg6tz7f1165rdvgfnsf7s7nd06bb67rr22dgucqo2g2gtx9wp08404oxonnsl71m5flt693pn0e4a9cz46m5deiowsakuq2fri2sw2uziypjouxophr0mdlvdswwb79d9t9vh04r1tgh6huii2gu7uu',
                detail: 'Voluptas sunt a non qui illo. Quos qui iusto odio sit. Ex voluptas perspiciatis dolor officia doloribus dolore vel libero et. Quae quam vero aliquam.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'vilpw0x7ccsq6f2t3c6s47hd0724jdt0b8xv99tttfe7qa7n0c',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'eaof1a469cwx3w1ihx2f',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-23 04:38:40',
                executionMonitoringStartAt: '2020-07-23 17:17:10',
                executionMonitoringEndAt: '2020-07-23 06:05:42',
                status: 'UNKNOWN',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: '1sx4l1yns8nwc5ushlolpdiobtns7of295943xhuqnng0lxj8e',
                channelParty: 'kndrmerhgxxzmyeddtylrpaerrkmy83np85iskpfqwczwsai7eveeh799iewmw552bdjhcjk4xl1hx3s2naycxlln6um74jtohusi9r6ua6ok7ubrzio9fl6fxgcjwev21l3r2nz4qzdm5idlcnp9negnb6531fe',
                channelComponent: 'zjyie0utlytjx1ssh8cjsz9x522u7qrs0w0x8yxrfp07roiimsu7jb4p0kytqzcvqoxiuhkcp90lrbxt87ghifrmutkj908qj8klvbp0ol3qmb635ylj5k0zyo20oolkf0zdc2unfcy15b7oibxpvcwscew6xtvn',
                channelName: 'isi9suvt0ge1jjv8yq4dvyom0k23x5tgcnu6pl1f7w3h35fdh2iypnx7bnkxg6x0l8ng5wjerd1a93tnudnnqbigex0spq56drdr5ip3gknaqskniit5k045bfg5zddlz3z9emdw9cc5sj85stotc18uxahh352e',
                detail: 'Laudantium exercitationem beatae et eius dolor sit. Temporibus a sequi esse consectetur beatae numquam quidem qui eaque. Et eos voluptatem. Recusandae architecto nostrum enim est ut architecto dolore labore doloremque. Atque unde nulla ullam architecto odit repudiandae odio.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'nvw8mdz6hhvmj11av0ftfiq6ptc3yy4xpf0fii769vsu2yv3pg',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'xvbk8vhl56oyy39aac1n',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 21:41:17',
                executionMonitoringStartAt: '2020-07-23 03:31:13',
                executionMonitoringEndAt: '2020-07-23 12:28:04',
                status: 'XXXX',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'ei8fnna1v7rp21ilwm7xn4qi9obw1z89yzano1o5ngjj3dlm3l',
                channelParty: '77tx6vopd72e9dfkqnatuf2lcvjs9l88ahqmiay49kw8yo3lkccrm5aawvjj4bb6owqtubt8hn36et2zeao8pw9keuva0bn81aqubycu9pgbpp4k2iq5rjlen1ajl117j6ibxoh11d8be6dcql6x5zw7clwugxsv',
                channelComponent: 'fmy4ogf7i5krrkup6x3ot3fnrh9j4lm2a6chvtk0mtt3vrgih23loc0treh5tn8az33yth7as1445qd1lziwnrivcuq0q0v138znmq6ruwvutvt9ffq35f6x3cyzkx7et6r1lgp46vcx9vxue39es9pngzcdlx52',
                channelName: 'o4myj2lua3ba6dhagastiuxqjz4yl6pu8bsdktuzdk10538l77otcbu1esmmcej3lj0xiqg0dcvs3ajwktdhaevs4tyh7huvgmjt2rryejj7oosspxjh0ms0xlgr3jflcmzwm4thu1ty7bdhvuunc0dvs3zdemog',
                detail: 'Sunt rem reiciendis occaecati adipisci repudiandae qui aut adipisci et. Exercitationem velit harum earum fugit consequatur perspiciatis quae dolor magni. Assumenda id sunt explicabo necessitatibus rem incidunt. Culpa quia aut et velit minus minima dolores aut.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'he00tbsbshzc3lfjfbv2whdexn026am2r39g0lhvzxd1fklou3',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'ndb5vscte81ag0t1jt47',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-23 12:59:37',
                executionMonitoringEndAt: '2020-07-23 14:00:15',
                status: 'UNREGISTERED',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'ipuh3xpke3yvvbl8v0hs68zzrjaeyb57hl1iublrikufodr127',
                channelParty: '8nm3fqq79v4orur6t66um3uoie6qfdcfz2k9cy6tx146saoo6thhb6on7ab5zmnx0hr401yxxe1e4ubesyarjkf8n6e5koaaghq8vqsa2ndovxmdp0916cdo1eknxt3zg41md9q1pfrqt52on4we34s0t2z5nr9y',
                channelComponent: 'gnzxruz2u8n7ksjq8ac4m2ngvg3d8r7noizied5jg3o2oe1cc5qv7etwx3ahu1suzizswlgk7blrh2f8792nx0cangivwdlvqy0tmgi7j9lbdzajx4wgl9750tll0e7u04tk92yibaxktqt76x0osjf4mw37v992',
                channelName: 'hbikma63do3mvzg4s9nbtxebgsmp3v61rxtel9ju1akq3bkbumshqxaczvlgwdh4n0z2nityjgqqxgru85rc16tsf0jnn1vevowauypuxb4hwu0codmhaz5i236p40qwcabdmioh5iraun99pc0541asb46oinyi',
                detail: 'Qui dolor et labore architecto voluptatibus nostrum. Mollitia perspiciatis voluptatibus est doloremque. Porro eveniet laborum non voluptates aperiam blanditiis explicabo optio impedit. In dolores praesentium. Vel vel fugit corrupti eligendi porro dignissimos vel aut.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: '6j2dvu99vwlyf1mgph69t51ic20gz3e2i7pmgtiuc0tnoyo0it',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'z9hwca944xc74adz9uyy',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 15:14:30',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-23 17:07:59',
                status: 'STOPPED',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'wjj1gey35djgvcpyr3jlabqpycu8vc0sqtmzgt9h6a6xbr7zwo',
                channelParty: 'jmnrm9shj05wenh1nk1vpqgit1x3i7k8gf9f7tcdzdns9oume3sq3dje6g7xx895ezk9b7btjbrkcddyjp9etfpsu3eynvqbx39tbyv8ud4j64g36z3hfmzh98vzd9z8rb0n7rm8btelaa63si8enabcqc8f1puj',
                channelComponent: 'q1pqui17aair6uctmob4y9jxgf60px116ehijl02mmsmns9kllxc3iz2zt689icjrp3o7id0rt718m7s8m0shpspwjdu4igoa885padybrhg3l09l81p2z47j1y96whi44ernmkrsbkj1r38fapjnk3qj9qo5gix',
                channelName: '022hr70opxw3iqi2jq23qmy2otx5owblowhjxbbxgkni5w4lc95vp2j6ln8vk5qu6zu56e6x6v13uf6e3y6m10ix7hqntgre3nwhwoiosr8kokefli8krsdr3hcudh97ecghtoli5tnu7urey382fhrmng239ujy',
                detail: 'Eum libero vitae et ex ea illum est. Et commodi quaerat dolore veritatis et sunt necessitatibus et alias. Et laborum facilis aut sed neque. Sed harum pariatur nesciunt dicta harum. Qui accusantium incidunt vero fugiat.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'he3k98vggbivie226z46alc4rbiitrtu3cszi7sayrqq3lilmu',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'wesgyta9n6kqrazflu2k',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 16:12:44',
                executionMonitoringStartAt: '2020-07-23 15:27:35',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'gmou6nrr5x6wexpmjvxsrfz4itbwd9l57x22xonyvv2boog7k5',
                channelParty: 'urtghzk9igp39919pek2g3uoe21dzwkwhrxvsahwa79zx8oqomvu1we6egt4wx1gh0px2t3ixowxbkdxg879d3wdc00q7ld1aytizmzkutr0wq2h8w3sd87fabhv5propx0p6pwyi61wue3gepbblto66ag91tav',
                channelComponent: 'p551gpvsica6r1atc0bew81oj3imrkiua8kztznrsj55si6humb4wig24rqcuqkqkiqozxy6hte1194zwsetbpedza8n9q63txrvulqnpgv50ldefopzteh75y7ne6xbiiru5y0xxd1tx9nx7p89gcy20v27c4zh',
                channelName: 'zpxct5ns11qzn975akhunnxgxgv0p62v67qe6fe0vrp17nqgtepwews57t904kc05dk43qzxbkc1m2n0svzx33ssjdjid80213bwuxf5f61iuucz6tukt0tacsgkhvplfromu92twe4mgzpkqvi6wxvv6wxbul1u',
                detail: 'Eos quo dolores rem consequatur iure. Tempore nisi labore accusantium non aspernatur vel quo voluptatem rerum. Voluptatem voluptatum est. Atque id animi voluptas nostrum reprehenderit. Vel explicabo quasi officiis consectetur.',
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
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'p8o85kypfaxerjbh248mcysb6kj2uy9cz87lt6hh0nvlcvujvi',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'efv2t3ac2bf24sl86cne',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 22:52:17',
                executionMonitoringStartAt: '2020-07-23 12:07:13',
                executionMonitoringEndAt: '2020-07-23 09:53:44',
                status: 'UNREGISTERED',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: 'kcxw15xmr9e1gsolf738prjodrlvqc7nwa2c426veufstvqaiq',
                channelParty: 'gqfu88gw40ra2lm64tgidqx0ymn43g8clv1ee6l1sthff7t30lhtlk4gxah2xgqlhc7rw7wl3dspvww85ty2m34vyv96211i9xnlzy3usc8uf9u5c3qs40jufwpwu62hsggmuujhi7nocoq5s1s89hujrlynzdyo',
                channelComponent: 'jyxytt2ebjyctzxy8e4383kx5sxjwhfdin2c1wwtwgkdghxxybtnzl4b7651wmbvy1ezs4do1m500ntjd2b2i97adghub3ebxexs38obwpatzyjh33xq752wz0h39qasz9yc8zk60jixtneirdpnqeic5ndt47m0',
                channelName: 'lq0lns1pa59k2285f2taxm5rtole3lcaj4p22xaa5wh0t4hp4siqa0mf38g8nu3j71qpsdk0ray8g1kv4nb9vct4uyco7wpwqabctpqa0wmww4kl353b3jqz8cdvbgzbk4u4xnzksbnxxoybdn0928j4mt9cmxoc',
                detail: 'Officiis aspernatur atque similique aut aut consequuntur soluta. Adipisci sint veniam. Ad illum maxime ex soluta voluptas ea earum saepe. Libero et possimus. Iure dolore soluta consequatur.',
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
                        value   : '4bf7d91c-c237-47d6-a93c-246e32a8d58e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4bf7d91c-c237-47d6-a93c-246e32a8d58e'));
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
            .get('/bplus-it-sappi/channel-detail/4bf7d91c-c237-47d6-a93c-246e32a8d58e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4bf7d91c-c237-47d6-a93c-246e32a8d58e'));
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
                
                id: '43f6f954-168a-4cdd-9c2e-9793906ca8a7',
                tenantId: '63f0f900-5f55-4968-8167-72998b495dd7',
                tenantCode: '6y8e8pj6wuovldjih7oyqfexlswp3y0wvu6m00t11wrbdalw2g',
                systemId: 'c2fa86d2-80e5-495e-8c15-39065bfc55b9',
                systemName: 'nlo09sfg129tywbqbdh0',
                executionId: '29e4858e-c852-4a48-8698-cf30a93dff0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 20:28:19',
                executionMonitoringStartAt: '2020-07-23 07:32:48',
                executionMonitoringEndAt: '2020-07-22 22:26:56',
                status: 'INACTIVE',
                channelId: 'ef443618-6ed8-4ec2-9f95-fb08a6297bfa',
                channelSapId: 'jhqbhxobfnot1qxsu827ppuptv46eelqsbnis013sh8boziss5',
                channelParty: 'i09nncja86qyidasavoalzbnt1dbgtl0aa8uqs2ef0kc5cd1o2fah51iosf81ic9icklnq5r9m1z2n3yirnysuqmyp62hejnoevogl2l7fkx3oifofm0cka08qzjcz2otul200pn0xrmfpumkzw1msui5n9se5jo',
                channelComponent: 'jvau3qgjd5lyf6snemk94wbyr4eqm7dulcey45aj7335r6dh7y62s8wai2infgbxj8rf9z7ufjo9ysuojeuypb4fkyrk6e1n2k5gjz5ixaiid5c798qarbq54yw9blgybvhkqx76f0svd1769h0uai7225ef9h9p',
                channelName: 'v70we644b90q0315nwwoecdlodfld0cs4xh4vz8gwxrj4dbq8ahqzgedyx8q72cllq73q2cvjxb06m3kdi8c9q3icfo5iu354fza8se91xfzo1j58bkhtocfbj2b8lz0cltzoiykhag6qpqquomr38eegvjg8lzo',
                detail: 'Qui nihil voluptatem nostrum fugiat qui incidunt eos illo itaque. Eos cupiditate ut culpa eius qui quaerat ut. Assumenda perferendis libero corporis. Odio sint eos. Consequatur rerum dolorem fugiat quod. Doloribus nulla perferendis animi.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                tenantCode: 'wr27762chcnxtj6t2k8xovpqw8yosj33d5z092x6w09bxclgkn',
                systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                systemName: 'cfhkuj8yfd39ocvudc45',
                executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 07:17:45',
                executionMonitoringStartAt: '2020-07-23 12:14:46',
                executionMonitoringEndAt: '2020-07-23 02:48:47',
                status: 'SUCCESSFUL',
                channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                channelSapId: '4n4q8fdynsf5b4enes5ovmtjxvegji81i5yo4syx775zz22kr9',
                channelParty: '4g7u8tc3pfwry3pvnaw4ad5xc65a3959sgga1ztub7r4pk85ds6f9hg544gmbonvqmodm8v3a6nrbq9nus2kp8x62lpi856lvjebsswiyyacx97vbkzatj3z7up1xm999gfbwzjyqcdwe66d4efunng94zog9wfb',
                channelComponent: 'anfht5kwtewic2utb4is8hlwuxr6ff87eeny28p3p7p8xsfzw1gfqqn9rjl56t2ku2vou0p4dtkya8sxu5mw26fifc4f0vv2h5zw2i3icsoojbox1jf3ofn0mj2hooot1mteworkpvnaki6qd1xz7k8m92vpsa2s',
                channelName: 'wueas43l9vg2a37u76438kh80i19vnbavgxuzm9rqiyx69dfqmozmiqamo4mnu01a8a5b8t21r6ghny0dwg6zf2zdendphakn234apmkopedq1gicvoh1p3cy39ob8xadv8p32qk4bja3tjm2u5nli3bm98da689',
                detail: 'Aspernatur beatae qui ut. Voluptatem itaque distinctio totam in eius. Consequuntur molestiae sed animi. Quisquam iste necessitatibus perspiciatis.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4bf7d91c-c237-47d6-a93c-246e32a8d58e'));
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
            .delete('/bplus-it-sappi/channel-detail/4bf7d91c-c237-47d6-a93c-246e32a8d58e')
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
                        id: '242a14b4-b55d-417f-95d1-5028dd4a59cd',
                        tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                        tenantCode: '9jn18fer5sqbq02twivpsico2036uot6jmop0pp1454zwob6yw',
                        systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                        systemName: 'kpmmtf7l4dynttt7llwa',
                        executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-22 23:13:53',
                        executionMonitoringStartAt: '2020-07-23 12:10:16',
                        executionMonitoringEndAt: '2020-07-23 01:28:15',
                        status: 'UNKNOWN',
                        channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                        channelSapId: 'fjhxn3e7x4uyipre1j5mz2q7jrtkats3iwpr1xgkz6adu3wm1q',
                        channelParty: 'f88nv893ekg72c6nzs30d6difkisog7bk4ga4fvfr1bcwrg20zw1zsnk5n24gn6fpfz9xd3k0fud97546s4hbew9mapg9m0bywr71xd9n3yzdghed5nwx1ibk62o2v0xnansta9p3x4e1fz5e9fxj51vbhoukz07',
                        channelComponent: 'iawn0w2n1c1aaqd91ox4ww7spkemubvgfwjzfwt9e05mrd5kwqdnl5ddhcjf4j32xp78f95ryqw2sbg01knttfmc9d963k9bnmqlyemhxsq1bayd29oqcwjw5cd2m1c3bpay74r6y6fr80w34bnj6hn1czhgc1cl',
                        channelName: 'otx7g4u22k64vd3fcw1m8gct3jf7nqi3th384nvxzotyvbs1uijad8kmfhdxj5fm25lewd7v8cnpz9cadg4kdca1g9rl521zt3mxxbupc4b5gsd47l1onofa7dhci5fu3lqf28gdrrrs8pa3ha544759p6ixe81m',
                        detail: 'Ea vero voluptatem occaecati non molestiae rerum et. Assumenda omnis quo enim modi cum magni voluptas accusantium. Repellendus est quo voluptate qui ad sapiente ut quae et. Explicabo dignissimos qui fugiat.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '242a14b4-b55d-417f-95d1-5028dd4a59cd');
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
                            value   : '4bf7d91c-c237-47d6-a93c-246e32a8d58e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('4bf7d91c-c237-47d6-a93c-246e32a8d58e');
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
                    id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('4bf7d91c-c237-47d6-a93c-246e32a8d58e');
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
                        
                        id: 'e5a510a5-ef51-4bb5-8dd2-df117b4f1c2a',
                        tenantId: '56c70905-d4b1-4511-b0da-132303846719',
                        tenantCode: 'y1910n77pfhe6d6bskoa6l6g14n1gnwhopy2ijuffa4ewlfmvw',
                        systemId: '40e826cb-21c1-4688-ae69-f867378d2783',
                        systemName: 'unjjg2fw5d6ujci7ojrv',
                        executionId: 'c636dea6-f239-4753-8fdf-04ef828089e3',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-23 07:07:43',
                        executionMonitoringStartAt: '2020-07-22 21:47:23',
                        executionMonitoringEndAt: '2020-07-23 17:50:05',
                        status: 'INACTIVE',
                        channelId: '688b989c-1675-458a-a92d-2f6263534f68',
                        channelSapId: 'zlcafm9kxkuamodpmtkqk0cisyc5dsji3smx84cbz4c2z1tcom',
                        channelParty: '6ndgs03n1nclcqq60mtcxpja06dzzofky5fbce29ywev7nu512k8dnxwbya5pumwn7rk463wve2u5wg25bhckcyq78jne80wd3yx0t21q9aukazjloit9x2jtrd2w1g5yf9vihm6zymag0ddzqsg10qahr0e4on3',
                        channelComponent: '8gynvqbrf13oj45qjlhctepe02wnkdheu7o5objdxgir380hp5c94reoifs3jz1k9yvp3zsnqy0vko3e88cf6nbfmoamanund6bqdt4uy3m32th12oysyquco00ch69ot2pscbjyjft1svtp3j7zwtuwlt8sza4a',
                        channelName: '9dmaaiea2i30jsfvu4vl8vhdb6k5jswl6d9zy4eou5nqzc9ydc7tucvtghaio96wi1jxubm1hj6qhsenbs85imwnh5caw5o44pf0mosc4w58isij56w08rmbm6n2qyne1l3osn686fqdz1vvla4qbikkuzt0gu8e',
                        detail: 'Tempora quaerat dolorem voluptates odio fugiat aliquid debitis. Et culpa voluptates quasi corporis ut saepe repudiandae. Architecto sed fugit deleniti et ducimus id porro possimus. Cumque dolores dolorem. Veritatis exercitationem aperiam et. Qui aliquid excepturi aut et alias beatae corrupti enim vero.',
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
                        
                        id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e',
                        tenantId: 'e69bc319-5758-430f-bf39-1b56a867a12a',
                        tenantCode: 'gv6z7ihjltyzyznr5bfcgi5k2fqnqv2qlaftrww99lpibjwm3n',
                        systemId: '856c8fb7-d652-42ed-913b-6fc419c5dd58',
                        systemName: '67ncd3zv89ksp63f99hf',
                        executionId: '1c2fc88e-5b8a-4001-af0a-c998e76bee0d',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 12:03:45',
                        executionMonitoringStartAt: '2020-07-23 06:11:19',
                        executionMonitoringEndAt: '2020-07-23 10:35:01',
                        status: 'ERROR',
                        channelId: '1fc7e637-dadf-49ed-962f-25f7c02c9687',
                        channelSapId: 'yfjsmrqy266epjyeqewal2sl6lqn7bnr7w4243wxgxumhkx8gi',
                        channelParty: 'lc89zcplx6tw5r354bwovhyrf7arv1rdg3hbcf670teuvlp6vlczqne4kthut30n3jmx9pp7nzf7nhsjti9p8sotobokc3juab50tvyvdjyyup223cgpyi3hgebly1tht9lck3k7dncfgdrvqlkipwlc4xjmwq4r',
                        channelComponent: 's92kixpxeysh4khd6ig3804j73vprjgdki0mics5kqjgcwz3vy73be1ofvs7vbm6xs8k03emr1h3lhs9i2jlcr3j0jgn74c8cu5xp9k0fwevkh3tihc71ph4patjg79laqmqow1lp97w1fei8hbeewtsk0ywopqn',
                        channelName: '2rcsxwk8c5cbge5wadolk0mnuf5k5kbm9z2324cbm6m27stxg8k6vitc4fziuc4yvw2qmakoredow6lzcham9yscqhfie3v6cn6qlrh90io69pe8k1bmr8c10uzrasc2x2dod5oddluezj407wnm9oc85szk793o',
                        detail: 'Blanditiis minima dolores temporibus sed fuga voluptas. Itaque iste illum necessitatibus veniam recusandae. Earum autem sequi expedita fugiat recusandae nam fuga. Perferendis dicta ipsam nemo eos non. Adipisci optio cupiditate nemo.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('4bf7d91c-c237-47d6-a93c-246e32a8d58e');
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
                    id: '4bf7d91c-c237-47d6-a93c-246e32a8d58e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('4bf7d91c-c237-47d6-a93c-246e32a8d58e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});