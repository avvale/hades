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
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'ek2hl27l6khcphm6bs2zvy29y9irlg1d5m5w4bufxi9ozcwxpb',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '63nrc8idxrihxx3x5us1',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:52:03',
                executionMonitoringStartAt: '2020-07-29 14:15:26',
                executionMonitoringEndAt: '2020-07-29 09:25:10',
                status: 'CANCELLED',
                name: 't356p7x06suohbyupldc6gpkq69uzrazq83z1bnaswhsw31efwdbt9x7cdhu6ettvr8r2s2yrbaysdijh7q0rw5hqsgg1matyg2g84jg62avshmg89nf5qrpgev2vndklr3k7f2zkmitxcoyxqppungqu6ebq772hkgdnroottdigh8nkm8ztm4rot3h5k3jvelnf951g6hhma9wgr5o4ijl4n4q514yn6q05zpwar8nzcd6um0p3igztj9epw8',
                returnCode: 2531992678,
                node: '4vykztp3pc389idirzmqlocy5qmoii5bfbt2fe0fbkejpzxmqyqx7watw67pr4ddmc257nc0um0o3e142c5kekbounj24iho7zts5esebxmzrcl3d57ct9tes5wtd2cofp9uztiqt9s0xm2aed33iuoh35bf8bgd',
                user: 'v0uj6y3m50ujq1p9sygfqk53cbg3qr8u5kqx2do0bou5xfsqwfuxb38u72y157e4q20bcfaru0cdm426w3f2k2p97d2u06bo6gqxv3g5qwafkq259g42mjl67ewv33ob73t7uxfy8azus1xm3c4dj6qk4r0b2qt0vsdifkhljbjqaetlj2180vj54kp6rlkw0t77up4qjg4svq7lux1p9la8umo63jkpffryar2gs9yxfcfmdxgdqcwb9fkdvyk',
                startAt: '2020-07-28 19:50:59',
                endAt: '2020-07-29 00:50:17',
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
                
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'b321b1stg3z36z425r15u74gluaa4xjsdkst0a2aojoggycmgw',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '6pyoa845f7mhbpowr4e1',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:17:32',
                executionMonitoringStartAt: '2020-07-29 05:37:08',
                executionMonitoringEndAt: '2020-07-29 17:29:17',
                status: 'CANCELLED',
                name: 'jfxtrypz1cur4cpv0wmk03uqhpdj1nt2jufi7w16i3pz3cv18q6stavqwn2hw3fhksyv4331m41n975zad4rb1hpbxnwg2p20c0yzx3he4ye9bqxa57x6gs77767jyte109kiv1lt2d4g21rbfwyn58xeegt9p7v5n3fws7bovo1s8d79xhs8cw7bxo77yinsy6gc4rbkpraml1cpvbb65damd4azdyhvnplo43p3fx0i8f70756im7bqp3jzyu',
                returnCode: 6887820731,
                node: 'osa8f2v7fqbwgismmvckdxqmnijbbb8b0344e8dbbpubd4fr1hkrswg8frsk6l2aze92dzwlctu08sjj42adtg906wfojrvutu4dwd1v0kizicf2ych4aagijjkjcm396hjkas6yoc45o5bbdew041f1gmwwg25c',
                user: 'm3ro9ql4ld9j56gkm14s0qjd05hudd7snf4rb2ockgnbev0utsiguumbv4i5i1fpvur93bhoh2orqeiwmyfqf46ckbz8fza8yvgfwg9rgdkeyux4vt6uewax68kz49akhrgf445riehsn45oo70gpa4r5wlp18528zj4574j0vqt981i5dpjvufqm7zaceiasxnf2knepx7c09tdmt6zcblou6jvrupyxeuaa7q58sy47t75q8g9r9vnpozk43j',
                startAt: '2020-07-29 09:42:29',
                endAt: '2020-07-28 19:34:04',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: null,
                tenantCode: '5w7uwgf92c1tmkjvspzl8hqjik04orofzn8hj83q0w7ajvaxn9',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'khm10sn9fzy8ikeype8b',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:00:37',
                executionMonitoringStartAt: '2020-07-29 12:24:32',
                executionMonitoringEndAt: '2020-07-29 14:58:19',
                status: 'CANCELLED',
                name: 'obxpciq0kvufyc5b9twbmeq0rbplbiu3d5ntpcrsgv1s09a4yugxxw01u8vj9rohcrcbujbbsc42uxqbqk73xvccwpfultviy9z9z1bncc3ho5ayqwt586m2t73ww7pvn9horhlahqrjo7lwcz19vgjbztsar2ggvgb5xw9pvhoemz7v44qt2depuu4ay58ee0qi9e08wcsb6dugh3f50tlqejr380ar2zm978sorp0llmhj0cmtdbtifykekd3',
                returnCode: 4762389850,
                node: '7v7hmgfqeq4eraanc3qictt1bcwvje72fjg7rj0mbsfgp4qg6vohekwi7h6e6ym50npiv2ltp00of6nblt1dw5mx6ukhkwht4vhltocgqf46yu0mg7sl4j7kizjn2zilo97bx191vylk8q3uiq059bzwrffnlm3w',
                user: '0ucvh122bx63g307py8cpdm08eiachzjcbug767kqtclbzoz8241g8tjhhoskfrwry9eusnpf38t4cy9pyk07lf8v052selzoncvdggw054e0qfg7a2ptybghb00jomc6g63qb9u4cdvktwp4d3r15a7ix98f6xzaxo5bguw6fsvwjxrat8ku6nanno1ngdgxx0ou4nvdagafib3ivjs3wf776k5o04r43n7ewcx5xw7705qd6a56rvby1802z9',
                startAt: '2020-07-28 23:01:23',
                endAt: '2020-07-28 18:23:30',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                
                tenantCode: '0nnm2duei96iysm352zvrxu8rdk69iha3vh8a2ki0u60t3qryk',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'imusrkflt92gzadziyo8',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:30:34',
                executionMonitoringStartAt: '2020-07-28 20:09:00',
                executionMonitoringEndAt: '2020-07-29 17:19:09',
                status: 'ERROR',
                name: 'mfmdrnom755pof4vgccldjkj68823depa0mm8gkb77qaa032835fs2uortajqq61njitq241s7vntcr9un2uq0ydjnv73o66rcutgyrnr8nzqucjcs80mzr8lko2s114fo6acummigbfo92s3ajhvy7gipojsawxmpcwvqbniaxaf59jy56hb2yvuih9otrc2eqp898b6icoglcgnim39cpdxd7zrwpd04yei741u0c5gh6zgbxnmf12km4ps0m',
                returnCode: 5091539204,
                node: '09ypbn44fes0p1tvr92eiohzq4m40v5o9nv26c7ozu3ak35232mdxeem9yq95a8rdtll7s9z7toi5bfdxsfal6ayq10ydf3v29aaqyo5wtg0edwzds9u0vbl41xkpyw6c9leuduo6ven7g03cxggc7zfqtmc50bk',
                user: 'pah4hvxn5wycbvm4ydi183kairuo29wkklpu7k6vb6hcxzt2gh84e20r2owssgi4iasajh16bnt9qmsg9fyztkm5uviqj782durmt4jq7abov8hju3rsdnb3pniph25nl32fd3zbdr3q8ote3ki81das5xjvixohs19rl5icsffpopq8e0k8v183tceslhgogv9pzg3odimr6jz4kw7lmktprjkjfbls7ltw3oba5pzeyu2d9gsdzjq7kgvdn8g',
                startAt: '2020-07-29 17:29:45',
                endAt: '2020-07-29 00:42:48',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: null,
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'nlvrpcgj9n1uou2auum2',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:11:18',
                executionMonitoringStartAt: '2020-07-28 23:04:06',
                executionMonitoringEndAt: '2020-07-29 15:07:32',
                status: 'ERROR',
                name: 'q1gstlegutavgr6sjk2hc70tnhawz3lykwmsruf5hk4vv7t8ren0qyoiu0ayjvnnf13253cdud50jdegnh8oeb0ke2wk8c1ggth1s3ohfqj1e5m7uj7nn88pvjq1xqsljtg86z89rdxk0ssrnkb1ks2ehv1q6jo7zsb32q0kjje7i95wgr9j2553w1g422woa2w2savz32qjq8c8ijtbiitgj7uwm1kthzysgn8mcqhgo7fc9758k8am7bmevvc',
                returnCode: 3233511479,
                node: 'lqdp5aor62q2eevij5zinl5o2pr6ponp22nbo2kfmnbkaktzdm5fte1yomt5xnqksyg7b7izthdzqj85fedxb86kizc9y972vkmwk38pmk89hx3bwy01r9zhe9cul5q5c4pik9bemmsclty057seb9a7nugj8qw9',
                user: '0k4xuk4sqemtuqiudizl1uj0g6fg3alxkp3jdu2296lvmntt60ifyvhespnomsk42kh9tcv7imkqdrqmn8b09cnjensii76wiqrrynyja9yymjxpyh7hc76t8m8ry1fz9722do2fxggg4s12vaso4frk0c9njhx5m36fyt4r7eqofvyv0hrrhtw0c85br0wd1un7gp1497t1y145j0d6hyj55len3tucau5ve4jsuy66o6bten5iio0mkqqircy',
                startAt: '2020-07-29 00:59:17',
                endAt: '2020-07-28 21:28:32',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '4amlu31ztr92u2bxkssd',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:23:20',
                executionMonitoringStartAt: '2020-07-29 11:37:55',
                executionMonitoringEndAt: '2020-07-29 17:55:14',
                status: 'CANCELLED',
                name: 'i789frij207w9rva6ok84uu7nz7s8dj45b6c8d7s5jnp73lo11opcmut8ekobxwvv3dk7l1ef7h2cszgyvnbbu9vh8d24qtxq71im3fwolhd6w6pz2vt5hdw25cxuzqfc0ayz73gv6gdj9a4m0nkdilrg20cbrocu2o3d9jn2kch1y1i3z5b54s67ym02gkokf2h0uirb2wr2905mivc7m4uy88ymqxy6v8cug9sn8aja1sgoyqbgo1p0iemav4',
                returnCode: 1208834474,
                node: '0ykhp84k0tp8p3pue14xjv73a3kdic2pr8nu20ahwduv29d4r9a46fyujh9n9hph3uizan0tbzfuzpyu5menubju0mi9grvnx1yt1p68p4pqzb09eqz7n10mlqdv8zaixsgzdcb6nvo3tl428hn1jx1p17fk8jny',
                user: 'esa2la9fka2z2lcxq79l05zhc1kgb1k2d19854sjqpmx1smuqc4tyc87p51hs3yf7v1ys9hjlkaoyc87b1urx7alc71futpci9ati21na2ttcyjw43o9r17n6xt7t0456up8hfdxgfb9sf2jqgmqftr75l31f04gwe5frgmj4n7evu9hfjrcpmhzzonbj4oj7z5jb02810fxdgfq93yhr66t0ffnafmtvi9mnuik7xkhxa40k23r4rhwdc7ahkv',
                startAt: '2020-07-29 14:32:42',
                endAt: '2020-07-29 10:37:37',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: '7qkjyzy8dequdgw0ly7anvfr0e32f3hds2had37rz9ng1g5rrh',
                systemId: null,
                systemName: 'vgmgwby93tt6ohd5feas',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:14:05',
                executionMonitoringStartAt: '2020-07-29 11:04:24',
                executionMonitoringEndAt: '2020-07-28 20:52:54',
                status: 'CANCELLED',
                name: '1lpl50oz77sa30zqxrbu1h5y9pjy1mp5a8xs1rsglk6wxei2z7u0hdfmeu9s5mihzrmjen5nhx4vwj2bb5io6fg97owkrlngiqn743k12slc6bymbvcrd5340am7zk2s1mqzhuxlpj9wawencq8sh0ynyrpg8p7fgk8fbd1c1y4k8xq70u2uvp2utior25fg7zxaog1i502fn5spk0wbq5vh5ztkc0p4j73xy8zzptbpzlkwutr9wp4i51ohyjc',
                returnCode: 8730213892,
                node: 'kmdzo98hkynnayk7j7ee5zlfu0vgpg4cpubak4iub5eyxyz743urvwl5xt49wlfqg4ochz03sm7k4d9h70fby2ird5utnv0uybpe8wsyo0giy9ajlxkaoku44tvsktzyxx5donzmq4su7v5m36woz49hcdrxgocm',
                user: 'ax0wp2127sac9ztoeek83fytq4mil0yw8bqm1llekek73qc6bmikcr3v13cr4uxbkqxw3hfyds0gqkdcq3pefb5jxhjglea2645ez8fwh3bb756o7jr9x83l1wjhss9f8pvovf6gz82sl0bw9gx4qd7iv57gskq3whrd7805ry6wbgacelckj6rd0utagmblytbdpe8xuoensn9n21v3zt47azye4sl6qudbxhk8mih6wc42c517qrlmdqcyvg2',
                startAt: '2020-07-28 18:52:26',
                endAt: '2020-07-29 13:19:16',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: '0ut1fpq0yiw4y3o7oizgy5m7eg2gvt0t4d4iwbzlxih79go6f2',
                
                systemName: '0ox1ctpsm8n8q8kgl7ag',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:49:35',
                executionMonitoringStartAt: '2020-07-29 17:48:57',
                executionMonitoringEndAt: '2020-07-28 23:08:24',
                status: 'ERROR',
                name: '6iurcc5x44cigh2t3q7cbtsi10e55lu3g4nm3gl7xdmsea68wly7dd5icnnsldv2k1pnhj7ho52suv3jof6g36x5nusxwjg9f7u3bmokf6ei3b3cohzebkv52s9vbsvf6oefliawkdfu8fc4gq3d8am8pp7114myru3ff43in69xa2f94qd19esr6q92ipgxiuek87abaywj9zscl4bioarwt736tt61sq2q5ydplp7nlc1or96p4mzw7ioh44w',
                returnCode: 1402094640,
                node: 'qr1x0om7umyr67rhwus4hjeggww4poq3uduj46z91hqgi0k4fy8y6shzgfmn62dn536zy0dnbz315xcvhte5syxaghpuf32pcife2324quweo4fad1tuviv211qo614teppuw60s7y4haz2x9eb1zw195zn4soj3',
                user: 'jlvv5ur4jgahblojehp0h3mi9ptdrgm4488si33nkolk4osdur0kkdixltc97k3hhbenvijwnlmgrpcy4tszq91qauln966g01kl4pywgwt674sgvgqhv2f5u3n2cnb58how80d7bc0qbm0oyyg754db6pivyix0jz8yfudbp27u96snj490u43fc6bbfi4k5t2hc1nj0fnpkc6lvilesfodkb687vzh0i0cmh0x2nycb9s1jwksrp133utnw9c',
                startAt: '2020-07-29 00:18:47',
                endAt: '2020-07-28 20:54:38',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'e1kafaw4rukogh519p0xnxtg2gb2er7juykwhbfadj3m0ud0ks',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: null,
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:59:22',
                executionMonitoringStartAt: '2020-07-29 11:26:07',
                executionMonitoringEndAt: '2020-07-29 04:12:20',
                status: 'COMPLETED',
                name: 'n2dy3td702cwsxud0vqmmvx40vbdvi49uivrdqj3gje97re1l2bh7hl9ctnxvozze88ihjp8eh8j6dus961o9iwz438gj3zovabg4lmhgd8mgdwncyw635pshjkmp9h1me0xkcva5cjrbrjz63j3eltp3puf2qq6ah5j00k1jvkwidcpxkkbnlzt8z7jscpi3gax9fqnkj73jnmqtn0d4owa8fxheyhg0x2j6sc07jfrjzpcmizit1cgn5nmihe',
                returnCode: 8782781412,
                node: '6j565osvwt9lwh5tcnnp5bn3or9y3h2pk3l2f82qlfnipunpd14lxzvch35l9ir8nc92zjyou8squjksgmcx3arf8opejkf8lshvdx9iuf3dj42wp96sw37jw7ied8kiiu81r56lhta2vyr52h5vl5h1lutjllei',
                user: '3n8eqqk9v6hr9k7tnajvt4msoz449qm2giu1xdgbx1dp4132wo4p0yx8k1u1leex4o6bvovfkkk0o4e5tejie8vf2uxfn97o869xpumw5qr7c911vhbpfb3viz74g810cz0tavsa84r1h7gdskroj6zvbs2tnc1sosw05m8syr2sb3ac1d069xvgg9muj0l14v7kptvv3aehgirqxbk6glfx7uqan3ko3mce8tu9dojkkcjydz4c7ryru3jmotd',
                startAt: '2020-07-29 13:19:31',
                endAt: '2020-07-29 08:44:01',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'p5by5tib3q3cev9qllpr0dustc80c5tmtvoqk2inyysmvgg9ab',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:38:24',
                executionMonitoringStartAt: '2020-07-29 09:23:45',
                executionMonitoringEndAt: '2020-07-28 19:14:51',
                status: 'ERROR',
                name: 'a1tx6lnp6e8fvy8um7k8du1ty56liue2dek4zs74kg9hdwvuckr5ibh1ki1spbtmn1lpcpij6pcv0zqtzqwv0awtcdyaohe5dxm275r03w4xlnz4dv5mkr7rvnztw5ajbw9jyt72vx2101sw0t65lee8cc3ue1vggjx6z3wn29napv8etlp0bjw3q09ib04pjr9jjgbnyy8al4zmofdythz8kkap2dku5ia4jbdnh0vnntpi07fuc7hp4wf93wt',
                returnCode: 7159455597,
                node: 'twcvxz08sccqmaxgykg04ffevp1oxnf1szw1pgagav69ku9fsb7nd527gucuj2hqtqp31etoshi02b55c4dm3zce8nyns82c3512v57oixnnyph3hrq9krw0v3bryc3qsr341gmpb8666o4sfffupli0m5u82046',
                user: 'btqc3yt49ebcsqliuehgs0los3icg8ty7wqweenbzbzuoepgyowj84sqh6g987ru1uuowmx70tp1egc0rek404dv9xeqzpfbh7so6ed2363o9lbgdzsmklm8vh5jbetgs1bm8tozxm8eytnrgxaetdua3mghfo0l9myza3f1w75svv1evey2fvb6v8g320botxi1lzilr1rwllf9z6ezc9p8ncsi2y1nd6kgqyivroimlkqfct7opiva9flgs0q',
                startAt: '2020-07-29 00:33:04',
                endAt: '2020-07-29 13:04:11',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: '48ao0oj05zaedrdrs3xfacns5x5a4tapjm3ur6tmfmy8equf2j',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'kfx6rxhqw7faob8ujhfi',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:28:21',
                executionMonitoringStartAt: '2020-07-29 09:29:00',
                executionMonitoringEndAt: '2020-07-29 05:17:12',
                status: 'ERROR',
                name: '7qezsy1yoebn0huk0t89xwxmg716u9uxtbmpjbatkq6tcv2v7888tzgdc5gwetmdh5a24sr8mgwyf95425ezua285q64z7cohvrkrpaagv34tvt4oqxcyyunhg5mg1eceyloqqek72pdebw5rtwuybmnl56ofhqtrtywcgf6ye77ebdhryuw5s4e98hdy9evd9lqnv6v6mgpyt9sodg6d61lrq7tzypgevpq2xdzeu849ptqoqen0f56zmfy01a',
                returnCode: 4089573725,
                node: '3rwskc49djpqzrz14b7c68uueltxhhwcjsshn89cd3yc9534a0s8xmrjt7ry7mu6csltihy1gqtpnrxb2wbozmxqou3t62156q6cao4wovudaam6bab9lpra4ruj2sbicrdcjf8ouito3larju06jm46p5vnx2no',
                user: 'mtoqloee3mqm9dbooxveplz0inohlnjsfnjozftt97zoj4s7b16bs7adapz3rlpau6450b2fhtam0zd8wbesa90117ub5e39fbfynqiwu11e9rpj90v5z7y8s6z7g4r4jwr5o6e5zc681ccbpa9nhgbnbwowoffh1hxtnja6p274q33bj061kufipz245ns1xcvfjig8qt1und69i5w06gh5rov74a7wdzlnpz63fm26o3062pk1p8jr4w16v2t',
                startAt: '2020-07-28 18:47:05',
                endAt: '2020-07-29 03:21:14',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'jw7b3540m1zc3o39rjdpwfkz1f4yqiwhamlfm720iuv573g66k',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '6fj6tiu31w9jt5ywqrdj',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:06:24',
                executionMonitoringStartAt: '2020-07-29 15:11:47',
                executionMonitoringEndAt: '2020-07-29 06:13:57',
                status: 'COMPLETED',
                name: 'gzx4a8w8d0jdcx58bdqpszhgnslzsqqmw3fats8pv8u9rui13kkrdshwf87hop56xq65nixayqt90ofzy2zhq364eg50l7in9byzjt4lfednb2xyx64xtyda6xic0m1xrn2znd62n96k8xyyn45y1wby7yyug6946jqncbhahvg11n4chgnsw8syeg61v3jn5ib260yd85vaupq4874ct8uyi2zmyyn54jvji70uk5uoaej47fs48ljho2wnjfl',
                returnCode: 5373593459,
                node: 'beew5gmhvc5adgggsdoxbst12fkawbshc9uqa0fp7nzkd9knibszf5zix0zd3j168xunlr1956h1sm3sqgq8ecqod3j5qavld1595thupd515vsbdq02mlfkkcexfcbq0wlbx0tkzshmp0dixr820tnr1z9w8dog',
                user: '1kpmphmwdgw2qmgfhayxqgq4zzh9tzt5sy2ikr3i99akblivvhkiygkzv3bvgbm8qkvr5bm1t4g5hl9wtdtezlfg538gf89ohihmkpeummb5d65xub6pr7t5102vm4g89gkip8skqcfx7fijxif0f49a7y1jr4zyxlq8j9xd5rjxid0ly4779mosu5fz9cus4wqwzjnu0hcny74iwkklgxdpjul6e4kfajoka03828ayvhppophtzkxskl7hedk',
                startAt: '2020-07-28 21:52:18',
                endAt: '2020-07-29 03:17:51',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'b1t6atn05e8fh9fav096gq9uxt1bfwn6bqllqsw52jdo1xogdl',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '8y3bxnw6gmt4qj1ol9ny',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: null,
                executionExecutedAt: '2020-07-29 17:07:01',
                executionMonitoringStartAt: '2020-07-28 21:31:48',
                executionMonitoringEndAt: '2020-07-28 21:54:45',
                status: 'ERROR',
                name: 'dltqaswpk0k8hf4zuidfgov6iffif0y3zmipgputs2niq62vdjozv08v52szdc450h8ejyke459zuf5t6b6oytqc3eidk37yg7b553m7cp4ycqxkxoq8rgzr4kt5fst87ick40inu51fnui0r9aa18q16s6akt2p7ayv0pudiblklymzj01emxowdcenu1f98kbzya25rtqy4f73uxqypwpxgrz5kbi4pbx7uz55zd3bdamq9my9ons16g5cu1q',
                returnCode: 1080891470,
                node: 'vut9gw4o01o0xmbu3u8ephw0bobswbabhsgvq2p0zg1hg1j1b9odg2j151ekzdsr0dw6f7s5i1k7fnf4my5v6fejrs9tw3t57oll8ncb8yztxlrunc74oegam9olgzv6317819pgsyaig0kfzzo4w4rhzjzoebww',
                user: '6iqb37buv4jvk1prfj9pk7q5sjuhcz09hoxjyn5cl52xvdqlvjblgyt3bdfmj4c0nbtxrpcvh6rduy0s60gh221rdyvtftn5wfk2rto7n4891epqgai5ibzic9h88addb1sfaxvstqwyjicyufb231qubfuj7846hhur4wa81pdy41bzqjq1s7z72595avfdc419bjyo010e3ckt1vqj3qjnxkrqzgvzt2ixrwnmnc4kk1ohz5frvoz8lvoltic',
                startAt: '2020-07-29 03:48:23',
                endAt: '2020-07-28 20:27:17',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: '17i9pichrnyvqghntjrepigrob7suvuf2wt157flvtpodyi7j6',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'n5pvtz17p62rtvw11psc',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                
                executionExecutedAt: '2020-07-28 23:46:30',
                executionMonitoringStartAt: '2020-07-29 16:40:40',
                executionMonitoringEndAt: '2020-07-29 15:52:41',
                status: 'ERROR',
                name: 'szi50o8kys2v7bx58mmmqpcuo0g2xk3fp7bu7wh1tglz4a2wy6j0u2wgo4v4p4nsjdvl7dp5p3nh1t2dyw1oypiaj0xt505qhra7y6py505ttdrop1qjeeukdgx78buluaw293x5a9gckf7ibg3ym1ioq9n2zop26e5nc2ey4jwen30m2pe7u87kz0y46iyl1j94wzbcxlsl3esa6eanvdf8nt63d9pkjep6328pgdvzpwlnzqiwooq8w6wqvvu',
                returnCode: 1557382156,
                node: 'i1ebdcepphr4kc133gqxu569ief73kb3t9all48mkrin0ujjb2xqddqjd41oq667z2u12kxk7qic8jy2er5tcdglncfy9fvtons1mba9w1gr5zob74qdxgcn3y8vainun3e7xufywnrwnnglznnlh59ihdlv026r',
                user: 'ixdzegh7lz5cze9js3uz4wichpzo81tyuc91pvkmy3wobvyl6asur0sj59ahbxn99zextpskbkjxdwfue6q1jfbciahzdlviy4mx9d91bigrwdtel9jeueem9t2jhy2jpbedbs9b7238cukxkvnpdzkntq9ss5k0du3gnm4z4x3br667sypkexg12ufeqa16kiyhmqp80hpbcdspnqojgm573qwod7eqgq1phhjt78tpq9vp41hev9zwshjnj9c',
                startAt: '2020-07-29 11:39:42',
                endAt: '2020-07-29 08:01:49',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'gs3zm5or4wz46an7w201vu0x5bdso3ric0rqaaf0qnptgprnov',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'kz1uyaxstgf7t171944s',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 14:12:37',
                executionMonitoringEndAt: '2020-07-29 00:02:03',
                status: 'ERROR',
                name: '7v3pxzoxknvhanrgt53eywws4hoia5liyg3vkxh41gcw19vgawbnf1zhor80ggpfo0n18rs8nulquntkcxi30xrv9zdzbluywhqhzylm4sgl02ehnkixx88qo3y6qz9t45hwaf9wkfjqpeeh0druysbvlcim443co1nazz66kqjvo6x3pbytp3lc6iv5ny3s52tn6xtz6s1rvfaohlzoa95mklru1c65sk9elontmfohrjqdcezuow1begw7134',
                returnCode: 4819409544,
                node: 'tvv719f0etnt5bogaieybcbvof4z2kwf3jba55db594t7mckpgsfk5hpso1gkvw8m87bh1mqqcd4etqge2v6ddhpm22qku8kuy7xwy3me212hwc9gamrzfm28epu4t927tap0p25ybw3wd7jphdrnwdvbjpi3gan',
                user: 'ha25uxcu2kzolphor34dxl0hl81m5a2qronextqllgu8918kgv6vnc0dj3fizds4d2ahcu7u8scciel2n5tu08lpn4qu5q5cman6qkmn0sh8m6z7xricemh7z0cvczcxd0j40bnhj9ukxizutpcsbmdi7nqf8muz1h0ifwzs0alkr4chliwbsg88n8yq0i57n89prq0dvfva5a3bekjydaptca9i4mwlyt4u8syedgm00bc40t5yhxgj5o81o0w',
                startAt: '2020-07-28 23:57:55',
                endAt: '2020-07-29 00:33:20',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'c4n47l4cs0ogq3hvx43zfhfai5z1tyvtn5qh3g57kn84ajsb9w',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'f9uqdfyfbnwmtadbuwcj',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 07:50:22',
                executionMonitoringEndAt: '2020-07-29 02:29:35',
                status: 'CANCELLED',
                name: 'ikuyzkj89cp5m0b84d4m8yge6ynqybs0e6pl9cxnjav5ou36hgp8bfodfrussnxgsio3ck0u10ghfcvwivibom6bncpsyrtbu4vlob3vqw699esyh3pqamhjzzhtvnpnr8w33ez18epw0q65foih6i858snbjq8ujjyjxcenikgc2ce2jj7r6dv8l5ql1z5ryx3023b04ru8v7umqofhqk6mv78hqxxkl14q66uraj59x94rrut5yearyqeqpxz',
                returnCode: 8325440940,
                node: 't4y5gzgo5xyekffxqaes3e3kn11hcisnbcv9cxzsr3meyaovytky2d3duui9hve4txl61rh0wo3nztcqjl7noaaah06brsyryqo06p0n9sxiatzo8bs78ugjy28g1fll65oc8pbputsihmx1eg9zfxehjj69kf70',
                user: 'vtejcqbzz8n1shle12thwuw7zdqkx2be4o3eaihwxozl6o46dkxgp4w4lwa8l1c49t0pwkbm8fyxy1rc6mx053w96jb2o12598nx69cof0l8bv3j5ws8mwcrviwp7s6b7wu10i5ln3ilyzh8takoqcqm4yh9xe5qys8uuajk3axts0rfn4dowtqtgalwxqb6cb5w0qbpiz4yahlm074uk4gfpteepenixwfmsfz5k4vunj7z8tgjdatdsrkmyqg',
                startAt: '2020-07-29 04:08:18',
                endAt: '2020-07-29 07:14:07',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'pbxcjwnt0o3vyze4jzliiszx6nruzpgumpo8x94batw9vzk4ej',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'vd68kq4cqlmg2mhxys6h',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:30:49',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 10:14:12',
                status: 'CANCELLED',
                name: 'cwy4g62h61sbakkhwvuwa9r1efqwdrqnvzt3rge20t3580ktnrzv3j9j8r8ggeyo3ozt13mhrv37senwa7n7j69pqyq1m9rsskdwn5f2x0wbwzleayqfcf9vvkj7g0pds2dczslb37na210whfyf9xawsoda0fxadkdxxkukago9pfjyrcil36mztmy7nbjyve4tp5xo7tdot7nlqxqvw4rjpts0lr71rdy1vp0jf3fmcmkkk5voz9goqj6pcod',
                returnCode: 4082802473,
                node: 'zb986hyag4o570kqg6irn2tfz5oxvv2ops7anwh4vpo6gylwtpoij8z1lzrx16i0fzryp5r3iod8f8s7a2v5d3xja59lv11al1xr6ghauxaxkgpni7ngj127d4eyk7mswvo2xfjeygo0hu6n265g3x9ywpz1eqhi',
                user: 'n78emr4tkzku4uwitgiic84nice1bexcwnstas1jrizwww9i4z2n2no1okrut1wgy90qotnsfxkdxt9grx5hbdt2v2cu36xapnrdclz66qfno1nqn86q5u6gweymhe8s4rge2p4rk61wy5xmnr8v2g5uvqbljk5988id3s8inrgouoxh8uq7rp9j1jn3mudykgoxwr7tmwydkfvpm71jlg2ybuxovmn02c9j5stnctfwik8zalc3r735m7nk6l4',
                startAt: '2020-07-29 13:06:00',
                endAt: '2020-07-29 03:42:05',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'fnfs2hzd1qprtgcvb4i4szinj3xcttswlufpv4k7tevm97ndno',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'rjw3jns84rrx4rjglnse',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:25:16',
                
                executionMonitoringEndAt: '2020-07-29 03:41:34',
                status: 'CANCELLED',
                name: 'fsxflh3v56ms9r70n7if58ezrgnd1uu2ya1zei6itdhz0ggu6vlm6oziui28885r1f10drjej7yfs9jw8cvx4413gvvc6pyimq2f1ugphohsaorh8kho0ugfh6034iorgm1he1z1z09rydwvsmydde42c2xlf2vpz4nmo9e8n4m6ri9jqrkyvq4to857k8h5vqe22kgrif05mkk9y1coy8ynpoo5xvmhynel5cn836h88qwyz0s4jnhb6rxp6wp',
                returnCode: 4718750509,
                node: 'wefo5ohlfa80r29hmrwunvbgpilhhecxpjcfnngjf33gkhwali8k2ic5bx1trvqmlk6928ok0rvtaamfy9d0r3x9desf5hmsg325ag4k3w1y5uba355bdhkap9jud3zmy3q1fb9ngr2jfyn847wnv9jxyj7893ui',
                user: 'c3b53z5cei7fupb1smcykai7vosr1ymnjoqnteb0iqaan2onj96lgimswnex3jspv5o5hbdo5ts7fot5j0dhiuy21etpj9z0cnhqxnfa4byhpmmym6fcpodiefdh0prvjbd2lgggbinazboeovof5d0e3xpzd0ig4e5dffrfk37xyfwc15z3ccyr1qftu33zsr6crhlnpoy54m3y54pdu8yhgw5odoccdt2b71ykipyi9t4ixrdtznjodl0rmvp',
                startAt: '2020-07-29 10:04:22',
                endAt: '2020-07-29 05:57:52',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: '1sk45b65p6scmcx79rw5qyh3cqyyipg768v19595nidvcnuv21',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '2e1taqml001sv7022zp1',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:33:40',
                executionMonitoringStartAt: '2020-07-29 07:56:14',
                executionMonitoringEndAt: null,
                status: 'CANCELLED',
                name: 'qso02xdcx9agbgees1lu800yfo8r61gspbq4ecre4ohu0o4dnmzqkkz00scb9lr4881wdkjrzsqdsxlj7ir0d4m3uxb8al3zrspouqfjn9lii1pcdltbjv42x4o8e8z03agx8q851cipo0vbo16q7amclwrd3rx714pfk83p3x7ktvzrguij1nxn8hl3lowxkmr0k64hc6l56g28xf1hioi74wkvh44oh0ab0ajtt7agmz1hazt9vb3tyil8t7j',
                returnCode: 8806487139,
                node: 'y3ey8kvl5owc7dg46oyzeimtwpt5xf9zeohkvo9uyse5a2vpw2hbbqqivq2norx5c93m9gqiccyy5l7hvhd26xzmweinr1nug4gae40kvhbrvsn46u21avyy37p7bht0ijkorsm5dqceduu3vpjj7ic1hke00pv8',
                user: 'kz8ug6kpfv4ye0hcqvrunucq3soejskphaigwvr2zl5l83svch7cn7uvd1adpnxpr2nhzyano1sg1c3ojeu1j7mmitph0ka6sylw9567zbkxe625sbbhk498zdbxxpt2tq2s23ga1fcr6kjzv7o1fowvpg6y6aua2icm6szb5n0astok0jwnq3kvkrw751lc4s2g3ujy0xv25ixvhx0e37q2bxk9bwqi2u83wa9404ab54bfk75bgw9b0ij1dgx',
                startAt: '2020-07-29 15:48:43',
                endAt: '2020-07-29 02:53:41',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: '1r8t8x27j4ycp1jchd8t8fup8fc5kk3czp9iwwn0ma01zqlmi1',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'awzpmsbcvl6aiyp8u9gi',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:56:16',
                executionMonitoringStartAt: '2020-07-29 02:15:41',
                
                status: 'COMPLETED',
                name: 'sd29kduhcjsgntzsh0z7cn4n2d8bddknh87rli6aof8js4byiqpnf6xi8iv5de4sqivsvlzvx2kyvj9c1nc8xbsroxcd5lk2vtg0igwc6zh5owk3637yfpg1eq4qnff9vxlijlqq9qcjyfglyoawsb37krvlhsrvbgyc2q3x5bs8fsrpunx7jz2mglbykros33tg0niec7kk06630xse7y6i6zo842gz5132ou1yguvwhhl085qg2hjabsz4p7x',
                returnCode: 6876526059,
                node: 'jkd91bckp9xgstks5nf1ofgvhzczc7fyn1xkm1eeerby729k0qy6a85z1pft0ypq6obsqd0ipwb7vx3c1d311emy3367699a2x20yuc97ewe5ppl4i0myhzyttdfdypogcid36ff398r4wo75d77f1rsiuf6g77e',
                user: 'rmo62x95olum43194l2cqc6tt80myy7xe5gx6pkv04syhzy16cm80jueh53d7dlxrdjenvelwgjld7e04220njffl9suns5u6oi3xvwlw20vtvgt9e88qxidddgs1zn2q9z3c0p8g3cx7pa74eri1degj4pxzrrpiu2mx9p88qdudh2132t08glsrycz16qn7an0xjs7zvp7dc59zat51711p0pn1kv830wazwkvagybt48jiirjhlv1h6g17ms',
                startAt: '2020-07-28 23:55:52',
                endAt: '2020-07-29 16:45:19',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'kbwre7dc1lpp25605rcy60e75nhaxken1nrmg7f6xg9aqsp5lh',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'sb5ze4ayd7chrr8jz3fr',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:13:05',
                executionMonitoringStartAt: '2020-07-29 13:45:51',
                executionMonitoringEndAt: '2020-07-29 15:42:07',
                status: null,
                name: 'awrmgoe7uqd609hfzf4rfdzzt9fkd7w9goee0degy5pls0moxtfek67jihazoyvcc8osqj4xsdfsmk2wwposjnoj8z4vbs5uwvj5hgv6d05in849c54us0isve16sc4iliyt7uruo7ej98tc6cnmzb17yyfbx2witvsdd2tdeqdxreyypflj7fkbnnm5j0r3av3m792g4y7630fh326kqn1k5vzt8op9x99urvtfsgbz3gp7akiwvyft3cuzc0h',
                returnCode: 3348862600,
                node: 'er3llte9ut04wgezomi7e9pnz10qbc7p01xi1qg7xrff04cm207p220xc2vrinmwg0eyy6d08xnzf9hxiy0uub92qxtqineby5l66vuuueiw4y616erpt1bf2i9njwtxjriwrn48h8bxaia798gwe0u1gd6r3tac',
                user: 'kwg7usa5dtba8vz5pedlv3l4kobkk28wdzmmnpcviz81phg27e6n8vbzkprnuflo3o17fzthf7yywg76ignfhfds23yx360dmidu41bl6bnyv4wzvh67uss1mdj6kxhyj756qo2rq0ppx1pccupvbp6imhuxw7j59vyj32izczaup06sm877qlvhyf1aq3qe0h1jzoo8wwzyp6quuyr5uguj62rvb9umte0itqky05j0qxsvt60kdpfk26oyedz',
                startAt: '2020-07-29 05:13:30',
                endAt: '2020-07-29 12:34:06',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'nndwxr9lwkwjobm429v3t26d8m7p03ynxf9gv1m7yvj1juv4dx',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '2fx3qs44lu410n3vieai',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:12:00',
                executionMonitoringStartAt: '2020-07-29 16:16:00',
                executionMonitoringEndAt: '2020-07-28 21:02:23',
                
                name: 'qd12uooetlx1jpjf729gfyjbtwyibopo00l8melkw88dj433edalyy36emx28zpu7471vn9zpkk5xk8yaom3mud594rtu94s63ribn8h5gktefvx29nql1ellfeu6ms0pfmvpepev1pz2ngbvkclfu94quucwzsl0mbc9njvvi9ra1nputa863dih4h3dcfwabnpv1cvantafn5jqn7frh4kc0rg53if17ijvwmtenuokffehknqt20or1yha4f',
                returnCode: 4333160778,
                node: 'h0rqs5ke8y3zet9aukxnhxnbwy3ikflwmjaicl7qdexa81l22lna8ac9gj4ue7lik7nxvga8f84z0ktjgupwoesl4htqowugw4li8km1wlvnxey92zhsg1gi7dox5uijuubg0vkzfb6s59sdqc0y2w1xok1i23yf',
                user: 'wekynkpvdi8ejv8tnhlwtvvq1evboc9ythj2b0wifydb0qqd4175juy4qyj1yqgu2u93blo366khybcmtsqhr0xd9yomz2d31qz4rail3lqrkj1f5tvlbm81nemjfhh2wdb3cv79qfdun1fdhjcveg8c9g31zfecnderykaaon4oh2y2z6wwhv1nhjd4u2ugfx5ck5owgufychec6w5w1ijpotcpbzvb7366uvdqf8t8x5sa2tdlc3csm0izq83',
                startAt: '2020-07-29 03:47:15',
                endAt: '2020-07-29 07:57:15',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'cp1o4n155lcotw4turi3ljie2u0em2w2or3wl5ux3d3fw4y1qw',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'qvsar58xzb9kvq4exlr1',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:50:07',
                executionMonitoringStartAt: '2020-07-29 00:07:51',
                executionMonitoringEndAt: '2020-07-29 09:19:07',
                status: 'CANCELLED',
                name: 'dyuf7eq40f8ctbqf24ignusocrsm43ukg0idfm7nt2r3xoffovm4b5omm74hdrqqg4rzs1l5712n3qmwbgsfe4mxcvoa1lp6xtz4deajbm3nwuwr9r2xjo8jwxamm7x3yqeaathuht0bsfwuoreuhbzsl256255xh5d7li7czdkdrxcea6pgup0en8sak2v0pbe7edel5xnkbeic91et4xivt582r8gvu1yjp9li5qmjba6ractl5te9i66e341',
                returnCode: 9561691882,
                node: '6awuxg1xzb6xgs8lr73bntefrrwobkdwnl0hytodh022n2pemzijlws36fobgk1kzvnvck0xh4sijxt6vmazjdodbtyo0222sgtpn15kf60vqjglhlitnqep13g1laa1o927pfn1pcniij1i45trsvky329xvxub',
                user: '6v0j6z1ph3nqvd87zi2vj22y9bbaqufqx5vcx2zmxa7pkoju560pokfv2y4zkor1pjch3jmflugtgzb6a33fzmw91y09fwrxw1og22vutsocii99se18jsnypmh4hknnucclxmmd495c449zdq65ptxtqxgcbb3hadd5tycmohpc5xgc7dafprecnl8br2p0uz911w210vuoxof5bc380ccnpebqwcpdrhddi8ms55zz7y8b2y778k0enb14sh9',
                startAt: null,
                endAt: '2020-07-29 02:03:51',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'tfvk19d0138sabq9rz3qdl24u3rhg0ovrdd3c5ongdrkbkd6mv',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '5l6b66rtoufpqzyy4g8j',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:43:54',
                executionMonitoringStartAt: '2020-07-29 06:23:10',
                executionMonitoringEndAt: '2020-07-29 09:01:30',
                status: 'ERROR',
                name: 'pa4y1pnly20bbt9xemvp8d6mub81euzsceuj479hgh050itlz4qrk5jkgjfkpqorar84hoh976g0dz6bxpi49nzpy1x4w2rpnhyab0aobkdso0buj45lpgnk7bsdbcwtpl7sim5xj9akbmrafsipdx7c9v8vfiy56ci9yyotp9jo3gnxrgxw8k014220xbc36v05hcytxi97kkdfuw472jqm28jhac74q4fdeobvfch6ijfcwsr8mltm4revqw9',
                returnCode: 1111507702,
                node: 'dpz54yqwvbu73tdp578mub4iqy9x42bw7vqok19ojhrndx76o2lrso40522jdclix504mdzhbfh8o9d6i11w8xbl3uoysijb1598dtj9jkyw7r73g16ubyixoantnow4c7xuibsuonam0qboko2nyyroidrvhnbo',
                user: 'ibzzkrhc7f8uuc7z3y79dyg5s8r4aq74gvyevvs7uslk9pcgd897ll0dq2qs6nk06cwm4s1xbipaoobci15uq271s1oja11l32zig822vmbmhudkmeducladicdwv0y1mjv59mhaz28bsfzfh8vg99zp5k93iq24b1spdq93j59ijehio2t3utmlg01zy9n8i756i1i2esovko5kdkqfanx73rlop5xsxsqynek2x9tpnyf8dwh364zkpzy8bhe',
                
                endAt: '2020-07-28 19:36:46',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'fnxhpzti22sp2j0iil0p27vme25lzsfh3sijm395wfbhcdezct',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '6c3eafoqq2gd2xpdb6j5',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:30:15',
                executionMonitoringStartAt: '2020-07-29 05:45:11',
                executionMonitoringEndAt: '2020-07-28 20:11:50',
                status: 'CANCELLED',
                name: 'jb87hplhlxy0nkvq1acg651wetmf5mo48y2ta2ss2gt6xymlayic8n9z8aki8nitm3tvca36d4usmb101gdf114efyc0uz6iuyupanjckxouy2dsxuunftax8nbkhgj2ousi4eelw0l7na6xelsl126zqf8r2ee1nqipqrtmcik82yk21yxg429uztn00do6rvfa3sg7bbt5i5sgyvga3vaobtn1k1dy4w29mgfatvhsae648e2ha5gzvkvk6u0',
                returnCode: 7140866051,
                node: 'zjqv77ogl6r4d1p2lwzuinomagwb1pg648bgkes8pevij898sm1vsoa84w3ozmtndxn9j1f7qq1srbw1z2aangmevc0ia9bb97l1k5slzxzn1xr0uees78e75g21x6aoiso2yt8fh3ofgerobp2pectpk3o6vaxt',
                user: 'bx5gd0jiv5bwjdtxleb0fmbg1x78mqfg4x9b03qoud4386tt89er5n0ggxw51b1e17homiyzzrzzzukcnax5cdodzw1loe6axueafwhragtpzrgs01mbfqqlrvnrh245w7t5jtztb16dpbwf7q8abn4gxc4f5ywxv12de45nch2wnjzcqh3e4p8moagwvmiakb26zuh6aw33k22jvndvtewcwkqg3nx3wg4sdjexkd9x9t6awfdt6ln0lbwhyhs',
                startAt: '2020-07-29 15:57:08',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'ysbyjovqhkc0h6zongpkpzx4yt7y40idewakhhpksw2snnbeb0',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'x8vebxsdk7o9k3imwj9h',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:53:13',
                executionMonitoringStartAt: '2020-07-29 05:42:00',
                executionMonitoringEndAt: '2020-07-28 18:53:02',
                status: 'COMPLETED',
                name: 'hqpwhj2s3vhioenhsu5fld393hc6u33e7dqds68ccplanyorea5vjncgm35v46k8y7aquqeybp0r9yfdwnxvwn7apeib2vdejt4bnu4q37t40ynjw1j5349m0hb0fxcrtrdnckq1tgaa20hk1c2axykuf2s0e5lrl5h10ubjvoqy8hhwhoqqfh53v2pjhi501sfisdyrhkyryznv3aywcin80rtwxwtklw5zy357j9y69x9qi8zpt4suddsghlz',
                returnCode: 1435195079,
                node: 'u241kuax1wjacc31213r56dfi9ilumop7stts9a5zzu9isrrxvm4fz1e0gj9sbkfbr3ez9gy8iq892b3r4dc2516beu9cror4setlb3tgruqip69pmgbg1uqzvqwguo2hna40gqjd9bnhsxsk6wvid9knfse7p07',
                user: 'srq44lldtuhj96v0c21oz3euih4u4bn7z3pwz1e6ug70gyqsfzwqseha0h97k3568wc6of1jwckokzdy3qgy35wprpgv70ovnvof595txc7aq2c24rncer16kd887eeocdi9pot6cv7287391n33g9bjh94jfowpndrqh07numz80g09vsu5raz7vz8dh3fu1zxregs321j9ye5e64r1skx5wppf92vcfl9dj2w3w922wqx6a7bi5g13pn20p3w',
                startAt: '2020-07-29 11:32:01',
                
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
                id: '4g5jbidokq6muqz4zl6f2lnly70zec1a88s5x',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'av98270m7g7t1jlzpvji7q7n4dufyfnqigobdzro90zppm64gp',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '3g9rtaqv0hkehor9m1dp',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:45:58',
                executionMonitoringStartAt: '2020-07-29 01:15:45',
                executionMonitoringEndAt: '2020-07-29 00:49:23',
                status: 'ERROR',
                name: 'fisi4tq9u79tnmypf3usg309oi6803lfagm6qohkx0ecrswrza2w32d5soxzm9nrbfevzql4r79ezjlje214ogkzx7vafgpf93q6wahvl294ncilakag56jv9eqq4r94qz71dr51pyn8105585pshvw4h8kaalofdqviey4yz5bj70cxwjzp1ue697l4mt046g5fywwabv63mxqhvsqltwvoqrfigz3tkcjzy31bqlik8k7ldi4nnapyb9d3a27',
                returnCode: 5727688267,
                node: '51bhf1t2bydkl5fj187m09gyckcmrj1ho155uchhlxhopamctoy65uwwk4h5pfffirmilu74b7wgfuxamffcdcj183r7somitcks6qol879m54s50rvpcsot01d5m7bfvri2pqt660938rb54n4nttbeeethl474',
                user: 'qio046zembkybakxzut4k0kewkql9qplwzetjtedooetyso34sda04cg45qfjijuy50rw9s6st5xspkv1eucmfpycmufyhq5asr5puskz0fitk5h1ehzbqmdsuxatjzjbfzxkhyhfoo3cwz7txteewzjovbigf1ab67j86fiazy1qrffhe8olatwswldijraihwslb6756l9pfpcb6fk4ew9mj934nyafdip5s5r75ctem33d8cn15qtwukfl0q',
                startAt: '2020-07-29 16:08:26',
                endAt: '2020-07-29 03:07:41',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'sgy484zxhymjk6tdkz68k57oaadzj7gam6vg2',
                tenantCode: 'yw36w03ci9jmaij8h0gzolsz1q8pv487qtiv9bhf7kdti41xqu',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'qi0euiaa9qzvta4kpomb',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:20:53',
                executionMonitoringStartAt: '2020-07-29 02:11:19',
                executionMonitoringEndAt: '2020-07-28 21:38:57',
                status: 'CANCELLED',
                name: 'lsfojzs9c8gv4zl00lza9pl8ec1bf3ehlucjpejcsvob7tcrgg88bl1o32b6euts0vgijioe2pjcdxkzwb7vq3sdb02tgs1kws75wmddk93m5y7h6j3ar0yw05b0ebsmqcb578cs7pudwiigaptsyzzndvbukwxvjpkmfm1ae088wet7bpm3a04f8r9xvdszovna3phtoiyfhcvkdjpr8k79cbncrz0nrv75vmedkqzecycez5udt4wjn2jf9dh',
                returnCode: 4852016329,
                node: 'kcgdjqubwqwdpp40ndp5lcjod2kaaexbkmimtyy9vednuw3bqdujy1g0kowlhajn47v7g3zjje00s5p6ldkyf613j8iw3pr7yq7k04qb7gbazw4s2t1xo5015h3p0vdtk3ymxj1zur3ep8oovg6pt9584ypprcd5',
                user: '3x7pvkeurbn629cyajh0d1rvkfv9gtuqqrs4knhzsw8byyr7qyew1y2vale7maizj69qy4fsc9utp2n5xsktblikjez33lylm93d8ct9697lau4vrug8vz7292uw7gnnqb9g6y6p3feutszszzgr297pwvwbriegiqx2zirkaz42ol39cqm34iov69zqwb8rnw5n6ef8t1blakceyhex233nzbr33c2z0945ne1lykc67d8q10cplgexc78kcoq',
                startAt: '2020-07-28 22:17:53',
                endAt: '2020-07-29 00:16:10',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: '9iygg6oh6n9z9lklj41madejsj8riwutnw4hin5z38igfvphu3',
                systemId: '62dhcpyarab911tm8toep3dwbr6mz0mjqurci',
                systemName: '5qj9lawjsz9hydzg8hg3',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:45:16',
                executionMonitoringStartAt: '2020-07-29 03:16:55',
                executionMonitoringEndAt: '2020-07-29 06:15:53',
                status: 'COMPLETED',
                name: 'j71qo3gmu4ttayo53s8h5fnllitg0g2g8ucejzu3h9geyjvt8a512p9q87lw9g0l2kf1qwgknxoaeh4vlzym14704kukmgccylbr83md8frbwfrpg7k3kx6ocijh1uisrtrsimlnvpgat1l03n07bjn9zuepig6j8e7pw579p8blz1on1xea37zpb6opfxf291ih3a6of5rchtffyaadtlr2ee7z148bo5awflf18xtw9e7uox54wedmakyhchp',
                returnCode: 2896172805,
                node: '4mgxgz7em92o6gb4so2p4fc5ejufbrcoqa9nfhe6t0p1g5tyfriikch85cnb40kzqfhmpoptxfuzw81r8p1wct686oplyekrbox9g3yre2yfcxn7ei7yoqdpl257a64883djt4g9kv90ypzplnlmyvvtab6l9sby',
                user: 'eyw8ys7muzub63k08fa6mn6pwbsjbin6ic3x78dsyesvufux1owa9te03927ho5spu6030zntwge0fd2uk22vxj64vlqejpph5m7y6obl5zv5sf3wsuaxu4ujfa8zc26144x7xny09hitupontjn9p3ek7i6g5zu6iq3p188w4vlk44xionu798efc69ummucihove3op4xevoww9xrv5geel8p100b4kayymedg79pa1o31jyfhi89rlc2p2lh',
                startAt: '2020-07-29 13:54:48',
                endAt: '2020-07-29 14:16:30',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: '020tct4nuqddlypg8xa4ni9gwn6xma6tgeabxhd29d3j0yw85g',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'pifcg300ccdxemsnozif',
                executionId: '5xtnmw0jscm2v67san5o4jqrl6ronkjuky7x5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:17:54',
                executionMonitoringStartAt: '2020-07-29 13:09:15',
                executionMonitoringEndAt: '2020-07-29 16:10:16',
                status: 'COMPLETED',
                name: '6vxmfj1pq7y0efi00hca4e2ww0ai20wbrh3ql9pjfwlwnwfgrtoc0tqw066iafnkt2f9vl6dt1bpxent0qb9qcw76ssnvzlv54ize030zq8fq3glk8h8u31vias2cjw5psqp2cgcs4j3lseu2uo6mxxad83gbdwywrce5ttfask8nr7tebnu3yl4ww4gej4zgshp5bu4pqyedkkq1acu62ktpd0f36nzsvmjxxl6sr37xb2689ybljsjaxevwsw',
                returnCode: 2570229502,
                node: 'b5btf3azh8drfajcukhhff52yo366yjik5afv9lslod9uc598rriea3scpm02kko25d15ibhsjg8trdfsjc6rg8wn0f8a21wufqu2bv8uno0bf0lsknhdqvqy5w02rfjur0wouo3l1zy67hbf9kwugy66c9cwtq9',
                user: 'axby1y7uj8luqhyxqfpsjpas6gs1fohofrc2w18qd8efa4mfo6qdpxvy2yataw6b50h1bbxllufdm8nprh5d3hk3jceaoit2lkoiznrukgbc1koe7gb1wpb9h1tcb6twwhs6jcbbw0tkmu4vx6w584mzu7ql0th3i5b9e9fpimbk7ybgxm5yojhlhqvrfqolmh2gdok383ufqwz6r1vyizg3qvwulp92w02kpjejymddo0nwdzjytxdj3wlh7fm',
                startAt: '2020-07-29 15:51:39',
                endAt: '2020-07-29 01:38:59',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'k46lpox9mr8fpfyg2zdk3n1livazejh0wgslk5me99oc16ioobb',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '8kc7clbporjs6z9bm3qu',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:06:24',
                executionMonitoringStartAt: '2020-07-29 04:54:45',
                executionMonitoringEndAt: '2020-07-29 17:01:47',
                status: 'COMPLETED',
                name: 'pl82yk1x9mz3qcn8vgszri35s48wglbp793knun7zz1w43k47po8vodwyp2f8upecbzfunfsu5ckilro73lpg70jb150dka1uroxcgny59j87twr56542mj0aq4zp5u9ykx9kw4jxc4v071qtv7easbjbt0fuyrp6q8y0htzkjnxmc0y0lhggtnkw9fne31mjhdb0wpt2qqxfszblp5b8nww5fe0sdkob5iz0shyq8ltx679s8g2bol3vvupk8t',
                returnCode: 1077981266,
                node: 'pp2aggv1ad239bi0171mea45uq4nt9y27gc9u9hmjqa03rhmnk8p3n54n3qjbxijv88px8jug0r8dd7wcf9rvjx4cz95c7qyeookyqsxc8nlu4ti2cjh84b69rh2snp8wupvmv9qbufo02e5vna9gy0mz2kpe7h8',
                user: 'wu1t2r0fv2puhsf8s2tjnvz211wgc8iasaezcm8p2vdpqjbi4vcygu4udps6tubhhcn4dc8h99zkxoylbybzg6xpgbadildfltq3u16yeox3clyqus93i8zsmogqfoku3thp8o7xfmpj9l13mj4habxyyahu6w0kculmpqybfilknx60pt2ryldecfc0fiv4ktcoot00453afixtfr5vf9tn88q5p2iblstzvwbc220sqhplet4uvgqv9isiri2',
                startAt: '2020-07-29 02:12:14',
                endAt: '2020-07-29 05:35:08',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'jitq1zuv0526ft9i8dj7n6eoipigcukl25uk9x4r5d31hdlxy7',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '4zvaynyhaogeid7m82x85',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:46:43',
                executionMonitoringStartAt: '2020-07-29 15:54:43',
                executionMonitoringEndAt: '2020-07-29 02:38:20',
                status: 'COMPLETED',
                name: 'vdj8mmz42iwatxw53u7magsryzaxsluv7vxneulyy9chzj9pc03qiphlatnh7qf3dsuskjarounced8ikfrir827w8i55t9cz8ugumnynsc82fg1v1a4zvocmcna7wmdjtogdku5vv3uj7vbhxvw4jxxy3y3upxdgqf3xl6ysubqv20jrwvteljelov16b8i19517u08zq7rfmzy695tyszhs6x4ry2a4pp0rnjmwvhbd7r9btau2ffg3tsyrvg',
                returnCode: 4701300902,
                node: 'sziq0y7x6s40bxi4xvq5xprynz93d820i8j4ryh5xyf7kr1w8nqngm9y68t0eld9fwtlbvvs3y8msoxdy0syl8ufir6e5utjtywkc3cuz7jkhqfdth2zao7uuvjhe9nbo6g3gs2w4jczs8pne7e4n43b3h1ml1ls',
                user: 'e5sb03y6p0ay7l2tptzn6ln4awx553ojebc5ki8z7y7dwg8zs1gvg5r32ml14sb4yifqhrjwwbghex7s8h2johs7wo1jgypqb5v6bpl745bryje39ojlyg5a4hzbbonlt7im7z6v05lilki2qjiyimq8rv7pgvhhypcb0wnwhvnz9qw7hqw1di4kignbp6snmwz97rayzr1p1zao0z0cmf0kldantleiglwj75he6w03j3pwyj00lx1me5nb655',
                startAt: '2020-07-29 06:58:10',
                endAt: '2020-07-29 03:29:36',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'znec526t7kd79agiog1nxez7fq5ty3yovphiphh80bw6i6fmvy',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'bv0kileuqv0drzamvi42',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:56:49',
                executionMonitoringStartAt: '2020-07-29 01:02:02',
                executionMonitoringEndAt: '2020-07-28 21:12:25',
                status: 'ERROR',
                name: '4eo0s291mu98xybbzpgmqf0lquqebog0509uuja6xl30gtfq19j49egru1rvdnsoau51n1guc0zmt7znd0m8wybtsvhjz5yithze6g9gyv3eyj2m0cl6qt3we4olcfs7aeghc17h08a3hzykd7ykfaxl48wbthqpvmprc20hmpfwihvufglep18hb5zcrzwg78bix38s6rwkrh2i8re1p6y8kqoiv82ud7rlzk6apin7t6syg4rq3yp8hfbughuh',
                returnCode: 3019621801,
                node: 'y445ifp6cnr3zwgncqydhplmit26q36yx6za37n6t55h1cx2lcaxgjmoqeplbgph2ob5cxir8ob5uc5zuo48ag0vezmh66p45ul0axc2hlm541zg29h7rlfi12j0y1arj4lrvx1nlhzs2pr0q5xw8aqt3t9yay4g',
                user: 'vembdl6c83vef39blpucw61kwu21wsk8uygfvroeq5okp4cn94621690obzfaeua6u7i5p8b8v4ho6kcfgdfhgp3rnv5cnoojdl5xkiiizvg6xyyprzyddygroxf40zxjmlhguom0ao4zrrr3e6eud0oh03ur0p36ynqdfi7j53z0rhbbht3z160ds0xec7vrhqn5wstxgcj3fljj1jq4byzwyn2q181hkeih95ftrm2kg9rrj1foi6mukj7ydc',
                startAt: '2020-07-28 22:23:30',
                endAt: '2020-07-29 17:51:38',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: '09aifh6092dtwj0jr85qavf7dv3m14pi8g23eg9gu2amkyko9n',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'zjws03mes9ew7meslsvl',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:05:21',
                executionMonitoringStartAt: '2020-07-28 23:43:12',
                executionMonitoringEndAt: '2020-07-29 03:35:43',
                status: 'CANCELLED',
                name: 'mljo7a9dcpgmmtgbqagpc23b8ko06x130ir3bag8qe0vmtmppo8bybo11g2dogjtukarvkneryz5v1k7v1mvwlkrtzjh9dgb0j90bl8duohnqb6jak07e9ecvslijkmwp5xe5dyb3sqoz26lf4w4mpd5pou26xoad05fcxnnphyoba0afnkuolrcv4tfrjb9kjvgv7arn56pglp09uez11nyyisfnl2mc50xtmiop6hbipue9zn1jb01yyxoc49',
                returnCode: 25168186970,
                node: 'bulujblihzz4iil3pc9z4esy9tp51kdqg3ng6m60kv7mw1xgg3we2t3rg7phhgcp71t9oaa0wbulrh1p9sr5vt3bwvh2p4i5d9c7fwr18rrwyom1m9lxe57tjq67tx0uu4kjsoq38s1wyf9o71etmju4qaigt8qb',
                user: '3gum4x27ea678q9be3x3ogpi30seato2ryl6nbp555vjd1mx6cy9aampf9z861qwc6mslxulr8whl3bjlf0wmsanof60k9ejr05ac4ua0yrn90q5ca4dszij4rz72r4pt7znvbgej5238kocazw2yht6z53fky5drurjf06cogvelzqaaod0eagyin99zmlbd7cync0lzetuo0q1tdh8iai4d280231y102ied7ft74m4myiib4r1lir41esqss',
                startAt: '2020-07-29 05:13:37',
                endAt: '2020-07-29 17:28:15',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'lh44jy4l8vlf7g72cfws0lmdzjcbozq5ivn0xbbgeo3loqc5i8',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'a7h3q3idz2aa65cej1gu',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:22:13',
                executionMonitoringStartAt: '2020-07-29 02:09:34',
                executionMonitoringEndAt: '2020-07-29 17:14:43',
                status: 'ERROR',
                name: 'g4l86ipvroiio6vjr44zwjcy48e415orjqmw2s3jo5tvbz5xg2umjqyeljn2puyu8mpe6l2uijro7gjkqbzw4wzrj0hb8x3jcu8ra2r7zpiw7lsjobmt2kmga9888aanbcmam1btau4yv3eqs0ln14folfm0lcuh9qi1w9elneq5o261fyo3ar5qmged179wigxurjfoy6bubs982z0zzowfyu4r9w83ekksxikyhwd3l4frmed3xrxe2ojrh91',
                returnCode: 4312528115,
                node: 'o1wod886vjsvonhxmcuhcuqm09zreukyfx2d36uglo2m0yu3j05zzt9dtx1xd02mmwsnq5byyw4amolkoobyzbamq8qmfwwm55s7v97zjs5ityp06tq2tui8v8ini6b742ux6yvpc5qv3htqxydygr6np1bwkeivo',
                user: 'lqpr8yhntbafs33ptikgi988tfxjemi3vm1ofdruxzuf9i8pegolxubbi7slrij0g8swn4hjjatl4j3icc5mutqbbhrfmavi1lvrtoh5ptvbjagv4uavo6ue0q2r3mwxjf7ylwvzm0x9pzp747w22gy3x9eexf73ion5n9vbgkelbx2516w48i5u91i2wh072jrip6500tjtm3ecbitakc8wmu3j8k3fsur9k8ai58xhrp3q7r6r0j876ggdmaf',
                startAt: '2020-07-28 22:49:38',
                endAt: '2020-07-29 13:45:22',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'fm00397kco55gcfz28hctkdumbt32idgu8tjyuhlumpsos1ee4',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'kcdq41blb1ra6uw180pb',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:56:27',
                executionMonitoringStartAt: '2020-07-28 23:54:44',
                executionMonitoringEndAt: '2020-07-28 23:50:16',
                status: 'ERROR',
                name: 'u26jgi2ubsou2saszuu536kjpbx5q29mt9wmw7gz5ob288z7tr8wx3hdkvpd7setxf2tb5ijns6jjplz73q58qvjgagy5z9nmticothb7fiebqacuqm25keqvbe29z6ncqoanr9r721c6h6vpp60ju8g5x4tnj10jfl840c38mjfukbdg6y7tn1bt9ilenmgaub42w2hojqg24lv0lr0j70vw7vbbrp7gm68yq22e7t0j05ga0zhq75797zn0cc',
                returnCode: 6690469762,
                node: 'hna03nfcvd9l4q1ar4warmjmxic7gnyc3xcd9w0rh1lv87qi9a5znmkg5keijzx6n3bcr32porun7qxpidlqvz8klmbhikeu5n4cip3xw57kvrnjpd5gtils6trkjdgsf64f7zpxnw8hme97s6delqfoanao9t28',
                user: 'k92jv0orfiw76v98pb3o2gybc46oqcgbj959cl6z6begcsxe9nrcgqp5dmu1nrldsm85jrhx6gyqpu4s6mug7s6wft9aloqbkk81n3qrqtej0pk7cvgm71x5rgz3wdguuzy64amusuda8xy15a1enov4jx5a7cohnzvs0i3uobci02b63jd6emasiupn0yuczco0ut9ohttf18jc8wo67o51a0vf1x5iuzgucph4jvpnvag9vr3zazq2y5u95jnk',
                startAt: '2020-07-28 21:20:01',
                endAt: '2020-07-29 13:04:47',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: '04g2y8fuc8dgy2zq97c532oud87c91q7oycb3npwhwdot1dc81',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'ztm83kwk2oc62l7tefhm',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:21:09',
                executionMonitoringStartAt: '2020-07-29 06:39:45',
                executionMonitoringEndAt: '2020-07-29 04:27:48',
                status: 'CANCELLED',
                name: 'ivd8r8nz30770dutblmkm9abyg5rfgpfy5bz1ctvby0ofzm6dxgirhw1xzhn3qsh0di03de9ye0d6e3hpzpl8pkkofbwyw9544lnx9fex0tzw198cu57m2o9eiv4s087hwevk8wg00k34mvepi9s3oykvlhuaqdn17bvswt4rvo1hv4qnpbsjapu1saxyaxutv6dstw90lkiv67ibuc2tik1k87mttyq8t7yr08lg0taevhv2umdndvrwskhfn2',
                returnCode: 100.10,
                node: 'hdqgxayvn5wynrd5ge2ky00a44f74jx59wipltpxgvtqzf2kyc106crannqfpn3lf6pwk7dnhbjlj8t4q24umrj1ayumaqf99kh0jq1rup1p5209hes2w3rjc5j9248lga52apa9eizua3owy3nejzm142gxlgez',
                user: '106rvbyfvzxt83il97dw7ej6010s1bwdii7u3ml8vf6b5dwld4ipumv9uamuxfyx0bje6pv799ef4rvxmpugt951jwpgpsy7mvqhddghmyh1puapq9c2b7eyvn15fh2jo1pp5afibc3cm18um1egf9ajmayw1zs76p4max35f8dlqaxlw8wokyyjgx4dih2frsxjy20illkoqb18ymjbegq3wou0npqwvvrpye65txzbbt8boceuam9mh6kt12q',
                startAt: '2020-07-28 22:45:26',
                endAt: '2020-07-28 21:13:01',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: '0vr2m216s2ht2lkx9ibodp0sdg9ua8c3zmaa0ajmqv6uxr8ixd',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '3b3hbqyggqc2no7qjh4w',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 10:01:04',
                executionMonitoringStartAt: '2020-07-29 07:51:50',
                executionMonitoringEndAt: '2020-07-28 20:55:00',
                status: 'CANCELLED',
                name: 'ofwffcqf32hxrisvn4iq4zlchsnt9o9zxt128vlgqs1yr1tyek8z5vcflrue4yop3yxdhls3y2ibw1rn8kmgghz06qbn8qfo4o1n47jtpioc0a88e7q86k8kibko5gg71a3rcggfm3i4rlnhhuaop3erx7tzv0lfhbov2mr0rftoeec0f9qzxg3hnuuw2xw3tborkm2pl1wivjygycrj66v2rm1zsm9rasqo9kjvgyg5n4uvo7equkc8qd9qr88',
                returnCode: 9698171378,
                node: 'of45t13628n51bixy1qqbics307bf9dqm2s5ce0nc7gt7ij1vewfqq20a10b4xfbun2v6y5ktu0olxsdri82uept2gu58tujc9btjxqals1ur4a5cslef4l2ct97empn8f9rkjiu7sy26wep9w11upr1bj5o2bi6',
                user: '4uchmo76n37dzqcpam7eppedayil11ogqwpf3rxgacyn668g4awy1rwtjr9xi2kyb5fhxr1w9ooqedflvl7nzrwdsu9i6hl18o7l6i3z5184oqqzam2x5dfmeteoavvxbjw35verbui3qfh9xi5it8rqzx3hdaia9igqedndjoah3h7hsvq0765k1i83963c16hbygfshekxlzbwmb4wfdwx2womf0kq0kfz9ip5ap383klnnfvl09c6z0uyje6',
                startAt: '2020-07-29 17:32:17',
                endAt: '2020-07-28 22:49:27',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'wnj45vfx4gnmvzkt2irddpe5rel2bvz6z8fe0mlrrzofjtiire',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'z7i97rhcz1930pso5mab',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:49:31',
                executionMonitoringStartAt: '2020-07-29 07:50:38',
                executionMonitoringEndAt: '2020-07-29 05:13:59',
                status: 'XXXX',
                name: '6lma9bagu5n3zol38cca5digxsjos9bsyx2qhecdu7gi7i3iqfd8w63rqmfdmdnai6t8xi17rjw8022abct1fkyxwfqukteqoszdf7yhldy31y6c1q29dba7m8qnad4bys7cx87rr8fbyxq96lsio1txjhv5qlgkhsgmix0dly0ajh5q331qaqagxtovxcgdw8fjv29kc6j84e9qluc6r8mdf58t7fp39o49jky1vs5zhxqhsldl7nicxxb3ily',
                returnCode: 9861166714,
                node: 'pxjs541glop7o95ymg5if08xnbso1xyzz6pd6jystou9mpqx00d3ay9vxg86kzw2iubutig2gn3ir7qedxab6u3fifdy2p4uaiaeuhwoxsjz07ow4w9idjsil7gr0k8xnkiv4ej7yuspa6d36dte6xuonmzapv5o',
                user: 'z801m0s78vz0zucfla8r1k9dzmwyms0km7lelfjlh97w1mkwxhq1iebow6fl9rpoe47oud7iorujfp17p9l0bgsuc15hczfvv007ylqe7qenjvlcff43rbw67u2a10n3cckha6i7kaf0sqdph9jo01sh2eiit79f4myd8140g170xngq5oavjcij5yzu4xh2jyxo78c1x8sb169g7dnbbos3x5oy4f2n8wul90wvi3by1a9sqemac7r7yxf2abg',
                startAt: '2020-07-28 19:36:41',
                endAt: '2020-07-29 14:35:08',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'ca3u7wwtrc2z5dadfy21h36pz56tat1b7funp0kuc5kfrvbcfq',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'kcntkb0rusdcx91ag5cb',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 12:35:23',
                executionMonitoringEndAt: '2020-07-29 17:25:10',
                status: 'CANCELLED',
                name: 'kwu369r0epc2rc08v86gd73w05vabcxirpa3ekr073pjd0d354gv6h6og5r1tt8rzsb49fm6fc3bd9q42oaf95284r1xiu7z5h9qlwhu6aagiop0legzr60bk68rabttted5bjrxgzdqo0btivm0yeaitayfx8gytfbjs229sd3c23ep4dukh71fzr092be8vv5r4urfjuus9q2hnr6yz51un16ahb98kaasoizrefbxexndqrcfdd4omg5at5q',
                returnCode: 4245464226,
                node: 'xlo7h4vi8cea25460m071275uo3jsjulmbn4w27caqhp9ipvew2oa2vagod7258d7ppwhycv9ltw05gvfbrrb0ggtn1fybz5dlqcozukklz7vbgu64da35guthkorl5jrw8sf80as0chupazbqnzog62u6zn97p6',
                user: 'knmirae5zbptox6jueoffddhoezqnn6pqaqwmgpfqh83edth507sx0vzxkgw6dnn6i0heiog14z3odcjj35e5llqvxdo9h6mv03oyw5tpdyr60x1rde9p5ahzd89xepcdvc3fl8v1xcagmhah73fshx9dvq0i10rpt7tgy803ggdx665lasr6v5ev737ia7hjqz6qnmm34nb17ot9ab8u67ru4n4dex1ya70ufn1rhynf0usebh9qfkac79bvx2',
                startAt: '2020-07-29 06:49:19',
                endAt: '2020-07-29 10:45:31',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'w69go9rc1cg2dly2w2zxodt8zjm8x3n10zupjbe4ijeehutze6',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '0ldxv70be8e64sf4pghm',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:23:30',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 04:10:50',
                status: 'CANCELLED',
                name: '2ma9bqn16ldxwqzbn8uqrrt0mgx44g6zf5dpn6p1uqwrp6nhskccqagnt5s5gif4ft1kn07rjmkt6eq3dr08e0lrdv4sxl6iuuhoy3kfkoplirw370mjw9i5h1h6xe2e5ma8n8zf62ovkfwrtvprpqhlttqq1tz24ntw6vzik43tp8b0ukgybkze5ztn3rx0hrjyxsbdpi9xa9f1d0krf65t122li4zylbplh7grxrg4lit2iskwolsnttl78yo',
                returnCode: 5570058776,
                node: 'biczncvcq3hj2nrfcb1loc64cr2blzxknfnvcfaro2l5infbn09glrdh3v1clot42q3bxyjdlluiy63ciq6hgw9kle32x3g53e3cfpy31nddt1noj10wayej3l39nnlomg4npvlq2uxutyy9zgt1uvh7zt3ihtml',
                user: 'v3l7xykwbavc00n7uw81bfy7okmv4s60ubfc3hd775yp6lga5it4tj6x9gbeknmmc3ktpyxj1h23m8f1gadiffgdpqh7zfvhh75fssinlmyyo16p8ne2s7otowv8ip63xcovungq2s0q6euoltx28a86a6tvkhy83zokzeyh5f2vok5kje28fb8qshpap2ue3uc4tn2fazx3pxm61pyiaxygh6l4krzykrry8zditgylp6h053pd60gkn236qf3',
                startAt: '2020-07-29 15:52:35',
                endAt: '2020-07-28 19:33:45',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: '3pwbz1gd4ft0q8p9suw1oo216c034jpbyeya265xzy88h3qm9g',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'sb7apnrdgqbp7k2b5x53',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:10:43',
                executionMonitoringStartAt: '2020-07-29 03:30:33',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'CANCELLED',
                name: 'f7iirqeojwfld4e9gz0oykt351ta4umu5e3bz41unrob167aeh7byooc0p0zzrsrqyucj0dkvlrl8kv7oujxgroukk82kz2twhxuowi2j1lu4o9l5nn4ef70ynoaw59x6i2ni29jti23zsqxa9kka096z331shi6iide4bptgiqiyebud1frxoe25idtiptgyqh548bwtfw4e791gmjibvarmlex7bfmswtzx29qkcba9iteh9czfy2n7jsm9sf',
                returnCode: 4271753991,
                node: 'rfbbqzj5df38z4yy9x536s5vsk7an6eajhj86wx9dpj1w28mqzsnetq4ntwlzfxql3644j7uqiopsnxdwwgadedfy27jc4epjwqit3h5fu2mmwlffjedrj4x02ujvbab9qi3gp8bvesrwotobi4665dxg1eewvuo',
                user: 'tfmkadd4g1gk9t085cgcgaye5dzu38p4y8ypnmpou5cwjdq6jqo9fqk9nm60qfe9o8i62w2u6e2hioy6639dpgecmzn2thho303dqw3e2hlsqpjoi9ha20yjxnojv7ngl8jgp6krzjotfdgfnh3xor94acjnoy9rkqov7rj193edutx4ev7j294uk55yxxwn2l8lwzrw6e54eswcdna9q8eev33pyb2dpz2h78ceh5w13tf9b3dc3fxqmrqq4cq',
                startAt: '2020-07-29 09:06:48',
                endAt: '2020-07-29 13:03:40',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'zxpadiunsv2mugxgl09q098v21yvw5toi9gqljd10ry8uvx53w',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'tft2gf1td4kge0zx0c1q',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:23:06',
                executionMonitoringStartAt: '2020-07-29 12:36:17',
                executionMonitoringEndAt: '2020-07-29 17:30:42',
                status: 'ERROR',
                name: 'ymxicdmc7ut1u379h6uaq5ohx48wji287uhm54yy3b5ffd8c1v9xawwjzww3ofa6wp1fuf8ch5lx81n4ltx889vrg19u0gyt0r62an68fdjcu5b0ama5vohe89ujvemlhey78y56r7uhwck6605u45ydwrlh9f3h2bs2yh6q7vrykpkg1dbttsom01b6ycfi5yhf33ig45d1xhs7o4r6a2gzwvyraxinmx5kf9c7vk3vozjbc35g86ca3okr8mb',
                returnCode: 2059636971,
                node: 'c9rlt0fwui6xybf1rrlame0155jhgfw5fgsg2mckvml55pa3qdud7ok8vrtsxnkzxry12zl74exh2ldldcn96g4qiv6rbl5zapa2bxhe50804hg8het1bxpbzn9d4jrec0kygmtqlkptulquvmbs7x9ee9h90kk8',
                user: 'zmd1ucsg09lb9fm6ksvxo5an1wscqvczvgsqm0jiia8rtgejqs678smkj7feb05ru3l7jvr88s8ioklm4hpyq0r5fzv1wl517ppjwvg2qhhzd9c058vvz9bxdkimf7f2vqhlcmjfsj6dmt3tk95eebb2nl92za1hu2sl18r76nulef3l9k5tkyefybaaa1z2vw6qvellbj2ouyqboumsjyef3ud7gq4m9mb4k4l5kccquaodwirs20rn36aqhsl',
                startAt: 'XXXXXXXX',
                endAt: '2020-07-29 06:57:25',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: '8gi69p9vbsv1qbooreyo533a8opi4uv1qyho2fn4ww9j038h99',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: '9a4kgxlhn5u1e9lnbxjx',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:01:07',
                executionMonitoringStartAt: '2020-07-29 11:40:57',
                executionMonitoringEndAt: '2020-07-29 17:53:14',
                status: 'ERROR',
                name: 'bswp0c3ar56qp7l78czar42zejas3nekrjpsuyt2dnu7ingw37sqai6bf39ltllp6cvkkhn720dien0liioxaeoth4nbmqr0wl3sc0ed8uxvlkbduledjuk6gd92uqd2373v8rcy5jxlurklevkiflzugn815hrer7704kf1tgip3nj3jhag4oxaqe55vu0uf7u720qwnqwmbc4sa15yt57zj37texvgfeqk2n6sa2vkwkdjrkqrwtuxj504r5s',
                returnCode: 9416423931,
                node: 'b4v15d5u51w5vt67yu6uhq2vic5gsepgs4e93vhhhjzhecv55u8jtpqdrc1hcmir68ub3yl5u6lsxlf8pxmzwvj3abm913wgtx238188xcskbt7rz9ijkk1ofn6tn2g7ifk67pkxmbrjo23pac77t6hrgeiw0bah',
                user: 'c32tbc7eils6heswpw8nqootc2vbbv6ayfo0kzh1enqcgrueafuibi68hebrjm236g0i8drfqo9hymj6g6mwvj3ol3sws3t9tt7y0wdmitkoiy4exc8eze84re1hae8mp9p3igyj1q1k3mx8sylhak57gj32gvf67ju2os4kc0b01jkamoj28v9grc0yp0zy8cxn4sprer9j2ga8cygv3574vfwild66xd2o3h1kig0xfntbgzkcwdvd0rszz0a',
                startAt: '2020-07-28 21:00:17',
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
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'zia63bhruflj72tw4plt74rfzf9k6ua9czm0vfkwylqlv9rszk',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'k062pd0jzngdec77z1ih',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:46:56',
                executionMonitoringStartAt: '2020-07-29 11:47:01',
                executionMonitoringEndAt: '2020-07-28 23:13:25',
                status: 'COMPLETED',
                name: 'vvqnwye40f4lgq0cqt78suooe99xg08pwety4c7jfgnj0tuh8f6je7g3ltn9o00y9jkw3exbhm4ui7xoyahimcf3h5hfllxp9h1dafnst8fpluukizq352iyfw5y0rtxf7b9fqp4x9v3ikedd74yharcqlr2xxbycu128nu8pwjk21ncpubnsajrbrwejxaios72sq5luenk5cgbvtzhtdvrs2j8blwty6k17budysb270pydm6h7j243m5uf2z',
                returnCode: 2418097086,
                node: 'lod67sj3058cz82x13f9mq8zo2pyo0fhi0tfzodzldx7tnyzzun3dlzuz6x5pbytzkcichhsywhzsxf221ljy0f0zdimqvsrg2u6880dczzb5tuz7ademqdu1gzq5unkzf2z5vzqjfaf3oulgm5dcf9azm1absde',
                user: '9fug8jnapryil9axlpt3bfqa2lo04bfa3tyvyp642rtfbmup51tcrlzds6lpjzx4v3tqh8ozmgocai7j31k3322ygypraqc7uso1c2inid2ve3ftdgc5vw3tkqckbih3oosplhhtnk0uzdsswpxk3l1n8c8vjhgswg1dbhpkjdd3bx6t9780qsf356kwy0a6ai8nyvapqzgp95ts4ulj2cbms40o39p4vx440lg77jbbdakgarh711cmlhzmr8s',
                startAt: '2020-07-29 12:57:30',
                endAt: '2020-07-29 05:58:47',
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
                        value   : 'fbceb3a2-82ef-4d60-baae-34bd68feb493'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fbceb3a2-82ef-4d60-baae-34bd68feb493'));
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
            .get('/bplus-it-sappi/job-detail/fbceb3a2-82ef-4d60-baae-34bd68feb493')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fbceb3a2-82ef-4d60-baae-34bd68feb493'));
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
                
                id: '5874ab8a-5658-4444-adad-d7adc61c2cae',
                tenantId: 'cbb375dd-6fe1-4103-a469-d72fb804e932',
                tenantCode: 'zl9u1g5vica8imjk7o06j957pasligjelh6u4osmgjjc08e1jj',
                systemId: 'a9f004c3-3474-4b0e-8e7b-a15836d4923f',
                systemName: 'yk8la712pzycthvm00qe',
                executionId: '5b7b4fb4-1177-4024-9607-5b40897fd155',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:26:07',
                executionMonitoringStartAt: '2020-07-29 12:16:19',
                executionMonitoringEndAt: '2020-07-28 19:37:00',
                status: 'CANCELLED',
                name: 'zqt46orofqz5edy6jxsjhoh8jv8jme8q7ts42bqax675im0jeww8eev6wqx6g29y02638a45w0xdvwqnczspctjvo5q3rl11qrqdwyefbep6khl7cfiwjx5wn4g3emmewfjqbkjm96h96cbh6kjk86zljf3p6lv865dj8gagcgi71853bjih0irhjcdp7imlhfqt7d44owh9tr4oxvb43l7a1oxdyny81lrcx7haxh6cb61l70r341q41l11hgz',
                returnCode: 4666604550,
                node: '8dycoi64hb04lcbfpsd03btea7yr1uweykq6oax583miqte3w2hyekfj46cecpb3o5vs2r3bix6j5nmw79cx1f6qk6vpm1ydefxdaaorrlfo03gbkv210lp3t0eaju6xka809uqfj2rbw932sdsmur1r35cggnim',
                user: 'mq8dl07oolbzuuchs9l137z5ised5lnv5613yf4xwivb7lrpkuyolddugfdcey9o9bq531mgqnz0ru7skwbpsi5zkiteip101toxghbrvvs0slj6a6ty8w8yamuonwhu9ugvjdfh5k4k11h8f0ltmspv957pt3a3fh8iwqzfhkjzr9wtllyv6svvlw7p3dknur3t8y9djdxqtf11agqnrddoals17vuave74q8iymruimbp3naktv6xm3d8elpy',
                startAt: '2020-07-28 22:45:20',
                endAt: '2020-07-29 00:20:45',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                tenantCode: 'wtblbj8dwgpw0dvclusw5vwqa6slhef7yp8zjz6g1qjew4b022',
                systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                systemName: 'hz4xs5k30ui5pt8xso81',
                executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:36:38',
                executionMonitoringStartAt: '2020-07-29 05:15:53',
                executionMonitoringEndAt: '2020-07-28 18:55:24',
                status: 'CANCELLED',
                name: '4lul7c166cvomiiag1nm6hiz2xtcljkggzkhwc1hla25x68rlu9bplw1ut7l6nb4xilnkcvoc0fho5np99h7kmt38i44cr2q1be5kr39esef6j9lhefrs505yaf438uto73j4jsa9cr7x9wbib4lnrwefmuxx00pemko96vticq7l6um8166n4sb7orhjm2c8y4x87jovkaip3hvgwyqv98rgr8ajuy2kozqvx64encb0wneban0gwtlcchwyo1',
                returnCode: 3629626422,
                node: 'qbdfr7ldb5wrah4kmezlaqp6xv3hedrxqgaid1z7twivabf75oidlwry6rh8sv1sfeq11vtug1pktkd6pig0rd041u8yw6ghfmzmihnkk8ztlrdd13vgvb5jbq8jxkwhy8iqpz4e3moqoey72jou22wr2iuhhwzr',
                user: '3hb70i54sj0bkddeb2juk18rzz71d2d4lqo79ian5zk1jdjyxckpo1rcdbu2wrmpr5xr1jg5dw1aqzklkjgb4gnwru36cv3qa2b6f045zv4lrmdujp765fgsw2zuy7o7vc29oc2y3bxfwm3s57g5r8dnxrz3ira7xb8v5eapxx1s9qso4bqfrrdzr6g65anabhnej0xece4cn6qxkhu6uguvetpoc7d11n3p0fu67hgkdypekyvh01o3cbkrcjn',
                startAt: '2020-07-28 22:58:51',
                endAt: '2020-07-29 05:49:30',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fbceb3a2-82ef-4d60-baae-34bd68feb493'));
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
            .delete('/bplus-it-sappi/job-detail/fbceb3a2-82ef-4d60-baae-34bd68feb493')
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
                        id: '2a36ec2a-9b31-4194-8223-5762e3027cac',
                        tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                        tenantCode: '3kzeq3cpc23nv2tb1saubu21vvmf6nanu7rk0261pn5tgr6wea',
                        systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                        systemName: 'q549fwl93wagz2d4dw13',
                        executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 06:13:53',
                        executionMonitoringStartAt: '2020-07-29 13:32:11',
                        executionMonitoringEndAt: '2020-07-29 10:57:47',
                        status: 'CANCELLED',
                        name: 'l0a402v3739ef7aqyg80izhuhbd7txfpkvh2j0r6x742vr39m0u5l5cfa36i7johf8ej6edic46xojw4gi3vfr70nccel3z1cplzx96ndwa5w36sbw2nzm7nyjwgarttqqole9lw0qucdod5mazk5w8gaq1qpdqgfv4bo7fm2w2z26d4uzvw7t6wgvbo7vvdpooygrj1gu6mcvz06411t88zywg6u2qxyxhsgclhj1n8eohxrzf5p1fckv6nyiz',
                        returnCode: 3685414475,
                        node: 'dpujf91yuucgccwc72ata98f93pe912e9dk79et3ogsl8o7ij9t1rq15kxmcgomhpivys9865bd23t4p32nphvo50yne6lzaoncvs8zfdkqffsqaqcie4zh3fnz6nw2n33mfwoww4svd93sezqgmfgby7fhcjuq9',
                        user: 'nsfpsx14dg0de5cpewhlkfeovikg88ux4awmyvyy74m7dnqozswejgln4wfgwl524hs9593i9cowcrjmte3mrsc5712sgrweltdgqxc1x804bkimvu14fy4ff9d1ttwqnwfoghc4sg638apkqzu6t5djmgj4u5s60iv8au4l56vdb4ymy99zu479gufxr1givnwy5xudhihe264a9bwgwalyfea98zxlqincvc5rh6nultgpmjlcvnf1zvbpi4g',
                        startAt: '2020-07-29 15:53:26',
                        endAt: '2020-07-29 13:45:39',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '2a36ec2a-9b31-4194-8223-5762e3027cac');
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
                            value   : 'fbceb3a2-82ef-4d60-baae-34bd68feb493'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('fbceb3a2-82ef-4d60-baae-34bd68feb493');
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
                    id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('fbceb3a2-82ef-4d60-baae-34bd68feb493');
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
                        
                        id: 'c93ac0a3-1f18-4836-8483-25ce404ca61a',
                        tenantId: '0de4c34e-d204-4dcd-b763-0a6def9fe6c9',
                        tenantCode: 'd875ks21tq7mr3xzchlrra31np3qxacc7jibht6a0q035bmuqw',
                        systemId: '6c3e9e82-edbe-4f20-a4d5-166157523481',
                        systemName: 'cvddj7i4xmg4oyx6tdba',
                        executionId: 'cada5e58-db0d-47a1-8bf1-84cb82f2fa09',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 16:27:01',
                        executionMonitoringStartAt: '2020-07-29 13:49:34',
                        executionMonitoringEndAt: '2020-07-29 10:48:18',
                        status: 'ERROR',
                        name: 'xz8e6e1uj0a6agpyexqd4qnm7j6pxcynb5s12dcg8elixtk0wmn2311rdz8t9qjlw5irg3hprhapf2ysrf6xycfzl7oie663izcg6r3t4m0noz0ujvwrgnyaxlx61shlq01mvmqg7sxirkzt4z3pmwvkbcvdszo2buftsy0qkpxeswcml77l1ti0cknpz1hjrt62cp02uypuj4o5b6ojolhvz0yai6ll7s7cttle635ehou0my56i3y1thoj70a',
                        returnCode: 5388148932,
                        node: 'jxxhz0gg2efhkrv7gr9m5h3k3s9c5wun8z6sujrhibwy9mc9fa4cq4o1r0gfoue3r8ccfc8i277r4y8z4qacg2swomkfx78pfedbx93v5c5nubr524wb05unbp7kjk1z84ov6bbg9d47pe2w026n7il5u1hgw7y8',
                        user: '4zlt3zlot62qojlk7u5kzz4n0vurdqheov9z33wrkt8dgr2erhev6zld76zx4t26sf2y2cgkjg19epq33yiyylto6k32sbcjzxvj2jqk1pfb5eockm5lh40ff7bvr2rfzdzw919sk6n8xl5dm5335m0va5pfskd1owq76rvoxjgjt1ds2zutt6wqh98mgttj1pjcksd14pl5hxt5igocprcnaxucrqh96yc5vhdeui895eb25fejvq0lcdlzjd7',
                        startAt: '2020-07-29 17:22:37',
                        endAt: '2020-07-29 15:12:11',
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
                        
                        id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493',
                        tenantId: 'b3d2be37-3976-430d-a139-3fd79e8f6f14',
                        tenantCode: 'bp2ehlqh7foclakq8zb3r0ffrssiuzt578yu4kbq9hs9xilqhg',
                        systemId: 'a7fd06d3-5360-4bd9-853f-22751f93032a',
                        systemName: '99bgict8jl2o7765i51x',
                        executionId: '42fc27d2-6add-419b-bd64-16a446c49580',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 13:06:50',
                        executionMonitoringStartAt: '2020-07-28 22:01:58',
                        executionMonitoringEndAt: '2020-07-29 09:48:29',
                        status: 'COMPLETED',
                        name: 'zi0654l0clwmfu20pmshn2xib2o88fbq2aw5vqetst5ti7zkfzqovr2lgwv7cfihribisnzioo8f2cqgn1kobpgfkn1p17vovt9uks09un6viw820qpwgafgipzdo5q0ah4l7fh1gzqlebakv1q91zn9brwiu07txu1npi7500xsmgcwb5mu1cwosi1t32297cm2wxhavy0tw0wlc4mcp59v9ycv6rpwhtkpnj1mcynff63hktxynit4bim3bv0',
                        returnCode: 2433673639,
                        node: 'cszqhfm8qaqhrujtd7qktfwj9t262bqjt3dd94pusuirkvmemnsr63inmtfedffvl4mq2mvac2oniu6c80pmymmpjtt5ml3d9ssoui5n7zlfrwxddd61uuu0bg28ni2yek0hhochudc00giswu4q9pktuqtlazye',
                        user: 'xdjboxwgws4oadlo8so2a5ydazvyn6xz9q2nizhkm20c0sh7t84hxu07mnqkh435abpbyxigof3bbcfz67frgk3e0110v33b0bg8s2351r2kv4wzyp829n1ezl0mzja27hln9mx33z29orx6p74tgzoexmai933xjfn2cfsf1gwvoo8dfpwag3c4cpm0ms2iwotd20yh18cqhjbj0drzvwe593rlw1l7xbuuwvf7cwila829fa8gfjpzdyhcy58',
                        startAt: '2020-07-29 11:50:06',
                        endAt: '2020-07-29 06:29:43',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('fbceb3a2-82ef-4d60-baae-34bd68feb493');
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
                    id: 'fbceb3a2-82ef-4d60-baae-34bd68feb493'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('fbceb3a2-82ef-4d60-baae-34bd68feb493');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});