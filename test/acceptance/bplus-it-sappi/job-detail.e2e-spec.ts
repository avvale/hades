import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IJobDetailRepository } from '@hades/bplus-it-sappi/job-detail/domain/job-detail.repository';
import { MockJobDetailRepository } from '@hades/bplus-it-sappi/job-detail/infrastructure/mock/mock-job-detail.repository';
import { AppModule } from './../../../src/app.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { config } from 'process';

describe('job-detail', () => 
{
    let app: INestApplication;
    let repository: MockJobDetailRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [AppModule]
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
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'wea8wrb28qqn1xw0m9sz',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 22:02:16',
                executionMonitoringStartAt: '2020-07-02 00:30:40',
                executionMonitoringEndAt: '2020-07-02 02:38:29',
                status: 'RUNNING',
                detail: 'fjdgaije5mbblpwan8bea2py26z5iqxlv3ynrmgtvry2vmomp5t61remnb0h7avqxmb4jzq9d5v2qhmz5s7jt5m0lrp4r3abtm83i1wpbhq6jieis7jdsrj9yuzz5swf0cmr50pspysyblyk15f9oyh5jawziupziqe03r41k4kaz8q1c3wsqsbprdhc2ilzzxqv1ldfbw8y2dxisnclzz9mi4t5trsdt15u9lp3otkocsubikr7q2ae35am7c1',
                example: 'wpzabqqicuua0ui0naqysgy8eszir6zkt0chxkkuxlhekh2le1qdezzeo5n4d7p9m39kfjyn3bttcbn1ba6id4wb0u3pq2wnhmvu1afywtujicvu5uqh88o60ld3shz28ii7uny9oi304nmup10seinozi1x0j5u',
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
                
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'tzdp1mnoekj9bsjfyerv',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 22:27:03',
                executionMonitoringStartAt: '2020-07-01 23:42:11',
                executionMonitoringEndAt: '2020-07-01 22:26:49',
                status: 'COMPLETED',
                detail: '1u11g8azcio32us5sghdq61xsfzkv92hugyhkn8f0v8k0awo9gwagvg3fz1pvibm1iheyvwucubwixg98as5z46x7z56q7hggsl64hnm4a9u88nbwj1uvte162f54iuwqv3iy7ns0p1iy89eo0gfi54u8d9d5w4szguxwucw7ysylqxdh74msqrp9q8pknjvxrk9ecyeri99kyzla1pamn4sre80sjtluyc0sqtf4ppthpdwnf45evmw2ixnrwg',
                example: 'kr3opy18sndy8yus4x0eec4ce0p6rxgw4qo2et5rxbplxhuyq45hw6stmrzltkhyl2a61mepnykzbx2j07g3l6bsfztwvqy9t1muaw0ip2lyq8fy055erzzcevwlxs40kkjj8jld316g6t7mcf3yfs4l1twsov4b',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: null,
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'zcgrj4pgif9e518zpf1v',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-02 08:29:48',
                executionMonitoringStartAt: '2020-07-02 07:39:16',
                executionMonitoringEndAt: '2020-07-01 21:53:40',
                status: 'ERROR',
                detail: 'fcyu1jtt60s64wlem6n6dndbu8tu2ecthjqrkm3lm4qyqby62w636douftvz7nv24g1uugzp5y3atn3fpjltjojexaitpkdrl0tjmv3zn5g1b4xe95gttgest7pw9fnkr24hsv9lw1zzd13cp6n8mfknid7g6rl3e1r2gbbwsehgdosno1pnmmac6jzyf64nlp35lc8jua689iarovhynrnv2hp11bzrxmwabkcpp712bsmb06o5bwhlglp7jeq',
                example: 'k3ok1rlpb38ju0w3qju0h0spaykhd5nxjkrjazbeg8u9tu3wl7t0qj21a5jhbjhgbqzrbihrmn0p2b2e7bf8jqfzwjdsipvs3xwc46pco1jl0i0fclaaixnfulaj7p7g8j1yipp13xmfursgxzkqwhxydz0zoijq',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'stx0x82qz8z7fntglhgz',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 05:41:45',
                executionMonitoringStartAt: '2020-07-01 22:41:46',
                executionMonitoringEndAt: '2020-07-02 08:22:29',
                status: 'ERROR',
                detail: 'k9js3bhw5tqszd58ka8qvw6991n8p1161z4nnfn9cnlkx2gd7yxfqnsbrmd04do6rimmwjy2h4t1qlouha7487w3rojo75yzftpfibjw5v5gsb6smvx8o4rnzp86gibw4k9j9xlyexawai7y4dy13o5rkrgwrd16dav053yz8o836ruvy9w61etttan3oi0873lwf32ts6ziqapi4o8a710adxmskjphqhry1oewboppnki4uqoif1pqxfcn618',
                example: 'ag0v6dj4a2qmg79ae34owebpio9jgifd5051bncbfdu9u8rcvmd6lpgd1raz0bjag2f89610c4yz2ztoh19q6qszj3h6tcpoi1dmw7t9fvlkcul1geh9v7dnnck09sd4q3vjntp8oc4cuezv5d87bcpo6em4lwf4',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: null,
                systemName: '0u9hfwlln0hxerc2399q',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-02 12:02:59',
                executionMonitoringStartAt: '2020-07-02 14:00:26',
                executionMonitoringEndAt: '2020-07-02 08:42:09',
                status: 'RUNNING',
                detail: '8akhtax0rweghizmmwyqvhreihbb6wilgqy90lc8k595zprgz04hchlvk5w73t5d4byazs31cfpvgh6jrf0i8ha8oro2osulq90e5n9zuqu9bcvjtxs4uzcwfxb09xrurz5gm8qzn20sy467fyj8lqznibxc1m4iw2wiqfs045g0b5u3cu79xswlpeidfiicatyttesd7zam5zys99dnn5cz80bxeja7vfh18v99n3x32pd2hw9csmznymuimxf',
                example: '07jap8eyip3nmfq75j57ps00910p9kfz2efsw94nsgqwyt9hvq3oeaqib4od7zawzicafrbkukngytlzr8fhhkbsfppvu5c1chij2326avjq0qf0k3fx2lqu9xjitldh7x23quff18xnjjh2cigzox2jni1tr3zb',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                
                systemName: 'ngnde8txf8jhu8pyz8ce',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 20:25:28',
                executionMonitoringStartAt: '2020-07-02 13:31:08',
                executionMonitoringEndAt: '2020-07-02 14:18:43',
                status: 'COMPLETED',
                detail: 'gsdan4obhm1ju6vsrxw4zmb1xdy9w1663msxt5vi63kc4n361oi1ouybw5xb1mrzax8uk4xcfvs7xb7yhoy86t75ymmyzzm3t6blqdl7qizoenp18avsixo2lcs1wns02bycnyf3b2n9z72c1ye7ap49mrsb128w10jx12ya9giy5obpf2acm6k00ivb0eryxq4r6tzx5lpp4ob56jaddk9vqbsyxf2vvja0zyw0kn1eov1gp5c8me1fslg8nmz',
                example: 'ktav3hbevjlmv4tucbnz1cqpd555fjq1qu376ticzxcs6pidlsslrxdkxvooa86mz5mbrfbgwyxsn99ecjly4a4gs013mq4lcqv0i9acbeqxdndyia6h98hablia1g0ceghw1vr6x3y8ln33jfmk2qxtm1t2mw6x',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: null,
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 02:20:27',
                executionMonitoringStartAt: '2020-07-02 01:36:53',
                executionMonitoringEndAt: '2020-07-02 00:56:29',
                status: 'CANCELLED',
                detail: 'fue56yf7zuq134clmcwoneb5the1cwh2h6bc6ucv5b2co6cealn5cn1u7vk8kiu3j2091bxl0nsx6uuqqjdfrfnwa0isgaoe1aggeqmhlwqp1pr0qdd83mwbwuu5dv336s7pobl64rblzcs3c2t4mwe60kj6ci7k8b3sfjyglfbn2nq7ga9qv1tbuo8kykpsdn7vieygwetz04vf9akbyc3dv8mvscbf9cgarmqegry9bsef7xsh7skf86jxiuf',
                example: '9jp58qy2nvcynx8vji4qrxlb2yxnuqh4vvgnr74i45alp5nuuruqfmkn0yr5p41or93zb2iak4m83v9lg7e5l6l16mjj4r2tkwdsirrzs1u5pb4dcnf8h6qyyhwohiok1znkr8sz5pf7j7or84v8vn9u0rzrxgct',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 14:29:07',
                executionMonitoringStartAt: '2020-07-01 19:37:01',
                executionMonitoringEndAt: '2020-07-02 03:00:29',
                status: 'ERROR',
                detail: '2xs7qmtycuy6txpnxpublk8woojz04tngr1dyvjkcmewjl1wunlmd0bsf9m93b4zkaxbw9nl8tie42j5gxz0jlmcqzynkyakjoe5cuhszdcpy7sa7wrx70ulmt6qrh8ukqfkkcsyumviy6peft4jup1u9k04c3zcdqhdy08ka4cunu80rvfc4o9w60tpyrngdr8pm6flchlq1dxfjteqehuao03qbdxtmbmx4jbvkgp9rv1r4qngeay17wbxdms',
                example: 'reysuh7rmhqlk6icar1v5vf6ih4nl8wi2chalnci0ysdsuc81mv6rft3a9yv2ubrycoiz1yr8gp9hm04e6ra68yf1cj8sillxixmbu0aanq11rclt6v23rq9yxj7o7a5gjsj63zlnba1h1emdmn4ix0odkgjqf43',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: '5traor0m4prfqh0yqsbr',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 03:13:56',
                executionMonitoringStartAt: '2020-07-01 23:38:55',
                executionMonitoringEndAt: '2020-07-02 12:10:11',
                status: 'ERROR',
                detail: '75wcmvevozs3frfdfqcd7csg6gv91jjqijy7hl7h34tqnzg7o8eqyh1i1sfe8dxd1z9fad9vv6lqemvkuskqemphg01wgjv26ziriy8sjlpdla2v6b1x2y1o2g023lnps11si26007qfy3zy161ilfh26bkpw9t0f8lnot63k5ixi118pof65u9549ez4ebowfcpi198vpmlpwbg54qtkj3z7n6elln401vt4czhtlls8uylyiozutzxephy627',
                example: 'ez6kpyzb7l54nam1r8c5q2mcm8fjx7zmr28qpge05ini248oi0r288n40gk9y0mzm1n2qgm0pwipun31o20f6ixdilhk0j06te0cyelj2v1ens6kr9d581mtf3npe68jx041b1ze1wgop9l1x0arwxmx2y5mpycw',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: '8s75zsg15n18w63qt3gz',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 10:13:39',
                executionMonitoringStartAt: '2020-07-01 23:01:52',
                executionMonitoringEndAt: '2020-07-01 23:56:55',
                status: 'CANCELLED',
                detail: 'v275fgno3sw94k0ex76cfipym63r283l300tikk64c887oteln7yukagxmwfofjsjqsbz3drgw8gxytuiijnqr61nszck04pnnpauc68pnzkkixz2091offust88p8t1ct2mue1s8358y9apmj54wzaeditexh8ldz6cwgq41nlx9qsftsurczmsvclgvbkjdtk0oloycmle1yz07b86l4v96a0rfhqhsgxnkaudwbn2djfzwzvlrhde24afo1b',
                example: 'qywvvcir6o5tdw4s718k0fwdgq70b3v909lejwqkcdi1zf1a63gdjonks2c2idslcwctmllf40kfxgc8exhm33fjxr98mxo3ckvkinap4oaogduput1lv8dn5nw8slvxot4ing7kdlaadosxp1sftpigaze13lkl',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'g3ftpy1ugjsf8v02bci4',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: null,
                executionExecutedAt: '2020-07-02 05:51:03',
                executionMonitoringStartAt: '2020-07-02 16:07:38',
                executionMonitoringEndAt: '2020-07-02 10:50:42',
                status: 'RUNNING',
                detail: 'oiryjeyiq7cz0mr75t1mgrf0her1xw69io3g8x0qom1w6cqii8kpqi9p1usquv6znrv1j9ivgjkk0c9vrthmw8zhnkshp0e5f06vd1snrvb9lgd8qhh2ocnqyi5hdiv7bmzndo600v1qyhs55ljvi2xvnqknzopxtqz2z6vk47mg9l4sdrvd1syeysb6bci0yi8t8qykesj3puekxjuflc4je10s06woddn5z13q4yy6myclrs3b7llerwvyxlq',
                example: 'p12i9foqz6dqnxz7rr98uae9l3mkwhffyvdcpzxv90ak3swx1eb2a3zdeswe39gnz78sj3y22kbjcl9ttqn93enkk2uxjyb5w3sb42ioxiuhzfk78hwsjrxo8ks5meszz3x41scijo367z3j8nyehqqc0ndsz5hc',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 's6bemp24k44gw39fxw2p',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                
                executionExecutedAt: '2020-07-02 15:24:18',
                executionMonitoringStartAt: '2020-07-02 06:35:06',
                executionMonitoringEndAt: '2020-07-02 05:23:17',
                status: 'COMPLETED',
                detail: 'sr20re84ue4dq7cv3wk2nmn19y8v26jwy4l07mm38lyvawlhent7ilv6syrooqw6k8303cnkxlhg2rfsznjfk1s0qis8jn32sdipw3dsw3qn2wyfk6dkylqmfawp2t17nixnsgmpvb1oyoc13fir2ygh9i4be3pjqa8lku6pu180j0mt135l58us2pf264jr7x974kg60lc6fn8jdk9suyblj83hrew2wxr3e98kmq1jbak5wc92nyebepmf0wt',
                example: '77xm7tb1tod5tkoz4qxgow1yb1jbzk5oibcvdjcyaxn34eyke5x6uxzh06z4r9yoqi99799thu5qwfcxmb823svp7aaakm0a2heoqe1ebmmbyao8wjx3lhqc6mgx6v8b2f8rqr7b7h0yoom4x9vcmdnc60nfjw1k',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'f8wqyup6q73lrnzdud5e',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-02 12:26:57',
                executionMonitoringEndAt: '2020-07-02 00:16:24',
                status: 'COMPLETED',
                detail: 'm4xplr2ip2dqtw72s1ztjh3pfgsw7svw189b4e7h90rbb2qzzd1ovc8rvuuhi6f4r0igs0agwf06t55lrlejok0vx3je768p3go8bd21ygn3nvdt9qdklqjb8lz3ad1p15jnt8dwwy00v7r5e6gofr715mja4a4h59sly5oazxmqgxb6telxu9k9iveeyopl8l3pwczox5ne2w2t7fr90w0df4ggao8fnv6q5fhmub42kdwygphtcag3ejcvomj',
                example: '9ha5m0q16mt03kopgjxgsjq0c7v67ktjfsm75wp2gqdjzpn99yyclg290auezuzrtox1youhza6ryiwoo0qrbo3jal4vmg67z5i6juwgtd7whi2g2xw2xa9pkfdaeau0b7779mhhrolzp8m5efa5t6wnam2ylp9h',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'ml88fhzwc8o64olqh8gz',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-02 08:44:27',
                executionMonitoringEndAt: '2020-07-02 00:51:26',
                status: 'RUNNING',
                detail: 'j4xfo756n9zqt9mvqcn9fh706vw3dp0dw2oynb0km1sa53b13uc50elgfp9cs8gygdlmw2ohw9trjlzk06rv31u4nfrialor3fkbc7i3yde4duf1w213dtov6fsy1dp80f1bg63awcg74xxrpf4sk17pjyb3lvs002damrayhg2lp0oez4v8s8luxg96p3ldc78s4486ijd7cvskzbq9rqtg7xo5d2dgar08p2jlgj9jpvn60yd4gbv2v7xs44c',
                example: 'e1kf7b5pbxnya9o6reuzgdevp5dx4b3bqa0wdbc4jg5oyhxlm7thraya5q785ky4c3bgk1l8z2gzoe3dd5mrjuw7gnck6mgl1i93x2nhfj3d6six2y9yf86ubb2tss483k3942wra3qsn6lpqmmbsy9hx13j775i',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'enb0oswq933sfzglnv8m',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 14:52:36',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-01 20:43:17',
                status: 'ERROR',
                detail: '658i6t9f98lc3oggptpw54pzpzku3asvmzk2fdgcrwhxs6s3z1kptzpgjbatxltryg4rr6j94vwbg1fbfq1kyevmhj8i90mrx1y1ms5iyjv3rf8kz9l6h5p1t1anealntemp38625xge4owx6cwumttc08nahxplpcwk0rxsi8fqhlyj31baxvy4h4si059imd8x9ntt5z01468lxkmobe90k0lsk2sq0cfia4sxox64q0pctt0nyt953g2n96y',
                example: 'lcts3p3f6vjwd6qgw93mog8k8xgufyqnzvowkt77np3tvtqs068jhhyuzuev9uux23lhyp6vrf0ceh0nhlegfgdmlpznjwtba0zh4dj6ro1g3ywjfpj76ly29987ir31dt23eemq63j15k460c7hh3l2a822hi1y',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'a3yxekixq75ukm49as07',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 11:37:31',
                
                executionMonitoringEndAt: '2020-07-02 14:28:32',
                status: 'CANCELLED',
                detail: 'mek5mn693c00ogomfdvgcaxz90l4dcvabq3xk6yz7cqte3nev5k1z9khfl19rwl98d914pd6lali5wuxy09hwh43pvaglgj1z3bznro2rtktlwzywfsze91n1fjs94fy453iyeiupkun6kpfe3yu1bl251gm43djc98k6qncmbypgkczsxstjzpn7y02s2lt3bh4fcytk1zed1yeca5piujl2nkbvbq1bt8bjl412jl8brql8oyezzahcbnngju',
                example: 'wzejpg9zogdjrs8lxratepms06rvh5hpq13zacjow7y34svg5hqaq4452scxspea6e4qfbe8trmsuh764i3gb0l7p3k867hjqkxy5f5vbix35abp9kca4nun22gdyl8f1dw4hr7rtrvmedioyxqn684ogud5cira',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'mbu9sxmtx8yubxzd1cok',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-02 01:46:53',
                executionMonitoringStartAt: '2020-07-01 21:43:01',
                executionMonitoringEndAt: null,
                status: 'RUNNING',
                detail: 'uy3y0thkvw9pkmcxn4pfme1soo80vggpk6l4r2ke8adjjfhcz2hikr8ebfw6uxl8i5przviap6092nlxwl9v01l1uywjx8kwgn7vvqdr67phqd2jusz6b3bvhxahzrwb21wjio9h5zai7g4q8s4jlh63yb97a5pvac8c92nbqygd7ln1p9m2cizhzj6u8zfpb7vehmheosepzi20v3j9r731cdx0nszpwr3v31on1rhlz98svdjgbkp3qjqajb5',
                example: 'toe70a407vx8ou0hgi9yw4a4445mr6y72bsjmkdg0m8czm0jc4bjft35eoaxjqha61tlpapbdt8x1ofijrfff3lnmzgmoh4z9cj50karw0gnjwfdjzht1c5jex494vdw8a7tbnsmk5comjcj7zvh0opk4r9lvll2',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'zosrnfwlxjilprzcyvad',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 07:02:10',
                executionMonitoringStartAt: '2020-07-02 00:09:42',
                
                status: 'COMPLETED',
                detail: 'ezgcya3jk12ffubmsy69e920dgc2ccy4bxgz8eqgjwkq1g3u739dyf5622pa285u1nmixeaqm5ca46rul59csqzdpl006e6b1aygqeybvbwfpbeh4f49iyzjztnufw3ru9o0j27r9gnuv6ykvkjos96na1p70xz3fvqmpnj8tl25rnmiwi9xaed5fwuv7oh90gc4t2cpbvm2uu5v2os2inerghpfhdzmt8njtg4w459ftbil56jfrofdtka4aba',
                example: 'b4nw8q5a6ypyebop6ra9c9rk57isvtnkhrxy62y4fv0af4opsof4wdgywm3m5nawt6hw5ktk2c5cxuhg8vwrtvc0bvobwrsz08wvfdrq4copym468p3wk3hjponi9gcug5oife72lji216jjebdzxz34uov50avs',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'avdueojsjpcrd7yklcu6',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 03:17:51',
                executionMonitoringStartAt: '2020-07-02 03:06:32',
                executionMonitoringEndAt: '2020-07-02 12:34:44',
                status: null,
                detail: 'llam0y7rnnzwc40iy0xy1ltdc6wq7x6ic66cp9v7hcbfql3lwfov8e8dekomrxfdgn30kfrbnyon6j4tz7hlo91k1p5r2xqmfrbyu9lzy3kvcix22ljw6ll9w2f7w5zot190txnh74ajsifhk7bd5xadk86i06qeg8aoqywtecz3mpmttqr7vvrkedxuhtjs0400jhvc8770ywn3hzowerw5k9yqypeby5q66e6cj5agbl5b9vqwi1z1vmf7zqw',
                example: 'mhngjabnnirigndm76d57o8gwvujz37h23rqzvnsdh8e0ado0gsgnzpz6o9u9udm3wer84myh8igsbzmduk3ir8ivpa5l4hiqzqf8fy2zerm0tc9tji2ri6djwa5zr9m09r9mhstt1mu8s6uoi7pd5f24xj3773j',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'q1vwhdwb2zn48ax97vfw',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 07:39:15',
                executionMonitoringStartAt: '2020-07-02 11:47:02',
                executionMonitoringEndAt: '2020-07-02 06:22:15',
                
                detail: 'vpkowt209mbmmezgxzdjnml7rmv20xd4k1997dwl897y671qr65vl5sd2sxqkb0obmsd5h03uh94ilvva4zhig3g1629fqsjczsces2gc1mnzks2puwh2345hua52h48eja41c39mpzyot9cxlk8hf9lw3q69bvhhav1u1o66t1xywbucdyhp01854s4rakn3xcc20voh3qs0b1kzr4i3bo15hmxyzsbmhmtnef65k7355hcnibfwmw9odwcnqn',
                example: '9xvngd6jr7lot2upltwyx0zxpw6e5madnimehg9nr436419vmzme59b05vu8u15exa5er1fphy5mzvlxpkgi3wew2g6afqybc7uhf7fozdhs8o60zxsrp5fwfrmko4196z8e8bo2ul1ehja0ql1tez7foxmu5z23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailDetail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'xyck3gn0ustnra14d4j7',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-02 12:54:27',
                executionMonitoringStartAt: '2020-07-02 16:48:16',
                executionMonitoringEndAt: '2020-07-02 08:28:53',
                status: 'RUNNING',
                detail: null,
                example: 'gfmi2afqrf6la93jl9ixbaj7unspkjw4yip2xi056kzqqhn2vziw02a1nwf0qlps17xzr1a0lzwioflb3ewwo4tn7zpr6numcvj61aolfh5np1397xz4r5vcn4vvfmpt9xrs241b311kf0xz0u9eyvqvcvqlfuz7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailDetail must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailDetail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'k8ygaj8zr40ley7g7xnp',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 03:48:03',
                executionMonitoringStartAt: '2020-07-02 14:48:36',
                executionMonitoringEndAt: '2020-07-02 11:51:19',
                status: 'COMPLETED',
                
                example: 'iq7tigov51qpe21twgjc5rcz3eo6ukbgp70vkma33uo2j1uxtqizcpygfzp79chpbczy31g17i907ri2j0pibrsz13l57wc9xxk6jdv2f07jn8vn2umarqzv5vc11irbtj28zq291prhu1of9ku1knuzt68wf5z7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailDetail must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExample property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'hram8udl6hab9n6fwq2x',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 17:30:14',
                executionMonitoringStartAt: '2020-07-01 21:45:30',
                executionMonitoringEndAt: '2020-07-02 09:09:48',
                status: 'CANCELLED',
                detail: 'f7xn9wyrnzwoace9zcmk3zt5lgvlimljf4ghll30gevj55qfn2nh4khd18mbbebg86il8qko271c4buu6o1cqkvqs7hsu8xbdwqyw6kxz7oeo9miiles6th0cq8kvrtua8ohu5t268k34z8wsxtpznhcfgi17w6gk4nkjt8rk5ncyffkusyd9wujr5xc0434j3fm24g6vkoiw817oopmia88etgiqj5d3ux9sz228n4858rgnad5o2okycjcy0p',
                example: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExample must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExample property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: '1rq45j1n5zey7djvenxj',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-02 09:11:43',
                executionMonitoringStartAt: '2020-07-01 22:07:58',
                executionMonitoringEndAt: '2020-07-02 05:00:09',
                status: 'CANCELLED',
                detail: 'zr2htozaunomvw3lyitsseo6pre3dz93y1u95pirotp4z1jh6x1zqady090w4tm76v0vgfzugime2jatewo4f3ktanm13z62wmauda87i4jc31srdd7v4dv8nca58w3elnll7dn68tv4h8zxsd7ipyigjcj08vthiub4vfhggb9gpzkw45kc96zskli3cbhn12tovm4qpae18w52rxakiwzw3k01p4vdlogxl6k3lxz6xrgz2s4t7mki77xknfl',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExample must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'fv8vcy4mff11jr6mdj34d7r316en46gkyljc9',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: '3rsburlh72bv7wdnlgvm',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 11:19:34',
                executionMonitoringStartAt: '2020-07-02 15:50:53',
                executionMonitoringEndAt: '2020-07-02 03:54:38',
                status: 'CANCELLED',
                detail: '74gvmtl5pvx0ylaueytw62f8jhp3jtknurs1w4d86a6y3keeqfjznk79pl9sgufu86ooaoymtjc40z30xq5p453fxwdho8fjni89it16p06xk1j125vlhc4max6u5cf7cxbwmx1bblorwropwsk9fuscmo9rzhzlnct4ctstu0ybigu3xrj3gsh8437kfd8vq66pj7h8ul665qh643j2rhw8wo36xoyns547gtr127p5dz6l78oc57fm7cvg6hz',
                example: 'rvq1xm7rh0x8526tvsaqlkcygl46zp9m96aue1vdpf1j3f3sdc4icvqtdwroz9cstfigm5d1km3jqzad4sta475shghngt5oine0ld50m8ks7fc4u7xddomyslk40rqc4h4x8k0f8xx9cstr16f80oy5kzqie1ci',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: 'xpr901q58mojv7e25s25ufae1wvh088bup02x',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'ojinlckih4ktpeujfghh',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-02 01:48:07',
                executionMonitoringStartAt: '2020-07-01 22:31:59',
                executionMonitoringEndAt: '2020-07-02 15:25:46',
                status: 'ERROR',
                detail: 'gjy7c1w5jhwurjgld52yuw2w4c57g79obdbv4vgbpdeudoaj8oqlmvgvptpap12sob070mam7gq73ha1vires9cu9swhrnm0h2ws85y3nz8ehw4ahq3oclw4gzc0lrnun6qh2j6ejuhozlbx254cpey683zfi9dat6iqt6g4tr7b98oeuqzia0s3alyh0zx60lnh5cvcz4hfokcfa1bqq5rgrh6k2s1r820ltwdmfc5s3klaxxv7l3b0z4ia4au',
                example: 'h69si4y9tl5docbsdjb5cyngkgksqe8y5g8nsa424y7e7r886otskkf3kw5i3wvplyez0m1bigb8hkt1xszqnfnb71kw7i4d50jtxg06qzdhanx1nkb7o1y6na7wlajnj5c17jz5vcqimessaa6wzq7yrtw6yume',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: 'gf9uwxisx7o3hvnt09hm4cr1res9pv8gdfptq',
                systemName: 'r9zhuc8okp00s0fvejti',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-02 04:02:02',
                executionMonitoringStartAt: '2020-07-02 14:40:34',
                executionMonitoringEndAt: '2020-07-02 07:57:20',
                status: 'CANCELLED',
                detail: 'ituj9b8jdmwi5gs6cq3qaeicufnuspgb6lyku2xjcuep7f4hkq9px9zdktgunbzkiss47rptptthdrufdlv9fuvj2xu1h96xus68lqbjhfiktx7cb85i7vbqsdn7bx23cfq3z2rpmumy1cm7xtrbljhf7w1nwzrsn2nwal24htr938aiauaop71usnaewroikvv7tki3ospjkhbt1ddqyxba7rvpjb3xjhla1xau141me7schph84icp4h7k4mk',
                example: '3rcujnuvltvzu8edjydmoenwi3bkixcxiqv2kkdnbvqmhjon8kxf5hcg3l9o5rs9efa6ko8y7og9ddo0h2gjl15fmlwln86wbyhojrztjwxp58chy7d1hisg5a91hus26htri5ag7b75s99bly1ze6cxhtlc76mk',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: '31cvq3stc423t48b0k7a',
                executionId: '8ovwolij3wl8qwt3yjrc0djir9wdpgje8l7mu',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 05:59:46',
                executionMonitoringStartAt: '2020-07-02 06:54:27',
                executionMonitoringEndAt: '2020-07-02 13:55:27',
                status: 'ERROR',
                detail: '2m839wgxczpzlrhd1v8a6ilth2019l9crcabk7bkj7ugfl8t12dnlcuyubs60hvnp7254xyzj9vk6gf366p3sbfwqnfmdx1jidtp9aqx9l5g7j1dy9gz6pgmoln3qak4kn4772qobf6vg4lm0v5laal6jfyd6lhr33kqbzf31dy478bs2n7uxubu0q0bu9g0v5ad43ks1nuqunkaoh3tkffel8rfcwgj3nyvxgk110515kvv7wt45kxs9oengmz',
                example: 'j9insg27f7a1emxxq2k95mzle5j4j0a6oe2mxve4m6iagaexn4brn0matjigujai3x8s2vasrievo0pg2ayk753bz23vgaeas199z2gx4ux2pa7wyj5qjlzsj78j1vjqusjoc9sq2yio6hvqx5gqqb5mcmue2p80',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'lp8rcdm8r7w646wukqqm1',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 10:19:04',
                executionMonitoringStartAt: '2020-07-02 05:39:26',
                executionMonitoringEndAt: '2020-07-01 22:17:57',
                status: 'COMPLETED',
                detail: 'pep70hids8x0jasr3akhx1s4pxhqjqflk8nbym54s94ynf3r4zo10j8ug4k2hhs6yi242vyd4m4tfzsfxi9h7yvs0c80t7p4wzr05zzok8f5u6mf9w06on8qqlojsiwjx11lndbaz2kdsw37xpmnp03kyrv1zwra6nudx5tdmch3yr8kx32hkqjnwnqt9bp3rq6qv7g47iwc21b8yednuhgrqohc7o50no2cc786k88u7xk3trxl5g7ory7yh15',
                example: '5djhrxzj1bz3caokhx2xgwzsorn3mi56v00bwvxy9pcewtlf4cnhei7ryyppg3fss8wgvg9mpjwly6jwu84w65wkezob871p3dp0a52nf344wy5eahseke8tyd5l3kpenyl2dr8rfjwwzqa8pqala2ndguxgpdom',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailDetail is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'kh05qczr5jk8tcksjw1z',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 06:42:00',
                executionMonitoringStartAt: '2020-07-02 08:07:12',
                executionMonitoringEndAt: '2020-07-02 02:12:23',
                status: 'COMPLETED',
                detail: 'kjedratbxuqhc0azcmaj9gxyyteiza03hgb3esn078nesi1qtthykj89dmiegpe0my4scmxqh0eooiz7wawqkavo8qzpk5y62buchno137jkxv92ql674j8nnjtjwdfrwmx3nhqipxq74eblw9ll9cj5il2r7hh0igvm7d2m7zdqmg0r03yegznwjas3hjsvcvye946z9p5pfk2fou9ezn3c3ei3payy8mh4cm99qkkust2fehstotv3or8ylu1g',
                example: 'jgjf0wc2g0kbu8wh1iudd1kcqp0rdim7q0h9z4ch3ef4rh4uthx4x9qq9bv811pupf3uss3f5kuxmvl1dwp9pekg5y8clkz1pawe4tk9yz9pj2wbgq2ubfzi9acdc4lp50uqw04k9i4f1rcpzab7bnt2hwcbhwun',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailDetail is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: '0c42ntkfod13a0l0zo0x',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 20:00:46',
                executionMonitoringStartAt: '2020-07-01 22:08:23',
                executionMonitoringEndAt: '2020-07-02 16:50:12',
                status: 'CANCELLED',
                detail: '0r2g44tfdbdhwg7lt6vs73qqais7irw3tyegqoryvvcvtm3yr3larlpmjn8w6lpb25gbp113t3fuu4rzhky8758rbu1v53w6ylifda1n98wjhuwagogr7585q1pubkmecwm9utwzysrp4r2fi21ktnzjd5j8yrdtxj571z7n7vwwnslukm3kb82insyztnqr37mjyy020ev9kcao5sgzgfz8jwet6kxazuma8i9wi9fmi75fm2lusuhq0rv4api',
                example: 'pdjicp67eabpd6067dg9t9syarhhqatex53lz2uthow6j8zn7170xmbi7eka6mv0j3h0oowxv1ryfxak2avbt8707989rr815qbjy9np3xpj6lw4be16dwbx2bv0nzk1pcnk4v7qlssmk8j5kb925m6sw6uk0cs9z',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExample is too large, has a maximum length of 160');
            });
    });
    

    

    

    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: '3x84mo1dx3ezfsxzkvh5',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-01 22:49:03',
                executionMonitoringStartAt: '2020-07-02 04:46:46',
                executionMonitoringEndAt: '2020-07-02 11:41:26',
                status: 'RUNNING',
                detail: 'h5kc08i17i6e0lzhl8zoy88hs3i74mrbrkjub97w3e4jwcva9l73xdd0juzkraqqayv0583pzs5rq10775o4kw973mpu0jblj0ih2315hh5f0v463i1kho83dw1rg7l37rwh78b52t9mktd5afrtrl498yw0que86zs3oe44iuskvuq9aleiuy5e8xeb9l78ipp3vugpbkwtaeie4292gypiciqe5cmndboseb8ed31g3rdhytx5ozijvl8vywc',
                example: 'du3xe5an2xd9v50a2m5yy766k200p5bzk93g4d06890rqtw91t1c9st2ja2pgcfzi91adg5jh9imxcf5a38ajctc564jag9qgoxavfbnxoyswu9oqzgrmsnalqgu1u1663km1aj5v2imt3vbx5mhahj69ofiiayp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus has to be a enum option of CANCELLED, COMPLETED, RUNNING, ERROR`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'pwlgr332y0d6exsxl4ng',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-02 00:29:32',
                executionMonitoringStartAt: '2020-07-02 13:20:47',
                executionMonitoringEndAt: '2020-07-01 19:57:25',
                status: 'XXXX',
                detail: '9x5u1pdam5e0ixnla8rcfayq775r6kqybgyqsd7vqcdpq1kg9uyl8om7y1x892o13qofb5rnugmg6j6olnhoog9vb6jhpmdvj0276r4025a9mqvw0fxe0o9badq6igkunhz9x3z1u4csh78j8dt0uf3aa7ialjsfyjl1vlzkkvrjkfqhns17ba7u7ebjyjzecsw7ub8yrosngnu29c01uaecetj6yqwq91p7pht6hyi42ou5fb8jlr14ydsdgfs',
                example: 'rjhfx9dt9u27t2tvf12bmzmkc3yhhu1rkt4kcgpmax2dzrq2eyluyonxgvciqfyveqlwbs6qv9kalimf0ioqdk1xd43pysl61hvjv158lrfgc6xi61di9gw5n6j9mao38bt1f76vf2he89dlvr85csjm6hgln8xe',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus has to be any of this options: CANCELLED, COMPLETED, RUNNING, ERROR');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 't1einnulmeura3fk6ra8',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-01 23:55:45',
                executionMonitoringEndAt: '2020-07-02 10:36:23',
                status: 'RUNNING',
                detail: 'kptbo9lqbtpxb49u51b68xcxpc4kwt9b0ktuqcal6fo9w5de9682awpo6j3x32j9jit33gdh55dpvn3sfshnrlidt7r39n3gq3nnykemxvch95r3ctlf04pfr985a5sa4ayd9j2lfh6fr55v5wk9pd22e9zksb68mp8oh6qebfln9mbhnka6qmao6zko0z7i6hxz0op3v177p10bk3ez0n1v1tpgybwjdlvi8njuuchmp9jv0dyugcs75ghiyym',
                example: '60m663bbtdz09wjc2t75sxhq0287iuecdwszgvpwe1o4g1h39j9j40sp7786n353vzrd1l72ob1ye4hiz67rapgp51ulx254i887btrlvq3qqjt26textzai95dffghp9pv6h4j3h1be45ngujju2gn35c7gmv40',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'wizkdygn83w0re6et21x',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-02 11:00:39',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-01 20:46:08',
                status: 'ERROR',
                detail: 'qzbu94qqzan5w68ircr5ksqq73fz12h8olk68xbyy08vhrlp1gqylhqehehc2rcs1atmhdq2uqe9uydarkcgvwyvxzsys2nmnazqrdvidpyqixtto3h8c3ok4pio5hzyuxlmoofshhk53eyj8nkbiac89m24us9zgzaz9usv6egmu1bhkmudmeztcivblz1wenpr7jnqvru7w4hsm9mw5dd3dvigrr9acswr18cpri4vbgez2amjok885rq7efa',
                example: 'hsaemfhod7o0ggsx0ln8bsj44ltdm5j71lagbr9dtysa00vss2c0ek8s43t5tdv4hkpdg5igelcc5cn3igt5kdt5i07a4dz6ye437db4k1o2g7228g2y4cuajs6z1rt8l0r93uwwr758v9mwpuvenx94z7z4dczz',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'wxlbus9j0r1y5rowgz8j',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-02 13:32:33',
                executionMonitoringStartAt: '2020-07-01 17:54:51',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'RUNNING',
                detail: 'ivsvzstpnz49sodk4ock7jz6rdr4y2wqvqn0ixejcl4fflsw4yo4doolhhcy3bmh22tmq0ygz021ka7l1o7pxm0zbt0ehlg5r0ufonm29uwttjp6l5hsnujo0y828jjxc8s3y58xmwni0tdlkyfan8f1j47po7h3l41aaop6jiq8kkhajba8ax22s7yivt7rz0yng9r0attzymv8yuarzol6mvbztuqr0x190vzafw5safhso1h5y78xi5wf2pr',
                example: '5jytr2m9bfsxknytkn7pb91ny2b2zdy5eqy6ujulve53drwz6vr4ry54ajse8ywut64c47a796nm2q53f2cbqaiv4w1t5t0mnwsvd273qfqm165t1dngg5kwqlequ4hme82txusq6iiaw14wd5sxvs2qcv6etdsp',
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
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'h7fr9f8z91dt39qlwalu',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 11:06:48',
                executionMonitoringStartAt: '2020-07-02 06:56:37',
                executionMonitoringEndAt: '2020-07-01 23:26:50',
                status: 'COMPLETED',
                detail: '6s7gt93o6u8eg5kdh87vueriefo5ueb8h78cw1vmow5lmaphgo4mvonhhamepdhz1ikg9l2mb0updwvjo9h895afsjysjmtfgfga1emwo1lnci2srx5apjf9hab0ugupthhd5tmllnvzwslxpauex97rpf4ttjqfn5a9o4wibtg3jj8689w47ja2si2vdujt75q6khpmia2mw1uv3piur6nsfwmj3nbc0znbhfr385tqosodaaex3n39odqmgc5',
                example: 'shq3byrdn6o6l4d7v3a9gkxy4cc6alvfqm7dgegomu2utwlmgy31r4es7k7xp1oowvzi5jet8kj4ueolaw6nc8c5ida67o2dwppzfzybtjb78twm4uxz7c8pao8xoltmxbvvagnu3opcuxzvmltrdcdr81z7i5ax',
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
                        value   : 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db'));
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
            .get('/bplus-it-sappi/job-detail/ce5d3987-ce2e-436e-851f-ab6d1ef3d1db')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db'));
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
                
                id: 'f4a5b556-f953-47e8-af7a-dffe9f530ea9',
                tenantId: '3f0c2999-dcd1-4a6a-8fa4-86d2737ca52e',
                systemId: '990fdaf4-0cf1-4880-8ca0-fe90eb5ee8e0',
                systemName: '79h6o2zl5diak1tqkj8x',
                executionId: 'dabd9708-4ec9-4544-a15f-add0f69e5f47',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-02 09:42:59',
                executionMonitoringStartAt: '2020-07-01 20:07:06',
                executionMonitoringEndAt: '2020-07-01 23:47:11',
                status: 'RUNNING',
                detail: 'j19g8klai2dtkqe0m4bqdjrkmv3jnd3v3cyad8xq77kz4h87oss2sx2k2wq63x35xek7hfs5wdb28nbhvxp39bn08z874fzu30pxia4kdqoazicn2dd4aw4t7qutufmcefb1w4tq436zptsvwl70iikpzmcaamfufbca8a56sssyqjj2tjdjj7bxhzgverj5mjnmdjjph15ucy4oo23avb6bz0pqvxlm6xwndpozb5o4zj7jgye7s21e3iyurpc',
                example: 'k5zjfjx7wyo3hfx3r00t4dm1ofoidkqx5jutcfpr14bbf8ktxpggxrhvmgch5tonvkxyxfdj5cebd1cmy906ppgbvbc9uwlojw6cy3mjnn8f7rbxs7m288yft8vku4fhu5mti8wk5drhu1e7tsqzrsrxlc54m7xu',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                systemName: 'bwmc1p6dz50didh9gbqc',
                executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-02 09:14:34',
                executionMonitoringStartAt: '2020-07-01 21:10:20',
                executionMonitoringEndAt: '2020-07-01 22:09:43',
                status: 'ERROR',
                detail: 'vpz22u1jg4smp7yxsl56a3xc42yvrowj8excox47y1x3t69ybc71u2voor8cq5y5vvlzg0vh3v9p3t3te8s5zxsu9ix3pjd9x3ym2n43vojm5xzcvxyq7lnryj9pptrhoydzuk5j6n5kgw6rvn25htzcv90r6esigp5107kw06gjza71plbqvbv0vqflb61vr3g7wnj9vtlv70n0uisyexnj74pmoykep702xtqwqopib9jdkfqtedov0zyqet9',
                example: 'h9gtzyz1f7by5yg49jx19rm8n0qwbxegmyqnbj5xquzwzg13gbmxnsjmph1jmtfsqlis18gnrufcqo1aca7nok6lun82uw9ayvzenyl6k0mgb8pjf97a93bcex5e7cfhyi77az3fgr513yvuc7lifgd520qvb60d',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db'));
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
            .delete('/bplus-it-sappi/job-detail/ce5d3987-ce2e-436e-851f-ab6d1ef3d1db')
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
                            detail
                            example
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
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '94afda38-6ec2-42da-9677-addf66707d91',
                        tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                        systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                        systemName: 'zm8k3e9f4sxjiiumz5z9',
                        executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-01 18:09:40',
                        executionMonitoringStartAt: '2020-07-02 17:13:29',
                        executionMonitoringEndAt: '2020-07-02 05:18:30',
                        status: 'COMPLETED',
                        detail: '62q6v42up2di2bu5ou4szogkwv6c0mrns0w5uvolj06xwy974dv6cvnv74vkenfeds4oc33tze1fmr16b5c0tn36wufmfuw696a82ja11gym9zbwnl9hap7n2ez62wxzqscdrhaqyzla2trpf35ibn65mszs2cd5auzttdh2thj7v9ju18n79thr56q1x8qwwegoazg2qkymlds1qezlz5rcdaosdg1apdd5480l6j0dnhehmoagjw7s98uawq7',
                        example: 'znh59lngdahflibvla4z6qjwgwylt1bvoqf2tqnipw8n1vse9o1g0z246lmd7vz4dqdkqp4vtpqlwcxtr1kwi80l99h0rfhs3l21h6thtf2odbta8taai86kl4qat7qg5nn7cwbq8v1r22c0r7g3bmu5moscuibh',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '94afda38-6ec2-42da-9677-addf66707d91');
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
                            detail
                            example
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
                            detail
                            example
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
                            value   : 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('ce5d3987-ce2e-436e-851f-ab6d1ef3d1db');
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
                            detail
                            example
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
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('ce5d3987-ce2e-436e-851f-ab6d1ef3d1db');
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
                            detail
                            example
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
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c1f7e166-9399-46b1-9576-9cd40fff7bd7',
                        tenantId: 'b1ccb102-68fe-4eb6-945f-c6c11ef735da',
                        systemId: '3ec3bc18-b267-44b6-9346-5441f7de6c66',
                        systemName: 'e11vrcym0ezkqlws1hm2',
                        executionId: 'cda46810-795b-48df-b5dd-0349cf53ec8c',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-02 10:32:13',
                        executionMonitoringStartAt: '2020-07-02 04:43:59',
                        executionMonitoringEndAt: '2020-07-02 04:22:42',
                        status: 'RUNNING',
                        detail: 'ac8emat77vuecc3sfaynahg25pgtfd3rnbfilinmdnmbkxl800ifmdnlfzf9aj5z31hv70vtr2yhou2q5j36ivop0rkatu0cx1r52ylu7lyjn3ccug756sc0zyxzid8ec9kulky5ai9yiaslt0z0ksis07nya9k90n0kybpg2z4hng3au1am620ksubhf6df6pkxa8xnib3gkcqsak8kvs0jfxqul4qbb4fgc93rxe3nhxoyi8h6r93yhyd3u2o',
                        example: '5wofc5bukhypxfztzojzp87xs86z6c4wqd6m1u2mn0cs8fe80mfp9nrjlfxko3o41z50ohdhfsc45n60khy4walullrd5a96rttron2h0euih0i6vi1s5fefq9weqh6iag7b2rs74vqjqhc5p0r700rl7m8x41x8',
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
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db',
                        tenantId: '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4',
                        systemId: '11122a48-29f9-42b1-a88f-9076e4531d45',
                        systemName: 'egzyz5b2t41z6wplpals',
                        executionId: '454b10e4-23bd-46f3-b88c-c858d6a9166c',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-01 18:14:25',
                        executionMonitoringStartAt: '2020-07-01 19:53:01',
                        executionMonitoringEndAt: '2020-07-02 15:35:25',
                        status: 'ERROR',
                        detail: '1znckpjh6hjn65321jzsxb0r1513humdzhjhqo4o28d99kor6gl009wymcdrihpzruzk5kxoixp1m3xe7u8bshhpx5dlcwiygzhd5gq3zq2veqbc076l0ymy4i9vk82uxguzgye5mm1mwtdgf1qlhzv67rfcszdbn4yevprrco15q78glgjj61aib31chztcc2eup209dtxyqova8fno6u43exd6kbyc5v1dyhgmdkoasglqmpr0ppkqcn8fsee',
                        example: 'toahi5xsf50qv1omn3u9b6wl6ewid1f8g6w0ce9qnvovxfrx8wsh83es05e7zrixoynylhdyfm2ylxe5xkgm9d8zst9dk5r9hcnumaoewgwunyuegcrem9j9ex55yuamjisb8wif3l1x3ygnhbtw13atb1n7ntn3',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('ce5d3987-ce2e-436e-851f-ab6d1ef3d1db');
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
                            detail
                            example
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
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('ce5d3987-ce2e-436e-851f-ab6d1ef3d1db');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});