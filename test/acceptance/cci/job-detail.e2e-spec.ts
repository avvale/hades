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
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'kq29sk9njcjmvuoaszwye0u3hc6x7zowqfwuna7ia3fp6t4smm',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'iiipksmaqi3zkcyjdi7c',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:17:46',
                executionMonitoringStartAt: '2020-11-04 10:28:13',
                executionMonitoringEndAt: '2020-11-04 11:24:08',
                status: 'ERROR',
                name: 'n8vkm101s5q3g3gtpzjy22i14zxbu6p6k947z07lt2uyh39q7fauxdt42yspfiakmdhu45eqhxpw5swmdtz8lgkz4iit91ccpt9mj42xe89p20vt0kg844ezi56je2u6la8bjp3yy4qch0aiquwj2yfg6lwbbqwcqrnhsceic8lkhw5bi9knsyfj70g74hryongu8ntsbiz5xfrh6ues301c4abawvjl1y85ojbai572ybw650geimapvjhbpz6',
                returnCode: 2054435928,
                node: '5pmq6fecmuk7jdfanmssu002csnzz0vgn5bl7g63olnuj0azurtrzsd1m3kcpvmcv1gfgzmgpmw1zc9450q3pjujbl8we0s5zyf83zeh1ug6ydj2ekp9b9qb4qoutr79teuau3tr539q6yelbex7ofztcy0eas7p',
                user: 'd7uczmwd7hi66p58od4ppfjwgfrfy444rb2m0ndchhsh7k5xtfsqpb6y9fpmwyamq5ixatniwqqrl8lsb5ryh33ikp21l7fcj2t9757fe118n7hvz3wynjsysl3m02wrr5zzmo1hzr1ymhe037seowifms3lhqjyam3qtl2ekyd8zgikszeaf5y22ogte01mvzzxc52yis6hfjzfrmc914k7f838zsfixyaxu6wgjod3n53giveny9km4yc1dux',
                startAt: '2020-11-04 15:22:29',
                endAt: '2020-11-04 01:45:59',
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
                
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'wnkzp7e8gcmf4bnrkego28dz2h20t632b5sslvfr3zl8txdynl',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'hn9hiqcvdgu5nc64mr0e',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 20:57:53',
                executionMonitoringStartAt: '2020-11-03 20:55:48',
                executionMonitoringEndAt: '2020-11-04 07:55:41',
                status: 'ERROR',
                name: 'zy7r0nq2gs4ima8emoz6zssqmhkquv8ayryfe1itl2dbt8gka51v5af8yop51kw09x1l5wg6fp20vpf5877t2ae1walbi24qbo1mva98o5gdpl4qaz5t57t8ejqkxjrux2npdz859gbjev5y583nq9rxelyndc8wd546kgvrkokqf7now8o01i0kbyehtg36pmdvjme8w69ymcsoq5ieg08av3re698empwqtxgzamyjd3n12ggvl43ri8nn96x',
                returnCode: 6119677061,
                node: 'uqhp72omrrzwmo6bnl6s2vtxbfik6olzp2zi4i7m389k07prl9laf2tg9vdqvpjb9lq9hb0bgk25j44mjtwjt2mr71llyzhqtrur7rebno1hwc7alr81arwaw8eb4yhxjlem9x1x9x6e3chrn57wf6pxttnhblzf',
                user: 'e7yzim4pflj3wr1vfc61sp9fgtk4jit3vsyukvdwvo2a4zz7kxmcdy9phivpjirwxpdzjz3x2ehxrkt2jxlu2ptm8x11u8vxele3zz6ukyzfa2zy8xvg93etszf396e54qs7czz6u7no2yx6bbe8fkb18l2xr7y6l4gs3nmuxb28ah37jd597xzcwv5gbtero8lee0042lcvvc75gt3kfz2pmzewr3im68maiwx9nj2bovakd67mfy4boaskx7k',
                startAt: '2020-11-03 16:46:55',
                endAt: '2020-11-04 07:37:59',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: null,
                tenantCode: 'eyxg7da62w2ajoj8qyydh3py6zrld57gemlzr6g6bk4pbhtfla',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: '51i8n6v63gcrntvpcv79',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:53:01',
                executionMonitoringStartAt: '2020-11-04 05:53:53',
                executionMonitoringEndAt: '2020-11-04 16:20:38',
                status: 'COMPLETED',
                name: 'sbq9m7h4urm41vwslwdydok52p7bq2inbqxqh0i030y1c03t93apxgg4ari9e17ed32wbmzvszht8xjxewujssw2kn3y5jj2rhmp9r4aswnynnouvachrun5gshind0o1h2dayg9olej46dkmee10avwgk6ran0ruak4uj8mw3zkc4k2n0axion2a0wfqeprw3u4nd15j16mv33e7nggd9k2m369k1mcthzetiod9nkrpzpa56a4gub52hdxd1a',
                returnCode: 6620560608,
                node: 'qu7osd66kgq6xf1rpdsupxdqhkk685h5xmi9fivkry3oj1cykl8g9cx67fm5l0cucx2qp73ltmcg0ed1lk26itk98ay0zr0n1lfjs9kkf3nuqap39a29524pgia4lrdom79rtpn9hqweosbx0w4l06olwj6lg2ry',
                user: 'wtoaunc1jtmybye96j82tn9eqj04da3ckazodte3apfszkl9t6v27tcavor5rqh5cg545xyp4817wjqfstgde3hb1dpzr9dcwdvnp4291oggfs86mzz9uqfxahiwyu1rb58374p9m5q0440alsrrtf0xkrwv549iirim2as69d0pdfs6kyzg27j97sn1ii7g6j8f1j290447wxvufextpak9f08resvs3xduqjqo5hbr5kbtke6rz73cm264fjd',
                startAt: '2020-11-04 00:45:52',
                endAt: '2020-11-03 18:16:47',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                
                tenantCode: '2phcy6ybz60sodnwnmpnlybdv4vanx657acwhx68i4s1b7sihc',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'c70mpweecopr50qpz6m8',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 18:30:02',
                executionMonitoringStartAt: '2020-11-03 21:18:29',
                executionMonitoringEndAt: '2020-11-04 12:14:34',
                status: 'CANCELLED',
                name: 'fh1uld2iqmwcgb8ztravzajl0slkwqzq83lf5g7kedo27z0pxh4b31nplw2ut6hmklze0aswt3jb4sqr8l1wwbh6vzpy9fh6dtyv94ub5hvkie29rz0r43qtyyangch56hbdw766tcly34eia2lo4hjxj16ykk94jf630c7oktrmjl8k0excjhe6499fwlwm5sj31sceutmxhz42l2bf6tnw8m6yi5qlwrz34gmu00620mhem807cpirl6z7kli',
                returnCode: 5448305787,
                node: '8hx0fpq0f39o2qyoa6wwjbrw18xq16cd0sv6hruck5sfl38m0okd9xlws58c8wiyfgvz5hedu5ux62fqrw9fy9vbza9ju4fhvf60h7ixf417jz7swba0l15iymmsvbt5a6nrekerj8x7spnvnmh3uc25e60ry1p9',
                user: 'n6xre6unibwg6ypyy503x4pdhmm5lm5srksr1d6ljkjpa2d3bsf9i1cfdj5k7tnr6nf9akmrwb4zrt2v5mj4p73q8h2cqb7czlsiiu63m3o9agi7dcao0659i808u02cklkk1156oiso41bnxloa3jtjldjf7cpah28gh7wicopgdw3pgge1l0kiwhwfn9i8achk4alm69ps7q1vovlociwqobi753te43yi1nnq5xk95oxu0e4wwkvm16hkszy',
                startAt: '2020-11-04 10:56:52',
                endAt: '2020-11-03 22:31:57',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: null,
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'eg2dn2ibakptpmk90dqq',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:12:45',
                executionMonitoringStartAt: '2020-11-04 02:39:17',
                executionMonitoringEndAt: '2020-11-04 03:51:17',
                status: 'CANCELLED',
                name: '67ocl56bj8mirb5rld343z3prgeiorrgjgnmiwc5u9rl5y56hik1z09eppuelhynocnkoceideuvrqnie7ye0pw0px0w7lx26dlmnnvj13bcfidentc4u3nv3bo0i4i9x0goqg0d1z3nrga6kzqkudxw8nh4cmyilheyybe1yeedoxlp5f37vidcvnhjrx14mdolypd5ip75ygz2ml390g25898d2paqiah8a1vmbt7e9k2git09gayxnj2jait',
                returnCode: 7307312126,
                node: 'zdxg677hinq36jqwi1gzuzowfklrc1f8bu6e51wow1wsewa6l4jpd1ofkshqy2fgqgcabiklb32f2fqwwvmfs7xvxjaj5hyu19g8sodx2u0zesnwm26ynf5er107hid8ddzdlz0r2ndjqorfhq5csbrrprz31erq',
                user: 'ldkfbglaw30af6r9hyx9rwvs3p6ne0dfukaetm2i4uial0hiks0zbmfwun9iiqis65wfm8vrr9yva0jdzgoua1jzkeb3p7ojcarrlt2ijp7eul372difp0qr5c2efdnzuhxki7anjnq60ffmizkjc8se8lzotzm3l2q5zq42zop792idmise5ykdxzcrdza4r22nh4v5eq4h3sopoce5hfigq366312xxonxpwe7yk7ols280rard7tv0cid6cb',
                startAt: '2020-11-04 12:13:57',
                endAt: '2020-11-04 12:05:10',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'i6svxtpnd71hpuizvcnx',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:36:58',
                executionMonitoringStartAt: '2020-11-04 10:45:47',
                executionMonitoringEndAt: '2020-11-04 12:10:28',
                status: 'CANCELLED',
                name: '7j43tssp4px3ry7b8kslgwvp4qp5wfy843jb34llloyx3ojx8zaif2siien5kx08p4c71re3wdhc90sdg90ls85c3o33lz8j3icsswr3yi3i7hv3t22ato4vk61n8avwurwoeckw63xismvihqke2zrtxf6uua8brpyjglpzvraay2u1et98itaa4vpsywavw027evua26gwupgfr86unu08ecxllqtsdt142adgpvmlfdgeh42hem73tilokkh',
                returnCode: 3830490966,
                node: '9sysnf04pq1oyol0cka9vapnrka2k5b18vw1dbofl412gz8bymykvo9bavovjch1mwda0lydfm6eq2qa78qfspqwhxvtkvkibgpze26g3ummu8yyjjlf7w5tmh5hlh4i6oexrv1byt9f0oeex3p0f9kvauzsqjf4',
                user: '18y536oxx9gf38w4hozydqdflt0fsylkslmo7prsfegtwxdbtcgmup55mrn3ek7e52u5wmodx72iq2peorhgo1hb1elxn11yv518mpde8u6s10a1uwgqq15vk8rzvkgayblw9y91tlx58su0a1i4w8zaouwpat9ji1abgh8vwg5ie5il1gic8j0vynrtxftw1ppj6he6olv1grje7o297hf64hapktr6tr94m794nhngca4hra65y88fwpyj4da',
                startAt: '2020-11-04 04:54:24',
                endAt: '2020-11-04 15:59:20',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'ubosvbayan2zhn04f9nh7bsngfh42e4kkatk86sao6t9r01e2m',
                systemId: null,
                systemName: '6a3j4a1e9eg4eul90lxh',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:01:43',
                executionMonitoringStartAt: '2020-11-03 23:49:09',
                executionMonitoringEndAt: '2020-11-03 23:34:59',
                status: 'ERROR',
                name: '7jlf5c1jd6mg6r36t1cmazekfutomdf8antiorsoggo8mvyeecjpwklqqt9303loch819hi55y6z9mr9g25e4las8gd1x2179jtezaej3qz0j01273dc2f1iqpob47zcyyv4b9t03leqnyycz24jurs4djrosgv406r6sv849gt93vzkoe9qjixpk5mm4h0fz8oky1ej8uf2u2wbnub70br2akqm46qhu5k1p21mrw26kvt3o1bnnvgysc7cttx',
                returnCode: 8322767382,
                node: '8xa1hlwm6ndvm3gqk6refulanr4kucuvugp0bh9ncphri6hgvp4n3azqnxxpzk2qvo2ireu09ssymuc8j68u2ec32gx3hkqkn8p8y0wj41zyyfrrxkutfrw8ns6op4nzm94k495ty8e9fv5g2gyzqvc48qn7g5ee',
                user: 'o66ew67x9jsk1zc588urcpy33krxov8op0aetqitzjs3mb0563rfv2vrhhbsqhqujklajily6wqq4ufvny298829jxhncuahpszmfd54e4gn02gnmh5hof3waprngiv0gug0vti8sulvgy7j4g22cntfvoi3nqgnzlndb14knttjc34q8wzupn3ntnxil59c8l112ripr5j7e225lu8d7i93237wq4ssmesfhiqfi6hzhml9jkyp5yv8yo5nywq',
                startAt: '2020-11-04 12:34:27',
                endAt: '2020-11-04 14:51:11',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'xtx2ya3i90obaq7st09y75heezwsi4mw9pgo8ap1jz0tqpli1r',
                
                systemName: '5dvnccjbiw3dwdbhql76',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 09:03:40',
                executionMonitoringStartAt: '2020-11-03 22:44:34',
                executionMonitoringEndAt: '2020-11-03 20:46:13',
                status: 'ERROR',
                name: 'lzvm36t0pri34wmeglskqomu08l0p2kczr9pvs519xahflo5etzuhmm0ko77v74ena6krxaaiqb4f7xfmzhq5jyys5ny3j1iwmmoq28huzy0vksf9jf2uy7ut901wd1ix9wfb6g5p5zyhk1zc5m9r22q2jni754bebndn85xnspovq7gjjzk8gjv18zfbem7yru0i6lehlegojjhkxiyfwxqen5n9mr2qb8a39kjzf52m7ui1nd28brskfj4cgw',
                returnCode: 8827395404,
                node: 'idd354u5v5uyvu1z2x2wckn54qwmkfk2zgzismfj37vft9qig8tfrjuash0q9c5sbxtokt3sbzy28lyzuuz6l9japeajqzi9eypawtl2uxu6i2pvlovxgo7w1h1kkk5n00uiexw7n83t5klbgj60mpal2fang4jg',
                user: 'xu08rsx7snxfk5odwhamkg0yfrumyucnimt13shqkcmjdfc4zpocf0d67tidqcsr3d1r3y48l0dr61atgznr1hu1p8ym3xkk8pmaq0ahgak2uwiwiusqfb9n0yq79lj8a9by2uowpm4i6z3xadjp7zjbjftv5oaicwasiwnv0dxlqgkkw6g40nwsvlh5q11p6nrt3o72orlnzcgf20u69ea5tq7hlnbmb15pin40yh0y6mmlx0tdmhmscivmw8o',
                startAt: '2020-11-04 02:59:43',
                endAt: '2020-11-04 14:42:52',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: '19euxv4gguzfewnp6josef4f97szhj4iqm10wukyu04opvqvr4',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: null,
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:20:51',
                executionMonitoringStartAt: '2020-11-04 00:22:56',
                executionMonitoringEndAt: '2020-11-04 06:59:33',
                status: 'COMPLETED',
                name: 'gsfg5fns39f59fxk0rrw6orh8xdyesfva70h0c7xtxha2j155yhd0quzzfgil4eyfipyqwiwyt1np796fig4gevq731ihfnclr3981u9mxovr59gd43ym4ix9zo16sh1oogqctqcpxabza5sx0k9yuhb490bj38m4i2mbys822jtfufqlj5lmzuul5cqlc41biqvza2cs5499rq4umzjuahp9iel1gwppxo9w1e2reyqbdvz0406gs2nm8tjteq',
                returnCode: 5578893007,
                node: 'v9bibg550yjm2fz6cjf6y1y0d4st0q501gblorx1j1ea5f9gano2t9wjhp37n2gksf07fuh5p7feyifvnzlwe9mdbnlwmidbuhw4ayyus0bg0lms2pf285sjj1dp3bzcor5cl65gzrvup693ms14kwn3020nrhjx',
                user: 's5kvoxq30xxh17j4d377nr6fsstmos71cu7m4gjnyw534ozott9abpdcwd66ysc5ln6i1s0r40uu1wv1neipyza643yzlfpvzsdebxz97w6iw56fom01cwquop1xslhifbl1ikpu381gkkyjn9bqz66msw5w0edshdr8wu03ob0hclmme1i27bmsspfyx7es8rmfvqjumta01h1y042u5d8wa50bjcveelppe45ypkijryeo82obv4fbij7krxh',
                startAt: '2020-11-03 20:58:32',
                endAt: '2020-11-04 15:43:12',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'qmotkppdcgxq4qoqbqlqyn0d73726lk0b92rmimimzzer7wqfi',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 18:21:39',
                executionMonitoringStartAt: '2020-11-04 05:58:57',
                executionMonitoringEndAt: '2020-11-04 03:05:04',
                status: 'COMPLETED',
                name: '5gc1fsnhtt6heu8gz7h14972k09tkep0htizpd60khhqd1inlnfiybgh654xcmbmi6w6y60uj0qn00in7fhyptyoqxb80s8omo42j3f9zt9ascwtscns1t1w7nprnjzotv6cpc2q34f0lhhuxk374qmrryri46nmt72xjfge4prx9cm3zclgrbvjgd9kng58l84i8f6qjzo8aktsqle9dbh65lnc0u16a9hh70wap9sfhwovi3l6ytk9t214o9s',
                returnCode: 3787266168,
                node: 'ntl08nyqxma9adw04wfizc8s2a0hw1ar3l8sq6a40a4j61sn97vxcpqk8ojd86vsac1h45evaj778ijwjbdfovesiwmxq91d2cnwssc39elug5r2ysvf6f3rf4w80um1p5lkrn7op999l1bwf3qy3cq7aesajex8',
                user: '0td26tyek5te855f9w9m5adz8s6pzlhdalpn3ooz6jf5uo4douxetkgkd7q0ot108e78yixuxxhqouikon57q4f1jjg2mdofed6td8kkbllznbyjhlw8hlq5y0xgxmawgjv8qefjy5nl55e423d3a5hid20upmw0bzc716j7wlqqakgzqj0gixkk2ri09ev6rfsb3zre3t2xrjktdnnylpl22iize1d0gmxl1nxc1xkvd330lkayrik5sb1be45',
                startAt: '2020-11-04 00:36:05',
                endAt: '2020-11-03 21:48:00',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: '5vfo4oiu5jf597uzacccqwoz3fn3gfpnq1k6gnplwat8e233wr',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'fac1c2pkyaqq935xantp',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:19:39',
                executionMonitoringStartAt: '2020-11-03 20:06:34',
                executionMonitoringEndAt: '2020-11-04 00:33:38',
                status: 'COMPLETED',
                name: 'gbjcoaq9rpiz4jwveo7j4a4c75zfuwpedy9j2r03327phwbdk2q6xg3d9fk1k43lys0i9c9skf1z6sgalikjbbi0c0k3t7coz6yvimq0l83k4w31dm7kk2060tg9n4ztjkp7l7uosdc93td38icbx983cm69ntuuxov4foeflt2ozk3qe0gqlwjty3l4bwwdiktb1dmvuqqtxhad344d6j79n0gp84dzjaeg6cykl4avdhvsngesyk051eufoby',
                returnCode: 4517353111,
                node: 'xgib9mq70j2zj0fzgzyt0i3vjth7nk3b038tkuj2fvjjgpl8jwo0azimc0t3ao77yxsyd6w42n9dikc6mhje11tz1l97ph4ze3yq2xbvuyvmq3d36l9j2nu01mzp7ewv1bj9v5ny0hqy3k5ggospqac73jdwipez',
                user: 'mwxq4gvj1ueze42tmjkvt7e0s0jdlw0993nhkzpf5r0j8llcrrhap84rtkgd31gpxmqbc6ujecbm9kjt3sfr775rftxjylcw32gcxhohxcniqi8gzq1v8ay2sis12szergl6w4qz0crzj0w1ejhpd34g2xhendnb92rpgmvgvxs9pycxb7huqcvxwqtoyiuip3y8j9arrf1exi8mq9w2umb3cq7hve4673dzqfawmv59r0ibii1858pyc1b07vr',
                startAt: '2020-11-03 18:46:38',
                endAt: '2020-11-04 07:01:51',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'avijkfxe06n70l2h4c1pw41es6v4gwqp214ze4mz3jh7m6fhft',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'bhtjhwedaonrppd2wf42',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:55:12',
                executionMonitoringStartAt: '2020-11-04 00:42:35',
                executionMonitoringEndAt: '2020-11-04 04:47:27',
                status: 'ERROR',
                name: 'zb1u791grqygeet9bc1rqozehqmah31r33vo05lqxjep4dlmtneh50xgrfxjzywjjv98h6sulmz6jggmw6xlw4fkc4kd4al8an0ucx5pzlixg4b7ib3qqjpd8qwu9kdv495umw4ijdz7ziaant52u604ppynnnbey3hb6x18upnwyqin2rwnaoivfsoxlux6z21mtbtkho2h0c9uighdepd3qil2zuhfmcetktg95kyiyytb55j0hq6axnodu8i',
                returnCode: 1415869655,
                node: '44m5lk6ca5dfp56ioc2pabyswgp9mfd4vlbbzyj7x92rij0v78co0e7ab7ml5l9ucxqatwbhrg48xfnfk9d5flt17v49rn2ps3srawh0dyqw89rblhs2fzpvuz6j3e1z42wsoylou9gyfbl0u6mvfvg5ti672wvk',
                user: 'mvwv25lcdfxmimmineqksc73b9ebqqmv7aoteb8ae8rww3fszoquf1ge8cx6bee0pfe4xjtzje58ecwjuxhmp1s4lu9f4io1978mh62o5xswizc4wfvxgzn0dbnhyse92rxxbhv0cxwx0ymnlkt7qe6bty5ykoq5c7371ciy7n2lb0iu26fbyefdyhrsavis4ugrfqo7mupj3a2l5dfcni446fipjt6jxe07245juut16tc9uycyv0kcm0kepf7',
                startAt: '2020-11-04 12:22:27',
                endAt: '2020-11-04 08:17:03',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'c04v9oy77aeh48s3nrr9opthiyqz06z82wodhpwie0rwyp0uwx',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'z9e9g3uzk0jyubxw4miz',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: null,
                executionExecutedAt: '2020-11-04 00:34:26',
                executionMonitoringStartAt: '2020-11-04 05:49:23',
                executionMonitoringEndAt: '2020-11-03 21:22:09',
                status: 'ERROR',
                name: 'z7xhr9bnq2ywaopskc80g6wnjqoth53r8d2ya0o0j07bwy4uwv8mt7agvijsqp8cz71wysfojnny2z44ftgxi5ccn17lwlduva3zxzdefrumjcfih2ckadbau0owrtu2nqdlof65sfycstio3vla0vbhorq1lhu53f4kc0vfjp6h32ghnn5vyioc726s2t0l1pyf3mxqmfzav1svjguqm5xpkd33idlujf1dl795ca1bp2za7nzn32kmfpn6cxa',
                returnCode: 9388932421,
                node: 'mlz102zruarw58o0g2f4scwjhb8miazv6fb2bp97kqww3uiqfel42ixyxuopbpgfq1irbtm589wwjf10kn9954g9vt0og08zoqbfsxav7r3w2xtrewy1h6qz88s36z93hu8qghauajoidrodkzxc1ksyoqctrgx6',
                user: 'd9j7upg6wpjj34jfizaswsdjagxajr48qyimiajf3w3u3qrnu4n7s3zpg1hc04zf3aqspdih8eulztgqx57lz2kdj751c444h46fz53f00ykq3d6nektsdlw3odog1s8omulhmu8vl48wypq473db1sn0rzfnfgxed7yjr9qq84rux54cp2romirxgc34rhirl7dnx2nlw753ydns04sdmcl0f7014kkxljwgrhcmli0ctcs1a0kr0gawvhei36',
                startAt: '2020-11-04 11:15:50',
                endAt: '2020-11-04 02:26:18',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'wmuz2usfltjrlvnkomg42lg50lzk8wlc5taf4et3yb0fqw2smb',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'bi2516p03nureokmq4rd',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                
                executionExecutedAt: '2020-11-03 23:15:36',
                executionMonitoringStartAt: '2020-11-04 10:27:48',
                executionMonitoringEndAt: '2020-11-04 04:36:29',
                status: 'ERROR',
                name: 'f1xqeuxhyb61ushcuii4e4eeetk593xfs344xuod68jx5whwap5v2jlzom0cxunyt91xea18formctxclsm9dhuazwdzas9hxrva4lt3lm5wgjcpy2q62q0334y13ijyo36zvrg7jpwd9kxizuy5j3nmtjfgfld2qw1qid9vrw1pra1e8r3esoa1rhn1p6kzx2r71sg1ki1647emakl0fjdv5e3j6nmlm81blwq4rpipg36svoz60yg99942n91',
                returnCode: 4045401798,
                node: 'a661rj623l5ayol0c21htx6b6n3edgvlbmavpc8jjwy2sfliuanryp5ef814491jndvuklz22zc1nkzroqkckys2cpljvez0yjt8qsmlqls6bonlqv93m6eagyyrw6a1dudkwjkl2v7pr1sa29a5fft8i88k12h4',
                user: 'f7k2usac6wob0z4hzb3k81pn6hz27f2a0y8k5ks1aqiow7urplo9ngn45t82b5a78iaqqxgms7v2e7buwim7dm7e4bqpmaz01vybdflg5b2b2zxebi56c6w5zyhwebu77wb50jyriobj5xbb3jfwb43j0ybku865iut2gl6n0eqqwb68abnu916w6gkr1r87s7o7js5aq6fgo0ir2txo8co0j19pz32vpxnqimj1yxm5zwuavy2v78snppj4hss',
                startAt: '2020-11-04 00:02:38',
                endAt: '2020-11-03 23:31:31',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'po295b3g6didrfie0944pwysj87f1x12coj5hpeb1bb3sg0hun',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'a9nyg8hzepkenvxrba33',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-03 23:22:35',
                executionMonitoringEndAt: '2020-11-04 07:19:10',
                status: 'COMPLETED',
                name: 'lgllvu30i47d1sfz6b70cfq6d7vmsqmige9rf4hw2gbkycawimic6tce9clgqe4gxdu2higlmh7269v1amer4mu3gaip6f5kocsqcz6eorbyhqvckycr1buer0303nfbfflfpphoq8cgl1bz77mloinwi03x5yq5t3n5moyvkhmi2jgn0c82mn9ta99ugl9qndv65k1tfstx7vahupg5i05w6ntfo2gnab5uzykdwz0higzbll12pvqbybeb2mo',
                returnCode: 6236309793,
                node: 'dj6q32uun9vwoqca1q4i5gg7kx4ydfpg96nzi5u6y10v1ibr2wthsl4aoit43v4s8fygpbhw7c6vevc3xj8cun8bjxp49vjrg1sebd6rx5u8u4y3q1uocsygwdyw56e9yuarr55n94al6gex5f9bjnlmuaw2amzw',
                user: 'aodg2c5o8vygefzareokmo67ilicd7xrst30g7ecj1htvjn7u54x15k817t3fso5iqe9azzeegvj4ll78usarxphgrorecyjf3zrvd4w18zn9etulkvmf8gotdpdvk76hy33h8rm0g0swshkabk4fn8f8bkv31l6abpn5saean3zvihc98v1z9xtgisdrpa6nscyq8fjuxmet0auc0qgktzrmmmr27cqr676wq3qcydgw6es2x1cls4lkbcefzm',
                startAt: '2020-11-03 21:53:03',
                endAt: '2020-11-04 06:03:09',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: '5bppg796o1p1m3l8qxd6l56nipp6zv2yjmz6f28bi4piy8owp0',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'ty0xpsaiyxzrdqkzs9u1',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-11-04 03:37:41',
                executionMonitoringEndAt: '2020-11-03 22:45:51',
                status: 'CANCELLED',
                name: 'fl777l2zhvsk269d1ri2pu87475cpnvsqwklw8mricugx0f5kw46wv4oea0p0gzao96amkhp5bsj4s6dev6cpi0n7b25wdwaof1lksoh1tp8a0k2c3hlzuapq277ob3w7ckay4wks74hnjrxvwt9qtz9rv86rob1vn7idnysylrxvx7edmx8aiixi9q68qs4b2yot8mgbboox1a97wh9w52vwe8qi3f8zyw387l64fz2v6vwat2pgdowqf8zr1x',
                returnCode: 8543029493,
                node: 'noxbub7uhzptgclv5ib0f4knpqhz41g9raovrtya0qkrk4uckffzpwv99ks6ofmltq3yxlr53f1az6kwn0lrm0hbewrxmyne8r5m809s4h9whmgtqs4ff33ahwridsaeb9sgwgudo9t8bimgzrjjed85yrwwnycu',
                user: 's6b0w5ij779frl8x09h89ry8jenmq6boaboms44wp3byput5zrsi3c2n7eaqbeob7hm6uc0jhyc7skt5nsa6ev8cdszflpiozevdu4c8o2dedmktrkap697iw7dzpvr33jt1gatf18dnewlkbvwdg74wy5stblsrwhx7zu6o6y7xbmee5yag3y0rv0wjxnqn9pchxyf8dx7b8tllbh7763u1bm6p0k155ciqlxmpwsy27nl38272p0zemrunanp',
                startAt: '2020-11-03 21:45:39',
                endAt: '2020-11-04 06:45:09',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'o6sv6jh6fe2mg2hjgg1wshoyxcna3w2hlrqwu5pyz9a1ws7b7x',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'jncmcvac0s19hy91is77',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 17:30:27',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-03 19:17:55',
                status: 'CANCELLED',
                name: 'tues5u9xs1rii0je1lr5qq95lxcdr4pu8nciw9e0jx8e7az9wmeu5y9v1p4irx1vcx9ihymf4vlxkcpfzhwxciwp10puhbv75l5b0l83rfi9sfrqaacwtbjjdwcgdec5ibzk6jv742zhyrqxnj1qidbi8gnbb6xh7561j3lf51gbw3qogfiz73we6i95mcoc3n22auagm5dnoj6cz363m3edb8bawhqqq5od8uyne5c78sra6irdgbdzhx2rig8',
                returnCode: 4774111022,
                node: '8jm9irky1j7vua5ij1lziv9cgend4irl8pl5er4z8fdx3nyr2w31cod6r5s91uvsjqs6hsdymmb0eekcybuaqf2gydel7jec2b42ubzs5fgh8uypzbzn7otol2f58wfpu4jbfbo2ikxpntbhjk01qla403ywg4og',
                user: 'k6b9ppxsvqx0xqz46pqk4hf5g7txn66lqr1v0i4n0p0ixl3u6s756206spc3o94n4ksib87wxi5lwwdy7np3gzpeswx4p32nkettxol4pdxdyw8m3mb0sod18f66nzsaxzn12sc5wum2wrb420hu6v8jtn7lhptn9et25x55ox439ts7d3obnb5j0gsgbt677jw2k37zn6bki7vof5k1v5rfj7wr7djtojzpbazpnnxf9pvnkvqgcve06t0lhst',
                startAt: '2020-11-04 12:50:46',
                endAt: '2020-11-03 21:45:29',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'ux3tofqjuquebz8za1l4csrvc9mp8d5kiy9onk4u07f0l5ejz6',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'lyko5qdcy8zcnfdz3kx0',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:30:45',
                
                executionMonitoringEndAt: '2020-11-04 04:59:19',
                status: 'COMPLETED',
                name: 'd38bq5xthh26a28un6p0hwzs8c6atomhis89hkalrua7nmeix9ztyzgsd5plgtfo4jqnieft0lbsmrp4ag8imoois1g3yhlqw7cjcdkir5rylczvoo7ftk4yvi4rpnv7ix9xq4lxudugdzc4imkkg0qg80hkax9iyq4lvqa5ic9q6j9l4lzhpfx1s1o928whdzw9lk8d71bxn8mnm3al4f6c124swj02ow8ml2w57zmuyzfwk1x3olwyiazq1ch',
                returnCode: 3229156689,
                node: '25gs7qvrfzia4emcsch35wqf2k3kbcw88jh2vveocrj4n1nbrpk33tkkqgizrwfprpoukmgtugmta3x87nlguefg2kmzyjnhk73yx4kew8ftgyq91ejsav2apx3yb1iynekzji25ku3kdqmorcvtdzeonhwcv0yr',
                user: '78gd4x6t2gy67iidm86bjppw5k6q7829jmqi6use87oprlrbwvfoio3splfya9p442pt7loji8cmj8x2mriitqttyay18100v61ctvgzrvznjyo3rfefhxfi32qprfdorfmua71v3glb0f02dpf40jyr9h9zsuy4to1j68m38aw7p49e4cvtrk4f5ow11o1kz3eg5p2yjaqzjka25lus2wkoiuzikbkg0zjrsf2zn8sde3thjv0ragqyhnx80gd',
                startAt: '2020-11-03 23:35:28',
                endAt: '2020-11-03 21:08:49',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'evxg1cj3bz4anh1dc58t58zk1c8povuyxsr3cm5v18rij70qjf',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'd6ls99s4575zub3s940t',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:51:06',
                executionMonitoringStartAt: '2020-11-03 21:49:41',
                executionMonitoringEndAt: null,
                status: 'ERROR',
                name: 'fvs9gex3zv8q7o4x50y7dtvnypk98fbil4hwk9kx860xtsqtdjpk4motkxl8ase9i916t5nyrwa3mqm7t8bxl4olqams13j5zur7b74vbqfo4ec6johh108zky1n8jt8mqfpmfa6borfb318fx8k66uowu9hlxnvkm43mio7g0fymdgpafl6khkg4whdqwertyhbornwu3yrornrf61jfv9wx4agdp545fjx6wztbqkadjgjyc2cfy02epw48pn',
                returnCode: 5992752788,
                node: '75gemgp90pqq54alap420og8ksejhldrevnym86p5mwurjrnunft52mk6p6zitf0o644na63gzcptlldqspohlhsggs37w6pki0k2vjb8lxk47of95ierlzpy830qxdmv7lbdda0vawa336r122c1wruww962ds9',
                user: 'vl9rionqzzz07qr0g3qmgjtts33d41vuihmu112zn61a0ue83ywaozhkvinu2mwuiwyj3adrht2fr25ej9hwhunqt9rsut7alhghteozom6i1ocn2mmdag80zufxyqlvn9b06uy1hpy8990x0mrqnq6qb0ygr9vgbxc11qlpme1mznluvnwh0mumyn479f8nufigfwkj4t4mlrqkdx550j30beqk58c6ewfsv8imll8hmszm8el45tvxo0j1gr1',
                startAt: '2020-11-04 05:38:40',
                endAt: '2020-11-04 14:21:47',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'vggzd5om1ye2gvbccz0fj4e7b5ysfr2f3og7c0hqwtn3tdbmzu',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: '8jahrx6dgaw9cen6ej0z',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:34:09',
                executionMonitoringStartAt: '2020-11-04 15:24:44',
                
                status: 'COMPLETED',
                name: 'kwqe53a9xmo6i5nuvd55sebkt4voogpotyjpqfz5i3t11morivyt4vmgouj5fyd8t04jp93ap3xr9i0ykizhv9k9wl1y0j20z6d8lqvi3hedery0p3o8bqyeuoj0zqdn1xrsypdkalwaoodjflmz8v9r87o7ttq6ti1f8vdfzw5jxm9ct0n01rdfysgjgglewzpalmmpm5nivx5zd7wvrjetp42zea36cz4zezv01221szocnu9vbz4ba80h698',
                returnCode: 6405334199,
                node: 'jlj93xnqa81kknnl7ubbnzg9tb8zpjyv2xlos1vxojbecslppragysgws4fld7ugu3xp0acre1h5wds1dkulan25t0g6htubbfy6vs30ar9x5kknh84ljas87wh3mr74ihygw7mhhx30sus8wlrrn2o3icblqx7p',
                user: 'iyha805a9hghttcxq4pny8wmtpwh4u8plpquav2qy05zyxomdw8bf26ill6xxtqvkhoqjwe7jweykt969p2j8q49yedbr94oammnshcs96ymi9ur8nz3ih475wytzbq3tj266807kix2powihw5uu9jf6nh6hp7fsgzp8ezio79ug6jyxjyoyk0j8yn77mqkqo2oc5i8rawo6qm4xz92r0gg7mhstghv6d2aqtos3df7w5ghvavibplkh8rga54',
                startAt: '2020-11-04 04:33:51',
                endAt: '2020-11-04 12:46:30',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'za8envbaltacwrdwmkfnc2tkxlc9m7zarj22hu9gt9a6io4rgb',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'v50ll511905gq88y5en1',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 18:53:56',
                executionMonitoringStartAt: '2020-11-04 03:15:03',
                executionMonitoringEndAt: '2020-11-04 07:48:38',
                status: null,
                name: '4txesllmprrg5gxa4lvbvxt7pp4igk7dy8kako3rzmc6awe9zxbe2el0aqpbf583co30rv49fuyki3wmniey8ma2aqk5s161410ade1ivk263qikp1wyk03fxfdrq00iw9lzjrpvjooj59paxp8m1mu66gmhjpmzn9pscmqoh5ya68y211gqiy8mzauxf6x4blvegb0u6wcagwar2ba3b6az33hcqiqo9x4g92uhtmnd7tda567oskkyki64e33',
                returnCode: 9684417418,
                node: 'td7hlckpson3tqf1ko79idqlmf4t25pv0ywtcv6a9w0cvmn4sw4x0b4f8itrkmcdzbllm4e17el0qhz2ry528mrwavl9kanvp93ugcns7flf21jhqjjritotd10ysvn01a1wuythr96hhewzeq1oucbbvi7czavz',
                user: '2m61y2zz1het68rg5sb4t99tp9i7ovh8h4yhngktmr6dxc5258y07z64cfpgg0g8lh1mqwwkinyp7tpdwrko9e350hxv0j8jz99daojjtkhmndxqakvydzwp675n75i74wbdd2cr7isys1kiekdu58nvg6ahzxuxe92cu88svsi0hj9ovle1exs2ug0kr508ixgfoiuvlr35stzaaj7wbrpiwbdogysnnqlaxhx0z1nlz9g08u25vecflsderei',
                startAt: '2020-11-04 12:53:40',
                endAt: '2020-11-04 05:00:54',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'oi6t3soyi7ua2ysi88ay8tyz28x8j1t3qq3z39rtl1ei5adbn4',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: '1bdv1etzerlvzscrizzl',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 17:45:01',
                executionMonitoringStartAt: '2020-11-04 04:39:24',
                executionMonitoringEndAt: '2020-11-04 03:23:36',
                
                name: 'kxrhg6f2on4s87gea146lwdbw8hf3x30k1lj0iibcekp6ffm3z0hw3iw7xyiivexbzlrnfg07hvj1ifydlpofdk21rn0z2qzqmopjm8bp75p16v6vfjdw5ha8q86rw9b99sm5l5q6fbssqu6lh296m0rldbaf8wf67gt42j8l81zjf01tm5yw6iwyh1kiap15n5b95xy25ysejpv8mme04reois9kd5cb0rscu2qccr4fghp8lq5tpw9xw9ndgo',
                returnCode: 9494115864,
                node: 'rfgokhmyednmtoscangijcbr1s6b8p0c93vle3hrm3dd6th7jkc6wrppkho4wbrzjn3vse1x38pt40q6nbhutlzpzydwb40frnpugwe8snwd34d8lgavr686l9ldlir72uacfidu5o2k0z9y9jby7onip5qi6lrm',
                user: '5uskkmfxt7q6ifxjcuvvkyanqhlfocebnw3zfgh58v89n3fk0851na1z8g7ee1l3hx30xf5c2932kiu6wkpgz98cnv8eli1ukipjkyp7yovesbrabgywwcvofqira26vlv5vbzjsi6e1bq9d26zzd4y4im9ttkcvmnak2bniofj90du5rag02gz7zju8suxln9b0aywh559h7g07uhkrqj1bvnszpcmt95ice6d63i5kdiuaam31a6wtiukptyn',
                startAt: '2020-11-03 21:58:57',
                endAt: '2020-11-03 20:03:49',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'jm1df47bvecmziha3epfqzfbdvpx319eu5aoxd79xqk2s8dlut',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'klma8fqyc3w6puuq2nvi',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:45:45',
                executionMonitoringStartAt: '2020-11-04 04:33:37',
                executionMonitoringEndAt: '2020-11-04 08:35:08',
                status: 'CANCELLED',
                name: 'ku20eo9lrykn3gpl19fpmmh64f729cqapi8r9lst57k28cquap194kqbbd476dno9vrg7knyuwa9fxrst73azaa162lblxbdqr436qg8vh0k7oju3wu454n5h3h4pmz7doxrzczoxv4vn392uvyw85woha61hpbuy2ktochsgetytmvrj9x8wsxthovj2wj0f78uznpineseg5kor40pnsey45hvrf1becu63weqscz09gwak493j8le0yx48x0',
                returnCode: 5404636256,
                node: 'qm3p2mkrt4ig30cqwagtj8j7ghi7zaz2ihomeegltpvl7uneixallg0ggob87xgo9nrgh5bhj10ujdvuo2eeubwp4r9f0rjq68wgfmvhcfmfe85y5zl3wugxkx9d5gf6s6ory02b6bvj0d9jfxbueibk0s51auvb',
                user: 'ruetnyg3w81041jugx3iokz42yq2yppajd4go9c8zcq4ynvait802d6300qaa4j5xzenj6ytwew03ak7umtsris2xfx3ldsl1fi8s33bjrrlvftcbx2shygon93xm03bbc6bfkgrfbap3t9hw91v5jwifp9vuzh9u6o742xrzlvmhhf912z2n2oy5blz31x25ek8nnr6xr6t11syisj1vtyk2hsni63u5a40esj9it1d1t8f7u8m9h216ju0bey',
                startAt: null,
                endAt: '2020-11-04 00:40:35',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'hrmszr0gvijn8fq9kze7j6iuvnz0hmpucx4t4jqhjghngfsm96',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'knmjys2t139d0k5tw26g',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 23:51:20',
                executionMonitoringStartAt: '2020-11-04 12:29:31',
                executionMonitoringEndAt: '2020-11-04 04:10:55',
                status: 'CANCELLED',
                name: 'v1k8kpgjntjg1nkgmspdss4stj5t2f8p5q7j3ggdxq5rmj9kcmksnbdxcs77nobezj3k95f0eu457jl3onf2iddtu3ufh999fry8ucdjva8q5zz8d8d22ifwzpbhjuiskzdykr7jnwejb22a77nznhkgc1aya7s3gk81503xefcnqg5kz84iudk3g5kicaejhbaclp9lgm7m35pgceobq93s17bsfd6f8m0vgmdg903hz39xloktzbnp43h7y1u',
                returnCode: 5924518232,
                node: 'laerp2trbjo9uzsi0rcpli125p9fez757tnsyrr8oyzyq6hc9cc2nrt72j0tdxp6vd67qnhyzccxrkm0kdy52d7pgpsn6mww33pf8ebd7bi9sd09aalcsftr1nsnfz4d12xoqpq48rty1p7kgi9dk29ir9frj7fd',
                user: 'tu2syed9w9szpm8ezbkac9iryn8tbp3xteeijt62in6cixf9djbra4tw350cxkzcw6qypwsla97ri5eoywh5ht44bvy27qrc4ouvih2457z1pjjh0q8l3xnybst5pq42w0uclk3zlsju8ngugbd4yn86u58aud3gx0j70v7vl4glmfevbffu69fhn88nhr4lsw2n3e4zz2xewu13hojes6rot03b4tjx3d4yjmxtmh5xz56fyhlykdn7hsq9j5d',
                
                endAt: '2020-11-03 16:59:19',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: '5vw5fvmej5no7i5u3ydkbn25da8r8kmwd114eb1r4ib8esoibo',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'rcrtswt20stu62q3psyo',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 02:29:24',
                executionMonitoringStartAt: '2020-11-03 21:14:49',
                executionMonitoringEndAt: '2020-11-03 23:39:39',
                status: 'ERROR',
                name: 'vcr2z0ker3uk6bsygi21tju79u7ixshq14i2okt9qtmmma6aenmgzbpbmejqmyzus9r6tb0c7qacvn34lspcjn0d2iv1yld5z6abnozuxn64j0xespbvdrrt60p3kb1ethhz4i6ujhsxnx2slbpd8idv1vgko8nwe0od8e7z6jzd0twvuu7q0q1o28l8rymxe7qk2b4tu3h5cei1tti02211vfob4upxv8798ceaft3o84gwpwa0fd6b5xei1nz',
                returnCode: 9930259637,
                node: 'o03tze66w3znc0wu16ujthzbi86pxxny00zvemtnfvm78zo8wwageygttpg705evmvj2hpcdpn7hruzvfplhpkwffqm8rt23f54egujdmppmvv66xgzuh2oms1z2u1dtj5f2498y2u90yja9q2a2q8cw6vl6s3oe',
                user: 'qa8jclnaach143q116u8qxsucomnkh8593qeg4qvnfv814ohwro67jx21pmvdqtifzxrt5l5m48w8xa968e84kqytocdtwh9t1ed18mgh601a7nd4hgnd044r5nk3ee13417wds188xcvb6p2b0icm93ejvqzu7eib3uamdkdivi0a1tqg7bqxttc5e5fdgo1pivh1s03h66y70rn2t4rfrtlyhm4ei5ils8u3endt2eopehsb341bicskq5kea',
                startAt: '2020-11-04 04:22:21',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'qi66sshastoy9mi8tufkl4enll2zyckx4zjmoir75wiugjatdf',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: '5kvx422j17j48tmtqmyd',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:40:56',
                executionMonitoringStartAt: '2020-11-03 18:09:53',
                executionMonitoringEndAt: '2020-11-03 23:39:35',
                status: 'CANCELLED',
                name: 'urd9jy8fnvouxsqs8kn3tjvijcad7626y1jgmz1thnz6vuf80zx1imvcurfoszsrsqzrryh6f1h5khuyy26lrof2rkpt2gpp5w8jyd3dpsj68iplw725suu5wwo4x15os364d3fh7dk6glg9bpojybd7eviu5mpqkxcpyxvzhhke36il3auzc7ji254qyfjl62se7qyb90r7f6kqh9oysvjrg8trd10uavu9unsdemqiy4r3muz74t1hu2mq7f1',
                returnCode: 8936974114,
                node: 'lxroaqc7e9fyrdejx9rxi03xhf1dqqtq9o96w3qtfif1cr6wwgpo0135m608mrqvlf6lr43iycgzb8zaqzkoojh28gpqsgmkpk6ry1kt04x4ik33l5jgeh1bkyz55jgke0lj0hnr5f0gm9y0cqtrezw9p4z0jmd9',
                user: 'lgv9dg69vmn5ozxejy1uryvaw99t9uawbgfozh4j3v7751sruy6v87u89f79jn1xl98m1kfwo3fmwl5nc36udn133zg8t56f86gzlk1sclvhsdwibflkaxfhjoyzq1sl2hwypk4itnfhsikm20cusevci9y3ljf7dl49wme4t3frtt4iw7ty7ae1xj6zxyzjhwxeytkooqcp7ugoaeb1z7hpi6w2ar56tjiszzxx5zhbe71gt9bo9b12272r4um',
                startAt: '2020-11-04 11:12:39',
                
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
                id: '8ivtv2cckswid2bz4m3m7ufack265lodezwm8',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'aie25sw2x971gg1bl2y46tgsd18y0m9vsvmrfvekxo8pbb5vgq',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'hko3r16itldj2zbwmmuo',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:43:31',
                executionMonitoringStartAt: '2020-11-04 03:42:01',
                executionMonitoringEndAt: '2020-11-03 21:55:18',
                status: 'ERROR',
                name: 'ax4okjf61q41u3r3enrrjb2ypfi68wfuqx9ywl5a0def0xr7q0hfj8omhxn9fkx23ojnpxbwsmspdpcmpb5mgtzszf8yckw2oxpaj9kmf30rufte0vrya54n3cegrgyh71s9q2jcjg03p2mmwt0jj58xnkwasq4owumsot0afe9ea957n2tg6kmqixzlke4whw88a2p1mn41iwztxjzu9xtpq8t9ue04ew7lcef8ja5ocddze50bgsq5aqsi97l',
                returnCode: 4354193357,
                node: 'blb9vy5lr9r2yqk9lavmt2g80cts15grtc1jh8kv6b3k72i9hc58sfhl16fqr7p8z9s6o3olcfr3b0irprghsicewg7pi3vxuk8kpih1s1t0kuh8q63qcul7pntkq5cjrojwti5ceey9miwrva60f7zvolzfs697',
                user: 'fpxhz2i6mn2xf4n8i03meo4lg71q2vyyksuxvmh06i9h5kk9viw47wpw8bp8iufcodtugqjkyedpkf23mjstuf65toduxcmkn727fnpdtxysr3a92vhiohh1rwjaxxv9hot76hec4krd28f289q03kyfhqrarbi2exw5uv9cslkjla9nzj1qvx2rvc25jalfpbrmc3tyhh97kfl2e3b3fus1scnrthrqnm765rtt10oue2qq10vec5tb8z8vpw2',
                startAt: '2020-11-03 22:10:00',
                endAt: '2020-11-04 15:40:21',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: 'd5ifvwrdtsrd91ynnkipp6kemxyyhm42rgxcv',
                tenantCode: 'a77m3qw4v1nn0bffmuzh5xyc0kfhze6aoji6hroyybcc45mnzz',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: '563f6k0gyp3uk6hqcino',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 17:44:55',
                executionMonitoringStartAt: '2020-11-04 01:06:49',
                executionMonitoringEndAt: '2020-11-04 01:02:42',
                status: 'ERROR',
                name: 'qgjh3cvruk75zlz8z8b4zexxiuhg4tha2aee89eofvpth058nbch099c8mvdhunvuibopqk2bodl9pr3tfoljcuthk7a2bo2ujcduvxwxeyy5gwegra1m4lvs54yx9r20oy4o4q8wywmg5wd93naxea17b86ipx6vhb279zxn9ze51n16oigqhj5i4kpiozojcih7hfwtvbyee8hfle1cq7fmyvpv8ubzm1mj3dq6znw6z69y1lbf9yyxn8nglh',
                returnCode: 4533526936,
                node: 'th87laqwh8v4vmvtn8itohzb7beg73zpo2pqfuvm4uue85wkjt6ll25t2ir8nibaw6u8babth2s03uiihrbz7z7zt30vv6ehvuu8q7wrpxau003oifxpseegroz1nu8ox7siysnkfodyy41u5u539m1uxmafnet9',
                user: 'gokw71q891rk5eec4pwvvrfp6d4r1rolh563cn4hbocrfn2t2odutpj1n8huhm9scsst4phpi4qe5qad0rinrwoupssg6o7ycu80oobjmf10kqinr2393hp66p3hrjxp7nudq25e3icwi5bzz99peu06l7t6rxb6lko4dckp7le903ffmfyly5jkbtuni67htykbcubzp8xumt3mhjgfzyy2vtc0wxq6b7fmkjrts2hp6cwvc70obmy9ufg3kdo',
                startAt: '2020-11-03 21:45:09',
                endAt: '2020-11-03 16:55:39',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: '5dj5g1gkoyek577hpf26jqbpapwczd2lrf0a3v5bjhiiemkn1z',
                systemId: 'qu2vg8zetfyc385utnwjfl4irn803y50u0u24',
                systemName: 'n50tumbrf09n7rzrlywb',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:03:39',
                executionMonitoringStartAt: '2020-11-04 02:52:53',
                executionMonitoringEndAt: '2020-11-03 17:28:01',
                status: 'ERROR',
                name: 'xzu9tbgumka093e4gknhn36221z7bvtmiajaxx7k4qr29tevxw2oo3kvbj4ww4rjmjwgbncpxsxld07i2f4qudqzs82s8p20lhn9o259l2t69n3duzdg9amartrbcr0qipdkkbkgd29wfk2aqg2y650643ha6z50lchn97k15b89hrgp8m7yc0n6akb19yv1msrncpk7awzzc8a5vvcnyylhouqkxn92twq8u3iuqt4fc48f775br1z36b2zfj5',
                returnCode: 4468240478,
                node: 'jjk8gky0o3oj77zqylnn5th9mw4zshcaq4fj8owf61bdoecl8lxqkhd8xqquf3u2i3kpa0nj3el9w6dhvc6ktkx1mj7avgd5mczqykyxnt5oncr00gmjakgoyglpgtpd7ym7kyxspsuzs60u5j7z5xtwwq3ex993',
                user: 'yamnw5ykujmlxlxgpk5jp0myixy87zm2acxgm73fdgokdyf269298pu5bcpzparh3vhwdunce9iemqkd3m5pwqrgrwvnd99u2fqwb1e4teguk64kevza347h0nrbc939i4sifpa1l0tsxeh7mgy77i7as95brfjpqctwgcceksokaob03j44o3001gd5q6a4ka8alr9o6fgh74pjpn1oyf6jft8yv1d6jdrt52bdx6xssqqaihqmalp273ibgdp',
                startAt: '2020-11-04 04:25:37',
                endAt: '2020-11-04 06:46:11',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'wz9byddxakd632zr9zrzuodwtlwbs1km2gx0uhylshv35y6qrr',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: '87buuzv6cghgskpaa19t',
                executionId: '5drlvjrq5gwutbhv2w0i6x7cmx5zbeo6y3m3m',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 11:31:59',
                executionMonitoringStartAt: '2020-11-04 08:27:57',
                executionMonitoringEndAt: '2020-11-03 22:46:35',
                status: 'CANCELLED',
                name: 'qknfvuzqvtw24tdt4269lo058yt2x4m0fpstsp9jexao696u2dzgabadw1wnpxne9tnmcq14jjt3e2o9k9jscw7fdj1j0z5otri7b9spffy5z7pzpg0l7vb68jovklkw99lkcfze1qbmoa2w0vma4urmkeucsywr0dblstmue36leioxucoaxhrtumunz9epvsfxr2114745oau9aziiq3w4tjaewyd82gy1kofeh5kwof63rd390ggrjdgs1cy',
                returnCode: 6367654970,
                node: 'r9vx5jmmiufc47z85sv6a8qb4gg554k0eorfnnffa0hza95ohxwq3enz008n2ybdsbhpnx2n31qntz0yas6q1bq6b7685pz63vltdxd3p6iaz7u2rm7i60vb134qqzivpadkmfy5qgt491tcjvfy25dfcc1gnjnb',
                user: 'l2jpprjeny1m9ogc8shwkkklx9apneff0hcqbre78ootjwvedwdpy5scd8mk1rhklr9vwuuh7twjhktkch57tnrkar84ppvuos37l1kmkb55n2wxndqetf7yxv2mu0ec32p6po1rubwslulos9p6vwc3e7iylw4qvx1rm8l3y6z5wpkvccvdtyqdhh823zhuuydtsc3yrn6pi1suf438cr7lzqgkbwlf862q0o3yetdc4369589595qkmgojkrt',
                startAt: '2020-11-03 16:24:20',
                endAt: '2020-11-04 11:47:00',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'j9i8b7uig259mbz03vushy21n2xwak532z42phqq3kyg8db09j4',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: '1x44p4fj1b6lfnvnhsxp',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:18:22',
                executionMonitoringStartAt: '2020-11-04 03:03:15',
                executionMonitoringEndAt: '2020-11-04 14:43:54',
                status: 'ERROR',
                name: 'birvmp9jcdpy0xkcyjufq4ebcbb9bf1iqibocjnptsnjk1xlifci0jashn03hujs4bii7vx72uvoe9h5b5i5rbmatzzu0jjfwv60r4hn3ju1ntnppwxx0b1hfjab50su3hs60kmmxv6ezpvahmt7v8mgjyfapd2a0ipuov2cdt0zw0fnb4dne7ee7cc12sym11vr0cx1jdmgeracc70f5gl4jx0mrrmeuhmsxvr68z53hgltuaah1pb3fuecgpx',
                returnCode: 1184214259,
                node: 'qez5l5nlr9vnig7r74yjscq6keiu98cqzhqlw2e2am9zjmjsrz1rnk2s4dpr57yhlca7bed7mrwqvlfpvxuocq0rp0a4631zgvlqcnxw3le1x6bfu5rbdxhehl67jvgzl6yan6xs12ii2f7sgy0ffiq2odaotm63',
                user: 'ugbjl9t4blkvxrkaivsw9r5kg6u64yp3x3jyzsvj8pveps4499mgcfsdyaqixznz1p0xhmspawf3os4xrikvdb780duf2rn7ddu0lj6okqf0wpxedelfo2l0ghba8a48wmiqy2wtzsu0yf0mmgq41g3x5zsx5dlvcxl6tk70sc4mk7hv0hg9qhak8yr1mgxp3vciepokd4qe6rj5u9jlbvvkcj3myvv7z7nxl227pprx494ta2hp2zu6ctc3c6n',
                startAt: '2020-11-03 23:48:38',
                endAt: '2020-11-04 15:48:25',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 's3nlyyop6jx67s9m47jlhrngm2gbeht25jsffm0p22qyz1rkw5',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'vkc6wa9fdbwtvpm6xvdbl',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:08:47',
                executionMonitoringStartAt: '2020-11-04 08:40:32',
                executionMonitoringEndAt: '2020-11-04 09:52:20',
                status: 'ERROR',
                name: 'd5ev0ony4ounk6pr5pgw4jhcm5lsbcslkuq4biuj6v4c1xqg7cggrmdut5l88ah1u3nmkiqjn9595psmesbpvkdnzchsk5h9tmqjr6cv3lpllp8hlt62hko7i7tevzgvfi7mqfn85dxn7nkioc97x6jauzflqc88isrkvd08ka2zh42mdqo1myurf9h0rqgpmv7r9yqjyjx8jg7lyzs9k7mzirkmowmhid69zmtwbkj97odx0gene2ealncv8am',
                returnCode: 1741309532,
                node: 'tfotk2ji0b1gl9lveazbjuiiozjycvx3z046enuhc4nm08xgmcvwqu4qaql2qhzh2cwlahzy402m03nfz6zu5myrqi9rp82aow4jrwc7i4noxd6xpjyywe305m6zrok393yq4f2sj0wn8e8ej7dtmv6o9szrzoqj',
                user: '0gy8u7qhgsxf0b55zx8s6ic9hv3dpcp0cfz4vnk0srvejbhklfajxp3syiz6y3753upsqh8chgwx4ta0rf8zb5efhzgiyit994m7fm2odzlcp0yqw0qregkl073cax16mu8jk5ueijckv78ns7sonvxu8q96wsj9euz2twy0eptvobqz939v9q1l6rgxrix89nu4x5dxw82ewdjukl3yxh7oqnmjvqugzd91ydig1hb3wnt8f7jxo8otgjq0ijy',
                startAt: '2020-11-04 03:01:34',
                endAt: '2020-11-03 17:04:30',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'lzrhli9nr8rblpkav9aziazi9z05yq1852535qnjgqb59k37u2',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'so254we6ssy96ci3f74b',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 13:12:42',
                executionMonitoringStartAt: '2020-11-04 13:30:58',
                executionMonitoringEndAt: '2020-11-03 19:24:17',
                status: 'ERROR',
                name: 'izh4va0kmu8fl1p3qb2p1518zour1gnmqcmnryodlro109bybpoldtp7j9dp6cdpudc5e6ikhhvocol603u0wv9yaeamcd27wgr1szzzbv0li2o94qewybd83uoa64n6naxstne5e6oky3o6yh7yvor5sg6770x9rgja4kzlewx6lzm4pjvpu03zhx1ixv07n65vmjqd0pxrxzfd68d5b3a8awyzcd0b8gpmxwnkbbyjorst5kyvprf69k0u8wt2',
                returnCode: 1681512652,
                node: 'hat1m8vh5ri4kogqd7tibqbd0j68rhccz593s9wgorof4726ll4y6qau0bnhl7e9zmtc5yrwypw5cp3zxb6zquit6hvewx7qggucx0a9ek56w7c2gc9ecx1g63xr86utkqsgc5yubuhwg1sy4vtbsl2c8jjp4c5e',
                user: '1nmmi887ax6xwwxhjmcwlyvwclsuwt7cyyfym3hwaxem0xkl6on4rl8r426uccbrdnisbv8es6lhv8k4ksj6eul4fx9q6i9mghbo7gilestl1vnysc3gp358n8yb4ivpyo82egd6nvhq4wxxcz4slribjrexyhuf7o1wubimkxubn7xk5ibgempwk9wt7vqyller072u0imhijkslm4h88yyzh8yz2kfzxh5ditm8gbzj2vpnbv98e3nbr3wv3k',
                startAt: '2020-11-04 08:23:21',
                endAt: '2020-11-04 03:16:49',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'flmnny00vex8sbh95u5pkf491l6n0rg8c8n931cqebt6jfdglc',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'ehjvb8m1w44qmu8u866j',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 08:04:12',
                executionMonitoringStartAt: '2020-11-04 15:08:12',
                executionMonitoringEndAt: '2020-11-04 09:38:52',
                status: 'ERROR',
                name: 'pj8wo48q5te63m1gl88z0yesscts47ecj73y32zhcr9nhshtyz9tmtolbyxsuqhoh4awti0i8k9xhfnhn4hmxguw213zw6j1mmj77mff3xzcvoi95lcs19h9fbgfvs5ruy1mv06y1p6s0opmz4rx68jzgklup7ftthi35wwzx6jcn5yf1dar5nb6yboo4o0pdwwivym675ovlsdl6i2g9sgxuyterekfzl50rrg0kevlsbbklwsq038284kuj54',
                returnCode: 51571111489,
                node: 'jo1kcl4q7nbxvvy58arqtvbko14975zncabuvqpepkf42xw6jdkgl3vin0rt5q8bkwxw5q829uvymx6g6j1f3csmrkpvsgw40dvu2s0es4a84m5lutmzb25z22j7rryw9bro5mneongh38q9ksu8m1pgw22zvwll',
                user: 'endkr0lia7imh7xp5hdbk6su2l6nyua8yac7vh0592q4n5wn9ucx82fh0nz93mapymxx93qjacdfpnbsjifnu35d9kzfgpuh1779jzdpk7rrl8sus8f5w23w51riv7gdaqmqf02xm240t7yln4p1vu0fplib9fjdannwxe9sxmwt25jq742l7t5g5k2hf07mlzz31bplm0awjcwix0p750tn4iannp0z63mtsp5zrl8mmeoqllmrf16lhp5le5t',
                startAt: '2020-11-03 18:13:32',
                endAt: '2020-11-04 08:20:18',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'k76mifo97iwcfmy7w98xvmc0b9x89k4w7imj0umctxl9l66yfn',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'grv7gg02i4ev4jjco16i',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:22:27',
                executionMonitoringStartAt: '2020-11-03 19:13:25',
                executionMonitoringEndAt: '2020-11-04 11:17:01',
                status: 'CANCELLED',
                name: 'agnp2vbqbhvobv2ybk5szuw8bd2rdd1z9wqmerisgx55irni5fjxbc2nk0shsv0e1spla3k6ml598urscskwci51mj6bzjufv2pmhivg25kyvafwpknx4g87tqx00ceuy3s37xz36yovxdnzkc11nlfzr91qqilmqxlg40bcv7o9x0aaw18vew1dw501dm48q3fjwhqscbzh978m120hus0dogh91qmo4rhu4hbii6jgu3gx4bz0vfilu3a8uxm',
                returnCode: 2164251485,
                node: 'qf4n3ti1srw8q284t7h1h71cq8fchgrnl6pn87gapc8u0ckz0q8ivtolz9cdldjc3nr2l3gafgee2mn5szl94gorm892bmn31x1qmpntapfiba8pk4lffqb047siimxsomyjyzk13n5oq1y8ibdjyuo97lvuc57cv',
                user: 'vswna4vn05x3s9d4epfql92uc0y51xgbf7cbkp4yvojehpkuggb6rz4t2tft69bwsfhoe8ad9juattu1afpk9c4tbbh02k410qbhjoyq0f3qqz3rs9xuxslnfaxxonz1g96dh57rrst10qthnipjugx45ta18dmhn6j7qlzi9nl8yzh9i1tgnf5eci8imfz6kfy7zdbiihxwy48oryzep6y04k8h9rbv5myqa437ld4t6pt8otxa25ilht36zc4',
                startAt: '2020-11-04 13:21:19',
                endAt: '2020-11-04 11:55:37',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'rlb68fw0w5r39yjji0e7kwik5cqilxvsiuljegcwjrtyihcmpk',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: '1erwezue0jzc97z8vpov',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:50:26',
                executionMonitoringStartAt: '2020-11-04 09:59:10',
                executionMonitoringEndAt: '2020-11-04 03:15:34',
                status: 'CANCELLED',
                name: 'mjv1cvggwgjz8k98eup4sax2il7v8d0otaipor7aqrijc765rr0ueolylw0w8x1ilrnqi989x28pggszo9hnfh8r84dc0yfr1qrpihjk4zy7a92pqdr2e10bc317l2yobiflwep9pd0eup137kz715i97mw5z76twcjkjx25usjo4ndnxznyvqjcw7vsi28ol2com9c7ge5iuk5g8whu3wg64fhew0x5vt9ost2u3gp9n3hiby2mfsvmfmgb440',
                returnCode: 6120578643,
                node: '607f0vdsjaawpmyk3khbpwbkmkbr6so06awh7htm2ryec8gq7a11vjiurfwumpmmlrjr97gysqssxeyph4b02xcxy7hd52c7px7i1645q13tdbrnngj59z8c8e35pb88ctxtjkzzxcarjxu5oj46wk38p32e2afm',
                user: 'paxjbwwfuwgt0p3tbrwydffskk8wbvebgvz9pgmy3y9dsm5bjrryds4ebmdazn2cd2t76vwomo7drw4komsy4tdn1n2dh2w7dw0wvd1be5abb7ugr48f6hgga7npv798yg3lwukg900zhkc36jvyne4j2hswxjegygu6by9l5zufgjskkdo6dj9glh4xkz6nqie9mhiuuujw95plsi18i2lqkk35apvmr5qbj7nwv7kr9f3fx9nsip4eey0yns0j',
                startAt: '2020-11-04 02:11:00',
                endAt: '2020-11-04 06:58:33',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'pgq6ci4lniv5ifwmiul9vpob6vi47u8va6q4rakx5p0l2o66ya',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: '4q81fdw31d08xs24ux9m',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:37:09',
                executionMonitoringStartAt: '2020-11-03 23:52:28',
                executionMonitoringEndAt: '2020-11-04 07:13:11',
                status: 'CANCELLED',
                name: 'i4lz2oj3zsx0xm6mc6qb5mmxfwigo15zyzkmddyhihc2sxk2h717bhxln2jdruwtb5xuqu5d7yxar94qkehx3m7t9rxt3eu6xgpqaswo4yqv0m291maoi4eqswolmu2o5rdsheoas2vw1mwfx2fcukackhihmiu003salp1p6qmi8ruyomuubzoky63xuol7k2p89axfojwy0hicc7k7iiwt9t9erkdt55bi5mfq5tbpb50bkwu40c5j7iyth9a',
                returnCode: 100.10,
                node: '1oikvhcnkchyfxzfb14b8d87p7uw39kgojbacx7mcrgb65y4t3dles8fme4dw304ufbchbohamv4hx9l15cmkxuraczgwn5rjboupce74sl2bkrwy1r4v909wwn0wbh374f0bjuwkz9qs1l7kd31z2fl7y0vcee3',
                user: '9tviqyxrcgktjkzru3maxmnqy3b0nh8iaauswdr4bfe5xfiuaa2601b1cu7brpnv2tdzcqrmxh4p8cxt9snege34cmeo6hmiykozyytxqw0h6ixnnvydwve6u7ac7nj909hzi6no318lknbpk2q03q1f5zqvdtu4rdx9flcay9uoaopngv61c7b0pdr3e0nk79x82j8mt5pz4wnl8x9prr64updopafqvwngyflcgyhly6z95vdwae99e4iiivz',
                startAt: '2020-11-03 18:13:53',
                endAt: '2020-11-04 02:08:11',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'ee48xgkei84iv2sukxkwwhl8ctc8ey6i87810h5sao0sglwqgf',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: '3sgqlia0ehrtev477ka7',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-03 19:01:05',
                executionMonitoringStartAt: '2020-11-04 09:21:00',
                executionMonitoringEndAt: '2020-11-04 12:11:57',
                status: 'CANCELLED',
                name: 'fkf3bu0i1r8bcveiu25kt0j90wrwghg8ddc1cq3oraww212aitimeguodiq7407l380ufb3vc57b7itrgotp1xmm3urcamjukuzm2q6a0cqcpd70hqvkoatm7zg80jo5f66pu38qho6nvalptqsy5vt5zj1px5b2eccw6eff6i1n8i8ryohh6llun4e0ue76eyj0w1437v5qsvyz8o1h8d05pcmxpwba8u9g89w631c0xw9nibwp7pwvrjozhn8',
                returnCode: 1858372146,
                node: 'eei16mgzkw29cssajq71diymxigdza13ewpa3iz5onc5c0v1prtm2x2dgcslim4olstjba05rxs95f7z8ypktg024iirqcgmmh6iab3zm8hlrrt1r3v1ktqjf6zxnd2ugyzhvfvp1zzi99bwuzxwye6ulybijjky',
                user: 'twlzokd30z6g5a9ksx07r5lq2n5e5dp41d63e86tdnmlep8zn4bpgjysgjno5pfb97d6b1tcivewupnugbkpr9jmj053wtsikb8gsfi2cvlc8cgl79rn189rxaeo7sm4syial0s1y8hy42ujrt5tb6xpngameiypguz18pkmie1gj0gbcrktzh87iwqibdpbh0hyaj2rkm8kp0ztrel7zb8z59e1xc2yglf5aqn1f3bd8aqpgwfu6qjieib3t6w',
                startAt: '2020-11-03 18:32:45',
                endAt: '2020-11-04 02:11:26',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'ex6x1d7xtmrj3wi1namop0t4hjdmh4mp8dgnuah31zs1j1ri7z',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: '2ehgxh67kah9kr9n2vx0',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:22:36',
                executionMonitoringStartAt: '2020-11-03 20:06:01',
                executionMonitoringEndAt: '2020-11-03 21:48:57',
                status: 'XXXX',
                name: 'tz4772pvcfd73d513oyrok1npysheetes4h9i6jxw16lhtpfbv7gv9j80qn0trtooaimi5pguvjvzcnep55zbcezrz87gwkr40760enye9fyhut8knn8b62rzi6fethm6y71rzcy6aops56krqdjx01rwtpzm3f55j6r5tfpj83ziesmb0qpg6n4vl9e6cpzkv87amn5hi4l5xxkjj3xs3n5bkptx6cnurttdswz23lch4hurfu3yqffexxqhw2',
                returnCode: 5661728849,
                node: 'y3i1rtf34o37em8q8dw0cb5nfasqt7uwb8pvojdhaocnqlj49v0qd4ntq5decsnzq3rq9utt8tjmq7fel6akz0qv6bat8qs0qii3tp3pciw1pb93adakbfh1n8ni3stwkn9r8cv6kwv4jlxifuh1xpyngw4zll0y',
                user: 'swwxo5nc3wph9tqkbc7dinqqu2gs13h3s664yecaz5957vt1hnthxahr6y2k8hr25yi4fjxbuy1w181uwli675em1m6f7hc0c3w4ujrjmqbseo6v8mzz8u2e7qf5bpnlafn7oy23frr5wp48yly1v5oqbztrsd8hnbj4b6zwc6kgmpsrmnnvl9smr61wjiow4exv6bzuj9cjqvxn5h8iodb5nzjjmyfucdsodcsfdtkz4d8uqbwmrq7x8aeeqe9',
                startAt: '2020-11-03 17:35:59',
                endAt: '2020-11-04 02:25:05',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'r04xies7ni25oy2z8a5pci57fhukmmmixsld1f8uq3lgn22nmp',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'piz8u55q8x5bbhvkvao5',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-04 09:54:55',
                executionMonitoringEndAt: '2020-11-03 22:30:41',
                status: 'COMPLETED',
                name: '4dq0bkbvvx0sutdc94ty1h363lbujh9hb2vlp1hcpwbhs0iponbn65vnn2uo9f23pkbhubcpythrabi7dn0uydrzbazy7g8815c48ng954jkg0wn36pkxlrpdf557cckioxr8wcn2g8dnf2nl4sxhb62ka299qyh3fkd1drax1qbiutkpw5plqucitnzs3wb8kzhii5vkjjy8y8max5t046tt49tvhidq92r8abq619vlx8molrkik1x3dj5zsr',
                returnCode: 3007054616,
                node: 'ndzbwx766i2vj0cnpfi4eipv1der5vsolvvph90npaicw9q2fqldfvefvw36k135977cq309q0pze3qlvog53nt9k60w9t94cliriovifm0wgomdh7pmjicn87vqdf9jp9jdrptw5wqxwily55wpihgp9dh9s34k',
                user: '4a4lkj3ax47lx34zzclnh890dskkac3bq8i3hibyzaq55oskdhtpwqf3frgbqz440fwqqqtpmzs17qwi26ujm9bojmwy848x5te0iy00dixgxazqaqustdqji0nl6a0chags4zsg3lp72q5zt4kg4ba5k38cvuiyu1x55v6472ft22128eqegz98zoqv0ahdifcmkkqtujbinvcmx79akoiv4kme8lo4h1hc46dp6kpcbx6cwa9xeof3nzxs2ks',
                startAt: '2020-11-04 08:20:16',
                endAt: '2020-11-04 03:20:04',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: '0fal3bd0oe9ulvw2lczp0y8zhj0f6bcr4drn9pt41f905yjok5',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'kg2ehuawvpp1gnxcw246',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:30:02',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 04:56:00',
                status: 'CANCELLED',
                name: 'e40fkjfege7i1sxg3dps2f9hejtkaxu99v46djquwzqes6mzf8ge8f4cvqrblcg51j4zwi5yx0425fealozu4neljkgf1kkbat8xpigz91juhj9mug2tcubk42b0onakatv7ph0tfd4cpbfg5vicf3plfziwdt8qhbn8sctfnmqjzenqhswhie5z9hw5ndo1fg9namtm6cygwlliwsfoc5w6f0pumj6c1enh8y3jrhpslriup0urt5al2mk7s5m',
                returnCode: 7838185582,
                node: '3n4x6gsv0n59ty3pt0vjojziloq4ow8qagypmky1mh4rre2bg6k0c6su4bifwvc9pgwa1u7ofwyvuij5ftsvzcx2clfq5infrezq85svwnfsdco9qpv7t19f1up08ay0ahk8uicjn3onklpv3g4z29evjjc4rdem',
                user: '2jfhyragbvnh3zz6zsr0uvfz1rp0wm2tmhc8ylylewidukihqdnh7p3v95zahckjumf91x1tduam432yolt0d781hq4w89qsntc283q0kix05olv1wwh05ifhjy41zwmv3umd6fhdifstrrf913v5f3q6jmwdbqxorul7accd2doukilxwqnajzqn0sgdlprcodv8ekqy6yydjxcokxrrui1bc38twh5gtokd1p6n39m78lvb2kifna36ag7iw3',
                startAt: '2020-11-04 15:23:07',
                endAt: '2020-11-04 08:21:31',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: '1cgqwy18h7e9xqhbkoa6y9ldyaij84ksypdbcanv4x7p5kd2fg',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'cq1wng7fb49ybtnhlz9l',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 19:00:27',
                executionMonitoringStartAt: '2020-11-03 22:46:45',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                name: 'vdc3kv38jra3uaypugsx62s7o8q3euuw8nzzneqt4uqizg9z0i9ugk6eggxvvtg695ietvfmc4w6o9qvwqfarsv8k0l97j2hpm5sjocy6gf0mft63t77idpw2jgw5f8rwt5dk8seim3arrcvwfl70dwbj5l7jmpi2cmsfxr2s09vq6qht929gfepeq2sl9bj34803dwpa1wdbp47t2cdln0gj34imd8u9nz70911voo5wckwvem8xtbo590duj8',
                returnCode: 2554196048,
                node: 'hupllhhwtz1gr15ssi3fi5otofl6oolz0jr5pehgrckrn9uda9tcgmocru2b8l6ecjrc72y903j01lrkvhdvmsormxporm63bracg1nvj6gb0p17zjzwxhwdsgqyhi6tq1eadrnmibayvmsf01ytg5ygflx7g95l',
                user: 's39w96sfx2c6gpcrkbhq5ih1pi94ia1abuc4vn4dh4ep5hv7b7q0l5izvtexembg8lkpnt9i4ga65kvqkjay86ahjq5m3h5ao0ncpn1n6ie3bjsy66bn0zv6nuy4k6h4kbbec2zi5132pcdu42dja8o50m9z3v2c8royfiv8849evc24yh1fxz1w9bbkymg03lmyx4ncqsr09udnymfgxfuzvakgjlfmvdx92vmh32mp23gtj0a26vw4tfpairu',
                startAt: '2020-11-04 05:40:17',
                endAt: '2020-11-04 11:57:10',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'l17c9hxoi1jlaf88h53815s5fyo74475455coz7cjh5vngjx7w',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: '7ar981t0a5sqmsr06v25',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 19:23:17',
                executionMonitoringStartAt: '2020-11-04 07:30:32',
                executionMonitoringEndAt: '2020-11-04 11:38:47',
                status: 'COMPLETED',
                name: '253kah1wsbg9fgvbzclxtp8drzm4ridota6f08funma3c2fkqry2xtsefulxgknlryilj6etbji0hrfdrpp7qt0vfalx4af9xoex8gnv0v6lsep3fyo4bi9os1rz4r3lo863z88ha7khs0zqnbza5yh0rjuwgdb3f1c1shqj1kcoireoopmmlbs0yg9f583yu5bv6ezn64iqgpa4oh5c2kkrkroumby9oc4vghuprki79rg6uehijd8zskog34g',
                returnCode: 4593212548,
                node: '05wneertdp1pamj3jtoyvrwvrs6i3o9sgyz9xrxey69khsxlo4i0slq6pzsnrvl9zkdnqfwxpr6xxamw6y90le8u5gfb4vff9offxgt49uiyibspd2rvbpasee82vy78jm90os9j0k91005zthayrrc9ug5chnml',
                user: 'gnqcpxeg8gwkop82drzvmk9lp4zvfqrtuczv4an0xhqrh1wnt5ud55g206unjynsh1jprxepzu1dvle1felbx1t34s0q88qt0vvzr43x60fguhiwg8k4nrkw00m39kc0hfyo1fgo3flg76psc166hsbo3ysbqjh0g27s8tbhk91ef4jrt6l3s108yuo637o9qtpujmusao68pbpu6ll7sp10ulwx8u82bipm1qduo7zh3ul0hpdt2img8ue6774',
                startAt: 'XXXXXXXX',
                endAt: '2020-11-03 19:25:30',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: '31wg78m3c95tm8twlb80xdxe2eq3evqk24lcqoqbkgsz5kuiej',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'ad0h34ygu5t61x3ub7o7',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:26:59',
                executionMonitoringStartAt: '2020-11-03 20:24:32',
                executionMonitoringEndAt: '2020-11-04 04:12:29',
                status: 'COMPLETED',
                name: 'z1r6t3rk8m7x86dhne6jie88r4d93iygmu8ilaajyjrdwnlwj3r9brmh2vg41sd0efagykheuf45r4u6kxvlr1sfn4wiepspcveqmp4gbgclgr09u96mefuirpc2tv34l4jl3s94d2uozmmal1lc8sae6w5shz2znneae1eweuudek0hv06wq02os1r7abymx4q5t8wecqdlfrvbcefmubbbrx798sqocte3klx3122we1g1wwn5nc0yhmih12c',
                returnCode: 3733485764,
                node: 'xmcknko607nzbpa0nm4gro2o0gvsecri65bv2cfzcd6z0nmkjnja19kie3prphyzqcaek1dxv84lph16brkoyezg8qfm5jt8jma43uchhggfz31jfs9g6hqkwdnu4d9ce3yzd5ioh3n6rtux6fi3khjz81txwncw',
                user: 'k59vg4hudekgpjs6yi58jmoci9altie129rlccv78uwnclhl6iojmwxalr940wk9dg8zdzoeuy8uhch7zm2cvxe36ap35v2vbhj4kx0h3jz7900dzv81gk3c6gc3antt1pb47a7t5548q270k6kflhh2abgowsmjewhz80sbc0xqd3qectyku6hosrgmioa434sikep1hdxpho8afja1h9wa6xnni6319mt72zkou13kelqpmmbtk79jro36u3t',
                startAt: '2020-11-03 23:11:59',
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
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: '2pwb8cf9450xi0dzhwi53dghcgqvelfs38ym5bdt0m9a9uok5b',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: 'i9xmxusbb82g2ao5pb47',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 01:03:10',
                executionMonitoringStartAt: '2020-11-04 12:53:08',
                executionMonitoringEndAt: '2020-11-03 17:25:28',
                status: 'ERROR',
                name: 'dymlspf7rg8q8c5hfowesego0akrsoy4r82i9avwyjzpzqyoxyz415qs41ffphpab6x5qcmk13uob5hciatfh04e8gqvg11434sfb0z5yhmgfsdugjmjvr7fgab4wukny9bn91pkrarx5eok2m33dc99x9k1xyy1lc4jjzhgadf3mui1ycly7plb82259r4ire2s1xhdrls97iyi79iu8mjtxzwryz3otjionxjtwgvu0snh3xnptmeqexl1pfo',
                returnCode: 8056904018,
                node: 'be9pnn6ki9fwcf1pn9q610gvkp2xq7fpid1g6rduaobxmdkckki4ufasm3op0infu57pgsttws5u5j5zox8vw6lo07d4cup6aqy4pkzi6uco0rq7o9b73opkixuivzeidh6iwv6gzg3nqb0l58ac0gzjmtclsvu9',
                user: 'aonzlpp8cn2qnbpb1ihltjjdaf0dgexkezijdg8k94eo7aj4dc7k0oz7fboonywk1mexd7a5ywyxtrlkfu4b0bxuu4ocfwhohpvrziwzvjxnbpwy5src0jxczj303rwv2suynf64gdk0ezgg26l7m9u9eo9bvmfol5cedz66m507gy0in6usnecd6ph2gp4nt3eirmn9baaruo02997l8uo5cnubsddc2w4m22j3gtt028vc5yqs2s6hi7urcwl',
                startAt: '2020-11-04 06:24:25',
                endAt: '2020-11-04 12:52:38',
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
                        id: '5e43f6fc-0870-4a75-92be-d1de241c8df0'
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
                        id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '59bc6db6-c0c8-426f-92ba-e613bfe82c1e'));
    });

    test(`/REST:GET cci/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-detail/fc4ae06e-a3f3-4476-a720-36486d382b8f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-detail/59bc6db6-c0c8-426f-92ba-e613bfe82c1e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '59bc6db6-c0c8-426f-92ba-e613bfe82c1e'));
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
                
                id: '09e06d98-93b3-482c-828b-754e29300079',
                tenantId: '9744a1ec-0553-4d30-989c-c48c55579b74',
                tenantCode: 'sd5m1hl862qidhebcjwv49n3jqedm55lob2l0a68yw26nszew2',
                systemId: 'edb97c5b-2318-4d6f-9ca4-54a7099415e5',
                systemName: 'addtucq47atfj8e84h66',
                executionId: 'de0be78a-c0ef-4163-9f3c-b1669b4be74d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 19:54:44',
                executionMonitoringStartAt: '2020-11-04 10:45:58',
                executionMonitoringEndAt: '2020-11-04 11:51:34',
                status: 'CANCELLED',
                name: 'g9rwoc252h5wmkvarh0owz2yvblwxb8udgksr8vc3a82kls4xiy6h4ggousty4k0nk75dh4rj0jyf7j0wicwb1nred5hn9gxt6043ilpxcmenmm8w0g9gxjpmo8lry2fbksub2c5kmwmh6jh8flsv2jida50cadhnjhe32f7xghixfdqr5ble1setybsgvw25ffqh5r2cr2j426tcewta80dr8qgtlsge74ipp5willaw2qmxjl3jxsgw5ujxp1',
                returnCode: 6102580852,
                node: '3srsgno02n0dtwjk179ba9s2d43k6uk60f2phkx2vptz32dqx6cby9ixbaphch9djbf96awv21r26esr1p4uj14b8ycxfc7rzkaodzghkvfrlieks6w0ghmvf9xd5kucx13r7i5bqu6oqwtsh27mzj12xo58080v',
                user: 'ekaubo5adayhg3ei37hq3ghg3jr8wsr4yuo8ca37rdayp5o3xl5iq9ycrwsofdgq1oqi5im1iuoiw17lv49pbm7ozflptjs9j1vhdywcfze3eprzy2pv8d6czr87mgx4rpm12w097nx0mbroqg5j9rgel3yhfptmc87gjk41mwqnn23p5s3bjwmaufe2l5dv2lerqm2qh5993pek28vzn4bjjrcy32acgilmw27k3v50whgx2wou3h3bv80vqeu',
                startAt: '2020-11-04 02:03:58',
                endAt: '2020-11-04 06:17:58',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                tenantCode: 'v2ocdvhd76hvdorhkeeifr36k76z238sa9epg3dj81evla14u5',
                systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                systemName: '88vrvmj4vnzxfb28h6c5',
                executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:22:08',
                executionMonitoringStartAt: '2020-11-04 15:08:51',
                executionMonitoringEndAt: '2020-11-04 14:43:52',
                status: 'CANCELLED',
                name: '8qoa6u05vcsa7udeag4tdcj3wnjl1mpe6kcuxxtnizzxz0ow7r529fxedmife7w6i8wul6gxuehlp42i2srvz3y9u950xf7ghotz1fhqps39xrn89chnrkbxwm07rdk0hf7shlp8pr91bx69gqr6vli1sn0tl0haupnbe7a486vb80trb0ohvt6uww9ngtp4b92145wjnnjfyltsrrbmwk362c8tx0kd8z3hbttxg81cg83n4pqqssclcajp4zc',
                returnCode: 8327189637,
                node: 'trmkwgvy2g1ncbm1e9zvoacoda4zt08apx9hcuanwb5pixdlm7olzmip1xi476nypgqt8d3qvt7u0l2u9i91gdaq6cwfqji7pp90swmo9izukxp1zztv1luhc81sya9sh31z0x3mlh1vpgdr2s96w06u9o77sgl2',
                user: 'gkaf4w3a0gysbuwjna10xf7c6slyapyckkg218f5qkkgbfmn5zy94gfgs5es4ulv89pe45xhhokp8gmz40qakvsxjg1tzxqmfvxryg9qro8yf9o2g6oxq664lvksrm6xhqdtnec700rjlnb890qcdeayh8rx240qsy4xiz8e72cv6moa9yxbo9xknpjxsbna3gv31i06df9yh7s3gtktir40aypwb7lqn3y7pud4k18nq2gzx6830ja6gbalusb',
                startAt: '2020-11-04 04:30:26',
                endAt: '2020-11-04 06:27:02',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '59bc6db6-c0c8-426f-92ba-e613bfe82c1e'));
    });

    test(`/REST:DELETE cci/job-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-detail/872a5eb3-ea06-4ada-92bd-f2485c5eab9d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/job-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-detail/59bc6db6-c0c8-426f-92ba-e613bfe82c1e')
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
                        id: '95ff6af0-854f-4eeb-bd92-e04fa602c6b7',
                        tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                        tenantCode: 'rp27y03r4s6yidodjg92neh2r265vat72e3idy8hulq0j9wfag',
                        systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                        systemName: 'mmoorbtz4jin8vcxy3x2',
                        executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 13:15:34',
                        executionMonitoringStartAt: '2020-11-04 05:05:29',
                        executionMonitoringEndAt: '2020-11-04 12:29:34',
                        status: 'COMPLETED',
                        name: '40xjee8ci5ebpvjapwbkwe3y6tpsnfd7oog69o1x375hx0gb9b584ujf77hp6gdpxlbi41w3082pvwqhhsltzrm3f831h6bd3m9ivz34kj2sju51sq8lqphlorbhsk1ip77ljy5vyaee0s2m2dvabu17cyjbecuvakkgnkhjez3sneqd9rlob1lxsejafqf15ww7zu5igxg3l0gpvtc3e449t9e14ubiwuxsbq4ez3xx2iyt6wm2es3o7on9b53',
                        returnCode: 2326216849,
                        node: 'lvl9rdfe0gc3fzxlyh7yuqh3hop9rmb70yj39t5bhv7gztdstso7ceg3fjvz1i8h5h0qrin9jwz1k1tyqtuoxzudbaxlcbq2nx84yq1xermljlf88rl4lc8kz5dmlqlereh0dg0k04vvt31umz1ruqjpqd4dybeh',
                        user: '6obmxcv8hrpdoi1af8ffhl4al80g7gxcj1glc55sgsjravzi9q7uh611jcsxi2t0qkzgt9srr8f2sb6nn5cbgaz1zzpp1nkusaz617rjmycik8knh68t6hn60qpukyjm55z6low9adyk3rcs8sw7sqvhs72sn522whyox4gohgb2r3c9wqx1zg8kwkwby7iklxm5o5xj8b8du5f1hj777hofnarnsyxolo4pn5x8w0gil4i6sil9iw470s02cjy',
                        startAt: '2020-11-04 08:54:40',
                        endAt: '2020-11-03 23:08:01',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateJobDetail).toHaveProperty('id', '95ff6af0-854f-4eeb-bd92-e04fa602c6b7');
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
                            id: 'df5576f0-5df1-4080-b517-9469e0490849'
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
                            id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobDetail.id).toStrictEqual('59bc6db6-c0c8-426f-92ba-e613bfe82c1e');
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
                    id: '6f0a7ae8-54f7-4766-8311-c595ecab46a8'
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
                    id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobDetailById.id).toStrictEqual('59bc6db6-c0c8-426f-92ba-e613bfe82c1e');
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
                        
                        id: '735b1c38-c49e-49ec-ad13-8ae0f072aaa4',
                        tenantId: 'cc33fcb0-c94f-4996-97c2-3c5385720495',
                        tenantCode: '5mb59sq2h1d508aaszyxsnxord22wzy9cflnp9u52ihw2rqwmd',
                        systemId: '0c3fb585-214a-43fe-aa57-e8bfc3c76dce',
                        systemName: 'zly7tmwy8662aq9rz16c',
                        executionId: '3773de40-a6f9-4f32-adb6-41e992eb6274',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 02:11:30',
                        executionMonitoringStartAt: '2020-11-04 02:14:38',
                        executionMonitoringEndAt: '2020-11-04 02:42:46',
                        status: 'CANCELLED',
                        name: '3iyyl3egzt60xlaj11wc1vkloa5go92u4i2jsf46m6lmdujh5280eyrkyx4zetxzrs4cckt7e33rwopy1k1ltljpfe28mu0u8p66m9wnd8yprmlmhmlmdc1wdert0779xu0tezlhl4p7uomee8fjgmcufz8uvdujk5vvcaa5hz6y84n580w6ufq8uf4227uj8o1w7vj0zcaqa0oj0wmz6equodqahx6sg538kzarbscvk47avmx33rk8k3m6jia',
                        returnCode: 5342876656,
                        node: '8h7p4ibq16r1q1e56qg7muk890voe0w1ksu96umq5153yi1e9m2qngxzcuaxtops9prs3npqbkzuabg0ho39i5vafogtk7cqzmnkuixfzm7qv5utg5gh3rg6x2j82fi70a3eq6d7j6mvgiuqi3qal12rltpn55ip',
                        user: 'pnvatoaaqgo7r2zvbrlmbtj72zabpov9fxx5nhzd81g02w15hp4vvbybd6mlndxaqk3vot7ktr9nqu88p4faot63jgxv6qcyk32yjh0i0qkyajgnz9auprpp8u4p04a8nncoap1vi3jzco2temv5rcpxbk7auxycjnu10vk54pcmhlmeilyxu6bn5bk3wxxxwudci2l2q97fnivzgk565rmk60g7ugxczcjv2z47nslh25dj4meqi9tzzkl35y8',
                        startAt: '2020-11-04 00:17:40',
                        endAt: '2020-11-04 02:24:25',
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
                        
                        id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e',
                        tenantId: '663c7366-2bf7-4aea-a315-a14e6e79133f',
                        tenantCode: 'arfd1uxyout7dnu5b2ggsviy5z4abo8raug0pg6xqvm9fhoyn2',
                        systemId: '9349fb9b-9d37-4e1c-95fa-3e769d83edd6',
                        systemName: 'vcmgf6ao2td3pigwc7ie',
                        executionId: '5c4e462a-7119-4fab-942a-b0777c7ce8ad',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-03 19:31:31',
                        executionMonitoringStartAt: '2020-11-04 06:51:34',
                        executionMonitoringEndAt: '2020-11-03 20:29:46',
                        status: 'ERROR',
                        name: 'o4lbik2hahymh5rzk04v7632e476869a2he07gqvhho6bs1oagi8aupsy03r7df3galq6487egpaz4ing2k5odbs3ewcop866g4qkvamd108oeybocfj3rvpa2o89z9i0ig0q63qfll59daithwlj14oqfubivlxobrvezq8hkmybien9o2u8989k8rtqwgfs72umin8p4qtlms0d52lj8r3ujq88cf3olmg1j3eipirdnob1ororr7nbe20dmr',
                        returnCode: 7471615856,
                        node: '004ab00rgel4yqb54l9iyxged5pupi5ty5769xj9bs4fyr45txo6n07s26s4qnxmrh7jdpyzk6ws2930foz84htyov2pv3437umtrgozxjh5rrxgpvs0dw778p6byyw8mtbgik2m4uoa74czdss7odsl7eob1ms8',
                        user: 'lg9aqz6twlc6yv337oao0ofi4jn1uwa38zys68xdtxvykkjoocdfjcje0wt49lh0wt4o5y3naske81zy98okaynzukdze2wjnr6hb7ss1asiwreu8jp3q2q296pk6e3rjdegtm75db3fbd3c43tjumt8icmbzsip2o0klgckclu1hljduuzs0qxkpjy9utyq3nb2k6ekw555ce1wong3up1qdp8zkhw5xf9n8lbidwui2m2ike600gfm86uv8wo',
                        startAt: '2020-11-03 17:53:01',
                        endAt: '2020-11-03 20:49:23',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateJobDetail.id).toStrictEqual('59bc6db6-c0c8-426f-92ba-e613bfe82c1e');
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
                    id: '4ed00387-b4b3-4a78-8358-71a2ed885e11'
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
                    id: '59bc6db6-c0c8-426f-92ba-e613bfe82c1e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteJobDetailById.id).toStrictEqual('59bc6db6-c0c8-426f-92ba-e613bfe82c1e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});