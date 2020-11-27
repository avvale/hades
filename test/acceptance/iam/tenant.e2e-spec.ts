import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITenantRepository } from '@hades/iam/tenant/domain/tenant.repository';
import { MockTenantRepository } from '@hades/iam/tenant/infrastructure/mock/mock-tenant.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('tenant', () =>
{
    let app: INestApplication;
    let repository: MockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(ITenantRepository)
            .useClass(MockTenantRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);

        await app.init();
    });

    test(`/REST:POST iam/tenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'ex05pksvj4uene2cdhp6fmd8xtfljmjuq8ope6ff3djtvi1des6w2979xm7e6tcnk1un0zm760qvq1mdxchfhs56iw54jmuu0eybzzlqi58l020rx0wpvvnfxqrz11j2r69vrurxpedea0fmriscjxvr59e2k5zmyccmd77wdz6zlue52a8mq2gzwbmvby8qwe4db6brdeynzwggixf95xryftc9far6xa19pzgolxgxl14qcfttyr3uzku6zyq',
                code: 'zmpptwp0ud5c13dn427y6z1m0kigokygsns2ugfd4msjm9sa8x',
                logo: 'ab2gddbcof9tzqk3z3upxk3oqo40ybijix7o3onegyhqq6prat8i47y4twvp45d2t920g5n7xyl41049iwyihite41fc2qixq88ty7kfonf6g5kc5nefzllowavv4z4svqweicujzgkpjy10p36mm65mdpwhdp6csdscskf9c7o3ovwjzr6yllr9anzca7ytc24cvlzlpabwy1o3m85yy4ee4rk2xzto6iqfphmtwt6cz7qj4ey82hewgsx3kxn',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                name: '7j4dj6x2k38kr0f5kwef4yxsawj9g9qs8p211a6f2wjyoeap4amwggi8bl59hrcd11sz0n69zp4kqe278hft3e85qlig1dex8dyizok6ob81vayos7o920edpi4i1j3es2zqjzzp0xykmvl14u9izyh9ao9r840z8pivv1twfso0409gs4mgveuhe12laja178xu9630m8ndca7y9drqnix6p0fug6byehfqx316t7w2qkuu9eflrjbbuc8ehvk',
                code: '805gd8ujpjbzsbmehexf9393hjvok3l1p9h3hgnmatwpm9acxw',
                logo: '2yzsv2qs0ciulooygk0eo72e2zda9kwu9qd397uscedbnbgqed4pmvje81v2axe5i1m9m1wooki0df9ihmsel3hcba3ky5zyj9uh8teg22dvg2is5rzfz2we3thq541j3vk5aqskxec86yyq2r9f379mhckdiz39hp7jih4eocq6jhnbvd5577qblt4g4dtay1tsx8tmqe0em9cxle30d7lqwnl771lss31bcp1h7j8gdf3ijg3pzw6g3lv4mk5',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf',
                name: null,
                code: 'p979xdw0gw7zrmmzqlxwfn4h4uex5tb68pffm542ho184le87w',
                logo: 'hy3rqcvs4gt6llvvuzs45i6vdn0shi83f4f5rb35jratd6phhjo2ko9ikvk0heu9jhkdgvg3g8kf542tq3wrh4tedxxl6ykdga7z7fqj78k7saae0gadknh0skxapm5jm8ghk2j4lz9xq28h2kqq6gu1mfmp6aildg6kum4tr7cp5s2m7qwprzihxlcran556pi8t6k3goqi70xn929940nzecxmh6ql9gxsidab21rnnri4ba5vht84af21dn3',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf',
                
                code: 'th42o8annlq6gwy3fmzioxqnrn0zgz94azzj2r2v6ksnsi0194',
                logo: 'ebw75mmj7afreu9jt5eonb1r4gkx8dco3dcxf1v3zq5f0mpc50clpgr3bt31cm36pmt6so5hi1aefbrhzoz516nihpsk1b4kw6b1gczssn1tpuf6t9xiebd942vr9hjkqvtkn2ehekblvr2o6j4axc5xs2hvk4y03kd4jh985ghzay5h6sesv9owf7o08r1a52esfv7u6h6v1ywmsf76fcy0za2isudoojjza3x2vrhrlcvo5yawddf2mhwiar7',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf',
                name: 'j1n5pn20r3nfzrryac284lowd1isq5v7ugjjyuuc53io8c1mm22o0ax5kh7wdwwltasm7rfwmue7x4irikng5imdpzqm0u6ogbik6qpl1dr0owhvqq9zsfjqasvy9b9co90do4qfcbfvomh3unn16vx8f2qbr57l6v7li2vexq4n7gv9bdi22kquoh07d8qcisfeudr4m9w2nxt1l8z0ly9efgrrv1yk918hhut79xynjqn2kze48iydxpw4asl',
                code: null,
                logo: 'smemvu26eh11usnq5n70m5w0etgvp03rie9o0xf5rjauo1t7x908q2miie4062dsffd46zl6564u3qk9zbcatubui8bcw048tlrj72ve3od9cg1izewfxk4lp34kx2hiss7dxgq8fgqzc0ykwe1degln35nsaf71c6i8zdbfa1tvpsdxm7xll539n8hvdjv58hhnlq25qcdhvus3rr40qw4efogvrjkqrihs6hs8njb2pjvah1vh4upli4lksm2',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf',
                name: '2c1ydx4xe3v4643blp7mfn7qnd0clgqvtjf6gvpfgm1zjyp0rzj72emcv7m2azsfm418mp7x8ux1vwb4bi992iqr24y8olo04vr8znwyq5goh5zy2zikz0rw1ya00y2c3fiqfa64hn5gle95gqjek7pkhydrl0d1w9mgbntikevy7i0pk1o9ywdcl09iw0hcw44cguoykikkq6ieodyy1danx1w6t9ztkvqk2stb8cyks8hmpwa7yiv86chvkzu',
                
                logo: 'ragtpuk44rllq6vgj2r36s51wo9rl8t6s8dev602jn9d148p4b5ps8dabau7wat1xg3mhyhns6rqp8z40qxwxp8h1z9nhumg6ka8mwhvs1aay971o2d5bm7xeic0aak7dvaf3iszzj12jr0umd4ux81zq8q2d9gjobpql8ksyl3dnolh5drh1m1dmiin91xt2x237l3ah9f0jokg7m4x7npb4asvhlnegipb2gjx80c7n3pp3dvluz0rpfu6wce',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf',
                name: 'agqlrx22bykhtrc053cyp7yhkhfnk7geb9khluo5qwjey1czd3qwqyvhu8n3loslu0rq4eekt67c7vebka9c4eshujab6s1yt6fh0t0pyvygxsp3jp945rrg7agrjif2qf2ae2sra4v2ui2kadffw32ydwmcqmpbhtnj3c668w9f08rj56g1rzi2s0nbljqd465sfbsgaay26z2hhu2zi6c6b4vc8nxv2geshp23ikijdp88rnainey02hggrdo',
                code: 'qckbve1ua99o6sq07hgs0wdzbsyz0f732mibt3yiyovdxazjvy',
                logo: 'viun15mg2lilhfdz92gjkutnfo8fd32yzd9n28a1d7dn0fpbelx3n4i9xdqowy1w7110bn8hhl6r86g0l6gg4lg744d9syzgre2umxptg5q8ofn2n5zracxtdk8iwdz1gqhspdjdtrs82oyn1z8ithvfyogpbwzvc933516is5igflgw95spl9r27rurpzhl6efhl3debd6rkh9yh4etsgqzw1jc598o5xuqgjerxpbjzrkja115n5aorm76z1y',
                isActive: null,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf',
                name: 'gy5sh48nrx1ayqusnoymktg9dvpwsq5he3lndj9x2wdl0ay3uiynz52oo2r4pfi2xbvqj2jvbgokd0st6qlusw455wljd8m3srus94jidedp7ws3vwyp23ij883r5tu99ldwek9so4qe35k94ndk3f4cm3b1m64fjrwd7q4sogc5ef97b8cqg82hvsx83l0yn6r2ykngb79puz86owx0u5zd0wxnuv991xyfn46pre0vpg3gx7p8ahn18maa1c4',
                code: 'biaj3d0t67yggdpmqm1d405lt86rpop8xo62prxrr5y6ncbb4f',
                logo: 'c5x41g9eeuxszcv74t6nmq33txc2hrfwfhisj5us89lu2647h7zp98x7ijxojerc8op0qwuojs9mziu9fegbano4qmmu6vtg95iekw37mnjlocrqk0g18uulvif0opour2m96ympjgum2v2j2sxhjoomalyi4j4q1fwen4yzkaaitnb5ds4kyu1vou9c1hqe7ivqdkj9tnii8i83hwrqfca3uo7h6fgwsg5bgdbd1einow1rgz8uu9o9b2cjt6r',
                
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'd51co2satw2c6cfyl6yu5ux8l47v918m1ohqc',
                name: 'cjmssrsy7pan7k784m1gjp4jxzn7rrc9qs9fgmsi0wz7wdpvqy6roz704dp4o5sksv70m78qrhgh33dq6ccr4s6qmax4qq5cy3dzku7fci0dvqm5rsax2ridb35u9tepg8mxk3n5dowafd1mphb21hx8he3g4ixbwglrk37cljunuggf0f5tp3s3gbpf5g5nrav0cxfn0f7jf325ma2g6i828msyo23n8kv6ukwetwwqdunvy544dclhetmzqy5',
                code: '363ruxryuuphd8f909kjub9n3boihr4adml42xc16j1ulpclu1',
                logo: '2oyvdl3fawa5vsrcq5w14663brfb900cm201nh4ssfuewuswz5zby5kls6dtn4nn2e36uaqgkl0w1j1ldy2or96fz4o7bt1n4a8c8vq6drq0bm6j8a6ufr5bj83z96y1z1ee00gvp14ex9qnnumjdalb33jhadgwbl934b5tvrxkzws99t3kv9ql8yzzn7zbex8pvzhfx39ttye24axnzg4l8nuogpqryhxyn947qvo3g5wsozlevurjlca032i',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf',
                name: 'kcdnbmcj7jovjmwzzc1on6p4lrb4rglazjiwrhyzy89t1fm5h0zw112jv5cmdjzd691x0wzbzt70qie8uadwtztrgdakmgw8j9be7qae7tjzd1bal139vm291jd6pdioj4idpgosip4t02tu7cifnsdrrtfgnk11a87kke74fs9e23fk1632pu1zbnp9sfirr3hizht77p8frppu3f4i20h1znbzi6a6csdntfpi0htc6kg83kcykdcqjxwiuos6',
                code: 'inr2nk190mdfo01u5bbhlj8sr04axrc9tyuo2m0ng8sxzwjhqk',
                logo: 'rsw89nonug8nwt5d73yolkogsupckmk7plx5lo3ibuwjb74gzi0s3vwispuyf46ws1i6tpi10zxej9pork555ht47sbksh9kg7pl7zhsnzemdpm7p4jpzi4d1j18dh3d17w5m6radqhxlheekl55svyfokc4j2rwpq6hjs0tbbn4mhb1kevmyqtycgqfvxf0mnc46j7ox4fylo183pnyqp88bm6r3xcj3037wqcdulckxhesstjl9stu85m5qp4',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf',
                name: 'o2jc5piu8c4jlc7ye96p0d1pppoo7x0aqoa3niu6vc8xhgjr4j3mo03c5bberp4w7hgknr9pcj4v2gfgbd7dxqgmvagtiuyorgjwmfftbnicrjjswzzqgyah50qavxqwnduph1zd0z9f59ejxel8kgww8hdp1h9fmjlgfb0tu7btqftvgvhxrsjn9ca0ow7vso05c4jeib9lvzq9xgipgyb9t79fz2vseqbqgofi86t23rgnm7z5fddt8dlx6zr',
                code: 'g912f96aysgelwxiojqldyh9ddbyszdrh2mjhqar3tu8zw367n3',
                logo: 's9k1hcax23ftlsv5p9rupk3bu3s3tpmkypuz7dfvvhhf26ly6uddykuwgytqseuejpq5u093h1zyahi19qar8n0t6p5isa3klnt6dee0s0thm40gcixzwzy452zx4rsmt7rrgdr6tbhax0axn9tk0mt5k0rsy4uzjaz01noxy6cm3zf87okvnp2hz96xdk88h54gfxskdn7lercyi44o41uw945c53ksy1m3ss45n59584vc0xq8da6bleneruo',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantLogo is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf',
                name: 'g9cb0xe379r406xrn3zo9ru0nt7ma2xltnmhr38vp3cxjh1jajelihie1gnrlrruttf4dsh8oucb08iu3dj3ssbcx7fmp5ycbpjfulevanr76pcpbxd0oh7kv4w8fl2luqeh88witlodi4npqjxt00sj2evrhf36tw58mnbu4tcieynd77facqfonj45obq6s0n6tsj61qcekcf76lqvhmlcwo9kdo1ehtgdsx50c8ejzpd4c000cmepndhv37z',
                code: '15ac9knvb7mwl9al9k2r00swa5ynjenqeg4fwjg0wm4ad0oi33',
                logo: '9enapvtud6ualbo3ewr5lt5u1p9v3okdofkoa1luueyr5bpavykt3oviidnfpv9q3levccszvcbcvq3ves479kfkpr1ykv05m31rsn5i4eu4rpv52buqzcsigj83u27tv0aoyd0zknd6fx1swlk2dfqg5hsgeofhkrl9msppe9ht9cwyl9vnq01s50mpror7t7racc5wzm6dfi4dglwfncyw8sm78b9vutbc0pdh2lbwfuxueaohv1wynb3do9hy',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantLogo is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf',
                name: '85g09rsahgbmkf4ffmaydgjfnvovlgvway2i2cgn7or1urx1k5utr3dlhccx9nyqtdqn6xbfoevgdir68yvymu1n7kdu68xcl3d2ce3l49eb6re5qevk1t1275c7jzw0di7jr9x6442fv77lcuxvvls1y1n0x9eoazis1y1whpjpkh94bdqb32riz8vqvu5oq4jn58fpd381q1qb9rsq73fb93bw6otsxg296cb75b222rh8e69gio3xx3hf2lm',
                code: 'n8ry56skheha24btoswlq7enpnx3mjk34gs04l50w95arahthu',
                logo: 'n75076hn3e5tularbxhd7g0lbnezth737forkwcnhdhw303in3wygt51hcgohqh42o9tvzzuwmkru9j4h3mt7s0jkyn7ulpyj0w0av7svjkekghevyp42dq6vnqupn3fql3wspklef5nlafsi6fp0jeet40a4qoingv2hed0sv4ly1r2s52v9tv9qu5pm891ogpaawdpw80uva5vidjt3ff59jhk5u20p69ji0aebamtrlcnjpkxva4u8glv399',
                isActive: 'true',
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf',
                name: 'q5kakklp4lgcdji14e898h0wvhhkh0ca67zbcbzh987u6zpt17wykuz4u8nkciq32l21l7tty3yuxx7619oxdnlodz0sgljzv3k1cvde7hn6z24e9ec182jafkvye8f1a2syktkoq8qs2eopwa9lx7gvi3mz2astt8za8w7q0er8d5a5hjsej6n53ebj54mv71jmgv86tr2qvicfnois7emvzgg4joy2yrxda0v4d2f8lo1uhsru17f23favsxp',
                code: 'a3ofgl3l64yf2wxk4unlhwoywuesl4fi5jsezzbzazgu0gjtzt',
                logo: 'v1rjsncbn8h00ad9n1lij24ecjptwfk1uovn4czgpwhtkoyfaejpogxz8egyjnpcaili6ip8h4ltnbjoddd24sjeoolbtcq7v5zoxlhbq1f7bo8mlyco4r5swn8sxz1bslw1rglrmttfguk4jq4krd6x4x0trbuljphq2e5qjq8g1s5vc1cbpadubt8ws3o8h00udmeu372sjh8rlrcx4c2hjpfheu0a1xt6hpakplx8kcea4cf89jcqo0fbsux',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/tenants/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenants/paginate')
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

    test(`/REST:GET iam/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'bd868b74-0466-4051-bf85-722816aac5a3'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '03e3c2e1-6860-407a-9e5c-0600495eb6cf'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/65fdf9d4-1d77-4828-92aa-9e14e133406b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/03e3c2e1-6860-407a-9e5c-0600495eb6cf')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '03e3c2e1-6860-407a-9e5c-0600495eb6cf'));
    });

    test(`/REST:GET iam/tenants`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenants')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: 'dfa02405-4d3f-4980-9b53-ce46c43eb09f',
                name: 'mub6rwenanahzo0l30khvnkt2xjde16r8v2aiizq4w6sz67q1apati28u2vi5nlbbuafueno1v5cdwbu45ig1wvvz13j35olxe8sdqfqn54yj87p4nwvm2da53oc5vosn8f54iithuw3skftb3nzrz58p9tukixoy64zl7ryr5bs7uest8gwirqje1uai11torjg3uadl7hk19h6ophqcr0q6qlfyvu8oj5gs373ix5qnwx7vydg0iz733u11r3',
                code: 'xspa0npf8oub8y8n5c532wu4ckedgul3nldptkcwxo2qa92bjp',
                logo: 'uc53bbc1mia0rimcvjymd2dirgcyr5espxuny03izqa2hykh39toto23qy9qb4abb7zfyxyk1kckdldev0sjpd78t6cvafs7omrfijatxa0ylqqg0o1f268hccxi279e4edyxeojn2ysqk737hifujlpury7rnk3bkqtretay9ibrd11zavb09vgnjilwih0q3dak04d70dn18yct1ema81wh2m2viggrzdwad3adnhpdygp8ar35vubp6f9tdf',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf',
                name: 'do1twh5uxtu6e5g9dpsqf6ogob7xygdvdg1uan3z09t3wmk1tl6jrm4omk325sbvasc5hfzdy59a07t1dtlv9eajmgx7co8353mky0catrjj1pc68szxlxprk6tl6a8cmkqol3nrn31avwzzhsa1rbnmn5v9dhmi32gs12ntul2vv8ym4ais7a72uihhxqlzjfnzbzv2npxyh3qkbci3wdkrub8zsq31u4mpyg1i526vgxyv96hv1lc7hi1tpj9',
                code: '1a24fes2y20n4ouxzx731b1oyewx3s6ynnwd7ozco042dipdtw',
                logo: 'bvrnh2a6qjb6tvgt8y07xqdxciiwsojxcdoqpovlz29ifixcni8l3rrp28hh17dvr54o9ng8eh77krg2kxtgfvriynt4i0h5mbtbuwj5gas0johrltwbli9ju8z4fji2ghls6euu5odh8z4cwgksw0iqel6xtbmjjkjkh57kxwu3uqkevm96onjrorp1bb4fbs21jgawy1n9goshbaqc5tvijlab2gpom70z83byfffrft0sio8vu6cjzmyol7h',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '03e3c2e1-6860-407a-9e5c-0600495eb6cf'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/3564f0dc-9297-4c3c-9de1-76ae2d5dec76')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/03e3c2e1-6860-407a-9e5c-0600495eb6cf')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateTenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
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

    test(`/GraphQL iamCreateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '0035cd34-7a5d-4d29-8df5-722dd089bc91',
                        name: 'cow3719mksngrvuddn23hyx50khiaj8c2m6ztfwjx3dtpzrr0k8t5d9bqhektxy28zbw7nflmsx87570s531jpu8txicqad6spl6jyd5hryqvpbbjxpfor3aaqvbr0axhevqhxq9hngtzj5f8fn9dhx11xgeqwlxliw6u30xm7d88sx7onvihjfamt0e81pu61cgaausf66zjq9rnmqn0wa1bou52ovn49q6v05hfpzn7qk99z4jnk2uk89o6o4',
                        code: 'gffna1zx95sq06f8squ7lsog8n7h0b4cbmdm1qmvwlikhp5uh4',
                        logo: 'r0syrh70awbscs9smo5ari7jo7hraaybj97gp6c1sje9hyh9ezpeukiidxnuyfwiqrfh9lkgtjriuaf63ulk61towa49l88ihgx4uhgxwrd1bkd4s1cbbp7mklnhevexd17n1d1dwb4hspa4h8abfnwujygi3hum43pwzwwo43qf40qsp7jwfkf9mdsxja9ndezrdeejw0b9v6ke45id7rwyff09tyb681kudnrj5cczz32es3cvbsrdt61pu31',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', '0035cd34-7a5d-4d29-8df5-722dd089bc91');
            });
    });

    test(`/GraphQL iamPaginateTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateTenants (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateTenants.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
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
                            id: '03194384-9cea-4e9a-b7b5-d99efe2c8a00'
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

    test(`/GraphQL iamFindTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
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
                            id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('03e3c2e1-6860-407a-9e5c-0600495eb6cf');
            });
    });

    test(`/GraphQL iamFindTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '39ec5979-2c23-438d-afb7-e74194e56581'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('03e3c2e1-6860-407a-9e5c-0600495eb6cf');
            });
    });

    test(`/GraphQL iamGetTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetTenants (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetTenants.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e483bc16-f0c6-40ae-958e-f9b5696385c7',
                        name: 'ujyrfalhwpfolz48p6fbqn0ehvrekbx2052j5wgae1w3y7w4u7dcz06ifu7x05tlc1tgt00nf5iqrz9jw5nvxykhxtxb2sfgz3f1q2dnlrktz5g31gex7msyg73ld6z3fxn08yn2ufqlcmg2o1cz20ecubnn60ka02al9gzsbeko167jvq80ist2l21w6m4nqd0fc8jjqxcnvbdl62d4wx5psfan7rdz54ea3iple8cjm1cfqthnvmf5nqubymb',
                        code: 'i8st33qi6hg8wz8uztml1fuwc7jjwmcazte6yuedxzawlshrmx',
                        logo: '5e0dky77h33sc824mi8vuljfijox0694826of1i8pqftlyv0kndkeh1s4yg5m26jvypw3giul9t7yba0cebknn825o6kb0iiwb4usz061sfht9077sm83wt82hon2j3mst4ucbjlj61wfms3c3nhndpo8orz9g1v24zajpid4fg8xga8i206ed8onpohz3ze0rkr004hxstrjbay9ak8o5h1qfyh4fg2kqrngrzz69vt7vvnux1ij6wo2m7r8xp',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
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

    test(`/GraphQL iamUpdateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf',
                        name: 'v52cdj608rgmzdbps22fzy022tfiah6x76dj5esx46b0piozjqfrhzxda55mrttjzfgwmyw4osomo81g78i43eb2gz1glly05nbxs04tdmj6jjwtzlehrd35m0njlccer0lyegszs3ugltygbwhmcyv9aeol458ddbpbnxzp8frmjxntfzcp9fgiz5nrw046cmsykzxrtgrx3zy06a10ninabv6w8ilk7qs4f6tjdfxrw4x4wxwza6th0apuxwl',
                        code: 'c83aqou6st98r72lo5on7k4canj7d7yhop4lr7w4fug8n8pn51',
                        logo: 'tu86j1i8yilncjusbaxk2oqo0he366svx69s52a0foxrd2bqo1bsd9ptb913a4mutcry7to87rr1gdmqrz49a93ze0deis57ftsver248oh3839ke3lf49gvsn2mqntesjc1hvk6qhqmnk3ubeudohjcog4b3gfjs49espp5r1v54dhfh09jajsdng7cw5j6wbsnyxiy5h1budmk2ereph1hmq2b0evqram0vvbmytpdxifnci510nqten9w87j',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('03e3c2e1-6860-407a-9e5c-0600495eb6cf');
            });
    });

    test(`/GraphQL iamDeleteTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'abf05c3a-126d-44fd-a470-d7a07122164d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '03e3c2e1-6860-407a-9e5c-0600495eb6cf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('03e3c2e1-6860-407a-9e5c-0600495eb6cf');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});