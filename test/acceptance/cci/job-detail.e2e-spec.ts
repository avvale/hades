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
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'tpkqu7xrbv9hzdi23jqyzqanvri59u3jtbsi52l8c1v26160o4',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'oshysns3hz8ca3pc4nm4',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 17:16:02',
                executionMonitoringStartAt: '2020-11-03 22:20:33',
                executionMonitoringEndAt: '2020-11-04 11:42:18',
                status: 'CANCELLED',
                name: 'oltv7goqiizwqjb2mdnb5pagbs05w2cpqq0daqn1vd5rek6hwyl6985t6dpqo1oey1ls0ghzok5zu7hhf5gkkqukwrym8yg2ou51pzomjjnt349ux7n6x1jb24zczg49osgs0s58q7h5lkznyjzk00tjsebnbmhne95cjfd36icwdtmlvde2vodykjzqoqrt2kno0d4u59c2bt1szja28ud27b4x3lltefevxzcbusndx552uiyslyyavdgdvm1',
                returnCode: 5695546557,
                node: '6k9mchvycef66xb4xme8t8fscajonyqlu19lfpfjbr6ofweql6kljirqngrgkqdxfiswmyg3mcnfeaoz7w0x45yd13u0q8ernsv0tb7vizmvdib1lctrj7ztuncgw1vxwv6ffjsdvzfk6cch7hnlbunkh2bts08q',
                user: 's2r63qlb022i1wnaly6xrezv87eeo56u5tiwfqi0iclxguafjuu7r8kvvo3ommerfz3avnlx0ofel41kbamsczbbw5m3pmjxijivs4bvfwjfyr56rtj0xx04te3sxqvpx95qaf8zuczvbgczw3q6d467plvteujsgkumc0lm0zxs16zwem1iti17l9m9j3z0dkre05q2nm7imftvb88nuzryk33jpixd51xst10jvm2yl0db40xb6la2hvkh5oa',
                startAt: '2020-11-04 08:43:58',
                endAt: '2020-11-04 17:54:45',
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
                
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: '7sh4n4fi5z9iyb8t5w2cdo7cm851uz5eflafjciphujbdr190x',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'h9p40ton7wfwqowshn1e',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:50:27',
                executionMonitoringStartAt: '2020-11-03 19:54:40',
                executionMonitoringEndAt: '2020-11-04 01:27:06',
                status: 'CANCELLED',
                name: 'n6nwu2zv46du8n6zhq1elulufmh208mhgf43qh9h7el4m37ezu26yn2umejbh9gjtpag9wbszda0gwr70vtx4kz99nf83jnzpwhj9kbo14j6odmvf1rd9i8v7w7zi1wb1ckl33nqf9xuefcb5ajy8nb2donp2si99he0880xp2q4np5zq6sl8biao5v34qnrcjw18l4lip50dn0pbfu45zakmolk5ipkd85t7dp4lm8wr4gh22zm2cumxwl5op6',
                returnCode: 6599843492,
                node: '0imusedpfb3ejid985qpesq6f22u4ujip1q62e614j4rdtkqesnx96ognaehhtq5q1t63axbmoiuamsg8qe97ymg40ex97ug3n2r2zhxrkb3vt15eaog6ca98unauctgn1f9lgfv22ya0mmbin05cwkfzt2gx7dv',
                user: '57wn8325b31w59nab1k9r97fnqj37o4d8r1f8fgvyi2na1bw8qan1tl86xser5y473mgfnx0amd8fn84z5y29sy3segsqxpt72jda7j6s6uqdh5s691ktd8svdpesxsj82oen8fmcc8a5ibd8n9jauewzf0v9t85cfbywfcnuqodo93eh9t8vpaz6zpz5z0lwuoyrvayw7c67ivtl1b3ulggtp6t005ywo9dt4a8f8jholkmszr6y6sizau6a96',
                startAt: '2020-11-04 11:22:33',
                endAt: '2020-11-04 07:27:16',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: null,
                tenantCode: 'lqu5fnjcr2meugavyjy23yzhklm8g4ag6rszodixan5464upfd',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'dxm89nlit85pa4xm3s4t',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:46:28',
                executionMonitoringStartAt: '2020-11-04 05:15:02',
                executionMonitoringEndAt: '2020-11-04 09:01:47',
                status: 'ERROR',
                name: 'i6y30per62v3f82q7uln5pqoxhpubfjnnf10luxxxfy0psrbt8sjfmln1l72671ch2641ixk728l38lzehbudpztka1xp8q2z7q2530behnqzuaa1tr11q9h8904nqgw07xtn83nyxs4dr01ui9j4a3h85gz5byu4rwhe4x9khuspgkr681d5fd2125f6y6ndaktekd7zol54bxt1enu0yt1sld145o1na17qmv0p8bc2qhfky4av5dnbrgwul8',
                returnCode: 4241250807,
                node: 'ln76ddnjcor8npzgbo10t3zc76k2y9i7qchvcbxm4cfhe4pmefcaew0vs4i246kyyyjvo9d38h87ccxbx6inqsgpl9mlda7ccbtsgipjrmbnyocb2zpnt22tfst9m67wg3w9it5azk9m3pjveg4rii0t7u8q9tg1',
                user: 'dud2jzv2nfgz7i2o8utin8qmdgnuoi6gu6h3w0sgu4tf9zxznrrf1xw17bm3smdz2wdsvaxe0g4wekzy9tgz7ukobivhv3gbgnrvxoh4l5jv98a0n3bgs60v50ipquosvnjpp8cqo8fdszku4tqx594ifiuz4nqpwb4bwdydy8mqjjs5fwus2x9kablc8st670ndoj9e96hz3stku4gknzdq1145k2v6jnyq70xaf0rhk4qz9qahk3flc68ebqr',
                startAt: '2020-11-04 04:04:05',
                endAt: '2020-11-03 21:19:08',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                
                tenantCode: '9izxij7y3meo97wrutzkcghtdn5zb1e8wn2n7vr7nqd215zl1p',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'ddmx0wpy6g2e1ha7znlg',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 13:39:02',
                executionMonitoringStartAt: '2020-11-03 21:28:27',
                executionMonitoringEndAt: '2020-11-04 04:46:05',
                status: 'COMPLETED',
                name: 'ufyxk6goh8qcxk3t1q7gxftmp129bcd2jatb6enr06ps6yjj4zu0kzzkvuflljf0zor3fr526354v1lci53bger945w9w19kiutl8aj7e0gy4gqxmivm9b0u91nvqn2wd6u479gundi3flj59b1jd2wobnqoxqrezore97vq7etm7z3eqn34yiuf8guhyt6j54ngyd9zse2yf0782mwqs6dolh9yhd7pdgukhn584djgacm3vwogkltqgjgkf5e',
                returnCode: 2253332293,
                node: 'jgrjwb3jrcxovxtvtt3nzkh635v5ujypsfci64zvnlnu205gtwiqc2r64p368vupgcsh95v0qsya0znxcg0tuxr05v2zwzharqgw954s5yizu754cu9de2o5djvwtaz7tf6y0g79rzme601hcrsxnhxkqs1phbnp',
                user: '8zdm89la3amkqq5w6uzfwtmtixq26pqq7w1x6ie02ei6ie14u1ndudhfx439g98egtkmprg2t9yrlfjyexliwl3beal9zfyh3ldx7l8dywjvv8c4k06z41rsljag635h2moz3eewkc21nlwvgc7vtd3igitkgrmvmajh5our8z4zdb7fujoask8394j73htkbp2jm17g1h4pyp37btism4q9xkkdh8icrqzadkr2794uf4kiweewle3d0lzszyl',
                startAt: '2020-11-04 05:14:56',
                endAt: '2020-11-04 06:02:32',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: null,
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'qfeuwqiazy6fyxph6zp2',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 08:32:51',
                executionMonitoringStartAt: '2020-11-03 22:22:22',
                executionMonitoringEndAt: '2020-11-03 20:14:29',
                status: 'COMPLETED',
                name: '1gjpgb6v8khdmj56obx0cx1wtfbd0n09c2qdfnw4vdvuwwp7bwu3e3giu3pz7l16dse10tccd597a7teqnen9n9nvs2relynv23qj7o7wb4gs4eaj346n6o2v8i3zc8wbnq0gs3iyq23wq3pg794yrbg547libbiqfrrw4a8s6iyparu27uwd1kv9pqbwuif0vhiu71xytkoaif6r6wcfakvu4tqsqh5qj1sewjv5i0ya87k4w1t0uw3rmsx5bz',
                returnCode: 1962515183,
                node: 'e3nau4kqer7wb64c9q18rymqvrhqjppqj5b5crho9xsqxeegrk32exh1e1g0vy8ptdrvww9tf6irdm7r194giq4w51oyq3dwvhro3xgejfvgpw0d6xtmzgxpf9f2v695a130nn106n5ts5dlg6uhqesf049zgem3',
                user: 'mbl213nf4ysj9ijbmymx9svdns66ep1436m8ets4eqxk5b3dgj1x5zjxhxmziyt97wknnv51x5qgtx4xoms1jzacd7iiit6umw61eyz65kmju5ohxt4ompla7q7v1k15loqbuhuwnwnyw6zuehq599crxh952mqvn8tt0iv33pjzdu64eacaw6ecnbo0aifbau3u1sxyobzqf8n3z41p0mu739gdea5wtf2tzmdv7god55fhxt4a6ont9fn44z0',
                startAt: '2020-11-04 10:37:05',
                endAt: '2020-11-04 08:33:50',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'ppb0ioonxnzoh1bkf61v',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 08:51:59',
                executionMonitoringStartAt: '2020-11-04 06:16:01',
                executionMonitoringEndAt: '2020-11-04 02:10:34',
                status: 'ERROR',
                name: 'waxdpi9u72em1el7wp940h6dbjnz14v1ln0k4648z4or9vbas64bsmonzpslsj63rpn0s6crdtsre2esunxbolslnw7sngjjafny0zjnxmezlbcurj9y5f7v4wiw1u8zzgu1wmo5ti9o8idgzxyhueq5l3qo71gr257zs9i34ndcyli6i2deyp5m1cyfswpn2ownc9vwxnaqllz0hrv4a9gxgydwc8f8uz75qalz55gq1oftm8w2ck2wg8g2bm0',
                returnCode: 2441414268,
                node: 'ulbfh22i0o13s3ljaxf3de6svvsjaklqvwzeiddeq28jxdfkbyqcncpag97jn8jhkxxlpc6hk3m9dqrrd41on9hv512howodo8hs7a3ls2molnz3fvgqws5xz068gl780wmnge40uhi9ifid6w67cmxn5pufvgh6',
                user: 'zhb5sonxpznnh8orl5plsh9i5a1135ck5zoyt4ruhlidou0k91c171w9f4hfm8si5b6rdxb7y6futrt0ao8lg1x86slzwfihtv5yxo6vtggvrec5q1u4p551624yv93n4zca3mmwc8i8830mj9uviltdf1y6se2hap9baidgb92rnq3bmn2tf6vnyqni7tseg6ehcv188eu1exry4zezshmjegw8dfoirrn3rgq36s1qo1kkypphuk0rikqr35t',
                startAt: '2020-11-04 11:26:40',
                endAt: '2020-11-04 08:55:16',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'ddh8z4tlphyzn4f1esbj898nla6icybzd8t7s7rl6rqxcry7zl',
                systemId: null,
                systemName: 'vojaysi6ujkhay0ejcwp',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:10:02',
                executionMonitoringStartAt: '2020-11-04 05:57:21',
                executionMonitoringEndAt: '2020-11-04 14:43:28',
                status: 'CANCELLED',
                name: 'up00bvjq4axz0qbx35payb7otgg9bganlc2dh6yuk4trejydoilw4uz3m7tn2b4sc67vm1g76yvmruaur6glkdqdj203jg8i6qalz5or71j544m1m129a1z28hrf3nv4lym1klu2oi4kfh3qd5t4x8r503wsfwxe2hf9fx56qzrmpy07sy8jll045kdnay9dru5idet0o0wwfiyvv7u0upnu26qx5tl9pq1lemiovpwp0fc4j3ol42s5b4rerfk',
                returnCode: 9866959818,
                node: '9r107sntp18y5vjh1ka463iga0ymal5fm6i40397pgikth6qphkfdne6jlzyuh6mti4ndgop9pfuk6qj1z2relxao7ygq70a2rhd6hkf2kdaxqnpqs1ivdttsv2uda8bse9mxer0iqmk55t58bz81ppuhldbceil',
                user: 'zz6n602429q5mypxd3zb61fzbha53idt6lo1akphp1d9ffmuxsdelr45ynw08de1kexfibbva0m9cm00jla6hg4nlh3yh35uj75u4kmi2ncnqf0yr8p0uomf9zwe0obxidhmlk47p4u6xzlcckexq3ckmllif20ut63p8zmc3sw4fhya9wc1dvia6e4zw45vopiwmq2zv87n7qjrxq0hsbqk6fmpjeen0r42fro1tydlctzbwqny0c5f62i9ce3',
                startAt: '2020-11-04 19:13:50',
                endAt: '2020-11-04 18:35:08',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'egffk9gx53yonfcuyms2hfpddytvc0kwpwzi4okc8ojk36w4at',
                
                systemName: 'mjqyqa392cqewsoodca6',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 08:15:18',
                executionMonitoringStartAt: '2020-11-04 15:36:46',
                executionMonitoringEndAt: '2020-11-04 17:47:12',
                status: 'CANCELLED',
                name: '1j620z4x08eg0dmn1ksosdiyge8rixokqnme907zugge3q4w3sfru0fnpc1zr7836u8cs1cnlhui6h6lpxh7furjmzbu96b5e67fjd1c0o2lmze4unh81bx9kfrsz3fseperudm9h4zuqqxjjl4jsfin8gg0aoi6uwdun0k3oe6p5ix1esbcxul719izkonbwh9nwysz0q3n821ymry0fj2vm28uhgfdhbt6r5rjjxum41pscptkf653unp9lnp',
                returnCode: 5564510379,
                node: 'mnhl2dghm9115sh02nuqtmu548yo1nbfgg7uvq0e5v8vonj3yajlj460cui66cssvp6ociznx646gzq3xl98ertq8eaam3mbjtvdv7um1p59iny93id4pns8lagutxaiunnw01fj3jv19otgm3vp48rvi7xgta60',
                user: 'gdg4zkq8vu7ioe1isiqs5yos8udk1w4goeenn7cdt4wj58rkbnaqo6vcrri0vnm63ttbggw05h1wrs5otq1mb9i7l0wfgycw8b3ng1ruwsszll4pkjle8628gqdgovncf6ix43ctakxv6en7j49k7nlt7uergntbd8ni25ffgjofa6ckxzpyudwvpnh7xnael9t3jjnmei1zbz9tswtzm2lgar1zmzu2ghu7yiopmjhjetlkdg67ihit7jtq7uk',
                startAt: '2020-11-04 15:06:21',
                endAt: '2020-11-04 11:03:42',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'a231b332466rfypck7fmalxf3aro9u68k28kozh51nu82wajm8',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: null,
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 19:16:03',
                executionMonitoringStartAt: '2020-11-04 19:18:04',
                executionMonitoringEndAt: '2020-11-04 14:33:09',
                status: 'ERROR',
                name: 'hfizlr9br8n7cr8uwwzp32f1ctv950c1v8rfk7q8bkk5ayhtc0jbjv7ztlwx5coxdyehsjw2qgm3883fppmocr0kpp60wdtdje4gcg80p3nykm3pg6lenxksl0lx9at5x02cdr5qtasoikzahk935nlzq8cd9rsa1w8qdmu6h2udbqtxcavi24y91vvy3z5v3q7d6pvcjc0gxngfpf7rs0n3vf9teq4oqc1if8st9qddec89s090wqg3qx3o0i1',
                returnCode: 1045303441,
                node: 'plh59c9us0rntfdt0rv1kpwkbyzvjkui9t04ohl7ubf9551os389g3tcxmrp3wokfalt05oa6sk4gc3p3ho2cxbync4ak22jiqpasndd6kyfzwntblw9uausn7gsey40uxs1krfp8zwtmn8g0g4i6upc4zp988ow',
                user: '91fih492kn1dcn1cdxgp02t13r2mv1q77i3n5h6u1y3sp5akga286j8mav83zgsoyog02cup0ggd6268fd1qron58cubnysvbqxhuqipz59acexj8pw7nyeeif2qciq7p0ji6ij63za6s3lofu4hh0ftx16ujq9669jhplhs3tz09y6hl6oky17sxxglv5qpangiqp07sluitzjghh8to4j7m22uklf631a7zxxgtim0dzbmh319676nkd1usv6',
                startAt: '2020-11-03 22:46:35',
                endAt: '2020-11-04 10:21:45',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: '8kg4vd23sflgbhi2zagjc3be3fe67t1vlei16fhpz3m0cxiepa',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:30:54',
                executionMonitoringStartAt: '2020-11-04 05:07:26',
                executionMonitoringEndAt: '2020-11-04 07:51:11',
                status: 'COMPLETED',
                name: '8k6jpvqx2iiowhch2xgpt763a9fbi7fyewxci9s4cv7m5qx333okk8ek9ou29gemwhndxr4cwx9z58nj7z6wtoriovlj9xoj889bodnkfp79spizaexpl6osk7guz4swseqdjr8t15novuk5t7w1l0uf22hypqo1exzqaavulmhp8tjgz2tn6fsox0qud3c399hzaez7uzou9g48hqvlcsdonjkit7a6q6lel57gf7ic7wr16w62tj0n2dom6sl',
                returnCode: 9363816415,
                node: 'wgxey57g3y6agkt26iqrk8z1ywno5vc8jjt6csc63kwg788o6bgo5ii8l17oc22e257f3as8zopp1rut5w1ghowj2hqcx0500vufvsffoovy6zj7ejeszl2wzog6xsjzsbwr120s2scp13swg6x7fdik78cs34jx',
                user: 'm7hux0w4lfe2zdepkwxcwbp551rh0fvbx80557iwptyz6r9y05bgq5agf1t9crdkh7r8syoihqhg3hyf139y2wa3vhtqy7nn0ujnysahenfkc58n0qdu6j7r63guozni68dn0okr0e06mamazywrhu8jflqpjgi71vbwm9we1ycyuxbznb2sk91suzojixu7tpuj2x1c49ta9cwvxw9m67pnnpnbywkntgajvyy80eloxwmwaedcl24aypbvxoh',
                startAt: '2020-11-04 11:10:29',
                endAt: '2020-11-03 21:16:21',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'ho6zkfag0o52th95zazx2f3mfvvh5wkppwxfwolywfl0two0l5',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'ywpdgo819025oybx965b',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:41:28',
                executionMonitoringStartAt: '2020-11-03 23:52:03',
                executionMonitoringEndAt: '2020-11-04 04:18:42',
                status: 'COMPLETED',
                name: 'ndvlbm18o86hywyjxt0k025l2770sfk8sor9qlkndihwswbp9cexwpnf5dwkjk9bl6wj5qo17d9811dlmi2o3vta0arta9bpfm7jnx52evklkmbpwgxtakd2uk4e27nov2zjy2ubrzu4c33t57gacz473o9px1jb5rdg2h1e5xq5t7ud235i7e6bef9js6kwh0dpijodpnvfgz42fgwqzpkpbggzome398zbdsoz9g925rh8v51moxeduptdfdh',
                returnCode: 3765511708,
                node: 'awp319n1omh6i94otxk97gs02lpozqdl4s5vscphyxl3nnltp7lxlg8vya3eravgseqekev3k16fv8t9il31balojzlf1u934nq4tymblqneolq8uurk9y86nqeqa57k8x6dp534nfjo9zt9wwv8poslutjsy4tx',
                user: 'in40cvt15612fh5o9njlfzm7jd17dkijtvrt90ojzb4l2vvf3p91mmxul3df2i04brg6um00de87uf6laqimrwvzceh2z6wfohhobdpo3ih15wjxlfvrmn5nc1reqny416ixyqtaaj87cixj560cwnontqvp62utcscepmg7f84tnij4jw2scnoubwx6zek7odrnzwyqadjgls68cngaacdgwndr69irg791zd8f3vrwu4pt4muyechzjw3qwq5',
                startAt: '2020-11-03 22:47:45',
                endAt: '2020-11-04 06:32:42',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'slcdlcntskf3gr694v95s4bpuo92qhnqkxg888es6ukc34k6ez',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: '2vbo88o2av62czlpqji7',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:25:15',
                executionMonitoringStartAt: '2020-11-04 05:09:52',
                executionMonitoringEndAt: '2020-11-03 19:46:31',
                status: 'COMPLETED',
                name: 'fryusbuqox7m5gakqdstkkbmqgjet2o41usfh7xl4n201gno9u5hrx62u03d0qr3tzx4clro3pmc2n29zej4i56nnewumixbsfrigz4ny7yl14p7447ubo3s92w36v4sgclh3r9xlm5an8sz3d7og19s1x4e8a1xkvo6ou1s0znj2bdpyus18wuxpvjvvanr57fxkmdjgtx2lwa9ok0iifgj5uldcvfp2hlyobh5gunkv3felc8u4la1ugeily2',
                returnCode: 6677402737,
                node: 'i7i5w4tn222463kths81g5vje7ngs7v8u593pc1baghkzynwfggwafpqcjr60728vs5qvv1d2zstiuil8eimn874gd8v1cdv9njn9ebhf7cvq2ry166y7pgnuqaimv3gxt1d7e47nr316ow7kxzvf2qkw1pjghkq',
                user: 'n5ujj9pufmfbylga9mqtgwnaltfhz9b2s0rjw2vpdo3ee567yn3tgaymzjej304fnx3if7un89dolw6mklbj8p1ls450hqmhyhmcauil5if2p6wy4tz84tbzk2eyt66hun24ihtgzsnvujz9myla58qyhbtyq9d76vxzc250ut4oj4a5pesgxcu9z3q7lf24rtpgf140cup20stxbetiskhmqqavdvw440fobuhpj5rzmxf8rgt67vocceidk9v',
                startAt: '2020-11-04 13:32:48',
                endAt: '2020-11-04 09:39:04',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'p9999n1nb1t7emq4rr3juzlx2mfwg3t4ze80kj6p6mhuo725m8',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'w3yqgo1rpfv6fq316nft',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: null,
                executionExecutedAt: '2020-11-04 15:03:56',
                executionMonitoringStartAt: '2020-11-03 23:47:51',
                executionMonitoringEndAt: '2020-11-04 10:25:27',
                status: 'COMPLETED',
                name: 'vzxd8gc8jfzm3k5ibfqgvmax3w9ufa2sj9ag0782drixi9dfqspsdtimh2vc8qk95zw5fluxaww165gw2al11jm7gwr3imo4rypyl6b5hezwc879c01e8nvyt33vwefuwuvgyk7nw389q3bn2f28uoxaos6kvly873uatdrh0qh57ui80eczcvcfqc7jpyeud8z45pk00y877i5hnfuv01h247qob8zc2c8co4tf5cak2e08vnaps0ewg5gght3',
                returnCode: 9356279779,
                node: 'imlhcjyq8dcqoqzrx5xwwry80s6jvb6cqfnim88nrj32t7egg3oa9zqh9ndr64qn3gn610g1uw4aaukx5ay42ebvvnnoxcx52z6crjp0joo6gk0toe94olc1y5gfwm1jo2l508t37sbpjtw6rnr1uvbcdjk51yet',
                user: 'yu3o62j24pd7cx96mt7jajnmds0ki5396opl1pkldu2xm1rbseo36rrbxxh4shg7lpb0gwqb185batg5lxqly980knwwk2ssmfolszikojvfldvw2fo2rhw8n5zagz7rkfs5n3o8eb83w55ufav4k4js8cobftj5fq3yfegi7rshoj46uc9ubngssrv6t8kw262xh0hfdpbpextw9ehfcl67zxexlsi3z4wogatdd1lgd1fb6dov3r27x0x3j9a',
                startAt: '2020-11-04 10:40:32',
                endAt: '2020-11-04 05:08:35',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: '8eq6wq294jacsx1k0pf3k8fpcwj77hgobwj3moa345xzgw174r',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: '9hnvli20qzxa0abn6hi4',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                
                executionExecutedAt: '2020-11-04 15:48:30',
                executionMonitoringStartAt: '2020-11-04 15:03:17',
                executionMonitoringEndAt: '2020-11-04 00:09:52',
                status: 'CANCELLED',
                name: 'eu1zq10l7cmfohahxxd7eu55aycb2gdfbesao9z02rxsar24ys4pg9ctrffxef41xql2cg6i1v0195oxq9nm68m98x8vwxfivurkvzii9k9nngkm4gqrbd2btszlo9rvwc5bqazfndzno8ivbuzl12rsc37kbub18te5mmzzuqw9ubzd9oio0myo0afk5rjiebmg82jtm07j0z1zs70dxlq8rxdq70nnvbsebj6a5ke5z65w8v0y3llqlieu5kt',
                returnCode: 8309750012,
                node: 'rxd2f3q7es7sumouiceti95lxcs840l42acpqjwm356f1l0ba719otsp5bqcdn0vfqbzb5h1vwmnlo73ny5cgqpv8xvvjy3an18y1o6nq58hae6ip9h4sso4e4asnrznaghjek0c54kk2q38rcjq5mrcetty4tgu',
                user: '58h4225e9i8cy5wu10ozfgbe38273gvcivlhf28nzjo47mo4u20tssrbyz4qf47pvqny3pj5nwdmlyg2qxv6j7tekgpi356gxr53ue9r0hw8qi07hcx8zd24xkhrmrfn5o704x863vy0gj7m1ythr3hqq0iczepdsdawh94g6r9xnur80vikx2x7hleuth0lglgz4z0ld3xqj6luoea88lo06860jvys00b4fzxolzlkwvhjodpfawxsvqwow0a',
                startAt: '2020-11-04 10:20:37',
                endAt: '2020-11-04 14:43:38',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: '2yf2h3clkwcgqdi4v5bhjq3vuaj6s2v9p1cdv0e91y6jrexjin',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: '4ob8mybx7mogk5ptqp8k',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-04 01:44:36',
                executionMonitoringEndAt: '2020-11-04 17:03:29',
                status: 'CANCELLED',
                name: '5xtycifxhcnt6434c674k3g4hcypuggrvv16pej8cudhy5d6ool9wdnvw64sh5ijbuyzahz6fau78wq81h102hfrsnt64senqhv9rhrddisk7fwq1iyc60vgcov2bfjou22vpvowr2npkl7irkc4vs06r0544nnuxnp4irmb3f2qcsq9h90hu0boykgbpw152w1383giog07lpwrogvd0mmcq4601xeqsdcuuq3gjclvqmeka3d6unb5g61k28z',
                returnCode: 4116594844,
                node: 'pwet9iokxzk480c16z63uhbassl87p4thygyuf0p5z43qpxzpu3jz2hg2s51xk4o52vii32r860uhrrpf7wiz0s08u9qo5ab405uyo5voyy61uctr1r8d9o8h1zwz79g0tip3gy7aqiicf6knv4u5ptuigp6xmok',
                user: 'akv11cjewknf137omba7uif08zezwkpcfdmad02kmml23z3junusec83dkpqczeji7ci2wrk4x70helk5lbtwl0nd7b9wx91o0eqfq6by61rll6qzisudmp3dhynj6ogttbzsjw4q8gxtkt9lqlbh7dfys8jgv5ox1lws20u13uclcga0v2e9d1jwrshmkxh3skgzy5azg1e9sprl3kokfg9japfqdas1lfgba3yyciz7ud6g60mwzifnayzo4q',
                startAt: '2020-11-04 11:31:20',
                endAt: '2020-11-04 00:18:51',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: '310j5y1kwah2t7sc3aka9sjuh8loeotqv8l0r807h9rjmkolzv',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: '64wwxrq60ps0om5u6nw5',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-11-04 13:37:28',
                executionMonitoringEndAt: '2020-11-04 04:12:11',
                status: 'COMPLETED',
                name: '0jo0lr0e0caew8gbj8ongiubgpwl6abg0j94eux6t3lin0umxeibpfqafscplgdybp54ygyu4skjucsixgx6udx2a62yhxxtzsgfbduvfclbd3t0r7uxv1ice42egc7oeitxf7oqbt8jykxrf3i0lqtql6c8pgz5tvpzjp0ebirf1o5kj24qax082srmfvkco5sp2gr6vxa27bvq1uasyooj6ou1lj05hfx501hck92dgrqdqncwh9rx1k1k4cc',
                returnCode: 6089851889,
                node: '3ml9fd9v7l39pju5fforxcsdff62ledidli3sjn7jvq3sykjub4ua6dlmzac52kfsc72e72bb60uccv4enffxpc3zgoha4rk22mg5f9hxfxgdbmzdoqyo8b8y9rtnrazytnwnbjepdherr0s5a4nvy113a2sdjgi',
                user: 'fa8sz3k6b07dciwf1s3n7xe3c0z3hd9r7v1ypy43jr9ucpbuzclibojnn0kmady902c0xvf4ec16rgdrz449q5ytcw5kdpi67ejk710smfuytk062phes24ztgo6vo4l5vx4p9ylk1xdvj1g8rfutus27m5ysd1hf7sp1v6wo2n30pnu5ix3vpn6kz3eo9t9pc2r12cdfaqxo0gte8cpjo2lp200d1o4zyc4ksy8ps0we29dsdz55814h51s72w',
                startAt: '2020-11-03 19:43:00',
                endAt: '2020-11-04 17:15:52',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'h3jnsc2sqjh1blrzjq4qlkj3z3ughune8iv8klf4j8lkg1bqk4',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: '6wxpenunt8yj4q5eqm6r',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 16:25:57',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-04 17:36:39',
                status: 'COMPLETED',
                name: '6xtqfkok8q5hjus13m0sprhkfbe2frus9hpvdtw4ydpf1doylucks1lhtvjtulhbjbzcng282zl4nhjpa64iu79e7invdj4gq12eg2z5ebdt4lravp8gxb6725m40oft8ot1i62cwxni6e4hacnt0h61stuuyucyp1eebxk3imol1ugj73voulpo0007vrtr71zw3amqf78ttoodw89q7ulkggnrr855z4kvl6pbqltamrl64lvfn82uy9712bo',
                returnCode: 8786917389,
                node: '5bihncqjer1vqjkv9an31xm45ywmlubo6rigxx9gm4vzckje9pdtncyehuud7kncf60d5ktb2hjtdazt55u4tz3lkgubqe5spmq0c0i1wwpnc9ofj9h7egt0iv7736n2dtsheco8z6ezm2kbd7xphky0f1zducgs',
                user: 'bi8d0mcjy0qxlnncmf3yeexu45f7mgiipnayu4xyw0nfsd211fu2fhlljwzqdo9wyc37403do9b4c49z6i6ca92aik245ekxqoq19b0hebilvhqq4zsmxxcfyjfjtkwip1hnnkpkr9ifsb51iqyjkwx669ltg7yiifgrsofvsjd11anp51e4s52auhrvniapkubq0anezes23qklcxsqwxjmawmaegcpyablqqvx2p95udcmdrh7ngxfk6pn6st',
                startAt: '2020-11-03 19:59:29',
                endAt: '2020-11-04 12:17:45',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: '8almpfnstp1n0mx2levw4di3unpyxpw6q0581dgakz4doyxndl',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: '7pk38u9vaqeaauxlit7q',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:03:55',
                
                executionMonitoringEndAt: '2020-11-04 02:25:17',
                status: 'CANCELLED',
                name: 'xgg02jioi2f03ed4imb3oconk7myerkmvvo4dyhynz964n2j5uqkw2k1sndwu4qj7rlkrv5mwdisqjhawoku7c0vqb24asb3foqtoelooheyla1do5gfg87ut7xvurz9yhfnbnp4tmdw2dpxqjhnroewust4pvz9c764q3kqmf07glf6mi3zdkjt9l51fgoahuxlb1t9mun9qgcewqzvk5na3rokoiy5g5lhj8qn2gn7s3rcg32p1bmgm8blf4r',
                returnCode: 5043924164,
                node: '3gnrcmwpcv5fubt6nykw4l0pjohqygns9h6acrh7k4z78rydwi3eeopwcj077cicfrbeuygtp9dmf7wmese0l2sjhwpjmdi992ar1xe0gyb32v5mmk4ileauk1ppjfnt22u20fuu4jq9pp28htkh2zck216az2no',
                user: 'piyt7swug5gofb9ju8do994rcp9fhkoxfg86z0nrlbss2ftn9yql5q11xn58knu2kqbtqz4tdf3124b12hygsmlv6kd37yj0ned0ofl6mzvbiqd7ng33t4dz6jvq2n73apvlgsyrr3z9imgljvnrdzjfn989boicuptus144dnuj5hjcudve6q56qlzzzrx7ma0lx7vyabc48v3r0zrxjmw0g87de78f0nrcihrtajttr2gjsnwxtpdrlxrbh77',
                startAt: '2020-11-04 18:22:36',
                endAt: '2020-11-04 01:04:42',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'pnsw1ng210bcj3nf0uge1w0h46pcmzfyrduzn3dvljoyagq18w',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'z135jm5bfs9c7kqzr4xn',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 01:47:29',
                executionMonitoringStartAt: '2020-11-04 12:57:40',
                executionMonitoringEndAt: null,
                status: 'COMPLETED',
                name: '6wr21eikec2mxm1msacv8o21wzmqg03nrliwyo6v0w4jgaookmip2vh0p6abou243yexr22nhnc9ocp3cdhunc9gfgisvb9a4kz5dnu9wq4cjm0wb1nmqz0aocpk290z72iejnery88m8d2l97n8ovwn52ujpvg49bw5ds2uv1rbp3w7u2h9l2fg8df62ky7j3ftez7wtmz54rtyu7mfzjzoggti52knmy7lko7mkyh3bzh2qebys4y458dapxf',
                returnCode: 4827157731,
                node: 'bv8c0qi6l1mheycyvxa20d6p8o3wsjakp17y7hesjuk4m8dqmxvfopgli9lt0uke6r11vgksvr1qf0wgwrf62fji5al3sjr3r5egsvggxsnir6t3lh21ygk2m3x0yata1vdf0eqlsqdz5mox9z9l7to3ugt0ffdj',
                user: 'yoqu0a92z7e1u1prsqes3a5cp7zsc7r21f9qkermz3qx70kgkl0rv2wynbuopw70g49rrg2643fw693oj6nsrh3tbs7s8ti26zzm97e5h4mzd9wsf5bn84vqvkwf4hnit5pch4o9q0hpezbsgy3q0kimdjqjtp79yifzux0cx68qwcec1lt4oc7ywud1q6va8gfyaaec2i3vlmpp8g8i3v1a0vz7vhr79gcumulhwwa8k3mcfta01wbysl837jd',
                startAt: '2020-11-03 21:03:13',
                endAt: '2020-11-04 18:14:23',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: '9tlx3sour5niuaypn9qh1p8nnkit2l89d2gumntinat4jya6mu',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'qqr2c9ocrubmf7dzjq2y',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:29:47',
                executionMonitoringStartAt: '2020-11-04 02:52:43',
                
                status: 'ERROR',
                name: 'dwl1wowey2uno07wtcqhokcpccmjh0677fft7t3h3j37ooups5wnq63d7dv0rehmqcqbm9vljxxgzxi0n12q77j234ipxovpc1qx4q22acge8lg1li902mq3dv45si56luw3113unaojvb7761fmysl3q0l0d8vdocgrkuxe7ebltcalmn667f2zoz7cv0ukyls9yo72ncvayhs5ndlsen1r4o0jb6ag505l08avzunq5xfj6h9t2037ii0enun',
                returnCode: 5061191711,
                node: 'xo0201g96495urervtl1xfztvpgk1ne66q0wnkr14xvwm539yvd6argyjj26iucc38f6s62n8ew24iweba3pp59y3833ny3brstexze0rwio9eq52k9r31m8a5bic5j0nam61xjddhknyhsj0co7k9ihhx3zhlwd',
                user: 'gtwwqbxaznx61t70p4axspub0rdq15c3pnf18a6sgke7itx0k4cs64dzs1togylfh3zsr6geem27tdfitdobpymq5kwiopvp729f6wnzthgo9cqvjzm0j84lttl3cg2xzhn4jvcuiu2s7tqt92avy479djeqdz7v6c8mu7xt1kmgf87mlaxtozljjvpfgj8ruquqppdpm4grl5c06boxitvqcdf8gy768hk14ow7za6vp24g1dv6jswe722j50j',
                startAt: '2020-11-04 01:23:16',
                endAt: '2020-11-04 19:14:20',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'myyfca9012nf7fjej4ja6i5xk9mfwcldilplqp0g6yg2mxlnll',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'sp6da9zlanxn3s4baiv1',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:54:21',
                executionMonitoringStartAt: '2020-11-04 10:17:48',
                executionMonitoringEndAt: '2020-11-04 00:02:09',
                status: null,
                name: 'c4dopc4kte46by45q79mab0aysyd0tmqocvr23cc4hdlajc81w2bgv0u8q21mdzex780c53fdyfryrb0c3fp493g0t5pcro60pne1vobmqi7dm3uondjep9s3opag5zs6ihl1snponyu24cu8mc0n47mdnu0sqk21jzgbmcfsgtdjsmybj6srow6ecblan04x5cte9tzh20cram05znvd5aus3j6q347latiabxwzkmcfogee5hzr6vbxmk4du4',
                returnCode: 9548021207,
                node: 'rjyqnzw9t9skrvr0bencinr34bvg1g09wyhg8d5sj2dwykh6853y469r1xv9ae6nmt9aonjhvptcyna3g3cn80xveewm2vo7srxpb8rwwj05hiseacsm1fhib51njtnowae7nm3h9viocrw21ys93o64ksfwiy9l',
                user: 'gu2s1bdhovmtnueeq4cmblhd1q7kl90n582up1eg8h4hzlvr1ql0jp8rm4z9atzbhpwxbrhpq67qefyj2fktyhzdlurvq8v98gpwzh0f305dyck2w0z3nqdd94ysxjr7sgwxbk1xvchpsrlm5p1ea2i283daku0yumdvyjlejbkriu9ksfcj6ot81lpgiexo5updtvgo90y7lbuf9grtkzrrvahfpswxaup5tbesw1p3309vfshdp9iqw3trajl',
                startAt: '2020-11-04 18:33:29',
                endAt: '2020-11-04 10:47:07',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: '47ygxzodyub0hs740rb5tcvjtydwo6g52k0ieu5cj9oxzjtvpv',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'zdjo4sn38qzzbz8wo8s9',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:44:43',
                executionMonitoringStartAt: '2020-11-04 07:50:52',
                executionMonitoringEndAt: '2020-11-04 08:23:19',
                
                name: 'd4p2qan7d6woqkbsaeekobkmr0ae0y598jvve43hr7ik2qx2cojo6iykdxplf873ujyh5uomsoe3y4z1fq7ecs22dvjpkd5ekg9m9kcj9xis73gqqkq12h5mqrhgm0ng4ax9muaojghn1d6jdkt59qs1z79x6up7nn097cjyphfyclgeptphkq3wwfx4li0qslitznlb7ktwidn2ye977gbbp6cmiepk4rt7818l15b9hyfeuw89q5znw9bxacg',
                returnCode: 2279238807,
                node: '3zxr8qxjwwdsbdc97cxnjatpquv928ojn3bftxx9f15g41zo0fvtcadyjhsa17ifxr38xvesoedo9ou5nf3mn6ok8z5dkppq4sklm20p9ph5kg9vhu5u8k80lcgn8oogj6bc97fwoe7qyw95toat3y0u1lum3hnv',
                user: 'jlahgm3tc5lljx0ki3clica3qcza59qxludb89z602izx1uf9k6zbx6jj2exmsi9ktvrphwd9n9v49jh3pe4ho3hchymtq5z6dpui0ae1mgrbakmxqefdki2xycdnyty8utakvqzb6izsm7uhy973tqgepq84fqij4oeptgpults31fv8affoe34ehaobxdtnms752g82qc90m1jxr6uxnxka7v4gl9fzh5wntmt5uw6d4xj3jyp8u5ct25mron',
                startAt: '2020-11-03 19:47:17',
                endAt: '2020-11-04 17:42:59',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: '76qnbf6xbz5reppuyhe78nio6v40xepysy8p3nmnsu0sc9dr5y',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'lucs6m8uvwhkvphnxve7',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:38:18',
                executionMonitoringStartAt: '2020-11-04 18:25:34',
                executionMonitoringEndAt: '2020-11-04 05:33:21',
                status: 'ERROR',
                name: 'lli6qvzrwvo7lijnzwjbduv3w7m7bbjyqhxvqq3ryaw79in70hitgc53zdw091vj0dvhwxyf8ul4jl7636hqcvjjk57q1q8jqhnup7jzh225l4cfrg1c1asxqdq1a3xvw62ulwqv29pvep51ls1detj88u6x6vq041lli1vg4vnz0vsxxxf1nzv4m6gbz7dpflqpfkg4ra23m8jl4mza28qxilu490bpzhk9ddccwobthq9z0c1zjs3kpr1zrdv',
                returnCode: 1242437338,
                node: 'p1uju168jbubfpxv5tei18sa9qt0rwwjww8x5ygjzghrzjthsyc8dxdunzppbbsfbygr0c1wcc0yucnx2e4qw2ynv8pejyy7isvy9g14clfvb60vq3oxlplxvi5gti3hqq729awc40x0ix2lx8qbovgbaerecgnj',
                user: 'nvwl10oo7cmmd89w8p8zlizh7t8rj32jlrqxyqcskpj2n951v8td4epu29xkwgnzvzvcpnm6kxof8nsbaryivkxe8bvyqhbi3s61trlpkdioquc07q9sa8yo87wrlheictyrxx2iefzq52e3kfiebvcqtkjhjsliubycc8j50mnyuorn6z2haqh3wl5q4k0lrlh3z4sj8gbs5huuqnmltsseeap6haxhi39o77h461xfkqlhtt8krqlhyryfzha',
                startAt: null,
                endAt: '2020-11-04 04:48:14',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: '7h7rhlm6v2kas92r4682anpl27nj5vp39kndooy3kbl3z8mlck',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'z89pvzdcc8et7olw0ki2',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:22:38',
                executionMonitoringStartAt: '2020-11-04 13:43:33',
                executionMonitoringEndAt: '2020-11-04 18:36:05',
                status: 'CANCELLED',
                name: 'haha5vntck6e6cijr972ds43v6am01ydq872s1uxm12dq8v01z8g9v84l9zjfxtg9x08srqgupb9ppthd4uhxmoztsojq3lyfdrfsjcwkgd4wszwt6il84m9q3xhzc06uvmqua21m8eqocb3dgy3m9crwl1s8r0aaf2uxmecoh7jg17k9mcfq6pdr6p4q63pzvt06tvazi34gs84ofo3yqc1x3fjngszxv01aq0qufbjk911r9paaa2ukymajpe',
                returnCode: 7064213598,
                node: 'saf9elm3g3gi2g90jdt2dpugsoq0n6mk7t5wvv1mk8ybnrs34j7vk6h8apgk42hwdvetel2s414fzjbke7sgpx6toyfoev61orlqsabpopx1d982tuzrbxv49a4knm8j93ya8zs5yup55db35cdc40223skir83x',
                user: 'voa7auk58q7x7icp78c59z5e762tsc5wyme4u8t7yzl4x1rp2suup1qj4weddekt9401xacye4o17x4vhr3jzktwdtq9l1j8e6pmr9l4m4rmdyd0e37hbnx4oxg0t0fzzxpaui6m62zbg2j8i3rfu66ur4xta4xam2ujavwzyz2ro0sc16cb3xu0xfcr4cpvqmz691wry4z1i8ouef4pai2gyc5jllqb83w93sf9i9a61xiiwrs55y34mpbudi4',
                
                endAt: '2020-11-04 04:04:07',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'igzhqi5ogqn1tg7vrclmgc43yupslgpm3nwg102qmf5hxtvqbm',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'cg0j1z19rx9ylo1io6z8',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 01:07:47',
                executionMonitoringStartAt: '2020-11-04 10:03:57',
                executionMonitoringEndAt: '2020-11-04 10:56:34',
                status: 'ERROR',
                name: '3xwzithr190voit23zwr7aazcug5i3x7c4ikh5l94sesb8btqrupmjnivenpb425d6jynb1a40s1nc779dmyuz12fsmw2q8vkogm0lc3ovsrr0hhfktut08wr3cxrycyyda56q9ccjv0egbtz4tu0gwwl9682cvzu5lvboxep8j974c00g79qmdkghqexmtwdqqau1a0m5ubzpxmkfe8y9vvh56ld1nt4nrtb6n4ypmitk309cwwsemy570l5rq',
                returnCode: 4410313805,
                node: 'pczplo1urcx5dxnbazbh2ax6flfwghlaf9zo4mpkjaah1exntxyv96y9tzxd7rp2exivdhy16qkwiavg8vw9hv1vwcvctgwccthfxl15ii19lal6ggs51vggu2xh9mfi9fmzm9fpf7b5dywj47lf2jmedsyu16fn',
                user: '8lupde00pmjja17qcze8c5wcxkqtasqv5s3p8rso7goqvagzbjow7ygpufpfos1tu3sdmiydl4mvstjod2uuybmoaluiyy485ptsf2ycx5u300yz5fb39h7mvnk4b1igbapa0qtee0bpi7hny7b258k6zt4lkx9gvks5du3ohwp0qo7qzigs5boyjk5teqhcpym4j1tjqs8kqs95bimt3pphf0r9f9kbzftbw40neaf2eq3zny73kq91g8i45fr',
                startAt: '2020-11-04 08:33:54',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'johon37siwtqjb7ftspf3y6pcfhnk7fzlphnh9sunq3txsci9k',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'zgjz4oz2wx1kg6cbmhpn',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:23:54',
                executionMonitoringStartAt: '2020-11-04 03:14:58',
                executionMonitoringEndAt: '2020-11-04 19:24:44',
                status: 'CANCELLED',
                name: 'oyh72wymgkzhgqj8jho68zb2djkebxzaolaof4kvu9de9qhypu9z6kc7h994klgfgtj1m0u3xkxfy311jxikla03lxqgdtf6h74pap48b1asbnf68az2xhqspbzhwirfb8p7prc0q9k5swtfht0u76095yenurzxjqwjtjzjzonrl4yj9ta94gjisnpakh15wm2pet7hq1m1woo3rs32zm0we9cqnm8v9egr37q1rwbbqvppxj24y9gsfwz71hc',
                returnCode: 8024788362,
                node: 'cn21syiexs5fp1epkuojnmz5tmronbxqkpexm46al9fpkdmn7s96fm6lnvsq84v3s8yi065fjtuno5ppn6j8ijmodl2s9gerd1lz1c4ybza1xskzcwlp5b3oeqphyghc46zddvsykneaz0vqf7oyvzwa0regf6k8',
                user: 'doz8cj85qc4kmtoqq6d13src1u71ta4icaj45h2ilgf55uswv0igtlphnx81kvbkeztddu0t1zmcfsrfqaqzedi2xov9s7t10tuco0cb2ipmrdkcfkj39i5t1lm5ru3bcz80ejga5qw9pq88h2g8jjvyfbvf94x2t4gmdswbkqlnr8wru592vu19kukpx300kgnsshxmqsyp1b02lyuzkw4fnkpaizle2ijfdzskhmnjzdu32z86xgvv8afy2y1',
                startAt: '2020-11-04 02:28:50',
                
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
                id: 'ajrblqs0did96zvqc1ziehauwkc4epq2wmjb8',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: '4n3gxlngqhz6st2vekwctqzznaxbff8639fjn2jmyjfu36x2yp',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'v3cn3827fiochf8ca7al',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:38:16',
                executionMonitoringStartAt: '2020-11-04 18:55:40',
                executionMonitoringEndAt: '2020-11-03 22:16:55',
                status: 'ERROR',
                name: 'ycn9v441btufra4gvs87ztyfppr19ee5tp5g5kclh7mvr1soavkvw5t6svpph5oikvz7e0mg4uyqfsr9espyv5oh8v2rcoqjihyno3tzx5lfctsa7jqxsh75f9w60qdiso719ksp0q8tv43b933x6h5wtg83tsml0xbnro2yp6bys4syp8bqorccxqi3tpcwg1su4sbcj3du66pkbenp9bduudqa9289ii68h11kawndfcvyf2exylni5v5wcvz',
                returnCode: 4803903154,
                node: '7v2622v506fl63pjw77cfcnmza69f63nzlmeteaqrfpkalekd3b7tr3g4f9gq5r88ra1uj1hz8sdbudvaz5mpderltg92nufmxh7bxtxrwvwj19rggfcif0umyfh3gfc80msjj8746chfjgdbcbt5x88sbcglcrs',
                user: '5p16jwweqrp2zn3qs2d921lkqwgdsytahk0eeby9fc7wf0lumpu00609sp7oo1sdbnwkl1eb5pp836qjzc52nid3di4qvbmjbkebpadqbhxemt4qfd2r4lyrf02s75fg10czyx1li8ktgm3hk9ts2ddtf4w025qwb6bb7uasjbxra06es3j0k8kpbgw6tze6kn23s11vqh9d11zdrlniymyo3m18e996ypkto4discd80wamd9w1kz4p08nnjx6',
                startAt: '2020-11-04 09:20:01',
                endAt: '2020-11-04 13:26:08',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'e0jcmx1n8n4p02ud0fcxtc8xyae1opaa08i57',
                tenantCode: 'xw6damiyi764naqtoc9zfvm4li98stv7wgcdwbcsrb32at20ix',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: '2i7c9bfnrna3rcx5af58',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 09:10:10',
                executionMonitoringStartAt: '2020-11-03 21:11:52',
                executionMonitoringEndAt: '2020-11-04 19:02:18',
                status: 'CANCELLED',
                name: 'e0y907n1cfwfpvaj0q9h8vopwhinxrp7xjh9we6ne1b24ny1j92embk3girk46dxwy1iyr13wwz3qv54b6frla2447n2vglge6wwjpf7vwe2pjhxvkrb48auza6uwcnzf7p9ui9u5f1ukn6dc7k6wtoo8bmvjtwhbvygqfjqcdws4z8sxj9xhj70cs5aj1krcx7lfdvi1k045oulbltv18ohqe85t7pok5q61pgzo9haroyh5dxaq0o6dba9ral',
                returnCode: 7288839050,
                node: 'hros4qj7j1clgqi4lk9l8v0yc1bzzrimw89za9mheel7q071shph0beqoqp3kzcv0okhhrtxrj9wc70lom1ifi7rx4jsg3cfcvd70ctqp6jybzdzoev3ovq72ag0wr41tws2mgw4lz4k2yrfcl5l79z5mu29x3ty',
                user: '2i038st6jd89u3qsrr7kzceyklrdfpf9j772np73jx6rlijx3cslot44qzwvpj5kpgtg3l596mxjtg5zeaifn9353xnh53bvrlukg9jmelz1hzsw0x6xvx5fje2nzgrw54omd4xyjsz1w72dc3vyzxjghrv825kpecdyg7w1hprrp5s6cpdwthwa91edns600nwamw0xupv382vi4e7rdpug6g34mruqfzd2aaf4ejn27goa0kgijlnji4n4d0b',
                startAt: '2020-11-04 17:50:58',
                endAt: '2020-11-04 18:35:38',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'yhkf6xd2isqpmfq3p35mfj0yk0obnl59klaeq6sgjk4quldbjb',
                systemId: '1s3ixrhu57ywaomxqmidbw1za1jco30l7zw8h',
                systemName: 'p3ve8exqoxheiklkbzpy',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:25:01',
                executionMonitoringStartAt: '2020-11-04 03:39:49',
                executionMonitoringEndAt: '2020-11-04 10:58:48',
                status: 'COMPLETED',
                name: 'z7crd2wubbmnxgh47ndpnh1lj4j1ojn9fwc6rm49at7fqznbq41452in1dt57y50dh9twngt5hrvj44a3ccntgr67ne66um1079o3ovjo8l8ser5q8ots53stxyygv1ulexa517v19zigozl1yh2zmlrbwqxe7ln8kcg3vzjbw78j8y6fl3uyks51g6qqa8zivq71e2tq8rm63vdfacl4a2ljwf6jl0svd89uezj8z40iwgcxr8h5by3qpstq9f',
                returnCode: 6486161837,
                node: 'tmuw9lkizsbmmzjk0ao0ys1xt6fqaax579qm3ksdn9ny8qw4cunxcmym99z356xc5l4ady6w0lr9iupqdj8n5such3jgkz4hvh6df3466lyjg7tg8ocx2l8c9ippa1ju9f1dg379amwwok7hj4b5mlegoie1qvxb',
                user: '9qps07qw8dpvbbjh03yuoraajsdt60cabl0q6wutshiajdvv2bfjnqpv1dgzi502b755zue7q1wp15fr1zv2vrp300e7oc5ymvi3xctbw6uewnb73icjicxy1lf6sdi22tqcdfpzau4n2kihpwxqewcd7qtz3z1abaugodnx8wq7ev7gczhflkerv1mr2ubhqasdutxnpacjlrzkxk95f9mpay1lhmxoq3mw6ri3kftzi7evpqvfbffqa516l6s',
                startAt: '2020-11-04 12:11:26',
                endAt: '2020-11-04 00:11:58',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'l8u7spaig805m5gpak59390913jj0ep48ls9ttz9r34359urxd',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'ty5r7lasmhqddr1he5pz',
                executionId: '5lbznk9uymtsgly6s1mrjnzk6csd8bcojapeo',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 16:23:11',
                executionMonitoringStartAt: '2020-11-04 06:47:32',
                executionMonitoringEndAt: '2020-11-04 10:25:51',
                status: 'CANCELLED',
                name: 'qlh9shyisewlmkudargeyn6b16lai58qnj5qqtqy05u7v5y2r6hvzxe88xj2rvl5jib9ndyiydbww6nbdu2na2empf1nitr2xfkrwkk0bctutgvickgf83e4zgxg58nzzrk5c14epu14h63te0qk3gd3xkdzykesvb27bimyfwn6zo5mi43g0ud1cutw8webt08ifi5cqcqzu2kg3y9nkn6w63eoqmcw376zdb2t2swlhdn0z7264p8y9xai7r1',
                returnCode: 6455694889,
                node: '7xphv6y2v89zr1hmg62cfvcmkwzpscappy6w60hmcuvzblggj3n69oao82vuv6t21fzs2dwlspaep3wqdfy3e5726on9eeqw9teogzc2vrewxlm5xop3q8xbnxkp0m32ka3rgqa5812s72a2334qghw1xfzgry2l',
                user: 'lcixzwyvcturbvsa783kn1exmtckqsiggevhpl3igcbenshjzyblma69aw9a41noyqblp37pf4fk04ilfntkgvbkx6zpbe4k434eb2z331eg8gaqr87l7rkka7y9x1cgtzwyalz9fq2sx3g0qh7rn8xmoi35l4jzh83z47caojb7smb7no4d4rsg4o8g3uqtchzujqnlffxvwvg7zcoj91gd8tnnwab5te4w1ldv4pisms3hd51r3n443d6dtdh',
                startAt: '2020-11-04 12:32:26',
                endAt: '2020-11-03 22:23:29',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: '2pexat0qa135c8od8k7vj1a1uwjjmbkmwtrgcdp81xh1oustrxl',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: '9pip7ycu92n61capq8je',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:55:40',
                executionMonitoringStartAt: '2020-11-03 20:53:36',
                executionMonitoringEndAt: '2020-11-04 14:02:52',
                status: 'ERROR',
                name: 'msh5cj0ww5ui73vmxzfs543j0409pnd3i25f32v6kbztm2wnfrdwfjgir2buqrnhgndsevw65y51e5zj2il7zd4ghqigw7wkkaglhl5rvkbk7hhkvnlmukrex01r5wspm5g3rl8614vlst42qne1n0egsuz9tccegfarzcwsyu2swo6bm9qb842830k8yzdn6ls2nvo8jcumb75x4ubxeeqe72xpenxz9gubaxnfjrxdyoy1ah55ifgkffps39r',
                returnCode: 8711485555,
                node: 'x0okyyig7ytytf2nxo8om6ga3u08qu5wyv5htbln2f09a6gi4u5d4r3dii58tmkuhb2pcgq0gkxto1a0ifjmpj9b4s2otn05l3pqex6zzm4iqwvqu4mv0hatv0pk9y1q5495jzdlx0n0zl5ihldz1c8czyf75on2',
                user: 'xht5dqbt4jvjkzoi2w2mgk7i9zv9q8dq84m7iyjyik4tn3kgjbmbm03wh7nhrojlqbzcwg96fn0doe1bmfqtjdxfmzgzpfaxh3rgv9p35d8648rdr8j1rl9ipha42seiika6taunextg2023iz0kbv76cew2qjjtlh6fg4iza2vag4z0uiaof84xhx8wahq1ptigffaxwz1bpbz59r9spgh2jzp8zwgwmlkcyv2ijf3p9mqxylmh6r58rxuwdb2',
                startAt: '2020-11-04 17:03:38',
                endAt: '2020-11-04 08:11:07',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: '51mudi82lg482cjtlodkfp2l7ku7dqjeits4yzm616ezvqcht7',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'br8l4imb21kkvna29inrk',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:53:56',
                executionMonitoringStartAt: '2020-11-04 03:24:15',
                executionMonitoringEndAt: '2020-11-04 11:48:47',
                status: 'COMPLETED',
                name: 'ogrs2m77x2xrxu5uwyz1v87lxooxcfdxja8d5odd5zq61lqu9914qcqrio3cd61qdgkd3ftgc3zbhpj51vzdipykyvdaptthb3gmvr887ry1jeqglyou2th4six9e25rnzritbfsbs811fjakiobtknygjgm8dmeu9egcp239hnvnl3smhdfodw1p0hep8foiqexhxpfx9qce56xy51cwkt7od2a3oar3byujozlwjo6i8fzde8wdthz2lqern0',
                returnCode: 7578260742,
                node: 'kogqpkckblxu09r6eq7huvqbxc4vb5gdrnin2c1r8g1i6i3lqyi6h3070x5ijxtca8ua7xjh136pypg6xnm1o0109a0r89m2rbetm450lnwatyok8322f54ibh8bjtqtwl5y97dtxax9p5jvaiq8jg2s78s3db8r',
                user: '0u4sjbkr22oq44bvt9cxac0a6uuu1cbdz3f0ommkc1r613dw0pvabmfxqq3ozemkisi3xz8caxunnlq73ke3nzsap98xiq6kn9t4kn1z31rh5m0n6ewfthpjiouc1yepv4pmhouymqt1x9btdi7w8kz5znkwqgp8kypy5fhvgv48s26jsa2kngmm63vnm0wdt4v0moxq527f2o1nzd0gxsdnyb357ybrx5rr4mpxqd51bpchk98qngfqtkio1o1',
                startAt: '2020-11-04 16:56:18',
                endAt: '2020-11-04 06:00:48',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'a6cdxz1synwqu999ynhj773omgcp2ab4s8jx075xe3fvq3mgbr',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'm73umgj60xnjp7o37i0w',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:25:20',
                executionMonitoringStartAt: '2020-11-04 04:48:09',
                executionMonitoringEndAt: '2020-11-03 23:49:03',
                status: 'CANCELLED',
                name: 'm37dmt8icl69tceddcbrygsbgskpzdgn7tncc1wu9u9r6kj7e0u84rxh1phs7hk9wxoto2caw4kdvn7ktzks29sci4dgwnxiwnjiq8ro1ghn2hlzyhx7j8saxzj7s54yboz6whedtrcmng17473ixiv74598vrl65szccozkcu7h9lnppvnncvvaj105dfvpbu64k7ruws92woxbxz34xm7ur7bj76ivpblvoe8t27mm0ker39u3tkztow0bof4b',
                returnCode: 7008077478,
                node: 'c8xytn598v0jefl1jyuopbqd31uru2udr7pamtd1br6hl7shcblywm9egzxijzzg5e055v1je9cpmcaamlzm8ypceta3g5f2gfkve1qnki240ybdz0a5v0cn32sc93dxmx53d8ie2i8dgpfdhskzwheu59n86355',
                user: 'nv5p1ium7aajnk5xfg7uz6i7eg5lwqb3ucgksdeixo40o8kgd9fiymg6h2etakxqup55clte4h08w2u4fm291t6lde5u1lg8nrcogabum8ujqki1e5ntucvj6j6jhkhqh7stuybzgczf45c6rdmvtgxfleafzjdvdm5css64ukymfpbx2wp7nzlzrxthjb3mjcf31oimzm3tvcira2l1xqqtg29bmu1d1xawvtvvk6eb5yhb9zuw9fwii22pjpr',
                startAt: '2020-11-04 15:35:08',
                endAt: '2020-11-04 16:32:35',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'kb7ym483dclkmxz3aog9p0d1p4sgvdm0a7hyf2buoxyndpzf7z',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'pncin488ksqb93b9deuh',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:09:43',
                executionMonitoringStartAt: '2020-11-04 13:48:30',
                executionMonitoringEndAt: '2020-11-04 19:02:32',
                status: 'COMPLETED',
                name: 'fljuo4qih961pumr42nrdmjsivw7gtyoe9cf8b7b5ordad75cto3iaqag7gghhp27rkr4hcenvo1gekc23wkz2owob4zu6qq1ncrgti4q3xo7g5w9zd42cgu8ck2rhrs21j4s0qfin2w1tsb35lpu00ebj9khzxxs4lvijff8s0wamy82g73qjzoa4zd8uipl8pj595smhpygm22ayyesqh6xq3pm32apc1qcjuqwws8jcecbick5345irhz8r8',
                returnCode: 97327035691,
                node: 'ljaqtmpcbe1c5xy2heqctnz70qjj0evgumeez2vs8drdhusr14gzlse4bnd82z433f2jp3siij31zkdtunhb9k22mdlb3i5qe6336fo3yeyd03utxbm0lmmg12xwptfimb5llml3xb8otot48ltdvthwvqre1mhi',
                user: 'o1axxzcxqoup429gupdknkw75bxu4djuwxzkioh21flfy3a4sdrep6jvbiz1h7w13da98szl9l7fog7npqwvrjxqfiv7x33y65yi5211zgqcj9dl5njp00ma9i0usdumgh8gz6bfatge3dqlkiirnjlj9ewp4ubt5aawl1340unfjnts5hdqhh8lz8u9js7og24ym7r10k6d73ymk49b33ylx4rnncnmgaadbzzy1kjvzokaj73wpl8pxmskzyo',
                startAt: '2020-11-03 20:17:50',
                endAt: '2020-11-04 18:29:39',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'j2tspz95nvi9qmrw4wtd10m9bt3463h9kn0gnigenlh25z5zrs',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'jlsux7o95k8dt7j53bbd',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 13:56:18',
                executionMonitoringStartAt: '2020-11-04 08:15:59',
                executionMonitoringEndAt: '2020-11-04 10:48:58',
                status: 'COMPLETED',
                name: 'n23bz9n6q4m3l2den3aos8msfcgv9wcolqtseskaeu53yp4hnkg5mz7mgi649k6ap58297k67qbk3yzmvdaynyuedbfif473eoebjm8tcpyftg6ir1xj5nbgd94gwl8y77vqbva9503457bwehb5i0x17ntb59y1c2jvujh6i7bwb5r79qrnrtf0d6t753x5nu97qk8xqqciguihz31kbdoz1pufmuwhs2yytla6hlhmlcc3l4v6qkvev8690uv',
                returnCode: 9512991743,
                node: 'xlm2dvfa83md92uuk5ctjbv0tj039rx8uaf16db18nkkg4647vil3kheuf3y4wfqmfrl51rw88xb2722mwv7l926mdm1f96ybbehb48vwrv0a4aep91oxi0uu5fzgke4cxm2yreo8aquiq6o3w8cy8dluw2lw0otz',
                user: 'oimy4avt8m8f8cdj05yw06b0v3ui82nalonlrpmdasjvsj2k2mv8g98txcugg1fqb4ipi0i0wznrehs8koe5dxm7skbjxar6bm8ajuk1z4gzevda1bscfgbt0mza5hq54x3repsd8y39xntndlnnw4go6v02ts5qsy5chul91ocbr78ja9yvbg640ynfdrqrgjvzwgjm0rgv1yqoww081c2kdw4fi4m80zp3fmwme1z4hgxjso6mc6szwno01rm',
                startAt: '2020-11-04 14:21:24',
                endAt: '2020-11-04 06:16:42',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'pxwzyzuocoj7it9b4g1n0p5fmi194csdd3fbcapvoknz29lfmd',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'e4wd0t55jaofhjf9x7hc',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 00:53:57',
                executionMonitoringStartAt: '2020-11-04 06:20:05',
                executionMonitoringEndAt: '2020-11-04 18:00:33',
                status: 'CANCELLED',
                name: 'd1osfd7473yded7nyfbkdxcowowbza7tmqfutouslcq42tra0szssw1f88kit4ih9r43jmelphjz63m0altb1d9zcdxygub3xoab5o99mmfnxv5kyoxj9kidfwfnpnodtytpdne9drl19ca3dudormxgwarj9ohvx11vcggxx6vw7uq84fang5xxcavycgkfvgnos9ki7gr4u4jqinxp0tod9qut4jbph79zxldh3c80iw4qsb13v7qzcswq44n',
                returnCode: 5542583113,
                node: '7wwbjpgn39bc880ifn50bwcec2jqehdgzvyhxnp9melbx0wb6heggb1i2tddcr0p4nlyhj5zg7xc9cz66tvo1vlnw7p0bvmr4weyugt6jvvfc8bexm6b8pvrjjywkwo16xr3fwwdisv343zysaa41blp5bmzsxz9',
                user: 'wwtd0lnkquxojc3f3uss3k3du0oorcf44c58c6mal9x9yrso1hq72tcbltatiqqzurzjl4hjed79sl9mvvtdlsjf809y67w58cuv4bkzbn9obdqfa256zyjwndr79p3lyjf1a2uy8aiv3i39un89mdni0u4ey0ifgs7p73u77jifsbzqwmp2v0rkfdq9nm22y0y5r7xrq0gl7dk3ghbf2nxptt29chegko0fainfnt6wm3ywrclxm399hpvt8rnm',
                startAt: '2020-11-04 09:40:32',
                endAt: '2020-11-04 01:53:23',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'c9jk4qg1qde1hd2mp79vsc465lsqql13nagq9xymllgh3iuywl',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'q2496fpr9l08bfarwbwq',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:47:42',
                executionMonitoringStartAt: '2020-11-03 21:50:16',
                executionMonitoringEndAt: '2020-11-04 03:18:33',
                status: 'ERROR',
                name: '4xmskoxkuw5ak7lbhb6o2pe39knvvjtq3ddtxfhxne54afxtkpjbx633b74l53aq4so8yl668pmyywqyco9a0ufj47b15fn9p0oc11au3l9dg965qj971qsyubthtgw87x4rgr5fzx0mwgs4ayy88ntzg4h2gvipsvklz9e5dlhe2w7oelej6iwtppvwkm7c59p09im2gfqnxcme8i0k4gu0a72jopbk3ma61q46fjt5hyfvx0yfw8kxu5dhr7f',
                returnCode: 100.10,
                node: 'ekc8tw2vxvnqa8cxhtg4txgj3kgzkwwxsfrnpk14ur9gv4utj2p6o2z21m49lqu0yg2yrgivb3harupfn41qq75f982pc67ckzsi7edyrwz89dzb9sudc47cioyzp41yb5f6f0lifbzimqibxgb6n2ak1h0g5nx0',
                user: 'm2hxu3wt9behkbmdod6ld9lzqjr4hp2anxt5ghbggtth56rlildxov7r0shmekhh3d9xspv53rotvyrebl6h0chlsx6eja1yr61qvredx696d0z60kmotzl9b9fn8tuckc7weypka354oiuwslpup2keesgv7xeye3ehgod81n0tdm4fd38bdqi1xrqipomc676wzw07n249jvk1gqxz58fidwh3f239umxpscig1e6p4oekdsa3b3ckwwpudtl',
                startAt: '2020-11-04 08:02:49',
                endAt: '2020-11-04 00:31:47',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'm5fus11pdbvlo7lvtj8zni8n6lvhbk169p198x52e0dhoynz66',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'aa46n1b6cfr089z1sati',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-04 18:22:25',
                executionMonitoringStartAt: '2020-11-04 13:04:16',
                executionMonitoringEndAt: '2020-11-03 22:51:27',
                status: 'COMPLETED',
                name: 'ab8fc8vdp2p9lwjx25c5sou0w3n0gtb0xqm0hxb115j06akidg0crr0prgt92jpl3mr4em599gniw0jkl6ge4o1qhzxnirqt195tknijdeaqc0w6381nd5qh15erwv2b6ze6ao8kfhghe3n89anu9xg5iipl12x355tv8z5mgckdbpiiv4kxr5z441vgo2u4lgt1fc1igp2ovshjp6qxta69zjpv8bj6vhp6z1myabhnt1hs5z022eqbngg1eyo',
                returnCode: 7208284187,
                node: 'rkdj3dv7ab8ictwclnly1li7o597yxnry1jctaonshbo164gpl96rg6zz9vz5x6zk292xfudhtbndoyqq6i994r2bxexrpomz44hgyn1jk6d55dwywpnk275nc6qplm6mrj9uiuxtiwspl5imygvpys6ef2qhugi',
                user: '9c2qn3jt3lxlurc18ed8ovoro8q7d0r5u81kftxxjzmf7m98wcy5eo645dwdna8g91k6u4wudf3lorgaef3nnt5ufhnzgw5y9odn76gg5wwkeixftbznjo1zt6tmx1gwhqgj0440g1ndju2uhd15xexfpv4n15xk3p50aulc27eadm0ixtxe7hqgxmqzmpix4psrnwc02l4id7wndpdo71ck9ma7nqdgg6unc280hzicfumkj27ozw83nruan2a',
                startAt: '2020-11-03 21:48:17',
                endAt: '2020-11-04 16:38:39',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: '28xgdxhvkr6r4y4wbdl258y8eajzcvcgcv22nswwzf4e5gxwev',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'httplqjohu2wkkemyvi7',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 20:34:35',
                executionMonitoringStartAt: '2020-11-04 03:50:07',
                executionMonitoringEndAt: '2020-11-03 21:37:49',
                status: 'XXXX',
                name: 'mlzdop4ljgo22njn4dvy135qafmrzufvqsk7wj9trae7p4w81obgvfmg544vpytn8l8mha2j7bedlvi5j75vciltlk3o2fo2mkyas12x54ianh4v27chbi92k3aafu2u6djh0f7lullcs5bt12txwce0fwjxu783kll0n4e5wm8f6wxoffqc8qq2yjm4nt1fhjb42msgq0kznpm8ovb04tzrwf0a6rcztpjirp4z2vszi697vzhg79qon8fqqgq',
                returnCode: 9451832340,
                node: 'to8nfw7p5ram5tzuz9mv8gpb4twrn5n4fm0e9bcmlhbu2s6i2mi6nxmbb9iad3d5k3irdnc1gjwrj0u2733sto91s8qknbqj1f2apx8wxx0op3y728kzhtyy08jdytezau3vy8fs2rbrqftg3mif8qjyan7hqfvn',
                user: 'ghszcz17vx4q3ieynh1yac5uz0trdxtlewu3kacwxcslsojmbjc89s09yc3wzwmr0uhnvnedmwj7ijcbu9p955ikd43tmisbm78vbmw4zzg3s7ggupoli2kes4qi8wpe40t933hg7pzj0fc2fbyxb7b0xf0wal4q9io4938a27ptlp277j32wgax8k1ps5o0iy0d1qa47hblzf6obbkvr548k14yjbqawn5dlh4ae6fsqk8vmch13cp2fe0lmo4',
                startAt: '2020-11-04 11:53:06',
                endAt: '2020-11-04 16:56:29',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'bbuamfypwx0y8dk1nhac4lwmzm7wjhfd0i6bp81cqs7oyyxp97',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: '1f76l66yrmn2oru2k5u6',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-03 20:30:29',
                executionMonitoringEndAt: '2020-11-04 12:13:27',
                status: 'COMPLETED',
                name: 'imrpe46i82yz3s7vcm24m2p3y6d6gv1vcp4jnbkvt7f0cdikr5hsmgwjimttlzmu8uyme7jkdxkx2emxyabe1iij8rw8jwyo3o5nr224ftjs6j3adhuc8vnwqo4un626cq2owcqah46g0qhlj6gj1hb435v13qtjw0d32hs0xobhcjsxevyluwfhqu1cu10tgv240brwxier92b436ekqsildp58o5s32nyhdwm8wcjwjgn7dvg8msr0e123969',
                returnCode: 1089093028,
                node: 'h2yki5z0zlhjpm4bfdqsohvpc6ftnf26d6id54go5q0xepa1qmkuzk74ammji6uaw2t1j93q72hju58mp4iq55nh9bwy3fc5t8azsnder0p9t213mykh4qxbusdcrl5ffs6rw8lndb1xd1ji9ab315p08pz08x3i',
                user: '6zpeetnp1k4y134hcfvz7xduhde11kzag9i5uhlyg4hr3igb8sw2tuqssl0y81874wpgz0d8fp8206shlkj0fmidl0asz1s1cyxktrkom0u8kglbwv6yf9orlxjdft7vjs0bobx2wg5f07wsu1kgv2crrp10817f76arsp3zytge80l9qiv9zuwj3lcl3snlz28it5hcjo505kbtma833kdbjse8k124c6j9ldiu7vr4ba1c172j6yevl33u73a',
                startAt: '2020-11-04 16:13:50',
                endAt: '2020-11-04 16:10:55',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'ivi4esqa9tv3mjxenraq7e8knd8r1d0fzi31mmrog6ladannvn',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'hnhmcl5y8q5w99ct0uly',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 13:13:43',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-03 20:49:06',
                status: 'COMPLETED',
                name: 'apwdvtdzoo17n20brp6vii2wm7bcxx0w0wjziu8cvah1dmhuk8jqu4iyaot2pf6qtneyulmmd6pncx7jymuof30bd4fpu8qflfas22v5mkvr2ri7r0g7g5xv3mx0669d24z8ccxmorl0rnac00tmfo4thlhn53zapghmaqhez25ww3rxihj4fuyuy65t046erzh62by0gwu7g8dmu5jy0i2u086ir7aytyvd5rk9p6h7081mbjef7fs95uby0yy',
                returnCode: 2741413937,
                node: 'tnv5bpo2tc9zvk2xye4okralxmd77vl5wuul8j20ck736ueqx252js2o1prwjuo0ndk66m93zdmk4a34m1lsfvkr0rqbzcb2vy4bk66u3cp0o2ne4loq72ghfg9l64f84tc0fo4yhymhlyje1klse33qqi7xwr2g',
                user: '66jkb9titoh33svrj445lrp7k48v408p4touoivp9tsi4tx1zikxoas3aumpe69c1vnhtzvkq3ffpgzq6x5fzmi7depoijgegtkk4fpzl4hatyv3xtna81ypgjt1p3pmwowzrqhxhgg7k3ecmg4iwdew2f73i6w63rjw2fe4qs81te6qr9vkii6bu3hdp6vjs940f3kaseam82gmx82gth0ixo6kq9xel2493yr5s2w4yqv9x4k19cykwy7s61o',
                startAt: '2020-11-04 17:55:57',
                endAt: '2020-11-04 01:02:47',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'r4cgxl50sqy7gc8lox6zh630nzg79w1zl89kw03kuu1a9pa7lt',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'at0vytjkv3a5wxwjvxfx',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:02:49',
                executionMonitoringStartAt: '2020-11-03 21:19:13',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'COMPLETED',
                name: '4humf3joff81xnufsj0cu2we3rj1hslqt9p15rnsd44n6ho8zjqr09uckmubtqdy6wz7se8dtaikego7czixsfcmqxgrg8c4yewzu9l3ybxo2x60uf1gll7dlieuqeu5slawiv6up6eui0sufxwcdhuameafwnf4rd2bcumcuyvku70ag3ij7kfrdahxn33ecjl4774uv34r7izfxvaskjbusti3xi3u3li0pvg7a1mxzzjogefnfay5jd7rfad',
                returnCode: 9390363838,
                node: 'y3ts8f1uxqwm1maug7s8alhgywz7izrkw3b2h7y3dnh917eer1z6016lo6dhzcbsu3zq637405gc0ujdzmv7wccfzvmxkutyflaqlc1ts5zl2ilhcbfsz6wtg9a2idv0tnpt28gzd9hvl8cgnwcvtu8dpznddwgz',
                user: 'vh86k57pwhkruospbccrbp2812cms6sizai9tfz7l627gl21i2vu12l2wnwfvuugl9pbv3g518rr04l6eki0084oz0ldwy8l9570iujfkzr52cnirll6bd7ehj7mm27363mfvg8w78cf1jasl1upahe9pv4dpga0vagmlvhrswuzu3t939m2bvsc2f71n1qvjhz6hresoicssedjlyuqee66zlakf3s8rjdq8e8ufbixucrmmyh5tsiz88a3wyb',
                startAt: '2020-11-04 13:01:42',
                endAt: '2020-11-04 13:41:53',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'q2lun5xg8sz9q15sfhr15irb709z6wuzm1ugzh98u5khua8p6r',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: '24nvczh08jgemb8u8hqq',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:05:21',
                executionMonitoringStartAt: '2020-11-04 09:08:06',
                executionMonitoringEndAt: '2020-11-04 07:04:55',
                status: 'ERROR',
                name: 'ggay0uouarki47l8gce8lutaylkzj4ql95f7wcjpmxpjka2q2r6atgxa2h0j9bnuj4fzvik1cat324iasrlg730fysi4c60hodb4ewuv7nag2g43qxkc6iu84a4atcrnx72w8vliut5dmd2i1h5qz813qfnwmapvhsesg6pxm7l1f7hikoxs28ouxpgfw2zlplf6fkoiz44hu9fphubllicmazx25j2644cem44sgzxxn3vca98m28z336zlwf1',
                returnCode: 6654449142,
                node: 'ygp5wmngukjup0yrzp1nmms32rztevamkmwsq9upuah49riu2fyez75reow9s9nzeeit0zyqp0nrct65cfiechwk2mpam1nei2bfcn0t6kir2ju3oex8civaertjuwgeis6nx0qf6lseavcat3vljryepv3ryutw',
                user: 'l8hi6lupcnw5gh81rgvd5j6ntxn791ay4sy7wv0kt80qxwqda18j9pfo1bzsxf5de8exzzn9sblyax309qexq4rzeruodiveviuc2spa1l0fl87enib1uyibfocauex7g9vn6yuamhsw5vnzc0txxg8amd2ciuh75mpc9nayb3cw6cg854nsjv3niih4965wez26ulpqw4g4iayx33v4c1pc06sks6416djuioxwmmt8dnm3b5tzjtp1i5azqy1',
                startAt: 'XXXXXXXX',
                endAt: '2020-11-04 15:05:17',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'yb0p00ek2jdgxxxiwavg7mk4f002232hus8ch7uu6j1t7r5ogr',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'diwbwv6sopmwatcy8xf6',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 21:45:48',
                executionMonitoringStartAt: '2020-11-04 01:35:18',
                executionMonitoringEndAt: '2020-11-03 23:26:53',
                status: 'COMPLETED',
                name: 're1kmwiq23b5d248g7yw6z13vez0lniku7aadzxbvcfipjfjqid6nlpgz7pv0i1xji2li2r85vrdz04kekpl0xf7fxisbw0gt1jr6q4tv4axbo54jzz3cqwkrza0uo0gevbf7ta9d9i6d78a8wbsi3fhv1m3uvsrwp9xg3wrqcapn0y48bdxe7e3kak08hbiftfe9nfu6n3b8ewf2f8zdnq2xytr06qvt1ed4jqqweq4x84wrwfjqol28cu04yr',
                returnCode: 2313517513,
                node: '80eevthiy2q611qjh0ekanqm1a2rdcrun1nnm7aivzxi0o7sacpgba3y8nln4wcw0hk9z3hv6ymtsdb47tp6d6dw7ahafxg4z60j8gu8yozf8ax7i8ry8u06pzz8fkilmhe5oi4e89838peqtvl6zt5ytw8hdpkk',
                user: 'nd7hpj2x94d2nsqutaapq78uvu1kimd4n8sv432hgh0cggpoqh397vtpyvv07zxvvijsvsa1hsflemc4hawfwzrq1tzdus28kgw039250vahnsebzskpysa3shlm66m9kb05aco6gdj4dzyo0cmkqgalucxtuuurhduwbjgjr5i98irlu9juqez7fq4izqnjvvsg3mx9sxeoypm8j5t0pnuk7azfa0s1mynn3pl1b2fpnu0fr7dsabxs8j1fuua',
                startAt: '2020-11-04 05:02:20',
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
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'endt8nfucdcebicaqapulffqn8zffya6dunghkaow2cmpv7gu1',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: '1daomzq0rtjiwp7p9zri',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:23:57',
                executionMonitoringStartAt: '2020-11-04 18:32:51',
                executionMonitoringEndAt: '2020-11-04 17:34:41',
                status: 'CANCELLED',
                name: '3c4sxil2veudohhvklae08cj76z9gh96ghqi3p0lc0h1xk8qbv13cvng0r98ti4bryrdgcmtmcvxi0isvazbfr9q8u3minctxexjhg92004pfcjje9mwysf7avb481thtte5bujyfm0eyaqa7rjuwlgzblz4otkh27yzxvbi60wa3mr1eal7bxy868udciuynpmiw181k6bsilnauuid7codnaxehu86hlr511nf5kbqyw8mj8vez9rv6mwrus8',
                returnCode: 1504591245,
                node: '32xox2v6wz1eav1s4oyokc8w6zh7zk39cowiivd8tscq8p3y5lwn8x8bhkuoqp8lg9l2ihisywxx4uj9guhu77ewmyzv2jxeuuzyosy2eemustiq3omh2h1o01dbfg0xa9km3nvvhjharqa6ekinwwocnmz2elts',
                user: '973lykbyfqzeclws0n6leoti2pecj2044iskisddsufud5jt4rlw4p5u3nhlmn134nd7x7b0peebzcfw4ez18jq873lwkilzlykxercqd8cy87fcdtibm53r9ve06vbkeam3kn89otoju0u7m2jt8y5wojgl2qb4u3mg66omy7loxzjtibo8s6aw4c39ultk1cgpdrr3ac4mhwg5uvlx8azhyu513g5fli89cidcexk8t9v2faf8slpdxelk512',
                startAt: '2020-11-04 19:30:01',
                endAt: '2020-11-04 11:09:29',
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
                        id: '326a58a2-c108-4401-8cce-2fd64c4afda0'
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
                        id: 'e2883fcb-d764-4aba-9143-f48395492192'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e2883fcb-d764-4aba-9143-f48395492192'));
    });

    test(`/REST:GET cci/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-detail/0a548dfa-5ffc-4178-935b-670b361b7c27')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-detail/e2883fcb-d764-4aba-9143-f48395492192')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e2883fcb-d764-4aba-9143-f48395492192'));
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
                
                id: '76c6bfce-0106-4358-b596-9703bc50676d',
                tenantId: 'ae92dcd4-b2a9-4c8c-934b-6fcbf371f448',
                tenantCode: 't3clcfkhxf75rnba4s77z3lcr7qpsjqzzd6u6qg04nbkwikec9',
                systemId: '984711e4-579a-48bd-bf18-65e4ea74ff7d',
                systemName: 'v79yfqpi2kfbks8gyww6',
                executionId: 'a7cb5ec2-a015-4bc3-88d4-ab107d449741',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:21:17',
                executionMonitoringStartAt: '2020-11-04 08:48:00',
                executionMonitoringEndAt: '2020-11-03 22:33:39',
                status: 'ERROR',
                name: '08ooznnxh2g2x0q1u27wfppsl1du6x3ywzzxpuxtkt2xbf2es2lgjab1kp710h6od9okkenj5wszwfe3ds0gj345692xqtm1qnziy759tm4ia9kizp9ae95x5sa6l2aqxiyez6cle8hsyhcep0ajp71kusxqgylir0pedpuv7sepzgv0kzvj6x5ojdwet73m3xjq7xwvevulezz0ottnjspvtnd84fl2erqa9aqrsq5awjvn0k0gihqt9thytit',
                returnCode: 5822485703,
                node: '01iv9khdfgpbp0s6fgfofllb8tfdfe4qvzyab2blun9ppic8v8zcyo74wyb5g8lojmxkq92doc1kbh4g1oxmh6zka6vso9pfogw3t0wsdfw54m8kulh0iarv96qvqb6e7u2v4ovtodgruhyzbqa2dyx3awlycl1p',
                user: 'v9oejgwh0jn6u8orobkz6fqu7lj9m2w2n8j9ng0rkx5r6ef971l32y2t0itrz52qpoffpql723un9ruvctxkfm7gp1w5hnr7rxa6iqwp5drrsd3rznz3tlvfs5bixwihrkzkx3qhxwwabltu6cot8580442rp0y4y52him0udsf1xqfa0kjpqahmdj8nq0rl8eb8duci4uaf4ku18uifow0xs06eoba5dsa8q1dgr2nika40xhl90l2mprlc2by',
                startAt: '2020-11-04 01:53:12',
                endAt: '2020-11-04 03:24:49',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e2883fcb-d764-4aba-9143-f48395492192',
                tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                tenantCode: 'ac4usn49rop6qwh6hft0uhuw34y00owuumjm0rkfslqa58al9r',
                systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                systemName: 'e5gaqji20rnj56en95gv',
                executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 09:09:45',
                executionMonitoringStartAt: '2020-11-04 05:53:30',
                executionMonitoringEndAt: '2020-11-04 06:59:14',
                status: 'CANCELLED',
                name: '5wtsb5aksdzzyt2zlq0mpwiz2v9aby5z23g6xb2ek3ec5ja4jf50p0vefkh2m36dyldyweqx1n7wzd25l8j7z2okiuhg7l1o20ho5ysg68ftnr276zbt06zzku5bbukkfmwxfwe06s1e1zldy0lxuyn1joqmyi5a1f6swlnpce3fplt4wdaszx944z7d3xaglgdrrrhvfgles0j9q8ar0hftiuibndbor8axe5vz6h7orm2d94l4erinnnaamrh',
                returnCode: 1680811260,
                node: 'shh14g98ws00iguvzahejjd0ped1p1se7s93d5pwqblji6yzemkqas9sn8f6iucoan3plsq8e7kyk74gf0nfjcpeefty6u03pn46mw0zmlwdh3tmanmj14u9jt3pl348dk4aw32l34xdj7qiilmr9qmkquqgfcxe',
                user: 'ilm327splp9zikq9fzxkk8jzqsbr033fgsa803uqf1asp7neosjk7ef38e45zjbx8bjmc2ux1c87fxne7szt6ngym3n71z9jhdnlhm34ost9q1mbgsvvr8wn9zic8i9omectmx853xk6417f2nioi5go0umfna3ntc36ukt2nr533d07wr61c0zw03o7idv4ajadylkg9xqrceudupdnzr9r4rq7o5bj2ig94co3nhs5i5iq4zxxxlm6yfuri1m',
                startAt: '2020-11-03 22:46:55',
                endAt: '2020-11-03 19:44:51',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e2883fcb-d764-4aba-9143-f48395492192'));
    });

    test(`/REST:DELETE cci/job-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-detail/dd276593-6a33-4dc1-99d5-053aae2af117')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/job-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-detail/e2883fcb-d764-4aba-9143-f48395492192')
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
                        id: '7d489b49-a130-4b5b-93d5-a7cca088de44',
                        tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                        tenantCode: 'rz9dm5f6s7sr8lpv3eeap10ip0v49h0n48l9k9990z5k6nl8le',
                        systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                        systemName: 'prffunw4cgifbqz6k57z',
                        executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 07:52:19',
                        executionMonitoringStartAt: '2020-11-04 02:01:58',
                        executionMonitoringEndAt: '2020-11-04 04:07:01',
                        status: 'COMPLETED',
                        name: '80teaj9e9o2f8hie8yxxeom92ittyi7wbfwsn0evzab1klr9x7dztt4fpqsoli8mrkhx35ij486qhpe8ulyddjovg5gv4mxv74jzbc7qonexxiasjn4z23gs2wsu3x45vxunezsjulkwafz66goulkqby9pg8l0d7ra0d4axvfzw292ow47gdtt2ybpyneh027jvcsqqdrnyfdrd56wfzepded1tlrbr0aueiasl59japvwp94d7lcajqqtnteh',
                        returnCode: 1846975614,
                        node: 'prds0k1292cq2e896t3yg6kgc6q3znpjqgu1fuolbr8v0jow41arua6f9ll1yrqcyvyjwfaebvgj8sdq0oivna21pkv2z6dy6oqij18xpwio1djh02sp86nxg0qedznpwdxkg23dzocvdlu948ss0g0spqo5lhy1',
                        user: '482ygiclh0s7rciwu42bbjgqy6l9tu53h7hkj74gdzszflfecovcm76l4yctmktmlpkkc33ahie35jn46dk49qnmbexmczq7c5hes3pkiqpqm4dtfmnr2k7z4r627coxkbfr92t3raz217t2c26rd4ycmp1223mlcvti3eefebi729j1cr6ccwzfou08my6u358f89eq7qy9ft7k2r9v8whmbfvr2une0xcx78ewxq6n6hl40nsjydi2utwpomf',
                        startAt: '2020-11-04 16:53:41',
                        endAt: '2020-11-04 13:56:58',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateJobDetail).toHaveProperty('id', '7d489b49-a130-4b5b-93d5-a7cca088de44');
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
                            id: '2486e3f0-8f32-4887-9452-0f8a0a29882b'
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
                            id: 'e2883fcb-d764-4aba-9143-f48395492192'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobDetail.id).toStrictEqual('e2883fcb-d764-4aba-9143-f48395492192');
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
                    id: '224dcb24-1095-4420-8bd4-12d915fa2129'
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
                    id: 'e2883fcb-d764-4aba-9143-f48395492192'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobDetailById.id).toStrictEqual('e2883fcb-d764-4aba-9143-f48395492192');
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
                        
                        id: '39235c12-9804-4799-9e6f-ca4c8d8b592e',
                        tenantId: '0e43ef9b-deee-4ffb-a339-9aaed2a4ec0a',
                        tenantCode: 'lwe3hr8walk8g5y7dr1q2xuazsu9qwy6t33gn9p4q8l6eg55ol',
                        systemId: 'ec908630-6d14-4fdc-b8e2-886753fb8f40',
                        systemName: '29wj6x98zldv8pkdf9dy',
                        executionId: 'a78ce1b9-97dc-4fa8-9a0c-108fe030eb90',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 06:43:23',
                        executionMonitoringStartAt: '2020-11-03 21:44:54',
                        executionMonitoringEndAt: '2020-11-04 12:25:39',
                        status: 'CANCELLED',
                        name: 'gcs8mh6hzlkx9cp35fc40se5gapwltckns6fzv2uuja5yueg5q566mr3leysju7h43f3mn80i7olf85nv48pzbygp4keuoqai7dqm5jei3rng7raqkql0nrm2ki8y8oilloajkscx1y8ejdwa58hfifv92033zh1afluqwe60zuw6v7kydytbgofnj9abg8uw6q1tisq4i4xzwib3r59m0l1wu2aiydbm4xg7nw1dskwd06xye0a8pw24lxmjrd',
                        returnCode: 4009878302,
                        node: 'cx536tnt0s5dsbbwl0tqps0hir0hnrcskmughjqwnsnsurptacz7fp44jgvksfeq8eouydl9hp0nyljjefnhyhirvbypgo29xyoqwxgopahy69n4nwo70zg4sofxnjsxxl2zmdu2gjpra9urpedgc96453jaudbs',
                        user: '9r7m34a62v0hpcw5wwtncm1q94kj77dvqittt0tm7rp6sehw8dqozu2f3msunxjj8796ph45pbync6jt5jxb9ugyr1583r8u9realu22njf1ajuyzehk8sytqx0q88d48fx6qb2bbf0lnzfza36oc21ouqu85tunxl4ok3w3fw8fing9wzxsz7llzx6ptpkajga5avbe7gph9mjd93f2sv2f7ibi4wsqyjmls52t1vknq64k5zf6re51hdilz3l',
                        startAt: '2020-11-04 16:42:09',
                        endAt: '2020-11-03 22:43:33',
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
                        
                        id: 'e2883fcb-d764-4aba-9143-f48395492192',
                        tenantId: 'dfeae523-6261-4c4d-95b8-a2e8beef0ecf',
                        tenantCode: 'h6zn189sih3mfcaloas9qnppc70omy0zsn6w5l50o5kifd26it',
                        systemId: 'eee96826-2ee9-49b9-850d-5aec9b89114b',
                        systemName: 'jx86s3mej5l4gu79lezf',
                        executionId: '2928cf2f-53d7-4d6a-8734-9979e1049767',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-03 21:47:56',
                        executionMonitoringStartAt: '2020-11-04 07:52:42',
                        executionMonitoringEndAt: '2020-11-03 23:35:07',
                        status: 'CANCELLED',
                        name: 'fmxvlhnods3th7ntiijcg2a2biqbbx9zlgd3nn21090xzh47tmpiueifugluc6p1kyp1otyqeketcs7c9lpi6knxfqssrgiax2ntrvizmu2lqiq094rcvi4kcnekj0x6afiz4u0zwhvdxcz1crvlbz2pqq9lhv3ly5na7k2t6hm63ddmjjhtwfy3zhuk3qesc9ayjgbt4i9k0tbriwjyx8a5v29pp6ivd3sd5v2uq0f81ovzg98w65vnhklc0px',
                        returnCode: 3231158276,
                        node: '6claq9lmh9eidax3fn35kgklyh6muovoz9yd37qjzy88qmhsmd6knqsgaof80vev25aywrng3f1yp00l18b0qlj9mipd1ai6ctgbhp3hgt5hp4re4rn4lmdp7mrz10dq4sopq6sfxau40tci4y4f6cd5g9s4bny9',
                        user: 'kf1iie0w4e1jhxpdnqivjg844yn6tn5an33uljgjaqpmru3mq7cy47ct97c3axs1bdp8z1ayes9luoht49y6suuxt82sm4k4ixoiv6ojd2dp85530jitonkv24dn6x24x6o89ydaqoj82f53qzmq8ckp12ae0g37xab7zm8uhewoz3rp2jrjl5tij0yc6tfd318kva8c9jp0p9qq7x9h2pffo29sm5pbv4iqcq5r0d97d2igrhxmlv6w14fwkhi',
                        startAt: '2020-11-03 21:45:26',
                        endAt: '2020-11-03 21:51:44',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateJobDetail.id).toStrictEqual('e2883fcb-d764-4aba-9143-f48395492192');
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
                    id: '0044e507-7f86-4935-9dbe-8f81f523f3a4'
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
                    id: 'e2883fcb-d764-4aba-9143-f48395492192'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteJobDetailById.id).toStrictEqual('e2883fcb-d764-4aba-9143-f48395492192');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});