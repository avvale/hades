import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IJobDetailRepository } from '@hades/cci/job-detail/domain/job-detail.repository';
import { MockJobDetailRepository } from '@hades/cci/job-detail/infrastructure/mock/mock-job-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('job-detail', () =>
{
    let app: INestApplication;
    let repository: MockJobDetailRepository;

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
            .overrideProvider(IJobDetailRepository)
            .useClass(MockJobDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockJobDetailRepository>module.get<IJobDetailRepository>(IJobDetailRepository);

        await app.init();
    });

    test(`/REST:POST cci/job-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: '0teb6uc55309suf01amopmcccr7lx1ofrm24ikbp879qjqpn7x',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: '3wqsa12n301x4zia0uj2',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:57:13',
                executionMonitoringStartAt: '2020-11-04 22:24:51',
                executionMonitoringEndAt: '2020-11-04 16:23:59',
                status: 'ERROR',
                name: '7vgx1ukhcut9aw1jojl2lo610ulaxrj9wh59b5nl1vcny3t3a3ulna4ahxfmrasiegvhx369wfpzz9nvfjypyisdeg7lmlbzhw743djm0vzedz88i147284amnsv1lrsbipsw3omid2b9b0ibx1ij2q3k4f9472opvjk2n05vqze84zk9kk873zi5yks6chwbbs6av9rdxug1kx9xyg6s8pjv3lav7nafidm14nfv7oqwoio5yrfifpku0lmkxw',
                returnCode: 9307112671,
                node: '5v68skoh40x7phcm4rgvgrb4l1flvnnqie15vm67rm287a52ca6xxl6s013sfk4fz2a7141qguwxgfs10vxer5f9zdpoqyqwyecublss2gsvdj7jru1tq99okccj4fwnirkqcmqm081ig4o7cajszgflx1a2ywaq',
                user: 'erwzbv6frhci9xld1mqj4akec7oinl06ofyu031rbqnlblk4ntu019lrdkzo52uuo9tveoe8fa2c1l5x5fvuj2ec3a7icvvc05ypz5cz8lhx0f0m8ig136ua4icd7hjvb7ghhk73no1lm5bmfzf8riiaqq4cq8zgguxb5jyj7jz5f5h1g8rpxuedsovlu85ja8ju6dt8qypgkqxgh517rph29yhviw2ym30zdzg0gww0xkq1xnnza74c3anbjnu',
                startAt: '2020-11-04 20:15:32',
                endAt: '2020-11-04 15:22:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: '6ae70mjf2ogk9fso5ewzkffxho44z60sabxunqgm4lf39bnaro',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'zlvw0gmw2a4yokaariu0',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 09:41:46',
                executionMonitoringStartAt: '2020-11-04 15:11:58',
                executionMonitoringEndAt: '2020-11-04 03:24:20',
                status: 'COMPLETED',
                name: '1i892tqk1fxqch8uew8qctylh71trcz61pba4wigsql0w4n36dpw5bzszl22kbhymajwn7tjrmjmupr379d1dnnz5l23u52goinsedh127t26gqvu0d79reet7jfomtbcb48n5x1u76pe1s5hhua1atrkhtjsr6w9h86pu5qvxxm506ber1zyhmd9kob1kumf6uw907n3jc7w4c5a9a13xhqp9o3l0lvvsmkeqzm51pvvga0v1c187r5sabfnov',
                returnCode: 4385395457,
                node: '4zld1svvs9x6zyfsj6vv0vso8dev5eiwagkxavlypulc3t3tlotgxj8oe7b9gtys3lrvauz2oa55a9aa8kyo9k0ozxxay8nriuiely25chphm8l1bx5uomna04v6aq77gwkhljmii6etno2dn08uary32ulavqxo',
                user: '08425tev4cq124q3yz8uk2wb8k6j36alktlvvexl97tww1zft1hhcp6rap3psqcn6x9sy44qizv48xvn2srzb7ps70ni90xi5k9z7zex4jmvd32djyctmqud1fn6bi07lp2brmjwoul8i4dkxdwsq37t23yltapgrgjf0tgj5rer0xlkw0k0yzuicpw88wnqgf28rgcqaipkllvvezmu7fg0zodasx05jmqr1s42icyh9i3ezlg50h15i1eb4l7',
                startAt: '2020-11-04 19:45:31',
                endAt: '2020-11-04 10:47:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: null,
                tenantCode: '0dw77q5txph09w0enga82rovbkb7nolxqnxr3ei95k0xfwnc52',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'd5uikpkbrzd36fwpw39p',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:37:54',
                executionMonitoringStartAt: '2020-11-04 21:53:55',
                executionMonitoringEndAt: '2020-11-04 11:06:32',
                status: 'ERROR',
                name: '4bx3yh7m2edzo02pgatq2hfp7btd055y18e9fougm48k5te468p89jpoviygb7yvkpnbakoao3ezyljwuix2kfkmdgiehzqx6wo8z27nja2ry1xzmtnqgrjcqsbsc6x9v9jq26erzcqkto6rcvd3f6itvz2zkog6cwe5ifm19etvitmuff1vfycictb4ofpa8a5ftc75wd3rwsnj0ohu5j29b7vobd75hmbqwhpoqqtbrjr2lbs36bihm3rjsbd',
                returnCode: 1696087054,
                node: 'c25sv0d79w7qi7ji5p5usajzx3rm41r7epojxfzicofizhf3kxg829ynjvvpaij2omq8uemkb5pp37vxw36hm5wl1scvtb3bbkmygv398tphw5xmat846eyobnjr3znb366pwo3oxptp8k8lktvx3el1inib1wmb',
                user: 'xykntnvjvgp9d2ekrnwu9k7ul2dai0rctv7rx4jfyosstkh18l7lnalpw3zyc0jrgzg737x6rut5auopvhwrouopl8d4sj36tehlwfrsnabi89md4mt79islsqphk08t4kejiyrhf5c3pi4dp1nuh6w5y4vth2bjh8eu03qokiigaqk2o9n3z4bgfituc02fdonp1bb2t9l2hk2enf0gcko67ysi1j6wp70v874n8jji7oxa3jwkytu11ecsmhl',
                startAt: '2020-11-04 13:22:12',
                endAt: '2020-11-04 18:09:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                
                tenantCode: 'b0d9j6dv9ijznj6fs25q2iwoav0572q02z9rkdhwbg4cz8185b',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'sg9pobpf7mboate6tkg6',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 18:11:43',
                executionMonitoringStartAt: '2020-11-04 14:11:29',
                executionMonitoringEndAt: '2020-11-04 03:47:08',
                status: 'COMPLETED',
                name: 'paxr0hd3xb977rff6y9pbo5b4ky20utw2xxam68xlhhymsh33cuor8enix94haekd4qz64zmrrdlwh0ad8tmfst48ktke16r65ts59y0gd7wb60h7knm9w8g95rhtu9ph9joykoiertu7kgo2zwk1n1gyh2jjuzpyvqp17ys5tfr0wel73mbdnidjvdfci9gw3pdfiwwyud2puvsbqisi4zy7uf4sl5i04an591s3uda4y2y9axw0sgv9vpqxsr',
                returnCode: 4863544569,
                node: '3g32mayx85kj1hpfrvmpt52rn9c0jvszfizz57nq0z3j8lmhpf5ixp91vihbouk1wfxhjfxsax8cucyxxpf1bgs4h8m8a5hiqqv2lylla2vl4xbwkaj7v8zb82nkpnoidoyawzioqsuf99bkfhocecp6mjgr3rjz',
                user: '2um5prdigz0dz254uewv7dk730lonkg4o29412o9r0hjyraf4o2mpm29fq9iauokwkvw0c0h6sznh7y7qj61fazzehkkbdyglj6oj12ca82ksqnwdqttak6wyxq6mi08z20uz4ieuf4zt80pibk4ajv1y9icbzmb6ujkyiudsz0jg3sutkld1i72m51hd2kgzd022esf8ahuzl9dgcjqp7yq1wwxiupwkw2r8y7iry03um6bstrfsi5mw0ml8ya',
                startAt: '2020-11-04 09:07:58',
                endAt: '2020-11-04 21:09:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: null,
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'g5a45vpc1wqjfhqvhha0',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:14:12',
                executionMonitoringStartAt: '2020-11-04 08:58:25',
                executionMonitoringEndAt: '2020-11-04 03:07:33',
                status: 'CANCELLED',
                name: 'qj0wndo0xzgqpv3iy4rt98d6le2p4m8cmnfhe99qocbs8arwjdlobjoqxb5vo1f0ztcq45alljjz8e995zs9tub5i6rjhv75mu6l4s7j2bes3plvmykhb9ge9sjjj0mahq8rdja1apq7ckzu23wgnxmucv3ozs7foso1wheoub9wkubeofallsvs619v85unz5ioehc3yxpwtl8ryqvusgw9eztys7polizioj1604be880ikw7hlt0rcntfw4i',
                returnCode: 8897383007,
                node: 'urfx55o2ude9obagvuuejmoey7v1qvunvcwu7t1s4lxqy8wmbc68dzjzh5sa87jqo0s8pgybxdpuugxf2tufw9pvvc74u458608u962udldvqc1ff9pnsy02aspnuoyru1dv3dxaug9n9g8mrj2yrg7e1nl2vc3g',
                user: 'gt5kkkwpz7fxy14cdyt9gynagnbos7ser6ycfbf5ds5q5ethc206h03t21uhkrq7rhshi2z2wne4m63cgg9z546qsl3k2f4l2ydahscicfnmwqqpiwekk4tysxcxu6wycxggk04z28r5xm8smgxwfll7rffu76u7tnfvfx4anemwe9t4x257i50k2lolm30eilgfavg17pfe3oa50ylnftzbkkd92gn5krlitc73bjm7yt10neif94c19m3ytpz',
                startAt: '2020-11-04 08:21:37',
                endAt: '2020-11-04 15:13:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'riwpjqhlhby4bom14hr5',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 09:20:54',
                executionMonitoringStartAt: '2020-11-04 00:12:25',
                executionMonitoringEndAt: '2020-11-04 06:52:49',
                status: 'COMPLETED',
                name: 'g0vwvfhivv92ocebwsmzovae7u3fw6mwaq8fhu1u6ycvue5dttqjmns85koopdukxheoi2me91c8urs7lnxdrb3i4oupavf26f3cjsoi6xndids89zbc26sc8jiu1u96b770b3xjzgm0appi5riuknpiy3p59optgy7d74dhfujoq6ogstmign5dc7tmsxbgqcsivb0rq4u3710ajbrxx9zjisy07238q50qfzy35cljkfqocvg5stsamqie8xj',
                returnCode: 8468930377,
                node: 'pbrupfp66gl45nfn56ec7p6sa06exl84sy40seb8u4tgsut6a7c1zcjf0u37s0zjwbylpfk5117cjkvelaxb4k0wv8pkyoz2o00xd8pfp9zmzx5ki9z7ri0tvatcqzzizcmbr8r4fptyrvu37a6n8xo93fnb4blr',
                user: 'gw62s23ksc8ostvzpz5gsegjub4xch1ye2e6iykpgonm8me8iib5bd84ur8vgq66lhebjz1tbtlsptfxs1uv6q1l4x3hyl3crhu10xp95mj6etz1mjbsh9skhj86fz3fglf18n26nsw6wosme9ggn5djuo8o3gtzg52sdqkc5odbgfm3102yzzybob1qoleb4iy4n1okt84ywqtpzwsma4ncsxxfaax8v8eh5eoa1dsjuvwatdepfjcw26wb70p',
                startAt: '2020-11-04 14:15:44',
                endAt: '2020-11-04 15:02:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'iirzpvve1z5t71yw1cjqb6y2yuesswzx7vy6k85kmrg4l5hlla',
                systemId: null,
                systemName: 'g04c6vb9imyfw4svk3f6',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 20:24:34',
                executionMonitoringStartAt: '2020-11-04 12:36:48',
                executionMonitoringEndAt: '2020-11-04 16:29:39',
                status: 'CANCELLED',
                name: '5beyh4zmxzn7w0rbdbh64ce2ii7qkp0uce2j016q2eli28jorfaaxqmuqhyy1j0cwq0cantcpmjigfot3yf7a8a9i7nl7xrbwxbmzgbsob6maliimd347ztucgy9m1mubvv7rkqqt5hebm4kh6h4uahyg66d4k0y5qoc9e8x7t2618h3ca1ibf7ck0xgimgkpfsnap933b1ynwxgq401qe6vxphaj0qte7du9h6kppl5uyq28qi5z1808ptqgi6',
                returnCode: 9422161342,
                node: '9bmj0pg03ss1cxt2u43fyyewzk8saicv62otg1xbqv4wijmu6yhqqf494zfyopmtpvmnzazoecmu76kzbxhokmwwsaa2rg7cwziyj5b0t89wa5369bii0xg8nt3ms2ntpowkql11olfrfixptubqmieo5p5byope',
                user: 'vwllck1bpqumtlw74dw3bd9sicforuc4w7rq8l1d5r3xkwo3daaasxouahhs5sthnblqaluw7cvj30k1na0j6kvgwqpqyi0he08dlsgswv90xtmognov18l92n54ndpo1gkefq1ls4qsyzmctswzpg4s8mz2w54tg8uzwv6ejjy0vkdcvl5spnjxho89jdv92ypdaeri15zipkbwxznx4nhxc6jw3nvejn9j9cdo9uodlanzzbccgzt6gpolj4a',
                startAt: '2020-11-04 01:21:04',
                endAt: '2020-11-04 06:23:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'njbkq5aemdrmrz1zh0885xk4q614k4l15z0icoj70pgvj4w0ty',
                
                systemName: 'kebaky5vr5ex0d8d2ip2',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:06:18',
                executionMonitoringStartAt: '2020-11-04 07:46:48',
                executionMonitoringEndAt: '2020-11-04 22:34:39',
                status: 'COMPLETED',
                name: 'tjcoxurp8ojmsuf97iwhfuk6mlfctwbdq85zbjwt41998uq3xxrdt4nkfkjmfxtbx6tf5pqpizpyjnudwd3e91jvc438z4j3j5q1wh57zg8d1vbwn5fozgkmcf0ox3s58a3s8zgp9raif8rddmtvyn5x3cqnd2zvexteve8ky4jsfr5ngma5xlhwwahc36hzfb9pgjnqjcrzlvc0dsbwserny7ao2c6sab2kvtnad6ouesa9fm2wubfifgtqzgv',
                returnCode: 8236634114,
                node: '40gymbhpa3im23d6mtxy5357scpphqmh37rocdpjmsjx0f1a8pu3vv8zf1ew2c0fzqsbg28jb74vm28rn0xl8gctmriqx71kph2rhat3q2ps8tzti4ce4dw2ytbr0e8ecijq7iukk8seppctvmmjibvakoq93bek',
                user: '97ifevz2q8ygmqdt6r1o1ebn09j2qystwauiyqm7rxz51dojth6pdp9n4u9ua6da1qwv8iu5q1fkfaeembgglh1zzlm145n1su3d8m5q5kn1c0s3cy1czwalejerhb2wmjpcl70kwqaz3q6m0p6r2m3y12v9q4g18mx59p8j87m7ziw6tbsfldgc0x5ev27ytwbn48heg13qf98pz10il3kttq911t79u9nj80zb00iudqpvt2isy3pabff5dls',
                startAt: '2020-11-04 14:00:13',
                endAt: '2020-11-04 13:12:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: '026ip6fnwqbe187oynds8u4qs3t1e7d42u07ev9t1lcc9c32js',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: null,
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:26:58',
                executionMonitoringStartAt: '2020-11-04 12:28:55',
                executionMonitoringEndAt: '2020-11-04 04:47:21',
                status: 'COMPLETED',
                name: '55ipc4oq7g2m8a51guiix8vflfbvwqi53zql7qshqee4hvuyiw5wmjhoje0n2q6bqq3vglscm6xhwupks2mrbbh8skhj0aygu6nlyar81s38ojtt4udpnzbdwqwf70vdpo41phvfgujczmlj10haji8z3izviwlxsruyijpsf55glfqs7nef1rifyxzkec3yt7n12s71ahjdl7ddjuxc4ozhtcztznxrq8o3gecglpf7lowcy1fxd0bz29xk76c',
                returnCode: 1859675571,
                node: 'm1dv7ee6gfpu40p9b42k797o68xfwd2hbdx6gvq8mee2odymhjlvcn40czmp0y07iwj43kyystqz7qn16c8yy7xb3c0l1rkzng57bpayjylhvvm9owjt4aunthj1ddwtsci8k9yugycsz0ej8vpdkib8kwg1g1z1',
                user: '2ufbli9z1lgg3m1fzser9w3pgnfnq97arf7onoth0acmbu1653qd464c3vwkdy3tbrls3woeo67hl2k4xpa9ico7jhrxug4n9nkjkvdz32wjtyu49gwql0tzqayzw21ef3iixiaukniungvnqzqeyff8irelzv9vgi27oh3880x4vjygawgqml5g22awt7qihmwtgwpx7s7n253fzb57dxmkbcdha5w200nrf7pnng4q4wd4q02e9ao2016w8mj',
                startAt: '2020-11-04 17:40:54',
                endAt: '2020-11-04 05:02:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'sqjtkln0gnbcdm4ul02bv9vmk38hqfteb0o6xgbium7cng8gn2',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 00:44:23',
                executionMonitoringStartAt: '2020-11-04 02:49:54',
                executionMonitoringEndAt: '2020-11-04 13:09:28',
                status: 'COMPLETED',
                name: 'nai6hvwstea27i62ashv447bdmw032su9tnhc3ofp8ohaw3h961rg65mc2xiru9cvgj36wvsy7e96byc2zxs5s1djsltxovk5nmrk0oe53srvdp8y8tu18iomrj485rvp6fgcd4md0jcewzh6ee96triwh2qnwnhcm3yf64fcopnnsr3sxqep4udemgcnvyfu39anxxrw6zjj4e91n340uej44hjymus8bhzsal4gb1fdcyvsjyuaw0c7ily2fl',
                returnCode: 5454543349,
                node: '2p0v06e4itpwg52fo9rpy6u6kjr451t3geog2ahwb979hhp655ktzllp65yjqp67hnjeelzel6ettlauugbr0lwjodb281g4mrkxpyw2gui1922kchxab9zqrx7yq6cr01lmgih3rpz5u7eian0tr9nvbzr34t7e',
                user: '4gdu6yu5t0kv0yzxmbnka2nsg8446a3sge8s2zmt3jx11a53iwtm3fxpgkw1c8os3xywnepc2vshgect7s948u6sxwxqxsc1y2t457zfctd3774j11tpi68r88s8kpzagzwg7jfnkck7fz310hyaykne9wj1xoy7kmkp6dy7xx74wnvdzlusk588bnl6gfy7yu590h707r8txj07qyf0bint67mjhbxsrsvsqpejr58hx7chrfs0abfuqvbxbdr',
                startAt: '2020-11-04 05:54:09',
                endAt: '2020-11-04 08:56:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'czzirxlitzyy6lmgs1y0c88ic6dwf4td6y8o40h9ci2k62ziea',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'xpy4lt4w929zui35kate',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:47:39',
                executionMonitoringStartAt: '2020-11-04 07:46:55',
                executionMonitoringEndAt: '2020-11-04 06:36:00',
                status: 'ERROR',
                name: 'mvdud048aocs8wv8uwllhthe9qq6o0m5qw469jhdrz66ty8zo47s3chyw7rrlv3otsfnizjhbl2ujvjyr7gj0r3c44e32jpd8d3a9syu6g4doinlcuhixb413kd0z1m8o7a0grdzp9m45nnn1o0hqtj36g92f9iafoe6z2oqk4dwplibqm3f6h00mb09fkfsop9ptvj7j8gpmhl944f1dge7xg94d0vtn6cbupy5pwggqwfi7e6gcpzityqozqq',
                returnCode: 7877889217,
                node: '2975ztaeen78ksdpvj193egpc8akmmoo3zjcfgls6u6l8402izthzdsltgixwrpeetf92h1mf794ksiqlwsc0ylqqc2g0v48k7g523uarq7h7fgo4bf4i9d0vnlp1w95q9vueyry3c8ukiqkljxmv9irkge7ln5j',
                user: '2mcgd86qhkhaw297z3il3ubxygdp8w4oyvc42fwyowhugbwwtpvd2bve74c4fqildrtl16b6n3vhqbh2nl4gk7oveqnwuh47udf5bpihdtms47vgh4ms50vwb4bu2fmpdyou1uko2c7q87i5ddsii3dvz5lagqh8ajt79e4y0wknx25z1xohgd0o6odz291ff53yg7pfopxk93thwao178jfoj2d3gfk4lgui5104qy1iocmvh750p4jxoyo6l4',
                startAt: '2020-11-04 18:21:43',
                endAt: '2020-11-04 15:41:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'w8rynjfh3mytqoio2xktlp9fw4vjkak0glo6dit428ybjwaxs3',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'k4gbxgv65r53sr2bhgtl',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:02:07',
                executionMonitoringStartAt: '2020-11-04 18:14:46',
                executionMonitoringEndAt: '2020-11-04 14:08:08',
                status: 'COMPLETED',
                name: '5v3ti1rj6mjoupe70a9pujlywsg6l96levbyjxftsed3e5ln9ydwfoocgqk3teh1fcdbd5rzppdg94nc01yz2bc66tenhhwejbs875od7ydw5dhdxft1g8lp6cgehg64k0eepp1p528bfdxizlqbmk6k0tac4ph7sfdhzqiblcgl1uvwl48el30vgr3hllcj6mcs6747c3t4t8l69fztstwwsyowvxbkvrd65zpf6m6qjnzcvu2g1xaxp3akzex',
                returnCode: 5832147079,
                node: '0aitonstzk9jxp59cy7pwh2o21ipzyngxmagybcub2kj6qtesunhrio7vv486iox3b543g6g7txpciuawrg7lguki7eopx4c4uslj2k9y8alonomc3sb152ilwhczh9x6hj7pys019xgh9jo5jrqxc5d33qzotnv',
                user: 'foviw0ykmtp7i0igry0tk1dhdsno8cqcd6ugzi6csipoxwypad6ci8opo9izlf4zwnlapeadkctgr7z0y42h5rxey3e190c8ep8rjcde0j2rz9g967cn1vgmxz47nezonnp3dovpfmfrk4v9jcv59zmifdirwefnfr4pic855s05xpujz7rv0wldr5kyqmleep4vy76weyxl38mn72jk2xa6q1q4g2663ypib4vsj3tyj95bl4l9r5yyc5qvuaj',
                startAt: '2020-11-04 12:19:55',
                endAt: '2020-11-04 20:45:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'vcmrgnn50evr7tkqz2tv8qubikucysggczig0s4usud2zyhxf7',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'fetquxlbo2wp3m2b0wp3',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: null,
                executionExecutedAt: '2020-11-04 05:12:49',
                executionMonitoringStartAt: '2020-11-04 03:15:08',
                executionMonitoringEndAt: '2020-11-04 07:05:46',
                status: 'ERROR',
                name: '9ks999f6qceev9yxz17ipod992s1v7zjf4pblf18x966057v7anhs82hfnclfa6qxzuwps6i7d1256dlntanm78lq6y7x4q9q9b61bz4uz9uqg4d4nn4gv0mneesd8ytidbtqbpwzyeopw6wp6i2xn88yiuw5iz68yv8b4ca7n69o4e1gxb8s1pdt1nkfduqsroyw3k32hmrvzzbnxt6hrygknuzxt15dm2upn5ml1hckqdlltw0552kh9pnt56',
                returnCode: 5984417734,
                node: 'atxe4h0o00o9k2k2baayzvijl3u22mu24lq86r3f9ho2go9t1z0mmwrlauym9r57m4iyswcmxzo4pnm9aog3rpej4x8gx3swu2cc4l78iuh50172gefgmsp2qqutfiq8pjmfo6dpmvjsdi6d8ckdhq9lo66pj1xo',
                user: 'wy8xmwr5nqz2gtr2inoekerbgmf413tqm0u224j4fgf8pueihr7gjsde13x1261tv1tsyfp0msl9geg4vi58rmmrftlqk4dc6h0bfg8lnscjssdfcnq5wnutcdi7teh07rpulow8c4ilr0rkw9o5496cctqsm3379kn6htl41une4i6utb5vnst8i1rofinv8l2fjla3q0b9567fn6wqcil3t821joynz9m322l3nan1h570u67xqumr010708d',
                startAt: '2020-11-04 05:09:59',
                endAt: '2020-11-04 05:00:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: '65205cbtzwt8pnqq0ftj418on5w5davbotezn6ulifk3qu0wnd',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: '87fsijbj1zrqh7dn9m34',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                
                executionExecutedAt: '2020-11-04 17:39:44',
                executionMonitoringStartAt: '2020-11-04 20:29:30',
                executionMonitoringEndAt: '2020-11-04 17:54:20',
                status: 'COMPLETED',
                name: 'qo0s32rkvqa9p42ziy5fw0s6dwwqcc24wngz2panku2j6cpbdgipq6l7rcdcak24t1qo5l2q23i4t2zt5nlpfdt2ry1f0ijuzrpn8njwrhpiiqhvixbummvwquirvuitao11xr7w2b4ubduuj8fy40899dor9p0br2dn8ajt21qvups5182xwphqisdkqrtiai9kwo0evni77pwcwqq9j1znzymamsv47a62ref727m16huhz9chb6pfd9qca2u',
                returnCode: 4126653192,
                node: 'la8ai5il08s1hhpeyo0exfxol9uo6jn1vkras7jbee87uujubqok99v218kjw0d0dpkgbo817c173dkes7lehsrw1k8y27mn36wjq074d2rtg3j5kej7uig5eqgb69x8wat4jqfpjldsnds36p68hvykyfuwt7w9',
                user: 'hpc7d4olmi406k9sc9ce0stobxfflf93kr6bzjimy8skagbexk9jc8qncji6wpjipnmj40d7k50pon4lmwc8o5id5d9c1dameb84n3h0jnw90kvxrhoan3xk5um93bs3v3quj0s8g67xcuc62d89lzdz9iffj99m5xb1zwwqqxbqaf7jxpsh1y13f9u1b104vc0ih9vmszcbo6yok0w4gb1cupxt0fql6r09qh9xhitgygbl9soufpacjdlkdc1',
                startAt: '2020-11-04 18:39:11',
                endAt: '2020-11-04 00:45:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: '75w4a0zfkob0edqmg1dkfekuymt607atshm3g5t8y4quegxby9',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: '6xkhsglarr5egw60axbn',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-04 19:32:23',
                executionMonitoringEndAt: '2020-11-04 14:37:35',
                status: 'CANCELLED',
                name: '974356xbt5rstaey7te7zrrj7ndqb3qz8ozbgh3co8k0xqg3ypea6wnj9miuajylrd9ngvauau9w2e3jvgs7gtd1q9dqxjj7it8eme91g7z5cqsrpg1ywmfqq50ia11s7hg9s48d0wcc4r38mvb27tsd9920ya4tnlb8jlx35u4zksndr0knfgrozy1xwzw01r70f58esp3hneoiw15ml47fydv4iokfwv23u4lxj9ttqqclce8xyf4cs94nrqg',
                returnCode: 8166410776,
                node: '391vif9n9bsx2xfrt1rm5qdsj3brtto26i8z53ugesnv53yampgoezddsj516fiwd46x0wg7zhvcbag66e1i53ajadxxc151yv28ts58hkuj3x6zygsu7gl5f6fiye59zrch849pj0ptm7d7q3769eqqh83ysrop',
                user: 'xznt9t694z1o5g36td66r21z0ebxwo8biy4gtbc54wntdofy36xkqb8gasr6d7dlledzpt1xfz05u1q9sj092k8x09mlbllggwicrrg50znejc2uh4b8y6x6ad6844c0lxjk8u4dwy5tlp0rsk0uwy032aunjdo7ll6bozto9wak13udn8jw6jxt7gz1opgdtxv63c2hnwabtxv52ihr6oi9amk9980ev6n6wm7pjjuo7lxhmustn2z3wkepln1',
                startAt: '2020-11-04 21:41:29',
                endAt: '2020-11-04 05:19:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'hq4ap5lfl4jt3f5nrlgvgga6gd9an5o4kbj2xz14ljdrbkg9lb',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'ajp9g8wc6ztlt2es13fu',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-11-04 06:33:01',
                executionMonitoringEndAt: '2020-11-04 02:28:30',
                status: 'CANCELLED',
                name: 'y2po5b07j4v238hkflo8pcf9c68afvisrm4alsblyfzcnyfrszrgty6ua2x13n94e9ijrd9ij9hl3au8vprcesvawb9w3x9xg0tbsuvo6iks00apwxyj922wzj9yyp3y3zvp0o97gbvbtjwozkv9nbg7ol5d03vfhclp42n6vdkp6w03x55lyw6yqootnl853nl7ks2bqq6ms0q4edl8qk8nz8pqwwjr0o801j9r4os8p2ysyyvkixn3l20ys2f',
                returnCode: 3003947748,
                node: 'wc780rve8c8omnz7imy4u8dc16i4dt4fd54wla0682nj466vz3hv2rn2wu6c1yojx190zjkfdn652ev3e9vxy8vcby2q8iryd4owc3mgr75ro47uwoeg8fq9tf7hs05kdjefgcq06vt4ou9my8eaxs1qoegqvmep',
                user: 'tyymuvfl0bc3tnk06246dp7duvgyqxu3ygxxpaqaqbn4abc3d5b7efqzi7wcdg9ntjyqzxydart07xasgcfe0tgpw3zzxahapl47jytbw35s4matn4fugx0sklwlt3b8h31xsy562rjqdocnzvvy2enym58ouhp0t6hp7hr6gf9h8zb7mmiwfrwbzolpg7en39dao3mqjkd8rxwqrsgjt0ow2lbpjg8iysaczamfnnedq05dadjydjssfig7cmj',
                startAt: '2020-11-04 07:39:05',
                endAt: '2020-11-04 05:10:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'zu2wdwgm8ktvqzdovht8ejqtyc3syaciuc9myea3k5fonskz01',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'ckgp98aexdq9xvlycvgp',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:55:24',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-04 03:04:40',
                status: 'COMPLETED',
                name: 'i04zhjczicbdfafv2ubszkaa34lui22ekop93fs81lmiv5htfg17s5h90xqkrgipeo43ygcagdc5ev3ivx8hlk3gc1f70z8sqria51sw7gr81yswp39u5v4kzwuk3xy9voxfqfs31fouzx3i6uym05wlxvbf8jozgwwyhtskn0h80utwha7udiswgg8cpnj1m9mn8jd4vs40toao4g9xlue9r5puduew7r031t3tatg8ok8yzaw82aixejj8ufz',
                returnCode: 8855648335,
                node: 'bxxc36mtssp8xik3wbggli67aeys5nftdxpora2mgy8y3kdz1mb6az0a6fcva4pt97tegr4vo17hjadelw72sxdg7eawwvwyjwpxam95my6kcudx73v7z2ogr2rrj5vvptamrujvgynybv3z1wf0gigfj9pvg5mf',
                user: 'vc6brqr4r626l84qomdiv5larunvx939ao5laa15qgc56h3mkios5v75wzlkynxh8ychoes4pfglo1l1ksy2pllwvyd85ejrked0967jtnmr2ukwgv7tfy7w0jifkdww08av36abc94shyzkxfshrpxshcnyhp2108h0npfm0x52nkj8wfbrj8b94n4eqlxpk501c09l67mob82t14aoi9jwbngtdnxk9lj3n7jp8sgvluhdhfty6col4lnta8n',
                startAt: '2020-11-04 10:21:18',
                endAt: '2020-11-04 08:29:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'm2e11lebobap6ihmzt1d0oleuy7wu2aja927urq00oji7867gb',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'at8rljf4njouln9losrw',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 22:00:46',
                
                executionMonitoringEndAt: '2020-11-04 01:30:29',
                status: 'CANCELLED',
                name: 'pv8nfzd9zpgex50haert1woj6yhyzbmym4xlwzemzocbd7mid5fkjfctp17c147eq5ub30bekrkv9eiz9zajkza10040t35l3g87a7wpr584ww6rbsyq422mvb1740p5zcu6xvz2bjwe7x1t4pru16rrwvsrx3aju69yn7v6mlkhydvw2oz1fb4hmkoc2hnsisej6mx0hqoitl3fl9wucv0krlhmcpdq80m66yasp7bisru671iq9m9az52y44w',
                returnCode: 7667713391,
                node: 'zvwbj3uo2ud3z5sqqodd772hgokniohqrc9an1tcjcrpe4c8k4v99c4edwh1tgnkkr9uwx0m0q8q9zz28yq20na4kqa3325plhi3kbjdug0f8swscny5ha1zv218sh7p206rsyiu61lkddqdq4rqdqni7664635s',
                user: 'b3hajzj88gylc7lxw524ynqyjhbgtra543mljvoi1vgee0bzterqyselgbbll8xxislfcrh9wueoiddrl8mwg1wemjo13np0jp8ib6l18a744zhsj9wj5fdrjjfajk704278qq0yjmqr5vxw82r7ucj1fofqgj98ww0bnhmyvjc08gchuiyj0urfzj9zchmrswjwfb8utf3tk0ilkjkq860s8ggzr45snl7p0crgc9fogl7r6q26p3tu1n7xx8w',
                startAt: '2020-11-04 08:59:54',
                endAt: '2020-11-04 22:44:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'w8jdwzzxkgfgswdj2apkk61iqrywb0e2cs47qc2lddqd0wfqwl',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'z7m4talm05yhe6fgi8fu',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:30:39',
                executionMonitoringStartAt: '2020-11-04 17:38:36',
                executionMonitoringEndAt: null,
                status: 'CANCELLED',
                name: 'jhm19evdc9m3va2rnrhhpjy9jqb22xn3jyyrrq9yhn5ixn7b81m42ce7o28kjzduim6u9jwkhliebktgbisezupg98cpqh7tgsxfggo7lfoflzphin03jqsy1cnd4t7n97puj5p5i2buoiwt8ip32w72jiso6nnawahnvp56va2b965ny09glkx1zxd3bhegxujkdkptzh70plwd0yflgop0azd2wqoj7tigklwznluiq4ec8k9p5k6suizcsyr',
                returnCode: 7087822555,
                node: 'tfnshkc91l1mez1f4agtbu9k4hthrt186roalcxfxkugi0w19xak3aj1br17wn74gtk1i9o5ltwco0p2o8rnpl4m57xrlyckeyct7a4yjfqwboiuehrsrus3tonodvf8qnexlcoz6blnkgztef3u6jtpn3oenfbe',
                user: 'hettcfs0fcs4z6xa7jc8pb5g7dpvatjy2o39k7m81gaayomtbas5ykoreqsiy5ss4t40021yvsy06kzgz7wqphjx2f6fmqlftn6ndv1acj3pi5fh4a2cs9pcg6nzja8s08hseszb0ok0sa5bjjts17w0tgyqm05nr5miaiigw2tq0jxemdkfaug26jyn6do2861hy1b3aiyb3xksv7y179b7q3vl5nvu5mlso0fsp67u2yrg5sv0zdxtxqsvxk3',
                startAt: '2020-11-04 08:00:07',
                endAt: '2020-11-04 11:48:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: '1wxvfcgw79dcljcafpsacugraa2k0p0fj7xqwr1pewg982eosv',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: '4l18kkk6b15sleups1zt',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 11:21:15',
                executionMonitoringStartAt: '2020-11-04 12:46:55',
                
                status: 'CANCELLED',
                name: '6zblll0ewo1w6c8y3vsm2h26awtkqg0r9ux40h2tv1r3ju19ze4045xil1qfbqrevzdh3w9cendjawywziduin61y46o2n5ln27w3u630qnglud5io90rn6l2mvqg9ie867fpu0ygmsm7awmshwwiwwuqz4sodk64pi2mxabagzunf6qc8jpss29xhh417g3jz7fjy4w5oc7idvqz9b6b1bjwssgnmgpf246kij0slej8l7jlp93q97dhf7dh4j',
                returnCode: 7333935693,
                node: 'bifq4iuxv1kse1exqdeshozaclhxnp9kgwtanrfy5yanba9kl5sgcvedeaovvr1oarqq8j762uc51fordrhfddm73t2z5zn2btz3qkmrge1q6uou6fz2203fzws207xp4ocn772a56gdiss02dcv72vpphybn7fm',
                user: 'rfl8gjw25zuw59f6k82ilxamr0vbdw07uwvivk48xw36pfzy9w8wx8k5fs6yoac1lzsiu84nphkc9jhkdhon190ikixfxnndzp74pl40awkq2n5g0k6dqlrso12gkgo8tclq55on3hx2d3ypo07tneg84x38in5hy43k1y0liymnkt4c5b2ct04q81k9z5liaqqqra8nn9gmfjx55phft1e5it5w6jac3chvvms3z38o7qw86aarxf7nab7ag10',
                startAt: '2020-11-04 21:29:44',
                endAt: '2020-11-04 18:13:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: '8mulqez4ajn06gdkomoe3n35dhct4x9nx1p6y9whobj2uxyqd2',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'zdrnou4yxsxrfhvmo0t2',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 02:19:43',
                executionMonitoringStartAt: '2020-11-04 11:04:31',
                executionMonitoringEndAt: '2020-11-04 01:50:43',
                status: null,
                name: '8tizhpcr59a2593zikskv5h00e0j9odxc1oym9qqmywsxuzpioradeq7ojhagczyduz36e43ovomoy6368u2l8c1p1kz67q2xj2hu9ejcsjl35lkotmkr9x1mg6dyee463ikwqipr6y815g6dx0z1l5ko3gg9a8go7l1kv87zrsa5xbu9ewehkleu7k1nt2kx6xjr0nrld45pwd4ix3fmzgi1qthv1dno2wjivykuat4sf0kucbz3r9vbv0sj48',
                returnCode: 3110068983,
                node: '0u4ehfyty934kocu0n4ru3k21uid44my6u6w1shtt9jlxv732j5628l776zy2aik4j4tg13h3lbaozxivet6bydtz2suuudl2gat04g9e0p66j6vhowk4bxuv78ea0cs390sey2qpk71fclczzt2k5e3830mgzsu',
                user: 'kpvbpzkbrgmmgm2lbk4x66un0yn2dufibxl5iifl69cj8uo4knukkkr209b7rkaxyqy94q7uagh9s4dk240g71f0ngdmrhq43bknn04l9s2yd17623xrr0bbhzevjelvs4nyppg2eau9kqxnn6owlzrl74972hnjigfxvcor77k627561jtz25ezlvrlcetmxnl7kwxsz2qj9nqtmcq6yxbbkq8o46ioaio0kqv5oisgpn13kjlqoyq2255t4ks',
                startAt: '2020-11-04 01:29:36',
                endAt: '2020-11-04 04:36:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'zsigtr7nd5rc9c4e52xnrng33au28007hw48qae9gb2h9mh87m',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'bld6437sb5knrfy156t3',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:55:02',
                executionMonitoringStartAt: '2020-11-03 23:12:37',
                executionMonitoringEndAt: '2020-11-04 18:48:58',
                
                name: 'h2fd0hsstf6jj0gjghy05faaxalyaclip2rb0rwens75i56e2ye4buhf2hy4pusooyn7wx50x94q25w6i4odp8rlp00ei5et6k0hadfxjs393gir3go55ze8g3muakh0abvpxl3cjh011o68elpqhgolb0ivn49hhyfw5ply5bwjla296etlcv8j18by8oo5wf3c61gl555hj7hl6ax3dqlxasom9efpe4d5n6ruqoo0b3wb9bzgasai7enl7q6',
                returnCode: 2744367965,
                node: 'ufyacfxsy9uig3qqisjpz10cg6pigtkcy0z636wxe28aas2746bmosy0o67bx0bdcovghep4drpsptjlhkours02kdyrunhta97grx10n2f39pbts7n842xny5a4znrmi1v6o874uoc8og6cq77qibhj6a72ie3t',
                user: 'u9ba9l4bejkppypl8o3yverff2y12r39gkm699i68eg8d881a1x7n5cp4j6iuwyxdrz5cvcy6kahy6avx4jpyotvn982s5h1yb9lq21aipllz60px7cn3rnvmwcoayuhuach0ayhs42vxg0whuzcuss926idhw3yogtfg3vyqqaqkdp5hp2dootga5mwows9upk48qzff1wb05mcq7xkyf5oqm8gij7viblxklth3173dm9uqfb9ssv5l4omtzx',
                startAt: '2020-11-04 09:32:38',
                endAt: '2020-11-04 12:30:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: '9r3665nmsq4bg8jpnfh1bjf4izabv8hjpvse4xt2be4dqhq525',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'w07j3nklz3xlhjs8w7ih',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 19:19:40',
                executionMonitoringStartAt: '2020-11-04 09:47:08',
                executionMonitoringEndAt: '2020-11-04 14:22:19',
                status: 'ERROR',
                name: 'yhzl4mnmhunv2vionuuuucniqgc0ptvdpljs1fb5e2wbe4mpu0fy96ekmzc3xqr2hjni3cj0u3pcr6itc4c4uao56jxeb9j7y0hxelt3kj0l9fzkh7jn5x9e38j285abcmhzjzpwz8i5c9cqaj03bv8eklil3smcfrpb2f1zznbxjvfnoglyovwwcph5wp0vek45dxkyoxwvf62g5pb7g7rzzeyb3dunyh4f8pl0hbexnutb7gpeajui61zbbkx',
                returnCode: 7976287976,
                node: 'cxtemv7fdp85plqq5jxp1hgcsm0pgz6gvg9hahx7lixcjcuntait9qlzmdtg4xkf34bh7omirswx4v11nmrvydvoifp72blr6jqi495rcb79f67r73hl7m3fl96fssqtskdtbgouaxy8z9zn9wwgvnuxr9rg220j',
                user: '5kr1r2zw74wvpi41qf4tv2aioielcsuwhfcifw0jmtroidqg2m0ubz0k5u5jjwmi23eiqswwf2ggjm37psidk4vuya2evubi2umh24ju85koqxigx2hxva3bglaj9b7188a228x4gtqfrbpjjqx08dae5mgww61vuw59y4681829hbsmzsb3e3tz8h0hh2zlrx571ad5tyqlgy2iochwdtbsvchpu0mwggh1qif8nd36tnccytz2xa3ykv0cgnv',
                startAt: null,
                endAt: '2020-11-04 03:44:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'h04azqthlwwyjfypbrgekg7opmdu93bkre2m1gyf8vtzszdv5d',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'f3lofuq9b3zph2qmzul2',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 02:33:49',
                executionMonitoringStartAt: '2020-11-04 11:45:43',
                executionMonitoringEndAt: '2020-11-04 00:12:48',
                status: 'CANCELLED',
                name: 'djmqdabkn9ctj2yr0w6cmyv1w8nigxab96qjfhaz3cf1voe0vsktz4aggxql2ci34loo5okmxtbjnh1wr3lrcnujxcturfoksx8osk9l1mgoqhvcksa2d3ovntf8tz9hpiopf0j7y83vtfl8wgb2fvofdxirfe0xnksliukp9pln4en1vy6u7xkyy96lx80yyuyrjl37bq0y00c2npuvaeq7cgws9fb9dxjm28osy86cs2hs8xnftl7989aa425',
                returnCode: 2593763275,
                node: '2hnx2klifxm06g8mlx2je9pcy6viegzd8keztjy5m994hcf3mmhtunm83l81iiq3cxlx8fmnhfjoboth5xsxszm88yxmjcuhxwlbl0skzzk99q85gqqczl8afvoevylrc7tf9xrrsaus3c0sprsyzv7a9po7i9cg',
                user: 'm02c4phnncz8x8ipdlvjjmgp7xktr8vzidhmip3ydyn62d042vzcz5fvlwnpced1okt7cx740jwt89h9yq3n72kq24i13b5k5wjuv5no9w2yr0d5u5z4gkypqz8s241zru92lsu3jno6l9qog4o94l8ah1epegz6anvmc6ltoj6wx0y7nw8visnkvscduy5a8mtgl5i1o5fyo9rd4zcnetei9vy3oqhnu6y2v9ol751r9wdfdij1irrj76gs4xa',
                
                endAt: '2020-11-03 23:02:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'nk4g5t0nqx7i9ctytal4czpko4jshl9384xgtzbl1c96jc7x8l',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: '7hnfpsga4tkq4kpzi86g',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:18:11',
                executionMonitoringStartAt: '2020-11-04 00:43:50',
                executionMonitoringEndAt: '2020-11-04 12:01:46',
                status: 'ERROR',
                name: 'bhhlj02rlks5yhf5indau74840neld9fwo9lod9evcz6p7vy7e663e2u6c94551mcjuw2h5gx2ssnea2sakazhj4pmbm88lzx0g7f16es0dyvv74a3ijpitnfoe5eixd8iykaltfhlm9yoz9mje1560xx0xcgjvqml0eyhluqghoy6n0xh746y4ciya5u0hpcpo1st2i5oiqeiqmbwxcgj1cegq2x1a09mfnv023x65ioxj0554o6wmq6jl94ey',
                returnCode: 6418570252,
                node: 'qfemwyjxvpqoctf3q4bzk89clwd7m8ha0j8awo1mp7qss3sloj32pvwskv32zg28ojjgdki7zinlrkwwdx4cwedfmb7njptstr9mf92wkgc362o7mywx1x571yb8clqomj29e6wln0boo3vleloboqmvbz5dd9ix',
                user: 'd04uxrqntynyg56940gouhs7h47dumwsiz0zbiownwu0di4wadobluyjvw0qr1t62vxjob8f71agp9qt7kuffo8v3nd5f0l1rzms24q6t5vc6c9shx1s65e2ymahlh9euoqza6uxlia62gk3nlazl8qr5mdgsxn3z8fim3f4yzinekzymarxnxz5l3pfihx4vm2ejjxul7m7e9ix403c4i971hv1l218qaqa42bxhgr8skfekm56nh5fsuxaprw',
                startAt: '2020-11-03 23:52:02',
                endAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'sdbqgc1s7qs9yvp3dtkmgcj766lq3qmufyz4zan5hn5avkmm2n',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'k5t2x5appiggkgc24y70',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:10:07',
                executionMonitoringStartAt: '2020-11-04 21:38:35',
                executionMonitoringEndAt: '2020-11-04 11:08:27',
                status: 'COMPLETED',
                name: '42idsiylkxs2jpjeftn1z1kvamfwmjezza1u4oemuc4oe21pzd8p8nfruvtpu8hltf15byf4v7lv5dc7jgfhlmsiyd16z04yxn0fy9rtn2p7tw3sa3hnd8se36opij2q68wmuvas9e8l1jxrjl1e4rt4zpe706z6nlapipfm36922zcirrz36i8e8kffezjlt162op862anamcs6kvdu88i79jtx8t0mmyu3f29i6f758qf8yggvyho9kjzfmc2',
                returnCode: 8811154642,
                node: '54pv7kodtrzacy96wesjarmgekmhxfarz4bvh04cdcsmi27os0pu8oeipadpytyb9icql3f15dl1uhz01lwyuceuwbq1adtvhmu9egwhbh82wzcv0fj2c6u5kwuqh3lo4a19mvxi37wfjfoh1htwvz8u9z9du4ty',
                user: 'gctxmvzc12c2edd6rhtbdw9rvzgc6nahxqsjs78s32jxr01a0a8l59l7cvsg8pzns21ric6daq826o02re7e9zykhpp14c4z86ixsltnmxt4b5b646kd8d4udw9nmglm6d1d3jf397upeeoi9xfri3nhxhoslzim1uw00xnf6g6tdzy6kzbevgqw9uyx06jdc0603g9u31jid8temvmiup6fnkdd015505uudlo35g557rnh9038fzkns9xfh9b',
                startAt: '2020-11-04 16:04:17',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'sb1tp9dovvlmqgcrida8nyq1lf222fkrz3ybw',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'ydyxbv11j3tfughxn7h7v6i1xqph5ft4pjhimfpr4on06wjlir',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: '51sj7wdjhsbqdz7r2onw',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:28:54',
                executionMonitoringStartAt: '2020-11-04 21:54:30',
                executionMonitoringEndAt: '2020-11-04 06:38:04',
                status: 'ERROR',
                name: '4ibhk79yi49m4pcebzh9ltu256dgjqmht9qvc6qaubdob04pvqrhih6oc9pp7na79sxl1bokz3w8dlx9s9uocjabcvzil4apxt336onccso70ykfanbjnfeygrzl081wqifvnzpg4ph5nyb8psesd3s1uuc2c1ao57u80k8yl39nswbcevyj5l9y8tiioj72h1z6azwk943079ol37glj1ah0xd7nhec1yib53f0081yyjldpdxu66xynygxxx3',
                returnCode: 8197097390,
                node: 'ahcz2dix292r8id6gcnbp116jdbrsifykjzx3lvd5ffusihbg2wdd4akoj9iwtex5zue74hn0005ubqc5hgbikfsny0gwqa4xzqgfvitugzz3luy7nhwj89wk236jwai7uiz6ic2xwjnqeuv5c4chzvv5e2fx8me',
                user: 'shhea2gmiuwjf4h3fqj7xwve4zoj4cdqaccxruej8wlnhhv393h74m6vox920ydyr563eupx60y35v57w4ivnxmaddzbf52a6sidc2bzjhcqj1638yjnxkjz8ip24ck6qd8efadg07qd4ww9jydldy58g5w7lob8av4tmp5mplo29guiqru0549yy75rdk2ifmw8leq0xmmt1txzp2lvscs0uz34hwng4mui1cha2vdm9qq7mcyhqud0ihf4swi',
                startAt: '2020-11-04 02:39:18',
                endAt: '2020-11-04 06:02:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: 'h2b6g5vjue70hlt175m3khhi1fi5hoyp6qhbu',
                tenantCode: '9sbjfeslc4z0dqncqiw1xd4fb7sb2suh2002kr8f4axv74r1u7',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'k03ammse0mvzjlm99b83',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:02:20',
                executionMonitoringStartAt: '2020-11-04 17:37:06',
                executionMonitoringEndAt: '2020-11-04 19:49:12',
                status: 'ERROR',
                name: 'zxqrjuqufum1wbt35gtxt7nylc8n796c2rok2s8o1eklzgnt70addmuqr4br2uq7ami9a2cgnbn879rb2bitapz4wnrafxu2fs8bpxpb76gmfnetb95n7m0pnpm7xibm6vd9e5qag0gnqu9jy9jspi1d3hh3ietkrjcvzsyz0j8y9xo1vr7q6rx92jr91mvfhbr2xno413kseamu6n6x4hrk3e8xtr564bcrlyh49akghxbaf5fj44y1gw3y8ya',
                returnCode: 9303533272,
                node: 'jdmv33m16ifqtnpepejex1k6gplhictyw3hvbg4z5xsiqy9zs4bhdnt3azsyjq2bm59p5eymnsdq54b8ag7pk7wi2v1cd8ciped82l2xkraex3q4vrhcik8gojyzlhi35pbvbrbbj3j9dzv49pvrgg8rcs856axp',
                user: '9jlr4qyvbwk40fk9u8nbnwdkdyptsyusqkqgdla5l56oxi2xsqtnpc74al1ez736cdylic3fdhhp3kds340cy36ob4tkjfs9wqdhhmpxlbfn4uw1bf3re3vvnkjgwry5espnllrlvcr0ued820fc48tnt3np84plm9ismkxhnycqt1j9vcsq0ixi2iz8veelmmi7az886z1xxn9z189hhfe43bgz7arc9vr4atf1ag2hatpeshfj7pwundx5mdk',
                startAt: '2020-11-04 14:17:46',
                endAt: '2020-11-04 02:27:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: '8i3yzbdwvh20mawcd8xlmogakazmqgxoetn7pmxniyv1ap7vu9',
                systemId: '67jvxx24i8ai0qunh5bb2a21yqnkktg1tcagl',
                systemName: 'mtbgsnunxbzrsunbfb8h',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 23:01:00',
                executionMonitoringStartAt: '2020-11-04 01:19:18',
                executionMonitoringEndAt: '2020-11-04 01:43:45',
                status: 'CANCELLED',
                name: 'wve395jgjq0hl8a83xejbz9d3bv0g6ieemdtk6v9xyktp9pkqn65zpc46ayyykegfvrvytjtzwn5mc0aws2wl13khmpwwi1nvjrhwlmmxzqv0khrboc5toujvlbfibp6l5vwxouawd0aik8o1m5o32hutrxqutpewms30mcu4kps9bb3hcr8iuusom6u5zhcebw7dqax9jeqngrj0dczv7ks0jbk6pwo5m26pvq31nvl9hpaivnkwpka7r6fxkn',
                returnCode: 2492962740,
                node: '5exrl1a99q6cbxpe4qubscg05u6z5mb01h56dt2drjuk2s8912gpftlvpxvekkn7qs3j980iful2b1rnlobt0u2b6f26h7czzqjp6bqc41s651emvihm7cu3hpceqkuxadkcsa9v2bgbaiu3q9a408n6nnt69svd',
                user: 'xpu6l5bxw1cf7m874vywmzq2o1dropr7g6y75thxwy07u83dzcbav1xa2vq44ifx4getr8m7v9fdrhl7id62uz8ka8chpsr729g4ij8lzg2ade4t25ibjrscnegrk2l0zo6u9i6i532hxwgg7wjrap5bk5wsdf2dhjenm37nxsljtkr3rcogwnuyso5chj27077csyjqnxpkzsukc6u44jovrul3m89gebk0yei4txa0vaa4ieq7n8pszpvfx64',
                startAt: '2020-11-04 07:49:15',
                endAt: '2020-11-04 09:07:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'anmmtikmfs9hrsjzfx9g62z77mhns2zewkpq8ihv1q886utjyw',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'nzuifpm9wxksepa6fdg6',
                executionId: 'gbbfpbs5qadlxjdvlm5z3eked6h6xkapk0pas',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:42:29',
                executionMonitoringStartAt: '2020-11-04 12:17:01',
                executionMonitoringEndAt: '2020-11-04 11:23:23',
                status: 'COMPLETED',
                name: '54a8167e5tlmbpkyfaedd675f8y3e0spjxi20lfck5459hkwx4ffnzr8vm827fp0bd7fss4k6s9o1uwjf5i0lw3xwu7rwjmtimkc3w14u5phfybzocfdnqtwv1ab51twzsp3lsdkbgrx0yvmf1afd5jqkwvu3np55qkrnabq8ph0ussh3pu6don0819mzy890ek02jo48f08vffq5n4wxj5j5zyoew1hgpcqu2to2ue7gjny2rhk3cq7fbj8b10',
                returnCode: 6308728066,
                node: 'h6xqwli039famge4ges5k3gngoljk8g6g35bbblzbzeuq3vs8l60tat045uyv1x5lzus72n8j45vj2jcm0434c9f4bmz9eh5wj7af480dovbxx3pon5345i2d67z75v5t8u4nf3wd4fcud63bkc1s92uipj99re1',
                user: '1t5ch6gxi4am2dsktbkyr0msgmczasa107vt885y7m0oqk6chzhnpwbb3068xpbd25u5o13vt5zzxo5i161wxqo1eyk4fo8i2amhf5skz7jc1y5qzqvtg1l44ekms7shelbqzzvp0ngimxl9z3iezs2bblqbbsl6zyc22akz9yhfvm0zqi7ob3j7140656l8a0ovfg4iwwflrjq9j00wmlpqdo6ic23qzlahh8l0j27htqmwn230vzbmxe1owsc',
                startAt: '2020-11-04 07:59:22',
                endAt: '2020-11-04 12:43:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'cktyeuct2il1ukakadgf2tkt2qsbtz6xka33tq4heatxfkknz7j',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: '0nfwckivcr9n1gfhw05i',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:44:59',
                executionMonitoringStartAt: '2020-11-04 13:25:12',
                executionMonitoringEndAt: '2020-11-04 14:55:03',
                status: 'CANCELLED',
                name: 'ijado2wu0aojk0k7rnh37dxfe0ara15a35uykd0vb91yiu0e2dydfrjwlukvd9qt1ffovq7pkn58qbx6s0akqin8efxhk0rgc084yb2h9d1t0csghh2ds8xltln1l6mdiat1muz6u4m0vf00ws8zhn1l0j2o8t8js3okyn88peis7aai4ebuwhwoxxrpuzc45q2n0rllwyaf4bc6q40vzxsjr1wmlxe4bnnvmokasf60fbpjv1n2emv116hb344',
                returnCode: 8364572862,
                node: 'y3fxcj9bffph8qmhz3taq9zerj95uo9abgaml1snsbqc4iv2kkpci1fla3klg0r0042m2h6ypwpw4lwh9n90efo6adzkqt1w2d61na6f6siio9mo2irdpa4iobez78pod6cgn870wi1ezwthwmby4xzcmoyrdyvi',
                user: 'xbd6ih46mzagpq0x9t670j7207091ayrobs2pm83gswiuqjypntsgjoslo2zgprcx55c0oz4z1s639geiv3iw6ev71tvuw69fcbtuvbdptrymj0dcxrextsjmwzwvcuncau18ay42y5mq3b8st18zpr4mlqmclyzdvsdvr2zdipty4n6a9wg1r5grkdkcbqvfn934ar5lmvfcvsrpe1akrp0a9fbele6vmzpbv08gexotmewf1s331jlwhpzfp3',
                startAt: '2020-11-04 06:16:11',
                endAt: '2020-11-04 10:46:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'j00enj4jr5ljzcjaugdca43h7pq3qnfvwici00d7rps2kex9rh',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'jmvfcaphaqbkw6lcx6mux',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 09:39:41',
                executionMonitoringStartAt: '2020-11-04 21:04:44',
                executionMonitoringEndAt: '2020-11-04 11:23:58',
                status: 'COMPLETED',
                name: 'x3jcqumg409msgd8vjnpubdeqkedwkzf91ttsn8pf470j4mbuou4s2seivw9p1x35ia5fn8x36iraaadqx9e98szid3bbf5sqfiy7jer3ui0uak16h9mae7tj71bhkfhogicmgtxsofql73iwfy6yleyt82zr2sr7xwdnbn8w1dh7jcgvm37xrgxbx0cw3bgbjb4o5xm405icv4v2u0jzmznaigozql1eeaeww4uh7nst9wldatfeo4nl9gctpl',
                returnCode: 5716574682,
                node: '029j254fex6vd4a3qvgfv57gq1c057188mogaqsrxbpe889iyy708evssownt3jtaev4g4otb8ub084brouauckkm9ps35srywpi0e2jeh7xkegpmp6kg0ybetgvzzd0aiccdo1zd8ptn0k21nko4vsh0sa3306x',
                user: 'y8o6p1g612h1j2jk6dagq7rzk9u4tsw4xnossr0unkmvmbzvi9uhv5lbenq560o9zmso6hnmn421t6m0om8heey8k8m9iv56c61u0f4b0w9a7lteckp3wwf2c792hy4zubc8xnxezax21qlgd2jug8xk2n1ggg3h3qtckx0hhtout263tv8u6eh5y7y7muwyoxyuoxn0tp25j7kvkgchmnienj9foi9gg628wtxo7l5iu7d9d3ankwvygld7xus',
                startAt: '2020-11-04 12:02:09',
                endAt: '2020-11-04 05:12:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'sy7aj8bggjijsocqzits6iytc5j5rggtdbgu9rnjyo749yavkc',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'b8ynxxz24ieqi4fq0dyt',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:31:42',
                executionMonitoringStartAt: '2020-11-04 07:16:09',
                executionMonitoringEndAt: '2020-11-04 18:27:17',
                status: 'COMPLETED',
                name: 'uhlukiklejsbkkahiqtpeg7woch0td9ztmsmcgjj08xhccxnx8kkeulycxybpuy2raaf9w6lr49l7yhps2rh2v6h8insjscz08midhwx138h25wzxfz0u229019go7ztvu8i0a7th9bkh81wbq9tjen3fapb13j2mo3354ovmrfud4wslut7jenvb9y46vudrt9jz0voxlm97fcy8n1scobef18q748anozpmhmspsf85id6dlk6yykobt6puzoi',
                returnCode: 9914386234,
                node: '43bt6kkzwrz1m92rkfdwmubff3sfto3vj3okov89f7jrzb1veoosbuh739jbx7b0rrwsfeyq39vti4l9j8g2imzhicmzv1n4umfeysnrdl3f1dujgpmpd6crohasvm38vlhubh43vrpwnkuqxvt2h9dmhto23mr0',
                user: 'px56nwx4etg9s9y1wbx4z09sb9kvwx72olpzog6r2g49fugvfci3zwgjhyz9u90x2rxzkd4ccy67z3te4k558lf1afkbhkkp9ytb86itmwrfzjdvx9r78j4bv3uettl3hshfikox9okcr7d1yruxuf0paa71gcl2qi1hj3wkm7m2q3ot8hqeu5zrxf5lxafiprdc1wnx0vlwrbe37zwu8ovueui69dnb7t4y5gqle44pculu8pvrsbbc7i7fupc',
                startAt: '2020-11-04 11:20:57',
                endAt: '2020-11-04 05:53:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailReturnCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'p680cv7bmmg2myw8wc77a30snk5qnv8h3pghzpfeyfxou0umxm',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'h6iynlze4van1y9649v2',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:04:09',
                executionMonitoringStartAt: '2020-11-04 12:46:37',
                executionMonitoringEndAt: '2020-11-04 20:06:16',
                status: 'CANCELLED',
                name: '5un0o4ujigevoc5o4rfr6f3ybfyvqz4ygl7niisgo8h2zna93j6bu21eh1jzmwcjz86zz76r9x2l86tnkv90w9xuveco0j6v39ek5dhzk600514wdzu3eywoxvuhifivbkrw5ggnurixz21nwc315a0nkx0o65t178pg4mlf9l7cxxmy56ffdgoaxc8iaxi57mx150itx72i22ewvhqg15lsbxcnc3hxb97qtdpqjrx9u2dzzwjbqc3swgz0f7m',
                returnCode: 56925471234,
                node: 'icj3b9sbhhb0rp8pcm67aofw8ir3zvuonf453fqsrajc5b82mi791bqar8eill21b4y7p2kt5wbzf16wma4e6rqn09rb9ijpkbm0207fc4tjaqcy4l3q8s174go1hrj9dggutr2yye42gb1q9kjwyd8z5vivh38d',
                user: 'ojq3zjwdwshncicn80i5d748u7gby8tshly4njsm79ur5bygih93ubismmxzw3xb21ai795bj1430xif8026b8d5db5jq85fq1lugfxx3jr2etz7hnxbeamz7gxpplc3tt47eevjwbt7mrq6nduedd55txq7kbwttlq0gs4x9mwq5hsfbnadsnfam7lpjhc6mfgk5hrkuzhul1xelapgik4fo99kez41ftdn1usilqf8zkhnq5xpg9vojo6lpr6',
                startAt: '2020-11-04 08:22:09',
                endAt: '2020-11-04 06:07:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailNode is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'glv3mcbtyxibx8jp3xi7n5u9jph6s400ygwwi4vtmij5r2ht2k',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'l9yqmjqzlr83xo5ithyu',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 09:55:22',
                executionMonitoringStartAt: '2020-11-04 04:42:11',
                executionMonitoringEndAt: '2020-11-04 19:31:34',
                status: 'ERROR',
                name: '8ulyho4j3r6rsj8w2w5tuelnsui9lg6ntv7grvknull53yecbs2rod2mcvwel77jtkqkoaq3t7wq7adgjwrq7r3zirj483b5py1oajgyr2wcz06wk14517jaa7a2ups4my7kvyyl1p1enay6vqqn7tmq4d28qpyf5al1w9fnwl2yvqqa6q8hm4elvm6kn26kgsn9yysjaa3sa34mr89uu2l25kctpeaxi138lq9r06zo3rf1871hobnum07d5l9',
                returnCode: 7178899067,
                node: 'h068x4d9rtdm9veckc6in3v58oxvucz1fzku0skyh0za3o64pm14klyn0p964b38zenae36ih8tgtckc91hxwmqqxmh8rlmcp64m1pba0s8ukht2jehr3db27078aww2hbxoq18m3c7a5xh3qhyynowmuz893h2wi',
                user: 'h9bjqj5m3r4t9en399nrz59ksdxgoh3mzwsuzjlgkt8fcurndy79i6jqfiq497rcnll8ghcgjh146g2b0use1ictqzzlqnm4nnu60dws6wz0ho4xfm411w9yld1key1vyy7tqim674qucpfphiolalyqphqpmem6anr9azm4af65akj553vz016n47wyeyzzave2qivif1iav73urzty06k8v1ihul9z79b5aj87777e36jerwxop8vr1bgcuqb',
                startAt: '2020-11-04 04:00:24',
                endAt: '2020-11-04 18:04:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailNode is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailUser is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: '1k4xvco3t5h3aapfhksmxaem18108cdg6jup3ic8iw6a2adiup',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'rf8f3z79hxn9947nxubd',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:26:08',
                executionMonitoringStartAt: '2020-11-04 08:30:55',
                executionMonitoringEndAt: '2020-11-04 21:45:20',
                status: 'COMPLETED',
                name: 'sus40orzabk5jk40a7qr57o02xed6ey3zhxxwh8ahvthloekmuervndlx1sircgrvgtaa94f6ndrxnqwgdauyjviawj7vn8fhcv8nrykett94rotymrdr3dik3tb9cn0uft9lem0pbdmph7tmz2xo6n7yye6lfvs8bx5kn5v0qj80ta98kc3jxb069wcwlf2g73ck4y5az3o8my4581t8yss9zbqy5i92dmkvoo8c3atstlkynzbpr12dpevzi0',
                returnCode: 4669826288,
                node: '8xyve1qpg7gwonfgdp63fqr4rtpjwwb9aiozs6nue8gri2nl8khbjjc0fzyhw6hfwowzh4gsacv6v77v8m324pxeqt2yg05wo2gdmdkos0jprsodu1r1jou01us2yybzqmxt89x1kkzj6045yic3libkcicman12',
                user: 'xcxd3kpvh0p1k1w5hewocerikdr7tycta0qq6dmi1r6i4klnrnar0vqsnpe99gv8s2594clb9wvoe9d3x1dc972w9yh46wtyyok22v46j5wg7sshrgv1tzlv5sw3hsw8bxvgrv0nmmahyfqvm0brbejqe0debnupzla7txx7y0d9j6dcufawf9mjufytx4n5ohyuzos49qf1zxz1kc23kmhy5tkticz979skfo29bky974f88nsj88od9p0lwoum',
                startAt: '2020-11-04 04:05:41',
                endAt: '2020-11-04 05:21:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailUser is too large, has a maximum length of 255');
            });
    });
    

    

    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailReturnCode has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'zjpq8gmwq1zyq93eqp23os0marz0h35mdo5kon1o2nhly4fpuz',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'mpqyis81l4mm9krst8o4',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:11:08',
                executionMonitoringStartAt: '2020-11-04 11:17:04',
                executionMonitoringEndAt: '2020-11-04 08:47:56',
                status: 'ERROR',
                name: 'nrfsll15puoqw6622lt88h1dvte289c0ni4hffjcdas8zde670yzpoum6r4h5l9yt1yrhxubfhy01z5w3047m6y6ueua2pzjgpih7bh1ys2e7bpgte0a3h2iq6smizv3p1l9f74485ezuksev29f33kxgn10ov3pdowof89lfxhnd721jzcefjf9f0dd84mzudq5tuwst30ep5vgdke2xyqyo6trkm1euplvue8vfr803icr6jl7ahy4ii3ej4c',
                returnCode: 100.10,
                node: '1q2scfdxiaa6vjx1c69cnbm8z70opv360gtblwlo325zwidraieo9ybo7a05o6ive2zqj0tcvhszyapuevuk8oot5qe429xn6kk9duofd55sh4g5s70lwpskqxvq5tdfugtg4u6d4lef5ul4hig6g5vvnor5czlm',
                user: '0kaiekmpk8zhwn5pkuxvom3l8e1l2coxd9zgl58j59sp0iqfxxrf9vgyfk8spbe5d4kumzrdbhs10twb9ocpmarbf5xh2yl553hpuvgrbh4vi98p751md1culfd9k0m6r69d0k5avmwsn6z4e4hifbtlr5spuvrpz69ia02xip8ickhjygy8cve8s7eaksq0y24uyr395s6nyyc6ns291yrcch4cb1phg63d2yvbs8p3a4nzlu2jpnt0ccvrs4t',
                startAt: '2020-11-04 15:11:02',
                endAt: '2020-11-04 06:05:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode has to be a integer value');
            });
    });
    

    

    

    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: '9vg1kcs20d8gfttrulk4u5iar7tc1r0cjpbmsfmldog87bp131',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'o5zah2jscctzp53546f2',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-04 04:56:25',
                executionMonitoringStartAt: '2020-11-04 13:03:07',
                executionMonitoringEndAt: '2020-11-04 09:21:39',
                status: 'CANCELLED',
                name: '6q0qafg6ezceaio90jfdxhcs3kvqbrhmh02jg35wjr70t8d8myvaoqst7iyhxpm63gukr9ypx8jqaqwijur3abzyrjp24wez71hz45tvzftmcwsr263lqplgbesgtyp326hggct2brbssuxhl0qjf8t7w9olh0vgzn1lw6g26l5fndsnxwtu7xnls0a66891zpauwe1xuwu47cre8ub5cpr14iyarf92hlt98uqe1or632ncufsq0zprczjw4g4',
                returnCode: 1374337749,
                node: 'hxoufapzg888oe67z5cneg326ijr40x86ued2o8q7x8aqm6c602kbxde04hu24oof8o5hq3pmnldawvg0jul0acc3jeb6in29mwwkveo39tunxtt2fiaa11r13p2vbwz6dwmd48we9edurj2a6hmcsi46amc8uch',
                user: '6gq3wknqnkpfk2js1ycu0l8c4y0aptpgt75dbiwhm6k0whly0viyxw7nm6dhkv56bgab09prxwchns73ve3kf3zvxaitsybesooaj4sdu85dtyva9sctijdhfwxwy2zk2chkklan6i37ntrezjns3lv1szb8y5cdpi5u3brjqiacppltmrqp12viuj08qnc6uijsw4dl7r0os7c32s4te37sb53qb6zio74rkiivvi8jkxsf91ssdyw2syuc4y2',
                startAt: '2020-11-04 08:29:48',
                endAt: '2020-11-04 09:41:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailStatus has to be a enum option of CANCELLED, COMPLETED, ERROR`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: '6zpnhp3kmxxyztbd07lk5ed85acfg1fflwh29lkjz8bzg3czun',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: '4it4jcrhx27of0brs2bz',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:11:29',
                executionMonitoringStartAt: '2020-11-04 08:47:50',
                executionMonitoringEndAt: '2020-11-04 08:29:08',
                status: 'XXXX',
                name: 'yhguz4w0txhjkxmlkzamdk5rwapftseglsh69841n20j23dxythakadmq8v6excwsw2sao73hse9vzmgo0vgp6r28e87ajdoi4f7gno6tbifjyel1gyihb1folzpwylctd9d1h1dnta759ix0ny65l6wjek1i0teyphb5q1z454yqep6mvhn08qhz2iie9hw5bhh6vw8445totit0g55l66xjltjfdpdvflery08fm3ec5km6jx1ccrh2t7lzk0',
                returnCode: 5068128680,
                node: 'bdmjohhcssvgzllgviqp65jrb3cqa3ogrveq9gaqsgpg0zhaqnoa46drxn4lr6vsrw7yedi8jx9zxqbpflzxxzu99h1z00efhmnm559hn6cs46canl8kdfqn1xbxcxfxjhmr1xuyynoovqqy4arz4o92lya7razn',
                user: 'bh6vtdgen7gqrmtb6s2mb8jvha6eup144wky6rq06ckg04qghnslcvuibi3dkfy3wcykh4i32euvm7imn4oigmg224t4hvd2r7hqjxnmoorrr5mtnmmyr9a0skmg8w483bzj839du93ep58jyhjnislb7etwgnrz0f7gv0uwabgg6g1c1zmgb1fdhupe0lky6ysl54cjgtkh6765cyt31cfstup2akgi6zr7uloau0dv3bp2flxrmacrfiixea0',
                startAt: '2020-11-04 11:33:41',
                endAt: '2020-11-04 00:45:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus has to be any of this options: CANCELLED, COMPLETED, ERROR');
            });
    });
    

    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'xgycsqzgor1rjd5slew6xizuon7dx13rrf63q8xev2u5yyac4l',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'drus85ovwq5byxam6zu0',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-04 12:12:20',
                executionMonitoringEndAt: '2020-11-04 09:13:34',
                status: 'CANCELLED',
                name: 'fr6ob188z1s23iq35leyi9i0bcv5tc9ro9k307w2luk4tk393zdnz0yw5tmrf39w8f19kgfzv34sgg6jf4v8vi17lwumktak1k7io6v3yajsmo25u1p8b6lssr04gnxqzz8r19w1rmiknxu52th7mg9mi7z4d8merj43a1pyu5fcrjxdoi4eui1smklx9e7gkqa3ru906gzt9i0n039fxuzfdcdchzluxlneq3078fxmvz9kfvr2punnmq8k2rf',
                returnCode: 8507415922,
                node: 'q90lccz3xffpe2npgzhyhq7nu0na8nk5hk9sn89pajhebmh9xap2w9nhv8yw6fpz7lc0bhth4nm3ig9yr50ee9th2qgcean49z7zbcsyflridd5jaih2c19fncfg3j8tyittphsf36yzcummpc22eao3h0hru6xu',
                user: '6du8fgk530srv2l6bjhz94wtjgd66x67njfo95zdkq6cpft42ddtbicgz1c9fn28tb08gkvgln34jqaanqdpxgajf9ooe85s00dw1gxjko9jon4u4eql2x7cx4yb0f48gwvwmh08usmtae60ag0kn746sa5b22avnr22kc2o0hnau47nm96fajrx2kgfo3c9co9rrzqilynd069f8nt29umr5fgzhqzdnw7n4ptexye5yzd749j114es9nygvip',
                startAt: '2020-11-04 21:14:36',
                endAt: '2020-11-04 10:51:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'vt4pt3qn9wsyxijeue4j2aptbaolhsv8r80a1tan2nlei2myq0',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'tluafsruqbfsvi6qvxwd',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 13:06:07',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 07:12:14',
                status: 'ERROR',
                name: 'z8sleet8tg8n2076z7c6v9kg07vp6g2pf10b4i6hzm9joxdfb8bcfhevfgzcta7ww3hr1zy676gwevq0w96vlddm3gl2kgrxij4swt4zycog55h7ggmyp3apsdmzjny3vqx5or2n9x6m1krzm3avkq5frff25tgbo7qns2rjezibvf79zw0iwumwgfk6fhxlau0vhb70pvbg0wumn4loem1xwri4q7otfbuf8m9tfo7dsagyuuodid607wholxz',
                returnCode: 4632371641,
                node: 'winsebp5kt42n0wp8hhbjqbecwhjtr0b2u2u7mnxxa3xdqykievw53h3yh9t79letmbth8gyb3n2f0e055hgpkf0bwd11cyjfmjskia5eguampja0nijssp4v26vkqugi0copm0hrtc5fm33qgxk589i8flant0l',
                user: 'u1lz2a18tqx2o19gr11ongdn3rwubuvp25r7ccvmdl1w45m9w2bw054b00ld0w3p3n7eu9me7lksz0rlb5wpwr8khcd8f5ycx3lvxhldi2juoevvejxr8v9ulay1epdw19cgwj5gbhabebedu2vmthev041pstp6pkj6bv70prrhspdm1yrgu3iujia91qcq4acnujebymu8lmt1ahhm1h2r99o1iib4ryzm8tqxcbfva7fmdx24bfx1elxpm2t',
                startAt: '2020-11-04 13:13:01',
                endAt: '2020-11-04 01:00:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: '0iwf3d44nuu0ek5tw7w8oiq1kcn39fy7my9emgm9pfok1ofnyk',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'dlulrd9o4kdq5m1s74tv',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 20:36:48',
                executionMonitoringStartAt: '2020-11-04 15:37:28',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'CANCELLED',
                name: 'y78v8uj35iodscq9qkcddg9s8bold33xov0v1cftv7zbfjbx14k5o775pznyzi86e8myrj0yqhikz7hq14wmfxzjcymyyd7b403z2fkj7fxxokomr733x52km9xcr04moizbpr6mddlgiv013exipxcrqg8i7s257httzwe19bitmxn5vq1oiwv8c9net2q1x8y7405lqf9rx322ozkziiz1res04znnvdpg764hn60ssgtfnawxh56lxc17sl7',
                returnCode: 8342843497,
                node: 'a5cx1bc20j0t4fsbthmjpzotnby4dz541872uqg2sauo95hknodnpcog7fzhocnw05zmk9evfk0ky84cs5rgbbkx1sb72gcyqeqaer6vavn5la1vl7hxr0cysq2oo6n7o5z02oybxe3oicsbpcfrbzxnmcd2mvkz',
                user: 'k9q9snsuml22b70pbtbzacwy3cmxc63h7ie2j2w5pfz20ggeazan42sgx0kqp21nj1iv4khmnmmaa1hlwlpj0xz93gt6dxkkxdch0v1zmz1ht2qvulemu41wd7i360xp0xdrc3v9iqu3hhwkkls9bi9a4qvswjbirnzffns0le7816utd359k7j7idhpoc4n6y0i4xysgie3aq8a5z8vhursk0jliujrnnvxizv6wmi3jhz74nb8ouvrkmf06j4',
                startAt: '2020-11-04 05:17:22',
                endAt: '2020-11-04 09:23:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'z0oulr6rgqwvzzsdfsy26bukiedu87qp0exmdnpdto6p0oplam',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'tbniqxf9qlbu7b3tvxr9',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:11:04',
                executionMonitoringStartAt: '2020-11-04 09:57:31',
                executionMonitoringEndAt: '2020-11-04 14:06:42',
                status: 'COMPLETED',
                name: 'vtq5igykgbc7w64ii30ojefhc4dc1d42r5oj4gcizkptt774au3cqwpandrhvhwdg8au98lauxvvovn68q3pej8gjjjfrvxmkgjq30ipgqdc9z4lwif3983y7xsvb5npaeqowdh4tswk1ecbkwji1piej6xb5hx1u0w9yg0fb5jk3szaaickpqabtqptofjsc4u4vj63gsg4upofvkkupijkzgpejju53mv6x0uwarf5kw4hc7e6ustkssysbrl',
                returnCode: 1268434593,
                node: 'qrcb3gylgkggih3ndgzml62rfd5zsqy5yh1lb7hi4it1bc1revscp09wn38p2xpo44rhhgyp64y8chxrqkzxzht4pgwjaaa4ycgkponbhmq5fniozp524qjoeea0ymjk7pdk9gqtvki0powkvskg8gw9xacinlhg',
                user: 'p1hcg5kaopj41n3hmfa9hnfofaaxdlsz5ordzxzbsdkvmxp07bcrp5lndvxgtjf2b4e6gjyt76kfv9kvu289a6kwbvzhvj3z5qwnaqbxbz29ms1098y4rj42d0qs1qkp732uogtdgj48i58fkw8u9phl0pjzo2475p94b03bfr13bbz2ncdi42oy6dhba0dj7wde7rosf5e29iuxq0frcp6m4h8ts3h86u657g4zbryvk68q9oh2esc3hdn2d79',
                startAt: 'XXXXXXXX',
                endAt: '2020-11-04 07:11:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/job-detail - Got 400 Conflict, JobDetailEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'uc26fbh3f6plwybmtkpogxah6zcqhcy1aljccyee9owe074b6v',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: '6kj93bmsiaxn0o9nfgv9',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:58:20',
                executionMonitoringStartAt: '2020-11-04 06:32:49',
                executionMonitoringEndAt: '2020-11-04 21:19:28',
                status: 'COMPLETED',
                name: 't11zv0ampluv10bh4686u3q32su53edxgmht1zhi3r8x779fgazdwtj18kel7sypeau2ofy4g1o67rm9711xsek8ylgmk8s06tcyr4x2znjgtk1lxo3vw98biypep2fwf1a7xenbttg8avy4e5hauj6sjf35vvrubo6fsitgk8r96i2gjhv74c4fbrk3zcfsz8w4fo52g7qwixny28c3z5ikpn9yn6dbyof5yaaf5fu1y9yzzloch8dm5jyazqv',
                returnCode: 6013203194,
                node: 'q1ap5nd9mfode733o9xhonl0gae4ec7adlec9lh8d6m2z4yq52vshvtu0vkc0i4ytsevskp4fp211kel9zrkh573i7cno355b41soetjc3nmvn2ko97ca0s1wh3nlc3vpzyjf1xmci67xfti9bee8yt2pjfgx9t5',
                user: 'ra8k8dnmjy9d6xzd8ekk1t7ijtojennwup13na73iprmrqeyu4n34bh2hr4bmguwg04u23hityxvqmmux18po24n69ru3c2u9le9m3883na1dbsxp061cs5blst546qzlp8ix8hbtmr7b8znttuz1vnxhd1whdnw8kngigzn7xitzpqpi4u5wfc50uejkgd4og2irij2dot4lysoggabxal2thg7r0e82beuydfezkvvdeuvj7pxjvth5cmcsa6',
                startAt: '2020-11-04 02:07:55',
                endAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'x1jr7te1wna41fvm3nb2roac5gk6s8mjnihjwjqz013yu51kgj',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'owymste5xd03c0jrlbru',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:20:28',
                executionMonitoringStartAt: '2020-11-04 20:49:02',
                executionMonitoringEndAt: '2020-11-04 00:34:18',
                status: 'COMPLETED',
                name: 'porzh5uvted4wavrzwthcbl4zm5e9at2njirvkredv713k89usb7vt0xamay1l5g5k2vmhfmcps23nb8pvgkehfheohixnr969lajiiq2thk315fxh4je5qh44m26mi1wdqz0ays7xy68gygdanyp225b30q7cmt3yfnpfu6yx9521f1g9b7f4q9u15doui5lvu4a71nkzmppyynu3tead9vlaymots1wtouktasi4v3qv8tht7nnaa5m7gkzyd',
                returnCode: 6208127050,
                node: '0e1iwbmkuarkeix65p5o3uup2oar9dw6kpyg0ddx6rpsb1vvo4h76lgvsq62d40vl95zj5cb1dnu2dy8b2hf2hlqrscu5tnsvp6onzra1z60bvy4c55zjb8bmasbbl3sjbkh81whtwkxaeut8f762v2sy9vc1m7q',
                user: 'v474jeg72cv786kz2m4631axweyxb2fi24a70jd6en53v4azq86v1xgyeudb2zdc24m1u6nt137l3wkbkpulkzueow2202bevzmk37y8epft54jalta30409k743yl4g9a8xldfun6bo88uxt0wdlw0k4hqqoafkn0ysgppahojtrd6zch6z7r43sykicrmfmkb2c05hrwte97oty4snnx6bdvrxg5lqxrzl6cacslije3xqlwppu9tca74f1dl',
                startAt: '2020-11-04 20:34:13',
                endAt: '2020-11-04 15:03:56',
            })
            .expect(201);
    });

    test(`/REST:GET cci/jobs-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/jobs-detail/paginate')
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

    test(`/REST:GET cci/job-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '16232806-c990-47ed-af26-96a8eb16c86c'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'fb777eef-7f31-45eb-98ef-71b9051fb146'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fb777eef-7f31-45eb-98ef-71b9051fb146'));
    });

    test(`/REST:GET cci/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-detail/7d5aa38e-bed5-44a8-a5ce-659cf94a25c6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-detail/fb777eef-7f31-45eb-98ef-71b9051fb146')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fb777eef-7f31-45eb-98ef-71b9051fb146'));
    });

    test(`/REST:GET cci/jobs-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/jobs-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/job-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '5e242dd2-2ad8-45e9-b2b8-6b8f2aa49a29',
                tenantId: 'b22f69ae-af8c-4c89-92a6-9d61cc0ef5c9',
                tenantCode: '0uzg2mdot7tf422ct2txcb5t6d52ol9wab3870k3jqp6gyeblg',
                systemId: 'bf6067c9-c3c2-49c4-8777-54870917cc23',
                systemName: '3w3zf51cx4g5drc2zrwg',
                executionId: '4ed2a267-d1ae-4490-abe0-a7d838552f95',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 19:18:27',
                executionMonitoringStartAt: '2020-11-03 23:06:00',
                executionMonitoringEndAt: '2020-11-03 23:06:28',
                status: 'CANCELLED',
                name: '5p8zz03r9lrq3jrg0k1tiy29w1qm28zsm7g3rpjfczx0cg78vj8i3vtq0ow6zrkqz98u6j76p878f97sxyqwvtmzim2e8vofodq3rd2cexoc6av5agr3a9mmrghilpoqmo97j05jsggkmomc0jks4peltl8mb7ri4ecx90omb93hrzw8j9c90xp80f5swxu706zstm5w81ie0f9uc8ggrlgpkis6k3rvoa21xzm92xjzwjyxk41apge6qcc97yl',
                returnCode: 2457103968,
                node: 'bp6x6vtbagz3x466fl2m41tzx6wh7rigwmv45zap6v3exco8pe5unm8xd0gngfnth0uvm5ldiwb6ksg6fhxl4grp5rqh2cgbnpq7fn0sw3h97h0zsjyygemju6hm3lwnwovrs7zfv5rumpeuodej5f5nz5pi8jtt',
                user: '94l7fd2gedcok2a509b1xbsmazetxxfqkis99zbe76n0wyekq7sflvtgw72o9srl1h1z0u8wrho0c3agj7hlfm7j7du45gion7jivkrjjicpmmcq3hzks1452cpyk9kbjy4lsl5h5rr49a5ihjivul63tdllj9nqn734m9critws6ik1z1165gvubhk02o8rswsb981onhrfalm31jultey9gfiv6wu23m3ldtolyt5e16nolupxmu3odd3oz68',
                startAt: '2020-11-04 19:30:23',
                endAt: '2020-11-04 20:13:28',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                tenantCode: 'e7bod5ajr0htauc7os8gyhk5klrekcwgumy7wwts4yq4m1al8k',
                systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                systemName: 'q3z3i8jtdfc30hyox58m',
                executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 05:57:18',
                executionMonitoringStartAt: '2020-11-04 13:47:03',
                executionMonitoringEndAt: '2020-11-04 17:08:16',
                status: 'CANCELLED',
                name: 'hoxyamjix4yx6tcbp9o4zo91awdca1udrueiflo7d8oj4jap6vhmer680ptkuvxyqpgee7w4cucb35vlvzi23wms2l5r5wha0gp3y2c2xci1eu9vx0spccomsouzur88ap7fn3s5yx20vge64g1ij44bidr6iwbnr1t4o01whigzmrkq00v6ldil7qa0h8r2x3bjau982nkbm4it502igvgkgs31s8nb63keqm4d22brsezwrp1vx2v9hkgtopa',
                returnCode: 8090372979,
                node: 'r8b2q7gvck9s2ll2ocg2147r0p7druc7ejmvh9lvek6unqtjubog44fvlfenbvweejy24j12e8qdfyyyz2bco3cdxq2z65j5lilu1g0x5ubmrbc3bbx85he0yuuo2ky4nlx5cmv2e5dvif3hls3oei9hxo2ig3w5',
                user: '4vjn69135o1ua8dtkgolf129ti5x50k1kwrnu75oqkm8vja21kwrshitvm74cxhchetvi02oavn10zfd1a6ywe5q3y5anmi63nqgjv240l33pq9c820c5t2zkfykdkyy8e8o35y66t4rszm2jedjmfz1bic54w8hwm95p15w6zlxvajg89v733p0dqu981qcjzk5qw8ztk9pcgi762q1p9qssemooon4b8kr5eafzags20a53j1815qe43q6tok',
                startAt: '2020-11-04 09:12:25',
                endAt: '2020-11-04 10:31:10',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fb777eef-7f31-45eb-98ef-71b9051fb146'));
    });

    test(`/REST:DELETE cci/job-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-detail/1e07e47e-5460-40d8-a079-abec69088464')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/job-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-detail/fb777eef-7f31-45eb-98ef-71b9051fb146')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateJobDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateJobDetailInput!)
                    {
                        cciCreateJobDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
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

    test(`/GraphQL cciCreateJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateJobDetailInput!)
                    {
                        cciCreateJobDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'ddbb6cd9-7add-40e6-a0bc-8b1a23410387',
                        tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                        tenantCode: '6009u7u57lnjjs4awtvi2rl0mvtjsrq30dr3dcxvwcbrbyr0en',
                        systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                        systemName: 'cw009qwk6v9n9ufv9ymg',
                        executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 03:55:07',
                        executionMonitoringStartAt: '2020-11-04 00:47:39',
                        executionMonitoringEndAt: '2020-11-04 19:45:48',
                        status: 'ERROR',
                        name: 'a5xa10rczs5h68cowf7vy0upz3m8fxmsq55z06qs5rkkvrvl7htsiqqdho9jfl3sm1nar2zdinrxtd2ultnqrrn8cekvhu6wbf2jw24px14qg0nuzl23rmodv5f78ad1k8soe4ge27egctovgc5n32azqjjkw9glvdy6au3qu3qsk77pjdzjcjsg944uf8wzg530dyugw7au7qpuui59t3m1j4bvh9ybpm9fe0nkuzk02dqhmkuk0c0qxvih734',
                        returnCode: 2835233686,
                        node: 'opqu8r9q4qodf4fi0ovinhue81ueg09f2vwqiyrozy6iwo92c4nvlat70h8ldkr26axnonybknipl0optzgl0vbffvhqjeozny7rnllep2h9cd5s3hx97l8szrf4jkynkfm67ucyxrjvbth3awfet4kk0h0ns32b',
                        user: 'lcgqs3fd7ue2oz5gx1uzlsgj0bkm2bkxtli5q3tn2wys7opquag0rbrvsl2cznx9n6z6avkq7i0jkz6qberverq1m1ewlj4kkituzbyw60eluye6z1zyszllcbhdka3yxmju74xtkcke6lu84c7xaytqf3894frpj9rzmhn0b2f45vs2ja7ca3ktc5b9gnyvs3josm5b0c9segf7k039p9b6j5avls658d72ri4ifcmz75o4vhhbapd7b01d2su',
                        startAt: '2020-11-04 07:15:08',
                        endAt: '2020-11-04 16:50:31',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateJobDetail).toHaveProperty('id', 'ddbb6cd9-7add-40e6-a0bc-8b1a23410387');
            });
    });

    test(`/GraphQL cciPaginateJobsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateJobsDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateJobsDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateJobsDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateJobsDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindJobDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindJobDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
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
                            id: '8e6d8fe1-c7ab-4bfa-ac60-c1abfa8d1edf'
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

    test(`/GraphQL cciFindJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindJobDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
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
                            id: 'fb777eef-7f31-45eb-98ef-71b9051fb146'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobDetail.id).toStrictEqual('fb777eef-7f31-45eb-98ef-71b9051fb146');
            });
    });

    test(`/GraphQL cciFindJobDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindJobDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '694da991-656e-4f1d-879b-c14128269cd2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindJobDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindJobDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fb777eef-7f31-45eb-98ef-71b9051fb146'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobDetailById.id).toStrictEqual('fb777eef-7f31-45eb-98ef-71b9051fb146');
            });
    });

    test(`/GraphQL cciGetJobsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetJobsDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetJobsDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateJobDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateJobDetailInput!)
                    {
                        cciUpdateJobDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '0a83482c-ddf8-4618-a6d4-081f83d211cb',
                        tenantId: '939d7142-357f-4d99-a0dc-c8e232beb4bc',
                        tenantCode: 'gw9awewqoq7p3cujyglaob7p9686eqnrjj0e9kapvyznstgafv',
                        systemId: '7fac7d1a-1cb7-41b1-80b0-efdc2be255c4',
                        systemName: '86fmc58e45epro2dh665',
                        executionId: 'c2e25f8d-c93c-4854-a071-bd47a9b9563d',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 07:16:21',
                        executionMonitoringStartAt: '2020-11-04 01:43:19',
                        executionMonitoringEndAt: '2020-11-04 02:05:54',
                        status: 'ERROR',
                        name: 'ubuff0ma7r181icgics5fasf7d05koon1tq4emldtm7mrq722xtu1o4accis28fmaxntufgs8d51w2ky92vxk86ml6zoltg9qhd11xibbj0qoqaxt6inno7b0i7mhgo7x1o118npfb64548h79ep8g436b4nmu88odr63nirj8n55zif9ouulztm7mle66r7z2i292n7er2v5lmf0qowma2vz7v9n8ughjly2bpvq4zgufjcb1hwz2nv77qbdjg',
                        returnCode: 3830926719,
                        node: 'tsryp40b729lz3etnehx028flb81lgqqe6ir20pm64tnegkdu1cophrwe34mvi194xqfaes3zstu1sylbcn33qfozbiv16ze42omkiiwz4jjtmyws4sdlh3e41tfp82h0ubl6bk9a5o3a6eru996a25kxui6lxc1',
                        user: 'jcsg6klylq1liwy5icwl17ouoeuatpvqni1oqioclbbu8aotzbguwgxs4oqph2zg9ds31t40rozv53jojkl5dju9pf6tn6r36bz7vt53llphf90b3l9g6yo2839oca6s23p2at3ec4chtsoq6jwxzb9rhng5ujglgh4ljlw1zch0dc3vwc77bhhi0zbe9rdywvvtshzyi6prrabjrxgckpnk1lfya5gdb9grkcmm4re8tfb16vmbofk76grxtxv',
                        startAt: '2020-11-04 10:17:58',
                        endAt: '2020-11-04 21:19:32',
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

    test(`/GraphQL cciUpdateJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateJobDetailInput!)
                    {
                        cciUpdateJobDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'fb777eef-7f31-45eb-98ef-71b9051fb146',
                        tenantId: '08e5a882-e032-454b-9f0b-180199e7c3e9',
                        tenantCode: '1jh15w9090vqy3wga477zg44lu5l0ys3w71465yx12isa2sj7r',
                        systemId: '351a6e0a-5f75-4de4-ad20-6bc9d6cc3e47',
                        systemName: 'ro8r9s9qslyfhhz9zz5n',
                        executionId: '1def802d-aedf-4f63-998f-e274ac77e540',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 17:31:05',
                        executionMonitoringStartAt: '2020-11-04 14:50:41',
                        executionMonitoringEndAt: '2020-11-04 07:18:11',
                        status: 'ERROR',
                        name: 'mgsvcxkp3zus81ztpfi0jyco3pesmzb4yosnuz1wc5pac2ke7yyro45xil98754mt7t5htgowuypasvxk5mx0qklle53hb9izzur2zpjnipy8b3kqec1rk0011m6fb3o11etlpeh5i4a0iq3nxbi0v0v8p6erlrcgf4camdx964bds1gv2hugmha8vgms38rskjq2d4slwar74lrnfncgvduiyjx32jaqh8223k0nhxbay0fj8k87oox3dudjrv',
                        returnCode: 1172600132,
                        node: 'bvjyyirzi1rzftau10ap4jst4aee08n20jsvxobfp5f54z1r6wd8gcl9ey3vr1ug7weue0zguf1u8mr6ii2q4a6q6n520m8kwu42i7abmxmlwxgsfvx2p86j8abv17nmert07loq4ld4b6nshnl3w3f36293cikx',
                        user: 'd3jez40sj3vtr6haflx0y76i3dnlokt4n5jaj9009lihki7c7235a47gnmdq1v9er96odjioy1q702hjjhqnnub1pqgtjsuka44moudle1dvrk63coa8fligpyd1g1miea26yjyck24620excyh56aofhje6sl343sp5wyqczqszj5xoteyrnoxgp3xbqv4jwstprdewyc1sxn9liev25dif9p7lb87ib6y8xkudttxvs43yj1hbzte94784998',
                        startAt: '2020-11-04 09:34:31',
                        endAt: '2020-11-04 05:53:22',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateJobDetail.id).toStrictEqual('fb777eef-7f31-45eb-98ef-71b9051fb146');
            });
    });

    test(`/GraphQL cciDeleteJobDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteJobDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4222e90f-a9b2-4ce1-8972-dfd825b0cfe0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteJobDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteJobDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fb777eef-7f31-45eb-98ef-71b9051fb146'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteJobDetailById.id).toStrictEqual('fb777eef-7f31-45eb-98ef-71b9051fb146');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});