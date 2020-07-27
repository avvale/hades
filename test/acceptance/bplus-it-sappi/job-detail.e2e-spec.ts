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
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: '3tkqjnjw0iyptdob2khdcbd6adggh7jn5c5jcd3x21qvqacroe',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: '7vs5g3k6rrbv5farxjmr',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 22:46:35',
                executionMonitoringStartAt: '2020-07-27 14:45:33',
                executionMonitoringEndAt: '2020-07-26 20:39:51',
                status: 'ERROR',
                name: 'hvcnis3xhr1b60zu6ntapl17tagwx4t4oelw934jiucbdsrh2uxjps76opnfnwts09q5bj7j9bo7i0jn1picheyog4g6seeukvf3d9glelffqnrcl8cpvl9hn9o1dmvtsu1uwflmu1is2yg67pilxk4cvwt9wcc3tc1tzo2ood1iaf3gqu9y5b9sofjba0zjm17fkmfk9b48bgxzgmeegscef4nnt60bgi7gd43m4rtltp2fb61yhmgjpxdoder',
                returnCode: 8334057169,
                node: 's9jo2mmfyuhasoaz8p676ane03gbqgzpk9qpb3e8pysojxgbaz4xbu09tvhvnvvseuqd2vju5fza3b5ji1uvdgzcq9jwpcvw41kr7ieg8nopcxxgim29bln1mvef31umszbuz7tmqlrq7mwua8s3eey5n2xjz5ww',
                user: 'l98cgtynlvxyms4g1aakmgrobfpawvcptpnjwli7dehyue97k3tqkwmv0kyevwn6kie0zb3ogk76qt2pov2i3nx527a9gmpzlv15oupqbxyorsa501c6v5ljpe9jamkw6the9m8iqux96l2qp1ux3ht9rbvznebjtbo52zqjl6sr5s3aarz56rumkdtf5eb00nj6pxufw48ierazmu4613cga6z22lwr8awq8e1pz5d5lzxj5u3l58y7lz4vf9v',
                startAt: '2020-07-27 07:50:17',
                endAt: '2020-07-27 16:25:30',
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
                
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: '2objacw8p1gw78pt3w9f2cexurlw7lt7y4y62yeilh06rnfagq',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'acg1ge835p7bx89xwhpp',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:57:48',
                executionMonitoringStartAt: '2020-07-27 07:03:05',
                executionMonitoringEndAt: '2020-07-26 20:14:32',
                status: 'ERROR',
                name: 'alf1bfxfc0oh5jzomfffcbo7mxn0k0c3xgcwtumvz0swzlv5d26xqs3j9gc68pxc2tcmtoehl72nmesaafyjfk1an2oxro64pnrq9w09crltjbdni2dmlnuuqnwva0ynw4lcn9tgg50ung6hu2t0vpr0b6zerd4t5lsprzv68pigishoytbz5e5wa2eqruds4njy056spojwckoy7ztpiwx3nveaq0jgk1xxn9ptqee4cfy98pjeagqapd9afsy',
                returnCode: 5287868708,
                node: 'a48k8fcsbovdc97a44l4iz4b4j6w8c19aidk3ej1bxv2rx0lg8i3hm03ourvdwhimi7vb1qzxiezlnaa74u66xjuy3j7ryxjthi9m8sead2kgc5kti9uxjjgdi951tb5jvj83wo89pfjwbb2a3abxsrvx96wfdba',
                user: '5c8ruquhidw8rqhd0bji9jz11evjzy7b6w7jfykp1t9329ellyjw11r3qq5wqnds2mhknru1ektzgtkn8vxpwme08cty8stobz5v5qnr6f268nv0xau0im1nq1efglqefqgq1xa5vj6n9jv5hkqmwldqmrwg6jkqvzr9h9pp9380fn51hbgyvkq3totbuy3e31so58yda732vq3fd0k44uuwq0dvj5vtvxyh4ddzo3v8vitfjjmqote4v08kkaw',
                startAt: '2020-07-27 02:12:46',
                endAt: '2020-07-27 09:15:58',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: null,
                tenantCode: 'bkhqw2gqut2b9apspn23o5muioc3in3lcddhumbw5rvi40v8jv',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'pxgjgeqh2ss3anoifl22',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:30:55',
                executionMonitoringStartAt: '2020-07-26 20:51:53',
                executionMonitoringEndAt: '2020-07-27 06:05:58',
                status: 'CANCELLED',
                name: '8mpy4ht6m4r0coy8r48jykiolrsif290f9k6edhz2hqsneopcee3bnk7p9gg3didg3hb2ytj3jece21w389o9kr43p1rf1p2qzgfvzv3zbsfb2i47fh3chkslhz7agpljew5lbx694o5t1x6e03w55utqkj7rkd6cv6kwxxa0l8yk9my72t3em8djqf48nhzztpeis78h01zmvk4yhu8sn30bmg5u79wdcwtq6laxkuoxz8rr5oi7yfn7nzjv1o',
                returnCode: 5741502427,
                node: 'bvx73dt1597rpn9jxipsn1dfgo3lfl440lxhcyl173vnpc51au0l3hqdyuxo0lxt6r0mnwghj8ne1ct03nafbvkpq8p49byarnux2rse4mmq5p3pc2639crshfumsb76wurx43z0xcurxv6tngs3z71qasr5dyhr',
                user: 'losatmiasy4rb5suht8ekksc5cuum4pxvzn0u0cat85qxbzcvruvbrjlekvm3j434e4qhywt8dbcpz1u2fy10escio72w5u1oy82p3m0xyerciubt8g0ek4cvghw8phmff8azxb9kso1vxjfirbltd2ovk5ux9ldpwze79zj9yihpzlf3r9vcwcyayopbevi2pyfu5o9ihmg2s8kn5zj2ijvy8iutuj8jzy8wsrkscjgmpvt60xxkp1j0hil0lq',
                startAt: '2020-07-27 11:47:40',
                endAt: '2020-07-26 23:19:34',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                
                tenantCode: '07wekltw3w1kzi7hv9rz98qi53wf0a32o9gq0az8y2t7k6givt',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'tnrokw5om1ejxr4ld66v',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:46:17',
                executionMonitoringStartAt: '2020-07-27 06:37:03',
                executionMonitoringEndAt: '2020-07-27 00:27:13',
                status: 'CANCELLED',
                name: 'ezma87v1z8e05vpht0bnb4ni3bj012h20u4a8tarzw7wuaq35dmz4mkczz6o35sb6fums8r13u9lz4qc6qrazpe4ie5r2afmxk5q6eijtzhpx6ja45sgrkog38dmrolxhod2685efb9lx16llvk6w3tqzw917iampjz0grtlb3uawtzxrxb66hmmlk3z8ygvfht9jg26a8r9lh0s9pbiv6onesq2w3zc234ascsaewvglq0irbzl8rwkruycb77',
                returnCode: 2464862604,
                node: 'o891632y8wrpockaq6r70tzuniteu11m2jjbc2pok09jvfe7s03kkn69q3vtmjks37a71h9qj6j9um8q3mamuamk0rk352n3xllrevu5p2woclwfhcap4zldxr85vo2bilf5v2s2mv2qfaaxf4v9onoc45pcansz',
                user: 'qf54ts7lqp0zdnp5wwcb7xa8j1g2q9hwyjg1tk266c3nuivr1xlxxe7bgpm234nebvrrqvd9xjs4d1q2dkqvehbox9j84xsoy7chn3ntxxftnrdgdqiqzks230ytxiyoqzr1i7pxrka6wyy22uceygydjmb1n8ecnnlxloxefsdpdk0k9m2e1zhbxfevfm8pewu2faw74qm3q9up64henad4yqz7rvowxs06i005m5m4skset3s9aai5j1jubb1',
                startAt: '2020-07-27 12:35:58',
                endAt: '2020-07-27 03:52:08',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: null,
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: '51kmj7ldlkdg85vhzle8',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:25:41',
                executionMonitoringStartAt: '2020-07-27 09:09:51',
                executionMonitoringEndAt: '2020-07-26 19:19:33',
                status: 'ERROR',
                name: 'm00nonhq30ccgcge96qfqalz98abia7sbxsix77g0qe5h5zy1vw7419033mvt0pv05oh7qrd86org6r0oh92sbz5fbath1mklx35bvxqg040e4l6jp73fhxckxbge812l6554ya5etpjl18fui2grfvqu04jbz6ht2hlb91c8b4b3mwb0ryj993xx2ba8lvkzhwhnt4h8h6zosv9bnzyj888dxlul9gu0k5h9fmt41yo9v0mkzqnnr26yyz7gaf',
                returnCode: 2912225223,
                node: 'kxb4egq67t828cjxmvex5iyx0p15besdwy6oxrz327qhihzg0aimetva2rd0gjkxsmq6dl49ovj9y4fo70x27f4u7a41uef522j4vdw0rnpyv7za3htgw77vacgaakoyt7tdsg5fe36n9xck4hqn6poiv0sqpin5',
                user: '05ocp2zhfznwe82fh5zpk0kgq6i3eat3evnayewwb9wqn8n4v1e6m7z0ro0hv7yzqia0jb1k63c0gvmeyguk51m4fv6h0a83x95k1pwynwwrbpfvtebwfcbo1lttuffghb0u2iz0vl8x27nmnj4sl3tbsz5lxkssmwscmcqi3apd4htnp4nxys5ctj62we5h6utow4e1wv1qddk4z2oldbnwj9r1qhvtpaqfo2p95yl5878c36tr97pz3af4mxh',
                startAt: '2020-07-27 01:05:07',
                endAt: '2020-07-26 20:09:24',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'ecscnqmai7fpwenbd6e6',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 16:39:38',
                executionMonitoringStartAt: '2020-07-26 18:14:54',
                executionMonitoringEndAt: '2020-07-27 14:21:29',
                status: 'CANCELLED',
                name: 'j7i7pjijt5hpkdw5f31a0nxztydwmwpuynx2rgv5dp7qzl3ytj69bavjquqtdmuwyazbgtkfn5k3z0s17ij8wg0tj9ilnhi35icx5l12fa316qk2ro8ygjeqxlwy5m58tbrhuot4w4avs7bx1xlf1ndil3fa147sp7u0scofrs8jqsy9ienrolw9b0tvmmmnmpdhqlaz58qgiii6wgy7xabba7o0cciqotsktac1p9u64yjxwhwrp0qwxmcuj8j',
                returnCode: 4066495933,
                node: '0r9ye6e3tsaddomx1u0czdo0sd0aqo8t61z37c4zo43i99aa3xpky1gtqz0oivo8uw01o8fdfjpgtsfchoz4lx656jiwqx2jd4t8yr5ntddjd2ydjt9rn0lrftwfzg0flozt7i279jqkppdzuswtaqrfhbspwdgq',
                user: 'fs1jkilzwq8iybdew3hl1mr3f4ajvcknpl8it5ysbumg8opufkcsjltp077w9pwfmu24ixhwo1ucnr5l31jspmm7sqws8irws5wh9le3ud2nqhxik814c07w13h3ia1e08i2r0j7ekwyep7w96nuyht6izeblualn0azwe3zcm75e3p9w3rhfqjvsxsj4sx7win6su93s23pgd21e0ux5gyvu4nhvxwgy4sqjqrue953s2heus38nncj2eah06v',
                startAt: '2020-07-27 04:23:18',
                endAt: '2020-07-27 10:45:49',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'g1ybab30p0z812jgr2wtqf3st1hkdicq4ccc1ub4mrjgcrnul5',
                systemId: null,
                systemName: '7urkbaw8v6l4aj18by5x',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:12:48',
                executionMonitoringStartAt: '2020-07-27 11:54:58',
                executionMonitoringEndAt: '2020-07-27 12:27:20',
                status: 'CANCELLED',
                name: 'l05dx02xle32tpetbevel3t7dylmgbwmr0fqog8qag9f02g632pyfkcq5a7kgjirzbigk3hdsjysm05vr5wtp5kdw8qqr1060056qcd9udd043ykgbot08l9khgdp70a60dren5t40k8gmly1rb6birre2c5jz8j0ituj4bbwaxpclrcjxye0rueaiu7qjqh2mz6gsk2udbuxgwuj0obhofts332dia0ivlbloepdqu64lg572il2urtfhdx5lj',
                returnCode: 7902108719,
                node: 'vynyjhhsxpt8vwgr5fhk69sdbtmer4hhmfc6ezzhc984g46ae0968si9pgux2vxr4uxn3nin033vj6ado19efiphdhldws3e5pvpr728hghnkn2lo2yu3s7h9he01zyfhv5ob8uyc0ng48bm2lm7kjl3i8xapp7t',
                user: 'gwng30l7vnblh4nmc2mihit93det5jvj8hab90iylii68hsj84rfnearjfuas8vho1m4pvy4d0zkgmktnmhee72p1sy2z3w7dv1qrizyai8fy5w2ah1qm9od1enfyrsere8ei24k4u93ggjf26zgqjmdn44yrir8b9tqduf6vwu6n76iuycuq0c2bpblakqqoj4opfgfgt60c1kqpj10ablmo75i3w3mz5pj69m3xck6lgwqqfd5gyztlm9nv3a',
                startAt: '2020-07-27 05:51:24',
                endAt: '2020-07-27 09:55:37',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'l0zhkr4777hzctzkzudp4rl7uahc4e6h2sm5k6dgvd6l02q018',
                
                systemName: 'izc5r49dis6tvgc5uy8r',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 20:32:52',
                executionMonitoringStartAt: '2020-07-27 12:52:13',
                executionMonitoringEndAt: '2020-07-26 20:07:36',
                status: 'ERROR',
                name: 'fw5jem9ssvc3auvzclfxufl5c1ip63z6qzco59gemqc6wowopc75evko5sifijiedmvhatubrpwbhy3qiaw7i99r9pmg6b998oecns68n6lgrtqtu5l5rnv4alcb5fh0pd1iq800fp6vs60ak1gjlx884v98nvehatb9mnp57r05nkx6ymvy68q2gdhmhtdzn3h1j2cx0jvk6nwjq7v50rt28useruvmoyblf89etki9h58tbuq5blelbwmg2xl',
                returnCode: 6860545629,
                node: 'dw23229foozzc0z1owaye02ialm81w4mqwwhqbhtrzr6gdml0je1dhnsswtmbnavfjw1awo6y5vjlo3e9m6q43bmzst1cowijinjopwwu1mchh60ddltmeaijj7hs96vif0ei1g7zrakzjnyhrjkgl351rv9mtmw',
                user: 'wmuehpuoulthxo6pohwix07w525ol6iy6wgwhqd95rsuxuig6h8iftt4wayn7iw8uerb3p77qaqi9xr60cmet3behkkwwqu43r1qv5re5eke9ex2y6wf2iomh79xnidmbysnphznv3367aq2dmwo00or0xstoo9ivlge1fx6nu90q17769qtrtkjhspofxctlryopt9dt7kpey1llgawvx9rm93mkcgah4hkyltfbt6n74m9iyrgw5zdt2d3i6j',
                startAt: '2020-07-27 12:27:07',
                endAt: '2020-07-27 12:10:50',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: '10er3l2cbgofkr1jpqkui6r1ey8owyqf35hc5asxpq4ilixjar',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: null,
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:08:34',
                executionMonitoringStartAt: '2020-07-27 13:31:22',
                executionMonitoringEndAt: '2020-07-26 16:41:59',
                status: 'COMPLETED',
                name: 'fzwst1huor3s83htxr0qn4vyvtjg8ob0xmbn2jhrb2ugane1jax2an440tl17zyacct1saa7qovufrh5kojj3xjk43ydf2hcym6xqd3xffs87hv674zjgqzu68wd3q3a7jy0txcui8wpyhjeygsfpri73sywd2q64gg4fxpt937ndu27izt945g5flrv1x4955nqxhdu796h3ldsuptyv0dcib30z1x59wl6fzt8mlcvexbfwer2hqaiwkxtr90',
                returnCode: 6294709600,
                node: '5yamzq8h9d6116hd9cvezzu621evosavuxb08cllipb70bggbzg7653h5vni9u0u49n05hj4ljf89wy3h6wu2ywkgj9cg2pkyeoyflv9ztz7hhfweg1ixxxeowpk8x0po9wo7jv9lnpugqn23bbhe2mli4gszum7',
                user: 'qrd77i5me4qo31nrp27swd6jg83arfkht5qj75n4p1nx8e2faayr390f4fcolx5qx66s6m5t2k8yqdhy6j301b29fqa95pn6rw1wiqbpr760nk5lbnzyrtbpeix9mict4f19qgdxmzk6145gmb5matacjqy6z9wvq2knftprbs20w6t5iun9vecl8r1swnwzhazjglzi4pi2p1ercb92rafywskkqpu8i3hg7rzivoz6lw7rlta6phbzfyhywx1',
                startAt: '2020-07-26 18:42:05',
                endAt: '2020-07-27 09:57:49',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: '5i5aqwrccrb9u6moi6ve5s1bjgbu96thdmkam2pie666vzikgr',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 17:05:18',
                executionMonitoringStartAt: '2020-07-26 18:32:39',
                executionMonitoringEndAt: '2020-07-27 12:53:23',
                status: 'CANCELLED',
                name: '0x78xgr25mgzk3akuaden0cyg7txd1r0cdze1nivd0o22y3ezg694ff0mmpxmhys4nl98rez0z27kny3w2ao90f4z0se7la5sutc56p29jh3h9zpnp9jxovgj6kshcy07ekovl1q8xywiqb3ov0tlk0s3s3z5uw32q2eipqrx1y4uyk0zksnu118fprlm7z0rst8fe15lzdhyuhde92qb88j5o0m631xwpksjt9u7zj3iydvfzfab7sry9837rq',
                returnCode: 1760836274,
                node: 'm1bclatp1ei9sxuihokpfvce1tuxqjxwwfpmpvf03z6z0te0plllg9b4z5jdjb7uwrumsn3ndu73otxf1gcpl8lt1jxg7lrn6g6u6rxw0f4cqgrfsxacy3sxtnq1csyzmd1t1jdqkepiof7csrs9sm5dzdgab7dl',
                user: 'eyrn2ht7rwuqujzra8o0mpjcbxgrrzkpsituvfvifx0fbk2qr7pj6w67sdmsuth38huee1pksbo8in8v1fpxucw4ivxvlmuz3a92h88x4tyghgn1zbxpg6bzgmslu6aevbjr6grkcv6vk2xxomuw4l6v8j8efnc2wv36a4vrhht13tkh2p4zam0kb9d9q20gmaaunes2vyhvlwm5u5uuamarlbrmlgvi55lnugq9k1v9b4vx2n91dxkfdv0w5rl',
                startAt: '2020-07-27 12:37:39',
                endAt: '2020-07-26 17:55:44',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: '7row7df0kw3c14llkby5b0tkgayvsj8cdjmv9s3x6lkfcejwvy',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'vgp1mxfmdmvg9ok2ovzg',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:21:06',
                executionMonitoringStartAt: '2020-07-27 15:18:43',
                executionMonitoringEndAt: '2020-07-27 07:58:42',
                status: 'CANCELLED',
                name: 'uzutj1vqrgctz4dx0n37sch1aporv9ih0tzxxzsp73r2m511cg0uufg9d8kbe25na9xwfzgep4mnmw5ewvrtiiv4iij77xonjhcyzx9w5erg9qvvg4fwamxvgwoqx7ltrnmmtuauh6j47aehvaa9gtzgf7q6ae2qsnpb2a0wrv47lx6i8rby0yt03o5mrecw706c61nsbu5wdhd708oprfd05209x43bajuraisyx0p1y0n8s7h9nwjkkybpi71',
                returnCode: 1118289444,
                node: '4zdzbdvmeg2imbvbs7md8cnqzb30f73i23vteerx1ohgpzh73vckjuyaulg79moowjxad7o7rjeu7qcbpv57e390mes9mlnkn5f5wu4i9exj1e8bnxoirhak3x1t0eu5f3oimbe4cm4jlocni5pog1yqvsiklqgr',
                user: 'ydr197d3aukoinxpgcx9ykndztu362b4o4mqu6s06qejifmxk8yw5qzi07tyyz0hf2jeueodcphs43gwgde33tvylruxwo8d7v4nyj3801gq1rg9f1y9nbz9s6dx881qe9rs6u7fx731569java1pkrwt0sgzbmsuhipxy846n8cck4jj2fjwdoixwq6j7qyurujj11o61zzgj16a81rylc3pnus6nmhpdnacann7ephvl8piyu70s3yvjtwjee',
                startAt: '2020-07-27 04:30:53',
                endAt: '2020-07-26 21:38:03',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'pfn7i2v4y17wtttvoa5ote3gn2r5ualdsm03umzpsml191ebxj',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: '2yv51yy0mdjghi8ymstu',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:00:00',
                executionMonitoringStartAt: '2020-07-26 22:53:46',
                executionMonitoringEndAt: '2020-07-27 06:35:46',
                status: 'COMPLETED',
                name: '4a4g77lbi1rzdi0jb786yc12c1ifuetbauwsmoassm5z0yq1ti42vlsidb63ft8ll5qgzvmced0su9j88yh1liftq5ew7zjn11me5g8qbq22y97ql9ieg4ghfv0f9sntmwrkrw8tjjgdd3gbc17xg6yjgb7m24o5ybgabqxf7kixtqerbgf2fkw9d3t9c7w0i3wmylko2o0d5rdad52xesak6kmevy9odchl7ypb89wztjpn3tkeu76zlkecmzz',
                returnCode: 8042692746,
                node: 'r8j8ndfus5olozg5llqq81yhkmpnabuccrhwky8l3vyib5mp88a8c46b1ehygrhvu89if6pphfcgsdk21gy9guxf32wsy59mc3p3fn2887qs4ifynua21uskd3vljnkxudxsnwwxjnssp0f7e9otvkdhluz9nnzj',
                user: 'tk74bb3eny5c6zlnq0zx5feawtjj5cqpxdfhwaonuooary2kco3eg29939ymjhn7z8ifjfxc58hgyn77fx07ev0h361veaauwdg8x25a73m95kcajcfezxp3poj58wkh1ordh4ygp93or1afqa2vdolz7eit7m4l69vt1uoguac6yei0mexdmwc42rdysioamcdqb19jjbc2bwfx7jgytm41h7f9lisugfh472e39270ok7b8tm59gwim9rlrze',
                startAt: '2020-07-27 16:01:59',
                endAt: '2020-07-26 23:57:06',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'bk8d5gnycps2zzhu0p3ehjlpdedsfz8vo3adomfp7cxqnykwm9',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'h3sd5wkloj284drgbobb',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: null,
                executionExecutedAt: '2020-07-27 10:37:47',
                executionMonitoringStartAt: '2020-07-27 06:05:26',
                executionMonitoringEndAt: '2020-07-27 06:01:23',
                status: 'COMPLETED',
                name: 'w9lzm6ouhjrl5r2v7mqun4t1e3kdf2rzmrri67pjer11z7ado4m2yna7zoav3jvipettt3o8o5mcn0uoiocm4kza3irqjdsnt6ax1h118s812ufyhvw04pfdt72s2pf3rnchemxjchxej9rq6x9ngvc77bnf2l5ojwtw058pgvkggrfh6qit881wj0et5qimqiz9qpk02k97w9xjxxg37e4m8mw7luwsur4sf4tyqqaz4igqv159m6j6x1xemvl',
                returnCode: 4290279200,
                node: 'guvl7f0w5w6inims5ltl31ybfa4v5ekcopmq7ow8z3ya5ijoiv7cxvxneu7jhr6spyzwhxenej0mfmyz0020z4esxn2si9sbl09zkg1rokf0lbovxtji477aqq9yawz6s6gl5onebwo667kiq57frhx05abyw1ts',
                user: 'cmdrrkpbewxf78pwlici9csgc5tpauzwtwm6x8tbrc1zdwcjsiyj0z1d0i1fpouadglfvbnbaxdxzixwnbwrsnb3a11tkli14984kcunmuwcjb5d95vr3ci1jdkq5npimengrd6zreiena8ggj13ayszykvd80hc5o9adazee2xqiene0l78tyov96rm7ov2na3wqco8ifxihrpk2s1m34gr04vk9801105merx7wuas5uqx58ee0t9zbn4tsg4',
                startAt: '2020-07-27 00:30:56',
                endAt: '2020-07-26 22:29:37',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'n3o3n3tyeoh31gyue4jo0lzlqybtiorv5350tkhuldefvnw7oh',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'a72p93h9xcpjjovdi86w',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                
                executionExecutedAt: '2020-07-27 00:35:34',
                executionMonitoringStartAt: '2020-07-27 06:04:58',
                executionMonitoringEndAt: '2020-07-26 20:29:58',
                status: 'COMPLETED',
                name: '8ob85ktssgbgsekpc4xsrpirwac6p5shcjf1aigium33suwnuyh1v0xr4rse71942k6uj3f0pczozuid7ed197330raoz8f06duvcxd6csibg45wr0tyzfxive6gnsqjv20cwaczva2snvu2wg33as3cuuuflse43oeiun1fjgufslx96jkb5lkul0rjfs4agy35ltz0ddbylobqxglr89ojyjcmiotcn6fyd5mto8wrgfozu6mtolshmbzp3rt',
                returnCode: 3537762846,
                node: 'fd0z5kkji42y6s1c4cvjrkz7rogncq8alhzaclnp3xli8b8umud38pn0yzaj1kup8p0nqmjk0fxm34b3ebcj99zezfa3e9nexgdtpyswts84o5s7tef9f4575z1772tio2d2vpio9wlp42avu8d1rt78mhh0igxg',
                user: 'fmk3wwhxf8b03a530yyacdaztqhytz9yoi75nlxk8yzx9f0t9ibuk3x9e54bjchtvs5hjmif70jifyar9v2f6que49tssft7dz8xfddbpov5c1vbn8h1x5lysplvptmpvy82tc6g411awq0oy53h0q4ozxwmu1ynmq1lazk4r8g7cajhiu2ual1f6b9dklru936k8wnsopt5oatfzz1ziofhu2tmhawjqbm5t8bzzjwr88bvn7kl278cvp1jmai',
                startAt: '2020-07-27 07:19:53',
                endAt: '2020-07-27 13:06:11',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'tmr684a1fzum6ss2uhg5rhputdlx7alxjdso62ytztg3s4aidx',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'qfxit3h9flz4rff4buv4',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 09:34:58',
                executionMonitoringEndAt: '2020-07-27 13:25:09',
                status: 'ERROR',
                name: 'dhe5w8qtqoutm8t57gxch77cywa5urt1h8blwx93tol2wp1rmv188ifvy2hpolk7n9d5l23gvlqyyovxn19yktpmw1i2w46z86h6816kfhz1cbhic6kbl8uv81151qks7g4jjyh7z51zwgj29rg7623e9ngfqjk6u9sngt1c92cqbpypgrbt3qx8109xuoz6sa7c7vgmrz0v9iewqd39ppu1v83qplj1azm2eprisbkcm6k8tok3ac6nubimqrv',
                returnCode: 6473135065,
                node: 'lkml2g8a5x5jgtdypahscr0p44p5527fgrfpzbdk3yg8713wsjw5vr2x5irol06h7fd1c0pou2io4otenhdahujmgo1ey7j3fasuchsz50k7tfbdqsmb64p1ikhkjt81ped41ztj2iczws07hk2iegmp9rrq38qv',
                user: 'vm2ajojpzf91oza6ilpa0voup6rih0xz8ll6x7750pgt6zmsmx81ahkm1woi0zlzk8urgk92jtvjnds2druwijgmjvie38hlgkyekhomgw638kkd2v29iq3c3lf3hkt88ltjk8nwvuami2mp4gx5xn7i91lb1xhl6gsh3ke14bw1w380zig6xateeej3h4jcsb39n8h50085z8oge1xy6dvxr3i1tzxydu9w53zjld7f2mg586ydxfi8mpet6s8',
                startAt: '2020-07-26 16:50:14',
                endAt: '2020-07-27 04:30:41',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'fthbnmsm1un09e0ecxch7tjn0uvxvijzg9rywxensgkek2ep1k',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'jgysn1nvymd8gwzuj5lo',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-27 01:12:42',
                executionMonitoringEndAt: '2020-07-26 18:50:25',
                status: 'ERROR',
                name: 'qq8ac9e557644zlsfjw289ydgjgl96p3sv4wfzjlmvqoyst2y3naeks5tmas90zh8c4vlr9l9bgxoyvfbhzjoddeq4ax7x2bsrhhvzczrf3kctr2gzjbo6z7r0lmpfv04y9r15jus2p8r5ag03opp2zrxv07tl2qklg94h869fb9abei4xfokd5qio059c2v8iyme4psxxktpa5wsw12pdfuegw7mfc0jlgp41n3qdl5zmor26ixaxbenmux8lb',
                returnCode: 9490893888,
                node: 'lcz1cwzgj8ar2i3ez7nsufik8n7996kjy31kmmk9x1qdu3wtja4ynsv83bu0bpb8nsrg31la9jqk48pv4dbjb6qd3en5sb2mw7egwpp57eokc8asrepe7bn5jdqjnvsj9idy2nay7gxduyp5qapsjipkung6pdzk',
                user: '1ti9y5owvuguqpxkwms9epw6n67lxh7kdwdbt34os9g3sn6o5g57otwk2gso32g2bektdl33104r0fytahpstrkqh9vul933oal6tromzbvs7dwzpd9cb3fxx1lmhhkw4fq33ax1szg1sc7h2s4wzadepmv6m07rkr765oqwgz16nkhvo52p95e11aws0j4tdra1ycwi5ptiiofspc7n25t46gf5kby77e9szpvgy3l3q306duxpwbosv69vov2',
                startAt: '2020-07-27 02:39:26',
                endAt: '2020-07-27 05:09:44',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: '0w8slr53xrjpq258hq8qcn0gedxym5o9i2htmbb8s1zfm873f6',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'ikjbn6dux2n8wcwbj74h',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:14:32',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-26 17:53:27',
                status: 'CANCELLED',
                name: 'un0xtt75u8u1t9gxnd6amje81d4e89b8yjebxhui79mudmobhzfrxjty8jq06inuwycttfd93xiflo3wrbrrrzhx76h4wtjhf4v6a9nzcpzyl30x14qqwudezjlqcgt9mybndcunyxhd90hgptmv4kv950bq5evmuvzhs4o9mgj48mtte0skdcn04r0taexpwni8026na5dehfxzif26mw3abta4ehpzroippfhe7pfszuwaqequi5yv8l5m6c5',
                returnCode: 2777486014,
                node: '0vxdwr4h2q8venesnl38smyrsiw62lemlpk60hqh7llramv66edpfjfys6fhtjzgg5vavzgcej0vkjcrv8utx09vyay81muht9tlpm5msp9fusc39xassxeej7lrfhqfdof3642aeyl50rlt26qr18krludjcybc',
                user: 'pl1fox9493sx6657137a47u5zr9e0hlvyd9o3af8ziwok5cia1u971o9hv72io86350s2f992h9lv2lp04076iy1foo4sh0958bpl2q9me7dnj3b2j8xxpf04o6yjkojdomaokx040ducbzdp2skfmsj76fhkrk1zf6ftsky5eqhnmelpmome1qp5hmyn1568m4krfohzq4ikxnn2gqvw964osdiqh64gsp6kgnv6c765j7b31dh5zlpuap3k7v',
                startAt: '2020-07-26 20:05:27',
                endAt: '2020-07-26 22:14:55',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'umw9djj34u730c9uz0i3vvblmvdfmv6u0yo00nirm85e5ouhqp',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'c4lwe0fhxtc5ef9kjeeq',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:27:21',
                
                executionMonitoringEndAt: '2020-07-27 12:04:32',
                status: 'COMPLETED',
                name: 's2wkmeuxcmbz95qncvt0pvob6kuy7wotdy26wvfh2uhzzzp7xa8lw8lbojsoqsrtww314zpi1twm47nku59l93ogd8w3yyrbesgt7qxcneg78to9quwotwhilnpf2lkmkw1nfjtrntwtzz70plabdnby5mdyrsczknwn2n7pjwejlm10vnqu6xnm1siv3rya6dvg5i3oz9th4vkgffqzdy1oh7j7nlr24n5wy4ikzuzyv1yyebojxmocwdrj2wa',
                returnCode: 1971590181,
                node: 'pqalu7adyu4j8qhktqev8ekuk5x34tpt3pjg1zm0e2mcc9bxiccbz8ql07bxeiy8iea38i4ti9gzgw308vz6q5ms2fo34s3iem1fux1w45hzjeu2kbocgwx98if28pjy7yj0t4xu8a9yiugp0dv2tby0ljecshcq',
                user: 'kzjhz332hdxra2uuccnj5w4dvfs41vvuzwbx36i49cgcnh8vi3n8lpsmjsj78ai8unhu2sbghsb3k7uow4uonao0p9prj8mbtj4kfwzpd9lfeo7nd3ezlro9flmws0albnmpmkfcah9voxqpr43ozkha8brxfysn90trxq9xw2upzbjkoejjwbbuqkfmqsb7udffsvrgcld00wxitub13h96ldp58v978190dsf02lr0kdyb77guw0wiv9ryizd',
                startAt: '2020-07-26 21:16:46',
                endAt: '2020-07-26 16:47:06',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'j6r3xke8fyb9zsoduydhxkjnbrr9g9bb1m037sruz4hh1c62vp',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'ydb08ze4ahog5pkrl56o',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:25:21',
                executionMonitoringStartAt: '2020-07-27 08:49:06',
                executionMonitoringEndAt: null,
                status: 'COMPLETED',
                name: 'tc1zryvv9x0pny1d2m2e8o84txgqmqxgo9p1lqgmzmo5onyc53lxe4pxi4e4lxi8n229j0p0pewow9y9l07qd6lpbz2tkvcp80rn98vf2o2fdjw4bontqad87ft0ptdc2j847qrglfypsx3qtqf1soqevqg0oddvbqmuhiltd4ye41n7yqm7rj4wtodn1l1usppbmy85ci9wp9fo8yc7o4d6ggf4efrwavvuidykrfsng7ofc1strx8jllm1cb3',
                returnCode: 7648958020,
                node: 'npa3q3wyajjccpni7bzec4rqnt9mm0gr4v4soao2lx0tdd66qsksfdkldz63hd88j4gsgb8j5vuqwsn00tvq4cf4jh312253zz3s0qhxmo5ar8xiu491fbkxws54zgu06keppqomlrtcd491w4x4ij8q86nu4b7w',
                user: 'fhunboghtn76e8ni9dg0fh41qhwtnkdwrel1p0enkww2vhurvaeiyc8w6k55md6il17vjqxap402c3gnzifeo3pkcq92n8i81fjmogipux28xuwn8tqtif0mzxiglyv6aab06xtwiraqq4hhue9m31cxy63gt7p2omc6l0lrndnkgnv3ogxr6nlth6ppj1ht61q57fufecbsa3ednwih82vu4m4p02lp1m5wueimya709t8mkz62cnn7fl0r13f',
                startAt: '2020-07-26 20:07:48',
                endAt: '2020-07-27 07:06:28',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'z1lhbwldqy56gbyi0f4xttljq7jhr4umcyiek4yxkaun3a292y',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: '0dr0c0s4sjsvkxzhzc7o',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 17:41:00',
                executionMonitoringStartAt: '2020-07-27 08:14:39',
                
                status: 'COMPLETED',
                name: 'purniu9ebax89tzijentrggnesrifh3n7jdq9so0rsy7tlhsu526nqdtt6bgqfs2rjm4oisckjrj43647f445hy4jsltiballwi5kyx7c29h3w1r3r3t4dz5p3i5h09snokwts8a4639uprqgjq1eikp22b8gokdff9le0olqjpkmm2v41gyrjxu4ohu0fe7r29fe7o34h115qbu42g1r88zlbx4d10tp2ghkdrp29mxs37d5xx14wr6aj4vtw4',
                returnCode: 6517029989,
                node: 'y6p2nrdk71mp164oqfsj7zd5gyq5sjpg3a3glpaoi7rtn1ph26mq1rya6jfqi1xq8nbugqpqzpe6xmqjuf6fenituh9ztvg5vro5i1un2ifkyfpv2a9hgxaeyx7xyizd0cjk75lupsymi3xbw1xlx49p6cayr182',
                user: '6cbyua19msl838qwxyajhatb9863ihgka5atl28bujhglmyu8auzj26fjojfecc6o5iq4mr8sqhf75r9xr6hf2gr3u9119acoonh8yl3u973iqwhzi68lye2wcdbpnanffg6kyqj0lf7ii8xs79uj4odd3yuomgftxgxuwkyuvk0ffzn1bd9e5f813auvr06giviclksrspbm4lumjdfejkudywhqcyehg1pe0byznkczwerk7nqdaceeef0z78',
                startAt: '2020-07-27 13:59:54',
                endAt: '2020-07-27 15:48:31',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'rkzu0go8lxqebxv8884t9r1ckxjjm0plkyxx1430ab87fpb72h',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'havhgrkwlhf5k5eviavg',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:41:40',
                executionMonitoringStartAt: '2020-07-26 17:17:44',
                executionMonitoringEndAt: '2020-07-26 17:42:27',
                status: null,
                name: '1ue5lva8eglyzldcfgw5fja4g9cneky5qq01y2m1dhnn3g1q3tnxbgz5g9xcfi3myj6jhwmlmpxz97ffwwalule1a9ulzcjsfzn161qy7nis5n77g4ugxvk65lkpa8xpmv0hri5sistspjlk7gawffqoiys4nmf2t9q4nadgvtnrja53copgr8u0vtru1vsipa47ixqbe4tynf3leopfeuqnaiso7sq35tnd9ytdyligwdm90jsct46k24y98wb',
                returnCode: 8914473090,
                node: 'vrahxm1tz664x2dcj30mrssobv6z92g4haq93jyk7aywntnc433eyupdy7tdv6bh9us058mmbikyb8lvf4zje9ykmm5l9g8liygg6kzadgx41rkivvwk3qqkzhbfoae0ytt8bapf9sbf5akpyrh7y37941igcv5f',
                user: 'zla4zweaxodrn1coxts99gdzidhnif49n0a9ndqug4d2iskzruq6vt6g8spsyqscjqqhv1pix6grbn0vv5ksbu99xe59ri4wzyx1bvtpcrgyzc9qvcj7l4tmy4zcjqzkazm6f88u88xjt8136s16kohf4m6j5jc3qph57reqbuftasnbsff1awa48bgm4udcuppbryzcqq2b38n5dzw98gmzcn3kfnmd9uu1ley9f441ah4kiu56eh1hdeip3nn',
                startAt: '2020-07-27 16:08:45',
                endAt: '2020-07-26 21:54:52',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'srxp73s8jg1t8myb1zscekt5zabwmdjv6934xgbyrn2uy566a4',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'ab0vwlbofpykosuwx80p',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:17:00',
                executionMonitoringStartAt: '2020-07-27 12:35:52',
                executionMonitoringEndAt: '2020-07-26 23:26:56',
                
                name: 'ox6rq5kfyn4rvalok772odlpw88sk3i8kz1mtxle062zucz3fu2s587m4qovb41jgpwhbawm66p0tjqsp2tdl13j8v2v54dodomvzou0een2l9wlqxft1p37kx9opg54l2y9wngkj6otwqp14lz7tg1bqh26r4zpc16mmaadie5cv23vkcxq2h9bti1c8v8mdpjzw3gj5thg8a4g584lvsgtzw0gnjjcfnh5psoit09j4qy7j2r9wskkul3zs5s',
                returnCode: 2129690541,
                node: '5a7cw76zh42nfwi0st8dlej676o7c1epwk5594w0qcmdnw9f8en0je95uvhl82edgcoq6bcn1098a82k4b6luovd8ciycnx3cdmwagegi5jleegajdc8dyiao3z7wcsw8cuzck7znsftgc2wkk8e9p9qtrvv4bo7',
                user: 'hn4ut4177hhr2dwwgme8a9zj7wgljrxwuwraq5knsfusd0gdsb0z8p5lucz2bguwx4jwd5cg137v85iz22pmt1mq25raxwtpvi9ana69ffibi9qlk4xgodlv5rt2zyjb4exo34v70fplfqpzlgdx9cl0fvwq7jtw4zz83z6gta0oh3edufvk4kbwqvgl328eomwytsblb4gcfppxzvjtrmypzecb41p45484a87ngd9w65e05d36g1uuvll91yn',
                startAt: '2020-07-27 01:21:06',
                endAt: '2020-07-27 06:50:52',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'con59fuae4dpxenni3y4pynbnge60r8gtb46v87i4bws5xu5qa',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'uyb5svrybgn6a3cr70u5',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:26:41',
                executionMonitoringStartAt: '2020-07-27 06:45:06',
                executionMonitoringEndAt: '2020-07-26 19:06:37',
                status: 'CANCELLED',
                name: '0nkg2m5kut688t9tiq6b3p1blz3ckd7nyapuzy9h87g8jfe85pnb7s5sven0uptzy9gvuho7ndwtx7yb0lp412co1zb09xbhwbkzz1lejk07k2apyw2y7nota1jx330r8b9ldlaiekeimdu8fgy7yvqrbbbrw2p80fp8iqb69tt9gr7hu2x3b05g0741331zwwuhzdlks4j2x94u8rfa9sjodvqdfbjtv846dumiqorvsoqzr2xbsuauzd1f96r',
                returnCode: 3203007804,
                node: 'r8j8u6lv4te9zufk8lgxsptfd4c3uqxb8kzg34tfaoc1lrl434dfu3qlv4svd8unl3fnu9hmo9zzbfj0ahmfbe6ghlxxhlefw38gdqmatume60s6oben3v0bwa3gnnjq90qo838ovcbj46yydc4k4nq6uahroww1',
                user: '55fq1rk8nv9xim7mw65jjafgiff060wstnnxj4dy8sdf5ujnfdpe6bg7swnar2g2ckq1u5dfkiquxwr33yy13lp39dqq6nz84iofrenvvm739m52kf1wbganhcfe7dq8rivb851rbdgvizspvoykzxkklcivd0i3wcnhgpy3fwtu86yfbb04a58xquvzpltatwzpxuryjt4gloaxwmv92uoyu0bputecmt3codf6nnwvqmr6v6nfp635r7kx3ug',
                startAt: null,
                endAt: '2020-07-27 14:40:28',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: '9whc3jd21vmq6ij3bc0hw8e554t9hqtumpst3dofl6oer03sl9',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'llic7di75fdjwiind9y1',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:34:03',
                executionMonitoringStartAt: '2020-07-27 16:16:05',
                executionMonitoringEndAt: '2020-07-27 09:12:02',
                status: 'CANCELLED',
                name: '2k2j9v7oyq1g7w2eovpmocaxjmkfdjsaz9dfz61lnsdmjahy5cp8mmp5oxyvs26w27k8mrhjp1havnhfq9vpzbhtq3gylfgduhxpgo76y8rvn55rv0cbw00s9w0gjs3htssl1j585spjnxgxto7ah5otuofjmeye6qcrg49x05nyswli57anin050k63r5y6le3rf19uulcijw3o7jyx371ph12g0d2lepyozklh10gxyxkmmgw9dlqswyv0fr1',
                returnCode: 4819952092,
                node: 'd0s96jqnxrmecjy8p79l3i7h5r6k1xgldggsvrxan9k8j49i2q7c8nc64o70pm2ixemz188bl3jpiqhi4xzi8rsfjfwrjon0qk8jmurxokoyzqzp80b91xy2mpbr7jmbm4vx4mk85lpurm29txt0qt40fa2qaj7o',
                user: 'hffyrdef393iris7cjv3axi7opyr9pe5p5bp25kzl5l07q7m1wuwj4qexkwh6kcwb7quauour6w2rah3cbf47winpnpypnbxmvve5byl0h727plkofmrhluv3lce2ow4t6pfexct3266oymmss263la2lwlud6osppx23fbwnly6hduzra3hsuagyshua37xbjmqmaqsqhf0gyxutnl1myar2rzp0325ihls34mfz3lwycnqg97z9r6z2be2dew',
                
                endAt: '2020-07-26 20:29:10',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'sky4sdvmd768mo7o1gtijy3bwa3jrp5fgloh9cjsdsad743ol2',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'hsquj310f0499ztl30tk',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:31:04',
                executionMonitoringStartAt: '2020-07-27 09:37:28',
                executionMonitoringEndAt: '2020-07-26 20:13:38',
                status: 'COMPLETED',
                name: '084ctbuvn3b5sj5m23fgwog3n0h5wg9oihox7l5dfnr1nq8xms60dagukb19d0s75eycq9zw5wz8ishan8rr4dm8jqn2g52mavh6qd87m7719miw8zh91290xbdhl3bti2r6oqawhiha95tm1xzojluamzld2cav4zvcncrzo99mpbietcpt6bllaw4ikzvcistgg00cxrd185wb34kuzt9z6fd5nq26sh17re2p8fd36swpnjbabj0spnekm9p',
                returnCode: 5066003878,
                node: 'zon2hqqtwhs79pf4ybt16dfmt5k88wddki9renfn80a1266bxppc004rw5a3e3tnl9kpfgualy5n42q0u491rrezm9620tsbpqg3zzwx2i5sijsto1jbm1k6ebr3163a6pbhx9xhqts0u5vx1s44xewouniroi6b',
                user: 'qhglf5n1u4lvhtym5j8an3y4pldcvr31nn6o0h2k5fsuq8oh0jwnbmpduy0vn89hdaeve99t1sytathxtgrsvdngrjg54uq5op87dxwnmeqk7nkdb6537iv7n2t4dbrbmsq2z99aegsprsqqbslrorslx85kupcd3n2h3euxu5rfnv616tg3f422dsfqorbovvmtbk8lnpxnk04yylv727p77r15yxpvf4zbcx6a50eqkow61d4jmlgsasq3sds',
                startAt: '2020-07-27 07:27:43',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'huro828h1plv24legxqvn6b2ohyoz1sntzypaqee5nzbdlxyqk',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'q7ny9pyg1grfm4qks9fw',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:14:27',
                executionMonitoringStartAt: '2020-07-26 19:40:18',
                executionMonitoringEndAt: '2020-07-27 14:57:08',
                status: 'ERROR',
                name: 'znrf7p9iwvx9d0pu5kqc0jt1gzog43bmeo6xuk1mnc0knhmix7gtsz3krej2166jij06egfxfdpk604gozuct33n27xwn7jyyp4rtfkt8tnjzsra0r0ye5co5y0xc1hqvdeb2auumh52nmdoysrnsfdtu6b1c17wszgynw0pet8v4p5wj5ps7qicrl3p5rqj7ehvgzb12k7riacrgoxt5twk3bwsmkhan6zgazyo3zrm18vq1lop9zuct6ffbkm',
                returnCode: 9691084975,
                node: 'm2579kt4211uoshfiro514dvciety4lc92s5wa5bhi0x8whagykkpvef9dzxpi61ek9akq385u4qzrrgn6radl6yvwg5d98jfafimrioduujjglt9cvep93cv7lnzgk8voflfp6ureorpahptjw06zmfhjpzugkw',
                user: 'hatp52cg9qri0h5jcakbxxe8v42wn3ikm7vginf2ei3xsm54wcsrc714z7wh58fp3iek8qr5w8lp8c1lxw8w68xpeqel21vkbl5cmw798nh5axvoeyuab7xkagv7pd9xqw13uxofltvndzfzhlqin4pviu51xwb2vixjuneksyrsnyukqutca7ltk5ox9ij4xjvuqe2piq3aj4tg7zlp55j4ok4jytuemxr1s3xlnttmndrd7db089n249v1rs3',
                startAt: '2020-07-27 14:36:03',
                
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
                id: 'oevhnft516i9sjxbpnlx582hc9lm7qc0634ts',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'm0zgn2ge8kx72jrbuxycidxakw64vve3uvt88v6y6mbg4wf5ji',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'vetrfqvzsx97recqqz3n',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:05:22',
                executionMonitoringStartAt: '2020-07-27 08:35:38',
                executionMonitoringEndAt: '2020-07-27 07:18:14',
                status: 'COMPLETED',
                name: '7pvcphewnbkfj6tk02ypplmcr5b5wvxxnrkhzbu5c0l4w7i6is0jdg0eszmjnodus8idiik788dovv3ch9syylzofvdotahog2bhc75eedama59kp83ngucagw6nsvh94tm5d2r57app3wvuctrxi6hex0lc4kykbifda3xuruqln1fwx0xaskdydvv1zopo45to2fy46ol0cpw05ktu2dorxsfl50ez5v60hofqqhoclg87xcrgq9wuuvtby00',
                returnCode: 3195216884,
                node: '3z9gjx8fv3vksp7sheosgfgtzh1argj4d8jdipbi3we7cv5y6qpns9yk2g8itc3p5gqtoulp2imm9lf9t6n2x3yt96xurtrgdu22k8zbufr0hepy7o4tt6sv9ckowo0gain2p319mlfr3hf1cxtt4isa2b2qwddl',
                user: '05sw77zdhwlo7qcylf92gqz7ofjy1ypn9bszg2ndsrmu6wpj8puuv7hzn4q00t3gawhtzcvjn70j7sf363g8qgf3lcfj354y4acma9945r7907mp6dabgpg3xshmlar1u6jyd3o5g4dt5xp39nmzmu9kez9seevdnmmc1hcm32g6qkma7ytz2evsk66xzdacg2zyfxthwl3rfuca7snchyuw3xsosi9egyjagb0f94je93t0kywa9bpm8xfo1uy',
                startAt: '2020-07-27 16:11:04',
                endAt: '2020-07-27 13:33:15',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'n0amim52vdk2tyk04lf6fnpghssvpw556zc6w',
                tenantCode: 'thnu234v625twvmf0fjcxr3pa8e4wu034lir7ok0g42meayxko',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: '6rbwfsflp3hsv8gpwny3',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:49:48',
                executionMonitoringStartAt: '2020-07-26 20:03:48',
                executionMonitoringEndAt: '2020-07-27 01:17:46',
                status: 'CANCELLED',
                name: '33v1ip2tzcn27lfhh7hlleitgdub5afc46xga9tzutmca1cg0fuh5g3u9zaoj6wc59kwns3rt2m7we26xl8am6ps8eu8f2e52sb3qkvtjvst72nqzs4auj3tvg6v6lzn3tkuuyq5t7bvl6i63ie09my3b12zbhvcsm7dk4wo5dt5z3bpwqivxp1771hnpvsxh6yoex3a2w3kiozc5q87e8n0eadup9a3dl40dvfkxeuu9dal7hddilcoioeg6mz',
                returnCode: 4235533777,
                node: 'y8j5y4szw3ovvpprmszw1agcqfvzzswyb8it0tg113rux3wflg8bztqidcw5oh4u2wrmqh4p2s4ik4ut3sajr1xwcylm5lk15drhtujz1kylrccgq0h5b90wq7z8b3nix4trhabmhq8ijbw8gu77ygeg6cpsrzoy',
                user: 'mrzqedc8v7z1za5b39jmkdlema3k7f3juqc03uee74d4fetk0ahdxu449sdavif61xoqe9qym9errjlmgab1ukdcwtibpa2p0eynecoef2litvkfuelnft2eko9lhovkb8hn7txe5agrpo3q2ohu6mnvzwnbh1mg8cdsjn5ccdaabqajs21ipu374bsxe8gttxb667bnaq5npi6z71m5e7ps33fo7cv1evavr078ukjnjaa0qpvrmxpuqefcied',
                startAt: '2020-07-27 08:47:45',
                endAt: '2020-07-26 17:39:36',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: '8vuuexws9zikhqnhdkz1ddo10srjwp940f53fzw8my4o26j79n',
                systemId: 'zti3omdcwos3mp04h3qw8r6vtuk2hdmp87rqu',
                systemName: '8in9q3vj2p7wvgx05ifk',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:30:30',
                executionMonitoringStartAt: '2020-07-26 22:56:15',
                executionMonitoringEndAt: '2020-07-27 13:21:08',
                status: 'ERROR',
                name: 'vfioands16rezxoqoks5pdalcgee8cmzi6mia1hy1x5p18xeqns6nlcgaqify5itpwk1l56o2t6jqmzgfxpmzx81v24r9293u691k25u4dtskszxygfgaiexn6tmzigdel175fiqz0h5x4a7hf4spotntdjxxhjg6qd826z0epf0nb39abewz4fd717k781m37ohls7k2ah231kofza0wxw4a74mq8m1qtbcj5y31mdin38fhh55s3xs6f6i4a8',
                returnCode: 3300327338,
                node: 'p0zxhlx7p3893pi0kevoilgz11frnuhhpwzyjm7t7k7pkdmtjr98ajr6ysn6p9gu0gz40jd1crfzj04583g0i8xq83kuadlmfxvvfj4hemp0o98c8k8zowryjsynketu7zprd28ejum9y9yaskq6sl6jhxzdj0ym',
                user: 'j15x5tufcvhgp8psy2a8lk23awoj1zom9032rhckisx7nh21l8ewzfuf6vqcynodjcc8calco8ivaij856n60aj6sg9t5ura0x20uby7vmzhwn9w9q4ebskua4egeagzh6mk9gybvdqpcwiacpnldzvvoalqwvwhafn7pnz6lhpheolvk9g91fe3y79esw0vci9r40gve98u6e8iumj6fo5wsfgpogtnds5pzef8x5zoty1wne4l1inzzvfofd0',
                startAt: '2020-07-27 00:26:50',
                endAt: '2020-07-26 17:38:10',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'tyrk89w9s7usfe7qqsv2thv9as7p5swuiyrg3ju6eqxj112t60',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'k0d4ihni664micmlsgvr',
                executionId: 'ebjhvawrpihztreoefglsx7zrw7x5to34yenv',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:31:11',
                executionMonitoringStartAt: '2020-07-26 20:34:33',
                executionMonitoringEndAt: '2020-07-26 20:57:56',
                status: 'COMPLETED',
                name: '701xp4frbopaotqj3078et710wibd468wi6ueydrwuz6dqz74qjv8l6lpuyx8zrgyc1x1ezvhsasmyxidjen425kdr240nsum3xjon8j5y9dfivnrxqon32ksql2kbq8b9h0lg9gxyktwh225wwup2amlgcn4wdiiythvdv0f3gfrhxc626qrxq1czvenoonsy34bcc4s3nbged687xdbbe5vqfm3x82zyyphbabzem0rokxrqi4ou6mrkvop68',
                returnCode: 8657565812,
                node: 'jkc60ie4qp6z3vu9ypqy9aatsj3xtnz6np2zyq0b11vhooxzojrv3lw1n93d3x1686hy40oft0xr4nlv2uh217481sez2ov6i57g3up8es46bmb124adx57yavg8vahdg9a723uf2ke2encz58ucedvx31cy8ii2',
                user: 'myxtmhzpu9fw3mxyygngygtrwl8cgy721sla8e41fcatyft7elu9dh6ddwwuk0nxv3wnlwzynksd9wrz0lwse5u32sm5yzaaokgvq2evj8y5wg3ixp4x1j2juxsyt9kklmdonikx05bofrni0zo2epkj2kg6pdpgg5i41q523ypdawm2rzopy3byvnx1eckca203y1vra9ua2eakri1sb5jul8hbfyqvmsknvltwpvl6vyt2bcx4cpkuzoh7oxh',
                startAt: '2020-07-26 22:45:14',
                endAt: '2020-07-27 14:25:33',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'da3ajskekz19wrnjwxovoy49sr8histj3omhpnlvro178oyd1lr',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'dlpk5fnt6bsvlvtglspk',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 21:50:47',
                executionMonitoringStartAt: '2020-07-26 17:34:27',
                executionMonitoringEndAt: '2020-07-27 04:53:21',
                status: 'COMPLETED',
                name: 'e9epcj8i1jpwt2sntcf3jsln031r6wi1bpjd3niocokcgivgdno5o7nyupgtphxjop6wsbhdt64bgph0tkcc9ohzd553c2iiz74e7n65ofdjpzm9rly6ohuf058rhhwl4ait2480bak746ghw1d80o2bkcwvo6fyqvcv4sh5u78ptl1v9ayr2i6qwc48v29csaqem1wzavi8czwu47czgr01u6r9smwthzxh1j9jlxj6aa0ovb3clizuw22v1xn',
                returnCode: 9232136382,
                node: 'bkh8nhp33qcpqxun8wmhev2xc2msjw9uvlfyhua8aew8neymg6qhbnlxmk2vaa5en3y7frlei8calosqr6we4n0c2j330m200zel74bjed3tl3wy8h1hbvm26cq2yiqfdw0m3toemz9obryetbikijkzu4ls7w1r',
                user: 'v94fkd9bp4ep1bcwgvr7zyetl8iwqbrj9nf6h957baj30zhhvu7l9zdix5uiuqbzvc82ucwwg7o0z6a6iw1uxgvgbbj1cxa14xhgr3jp6v40az4uf0bc2te53hn7ge3bzoq32zmimha2tgaf6euz9dg3ocht0dhlwtigsk0zy05y7zv3fxegishhx5tovi43vkbfnnhbkeiyk5ajszoqx89jf5z27npuq7y2uz5hf77j5im910fiqtk90cb7iwq',
                startAt: '2020-07-27 04:37:24',
                endAt: '2020-07-27 11:18:06',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'zeoweenrwnwpa3dzax7rw7t1hsqh3iix1oo6r6o6p7zm3157pl',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'ed760lkrl8px2eb97c7eh',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 20:49:07',
                executionMonitoringStartAt: '2020-07-27 10:36:05',
                executionMonitoringEndAt: '2020-07-27 14:05:39',
                status: 'CANCELLED',
                name: 'o1cdxp82woqd3aseagc3wknnpb30fb157o55u0v7avhwahvq4hwx9yh0mo6dxhhzrsq4okzcn89245tj5aswhjvtdi21mashm9y6j0t2oh25styjpq8ofj3mct0wicdxag02u58drm9jlf8ffb15ze84h9zwv78wzl9rg8he7vxsnav456g105fqugfljw4gkg3jwnmrgrm6vc3uy4gs9iskq8u19dn7nrm5xjeba1s9pcxfbpxtrews0iu4rfl',
                returnCode: 5686097151,
                node: 'whnarrnxyby9vo2mu9ho5x0wo648y92d03zo6w6h9jlgjqil5cp2kiljy6y5236wtcj9cl6ashrjwd88gban39x5ajisxelw900a55mtjwfmxdztbzapn6wpaj7lsnzjonhuaeycxa35zpyf5204iz1blcv25q04',
                user: '5658jzwdzraw0b9r24sd6f8a9v4vq6l9pdnoyxaz7iql2a3bw6fh0oi7vm8hssiq26doa5a3d4ijinc4dq2joy172n76cuhcqemqb4r801do1lt9kpmo80ljggw1hwcq9sg18ysd741hvdq3x02f8ea21ft6aw2neza119s88j1g5pnalun2g6havsiiha9rzqsq5bqexqh7ixrkuqspkb5lbilzhsg70m5c5tes52c55erjcye48f7ag7p1h8f',
                startAt: '2020-07-27 15:22:44',
                endAt: '2020-07-27 07:29:32',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: '3d9kzfc1n5u4unpefnogkwia7cmwo7yvb9d0yl417vc8ork3yb',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'crga09oh2k5wy77dsfp8',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:37:31',
                executionMonitoringStartAt: '2020-07-26 18:06:40',
                executionMonitoringEndAt: '2020-07-27 11:15:25',
                status: 'ERROR',
                name: '9dtdef7cmldigrn82hacbedk9yvbb883fru76d9jchg7z8stnj2tx6ord7437vxqadzufufafr5fwnoco3w8qxamswoy5uu6r35m1yteldwt0kbtuli92eenzn95qfx0lbc84a8g69e4midzp8c2z8m7hivi2d1qsgy7tmfq0r7jt5ebzftxjarufllfkaztmoixuncajlmenal1wvbue6sn5zdbgp169rs1n1z2jyis02pwr53x7i34yqiqv4rb',
                returnCode: 6266541283,
                node: 'xg31nybu308eimi18wa7mhpsxta2hlwx2wc515nz2ltya59bsnllprpnl55b0ef75kfc8v4byi0zwmngln5g1ysfa5egngo25e72svlbqr25eggnm97qng8yjk5hyvzyi0v5xcusjxpyw1xs6a8tr6tuzy84f3bn',
                user: 'wctjgrlpv8x417dpzd70c4nhizb7vnunt7i882ye16ooaz7pxjnmnx6vesmrrj2odowbb5rsgcjoauj1k9uir2kck4sjf5tsrdxdpjosa65owhql8kkakr7sbrpy93s1d735tj3e3fibqwygshwyojknao0yzgz56nyk71ol80mmsokcopo3ons4xvsnn7datqfssceupoigrd8mcsrlblg1b190p1v9ubqcuyctck93jaj2bjc0o51myz3xvfk',
                startAt: '2020-07-27 06:27:37',
                endAt: '2020-07-27 12:54:53',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'ncszwqwa0vq3rcetn58vdzjv1joqoqcwxw74ghl3zjoqhxjy1s',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: '22yg9zuq0j6ax8v6rihc',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:09:20',
                executionMonitoringStartAt: '2020-07-26 18:13:53',
                executionMonitoringEndAt: '2020-07-26 19:07:06',
                status: 'COMPLETED',
                name: '0of930rjkvfng3ct5d8zkfw79o28leim7wcvdsrmtw0kr1herdrg31lp41v30hk53e5dkmgke6175qj0zx5iczyhthwewlwkkux6grqwdnxhjg7r4kg0d0v90mbib1vvxe23ozsxecxjxsxpa94wl5259t8cydkbfmemppj27iamyj7paodwnqn7gkquxeqryuwom9oozq2uml5vvi0k7da26bxgoyfnsmrryxpl7pacqbsa4yeb7mgkwtanbn5',
                returnCode: 61691471357,
                node: '05omwaudsu6wg7je1hhur94yt3gf2nncomjhxfmx9xqfus541y68h9d48na9lpv7rjpaj67w6c9fpw991r9kda66l996v85254atrzfx3z3n787tsxjqmbk9a2mlup0dl8vz32bt4zf2d8em6zy5u8qi8nfefc0d',
                user: 'il1hyznm9gef3iq6ur7mdszpuvhjghpgmr4giqz86e06lmq3ayajda22mt6o8a7gqbyz5krwplob062of9100c78cjhsqj8golej4lzkzh2dgat9xdoj1xfrh7v0ponwcfphdy2gsyuziw0i8xjesdahfuujxk033lkpgqbp8eganbw3pu2fzwsh64xauhfi4ug9xopuhv6n4516iydmtqvc3xisui3ldbfbb6re76ordx6hads2qytv3dprn37',
                startAt: '2020-07-27 04:29:17',
                endAt: '2020-07-26 23:44:18',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'a868jxa8u6a6m9w3k7b0i4f3m7xofx5sacigefkvgs9ptkztpl',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: '7v9i5kmra5jph0cr0599',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 17:38:54',
                executionMonitoringStartAt: '2020-07-27 13:48:14',
                executionMonitoringEndAt: '2020-07-26 22:48:47',
                status: 'ERROR',
                name: 'rzbm5u9barfrvnbtwltsbdq3bjxa9ntkdsrql5zwyiaqr278n6t3tokj7a4fuo1momirk46ghjdfq9xy3rqgf9206996fle9h06zc6epxwkngkbbf28r6wxivqpe5zxieipfgk1fqyfp261b21753c5h88p2y89b0ne9kggoux5sst0oj56uycbg3d49amucopu1njp1dsy6eq6aszbknjvrgxud1x9ba8p0xbj0vtqeywgn0l4cmg2rf4oymdz',
                returnCode: 3074060333,
                node: 'oqzxm2aczov3ngufgdl51o1omwyo4gr5qzp1pwspnhrpto13yfh104wjgfqvzy202ygk7v9vtpfaqk17wyqq3hmcbyd51zajat335k33984tp98nuaowwnxx6s3t7cixt6ay53txoxodlievs3e1hspnmyez7m9wo',
                user: '41mty3uf06lhk4122hc7bk2vqlm4kqcq44n78mle5u9izhycnf9q2ydtro95ean9uhat99fb0pxiodqb1fv7agpjularuywnbsl642ryl31e26xc526xa9a85uol7osw4affi8hc4cqry9ywr2q4dyu1km5w3qpbjfcj8v2alpuf7zl3979bn7d1xxclbgytz3newtjbszz5sz85cargcpaefnzlcjqhdbktigbwz9mql8h0eulfwgr22o83a63',
                startAt: '2020-07-27 14:24:37',
                endAt: '2020-07-27 14:52:13',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'vg6kbly84b2jy70e5xds3ee3vazrg76k1rfrteux3l77i1h9la',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: '7o0f3javz3w12qu2ce67',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:48:43',
                executionMonitoringStartAt: '2020-07-27 08:36:23',
                executionMonitoringEndAt: '2020-07-27 11:52:30',
                status: 'COMPLETED',
                name: 'vx6lh44gb9gjynspsorvqrfpbx8uud439k3i6btf1lahd82uk98fpdsld5cpwgp9o8aqw43rdufbu80a95jo4azfwjggqds0wfvvhw2z65eq946714gan65hxgrg0lkxefm7luhebom6z9zgp8ssu3m6w6gm6b7j72ojcxypgnwct5ez89m9nv42nm5nn9nopgq1nxrkadfqpa8jt0m7wg6tigt9evqusso9q6mtcwb41or7h8rm5scg2iivrsx',
                returnCode: 6662739031,
                node: 'e6g5v2u0olb4xyp5h4ovfb75s0c3ccxoufdc69j655otdx9poql9ggu8om08a8vw30xyij8r7evuub6xz6grhowzveo17m8uqv8hd39a62pa3606209o6ficjs62w70rkgh6tdde7dpksdu2dz5ian24f44ruq5n',
                user: 'zvdmp35peozcwx90ba0tymoss5eeb585b22vijtcygtv58oucmhsk74pnymcunwfjwrevujzo5sx523znsvv7iv2hl9nbqk4u3oy3fatjmjdors6d3ytguo58az4m0y519fq346o1zb1xkxqi5rf5fj4kdxdjfciqcun0t71fi9qiecrs5qo9s3177wne404msny4a58vglqyfxpr6k4xhnezn1hbw4w74q0yjpftpvjl6hsuys258zua57fawao',
                startAt: '2020-07-26 19:47:23',
                endAt: '2020-07-27 14:15:16',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'pl8uudk5dg4vn7irlxozaejwedsa6joh681ve9ejb4lsoh235r',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'ppxmgz807sq1fkstlgdj',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 06:33:30',
                executionMonitoringStartAt: '2020-07-26 22:21:54',
                executionMonitoringEndAt: '2020-07-27 08:45:48',
                status: 'COMPLETED',
                name: 'qivu5ahaycnky0qz07f05b8x2q61x200ow2o0fqhrefh38a5z6eba3ihzqgc4w3zfgg4dylq6kbhqv1j0ya783s3yzew0yib3yb0un483r8myxv5xzn6up07npsqfzn4s2r89pv9uwqlw3coy7x04tu0ax42vb9lqyms2orrzb1trgqpw3bur5deke2kw0wv78t7kxdbddhrgcohu1da2oo75gom0zuldfd4zl5wiv4kn4ygkwtu77a34pv9uz0',
                returnCode: 100.10,
                node: 'qrxyrl9dv3saaba6upz4n18qcqw2me1megvclbjxfhxsq68g65uitwwlxtfraseip7ius0pokn0eg8q454hbiotsl01ju5p7frbl0ssot1xf133chz4rrxir8elaedm1furyqcmzy0c8prf4uwina3y9luo2od8j',
                user: '6i5lvmnwlaxkkhvvk03k9wm2w2zpn5805ga9tf0jh32qfvudxcxzsqc3wqqn6smv7cpgm6k8o1g9tr21oun1665ly0mh4xaxlv9u9wpitd9r3ay0ftk3fifh3wbqj1aurk77qtvf4lshsawlbivzn8w9jfijces230j20531sb7azxqi1yjjduw2u5f4ijrll1qr7idxqtcqvs6ou8ls7r9p9wyr905vv5z8yxyf2rr23pl2lggocdlun82q08t',
                startAt: '2020-07-26 21:58:42',
                endAt: '2020-07-27 15:13:43',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'z9kkktxhq0ksw0r8rsn0oseo35nevlt8eabmmlc9xtghu2hucz',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: '4a3jwwm7lksyhbbtnj39',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 05:26:19',
                executionMonitoringStartAt: '2020-07-27 05:32:50',
                executionMonitoringEndAt: '2020-07-27 06:37:01',
                status: 'CANCELLED',
                name: 'a6msjtxioqwuua57ac7ibb6l4cqlkxh0mm7190pqql69ktyfurvhg3yugguzjp2e855dy1fyi9ckpxjpq4ekddp7set9ums4j6dtss1slpybny3uzpetuixoob59yuxjr7attdxd0sw9g9c2ma0bdy07tljdh6fckabzujvth3zf48ff77tkf21v8uhwegns8znj7e636hohnxzuvlt9ih2w5j27eng6dnmbk33lbhaox6dvfmh4etnss3io773',
                returnCode: 5760328624,
                node: 'emf1wuqqylxphr39rh2x1asdtknb9i847zq16yaw8l71scaxnne13juqfzp1cenu67ssvkdcsmwsome4hqbh7tg9cdid7s902qq3lx0a721s4sf7u9d7fztgbu4iav8vqbafcbp7btxtf8jef52kyjkja7epha6x',
                user: 'pxj1wdl9nbmzbr7tbdhw5wq5img537pct543yyqinu1a6p19s4ckeawkoc883kcissjmxtq7vn3sw3brrxja4xw5wozpo07putcoczwvk2fubum2ih81pjrpciyamtt6csj9ugsroxbrf4b82gfbm0k3xiq781uq1o9ldvvhdurdc1po1wzfssr3ca67261dbhkgei57q2x4dx2rro7g585rfxy63sy36yyw6rihvof46biniaqdpwasv4q1n7f',
                startAt: '2020-07-27 07:26:39',
                endAt: '2020-07-27 04:16:37',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'yz2vzcfd1r3utz4awe8c7rq7zhu0767i9co6cm8b2my3qqmgyy',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'xlkzbyr98sayueonmgzx',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:40:17',
                executionMonitoringStartAt: '2020-07-26 23:11:47',
                executionMonitoringEndAt: '2020-07-26 18:04:38',
                status: 'XXXX',
                name: 'iqkp6bic628eolns694zuhuj0bc8wvl5yse95xjj9x8desq2itsshz98vuwymp9npetzob1wo593ssts8aa5ca4x7lkglm1dpfo6k33504x0pxofbe3z4dk4ox6zv6wlelsby46g7oof5u3qrn3bkt1j5cdovz7xgrk61w6llu8i8te9r7qayr3486guay83oa8nmn17xea28thsdmsa95460syjnlj971w9tgbm3roa9a629zghg7401l4r7e6',
                returnCode: 8358360695,
                node: '0jpex0ges9lebcrx8700yh0sltb5ktte2x0159y7fs20v26770n0cu8muxdbt64smy2hutumyk3nmhpsd3r9x2u655hrab3y25f0oziyf3whx1db9nswj4nopzs5d64l7ekv2c4qnb9c1c7vbc4duc6y8mdzjfnt',
                user: 'vdrpmdzt6pepjfctedm4v7cozsrw8g8c7tmna5xzmneqxjrkfwut0y7g6dw4b80s1kd6hhrzmb2sri5sncan08glga8qnekb41ghsftrp7brjw9zw0a9gv0jzite7pwmf1i96v9far78qa34yp845350xmtx73di0yji2yo9900zpl70ovy3zt4gbxe74fd9ua1gdiz3uzn97zcbuu8huxfnbg0a6nvc0tna0t2ibntt78lpja07p64l9p8ql44',
                startAt: '2020-07-26 19:23:45',
                endAt: '2020-07-26 18:59:32',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'yshvp8qyhp743wwf9p5c42sct0609vi3wipchzs0uvs7xxuopn',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'ihdp38vu6xsn000cpq0l',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 10:41:19',
                executionMonitoringEndAt: '2020-07-26 17:21:48',
                status: 'COMPLETED',
                name: 'mj6rzrw9anju8o2ez82rb240fgjq1ukqf0lx9x2kq89m2mr7ziz2weehyvxbmwocokgsa56cvxjsexd9kyjxvw5hr2cg5797akssmvdezpmj4co96n04gyyy8607qfjbkjwk5cv5m9a9lk2dqadqqvi0179ux6kns0towaa8011zbe2qy3jzapcg44x59n92jocczvdawewmi8jw8639ee7singxwgjssmuhzgwcpxpuvbyjt9ytdk28ha352s5',
                returnCode: 1883645389,
                node: 'lrdqv2xs27ab4t5zycbvub5j6fy410dxow1fnd4stnbmuzmcuop3z4vxmlfk36vcivta4hioxvwt3ln5dj044efn0eo5mtttwdcw6x4i74mv9nowarw6ql55jdaxsa0erlv5qm2qpjwupupmzu5m976sxs1wnzv8',
                user: 'llqblh34ggpfbwplr4l6n6jw4soi64wm0yw64i4fju51zn4h63bzz6x4x7vci0kfvf3owarroaciqo9ppwxsgt8sdp8krwnfd98gebdo7ovixuit1nthiu34g456rzpb9xttrxvratejrumwuwgilfiajdvteg9kcendlzdee2zgz3d9p1w2w405zh9nt32zg69528sppfrsltnlhxb4u3q4vrg205a7xxgffe777lafcl6csjp5wwfdlt6eh0w',
                startAt: '2020-07-27 11:20:35',
                endAt: '2020-07-27 05:42:43',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'qk1z9uqrla15j7pa1bizidlbkzq9ly2afxl9k220tmw18ycwr9',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: '880rm1ek6jvxoujdfabm',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:55:51',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 07:49:51',
                status: 'ERROR',
                name: '14w11efjwevpu9xj31rhtub5o9zv9myv9acmebumxoduglbr51gi0sz4l1zcltcjhmj0j2p5pe45j9kswcsfsqjdan095qo2xsy9xscheqco5e6fvklfe5p94ihqi17uu5hrths4kpgmg6u6h8c6zl4ezmvm7o10zedhkbs5st6izbixu91uq9hizd1r9idptesxa7dm9an1ci0otiw17lx8rwqagie7g3yaw728ixa14k7n42ro8h2276hsh4k',
                returnCode: 5294066781,
                node: 'c8kp5egjmf20lny2n1nbd6tjpqmxeex8l1akivr4asekj70k5d5buh687fbsk59xw4vsi3a21449bssfza53ilgxyan5x2zaw0mzx0xdgavn1fm4pz7pv8fk94c63sb24uemmao4b9js30fvmfsj1kpebcrh2wsz',
                user: '3opvs8nu5bcdlzudflccc9i34b45e3y2g7uxef89czjilvv2rit6znod57ool47f7e1mv9vt7tu6cqngk4h40xp99c4xvgvjxumx69vtvfohptx19cizlkcffl9ynwjo8joz3e84r6uoac5fg99tkcep1gklz9td0s5834r8d4pkw9ax511ke043kbx5z047ezr4h3zza0fgguvar4lcrdgqnwd05sxwczdfkf77ugr225zrqbff602el4qk5bs',
                startAt: '2020-07-27 03:59:09',
                endAt: '2020-07-27 10:03:26',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'ykhjdjydgzmgsrp9i83sftcwl2y3ys97k53zr2wqrqzq2whhue',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'yvrfx6kgw1cn2r6mrbfs',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:10:16',
                executionMonitoringStartAt: '2020-07-27 12:12:18',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'COMPLETED',
                name: '2arozi6qm3y7tg14y3voskesq3hdezs8cg1ut8ho1273csxkq0u5tzhiuucblj785gzr5tbkf255p6p390trmechuo93s0i8jdfeiuss699bg3b7ihxk3aimibj6ysp29t6dpg9181624w3zq0szd7tspamrsg1lxv7nzpd77t9qscs8rcpuo78hbcu8fkrui480ggfetig7an2li18jlyg8sr0g91e19tl9deep8hij52edsfs2pb9p1tudr6f',
                returnCode: 8007363944,
                node: '0uigoy6iaue78kiql1l7jgf0llboatxhc2aezes0ecv02z535ln2cdspsw5bj1ymg62p1drudn7nac973v0vczb1y2cq1v57d6rqnstng1mwakh4bd9v250bhyrqczzqr5mixcqfw0dzdyr6c6isrqxrr37ntti5',
                user: '6y8zic3yyvb2gckmle5ihwtimrqz6prx9r630ed5jbo4qcx996zcmlrkekaga65bkpk3w86zwi232kr8dliq9omf8kd0z9ee8opam52cqtlctmnazng2rng27lb68smw32zaep9w49l7hox08niw990hctaya3r2qnc3mwu8vvx9jmux7r9oct4hz7gzqxy1ntdldtvfm3u8bglybk2i85vdvajuooh59qv1094r2wv8iskf1ejjcozv4fif0rw',
                startAt: '2020-07-26 18:17:57',
                endAt: '2020-07-27 09:26:01',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: '8ki9bwt1d4e48glm3sxvb4vt91op9yha2d38abjwwuzikkoonx',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: '3qois5lxz1tqmvqudmj0',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:34:01',
                executionMonitoringStartAt: '2020-07-27 12:26:39',
                executionMonitoringEndAt: '2020-07-27 01:12:46',
                status: 'ERROR',
                name: '95i4m4ywlt8fwkof2pw6e3jvkmsnzm36kg3qeey5mshuqfo1a8fibnyyu6exq1ifgll955rqaczipibazt2xaic7pkoqdt422v8wznnn06791bxyl8b27sb1cy9y206omp3ys41e1anzk5ivhry3iiw21n13hmo3ihwevgd1dekk6fp48g8u21p2h78hj65r0qimcxvwnusxtcfxhc9ojt6osudn7gf3vu4gnmco2qwbwssly3mbytdgyzw9k23',
                returnCode: 2757512943,
                node: 'v7westipw6q4qpgz9dy1yr39pysofwstazc945kwf565f50gu7ovhtw12tk2qhxkzgb02qfur8jlwpqooic2qyh4ttxr8nj1vlgfnl5345i0rdhb0i5cey9zbqwi9k9shf2gp71yy8q8zalp2x3zf9mtxax7wkun',
                user: 'zo31xfc22its7z98hnciw5tnwuq3w3391ljymasia4matu4m37x8og5vjx07ozon1qlohlllc1c9y8cc5lwk9nxccg9cwi5l1fwnm3qrvaebzsk9f5ni5lbsi1sxrji3cxpujflm1oybjwe2u78kqlep4n4h3gel6vrgqlu2av1x96b1arctexdjgouis0y7floou989lo9t83980sr7qbvzbhwskpq0yytb5iu16dcg63fv3wthh9hte4b38vk',
                startAt: 'XXXXXXXX',
                endAt: '2020-07-27 09:23:01',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'stmgw6vsbqwednxvtey2wz7k48ldzvc91kwm7ggqiffpyp1h1l',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'lciefhvlhjs2l4tqpc86',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:13:17',
                executionMonitoringStartAt: '2020-07-26 23:43:48',
                executionMonitoringEndAt: '2020-07-27 11:17:19',
                status: 'COMPLETED',
                name: 'lqk6t9jpnhsmh9herowsiycm4krc4dsv5sek6mioxf81jzuwzjbwdbw6xqocv1g4xaxm6q6wfwisnabv7wdgmsnjti1x595rzhcatjt1euxse6klp01g7y3xfpofu68neg23cu2qzbczb45i41nngyzvgkxbxuf4sjsjk5h32051rd18wxovceoe31ls3e8ho5tex5gh3nuv4w4at4bnoo4isdibqy82qk7ir6ogh021ji760qa4hvz3dlr1c2l',
                returnCode: 8617816388,
                node: 'ejt35ssk00itmlpevyhxstrqn69472yvu3pqqhyy0qmumw6yhkmn78o0dfx8w5xrqrrk7msr5y4a3zn8hzgjjptmdjomxbefg77w6sxbsjfhclmhqnql5itz23ltnru086z3lpeuqrp5aauqvd06zyikfjtydyrz',
                user: '1edlgqiscizdx2y9um8knf7j6ksazz7v2moez3g1e07g2wxoaunr3b4jh81p8pv55mc1p89149vn4yl663mkvwsp954ejm7weh3i1t78jjnd68q269wucqa9c19oqzs4jkg6uixz7ciif11t4i62znts7d9l73uyisdxul5jnigsqy6vrwxma4z5m937r6a1j6d3ooubzt1yqcuw122rcl8ha1whxn7badv29ujq4aer75ppms86w7wgr16i1lk',
                startAt: '2020-07-27 10:47:04',
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
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'vplcias9ngcpag4s76tlmxflui08dis4mtv1hvo4nm8yhxoyyv',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'brt35iqhs2ar51ma1m8b',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:16:06',
                executionMonitoringStartAt: '2020-07-27 10:52:43',
                executionMonitoringEndAt: '2020-07-27 09:36:46',
                status: 'COMPLETED',
                name: 'e1i1d9hskbxphbctdvo22hbsactwtcvf3oahr9fcwlpbpxzktg2ickngbdmtd3yoft0q2gwrkr38ad1i18gggrjdbndf4wnm8n9v2wch64rooik0cgv5cu71j907s4822b9r7slxa0qesl93lip48yxhow5159w4ttwwixjjodbz69k8tdibmi7a8cyh64q0t019lukuil0hn4ulvluwql7sqwlzq865ro65wd5wr1r64kvbm50qh04ntgkst3a',
                returnCode: 5945673105,
                node: '991et6wz221czplb1osm6ivwtmwtmfyravappskq5wecgkpz3qja4km2yinb84beqtyysh77af9db47uk1lgej3qx8gzoivm8s7ceosishktwhiar0st2k4xbh9am5bevpyr075sgu5x8zz64tdakskl7tn77csv',
                user: 'ilstu4ihpe9hddifvq7kq9h003kk8ly3gg1suqg2w42y79ys4wpz7enp9ic6b1ho2frs0vsm9bpa7583be3f5h90egxndvfujnpek8jxiirhsmxrvyqhb4lphofiwreczvzhkkxx925m366mqyb3rpnkiq8gl6gcke6a8g8qlmn1lq7gvj5rwkmhcrubmlqc1bhuj6k19v7vb18uvcaggvrqnbfei5ke9yfz7boevw8tbfycuollexed643m5dd',
                startAt: '2020-07-26 19:13:07',
                endAt: '2020-07-27 04:44:13',
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
                        value   : '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f'));
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
            .get('/bplus-it-sappi/job-detail/33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f'));
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
                
                id: '08fae4a6-2d94-40a3-85d2-af4f173f687d',
                tenantId: '6914454b-bb89-4288-83cf-9038fc3a385e',
                tenantCode: 'm74d9gbfmhih8dutdm7lw02igsadpx41ir0m3xp9pden3dhczu',
                systemId: '1c58707e-3864-41c0-8424-a7efe0e3eb15',
                systemName: '8ywp55uegz7bqmem2r00',
                executionId: 'effed7ad-9e7e-4b48-bf83-eb1901992f37',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:23:29',
                executionMonitoringStartAt: '2020-07-26 21:16:19',
                executionMonitoringEndAt: '2020-07-27 13:30:52',
                status: 'COMPLETED',
                name: 'jtfo6wtq9a7y8ows1o7p3pulbvti76g8820kcemk3bdtxfknrdokiaytymc3ke62i8b3f9xlwehdtg461229n6etzglqnp2w0pryi13185tkef5zc10okp5lhvsg1mj3w1yiaz4yfas3rpqt6su8fsb57nxaf1xlmmagi29kadhi3jnzsw97shg9aoif1c429fwc8jjxvqmmf4yfbvurmdyiv1dyw1ts2apyllnkspg98vn9zc713vy5xxd7eb2',
                returnCode: 2685590000,
                node: 'wdm65xch2a862599d0nc1izrd7ldlamd045rmcq5sy6scymalkdnldqpa9zgggpa59hv5deg0bxx7r6rg82wrpf4s083qz57jo30uejmlqvgblzke0b43bgd4g2j9zwe43uu5tvzthbwfcj82v9o0afjoy79h6bh',
                user: 'ikj9v68xm48m64tjjy1p4aabe9gbio0zpgadh4m8ondhurre31thczsm0tmzx0nsc272xe3l1n86bw9gyy0v2j5a2gvwcnvoonmtebp9rjz8lwgny4e1ny99sbbofgvh1k1zjjitxkbkmaf1ib8au3irxlad941sh87p8mul6ynqizqvqcwu5ye8735tla82v09ditab2jlt6w1y6luz02ulo4oaaxaj74msz3bk9hzaxdvqevccj84vzhuf1ni',
                startAt: '2020-07-26 22:19:30',
                endAt: '2020-07-27 05:25:37',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                tenantCode: 'e5djk4xder7wq8pn0pcv2mis5tfq4wmc6ew34dlmjl4cprexku',
                systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                systemName: 'x92xks430xradtxxzp30',
                executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:24:40',
                executionMonitoringStartAt: '2020-07-27 15:57:24',
                executionMonitoringEndAt: '2020-07-26 21:40:13',
                status: 'COMPLETED',
                name: '4udfwpecvatd2a95cl20ytlen4cslgksdgzmhzmjhpeedebcc0u0cnce6o987wfdc2uui9hd4kiqgl614oaah0xpt5kfvtj130t2w0xx1x9o4ke5afe5qcxppm9dx2l3rwu2ekjomivbbkqthysnv2a0zxdfoq5833q1ibaijiemp1yy05rq3zqb8qw577ewtzbp53gug2pr8i0ttqrbdhruzo16qd0rou0j3faa72b7wyuduz3vq0mxx6loau1',
                returnCode: 5372249238,
                node: '2z6be8s5s3gu1x1gb5a70v4gr2774wf6lpg26ztzge7oc78x3mg967d0f0bze64qecs3e6lg6qt2dkl8dycvn4ef3m7dcrmqgejc4fylzkd162vagsxrjkh5ayynror8dcdrdhmdz1l9hnu62bwgie90qyr1yayp',
                user: 'mjo4fmoca9p4cqd655bj77zuglgehlhzzabdhuor1n60heahw7p7fass61tto36vgzzoe5g199dqxuek2t3wfmuc749rc45u0b3gtzo001b2tq63j2xuva0icqwi2jqtz3ljsxi89fuphtvgibexfz6wxlwpclk93lcm65fngdhl3hutu1qhr6q2lupab3cphy5ghh1o5bud2l0lnh60coo74fttzi6f1dd7kbxh1qbearur3izteqlky0hiwon',
                startAt: '2020-07-27 16:25:03',
                endAt: '2020-07-27 04:14:30',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f'));
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
            .delete('/bplus-it-sappi/job-detail/33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f')
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
                        id: '790c11ff-a398-43ea-ab7d-28ae6e939b88',
                        tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                        tenantCode: 'lhocvekbz4vasri78nleoafh6pr6pv0jk3hhoff9sgjy3fq6q4',
                        systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                        systemName: 'a9you4r5ij3k6mxhr9jm',
                        executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-26 22:35:53',
                        executionMonitoringStartAt: '2020-07-26 21:03:34',
                        executionMonitoringEndAt: '2020-07-26 19:26:51',
                        status: 'ERROR',
                        name: 'nghcgcoczi3v2mx0ze095igo25dkm7qkgvlz5n9mk87u40mraksmncw2zqethk4gz33cxkar36iehpgm5a52omt362mdpvn5ekc2tgroyiqk5ajw5vssj8mqeec0p7gq4zrsaohh23sokuxfm3kehyma18565saic1skv4h3romosi74p71qqair7rd6dbstw74dxxqmwfh42yu66gfazul99wy0sw1ax2xrbyzstecjorqr2efl3fvih7f52ky',
                        returnCode: 6851776070,
                        node: 'pckin3zpafce4euz4sfr0u1mx89rloml7jc09xv49mjhtp05i6zy1kicyvgw7820dm1oy0vhdjeeowlt86secbiqd7h7t0o23l2ae5isejti227jcvpnudxymg33jjcv7oscdktmxlsfn29ueppzvdkj1vwknrii',
                        user: 'uxglsf384rx9gyuj60oin9bspkbe3w4sz8hu19f9x8t1gngtt0wisx0yzavbr6g2hmercod1tut3dl3h796zi3w3hhszmgb2dlg1cq4lhqvag1jgr8qmzsridcar8mv2azn60xvvf0s3dqg12yzty3sgzwrykicywlofnidbogfg5rb91yfqe1izqqng1ky9xca5yio8um0gctaxu7324zddoo8w06l2syuw75t4g8m89bgq7x4i994jzkrhile',
                        startAt: '2020-07-26 23:30:27',
                        endAt: '2020-07-26 22:43:27',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '790c11ff-a398-43ea-ab7d-28ae6e939b88');
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
                            value   : '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f');
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
                    id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f');
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
                        
                        id: 'ee3afd4a-6548-4b26-96f2-22a13649ee64',
                        tenantId: '5f439bec-b617-490f-a17a-1e61680a9217',
                        tenantCode: 'itibcj9qmw9dqtu518zzidhavy0250uqp2ukde44cvujndzx10',
                        systemId: '81ca0fca-5b6c-4581-80ec-acc4a4d6bbc1',
                        systemName: 'juosirtelwlmjam73wq2',
                        executionId: 'ab280056-7e5d-4a92-8ae7-91d5ad7767e8',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-26 18:04:33',
                        executionMonitoringStartAt: '2020-07-26 22:57:28',
                        executionMonitoringEndAt: '2020-07-26 19:40:12',
                        status: 'ERROR',
                        name: '8hthu9fd0f11amr0kuiqxmohrtw9ar8b8op6e8ylkszgkxhsd4yrwxksl6rwg7xz9ljmj9dkjoyb0xl4mzkbcl8kfe718n1t5y2asffvps2i1np59v2uwfd8zfhtam7ha8jmm2av0xlavucos3sw9vlr8l4uaebvh7ua46guz7940yv0bu8u2gzby4yuwqrxux7mwlsuiam68xzi8xvrgb1rmbreujb22d0ji9mi632fgyiv2zpopdjykvdy7je',
                        returnCode: 1571154825,
                        node: 'ecp184wsu0yhxt31x0088p1z3z5ok2c70620dcwt3ziafcmqwjy5oqxqksg2qguu5qf84drb6v19l77uknh1zf4dgkm2kwqnyhhdvoqhg3vsiu19m374bx6j5h6j6qtcdlbaz3xxsr65h3p74hb6c2l3xq6cssjl',
                        user: 'q3tnz4ysxbcc2re7o940axuc23iabw7xev70uflxfw3nn7ocg4hkdj428156tdvj6qydi6zsme8iatsghkhxznjgjwinlh97zg85fyzo171st2ssdg2clsan0k0ayg42m7sehad8a9812muqwu01bwj2n57nefgql5xd7w43h45cns1g3soa3vmty5xw78azy7vh0n5u4u60l8ye9ttmnekppsbctxliel33cqn6w7l2ld0ntbik7775oak7gf8',
                        startAt: '2020-07-27 09:37:41',
                        endAt: '2020-07-27 15:17:47',
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
                        
                        id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f',
                        tenantId: 'ef0326c1-65d3-4515-a38d-627a6bfec5cd',
                        tenantCode: '7znjbti15a4nb30ymd2ohpx6iynw5n4yhwl27sel6oeh8wm2rr',
                        systemId: '666ce5a8-7b9a-4d53-ad66-ed1e4c464391',
                        systemName: 'ogejurv91v6hplsmsmkb',
                        executionId: 'a8d0b3de-9107-424c-926a-deb2e2399796',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-26 22:40:11',
                        executionMonitoringStartAt: '2020-07-27 09:57:21',
                        executionMonitoringEndAt: '2020-07-27 03:18:44',
                        status: 'COMPLETED',
                        name: 'igkdf8rnuz389sph4t3h9rkjkc10r9oiza8ooraucnm73g44pfzvly1783ypygzvk77xvxmvxd2k20lpb0cc3yd0wjcnr75xfi7979yg227ajes94g1lfmjt4b5wbsj5hyy9wulc4fasiuktvyqe3w5o4wyg02ma1jlgjejk8l85vvrj5agd434i0g48ek3c8ax6ifk9umluc3ckzh4a42bp2ip3gpa7musu49f9wcztfqur5zns1hudi3ykrg9',
                        returnCode: 3203097944,
                        node: 'cn1zxz8jd9zp9oedz5oq60t6s51y6tp5zxmubsc3enkcvpbj8fdrtoy6rwpli2ts4o52dddyo205ow1481qnnqji30mle0u619v6ku4ylqyl1ldxq9smm3xoudt6shsif3371rpu0l7v2mvl5v5kylkpnnssu8lr',
                        user: '9tqlq520vgw9asfw72y9ba0av7elmcv72206wafpb71ihlrkxcvld5j60zk4on2fv00aq5z1z5na84h691tnkq2tfbj39ppud9x1e3k2umc6dcmjotuzbp1j2vf81cv0wasrkcbha2jvjbxj1v02ty6319zdje99iqr2s3drm08w36rknls4t8isjrnys5vk2pj8a10v2i5u8c4q7qaotpechf8c64dqdfw46o27eib21psa4f63oy0ygjrn9iz',
                        startAt: '2020-07-26 19:37:22',
                        endAt: '2020-07-27 09:44:08',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f');
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
                    id: '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});