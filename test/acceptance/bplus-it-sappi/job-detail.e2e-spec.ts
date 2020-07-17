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
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'nly3aaeqv4j73se6x2ok',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 07:30:43',
                executionMonitoringStartAt: '2020-07-16 23:12:22',
                executionMonitoringEndAt: '2020-07-17 13:59:46',
                status: 'ERROR',
                name: 'h4rqgpkuszlk8wkocvj7oq5ez19kzwl6v5s0goe97gugqsqkqthdxtjfmvebeqm306t1oop2w5ivmg1uasjdfxx6lmegg4rd66ncw13ff42703ojg76bwtesjl4vr3afbulextk7wf96apu3d1z1hr9hnfpvyerfhpedu5oy3tpwq4aikdc8ry6mcfnh5v7sd0orc2fg6ybfatcpeeyz5vcnrz0j0p3en1d0wz012t2z8tko0vk8dpxo421po5q',
                returnCode: 7351798908,
                node: 'vlsyylnn30t2u7ovo5khvg2dwhriliwve8pnugxy2f6x4du3my5qo239x1f7c5bhp7qalc5vbozrghd8k0ewo7hfftpgkto7ruf3yqle8l9zpckfv0t3uog0vr9ntdgdxcuzfi9d4jb3f3dd3mwwd3kgbukmw02n',
                user: 'b5iazy6kpv08cdx2jfthesonz3jhzvppbhst63759hxan947t6irfx4key0hvnkh45q05g8emtjjkqoqp9lk4hkbvtsve4pz2hhf5jqokyi4khw12cws0bfowmoeuwvejzb1biecmyphaw43jiba3d7uuk8rukgybec89qxdo6wrsh6znpt45keky5ombrzj6bahysgpkndsszsam0c6dhbrkzn7clsnq2tbnk965cdfzh51266us569s90i5b3',
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
                
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: '0n2z1uc5qlrk5k474wni',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 10:33:50',
                executionMonitoringStartAt: '2020-07-17 00:27:28',
                executionMonitoringEndAt: '2020-07-16 20:50:57',
                status: 'CANCELLED',
                name: '4k2k4rp7c1s9zsnua0f7l097oam7e7w1jwfrjdvd0ozaoec62maaansr4hd7cjsyzj17zv727sgp8dbs0l8gntznailv8efrxriifkzxc2rmvmggzqrh42kd0l3hng595oivlpn7xtumflunxuzz0ut2mjd92q72xb55ybc73ygkmzq3tdh075gd0w0on8c6e3ophp1rlcnpsdmydend8n13752hi1tu7e3i01fy0buskwx3h17saf8xbny856r',
                returnCode: 6637946706,
                node: '338yij8ey6nvu9yx52it243r73ncsp5886q1qj1i1s00nf02yt4sve9wuib98d39qtbaqs6gg5sanfqz7g63biqpexions3ucx2gfcspc7tny9swk9rohdpz3p2g6c0dlf0rak1t1vl1zeglp1bktgzj4j9imyw0',
                user: 'yzygtf9btcrjytf8raxo7pst3w2v7e3x41u6h2nginwk4x6jnx4qwmpj30ett8hc1sw952pl2a7k7jogohejwy8o6sdnqq18vll8rw5y6revaacv27h6d9dlrtr6unez6o2wcg3xzw9grn2iiim4uhgm9xb4nivp42py1iswzza4j0st80xchwcy0i4lbpb4rrwlp3jk9y7gq717sf2pjt1p0fuupmch98ipugqziw1a30hqk0v34ai9ru0ffwq',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: null,
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: '8254br16noohij2hph08',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 03:20:27',
                executionMonitoringStartAt: '2020-07-16 20:30:45',
                executionMonitoringEndAt: '2020-07-17 00:41:40',
                status: 'ERROR',
                name: 'palqrj0i6ovhkiv316xaf3tvnubb3jlhxnumx0rqhgo4yf2cp8n5ujcruhz4642i25lx9ncdapp0qp3kj180n7b8uxl60ye5j92nsg1iajx40ne929ndg5mnatr7ah3yrh7lpmnk0y1jupd5ag3pklql8rtlxbmn66z787eg1ghoouz5bitz2gyr2lryow2tdatw8005mw2w2o8zlvhsezcx23dstj22edfvg3aik3cd063ibyoy3qoikdznrxl',
                returnCode: 9131759040,
                node: '18gk7v5j37sultjcuz5gj84854ar7gmxnn3fvl15jjyklitqb8967whu2m5w010k4q4dxej6a849ow8c23wnm97683wwiob9yn5jprfm0pro4u4vunkink1qo640amxri9n0k9rd4eprqlm7qttbgs6z6xm07fw8',
                user: 'e6nbgwkq4we9bazrjaqhgy3fxa29zp7m25h71kiwr1yeg5p5nbk5y39p2w6nhjpeq28r54t79hqb8f8grs6gpzfgtzvmupac8ismojo0slwffoc8boskumuwqk0w4mfsfwpcfs4code4m8bbpngisi095uktdjkraxhwhbjz7t2idmpu1jlrful1ks5etlrc0oqqmvv8reevrksdh5f45vwnbd9z5jzc5q8i3b1qm169b5qrcg5n4ossqgxgsg6',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'j24h0h2rg0e1pogo8kmp',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 03:12:35',
                executionMonitoringStartAt: '2020-07-17 00:04:32',
                executionMonitoringEndAt: '2020-07-16 20:46:06',
                status: 'COMPLETED',
                name: '3w7n6o9jqkplu3o7c3nprzqyldg6f4lli3jowj656mcr8be4az5aef7zv29d8x7jp8g4bmjnkm26y7zma6l7lqql77kmo66b1366b3qvfeeqzz1zrlmoctzbqwcruqdl065j6v8xgb0jeqh0kaz1m720n3jyyd37z9p7ukqvs4mu57e27dhal08nm7e76r7bjz8ei33qv1cu5c8e3l7arfw4l5h9ky5nxo2d02vky6agcvi2pya99rzrx86mpdi',
                returnCode: 9568751588,
                node: 'mpcbcxty68pomot16faec2jwpyl097w1nr7wal75q8vxxm2nwd7qd9qroqe5xxh9h3ahwmbiubeop9vdmsql0xgk1yu0g3h82c8wb5acpu0tv5y39yhtk6euf8259b8xu5mpxydlbf19ea6t50qk95msjlxvm8s9',
                user: 'pjj73e32rnxbn6x4o6bpgavcwx734ihxxl4ars356btkkgaa0c06gx0btdry2t3q7ppz8t0qsdskfmacl4wz2zwyyh87nxjgseaaj1q4qvxxid49i0n6l41dzy6kogsz4lq399k4s0rljhwavi1gsmn98yw3n7qlpg7cl0pgz83a1uttd7xwn8szrbie8cxhw9ukokwyv3pv21d1l2v3nuzgk787o1nmwbcl17b3u2pfpthqzpyslw67gd5lr5j',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: null,
                systemName: 'ikmg73g817fdvxympkfu',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 01:03:29',
                executionMonitoringStartAt: '2020-07-17 11:39:14',
                executionMonitoringEndAt: '2020-07-17 05:48:36',
                status: 'ERROR',
                name: '6kuduo797jhfq5h6ruhqn2dbrtzunv7dgtkybnwosnyctf7t37xlkz7lkv54j6hqr5310a3236d6lc1b6gle67ftpmutg0ixyfjpeqe2h6d2j9o95spomcziejbhxh8vqb32f9c9k1rl1n3zbzlwt4nbnish3im2vzc5i1npf93gptcz3o7rjz7plss1grveofo3a0qa3rirfhncvj2avkitythpnz9rok5b45jdanmogy2e1pjvy2g73r74w4e',
                returnCode: 2571541475,
                node: '1itdsng19fmgccf749hw05u6fqd79tarqf530dmgt5ejxcbw6wi92zed4jwdl1jj1zt9w32x426l6hz9d0nez9yoqk5fz9rzv468wcus0jxmtvhbinkwl3490d86fr98xi991nbwfmicv5t11uf9jahquahalelw',
                user: '68cxa9vmn1pnc6ydwbb9ilat0zfnmk7rri0hhmghut4ilfwt10k02qctg5sxai8eu8k1pvzs2uuxtupjp61dj84a4rat2ipuk1bd8pjw8a5ud2e6lcao0s3li12eou0mamhyfyiofhbtgxyjnxz9lngikjxuoihlj75z5nj9p1sege8kx8i6y65g65xhsb7az41wlipracxz4lhnqnho3ailbuqprayfdhgskgujdvre7umijxxefm0puys4ji1',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                
                systemName: 'ejiy76j98tkgans4scea',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 14:07:08',
                executionMonitoringStartAt: '2020-07-16 18:39:09',
                executionMonitoringEndAt: '2020-07-17 06:41:54',
                status: 'ERROR',
                name: 'yshs95ufu8scftkv87ox97g2e0wx8hgqmosubx4evjhb5jdl3ml8xocgh6ne7pwyjh783qr4begp4l8lakyvv39s3y46mtupwx6kvhps2l5kv4piknxsgj8f766bumi06484c3gldmieuhs0orxn6fdlu5ugqmuqlrsmccw5d41gnvglyywgvernv5dj80uf6namypt86bpv73hajdsnsoyb27c78dpw0zkhf7lbvzij6xqneorls4lscalocgy',
                returnCode: 6545031556,
                node: 'xf5ou803hjqj7ipd1j64neyt7b6k19tzbmgt4wk7rslianrgm7nvzuyz0mwhexs6ltsj4pu7yenyj7p5h62bpvkvwr387grp2x8n9enop9a8w0mgxyz6v94s9t39mm0pe6zrb54qalh602iu1trghsm1y04clhkr',
                user: 'ia29n19wwlhgfiplpdo9sna82dxewrzh67kky4tmsh0ubzwykpzacp4lqq6wilwss5t2c9okli26fn9wccqdf3bueiwzcg1pnths0689s4r7hofddbadbstxrdw2m31f75izdn6vy1v8xhodsqownl1sj2tvlz2umkc9c6dfp6a4hyh5mpknjp2o7f0yumf5obecth4s6rms7s2oq3ma0l15ix4pw2ggmolejmcl8ccldz6sq1vmletklitinhw',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: null,
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 04:18:37',
                executionMonitoringStartAt: '2020-07-17 11:02:26',
                executionMonitoringEndAt: '2020-07-16 18:44:06',
                status: 'COMPLETED',
                name: 'yug0r898yv72nn4zj0k4tdwovcsl6wsnmr3wtclrcmfk50nfgc0i38naqg2kqxx82tbweiz16xbl72bx75cihtro34236r9vjyphdn9kiev1ruvvoltzurb85a2x6h63v6z3c2uxzimfrz3aqw26w2bucudug44s6pm54p8snaggvs58opvpqf51n4ktcqtnwcz2skrde5tc1vqexk54qel5f16pgzu2kbt1geb2mhk7k6m07udqo02nwc0m68t',
                returnCode: 6863865164,
                node: '67ehm8dljkjaqsmfbffskqkseiqol3g9bymceoopf0rv5nzch9bo6yx43xv7cp6b6ap59cvunbhq3csnvxs36789ivqc9fxdzikg7ykasyifj5x8gsxjn4rqpeampjscfdbsbjdvgvesc7or7ckabfew68ov4v0t',
                user: '786auc97hpg8j92ep35u20bsfobp02yd4m0pva0w8ji4ax1sw5yid3gzg7shqqxf3n7wsrqd8dc0suxetkhogy2chotu4bgx1zt97g5ychc58s11d9sb3t4pb1nqerkuhw6ilqewql1e54vjp4eggau6ffhtt3w5mj797di5z09sosjbyx3a5cwx77n8utikemje8snn7dry3u68ky1sr3uqzet4f0jh1fbftmiuitqla9yinjwzh20pvhvrezl',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 08:53:22',
                executionMonitoringStartAt: '2020-07-16 23:43:16',
                executionMonitoringEndAt: '2020-07-17 16:15:17',
                status: 'CANCELLED',
                name: 'jn6ilzxj6enzia5tdu6slyequ0zv3pimiadldmcesfpzcfyuclqlnf7gjy13ehwymzglfq9ugwkxg2cfml90qshj1h0jrdee9h0fqaq8nm9olvafc3u9jgghjflqmumuakmyixv1u1yf11ntuf74gz06mof8cwcfjnniblbghhlp6lcsw5rbaozrp5vhoq5bnq35c2gfxdg5paqlyc274irbcdkfobrrbwy9xd2kmie0dc0ebs3cwz3p92yl2g7',
                returnCode: 5570362136,
                node: 'ik1qez7yu4qw5hnednml84fu348nfkvh5wixybxjn17llf5ut13y1qt88npv5mf58qpuanf40hvy0v3fms9tm6nfgacxs7kjl5unpzq6k819o0cw1eg4888jlldp71w7rdizqersb1w5xxo04qk4b93e4fbahwgf',
                user: 'ufjsxf1hifnjn10cg651vs42mya8jez0vaeujumgl0rhbwtnp4vpbqu6jibpnbyo2k2u0ytcn8xlhyt9lfj1t6ejpn08w2krabou3yffxcs41znp08r2v0i1zzi6tmgdipgm5zwxj8qy8a46vcwd4axppzu4x7kxjvyxjs8brtx8u4j3vvirfv1xqksnpsygg0dj9lj0zp7cjcxy211sv9zbtx43tbehxt1sp2mgzdzvroul2j42t5o06v1zfam',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'qb9x1zdt348ytmpao799',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 21:18:52',
                executionMonitoringStartAt: '2020-07-16 22:58:57',
                executionMonitoringEndAt: '2020-07-17 00:04:07',
                status: 'COMPLETED',
                name: '7da1jhzwjkd6ewm8bzyxfyma8y7uvbpillvwsx8eborv0gk7ik1j1y08xuodvtjldao9fhd5rya66gptx9w5qajop45sramvphscnsqsj5hkisjblso0bzs841c85de8fmzme5fomehlsojowli7bjfxyu61ahf4repr7xrjofpq6qbiuw0am67cg4c5iopv9ij8jm14z5o91zq4f611dhn5alhpvsp1hxpk10yd4fyomrke4q4rf3itur8jbwk',
                returnCode: 2944318160,
                node: 'mqps88qfaqw53iwxlaslvaavgm3wpgw8419p6rdjijyiuo510tt81030jh4h8aruawts7vw2qhcqcszfxtfrsi84se1cs64a0c0etsgeixt6c3w53874y34j9gzlb441te8thxtjlc34oi22by3sfbfhm1m9i0py',
                user: '6f9pt6ybkz3ml04x1ppo6yqcskjgmcbfa88tjfjgd9u2y59e90e2p67k9h3darrp44ofyhvh3ulkzkekybxt34rqfd0p2uubiex1anvvaoj8trt0yg9djcb5ockrwx2x9t6fiepntrhxe33aomon84a6gjbepd9r7lpd1y2mr0ypp0o758mizy5ej3copd92cu7fd7smw9ad4n66pthzrr1zw7ehptc69c6e2z8fant6y4i6mxll3k16slv55o8',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'afzo73kmt762fgur5hc4',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 02:03:57',
                executionMonitoringStartAt: '2020-07-16 19:16:51',
                executionMonitoringEndAt: '2020-07-17 13:57:45',
                status: 'COMPLETED',
                name: 'u57p4oh820eg35gjti5noevwor26i48axmq3b3qrw82dg2992cx5c88d7oeg32lg5pz6ykwosmp7zacs4y9ehol9n8yrrxinjmjd1g6o033ii5y7h3nh3eyuhq48gwe3wgxmaydz7v3siixq46psrf9zqp8gc4pitpo87sj34r5ezolh46yv1226i4p2uoa7dmmb9r613k2unhnzkmw2wp9l4z7knfyuepuw5p4nl2lz4ojp4ehx2lc9a3406fi',
                returnCode: 2674145303,
                node: 'yxpikm44nm0zoevy696vt03l1nyby4bg7vu2ytmpw1k2qb7k2fxh5fa2cypxd084z0isa9pujjdumdqigwb1wqbbu8h94dw34ndzgh853wkuxeodihxkl2a1gwctp37qq7x7bwdlcbwqywyvagoywbpa7tcpurzs',
                user: 'o1p5cm0gtqyna5fioqsxjguvoafx03wq5gs0olocm8p39n12ym46dy11yb2fe3p42t7jrc2vd3i90m8vulrg17xtpgtgl7nb7y534c4qn5z20tuxsa25cfcj3xrkmqxsp1vrfxcjrv1yz07fpqnbcilbz9u6mmhouz4cny9cr2xhl9jm0u2t70i17bs29v6n3oukjvhnw78vg3nv3ce62z8daos7dtcolvaiheke9uegstbpkdo4tvvl0ain0gp',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'zmecn76gg5l4bz50lpw4',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: null,
                executionExecutedAt: '2020-07-16 20:06:30',
                executionMonitoringStartAt: '2020-07-17 15:00:16',
                executionMonitoringEndAt: '2020-07-17 15:38:37',
                status: 'COMPLETED',
                name: 'sustiz2s67b3qc7ivw52wzvpgtse0zar4jxan2b3yavdhfpeigmi08lyfn75gkqhp2uxpuuotzyet2n5tunq7vw9oov6qqkolv5dblpypxbbsmvh8crj2zpv87015axebpdv57r9trwivjxkhn9f5ejzl3fd7lwhhw7hj2cbzlma0ykz29y8xfbbi1xoi3nt1oml86um9qr2xfrowsur0lt1gmg49nrixyguefenobey6dvsmjfudiqrcww1hdq',
                returnCode: 9732142070,
                node: 'k8ptwr7ohf4nf7bpbw9rhxwozt7dv2x2ysqddsi3bwdcew3rhp0a02zgwtqzxs7x1sr8ysjkd0vm3bnn46xr2fhjpg6lfxjp40iyj0rutgbbq6zecqb2h1tdd8s0dhgxabas3bqnst8r0obelkbhz1h78c7lhbap',
                user: 'bgvb5604b4xmsmb51lj2z4dxxtdcd7pxlve2slgauergsiiepkmnly4sizudhxiqr17gyimkhz373drbal3cxu3ponl87s9kg3gn89rtrdgiu5c5xz5xtax3syns5mfmmfzi29idrapvlr894z7kbt4rlfqhylqkh78lwg85ky8d44jm55pa15bn8u5hf9kcpo33yd7tzty6qujn9tltsgkku951rh2rcj5ibownjsha7kdmvfbs5fi77fwe1w6',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'orr6fieis56nmziqitcp',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                
                executionExecutedAt: '2020-07-17 10:14:20',
                executionMonitoringStartAt: '2020-07-16 22:45:24',
                executionMonitoringEndAt: '2020-07-17 02:40:55',
                status: 'CANCELLED',
                name: 'qqxyoxi46eq2ar9c9dfpzdpd5j323mik0ioja70gvky8hjgqztikk2zqorfq1yod51mtqw8mgo3lx2cdhqnu7fz2wuedit81ecgn6kdpbjo0risueyy6xad4o4f3hqkkfu48cx1rfc02yb7huz1aq524zyw3dwl8r2admkoksd3h75v8qobmu9bqperdgcsyw26nu54etwkeumogm866o1us84og5ol37rjp9mucmj3uj24inbk4qzllshiqo5t',
                returnCode: 9639822088,
                node: 'tj6nl99sj0is4aem84mzhc4u27j0h024dy20jhbj85jgqibx4lz77rw95a78avdye04cxd4wi93eq2opn5ajb9gwkj82rdcgzj8bq20ur3ab4qjuo4dr1qm5vnjuetvgzvn7kch5j5rd1nb8xcgb503ice0d2f60',
                user: 'lf78a7ue6zhrw2tj9zxexocl4iquq1yk221oiht992h2ksp5vkph6oivej7k5tg99xxpze9xf19lze3nzx0c2p0zu7w2v58hpy1b24qca3axc5jbtt76h809sc58dsuzc61j5096vifq2lffnzo5rfqhqz7m8fv2006df51a51gcsj7djmsrskc85ik228jn4f71ibzlfguzhb15f4q2o3qi8oyou5frkkdd3dk2my5kx246unhcihppfcfuqpf',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'gqtjyigzlczhbuk7fchj',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-16 16:54:45',
                executionMonitoringEndAt: '2020-07-17 03:51:37',
                status: 'CANCELLED',
                name: '5azg5kh9tqydz12gr60gipxzz34vu041qnf0228bnvcdtemboqsgbr2dm5vrh1a0eqdr82bwlu0l09ts6nsp3f7w6ns6bnjlz3w6hzf8ao21j7dyzukbodvdp27jo4ymz6sfkqg197ejjwxuf9ef607cdvyfqb9olq1q8u8gi9iiy1m3kbugo1kpwdxtztuv06vr5udmfwfrkt9292esz9ki5e07yyo49jko4dsmjnnsq8wcstljhed4bu1dqfl',
                returnCode: 1480902976,
                node: 'uliwms16qwa07pc8iarc1zyunh43cqqb69o57xy4h9kl3zntxveeegfbvtegeabea39hf0ehdlfmpieiwnhso20yumxyw6akebj4u270n9cjb4gghd0j1rd17dssz2zkud7b1l81kcon7tlxr2927obdlteyaxxv',
                user: 'z0ldm6m807fh8z6mmd68itsl02i97n9ojths8hkdpf2qr7rzh11geboiounznpupn2twq5ftu3ljp6mln8rosgupvxvl87ov97bu0rth94whp2axoedema9xoaw1ef714s2pio9mo1btn2qac9p3dy76s1bm8yervqv0bckrn8bli8oabzi1399dduc3zitiocjbawzoq57feml9ddk16eqf7p12x7aka58uj6xq7wjap85emz2g168p1mdo8x0',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'c9aay7lvbycpirrtvjhb',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-17 03:53:33',
                executionMonitoringEndAt: '2020-07-17 07:17:13',
                status: 'COMPLETED',
                name: 'ft4jetqvnk5qkppueuioljbofvskxjyvi549g1prlfnnjc8irwy5co65ccjoy654fiyqh9w3dwbo8ulwds3c82w5y5bnvlbbgzub5th94absnuvz2vht3jwacgmfek80f38lwwnd6knpv0yduzw34rthuo3qamo6pcql2rhy0vx36xwiwa7etxd78d9a0rbtuf5fyt4ue6ldphxt62akcjqp5t670crdnnzox91vj2qhxo4tdr8ar71nrk7s394',
                returnCode: 5120685482,
                node: 'leqqshwlm2davo8457qd5cs4bsj4bl3p5s7cq79q59ukehbcbttfbrwcpje90ct2tm2kub65ptpc4rd5uyflxaqqkfejfz9byxqcykt8c3s5880x1ln8si9fu5lk68lkt8zuqkoa19tjukqed2tqi62qbgga4ifo',
                user: 'qitnhh9wls36hktdx5cvym7e8vd88ykmz1cw1oy2y4kz50dpb05nih0139so9vfa334gdqu093kzoas5ru9vu39y1zke4zav8x0nml1g6i4k74qlpwltdsjn9vnhc47hom44ircurn8j8684fljjb0td7cyorrrn1vwycd05jz4nplp7c18uw2pmxf07rwwq4qakomzpppz9c7ecn6uizifs1kpc727813hv5myx67yzzq8zbxb4r1m8a7hdg2e',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'ggqfhr5j9x9c6x6uh8aq',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 13:10:59',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-17 07:14:41',
                status: 'ERROR',
                name: 'q46frhil14k6rf6ol46a4b3dyiq4gym7i11stghmrx1icnr7fa2la0bjarg40yg7i7ab4zt990jh05ipeo1coozs3hm0qw2b4cm7lb7z4zq50jal3y7n16wg7jcsw2s4tueppg2zql6iyw8u9ek7y9ppdsi34xo7o90n9joahj0s7pj89kj9xfbotcbgfeil40t7exq8ievdvpforujwvgpq791vyzx00bj0n928rkc6vroqoljr2r8yrrjf9e9',
                returnCode: 3366922314,
                node: 'scsu13oxqipz8v6lm7tplug4tr4uar3zytg5uih7dy6cb9ns6v9ybloykumib4cogbcxkocunrikdhte8iu5zqv550dmozxz4isftg7quon1hjs9m9jnf8bplicu442y498cspwe5xeg1ffvptpokgxs6eyrttab',
                user: 'rvhcllhjddu2u8kdw0maqg3lzsw8y829rarweh5pkvq3jykgk0d11q3daelnp46a5div7m1lynon9uplopno24nxvjt7u9d6mjwipdw0vw4skkpr1slqp73qg1vwhhpfcvbmdc6g4bft70pk63xseazgmmd1h4kqxjlux9i9o4kgngal3ufa24nqg7uc4z9aocj155q5d0ter8o5od2eutx0hmbvl6nuiz5am4dz3shurtjo7o7m5jbfu081ssp',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'iwonh2lcfz4uqurptvx3',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 03:08:32',
                
                executionMonitoringEndAt: '2020-07-17 08:35:22',
                status: 'CANCELLED',
                name: '2n6jyyt00kqkielhvh86ft6p9jxqfe2lz6lcvpd21xw7r9pa3tzss311ql8bl1ry01imi4fkpo5srcumullhqxb20bi1co8nvsbxawuqo8e240ay67ncknwiwzlkprmq28bwkpq7nrwak4eiq82fe878uedyfng989xogoh5pvzova69m56ku8toz9bb14d6toz66vtfm1fzi8ojl106e1rwn6l11ntzxkkloxdc6z1iyv4aydd9wudimlnelrp',
                returnCode: 6570370170,
                node: '36h8zvii4qz9gefz7q5ojfyztdhub5g0kr78uru9rpq0r4uajbdj1jdkqdfr5yaxeqr5q7emxxwi9ra0utg9ce2dbymw5hd0v96rf10lhxoi9yecp8a69zh071tcewwblu1s3v1t7p8d7ad8iiw64hxp8wn7r2yh',
                user: '9k0r0r4wagnj0ui8qz9b73zvylrad58xv7b0ngyvwddtbfg4gc357kkujf9x3e927k9wxhhb4cpsqfqzm8ru38j803j4v3r1m106f5cktyridkibekqlds08mjz47zvvecfbuekf6gj99tsz8bpqxst77z36nfmri6ao1ylpzwn0v3rk1babjjfwdx8pnu831jxkl8la3p9kmisddy2q2lpc7mwzvou7ztr0w0u3tnckb2dironit8u7li3mojf',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'vtdb9gcmsh0ceg1z9bps',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 11:16:37',
                executionMonitoringStartAt: '2020-07-16 20:30:14',
                executionMonitoringEndAt: null,
                status: 'CANCELLED',
                name: '8gykv91henednnbbqb0h2ln4ykn9uno162hxws579iqwjx53jn92cvf2x7q251m80skva4pte7ctzmo3mm7lcl35lqj9rd8v9ce4e3vr01lin7azpn71ozy8an1txu49wuawnj2z3l421t3ug7ki2k2ngcoh6522iw3upk6sk3561ucmrv6c9di6guve6w16aotoof4sus9ut4vr1pvagvcv28qqrgvipd8ddqsxcpwss9ocro05io8cdt289kj',
                returnCode: 5393264234,
                node: 'ag621rgvk3g89vpoq34b717my6zbgxnrchfiajak40zkprbhamr4lkpyk4icf40g5w4726wqf3m61ry160344momqpcz4u4bfff1w5mqj10z1vk0ea6jl45r6b3j3pxq74rnvoa1jkurjhgtw22tgsml64rpfa6m',
                user: 'm3kgsf8q9ka18h12cixzk1wesx4w71i7nlwz2yuep35zm02uheo2fft9as6fv1ba3xq9cbzkfvbn1gyczntspi8lob8r33jjjpl69m6sycn30lpgt71xaulwt4dibc54iva6ck0zabhn3q4l9x6gz4fffr27esw9qxkx1ki3smk5j9nz88tip06kjzc6fqqqjg5aifmwq5lugmlezbf79fhlsewrbosnam7cw2a1p1bey0ir2n236lx7mvzivr4',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'pp23c9qqm00pfdwrfuw0',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 04:08:29',
                executionMonitoringStartAt: '2020-07-16 19:26:27',
                
                status: 'CANCELLED',
                name: 'bifsie9xcnmue0y1eh1lpisg5kay1fbga2t4hqvna24mohwd5hmi7okkjvic766kzke5lakdoswk11dbufpl110cw61jq3zyk19zapev1u9sdkcr0jve6rkmhmltsq9u83obg6k34fergzdu3escnfas3yfszcjvxyx0qqf1p8pbzjlpybwrwtnx8zyafkw2ecbwn1z4h2210nqm1w1t6zp65byydv6ifptd9pcb209429ik0liaawb3uqrks0j',
                returnCode: 7981034441,
                node: 'jb8abf82j8zct04oln67vtmjfw6e3dfqb6qrfwtado3ncc9utppowxmb06vmbjpxteugclxc4xwky29y8lginii91s6vbu6yzoi5unw0hicf44zpn2tc4hvha379ezpihly6dx5vqoz1t94d3g0tmhfy1tma11ml',
                user: 'ox0f1z2nwy1e37v0sx4lqttfy85rqjeu4yy1po3ik3qocewbwimpe5c3hyny6wekwonr2jowe522r4om3lv7qrqslyt41ud159heni9iu3zcgz5ayssh1l1tcyof1tcmragv4ge530gvcgzepq7qtn1nngk4e4kq8bfpkrm6oo4qvkic11bwpkeogbbk68s39od7brmnqz9g90yo8mn1ca2gr4s3c5hvitbyjca51z3v8zcfds4jni88oyjuqec',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'x6qon8soyjm4c8lr0v6l',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 15:43:20',
                executionMonitoringStartAt: '2020-07-17 06:11:21',
                executionMonitoringEndAt: '2020-07-17 08:04:37',
                status: null,
                name: 'dwkxd2eryku994eyjjbyi91ujq9evpjsdwjbj3qdxfday96oq7ulorf6h45xxvh2hjx6gr6fusqh4ia9bacdd5knwgnm4xbfxxw1q6qqv016mz9fgnpf8ko3ne88sdss0r1izxra273k5w7p7tea95owjmbs4dg6egsd77i31t4o8ou7jqh35v3fo2abqj7kdat8xqd0ug057x5jcyhoeu9nkueb4j1c6uvv6wn0fvjzbpgb24pe0mjvc9loskq',
                returnCode: 1831593142,
                node: 'gw49css8woq1157l97k3pkyitzffk8h6g2b1k1d14rtmmpdbiq3ii8uu6y20uxp8ajd4v362if9eklzs7fofy3vh4069ni0kh7mhiaiawa9oskoxy199ywrd2lq6mmg7mjb9anvk7idbtancosi666g502xo4xsk',
                user: '2tfhx1n7f8czbz01bgob44rv2zgnmwhsgryejd2n7xpi2tjm75hafgws03ro4wpqcf18pt4ppncq0nwf47cz2j7y1gw77hj1961n723oqkrtd8d1ps5ooivs1qy8q1pxcouae6h404fwvs0vvtlc02hmmcgsrkl6ol6tle17h95g5t4hy3h80z1doie8qo6hv8k7trjt1oz3nxmdz85eqv1iihbd3qdsylj9x8ip6k1ayxt8x61xazglaj7ayg6',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: '8gzsi4z1u7jw7xbp7fyg',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 17:50:07',
                executionMonitoringStartAt: '2020-07-17 16:11:32',
                executionMonitoringEndAt: '2020-07-16 16:33:50',
                
                name: 'zdfj2opymt54594l60v9gags80xdsh1tiou1j1mejjbw8gdic7bormgmlzqjspmw0ngnbhf8w8a39tpq8j4gg3dz5qhxh2j9qnyg422ber6q0wi3yezmk0xd79akznrsidnm1ychy3fakspxnr0v7elqj6pyfjb591mlex4iigohbsk8p9kamnnao5wlhlhpgqf3g4az908thrj2erviozl1lna0xxzu0vm9u1etow4gm8z53w9dajykyi4v818',
                returnCode: 8178084933,
                node: 'cy40r8ll94cy6h834runo72onmnd36q2xmflo6ygz6xbcenn9l0a64ifre0v30lvx7d0hrbshnbvl9cctvuhhpya18xazojkw8myd4fc055plvly7pbo29vvgs625t7kvnvn5icqauc5ti7fotdemq3tes4ivfy6',
                user: 'itth3z5ahq6o4c5owza7mc5med20yybnn9o7smq12clnosrmtf6ng9l7sgwwci4j67hihws6oyeahuij2xn9cubouas91091jskl8ns68r5myect004fwbcv3qho8eias6zw6ywjkugncviqf0srlmlv5t9dr1kk8549trd6kxbrs1b9qrx8s7i3944mbvtowi3eivktl5tpjm951vfr03fd9fg54h8jonmjov5alnwu4s0780ynjf08n3yznpn',
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
                id: 'qw4f1m0kww8he0y7vesavb054clhvfcec46uf',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: '1lf09bc0uv79z1v8qomt',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 12:58:19',
                executionMonitoringStartAt: '2020-07-17 00:10:06',
                executionMonitoringEndAt: '2020-07-16 17:12:06',
                status: 'CANCELLED',
                name: 'fjjhhg7tg86s5qxz13srdsrx6zokusgz9cnxoebjic85v95or3jjtdfx1jchz4dzia9dxsqe1dqt55pzuo1ygy9j4uf0ekoied6h2ps26qwofg2y2ugaavhz71i8slk2y8gr71woepoujgqr36zjiul08kbqt1g3jg3iho97uqj6znxyuz7llvltg07ekqmy375j04wnvd33ti9stwpn1yuk0i1p80tpdn9q23d4546duobon8t9x6hgqoq2eh2',
                returnCode: 2928153641,
                node: '7h2awpaapiqhtczzxei3m4qolfr1f4ntdqhjrmwz4wgdgdrqruv12hg7nxixhahb7f2wlb9nxjpumw0dhlnvxwtmokus2yhjvdqk5r7m6odncxdnodz8bfrofgmhose4kvfuyfuuo39ioq5v8jonjawyuzt9nof5',
                user: 'seokqoz5iv85myaj648ainbe35qaid9uy9ulsj15f7p2lh3vgtfv4nazgoopz3lt7jauo5cz3arouqilj9e9r4e8p4w96wj0b38qq84miqy9hje5pufonmeefayh5ggsgso5o1bp6vkg2hu7b2en3nskvzki366yt93o869ez1t4rmyfcsxz21j0s8wjzuqnryd213sskt11fxbwsgaegohl11r0l7tka9r8skvt6v7w4dcw76auw6ogjge311c',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: 'enmk4irwgbpktwdpoym0xpm2svu1m79safuht',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'hpxi65ephcn0ztefggq4',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 15:15:47',
                executionMonitoringStartAt: '2020-07-17 15:49:21',
                executionMonitoringEndAt: '2020-07-17 14:44:34',
                status: 'COMPLETED',
                name: 'cxs0ay630qhrxocma83291mv23szvcjkc4i2clw2bhyah8fr6vhib9nu1wnrgdn1xk54sloxlatfhn0i1fcxx783oz5mep7nc4ezmkatz7i9mn7yc2q00gxur6602q4gdk6subeur89clqmoa57pczvl4tj3n462o09f002fzooqhqjsxq1ufqke3ti2seuh91wml7hq03e728ecw9o1yl0yxfdqlbaeq7nlqht25uu1ponyfzng7ha1tiw2u2g',
                returnCode: 4031676148,
                node: '6xq6vz1gnic1hju4hl8lgin9u5njanz786dai0gjfbmqq9tnqm8e9b3ka0xjhaldx3gqgp7x7iigtx2eshtmzgu562xzqp2pszsj6r9zhs4bbkq7ap9cqcbeex1szenk5b2mhhb8i5n0639h91cyptctpwjb7ujw',
                user: 'y0r0en5kv6nkuifvyj3g8r1vbxzn18vxnj4y2688ba1u86zg2bj6q95ffra7g71xtf5hlb0mxnaqbyykqx73sic0pfl69rzcnvkuvmia7dk2njq7cyu74su7ihzf7hgph5wyo3wr8n8emnwah7yliu6a0imzwkdsfk4foqsp3piwejiu0fw6titjnc6mgfn8bi68n96e6c9hoo9rb0caio2kmg88zjvwb3qorum68di6quf68aroocdu128r9bt',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'amzp43u6sdxz9wwk0ghtywlxl6oki5ufm5u6d',
                systemName: 'kkedwtdgdhd32okdneow',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 16:02:53',
                executionMonitoringStartAt: '2020-07-17 11:46:27',
                executionMonitoringEndAt: '2020-07-16 23:44:27',
                status: 'ERROR',
                name: 'mg8xna9fo93za3q2go5iu28o5w8463fcnelkpajw75eg4n5sktyr7e2l7p5ib8kk31k29gisnhzdjtf4of1nm2g5v9xcjftrh0uk3msrltehzazlurqjvg4obuwy6gdi6g8s33xf6hs8q32q38063k6jfjtrempm6nlhgotk16721evkeymvdz6x1mapmskznt62tcn3pbyeqo36tzvsy4zn2hnn14ahv3uf06zffi5ckebtjsbk0pdqkv186w6',
                returnCode: 3872983515,
                node: 'apqxky3k0itx2fg81xc5q13cxnt7fjgi0hb4v4npq4ynofb8do8ito75i0hq8olkg3l644dy4jiw299tlgaf3i4zot8nzv06xx5jd8t1h66zqnn88k16ougkpux53dgpdequ3xdd8mu8abcx7uwgxg5rft0yiswp',
                user: '7xxgcee2ac7gi5lmvwgnuqukk6cu569d2coalpdm4gxexl6k3sz9hty1860slq5p9youfsooukir4w2ye0u5vzd7jisyo2ujed11m9juulqt3cyx7t8t00n4zbiq4hd4u74rjexv45ie0sh21el9e3quiysaeepu8si94hr15kx9f8kzh0s1zj8mrcpr7zzi6opqviik79ozsefnkannzwjsh57328bkjc3czh4zwmg0efke4x4uzwkdsnzdut8',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'zvapxwofxkezok1k2afl',
                executionId: 'cxrt1h4v6f31ylo2sfgb1z70mucewwsqxmd5q',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 14:02:32',
                executionMonitoringStartAt: '2020-07-17 01:51:16',
                executionMonitoringEndAt: '2020-07-16 17:33:24',
                status: 'COMPLETED',
                name: 'v2b02826kmogryt97y5cr2xvhi7uzic123lere8uy2oe8sc73hv4pzr4n3c7juc0frpr3u0tkbxne7ajkh9cvq52kc1uoan4a5yz5f8xi7d5o7dz9db9anfqb5nedh4fbdppt397g7069gt6a9b5vkts9dufbk3toscx5liaw89knn7qinhcbmtptrvzkugckdoqhy3ue98k8ylcti339dnpruwmjy5mqwkfnx08zwj7n04spkncdur2yk7uioy',
                returnCode: 4447144396,
                node: 'wojzhnk6z6mkee9yvljux0j28w12f5sj3c2lg19sjscbh2evrfeb9tij6mmwu6c5ddqkxx40w7qxz5uvi63z6a17wdsyofuytvdqq5ueefq97ka331n3hfsp123aicwhl83ok05x593kr0iqy8zq60u7rq6usupu',
                user: 'knkjbvrjct8sln0ndtjqbxdh2ap65vo5ry76arowqdl4cm5ngcl1maevccu2i77l0w20d6l6ewjrbnd2z7f7gvzu3wc5848e9f4hgpgvc8l9dre5ej2zbfbjtmerezxusqx68dvt2ozmx33vd7wq2wjbnqw24xmfu19venqv1hu4easdc1hdjpwd6850d3ifn2iiseqz8k3nf3gl9un6ea9du09v68oh5gcx3ur679acrdfsizs80jyzpo1y02y',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'gjbyu5aucxvliw7n0tzpd',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 13:13:23',
                executionMonitoringStartAt: '2020-07-17 00:44:21',
                executionMonitoringEndAt: '2020-07-17 02:03:17',
                status: 'COMPLETED',
                name: '9mwfg8poogsvwhzie1hnirvkptp69ktbu42n6icp60a8rzf6twei2yb6munsji14mon1p0ehwvu3nysjeinf7v816p97imkjif6wuncq92hm96nhzknqclp54thr7ak1ufv4i4smj7446veq00ec9ki73qvo3ab8wbvgpv3g5angwal5twb25i9vqcxeoz2kx6pi6srdb3pvbuictgkr4r6au510o5q1iqvkrqa30by98c3lf0lw3jr79kav0x9',
                returnCode: 5535442158,
                node: 'spqv25hjv443paet1470ubad3wre7rgzi9je6ak5p0xbxyz5l2kjdlvvtnrl44nuj4epenet1qf7ivtbygcr6f5561ndiemwqay0z79wgb4f7ltky61gn1tpenz4z3uilpeuxbgamswvmoopopx84aw1plev4tnu',
                user: 'ntlvv29bmaxuiwdn6cllh7cbyxdm28rzpj8f5aoge000l2iq0z8r6dy42318ms799oz9azeg4zk1s5ui25yvyx3ons438rm8m8imvqir8jlu4gdorqrg4hvem6vtcu94j6b5ls697kfab19ob9sgz4fmbskvnlmzp16ryrea7yipczce4oxiw6ytki0rvnvly9s3px85djjhw0wj7kwf1owd2qmg6m3pyvrgx29asa92bg52f93mfejg6qrci4o',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: '3mus5aruk2sf75b8924j',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 18:03:18',
                executionMonitoringStartAt: '2020-07-16 20:41:01',
                executionMonitoringEndAt: '2020-07-17 00:19:42',
                status: 'CANCELLED',
                name: '8f7ub848wsibuqgjp9zxgk3aimwfca9h50jnhip5e9jj9dyb4cntx9jhcsle0e3hnarrwjem26k2kevr7zgfsw3wnyia796ikif303rzvxy07bu6g08m5hrtmxkxjdzgak6z2sg2plf6e026alziwjstuwbfr4qlrcumpgnwfz1yh8neu0p843gng8z27gjxjt1vjap6x5v45n87p9mreel3kxswdrs04b8bz5xt4rd52j0rlwusbgls05db2xlq',
                returnCode: 4061210004,
                node: 'tw8nbkz9pwykjz4mwb1607daxlqzn51osza4pvefasqkrulgr1au714bkkoomiqdrjncdgd41oza006641etftv4iqnx4skcfkro9qr0kfx4ywqa6f0m78u64vjmin784qdb3zoc7zqgqw5wk7z03culqq9ead6e',
                user: 'jnut9q19ww4v4w2uvantwv2bnat11z9w1duxac444q85x8d5y661k6tqyb0duput3329hyz12qjc5yhxgy4m8b2zk9093otpso2psfm4bv2d22di0uqarkpu9nl8yfxdae4c7mgq84thzdvewvtt8miyecgmb8tw2yyluyv5alu9hrip1kvky4n4730waq7oadnbe3u0tgr0w2jwjbsb9kano4lqnxvloerh1pft82q9dw9xxhysrmsq54qadbq',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'fjrs8bijwd9fswyvn921',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 03:26:27',
                executionMonitoringStartAt: '2020-07-16 23:29:21',
                executionMonitoringEndAt: '2020-07-16 19:54:00',
                status: 'CANCELLED',
                name: '43b5d6b4vwaennv0djdvckxrn5va0xayoin1ubziudxl5aaxqj6jfgbugfr29hv1b33u5r1ra9o5wx527gmkj7hcamrefep8ve7w6iquwgxuprhio82lvbl8qbc9y84jixrwj9qu9qdvx0nhnmnwyz2zfwnby24g9tv2c1mirfv4iu47ph688u7lxtfrkrxacciqmf58yqig2xayo1ll30zf632w58q1qf13kyvlp55ln881f4mtya5ae6rqvdj',
                returnCode: 95116241531,
                node: 't75h43akxbxiaeih9lfz45f7qjwulfm2vmlqcchs0eq4i6godpqq3kundnv41oovwxa15qxhbm6xisvwn42utdgpsb35i9xvmmgfghu3i1vf48gyp1zlrjuvm6mqinnseoisqckhsvbv5bfocned4q10i6zvxywc',
                user: '76m381gd8fpopvjlqw22qsooof3qdc8komxa2cqc6p8izirqwpqa58i4n5pc8z1askqyh6ef18leakql4tkl64nw0lt2azpbiq5btxix7v9sywwdxfljwpp0rgi4tfc5mmmpdmym2kbc2keqlmg2o8kld487pk3vbywoyvigzksnzbwa6kf9v7oisrl4n4pa4gygjc605pvhtjtcjekxfuc7cpjfoemgtsnlpwmug8l7c2hfnte5jrztzjdvbf9',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'ne7vj1m000kegw720n62',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 12:03:47',
                executionMonitoringStartAt: '2020-07-17 15:35:53',
                executionMonitoringEndAt: '2020-07-17 01:19:49',
                status: 'ERROR',
                name: 'crff6fovi0v4iix5xwerb7zavclb8pi0ea24129zjwg2asv4ylx0usz4j48nnyoetj5ik2srtiaxd5vculbpx2b9472slrufcw08u2k0nqlyut82jh2ubotpgdbscoqwddsgr29vg2uwat00odhxrkbdcorbu6z94tzefd3658jsmmkzdgd7jbur6eydhawur1fegqp47la7l9dqsqc2a96w0g1u5j8n7r9sineoczk8hvx68q4te8z5t3tu1jy',
                returnCode: 6343037917,
                node: '0xrik90vofyki8ht2i7yl09whnk90xwkrdb7erewqa7wykrdzlnnemj72xkjfved9hy2m16qkrzp2w00h64bpz4tc3yd98y5tvlr4bxltoit6940tibq828rmfkmm4ros0g5e1qtd748c6dhontydqn2etwp05g6i',
                user: '774wps9p9enpcapwz5tasrc3oqyiib8mqndk4hyzk0pv3nsx58e88onqy2aq6zkdxf4j0kokaq01jygbr5n9te0eam0wmzyry4emdjnarbbj6sk9nkoi4h6mo2wjtsndihuxqhf6tm41a1fix49sh81iqvkbrtr0if11qfpy2mfd9ffi4zsx8ryrf7ccqfvbhdxxg5rmo3ozhfygarhdlilab9u8dnlwdj0zntr413dawtxlvnckvxgytwhkkyz',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'ibi69crmn80zt1vbnw2r',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:31:53',
                executionMonitoringStartAt: '2020-07-16 19:43:33',
                executionMonitoringEndAt: '2020-07-17 15:03:13',
                status: 'ERROR',
                name: 'pqlawg2qek2vc8i1yrcfddr7kjzt9fxoiwjzxgxpob5x2znjnc8y2rpo1m9bb07puytix67bw2773m2lu2scw1jc73pi7ind05k6tvfxwbnth69g8sr01in4jnpuv8oxsedu0n0yz9eksibmwqafjbccdlmu5yan5mdrcxk9m56jeo909sxqupsmz98uqr8zie9m68n6p88a2qryevp9qs0umvgczmpliwhuoukvzi3v3sqnd51n792zdj2r5rz',
                returnCode: 2915329272,
                node: '671xl3p1c9t64m0zwbm97za0l7dfwy43xqgf3cpucrwlzu702yc0bpy4v4y8g3bx4lk3cb65sisir92gk5rgp39j1l4etpnqixs47878ofsvu7tzxt6xzjcc61lnke60b0y33ultb1u8dhyo2xcde0gcl17qtftc',
                user: 'wh7rn8ux703qb3siuvb48ozl91z56qnd63mnvxs9gp5evbafivi5rrigrfptnzb4vweg6gk2q4sf2fmaodxmurkucxbu1vzceznbkmcxmx31ko0oet11tfs23xowrhasb8cqv0qz3z89fayk70gwly9eoyjrveolrtop0nz9ttqmonpzo13bof80xu3yz8nxowlb50e0zii9miqfnkxkiq2yhstkp3qi4j888jylq4thwwti73zelbfinuouts3v',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: '97z70egqv3h1ybhibxao',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 04:43:09',
                executionMonitoringStartAt: '2020-07-17 11:25:26',
                executionMonitoringEndAt: '2020-07-17 15:49:19',
                status: 'COMPLETED',
                name: '8cykm47o81jw0qjrkql0701k8fi7u4wia352l7rq1kmp1f2dryirqt3frzwdjlryfdi0wv0muwg083apor9ar9pze5plzftve31b3jtgdu29lansnx4a65n2awrzdn26z8sckihl16i1sm9wiv1oeptt5ht2gh2a5izypikd1cuvuzrhaygi0ve41s9oi9d503qp2zwl8kgavwhjjuq21r8wi9du9y0ptpnuxgbo9ogca7dgl4whxe4lgkpfu7d',
                returnCode: 100.10,
                node: '3faw0ra1qtxh1yo7yge3303pcgkbww5qqf3slj1y272xqy9esiy3331973iftmtt6uvhdtdx6xgv3bgkz27rhjl5s44x1uv109g3d3e6b0yxo5d1kj6fhf06yrssqp7wkc7qn0ap7jsd0z11aitwzch3cgl3e1ly',
                user: '89o3lj1tnlztgmpi2u98m605ogncsro8tlnzf89ljf88krg9qhl2p3parpibyvqk6u1qqan88oxjivc3o1cpjosl3cxlwzs8q9su6loudiu5p1fuziipg4y242b2339vlfd12b6rn7wg6fumx31zihzqce5qbbz25t1rjb9b7qq4c7pfgdpqqg7f2qjlnilwhpba0fe9xbh1k9k2d9sdw0tmacnetttcgtq9hg27ogtrdk1klcubjftg2fe4mja',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'tuv7yd3j5oa5j7jgtnek',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-17 06:36:57',
                executionMonitoringStartAt: '2020-07-16 23:48:50',
                executionMonitoringEndAt: '2020-07-17 12:30:16',
                status: 'ERROR',
                name: '5ta7tog2hi8hsjznnln4d2c5eujdtnlqe385lrjbdedw99i0fcg9mx4cga582y5mk95rxhyqfie8nt8egy77sup51fbpgdzumx8p3amtzr9lk2xgg5kdurgh5s1zcnkh36j6dwo12qrx1gmie8eied3ikehcskbiez489shu3bvnrywq4a83da2e3dgsyklkszrj0upvd9gjp7gydzyj46taagyh3mvbrp08exmjk8zc846bpeqf42ar7kwhnkp',
                returnCode: 3741710718,
                node: '5kkm7l0hdhmafn807kc7hk2771wte4765txu7ftispt5v3ru6tyogmshjv7611pvlfhdfurcoxocmy5g2z6mur56i8yi7nuiozre8kc0jayqvmaa8e1532bbkp1thzdk267antal8bog99rknwbpx4t9v66658e2',
                user: '32oocvbv4sne9c9rzd45375smhil6j85h1e55sap7prkoy9cqji8mqybbh9s5et8kievdoxr2hnrdrb2gwxa1dv2z7figzxuq2dw5zfdka8yr2yf3uupmb74bi3pof6xsvqpphdu4hfa1dlfrkm0gwrrr2do1x8mxl56skfu4mfc0of4sgfi2y8i4vpgn2f6g9vuppub2o19q1cqpvjyja4r7utlz9bui6h75ym2ex7o32zhctzm2gldfjrzc3g',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: '8qjxqvc6nukbsyy0h2p3',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 07:50:25',
                executionMonitoringStartAt: '2020-07-17 05:56:27',
                executionMonitoringEndAt: '2020-07-17 01:36:59',
                status: 'XXXX',
                name: '5y31qir6zd1re76y3vjfbsoxhfaghdyqaoztj8sa0k17q12cxn66ombxxrlcqlhxyxx025xc1t47sa1zfm42ukj93v0wqlyhaeld8olkmte4248au6lyixt3qd0g5av5lp7vhqnu75t89gtv4acaqg5zv3i1b50m2fuux8gtb13dx4aypfzr0lu8v5m32yhjnnvuh5e2iyy3ej579ygtpjasgmriv68dpqj8eguvmru7qwu4rsuq6z52nxhluup',
                returnCode: 6331316288,
                node: '1rzh0znj8fj39m7hnvo2s1cr9wz9iu9hyl5a4pz2y023p3y2thns0yyla0izkrfevhl43ll4gntvlhhgdmcy11emmbbtvgpg3rjwyvkayx6mdnlz9yh06yf1gznm0wzbtmi3judulbhxi75lc2p5cxigpnc1vrp0',
                user: 'kzg79qf0qq8ur9i2inm2dy3roswevrgx0kroy6x381mduh496j8h9p5yjie9vpswdntz0ffrvkciascijw2pvjxbvriwmzmzs48qvkxx0jr75evop9lxwrerjuqjkh957knpevbtrqysfgkc03muamxkxba1pxgy2gb6943usf5bus4bqnm5nlx6rgilunvsravzl7hjqivsl3maxl4zgb1xxgdfv4nohb0tf3m762zimg7bpd5xajt3y0jty3m',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: '820k0spg7n1cfc1shwr5',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-17 05:49:15',
                executionMonitoringEndAt: '2020-07-17 15:16:15',
                status: 'COMPLETED',
                name: 'ua5t8mplntwu5a7zcs8z4ll56y6w36hdrij11ex02pmbmqzx8srxp70iolgceqdwyouousah69dbvbdt19aulh9uwzba49qfprofzzr8a1pyluc765fxtcvcqcwy7mb1xcu1axn388jscf0m68jr5pcljh1gdkgrbk6dxfe43l6b01rya60beqz59725et540pelgduzenyvv438hd6vt3dn1xgls7tyv7fw1zjb5vdcqy2hqyjji2trzpohnzo',
                returnCode: 7428685778,
                node: '15r3odfkxw917es2nizhp3d7upgucgnkls42nv59sndvjw56lgc1zosbqhzlcfkc2roantlnflbddkwtn43u8wb724nd685jinggzlhslljsh15xithdcksb7nl5ofdqk98vwizci1y3k7gvw0pcot2tmzwmovmx',
                user: 'kkkoiy2vvif3ez68kxnyjla98ycxctp8ptnxnfw9mcmkqzw8jqhona2do46fuk7unl84dqn0o5nbcufsz6pe3583t54g9z5q6l4ddujuvufvxbf6kn4pl9ikfob73ppe07qarttwrss687pxvg8jwt5jmps8ols7p472ujkxli53m53gpo5skn1o333ywhqkgcer8cpc9t41ad3cvavbz38lmoafl39wbqpb4o93ttoypiac6nrt6nfy6m6v0sr',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'wkfovzbawh4ndwhds5ww',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 11:13:11',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-17 14:51:29',
                status: 'ERROR',
                name: 'llc87mki3gw852mbmo43gqu0s4sbkzddywjby2beqdtkvrpzp3kfgcaeysynimjc6wxy3ksucv0afvl6ffqab47txb9wnmf7mslel5uc8esexiq0es8hisb98dgpyx2smmzqcwet7krdgd3vguuyw2rg5e9ixagrb7icy98tg7ta207d8xa0clddh9rqpxly0ik6b0e2rp9w5pwy840z4fxhei91mw3uowjboy1m1emdxpyz7k5c8n3k2qph01n',
                returnCode: 4764516796,
                node: 'frruygom3hptey2fcaq0tgzo6z1sjgup53tz8brzyb5h448kylmdhq1nf1r6yruuws0aril9qk58er25f27w9ro0gauxllwsv3726ezj7biydvojt9nyzoa0eo7vo27fimn8khnu9m38qfe513y6sybcvlkipb2q',
                user: 'ak6m4cyrhxhor1rp3evfne57fm8hd1nt4qqzrf9g9hkspuos9uu2fdb1nqa315d8tqntaezu10h1srsphvnf5vytlt07i5z9r6ajkvy1rujhrp7wfthdc2hiqgbpb06m888dzclvl6uyt52g868zg4fh8v25qn4xdpgou9p7a7ept1z6psb247crp3mhpv1xv9zo5z2nxsyrw8edd2cmv7vc3qzhzv8k652ej5sjd783kenk2f08ij8h9h87a22',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'wak3p7lregizl8nsqe24',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 23:06:14',
                executionMonitoringStartAt: '2020-07-17 14:43:38',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                name: 'imk1tapzlgqtmtmnovdubj17der040mh9485mvcul209d5zkp2kft5b9rn89v34i1gm7peowgwy3fogr4w7625trl6w1m6iwtbke2gb1bxtgr3qdhlbmbkbfh2fo7ft53w13finxb1oq6l4lumohpqs71e5q34kmmfl562tenmyj1x9zdaxsnq7asiaxzztfzkdxfr7lqvsptb6pxu9m9d2qpt66gc76ltfrvy2yqtd9l0zar5tw8vv8n3svww2',
                returnCode: 3190037014,
                node: '4l99j62cba6pbvletfyfyap72e10unrg5l0rvigydaf8664k3g8xe286duuplxlu73xmg3tytebqe9ot10ca3cxfjailh0hxkw8bj3v7jxwpkmmrnlu8q4ixo7xb51xw8dzncgrmivberl3x5ybkzzjozbgabytp',
                user: '5449td64afi4k2eqf9xq11siemcpqm0j69cxwej1pz427hvdu523lyebyg3m1xbsqktbnx3q9qqxg395s1vmxdcam56t6e69jov8o32oly6fdg1otp7frwf0badz4fiv0q2chk5tx9zt3ymt68of9bbxujog5vjhk99126wpah39uyymyu3vvsdu7euflfrx8pd0qdyyhm8p7k04zl4xn9jpf0n5paeolps8tqlugw2gtz182tdzoggyn2ctymc',
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
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'vvtmeynf2wrpgwihl6zb',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 06:07:32',
                executionMonitoringStartAt: '2020-07-17 12:19:43',
                executionMonitoringEndAt: '2020-07-17 07:18:06',
                status: 'COMPLETED',
                name: 'x7utekjp6qvdzatqczxtgzkjrt1mpge146cg3g6fogoewk769ayy6zsyrsai7lrtih6m845c9xh5nnu0a5cfo74fpadhyaupa2l8ubiry95c7mt8sg7bzkqdaleqrj0f4uf2rnkacdxzqtao8huo06ifbpv9odon5xt3dxxlnzz5olw9i3ua54dpwvy35t10ejv491lwz84dbyxalle5b2xgm8lbadz3pj6kmfj7she72dysw6hri8r3oohosvv',
                returnCode: 1447158376,
                node: '3aoacxy3kqoojh88gc09v46rai1rtebl2zy2gnqadkrxscipixzmyr1v2acw8dx1cbpz7pz9lvd8kocvfvdd9s26u6numwbuyddrwrmw5o0k0urrcc1uti8rxo731ejb7f18vbc781cpnaawz8wnu46wzcrjyqsh',
                user: 'xt5ogrrejsh6mflbs1gj91mlcj1m982avwhimha985w20510t9hk5kou0rvlvjnm696ktm5cf2owgmswgu9jtdsoyco7uvjyk4u9cvxa9emqv2b7djij3qu0xytc0gols1l86650d5wibrd70424b1popbdn7gcv75cdw764e3jysbv5yzm2hah2wegrok5dkevbwi3te8p863rgvybaap4godu1efnmr76q9zbwlamruiavnb0m8jmzfir632o',
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
                        value   : '512eec74-36a4-4324-a26a-96bd902670ab'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '512eec74-36a4-4324-a26a-96bd902670ab'));
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
            .get('/bplus-it-sappi/job-detail/512eec74-36a4-4324-a26a-96bd902670ab')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '512eec74-36a4-4324-a26a-96bd902670ab'));
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
                
                id: '2baff1b3-ae23-49f2-9660-36659cc6e30e',
                tenantId: '2c4ad301-3692-4d57-8753-df2521397505',
                systemId: '136179df-bcfc-4fa1-914a-00bbca497aee',
                systemName: 'fo72fsq826ykvqs6sx6k',
                executionId: '94acf1fc-b92e-4d00-bdd8-443ef9b9574c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 23:38:51',
                executionMonitoringStartAt: '2020-07-17 15:09:46',
                executionMonitoringEndAt: '2020-07-17 02:05:06',
                status: 'COMPLETED',
                name: 'pl3evad54wplxkcee4ulu7kd26mtl0g4m73brr79ffmcj674qoi3bbqhuseb5pvh9bmmjc8pxykrzczhcs2e742ve6wt2onjbz0cf87wdqj1gh6n8ub9bmogc8k78ghk6bidx1zyclgyzkcw5nswethncan3u9o05gva1eks9mid7efj9168zbjavb86s32brevlp115w3s4n1b364m3twjktj613uofv6avv7qb2isw6swl4eou31p3ecb066c',
                returnCode: 7337623433,
                node: 'vjz956qr0sc3l1db2725k63mi6o5httdvtyacrxdruewo2dfout03v2fk41dmuk6p5zh2cphsw4bnrre0jnzl9ipnshhsbxtcf6z9cliq6uyrmqossgt497cwa554fob69lnptwr60pujdzg8hj9giqvrlzxeoe9',
                user: 'flirvh9raokpj8tzakzpeh2pd2zws7y76e5ulqgd6pxgpboo2uc8f5dz27qk5di96d3lti5z4ezls5plnldhplqs71vke19ezkrlvcfjdps3iwbc3s6kz0z62v45sj28w5h122q23ko275ctwftfv0jlihag5m3bdpv9t6hztcg589uwl6ug3deau5epb3idiz9f0ouvz7mk0kpglv4rp4pv4qdjyk554gc2qisiu0lmqug3s25jr9rrmx48rg8',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '512eec74-36a4-4324-a26a-96bd902670ab',
                tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                systemName: 'fkdkq416fbet0t9xsj2y',
                executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 03:52:44',
                executionMonitoringStartAt: '2020-07-17 06:50:43',
                executionMonitoringEndAt: '2020-07-17 09:05:38',
                status: 'CANCELLED',
                name: '23z0j83itb5woivjqbjf01m5qdm3mjoek0d5eqdujrc0rp4l2s4edbg07ioh9e4cerh8y5ghb62n5kvg4jkqg1ps0rjyiefpt4z17mqi4t7ui885aadtydbge2andqr56gvhlsw2z55lpmsm8jog7spfsnvqi7mlkn7thj4du21b8weuzbar2kdxtvnvmx26ci1dtygwq245tmpkewsuowpef56vm8710w51ds2axwhuctog0074n2v6whqfrph',
                returnCode: 6856091619,
                node: 'qkioxlyldnglhnq9xg687ysuo28yjdxkdg8jkpgfhsm3cyw9su644imms25qzslzh949zvhjqxp8gcglz0a2t91b8bpr4bijtkdokijkxik77roj3xpisenh96e8cak0o2s3aayzmu2q17ba3lwidd1tj6x05e3m',
                user: 'lr9ufkp5iuuaaxq2nf7uoy60jyj0dcs7wffiowhejnsglv9u44ipz7w2q0jv2vme449omruk5s8ehy1uq7fkeoqm9xr3nd7j4ncu8gnl6oagcqcn5qir2kwy5d703o9yp9yax8xr5lq5qfwv1orvc4upmkhugmuqrr2qf4ji3s8jr6zaxa0lz353dfuv0qccqlh5ibpfs3fbu6ttaae1qf1j7xopr0q3wkhbz8xhkos4m3xplhxr1h0t2o1hgvn',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '512eec74-36a4-4324-a26a-96bd902670ab'));
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
            .delete('/bplus-it-sappi/job-detail/512eec74-36a4-4324-a26a-96bd902670ab')
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
                        id: '9deeaaa9-8a16-4595-a304-c31d6bec5c70',
                        tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                        systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                        systemName: 'h1qr17fjt889jnhbksr0',
                        executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-16 23:52:04',
                        executionMonitoringStartAt: '2020-07-17 14:40:10',
                        executionMonitoringEndAt: '2020-07-17 07:23:49',
                        status: 'CANCELLED',
                        name: 'y511x8z5322wffit1p5s1ipqb302ix6orvv2l080tiasj5dlqfa9v22zm280u8az6c4n2s7x6jzgb0czezetal57ekpq6jl8rx4alcbx7745x0cfyw6xdj46nulqvj5ru6zyfumd7l3g2bnijjkqhgpk8nkaxaz6nkwgkyeksgxo55g3qhseu6k2860wrhwtwwmhawnmwee6y9rfnbvqqwxidojmzf6yefwfatwnkj0z1bt07d90ta55yqolb41',
                        returnCode: 3101055639,
                        node: '9egw1ztm437px98q5wtdik8nya7mulnny013kb5th3n1n7hawgnsf47kwsl4wdu4ffmbbglhmzvng9x9s0b0tspiiwzor2zbk7fijy0gp7gojyhrmd3ev9w6bsnb9kkiaoonpo2k5wdzr4zbm9xu6m9qghfkg61i',
                        user: 'hu69jkifcwduazcscrej3y0vtyaz78khb7d1ca7t80egpgnhq3mn7bhu3y305oyeqjf97fz3fww1k17m1y4advxr0wkr7a886rmtbb5n5j1n6pdkze9dbu2qttbj8m9fzhqcypvnk34s099h6uh6lk2myfafpe7g8tw854symtjin22nz1hbjku9nnyejz9coslat83ai7fj65r8pdkomrppng3mhxv825998p1toicc8aypdbr32wdwteyq1a1',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '9deeaaa9-8a16-4595-a304-c31d6bec5c70');
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
                            value   : '512eec74-36a4-4324-a26a-96bd902670ab'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('512eec74-36a4-4324-a26a-96bd902670ab');
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
                    id: '512eec74-36a4-4324-a26a-96bd902670ab'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('512eec74-36a4-4324-a26a-96bd902670ab');
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
                        
                        id: '38d33719-d589-4852-8b32-f5ef99de316a',
                        tenantId: '0688f99d-9e6c-4db7-80a8-840b5d9fc157',
                        systemId: 'f82dba31-62d2-4ed0-8626-18e2acc9b861',
                        systemName: 'kshdn2j739nrkxfb6dz0',
                        executionId: 'c4ef3915-3dce-4fb6-9d46-81899f349292',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-17 07:43:22',
                        executionMonitoringStartAt: '2020-07-17 00:48:01',
                        executionMonitoringEndAt: '2020-07-16 18:35:36',
                        status: 'ERROR',
                        name: 'rav6c97u94wfo19eqwug1rihgbl1irifafq3et9jgtv8b629wdvyger2lqvgxmb2v3a441s8opm3itp4t04rl1m60ihdittksfzxvq88lg5200kdapgm09fevmdcwhawrhtzkbyrjw36tghk4e6h95wybb8tgopctsxeokvs5skky1x4j3ddyu2wmp5ye2fc9uqxxjhc7elsglqdxmmp6wa2vvwd3cb023s3zod6yxwmzc3c0mtmsm1f3ddjydh',
                        returnCode: 6114808508,
                        node: 'rqgqtybq6gkmrbnrvit4rzn44a2kv37twfwk1mli8zips105byav887x13hnqnz5ntk2ye1vseqkdpmyztlc5s8lrv7bcy39ay0sn24nf5zghebdk6i8t5dcgogfz5z844ef2dd3slrte5runhghzncm3m64rxrk',
                        user: 'jz83idviw5qm200qer8yl829w2ff6g0smbxcs4wez2cgr4vjfh1br8ksh7uron30mwy5fbcthtmx43byqv9nsbya9qduz3v3gb3nehgh2ho2sqhukx3ts1tm1yvpm5tl67tz5x1vfrandppby9q7bk70sgaq8q04a012vu94jgiw3yn6lzngqcqnsoa7bj5iikeffytn33cvzu43h5ynkx1fxcrfhenrol9zfx32se3dfzk6yn2tk97sqf5i8pp',
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
                        
                        id: '512eec74-36a4-4324-a26a-96bd902670ab',
                        tenantId: '15c9bcab-3822-4a69-b928-d9f745220fc5',
                        systemId: 'edd58579-abe9-4ac4-8cec-4e551419a73d',
                        systemName: 'wu848eivrvl5y9fom5li',
                        executionId: 'ef3e40dc-941c-4477-8f92-602475764ab6',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-17 11:45:29',
                        executionMonitoringStartAt: '2020-07-17 11:38:42',
                        executionMonitoringEndAt: '2020-07-17 13:14:30',
                        status: 'CANCELLED',
                        name: '2p6fz80ylqzfsff5ulnars2diq9fa9t56jn7azeakzl02118utrcbtkerjens252fivwturnfznabz832ax59nmfvssdapucg1fcquyggfu5rr9h03lobruyhjr7nmn7z1lo0megfc5sog062bob0hgtu1vr432kfx1edarw8ttbltzrjh4l13ibpmlvi6q6q6qnx55yk6z1pz6rqawqz59q85a47n5mbmqlvocbgof5zlrf7c8iiv990v3sj1n',
                        returnCode: 3812621759,
                        node: 'u92b5czcel27dnv75oxoyuwsn7833ym7wicydfe78ty89nn33uxqld6ol68t7618nm7vmoqxrrd4w3iom3shkao95he9qcomr75ds3zzqnl0uazqce5wj8uv3f176c272zz12vk8b42x0tzu6800td6lvmv2n6qj',
                        user: 'bzhbl2ds2q4xmj8w390q6ms6maaj413b0zg54mjcl32x2dt1leehw98cz1a2025jd5dz42yl1fzqse0pe93gqgvp7i2b3cmfkdn9st8boq18kscuagdwbst3nvuwx1y7rfeb7l8e43udvhm7hwtwfqtlmy7r1yxn96325ypfbid2lm0zvdz11yv5dwmcstmio611t7w4bk2w0xijoh2ib05nphqjhb8czuwa28cy99lb9tlh8n2ffp7bf7mgi0q',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('512eec74-36a4-4324-a26a-96bd902670ab');
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
                    id: '512eec74-36a4-4324-a26a-96bd902670ab'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('512eec74-36a4-4324-a26a-96bd902670ab');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});