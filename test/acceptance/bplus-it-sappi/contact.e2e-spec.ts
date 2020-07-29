import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('contact', () => 
{
    let app: INestApplication;
    let repository: MockContactRepository;
    
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
            .overrideProvider(IContactRepository)
            .useClass(MockContactRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockContactRepository>module.get<IContactRepository>(IContactRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'dv4s4jbm55z8gzl4uyop3z7qcu2um55op81qrceoyoazfb0va6',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 't2loaxogj38rskagx1eo',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: '52l3f926m9lw47mgvykffidf5dixo6exxem2xaxtt2p10j2l2vmso2fexxaxe5np8eteplvmrlppxyo6pm712vjxmmo8ku4k6fgkv5itbkn5nmffvkryeqhw9dag69ipp7qa8yrgkph1i16fiyx6uncyh6mpodbo67s1337qlyjitpth0pqywg7mgb05t8fqndwxkutvyduop0oiufmabxim2amal2o66xil43o8wmgrc8320latv4ezz3elvy2',
                name: 'kep205m1r4oa7idjp8regx7k0k3yq821ayg4jmbh18n29wum7irhfbnxqeydesq1o1mw10ij2ll5mo25agcyza14i9xsbb7x3j6x8ylltcuruztbbexfho9zt6j87qzh9dic4e5aeoojfmaym1oci2qeb4wgg2bcsauodkhv7a2hdpw5o8xjg3drpo9370zt50txhnv9yov5rtd1nymomhbs7b2a8bt9kdmcdyy0zg9v9x8mf91sl1vnpoc2w3w',
                surname: '57rkzc1ripfklsburnj75slae9a8i746xbgp5w5cwnxlovgukms2fusvr0ydcbayrmz9qk6mqtyjikbm4rj855afxvjrubarbrzp5corp0cuj3hqucwt0chi7qc8ia27vtni5m7m7y21a6koumrfv1056vqb2f7c2wrulvhwvfp9556jx1q3z2niuyo0pwwiipuudog1jc61ugq679czueb8da4fjfdv3npf4378pkm9x3srdldrsrgq105kgco',
                email: 'f0fqghvjgl7ysqz6t5k4plvuwy06qp7w2dtlqc4geafjc4njgdzyog0j299yo00fhdoeltki92hf9bz6xvylp9w59brcuaxld6dwcal0lucopwzo5ea0mclk',
                mobile: 'qlxb5svidsk7fvus9mv69y6xv9f5e8kfuif9o1oiesg0ah7jl4rn31xqzfui',
                area: '44ecodmhrskg5y0ygxtlfslqdhucuxmxcsf6fnyyshwnp25dwccj12vb1sqlqrzf0qcrapwiybc64f5hz1vzw7c0f9zj6qc65jdxb0dzzrw7sjoac9p2jrfuoxar5i7f47z2e6o2wmcd4qfsfc1gywnabe3bkkprwey6ssptz2b8br6h23vt1vqb5hh3vb00pnurhrsupwhk31ml04h1zkz7sffbeerx1k71o3ibl7l63yh174d19w42c0ngqh9',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'tsbohkb7l9nvk9xgng7fhgk7wvi4ufa2huoz5gmdfmfnqguqnr',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: '2c6w4zwf6wvoec9jfc5j',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'urhxmr9rjuwphkogmu2yxncc38oolis7pbz7yx3f3qpi4y8oerbzfjhvz7mtt8uh12d84numr0u732zlrva6jenv2s4st3egegmsrwuwvsxnz3pyi6e6ix5mklgk517c9nkjtqncj1f9l8909k9nzjokfd6uabgnxtl9a4vo6ecu5mtc51mgwcz0hst6eskeejjxj74ts2lopzzfw9ar2t0yrm9u35zlarl01s9ihc1agm7i2m6j1lzzytn841i',
                name: '8ti3tylibb6dfud6m78jgeluz6pqqzlc62uq1jf6ts1g5fdjgh5lcw3t87lk4csguwwbsokzjqqf0c5qg0tp66c3qdlnoa5umpku8ptyf1kayknof3m073kmqcr7yt2u5jkrzyeogrzvqgh2a1oh1bp30yw6k49xyixptmtxy86bow2rbku6d0eb3wbiau6zfjf1c55vabr8sbplge5beom3czc6fgrv33dnaezheb0vhphcuarmftwfqzf3d0p',
                surname: 'sfdmhtkhzbid5mau3n23x5rambmdl6b8zpklqf8ejl07plkamnke005j4wcmzxlzrsd1k8iw7t3dq189uw7e79ctvofl4m3860q9ap7j2h2qxkq39mt9afrbk4w51e16thkdh3tv8dbvbxu38n8gh9qmnvw6seqtjhltsd1gp18ns8ktb4agvs7wnjoce20cpay79471bcbbpdl3iwuq0gwzoy3s299w2aqodbe67wzvslnjz1wn8qmi5ir1x1u',
                email: 'k9r8w26g9tnaialeuy6ayby9wirn7siqkwf7d4hq38escvchi41nlvuwecbhek8o9j2r7ronmcm6oztp31gbvrkvlgum6i00or8sdwh2yorhdxrhqltwk66x',
                mobile: '059a22dhpv4upkpurgmud36qfz4stwh3gxptfdspyxdkc70ofovhk7fhtd0v',
                area: 'qdoescbkl2dan8ohya2zosxvu2nklgj6ma5uztlk8m5q9hya0cp6s8bi7grya7hmrv2jm3cnsayd1vm656gelowa7b2pcpv26nzm7sw2zx0vbbz661hv6unaf2kwkwclh70kmqwru0lfl2533dlpc0mnkgpnbhkwwo7vnhu4so5a0agpzxiu8cnyh7ufrvsn06wkfl8n29089g4fr8wuy7a7p9j1j4wxesqh5mrnaupgetzt8wptn1pywmpj88c',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: null,
                tenantCode: '1lfg1wctrpo5bt8u43fr7mfvzrmy3oxesz88f9awqmrur6gvzg',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'tgbsvartklpw6zpf0xew',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'lse034b9lzg5iv6h44paoch1kocs2kot57iaf2nz7uawn2enp182wwn2f622nehensk442e1w7cnzsg173m1vdgpb6tsltgnz1midexxbvbs5mohkur0h6f3fbpl00ynsv78foe3ik4fvn38g5nygetf7ahiphmp9lakvwddzoee2wj1ts1mbr0h5z0ivclwmijlno18kl9c9alft4u8w9m822tfe3p7mwkk2mls3jr7um0zja0o4qzgubh5ugv',
                name: 'mo0jnvu2vuyujlgwiw8p8unnkv2ejrtlb1qv9j2weply8h1b1dj6httrhh4mvshew57yg8vhab806fop5e37qwezp1owwu2voo21gdrr1rkwpanjeuszmyc7wzcm0kq8su1h6zfouvd7zyv1oayrqimu82ye6sy39qfupbkx09yjmv0t2q78c6y7e6fxfi01uipzi77zexp449bdamgt06jenlxtzsdaff1uks044k1jlv4amhfkh633vg6atiz',
                surname: '32lu6t6w5vn7k8axuucntujyjx3tcqm6c0lgoel5gnsnf4ax2dkdegs8imdf3hr6s3n52bjqvcjuzvu43h8fse25rqkc38b7mqxy6b4oi5ngme9c1aofz6j0gn7ucr2u1hq0wbc8z8ll01kjlch310g03qp15x9qftgagnbwt39oxt1l51z5dwvoafahb90cu48fqi4meyt9qofs6yro6rrfzru3xn47a4nf2vxiqm9mhom70acvcycvan2na1i',
                email: 'gkwvti9obkm8m09pdbuupxn3ezgahuvkf386zs5giu0ioppvlhf90peddnt1pojgs3ga51idom76w09klibzmlrvd191ct40wl0cp12zhisl7lr5zuxj6mfv',
                mobile: '8dc9jv7sgqw4ojgovizietlauc9oyo7c1p2r1w4pmzbzvp2dp5d02011spji',
                area: 'i04ea6lnq8mhm70gair0as9ntc78hnxld2qhhks052ym1x49qgurd2tu2jtz4g6x8n8camshtfwe2g8tz4za22khgcwy2me550vyfd57155v3g4aj0bwtojy18icpsrvnuqvu4kjn3roqwfiip6b032d20m4d8sv0jvhswpnm956bml4uqxonynavwpuidoje66cbt8jp1do0teljdwbpabw3vv3o4fqo8nhr5719tvs1x17m8rxss37skof8ww',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                
                tenantCode: '9r0k9ktgcijexoa5fml81kjsqxbaiaw0kpopgm13gwgqzlgepn',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'ovlnkio1xhbd5xve3xnf',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: '5sxkm8yidwvhtb2tbq2fg4bq8d8dn3prkshj7z6egigc4ej910amw1d9xb32ab6sgdo3x1n84gxynbhp2n4cjcpvd2cvss2vmw2uhq6oljf4gru0wqd5ogagm2cssgm93vrflh123a3gmai8ero3ngbo8naim673gfglkd858mxsdtnn7v9pv40q8uljmxk67fw0zlptuxy9gyjnuchz9q1qo1rdqz9b182sxml5ev3z9wias9g9wpce0df7z2x',
                name: 'pz0v5nk5nmiqzzoidi3gf3ne4ocdfl17l88ae0mycfmgwkqw3xx11yai7yasca7x7ryuu4vhxr7d9gs3csz8rdhtvn7gg2zjztlclkl3ubytrx5zyzvt1ain7nifjjzoyp4rv91ex4ru1k2bsdfljmndaj7d6uuj1v9rnb0jrtol8i3y7s9iwkqout2imtt0o22ozoei8i99x5cnb0td3zs1gvbvke52nw2sbf086uwsz0t6cv2i6ucym59j0xg',
                surname: 'r5fd4y7vwj0cz8qtur2lxi80eroalg2mm98pca0dpxkav98kgrz2nkp062slvhyxvz0bj976plycw1l9sib9097dfy5v1jhkyo7wsv65hztdsjjsirgek6hzc3w4596de2sfkqmbzycwitjjjjdk264eilqeb9qx6l23h34xzxmufnx1oqtth5rjzp1ln0bpw9eoibnc2k6nx2hkd9b8m8m9u9yai9ngkij53mbp9bhvwagjos10ndziw293rqe',
                email: 'apb83xr4haaxyipkdwul2etko4oh6kgy6ae15ahvibv1q9r55iuuyhv7m59fzfc8khx2f4p91yxhhuxr5nxwjd0m9i0agat8dtaymq8iw579impjfetp9rmz',
                mobile: 'dstgspbtb20npzbjfeib24gm1mx47fjrr1groqimpldk0wtfk8638xsmf5nr',
                area: 'pnux5arl4xfq77iginqshdelti24vkg8o74ph3dzdmkipnu6o68utlwj4fvhmutx416pj354ldt05be7czdzbx47uj5ggi1gn7ngfkoom1ertndz7vesd05dgqacngwik7yv500dtbx1lt00xhtutjfj3r4nimd8retwkbcamma9f0oo2ujnzztbhloh5918fwkqhagxrza3rim7g7qv44w3jxjzgzwuxg8448jbpxbzthbyggkztrtfab9y27j',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: null,
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'g7p3euurewyrtrulru64',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'ao6ntpioyvscit5atly4fixz7g5gvl4ln5z0xitidboa4hoc4dk94gqytyzf0fy9iotd95xdkap8gwhckjgaanybfwr0azpeq6s6k8tqg4s6rhhs64dlaqh2qqcxlp68rlzsrgfhnj7wk9j1mii7r10nh0mtkxaqh9meenq5kh6rqsi25f8uyezbogjllhhw23ezum4xitlrhca5zxs8iklea8uo7p80eu629xp449agumrrtukgtdzc6digej7',
                name: 'eazj13uesvkxc17jt0kjpi8s4rhmv35alyrgbqbog2wxti3kd13kqb0bzsa3jitqhgvo3f5b928kgbws484z2d4nqip087sj9ryx9yjkr3ax79cx0djc0x3tx5l642rtiou1ro4wdtsep6e3vuokdldadj813bixu91ots9krqag9ef8sx438jd5we4jhddmawuzj0ain0428bw2n12brivs07u78gdm07l2nsejlsrzktx12jdbxifuak3c3jt',
                surname: 'w9i3yc4wiyw0bp0i68t6lwzhid95br9tte1zyfhizntj263zxg45ufr8gofb4ny90qxxgrno6jhxc9rnmxrog5daxocp9f9yopcxop0h65dd5ve49hwyw5nk9s1sih5j64w61v0gkgbvdp5nldnf1n7lkashku2mqj7hq227p4hfw60wo20ly2b1lu98b4cfno7xtbx0x7r8ha1j8ixscw9mju8udepge317zwcinbfp46363enhedq7cwdgd9b',
                email: 'vrcww60qpkt3rscku7ghu9ehtcmnj4h4j1x1q3okeiexv9qo5hck26kbigtso3eehc497zat07gtwpi8yy82jwsrkotqbgjjpj4lph46dpvcknn1p36ri1hl',
                mobile: 'wdxechslxl91ho703ae1n1b7faarxtnv33f2qxtp43y89qqv9yufvxdlcooy',
                area: 'bjqsjbj1co68wyow864zwzntgxeo3wm9pgeax437mznhy6vu6hb7zo0z3tpwovzpy4w3p5xlown8rk8bhzpw59nlzi8ru5m88p7la1iloqk09hgpbgjsi5otidprywpw3xjbll9itxc1kd339yylzihwiplnparutsi0wz5jkxmhbcsqh2s2vlygg72bgnk5eba07tmc2vx7hkc63ob8hosem9zf8rhfcjhw2a3dwq15cfc4p1agfk5miqtzkal',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'w7k1nz9b6h0xcw7q5b45',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'yl8q1syzowjhc5ap36yvem5bf4eha3kb0a59k3hyfp51chyv7sz9pf24inmwm96n6dors060swz44w4eogwjw1kliegdjx4ozxzaayhhmpc5gml9n87kiucdy3v38sn6pvg3gvxp1ahnjfdryhcl4jwx9tnbw6944623uunutsl7jm3sfd8uzut5xdre0qtig5yvpu4qjmcw7c6162wqhdoilccxm5e7vix6dz0rjfxx02xtyf8j1h2jjyfeld8',
                name: 'zd5kvp5cnnsrtdtognpgejw37mhml8ozl7bl2duzufkf5iv1ezhugfq4i0ebaf1z6lptfg7n6ge6h00z3nnmkdmu7icjlzl3c3lyydk9w75jje5b4c7gfdre1a8ca80yoont66op6xttit1hkinukzj9kd67dotjkea38sxi8uoi27w3xyl2nf97rfmdsse2428yfk50f0fn6a5zv4sh8f79kri8jj6o59rrnqmuiklqeegarut0a2opc60xjrb',
                surname: 'ts9m7ouubhr0lyaoroajhcwhn3v3pzpsyeua35axfqhpqp4bwl7yhih6bbenljnxivpan0jbw0xhy5u2tlaaryd3l8mho2gwm5xyaxqhnleto760clbp795e0gbjufdoc0swkpe4zv1rff73lr3tiy1jmedzlosjhu5ine0uawn0qil9i6miv4z7wcicgjp60ua3xrz1hnrlosn1m7ve9wv7a7bc8lnlquq15oafgttfj6qvb30scux0lzl5yt3',
                email: '2qqrcscuk9j7vg54loxsfbh0vkyuqvxmv0f6r6k2npi65lep5pntu58xx1cj7z4mmrpmlq079pg9zli4x41pt3oey5y926jodlbkfgxnkddgxiu2vmih33tk',
                mobile: 'ohhm5ddmifmhoph4rzvhm12jo0xxedbtas6tvgerom84nah0jb7s50yziqsy',
                area: 'eibidjhzc1qcpheeqaz7is3c1oyp82c51byb17kdmms16ktyzoq2xh3acm6pg8ng2k2pf7in844d3qkyvkinu9dwsdfzm1csngohtkdlyn6hgfux9g0opa18n5alzf7iqy130qufgt6kf5d8z69mc7eutjaoezfo23ylzau3kb9eirkfxbytv8pbuhk02dz23lhi7wrqt7c2dmupw5vkrfzgldvs9r8nvr16ycmosivhguudym3g9wu7j65buuf',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'pxxxzbjvcpeh77wlkbpk964wrsna67khyk3n7ozz04it8ev6io',
                systemId: null,
                systemName: 'u5zwbzfv0p6h3caybw5e',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: '0an9buzy4jzqi7tmfqjday3ollpswg9xsz8y2yr62hcrqldgmeypq5gst1lqq8mcxw8pfwvgm3odil6gg5fmvox8t5zjh59vpfqf8e86yht1te1kz8qs3xtcv0bw9j1s9qojs8ggt1bw3fupqy5zsjfh7la52jvn26uu5y5o2xfa8z7ebsj79m5mx611pzas4zylh6vhwg5dsdi7pu8qc5gam5v8h9ku7345n7fgtt4n96nyhrhok26cy81qp9k',
                name: 'wyfoqgrygecc1vn9gcatv7tt944r0x2f6i0pfthds6hjy87wca3hidh52nxifthjv4fljjfntbls4mm5dtrb77s410szgyxkdvobjsmrzlesivwqx8tlprfygh7oqmu9k4cebdgu7kcs4m308hwjye5exe6d331f374dzw9prgfeb5uv6iiqahtpk1txdg2k2vukaxfhdz7p8ds6ym6so19er6b9toeyrgvvjsc4nkjisd8t6fbj7o7i9ym7ag6',
                surname: 't9lj3fji78gxfjcrb7ls5g17603hq6a69sacowp4z96brejednac55ocfzl96bkllkbo41rxkk90csdt1uya42h7j2z9rfgz6os42cu07cf4os2i61onwitxdqv4i8zmdc4e6jvssp48hgmgf15xqxirv30oe9leqlxsdr0rizba7fbcnixd34kkly5uz7sc9vppyt8yf2rmeyd6u4e8jmiphh8ksbuiptkjctd7s9p941c5i7t1yx2kprf959x',
                email: 'r87fe7ej8hz2nwuukpk3b8rn7zx407unp1qkhoslweyr2mgfiivaaz9ahpt8je6h42dp4c0v4e34n9hdxm7gct03oio7pe40qbq2a8rsfz1g04sz3pzclgep',
                mobile: 'a1fm0t2u1k3ka32qp5vql4wbhvxuz2f6mg9jhf3ebou39ghsc91x3kl5oy74',
                area: 'lkz75bzgxfj92gizj75e6nkbze23cu1z3k6zaxebc4zn4bryv1js5u41tcmw40uhf1krcj9z0v0u6a315dhhjpqbxpewo2yqcnn4vsicfhhabo2s9b5o7ep7xcrpfzh9440qc2jb1mmoc1mjt7eaczmvmqk4rd2gh91j7h4zjit9z78fy8t24j58thavsil3750i990vqzl8e1c7newdjgwqq8yqmwwsudf4yyuhfrg6i2simwfnyzontf5l1ia',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'o9m4y3bi8c9w7at7bbosxc5i6clvov8dqpcfzabz1khfi5r31z',
                
                systemName: '4r7s541xbpfifiuht9bf',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'wxo3im8p8wch0az1akbsudy4r4ripcwysjt0g8lvru2m0deifmc4pi4o1rdi696tf3z6q8o8mz8pam9mkey5rqhmd27k39la2gzkwxu5wzch638jc3tgcyyq2kx8lmg2okv0e78k3iyxftus3qkmfft97ihxjj33zdigfnyepmgery2v7gscc2t0a18jbdjcc81spyeykjydp9ss27ku3o1co40wps5o5mji72kxat087hwrz365x69li11ky92',
                name: '2b1w7b6wdqorc3au0nrkuu0us02e97zi9lp2ho3d4saen0dabrhnkux03khxde6t940twetowbgs057p85q97ao1hsy6b2szawomv2jtiehth0w8desnf158co4o1o54esazfh6ya13tpmqnvkbmhxv47hz6v41er3yfcgui080e51hds9rl1vfgr2y5kf98cyqx63ehgw6089b6rzdcg9adti4b7x3fk3puw13a4ksj6013ebqo2h548l70ymj',
                surname: 'hix91glxpnggrmpuha2a7mcjv6fcthel91jgjdozo2g6uvc4vzbklt0bngj24apb15eoqfuknxjccngicjxtfsp8gevszlahsew3ghua62wfpjzl5qab94cr8si67xnh15ugphrkfqci3yrqwskku930jtgk62evzgwbgmrz6re9bnbfxlvn2fr4pvookplm0ie1w4dgc1jsgy6t36964x6cf2gbyt03pzr5taocepqmlbivri2wqwe2xgq9z09',
                email: 'ha2v0w3ih6jeop4xdkuopyp3x5dl1z5uoulprlhdtx8qo06v0ulcgt15f8ehvdzpxwcxnzjsqlb3x90sl9dxcznzahln45x1eoyq2ujt6s2nq7pr3gi2gd96',
                mobile: 'b1bp3q6u47olyh6zg0u8s0f8zc4jgx588g3vu94o3lxaw8eq5lvbq81ujl0u',
                area: 'divk52apmgtxn8xmtjtk2zgimku2n36qiah9zjqpzc515wofz68tn2t5wqou7p053r6q06w9171554t416d5ojkuystf6ujgsfl9kh1zle0i9qy534q3gkdx5qt3poklghh9fs8gm7qdl4259uevngj5qt85kpn4fhpjgk1flcdqvnx5evfg19x2ihxkym8zyw0rd0l6l68li8k50olf23f25totht7ft3uess55wgwuwwdflmoz8br82k0r1yg',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'ux6azex66zmrz3pgcgdppwjkibduh2xelhw3na3jgqi8qsg0z7',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: null,
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'zrbg6mnqvoios6uz99m11k8e39la02ism8w0ddvksmbe6140325u799llzafi4xixaoruxa2ug5db864t3jhraol50dw0qhtnbmp7ntt5zvxfg3i2f9l5q3mrsdz8huhsv82up1dlhrv2ope31lb9nr4ldqyq7krt0jo7kdv2tcjrpy5uhtgq2jb7e20pmwueghr21hty9x3wrkk015u9v6hihnhkfxugg0rq9xmabyat7zmo9whgzv8zxga56j',
                name: '8rn81hgyb6wd5ygr5uxfjouqsbdr8dw9c52yupy5tw0332ubcgcg6im2ycajgn864bua0xpbemv2mj4pewc7v3f2sty4ftxy568my6auqv5jg8g5c7y81nmlgvye3m7mkneg14b22p8zke4keb3h4b9lehdu7o8tent2i7qqp0sxnut73n3ky1kutgau8yt6h62k55nb1007zyb8ib3egip9t4d7nzhx6e4wsl9v33xr1q7sfguijkgrtftw2tf',
                surname: 'b5720fzkpu5afj3vn5j45qfjwlgylucy9l5jxaekkvolhzwasnn0dp4p53038gq36zkmgsy0vexiuc1dnc1lmqzh8pnrgdbyvzgnnc5c5vujcc1vrfl8qqylolqb07u8l81hdh5ncgcd5dh65zcr5irwreoxhqla7nydon7noqh0dddwjgtwx11eg5leyytdm94s565obl71m2cg1o0owopa8lblztgjvfx7xq3rdbf8ca6o5rettodx1s4fu12',
                email: 'uyh2cwjonh4gfuf45fd0bau2p9h8roo6z6nkjdn3xvhtgivozu8jxuayj2trlqb1oyupb2qzebld8oqpbqghlrhbba2o2ukr243tfxrqsi4kolr8baosnfpf',
                mobile: 'iruhxxpleh26la3q8wwoypefsrmvoucfayyoid4eccqfmw4y678nipfgqqdr',
                area: 'wrqj8ohmeaed9262vzxqto0w7w10hdoygbj3sn05snqfwpx2j29wzpzu0juh5xj50yb6qps42x5362b0p3dka4d34okfgwpifgs7cr4gvywatnc47rd1r55nw7heifhl45whhkjw1veg1f5i33rerj74cpz9ymyo2sdz4unf37m10bvkx1eylk2k6l22k5ge9dwow2leuytosrjraz37zuac0hl650smyyrgoupkfhxvt74md6hxfqu8nyskdj7',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'son0ndynl7ymlkje6qg17uejl4hz0x2c2hagtr6uw0x1c8wl6z',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'eorl20vifxopf4p65orxphzwtajz7qrfymnp4eydaaz4w4huzuvibptgcbuc3w7g9wv4cxp3widhny0h0h3p5xe50ygrqcypt7706lnltoqdjnz1kzojdaubhx4lsq1fv87j9xd22y92j9esd0mvaawaft8r3zwth7jodlz5zoxme0dwv55xfqtgj3c7np0meil5l25cxv2afj9bn27tpul5954570ut89mb0bcsrqm7vwpynp1pw2wuiwyce4w',
                name: 'jpww4w4tr60frjyfivwxgiyppjdc5uwvlc0rrim9on7wojzer8g2k66avdc8r02tcabz1mch2mngbctsofhykz97snhmefvih61qqypcywjcskiqnctm54un0gkaqnd4wkyjfn2ncwfizhx6ny8f7crjs7dff1d48h3d7k0fj0ssnmu41to5w8emasm1xq1nhbggzs84qp2e6uecvu30cuzskju1wicsyusyc308wok4kez7drqrdo7diwtf4u4',
                surname: 'vk19f2362lq7lruh87etkq6imrfeikgketyu7q2rbkfperg7w0giv7044j0qw1w1i68qu97dtz3wc1goiocsdrvyvrbf44tqticifrs1zcec34nqwp2czjyr3l5g1bu1nywn1th5p9gudkkksi7sczi0ttjdilc0xg1dirtyrad5b11dup59lo7nm1vahxtlcn61mpfw4gp63d1syh2rb72xw100vy3rihxhayyh5vhep0n0y6v1hxnks5pmtdf',
                email: 'kfg8u5xzy5ackv0wxh7fbf9i9ix2j0aure0ti71iigv7qow5y0sys11ftkh7y083y65t2sq8ggco8ms55yez9jvre8puf1qwrk4yfw6hsr5dvcsckdhng0sl',
                mobile: 'yk0efxi7tfxh5a342m2guklbjsbfvroewmhe45p832e6npq6yalf9mztflyz',
                area: 'c44evuug28ebn45g6s3w1so5089e6xbj4t1a1oq5ews7q2a2vk5b1dk4kvwz90qearcp2rt2xrjft8alho1fm7hqm9p7mq2ts1xx8op6mq1tlwh31setzl6ljeqcut7qbsz1cu57wul3jmk0whwuwpn7op2kcbcrr5rkx15i3181atnyobea0gom9zm95rd8ipzr1pjjp4uwnxqnv8knq8w6wuet79s7yuzp6ds7u9l24xyr79kkfi6aeew29s6',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'b39332j2d9qdz7pa6n3tgi2qn0rm9a925yawyg7u0pat8smewo',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'l0l4fszezt0oai4gtvci',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: '11t93kimo0na337vcf2gz5yvlr5uaj5pee91amegyw16jumeleoida24aeo9yotudi9y002fyd0ncvguruol0r1qdlh6lafyt7k9xkh58qfvblelbpavr6i0zd8vly7um35np6jxcjhcu89nwys7z85y6wr8zrzlwfhrldxa99nr3usgyas9tdh7ul5aeg2sdvwwx8wnf1tbkrdlnoc8iir4uz7202ezedpwelrprqp4l4nmnpavvt75lgiyav3',
                name: null,
                surname: 's1j47x3mwa98nwazknbgl81m5ght55r5qcr84jrq80w5e80mj6qi2ue9umcyqr3o2jgist2c4sv0mutn5k3swy0zki3s1mb8f8zaeguzu5331yd6bnk2jw5u3luvsyxlpfqgixk5yfil546boamg95gv5oe13nai01aqo0hj41s8proy6m55dfe98k5wdgwe4rzpx3thyy66e85337w0lau3hehir65gjrb5pdr6sbrapyms2m4d3b03okc9ocx',
                email: 'wild1m0jmwd2ljpr6aiyjij2y4v21jayebjdvat57wg8ie9mnz4qgpjxbds3a4erilbzswfzc9kb7dct2g7al6ov6tpemra2dxnwaxt68ru80d1ztbj9y1bl',
                mobile: 'lu8xv2p8kb60guowuebjhfll7imd5h64bgspji1gmveomcvg47objovvylqi',
                area: '9whg1d1hai1ya7bdx1rsxt0tczutj6v67gdal674wd8etcvzdjp8kss253ug6nmk1k80wmuruww2d9ofjvc5hf2ggin4tqlr0v0ol5slkagysxxkzpmhy58oscv7hlkx25aztomzfj67hq4ceqx4ufr6aqosrpmifxo4hsfuok92k44np2zkuu07szivox3sxjczpstzd3mc3nb7qay3ljzd2muxflgcgf0j8jjft9h926s6bq2y6jqs76k5fmg',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'l5eznnutqtnlgdmb64rrzl9vblnntx8ubiqm638nwegkjvegcv',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'qcewptvejzjajkge1ti6',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'y93vj36zw7fki6zcmkxhvr4il28pvty2h98e36fjn2xx444te1e4jl3i34g88uh54ql4bu4qkx4oqq2pl3n6ba1etxat6coqamgz5ojppsxr6g6khndne66ef62vgikgl4tza9elu0nbtkq7rx2xa7hjuxi86dypyn448bx5zsb51pxuwpfud6n0lauw0kwzefjjlct8jaxtaid8ymua6lmqky4vm7ehwbeuuh9ndtfrvj1tlcz7218ocrkbw18',
                
                surname: 'r5543ddouqxw4h1zyzow7a817znmm4kp4sumku1fyv6dwl7abca4ajoxo8po5iommsr8al6njo90y9kbuo40ile0elf54o5shf199bi4crur3ja7r30logmysf0wv2gekx2o5p1rejl37x45b9ph5u2df2herd241d50my0xy784iuj62vc4jzbgilzto9xbfdg2v1h1xo873xpt068csq618yy7ywki46otlvwnv4kijror14e19zriwiyyg8i',
                email: 'j7s5x3srrs1etvboyhwiknpv23pvoajn3xq2paq0ohiuhtx58a5pxo6c8zwzrx5bg5ojqi56jgcrhvz5swkjjyb20grdbbp84ncudm7rrjreajj2exg504xr',
                mobile: 'atwchpme26ichaudg8wqvirtjihispuhz4drxok6mew20ubmjvzxmgt1c5zc',
                area: 'forqupuk0sbpqxmt4z72d52qp89iujv8m5ut3zzzk5xmxrgsz7eaxmzrjbj85klpmx83ipsjs2k93320c53demcn3dn5fxn6s8zmh4qchpbeekdxbta8uel6b75galglmkou6joocafpdpwks5i2744vf60sswx4dpkkl05y6d9ahuh2tmjl7y0y7rbny0glm1vgfae7ttdb5h5y0bx4amdsn23ln0snz19frj97ndg3lq9t12l95bp1cqjkwlx',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'adeohsce8mtf957tcvse7vhu8heipmznmithdcnb6ndomx14q7',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'eia5dmgl62xcpjxb58ag',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'w027uvw4s7ecxsi2wgrfen8sucaqkws1to3jv6kskq2n1dhy9t4ed3ppa5dy6m806jb4108bfgub4ifvgvvnws5p8ixb7yp419p69ar1tlybkfyyole4b57nfnhdv6hhm6rptovw4uvv78u5ijkz15dsa670j6ipum58edd29r01kpu4j9u43sc6ckpb9yq90khv43gqlqnhlfbc2uuj3abyjzb15vcw3qkqld7ozyj597wws7rv179pcx4jy3a',
                name: '0pk7eflac21oiiqaz22yasui74fs7pxgdyce9hni0g6vx0v8fmh82vsa88bqcjc1xh019udn4y6lnqur8ra391xyz300h9i6wlmvdow2tk8oybsp7rr412gcwcgk7so1dtauv9lmwg999e83rafkim6rswzjn4fc60tzo6bllzbn48t0vmpdjs7939xaqi3szcs2ewbn56ck8iozt4maxpoj120cact7oscbq17dwmz7ijgp9p60lo00gw5aq9r',
                surname: 'b6o23oudnzgmkxtpparh3qtadempr2eemlh9hajm9ibqaff84tj48j7mddthvrdxdie8sb8adznizw9swhsy524z96ysitpe61icr92oyrq7r2pkyi2fba09jjytp2tee344irq49eryesi56897ll6kajiwhay0lkteteh9v6daxz7xzm0d8d2ljp0vdtccc025qxqz7jytwdh76v10iryx42qploqg6m0d5h7m9stzoof0mf7fr0vimd3kyk1',
                email: null,
                mobile: 'ma7mageh8df7ahupukrxp6udc7d2uv1zovzmqbdhx95ykjhwv29u16mvdc9u',
                area: '51ajvma3ydcatx0rcc6tuj5ibqz5g7hyobagnmurypqr2t98vd4mcay5011dowgg4gk2i73a36debu6ish4qm25utz4d4dmx5awvub78zwn06xq8ezazbn6zvgmdqgqwc99jfkdw9x8rqry140y4ehrwvqo18i44vxuquuohgry7w9rlj97x2kefady5w0074f3paeiy9k2w7lf5f3xeyo3chgli2ir6myq5d0jorb0ll3g09d79dy9yg9b8s76',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'ss9nt15k5jrsgz7dbdzx08264fyh58qoo8f0m1vh5ccgw037r9',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: '7dxckfr3v27uzu90su62',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: '4jycop7mcfznbrrnilfczus4j87xjmqu40trt5eclk4o0akjx18u4otp8tcskpw24u8aznm23jmbjlg2qp6aeqhj5m9zifc07nkquqm80bn4ehcgodx0sm91f6vkbf0yw18g3ecvczjqh8htfscsis6novq1pxy5ge34aoyder2uy6v0ydjdtdfqipn7jo46oop7ybwldl9ph0hixoqft0ibqert37f7xo2d7no0yhc3ag6nyb3fwtxifn32stk',
                name: 'lbt5rmw2f7bshjgqnlix308mj3aywo237ucqy70ldl0azqiuctb4fleq9ve7q9k64f44dpek233nk8jdfytuvafgfehumo7mvcv5aqd7rudeks5ft4rd4slxcjebbce56ywibkpi3ip3ra59dla6igxz0refbq1zu0vdzh4wn7inxvs43416v4cv497vwsqi4ublioy7ao7g9dvu0kyn5n9b684f9im7bwatqw2epwuff9bf1t2my4tl2b9f4mz',
                surname: 'uxofznk3f1e5ark2arvnkb456uz2ourmucub8fj1wj7531lsjpsdmej1rflvhjl30wc9h30wy9uaz4a4g0fdicoewpvald0424czdmyqm7n5ld6qgy6poxn2nop3j1cfyq1kr39pvlz7o2cpehuhaeko37n0elx7qil42iprm6zb7u6uylhiuzmxlgjt9m1qevg6dcyd1eth5utgm83rm96h8xemjo7yrn699cpt0xaidl0fqh0i7gp6xrz9fkl',
                
                mobile: 'd1jbdpqsbkq9nmntwaiapge1m6xiubhta8tdx6qnutvnac612citaw6z9qwk',
                area: 'rnhfxgemyalqvilm8nm5hwmbmf4ukw6e5d3m54wcbrlft78mfw35ogydblgzsw3fmnu02m30hn2ywcz0gomgbfb7mq1wi163gpm97u4egkhqdv6vchmhl2z4g15qs1y7o7xxt7lhamnb2hll6lizp341c01fadd0xzcdewkab70h3ruijou6uqrzneckojmkcgmoo6fvcc4110u2imulaq9lzo6yua3swevuv947y0idtl2mma2fshh1gz0rhuj',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'etnpbw7b7b8ijisfg390o4akaxxabo99oo9ilu7f7ba5op3ymj',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'lmc0gsgj2b0togcx0wz8',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'tjysokd76oua5kpnhz8f6g1pisamnuf98ocohgtrbqumj7cr1i8z0fem90hz0iixtwc5ujxix7gdexojiwnyr7d4z8hnf48kqduy36qugm1zuqtahh57ywhy14zzpi0gcmrh6fzw89feq3j5iw2htm8qizp00m65bgkj57jafw87zb32poimnkiggquc1w9myum657e5bnqxvblpyuk9l8jpbda74drrtatf2d0b1pvismr1o27n0fgykd4tjzf',
                name: 'xj8cdxe4atfwextzv6n8s123w0neylbfk4f4slwmh2xz4rirqhku9nnp8vq8nor3unktd5vkibkz8fzksjes3wuphb508v743icyakb0cp9jjennkvw6pwnw3jlefgoqmnai2mefcpfh6fho0dlo8a5tlvsj5nqcvugr52icow4smqu7h723twzhixzfslu2h3if07cbvemrmvs83w3mwls5urcpn5jy63k0y09goxxaiwubmgjsm3ll2yy5uxf',
                surname: 'gvtg9dctiuxny4qqltwgcjp1sluhme24hxy8em49kczt5ab8qcg7yfqn81srawmy0b2bb840kycnu86r5m3dpjzd74aqbcphvx4z3hawfjp9yq6phhtrd3jniv79qp832oou7lq21qarhvefmg5geed6yxm0quel9xoqvgxv6pfsoxfafq0mq3g0gg5s0spjgrhk5l4juvdxib2pnsu3pzfjj4jrpi9w7739x9w7ibn0yprk1saqxoigz6ose7z',
                email: 'q5iyleikw9noih1oacscg7q8n2m2gxjz488fdl7chcpqlypo447k4qo02pbry41eaxwak6vxc9kceahkwd7czj2sacpbcsm2o571iwro705qgq5qx764yn8c',
                mobile: 'tj5uwf0y2v6advg5kih9ma97r872bkdrtwt4yye17w6ncqgdamxjjwwo632y',
                area: 'f23b4t0v0f8r25cwvblawk4c6l1nrzplbguci79l9ae0o9xh686h3jpy2n5krso0zkp01c58tzvc68g42z4xlgvli6l673o6fwsm6vg9xssi5anuljfmxwqcbzq4wp10kcmrm67f3w0j07hld53cbdo3pr4rxt6dq9ypuqa3tbzv5nf0h5wu9hgl4tvrersf2hu9f1fiklghx12euh95rupi5q9ohz5bxxicmtb7ha37txqujb4vmi75axx9sct',
                hasConsentEmail: null,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'z3nrotjzhkbdalrynjdgh7brzks6cszd8p2vjg3vwrwtnf3i7z',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'w4gg3wn7vpkoh28175pu',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: '20w93mjshvcenj7mye1g7g2vw9z8ngh4z34ytpm7fjbwxtq7co4atua5kl48gcskgflj2wjkhp7j13b2pqll97h7d7fcd2ap8nmcq05mlmdmhzbgqjr6sjk8zb0itnrsuwoz4271n9a1hhuo7569c2bi0dg92bd6qjlt27zp2ivrinukpus8znjrtczxro0wf92rdxsuzrq2pgc4y413o1mzao54pdrzm8c6a7zw0kekoik6fbesu6x6owyhucb',
                name: '442jni3r9wai0jubbewv8lh4uu1hy1x4zm0w5svua3xkf8mlza3yc51qy0orrucaj62p25r8irbt6w6njdazct2ek4fbyjx409qexejdr0f51bw6gyspk1c9j0bkk1qqoxinalpvzebkc5tpb4m2ib0dq6uddylxhittgh83d0aljjojfib3cq7br34uqc8wjozew7g47j4ddpg0ap4l6x5q9c5l1xc2r8psppxtod3sl7t6517e8vkmgtfkmxz',
                surname: 'zexe0gytpy4x1br0g3ja38mv8nms0vtph3ngoh4vxv2exng2v6k5tkzq9j6iv5w2aog1lia67su4bvml93di3us1bpf092n29d6dgovxb8b0ldk573hpaf57356i9z76q9qsgeyyd478t2swto942yw60e9yojlqz4tm77v8spn9tobwukbwzuz2owiglfg12vsqvnk7tntrgp9fv4v04w9epwg6pidussvfagt41vsvns4bl1xvb4jmj235n7g',
                email: '1cdwruljfyudwejk02owor2zns1em5qbbc6wm448911u9ctiiuxzfwkhad7v20gn5z6c8b0juvhhqjqwdp3dnl533bvsyczx1ognoofyj55v6xkfg6kfpe2p',
                mobile: 'tfu28rnuvp1p1nr8286ob1kzuvnn1b9sojngq5xzsv49a5pmfpqid1j29de4',
                area: 'cder7ivt5ej93r87a115od69csks1pdovnyg1bdvfio06tx6pfsbdklb2rsrvxqs83sxy4ykumkdngzo9ue6jdiag1mvg2fdrgz9gj6ovfkrpnnl3pv5nev7du2lhe2yi64zncjozh3y0k66064opgtrrivl5gr3dx83awujmsz13bo96n2vn9g859c47otagrd9gkznne89bl286zzjntctakvr89x6ho0qmna2iyf4jytjkj3w9az67qwkh44',
                
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'i7101wer533okq10cbrkmyo52zjw1ywpug7rqxlwivulnzvayt',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'srdudym26nagi2lu7ouw',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: '1d8bpsnww6o67ikdgkya3x1bxyeb20utp3ssqgd2osot0u0ee9v9eknlz3gnu544qdzdblhdtmnb1ds8f71b46j8p0024ogxt8zltssfug1f2us19h5cnfdbkomrjyr5uaxjtsriduui4otx3dkf0a0zcs0fvurf50614e44w073x5928a7be3gjco7np1fllttpzxq6964ayf6pil6xxgeilerm7bcoyefq5jkfouzwva7ocpqwurgigvq8i9e',
                name: 'kj9ueb53zm05hkkcy993h55spl6zjquproc1z5xr72ycs0se5f43vbfdf5tfgrctzd8f3io9z7k5c2or1n530efbt6wc9yaweaql3rjy06n3r4z09w43hw6a4b2z3vlixxt8xif8zcw56j136bwq6i0if7jwnyzivbqxgg7wdaxzrtj6xlcducvf9ruca05fmceu3a3oor1rkk6pv29mkom0wskjis0n1iteofqhv7ng54e16c4ydjwzs87w8qa',
                surname: 'rq5eolegb2x360ysztdkil6e8ue3c0gybufr8tfgiu0danz52bxd8f68usy9ttqsrl4ehxf6adbhn1yx8qzbzfv7419yqtdgsl124sp56efftngkhsm1xz8o9fihukvns1zu8vtinfa79uelsu3af3joxe03i3nba2uqfqlqpl3mi9z6yu1d37w534yfndyfhidkltmuwbauz0fiwvbkzcor1nq2lmf8120gthjki3oqxqudacz15z5pzpgosoo',
                email: 'wbyezox7witcuykdipv3bvl1tiyizrjsiht5ibkf1fw3t0456gs8iy2fv275ch2cigmweuz9qtr2qjcqsfwrf1y4kf065wxzdu83d1x0hrg7pyd1rq35vl5r',
                mobile: 'b6ajctdo1n4uingxvxc17fft5k1me5hgwrlvychio447tdkeg0u3ujv08oas',
                area: 'd99h9rx0ezzrv5awts97dlcysqot15gsmrb6miqc7wpa6fub64fs9jw60j5ltzrzegwn0jy4ur4stqav9etrg84mr623sunmboojoirh3k7ruhwu7m8nqxpaixk10rdxcutwjigonstgxr70wegw22sm8b6q9aa3jmsyrnn8pxrzs8pl8x7vw94buerq8ojrryj27f90mlmapy13kymxo7q3mot9kuqrd5j2uxl9ia3edrehkda1uwce02ogiad',
                hasConsentEmail: false,
                hasConsentMobile: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'ejbmlx3gf5s7axgjjc40ppcsz9lq5fne9rmexdjfqupdnyzgmf',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'guk553uaarwh194qk5j4',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'qeim18uli4i32zo62k5s0n6lfkqhycju8ey447ynddoeoa186r2yukszsrmwxrqp5w4td4vjlrslu1md8rnhthj8ene0zi84ih0bhdpp9qfbdvvs919auchyzrdcntl2mbjdqu8bb3mssj1spponx60vfsb25rumipp294ldlvcprptxcdwdy8kp2wqnurvueafe68fv6zg6wp71k38usqnwasp6p6rlgn7bcwk8upubre0iim7v405ao90n5ln',
                name: 'tmryxvilh2uo4u0fy3dgc40v4flljukm1twi5bi4wszd9mbpu8pekz9cwjrxdrtdwab20qbvn86rodb3qmshsgv5gqgl335begagvvsbd3t46hc9hb8oz7quac3ugs573ilhxs5jyzjn5zxsnmtcjjsm2u3yerxo3t6o9cewlot38m85ykztlzb4ugrbua1xewwl9x902jr4bfgvao3x6nsp37x6ogxvwoh8du0vite2z3nfk8jjn2xme5a0nuk',
                surname: 'gpoy2ar070e9xsv57lue6s75log2ppy5nc67yuub3m2862ovt8ufiypdxo2lsi4w7rnde5goovtmeg7nr4ub70664lksqlxf4dnd575omcp4xjd04ei4777qke3dv2ptlymzd6y9u8xzl2ez8q05lvs427b8262ubznpup7wgjgklkk6dx1jqngr9kyza7dx0yr6gf67qu3dqj88qi5jkq04a9lfih7akonn7mzhcr66h5r1cxodrbg06vj0zoa',
                email: 'jmsndd3x95em1eabho9tdcuwisvb7lm5x9sm57fzycxs6m3s9f6clj7f56uyezfzk1r7cuo1w7hn3lm9m06kddbosw2jvz0z6dri9ybg7byo9j7rrwd5g57o',
                mobile: 'iox1pr0f8ef55xgdonm7d6r5cnpo0a9gdwzmhwaxo19eojwgkqe8g3twrr54',
                area: '09psjtezxgurx3yzj3mikbhflgf9c9wcybjxd72qasqyyiiuu916o5dbax5zs5k6pgxblhc9941q4dya0zq79m2kutoame2oq3ltyy985td6enh0druukeiqny27d9wk7ejp40lhdirjru6npbpwl47zs50r3p5oineb8evy1xugna39qvhrj1e2xraksrai09b12359ht59tazf49b0lgl9tlgqpucat8x8tphciek5ta5nnd2igha390ql80j',
                hasConsentEmail: true,
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: '12a9r1q3dv6k2rnj34yotprk707p1jxhv45w5in7f34gvn0c1y',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'xy1tg8b7r1z1evfpplib',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'j4m5rwxyve6ijs9q3mpnr5w32gduooljia7u37cygzl4fc6gb0am4fyitwdvvifa84s5pmmpjh9mee78hvtuo7b7m1yvqy0fhnlm3yy02kw6syqx5stybei6p24r70yavadh211dei3xs673jr2vuw73ny6euld5vejrahpvctqf2ll8hyjwjdxi4jwgilwxu4n9nrtztg9bklhr2do9oleg9chufyzgp14i4mebdgwl4sl9bm0auv9zxlvpj4j',
                name: 'l45o41kl40by93vmcob41mldj0z1b38arsvi7kn8edwbqg6o4tzo5a936yi41fkma3e87yciq6kznct9ltu5e3n1ine1qj2k4m8lfrl8upbxzgabwtfuhnc1g8q3n2dvfnc2tjfd8ka9uucae9lfj499fxlim1q7uk56xom7kzy5hygiedv6gjkkr1du30q6nn2ofezz20jggtcyt33thizbu1mwsk50fnm6x9sb9uypct5332tuhl5r2i6i4in',
                surname: 'or1zxxh0tg0pja7vr0kochcez02gjm0juc6yzcnjff5mrcas13hcxejac6qaz98q89ycu7vjtpipcto3wvd2wq0zy2hk1ujlr8y5ji958l0siz58mg6cfw64w05o92xeigs471093zhvchfioyd8csymjf5rwmlz6u0kvn32w220qmmacv61azjitoqf4brtydroz2i1b8wurvco8acsbi0jljc6kx21c47460payuv4walw8teepwhtf2mn0jh',
                email: 'hw98r82rdey6ol7azi23ajf7lxe28xi9h5wyflhd2r72hvufqk7royio9pj9qxenrntv7pdc8xcqngtdve0eiobydxzzz01mf2xinjldwy9dzwdnrrzy8ra2',
                mobile: 'e5fkjpwwknk8p91w51judxxlxipj7qg5efrusyo77rtbjwlmmzeu4efsfwgu',
                area: '4d601n2amlvajfuwxs7icplj4rtj8o1uwi9ufex7gz6hksdvc9qdiq2xq30ozxc0jry7y82pshz70s9ixz480h6plvozly1lfnrl1cet56eqg57m9gb4adcjinm2410qlp0lcahebixd67p0waurm22z2guw8n8tbdvldtdiysu8i1m61sg1adkblxe2wlqg0rc9xk8sqyy615nyz0jj74zh713f0n3ge3v55vmvs9gy3xetnzfdm18pli9cgm4',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'jvb3p4m9cehy6b8vaa9crp84zm0rjgmrsz63q2sgn733e77ayk',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: '6cxm4kefdb4rboigy1v2',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 't3lapvpl4ia2s8l2iofbavmhttp3cnjzooktc1098ns16r6ympv9g7x5fpvlqx2ew8i16gbpdh5s7c9uv2exeo2xaoizxflze9hyr1vby911izcagqku8u6ppts66liuch29fmz9k24q702qjhbvl6gvqpv6155a0di3sjcnpx5l5slz4qq2uevcka68kv2q54mchkbtaxyplfpkeeyf024kqgl3yl7kuf8ocx1e4upq8b4wraujklgzrnn3b5m',
                name: '8wulcg0b2b4d42q277z9g7b6sirtwh5ezciw7mikppfg49gq7bfvdykhmikkft3bfozsuaesdm68iz7xa8pcrgv4p9n3w7e744lcgcl6abanz6fhon0y0kdjhfnldhwxvdthbp3kej89ft7p6sbp854pqucwnafip0jvgsrb56sunvh9pdg00fpdqvvz03s9jpxqgsei9r46q5pa0eqz158313tj8vi77idh58w6u2s9q1p4g7tipnxnvswbgxt',
                surname: 'qbr3zgrvoofm2fa9euu2qqpsgjca3vhv8g7miuzie1i938808gupg6p9dgdmht56icmi6814cvwzb35vywqab9k5hfb4lyoqwmw38tf7uqb8vt5u2votfu5s8t3ab6esvp0gk7ucbayxj6oa4w7vuywfjx9rtv4s64haan6lldgqvnsl74vng75512h2pd0e5o5r9v07yz46zn2a665f4gxnu2007tkx0ldhb13w80bdgnp7p1x5afgoyif8ga8',
                email: 'mpoai820oc2i3cvn3lqej2baiec6xwy4dw64exo50byejspm87l0p1ac5yz7ufkbqrp6xvo6trqky56hvyejdmmh9je1evmbkr8njbcc5dggwbponh1a3yzr',
                mobile: 'um71n65i0du4esl2stp8yscx9oy7qdatycer4zgbjjgpuey2x37uxitfmsws',
                area: 'uq83al9vjgw29qdd7mngu1miyt8cvuq9iozbot845sk2hy7d9qlk0o7oi4ehnnvtoddsl07r4ew65dghycycjezewrkoadzwkqet31nl7d6l3jqnqpzqi7xsubjtesezdfgauay9fly1xmyzuhy9djjmb37dapzonqpexb1qiu7poau4je5zbmmn5za2cjgn4mlwkejfjtkspes691rundn4cv4nmuwq7t1f2ur11ngvoqrma4d1hmt1aataux1',
                hasConsentEmail: true,
                hasConsentMobile: false,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 's77q8yf5f5c1bx3lsteek7sh78uzelmgynadn',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'evccbed3xiw1eboih7bgh0v1ro5x4g0owmklapnxg4e2rhydgl',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'fporlll4wma6qj3wsplj',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'cw3r698msckyx0deyxfxi1jg3c9scjf8xcxxnv73j72chkli9v7zu8vcv75iykqygtqbeg61lpyr6vjjq3xajqf6y68wr0n4d8b2hfs3kw1ew5vq6mdcquqf9mfi7hq1o1ack0g401pi50ohpcq8oubkera42vpw27pax2ycglh3oo84meh4bmeodhcpjzcnqyhdqnl2d05zfae994ymganamyrgh8j8qws1eh7mizu81wfcyg62enxqectm212',
                name: '3ckh55clzr14nv399u13txayti0sjoj9tl4ti7xlswqqae70dplctadowsrawyjq7v934yihhrinmmgqaix7e60la5g2341zdw9jkxzk27vyowqd63utzeaefxwtnhdb5iv7hbckuv8o6zk5tc3tn48c1alq8ssg4o0g4nmxuriofic95ei965ypcoef8ec0o4pmtawbq3z7fgcsk6uz1k8uj1djqfe8632whm9dnj5s2w3ygp0m1b6fyen2ytp',
                surname: '2j77i40t00pputlqn2rt941bbao1ksven0almn5t1nmjas2nv2fv0wfq9wxwl8sgnd7wiphs276tzdf412y5j35gk6ufvuo0zl7ei09dtcajc5yakq1x2jjacgns4ckklhmdgdi5xexgk03zc1p7amvwnhao4c8a7plzkgu3mv029zbwee4ly4zvvxmzynk3g8vqu6b8tw5885xw6gic4bh9giap783k9so8d7g7tghnnb6bxold3n8hmz4nxnp',
                email: 'jf7993p3vbug9zx0ittoau7hze87sypcipukwhx4js8di7i4t6fnmuaoo1vc3mnesyelu4dl739ayj7389udczsribzzg9nwjaphs21w4fohv18u0bafjahm',
                mobile: '5tzycj3rw48ay14jge29vq7vvjhp30f26g3ywfemczgbf8mzbyo67bdp9frr',
                area: 'ptlxjidmi27cwu4ucva7ud4h3zxhuseyqws80d228av13msewk3tnoxft4491hd3u67hrm0jwinnahfg3fzenbo0vyznvpy7neo3fah9lmponqkp9ychbo0hnrij29tm6ladgtvlqbz2w724eb6bws4kqljhpsslfxabeiycdx6k4znr7cwiqa25sy5epf8bdi1m8didiuiubnl0cxby637b8042xzs11iar2c4j8gist5kdurgetnnsevs5y4z',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'pa01kzm667tqs85cm3x5gfjc6klzm5tdqpac6',
                tenantCode: '6hv82983bnnhjgym7qw6u7a9aujyn89x0240kjom8ghuhbtx7k',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'zsod67ybfnep68kw28yi',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: '24q572ql5i2i9y09w97p6ovt4urk0o6dbrhr7it8epxr1yx9oowvsuxf2iqsb9i78gsti4feod3cvz5xw8pn122cqayruhqmtutvna4jgevw22s23y651roabrlbdy2y5pguobbgsty7fks68wfm1o94wcw612g51zvsb15xjdepfb4e8u3nlw9y7h41ro9127qwrrfwp6i3zg1j6mmih9cl3c1gvi4z0hf2agu6lxcp6743ol0manbyytkxcwr',
                name: '9zyci8umegxn1keyt75qlh7bba604stuxwwbfjaxv83pbq76l6dugsoqbau4qfaqr25weu13thljkt65r7c4lgzjt51x5lpetg4si6sgqpydd5ze6fr388oxvvpy2pzmoay0foyy5hjngumprvykyihirp7ou3cgmmg9pxyzceji9iwvjej2g4owv5ln5kntutrw8t6d7ynirlp5jbn65mbe4hkfkjss3ng8ftkk5ax74t25qx0zipc3hrmthaz',
                surname: '5x4wd63k02n439323jddudubd2rv9t9itmc2t9kx2nwbeg2evz9trh7hmooxwr2bador55jbfia27ros1uvlsrtcrzhryugcew2874zouamipc93kck919e92bd6ohd8of0ezjryoy4eqrabcmy8q0nnfhb6jm1vxufnrz8pj58pppokgai83k57zndzh7lkads9a7yz501gjnoixgaqvae7snkog6csbm4nbvkk91imfxlcagvh6gpx3r5j991',
                email: '0elh2pghgnsu7ddtby1j8k896f1xruhgzf66pswcayb86hv87699mlcsuobl5x2awoll1r77ajmegllenm3hqhe7szjizwdu6jpfu9oiyqlkp2v0iirrqxoq',
                mobile: '4n4j6j3ciqvzci90febs7d1974dqt55shjk14q39ug300b23hagzc3f877hv',
                area: '8ymofraxnvhazmxfybrfrx4fltx33omhq09unu427xj33mk6q0y4dpaji2hcgu2yjswlwlfy8ex4qoehdyo0ijwfff5ux65zjw076f3pnqzmuwbphf2jtbtacgnf6m1cblrmga8z7v9h9wq1hs6g2dmco44z8qacrtim9zmshvgmtixxwkwvq80uc3gijngu6ydyhfsqm2kfg1v3lh7egikaenmb8o0iecbvqsvk4alm46rx1n0r8mrrq7fdl0b',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'dmhso9zkdjfxunzkc6qyo4med04tte94k4mbwav0fo6t00c54m',
                systemId: '6le6s3yxm2d1evfzcsl35kcc5e4rr8bil5ake',
                systemName: 'hei9ramp23b4y932p2yj',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'pq8n0hew8hsb9wkwyzz68asxivs7w74qprcgms3rokd8d4jejb5u3d4pa6qh7x3jt8lapm49y0rp8yjv0pci8rfdwf6ul6nd308r5icjuhma5dgg2wgofhduaj7tskt285m2wn8akvhpzyj79m1o6rj7d36j65eadxayzzhffy3mpsc1iy7qhqc633toxhcoi6d2s5qnqly6mclaze7o8388cypz9soh78gdanwp0bx62so1la1nvn07kmky5bi',
                name: 'casw7o9wnnoezubcuin5a4azu0871xdptyvlnixfp066wm8fi8qqgd3v9aq48gnhvwcj71zctyo130ntc3t6trpg8ub377r4zf2d5lr0ow48pgfcxlifgzwi8yehrhgca8rzpkr3x84726gratdhg51pw7ne91gkzj11mtrrpbcvowa7mzr27rg899isuz9pn984f38py76wu3728fwussopv99c4cwa3tj9y795wv10cj0uwjsblqw0x7vsitr',
                surname: 'listno1gh72gqiqpuj08y7c67hod68v173y914x828219ljb2geiylrrcqt2f06bjabsyy1e70kjjh6pvtabr5yyedb3cbksnaddrn6rasbf3z8t7kx07wri1psv3nn7e5vzcchinvtiisf5du9t6bopiho8tq8tfsgkyt4z4v1i76p4m3852ifw1hxcm05q1krzfbxf3p55e3h3ccbn8fdwuaonbv9mxi1bl2wddvwegwohhomt7yqc9ydyau0',
                email: 'iavmof6p0as20gd2hot8tolweceykaqwjt3egkfzxt1owbwhc2hwzvpe9s1isvz2u8quh7jlzqm5jog0dzpvdopuhyme8fqhl02tc2qnlr2fnff308igncfi',
                mobile: '70t0snhf7gt60xcf0bp15pjdebulvbsxpvcrhyf1deavd0uhk1tr8htrpkyv',
                area: 'ea1oa1a95916ol9rrex9lernmce4is070wo6kl3rdo1396386sj4knat0grpjgtifv3lfa6rmmwsprlwlp0t8kjxa7kp87hma7dr3w8bx051rzrgipdz5eeof60gwwuq17vlx1vzmttzge945q90ebogrgwarohlhldw8fb2l2es41m4eijzb8llazbw4o5cdvhuzcsrtq8t5zbfl17xs1s0n8bn128xwvz89q3ty4vgap8910l6klmr5vy7qnr',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'vkltvi7ijwgeuks6iuddkj6v78vmii5lgitrlh9y02mtjupd5e',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'n85nw2ysjofzojxj3wr6',
                roleId: '0scvk6vjl3ahb5kf4abpo7828pjma1yvafj9l',
                roleName: 'm7ymnyuninjut4akfo7zt8xt21t43gmd2yhnmxx7phxb3moje1b78h5g8l480noelmcf34yk3u30wrvoem5uusw2j6v6qnp5zi93uo475550ifyydzi0clnr4icvyb42t700nynagbm5s55et7szlf0ve89rqkjfhiwyvxq1i0k4uasbkxgx62venmwr0q478cnwvv05byx9ruc6w1glxccf5x4pd4wuumb170yu25ww82pcewpfh34why6rcxe',
                name: 'x2bvuix6xegrb24k9kctfrsfqqu8o1xczwj9c6wemgs9ezb27pxytblf7tu7itxcweg0871tl1kbysuz48ezi92bfgksksyupea3k4ue5beg7mvep28huf0vlwbq2gnb4g5g79zrraozcrhsswg4abh7e5zm0cikdxyhcluov2sh1x9mt423r7luw2ecek6e3cr4u83rby7s8ze6wtf805f9fhrip6k9d33t69vd80w9h6glla1506mtdzrhdsr',
                surname: 'u6rveiegtdl3hhvhr1f9f5069lo9n8t9yvr50xa8t6efd93u7q311uxms4bbnnibdch9upbnuuthnws5kzcjfmqtashc3b2y7hblvprp9kz4dxm38bpdawl5hls4v5tcsnfwd26kb3yakhokyocsnai0nc1c71zioor8irh4f2ztuugil5t256eq0cv0d4c7tznu8rkca0ybhf4p5ydj22uga0czvmyfvzfpydwo2nzuw1gxa21o91s0vnpmde8',
                email: '4w1zop8k3qxdwp4ujn1uqs2r8xe6jkpqycwmu1evnc6bfuoqay2hcq28eymlcwg271qkug7c2xjrbzm1s3wcjb7jm9zudu8ffycnvnw8yfnlx80ybm43kbg8',
                mobile: 'oxdupva4jih5822t8e298tdtobf29buwwne18d8oewnuafhaa1yukxnjknva',
                area: 'mk3p909hfh02t20xxn4qx16naya3y7copuj8i2mofoe16mcp42iiztdxhrb7h45l7y37nc2vq2a4w75vi1zqebe96a074bf6ohxpdm51nxj26sbtgbctq253m1crdkb9jy9d4qkr4om9jloehyiwto14fqmdjm93tcenm3j64356089y5has5hah7l4dyt4njpy2lmc5b0egg7coxtiagv95gmjxyo4hin044bya4efttxrcw8a3jkgs5w6bvzn',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: '6t5v5fjksoc10305qyrbptukbf9cj0zrg4oddwc0ojlweoly58r',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: '7rd72bc45ll9rwrniyfm',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'oydnib4ywdfsk43t2mld3gdwkj62gn8glp57jvn5igjoxswjm4avdcbzwudkswywnqi3kst458mg3t8uwk6vlsbatevvbfzx36cceqs68lo2zpxmqkis4tjga2geejk9wukdao1szmomk8z11jiriw0b1d9f3z6dh2y50b9kdefwcdwe4xs80h1vettzscpvto6pvtaq3kurxqddsu9g3kvmjn7vg9kwn4dtxyqc1fhoyhnbgwzcrgki7yhs6qm',
                name: 'o04szrx5y5tmnlxbvaxpradq2wh8i0yyobndqsgqht96w3a9zpd782a0wzrz49ixsdhsffdcxdaf0vpgvhwxl5u0lxpukll2ufer08vwoo9niva4m0y5pt67hf0j3ilyfv2rf4z5as2h5zh64rqoxyd2dcio0tdrh6evtbfwu002xyqur37o3cfpih9uz1pwb44yloh0g7wyi18nk18vrk6xwdl5sxmookz1ryq5zpns4cjcu067ssxxl2scr31',
                surname: 'qirgw78uvy5kjh7lbzeb7g7s8dal5770a8ue7yj9u9rqt2f47ex23ncmv6qlbow5t9099k36l6it2etmp4wg5na6ws3dw0dlmrra1nvou9t6vlwil2nx9hoznxukdm9gfimyso97h8rckjrlfklubkdydtaw6j8w2gv3s4ewuois807830cqzm4wg1i4940b1vu5fjys54hhbqxhgjfjsqbypw9nvwex37lvwth7an10w6i4sm3qdxwj8yjay4u',
                email: 'n5djbtqj3kuz2s5us8bmm7j1x4fq577of92qad37ui3d7wgvajyn8m6dnjrfgza5syf6wmnw0rnpx6hi6ir9156lapp3hcn5jv1t8ywdpjav1i04hvtyz5z4',
                mobile: '51pji5ffvkdeqvgjfaywlfjnoot9qpqw3hppn095trcxemknuhxu7nh1xi35',
                area: 'dac2gmfpozfbbchdhekyfpgrl1ct1euw76e5tyhhoeqjtvrh6stgo488iogetkvbo7n05e9hkf3f28yhw3wv1udp7gdn8kbwsvsxosxjeaxu1jmm4jl000p2in27rxowulpiadf61jgurbvdzjw2tuwvi5rccg3rj6pfxjsmnhm29hgj8xv2pmfajo05e3ompugg7i14lztuqdqwd5a98r43wblgr7c3irfhi2xk0jm7pgwvm6qhdfbze4vy3i8',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'mega3uo566vhzmitysepi3ybz13uc2n8v4trxymcsb2fo0h6uy',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'skhxygm00i7driyhq48ka',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'sm05ukx876zhdqxhe4bjsf190ctmfcrc9vqhbp9doo957elbunv1yuzgh4brepqskh9so9ovyvkvyxgc2gk40zkfsre9j9nvzna1me4eau1c0w5ymc7a7stl29soofagirjhnipfk7wyv7v75bm4m3szn7qm7t9muof3say629v0jyvvgs5xpwgze7sdiskeoojxjxkjwpfxsjcu4u69kz9e2sl90dvm1t2wheqmwtedhsfvah4ka63zkoiai9k',
                name: 'e7gf76xw2kwm24ltraowm0oqzp7tmo0lxo79ii0d37du4372sa4uit2ym05kynuu4lo00wrsv7sxfizffl8qyrigzfup574q4swsnzr9dvy016vb4qpvp2zj1ymu4dj96u9c1rawx2xvxcb34ziw4cuoo0vwzjckhjcbxb3eq72hfos9453ws2rq76e6xpkqrrveui4hgpmmdfjbwyc2wur5xvxjai5rrxxc5am5yhwl4rsmqr468iptftbg6qt',
                surname: 'xnr26eujrs3hvbneujmav6saylypfjo57wjrhdtcp9wn8iam8swnv872yf2yoagz0i2f0lnw2wqxackf77jy0xhus9xtnruztk4dpw17yz7fcohips6j5ra1iel6hnyyedxiuoqzk3ofd9yb50a0q65rjsollgs00oq3gsak3ph4x8ryu9u0yb7car7tg1v1u0vi0rudujh8lpsnrr5c2zjnvylg3pizb1pjyromopg9wxaihr1q0q5twkujwwu',
                email: 'i7ldwmj6n8ftq6man3ktuuegwnvknezrwheuhczfmhzmzha8iimq33q3nj8798yq4xsf4silu6c63eyasbqnrlcnt4jvn6dzzkzqzeytq3kazuubtpl9nxke',
                mobile: 'usv5nmx7ovjf2p6bqrixn8yw54b9c57xbpog6a90q94wpqsrezgyzycjv2gl',
                area: '4hhqkpy1aerym1lel1jfkrln5gft6493bvyuplgeibd6y2n4npqrhtz7dvwerbgkd7x1wz587hcyqgfxph6v4hwln946ezfzoh0bjc6d5ce72jk2ep9bklxazxfzgkagv9vyt0xk0j3zj2qqcmt3gfb6kfxlsqklqq2trpl6icewntub6zxh2itsp3jsizwe1iqzytzglpb7vmaej46mlqh9n5gips55hkbd20p0eohvxxpkj3lmsjynagd2x3x',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'ah2gid97xvr698ixes8rbt6lut7yvvmhmfbcxj8soeadjfm509',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'fzzfppk11rijjrljby4q',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'gst5m6mpa1q8p61p31tnofmvkn3xfibcc72mm7guaqsbl6pbe1clb3gmtx0ysgdg96unxuvtc1jm87s5s5kc8c9owhzjc4ja7x9uldn7jvytrighzyx8r1lxrrgg7lghc4byv9xocu8mcw98q19tyhbcq7plcf8d5fp08yhjaqlovvtn8b3smmz2aqqdp0nm9wnyvjbxe210a3clcmp3vln37htu8n5pcbcviu6lm88hf25row0tlm608mm120hh',
                name: 'h7mv6t1s46kpwt5062r6b494stlgg7o5rrn5fwvprlkni4zzh80pmcv59hxtlijoyihdrhj3wymv1lgt8vx5qektt2wufhmj5j9kgjwln7835h1mld94slaogjvinujv8mofnruguzi2qjgslt7y5kkqeouepcfyi4xmsrleuf54pep84h0p68sfem79uf9hlnhkqo91imt0zsi0ncuuqp850a3gs2qn6y9y6dz7aqzp1dn72piffldj8a5eogx',
                surname: 'u48o98roa7uvte10tx21vdzc8zz7rkicbm21grr6y49oibqnt6jh36odxl9uuduqtaaltdjy9fwtely3c50exhrs3k9ulhwwhd2qs0mnrv2pe87jk4hrkmjcfvhkpdloaq88pkx40x24apke8upk6ooqd1ae2mtz2jnventl2rywkz2oqklffmvw09h1t28nvimlxi60mpjbbe1twju0hg81cmrhlv2kta7u72pwn21niyofi6xf1ucpae6a6f3',
                email: 't6xemy1jgqp8bwzm0oe7krdy2hmggi2po4dkghba1017o5jiio8ifrx4f0wcq950sd1a9pcu6l7i4i7szzv5gou1y27ppmfxh2421g0te66keoj5p7wlsv40',
                mobile: 'ty2gh58gl047oyip3vhn1xqvo2dbr54hkcqucihk2hdyibda6c4oe2g2skop',
                area: 'ahynmqkmovp3mb5k331v3cwn1w14pm7i9bk393rg2xrxn18n7pz4xcksefgfa7gl9a5p64g2wluaqjq7g6fvysb0p0ctp5leloudrsbvguq4ijqqxg1vw6j7gmd1rr62aogl6zdc5c1v59imjhrfowvr0eo4o9i9dcxuv3htbvs9kmp0b29tbhnpblrb5stmlvl42fjy4pfkztgsckx51xtsv84z8oxauhs0l3k04fxv0ysawvdxwmr6khgqs8l',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'lirrsl5ysg94dq7iucvld5aiu0srphq16wn58mojo8suqq8ste',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'le2lskhhjxlccgd3054l',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'm7nanyuqxtefye2jb6eidvsqj5dc5pn13q5cjr6jgleeljo4htkbnyvlwefahyjdclgx8ghrs180runqgzg9spu8lvxbmchfx4qx7mqtmysqgl7cn7x4n8gajqsb23s9q58ys34f8ui6wie75hzygo81eg4gd6b0atcg6w1ts9yx2mdyisalrflm1fh43eg2kmdr70nyidrn1jnzb0qxkvmt36btax9lra8du7ftlbq5s7693zjy1xyxd7d38zk',
                name: 'nq74cdi8y3jmiw9v9fjzxwsa9k696h525efq5gysaaf4mpdnofbb2don3fyzafgmn0zs1eyzprhulvhty7xi4ilu2e0triof7tgir7e8rgtmzrd1ow2usnz03mrluh4y2erwhszc3pflnpkj7wdejs24jveq5onyafiluejx54lg1d2ideqfxd3z43w1d4sdah4nu6pwxb43dxozu4hnnchtni8f735eitsw23lxph4w020k847e7fthbg97vlig',
                surname: 'bhc7gh0yp3h7ynazitnoj009hoz1csqxutu9drmju33z4fazaivmop8s0kzyuxinr9buy32wxqwaiakhdm7ivzyyaur6sgq6v8evh382yjrhpjt0fgt89285ntmzsj1p16ad4727qfu062m35e6xef2ynuvkybodajsr97zwb7lmxta2y0xyr351aq19l16j0lk43vnbeulcq3g44d001k8o5sovcsufzocy6sezyuh3wr0xzgm2nolxphx8s89',
                email: '24bpyi7rd3brabqlsdlx3odceieea16rg7k31yxj5dkmtmvi88yxow95avebnsygxdkcqz1zt013jk27p9r1n4qhgk3450nif5nfholrsnu4php3u8qeyhck',
                mobile: '4gu5ey6yyfr22054bsx7m6s97lqc76fpuzy2lihh2yubdn035u5c72lsbyzk',
                area: '1qrfiwn6bfybcqgnmlggw696xghy2mpw8gjoqiz164v3si16nxb3j70kbde6n7o16j97ueea9bl6ptmql7bdzifjrjapcuonv0pae51bwune6mp6iu61omijva57kzt3klsucyaq2a39tex42qjq6zpfj11mg9zfj6mluek7ewh2de8hlwniase2b90nty6s941eryeg4sjlv7m96oa9ilx44bh6yy25dauzfa2sz75i1jun2esgawy6jibkmkn',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'on857yq1wf99058mg6icv6o2k6onkkvxmqjfxp6gl94bu2pm9g',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: '51d16oqo65po4papwthl',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: '9dscsiynb5nv2poho12wo1mcgp2c6sgfq12xanhda4rzsrzexh7cm0el3xlcf2venoqhg4cawqy2rsu2r39mg8iycmy4dx1vp88k89q5fhdsooma2xp6ia4iro7b681vo8fu0jmysq0a0i6wdy9j911q3ch7rqjma4lex12ds3cd027hdunqmuzrkrb35oi7innbgopbyeaun5l29zbvyz0wdo1sdioipihk6zmg6y0x1i3d8cj797vlws3ej3k',
                name: 'qtkpzhkvba3j0aat3t1ncimqy3veflot15vpi6skyj7w0k6aqjwibjv3jyicdxe4nxwbjfaxvz50tewz1lhqazmhs5zb1f3dlqbmo7yca5j9uzqe3dfppmkq783qwcxq3ol0r6nzdic2vzvaxjdm5qtpb1yeci2jewn4jifuk0ppqo8fgvcnsk4j7va337q1rt37nzd9soknyz6gol12zhqwmy1lsumfs37qrbm8ywbodghpon55t25no4wa0uq',
                surname: 'y8optcg4evlsrmq6ejkjd6bxcua9lq7op4dp83zv77o9f0n86tbifxjpppc4ybd30pdpau8gl028pbzm7vh2edt29d5yvbstcf94qjlgv1pfz2wmcign4wpq3ciag6ixxvzsif5l7nd9uyp8ql03iskzvqs5hcmr2dhrb932nwxffj0pcna5wbsez1pozlscqz9njbz8nj7vhfhmnmm41sn69eevfgxvzifv3k02v5cjyy0r4jxomhfmlmc8ovrb',
                email: 'phwqqjz9f625ylm00w0g1sy6fxqxo1tr4rhfnp6v0jd1byjlph1uipwkuaof4g0nb542ujfkh0vh1oq1obkvk915dbhj73x3hi63arahmxlspv1mf5mf648m',
                mobile: 'j4acqn1alne0m2ir02ahhgdb9oyei9uqv10m6qgkcx2xkxhr5sw5cfsqwpvm',
                area: 'tbd2iwkkdj90b9qv7toxdcpgn6w05q9ti26yjdrw9sb1ypixrkav24n1ibjs98ri3xx2u0nt9purpl378hzasmtlopwn74825tcjys945a0f2o0yup643kyhohqrhn3jqebl687f7ahsa94j2updcnzmrl8r96pcfc2kce0cs1si0swry5zgtc17ezsd5850cdsbqi1u90jo8wuk5k9cq7rnkkprtourm17s43x6kf0fhfi4z8788zfscogt45e',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'mzkn4qlfoirb0vh10slf6d929sbdy1utihsg1y9yuu88j580vx',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'ykcnd675kbtjqweaxlrr',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: '4dolkjdmv8elpmluvnuuaflkb23fpv2a9m3xmfr8nc2ibsjsz449cto92pz5h43fds410zoa6zkeh59igy97t69cklpib67xsvs5k2q0sgmn40vhqk96234elek4dltano14o6brjqzrbbmsmwt7htiycfcigcuqytxy65zddwc6kl69k8kpelahpqxwiufe0tc7bk3f65r1wekuqvdsteuowk9tq3s1tzmbhy3biy5ydkot85gf9qf31lntz7b',
                name: 'pyvxxkj508v5cppa6vs2vl50gbecrrgbq9w4jk53gn2b9q5k83zelm4cgggaxmhd7oej97qg02hqmn8txgm5iox9dbjvt2u8ity8g0ltqyzmel4x8bh0pum7bfygvs9e6p5d8ijui3639ezggbtcbab4bgi92qpd0fy4lhalgrxd6h9woad6064xaast2gjex8qf1e5966n2hir3q21uvlunfb77al6iy4uwrrjnk6m7o23m15b8upb8381lpi2',
                surname: 'ncdjttu4bgm8j8hudke6pza54v0yntr7qe3ws87v0ro3pweyidprlg2g6ubn8lbblqlk027i6vtkxjm1jknqt2i8rcxyskt3ng571eyt7nnyi1inu25w341ukwmyqfj1tdqscnkr5u30v4a125q1g40yoc1et388yh7b2ymwkb0hzj0sezi6cmi79crrtij4dx4jkd5c7yurrd1y7bm13nplrajczfdmy95wsm0x926mzj7d3dmjy8w98c9ge1p',
                email: 't5j9pz1dv1yw7pkytepyokx2uwdp168b0yt6h1jdgmmqiydhiivgy4z6dzl7l9zd9lbp0xi818q4rye2xtkyy5v6lmo1crbbrv8o99rdzh44x6rnwlat4t3pr',
                mobile: '3bx7wmgijm3x2w13i6xd8n2ldqxb47700k8u0ziasgig9pvbzwnrj5yb9n37',
                area: 'iyvvc3bmvubppflvvgsx39lvr7c140ladqkoghdyx4rvbfn7l1em0tvw1qoeyt1mcu7ja9odxigtt9jbryn9g60ub3ugrfwy2dqsjawq26fzshp0zeoadefw21skcjhcx8llmg2do60q6uxghhnpqqv6l3riu5gm699a64trel9e0v2hmb3xonltkn2246zcqh5wd5n744ggmxfyz5vg5z3ygvdkh6vxsntbmjz0fke6hvkcrqyi3fraziwip0a',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'oskv83vdd22j1xtnmmqtzbp2275zonfb52mdn3nxwpek1xd81p',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'slmsnhufhkuscy7jn7bl',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'ffftwhec1jufd6hx7g4yhghrmfv14h5o70ouas35820jj2mzq0i07xn7mgkv85jkww9cicvnq4i11ge9x3yavbz5bh71z19wjkprr69hzmf7y2sjin1buhbnlb9357fvy8d5sj0pcw04de9akm9yt3fw6rzfi8sc8k8fs828exaukrni1frmcgvig86549p1kvbt39vy2ssudg0is7ddozuzmqlfasappr7rivtcfvbmwbgdw48zbe04v0jsleo',
                name: '9uqynhs7okkcpz0mofhkvg9at6hrfv32fc7m8270vxn652avp3codkk2d4m4rmiyl2sgzgsq11830wxqgchwcco0imzzl3hqhcgiedhbj3npy95ovqpilpzgge179jjbqptwjhqaclh2c2yqddti4wuw9oy1a3r6m1dxb00f1termi9rhfka9ajlbmk3ag16sqm7cslrfrexq2cxe02f7md8e821t6ojrtae5yfwzyo0z3rs6hxkkx5xn34g98b',
                surname: '95402c99qgl35mti4kjr6e6uwt9qimu7u369882nsvet6mnzahrxsxw7lzw7rojah03aig8xnkaedv5z58hsx21qglp3b62r81zhxkxj6xo8i2dr1a0pb2y25fshtxetvmeq1m5i4gtdkf6e0fc0s54wdil4lnxmig9wbhnw8p427ove4e5xcszpxl7ukhieh8zl7zbn2vs9zhoq99xkaqf8diiw9rs8k3oksybv6k2x54fx0oi3yefvngbbvmd',
                email: 'xkihtmd8pgtkwgtlz0kmko14s7gj9eoicpcwlamj21jnt3dvgu2kda5ln2aomn33146d6emr6l4g1w3i5anl495p34hsvlhsrwvl032c5y6oo93ozt0cg8rs',
                mobile: 'uru91y23mtzqmwpa3evnmvk89uuufszsou9v4gwvjirxj0vfennmhq5r7e96a',
                area: 'g44kvbu0ye73eh5te6jqev7byxn2ismosd683e1ucj391l3xfacqtt27kcinnqkzuwf1ro83kxfvbez76g87wrrel5fyn1ju1hd4g5r0f9wg11p7v092brutytzkr688sql1z3hekqebimaslxre2gr7h3ry5noymc73aleibec234ks2gkirtegs0pcvtpajwrm994yn5ftxpzelvxw126ytg1eb8gbd7ojoa60q5qc26o5rmjp7xafet3dcqb',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'uqv0r3taj4zikvx7l2z70ujqrcgs3yu90hswlzxss6x6j3me9g',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: '4c2azdpcp9dlkyrxcj3p',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'p5c6xblalwyind66sgd7v9aixbll2zud7n1x19h5m768v9bs3kykgvgxcog3148t27u78na55zam6l0udbenstujpr0oze2shkqwj96umti5zg9npianbkb0wkaec1b9bb7ej8hwdd5ae07mcvrol657rbgb4ue9h25b0w8mdt4dedeu3uzkhwdqfarq5joebbnspi3wh5pn4utr35bpk7zjafguahztzrnplh41qmdzyaq8itjtry7mnjpz5wx',
                name: 'oyx9gykd7xixt7x75p1cslk9ys5orweo5hoh3ck5twsmke6d7bg9n6e4hyvyytuzdlvdl3k6pfs37zb3jdyn4f7kk2yzu6k6azi9g8tencgzjd0svzmy94kd3k0k4atrrla6n2pnknl6fmhxj2o04bsxu7ul3on8eeyy36sgvwferufajzr9bmfgac47d7ioki75j1of1hjio70w7b9gjdkyqdgfx0n77qn5kkv7hsjss5hqayzs5xvevzzoon8',
                surname: '6aykwm9zkdt4o7vmf9n5nrr1bvjq1hkf45ijxhp6d1f9rusaxrbnll2tzedphj1nvr2qhmzpqmw4lhw2ev5f96todcjqsiycxstrevni5w67xw6bshvniqq0ucwoah2ur9zhohvnms8mikufg81ttcqw9u1000otfbr28sqf4jnheri8z09h9ebeu16iq6f59hh5kxnd6e1ph29oceuj35mjiack7nmq2egpqj73xo1xvvr3nr4sr592pfxoty9',
                email: '6599wrq4a8sx1erdypq6wkc2x1e31o24mvdra6rnx335o4yi1acqrasjt919nzeybl02p7xv24ew8v0zjoktpfg3gyorodkho6xhp5gbquxmmps3zrpizlb3',
                mobile: 'y6h33mxhqfmd4gs1usmpj34nl50rwju613tf9jltmklwe6chcggggp6pn0j3',
                area: 'y0k2u7ogryv4gya0z5k5kcgajo3ies2zzjdazzier266f2ge2ll5nuab45kek6glb1dc1mxvqm3g15380s28jp6q8h4bjlydtg0ne7aq8atkvrmpko8q7z4xc9gewahkzexfiuj8vfm9810c2gi4dfgpyfbbmpl00vu59hige7s0z0oy42ibnuxn59vxt6k5aojt5e31nhfbj939f60nqbkdsf4qvrw6blk6yaavyr6e832wict46pdmfhc9xu5q',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: '5iuur2m4r8vfynr2onpy83r4gw5ntgv49lh7jd446wxkz679lv',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'se0096gaypj4dslqj1e4',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'q9x36w9421m6in2jmczbdv9y7pb86twav6p2hq3mnj84jobwl9ey8h9v6qjgdp38nq3v4iwyu2ej8mgrwpcmexip89wqkoib163seuuv5gquf71zblas15j5rd4o99rw4rgsosz8g7gcnyhhd1hz17qjos1kmye74xfip4tbr27jt0cbx4kp3xsp4w3eathws9q86cfl1v42e9lb2t1lu1z19hxwso3z26ysg8v1nzzqtwu8sq6kzk3bittilug',
                name: 'lzy4cc6rkh5eegz501nt09o13nrzosllcyz5yws9cak27om3bc4xzh2y0o659o84q6i7fdexjhk2f5fkmckl3vcyilq3sgno9mk4qglcmczc8du2704cxe6bhrkzeumfgvuv9h6d9kpdcon2u5pgqtivryn6qlc083rsccrhubc95m9hwwubm3ay4u3nqhc2oin1ezrjqkkkbh0ns4wvp8rxikym08t7up0iivgfjlpoav07g0k2d8dp7f9um5c',
                surname: 'u9yglk4y7xr26ocuypmcf6s5s7t2mx4y1x4h3rwstwbsyrwo53984bx6s85xd9hcrtpa95417xjfd12csy56bp9b8skb0si2xs63pmj8ynqanfnctklpbpybkosov5tj0zzcx3x967yuv7x93ifioontpm22bk710ly4hqw3wwt70mxql8vl022eeytzkpiqp07xjqdgrprvrqdhqt8zgcoc2wufansr9m54qlxcn47tn2pwpyhhpjsuetwgb6y',
                email: 'rui6aycsoir7ohr5hxmetk6w4dhgckbug5v8yoldpoxv5y6fj68rjpz62bee4q49wcw1pcqa0bt0wc1hid3jo61b81wjz9vtlvaav12g53j0j39nu38r7va6',
                mobile: 'akybltu2hsmdmf926icchkw53gape4lsdkdh3ec70v28y8m833izsm7eujnz',
                area: 'johnlclr4fwh89joi748ys9wz1c8nv3gt2nwbari14znv70hg2st87z3ib6n27tflkyld4w8m4w9z08dt5v9vx8kuxqqi2el2wi5jbk17y7bv534jp8lkrsvqdq2da40xovt0hkreu9a5tnbqe8qecmf0xqmt8z3tcowk05gium4iopxlz0tnkf9o4wsvqq5dtaxz9tg2ssby1ee0u0ghf1z39qkws2gvaoyt3nkmgntcdu905dlwi4bnke22qa',
                hasConsentEmail: 'true',
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'mvufxu05zmad0d6h8kn7joimrkoqu1o02zk3gqtaro422jmztb',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'sdrtnfuafoa814zztuvo',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'wcr53491v2kq5rxgsq29t8s57j1c4oapbumxbdax9r0v98s6at60mu8zxwy397nuc3qv2vex0ucswzn0z5xhwisfemu1p2n3jeseupfrtuir63ri2rak4u55n97794wy9hdgpjekhdemwxadcfi491i1dh69mvysrmrh28xou6ttzmw3o8qf54auqdj0wmb2lkb8ihlop7fa56rx6kgqf59geknnuiard1bng0xcbossw2i6dk7c1m2tg94c6am',
                name: 'j0t285ta2kqu8b3n9u4bc0a0egvfd6b6aezytz1id2zlw8vribe2mctlfseur6ashzrhlkz11r6wyyspsv945d64ilnsd2cpsluxm91hvgd03vqcbdij2pvl4wju5iioc8qzw5obkdwkv49geqvap509zsi15bdni3mk9gmh987pvq0dwigc6o44hub4zd3gju7n5rslr7cq8etzby7ti653pfaf15h5to0w501tsgpnd6yv8f9mg972hvzmwdj',
                surname: '93mv5r48emveu570reki6vnadb7ic3b5tsxbdcxmtrwu2wg0jdti49d21cof4lgbobj8rhz4thbyivrxr182avny5n8810nffsuj1hinwd1a3l6k6py1ikesygwf673vtn4xocedqsvne93eaa3vcp245d4afhrbjiwnb298vgdxht6nzn00lzl3zpxmu32ov4owot8k9s8g09grvse0x7yzujdh8k7psabonaf2f7nsy4mniid3yln0jowerlp',
                email: 'ozkh5j3gzx1gocketx2iji3hj6710y5xzq710x7uc8o9goizxmyiged17r889qqkvtjp0as2dqtpszyw6ts6s6s4emfxbyeoubj1yal4fsvfa6aup3hbiko5',
                mobile: 'x92e9bmx8u4d1xt86ak26cpux6wtewwshdg2y69m6d5fhr8p8vvu4ipd5s3o',
                area: '7r8fabpb2ex38qbi5vwi7fth68wrzi0li67hbqzh8wqcm8kj1skhlgvrclj95s15snva1nbbhj3eiow3j0sl18kzpnkdfqkpls6bwkh6h4eeq7y0qes0axov1dh4zlfmyr0symd5zhl60mzx765rkgwojffvd9yee1boyb8tjdde9spg1jdu2p6j1mbqrf8nzwulmrkqapd59g1sk2k9apownbfzi0n0mh648u1n1d8u18za50ctq55qind67zh',
                hasConsentEmail: false,
                hasConsentMobile: 'true',
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'wnpw3mee9lvkouxf8sfofvwowxq18his80vicezn436adgrvib',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: '6nzctlhm586b88qbhg77',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: '4414f6p64cca37hu4nwp54btzh6nyaqe78uhflif4px036z0eycxnsvyuw2vxck3o73pu6mw56ose476tp5xcr1my09feo86mlo4ufcwre1um9k8e91sguojngzkthx2zrvlzd9odjlkg8qwjpjbrcla8xgs118ciqznvskd204eylfludxf5o40hsanxva03nw65ppiv6qrzu0pxf7mran0cblic4qi7pihmi1ovk287gi8z779c4wmvgcvmty',
                name: 'vswdnr78s781cm1hryjb5oar6jrque20pjfhrdp38wfy4f3ysalpeo4dycgtzocwgyvhabnuwfo79crxdf5att796zj15u9cickv7dbmuecytgzii05n38c2zajs68q1gh7ed9sx65ykmfazwxqdo5lmupqfiajee4ul0fx2i7gsnvv16o7g1fxxtzmgry2hlqhfuqt66dxxkzyeoi34j31iuk9oh2j54pp11xjslufl6mpk8bnqlzjw5vjof7r',
                surname: 'ithav47seifkq7c16qut8kawpfw8xv0djkd7ucfkgywdphu0anso33vfyuxumgoed89vyrzha271mf80essmzzvajdm47r55jlaalvqc833o8bs0v8pufx38lcix71hzu5s7lymg5sneo5mrob67sauen2wt0zyyvhbvyk13avt7xdz0pu5w0mfu2com4f1oqbveb68usgy7a71ch297lixje6zf5vppc9z4g26zwd4muenp35br2184aucepds',
                email: 'al3kyoulwfmh9ozv1qygx7busggattxokgqhd6lbprr2h6dd1kgc41iya462hamh1dbo916vwxnw2ppuhm5iwuhuyxbxeym2pj5roz0s8jkedmqkf2ip2juc',
                mobile: '1np4rxn6f4n2b3wlu8fdx9uuoanflj6obyrtzpc8mam730d0qztvxhyys602',
                area: 'nsgyyn07wz5yzy7axlskzk04osm2xdgoajlsqlueokttd2a9hmbpzw284ymf67m8jgicrjb2rovmh1vxp9qxqrdemiq9b3e3b83b61c6chr6j1xocj8f2kinxfgmc1ceqsxxb9hzkrxi1s4xvnnw7fue8f54qs8gf7n1hidmit3ua93vpjn5xwumppov6yxduxb51busmgtgdn9khawco140m4qksc8bginncrmtodcocpv6c996qtig8q01sj3',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'vwkcl5jkfrzu1zf0w4qazl0hvkbm7rejans5q23xmms2z45n5k',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'pc30h5f8ak0x8bsytapf',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: '8wb4irwfhsl6ve1xlcr87wt9uskpfet6aoihedqo9gdhkisbgg091q480m3pjpl4pau9m3sglhis89lp36xkx3n4cbomd1k9ltiho33o6kzz98wpjf62at9wpkdkr6e4oojttjic7mwlvlo6wh5i3wmy6fzouuwmjlg1i9x8tkm4bku2kabur95yg3re7k8812rujm954l8ymjy522bjdxxwt3qpqmnddurcfaywwawevaak5sykkh0lm0v5fdk',
                name: 'x5r7hxctf5pa7b41xkj8gzux917mi7y4cuz0as8yv29u86bbtc7dkkjrygapox91xepdtxa4rggv0wr8wmte1o6w3donj5xo0pdws04uxgbecow8kobaqp6zlgn1y54dn7831g55mco511btdtkko88qxe1fhbakzcxikabe8ql7lp4wz86q8i81b5mpvyrjz5kl362ettkjoqz6ykb3fbq6nv8efwypkrnewwlm55n5x6uur8v8w2h613xclnq',
                surname: 'jm4e7bt5t5zgnb1ggjxc91f484vrv1k4pb3v9gnsewvgj73nt72wrhz658c2nwgp0xoooqsf0vxna1585tbpmmve53p3oqzdhurxlqvl8vjc1t9z9t8i6oznim9n1kl81sqy6xu0f8p77wj3pzsq8t6qh3dcwnz1zmlsjhk5ozjbowasf8mqz5j44w8eka7ux5ozlfhws7k4p1b9wisrb5ojbwkqup3bs0xihpdq5k3aou8ww4wffwmm5nvnvbe',
                email: 'drjy8aylpg5iwf8m4d0r1548umb2sz35fwyx5rc3x0n4ga0bx2z86syymin0z5kupsks7hvzgbmvm57zuqoszuz0lb1pbdy1x1hmgs2ohzsu01xythfbde3c',
                mobile: 'rp9l943w5x8m5nlmu2btxpdjkwl24q86lpz4te0c2fdkm32ch4d9n1seof94',
                area: 'r6pjrmh7w6bg0cyy9806rbiz2dm78ghws0z8lcus7e70yjen0hoccirro7kkf45r6eb29zdqhoiivzkoxf0ajvqznu3lc5jmffbs8vhhzgt6qtphqd1ya31jxrpfqvu5e73rrm3sc1in61lh2090t3131dl72lvgl8udsyktx7dhom6vf3cbe0f9czk9ddclql9vwip3sqzvojv0mh96elhypk8dg6vqfvh1ulnzsdpaftk1f6eoq0lsokd4y8n',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts/paginate')
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

    test(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
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

    test(`/REST:GET bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '727fba7f-4b0c-4856-b09b-96250feef2d5'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '727fba7f-4b0c-4856-b09b-96250feef2d5'));
    });

    test(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/727fba7f-4b0c-4856-b09b-96250feef2d5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '727fba7f-4b0c-4856-b09b-96250feef2d5'));
    });

    test(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '7aa88dc9-c304-40f9-83f4-c12c41a06993',
                tenantId: 'aeb6e961-352b-4290-8b74-72ae3a3c4f27',
                tenantCode: 'l6kscaw1ykwrwiakggo0l9symgyc65u9vc5rihedkvbtd4nivp',
                systemId: '303eee3c-daeb-44d6-a4e8-cc94d5cbf0f4',
                systemName: '8ia94qrndu44qxsuuw9i',
                roleId: '529c2787-11ce-4294-832a-b13cb0934742',
                roleName: '720wlhdrf75ejgawbq1i9hjz4h41yyzfwvgm0amsjjky4pkvw987735x5kuuoc92sx0vkmocrn7edosy4q5cfapmurvloo0h5z78fx9ok0kgp9cgf376w1421gb3dwxxahytubl4wesosfxi0mwvv47gq2inau5j38o7cagsv1zl5b435r8k32qz1jclqctde497hdegqztmb9a59gbb2r4thnll4900xio3enehw9mkkedbugnz0240girlm9v',
                name: 'lqwwot88vyml59odl7sivsw77di9bwa6tfsrgdljcyk3bgld1r6am6de2tydle6xzpacs8xbfg524iontw74yidlgdujlmgvxca23ra0er440ymu5vzdtvrfbd1p4d2x9drlnlqa6bt27lhnhm7ysnfi4rdao20pygrzoidler9swjkh3x7huzmcl3kzdr09oxpfjsr3ugi1l0ltbrdv3bfiz093bl9vdm4dumbur9ufxbrc4ukvnbp3k8j33q2',
                surname: 'f60rtvw200ewmwis1a2hvfoxasii0ow5gh0ktx0408r5me8p9v0r31k0axeo7zmrv9jo8gxu58gx67496s98d7yih2cqzo36mc3dumvbww4ed9whw5rpdcs5ag4khq6sp7ao8sbbuzer6ojdrlu27b9zvkq4nknzii3vfinu0m46l4mc2fzfcvte3k5hvqsblw9vdbfx7ufhmrqj2u22bfzqcdizuu6nuhivzmju6443s6pjx95t9ue9l7cl36a',
                email: 'v462bual1msk42k1hq0vxmr8hzgyi21rbivyexksmds2sdhms35l70pen4igwjrakch8qjhtrv7v27lcec8dillx1ovtv5k6fptk9ivn528yxt1u4we7og8t',
                mobile: 'yfqaes2adyhycxai1n00v6xveakal8a9h6tdgkw3403esdv8kd7wx27y2sng',
                area: 'o6nrvwlp6tvzouqeat3l6me2mq59ldgufc93nyyvvoh8q7gii7jo3wn6ct0j8j95mkh2l64nhhuo4lu8q0nf57v6yzd1udhp3rtrn0faojwa35l4fo0t3ra2yx25y2pjvs11wstgvcua7d85nllojexrygc8e01329wxtkelprspjnr6d2w4sypnlnjmznkppj0zel7l10pnfupgt4ikc4ebnn9nuaf6x74fa46sqaqdt97wm5wjmnerdal3xsg',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                tenantCode: 'q4gmbtiizcxx9ul3h8eyy4i6e2jn4vawmc0ifgc7lla1hl76yb',
                systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                systemName: 'nzhinhufiqypg7qtrzn8',
                roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                roleName: 'lnftnfpgjisht9m9cs09rnisfeawhozxgu2cdueumt4xnfl3xl1eiqy00kw4y2m1l78otlq0numebozah6gyo68es4d2uaaxiy5nffu901n1d5evrsbkc724sualczx248zbr8q6nml6zxtdwzmabpex21if1l4023a7etr16skxgj6x7yq9gg40hpdupka8foleypghw5f27fte3dogdcu9j7vrtr8lrfcvqcojawpk4d54nnxzbcxr4cjxds5',
                name: 'ean2f4x2nrcp5o12cb5yqmnja1mhqtpxohaxqzyu5o3i8hr4qocc938coa39e2lpsnr6vy9dbsqxt8v2uw60lfhu51a1wu2fkob570jyrd85hignw9zyeaqwoymtlmlqme42ujqefh0mu50yro6mad4mkw9w6v6el4an3obzr126ifylmw4evh5gu7wmar7hgg21sq5ntvn2ujdiwxsbx5mpoy1f86pz1x3dqje2l9m35vk5memeitt52kepvpd',
                surname: 'z50smdzakl1ot85gsu3qto59u4p06ejz4zyct209k1u9wqfuymkvu0uef9xhjbzs01v4o43zcfhie4blw3jqz0u97780ny21jam0i5sdwigb8tkrikhsvwugmua0nstzm4oaysj90nxsp8wc2wy0do7jxrh9g9lnt6ynooiomw3hos7134v88i3782zbd5b8ti84to4o4hn4tsn65s6ziu3t64zle4tusddntpm3115ieeozt19l9oricewb7el',
                email: '6div0ik6wifldemfokhdkqa63jhyaxc16ohchcf66ywluwsx8aa3pswdcnayn13i9ojn92q5xdzn2onfj7bs80kceq8u93073iqwgi7tpvped4yxje07yfxq',
                mobile: '5ae1ec2j9v0z29gb04y89jnfxezwopl3hs1a97gsog0sx5f61yza283v8tb6',
                area: 'oj9agox22abaymzdogczmsi9gl3crn9wk1xz0v9vmmjqmkcqlnt243ka5oattrvzx3yepz0250w5lckv2qlxw1p1huhyu230m9qc12xxomi3kuhde3hd6bjqgpectn2c6z5mtzn51rbb93r37d4vqgdi0a9s6n8ze5fu31ex4wnlhkcnnvmp2eat0aerjmea4lqd9kx8qzohykazzrvufx68d7fqc676wwacqqhrts8bqqfii01suiwwcm3u4op',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '727fba7f-4b0c-4856-b09b-96250feef2d5'));
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/727fba7f-4b0c-4856-b09b-96250feef2d5')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '3c574fd0-2cca-4ece-a0c7-a674d1141100',
                        tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                        tenantCode: '5n7458drtiy6qus8j8d7i1ecnlhs9a49dbcldnwq7jzwazbir4',
                        systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                        systemName: 'o5b5dfjrlzq652b1440j',
                        roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                        roleName: 'qqctrfq3gggzavkjindvgeqhkehhja5pc7yg5yezvv928bwvcoztk1tjewt64wk220t58tv0nxmfasbavz3ia9sitmi3n1y8mjd58qgyer0dfmdyi6gltiipcoosxswggj14jqq55cy2toch4lhmj58cfyssvcrsxrijjlaitktlqcxfvvy8zafh6bruhhlzyx892q37cqdyyac2q47s4phns5e9zgsitjr1jkm3ufb4658pbzrj26gm7qfbsk9',
                        name: '79ydcig7xk18lus427bs4dj0y0nwl5gixth33f7fr2drpxujkg234uwld0m0wdnctwbbe1vtk249e6gb0531vjldc7cril27oj355lasvjiw9r36r9rr20m59tjbictuz3ejplets4cp4u3153hv2m5k67zgpq796lyfqq64pv9dn08a9cldlslwofmcjn6spkg661igw6z88naxmy0uf8sgs58gohy9jnk4bg1et73u1028e2grm6yzo8lkev6',
                        surname: 'ym7o0ehjo9cgj5h1fe6bl5j7d4ujhtvxph8cciaguuxgd1c90hwoeg8966knffqxlbqdq268wxhxecu0b5strrkpv5doco229v65a2wju23sk3pu1v2sin93wy1tr3cyjup70syktf1js0417qrwyg4pr96m3mge8kcpkwoi7x6ts5y7sxe1ohkusu7gkhpg5bojjbjgvg656nq1m9sl72r0dieqehm45i2dq8om4qiensc83ywi17wohv1wol3',
                        email: 'dfqtmq91n1hotw6yv8s2461ce3qwslnnvraehyyynn2trkytl43vkzkal34606lbudkjd5pexf4dv11zz19v8s5hixr2oe7q2995ewrdzu86uj458bcnf2h9',
                        mobile: 'sio9jahxo5j45n0dwq3gla1tk3jdf7rg4fjcw2vg5coxou8sem7shy93zrra',
                        area: 'kamavphxeedpzpjosqtqnlghrsu00eg5wv6e0ks1mcjabee0x461qoynq135h1wyie648ipbhs0m32nafrf7mehs1nask58i4xyv9ji40bvg3m0cg9e5g4a8tv7in2nzgg40doy4fb5xqm1nkn170al05dbszg3dv2ikfr6mayc166snfj7dwmubilnfz7sipq07ipb9l2v2zftunglccf01ni4a0t1xd8xpytnjjsp3p8wiyb5jvqaphxcyu4u',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '3c574fd0-2cca-4ece-a0c7-a674d1141100');
            });
    });

    test(`/GraphQL bplusItSappiPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            value   : '727fba7f-4b0c-4856-b09b-96250feef2d5'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('727fba7f-4b0c-4856-b09b-96250feef2d5');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '727fba7f-4b0c-4856-b09b-96250feef2d5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('727fba7f-4b0c-4856-b09b-96250feef2d5');
            });
    });

    test(`/GraphQL bplusItSappiGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetContacts (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '878b5058-afe5-464c-87f4-f00d744c9130',
                        tenantId: '2d3467b7-bbae-4f1b-8614-5246a43c248a',
                        tenantCode: 'czrrg8wx02bgnlst9wtm58012z7kiyj77la98cc27ca6bg1qhn',
                        systemId: 'd0b54ff3-defa-4b92-8c98-503424efd495',
                        systemName: '5l96uz4tdnwj0edi0p1e',
                        roleId: '96f547d2-cb0e-478b-9552-ff9562ca4f75',
                        roleName: 'munhb9damo6512q3fx8ou6rp6rrpy0s377mt10mbnuwg74hmqygv9n1vn9zxi5tc58l8zkvkekvukkhyvkmjm4rmlkrag34owtlkljmnbjx0om568n41sql01h70wcai0z1xe18oyknfeyv1jtuv4xr6kze2lxphyddbnjrzu2lyk65z8nyge1u9n3jrbdiocpzjv8cn9rl2wqt4w5txw2omhvih5i8pjnjc4590q5zf5z8k87lvr1fpljqo5j0',
                        name: 'qmrgymxlhsx6mp3u6iszktr2roqxi9h4serhm5wncfn8m2bhr4gmxas7kwqomxy1uaaikd902ro8xwnkud1gusz0mwjbp3vz97rfrl8rqsw502118c7k6ubbag8nvcky8lqxlnegofvlf066u95cq1d5fi14k5kdtkta7p9olw6dloppc67gj6wqlrtlyv2fx5416nqm0otuccui0hz0v4gdz9kj1tyr14yjpae64pr3h62xw1ely50obk5z4r1',
                        surname: 'xeonboo6onl01w7e8sga7hzyskqr99hfud5q98chqp3wwi4ngthzyvaf6ubhpf3slg6txbzqoito8tc1olvo82yh5b886p0mgf483jki3h13pszpa59f3j5tavgbqervs6o26qc6cot8rp685o5zqdlfy5ioy8zfsfccr7rn2w2djpzyqebathb1drjcexukyjdqjtgohqaagqynl6a40q6lmerpp22piv1q37qcnpb1182ur9sebadta4cbmju',
                        email: 'crikxix2c9e6f2bxs7gq41hlhm64h2hy1vs9slnsy2s41sl1jiyzxibv6x43klr5ykdstchrl3yu0djut4q0dr1syriva0gt6si2dyb2c09e2ocfqxzok66y',
                        mobile: 'kx3xd70evxtwatc13tid99wigegmdm7v6x4t68435amwy7y8s49vqr974dtg',
                        area: 'yfr5ohjx3l685w0byjivapyu9e62bdfmddmczgf0lp7s8xyz3i5rm49461ljojgwvjat3hn2s4z3baayocoogk4863qbw4x2d3aj4eekeq3xiuuz07xx85wd4u0xnf3ev67qilw4e3xmjj5og0xz3n3ug29vyxjnwbr68dqhvgd2uowwydxpd0alyo0xnl7ow45x8izq3irrirtb8w3qq3sve5wvfdi1b6mz18uu4dihhxbtx8lrfv9m0leay5s',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: true,
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

    test(`/GraphQL bplusItSappiUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '727fba7f-4b0c-4856-b09b-96250feef2d5',
                        tenantId: 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae',
                        tenantCode: 'v6miopcgxx31hi68l2hmhe9qjy0jyhwijnud18a13uzdfisweu',
                        systemId: 'f17531e8-c0c6-456a-ac34-f01517b5b029',
                        systemName: 'raxhqqy7jai9n11nk7vv',
                        roleId: '784520b1-78ed-4748-9f33-d29a04436a8e',
                        roleName: '4elc06yt59rtj1zgnhv3qy0oe6hb746mn9wjfarhtkxz6mpdiouuwux2adatyeimwtg8z4j9pgosmnnyo1ph5ovyndq1uq9db89p97cm0wo8cvdqdkievoyq07mbi12ubsbtqckyd7zy5lnszr2rndr656fxl35ncg4xfzssk1eezr4cvbgfgy825k8fgtv8rx6bhnltybc7inekox2humxvz04bwbmje2u7k787myvlvrtsyrc0tdrhw31x13m',
                        name: 'wk956cgamsdhv406u437e9ede5n0n4nl7cl8e553pww5xf9i0016doen6doak6wkar35ucq4wfpmg700fvvj3ku4j6gobrmgaf8b49ou3fwa4va269j1qq2enbaidt4ob7sabpx6nyp6cseb0djfvdegx1rs2ythc7o0cy5kv9o4z55dunux878znfqzvor40nb0p4rkpfqe1u6hebwq26ze8npmpvgtuc05g97iaig7620ng21g47jb7gaz5ep',
                        surname: 'qtsnn7bkoiq1yrdklgb3mfetvk31xorvp2xoeflmx2hhhdd0opzt6dsxtk7yvgt2w4wgoxp0265bftnwb6wcpjho0dchci76k7029subv6oonqon32k9nb55twjwczr6yavo3zyxldfhevjksvf6c8ueogrhj1vp2s06h7iui4w8q2uk7b6ti4xk4c86hna58x01pemd7xyl0eznq7fs474ahoukyddqhm065y72mlxi8j8c66hnr0lmkke6fu4',
                        email: '9b43e5jbbdtvury57axcqep5det1jtxuzgcqjkhe1o02qrf5ah6sb6tuc99nkql4h3h8p2p5ut3q1eo0q6mi6lgoj6ycc44giqdjjlnkqyr81d5sfuqtf9nz',
                        mobile: 'wylnmah8b5gkq7agj40hyjmjbdoxw3m4y896thfraevadt0uhvp6v35q9q64',
                        area: 'px4x532qm8ozpsm1jmzlzph79akfqjfp9kv4awm944u3pvjjc4g8qtbdoq8pneiiup0y12xkyzifkyoll2o9ylcu6xy2m2gin69coyp8634u4l6x2bk8z33x4p4vlaq40qq8frnpwi0jxb3y8m9ibbsrhwrpmewrsjxjdaxxrmim9es7110kn3h5j9to7q6xci117n4no6mxky4bxk22r0yj3riw80quns7oj78tbgvlwpitnnxtt9g8buvf7n0',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('727fba7f-4b0c-4856-b09b-96250feef2d5');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL bplusItSappiDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '727fba7f-4b0c-4856-b09b-96250feef2d5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('727fba7f-4b0c-4856-b09b-96250feef2d5');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});