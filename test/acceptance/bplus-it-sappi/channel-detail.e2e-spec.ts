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
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: '2kequr3628ovoleql2vvhifpivzpcohp15wxec23m7qreuyrkj',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'pqg19f176zpbubfv8dcy',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 21:49:18',
                executionMonitoringStartAt: '2020-08-04 04:50:10',
                executionMonitoringEndAt: '2020-08-04 12:14:11',
                status: 'SUCCESSFUL',
                channelHash: 'xrzhuv0y385vgmetcql21ghd4fyzfoevrcs4e55b',
                channelSapId: 'sl65crxxfu0d8rk3jqx64f7gbmqvc67z75jczg0f00jik3yp5k',
                channelParty: 'arsb9rwkup98wsu56ubfco2i18kod45sy7jj8vpqc9c4oadk393uzn76np93s0ulyckcpaefq8mbma5tbzpkxgqatlaptn373zwxczjnjqfxzwtdbpsao28br8dj35rubsttwzqavymvj5a6uz6s97n0fh40q8p5',
                channelComponent: '9ufbyjy9yflbotrztstl5c9qf8f4v84kjomvzo6ck674qgpalymbrbzei6h8fnvq4x6r6alc5541nb8fkjbix75y7mhqvr09k4s8jdiof1ea2pogyp0thgsffstyc5ck02d8aidwkm54blcvk2qxibvw05ysdq3u',
                channelName: '8n833yoje6gruw8hfqsv18um97dydb4lktel8gdgx8yylpkqneph4brv9s17k5ikfffa2g45urimcf9i2vxhf56093xet4qlrfv62wn7s7bzr1uadbpwtiemnzgq8t6cutq7kbgxkg783z4wlx1s09ntpxu5vbo5',
                detail: 'Non earum ad nisi ducimus sed possimus voluptas nihil voluptatum. Recusandae pariatur consequatur repellat. Quasi consectetur ea est unde aliquam eos est aut sunt. Dolores odit dolor quam aut non vero ab quia. Inventore explicabo quia.',
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
                
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: '8unfztvwgubwrr7nax9wmht1240r3akrvpiwym51obbdimd1fr',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: '0jlh9xywknrfy07m267t',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 00:08:36',
                executionMonitoringStartAt: '2020-08-04 06:43:05',
                executionMonitoringEndAt: '2020-08-03 16:35:57',
                status: 'INACTIVE',
                channelHash: 'wjmju9ic5o5z1v18ujulio9zpqw9nhgh2zkf5qzs',
                channelSapId: 'j9txne9twtj3031nl5lt8wdc9x0nc73qy9adq6fjzjwqhw0fv9',
                channelParty: '6c9rb8dcs7qe8iap7gnbmoe5sungssfkfsbd7t8s6sda6po0qnvgtcvkaun4ktooojta76qzpfei4ziwev5exzna0srj24ydv9xbe776tw63dmh6b5x5f0vi3irwqyd0f3ethv4veqckq5370tefrmgyiknuok5r',
                channelComponent: 'grbe5bbhtmqtkm6o2rnfwbbrt9wn8817tq2dgqnbfm5ahibw7i2qcezxgxzp5isy6t8k0c0co4ode258mrzarwd7xpmajyz1habqz358q7fd46xdfe5xsgyg8tj6b49vstdvihqy1d7vxeg6c9hkoklw2d5ev8fu',
                channelName: 'e5si995kk20ed9r5m3j6003xp4pq2a1fxez20nf33i7s2jywiv0bfgbtili5u8dcm4w825l0us6hj5gxyg326r21dq0c7dktol5zly52ugjz9jjtvy230h3ktv68gg2b1uglcjdpnorpw2u0a261l2j9hkh4s0hn',
                detail: 'Cumque nisi et praesentium voluptatem laboriosam reiciendis earum. Occaecati et repudiandae velit provident labore. Ut maxime voluptatem earum culpa recusandae voluptatibus est deleniti deserunt. Non recusandae id alias. Est et vel eos qui blanditiis et.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: null,
                tenantCode: 'wnr3zth5s41lgg0jgculu9w1pgtzup8nrmdc112wq9fuspo358',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: '02wzglpho5czt9dkcg1r',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 23:22:17',
                executionMonitoringStartAt: '2020-08-04 10:37:24',
                executionMonitoringEndAt: '2020-08-04 01:39:47',
                status: 'UNKNOWN',
                channelHash: 'qme53kmisrfx3w9oof2087etstcoxglwmgftt8s7',
                channelSapId: 'dbcot8kbw2hthibqke4282upsv2beyfhdat5kseebjso5xjlw8',
                channelParty: 'fqvqznpry377odu2p6hzn7bk3qbzwn9vecs4aoamenokdxduxmvjhw2qeh4dx28lityc2x8t9zbss4z8q4voaawqwvcktmsrudi9fnpobojco5jlukzkeql49njs4lqrm40j520giqi8vok1m266bnkngla4g3jb',
                channelComponent: 'rbt2t3wqzfmgrw03gf6rai1b3lz1j5xlv8lkgaaywrt8decubooxz3ic70d8ppyj0dq4yakhpoblk356fvylejog1rc8pyk57pxwz6yqg1htrtlbmersuhlrvpwiw34pwx1lvvx1v0crpth17cjei70pd0mxg77c',
                channelName: 'zpex72j7o3h51gofxxbv9vqgi7nw4dzhqvsh72qokftjqvliswam3z0ypqsfqrovc6t2r2wrcepy5n6766a15lih3hkbb59qn8ifsvesfvenoiqh49gqgf4y3l8cr1qxhzt1piah1ge925b6iwqo9o9v3wsjkcuf',
                detail: 'Quibusdam possimus aliquid quaerat quod. Ut rem laudantium dolorem consequuntur. Porro nam est qui quis. Consequatur perspiciatis sed. Qui in esse unde. Molestiae in odio voluptatem dolorem.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                
                tenantCode: 'yf1wqi33z0d9s2k8tv4z1y40yf68oi3pfecuaai4slc75gw3hm',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'dyxjf6f3lm1onqmpl85p',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 19:43:24',
                executionMonitoringStartAt: '2020-08-03 21:34:24',
                executionMonitoringEndAt: '2020-08-04 05:23:53',
                status: 'UNKNOWN',
                channelHash: '8ehbzdqr3lm89jkje22593740wemquwqefh5a55t',
                channelSapId: '4me75b75gns5y5un17jg2g3xzqi2cb636mbe4unxdb2856uo6y',
                channelParty: '47x7cm519vly5sb6779x95qijuytkocqyck3fv4b0bgzvnncm0u6eqba66mp1um9c3napsmh48jeeh2uyxo4cj3mxmwdcvad2wkr08lfoyl2c1jcyvkxw1dobkvv6hmbs92jd616g24hpxjiwwegghwmk7t6h09x',
                channelComponent: 'c39zh7hxdlqajzif02oeo43uj6m946eumei52yjjhsy2tqyb0u0pvjjl24ovqu0pbi0pvjc1psjrvyx8k8tvy4je0n3x6xepwep0784ayz4xlqxulo8sx7fcdy4svq6zg3nyt0x9twoob16jpja14ghiix0dxexa',
                channelName: 'xf54w3l7fbdhevqn0yy5drgzinz8s4rpasptwmtg6bfnoepb7kso6gsl9whju62tmitgjnq8rubmkwqa687spehtsd6bvj8y6jxsth6cifdqmsngxdvb4iweuqdleyi2f3qyo0azlzazgeplbaizt68oh7kmawlh',
                detail: 'Autem eveniet est officiis officiis et cupiditate. Pariatur saepe occaecati quas atque voluptatem. Et tempore veritatis rerum praesentium sit dignissimos iure.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: null,
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'ioa61al6vvr3hvtp8eby',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 06:54:32',
                executionMonitoringStartAt: '2020-08-04 06:42:49',
                executionMonitoringEndAt: '2020-08-03 16:06:28',
                status: 'SUCCESSFUL',
                channelHash: 'embegz8qcg909fexrn4079vqq206lg5u741n82e7',
                channelSapId: 'ptq0k65o2webtdkbeqddc9f9e1icp306k8oc297jl6x832i20e',
                channelParty: 'mth4ildjnhp1dt249ap3aqk9u8p8c4cumesuivrkmwyx7ydqr14fwwbn7gxl8hcn2r3klrf97ur3zyakm76lagpjgqn1d47fbaw7c8a3mpyzceajlkccswlcugr53vgyaq8m0hfd4hbr6jrtar1mgij1v1u3lk7q',
                channelComponent: 'vs78v5iwdouwjbj6ixjbn2f9425o762ikoavhzrtkns3zny89t1bf1kw2w6f52wt73gb3f4u708qsx0jhcamodhsh6h22dt2q0xa1ogcnbtre29cm40rbrq5bnq6ncscdq11k9o39d5we4dxr9pp260f7vq12k7h',
                channelName: '5aov6lr0l997n07mcc30eu2zec4ugp9zqe9nz55xsu0xhzo3v4flnjojbddpxybhtjqz3pk0lk5ayu41lwq8cw815389a5snga5nloc64fwiij135hhojwwb7ghnwtrb4avq5nvz2b2lbz8ox3dak57blup32wye',
                detail: 'Odit eveniet numquam. Minima debitis nam explicabo vitae quam quasi aut cupiditate. Fuga nam fuga aperiam aperiam incidunt magnam. Sit in optio quis. Sint incidunt fugit.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'l9rj1uw20909kfw0e4ic',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 08:23:16',
                executionMonitoringStartAt: '2020-08-04 00:32:14',
                executionMonitoringEndAt: '2020-08-03 23:16:02',
                status: 'INACTIVE',
                channelHash: 'sw4u7pwkb3nsphrykmb8q4dscqbfkntudk2862zb',
                channelSapId: '4nsrf50598hd6mp8udzx29yy8mt4mo4yv93lcaf13mhqgwt4p7',
                channelParty: '738gfwvip6hqsrk7077iqh79qwblqwvvv89uap2upcqxpccqmycwiqe6zu8fnbvsquqt7m3r8waoxjxzf4cnuyadg799vlwu3gd11ds7ep7esuercdrsmd9pnkq1z5ibktnm0ei0nxhrvk8s3hvvi1hi3c05bq2x',
                channelComponent: 'kf5d8ifsj2rzchfn9bpwu4drfevdvm19jnae6anicnfi7nppzoum2uza58ppr75sa5h68hogo9x0l6f4uzano0l6syp4po1t7l4mq7m4n9pfjhg1gft9ny5xhcutpygjpo407ojqi8um86h0xiifqjg5bfb5t6ej',
                channelName: 'v1ldczlxiqbirqffswdginyevtybh6uab4pqdkxruov0u0kbd4zoe7v2563oh0lqmvud01nj4ea0helykdg2rgn7u1q6g0rdj0j4c79q99fukfm2i7azlkyjz3wwneboy4tongrnvu02zjcrtkxbi1i11e6t4z2m',
                detail: 'Nobis dicta ex. Deleniti est ea dolores in qui. Aliquid adipisci aut. Explicabo doloremque tempora placeat aut eos. Non dolorum quo vero quis iure.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'tub9asuf5yo5msod6lo59ygrtypyo7c9of6hk333s22t3b06bt',
                systemId: null,
                systemName: 'szulhsr12w4sx5pvviyo',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 00:46:53',
                executionMonitoringStartAt: '2020-08-04 03:50:16',
                executionMonitoringEndAt: '2020-08-04 12:26:06',
                status: 'UNKNOWN',
                channelHash: 'sd41ojv1unkchhpo7fm66xo3rvjw2w3zsdr4t10f',
                channelSapId: 't24qd2c02npdgx8r1nk25w81jwn58u0fuz3hy702cxzxbqlkdl',
                channelParty: 'qn69q9isi66s7wdo6bw9g2zcdpacrjqpkg0me1c3gfcz56mzmi2qd91twh053a8tjzik21t47yd01nc4nurj6wuj9y1uyonm0n9fdlnnkfpqw3naphc7a5bj9jyqz0mb8n9ks3uwi8j6hzxwzqr7aaytvq7ttgjq',
                channelComponent: 'o3sw4cgeqcf7yijnybtizdjbejwe3nfojc6e1v76miz7iqsouixkn786eb1xra0yusd3wd7n8o05jnmyw4sbzwxzn10gxmypg0ojpocctua6am5tli726klqiok9k9xb22n3efsuqn6hjwohqsrxgryh6712v2by',
                channelName: '7qeblgcxs8l33eslr5elzvjezdt2t1hf7fqkykoy6rrlbn6a9uefyjls081tibsp7ygqazw1cngw9afjng5hmdzbduq9p4mfaa8b65w1dikmu37ecaf5pyotiorpmptiiiun0s349et7omhni78pi4rhlzjpjinu',
                detail: 'Vitae quibusdam explicabo deserunt ducimus omnis similique tempora fugit incidunt. Aut qui mollitia quia dolorum ex. Reprehenderit perferendis sed perspiciatis odio vitae molestiae a. Sunt et voluptatem eos. Est cupiditate deserunt amet dignissimos. Aut distinctio hic quam voluptatibus saepe accusantium ipsam.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'ru913v2n7joh83eh30fiwvh7w9siiqs1xvjcpdl4dq088738e8',
                
                systemName: '8pge3q8gpyapvp42200g',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 21:54:08',
                executionMonitoringStartAt: '2020-08-04 03:10:45',
                executionMonitoringEndAt: '2020-08-04 10:29:03',
                status: 'UNKNOWN',
                channelHash: 'e03kugtv22sgl47eee84gownlse42jwfp8bdehk7',
                channelSapId: 'ja481qs17829e2r43exqq71v80q9q8bjn3mzjms2o605b3lfq8',
                channelParty: 'mbxqxh0gidmcgn0lfabd3q6utdrqvhzxe8uf9taxpdyjsy6t9grjlzh4znlvklraa689ft8jajeiuicef6hhlnyx52a1a4r4o5hdn9bff438u2xsh2kqqr93vsofdj1ax1ev5itj1j9nx89gn81rto0r88cn3pjk',
                channelComponent: 'dziiwm2trm8c5mxint9o96i6nrc3x841z99q3vh1j2zyr2ot9bzps5ojq493zlayos2jjy6r9dfnbq5wjq9pocnx4sgk7aiggo5dbio5qkisqzs4l4kctvfi1gjwxf24sijfu1qqzsecxuoxn4qtp1mqbp2lb92l',
                channelName: 'zvu98wx3paw1vo5ghzhelfy251i03pl0qtxejo02a7fpjrgu5z4rxrw2i142bv8d7nlw6495332lhnjb9vnjh8n1dgiw1m2d4u0vlm3t1kpxg17pautcdki3q7uo2fxvm3yvohmppiviz7ugdpyg2s3j3420sbp9',
                detail: 'Labore voluptas molestiae enim repellat totam consequatur temporibus quisquam quibusdam. Tenetur et rerum quas non quia ut eligendi quisquam voluptatem. Id repellat itaque voluptatem aperiam sunt itaque debitis fugit. Occaecati quam quos ipsum quia tempora. Voluptatum ut ratione recusandae id magnam autem est. Fugiat quia qui debitis temporibus dolorem voluptas.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'kyoh6sut9xpfzl9ajskpw3wfwyrwfvsts26nk13fwzw3zb40uh',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: null,
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 15:49:59',
                executionMonitoringStartAt: '2020-08-04 13:59:20',
                executionMonitoringEndAt: '2020-08-03 15:03:31',
                status: 'SUCCESSFUL',
                channelHash: 'mmuomqdmye5g3qq9fg0zlhrarlh4hohwvpqot0d9',
                channelSapId: 'bsfwb7hnxuzqjyemrxeozdnip1q9erce2p7fu3a4t13w811g1h',
                channelParty: 'tdryoijip16krhrq7g1olgzmx6j1r20isf3a135g99xjw0u6u8vopdhnw2zig2xqpxuzzgnlngly9bi6aafut2weiutksov9lqyrre1zmz8rfy2jqepxmz4nsmis2l5grd7av6ot6umsb3j738ragb7fbytnkhth',
                channelComponent: '309ro6ze6wha7yn1vgfq0ed9uxkjsu0jjcucms43fwvnjeqbaoxgp6ftp5xgyf97n1h34xxp0atyzry08tpoegb2dp9688v5j3xllrfd0h49nn8jmk99hlx0uhi1coycxk5rl9k21g955nlwphr3e3p90tobb9yx',
                channelName: '6w56shisgeuxd6k43xyy9gd8mmi1proo8rt86w402zm3boq36f42ncs5yth3s58o8va55y5jd9dsdfnvgalrxarzwiiop7bjarr63z05blp6corrxh1koq1yb1g04e0hlu77uatninrytvd4z869gbsbzhw7cihb',
                detail: 'Magnam culpa est. Fuga atque ad excepturi quae. Quo assumenda accusamus voluptatem qui error aut et quod nesciunt. Nulla laboriosam maiores unde incidunt quidem commodi.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: '9q8fbut8urpkwk6i2ou4cf8dclqlouiux9yvdsg33itdgv24k4',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 05:32:01',
                executionMonitoringStartAt: '2020-08-04 04:04:42',
                executionMonitoringEndAt: '2020-08-04 05:04:51',
                status: 'ERROR',
                channelHash: 'xtnce3nf55pe8jtnzoza6h1xwt3zmn1zdrkg19kg',
                channelSapId: 'tf2jostlc7gf7m61qszdrbkottk27a5fgo300nathfwrpuy1j3',
                channelParty: 'ko872uoe72wqs7sud1v2l4mwqrqez50t23bmjatu6bw0433m09n7sgtouk4726ixhb5nw9izbxdeuc5xrcmsgbuuhn3p7oluhj04zawrq28hub2iklpmjltm4v4u6v9ok2v6yx7mxijwux0dx3ojugyc4372k05z',
                channelComponent: 'j61xgrqnywd62bylw7b44pkrmpit24bny28q5i65vjsq8rj9xxuu2ahdlhm0tqpe1ypbgz6s1ethkvnsfap1vphaej2ctdtckffpg22s7s1r66newzvdmvq5gaxq1j4ppekmtgcm40bio65rof4emnsratyonrjq',
                channelName: 'pxoo1sy4zr33pyjrwhyssi1g302olpraxwkemc50yw5dexe1w1yt1m5b2nr5ve5lgee0e3sxojf0wr035mizwtas53r1nrq7d6o5hmbvwse9zsgtt5tp5jpb3tre8yncr5jfth33uax2klzh7fs6q48hllc8mtgd',
                detail: 'Laborum et sed. Voluptates nihil quam odio cupiditate enim dignissimos. Dolor totam laboriosam explicabo perspiciatis quia quo aperiam maiores. Dolore sunt molestias velit est quisquam consectetur magnam similique.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'p4p4dwzv6nj5n407e3b3q6f8ef4ewxd75nnjpp8xnd9vft0j7t',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: '6fs6ruumrlufsbfmxged',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 19:11:39',
                executionMonitoringStartAt: '2020-08-04 04:33:19',
                executionMonitoringEndAt: '2020-08-03 22:23:14',
                status: 'STOPPED',
                channelHash: 'a5dtwe6yl13lz840u0ke8hw7pdy82ka6jmena63k',
                channelSapId: 'obcwq4eyzddariwy4lnwwehgniyqkqti61vy254x8sanjvapor',
                channelParty: 'yg54e3o09hmz2c3632uyxdw7qvxqwlcwon0lxr6mlz8laxqjp7v44mhab4pl7moq0xk9j5x85pe2n9vpijfz8qe460e1rgeav0xu3qga419m1zxx817zb04hhqew0fcytqtakkjcc6ka9zap2r15nlwog8q5joej',
                channelComponent: 'mh6aupszpk0tew4iiwljxa41y9v4wvnd5tq76w1d9ihp0surp6cm4i19x4fintysslgp4urvby6nlz2ohhfefmok21tgifgfwo0thnbl6j1zki3a15uu60yntc6zaj5w6crq1gs2kmqx37gc4c4odz0u8lrhlnf3',
                channelName: 'tcpqj8hk5igpwy5rn7vbcz58mx0kypob6dpruv46qis5czmuadyz3k9xe3y95mxphckzil66c1h2kwjpkob0izjjbg39hol8sub3f692l0u6j7388fddwmakw9psq7y9ifd6j7a0ddnokardljhbdk93fb31d2vl',
                detail: 'Porro in et ut. Tenetur neque corrupti pariatur doloribus. Nesciunt unde asperiores velit molestias et.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: '92dyqijx188rvl2a7x80vco5qm9icin6o5j8lond3nkrfaj51h',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'fu5v4r8w05h50cy9uk59',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 10:44:46',
                executionMonitoringStartAt: '2020-08-03 22:41:02',
                executionMonitoringEndAt: '2020-08-04 01:33:15',
                status: 'UNREGISTERED',
                channelHash: 'simvr2aq566x27jdwrahmxn0bi1yxo0dj6g6s8nw',
                channelSapId: '07a2thygn28dbt1rf8cr0xsxr47umm98uwrp2ywegjs1fettpu',
                channelParty: 'l6m9lgn7p43935l2t2q2qhhudkgprx2k2zg2arhtv8qk9u0hwh2xarvapuwbf1ky9yp09hemhjbixfl7iic9epae45texp3vq6lzhnqws6xohp55j9yr0n7dgac0ksh2x8488rf1ehoqvjv97bzb47ock8zdjnjh',
                channelComponent: 'v0vbezdzgxt8at8y49o567sahkaewydgnw5zmy4z14rebqrieyeayzslfwkfo1b898033c8vj8mx0anup22ntc3ra06vva9cnidntix0v4oa6ciawl3bky9ljqa2koy5klkfd4y3ifs9j2wvtrswn1vl4fxzak5y',
                channelName: 'ocb0acpqj9i99aek9pjp1siecjo8dnfj65q5n8v0x0qwasvnzatie39wcvtf82wefuhlgkua5ub3n3yqnxofj2n95r6mcgzcuegg5jhmxd0s6sjs3u0on1dc1nkt1gz68hgwg324eu6r3jubj6qa8eoffd3wqr3u',
                detail: 'Magnam eligendi error velit tenetur atque voluptas. Placeat blanditiis quam repudiandae et fugiat est. Rerum quibusdam magni delectus ipsam occaecati quasi.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: '1kw7qed9ss026w5sncmbx8rh6aiqgwx1d4yvg4zax90g50s6j4',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: '8byrr31vae7lfs1uoqah',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: null,
                executionExecutedAt: '2020-08-04 05:39:12',
                executionMonitoringStartAt: '2020-08-04 10:02:20',
                executionMonitoringEndAt: '2020-08-04 03:06:28',
                status: 'INACTIVE',
                channelHash: 'likedx5tbgxbhyoz27rayf3f14ckcvdn6m0f5vfw',
                channelSapId: 'shf6spukxxmf8w3sil0yiq89h7zc4nvpgj0hksmqog1wb29te8',
                channelParty: 'a539xunehxkepmxndut7arenzzdtke8pqp16edkkwm1c2ns2lsb1dn2hfq1p54hfj1wbub1r7uvbwxviqngasa8tmd6mr7dtdqay0q5bsg34x0jrpf402tmniwd4k781p8anglt4t2gqp157b41jbiv4lsdjrq8i',
                channelComponent: 'b5884d5xoanefj2ioeu45lm26kokaxnyr4i9owkfa1bgkv5ennxowadmamgi09i5xyj4tiit87nz0rswe66qduo2fw88bpczp3ecv05f6bortt9anm9akcbidaq4uch6d50xm35qchi33mi0388xz88afdzhyh51',
                channelName: 'hcmxu8xz1e6275sx8tzfehj35t3l628uglzpfrllqidoteqlz5u1ey1lqghnwlso56g4nm4nqff59f1qlbjymr9nuhqsn1qomt8r7t4v1c8z3zoozshbfdgfjefz9qlck9e3olybza0esqhb6mw29vp2tkwmijip',
                detail: 'Velit quaerat ipsum. Dolores enim nihil dolores fugiat quibusdam blanditiis commodi voluptate. Qui et voluptatem sit ut asperiores repellendus incidunt. A ut non eligendi earum esse explicabo.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'nuva00yzxybtrye0ko3ag50c3qcbn6c7rn3typxzhaynnvo6ag',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'qfkdnrhc56x5nh1kkhen',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                
                executionExecutedAt: '2020-08-04 05:28:42',
                executionMonitoringStartAt: '2020-08-04 11:22:40',
                executionMonitoringEndAt: '2020-08-04 02:51:45',
                status: 'STOPPED',
                channelHash: 'nofbjvw8n4rpfvhkqzpvjtw6f3zv04epe7w7nblf',
                channelSapId: 'wimr2e6h3on1nnzb5cbn4pio8h41goe048w0bm0ppc3jx92v2p',
                channelParty: 'kffs4xaxgvmgf7zkrwzkj1gs84mfavm46y1cb9hfau6fb948y34lf1ek5ri2rtclyppxmi4meik77lc39jzu0qqdxhyvdu22ytq10bda59vsxp3fthpn3u3jpz8y9voodyqjk0gqhp9pj5x19129151nu3gkdzqe',
                channelComponent: 'ascai9aburql98zek8etwg0dx9yuukiwq27i9fnt7canh9k9ykm3hgm3lwzbquhyozwe1m9m3edafneq2a92a63cf6jw422ykwq2hdun5pj5y6pwgg21l0z7zv7g99fnfo0y1el7p9ilxhe9qjasf4k8ctq3vf5u',
                channelName: 'u9tr9sm8p1a8yvio7x81escivhlkah1jqfiygdqjeg1dkp120kpk9ocn2qxf6eem56zxd2ck7htfppnfyjs8kctyzw9xweuqzrgr2rw4xut4y2ar6urpifz8378nne80z8w7jhs5t5017qgumk7of9v563zdtq7y',
                detail: 'Reiciendis sint ex quae ab eum. Et atque dolor animi vero perferendis quo. Voluptatem odit quia. Voluptates illo laboriosam nobis ex maxime debitis. Tempora voluptas in quia.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'z33y1oxoijk54ochog36cn83ngdcr90ubjtkntgfy95hgyw6oy',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'kub0n36i4c0hy6asl8cm',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-04 01:03:37',
                executionMonitoringEndAt: '2020-08-03 19:14:42',
                status: 'INACTIVE',
                channelHash: '9tv1vaksb3pv56nxgrwjzcjrjn1e64fwn24nzf6j',
                channelSapId: 'ntdmi7y5ab9idegvx5wmjn6ul57u27iq3axkg6ilmvq9szy5v7',
                channelParty: '85unrtjgys4i1s7xhzorjc6qy7q3b8ad29h4g3mkjiodu6n7tpwkf52y7dpi4txpddx91wq55hvtqtp3per78g0lb30yvdp3v9yy1gy2j2rgitspmom6sddtqo9bt3ghb2a1b31n3txyyvluyx9q0raufl5ne934',
                channelComponent: '8037fofe6lxtjrowr9fd275ofpa9cg76aqzi82xqv5fn0puc8dr6vildkd3rwudgomjdto12vqwk8ig1ald1nnx2qrk3imwljc6vqp6rvsck5mdbx5zr9kyelm0nxh649eqqq6ott3xfjtfko9kp3turiko364b3',
                channelName: 'doqyuhzlulkskgumpb331enulwm1dvx2mrvazbsxzuveh9lz8q1vym2vt5l6bhilmybmicxo2szwn08rka2iogoonhk531s3tgw56ibvq5zaw0ipejdnxojuccjan35t2fncaddxpjuegtieev4n0loma2tuwhy1',
                detail: 'Quod dolorem officia tempora. Sed sed esse. Consectetur est esse totam voluptatem.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'f5j9zhe8evtbw6fgsmgzfdqo6da0331jaqvcbqrv1vwtm1907r',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'ydu3wfaxic5f7flodt4m',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-08-03 20:45:52',
                executionMonitoringEndAt: '2020-08-04 02:22:55',
                status: 'STOPPED',
                channelHash: '75turfsmrwn1tp9iiipmwr1xr92yfo59834d394o',
                channelSapId: 'vn6wmskz79jn1b8kdn6hjw8cldw5eblnm6uw9e2dgow13y38s6',
                channelParty: 'x5ajzow4hwome5880zjmvzsi1ga1ed1bvskwezde6sxift4q7o0cq17u5pdpq5zce26l7t48szaxc0vno6gj63i1riqc047aevwwemiieccb9g1i8ftr577y4nt2ebhkjj2ecapdjfdh4k4tx6fad9so4biqne7t',
                channelComponent: '4l31o4qdwro27l26yj5rp6pdq9qotl6osl2mtoop4mn57fksjre00lqsq4ib22ql0l9612v9la80ogs5py3d2kdalxqvp2ymnvs5ukrtcpkwu4pwmreuelyq64hkc3uln8aqsop2n2jv3ys2c2jr030t4j3xctpv',
                channelName: '72dco2lytrtv7se1y4vtt4ixgaqyu6zhklz6nachskvdmftlvuz3mtks1gbxg0hvixcxl8969c7qyyld07jqevfzhrhqxx3x2uaobo1hcsojk51917bewll0kj1mgwkkbk9aom0xszw2tnfawh1uq1fgh4ehrkf9',
                detail: 'A voluptates molestias eveniet eum laboriosam voluptas magni placeat et. Ab temporibus assumenda sit omnis voluptatem sunt. Aut beatae quaerat molestias iure aperiam dolorum iste numquam. Laudantium porro asperiores est et optio quaerat cupiditate officiis. Voluptatum voluptas quasi. Repellat mollitia at molestiae praesentium quidem soluta hic consequatur voluptatem.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'h9zf41ksc1fkevy9bkrovm4o1re46chmyi13vdq7tqvv4wzwyt',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'phbqijw6fyocjsmrlkao',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 20:28:17',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-04 06:23:11',
                status: 'INACTIVE',
                channelHash: 'ry8ov4fr2g0vystb2gbmk5vn7678cgybpmmx7jxy',
                channelSapId: 'qi7e5b3ba9vwjlybqbeegwgzrq3hlcwz0hwklh6l8k5jj0ybch',
                channelParty: 'vml48iypkgpj17z8xr3ykvtwkupb38rjj7w96rbtibz36oyv1hd8426jbxyzr5kvhdtjuesxteoda9mw0osddvopo72vn5il1jdst3d6y8fnepc9qbzsqvc97bjy3w5do8r0c4f7vvs017ewfurkswl2wk2f1sqt',
                channelComponent: 'bb6ugjopn0h4eq1gjemq6y9n9ef9rzahlpr9x4b6m908q9vn2nl4eybqmk3fs2mjqno3imjm9r055jy8zr3zsrxgfmwwq4ij4k3wu0g7k6si724ogee2shb010atxngowfam2nefauft6qx8f5qng5wdiibec1sr',
                channelName: '1rby1p84blpkkv33199c8cyuytumwzpsejtiq6rdxngyhyhanclvrgx7hsvcgi6ow73n7vp1hopmqz5fe2akxcvaf0eberez5ya0vkkyqdzk95ssd51wupfl2vf4gk1ejmw0tuu4ddsp4qbtwwcm3vvniqq57zbv',
                detail: 'Aut et corporis blanditiis non quod necessitatibus deserunt aliquid occaecati. Consequatur aut est rerum est adipisci sed repellat magnam laudantium. Et qui veritatis voluptatibus et voluptatem facere laborum.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: '9o2ta6yojmsvi6h58dj4b6739hyavq406a3ivd21o2yxyuhxrq',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'r4674yq38jc3mb39qskn',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 16:09:34',
                
                executionMonitoringEndAt: '2020-08-04 01:57:00',
                status: 'SUCCESSFUL',
                channelHash: 'z71pie95n8f619z4eakwozywimw9bz05fg9dhrsp',
                channelSapId: 'imagyzq7t5v52zm5je7fuz6dg856seyx6rmagiblpg9cob5bvq',
                channelParty: 'urn2xdcv841qzdaibtsk8ay9xlgl8ce0ewuc08le4entpbvcmc4pyz7l3d29kidnq8kp7relfoy7ejt9ewaw44d2dbm8ncc89hbxtuj6ik2x42wz72hc3l8n8div2pprdo9tzfxmabbl858g017v6ipeg1fk9nf6',
                channelComponent: '8nq7d3pd3a3qu6cpatyxkwxhgdf5de06rsl0vquckxzmvbihths96rcuechqvtf60ufx0o9av2w44w1h9564s00wh6l80jzgkhi775tk2copykefbm5thf4qmcwl62hsnk9ze65k6tx85jw5s8jjvjpv7vnc1d68',
                channelName: 'w5slmganiqdj5fr2xi0jg51g5c7rgmofy045yflvfkqcrah853tdl0a74z29egfhvtx6c81wp72s73lt3ee7hbbhykghky68shau7k076sbo0zab0z28ml93uk6d12d82jzeje1jm5b8ymbrm47x7kgm1vh2shfx',
                detail: 'Quo voluptatibus eaque voluptatem eum eos beatae quo odio. Perspiciatis voluptates tempore praesentium perferendis unde officia. Hic dolor aperiam sapiente. In fuga et similique amet qui veritatis corporis ea. Consectetur sequi tempora vel et nulla.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'vnx3wqqj2a4jpklgoli29vwbp9rbdlvpih1s2kp6stj14ekzpx',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'pseguk3co51jbunbu5wk',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 13:19:33',
                executionMonitoringStartAt: '2020-08-04 09:01:20',
                executionMonitoringEndAt: null,
                status: 'SUCCESSFUL',
                channelHash: 'n87tgkscjo17al11t2l68xwmu1g5rfc35ca9hs2y',
                channelSapId: 'c4ku854k6ce7hu4wwothpdxj8jluv722d7gq3yh1rpstv6kh73',
                channelParty: '4zchzto5yd0xgvqcowzjbkqzdm5zsjwe6hvddeobt1ll8pf56kr1y0sovgvqdrvz4xjyl0mry2g1js434c0hoz1bupd45j0aqaqqhraxh4w7388iee9vft6res3eh79vw9p3tyqs50iguepp683gp8uknsosj84n',
                channelComponent: '4064fwm13x7abwxyjmo1lcqnvh564ag605873popjatb8cytcidd7z2bwganabmqhi0f71j3unrdpl9s6q4blk8wjz5osvzonhl7qv8o1xdt1oqg3rp6ndjirtgbc3g4c6o7bhtuzg9hbq7683l10xxh7628k7mb',
                channelName: 'glqua4ekcg8w6i7xldt2vgt53rfkizs386h2imuehocbuxgzlbd76m7kvsiffwu0pqx879eyp0gn029caclfdol90s9oyo67x67z1pk79ida4mqex7x1ncuy710lv6hjqspob4hwu1eqyh3f37dbrznq3mk98ma9',
                detail: 'Dolore accusantium reiciendis velit autem. At nulla eius unde. Illo omnis magnam sequi eos praesentium vitae officia.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'ndrmettu8pwcpjiy2gthgibkgba6feiwlna4vla03cyaq4wkn1',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'o3v4wbx5f7ch9z3jfbju',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 20:07:25',
                executionMonitoringStartAt: '2020-08-04 09:50:30',
                
                status: 'STOPPED',
                channelHash: 'sko1is2vcuydrzzldr7n7vanlt3mcsaic7rou09v',
                channelSapId: 'durs64nmpy1kcdi3y9kxnu09g78odokl5nv4yghu1ra438oo44',
                channelParty: 'pobk1m10d8k6j9sdcycjxzmffm36ksnen37ulbezz69hxdgnczri4puqxvx7rn6wqqc5ginhputw7k9a14phv002v0wfbnuqwkbxoem56mduo370hku50y4ogc23b7uzcd4e4sb3m2p9z1jjoksmq40xouocn5ol',
                channelComponent: 'kt68qnkdoocdmm6kn2kpth14v1pqqb8w6choqpejcoczjlqs0xghlzfecdr6byjhcuqwagjy7pe70dzndt45k2i07p44uky7a9f9dvvdsugpsj4vr8me8lcvvf272rqaf0ne2ww63h5zdxd5m5i3mircicu0ahww',
                channelName: '39bjwj3wqthxxa8iy2n036fcu7zdbanmlxqr50qa2t166tulmzsjino25odnrvd5ms9frhl1br8r6vp5ffijbg1d2datuopo4twf1xtten45s50qpaoq7xfbygd9wqm8fw5eefqy1uqmhb53bl5z9pg366aiv7co',
                detail: 'Esse aut voluptas consequuntur consequatur consequatur cupiditate. Impedit vero accusantium fugiat ipsum. Distinctio et consequatur velit omnis ipsa ullam id. Vero dicta dicta omnis repellat voluptatem commodi quibusdam ut. Rerum deleniti omnis.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'blds9ma54s1clh54h5nh81vkiuild1s75wep6p6ad51mvf46qk',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'j6wsrxo20m0no3tb6wfa',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 10:19:56',
                executionMonitoringStartAt: '2020-08-03 18:46:30',
                executionMonitoringEndAt: '2020-08-04 06:54:33',
                status: null,
                channelHash: 'yaj0t1uy0vz5t6jlywthnwvbaxrwx0p9myk29ol8',
                channelSapId: 'ff9l2mionytue951m4twa0kr91wkm4d87ddronj42tr9593aat',
                channelParty: 'nmxs6a0tx5ekucrb87euip32ixdnyfjnv92d4rhov45y01238g2u7zizl8nbb02x6h4ubixizz1xei9ktuaebthcxq3kwedsomgrrfv2xyn30h5htjr5uw11o6rnrvx494z2rntcitf965dt9phtl1bqtfx6jsvd',
                channelComponent: 'bico5u8jo950apjvx7o8po0ohz1g1a4tjdiz5ex9x883xdx5fifqexhcira4kyn2spz8le2x7nu10rt0g38coje3nlslo5ytq37mzvib963np30excsi45qp4aalpqezzgcsjgi3ycsa9xh3iw590nyt4fsodr7p',
                channelName: 'u27xwbgom9pl0qyzqzzoa4ylcn3vmkoojfsnh9r2qm3mjtlvqgotm5vbh13ngomdf6ki9pbovvyvd8ub8xhpj33i7sm42hnorzz7yyu6kcd3mamxxuauqs4xjqe8d73w5g2ejmqx4rso0vf232an5btgghbw4jx9',
                detail: 'Porro enim iste dolore facilis nobis. Ut accusamus quia nihil dolores beatae rem. Velit voluptatem quis tempore vero tempora voluptas. Ut in ut voluptas. Delectus voluptatem occaecati. Ea quisquam error.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: '26g7u298prx15zgb1dfarf0n5c87aoosye1bfhnw7cvgmmivwk',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: '9pv1f9qmec244hltb9nz',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 20:02:33',
                executionMonitoringStartAt: '2020-08-03 21:09:09',
                executionMonitoringEndAt: '2020-08-03 19:33:53',
                
                channelHash: '7atulgukre9o68278ivb3ekx879sp3novdokyjfc',
                channelSapId: 'n9wm7ovbxh715nemx4f33qkavud02mrhec7kmt2yf717x2k1uw',
                channelParty: 'uxvj5uhf0ruc6bgeaps6alcfqvcmrt168swogkrve9tdqj9axqlli3nxt90kre0h362e8xdutoowc5qag66yq235mnjb3ey2zvnkowl9k5rcvuxs7cy9zplgl345yzct6tzwx6hg8vxkeht5vpq12r8xu67o6ijl',
                channelComponent: 'kemtpdawxxjnzzxf56lh57pkkomo2gkb0jqs92o3nitv27dix08ppdeamhov8rehh4rkz1kbmcnjdbsihavs61wo6fkbrtrsi66v65vfh1u2e6e9nnn3b379b3p89kp73gfnb1pd4jflz27qxvr850yrn9cms712',
                channelName: 'or28xmrrn8s8q7ig04q7us33ef8usm1yilpthnuycdo4qcss0jttwei1c4w5cztkmo2gvj3nuc9eau8021cgi1gt6nxszc7jdqts2kowmway7kkij2168bkolv2w2n1zlknmzx84ckcsegrgb3mwe7y995mfetkf',
                detail: 'Dignissimos esse repellat cumque quidem cum expedita id. Perspiciatis ipsam aut neque velit est repudiandae. Amet reiciendis inventore. Earum eligendi id quaerat.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'vlmem2c5cbeetdj5cas8psgx3vevbtoy1efyji472yteq372tv',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'eppc9dzkslolsyodeoai',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 17:07:36',
                executionMonitoringStartAt: '2020-08-03 17:11:07',
                executionMonitoringEndAt: '2020-08-04 04:47:41',
                status: 'SUCCESSFUL',
                channelHash: null,
                channelSapId: 'ysunise1j7dnildscq16v5lxe1msl9e3zwlbbv53vx8avt3du2',
                channelParty: 'x7acl53dbqrvvld18imqqdrwgleccxovl00pl9nnbmncx98oipamyimpntcdb1pzd3gv72uiyglzdlw62b3v2b3swev1962rzkm85q3hqp54k4axjd9bqmziv5ku901ufwjlfa93eu41gk6qq9ucz5gxdaq2r3j9',
                channelComponent: 'frpfyl5zphjbrf2qvky413uzwm25rmoq8uah1es7heda3kp56ynetcohoc7kqam3d4wqxquyqo3z83i58vyychoa70o8fmq5233it7fgi1hxaecqxwtdb1ur6fi2int9wjplyw498hdeufg4keosrzoefdbeb7cb',
                channelName: 'wsctsra6mgengi7zm100ii3b43oc6j1i4il3m6h0zveebm5hzjy3dp9or3sxe41t57pkfm7r2elzoggmvev11q778vsrxb0mxf12qwlrv16z5s3a1f0kk7e9hq2np56rqu6yu07wregk5mikdys9kfnn4x30j98a',
                detail: 'Vitae officia tempora non earum alias blanditiis repudiandae. Quis cupiditate iste qui rerum sit sed. Consequatur id sint dolores.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'u65am68i1iba6zt0lepyvdq6zt44rry37g2r196ftn0l0w5n88',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'yndua31223s3b00co5rk',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 23:28:48',
                executionMonitoringStartAt: '2020-08-04 03:27:33',
                executionMonitoringEndAt: '2020-08-03 17:16:19',
                status: 'UNREGISTERED',
                
                channelSapId: 'k2knxchwgpw9styfgydb1etn6eupoeudhddtk593vp9m0m2jfm',
                channelParty: 'qe1dnqpkvi1g39ziarujtm6vjnkyh9vr2rspnxsz7c52ujc6hmzd58cd6sd7dvo1q3xxpcthjxpv2aizjiet81jc5v4ynb3xa73fljijinyprueoq7nokt1jazvjdcq3j5eupqck44rxufve33ybxvg5ogm27x2a',
                channelComponent: 'lm375206p33iw1269cipokog41z73axmj811p8266o1spylm27f6g5xgctoh1wd4140l9o3k61mw5oivbzj19gfxia8q1mptbosejcru9wzg8x4xsj98wr35dk9q75fcd6dqmgad2z13hnijvh3bjd0abd8ygsr2',
                channelName: 'iv8xjpppphbxxx2omcrm1r2gilgz2yyms6xw1l5crvkpk7yctjg2mma8hgzic0rnf7mu6h9nc8n0dnfsuxza36z6ltr5kjtptmig0dv1gk7bito1omwvu1s8mzkzzvxp2uv04mjxi0vukk0wvqf9ot8ytq7k714o',
                detail: 'Necessitatibus consequuntur et molestias facere reiciendis hic fugiat suscipit aut. Maiores quo facilis est beatae ducimus fugiat. Sed qui et voluptatum. A qui tempora enim. Earum sit aliquid quasi rem sunt excepturi voluptas repudiandae.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'b1ex7mk67twnjatkkur6qch53u8mqtmms189vbqse82ae12sl6',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: '1g55rt46av98knd1cvtu',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 22:59:18',
                executionMonitoringStartAt: '2020-08-03 20:43:15',
                executionMonitoringEndAt: '2020-08-04 07:25:26',
                status: 'UNKNOWN',
                channelHash: 'jklo4vaujszx7kihk2o9cj0y74foeckb3fhmvvr5',
                channelSapId: null,
                channelParty: 'vt98th282c755nvhvan4zmz3z8a7gta6skmaaoypduz595z35i5h21ax2rtpauraq5y1zsvctjk9rfzxpc4y7udpia9krshv60vgzhda950dxyv69gjxic3t33avitgygc6iqz160sdvqegvhhiun4zf8p2z7aps',
                channelComponent: 'pjpvov3ol9e5i10v9cagmvl53di0g2dj3vyz505upsy43vx108dw8j4o7r2wmbr8nl125lzw7eyi6dcgosqkqivqdv3cw9mubbgt9kqkip1025qwbpl5bw23sqqor59o805th5uff7318931eg4sqzcq9om3qipx',
                channelName: 'z8vrmrnc9xvnevrujoos06ih7cc2j1ky6y90rqpj4s8qegytdq3vyb9uuhb7us1zrrja1pzhsa53qbzdynoo158w1ruhylms1cifrydj9t41jtp1yj2kqj9j4kp1hp5sbg3dmt6opjwleo4oafspm2xfj42vbo2f',
                detail: 'Hic incidunt repellendus commodi beatae dolorum labore natus. Sed enim deleniti exercitationem quis quo sed. Esse fugiat facere architecto quia veniam eveniet sit. Cum quos quia aut recusandae aut aperiam soluta praesentium qui.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'h1zqdai2san5y5phkl4fl6qzep02fu8zjsl3xy6p2jv4n86fh1',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'kqund1ak8g4mj1874lw5',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 10:00:12',
                executionMonitoringStartAt: '2020-08-04 12:49:12',
                executionMonitoringEndAt: '2020-08-03 19:31:17',
                status: 'STOPPED',
                channelHash: 'u0v0vg8mabhh7ye4fxm1akl8ezzpp7hwa1zl30h8',
                
                channelParty: 'l94toetyatb2s53dlwhb0hzt8h68vlxjp12erfdh2yjubxxu5hribid3mrh84mdi7fu24ro6vqzmrvwja3yy4wypyupzhckijbvrxt3l89z5x935510xnl624bvxkyhn8qgtk4eern7xxs1bc3q6oifck4txz84e',
                channelComponent: 'y15mz86e0miqisqkcc2jcfuviu7dsdyuydas4yfzgowt7f64p4epnzxu7mglffwvwbchtf0e46d9180dqjfsa4re2neele0abpqxjmt6wgzkjaa8xx68i9s1xdjnryvebo9bb32defssj678vc5ht7r7re0x2cm3',
                channelName: 'ew4crqqn900s2y74dpulyxvyl9og9iehb15odoweny5hln97s5omgecjbp722hw54eievtoudj9vrje94i01csht00nk6jf5ptm3ulv9g0pld8421fs3ztz1iyl6uwp7dkpcfkmuoyffdnwlkvjtv21t2dfuuxc0',
                detail: 'Ipsam molestiae consequatur et omnis et consequuntur voluptas. Et non velit qui eos vitae. Molestiae sit distinctio enim omnis qui excepturi optio. Assumenda aliquid est sit officia nihil repellendus illo.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: '77gqo3rox1xuyewnyvvqvs2tpu2zodhb03suw8h47n6077yxd3',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'f62f3op7wq5hh8c0ssgk',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 11:09:00',
                executionMonitoringStartAt: '2020-08-04 06:32:55',
                executionMonitoringEndAt: '2020-08-04 11:07:42',
                status: 'INACTIVE',
                channelHash: 'nflkjs9k1mr6qsztwehtoh756mc28fajagb0gtl8',
                channelSapId: 'n6arqx3vrp4dmla0p7l74qtnuhf2hk3vru3gpo5r4eksuq61pi',
                channelParty: 'sa6vgu8e5c0ry0t2p06a46lt1fqbi7dds0xzqlef0jpmlvbc5vthqk6h80ty6h4lrv2wlu20cerw7macc5x7jqpkwvdst8sn9eq9ka1xb8s9dcxpzrw8shto7ea7s01t3j5wdk9cke6pndr416pdwrs6xvjmyrj0',
                channelComponent: null,
                channelName: 'hpscxcgslgul6hejq4m8rcx4n6903easvyg8y69frzd5v9kwh85qxhtu1xbde7d4bsxewv4az6819lqlh3zwnz2e1sokxrlh2f97pxx3eqnw42ia9hlbww8xe0bozl4p29ba0wfcq48azmy5hhpo4hlwhq86yaym',
                detail: 'Vel sint unde aspernatur autem ipsam aut impedit expedita. Provident quidem hic dolor quidem necessitatibus omnis. Velit similique voluptas debitis vitae dolore officia itaque ullam. Et nam qui velit consequatur autem. Magnam dignissimos dolores. Ut adipisci omnis voluptas praesentium vero excepturi omnis aut deserunt.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: '93lldp45fgu2y5d08vua0thz2zsscym8da05k6cb9d1h70drsn',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'w728i6njzl5ti73fgjzc',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 02:34:20',
                executionMonitoringStartAt: '2020-08-04 03:30:37',
                executionMonitoringEndAt: '2020-08-04 07:17:42',
                status: 'STOPPED',
                channelHash: '9adu3om8f0rb4j6eay2smnb29595yj4at93axm0d',
                channelSapId: '54ybnkeum6f1bnp48wld2av1e88ro97iuhhb7o3bjsk1z76j7q',
                channelParty: 'ycrbfd1e9p4in862bfpbk3wu3jdjctqetvl64rc85sxyv9laabr7kmm0c7b49ocnj1lhq5xbpgdwmxhwahvh5egavkvihxxgq6zabhmp0yv0r2cnzwelmt4qiuso1x8ahyr8rk2ttvjzlql71f04qw4kxepade2n',
                
                channelName: 'ppkwkzohrlm40zvkyed025ckr97cwhvdtkanh8cuzazu02hi63esqyvj5pnujzd4dxfwuj5g9izxo5npjny3kgbrp51s9x76awro59k19c0dq7h8helma3ipkjpz3xivyal6jb9elxdf5sxllpjqyaw7ok54lvqu',
                detail: 'Dolor eos omnis vero quia incidunt dolore in ut. Dolor consequuntur incidunt dolorum facilis quidem tempora occaecati animi. Placeat quibusdam asperiores. Expedita nisi accusantium.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: '95mrrg5w0r45915srk1dazjbv1tj6v9tug7bnd0ylh5uht901i',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'iv84ji6i8h5vz7phwn5h',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 16:13:58',
                executionMonitoringStartAt: '2020-08-03 16:11:17',
                executionMonitoringEndAt: '2020-08-04 03:41:14',
                status: 'INACTIVE',
                channelHash: '2tqdy35gdq9mve2bwakd2vv493aydwp8qi5tvvtx',
                channelSapId: 'p1ejgd3y6qs8ahoweu9g5h2gvezvqdy58qpuc1kpfe01d2x8gh',
                channelParty: 'cnxhrqkjxl2mrc8epl2ibwou6rl2m87i3fw8jruydoeg4eunlfz96dw94s7pid5fj19wsbj5xoy4qazncikwdj96juikqoxbmy21vh3qp7tqsitxgvi1py0ecydumgn5gwka1ii5k9hu2sjrjbibtf5b6woyag0o',
                channelComponent: 'w03lhym1lp6wo7caf27yut5owkadyicppq4sow28r9odhjtn0j9t174ule9v2a9ae495jipcbuito9g5wy4ccqmy0ukha5q4krf2serfxi44rgyi75k604ef87mlu7gmljqdzjvnfji2ul72ohqkq5ou6qcg9adn',
                channelName: null,
                detail: 'Ad non natus voluptates qui ipsa ut distinctio. Cupiditate laboriosam animi a hic a libero eaque. Et culpa rerum maiores illum saepe eveniet accusamus. Excepturi in omnis natus provident id eveniet a iusto.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'thn97shmsv5vliw0quybqfsg783hcd1hwobxys5st56cxw33d6',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'i11e3airx3cutlybw09k',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 12:11:14',
                executionMonitoringStartAt: '2020-08-04 11:43:57',
                executionMonitoringEndAt: '2020-08-04 01:02:13',
                status: 'STOPPED',
                channelHash: '8sx3xqj2qbkg8ujj010jgu4ebhekaoie5essgq6z',
                channelSapId: 'di0epvsoc7pmikuzl6ngsw58gdrt8bqrkbgbazzhfruv3mcxtw',
                channelParty: 'si2ak1v1see1s10oee3sly1hz972m960ka0szncxxzqpobfi4018zwoswso6p1sdq6opgyic821qhary407haf120h8443h36qs999un85hqj4s9x6vzk445pe4yece8jjxmg69mfwwtss2xd7rnhieqpg6ylocz',
                channelComponent: 'zljezfih2lx5wd0dvmdfmz8o6vnesbn1hd7vvggc8qp2qo4eguiuccp7p6ydg9a0zcbb5p2tfwr6cbd5y2486y50snudp8y2vlljb278b60buejj9pt7ew0809qqjdgft2qh9wmvmkquusyrzi4382ven7s2wksn',
                
                detail: 'Temporibus voluptate voluptatum id vitae non id iure. Totam omnis aut nemo. Vitae molestiae nihil sed. Ex quod ut sint et eum minus natus. Earum minima quo quas et quae esse quia.',
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
                id: 'zaoiwmgissz6ed3kfieb07818cc9pnanmjsce',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: '5k9rpgpapfqcq5k6hpu70aodp7bu4qebqwdk7ia48jz6ltn6mr',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'n7fo7akvuh1fot94i4sm',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 12:23:30',
                executionMonitoringStartAt: '2020-08-03 19:48:38',
                executionMonitoringEndAt: '2020-08-04 00:22:59',
                status: 'UNKNOWN',
                channelHash: 'qx0b9irm77zu7c8bqssxirj1vwohffvyuxqxk1cg',
                channelSapId: 'c88h6p3gl4b8ptgsva6qnw6a7m12novwfvndgbzi3muoreo2tn',
                channelParty: '6r7no36a0mrle75rpjajlcarp7rfa2vdu22rhqarl79occbgacsi2m6e23ck8ai0gxymyz99qmlo394pyr3hq7gl6ws1sr69ftm0rk4cuq2j8aluhfpek3ub3xr8z0suqo6a3kw9clbrj7p803o2zktm9jpeguu6',
                channelComponent: 'dyrs10slcqpqjm0ytj77ahl8tqfu5c7u0oo7as1x4fbisgm0qgpb8j4p8hrgokbiv4duz2od9ansvkxvx6pk2434tgpojbqtomw072nt7wcjis52xtk9hiwojh7dvz3q9q9uixhoyonmgxq1r6ryhwo9bjveevef',
                channelName: 'g6jgdf144ezuzxq0idbv14we08jfuvjve09q5o1r97utyr6s7rkkiwbkrzatx56bo1yih7jxkjeyr8n1q8b6b2znnhyfdiuo6k7jgw20fglw3vqzzru6gxekrbdhv8npma7g1od12hds1e6k4irst3o5d778um01',
                detail: 'Autem animi perspiciatis. Non rerum itaque. Tempora aliquid quas eos fuga ea autem quo et. Similique molestiae voluptas non. Eos qui ut fuga reiciendis ut autem aut et.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'havdectmkp0aqcmavamrd6lfnn7el1mhlh1i0',
                tenantCode: 'avr3m48gegenebom2wbx47qkwza0k7k7zgz568zmjomne2xnac',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'axp2w9d7bteqeg9ih4yu',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 23:32:39',
                executionMonitoringStartAt: '2020-08-04 08:37:14',
                executionMonitoringEndAt: '2020-08-03 18:08:44',
                status: 'SUCCESSFUL',
                channelHash: '2aw8myo3sol9uj6lznudovhaozavbx2pgv56p1cd',
                channelSapId: 'mo6fjorb6a1y95r5cmx8h675rkn61habr6xnpsq03ru0a7qwk3',
                channelParty: 'c36p9l3ytbrmhvln2xscophimhtwqer4y9dbzf9dvnjf5q3glgkwp2q0suh8k9v5y93eia2asgnt7cxa67sn0hgkklt1kwuf1gjit5ivxtyuje45292k0na1uxxq55g06vdquq408prhudsc18wwn5kvmakdemg4',
                channelComponent: '4yjicjb2vy2l5wpfjjhpcj9fi3c1x6g8u55altvcsz2mrb2hektpqxdvwv8gb5vw82gyq1qxcfe88793bmwzgyl8b80zg82tn3a5qfq13g2ksn8q80xh9ndi5nb9tj6tr9350pv5rv75x8eu1cpzpvmbsl652t69',
                channelName: 'mv7fifqgn9vqc1sgqyejggehfufp54fyzpjsorf0w8c8j3dvr8mpel5juzmlyd34om9q04r1jdtpjclh6rz3f1udy5cl202r99j2wtwog1gqwxu76gkhpctffvhsjlb8w81aj1o0yfrvjghv8ef845gfs9i1p6k7',
                detail: 'Eligendi necessitatibus quo quaerat soluta dolorem quisquam quia vel. Ut quia et quaerat reprehenderit iste. Est suscipit est quis voluptas in fugit ut quas.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'w5u8m245wdkt0drrmqrtg2sotyecpiik84davnwdlubyhn5wtw',
                systemId: '7xwu77y7g6q919tkqx6ja70lms14pci5s12kh',
                systemName: 'npo2doojxspnokh4j5px',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 22:10:43',
                executionMonitoringStartAt: '2020-08-03 19:27:18',
                executionMonitoringEndAt: '2020-08-04 07:47:17',
                status: 'INACTIVE',
                channelHash: 'q1uabunu86igemjlr38ns8zqrnzdexcahqz6sfc8',
                channelSapId: 'ygfknnlwg40kto3g9vaerodhqemr0jrat9yvyuwino4eg6g3tm',
                channelParty: 'u1aj2amiy6uaiva4pay1uno1s5hz18dct853r11dw2qkclm5nzd8xlskc2xd3oljhcygdve87c5k6w6o1zizjgqb5qaal0v13v35lhsykam7l8d4nhhd1xf4kt2qd2kis8gbpa90zpy91hnrm9zuks9r53qpo5wn',
                channelComponent: 're2951hlkr0r3ihvlpg7q4cw3lwb6h6d0b2r9p8xuv3mz815zz6gyfgc6gpz5dnt0gbzsmrs6klqzy50vf9zu0n6uhmy5blszsbbs9h66lfl4iiofp1uhet769tdeyubj2sqcvenagb3zq27rpc0kgwosz57336e',
                channelName: '9ogccho91zhspv7in7hf14a4wiiyqmr842mz2bl9zjzqklap1f41zji2v2inje5be5at1eig7m6xd6nhwk3395agmzrur862uig1p1m0wgpz25wsi7x29jtl0pqe32vzet4bz5ujjeo9pxbmr691gkv5sv6qcwgq',
                detail: 'Animi ullam voluptatibus nesciunt ab ut fuga et. Consequatur dolores aut et iure eius mollitia. Inventore at possimus ut ab neque ut. Nihil qui esse quia voluptatem.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'v25ar0el644ym65ndyf1ql2vsnrd61q7lg58wd3518s6610so3',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: '4zdr52d0xnf1do2chddw',
                executionId: 'uy7sg3u824jgec7cdr0y9z0318q1q15e8fzcn',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 00:49:42',
                executionMonitoringStartAt: '2020-08-04 12:36:11',
                executionMonitoringEndAt: '2020-08-03 16:55:38',
                status: 'STOPPED',
                channelHash: 'pfcv79aynrbj4i4qiab50sw7lylysw3d89xppwez',
                channelSapId: 'yhyd7hiqbfkuqp1vw83146nm1dpxkaicueilcpgdlbrdajywnu',
                channelParty: '96p2in3tqxky8gzoh8rfnpskvue0c0uiqimxns43lj5ljdvfnitwe3p6abi5kxnsjkhlrndlt3tq7jv0085ri9dlqdi1x49t9ftaylscaw5lizk3e0db3onuwthicsbiixzlp8uhomi35hp2ogad41ad8yea14yn',
                channelComponent: 'sceb0vd1shfhwdlibx1l4m9mcl9vex3y2h245z3s2pxgb2b8lq6rs9qrwwgbhogofv3m0pttv8tqoselwh0kffawspsuhtq1tdp3shixo63bqk94duughb1o6zv2gchx40g20d0h1sda2fpgmibjv4v8xfpwsceo',
                channelName: '8tpxtltjf5xa7yts8cypwjke2pevi1g6ufh0ym4o4t5240ktw7il44n15un6hm12to1cm13aus7epm6bqm3kapi98g5t6e52qpvhyy9wx1hytope1nmbuo3wfusvqzwjset6qhlo4c2lx22bfzbbysrjwpi45e81',
                detail: 'Maiores aut laudantium quia illum quod dicta alias. Eius molestiae aperiam facere ipsam quos ex. Et repellendus quia autem assumenda. Aut corrupti pariatur earum odio nulla aut. Sapiente iure sed omnis praesentium tenetur sunt. Fugiat alias qui voluptate perferendis odit.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'main6r5myj2kpmec1hrsimvwprraxkbkg8u3qrnt9o8atn7enb',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'u1h7012gfz35oqo9zx6h',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 07:21:12',
                executionMonitoringStartAt: '2020-08-03 20:02:54',
                executionMonitoringEndAt: '2020-08-03 21:29:38',
                status: 'SUCCESSFUL',
                channelHash: 'dumsmj5g6i7bmom9ds00p18pamntenf3f8u11ptm7',
                channelSapId: 'treiwi54v2ye9dcrgz3uvgo213dhw7hc39pundpmomujctyg47',
                channelParty: 'rhpuj9k2awt14t5zi30le4jotakuv8qdtg4tiped1qg6zrq8im7baqflqmb7to4t96jzwyxiim8z1kgwivgs9ou1xdqw8mnsxa3qxdq4dq5a46pnf28uv2bvr2i8jkj2j8b6q8vrouyroxw016qn9i0n4av5pnc6',
                channelComponent: 'yftht40el3yrfi8hf201xdw114qp3ziu5yl39cjv43eobek3dmp0i8ae2crn3pqt9u384dbotingodc3o9jdqnvhv4c8fu2nqd5acgzslqnrpj3wxd2t30gstsc9hbrltyorkx63t9jq7lrvbxbvz8f8oe0duc92',
                channelName: 'mygq6flx2gehwk6clqm5seqyqhddpj42lxil7j9neftgvluwdcaa2bep6jiuu72a08se7pe3fhvpmwc2tygujpcn7122x4qup5e6fv2zavra166n4u9dcwmpd4q90llc01vzriwk7jr3rmkzux9qxakb7z6khakp',
                detail: 'Consequatur praesentium ut optio animi ut perspiciatis neque beatae. Labore dolores praesentium distinctio similique. Beatae quo neque voluptatibus consequatur veritatis aut. Tempore perferendis voluptas aut ab quo dolor quasi.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'c14zd4j2b6pvvuhvgzk24ey5da6llkgc1pd3ixxb6mi6efri9a4',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: '0khkoalbss7my8nw5x13',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 05:00:21',
                executionMonitoringStartAt: '2020-08-04 08:27:25',
                executionMonitoringEndAt: '2020-08-03 16:29:11',
                status: 'SUCCESSFUL',
                channelHash: 'p83ltiglnpxd0x0xuqxftmee9p0pxh5z71rgstra',
                channelSapId: 'dhznidka6b5hccnxgvvqv6h4445kplh4wyxw7kyg8bc2rmbyh1',
                channelParty: 'y36j9efqs5brr91i9cy9z4f75n6b1oxejz3zui0ykk4udzx16fd8ki9v3b0h0vjnxm48htrgul3hy4x8m5s2ezt05sd0j4kcegu41tkxi220igar04lpe8z98slbxcadfud74y9jizudzc224aapcbuewd7ijqmx',
                channelComponent: 'h35xogbibc1rlf2xr7780ehn3a6gl36y7hk6tu69iwpdilm578xila754fuzkd81emrbwhy68ldbngibh1tkx5whfeuaizgw47h6n7h4y5xs82s8vkkuhfzitypxakjpwgn11rjxv6zohzi7dwkx0ag2qagmqaxr',
                channelName: 'j7egfbw46wt04h1n3rvaszuzodhgj1yps5nlmsn3cznbasgwbxqnhkoxaxv020fodemx8fcb2s3lku8pv81oqwtlrn2bhhknbwjmyotxlh9z9xtscz13w70b762vgb5preugtcpobhxnmf2wp17ogwuj5ue73fkg',
                detail: 'Rerum ratione consequatur illum voluptatem voluptates debitis id. Quae odio ab ratione modi qui. Vero eaque et laborum sequi modi numquam. Hic odit minus odit odio qui esse.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'w1ewfzh4uwg6j8ll8twn3m4c9njrelmc5iszome3iodo2qn2om',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'wl1bqv8hbxayy82n75nkd',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 22:33:38',
                executionMonitoringStartAt: '2020-08-04 08:25:57',
                executionMonitoringEndAt: '2020-08-03 20:35:56',
                status: 'UNKNOWN',
                channelHash: 'ectnpfmg6vdx3anre17hr5qizs98tl6u9egnn90y',
                channelSapId: 'usf1ahfaynbze0yr1xn7zwyvw767v28jtqkwb2lfawutvc46qx',
                channelParty: 'n1jtc7iot1ram1ar1uvynlq1pfvpei5ziaja8a87xboy8k5ymo3mfisbwhu5cz8sl04q3y4215xrubi9sx692m3h7gb6uc1vag1hl4re3ry5jwuq9e3w7gwa4w4xwni4zzf78iiu3iq6ikzaq9gr4je85koks0t9',
                channelComponent: '2p1avdveoi3ppagf09qqal715k1hr670z84jjce2l0l1fzlngvj1o7h6ogy6n2ihbe3nqfgya7jzj0h5yjfyhe43wuhgn1e7jyjv3fk5w4mw19p5izxs590efidkq6q2p52yos0vm1x5xbq5kuycpecbvvu06lx1',
                channelName: 'rswf6t3guqgf4x6me7elcxcgg2p0fpk17nerexraemxthb8q5yx3fc5swmtecyyim3plf0bh21xniptbh2wwm239atoj3tklmf9460jn8u59f3efmhads04uu9oti0wlb6ewrhlurzzurh3jg17y70d9shss5xw0',
                detail: 'Quis aut dolor eos dicta aspernatur voluptas. Aliquam ex ducimus quia dolor vero repellendus dignissimos. Omnis accusantium culpa voluptatem ullam dolorem nisi.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: '299qm74lpo5jigniamx3k3bpgmv17snzp51uygsc2w5qfl8yfi',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'bp0wo3ubs9bchcj31fg8',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 06:31:32',
                executionMonitoringStartAt: '2020-08-04 07:25:27',
                executionMonitoringEndAt: '2020-08-04 12:44:04',
                status: 'SUCCESSFUL',
                channelHash: 'cxj153xq5q73zj37kpbqfoxlumnlijy8micseqw1',
                channelSapId: 'yceg3rxesy089mfwiho7ztt2jhiooj12kawtzkxjbc9gl7olgqt',
                channelParty: '0afn0j4p2rav8xr3epzmg805w8gs8x1joylz6tpxmk8hpqx4m65kx2vqa2e2hd69boo7wq9m2i1bvg2qz0dj2xs3oi5qi61196amdmqklgt4izpzodl420jepzer8hnufw08zs4ecj4aot0faanck3uyf2nlw9n7',
                channelComponent: 'iijmoyvjefjd26xno1x2sp3u2nubah7ag0qpmi43mwp9bwt593cpemzgr0ibmqi51wicmfyk2g2vod7tdm2pnszne9rz90pmlzc2zt9xdcsa7pdysnxh8zbrew769ywhdwaplaursbmja3da9x3fioyl79i0hjyw',
                channelName: 's6egefmetxa2aewwcc5w7p745qla77xsi2duju3xsiwnsaoafuvmr48uij447357ik1om0tqjvmp4bccv7fce14mdy5zy5viay4yt42q2zsmih8djpqc8vf3rccpetx9zcdq85bozv0bxvkbfuksznwk3j3zri7x',
                detail: 'Et soluta ipsum in sint aspernatur debitis vero porro cupiditate. Accusantium nihil perferendis et sed consequatur assumenda dolor. Deleniti laborum aperiam sit eos impedit voluptatem consectetur incidunt. Odio sit sequi laudantium sit voluptas.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'fotw4ivabzohp33m5wpd28dvl2l29f6hvpu040nrcxdz2d38rg',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'm9y0zrob4uexxat4bo8x',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 10:11:17',
                executionMonitoringStartAt: '2020-08-04 04:58:22',
                executionMonitoringEndAt: '2020-08-03 20:07:53',
                status: 'STOPPED',
                channelHash: 'z2ubxkjf09v105qx03ijsunm0p1l38drzlftz6k4',
                channelSapId: 'lujso1ikm9sx5v3trmvrieox7op79m8lb9vvqhwq66n6jvkesh',
                channelParty: 'qkozva9u1ms1z0u2po7v5acmz35q4trbdrglscwhbq67qrz6teox4jcd5dw5xjz612p4mqf9bo805pgzdozz2xl1agze7hwpc72af1vkx6j1i7cdje5oxyy72gg8qu657s9nrv62ri405qp6al99lt8m0vjhoqu49',
                channelComponent: 'j0dgh71kbd5jtjjjiguke9ojaj2bxa2jc523d3xlrdjwbmq5lo6zwjsq3k1oi2azkrvmd6caj787q86sm9hxv4jreaes4w17416tmh464ldk049jaljbjvtm3hyap3yg5k2fjosrt1b6ecp7tjxaoipcmelpghp6',
                channelName: 'qa0alud86ly33jxqegqmd6ia5ehmzaew0yy00biijbs4ua44monetw137v704jcz8fumgvu4f6le0lafbz7cuebwfnohw4v1z8z5yipv701pp0racdzhnl9vqg4iyykrkndc6srbh7q72kc6ap1hwu08jztdsl5i',
                detail: 'Asperiores ab dolorum. Sed iste temporibus nobis consequatur. Est itaque amet quo voluptas ipsum delectus nostrum consectetur. Consequatur ut illo dolor dicta eius blanditiis quis eos.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'tycwsjmitw27irnjljqu82llq3xp787wvvx61p1wisr2wqqer5',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: '11fbj6e9uwf4rggxxzre',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 05:06:54',
                executionMonitoringStartAt: '2020-08-04 11:14:27',
                executionMonitoringEndAt: '2020-08-04 07:30:50',
                status: 'UNKNOWN',
                channelHash: 's16zptr6msgbj0pesc48yds917b51onpdtd44839',
                channelSapId: 'o0lkbg2g2a4ksmlqfyarx6aq0wkz2891z28gj45ibvz5u7lnfo',
                channelParty: 'pjatxwub7t70jbn7yrx7ajfm3oh52ffy0en3wrtdrr3jrsy47xyi6vo44s9xnpdq80y49h8fnqo5otx028ogaoekfohbhol0y7l9maifq85pjdsnm1tseg8rc0biwxpepf95jgjcsunvi8gmo8n1ixm88vvp8k37',
                channelComponent: 'jo2hh94etv953pbs4ex7rqrxyqokhq6s27eb134lz0u66bdoawr0upcjrider7l3qo70s2e5xojmucph6dus0krjgo6nkewt4o7gff7p78wbwdbjybzdc2mwvrhi81ul3h5b7wsylf0s74ul8kl2obmfejhu9i3nh',
                channelName: 'ddzj8fq4j81okmcp6z8mj344fc4tiwuc9coz73s52w1nz58oh1u1az4fhu8a2umzn5745kn1t0md3e1zrlb5cxl9u263fqjy9uae4jag6mfctw5z8kkzhkx6fduzt476htrv99d2h7istgngow57fjulrw34u8fs',
                detail: 'Provident reprehenderit voluptatem voluptas consectetur voluptates tempora est. Doloremque ullam sunt voluptatem distinctio ex ea asperiores. Est odio sunt eum voluptatem dolor repellat recusandae voluptatem optio. Sapiente aliquid qui molestiae vitae aperiam repellat sed. Voluptas consequatur distinctio enim fugit quia aut consequuntur eos. Amet tempora autem dolor asperiores.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'k9jdz7ywgwaga5uco92qv599tnsxqpte1o2ahstnntoesjkj4r',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'czpa9f2b4dqt7fg58u7b',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 05:41:19',
                executionMonitoringStartAt: '2020-08-03 17:01:23',
                executionMonitoringEndAt: '2020-08-04 01:54:46',
                status: 'UNREGISTERED',
                channelHash: 'kfulbwhqlpghct1scvbcwdzt8tpwaqfmcnuvtor9',
                channelSapId: 'mls2bl7scsmgi3y5jb0ew3vsjoabeyg7ieu5jotbr2a4bj2e0e',
                channelParty: 'w7qsxn10k4bf27g0vq6atx55j3xluka2i3fwuzaj1rh1snotsm3irxauklfoiyaspd8al6lq5ma0n5c83b5vd7ntl2mrfm23saad3yk7ku86c27xk2413ea03vv4aoziqa885oovtezz1tjlz34iqmpwyi21xcg3',
                channelComponent: 'qwbylhfpl9hf7sca7b0yjjh4wpm8kk5iujhbmvpxpedpsv5cqxiynnicjjhy2vhke0s2jypsx4bmvkv9w7ib0aipb334fdxpoghee7tcgw41wskhoj6aosh2812gwgt2qtj03llt4h21ilqx1ud2fqizzydwi9gx',
                channelName: 'gbx5a8knii9w852q96sojre7f1xuxqbfvwi40zzylbbq4xdump9ft9mr19cvnk6sk8kblmxl75fpixfpkgnnsgm8na7kmnl8pe57t16eeo43b26sxjw6nx3y2ze72ejs8g0o1e0poxnmo09uwlhe6ioldyc9imbmq',
                detail: 'Beatae iusto est laboriosam eos fugiat dignissimos aspernatur. Laborum repellendus sequi delectus assumenda eligendi enim sed ex sunt. Veritatis asperiores exercitationem sit molestias ut laboriosam sit necessitatibus.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'v89wcnth4smx0usmm0mnz2o33whqcep3rai2kkg37f6j81esed',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: '1a08qwf9s6zqgm8sy3gn',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-04 07:14:10',
                executionMonitoringStartAt: '2020-08-03 15:29:04',
                executionMonitoringEndAt: '2020-08-03 18:34:04',
                status: 'UNKNOWN',
                channelHash: 'be66xfhuti9mugu9lj473u8ud0sqwsluhxyra4hi',
                channelSapId: '0fxr858twi6uolvj4hyni7qzjvspb7o6t5vhp5kagir4dzaewh',
                channelParty: 'smr6472mi4ipp1fpzbige0ae2qnc7ugzkpdg1wxvydsvmnp1s2agqg58htw718jxtntcyzfdh04jkryzkd8hq340ym0hsaif09s2g6iqxsv3a2qjq8vfkffea9yhd7fpds0owsc94fqtb6ort881qbvtfqc33tkv',
                channelComponent: 'iz7r7ehq37itdnbgwbahmhxnhgfcsvwz10jhd86i5k49327k45wa8ew6k9c4p9c5foa8xaq6cmjswp9vzfoi0pfw6vp90pk8z5htpr9yjaq8hck18ujoyykxt9n87vj57ydt4cxfs4xvrtgtido0z9tfefs6pb7q',
                channelName: 'k01ptxesu6o1vngql9jjo4d6h4xv1icj4h5c2rzkhb6t5uboik1e18yjvb7t2l0emus2odz4si5nz6gsf457n35p8wddo64u28defxgj955kqj68b9bc9bc2sj6prx62rp8pdo9rddlg550y68lchoxh74vae9st',
                detail: 'Ut nostrum itaque omnis animi aut ratione. Ab amet dolorem eos accusantium voluptatem ex delectus aut quia. Similique harum explicabo. Commodi molestiae ut praesentium non repellendus architecto expedita delectus. Porro velit ducimus.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'im7ubaudaiuk4f6l2849765wj7ow4umjlgolevehf5vl6tdk5z',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'kcobi2dmioubkbu754ck',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 18:09:48',
                executionMonitoringStartAt: '2020-08-03 20:22:36',
                executionMonitoringEndAt: '2020-08-03 22:15:27',
                status: 'XXXX',
                channelHash: 'zqjfwsqey5hknnmjp3vwb3t36y8iel610oqruskl',
                channelSapId: 'ly2upugw7muhqmgk4lb62a7d8d648g6zeeeksrlwlazsdz7wm4',
                channelParty: 's01pd99g2i6d1u4pqqrs466ug4n39i6332thyujgdbgaqcb987l70gncqt7ar03ide2pv4hsyxmeemsok2av0hd7pmes381t4du6smh5dwewwr22qqy5ezu50cipsn2gzla3qooly7w3tagmtufjq02l8pikhojx',
                channelComponent: '8nkduyizne68b3n47s6knw4e9v9tu282o49v9md8eecr873xwhwrt5bk1x4oxdjddwzrcskz3hyu9lfef4jc525lldhfcoex49gb0jgsjm19al4apjt6f8074c6ng0h4w1acxk59glk65nu2vtabtx5xwj49pkig',
                channelName: 'zlion85cd4kzgs5w9c9zvep5g65k5bbm1zb47rvbji3qt4o4iwi2r6xdqhzzww1l2dglyu8386em7epr1qcik55stxp1cdgnyr13o4yjcugte9zpnjd9j63miu6y71zbyjqjr35t6qxyvji4oz1fqpgppib2nwm0',
                detail: 'Molestiae et quos in voluptatem. Saepe qui placeat ea sunt eos itaque. Voluptatem nobis recusandae. Voluptatem deserunt nesciunt iste voluptas harum minus. Distinctio hic ipsa. Eos reiciendis autem magnam laborum qui voluptatem.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'czi6btk5n7qkyi40dz5k5vlpeem4njrtwb7iarm1qqnqehxz5e',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'thg5aa8646cl6k2w6aal',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-04 13:36:25',
                executionMonitoringEndAt: '2020-08-04 03:25:27',
                status: 'INACTIVE',
                channelHash: 'sn9yzwawyh48zkj69wb4a54szzzrlgjla5x3rum3',
                channelSapId: 'cwih5dc1qqezrbtbpatepn5l3ece9imca1t8wnrlz45g3cvwsb',
                channelParty: 't5wvvl12u0lqi7jsxlfaestamzt1mrtmjdfrn5ddns91oe3e3gq4nti53ef2d6a6736yig4guywkcdis44acgw1hwb5pkfrezrlo12by0r2xvesyge5ipuvx1ls5uxa4jb2jcgecj01fypwhtn1tdykgg4omsxbl',
                channelComponent: '8zp1xyatdp6zyr476ppt8awmg3ukyoe2pda1yphfgoc0rmk1cpi8d59suydx1kut3dc3b6yezplj0xsati9hfn9lw9y4s70qyt8gobcdpyfpcjb5axnurvn0pbiegoyed7ja148ghcv7ww83dgiabk3lch3qoole',
                channelName: 'ntvl65zpsh8aib29zh8zlw58rf17tufwz059fajoochyf6y0p4b3jhsrvius7265zh03dbukkcjtdwz6tw1cpy1tq2fecl5j8vedp61jkatvpup9g7o81ihmx0m1oqsfybhzf7g9lbivjzc4lqae1yd8gxpl6zgo',
                detail: 'Sit eius cupiditate expedita quia ut. Nesciunt temporibus doloremque maxime. Temporibus animi neque perferendis.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: '7lyfv8i8dy03e7my9ito4l6vp41ri40d0wc1bxj5szyb1sre3t',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: '2z1ltuv2hhip3ptjtwji',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 19:58:23',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-03 21:51:49',
                status: 'STOPPED',
                channelHash: 'xpg03e71cq7np0iqqs05ybkw0qw6s6r3rudgi6oy',
                channelSapId: 'fq1jmkvl5akfii2n84zzeiss64drblo89hv3uvx94n03ai5353',
                channelParty: '2i1sfyev2a286yq8dtentimceen4jxuyna0ytz38unzmkb29bq68pzdku323k6hcfeg52h50juo4kd95u04ojsryj3w7sxmzay8h5misow8c5ek6gl02ib2njrn6qs0de9jp3vg00demyn48xgxtnh4ax31z16bi',
                channelComponent: 'vrg4eaa12q0pwfnmz9pswd6zd9fscgj2e50ec24zad10z5yk53mtnuamfbgryewi2vne7571jfplv785nsjwz92lk3iowrlsgsgqlv7ei3mob9i0lew1e4b1gy8sy4pu1u8kcj4wtcnv6p1ectkzt30qpelamqwr',
                channelName: 'mzlagfd5tm3ti3hbt8k8zcx5co38fao4dosthsjpa732rrt4jb3oc0zsnd6fb5cvhz9rirtwempojh1byd0mc1x9iwckkhkp6uzuuvwu04xopabk639uph4hymvgw9sbb4okl1pezihu91dumvspi6spjsvulim9',
                detail: 'Rem tempora id quasi adipisci non quam recusandae atque. Ut illum aperiam sit asperiores molestiae enim omnis. Eius eligendi aliquid provident pariatur voluptatem.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'nrmxkdv7sw3530xud17fgh5ozb8cca2iwzikxwqx1y9tez9nys',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: '6l1owv4pznhthmx3uqrd',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:38:38',
                executionMonitoringStartAt: '2020-08-04 02:03:10',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                channelHash: 'u0ovyl12byz3mj1399236nuuhha7s0ivq6icsj1g',
                channelSapId: 'ykxhjn4iix8y973rv5df7knn3tofixydyfwdg4wrqcd0pfi9sc',
                channelParty: 'v04mzpzsrkdc98k6dedcmelzep6nf2nxtdx5nb1t5i4qwkkger9m5d3oa3ukyittfm6lzweoaana67s8pvx6y6in5omq9oxw64u7343cequ38wzj47ueh2pv5tvng4nxfu2rklk7p8iaa2uvtxhp4159mn5thesd',
                channelComponent: 'd8ayvzss4ftpigtynsus84b71kgu4bym6e0mw5c1wpc340hh6e7wej5q76jnjyzls2qwmxydpj8erh7az3u1hb9d8f9upqrqkey9m69j6z0toffa6gq2ncze1elsgqrbedirseyxu6fv44ozgrv0slpj05rg67hd',
                channelName: 'aux7ehl8wur8s4pnuhx9114y1bu75jh9jr8d373ps5ovqbyub4k308vlmrv1yvedo8rh8p10khrev10bptb9lo1loo19v8t1c7burgqs4p5t7o32hy8crd0a16djj13cxwz4l8mglia4k22lf1xuwkw8pxbm0upf',
                detail: 'Animi at nihil voluptatem asperiores. Quam omnis corrupti reiciendis voluptatum. Aliquid in omnis ullam accusantium autem voluptatem ut. Ad et id nam eligendi ipsum nemo aperiam. Velit voluptatum est et impedit ipsum mollitia.',
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
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: '5jicgej4oi1o0tjzeyrgcj6wy24yp7rh28n6p6fzwng37l3kko',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 's817fukzol6yq8jp01gk',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 23:03:06',
                executionMonitoringStartAt: '2020-08-03 23:52:17',
                executionMonitoringEndAt: '2020-08-04 07:41:35',
                status: 'ERROR',
                channelHash: '2giwsibtm0fir73l2w35r1vkl8kf45esr1ianhzo',
                channelSapId: 'yukb2zcez8dhlygqsbz7b8srnj2l5loztf81nuo49ucbph2qee',
                channelParty: 'c0ks92muj8jhmsm4br2yyfyawf5vo3tqumw0j2r1561w9k3epzvoi8yyg9z3wuuzuzwmjckrx4ml2do5jqhpza8t1wibbiyvhvl64tozdwluniq31r8rr8tjutbr3sm71ot2bcx4db3w3460vugvu8f0zue1p8n6',
                channelComponent: 'js7x681om5l8kf7ewkkmc4npcuxsjdhu40ymniutdlqzg9s9oks5gkbdxuzpk0y5nfqtxta9m880grxpiiaicuzroy0st86otga8jp6mgh5bq8pd1hy5eb3fwx0ggrfv5gu0l908w3hsix22ynq3fv1pyu3xztvl',
                channelName: 't9lvflmnpid5det8naz0dwn1h3q0zjsdio9d34ly060e7z5ls4mpucf5k8wp2pz72diydlngur010l9e1yshtgu2shmtuqpbvfftnoos6p1l8261yvfpc6enz8957dsbiq0cyz4f70o2x6p426nrf79dcboxmqxu',
                detail: 'Velit laborum aut sint blanditiis adipisci deserunt architecto non magni. Fuga ea ullam sit magnam est dolor. Illum sunt nesciunt ut aut optio unde quia quia qui. Qui velit voluptate provident et blanditiis quos inventore minima. Explicabo modi a quis dolores enim ut et et nulla. Dolorem sunt autem sequi itaque fuga praesentium harum nulla.',
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
                        value   : '91f72f02-60fc-48cd-b466-1b77c33050b2'
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
                        value   : '038067fe-dd6b-40aa-bb69-43657c527ff4'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '038067fe-dd6b-40aa-bb69-43657c527ff4'));
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/31382ab2-924f-4468-a8e3-b0f08844cfc1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/038067fe-dd6b-40aa-bb69-43657c527ff4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '038067fe-dd6b-40aa-bb69-43657c527ff4'));
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
                
                id: '6c112d38-03cd-44e6-ab2a-74defe79edb8',
                tenantId: '787198d1-6253-42df-9423-1212b21efdf0',
                tenantCode: '2jt2vkgbblykw18aav9u0o3hnrnr7l0chqkls7m2h8ir5i0dtt',
                systemId: '0d79f8a5-9394-44fd-a7a8-efc3a721fd59',
                systemName: 'ppkc33aczrcnq6n5dyp0',
                executionId: '3f3eb736-6f32-48e0-8604-88f6d43fbcbe',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 21:02:20',
                executionMonitoringStartAt: '2020-08-04 02:26:50',
                executionMonitoringEndAt: '2020-08-04 10:11:51',
                status: 'INACTIVE',
                channelHash: 'zepv2448vv4cgsl92avg9r06nrgc2sg67vz9h78z',
                channelSapId: 'tujozl2i41dpoc3gh0jrp9ljsx5z4yrmsej2zhribb8nqeulca',
                channelParty: '51ms95311izs88s8ovs2tpo9obau7rudw0oclupc3x9udyhiio1a4jjrmin1t4wsm9h12rqaieculb0eqne8fplbbl6k019nrf1hh16mrhaxbh825829l09cwvejaqpylbld49p98fp481yswopryx8mnzdyxu13',
                channelComponent: 'iodmojyxk0y2lte88gtifnprd8f3tsjm5h9oods1j0cvsf5svxtw77r362hr0afn2235bxh97mfdc3d3z45x0ngugbuabzaoy5ht3xjghlbslbpezh2ikunercsbpucw67829dkr2ebemydjcm0z3mkmtgpzekda',
                channelName: 'oi7maltjp9yiru5t3rg9y62pekr4x4voo591t1krvrjrjfdyzd086az459egmklauaiof182w9sfbq376irn7xdgi84brdfk1cv4yjr1k1eely5h01n38osyuzerzqbrl0itzafko0cgku5ksxn53xzyhfkvv0wj',
                detail: 'Soluta animi sunt reiciendis. Quis commodi perferendis ex earum autem. Doloribus nihil rerum laudantium voluptatem. Dolore inventore voluptas molestiae culpa molestiae accusantium. Nulla ipsum eveniet vel vel. Repudiandae commodi omnis veniam facilis.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                tenantCode: 'uv7ezex1ixw6yszjf1mbf8bipwk1nj4ipqbz1xq9y56ktxoeaz',
                systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                systemName: 'w6ax9sadmznplgg88h5a',
                executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:40:48',
                executionMonitoringStartAt: '2020-08-03 15:52:52',
                executionMonitoringEndAt: '2020-08-03 20:14:19',
                status: 'INACTIVE',
                channelHash: 'mism8ufb6n7orrbclxqx6ke90s8r6ydfbkedntzd',
                channelSapId: '5ukqx84aefp5ck0zpcch0wfzl1vx6d7fhje0cbc6n3a843uawe',
                channelParty: '0gdj8sbnwd5plncscx0picpw95kyhojoriymjqp63w8c25euc68pruoi06i1rjkv52gw38bdecmeqcz7xj2c1e4qggmblqkqhplfl5lffcf62h32yilffm5y098dljn96wbk55bn08gv6d5zlm74529jsqu4025q',
                channelComponent: '1v80ywja83es92ucp1ko1qn5j7q7968ovspu1ouvgp1sr8p91bekttoxar9dgez2tr4n33to8bkber5io24o2bktaraeemnrju3xcmesn9fjexyc4a2f89u1t0xlikktujde5xuzl3igkisum2qls7znxhg8c8b8',
                channelName: 'djvhaynokfn37nz1bygrckq4aq3layosjc6rt796e904kxfvxd6r3k4b695vgryan7p2wnyberioso2u9i537nigrv9ud80nbpsrj44dr0cpdvhpib9cdovvig4lxk5r1ocpvxdnpsis5wbg5ex3kp2pkkf4x1wi',
                detail: 'Ex et enim aliquam maxime eum quibusdam corporis quis. Dolorum ducimus eligendi. Dicta quis voluptas tempore et quia deleniti culpa. Incidunt ea numquam maxime explicabo quisquam. Corrupti facilis provident tempore minima vel ad.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '038067fe-dd6b-40aa-bb69-43657c527ff4'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/43e0b935-3608-4720-8f94-ea1513c00ea6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/038067fe-dd6b-40aa-bb69-43657c527ff4')
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
                        id: '3d9eacba-322f-488c-a288-c53d519654db',
                        tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                        tenantCode: 'hfwgypzuie1i1c9573bm1fy5vve3xbb0kkecfhrtza2yzafthv',
                        systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                        systemName: 'a0rk8plresvo7yh0bpmm',
                        executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 11:48:22',
                        executionMonitoringStartAt: '2020-08-04 03:26:20',
                        executionMonitoringEndAt: '2020-08-03 18:19:23',
                        status: 'STOPPED',
                        channelHash: 'zhap701ug561im5adub3gazvw6q6wmwv426qorn2',
                        channelSapId: '00i2p5886tucz943cf0w6vqtpgftep8qeiwzw50ydv16k20ilm',
                        channelParty: 'a6c20p3cwuxxr5m40bv9ogbqv6t9e8y55c08zmj6g6ly6m1mokaamokf8d6dv2txrg1q9yt7aptrjvsvdjd8mvh0jriw6cvf41h5naynlnj5c7btimhzhebosfwtcdz41orog65ogjr0ai89afgdy5urnxwyzcc5',
                        channelComponent: 'ppdufxbn0c1ukk5m5vxubid4i2ldnespres86urdruzalpimts8jr6kvx6uww5iq1e5g4clyfat2hw0fklqjofwp00be2a0bd98y7m4jg1jfupl81cyjwgis021w1pxh8zslmtedyhaag0c9msyoamj719qyz6gq',
                        channelName: '4bn0as6ly7lv26njluwo5u9y5k4h683b6nhssxifbocfhnmrjksjhfx4l8rjgjoozearp68cgytj0v068lb74t946ifbxam3pl5rpxthwzcwbiho3gqc87vm9jc7myv1chhbkcgenk9fli9qu0skdr94jrmmbpez',
                        detail: 'Impedit necessitatibus est est. Ut illo tempore rerum asperiores amet et eos. Possimus est ut et ut soluta.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '3d9eacba-322f-488c-a288-c53d519654db');
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
                            value   : '1b4d2e26-d1db-464c-89b9-28219b8fb01b'
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
                            value   : '038067fe-dd6b-40aa-bb69-43657c527ff4'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('038067fe-dd6b-40aa-bb69-43657c527ff4');
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
                    id: '201eb4a7-4ca8-420e-a9fa-0059e0dcc9c0'
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
                    id: '038067fe-dd6b-40aa-bb69-43657c527ff4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('038067fe-dd6b-40aa-bb69-43657c527ff4');
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
                        
                        id: '23bb676f-9513-40a4-9d03-1c29674a612f',
                        tenantId: 'bbfd5923-379a-4aaa-ad82-4cf0b4c1aeae',
                        tenantCode: 'c68gcd6hhfmvdtx59nmui7e4qrn3kh3iayu11goavspj7nqr6n',
                        systemId: 'e2dbee6b-c6c9-4207-9578-18dbc196cee1',
                        systemName: 'nzfh6saaberbqan0kgeh',
                        executionId: '1f9ba0e2-8cc3-4cb5-a858-d7d490daf2cd',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-03 20:08:55',
                        executionMonitoringStartAt: '2020-08-04 13:46:33',
                        executionMonitoringEndAt: '2020-08-04 04:07:45',
                        status: 'INACTIVE',
                        channelHash: 'x7si27sw4r65er1hdq3k67fiagu4onir0apdzd41',
                        channelSapId: '9cjicjcde78lm7dew8ujllz90vzf0cq075qm2nr6tu91owv2f8',
                        channelParty: 'u4gd52dfuipf93k5o7ixtxuaubwfa3nudbxzxfvoocb6mvreklktm1714eh8n5pv2wnf5tkdlt579fjzmyrhqtkfm5rwpgiev6oqydbia2vfacw1qs8huisy5k91muqw991vylyfbk1lb2v04fb7746d0d8ruy5w',
                        channelComponent: '2kpx8ow0ca8i11rk1tscoe0whs6icwgklgquxag77h6tic2xyhbxjvpxnumi1hp68zlclpapqx7avdna34cwru4ptrl0zv02j039wlyyhzvhcu6lqs7v3bl75ir5su2fer3m435gbre3n3r128ku2no1181446ld',
                        channelName: 'ko3adthzxx3qiz3wt6phzqqqji4afd8l05wxk8c954cr0mbikds0e2oshs2zoulmp1rgx9i08ykuevxbq04w14vjbkma2hk6nrkdugofrpoukd2paziuxo91xayrtq87h6hopyjv7iaoj4jhwols5c1fsq4zhphx',
                        detail: 'Perferendis facere sunt. Consequuntur excepturi ut corrupti aut quo ipsa aliquam vel magni. Accusantium placeat eum. Temporibus fugiat sit voluptas repellendus.',
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
                        
                        id: '038067fe-dd6b-40aa-bb69-43657c527ff4',
                        tenantId: 'c30d6b30-0cc8-4e37-8131-75f6e21353b8',
                        tenantCode: 'dftcu7dsatodpi329qbsbfjrygs5750tfl9y4kds88718chyvi',
                        systemId: 'fd64441b-766d-4c21-9fa0-8ab1cdccf383',
                        systemName: 'o34ramb3p302xmfn4jnu',
                        executionId: '8fcc2bda-4251-4342-b2b3-49424bcd00a3',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-04 04:43:10',
                        executionMonitoringStartAt: '2020-08-04 08:26:23',
                        executionMonitoringEndAt: '2020-08-04 04:19:16',
                        status: 'SUCCESSFUL',
                        channelHash: 'hzs81773w6k6j79vo26lfsx1eb9vdd3h28jzzr75',
                        channelSapId: 'oy1qr3ilbepzohfhbfhmgg3td3jbw631m52lo9hk6crut1bgw8',
                        channelParty: 'y37us9cfop0w2v33g65uytp4nry6jdjzu54iudysv3afsw08m6riglhvm5trty1rj0rgpezi9exvtjyashwt4hy122ct3aqb7nlxk367e5x7m4qrkazsid0vw3dn8wdvfvket086ovjlrlebbyn73rfc0c3lpdcn',
                        channelComponent: 'ethtt34cuic3uvj6epv84krixlids2mxiayczifavjxu2r0cjn8hughqdjbjwz3n0jonlzluzg7cbq1gk0m008wbbfbad7y5p4u00vhft567xrokso1y1h7k4wiez8j3wfep1j9ullf9gq2ptgp4tnaz29risdsd',
                        channelName: 'bynglz8vt9jgisys0gu4yntyn15ygzzwnfokole2gewzjzeaehi92asm02jx6uo1p30r1q3ijii4fb3wpp104u3iv44ska5ljjmgo6790nm40mwst2ouz6yr5s9eutgq1pim2hz9osanrtmjtjwrt24fo2rc4ofx',
                        detail: 'Ex natus mollitia temporibus ut quod et optio aut libero. Laboriosam deleniti rem aliquid dolor explicabo. Nulla quos et debitis incidunt.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('038067fe-dd6b-40aa-bb69-43657c527ff4');
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
                    id: 'f7f4c0b4-bb60-4637-9b3d-d83194bfc4d2'
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
                    id: '038067fe-dd6b-40aa-bb69-43657c527ff4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('038067fe-dd6b-40aa-bb69-43657c527ff4');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});