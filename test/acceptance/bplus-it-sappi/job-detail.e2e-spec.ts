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
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'cdcgthofaz1xqjd2l4mtlftl7cdbrbd8t1tyil9acs03yi1873',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'rnpmie4h2y62tesnotgz',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:09:42',
                executionMonitoringStartAt: '2020-07-29 08:05:43',
                executionMonitoringEndAt: '2020-07-28 19:42:07',
                status: 'CANCELLED',
                name: 'krddciibj6q3c1gj7wtapoi3a6wwn9nx4o5lblvh0xt4qon975gwvrgwgsdd218rfx2zmksp7g0sxacttfe1vjxjh200bvf3xm6fqcdtcx19a06lc4vtb021e2hata5923tqpod7nlk0b1flcjhoe24cafgz2zi7ni3vg90rd0sp75szdf87t7e3xq2zorqn71rlappb7ilcinw6cyox51fpnl1pjkx0sy6pc610i8s0b5lpggztw7s1kqtxdnt',
                returnCode: 8440462736,
                node: 'icvpmt16ljo7o7bxz1qsb2anms9jz53q8eosb310wtqmacob0sekgx5q24e1jyvkcqubc1bi9182npztfzcfbrgy7ktgvku452pdmnf3qoze7b0bqnfqplcwdjgcit8peotrgku5t6h8k35q1kq851az860c74m9',
                user: 'qk9gls8d1eqnmj6wqawolpbn9g2stnsa800tiyc07cew2iu8ny4neil94odskhpnysbpaupdxzjg2qicjflyuvi5r9r8nmqbcoh5e36y4qygmncql46fumcr3clec499o1sikwjy2ynlrv2f7c7lg7lgo09ob6y9dms7md7zvvvwfatf90jlljrpdyvmy8xobms2mj00hmwpi53vou08ysjfpl6mvo6dna9su0ahpuknlwerzfquxivma8xpa4r',
                startAt: '2020-07-29 00:09:46',
                endAt: '2020-07-28 20:20:34',
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
                
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'rif1ks437j8qhhbezx7ojzaa45v7jlf2rukh79f9dq64jbtlbn',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'x20uuwfy337szdllwcf0',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:21:15',
                executionMonitoringStartAt: '2020-07-28 18:27:44',
                executionMonitoringEndAt: '2020-07-28 17:13:57',
                status: 'CANCELLED',
                name: 'pn5o6zw8g8w0osfwt5owa4jt5zfv9de2niyw7c6zvwgfi9vr7isew8pxk5mb0jzsqg1l6uv9x7rg8qhmyyvammjp72dgfx9ljbdc8nnrxwsxkzggeusxslgnuk9t9agcj75tcffqnmz7y0hftrjrdizacdh6qb20eizwv6xzikiycdjsg0ud8x8bxj6iz8p1yicme2pspfl98d2meijw84c9ghwruff66wknfmejy9mj0f6ypfr08y0iruxoasa',
                returnCode: 1732226084,
                node: '21clthpdjgjwor6eolorobs69f3ouemaylkg6cw2s8ksen0o9itwdvq3qsprv4kk33s0n5vtewec5i4d3190962e60lhk3ldegswyaz6pkbzsv694db3qswvlk6cfwkiz2kgbfiizgn5eg4ibwo9wpmb1em1d9jr',
                user: '1g2faul6s4jv5olh00ge29fy574itb4fmmlrswni96cnkmmu6mn4oszh73ywa9xcw290kug74w024hzf4ruu2tfe6n9jwubdyxl7cbo2q3rtjnelhu3bujm65mzw9hx52h9ea3yc1zrqcy7rd4vmj4xufkqxq27wcjdf2nwosztabshpuz47c5rcna9969nxjd454dnrbjppf23wm4erv471ncg4vag5inych7msdoyqk3a73dpnylo95swzty8',
                startAt: '2020-07-28 16:28:47',
                endAt: '2020-07-29 07:15:22',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: null,
                tenantCode: 'pvb5fntjqwb3shzaxwcg1g2zq065n3ufsp8isstynbc9zar6u4',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'u5hfzs2i36m2o0tcqwnd',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:59:56',
                executionMonitoringStartAt: '2020-07-29 10:34:46',
                executionMonitoringEndAt: '2020-07-29 07:48:58',
                status: 'ERROR',
                name: '1ouwmdxyowon7yka4tkhh46yqblxpjbp95ehag8bbgcr49pqljw3xkh66fm8lirj3ntajq3ajiiduxnsxejo5yh0ap8544jkfl1z3yuehm80efb1zijsg6lzjnaccb9ngvkiz8uger0yictibpnksn2pdxmpuiuuaarmkirstc5tfks36ry947adpe9u48ydqqb3xfpidcjv8wmhr05zm2tx6dqli0kwqmyst4zs0yp9dsz2ckcc409wcbsofb8',
                returnCode: 2514436298,
                node: 'tmoyf6eiyin4rt3jxamaccgfag54sdy52w442kqcl9p9kynm0tp2g2oybq6ayemdz97wqdw9ywkeks1tnby7543w04qeklgauk8jj803k3omtnh468mnenhtpmmicr2rbgou5qpw26a66a2zosbmg30g45lmjjen',
                user: 'e39co9y9oimfzajygz89aucjabuo88q3adksy6o4yhmxkk351orpr7rozfwu15rm0obi82y9hwog4045xjbtu86vivfiktme99oe2wimjes5ljg9k3irt60hp08rxb0mi16s65rdtgtohtahflheurp3kermay7d88ebn2fyccodypiaukvc6jcutsl3o9dqi5bgrmoo0v3p4px2chyxry95lm36ug89qv0psc5fdq3n4h5mjhe2gnyswd0pjgk',
                startAt: '2020-07-29 02:41:21',
                endAt: '2020-07-29 02:18:18',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                
                tenantCode: 'lm8k2guvi11284eaujvo2hxcdwww5gyp3h5hcmtvhigtcv0rcc',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '4n8n9lbz27l4kxv9l4yq',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:47:15',
                executionMonitoringStartAt: '2020-07-28 20:57:28',
                executionMonitoringEndAt: '2020-07-29 09:41:01',
                status: 'CANCELLED',
                name: 'lqqf08b0qd689vsqk1rqvvcpgnpj448st88gtt38bfejgqm3ixua855kj08dcx08onbejgd1jh801vfdwt9ljxae5dog7jldg881usks4xg7otbcm66qlxbo61lyuw8jnnwaau2yenuovuk4os1wsqp47cwapn8s2k3ivaxu773hk76sal5ol7xckln72sqdkt7lmhrm16d65ey0xa9jkmry35ndgv6ezjzumlg8d4fu48sia4lrh6r9byoixzf',
                returnCode: 6339335445,
                node: '3yjqrl2doatyicpfyyzk6xyjvds3e2qssn6yje1asr174ar5qj5vu41rf2rawcnge54ekrn843esdhwojpr5723nlj4e5b4mi3vo9uqct78ghbu44ku79vv0nvvdhfbo9qss4t5axwo38zfak95oesr6t3xb0kcc',
                user: 'durk675aytt7euxr99kdwz9e344tfdj8noa8gq3vm6so86rkpjdbl6zw4nrczop1swenzb4o7zdmxelo3r9ehoomrlx6hp1oj85zr42sppw8cxngnpy9j6hzqlov3v73977shyyipwej8qruim4szdj0j1yjmg8ifhr65q1xog8qwmclh2o61zjc3jiq3huufuik7mx799xebyn0m8zwfj7t3a69gxror8bm9x08zpjooy4coc3y7i1p58g0tm4',
                startAt: '2020-07-29 02:00:42',
                endAt: '2020-07-29 09:35:23',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: null,
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '4qmni6t4p34xjue209o5',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:12:03',
                executionMonitoringStartAt: '2020-07-29 14:32:18',
                executionMonitoringEndAt: '2020-07-29 01:46:55',
                status: 'ERROR',
                name: 'kotr4xk95ndxlp1e118v0k8kxj7c7367u4kb8d4tzt8mj06ypxv5qqfb4olbcjg261hgv32gmk606j1mnwcqdu8pztn1b1o50d70rvpfqidh5nwroh61ztgnitwsupdp0btd3yqzbfhi71gcnipx0fo68xwe3e7pkoyvomenjyifmtx4lyakp8hxzrneibefxjf6ykorwqemg36dzethwevmhc8k2ysozr483o6d8gsvasdud6l7ho8v1xiqnr2',
                returnCode: 5905928927,
                node: 'nhomcak4jirh9uvt2tfi7mgs9hnj15783idakk544zu6xr2duwxkj355ziqkbyl15q8ii5fq8s1yt7cbetmovcjfmz4jf9z3uohyy0m3bgdkzvq9kbzp083flxir2v8dqq4j92fyf6jtz6binzwy6wki0dtnnzsw',
                user: '95l1zyd7m6mtaghp06298tmh1snz34x8mucfmz3iird7l71550g3kzh575nnasvrapk1kvt2e1gscityimnxk3hp4mknfs3jgo1tt0shb6288849rq22yz218ht4r96machy1j7shhmjhqrhkm6kopfcao3c7f9v61o9ualn2v4ezo7ex5oei7k610mc4h711q79krwfhhwmgmop9h7u7abik0egupxahqebu2x98gixg1nd736zibp5m4bmb1h',
                startAt: '2020-07-29 07:15:43',
                endAt: '2020-07-29 07:19:57',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '5g1dy64anjjsjrla1esh',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:02:26',
                executionMonitoringStartAt: '2020-07-28 23:48:56',
                executionMonitoringEndAt: '2020-07-28 17:01:19',
                status: 'COMPLETED',
                name: 'dyx5m3ju3h25d5uutso3o8bmcfupl5c2gaaavx32jr82um7b507p3edicb7s7cp3yox348pgfbvs2pvid0iw6du8n511mq0ztmphjyyx6g1rt7p6q05r5yp1loojxl24clqp9vlowi18x9sxd1bciraabgop6civya7zhix44gknny8o9kri0l98qsn68uh1vpuzimo69ucauat6al3u4kj2bdw570qn6hek64vrq4zjyfpmzo8ui68t5bsvmaq',
                returnCode: 5976863967,
                node: 'xn9d9f1fye6godgaanah1ag0egebxfu27dilmfa0v2k3j1ptcnenvduxg17hv0018r8i5a7bqiw1v7upzgknzz3h4lsi5nakv0h9plseef7soo9x8xgjoxfn3dky3a5hhl4n122lthahp0u294d62m82849emxmj',
                user: 'skawpvm44cvuv7atrda3o56wn41qn37ailbn46zch7t60rxe4rxibn4ov7rvus42riw32dp2m965sudicwkjca0xwk2gg4jco9lrx8as4j1fctsadrwoa7ka1d9z3i1c2k5vrj62nfp8pmf12gxs2e4kzhrdzmn7cir4phb9j8agopc9gvfrtw3c4i3kqj85i15d13122pilshvywy10uolygs1sddm5ojdndzjjutcv0cmbuosyum8d6uo3uzu',
                startAt: '2020-07-29 05:07:50',
                endAt: '2020-07-29 03:20:17',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: '60elcvu2jud184ilxw7cenrkv9f3cjry3zahybul459fr8ovnk',
                systemId: null,
                systemName: 'd17crulbuldoi8n6o16k',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:41:29',
                executionMonitoringStartAt: '2020-07-29 10:23:58',
                executionMonitoringEndAt: '2020-07-29 01:29:32',
                status: 'COMPLETED',
                name: 'khlo3uks0ux5tn1wfd11yfm5r7b583fl74siml7o8p745f9l9tveqxpk56hjjqj0f0yx7e91uyxqureamo2wahlqow3ww5nrl9k7upgntzf1xmh85k84zjs88un0s228w17pdvy90zdnjpgftkn275vaj9eaoiape808htba6iesnt3wrc69hbusndwkg9nmtaljjisnzet8nr8ipc0c9bgl0sfcdid8vbi2y1wgpm1zflp6dvsu9j5bf41aw88',
                returnCode: 4624724851,
                node: 'wmwxhquea8h8sbc9pat733olk65lza17pjtrf1c0fyx8xrm10txtsfyjpt2528ojrl3h5ej5fdg71rn9yjgwnbfvq24gs0pijnwzgamyqvnf9e5ozg1s1ua4kipsmi8ozr68qma22qw4scclhwuckwj91l45yzwc',
                user: '69f3phxj397hskmg6d6qmib8v78zphykf1ld7c73qggl6esc41kgmazv4vhl3m0vcvsomqx2ujnpiy1djfl54jmzbbzw8fd1krlhh53nqwidis5u3soqu6lr1krej4on59xzchf51ujpuk2mfnrnb4duw9zxe3pv1ey6wwh3xsbg2f3bnrsvkedcj3p2u1nkidv4bnu7q5pj7yf7bfwge9k621xe04h3k5dakg4m07jwwwrrltwp33goe2t6wq2',
                startAt: '2020-07-28 18:39:28',
                endAt: '2020-07-29 13:24:46',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'gh2gyj7befc1rlmwk3i7cmuk75b8qkr3ysxdrjwbw0tajr8fsd',
                
                systemName: 'qw8wbfnjaw2i85o2iewk',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:45:08',
                executionMonitoringStartAt: '2020-07-28 21:51:51',
                executionMonitoringEndAt: '2020-07-29 13:17:07',
                status: 'CANCELLED',
                name: 'gz363ge8sn21rsoi2waa7uptl6f3fe4nloovrjd2o8e0ip113kpd7hsemw03wrrwvgcdsu15021lmer16v89qv9l8zmmiw5vcxghsbfk33k2u0jklj92uutyl0dqtw4w9usth6ghk0zlr95ux8va9jp40qjqjb2pe4rgq70lqhn5gd3mpsvzwlkthwlhxic0u6umppybvcmby9fyj09so5zw42d5g335fj5ur2dd49tpz3u7vwzqi61gi4od0sj',
                returnCode: 4879935543,
                node: 'zrhtjy8duzf67u182ypbk118ieks50e841aazyg7leoyhsftufotymzbiyvsx8c4t9254az28rsrovx9peuf2kc6n9gjww3z5b432neqryixjsn5447439npc4nx9s8l199d38t8do68mict2ssi1cst1c1l3yql',
                user: '9ub9dqr9k5vod16njp8gk7jd3mz3lhcuez99hn8ndz7l439wk6daeae9lbr1mud1n2cq5567tkhsl6uruee8e34pwayzbh7pmplezh6u8aq3vband2kd0lkq0keql8x65zmbze8vgkpu1x1ngrzty95192mdhhhw4woi6hytgb8a7dtm5pnqdd5xgc7snqj640l146smol26x06bkelb4tf90t2m635uovzhzm8w6nwjfg5nos4gnwl8ok84pui',
                startAt: '2020-07-29 02:31:15',
                endAt: '2020-07-29 14:01:16',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'nadwojrnaq4h3kw32fs4rf0y0ntfkizmjowg08v07s5i05pxfg',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: null,
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:39:37',
                executionMonitoringStartAt: '2020-07-29 01:31:37',
                executionMonitoringEndAt: '2020-07-29 15:08:25',
                status: 'ERROR',
                name: 'f36wcvv9ecvar7wix1bkgfsairb6azjrskzhhmxr9okt1izr6i1qb496dmuy143eq1dsuqlmulf92jari56cyte4l80ilxgcfljs9ejxkukjdgg87kptm178tp4qk9y8qe8z6erizuzk955njud1t6q99mpclpeiqd1zqf13y4g374qso6kdohi7p2gm8uj2v6nculb8bnjyh43u64op7noi29eoe6o7d9ex3s0p5mop1hos4fiaps8cjcxamxr',
                returnCode: 1453802221,
                node: 'djv6o38xev3gaqfbnulkec5p7kaio7d0ohql02gu3t277pgoxfrrz8gnn7efjbudams6yz7hu3u882zpply3597pj9fxyt7qviw9km5tknvci51yrdvojb4p4rreudpu5ziav1vj9qf50mmb336tueyd7wgvgt4p',
                user: 'im1m2xxd78v4fimdlrbn0vg0b18rkf4djkk23lfn5j7ac5micrvdz4tp49o3g5381es2hlqktpdgki90f8gaavwi2xh8n8de0q0yuqv7d1d25f9iqpvykckt0kh4km7947od17uvetrjznofuia8zkoxm6izk4duscypcqr1lejgap0g54jjblnr12y9319l5k0nqpsoj7st92wekx67rrx864eo0fqdc13vu3xoh5cy8kcdfydb8zztrb77n8y',
                startAt: '2020-07-28 21:36:19',
                endAt: '2020-07-29 07:18:29',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'aci4einp5e41x9jwvliojr32b1gvbylcny9t3g5qf0zindjhpu',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:48:45',
                executionMonitoringStartAt: '2020-07-29 04:25:03',
                executionMonitoringEndAt: '2020-07-28 18:05:58',
                status: 'CANCELLED',
                name: 'w7rahnco1092pn7yi6lplddv7ua8tmdkqtnrvrovhf2umop11y8r7n2244z854a9i5i4tc18pgz7m5jytopqrtsruo5qtbxii4ze6c6u4o1ok3y936rjmugq3frj4za9e81q8yg6jxo2jkjync1ufs9rhvcn0xesn1vov20pmdxa7c7pfbw7u2ffg8n5mxlb5u9ksmcjn61jds3w537r27cr8eoik7jna2a46q0hak98etq45lv893o02k892up',
                returnCode: 3018141212,
                node: 'bsffcl9xvoz3h3oqxie62ljpv8qbkpxn130su4pt8ijc441clmsu1fjgyv8xo8be5bb3phg4h4d59j4iqns3da8vjvmn41rz4lc72aud1gqouxknu5u6az0ypkc6jf9ha5rcb28pn018tihpa4wzr5qq1g4m07pn',
                user: 'l8v3jmliarhduetdmv3a3d69ysuemw9g7jyy0o6v3mkrrmqgqdwfxlv8y07rumv71fcccfv84rvovi2nuzzyq6khcquvxfhfz7mmhoqe8kkxiixzw2g67k5t0jaxp0qabh57djbzevy0wcan15s8iudngxl59ggv9woin24jzfwcwtu1pjqca8xs44atgw21pe1a338t6860tgdcw9d2et59mprk8hsradw213pld51rlpu5eejze6d4vmuvitf',
                startAt: '2020-07-28 18:53:16',
                endAt: '2020-07-29 04:53:44',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'yxsg7mz5crnx76tga0ia67c61hc4w5w2ry1qrn6semxbdqu0g9',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'pw07nm163fxwwov9rjvq',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:23:00',
                executionMonitoringStartAt: '2020-07-28 16:47:32',
                executionMonitoringEndAt: '2020-07-29 15:05:24',
                status: 'COMPLETED',
                name: 'ui6d2nug8mx1bbovkkp0qljadb8mtzmeucr739mkcrymb6sz2mtaz546ei18d8iezulcwb76dgfp20hallkr39mfshjrb35n126jnt4z3ge03l4vn97shixzi7835cjx6u3uzl5e2ywc0q02lt1dkiw6zj9lc4thpe0yw5x5tgambjqkmih1i5yy9kuzkgtnbx72vm49zklxevnfheq42mwsk84nkj9a6vyi8pdvcwsdseq9dvbzfkkgz59h2pa',
                returnCode: 5552089179,
                node: 'hsy4hlzaaleapqag7hzlia394xm80xstxo8m32a1c2syuy126uvn41ao9aqweq7q4e1m75ag0ej4sk677yhipqw9ek941u1mc0z2jt8x50xs3y8v0cc05p1juiedisfbefniuv2d0qpn7abucvc69hl7y8b783h9',
                user: '4udojow9phgy3k88ok8i3z4gzirpzbq8iuzg95ivhdrf3ynfl2d9hqjyl8eby6zfeskirdythj9jjco2d1ojfv8hpvco170la8zqm079kttecakxprt0ifozy2izmwffgzv96s8mhwjawgjy1zjmums9h1ccpm2rcxj2yp5ceay3kxhrffsyzsut2wki54iee3mxi12z6epy22pltb1hr240brhlfqn23hb7ng76uu4youpxuxsyi26bs93o80h',
                startAt: '2020-07-28 17:36:16',
                endAt: '2020-07-29 13:19:35',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'amwx8g4t0jzfasodgt46mm2bk96wpncjzq04hgpptiemoenff3',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'rsejcezpn89861gylwdx',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:18:48',
                executionMonitoringStartAt: '2020-07-29 00:22:27',
                executionMonitoringEndAt: '2020-07-29 07:59:08',
                status: 'CANCELLED',
                name: 'bhu4s48hhrv1wl0zrbljco7tihawdum1urzxrx5ll1adonypgbnifyviivdig69scnknxit5izt8e1uz49zk9knz9nqklivdf1ynho5ykj5sr9pkauzryx43piwd2kay3h6ba3g3mqewn0tb82wid9uwdw3upzof000g1llmjvos2wnbgkou9q296nyubzl62i4n1wx57lmc4xjjh5gpezda8pthm3gl7okhnorpt14t7zfiy7c306jf5lwly5q',
                returnCode: 4653500052,
                node: 'odvtkswunk4gbpv9m86jh3hn4x8dqxz6pyv5liusmvscwxq6fw7ibuno3xlyrtfq5l3o933zwv0urj8pssl7ayv3fbyonb0i1n82kslgvejqia2ecph1txfesy0br7p9lx6ddhamc1g2zgjgnfvu4ch2k2t28uvm',
                user: 'oqse556rt5bgt878ed8opj2uumivtf28kzih8raay7mzjftw3jlnyubq9ztytewol9nr49z9ge9xovrulkr0pritd4lxux1xqjvo4kt3dbw9w1zohphqd7hjajxqqwplxa08qj9tbcfae29fcn1be6fozz4njlgh6725y0m5niqbkfnk6cmnrswps0kj9fq5j05vxf2whimxh8buuh7dezle3yvvhbsvptnrv6v6tumcs8d35icsi661a73vbwk',
                startAt: '2020-07-28 17:13:46',
                endAt: '2020-07-29 01:50:07',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'z0qxmn99g8gvfkm1t1gkp28l3ryswp19r1jr87tbpzgzqznruy',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'wrmuamfc0xt84q81nm30',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: null,
                executionExecutedAt: '2020-07-29 11:45:41',
                executionMonitoringStartAt: '2020-07-28 17:04:10',
                executionMonitoringEndAt: '2020-07-29 04:09:38',
                status: 'ERROR',
                name: '7njakr7mwyw1d2yuj9ql3zjv31poyhvqzr1tnzeedd3fu4tkig2iu3o1jtjqz9hwx2qniedj10r4hf4dcm36uh39x1j02zr58099331mdjziirxem4b67cr3vkxz4db5hwsyluoenasn7beriz5vyua6j0rewpire6xstiqv5felsjk8ed59pclf3t43etrrl4qnin0gc9zi5reygtjttg6me8nikyxipyvzj5dekyckohzdayz4tpm65652iyo',
                returnCode: 6363062419,
                node: '4cic9yi9q9xvcner85i6egrqsht3gh4ftb5bd9kecpkyii93qpvuu5gzy44vmpkh5yclebztl8h1grwq89qcz8mklxtc6oscr8rj5jz9sn66aofruxf3cb7z2s0w0j124gjox2xnlhlapwp0zsdnkx524s2afegm',
                user: '1uczw4xv18ioe22iclj51vr6zc6o32zc968v9nil4g9ui5s4v66ltqstodp44434c09zuqdshkuu4j4s0wrzywcednwr4vdn66qrum78e4wx02ya4fa6grnkbxcvdypdmvq06jao9qnybak3ymre5botzhpu9wb4ik9d5axxr1tokdtbr257g5cg762i5j6jumtgkkvg6xpbzohfsuppbdkxafexmxc2b0m8pakl2wgdlc1xjcnzr3dcbngmfxv',
                startAt: '2020-07-29 04:54:08',
                endAt: '2020-07-29 12:36:17',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'dpljufmmmzzn347dqnmiq38h8qy01doi8dvjhtys6wwrp8clqs',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '3ue9ap22odkgz10za98p',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                
                executionExecutedAt: '2020-07-28 19:04:32',
                executionMonitoringStartAt: '2020-07-29 14:21:52',
                executionMonitoringEndAt: '2020-07-29 00:57:14',
                status: 'COMPLETED',
                name: '94nj1dju1uaumei7t2x572nbe9o4r9w5txsgd2jjlpox64g8ran3ratgc8tghqad3f9x2ga5ehkpwq5u41dlm104pa5nn2i04uo66mzgwzd5h0tmiiuk2x2s0ky0dzja2zio9o0c4ewrzcoqdz4pcg3uj5b3yi4ggfm3rkoopjqxl0fllnspvb4zdga4dh06ef3oswz85fax9o1exgspj53vd7pfdg5lo3r5tvsytpr33inzysnrg786ddnue1y',
                returnCode: 6435853016,
                node: '59xhvhoiekb71xp01nplt4h127uiek0jhk987s6955rzg5stzkrtzp47scsf60jcaff2b1e72eran3wvee2sgv9vcqtsjgwsz5m5k7zbxlwxj4nbuc7zcypioi03i74cxe2mglmfm1mwi12fbqfcw943akht4pod',
                user: 'aw6cvcqpvkp3o4kqb97i83b48atgnt6fgl7ul7bwhuulfo4yc879bjs33v3xh4xml1z1i33vwye6v0t1w2kkzf1tlwmizm3zlij7bdak6m5xpxgnoiq4ymju6h50qk73ajnj18idy1q4bieyll971c225cgur9fjmyjvs8c4pog3jyn6fjlrz058y19vj8ecjmqh9yhx5runfotcf4ts926t1d9gsd62ovkhuwdcxqatu9ec9w6s7vj6vhm446q',
                startAt: '2020-07-29 13:27:54',
                endAt: '2020-07-29 07:38:35',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'i0pktb89iemm264x9iguw9v8bbyuk1dc90mdqja0cdom22nn3h',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '2dplfselwrcys0q50l1t',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 11:08:19',
                executionMonitoringEndAt: '2020-07-29 02:55:36',
                status: 'ERROR',
                name: 'fo7jjetth7zcbl5k8wudxyq4g7n2u62o0xkax61oiqf8aqyfd50g3ii8k6kijuviieo2dvpyshapc53a1g16so5pycgp12sx8ldzz5m3j8zlmg5b1zlmqxdup07ctaoyohb2t9bvmvfe3ucfdhtgcii51nk41n6i5crbjnp4zke11s1mbwnfhmnz5r81tn4i6ba6tbvhn2g6s4s2n4eukvamdu48j4cut8x3p3frgnku9x7ky73pj9xtict63v0',
                returnCode: 7638162882,
                node: 'zdiiih6nhdu5d7seaxw8xn3zf3pewk861h45dss2b885cvd3oltlh3tnqv7l5fim7lfad2cc9cr09yb2sned6qz1ckbnnuipwy2jwqyjywrgy0k99wigiiz9owna1m2jetm9eiduzx5qugxpvjkjs9ofuen3690j',
                user: 'vw0svrqkwraad7d48pdv7eys9e6p94j9a2rei0nwt5exfdph3fv2orm4xm4qgzm59xanxf2qkv4a1dnxufa08v2mviwtpo397cjegmbnnmxf6da48zm5q02mr2iehcqpj96c9q75a3kz8wgfaa1mw3lwb4bf9sosx43t55s10ummsk503qki7ahdd8csz2ssk1nkorb2omukpszznkjuzeu61gy9532nojj2urxuea8kt4m7vwrp8vk8ixgmwsr',
                startAt: '2020-07-28 22:59:01',
                endAt: '2020-07-29 06:44:41',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'gue55g5n5gcm2vdg5s8cf48roj8qwy3h3wfsu02eix3thpvksd',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '4vdy9f17kkf554gwwnrh',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-29 06:21:07',
                executionMonitoringEndAt: '2020-07-29 12:31:13',
                status: 'CANCELLED',
                name: '9u7wtudatjcheqmde2x9sj1sn8zpn1hio1adubviawxjiqfqtsfbphxcyw6g7xeucyna99te65te48ja5lnhjl816xz952gqxlnwy561zznyfdgnw7qaihy03wyaq6y4b9f1p0h92j1pyimskchv87rj1kg3g9hxgh8lzt6ktb92jy6owyk42l56411y097p8txolbdvvo84n28e6ocnf8cpcafqpdaweydl4dmbqpyuz70dx4kt2snv3bht8kn',
                returnCode: 2312845924,
                node: 'r41y3npu9srs7cm6m33g8jmthfcw2uydabx42w86qsoaj3jh6cqcx908fehz0xcmcsbb8k5xo5sqyq74sm2ip9rcr7yyu55cy7qrykjfxh3bzc8vstdi73mphrwdov8w7w1bw21cwon3v0oc2w6bad8nynzv2p30',
                user: 'maxjt44ash5s5lz6l9cvvcem9xjxuch5ppj9a9vz2hecyw8380d46ss699kkp14i94uk783u2om200rs9vwnh8tftbqr3cah012bk5sw197abs0cdphfamu78rvt4fvdpldcsp8dmv823f1pnxb8qrb2kq5ihskd0rkvmjwb04it3b4vm673imysdxngep0v504isubj2b09itbvqnf5rxwg3gk0jy3pmoutht9wgwh74l98sw45ehsidk7rkt9',
                startAt: '2020-07-29 03:24:31',
                endAt: '2020-07-29 05:04:07',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'g9uagqv1vxwxyraixob2dn9tprdbkzi7fcy9oqvn9hjjrx4ene',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '0mjiemqwg5rmswkvjov9',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:00:29',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 18:23:03',
                status: 'CANCELLED',
                name: 'e1xq7veao0uu5xc1i9hz21zax9sl54hr7nqcz4vnkhqe9i737zgsowjvi4wnpgkk35b4i7ehzw39s0c1ghvr7nink1d4jto72z5gqjc3q0yu9mn32otc6a4he9y5n6d18yxdjo1zizj7qh20bqs1r1mxqrjt5chxh4kcnl1283ym72a338559v9nhi47ddr27qotkbp4cpdpq3cc0x37kb6mqpzc356chkx1dr5weo5mke8ogfamcvzomc6ckdx',
                returnCode: 9925263200,
                node: 'hftll17ke0j83iyn3vtj4tj2j61zk1ihnvet4f6nm97xgevyrjn1mmkc8q9tibeksqh7i6cegpswrwsxz153f6kep9glggd01w9kuwm88hvel7w1ezty55kfai3jruci2j3mz6x5aij0zghtrweta35qlqvnj2a6',
                user: '61uho42twji0bluyj44lx58sye8cw60w6e8wk9ys5l0frdgmo0y42ctgl517vx7kx91cq9teom9tx82eri396nkkukqazdc55ck05spf0yzmlan76tmmnxu71ht306eferb8x00vj13rn6v4vg65a7847u8dlajrjn1ga0burcuj44qaekc46pz779p3p3effdioz4fdfy65bywgihdkvc01otaw33ghcog3j44myri89xvnq5x1ydw7jgghbhy',
                startAt: '2020-07-29 09:56:40',
                endAt: '2020-07-28 20:56:27',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'ujlojmnzyb5t1dqp2v1l4bs8uxdhzynulzxvcmubkqvnsztt3i',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'hxq85l0wtz6t539as18d',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:12:05',
                
                executionMonitoringEndAt: '2020-07-29 14:18:29',
                status: 'COMPLETED',
                name: 'tz8cijf244lem3vcj6azjldtbp56nt8nd6yrwun5rxzuhsnnx7duwjjv0h5ys3jt9sw8yznplctmzl547081umy4r9r6rueto3mx9ijw8jhnprdp86ov7ntfj18dc1zaye6un9ladsbjt6dagplvh9a6ijiqwyoqejldokwr5kbammwlyr7ei1s3jonpbo44nsyrxs4u8j79asbdw63jayccnksgj2em5tig7k440ecfsk2cx99q6eyqqwjn5dd',
                returnCode: 2338874417,
                node: 'gkf7kssn3fzfleo07v16wa78rcxdwlnt3w0fbhjqwm78exoejnyk9y2tl9khqvte7xvhque4zwjibpyg1fqaxbe0573yjegmk65s20g4vdfled6ir5acronqrhrhnx5bnebl19eeonpmoftq8e3iv3d1t5qdw41c',
                user: '7mbwikvlu8jy4ab82u3o2p8apby99r77o4p2b4zrvsx5lipx5d0gjox3jkzdc5xtm86utvdit76kxc0vsfdgavtnvc4emqq99m37hc38w59gdb6qz8p4upq66b58rajcyanrw3ilt7j23hx7rq9x9cn7d08dlqbnn1hv50w7m6ahvkkawv0bqi5qgla071v2osy78q1i6ptv0d5u9au3icpmldkmxw6tpyrewqqi0jig1slvluqa4xrsujtrzkq',
                startAt: '2020-07-28 16:51:19',
                endAt: '2020-07-29 07:56:17',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'yue8djhi4l8cewu1xl20n03yyneepmd07m9j3kio6rs4acoyae',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'rddz071fzjxunnm7bv53',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:19:11',
                executionMonitoringStartAt: '2020-07-29 12:30:21',
                executionMonitoringEndAt: null,
                status: 'COMPLETED',
                name: 'lavfry4emn8l1toxbgd3p40r8538t0p1wbldyn4bphyrru01wg9qxzfhtjwfs46y1s6ml3vpbzim8z6cghxcm843g0zmwqogjfqou4dd59sucuxktifgmfwv3gs4a64dttztlb7mqndfz4qo0nnv47sk7u8tqhw6eaqcsxbhx0kmr7aegbjs00gb9cdrmcdqr1x1f5websz027ycz2okbyxqx411u9g0wwgt55dy0aiv05g3dje4auajr4imthz',
                returnCode: 6284068566,
                node: 'u9gakfzlknu6245xap4buqo4g2kjhzyvq024w8dvfk5n0po3yfhsv69rcdke228u5j85sqjym5rn0vlie0fmnkt6l9j2hz5ycrqfgonlud19d0hd59p5grmuh6d7zz2kdvb2fbemwwpdw5nb5fjuglt2djoqr14a',
                user: 's1vxr2jz5w46ctmmyjgsmv83m73a1y9vkwxfg3zw9mhe9stq3sunl4rhwh98rs8oi853bfnlqnj0q70blo8no5m1wqysdnvhswmk3w4ipy0ik0u6p5nugczya10mcrjvnfrvdkudaehbplckkiauha8z7ijffb7l81w9lkjovgmc8y9qubdvkr3vf1ous7hd3spnnrj2z3hg0wqqn8rtymci85jult7r3udp8pdryqo7r54arukcvkqwr61uax2',
                startAt: '2020-07-29 09:16:23',
                endAt: '2020-07-29 05:22:26',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'htosg3amfws3qfvf1aw31yqy9ggrxsm40th5t30qfoe705ca2g',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'q5c8eydp21j0bzl76wyl',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:54:27',
                executionMonitoringStartAt: '2020-07-29 08:17:51',
                
                status: 'ERROR',
                name: 'cpjmjvilgfnqy9efjfygreoupnlhe6zmqvad2yepo3t1gk2h1mg0m67mvyyfh7tvhfay223d8xvlulkt6296u0em7irgedwp0oog8nx6xsioi8b1qglyjpqyu8r6d82gk2vkz9j8jr9c8uxdjdndwro4iwwjbnq6zlnqvhvo696bxekgsfwoz3snron5xuldjs2mq1pueyietdmsdf3mhgoot6bt6j8zd8oay0ghvv4s598agia02smtunw2bmq',
                returnCode: 4777181853,
                node: '470uxhho1enxy6pdm8ozviyltfvvxjkdpwixe1li786kv72tzosq7ey76gdcg94c1t4zxt3okvyh0usux18fhd74k6qht2a44kepsie4l1oqf5zh4osc1y9hv3zu1hwpz69frpwzlwik42na4ookyoly2ym1ogya',
                user: 'u253qelnu12e3vbjjsd93xkkxm1l63cbmbl5po80492dwpq86zbf6m5lhyyzwxbkb2bl3ek7ilolixrtxqpp7oknbanl5rzz44b09fmaaj7gktgjkjbhe02cn9s87kwrmnt6jm4vb7466qh83gpnt7s0a0szn5p1d54bxac0ez6wp6n0u7ubm6k7y6oddqo9su41haq17cq2qvmj60gypufxkz992ua3ut69w1jq4wjaf4ycdcgik8snfb0hz74',
                startAt: '2020-07-29 15:09:25',
                endAt: '2020-07-29 11:35:42',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'fpgn1z3qcq61cjpyp5u3yn2v2w668saosok5seezin09mqvf4x',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'z3eddzuu0um47hso8b2c',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:23:20',
                executionMonitoringStartAt: '2020-07-29 06:29:27',
                executionMonitoringEndAt: '2020-07-28 20:41:54',
                status: null,
                name: 'p8mwlrhnhyac1im6k53aurseopw236mlkwvkbc1l6juif67tggates6riggkzweb94dwmy73vdi73vx6wq0r2ujz81jc7eewrr4knjxqpo98olm3cbg7jrxi1m9whzqnto5bqavst8wp9plxxtahvykhxm10rpb7tv5t3djtju77bi5js68aebnhh6ajrwurqz8f5ws1fg34effgbj1eztia26iwpiy401e4agz890p7xwdjcayqe8pjdv4ivzu',
                returnCode: 5055210453,
                node: 'igkdizikfl4kd8vtv1ba6x6d5etqqgk7r3o4ezx1690bh6vgyti4g0ae76ujqahhod85hvyloex2pkhufllwz7ha00oj2skh01wcsf04i2oh8v4isq4xsz7jbofoay0qzfwfah14xjsimoj47vrq88feht7v6m7j',
                user: 'bjwzjsn0spb16ylca7itsrru60zmogllozcn4d2alzsz0rrholagb77llnvi5btu9p0y2yicunwu17woqi7mg46v7tprulqu6acy76tc618w89si27z0zweuhfxnvy0lu0kko07ij2euofreqtzea2oqnrr9zw1a5vh55jxiu7blengiqwgygm9kjfdgcucva5yfh4x9r51orlpy3u48yh21kg4sx23sfpjrmv5nejjyosobqh6olmi1vrgvdtn',
                startAt: '2020-07-29 05:48:31',
                endAt: '2020-07-29 04:28:52',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'ejs9ikjm87xyqgl4r5ee2bsu6m34ula8mo97s8m4rce6s56zfa',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '9g2cl7bk43065oq4vtcx',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:28:31',
                executionMonitoringStartAt: '2020-07-28 20:54:25',
                executionMonitoringEndAt: '2020-07-29 05:23:53',
                
                name: '743f4md8mbb57356y4dy2t59vbuw0c38laawtqw4k7prc4doiu3cb94rqqdcy4ousmehaywyl6b67lk9qq12bw9cjb3qqd4g050cjbdar38q0ddi1zsnxoum9gjy2sldica8scs1lu5uu94uvihchfo8d1trfj5z8wiur40o209ktybhf2fe9s3ni2m5c4zk3fzy8bx7ipvzgi6ah6nwhd9dh94utquyykik4k9qykg16dbvjs5tnf3ndkkwbqr',
                returnCode: 7963667578,
                node: 'hpst4jhw0tq7a2caeita92sui0luhqhqs332xva64euhu8zw9wvns9zqkl6nm1yhlkz6z8xepdvwokl0322fz31bd00u5o886twa6usjl1c65a4kwmaa3l6zq9rjfgrvr469bwhj9eh2mpyrwfs926m8vu6ki8l7',
                user: 'r5hzjdc6r7jtavd0enti6z0yrbtbxse016ttqgu351j2tjlpowbw5320asmkyp6x0cu797iokalznj2akghp821z3uqr3bo8h3t6v3v4ceo1a75n24fb89hjp3rq3fejmzovhiq1nskuuggiyfsysaagkwd3ws6874u5yvis6la8v0a8jovlw2qzp41mjyn664semezjx61y678xe6e9ih40600ws4w3pqor3do2gqva1r3vub5sx8al5hqmrm1',
                startAt: '2020-07-28 16:55:39',
                endAt: '2020-07-29 07:53:57',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'i45i3ya6n8lrhdkakkcgg5vdppavumpdpbxac6q0oz7mmir6hm',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'mi4vx2ydcdwszxtmppfe',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:42:16',
                executionMonitoringStartAt: '2020-07-29 10:05:31',
                executionMonitoringEndAt: '2020-07-29 10:07:50',
                status: 'ERROR',
                name: 'al31amr59qjj1zbcba3hmqaj8u6e4901jxfq9pmke1i0k7yj08gvwaby8hc1fvh4ypa85dr5tu2cnlhom9pkbco2aahhpthqb5eps52vs4oz8ixqyau47hszgejrusn7jat20e3pa4nkj85y9yorpipnksx46xps4hsx0xcknlhuyxcg11xvxz6yseo3jgqjvymwvtzs6c8ak63kf8riam6jp8ywr06ptzb7xv0vg7kjm12n8o9me2b2zubh3vm',
                returnCode: 8785913713,
                node: 'yw5xtz9y3m0qsscjns3kfbsd5pjmi0asc772lq9lecjqv24iyuod79j1i7dh6uy557y68vwr5nspdppfyeo19hiv88zs21zxmucu7xpb590z7vs3s55r88hbgmxlr1jsk8wl3mejsfxq4xk0q5v7g1cskfbs64g5',
                user: 'cwmdewvqvfi8me9rouxdq5v0cjxypefp409zanj2swkihxcceocd4cl1jxwhy7l10y8s406rna97qzufjdk4ff4r092dt74x167zy5iiekxmt9nu06svmk990p1rvocyf7cp8qu13t0p39jpuiffgpmugqujfvnimfqe4y6pek8a7ocjevc92xkh2qrm2orledt42t1z50sz6t9mmovfa0t63abq8n6u185twojyjazg3szzaloycbooatuxhpr',
                startAt: null,
                endAt: '2020-07-29 12:35:25',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'xvjog5igloxdgipzj7lbxfgtl840m3y5bfsjjatbk5fop9cbvy',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'gvpljprvvfbj8te4qdal',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:52:48',
                executionMonitoringStartAt: '2020-07-28 23:32:42',
                executionMonitoringEndAt: '2020-07-29 13:48:29',
                status: 'CANCELLED',
                name: 'eez3yo8qr8isf4zgcglyhtovkv640k8i2gddxzrj0rgzz3hevru8ia3cm8ge97b2podyyii1kt81kdhohpj09holvhqthftmo0cp3jg0y8viv2veg9kx4sudss0j6yhl13wya0pybmcud72qk2zvd9j19c6kirodgrpzyvj9jfcp3u3syrn3icnsr0h97q0k3xy2am31q80wtobq8rwssyztn5a71nm7y6h8mlpgrj0m5mkwx89tda4sdv0zuw6',
                returnCode: 6714180281,
                node: 'qs4d9m0ywo1g0cmn73xmmdw62c3oseu1ab5md6kfxuykkrbrh3xzlb2zykfkbplhn8df8ihxxymyfmq8fo4vd7pftnixihgq8w94glcpk7ihxkaxerpix0pm6egwesty50bzva8v0zlqpmggzrjvg7imf5llrbx6',
                user: 'qh6xo9gx1x03o5u0nfnoicp0r40cv408rv8ha8ju9k36ixjdj4ct1p2t4orxz55s3b34swfhnvrt0y5dji9i5260nqofroigiuc46mbpgx4qqb6tnxjz1h4s4usdetq2vzd973aoppum51zb7abv1y01edsuufnbvlpybrbhwok35w8d9wlgo1r4uq4nz7h0da5olanxe2s165w7wrzfadg8qxbn8joxg9qd601n03dm6aomgwb0jwe0t28swhy',
                
                endAt: '2020-07-29 08:02:07',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'b5lb6h7s4ohaeux2n5ccz9tv2hq5jyfp8z2pxx5hbiry69tn1o',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '62vkuuelrjktfqw09jtj',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:24:24',
                executionMonitoringStartAt: '2020-07-28 19:02:44',
                executionMonitoringEndAt: '2020-07-29 04:58:31',
                status: 'ERROR',
                name: 'fz9kn5ucqaqxt1zj27s5rdrba6uu20et2kbjw4fh5vws7ub4ur6vsjo81im0v36xolh7kvylrmrlkb6pimnhcn2o2spk6seeg8bo0ltci0r2s855tiioit42tc9z5uyu9d5ay1e1m29vwsti2207kqymfici6thda8hp0gmod5m8szurob1tv0dzb12ftay03wm82pg7ul843hzvcfqenv8cepakjbq4xxyb9ttetofsnpon86oyrysfpxdzrvi',
                returnCode: 4030335316,
                node: '5h7mqtlbitgf8e6x5h6wefalxu7l1u3b4f2w90szwjnbetdkrb7vvrkv30q9i4a4monipmqk8g7voi60w6stzvmqayt55q81w4cne9q1qhwr28otlfb8jf5w5d1jcwqae4ytrba7gm8kz5lb3kr2ssmqft2p6pqy',
                user: '6v2lf2gzpvvqfg5junmbumysvdbf7rwvokro09qo3pvqqb55tujmii5pb4jfmbbtmffvj1rcoooz7jencr1kbnreswm280hwtoah0fi7lgrwlp785845tkpz62cu4ird5n1976cs945wqbklyj2rlup9w86vpws4b3xaq9inzt6x7q9m1u7e7kcpzerxbpngyrrcm09rk2urprg2tbn4nj5nwfa7oi46rrium2nqpvlwwkonz6la0v58x6r8rov',
                startAt: '2020-07-29 03:36:27',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'ibew9hul18ymonmzizreh25ax5w64hpfwldrv20367hjy94r23',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '7svdmu7r03jsf2uznh3z',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:50:25',
                executionMonitoringStartAt: '2020-07-29 04:12:26',
                executionMonitoringEndAt: '2020-07-29 03:03:11',
                status: 'ERROR',
                name: 'qgyew3zj7rqghiygooi66x99b8a7w4k0fe2qxepb343xp396rfw0bq25jwc4l7qw9nlkdeiya81ue3tecvyp9f71pe1bwj3s1uv2ccdvlb6vlz51474xk94xmb2pcd5ds9od9fl3q75dd1cae3ndr5lwb5iaz2f39nh6k1x8mv5pkj1512pnws6fz4yf2o5i70jzg3q64j9q3btx9k7kej50otdal91qc9gtw5dea9i6he7e5hiwyk0fbe6hhju',
                returnCode: 9652878530,
                node: 'l8g8wzoeonx0g1amfou9rehn95umx8onfu102fkv236f7aiuvlaigkzwp1x3q4ktvcethz0a4whvmhqofdz8p7bb0sl5s8iqpqevncnejujd1kyllli8c4ldl5kw4ua65th7zdb9vbq5mibmi99bc56io6hmbn1f',
                user: 'j0o0jqz83csnx0r1xflzq2vc58pg4r94q1zswdaii4844hbsdrdwroe3jz5z4j21skidegqpx30gyeetxm2ojwx1mkllquln6unfjn4mrse34qvrjm48nutj9juvbcyibji6bjl7kamybkidp6n2iha8exy4k6ua3x6wapnav5cto8eg63g3785tqq255irayu54pv6bhi10kq3ckk7lc1lnakahjszrf9zquf9vb6zqpas61n4pgcr5soh4aso',
                startAt: '2020-07-29 10:57:25',
                
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
                id: 'fhvrwr57f3wmtrdx6f03r4yk7oszbqctf6ygs',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'ob3bp38pqeyeuy4repxxjtvyvt1dkaayc10khuadfv1dpbdjv9',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'l5reklxw4zwbpcc5bact',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:56:10',
                executionMonitoringStartAt: '2020-07-29 01:48:58',
                executionMonitoringEndAt: '2020-07-29 00:06:21',
                status: 'COMPLETED',
                name: 'an5e9cjo40qd8p6dovk4bqn7ny7a8au5xv18577e9i7trdh7em53eo9mhwly6fxmrlhay2utnm2amyslnfy4138gz9hhhctcwjg47gf7lcx38t633ow2hkz83cy8svmmfqcanafld4dyvr5u3b3oze7iyq55pklow9yjkc88nm1yg1o0yay6u5zuc14suky12rxa4cyxyasneml5zpz4v38n85amxgrm8gjf8aim39s2nweczeo5z29gbl18y8l',
                returnCode: 4072402037,
                node: '7db637vb0or3csabci2qfuf4xsecta0x4pavagxvtr64z9w3ql8ki2w3crtg7w5vggoyldvd4uql8kf5l5xmgz2o4a3m4vzad1pre3o1kl0dsiwwyjrpydkhhu0xxgsa5h93idjyonvecbair1njuusv5l8rvqe8',
                user: 'ynx2j36r5tcqkj79q5tyl7wge9k4w5izaf9ez9zf4nddfs75je7b69i827irfl0blw66oytg6d59kmajmpimdlzxpodo6ennacmvb4i5w85j2dq5eg52auv6wl99ymrjey6f6tcqh8pcws1a3tvzwos2pdlm3b0uk3ggzriovb6e20rsn32xmg46b0upr06hzgdfh2mbdayunmgbidyq8bbmnmjqfw6iimyuhcjq9q5xdtr97lo19gab28ar031',
                startAt: '2020-07-29 05:04:13',
                endAt: '2020-07-29 13:04:04',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: 'rqf57ejtrg7i6havlef34eg4q4cs8x639elr2',
                tenantCode: 'no42mu0azak7yg17bfk5hd5vxl6fz2vscds282c4y01qgrhyyi',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'd37y4xujypl2hr8q2vmw',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:19:09',
                executionMonitoringStartAt: '2020-07-29 01:40:21',
                executionMonitoringEndAt: '2020-07-29 14:45:26',
                status: 'CANCELLED',
                name: 'lymqc5b762tebxork9hxaqhpxem16ygvpl6mgw4o8tqbhwmajw1dmnl11gptmvbxtjpdvkqlpzqhwlv2uqdxm563xqx3701v38scsct9z1b1uwnoo5721arogzobp78qzx8u2vziyppvm7k3vn0ddpe3onaxya1n80x4dwvw53yf0w2puz8gqhplgyjak3z7jpu9397c07q9cjt8izr62tughhvgcejr9ejsi0wy2xhxt0ch5jzskf10p63508x',
                returnCode: 4845152255,
                node: 'brno1vrvv3goj017bqii4ro8irpq86ymkd0jhd8zrpsn9n0yk2uxqhk95tlqw987vlhr9i3hldalp8xtklebvem7ptt4hxvsqitmcax521aodqffde56i96pzdw0glyptok16pqjvkyjm551lxy7th6tugebwzal',
                user: 'xsyzwo6ibixzy3jbjeip3mkyxnrdatde1cmulqlm6mrh6r3w3n1k8j7g13ft9xe4t84mhx264yjlnpfwz891gob1l86qzjuig63n9q456ssrgivg7qppw0f1bbh9jjkpkqm5f6wkvuyi79rpv3qkpzar0183qq2q68vah91tjm2s3qhnpwds6ki2sqk6sqg1g179jrar6y575kgim3c0m6ukdflozhxkk9zhgpnh2l8sp0akk8p03kjyo63w4ik',
                startAt: '2020-07-29 04:17:21',
                endAt: '2020-07-29 09:40:16',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'ffhq510p72m3xc4oljjgzg5x7nfwmsb15dytxfpbd8v8ztojpd',
                systemId: 'iexlzj9oikyjvcu49dm8kcitrce1e7kel8epc',
                systemName: 'apl4wddgw0our9f35lw3',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:52:53',
                executionMonitoringStartAt: '2020-07-28 21:42:00',
                executionMonitoringEndAt: '2020-07-29 14:25:33',
                status: 'CANCELLED',
                name: 'h2i4a8jknkixpuhij1l6w3mu31j38fx207p6mhea9sbywj1x716x7mb7hucfendpm6zggae419ey5o669xzow6qmcbnjo4o7xci3hom2jep2ej9qs2q88jnr4wl1zdn28wmcg03a8mb7dy3ivdokr9ryvresv17gxxeezfjtd8sg9v7y8mxe7mficuko0qulvsg8d318j8m4093jk0o48c5affwcfym67r1jrpp1ft3wfbgatyiiqfwn381ks6u',
                returnCode: 8152296561,
                node: '9yat65t7vr5s46m5mm2fiplzfzdnz32czni45mxz9j5pk283ckmko79krcpxee47rvge1frb70o6kmqnf5r4mzfom2qvv2j6fs7rmnb8zgeqafwsy9a4xn4d1md53yhpm8hcs7h6tysw6yd2xaalmmarr1suy47u',
                user: 'htku45n5w6s3ab2b6u5zrb8oizzzmzjsfb5olt15e129uytgmg5g49i9xd8146zvm1ecvxgkwsakx1yu3vq7brof5z3naearzftim33pvsybngff6igorlmmq95o0dvu2rkg73kba2dxg5svor1i5gyib2wywbeorozcfd2jbq9sro6n3r6tkzwmafmoxbrc5ftrrosnn6c96ygh0s2ff3aak2d7hl6vtckr3uoktom5n8gezymzq9qdf1y5ety',
                startAt: '2020-07-28 18:11:37',
                endAt: '2020-07-28 19:16:37',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'v99vf3jn1ccxlamd1orjhcxab25mtp694bsdrck77vqiigufct',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'xohx1jeumdpfounz2ycg',
                executionId: 'c70ja28vq0hqx915ywk469twdfv87ala4tcra',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:43:43',
                executionMonitoringStartAt: '2020-07-29 01:58:35',
                executionMonitoringEndAt: '2020-07-29 08:29:17',
                status: 'COMPLETED',
                name: 'r24i76jxqpdl3o381xusytdxvwjgm63g26r61ni8l6jxmc3mzh14vwshiauesprgevf5jqed8ss1fvpqaj386xfg8ww7euhe0lbvj3k2yaetpq44rugrjfti7aj5judbuhpwrnnv8qg39p68hmye0k1ksk95wcu6ameruhdixttm19esdbo0d8877hknxy6yvnbl2kt3cstystznqyx0t2ji9rmwdzbl7dngjgo2rcppaoayizr3x3js2l3qf6o',
                returnCode: 4775256244,
                node: 'w5k3mfq3filpf4mbnxd72bttvkm5ovzr1bro66hhsh3fojhmumjws8msept2l8w8xzk70ylq13uusqaj9iavlikwql06tshcb6h6lxguufnlujz1pg7bgvhuqmtvfcbf4acewkdoi57z7ko7z7iblv8079b86gui',
                user: '2tufidoq74vtfxstenryhsjnrpe49lc3cyx3tfydn4kqge9tnvzei3wqk9t2b4naha0k78u3wn9d8mapyf4g4qa3zsqohz5ph37iotmha1l7b7vm2nen6exg0qp7ubzbetlalxpay5d0gy21ou9drn0tgf3xehyulwcwdu7tu62qy3sotf7k3o6x95y0oxrcca5h7e7ayj94pl8iol72weajq9tkf7ggmmxj77ws0e1hmx6bk36r6ugrv8lmnwq',
                startAt: '2020-07-29 07:05:05',
                endAt: '2020-07-28 22:25:13',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'oxamfb0kplys9tk1qhqkn1ttm85lyqcgo6vzk4kkiyeeh3leuvz',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '6ivw1xxitk89hqdluukm',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:15:25',
                executionMonitoringStartAt: '2020-07-29 08:24:29',
                executionMonitoringEndAt: '2020-07-29 13:53:20',
                status: 'ERROR',
                name: 'kbfe6qrifeeqetefyc9id23uog2zt0a7bliw61we0k1a6dm8rvk2hf68mznoc1gdfr7c0unxldyzd8nid35m7ek8o7hn6w1re5oei5zz0dpyivb4z0mm1ris1vf6hjw58c8y0q2xa6na4mxpmy015tcp2fgva3vzkxvag5fmmrd396pisa136bko2x59vc0kayjwim3rcglh8urmrvhengkf9359p2rn6agbtnzk7fpuajvjc45gkhji6tw7ddx',
                returnCode: 4392120425,
                node: 'i5xs00ne4fg06g1hsfwe4t7mrcvyg7tqols106ykf33ythck9yhqnfl4qaywz16vh380tyhwqbax22mdtbg3gdmeqde70ges0kmvntx75ssrpytw51516qx066rqz8zp6g5u1ygrv8ggv05zj4m0jkymamisouke',
                user: 'yvhnmll00ez4s05wxbe1d2xn1tdxafxro4qb4ws8xld15326n8gk440dkx6gzskn5zz7n6pnnvs0nd6l197yyi7r1bogerw9ww3cd2smp5qwzsbp9guchyu048wno2dl63q4t3zt9efxxy8sb3bec01kfvx4ai9plxs99ib25ceg5jbtkq59ud4rwj55wauj2zkw82bs3gxy7f4p05g58pu4to9gs9bewbnr0kntqppqux50v1mp2lntj2attju',
                startAt: '2020-07-28 17:35:28',
                endAt: '2020-07-29 15:22:59',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'olvfy77mtf8cxb9nln0o7jn765tevyrugpj10rc9306nhiz46j',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '5ljk5yh9pdty1y2bvsgth',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:33:45',
                executionMonitoringStartAt: '2020-07-29 13:51:00',
                executionMonitoringEndAt: '2020-07-29 07:28:42',
                status: 'ERROR',
                name: '8pidj4swyvop6cr6dtpigf4xwjm513fz6w4htlu08y527qxcybtrkbd9ztdkypztqntipv0unrp4l35mnv710ysqim5ul5tusc0oqeaj20m6dmh9bvwm9k925dw87ab5cuakpi1aaai51rgtt9u4nd0ouq4u9kjpf0431cjqln42rwusxrtcg2kzk5kky8pd839oiroomhi8mu9nc64padagekhoqurtejtmrlzuiltkfiss06auazc4gyghhvp',
                returnCode: 4664464304,
                node: 'gyhbs43xdwhkj3kxlpg2wwsgpr93obhw8kwu04chzqij39z0wb0v6f1mptpwss9txnd85oz7g0heqk0afnbqoks0g5qk1h9bfq6v4uyn2w3xuw2nl81wp911peoqqqrbjp5x88m6vbwz5v9nn5m1estpd61m8tig',
                user: 'zk8ahzym69odxzll8qpgtzk51acpknva59txxlkhw82s5gymjeit782oy1xeggdphzf63eto6ltu13m0ezyxfbv9dqk16np3aq53xsxszxirmrqy1btgsqbhzxp983rfq9odrxo7ymdd8jv23q1yncqumsegue7i13a7f7uokxkvizobsekqk77iinkx5g7iiyxicdx9sr3qbkcpemglhgp9eq33f6izhwzg5unz9nextejq4eysqq7scyz7bl0',
                startAt: '2020-07-29 13:11:41',
                endAt: '2020-07-29 14:58:12',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'zgnwt7nop2pgtbdujahwjbb3orpv3wpnwe4uxs4p6v2ewva0yl',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'mc64kzgfyifwt4qimkmy',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:42:44',
                executionMonitoringStartAt: '2020-07-29 12:24:19',
                executionMonitoringEndAt: '2020-07-29 13:18:30',
                status: 'CANCELLED',
                name: '5vr7i8mjmw1og1eild6j39vswrn49z4v66c2o5y5jap50uyy66axp5i5qicpd5rj9j4w4cqxvcblox6oo0wc1h4emd8h02cqu4cfpahu1emryq0y28q2f3f08atm9ol7qvarqrznjrn0saapfkf42qzbqyf8aa2nd6ipx11akkmkvhzmrz1ivknmqyzozcmjzr683qt3lnws8ehc7as60nz1a41w0tkkohwdj6qkh8g708fn5t5e9enzngifcbyf',
                returnCode: 8629853800,
                node: 'zm4xw0q0f62h2a77cm0llv41k0lypzcclyuzl5bkujbtm62jk63vsziijr9czujx1nvucd83r89uks68h7k20e3rzfcobifc6qs5f3rng2qyxo3ibdke455xids1406jsgfsf4cpbo6dnmnwmnr20oetk05yep71',
                user: '2ayhwg823baydc80h8mz98zn9fzbjf2miiru4u076oskgqeed7d25bxg3aoq4rlcezftgtpkmunfuiutmlgd4bsjbs40wtl2zp3tyke7oibe6ibztkzgy2dxixxtilfbsovde70drrsetu354r3p1g8rk8vl57ofgb6qtk059oht2belny8qt2juz7yfuuztc76x2a0jouym1zpw2cri70l1w6mvhr6mk21s2xovaz0hkmm2y64y8uup773iqij',
                startAt: '2020-07-29 13:07:26',
                endAt: '2020-07-29 08:21:55',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'vgmd2jpf21ao09bduzhzk6ukogoa5vswwsbvq1wunx7t4qx7pa',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'nkyxwndzxqjapdrcbdj0',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:23:09',
                executionMonitoringStartAt: '2020-07-28 18:41:31',
                executionMonitoringEndAt: '2020-07-29 00:33:34',
                status: 'ERROR',
                name: 'k3kbqfq4m69q9nqc3vnb7qlfs8jc55iw09fxznhy27cwgfmxh8wjc1ns7826fu2nr3j7n4yd7n3bz3h30dhg8fe0sk67nadhkz2o4nqfwrntpdozy37le2vojh9w1dl4amn3zu67816vkfxtmcvfhesvri1s8x0qi2q6po5cm94uo5luted3o75xxtcmul14myjdatz5aq6t571ez8lhnla5ve0axr891dqgvzd65al26p9ce2a2yhbhutrm5x9',
                returnCode: 55322659943,
                node: 'j6liqfj6uezeh4bdgzwi5034lx54b2bxscnf4v3uf4w1zrtteqjdee7ufvhygm2gh9hli7z9ygzrxvij30bpoy61oy8ullrb1sjj8o7fne2pjwto4oqwk800mvdtmvbq1vfw4ayx2bfqoms9el6p6h62i274o4my',
                user: 'zx65owrs1dmnr97n4k2ia0q3d7wk3hrj6enl3fe268wh0d39kkwg1e96zwb7pplot6scv3tbdy0c9wxhvl30elq2kliofphwi1osxxitxsfnq7zccvqcn6kvrr5d74kjvk011swp7zfigocutehhg5ci4q65s8f2l0jvpdsskddysm9zi6j73vf8rex09s64g75frq1qq3fyxzzf9k67m7u4wq995iarm4z9pvqz4wg7sixsl1up5xmfmjc0wze',
                startAt: '2020-07-29 11:35:20',
                endAt: '2020-07-28 23:45:38',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'mt0v07rjm976th32y0so02qiqohc2rkfgoutmlnakdpnb1ecbe',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'w8ekk9hxq1tx7vmmrkw4',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:03:18',
                executionMonitoringStartAt: '2020-07-28 18:49:23',
                executionMonitoringEndAt: '2020-07-29 12:54:55',
                status: 'COMPLETED',
                name: '3abwimhgezybv0ruifipmptpasvfhs9vaac6dbxo12tmcx1w1azyw6a0pssudj4b02u5oj5cy0prwx8xg7crbf7qlb0o14w9ufiatm04p7j2ycw7c1k7x0xau2fboro8howhd16hyst0uqgb4fddxejo3xe2naiilszz5fkjrbq7nbjn1xbkwnn9m4tp502ur5dfm0vfqnceg05nifsfdn31dz43nophl9cjw4kp68vorsib4zeab6z2wrjunnj',
                returnCode: 6194050173,
                node: 'hfj5odfgwhp1poill2zpavyiazu42m550ab95e5bqwugel5cent7qulxy78rgsufbxdaktpm0sttndurxnqxart5ipu1ykprvlzwgmb1hexv27wcbwesa6ocjxtkejtr2mtbtpnjn9xrgnwbi1skzhor5i1ijyrp3',
                user: 'tzg1ccqsb4inxxhmrxe3gohg43m9kxjxcdmukvr84dkbzvz0t38fcyfhqimrfmhu1ihbgjehv9stnmi0l539odm0j7cumj8oirw26338dqmbyima3p5h2imil1d708gi6oec5vsr37uo1sddfw919o5dt9vhmtgwn3z9jlcb84pa851tiihsatuirxzfjblne3291rzjnn0pq5qxagi5u43d6p2exvd9bglgr3zcuseuiaxc9xfs4gfbpyk12wc',
                startAt: '2020-07-29 11:16:34',
                endAt: '2020-07-29 06:31:29',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'jtrk0wyecxclwff3pa0jhz6aopcbj7qdwalcp1i5cxuayx1k36',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'hva9v7yyd4temohqogzb',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:33:28',
                executionMonitoringStartAt: '2020-07-29 05:09:32',
                executionMonitoringEndAt: '2020-07-28 22:03:17',
                status: 'ERROR',
                name: 'x9bajecw1wphel3z6ajhzmb4b7afyy299wxpz3s9ig2lnuvfepo9aig5nhu97qk4ssvf29mis38zr2hx2pmshc0mwzpk7mxduqtkd5o3xnq4z5hrshsn2o0ah1q22iox426qs2h85uac2ynwq3sbdtc1oxttsw43wrz2p6lj3u28fyt1sktazvwmrjqdpwho2oxlh0ucsgq9sc21ky4xxarhszmymtfqr4gsai373qhf5k6810n2fnazo6p9znc',
                returnCode: 5282153439,
                node: 'a3s16wegtdy0jqsj9o3ohkb22ghjs102s5xihcszvl22z6eh2oik70yazrziwuyp6oxq9dnbs6plaqjsgpsdtkmkki335t1wjzwa7z2ts9y9y9l50y5ar3fzq70yne174h376s3k746nobr0y3n6qex5mswdus78',
                user: 'qx0icm0lgzhadwzbfk1rn55c4hedsh3mh8phq70smqjs6y4nxy37lj0f0y5gg1w17g6vsiqvj0l14okx7zeqzdca8od6pp6qyz0o6aik78bbfoqfcq4bqa6w4cwzeyjz0dush9f3y6fsdhfolurk2i7z5r276j73wny98fqkeqb2pupu912csyhlrahjw829dvagox47e3ufms3l5jt1w4zkes2c2k5ynzdc04lwdowy185f6x5extfb4cjjbncg',
                startAt: '2020-07-29 05:35:48',
                endAt: '2020-07-29 01:02:49',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: '0e4ym8hbbr3jlb2dnpahix8brzxpio55qs0i4dm8k1cpaq76yj',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '9hkrrirhoanj3w3jc5sd',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:30:48',
                executionMonitoringStartAt: '2020-07-29 09:12:48',
                executionMonitoringEndAt: '2020-07-28 20:42:21',
                status: 'COMPLETED',
                name: 'mbg5lcosrsqj8yps10rb7x0viplrx4ez1wojpsokoi4sq0x5ry16h5bvsv4vtideb4pfpvd38rj2pe5ava8pjvuobwdlghexdo4rsoyb0s1a5ibfj0zdhw3sp600t9utkdnm80m2hebmt3omz68j6z9f9k55k1ytx52sp8ff34byf7fmf05pika8u6l0grg5xon5vcdtz19782js8qpshrsofp1preqfsg156tbwlkarl1kxy6ywrqdbqhnxe0n',
                returnCode: 100.10,
                node: 'br0jmnd1iu5e49e5az79zajgph8qjvz6kon8wdkdzambc4n8cr8g33od5xj8otxvt2vqxmn33866vi5axbhx830p3hiua3vl7qf6w2wzlo2ky7fhglnqq7ewabvae7gaat51zh17r3a7j48xq1qmxadgaxfif57k',
                user: 'tmx57w3uop0zi3taqyud5zbeuhzzaoz48q3qgqw7xzfd7r6xx7bcy2e3y8sv47qva8svn52wyx9mbhrsq9lfnkkr3ybb579iwb5dd2cnogs2phnpo3x74pop419msh1xhdvo6nm10omzqtthtrcgqzlmfmxlhmsq0l2phmz1569jqeiqp4pnc2n4q0kia3fvyjla47ydohmts0mn1rcfya9qdz0azm2h2dvt5r0b9xyv3emx6k9d6koeeghoz8o',
                startAt: '2020-07-29 14:22:19',
                endAt: '2020-07-28 21:37:58',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'jfubz6ez11gnaldqhiu3fwtq52valk78irnh9wxvq9mxsdr0pd',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'x57x181ografj8tmcs7o',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 22:47:55',
                executionMonitoringStartAt: '2020-07-28 21:40:57',
                executionMonitoringEndAt: '2020-07-29 06:36:21',
                status: 'CANCELLED',
                name: 'yfxz18wgi7adr7h8b2cs8sebhwminclkhsufwtjci5rejajoe1cv1c87doyv5exax18xx9n7vromq6u70nde3zv0xi0qg0aijl4vguow1r4pwlf8j4f02wz68rjt0et1oj2blyljhc9tgbe0d1menjxdre5viqb878u6cl4aoh3t4i9thi0sttrkalf5339juy97bcya0s330t2yikvnm6z8sjsd60io49o6ij69tsgtgihsa3mq2e9ii8ek2zz',
                returnCode: 5053888866,
                node: 'ug9g8lftwt5xn1fa0hpl5ayeeithzz4gkejx1k8y1up2cym029hc10hfqfu5q5bznbyfssgt3nyt3s9t76tl1w768h9rf2f90nxlbhxwauioijirulkr9dndxcla1cjrpcubqcknhirz2jk2kyehaq2tvn459a8m',
                user: '9knd9qs9or0fglb4qzxksoq12i2zz1lgqsc66ikf5e86y2blqcmwsewntsc69f2pvn73k56ln46784dj26pfgmjt5d0kda56z43rzn27bls0h4e8ngc2jfcck8mbg16nsa7pke22x16t1ak2slk93acxo8phta3wgjjpa8k990x20jm7o4liladp4mq8uasyylnq2f08ytnee3tlvo5dlfqq9xrmbh45oo9k3aguqti915tbsahjamtr096pn77',
                startAt: '2020-07-29 07:55:37',
                endAt: '2020-07-28 22:30:51',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: '7o7rlbfgyuyqw1rjk6g5kl24n2atgrbxxtmskdq6xa0h9yjztl',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'pnoovq7ydrfbwcj14b4l',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:39:09',
                executionMonitoringStartAt: '2020-07-29 04:21:50',
                executionMonitoringEndAt: '2020-07-29 12:10:08',
                status: 'XXXX',
                name: 'xkpdzty6sgm2qmk0vwxujhmhsdpi38eye5g2kkzgr44kh073vvgyy7r2bcgpei8144937p7ddi2xi3i8s1mio8gcmvx6l03izepfiet0zqc9ewoya69k6lh3pzm78p55kfx8g74egpw8iberzlvnxenwldkf7ai9u4zyowo0597sw5t3ak2h8zjmryxefcb8p1fx0hjeacm7h1ot863l1ppleal65lf7ytc6fte0ehvjt0bh7r9c8ai8ml5a7am',
                returnCode: 1356336080,
                node: 'qu9cui44tcwzcozpjzh7gw55xmpq1ntzjztu263c79ia4t5salzm5jhwx4emezj812941y5r4uisijjx0sh24i5feuipiaaxnvcu5gubpd26bhe7kcv1nvpwx9ineo1d8jzbgghsubygl8w1elx9idmj6ydss4d5',
                user: 'jrjfeanyfkzg1vx5ub40xhvaaff2syrn9jjirh5qd65mgbrfo3f07a9786y92f40pbr4rv9hgriltioht9olzjn00gyix7adadgjfgvsavfjkio1t4xp4vjmxmq3j5qyj8ba6j7xu1uyt4k4xtm56q59hh3hr4vbztmqbcaza7xfhp45kcucvuhvf4xdbunzyckeh38cipppnigrqaqtpqeggiqnfn5gtv68wcokphhoni44drcxg39maa7tf6v',
                startAt: '2020-07-29 05:26:15',
                endAt: '2020-07-29 13:47:55',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'h4oq58k6k0czdv19qtugk4ligjgwjhl9wcudpscvt0wxriu2h1',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'zppn68hb703qyt4fbs3f',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 15:15:18',
                executionMonitoringEndAt: '2020-07-29 13:58:00',
                status: 'ERROR',
                name: 'qrzoc3j7jj49496m3oyomch2lx2ngm6iu9n9q14qtequpzbnle4hv3nd7ej3x2v5vz47eamsutft0xo5qt57x25bsr3y1l4mcru82yopo0tqr8neau87zan3as2zubsxxt6s0kj0bkbyd1y3qs5fsc3sxxu5o3y0jlzxxwu9a250zl3pu4r9eqefwub3c15n5rymy767mto8y10479hpu42v2gasaf9hu2vftf55mke7fp4yp73h3qevbwbco3d',
                returnCode: 9173051930,
                node: 'a4sw47aknzz1hmvnzz1rccz12iejeyclc82p8fsybpaidxmxaj9wbnk59djqkx2s49i5rl3cfgh7spmugi8e2g5drres4q5q36pe0irkcaasjq2sim72ael2pglmygezk5zevccxy3bc0k21ka1f7noqtavuyvdz',
                user: 'dq5p50whmq9v8sdtz8vjr5ec1iv4ka6ahbb9bj79vkinkiwlox88f3qalou1lhowbvgij5stu3qz3k7somcxqnfyjzt8zg704in3z6faaq2x775y7q0fldxz28ct4e8h65u8kcfjvcjphh1iejzap0l1tj7rdilvg01g6pjo531hxvnybh1u2bc1yrjs7189uf8p2gey15cfelad8ch6xjspjla3cmqof003vf5jt2bd4sr6gexvrd0aglh3jxt',
                startAt: '2020-07-29 05:18:36',
                endAt: '2020-07-28 20:02:35',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'zrnr8r68p3mn016xvefjxte0nr5whqvwccoahp2va1n9fpcs0l',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'orvca1thks47x54io1oi',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:06:26',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 03:31:22',
                status: 'COMPLETED',
                name: '6vor0kxd52w40vv967my0bs3imcm2re5m2ppol8l4je1jiamco9k6uxwl26vgltbial5yaobbmp6l4mrgu6oil0att8ptdzapkwoxcb7rd0y0qkn4nnejx4chwq1y1ydsxvgm38yfrc5qslgkyf02egmb1lq1kfk190e70b39s7x3yuhk9cn2uomtw2wucbmtig3gfb7majrpqkh4vq81vylqy55odmvslnexbsbg1qk8gao3poult5eedpffuf',
                returnCode: 4642336576,
                node: '3yzsf5imomgfyy5b2924h552tlpe7e625cb74h0kppqqk8mrly3dwmrt50zul7lnjca86366hjd2c92srdmw14e52is7x1tynpqi6txf6z9fv8t3s4fl9o4fkzi4a5uwz8ro78ze9bqszz8vdrdvb6y5zyeoq0l7',
                user: 'c6y3dcpppp2xyup7h38z9lwhavs8q6owjo7qze2hs19uhxj0al5u1c55hk567j7tlq5hquf8w2wmuju9eh322op4cku5m85b46d3zqtcg1wrwlgyaymywhlgnhpl3q0vffxy4kijb3gj844zanjaztk645h4xks5llbv8jfg8q8sks4962mgihwp4nnczr177dcki2hrn00ap68nv34uxw61oyqbm24c9a3m6l7v69q5b4xnfkc9moxeo6m24mb',
                startAt: '2020-07-29 05:25:19',
                endAt: '2020-07-29 09:47:08',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: '6tsqqq3opvzk1i5dc2fcq58jrmdn1hdme05gank2c3526vq4yz',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'jjx3o8o0oppndkvoupr5',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:32:43',
                executionMonitoringStartAt: '2020-07-28 19:19:03',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'CANCELLED',
                name: '25z6xw6ybu5u9n16h8r8c562irbf0v3rwmcgsdpztc1y0jrbc0istb68aknf8bjjtmohzj7m7d31wkple5og4l3zuo73wfzyxh7b2a0s7esf6756rhuvx8r53fvbb4s1qc86zjgcmnnm3kcp34gweawpq8v04bj0mu55kedd9c0715af3h8atfjbizhy0l8s2g7fdbuvl10lhc8vzxh1nr6w3rlr3tx2bq4wm4cit4p5mlrzppxak7zaltua6wn',
                returnCode: 6433365102,
                node: 'kj82u8lhnbf65uj9sh4tk54g6g6i5ejqf33tbkml4n4fp23trdwf9sebp4rdkeifjj5nj75inxzsqqbhkqgynlakru9j962yqv79tk0iz4tdm6zjfhlfyo9j60z4ylxfztplvyk69bnxe34xuq7vmzzlz90mst0e',
                user: 'fh0c8o93usj1os30mu5id7liua7wyq6ylfhxuyyx38km74pi4dnhbwep47e6avys80j8jtte01fvid9zmjfy1fr5ygltykysjaxzulbtga2u8sj9jzasqwhqorh65j3nax1lsc5l8nhyc4gps5rnqcpjz02sc7lgujm7han3xr878u4norovoljvsp4srwmxawqrkjgoaoere9kmflbppaf2ldhz3fia01wuhyyk5qra8o7rd5fi03n2xe521my',
                startAt: '2020-07-29 02:21:54',
                endAt: '2020-07-29 15:30:55',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'ecsjz9yfwzcznfukdq7mfp72b3ph4xafm3xyxbvmfanfcvfld4',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '8mhh71kvzvtruzcfxdik',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:30:09',
                executionMonitoringStartAt: '2020-07-29 11:33:07',
                executionMonitoringEndAt: '2020-07-29 06:48:35',
                status: 'ERROR',
                name: '2rvg7wl1pbsi4a1ezyxllp6r07racnckcuc16gvv75lqqyfshwk2zymme42embd7be4wvfy579wt22duhauohqr14du0z49bgtuu36jtuvrj9za7tp7pkf6rbu25q9xf52lenhy8jn6rikbhaleay14luk4aaqepzh021um5nr3sgk17cco9hxm29u84akqcoxi259mff2rvy0ym1mbh1dqqygw4d5igkzp6eorntwy0yuzquriwncrjeur6qar',
                returnCode: 7360009035,
                node: 'evujb6h33wdhe7h6atwe1joktv4tj5rzdj2smvepit2q82h8vso74vqrao1ex79vrp86s9jd6ndfxx05kuttwd69ta6m8uvu54rll19vtw970ko9qeb03nyu03h8ndi7y5meh2rw1lrce4pkk7lt94ubhvyai7y3',
                user: 'dkkyvum9rr7wf7wmx2bolr7ds1ta5azgwku6n02q60dnvy270piqmsvwh02g65rjh31xvra1oycpla0pomemksvyn4ta5ggfyoqu5ocrcmmi55rg08izwalhzb5t630149sger1vgh09pudni6d7zjqil4hx0sf9t3jn9q1mjvtoz97nakt8zm0oytuhpm1rikx7589w1pleecokrfxw8z9t8z5b4yej9wcvowmjtln5b6ki70e7kyds6nuqojl',
                startAt: 'XXXXXXXX',
                endAt: '2020-07-29 12:56:02',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'gv7v08s6612wir4538rxwaxo1qvjeykvwy1dy0rz2pn17m27dj',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'nqgso8a8zq9g4vxao9t8',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:28:08',
                executionMonitoringStartAt: '2020-07-29 12:36:23',
                executionMonitoringEndAt: '2020-07-29 07:54:33',
                status: 'COMPLETED',
                name: 'aiz2h0vm1f9nqyh99cgzqjhkh1x6a3ozvy0r5mn4bizgqbayzvbuoy0t2lf6beqdf1dolopt25af3iekajgby0e7r5cbjiaw1qwzzvzvrpaohm0xxaa7buxrad4msuzpjcrzar02nlioe06eq6brlpg3ck5hw8pxcuuk5jadgtr4d6p1fv9au60hhf1p2m22qvgobicrd303ej2yp6ihdy2u8gjofb7wspbukrexldap1kfic863jdl8cujqez9',
                returnCode: 9562891401,
                node: 't1c3z2t4cj79nf5bo3s726sk2fsh6b0yi8yh39c956r5jnbsbs2c4osy5oi3ofv9id2eq1pinujpwblzg9ns0xfys60m2ciqkmbofyth28wb05qnzwnr6ejuyif2b6gi6hefasbvwksnli4wgt23fw9zsrtqkdcf',
                user: 'trgbucmo4jxp49htwtbpqb2xig9t6sx1d0mk33s2905dcxmlsc4n6hlvc8ejy41czwdt0fslei6bryyxfcbnadfmvq4kmkpziyahnjghnlfnbweprks25nkkvqfhqza0zqutwo1lzhjpir6rczvml3baxh2ivg2p50pneoyr50x66bfnww5ex53x4uzrk0d7ygic12pbn6l12t7dbjspxsn609wd9ykvsw5vxa8xd3wev0vpah06yizq4su2654',
                startAt: '2020-07-28 23:24:16',
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
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'fmyb12n8od7m41rhzdm6yd27wbanhd36wsb8a33bzmyj9fk5wn',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: 'dkjg2ayvxahom3g9iqzs',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:08:44',
                executionMonitoringStartAt: '2020-07-29 07:57:59',
                executionMonitoringEndAt: '2020-07-29 08:25:46',
                status: 'COMPLETED',
                name: 'qkt3l6t9vl505nyezavlsr4b5txbtdg315nm16jq7flqfvok0sb6xabyscsnreiu9vgkz5wvsdyxkz4z62q625upqenb2srbe9tczzpzatbcael8x0p4akiqn3ezawp0c8ex5zs9tbyd93a4ldzrnch7gfgob7mawrsw3y60oyh2norkufrx3zhdacs08m4c1g817oz19tv11yg1t7n8tvha1ma77a4i4xjdsp08j0yvylfikyl12euw05btllq',
                returnCode: 7133847934,
                node: 'qlssktfupol5ctfhdsef79cdr8tju5a75ft7fe378n7wkpe8iukvkhwxfle4ajr8u2tmiwe8soe98gy6xnqqujy5np09fz7so0s2ri4tt4txsnch6d2fl33vexn2m2031ss8rrbq7vnkhj0fkyzdt6eokmfnqg17',
                user: 'toutpkd22z3dp0sc2n8y32fbekiaoprv0q7e756f9spluvzk1p6tegsjrc75xixia8yefdoi2tekyjha4n7t6x6yncoa12ajnogz9eha1n2fp91nqhjrpb98dpevszyvghv2ad35v95fozn8w242jv5twy7x8im84nn3mc5xs3hkpwp3kmr99mtfen2dispugtrgp0oic4saq67gsndjrdqlrmxy9yla58swy3le6zbb1fvfqxcqn3xdhhokaal',
                startAt: '2020-07-29 04:17:02',
                endAt: '2020-07-29 01:23:17',
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
                        value   : 'db4f5d87-76f1-44a8-a983-52c855191056'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'db4f5d87-76f1-44a8-a983-52c855191056'));
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
            .get('/bplus-it-sappi/job-detail/db4f5d87-76f1-44a8-a983-52c855191056')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'db4f5d87-76f1-44a8-a983-52c855191056'));
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
                
                id: 'aefc6091-2083-4a72-8cfd-da323c8274da',
                tenantId: '2ddc6f89-cbb6-4063-8103-fc5c2cdabce3',
                tenantCode: 'b2on70yj3lpx03hu5b0abt5vmyx4io0waa6qzu74f62j8a6xeu',
                systemId: 'ebc5ec5f-36dd-4ce2-8d15-a1bc0cf92891',
                systemName: '7glo8b31v4yxia8cyh40',
                executionId: 'f9a6524d-dd8f-415c-ad9f-4258cff23ba0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:08:23',
                executionMonitoringStartAt: '2020-07-29 10:53:26',
                executionMonitoringEndAt: '2020-07-28 22:57:00',
                status: 'CANCELLED',
                name: 'wdgbhew5pu7ojoffervmq1xkazus6c785217jn6m0nyma5x45jv1dry6gy07r7gcnue1lv04i7emfzof0zxt4h1i8t6ffqj7yk924x451zk1vw127joqfc2fpt0on8tcwcfb8ma7z6xhi4nkjcsx9lvhha3snga7lehpygeob9rgqet72nwbxu3br93wor5y8xdopoed9zg4uarzpz5nwzd7jazkdmwscfmmeeiznw4omqqism1ggp41s0pkdno',
                returnCode: 3292235845,
                node: 'gvg9brwplgztfel7p59hmv6q8krmuh74wsqmd8dl4sqi3wqjhcbofkkn73r62qhz6xcvdnvfij67p3mcq6ku1jz6teh11ihncvzxsvtsubxhgho4swavqhvdtaqx17sbp5mrimcq88gqjfjjprni2zritv3yoikv',
                user: 'xcfljd7cdbghmzqrueqf0zds6cbn5ygt3zq3ux4vfljpljxovl1geudieq3x9xa4f34hgynijrkp2pce64iarrgewju21y5ovk59bwt8x41zr9hlkaq1ss36l1dyhudfzuauc7ts52c7719emvufm3vx5h0ac1cq60pac83qqutkbkjy9h45sf6pipr8w9dx8atf34oekpklli95acm9utrpggf8o9z49mj6ym45j0j34k0qxuvjcrcf9g9pbyv',
                startAt: '2020-07-28 22:51:12',
                endAt: '2020-07-29 04:02:17',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                tenantCode: 'id2lquelytes3kavm6i7wubhbx2wgqwo4xd5ykmgqtbfxnn0h9',
                systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                systemName: '68frm3nkys8fdrill3yu',
                executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:37:51',
                executionMonitoringStartAt: '2020-07-28 16:39:58',
                executionMonitoringEndAt: '2020-07-29 02:53:08',
                status: 'COMPLETED',
                name: '1nm8leywg0kmwt5dhc6gj0l1y5sxwbvbm93aeb0t0w2a6wrw42007ce5gn6xkbss2zvmvy4esy7yvgbmc9z29k1g1bms6qn5adblphhnttum8147sl0uxgpfn4ih49s3tkt9bu1iaxhdanqgthxni4vejjx1kvlgctkk16v5yly47vhyibrtocs5f6h9pv34c0q41ga5iez5fo89xlyxv8x5600y2ung7441oxsyw7m39g2u3iqn6q21kz7mxlj',
                returnCode: 5106618453,
                node: 'ia28z6ogh3cpiura0nt67geq1j1t20g2m3tdu0rwe6rmahb06mgvibe90pkzanh47qbltyynapn6vf5l6youn4p0lqhju3zy6rcrvoozt78vmqczqj25l7iklkwm4vnunirr0oarab99ppoha3yetjpebnolsoea',
                user: 'u8p0trrrkm6l46u6jms034kq02ix34aqo5vm6wml15rmfdjv3wjnxmhft3asdzh061zckdk85r4e15p82piz7cufkx552l2r5kpy4v2j4deuuq1cnzxwjezh91y0pnbpufbjrjxz6xcgemhg49m8likidf188bg7ud5wixtu1ydcelihob6ck4ojtfsk2v6ix7k9gbog1skjqucu02rprjclp6k4x4fbvm0ilnnqkgq79y1kqzaomob5f3cjyr2',
                startAt: '2020-07-29 03:32:11',
                endAt: '2020-07-29 09:24:51',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'db4f5d87-76f1-44a8-a983-52c855191056'));
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
            .delete('/bplus-it-sappi/job-detail/db4f5d87-76f1-44a8-a983-52c855191056')
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
                        id: 'c7c6e297-2eaa-4e0f-9450-6479a2d3b282',
                        tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                        tenantCode: 'p9uqjvsh8lb4oy3wpgv9moaxzjkmn3hxwsg38c52gvb0vsfmvh',
                        systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                        systemName: 'iyoxsg1kxxv3sa5xhslu',
                        executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 12:18:29',
                        executionMonitoringStartAt: '2020-07-28 18:23:37',
                        executionMonitoringEndAt: '2020-07-28 21:36:02',
                        status: 'COMPLETED',
                        name: '8klpj9gbofkv4jsliz65889z24o7tqoutpuifzmnml8ld43chgmnx5h9vs39hwcev2u42fzim4nzp5npuzedpp4zksclvuitcmvf9ngqre676imrby6yuw9xr7vdgm6up8nkp5z8b8qxu40c7okfoy9s74q706k7rp7vq6y84lq9bk7wixj69o7dhrvflve5zdygtz4cp36yatb1gcplepq0hvw6orfzoqium05laz58qhyxzboowzahsjjrt2q',
                        returnCode: 9661174208,
                        node: '8411n16ctfgbom2z883aq28zja5n5e1t44d9cgq5cwp5x0b9rd1ql9rv1ya01bqyadrxwbxr9gnsgtmnaem4sqxggenzv90sv6easthvyhdry5v7f7umxwm1i5fflgm2vpc4df96f3eaateun68z8nyc24diys3a',
                        user: '4k14j8l5stdhssn6c1gn2kqxsfbmnqr32rkpgjq40ruuf4pahgmvp9y27285yen4xn983iczf9q01gvvuuwhnc110urhimq6h5bvyrg5ne9l3mwe8g0mbvm2t8to7dyxd9wmtbefycprg1k1l0yhcqc9au3m43w1v73b750k0af3a956tf0wunvjp7bzf9uiygvgr1mqzo7tgy3g438y1mxqaiq9b6m9w4wmrynbdgc7s8v3rb8phvyoo32je94',
                        startAt: '2020-07-29 13:27:36',
                        endAt: '2020-07-29 03:01:12',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', 'c7c6e297-2eaa-4e0f-9450-6479a2d3b282');
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
                            value   : 'db4f5d87-76f1-44a8-a983-52c855191056'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('db4f5d87-76f1-44a8-a983-52c855191056');
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
                    id: 'db4f5d87-76f1-44a8-a983-52c855191056'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('db4f5d87-76f1-44a8-a983-52c855191056');
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
                        
                        id: '83ba89fe-53e9-473b-8142-324452346f9f',
                        tenantId: '70976f09-f781-4470-830e-9c0adef47685',
                        tenantCode: 'bkyfnxdywf5l1mifc06inpci5vhlfb7t6vhfc38dnscais0e08',
                        systemId: 'b48cf431-2324-44ae-bc8d-f6186d12e7f0',
                        systemName: '4lftbbf4ia11kx4q7gtk',
                        executionId: '4f2df357-ef78-4da5-b5be-86431a0a33d5',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 02:02:13',
                        executionMonitoringStartAt: '2020-07-28 19:14:15',
                        executionMonitoringEndAt: '2020-07-28 15:57:25',
                        status: 'COMPLETED',
                        name: 'r2ku0c42q60by4jshf668b0qyjo01aq708nw3fsg1j9ex15m7pjxgbokjdk22oc3zkdu8haywdtcs9cqro8588epidgfostet3zqeftd6hqnamjg5m5sd8o4amu0lzyr8bx8sd04q67qohsctbislipx19l19hfxqeyn0enakicdqqhhtse1rzq2mtxp3kroitfuigaporgoevbrvh9w7r0afse50p9k6p1p5x83kfv5budq7e0r5m21u9er64c',
                        returnCode: 3850710739,
                        node: 'lun02gnf12p09t7xlxekk6viovdffhc6kwxvush1d14dat8p0jlqvjixodkpzvzaznh7lv7ktha63kj4ll25q672pv9sp4apsgkofypkw18q8r6unpd0xetbdgp41k4g7nnyqb8x97znwjh7923z95ql1l0vm8yr',
                        user: 'qegeofi6jcmgy79ghvabkqis05eefwy34wpe3ri0b2xfwg73gwoa4chtnnnk65pxtugml9xrviskbhuz9r0hfgn82djyi5fzutnn7wl9lu3ck8mdpuugn9xtfex7o9wxex8htszg5g90dhptzrxtmqywakc9i74cz96ictxcyfdecuzr18jz3iiqospplgdflp0ofhej73sa6jvvtw7m2801hoeywtknzks42yts69kbifg0ahj61vnvnxsfh3z',
                        startAt: '2020-07-29 04:46:11',
                        endAt: '2020-07-28 16:31:17',
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
                        
                        id: 'db4f5d87-76f1-44a8-a983-52c855191056',
                        tenantId: '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d',
                        tenantCode: '5ziwqw8nuofi30aq6twrypx4ux69jukdahrspof5haa6hsg8j4',
                        systemId: '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529',
                        systemName: 'mjr8gsmq7k41eilen7x4',
                        executionId: 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 11:45:04',
                        executionMonitoringStartAt: '2020-07-28 20:51:06',
                        executionMonitoringEndAt: '2020-07-29 10:58:17',
                        status: 'COMPLETED',
                        name: 'yu8s4m8x04poodw066oupj9n201ilcs8zg1sdq0rzyehs6ex9exolug1qpigjp1nh2z9sy9g1gjeh5d5io440arfqg8fwa4v24nreq7k9xlciceb13tvogukhedgpwyqia9xni9r5h536immpg3i1kc03xyhg5kp46t27tk0b621hztpx6tu6cf3b1sroh5b0ki1gsjl90a2e0eag3tvu0hwp03cw9h13k7fpo3q8ct1zquu4nvnep2cg4e2fip',
                        returnCode: 6669657474,
                        node: '7qlxkfgfejl5b1wn8nnys00ze6kjsvz7kzd6ax5max5lro3jtd1dife53wu17b4n0ei5kqm1xmhv6r07it0skevshtmlo37uakx9djp174d14tvv55w6suvmyvlu3dlwwgj6cuhfss29g0rphq9agjwb5a50dke2',
                        user: 'dxpnhm5vgsrbnzctjxsvprwnb5mh505slswmv7e9zgjn5dxlfbmiydhalpc03fa1ivaullei5xo8feittzgkzvboh2sjsritq4myw6vp4hojd7c23p4sxjbqeirwounzav0bxyzluyex9xfkofzf9imo61fprqiyuozezw986jcan5itl6i8u1ozvi0bx5q9qivhwvvetns2iorn3r8t3atm4wtfszxwt7rtw3aadodcp216jr5q7qyqewlz7z5',
                        startAt: '2020-07-28 17:10:49',
                        endAt: '2020-07-29 04:23:09',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('db4f5d87-76f1-44a8-a983-52c855191056');
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
                    id: 'db4f5d87-76f1-44a8-a983-52c855191056'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('db4f5d87-76f1-44a8-a983-52c855191056');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});