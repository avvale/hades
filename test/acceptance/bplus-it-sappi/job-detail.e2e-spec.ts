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
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '9jgqv8khzri0ucc395ysaf5tnai2u0uwq46etkwq8lco5hdcrw',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: '0pdaupnf159s6coaiqvb',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 00:58:05',
                executionMonitoringStartAt: '2020-08-03 17:33:26',
                executionMonitoringEndAt: '2020-08-04 02:35:44',
                status: 'COMPLETED',
                name: '1mtl4fd9heizxrmmxtqrcwzf2za48k9h37wwaqfkrj0v4ldohsnivqv71ojboye7sa26uhhfklafq5adpk40vrmziumxyfif0oid78vb4943i40wwadegmhrwuedqa32tzj51aajmptakpz1bo7xvnbycxgl38jct1blhgxcu2xet9n19slk4tiqsu1ty5wydhmewtmju2xfj6mqzugux2an3ek4utgqexq66ryet0m2mcqbjeyg5whtyf960n5',
                returnCode: 6377795730,
                node: 'uv03y57z23juqi4kykeflcx60j1yv44jmeoik5der0l3kq2f891fgd8ayzk1avfyftsz2g455tpuy2iehxumpnryy4fggbeecuff2efuts5s6kellbmpfao92icvzj4htdchakcv3gvp9bude0xq9axqk5zb01xb',
                user: 'emjxk78dh5p6va7w8cowue8wpjbey8uxrk3qkv6fpmvjvty9wj48hml5nzn1sv6grlo77xfciagsz63xzzlkpoa4xfh0zo0deeurhr8lby0w2qqjh7ih1s9t7hmuhszlo4ts6z72da6tomjczuifs2femx9gsx2gshe1rhwebky07ttis72xadfbfn3rcmdqakokfizd6zim38674atnrdal8lofatgfe7uj48ktpi3zm5qje2w38a3qrlmtw38',
                startAt: '2020-08-03 22:30:49',
                endAt: '2020-08-04 12:07:08',
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
                
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'by02dkxgff7i1cx9c18rpihx57aa635663oqaaxjx3woj5fnuu',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: '7l128ajehhtmrvxq44x4',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 21:41:45',
                executionMonitoringStartAt: '2020-08-03 16:45:33',
                executionMonitoringEndAt: '2020-08-03 14:45:49',
                status: 'COMPLETED',
                name: 'e2y8syf64ahs1brvxe8u8az59iu5fmrhvbcav37tq3fe8mb2aiz26zkytkk2twrtogkrfbh3ahy3dpztvtwlzmeqz3qpjh40bz868ys22mnku1hhgnrly54atsugocdy30oltye97bsjk2mrq1r99b1piic80zjf4bm0k16ejrsgeihgpjjmuzaz0h9ey9kn2s4ue4e2gmilsevx34o617jl06xemxuisr68ov1kbqyx45tit5qy5hf5z1ebxum',
                returnCode: 6165728229,
                node: 'gdtmby4d7ddmmyxi7b2ttun1vbu635o5czxjklxoztet13c0s12f4vuwkcygnjxlzpfblw5k39ncl8vo0atydxldd3wv6lst3wcoap83d9u34h49whq1h5x7af0zrbv5kfpsxanob91yfujezzuq1k37loe2uh8r',
                user: '383sdity1uei4nvb1ux7gxxa9rm3j68e80i5lzb392rbg8099esgvp1lk8jq7fskaxpqeq7rb66mwxwreq26eodn13orxy7003528zxspwkbat7o1msqklhjbs4jch63eggho0caq0pbf9c9z0u3nht7gl4x2gu01yjq7oxrc1ky6hrspy21msrk4tuis2nv0r6wxy0wozcetcwjbrsvfz2rt6krxezb43fr50lig4g0fmrch70p5ju9f2xhsjv',
                startAt: '2020-08-03 16:39:28',
                endAt: '2020-08-04 12:10:39',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: null,
                tenantCode: 'we5a2m2ra1x018lic3npb3fcycccg4z2xq2is9gwn6vqs6e73j',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'w3bvqu76ain20nxv5jc8',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 03:05:52',
                executionMonitoringStartAt: '2020-08-04 14:19:05',
                executionMonitoringEndAt: '2020-08-04 04:52:50',
                status: 'COMPLETED',
                name: 'dshjizufy00dr642eb5jghodeeg175rbgtlowiy5cr8ii2a3lpdeqfvtzw7xyxf4piib53ioij9hg7t8r16qii6obbo28zvkzpetkcdpxknvdrakkbaffkt84tr4cnp82b76e3thhokc2flcf9n8vyln1ywvdeasbyp93mspe18g4ws9je46vf8ivi4fyj3lydukzfhu6nsicuu1y7rr5ylwlldxilb6z9nzdfeoczw1afkas80cys3fcm8umgu',
                returnCode: 7711283100,
                node: 'wl9qhkljnk8m9zd48k2743ahvdfckf4wtqdh3iyz0gh1rzr3pxjzw5ukht4qzrkejekwiqmd40pczcecrlii6sa7ckhxqucul38sj4zirccg8lu4qfj8t29ci2j2xf53n1m0zhga6ed01q297qtqdhxz3a8ucn8m',
                user: 'dne1oxbfamb8a6lo5510opkbgqtkulpug4dibx5mqcln91biprx82cjx8r4u1k2kuzbmdoz9g6xtvbyhepdwyr4zqeznsircut4aqofh03tcllr0ctqwlg6xjvip8psv5nnpipsdb0x816eyyk79cavktfdqznhz7k91b6mmvczx4vedkx3qbiya5ff8i1sircw0t5h9jvl2uk8frhryw0ukjnt0sav26nwii1df2uoql7xyjv509sqe5db6rev',
                startAt: '2020-08-03 18:45:48',
                endAt: '2020-08-03 21:11:15',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                
                tenantCode: 'oz5sfzsei8olshwnoeuhq7dryvli0gh9foax55m86mfoqcira9',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'katjwnzq32u6hjlv0j1e',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 12:40:34',
                executionMonitoringStartAt: '2020-08-03 23:17:51',
                executionMonitoringEndAt: '2020-08-03 20:44:25',
                status: 'COMPLETED',
                name: 'y5r4nuov01vv2db0nd08s3593xgo67iayw6iusn8tkz1pac0hi8gtlcmryptsmqrfe44ms3dfx17jgtqf5932kijcth3fnsgxyexdcalmsj5dbx2g9ykzci0yr5bwbqw1hx9zi8r6qqjx6zuw2qqgj59fz8lrs4irr77tivt19sglsmamo045grq16zhfsfmkngngr1mxs2xxo8aylsqdiu112fxsgwxf893gcegs93oet7mh0lhdm55s8ldlcy',
                returnCode: 3728983420,
                node: '1ysfeliibgbtnhtxlvqd7d1ff72bgsxd52c00dzhj4teslnhsd83vbhtluakbscafy783fhate2eljvg27359j75hi310avtf3ncvkqwyzkojeqvq4ixieo3yg7n2rntlwwopnuuq2pzy6lcdtm5bar96ns5u94x',
                user: '0cp6i4ahwsxz7wq7fu3x32ifytmhh69e3e6anpg6j8p6tpmlzx9evk9qthtqli7wkrjfsrsstsaq82qdneawep6ybt4mt44pk5obhvk3clj5rfkhg2cjh0wr5hnqrl2pymjcrdivmgxsaucb2ow8b08435pqdqu1t7y7adup9tx8ruteep70jq05vo5l9aa8zq3tz7mrpp0ie3k5272w2qqo1pwgzbv7nozlmbf998wkk0jbmqqshvk9gplpvi8',
                startAt: '2020-08-03 16:25:51',
                endAt: '2020-08-04 00:08:31',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: null,
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'xqnegukjv24oybkgiuwv',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 11:49:02',
                executionMonitoringStartAt: '2020-08-04 04:59:20',
                executionMonitoringEndAt: '2020-08-03 22:11:51',
                status: 'ERROR',
                name: 'jphebcnynnzo4p4rgzupyeorrwrl0yg52qrs1i9qdr7jmnm0ke0ved3co8j1y9sjlv90yqzpd9thx13tcqg3v7ah0jvn4wqqacmy9rygzy3rst05ztdhb72qn6fgix84h8ag299473pagergx7gz4wnp40yhark6elu03hgnis4qay9a99329dunbem6rmxooy0kdnq8155zw386ao3s0199lj58zn90g3cq2lh6npjl8kz8b00hfdudjvxhtov',
                returnCode: 6224030670,
                node: 'cxmjpq2f94wsd7dtgqb5vepg27d8fxpktgseh5iem579r2vdqbya8gx16hygpxnrt5hdp37miej13cmfmpq3ra83dnm1xjo8cxlfzzzbl6rlgogdqn471m25posrs32oimo9jz6bmm9w10kb3elwk2nm21ww9frn',
                user: 'gp79ubtebgt1z87we671tbxjxzewew7euivzhl7oq1kx4m2uphzlxz22og53s3fh4m98f56kq9zke3p46vhgqo4vjzgwpv5zf4blems4jw22xx4qy3i273ajrdx1ypfgytysyxp6m7zylvy6uoq9s3rys45xeaxd6hjvej75rvsfgxhhi2odm783vcf5xvgggc750g504vst05qtsm4m0wuap8mlle40fdkdck7njnkrq1z26xmiyudw2c145bo',
                startAt: '2020-08-04 13:10:41',
                endAt: '2020-08-04 11:59:51',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'm8kfkycabf35hdh9d8ft',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 21:30:48',
                executionMonitoringStartAt: '2020-08-04 06:56:04',
                executionMonitoringEndAt: '2020-08-04 02:11:04',
                status: 'CANCELLED',
                name: 'olnbjbgqybrib4clkcvqk5fbllwu54ts6ht1usxx37rgjmawq2zzz66t9fzsjqtedoy325khft9k6u96r8tnvycx5cbicrocdnsu5zhyg2wv2qncxzictvfq5qu7godobua2f2ezr3ir6dnp8fl4ga1q5qwq1r9sriea34cj6rs4p2ybwbiiyp6zgzm025oov79dtf7mxf7fnxk150kw3cehc19iu7sn5um9f5naxyx0j926drplbt8gsq4vc6h',
                returnCode: 9169596442,
                node: 'b7801bnuxfo9edw74ije15q6hwix5rre90xq6sjqidzf2n2r9i6bzhzzfeidcod03i99yf6omfnt8pifuw2a8f05j46rtuvphdbgn1f60uvmtu3uj0qbkmlfwd5agyiv0t90c7j11cct1kv79yoso61w3tjmprmi',
                user: 'bqf98jx930qwtox898x2z0iywfg71tqpdvag8lfjr8b4fa0q8l9flynukl2ybisasubp9ctygfosv1g33w9ygs8xncrkfah5d9yx2gmoc17tuh96kwnb8fdkveqy7v7xwrf1qgs2y0pkd8z64gt8xw2ji63ymwtra4iy1r8v0hboy7yxh672j1t5vgi3gkfad1tm0zzsggxqume9k28ozx9fu43qx24fcewonhhotjpede8o69qn7sicknflu3t',
                startAt: '2020-08-03 15:27:43',
                endAt: '2020-08-04 10:06:51',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'znl6rr9rgzovo9z05kh7krf9t3kycb7ar6ivc40pbqtosveh5q',
                systemId: null,
                systemName: 'uihjh75w0zd9195zq5jn',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 15:34:31',
                executionMonitoringStartAt: '2020-08-03 23:51:46',
                executionMonitoringEndAt: '2020-08-04 07:58:55',
                status: 'CANCELLED',
                name: 'xh0jnyw41nrabn4x2zzln9lnxe2zj9e1907cbu10butq813nma4oj535cmr8uaq0ve4dd8qx8fyegslnq9oiarhae5vrsjuu6mgdhyj9h5gpoq59fnhx1vma8zr7ypdmoogd7s02jjdzhs0uybr3jri4vsj12iyl8jmq069mtoijutjmqcedkgiehude16nllmfeb7md0ft34qkgrtq4x4mv4pkvrt4dcb32y1cch8fb6r8tj9kqe7bdhj9pahr',
                returnCode: 5221961033,
                node: 'h49549qr7h5vt1k22kfcue2iek2cgy64zrsx3mtp29nipn8rp5co5wui5auh8mv8c97c6g42cyp4rpyjx92be12siln43i8xi1k0ircn6hyn2wdrj9w4v79jh3162a6ncb4dcj0sq9rqb1b1no3tkvm1u1sy4kw7',
                user: 'zrpb0e8bmow6d39yijw60rsoou8jikzqxs3zlgaof7m73rsigwyn820y2dmvhmvowu7dnjva66dykj2pe2szb7tekwp5xovpjrtv4i5vhsedngwcvw7sq2x0rm7fsj0v5uzklkdk0444djmv7guodlc882pq1w0c2ler6f5x3seygxem5nwkkh916fjtc1rklsxk4zo3fyeapjumq3pzu7wm7du6e3k9jmfshz15gkcy4j94kdlqzs1q8xvn1zk',
                startAt: '2020-08-04 11:52:09',
                endAt: '2020-08-04 08:03:17',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '759irc3db31mo3xeppwnl0sp40bj1an7a9de57fy5m14mef3z4',
                
                systemName: 'kocpjdx1uy9siodqrlrb',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 02:45:01',
                executionMonitoringStartAt: '2020-08-03 18:17:51',
                executionMonitoringEndAt: '2020-08-04 08:11:01',
                status: 'ERROR',
                name: 'kl1ou9vkin4u760tww5x1jipthz8gg4d1i7qxuw5pklvfkv1ss2do2fkmwt7h2mt7k3hwn3hbxk6cx8sqolob4blzblu9xjbtw0rx1vovmt35d0d1e8mvcodc7iukfpn0ga6y8jrxo6k20q61p29tc4u826gk75yrz7axc52nrt4udy0zopppm6ia3z5n9j2wn26kyff32b3xf6e2ruen6lan6jrfsx07fac287yzchv1z7qtoslj9stfzq5o2o',
                returnCode: 2342471073,
                node: '6t9n1u675o0uwyl0d3y9p9azexmx3xlptwj2azp6xiyzqld7xqyerbgdue0td9wos365mxgqefz5yq1wg88khvmuk6huikx2hf898iecrlaq5xtprmvn31pqvtxzjhzf7977zj4f41bubbl9eehsh282wvc3ht6y',
                user: 'muba98dxzt65py3lmssg0b1cwrpsgrezgb9jh29amur7ag8r5obdqnee2j3ggm2jn2f7722iwcy3rotumgrf9s0jws2b2vhq5j7aw0xwut2drw7g7h2yzf2qm8cyj8wcdlojwoh9ccbvcb2ac5wxmjkm64mcndxr2xknumvn92jsewzugwk0wv2275ixsb3a639um7usa0y4udunbdifmspmliprx9bho8pcb4kzx1x9x4f3hrj9u03xl8zitb3',
                startAt: '2020-08-04 14:26:52',
                endAt: '2020-08-03 21:41:54',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '3uf0gomlof44sf25jls96jfomteg05ny7b094s66xvtyado6px',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: null,
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:49:30',
                executionMonitoringStartAt: '2020-08-04 12:13:14',
                executionMonitoringEndAt: '2020-08-03 16:28:49',
                status: 'ERROR',
                name: '0yhjzy709zagmbydi4695v1301tiffaddqbmekkaay3urd9wndzh26dh13ro2uec5gnrj5qdb0av7sl0dwgtyb667blsfpng4syssxhbnwa8zo1o9k25374e71ilsfmiftnndfrm0ip4ipv7e44yu49rjeuu4f12ra1godiyjpqgihusc9tm2p8ncdir7czmwiave5fz3baxtddqy2r7l7p0v8gy0hbwtmq7kt1bhunzzki72o1sn8lyxty23lz',
                returnCode: 7639955729,
                node: 'i7y7jzg7f6y0mlg35rhikcyxed4lx0vtom628gf0y5itckx0u85h2g9yrnh6bmsiblitn7n8qtegr8w03nl5h8445j5s9d69xqlcd5wv20whmfbefq3rg2h0oa3135hei24lmo5fyjlshlsvporttkhu2m0lakkc',
                user: '3xcahzyq3gaw3gdwr7k9y7d2lc1h65zdukgrg4kseohmbr5aeyxpskwdaji5mfwzb9dtdgo604m8ixqueoxgycyrq2dl5cwrzau1ff9fl4vsgjewejhu9rvwl6q5kh4by6xs0hhvgx4g06axz7n3odouxx2q7q55drn916rndy2ry4rgiw3bqfbrwl7pf8bs3om2lnj8gls71qogcz6hj35ttwf6ki4armkxkec66jrj1q7ysjevtij3cjz08d4',
                startAt: '2020-08-03 20:27:32',
                endAt: '2020-08-04 03:57:47',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'ocghvqfe2ozin92f5jlrwq9r0j1dn1t1sc5bmqelf25s853k9a',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 11:56:48',
                executionMonitoringStartAt: '2020-08-04 03:18:09',
                executionMonitoringEndAt: '2020-08-04 04:29:09',
                status: 'CANCELLED',
                name: 'xwwo82gtdh8yvvkmzgnn3cryvxwd145dukybadr5ao9i65v6ftdv6ve1zmzmibw7howvsjmmeom3kvk19g6vc4ovvnvz2eo9g4sa6y7bdaoad6kavhco08c39zaen9uqu03rlo7f5e5fd5xitz7hnb7gnhdybjha7pfutvkjnfoe6zygy5s9873vw8s0kuptwplpqiqxw9kowkycb9aiq4yspko9f6h70ttrzdi2mlawni89hblw0dbbwa8sgxh',
                returnCode: 4651092638,
                node: 'to23130ouqsdg3tbm8mzptrpaobpjs7qeoopd0gv7or9kk2boieh9sb0oq499xdr7tem9djsrri61xr53bv9zzj0m700j2ajd2lb3q2afykfkb442nbpdzs6w4t7mnu9t9gly926wdkj7x8e2hye3g019p0qxlu3',
                user: 'bb5ic5taeghkrfqdlhuwwdyz1u0cdxn0i555edqdkmzzkll0sgjx60s0yh7jv7nplx8qc982rp8irxwdpmw2ophgan9r4nwsybojdykhon5qasotwv9mqi3efsgojiaxh3g2sval3dziwx0hh7erah3hoeoumwdm37l6sysh96qbftaaowvu2s6nsy2vaha2drbrsqu3cue5k8oibv8ex0u6siwhzb000z0dhhq341cwf5gxe653fkb7w4k4m1n',
                startAt: '2020-08-03 19:53:59',
                endAt: '2020-08-04 09:58:36',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'dh1ji7o7pelbi4i6u5vjdxvi0kzn2ax6jytm2z8pao8m69yirw',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'g1sj6ovstanni21uk5gk',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 16:40:15',
                executionMonitoringStartAt: '2020-08-04 03:05:21',
                executionMonitoringEndAt: '2020-08-03 21:53:27',
                status: 'COMPLETED',
                name: 'xl3elljiocqr42krbi2d1cdwomztxfh22bxkb4lxvzm9u5ftmu3yglm88k1uwjai5y5wgzq81d7o5kte47mx42nd2167kb0dm05rrso6f2yk12y53l4aq9ddybzrqwswc5ie94cm0um4d6v6krvd8u5rpz03luuxja2243mpk6x1q3ezspkxviv1ik4jhe79m2lyfxuq2u6gaqw2plyyk51go573pblxh7rn9s1yj7gurm1oz1jxxom04f7i30h',
                returnCode: 3358062856,
                node: 'hq3p45yjjndfxsjexaoh5r1jldtxuuehx616b27do9u4b1qcu9dh96snhovqcgo96w68uq1bak6fybwd71c57khcsw16e1q4r2zsovzbi6nu65zhsiferf0yazq8y2wx4095qjux4fxp1bonk75ijx2gytixzki8',
                user: 'nbmab4j5n2xf4cton6oit7gh7exzq5qkfnwukre6aruis617bbloxjn0i89xn5kjompz9o7pioyofoxfr1rzvhzd58x5ci192sn8wot8t5003tje7i4o0ovedbtk2czsl37vtj0ms3oj121r3agc7pphng3ebjjn7s8ufx3enmpcnvxu3b2ofq09f37ygak2uza0tr7sioh5mic2bh8q6jxkl1kvwu72gbez07d7zxavfqmicvojbbkfondez53',
                startAt: '2020-08-04 10:45:53',
                endAt: '2020-08-04 13:59:36',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'aij900n21024uy8jsv9djs02u5ljnds0385k4w2htnx88md593',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'gbme0567itx6uhrc4ac2',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 15:15:16',
                executionMonitoringStartAt: '2020-08-04 07:02:49',
                executionMonitoringEndAt: '2020-08-04 06:43:07',
                status: 'COMPLETED',
                name: 'pf72aq2mpdkg59zrso2czn6ddsw80zgola2p4ynigu7ozjtg3vpbtmpv49d2zys3eiohdsi4v8yeefttf7eg7d8tzuhas6be7jywsr6c02k21430b7mnctyyg49twsi0s5q5r5elsqi58dttsyofrj7ddwg3cxl7t4f6hdbuv9xq8euuiq4dqe0uedhf55mtge2yz5tsxwk1hf10a6pcnplvdqgmxco0zqd0ipy7d6owm9uq0sltez6uy5ejmet',
                returnCode: 6658713004,
                node: 'y4hbc8o07tdmmzp7u94y0i5px635di4skfjmz7tkgzbljmfrf3jo19qmq2ctd2lz3jv5px82f8xragvfqu702ugaxzgs4x5ffcd8xbozxt8d1gn2yqdgjs5891akaenx8wuqhm28422zyn0qh9230lvg0deu6nz9',
                user: 'ac1262nbs0rtyt8q9yteodwibu2z644rbhxvfizuei1yajydnkpxhzb8jf0162su7w2m2y932aszsdff4x9nxr6dqmhzdl2vp2u52t1h6fru8854pz7j1dfjqkk2trfocjwh7oep56f4aidri1j6pjc1horrfh6pti7ranjsuqplkewean4bomxxayh44i0wlws92ceae0by8xtcsm2utvkhz4sc8ix4hcwzhlj4av9rrqswu6ioeipwbtgsdj7',
                startAt: '2020-08-04 05:04:28',
                endAt: '2020-08-04 03:46:27',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '48sm6xs08vjrsmn7k5plz2afcasrffj15ipdtx9gijc7liw4qe',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: '5pmj3az87w1np8ifmyup',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: null,
                executionExecutedAt: '2020-08-04 02:38:17',
                executionMonitoringStartAt: '2020-08-04 03:54:13',
                executionMonitoringEndAt: '2020-08-04 09:37:27',
                status: 'ERROR',
                name: 'aeub1oejw1ifxqiugg620dbpgfzw2hz9arh5zbytjohcycjntcafcwvsgy3efoj0wmggqxxn9v2rxa0zapa5wgbi4xphsifw3hp7naphyy6x0j059m9xstzo0evk4avoxhktwx67j8t3c81habub3tj43lue85ev3cukr4t7mm0p0p2sy9eb606ij6is464s0dhhg4v8atwk2pdwpsw53l6sb4drom0kdqw1g3xdqpil4tubtj7e5gnn4td97kj',
                returnCode: 1311055443,
                node: '9n9muss2sv2vux4ee7ywt9nq4u8li5mmvh13v65o9faxeihsyklx11ek13przpi7thdm0bl7spzfhl36jo2vndy715ybusurl6yaifxnztt4bethy85o7546n6r3izde77zgk13p0f2vic0lfgktk9p8u7r2zfrx',
                user: 'mnixjte8opdk2eelsxe65brbyz3ygyghzxmkwcv5av9tatvybpvzzvv4m2h7q8e9z0sz2ye41ztlezvayelj3kuo59jfdbf3tm8mo0dsi3j6fj67gi1ti31xfasul3dku519p3863fe3dhw8eufcc5yceol6dsabz6vecdep5wmx5oqw3xdne5ov6ih519o1zb1w49yw0171wxz64vyyo6iwhx6o5w591f703h2d1mryjt0g1znljbqt94qhenx',
                startAt: '2020-08-03 19:35:49',
                endAt: '2020-08-04 05:18:10',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'wxeuu3brvawr1yh3u2x0wzvez57ubmahaigo6p07j7m4xytt19',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'lbtc1dgl02c2kz8pcww6',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                
                executionExecutedAt: '2020-08-03 17:05:03',
                executionMonitoringStartAt: '2020-08-04 03:39:33',
                executionMonitoringEndAt: '2020-08-04 13:27:24',
                status: 'COMPLETED',
                name: 'iyhi7dq4v74a50zvfp0s0n7onaupbd1zd2gb2azr6tdwidkchi93w1ghz2pf2fvl28plxx8c783qntobk55a6fhs8lnc047x7uj9wcgisagddyj15oi370k5rl0uq3h0y27ns3weqc1h8b21il0ev59v78y7nconf1sho50mfvl0l2lalos9rws8vomnhjjm90cibd39o7t2nzlgxmwc2e7rk4mwopoavskngnwjduqurmrverisd8dfyuyl6eb',
                returnCode: 2674894782,
                node: '9iwrhjbgcuzd8xp3dlk76yld3sh9okyrjc0ipx9l1q2ierb8m77y4kb9a76qy01m0o13lr3ghtbk0f1zkpatyvbah5rb7igm59dfsn5mn2lfzyzj6x4mnxhbaxvhbhgm3hw996cv6ih1w9unhrmqt1imipyq0p7z',
                user: 'lsqs12g66dsqj0f9ef86e1844zpkpxzt5esvmgwxicsv3cyqn9qk0w8w4p3e1km9st7t9pm32v6c68w272d722kbw1a4d0o0erbxssudkjtndytzjkew5iydfm6xzjrqvy3s1iymy4heatdwiwztg0vuvoxog9vshcjhy5tc4bttm9ojze34w1d7a5uwe4ohb2zwk7thq4zvhs38f431td3215el6kescl2y3aek9w1aa5ugwxwg6fgyed2gaxa',
                startAt: '2020-08-03 22:45:41',
                endAt: '2020-08-04 03:37:40',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'h3n1ui6ykmqdl099zfsz746axmc510a04sa3as6amtuxfusvkd',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'iewbjr7dwv94zaaqy9t7',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-04 05:32:59',
                executionMonitoringEndAt: '2020-08-04 08:51:14',
                status: 'ERROR',
                name: 'iutdvfc7wa4z7v6md5e3hhyswct417lgceexne0joql9mwah0kmwo090k1kwazvwupanp8ukt1c3oi1y0uvlbxon9qjej4q79uwp05hhy81196vf0s4n2fnmi47f8rcha07ftsysewhptu30tolog1yphhug8h11rt18plcl2k1h4cixtguzonqpl268c0cnt3xoxlbnaokhju645ctbahj6slbzsmskjkr0e6yg43xacox194gkfl5k2db7uol',
                returnCode: 7636903990,
                node: 'nm3dxjw4j1mj6a8figputrwu084lkkwzs3rpy6ce37yq9nx0r7yn29vhinxo6sciu2dwfihtak8ngmrtehhh2reumseyw4f9be2fv56cw4owi3isg7vb61vh35yoxzgf2u8a064v3bcqj8tcw3w51set25i3okzt',
                user: '19lt5ce0camlnk2g5xd0u8rumvu23nyxcd2yj11wfzh3uwyxvjew8jaesjcbvx80gsavqxtyncjw5a87ue69qqx2jl7jxrrmq87a1p5n9jobueu6kpvmz5o6hjyicx1xjpu9ficjhw3j8im2xl2ywd3st8txp85ta6r6xw5h3iujmz03uapj1g64wdi92176mj4x9ysxs2exm0ivmefs6fav22gxpgwxr7utgfp9x6dtgghxbwcfvw6z7ej6yzg',
                startAt: '2020-08-04 05:09:37',
                endAt: '2020-08-03 19:40:03',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'oa3u740i2gjn97brqosj01dj4d1uc0ak5qzf9jlwqy0vc42ooy',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: '65z6mtabnhec2s2mjjef',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-08-04 09:53:26',
                executionMonitoringEndAt: '2020-08-03 18:12:13',
                status: 'ERROR',
                name: 'obuyaph5v9878p3ng3bgpkylo1sbiptb6bfqlgqf19z8ktxbr9kc0b7kx1mdh30eng4yde71xpb85e9h9ll6md0r61rkm65a81iwqxaeilz8xmcoc4ddojwbmarzv3xwvopcha0ziug14trx4od0uev65wy0aj82h53tow666fc86rw960kzvwp6t2qm2ehz2q1q8w94th04coobt7z8kop9e88udl5sqirrywu5oafxgxl2b99jo4wk3byb85d',
                returnCode: 6541034066,
                node: 'vtdutc25fsiw5u76cagk5gfzjsacjavmiy689v66h1thp7170kxup27we4y1wjmqek02ywuisrgwazkvmturx67xgb60558hsnqeer00zs4lvz56nf4gbns4g7x6uoqeb2bsxxxg2549xuqdy7797cu4lt1yniun',
                user: 'i947sgzzwkr0xvl8y4kegj9pi19da3eo4iwocgrrq58oci1lvemglkbg66ti1c8d6xtz8e7kc7oiavzkkoz6wfk4baa5ucsbe72dr4vljlfwjhv0ftzeah6e5j0xgyg3p7svf2cq765wiye9iqvvo9tr847cucg5iso90makltdewr440r9rq2ltnhl6abcrm4s13sscnhoa516t7bza85m3i1xzijzhdcwyhtt4usk8mh95ldi9j3bbvxcj4id',
                startAt: '2020-08-03 22:14:59',
                endAt: '2020-08-03 15:10:53',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'i2yl6r4ye1lggazywhqlknjsvqx6atuzecwwh0bg4nsit9uocu',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: '62x1clabfkm74como580',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 10:06:12',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-04 02:53:38',
                status: 'COMPLETED',
                name: '1os9fwwfacsfv5nb9t18wj5dorv6bw55hlfcctahv9ams95hit2cvo2swz9jvr5epwe6m4axjt98jcu6t365i60cci8w75eyfaldu67d0742wkqszg0ee71gexgqag1tniphuqc2w2jyp3j1pcqj4hbn5z5o81t0ymil8dlpvsd6i1tg4im8qpwqekiyo1bh846bp2zxycsmap81dtbfqcc1rdequ9o108b84b6c1akda0bohl4gk6vafnq2ivf',
                returnCode: 2136069452,
                node: 'dbgi1t5wnmoyq0nyt13zwcqfiaii8k85xxlb84o08lzrgl68ghv6s17ljp5mvfoq3yyt1qy7zo30sbbgshje8llo1h9ymrrii82otd86o95dkt9e8rec7093l8jvrwfxm9cs4kbspj0h23jq0lrftsblnnygdkwc',
                user: '1p4fe1f1na3t1etd18eionc0iz7hb17jp4dklai1jxyyvtpznfz34lztmcaz31wu1288ntm17vpupltqifx1sfvmjbrkt5a70583wo723hjxm9hzr472bdty93ag4og395h0nsb9sw8j11ah627gh84gepg8zy9m3s6be6fg5z5dod7bu8cepsk51kb3usxelhwnrs3q8lohdyvqmugx5zlsl8s60bm1j3v4ejq9zv2rx5lowj9qra1uftbgzff',
                startAt: '2020-08-03 17:29:54',
                endAt: '2020-08-04 14:14:49',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'kfczmpldz9ai111xrpiyugjaph1hajuos1gy2qy6srms99dhzn',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'dvtuxce23aps35xirb8v',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 08:05:56',
                
                executionMonitoringEndAt: '2020-08-04 07:36:19',
                status: 'ERROR',
                name: 'pckd4byig8vd2qc68k071z7x4oh5tteughs3waurecq66wsqwph86rare8s45qatxs8jwmcb25pzx9q2j007jbn0wagohdlbgoy85vpsvsonep0w3cfe7yra4vzw1n8c1qslycav7eo5bfj77b85ugtwk2yl4v27z94q82eebetrgewdwjoh98guvjl3iwhbo0q6e9r8yl2gjpkc3va1zg4oxatlc5mrkeigr7r0naqarwbzyxfpxdidner9g05',
                returnCode: 1180464696,
                node: 'n7djhru7dd8h0mzc22ig8mmxx4ycfe53v781xbnrk5ehcxb0catp2kguexix9l76fkdi9lkkpqvmmd9qy9lgigntvd4gskpvjtaxmpqykxar05scg49a0eqj8w1lennn561l9dh2rrsxppurivtufmvbdres6gcf',
                user: 'eowxzgx09xxze3146ishxa2t6mkk4vhfynxj98f0o82tqkmi2bysk0wxjlyi7bhxhug79j2gmvbz1qknuxrrf4pobj7nc8mvk4f6y1vf3r2nzqgufp7yhpbqu7xw55qsy67f97cgldm9xwidsx4a1s8dpv3y831r53pg0b29pf6faueznnahupvgai3bj87v8vir86wezk7m4guabxu2jc62fq5u8bu4x0okc64cvj467xk3b8bqqhvkack3kr1',
                startAt: '2020-08-03 23:32:45',
                endAt: '2020-08-03 18:33:46',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '00iwokzkvq4u5hrlhcweq0yhhoifongsigzvk4cr500gqm01w2',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'ydf1ozpp48jsc37u4gyn',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 17:35:46',
                executionMonitoringStartAt: '2020-08-04 13:49:21',
                executionMonitoringEndAt: null,
                status: 'CANCELLED',
                name: '9f3zoctxhmlvzvu2go6ixgt6a2tyqtua4nbpjbg4vpob8582f4gnf6roy5v8jnmwelzr6xvuteo8ys2i4bfw7c53l4h13pq8tq16sdwqx2ldkq5vlxcod480uz68a5w0qje84pkqk1za21d31kio23mcqipy37bw7evc1v8qyhqvlb72zmy3ydy12zjtvpmz4bq6b51svmuf8d4ix9qfioajmejrzezd6vyjp41y2nta8pu41ns5ncw78pmsy2u',
                returnCode: 4365846118,
                node: 't2uqdilfd2yzpyf28lqdz6di0n7gju9yv33i9ib9oq8aawz3qapcpyfjjq44zl3xyj44vh8pyxxj32z3f8j6qpu4myjkkch51kqzd0bz5tenkb7nnclila8zzfsnx558w7qs7sfubfry3wyumjq5pd6dd5mhhu0r',
                user: '8yoz2qvk4xj9fmgnt3fyxmo92db7swzx0rk8uq2vc9nuwd3yl6x8nzk49nfuqribwxgkqzyy1xq4uybd7b0dkljj0e0gjr5zwv08e5gva3u8ryoueyots2060prpw5rjb5j76q7o010ipsj1wxhpdz0rmox8kyguf6w09cz9xryjg6u6znsm5eaaffc25pl3q84x1heien5z23itebu4wmuzskkmpt1fdtyfvxni8fb198h75tol1zf6f09zke5',
                startAt: '2020-08-04 11:55:19',
                endAt: '2020-08-04 04:48:10',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '0xbwnbpffca5d89eyi4vsl3r1kowovxcfmtynd9blyzf9camds',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'ymvbpvhipr6dhg1sy3cl',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 12:36:16',
                executionMonitoringStartAt: '2020-08-04 14:18:25',
                
                status: 'ERROR',
                name: '0sfqrsil78iww1zd3si5yhg8dm7q7dms09ebpuhnyr3mswl5r30inup7499uvqu9h6ylgjfte42fsz48ekdp0atksfq60sd3ht44ll2ftzt0vq6yo6nzi4cvmqoxpy6ov7mt600tnvtsov1rfvjugf5e840jv1nu1olw86q1ht518b9b794j4fitkzt7mrhlqozjkr554vw1c1geruldw8cgis6s68hwe33t9ud6d8d47yphx0fvwttt8bg3zv3',
                returnCode: 7290215813,
                node: '8y8qkby3wpmq1afonnsuch7e8xpr6u1j23gx41z35rvgthdi4vnwslyx4s5jhxjn4i34nsftb7vy5b6c46pqevspvcn9w1r15hmtnssj8vm7jhloiv7e3ao7rmhkla0dyf26llwwegxstvon6kycpyghe18p8nve',
                user: 'grnk75lo7mnro6rl66koagczf4xk77l3wxxrxu1frwug82zoxw88bed8b58y2xrtximw5ujthjfc2mfmvrytzty6o4cu9wrsstp33w33anfrr3ghlfwly369iuyj80minbk1oxr8zftwehinv7ympxchx8u95xvudmkt5w9nsmgsct6ufx77xhj1o6h4268ssyqwumjcp64xdxr1ga2rx512p60q6djwb6sevr4y7rwz4ncg0998e49ra3g5zdm',
                startAt: '2020-08-03 15:16:26',
                endAt: '2020-08-04 07:22:42',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'g6c30w2xmbgilwntgt5zzcrjj4ghin1k51b8ponp4orxv3fzh8',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'mm33bf5w5p7vzkihc1tf',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 18:21:18',
                executionMonitoringStartAt: '2020-08-04 03:18:51',
                executionMonitoringEndAt: '2020-08-03 21:08:30',
                status: null,
                name: 'tf5akpl0jzh87kw1qtqf8vd9j7y3z60tb9h729vsl4f7iabcwyxvzn6k1oq21gr9kbtypobmsrex70vfr3xywjk7454piduxv4kyy6tqo4kqw99gv5fywx6jbh1hawrs30e59rybu2qs4gzlaq64thdbpghu9fuj9w5dsw864g47bel5mh5s21w8h5015d0h4i8t6yus5v58lvttiwi3azlnzkiig3n3lilr9rnxnobur6i8q70r2pgj5ao6nr7',
                returnCode: 2889543800,
                node: 'il0x6m0tw6vjbaqfu2r65z7s0j0osorrup7q7inh27ksf67fhf84dcg86t76oq730o845f90l9wm9vv5x8occ7dry8i4gh3loze8mb4e8xhiaaqzitisvy6dq3d8004q5webbvukrpdxuhjs4a05l40twd71evmo',
                user: 'enmp4v9i5igccncdwvd106nq3cvkg4m2jjz520wfkdhlmb6jhz58d49zn559ugh7u3d89bc0ewhoj80uudp6w23dlvzohgp6sxq8w0g2v15prn93rapjr76k57k7obtq49ar2pt9qcd5ga0ma5q9c8fx8htw5lc55o0zp00g8tdo4c9o2jygtfs0w9yocp9en89he9yyhr5o3qfutx1gxr17gmo5giggo5bnme4xt1q0tih9jv7ppk61u4ukczf',
                startAt: '2020-08-04 04:55:07',
                endAt: '2020-08-04 00:00:41',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'g41pheb74i34tcyjwyxj3iv9myx012pv4dxtkzcmlupm2sfgky',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: '5j9ve0i3p7zebplq27o6',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 06:52:34',
                executionMonitoringStartAt: '2020-08-04 08:42:40',
                executionMonitoringEndAt: '2020-08-03 23:27:17',
                
                name: 'd50r987iulbedfkokyc55pp85mxrmeizf3pzmrbxdtj4aad6fnz90tr9clnkqnpghs8bzxdxrehj2kdwtm8kildezacxjwnf67ywez6ttmujewbz2pzjylvbq1qncqlmtp623ulnluy55i3tq5sn0k4ey7ywka3bq27w1jkfaehwdj1kfz2yzpk14d9ifzehyqaz0m3b1uo5mmeib220p9tq057i66h0r3q06z557i4slk4jlk0aupzqj1c8gyk',
                returnCode: 7210512094,
                node: 'hzjjmo09g00yhcyj4ybly2uiy14lrrkaaslupymhinf1ral5fb2xpcgrfdo9a85ytw7bcvlt66v2aw7ekeq06vxef0oafabzr853n0mozfw2r7puzzkahgd3hli4t3prf775cg52a1j72nxnvo94641dant8iurg',
                user: '8kz9adxiq4247hz7pbi59fk60ty8eputxejsk93klxka1fyv4kf27n2jowqr06gi8w2gam39wy66cz3ey6hifbhbpuoawsgvfce2fz8g1zg6pdsxonks2xlz8dxvkedw60xaw6rr87xjvw79n6axqv0lkuaamk5ti87ec7nd8r9ap34jw9wraur9863gox18m8bce34y2j33cbaxl7gxpt2rldxy9qw6t020zbqu3wdhe5dfr5tshxaqge6guq1',
                startAt: '2020-08-04 06:26:00',
                endAt: '2020-08-03 20:43:29',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'ql8w1czsgr0tncbl2v6bgqlixp66zlexgybd1yqyrfux3gllvm',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'kd4t0unb894k2qgcnovg',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 00:39:05',
                executionMonitoringStartAt: '2020-08-04 07:51:22',
                executionMonitoringEndAt: '2020-08-04 06:27:27',
                status: 'COMPLETED',
                name: 'rpo23z6qfgolofzuubmyheieaiiiplwx5sm4egm6n5j6lqojsla0ynor6a2wyevadwx2iiel2ccuk3pkwbiif9p0akzgo0j91ho32sxr30vgia1uf2ispj6q5aktrlh0nlaq9ib5ds8fr4m8l8z2xdpkj9xpnq9v2yrlhv9zpwdg2x153w4maenl4cawr4m0uc9mu6rjxxhywx6oo5odm67q510h6lmez9t3hmo67r0hfbmm9p8jufei7f60j90',
                returnCode: 2867229127,
                node: '6l0lh5702detzoxhk3wetd8jvwyphgiritvb38ihhhs4wpgd7rhbhmjk40ynk4vxs7y4nct3hh8jfu610moywjj0n5j8xxmi29493jon354xw2izpiew4ssjwxm4xooqzu47lhly5kllh6c5g90pn0nuhok8p1la',
                user: 'tdfz2byrwhm7p1fcuwe590mmbxu9faqytd07x0u60g7yvc5qpyuh3tnjgq798c8lgf35hfp4vyyi02ki6ib72c8tdshqwysicuyzi23pdknp39424cwmrprwx0m9egdacp9faptkvymjrehc5egs4ymx53rb6ick9jodyhuwp3p0hl4aa48becp81iqf4qevwx3n191mh7ehlb9xphojeumsbqztnrbhva71dy92pkwng0o709rlht16vxsd97y',
                startAt: null,
                endAt: '2020-08-03 21:13:40',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'x1sa9hgq6v0sa8dfejvo9r6cmhbzoakdc5hc59i5afxiw4g98j',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'yn0m3ae0ka2ywy2u7cf0',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 20:39:48',
                executionMonitoringStartAt: '2020-08-03 19:24:41',
                executionMonitoringEndAt: '2020-08-04 09:30:41',
                status: 'CANCELLED',
                name: 'mfupkx3xsgifkez2b8y1fzw78bda2nycayxqntj21yghgp4qm5cnp2iy209zqdqnfza3lr0j6we1n99802aau77vz31ra5alhm7te2jbqkkdy8mv69jx0zips2v09502mlwb6wm9a280qv7os4xv211gym8e69only8irvf7q4xrrhe8pg4r88rc249v41iaazr69m1vdtgj5xqz58j5dhlb1p5p2ilo0my846ysxjk8wjbkgodsqovpd1mvaal',
                returnCode: 9615215939,
                node: '5yos9euxjyzhya8s0472xeks4g55az4kxmqv33hsx7mx56yx5pqqd7y523y0m3w70yjhlt1qxox593h3o7s3kd8hrqbj4g2snkd1e8cxt6zrfodu4x9tpfirswdu7ltt83p65xneda77d7mg9r4lls5x9z3g63rl',
                user: 'pvv619evugskzk28zbwbuaqtwec2wxp6c5a8dnxipo3c8dd91yg0qvgoq5wracy7q4d0mcl58mgowzpe2x457v4cluurtifce5evvyjeg7eyteo7u155wyy2fvhwh4tzioulmnwd5twih9dd40jdaw773rp7ualo2pfs0kme78x5reqhrr9qfyd5wbwit8mpoeo07hdfb19frblmqrv3s8cs81e2fkg1gqjmuu4k1bx4ipxqy0ag666v1dla0eo',
                
                endAt: '2020-08-04 10:34:43',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'kar763jlfj8t0xfzva38oudtaianhm151gqxm6exqn9pnytww2',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 's429jfvnimubbc7m9e9f',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 09:17:18',
                executionMonitoringStartAt: '2020-08-04 00:34:48',
                executionMonitoringEndAt: '2020-08-04 08:22:23',
                status: 'COMPLETED',
                name: 'tenx0p5h125dmqplnlnubt4c9x2yapmtlc3653vdcohj190dv9d8gzpvgb3rk3ei0exm28wsackzrdxu8kv7wznelnqcmcmgjyqlbolpj0hikq6slsgojh0gy066bbl3tdqft9bwnh1a37m3qyuly80gij6va6xftlgc9gxrdj1csyqxce2oenk395jcbu98jh8wyd7eitz6pt7x2ygwx0tikjj132yu2c666w5mxmxi6j94qur2aubukedr6ps',
                returnCode: 8284300942,
                node: 'dvpyp5g2hn857g3eo4h23szl9n09nhdimkr3a6s23dse9wojm4sgcd724tmrpx23hrdu1h2bz5ucbovwwnkf0fve2slot2ma3i9wh26so120yho4m2g5w466fq2c11cvjtfknsjq49x5whedlxbz4dgyckihc45z',
                user: 'yzjhjl3i7xmazg9osiaos7z34d8uv62p5gp3du8wob7g5c734r8p9a3w6fou4ea8k2ze83xqcefwjymmi2vlmryf0ocs3dzx5f0e017ratjsglo52zkh9t1jkzvxlncjjfgh8y8q54ckj4ec7ib3zz89dfqlgu2je8uff5m3j6ourd6v01kmhjd37x35715twlaiy4ikgssrhrr3ejfbj8hgp23gupzbyclpsjdyhnzfpq5ykrohc9q69ppddua',
                startAt: '2020-08-03 22:26:20',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'r8w40t1jyhpu6cizdcyi8neggsl6h3ylc2fr9en31caxmt44lf',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'gd0rt14w572774whbqw6',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 22:42:01',
                executionMonitoringStartAt: '2020-08-03 16:19:27',
                executionMonitoringEndAt: '2020-08-04 10:39:38',
                status: 'CANCELLED',
                name: 'ooxuszih7hbj8hxathwo0s28ldnjmt6n410s2i7vfwbarh1gdxrdz83htn2bgaup3fscz8dbk0o1uc0garqbfzmufd7p12d32vtow7quya649uchhc3vvbwrdvthah1khv0a31dan5k0g6q8kzo3iliojeclj10rl3594rakrmiso2592m0dg1qjaqsg3pno9ob0gqpaqowlka1t7thvkcohpms1a6btnmd8bkv22ryc9vefee95c0scqqjmh7g',
                returnCode: 6141693507,
                node: 'fh6bn7g62vksd7fmx0krk9dd6zewrfr8tunum0kdhb6mapxdtvt7xu32y1hsv8x7ogi05yl0iipzv0r9mo16kekwx189fxs2p3w9mpjj6zre4ye2h5c30l8aftfr3i8eatqirpwipksjb441bscqyz9hc30k5pq0',
                user: 'gqtcd67xab7g3n6n8xg11lmdof9f7zn5eszt5r0wyxv0kz5ix2nv4frssqr0s3z0tesyqdwtow24aqs1j01v26m1l33r1zxasgrtk0087n7hl0bdf84t4j5tn8j6am4tkbaaiaveo1n06wh3sa1prqfi39nwoxp92yhcx9alh6q6drbpr8ulqd0xywg0lds2o653s0rs52c1kttqepwxv48xt8vu6q5ba7bonni4rnizc6xqlsfrvh8z4jx7hzt',
                startAt: '2020-08-03 16:55:43',
                
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
                id: 'bugwvyp2xo0quq1gk7il49t1d2lk9ga6wwh2n',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'quok9n4n6eirnhlqpr623kxe3paujv3e2va7jwbm4mzkgyo2qg',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: '4g840wfqyg6bre3nxyrv',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 20:27:41',
                executionMonitoringStartAt: '2020-08-04 00:01:55',
                executionMonitoringEndAt: '2020-08-03 18:42:00',
                status: 'ERROR',
                name: 'dun5ecvx68ufwzca6nmtor93x2qntp6z0bqzllmwr1cdyyf3yteort7har97zi7nr06ce22et7bdtqp81q09udht9l73qalpi593rs43su97igiljxdsbnjz03m3hjmuyn5e4moh3nov7dovs7otxgdabwe9lakqpzcrpe04kt1s9tqyl58m4w630gh0173q93wl906uqmn3rnbs90bg1953apfphlqdca6mmtugp3ds5mfwk5kgfei6e2hu4z0',
                returnCode: 5383105019,
                node: 'rfc4fusdafj4n8kcs1nz3c5hpb9zkz2jvly9hv739mw431qop8l8r2069ozkltk77li4h4cvcxoyf7gr16tqegxr3fsibab1vzsw26iz9tur6nctq9cjhaa8vqfjm82p7lx1ifnymmjjs3znjg3rqrai15ldcmvc',
                user: 't8f61dm9zufedu618flmqvbzyoso872gl9bpaz2y9a42sjblie0vdr16s70dc58f42ba2iarj47xfsfax4v48mou4p7v8ldhhyz7midnttljss7twauvvldlxupdjg3o4dyd9u3i0609785q2f9m0qmtqd8u5shbsoc5uhmegwcbyfilztsjtfg8pqwkt0n4cb4aa6unjahfi5fg0y1h6p3v4pi37ntfc3wnrragsew1snfvii2tk37xztrwytx',
                startAt: '2020-08-03 21:13:52',
                endAt: '2020-08-04 10:11:20',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'pu8f039p71vlqxnpi65u8dgrfa6kznlgql1h1',
                tenantCode: 'fsbmvzil9nocbuq77ofa2nyfgae76sab92uoqd03q96phmvla4',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: '4673p01qnenmbqz5f3qj',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 14:36:21',
                executionMonitoringStartAt: '2020-08-04 00:30:45',
                executionMonitoringEndAt: '2020-08-04 03:45:33',
                status: 'ERROR',
                name: '813l2vc25e7z8y6muj06bqypa8qri1icb8zi2rxbfpvqonsscpitnb7nnkappxyayx760kmx7d7jxitjmcrt0x6jjehrt62afaptu3586kkbn5w7ub75myaf33a8q47q42ksyowifn0vdzzm729desevp9c3bebfw0uag33d2xd39nfelz8d4se5661i5gttw12acuholy2iwbjtbnbjgtuqcrxigzeu0bck7gfwk1ou3ykmvrtkgril1gqpxgj',
                returnCode: 8657773246,
                node: 'evaddelts34q3zu9ixc9p7r00l71n73x2pmevn7h02fe4cuh21iyqtydfr0b0t6qy9m2iqp3cqlhn2mkgu3f5fesmio6dwwwjl1iuk99ev8h7aw6vh7x818ze128vcvg9vq7ly38szklbxeew6oafqvegrx2wl29',
                user: 'kareunk9igs5l4a5gltpzx27lqum7ijl6qji2k7hsg93huppb2awcdldjouwuwk7qyf2afr6yw5lwp4vrny098m5q9dxcub6s51kt6p4w45sklg9y5fn2zvkey67p1w02i7e4pu38pi297144gy8soen8nicv8t2yk3wmlfdr8mbmbajkt7nzbs0mgx2g6sbihks0a991ds1d78e65p508ql6u58y9vnvlhjovbd73kqsx0z0w4vf50ys8ufltp',
                startAt: '2020-08-04 06:22:26',
                endAt: '2020-08-04 05:19:31',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '15sv8i6w6nxakwybn9r1a0eohtdydan5yvojqc5bnhvat9ns0n',
                systemId: 'b4cy12wtn0gjy0172bc5mfhhwhdt20e9hg243',
                systemName: '15pfvv5mq2mfc6uvx2hd',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:36:13',
                executionMonitoringStartAt: '2020-08-04 14:06:37',
                executionMonitoringEndAt: '2020-08-04 02:08:35',
                status: 'COMPLETED',
                name: 'kxuiao82ej9qo5qt227ll3uhd8rfmb83cmbi23kllwm7byh19dum6w8tssv8f7z5rcqnp69vb1xcm0t6dikpcepiurfvcpifw99w7cib7s1eh5rwq382e10q2adn93cd6tince8q54b40x8zv9nd0qandukm4rn4be3cbvs6jthzz8japs6uax39xwfs0wrru13v5q4e8wov0dpqf9c6htfyagm5nzr8rmp8lu6879unofabanvkwsrec47m5zm',
                returnCode: 8719853796,
                node: 'ao1p4ffjuh3qd5nc8ojkstr9z84iappsn5eoldh8tmkv0heghmspkkxbpyzfpni5vl1deuaw6977jf9cfdqc4160w1jkdqekg233qvn2sykt18c8fmso9m197zfpd91brw9u8f2fda1ruj4kwnjsaus1lqiwtpo2',
                user: 'c8f9ji0vyvkbfhws1sy8mwv3zocizlp77qu1srmb1maalr0dfc7kajmxwyzd5mt3wxkv130o9jtggp41hmr535e8wzby0gmcovj7f3mdhrg3deu5pudinasw34toew7uxzyk7ui7zfkx4t5ujy89ti1jjf0nlk60yueajmxixz49sidzp0pzvx6tjo2bdjv0zcep4ugwl3rnmfavqfcuo9jg2k8l3yzlgxdeblx6ztlporapawdy6s4djfx3w0v',
                startAt: '2020-08-03 20:45:14',
                endAt: '2020-08-04 13:24:07',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '0lymssxgwz3qd8ipahql87vznmy902jnuhfzv4s92h8j8pstbt',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'bbbsz86dujbdiq150bq8',
                executionId: 'eoohkcq54n0h8grxs8npulo9zjd7j1gs7qiiw',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 22:04:18',
                executionMonitoringStartAt: '2020-08-03 20:20:51',
                executionMonitoringEndAt: '2020-08-03 17:11:08',
                status: 'CANCELLED',
                name: '9ahztmtjglfxuo1nrj5d3e3xtls8rgp84wm46fr6c2hg0ml2rlyw4drjqaq929c0w12k7plk9c8rx1hexvah71gubbjrfegm2hy229v1hhw7ilxtc2l56p1loroosu02kx1bvj1vf5gx3b6jb4z8ho1fyitkdh9v4poftc67xx29tgzmptv2dxajotp3i8hg2lzbexuuzpf1csekalehmbwkjvpno7iqfwfd4zqlme6lnzzykbmi8k21dk7zh45',
                returnCode: 9286088550,
                node: 'p3sy6ufi4imho3pjsp6gmbk6wex8nx0dv3a30txriqjh51l4ylnhj8mwul3qfa6caoa0kle9jqu6s88tx12ginqowygqqu1ezwf53fonubewtj487s1s8igarbc6zd2erhnlfd8uo36iuypjuhmluxf5ay6rb9lb',
                user: 'a0yz5ora81gy4lalnoqkmcjli3y4cghlmjrhpgp8huimeyrfmunyapnvmpe3rl937kzle0afay7fm6ko2pqlm9u1vxsvex0qzq1kxg020e2mm79s7y2dqowxzcmk8sz5uqyxh8pjhlfy0i8shpbl0hdu0zgofaouu62ao8jd56g2m4opzjyq8vjjakb7kp8znitdbdxw4mevctlml886mhujvq1wo7pyz6mzkvrlxvqoxxt96firwxzd0oqvw8v',
                startAt: '2020-08-03 17:28:09',
                endAt: '2020-08-04 06:05:58',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'sorbvlwgc7tetnmngw0pm1jpcdxwpybiqyq01kny7gpkasxxllf',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: '6qg2ewgez3f3jndv2jnr',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 03:50:40',
                executionMonitoringStartAt: '2020-08-04 12:15:53',
                executionMonitoringEndAt: '2020-08-04 13:47:21',
                status: 'ERROR',
                name: 'uf1taz7il6kls1q4z2lbpgft5zb2juq2txiqa5k8wleermy0m4qn6z3e4j32obyg7rxurwi45g7ea2mdx59ojvllu7m29m42szu1z51vwcg7360ysq8hgbc8i14f3opvo010oeqefvz9iu60uw5tquknekz7qg8ln3yirb1ouvtsjdw91i59p5wqujwduefo4oidv9ilx0xgkjimtubsi9twsofzo4vcbnyfj86i2q2rsp6fjrqbv1c5fb7xbgu',
                returnCode: 7140279377,
                node: '33mc7c4g7bwdu5u6fhqhv0b7dco7ser5unj3biorxozycnciahdj112rg14z96vaejspvc8lwnuocg7inxbsmmzej1m4t6ddjza41qs0hwvning20c6voycmyt3lb9ru6o12a52f6x56uxmgz4nvbj6squj586hn',
                user: '6bmxuyanveyemokl0sqdky8s1e5r6b9lknc1snh58jk4n8uccy8j4ubw4x9wpqo31ba0jniy7b1iso8rlcaxn0yjajfnq4go11kaxn0auf1f3h2sfgxbwrhfsgv0tovtc7h9j2a06mfqsc9n1gvpjvr03f3u7oiqatofa3vtrudgx4z7qm7mmo8v6qxfoq3uo3ms9ouef417wtrvjtsdrhk8yhpfvm58pgxujqvss4wm7eeg3zngoinuyc2s390',
                startAt: '2020-08-04 08:33:07',
                endAt: '2020-08-03 23:11:38',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'vdupaijzg3yj6jk8q0ivu2owi4ny93xdr75rrnd7jukez3bp15',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'wi7t7ogufmrnjn4613ry7',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 17:21:43',
                executionMonitoringStartAt: '2020-08-04 07:20:11',
                executionMonitoringEndAt: '2020-08-03 19:03:13',
                status: 'ERROR',
                name: 'mtlv1w7fe56wh7oq99h2an9f4psivef5ifcy7wfkbzix1h9619z5dqjxffi6p5plwd5e6gmxrx3adt52jp3wlbsmqku25m27sebpds2jz3z1fi4yd93i77u44zg1fy34pdynywy58n3srkmyqhanrd7rkkdypp2606vjeqkwh1di9lhwwz19hbecbgh22m5ll2c2z4tmwk0p5v83mhr3f3h6nazr728jzrjwiiektmq397f47vc6gr6nhteo1r4',
                returnCode: 8411629431,
                node: 'zdh8lrjlrwihjudam370qp1w0wanca6tqdyd4ihnztr9086vpz6dw5vnxtw38s5qa5uy3wyyloi8okqvg1xyltbyu28ix0crp9lfsanei46ukuu5sh7iv3cyswmhib7n2saudq1jelay3g7c68acbjz3janhqc15',
                user: 'd7gbuwtkrfi36czo29tqj8nttvuv235smdr16lgcea7591hfkoauqo0bo3954f1lxk0z52j0p7xar5qbdw2tzyymkjoyae4wzls83hw8hpolryua5dor932vj25q7v6n683x8s1c2a5huztu0i3813gcfo3de4d0y2dfj835kcl0hdp9ejvpm3pjj8t2s2cn88pjmmqc9chaihu0sgvi9iin3wai9jqy3leuvw4hrwxynvbhxe4od39ry6e969l',
                startAt: '2020-08-03 19:45:32',
                endAt: '2020-08-04 12:53:01',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'ju9eoe63e6uytmfswtwvha21biq5lpqc2geh11awaa6ekh8zf2',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: '4ivpn4j765bl057t1s7a',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 05:13:10',
                executionMonitoringStartAt: '2020-08-04 14:29:24',
                executionMonitoringEndAt: '2020-08-03 15:06:55',
                status: 'COMPLETED',
                name: 'pww96t3h745z5cu3ab8blidniaic8hi82x8lh50w3udcr51baxdx7d9mwen25ok96fzonffeervdg8vcsnxs3kjtnsys15uhfthb0tw6ejx378iquy6upk9hwr4iseezjr7op6bezmyof4ceo4x9z2wfbf4ajlxmn7u55xl5fi0vw1m3dremccqq7ducdloozc7dmslii07fg25plxq4ydcr30qh8sim3y5r6zk6xrwlk8o7lroww0jfz0lyk72i',
                returnCode: 7602600023,
                node: '6e2dl0jt28lxqmo9du8v4vo85tu6p3lj2v4rw9b4e93r0aw2qispdmzpdhrwcoi407mv8yhqwqd2lm72zmzkra5m82ggbpxghcw810fgb3hx13k86kpspofjtp2dpzgywpheecex2mikgfghpnckp6pj9ec40grc',
                user: 'i82pcepptx7g6dwp1j2mkit24on851k7tv2jwqjvfrwl32steons44ez8flrk0ydr0nh8z9wr10t95whl4qpo1uj9iwerff7h3y2ypn8z8s1vl68ewod12lcyvp5ucfquonr9873238eqc1m06zduldzt8qjcab0kd3f9vrc5i87xj08r9zuvqc4m6qpz2fyqn22vuadeulczdi1xzjfhlxz2arojqz449sgnj32blqbwcuyfrb2q4z4f3riw0q',
                startAt: '2020-08-04 00:57:11',
                endAt: '2020-08-04 08:40:14',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '83034bwv793crfpzldepdor0d88yfa3baorrgpvvsnwfbeq8jd',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'kmwkl6d5si25xxwu918h',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 02:50:03',
                executionMonitoringStartAt: '2020-08-03 22:01:57',
                executionMonitoringEndAt: '2020-08-04 06:18:40',
                status: 'COMPLETED',
                name: 'z4wlfz49v5q0nucrvxyufpwysjr1u1sa8he79eltrg7p9gu86lovq33h01wpq1c5pgk2bwp5mbaidcck4ewtm0sfkfm7jn9u0nplv0xmsb6m6zepbk0e1uc8ir3xvnr1pil3yxq9fg2z57vr4b3cmufss6ycnpljpc04iqhhczut4jv114f6w88j9xloa5an4k6bitvjkeomar4cgsixtmkoo8sd1cln5tw16zf00fo45834kkot71vrdhnd1vn',
                returnCode: 80264394792,
                node: 'i64efkg5ugf3y0ygik5mrbxn5sfxhiy4gynufz6ickm2id8o6zg7vt4s285nvkvfqqr3d4cpf68nrb5l2j7hqkmvj9xy7b9fthlov4a63t3tcxtmzirmki2ald1kpeaq5l6x4gkc25x9okp9egjozignluuu2d6c',
                user: 'pn7jqhuzrz388wkrp27bue1w55z0r3utm1tihj1596s90lou9y3juxhmq7jsymp1qwtoztrtv7aq06f1wg12lcjjbkmbcpu8460ex54uzjzyqvpnqsmme3ylr9x7w0zo5ez10lm8i6hfuyr1kqfxejcvz1y44el9erw8pnlz5bptahdzp4vy7wfrfrqeljnle6gyj2p8x6xl0pj75d0q5h91kznlepxjpu2momggglfkfbi0kgkeapb51gqpokt',
                startAt: '2020-08-04 12:48:51',
                endAt: '2020-08-04 12:22:58',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'ltj7p9lepto64biqcxw8cxnmcwub8vum3qbckff9es9eq2nuo1',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'ps35d5rqmz8hcgdvywos',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 17:30:58',
                executionMonitoringStartAt: '2020-08-04 02:22:57',
                executionMonitoringEndAt: '2020-08-03 16:17:17',
                status: 'CANCELLED',
                name: 'l3qrbaguggoj61p8d4osutr4k7qt1s7kwa6dwuneo1cpo02tdt3vt5ko2ehz1l2xb6ioh4ftn7fyb0tzqpfdwm1i7xao9ekaf0bf4g07q8drsbgg5rm5csbim189qd1ibgh3j8xrc2i3m157bjwnebm2r2800ajt92cocdmqls3tbc60vy4sn7mh4a533qnudqb5es8wf56zpp81974gex4synmh86hv3rntw17v0ivvdqgfv9tctc8vjyhn0s9',
                returnCode: 4284096899,
                node: 'gv5zaeq4uil0prh1j6jh3844a46ep46m2yyfmma5rhgedgir95dd6f6w2yd3cgrcoxh0vffihivv9gqlnpr7ti4mnz00a5d4006hivpqocb0a8lnzc936s6g3jyqkno50dgkiqd1i0miiixl5ldbhccm0a6ua6nq3',
                user: 'f864a5ujtkwixtulpr4yvmca5thn00i33823c3n5dsofspygqmr1uxmyq8y0gklra6h0lb86d9r504l2vj8kqj7j7ecju4lho43hc8qx2j6of1p2a435q8p66uti93om65tbtzfplprgiinnen7sfxdj74w10lqog9zzfb4ftdw0p8slcuxanxd5jwfgad335lnxdn0mdo89ghllczawkzn2dzbch7f8tal30w7tfzqk7qyioux0pj1hjkczzg5',
                startAt: '2020-08-04 05:05:16',
                endAt: '2020-08-04 14:02:26',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'hoxgnxye6yaiu4ab4zmf15dpu0lecqarfyaqitlmwdsle2muf6',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'h83etz83l0tst9jr2qdq',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:26:50',
                executionMonitoringStartAt: '2020-08-04 07:28:14',
                executionMonitoringEndAt: '2020-08-04 01:02:44',
                status: 'CANCELLED',
                name: 'ef9dyf14m0843a6pnzvxoabaykusk1ld7ixv07rrl68rmze6i92hrtdkqh5angzmggti9d69skzfrwt5lzub6m1d8gbr75hstxqhlzoxym0940mv91zjnbx8tyoyxwazq58h3rxwuy1tv60nx9my3r48chfxzwq5xpmtoudddsa42svw8xzgnwxpfdtp4j9hiire1194ka64ehm2a6ejl68xi4hwdfl24e3jzhjm9snt9ku9sj44nfwfr09m0dv',
                returnCode: 2154391433,
                node: 'bqbtfi9z1p0ijo4pbc5fpjlqv9zymx0c385o8t0i52ejwo00o24ucenzjwxxdtndutsfkvs6tafuhysslwe9jjejt2vdkbekemloxutag4acpkgmppc6b3s5muvdba7is9qqq6wfeyw6khpxo1q28ulsxmk4kbk9',
                user: 'wikm3cj69p2fyt8ckzlc31ivchb4ol9tjz04bj2ql2ccmgv1bulpjvqdblhnjrz6oz1h981e3y511inps7nduneedkzn49tzye46jqxpz1a2h6y03eyxtq7vrhptuhilf87gkmao9gsjlrhzb9h3k6rektr27lky6ohsxzuctyq6jje98f4ppdawb46h4wlpjka0xn1qxxuggyrdq1oab41aguxfyzv21ku69jh87ko2ezjo6dusa5818dr85xsj',
                startAt: '2020-08-04 02:14:15',
                endAt: '2020-08-03 15:37:52',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'ykgezqulq9socr10ts039j4rzb7b1bqool54yif1hpc91coczt',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'yemz2zwmqxjl1mz4b8o2',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 06:08:07',
                executionMonitoringStartAt: '2020-08-03 20:18:47',
                executionMonitoringEndAt: '2020-08-04 06:52:06',
                status: 'COMPLETED',
                name: 'j15t1uj09t3mr9ta8oumcx8sypct31a5w1v3dzbqoor9qm3nzmsr6x94lt3q3kl3bbnullshubneo7o21ubyfb9ndn97ok6qaqewy9a7xa2rnn1n6kbf2qrjgywxmsped130ax9fx4z0eqigr80pxugpywrpmqw9mz8yk2ugjwdop2ifl0wg4p1sxsa3kvfu4hqpbvljlehbhzec80arksvlg2wdkez3mpz3mq4p3cnwkdhpd6qmeb6gnhtwe8u',
                returnCode: 100.10,
                node: 'jbhbh9xt8cky3aga720i842ta705ek6vow3pblky0cc3a4zqwoq1z17wxlitacxzs5wwgflvvhx0smtee51002m3iic56yo1ygzf4a2m5pga3nw24p34mqs1fu4i7259kk72wo74ou63rw7cyfgywe6aoizi00gz',
                user: 'b5cys7v2kp5xloeyk9fye0lke6awve0wqn94mcy9hesfsmkom1mex9pmxgufffzhlsih3nsol3dv9uehnlueey93bo9sicsha58tu8rmvl0ehoz14lqtnqdryy89iw3phm7cfi7ldc2fq7zsiuk442w6u4zwl5ls7k5xsa5pa1rct31oovbndbywo0isyw8i4lns8x47gq5z4ztrr9jeg155hke869o4okh39cy7jgprcijkmgknb11mcmshdwq',
                startAt: '2020-08-04 06:07:05',
                endAt: '2020-08-04 02:35:17',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '8mq0luy4dslzhh7lrzykcmm8m6ayayic4w0yd81nt8htuqj946',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'a8sdhb8hdfwywkkasjbq',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-04 07:47:18',
                executionMonitoringStartAt: '2020-08-04 08:01:03',
                executionMonitoringEndAt: '2020-08-04 02:28:53',
                status: 'ERROR',
                name: 'fmdnlyx3la0hub8m9arwcpvx3ufxjelpxbon37od0e8328p9p6ymnqm6axoai8o3ftkyx8qkmmtlmjexguu62bz9hicrfuiy9o9tk0q1jtqdxoxwniii3kmiwk2ul98qfkxt1gnouaxj9aplpphxcpgqntq0fexrpcgusfk49fp6407bitzwjl5so3ysvszk3n9v40g1fgfygdplg5dn3k65nc9k8jx5d68qfm15ehmfq8yspww1rbskz9wsy2p',
                returnCode: 1440806261,
                node: '9s98vfu8b1p954kh8j5fx9645780mdxkau3xrap0papkf7qv557208uwea4gxpo474xt2wa8i20bfvqenon9f9810ui4keq0qsogshm4t7xlp22gsnvg4shcp7se3u7gcce9geh1oezznwneksvepej01g0g7ol8',
                user: 'nk4v6ai3prg55cxry6dq2n55lteg8k07hv9d4e5in8sxdnwmvmr85ov6utppr0qyyqf56hjqgf09dw34e9777mg5s2n3ks5qmeh8uskr3c8av2cm9ifcvg09t26o8ym3tha614malwjz80yy0vx6ff1mb4ywssto77ez3a176v6bo8lp26mf0q257fz62dsh21e4732q7t77yyd5lx3rs6mrj1wfa7sumadm5akui0tkvhmraqih3v9y4tlpknr',
                startAt: '2020-08-04 01:29:29',
                endAt: '2020-08-04 13:23:57',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'ejv5754o6z4xgwuf8nuehganuv4822efe1y956ewsnuy0uc50b',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'aeuxbwq4sts04s60mu7l',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 09:12:59',
                executionMonitoringStartAt: '2020-08-03 22:46:14',
                executionMonitoringEndAt: '2020-08-04 08:02:37',
                status: 'XXXX',
                name: 'jci682huahxo25zcdvbbiqx3dfftbv1ay9klve3czflcdsurqywo1zcu0c3ubhrn58llvbe1an6vf34od3dww28u08dex33wzej8b87cdja0s9pnxvyvtkhf30kscpb1yrebrwfzjq6j112qet5sv8kk31eiagl5n3zwnwngo5v69njx0nwdsci6zz9dswghzvd00yblsjcj6u14yorqw6e5ersfkkif51bdssvr40lk0m1kg2hjw7bj438g5w1',
                returnCode: 7633475889,
                node: 'lnpass95y19ezp158afou881c687x9apeljrjmausqyyhqdxygorx236rq491792kcr7x70qdmsk1jkc2qd0xz3jbg7yqf3f007bele55hnl149whvrv7qg8rfscc7iqyll17lgasega53h2merks0gai77v1jhb',
                user: 'im46r6hdmx5obrcxb5hbfkzlzv990tt3hmf0wdhpbgwvcl4fxln0c1fsxosdzr643fwmnt0fo8yii2ez27t3o4xxu1ycp045tlplspic2ctehckdik8lz9sao35kdx0e6i4x0zd9ln0dqhrkohrflgs32keti8ia4dk5azsanpo9x4c4ltnf11hklwdroxc12cfq5nyqxuc8fa4uaag3zvh6mbyr9bu8dfo49ac48r6s53xui7tx94fnmuhnflm',
                startAt: '2020-08-04 13:46:48',
                endAt: '2020-08-04 06:54:44',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '4sw6aes656594slzc26emivbov0hyr575xr16yjntmqh9fg1i9',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'sovrxg0s2nezhz4mkuv2',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-03 22:22:23',
                executionMonitoringEndAt: '2020-08-04 06:15:30',
                status: 'ERROR',
                name: 'gul6oqwl682ar67716u9hyb0zdjiuu72wjxgx07neljk6kxz8v6rridlkc80tt4ll6249mwtimjhglgo71uq5kaobh1upbvanfxrf80e9qp0v6ks15qpxlfudj1ls2bpminj5dac4kea18fmd3rm2nff8ara7xdd972c8vlkiak54b4f3jqn4clontvbqvqdiiy1sq77hg11bm0ng1b9mu6mqiy6h4c1em5yv71cwrggo3i5ywl3syjwu0762tf',
                returnCode: 6700962791,
                node: 'hx195gcayn4h6wssmet3cz15ko27hr3ul3zqd3hs0zsgqblqeuq9gadhnu322cpigcgrjnmshxi0vwsj8ygxrx6necgfbmc1d1iywc28wgq6yf2s40i0fjynigq75usag0zlix45lxxfuhiudv0x630jmfct9gyl',
                user: 'le250gvtg43hr7q229wyiibgypundjvio0sheq5d282tj0o6asiz6yygrcxnqbeismvqyviv4gyfslsd20ryfoe4hcftj07ckw5h179qdb798ypxbbk4z2re6rqnuavhoi9zdacuhh433ldd2rvel7tnxurn46n0jtp1cqrg4ny0kjhrq5gack5hr8evjmmgd3f5vc7p6z6w3cyx3kvctkezt01biu2nk7jpcgtme0zy5ev3a8anxedfevn8lz5',
                startAt: '2020-08-03 19:19:43',
                endAt: '2020-08-04 14:12:47',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '4x8jymmgj2slh8heoyva4ofjqgzmf9zil83n2p39wscpholzjv',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'fn6jmfid23vvc95wxrhb',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 23:24:41',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-03 20:55:45',
                status: 'COMPLETED',
                name: 'rccr86x24uo0e1sf0ongvycms90tyj4lt03yzo19dut01892t7xb588e9fzkofemhi8ez86la8rctd5zq1sivofwnnqzr9olpruziwj0ue3berar8fyn7iwjj98ujq88enzwlshyssfiugg6he14jfotkhe2jkfapcx2aacsgjenerym44h2da7d3684m1saiy7ttmv5v7kh9n3qtlbx591vitmpa1r45j3b0y93r10xh999scqzpexvpl0xyx3',
                returnCode: 4593204377,
                node: '3j2rcfhq9k2xt2opnw8xgpe6b4itgzvahnmsfvw920w8wwyff05yprsqiw02z5ryj1c7hg31avcpaat5d7z1s6q4xddz8jwup8ykiizt2bqvqkwj4euc3wmtn37aetfnr211jv21ilwclwj72or1hmc009wc56nv',
                user: '1rd9ny74jfhslsi7gknjip3e9i0c27v7ubs9383o3p05tolfz3e687qqadg51pufhsh2kblc3qq5llbyxqo6i13gof6r4jlxytaxetsiiueb14xqdtbdif4duswsge419vsaalinx0ulqpj4gr6x3qb1tv7blt1zawmkel85xew3gbz6l4btoufp1s7qu2k563wg8tehtz7ni5kbwapqdg79twzqpjoji3al39ymbos9m8tsyex0867ktsul970',
                startAt: '2020-08-03 22:57:41',
                endAt: '2020-08-04 01:06:42',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '4v5ln6pxnc2u5t933vp6ws8vn8xm45j9a5rukj6wi4w0xqfsd9',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'fyn2h3w7au2s095z5v0r',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 02:05:29',
                executionMonitoringStartAt: '2020-08-03 20:26:13',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                name: '9hi1kadcvljmddt4zjuymr9lkkb3srzev89d2vy57obmlwbkgdyui5qd52bw5xgiefzrwuu66mpbspex2v0yuaz8ng1macq1l9eq6w5fkhnjjg0nvu8del4ma1v1zaod49m10zjg4t14gkcpcg7is525bijjg72ukmikyervrqul1vqy0xyu7zuin5ggmed6h0mj5yopaa3aryg8wjuk3ir73wzr1j2dmf8374jnuk6lu1osr3tig4d7u20p9ck',
                returnCode: 3989872468,
                node: 'ghaugp4edzjyuyp0mjouzzqror2rq8nw54ed5c2h507k6hhb28mc1prm8zlo6xhyn5jr2rjzaz651nv1gsdvpnmhz8u5utbazcaavj4pn9zd2z1b08l9ph894tz517lu51t0qrmgju20lry0kwchydl8bnj2fhww',
                user: 'wn2o4xqqnodk13364wcmmfl799x8tipslii0kgw53i5duo70oj9seu8h72fcjxzwzdwuscc77a1y5my8yv8lop57btqj6wu2s3ed9rot5ii6idsnszp5ibst5i6ecio434lmqfpb2vn3zli8ielqs0hkm5rkb2c2hpw1a06l98brthdu64ca9itl796vlhq0pwl7pgz28co0541ona834trmi0tu5nccrw6u6vkoy7l5oq7rfkw0x8h1imysxn9',
                startAt: '2020-08-04 01:20:03',
                endAt: '2020-08-04 05:21:16',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '35wokuw5v2w7ujupdu3gin41mi1r5hcuw5pgc85siqowudw4qn',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'lmieuto7etipsi09jqaq',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:18:29',
                executionMonitoringStartAt: '2020-08-04 09:02:44',
                executionMonitoringEndAt: '2020-08-03 23:18:41',
                status: 'ERROR',
                name: 'fp6cz81mifub0m21jyvqbn0k2kugsr7hsv6rs2319ddgicjszsxsczwrxac55arxu0d7ocbiqb4nh931tu1322cctph11tsal7gw5fcy5oj4pqxhshvfr5471x5apsjacmryypvytsif7ei6kdflu6vywgikiw0jhh36uv1cdef4wqgz3rw3zuz4dcanxtf495uqfiji1a9u793n1a2sv7p0h9hr7ey0zynqfu5ppqprepvivvkrrrd293hsmuc',
                returnCode: 3060152713,
                node: '8u63blt02vi9vjnmp3dmxxs3dfi4vt26rb48b68tbaug3xzw5wtjmhum5wobuspzmfz8odx9q72d5cxighjjtg3jwrd7rmdu3apw6e4yly3eohbrujdob0dfrbq43svn3xvmntxcqb9aajrs7vv63er8vc9hb9gg',
                user: 'ur1r6ua29apjlqreccj7wx6exrhkgcxlxwimamnny0yj54l8a4k80xci3nesoki85d5g6jzwvumbjra8wym3dqbyenonelvu1n4b8i967fy63y64s71h7hmc0rdwfib5iu3vlnvk04q27no3cjs69ie9heq4qipzwqwjlgzazjxn5h8l9961ryh99koor0doremlbbedvqiyy9oe3ohdon7te0u43nddhiufbth31979gyglfq5qh3va3rfzlmx',
                startAt: 'XXXXXXXX',
                endAt: '2020-08-04 03:14:35',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: 'ux8wa0yumm5ve8ziu1t9p5jgzdjafy0in1e5yp1pzbqxmqlq2e',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: '8crhjkxxy0rqrkz7jrbt',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 07:20:30',
                executionMonitoringStartAt: '2020-08-03 20:19:22',
                executionMonitoringEndAt: '2020-08-04 14:23:53',
                status: 'COMPLETED',
                name: 'haasokl36lqww93sip930rlozdgj8c91bjj5iwelfzqcmdmr0ypnlbsy00e1076rxnhgil9h43mdgpjgntti25efc5xkekfxvbzmikswia3ljmsm78ct2czmh60kdjegvalwv6mv34pjw4sq4icmnrwvyuv0oq49vdhpusrt33psy5uc53jcbdhn7phnlu1s5qzm9h2zuziyl18ditqgnkzt5vtkgvieq5q1ppxtknyb0unz0co268mhxcri5s6',
                returnCode: 7578169185,
                node: 'bdhdms98f8g2r12dj83ooi1e7iz13wtu7ly0ap82eyzlh3glhw6hld8zvut0euy95y8kxowxe2p89m57yluk69ou2arauoiw1ldre16cdizrmyh4brvswgp0sh3o7j9fkymuk2fuvm5rxninhdiivq4mf8zworm2',
                user: 'zsysvxc1ybujm8h36i76b8rgr0uo6m78mmmyfz0pm4s40bun2g5wdizq772vcktkyq7u5y2flz0vunpjdfydannoh6te830wvqenn9lv5qtinfndwxlxonl89hk97deqsedyho4y2ickdfxog831bmkjwpjatk3ig0ej6ub9tlnktfxz7619uwsay1zaihsgffj07kylg20az0b23pr4c66bx6fmgj8nfs6e4um7ru758j2ytjvdk6cxvvzu016',
                startAt: '2020-08-03 17:42:28',
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
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '5l0r80w4l8mqzhdxx8bmof29t0lwvo69uva9uahd7lj5c3ouuo',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'o0w51g8jotqwt6y15cmr',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 12:07:09',
                executionMonitoringStartAt: '2020-08-03 20:31:48',
                executionMonitoringEndAt: '2020-08-04 12:01:31',
                status: 'COMPLETED',
                name: 'sbldlm9e5p3ko34nkegbokcs74qx6l92gc4jnnto3h8rkfer2vf1vnwddru02pxkfut9pdt2adqweffutn1qkhth6jg6xhsg3pzz0hkandkzuxcvcsh6tdw283mp4om9ibjf9fw6dx2983a7iivazqdfqvwnm33qt08qyk1y9xkv4ojd7w998g0z668aaseyd59ozjzq1d45s6e36y8qho6t9lqwl9nxcdyx4lnhbp2qt97zj342tcxu0ay5k1k',
                returnCode: 8809629558,
                node: 'bngeyjawt1k9vggumihhmeleyirqx1crng194nqg5ywrli9shmx20bhwxrdlo7iiojhvk3p7i8g21nedvkk3t0lzilkyaleagzg53s20evccjswrmr6gr4jyqmqmv5jhxcvqijk9zj05r1c59cdtfh3gwq57ctui',
                user: 'd54962uhm63pm6fmcpqqn24sk308ejzxebdwci0ab6oohfcqajtwrpj2sl9gn4yr83cegmw8ky0ko6cib84w4da3yz5dyuv93func45k1wergqgz9ct7se430dzklsqupdsjkynq3ub0rr7nv79pccvp1mgxsqanh2sg0767uzve7bwec56i607o3vu74r3srbko9345n123mzmlhv7owh30u8bnm4cpfme1bxg86068o8w20flfy2wqdicjkpf',
                startAt: '2020-08-03 19:57:00',
                endAt: '2020-08-03 17:55:23',
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
                        value   : '82b3ace1-352e-4810-8380-9b6cc8703bcc'
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
                        value   : '4d4604ef-36ec-4231-8ea3-df91fc2646e0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4d4604ef-36ec-4231-8ea3-df91fc2646e0'));
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/eebd7264-fa61-421e-bea8-5f0b4728a38a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/4d4604ef-36ec-4231-8ea3-df91fc2646e0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4d4604ef-36ec-4231-8ea3-df91fc2646e0'));
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
                
                id: '88d3012b-efd9-46c7-9b44-8f6b33365454',
                tenantId: '612fb850-5958-4a87-a730-598b7140e8f6',
                tenantCode: 'gckzdrzpzuapw0eq8fz5aylwhbvmoe9i4zc7txe1x3c1dxpa7j',
                systemId: '3cc73b79-0372-48ea-8a5f-a8c3cf0ef79f',
                systemName: 'kelu7un2imgrvl74t7lq',
                executionId: '80dc4f6d-d84b-47ff-a329-42ae2e4bb07f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 04:35:03',
                executionMonitoringStartAt: '2020-08-03 16:40:57',
                executionMonitoringEndAt: '2020-08-04 07:50:54',
                status: 'CANCELLED',
                name: 'wzi59k5bjnnm3ea45fpqagpw27pkifzgp9839qe4jdw5g3ike67xtjvew1nq4hwl58wv4w6nwp3yghb9qms1kb4ipyzzo6xduvch6jf35unrclsg7qv6tdvdlm7mqlcwdncd8lqa3cmrzz4lalxiwhyjjkctdg4oeoiq692vp3ads4jbo32mef3nm4j5ags459mzrcay13a49ipkky22bbvsxjcxno2y93olgqqu6nxjkr6qm3qe190q9gcgzac',
                returnCode: 5412621700,
                node: 'ly283e6aftpic9jx1a9m23zbyztsjz15gyap9kgm2qqj1q02vinboc3fivicco2abdz07j40xex38f4rg5j0qlwwrtkkxctc4a6lifxfte37hsgdlr0l0fvd4d70k4rmj9lpgni1q5d19tnpvv591ys6mtt590e0',
                user: '9chwwv0ppq4qc6v3jypldcare5akg0ts6bqzjqbjgm7yy732mqj6v06zf0uzasg2qkmn66j4z2fn7cdky0prmkecl58bxx5hg1q55vxnkooi1ddedbiy1s87d8unn3afg2tlbnmqs9pkir0leicamq0enn8qqlt0lwlbr82jo3p3tifgt1n7ci0dd2u60sa9e35erublsc8rhpm7pb8jnx3jea6qbi0d6f1x3grcee414qfzv0o6q0qx69s0few',
                startAt: '2020-08-04 03:45:11',
                endAt: '2020-08-04 02:26:18',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                tenantCode: '1o275ct3e6fmbqvpg29m3haykmox7asvkahmnot9rh8z63h05k',
                systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                systemName: 'kw1fll65p08l73erphkh',
                executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 06:48:52',
                executionMonitoringStartAt: '2020-08-03 19:07:27',
                executionMonitoringEndAt: '2020-08-04 13:42:36',
                status: 'COMPLETED',
                name: 'pd5vwrzdgcb9n0mjtjyrl9yjtqbn6h5nj1iap4trkhy3yml7080iirbgjnms3o8iub0c3l4uqu9ezes3bhgddhy12eb3vs9u25eufgjne5vnk56gjpo9vbdbjrj66apztt3dhqipy51su0rypsmjp1ah7brrra0gji3c6wehfg18celqnt5daikcytw7mpg9x3l3bcspwqsn07ugkjlzcfqs12nl440o5tutkh2pdjd8d9jxdkm62qbm4679i3k',
                returnCode: 7137681667,
                node: '24hj8yoq8lplwowd1rgtietap9bhdkj95krlnpdpjh4cj302dyl64iphod9z1ccippqvh8lt69fzhhmppgzgz3p4xk8tpyo924yc21dsacnchw7k0piuv708ws2e8ul0p6x67wa547x9ffuhq413oaxbrw7cna5p',
                user: 'i5wy69v0zf8da4hur21939m8aot33kj4kq3ao528oyyvmt5mhmyh17mpiycwlc9h15x1wmrkxjgmbuvl49g7ta77bibofx9btn5jj0vfvb0x0eoivrzk45pfcqiwuz6tet3yvc38fetj3ebdtwd025ua2djyc7dlp0ljhfl2bifgfv2jlwhtsq8h3zt6kjy7mzc6kd1dv9vju2ruizy61jqmupqgcfpb8ecs7mbtg1k978t4ffgrjgt742kudbl',
                startAt: '2020-08-04 02:00:47',
                endAt: '2020-08-04 08:20:35',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4d4604ef-36ec-4231-8ea3-df91fc2646e0'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/3ed6ef0f-8fd2-40eb-9671-e1d51dec65df')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/4d4604ef-36ec-4231-8ea3-df91fc2646e0')
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
                        id: '5c1c958c-477c-4097-a76d-52489cb507eb',
                        tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                        tenantCode: 'f5vudkvp8d2w9e9o6artqg3gkfbwi2p8dj0fy5ne332roxfog7',
                        systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                        systemName: 'm7w2745m0zvhqt4cnt1l',
                        executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-04 03:45:36',
                        executionMonitoringStartAt: '2020-08-03 20:37:23',
                        executionMonitoringEndAt: '2020-08-04 11:14:03',
                        status: 'CANCELLED',
                        name: 'm9bab0u1j697thyvtmf6s1ogl1gy8z6q6ijlfm4eum764mkax4fo8hfxwq0x7lmeyannlhcobf8a3ogwax6jjibfvgzagdusqtozgk8hxzhp9aqei86ze5pko7bdywr357btj4xbqb7yxcb89kbh8xxftshkdr0l01ft5wyv3edy8z51tce9xiglfzx3yg0p57rzayv6hhjeczetas8dfahsoo41sviirf2x2bpt99urknbfl9kzht7ddem7khr',
                        returnCode: 9645405244,
                        node: 'maz0p49n122g8ywedw1isrdwqwm8jves2yb1ka7cv1sd5m38p29ioh3x0sm4q0jxvv5k0f2gwhxdtkijv2cc7m08ps1v6ieuyqb2k7g5ozml1h0zp7y8iv5vj0dheyq332sc3a78lqckhl4pfmsfejz6auc4eozd',
                        user: 'dssuko345jfyr22pj9wdz7h56upfce7m8yjag2s4uy2ojxkrhnhjvivilw2i5snrsijmhe0onuqj7smqw4v6g4v4o0afoxts9pfurjdvye41ol2pmo58j2wz65pqk0md567jabybdlujfnkk0wwkjizbmitwtbxtyf4pn91hjbzezjxnrcl269h4wbgwujm6wgp8y7abrj45bcnm9mi8qfaayxdej10zud218vge12kfdsx95moga2fbuyn20o3',
                        startAt: '2020-08-03 16:14:14',
                        endAt: '2020-08-04 05:49:14',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '5c1c958c-477c-4097-a76d-52489cb507eb');
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
                            value   : 'e3e1b119-1a04-4c3a-bd32-336c607e3ca7'
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
                            value   : '4d4604ef-36ec-4231-8ea3-df91fc2646e0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('4d4604ef-36ec-4231-8ea3-df91fc2646e0');
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
                    id: '560ce689-f9f3-4cd0-b29c-f4fd0a90bcf1'
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
                    id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('4d4604ef-36ec-4231-8ea3-df91fc2646e0');
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
                        
                        id: '486d1fa7-4378-48e3-a0e0-05de0f271f32',
                        tenantId: '7f461ecc-08aa-4a81-9420-46a70c11ac1b',
                        tenantCode: 'udj2osgu79pnn4m3hy81q06cmew3a1n7k4sgjb1oibngrygkc8',
                        systemId: '6cf272f4-b9d9-45e3-ad42-84559f876a4d',
                        systemName: 'tkdcvc3eotx3kh7aj1fh',
                        executionId: '3cb852ac-3f5b-4b7f-8a73-7d024f16750c',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 08:57:46',
                        executionMonitoringStartAt: '2020-08-04 02:57:51',
                        executionMonitoringEndAt: '2020-08-04 03:55:17',
                        status: 'COMPLETED',
                        name: 'oweqx2z220ta0dl7d4nblop80kyjave7h22q5zr39frysrh2tpkkzia17l99vev9l70eimibmze2b03ps185h40yb5vhnr6x9elprhauaneeb2xbakpqusc55w7l2hn8977e15k1yr8t0spllnjqykft7g5mla662mna0z10ow6qq22z49t76phfyrp7h79g37ee7wy3goj4prog6bo6fg2xc9d300iige683pxexiafnfmed6kzwpbum62z8qj',
                        returnCode: 6363134447,
                        node: 'o238ajxm4ta054s3nqw25xw07sfg2xbbx0g71oqopm4g11z24icdx8q0sn5j2afbiilv237xr4530n1qo5truvrhjja0nv8ijotuwv8uwrthvwisr3kka16zwf3tgvtncj8hq14fofcqtcfgcqv63cxal0i32ez7',
                        user: '1htowp4hcvtyf9ckvhdhmgf4zpp9s9mpb51m1ivog6l64pemrolgocs17rtgyj208oo60t12erl0k250tiqua2bd87hk4l3c9xvn1qmwqj9y15saklwzpxfanjmwbky3wdhhisssd6t1hfa0prvbx53k4h1jjcmjykbw6ave241l71hj86f7ubwzer0zbddkeqm1vzp45gjooy3s64q79wyxfsyqeom5pgftjd6m9e146xy0lbbsy78xsz6cju5',
                        startAt: '2020-08-03 18:11:45',
                        endAt: '2020-08-03 22:41:52',
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
                        
                        id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0',
                        tenantId: 'fb3abe84-8b28-4426-bbdc-cc202aca33e0',
                        tenantCode: 'xfsj63d3k7jlum96z8dx7w1t6w7xffw739olcwm04sfb1iz78n',
                        systemId: '88c30783-e234-4aca-8d22-1508f0033aec',
                        systemName: 'ic06u6bibnpllbevlned',
                        executionId: 'cf4614ed-748a-4f8f-b59c-2091b234167d',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-03 22:04:49',
                        executionMonitoringStartAt: '2020-08-04 03:48:40',
                        executionMonitoringEndAt: '2020-08-04 10:17:17',
                        status: 'COMPLETED',
                        name: 'qdlh0u9nyml8g5qace46c022ckxvnw6qhen4v7wfplefm8tg2l7780kuyz84bfsryjhmqu4kepbh2qgdkv8vafugob3eci84btyp5j02wk3ixe482rp55q37m9fy3t89fauhs2p00xfubgw7b5e235h7mur31g8jqdhvmhcmt44bf8ls3a2dajr0two50bre266mrx2y6qjbgvhk8rfpcizfb6nzneh7swbm42zeb3368azk5a1cr0fe0rh9pci',
                        returnCode: 3641518377,
                        node: 'viabs0dtnplfkwh3kl7fu961i8vu820fxoeg6itygneahh627effieccbnsjqwo0vd7bbvjqi7b4xh2zgc7n0ue73vh5n2p0m5kqeb87ongdedtpy76h6heufgzkipfxvjvmpv33kjbq3w4gbrxw49e8pdfixu9o',
                        user: 'egk20tu4v0xb99ej7trgmxy71wmp8dnqwp2u1gjcw6rlq5ik6ayfj2ha9d4sqrfxi7hjyqx9lrzm85yo37kh3c930wt19zlbcd8erp8d0n4z4vm75an6hxw0aaoteyvdqbcyfdf7itc9kep2li3uxkqmxej93v9ltfhjw1wie49env6h6y80dwlm0lagp43huict5e9o795nr9j4x6w82rvij26v3vqunfdf1ao9tclxj4jtqi5upbtsqmiplrw',
                        startAt: '2020-08-03 16:52:27',
                        endAt: '2020-08-04 13:08:14',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('4d4604ef-36ec-4231-8ea3-df91fc2646e0');
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
                    id: 'db5a3d50-7b29-4249-a04d-e38ba5d51e51'
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
                    id: '4d4604ef-36ec-4231-8ea3-df91fc2646e0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('4d4604ef-36ec-4231-8ea3-df91fc2646e0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});