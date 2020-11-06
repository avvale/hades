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
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: '8v672bomtogkn3op6hvarz38pmp6849yrimfh5a7gqw9wh3xvi',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'wa9u9m7gctjkp9i0dmm8',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 17:04:06',
                executionMonitoringStartAt: '2020-11-06 07:30:40',
                executionMonitoringEndAt: '2020-11-05 14:13:58',
                status: 'COMPLETED',
                name: '8yyn0puirbq0saf03860tx9fer3ws3hkjx92jcx089svxc096qdqzil5gz4rn0fftatt2dia7jk6fa12r1n5fnwsj2a1vgvw12vdjh9od6i78gce5t1hncpwfeuvyloofxogfpez9fghlo5cpe2fsxoyqwkhff36f245wp8eevzt4gy1u0hu3t2aw6d9z9a5qkep5wwdb0a23loyol9rjhuii5gran4ytnmcuoorq1gs0ea3m4lqbcokn94qel7',
                returnCode: 6853083438,
                node: 'y2vo4xjjhzjqnt73wae7zzrmdp9b74xqmiwzvqemyefwxs9ucukg509nr0yqf3zwrvv70v9ihj5mrxgizgygcb1e7ekot4w0059ovlvqt03x4e2o2qzdb56ruuv4q5rz12245ovn6t7hlj7px77n5og7o8ahq9tb',
                user: 's9odblhtqlcxw236pg8oj9uufj3hi8jpt8jnsnl2cm6fhwx4pbblme7ikc7cul1uv6ga3fxsp60qpdq15ncfrtl3dzhemr9jqsszwxr521yqsdn5p8886a4h9yzk89gtohcqz1vi9bfzahpulow0ufdt06zntqzt24imch4srees9qi4vy0jnb576urp3xmnkyr06hmuz348lw9ncabtucdw6lmn0mv80ciardus8fndplqppm6sosh40qupkjk',
                startAt: '2020-11-05 20:17:36',
                endAt: '2020-11-06 08:29:58',
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
                
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'y68hpc8ikf7ibejhi5x3ir1nwdonslavb0vnpgxmba1034f1ge',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'yk0u8pd0exqqq9tw9prp',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 19:46:12',
                executionMonitoringStartAt: '2020-11-06 04:07:35',
                executionMonitoringEndAt: '2020-11-06 00:47:14',
                status: 'COMPLETED',
                name: 'ely3qjuqjt7iqa30n7ilwltwtiyzo7ze18l4jcb8fb07kb6virfcoluok048xm9ziu79fsxybgghhopbga24vd73axazt3dnni4i1miqszzrg416i0ndrl5agyx36mulh2vcfbry7ylvewji7bva0b7cgjbfvevpygqgvtq6a20u63rhuxx9lhruexbyc6hix81ofb73yz0kilb2t1f8qcfzly0r3hth10r78uq80fwmiue23b76lzb6kvfwcp5',
                returnCode: 1089858469,
                node: 'lj73ck4my2xwetcn19lgphmyp2iziku09r8kdj5hxy3qusxd5zealf0mgezak3jsuy1c4711q0b1si1eyvlhs8zm44e05awio67hg9i4n5eqdc1d5z7nnaz0cz9sstv5lokd2ouipt3us6cjt036h0dwbl57d1fp',
                user: 'ol7sh8qempx4mlk6s4wlq693yectfshgwnqiqmssrmqa7jc5neu7o7epg6brajxv7awwfjzrxgfsjn23inpvghx58ic2uyh5o3swhqekdpom9pbef95hvmm45do91itzwxzx6o4ghyua6hqw5lhtrefuruvvdw69dlaukscp9hlihvmty741lpmfon6mnh2mk2rs9y4dd0c0bnntcjybwvmw5x1rwzllmyod0ss1nj5n1uxxeio6x0a9loaqaak',
                startAt: '2020-11-05 22:33:01',
                endAt: '2020-11-06 05:18:14',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: null,
                tenantCode: '1rhdbozlbvxss2xskpk8ic94recr7eqml8iix5ovl82e7jr9x6',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'ya4n62dps14tffxb4b3h',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 03:07:12',
                executionMonitoringStartAt: '2020-11-05 16:04:40',
                executionMonitoringEndAt: '2020-11-05 23:46:53',
                status: 'CANCELLED',
                name: 'wotcu5z8js3aznzflqszcnrwu37gwh1n1fkouc9gavbd2c25on2x2iln58970dqt8dvne96oad12ymacvw3ueoy1rrzo29h0uuao0w4avv5hs5yp6uynzbr074fhh9x0nc7gwty6dvgghkyvk9ly1fmylid2h7q74qhdxfxkj23sfc6yow1s80yo1wh81mrafqyks8bvdzrr5f7q7vfqk1urcyx39ah1nq99mruuudknvvmtja9t88aimue2fj7',
                returnCode: 3114442187,
                node: 'fewsenr00c06u9rakzabk56v55ostoqi1826itu318dm8cm9t11yc90ii5jq3wpvh2zh8b3zim6vamcw7b5fx9fyarb4ia7z717sbx1fzwr6v29fhkg7gmc1f1t5y8rwa1e5gcu1muq7mwpbu958y53u8qwfqb6v',
                user: 'qtgbnsuk6zahugae1n7yqmia9v1j3r4l9a9f2te01lq45ds5o5260azf3yf0iv8xdy2i60e331i0l651g82u6hvthjalpqamkcc1fubwj3u3eg0qloixklvju72ug10qgo1y4zsiu0s6etp42ns0xxf0kjwyzero6kaj92ktit6n7uiyqxwd3fd0kkn2jtjmwq12kzco1mfzd5axiradrg5dzez5mz99m1xp1kpew1h923snf95aedx8c7yn90t',
                startAt: '2020-11-06 01:22:26',
                endAt: '2020-11-05 15:20:46',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                
                tenantCode: '09ox7s1vz3ncdehf5wqn8sg8sw1ywgb9bdcjd387insrs0noq6',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: '12sfewkyfjy52emre8vm',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 05:40:09',
                executionMonitoringStartAt: '2020-11-05 18:25:54',
                executionMonitoringEndAt: '2020-11-05 22:38:18',
                status: 'COMPLETED',
                name: '11mhljmbmef5cf3w3ghidvvf0atpiau864ig7my257zhk7jegq0c5d35vbap02e7ugjmjrre5q00t06q594t0ikk35mxyq7h9q861wv89gh0qgu4mszhixthnktanwfabbvq52swhwjfjdlm6gnzj8017vkm8fzua9bq6ilbrqprdu8bilqpa3bz363gf0i9yhairhtdcspu3prqzmlpxk2rzgan4nrbe0d8zij7d74b17vuzqkbwabu9n7uspd',
                returnCode: 5237904507,
                node: 'onrqrziiasa270475hmhd4ycaaxwi1pnbmtu8j6n7k8uo41swkl0boa2sirtqcawpzfzfge49nzy52uht76mmr2dlv19c3fv61sa1l6w6cleza9d1msxhy9bjp0jwrf2l8plgcjshcmlgronv4o8a8hqashjm4n3',
                user: 'rndbsaskt08v5369yxhprda390y3kwfhe3beipc9u3trgqqqfpnlg2d177rywyc5o8gt887q980kvsunt6ujxkq23cyromund88dpya3vzs8csenutzbc2uj1wvjwp9o0h7mtadwii8ahtxif5ppii94katu8grsrjmfwjkr4fsj1fioxsyr97ikaogjzt9bllu0dwrfp85py5uf2gqsg93bftidxyg9bdfh3fgtxw2pqei298vljnyb1hf9ybl',
                startAt: '2020-11-05 16:36:53',
                endAt: '2020-11-06 05:57:04',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: null,
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'zhucv5p59hshkcfdqxwd',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 21:32:30',
                executionMonitoringStartAt: '2020-11-05 12:13:43',
                executionMonitoringEndAt: '2020-11-06 07:18:08',
                status: 'ERROR',
                name: 'el18zhkul3d0kilir1okyzhybbc4ulrn8y2rmoawii9alm7xpbpy554v2v6tq8cxxkg12k1ott9wa1igead70wpcj2281tifkyud9q9yorna7n8zi66pmaz0d34i4qfauvupea56p50avez19km05n4z67r5nt42di7gmwbmnpazyebcq4sivhnfnlrpvl0eoizq19lqrd2n91dng4ys7a0akebqke91dvg6dnmfc6oc7ldkzithz2mj6h5ecu3',
                returnCode: 7571250809,
                node: 'w8bc77lpj3l9d243nbc5ept56epv95t8qabp52afe7hldgq3vsecdpbe8yzqs2vlich41uusm8qtjnnl7vmvjuegzetjmvc8b42hgb4j7bufnjr620wuun97wfh580me48257c8y5cevy49u0ic36wuwi03rzpr9',
                user: 'ksxp7hxzdh65bzupqtpmb5x7t4y4rg3x6vsczqnydnuqc9dd97htogedzpwruosdao4nxamxx5r2zxo1cozfxx1ovbeabqf1rsd3v579m9us95zbl7oz6zj41yu2hdm98t3b124jvpsc8r4jrfefmuwznsuklted7ag0kw12chyq76il0s9urg0ejzk0v64hqeweky37tpr09e04w66ivkt06ifsvlxl65nfwxt9j59j9wbqqnbses7uhx4855l',
                startAt: '2020-11-06 05:16:19',
                endAt: '2020-11-06 09:08:19',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: '1bss9qwigj1nkw462yjy',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 18:01:18',
                executionMonitoringStartAt: '2020-11-05 12:24:27',
                executionMonitoringEndAt: '2020-11-06 02:31:48',
                status: 'ERROR',
                name: '2q5by79n47qo074m0etj9lqbrkbhjnfwjtbhc74kf27ukllt8o6osmqr2hd5mpcz9isf7gowidi8zseo4zkwa9vzys6nhkd5tqdpec2j3vzmf43cw4p50gbyb6o3yokxoyjf4f3umti242e3jvqou9ekyo5wswqipvq92kd5d2iwb3jxo3af1oiyolmsm6zyfk9mnpejgza5jv9cf4cq7w96usk9lh92ahti6bla5ej06rt7btfe99sy8lstebw',
                returnCode: 4230343455,
                node: 'g5z0vzfy05sq5achp5iyoi412976ras1wrsem2t4e1bgmrmioxf15obi9g0jsk6xcy9chqgr8mniygjel2vlkevpvb3sorj3p5wqj5v426i0mdwfdzuo65yqx4l4r30tngfbl6kql81azxph40y5rx4e7eeb4wiu',
                user: '9ae9305nwn8562e5xmjsy7xqbda0az2uxt9dtl6v3p7qzf942v3jn7w5g57khvxqotctdog7se8u12aq6gc8ew05t4odro7ruz5kcpn2quefxwfmkipecr9r0r515nbtzk1ps3zmbe7fubckvddgg7grf9w881g7qcwhjzvoci7ydmpnslrkr30ke67faslm614s5r2tqxr4dt5sua2k6yd6053bxgjk91b5qr7jxbavo8oulf5i3ek5pvrplx3',
                startAt: '2020-11-05 15:43:50',
                endAt: '2020-11-06 02:19:25',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'ef2u0vjgfe1n25z1bro48aac24d9l2nybmufpe36hkv31mqeav',
                systemId: null,
                systemName: '3mbqz9bbjr2hxv06ry7s',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 10:00:51',
                executionMonitoringStartAt: '2020-11-05 21:12:27',
                executionMonitoringEndAt: '2020-11-06 09:31:57',
                status: 'ERROR',
                name: 'oiwjjdlaptw4u2loh1y3m74rf0g0bsdijeiyk8pq576p52gncorvksdhf4xa3flnj744i3ydd40x0v1bv1kz4r9hpjdmofc2dzcx7xs2f89u29sqwdf7mhckfv5t7qxjbu503k57rm2htgagc4nmp5mtfi71m05vdas6inv3igz94b1wavubwmkbr80nai63zwtwryuea2ibb8otocu81sakubg8ics106cmutbqjtkgnphagbjvv52m5t17yx1',
                returnCode: 6249068577,
                node: '3qeyi0ys0r45nwmmeasse21pc98o8hdjbopzbnz5d1qyz8j4yh3jimjndup1vbk4q016d0zv92gxyk0uypyzkju64fpxkxq3dccxu134iyzf5v97mmdcshnn5u08ulfn0yeqxgyq91lsf3f3p6nq8husrx60i5my',
                user: 'u7eurpshkm448vy8ubse5li90owumicb3z97htmclopwsu7x9d2vuaaixsnytdv7kz3uh37mp39ms5cz1qa7y5eexfvxr1r0c9b65u71uza37ela74nd6s5rvsby8lerd2p9ye1g6frj3ir8tkxwj6pgmqubqltwmcoda4muvtuuj3po17pe7z34ooqnnort4d2us16b8f7ytefoy3b7akx447x05qnv0zriaw3s19cdn1pdnelq4y65mssqa2e',
                startAt: '2020-11-05 15:55:55',
                endAt: '2020-11-05 21:20:08',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: '6wxddnr1pbd5tc8gtc5lv26r8xvqs37datdf8151h3y3mga6eb',
                
                systemName: 'vgp93yjgqsjck3rrm0bt',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 02:43:03',
                executionMonitoringStartAt: '2020-11-06 04:39:59',
                executionMonitoringEndAt: '2020-11-05 13:43:00',
                status: 'CANCELLED',
                name: 'cr0drtlknmmo6myx14ywck91lgwrrfxm3ug96ymsprvr9hyyny2vce3383m3p7r5atf2ranjdglfpnwalhwzgjgvatfaw0qwibcz3yf4thjqdg6dfvjaw48i4yf32i28pyk8sqphpiteakzerjz56c7zn6g68re5b9sl54agumpmthiroyftr099mib3alkxadk2apt8k70vomevr55an1fd050r5umf2ndqyvhj2uhzk2eaf2wk2hxgjflfu9b',
                returnCode: 5242758870,
                node: 'ohovgq5c6c3zulghuwxpz8ah4kpzkkkpendv6hgffa1yffrmuzh5f7mjzera5enizz9a2anuahxy8y1m7lps1em64jk11yb40l8mjx2icc20pmla4gbaxhcdka2qavc8y2ppoapkpn91u6qs0q0fmmhljggcvdlh',
                user: '9scmhoukyrpzvviezvj2taug1gv22xnaklbca9dn60jmx49dhx1fsbhzs30cu9wheq2sswityzf6v1tq0z47d4jfgzxovo48h1o0fr3oro3xd8zbxz66zs2a27cje82lkldw6q09dzhb7fg1s9wbcxdnnoy5e0tgqfslprkojykb0mczbm9jfujw2mslxllyk5s01zqfs9m4r2qzotxnkkk4okgndb9i46kxle1ezggvampnwg5pduh4h1d1wn8',
                startAt: '2020-11-05 15:16:23',
                endAt: '2020-11-06 09:30:32',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: '7qmxnbs81vpwfbyz91zsx0qq1vzu4q59luen1v7dwj51o41iaj',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: null,
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 01:36:39',
                executionMonitoringStartAt: '2020-11-05 15:06:02',
                executionMonitoringEndAt: '2020-11-06 04:56:50',
                status: 'CANCELLED',
                name: 'mzkpe5qr0fdmxntp1gwe0n1ewwqun7ug3glgci9okv7dc35jybmff1a9sw4prvkpdyzjpjucn4aryrnnl9venn5twyv9695604i71y7mauohm2bw4krvzeivktg1gd3u6phbi08jv720hj202msus9bptja29udtt56uo4noyvie7f544qgs7w6j5lspivm8mwwacp41dmshrq9iald12ggksxqs2o22zbc0b48uihf3xr3j610crrapvkt2s2c',
                returnCode: 9167603180,
                node: 'o3kivap94msmd8rv846qvvfz3ldu7z8ejg1tfciwftdspwrcw0olxxwzvhfn933yxu27pagylf6qhcdsvgyuhkc30nas6h0utf6jdqsiaisfbmrlajgfehoot8rjwpu2udyoo1reo6h72fd9nenwznf9fns8apwk',
                user: 'tuofb81n0oynmcrl2d40q5chrbhkykcp0p7bg04b3nbmfh2ldoqs1dgxpcubxnnp1b7kk2yindvs5txu727prk82avntro5h6o7b8w7srjlgbtcsqyapp543vrrff21pb5p3l9vvugfqint7vok0jtfzh2sf9jhtoaackphfgzo88ym860d9rtriaqf5lz0p9sdxqhwkpqqgkliadsxidqic2koias6xwoilqt2n88nvlmq05t3h63rywkknsbl',
                startAt: '2020-11-06 00:05:50',
                endAt: '2020-11-06 01:35:09',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'r964svtph7iyxi1klu73m9fufd9oe9wws2pt2k8m8ldap8squg',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 10:13:49',
                executionMonitoringStartAt: '2020-11-05 17:38:01',
                executionMonitoringEndAt: '2020-11-05 12:47:09',
                status: 'COMPLETED',
                name: '74psjs57b4qpi1nx36n06zbezip5oixm42z1pb11g5vlo5s3djq0x3qok7dhla2nngni0dcqqy3lilhad7xc19icfcuhvulqrq41fj5qxwt0nqy2x1rh7wmcp45sp6hpcge7qmeeesfisd6lw2unvvhrdutlz0qp7l5pmet4mmavt2s6i1wnaq69ohaw95aushgida7ziwbdccjv8rmu380yumaqx7jp19d8r0dvby00hiw0kmokwytfh1s5863',
                returnCode: 2300784008,
                node: '3qyoybdzy7fv05olc60xmxaxy2k6zmv8lrr1obacms7tnis26ujgwhz3dldnditr02xe6toxqtfdwyr0wjiiiavv053hwcmfrxh2mfc15gr7rj6upg5bju8d1k2ttofiafvtrnz4new76x7cf29o8x5vfmz3vcmy',
                user: '2akzcsmetvd81wgo5zf8k7uuq9hu8taf40hyx46oabz7dasv1pt92mym8stcqk0787o2s5v57ajrqwgl1r90ruqoaaitnzjmgfpamtfuyyao2waib4490muroi0054fxniov8cenvvw5yndx04ogfywylfa1q3nlxs4x1tfrhvcsbct41gpu6eg643gd7vqhtefbv4gm5i4hykr993hqnug2rbmsv27xyubshmjexxh1pt5ysb44ckfo9472n40',
                startAt: '2020-11-06 10:41:55',
                endAt: '2020-11-05 19:07:21',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: '8lu7f1pb2x1l3hnygaymmhudnufx93w48wezrc4rcfwe0zbl1t',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'befyj281gyhzp6e33665',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 21:58:04',
                executionMonitoringStartAt: '2020-11-05 21:12:33',
                executionMonitoringEndAt: '2020-11-06 02:17:11',
                status: 'ERROR',
                name: 'etr38g9buxwt6csz9hkx6r3txhw422duwpeome49tz7kb6lnp5ytey9jcf7wv9gs2nl3fhyqqxb9pyv0pgkpcbea8isi85k0w5tp494c13w2h4hfgv5j51kwjz02ssbtu4vgebj1g734xiabg12a0bnyg53yiadznb3rbbcqbqsppedghwg4cy2g7f1ozgbve2mjohma20qwzgg1z4ejipyeyozkg3c3qzibbsbsiakt725meo31i0le6rg3z4g',
                returnCode: 2319302087,
                node: 'd1q6gognh5ikposjgfhx8jrwme92f0hmy31v9gtyky7avq2sn6gfsc7lb8y5t3ij1gv7sn69g3kuvde7kzhm2vy6pgfdl6b08vikupqbzs24tzquvo2wfpsmhffj4sdxg5f1543clh1bzoncbax1ejlpzya4ebs5',
                user: 'bp7a3rc58yf9ntamiwrl3zvyf9nzbnol39foqu5cjep24i14e4zq5jyxvpxol7pd57kgd0mfi3mtqthsiittltwuohanjntfci05l17nvj3zxdhxj8q55ei2r3mw0y6wc1tn2vfm6zwzwc1wxt5o69e80xrnv7krszqnwv48pr02lph02mi0a5lo030oro0ih98aiy9818oddwx5wjfp6axss9qommm2rfsrkiwrqyz1vswc7j0u6mlzsse7646',
                startAt: '2020-11-05 16:24:23',
                endAt: '2020-11-05 19:34:39',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'v2st7npgiee3ykk19bsnsr7yvo2wm3xlii0kcqwak9zoz4dg2r',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'l3lqmdsh3bm2u36wrze0',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 09:25:22',
                executionMonitoringStartAt: '2020-11-06 03:38:15',
                executionMonitoringEndAt: '2020-11-05 17:24:20',
                status: 'COMPLETED',
                name: '9367ddmkk9ycs849e47bgl6lmn90yssrav3i5kowgksptpz09bsqkycoij7m1o8hhcm1cjq95bl9mcrjylaquz0hn1mboruf9r6tupaacb47d533fb4f14ewp9pbpsnm5gz6oy314p09lofnmagizkduv9wey7ytzqr2awtqdcjubk0wnpzpd65lfoopwd0z6lakctg75qbuvdi5pts1q91091llrmznhganabhhivx21yxkl8lpfcuj1etvysq',
                returnCode: 9268090804,
                node: 'glv2tvnpr9vygasnwggxpq47j6v8o2v92t3jss34xqu1103ug469hq09elkj25bmreqixs0qzzcoga9p30lhxgus67tlpp55viv484yuxkunaaxo5ahm5mse08njn0oe00en7lrapzwls8lcuvx6ykrupseixxxs',
                user: 'odjdfb3v6jpkws0ihwzff26byaden9bld5adwx4lbsfesojxbdb1fd92hr5ivsslw3km2tuerf5rlc4ggrqj1kqjpvjy1zxy82uexrtl40e9gcaow7ija9brqci6yazfa0symxut5q8kujw1fo3uoya1j3bgwypbri1cdy0gsahgj6lmy0tl3ds5z4vzpq0zja4a3d2lg1nsrdxuhyj8cx5ys4kvro2kywdollh63yw3oexjtjtqnrskkw726rf',
                startAt: '2020-11-06 01:21:53',
                endAt: '2020-11-06 04:59:22',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: '5bosfzb2cr3zeil56gi41obbymc0a981pom7g3kq07bynq82on',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'kxbq3vpaiknz8fu8xgyy',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: null,
                executionExecutedAt: '2020-11-05 16:35:52',
                executionMonitoringStartAt: '2020-11-05 23:34:24',
                executionMonitoringEndAt: '2020-11-06 02:10:02',
                status: 'ERROR',
                name: '6okgwektlixl8qgrwhqyk4x8itfd8do5sizqlyxw95r7y19iv6173icxz1ckkqvksbqc5rk7vujcmdhx0pm3g31u0ph7zk5d094bciwv6krbiszdnsvbwzf3w3lzbj85lck7q24i8jaorbvthwv67yw5nod68oybh13hs783nb47umpg2eadmvavk8fu223mkpvpp3wmbzbdua21367b4gwcwt4ik6v07g5hqem8psluuei1j2sznalhitmq3ma',
                returnCode: 7852050443,
                node: '5c03cwdevncacxts7otehzez20300o2bjpdtag9klb93k2kkkp7c827bkhbxcnxd0smu8pdugy0ol226hkhrcdr0dm7w53icidyf6mjvhtbe45842qmkbw0s9qeznb5up6zck1j2bky0x1f96d9n7duijqghmt01',
                user: 'p3k6xjakv6d1zw2qgmr3mh5ui7fow0msr695lyqi3oy2mtgihdx9bx7jh2n415kkiogs8u2fjfm97pm0httysrjbhwl1hmbnfmixbd97xicdjx9pfhkxnto4874cmgn4igqmu8r7u8i0i2e0ybbto76nkbxk5xhpgumedgmi93h6j8vfcic55mw0935h8y10a3x1tm0yqiviunmv7dzop1qorohlsuki6odl81t6s54b7z87k4esxi4ts0ooazn',
                startAt: '2020-11-05 12:20:31',
                endAt: '2020-11-06 03:26:46',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: '7x7q7yllgyvm46lrjmlhjqub8aqt5kwo3c064qdg0tb3v6a5tf',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'hq62itvniwd92cmr9jva',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                
                executionExecutedAt: '2020-11-05 14:15:30',
                executionMonitoringStartAt: '2020-11-05 18:09:54',
                executionMonitoringEndAt: '2020-11-06 07:46:25',
                status: 'ERROR',
                name: 'rwydv8zbm30olzpjhlp638izfpyq428495jjszteal1fxi2y8i7tz9cym1jtc99temfz8gd0o0q9n4jtrv9w3k9i129kio60egkxc2fc92rumjskqobq8j8u92p9krtz3qmv4j6kqhrgm2thpc7tu2pm08nlppe1awjpuh9fnp0x2f9q91yvixioh3vtpahkl77wkvh6pq6hwcisie8hnfd6qvwr6m144jaf0xwvu9hxajri5snxfaqym43nqt8',
                returnCode: 5558817900,
                node: '1uqr59i1ony6djufgggvv6168vkn94odj1drt90reboyvg07e7gjpol8ynxsu1mnjjrw15ofjhl9jenc0w9eoyd1e5vgjfj1e066t56mhh9qewdly6y0x9bl26m3dncxy3cnto5mb4vancmqyrn6asltjuz1qb9y',
                user: 'wyk3uk0d25cz88qevu6go8bfx22i293hm72jicbz96ggqr0elht6styhrqhktblq66omuogligzhxc1kl4xh9o2otun7q54nh18qigrvyl9ugai80ne242vqra1x9vscv744js0nifmlnzw1j2hzos8r806baesy97806ja3ijrha5cdsi9gihin2owd4dn1z1zpnn4g6zcop4xkbbz3qu39y53n1cj5b79ff4ws1wdktryfqshqke4ip35w1ff',
                startAt: '2020-11-06 08:22:15',
                endAt: '2020-11-05 21:44:46',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'jgb6ybflor9smstmwkc1uq8wk9bwzkhn2tnrdokdwtjxugbjw4',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'zq3n18u72xzafkhzvxmy',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-05 20:01:45',
                executionMonitoringEndAt: '2020-11-06 09:10:54',
                status: 'ERROR',
                name: '54umtp98bzet6sa4xl5l82bae7vxfxfu76xi46xn3qe8xowcf05zzspdej9t2zbewitl2f53qjkl5auo80imcv1rjtgdp4u4n6xb4vm82xxmk4wuj4tjabdc89sougpu79cmvznpy2ykvetwzx8ek999w5niiry6nxfkx18lyi59fwpsqvxqj66tolse3p12mf6m08e9q0c6thx9nxg6hgamlf0uck61rbm5w9vd8pbocoly9pvbq7gn7gzpn20',
                returnCode: 5531704654,
                node: 'y3d4ahxkqkueffedr0yxhp100vybucljb59la7rraefjvg8rutmn037c2lz3xf3ji7qszggrr9mm7yp0s16tpjeskrmics3445yoc7qquusdkc76yzq1aq1cefpjcbd96yjafygn1e3v94svlxwc6f9ak9zlcilw',
                user: '8r6ikavxonqvf0pifynulce0un0s74v99miwsuhvf9954q36eol5jtlxuribgxqpsr4578jvs0e4f1luqfbxehiv6s8qclellkypj48xz3357butym2i2b264slrexmoysoc80t9j2bcpf3u2tqs26aoztteh1r87ppxqxnu6f4asknqjd78sapwx926xequjx42abipyc0eu4apj9gg6bwxmlz7gd0vrjadhhk9k7irpgmo6vviaogzps649xl',
                startAt: '2020-11-06 01:49:30',
                endAt: '2020-11-05 17:38:21',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: '1jw3qihbaiaib3nbtba4ulft9wrdxpo6agc9jbjm0ufm9lzrz7',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'lzvsuhfdn8a1ehu9uv0y',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-11-06 02:07:16',
                executionMonitoringEndAt: '2020-11-06 01:40:37',
                status: 'ERROR',
                name: 'rfq3gqqukg58wauv5q8emjjq8ceto4knf2srs27zuc07exqtyy5okc7kb6hwuvm3xadny7v201quren4nkbt4uwwu7jcktkjcm9d2ps24jux3moede2lbvjxijwo3c0iybig1vomtqmxs8alzw2elhtvk4ovpigroqqprdk3c9iopsoeituyniypwfs0mwmc24hq7dtpm524b2lsr73kq834sjc474ipq2xrzcnudsr4kf8e4lz5ouv8d8friq5',
                returnCode: 1438998134,
                node: 'bwur7gvyyq29hwi6gqtd6mrqmtujtcxgn1lcxdj65b84t757q9aeklh8qu30n051wb0m77vjal4rna6pznhvyg9czpsmp0eek0tc16tu3fjljdc3d0odqrmw5g64ayq1911unontxgbp8ambb9j2zxb26kptyhp3',
                user: 'iy9o7rdxdg5lv8a9ut922oojjkrxggp0jo42ewj8jhah63min9iypnbciu3xgiwdgvn86ino177985giob8j2q3aw3m3vi5e4gupexi0thriin4me1n8152bw49ad3q33ggm22lxxe9bl3guq37ut52f2jkvt7quvnqu8vdcgcyj64cgyu94cfzp7y0unvq3d32pt3w1vet9pwdtoqf00rqcnu6k4zl3dd0d9q8essa5lf8oy95n0vvvce6elks',
                startAt: '2020-11-05 19:15:26',
                endAt: '2020-11-05 17:30:35',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'rrigl4hc7ftshhviyiq3u3zqghcip0j32ib97k7wxhcnl0iq4a',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'abavuf8jus6kz9jeitph',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 21:23:24',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-05 12:41:36',
                status: 'CANCELLED',
                name: 'ewm6ign6efyd069xuwu3434ydl8njqmvrodpg40pvr6y57qusa6bk475qssz9z68z7yywjpmayi0faay8r6sgku9l3e668euhjy8hikc08wylbbcw7g2wmiewbr1bxdbtjqglhu29k25ajohu60b2t3z203gpqq0tgebrzuhu41te99o4o6n02ubdvm4zxc6kkhvrw7z9k84zay4z0al4xosqrpve20s52hkh3ff9d41qsghyhqd5oj2j3xz247',
                returnCode: 7545977357,
                node: 'qh72lxezpd6ht4njd0hynh1dh7vj7mjdy5tu0dcmt5rf2mpxff4zmdmfjphkph9fhozysivtmbhcjjdgec2iy56qra7ie51ff61mjyvl7a0oyxihw6i6wg47a3xd2mxbxg2tehljlj2l40l4xtvax6pk09l0rxnj',
                user: 'j6e7ud6ril6qcca62xtqmflj2xgkf1yc0hmth8qajdfenxfujyid64e4mwkkc8p8v6po8m4mu3svtlto0cauuw35tsue11miamxp08vv567lblbrz9r7e9rb9qfrhediri96dqiulx7ulzbvke4iq3lvmc23r5mwwuxhjz6962l96at575658on7r09rctn54dlgnicx56vnowq5b09atyqlvwir9xqwr4tbfnamrterz9ncslb84t1o55xd07d',
                startAt: '2020-11-05 12:25:15',
                endAt: '2020-11-06 10:47:16',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'cyuxz3gfs0nmfrgvkdo33z9cwhyhznnnu60asqjh7t98nerj02',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'q4dj5q2kfzisk4rtm7aj',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 08:19:41',
                
                executionMonitoringEndAt: '2020-11-06 06:06:27',
                status: 'ERROR',
                name: 'qm0yemg2fsihnoswr0jv243s7i0vte1l5xvvec9e3qc1tkhck9mkj5kkvwa4cjom4tqpbpkqzwhp83rps8qf6jrm2um0rpir46vkniedxne429caekxbkcdjuq6i223iboaq5tw6whbg8pwe05ra3xsw1gpvjkawh86ny4pasu8m5ri4qhnwcsunyyaxhqb2natibdevw7bodccnfr0ugqhrvh36wy0czhsfcjkx6hvs24ht64mi6pu9qs7ljd7',
                returnCode: 8959013428,
                node: '4b29tajkeeckw0y33icx5baa81nagyt5ax2qbx1nhomwi3z7hz0hd73cp3zd05vyy199zhev65w9exqcnenpvxzrwgwgd61w88cpzlk3z36f5dgf0aobx2369953gimkata9rbt0wzcx9ngj3wzwp9u4lncr8w2h',
                user: '79wnani693oyuct2f914694e1h5pkbwropeqwl40g78yvm4z753waw5z946a50yx2g4likasm0wr9ny32kty63ik2kgje519zlvwitq74gtg4gl9hrpjqivvwi4aze849wmqykptwvzz4wwvdwmb1hjh3gr5lybcw1da04c1qd2ikt664al2oqtjruapjd3855izsug8mjubdz0yfor4hyr78u9likr2xor1f4zq0e6moohnt3hz79e5f38pt9z',
                startAt: '2020-11-05 15:29:17',
                endAt: '2020-11-06 01:54:31',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'r5nkicwg25dfz33bij4plgb7y1e6yzufqjo7aimltpbde97s5d',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: '8z4vxsgu20494jqnwkis',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 15:09:27',
                executionMonitoringStartAt: '2020-11-05 15:18:32',
                executionMonitoringEndAt: null,
                status: 'COMPLETED',
                name: 'qoz5c2b6q87nh8t1w38inggjz5nlspahxh9dnoehf77fawctcajr2ahqdt6ycn2ckjb8viknab0p6e7phv769668l4vvte7kx39g07zmn45qrfhno2u4kvrta1e95s4tnw6qhspwwitk4i4ele9juyca6doyfzttypvo50su3jh8uwki2oxqfzqinl53eu8q7ekuxdsa8kpg3zxzkgstmv2s50zvygbmst940uuy4z25lhpsjyv2e12btwlu1wt',
                returnCode: 9746315999,
                node: 'qcom5omim10554btm8u0r6cgvv9au0l3nkevi6xqb06gf1062mjieq8tnkphnk64lp3905giblas8g59ol4wwauoxcjcdg73d03znbhhvpnpsagtauccko2b7ynmgiwirsbkcvt9fmt1v0lt0ibimslxt6y0q0ll',
                user: 'k3tykkxydfp8gfepapgk29k2vgn7was0k06zzwbdsujgelqoq7xxb2ql2dttwf1pg9bis8rha33ohud53p7b9z2tocwdhaofq6qtq3rsos1d06mhhlz67nln1vnanab3vyrt7gun8jpb0l0bszrxalafrfjba9c3vdrgqrao6hrtmj5lbmmjbyxwqs4mxlyvh8wg7hrujgeux8xg5sllqqxs3xq9bn169z4ttehvt8uu862nw6oprs1qolc0o7z',
                startAt: '2020-11-05 20:29:38',
                endAt: '2020-11-06 03:13:39',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'mytxxllm3uyi4uvim2n5fu3ucsqpm50wn450up2rhe9gccophf',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: '4g5yrj9o65cabkj82cpy',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 22:36:08',
                executionMonitoringStartAt: '2020-11-06 00:48:47',
                
                status: 'COMPLETED',
                name: 'elnx5d6b32aq00s5hphjd436b2hnz4khz5f1jdxb6eqr71ldl5bu6dv0ehf2xfh1u1pwhbxepc7xs4oqv6oz16mohwtq1hhpt5acthz7756ebp3w38z2fmozi36310ycgdnc8xvl7r2fiqqqb2w3vaule2gntg5boconu2ocdvcivkr0x925x7kxenn0drhmgyb84fchekot4umcthbapkfsdkp72bpk2ga28fc4s5mzb34z0lk1qq6usxmz15e',
                returnCode: 6712203239,
                node: 'ls8x46ddqaxsxtdmy0be45xcs1f2hk5jpplhp00obzd8wedak8294mm9oivcd716c6cqm8wf2lcdcp9ejbkirze9rjvwtmc9a9j1vkc6l74pbsegfahyh6g9g7y9ejad6r74yb2caaxny1tthedyimk6dj6i4x3s',
                user: '8bbowv7tg3qdhnog3xttxvbwaa4ncnak6dncwnc5pn9zhndsz7wo3rwcp3998b6f4qwjf6r4ynqkqac7br2rfhop9sa0ojofzjv9ymr8lr26q3bg2gf3ueo6rodmiesf23wzj49y3ywqo0rdmm2ybcuw27ryuzvpmwd0l3tevukrihr9w7a9s576n0bnt0inletu7ygypc2n021kzsnmlr0vtj9cyy0gt2pcn09aq79xfzyjwbc19cif131z9pd',
                startAt: '2020-11-06 06:07:08',
                endAt: '2020-11-05 22:05:59',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'bhnnfp1pf1l7bh4dnp1ipps9yro08cd43czewc3feuidpipai9',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: '678sik45f19k3accv03q',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 01:41:12',
                executionMonitoringStartAt: '2020-11-05 21:06:10',
                executionMonitoringEndAt: '2020-11-06 10:19:37',
                status: null,
                name: 'doq95ry3l60g5bai7aekp7h5y0yrqhgt26rq1835msp8h0t9zu5hdebx7fx76q9zezo67nhnaxo3lqv6darzzdk287ft1c1957sdw2br5vsgt6x6wynjsmwdyp2rz3mi5il4xqq0lrrovh2tx427r40kys9rw6ujpllukxdm3xjgaohijg0seiibgpp8fyev6m15zmk0pi5bzyx9pg20tt78i7wvl8wre1e8gt0oax8xkhut77ux6518x9ykj79',
                returnCode: 7756322667,
                node: 'w2rxqj4239unbjsryonqa101mnua860yha4sza5slgk0bilr1rb2qohp89wakz2vo9hg8gra889gu2rbg9v43l9tfp1ti2wbj2ov6jz0umiurztzbv7cp70upzm8nhrrxbzm0ekwwwtjn9nrsp1spwh367y3g5rs',
                user: '2wzvlzy2e1is7is5nma392v9iipzyyydw96j2lyz9am2j3yxamtqcbb5tdapmhztp73mwnhg98to6inx7t0ou6fbabtz8uujc3xmum0dwkv6d82jizxf2ec3vmuwcorcgve1tu2abga8141tzw4bkfuc4l57lixl5sshyrsnjdss0qg3et5yh4erdsa302ee9lset13glx3lfmdwkl01scsf4u6170s5dxuqx0ma4qs8qz8q1xarocm8flxxdwy',
                startAt: '2020-11-05 14:18:52',
                endAt: '2020-11-06 03:06:53',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: '9cb7bnykbsuj0dcl9sc8iey0tl3rhhi08ycvvssb4w4wwch2ll',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'rho1kzpryakgb8ssd4ex',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 23:16:56',
                executionMonitoringStartAt: '2020-11-05 12:59:35',
                executionMonitoringEndAt: '2020-11-05 20:49:26',
                
                name: '7d3v56lz35rmpkae22opzukukdpfj2h4szghe2mtpx4emht0r1cg8xzu2p07mgdy58eie32jy0y846mf1u7mvu2pat964882qyrydicnq2muhcpzgw9rih2is2yq2xrhxuw3izraaf8zsfyxgxtou1qfg0wte40gq4cjjdrbdxdbu547jbb3z00hp7zkepma7ep6lqwjqpfv7at1egifleucf315p6kji6hxpdyoisupelhyk9f3ihps4sbpbm6',
                returnCode: 6015919890,
                node: 'l9cu3gqd6ybdoeudblb3ztys1seppbq5saue5s658cuk05ohkens2mu2zzrc6rksa14kxee3lqs77zqnx9beriv28l8gete6dq985snnh8x4xt4q2csgdx81gm3fvlyaohubq0jpdheugp092jmzrdbud96sgnkx',
                user: '2f3vws8y3cu8ap316fm3pzfta3rdrmc6qnfhh3ltier6qtt8jzfvq8gfm76kbp7rlok60tnr20wa6ndz2aqqcgsn7hw3pjd9ors1pppxmsacr2s2js9kw0q5xnc9n9p1hgj8d7u3x5rwrfigrcg8ooy3ivpof77zg3co2gjczcr124v8igtg2rejac6uvrho15cvn7eq6v5b4nwq9aa9hduqx4xwuvwipyf3rk981b0qwk1bqqimkhn2moo6chl',
                startAt: '2020-11-06 10:18:30',
                endAt: '2020-11-05 16:01:50',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'gp70b63ec83v72gvginrdidogsautut6il1fulsjvk7ajv7agd',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'ahgzletrtro1v0tq3rez',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 12:32:40',
                executionMonitoringStartAt: '2020-11-05 13:46:15',
                executionMonitoringEndAt: '2020-11-05 22:11:29',
                status: 'ERROR',
                name: 'fpip5bw47k5hj99mtwwshmv9d8bicdm5960fgdwglemoh4nu0mkivu6mt3vv22fsjdm2wmpls99jkppyqj87ec4th5tf0sin1emjga8xrtcbo1znp4u8xuuq5mwjmxo0fe9noyx17gl3m031050wwtmpfz0wuowd9gvbt82xlz6pnjzu6tv6b09kuo6bkkeds0lqv3htoxzfdqsf3swae93hslo8txzyh4jurjow7bq1v6frb4apa4dg4yn1jhy',
                returnCode: 1285492822,
                node: '121w82c42p8azh431q5ejl40kdod4fes6i8idahsra94znui1fhtrer4gvpv7fqin7uzs6buvf88nl8ryk4v5fvrrbqvz9dgjte264msl45zu9744zi29wrfkoz6jcds5wggnpsu5pfhp7x4ez8awg4h4nq2me1c',
                user: 'g419r8o8jye1gygh5sor1uxtwdfyzuxnfjksgrclxdqvjpsm7q6oy8kr75qauexchlltbmw6nn0fwas0gwbl4ot726kumnm28xl886u20twch4ovhsc0sqzxfu1si0cya446xhf58izagrq23exw64bljbvr93nyksedwnawbnk3dzky57q211dv37p0lohes65bn4pn8a8dnnuvjku8bn7tam5m97oscm9cgwqtsig58aowvztqsxarshhrix2',
                startAt: null,
                endAt: '2020-11-06 05:14:21',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'n3ojzj0si4n3qjo31m1nc119ri398qe7z0g7s18w0ak6ms8iuv',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: '9afxcuisgohpfsp0n6kq',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 08:58:25',
                executionMonitoringStartAt: '2020-11-06 03:16:38',
                executionMonitoringEndAt: '2020-11-05 22:00:31',
                status: 'ERROR',
                name: '15l5bhj1l9bdhv1gk316mfto718lz66wsm76ikxo43304oc4ns4t8b6gynmbpcw37vqniglj6xk8smn5c1k867ljb1sd6sv8j9nphc5la5q718dnlhdppr698cl85ss3s6clq2rr33q2le172830poaezova9j69nb2xi5fidel8hwmniww1keo1eucm6e7sy0pe2e8zae4bfyq93v21dftgh9ac7w7c5fymgfimmlvcnxntpv81a2urogc0we7',
                returnCode: 8817332844,
                node: 'x50gr482ndrvn0d7x7e9qa2pt3fm8584xxd09dz2t0lyn64wgm5tfirzcqlzj4p7dqkh6byk9d4tn1d5esbgjgv3gx4ri1kd31e8uoczrd0fr85qkdvan2cr6uxs10a8bvl3w7my8fkh6rppn11nr1unmbzu8qfa',
                user: 'hogkp0j54qgtolr6potyiud781kf01dxyoc3ip4owxv7u4prdpcs43en0q05b8gadcw3p8e8hnjc4flsa7a2wntv0if09fgld19u1g2ieeaicjid4x70sh2mgx9mx0mxuu7fkpgqufp1e9a7b0jfwfh3udvy4ri9i7qlxo48vfv9hwpjr6op292rjh6rzl93d7hpjo3ed50fgrg2uy5bispzqzu4nqaoua5ucp1880w78wruhdra5is60nuj5ay',
                
                endAt: '2020-11-05 23:19:53',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'tafbkygvlgyozkkyjkr1xbi4w72eirwqimokknbfmp8gjm54oe',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'uqp060l5g8cla3cj4966',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 18:10:32',
                executionMonitoringStartAt: '2020-11-05 15:16:29',
                executionMonitoringEndAt: '2020-11-06 06:52:12',
                status: 'ERROR',
                name: 'bwb4xzrx614jc7ny0jfm8jj4outuqjlxsipz7b7acu1dqwd9arcal790tqcwy3v8ad6lrtm8m3a1t83hwwxlgsuvewvsgpsdewixc7ipk3ft9lxnb5i4cysxvqve4j5fhtvbjjfb0td2rcny1dt0kjaav0kt1f8yg0hfydclbwovg0pxeeimneqnqogufz7c1nvbzu8ngjadf2tfafw3lx8ujs21zzpz1ub7ni6pujvjl8u2asrxz0uwap2t0gb',
                returnCode: 9208605228,
                node: 'k4n4yybgbybk9b3kx869dpay5xaxjd0kibaj7du84ghocoaj2thxmc0h0c2h5i4ifvhc5rmlcxtphwyqm56mkrcuff3i7u7e8kg0pnlarsrr2mtx7bxqyhhjjmy29nysgwz792rzbsoinvyei3gfjhl507t769py',
                user: 'j6a62ohlmxe3si4bf7mf25jyvawryg6ru1po4irvu7c8xlrvzhou7utzhe4zbx3v4t4hbyvr6sxvneoebneeayqcaovmk9hwukkur1lcsg76xg26jffqlyysi4t47jwj2760g110wgt485rkcjenq9l5j3bu7y9tb5exn8dohgmjvw3eajj2hy7ab2qa8eecw49zf55llbx5vvdsu3nwsyogyeyq9c3izr7tnguekziwxvwl6zq2ry5wet84tsh',
                startAt: '2020-11-05 23:22:43',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'wnwfp5nocbmovior34erh6b8hpchygkpaclvjjqi8z8m7sfoha',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'gqns41h2bnjrqqerdfyy',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 05:35:20',
                executionMonitoringStartAt: '2020-11-06 09:39:27',
                executionMonitoringEndAt: '2020-11-05 16:05:44',
                status: 'ERROR',
                name: 'xpjz2rfxeg8fn9hs2lsgx7xsaqwtdzg1h15gct0e4c0p14bjgh6p3z48qn4u71n6eaihsugxa8xbr89v71eii5s35ek21utas1vfra5yczm4vn0xbxing3ewe8cup9zs66kcndxfguw864hmmf9f0hbyqwg5edmno2xcbr8doc57gxnjpby3ziuw324ugrni3ch5n17g3ojow8qziakmh363fen8y53srdeknzkpqe7v93xrmnlen0dvfgrnza3',
                returnCode: 8434384629,
                node: 'm0pww72mssl7slbdlisyi6j3tpa624otd1229lvnepffiwvun2rcaw6k3klkfh9b8ik96cwqszmxxjtii5083x6jiztg38lvet0jdwdcrbl2rmrv93qv5er2pvmxv75xc07tqpwflfwlz8t05lxk5up5y9e76ak2',
                user: 'sa4kov79oujy555udl29i8ytzvs87rffh6onxglc3h123s7sx96ndbc1ktx7tcggvyigkuqdj73ws6090z4aendj4hf9halnlbrswq59qen34bkvo2j9c18byi06qw38v91o9q2e12mwmlpwy5pxwta3low0rzh3fzopq51krpeuucyrg52r83dp3mgkh3i3wpx8js9ou9bukkeziwpjlwntgi21fp3cv0m126emgygorzz4idnv21ou8flpdyp',
                startAt: '2020-11-06 01:01:53',
                
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
                id: 'hvqhquu644rr9w06yqpm1ajtc45u9b08bc8if',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'zfsdeiskrby6mtgllty15ocgj8k35qn7j7a9pna0c2ayd6wyos',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'wf5hyjyn4ous06zao3mw',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 06:12:32',
                executionMonitoringStartAt: '2020-11-06 02:05:26',
                executionMonitoringEndAt: '2020-11-06 05:30:37',
                status: 'COMPLETED',
                name: '1veemtjhxhc7xik7ihjsrt5urz4h31j6306y11fpaqdl0mncn1j9x9jkkc5xoc5e1cj9qk7heeztim564ryvuwtunfcfg7g3us3vp35rgp7yfzibhzph0htechxkdy77xg0ou6rwda9ig4wg7dsche68m79mez2xzqzqgg8xhlbvcb6ll9sdq2pf8btk94s52k33nj3j384h82glly5nzfwj3k55vpd99fkaad10t7awdghfr3ftx88kwt6bbwc',
                returnCode: 3459682218,
                node: '4k3zprp7x8m9k05hze9vhdsn81p96tahn1gymkxlv8pousnmm4rukh3ckt8h3os4p46sz8y9buxfxepfonnfa99ysjvhj9uqy7un7jyq7qtszh9fsyx1vfqg99k6wzevou3teffu7hmgosh7tfzi929cpk39g524',
                user: '9x46q1ggr1bh56bvj9xgtxbnpbekf71ugr9olwp8fnr3txl99diyms0jfe2oa44lngkafeo3nlu4j5nlpe3wfvtk94ixulcg8kr4krxkpg0dzue3sowkg8k3bg5vx5t9xu2nmnae2k3qcvi48gt77ffqgf2gaaiqvdv9n8ys67l46z8f9r2qal37dzg6qru9xer5gxz2oahtpyg6dl72b3eqbpt4b8j20qxlg9tlozh3hu972p8hqq2b5923b7l',
                startAt: '2020-11-06 08:14:46',
                endAt: '2020-11-06 03:15:37',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: 'd8tfg601rhtomfv66ycnlvynjpoxfyuwk6zjx',
                tenantCode: '0ubavfkg9xxq4ynopmzrnnjgjdksr5mtubprpxrup61zvdo6wy',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 't6ij033yhtxty9ymtbas',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 10:57:49',
                executionMonitoringStartAt: '2020-11-05 20:07:18',
                executionMonitoringEndAt: '2020-11-06 10:13:36',
                status: 'CANCELLED',
                name: '2ka5i87kksscrv485pk9f8azd1qhht0n2m0lztsfn9yr2gn7yybq1rtbzpe8mkfutuf3oan05uxcg5mata63jn2ifo3b34s1djtvp1j2li5um4fx96zjet3g4x3wo5nrjtnd4l2d9b8lbveyxxr2wzsbz0ahwphi06it98sp5ras0m4ng1se9i7je8b8uj55eqs2mg9m75tunxittg52cs6vl2dr8emjo4dnkop56tsz4yzqese9ohsf4y4qew8',
                returnCode: 7323959075,
                node: '22v76cybhv6mhve5f1i3hy9i7zxbvolo8r38zt2d0nip6zls15lqdpb7wpizga9xkju2ir17wjqhlhy15yf0d4k8430zca34t3aonz3kfzod6212t8qf7gxfrqw5jvxpkwdtjvb7ls3fpm95ypc5u4mk7zic17id',
                user: 'zt8119ivoq07wxop56suimny92u1r0q8uhxftbgxhy7fkrujrtkctwbh3mu2dryjx1uu7xmknz36srl29mjde1deen8uzj4o7coyibipk5bluwd8a1g3vxasz85ee6blajx32z5o71dv4pa3s8z5cupwhs9d6qkghn37elvlw3iorca56nfzidexpzrawzjb1tx88zsbhmyjrcig2i6tjqey72vw1pqjqmix58xnk6r4bz1v24anpy4miux2uxq',
                startAt: '2020-11-05 18:42:13',
                endAt: '2020-11-06 01:44:01',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: '9njgq1srhgy3w9y1b8kppg6aae2gde1kfekklzrgkdhp27v5hj',
                systemId: 'n4v7lct3y2hm8g44jilb9xhfh81twaesdx304',
                systemName: '2goputqiq2mhsnp8h2s6',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 00:34:21',
                executionMonitoringStartAt: '2020-11-06 08:17:14',
                executionMonitoringEndAt: '2020-11-05 15:20:20',
                status: 'ERROR',
                name: 'd2s83i53vb31v7q17uyr048w76j7u40mbgd7k2v9pfraraha4mlrnks1sxk8wtr2yqt1d2q8t99feemtl39nox1t3vra85rop0mvalibsy9iba40jsjbcv578jqyz0ld6v7wle00qk6lgd5107flcvo4x5hdioqgf67qpldk8dp1gjpnxgm56svo82xtbocthfe12qg58gsj8pq1dimi91bfxjb42a0b43e7et1wrmrwd3ew4oes35nsc3x8yy7',
                returnCode: 4555118288,
                node: 'qbttt270q7e4k2ckzygao5bqw8a9gmpg44cg16lslymy8t63vysqhfi160ojfrjqsl68t13fb8gb4lerqms4sf1o4nepqxgfem14osizlobcl85d1775pgy4ocdmfo0geb52bjkz4y632k52jfeuv8o7ze3s9xa4',
                user: 'cpbu5fd3gk4tlqj4pkd4zcn68gjnmerehovdtncb0f95tfqdqyintyt9233z1un95kqcb9vc5yp94rsnexvo99rit23pw7c6x33o13ruk34hzy84pf4h31r1w9of27nk5kogj6o8dzqb3n4hm9v8vtu6iaubv27ufkx7n2u0gv909kfflc0d1v5r2wttttxowt8syp6qna2xywf5zu5thhn3c2zs1zf8g824k3b6nsrrbeu8k68juowwasw5796',
                startAt: '2020-11-05 22:28:55',
                endAt: '2020-11-06 10:10:13',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: '4cmtgqizc0hdziglo1xwzb1qhybso2lb516uk7tv0qopvq3b4u',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: '8ejy6acj9ti75l539tya',
                executionId: '6q01z9hgdqbqfumnfojc5u3nqwtallxfwiq8i',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 06:46:04',
                executionMonitoringStartAt: '2020-11-05 17:59:41',
                executionMonitoringEndAt: '2020-11-06 07:35:24',
                status: 'ERROR',
                name: 'qvgc5o07w4aqy6yzro42jgm733cfp8hy4u78m7v9838a88l8enu5t5o95yqoy4kwbh6qfwwhaoz8tiy19o2najo68ngua1ouohwmgczkj3bsmmbjmgffxozkvy9fvt2gvm92lrmzqlqqwxxew1m1yympmt8fjrawk29nz77fja7ly7h1r91nqmy2oea41679jkc8rbd0acagjk8mbdzncv8st2pvpt2o9njoxf1514ujf71w4u1so6rsfhh1i4u',
                returnCode: 1001391611,
                node: 'f7ad2t75u758yhfwfj2xu9vk7e8e7zop96aibg6n44h8ikp8tydb6ru1nuj2voy7bu4u080twyziw8o7rmntgz0wohz1ab5tpcwrl1s4bky105cwl9qvgaedxwc2gqd6h60i1tcbnvxtsi32z1cmnfetm0yt0jso',
                user: 'y6xlodb3an16jky95lkp97o9iuhruf47hzfllozlkttmkas7w05l4vtzlj0kynznyjd99h4iwajzkuo4ze4tzqngidduvy6xs4cf8jed9yh4tuuntkj6j8kg4d1piriae9s7ogio2y310zwilpaze0g0g9ckeppfu8ihixyjvhd3j91u6zk0alrvkear0bjw60b0hvihj7njwbtq5jslyjz7fxin3awp6jsel9eiyz9vcpii76a28f07p140ogw',
                startAt: '2020-11-06 11:32:50',
                endAt: '2020-11-05 21:51:08',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'hqeaflme1a173br4r4h9b4twoauyphjp84qfjbi1di3ajaxwkem',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: '46ooi4qyfoklq94winqx',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 01:06:39',
                executionMonitoringStartAt: '2020-11-06 06:46:43',
                executionMonitoringEndAt: '2020-11-06 08:01:36',
                status: 'ERROR',
                name: 't2721nsr2hcu7b1lw7p9lpheyzs4wba2h5uqdadnc9kxfoq10uy0fqow0wb67igmmuy06rncq0tckxmfc2r57wua73q4h4nhezp82dd8572pvf32q3lb7bmgthn5k5vwb550oc3e5i2nnb0us5wy0syinb44kqmbb4tgx208rgsf7am0ynvieczo242v4vr17jz3l0e7wwrd5eu8dk7fg0le1xvpxk342eco0zwtn0n5du9bzcrkh9ggr1mmtl0',
                returnCode: 1026298386,
                node: 'd9rd88ga993x2yyhch9i6uno398nb7qtkq0o0buhckfqd7fflznlm2ijndbqyqxhaeri3dp20u4tkjxb3i8b0l9ytbxcob8c3hi0vqq7ejug0vlrfdv6mznyy8zh5w43l2z2q2kxae7yw56m41ujj1hn44x7u43f',
                user: '3dkmrhfbdqy8jo5t20xhr4841w42ledkvhsn4tgewpddrrgtxokqrspbhpeuo01511uc9it1uf5gpl65snposytnfabht9wxft6c0b4t7v5yucrticgnwid44rbru2abr2mkvq4co3e8m9ce1e6mfejyb9qc0l5ctrx7k1ussnmwawteo4d1xeqcoisx2fquicoy243jooee92kznmue6finy8fzt1l7qat9dxq0x0veh1q104k4hqyg0oft12k',
                startAt: '2020-11-06 00:48:23',
                endAt: '2020-11-06 05:31:08',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: '73lnuqpxuhv6oh0wrz5nxfg0xyxva7iiisslx6fzr3ty93fxti',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'ccgwsv2ge8mljjakax67h',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 13:14:59',
                executionMonitoringStartAt: '2020-11-06 09:42:18',
                executionMonitoringEndAt: '2020-11-05 12:45:03',
                status: 'COMPLETED',
                name: 'qc4s8zcxo4uz57m4o6kpcutg3xv1n41ap1ndsz3yl2xww12cign27u8ao2cnfc9wcbg7ge2zglwyy0f66w79l3tphj1obq88dm8euyt0jqcbeitfn37sbptoe78aduefhf2228qkjdq410f70j3cemlbesufxgc5csjiqsxq1sdzmqiahzss0dr9b2wk3szrkpo7rya7x8upy5ynq1nbtl6esgsve3ha2jkxm024cg4w2ubppqnp12x91nkg31a',
                returnCode: 3924366153,
                node: 'x5w1mtuvd3joc8x1zsoppz30hle9c3pfptczqaw42as8b2tc98ger98onok9zf5b1m00z7ryivgzrwqyfi57irxybpy3jfyckppvt0cqz8qffyqlrt4lqohnori3palweca8yt20gm3wk0l3uf11vyavv1wz1xx5',
                user: 'inximp5ivw9vytij214ccfma565defn9d5mxrnkvahx7cqk8gfv1s2myp6h4m6g7nix5nd8pxpwi6q0uvi6nr8qe82r6vh6d7c9ea3qhxvamdom560wnhbzss9mp7hzdqma7y89xvampfcf048j0siu7w71g5xj93xtlzyefyjkzvehgtaq5ygb4n1hln4df0l2w1admas7e0a2ua6w0z2k5sovdzlwk3zd0qr8yz1mh2f343n1au2wfwtfhe1b',
                startAt: '2020-11-05 23:18:43',
                endAt: '2020-11-06 08:37:02',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: '523cipnex7vfvqe9qfeh5qylde666gw27ogemimkwlbrwk99j5',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'vbpx0kslcsg4zaybe7ij',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 21:12:47',
                executionMonitoringStartAt: '2020-11-06 11:08:40',
                executionMonitoringEndAt: '2020-11-05 19:06:51',
                status: 'ERROR',
                name: '05z5bb36kruzyr9dq6vhpzury87yj3gc1s6xfalpswdidj7acr4772fnm93zt5e4btbr8znhjltvtpoqiqf6pw2tkwc6uhz1mdj14eivxjb61ytse3t34ndqm44pnmhoh1z88g4o043zfxlg4jekuqexg46bvh44carh81trzrmm36zm1ld72y1kbrup9ho24bnjmya498rknipmg8m7s8xe04ujts5psxeazaxftnit7i5oevy35og11bcyin6t',
                returnCode: 1246782703,
                node: 'syx94x5pw1axdju53s3rzs2ff0qwrfbb0fbrujs1low0sv28c7pv5ndenwfdyjkfrnar5utfxyzl7q4z4eff6korvcrf01us2m1pt7gzijn3mgagmlff5jczykrmni7uqbeo11ix37lxgnrozesqt8i192y8rmja',
                user: 'o4t6v9klk9ff9zazcjgggxwmyf59q4gl4uimzkm170tx5iex0040afl7n3mt203f2o5ezvz0dclr9ue27gbz1dw5pme83qjcvpvwaab42xzh4n483rbpm5wqlz9y542n7u6ln0mdibh7x87fuy5mpgtkjdma2cio6gvl42qtq28hfzp3va8x2lz3mfl8lrbsl1avgobwt4t6m1q0k3n6yd7o9xbxcaxg7g64zwitvwjc9gpsziy5p90t2pvtjz8',
                startAt: '2020-11-05 15:08:15',
                endAt: '2020-11-06 08:11:33',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'k8gzxgjwmhrzq4h3xu9689rezkf7f0bdzbsbw47zv5xamvj00h',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: '4kjkr4jfm2ueshi1nlnv',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 04:34:41',
                executionMonitoringStartAt: '2020-11-05 22:58:56',
                executionMonitoringEndAt: '2020-11-05 15:53:55',
                status: 'ERROR',
                name: 'ubaf6gug2gwxcrd84ol3oez10frwg5fh7oiaoqd38vgpu7lp2cfc4pi53eolocimudscxsxblltshhi9xxitt64gz6q700wp5ur7ju5l33y1mimm0hamw7sfepx7tzh4h5qp6w8iyq7rpw05lk1qabw0g7dnnsn3n86pqzzjivfsf5zy8xhtkkl8tgaj5c8baxjuxtlu7u8qrw0if8ti9ugf9v1hu3llujopxtl8zc6rz0swuge7b2bs2nwr55y',
                returnCode: 99527412310,
                node: 'uu0r5ambr7l9prbrv92fdypb0xt1jujlap6sr3zaztdmaweqwdzn1lnzjozo061aixwzr0jufywtdpgt94j3gvsuwajdfcscbn8ft011mypi7njcb4yyy4wsbgzjez30t3xt1i7n5pjslfqgp7mjuh9o0lai3k04',
                user: 'lue493f0r9hmjue4cuwzmaxl89s09p0jf9mvifyz19igsgw1ocwo2554mpyh1pqgba10zpzetflg6d7ixzzh2g3gm3hu7icgm6icrc2wbki1b3zgxx46tgw0m3f4ypgeqpst4kn2fzsmba1bame0irsln9af52w7jmfcmgqeqy8qc24aay81vs9c9q070i5wo6e7bywjskbwh460iy83wh6rboc8j88tzql2l1fjemc3cpoy9cmgd7jkqx65rad',
                startAt: '2020-11-06 06:03:01',
                endAt: '2020-11-06 08:29:23',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'v2zp1m68r77rl1mn46ok2yc1mcj1qbolzdrps0w1272vsvw2oj',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'qojedie24fvlgelstg77',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 09:31:53',
                executionMonitoringStartAt: '2020-11-05 13:08:11',
                executionMonitoringEndAt: '2020-11-06 07:22:06',
                status: 'COMPLETED',
                name: '0oxoxndml7it7xztwmnned8lg1kdttqxfisx0rxpqtuvx9ryqbsyim69u6abc20m6pfzhjp7tol1dpov377vgtexxrkbzkvbtb4k5azqbtxcvkvqamcn4j7tvx3lsw2ydfc9xvg469ddqh7ncew7uokxzb5lcqr0yrgi5s8kfja3mxsnlauqgj2hdu247rrit0ctr3mw5rfqeuqrpdpcxws343g6tcw2lzlmvtfs1fn85xlg1ptrnzbz5ca94n7',
                returnCode: 2151768854,
                node: 'y0vvo15jycygmatzxfi1b4pekg3nerqmt12ctx94exjv3q0hoymqdfnzzn8jca0rutlqoq1ewji6y03qjarg8i2w8l0xafpbgwueur2nbd0i7oswv9mf8kyfcif8jpdzv44xzqzddlhym95w76sbvfpp9opm03i7x',
                user: 'okelu8vr8bbp6ozdydull5zvixpktdbvknu1hsq67bgcsj3gn5be1j33tp39uqwzgqxep9ieuik2j3krs3z2w02iebht84wydld8qdtzlcqm0eoe8lwedx6unhf53f5w3r65yvw8lm14gcdh4rh34agdckfgwau4fg8tr8eqk0ery664d5oot86ahcozehn6dc54oa8dqhgpma2irik8umekemowusjub5rycg6xyp1yx3f6ltgg9i3pc6oov3h',
                startAt: '2020-11-05 21:51:17',
                endAt: '2020-11-05 15:39:53',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'ccerh8cv2v5essukg8cx0xu0p0qjop88w6r58pspww58af5wca',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'pz5sroh45tye3cq51pob',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 00:56:43',
                executionMonitoringStartAt: '2020-11-06 08:16:58',
                executionMonitoringEndAt: '2020-11-05 17:08:38',
                status: 'ERROR',
                name: '9hoirje2r4zbnbcjhiqezv49epesnqtw4017ig2v00tahc7lkdlnkvinob5yslyfd657k0jdb0ei8byq4oxbuah0p2zgdmcz8w28zwwmsgu7j1nkqqp6armzaszhro6goo2mspmnsuccida1dfar6gf3cz6u841oyo4a2uujqnb09nm3g9kc6yaby8caodwjpm68i06fefdijccyu2frbb5obwomkqg6hkk2cdqei6xteyaypfx2vvpfg8naee3',
                returnCode: 1077631023,
                node: '910w0tzcgqvwpso6462cpchck40dvwwm7kegecfpkis4xage280at8b0dm0b1xkr1h0zgfn1wbobq09v9dkrjpccx2jsvgf9mk5m18kbstdwnzqv8lvmddef94y204y7oeajoc5dgi1nfhbmmnxu06146d3yv921',
                user: 'mu7kqtdz6drucv3c062rzu6wxfyn27ka69mfmqp1ec43ewb3xaw4819jo6kmdv7ftfy9uf0n1984essnqahhn5xu9ljj0idyh42vpoec0zttvc6h4iang81gs6jmsyal4db4zfj92us7gghzh47rxk4tttg8vd0pwo5c0vhouppy58mfpsw4809fzy6sukcdvhx9tmzke5zltdi3voy2j241rtha812hucbx2xg0srwzozgio4m9az3obg5v91dc',
                startAt: '2020-11-06 03:41:18',
                endAt: '2020-11-06 07:49:44',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'jqw256fyz087k52i5gs6kwlv9cnwe4ayf98k4woyvyksowuvgk',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'y42zyvox2rttklsfccha',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 00:39:12',
                executionMonitoringStartAt: '2020-11-06 09:34:01',
                executionMonitoringEndAt: '2020-11-05 14:12:41',
                status: 'ERROR',
                name: 'ppcg49hc83e68pbr1wz6ojtou2yal3k26werdx6263qreqjmiq5nfgzsadq2ytr56ck6lf75eah3mi1xlpns4qmy2cmbcb4wra5krjhhzay4udgdxrll4rcylnnpytga2opijzlp0vvpeobwnvr9cae1b7dpkbmfqxmbodjno78qa7zcun564kyyfek41jqn2ix9bxywyybh5hy7buqz4q1obq16s4bhk61vrvi580y7lke82eokztlir975612',
                returnCode: 100.10,
                node: 'ai46fyauqk8duh2ksha1m0ftf59biszoot1agkcjhf27oo2iagyr93q1h39rmvofgof1qrclpzcw4c1n2hsh7pftr5x2vur6m7h3ecf8dlb77ejzvxkaop6s0zdjjd7u922a9lgjay1jmhabann3ssgzb700eri6',
                user: 'rjj2qbhn1i27uo5qzwc91s5xszzfg6ooht6jvqvviw5a93ae79cdkipm1xll0rohewi8jjcvkt97jbycra5qlq2ehpsy6trhrplgar8656zvczl18n0elpbi2dvkkpaoo8obl0x2p4mperwabojbn1hboryhohjvt5g7tzbflb7ff5ms5c0xkgeqpqm4p7w2h8b1q2ol9azbb1tlvm8dazyaca7g07a4dqti1brsbj5ivhegw85bs8enhfiogqd',
                startAt: '2020-11-05 15:38:48',
                endAt: '2020-11-06 10:40:30',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: '2swcmvmansnue9d26os01g2nmgp181xx9mao3066biuj6y4pqi',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: '9xcsfaxoea9kp027t15v',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-05 14:02:04',
                executionMonitoringStartAt: '2020-11-06 09:13:27',
                executionMonitoringEndAt: '2020-11-05 12:48:54',
                status: 'ERROR',
                name: 'p7qpsxdzywd2307533zbh9m62v3jefjy5jq9bz9sdjokix4nl06zfizgzgkgd3rdb1xia44nwhchf9cc9b6pbvxqt9ldd9m50z86p6yqovemo9gd3778oon5xceu44qhrfpxkrb5vj3h7p0wup3rjldgk6ujwt1hrmk7pvs7ivmo1wof1e3zis4vc8vlbpfh71q5gqa1xb9ufbglxxiwlqq0xpr6szz7xzsmmc2u8y3ieezkuoa66emj1cmvr3t',
                returnCode: 1171100488,
                node: 'yd3wyszeetd3xcyiaqbfgblhmkd1jgrh0woft46x2g7jm2t8rbcc55zucf39tpi55lik1h1os6n5egt7pzhyaz0un9fw99bhlne7kyydvgolptuom8k76eyaclupj30qm842jnz78ih77oapvlb5b7g6qaygl2an',
                user: 'd1ahpe3k3zy5zr29ftge1ukzjeqgn2xq6pyaf946k299t0rbfx1g1xxv77xrtmiexrvq1xjnu1rsypzbmpfw2xggikc2raphy68hdatxpjpnq04wqekzx3z3wlnb0kzqd5xip3zygrkw18n0rlxui0zrmwq08vg4p04b92ywm2i09qceoovgs6yrhafo8x4j9cvft6onsfxi10i3hxiubhy5r6r3oplzxjger96ye47tx27lk37tolj4bz5vuig',
                startAt: '2020-11-05 16:47:43',
                endAt: '2020-11-06 07:17:00',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'hwp2ix5eb1sbivw7d5g08bhh3y40wmqbs1p380xfg0ijll30zb',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'iqh39x3ecf8bag5r8dha',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 15:08:32',
                executionMonitoringStartAt: '2020-11-05 19:43:48',
                executionMonitoringEndAt: '2020-11-06 00:36:27',
                status: 'XXXX',
                name: 'xlt17s9kn0avo2g3a0cbz1wvxwrdgvd06ry1dykvr2syt6jm0efp23zhp5q6vd7yxpsun0jgzbd5rhw0wxka9u3mwthfp21cibtdothrxwbkws1gi5uf97ym026h79nad6496jntpymon2yfo2uxcm2ba5whuf1f1d1zsl65tbd4kjfyx9k01ypyczlmv1d2k5k8bwu7jd8q5y69ttoz2n834rozmeq3xqtic0yvjuhx6jasm7uvl3x6safsobn',
                returnCode: 2947350948,
                node: 'n3gsi94xlpcd4fx6pjpkamrxyiakq6gx5yajopfe6hlk179bjnkaex2c6m2sgucfh6e5n7fw0z0ul6bodqlmelkc639wraeeubz5q2hxat17ofdqqowemukljhsz3lruh6zu9kjkp4ox469bbv861ov2fytu92lb',
                user: 'shdzdqabqsywwqzssx6995u9zap51sz0ud5yby7xjpfbwjhlrh5i50u0y5myq4ah0gurzd6x0kvmuoh3hkoxzled3q7b2lmh8px1kt00ooect6pki2cucm4cgpfrh7djq5hd4wh1qauy0nwffen6ep8yh9n7pog4uql8zvkz17co5uj3wtx5be5z06rp04eezw75buvb2l19s6gejpbzk33ipcomeovzdr8jrz8aqcd6vcnpvjca7g3fvlh8h9f',
                startAt: '2020-11-05 23:43:27',
                endAt: '2020-11-05 21:19:40',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: '78wzwauvesxsotcvws8omwaw7kaagbe1epdmq47i01za2ihwyg',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'zlzj07ejc5elzvaoc680',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-06 04:45:41',
                executionMonitoringEndAt: '2020-11-06 09:16:32',
                status: 'ERROR',
                name: 'kpm2igphfw6wunx8dpuvdk53a3mb7ldo07uln895u7ixwwx9pufqk2crzuf198jnm8tdv81kz3xd1g2eubvpmgwrzkibok2u8t063le5tnmuph91zpnncznm0jp5iidhfpyk6i1g1846ptcsus6x5lb2of6tuclxnjt0rse1brgaiqh791ht9wv5flh5tlieef4ct99pkahwe3fg3sg4ybrbxvw5gt8a81fyy36dspzpimvc92v3w8xdx61h3hq',
                returnCode: 4373273939,
                node: '1y0wzdlpqzybnlnem9xqfyoxjchk2v13fd4hr7owsb7z0qsbui6zflsm1hohpir10xk7u7zejsw30widm95crdl8nvjk8tpce5myxj5wimfrolm3kfkqc68g2wrxhzu4vd1i0fjwnbzoo6gcg9ahuqj6cec8o479',
                user: 'g2uwu8dcz716cdygpmz3hxph1968dmftfizy8d9j19zvkxjudgcj9eih5e7alg7mcplsaytdbgps6psl16q5mekj8la5t5c39xssctdxd68xxd2qika05t4ql4j541hnv6f1ndsxx9o3i5quufltyl8vi2i18vt87r4miyl29ckl2h98r3oi6loywpo7ian8opf4xiv3y2eub532i48soh3lixkflmk9u0wwbvu7tfvc93eb0px3rv6pt4voj91',
                startAt: '2020-11-05 20:34:48',
                endAt: '2020-11-05 14:08:18',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'pby7fynxr6n3mwquq7ma077c3ago4hkp5mjhhhrg1ojtu2xl84',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'ru1l7tpxc1l2sj5gtsu7',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 20:07:49',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-06 11:02:55',
                status: 'CANCELLED',
                name: 'mny9aamqlxub21wxm10erja8li8ths56o8ea2f3q3isbp6yoy4fg4ythqe9e81vm3qvv2ua03cay7htqcte2qysnsgh49f4uwvgcwll4p3l3teb4spm0yt9c1um3bp29w0u327nivc22b09lengl0kkkk5slh302c49uxtxt9k9va71ugc03jbwnh0pylc02w99npmqbgm5lcpgj9gb69ykk18jw24nh6rhq825oe3kqkb7z4grn9vbt0ovqgxn',
                returnCode: 7872658230,
                node: 'r4bolmbdrg0p7qdr12j0zbx6dlkqxu2mfi29q0wd3m8vi309hg7zf129s1znhxjnp3578689u0zxqfr2tulwyqxyeissil2emx8lmwhirgl3is95h4s7dv3vizz7645r2v04u0imiwb3dyedz7tij96m55ai8qvy',
                user: '06ubctje83x7zmbive18h5l8shurvufow50qhyde0ciodyr033orhiondyall6vb4vldfpi8ddwud66fczm9mxghyzcqbjyui3epxmh4e3evu0x6ch8rplf24e3w0ww4pvx74vzbeglty9oo4nll3qssoamxsxax0lxfyraws132ptke9y5993km34xt9szdw34akbtf107wvcxcr4q8n70qxp1eyepy9i3v1p3dedznnad4e31kvsfz20o7sbf',
                startAt: '2020-11-05 20:13:46',
                endAt: '2020-11-06 07:49:01',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'ktzau2aukv6a7m0hbd6bburi7mcbe8n43l2xuhgye8aau9veje',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'ltslf4elmdpols872t1v',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 22:42:22',
                executionMonitoringStartAt: '2020-11-06 05:16:10',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'CANCELLED',
                name: 'atitpuxfekrae08pwjhd6293fh2sc0q4idc9r05phrzyocknji6h430u8xuaifdl6nhs5rd6apade1juvmg3f9e1q3vfql97vpq4t49by2wjnq7kv6mjeu72xnqe72q7b191x1dn2isll5yapv7rg47irjlxd8pioclkezn002fifu88am51d6onyo4izs2w9d6513jzz9kbl8v7ol84g1smst2lrycwzcgcvuua9t38qb3lhkf5onfqot0ucwa',
                returnCode: 1541257810,
                node: '6o5g9a0agsmtmneos7qie07zilu7wbxc8clpvq3qh0zpibv67uhd2q3umg6md7pz6hq3v1v3ufe36albqel8khx74f3v908o3mwi8dfjfqxfibx9dawemddoide1lrbw82as9pxjiu0n1rly502gbvz93agrdz4d',
                user: 'guwh7j53d0b36l0rge24xb6kikfb9j9wdsh5tfk7gnytpcghjhf7zjvhrksucyrvwhc24qx5f6vgo6lncscdm1rkx2awinaq6k7b69wndjwmmh1ip63txsgmoqd7z715my77vcxenphb8p0vqn4mn3p7zssuhuadco5n7zv5xxqnt1uxfx3zsvkot0omwg5n9e45qd2bz7woywd1jv5j6838a8py0q8lqh66hegvzpe7kpn1f5cqqv3og8h0let',
                startAt: '2020-11-06 02:30:19',
                endAt: '2020-11-05 19:54:20',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'agfty7gertouodhmphgoe8hjsxlqfdoqfrggyv1rv2x86mh7zp',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'sd58rqyk8df1l70usxdt',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 07:20:18',
                executionMonitoringStartAt: '2020-11-05 22:28:55',
                executionMonitoringEndAt: '2020-11-06 07:03:18',
                status: 'COMPLETED',
                name: 'n1oc5k4fblrpd79e8vmimnkiytsv7ly7hqf3vcmsnyzyw7x5c9v7zh9i2dqdhhswmkqxt6xwel8gzlctbgqtl6xnxapc993ej3vgib850e7qa2ful25v8vop42bvejhpjkx3c8q3ftdfqchk3vl55v2hbtqg2ly5qnj0xc1ya6opvr8jh6kxiz53ef4oht4cp9d9gjcznfyhyrsnfto32zazm3dkki7qfy82nji33i5jgauoaxq1ukwx1jyyotw',
                returnCode: 5049193515,
                node: 'xt7kpz1q956nueof2hipmbn74e9k3nkkt262yppw2spvys0liknjwtu0bbx7mvnet6jqdpy70umixn3i3k8c42sb8hfp3mbz74jujyasvccgm9zrp9m57jeqt7rvzbzaopywnilbea0a51yqqe0inmm6jll2mt5e',
                user: '2qv3u7z26s4lwjwlnwby1f04p9nlm4ufho62rx235wjbgci2p2kne9pa55wi7am00yuryf7ixi77vyooinrpm9gt77q5z9tzmeki9f0by71pzle6fak5cpf7ksda4e6c8ht7cpnxzvmruaso47nyprmk48905gvxhlyz93xix7caadsrvjonknge0qb9lhqabb7ucmq3o50828b77hrxmj2g9kocxrzvpd9dpwifgncz4weg1jbb2oo28ipk4v6',
                startAt: 'XXXXXXXX',
                endAt: '2020-11-06 10:35:47',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'vzqxdhhn9ksc73kvpqaf7p2mb9dsbar2w8ub41nriqgl6e9zvt',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'yf4bhbh4s0uctfmc3anp',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 13:49:30',
                executionMonitoringStartAt: '2020-11-06 05:16:01',
                executionMonitoringEndAt: '2020-11-05 16:18:34',
                status: 'COMPLETED',
                name: 'm3cqx55nyk0fdvjjdpgmq0zmwml32ehl4wtjo2ixq1julvyigvvfjh8ykkisnbu5huk2709jnr59wo8l0srm72pjdb9k61gemgmvz7disrudikh3a0nqpgh9lh9hlfgmuv4jfj7pj5q47rptd77zw69fr04jd83k1q4w9cli6qbij9ksoame8rsbob9ofy7to7a99kdqxwri99zgbtfk0s1sa4sv8ldhg6qwncbm2yggy3dvuln62dg6dnfa02h',
                returnCode: 2672545636,
                node: 'noll231gpikquxb60updlsafgljqatfgokd2zb8usq4z2474xaadybjjn8vqdjj1aazuxv21sni18z0qzi37uvyze1cw7fs29ak7q2ijjziocqeh7ln4q8gx83834bu3cqwhxa4lly3okszvph4zbl2124us0qk6',
                user: 'ciws3z11heuxtkftkgmn6tkhdut2fmcvbf4feshzqkusbjhfkiooutrjtz06awcfus7562xeoi0973wizza1wzzeme5yhf8z9sjw0khze08ubst4j4gzn74fpfnai7tierlk8e3ulqj9z9at3c6e6ty2q100ehe1cfqct4m2tmakbbz7wjnqe6e5ge1upv9m7a8l89vfx5ok8cp1mpitqwqusv92jpgt3borezt3gtgyda413f7jy0e3b8mzohk',
                startAt: '2020-11-05 19:49:51',
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
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'mujdpc0i01ah19buog7988d3b9viks160cz67c9dfvi883zk35',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'ynr9622ocgxft7mq4ky2',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 19:29:21',
                executionMonitoringStartAt: '2020-11-05 19:33:45',
                executionMonitoringEndAt: '2020-11-06 10:04:24',
                status: 'ERROR',
                name: 'zo889rwlgqvfllpfp57je6ejystzjrrykxdkinh523j9ps6pi5qpz7ik1kwse8tcr1xzgtyu3vfrj16ftgkvhq2kckcsagoz3aoxyrpx9br5k5dr1y41wrren1za85a5ro5pw5a1kjuzqtmnr7jmwywxlzweecsnwnqoro4j66c27vxuvrgkb3arz0jtxyd71nrzqx8natel2segiasqatp28mrivd20dgwpznbkeb396pigi0f76wdqagwpf9l',
                returnCode: 4579273887,
                node: '2tssgerej4rykulp2ot0ipn3c1oyzx1all4bq5pgmnxqbj7dulhkk4nonitxp2jmfrhwvsznbywpi6jr1fq34wbcfscbfbukgls4obmqdukrldrzzk6mbw0w0ke1oletdwy8357wmqr2r5w337m3kb4f9fom0kxj',
                user: 'zchai8nvwx7q2tvyohtozodly5vomsoaexfwnku1xvx1bicyt46i0shawi0dhvnm0c305a1rmalxxhmk70dlrgcyhiul5yk8lw7n5rgot8lz1bc8w8h4j631t4h8w52bbqegb6c822q0gjrnqms1deto4k04x4l1t4ptmdr8fgqabyf3y4ox9h6lk377iui12f91ew3vlmbkh5q0rgr7evfgxvscgmxwa1x2zz2hhnh3prh39tzhmd0d1xi6zrd',
                startAt: '2020-11-06 00:56:44',
                endAt: '2020-11-05 15:05:45',
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
                        id: '3e2718e5-f47c-4c78-925c-984b6708c35f'
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
                        id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '65b25d6e-d604-4a6a-9239-46a4f5795ab5'));
    });

    test(`/REST:GET cci/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-detail/6fbdf378-35ad-4a0a-8325-a7c3dfaf85d7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-detail/65b25d6e-d604-4a6a-9239-46a4f5795ab5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '65b25d6e-d604-4a6a-9239-46a4f5795ab5'));
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
                
                id: 'da2cb2c4-3187-4c8a-8ed3-d9715fb85caf',
                tenantId: 'de78adaa-2247-4109-bb48-a2ff3938af88',
                tenantCode: '83izw6yg7ov99hvfeeuumxaemslzusqqg7lz7tsfhqncpwji5s',
                systemId: '737ffd0d-7ed9-4fd3-b696-b54321e9c413',
                systemName: '5l32r738vr2zn1gt24qo',
                executionId: '80e2af73-cf39-4bff-99fa-de8d39ddb57e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 22:32:49',
                executionMonitoringStartAt: '2020-11-05 19:12:18',
                executionMonitoringEndAt: '2020-11-06 11:30:06',
                status: 'CANCELLED',
                name: 'gbzi9s3ntbhxk9oov7w10z4urnb5eyfi1fa0nomsqagrmyh2e0xdn6w69aftf1vj3tgiemq0zw549pd3gt8lyoyow34a4xicm0tcu7x0k7eptqspmlp1zv4jrid6zg9396xwx7bytp9qn0w8zasna3g64numd27kgrvkg3fzgn852km2wujssh6tcn6jsq326cglfu7ypkys2a992f68yfznkgpual4wol2vsn1g148rak8tfdgiv8o0afqq2rn',
                returnCode: 7735636592,
                node: '51dwcx36pbxlslku4omstmdbly7f8bhlskwq8wxqpqw4wqff5yd49iqzowoao8h4b9jawm4wkixys390082w63lylh82b9cxy99s63xo0373b4oebq49goycc6lyd1km7av4jniaj7d4130wxhtdx5t3c4pf3d1o',
                user: 'ulx9baeij8sq07desvr858mtjsty2tu0yc3yh0izg0eqmy1jdeiaa3rescf3ih6f3v5i4hkh3cmay83jk9053b5fezwexmbzy0me92175oyzu2985xvls30ju4454l0bzp0mh47agjy9gfzci13hb7j6a0qa7btlmq35k00vy2e9cb2vnuy2bxho83b9ilqc1jqhxxl3a2jwtnxclmzmp1sxrfo2vykqtxch36lkjwzkcwij9gxz581958htxzd',
                startAt: '2020-11-05 18:03:05',
                endAt: '2020-11-06 01:30:23',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                tenantCode: 'ury0xrrp40sdlt1n3wb7rxs84w7je68cu2ozne17gjlyme1eps',
                systemId: '85545049-24f0-4663-854e-f1926c35a002',
                systemName: 'tlmn2jz1lvcbdnvzkh5m',
                executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 04:06:25',
                executionMonitoringStartAt: '2020-11-05 19:26:22',
                executionMonitoringEndAt: '2020-11-06 07:35:42',
                status: 'CANCELLED',
                name: 'lxnylvum91too2jutyd4tpxwrfgmfuke773uceknhwn79jx4a2wic67rgvhmkncvgspm3fezcdf62m6kvzelumyzreygk2s2fpau8mhep73xn5maz3pr7f7pgtw068jzc09viyiwlv19valyiil1qhv0m9hxffzny7gocwksrazwpph73iou38ww1rv213x8fgflni1y8bojatcidkq7727jf4kqhfkynaz8k04c8n6sfke2hqnalty6ov28ont',
                returnCode: 5973703944,
                node: 'hrs4gcc6au7ss03x8nj0jynuhgzehxaqirygnejt4wxkmrsgroxrnw4eha0c0cuqswt16ljmay46u7rjeqshe8t4xgvolcpxwuh4xu6rt54nmi6mwwep8ozqz399govvqs6q6javipvlca4v981u7u9axuimkvof',
                user: 'xgi3dhmmf6kdqtmyneinxguqvxgv73mhjtpee56l4qzz6sd3qwfqb3yllrz9xaiax8wlyvilwscxrbuaj85vwqw5xjxmnx9ae4ib3qozceja4lae9f3gxu2xc08cyf5zduqawnk8a9pbvwrfxzhp97gmdxzl9q2gc5seja2mws34tlc5wa4e6kkxiohqyp6bhb05wjt7ss68k5fiyqyqfb9ku66vnyoy3f61rkmcedmemxe122lp2u27fcdo9jt',
                startAt: '2020-11-06 00:54:51',
                endAt: '2020-11-05 21:02:15',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '65b25d6e-d604-4a6a-9239-46a4f5795ab5'));
    });

    test(`/REST:DELETE cci/job-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-detail/c49dc7c0-e019-4c8d-9a28-ddceb2afd346')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/job-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-detail/65b25d6e-d604-4a6a-9239-46a4f5795ab5')
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
                        id: 'dab36078-8509-48fc-9a11-50cd9914d2e0',
                        tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                        tenantCode: 'eb7cnrw6a1riyx5sqats0l0pwcjewpb7ztssh33oxkyhtnxs6z',
                        systemId: '85545049-24f0-4663-854e-f1926c35a002',
                        systemName: 'e4a1i9l9aip45n7jam0l',
                        executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-05 20:00:39',
                        executionMonitoringStartAt: '2020-11-05 19:30:52',
                        executionMonitoringEndAt: '2020-11-06 00:50:19',
                        status: 'CANCELLED',
                        name: 'qsdkwcbkoo6o0c9jiccvy4k4ncknkw5y95atu1flqik9qe08rfhwn7t4civygubl2c1aflb8i9w8p8blacowmfsms6v4lpciwtp62xyzj8lnu2t0xx892xm9lsa1o7x1q6re6vp9in1mk5ojwfeqvlzjwv57e9f4bk8xr432ussm8w2pfgyp0p0i1s9fwr8v9z6z08pva3vn2cnv4irofd9bcvs3v03bwd93ips4hqf31c5bzkk027ke1fm6njj',
                        returnCode: 4635649901,
                        node: 'd17rberan4ulqnkt067vjj23hzfa7tokqeo8glvz73icw2up0ryhh8meu14z9lzd55aqla2lmlge03q21epz6qe89am2sjd5n5s8lkdee6t0r57vyduf6my8r0i3rjtdfzi9kuus37wweed3ztbkur6qdasoqr8y',
                        user: 'vxukc4rb2tdqe1zxvsz7txq19j2cbmthpv8bx8yxj0skwxs6rxcvi47tshlqwrv312ewaewp7dzddcdpsjxp7zbu0mo4k8mdndz42owty1mdlkt2gosw817eyhstyrbw9imredwtkklegabtl1c6ljzsusiksiy7c675mf4vdigx79z5w6q92yc5eyfu2eyv5iksab66vj1gxt9rs3b70u9ij0ur1itmd327uayn32ui3gkdenk8uzymquu0s1m',
                        startAt: '2020-11-06 05:22:41',
                        endAt: '2020-11-06 01:18:06',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateJobDetail).toHaveProperty('id', 'dab36078-8509-48fc-9a11-50cd9914d2e0');
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
                            id: '641e8d0b-1405-4bc3-b779-cdbc806a2e8b'
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
                            id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobDetail.id).toStrictEqual('65b25d6e-d604-4a6a-9239-46a4f5795ab5');
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
                    id: '290529a1-cf61-443a-a677-aa76691c502a'
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
                    id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobDetailById.id).toStrictEqual('65b25d6e-d604-4a6a-9239-46a4f5795ab5');
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
                        
                        id: 'f83d88ff-71a2-4cca-9f41-ed6ffbcaa3f2',
                        tenantId: 'dcaaa669-1bcb-4064-8227-0233e98905cb',
                        tenantCode: '6ypan026ua0avhilr7axd74du8dsllirmxa1yurg0wfvrqyg3h',
                        systemId: '9824798f-ec8d-412f-89a0-d895c77f3076',
                        systemName: '6zprkwq2uyxz6ce6ii7a',
                        executionId: '47b10943-1b64-4b8f-83e8-14a0a74cd08b',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-06 03:45:05',
                        executionMonitoringStartAt: '2020-11-06 06:08:42',
                        executionMonitoringEndAt: '2020-11-05 15:42:31',
                        status: 'CANCELLED',
                        name: 'iae9uga2qwu834p4xvp1rkqhuy8n2f28xhz2rbcxpm2zthihkcdxu0yzlvrowszxgj258dgqpftzgbvs9ohb0vt2ab4wirygyhcxm3mvv7besh9djhos54ilb93d8ex8lt9tqwjap37lvxz07s8c5vfvlt0p1twabdgokh0gyn3gm94ck96m4r9g4gw87611z4g4uqq2cgohvo7sm4adad1xx0yclzim6y4ju37sjps8w5sgo0g4862sadzzbqn',
                        returnCode: 5876247934,
                        node: '4buj4b826lspbawvex0zisuke22sam8344tzjct34aj9jzczezq5ziq77oldqpponoxdmt4n7jsmxlhzqlmp8uwl2hwuinrhsmu7q230palf2mswv9nn4sxyudcn2vfdswrosqeh17mj74n5jgpklbjwzty24o98',
                        user: 'b3cruy97n8mxgebgp1d5wu0iesi6jw5gu1yazgq7t2b198vlxwr2wy6jgrs1dihldpkagn3l4tbhsefl1g2rwov7tkfy8x7lk0h098ae0rircpuzwixek6qf0gbszadcpa75otlsafl0h1tr1lrc6wn8fyct1d6mhvq00dv8bw2r3wdke7rrgl71r7he6aadm8m465mjmxzs8s8zj65shjg4yxnnr3g6k17ettd3wa8eckg3vhvk2gvdx5keker',
                        startAt: '2020-11-05 19:23:29',
                        endAt: '2020-11-05 17:07:14',
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
                        
                        id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5',
                        tenantId: '580cff83-dc15-4b2e-8c20-78298ebb41df',
                        tenantCode: '9y417ojhqkp65i03k5te6jv8m8r3tyvv8vplufst0ch44k4b28',
                        systemId: '85545049-24f0-4663-854e-f1926c35a002',
                        systemName: 'jnz8rbkb2t86s28piqps',
                        executionId: 'b65262e2-78b7-488f-931e-4f73590144b5',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-06 09:26:14',
                        executionMonitoringStartAt: '2020-11-06 10:47:33',
                        executionMonitoringEndAt: '2020-11-06 01:48:41',
                        status: 'ERROR',
                        name: 'x3q51q8crtgef9jrvsc6p6bzsqed4mobwsitietwpymmsw7f0yhnsl5vy4xl09ld979pk5m63dnkevdbsq031dvwzem2ttaja8drhvthjs8s2s9b0zqr7d9wv2t2y4fmyf99t725l6zkzs1qvv2ivsydna63rt8ueucaabpauibnnxm4loqb60lnj7q967al91npeonsn5ts4wq5tnuhva273z8n1dcwu432yaoflqcq54ncs7eaom20fyl0q7s',
                        returnCode: 9181252259,
                        node: '7i5acvp9kfuxt920ucyny1thgz4mjj28gww7z32s9bxy95k24pvjanllukfwlkaqs7vemjhplaej1hyifhmmbhfvqsiiihdrwav33y0zy171wnnfiy0r4w4gy8v18vajxuiysa1cs67h02p4of4mznwdosgpripr',
                        user: 'uw64oekrf9zmra8gb4iiogvc0b3d5ewpjuhcy3svvbyxjgzawv4wzh3203ltvn7hwe823829bn7b7oapbae3g59zxs53sn0ve0d8vm6ctpxn8milk0psziqq02d7wiwjfcvgjh1ck9tiqzaaja4aqjznqwlf59fxj811wohfbx4cvagsutsxlirgfwv8b08n7pb9m4rp41t5wnmpq1pzys8jcbsky37v245unnw990qqfvur5fv3ifqu15iddzk',
                        startAt: '2020-11-05 23:30:14',
                        endAt: '2020-11-06 03:34:59',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateJobDetail.id).toStrictEqual('65b25d6e-d604-4a6a-9239-46a4f5795ab5');
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
                    id: '04f9ace7-2506-49e9-b92a-819b29e922e9'
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
                    id: '65b25d6e-d604-4a6a-9239-46a4f5795ab5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteJobDetailById.id).toStrictEqual('65b25d6e-d604-4a6a-9239-46a4f5795ab5');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});