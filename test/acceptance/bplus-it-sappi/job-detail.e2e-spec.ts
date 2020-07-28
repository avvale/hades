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
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: '8yklukxqyn2d1bl7vn036a7c4tvd3jqwo3j549eb4d1n3v52bo',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: '43gp2cwndszt6bj717fk',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 18:45:18',
                executionMonitoringStartAt: '2020-07-28 04:23:27',
                executionMonitoringEndAt: '2020-07-27 13:43:12',
                status: 'ERROR',
                name: '0m6ww22g83akib4upb6bud3otrj8dwd194hrrgcxkbou5jve79s25hd2ev5l3lz4igup6k5tfyahc1hp4l3x9haxsd5tyvl5vqa0jv6eq8g546ve2iqrrrdwcawwxb7elzq2if1li3omke582eqwol9tqevrt30e9bnzhq6tzlj229bbq40jcuvb6n0v04dg94fdq835e7um0fyvcu6wst0udnqbuinb0a7trnzlxyu5wygejzlbqfnncke5pp3',
                returnCode: 4136608593,
                node: 'lmi1fgwobark1wunjt1we59q25mgefmtwf7xl2abok6i54s5qyltsult638wwhg7eyq4tqmful4gnptptq80yvwzr9jza91znzf9yiapjkuy8v34jnn52vhv8fzni2sy58j2tt1ht538e2g0iuifnomou6vczn8m',
                user: 'mhlynw9or6dynhxs5hz6nrditqio8v4d1z1cdlhzkhcwj5cru9vyidlr8pzi9068gre8vdnn4g30pqybmg1c9lzyq4koxevg8vxrr9y8ruxlmd5de1xee3g733k0qnfn6dlwh8ec4ukw9m0zowy7hxlxjkjj8ec5bor7ahf8phktizsxe56j0opkdswncybfuf6sbgtqi2nk6xily7elouvk1lt496fhtued84c2nc2gwi1czr7e2atlmvoa4g7',
                startAt: '2020-07-27 18:20:59',
                endAt: '2020-07-28 00:14:28',
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
                
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: '4tu6zc7q02r8si65kb7gv7sch6bpyv4v3wh5h5kvh6n37ww9g7',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: '4kbh8uc7yghqmcdvvehl',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 04:27:44',
                executionMonitoringStartAt: '2020-07-27 17:47:27',
                executionMonitoringEndAt: '2020-07-28 11:07:39',
                status: 'COMPLETED',
                name: '0z6q5y1y367t8eek96ozqye9vp3n7sttm7asmkq08xws26l5kxglubtyx64h8go7maj7e1o1ibx0lwn7guqkigd7bcc0pr5qwktte57dpq7vxw42zdcdz9bn7ljp8wo0igr7rvcm4lqrwjioscrkg28yg95515k8op5yhugqoh7hw1rxet9ho2pxmw2zw1i78gksffki8jd14cr40mo8fevyxs3j8le01d23eoj1k4rrwvjl44dnj6yk97c18df',
                returnCode: 7804610141,
                node: 'ecoxqob7be8qxknrm135okq2a0osgg2i8gcck7p3jo9f6s97b8kyr6og2kkiot7edicqu52faotfbxdfi7d7c12gwf1lniaazmyh7gm5zl8qri81r9vgkzbimecmg553baoy3fxplcltvwg7b74mqdae3xqcykbz',
                user: 'i7ueultcw0q8xtdhiylhr71mgtdh6ydq0f6d4ouoxmyjiz072xosm2umsi1o9bfv0o3iw59tzgojtgz195059vxr8qbxlqzcj7vlyw9zk98r65cvmkr8ussaha2pff74kbzkncr0gua2auz7ycy3jn9fjy37z6wrlle10t3vdyot7e3g0jjbl95i5ptehecqm1d94fv66bg5cosj16pqb7v21ip69s5paoojmd4at0w05jt95drff598o9lgm1s',
                startAt: '2020-07-28 10:02:42',
                endAt: '2020-07-28 09:32:44',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: null,
                tenantCode: 'dv0uppnpvbh3i04t5xzxzq0miaava9cc505j22ejon7g2ufckn',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'ddthahslzrs0wd163hav',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 21:32:21',
                executionMonitoringStartAt: '2020-07-27 11:28:12',
                executionMonitoringEndAt: '2020-07-28 02:51:04',
                status: 'ERROR',
                name: 'xrkf6gr5ys8zzhe0u5jfc1hzpm3tdvvf25hlm28gkbtgjx1zpt1n0mu464nbyxz3rrs4zsbaa3z19veaxekulg5okrt7y3rwfe9ibmezw4a457egib55v73jp2qag4h6dpnqa2cvd9brsmuqr4aa44zzdtb65oaf9dizt7tcbnd02mw6rvpf8p4oozciq1okwlicmrzxmfg2laxm36x114tzainij0doos6ei62whmq76emuc574qlgejzj401o',
                returnCode: 5389705804,
                node: 'oej490auci82ebi6z69dh7gqmlbh097e84klrzc53o3m6j16uoi6nhgr475099l6fwj9ojk0m089ljm42n5feujj9y3fjem1337e1vx6ihg7e5d73ijb0z188hk8omupqgo77uh7a0y23l6tlo4xgz07377y70r9',
                user: 'xdo90eibbbtmlwzo4bd6l8pn1b8glancrapay4el2xc09fc4zufar7v5sh3774kz0vn8whsb0del20gtlvjiyowp8gga7ethkgn9gsaosnsw2rqwzsuftazccmggus25og9mmpwnjipt1gaa5vg7j5zweiunm90a088x2zn38deghezap52uksp5mw4kulhguyimaikl9s7jwqi3eob94fuszwf66tddl6w3rs434ebgmow8rt55bcudobt1sci',
                startAt: '2020-07-27 23:07:36',
                endAt: '2020-07-28 08:25:47',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                
                tenantCode: 'ywj6z2rrdo3u654ae7vw3pr4qs8t540wnfi24cdc9onpkdz6zx',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 't1lod3san7wdccgffxeo',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 08:11:26',
                executionMonitoringStartAt: '2020-07-28 05:12:43',
                executionMonitoringEndAt: '2020-07-27 13:14:37',
                status: 'ERROR',
                name: '2yrkunwccs4au3miehagpiwgbplfk128tz8hujpge21nemskvocvyq11d2dl6emogwevon9rdxlpafhj090mgtg4wc721bv4u50goixstdn0nsb45jo7hcdkavkh30u5nghosrbng6hmj1u7yht3uspl9kzbivxwy9rh9bsvbx2axz6hfg196i805yr7ak1twwhb9wg1yy7xbfd6ihvl86h25odl2b8j8awwz1wedxk8bgz0uawsjp0bx45n5pd',
                returnCode: 4749945844,
                node: 'bluz5gk4wsex3mgqvo2tn6sdt1ptqv6se2yhzbnuaotouv6ow0tsapvps3q0yuk11tx3lhxr7jzt2ybz95zgg8ow5v3vtr01d0rfpaf55e5pmvyqxr9sqk4o2mb6m6zp6aqgknwkeu1jesgze4jsfqag8nvmq72k',
                user: 'eyuhjmn4ayx5mkn94p1171zxdb0dm4liyyvuparl20tvbt100ciovvt6h1mnijpbhao6ly8xawuugbjsrbcuyjxovq5sblh6x2duadg11gthzwriq5douqctbrhyhy5zj12lxwuaafqermn66rt7na19fqfrim9oz06fj32okizj936mamfkm595vtr8w643qdzanjk3gs2wkpbejtjpp2zthz7kwmxv6dtmjo5shcwolm495urhlpitd1g2pys',
                startAt: '2020-07-27 19:35:09',
                endAt: '2020-07-28 07:39:09',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: null,
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'lttjdrblhjmsp0i50ggw',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 03:30:12',
                executionMonitoringStartAt: '2020-07-28 08:23:26',
                executionMonitoringEndAt: '2020-07-27 12:55:48',
                status: 'CANCELLED',
                name: 'j3auso5x26qpjvvwnmcnzvximha0p0c4rh28wzrlk1qjthlqpkipx9w12k8sa4okwha9c8pdxyzgkpyp36twbkvbb6f3rwny7r5ylf537uhhyufco0to220jrt07i3v9epr81pvxdh529yrtnvw4qh7079x872ti2kcl3ck8q7cfbn90ewdpkcrgr7in2f3b3133yaeokd8pbh11e79wh5s6gmm7hr0p73rtfmfxrfczcuxxk9s1dis21w8hlrs',
                returnCode: 1493202698,
                node: 'b2j26o33i2e3lu9u8vq3axbwyne70hwzr2to0n4hoe8jzj6pfrj5sauxhtzqf25hw2kdg3mlnjg3j50fwdnf80z1tma8937sedg51fxcoc91tiqvgymk9sw6bnnacr6h6ug6hcdtn384necowgdopgxyatkf3anh',
                user: 'xkpvsjxyog5635huxyri6h3knujpwxytb13oxq6v6bn1qs81x9cdji445as8yr8xs1d7z0pfhxx5xu7xnwrhn72qxha2un814h4tlhwf08cfjn51z3cql4t144i9tmkfey40pogy0v0cbsp5b2s3q0k2cbvoqfk9lvos7w869jxym9v2t2tltunfpzqekkc18qbcoze87t3lyqq7uvz0jux0ep770auf4o5zzv43hai7tcim3ioiw1qcf6n34dq',
                startAt: '2020-07-27 12:29:15',
                endAt: '2020-07-27 20:48:42',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'm6u6c3unej1tpjy05rzt',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 00:29:14',
                executionMonitoringStartAt: '2020-07-27 20:48:04',
                executionMonitoringEndAt: '2020-07-27 17:24:07',
                status: 'COMPLETED',
                name: 'vl9pn733erwuu3fk9qsbcra0x6uielgyf661vsqkwsgf5d7gv2v420ch18j9vmshfln6bbc93g2gm9jgzw0aipr9o01gbficgedsbb1va8i0r7k6mrtucoob9viazhymyar50vb7hqazkij2nouw8hor3afvdefl0defjhkflw79pckcyaz1pgcuteq99suvyindg20qjgv455flfpzux4hp2ra35ho9cijnoa8qzor2yxpthx0qpvtgig2ix7q',
                returnCode: 9762187487,
                node: 's7nxsqcrk48vg2ivol52phu99s1tq1t4l7cd3fvav4bq194nine33fqbkxd6jjzuz3lr6xc5m41l5rrqrltwe77cp69j7vgvf5vdm3zfjjsk0yl8psftf9l9de8ttlbbsfaas7cea4xih3pglohjwhajsqh82l3x',
                user: 'gu9h6h8t30ekoa0mnfcswehc7hyh8ugtmr8l3gwiw0fmhjrc5kjy6ar4zoahqr6z5ecayhe2ppgph56wc32a78mc6q281kgc2mp8mcsjy2clh3j94xzbx161bigxcd7ovc48qzlvmp3zky29q16mt6vqdduktl2lioysmjrabpd4r2ws7yhkg9q9681w4496ul0qxkmhdtziyzrgu9sk4z3uqxas6eh6xjyh402io4t7wipkkxdioxbz6eu8z5a',
                startAt: '2020-07-27 23:33:14',
                endAt: '2020-07-27 15:27:51',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'fa1fveyvqxxs3focxix9lcg3demt59mnv4qc11wp504zaicd0a',
                systemId: null,
                systemName: 'xx2t1fbp5n49rtx74cho',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 02:02:29',
                executionMonitoringStartAt: '2020-07-28 01:58:48',
                executionMonitoringEndAt: '2020-07-28 08:05:24',
                status: 'COMPLETED',
                name: '39jyfo6y1r3rhusw8y28zlikb3id0qvmcb4mc8qznca8lbodxxeqw8w4hovlf6y9noq9c1mg8uobjgtupx4qsfr9a1uxvc4i4ioqrdbml51rm0uuqhzj2je08kxm1p0sd378cg2t1e3ucwnkkqo3hzh49kv88rtsfu641za8r3kwjpdoe2cnkjwlqcqcnfix05xyolxze6vqt3uf35fh1f3jq97sa9sbs6iiwzknrch63o21vztty8b77wmpv58',
                returnCode: 6552678292,
                node: '8nw3hnoj2huck93998fs3edk4zy0was431wutggz3o2f93o9aejv3cr1lvaekr9qwcub1ea0s4xi5zv41mzs6g64e6yqy6zj6xicyi0gnh4eoqanuuqw1oei8mqkcsvgnuub397d4hxxfjk9a4gyppdi31bs64d7',
                user: 'whj5x0up8vr4k4q42zasuarz4z0arjc0pwqstapavzc9v9l6hyx9i59qa9qx00igyvt2xxsgsx5zllmwn7nf7w82dh0dz6eewv27jubxpzo77tjwshb5e2fyfyp0or9uy5cnab0bi0g1r7fp5r2r270werdl2i73318zk8ohsfq036ygzi48qpnhg7a1f0ngr1lku2cluzq80jchsbfmrybqp6sre15eu5310e3v54ly0b3enexdr0zv15g6lb9',
                startAt: '2020-07-27 12:11:49',
                endAt: '2020-07-28 03:01:59',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: '46rufzclp4c0ovfai24qs7tlkex9zdtkxr4ol3xpj7cf0uba9q',
                
                systemName: '4vb3og8gw6167jcqjb2v',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 01:11:07',
                executionMonitoringStartAt: '2020-07-27 16:53:56',
                executionMonitoringEndAt: '2020-07-28 00:50:44',
                status: 'CANCELLED',
                name: 'rghcgk4psqirzvakuqzqeqsqh45dpi7tef1nsexx2pdxjevokc9qcoi3jk2inmuucmnvhhns0y2qcobuw3bdf93r1qjpoj4lr7s836lx1ajie7xp6zcfsm4vy485pbwoi9oonjupcviogmppwrh61hyt4dm49xi5nfzie1s1lk5f8xxlk1bizvexi5eg3x0qxvq4gfubhwrfd7pqswhw7mkn3uhxvl3khq6h07nop3hifjeabftv9jtbttogiia',
                returnCode: 5345817939,
                node: 'fhfkp0386p7l3oeemf4evpcygomc0ao5vqxk6va1ejzd9sjzest08dk9dlmam7z8rqdhkr0rdch9lhrfal982c6vaqgx8cv596w6369ne4biqjfeseipkkg0zhajdahg87wxtl9lwcml3btsvxafltew3turwi03',
                user: '3lacealee76nt12aqudh14wjkuc2waux9tcelf1t0ql67b5c43m81x42h4bkw20i6kzalwimomja38r8iin10y227rxxit4a5z5guq3v1iok8munk7nwuccd2tw9ksdyd39447uspbswtxvkpak32r0z9vn6opjtohv9aheazgxec2aky7918u2gpjyc2wmhkfx52wbna6lrcsh695i0tuwi778rs449zc6b2pn3p2a3k81kzg9yzo9r8png1i8',
                startAt: '2020-07-27 22:56:11',
                endAt: '2020-07-27 15:00:08',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: '5pqsxn1y6fwkb76q43xouooa5b2uv1k4gogjukxp027fbdcubx',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: null,
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 10:20:57',
                executionMonitoringStartAt: '2020-07-28 07:09:33',
                executionMonitoringEndAt: '2020-07-28 07:29:01',
                status: 'CANCELLED',
                name: 'utlgbyc30ctg9akaq004b411lwg0lumz06w2cr0d9h0yao52yitjw4f7in6zv3znxwuyhkscqsfn540t63a76nx05y5apssmsl7tde8lwsa4nsbs71eheg1b2ia4p9xraq5q9d605tx877dsglg8rm7htwpvnzsukpejp95xw2vo5ha51kjdlxozrleyooqutnf3b8vbg5ijgegcgas6g0v1dz888bmzx5oq6870opui8l3zsacdts0vv7i8whh',
                returnCode: 9889982185,
                node: 'ngl3dr5q6hkjvmsqoztj8i8n1jbrxq4pxqwt1fv6bzfs5ictqa6ksivwdaosoy1icnmm7108sjofqt5i2333wlo7t6zhr152ocohzpnz4wy7lffjun56kn85z45knjerapzsytetcl8svbj849yvf11z6n9x17pb',
                user: 'dpubk11ty9w4c5w1fgk4zegnr12kfj3hko7bqqj0rtuumrk73fk49mchbgb42u1h5igjzzx0bu023kg8enohpegpqj6s98cawogz0c95ny2kecau67h0lya67a06v3qoxfpc099tjky0o67i3e6dzf32fxgdmb2jncnm13zi6bwit6wyyr2jzzcdy0s4nvzlr7mksyzz2zvuywrefefv1whn13o4arhr4m95uepj2h5o77y04aappwrc57ar0jh',
                startAt: '2020-07-28 03:05:32',
                endAt: '2020-07-27 11:48:19',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'bv1y025gdagslk4szc9bzu06gkacet347wexzfwqy9jo625468',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 02:11:21',
                executionMonitoringStartAt: '2020-07-28 10:54:50',
                executionMonitoringEndAt: '2020-07-27 14:59:35',
                status: 'COMPLETED',
                name: 'c1pqr0jbaqaknfyp0hjt0uxyzqvbbf8fa8vd757y1fg7jjwpbit68pads6aaz1agqwic5a1mu11cac01m48i188ozus0kkga528xiauajsnjtp7c6815vvr1yebeapyxtngi0q21jgvmg1xcsncoy71ihbxl42sp2lplwc3blp9c3ggvtw0d5n4f0roazqjidl0r4pebpw705u4tatgs98p5qi9cxaheccwa7s7ywtuhfhq198voe2yxgxwsxs8',
                returnCode: 5461653552,
                node: '87rx4y2yq5zauea8jqz5pmrkf8lnesw6ejpq891wso7o1gmfwtaxe2dk9vj7brc3bdjq6exdsyp2snzx55c1b4at5hqk16s4vfksnk1ioejdfu1mjhz2g82sgzlp77fxcy9x570320mjy915eouf766dlq52sks0',
                user: 'w72waiey2dy6tkstm2d46hlrz2tanogsg47tfdh8vl4mq0mlg1odle9ecelgwmr1vdy1sjcrdobthdnb17r2gtmluhyhci5vie8qfpb52sljv6r0xsujy6fxn2t8anie7o1sqq2ly68pn86djmnm7zcwduz3by163cp86nxc5xc3czywnpq04eiq7fz6hdipw79unodcd4dmy2poppj42gmkbx7n9pveijfzy8ynhfznorju6w4pbabhxtir5mv',
                startAt: '2020-07-28 08:25:38',
                endAt: '2020-07-27 20:27:12',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'lkkvwk2xwxozxq3vkrpqam86bgf3lxtry38hhpb5frbp0yfxko',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'ctfkg88wn6rpy26o92md',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 10:30:29',
                executionMonitoringStartAt: '2020-07-28 01:27:47',
                executionMonitoringEndAt: '2020-07-28 00:29:03',
                status: 'CANCELLED',
                name: 'tyu1ouufeqor0p1e9c0kb0r63tmobk19ovzg8gfc1uckvnrau4hh3nnhxqiepg49ywjnph5y3gb7ex6ros0wn9goxqb6cabkahk61mh8z2peuvduthtd14jv834ytkxisfsdthdg12m8g8tr95yiiudxw524s9qwkwye6y0vxau03mtobapavqle774i5665xapipxiwhs331t7dqumaknjfxakceaba2rgsotyo857qhw6o6eacwi8d1rv75c5',
                returnCode: 3731611790,
                node: 'a5tf34p108wxhjk49no6acsun4tez3chkz5cpjwp4ik3udwtc2wyex5zv2v653poe0v04qgovedm8p3ymcsbnwjgnrhxb59pavjnqg62yfkbvmfz1ap3ysrvllgyb7cn0z7zzd79na2lljlxuk9lkln3af9w5l4v',
                user: 'bib8h03k14zt46u63uczcv9gjiksvs5senu22b3h4fwdvasonfa44etocn9mtp5blq6chzxoqj4nbz1cot8cx9bmo663ukrw508zu90u39f6acergp2f3b6esvyku6t1dpdcgvi7sto3jjzsebd7mw7gt3e3e471td9fkgx66vbd8lc4qn9y8tqobc248cgxacohwqnw5qcmlflole525hd0iuigi4jt04g6fn8h51wb7t0adwixcf3tdu9n1by',
                startAt: '2020-07-27 15:27:35',
                endAt: '2020-07-27 20:35:24',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: '0vyd1qfsl31fysg4c5j09nk74e1ipi90cck9nhsna61sp4xkl4',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: '5ks5r0w9kvimj0tbb03u',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 00:49:37',
                executionMonitoringStartAt: '2020-07-27 18:31:04',
                executionMonitoringEndAt: '2020-07-27 14:45:08',
                status: 'CANCELLED',
                name: 'igd6y50leucl2gtyyx6wci8xw1j8qehj5r0flvaop4zr47uxghb7jcle1k9kiyju67wjbkncpclj52k0kfu3pgay44oywoowttffw4ul7ttifg02rn2ewzc63q0mz1tmw7k0hrv4nqu182qpbf0gnrnxf9umxyibxzlsfv3og11tclntf2vwg7hh7urkwql26szrnt179pcdvg1g3qftvalq73asbqk0af712vpgzn87qeuml2bngc72g1dtqzh',
                returnCode: 9602222471,
                node: 'os3mozq5vtd4cgi9l22hbdygxgdd4c79pivv1d4kvevmrzqd0opju59hwdw4h1fgabjsugdmoruaw49bc635zb36o8m1c6rofp55okcg3wv3g0ikdmr58y6fae5wzoinohp1gm7i2ta8os100qgzv6j2we32lzxn',
                user: 'fzfxp2hao9f6lsj3l86wlq9stt05l9zeb8qft610euj3ft8rmt5pctam7gqqnrqbtieoif8os01nbdej1geutt2a16gxmwc763ariznv4ury3pgsdzwo9kbj5p7pea60eki01v46pz2db6uo4wp2fzcbcyngkyjlg32dwd9oifp8av56eaygp3r443sab5hova5bf9lxqnb69mnwmxhzzwrdh48qedf63xbvnxj7smbbr6yq81fbsb4nrxv30xv',
                startAt: '2020-07-28 05:55:59',
                endAt: '2020-07-27 17:37:48',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'ty68c9x6zff3do9cpb0w88xax81lxs9a26gw4i74iryu96awp6',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'id0h0kln8wv8xofpd01p',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: null,
                executionExecutedAt: '2020-07-27 21:17:02',
                executionMonitoringStartAt: '2020-07-28 04:57:04',
                executionMonitoringEndAt: '2020-07-27 20:51:02',
                status: 'COMPLETED',
                name: 'uqrmgwfo7ylykeaxjg71tqd2n16rsytq044nbujhksxl7wmgd3zxnjlv2y52iy8ka975rsn4zvdlpd8suu3zg6071nsgsvkrnec0el1l9xedf85h74vkkqq6s5t50pi0fuezicrut5nx6loak3pzzlw21i7urybh3dcj5sxhvb3bertbs36x1nctp8bfljgd2tvyrfejcfw7ztwmlf0z2vwsp5afmba3bmvob4mj4n3xe2rt40xxb5lmvprdi4a',
                returnCode: 9539232924,
                node: 'lofnuof8fy8ezsw5uuwjza6uixsrj1zpyydheqj02it90n8h73rt34ov18tmogrbuv16l8c53tyddrmqv8w4sjgs99ju4ck7wz6792lk53jn39v7jv1yvxo82qdbhbsjuw5ugh8i4ala3ry1pw8d64fgvjpf0s0e',
                user: 'ifzf38zfic8r0s7df06l1vymy7cywx1w7jkuaihoaqojnbqeo4gx02k8n4u0f16emb8xskfrm5no2rx1d73fto2bd4j3m7sao7w9zrttymda76riki7295wlqw0ztilcv0ux8ksd4aputtlkle623o73xvg5h5ocashbtu1ivz4bcty25kk8qwnuj0rzaoj85aex3uy9hmrnkhivo6kfaz2j9rhg8eedmjvcb659z5t5h2azs1zdwwgjs2h87ac',
                startAt: '2020-07-28 08:58:44',
                endAt: '2020-07-28 10:52:33',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'q3sijhmjzago0ocwyxb2rpcy6nnithlhserov0x63m24un0ng4',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'u0zy1mf7tk35bnajwkm5',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                
                executionExecutedAt: '2020-07-28 05:32:44',
                executionMonitoringStartAt: '2020-07-27 16:52:50',
                executionMonitoringEndAt: '2020-07-27 16:59:26',
                status: 'CANCELLED',
                name: 'ajhyt7yoahi2i7keer8pug42lh8j78h304jm1asawu6e1gdn1ybj5g8qt4j971cutvi7tjs09q8oovf01fi0ehfaxv6nxf30cd7o0xsa6z7h7bh020n1absqx7xezhq4kgxnakix2daix8bg46bhfudcmaa3r5mvnya4trkftw6mrz8bv5gt8xy61kc1zqjchm5grvh3whpi0fnt446vzoenyeyvq3p2g7n45fib9wl9sj2vh4qrnth5lmz14ft',
                returnCode: 4827634640,
                node: 'h0z94g3hgitwcdalke8py8wduh9ff8sca4n5n4exqyqdslae3u5bzdfk4tjtuumu364uuhxt86r4yg7n1hbrfkohcvzejkj339uaosms22jpuf4gkdgqiu83473gyvnb9ur0whaf2atpnrdw4m9n4rulbryn0ryz',
                user: 'pi7eqrl0s3p96ox3emm75ffy6fsogzvb4pm43ot6rdk4nq3oycnypa2jq1akdxwh6mwpv80x1w594hzsbl7ox39j1he07n92vstcn0mtal6mt4b3lju0clqliya78u0hxxfjb8ei3rh23c0wkcek84fzxse0wekcaday0cv7648ulrobls76f4ctp05gg291vkevn1tka3fwmcm2zmecqb1dfmj85ui4qjvqpt0bx16sq2uu8n5qskyfmib8eao',
                startAt: '2020-07-27 19:55:14',
                endAt: '2020-07-27 15:20:15',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'wweacxhh5hgtv0q327ftus5wkf9nr5yhtpc7et29osbplueark',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: '5g8u5r96tscu0afznlss',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 18:05:12',
                executionMonitoringEndAt: '2020-07-28 07:10:08',
                status: 'CANCELLED',
                name: '4dq3rj0p2axxbj1ma8naks0iata7wu0f6fy693n7j35637x565m31mqnfbjkilk0i9souvqnglxv3e7j50k836p1az4vycvl1dgs7fthujcajeii741evic926oi0vd0ccskkri7vzx233skw4i4qvaurrbjoxhte1wlxl1y7bo0bs9798ynh0c4to54h3o6beml35fscaxle68qkt99udlf7hkjvtnsa0axrczy8txskzqmjfotfhgx5mr4kz0',
                returnCode: 3984046393,
                node: 'tk5pajwz92jmgtjongyyxzg8lg51sbnsvkf87i1jh77xnbx6pmi63vfbafqrdys4pm92m0lxehhbyaedo5nn2r7oyy6i6l0gfftqi91392q95zppwxhxwuscg9e3giaq095hgc4ctbet95rxfyncuzjy9my37pti',
                user: 'omickzvi6xs087j21qw676ogezhyjfunyyn07lqgnb4uet2emzfvcdwg9a1uumofgbms5k4so5be88q6nhcmcvgav9r5u7ge3ske3n019iylvgsnxpzskbvfv5uzg490vh7amumgmy1hn4iycvmjtaycwa9245coou2u4qxrmovfbj64t15rmsa1myzxsxgs0jo20ufzken22hvqbsdw2mqv9zj49mpehmlgjvefnfs0jrmwdjft3im7hmjcxrs',
                startAt: '2020-07-28 02:12:10',
                endAt: '2020-07-27 15:09:09',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'ahcjorxk2ladcm7yrel7hgsvfqmudlxwfb8entmokznbsqsm8q',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'enmnk7tikqcx0bbbmegc',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-27 12:46:39',
                executionMonitoringEndAt: '2020-07-28 09:01:29',
                status: 'ERROR',
                name: 'jfnd4gn5jeauny38pmou63pith99n8p8e22t2lxnhv9xyjz6vegb4av2jota2wekwp5y9s059b27qigokerhdtxz4wwcg3d03tvjma4mxsu2l0iflibbfenfrwgo2xyxw7stolqch3urkdwis2d84wl1pcy30eyvy4u474qsiw8uts3j155jkwnzsalk7r3qj66vlv74m9nmscpb2wtpymini3j2py6e3ebkx335hncgmfeh06etq1og79azwz3',
                returnCode: 5852893772,
                node: 'dw0yxkh7ova3nvt8ow8o91yq7uzcr603wvbvpdfy2qmslph1pbr7ac9lwmk3alwqsjq3r17zmowm15dbtbt3s7gp3l4quo5p9n54pmd54zzv90ma1hjqoakdk7j5jw2x0bes4whx0sdj1cu7wolmkqfjd5y7fmnr',
                user: 't2v3h71ubc2vp4km0rc7bm5q37kpsmlzdx22or0fqvaiywss9jfh5yfivib4dyr10ocah9sfmkvx3m6y4xl3dvo5e7teifhwcevg8duevl1ovjfh3u2u64tob0aicezvv42jzzdzf59hm6hd2giadjqxdltf0j9xlowokcpiqahqy4x0nuhwx8z15iim50jb3rfk3mdgdrasutq2nkquqcghrcg1ndkn865iya5z16mvtra741k7lvkndt7e5z8',
                startAt: '2020-07-27 17:58:05',
                endAt: '2020-07-28 03:34:31',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: '7lqx4ja59thlzr9mgrh2j2pksxks52yl28qh0p4wfmaz20sqqj',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'kk48rqb4t1xnkvn1befl',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:13:49',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 06:27:58',
                status: 'CANCELLED',
                name: 'uw7mhgwmk9agdgobwykcyggnsg313ztf19qmyvw2jdnwgcig7v1wczhji62di93sztks417929zbfc4kgn3kcw7a1f63sekio18aiko5sjantzfz76h41kywmfish4shmv8kiuukujwb7dvspkrsehfkfvw6zk560l2dyjixlazexjs5rd991qckxp793j2q2j5neukvj4r8a4go2juwj4mspngv63j23v0omc8lbei66pe9qewobmkn2kqjup7',
                returnCode: 8571758530,
                node: 'jccmsebbhov6bha2hs0ucbu0npjritohwgdm0is36a6wzsljwdaanopfnls93us4od07ol5qg7uwh3ff07gjqnrm3of80bovug23jnkmb7isgvurrkl0qwnq4jl6dpo8f81auuqigu5h6zlz9cxxy42lx8a10hcn',
                user: 'yh05dsw7g11b58jlfi0m3zuh3dp83zbq6cvi1eewwxssge0zr4u3cmzgmczl3esep4swblb7z93dtg0j6or2rsvw5tza2rp9n20m7zj7h0j88vt0dv0ixj79eo8ryno8lpi9pvl7toua0xfkjm5pupj6s4xyqjs8ncnqk6k10sgv35anjre4t7f8sur1vc7ypphh7xkmcziypzlh3tc5jhev7n3l9g6vvt53sjw8a1gc88sfqy4d4bg3yyt3de4',
                startAt: '2020-07-27 16:19:29',
                endAt: '2020-07-28 05:39:12',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'g39f9x5g5uyf22wedszjnt2m9698n9s2yqjcgiaotu94qsk3iu',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'rh9cly9sh9115aigylua',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 05:07:52',
                
                executionMonitoringEndAt: '2020-07-28 07:31:52',
                status: 'COMPLETED',
                name: 'zs5l6ne5jm26zat424hbinhy33lgkqyuadgo3ll6i3wmyh7op2sw6gfk37c98ei9s8s932x3w7xwopkm2m5zbjq8ab0rx44ge8ioaavf0s5unwr76ivssu86m4yi74ganns1wa3hke7muucbqbtexlqogega93sm28v26ueuibgcvzrlebewctat52gr6cw3y5jpyihzb6tl1qtrwc0sim8ub19sfyqkewq4dpslelsqjewfrgvqd1bt4rethdx',
                returnCode: 4736681902,
                node: '3jchbw8ddud0mf9v7jembwkw9tftx0ffvalyz16mwzpgxooie2cgucby1mzcykdutsexcrupu7z3clb0mfjulyjku0qjnlhoh9a6ar9hy1ur2lyj0tx7z8kvldgwxu64xhy9g0qqxop72lzok64hsqnsa1gk7fp2',
                user: '2zpd5lwethdfl0oiqkbr142fr3i0dhrbco4z2p1s0e9btn1ecy1onoit6obbqd34v6dwe8nnvdu5dleoxqlsudod0ut95l7ou336im3dv16mk9z0v1gzpyjw38l5yd4vsht1qvugf566kl8d1pkmg2rnf7wttqixd6dp511tgqo574jpidohsredsqnxltrodx7iimvbfbumsirzkiodfaj4qmgce9enrh4e514bhe4j0lavwo5oqdaax4pr61f',
                startAt: '2020-07-27 18:46:02',
                endAt: '2020-07-27 21:46:29',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'jiw13trxtepz238su34d82nckkcyc2mvev9auzf41rjid8awjr',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: '1tc8v65m5dsc5yiatc50',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:59:07',
                executionMonitoringStartAt: '2020-07-28 10:43:35',
                executionMonitoringEndAt: null,
                status: 'CANCELLED',
                name: '94t4u1r5r67bxqd2t1atsmtck6ptkhpr74fcnh1a1fli3kbhfeejkj6o4surent4q0cwzs9pbwdhcdcnylkhrs1p13xkrarct998byaqqan2wrw2vi09ehs5jndxi8go2jcgpwjym5a5pfor0dvlieh7mf6z34roucj0jsopam6ao4pu804dn88ye7itscwpi7uxngxiguz303szcn7n1xitgwz8r3nm417if5nsojc3f4l1nkfwfqpanzgi3j4',
                returnCode: 8291271001,
                node: 'gnxutgkf40l7po1p5ve9296iqtlmccjz1k3ezzhul72600ziqlv3x2g52gfowhwxhiaxqmoahq6gxb9p43x5d3jcihylpwu3ndiuucx0inrnyyy528e7ah3mk9otljlpawl7a3n3twsjfgrypvsm9rxbunlt27mw',
                user: 'hk5e7511dkabbw35tbo389qmhp9nlj1hpa1seofwxtu462ep34wxoukbx4j0om7hhoit1mwpt9rsmyh0val4umj1kb64jxpzsmvnrjwj57szl7ntao1n1jlz674nmpm8gozonmlftsoqmqngfhfo1cue3di66xz1c05gv7gu3ah6h9bamqubwk6hizt0vncwy4i93qkizg5a4tybns49g0q4w2c92y96ym3ul5p7jsqaest22sqube39xtiyha0',
                startAt: '2020-07-27 17:48:42',
                endAt: '2020-07-27 13:34:22',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'snudl98owq5xnagqut75wx3mnnrv6aze5iidqqy1ikr0ntcu9h',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: '9awz00162pjo590mhyl9',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 08:27:23',
                executionMonitoringStartAt: '2020-07-27 13:52:07',
                
                status: 'ERROR',
                name: 'hvoe27exob9dz1xt7q7smtggyzm6mn43t6j882ybie5ezl4syjn5i66qpyhu5z2bft5a7geylb04s6bogim1flw1f00zxfho9ymf3d8i2bnv5ebvu9yh6qa0xavjb8roycgkgiv5mf3nze17qzvdo6nvzlpdlkyen83ge1fync2ti6jawxbprtpody8pqc59n9lg9nt34qy8hrdgck2zvc5uhiuzcxfsxqnmbdzio1wwdd3g7j3px1do853xb4s',
                returnCode: 5450364821,
                node: 'jmit5n7d24pjcq9ece3727qimbsxjc2d0cz5wrq36nwj873cnb3kmmlqholwt92au80rmc7tshbw4uikid18neq4lpqpdu0m891btxei58cw9obqcomxc24qds3k7kmwr4xb6sglabgd5xcknz8p7trqvedm1gv4',
                user: 'ukjk18e8ctnyqm500uxxpoxwsh5kwufh2d0vrvog1i56f1c2zzig1msta0pd3z55kh9joh77fnl40ct6y6axmihvtvtki49g3xpg2iw1mfd0vgbtkghauk3fb5pmgzaa2e8kjn0yfyxl1zrvq6us9uw8u3bw0lw0jbfcsq8jlygtqvehobr8apjddpl9sp3oulbcgvcuysix7qvhp4k8d563l7hn07bvhqfiuz4m0q6yzqrerbjddwygqqmzgq4',
                startAt: '2020-07-28 05:56:40',
                endAt: '2020-07-27 14:33:01',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'g1sl39wjch57svo9b8tfcpbska4fldwu9f51dzoaayyes44ke2',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'f7q0ky3rsl4mjh07rv16',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 10:55:59',
                executionMonitoringStartAt: '2020-07-27 12:24:42',
                executionMonitoringEndAt: '2020-07-28 06:49:02',
                status: null,
                name: 'cqky7ekpnk0ri50nyc3vnjc0psk4mlz3uujb2lkoasw1j36zebmlxx0lhsuk6fwf83ybwgr7cd669tubetiu997wi92cb1zfk17x324h49qw8rub5unw4ykbzlsk2gqw0vcs4n1viu6b1o3l6sbjnqq0dz9h0mssejjl8cn3sf7oruce2ort4uxn392p0vqpipprj44q179gtr7egx6pw6osjzzl3czonxppv5hnxpovw3c0gp8qubwigpkhg67',
                returnCode: 7444632684,
                node: 'z4h2cjr2x9d3u1viyg1i44fj0dw6hh0c721rua9g6ey91nqtolwvk4fb3ja1ik08t1a0xb7am59wfzrrehhhz1ms60hl47qjvog8lobnkvwglsw9hsc01re6cdq9qqmc8xznkkp4n2sanagu2y3piscdymn1rphj',
                user: 'd0hkkckzpvsri4j9jzlwkjvmwmiz5kgbnyn9t7nsm2geq7jw4540j4yfpe8fwsxw4yckwmidze9jy3j7vcav4koigwtcqx3pkbqe6afrw23lq2dtcnu4jv93hoqp18wbmczej695n5b0cdl7fh4nnk24ptoytn5ouse1fa0hoxt7e3c2yo30q5ms4npnwxf7qumoayqtxu1xs9dipu6twbzkqk9j5jb6viblbta5bouhpkf7a05hoxqw9llu6b8',
                startAt: '2020-07-27 13:22:08',
                endAt: '2020-07-27 23:00:20',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'pky1zo0bd77pp62u4kpch5d6h78fvmwuls1wfchypq77ivv4hl',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'qysl1ij5o8iwxfruymbq',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 22:38:53',
                executionMonitoringStartAt: '2020-07-27 21:51:11',
                executionMonitoringEndAt: '2020-07-28 09:39:19',
                
                name: 'sznvcadxkm5axzr96ujpml60euhkwhpemckubkwk2pmiwwz8wncdl7glvqfq409meco32avs0wcl1c13taj476yzfu3b2sj9i4373pwqvtui5dkbulhrm44zxrvafn4gvc0go4znao9tqkm7c3moppgwv90rdobf4ek5h4qmwhh5c9ij2krojwxf7a04ow484y6p13rsp7pz8vd1v4089wbommxahxiadcemw2we2nw2qu8fw3lmh4j11jqtzol',
                returnCode: 3858519047,
                node: 'ezugcy8ojjquf8nqgeax81f3j760idlhpwfmtx5bb9itqlnxctz4hv480u2lf3yjjv45lf0701a0iwqycu9zz0isc0n30p9w52x16c3x029kfjv7qa126y77bl0lrrkvte4jakpev7nojfhq5609mvoa8rwriffn',
                user: 'dyi5kxe6o8q4dws8rpqp42ymqswk1ijxf6zy3un5p0qgx4kjg89jqwi2qxtlte1nasiqmllncuug7my567i4yur7ce9ilwp5gog3u9rheicsu0zcbvkx846hqaokahnysbbhqgr0x3v5fbs6qy445xy7ntwweeg6ran89hql9mm80vnk7sowgir83f5rkh7mv9zpqwz907c4rk4m751xy2ctqafr5x0xjddkxy0awpdofgss6x6v2cpxk2aefi6',
                startAt: '2020-07-27 20:31:51',
                endAt: '2020-07-27 14:58:45',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'w4rl55w3j5447z48t38u1z42fiyi8mpftbsorbuqoc3crmgixb',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'csahwc2c4r0pq79rdnmd',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 07:22:56',
                executionMonitoringStartAt: '2020-07-27 12:13:01',
                executionMonitoringEndAt: '2020-07-27 12:30:33',
                status: 'CANCELLED',
                name: 'v5hwxhqir8th6wbgu8a8jqd0byo7ohifks6vxp7o3gdr6nl5xjg189lhzmupcfut4txdip00wb6v55fs4pa3nvtoyy9yhrrnrld4vr6ncdf15qyeg7krok8nbtiihje1md62u0f47datcgx7dspwow5c2tk2yse2buavx1e4iwj9p516hctdm2l7p62m44juuizc588rin7nab7c38jhd8f3forsfwlgn8cqzwczkb6qqh67nsrs5hap212ctcd',
                returnCode: 1912232043,
                node: 'rzxipbxcf6px7k06yr4gni9501zmvfavpjn8jyxuejeutrdpt4kamc3vy84twancdcb6upzlztkzy12yqhhdm3adydtj4amrt286d36eglcbt2jco2wf4pj93lsblrjip47xstkj3caoojzmlpq1xzyc4dyx79iz',
                user: '5hpyzmxn7wyw4u2fo00qu3h62usbqyxdf1eazxw3lfzmlz68ure341mbdzvexnpakt70ch2i8zou34g32kwrrel06fswjw65oaxa5enfxnu31v9yl1y76eadt4jpoa0311zl2w57q890plulq30zem6edj8epv90jgoi8jcinpon86f7wi4589803lpkridlen65cv6n899nzfrnm4m5e3o4avhy1iypigeuu2iwi9pv36aa4vi5r248qf9uqw4',
                startAt: null,
                endAt: '2020-07-27 22:48:06',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'lxh76v2s4tmre8xmumybxa19rqz2nkaklirtrchv4asgeu4atc',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 's9vf861sw3uk9xeik9zo',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 03:46:50',
                executionMonitoringStartAt: '2020-07-28 03:37:34',
                executionMonitoringEndAt: '2020-07-28 05:25:50',
                status: 'CANCELLED',
                name: 'd82ge5rkse64gh9or0339hrdtckz2e2ydbcsn0vif02w28027jyocvbzumyeu1l3v7dt46vsvgre1zrqtvbz5zpgycgb0wnndhi4031dhk5x2p3e5d2umkte3fu04kinjfjefodel79kzdtwylrvcyekudjdcmze3fam60v8brvb7u7qgzklds6ttiqk4a0x3p9gl1zztudv0yzd6apg9mxjmg2fyzm4co85hs5iw9i4db6zsou4lbp1af2g05x',
                returnCode: 1888591752,
                node: 'h9j70bwy80246ylsvvao8m9ykwf5gj2f3neihelhu4z4ejmv1qsxei04syoy04lhudthj0guwscf69svyhon6ebhhci1qyg851u0z4yx34noonx17n36jgosfc357pjyf507bzpgijp0ieptt5ytne8qqle11rbi',
                user: '82wxez40dlk6b4zbvmb3b6tjpju1d3n1xr1wt7lx10o04vkg6vewth7oge0cvs1mjqx0op3v4jd5gs2wljh7mfqx0rhhcffxcl368sv9ah06vf2vbcc2tbsz73b2y7a44a2cget62axwztkkpps7srbyx4m47541pyuim3erv7ysoor4du6qb3d44ubakv4tqw6l6c0ecqf8zcrkluob7wcjb77uascuslj7tqpecb9xod164xd148d1mu1qs5h',
                
                endAt: '2020-07-27 22:44:34',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: '47h0t8ldq69t47it1wn14vdw7axj2rxv2m9lt9wtppg34lxaby',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'la9g2j8jxx7uuwuelqed',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 19:51:36',
                executionMonitoringStartAt: '2020-07-27 18:21:23',
                executionMonitoringEndAt: '2020-07-27 12:52:57',
                status: 'ERROR',
                name: 'olzm1qbicpxu4lihm38mv84qmxovuujbfpviplplyabdz5l01h1bmf30qafbw5csa2b1ay1oojceopdmoonm95kxgk8pv4le8c70t9zksadgqccnkvi6mzg1aob3793n4oo36jgg04wbn2bvvmq1fhqbtc0ze95st7mi7gtm3d475nja2958l7pl00ymbz51431pqgc1dooruyocswfaw4nsz7t1zeoxv1vmvdyk0nzxjwukd7gfnmkm3a2q9og',
                returnCode: 3531322957,
                node: '8bw6h1zyvng7penagx6d18ntor6iomgoaf3lazx3psx1ubysjvjfqeu8x74bphhhybspqw3yez5aztscv4e3o6zqehpc45dh995bbi92nxz2ygpbd1mzoaqvvxgljqqmhwnhzsyumghgozes77hopw7tuajupk0f',
                user: '45n53ipd8rbk3w8hp3mx70fy4bp6xkwqwmkz4pepxj8veu7yqtbmjvs6dc0ug4tg6fphfpb5g5x0kzbnhx0pwt3prszz8ic9m1wekmov5onj0l3ybqakcyxy5w70io825znbua2qis9c15jejubh7g8gisics953brraur40u56dyfp314jm5jscdf5kpg9lku2szt4xsrd317rupf31b6vw9at6p5b16ip4c5e05tkirow7lcz7ejtf8syutas',
                startAt: '2020-07-28 05:07:14',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'jnjfuu3ltr5bwwmv33owr8u9ezwwhhn6f2lo0b9fhls54kiius',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: '9oe91uv4mcj5ei2k210u',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:51:20',
                executionMonitoringStartAt: '2020-07-27 18:22:01',
                executionMonitoringEndAt: '2020-07-27 17:21:40',
                status: 'COMPLETED',
                name: 'civr2w5al4f1sbcpmx77aowy7k20a1y4tpt55l7wv7outogrc733c49d68pxr7c2j12sius77rn4v1vxxcatydy2nlot1wt0aona408jtkxlpquohcmc0zkeew5b72fqnvsaye0f36j82xb8jjf3dykpkcv9kwn6hvzsbdz2q09vsl68r1361dmkwi67ludrpgtnmwknbb34ujzvnvvk1yme03nj4p5juxmx46z7cyd8847gj0n8db7ync3usb8',
                returnCode: 7403871590,
                node: '01hnsun3q8jgft98d5enbj9nh295yvinvfqgbbyi461b6gy79lvk0mzxv2mz03xwv7t04vvlse2ntitu92bxb9u690etixlzmbtwn2hdrqo5erdlcq4r428c0sc3fs6mii3icy3djeix2g76arrlc6w6sjk22qgp',
                user: '3wd15pmejmhv4npd6xcotrqi12tadp0eopd5ldarujhb0fsd7fno7raotr6i7kgw6cu6518basfzvkg0rodtm5ab51mmivvig0kak2e5bb812shphwm82a83gll57wbnldrkw2irnn849iix093s9vohh1r4g99u22qr5gmi239bzpbv0cqnhvnl4o26pectnokfxibj4kmslclbv2svqqlnqnfc7ohp2rwnh2j01r411d1jq1pppu2durefm79',
                startAt: '2020-07-27 17:41:41',
                
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
                id: '83qbosh6dqxc9gd5osfiwzv65kjx3aqquk89h',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: '6m5959800unr8w0gg9niq5i4d3em26twykf2bwanfz94amxifh',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: '5zdgfsy398n5pj5jqxud',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 23:01:59',
                executionMonitoringStartAt: '2020-07-27 19:53:27',
                executionMonitoringEndAt: '2020-07-27 13:11:13',
                status: 'CANCELLED',
                name: 'pvhri65sbmli5vva5f56txn8u66wn0cyse2rcg5vuo6xdcakhg7o4l7k7xog1bh756f69sxtzcb8k656sva1azfw03c1etixa4s8yx2ulmx7na21ssz9uen3i4ks1li4nrpsmegx0f4l882itkeh98ura5cdawqhnsov5nyuyhjcbe4ohxy73x981n02qr00mnwi3xwhmqvw2s76rcs7pa34rnri8njudhroy3bctk941cgmyl4glfs4g8q8m7n',
                returnCode: 6076348906,
                node: 'nivtjm65p0xgt95lz61y9os8uhu0ep4m5761x3i0goflz6uvrc53j0v6uk73a894fg94uuu4i8png8ue1vnylc4fj9apfozez2z5oyvyfozh7wwu0yo84ep2q0u5ys0ulf2clr17ckaau9c0722svp8hrp851fe4',
                user: '6r4bggpip9fi1ei13jojnt9usa8vqpdip3c9fqgwoly2ozeo4mj1k2juxtyav6u7ywvzckba6zgro654nwigah44hczh2a1q5b2t3fjimzwuok6xzvcswdbvhsze1j4dvkvg7sxnbkyon0y1v9p9raahaf2uy4lm8ms8qrl3hp8swr3dhz7cg3q2fl4vi1mulwtlxp46zci5s2ip7xzsu6853nq97ldcbsn11fp1vkr0k2ox46uelo917r9gxl5',
                startAt: '2020-07-28 04:00:47',
                endAt: '2020-07-28 10:52:31',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '5gf81litaphf84ux0tuskxr8fg7cnanr49h7a',
                tenantCode: 'uiquxl1kwzklu2takbyvgb1jmkksbka8k5tlny1h6u604oe6xg',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'll1n6upwxj23azsdccr4',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:29:15',
                executionMonitoringStartAt: '2020-07-28 05:58:03',
                executionMonitoringEndAt: '2020-07-27 11:40:58',
                status: 'ERROR',
                name: 'xfnsmrbq2eoffawxff6okgeg2lhiebsxnj8d9123yto8p99flb2rbi0b43mav3854m365tqzr3g5qtwr2j88ntrlsvovnn2q6af99w7hq4s4sovpoa4faen612zvp3pv6ft7lhf619j4s0esz8pv3ypjv04atwzvsdlhpcsc5e9j95zqb8hvjs0w9z2cohppxdrwnay75v4ooxnvskxdowg7xw9eqoqpd7orszak387woih49ibdgopy4sfg42f',
                returnCode: 7614574882,
                node: 'u2nd8rluakcko4xlwaf7g6gumk62mkelquc1evetwxo4rjay7jocko0wowo3723m5vubo4z2wh307zf3rkof05aqvifcqdi6rkaesanmdbzcdobd8y445fcqkhlokfxn9lkj055q67z5w3y4b4wfktclibt58ka1',
                user: 'he2i0narnublzl91x2qev7b8bdx5wz9gkb9lyp3op3yye4iwe2kh73sopa6ssrickegxl3ix0ddj0z7y4d0x8ttbmak1klvfcqepya7192kp9ydaya19lg6x7x2shr4okdz46smjhiprbdr94x1vtdmdslywupvdp15v688ami83y7obgh93vo8pf2kwt6sr0w7pu5w83p05z9cj1l2h9i674p0mjajk6m6x7julaj3kww52ocae784tf5a1iph',
                startAt: '2020-07-28 11:02:09',
                endAt: '2020-07-28 07:34:33',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'wxfk3wecjkla2o799opwoe0qotxj7qbotfklgm4seiq69mtdmi',
                systemId: 'sffbcbfnw8s9mdjywb7jr6ikjxfkinsf0jmx9',
                systemName: 'wtpe6zkjl2t7z34za9ct',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:59:36',
                executionMonitoringStartAt: '2020-07-28 08:14:56',
                executionMonitoringEndAt: '2020-07-27 12:19:53',
                status: 'COMPLETED',
                name: 'ppb4kt4rxyy3by6yt5qeokmgie4xajm98qccfo1s7xf7za823eyo5s8d64zkicaq4rxy264e85j0osufqewdspvnrnfj648q87h7v3z1u6zs6ovqfk3zmwcpllj1co3l4syc8rwpxbz5qnl656p2epy4la3vvx7jfqfih1gf5rojf5b5ak84si536th8atyihzqfjc8tnf9soa5qpbyrb1hpsungl51o1xf0csu8pcahazc9tho6n4ffxjo8zqi',
                returnCode: 3609133617,
                node: 'mpq99hzbwvms98fglsp2m8kxo8iqgs2cm23m7zhoac2c89rbb82uefsxve2dlqkij8w3wjho4ovqvvibobkoqahu0zhrherxcj6mdrrpv3sigwdd2s1a5r4mjt6q2i51tzabtxrw9ch20gqm8iqspzvob9b9rnrn',
                user: 'h07oqnhvrak9ve6jq43jqzybz4t35cpjc994fi37kc33xwm790p1pvbiyj892g1xeis0qnh7s2wxh06gnehnei0e1o2tcre5mr1wu4t33q5jo0ly75bl9gnhb0j79ogn6tz8tr9vkl9voz2csy7pkft1r4pdvbb5ikg6095xji8lbt7ytzchywtcps3etnmlt5z58ocsy63ehc9aofkf9dctb65u1dumko43v0am98ctecp5eztkqktf5gd218j',
                startAt: '2020-07-28 03:36:42',
                endAt: '2020-07-27 19:57:43',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'kao9sp9syacfzo55nxbp54j951ys2o32a80gx7renumubfty97',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: '5gbypwf7vnn6enkt2f06',
                executionId: 's4czue46ubud5izewx9jm4qgkvwliu64fi9lz',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 05:11:07',
                executionMonitoringStartAt: '2020-07-28 02:13:14',
                executionMonitoringEndAt: '2020-07-27 16:57:36',
                status: 'COMPLETED',
                name: 'it0a3obbbvwgjc5yb11ulyobvl9re3ym3ia28y051heztnrmxmf5oun2p5yjug7celgdm9iok2p2ugl6rnzadajl87dvz8kotgxmoewvdza4bd8s8xyy0znvh7ha51gl971vrrros9mu29j8govax4kod809sg7z3eqtk4tufbinepsd11dp0400ghvn3794rmp8f7o6e45osl87ud241qsx0up8919g10zzfp4hz9pe3bnrdeoaj015dflme3m',
                returnCode: 2860389059,
                node: 'hb51eg079q73ylfs4hsw1q57sxm0lvbntj7oluawce6zxukxmyr3244kjiqgkq54762n0rcbyf8v8fl7oevfbxxm63lcq8m366sd25foi4sv6392hdr7uyg541py1emazdq4ak1uaz8sf08743cneqf4cwbri63t',
                user: 'k4puqfcfpkqzux0ss6g1r7fiqry6vq4sspehqrrefhm98paytoo8vjnfjnlni5cq3my7v3706zx904qy1z0i9mbqgizrge8j21exxli7q5js1hqy0kqgfitygizkam0arh2ifhhuzwdgwd6u4yub6zm361j4s7x1xfmosr61t1vzovkikgqm250qof62csa7df2b6jg640ipgbhxkb1f1btyy7ymnxgelavlyndu34h9eax6hi5kqq3arwqz6ls',
                startAt: '2020-07-28 07:03:40',
                endAt: '2020-07-28 03:27:18',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'y9040i0x9u6gqenl7d22bt9gv43y736yh3wbyibx3za7ip9zziz',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'uf4rhio9j0pv8643uxw3',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:05:32',
                executionMonitoringStartAt: '2020-07-28 00:50:10',
                executionMonitoringEndAt: '2020-07-27 17:16:14',
                status: 'COMPLETED',
                name: 'cjrfhsn80i7rfhw17n28o56b7e51ct26itv3uvrbaf1mzitg0y1but8z8xgdgaxnmujxaik4f0bzmleqc9ap2gpaox3bl3d3jklv337an0xtx4vby2qx4yrjhlbndv9q95holmufmi5fho9f32qhqd80q6q9mbq1gjqv5634cmo4w4suykwr5ggwbq4gmw8ku9z6fgq1pdcu3cr0m17o5k4duqg8muzea54i55cvkjiwyyk9xgvigr1rhoius97',
                returnCode: 4237925880,
                node: 'h4y4skz2oz2u5l5ad6pue5y2oa8d6jdl7t3quo24pegpt60l398wi2mhdaelwez5uwg8fn2d2tovecbdveof1zlltfl28ukmava2tr9dfoqv82uh48cfncegl3vvu11vre7rb4lmgcu99mck434wctl7amcxfycy',
                user: 'a08r65a2vi7cubbpklctc4of5o1ksuksjub2fkhm81foos60wxkqr3mu0gdggx9imgyyqcmmd7ubopbixuo9lpjo6ts102ga2nv1qcj59gaysi3yu87mjkkz8mz48wrnhfuhb2bv2viohxkaumeap859hwnm0la2erublw4sobot2fim7tg2oc7so56a033c9pelnbuoc1qi2z1td295j52761yr8maepu17uvwlzc090384908jk4watqotc72',
                startAt: '2020-07-28 09:06:31',
                endAt: '2020-07-28 01:11:12',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'ojblkisa7g9ydiyw9yevadfmy972ljergi32ffo1fh4gyxrze6',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'usugdxdrglsy7grlo2hic',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:45:25',
                executionMonitoringStartAt: '2020-07-28 04:06:46',
                executionMonitoringEndAt: '2020-07-27 16:36:30',
                status: 'ERROR',
                name: 'p5yp8yu71jzt7mmc0qkc695zjlfrlipw33mmxqu3jw8t7qba8wrpqtgds1kxmj9e271r2pvkgrrz82fgt4t1p2tciaj0x564y2eo1gown91ix45noes8e6di2ayuqi6m9mgjgnrkedxnc6dg6xnj3kchh2r80qzl9c81xqgvzkc8tqoe3f5xpl5j5y5ru4uxa2j0m1tm6d9mjwz4ygyc4kzsmsgan6536a9xpqa23qc5y3bzi1ia1qqh85giasd',
                returnCode: 1383339415,
                node: 'n5rnxxojwqgccermlnomaa06mj0dmxuo76dbi6lntt7cjavq53pf4zjk53k05yrr5cygoy52pvzpisrswbyoj17yw0zuu7sf5hlp3phpool6qp40h04i409a37cvp4djrp7zz38awqnzdyjrm94f5ijqgaz2y1lk',
                user: 'afmytj6tflu0oa1gyw4udyxgfttaczuw338hubqivw4zx2uon2ursx8sv9dwiex6cb16d9c1akpx6y8o32xtvt3e4nurqi0pw7er4rm65zeifo6w0zojxs0daueozsdcc728lruppriddjcxg86ramfw3n9unsgxhf27nl7vf6qs7o2jkk3kw273qsovxfbubv2jgwnukkbw594ifokbi6lb9gezwjdt36v3shxkj1b2x5digz556z8bh2izvnm',
                startAt: '2020-07-27 16:47:59',
                endAt: '2020-07-27 16:43:57',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'mzavzgiqbwp04wmgs68zyq9dh7bsmuk4s5idi8fi1xao910hcd',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'lsjf4in8cnljk5izvsd1',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 01:47:19',
                executionMonitoringStartAt: '2020-07-27 22:07:24',
                executionMonitoringEndAt: '2020-07-27 11:35:32',
                status: 'CANCELLED',
                name: 'ff7qi6sa1grcf46765vzlp0bpzygu37u6tri287pay83nnrdqed4393rw1m37aqv0cyp9bqxhlvg38biqqmx6fbr2947944wfyauc0igc2y9e87qesd3j56b24arc717yxofbjvmrz1evwczo01g83ao1gzjl8kv9crj5wpktxzqx5913qqzh9bwdu8wi6kscs22pxptl7y1rma01r1tt9h4mjvues1jo3dm4d4022ewf561irllteictesl7zhb',
                returnCode: 6195885004,
                node: 'cm5e9pi3grg4g98zllhuxeyubu6kzi0wzkp3gndmb7rhfbj13dxhwbqelxaa6u0mvdx1a325twwu587t8ips7p99htxj0s7qlvd4bjjaf1dl2cl2gk66kdflym4ceey2tivnumy7v37114y63l7qknty5wq32fl2',
                user: 'mrhq0t9ptv8n3qajjy5gqlzc8r1hfowh329ckaipwc9de32pr8diswock97rhqa554e1f5crfdglsbn3fjrpesho026grf4v7pg27qlc7emulfmg20j439v8rd64k5gbnz6smp874a0p7c7y8rrwyrfupl1hqkmp9eyntfjmjosgvpzlbsmce41cg8o3jj4zyj5aj8v6wqaexb6b4y5inkpvanaku3d6cj0sn41dzhjxyjjs42gbts5o0lidz6w',
                startAt: '2020-07-27 20:11:15',
                endAt: '2020-07-27 11:25:57',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'ux4i4095yfg4ubrv5dv31srxscjmn4jpm1vh4egypioqsfzwrv',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: '2hmzqrmxalgg7h57p1v5',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 16:57:19',
                executionMonitoringStartAt: '2020-07-27 11:31:37',
                executionMonitoringEndAt: '2020-07-27 19:29:30',
                status: 'COMPLETED',
                name: 'u12chustbp13ifzoe638q3avjwo36ljsb88liztwyn4tfz2aalgm7gd6bx61zhvvlyj304kxpv3c60m6f8cuaag8j15nf24zoxw03gdtbo7pu9i3fcqndbs8gqjl1rj2n5jvz6dyu0mn8kho4exat6w6rwn692pncvap1d6mipwahoatmawh9md8xp7w479e3x2pv8p0dkzj36g1y2nhbyqvflb2yi5bum1xjad7obg3cnq0kx6eyynsw9o7ybi',
                returnCode: 37460535325,
                node: 'eha5lrkjp8mrx5qdusgr47ksy3z2wq0sqtb86czz5slelqy6eqbvv9o68uanl2fc9gek9fugb8yy5r6n5tee4cgcqbx58unt0pj3d7cqhm3rsgg3ml3xovb336vgigef9lcqxk6f20fjqhgg281nrw7pg3nccesz',
                user: 'ofzbbuqqf991j9y6hxdbz6pst7n5yy8tvryyxhiub4iu9ru55iwx3p24d12o84bfdm3e9ou0p8y7o5318q08zuo5ks3vm2gixbd23r8695wnnwqrs0yuny4u014w1dpcmxzewst3lh0y9t723zzxo1o0xxgq5vu5frdr47kaia69s064ynn79tw2nm8g9xfy3u4mytejezb115m5h213catt9j8o1prfefo6qxyqxwkwno4kvzgb584c8c4jyz5',
                startAt: '2020-07-27 22:10:32',
                endAt: '2020-07-27 17:39:16',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'zq9hfn0v5zj63zstogx8xq8ljkuxbzm6636kymispusrnhu8fr',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'yvwfygh7w8yzw29k13qm',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:23:59',
                executionMonitoringStartAt: '2020-07-27 19:55:15',
                executionMonitoringEndAt: '2020-07-27 21:05:02',
                status: 'COMPLETED',
                name: 'pfnf47axn0hvu8moou8l7kchne97fp7s660952r28gj7qirsn9ljg47cekqs1rropfjdk4xfuobw7fgh1cec23op5cqhjsjkpsjv5imlxrrqgjrlivt2h3jvzeux59dkfj6cd35v1a7i8f6xifr11iwhyh6tv9bo80wpnqa5fwclaui8gu3w71aryi5ltn8p3a6o64ui6x8cgy00rnb5sscc60gt1w4jjd5e73gmc2corctm8uyphp0wwun533u',
                returnCode: 3555865244,
                node: 'mx6j0hicfnhzankaxln46iph73b3y6mmqbam5e0890lq3pdbfn45estinhu38s6418nshef6yw5y8os4fsc96oam1c5yhozvna3x339osx7ztkcduzmhv02noacoqfyf6j4n1wa5dbvf3xlvuc6epn5ck2mlsytq5',
                user: 'h0dsidvqdfpwgqfs6cmvdzpjpytbljpjbatasjm9z539o2nxzef935qps5ebvns9305p6ycfhafo5hoh8rw67x2g3zepv1rfwc7jzr2j0e7bfxtn1ieo9psk7zhsd6vdf4o5l2hbw1cmqa9itv3rc8d3vin9xh78ijr44k3n15opza577w4e4ggb602dbsso02sa1fcsofj1sb8c6ts1nbyxid1l21h90nutvfdlyvrkr31p9wzxpt7176gxr2c',
                startAt: '2020-07-28 10:57:44',
                endAt: '2020-07-27 16:31:46',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: '1e9ataonkg48wx1nb0r4f0h3l06ryqwq6xtqpy3bhetxx7y1nw',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'qtvemiu49tsxu0mqia4e',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:06:06',
                executionMonitoringStartAt: '2020-07-27 20:49:26',
                executionMonitoringEndAt: '2020-07-27 11:44:52',
                status: 'CANCELLED',
                name: 'gocsz2salyb1nuzx9uvew4q7jszkmcoqvlvs16pvoyrsmpfug90zzs5htwzpgyps1onk46jj3a92phljv5tugay1n9367ypck1ajm0rkvf2pqompn2ya89sa2h2kh59tvbghzp2rd9blkzqcxlx4yobpqmf39oknpqkpxhm34y9sl2lxzj5evg9w3as6cdktymvk6jrx80f6c5v2tgd3x5448j0g06fcm03d63rt0rvsio3fl6i673xatrupl4o',
                returnCode: 3838365277,
                node: '5hz27eih50bbddfycn1libxgntc7cbt8ui2qxwqru8bhcn9s2rb59hno5q4olqcq1lpi0cqjj8tgef4gkwpzrv3m7k59tsa8k9mt1na52sayv8yme9e5muwn5xiyccd4ixbw4wbezx8wpsakqro10d9casocoib6',
                user: 'zsws21swztw5jzlzt1vhxwyd2csgjd2xenulpkibu3urd0gvxliglgd5xtpe0qkww2xw0bgonyabgng3chup3ualzwivnmgtszbg7ylwetdqjfxn2yojp5pcsanc6zxwp4q2f4datk8u821urejioevdr3w9cw1ywvakk4ollyimfy9bk51bqea5wkc1y6dhdwp7xb8cqojvecp7mjg2ssrorjour4elee4nj9jt40gbfyvu0hjt3zzcowtrhyk0',
                startAt: '2020-07-27 22:45:45',
                endAt: '2020-07-27 16:25:53',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'cic1twyjbhod2fstcgzct9bav4cinq5jk873k9ml2dmsrpgzrj',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: '674rrx5ltba84t9ipuik',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 04:03:09',
                executionMonitoringStartAt: '2020-07-28 09:22:19',
                executionMonitoringEndAt: '2020-07-28 08:50:46',
                status: 'CANCELLED',
                name: '7pl93i6tmimhf4bmuv64uvvfjzvhculw5obk6ew7sbnmsmggzq0pcwxbgb5lfi1qmvqc5u8jzfdw69srfzj3et8oaf9ccyiwb18syrksqukvq22ra4x2o35gw6nngy2z56x5mjewazee6tngido3boy9ru7j82aop4b0fqspf2cb6rebj188ewe7slkcvqbq5jqj0l1cjaa3y2sk9hnxcgayntwetwjl7041l05gavpvfwejnpewp90r2596ych',
                returnCode: 100.10,
                node: 'vl6z9dwtml24ijo7uisrka5qioydkymyg773khd8uwukhoy9rd7biv1cykr0p90buxb4z2j14dlghlkym5fg4wdv25ewzv4qfgrkngejc3b7s3temo1j7vm1x1c6oe7wekzl7jrmucv002649ycsqedegm55brzs',
                user: 'ihntkini3m1xq9p0k4khffvh8ztorxsu0txwbofb9z4hdm3yu6o70pvu2q3e05239qrm5bp8s1vphgme4w4gs6r7ejrkmmpasl5107kvi0pewocvpif06ek123btvkrq20rqz49t2zhx4oahcorqpvq8e48pfqgqgvo7xymzmzg6u06i1epfgk5rqt9rkexwjb2qzpfw2j9d3d65u6erlfjk68kksa420jj62g83yuo9tzk568i38fdllnosb60',
                startAt: '2020-07-28 01:49:42',
                endAt: '2020-07-28 06:56:29',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'qce7qt1gcbew8w70eixhh5izor4zvsa4i3nk4x6t9dq3o2ugr3',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'wvzjioid0l8zq95nrbgo',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 10:45:41',
                executionMonitoringStartAt: '2020-07-28 05:06:52',
                executionMonitoringEndAt: '2020-07-28 02:18:49',
                status: 'COMPLETED',
                name: '2grk25np9l6vary0te2flmzr98hrhle39gwno5zxu2g2qy5i773ut3g355toaqc7mrd895kjvhegc7z4y9o1yzfcmd9u341k5i7qn4716shimwff6ccyfxbiey5sv9wslyo8i0qrybcybxy4b6tdr0gux14hbhkuu90cln7cm14c60xhlc8c9slwnyls8k3jj8le1m1nxzhf88l748315xbf5ubz7w5ppotztgy2yxo8igpnneffgn7uzr8d6mw',
                returnCode: 8044806891,
                node: 'ypisd4kxwn0eyntfjx5p5pbj6q7rjzi08gqae1evwmjq3sb5b0cmx64jxiduubw4gpfu8n0mrxehdrd2gqjboa8hkzl09ch1hi1k0ixoxpmcg7m8njmy03zqfgbsgshfah4xy5wt5l5alpulutg2v356dh3us8lz',
                user: 'vk193eizxz5czun28hp6xx9s3r00tykb7tr4niuw8nudx6zcvjpddq6zkzuqbhzcbkvyq2sl1tgm5nqs9nw1mwoatvdd8h2s6pd5o3qf2oo66iw5cejg5ny2i13z5jl1u54xnfadjiqiofc1uesuhjd0gnof7pmnrvq74688oazoi2u1b3s6sockffdclqb2it5z4akd8ofsf9s1e0fpezj8u8n1675s3xma4svmsawks0re03mprjx95bqr0m4',
                startAt: '2020-07-27 19:05:42',
                endAt: '2020-07-27 17:10:11',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: '8jz7v4d791jw177a1612ptqw53m14uwdn85eyccyzo37yxb4cn',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'ld9vkat21a2flof2jh04',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 10:34:02',
                executionMonitoringStartAt: '2020-07-28 08:24:19',
                executionMonitoringEndAt: '2020-07-28 05:11:03',
                status: 'XXXX',
                name: '1oe9rgsu6cmooz14jqg6tcxgwrhim10j4v1r92idjorcacge0e6qldbmspggmyrw7a5jfd2gjwvjrb9oaxmadxlr0d1w81sedj5uoktm2zyhzkx3jhf9yamlol3sh1jjt1nknv607byc2deayqdbszejcmsffzcqxqyisjh38ccrtfaimr1a8dqdv5j0bb0bvdkct5nsrwui92y8nbjufcanbvqe3ka34m9puyp6rtyyscczjocnzc9582lbc66',
                returnCode: 2173814781,
                node: 'vcvbxf8cgvolg1bum2e76ec6n6w6iuby782bccsutblqqwnh0bnnnhmbsmrg53vy8mgxknqmnv3fiqxo4um4fmy9npzrp8rd74g3ls86ye9pjd5n4wtx6q7so2ejdkppahd5g7hdv646l37svmgbs7zxwce6imn5',
                user: 'ciqnvrvuacskvioadqm5ix1fcwpthijv1a5l3mkpua4wd783t2s4titl467hudt4mi70zc55apkekru09lody49m3009rbwmb5hg1280996j6i0abw4ikdsgvgol6liktoo6u46365wpcg3oi22tyoc7m940juc7h12zcborcxn6rpi6djh0fqk63gdkc2mm97fnzwppnxl75j52smchmqtlvik6ztp0x815jtury74psd051yc077mkm8fsa7h',
                startAt: '2020-07-28 09:14:36',
                endAt: '2020-07-27 20:13:50',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: '5g0o3dmjfyctpqmt89c5rr20rzwq0tql1tf796dnh0hdtlg5h7',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'fdo7m31q652r1xor9lkn',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-28 00:41:32',
                executionMonitoringEndAt: '2020-07-28 00:54:01',
                status: 'ERROR',
                name: 'h8nf7hmksnnuol7ktq5trzlml2qkp5020idcyp9hs34m8dt82m09rrt0dj7vwpwsx2flcu1kysujfgzsnz6tehdfzckd4o6et4ix6r2b7a5yqidp45qa39guw870z0x9jyd214gjp5qblhv2np6p9pt4sektzhj45aiyl48qzkd0hyrknf868ktgaulxc8ycwg52owxir1v4njtcn8mivz4brlp0fx3mpcmqek3c4h4k2ze4l3wvicuyg31eh4i',
                returnCode: 7683382345,
                node: 'mxws8cg2wfjp20qze81smyelzg9kk1nr9r2p3onvvv9kwflzh1u94tppk757nickhhz84k3v1mhsrv14j4t75uex0omilsbj6b5er9pnhb232xpiz9aozfa4a8k7plfzvfi4gjr53cpdaxnz18luxqsljr2pdh4u',
                user: 'e2ffrtag9dhlhlzfwcw17tf99nucfd3ghtch293926hu7esnhupwebeh9v9bbq0s9vrxbl5svbu1z4w4m54ch8008zwouoo1z1da6fyxxkqbnjlc9z5nqo55jdbkpxybc7dqcf1277hq9ifobpjjyf9vxqw0owf2ftscttdk48ogc4mr6605ml5wdcreodqmmi7zddvr1p5flkqitxmfgfh51eol5hpdknt891gndcpy615nz5f1036d27jkbd8',
                startAt: '2020-07-27 13:10:37',
                endAt: '2020-07-27 17:52:10',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: '8x77f4tx87csm0rgiguultizlb6m44sqinmdj7hs61kxlrvp0s',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'syu3krk4iurxojllgh4y',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 09:44:35',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-28 04:55:38',
                status: 'COMPLETED',
                name: '4fc8n0it4vkq8rnzj5x1vlqfqxy54sl0gujskc8ak2rmojns4r8vzul3nyjk71cyp5i6pxunwznwo1s8zgvnc4zw1f3sa451ry6xzqkj8gk95isezb8tgxl6sia6ucbqxf15b7m3d7687i66g63dzk105lqhk9nyckivvmgwsjjocreh5vrbyng2ofiagrgpu3gf3fhbi109i5g5a7zlk8p253u4pc67z5l91amuk9opg5vqoy7v5x5jhk61855',
                returnCode: 9366019802,
                node: 'qo8t0axj9e11q7r9b6a7f5d1w61c7oeryz8bak57i60kfclb7tc7s7u2ut3snkdo7n6msv7koo2xif96zxmf585h2vkk0wcamp7lm3uoo4en8odsnebvum0x9ax4vbuudm00lhmszh9nj2faehzbqot7320px3sl',
                user: '7yk2baguwe7vvhd83wgcum5xughadcod245kucc4snsm4lpgytha7ahhu9iaxehdu3w611mq6h0diyw5t0z94sh8opx88ob4dhxgknjqo6yp8h3kxjoyanemrhrw73w5usyzeyzab1zr9eqcmj9poe04x3bddm7082nhfd13lj453mk8am3hfypet3c8nh7hmrl5rpt4luw73r03tyc0mcahgkvqkqj2rwxf9m8b4rpp05q7xqq0ymz9aq89uck',
                startAt: '2020-07-27 14:47:53',
                endAt: '2020-07-27 20:47:02',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'asdakqbx2zoescpuwc67c4cr516j5awjjdcsdzpoj4uba6p52r',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'u20pnhg4x00gi47687b4',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:14:18',
                executionMonitoringStartAt: '2020-07-27 23:15:11',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                name: 'xp2l6qqllskst0c8isdw313nhhf76sp9o0j91zipy28l9df3ph3ut9ogrjfi3mpbjqw0i5owu0v7w7rdrowwcj6e1jefbp6hkm7sfnenisdjj6g1nume3oigt4mbdzdm37u409j0kkjlmikm7phfes6oiic57wo131afx21uwu97kygfvcvmjlyx12tkcznzdw6ke3ifx9khha73aqld2n68a8ojb6jtrp8t4l9nqz612whlygu1bsc7mm8is2l',
                returnCode: 6499493118,
                node: 'oj1unkujri9ektb6rwb1ybs0fq85f8e29ar912v7doelnjz1vbv4kriw03d1ka83if200x7u78o0od8k7f68z1ovn47emyv489g4l2unw86mxob1rqirnkb4i87de5f9ttb664he26gkqz6n0oolxc08ln9pso3e',
                user: 'cqujamxg1s8z4u0fins15g6j23ketbny4b344oy9gzo6o131jsc3cwhg37aam2p6ukv7wr9862ub7ppk93ya2vjiz0jul6zkqwit60c5j7oieh5fvt64xkoc0lh9e517otn2dyirmk9x9wcqja9uuae2mc70oeoq869gn6c55ad34iubi2zbq1srzst10sqxux1xw3xxu6tr7wtzxesak5ffudtmnrxky3i5i3ef0mm860qsj75l6qbpbzngyh1',
                startAt: '2020-07-28 06:50:04',
                endAt: '2020-07-27 23:42:02',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'r79xhqorkjimi5iuncjaq7tyxj1804kne3l002cdxkjr65vvnr',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'uo276gnq6zf29yad4vis',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 21:57:38',
                executionMonitoringStartAt: '2020-07-27 16:31:36',
                executionMonitoringEndAt: '2020-07-27 23:37:45',
                status: 'ERROR',
                name: 'cdk835qo1kyc12t39domouxg2tjaefsiu947p71e06gzwke3ejrb1zmvofig8o0tumxl9tuw143w7tcuvb2hlkzbesf0wql2jpuxfre4aw1eov4il2xwstaqpwh9pyvs9qdg96p46q313192c0bgthc55xmw22kzqdv70yl3k7mr5zqxnnotzk6vwgwkuw5pz8hzxx9vs450ikv87h9ztfoxi4rmcpx1jmfr70c4iigjfcf6w0h47p1ye0412ea',
                returnCode: 5126853840,
                node: 'twnp4tcbtl1fagimwcbz89zjr239kbl3aaq2u3je5qn3x3mfxozaz23mdnnexaj975ggcm8lvkou1ts5nyaoghjdvo66tvswrwdebne6uxqyy3zwtl8eo43qbe5kwi86n67gowi52gw16sfj7hgqm506rvjmizba',
                user: 'a8textp6voavxtaavumqypwbr635mz2nwtog6a3diiuwpsp151vb2wx1l0t08nrbg1xv5wsjkkjuza3xkx3eb1z0zkapdifiqqhl87a8vmkhe1o3wdd8hy0y9ghfhk28praku45vb2pozwtjfg93ri15zcwvu254sbmsdc4hn0f6dqijibv5sfiri6j33v7aopiu53wkwpoejf5y2ela8rvwa7oxihgob745543ng22vmtfftg661clgpy1xcdr',
                startAt: 'XXXXXXXX',
                endAt: '2020-07-28 02:49:07',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: 'z0k824cu304t4kwt3813xft7cuhag888rkaxrv7o3x1w2liyk8',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'c5kclb1nplogf1lf2hlu',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 02:24:08',
                executionMonitoringStartAt: '2020-07-28 08:25:36',
                executionMonitoringEndAt: '2020-07-27 23:33:13',
                status: 'COMPLETED',
                name: 'e8bvkcfyx08xfgngp4m53jsfjf26wr9qltkrx6vudiwp59sj89as5edyx7yr5o3nr7eqyxk9ym55op550qo9mzr5s4lvkptwtw4ijkrvosi38wu0zte8gxaru35ph03aap05pbiaj8p4end957k0ei0xyddj49x32npr0p1tr78imtpj3c3kz1hav0tqazxbm6udfun2sjth9kk2b7r90gfouhm6p33y3ueffwqhedilkzkehekunz62jmv07hf',
                returnCode: 7774964358,
                node: 'm99sahxh5d0ohlar3e6bg763yw7ruokcppwmsh2lvove69tgh83ne0b78gqbmd672jp61bpn3nc6uqwvuixat4j7pf0xs60oa4pj05lx78oohg6qk4bsnt9135unw77isbld9jlrxuyx7ho97hz55ij00sors16x',
                user: 'x6qafn0jqxtl0y8omj1aje3pzr4q89oamw9868bpu4k1vcsrs6p54t8tpp6mc0p962vs9jqtijthmyy6ymtadk85rt28nd694kz7cdcuqw7qsprorybgkaqx63vw78owhiab3v7mlm8t6hyf1yu4sv3dlhvbda489jqidh580gfnpeyyu7qa5ts4hq2t9xtd88w41e5otywhujv48k5l9ovh9xjw193rre4r10nrigs1uro0s23ahxjo82ekwh1',
                startAt: '2020-07-27 13:38:58',
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
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: '7jdy7lfyiu3j9sx9ptbukt5yamk6rtje0al9nyc7h2h0pjdghf',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: 'mxsvtk27k3xad6da2dn9',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:16:09',
                executionMonitoringStartAt: '2020-07-27 17:30:51',
                executionMonitoringEndAt: '2020-07-27 23:35:58',
                status: 'CANCELLED',
                name: '7hb9tsl9pwwmi7drxdw7z8thlpz6sfikza0rbncw8y3rhp9y8kpbla0ex7o8yogb9cg7wi484m2p9ati8bgjr7zy25px3wf491o3zkzgrot6ic0zad6jj23w8czopwrobp7eydmgr5b4eolbk7iw4p3ep1wjgh00fktj5vo57fds724ok27nthc81k5jr8l7vxb26u020duzaceptq11z26p0z4egrvqldhvpb83lyyn4seowvv9qisxro6a3ui',
                returnCode: 6132003673,
                node: '3x7jvjl79psizgr4o2ntx37k222iqk86vltsth5yp1i0eotp95bgwd9m29yqozlbkd8e6lugz0wy3dn51o9kkpoz4xk1q2rtcvnaayw38o26u9hbv7mppzho5ugswys05hlnc9t96u9z5hgw3fvcbskfqvqbv26b',
                user: '2no0hxii7q02g3tk50zq0beqkinghod44khh68z8rki6zrwzgroof71fkx5cclga6w53ebhzo5bid9gj3ff8h39joa3596d1um7scui841ahs3wb9ucnhudyxbc9qm4q04yrcm23bqb7e2yxjilr002pxtl0yfkz0gnt5tyt2vjwvyjxpyncp8pbkmrrer7kck8qxmro9lwfy7hvnv27uv0flim5w3aws2u0zwfm4m6l75qvkl64auncz8sxzkp',
                startAt: '2020-07-27 17:13:22',
                endAt: '2020-07-28 06:48:59',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : 'b3dc3df4-87df-4d86-865e-7f685a93814e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b3dc3df4-87df-4d86-865e-7f685a93814e'));
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/b3dc3df4-87df-4d86-865e-7f685a93814e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b3dc3df4-87df-4d86-865e-7f685a93814e'));
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
                
                id: '670f2723-6a11-4355-843d-25b67fcaddf5',
                tenantId: '39a128e3-7c12-4d40-8e81-e37e3e6c2c1d',
                tenantCode: '27ahrca8eww7arahlmw7t6vrh4xh7dq5qy5el59cb1s9q3cm7f',
                systemId: '5d089839-958b-4f6e-a8d1-36413435f139',
                systemName: 'cti6dlmiid9sp3dkjq2d',
                executionId: '1e6e4a87-7f2f-447e-9128-1c894cce8fb8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 03:29:01',
                executionMonitoringStartAt: '2020-07-28 00:05:36',
                executionMonitoringEndAt: '2020-07-28 05:59:43',
                status: 'COMPLETED',
                name: 'qb8m3w8gvtyo9ql4prteijbjxeqtj4kw7r6sqqgxnb6tnb9sk5qvcy7kpzqcbptj7t9pwk4e2qeo7cxm5x4dzhimdg6d5c95h1a0y6bebjladcqa7fw8xzernhatjxj47pi2f1825yqzv2rklj419yh2vwivqw5vlay65w6uekq6zwkjbt18y8dw27j6slx7tt8p0mayhcjwfd2ffu25epjff8nz02po0b7yk0ni76ys7auu9z8zh2ig9rmxuj0',
                returnCode: 2468146162,
                node: 'rsw4lmoi9svdwo5ogjg300kh3x9dn9dq2z0k1qeonxyeiplycyvrk5xw5pu0r44smkwas5tvfl35ekxtl564uqrzjmwra4kzm5lo6ybmd7633x29istut6b33fg3n5c0dcb7tem222n4cr3eb822autgyybodddz',
                user: 'iu5x3rcimw8xyhr0w3bi5amlm9xi9o9xcmgau2kckuvh1rc16jwldtyrpv2kupmhp3e7xjax8chf48sz9sk35vf73txpqngqnf5v5lbuc858izbqe7h0hyx8oxeno7pzwosgyg7bza7klyo5u4got1omv1gkuxath6g2bhjgpt2v5wjj3dkiqkhegnujb3hzk8j22plr7lwsrktbxg7gc0dz2emh7ql4wnpzvpr8vwe5mfk0y3h9xsqyb25cam1',
                startAt: '2020-07-27 19:32:09',
                endAt: '2020-07-28 05:47:18',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                tenantCode: '9k6toduakre1c0thrsssqniz63m6l8vnk7kx2mgw06sel0v7o7',
                systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                systemName: '1v0jzpgffah2a94ts3tx',
                executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 06:56:37',
                executionMonitoringStartAt: '2020-07-27 16:17:35',
                executionMonitoringEndAt: '2020-07-27 21:58:40',
                status: 'CANCELLED',
                name: 'qfeav8irygbeh1hvnu5bm5bs8917c5ztqww2u8mg1ye648qfs2nsugvexhby49yxuig3u7uu3h2aoc4b09c5v0yyn7gzeycv9xmagbucmh2h6kga8h221bne1eoaqlc2j8cc1rp1eo7hjhkstz0bv1t0v7ndeuxmxq8tl1hqdkqya532x5bw1lswlov6is51cc3fcl5ubr6uvc27oar624udw970pi42r9yjh4359u10kf02gn313dnwut4avp3',
                returnCode: 6774010673,
                node: 'ci3k4qg798klm44sd5ma2w5pw7b7l5ir5rjtk4j5limcw5rwxm33hb3q9pcn833aalz0bq4r9c1d1oeahq5o33p0l0pmp5jycnbk5jkbon9tlmjukcgfht4ixejtrsg2f1u1pfi8fqus9j9c58uct8ibk6dti0zw',
                user: '7chw121qx609yxn9sm8mzsdrh9cwqkjutzca4vvcbg0wars4kkwqe7xsni62gnx9lilkf4n5qf3kp0c03tag73wyntx166n1fs2w0atnidob2nmttgn8lmpiwu3277gl3siq7c32vqtu25wddnckovzkfxodwdx4883d9l4a16jiy2jdg4mp8x856oepe6w0e5g4bm21d57x15s12dftmavpxkyvgt6493790z6qlguf80z8wp3o5ajlhessksn',
                startAt: '2020-07-27 15:42:23',
                endAt: '2020-07-27 14:28:24',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b3dc3df4-87df-4d86-865e-7f685a93814e'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/b3dc3df4-87df-4d86-865e-7f685a93814e')
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
                        id: '455eb12b-7083-4fbf-ac78-abac4ba566a2',
                        tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                        tenantCode: 'saqeejruh6zzu86ghvr6j856ctv78ag586lfw5zrj4x505sii8',
                        systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                        systemName: '2i0dm8w2n2m0avmywacd',
                        executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 15:43:33',
                        executionMonitoringStartAt: '2020-07-27 14:06:50',
                        executionMonitoringEndAt: '2020-07-28 00:20:34',
                        status: 'CANCELLED',
                        name: 'hsl1y205x2nmbxcyfests0z1x6c1b77ind2ot737yz4pqfqfldxkvcsfreblidko276bufk59p4h1llzj1at9hbx6wb2npgc1db3x3ta0f5aw2z3t2n08c7xoftvdpnxidiegusog8qjm6n2i1sc4lku31l4u67boc6e1k0155j70n36bip9tev4idmwn5lu8gwj9ny45ogjdvid9yua90aao3v3y7r8gcu620eyz0gcq8by8pjzraqn1s9adqx',
                        returnCode: 8862180754,
                        node: 'qjka0i7wq3ipr0q7uxoq7djlweozrsxdgldfcdi78u60jg2c7edb48j48d1w0kef3xio7jypim607ymklbhwwbtjbqrsbq9n97ngnpiouslnx2czcbkqyvsid5umd61tjy3i4xqjbqtsfgcfaohfzvuxw909d991',
                        user: 'y60mbl2pjoy6fetua0acmaquh42xiunmzdv1ddmpx6duw9im2fssvttu48kthrbyb1ud4729mwxe1y9030wtizyn4mmjwqjvhi5dqoerv317htemtdvhluctm8czrfnn9bh1ioubozai67hg64tb0oxezpc88ah6t12g2b642ux8whvmxvsnoz0lqhwosik0lasxe1mehexrsvofdrh67mgb5yqh1pg74vir72s0vr7gc1x332elcfssuhd2miq',
                        startAt: '2020-07-28 05:39:45',
                        endAt: '2020-07-27 15:53:18',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '455eb12b-7083-4fbf-ac78-abac4ba566a2');
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
                            value   : 'b3dc3df4-87df-4d86-865e-7f685a93814e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('b3dc3df4-87df-4d86-865e-7f685a93814e');
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
                    id: 'b3dc3df4-87df-4d86-865e-7f685a93814e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('b3dc3df4-87df-4d86-865e-7f685a93814e');
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
                        
                        id: '43822cf4-6737-47c0-9fca-8b5f19742083',
                        tenantId: 'b3b75ec5-548d-440f-b71a-c15591254700',
                        tenantCode: 'kq227ozqrtczkssh1yg3rrfu2vdse3mttitwlgsagdxippaptt',
                        systemId: '6563372f-3f32-4ced-9c19-e65df1824c59',
                        systemName: 'lh77mzs017qxo1m6mli3',
                        executionId: 'c768be20-d22f-4c36-b1b4-a4465b7d8d14',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 18:43:05',
                        executionMonitoringStartAt: '2020-07-27 17:12:41',
                        executionMonitoringEndAt: '2020-07-28 09:32:32',
                        status: 'CANCELLED',
                        name: '3tgni9wr7xrfttexjboxpwb0ls8uuzfabgqf3roszlvr3gbpjt9ato0nfymvf7p4z3lbfhgcvgwvd0k343haw5yhe384og2swzrfs9alcwvlkc86rn0eg5ambgqrqfwee1p7gnpv9hz1kq402lmrdwnfjg633gy21kh71y6wxgfsq3ac7oqvo6yvklgxgqq4jb7a0k8966kau2rj7pq78cx80zd1osb55jjfr7f1f8gzttl2woz25vfisgusr1x',
                        returnCode: 6976343135,
                        node: 'doht6e9eupn0xgjch312titi8n4oz3t3uqwn3q7ulifk1fh9gn2bt32o4td3xn4ezsyxbq5yuiq24yebqu4q1ok9s5kz91zvnr8kpmxy31xr6twsasi2g03dndneagmvnnapqvzq1ka9r0h9y70t5vaadghlh5wh',
                        user: 'k57ljv2q6msksf1drhmaz7q2vf8n5dya5gy7zdh7ybh2srjkj4s45cgvuqv8m1gk5sgf61g35m7a50tiixmd3g2gpj38v1jnylm0whalmuak2s1mqgwqpwrmyn4o2nk9t0ec7njq0p30a0iemh1not9xl8tno9yhqeid6cpdaplw1bq3zgw19o4l7le6hdi6klkahepadkpbdoujk8d62x89vcmiok2wfr8iz1jcikhwh4xvlm0s0ue6no3a48b',
                        startAt: '2020-07-28 10:46:01',
                        endAt: '2020-07-27 13:14:55',
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
                        
                        id: 'b3dc3df4-87df-4d86-865e-7f685a93814e',
                        tenantId: '85e435d1-fd09-4add-8ff0-3f474bd43568',
                        tenantCode: 'rw315kxxbdlnyss79jyohkxt43z6z57jkx3hi2xyxfq1zq3gwv',
                        systemId: 'c06bb8b3-38e9-4c8f-a614-9a525eca3187',
                        systemName: 'wfyc68x9ya697o95n66l',
                        executionId: '2547a432-7b81-4764-a0bc-72e0944a1c72',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 19:41:03',
                        executionMonitoringStartAt: '2020-07-27 14:41:37',
                        executionMonitoringEndAt: '2020-07-28 06:16:12',
                        status: 'CANCELLED',
                        name: '4oo3r73z77z2ryzunkpg3w3spi8qufc55nir9899yvmjw669cii6a1hdqtrnfdn265qk2zj2t35ok8sdqjwt2rbgf7holc0gibtpjzoe8xbxd0yoh8h5x5fxy9zo5ck56n5ibnfjpj7dp1jq9tyatjsl3h3gmlmg4n4us16xrrpkuox7rs00dwmxgzi9cql33xucg39k1duksuoj4sj78iwlouy9hfw399cod31qfh69tm3sv2pfh1o8k1l0yqz',
                        returnCode: 7818643701,
                        node: 'h2h491us0yug345v4el1v4zn13xk3oxc56fgp59xefz8cresec4hs7034rbta652p0ulp3arxi521dku7z37bl0ei10kfhf42rxkc15d19rzbolkn9zewos775jgljb5i0ofl9uyoz956uqo93ejrzigyl7cgplq',
                        user: 'pfkdj1v43iypj2ebg7dv06642upqeftnl5yd42aro79wopoc05rbzv9frgd2kcd6s6niph4751ifvdd9sa21s13lzpku9mqn4674v8o6sdnb6a2fd4rcblvy8atrpi433w71dg9rv0zqh72tbwm66d9nyxs6bk70gcuvuyk63rygofw03h69snl0s2e15wzb4d9oaopdgxdyg4mq1gi93kb8n6w9cmbe21a3udyshpjg0rvutofwgxz54rnjepw',
                        startAt: '2020-07-27 11:56:12',
                        endAt: '2020-07-28 04:01:54',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('b3dc3df4-87df-4d86-865e-7f685a93814e');
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
                    id: 'b3dc3df4-87df-4d86-865e-7f685a93814e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('b3dc3df4-87df-4d86-865e-7f685a93814e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});