import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IJobDetailRepository } from '@hades/bplus-it-sappi/job-detail/domain/job-detail.repository';
import { MockJobDetailRepository } from '@hades/bplus-it-sappi/job-detail/infrastructure/mock/mock-job-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
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
            .overrideProvider(IJobDetailRepository)
            .useClass(MockJobDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockJobDetailRepository>module.get<IJobDetailRepository>(IJobDetailRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: '3u4vj68l16xjwsq4lzq695kx5uj97puh8alobkxflbo3b5sm68',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'z2k52ln31l5pe9tzkbzd',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 04:55:39',
                executionMonitoringStartAt: '2020-08-05 05:56:25',
                executionMonitoringEndAt: '2020-08-04 11:21:02',
                status: 'COMPLETED',
                name: 'j8fhrjha0jldm69rpx1krwo4mga8y1hsh2k2zm48td3ydvr0tr8fo0t8fnr523ff0d0vv8ntezij8ld8ebvq3frwqgwqbs63722a0pkpkgb9arkurte6gc0dh8x92brf4o1zjlaacqxcgqjfd8gb3drgtyyuohu4vme3ru8ybybeccfgx48d2f9ce19fql9bzercu6q98vsgk6nbt9o3ov9avjxqsiolbe37y3odigls6tas3rpl882viwdnb08',
                returnCode: 4980514709,
                node: 'lo9a842ghd8hiqja6cvj6yloxja1037xpw78xdh00yckk2o74bmv87634dkjvnqt1npsebxxe5iemiveyphx8sdbn0y83ni2gg8edf2jjbebzir033dy2pxlso4wngz13n4s6q91f7x6uj2gfogicemu1jml7j4l',
                user: 'iyfm1491vs4uncxi5hxpyc1jj0j9j5rj9zqceve2h5rnvzgecc1vmib0766pxsvaznicu4jfio2gg6mn5h6s9gwlirxcn7a5dw5i7mymvq91578kqgccf3bv5xxgp3j2fi5gr3ieozq1c4oru87yu0m5wn7edcrsyx9txoss7reovsecin53vvoi3gm20zcnupey50hykhhqupi2m37sk1mgs210i3dllp8oksf5xwcrter3p6p7t3nzzagbhn5',
                startAt: '2020-08-04 20:30:33',
                endAt: '2020-08-04 15:53:32',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: '123q932ewj9drj97tsneszviefiiml6wgy4p3lv9wp7h3um2ca',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: '1ygv8a9b7basifgfv8hw',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 04:38:46',
                executionMonitoringStartAt: '2020-08-04 09:07:09',
                executionMonitoringEndAt: '2020-08-04 15:51:41',
                status: 'ERROR',
                name: 'abqpd1mlnfa0q3kzb85mwatt7waur0gcrnl66g7t3bdgs5472pymedryvjerqvam6ucfwuwigu5goz3r6gpdnmnt6gdlokb73xgeyoedvuvqvydhmhpp802euyd9xcea9rb2gl7u1tos79c0o69cbirsk9314s08e95bgmzv0a9p7moh28wsa8oqf0o40zmfwf2epv8842vw0rf2ah4uadlbu1dzcavb2he6mwkmrkmtbeprhmg9z5m1mv363vn',
                returnCode: 4498964671,
                node: 'jjgw8i2hs2a4wxso1lvpm6866p179zywa9mbkwtmbghxeb8ebxhyb606js6mfaif1if9ukcq598d4h7350zg87mv5hdbks3qc2khpgb4l761q18q18hvfx3nlm7lomfwh2ppgeoy8l3pvmoiej98qhxtoqimr7y1',
                user: 'w1mmmcjpq6erur3eyu41jgzajl79j345ge20nn3i0fudsdfo1egdspwyf5de9kztxu4ie8ntuie20glyxi9kqtf27hncnvsbilj6fn06zwrfty33q3ffgtq9ovq81tsru0hfjvddyj38fcqu8o9zsue6j05q9v4few1bx9ui9m0qm68fmqvspgx6uebhxgqfvw70xvf2d2h78lf0f9t7com79slhz35g1ld1dbuddihwsof3ei29wl2yylavgrj',
                startAt: '2020-08-04 21:05:53',
                endAt: '2020-08-05 06:00:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: null,
                tenantCode: 'sllh4togsamo4xzyh74tiwg7877wi978bwkscf3jsc2ph3jm85',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: '54atdhl6ews2vjgk1fam',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 15:40:33',
                executionMonitoringStartAt: '2020-08-04 09:48:19',
                executionMonitoringEndAt: '2020-08-05 03:16:40',
                status: 'ERROR',
                name: 'smvg9kx2p70rgewo51oliv39n51mdtg4bhk4j5p72fs32u5q1b03oibmd12e6lft95q66eoqkjxe80kpvbzlbeght6ev3swli9dxjl302u3a56j6odlqbkipj9p9l3ltkij59395mufhg7xqgq65l3omrztccu47op79dxlwd4x9hser9r4g0ekwvwzb19btcmroebhyft4vtpbpg0lapes87z5a974194ko495bv7kz6mjp2y88wk8kewpua11',
                returnCode: 5772951248,
                node: 'uk4721c1zuwhyw2q1wxkyk42qvi37ij5p72eow7smsdg6491htt13knbrguxvcgo9g7g0wqjuuyrfow51l7wqp74fsm9yv6ahxf24e3a6x1jczrgcqgbf36csysomoo2ugam6i69oopj5bz3spd08cr1txuh2k8r',
                user: '2eww9l8u70olsqghd8pnkj9wa3q9wgf51b5n497grt83ww050whtpy8tljxijc99a9ij15lfszbp2ud1787yo9kj2q1fwqrfchkr5mtsia8zb1ft5pl2014fbd08uhaug9mxhh82mb84iy3zt3fb7s4fn0eqf7zazcak2vvqx9jrn07h67b55j0ynujfr0f6jb3qb87zcbi8spg9aqf92tsl6ab6q3v5duzkcnorvnun1cocugwxkayi11dy8t4',
                startAt: '2020-08-04 14:34:01',
                endAt: '2020-08-04 11:03:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                
                tenantCode: 'vuozb9edzkkpkt3ikeo991ucfvn5vm7gbqalucduwa2fspfivu',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'bjhh2f9nmnx412ek29zj',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 17:46:19',
                executionMonitoringStartAt: '2020-08-05 05:38:56',
                executionMonitoringEndAt: '2020-08-04 22:37:21',
                status: 'ERROR',
                name: 'n807o2kxbebr6h6r17ideg5zm1c7i6ghy31eeui2v5aaqtg12q0it6l34t5ejq1fb91pv0o2mdwuiu7pk1bzlzmjqq3gaxteuqmkja8a86rkshiammlqnk17ietni5a36djocmuu7wonlxn9exilk78o05wy70jrxm9o6t7a4g9ofdyjrafynnylfa8tcmv9tauhjbk1ebeg5t0r26oh7i3b3l5oqgewvx6861uicwljxreorks5jvrm2b964d7',
                returnCode: 7091117140,
                node: 'amhim0oqgoog2f60byjyzk1speqyvwoxl3mm30i4ev6rvr6x5rwhfdojejcnorosnih7frolee5gocmscqm9i0n8xtx562mtlrfkaqcmdxqsao05rljpgdqo4esqkh5izwt3z555rgu0mlrogt1nruvgs4z5gljt',
                user: 'r1vvwftb6o6vnj9f6zjrot4pa1wsocjfqmlyjsbt2k7n7sdjx2btrvb4eug2l5jwbwod79ytra7mwi04m9dx6w1z1d71ciwfd9x3baz12raoq7u1xhl55u8q7rsj6if3u9o24rqitew5lypby4ut1hbm1ka5x5on0ud06n1v65anrq0mx6aucjy2nfo6qbh5bk0nxwl1glcyve1b8s3x02euafoot1mv4p2g1f7k1ylgfzjvigeb1o995fyezh9',
                startAt: '2020-08-05 05:24:50',
                endAt: '2020-08-05 08:31:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: null,
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'ppwlz6gnxikd8j7z9lpj',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 22:52:59',
                executionMonitoringStartAt: '2020-08-05 05:57:28',
                executionMonitoringEndAt: '2020-08-05 07:26:29',
                status: 'ERROR',
                name: '0c6ho2qr8d1mx1k45ijvu9necn077zghd3s6q4djp7zogyruv51rvivcf5pe0q2k55mw9jfa0eww5817dni6904b74drvmjumezh2o0tikew6wchyo3b1pprj65jzykn3cvefi0uebozbj8xynx3989tbqh128zdrsowscwi4j79dw9wzu4rntxyfc722b4n9e8znhpv7hdo8qy8m9hb282qevqr5n7sz8khvovs9s430fqmhh2s3l51ezjlyru',
                returnCode: 9563658613,
                node: 'p1y9ahvr5p5pktmh723f2b6d0dhmase87j9lddqgnirgu2lth2lf9xtrim172n3bgaf2f4qh8lwny6wqzu81j4p4eaysla04vz4unthtdw1oi2hpt1mynsm815djyjcv79xbfg553txpq7z85v63ambc1l2clgtb',
                user: 'j90inayandpu88mhm31caoxbkbqd6e1p534n11m4y9zig0cq57idk1yzdcmh4pjgp4bb9h346gp3i23usga71whswtvrx0gaekw2ybtbtqe3nbccta1rjx7p8z4rybqkvad4egqm2ptbya0uuxikqf4mu8grd26ou1i1ugi7jt4473axl3haf2pc4iks5r6gjb5m86xv72pcu1373h8wyjs4xtswi4rgl8xc7f16mkh4xdgi5cfxy2l2sw4qxhw',
                startAt: '2020-08-04 09:54:12',
                endAt: '2020-08-04 22:45:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: '1tecf8ocq5om3q2muvx3',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 00:42:37',
                executionMonitoringStartAt: '2020-08-05 02:04:25',
                executionMonitoringEndAt: '2020-08-04 14:50:52',
                status: 'CANCELLED',
                name: '27zh70dmwta1qpbb6jyk5porzbrddl2ine267tgcm2nolkrwg4n11oainl0sj1uunklwgtmsysnac8pa8n1y95q2qiqubr801vzyzsroc14527qcurgmuqu6urcuahfr83dmftkeqwtyndhlz8sdvhw9rjos9z6rvzgfitcdpdhfbmem22ggfkjbad5q3r1arh1tcecj8wbwtg20c642g33ahax3moq9qnzo7439oc63mbratuo635kmq032hgp',
                returnCode: 6761973339,
                node: 'p232wjry1r44pd4511ib63cml750hgl6a717keqiyq2repo5y3rwlerkczuo93xbfucy937nzvlschf6jwjleyfrw7d0c6xvygeze2z0dqxepvbykcstr1rnj8mesl9hvmrc14t4i0vfmkimccwgudupc232773n',
                user: 't4nwakafyhh1971gmpncy55r62mm5fkvuvk7yrun1opr2sq9q9kh0rlw55j0irhqm2xfbdqcfwdzg7ssjyatka9skp8t9xmqrekcigcdzf6m5skqco68abbduoi70rfkaw50nq47oe8xl09wpzm2atasvmoqh1tpl1bxcy4zemqavd5ll5uhq0c1qgk2xttwz8jss9jj0sfb157pvot55wjrzbr2djsai6yumll4qt2lesdj8lmizs4dwa57aga',
                startAt: '2020-08-04 09:43:45',
                endAt: '2020-08-04 13:47:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: '8inb10lqn5n9rkqsss82zfnumpbdvduo5yvqa3cgv6if694ncm',
                systemId: null,
                systemName: '8gp5kx8ubmzuwhxc1vyo',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:23:41',
                executionMonitoringStartAt: '2020-08-04 14:37:54',
                executionMonitoringEndAt: '2020-08-04 20:52:04',
                status: 'ERROR',
                name: 'l3olzszb0ihxqzvgkfxp3wm1d14qjgt7wx92s9ihysdacndlo7qpezb0gzxvxsofqfzfnolba4n9eh9drbx0y17a1r65a7cvsjvpmwx8z9hibby09ld4caanxiqg4vwvnuxad6qysq2vuzsjtvt4dyh4uqsgingi8y3hqmn8sqiduimykqsm33mq0muwvqdh6993kw5evuxs2bld9wtchpbz16ldisnx6nmw6te05pyzmvieys1y7tbhxjcphvk',
                returnCode: 7468811356,
                node: 'nekmsvz8r4153992xffq5ct8e5prfx2vtnti4aayrri4wxalex588i2q9lu1pnohrozxzaa29pxjayy96kjmhxqgghbtg29vqa0prz6sjuiwx1lp8z3mlfe7cqueknqqwzbb8k29z3az3q5igv4lb0zfmv43g9oi',
                user: 'rgq8npubdih51sgv5k8d53j81mi2l4uzugnl404ri3eh1k1uoy8h1nx9f69vyi6pxszzdzlpch3vvoluoupdtwamqryxb88wtekvywwnu2kn0po0g730r88tv2av46jgc5kovvsshgnpaykm0ytrjdccbty6a5qoe10dkcze0z7lzyglbxywezd3vkpzt5wnmzrfmyuc00iqbh1wqbwffmh2sdqr17xx6gfwsw1in23gei6b0a90r2r859t4gfz',
                startAt: '2020-08-05 03:34:36',
                endAt: '2020-08-04 17:13:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: '3iigu86cvl23ekydsp987tovr0r9ef6shl8mn5ev45wbeicc7f',
                
                systemName: 'njzah41vck60oafsnlgv',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 07:28:17',
                executionMonitoringStartAt: '2020-08-04 16:42:58',
                executionMonitoringEndAt: '2020-08-05 07:45:19',
                status: 'ERROR',
                name: 'ft0z8tefgkz4hjs3c7mtom1e5hgi5mly387zb8gwp4vip9o67xtvjmn4lrozukvlh8200bd3v6zkv4is62h10djqo7irnr4mse7ou7m3fu5fh56hj55749ood9nk01hxfar98p7ejubh04wywt5psi27nsv73pmzk4sae4i0gd0g6u6my48zh0rmnazdp9chfibffggt1a64rklhte5wwjocyon9p63ahbowotcz0uxqk7xzq41ggqzxurtlzsv',
                returnCode: 1712684067,
                node: 'w3cgv737642pt2odqdaqfg6ff0459rck0mud3cp3zbri9kj4bf7ffywzm1m78qe1dcvwrkurxrc40yqz6y8e6q9i4cqkt98glpjggaywms1ju9tne11w2ta4pr414tde0wwjwas2u56ygr2472cz6eum3m5iw49g',
                user: 'f9t1fte2v547dd29q9lqpw5fiuwzyqwvbmsnccn0vrajpudnzlypwzs9clqkn9vr5bfor0mo2mlbcbol82h9ac6p7t2gd1sdx858tg652cykzlgzn9c9vxu1x3zbvehvhys11dqs2ib5obit75lr0zryiudhmqh0esid5tzawzznqy63wxpxe8zebm0r2qt0qpaskjlufwr5vd9fwst8tzil9yey97co5qb2yazn4xahle5i16ttbr2ln6ozr7p',
                startAt: '2020-08-04 15:06:33',
                endAt: '2020-08-04 09:06:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'xzhry9n25jrq5pgwkt5zph9ilsvrg2dx45mubhnkiwl01z97xd',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: null,
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 10:04:52',
                executionMonitoringStartAt: '2020-08-04 11:51:55',
                executionMonitoringEndAt: '2020-08-04 18:19:08',
                status: 'ERROR',
                name: 'ae4ycybddk8d5gs607ptzzaihcgfrz8atv13a04wkc1ofk0sf1hwd3jknvgvpz3xmtj10u25bsgj188115xwbn9rksktigpzum1in4vsvz4492vy299frqdh1qmc5xlz6k4gxfb083hjkd9s9weajkjq9aeeivvhi6rs4zuxora5pi7910t5zgxunqj1ux60wxau2yncopsy7xkjp8dy0gorsy7o6930tq515fmurwhvrby568uw6us2n6hq8m4',
                returnCode: 9898967922,
                node: 'vs6khfs15tfdxu5iq8nq305sd8jegnzw4x1wc3fe5tc63520bpa1j1oxc55y9xw1p7crko839bt6cxzp69qqj2zu5d7uj3d8r574r7178ds0c34s8ndtaid1icmh74qhbe27goho8gr3egakoisvl9bxy55zfox7',
                user: 'g0e1g8uyur8742iin03bwhbwn3qfta8lfb0g4ntijzfsov8rzu3kfa65ayzqxqmcj51w15sds8l6p3cavatjbgtjiq5obyp2cb3uv1skdtssf348wedioho4gdwcamzqkihkv0z5lyxjgp6nqc017s1khz5nugvvdcsj2lcy31mw8wj2dxc6wfugzbjnx6tqxh8ey8xja56z7hnz26x7rykfv8yd0epsnh3e87ps9zmeodlai5xb2f98m0700h0',
                startAt: '2020-08-04 21:09:24',
                endAt: '2020-08-04 11:30:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'mudbylzrituq87racridvfvnk8u18mhrris56kkssdz44l1l4q',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 17:42:26',
                executionMonitoringStartAt: '2020-08-04 19:35:51',
                executionMonitoringEndAt: '2020-08-04 22:26:34',
                status: 'CANCELLED',
                name: 'w9a6rbmnhq4v4muioy88n23sd6kyt1730k9g3snhwuc94n8xz3rqrdvmagruosglp2aunpardei1i1v4ebq0oh10v4bedacihs6m3xwcwa0xw2hotu8mkvgc0dr4y7l7p3gfu8vfb5dealqivv7fafbbklh04spvwonqh2gsyxji6ffluzif19mve1u43101zjg8k3ay06euxg2o1tns8g1fl51rgzuhmk44aw8tkgg4so34mln48iu6sbfnjjy',
                returnCode: 2030558197,
                node: 'k4y44qpxmsvahuez3avc4tgio0nl7ewbabw4bi5j8ey6ye3pybpajy3171u2z7bgi1d796fei21jlvfuht9p6jqzptxqhl8fgot0hukzs6bi926ps44mp0cfxgn7m5d4c165uxvrpb4w5m28dtvvgy1oestb1dg6',
                user: 'xcndy5szgele7tknenk55hahk62i6lgbhi940u1tqihw23o8cf1pmlstyieua7xbpb90bwpkiavx9cclo6h3zq9xvew9xzsomw9wjn30bmubg56t5gvwgqu633slhxntbh44f39ihqpb47b6xmmp8xa4ns5j4vu7w3e7tblzfb5n950h3r9nxpuo056p9x7raagqy27wdxmbnltyr3faks4o7ttdm5vlbnov1kf5hdu3cunz5ya7xqibl0aohlf',
                startAt: '2020-08-05 05:15:44',
                endAt: '2020-08-04 09:30:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 's5r528aws8q8dlpxeljoahkn9ugnz0jjrqydmzd0sicr0xy0yc',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'uoegnm0les2v1amreg9i',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 11:09:02',
                executionMonitoringStartAt: '2020-08-04 23:33:14',
                executionMonitoringEndAt: '2020-08-05 04:08:56',
                status: 'ERROR',
                name: 'q0rtwafzmpesm19np5r3sn5bd5vm1qrgtgyof4c9gsb4qppee7uhjkzm87lcyebmarp95ijmvj441c7qtoia5cvp6i5e1hrxxn6ew0iuo4t04tfbu15y0uae4ckq5q45dg0e55xrhq362i9knzrmjaaradb34uohkdqi46korqirhb684yyr9syixf11urqkhchzq35i8hb3xav3eb84di02kduegbtlusb8gujbaiecesq26hvnz1vg4rgwto6',
                returnCode: 9238328734,
                node: '2k59vmeuhy8yqppelzjoaceo5kcodi36ceso0sb24ftebsbu3rr5higq7mcxf7z4e9nbxnh9v0j2l1lemabn4e2xgwzn805z2j1nni15gs4q1c3n5hnled06ocd3ve7a71mkhxierp8cq4wt5z5xi9sa7hcgkjov',
                user: 'zup03v8zmom51g1hif94jsd3k59ha3zfhzrgm1rd76qtm43cepnowm170cxxg63kyw6g1pw0tiv3d2icrizisad93g5ulyxex5vk2lkdc6x9obp7ibt67e9iok3548nwj2jaln0k59bvhcfhzft8qffgvzikyuqhch85vi8tr7ar2uthlrlgmzea8xz56vm213ru4uijx15kbwvqwhnbwv66b9hfsq606av1kivx9oaq63amobw1zseecp2hivl',
                startAt: '2020-08-04 21:07:21',
                endAt: '2020-08-05 06:53:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'n0hiz7p0s9eyrpa5ohh6oyljsibu0ynhshp1681y3b63t2o76x',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'tkqvw1wfu2toklvma4pn',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 20:38:29',
                executionMonitoringStartAt: '2020-08-04 12:39:16',
                executionMonitoringEndAt: '2020-08-04 12:19:14',
                status: 'ERROR',
                name: 'rtsef3vm1rbn2cvxqyumjvui2t28mt8syb5vmyckiv50me3jy8cpzinaxkk3bjupgu0eaz83v2595cl18izg793ia2y7bagq7sgke5aslt05tt1oztfvw3mc7mlsfqfrwgmp9qdgn73jvzbggxvtbm9am5kpf9xotnl1q8c3p5e44hk4lsasi3g8afu2vjrnowlfzuocio9u2lqayx3dbu75slaz5m3818kp39yfywrjdgv7niwgnghitzzhsa8',
                returnCode: 6625316584,
                node: '9pgcljng17vpqxssu6ydp6of554vbkac6kqg9c1eaf3kz8oyfvajdvffwuffcn9397jljti9xfkkstfcm5y4tovpz3ml65pk50pqspwcb0j23mg83yt1dmtxqo6jer2j3d8bld87873jglylawpxuilypljqc5br',
                user: 'lx5ss0n1fc71cntg3pq2ovbbliwrtd20gzkkt0brotel9xo2wqrbf88c9sj5pr9o0ofcnthkv1c30lienk8q5xex6sf0h6la0o6uon2g292ed8siagvot4ns3ck7wl9qk6aicgw687eht1q8c24ofb8qrpzxvfldx479zf3q4tp8byucu7trtsaksl1870kmvjidpqrxlryj3fzmf15bmcuqz3f3hg8ib2wrqk89wa2lz2nves9788x0igxgzog',
                startAt: '2020-08-05 07:57:33',
                endAt: '2020-08-04 17:33:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 's5np37wfh5h2sza0fhmu1qcg359xqor2y3o88ngbj1qnlce1t4',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'gg08zwnoqax14kubdkon',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: null,
                executionExecutedAt: '2020-08-04 14:08:07',
                executionMonitoringStartAt: '2020-08-04 22:05:02',
                executionMonitoringEndAt: '2020-08-04 13:01:37',
                status: 'CANCELLED',
                name: 'h0zt5vzwg5f3q6lrj86uot0vbv1vpt5vgl8wo80bdndz88v7104d8g1mfwbtwj5y5zgjomm2bv3cevejp33ievvikauhhh3pmg0vl2li15919alo7hv1dcmdmoqu7euhrguqm2o4f4k1lxbxxys71pjep55vm4722iho6a5e5mf8lzqmvnxew5druhdzny7epoqwdedtd6mtlkqfammlbl0psxx69qvhk73f673bz1y4ffb4i0p6uvbbvsugu71',
                returnCode: 2895003437,
                node: 'dge0ql9mfp8e1sib86x9qunx4ufo1fcipve7hru7lyglk6g38v04s60xpnhz2raeizmx5c3me9lgpsuq9fue9k7ktejlkqw8n8wgpq3yar8tsku6lb23fu1qhxl9emfct5s6k89uw84wa35b88ids79phnffeoy8',
                user: 'wannpgwp8hbza8htiiovvza3a0ss1s4voqjs7a9mo6lem8gel5h61kt6pju9qbm8v4c0wmywggchdxwvqma24kl387kz11xg9kq2embtihu03hz4rc4jw9mv5gsh5of4wvva74uykx9jsze5mkm6wktd0bwj16hoyudf4xmgh5s85pvf28jnf92bkmq6zvxoui3zumpib473oxzmz5922ut6klbdr8dp232jax99k3u2y01knvvirikslvd4iav',
                startAt: '2020-08-04 09:20:58',
                endAt: '2020-08-05 07:15:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'mghtvfvwpbzqtv4ibo6v5fwceh7ryi4ztrnc5rwf6hzfo0rfvy',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'vztzs9pcagxsc9w4h5k3',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                
                executionExecutedAt: '2020-08-04 20:00:48',
                executionMonitoringStartAt: '2020-08-04 13:10:07',
                executionMonitoringEndAt: '2020-08-04 11:07:25',
                status: 'COMPLETED',
                name: '9zmfvord3usukuacgzcfl4dvgq54t1w9bfqc46u9aertwthrrlkmdllnuw4q3q2kfyf3s3m9ldjae1octmpnnlk69sgqu9mf5x3p6n41jofieq15kbp13gzlnpe0c3dyxy01pm0qgksdgm29erwhgfpg9x14dwrq0sr67q1ppxyp040xsast3bi7ecx1bjmxu48zx7xhhmyx5tcvng2ae37h4cwgey328m6gtevo5um0belcldu187xsvsjtoyw',
                returnCode: 1008902515,
                node: 'd89rajuiujut3onuw73tzxjkeqk8iuvin28drd62ni2htht84uo45z6e3liuqkrmp7iqhlrk74s6cw8qkcsvbialqt17yzz8e9dom37sgs5h5px9fxo0nxj0m8s9cfpfhvvah2mjudgr41kmj28x60i7uelmqom4',
                user: '6bk7rwgddb3y5n31k0wn0wf2yep8a6v8gppn63lq2hpqok4nu5e7vbxz27d0i3b27al6wiyodd3jyug6yh3rm0r308oxula0fe8esaruxdclxxuhn5u6twgh793p6o8t9wv2544omu1aiubkd8tgxncpwjsyd2hpu0vfn62z8k4y6p0c00s25eypnlkwa68bk9cc13xtwej443c13zf330n37k2isf6mpi2nk0fue204gizmcxdrfcon0ilt6sf',
                startAt: '2020-08-05 05:24:06',
                endAt: '2020-08-04 12:02:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'lrx6ph8m3je2lvxvihgze6f4k80444l90y6ufbvj9818rpkpmi',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'n6t8x3izvcixftk2hyvd',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-05 02:47:23',
                executionMonitoringEndAt: '2020-08-04 12:08:55',
                status: 'COMPLETED',
                name: 'scqg3rax9hpdtnyo7r1qdc5r66ks1kdgbux2qc15jbzkzlx3bumr4ca3blvr5fcw1zp09d97jv7z02jx8jo6udigrfw4xwkijn0jicgdbqu1hh0voi7zp5780fq2qkm2w3txldunvnk6uk9xtcg7jgm111hjmkyqw21wsijewq2i4hm8f1xswajp3y595vneqzdlgy0olcxofqd36bbbh5n38r4km573msj5y6pt0rvuaicxza575c8tyqfn5nk',
                returnCode: 8837392824,
                node: '0m421wn6mb5hqevztmdttmlkyn2prr7sw1lvrgyyj1owxxliz2mk81771f15e80b1kdt84rltyrexzolt8u743bypz2nw475xdnb2yf59qsgldxqp0c5oop001qv4f7lrcjz24kz1i57ftkmxbubhr8uqla0whqd',
                user: 'o5dgrqd06vdp6sy350t0ygqb7ljkzfphaozkly7r43dehzcacyaycap19cm106p92qm79lgox2y6t2zrg7bgzytq6mmh8zjpkrdl01xok4zfz5fqjklekmbsn6l8ybynt1974lor9ybx2vd62jeug131vlwob2mvb5s595bj1af5nk9vu9ga2ems7yzwioor0vhv6wt3d2d4nkpwexte0rolqf6rzrj67khyx8s5dltoefmdrf983oswrl9geiy',
                startAt: '2020-08-04 11:53:32',
                endAt: '2020-08-05 07:58:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'd910gks7izhz7pfsvcctibkwt5168smffnu45i5z513zffzr9z',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'hzxmnpzrm26ljsvgp66b',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-08-04 12:26:25',
                executionMonitoringEndAt: '2020-08-04 18:28:10',
                status: 'CANCELLED',
                name: 'uc4lganw11jej3f92d9xqy85x5fg4uzg5d3h7me7e2dnwy1p5oza5iuf3gw8hwi7f6uyb93ihjhv67boswzlm601yvpka8g15wbdqisnl1bb3mavbhurrcfqbg8pm7s4rtv0yffvn06cl7ql4v3z6n6oyxek04l0ks5hp1jxobatvpnj5v0raphem3k6m1qoxhfum7frcfcaehtt1ncx2dmy9a0yuermu7xaeu76ibcd7nvz2h6cqtkxilwfv4l',
                returnCode: 6478059237,
                node: 'nr5cqqix5kwu98smm7dh72q7lxwi4m656z436yatrfextqii9cd4x86iej4smpg8fjnlkzdw244w34m488bx10ib232ymctvcgunmewd49mt1gf0hp834bpimfprn16l6weymnndw8cbaz3pqvy756m44b24g81t',
                user: 'c1q9snici8v4l9sq7hkqsigaycjntxanv4y39k7o82bf65watu637juxda79l2ooyk8t48lb75jble9irf1vyx4antbs2d6bc65uryrqjfvlggujf89mi3d4im45ipjuockx64v0ijt22jbbjy2zixkhk7qvfqmpf16ou49n19r2esnc4i6hgf7zopy2j2zxkh1guvfrskdb5iqzbi2itmf99y1tz0x9ezzbeb3m2ibfktlkc076askqp9sec8h',
                startAt: '2020-08-04 15:47:02',
                endAt: '2020-08-04 20:30:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'r49n3mrkfokhn675cx0n0cs9c9yui9z0m2378hr5v1nk89hkjc',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'ilelnzlk27jpaqkgmg3r',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 18:32:21',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-05 08:15:30',
                status: 'ERROR',
                name: 'tqdkr5rqatvprubuioi85yawpopbovuhv8duornqyf1ujo733reyuje5ky536u81ulynzgv5orfp2v6unsbyo9mbm806d72vc1fb74so5h6hyqs9k22p47s1vo1zjfmnc9wt1p63jne38k4x9xmbk2kb0gmum9hmkophxleo72vm09q738ompbzyf29fnnhgntmq0mfnegajvzipe0qr9wjxys63q564q92xhborue6qd3z0qaiw1qoyc1nrsa0',
                returnCode: 5598629315,
                node: 'pybfa0r6lsir2u2yug1rqkwcqr8nm377ux2ifjp4ws08shl4fq5mx7uch3yhae1iirffgpen9s7v19zfvv9yotr0gxlt2jryf1cppbnxf6ybjpfyqrnzutnnq6s0v8w2cc769xuspps09064cu76zx6j05i8p25f',
                user: 'bef67rgwc511ohsw8twt3npmbfiav6vidt69qz6rm67h3tbfy4ycdtjomdo9ocsj930xmak2sb2jj6fblpayehase23o662w1xnjxka2rvs3dg1mh579hr439r7zcdio3mz8gob1d8ai5l7g0plal0f12rxzjetd0rp8f7b5sf6uxs1g3lv3ctrkepenfc8mf07a5k4r6i2wgy19hxdcgt673373iq4v9kaa7wvle84nbacubz337ehfrzelpo2',
                startAt: '2020-08-05 02:46:39',
                endAt: '2020-08-05 05:35:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'e6o01mbew952mzskcngx168bien4kzjzw81k5rpmglstsgusbz',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'q5fv5xjj4vp8hktblm6j',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 03:29:37',
                
                executionMonitoringEndAt: '2020-08-04 10:40:18',
                status: 'CANCELLED',
                name: 'vhbvb0qof7ij5g4u2lrr7bc95dzjldmptd0hxlggvzkp3skusted2repmrbui830kwlgoyrz2letye5d2ed1jmcbzguuebgbhg9knx9piqpu35tj5ng0iotjoobysfc2iiuwgwhb3i2vlfdyq060m8qysvtg2dw6onjqh79hwa3yzpuvtkqpdo9as9ayze0e6erx8xwa2mhkdv4a9laxv9xtxf7imf7c2yzkgcj0kupui58d909fsy93cyrdtua',
                returnCode: 7867300961,
                node: 'gz1hd5odqtrdgfsfejgylicp858b6mavcpx11lx7jlrypql2okxf19mrdm5fo4snen3qy2s2u21x2vuj6t4koh3sqc03b58eetch9nvxd0kud2kxhorak7xbg3ea2tzioa9dt8mg0rx0ow026q2dfy347q3zfrur',
                user: '7gx5y8qmsisuw5gqalm9dvw2grgjgz8k081ykhzg8da5lwll6jrotmlrcfm6ynyp9qhb8uprtnkemcg4eu0qgto3fyzhu39tzk1bppu24mzy11vz3g9vrm6bb614fn4h1vhqs3wm9k0j8ej2mb6slp8rxkmma20ihyi810679lm8na1ta8j1wxgmfbv6xdk83nmoslcguryyh2pyjg9ooavb7o0h3b4kunv0weaywosemobfnbbqona4ay7zfb7',
                startAt: '2020-08-04 17:02:18',
                endAt: '2020-08-04 22:55:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'zk486xbr151d5pdakuhjphzu4kxbf8i8lyubvo2ff1czhtfche',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'cyd46k4zb1a8svl1n5h1',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 04:01:31',
                executionMonitoringStartAt: '2020-08-04 19:48:07',
                executionMonitoringEndAt: null,
                status: 'COMPLETED',
                name: 'clhuu6wr42kiidbclbcgiieb0m3adf9cbfupwbx0zohvzunmckddebi1n55e32mi80sq4maf1iq18jvnbd9t8i08t1ipnx2u1r4fv0h5d5qcbmph9elaxzqcvv71bsexwjm572pzwd34rzlubu2b4lhhozl3r6xsakd4vqrsv2i0b9jh4h8ea6qkjparl8z3w90u6mmaxuv9ajx4y08rgz52nz5adrvmit0wawflf1p262ufiu7a5kxtnogme0j',
                returnCode: 7539824943,
                node: 'szewblkblm7yd7662n54a3qng9zuilrmubq9lj7zuc8upclwjgxd9g8ygkrq7mit7jv5yb2w8tavrinlzmfkg1t9q0x8fbiwf59oxowy3g6q53q4l3vtldlfthm1e0lf5mqusxf6fzn9ijy8v0jbb4mmidxfeoxx',
                user: '99fk9rxj8l9cjyfpn488pm9xicu4zcfzeb5ygcm99mfgt3b3596qaix4b5j803jqw2nfmqfzzzpp2bgbgrhrykws6iiwsa4yji6c9g1t8g09uhbs6xopw7m4k6jiaj26btl0sewdotkqedeslcxevqt6mlwuct40useeprin50j0vmnrd9mgq4la4mmksm6x3bkzgxrvut2tz7gmed3r192zopho2siza6c94e0pwn3a5kpo8dzq4iea9gtdcof',
                startAt: '2020-08-05 08:55:57',
                endAt: '2020-08-04 10:25:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'u1fgzte7rsbamyf05oxb7nkx9l6xzxzd5tqiar8z1bvx60jdkq',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'c26rpi85qfrd48jvdcea',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 17:20:13',
                executionMonitoringStartAt: '2020-08-04 19:35:36',
                
                status: 'COMPLETED',
                name: 'k0zmbcnfr5lbf3jaggzpyszsvb61pfky6toj0v06t27aiouf4y3hfiut1mrv9nrc0w4ghd4njihnr1r9qr6f98b741uxhyvvwlaxk2b0bb5rd2j6ocra68g975zog6bvkweirfe7gky271xbllahzzw61qitxsd0k4vdwlrfeidenu61zlrjtl7m8zs29g8jyi6cc0dswu2yw6plhuniuzp9tiu9bzvoujev350b8ys5g0mrs9pixe267hkcrz6',
                returnCode: 6519818826,
                node: 's50qjx1y9zpu56teub18kz9vz8yghq5xi2matpkfzu64a81lqhlrmrr4tt2u82f9ca27x7j1qcfh648yvrsf8nf5ygw84pxojyh77u73fqlg2eskt6hagsuye0bz46dlhybowtl0d7zc1qzp7pg54av2x8v8gb1r',
                user: 'xz7p99d8a7allez4i60100tyg6nyq0eitp5lv0s6ka82791ybwdnk9iic5so0z0wb5g08pzvquvitd9iia5e5tdcs88ydl409z3kc2om04xtqj7sc7uip3lb0enrs152sa7tujl7k1qnx7wawajoavxj9ff1qgvnqz1yn79lc43chvz4vieatsf54at10257j77bul1nrv2cxkzscs66qxjclsktjxu2jpptjmmfh2umhejraj245gxcprv5w3h',
                startAt: '2020-08-04 13:01:32',
                endAt: '2020-08-04 23:25:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: '8tggd0byt7qeycx9goeeamz4j6cos0huu0q6llqttcyowzmbdt',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: '4a8suxs2xlxw77m2c41l',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 00:14:37',
                executionMonitoringStartAt: '2020-08-05 00:16:59',
                executionMonitoringEndAt: '2020-08-04 21:34:09',
                status: null,
                name: 'rl5f0r28rwo84anh0yqwmxqrtig82asaaj5q33byykf1r3ckhbsreooi1ci81vz3t38sc02vp93wi1vhii7g5z6z1i0x9zjr9rps2wbqtohowsvgm3m2qx9to4lcrvlzcrr3tuwbs838x2m3e5j1dauzq138o83ywk30ru6vlk35v5k8wq16srx9n2clrnf9jcv1wku3b7h8f5p853x4ogjzx8qh4dyxb6qggrirz58iifpip0mlbnru0jhku91',
                returnCode: 2084086742,
                node: 'g0z92toj57c63dxm8ro1gk6t2uhk53fcx26fu6inboo4i4kpqiw2e0c3w7gshnib2v5xwgcd0jgwn4d6cx45x7ezdi769xhphey400g5h3h9aubaw7e3ojf13p84lign8j9klv5k3sp91fgc6vghku8g6x53vj2s',
                user: '4w8mfscrs087lyhs87m078nrbt7sk07gys2ak3thiy6iaqkxnc0i5wn7b7egbvutt4eeb3rtqfspacqd9bula3qu063dojmraj5uighsuwb1t7tulx3soov02tvee0i471jf39kzkzowgaw0v2fw9n9fdi49nsgo0qqcy98q6yf3b1zakw8z67gonwsox9jtduj6trn1u5li6g3x3225rqp7d37jenxkwizhi6zebf8vhze4dlh30yb2q8si9eg',
                startAt: '2020-08-04 13:26:23',
                endAt: '2020-08-04 11:42:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'm85zggp3ik4c3fxrq1zdkin11zqjw9w1ea7wfv8prm7nd6ool1',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'h9mn35ukwb1vvicof7dr',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 22:45:19',
                executionMonitoringStartAt: '2020-08-04 10:14:15',
                executionMonitoringEndAt: '2020-08-05 07:31:01',
                
                name: 'w5361600sxvcpn3nz1k3uxq5h476fdudjd3ofio6o4g4bbb3937r43rlqu4wc3f8s3l21ziwid66k0kjxnppnu6xzy6g4vonu0gaca11bc8jfja2ric60ustgk0vluv8pam948jc92rnbxkp2lh73484cehcg6nm0n8pinb4hn7cv95o606aghq3nx0gcmchnzfv4wxhhrscalxtyj37awnjd55y9zox7rlbejn99ti81vfv144uegmn7t3in49',
                returnCode: 2899338515,
                node: 'zgi6la5nwq2hkz4j00u7pa7nkbbi1gyg1zqv855io183isrod6cujjs5jhr0kv5wv4d97f7xubpfs64fq06t6o5yimhqv9b9iqzelk25dm09cr89ubvj4ox8kxtrfi2lgxbz3sql1rxlqax45fb6crkyr9lhrtle',
                user: 'uhdh8g8xqiafl1fomxpavjtu177zefzt4r18f49lgs3barpsiocgdn7yt7k8uawxctzigm0hnjojlblorijqbx0jr48ar2uow4v72vew5lfoigovp832ak5kqsb4l93in1rnep45udiw1nbbcs4czxatlwcivu5t4m7e9e1hzkx5c2jzr0qegd73wmoiwzas1blhhj9vp1qzwhipmc9c03nicri7ogr0eupebp1gygf1aj7pfex0ta4ne6kky85',
                startAt: '2020-08-05 01:04:47',
                endAt: '2020-08-05 07:13:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'h0ayyzmp4uzfc7naq8vjdwrm5q58o7u16i4bo7amqo71p5nlg8',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: '1jn4v5qvla2mw7guvxfx',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 17:57:08',
                executionMonitoringStartAt: '2020-08-04 22:50:45',
                executionMonitoringEndAt: '2020-08-04 21:24:17',
                status: 'CANCELLED',
                name: '8a0fwijnapm38j5kz27zvnfw075893rrk4j0ygtg9w0mfpjswkn6vcoevojj2abn8yiea2k4dtzcb3ttduif9pq0lgzs4lo4aa21sihdb2oz26ayeoelg21prsmrnz1ospdfbvw2fqlbdheik8r8zccf6a59bxplni5tg7gg8rnf8bvcywzucxdxopaw4csedp9a93skyjakt4aw9brh2kk85yu2eccllzk54xiuqap7wtzvq1ocxrq714ke4ri',
                returnCode: 2065041184,
                node: '87if3co77svs0nlorlkrpcsoq18xsdyzg3i5d1xq9j8xuwxkf41qqqn6ecamozejjc6unzeh7mi9ufqeik3qvag3n9vudrw4mcwfha0gzqspaw0qw8btyxdt8jqmlox18iljmqjenn3ziwkksxsk1yuzqxy6ntce',
                user: '4l7cnq223m2oyk2ky2f1d9m9ritsqdayjy1wkgwgrrk3mrj1zpcgi1idl2z8yqthhsok0p0cgnojr6t4wpmu1com1gr3cbrw6r9phs4wn5erw1ug7j8oa45fnntik7h0kn9qnjn3213ex8ejfu6cdnx7f5aldb9q9a4s5kn39zz2tl7e1iukaldq0fjp6nebkaj23h0ozzuo0t40zden4sjdcxvacz2fg13dxczr84x225frxd1fjcjfplyvyl0',
                startAt: null,
                endAt: '2020-08-04 16:43:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'i711w3i8yaz82kcowo3ah293egjyjodynb68qohvepnz6yqfn4',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'ekvnuh5dk1pf1gmxsexv',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 03:55:43',
                executionMonitoringStartAt: '2020-08-05 02:40:43',
                executionMonitoringEndAt: '2020-08-05 08:43:52',
                status: 'COMPLETED',
                name: 'dhxs28pnv2d4slnvjzyldtvecgl4qjzacntljem5cdmp9qe9p5r8u5f4slyqkvd3dpt2x591o8udp8nhxdo2btvyjrb3sgfaf9grayw68ni2ld4lhuylt5pgs3vvle3ao8lqcs5n34o0mb8z0ikvbm056y0pfygmuzkqkrqez4ux6lerytycwcga313jtth2h3elo84k6d0vd5g4atmmipdsf0s9aap5b05ju477hw4ivigb5obilivzece15zr',
                returnCode: 8588829798,
                node: 'rwg29j8v2pifrbt9c6w4c0rje1t9g4jut0eidbs7la65k5g1kl9a1w51wehzp4bxkxvr4vbtspnik9qviaqo8y6trs9ntpnmqxp02mntdawxmclzu9ef8940pbrmzmffhuay3irzwl16icnnaaw1t5x55ra27wyq',
                user: 'gcs5wi4cu6btw3fmeemhdwe5hpe8jxw3781b66xp9v2yltdu7u2x3gvnyvfw7q62d8amcl8cl40u2bp94mm15m78331gu8ah6ya7r7z6q96pjnx730ganza1h1c8mcmij54mhb2ojgj7mf873n7pwjkx2tjixv48stycvjxe41ahwkid02wrhdchpqza4951i6cm5x1bvetx6hqezce9o0d9ym065zwb2bzbd3lgsttcq9656279xy1dza3hbkx',
                
                endAt: '2020-08-04 17:03:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'qlug2ik20emgg42y5kuhgozegkxnkznw97wj0vq90h0akjbtgd',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: '7a7geghiajqxyw7eiy4y',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 04:53:22',
                executionMonitoringStartAt: '2020-08-05 04:22:37',
                executionMonitoringEndAt: '2020-08-04 22:26:29',
                status: 'ERROR',
                name: '5lnnpco1xn08pgdwkwf6zp10v7s2imk7d7pqde6zfy7m61cdn3jmnt4rcff94z07o88hrhq2t7vcot9k0gtbakxeda8w6rkpsbqx04lmk9uwmu2m3um45a16qo9q0u3emkkpvpivk9dg5hb2r8wflfxoo6pgmlkgxr66v68imq8ew4wx1hzoafiyt2kraxbkmzcztfscyhjp309rjtuvban4zafpgsz3z7kpnl931ssf18pf42598wl15ii5pox',
                returnCode: 2711366362,
                node: '2eygt82lax1vdzon33x9v81p4zu0g8xls8bkg9u3puzs7aw5z0a3louwignmi9jhhkxefyioq09ows0qcxkb8cbuswbdrk2kppgrw23oekxper93u0m3yqwzg4xhe6f118xzowlih4oc682852p1f3axkh6yu2ai',
                user: 'lj54bk0r8ygna1uergz4vmy4lvqzlnffosocdfkl549o0icx0sa4gcet8yezuiqtzp9z861k7d2fbibh49dregpch6o6a5qutvqs57hr5e0xl80omsma7lyj6lystytzsznfh3gws1fqa6382qmff5fgawtag6mer8ptnabrm961ahyw1v9e2klr3x3uj7z8km0hy2i65qlpdyuxbca87pbw3woq6vu05jrg86u3912gi18y4jsrvze2ehdtf1q',
                startAt: '2020-08-04 21:01:59',
                endAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'ozz0pdl8486rehu9n2a0m604m9wrbhkpmabygsht71sv7umn2e',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'ot1dths2hidmimyja4po',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 23:05:48',
                executionMonitoringStartAt: '2020-08-04 14:49:24',
                executionMonitoringEndAt: '2020-08-05 02:15:21',
                status: 'CANCELLED',
                name: 'z6wqqmp7omrsxgesin20jil1bvfimfqzl2dm9cj6mf3wjeeyyo4anus4e9yioryylwt3hsh62mk3gezcxnfhto4abdbe4w361vylhoirurd0bg3p2tliuvyjbj93s22rjmd92rkhxq0jht0e1dwdwcq5jfubh248cy15obdecs0rdp8kwsohovcvnyoiwmp2dofo6q2a8sdhglkufo6phlz7e9p409yknl2lk5n3hvwowdeatavqi8vhgueocju',
                returnCode: 3683564085,
                node: '12tdpwrkqlchdg0mjlm72kk0xts21l2dxiclsmolzyk5esci2bb7mkea565umn3kzixlrb14ozqf01c2ajm647eao67nogdpa9s1wlf2inhsj2lu0m77cxikewyns30ofael6rkst3i6teskhfrap3x2b099hwcj',
                user: '973pp4bx63qwpooxsga9arv19ty5277n7bif3jy561nw0yv3f58sedkzv0f72cn1txqs0kn4p27vn8drtj3yo1qhxioqg0l0go11dxsvsvzoi3teoe7o0s26cm2uo85u0mgx9nxupea56za0avs20019w8i6l7c35pli61uou75ai8s9l6ppi5mysrz75a9cvzifcrlkfjoqeas85gjqtaihaty5rkjfjj513lipjdc4lxvdtzbqblvb4eehwpx',
                startAt: '2020-08-04 12:37:33',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '0a2wv00hhl605226vkm8l54g8n3xt7vw94vhw',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'bc38wzpegiy5y9322za4woh3559lk1cads6slws6bqho3079ra',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: '58ubqz96iyh0opiwgfz3',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 03:22:43',
                executionMonitoringStartAt: '2020-08-05 09:01:38',
                executionMonitoringEndAt: '2020-08-04 23:22:53',
                status: 'ERROR',
                name: '58n8k78skew4sl814ohhgfoo04le0gf2xqmvcb4i7q3il9udlc097v4nbdayeji0qqvjpun5e6oxwqma242fgw6ub20xuudirbkelp6d5zgq7gnx1i7xq0ygvzvwr9rjc7e4knhas9ka7djgqk6e422mpm7uzp027f7mvul9z85wfutkc5xd5gaxi0dt2xhbuur0m3eeqctradufxc57d2289msmzp52lkmro7hlmonqt2j1juzjjc0u11xh9jy',
                returnCode: 8539607859,
                node: 'ph5nik73i71r381f7tvocaaxldgi000czee2x75490d0wuyhgmp3rhtsdgk18wsjwrvxv9m1mlfw2rhxgdl54f70adgpgcfsg4ga29u64iesd4il38g71sl4r6qlidsvlxmrvlugsxi6i0fvcb53js7kq5b87sku',
                user: 'pjzouosaxaldrs9qh9ih5mi9dk5qm177bzfei4a6dfwygc6mcwbxdpfbqw964ypzps8zao4sk4dm8rrj67oiom349d05tl8rypt9y7cy8sydvfvmbavx4jgi5jej38mk9tu8bgb23kft7e9s9o4h8tbukp7q67m4u5ix4x1r9j9o22yi4jquebcnkbvqwn45bpmfisi3v9895w6qlxcgm3wtca8pvoo0igr8z70k6zb6nhh2pr7lddw57rqqv76',
                startAt: '2020-08-04 23:04:26',
                endAt: '2020-08-04 23:33:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: 'orcrr76oh5cs61utc06li8qnd92gu5c36qcqr',
                tenantCode: 'cjhz78srzcjezbortzywx6qbro1ipyuc171w23yc3164eqjlph',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'fzwdyj51qxm30kpl8uaa',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 10:03:52',
                executionMonitoringStartAt: '2020-08-05 01:05:40',
                executionMonitoringEndAt: '2020-08-04 20:04:53',
                status: 'ERROR',
                name: 'j3k9yxe5rhji62i2hsyv5qdrpvcmdipb65g3cddg37zgnxm2ly58w2x6vzd8kj8vumsktjfxu2gol3yjyx3jkcd4213938m7in8qln7t01x3x7fsidynv9ofjy449p65x0sj2wvdj7z80028bgo2d16erumma4cs5ftdtw14qph72fk06kfw98pff9ryrpgtmfhc9cioqm4lceij8zt4j94aonygyv1bqpn3c2bgluun8sicw504uj5270y2a07',
                returnCode: 5663290339,
                node: 'nt66h69hlmfr8jhphxhomjqpj8xb9fq2mcj0iwryhw7nn0nhb3sdb3hn2xrh7g6uadyvisdtirx3g6ybbx7lo1mlii5a1sbqychg8dhh1olbv2n7g5hyse6e413yzymjafyjbba6m8j57uh6955k7pe9nwfqkxf1',
                user: 'f31fbl9uiltzp33m1u9ngv8ujlm8q3p7ssw27waowda8ryb6grwwjpb3um3zxrz2dasxyeszrbn4m2wfn9j7bafi4lyl2w5x1afxc58plkpt3so3n2dgog3zhkj0fxmsg42j8uz99h3sr30bcatjo0wdh9xg8t9xfuqsio06kpla4vmow94od25sa2bnviu5mtrcpogn50d17j3376c8h4umkvhuezrq7ju6r8t7sswgq7cnhmab3zodp8gfx73',
                startAt: '2020-08-04 09:34:49',
                endAt: '2020-08-05 08:02:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: '0fvyvw8pmezq7rla0dzzla4s79ute1k3tnbhg9i49dehn9pspl',
                systemId: 'upcwiq998pl098fdg5pc4shrbdrp490276we2',
                systemName: '4fd59e4k76ajjx2iojc6',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 07:31:21',
                executionMonitoringStartAt: '2020-08-04 19:32:48',
                executionMonitoringEndAt: '2020-08-05 03:32:42',
                status: 'COMPLETED',
                name: 'gstv9l0n7pw2cgjib9iubd5teg3e6324du443mwi8tud01uznyf5ax5fb9c7jj4ds6hp865zi6n4ao5c5rqwlxbj8qaxqq1p00kengocq3tybajlhalol355d81t4cfs43lurnitmznhkzokhj8ybwspmdmow6fa8h09shzaab3432kzwzc2tqg0mf17438npy7tcgfaqwlz6hxmyi3ax9jwjf4n2juproq7b0brk86dvnvz5tp95won3lee9vv',
                returnCode: 9805893068,
                node: 'wfn16dr7596soji6oc0x6puiltqbilkfafwu2qj4lknta4l04yjupisycmprzxij00docdzfc6148aomsnillifcxh13nl3u9h4bu7930dj8o5kkxswi3vmjjsffhzvg8f9j7tlkmyay7o7m4jb6wgxujxaayit1',
                user: '9qdib8ofrtm4chazqkrywjnx4yjtktcs38jfps82c1ldls1ofj6u6n5n3vushoytm6ts81iwxx0oaoy11uf3ucnhpvmq5jsalr2rbtbvpmdbx97fno5juy4qdvgrooapclwrkpktei2p6omsd0mczhti6pyeqiptu918qi6r4l5jsnplj2h330xpjie3kjxbbie8abgxhvffelkowtne0c2008ohgmk1lpx9b7ol2rzc24qxmj08ivdosy3jmk2',
                startAt: '2020-08-05 01:38:04',
                endAt: '2020-08-05 00:33:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: '9a3hckrxn0hg472mo6s16e7crw65chnj7topyo2s2xx1neqgat',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: '1ftjd4b2sx3maxze4yqu',
                executionId: 'pohoqb8neb9ccz4m3hmv5lt0zoykdw1t4qlxf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 20:12:55',
                executionMonitoringStartAt: '2020-08-04 22:38:49',
                executionMonitoringEndAt: '2020-08-04 09:52:11',
                status: 'ERROR',
                name: '2byyuxjl4hfbus6lb6kdbckldnk1nf4ce333i4ghdaw581g36h5so5i0h4i9eai1l8spx3mw7i4nizztkyv8ttfm0a1v842pqpsl5kgmi64xi38xcs4zyr4cb4766hrygvto9qsxhjfqwoqptdvbt0fjbnlzp5jrtmkcffhxob0s0pzp8akvolekxg2llf6ejqnzbcgq2qk6ql64kr9ywib5fvh1806x6x2wsgpvuphgjwpkhqfdx55zlznt2b3',
                returnCode: 3918398604,
                node: 'k8wwbrnpla8l8mtde1zax7qn4pxjyxj2ts4smqm02xovibhsggcxitm5ax0mebt98zpavjcevjady0xw3q137e08x7g15h2nsuhh6836ut00qydm9m53vcmyl6u3mzf2bqjazbkmziq09sidcxp2e77ezjz0dh5v',
                user: 'lqvk9n9030jumahbt2o8xteoij4r59qh30hwqn389vbx4anzi1h9jm8irx232zd22g7po4yt8nvgkbwcjtxzj2699405gkf5ov7ikhyxcqb5ws6yce6kivaqsndjmvkr1eeyec22dv5bgn6aommatltqcwlb6cmjz6o99fg2mg7p7wss51176jl5rjy54iffjopw6bn8fl3youz2tand719u3ae1hiq93iu8ub4tnv1ei7f2ie2r6amrck23adk',
                startAt: '2020-08-04 11:20:19',
                endAt: '2020-08-04 14:31:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'r2gmrk8gfog4ou8cgk71dvuon1czkotbwyh4bpuj8ql9zhra4qb',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'gdslm9wampuas18k9h0l',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 21:52:46',
                executionMonitoringStartAt: '2020-08-04 21:33:29',
                executionMonitoringEndAt: '2020-08-04 16:53:13',
                status: 'ERROR',
                name: 'zevbtgtpvqfxvfljailg2qenli2qog13t8eijvvszejawdnhfpwxe2vrzpiyumsfv31mn7mwp32s96xw3inyfnrhw97vn5j0254dnfzkst7l9m288rp0zzfrty63wzdnthm56uvco0iy6qgjjhbkcgyygasgn69dm4rk2bmpzav2s4ego47xrcqecva16zv5emuyjfez49l44yww4o71etfnstjisid950sak0d0r0hkhed18coge8n7klikmt8',
                returnCode: 3453032644,
                node: 'l4mt5v4z0g077uym33jnne0v3koj4wv065bcw01iiftajcdqfcj3frdsgfl2up2bmmapacz86fd728y4i9jzrle20mafnd1k0r1xkvx18cs423og5hzp0ppzp52d12s0umwtv6nqzb7udy7riaj3bg5vo1kjxr2w',
                user: 'hu44dknc6eq8d3hmbqrm2ozh5ms7os7pwc3kboakq04eta4b22s5av5zp0ghpiflk9rh8orfv5b9g13vkkz5d6lht2lof17j1nwc85x26sosi64vadcatut2q1uck7naijsjwwwhk8ystlyba7dp86yzegwdhrr754ie09av43wy2k88ybiycf57uf038ineoy2vdmudgbn8i8gewig701m4ojbtium87599wm4jfa2r9rqin1x3zwhqgw0o7hk',
                startAt: '2020-08-04 17:13:24',
                endAt: '2020-08-04 13:05:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 't8e259y2ajhn7hxetq0w6kqrlzj6xa23kvl8rknj33vqmzc7w4',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'd0751usg9xlgqjhhxb2hd',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 01:48:09',
                executionMonitoringStartAt: '2020-08-04 17:50:48',
                executionMonitoringEndAt: '2020-08-04 13:27:44',
                status: 'COMPLETED',
                name: 'bx2dmgd1ltpna4brhirpbw3t7zlsg2xlcklee18q5p6jib51bf5inz490bhu8z5p04l6116e3r9wuq1wxtvhg9qwjp6trj3fldzgwc7ujswrwv1zjqbfm0jbi10rawiw1sy8jgbacye86rwq1wfhwkhidi620tu1xx5s0jveqnsfwl7vfgyes2mxmv0nnqr45s5b4fzzcz7b84bycpssilb9bwx5oppijvr3ht6u6g2ik0xyb0ulwb360c7deja',
                returnCode: 4430144489,
                node: '652rbzv4512dtvu4u0923ch2e4lhap9rj7zlipqwhv2qv4h50c8z6ito086whieg9gk8hgrr4dfagckik3pbq399mv2na1op1v7eo41myi789phflqacfqhr4wqol4bwgss098ca1r7foj330ojljalsmxc18q7d',
                user: 'pcno1dj8rs80flam06skzm6bq8d6e0v4299pbz3zfgngn9veji8qtdhmokaob3dt8twd6lsfvygvm1jjs8pbc4jk2jfjzfh9x6tt5ml89dpg2qfv9l7bzzgkggabe2v8yfhhclsmjlst24zq9w4gvg1woskeg3tqvd9p3aqjeior94xypcl82a7rm7n2eg6l32qtswb6ckyj2wx1nwvbuu7spxiqp31xyjikmjfm1i04u5mhgdg0vepiobzkgjd',
                startAt: '2020-08-05 04:29:56',
                endAt: '2020-08-05 06:31:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'jprebxe5b3mqrly4kor7lpmnt9bpbnbhu46yj06lb955mhh2dm',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'pi1v9zmbt3ry6ae1mn7l',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 19:28:55',
                executionMonitoringStartAt: '2020-08-04 19:59:34',
                executionMonitoringEndAt: '2020-08-05 02:45:11',
                status: 'COMPLETED',
                name: 'fohc5korjl4onckk3z8te1hhm38sbffxl40y89c4g4wq58faocahagmw8efhwcx8a1aaitw10tr8twszlhjhmw41bujjr13crx1ctp36p9fhi3vl6hpysomgnhx47tft8jpna7km5pdgjn2g32mrlf5dhq7mt6cr2faooe2si6ag4kkwxrz01py3swl529dyc8c4jepc80vzou9bwrtooxkkl528bhwnrqpihi4h9pumoeon7725322we7l4x6lf',
                returnCode: 2367223182,
                node: 'gwwwjfjrbtv9m7tjfrt1dzj4fiydvga9ysci227kvuzf20x24mqycsirx2fpcrvw1pw7ixm8uz85ximzkdto8afoxflz7fovqovfxzbhgdlsadu24o7zuc6s299pgxinxqrcnr5vufqkuvmtxckzaevsypzjejs3',
                user: 'xwl3wch8g55xm1c3me59wp4eoo9u7nsgx0mjnzs1b9dwcm7hhvlw0uypcobqwrikv378lbhzwbr61la38lrprzso2sffvcgyxr45mhvkfwcva3syevbsuedbgxw8yv2h40e27l34bi4cz8ibx3bm1eh2comdj5rocvn8i5hotuvasyrspljyxx69okjrwc9mtv1dhu1nmxzbpsop2yvdasr50nypmssts2timzf027oajioh038cg46klgrfrfp',
                startAt: '2020-08-04 17:53:35',
                endAt: '2020-08-04 15:34:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailReturnCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'knfpa8fl2gsldz2dkkyjjjtwd7r2a5iledyubxx595bx8qev0c',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: '9b1wnv2watkwk5d65ivr',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 02:17:52',
                executionMonitoringStartAt: '2020-08-05 05:41:08',
                executionMonitoringEndAt: '2020-08-04 13:06:08',
                status: 'ERROR',
                name: 'q8083ewo53kx4xk07en8a598lqdx2gqkyrl9h3s36tqrthmak7v1jug430u1frxd8pb1o5w69imk1shzaq2zmc58adev84z0z2smozuxuu2psh06mihhdpw4p33ewhkf4eqryo3i6n9m82rrhluhuum9nsb8c5qdwchy6qt9hymigwg1jk9z3k0ogfxl4c3a6wpjly7zxqijp1vid7sw1cx9aq60xqd2k7mwbofcwz638fehttpjwz8zqolikkv',
                returnCode: 77130635543,
                node: '5f146jl8f99k7x9czfw0o8onmuvccs09t5me085sh96shyk78yrfjy3r53d2ztbz2ch4nmy8810s4a77t74aoswhweealoik8mc9tnrqo5eda4ux82gqxluxww7ia203u1btv1q7j27wye5s327psr8k8xu6xjpi',
                user: 'pbahx78xaeltylkiyruic1re61aamnjvk7ixtpqynu7xa5phj0yka717lxk4v25kt5e0uacs0zf1f0t9mtk8fan6fqiybp4qd9fin00w6dltcymnxwdgf9sp97qfxz331wpguo9je4fxxkyyisi0q4by1zy40wrwff294jwsgcrfxx5abx70pu62qz6752eu51fqsje3tx59eanlj283bhf29otze3dr49cqtsj08atgza0xgtoqj7zyv1aqk58',
                startAt: '2020-08-05 04:25:05',
                endAt: '2020-08-05 07:40:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailNode is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 't1ngw22m21w9ch1mx9fekd8wk8031ckvby0ew0rlgbpnvk2vr9',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'm8pcp7p0zyaq2274b2m1',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 20:07:12',
                executionMonitoringStartAt: '2020-08-05 05:32:02',
                executionMonitoringEndAt: '2020-08-04 19:25:54',
                status: 'ERROR',
                name: 'cjkl6n7nmf7ulncwkzk85ljapsq5dg1cu6jnueks5gxo3iuqrfto4bwlr6zsi2nx6b60u29gin3y2gj1cs7ndkjj9ghkuktkws8u92g26st7myelmdp0y2eo07fhu3pbxevcxb4nkg6mn5pjx5hxgtcvq3gws1v9u9n1n8j0gun7h2mrixrqdh2rrhde0a0v6pc5tijw8tpq222yk5x4l3lu1o8lz94eqi0u5pe3lct0gst3fuio02anuasq12c',
                returnCode: 2953987565,
                node: '8ccw584un5b9imhle4jwen44ijywx82t3p3k35clmjqrmmmxx5mgd4ji1lqzfd8lkj5zwprkm2284rig45z5t9tdht5u2d91sapk1wb2hnrwclb96ln62oq9llo4bma86n0c31wfyiz0biwgh9fb6elimyshxf52u',
                user: 'ge11lxchup3n2culajvmk0qhvuqmqbyowhanp0430ylz7j6h3yzszlt2nd9y8p9wo1ovttcz5v0l8lfnbs63d07zwi6avesea0xjhhecnaorn3qqr9n9uz8zjs3a9jdvhzow2xxd49yf2zp882bazn8n1kybzywxcqm69sg1io85fvyvy9qmfpr6mykdinw3d1meqyeokip0b1axjlrchccp13mwsktrc648iku325gd9zio0aesl0n5zd0z7ga',
                startAt: '2020-08-04 10:00:29',
                endAt: '2020-08-05 05:15:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailNode is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailUser is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'c7nfgy092om2efo0gxxuz82wd3r1lmeyx536yjz7pedkse8lsv',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'gw24jkvybzxte5vrqw0n',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:42:04',
                executionMonitoringStartAt: '2020-08-04 10:40:38',
                executionMonitoringEndAt: '2020-08-04 17:05:01',
                status: 'CANCELLED',
                name: '1szrjz9ikr3jj12ej3q4ck7fhf1izpju5k8700ahv9abgyxfg8htcc8xnj2utqusdy8kkcofpmgo68bux9hioq9s1tgwjlniykigabvazqvr7bvxe45180xm454ft3jckwlsd42zpyyk28684ibmcnvl6dypnhe8v3bd7etkpod0udhmgi5la1x7eiqm61orj5u2vca69fycgpdeav417twukh8exxgpugv6bx4hwck2x3r4wfdoibs89phubs7',
                returnCode: 8911582601,
                node: 'sw8f7gz28bamjxp7lyumkfppzn7pj6rao9nnvbkrip1vi4zvfuj4drnksms4cq38j29kxmexewt7sq5gtvg7sl7ge3rbbua976feq48gl4fg4bfopf1ynehkcycvz407v6btvnfxc89p2vwlmpeawzhomh3t0yay',
                user: 'y2zoenfi1ztgdhoija6h9h0d2uydktru6w8cgs844as0yxvvtuherovgq1ftzonaf6xgebalivm6lvtbrxq4r0m2iy8ahronz2rrcbur16osquyn13o3masws35pnlejmcw3i9ggg5uco5cirbha0n0w8rsd3tnqblsu08qwzjex9zbfgxrgsn753ee9uqco2o91f3ap05un1ckweovmxuxzo6xtpqsehf38go78g55fbw78hu8d7qoex7yrhqpb',
                startAt: '2020-08-04 16:00:51',
                endAt: '2020-08-04 21:43:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailUser is too large, has a maximum length of 255');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailReturnCode has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'c36b77ykxbefxbebk36pq9bfljr8e3ffyafqpbe6nvp2xxfew9',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'i4thumcnaqfzetaqmneb',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-05 05:41:07',
                executionMonitoringStartAt: '2020-08-04 10:09:08',
                executionMonitoringEndAt: '2020-08-04 13:52:05',
                status: 'ERROR',
                name: 'n0qipiupu39rufm6fm76prtxt3ug3w6sgm9mvhal7kewatdclky2mxk455jxye33rc67c2kof8c0sqdeagsqurl3hk4ukrh2gw4ky8cfokkw9te1t802a1h2l4noe893hewsfkcpdk8rppnljesjelbah2v1uaelrffwpiu1e8i548q0vkou76esjrb3pd3p6uwxduh4aais7dbevnd7gnn4wvc2ljbv7prtpghpf36ylz8qqw1ewo7iwcpwv6k',
                returnCode: 100.10,
                node: 'xf6pnjuwq9qiuezyla45apczbdo0suauhephncbqurn4n1aipdd1s4r83ohcqb0keme7yu27pl9yppbcljrqw7t4i0mr9pntytnnitk0aulr9u6pyj738xwo85fn1f7u6xtsnk8wku1k6pdkwjntm3bmcf5gb0g6',
                user: 'aqg1phyrtnuqwezlq0fqty0rx1qqkzcshmdqbikkdklq5h2kd5blenr7fjibn1zb6e7ctgbhdc7mxzjhopnzohijmooxbxpv2ry17uboyuual4sv5opern3w9dv8paky8uorkknru008w8w1vjcfib7fmxftn5oewlf9dola5wl0iq3taxxzvam3zvvmrb82e9sxl9w9l4hib76vbtkb83uiqqxuv4rea5vozy8fvyunwnmgfwd8yl2tk2587mq',
                startAt: '2020-08-05 06:03:56',
                endAt: '2020-08-04 09:13:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode has to be a integer value');
            });
    });
    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'y91udjnswsql4tkzmc198icfrtm83exi0x213s5w7tj8xvuby8',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'iqck7ljuox9jkqjc4595',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-05 06:36:50',
                executionMonitoringStartAt: '2020-08-04 15:08:19',
                executionMonitoringEndAt: '2020-08-04 21:47:05',
                status: 'ERROR',
                name: 'r55ps6qu7j9e9abmb7z9b5dcshsnswk96srzzm96tev8mxym17z1sdhkv64ba9q5fwhgap0qcen7wugxlgxb3h7x7zluwd4h8b0xk2o3a259lakqahofghi1axnnqz3pr16r1dmt22d9yse415u5td7j7fg2v30r7nz0sz9uuu2cwwi6hgzvwrdn8cb6iny3zvdzvik5ennrt4a0zwzjp9awxxlimm3egkv11zl56f2h0ujort36wnacdmpkpqs',
                returnCode: 9552153800,
                node: '69cgnyuni7dsd49nrs1tddrk4pc9q9ci91n1q3xzloz7jv1eyt3yhtw64wxgs9m4co7xvgt6101k18oyu74csmardm2rrkghu92ldrnkpzsnjw6hnja9lb3wn2g1g0d2p8m1tzjlsaj7bcnaq15m4748a85socd3',
                user: 'ydxqym9g3ly9gkyanry4jirkcxl6xtzh65w5xji35hzlu7ticdamt9889nemu08bplux9wbn5ry72x8f8a2up1sgqx8jp4ucjgqm9lwjud1kvo21beue3y6bktzj9q8nrhrbtw2n9h7ewwt0k1qzyskmzybelg8fsll3k3g10sfnin3c06mhr898ngtn4ugp5o66c9jfqgqvxjj3tnsge0zdrc3pgyvrienbost4zvz6k4bys677yyzipajk0hg',
                startAt: '2020-08-04 20:25:43',
                endAt: '2020-08-05 06:50:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus has to be a enum option of CANCELLED, COMPLETED, ERROR`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'q4w1ecfua5uehx3de3vo228jx1op64orusk0el2gihvqcg5mha',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'hjxhrb6zf9q8b3zg4hrn',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 11:53:28',
                executionMonitoringStartAt: '2020-08-05 06:59:42',
                executionMonitoringEndAt: '2020-08-05 00:04:11',
                status: 'XXXX',
                name: 'nylvj7onfaz6xyv12i59y4jo1tn6ivx1n18lytevojuvepqz0k8lo4phbrqwjrdd949m7cder4b295ntzmc7snlidgk67osezdhhdwrm9bvk8nihsndlsnmdug213a9uzksgqost6mvncuikqh268i80xcbsjon32z1l6zxyesf5h67rtgvl1thpzm11xja9vppzi5gva3cr4txllwdqycw8vt48ejafnq9hetjm8wi4t0byr9eqa9vofjkgyvl',
                returnCode: 8996972450,
                node: '9c0khwfu0rt8n9fgqq1nwmhdckq7vo1n0dcigbhti52l42no252qipj4b3829tz82r0ugvtgr9jlc9mojf1n0ikf7snmo3q4ff1q4rvu7zcn9q6zcreuhwrufznvampi6xb67yjae5cnbc7ng9zidzxr1jdld1nq',
                user: 'k244ebts0mo32um2m82n7c29wv796uv3gshi0456mfaejdqu9hsj9sgjvctelk545xfi54g0ldblhrvihoegtj6fkwxy3pvvs6vemr3cgk7njo48xec4z1fc1jtqi4g1zcll2fbjbl0r9psp9praz1id5t8z014nnfx5s2dmupc9ohpewr0knzrt9f04fc0q4dqjftdiacs3qbd4ye1qo2je14mligh4t9is9r95u6km8n6fjbwwue7kw04gtfd',
                startAt: '2020-08-05 02:48:59',
                endAt: '2020-08-04 17:01:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus has to be any of this options: CANCELLED, COMPLETED, ERROR');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'u1owv8kg2fift4vlo07r9hcb11hry0mnnv1tmo7nhf3sl7fmxb',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'z2srvy8q8i8fdi9e1jyc',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-04 10:23:33',
                executionMonitoringEndAt: '2020-08-04 13:24:24',
                status: 'COMPLETED',
                name: 'ocgrc2bsf6nrsbn3evtzbztg4cybqovf46p6vsgrhpc4fq79js0gulqybvtec3xubjure5zp30rgl7dxwgne0qgt801o4xpuocyhpp037owmd4iaj2u25xfrzfp95c8arqf6mzlitwgodaw1jaq81b58v17602fajpvf78v8brxg0hkszj1l5x9cnvo5ihmcyvjx712k0n7epm6xdq1ln0p5j7ceaj5i56sybk9bnhhq8a251z7tdr8rkj7qnsg',
                returnCode: 2623404837,
                node: 'cg6eqxgz6024cvn31jbf2f0c5ddq6xat107nn2p9n4zwqn0lu1fa8kd3uy4zn49ffa5f6j5ni870nf2c1qtkag37uod3ooktjg6nsafze9lnontabm28t8jygxw5yfkp0tges5sjsvn777aopzc7vawj2pwmvo5w',
                user: 'szztmr4k5wz2ksajv68miwrvbhgniw7tdv8rpos7k29go3ya24iifrrtw0e3wjazfnfd657f0efgdmnhj2qreci7wj46b7p74is6bt0zk3wm3paqduhe21i8bbgh8w2gfw9jigviyarpqix115n43y4oswaveh1d1bdn0aoirydv9nffn9y1lxl3qa4cnd8bhj5v4z921vmqjx8sob07tza0kcsi28hv51154aw5oi6b923lzyg221vbu94e7ow',
                startAt: '2020-08-05 06:19:56',
                endAt: '2020-08-05 08:03:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: '9cnqzrdfiwpji0tsp4c8tc3339q09fujn0usa01kg7jfeirrif',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'b59s60koon8pvoui2v80',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 23:57:11',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-04 11:30:07',
                status: 'CANCELLED',
                name: 'vzjghcd944e6yi3o4ccb1j1ra42zag2ocsxwvp0yuzevx926m3xt59b9vpyclvokw4xkzh6rk7xtzrpyp2psjamqp5ggg7ot5gpxytayogxwjmqltmsl8rm9pth3nxgh2ic5335fc96z9g194yzf72tvvehnf4zbuq5y15e1j9lq737sn4xfq49uaxbzxyiuci1pa4al22h3i9rh70q0vklv5rymf59oho52stihmkcnv9rweanzoql16rw67w6',
                returnCode: 1548574079,
                node: 'h6d0zab0ko8a8po2ftlukfu06m2vuecs6b049zawzpn7b27d4efcq4ac36iitbik949lkjhezkn24d5xdufcv2hd60pphdzn9krx9tyh07pqin6c2vnshqa51kcew5w4pv9vn87lpu5fy8ja8a6x836ilmzhbeye',
                user: 'a84ea5pv730i8mksngp8171s4zw0e1bd3qtij0y74zroeomuklpci7mz0e683w7gz9o5pitqaya8w8jnn0dlormd98xzgb2w8oa85gdh4t4fnks7cyqslli7qh55833i15cgifgpo3qsorkjne67r2wox5ljl6785ruzyjntzb69bnxenzome2ehq0gi9ji5f8y26bz2z96abb11dzdi0exzvczpfcelxrcludg69i95wba4xqttciio8i4o2wj',
                startAt: '2020-08-04 11:02:24',
                endAt: '2020-08-05 07:48:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'h6cniwqrx55imrb9pfxxtuqeb566xxih85b570donsoy0qjhus',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: '7zib7kgl6cadd7az5dxl',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 06:11:22',
                executionMonitoringStartAt: '2020-08-04 10:52:42',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'COMPLETED',
                name: 'qmiesmw7t1es6y4092mgbke3362ea8caw105ml0wekeittrafb4h5nll1hcl2akva182kvscjjl1ukl415lvswu1264l331v7zamnta766rqdcygldp5kbe3jyk1bcskv9cnka4j9wbbc69joho4tzbyrnkkqvhanirg5fmjlpnrhfk9cugnroukz03yeyf60fndvwxbj3dcws1psff40kyooxx1mbq8mt0q8rjtamomztpwh7r6h6keewr9yax',
                returnCode: 5394271471,
                node: 'km8z8hjs3isp765710pxmxu7qheuoq90r392p2yluxvn78fjt65y6wdppfgcqsu9wg6v700xovpw4z5556m9vf4k00jb2oy0f09warzw22neg1nlg7hyhsqf128sxa2zil3lojbzx8ef1h4ge8udi4sa9w3px5yk',
                user: '5d4rz5hqwi643piqulfbd0s7diiso17cbpp4gltz5687wthcr4itu6fvuy1t6prq3go7413iahq1m0ux478ojbspikcawqlcmtotwl2c3bsuzfbn7ugg8a0qrv0zknhkwcztnw5snwyqz6npquhoknzmcmrjm0fx3bgjseqkp9ih5fgu39tockkxqn6agg75n5smjp10jgtm9b4chlk6bo9z4yjm8xwp1k26gddq2x5x7e0tqrjvn6pvjdr6xi2',
                startAt: '2020-08-05 05:41:25',
                endAt: '2020-08-05 02:49:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'csoto35ug5o8dsxn10ihf1y2huc2ahmsrjdpo21wtb9pgtyd9y',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: 'n3ic4cxm8gje7jktcnmw',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 02:55:27',
                executionMonitoringStartAt: '2020-08-05 01:18:37',
                executionMonitoringEndAt: '2020-08-05 00:10:31',
                status: 'ERROR',
                name: 'n1k23jaiq6r877nb35r4rw2kx0k3vhb4qszadz89lq1uv9d61ctwss3h9jh7csozz07cp9txz4jx8e2jb6yeida8yq3v6yv1atzx2jbyzpoqryc1ydvdfrdp8hyouieu5ai2ikcir1qewwvjpao9qx2bl2mkcvh3e8qt29ov01t5y2izb6csdkip2ht64nyuh1he0s8nb9rddzveo09t56uw9cwbj7g3qgcum74982fy5e5vxj1m974yzczuj30',
                returnCode: 8017025416,
                node: 't9nhnog6hc8jg2bkxud1cwspu04suk5cqwbp5xtgjpa3861vl5twjlrh9hih1du77qkqoahyj9cfbgd7nsynt5my3r1l2impeya5ar4m99pt67v035cbsot1wuigcaqgbznulacrsr04xgy3hxhpqid6f8hvxmuk',
                user: '0lhkykg4595zvjnxz1zf62dgz6l77z0gmd6hib2b8ynagsu0ur6zfkxg0dp4l5o62mn2wf1n1stc4fjm4q00obumkad2ampjcy993sl9qu4myyxlko193yks5ak3e2ow3nwtsaask64uv9nlbq7v94avk7yrm27lgpiyv9taj1ba8qfqxe2o8fzpprp2igs461vagcu5x0kbfhp9a9jf46a5y3szlh629rvkyjiokqaus7k392qmbmqtn190jly',
                startAt: 'XXXXXXXX',
                endAt: '2020-08-05 05:45:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: '6436p3l162lvee1vxsdhyws5nu6y43qk6jfu84758m915wolz0',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: '551vlew4vh5crsqa7fcq',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 08:14:06',
                executionMonitoringStartAt: '2020-08-04 23:02:41',
                executionMonitoringEndAt: '2020-08-04 15:52:17',
                status: 'COMPLETED',
                name: 'o2uvx4obtrc9j2c4j7c5inzosr4ywfdbz38yrp5rdr650e9teapkut1kwi0te9yj875v22o5mlvcztix70zrql3ci04d2a52gqy3lcsacu1ae9mbfh3bb88xx55osg8xurfqs9pqr1aet1gr07a8zo2ocs60mtd2phmgywtkmjn1t4ymbinzw38rvrhm6r1zbjg6pexlxs26ubfzsyy3hy13xndkx822oco8ds2uwn79kqibwqvxz77d1c4kbxf',
                returnCode: 7483799576,
                node: 'uvh78d8qk7ibp9d9s5n3ke9nqnw8gdwxehvw7tnczj9odies4k4ttou6ofbjdnu1mq6krmpt7ph94b61t8dyud09m5zn0xzz6t1zqu1o10mu6gfejn4judyqqmdw6yclw23bc7hsogx5z7jyjekjnpakiirvhj3w',
                user: '60sxvh6qywxsurcq3yzv7yuggwf26jgd8bvuq7rxrq6a9s43o7nl27h7nqo5uwmjhgx62804pbmur4eglt2y3w2c1xihr11wc2nw8ys29ivrwjic8or45nzp4h4um1l7gx90ic08tyarf4rsh42xjzh8b30g1q5cxy6jilnlt211ss5khamfva3stmetpd1pjnd7yp1bve87mfjul4gtjcalwhycl1dvzyf4np5zlzo3qqcor7vqjtg06x0l9v8',
                startAt: '2020-08-04 20:44:00',
                endAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'qih55v8cw42m7t78ysdxkmju50gcpwlyaitcm7s4dmned9i9jy',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: '420t58a619c1mztelz4h',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 22:31:40',
                executionMonitoringStartAt: '2020-08-04 17:26:26',
                executionMonitoringEndAt: '2020-08-04 21:18:18',
                status: 'COMPLETED',
                name: 'obeqlawo035hwotjea0n8tqtd8hlklnqvmsahjveqzuciwfcnvc4hljm3nle9j60m42qy474y96kwkrttbmy6hwsm41g33pt3rqmfuhyf72dxhvyz3846cdxo1qp8cv8am5u4j5rhl7uqbbkbd4bm6z4dx6gfttdgtxxfqvq0ib8j1ma6p6vxct82hock82badpu57z0o6rtsyabhofy8vfujskqg0k5xibiy6tjs0bcn2ya2k7x621uf56fpq6',
                returnCode: 7198422044,
                node: '77ohewibrha202k604bxtzhd8m3443fkvhxt91521uidtj48khjlx4s97eq66g3ncriyl7rflha6tejr5fdfnzfqjty9nkjmxb6rd1pty57cf7ap489lgu7oiiclmpnpnwcohznhmtfi88c3x7f4148gb0xqllzm',
                user: 'n6sgeqaj912mrox79j4l1yyxoojy9gdamqewv4esor3b8acw4t6fwzcadq7w12g9eow0y4ol0c0ehec7c6kn3hkvwpqbt62vmly0b2zp877z4u92y1jugreyn9sl6zcajo6zgi41rtrf7m477ovf6agkwzbh807idfhq3njedl679kpm4zpo88tr6wuedvz1hpjqmsbkhtsb90cbf5fl8v4sa2ya5s7hfjuz70o8kgnq7n932z4s5rtykguosnt',
                startAt: '2020-08-04 16:34:59',
                endAt: '2020-08-04 10:03:40',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/jobs-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-detail/paginate')
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

    test(`/REST:GET bplus-it-sappi/job-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'd0974d6a-8716-4157-ac6f-b6f498cbb295'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e'));
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/3c52c51d-34f0-478d-861c-0bc1a8406325')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/6b3b40f0-ae6c-4a17-b43b-43dae1751b9e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e'));
    });

    test(`/REST:GET bplus-it-sappi/jobs-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bde5d7d7-86b9-414c-a5c8-1fb8b7f9e0c4',
                tenantId: '7baa8959-da58-4daa-96c5-7bb04a0238cb',
                tenantCode: '4pytwfdobk6ctfxj7bfoxbt6r25sl7o06y1kforowsatfqseia',
                systemId: '66250e95-916d-48ee-9802-823bee134225',
                systemName: 'at6sz1h24lk5u890w0q6',
                executionId: '1b80c42b-b23f-46fa-995c-68eeb6cc564d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 10:19:31',
                executionMonitoringStartAt: '2020-08-04 16:09:09',
                executionMonitoringEndAt: '2020-08-04 20:01:40',
                status: 'ERROR',
                name: 'nspbfokdrdbkhins33rrw6jbfqcayrabk5f6laur4esxxp3j0np8au3jqj2rgebwf5yxbltoctpl0c7wi3k95yti7jren5zoof6jq1qe6ppwrj6yilnirl49os6k3hu5xyk3sty475h9q8n44vmira84umnf3rslwn09p6hbh9hzo40ldqdsntn6a4gc1f80k8v2ax88die8mopd905hglbl9vqfd1ya553gop0vi9lab6o9u3y69ie9lkg2b26',
                returnCode: 1484192008,
                node: 'blm74e8ylpiw6thd1gzt6ojgm9r4fc18yu14bgeqppthxb3r94wz5cafp1b1r0sohcd2krht6fvdx8s78wq1zwzzf00g70m91skzru9ounikynqvkoyezcl864mg0641588hqlc6js1g6bavsyc7lrtjl8wdit9r',
                user: '8rygh0kv9orj9lev0l04v95n8a83ylc5tzqojxagp0j64mqbbk2k9mxgn2rs1qh1d920vd9qnikqkgdcuwgpgibqc5b1g3jq16d3cg6yuylvze1jlvmf0fv4yo37if2ez9lx111rgs0u1q1lnwp08urwm4vdnidlajqd329dyc68wuh2n1kq9matw2rfv0lmp25t93pzm5mfpljmh678tdaobqq3fpi3n122lbkta8568tkq0cpxef5pcpkh9ky',
                startAt: '2020-08-04 17:20:10',
                endAt: '2020-08-04 17:44:30',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                tenantCode: 'w95xyzf6023ardulrcvmvopmeyeqhhcvhpnmxg1l9i5j4nmv7b',
                systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                systemName: '5wi7w3v70h4tj5jbm843',
                executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-05 06:26:50',
                executionMonitoringStartAt: '2020-08-04 16:41:25',
                executionMonitoringEndAt: '2020-08-05 08:55:11',
                status: 'COMPLETED',
                name: '94lk4fpj2uxpdj84tio0ifaoayt6rqh6gij6lk9li7p99tyoplydmpymxjmvld6i3yw6gc801e1i40hfs7qhgy5g9s6312ydb2w1doeexzymzaczmjy7nktpca0vnb2hs9znc7b9d6y2jg2jbuuib1n6qlbyierofcsypauns60n575l3s1b6dmw0vxpang8j7eprnr6702ztor4qxtbs48mdthnjsj4i5wggqgu7rajpkqjvdbcp3ew4k72dns',
                returnCode: 9234172113,
                node: 'ayrel1o7bagpsu1840ib9gsqbvtw26kh753xnu01hmmuf4qbxnhtzjv7rn3u9kzvhit697vfjlmd5xxe0lmeoqwb0wbafdqr8lyw0m40glm8liqbnl63vrk73guhrre1fef72wmcl1ataisdguil2an1rczgy60c',
                user: 'ky2v31d81cyvsmpkhdsaw3cdqyokdubje2sl9zbr9s5jiftkrfszux39am7ctaf8zo18yopqx4k9sy6nroew4bu2pf9n3v2pi0pxnuyx8dhbttnh2jiuju5qk6mniw3pb6ar30hr8743gvruumsf6aj515mmf1g6vdpr7ybf8yi5btn32017il785u00jlnpd1ssgwpf73titnd5t4nxrj0psc7vdypy0xw36u0f2sinn6emnhgw3sgqo85aphh',
                startAt: '2020-08-05 08:20:10',
                endAt: '2020-08-05 06:49:28',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/79c710db-c8c6-46d0-8b42-34a0ee7af9c6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/6b3b40f0-ae6c-4a17-b43b-43dae1751b9e')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateJobDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobDetailInput!)
                    {
                        bplusItSappiCreateJobDetail (payload:$payload)
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

    test(`/GraphQL bplusItSappiCreateJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobDetailInput!)
                    {
                        bplusItSappiCreateJobDetail (payload:$payload)
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
                        id: '5e688fee-6d5a-455b-84e5-d0e63e995c44',
                        tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                        tenantCode: 'exxzu5emulurq6ihbtgagikyaoeezq06rgnfitlff0j8jw1h2w',
                        systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                        systemName: '9r2c1gqkqe4kvn2hyj56',
                        executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 13:35:12',
                        executionMonitoringStartAt: '2020-08-04 16:51:01',
                        executionMonitoringEndAt: '2020-08-04 11:32:02',
                        status: 'ERROR',
                        name: 'h81s8fjvdpc1nm4ljodncwj3j1xfc6tgpj17h5z9pea1nif4neidpx75sq7o5v1snz6i3j1ab4z60c31kzxa0g3de4nj5dt8pap5z0puhyixlsg7vlnp8a18la8axo8khq8cb472ji4io0mkvwon0hex4iurmzwcf7r0muvrp2ow2d9nfmz3lp4n7cu0h5u8bkjdmyta57x9uzdurqws9i4gldsen1l85sb1yozjdlqv4r7v3njnunggs7811ir',
                        returnCode: 1585221134,
                        node: '1mttig3foas2lsa6c1sly2zg57dqt6p6yy83gtkcnc6er0yett1vut1xa2f03x59iyxpjx2nwdesn97pz5w204hw9d77xqrgcne9ot7ow5rpine42e81ysbnc4swowdysnxby7kij8ecgtssadua6cngaqqc1usx',
                        user: 'h4pq819zlodpwn1qhmx9p3jkgz470vsf37q9c07hebrujvoqnosadigesyhcii1s11is5fw6uw6c8iugjmo49ioixm9qo1q2w5dp3ezuwz2f8irit5smg9ohwhnu2nq9t68v42stfnvm7ew2yeuvqcjxgkpvd7macim42hxwpqcycikbdqz16gjj1rj22oqp6fk88mb89q5issvlpwp1ezh024pvdru831gql5gdwemfpdlpis7oc3k6hjxi488',
                        startAt: '2020-08-04 20:59:11',
                        endAt: '2020-08-04 22:46:10',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '5e688fee-6d5a-455b-84e5-d0e63e995c44');
            });
    });

    test(`/GraphQL bplusItSappiPaginateJobsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateJobsDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateJobsDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindJobDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobDetail (query:$query)
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '3cf7268f-2070-4943-a4fe-adabf812fc1d'
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

    test(`/GraphQL bplusItSappiFindJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobDetail (query:$query)
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('6b3b40f0-ae6c-4a17-b43b-43dae1751b9e');
            });
    });

    test(`/GraphQL bplusItSappiFindJobDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobDetailById (id:$id)
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
                    id: 'f29eff64-440d-4f06-91bf-e70c4ee24532'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindJobDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobDetailById (id:$id)
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
                    id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('6b3b40f0-ae6c-4a17-b43b-43dae1751b9e');
            });
    });

    test(`/GraphQL bplusItSappiGetJobsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetJobsDetail (query:$query)
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
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetJobsDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateJobDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobDetailInput!)
                    {
                        bplusItSappiUpdateJobDetail (payload:$payload)
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
                        
                        id: '80fb7910-0e26-43cd-90a1-6ec4901a657c',
                        tenantId: '79f7423a-8076-4fe9-a7f1-0d86fc736f85',
                        tenantCode: '8g22nmum0sunbk36tsesrgeg6dcqqo1cml1ky98fdg1z2us14d',
                        systemId: '8a279fd3-6715-40bf-b119-e89adb3a064f',
                        systemName: 'xxlcefeulikhh4cfdh89',
                        executionId: '01e6d052-a421-4676-bb35-5916bf064ef6',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 10:58:32',
                        executionMonitoringStartAt: '2020-08-04 18:19:57',
                        executionMonitoringEndAt: '2020-08-04 21:39:56',
                        status: 'CANCELLED',
                        name: 'z0n7m0chfs6527dk34gb4byjrdav8ofxn9j976h9oy51gt1aecwli0udb8d33fyiuoxfix0vor6wuz0n3uj4074tk52a7pcn5xuefqb8n7fegsyc58f32g9hb5idsp06ixib8x0jp0jjfhojd1b156tj1s7utz13x1muqb1odo9mcodp0zadfj9y8umojcv92y0dturdarqqhfiuwc59x9qwockyyccmegwkgt41xc4jgw96tmpg0nm7if94ch2',
                        returnCode: 9715887314,
                        node: '1mmgw5bwmhf5cx4h38k900pqnc26dm8ajbxs43hp7wbhu9dbvcf19hodhcey8vj3vc3tvw97uw4bstc3mgdwiotb98t9teref7qmjs0va1tpcd56d9atkz6bc4th5cnds7ukg5i884surdc9axihwteqz6q2rl8a',
                        user: 'ttkx9bphac0mlrts87g7l3o64sipkx490omdv9cwkqec0yeti6r7rxjsf003e25yd6ah3j2113lvno3att8zya9dag3ufdylyiwll56v8w6goxraevlypob4vhj79wc8z9islxdjts37at407l4qaaledfcv93x4pjq8n8ui8501ugs23vcne4lzolkdp10ez6aipj7eh34vu82zssh6kpswbehyfb98gxz9raorv443xongas9ealcdlqv3owu',
                        startAt: '2020-08-05 08:39:19',
                        endAt: '2020-08-04 20:16:44',
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

    test(`/GraphQL bplusItSappiUpdateJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobDetailInput!)
                    {
                        bplusItSappiUpdateJobDetail (payload:$payload)
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
                        
                        id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e',
                        tenantId: '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977',
                        tenantCode: '6jov11ndd4ii3p9b09mpg3phpkrx6ogujgvw8wc6e70zypky23',
                        systemId: '6abd2e32-5f16-409f-94a4-7df6b437ccb6',
                        systemName: 'mmpfjofem0fvglwk8dk8',
                        executionId: 'f772aa06-83fa-4847-96e0-6f7a3cc3922e',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-04 16:50:00',
                        executionMonitoringStartAt: '2020-08-04 17:46:48',
                        executionMonitoringEndAt: '2020-08-04 22:11:38',
                        status: 'CANCELLED',
                        name: 'qzstcnjz6usi3hl4az1lsze1sjl0mhqhhax13jnq9jgutezbfknx958h2wo5xdjdvxf937c3m1tgjjsgtjmml5mgjaooks1asstjg3vl1heiw3yc1arxel3hxyw6euv3ldkf2bsccks5knudfw0c0qu6w9o4c61gdfke59cxt8udx1nd6k1vunepcum2in881oq42kly4f90n598cn527uyn0659cootxvq8hmnmydlsji09tx12en82i913nm5',
                        returnCode: 4279754171,
                        node: '28bgspyav2n14wiguh8njkfqjxvfompdpvpwl1hae475yv9aj75toom4j821m9pirhe1rym97im5by8vfxx77pm3kwd13to9wirjrxasles2blk3f5hbb4bubh1nkrk0tvi2zwb2gknz0kh7n20rciwdqx5q0om2',
                        user: 'eqfoiymj3nj4ngzup061k2745b8rpjk7h2p3103pthg2up35hn2xaousxa3vfzroo8xis7jpxbg2lyugs37hhc1f2w0puke3ysdfts9xe1okes5bd2wdrx1fmdwe6iyj4ybh0lihytexa0dkpuxw2yrbd1962caekz79j3hbldg6jey41711in3vgyw4nyi0bdzp4k8rujry7wt26pfg1vshv4isylkkl4b43q8uvo13koxn123q9hx9os8wjs3',
                        startAt: '2020-08-04 17:20:33',
                        endAt: '2020-08-05 08:17:28',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('6b3b40f0-ae6c-4a17-b43b-43dae1751b9e');
            });
    });

    test(`/GraphQL bplusItSappiDeleteJobDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobDetailById (id:$id)
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
                    id: '6ec55c4b-adb6-4b0e-9168-c42b9bae7709'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteJobDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobDetailById (id:$id)
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
                    id: '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('6b3b40f0-ae6c-4a17-b43b-43dae1751b9e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});