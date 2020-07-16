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

describe('job-detail', () => 
{
    let app: INestApplication;
    let repository: MockJobDetailRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
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

    it(`/REST:POST bplus-it-sappi/job-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: '1m3gyarcnysjivh7k15y',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 03:52:29',
                executionMonitoringStartAt: '2020-07-16 07:10:07',
                executionMonitoringEndAt: '2020-07-16 09:24:08',
                status: 'COMPLETED',
                name: '7pm9q5xsfvubz5il0zttv7qziegwztbibxss8b2gbf17u62teisgi3lmdmv3mgneulbknnfzvx2mrvxudhe65rv195u4c53zb2yi0bspezn0vs2nws8fv2xpa9l8nscapfjc1u8sjb5f0hnahjhm2ib99tvfct4tyl99u2g1ewd5qfmntsgeg53r3g4ofv19ywwddgl7ijxzb03ub2k1f7sn5i2bp25g289m2joewv42ldqfuviyupipexvvk4b',
                returnCode: 3308743771,
                node: '1rslrpj9b2gk1az0129un06tb221l0um63pp0sk9n5gjkdfva2ko1n3bhcqy7ed3nqp7bfqxq466967bz3c5x2grpluj23ymkn492i0j6h34wavqgmes8bz4izwg878ruwwh8kjfua91l0e3j8lrqg428jd0b8vm',
                user: 'uytx95nz750pc6ynyh9tzy8n4qu2hbucbg3bqueyq2s42rhjn9jpr3ykb1c9ff6s57xsicow3j5h5do4mm8qqcgjkbsmuzfnff8e9gmpjbwn4x0wxnoxe0e8pusyn3uagzki33v8by6rl9jp18m1qxasuv9zxbgpvzqi2gqgnez87rnt8d92irrpkesrtx55z74truav0yh0m02tk930bcx5pdos6vmmpxkgdn5fcyu6vtmg7j4l69ztkoaobuz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'pssbt062fq2v1ebeymwa',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 10:34:07',
                executionMonitoringStartAt: '2020-07-16 06:31:31',
                executionMonitoringEndAt: '2020-07-16 12:26:19',
                status: 'CANCELLED',
                name: 'lwneibyy17kcxlby4hi8w5hk6zesnn8nog4vc5br3qzeqdpsta9vlaahu7tv8ru8j3w8s9b0giu4mp3f0smzcqssz9zdsx5iw8oi9k60h3pginaky7kgs8ekefx18qy92p9pj3qrm446y6o1kjy4uah4stqytr5h9h4sdf92vft8hiqmo8lhd2klzhjiup8fvfaiv9fj5lh8893776j35ffvi2urk6gakjo3um8jytlwwnoxwacgkzyea1q5pnl',
                returnCode: 4406282079,
                node: 'jhaa2kt2vi0bp2i81qth0ewk0pogu58vbowg4n73g6vn9yycxllrxmiet75fi9o6dvdmvwipf9z4z1085jltubr0g1sp7b9nnuab0enkdz97qhsl73wmp5w41t3kmxk4y432n2euszu774beg1dpsiz6kt06mz4a',
                user: 'tgg3mua02h2k07minwlogfxfg1vgborsoux80fja4bfbttvpgyk3jpsple38n0bx8p9ua6v3egl9gr41yvpv90zy82r9fm6egmc0wn2fjl0t3o1zsmo5rpfbvsqfaoldhdf4bp7762xfdp1q0ygbd3nkrmg3qsi3eh35lxh2ydezlo472s7y1x0ok7f0uqd6ex1uxt9zn4ewtpns3tg7jrz7h1yoq53rpnw1h6ojpejdg29pkw0218z431zk7pp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: null,
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'quv8i5q4mqnfhzqh8vb0',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 08:05:16',
                executionMonitoringStartAt: '2020-07-16 16:08:09',
                executionMonitoringEndAt: '2020-07-15 23:15:39',
                status: 'COMPLETED',
                name: 'gu33zue4isq5f98gphnc9hjq2oa1k5553ez09ne9pufwuyqaghf3ewzps17q4f41i8s0iuk4y07rc1izaplly687dw9nvcd6096kpjzfmeqdn70vephhcsqidxlcdrtu6a1pijkgr4wxuw5am2wqqepmwoy7g5ifm5hyqstwwqomeopbigwp329oyw464bmp9swopoj54exq9y5i38w68omdlap9fs8nl29om3lm1zccn8y674alza7heqlro6k',
                returnCode: 9528416520,
                node: 'yqev9t4wlj2x9ag5i8z0813tc2l47vknlnrwb456vys5ms3iq3rubs0y16kei49vkhzyjz0r0s4hgnffc0wf83e3a0g8kjuqa7rfxa2dwmykn9l4nhbzd1taadyha7by5wkdkzz4vcj38aw2ns6wrs6fqtq16i17',
                user: 'hw7z86jwgwxr5l46tntf6rc9jqm0teoliigh4b45ql8kul45j6pr2ks9ad4zf6cxol50jj3f5oj0fhpfpjuix5p1hxzw0clqw5p88hxnzltxdm3favmpovwr096phz5urwxtlj1ysba5j0k6fvzs7lfu8szdlbgsc24swvlacmz9ce01cc5ddk1hnagmxsf18f59i874pcvtofim8pb1jmcshinltnk8w3kqp4g51cvuvc07fmr4zkqe6nreo0s',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'k8ybxr3hl4qluyr8k761',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:14:31',
                executionMonitoringStartAt: '2020-07-16 05:43:05',
                executionMonitoringEndAt: '2020-07-15 22:04:51',
                status: 'ERROR',
                name: 'd3w50gknhlqpp96bcwu6s9y2w7igtbidz802ip4h2kj0tpvnsv5kxcaudbhqszzprkintx6eauc9r35prj8wy27yhrjt4i5ud1prslwwk4dp3pt1pml9f60ff6p75jknujc2blpoyuurv990b1rwnzizlz7m0cbbtcedm2hrdn7nfs2kp5cxvnb1k4u2ahzf07j7sjubwc7whhw9fgzlpmm1tsor7j8d4ny5k07i20vny95d9q3ip6vgkkgi0b5',
                returnCode: 8388554633,
                node: 'jbs30l64n5kpoya6yi8gy02xt5tri6bgly1pu4qoin5yahur7bbng83gcqob7ia3j0tjz6sj4q6avecux7rga72g5meijnp0qzaw4vqylkhqctobfoy7gl3f928rvujxa0rguz71lxfc9jvy0z4rn11c5qniaszz',
                user: 'vj6p9lgxu27mw0y9ij3sf9z167wh29ezi34yn9vrsbch7il8j0wi5esdr8gfu4bwndgtmtrqm7ptp4zsg5frzyom90vp0ceor15bmbbv2gxkxte1jscl7uu4nsuwlt76m3pr4rpvncvzeyt5tm7uer19ubrzl6c2tppxtbkix8f9clwgvpw7p0diwvehwzrwrms7ct6t9pfphklckohryb4nv19cd7gtzw89732jdlxhisv7wrgmyzu44v5ev1b',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: null,
                systemName: 'et3qzd4ar5b7qicqblcg',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 09:45:07',
                executionMonitoringStartAt: '2020-07-16 17:51:59',
                executionMonitoringEndAt: '2020-07-16 00:12:29',
                status: 'ERROR',
                name: 'faquhofxzw9gh5anv8tp2apzxu1bquq73it8uuhfrfdsmmgytik2ktar4rvqf0pi5p7rye39x0iugndk44di4g0sebjqh555gnleum7yqzm0snkzdtxo80nzc1td8s7d9n68hpvlone0mxynazqlzc7zgefihkephddl33bjoxz1d7kex7eqdy01zf6ijyk2j3cqtrngc9xvj7r98heojfq3rm1mp6n1llumhthi136189tl0ax3co1yyjwe8zz',
                returnCode: 3520509272,
                node: 'msobb4326m90w9zj8lj0gwdkmtx81l28zvj88s8v8urcz0n1a8v5czgywq9hf32dd5pkylpkz5tdnjwh16l3kdv8eqsh4ucn0ir46w16z4a7di93440l4jz7j9w4pw8ajycvyru5vy5tfdf687penyifcswofiem',
                user: 'ue46g28qen4tqxfg3m8zf6gei5rssr017ncafbwdx4xs83a33mzwzjugsh555nmi72qriw3i6nniy2g7xbkgubi20cgf42vlf0gh3kjwbpr2b8y5v95cf34t0ooanzuosuz8sx0ap147p4grnettvcz3rhdzu8yky9ahjy7epamu937u5aoj5cdml3904flwsyt24fz1q590ushavs9q9vp3smvjyokiu3kj7j9hfk65u3y48ik630hwnlc91yf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                
                systemName: '4n3j4u8i9tu9ep6634s8',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 11:31:33',
                executionMonitoringStartAt: '2020-07-16 11:24:05',
                executionMonitoringEndAt: '2020-07-16 18:02:12',
                status: 'ERROR',
                name: 'ws72lyila1dh4pclbyygzhytgs8ycef1ul6pjjvmtetkdt03w12znvnqxbukplk5ka7bbydmbu51v6dhn6lcec686xohmtvbz0gimpkph1sze5auaqfpq7t2tvsb2095mocue85fitcbk2h8x011pw8c9qf3k3chyeqsaf4fg5zoocune352yookuns4gfi78h63fche6zi2e388hy0bke3usg4qdib0frfyl50hi7f4u7c2l8yvv4ukzhvu1fi',
                returnCode: 3560243202,
                node: 'f18tm4mc2j402v388qmjty66ykot296lo16o7ul0gbzt4dovut521mp5xtlro36jrsuqwe6oot1pf9xd8qy9ugflo2wb4vpvb8qfh4lxyv5e4zqelw89ezz66d6bau6r27a6u9pef8smrr0nou03z7tfxqj3kb0u',
                user: 'gqtnarrwsbsyvaok59us67ywgqfk0t8t1wftkl406b743ev4b63l6gohwcv0zku6v0i4w5hyodhx87rvkb07yefu5zrnfen1a2fhjoromzut5h8ksacn5ox2nvenqi8d22yut40zuett4siu6rxgvztjee696ffdkuu22672xpm7gec27e9rqnaodzel1lgqllq6oy2i9a1b5og2aga8gmpkachtc0t8lni3ylhn7vht2pyedvuw1n07sz2xgaq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: null,
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 12:22:43',
                executionMonitoringStartAt: '2020-07-16 19:11:40',
                executionMonitoringEndAt: '2020-07-16 06:33:36',
                status: 'COMPLETED',
                name: '7ndiqi2l25dxk2v0vly5s2ayd24j0goyehndmss1trvti6jg0kfxl85gu72kh7jbz9em3kto3o64pe6t7vzfvjgbawwpwq2u5kryhqvnkxy265bzggcgudt718picpiapf5fd4igytrrjv2d19cmk51nehrfhf3b6a8t64pt5y115slxfrgfkkj9thm146tu21qa18g1y6pwpdo05xnvrifv072qte89an2d5aallfjgcef0nuai2e2gnbehvui',
                returnCode: 6399193024,
                node: 'nj6zq6zepcj4bz8tgvr3aqpbh7ffmm4x0wd0odyxc5lwoqjrj5x8sla8czn82squgrjy6iywjpp9zv95uwlrzag35yv8hz1rmyyo3hjxs4cw4pxg4ml01s8glcwpdlnwhpslik49hvkvu1ptdup8htip2e54j562',
                user: 'h04p3p36ud6n49i3fscsx5c8ctp2hk440njci0jlzu8on16ovp9apqwvz2itz2vd5uvn3o50ppbi23e006vuzki7ms4otzadl3b00xzfahn8lkc87iqb5jrsiayd6o65kgmnufkhziakzkl53r250xo4vp8i5wg4pxxxzci9a3k1kpmv5z36521m0ndlmik43ig7ad9p026g43obv6n80hfotrhd2fjverqamm0bxy7m1pdg02aa74sme04djx6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 09:13:08',
                executionMonitoringStartAt: '2020-07-16 12:38:21',
                executionMonitoringEndAt: '2020-07-16 11:57:15',
                status: 'CANCELLED',
                name: 'twhncpv6zoejezkoasznw3lc38bzf2w8prj4ahyj39pwz0efstbxrxpn0a4xyb89s4cb3b7gbzon6tgmiql0nxv0rm5r7fl1999fb45bdaugsdkamdokyofpan4e0fcc4a33q8x6dztp70mzdvqlxl81zpgzc4b4i9z64bi1385y9cpokgxeu3mr8245q4idos1abwarov5hnla46k9rbgvsob4tprf9vvman0ghltg6o5juv4a95jv5f0bjb7b',
                returnCode: 6384117680,
                node: 'w4uxe1bkfyv62ssm8vd0p2bskgpbbclf6i8jbfdisdhqk4xt7rc6f9ha3ggqc4j4dbazllswlwezptrkynx37rjvls6fuf7ocwhqxmnxhbxhaclcqgyk7ty25lrcm80xz3adim1fock34wmone1ogoh057t947rc',
                user: 'xq6u7qpsmfy3zfb24et6jmgxefwniv5z9yjgu1869no1hvpi2j2d05at4xrris0r5yf0ezvkb0hiy2afbwjhgymul8b4hscvq2am766c606wohtilhp0iw9e54cq6s2zdzioyn6w6kmkonibzkyauxhmv7zo3uaejd1plens0tzhr6iju3x5ukm2trqqutgd7mwfj07nz6nvdj3z4doofgjejvpb7r6016lvdsxtqk50el0kr3gd408ezw5fljc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'ywohl70bcq2cyuysy4xg',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 19:43:52',
                executionMonitoringStartAt: '2020-07-16 04:09:00',
                executionMonitoringEndAt: '2020-07-16 18:35:53',
                status: 'COMPLETED',
                name: 'dwmmf6jekxsina9tnjwjzg9tb94xp077cfq3i7764s2dojt80kzomb8e16l3rd88ajec87mvl87ekt22x1z1cv9j7ds7o08pk95l1me4200aw1zivpj0638jhzqoy7ilmxrb2fs01mqx2v6uqicvaph5sli0d7vwp9ah9ve2p1ssifr5ode16hpww886ewju0a5q2jpnxg6elvogy95aheqrg6fau0xwfes14gwawwfu7c45bf23yo2ktbatljh',
                returnCode: 8177719500,
                node: '616xouwpsajzblzmh273q4odgtypd7r9ikvbv2fbkzkt2yndkf3pr2lffehn9u2q2igmi8kle6aqnmqvcdxb8uulcc51645r6qgad9eckbpdt4eo6umwptlux0ue72ewxcn69f5ca5vnat4m8y688b7qq1422y4x',
                user: 'pulx9ovos788luc4wyax8gnv5eqo2lsj5oni0lm039hyin8k0i3eg9st47grjhbqxqa5zinmlx4ncpxpghmjdhq2kfh9vhe9t7q6xo07yy9p644w97tiseduqzq6q0367vhkgy8rkcbzzj8klccyr06739h2kmd7bt64q2j44nj6vhv61mymcoyvilatqp8vpi49rsx144z08z8rvhtxyid7gos0kp5yopwsvwsa5vcm4n62827rby7kxsh5o2q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'bd1679yc6efllgs59t76',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 13:04:28',
                executionMonitoringStartAt: '2020-07-16 08:01:43',
                executionMonitoringEndAt: '2020-07-16 17:02:05',
                status: 'CANCELLED',
                name: 'd4zyzjhwh7ew8v0animshmuaifhczxa7yec1lvvsvo9dxikddt7ux7hg10eu2gcynywwlejvz8cfj8z28bdkconva3ecl8bb7jmv9m55o9mpbq0rchf49i9bwudpsto93v6hv43waxkqih1gtlpfwxqtm0zjk4a8g2196wxh19hf2vxo6wbe6m8f55bet1ahah5xjt8myv03o5z7gho9xk4ze84k7wwdsxtl3lgn2qp7pp4ifp16lbgqqzhzdp0',
                returnCode: 3805297212,
                node: '4b1c327bbw6r93tyez8x7kp81u675rkz7a0uskr1j7vhzoaornq078wamlntfm7feuhp4alc4uwpb18lcnsuk8h9248wdwuzezc3asm1me32mruasf4neu3xh0xoapjnw68m7dkoawsg9ilzoe33z2s140fbv3au',
                user: 'aw7zpaiz6l5iph7xofrbca1yi0clrwx0y5vxstn6si7icd4bb7wx0dj5j7faxnxlwm35uwvut13izzr0mvvlpeoobl9oprdzhye3jhrd7nch2m6n78zbpfdfcwzi7hz4hp49wquj67k8efm6kydt33pdktphhkyih6ntju460wfzp3y0be7s5r25h68pqyx6muwmesgarbp84rmmc1ia45dfwb2173wxpk3pv73iica54f1vyenxnowesq0bzp7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'dzrr2bppnq0ghl776wrj',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: null,
                executionExecutedAt: '2020-07-16 15:39:13',
                executionMonitoringStartAt: '2020-07-15 20:02:21',
                executionMonitoringEndAt: '2020-07-16 15:08:36',
                status: 'COMPLETED',
                name: 'uxd26ewemn7rjnprac686z5xqy9a0uja4f8fsrpqvi4oqnd7m3zu6pile8t7tlmxezn8tt23psxk9j4qtdav1l68cv4yt3ql74wmto6xf1chuouizfv3xre7db6gs0gdl7q5dc38jqgi8l1rzufc2eeblw08rdvqekd4tb9vqso566b53tqb4ip92ihj6trysd836fxqlz0fs1u944pkrjz23d89f33apnz499qw0smtx8ywr5r9pryukvxpc3e',
                returnCode: 8641717060,
                node: '0p4t4ieyig9lton1l53dy4h5d007mw297s79da02fj1tngquvdib8fyqkaa5klh78suc9ua9uovsp6r1wy41rtls3oejs53ljmvwvpiw6n5l7d0khrsy6eh98mg9zxegn3bk4o5uuyoffj7hs95m4of284uxyptr',
                user: 'bhh2yxua3gsnkwd0gzfrl94i6cjz32eyg88v6xe8mkp0nblq0csfc3zswxqy1ntilgfdkq5bjwgt8rhddildkdbmav8i7hpuma9zattkoy9yp9bvjiqy510jiljh38vp58tinhqg86nnr1fslwhu5xmnm0s4l98ppe7njzso3tpj3d58efguee0i2gbkc1ffgl0hqwcwskkw2zuzfsdmiw3ltvht8wf0dq4464wcorn0eu9zrj5y030d7yz850e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'lly8y70n1xrdktkiyw09',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                
                executionExecutedAt: '2020-07-16 06:44:18',
                executionMonitoringStartAt: '2020-07-16 14:21:46',
                executionMonitoringEndAt: '2020-07-16 06:48:08',
                status: 'ERROR',
                name: 'q7zofedokk0p8sob8oqucljs47cx7aytvo79eg5lssc217ikw7omyye5rodf967gcqdyacn0hkd2za6fm4i02buzhwqduhwf5mkpw6vqb2434xnaijp0v78p6u1wq4xun8hdparbtwh6s8j2egac2y7l5y3b2zjzu73dp3r1tq1zsc2o1ovhr4wrtqr5m1hnd0t9eyr0weae4n96zf3dcya0i3dxy5wswfoi5qatq4dxaff0v8bcqj2oa9ymwea',
                returnCode: 1520571852,
                node: 'pgjn289h9emir9jjh8k81cqfyk2kffcw0frvt1a5fieuyz9skyg8pwf61zhd1u49voqj0elpmvojm7zpnm87dgdlm4f83mwz7zn6i0vfl3g3x3xjzmfff2mg2eq7qh0wpe6l76uc8ppquwi19jpr8n6f4dvt0t11',
                user: 'yw6mw1j9z3s4qv5umql5e3vvs7cbvlete1gjvofcm5shtjxd59me891rl99sm68ws7hkt99iiwbs9vn9gsfuhwlx2e0e6x9qlil9nvjnojosva2aado0p03ess60t02m0xm1pw1p0op7h0u4ctxarhrfpk0f3yndlxj3u8xude6llnv9j00eihn2s353332g2nrh739lmzva8rnmynk7mmeg3rkyjuvtlku9cjpadb47wlxe3r7vz1erhth1xt0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'c939ynnwd5kwlvrwd9rc',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-16 02:13:11',
                executionMonitoringEndAt: '2020-07-16 13:06:55',
                status: 'CANCELLED',
                name: '5qvwp7a1hxs8ta12n6g3is5nlp3n3si5yxdub818kczze8gk3l7u20aea8hx8s424jds1gvs0n3c7nqiahok4mly0t6rpw82qnry15mpbk9ay5489jpucc397iqazo5g32pmk96jjhulo2r02dwe5ms1pnr5m956syzg59vcigh77netnqnfp7au9s1ng90fxskt64a0lzn9kgll6gl1mfd4q7omjkcfsjpvl2et6svrh6q3er78rgzdsjwg2qg',
                returnCode: 8559791008,
                node: '160nm7urafeik09s5tpoi4wgbgn9am51jl4e3eiqml22tzgmnbunrsk9olfxuvvjnqemj82qyxo9a6m2fo9cf5h5ytzsdbu97gbl1rt1bn1jsl7jqj3halnuqd536ai1kz86x532z9gy2587ofz87mh5kl00udvi',
                user: 't4ryqyv9goso6xf8c34ai0uug39qww194s6i7dm85w3p7t5r1egd5qocz705dxrpvh9o65iapnqfkjh8bvh96eam1m0g89aotrob64p0vqk6i29l2949ay8alsmolz0awkfzdohwq6s8pjjjqvclsybwchjktrjx03njaj9vykvji8i9j8xir8il2ba275dvgu4louc9pyrjq03cxgjrb3ad94qf0b5zgqfypx7xqhdiafxb6qrfa21w8lulh1m',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'ffiaalp02a9vkj2e0vz6',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-16 08:23:39',
                executionMonitoringEndAt: '2020-07-16 18:12:41',
                status: 'ERROR',
                name: 'pe6n80ahw7cvqcrlhl582bzgy2wrnj9pgjw7noq5v7e51d2527qv0h7r9ec3t9bjcnzx4sbovxhrmi9nc8lekbrepxrrh144h154te885w9xvxbymv4wntnu28vl5m4fsyslrld2b0ly4tw9gk76eb72c1mqi5h5fafsgpa0s4ia6zzougo0nyo0avc9rrqwyzr53fkqx775xeph8tc40bvzws3svjejto0u4812c8iqkejyaybth668q3apa0h',
                returnCode: 7507361254,
                node: '6v3ncps8kjnqt111ovaiywg8u6ibe5e83y11jfqpgbq1r15qytj6iw7re38jfelcypyonklbz92ty5rbyqelduekiv31nyc1kirjzgm7tuo558h40tzir0ochx3501riewsvs2vfsa4jtkkcg9l6hsqp1zdhcde7',
                user: 'rjbrmu9twfeqleicrejsvj28hjlomnv19ropar0q9p2azhiphkr0848c3iwf7i8uykhtxeafu48l0s4wvis1d45r1j8od6l77oe13mtwi4ruj39es7p24k4yzv8svan61cf2ozniobgypuexmztx82ovfxy1n8yvhfrzjs1mtvskq31hdsqe04wp4lzbnh50zdel7jrdmnhclyhmc1xn0c1ss95q4v2cfxaczxm7e8t831qqo3mci68up1kqco2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: '6gm58pzpu91boqo6fgsl',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 22:31:56',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-16 14:14:52',
                status: 'COMPLETED',
                name: 'bj1heubbl9w5v9wtyftw6hoegnbrci1y4mzjkzlzq8nfphpxpfx7mlgt57sksv3715d2houc6eno176l9y1yvfu7hvpcmwxw05cqyvp3mniyn5981xnz3mhb9pfjtbcsnhqp0swx16lu8ke2k3ogfi6ii4k1ltlj3a8knnb1zm1n3g8s37rgd615fdriesqr3tgnhjj111pvrlgjonrylzx795p9oh0v9kvnyciqc3e2eju3vkn2adhbkmkiwy1',
                returnCode: 8840350103,
                node: '8gayk8gpwfzw6qra4ffsfp8ointdq1dkc745sts5puv3h9r3ludhwolwqteat5z2mnrdftbg5ngk7hqiu4mbyhdhjcrb23hlux9gcer02fqf68h4ha0n0rofjy36p9o7ff09sc70bokndtuwrla8h5q1zp4yadfg',
                user: 'p9b2ufff33hyxlmcyqcnqlmtdu0e7b8pihnq4k1hmkvsphqduop4rx3dkue4kjiybxpcuflmk9ln3076u9ts4m20nokceqjye7ztk3l2s4uryychlstkwfn3jif2tdrslm1of6d84yl35rn9bxn6lrv5zdhzywora3swdrlg1bejdgljx3q6r2coc5pmutgv5a6z6burjnyfjf4p7a2oiygge9t3jw3ryv07jue7b1x8mgsonfmwzrb9nz2lf5x',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'd1lmzr775nsi1rgnnpov',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 04:51:41',
                
                executionMonitoringEndAt: '2020-07-16 17:51:30',
                status: 'CANCELLED',
                name: 'kkw3logdi0w6h39v13b7z4y7n46gt4vq0rla3unn8wnj85skcchmqa2qcljxm7g2foq9s5kozsdcxstvhhttnd4kyd9tu90mjv9bsyqaasmc3q59vfa671qz78rrr3hf31b7474es0i5qh263jb86xfvqzmk04t2s3lhvt8t4c5xkahjcv8o2afvoi7zi0x3aupkpr0lg41laznjalsmja4pgx4ohrdkehix8vhv9qoos5w7m9o4faznhs9hle5',
                returnCode: 6526154777,
                node: '84xjehalqsqyoh2upvm5b79mgf57ho93w65ca39dh9ryzql5gt229qm481uy4r6w6dj3w39uit6sy609zr34axcykrn2vcoip8fa8h61m08xyuxfhtcffrir53gfi7gp7zxd7mecw5c63kcoxqfut90x1ftqgtne',
                user: '2o97knxdibljuk4o6l2he8fthnhe98entytpkqfmunn2b6qezy5xqmmgaxezkjo89b8tp9p2ngjzdjo36d7vo3zl096ie0kbupwojur64b5mzq60lu5kimr4yf5r5wrg0dkmam6af4j380ohin1wyp8ufvdibqb87p8tk836pplowu0yrgqddo51ctejeel53o8wyb14oapd6cc7jt476q7g2qqyqxpjutn0ric2thgrapdv1fdsl1mxsgwbaor',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'qmzhglnnou09sgbk9pv7',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 09:06:06',
                executionMonitoringStartAt: '2020-07-16 10:48:07',
                executionMonitoringEndAt: null,
                status: 'COMPLETED',
                name: 'v8tuak7bgut8iumfm05bligjfm4vwn5dwo63pmfwnlygmczh2ef7o82e095kjpnc6g7uqhnd25yoeyfhtbyng28twumbf0bggyzvb2ixssdqo2l2xfv0ph98lopm3xlnfa51eu9y6kr8d4zj6hbsgmkvgiewwqg3whlv8cqiopjt8o2fw8h6yvu3x6g5b296xvvck2pcp70myj5zjiqyzok8cbail2s3z4ocd00nn4zthav621vgmjgj7hn5bzc',
                returnCode: 3802095262,
                node: '1ktwjh4fwfyld7a2yjh9u73omrhjbvbqnzvahh8ndbll2huuxfm52hxbdrdlndvetov9za8hbvvp8lim5uplo7cmeehsnruuk29l0u9mkdl4qqxahcqqylh4cp75yky570h4ip2bm0lwa8rxljet31x94t59wc93',
                user: 'e4h5j5jk5nkcxyyg6kurhjm7coya5d3pyiiapo1mnpp203dcy1dzc6ygr15jwz3g4p6w2yof0n0sn2o5tpisgl4uvuymuioak2jf68wfi2tizcv3zdwxbfthpglgbjd9ju77uzra9pac9c1qda0c3qpuxv8u01rxroasx945mokm4jm6ozzaaeh1llcfmogpjemnvzjix2ocrkirktvbmksbp9a7ru89hlp9aq589p566gfxb8srtub9bn8gee0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'mcqh1mlkyn4kneaqsayp',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 16:51:23',
                executionMonitoringStartAt: '2020-07-16 16:50:47',
                
                status: 'ERROR',
                name: 'x750x2yi9xfwqpqurhaksgpmbex9l1dmu66124sg8lxj4m3qnh9bkmpa0uuwyz1jhfc6326rt65pxxicsgqsgep2t2nbllblbd7sn1bgzs029lvcs1mh6b9od7atom1gxz8xxgqdiau87357cl9dk1in7p3z6m8cacjds2gq2ar3hwguun8dpw0bkij9te3sn8ucnolzmv5t1aujvdtt5ex05d53dbq4h2aufwlixyvu3tvdrk6ih58mabhof6l',
                returnCode: 2859169825,
                node: '5clqccordn5j7s3hymtt76jabsuoy68p96jspjsbeigee8qx9osg4gzhn7zmml64m59egz8yfpk2y7gj3l4zykdglyc96ip8vwy3wml1og3q96n9e2dh0qf8gxfipbflmaupd1k3w1k53ej0uqtimdb9c331juw5',
                user: '6ud1554pfflt45sdg3gcoo9c0wud575jef0pnqh8dkv7layxkom9rg96iquy1gj25rr70cs9s1fj2h9a4l786lt6c8mbncgjkbcuh3x5nbs5sf8c4uw4k8hbyuw9nwollbpdf1r8hbdd5ljnm0fw2jwqnsvpqz0p8053xzz6z8zfrvqrcwkljab42kwpe3n7ulauai7e0oj9v3tyk2cgurjvekdmdu4kqkh5omqjyp8ltxhjxx1urds45yfc2qc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'tn4mfnb1f2h2y0mi8es8',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 18:54:27',
                executionMonitoringStartAt: '2020-07-16 16:43:24',
                executionMonitoringEndAt: '2020-07-15 20:30:48',
                status: null,
                name: 'k2e2hnfywjcajtl38zc539m1pkyz4qg5cp9u2qsju3av7f7mdviop5qu0z4z2lh9kq7vla7aujs3vlaqf4gvnpz4heznwhzj1qyauo4v7z7unkrksbpviikz5przjm5kptffgde85c4pt67nro5wv0yllndpqhu0nus0o5i7apd2rt706txg2kdir687mii9okjfz43q30fea2kelyxckzasbzkyyvnoa0rzlxc9l6bp1y8h80ccjize30cyflw',
                returnCode: 4453022712,
                node: 'rb7eaxc5m232sjm47ka7pzcegqyx5mb9ecdb88k02nhmdh2ldj9o2kob5yav8xav11mxji9ttm1xobv4pqmtpftg0o2ukyn9f1pl31f43njdcmq77ovtmr47m3g4f2xsewnp6fqw6s8ipxh6x37y6q7f1ualgjfj',
                user: '4u0havpjwwy2x7l6tlpn9ea1x5losk69h6nud9mtvp0fpt0yllmfvm92bar9emh4rt6rx77dlo1ezi805pcqy67fxgug02222g4q7dlwcy0x2fjw0dfjeb9en56g1eo7mbx2x3p247jirq46pnwz5u1vvddsbzi0xx25r4gvv2rgzsconuogel84gfzne5kt9siv88aol17aher436hdjl8ips5jr5jmgyng3smcc2vycuh40ji9w83l9x6ysoc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: '5jeni186wel13rs9gi9z',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 05:57:45',
                executionMonitoringStartAt: '2020-07-15 20:26:12',
                executionMonitoringEndAt: '2020-07-15 20:51:55',
                
                name: 'zumg7492dc9nqgziq4iclv2xzxanxy4ti5xa28x0a2h96t6fpw6e2foxm17u0d5nm2zej3ndbf1sbf9nbsrvtg3bb13ilsyelhwccen04k8wluthubh8n17z4ldtfw7ljc113ln35e4e1l3agteq2bvottgzi51f5cio6vap7du6a76597fg9nu5kcq037j0rxezr8tju8tf03in152mbyxadpigjqpv5wfztmu4z0iq576uvi39q6ijjf9dawq',
                returnCode: 4740364458,
                node: '4kao5h89c5hmqdvi41cgv2kxj5acj5wklrkh2vo1cokvjrxgssiugmmqvqf31nbjcocq6fjimi6bgv091uoi2fjph8b8q80munn7fcog1kfy8y8xn3wmh4ugp1jl9b7mchko15yqfy5c31up9mf2fgye2nr3yqjj',
                user: 'u7zdcsiqlvlmga8mau9tekd35jhz748bb1pco7390n7k37vzd90i2cbsbrwzw8nr2tjcjheqj9d0ih4z83tz5ydblo1oztt2u00s4eh5235g4u1v8nyjpubpjtkcqxc113nf1jg7iebhz03wufrkzgyzpj716ibv0ea5dp5ee9k0jmi80bc0nbmihfk3y2dvvet4m567nqt4l9gxbl21jlqfn193d7na32tyacdowkvhb33h72majquouchjzs4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'gv7r6jxikuynsibkbl03ctw54mwx74ela1by3',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'leo55b130p7plnfux3wa',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 18:14:39',
                executionMonitoringStartAt: '2020-07-16 06:06:27',
                executionMonitoringEndAt: '2020-07-16 00:26:55',
                status: 'COMPLETED',
                name: '27b3rllkifm1kl3v5en67ju9f46yrwtxx0nehplviu7oj4jl3jg2z8dtef0ru76l8bb2n9y65tmz89r1ufndujvs8oxdw8j0ya7h74jz4nlc7bplwgeqh2540ahagul3v2fobmtnowiyyopvv04acksr5zzrz7jykwjn3eegmzc2yrl7h6tj82wi59cvmf9ugw7pflhnr7bjroo0rn4g43e10rl6974lm9own4253o4jwbdaogm6qw11h32pzyy',
                returnCode: 8875162830,
                node: '6t31ns6a6s591k68vnoameup57hux82l6yz4zjr62ey09b3h6tydk4l8lv1ybihlx74dhn0lb5ujqkq4qoxdo2rj3ttkm4h8rvs240g782tgz3zp3afxb2oh7ng8tmsi1hb7aq41t4j49qbcqba89eaxuvodpr6j',
                user: 'p2agp4z1oxbtw0os8towzba34hlo5bvubobf3hvmi66k41hwlyjuq0l6k7a6kskb2e2qb7k3kunivnnzi1kbo9tbjzwfycw6xl8mtaguekbb4z4tzj0w3fpo1ncxn7t376cx9ztz3x8x9zimisr9weypg54fay3k9f4usm60uz65cctxpd9w96yn0tuju8jhbo1ihlhey1ggj18p1dgl82f9znm7hysk1l9gldzi6rlktc8ocvzf2wytdvhv15v',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: 'oy3aqscyp2fz41pghhbmiu8dn4jycd89gz5dl',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'iwk3vxnjsh172lmn1o6c',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 15:51:22',
                executionMonitoringStartAt: '2020-07-16 15:37:43',
                executionMonitoringEndAt: '2020-07-15 19:52:42',
                status: 'CANCELLED',
                name: 'r3pbzbbpttyyali3xy3dz19xh2orpl9l20n2dbis3j5ioap9jozcmuz1gwniik2aa3rfhqknijvh7mxvmhraqs675qlhgfftbxm4s6zpqm4pqqay6591y415zk3knvimg8hrcod8nxmitu94qnafnzse3vh57c03r2po4yo9katox9u2uqj75ooxax2aole31z9fxkcafddmcaxxsu2x9ttf9xurj0bnofnjwmhyvsntt8t5zlzdw5dqa7ou2gc',
                returnCode: 9567668900,
                node: 'yzzw1qk524tbmfp6g7r94lkwh3mdk4rds03jiim3fwbyrpzwez0whvyg4pl6edlls9ds7ayujd6zioyztkfiy5pxl8v8pb95wv67d9ovel6iv8uwbmqoxvf7wi5kl1ordevb3h3avk8wxg6cgrwk4yca1nm8jo33',
                user: 'zjd6mpsylg6gj3oy07lw9e7vrd5f1laf5q64h41bbh2zw27lrgnz7is3urweghoy84he4ekl5o9c3l8dsthm200lxs4kyf7v4d6jffvm0zmc1jvfd4w6d0w3lug43r0v1j9u81i5pc0rlzsob1cmn59sl1ad6re3258hnhlrhf49vqjpvd4evlf5esp9izfbipxr5b57lkqjmaekjtk37dqo19h62vehduzn9of2c16pzxdmydheqt2zjrc5l4d',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: 'jlnwye2d0dn9t0qh558yiiw0z06zkwqie39ld',
                systemName: 'tjrv41q148m5hyl4tir4',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 22:23:43',
                executionMonitoringStartAt: '2020-07-16 16:38:30',
                executionMonitoringEndAt: '2020-07-16 16:39:01',
                status: 'COMPLETED',
                name: 'oec1qiz65qimzgmpnw39hy144zk1nd7u829wliszvwlwqepr2522ksi7m89huecvmk6mwyfvsucelrq8ue3lc9kjpisuxx94sfoiu3p7w2ps6rqujpa9ckc63mudtl1oln8oqvs1glawe0g8dy9ftmafd6qlzremqhf4xhbn3nmifzrskgnkk45s2wnkij1n3z7ds8p9oxkcxd2kd5kgkol9uq5mz9uyhljlkb64ow5yfug1c2vfdstgujmv098',
                returnCode: 8113109635,
                node: 'q9huh4jxfxir2h1s68omz5poydbqpypcut7iukimz0yot89bd6b5n6fo9naj11i3df85t7s1dg2doa9os241nehgf04lbbggr5wnx9iv4cximsyt0602v0zcs617f7r1costyc94pfr89mqqg1auigwsdv91u3zl',
                user: '5a2kjliltebxvi61x5yeqqcd4litiobdhmgcwln1xd961l1qxjb1uk19glv323w3atsu3btcepvht3xneh3m184tahbxux0v90h5hl619pwkx3mqfo7njgfnqqobg298iwq80fxn2u9wsdhxtw08z6orcgixo79f6296bo6kg5bs3i4yrj7zzqgf5zqpwwit0qtd4ragkwki0ggwdrnoznyzdtwoi3vromhbyw8ggqrw1a2wzuskohkt8isc8ir',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'l6zsoo5ztoqkpw3a44mw',
                executionId: '3dircc6cvcndb5ujurnd9dgvrzwpja5hcmsmp',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 18:22:20',
                executionMonitoringStartAt: '2020-07-16 16:54:06',
                executionMonitoringEndAt: '2020-07-16 08:07:37',
                status: 'COMPLETED',
                name: '4u57eu3b3g5kmxeh0m1rvg7wbdgzigkrd4k92xxdf1m8jm4xujiotndvqrabvipchvbb8z9ipa1h5dusmkt3me4mhxyv6w1cz2efxzb1uryljfe3lazoafsedrkjeh1dhqua7ip61f3jqheny9muc2aa922s3yldznl7l9dijsje0k130zfmveudr1uk02iyaicasonmvpda9wbxl0eu36b3nsk6axk0u5mnp4wwz3bwbxylh2iup4onv46apjv',
                returnCode: 4633812195,
                node: '3g2o6whl1srbep6crhm0trr48xuwr7uo3ggmfdr5ccugo60ktnt7e1ch9mtyo6rwdqxqhgu4loz0k5snrv980n2smvkfm7d6fp2rcqbwm1qdb9xfmaqht4f2todfs5yyp8lb211gkp5pnxxdh011dasrgniyjmds',
                user: 'vuykhze1izcz5rz3n8ww9xh5ibera6w0wkpydasolty80z84a0t835hn21cfbbtqb6n98c36dgkhymf1zkojyzztla64iw00mwyew5u1xj8bq5gdwyjibzzl7hd5j9vie9ltpod478lk6vco6f9z1nfmfywu24r8ev5ja9omjijnzaaf2i3cpqzfahcbyhn2rin2as0b5far5p23ldjsshxi5h8o1s5g1cxhf84qastji3ul3vfhhcvnv5gqmik',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: '3fzncqfn5b0oy82z8x859',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 07:53:36',
                executionMonitoringStartAt: '2020-07-16 06:26:20',
                executionMonitoringEndAt: '2020-07-15 20:20:54',
                status: 'ERROR',
                name: '4dvgxq7ob3cv29ck942g5s5l37q3w3ugccmmnk8n44wmb1i8e5upcgrdlh46ls8q33cbv36gyjlxeg0tqshvvdsymd2aae2y8feibozt7v4x5y2e568nwje4hlot4wtg4m54gt9pvzj8u0jxb367u6okdkj2yyuf339nuis7wl0imfigf4xpcf14a7vfhvknaqovc57kqa16udoahb4v2ksq1snf9nuvrlwddajq27blzfwksut7vu4ibs2j77x',
                returnCode: 9939443130,
                node: 'tbm5dqiiec73jb9nrgk1wiba6z4t90y3ie82p9cof0owp8wd1tzl5qbb0u584j2cnt1pyd068pdc145qytf4nc9sl8hh1iv7qx771pedsnvefky1blcgfod3cr6rlrcv1g1raomzrmlknqlq3035wfqw5t9428rk',
                user: 'zvdtybb0sgwmq7mzssvt8rkbdq2hadeh474qbdm906t9f5atgo4rrptk91jt8yyt77pi10be1wg51jqw14ijbg63b9ywf0145ye0r0t70o5lcu2jbakv7arhowmmt61gw0m9eb6akz42hyvbhcyt19ixs8blryw6as0sze5t0aqj3kflfvru2h2oju8axkysrgzdqkstvhq2ple00uuntqz3js653j61mq9z0041cn5v0j9z763kgft5rc0u86n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'hfg1dg4vymivii9z9g3c',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 00:51:16',
                executionMonitoringStartAt: '2020-07-16 16:09:28',
                executionMonitoringEndAt: '2020-07-16 08:47:55',
                status: 'ERROR',
                name: 'w482zhwz9pro6cvomsognjzdt2q5hferzk8ty6bowdoimg6mvepfbg2r8eej7xvs86sxzujx2g6axd1v9rolbob4v633rtyc4sodvktxvuf9zdxm61wxj3cpx92ob6kjk9r43id1qnu05r3hn4if5tvrro71s808kob1zbq1seq1opdygyieo9lyi7iaopwd8vdnye208isttuo16hepbxvmjo525xmke85ang2w8g7p71id4bf8izxf3goutxr4',
                returnCode: 7955990876,
                node: 'rjj272p3zva6gxe08j9gp92vnj3x29950yd938x7xi5tq46nup5gaqyc1rmjs8u0owrjxfrviq5ahnkwecf6ht88e2wynbt93uvwdj7xngjr8zbd05l2p60huken5v7gfxmz42yz3set672hhc4lyhgqrzxgp3za',
                user: 'hihjxtczlgdr6peq217hl7nskzlxaflzyak7k1ya0sfq9z7iw9va0d6gbn9hpyvszcuefgirhkyt4irqphf2lx55d68hr5hvumm0j7zkkvjgtgfhghninr24typano04js8zb701aro6nydv6fnlyhurg07dahtwku0sdxtlsn5mqokdx6wnepv0eqfgbe9u2rg0vgbvj7v9deyoylkp9ojebvothxvlkimqq26s252k7wrsm14zbgviyespqrv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailReturnCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'qlk9gcpnkz9r0zlrjyd1',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 02:53:48',
                executionMonitoringStartAt: '2020-07-16 14:00:53',
                executionMonitoringEndAt: '2020-07-16 07:26:20',
                status: 'ERROR',
                name: '2yjmkse1moslrymtx2b0776zumi6sf2kcgqqs6whma26kpn65og7s4tutokhrzr5o6s1m3kzp8ql3lyhx5qx046lah1gyn5424jlig69tyqea24jevpw2djubixduitvy675nencr2uzq5zg3in3itg5poo6ufvvzwi28q9uykti3imexzfhmbbj24cutcqdb5srei9me0g5tvimwg5a468okrftkmb8t098hcawq7gkieip0vv4wvhgl6sqa9w',
                returnCode: 43134762866,
                node: 'ipqt2kgpd5vl28bt397u677697th1d7nrzgy0yb4c5ip7slczcftaeiegzgqmcw84p7bhjy4ng0541zpdoptn26i01vae49vt1v0tpm2davblcmdn9z67egw3qo09cjvb7szqmh0821yvsvcmywgo8lux7hn8lyo',
                user: 'p43vjgnxc3ibl2t5umir99ztgfm3tmj7bo8tol2sy8js4x2sdiu07t6wikt6kwqxi3o24zso8tux6wskeyednbvbhw9qzdvi2b4u5au5xyudcjpqxbk0x9vl29mgghz78c8cm86il1r9y0p1muzjharmhfhznqfj4das4xbtotlgeh6dvarh5j3qwcaefwkkvobsdq6ui0iw5fqh8yaibhvhffsdoq2w5lplweo6w8s6slmkm0egosoy7uqcm4t',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailNode is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'yv990myib3lffjfycwlf',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 09:29:43',
                executionMonitoringStartAt: '2020-07-16 16:22:55',
                executionMonitoringEndAt: '2020-07-16 12:49:44',
                status: 'COMPLETED',
                name: 'edvngha45abavrg939ro57opkepz2a03m9pi4rz29klgst54z7dp9olew6vv96kvkr4etd4gn5bb90qfkr4ee94z8ek5kvoipwaut6ciqkmapujeqikyqlqsrfy7d5e2csl7d23odngcfo19te4zvbawcwceir0qgbmzuesgo262kj68xidoiond8aiwmff5npuojfr6a6m2hgt3vr00k4srb15n64ptvkwrrwz05oobq4qzemtbbkk6nx853dx',
                returnCode: 3635439246,
                node: 'ynbfik36dtz1pu5g6k9tywjtwsec57og2bfv7nu6pnnsccygxtf12tof04ny1nr22ac08rof0n5b9nduw6ffqj7rf4xflpfpf4rq0vbolj1g680stq5t2abholtq4vfpqvsu36yszkg6i1v99ei9cyg3ow3ltw0fn',
                user: 'g3zn018k6sme8zqa3ylne8fbc8r2citujb5ehbrd1ak0ofg877f25tkekhj67tea9ai0743so5jvl8kraxmboz3o677bmsa6l8xjknmbunh74frrsytjzfohfotk755l40b1p4hsaensy1vjcctydfeb4lfc876ntvorc8bir7vhkkdoh5mszd3t97sael9ed8pe1dvqmldn06dtgvedj9yczkmwum3xwq4372w3frbm8ooko9xggv8ymp84bs9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailNode is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailUser is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: '3ed9lghkwtdsfbr3vmxp',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 20:42:02',
                executionMonitoringStartAt: '2020-07-16 09:01:18',
                executionMonitoringEndAt: '2020-07-16 02:59:29',
                status: 'CANCELLED',
                name: 'jnz1zmzutsayhw3qtrmpv60x14cb8hp6bkzecnhsr1y75d30nenzgp56tkfylhm2bws9em1b6ic8efp4a7sghi2ucrqt3hi5rscf4a9xl3q5h7f4bjh0tgcn5veqm74eb006hmvxdwlu18wyfrd2kwwao4m9ye7vsl20bhkjg1thas47fpq2hpcm5cv7m0gcw2qve9fq20fub3opzkw8wajj4mjcdz4xfiroalyjq8aa8yr5zvd70cdzngu85s5',
                returnCode: 6904692909,
                node: 'kyztddxxldlsrmqlvqakdo111uc1p097rjzzkt0aotcbo35ohzotw71qdkuw4ki62dzmxhtnb3qwp7kq2uwc0v6xf0oyd0zosy17du88ezv6ug7dfk9frgilkb6u7d976d69cq8zmrogk3sddihae6nopjmxtjpv',
                user: 'c0epjcnm38omo8lq1yv9ive96u0kcrx9d1lymeotozm2yyi7t25mlwmic41nd1t74b3abtafdcwi10n23nw9rb9z9a0fo76linkgyzvpbxtq2b7hnyxv3sd7vjkeeh3yejzbtbqplg15q7dtmlrdnm620239wklbspr2o3injj0jv9l6vpnkgbedcfkng0mxlpesvu5ykmeh3ia7fz1podbkoya4s0dsptmjgfx4h4mlfsz7bj934f2bcjc2tp29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailUser is too large, has a maximum length of 255');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailReturnCode has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: '166leoinyzacr7b1kqzq',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 06:39:40',
                executionMonitoringStartAt: '2020-07-16 12:04:52',
                executionMonitoringEndAt: '2020-07-16 10:40:05',
                status: 'ERROR',
                name: 'p8w43ah4i7k39ensx2ku7e2gejm6baqdm217gtohc28iqdws55la3nl37lu8vnepj7scrnczc9cxwna0q8ju053lprq1gza75w6bfj9s7i4yxybd8w5kad1h3qm2txqoy2nikt990nucung19f5acyspsncxjvkuykp79w473g98dwpspm24ucf1szcj3ae1vavope4x3fejsfano9dfpoofr6e78h6nxy0tbpscloy4rbepcfbj3eum08kux1n',
                returnCode: 100.10,
                node: 'wlfe2jn60kfvon4mw50fpx63m7sh5eaghwmephj9so2qth7lv8ovpp3vj2u9qn4ffv4f204sby2jlioikpqkf4eosucqpyrby7g0l7p2av8wvgctwc0pn89pvu0qjzkfjbgt1d9vupwukqombty7qfja2osdoqp5',
                user: 'xa60q9p40efwlh1dpqmh3g4ocr8e2shkwvg95qzmh4m0rk83v8htrpgc5jvo6lx9k7udtais4ai1mvz67pphol3d77ns92fbn2iqdl3am1ijtid0jdpfl6p4ywzcxsdxcinmh7lble4zes41hjebqxs4acig1u4qaxpxsjrhlpif5pjdiz8bfm4s4w5bnfj881reo0hj54btha5820um59hea5fzknvslcnqmrzvvup147pbj1a5fuvj2dblgcs',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode has to be a integer value');
            });
    });
    

    

    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'n6vwhm9uc446vyohct54',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-16 00:29:40',
                executionMonitoringStartAt: '2020-07-16 07:46:30',
                executionMonitoringEndAt: '2020-07-16 11:04:25',
                status: 'COMPLETED',
                name: 'x62b1pfe4kx4yxmhfc77l7sqresehj9bou97o66vs6ghk7v161y53xf7h926hafqkc4e1uo3riossmlgn21nm9x2fn1c0c1s4y4hwrernfhiaojfcuzqf33cx4w2mbqlyv44i3aouujej6ut7l8nzr1n2j2to0qqnul44fadqxechk2q195r7ip1qcz63rjaxzwzi0xbl7mqaxwht1pphrpkyn72kccnmqzuyjqx8qruqe8i43o5bw1t0bm759c',
                returnCode: 9868944634,
                node: '7n8ju5gg8i3owg9wijxl6hak14fctk2saxucxjhwww1zckfsgt0ab51pncihcye8m9wnojogo0sdadc7z4i06fu4sl20adk9elq9vryccoxpvetjce7ovpmoopt5dr7mfnc9e7msxmfjm7mepi02qxzujkdddx1p',
                user: 'psi9rd7tyezebglrf8rctlzkorhy760se5r03i0z87xm1w09oyxkvdej9efssgttnsgyibdc3io1i1z6kt06qjugi6cjpi28lpybcviifhvpn8w42er1f4jurgbu7wrcx1jy5j93tqz55l2hsp9t19s3j7oogtfhfd5m14ly4al4iz53dd6vxcodkkrp8wyhooru5a2wqvh0ibhg2u5rjdc7ru2b0jzw53x7c34wyso7qb01e3cxr2zslmhllsf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus has to be a enum option of CANCELLED, COMPLETED, ERROR`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: '7tch5nmxsesg91h7x4z3',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 16:14:15',
                executionMonitoringStartAt: '2020-07-16 01:43:11',
                executionMonitoringEndAt: '2020-07-16 14:37:11',
                status: 'XXXX',
                name: '1q4cif892ftgbmutf1k5uoz7gojzy3m78nzs8snxbsfyat447jncmuh2q94ji5wwt5fvaj2d4taozq8n8kp7697hkuue06obsa6mh3zj9xu8uf35o61cj3fddxc3qin310gyxzv2poxjyz8uemjuayfu5xksmi4vfu53cu621yu2opxcsjbovcuz1zb3as9kclwqyn7bsi42i7rypm60frsron7fr3f3523ctoanaen8e9sf3ii1mx5vfkyvuju',
                returnCode: 8132897477,
                node: '016tmsnzgnsdy8qhqr34is9wafht4554omllx8f40kmac032pxg5fm1k15ikj0ybod3n83byxfh1k6o8lwd6ikeuzkpux5gd38nygwjs6i0ussiaqfy7y2efvrj7cry9euu6uxpwf0em04e553jwakbzr2gcael5',
                user: '74e6ulc5j02gbkewuc786mdt3c3tskpdl18tlgwo2ov0ipalcfhrz8m7pm2p1n2ff1rwdrx50b232shs101de4zp30jstyumwz588wyja99mkd739q6mkkfag5n1cxg6ky3jx4kfixw7vdz8nfoxjwkm7z8lag09fqm2dz746qt0kp1fyshslg0zu3dv22uwwiiywaev7xd5xr877b5m3ioxmozavyltf3cquyamkx0jyjvh53eyp1utuvbo154',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus has to be any of this options: CANCELLED, COMPLETED, ERROR');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'an76i1jmbpdprv4ali61',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-16 10:15:03',
                executionMonitoringEndAt: '2020-07-16 08:37:32',
                status: 'ERROR',
                name: '5mr0azgfxrxp4s5f7c5hfsi2jqtg7whzy36kv73841mgsz2xx42sk8pq563gozdudivun1o1ny7b6omqpp2lz82erxz4ys9arsbzek74p413eyg0jwykcy8y8f64zm1gc2c3eefvopcfoygumlnx00gwmjeiarcl3stxq9gwxdmewa2t7c273mth72ypq8tkkecnat1qf8sx4h7i0ldcd9mwwfg7nmu3p85zb73rse9pbycelthgmxpdkzcor0y',
                returnCode: 4980877737,
                node: '86plpmt731r90ofjzn4xc1bc2jro4pj0bqaup8y3buokqpm62dtaqcxs70xe1434q3g5bqpxc7vmllnzh5s4yveh2t6x0j7rydukltwneewy9k5dhw54709bd1j2t6sed8pu62g056ub3zte37wsjyrj658fc3p0',
                user: 'zqw9wbcnioc9lf9ssrqahorg05badjrlfsf7m27t22djfhoreog5hv6rsax1sg2p3w5m3xs3qd1agvsxp5kcrohkervo5tpyr1zkv625bfi6zcolwctssxpnq86tt03p4n8r8oub4l0iayuobx7g22rwtt1gkd2rejze06uu9pdz6y0senox1hwvmugqq74cwndp12ugjw1ck5uk4w9pqn6jpfse5a0kwwe023pows55q5cx053lnxrzlst8h5t',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'o0xwq36isujtt7h6fdyb',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 02:07:30',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-15 22:28:02',
                status: 'COMPLETED',
                name: 'clizva1sum7tnykls0d22zu04blir3u1hd0r7ptukiepjhfoina02mn1s6mp25g08dhaa68sj63gcy1ifyxccgihtgctt21vezh8ca1nr6xd22c76r9f1st8odyfmi24spgan0ev1978bqvmqagw9ik9dzsd2s5x7kqn1hcqf9xi428vqq4l4pej2y7849a4b34q5rblh9rx73konius8wdrwcq1gkmjim5ugntbdg203u7jsr09xfg0lmy32fa',
                returnCode: 3446378176,
                node: 'jlph6bormz9uqx2ayo7cetpy42enbgmxubjbx6q2utqax30jhkapsxyquibllrzhumogwdjrwozicxe4rgjeggk41vvo15zou4r4cbghtl6tabiwd7x2v8jn9lj85onukj4smhyzulbjor572gjtzncxmo15l78a',
                user: 'uhhdgixkdrboqsedvfnxo9e5uejhb6imq3zrz1spgmcmckpvzy1i9ek4im68l5ws3kzo098x3asj3tlarrhd1642lya3ahuaill7a9nzjisa7dm8plg7gxwwtx0hsh1vagncb448iora4i5zs1j46ugphwwxl9ie5jkuqacai22bhknlzmmj2bb08ujhrxuay8x51qtqg6z40lqcoengndywwyb3ab62yhyx746voednjhvzkj8gd6gl3t7xset',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'l5ahw4xy8x56oqju5oxb',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 19:03:03',
                executionMonitoringStartAt: '2020-07-16 08:53:05',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'CANCELLED',
                name: 'n6cs5c55zbtxoi6exq19dti61m5f3vq81nxwxkxesjy609fe21sg7yqo7c6jp1s2b3tmjp9ljl1g6auccuic7mfwwzbb2x95fcgbg8s1pszcm2ojj3vj9hc3mdbq65tv4excbxl4x46jdud11nv7fqon69z5z0sknfrqo5taoujchcbbqydwmf7fm4qydfi0oglnfzrufjghxp9cw46ir9cwqb7acgiu0b3nmbnjdk323f3qd2eqo6a0pmtyks2',
                returnCode: 4736655047,
                node: 'mo0uus8red5a1s2y6mo21if6hbe7x6gav8o1g94e5976azigrjgh14t566241mvf7yktvjlthpuziidr89oh8ngnequb1b7b69783yf7rq5abeqgt7hnuadrx54xuyk7ljuqbh1cz8evh9e0p4iaa1jxvm01l71l',
                user: 'hg2q6dufn9tvyepbp7souv2l2dcumhdaz21fxf70oa3rhqjrh0axo5460usa0b3uiids71j7tc4lqf1n14ihklk71w0a4yww3in4kkbyjb2xtmhcg4dd717e57snquz3w4zi8ykd1irh6nqnxtg5akc2ul79ofqi8joxidifg5qkf1c2k0ecjc5pnnbzoarr25r4dk2miz4ggylsfoimtmqkxasgt20vgawajvnakmqpfir1v7dt6w04f8jtdlz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: 'yv1z7jaek3jh3b2wwa4m',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 01:06:45',
                executionMonitoringStartAt: '2020-07-16 09:31:30',
                executionMonitoringEndAt: '2020-07-16 09:00:07',
                status: 'COMPLETED',
                name: '3tlk6w1aqdwxicu70vynwhodtmeov413nsc1mefvn69ljl70nxlkzxxml3nizaesoj90e10k1hdwiy3n5xmw97t81d9v227huefxcca8igdnvrg6vbyeek9039p9op9u3tyb6cted8wlbr3s102ojsbqo4ngyag403av0x7bg10cgk6hkbw3t1dk5qdlhj0e7drymc2zz2spng071ohzdhl692pv5aj63avbluln1rpsvx44y8ufq1iwbqnrer8',
                returnCode: 2485286977,
                node: 'b6zfkfgocxp3qtaxkilpt1sqb19puvaugo5dr240xesvzuhrgwf3tbaqmy8ic81nvzlujathsikr9n87u90aogal4unpxh1abh450dpp3p5seb6jcmfyv3qfyv1z4g0grewm8xcxuy39kmm9xt73c1gkckvf1g2o',
                user: 'dcgq3w40k7d9horjhg9lygyxzxyuhqmxj8o364zzkl2slfnijax35qpoxucgnsdh08s9qz373u7kx2oxnjyt3uq8aql05pibwglfq5tebveierkrpvnwqzvv4m74neyfa3j3jtamtanvbanpdycuxprywmpsovcp2ly0rlhue4nqd1oupwc7vigd61zsyg83mfpatpu2a33gfg93cdxszweh6wq53a0dam8k7b135wueksfkx4gqoja6jx38hkt',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/jobs-detail/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/job-detail - Got 404 Not Found`, () => 
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
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/job-detail`, () => 
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
                        value   : '41dfbc59-c509-4f5e-8b71-035506a0580c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '41dfbc59-c509-4f5e-8b71-035506a0580c'));
    });

    it(`/REST:GET bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/41dfbc59-c509-4f5e-8b71-035506a0580c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '41dfbc59-c509-4f5e-8b71-035506a0580c'));
    });

    it(`/REST:GET bplus-it-sappi/jobs-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/job-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '490b4307-6dd7-4cb3-8f50-53542b43eaa8',
                tenantId: 'e7e5cc63-afdb-4652-a2e4-78be8438dc0f',
                systemId: '73a94a9e-8665-488c-a765-17156cfeafe7',
                systemName: 'r6snls0daqf89i6zjm99',
                executionId: 'de68116d-2dbe-4b34-8b72-711e1fd6d16f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 18:57:53',
                executionMonitoringStartAt: '2020-07-16 04:30:10',
                executionMonitoringEndAt: '2020-07-15 23:57:01',
                status: 'CANCELLED',
                name: 'mlk5ea3ovlf17mpuzwnzuqidja30debytqfsutl0p2bx04bi5hlksza4gi3it8izhzuz2fa4vz3x6kqnikmem1ul6rn7mtqeco28to3jnmq0638zad03dq4mq2gecgqk656mdga05gtrtu785ct4kzd3u8oo1ijcftwikgbqu2icdj0xdw3zmnujl6h45xenxb28dvhfdpx558nkqpfzbjpqbxijolp7yjhake3gnp1zmh2i5mhkc9idppio820',
                returnCode: 3072427073,
                node: '7tev92q31elgknftzrgcmi7xqc96unuun5jvz925oi2dvnc68qz1kd7xwk3m0vlv1pk01eyya62sacs0jkiqrkfc6lra6lalm7c3vbjr0v2vxemwu5taz3f7jd8e0b3bc7ckrne2c62r3oq3sv3c5qr7e0eqjy3r',
                user: 'ex4zjzeaws2t13zgetjln0t0cisbj1ioxj4mxh06yamb5f1fzmc4bqoo8tje8j3ju126mue2rx1tx6jw0514jjan5he3zs85nmni6yi44fuxedlt63v1sykjchwdpcw8gq03d4ceshggy8jpww50o4z535gb2uchwwc6wvbq29b6etasplik7pr577c65lkx0jo6wkzyt6wmj7y8gw65l7dq78nyun1k1kxqievgfrt06shb14fs6gsnuw2ttkw',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                systemName: '9u5132nz158funds119g',
                executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 23:10:10',
                executionMonitoringStartAt: '2020-07-16 11:52:38',
                executionMonitoringEndAt: '2020-07-16 07:05:55',
                status: 'CANCELLED',
                name: 'uxb0m8nmwvy0ef01auu5bw48o631lzoaf9uzmpp9qpnw7t02s8rd7381wdyqfbymbepfdbspkjjsf5swao0rqrqo9cgu24i4iczsj5emccgxzgq0cwv5r0ojkxvj0oco8d7z9i5kybfuyy75w483t4vj0avmo4fi68qp0csq3xzvm6dtbjn35lzt9u2i2ygc5ymixgh0kwqnfq827qbctuck0r0niy61w9waxpaz0cmm074wc2kkzq36lotft1n',
                returnCode: 2051612923,
                node: '9byhvo2sf4nofyrtayhjg8taotdczkz5pqmuy4u7p1fh4otmd38uiwkkgtuvpq4u3mlewtikijqxf5zd296n7wckrqbg83zo0nkq15dzop6047yqldoa1q1tlrqokyb55d2d71eeld2uw9izmvr7ncl0n1iyqdpq',
                user: 'b5srts4tvayu51ms9d791he0e5u6vxxmhnb46pvn3l5tqpczasqipizm0qcgwzk0supq3fxul53u9ma307zsp02al5v6cc52d2vk0dkm7s7jgf5ewcxzl09wlcsk8egbmztt8zho1f7z7f59wlwynwoz1zw5ltb0p9ih2gdkx8fcnef3p01zhuwagbv9ze1grz94h22wvv0jo6qo2y661a873qqgshwhveca5dhr5z5u2xge4tow7akiplihesu',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '41dfbc59-c509-4f5e-8b71-035506a0580c'));
    });

    it(`/REST:DELETE bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/41dfbc59-c509-4f5e-8b71-035506a0580c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateJobDetail - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateJobDetail`, () => 
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'ee08ee7c-b253-467f-844e-e0a1c8d020c2',
                        tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                        systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                        systemName: '3b1d0z0zdg8sxlv9ahuj',
                        executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-16 10:24:26',
                        executionMonitoringStartAt: '2020-07-16 03:25:15',
                        executionMonitoringEndAt: '2020-07-16 17:48:56',
                        status: 'ERROR',
                        name: '3sp3310wi1mruxtoq9h88tq6dz3t0kxhqu227zibw9rbqspdmg6z0wlj1v7kqf9xw0cg5w9biz3d5cc04f2coe3p7g9i3usg77xxoid03kyc5hohwux1ietspeq3vndlr8vi0h9ls52s5m2zdag1e1cr7bo3t422etzy8gg3ha9dd0osdxtfdz6s5lwp5jgtms5nezqv8mcbhd0skco947m66u50acfpbkaz4ojyjqzqwjscdxb15aqvv451hyt',
                        returnCode: 2005299360,
                        node: 'ical3wtt18so50glo0gz18zis13udz34qlcwnin831pq41hkvw2c4zlw8n3tn0ovncfldzl3iogm2v2r17fpdqffck2k1rqmf2m55xyir6solc9y16u3jae050667mk6zk10vad6145pntgx1fy3vxcku9ygdb98',
                        user: 'ber8h0darrou0ww6kyjk7aa87n1yqjejmxfpdlae2qdgaev3isf3xztkb3w5yvpa2v587q069w3f11ljvnqa2mu92n4j0k9zmeqgzf2gdfoy5m8hl342urtyluap9gtxdovcokmdm8cvf422d2fkputly7l3d8bbk47r4kmiw82wsoi6d7upqjduy30nkgubspsm6891nfsejlc446jjnfso8q1wka8qpd5gyzk9yuf8aiw9d36s0ah1uquvp44',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', 'ee08ee7c-b253-467f-844e-e0a1c8d020c2');
            });
    });

    it(`/GraphQL bplusItSappiPaginateJobsDetail`, () => 
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

    it(`/GraphQL bplusItSappiFindJobDetail - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindJobDetail`, () => 
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
                            value   : '41dfbc59-c509-4f5e-8b71-035506a0580c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('41dfbc59-c509-4f5e-8b71-035506a0580c');
            });
    });

    it(`/GraphQL bplusItSappiFindJobDetailById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindJobDetailById`, () => 
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '41dfbc59-c509-4f5e-8b71-035506a0580c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('41dfbc59-c509-4f5e-8b71-035506a0580c');
            });
    });

    it(`/GraphQL bplusItSappiGetJobsDetail`, () => 
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

    it(`/GraphQL bplusItSappiUpdateJobDetail - Got 404 Not Found`, () => 
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c080874f-8589-4fa5-9a8b-a839e34e5c34',
                        tenantId: '6ef75f7a-2e73-42f2-bb54-005af3751141',
                        systemId: '9c6eef89-ed26-4b43-8b0b-00cab1f4dbe3',
                        systemName: 'm48aj02l6qqlnee6kerv',
                        executionId: 'ff2359cd-decb-4cc6-ace1-ea141b4e391d',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-16 16:09:25',
                        executionMonitoringStartAt: '2020-07-16 12:38:14',
                        executionMonitoringEndAt: '2020-07-16 06:55:00',
                        status: 'CANCELLED',
                        name: 'yx3yu99g3zixfmhpufn1anxchruhlgk3ijlbgwu5242l039ghobs8trpa09ep70lk8t4otsvno2tehuczezowh0g4xjgh278xam3q9t8yjymthhhz39lrpxdlnf514on1ynruio6su0m72d8sbjh7eljv9tqa5fkv0ubgiywtkvgqctj0shvle6jmly2nyu8qzsq0oldkhpc6qq1x5ogyotmg3qmoq8r74ycc396zpu91z0qqvq30vtlv3w6upz',
                        returnCode: 5182334667,
                        node: 'd1fq727bk2htz69p4dbesgud512c0c5ya27rlcqquku278re3cda8r2z2sm2wf3bufzswx9oyx0xhtsvtywzsls0qv8a0kncmhf0khrprqif9zh59sr2ngevvuuvu1dhy1w34etipnhkkt192dz9panhk5dy4zlu',
                        user: 'eyp5fyogr7ukfn4kyo89sqecanzy50iu18lpcxq9vfnozbn4blxrrdubod2r0aleqnmych11obp1c99x7ho300he4uxvof8uo3f2pzfvqafl8xgwejnnhisn5kk78dr0j93byed4fyl3lw12y3v3ww66scq1y8s4lb99y7u2tgtsslcog1gm9jb8dlgmemaszizpml99huu6wzu83bmr42nkgt7fdc1l3v32ot1ipgvc7z4awcu720ytq0bzwgw',
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

    it(`/GraphQL bplusItSappiUpdateJobDetail`, () => 
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '41dfbc59-c509-4f5e-8b71-035506a0580c',
                        tenantId: '76f92a8f-a4b2-4007-9e06-a205a496673b',
                        systemId: '99c4050a-7881-4738-b963-d077f9ea12f8',
                        systemName: 'bnpexf3tek6gtbtwnhp7',
                        executionId: '58fa6887-e648-45b8-9de9-9fbcc1b9344b',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-15 22:18:27',
                        executionMonitoringStartAt: '2020-07-16 09:03:15',
                        executionMonitoringEndAt: '2020-07-16 16:42:05',
                        status: 'COMPLETED',
                        name: 'va3ofkhthyek508uaq4si42pi6ivd65d510ey66jp4hhe3vcqpqvilqu8qzpyg044lbzfxx2mabfmkzzl6kxwqc01rulvbisk8lmrp9p9cdku2kuoy69w5ms2troh57wnlke5u1nzt9sw8d3s92oq0uh57xa1wdm8wi78917cshcmo9ynyhmgfuvgrynwqdnxey3lwifmsvzxl2lv3u8kueo5xubekae4s0n5qz6et10fkosojw7dqp75ynbw2k',
                        returnCode: 5071204131,
                        node: 'oewg5c2mahuhlbdhff0310lbiz13z6kvldusteb7vmrxr8otf5keabray86mmf2rqo8mib769w1r2norv0hoo7lr5b53qv6b3xby3g7be2hoy6uah76vn2ob73308p9pw8z9gcgwudxp3btpb31dwlmxw01j2war',
                        user: 'rfqsmrvujeeudwavw3sj16jvqkqsxym9e88pfvjdsefmjcaosceyhg9779mo8myhl0ht13cvkpq6a1q9ofc3stt15l0e3ysas0rqy9ewhbu66vrnvdvazzi40cs1c1itmw35jghio68on5veqfk0rjyjql4214ljgk65eglb459nnb1k7pgwgotdcfskao26h4ll0qpdm7d30qjwqq348zqawnrmg2lcak5ldbbnbrs4gj17vako03zjzcbh7y0',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('41dfbc59-c509-4f5e-8b71-035506a0580c');
            });
    });

    it(`/GraphQL bplusItSappiDeleteJobDetailById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteJobDetailById`, () => 
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '41dfbc59-c509-4f5e-8b71-035506a0580c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('41dfbc59-c509-4f5e-8b71-035506a0580c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});