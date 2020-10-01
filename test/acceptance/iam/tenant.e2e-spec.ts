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
                name: 'eyq8ufwa7bauv0gxqh356tnlned28401hg5yo65o89py7u3zyytub0lucmt2vinz5bwpden7gwt3c62mq6221w4mvsyxq1bh2tnvkxau1ua15laqphu07x5asbgkkpdxtae2xdrseelrolrmtyuyuwkxf2oo5c14wdspe91k1ojn2g6k054n5lw0a1nuzx888oido8w5y8jzla6m61xc8vttgd35hkkojktjjqrw84193sc9a9c7nob3rd0fb2n',
                code: 'ae4kro8d3ixg2x3293cx8tel8ibizrwcu9h1b4fg991slmxcbi',
                logo: '8hqp6d4nmsi8gjo2ra7c1o8gnowusqsbtqh18ytyhmta0o9wbzmtsf6cp8qvl6bgyitcsbpby8kfpjliksu740d0ij2drb1qig3l14asz9ozieofq03zcelskvjn65g5vhnhpo1vybx40ozoqhc787t8tf1jmjm5clljxtt2q8geocxxhafr8f6lnn68yhutxgdjz5or71deeb23xhj159no0patuoavqnnhstrj49jvymk0lu02sayppi6y941',
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
                
                name: '9h8l32qyzqm19sunm0l5u3vgpgpcc0ot9ee86xuqr25jrajdhgjf259aghpecxyor6o9dr6gzghln5uomgt5negofzhj9i8lcrl3r8zy7lfhcxc11nm4ktpzb5fp9i3a0qfze70kvmmwtpt3ndp3uryozzurraggz1o43k8gfnyw7axrsiif1vs529nq741cmjemnb2yajfkykbdmmt6qg6djp1dd51j0saeyizqjc0xoue13ei4t4nr7lm298f',
                code: 'mfy189fxwxgmodzi71bzeau32lzser3jhf2tchtnox0hiyemzw',
                logo: '5uu5aug169nz1da50y6qq3iweey3s80kd8q1qo84urguzgwrday57nc1o0txpku0ndqjti3cclcw85lnq5fb35kscglit7r90r35wd0vuzeg4zwcocwhxygw7v1ryylkbhyg9t9x3l4uqyu3ri1t4m1ili5lbklsz2a4ol60a21tvj9vd3v8461urzzassxckmz051xj5yobcnu243if1r852g9d74523kb3vs7jkun270mma9cxxljsue8iko2',
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
                id: '235f8cdb-d652-4a2f-a996-8a729d774e90',
                name: null,
                code: '7jilduy39iqh76ae6rec6zdiwtr2fvmzp3inks45vazmuzfwt2',
                logo: 'jfngd3231qp79j03ixtvhmre94gg6p8lbgfa9cdfbr0mkdr86ul5tfjdj4ia0rqjrc2rph3rtvaud9pk4e53tf107x2qideychjq30baxi9ox0qrmz5r590vxw0hmuvlkborhuomzzo229vqymxnbwpixge57gr2ckbkfai3uk8z9t3teahxi8ind2zb67jf0kj3nmby1n3898en1q5eu3qvu2fcovz8srnlwhf6p7sk1hw58xdwpsgatcn6bof',
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
                id: '235f8cdb-d652-4a2f-a996-8a729d774e90',
                
                code: 'ifylmixlqd9orxg3j9ch7c2tpm3jgu19m88tjyzhxzx04la2x7',
                logo: '7tx4iz0yd7ipw1rwkvfvrmh4e9ysg78zzrfw74w5wfrx41xkcxxxv7geu8jjx2i1wqwd329qjzlhxp2bpgghc98vvmbkq4tcpmxoau9g5quoua2wr5ag808169lncbervxisg3vjv6b3xv96uy90n748t18hd3vcq8pu2mc23ta3ej106x7mxb9usijv4hyap8zc9x2jqwn5gac2zd56r0mn576q9mcnnk5b5zj6pg8sggnu3f1n7bmt1hd2nrx',
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
                id: '235f8cdb-d652-4a2f-a996-8a729d774e90',
                name: 'y8ndskuxlezs3hkkhxpvy04lz1nl6ia9203hua6c880k3cm12s83j0mo70v9bzs3bj0mlols341qijrujejb5wahb4hep2bt1ors3nhb5xszieh0q18cm3uqobf673f7oj2s1ye00xu90fxlzrd67a6f3l6iy6w0r7ydn8mn9tqbfn3ya3reg9lhfq7fw297u9772wqse6w3uutsyhxlyxu4lkd156ivl9mm90jnccyf8sv6meo9tl2cr2jx03k',
                code: null,
                logo: '1rcskpb7iuvhjsu1162u3c2lcel6vbhybe8b4wtbmic02q9xaiapjsjo350hotedbsyo8262mfvuwygzzfo26lnaceoqtmbmb4u9biqnl2l1zvilbzuysskh4m36t2pp8x42sffjpqwwbou4q7bnfpq72k9tsyfikkl4f151v18i7m4fqaottke4lwtroqdm1dcs4m1r7gh7yg5ij5ebwfkkfqz0hwvknewdqvq2l9mk7cu5znbv4vh4b61ouh3',
                isActive: false,
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
                id: '235f8cdb-d652-4a2f-a996-8a729d774e90',
                name: '70i6ttckaut8l2c8iag10ahezixeh6qpcte3q19adt7gpm1jjy2yyz4iy7aeb97cqgwi4b5fbw2gc4mqouxxy420tt3ffd1s4jb6uxvt6hlm06s3aw1ciclt4pnz72c7b2esw4wrxvrsitlsj4wjmw6hq0343elt7iggw74gexszec4b3wb4hdpz01ha6fwthii46oaszb1a2s8hx83rntebfcbjwlp4ajk4q440nxoms91rue0dus51wnjpn74',
                
                logo: 'txd87gssgqearddqkqs2ho2yatik8s93a202o9e123fsasdw44b2786l4ay3b865d3r2ioad9tzwqx9xex0b5wegc9xaknc8fcmmiso10jmds2277wkarmgphr81ddmlnuwu8v0et8fe4xjqzxzj5lksp1jb2ktfiboq4j3jtoei1wazz7avygye3mhszdovup5wbew0rnpf0g5vc2scvsr8y01hwu970x5funy1d5zpt16yrs0gya5553pd8pt',
                isActive: false,
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
                id: '235f8cdb-d652-4a2f-a996-8a729d774e90',
                name: 'mjhscpzqwb1ldh7d74dhs1zxzqoo6y9ebi9ej7eyedj9mjkh6htsazi276imxia8xj4ibz2avomm5s8h39icabiio5qrqrtlmgp09jq1ul96zm9n4xldeepgd0o3shw5pwuzyqwasc3kpcu57c599njg030ejw2udz9kgl1rgmgt2xr51rfhygaexdjxmomqqm8n2djumk9gqq8osprbdlxdkqsze3ck463yrr1wsw2by8qqjhw98krozjn80mi',
                code: 'bc52kvp9gf4u9u0q6kvnhfs2qv3fcsj6by2i1ytxwmxfw234rp',
                logo: 'x2tcsgd7yusm0wz0le8s8vn4ds1n6t2oeq5ira8wkrwtbolbgtpox95kk09vlh2l1mcnl0y69j8moxl5stcg1ngk7pg6gy29bb5ans263wve8n9ce17zflqox0q51aefh5xn1nxlprqmahf3xz6gbl6k773j0mxh9xk36qzre9qk0feo7a0prcisczk17oco24t04cs4eyvr36wa2gmyivg8unxb76f9ytz8gs1ruyzrlzxp991zzf7ftr1i190',
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
                id: '235f8cdb-d652-4a2f-a996-8a729d774e90',
                name: 'fgt0n26bgs3fi2otgypqc4v59onwki8sf9ip9ac521sq23e5qitvghlx2wkp5ycze29ulse7yysnmrnszduv4ecqayporxlqv57pviv4yqmi9b0qyh3tnukqffa0f8tlqd45vp79nxtam8y8q2z1xvj58n14dmr1fxy9v1w2bbaw01cqampu1taqu7n2y40crvh8fuayzetldbgdhyioflsin9dclm6t9pyso4y9radfx0vb35o9jyefzr8ywy5',
                code: 'jkm5pncan0bqug2z9p8w5733ettgmuwtxe6xvstorftzugnitr',
                logo: 'ubr8egdt5ngd97tua848qvs69ohwo47hd5g9818yt7t5nly1icgys81lkkgwmeh8a4ofwlp5wxwfqc1r7xzgxh0o56vi9nxfxguhoxjejp2q9l2wlox8h3n39uyqqe34ec9sj13745pwietm86w2p6hb4nmxtivkol9f9p12ghjrubvj2a4g2shzown9p3zxktp3vswhrkgnkprdpehgt6a6velb04xn9ojiqkxdxpkhcel7r5qno27f0b50g38',
                
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
                id: 'ig4en2sipsxz2a53lz3nbp3u6n4rw6o92yhhn',
                name: 'jr3gnr80jln56sdyzrqn858ixzp4ww1pixoyjt3jrxkuojb9eeskul9jz5bw5ptc3vv8opdhpu05kmkoceasekeumfsayirgfyzojytwg8neqiowmjk178dh7yh86inf9yw6vt0wx9zwiou3brg0a12ww293sduq0aqjh284rbdtg4j98aaw6lsbzqtx47xh8920jcm7yivl0iqk721zrjpdoi17xe591ybrebl70ixm8pt2fl3vjiikbbfpecx',
                code: 'epeo1twicxzdb0xod56k957cz2rcuwnprzsa4224iejwuysf85',
                logo: 'icdp85f6qcs47tvqz88qh9h8i1ih5repy8nfstb90zcrkcs2tjovu0fxzct6spc2ebahxxkoirciwkui6qavwb1mnnadb4bjg9pxd53mxvnayhvyxvjb29oqfr8kqw4bt6bj5lzo9cn9e60pv587mre669oi851kvgdikziiz2hqu9eul94k3mb5pafbn7e0ajio5tz3ht2e1f8uep7vwel478atcab36b5fylvby45ejjinepv71t6e28y9gud',
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
                id: '235f8cdb-d652-4a2f-a996-8a729d774e90',
                name: 'hraz8f70ofj46oqxr2mvh2xhsxsjqdg0owg4kh0lefjs5cf9c7tdsvm12ubtibqysmoi2qltyyxqy9n038mrvqplhqzarsbkvkb47oshe0kjv41u8ravpuoo3xiidhfzqmvnip497oikqcqnm4nkfovblfhkx6uv5z8c0m8u9r6w8ty5rlng7bzhomuqsm2epzr34dqmy6k23l7ae0ciw6fzydrwi58zcfet50sfczushmpuwpfd0n55viq1yewf',
                code: 'mq940npkuou3ngex552gb9dys19zxzuyw61qz5dunhaydqwjlg',
                logo: 'vca9ypq71u5f7gto6dy1p0vdjgiuo5geoyvlvgyh40co986zcgjgcwlwakvreo5hesigyppsr0a2zhit1rpd77su84sp4kiosbnepm2ko6xmt5lrkote12tp5apdo7h6uzryiljqwh2pcoukp2wogg7r3iaavtozfqfadnfx9hbnzbc5fhqfuk94zxhy0zjj4bjn727u0n7g1hts687sy299cqpoae0t86ex4cikioil1g26rbkn8x0sypl14nq',
                isActive: true,
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
                id: '235f8cdb-d652-4a2f-a996-8a729d774e90',
                name: 'j7emec3xx4pr8ufmxrepqc17tppm3jl8he01u1yheu5zx6j413h5iaj0ndxfdfjxv64i5sr97fqldcdlkwpjt1auy4zo36p5hmmw7ptwfg9olarxjp6v77flpvhmy3p4u2lcdfi7lhu9pj5drxjsazeqpx2co9hvsmzt8wiyrmaezm6cjxj1x0letlb5wmze8pr6px65db222n5pajjcj5tbjyo1eqwytvbgp8rwf67foho3ctz31z79igimmbr',
                code: 'm6kmxmpys2j93a2d35hs5vk0r0bt9p5l534fm2ho8z389k6pqlq',
                logo: 'gm7ixx2ct5qdl2y9jbyggz946m17mi2qjcw46tj0jlrn22vymofams10k8mdavzz8jv4i684u4hu515okerx4mdv2323kr1iano0em48hfobwni5i98z21rnikvdbckp52kj3fqf9jc25t3y2tgf47vxo9z5h401mozpgp88j2w0eg4wm7qrcvmjhglkp4052om6mod3kkcxwnnjl0hgqdzchiu7p88db9ppapa5m1dbj1duqdpjq60x1xjtpne',
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
                id: '235f8cdb-d652-4a2f-a996-8a729d774e90',
                name: 'il5ijf7gs6gpb2nf0yudixn62yeeru1515blvji5lhi1lbrjhugfwgjd4svkvfzv902wozu84yks5vuve4yq2leouxn6l16lnqsvt2du7jtpzjgu7m6chqjqtlsvz9imym2lldfryxh4qhycjqfnxsahs1r9vuqolzbbl94nz06ksivkx8l9vgm4awyrcfzj4o1dxjloeipgrxgtxkpu4fg0jmgnuxggg7a68oepl7519yj8sgjhxevb24xmt7z',
                code: 'g1d409zxg034p5r2en7rjn9xvrq944piutbrxgvpb1ho70en85',
                logo: 'f08x8se19l4e979xcrf9kw53lhqofqn2i0q2bky3dwyz5llkoezvas5fb5fd8l1fjr3b74tu6ps29xjbbmvvtu3g8kl0ysje9yj1202oea9et6z61xfm3n2s22e192i8bh710iq4r98vvyd5iar2vdg7oryxq5eaznfbwfukkrffiq7uamwzecwo1rt0vz0a63la583suyjw4lizcd7o9zz7ofprf7x0u093rhu1jxb9mdprq03s4iamb71whx7j',
                isActive: false,
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
                id: '235f8cdb-d652-4a2f-a996-8a729d774e90',
                name: '9i28e0twvnc487y1ickrhdouidtxpl55xygyjt55gi3o23jxv5vktpdxw00x6ayis1ftc2r791hkdqsu75b6sukm4exk18774vwo2q82yt7vwmtwrjua8fyv0qenmeyent8cnz4lgauqr9qrxjl8macnbf1ygdhf7fwysukfg8tws4twl2e33kmxxyuidx44ahzmpvg6yzcs4xkswupe6epgtu8b7drb5dkekyy2hqiwhdz5wrgmz326242phme',
                code: 'rmp1tu7a6d6lyf7fwfc1rkecjhdopxfmz9i8wb6w9lkeb89seq',
                logo: 'y8a1n0jy04ing47f2059ujow25u6craetefqtoamb638u6xkcck8uripppejqsas1x6fph6zhzfbcveo3epcogg3zjwlmwspm20p4xyy58u2m2k4yzk4if8f90pa7xzkqrp84ar1z15eecsdvn6dkog20b7njnfifj7f647te7outn345xdw8yrs6p6vgz9e4cm05t0phy9i1eva1dpeim0jrbcnh3pr6bcubax6qpknwo2e6b8v38nudojt77s',
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
                id: '235f8cdb-d652-4a2f-a996-8a729d774e90',
                name: 'etek8cui218za1cp0hsgomw2u68p17tq7pd6spb7z0xsssz9tb135t8qfrt9cnpy078dbo6ds7rbls982bhk3r68utv393nqx4gi4k6l9w9zaz7shv6tq20q8ua5oufqlebfbwcsyiefcp5zt4fq6dnlo753qvo78jn1a0mtnp3ksqtwgb0xc0v1b820quygwy2fayolt1ek0pb4edoay2hteddxr5njo8hpkqk257fwvcx5nyymkw4i3svr41z',
                code: '2cz6nsr9dnv7p68izadnbm4mp5ntnqeau3a7ajgrku9o171c8b',
                logo: 'r2inmrrdqt6mau3j5yzd6un4s3dk315v8mx8y35g141w3csonz1s3bzpunr0j0v5b82qvkdwbv3lb3j4ndqyz9js3gk7uiclgkk8rbhgas6wofeqnc9b64enqx69qlhii5op3nhpnvqhkzee8xy836tfazp69v9w3ak73er69esre3ewrbhfii00kclwgh7sy1hzsu1md7xz6o8i0l99c6nifws7ms8er2207ln12fp98hgrco5h7n3z8ujkjx8',
                isActive: true,
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
                        id: 'dba8e66e-3f94-405f-9f9a-27f9523276c1'
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
                        id: '235f8cdb-d652-4a2f-a996-8a729d774e90'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '235f8cdb-d652-4a2f-a996-8a729d774e90'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/99798974-a533-4dda-9108-f13abd9912e2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/235f8cdb-d652-4a2f-a996-8a729d774e90')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '235f8cdb-d652-4a2f-a996-8a729d774e90'));
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
                
                id: '889f349e-2433-4731-94e3-1f63ac7a275d',
                name: 'ayj9ekws88xa7n8ih4idarmi2zcgmd4emdr6yxsfioa00oiylbi76bseqb6n1tv6lsj5tooqwoi34wespk5l20n30m1x6payrnopxvor80netpgu0ygs499pmz6v5bc8xjg6ukyj3j21eyht51hzctnvp48kh9ol338ejgo0stwe57ic3vfzlr0g4x1cjpckqr6i5ot9yh8msae145bcy58l8kz0h5ykgova4y1eycf3wdj87nscay3fh5lniyw',
                code: 'ddbe75izeq4wlwr1y7oer3d911kj4euf3vxeyvwxpupj4e9uez',
                logo: 'mxzsm2574kd9gxs6a4poi7qwn3sg9g7wr8aj7nphro2658p0snqbxq66xf7mgdrtb3x84km23fizphn5pad0eyjsb2g614dl49g1qnq4yfph7utoutnliq51yo5vkhr4ugvtw8ekndywo55of65980si3abm5ztdfbp16d7bfu0ch54q1sb0z9tunexii1sj0p6u4ytc29hvnmcz2c1layx8mhcvk3h9sghfw60pt9ssr76f7gzk7y1s7oy8e0q',
                isActive: true,
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
                
                id: '235f8cdb-d652-4a2f-a996-8a729d774e90',
                name: 'djy9qtodvfao7bxunhhyic6mc4zotjs6l5lfqjp6l8rg20xkb84qtlw1ilwrga61r95phrf8ybticqntyoyvoedqxcugizww3fxd9ywyewa9x0kt922sgh3agepf25yibnemaplhl04q2fbgkba6byb9if30jaefm7nt0kr2bdz7zotc90bwg05qnsq7uaacxs1wm1nce8ad6by8oitix1jyirg0t150ya3vim0mhz7b817s5e1yqo626y2oewa',
                code: 'zfjiprqmeaj5zxsdyyknqnaxxlj4p0ym8uafk0heghrghy94l0',
                logo: '49zigx363hwbahxp42s79k4hzjai063hoxifynzet2n0mw3i3kgrrbt14m4d4njvju4nx8xq10eayacy1rb4xzsmk17p9ksca88su4bv25gkmzrjemd01ugp0njyx0q3d6dx1dlcqvlvga2r9lwixw5ig9w7afrqohj5eqgsbzogvg1avyysamci5opdvj8nrfvbsjfhwxce2svz6lmhhf8mptx8ejn7qqrg11ge00lzye2ig0hjt1lgdnfcmrg',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '235f8cdb-d652-4a2f-a996-8a729d774e90'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/18431953-8f14-481f-ba50-5a48cff77df6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/235f8cdb-d652-4a2f-a996-8a729d774e90')
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
                        id: '0d3a5324-b5a7-4099-9724-da4ec5a2da45',
                        name: 'aqeg4ci148eq3wcmu0sb2saofosttngsasfr21c0nknkwnsjyeqwyq8x0uijch2odqs1gfp2yd6363x8bdkxf74gcvhdsnl81bt7qa8mhpaedf5pxsicdbl2gadw4knyop96ab11i8cqu3aqq65p3g7jhlcnav1kg5t1jv9mhgjx69lezyiqdn7x3msjeg9eb5ckr0jy7pmi8xpmlegntmrgs48t2ek7gnaqhha6p8odfl4hm353h8dj52s6c52',
                        code: 'b7fno09i3b8i1tlto16yao163ylpns2mjzpc31mooxl67blz2j',
                        logo: 'p7ca7u4kioiz5gpate7kwkqumyic1l9l1hym0z3ugzozf03zsxlrre694jzfk9ps8a0uf3e7l3gq3r32e0mwpmniqn5pkbt6vx0jxfahx9qsfl5x5ljcyfc8nglg1wmf3c39foxux8aixq3wtgwdtf9xopbtox8pw1w1djkdmafwkkqd5lxpk4t8gysjipzp5ao3nrehuih0iwvd3lwdrjah5mgaropqr3c3dzavui27nafh8dq5tb1tyqanfek',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', '0d3a5324-b5a7-4099-9724-da4ec5a2da45');
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
                            id: '1d276c85-a419-47fc-9029-ead2e16945e0'
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
                            id: '235f8cdb-d652-4a2f-a996-8a729d774e90'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('235f8cdb-d652-4a2f-a996-8a729d774e90');
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
                    id: 'cafbef59-9bb2-4584-b5df-11ebaa3dabf7'
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
                    id: '235f8cdb-d652-4a2f-a996-8a729d774e90'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('235f8cdb-d652-4a2f-a996-8a729d774e90');
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
                        
                        id: 'a481538a-4f90-47dd-bb07-fd9abbf6b733',
                        name: 'u4olwhug1nkl6zyf1cn5dqitd0iymkfaeofgq1bhlt16bfb3qygc7sworaw8ziz6fl0prpp6mnipt4v02tc0ojpmt76vc6db5ywhlf1ifyupy4fqq1732phb92jpjmdkbm05v6rr4wud8w4dldu2evc1379fv6rsey5e7luf3vyumkz06v7q0out0c8alrbq5v5opvc56xq38qz2whbjrcxpt8wyklovivaahid6pdpec3wsan4i3svvqhndqmo',
                        code: '994umep8p4339jhhx4fiyq11n416drszy9fia48ees169jmfnd',
                        logo: 'batf0h30g83xpzj1mi0grx1rsj6s2p0fuw7dsaeto7sf9tbio4yi7jm5niau6s5l9sar02td3jrml8m6m5xw6r32tfp763omog2c7khfw28zkf8aq2609s3ehgk8rvpo0oh55ze7xht2i7gqmtm6wpd344wpb1wv7bwsizml0uq8hzv0o8g8cxfmqtnqtzyzbxzwunxaewqv7b4kwgolq3k9d9mebmh6apaagke0h6pjgy08wx0i1glnzys34c5',
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
                        
                        id: '235f8cdb-d652-4a2f-a996-8a729d774e90',
                        name: 'f2x78jg3tfp1ci0atex4uts2t8wkdgmrhx5809t5r09chy67zd1581ejx36dojyopnlg98acgqh9yfgrvc1fj8i2v66mrq0dzl8y64k9tm73bcnw5hmwyt4r5a00wq5auysxw29eyf04arejxq6mrtvyjfh9fdx7hdjfpj9naq5zwijm1mh7anmoa5d4slj7irsn0b2fx3h5j185ua5q9cf7yxdgul2yaow7lbtpay4mc6wee4puchemh8wcx6d',
                        code: 'pm4h1ss38jz2i9vxfy5qdo8y7enjnebopauzbpsuuj9ii6j999',
                        logo: 'rkrzeshqejaxqkfs8a3bkm7gnxrzjwgcgv6u2z2uk8ih75jorecc6wsxzuzavm09fnjx3mi7iss25i55ye58x3p9gtjsoqieaojqawk2zjo5rrg7ymt0q3qlw2b8xvw9zag5jmwp1my0u9hunn504yy07mdbxw83aglmjctryzk1lf8lj2xbystmcj26y249xx56b7pzfmcn5knrsz9afyz5bjkcjyxrse79i8qjw3ek3catl6j97dw34ou58te',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('235f8cdb-d652-4a2f-a996-8a729d774e90');
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
                    id: 'b4eb08e0-a7c9-4ccc-8bc5-16d8beb5da55'
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
                    id: '235f8cdb-d652-4a2f-a996-8a729d774e90'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('235f8cdb-d652-4a2f-a996-8a729d774e90');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});