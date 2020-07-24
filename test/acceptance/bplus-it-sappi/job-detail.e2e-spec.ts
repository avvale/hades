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
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'n0yz3k9revkgkfbli7wzmvxjqxdvryxu2z5s5x3ozf2aoknatj',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: '42gjhf3mnca6muoz6dya',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 18:41:53',
                executionMonitoringStartAt: '2020-07-24 11:00:40',
                executionMonitoringEndAt: '2020-07-24 15:01:21',
                status: 'CANCELLED',
                name: 'gud8gxfb61cqwvm4h9d77fz7l845kp4gq6lh6dtaniviany3zb6xthp54l8hj743xnnu416w5egl9yq3xklh0nsdji4g8009zxpu2ziq7uyipf567di7v2akj6ds81njk881cxdmq6yrzoflxe75ni364maqkrb1tmibmf2rv1igfsaktr3cr5nu6jykiha616mh2oqlm9pb3b44h847cxo0h1521pin33i3xpfb6dldkgazbcz3ha7zf4qfttf',
                returnCode: 8058908832,
                node: 'ww85ylli8hhqhtbnfmht49na85u360m9gcad4wroa4rfpg4srhptachk24uswdhtofdiqihssgafyn2kwiroguaxbalyi90uruzatgtzchii5kiq9djywal4hyjrsa5rhk0pc4jbkbp45dkq1uojlcbo1zf32h8z',
                user: 'e173of8ujshx1kysh5ylusw8if6wa11xes3i11jdvwoesu49dxlh416bxl3pqjx4hevk4qczkcjy3fxtnw88tslspr87h1c87h6hfps6416pe41gd2qn28kp0n9enl5n6vhev76k48gelo1vkgf9snkcmvc1vosigfk0utsl2tb6puy7pmkfs7e8m48f80uvuxxmeghvmkrwuaipo3337xcs5b6e8nmh197bhwf5r10qlyj1ybcr89u5jjyfwi3',
                startAt: '2020-07-24 03:20:58',
                endAt: '2020-07-24 03:33:03',
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
                
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'gb6hc3molefvrfkerzdnu8dfsbqk8ny3bqutdc2h5yhe30btgt',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'ww9ttq2ah4jf8ud5y9mt',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 09:00:03',
                executionMonitoringStartAt: '2020-07-24 11:44:58',
                executionMonitoringEndAt: '2020-07-24 11:59:48',
                status: 'CANCELLED',
                name: '5wnfdu5l1ryze5erxzc327ahmawpa3m3z0kydhx1r0nr8ne2gti72wcem4b2y5wwilj8g21t2vmp1tv3fv7m4tfaxxcg7dze8go740s6izej1w0lh8jehgsx3boaxp3nnr74nlyu8h800vnfk6h46jxhle02p64p0xnjs9tng9wufs8e4nxeoqm73ngpvxx8b81kw47lfz1t2ze8q024owkmj09oqjyxwqc7bpd2lodbyzmukeoqqkzxumv7gnn',
                returnCode: 4798219354,
                node: '5yfgqon9kxlgih4es5048k06vehrvhjo4u53cojtoz8km2r3isb3k4zqnb2afkgv6mb4io4r3zl7465j8ox2yqb4qynb2nnx9sddvmgt0rh4j17we5hdwk8prm1e17qlfspytdbj30zfsapaq5cvrhwueqeygv37',
                user: '0uzxhp8z23wpae86pswuvbx26w66xc2iaaauu2687rcl2zexcsw1n2avb9si4r8pauw3q7en2mhmy96veicjxd3dl6q2d1w5i7c3waidhv5ae9ocqv2yo6u3d30wllhtl14jhgpj0uufbbfj0s3950i5r96v72s6y04uvrdob0yqoevlbpgrfgb0f9nk0f8dy6bmuaflrsv5rcpoueht47h69anqlodru09xlbhhw5xtc61yc40lqetn8iytg47',
                startAt: '2020-07-24 13:40:58',
                endAt: '2020-07-24 12:10:48',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: null,
                tenantCode: '9ppjy3ovt7fhnevbpicmkpfrep106e2s4ig986ampf86g07y3r',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: '3wf9pkp68y34cs1cn7hs',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 08:38:08',
                executionMonitoringStartAt: '2020-07-24 07:52:23',
                executionMonitoringEndAt: '2020-07-24 02:46:17',
                status: 'CANCELLED',
                name: 'znl2pevkbzg70qi3q5inkjnvbhe85vmpduixoq2fct1u3at5p53vho9917sctcug7edi81s3yk8wsfr7w40wwwg7g81lp70x1rjpwpqixlbotjw9xai713sf4t05xufo1cxa7u4ikkaplhu9p63b6cd3pa5pz9n4vc7f1eb0k606oqjvdp5lahjdy05swuuxy1y0jtqt7iqdrif9jx6fh5pucnt9ljtgn7ossec4vlfuqit46dunei2cgbh5yt1',
                returnCode: 1935447483,
                node: 'jexidcqzjcanko4qrau1n42i6mph7irgvizz24vdgibr5afz8g42htnab8ka4n27pkbzmpuw1luogmzu0b9ca3sq5nmlz25ta5gjxhmaepgbndg2kzxo6eqvv9t7o1ukv075nc28zxg3qv4ji46m0tu1ctyhk2vu',
                user: '88tf9tksghj3g4mfi7hzyil4n69ellg97v9cqewnmzgscgt7s853uzr4sbm6g91gg7d5713tkve69g48bijg8w9dzdzhi5x1o6odrnle7mzl8mzlian9tvf5ewxvvlhwxhdpd9y9z41p2uzcdaanfiqahc03cq5kekwsylyhnmly8fqkxaox756r970bay61l2ulzt4uve4r7ev9sdof5tuqthxr1yt8v5j9ft4nopjovdwyaeurov7au6hrral',
                startAt: '2020-07-24 16:17:50',
                endAt: '2020-07-24 00:18:45',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                
                tenantCode: '09fk0tlp4w9u15wujtn8a6ekm6x6xyzojj8nnittvy1sw3k82q',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: '0brj72zu0hu1do4lxahb',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 22:58:43',
                executionMonitoringStartAt: '2020-07-24 13:47:56',
                executionMonitoringEndAt: '2020-07-23 19:37:28',
                status: 'CANCELLED',
                name: 'h2ao3zc4w21872q7mdg8fxuee1qo49z4j5ugiw8781bh5zpa8j5zjhtgd1yl8cnszlu8v2b854vsfwi3irwt2lkfk42zb14745dgj311ed7acvru6gudvyixp01o7n2f7o08j086ro6l46yt79ir0vqz7hjmybtloy8cjjj1n827d0qs7m7gbf1l8mhjmh1kxcc4ewcmk44ciytac4tfu5794gscfjyuc43zml3hkvp989f9na3ib1baciqwknp',
                returnCode: 9006005435,
                node: 'mhexwaahb9z9mkrmvhbrsdr4w0tef7cml4q4r51bj1cb6ufuf1eb4yznshp3ncczdianfs55fyusznbxoodjoz5jg3kv9h3adme4ntbcy1ccb838f7i4q2t6yhbxku0mhm2zvdamt463tprbefo97s7fdajrvcxc',
                user: 'eqi68w6fop3wjxunvrgahndxa8ondtaoyc0gkix27gla55qlqij7pz5kekrleuxeciqmo6jr2x5kr74u0vk3u5f5rd1kbohwjedzf7lbcgafl380uy2698vlq7lnui2h3g6jmz65yirkjtt8l61ro0x4ubxknxqw0wtra5vw2kwbnezdx9qcjr7wfhw57m8j9kkqcwcy17ksvft0c0jvzeab1dte38wi57lvn6hagg4ieodz1q3uv4cfmz8gu0w',
                startAt: '2020-07-24 10:48:43',
                endAt: '2020-07-24 17:19:12',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: null,
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'gas5of67dz5v2tpt7zkv',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 05:39:46',
                executionMonitoringStartAt: '2020-07-24 06:22:49',
                executionMonitoringEndAt: '2020-07-23 23:12:36',
                status: 'COMPLETED',
                name: 'tjjhyec372z094xa3uf7sockb8ni2oapqm8smywda3vliu4n7tsx72vhxgk2irzabak1mai7y8w9a1jredy10h19z81f91ui2z31tvx1xt5q01xlusuf082qxloagqa47vxrucpj8dkoi2tiky9i6x5ys30c5zrbyp0ymivl9x8dpq5b6ggb9ien8jqczo4fodpk60vxe8upq90w2lj7hc7y83m3zjgqdqkhh2mcwsa1rbr7yd79h7b4ux84tab',
                returnCode: 7623453469,
                node: 'i7diy80gvyx94faj34c8zngn3o964oe22k457nhcaisrebgc0ijnz4zlzlw3va7sp0x9ljwxbdwx0fznxd41w6au8dlxkmt6d4amqyry2szbnhrp9vk23r7inrv3wcg9ps6us85glh5oye0tvp30au8p190cj85q',
                user: 'tgdvirbpldkue93gumy9zr2q5l15deg0tpuoy2c2b0yrzhdnkmecby0e0ifks3b6zqay2fcgjgs8n1365f5m156v7n893b45ttfvqk7knd1rh7b4yv9j1nes0b4o8ohshzp1gisltf3fldy2g1qll5miirkvi6h4uehvvhu7enxdo7bi8ldh05jfev2zcobryensqb4tf56y99ux1ogcrebbtbimzitvubr7h97w73wi49ngijrbqtxtx6on0zu',
                startAt: '2020-07-24 17:34:05',
                endAt: '2020-07-24 02:56:04',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'flnvh13acv6epi1xcnny',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 09:16:18',
                executionMonitoringStartAt: '2020-07-23 20:30:23',
                executionMonitoringEndAt: '2020-07-24 11:45:16',
                status: 'CANCELLED',
                name: 'x7d09ezus4rvh7aaf4q2pt9dfsi5fowd7umpfbqajjvuqooqkt84kcpw9657jw5lb66n3xxyf4fo4k0p4s023z0u0x9h6hv9z5m9vdlqzye40wfwwgqew9iyt21kl5b3ru67ekg6tbdt8h0w5l67cenf5y2v65utau8ch1ik8v962tgk4fxkrwiumxqc9bcp3agkuou3mpz592l5ypmwn2b6alhnexf7hjkbw600qf39j8evwzbypj407jd1792',
                returnCode: 5201257097,
                node: 'p9al3q47o3596lw47qvf62o6m8tc2f00n02vu1tq10lokyb6j1ivqasuzzcr6hb66hsqrcotd1gi7ga6mhkrcnshb8wwobdzatx4sq5hzwgz99zvhkpoyo7or4mcdv4f47ekt7jjwxeki06i0j57w3afq3594qyk',
                user: 'q1pxouwttigfzvddy2q2feg69854k2szpk90dap0eihsq9piouw80zr29ju136rskuufx7tjnxuyik6tmdkgstqrroadwtd9bi5z425nn4nmjxmla4yissihv8oja4fdrxsum84ikvdjg3417gv5aa4qegismpmdbg6scrzr0c5eg7kp6jkuw8q52xk8twlwjrwng1ifbph94j13cmuan2j8jsnzoal02kyvwlx6t08jtpgicogejttez48h8li',
                startAt: '2020-07-23 18:26:41',
                endAt: '2020-07-23 23:49:25',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: '0nzhssxdl8h07l8w46h7u4te6xqaabv68uutnh2flusadx2f90',
                systemId: null,
                systemName: 'kl1umpsus7wzd8kjw8vm',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 21:55:09',
                executionMonitoringStartAt: '2020-07-24 03:50:46',
                executionMonitoringEndAt: '2020-07-24 12:41:50',
                status: 'COMPLETED',
                name: 'wt6eh21zm3b0zwxhy5mdc6qibirokrzk875gm49gfn7ichexwvm53a9omqq4gtnl4fw7f8adi041cm954j5gfhcfoweetobz327vx1b1os0c9q7vfa3upepx08868qgqvledd6gudt2zi5g8f2qpvgcmitsrkmvr1jm41davlcq2ob8xoqxuppz9om0t1hoq7n1zki9sg1rf9rotdbqf7ji4puc2jw0ubvfplwp7tevlw9yf2cbyzou6iizf5b7',
                returnCode: 4503456675,
                node: 'o9j6zzrxd4pa41p9qph3bza6xgkb92fgqv3guosi8mq4yaqihcol0hr68f6ui4xp8kr7dlxim4dgs4d7hcy1kkredpirez2c50ducpbki041mbzmstsz99t2dcl2tctidiumpeqq09cgzp22lizm7zt1k1zsa8xl',
                user: 'nnwloj9r0wxpw6o05chfe9ahkdda71wf7x7go97zb54yg98zwf3jbioi2s521l7sbwlpwcd4l1pdj2smiawbztykem3ewypnnfjubl8bz7lti4y0jexl6021lq5mze92rrhwuf2qaparf3uc2y04pwm6cd6mlxuzovilxxi1dfrx941ma1holidgp18335xfxn1grb1gzqh6wiqt3ncsombb1ev4hxpj87uyickl3do3nsmx5mw2rpis2rlusxb',
                startAt: '2020-07-24 08:52:37',
                endAt: '2020-07-24 16:58:05',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'owh93w5p0s9u5bcqr73yoalt9q0z6iyavy19dvevbml3s3iwmv',
                
                systemName: '1gsul2lxqc1pmfcxzvft',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 10:01:49',
                executionMonitoringStartAt: '2020-07-24 10:03:55',
                executionMonitoringEndAt: '2020-07-24 01:54:36',
                status: 'ERROR',
                name: 'b5hthf5vj9ofq67o8dn68flfz1hh45uu5y024rowej79lx6juwyl3dahg8lgqxq2ag36iy1a6wk7yefx2qpw6i0uw5lajnvhl2h7o2qbzymnsecqtpvrgcnchr225nq9redun5y6kujlmzpwcagxritjnxkid219d4djr7dq3ke1t7ks1g43awjbc18689k1ow0fdnh2wiycfwrmonu8wbyv91fz76jx9icbd1owsgga8fl3cpnx9566dq88rk1',
                returnCode: 8972359579,
                node: '750vfdm91i7ywzcfnc1ch4896ldzoyhgi9c1f0oqj4c2y93zusosya0j1zsc3ewhmmbhxt61kne2zyqd7r861u9mmztm6nurd2l3rqfaiupljmz8fr63blzltfz1v7p50s8zknn1ztn02q160c2f5jan8xyppjgu',
                user: '6gvegsfo1xqzm7o7czht50r6nk0t6bysbod01lf346jwe7pep50rfb1q2a9jmfgc71oew3hmjvrwdzup52cbdfbapvu3cx56nxt343pufyr0imgkjk1392ws5jeisnirxmo2yqa3pvih0vbkp204tridb6nti1pestkkq51d5d43x31dqiihwp1njtu2fgu31uevtn3j9zn1ok5gqa3f805b1h2ye0ps2kylht4o5mzdu524prb6yf9bwybyt4x',
                startAt: '2020-07-24 14:09:10',
                endAt: '2020-07-24 17:25:08',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: '05zn5625we3ijkynqp2n73qmt14890h614oyanz5wgeop8vw7c',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: null,
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 10:05:56',
                executionMonitoringStartAt: '2020-07-24 11:50:08',
                executionMonitoringEndAt: '2020-07-24 17:07:35',
                status: 'COMPLETED',
                name: '8vkymun9xtdrvicksqado7vq0b3d7zt3u0cr6amck9uo92fobf0ywo1d0w8jszlzv5qzr1ih1p15qqbt1zioxf3ae18mpz155sucagiiprucwryezp8vnzs4qajk94w401bguwke366qa27cedwyn1hi2s6n2noc8eud6a9jc396x33a3k8v1x5d8zdb9j7l7jo7v29kb4e3fngnkfrgcc4dz68xnnn4g0fummjloya98ywcl0i3we0mwmmczc9',
                returnCode: 1851906534,
                node: '37svjp8rw8onxatx8t82wcxi5p7l6g3u1bpvy9vrw82adyncvwr8wwixwo0sf6xv3ny7ah92om4cllhzmmkqjp24ju8t4ft4knajnmdlttxino253es2htrd461dqubt2572c45ni8mtm9zph6540pyfvl0ch5v9',
                user: 'cwikvclgz47wywwp794h2cn4g1jjl10dwr4z4uajouiblloytukp5oqsuuuu5q0vskt3bylua9phzgqb4d2n255bmgy6hxhjuly8np89woux73rbhxi7ulmr8l5cr1a2r9fsffv1vfl8a3akjvz7n0usge9uy1wmhzl41pls7p9qg2cnphdesqq0mm5fnweibj86dqhe2ivcusxnnvxixv621ki0ywdx43rsudake2eioihywvsq33c3a6l6mop',
                startAt: '2020-07-24 01:27:50',
                endAt: '2020-07-24 05:02:56',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: '4nhpypafdbr9mqyus5tfmhr8qofyidkbq5gvj8zl05z6pgmi08',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 18:54:53',
                executionMonitoringStartAt: '2020-07-24 00:02:36',
                executionMonitoringEndAt: '2020-07-24 10:47:58',
                status: 'CANCELLED',
                name: '8kdbbj2tcl906kmfge0k3kwe0uolmub1aj6rwjhrks63v5cxlq1acphwblkzgt58xqpmci4k3e8w66ycenpuygckonpz7qk0an9qsdnv8r7ipgczqd4u0a95he71fbbva76s80ifxnrj37572m9qhchnxvxdhtnxjko6wmambgyio5knsoi3e40wulxgye3nf9uu6aiaolo93y0cvg75cuzga1l9dvtqfv7nzg3lmu6cvjth77z1ds2278qoq9v',
                returnCode: 8991526438,
                node: '9gwhxzy93g7s8902fiyq5iubcc3dpvpg3z16uh7ijwpc8hloom6y96ssuoescx2wtvrwxza1i2294qmk2o147nshfcx0zkapl03kyu9xb0y57pvlfir6amy15a93vhbn7kxwbuf76r3vu3hh2vou0r5a4un7gtov',
                user: 'f1qwf032vzhp7ebkeeu3k3dhcis4l57inewe7uhbaaeanuhczj7f3vvvnt1s0bhxgoejjzxlpwy343sc8egtjt2o7h1atfri4pz9akppkocrh78kgdwq4owmyikh40knqjyrridhmar2io0vhqhihx3r5dmywicqcodgdl6ac72crfk3ot0m2uzq8yxcmot7sutycosx0rk1pp77wgae38mj62vjnd5npebcc9palqu2o7oqvyo5eo6zji24mp8',
                startAt: '2020-07-24 12:23:54',
                endAt: '2020-07-24 14:10:39',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'k7jfx1maw26xo6ck5mtniaddmt67jjhhyavbx595hqqo4mprmx',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'zletp0fokx8ropflpwaq',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 10:33:05',
                executionMonitoringStartAt: '2020-07-24 05:28:47',
                executionMonitoringEndAt: '2020-07-24 12:22:54',
                status: 'CANCELLED',
                name: 'i247sva2pph1dpi0bd08ipabbvi3wxskvgj1xepf5u4tglnz5ht59ba290z9vhfoukxm75t0qfna0xpltbyaghnp7uq1yoz8nm702zgcbakhfzts125ut71iww9nxr7xl60qdxdcy6cqhao7leav3x796kbc33egqvlmgqwmdmkpd41q5ruz1h0wlv55arzj8sdht6d6d8io4p15741fqyo48635uf7mne4tcd3tx1r3j4lr5okpvvikoethf9u',
                returnCode: 1671143170,
                node: 'g3bgcucu94o2kdzpkq226d7qxcckmj7tcd94lxlswma6loixjdk6reskgav3ei8re8fe89d4bskv035gwawdotdx8eg9tfdw33fjodfqd8vw8kl4jrcpgp1egdqeq2jkopvtqthmw9oai1f2pozinii8d4ac69wg',
                user: 'zdvmmh1rcm01woyu4cgd79pnzbnurf8qvh8smsfci8mv1qanjh1zlbq9m9wis9kaf1skm7fk4btf74nujyyur0vuqh6ygm6gnqg7q2bzgwahwvxpkklfaehb8jwwhp4mq62vhe5izxp65tipt02mwup8t8bltf11462cg8zxtca09unr9j1q38otmf3to0klgnlaxhvzwopau8strc6u0tg7y2m28je4l1lpchq4pxl3cg5i6m1xakzb6nwznce',
                startAt: '2020-07-24 10:23:39',
                endAt: '2020-07-24 14:24:16',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'ae11kbxfp5caeujbfv93qbcvc9xvwy7fg0iufhx42mg7avn6sj',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'op51vsjkphvs3fxgvevb',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 02:09:09',
                executionMonitoringStartAt: '2020-07-24 04:21:52',
                executionMonitoringEndAt: '2020-07-23 20:46:57',
                status: 'CANCELLED',
                name: 'yr2opl32i14kminz2twoydqouaog6p7ri0nopi1tkr4iv10oq13l4eye66grr1tav8l2r8icwk2xiva1hzjetto3tquvpzruhmg5lrw5wt5kx2tyr6bkqurmukc8j4nhomudr6blmirj2zgj1e28zgsg5eknfiqpl1q51g84harpt72t9sd2oas0wqfqip9ozps297m0dmez1hsvvzsuzt8cbjemqla0c9a9gu79imxxeuo7ehrcdktx5cxn9ci',
                returnCode: 6331667395,
                node: '7fb1oein4k7aldmwksumq9wlfuq37nyh5mc9grdu1cfjvgedtiyouj3mze6ltjqb51hrhq39d4ovw9gux3y935wg7s2hufhc8akcb5fwajzw2so3w7wcdfd1h4b3b90bc2b20b4e7vfb3p6mmcqqw6thq7gnin9w',
                user: 'aoivcgmvk6e2x5wgvvgdtwbqo9t5o8e3x2nx6hw4wz6eo94ng4xmq5q3i9e3kr6u71lkkd5za3d08b2brz4rk0a6se3lpux2bt9wq20j758iz9hpcyu1f3wn1ictniwffz3qsap5k91jny0inqw08prery3hzbe4psnnuln1p634lsw1tkt2435f34zwlsyiogq4cvxg6u77jeu9fl55bw5fgzztv88t980op7rlirwsidibn46s5jsa1wstkd3',
                startAt: '2020-07-23 18:07:06',
                endAt: '2020-07-24 00:43:43',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'jim0cj4a9klf86019yblxgqnwcqd16cgpv374y4l62v60khq3w',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'ppnqc2ghw766bn04idmk',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: null,
                executionExecutedAt: '2020-07-24 02:57:55',
                executionMonitoringStartAt: '2020-07-24 08:24:54',
                executionMonitoringEndAt: '2020-07-23 21:35:07',
                status: 'CANCELLED',
                name: 'wgzz2xax6dr483lsyprzgxounz0511sbawlevodbcduk8j4hfxdxuow9k43vp1nlvplr5ie7xggj0fhosjyxhglk8gtlx3oguhs7l6z75wwk4mch1upwvn4ttevcpgu2auzjeuyhbh5g7noxda6zuxd6c7b5026z344wlju4cyzejy94yjgajqiqiyaosart260bkyrqbjf3uyeloemtzeij69htyq4tysbtxjieeouv1qes7ciivpufi31ogt9',
                returnCode: 6382153488,
                node: 'apwyab6lvz8o6ic3rn6up7zyo2bslwwadabv2tbhvzh4oxsbxsup6masuel25766v7vsoxchy6weqyi2zsy8obgpmvs5b28f1hx7jnr15b9w0itejy2tr9fmcko5wx1pdwrc0x4jcrkgngiz521ktyo8l83t4uq6',
                user: 'e555lwo2uokyh1wxpkqxdwnh4d6kneuna27cooql3anfoehyad8lfop6njqbj68uucd1q6ozwv67yyg9u2itcnb0e3vhj8xds1kygwugpynzxqruidoyk9chlbvhlh8d6jhyfskdyilzmw65b2dqvfl86n4by7q1lvguy36dlz8gvcz1o5in48w6o3x0t68m76uqg2zhtv2skp4ut020hmrj4vc8rwukjvb5u8izc5xbr4euhc6ogam0ely0k1r',
                startAt: '2020-07-24 02:15:35',
                endAt: '2020-07-23 19:50:39',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'trr68zxv5kohcayd76iyu8x9pb54qw4yfeel8cvf2wps1oefnl',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'pn0v3vr4y9duy8wjbqtc',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                
                executionExecutedAt: '2020-07-24 08:50:31',
                executionMonitoringStartAt: '2020-07-24 15:58:59',
                executionMonitoringEndAt: '2020-07-24 08:03:28',
                status: 'CANCELLED',
                name: 'g5pjgg6k0pln0ssz4512c8f7i7gufulhutf5gg7m14124t9yadbq7hmb6cbkm430w7cfiquwvd8cym86196naqowt4eke9k6pv9yfju83oiw7zgl36xeey4uwjulsv465l3igk7d3u6a8zf8ha9s44ysn845poepc8pdcs00v745x68lcwwebrbqbnqngnxd82zqo34tdfll10pl0tyk74gj0dz7xvzdegphz3icyod93cuzrosglrd3n5hvhu6',
                returnCode: 4459020624,
                node: 'js64po09ayzpi9jxjyyxjme50fahrr4v3oabb9x7mpol2v3o1a2q3cw57fu04lzkq48ukmre5dpflwbce3c9r9x5f4mw596yxelr9ej86nflielihbg1fye4d5x4onm9ihtdw1oa5u27rs8jka7nq66bprqf9aid',
                user: '44svlow9ke3x4ouqualdixqw6pzczq58qq8ogc8kwxysdmxi27vpkimxxki8ywaflrhgg0m9pg1xl983n49u58mnf3yxm5zh3rh9agt66p4i1gbj9l71h4jnkkmhn13322ku0agtx5q8uxtmc9uaavel9ll5fcmhfo0x7sypi52p7q8dyr8cq5prtduud459lbczdqcgyiwluqe9omasfahz10v639u4j035p9gv5dpjxu8416130m7n63dd4bp',
                startAt: '2020-07-24 03:51:31',
                endAt: '2020-07-24 09:53:42',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: '2wrliiahqcmsfxdryrfn6m2ar7im6qad7jpinq47is7ud2660p',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'pqtplholjr7ri4zzhpvd',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-24 11:28:13',
                executionMonitoringEndAt: '2020-07-24 07:44:42',
                status: 'ERROR',
                name: '2fvbl4qlk0bdbjnxhdmza6brdiwxkgaesg02k5nz8jnpsc9qw99dwa2rtyraayfshzk0r9c62ngctss6atf6ywoqde3k6puf1i05d078pynyaj1er1md8g5v81gamomfb4xe0kihbfutukv8q4xcjiuz0cm1qamw7paq965u6bqassoxttvf7mf6ntgitkr0pv9afmsi1fdlnr00abje2jr5t8mtu8ngscn8d2i74mvl5fibzvwq2ibun04b11b',
                returnCode: 4008065100,
                node: 'w63ea3p2shbk9ezclkfuan0hno15arqss4lsbql0x4niri02q0rtqxvt5zupohqw9yizgi0tvnf026tvafxezf9xvtvi85ggh2s73nrq2pczbk7bda86x6rh5c3k5bkhgadahbhzggyfyf913wpkklx9aiyklb43',
                user: '5cv1qw3fncamz31elqvlmr6t68hzcr4a38ax6ppxvzhfvzw9xzupmbwqvqdnxspjwljz0jppb7v92cgltgcz1ck6ncdvjc6tgb07o9uiefpzck3fuzptv4nbry7grpe3x6kofsmzdel3vqxg07srmtnv3zb2ciqthsn8s1pgt5mdhmtixmjbz0wsqbsp99cqy4jslv0bmfatrdpkhc4bnj3qlyuo9x8n6cnkn927oezlq7146wqvx2crf8aayup',
                startAt: '2020-07-23 21:19:23',
                endAt: '2020-07-24 06:38:01',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'c8fxllpqefdz6riec18xt8w9htf5ep104jnrvjxhtbo324mpdw',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: '9hnrw2na9k6t2l01dtm7',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-23 22:19:31',
                executionMonitoringEndAt: '2020-07-24 12:57:28',
                status: 'COMPLETED',
                name: 'owg2jiu20nyiwql46t7y5lu6j0cqmiw5xpe8022r6aehpc5o0okoeq0jix3p4wtext3f1tpkk4h8j9rxkel3xejh4yccd6qnh94p8ivb3u7enb9qvu0fboyzm9b4r5244obs8bm0obs9qdpedk7mk9jik2ardu5qb3ufdo8nh5jz9ols9037xdxi8r6l304o99zd6wb10n4bw5cp5ahjcji1k6vgkm03pxskcft5nyhzsmvl0785t3zqgmcsmoc',
                returnCode: 1930070329,
                node: 'v73rdd7wjx9x117tzhhzupiapjujdprh9ugsz4trgcwrcbzt2glja44nbinuckct82rzrbmh884fgzw9kidkg1yl58iu8aeyxd3mifd75nqxjdsvx0wldpa7bvrgd83f2oqu80fsf63s5m49rdm802qeefna7xh6',
                user: 'tlv7k3abvanwisyp3vwexsxfw51r8fkjh2ktgpm01nwue7nmv6t9pkbaeoaiknybzkghv3ab8hvr3va903m4sh0d7772tt6qrd047g7l6lx1m7idd3smf7weblhzba6ppr4bkmpw058kg8shjbjngcb2pfcnsyx1yw2aiqypuzsgyw4xpot85zfaea1so8yaeri455ckt02cb4oxdi92x1xig4nqsqr4bgy5tf62881vbscmmgsclqfasrb02vs',
                startAt: '2020-07-24 17:36:39',
                endAt: '2020-07-24 09:55:55',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: '12nshnictul8508k4xj98e0oby5jkyflkaljsrdoe6ktk9502f',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'nf3u1d1t052oeidpmqot',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 11:32:25',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-24 00:15:22',
                status: 'CANCELLED',
                name: '30y7xem1kyh0akjx9s8v60d88tqfhji2osx6s0d7l1fegcvcy1aqiqg3vrx8szievrn4zt8sxncwqfqrhyhuq4g9gy2izgj3lpova360ba45po3qf4ff57oxwpp3q6xhhwi6noha6wqmbue3vhuf3u6z5jzw31auomcf0r6z6e7f1rmfekowx4ps5vbdw00lbmkl4c7q6fpke66jp5birn7ieqkx7rgdxb3amla357t49fv30h03vaq7jx6e3mt',
                returnCode: 8691160011,
                node: '8uoo6lxkhgmykygcu70c2q7tal9hjcge1m3ftxrmd4fjlxb3x2k2vdhogmi96kq0ulek6iocvkr04ywwowrnmudqx6uzb3g1j9b6dtip19ulyhihgibm24et459r9g67w2eqmd9f52bsjtqq6ysf0yo5oalzrps6',
                user: 'bg8urq8lgfofs2o6h09hmiyvx4wk5wi1jd1girb6j9zchwatvln8gz8lrxinlfmqq4heu1xjz0w1n05z51c3yb3338busgzeo2p1x27ubkomtl2y8geebz9l9oywxnd1thy4kov5p90cyl3d25xb1ys7u80b9i21z7tzqfdpw1r2nugtuj52l6qjyklk7urq9x0zxqgmgn7c7h3lfmjtv6m3mhqyh8jb5bj5wdtgswdlx5wpwqfosbwmkqcxg35',
                startAt: '2020-07-23 19:31:45',
                endAt: '2020-07-23 21:53:02',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 's48unpxl8602fnt1u1hum7qw6boo3sbd33jlfo6buj8w33qci2',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: '471jyddvvsqok9rp0y9k',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 15:24:03',
                
                executionMonitoringEndAt: '2020-07-24 14:10:57',
                status: 'CANCELLED',
                name: 'e454lk11h8lvw7b2f0gegplcb27t4e65z9nn3vhfy5dmphnazw14zvxezfmrnpflyu2ie6vps6hwdxggpqjvawuha8rgkq1y5e5oosd973uvly5j7hdkc4ccrta71rzewtjxbx8h1sekbt8937ssd8z4voy2p7wsd8peyd1yxenairmfjuu8615lbhm72jz3isicz3ppbe9e16vj637ktat8ohrciy18ieq432bhqgtxwphhyh19ikntku53yxg',
                returnCode: 5350176530,
                node: '5syun2v5uj2vualdzr10lfw0jqf4oytq8drdljmhtyqnntqzf7teoitcenxtocpxpdghfnlwirmj41k3a1iehwjld66mdmz36u77e3kieeobll0o8pxadcd3w5jaex362pt5iy70pz0w3wyp908sjhchtgxb34pn',
                user: '9l1yl5byz61t9lf8jg8v11z4ts68ws1uf1jlxbai2reuz1yfir2hxd36v00k42b8e0ma0bnxn6e2e0iw297rp4t1o41kzvmwpfgrkv4732i37qvj0pt5k9juvcz1tml141cf4knudpqwipkl9c6gt9goazfg8w1pf7wyaopyiz73rygtjshxsqqn9rc32doeslcm14loyf2pgwvixm0jjh31311p1lg8ev891bfarwspwmiuz5e4geheqoj0nef',
                startAt: '2020-07-24 07:38:07',
                endAt: '2020-07-24 13:21:07',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'amz6z5lkol5uspfpjg7b888sskjwwaoitbrjrkfmuvqhgttqvi',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'abjtvca2b6v98xuhakc6',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 23:07:30',
                executionMonitoringStartAt: '2020-07-24 07:26:07',
                executionMonitoringEndAt: null,
                status: 'ERROR',
                name: 'qeq8ke9r5ytqeigamp1amtzj95h38wwuuet5j5pk78esyc3y3vwa5o0nzpzgt9hcw79p2fcvjc9hc3mmrqhlps84zi49ft0e2olianq1zw9x5gtbhxwmr5qut7nw3c7np6iwknp7ict7mz0waabmx89kgeqoyi1i13bktyam5iokr2ytg8nae2uvy7m5s3dduc36a59u1bp3xd20bhomsoy69xll93c8ja5x66rme4d2gysb8z0czxdgre5peni',
                returnCode: 9566082200,
                node: '3crw9ct7y08zr8ptyilmmaq6u3bn5slp4lhhhmgjlscm2ksifezis16okhwitt0xvmci3xad77qwg7clkdc4ksgr7vqfx3xbpu4xyh0exyi94awinf4lm3xyn4xp0jukz5g35k460vviqhuzl9yvb9rkrxrxsosi',
                user: 'vuhwtyrtzmlwb4ycd6epudqp18g1f6vvio0bhrpozchsazanqcj2z12lbryw2v19qgy43yqlyzhxowot0d58791zp5dmyba3b9x6mhtpmpfn60fmswtdgihh99ngquoqbs0gbupylfuz3skc2zm9zsnz6a1325xz7kxb0sa400tgerzj9josvh2aamxn1nh7bichsoc4uuupwe1m1ypkjm39mg6nv9ssfepn3jvz2qe5xembozqmv4vn660iag8',
                startAt: '2020-07-23 23:55:12',
                endAt: '2020-07-24 12:34:09',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'zrn052hjrri4stp249ngmj4d1czgz6fzobvquo3sp0zec0f2mj',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'e028mv5alay6ftnyubn0',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 23:40:06',
                executionMonitoringStartAt: '2020-07-24 15:04:40',
                
                status: 'CANCELLED',
                name: 'halxusde25at1c0nzyredkpjzjh8vt0bikn9h5g3rq2t2xlukplchjzzd3h2al4am1nf2gi5e3xqugdanipxvkabjmzqqbu9h2o5wopod3xl09p78xy9xwz84sosn7c5590y88f578nlnjt7vq924jv4dqql6l55ml0ujefotql0v3s7g13e1bzy66hix9d5ry6u63vrs5elj787rox1mlcrls188pq7o23k381i749cg9x23g674ox6jy0ciec',
                returnCode: 5151849257,
                node: '0mmhuc9n8d9tkxdxct4f5r9njfgr1v62lz8mxl62f1p1drniabncz2v71aknqzv1mn4csmf63acmfdy0x40c0x1q44t1ysxpcmnf9gfbt2csr11k4lzvnqabgn3isufvujfu4wxcghcm3ikje9hgngru13kcowry',
                user: 'cmnmxki1zq39h6gnpg25e8lgfa5rlzpbimr3o73aru8rqlxi0ahfibutjh2xtgihpu7co616rhst60fqiix7ngxkw5xodlan4qhb35s3ogsbnexjpt03egkcfhr8z40g4xz664f6jcq6km2csefwymyycn8x3fmi8ugp3o81rw6z0phwsn7pk9o1dmfhhzt3wb2gyl09o0qs4kmfmfuwqo7w2786jnkozrkdxhx2caid6ew0hs41duyqqofqth9',
                startAt: '2020-07-24 01:40:51',
                endAt: '2020-07-24 01:51:17',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'ywnm7ziiduekkom2zteootgo16v1ppfekoxdfoj3tk0qfohnq4',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'j7vpfulf8n0ek0bievpw',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 01:38:26',
                executionMonitoringStartAt: '2020-07-24 06:37:28',
                executionMonitoringEndAt: '2020-07-24 02:51:38',
                status: null,
                name: 'gvcvumvtad4kvqxsbe9s88dkuxoqgeixc73c6elpemg6p1in97s4jubs9s152eiqefwow1hlg61cjbmjhjwptnef3hdms9ycaeczorqef81qi3arngoipxxepb8c3x9juu0e1wxj2ii0jexbq6z570kr47s3b9teppfzeq0kqt0medoy4b8a6a00k6vu7suvtudqqgjiuvlef9tq248mw1abr3qb46i30s98t3wcgvmd1ev463ay5brukzodss9',
                returnCode: 3054412907,
                node: 'uznejz7wa35q66z1hqg9d2lisr3d49z8vv7mum1qndxfg3g64bwvrrm3a2u3cvslkipmcl1yjl999i1c5peybeawtc08awx9uyrp8pgjrw5ir65k7ngt6uxkthh84x5tdj8spxhxx50u7qczxfhm13nezwamm50l',
                user: 'efx5p6gotxwtlb8pjrx2888k1pn4lm5u9pd66433oiwhedh09tu180ctfmlu2kpay8vwgzmnw53mvq134w162g8g9penu2y8kiootv4m3z6eh7lk1iqdbh9aso61zxz56kogtuuprhbw77yvb8xrief8yk3tz2gyp6tapy7tpmim1o45jzv79gphb90ju1ntds2mr7jojzurxmv5xnvzcvxnl6u0fgrbb5mvqzqsaokiy7xruhc83jys8ymoasn',
                startAt: '2020-07-24 17:47:56',
                endAt: '2020-07-24 17:51:58',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: '5jc9l9a51ccmp31ez0n9250km6e0xbltr2np53qwl3u54qlyx1',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: '5ldix8pel2ohjt73au4y',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 12:08:43',
                executionMonitoringStartAt: '2020-07-24 08:27:58',
                executionMonitoringEndAt: '2020-07-23 20:21:08',
                
                name: 'z6cz0pnkad176kg86katvwpbbxfrz140rc5qddef63g6i2g3zyba9m3nrim2rhxumftezqwjkbuujmyq1jhzx2yo4i2toktbp7bsmgq51czg64b9z8diatph05sj9lrfopcm3m3iiz1b8hffvb6i4mldelmzwhnknb75l8svipk8vfbnxlgmvzzqqwey8m4q0vwca60unlmz98m43t283q08ff4az1txliyun64gxfa058eugnmfprzb63svkv0',
                returnCode: 4969184457,
                node: 'vc28qc3k7ub5k8a80igzpan113inxfpmmknhsdqb76uu502yikii6m6w5lecgzuo7jxft4ixf8q8gwwb34tpv34h3w3n9gwzjfv1h0uwj2xatrg326ba13hf9nzfrj166r2kaxgybdygyi1ol3azh2yxobqsbbv6',
                user: '3cufdh4tky4odmym6h14oe9klj9uw65wzfudbyry9liwkwhw8oquw9f124qk8zzhceh10rblvgfkgbi00lfyif2spjyem8b1b4a1bp3cy1q2qp2crh22n4u0gb38w95x1s9midm7z8qreh1t16axm1lds4hwi4q3fua9tpd0f5r1oasmyvar5ce16l3qqe72l3xnw4usmeexr69j4u3bwkor5gcpr38t42ufsfstofssmn4ztbrz6rntk6gbhtd',
                startAt: '2020-07-24 04:02:06',
                endAt: '2020-07-24 08:09:53',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'c6klzqwxp4xfvx2bwmnbi2v2nfncwmpu91gfal8rv2bfb6hc8i',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'wdrqmvawbbqh0iljahse',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 01:24:37',
                executionMonitoringStartAt: '2020-07-24 09:49:51',
                executionMonitoringEndAt: '2020-07-23 20:39:53',
                status: 'COMPLETED',
                name: 'hy0syincgnzm2zkzvu2dmmb6jp46qlwhxqh474kng80nw8s19g2305m90nd9pdmx9qx7296r8g0mcz5qm399e6he3l6b1bui5e0krdjqygodyjqz79ebba2pclpb9who1rtrs13o06w08977s8lhr4b4a33s0jhkkekbxmmdz9h4uk35jk6nv3q2by63nshc3nawwd1g9qc9fyjdlbpjkwzpec8bfuqggky963ri7klmq9a4r9isb2be8xbo4rp',
                returnCode: 9093810992,
                node: 'n6j8rf8hnw0mi5zru9lkwxiem6jhz3jnin5dgtp1k8ni0a2fjske5iy4n04q7e2ngmtgmsxvvrecgz4ql3656f5j2w4q2zcmdc1kje09hpqibtodytc3ckdrbe79sq512te67scfievbv9memjd183uz91oks7ha',
                user: 'y4282s5fh1kx2swfuts7ue2joy7pnhxr9hwfdowjf5ygit5b9kppsbs0ej88rki9dqn72m8jm59ipl89dovdywwbaoufzhyk4tsqvgpmh931fwi6ggor9ro4kw3mo6fccuvb7opr8nqilnmmzjiliumjmre683d7t2g7difxj93s5c5nfxkyuvvh0x8ua8smqhf5pzcpg0arfhxo6k34xsk5ztqbcyrtkgby4awt7b4r13tizjkpxkwho5hjf7l',
                startAt: null,
                endAt: '2020-07-23 20:43:37',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'sps7gkuvbi1ipt588f8dj9ekbc4drozqy751bal59rescp8q2d',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'd7r5ogi3olt89qby4x27',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 18:55:54',
                executionMonitoringStartAt: '2020-07-24 08:59:04',
                executionMonitoringEndAt: '2020-07-24 10:41:53',
                status: 'ERROR',
                name: '65anzj0069os8fsrilah6tp7wx7mfdr0vlh2lqq7b9px2f412wx4lpjamh2jhl6y2pockkrt81kpgyu9v5vpvbet9rvapaouyqzjpf7uq2iygyqu5mfogzm4eoh8ip4jbp3tetypxdeah00x63tfng3l48k4lb24pbwmd067gsi145brbb7eiw41633wodnc64xgd8ehy2ftg0b6eqfmrabznun4t9ioyyy2rl7zn9ljyilpr21mlfea3re9nr4',
                returnCode: 7511126371,
                node: 'x9hzqqtqqonhowseekm00k23i48y8jk5aipigeraevo5bcgoikpkev8eepwu0kkbtnejhnkwjd9j3l29cvbqlgqeupmmmvd8f261s5ozk49bgd7929cjp6sfh9faqrflece9dkcb8j1uh9o28padk3kyjf35hzgs',
                user: '8mm46x206ku18sjttnvg1louwqbk98fx51srjjfxa5ynenwzzdd1i7y3fd9fz307eraymlagd0v9s0af50xh7fd441bca7zujk1pg5le060j9n9yzh6wohlfxuwgqmy67xdyrp4wimw9wotal3xcwqikh65bwhfr82f7ywnwa0ej7qca32kkk3456h279eq60b92zwr3jjfbzk6xw1q2tz1u280dkzmdu8i5h5dzwsweg6njvxle6h3sl6o1l0l',
                
                endAt: '2020-07-24 10:21:31',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'aqd7y92hbhmz7migu3jrvoish1fhyo1i0qauugl609e1oa6bwq',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'o7xnr0apr9pof7wxa5tf',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 14:36:13',
                executionMonitoringStartAt: '2020-07-24 13:22:37',
                executionMonitoringEndAt: '2020-07-23 18:23:53',
                status: 'COMPLETED',
                name: 'n7h219ko4set5427b88n5br99hqynz96p24fpqqu5wsbbdyzxnde1mlpie4bnzwxm4tmnxu8cc9tn0kgq60n9njspm5hlk7gp5kxmkdymin67nvch8o4dtex98j9rova8m5jz0scqile6999vjzo7dehaxkl7di34bb069zogz0fvtotq1duf8icf2gsmv6j1d4wwgbd6yo6mag366a7ehaaf3cp83w21pjt7g8xp1k4y2ed9qgwv4vql6hj7u6',
                returnCode: 3686102035,
                node: '42p6lbqa99lzay6id2hgijj2oecvhn7ofiyns81w4rkkismad07phclo006zcspyzvdpocu6u9schh0s0gaksmm4lxjja96xm5hkvv131edm17946rfcdcfz4knkaqjqbqj1ghe8eq8bukbq1c6j6pfo5cuc1tyz',
                user: '6yrmwwxug0ajo21p4a39sbeym6qgjiz7b60q2z0j056q7onlmccfbsf35pv8f0urjsfvd39fnobaxkukekt9mnz7llfu8kf8agtlc4pjrkdk9umnogo0jaz8h8l1e15fnj1ewgznhpdy19ibvpucuhndo4eejtbcdw5ndsha5pblhbpmsip9dq5n8ceupa7wp3n5bz9c6qh8d0en9wliy0lv54llrtx1k993hqd71b18kmh0bfnywjlzvcdoig5',
                startAt: '2020-07-24 13:08:01',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'd1zedp4le9fwqowuzhnrwreasyvh9ycn39lemui1b7ommryfwa',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'y49pizxlfo6jygtj3md0',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 17:47:00',
                executionMonitoringStartAt: '2020-07-24 04:05:47',
                executionMonitoringEndAt: '2020-07-23 18:55:52',
                status: 'COMPLETED',
                name: 'cehelgq8zgdmq44h8xo72lta9wv633kv55rxkdr0k33pmd1e59botewri2migylov6wv7tvj9muujfdm3xph4cvdch5bvzr0lk19v60901qjy1zc6qo02hbu8l9b92bwjm01h2hmbrm4fjqfly2qyb51pxj7x5myxb8djoylpp3etrds06digmk1ttes5hhtfjyj5tfkdg0zfu8drbktq0clmr7ogcq182h38b5svdorqq14u21kj0hkgv64j8b',
                returnCode: 9945591636,
                node: 'gahyifaicur61arhu8mhfahdmhddiwp16iikgq1b6xc29xkfcc02ou93f4h0ldwqrjmtfjbjum7p5mtlkswzqqg9jq8cz2a00vtnyhigbvi3dy512t8u4w1c4mwl9es2i8lanrh458vysmgvzbctzb5fj130z91x',
                user: 'g71en8eaod4eyhulujhkimva0w3nof3ub6wpnxyzel2ivwlp7e8dxftbascgjanotpjzmcji29svwth1ynmid1gmx0oitkagtrgr5gk0vl1296uyk989d5icnq1syv3ckgv7c4uljohyhijngijj971isu958hq55akno7s2pk9l5dykfgq5wobala46n5ni5op1iwirzwpdf82jjz6ixxxi8pllcoh4er14lsn5tgjgeey79grtb6h6qy7qm5g',
                startAt: '2020-07-24 01:49:00',
                
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
                id: 'fs4v5zdpguajq9frq72bs8i94seltq31itz49',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'vz2f7lyyqwpzvi9abyt4hkian36aetk3u365c57sqg9bs022j9',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'migokfz04j0dmuyxxeri',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 03:00:13',
                executionMonitoringStartAt: '2020-07-23 17:59:34',
                executionMonitoringEndAt: '2020-07-24 05:37:39',
                status: 'COMPLETED',
                name: 'w7tmu8qccz09lfpgfgrzw4inm9f50raa3pgbhfup55cwopkdivkro92d1yan69gy7t22ctdiq0n9wvoi157ec8oupoags7ddkza857u3ytyz4692bjjx8cww649slbgo1nwqt14yeu36zvvrlqw4pm00stloig5gelfrq7yaofx5wfdn02jp3wgetx3s4jmyg0w47nhy39krs6cnrof10ruk3wa6m3di3r706xvmc40uldf99sxghj6lkh7te63',
                returnCode: 8185506982,
                node: 'kn0ef8ic9dreaqhyd13v7yr5mec1z5nlsxndm29hqem63l611tnrpiiky3rz6uaq86y3w9uj64877venykbf5hw5uwiczvh2tskc6uyxm9denpzd1zhvbmmwevtv0hkgfqt3dxgxs4yrjafbh7x3nomymmuvbj5k',
                user: 'y1tnll92r9of3rfs96c54r1r7mr6rv6msp8uhi3fwtzxevy0f63kjmz123x0d2h0qpvslytxm5ngzb5csj79qkp1iuh1tv8fgivmazn6iknsvhrhf4r3fa697n99fs6tpvxkqx35sgozd6ru3ymge1nb5zgada2tvyvlozhedseups94yi8x6s8y6jp5y4ck2hl9a2qjrz3caatc3lczu4n2n5pi9oy9xosvu1xtn3jdxnt540t8zi2x69rr5o2',
                startAt: '2020-07-24 14:26:33',
                endAt: '2020-07-24 12:30:12',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: 'ovnxhaddsv864nitpbmqnc92rk2zvjksgipqi',
                tenantCode: 'ueyedyp56adw62qpdp5bhz8qe2v2ptubkbtf317s80umk50y48',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'ui3sw3dam54op0ll1cht',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 14:15:46',
                executionMonitoringStartAt: '2020-07-24 00:29:52',
                executionMonitoringEndAt: '2020-07-24 01:05:02',
                status: 'COMPLETED',
                name: 'mvxsrop8adcj38azroy62wwvs6nutwsr7ytgsxm8sgro51sq6tp5zfn3zxr3vvsmoxl8oamc4iwv2ryz30qms5h5dkzcukjqay3thde1cdh7iwws2ov20pv43q06ylrj42qje8s0ewmlgkzi89yr6vv40p0tfhhv9c09bqarle5wtcl2jb79vjoca0k8azr9zphit9jmsv1ica97wrx8gzit5flzyaz83g29z3jgp16ifcjmth1ud79lszmv0w2',
                returnCode: 6741432651,
                node: 'rjhfddcjjuoeyde0tuktr3mcxoprrpbsg1m75u8dp2rykhy98il8hkk7ky2ljrnd205n7i0xsd3v66oso0wic1xnpa23d358ixw9vn4nr5x2zab3k9vro7gz38ftqs0lr36vi081x95dlhw5rwqm7dmtu68f7ijg',
                user: '9rh7n5w2wet5s6ig4qdy1zursqwmb2b2dfdsq26o5gp7dly3jcnncun5mig1c8ij3es4t7zk6oldj7ed17awiv6mcjqioyq6yg43w6m92inexdfdrbhuma200byuprnktex4gh2xk44hlxxo0d8gh2qzz0oc9bh65em3cxt36q3z86sv3ym8settghu10iqos4imrgjt8o5pr0r3jbda6mhp6qj8m7f2nohtxje2rhdtinmcyelk0xg95w4m3pd',
                startAt: '2020-07-24 13:09:16',
                endAt: '2020-07-24 05:03:59',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'ddi8i5lvd7ucq7ctk8cgljok1ji6xp19kqwhmowfx7r64j9ikc',
                systemId: '4mx6jyxx921xl4zpokc5oe2m7dxiiil6hjy7s',
                systemName: '2ztloyagv1o54htpwoa7',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 12:03:20',
                executionMonitoringStartAt: '2020-07-24 15:41:27',
                executionMonitoringEndAt: '2020-07-24 16:12:54',
                status: 'COMPLETED',
                name: 'kdvyhetfu0pqw5oze0xb7os5uuw4yxzzku33nbfzqwaamm5a8mg9qdctkjdb82u89q80w1shodifoeaqk4s4l6wky3hanvftu26w7dsg1rkiepi1mqyl2rxguqofnqkfueetukzq4mp4riin60uiefnox6ui4l38im34c8lteh49qwous2yux1zvaag9rb1ypw23rzfnsdc3yud01rqqv8vyne9r72yj1ce22c7zrk5hapl8qfo6htsiwa4uz94',
                returnCode: 7584277054,
                node: 'p7ls35vxyjxieh78gdx6mos7gwygg7ocqn0a2jg6csnc0rj2pi9owupjo3htygpkfdtlhzpdnm491lc8zsb4p3pbpwxz7j0fxi9w2xzcpuj4at3cbnj3250w1artpnmls8ycivo0ju3vj4qr9pkb9odtcp7k9lxt',
                user: 'kg7j4h6qftqlyojdc6vov11znmg72c201cgvrjqfg1bff8bl5dgnhtuupvwjc2zcgddqjugkhfibwo8tn0pkn1xkvjvg6etlhjuxcinx2q06aoukdsizr4tr2717mq59uje1435x42bgf1w831n38w28g8q1t3n6y6rur0z3nm3hf2ptf4o229mnu5rgfv2n345vahmirempi4ktij4i5ni89kdchbwj6uin3yl4wa3fgp369cm3innan3xyk1b',
                startAt: '2020-07-24 07:43:38',
                endAt: '2020-07-24 17:33:53',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'xmq5ycw7y6dwauey2n7rijpn8loneo5jzlieryk3wgqdsyx50i',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: '8509o20s3v9kg1fwcdey',
                executionId: 't0zh9x09b812bjz4786n3a2kasjmy19o400uz',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 02:53:36',
                executionMonitoringStartAt: '2020-07-23 20:00:36',
                executionMonitoringEndAt: '2020-07-23 23:22:07',
                status: 'COMPLETED',
                name: 'r7qf3f8zmyl5kte773sghh0vwor07vluu02yz4oqr7edivssu9d2rmas96x178cwb95jcdd28zzq5zv4f11a5hs2gw8njhhyop2z390olpr0xog11pccu8329mwthpg8edoswzogcdh872ljji1a1lbf6jca7lv8fw0f9mxcbpvg6pvzwg81r2gzok5s3d8n6cdzg1b1acvtbmdz71rkbxdpgerhplwhuoyet1df5mr5fyjs36kum21xq6oxf6i',
                returnCode: 9177179985,
                node: 'pythby0pnnaw19ejv7k1c21y89l94v52w9j5ah2jwdb6wyzoizl738l9g11u49sh86lr751mvw6x8yzqzyzrap9w662i4zge0jvimojim9fzhjti4larz05cl4pdakvifwzenx2km6l2qi23d8a1luh8yxg9a8w1',
                user: 'sudj04gvxs7vbtlv7kfwbh8nfs7rllzogia10gggzcv5edxzbm4c0yh193l285pn5t6za7xs0mclspt3x0muupchnqlx3ldjzfwpqinwz6zs17lumq541c35ftoufgyn7uy7k19jalbujz5b54wqx9nu6vu670oea4il5rz226qu5l40gt8v7byc7dqetelf72lay13y4op5ulsn6roz3uwiv908tbria8z1swdm4ujj5gxffrujbguncamue0e',
                startAt: '2020-07-24 11:45:36',
                endAt: '2020-07-24 03:48:46',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'vghbe46pa9029vzpjk8lab0v92ceusefmevvo8pqghk1jqxo36f',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'xj22mw32dym1g8a6m1ht',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 06:07:14',
                executionMonitoringStartAt: '2020-07-24 02:33:47',
                executionMonitoringEndAt: '2020-07-24 04:31:10',
                status: 'COMPLETED',
                name: 'kupaqsckk642tmqnrolt3e7j0viw5qlphj6auaim1kizdwut4bcogsf60mavderytt7nuh93l4d668lurk01esw30dngrgazcuukr2z007f5zf52o9acq1t9estx2s1a6h2f6v5t3mtqf7cjwjjnexcn5fas1aqdcarmg0d2bhbkw6unpityozj6par5gykkww5cpwycwlyohmyqpmeoo5o7jmowmqjah96oxwpopcadd01tbforsx3lcgqo4jf',
                returnCode: 9952543440,
                node: 'qznkrun10va68eknfqvunl6hd9ljgzv4fvpw0f7sru7dduming7lkanuvx7xoybr6qsut8fhq2wi6jlwcps55g49grojdet6w98udl21q71m2xh18pibk0ajacdzyfibrsasdl9degbtpc1a5jsterqp1g3cmbtf',
                user: '5sbjeub8xar65as5zgybuncuzgij1aawwzxnu5y8glptnw8s203tjzd39ljvvfqxuu22gzsrwn4yx9o03pm76kwl1ih29zggxxaq9rb5mis5wvmom4pv15kbgeoozaa3d1rmrzi6mvotgve6h2qk5nsih1xy4h0wq55g3e0bho0zcy86ezuahsd7uv6os3uli0fnsc9mdiwuqm7ltbgll5jk4jtw1hwsfotadpsjiyhe55dj03s4pez9qk0i8jm',
                startAt: '2020-07-24 03:34:54',
                endAt: '2020-07-24 08:42:22',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'gpqc24r2wep9jyj5szg5k6zriexlpyib52uyrscumma1ngp5vm',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: '2y1yphiukdm3f794kb2r6',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 18:59:02',
                executionMonitoringStartAt: '2020-07-23 18:19:07',
                executionMonitoringEndAt: '2020-07-24 05:47:34',
                status: 'ERROR',
                name: 'tw2wamihn2cd4hf8r5y85gewne345g582o9qn9cw0xjpi6kjym20p3g38y7v2up5a2i44qr58nf6qnhpyu02qxtpzcbu7hgwvxpova75tedveilz02hbsgj6h9aa788j0la9mymx3a780wz3brx9j4puu47qi3myijqpag5czdaadar9jicp016ntt8q2x7znw0l55w1v1vk9ny8z6ks8my3cj21wvcynp903m5kyiq297uzhvw651tkufjinyw',
                returnCode: 4379456535,
                node: 'dc8pno3bzpr8tny6jx6ujywjbmcilc3jvlcy9mt5nij2gceeuxrlf41eyy2xr9248tiphounq6xbj1uerjaa2oqelcby16dqujgucutxe7hafar4y4bg19liflkcxx3hnoht95dnl0lr443h6gueuizlzdzn79r7',
                user: 'pb8mx5yoa1zpyj6ewkzq69umk06cjeyw1itozibx9x9ahhk05s6upvglyihxj2mnjad5f021rla73qytf1ke3orrd6l123o8css05sllgojdf4jj4bdy8lfq948iklfphroxoiel4286pafez14yf6hxpf6qobn4z9dxv2ht47gvsehb1o7ez3ay68sytflrkdn21h2khwpzmhynghuxgp7i29yv70fd5m6t25qu93ndisogvta8f7ujtf0e5sr',
                startAt: '2020-07-23 22:24:14',
                endAt: '2020-07-24 04:27:41',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'y87l5kwwfmk4jrfpnct09u1eftiop1ee3458flq5xn6n8wocvy',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'ycqbf68kq4qheywvco8r',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 22:55:31',
                executionMonitoringStartAt: '2020-07-24 05:23:05',
                executionMonitoringEndAt: '2020-07-24 06:18:00',
                status: 'ERROR',
                name: 'mqyo4r4ruwa32gf4hhpt9cjezktavr260c4d63k33lxpx9bogsvyrodanf3ozb1bf5cybb8n70fjnsodcr36wkl37jwcuoq5qybqknxcifdimjqmp4n26dnhc1lfwdwe27lkzoj3ssa1p2uvdz9wvyomsy4pwzkbmw78y2gn4i5jc3r8xdlalq0hek0z88ywpeom588e3pah7bhg3l72ney4hvmza8x5kfumep6bd1hj30i4bqdjeizzo8rz1kgm',
                returnCode: 6956782381,
                node: 'zaker8fukd2z23beimsdk1pjefnbk30dtq44q2gbdf7wqsdsp1re8ubtup606ivemgqq3yurqaz981k237p08wxvppg926c8kbunyjblxbpmoy6lhz1db2fphlgiro902w6zi8rick3g2qmbhgc1yfs5weozvfys',
                user: 'et06mp6uwdpao1trdk05pfaizhz0hven7lkpn8rax7z4dq8ruocozdg6oeqbetrixxfz9ce0pbyrb911y4995fxeqksrlzawqtz5ooy3wiegha09zp4hglxjskl8rcd8yg1drfd8p0lwiyydpowr7zjthaijishu5ntrvlsyg2auf9dr9l0hsdffk9340b15jg172896hy2sbmhr0qihqdzgcoex7uhginovc7g03s7k0mk3h1cfh4bmr9zfa7h',
                startAt: '2020-07-24 17:10:36',
                endAt: '2020-07-24 10:23:04',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: '97siib1beuiro220v6gl23weirnd6w2jmjs6yq2hzfkk30jkqt',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'o59e7aca3l3fyvxwr8m3',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 11:46:00',
                executionMonitoringStartAt: '2020-07-23 21:29:01',
                executionMonitoringEndAt: '2020-07-24 11:05:52',
                status: 'ERROR',
                name: 'oo7n796q1dlyl728vlwa0owqrss34fmmg1hbe95a4mke37bijzpltiqwf6fcgobu208xv4p2srr7hak4vgny2fb0ujwrlode58uaey2e7loadamckg0nq17sevsk672b0f1nutrkai4n8tbko3dmz76myoqya02trovfklq8iibdbvg1gs84ra3k85hpy8vmn6um5hxaw1zrtiupcriczr36gysfnd89kabe5t2hidv9cxzo9olr7pc7bc19kms',
                returnCode: 38130133325,
                node: '107kyl3r47y98ld4cj3cc9jlf33iao53oatfn15je1ltyiggqtvtzdhglwfzo5vc6h7mxmqvvzfv7dt7niquo9x2mmy46l1nv28oxj4a53rnkx3l9719ry01sxqn1ryec0na3pnrhkdv3tg7sqhftn1lt53kf9kw',
                user: 'pdhyi04heq4n0impteii26g00d61jd70p5st00x0pajupq7rtzvzj00c68g1ib2i01ftr2vh8upvz7ruvrdvcx9ihrcne55gk5uvgsfj3b25popsltjaww2n7l6bjgwxudhq6skplu257r5wkrgmnv88w4o7r63dcfw4indghhxkqsph1b3ptfr4uax5oj5i9u7mfp7ee988kzatvs4ahxrqss4ouz085fqwf5ydtd28beyd2pej021464pm11j',
                startAt: '2020-07-23 22:25:07',
                endAt: '2020-07-23 20:59:03',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'qutss25somwbjaazioy45oglh90t7wu9y289obd7l6g0tg2qf2',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: '5agyy64bifxmp8gkav7s',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 16:47:59',
                executionMonitoringStartAt: '2020-07-23 20:33:22',
                executionMonitoringEndAt: '2020-07-23 21:54:52',
                status: 'CANCELLED',
                name: 't1mekf0myo1dpd59moqs35xhdjmli97r1l84v8eq1i9rh6lthcibaqq7bpuhl804kktedhvcrmcetcb0eyc95f7ksn2bhsejr1bcbpl4o6xfii8318380t05swazmgle2nscmlx1dv2cl9ynkezw82li155lvh2m7cyw8wcvs2zj2xl1aoy0gezvds1zkwe7xx6nzydp7nza1iymnwlzivpn3lnq6tpreljccvwdgnq7tzry9zjbyndwvect7w2',
                returnCode: 3999327393,
                node: 'fwldsccujmnzbr5hn6pw572mhs50lcbp7c4bsq87ci53pdy82xo3i2jiplw7rhxpnwlcm037gyjwc2a3w1b9bn7fmo2v1bdrglb02dub2hekx26z0472wsy6vtq9r86amnhp1gjds12gy2zig3xwvzy7iogqdlw40',
                user: 't8qvumq3yjc6ksrfb6r69ckwikdc1bw0i92wxj6meyl8f8gibmvhavq7xsgq2kcoyx6if76rjloy54jm3jvguz3os4dpfoqvsfpwt0ipp2r2xgvg5xm3xorfamyeaywouijvf3uvz7covlxqnh7v59iluyrpph0uommtzpviuxfx5q4i6xwhfnlspd1anxqd8sjv02gbsyweejuhgiq8075pu4nhgcriz3ik5szjvv4td88xmx0nze0uzvlgstm',
                startAt: '2020-07-24 12:55:54',
                endAt: '2020-07-24 13:08:14',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'q93t2szae0m7rtupp50ql6j3jbt2cjobbqg9eenq86trfli9s7',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: '3c4q7lcth54m4jga24os',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 03:50:36',
                executionMonitoringStartAt: '2020-07-24 02:54:45',
                executionMonitoringEndAt: '2020-07-24 00:45:42',
                status: 'COMPLETED',
                name: 'isy3xwj19l1tsnp85k42djpw1lteow6pbr2eqg63pk9p2ub0wexn0j9xthhdswljrkuqlpano1g4eorh9brg85ewk1t64xq1xn89tc70giwbj7kcfyetxbhj8t9mzo2szexu9odtx0nysrdfhorpnsig79tw7t8cktlfxkid0wuj4ypays2jly85psua929alxproo4qf3vxlshftpynocs00w43m43hm15us0wqxt98ahqjz3kque351emp6zv',
                returnCode: 6894602501,
                node: '142cn99qhcv2z5vugsfzu0ceugyvj1oi1fxgshkkvp3nmtdhrrsajxs8wjm1v1uerhvqol21vghv5cnq2ne71775t53rigrio1d3okvlorqw49bamzdodfhskq9z7yf6vy5ixi7lmylcdpnkcg8xb8wx2p9pt2nj',
                user: '9h788iz80aetc83i6na72ggmepamatzzpozb0v47q1s17il4cjnva7zbi7artm0hd7yvrydox8j8rij4urdol3ytmjyq590pri1szyma95cqfef1h3xovedu0biddnipmguo8d6amdxe3qcknstjn2fdsw1vf7w65xlkb5psou84m5i2cb75h10xg7hfpp2jafyqrysa3z6tt4444jkxuybl2shi4cohvfs0lhy7i4m9ikhs4g899k1w8b5wdipm',
                startAt: '2020-07-24 07:07:27',
                endAt: '2020-07-24 04:58:41',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'mogwbyg9x93tfmno735k9ca1cgbnwksmbejapqkib4x1u7z7uo',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'm37ryacbagb0avff2fis',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 20:19:00',
                executionMonitoringStartAt: '2020-07-24 01:45:48',
                executionMonitoringEndAt: '2020-07-23 23:15:57',
                status: 'COMPLETED',
                name: 'fwaka67qmj53a8a6z5xa87zkynj2bj3z4ybq1xx08colh0gsd11h5ssc9oa2mqebx93enutodohc853f1rsx4et6etrtcjgyrfeoxktsknfg5m05dlay82cq9dl6zurcnmfjkzvkhnxznerfsj12o1yntq731mcr9fp3x9bc28ufrmjmmrnwheh6dfhfia2biinukzxpjmoz9fkj0cvnwbojwmefzcaiyctu2c3ashykgr6q7424o2e3jdj2ina',
                returnCode: 100.10,
                node: '8qy8n0lxh868utb6ov9e2pwraelq702e6936qv200nhch0v40vpxcshkeft5ud03tkbj41posa0kasmh0ryh4qx1l2ae6356r58whzk80ru3diqej1fmg4h60hjrgg1bc25h7vp106x2kun7wtiwph8it8m77ug5',
                user: '81voesr7dcq8fr7hzlkrtrfbj6ahod22zo4h0bhmsf2udiwwkxfu4e53qsg9ks21bi0conoi2wv729rxds6q5eam3geere6mjl0s5ehepvnfzrn8tys2iit6ls33bgi29nc7whasza7ocxpqmbrwp4covm3lqe2hseb7pin3roj2lj9pyovb1oprqtfbb91wn60xcw96e7qsz2w8zs9goai4z84oyldayfzskhvp3384r9pm149iq2ylybxbyws',
                startAt: '2020-07-24 03:28:47',
                endAt: '2020-07-23 19:54:19',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'enwu0z0pvnqt4bexp9vz062o8jyjsyzqbe8tp4o2lfh0gx8one',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'z8uztb9whr2o4t2ptztl',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-23 23:55:47',
                executionMonitoringStartAt: '2020-07-24 17:47:36',
                executionMonitoringEndAt: '2020-07-24 15:59:01',
                status: 'ERROR',
                name: 'wgluqs4b6a5lrh1ek7mdq35rn0xgs19l4cpumgmfpm3gdkx7wrpunxuhqz0ixy4kkwt947s1xrcedlaznve5d7531hnjev4eamk0mtbw5w7ho9yijfdqmjn4sjdj3atvjjy9r8zidw06dh5lm3qunkroezuuvmua0oo3lzfjtsz7l9tq7opjtz55one5lj1cn7w8z506wxa95f3kqwhhvrcamw2ewwuvmregilnen69kyb9honn3zsywez774i1',
                returnCode: 6627262481,
                node: '6hiqqspd1pglwkkrpclo6obw9o2sza4ewkw2rilg4tt2jwo847taqc4f93slwik7gfkb6lmiz8ci8ykblr1dynwqfd9h32yww9gl6yyjkkfode7wetbddgygcst7ouocwnj8j9vfnb6qzxqrft9wcsxv1iofuhs2',
                user: 'pjkr4n4jtkrz5m6y104k03m7lrb19zhmkefc1j1jykn3ee831ojvcpwndp4uwmvu0y2dzp09wxgcg82zbaa8h66o584q9qooiziln17g2o8649hpmynd5nvsclx299fswndi5gkalig2un3sfz86etof0njoja10rigahjknp71ofrls7bw4y8ccnfdsvt036y8wpch2bnima6om827uaa64pbm6bwc4tdtwub67kakwj04hwed8v97gcyp8ruh',
                startAt: '2020-07-23 21:08:06',
                endAt: '2020-07-24 12:48:07',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'veiemw2akpj4t7pmph86yvmy0g4v5bs4iafn2kembxp2kyayi9',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'b1c2s0on2oere8ox9v92',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 22:49:42',
                executionMonitoringStartAt: '2020-07-24 06:22:04',
                executionMonitoringEndAt: '2020-07-23 20:11:57',
                status: 'XXXX',
                name: 'ivviru3tftlbr48iwcwv6w5zpwu7djwqsjsqpvt3jowfi4sxfgmtbfjt3gmq8b4dlkrhbtmdky5f3qehy7br5mkwz42rv4wb1h6hdjpjmlenxlyh2ocoywhy6mua67mjfovfwmbs15q957ncm2hsnoagu0y6gebmp2l0vk40r9tgptofxmljul3x65kyvrpx0ew4qmzkg5676397s9kb3hqczm5eb8oyzhxc5jgbl9mrj2403fimrjbowzu69h7',
                returnCode: 7299831396,
                node: 'mg9puut8ja048lkkimjdkzc51owrgy1yemfv2dl74rr769u4gz86s177tb2vyoxfw2zsz5ymxi26xvvt9echo26cihs0p6lfth6guik03ygv7e1v7j4y9wrpcncmbjn48xt4pdo1ke1ulqznaewd1h8zcxkh47re',
                user: 'b58np9v4nytthrqyl1fqei8lqqpnn9tm2exvla097ysr70o8m4dovb6apq52jtsqcfvrxukr0h0n7wee1w036dx0pgaf90yugzfsovz8w0aozhst5kj15e29tp3hiar84go487aforxbdknc92sddtmojeiytawoiqufklqoff36pjjkwo7ltk88zk7ddysxsbf4a07ixflimfi5mevzzciam6nq7oevkfxumrmjzwayhoww4x7qkbevzx5hu9c',
                startAt: '2020-07-23 18:32:00',
                endAt: '2020-07-24 09:20:43',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'lhel5krwltxstutjwusxj81tqdbw77bdngb1hfeekc2wohu3y4',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'ckaju8qf4bybtblhdadq',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-24 03:07:29',
                executionMonitoringEndAt: '2020-07-23 22:06:36',
                status: 'CANCELLED',
                name: '0v4pz5luto6y63ktu7mes98vwh5e5f8rxpdog8hgpua3i7bjmt9jyudz6s33pygrfsc9cgpamxgx0itja22sdk4pu421si4dffkzkgbd2qtxns0ym8zfsh3mu2yp663tt2wr8acvq97124npyg094jsonsqe7h1aemkped3w9l9gjzm4elc2txecp1d40fdhn285oabwwvwwqdjgharc4x5qjttz7pnrps8msk330l0rkwljxqn81nb1q913vfr',
                returnCode: 7224303636,
                node: 'yuc5bmr0a61jlvpp49sf3oqpzp6hy0kze9ml2wk4z2khr5fcmdjrzspnxbotzd08pv6t9858idlcgf96p83zzaeag26hcf3tgjyhqbes3cdreefhyvy6vj2aclieyipyxn8uf1bm8s1wav36rwobwl3nt43gp7hr',
                user: 'gguwz508fcy0jezlrkxfhmhi728cpchs1gbdg2ibv07gfqjua6atfwr1lphishk8wd929alya4vzy51oedn8488ozhl75ast3vxgwvv6guhnfju89xw09jtomjkb6npqj8icauqhtrynn5y5xhcqalifwrarhgnghkqnxbl6l0scmbu38hu74l3oo4i3imh5cf71kjsng62zq2h91dfxxmzg00bx0s7u8dhpxfo9wggg208qtbcec3x1crlvgqp',
                startAt: '2020-07-23 19:14:32',
                endAt: '2020-07-24 11:01:12',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: '90hnmusi2qqbxmnio6hq006dx11ntt0cdomb053jx9r9i6dvoc',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'sflklc3xd97uvht1ol7f',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 10:35:55',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-23 23:21:02',
                status: 'ERROR',
                name: 'd2mtx4wi1rdjlopz4bslrudy2498n2rmlz83em6yocgzg8318iy9wwigklryga15gfpqaa1mdl0cw41i7ef1ln7nszzkl2c0m2ro460vg4kw9p8kyeyjx6yc4dfhaaan1cewq07k08rpod8zxmjlum3t1pe966536fz0l40bqjd05rtnc3lp0tgl93trvbux01gf7o5ozrx8xsaqz723e3t4sjsw397ocg7fqmibx6qgdt7up1w3nfgnym66arz',
                returnCode: 4321350104,
                node: 'mdpla2t9a1zrl8hfzuqp2g8bvln133g52i9oelc6vejgiby1ul085jq7yv1eez0ad6mlog56dsm1y7po65jixgp1i7kj8xucofpx3qm003z0tctoul8b7s00qpa2c2gixlsfbfaiaiiiogljxjgz9jkn4orrvvr4',
                user: '6igosc1nustmiggdbxrqcwrqsn76hl4gxq96ahcx4k3flx6wrgesex79da3qcqzt5i4w7lhl81xm63aixx4x3a7fftc2pyqy2ycu06simjrsib35u5r3aej1wa7ot9z77dbxmuze5ipl8u9xmxgh716uyalcavmlkvih86uxekn0w508v7g2lbc2hpj7s6oxzfxc4d6c0j7olijs2hufenrrvya6pd1d3yt4ma52sep725tad2pz0j0h0uph16r',
                startAt: '2020-07-24 14:58:08',
                endAt: '2020-07-24 09:11:43',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'xkgsn0n0pf1bbi4vtfcqk3mvr99wvezck45nld0707ncdoaxa9',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'fgrwnu0olrhwyju1ubjr',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 10:58:05',
                executionMonitoringStartAt: '2020-07-23 23:53:41',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                name: 'mk19rcunan1fyw0nzam0fqkykwmgyrrj06hm2zuvtycp66e5etinu8e1jf3ns3b4d7ztpve8yctbggnuwxjfddzfje1u5lqo559022cht8ioqhbpiazzvfn0mwz8rqbbju5umu2oof8s9rj5rtucrv8uo89de80eq0cl7vw7gpbt8fiwrsay3pqpdgja9yzisheev20nsjyp6019976xka5sahmi8w315i7o32dpinutjuz8ubidld7qttau695',
                returnCode: 9123686887,
                node: 'zwoj0f4f05ee4rnxh3akr6qkt76im3ksyph9zf4111n0lkn4uz79r54rt63xo7878oa8obaibeqpftt7drbqz5dsktos3qdht8dybi4wei9p81kdt4vtn6bs4zqkdzpyg4zmrl7dgb5nv93zq8vg4wovwjzt2zd3',
                user: '7piukd3f69s1u4qh7xdu4rswrvyeikb4b3v8nn4esjm4nur7wzbiipevopog3cbw7xku416nrf3kcdefd92sv1qs69zszzbeyfdp1cwbrgv6oaxo9sslg06iqsz0l0mr35ldkjauvyrtj7v0k55pi4opstupe7dt5d623lc1zdmehmmmviyy051rf3512qv6hjefo1bvp0z9dz2jnpdz0skg2jytuh02vaxspygxit3qjt0q6vb3xugpy9safj2',
                startAt: '2020-07-24 02:28:55',
                endAt: '2020-07-23 19:46:07',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'q3a0ugqufib4lneyy60tffjsauhhlz16swaqz0i3hxhcag9du2',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: '02y001ic5ldm95lti381',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 14:49:17',
                executionMonitoringStartAt: '2020-07-23 20:32:32',
                executionMonitoringEndAt: '2020-07-24 05:02:26',
                status: 'CANCELLED',
                name: '3ha77py9oi1lvgqqhivl0dgor29zu90s8oo8w2wusqdsu9zo3souhtyxxhs4gjs8kszhatiz5u0ik5lj17vbjtjiyjs72aasv6b8tzv1q6p6fmq9max8zzo4ok90uwqzb8g9i4v5ro62kbcj7bqtp79zq68s3fvet136nn0d9dnevjs601fulddnxxtambi61kzkyxe31uafsby6pu8bts1fox7fup8a5pjpur8zcbjxggswbvtla57eev4nn8v',
                returnCode: 3452231820,
                node: 'ywbcazayu1gni0kg1kj95kwdeqadzjrfewh3brcgxhohbuqkknmktv5w1y9h82e8wxfm404ggsy6qeczljc1bh0kbmffx6e0kcpmlji5wsn3llg83iwm8r4jgxrybv89qgoput84fuv162fr0jkxewzcxgxsa9ag',
                user: 'peyv18f3vc9zr1to5qrbfbr2kpwtgz7g58mba1nlzh5jmkqj5uka2fkjb8zhvhzhggm1sqa4mq7qbju3rkg0g7rq7et0xn466irk1lbmira97pjghz1bjf1bwlu5os2ikwdc9jp5rlrwhl05tzo6a9b0eghopmhnnuoly6nekypzv83clmpzjwna7yprz9d030xhvygzx9i3i88xixbmqxuy8kfph3i9xidazho13beb0rb3b0afreqinhgkmuc',
                startAt: 'XXXXXXXX',
                endAt: '2020-07-23 23:02:30',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: '85zkhz2t6t4g5e8p7lqhqlrg5jp14zd474krwftu538e1et1aw',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: '9tr3x55qhp9mvtqhb6yq',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 04:54:47',
                executionMonitoringStartAt: '2020-07-24 02:49:05',
                executionMonitoringEndAt: '2020-07-24 03:00:09',
                status: 'ERROR',
                name: 'xsi1tcco38gz2wer78ybbo3n36cfi3us088sa9y40weait4aev7sjgz0m94tl2eakvbgm3ui8hecj3mkiih5rbtbm6anyij41p9thkebf7xpl573d5h3rfd3cfls1854co31pygafbk6nihxv03kdm7l1kcj74oya8c6i1c2qxp9195ccrrf9740v3tsh9m0zl3uoemb307y7xk0qiua2imawkunteq2xsorjzaaymi7cfmo4orodoow5a5kclw',
                returnCode: 6596199696,
                node: 'wyzsmiweq1z6zg5bcqseuih5xiyu507krd778osgriwode3h2jsr75logdocvetn89fz9050xpp51ib1prh6tald2jomw87clv3uaq4lxkodt7j0j74mmega4zugsb8lh0687mgqvdwhfprbq587em07wrh8r0u4',
                user: 'aamdth37j3nhjiqelyx9sds06g7xu5rrjp9utrwucklzhvtqx32y66pezo32i0ki5figr4ef9t1olss4hrymssh5wdmhta1zlngdyi3aj3rrzxbj7c6l7gb128vce7ickt82wk79uttmz1g5sbj6hcvxpmar20ob5ertse2a76w8lqrocf4yt6tj15bp2dzh0kjhi9ow67awofovxclyzf4ex0g3yhtg15jswezz2jdgqrmz46xp0qdwk6gde9j',
                startAt: '2020-07-24 05:35:59',
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
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'afwx8kha1f0vl34bw3um5q64a9qmxlxis20k5v1wxwbqc2zb1b',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'jo0tu6r1mbzsag5zjidy',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 13:28:22',
                executionMonitoringStartAt: '2020-07-24 09:16:21',
                executionMonitoringEndAt: '2020-07-23 22:22:36',
                status: 'ERROR',
                name: 'a6r3rm1oajg7hhl6sayq6d26ipsduac469r4dkdvrzhh55nk07kx5d5y3pssssa0gzbdzwb5a2wu1yemlced08refhg9t9jyy51spoklbwdt4b2nvlnlyf3p71kzefn2bxlwglriwv435j1squc3lhv2pzrbuhxh7q08wpk6liwg2i230yrientkozw3n8riz2uuevsmx0xvo2b6t34bo4e2tzmdqrntind6twhgmrjtlwjer28zmm9s4k3gubr',
                returnCode: 4868889748,
                node: 'hx855h6vwf7djvxqcv19bbogcumb5rgaxc0wftcoebwjnuw6vtk9gl0mu1k4lpcmtsgoosvajm4iad4espt8rvcp39m6zfp6vojitjb2ub5ldn7299kpp8vccw6jhbicjtfijp8ostw9nw4n8a0ndtghmsy0adyb',
                user: 'k25fq02d5bj96c7a9fjcwg6yjurekjuvn25ovccoubi3z202k2kwdq2b1vfnl0zvjngo0eblk6sgm7efjh3kiwj1a01hi5qau65ldmtznkw9aoi42ror516bz293gi6bhhq0hflye4t9sjzpgvwx4rhrj3v5trb14gsw6m7t43vifoy1x1t365w40a1hl0hm61r4d53ntlepai31gifyyqyj5kajp73wdv0f85gbw4iq20axbf8up0zy1gkru7s',
                startAt: '2020-07-24 10:57:41',
                endAt: '2020-07-24 03:30:36',
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
                        value   : 'cf1d6cec-d3e4-438a-83da-85f227b926a2'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cf1d6cec-d3e4-438a-83da-85f227b926a2'));
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
            .get('/bplus-it-sappi/job-detail/cf1d6cec-d3e4-438a-83da-85f227b926a2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cf1d6cec-d3e4-438a-83da-85f227b926a2'));
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
                
                id: '4b20164f-2dd6-4c82-85b6-ee064e581157',
                tenantId: '69c0b5b0-3097-47b5-85e8-2c177f53c902',
                tenantCode: '4utdeeli0wzilz18e5ogrs8ltwd378otsra6006dua7gtfox22',
                systemId: '676f6e55-50db-46a6-a6de-08c3810725dd',
                systemName: '1i2ct406dat3ah1hst12',
                executionId: '1fdd0e8a-ad10-46bd-ab57-6d5dbb8b65ef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 16:12:21',
                executionMonitoringStartAt: '2020-07-24 04:56:55',
                executionMonitoringEndAt: '2020-07-24 04:15:56',
                status: 'ERROR',
                name: '85bznfg1wpe5t242zciubs2k40ahm6u427ata1f48yag6z85ne2b3hlxlkczxkl9h32xgt0i51q8oee0rekpwdguqs6w1qx61gq229xu0fqb750n5yy3vkaw8c54av9t651hanvmysysm59m4963rs6w0okajryv6rgbjmzule8dnicmtcix7jqd155vnpb65zl4065bqdorm22glo9tbvliwwz9e97q3doqgupj4yhxlhayf0pogr4wz5cr2te',
                returnCode: 8019616073,
                node: 'dnz5nqdxel7aka2zp8muwabxdhbuprw58ervh6ns0420j46gvdgmd8etkkuhs4qgxt6prcdtlxlj0k0x0xoyb3qep80ozzqhu8hbe3goujh9a3vbfqdqp6o6en2idt5ip27pwitihq6evjnx8o9yg5ybh9ki1g28',
                user: '6gqgej4d18ne29cqws94wfdevp3pwmohvyqhbihdjp40m7y4m6k0vtx5e2grcfg0l66q8zvy8l30ruw4ohaaoc658bx4280dp9xtm9iydq5x28e7h7ede75qosdn3pgcqh970r0diy2u71x88xubynhfjl4coy7udznm92rv8walwokxzb3r4alrlfzkb69gey90qbh97ooa91fz0d3trs978d919yzu5uq4wx0bi8asl69h1ke68bry4oam2b5',
                startAt: '2020-07-24 03:51:59',
                endAt: '2020-07-23 23:03:02',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                tenantCode: 'ag83s6wn84i0cdn2uujsaqluer1ifr3zdrhla66iskbed9h5mu',
                systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                systemName: 'syu7810418y6e630ajbf',
                executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 16:18:06',
                executionMonitoringStartAt: '2020-07-24 16:19:19',
                executionMonitoringEndAt: '2020-07-23 22:10:19',
                status: 'COMPLETED',
                name: '9dor5g911o6ujb95tst378x0bxblpw961flw3m53t6re8t07wp87z26o1nawjgyf536e3lorywzo422b8c29ktnkthy0n3yqmx0klc6hcp3neneka6syjs43k4nbtt60mfsv6vmsk0yqveefucb0q2cu8sa7k2kp2r9r4m2f12s2h67er7v0zmk2ksbhy2fjk1uhwwdgpa5pak7podx2zabqnm3zd29eke4idhvxoy0rrqthd8m40v5u0qpclkf',
                returnCode: 2820180975,
                node: '9zw6pgxnopoi8rt57qqj4vgz59lpl7t1byrns1z4mayq84eb04jeb0xjfjn5sr6e9901t9ulwrggaeommcwc6tt4utq1tvcpvhv3hl9isry6l4wpz790u2md3xhk3nxdz2pnw8vxmqqflmkrlygomwwcovtbyd92',
                user: 'ux3rvr3353mf9toph4zp5womy2xhdzxyfd83bnr8ro01zckxfgx8a0xw8pgr31euuuwwnoe7v5c2069g16d2s9r33g3yjc54ni9r6wbzvqm78z11r7juv2dinug5pp44d4stbmfynf9u1pl0z5hts66x6qbzt2705scrtrwu4joj0yyiss0m5q3xh0bmtvnv9kb0dvtjfu4bnakboco54d0fi04eh4jtmhxgwmfpv96mgv14tsqi2jpbqh1equq',
                startAt: '2020-07-24 14:57:39',
                endAt: '2020-07-24 13:52:35',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cf1d6cec-d3e4-438a-83da-85f227b926a2'));
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
            .delete('/bplus-it-sappi/job-detail/cf1d6cec-d3e4-438a-83da-85f227b926a2')
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
                        id: '91eaa3ef-9c47-4e09-9fde-f7cc7b987134',
                        tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                        tenantCode: 'o0tm3cxqrvtmrmleu3lainhe216gr604edeyylfs6ufxvbf9q3',
                        systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                        systemName: 'adtriqchskqxbfcxoi3a',
                        executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-24 15:54:17',
                        executionMonitoringStartAt: '2020-07-24 08:16:10',
                        executionMonitoringEndAt: '2020-07-24 14:53:49',
                        status: 'ERROR',
                        name: 'f6ryzfxx8l8dvgkfhq4fz5tgrz4dfwgbgs58cxipdrigx8ecuvohpul06q9tgrg8dg8dj21atvbxeq5kp976122uap37g1ywchbqqdm1gjcyzommgmvo8n36iahek3gl2pohvc5yj5tusbvtc79eqe3n4u2jpa9dyncqo2g6utszh7fh2u4hhw8b2aufyfohrpxog6lkyl9ozfx1x8vt4hgvwc3rom7hhq8q1fnuvrk3ksna8fz0d952tw974lt',
                        returnCode: 5396427776,
                        node: 'j4wgnc8qub4083h0ehux99wky3a0vh4p12tynfj8rggo6rt4dp6gripffiwcyyqo7zex00dmyvfswzzyfqv2kpjlhlqf6zl5ovxqo366xgbzf885ipc40weciym3vr4ziyrreb0n815yy6yblx4rkd5egt2aru5o',
                        user: 'hikerbyqmbj62hwygosoedblx18xc203i46o8vci8v20sifhe2tk9ixahd7cxaxtfhrejrnacmh1tptg7zwd284zq2ot0wqx71l7z9jsbn13uzrxfyk5pjx9vph1cjh86l7x678qyc40pqt2c0tpoh80t5tvh1v8biwd7t9si65msfblu7ti79zfu5juenstrpgd8r3xjbgimh44v6palasqssh1umv4edk99z5fiwfqq1el00kejun4evyefgc',
                        startAt: '2020-07-23 18:35:59',
                        endAt: '2020-07-24 04:04:51',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '91eaa3ef-9c47-4e09-9fde-f7cc7b987134');
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
                            value   : 'cf1d6cec-d3e4-438a-83da-85f227b926a2'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('cf1d6cec-d3e4-438a-83da-85f227b926a2');
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
                    id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('cf1d6cec-d3e4-438a-83da-85f227b926a2');
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
                        
                        id: '9abd73cd-4913-4db1-ad3f-242e4c9e243e',
                        tenantId: '09d84076-3dd2-491a-9ea5-d18255bef0cd',
                        tenantCode: '7r2sq9cz1mf4mhap7anbwkwolkx0ivj7tfr6txxalgvupjnrt7',
                        systemId: '3468cb39-3a0c-4719-a6c2-668abab9d720',
                        systemName: '5k0mybiyf65ey1lbjhdj',
                        executionId: '56889bc9-1b0b-4b7e-a2c3-3063f7ec7234',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 19:51:51',
                        executionMonitoringStartAt: '2020-07-24 16:34:25',
                        executionMonitoringEndAt: '2020-07-23 18:57:39',
                        status: 'CANCELLED',
                        name: 'jzx97lqdrxgnwihoh6zdvpth73nn2zo5bynszoh46zqhjgxwre8yomhfbma0hvb0js9i7887v2g2v2tbztvdemi7fzmm6ccp9tm0wp219kb9x1khx60as7c331wc4n9iadsymconj6gl7r2d7rp59zsy0nn6bz4czul3d1ekpykvhcdci3szenobvu0ifeiz8tu4crxbdmkqaud1jkxzv83841219yfixn0rd0u9i9xom58u4bua0mqku5wm9qv',
                        returnCode: 7589578621,
                        node: '4fa7wkhik1zm65994ldkol3palyrpr4mrlm25xmxp3hz0b18vzq2o7ezkgb4v3n48utvb79yc2aj85ftsok2v54bmstda2cswh817xdou01k7aoyl428q2h1fjujjupyqzh5y8s69rf8yb0ci29a7cmr4g85lfwv',
                        user: 'ed6yj3mcnf7zmleid801tfx7qi1u72s6h73aaa8zonf6yedn1im9si5tjjxu243qebem0rnu3sbkofdwhtlb19y48m83g84b1c6gd626c7y9p4qmwh3qwrctb774s5am55tzir79bdjhh8pijijah9znibdq470zeibu19w1qti310zw4pftvtrgca8m00mrl2t9v3a76dlhxc745f6o5z1cfl3zpxfapziylz3yriwthz8sklpule9gmbp1f7o',
                        startAt: '2020-07-24 08:51:32',
                        endAt: '2020-07-24 09:43:20',
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
                        
                        id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2',
                        tenantId: '63057f90-6417-48c7-9f84-ad4b31a24016',
                        tenantCode: 'gkpginifrhcngdsvbg7i0w1q55crbtihp5ksloa6dmlrt4nnq6',
                        systemId: 'fb6619c2-4d78-4ead-816f-114408664c3d',
                        systemName: 'e2ctgryirff5re5aicvz',
                        executionId: '5d83469b-5723-4df0-9a0d-7103b62e40f0',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 20:18:47',
                        executionMonitoringStartAt: '2020-07-24 10:12:42',
                        executionMonitoringEndAt: '2020-07-24 00:13:50',
                        status: 'CANCELLED',
                        name: '2qd88aoluu7vrbiohunyyag29iuu3j1t69hprmj06dqd9lm6azthrzsn92w5vavvo6cx7qr7aus2tu3grhis221wlnau4e3z9nzolflmh417hxqwhs1p0lb9hcq5h6vhxsz07q30nb1mleylza8n9qwhxue08uda56tshsj116mnclbiz6c6cvpbdyp8go438sbmekrix2che2dr6ia0abjikiabsey897dlr32bj3stfahy9byenspdx2p85vk',
                        returnCode: 3588877332,
                        node: '1f9s3q4k1vzhi4t8tg4iefiad21w0mcgtxea0kfeigh9c2z90ywgxfehbzf9xfje1joi1yoccbjk00ampif1su5mdu8vjbu51c208mcg4vcuigeyv1xnjajawsi1z5zn9l6y8rryapxlduan7h8cixz8wkhk8pcg',
                        user: '9hrkpvvn6f4nlz29ouwogosdn00i44e9mavx6ktuxskp05htnce2h2f7qqy7tq59w38mki2xq416uqurgew318fo6rrfqk1j5s98jhrrwnn47u319eypl433vjyfg1udt4rezf357tz3s2kk5868yoye7r2zcccd7f4c5a939p8649i5fdrf4jb5cha941vnvkj804q5bqbjd05dlc8kp338hzgas1v6tfku3rivzrdsw491k8sywx5koai5jn5',
                        startAt: '2020-07-24 15:59:53',
                        endAt: '2020-07-24 15:46:57',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('cf1d6cec-d3e4-438a-83da-85f227b926a2');
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
                    id: 'cf1d6cec-d3e4-438a-83da-85f227b926a2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('cf1d6cec-d3e4-438a-83da-85f227b926a2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});