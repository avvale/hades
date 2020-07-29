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
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: '7u2sj1a9z8jzqwzz8icdcyvf9p81ht20whbuj50oqmz0y5mjgg',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: '6df1skt3yma2d9su3jh5',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:11:14',
                executionMonitoringStartAt: '2020-07-29 00:51:08',
                executionMonitoringEndAt: '2020-07-28 18:39:30',
                status: 'CANCELLED',
                name: '5or0gnmn6h9n2mbqvhssf61i7nf44pmsyxtpam5nihoxijn4n6et7akzgviep5j0nj6h6alpwqnzt98d2clggcrewnpb9y28dj5nqevu6aovlrys3pvrkvqgkeswdh3jq05pyufzmnv8keou0rtxbzd4sxtze7wyvfv4q550nuiy6fywn5qj1f3e9spko0pu92nvhtnwlkn9xt6ucsuahc9lu4g1he97hfjuw4bjng4t80hcnloytgl30pmf63z',
                returnCode: 2356124049,
                node: 'k62vqwrx7oju60xgu5rpe501k8ek6559kmyyg1mx1sxvrb5ny4onvkc6zexpb0hx8u9qngfbb0dqtho4ogdzdx57l2uxujk295yisefzvc3r5xvfytkqguyfi7mdjujo75au7aabesucwkaqfpks85ev4z987zuq',
                user: 'k5ownykh2dlayeqecezibpmw7byyhlizsha7khttqb29nplhtt6bnbcsoshm5os79ghoigf5cbpjnhiq05ligky2s5l296lfsaeummoknuknigi5cx0zixo509v185d8mdt5m6f2pb5l7v3x9c7nn6v4y05h2xnr61o2od9disskx9dlwzgftckl6rg9y29umjkilhcim8iy8iaqximne9x2s9au0ym2jzze5x9jqc43d5xz2ejjw2k1joc5low',
                startAt: '2020-07-28 14:37:11',
                endAt: '2020-07-28 23:49:51',
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
                
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'wuq7j2i8g7oi2qewf1fqia3msv5ht6dcm3ptv16dugoeys3d7u',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'wlu5ay4wjh492givjqww',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:56:27',
                executionMonitoringStartAt: '2020-07-29 02:04:06',
                executionMonitoringEndAt: '2020-07-29 10:23:54',
                status: 'CANCELLED',
                name: 'em3d9vlclny6xf23qk7w8fjhiq88qblko6rsfhfxn57fyqzl4e4fyrvubvuimim6a8sxg0i3s0gumikcqxj37kw12ppkkhmhx1k7614ss4sexd86vn226e3b3gyjo5w9vduw74f65mr0sdtmd3lnw5jkz6bong25tplctm6kha0urbdmvcximgphkf6quzx9i7r9l4a04kcwyw6anfhwa37xr2jznwrsamnnx560z9a9q3r98a21r60axm5hgim',
                returnCode: 8776138452,
                node: '1tf1tkcmpudlgo15uk1ggnubgk0f1ih99ggba1ogezv34hq15z820904v52si9j56rmfs9jzllaskmcgzdgadiwxjnjfa037pc37thoe2kd0w7b75ydf6tq24m6l2l9eyxsxlqhr8x20zcvmkvuus1q6658n47fk',
                user: 'h8bz83fxp8v0vsv8jb02wkyjwayn2jt8db80miz4muuzs66j5gfrjvf6t9azkodmydbgjl41eszwhnn9e47fj20otw2t07b1n1mpyntvnt701o4zngs66oi6i4mn67e1gqw6a2iokzxj9ebo59414rbsuut5ygpo8fjefww1l053vr18enznekrsbvsh88i46rbng8x8a8pmf07jtkkob846yrw7uk069sqq6gg693jvaj25fy9978lwpmvkc3i',
                startAt: '2020-07-29 11:01:05',
                endAt: '2020-07-29 01:55:32',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: null,
                tenantCode: 'w5fl30e0fien62sjh7a84b4fmsl1p7zt2g4e94fcxp71qirgpu',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'qtgffsf02vrt0q4fyef5',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:34:16',
                executionMonitoringStartAt: '2020-07-29 07:08:23',
                executionMonitoringEndAt: '2020-07-29 04:05:39',
                status: 'CANCELLED',
                name: 'wkjuvidlkl6oij6xe5hoq5gsmgrjtbfpbyvb45iwyd8sce02fn7osyy5cicqszkdv0xuejffuwi91u5u92ph2n2qkh37bogzfivtzbtfxv56upupknldnitj12nafd9r5j6zg7y5cl7a8m264rc1t44945uaw9zircz8plz70nqwi2h13r946m3mq3v6uow1xa834qky5almz0qh99z7akfzcgcl93vd9okqgaz0w71h7flom06hy68bbjh7hzr',
                returnCode: 7664958148,
                node: 'uwxfh02hmje61l123wq6rt4ufd43po0pk1i6iq7knw0szm1ureqwnzj9z06fw881j338t2drennb0gqma7yatbv8b93ltuoyiwlph39b073pr4a6wy73gslwe47yxqachwp2v2dyh6lml81igdht9fnobykhd2ce',
                user: 'nqgcih5sbh1b1pg15c07db30x0otsnf5ihuxmr3qhz5delx8zotqxt261zrf996ic6576sjkrn841i1ha85ca245oe5dut848i0fwocayc6gw8qgrjjxaon47t6f6u0mzirqmup87rqbojye57ezh2zwnmpu0touenoqo3ybpg3oplcgiurreg1g3x51tztvlpsrvlr8ni0tam1a73okb19lr721fu10ofu1stadyx0mgc7gjaxv0ny5v6kju3f',
                startAt: '2020-07-29 09:42:23',
                endAt: '2020-07-28 15:25:49',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                
                tenantCode: '0c77ny05si4284y6oniu7g4zx5w686ch1bee1ocx0vsf7jqv77',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'per7urv6shhbprfrhboa',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:36:01',
                executionMonitoringStartAt: '2020-07-28 15:58:37',
                executionMonitoringEndAt: '2020-07-29 11:02:42',
                status: 'ERROR',
                name: 'vesw4p7lq1jk517kvraes4fznso6uczh3wi5jrhdqkt39g3cfik30rajr6q2qhtcl1zyfdxycinks6d1c7gowy9heshtdyde68p82phvdp1t6fac64k3wsnrpjw4wd7belyyj1rnl1fho8p5evir9rdg80eeitle1f2cv0xkz5sm411g12qjaiirm2oyf0n4n26u7w82tbniyk52soa26zq990g6bc9txftm1rx30436h15zhpsw17si3f3awdp',
                returnCode: 4127877564,
                node: 'z2d8pmp26z6ohgcw034rssrrnl5qrfg98nlrx7zyz4mqv9702ti9jdsz9urr2rn82ngomap1vmtxcswzwd7d3md874rfk4zrjomh93wq4xcbo4hguwa51046pww4bo584brovy4yma1viupgz5b0sa5pcl5quhk0',
                user: 'y44f3iv7twx66gcn3dm62abs906qbyt40tis1umv7sak7z6d3daaptt7z2hmbuhh61i7puer2aflrl72pl5yxvo2ximt713v5xyy61usroxq6hbsbvvkt73zc6kgo8e2oa79u6g49iv5grdeevp8lvmwnu5mqzizk9ve02n6nuussaiy6gxbrrz902xzxmk1ca2foo382up2b2t0uz08uwykvyuwqbttn3coag37xx2dw980p929v2golmun8xu',
                startAt: '2020-07-29 07:51:55',
                endAt: '2020-07-29 06:42:28',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: null,
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'i8onqguabzmwqweq1s4i',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:57:54',
                executionMonitoringStartAt: '2020-07-29 00:50:38',
                executionMonitoringEndAt: '2020-07-29 01:19:12',
                status: 'ERROR',
                name: '2rnmetclocnbaqmj3b1wumtj274gtnwo2p4h94gytbix2pk88ocnefe1ro8iw0cpxa8dqw7i7q7bmtukyabnxs0on56zwcfn8ioslc4xujb989eiimq4k04l6gkx9f8fz4ouo4oac0tqd401fsvskq9ykz0cyn0w36jrhi6iuq53fmn9gqu7m84m8vp8f4vzwfajtdi9wi5vvh8bglz02lv6v4saic4dy5t7np511wdc9x6oo0ryeushbd1dcbb',
                returnCode: 7525560752,
                node: 'm40yat4x8rw9av47ut5y6ibvgh6c9aenbl1aq0yaftbubej429so9s0xfxj60x02y6jxl8zssql7nw4xkxdmrmxa9gsi9ttw4tgztxro5z1nyr5f1s02m014phqf70fi7kbfn78h7a0udn7igoug9v66pooxldbp',
                user: 'wgg82o8epn1vpnw7nb4keifcotpo91prdt7di6dox80356f0woyme3lwdwmjr6dgxvvgdr0blfhbgejlibqp01858le9wn181r89zpqty4ur9p6fcn58v7tpc0iv8tombrgkiwmqpfp3zg3z3qnhj8wnnoo6bndas0d1xjofimmb6d5d69dl9xumsrhntjah63fkoku0rwyv4lecdyfk2zowmhb7jd4qxl9dismmw5aow6893ly05f4zkad8xk7',
                startAt: '2020-07-29 05:33:44',
                endAt: '2020-07-28 22:23:51',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'n415vgq98ssn5cjig1el',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:01:09',
                executionMonitoringStartAt: '2020-07-28 23:22:04',
                executionMonitoringEndAt: '2020-07-29 03:47:18',
                status: 'CANCELLED',
                name: 'g5vngmp5vy5vkyvgd9cl9npu5ge5dtwpondd8pgjxtztajpthus07n2yoel2q4ewg31jgqmaqxlc8pxqnpc3zlbugoamwxtu4fvsn1pqll82qt0kl8t5ktoic6fa87v54me0s507drqilk1wyqlau17cqlt7p2pj80u6ebhelhfjga82hf2xp8el0iygbxsa32tmnkkgddqb0fg7qpmdno36q0m4krhfxglf7jsinf9v3ors3njrmfrkw4v3fvo',
                returnCode: 1047803278,
                node: 'okvl33ff8s97h8llaxxglz813qvat3cy9qekoa2fzj0omitlxpnhz1xg26n7axfyi3hoqfp0j1w151d6ph1ndobnr6rneqgsuvj5vhmthbpdn22p6ir3gdsc20iqy0e81h6vcv6k1dyv01sqbhddseuwgaaca5jc',
                user: 'fl9pkietenqhhzjomx3joye1zh39b2ccyfr7sbsnyfcgkdb09b8ugbqvo3z5x6lpkvc374bi6awasvbgai2tts0tmgliubhshoq3mok21yqvdvcvf4l9poa13sz2xmsgef66vfmydxxkzxkqtlmpuckgpac4etpdo8i6l6xutzbxfspfjs46u4c1cm2ipyh194hkq7lozuikle7ju8vyrenj6tujob4np40qdalor2shhzjmhdcv412eipl5vha',
                startAt: '2020-07-29 09:19:37',
                endAt: '2020-07-29 12:10:02',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'tlhzd42anq8fzwmrw0b6rrm20n4br3kb5u8mx8u6fvtu11se3r',
                systemId: null,
                systemName: 'f7jvczo5zmxnsivexcn0',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:17:34',
                executionMonitoringStartAt: '2020-07-28 17:37:44',
                executionMonitoringEndAt: '2020-07-28 22:01:56',
                status: 'COMPLETED',
                name: '8jadf01mhs480u4cjbfyd4mhl3j90mgl2cze4xo4ooit2xn8y9n3novq18d80zuavx0pjvj4ffdtwvh8dxfiw4b2r0fwi9a6lg0f8xseyinid0w49oj8qg04fuu96pp4yegwb656nh2r9ywjhf3diaqlldsvgdj45z8rbtddblesagrrweyet7g5zvb51weparbh5s609hefahoa88l7cf5x614qmvcehh25d19dr4wef7lbtyn4gxnwk648yy2',
                returnCode: 7843062070,
                node: '110hv4n7pa4s9jh36ktxn6xmp9bix5okdg9bkymk5h08kf2uipxagofai9tio0yol9krkbjic7jfp7s7lrpqiwuhbucbt1lwhoafmtx52wzh3g1o03wcqp67awlnutb3holo467e720rjinevi3l7lspraymxsrk',
                user: '35ify2q4aj29bp4elb9o1pdkdfon3k2cnitc4b3vbi4irxhffqj5ig37lzd8x6sdpir8zase1esz5emstsb1xrvrwwhqchlglnqe9k8p2l0xngesivwv9f5b5g8o262m1u11hg53pweddmbybxnawu742j3exnc1nwg19tvb1strw30ywfpwnl00hw4qk0hu41uc3810cq9jerwj3n5rovy0ml7h9wyfdbb9j3nsm1fym4ww332w0ysfh1f6snl',
                startAt: '2020-07-29 09:02:07',
                endAt: '2020-07-29 09:45:03',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: '2vz9e4vi28nt54822awt0478fuyq8l0so5tdwof673sgsj7msj',
                
                systemName: 'qe1fieovfzswnnm62061',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:45:41',
                executionMonitoringStartAt: '2020-07-28 23:01:32',
                executionMonitoringEndAt: '2020-07-28 16:18:18',
                status: 'CANCELLED',
                name: 'try85haxpaovw0dbtiwo36y5ak9b6tcxijiydde3flcjn1lvysa4zcege8p17narv79fw5bafldu86ixoesdiv9ywg4goi1xywnv2qs4821nhp95u626f2p8ga3lkvxp5hx9qxpjmth7mqbxoqictuyvbq89rhzbqgkgnqoibd8utlxcecgfkisfp9elo2f2z9txrvffeh3icrfbktgq7tlkwmyvccxyg3bkts3wa5uhevd9o4ijsrk6im55uix',
                returnCode: 2697625028,
                node: 'tbtpu5stpszb8ylal0y94cw7tvpqc4sccsxo0ylgch6e0i4v78k6e5ghjwlwdtcv0mnmyfkfjch9syui5bmty3wgo7hy4jdmudtbmpfiv4e3nmyeqiuxs5f56ib23zfy02ktnqhxllrns6erivfjci1pngbogolw',
                user: 'yowjgp8dnm5wpntq1v5u4ab31ol3w40o520m5ajxs1clnlm623rvbjczgji0oqyv9bpbqkgpnsg009pbg20ygh9rktalrwwnxwntyj73569sv1cj2tiydfmeecmkxydmw8ij8wjvr0nnu6jcw9a88z2ewz61v7b9lox04rcsljlmvdozew0tv2y582fbe3st4uw6kyyub0czp0k0yrl3vntifh4ibh4v0qq1hd10gcn170gdv0welwrtg051mfz',
                startAt: '2020-07-28 21:06:19',
                endAt: '2020-07-29 03:52:05',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'tafqvj3zbn4qxd9hj6qaeutbe4k3vksr3teybu3gd7c8sbx6al',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: null,
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:57:56',
                executionMonitoringStartAt: '2020-07-28 15:54:25',
                executionMonitoringEndAt: '2020-07-28 15:15:12',
                status: 'CANCELLED',
                name: '56qr77deutk5tmo7y5swempg0g5tqkl1urrhkfh368a5dgmq5mfnz81rbidrr2jdk6tqd6i3i41ebglila7iucujkxzukewapra293r9ccz20ucn2sl01pc0asvxda07fajwfwg7knnqzvdpuq7eph1b0h7595fsd2t99eacs2j5w1s6izn96kv7w8zea9bjfe327dar37i15ilb9v245r3bwtdr4tk472b3bev96fu545t3i0qpehf8mp1e27j',
                returnCode: 7654440523,
                node: 'ki7mdkryn5lmjxhcbcqj72wwy6rxzjn73q97888fkw4k90h40ctr3citz1jmvftyyqyi4p10g4h60h34inlkpns2d1aku92l7dlg70bv1xj1gazzk6x45i4w8q6k3wqot02sglw8gim5xbxrsca6zkwnbcra3az1',
                user: 'bdw9nh2teohjql8ir4o34tqeqq757qjmibnn74mkmppmc1axaxarbsez1m46rohmrozhgnk8p6t209pgo83a6dolov3dp9nvzsspn1572gfoxsiqrvmhzxcb7u91kubi2th5otn07vektwmryqag5fks1ngcgiowcrn7g2luhlyhb8ppio3yrnil8j4uil86hz57p7ryyxtp0tfd0sae61d5u76frfbxb5moa2y8w60fj7bgp7q18e4ag7rnbm1',
                startAt: '2020-07-28 14:38:35',
                endAt: '2020-07-28 20:49:02',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'p12w8s62086j1dz5lig2bj9jf3uiwkkpyaeqkdkutoe0cu4ddd',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:56:04',
                executionMonitoringStartAt: '2020-07-29 10:46:16',
                executionMonitoringEndAt: '2020-07-28 16:53:28',
                status: 'ERROR',
                name: 'wdr63q58mis0ons861bn3mlq72g2gbzfvi9zuo7bohn139j34ohcod97g0bllbbw5i5vrc7pitysuuxyxkfn3circa5ff5lrad9dkjlmkfa9z2sdb861qfem2inzhriufl00j5twfnf6amani3p9w6nn7zojoip9l7u2hj1v9cox4hslwrtroyv7sgfaitje688ax79bd6wjenngoerkj755obpscsomzccxfvb9u2p2kf7zvi3fquyg2dt3o80',
                returnCode: 5921224333,
                node: 'k2gpmhuon3yefm9gcrs8h5yy15zgi7ohudio2m8jenb90b5bilneazih964l5utr7gkqvcbqshdnubf7ww9whls44hxr24fxmdm90k9yhkdeioh7qtzg871ny8yddyaa4i8g6l98ngd8oqazk6visv4iegow6qee',
                user: 'pp331cwqq9gr90v8ab47u19t4skzvi2obhy4s6j6anyhz8wfr9vjdmd2antlgd7iib72soy3353xaxo6q3tk8jj3ruitk8ic58472nx97o45wb98sh8132m52qp8zytusvszigppmrqf1dm63lv52qfcfov5non62ew4ur7e40sj9h9061ixrmb2o9byq6yg8kgsnv3dhe6j4pf148zm2doqhx6oc96d6474djtpnsjvvwptdjes41x1g6gopqr',
                startAt: '2020-07-29 08:34:03',
                endAt: '2020-07-29 09:58:09',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: '0zou08zobx1vvh4xeu2oud84pmfrq3aoqew7utwxu05ws0ssy3',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'efnlxqzk112uo5c17vgg',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:21:06',
                executionMonitoringStartAt: '2020-07-28 17:14:23',
                executionMonitoringEndAt: '2020-07-29 05:40:10',
                status: 'COMPLETED',
                name: 'fqxntzuj2qq7wgqw67ut16mdk5pvr98cavkqtvg0x2ndlbcxe83xn60onvfkmlhz2a4ahjuntq3pqel8zovk3okiswizbdjzuvc2qsw5gk8hlglr5tbq8awsn8cunen7sp78a92e59z7dd56pvpk9tnz1w4m9pn8fnie1uuwb0tdgh2207cbeuzxmpoq0asic9pu74idi0z88zdxptbwuyoe8517chpquy9zjr0oyxhlp1wo7x738uf0ueim21c',
                returnCode: 9835087144,
                node: 'lfii6rbxmesm4fp4vupgvhhiq3j0roldkab0urj9hrqq7n9xt7ihzds5hxwphrjqpw5m81od687q7cxosk18rtpe98z5vahp9b9nidghdlykp2xtbpb3jm3nokvw9yymwwyx3117o6124dmxg2nfadpw0qbyftjb',
                user: 'lvjqwdnxtrzisfslwrsgsosbp5pt6pditt5zykw7fwprnhrox95bicu617n0lx6jjnkk1nzr67px4zch6z68cw89s42lpamf9w4vvkdi28dtbmlrnw2k41x733509lbd3xcsykk7x9xxo35wy0bdl18egecwxp6aa5bahuqeiw1x8k9pt7012pen797vb2jmyhb6k2n9hwmjsovfuam011ockw6w9x0n1q7h16b8mqo0d8y77y664kpoe88erpm',
                startAt: '2020-07-29 00:29:19',
                endAt: '2020-07-28 14:07:01',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: '8hugyyzvsbg0dxhk46cumltu5z03y8v9zyhchk7247yh9m38ug',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: '4bm7ejrv270nlt7m5702',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:57:18',
                executionMonitoringStartAt: '2020-07-28 13:39:13',
                executionMonitoringEndAt: '2020-07-28 20:28:51',
                status: 'ERROR',
                name: 'rfzw1t70cmredj65v25ki6pjz8irl4o6ml7vigobwceqmzjsy420wiw7icvo4jjccdisoifcjgcd8v2w4iy332kvrfndwucxnizt17qst9dmlll6ge8mg2kfid1fsm7qkks0pd8posfnjrg7afmjejkdf26rbkbtklmbylcdw732aj712irh9rtn99rv3s2044tumhgsdcxzoixsuml3zjugld4jbdpgn96iluc3lcy6ubqnaquh8e3l72q9aru',
                returnCode: 1894019930,
                node: 'yeqkflhc4qpoimlcz86jyemgccmygrmtcvusbp3c91g0ioqdn4t60aohk9exzx2mn0wtgema4q2bdodb6ktfzaepup423b6ekvwov717pxj6jich0eqya9m1d13k6hkdnvn9f5kng6daulr5vwfx7fd9o2k5j5vt',
                user: 'utxbvsmi8agt6se80ed6n39stmbcpccx60bzc9fyuz09lpqm5nwe7eyi4yk2rryk5q1w8q2thf6fzrgjzodj5isvwcuc9sl9bohl5g403pga73hn98vkx7r92xqhrjwz79jyy2ddjbox3i8232rrt00g7qnxfu4eh3agyiz8n093zewpv0thbrzhhcpl1p7emfgpietj94biw0twe2taxdzzmcpugpspaa96oasp9n179hjt32vlpal0zaecj4c',
                startAt: '2020-07-28 21:45:29',
                endAt: '2020-07-29 12:51:14',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 't3ednrqswn58hkfqmt5oxz0rnnpd2zzno9ghlag76ypw3ipb7i',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'uvvqz118sgmrumbz44w1',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: null,
                executionExecutedAt: '2020-07-28 14:01:28',
                executionMonitoringStartAt: '2020-07-29 00:27:25',
                executionMonitoringEndAt: '2020-07-28 13:39:52',
                status: 'ERROR',
                name: 'a0cqvtoa1vplpme31gifiks1ztg2dghx63agpuez0zo2mruui2ltczhv3kp90j4j2kqvz30u1dcer0w0iivzlsf2l7ulqq31lz81vod6of9onm77ema78iyi22eephwwmrazd64410wyb1bdygaivs7i2c5qs6oh6gaxczt16k9qs4mh5diak2j8x7mkhot319ikh7dljla5ug6i3y5spjud7ii340nm3ur90cy2xtscu9emimrhrhauopdlj24',
                returnCode: 1411509979,
                node: 'ko0288k9r6aad62w4zdhxtf9g7pukx2smlpvpezkivl10dltj34g7ti81ogpivn99fcvh40dsc83k466kqq378aene81dfge8rrew04m86ubrfd13gnkik2y11uh53o0h3lseoz7r5t6nf5k4bba4hunvswm37lf',
                user: 'y43vohdzfe56m5skz58w8afmtbpxiw171bosffnuv25tjdevlfktwew0igc12vezcp5or13g5tiskzclv0xjqv9c3ccqbbdkwlauavvdwi2ynmiuikcdz1y741qg0qk2vxhskqz6sqidpvv57xq7p0mw949n5on97s9qhrdmlcia90tyq651w6jxfzg6fzykjm81oq9yambjl665mobpajja4n7dff64mn526in91w663kv7tr5c4jztbaflwvd',
                startAt: '2020-07-29 10:39:57',
                endAt: '2020-07-29 00:57:40',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'wh027fx49zugnzhw0ka9qk28ba5c9wdj8bt3pnqrvgg7itdnmr',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'e6entbhupbtlkhs8k10u',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                
                executionExecutedAt: '2020-07-28 18:57:56',
                executionMonitoringStartAt: '2020-07-29 11:06:01',
                executionMonitoringEndAt: '2020-07-28 20:34:42',
                status: 'CANCELLED',
                name: '8lvngbexsc0r5xcavylvs1m1kcc4nn7rjf1ej5f9npjigykrfes60pbh8m8geir4yl4bsn8sjevuhcovqqyk0t3uziszvzrkq475ckopgnbt7hm9fxs0xhjdhgzwdkeg64bigxqv3negdwbi37unrrdvc7gt3c5pyosgbz2dachnjhl195r2w6u0zg31apl2f71yb3qibjj3bdezwtom2hr86txtwi6xrj24jngxmeev6pjo5bjxvnt5hkl5bu3',
                returnCode: 6011583842,
                node: 'kux6c7xlyx81z189dfsima3ylrurktaav4y09la6645sszzs2nfx5j7092tk1944o4417pd5izv0w69r793h1t4cle1a8w9ygf6feeixpu0bcadhedcjb5nfn05oqtgtzh6so8crhrcfu5ved2q6i7zgpmn1q9ow',
                user: 'kcqvctxm0hg6y5xq4hmfwnwdx0xqixgl3lil4vxs2rqlml5nf8923gqeq5xbookd4yuvyaqoapyrcmuzvgvaagsok6tycumx3hfzrrhsqterdnbmob1qtbz5b5i8jduwibel2dk3czn5h3bksd2pykrj7mzi2emdpvf6fwiet44i6wyfsxdn418z3bvq9pbsckjurnk4tae1jjb2x2p4mescmt6j9k4aj1lqyx836qz5j9q4zc2sohtobjiy9a6',
                startAt: '2020-07-28 14:43:59',
                endAt: '2020-07-29 01:14:18',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'qeqm4uv9jckxz6k65niatvr445cnibga5wxst8dfz5tqyjrk9h',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: '0gj9hnaw9yaalxvanrmc',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 10:49:33',
                executionMonitoringEndAt: '2020-07-29 11:22:48',
                status: 'COMPLETED',
                name: '276b3vzxy5vnulryhealprnltibx4pbxgmjuz451kiici283op1oynh839phbqv1s12p34vipcmjthncahuk31jcyql3yt74g1fa2z9dx7bzrypgrkg1e9fmzv4fsfaaeujhrzieaezshlzeinbp9k5qpq4ez97jck7nhpfosdrq55pegnez6g06upjmks7klzpze1xn2dhcdzuw40xhkrhnns2gftioh80zkuf5r02k7e003swinjl5711eiq7',
                returnCode: 9821265106,
                node: 'l6ofckpxq00a3qhoe6njsvxzkazt5564cbmergq05yhpzku5owtbyeneetmwuunlpfmmb3hd8856bdbzz97ehstuyrqqsb7rqkhfrejolube443vwognlvzspar286gn2kx1zdyo7qs2ipq9hxosjnbe5o0w1nse',
                user: 'tam7z86f6blbxduhtweiy9tl2jikywbyuwwir88blb1qshdkscy5lkeem0qnz8pa69vtkx5bv6hu5jd6ljy31b3uieip0q0q1wyufz1752kf7f90syrfnkjstx96nefx609avu15fc5bpvqauaqmsv2gw108cfwv3ahj46u1ozaf0qcnq34jfhnjfb03j8x6uluxngc8mr3ooypmkgi8gsgbe6jme4tptfs7c0q9cs1cfk7nhdvkb7p793d9j90',
                startAt: '2020-07-28 19:54:27',
                endAt: '2020-07-28 18:50:54',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'huwk63jkmbb2phl80otxe95952yyn570rqzcqnxgy3b8nlsorj',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'i5ljnm05yo4o79nr4keu',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 09:26:20',
                executionMonitoringEndAt: '2020-07-28 19:46:38',
                status: 'CANCELLED',
                name: 'd5re55yg54maegsmu17zxh2120b4zj3piqc81zldw20nc3rmsqbuy729hobc6hekmwvq8d27eorj16oszbm6lu9bskou6so4p0orywm2d4r4clw8le4a1cz6ptgejhv1e8j2ku7grv18f91xqrxdxlgy5xe6ri24k7o1r5r0xiwx7dzvtqyxcsnhuccdcn8l7gceh0vpe0igiba2dmxx1nzxy5zzbu5uxz5x9pvqa28jxi11hebolfmjxv1jbm1',
                returnCode: 1288620832,
                node: 'j4l0ofva8h5o7y2pdowe3yeq0z6xup2wp0hb3smsmb8kr9q4netwxuohh3buyf3u3vyiz523vxcbecdit75ffry9yh78bom71ubl3o8lbsnxq1qh6rzui80ffapskothdegyleeqgq1qdg6j784xdfxtqtvzzvgm',
                user: 'c0auspw187a0mhgufken7kmmowf6rm5f1ef2rkv2avk9do8m29pqxmsk7oy4jw2xi5nl6l8d7klbix86ef7rwinzz2leg9gpq5ho8w8e7d15ghaki1jqann3vwfah6ao8b8yz6176kp4938uczcv3nqa0tkbi1nskacuytpws3s4xo2gi7ybo1nl505btmfgv7vbhiqi5b93iy4kf9en4nwavf2r0v6equqemu4ulq098yirgfd1qegryp6aaoo',
                startAt: '2020-07-29 12:05:28',
                endAt: '2020-07-28 16:23:23',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'y4obpnqdzmwgywtnczfqehsuf7nq04gpublranx06r8l1gjzwb',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'ymxnkrrsvtma5nubrlpw',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:01:11',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 02:00:21',
                status: 'CANCELLED',
                name: 'ju9rz4kz6bca7yhcolnwsi2hgghpezpfi3tkt91de8mul03ylsqgleyuor0z2a3xymr16njcybm32k3pvp71li96ix3crhhf20ilmc5owpqfyx9k1ckii40j6fbhqthzzm9mp52w6d4x0ya2t7hcrz67u7espv5v6srt7v9qjnf8ckdias0ers9os6uhq5ia3ci1e6a5ra91y2emlrejof4voxxjoiu6n71zzdmgzvq57ojgk4aiujm0fyxd8vb',
                returnCode: 5203105241,
                node: '0w6dn2ibw8pfhayih5zme0v9x658g2zlgchqeagxoniap0dwowcojhgljaf8wdd5o79ivx3nmzutjz2vtcffmdnkv2gne3298k5rwrwk25rqazq0auf4fgrerkk55b2u0744iovlgvft4y8ffhi4ovd0c6qbkwi1',
                user: 'vjm61tx466ua1vs1o9fpaqtfe4f8kf1wpxyhzk21fvjcq73fs4g2oinv18spy39om589xpjsbkfh5pzg0qbcbjkmnqplf8ccugoaw4w4uozpkqyzz3dhqpk36fioiovoetvuszr4tfqk6i98mg92kghug5jssbh6m77mehvzjlb3obj7qqn8ysi3ci4t8ei1ftd4b1wy92ukjpdhxl6s0rtzewv96jjnxcrikcokypv3aukh0voal4ngmk9k8ck',
                startAt: '2020-07-28 14:22:08',
                endAt: '2020-07-29 10:17:23',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'ommez6urf6io96qfhjja1abfld6cf51pou6pi04m5n2m06xwqg',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'k7gf85n6v2octp32wmkz',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:06:40',
                
                executionMonitoringEndAt: '2020-07-29 11:36:07',
                status: 'COMPLETED',
                name: 'olbxd8525clkyzbv90evgsrh7dgwkytql4r3qfbw5e9r10xcbpxfu1h5bqns42yc8t3xzgnkumswaijnnckw2jt3nf1c0djex9gyft8luympnyxqibr1gglg4937yo835qtwt2jgb4zehlsm4lppqgtg8p1t0mgwzxqmp7c877kzr7e81758ewa0tcsercebfssdwmmzkpx2yhob2goetfduuul7n3etlelthesl39l1tfwaukkj0gx6dhv3h1q',
                returnCode: 6170619367,
                node: '9is5cnlsi2c0cjplxl90bihdo8j651ierag0w8mdb28agyts0h6wagehi920qr1zyrv1b410aw31sy8rdqa16d1r2kq8cqxfqljvhdhfhq412jx46xs9oq90r5ujdtsaxa47p4tmdwo8a8gos46xbw7fm53gh2rs',
                user: '5h6o67syxs5c86aqvq0iw30br8boe379ur5i7nhztbr1uzcr1ifef6ifmoo9lij5rwmzngurtr8jrjpz1dtomnjm1d4x0rrzlnh2oxu9n7pbgf16cor4kglei6k3yp6c7o2tyz7crzonbwhfyllfazirs9q1lcbq5uqnbu9w490emjyxtqzrd1k80okx59ojqbwtv9tzanwwjr38i2br12qoyfy9in1ec1aj90hhfe08t9wj383mdambv1bw89b',
                startAt: '2020-07-29 02:15:13',
                endAt: '2020-07-29 10:59:04',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'gbumv2i4rya695da0akw3o3w3svslpu5rxnv23f2i4cbsabs0f',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'j17bgdlsqwbgpc75azhq',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:11:54',
                executionMonitoringStartAt: '2020-07-29 00:08:13',
                executionMonitoringEndAt: null,
                status: 'COMPLETED',
                name: 'kkax43ighpewdikk8y1ela8zxhnbryyvc2cfjc4fnbejuoexltxj9xzwx546hlyo5h32xdlzfygvhbzb1d4gsvymbcua22pbuv55ndwnoox2f15e54951shxazfducw9sr3rzi1p291gxplaz09v2zjm3ef5gusjtiyhksi6p646gmp5oligy11crp5vp2f7ltve0gk92gkjvmjmi0r836tbdqw6h9dgvmn9v8igf2mh1i2r5t73mxr39x42pmw',
                returnCode: 6938729072,
                node: 'l7m9yh347hnr1xvwgoukwdim12s3ak6dg1i42av69soqjape8lu5f2yc95v164lydx4sn2qbjfjljf80x083hwghlnomln6hxag4pn7lwsmwwyga7zrgg338zg9gnl7vux8x1tjana4dlxzmx1q21omieplnqlsu',
                user: '1xd770qwvthmp0iuw05nk10i4hrvokxtmti6c0ipvmva1492sqagnen84o2k23rt3asxjmpxhl3saoklpmrpvlrs04t0l6mmn5jn4vzh9089ezy87n7daxtzho65gxb4m2bsf7gio3anli79c87u6rgc6cshldj0e5whkm20jf39k8fc5oopwmo8cjfa7i1l320ieurabhvn1jry6u1u43ccz4qz8ycckhvdgvyrub2xeum2ixqk36ycbfn780u',
                startAt: '2020-07-29 05:31:57',
                endAt: '2020-07-29 09:23:59',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'laeq3la8w3v4sj5uffogdf2nyt0e8jtqsga32og376at122no7',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'nmxc19xkya8k0h7xbgpc',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:30:02',
                executionMonitoringStartAt: '2020-07-29 01:59:52',
                
                status: 'ERROR',
                name: '3u2xhbjygoqdqbzfhxdi6632dv2egq5ifhvmdq77oqv9bcq1zyn471hvzuvjfinfgnvgexpme5tdda06wjd8fsmlow3agmuyxekkz3qrxjfq1m5ejx8wpmob7xxiel91njfk38b9vo7es4hdn5i1msqd4qen8yhb5gp0sg1o5oro0qtgngt64k4aj5do0iavc3l803eyocd0ugm2vqz4a92552qm0ddk1yay1a7x9dnzpmhsyxf9725txlct14r',
                returnCode: 5879036463,
                node: 'r66pwiklu6j1l6iwgxsned58rjzz4r4zsd8ttgfn9mh0bd6399libpi0mikqj79hafmuoxjzyq7267hhc804k5li82hji9g0g9x8nh9t2hjzpuxnhyznp0pjmedh8nw8bke1d4cqb6r2pwl80xacp5p9zsnzdf68',
                user: 'fxrq5zr5z76btcjt11mzls2xzfk0dwejx8vu34sbxkjglqwkiabav6qtgxkj4pbzhyb6imw5efg8qj4nu1o7gh8fa375j7o2fdmke25lti7jr72ads9pi5zsmlngt85wlgfp9t7iwpw8i66tbz8xrcqb6i5rmbkoze2dz0fkyko47koklumldfyi4styx3ei3tho9ree3b09m453fvpafrx87lhd92gwsdxiug9i47thhttxuzir5ee26h3kwm7',
                startAt: '2020-07-28 14:18:04',
                endAt: '2020-07-28 15:18:08',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'fh03vt2dlfeftnkq4wjgdy04vtj46z66f21glq65464chrnmu2',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'o6p3o19oge919s0ki0a0',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 15:32:54',
                executionMonitoringStartAt: '2020-07-28 21:31:52',
                executionMonitoringEndAt: '2020-07-29 00:51:04',
                status: null,
                name: 'p11ri4g12jjihek2p6lre9r8i862uwwbkiqd9kpz6mbr4fsdr9869315w1ine86ug03dkjmrjld4q48krikizt78wyax53f1du8qy3m2w99lgpdbf4yhyzq1lso5yo91sgihhekgnem4vu8yql1xer955slliukwllbvzbmpv4o027yhqn748rnz95gta1x2tv642sslng2kgwcuzmfwxbnfod12dvri53z9i3f7mb8qmy4vlsgx519go2ubyo3',
                returnCode: 5725543607,
                node: 'ob1wz6rt43g1u5y6dm3wr8ntgmdt3025f8fkyph04ilxjzvtoqa9knats4pyj1c1ljwyzp3vrktzd1vgh0nd45gb472rukylprwzzyjpem2e35ltix4zckn6zrnbq9uizih5db31u37s2d458sjwgez7f8pwj59w',
                user: 'ucvw4dgd88bg1do5szxcy11c4sj8nzr5to0ihmh5n251ijx8qx96fwbe5e5hb23j2lhdz56sn112myquoa4i94fz9jdmro2cxmlmwt6jwo7d970f3jgay2fm0vsskbjpbr6xwykj9655unc5buvorr865vhfnvkrzmv1wya2mqrh10nahpvds2wda3uhr9o6fv1d815mx5nskxskb7mprmbkxd6jyqr6n0snamse2n9pldmcr9d7s9gp41jlpfr',
                startAt: '2020-07-29 03:51:53',
                endAt: '2020-07-28 20:06:20',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: '7pi5myimbuua3ttue72z5ajm0rb7bakozs0ywkfqd28yj9t05m',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'jz5l5o5cynfso1p4zu72',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 15:51:47',
                executionMonitoringStartAt: '2020-07-28 20:03:35',
                executionMonitoringEndAt: '2020-07-29 02:45:24',
                
                name: 'ng51jkfcky2aw69t0z0gjjwjrpnzpbh83gm3ps555rpadncrjmszcvifbp1sa6lty23fr5ut2c72cllk0m67onwtfnzwz0uzt33mlyrplth1918ug27dwjr40v8k6i4w1u130yaj2t1l65eyfebbcc6npk87k6w5nshi6g5l99uvba6ynknlf8ga9ylivcqnpmyn90wrmku8jvjbkm37dfsgfyoj28hcyv02stnze4oe2o3drqo21t6xgawz3h4',
                returnCode: 1352803890,
                node: 'jjaq4awztmhmhqalntc5inxuecqkr0fr5w938bd4pq2es8mq6ce9nzm3hboufvwneoz7a2zyc0z4pyjd2yh2frhsb3nakgsvuw4nwpsawtzky910j72gz7pde8bdo3msc07q89dwa8vcrmc56f8x6tjlglamvdf8',
                user: '12cg062p4ucbvfavw7g8mn2lfcgaixzo3a8zom4rwoya0w6d9lzjxgfiibtxbog00bbxmenpver0eyvq09frg36re1cl5j2q70dhdijfz1c1zvj0idyn5zh1t7plrtrbs2if1n73g783dz56v7jwsmte3mkzjr3khh4tmrq2pndaxkh546qiirh90e2c06bs5q3psjzioll9hkvy97b31x22pj85pm5k7rdipm7766v953ncmci34qoqhyamp44',
                startAt: '2020-07-29 03:55:48',
                endAt: '2020-07-28 16:13:28',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'y28bxxncm9v1tsgik71ugnelzwdpuma5uzdb6dl4oqinnim8i9',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'ledg69sf961z1k9qxjwm',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:14:05',
                executionMonitoringStartAt: '2020-07-29 04:55:53',
                executionMonitoringEndAt: '2020-07-28 15:18:16',
                status: 'COMPLETED',
                name: '67c1fy4akdsksqbr3b4umkgf6a7zozdbyyy4ohlkvwhjwbjo87oqgvdsrihuejb348wb55t3npkj1qdx3mzyslsb2wywkc1t7cijt5i3gce77rdss3dgv5xvy8c31ffvreb2sg1ul94i4jv91b91cqykuja5r6sukl4zdow8lkej59ddhp2ueb15t66qitkyvoc7xtt2ttfdvtofs4ovl5vrarcfzvbc4ytrtpwomk17iwbbrugcaq0z5lz3zdm',
                returnCode: 1119812176,
                node: 'komn8vekziqz94mh214jgth9jeuide5gwhqnfrqc3146lqjk45498yqmninezqciwxtajl4i8phb8mgqfih8g578ii0bm9n3nnx9op5ds47wp40k5k7qkb5azfxstc3u5jhi1w13taitr981d04b9s1ahu5ydh3a',
                user: 'gbybyazlgeribl20nrowlz88ssrrklt7ibfa5vjx62ig3u0vesx9p8ddlflvkh6acn7wi58ljhe3k75s6gesc9zdjr9zixll3v9mko2x5autwy9bp4nr5xya0t2xw7nrk6xtax3bdyps58uxmodzfuvhsen60kmfzaju07gw3i9f99r3ix5og1r7rqtvcxmc11nsyvem7qu9wthi5zgq03bh4pr9ov3051diuf7f7mu6yg79jhoeuybv37bedkp',
                startAt: null,
                endAt: '2020-07-29 00:03:39',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'a2yqbe3n1mf0fu6pochb965ygn6k3xwqw530foafzaasrc294n',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'x01vuqjg9whw0f8kpeol',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:42:06',
                executionMonitoringStartAt: '2020-07-28 22:53:44',
                executionMonitoringEndAt: '2020-07-28 15:22:29',
                status: 'COMPLETED',
                name: 'h4if8j4hdi0sgksi6bmcacr3a1k15tc6zcf3bo90kwjjpv6f5xbkmx8d655e5opqmj5h7xqqnknkagtnl46zt5acofqa2pymcq3bakst256di1hdwbu6pail4jsjg0z70bol774phrzyrgp1gu4ii9ytos0p2e6rbp9sjo0ty9e7obnx55pd2pzbt5sj5o45ejfowtjk545tc4d1qi533ih2a0ggq555b16r11dhipr4jd8vyl4ct0mb7r0yfgh',
                returnCode: 2828220829,
                node: 'ab35k36i4ukoc1q9xbhghxxmj11t1auqvzhg0a99p7s1mts6smwmtpwq1c6ldf9gc3ts05vatzj4tj7uxf1t6n9tt4dspgnzer9l6f19pvvfp50un2393e6ae5if06c92tuvcmxwn5lj70x1fvcge71q590nalvh',
                user: 'y2cyriqz7gu7kphqamdjvoeuqjzxfzid8st4tgoriemkv0s1jrjrbtsg6807yrrffna9avzzlcha5ezmaxp22h4w157gt2raj1y58vieulvb9dgxziv14q6mbqdwqjfqw173apt33ocul4nm8c5y1kutqtqjzxkj578pkp9phy5rbtcsp6pndg2tmeu9tytcl1mpj24ecpbqx6ogoq3dnj2s0guww10uny4zod8mxj82qw0p42syfclebogesmn',
                
                endAt: '2020-07-29 01:41:00',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'e1mrv2besz15zsigb204nkctj1z62kh9tvtwvckqet6yhr4rsh',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'b4cmbbgadijxlbjc7svr',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:15:47',
                executionMonitoringStartAt: '2020-07-29 09:41:01',
                executionMonitoringEndAt: '2020-07-29 13:09:16',
                status: 'COMPLETED',
                name: 'f71shtdeo34047feaf8jkvbuw8ip6q3ymoxjik06rxqeu3crya2y3qgkyk8zmdb4xikx410fwzlrtf094xyyt5iqxfyeedb3tx4vsk9csoe4wkmfu4ckymks754zokeauftryufkro75wl0tsknejc8zfva8o07768bk1yrvkqmvuxeqmkk5i3gbvhj5utva09mezbb0ftw2pszla0oqti5ur6aqr1z8xd7ygl0y7zcxnphufltxsbrjvltg2ud',
                returnCode: 1259048429,
                node: '61me3urqamzsgxng4ld5x276dlmqtuleommhsqwy2l3hoivkdcqdvv4c2sld4oq7qrjp9o0zu62n0syb7sjmc6s2clhglryx6xaow0lfm0xlsbh7p34fykw9dd59c8rmjai32dmnlwmyy3o5s45dgio6rbieiah7',
                user: 'zo30af94eylwk2hxkp3d4vz1udydj5n0j19o0ybu5mt1kobm4ssaid79g85qvg8ysthi7d1pfbyitfmsxx2kscyh4pj0osv6ujh6b14icbuqzxsnyhjfukhjs1o3e1kqo0casueusea3as91ldbkkt4tqkmphjp89bngzg9gnv0n1ldd1qthbyn4wb64oa8nd19lpb3e6kivatsgsjo0xxby2r9ckmdl5rm0flazpgz0ib9r483vnca178rb79x',
                startAt: '2020-07-29 01:24:12',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'o4s6f5eyegj2n9ltq3qsqe6v7xfnvrtb3zumia8dvdzidige2j',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'n3dhzvgy0g8mlqyrx13v',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:40:39',
                executionMonitoringStartAt: '2020-07-29 05:41:46',
                executionMonitoringEndAt: '2020-07-28 14:48:21',
                status: 'COMPLETED',
                name: 'uklg2y7vbrye2n4ipes4lmd670rsuvcx5o4f7d9hwujnwnbv7bogekbkiiulwbtkti92zk7q25h3jvo0qqkylqpub1f7wbgn9yuoclaa8g42kadlipygivjz2af04igkcn7z7xtylzmd87lhigua5km78llxrzqriomp0itwzs6zqj1fbkqzd0uicqngmvg2o8gxxuwrevbizvxaw52tpjejnmpwcpr67v4tvxyj167y9chxezj8uliwxzpvwu5',
                returnCode: 6849575695,
                node: 'rj6xk9ae1sxtzxdgjoats69s6ca11t7c24ci0w0xtdpg0r0nwcl5ftui7ujug53mzlcvn7bnzicsiw8f76s4yt4vpd4bw7m6qpqt18rc6c8jnaxlq5rlm15i3lfo3x1q5g64s1kjsjnzyhet5v5wszy6mr0xknft',
                user: 'beprmfhbf427otfgyej8oych5mauvgogtv3ailsrko0otwlt93ftg0kui4p10orzc71niy0ywt42nhzu07qdsee5uq9uaa3t2mr54hep6menr6gak9la1915b16pqjo4mkcuguxjwrhw824xss6jawhtfege0hpwtns3ujf2f4yzvqy6mtgam15y33gmpmxxkxg6psnuivj1wy7yqqin97lpse94fsjrcpfc07pkh2pvef8ntbo6uk2butkn8ge',
                startAt: '2020-07-29 04:15:48',
                
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
                id: 'y60y4ruea7dcixjf5rchnr0yw6jbnrpeo9wu8',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'umun58w74h1z514effoh5vatji52635e5x1mdnzwjl98w06a4u',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'cdn2zp09ulsiexb83pkb',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:20:37',
                executionMonitoringStartAt: '2020-07-29 04:42:05',
                executionMonitoringEndAt: '2020-07-29 06:37:16',
                status: 'CANCELLED',
                name: 'gdcd2o7j8tec51ov12w7vq8ney998xqxipv6gsmglculzk967892jg079hbdummyk5dh2kxsxgs6qw9abahwzsjop9ojevnepuw8vfwy8lc51u35pz23d6mu1y7cgwpiv8pl29w3r3igsdkj8vo7l5puhniontrzzg6mdivie7v1b07jcofzbjmar9dag455vc5lyg9yl7c4xkiys12jr7vgyde340t3ebqhdlkjelxc2axrhhno9074v2knlts',
                returnCode: 9280052575,
                node: 'w6rr0x6x7j6nhmqm5e21arl7ca2iiqgc6mr5ksa9wciu1o7027o8xrq3g66lv953dnmhmcmijptocmd95dm38qxqqek9whgv6kpmz4taocn3j1mvwtxqidf0r5ytwpry1gnarzdu5bb506b62zr6j0faeb7w5yky',
                user: '1kcjnd36frd0d8heqp2x9z5a7bokbtnky50kxhkne4200o0gci8xv27oh8kvtwzhq0x4qa9f1axj5itmutu3x4xzl3xr99dqdczc4fbb7q8gqp3q7yionfxfn9aovcica67n85tw4gyi41ih98xihmc44auc09nzkxm5o3h8jdrm7b9qniwmkr78eew1h94wxkbivlvgwxevlmkgretppbdv11stou7ftwqble9yubmxssd7m8om7hwpkdnfzl9',
                startAt: '2020-07-29 04:06:54',
                endAt: '2020-07-29 05:00:49',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'mryxwtjpt2zbem6c7v4kdwijw87l04rxbji01',
                tenantCode: '9sviikl4eysaykpsre0d5or6sh3a3qjbost98e5ve8fkhyawa5',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'lxp6kj2grcv3bnmftrwi',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:43:22',
                executionMonitoringStartAt: '2020-07-28 18:35:41',
                executionMonitoringEndAt: '2020-07-28 19:59:04',
                status: 'CANCELLED',
                name: '0aj0xaq7vwguca43ze7pk5d67vua5x1pey3yno50szsh7gdxb1q4fvv77e9tpvfx4rcj2kzovalgw2togg99pepguj62pa8g1bgpurfd24kuvnxm07ogrk5g5ofhjc77cxkbuozi42noy1938iqdzssm1vk5yc34vt0sv8xnxwmca0dcwgviandkbhg1n8hoscuuounislwb03uayr88kp3jvpi3qjip6oq6mp8gqu0u5oz4wptzyswolll0tlh',
                returnCode: 2183982534,
                node: 'na8w9r7vqohtow228st9ht53hu09mjlauqdnl9mtldsx2zf182s2g1mcp9fgih1a9khgbwwidzsgqam9kvbdrvwodtyeh02arxn612qhml28kpo4ibvhqxcw7x1xitp9didp9w7cmtvchn0m8t3tvsco09ykfxe8',
                user: 'ivx9n63vv77bon2yrkme4q8d6u1ggottccj3ccrnolh9d72e839v1pdiupttjjxxo2vgueyr43x9xa6izy64pnocrfjmcwn651r4c4t7t87u4n8sjl0i8005wcvoa2q9gwxsliar2dzw4q3iq60bhep76df8rqpa94kleuvaoe1bc13zcokujjhdovvteeojb741paydjoiyduukjyhwe2itxsuwp4x4sxfmi438kahixug5olvwjffwvyz0scj',
                startAt: '2020-07-29 06:27:02',
                endAt: '2020-07-28 21:30:28',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'p8b7m0gsoyumwjckd9xkfn72nkvx49z205prmjivoosw56xg46',
                systemId: '5rklamv7dbc9dozphv7xblyzk7b8qvplsdzdt',
                systemName: 'ebhcwsww1pgjm0p70u8k',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:47:31',
                executionMonitoringStartAt: '2020-07-28 17:09:21',
                executionMonitoringEndAt: '2020-07-29 04:27:11',
                status: 'ERROR',
                name: 'w57hwsiarjcea19wakmkw7imc6kcb15a349ka9chnm415gxbzoqhzs6mwo3f3k9ljscjgraoxm9g4ps7ucbpduj2nprh1wkzl6auju5pwwmxq0421fkefyfprbmspndvh4tislsylfiiglqnhq5444cnhm20t229b4e75satw15goiafdvyws1lrgl362b8qj6voo3yz88mfixin97v9lo0xcaszfp6jilcga9kdohv7wathdsy21n0786eprha',
                returnCode: 1485815329,
                node: '9vmi7b44f8oerf5q0ki6c2ei8tskmqjl5loqcxsn6wuyofk75mkuvwmetqe88kkd2zi2yi3dic01qpvjw8bkdu4j2w32aeqm6nlqmbz6n74ogsmfgcfmldui1ihdbpplntsma2gy6k61jj03ctflv279fidw2w2n',
                user: '4tfpiw1lr3e8fwjmqyqc7i8f3ir7o656l08q6pnb56rt3kdlefclhcv27g6c9f2z54q2ca5qxluincy3cosu0hg252jl1ewa584ram6a0o4ufo2bcezfnnnobufk0wgt40bwrlritlai9xteydn89egepe2pz4ou5f998ujrqldd51kej6m356ziqgdmx7d64mwu7xzt9arhc3bpxq437wi173tx7nzr6bgqgv3pas9uxxducbpktu1o03l1ayk',
                startAt: '2020-07-28 23:05:26',
                endAt: '2020-07-29 01:03:05',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'b8pe7xh6vb9unmyoe9ixi6khd5eok2ax3fl84d71gnyvl36lx2',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: '9hjgwr5mw5jg1m0nga3f',
                executionId: 'wqlc9z1hln29tzsk9uxnuau3cnckluwbanqpu',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:14:33',
                executionMonitoringStartAt: '2020-07-28 15:13:51',
                executionMonitoringEndAt: '2020-07-28 20:13:03',
                status: 'ERROR',
                name: 'ei9yi7b02v7s99sjlv2a1oo99bkgrgc77wigg2om4xk57a4mx62jabfg55wrfmpruqeoeyj01bgf82jkerq48x4p0yoa2cwimy72errxcoxfn6q336kofq2d79c11x26gbcindn8u1sqbhy982dnbf1vll3jm4s40dsdmb5jy27rk4yhx496spiup8qnwgks7ujqj2rrdtqqwa9ko670kmmhkwll4wl2snnejgjiae4keuur4e7ph4rkozypg1t',
                returnCode: 6144315890,
                node: 'mqzy3nq3312aki666va4sk0z9d9uabrwam9v9s4wdly3pj4xhc35gidmpnh6rg6b34h4zdwibjqihgtrzin70qe6ljkxglyvykaqv6fh6bu1j2i6hz9xm8rn58qn511qdsagi8mng26hljnov1xtltrdle9ogvuh',
                user: 'txukui2fnjfiyehi2652epv5iiv8d4pqn9cclk7lcxykpzfe5afbvmnbvgwzvpidbayqscbs94yg5thxaf9fm6t4114h5e0zim4jutj49x4aceua1nz5jvwthkqi4m2ql8xc6vo145nqo5i55vcfilnbihrwt2923jcx8v6p7u7iy9vez920812hi4xg6zrvgdpx10o3uq83hdlz28r2wsm32j0y8jtefm7gasoyp9t0l56ac7iuwavogqx5sru',
                startAt: '2020-07-28 17:03:48',
                endAt: '2020-07-29 12:36:09',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'l8rrigfiyk0f5dn9ywb36kbm4zcaet6obufo3mgh99k5o5y84ei',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: '2hi2gjkdapjzusneu2bl',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:31:21',
                executionMonitoringStartAt: '2020-07-29 06:44:37',
                executionMonitoringEndAt: '2020-07-28 22:46:21',
                status: 'COMPLETED',
                name: '5f0kr0khk01fkwcll2zixv3kgdmjafpw3rbhx6uautbc664kfo7wfecvyhtftmshloqnszvwx91rej2hmabi8oqjifvkdw1btmq1m5zbhti9ab005tea427l7aknoluqjlhggyvnclfjaujolet1dazeblb02qaakcl6h0jtf6dwrq73xlwdk11sxqmyeoykeq768c1chgvflo2vgbzoag3qol4qrphu7hb47hzb3pwxlumm8o5a04kxvj492su',
                returnCode: 4843732331,
                node: 't276e8u4rm84o5rzmsy3xbgd2532a1zdcvopydl08gt5gl83zq2el8w0tka7k17env5tn6pwfk2acqi0lc5ynjoqdp8zhybkbgs25d3qmb8a8cdas0jzjuypyjml95qckinljaibg3cwif89ibm4cytmeko8h1ym',
                user: 'nfby5311yd3pvsqw379dr82jgpo3pe2s2gs03gd5f97960blz3wj7ar10qhqziu6b7q6v9kwhqfk3ejjty1e95uqep0wemz2wa96tvgymaj3y6n52qfbqkomco18m69wuj88ndxxz0z9fx2d6b9p2ev80sqc2bhl0x5q3z0o6arqefsp414mj0zt0i3luuh4f9p5r5d338edvlzqpwztx1u8k36p9d8nt4lkdfnw5jeuatxrn75zk0s00qp3xqc',
                startAt: '2020-07-28 15:25:24',
                endAt: '2020-07-29 05:08:33',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'z5y7asf2fanju9bfzssc2dvhcz8smzboeh1gmultm53sybi6wh',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'fg4tevwto4p9rzwtrpd2u',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:39:59',
                executionMonitoringStartAt: '2020-07-28 18:28:19',
                executionMonitoringEndAt: '2020-07-28 16:17:34',
                status: 'CANCELLED',
                name: 'lhh2an7ihuuykmp1nq1yp98f1q2aaidq5nqj8ms6mt8guh86rpm815cf6mcdif33r616s9b6fyqnfrbdjhc2i84oth6wqp5ar1lo5nhzoimdavlpl3mbpbzkrtu9p8rgy8lkw5osej4l4ci5ifge3cdsj31iwqmcyf87nh0lj29yp7sd7fv45a34cmocy8nrvwgsytge62x6m82fn1y5oloqvh3xswrt94hfsbcijp45zsr9hnpshdbj07k1it4',
                returnCode: 4510437811,
                node: 'vnr0f9gxeb4zmam8zcme3gjt24ttfc3hvf817b798ktq27v0ma96phys80lqavs8jx1zwrlnb23loz05r8z49torwy21hcqqybfwlqg5upn445wokq8zesrfng8r7ax6wghq4c0lq4it2m6v9rdb6rzd3m1i3c9x',
                user: 'faqdor4ewchk0ovlh60tw8vumpx3szpdq1jsqqtx95f7ysfigqasjzq3bamch2u4qspiag76tqd3l13qu4ao2s5ghnhm6r74jiixyorfd1wdqm2hswsrv94n7vsn3x9gb8tcjtparc5jtrj891uyrvta4sm21lbdllawt90muno3iyu9z3aiadtprl9qczd3wrth6fphord205w4kmc6wxxgy58ik9l2gae5ypuxfyi1n1gmnrllh5cni6om10z',
                startAt: '2020-07-28 14:07:16',
                endAt: '2020-07-29 01:59:24',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'oiu5v85wirjb8i8axv0xl343jx08ilkzx6340nwun8hhib8xjh',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'tnjyyhb9snz28v7bvdif',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:44:40',
                executionMonitoringStartAt: '2020-07-28 17:58:24',
                executionMonitoringEndAt: '2020-07-29 00:29:23',
                status: 'COMPLETED',
                name: 'e2te4dq7pq3m7goy30csy1njmurdvf25ci4rpelfwpe2v7296p4s1f8fhprz4m3vo2zso5xgotbwcm5wvf45thc3y7ngtaqwpii7c7jaldsu39p9uwwx28c5uxujus0lh3a1wv5ejtbsfr430gqhukdoenm24txmrmko4xws5mhbi8zdbrltiyzloi749gk0tf8bndm51p1bgr8kt9e8nr56wyicjqx1z7wnwe8fhj2yns463ewptcp0daujeo5v',
                returnCode: 5789193570,
                node: 'fshme570v5cpdevr0hwhbiq2k12k2gtr1d4el8nztj0yl16qyg5832ld6307bjg2pklish6rclyx206skfvkxi98dzve808ix3tup3h77wsr3iwo2dk5fh3yi9ywnn0f8ouijqcxcuhii1rtvfigzf9oqcepxp0b',
                user: '7s9h71fmlpr4h5e2jxkr7kdrbstisjo8f1d6sm3w2eai5sul11kqecfo1wdkg2h2v6qqjmi1m9r0lxa3g0u0eyxvle9qcqxd4xek6b1vbxjbnum8ikzb0kgjaod34ptvmt81ncal7pj3gvxrlebado86dj1eoehpf0caf8dpwcl99qlr60lj8cxs01aqqiauwdxucsk5l6x5n3iwokqxq36erluyjom38n1lwcr1lnpbcdjo19idu361ltoqmm1',
                startAt: '2020-07-29 03:35:21',
                endAt: '2020-07-29 01:12:12',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: '7lx0tbzmrrhcethow6z9qjkasnefpbbn3u8k4hdvkvbqjkyeez',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: '2csabr2yvbf340uqbyl4',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:08:28',
                executionMonitoringStartAt: '2020-07-28 19:00:28',
                executionMonitoringEndAt: '2020-07-28 18:16:37',
                status: 'CANCELLED',
                name: 'xpgihyfk4256djlqv00bhr60rhy8obgb4k55e45un2h6owhcunyi99jpcma8nhyqs92vzev8oyrrb8xtmnpww8wkf7je79x13u2fx0mgp106iq5a2stqlglq2tg5dq3bpytnkq2zdwl9thtzn1k4abgjxg2zplhluk79ddo2g6lpi4lug2bd6wdcf8gvrvuiizwxjwz7pjcqscjcb779eyyuokhxmt7iwnmh1mzd3qa1qtogk47nbyje5dvajq5',
                returnCode: 96895620011,
                node: 'euc3qphkkr3w7jplaxsif8y4ebcl9yl1lu7qnfx8h2k8rmecacj52pthrc3pwe86sy4geys73yucdmsblnspjb3ede42i3lhypzb6b2z3votq16pdtre4wytowxmzosqpo170994fmuw9yogeyfyzavyxuirshws',
                user: 'nt6zrfjyf0qg0toav55fi3h6w45x7c5xyhs41ozyqxu55wnklruahr6ufddbxt7dhw0gqfyn9lwr1g2hcqr67mjexxld688907uh3lgmocfppmdk93yfeo19d7otb2lw53d0650f9kuk5oe37bpymmtktfn6se7eay8ny1ri7pyg4nub8wsewwmsrxg6rjeo0ai4nr371h0ym8rw9fkuezcad7ix6f58mh0aieihwmguoxpadn0dyz48hogvo43',
                startAt: '2020-07-29 06:04:41',
                endAt: '2020-07-28 17:15:40',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'sx8ku1sl8le2ly1z66hp4ftwlgfpvdo0jldu7ajk2xisrmdru7',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'dnfo3v0o9f7iy84xtkqm',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:50:19',
                executionMonitoringStartAt: '2020-07-29 07:41:58',
                executionMonitoringEndAt: '2020-07-28 13:19:47',
                status: 'CANCELLED',
                name: '1n663pkotaryfvfd2wisjgwz9p0okmnt801i0hs4blp2b6hcvt683t51cff9j8db7ux2mg14makikvnme36nfpfmzm0d1mg2yya0jdo2vhqxqyxz1jldthywyzq9zdg025rq8awth5lhibbxm6d51myioiob3tonjhd6igzqmzb5b0rswadut6nrfwvj0oyfsgibq61uiv543mp2b5vnhcd6cebt2pxasuz0z4v78dpwn6vxllf9hw8dxurbqm2',
                returnCode: 2787585247,
                node: 'z68ipwygznlp80nw61g0wqofy1t6qmqt4ru9wlvsg9r6ounbws5cz1feht3du7t98n8ltmbr4zf5cq4fabr8xoxylxokf253f48h75l7pdjhhzgd7f1y7pxo7mwyhwdqmax4tneb5boob1t9k45v78ry2zntiu6tq',
                user: 'ww52mjuv49vxrjxvkhxp2982w1cqv3u0gmosr85awh760gsaokf64379fjlubxd6y1s8wlxi3rm9k8s2j9q49clcqvcroo38cwyfulwqah80gao6hahl74gz7z5cfum7q9drzsqfw5e30pl1ahlz4o1udhn5jz971wk5yieq1ysmj8283z8glra59purbxgicmpcwmvcm1ubjiajd617gb0ijtzmep5ss5hm47ntd8tv3ugiu2o6ut3fwht7qwg',
                startAt: '2020-07-29 06:00:45',
                endAt: '2020-07-29 05:59:36',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: '6r1sij8ldkz6fqfe9n5h398bpsg0kreaflzjevjr7ac4wih5zz',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: '0r7q408t0yg61mz172fk',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:14:47',
                executionMonitoringStartAt: '2020-07-29 12:30:29',
                executionMonitoringEndAt: '2020-07-29 06:35:20',
                status: 'ERROR',
                name: '0mdwf00fcnm620jxao8762t96gymd2qq2ml0q9yih7veq51re126dxqvm0p83tjhpy0h4f1kqeuzvt649jniwlvezqksqh59cxvj9m9rk1jzxo98x1835bp5rxyehxnbj3wtbh9r2uea9drjouhcsjlto2fo00n2urao0t6gefs76hucbdbk4dvnplc6f216qbilsagb895fqnivhb8oq2opxsqmn8cny1l82itzk1kuajad32d9wnhpw66cht5',
                returnCode: 8622259291,
                node: 'in3ziuoeoi75zzhvd6vv94cdww4ujf9mkv9kzy6d18bzj7rwl2ia6ti6omjj6385b9pdz6qho41ti2m5p73dsyv49o99rl9wkxuw7oukjxhfx0jl2m8cius9gn4rjporjxs2rfxtj0aw6qdql7gxf6ng1wrvdppe',
                user: 'e7yroypmcc6alzavwjyfdvxm9nila2fvem4n1nd7p8wf3a47q3f4kpd9xky7grlqwibkzgtiletzpxm81hrtq0htyddx4w7756lnbttzo1ag208lap55gf9ax18vzw9apy44fnvbcw7sx1n6w3f6u9pm4k0clsnxtb0l4ztifitnrxwxz82i40txlz0ffdhkwstkxjh2bk0rsxfqe1yjm54c0xz01q2136pz01pc4eawf2ggzwugxn508a61imew',
                startAt: '2020-07-28 14:28:01',
                endAt: '2020-07-28 15:50:26',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'jyb6yp35rkaw4yqjvx959o2o397apq1u922ovkk5wuqgcsbz3j',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: '35j79u0hw3i6pf5bvs2v',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 15:35:46',
                executionMonitoringStartAt: '2020-07-29 02:29:46',
                executionMonitoringEndAt: '2020-07-29 02:42:52',
                status: 'ERROR',
                name: 'pxs81tir8cgaisdivcm1h6dl8f7sgqpv90u70xympnfjnzoa2pgfv283ms31mv1ywwf5ql9ayr9ens3d4kzeouk1vachnste1hodgpktvxzekqqumt11mc5jaobp0dx49y5c449mkrir9nqzv5ku1sdi3g8tebi2qtj72e77hwrucpjv4szj5vizzj8dsukf8k4qhtg8riq9k26p390pi2c6yej8nnm7annz2q5zxn0u34akr4lem9dquban92o',
                returnCode: 100.10,
                node: 'yw1b2qra9p3u086dzwu5mbpl486tx5wnoroe3wgjlo5newnaopatp40expvpfml80qzxmssaxk2wnria3kd2u6blq9lftf00erox166f5tj9jfyhfh24y0k004n7gwacynqgg3hj5pjykmlowh5gggx5k88lxt4l',
                user: '9ujjsbiuxeoyn07eptqnlj53cus3f3vbme2cy2janrc0h9w78gm08a4s1y5iyoyqvo307snxkgth66k6enwt91dchw1p843t6xs5ib8cn2sl8lwrh1mkl13nnnbj5g5d6oscrba6nahrzgpy6af5nvxt1g6j9v3up098q9pmrv1oaew15h1f99tuxe8d9l96j36fl9n2p81wlznlrb3h3ybp9zvulsa2vb1s4nlyfmpd55vi6dujahmkk1wfi02',
                startAt: '2020-07-29 12:19:24',
                endAt: '2020-07-29 08:12:36',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'ahy8ty7fvddfm9osez4j5v54hao5m4sgvocazpeq3oay7twinx',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: '5uipy1reia4jcu341wzv',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 18:50:35',
                executionMonitoringStartAt: '2020-07-29 10:49:00',
                executionMonitoringEndAt: '2020-07-28 14:17:12',
                status: 'COMPLETED',
                name: '01vv0hbu6w9jtt17glc2sdoegpab2xxw369nj5gqhlornobeghwqmdutojq78vx3ayq5hhxt3qtgpa7zhykyv3edhtao8fkvnexk0t9jiks1wl2hmdeus2gcvcg0rgml189ii8twpq0muhlq3dvtc3ooemkvhmrsxwb4t2yh8dwfhl99b42x5dfp1qwv7qux2ceaem873ngugxxv5ia1xxmfuze8e6w8pfud2ljpwfeep8xzk6w8jvjt5m0oe5m',
                returnCode: 6405832594,
                node: '46ind2yx7i7rrtetf3co9l80p62zf4pjtgi5gijihomsw025hl8c7p0cknamn9924fezfub1qy0jatc6fslyaa3ql0zkpj5n5mezky25dskla072wlcap2iqx6h78w80wtw8enbjcf3lnn9nis680mcs3jhcdriv',
                user: '83sizddge1uzewol1qomv1d7675gzdox4t7o82b1wqcfzbfyn76a6cbh63yiakz1fm7ai603ae180xrp9bok0tz62wg2r8igqyvgkuq0kg9nuceltq87hc9y3up28pf34vqrmlzdu52o749q2e4ll3545lfg8tuern3yewf9yz07b6nw3t22eda0cg40k4bl0ru02r76pw9anyio8wvnzb5df3zxl66qkthiethdzqoaje8n32t7y0u7yewjz1x',
                startAt: '2020-07-28 23:03:34',
                endAt: '2020-07-28 22:04:14',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: '2s0j3kklen0e3v1r6tw23fchsn7sdhwhc11855e8oa7yvp0gal',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'u2n42xfnnyhzxjjs21ea',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:56:20',
                executionMonitoringStartAt: '2020-07-29 01:05:55',
                executionMonitoringEndAt: '2020-07-28 13:53:16',
                status: 'XXXX',
                name: 'mjbuwm3hxho3qmrfpzkq9g0wy6i9w94006yf67llpt9v3t33u1b6eumb9iodt4a5u1wizfus3ij0nospqgug6grweqm139wfx9d1qiv37dhjnho5ixzn6kho131ewepsu4vprwga6v1zuqf8pqzy5qjglf2cknlm0ufzac9c10n4srf3hry4we67nsusb3xteyej24mlmlplaw3be3hter64nivlfv8imkcib8on0rp7su2c2v951gfopvjzsl0',
                returnCode: 3061565786,
                node: '5vrueylnfwmfqurwlfkj4ammsojp6ekqb3jxist4v1m1koc2yug9r4nwde3sm9sgz6u6o3iv8jobsiumn4acqhvc150s9rgha8ywa80bmpxfsaioevan0va9kjkwknb6fu18ebi90072ueao4j2ksfqb5ox6xj4k',
                user: 'kkhc9hyqlk7sp91tryusruww52caey4e5wajnsevdfjn5zu5i3f9p5g5ksahi3jkr3zz11aq04qkiq3qmzccqfvdplyk9fmb67bph1sl4hayhstu9ok3sume90gz00wnp4ekywc2cer53mlxmtcqeawy4bq7qi58evuub48b1tem4dkji3gkqsc0co9fiylnp9cuoyvs4njffs5gfxga5642q237xbw56j0wzeykjxaqx2j90m874gs14f6541t',
                startAt: '2020-07-28 23:21:05',
                endAt: '2020-07-28 13:59:59',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'iiafwlkb7zyhr1ebof4pjht13n6253jjkh8q34y9rro1nn4amh',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 's32hv98s4j5bw2o3ei6k',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-28 22:50:49',
                executionMonitoringEndAt: '2020-07-29 02:57:07',
                status: 'CANCELLED',
                name: 'jx1czaviafcyod74or1viqns8032q2jo8vxsxvk9hxglyfai82cy0our7wk3udk6xdituv7qiofe0bnxbwq0cj0v3o945uuc708b9wr3ubi94bsnwyt74o5np12a8we5ojlk5gk312s6h7lne7a4laep5n04yxyi2c7ggxopm8jdm95lb7ojeh5n08l3ulscs7fymxp2z9vsai10lfex4epl4wwl44cgl4xwfmfuitjay1ddp89g3vo4khg44ll',
                returnCode: 2443468738,
                node: 'ba95b35xdsjy76onyckb4xoee2n5bg2bz0ycv6u0shvwjmmp2tbllctf47pyxsw8022i1cdnt9ba38yrmafvqmcjxg321fbc8eoi9p6ky0djjdhxlra9hunetwpxz2v22yvyece5t4s2uf7szzd3wcj3xnqryi5n',
                user: '5t9bgxworsatwizwjuobh8r7cz38wydo6c6e2t80nlirmaixxt3hhxkqbzl8k9uthkh3jws32a4ysarayuxha95k6sqgvaupnk1mm1bei77c21v9pnln1m7geaw34pbmnqhxfjca1ts73yziv0ezs69dqrv5eruahdxoo5nwxg9lgj51soob1vlp3293qpyq8kbih9miskza49fv7cmifacr9chvgmcn2zfoi0bkgslael7tsqvc1206twoo5i7',
                startAt: '2020-07-28 20:19:59',
                endAt: '2020-07-28 16:34:19',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'pdulz9ta3a5z6ib8ig2r5bb02h9b3uwakcju7k4yxxkj0nqvqh',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'rbagmj0wo9o1xuepqrun',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:37:53',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 04:15:37',
                status: 'CANCELLED',
                name: 'to4t4m4j4ozjibyy1dpudgxsqfyw2xun3f76uu7ovoxzq3u50odq4yr0jzbuhkl7nawg6bunf10dsvej9b7mbi9ge2zcun4eq6xr7mdea53htxp1axgh1j6fhf7u7ngfwcjmm2qlx7cosp2npup28qsv0ckfi8qqx9obos6di7qjig5ww4tflomlr6974fxq4go01qp7y6eb25hzk0o0xxkgv145nhww25wd78t7r8lzzfft4eq8v7g8xahcm4u',
                returnCode: 5227570338,
                node: 'gqls9wm27rqy6n1wi4989ubaa0pxp0b8ebtv58k7mbdrlq2srpwmr37wq6mswl185xufhjqb8y2pgqq3sq7s8l27mlb6pa88y9jo423ifj8pcwjmrw8w636zx28nfd2eq3tkijh1jvq884lpk5vuva2vv6qbv9we',
                user: '9ojuadpgntzmko6zjl5zyjv5hgvo2pbq4p67swt4zuk4v6kgl3ir8k1r66crjsuuaieggv1prfimzyjci109x26zh9pdt5ujyvay2yhhqsrtkqe8cy9jtvvht5lvxeuwmmtvaxpgg1lzmz513b0ty115bma57v3rjfd00zuyistymldwgj3jixjqm8t4grpz2hgm0ze3ahje600z49tqdrhqt43ue4f0047qdzvwd6rhr3gcfpff7mkkn0k9kwh',
                startAt: '2020-07-28 21:04:53',
                endAt: '2020-07-28 23:33:17',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'yobfowovx24j1toltaetl13wp6pqmx235yqv1bv4xwdobfa8jr',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'kztu9zpa9qiymt8r5sjf',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:16:21',
                executionMonitoringStartAt: '2020-07-29 12:20:55',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                name: 'yc1dmsetb0fpey4i6iv8re2f93o7dut6aca7adt9t7ypeoavgwavgqygms3txzeila4bt9djwnadnr8i6hrg0js6ddb8poxyj89a6ga2xme7kydyts3h6hg90t64jkg03xr66tmmccat34iiri00tq3h0lpocdofk3zxp4fn89b7r57clr93uibh40nmyjrfehusn580bf3cvupcsd28g163hw6rt4sndzej05cce7lootc58la6slo2dibq91b',
                returnCode: 3869956098,
                node: '85zwt059q0voojqwqf43ovq79ze8viqh6sf666l0jbl2oxzgw1jknom8xekygzle87nkv9txol9jkmezjl60b7w4h80ra76ukykbdxj7gcb9k4byjrjvdri8cy2gg38fx9rebl4m2q1v6k2b98pd64qwmgd9kvif',
                user: 'yy7x5lkxi89nj2fyocyp0rpbm0imv1h0eb504cii24evr2gmfsao4gee0nvmvkyhmwlkwginjyf02siar3g4wt3swfyc6rf13msnreoyer8324bb8jc94vcrp59gqdwnfl4yj81qwa29llddd6poi0cf89qt78pj35w15f7sqcx8lg4iy7s13r4v07ek4fdxb345kygge2czzpev8snuddvq4ltjiel3y3dv0wl87orzt8hl5jul6y6h3trvhp4',
                startAt: '2020-07-28 21:14:53',
                endAt: '2020-07-29 11:17:19',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'dw6sm7dfmx0uiq28s3clar82veguoel2rzra5eqemjsy3463q7',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: '8lcaz6tsq0n3xybofeuj',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:22:05',
                executionMonitoringStartAt: '2020-07-28 17:43:54',
                executionMonitoringEndAt: '2020-07-28 21:09:08',
                status: 'ERROR',
                name: 'dvy57e12t2k6tb8997bz80pj4r8fbkebiiprbi4lgwfb7ash5ito5hhd7g6yyliwn91okpall1pnqmnctq3825zhsfto9xm3mgck7onudmrw0gul8y3uvkz7n4h1um9xqpssqhhxr8gimw120gdjbgd8fhwt869eop2t17sze4znb64ed8zrte4tt23xmi5tu9srmip4gwcavnfkgom4vyuk4e6cw6eteaffode48mje7l8a9zmhxmon85ljsua',
                returnCode: 4307958288,
                node: 'ldzo4eh55o4aam6wubrdpiy3qxoteawe4en0hg6rj69g56uqikwlfvk1jxf8nsb84wgyr2zrf4ooy3u1tyyl0if39jfta2jv07qe7ne33umhaasueh6rfuo9xy2hhbe77oknm2f54k8izj7rrzs5po3qhzzcdyqv',
                user: 'a95b2u5od3ly3wshswe7wod4sbrzra83jjpgfw5d8rnpm9m9d0h7znh3b7ub7g2iau0j142qwyx6k52agdibvflta8fc4y2877y85dsaluc5la760r0q1fs8hkac8yngjy7cn4wojwjvo0f1kv5u904d0jqfxm3cre6tfczpml1nnrbcwt841l18xbjg6r3gjb5yccokt90hwdoxhwqc2ov164570hmtnyvxjw2y48fdya8r0b227g3zl47vb53',
                startAt: 'XXXXXXXX',
                endAt: '2020-07-29 00:28:51',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 'ct3qi5owh1stplnekxunrjgmceuivi8g1chn16c3gwaxyg7ul7',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'w2lwzx56ibm5v9se3rw9',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:05:21',
                executionMonitoringStartAt: '2020-07-29 07:09:34',
                executionMonitoringEndAt: '2020-07-28 19:54:46',
                status: 'ERROR',
                name: 'kw4n3kgd6i5glh3ktyegxi6bat2vuv0lsp9yp8rf65ffcm6txdc9pmhu7k8xza645d1csiurpsasqqjdwrsiaduvv6jq0tnslyq0zgsrzxwl9dm9db9pv9fq41h1aihdw86wpo9aobbnsgntpfbfee8kw0h09cqaj78o4kwx0va7jkda8lakhb1h0rrua3z2dq6xhh8lv9o5mdxhsxlks3g0dzwncfw0i1qte9ycw7czwabhfeo60dx8qiktk9a',
                returnCode: 5684976892,
                node: 'kec3ms7yfs3kb9u0ul2vh237mi6w0yj22t8amfpo4pds1t4ivcv11yaq5kflifnxat04h5d6b9j7jning3otmrtb534dm262yqy32xy8vsi0j4jjnx48zx1hpytc768vvzbffmmwo5ewdlbe1exmj9tg1m41unh6',
                user: 'c6qmh9jgxjmfotas42ntk51zi1src7fij9lcrz30b93q3mzn5lyb5k4ux4qk9jbtzcv9a7zeu42otiajdflpoc67kug0ou4v6ga6xnmo7pyqr4cul4lx655lsuufrzas1i2kjhzpin87u70ey71gu7f0935o87g3bk2ge9k32k8vy0wuhrjgvdi1cdcthw7yn0atd6ie2mizkyg0o94uiru2osm0n2kdd719docig1yz09gdnaguc3ifdwp3zlw',
                startAt: '2020-07-28 17:11:00',
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
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: 't1lxlhoar9v2t9i3hq6oabiqn4a712pt08orzn7gwg9yurbe14',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: 'qbpxoscuovygjjq0o9ou',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 15:20:38',
                executionMonitoringStartAt: '2020-07-29 02:57:55',
                executionMonitoringEndAt: '2020-07-29 08:59:25',
                status: 'CANCELLED',
                name: 'j3t8z2s7lzzcac3c1sv0s1a70bg9n38w1v474oacbknqw1pf68gz89vh6tiyicuz4gpynxvmymdi8ljb2gi3fi6hqsxrzphkmay1n7sih9pzh6pqx90g9nmbesgb9s5gv0kxk1x23vt6vvibmix8vnkukuu9mz67iisxk5zzr8cn0mg94adpvr15fj3g208iv8eb8s18vg3rsq4ps3nk7ynk0dqsjkqlppvq7b2o4srl3zbalffwba9tcqz54ib',
                returnCode: 4264362209,
                node: 'jzsjih7x709xquqpyo205tz5rcjvpm62znyyt2n6ec325135cb0hpiagwjvinexmrn86zf4nuieyte6pclrf6v12k9ki0r5b393j45awcvn0guippt9dysiiqad3uxhzthbdofgllq2tfx1mq6fd0cwo0sy2ycwx',
                user: 'ajpyn4rtqj6mth1shrpzooapdu4csudem5sfj0ujstfnjoof76phowqj23z06ip6vouspbevkue6eafg85l6tr2mizpul2y7kdi4ba1xm58dcbcrrx9i0t883wv0086ssw70l394ahslro6nzevbsjmdrcyq2wqgtrmghmy6oa72zvjzot2kzy883mcw805xp9ab2i7m3abdj237p0rkcvq5w23wvsdnva6ol1r2gb1lsxfgrwxiby9mcv8z96i',
                startAt: '2020-07-29 07:27:50',
                endAt: '2020-07-29 03:58:08',
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
                        value   : 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e'));
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
            .get('/bplus-it-sappi/job-detail/f0f847cc-a33b-40ed-b9ef-ae3a807c894e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e'));
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
                
                id: '33d355fd-690a-4272-9541-e4ed7136f4d6',
                tenantId: '5620e2d2-0c5f-4ad6-8508-52fc2d16a8a0',
                tenantCode: 'p2vlzkbyartae985th8oa4826h403t6igox449zmis5ak7bjny',
                systemId: '8707c456-8142-4e8e-bedd-d84873832dee',
                systemName: 'gmz7mk9gvryhe8zcbrww',
                executionId: 'e2261de1-a457-49b0-bdd5-bbda7ae87a7f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:04:40',
                executionMonitoringStartAt: '2020-07-29 01:11:14',
                executionMonitoringEndAt: '2020-07-29 07:18:42',
                status: 'ERROR',
                name: 'isc7spgi72rsaza2a1otlgc8cyaywmdapn9r4rw3egdtcg8bygob4n85eulrxzvoby5jd6w4pybqhi4on3cna87wqrqec77iy0ghjgb2psymuuj6ihyhwodlnqxilcbefni8vnty00oq5a63m03e8vcaune4yzrnhl5olhtpmvb6swvy3btd2xil4w9hzg6tc7rnqy2jckmse6w3cg5f343eu4yicov4tveb19ehea9zkgcoylogtdn2eqp5q45',
                returnCode: 9844447341,
                node: 'fdbqzi7a5yzyiedb8uijbe3ok6wv98swkwc9yk3y4m55qdx8u7enffhbeqy477oijkg4wnw3nvs05h0ln54lf2xps65r3440mnm0qwahs2ithsjtz4wpab6uqberebmoqrqt4qutv3nypqhwya8x8wci0ge0uhu7',
                user: '9tx5r4qoz5q16h68vhwzd6z245bl8i7lngcsd57kwsfbfwa87dwdz59c6gy4heis7w21xc5avj8kr6wmekrkll4e0cf7lvum434d9skuvxs7160r88v6fut0b6nobjoo5eol3b4puimtvv9zt7qdo8n7ic0nohjj07qvv54wcy03og4jrie0qfai7wmwfdkx9rwh8bp5gxch3uhdskz5a2nbw1qc6v8bjmuxi2ycjk0xd6z6nl6lp9c9jq9hqbf',
                startAt: '2020-07-28 15:36:15',
                endAt: '2020-07-28 16:15:38',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                tenantCode: '1fg6zmcgkwl5okhjpw6l6vyd02puxfjvp62jtmj3qzfjwn7208',
                systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                systemName: '3ixtrgtls2z1tm1io792',
                executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:03:33',
                executionMonitoringStartAt: '2020-07-28 18:05:50',
                executionMonitoringEndAt: '2020-07-28 21:44:41',
                status: 'ERROR',
                name: 'u9b6jfdqbhhzi87aa317nti6snojt4ki11eancfvlabrkrhs5iked0sr8e3uf6ao3xtzpesw3htyrw0e95uj7oul7x54qd16xu8w4rxe9qdjgz9sjrjs23gaxldobu9v2nay20jv7r9aitmeptw1j4m4frtqsz5mpgwyl72lxboyozc9ohemnafow91znpg2z135z03ju1vhoucisbca9gjhw36e88tr0ksxqwitprgm9y1w1nvqkipod6cxqg2',
                returnCode: 7591622550,
                node: '1e4ksvmg2ey5hv6rgh42zj7jh3py4f389zmwrn798wpsi1b31r1j8c9z9vi5y4n7lcc57qve394ckkg2biq07z30qdpyz300ltkt1omkgkebk7im5gas6pnhya0tb24bumoj9hckl7ayot7jthvd3rl9lfj37a6m',
                user: '7riqw0zxsyarbd86d3zsxw1vu7txolhhhniidgdtu9te562cvgrl5o9l4pmywf5ulsni161rlom9oc608d5pmwkg9xoc7rzpljfcxgyj39dwq6wor1nbwvdw7j9nunox3bse81z512p0ni2z6c611v88dno607r70fkwgi6zrvmiq7opficcdr5qswrz37nfpb7ljkgrin3fgj5j84xc2xxx4pqy3f7fx80hgxvd879zie5y8z5227mn5ljg1ts',
                startAt: '2020-07-29 05:00:52',
                endAt: '2020-07-28 16:34:05',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e'));
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
            .delete('/bplus-it-sappi/job-detail/f0f847cc-a33b-40ed-b9ef-ae3a807c894e')
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
                        id: '2b6ee9a8-7e98-4a93-aab8-eaf5fdecf410',
                        tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                        tenantCode: '55aovzdqsepsmatsfzferafewm7t7g3lpi13i5kqb9iirrgt50',
                        systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                        systemName: 'lbed1a670d7e1u6ctc9i',
                        executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 05:13:01',
                        executionMonitoringStartAt: '2020-07-28 15:46:20',
                        executionMonitoringEndAt: '2020-07-29 04:21:07',
                        status: 'COMPLETED',
                        name: '0q2p9w9b8bbqsljl8rxy7dvkzm29zd0b6l80l6y2hkgl9g8qnczregnpz5hkwp7paubs6iqjm8r69ggnwnv0y94d55zevp8ij5bbamw1pb6ucj4u4dvw2l4lhi8xcaie7ewb14bmexmvxbmzwufj1wqqfol14f8w2b46pfdfi7f3ko1d333a3vfips0crwvvxsq4l17hzqqlcbsh57pdzz3kynfx3tx3dpu676z9kehj2ipn4h4iorfdzrtkl3o',
                        returnCode: 2607291443,
                        node: '8n7qys0i1sbqnwt17ieex5ztb4mg2m7f2j4nr7qzdnmv79z8e02z012cy5k218xpybi2jvyjhbvnu5xlnz2m4f16jemgqlqyf4t8uvuzpczlvc1h10fz9sxfi097voj8wxnb9tucq81y4zue61486xz8em3c4m24',
                        user: 'hkrrquh9gmpybbekzyzo1pwdv4v0ylzd7t7a2s5yn6wly4sqztrwr43zo5xe55mvwpauuzeeal9rao8o7vq59wxax0mpooglvilzjg2d0rkn55baw2109jc5gmxwcmxcgq7j6idbs4po4grcshc38ayj6yaetyqnu11ku4c4u94fmkes0669i6r1aewvpueul5pdl9bdqdjoovyussmlthld4cq3zey3kkrrzhfo72xzkibjrhr45ynf91wqvgr',
                        startAt: '2020-07-29 07:08:08',
                        endAt: '2020-07-29 10:44:05',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '2b6ee9a8-7e98-4a93-aab8-eaf5fdecf410');
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
                            value   : 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('f0f847cc-a33b-40ed-b9ef-ae3a807c894e');
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
                    id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('f0f847cc-a33b-40ed-b9ef-ae3a807c894e');
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
                        
                        id: '60442185-cece-4cd0-8db4-79d7782ecb98',
                        tenantId: '27af236e-5327-477e-be47-39e72121e38a',
                        tenantCode: 'gzn86jsv0yh5zgtx3qlksv9b2puina0nuohx3z3bmava63y2iu',
                        systemId: '8e87d9e9-c88c-4383-ac02-976c98aacdac',
                        systemName: 'e1hfec5d03gzduea02x4',
                        executionId: '8434891e-c831-4859-837c-24e8dc7bb0aa',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-28 17:49:46',
                        executionMonitoringStartAt: '2020-07-29 00:19:58',
                        executionMonitoringEndAt: '2020-07-28 22:38:28',
                        status: 'ERROR',
                        name: 'rfd2xylriep6fkebge22lhvnfi73m5yigo2n9ltt0dje0ag2iw4bi3f0z427j7o1buybk8i1caeabbfix87r7s96ev8fk10cqq28l522lra6jvbkqmbk30f2jpaouxu5b9sf4sff47ppliun6v86f3v1d9pzgdr2brp7ckahm9zhdun9tld3o4j54w3tf4vaqs2r50erm86ovmr3nlkgrrlaem851zyg0ds0eied9c33wrff8vqjovqgm6nbbix',
                        returnCode: 4653704263,
                        node: '9tjlnjmplas76crpjalh805zjzech676chuc7r0y788zv9857jnkruqg46kq767iwjh6exngbuw67ianwuwjkas0lplejoijqukarldbizf2j07kw841535l2iol7nla50ywaq3kti1lz5a6rclbrlgyb9ngsk96',
                        user: 'ckym7quz62hp681xbnn8mrcuurjcu24fgtdjoa9u0g5y2x1lqlk1zldawh80x9kzvlke24pugrusu2utjwvfawn85k0h1916rd107pspumql5wfb8lvhfmlphxedhzdcck4xv84pbaxbiuqq3eha4v0fyi5o93k27meojmfdftoou7x8vmyckqzuamcjda3rn2oy46hcbzvltid3k9jmeerj6y0x2lg6avukb1ywoqksl74gypyqjmmbzwevnfr',
                        startAt: '2020-07-28 22:28:32',
                        endAt: '2020-07-28 23:22:03',
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
                        
                        id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e',
                        tenantId: 'f9e25a7d-03f3-4b79-986b-656d98a9dcb1',
                        tenantCode: 'fuqn34fv84e46fe52s2mo4ycquktxc276vus5yxfnc5z8nwylq',
                        systemId: '5e5a9aac-0829-4694-ac34-9b453b70cb58',
                        systemName: 'i1wqo6j6imsnfg642bwq',
                        executionId: '82c807dd-f496-4b60-b7b2-46295ea32038',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 01:28:11',
                        executionMonitoringStartAt: '2020-07-29 01:26:45',
                        executionMonitoringEndAt: '2020-07-28 19:45:49',
                        status: 'ERROR',
                        name: 'dujk7v1ei6c6dpm2hl52hkoeklc7ddd3akowtiqoak5z94u9vxzs4mt07zd4cfg80uejr3aub07oaxowqj6cfwxxj251stlg8ya96xb9bghur01ya2gv7emraufa5gpzyzj51zxwlmfmev18hss1j61c5bak1pcctedoxtqdat9loxscbhk4ni9hlbtsfask2q275ts76m2ssdzgexy27titxiazt7gw4lrnnj260gda0n35ue39v34dffn01n1',
                        returnCode: 5474385767,
                        node: '0emq09nz2jc2vxh8g5oexu98pivpyrxoic9xv1q3y1qa8qaccdz60wj68av6wodwe641eu45pm5ndz3g28d3f7p3001faja9rb5p0xg4lsyyzcx6lsec78ab2hkctht4jmehi3zmkqkmcq8i06376wdesctda1u4',
                        user: 'y7e99888ry9nhtcykp0c4ql6s54kjav4xqy8fhyftfxjvbkvzb4v5rbr4edob5rjvyjwf7ogmtxr707iifiv25z4nvwweauzntxh6q65cjjjtny5u43bxtyi6cap6rwunxe00cmj6fbghd74giopbo4auznnmk945hu5o54qt3f0xlwsd6cle1gp1fmye67hr71cb8uj1i0jpvkr1oknorzbdr9q5z3podfb6xu70c6a223yburopxtzq695d0q',
                        startAt: '2020-07-29 04:29:30',
                        endAt: '2020-07-29 02:32:29',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('f0f847cc-a33b-40ed-b9ef-ae3a807c894e');
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
                    id: 'f0f847cc-a33b-40ed-b9ef-ae3a807c894e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('f0f847cc-a33b-40ed-b9ef-ae3a807c894e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});