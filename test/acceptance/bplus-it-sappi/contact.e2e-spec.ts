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
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'iqn8fi6ztf2x71dy3g3z',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'hcswl5e7ti36d10fo6t0p2vryxu5kx3e0s974s35q8embrzef69lkfoqtcfaa5fymy71qxz8kzy3de8iqw9jc5ab6hphhjo9eizrgdm50dgs6jjp4ir8d9bkd776xj5utgahk0p040m7h9rdoduk9c0c5tjrn8eha0ung8sx899un3xh01bo7efhv2xpwpiycea6fc6jmzibo25291peopppayuuz0i7k4aan6gnzd8y9ix4um9rv68ftjnx8hd',
                name: 'ivrg9dpkn2ta3mdrllo98ra1tbsg82fk7ixfb2t79ptmtfvckfwdgfcc24xuu7h0vrqrz0v9ul2mbooebp4n1y41hmdp9fw22150i4cdh997gxdqwnylvx4ohdfqzpxlhbv6734rtdnt8cu6dekimsu4i1u6dzcfi996jcj9abivsax8gd3zzm7y6vkdrpzboep6efis4n0eb36l0o5acqrjre1t4bg4kcf1e3jciols9x501pekrp5d6fbym7g',
                surname: '5fx2uhrxh8gnrbp81l9ii07dj8kxzop4csxnn2xgyrw98epaaj2h3fvc5tfp8ttt7b08ryv95uxxlvc977g7oxcfcfwjv5qmk3t3ui77awvrzzvbajo9v4pmlad21ero23hcx6byrpsifb5au6k74p3mv916z5rhr1bnik2oqema4tbppbfvs5my4xq8pzwvyf4b3p3lykpdc1034ow0nucb7masfh8jrwmgyimzluob9e66pinfanb7kavlmgi',
                email: '48p3zgaab4d33wqnc2xp5ajgyiz915m5fz3bgycnqka6a3l1lq3dhueiu5n1ymytkfqlt5117365su84oirx35wgfcl0jao9uahgo11fgkf2owa77e5l9mrb',
                mobile: '5seabjh09n3omrq0wsnrtm8ognyqr2vdbi8bi2t9c86ls2g8b8s65arahawt',
                area: '40buj9opm7ig4o7yib5vfjjrzy7yo4pcqehaty3oxd8zhvimda21rfnssh5fa2xnf678x7xc8qpd9by6utb7k3ml5g3fm66qqgnngfuc8sw9ultasocgus3xeuxj5awhelqg8hxsrvrsirig707oip7tflffg2nfp91fh242xvs4jl20km5ilbt4dufaopvftmjqh32ldrt254qozss3y6grch3dlv19l4t2m26gcw41rgcxipz5b7z4m3j2zvn',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'gu9jl33ukyd6wmmkark4',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'lwfpar4jkk2e0fuua5l2nrf01i0qczv6jzvss3gwsn35tvwfptz15pxwlxlx9db2wabum65lv0ks3dzmx013mke5wv8tuoid1rrosnjwydt2oj84pqhta85rhtf7v5npvkp4a5eafkf2z6zvu8b8xm68lcrf7ml2pxcafk59ze4bjtd416lq8g0q05jhhxe5ckzhj86dmv7vpfvm2irdeb0vxg041gmwr0mtb6rd4p1perh3d6msip3xnnvaarj',
                name: 'epa1mysrpbyk2k6zqzr1izoo0jkwm0vw9geodf66czh5errqhx0jnmmo5kafhwu9skk29tmaa7gkjicjy8rydfe4ocusjzqt5adsmgt94foovwhe9zxlmqe4xyxlv9n0005v9leltqsgvfaofz242d42licgbhksx41ug17o338nrisc56awh80hu1vaga2hr8pvot7irbvwyzou4xzt3zxafm6hzj6v33oloqi8jyj7cr6ewmji5f5cva4zk8w',
                surname: 'fkpiat7gtmpnjy2etatjvwv6mq6q4vv204yoqskia6g1ktk33yr8utaup5pmav53zcyartelxnhuchwzbr34wrn3oin099pn7dlz7mdcx6gvxiibw59xv073mb2uzdmqp0qkbsw6h8t269p1fwkd66tsboy0byfa9v3dprcxvq7rkskeyu94hba359djnu5f3ktgsd6xxr8e602xgi2mbprvwyfu3y17fcp84r4krdxdl5b7kkf366bc48ih41h',
                email: '9r00wv6ykolccpofqyvr10m4co79pg2m8va2ote43kv8o6x0ztd0lsh9czaqv8mbda3h368ugbfqb0xf71br37imvh0zp7ki9b8meu0jg57lblvdbbj2cytq',
                mobile: '38f8n4nzy0f81aabh7vuzivlzqfqfc5mrrojaahmff1hagt48yxxezxc32yh',
                area: 'bfffgiem1e5bbh9aixoq9cmzzsyppr5mf4slr481ho9kr3mn7pju8v6hfj0et5b7avs5ovfbqtb6e9fw7v8x8udxmlb8cil1tx8owi8ekb58mh94qhtjk49l65nkdm9iix5tmqe4av0z3vefug0ue7rg2qmuk9rynggwcua4ejeavxmizgxcpe92yp44gcssypk8n9tavnlyebyoo4km7loitvoxmjzgk12c2zhoeiaal979t9oshsz9m2sqqqd',
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: null,
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'o27tu5d3fnl15lqw0xgu',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: '7d8c6joaqs0g2svuglagu4rq6z01dwbdgd3cvy81h8i64hgesv4uceqo5ytexemspheshzhdsde6pgrzeetd1xls6nvz14h59uv1gqxh7xjs97vjm2xi6yuv07cfet7qdkkie8cqnywuskbpaajjmdp491nv1khme3jdggtycwfj02gn6w4vzqt5b7275gyhdm64rroxfduxx2ls3ni309qxgxsbb8oy5grdg5iltky5tm0ffnohi4g813k0sgb',
                name: 'tghubd2eie5wd3327ilem9jpczyimsu7a2uxt3v35vchjsf5gwl130r3vfi1zghiw8lfpmb2fq0849q9hoo52xapz79pzltfe3wsxamoxzuat6izrvuei8ac9yp9ztgvysmshvj6af9tz40ntevgwumn807czsg2mh92330x4ihwjv7iph1g06vb0xkvt42lwimolxmu02kzqnjj9sctga2it6uqywrxz15czriun7tf1sdul7y1uu49swhz55u',
                surname: 'ot9sz3cy6vo7xjw6xxd91zopvisl1kwfu79wthpx3s0rtldfjusmwtvzo2dyakvw2xebwc1p0t2w55mtin31i40t51zn5hq321mkvtjxowygluceltwmb6ymhtb932dd9lcq6guh4mbxu19bd6vcm2233fsa8n0ux626u1mmmds0nfsnfz2x5avit1f41xo4fargblshbv2xeeuyyi985eambv9dlgentiuxf0ugoqxnzqfedbavudyuphyoppv',
                email: 'shsqhneq9qtnpkgnhegwqwzedmck9vwvlot0jus72npirjl97xzbddkpl9aia06ck250o6y2m3xv1azh1f88dw7r0lgdbb6pjh5llsue5r3wnpx1saoe0b5o',
                mobile: 'suyf22fd6g9ahjopk2s2r01ut10zxstsqoxhvi0oj5t6qu010acupsteccq8',
                area: '2ysk4nq6mo7vfwf0p23vxny9ybb3j4z0sgy7x3vyz25g0309kblpa50qugp310fdefi5h7jksyii21fnj3gterjrk6yumjl0l88zzgzki2p6zepskiwml4b1ezb526pguhu5xtl2mdjjaaqoggm1doxqqru7fc36akdj7dwlpclf9ujrd5nvyuullny81yod18c16cwigi4yh9fec9kpzxorq5vvbd43vqjq2ajhob8qfybbqh0rhlpbm5091sg',
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'esbx629jn2oegibbu21t',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'ys8ccfi6kq17nw8ilyj62767xr58hhxklnpe8wg3yw2btv8r8zvxww2qua9wc47emfsfarukm7xkj6ror3obkwn0ctw3ww1uzjjnyt516gjkddewkisw7p9vwo4cz0yoywbcibosnjiqyrbk0dnkgdncti9d5m3app5wgpdb3oxzenmo0k8oerz7jaflpfv01f24ovd0u10ye4h2v08f04mwhd2xn5y4ko4lr38yqqji59ruixpuvu4o3hw7f9b',
                name: 'ckhqwi4plv9knlncolmknlvxxjx5shinj0e3oibi1gfxs90hkqtw16n30lupu07pyog8p73biebb103dcke9lh22f606th60gyivg518ne6r72wcegvfep9j31ox9xig7z3xm2s2wjr3qsu0ettf0p8bchvike9pb1b5tjxsrwme81i1oaywbg2fqrb9ceiyiyy9i4ldyhlq8fu8znkaoo2dndb9wqettcyf01n0kmlw4hb6x1p4crix8gl3o0t',
                surname: 'ichyepixgq5hhaq7r2a7sx53vg5je04pb99ber7x7u26en3qg1f3kdiuk65qbqblqsd2sdtng3683omsej34czayzaewsywzpqyqoxg2b5tfp3sccb71k94at1gf1qy7qespb9fyhlpacrrvx7kud4ad6lk0gfqxr4zhb746qo1j9cwm98v2rielp99oyg9crjox5tpadtss5k49fygv9vier7tmbc54rg2ghmumt1rzdzlvrwe79ht8g6ovgqz',
                email: 'lh3kwla5fz0z1lv69lqckjlmyd1yl9qc1wzq2kf3465nznrsfmltgkgkxooylntnov5yqbbhn76cd0o8zdx5ql8n5tlp5u70yzpc11hgf2jzquljc2ryylfc',
                mobile: 'zst3845vckrlcnkzkvpm1290nhyepmgms8z4tti49s9mmuse647pui0do5m9',
                area: 'bnue1rqulwjv3i4dtp471njvm9h89kjtvln8yxlmyipvfa1pv6cv7pxsh48hhm6o1ufpm66pzzfmeidjzdsjf2csicat6sdxqyuly8q5ukp2lnbd6w70vhrk1za7es9mfto8gotshzzdcf16sr7lu4mhx4gw7331u06ldu5rga7kohp6ne8xkzg93lnp2f5w7z8zkezk22g60y3573k2gmrd0wp6933lf4zmce99hzlolv8fmd7d3fc7lz7grfh',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: null,
                systemName: 'sz8w08wfw2e2pynig8zh',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: '8p1owj51i41pmqidu66m5hazl619egxh4wx4ksuxiikkvrlsbeagfi8hzz15yccs33tz7jw41ouu2csevofdhhik4dwm1d2wxsqqzdb07kxo3zvj1bqn14w1hrx0puwt8y5s2wsdit0btknk9a3056xq8ffw12g29vpf6v75tacnpz4kja6pmpzpd94pts1r74crglnn88lhgvwn5abg02b4xmi1ue2gtk1j27gkn3gp92mf90phun4xayu9jfr',
                name: '49lskk6u5fw9z0jywbba7w873vuz6wrrisy4wbftdqb9dnaxhstjfymht6pbfs2cwmj925pxfxvz9p0rujxl5k3zb0jehveh2nalt0gd1g7tee46zqf0z9pow5expl8fydb0xuj5xfo0tvwgd38om3wsob3nwn51c6n2wzay1htryrpmsoxyjfcyiwm6zz18xd3jnqho40szqelx45q8yieny6te54oune1gjh8s1mf5ssdgcrfs6o819kn4wd7',
                surname: 'ykniny3k5i73co1cf80txkxr3k215zoqu549mql2a99z015wiq7fqsrgkbidnbhtytfgupabtwiogjrjqp4gu2hzgdz2fmbt7krdl6ewiv36lzb8kogrmcac2sxvpccraoob10bxxwbhjjpceqyg245c6qs9gkyorq4rnzck5azq323io9m0b8q8jr6x77nry7mm1vlzggjnkrymyc4ttvmd3lkogzp0noxtu4523eo22r0h21g6szm3h23yfpa',
                email: 'crsnoxc8101odjvy2wsbjovbyplgv3wxdgo0j5p00e47pyihcwzal77t4pj45ybr8jtg5co28hhxyqqppx9hvmf6y69ejl24c0o9nebk3506y1ffbz7r7gwt',
                mobile: 'sd9thpfg3mge5qza52rscjz6d95w2j92uzodezczymloim652l7dek8o4m8i',
                area: 'gl6bytmihywndy01xoj7nqy6q49lk7u351u2hazd4c4ylasiv2gik9laq0ivjfisw2hsqiwxuyjea43df100wbapkvh25rcctg4r47lkq7yk40h4t5nuvq8otukiprjwbxj256fx81cptlikv268nt3m8040yyz08f6cnfyryj2lntqugv70gpximux3nirxwh6jqbn37p71v1rylc63w0ahck3n41ywq4osnerensv295wmfaybdd0zy21y8df',
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                
                systemName: 'zi5gowd2mkmrj5uqrui7',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: '6lb65per8x2jex42uuu4du4hfjtfg4ftkk23pks6wzc6h41lk40y38t5dmt9kan7mlpowxqdkzv9gqinsfed3i0a0ksi3s0e421pv04s2288a2dmem8oedegtge47kp9t1y9wkdzgrpzl45553j9lkp60bf6gpcm3g96a5fg499e8le3z2tgnke89ku0q3t6n977l0avsnr7xiiym40bcfg2v50761uy6vy23xifq1zzc0q5vaqckn8i8xg7p53',
                name: 'hoycskfwukyhsl93vw5qytvctqfbi8dk0f4zf7i0j69nsh8lrpo7a1e5vn2mpph7tvazdmpacq7fmfhlfqtzrm5i4qhz2dhnixdzeew5ykrzrxm2bpt9jjopa5zb8k1inwbw6zp7utplc0dgkfj57cmnbix7510i77gwyq24c1zfi8wjueweuo8col5gxw2fl8c1wscz61hffcvb7cvg6pay0ypbg84pn9shefz79ankishx5vg9mxdcv3dt4bc',
                surname: 's62xmjlcpnkq889pgcanq0mf0smvsthvwy2mplpv4vajwiq6q3n8g4wv1bn3ogmvq1rjqsjzfcy22441jqgx6cvl5l6j8v1rv03agbi8v3iptp3n4aiq1uid6sn4vmtfmg8p0iy55pekpthc4widm9si7vhtjlczgxox92m2alkmupuzo329dm6awlebsn7thkb057jf1i1rfw7ty2aqdojkmytsk4w58d8lwltbcel1t431b0nmsc3fp4kzmn0',
                email: 'r9mp04k6tyds5phvpddohh7p1l7hbphb2z1jew7mo4fir8lb8n1goj137lz8dswthmmo8thwvc8jv1p2w3t5nf6vsb9et8yamdz98ftjleg9plbxqmnwjzln',
                mobile: '17ftpsabifj2wxs0m0fxi961o165hobtm4iaq52a0fojgkdp1g5cst8fc7dc',
                area: 'yg1shzhva2epdned0w14zbnniclt44bjib6al06trfgqy6nnd2xsn9feb6n4j20okv2immkuimgiceyztskx766i5yrwaz1vslbkc08td04cen396hmm8napxognefcbtfwekdcqth019z505zuwbcw4devg30azwtcx3k50wwelbsbvbgsnd071f8vn4canqbaotnfyw85i3kvpkktew559kutgsgkzazilppqjyh2yob4p4u0xg08pcmqx98s',
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: null,
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'fgts1szusmo5e5uuiirtiiwq36ur4931n3zlemen5cc3hado4z7g3kmbphrrcfjwhua192ynvt6rejb2gk0szkd74ebegjok1iok5pg01n3vawy43w1pkft0kqjle3rpbukcn1qb8ooztazpwzholxkif1851r6omokro4l45ckdx3e1p7flxrgrneez991cr3y2aspz7xupptrnf86xhmaxo4sw8xq06wk1jkwg0so6ii7mnr1viqbvqhzrdvf',
                name: '9g1yenkmazclf8xj6r6kdp9i9wv2om4pd8romqhb4jjod7k4n8pt4a0aji6qty4c5iq7n4omhbnpudhwvm49v8etigpjtcp0g9lpihcuh7z4whzv6lxlywtmpkap93gvzceuxquim6wylzlcds8jz3ew6aftkoe6fvnhus9hi06veegob8hedjmdeifvql93lpyx3mle85dqh6j74his0qjg9pylf5faw0yee575zvvqks89eanu0oh2tphxb3z',
                surname: 'yxxwwub8baf8hcmp56sz7e9t3ppb9mccg1vscx00vmnwsv5d1ffrb5f354faejkh3nuqzbc5u9w2z25jjklret5h3qy37f7tt94xf6ofievarys7fo1abu2zcjdwdwdh1qiuxmacokmp6se6mhfyzn0dd0wya7ccww4r9d9ggs1m7812oeyz40vmldrnqs1wkzqap98i06fofmhscq5d22ffe7buayu07l1m8hf69x3e2a8k69x8m59nzfalsii',
                email: '5fwnopxcktsfmjyyloph60q1bsg5en9bebvvni8e4j8y64i2tseowqtpq3ybodfem4tf5cr4kzry6v5yurmarzr9rsuswicoaib5xp2cuhf1hauonibomaio',
                mobile: 'mzmatxo18hkkyx0ocodjx7ff08fyip23vrptuikn1p2f35o5agr45zgko8g6',
                area: 'xxej8wljzk49lw0f61ritqdseqki46ehfeph28hkdg4ard2ozqkcnnrrkmxeiexfgjis6tec6xn6kr8s2zik0db2ec73m54lra6gxievjdeb17222k5scxn4vtw6b0jnkrcd487ufk7hi9gvmowd3uu7ce29d48dishnd8g0y6ygetq8d6h9o9xx7worpilzi00ktvm8z3wge0dxdj7puyesuw5hqhomeruwnnfg60tp1f12eeqvz488mx3irrs',
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: '7znfdgigq22pk2yfpkur1uigb8932po21fb0eo0yw7gzqz4rcy05y6cb35iruvjficzs4p7ox2x3q6abex8wxlmpx2e63a6q3k74vx4w95jlom2poszp1u1pmwe6rtrxwea3q52y5mij0i1k6mi477rlohboeq8fczp584i4hp7n3kpuofvfpiwdu58dmwbe0aeiqpv4emtxn9rrf4kzqesjhpkom1sv6u0jyd8pay24un27dv1gw5c5x6r88qk',
                name: 'vb6z6joy0iknps32rvolfsnpaji5fwvdxwyaqfiw04y11pdl0ea1j5c051notvue120t35sjw1qlfba1t34opys80x1jjl84kwer42wb7slln9qsyk4z2vru8uzhyhrqfxho4t0gr8b7thceobd8g8oxinl7znhul9xayze8l3yiirwoqnv0gwg6oul0fi8jklrk7rfw8g3ycmat9y22s4odt9wvhab6frcyahrruu3wf5cgpfkst8v8zyi6p1o',
                surname: '4hiijfba1g277b1eean6atuq9cv181uz0h0inp2izts5ojyr4xyxv1en6i8rk1r7u3ndpzu1kaz49wf5w8f7v934m76dci6bm68fnitb51r5ei4wvpvsz8xn7d2z93kn3equgv6la1wdterrtr28oeqv5elvjnvjabyuud5q9z20s57wxodfuh0rogo54wdlgv1uq8187i087j75r9wiyy97ecd5lflea1ifikaezxkbjwdh8cfwkhg65rj2nkz',
                email: 'qeor9526w8b355j54qy75js5xafyj8xa6a4n1qbj3jfv7xpb7tja15p8cjj7eeyz8mtukqargr3kah9wh1ymnn37zf9vnwvd1osi2vcivv9ye0btrcd2zrbk',
                mobile: 'hybtnaoo5orzcq370ruyk60wp2ae67tye5hrmq7zt3lfx5cfy2lcwy3lezli',
                area: 'mun74fc8o9qmh302ubatow4sa3s44g6uyakry88lmtd2sij6lyu6peppd4xttub35tjj5itvjhpn5t8kwjl5o6sa2zd1bhw9fmgy08hdjstl2cdla5e4fvu56u0ebkqfeknmlwfzjq7is10ndncbgmzk5miot7mma2ehi8wffvd85p75d9izis8x9k37xuylelsdl5pb042hg61g90sflt9bm70xkj99648x5r92vmfev868fht1q39lvbs1fnc',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'bnyg9c3jtwje89o1j5ue',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: '4j7n3k86fcck7wt6ul34e3fiypgi9n5qdiybiikvoorp51emtcrpo2p9p3w5ig14gsx8vn3cr6gn275cpechjhslsu5semebcb30krll3w6l1ldzj8yleji1s91yhut6glaezm5h638ei6m8ipbm6q640dtb54tnh693fm56uhd5n7qiykb2v1fzjo0tdxu11d267cnyjij525ytt7yqku5mb9n6frk4hqyluwdewyme0oe48z9px8ngyl72d0e',
                name: null,
                surname: '2n6aoy4kel602gcq4fyce5nb8ff5j4miynm81zuwso1knd5cs2jwo75evtekpo7r3u9xqey4dyk86shwk1vzdwbdadvo35amuzsz7ijqnc8s2gls8qfsz16apfdorxuz4rbfy00o3stvpt36vo2eu2zzonf069i9r4bo8nfml8xymtqy73itafdidi6tlyi5zckt7xi00hrj5ir4ovsgg5gfnyfohuphhtjxmbvaklxupo6oztllul51hvdc8pl',
                email: 'sfcirrpbvuel26zmqimchoxkekywktnor715f3e4q7oixp9fzmlrraignskfwtbx7pa3luvomb4kymsf8muuug0etcvrj0qdzp9ojgplbee1db9o5d4akjcp',
                mobile: '8mzztjj1lt9f7c432wvw5j885bku9eiwpqcgfrhrj58upkkz2riqv99es1am',
                area: 'ydvwa4fkrtkmfq91uy0hpk1tz4d8jabxd7eh99j4b871njvo9s0b293lx1w3g5257tqenzbyj8oqc3j2rkn8jke0bhk5pdanvreyvuf0doi5651h3h5g0ee6csnl6kdsrwap3nn08zn746u9dafuxiebycj54v0dgln3w17m8yn7deskhgy4t8rudln0vgz0cjelcqwbp8cnlirxybf5078h5imzw1o3olyack2l1u6daglbmulxxh0whz8gfx9',
                hasConsentEmail: false,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: '6l89xb7bk81vpquh5lf0',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: '7p3mx84oea10uy7dmeblgmcm7t7efd1omtp1gumt5bnvmbuebhsoviuk3pv6iiwdm9b10mfzutyzhsqvzu4mpph4xeuyx1s9td0v0cpn9yg4xfvv8jfp3vexkup5lvlqj6kalbj44n09dxy6yt9r03y8hy6cz0of7v36thjujbyo2bw8dgnbdebk25qjjceki6tg411b7agk7v72bstemad7j1j5oopives08r4jfafrfdiux8gugxm3csrjabe',
                
                surname: 'n3psex9qv2c8rhwcz1wge5wex2s7s6tfcjidn094j6j1zbdbphl18sqlnseac0lvr27iwekqy4m2umtofepc03a76cogqeqjjt97z6jxpq9a03bmgn96eevehm747kx8euajbml7dg1odsmml2turrjp3kzavofqjk6ytu2inoorb817je2bkmnnkhntagix7vulsocayugb23e16u0hnojh9rcbql7qhiap2yc630t35kq69r42piipibdlvl8',
                email: 'xqvl5z5w6edxd5bnga8eg5szvvgwyvgy5wznf0dt3r5kxwpq6ei0vr9j1vkjct7rj9i9p5tbnuzqe558o9n7mayoqp4xt3lp5xaeqlxz7oze941mqr9772t5',
                mobile: 'y0e1leef5mlshaj4a6oy0dwguk40ae3ohyspysobro69jsup4n9kd1ufjo4s',
                area: 'bk7bfc1dcm9kxr961c1xwv6axggyhzpzkce1t68kaav71fb54u1lsmx77kmr2zb17yc8hhdpl9rz14d8kdlqhqsv9s1rpq0bygo6dx01hyshktktdser4i3thzl32zl9kb0frtorbyes0czk6bmodbssqfaevcmd89awgcuebmav4dq9ibwl2f9kjf2823vzyj000zcydopwal6vxzext6kp38k5utewnbu9bxdw81bxo6npcwuut0fdy4v0j24',
                hasConsentEmail: false,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'rfmj8pxszwp6nhle2wdz',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'k24kdqwuerzj6cmgpx1gehgifl615e1s7kuc0f150zlpmws12a71bhv6j0m669ob4t94pamxpy64cwatzrnd5mpdns9tbhm1pv5inxszrzv0mr41mmkhuj0sh2yl9vvntyrh2b79y08hya59ucibmr5wtb9jz7snec4tpegftxhwvi15x9aecmqetqktroq2nhzq0quyn9vxn7qdrrightbao1n7tm2o8egj5yyvzqkwy6k9u9kg8gn56a2zl06',
                name: '4rrpzz4h81y642macedaq6s39rie9fz8bk7gvyqsqqafmu440yk6ayawskq2zpxek02tqat9bf86ckwz5ypw9uv3i8crf5f16vbq5y8upvery7tf338j5j8gqvw8jgeh315bwmowxi3npbhq381rwpe6vjf5bnlcph8cvq2w85aej7k85j5yhbxu5njpg57ot3u1sj9qqnmj41m8n18by6p8r7yj4xwgm2bzzzpnkhrn66th9ogw3unehvayt9k',
                surname: 'p6yc4ufqkb2nr6cw8pyanphck55eb9b9mljtjmvpcf70c97iujs5ua5brey4v8iuxjugbce1ir3hj5pbhwr11eol7fx05vhx14ac7eynocddzt7995ddfrdrri38j2d6k3n1qy49prqs764sgn7cj3r2ewb1ffm6fm3imyid00vehnskb7vnj6uxlwh5bukjxdqmpe57rt6qvylxazs1sq606ss6hajbiu7a56lgddes1u16wecpm8ngc2eub4i',
                email: null,
                mobile: 'f998jc7u9bnol6u2ox8jful7fc3dpz7iq8zrxlak0272pw5gmsbmkl5519d3',
                area: '4ud6vzbyw2mu46y7ekmrokytgaf9uhmz84iu3a32c1z10clcdacfu3xxwyd7om4imjcf6kip4erq6rcsacszcvxy7aw8zq39taz3irspmhfpywf481bjjzhllzfchgomdv5osudy094svz5w0l2hzacrjtheddewz2w8qtc46ftmgpeq7yoliga1cg147wr4fpunm4riaa2qdkxz6rbn814rywcfsuwjppm4gbf3lxwyl2fhg9x2ksfvseixvax',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: '8uvl55xd31ws37fnlvqj',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'ip2cnawoglbe6u8xhssdf4i2079mgagshq3lnyb6la12styb686woaf47370vx0navejblu1elkbg0j1pgo2156y0ewq9uuwegpxpgvrlm7gp8spk7acmg6tqbhn1bttcycveisgh3rj2donjw27soth6l821vv813u8pliw0hhcgujykrqrifsix9y6ojh1wqu034r2zphbuj1kdkgvrhoxvm87mt3yxx6bjaqantw3w2bc754f85pudtqaba5',
                name: '8zuv87383mlkce120tu1k6v9czc3ffn07qkht3eysjkwcl1wptn2sydnj55r35v0mmyjyqv6x5zkdljfo68exk08aaegp58c0g6wnpru81sb9uhpqiwhbwh8wvk3fqguefdpjzyul9uh7qa6xrmlty2d0nc9sph0e180o8i4u0n8fa4fudykrdtj5i1xksa4sip6wujl5ppkivqowbxgbv2xf3yt3ri2fd90qkeo9u9eyysxbch2pycpe9ohxzl',
                surname: 'y8j5fzlxo0no1wcvkobadgre5c2p4o8759y05ajijyvcdx7prk88l2mw8flmb253uff6qyo7x9xg3a1ihaold82ue5bi0vrjpi74wqqj6l3huq56r9uekh1sekx0a0qsfos45lndktqbhdegtalidi0i8b3ih55111dobsyx2eiin14ovc5xioo0g5i16atug4n1v7uybhaaisuh9naku8bdmu8g6x4en9bopfnzzirv9ulafj6rs9eznm5k9pc',
                
                mobile: 'qziaefds9jh6dijkdi7knzzixgeqtigz07lpy0qpvu17rtnwc37hgf4woo6b',
                area: 'v6ej7dqwwoegg5bedtini9zfh8cvwm764sc6efr0bhdchtlfdcf35vsr118gvcxl2zmmotwcbadqmvvy8mjjasbokdfkjooc1q4p91ef9ftxvqjauzhsmsujzm4b5ekhg5g0b1qe7rga1mfe6kboouzy36t2gtmzlh3phw6jcjazvimd60xum4mj2elx07hpxfjsc2iouaf54uc814s7mwvh4bthu4r870bb8lzhn64dhbgjokn9pjjt4pu62me',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: '90paidjr5sxkl3f5bm1q',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'w3j7vcsppamxh3pj8nd6ck5u2lz8t0eu02fy537yaqgeh1032avf49sdudajut0m1wf1g93q6zsfci4em3x5t387f0l5q9fulc8s3gzaoqozv04fmqq706dgx3zod195j2uo9f66sht3q8wtnb77zmtp7ezw59ghv1ao55svx2e730wcumjphw9oqdsvhdth7yz2zev66irb2j3ahjyeqdnh2ufszp4rm17rjyvhjbhnfneiurwbab9mr5rfob2',
                name: '17cjebaneooy0ifc8p9wfh6cxh6s1n74ngmqbrh302wv0qvyvo0tb41r9mxlot09nal971hi4ej9n6q38p42hyy7ejapz6w2ywgkotjtmjsetcnqr83q386qdysvm4h4981ytx438sx9pchwd74vwjul5c7rd74pk4mq963hhu3wtr18cph76p2lb4mxov3tt6qcm728g2sm8echdce9sx016hz107commzjbast5rvc2p73k3wjo5eml5umct4',
                surname: 'd92lkq7spjgif0goxbecfs5k935i55d55jn5075rj5tz7hhcc91zntrh6hgdnhz932123s91qx0ob531vip1c2lk1yczluzv3e2ym0o8o9us5k3n5efur1rrneb8epbo0e22766auq3ie8jgf2zomsf6k52aznrg89grn2ok717wgm94yhqbpp86qf5zpm9gphpvrloeeumjq4ghllpgpwr6qq2ytti25hls8buonkz870kr9stlien7apar6g3',
                email: '2b676c5y9r1le157p722dh8e30o8rcmlc0c3hcuca0qgkv2fqb7wuqc28rpyzy3rs9gqitqezgsgf9aiprkhm5z1p2meev8xoqokmrb4ru0l8ry0j7c1vltf',
                mobile: '2oo47l66q0y36pwalps78sa0pm27mrnpw5h6exims8vl1kqtrjhqmqi863f8',
                area: '49s7ivykl5xjnzip4khzhlt6itosrkfcykucd5ky71uerbyn6b3v4no5kq7wowrxckne4e4fdiiwhnmegwb6bq2c00t1j1fpvokqmijnk42voarzfoxkzactgg1algnrntnogjwb13fpj0sg8fqf92wjbk7vz035p36wvcd68g66izx7t7et61i69trwa2szgg4kwbf0kk6iwcm5y226oluuuhb96cucinuxjql0whptn11wkyycr06re99qjhj',
                hasConsentEmail: null,
                hasConsentMobile: true,
                isActive: true,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'ahzybzvbklgsizv45ptr',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 've3c2kzxalda403uhadehkztppoev3o07uh9uy1notpf9znrzmwvl76jfhtblrr0h6686krpao2rknus9kqmvc19zvtbrofn6baz3s4jerlglqqt98vktfyedyole73gszphndgt1zpcttca83aei657n54pxyeq6wkc3hgalcxizkbflm6bt7j9yyu268rqb8jm5g6cm8tujvn04nqyekjj7k5zbl8rp9k4vcxqv7gujjbn4hbo0moubo0u2ez',
                name: 'v70djt80efvyo3t56hh1wofvmi7zfykogm5gwf59yi8ai5oo8tt6n80s0qweq9gd5cq7sffnnjsnf84pw1cvpj2et6p1go62vrmhcf84hdqfrilshmgrrcg2bvja2f1b3bnsd1fp28stmpvt027zik4f8dfkoqehrnxuad8xkeho4gxfxljewfphrhk0zzpndver9yabbj4pvh8aogma9su59ukf51sn9eoywolbjx7k1cla1vr7ik175h006w1',
                surname: 'aobma5jxucju2lu3ho2pkcqz16gewijpsek1nurwa9cgt94paab5sjswdbcmj1urpmhb9sns8qf0eq0sg9bpncv487cacv41ire9tzrkej6y116z4scs5ma0goyeay7igh3vk3iy3qcwj34dkxo106oojbkob2p5v2b5yn5qqk4e0auz7pwo7tjq56fwvlhur520pn6lyiulokxo7lps48uvnpo0k682pvh9thhmzs0232sjmau84l41jsburb7',
                email: 'c1m9zk8yxyoirgk1uh54388an84memrao7su20ir9merliimjqv3u5kvnubd1at43lp79i9umgnrlqni392rkx2mk2si587ynfgcqu3dpu7hp872973c7pkl',
                mobile: 'ws95r52w492e79x82vyl9yhm7p3ebezox211siq8b9lk1b8y71j47rdeeyh3',
                area: '6fm602b9odsaamcfsruejcnbemzr6ig2i19j1xecryyv801hq12spkcbcvfx8vp4hij4uk508dhgrftfywjn6feqoshv0na28bsk7ccu6zau2vzhi2ywqh8c0d41x0zcajzkhh2vs6iq6annsioqwqq89adi0c70ylrr2hx2a4j7q1tk7v0nb9ucqsj96064xxm4taanc2ifh7yqlce373oce6eb64m24s5zqa4hfpdwgp56yy2s3ke0wctxi0p',
                
                hasConsentMobile: true,
                isActive: true,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: '99bc9eqs86c62g3e5y1j',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'bnrjr56e2rhm6cx3v6bhsadeqealemyz1roygs0mo5wx9w2l0ngo8m6vct65pu7tqbpootj4r9zmkyxqoc7ken2jlv3xrsfhd2ag0b8ywk1wd2u4au3lbp491vg1gl4stylsfiq8x2jb5jaai35b2o8awxa5fdeuugal17nvcvg8wfmv303wevyapztgv87np57edouj3mmsm9eslfd9525lel6r2adsusb9jx44g99uh7uto4zpm0ni2lml1t3',
                name: '2cpxvoyan2yi0j6bb7ixu0rb8asg8ywxvoyyw472j1ie4wu97rt89tikvxwz4upns55b2xmtdvyvbu8u6i48dd8kpu8yggxxwtagrewy31tafv411ds1ddurqly4jef6c80skyhsw5wy5ccf64pv9r4zk308h8646enynpp1jq1032942xvgejy6c9xv6jgirrz8zpexlqn9aownekc14gfr0ppcv0nu2fsl1k39dagqjxrp6w9vbq51isyjhg6',
                surname: '7p1nbabyq303ptgcvb16mct0dlpua9o4qz095u7b79hm4j6ikun1mq0oc5ffh162mw93s0g1pq90ray1hljokq9q0fuunar35l52z1xum715ana50zgohsk56peh800502grg9tvk1dm1bqbr9hf69tcx1a3z6oxksbvm21qlmeno47sk8x8d7mm3v80ge7y1041yut9dw4zfkzujwx4ks88yvjbymma55wukbq8jr2cbrq0of0l3iut56tosnu',
                email: 'gxnqe3epmeinc456xtekfu3nhyt2h470y3n9av6ror8m35gzvtrvohg0ej9hqyoc9yzpnjj9qwr01nmvxbc3q5m04tk862v4nc27r54i5pdp4gwaamc4m15v',
                mobile: 'i2tmppwe6stq774kxuvjw3x23ql4b024e4p9b0f8m6k3bzb1cplv2kb2rbp8',
                area: 'm5m9e9zlnbwycqgpl6r4bag95oqcyk7shrvvitvy6s4q354hfn6sgik1qcmu4t5n8i460wpbc9iftd6wgqhwwvfn0bz55rshg88winj4e4vw4e4576egnck9os1d2azlaltfgg5vu2fbjfyxxdpbg8the56129gzcpj663q0ko5yx73ib3ovqs2iilsgys367nos1iuarkslbgh15zj1bgtroxxl6z7t339ftz0q810lhhly9htxxel6a7a9aqn',
                hasConsentEmail: false,
                hasConsentMobile: null,
                isActive: true,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'nuw525rhc930qj33muk3',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: '7ybzp6bedozxpn5zoyntbycnaer5ep4qam5gt8pqmga1mtwbkxpyfgydq6l8z5cpcdkpwigbyiva9j2zv8eo53eh6jxnbjkm6729eoydiqn19mauy8giksoot4h5hc6ssvh52y6c25m4an9mqw09bictfckg1bx3uzj7asl7xds4n9fcoc0su6tnmkm067yxoduqkmgh5qhc2tr8yqcl8k0ncfguxdz9e3o4cqhw1prbqqt035x783gfglyphrt',
                name: 'mfg91lwbogux6x6ltfjg5x9vfgbnwktbunwdc89ymfdy8oaybthtr6ujyfefk5djcfr89c4lc3kvorju2zjej3jyodslnu6l9iupwvl66py0k97gwv9uyypx229orcbkmor5k3kvqcqgl1opalaq4pa13q6exqvk2g8mtfmvqtinb1h6gvb5qtxkf4d8rart58rhh7b2p0gjxws8bv85ea985udy1f8xnneahrf9uyhk6oae84bgyemyiyb12kl',
                surname: '6xxray4aohzpy6vgt1hvov66yd4bhxf8sbynq8c7e4hyrlwd7g6ijlf8g519n0xg50zeykizvkqye6p5juoym34ma9r0qxhrb8odc8zzjk9sv9y1un8crldztc320pz4d0s9o0ui4qn4izlb3169g98lgq5jzq2fy95nqfr6994crp0t66q6hq9nl1hg1mn6x0w4rd70rv1vseks7ia2rguw0honompj8xbiflc3yn8ir1seedfutgxvyp6q9at',
                email: 'izx9uymtakxwn70kfg7pk17tpb932wyeki2r3jwy9hf4awjaojqe9iez2m1cilbldalgaa5fk7safhv4ogkzu3xn5cwcwti8rbfx1hffxmq94z0bfsdvzqzk',
                mobile: 'moesikt9daxitgfic5t72l36qrvdrrk5rrm9pynzfysrkrdbf94woi25hg5m',
                area: 'q0hkyyct0yqx7m98rj5f02apywxy7ieeq5zve0u9lpmsxz7dp53vgnb60hnrtilzngso1uabae7c4hmcfz763abm3kyhuiwfp39zzutg8xzaad7br2ew0n1mbwdkkb6e9soince8flgeabiurnzbo0g3phwovxnj7ru330og4sjotu83pxrdtd4anajlcedmi1mif40rn32gs8djrj0b369r6t2gxhxayr3mxe017tjikpko5os1k5hwxp7ab9j',
                hasConsentEmail: false,
                
                isActive: true,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: '1ral2xmxrwls4ipg1ii8',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'sm9rhw4ogyatjudgkhcfppdfm8jmhaiizr83urtt00xxp88u38iimugsboem6j163s4ilxjkj2hyfirkv6c7myeqygiwcznauhybmc2tq1len89xwiw5pornu5waz4n90b4xmjeaotie20d4pczt6nwqtxca99bbp00m5ta945sklac8hk56izn9gzujimvxhkv4b96luz58m16gg0ja5cit0xv9jokviym58lw6sfjy2jygjingq1ycls7brcl',
                name: 'j6muzqvmavnrtqg7v89wf905wk6usntslburnchuud2vuname6zi8u8yzjms9omegu65fiz11pv1idwm2pvjb1macwpzqc0kdjc8p12oj3ifr802j2ciahxptok7ddee99kym5i72wa4zosm1zxyd3yjglcgvti9hp85pc80rpt51qkwnsvno1vzbxjc0wksq5y9wrll7477pwttl7kejcmfat5vt8o2sc29u47zel588tv26c294rxnkqmf2lh',
                surname: '5qxi49flht14e83tb1t8qcwbkuxtko55zt1vh92pl7tqxrgjgnlfyhsmqjha1jczmx716yb84c9gss5ql0vadhrrfhu0y93xr5s1px4b3orp1gxuuxar7ce8qewhv66fb0i87tcxlopig8qt2hv1zzvzslvz8yw1wngayotx7nf2yckcq9xmen5pams6mwbrvoh4ar8oxjveril8vy6g809cfb7l0nl7z4vb3gdk5alxbese7b50x2ugjkquf7p',
                email: 'y6y47thcgfrhxypc0947u06r8zuda5pem2o1xblws5hh0r0ftg61qwai3ydef5kh838f48iilxjrmbfyv4p9fxlk9k4qgbfsuwfqrkd2y8y8in9laebdjuq4',
                mobile: '8421ueo3iapaxcxcl60602ub2l7a3etw6mads56e4v3qhnhn6alstdbzaaqe',
                area: 'udh9hraz6y82ium2xe855u38xu4vmtd630h0vd2jb80ck4vhegi9sxnx7sgx1ix00gpzupcr5n09nfe8cg3u1c6f5d7m5ptjwuxmzpewaprzk6njfknke24u70w1f4ykw5s2raet1lbdgz73wjy0nw2kwb6q0nipl38dtquefzrhipzg7xs0xmas7ui9n6zq5ik35unbexpyt62ns78pm1vak4265tthbvl6r1inmw63n5jiv95csb7pfa72sxc',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'kkc9od9w8g81pup6n8kd',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'x7rm09xeakvbfgo1hjtp8cmk9bb8onat315jwxhmzvoiir4an5xcayqzpz92p2q9mmq0q9f7y8s4bfe83fzno8ql03y08pmzz0sc1g0w0xovngqrje9clrstyepswctlqhyd7oii2zrjfspnfa0n2o6qkygt5n1rpauqzekq0lfccqspk4udqhzyf7hd01a70jv9uvaqd8xnuldmbce64y37ehky5rw8pmsb0ijgr0zx1x8stdzw3xo4tganv4o',
                name: 'l4iijmeri3ah5p5kjqte7o7t0bpcj3wvelnrxqq1kga74vlow80g48ipbubydfgx5xpga0mpset4uu55by81v3h5hk65rkidtc4cqjnyb73cpkmb63k1wjxapjvap5rq8f01tcjuafr33o7evj6zinyswaorywjxw2c76bmsuoe5w4jsj7ro4ltxgelafnwayos27vq2pwqohm4opj2ob9s8n1r5bcixh86qt0f3w5drw8vzcv6a61ypmkaq67p',
                surname: '23cz4oa6ojmvg7gr6ss4ris0prym7rwdt18dewktmtvgg33bwhhzj2fty110yr5atme3fh75a20w2oqm5t00xuep29lsb3ryma16al68u6hb34nud3skb12qxb8y913lwnn780rhq2a4g0ta2u3a6kbi3taq586w6k3z23wfilkg8rayqqmzojwi891w8yjdlkg2bl0mnct62fg3cwsoix3dzl874z7wsz7fp8wgbyewqyg3enyzp4ukbfbfc9x',
                email: '1gmb3616egqbmxibl5kenizs3cygjgesquoloabg3tcffgt40y3tusqj9g8cz2hgsv38eqhwql2is4nb94ifj7dx1i54xcmm390jm4nc0j6h63anpzps1uf5',
                mobile: 'ca4061x3cihwjrakt8g0vaqr2b4oyq9xd5a07oep921vbrm4pkh539th3ywp',
                area: 'bw60g2bgnwnhpl4hvxnq80ap36xe17393e786s43ocsqh16ac030a6yf98592ivlktdzy0yh2m3iitpa6kg429atmg55c73d25lkvsvncalx21mmvy7tyocfrakin7hpjc6hoeuvba0glp33j2fx8vi3r5evb7noxxivl976mzq9qw7oi9u2op809orlanwzox43gic7o3udozmsvenmeeioypymrujckg5rxz123emmk2gqds6mhg4153aowuf',
                hasConsentEmail: false,
                hasConsentMobile: true,
                
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
                id: 'awx3m3n5x1yxti6r99wxiodzlno08govxu872',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'yh9ny111rmg4jb8vghig',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'l4vflqkz7myuq5v4jchl82nmjzvxjo53nsfk84tgasqqs000zoszta8kgyj82jonnyr5g4bdk3411r7f312qsa5942mqtso0p3g1c2jb85eyjan52y7sdteyyorzfvspxlc8ecfaioy0xwmcvlyo864mueislyayb7vb96pxth6gpt7t4ejmmz1nlju5x07hwhcel0aq93cha4g3kjhjumor8urooy75ggdiqrauujd7156l11292tby2n1fozt',
                name: '177jukrhydfcwypoz43fv60t3dss6kx4qtwk9t3rt8bjpaxutcyisfswfdfe95iwx5oktnm6qf9cragjlltvm5lgsglslp1u4kugg5v4j18mgma721fm1wo9mvhzzw83wnqqja59p11ehkic0073polpaw3zvgm0a6yz9ws88bf0ho6hrdtd6liwsqzo5jxs8cohlg3u2pk2jjyygbsph7fqtiytvkngwbz8wi0x1o7ch0p44dyswpquuwxr2oe',
                surname: 'krl9ezar3mebgp68d6vbvhltb7egdgdywvkbedts3og98g2mbxnsrczynks6u4vut83iqx6nqh4i5fsjmh9of75vdp6wnfyxgl3carm3397p8ukzi5ilguzk3ovlwmqpj474hza5rcx39bukw8h8vhz7wzsx54pxi9e6mqacujfd3lnrifa3mypb3xh04vrrnb6u5v5u9dliv23ndalnu98uxzgwig7hw85r38f7bf9ega8yre1novtbbuq58vu',
                email: 'h1tmi8i8ka1y4rue5qfiouyze4dn01lw9f2vfm43prfynf4grttxm7wo10oooovasxt63i5zylwenf9cyvbpl49z2pceqvfulsbyqaftgy102eyzadyj03io',
                mobile: 'py6myfz0iayvl33i0qdhgdl9i59ry294ghnc9ovo44jq5rqbukg5a0qf940g',
                area: 'y8rbnsze3bf8mldao7xvocfjhd983lor46sr69o6v5x4ayuq6x5nu54pvshdkk4jspwwp8zg17f5uq9xhwcydiqhtm1qencjp5thj7xzvye3c4tact2du7rx8r6k2yhaxqdztsb65bh3hvhb6o6f33852jwj6h9z7u3zhcpzx9oaoqxbqen9cek7hhukzyql1q2oo92zp53p95bq6hxbmcxiuyjas6ho51qe4sfkc4cqk5pcovzi7fwd8bsz5j2',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: 'gnr8jpgl5yjsa08kr9z8res6e78mde27mosid',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: '2p5hlydyaolx2ppxp1e6',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'vvpen45onp5iphwip80yvvlwfzj0z041xdl8h9r0azt0m77yxjdntjvdocm513f1z3c2gvmpl7k2nuifj1wg7qp3seqanccm92f3ch58mptc9qu3t0m9blo6yif26i2j76a80sy9xzw935kw5q7ss15mcdyfgs0c1zvsbnzcsdoqeyfkqk11oj8jcrikfmqob32ewukr2lcodtglakanh9ghwzh92z7tr7wztmccu3aha9kw3hgc2nit79m73gp',
                name: 'bgj4wgdlt8pz2obe9jkh7g5vriei4nzv8bxtm20vm8gpl1f8upqfjmxv3icaxv8bpgc4j3jl4eluhkhtjgvrmbt6j9a3rr2rxwcwbv8no7whnuaavy8bk13rvjjxy90m30ez48hbjalt3toerhmuck6sks9u5506rtbmysx9p2dj5ztzgh7qs4cp7gz3olxh1s3xjnpeuancfc5nbij57twi5j2ok77ivxhlgeg4yyjyvd5sjvrhxefoitwp17j',
                surname: 'kgbab1jvt27ane39jbi3pnoh68p7pwnqimqge6wacwvy1abb3wutneu8wq7bkias7k2pn86dejp1y222q7yvic4ooybjs9yljp2woyzqx65y400t5a1q9l2qdq0u3o7dzcollhbtskijldix9v07djdqeqaudkg6e5eq81ul25ex8qvpkd5ywiga1xhaejm3jiplk5apogcsoi1k6txqswss8ysbbaviwoi7zb5lhprvi3mi1etzgs52rl94bb5',
                email: '92nhspqlrp8kjddkanbxl9hqa8o88q87wae8cksuk3e3rg96ynvaf3rlx2yimzs563obkacuc1ehs9gv1bus7spwcrjptsoi6j09udold2pr6g0aeh1jsd8v',
                mobile: '50tpmph78v1x6ilb4z3uwzh4enu02qacz7akxhee5ucspj5oku8l176i0rda',
                area: 'aem82lhh3uparaaddp39mxntxo533x0fd09qo24ltp2qedfsoh0sat4ldridsvqif5uixwamppmjs201mf7eiuh1sdcps5g8macmdlyd459uavfqeo4c99hch1bt9ilw56xswsxcym1p60x1f41fh6j74jaudaqf1561nf4np0bwavqdlqtgvd6brnm5cy0tmfbaiehdfjwhp3kjopl52rma1fbgnk7dxd07zb070llow0y4uvqk8hhj5x303gw',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'er3re1ek4xnc6of4rpxa8q8h2ew5vicppmc78',
                systemName: 'uyqa3a3s1x5orwytled4',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'dpwsvnkf8s10ema0cazlb4j11y3vm22ocqiksi53kvmyr9fz6j59t6cxd5esrbpt12u8mnulo9yrrtpiird631utm7myi2w41ft2zy6imbbvwq7nftam7vmrxk51tz4w0e3qzbi5ga40innlk6o6wdpf76jxriumt6mum26d8dc2snbbd9ulu9sw19dhi6sr44b2bjls8t6mbeckcjmg6xf5bmvln9rk0j0ieyy0edu4k9jipi1wf60z45awa6m',
                name: 'h05iozyau9ezp1bx94x7fvk1402ha7znxd2wbb7pl5z8mwu8lniwkjg08j27iwqvtey52xdn31if4vcl6nigj554gmwjt2q78x5h3ag2umjqbn02y4immv1kq05180ppniievrjl821avrj77b4wrtoz1s831m811fa9x8p57v70cpjyf2xw32qk6cl0kixateub1wi645476rt9jo412iw6nv5v0uv6d782b5suiikuwx4z1t6yiippizl7bm4',
                surname: 'vz4aiqxhcdeuzzkh26wit0cv31uwvnlgjk7bxmdfwro6yods0mjzfa2de342oahvif31zzpj72t73bjfriqwi756opiu4t80tqfbm0a467mv3f0a3sdkudne5t557qa3z3zfkvsk7y7mo14gpjkw8nka09o3520z1sbrdrdwtvwnm41rprnx7oyiurro5a5xnogez9uiu4w8yi5u49mzs6g8qkqda88tfa8ge71ku1ldthhq7h7yu4r5fbv4h3u',
                email: 'lo30706jyxofwhk1ubtdbodc1twrs7bmo6xp9fiznur6ccq4vl49ujabdq4171zl5x1ndwey9j9bqhxcio4kxdetujlmia651xcmcb7bv1kulxluzqtfnnvz',
                mobile: 'dy2b4bry1gv86m5v6dbuynw2dzxcdrys8951dtia3ejfd53z40l340vy7k4i',
                area: '7s94ttvfnxpdvtkhh87vncxrv0cfj2uc7fd7eiajjdze1sy5dt3jd6fyh18up7n51ltbhqde4irwdvjy3j3u6iyxxsgnl83fwbggjid8e3k9vmfta3cziuimtwxemwpil8je9ywi717vorpvujop2fbwbgns9cjqdx8lswvzm0r4p1mrjbxo3ktym1nefiootc66fbtyra5ddchwu7k813aggkjuaf3wnxkx5s4lbasxkpprrqyoa7foy0gn4w6',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'a6z40dhfp9fd84pox8yd',
                roleId: 'mv6dh5ow3jtesttoyip5fkbppvxhequzeyvyw',
                roleName: 'siouqajispszyyjtyv7tgqevgvxy5ak6lngp6il88gz1wuc680nd8vs1gmryyjmlowx4xw78ru2qc1w2w0d63t6qd29f9elowbzns0gkn2v79078dy0j80rhtr8xck4u46e4spuxhp9bncx5k54xp21l4o5td60idipqyxgbn741lq6pugj1s0yw7aqnxi6f0mq9txqwyz2sysndsj1gww5fr92xzahp8z3qiqcdpblv5e14bdu34oijna01sww',
                name: '8tl1c2kuagjx1yktddygyc2fbww8rkgl9js6be4rqeytjfnkd4b769leq8vcgq2h15twf2io3nss18a7dksl4qvsvgtamapbi73fikjtb7l50ts137deuppcnhwjo7yby7vgy2cpxf7z3ar1qdgzwur81ecsxlimnqx7y0cnht2jxma15jodf4i6wpxkidjndz53whuic6itdhm8md7n5ewd2y3wv7ihrmt254q9gi22s6rlkk976q3f789hncz',
                surname: 'ajvh2clo0gj7h2fugcbgv4yk4vh8dzcaenkt882orc327e7hcd6j5yqapg0ps5gijyx0gx0cx6dj5qi0og3mha1qfutrj6x3n0346twlbmf938llv5clrwjactg47j41a1nxshs05oslii8xcy70r0y0fjqfns7os52nnj4uyubktp3xhvup1w9cy8wjkrpwcewrqe9eokp0d7hgyn1ni5iz9210asq7d77wr4w3ckauwp812jugr2o322mt4vk',
                email: 'z5gbpjwr667r7fjfefp5jzvda1vvcotlt6a7xuzkuyh24ne4sr2vy8i8040s25mm1dk0f4b9lbfm3b9kdlecxopqeqytsebda0mgia08sox4ednpbih4jqjb',
                mobile: 'ivj900r7addwfxrr9rtsn0q3k2u73sdslj9onwtzh1qyjm394hurbodyev4g',
                area: 'ca1sdjtonohzxv5ya41yx9lbm8tgqrn5hp36egdgbtpam3ah6zidsxdf3js69fea2zud4stsy71gqlv8rl1th0qzy6n6au7na59rs54avjh82v6rcxktf6u8aml30bvfv46a3em0k0ufc18p50la4qmqwud64qmcybj6s1su7b3drvuujb9ac3jti5rm8j9sfv5gw6h2r4fy42nxvsiwx7q007aemtyogv1w1d3q0bzd1b9s392q3rr6uwav8tm',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'bjwaekkrulfo38643zj2f',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: '95yoj9cnr8s7gs6so6qizn0di04otc388vee4uesvbleq4fl5xetim32a4pf61sw63rr5db4zkfhmembivdf2efc85u1opxv42sjdhfbmqtl1p0ai7q2t0o6vvgfe8hlkx8ydjcuehp0r9zc1iiwt9driqkx32bel36nuafbjxzun5nc0g33rx01eeftjjv6086oa6fbr9snozj7kwtbipe7kvod32g7paxn81p8mcbr01w5gtbgs5i6usxrm0e',
                name: '1hhgw0b7qvjvd4c1xih4khsrwo4ua87twvsjihf5f18547xctd0gl94g2hyzyzotqyokwtp578ia1w8wmjs836hhiyq952tqmdu2fipugshvhles5ygf5qv84b72ttzhpckcg55eg99gd0og8oht3xxjvkmdn2odip52lee5pa43xproe7a18g4b8qt74qowpdx6m88repyi74t5ntaea6woy5y0o7fg5r1h5y0les9osnlgjgstz4tgfkvoqa2',
                surname: 'b485ycfe6j236621emdk45df8hud78qyi91cvm0y4n99ojp2dbhlk8dlu8a8jvaowge46zzfyqr4a9ec7jgi0ci512vdpdisubmzrqo6vhxqerq16q8qn7lxitd6ymdbvi5t2xfgwdoj9rc0iw34k62nj6yjptm7xn532ra47w8yg3wztbbdft13qt7by1qs66cqq1nax942qdgqhh3o1zvxbbp8569yg1feat3s1nt60paflw5godtqf2i9yg6',
                email: 'dr6v3pz7ca66degi1kf1h06xql8dnuxuw1virdmwl82scjx0s25cfkhljqet3h1ncutkz2wrh66o7mr21ashmotymbz0cyddaqcdmdj92ge1f651r4exftfx',
                mobile: 'e4afdp44jb3escwd11e6uglias3tw2gghlknkdb1t7gyc0e0ym7sx3zxf8yh',
                area: 'dv6undn3ut9hhi1mip0o164m417kkgi4m4g8v60prow6po3esmk60x1ztvxm97xuswwvz2jrjjzw9y8btjt3a6mnlm7irbhfqsc0dzljddjgmax55vudpnejjzpyy7ztzyjczam4xp78h9e7bzw3gka0o2ixsq9d9gyiaglgd4j6h5nett4k0z5wx7196h8okvx08rxte7x53wn0numy11krdlb34pi11y0ne1h91241dldnjde14g99kg7md7b',
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 't8v1tpdkwt2kzgsyhtfh',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'xjcxm73pszy18rnxifx7dekvbwr85mimwlzdg0o3oianadk7hknpvkvpea5xv8l3avhuq7q6b54ovqj44m0f30jur4z61vepkjxdb5g69u4h31llf1fvu7ajvmstuqmdgizkwrvn4koe1m6t9wa1j3yjq00gxeftwm9nd96pmymlsvvf8001mxerbkdme1j5o0cvaz7qoxc4rk5wur3b42k9vpndxpcooo8t1uc2w7es2usb6kqrx4txgk0k44ap',
                name: 'qqganlshpewoa1lz2myh91fb180zvk5h7jq3kv64e6ek1gno7x3yfwunlub7o2o2hy4sx1olqk6e2z7d2s2ai6fqbj1yti905d9lyplkqjjt89fj7ke12275p00wuc0gftyvwzsyqgbc4g5q17unsq380846mkgnm2ebxb8v95woypjn5ndtdf5ssxyz01lojdbeqbd02s91sepmp3z1maytwiifndknr8ozblfw9rpysezsw4jfo9cicsjksii',
                surname: 'mpvqsw1n5zfki21gjln5kyol4kw5y0k8v2r4ohg4uw58iyxzc8kgll7aqglm230b2c6ggw6izk8fkhavvmx09rkjdp865t3zxae4gpbyhexy9m2q5659k5f0aethc8p60sjnoudx8b2nrb7s1lvqerdy0ufqzpx64kj7pai87zlf735xw9zvo9ov4piosd5mj2w2q4kr46dbiyafbhcscogr20jsre9yv0mtclnjt7ri78kuyc1na9oogf21416',
                email: 'so3kt3d00v67ejb6ro5uy3ce1glzi9jksa27qfj8dbuc19hlj3zqpm04bfrxlz0k0pbqyziaso0ull6cnxzwkv13dxk10kt62a70qhqthg7frf58onpbxn16',
                mobile: 'hy4bl7tpf9iv2bsgki7d6e2r7bitk5vmty8koar87t29utxzht22rozi08mc',
                area: 'eq3k9y8tymhj3n8iqgqq6scws5wuribhrwx71xzkyhpgopu6skiqjdmto5nth062ugkunkjlmwhvyqkcn5eer0lr4lbq87v7rkprppb6iapsobsoo2xpmzsd2iw5en8pmpm7593fy3lz0vbc3b7g22xypwfmc138k2wji38j6rc0zf1kj4gmfs3k2a6oewcp6uem02olpn8t1ajaac5sa7gzo1knszvg36w876pn930f0rkholgxvavgwrr3ivr',
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'ct3gkc4mdg4ymu2j4fai',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'hzu6p3b3rdp4yh3stsg133z6x4u1rf47gpkd59eduq1gni2rqds8oloufn5c133xtjgveadta4vsoho5ncfw6vfrzn34c2uz22rh832c2xccefspkp24is3slo7yfu56sjd8x3bypvvmz58fatym9v023ntvr9g8cr6xkdjdhn4djz2bvte34h98hre5y27t862d6wxlucd2hechjwk6p72b1ergs0zylaghkujkudzj1b12eorhn8guzqouz2n',
                name: 'xikv7tc9hw7s845ijav8uykdb0k78ilcgllcc7fas08p7jzigu9sy6h3ovsldkt5ei24wn61vrtaci6c23t57jcx9pbvlontb5amqkaienz8ky3k2a0ftlhnaxibafmxvpze6tgeypecx48xdd42fm7vvci7i6eb9e1g8gtoypm5td908qu9t66usi6y9rfdho13wxf0xbltit49bosbi8go03vmgsyiilffcos6cqdhwedxm885vnzmrjqimths',
                surname: 'v38yzflx3nd5epkvtgiiit5moenzguwaarrwux7hglhu4iv45ibvfeq9sxahuu7kjvnnkz2i5b059cyia7bvtahxpd9h2hl7z7gywtll9paj7s8tglvfj40dhu600t8iq5x48puuam543szhxuh6zhdrkmx74b3b4oas0m3yl1b2s0psw10hphrlskls13q06rlhub4v75bj9q6qqdceecc1quew4y6o76shmh81cvi2xcnldu9py1nypqmqqcy',
                email: 'bb6acy8kaa989g72hh4ni70rb301cflnbesy27ndbeu8ad3njk5ejxu4vdpml8vwc2e5krqw2hrcqgm0qo8oqtqxoy1pmp8rpx30ub87ccgdjeyrutyuj9yg',
                mobile: 'k2fqhzo3tjuyi06318fjl1161eedr76brocnpib0oq25szeywxqq6b4z9489',
                area: 'p8pb3lj7gx7wh8u88yr70kh4yu1nij13iip8zm2wkhe6e1jduuybr6mohcbtuvq9544ox5yl0ih37m7o6fftbq6fgzfv3t082tyx0shc5e99rqms83dsze3a8wjm1nbh7yykt8om49sixaama7iojuyyrlvgedpqifewdy1p2lzo2ytj8aguyyxfu4y0k36nflvulb6alje9cmvvvg6k369a64ge0mbdtbnnc9gs6qwzdzvnwpmchd16gct0on6',
                hasConsentEmail: true,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: '6jny2u2ccj19blt3qcw1',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'l72glqdeq85xlnddnwcob5829io8gp579ythsewictro7n901ek78gz8vywgerke2dc4kcp6vjqyg1yxba510t2asz9lrkahzq9egz0t9qjgo1eb001e8h7kq3x9d6cmn02d9uqvobaraqineysrwuwk1k027jneax8ghgu5y171y750bf7m2sp5y4ck9p99l3e241hhg7epp5d1ss6u2d1disv3rvdv4rc7ke25pu8ctndtyinjktl6v4p958w',
                name: '3jqc6jnujbdnvuxtjd4ssjgu0jwkiwmnwy1g0h0decz8hle5onc85ar1iv97czus7pw8emv8j6gy6zxeynsixglqutkkqjyz8d5zsohum77jo3a365b493oks6nigp3as3tcqaj80pnigxgb4l4ghcagey6u0wjqnebitlwnq9dff3iu457hlvzr6x528u618vt99ls0pqaz9ip6zbn29bnrlmp7hxfd2fund0hwp2oah0xk53d2ns3ydxufhu9',
                surname: 'jrnc8sdrqiue80mvxt6wxpzhlnk8028jzxre7xhe386idjolbnwn6tc23s0i8sal4s3wl2ypxit8d9x2uhavz8uy885ko8dz3cmtypus4ea8nqw8oyw2l0v7j8xt5fwzh9l0vnnn9c5yes8kescsmsaxizxvb5lq9ffzxriymq0e9q3l00yuu9e2wtmjj2h0q4a4niynle2euu1cpw5ne6h72e8i2jiork0fx3rz4n4gwbpsgza252e1vgjk2iql',
                email: 'n1vsbi7729qkfvogz2jixfx5v0511ntuy7cva2dr5xla4gsxsdypszl3n02zfmjewcuoo5ndcdzz01ydcinxor9qti34lhwc1mjf0075p0mrvh030uvulcuw',
                mobile: '1h0q0fh3fz72an4jv4fbvgkhynn5xf4x9ofs8bphypdj82gk73zrvt59z0v7',
                area: 'u2hlbxicnw2yh8x9dq4e8odgqksq690kcgs7go2vlvbs26z07511ievbc0nr8s0tsfueog31q2da9nhdtb5dyuaifshqwad9kvb01x8w8dis18j3gs0aaycnmq7q5p8ff5li6ytwkzklot9jk02rewy2u5s0lir143ldr11l1zv5dzcdapxcjpswba83rxcza93wm5w6im49fnadro59t9y0pr0plkwnnp56mdo7pk1weuz12sn8vx5gm2j59i5',
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'gtqo9ky9y0548bbn7z9i',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'gate0gu316b89fqvoofokozj9vr4gb0c5iuu4zn2d5qctud4hvs24jhhrc9403r2vt03hkt6os1kw1qa8pow0l56w4x9e34l6r8hwlvpf7728b4r21ewehggj0ehkt1yrv1xf2x72d4jrgs0mui55egrf7wdnbr53zy8uj7pbyy52lmr0m5sqi3okqo2ss7we9tpqf0gi1aclzrghdg5jdgcza479oimbd2nf3ripix39997u0p8hgvx9elsod0',
                name: 'fgx3gquq7xvmrivn8boji30te99z4grnlw1qgc28v98tycxc81azw91qroirg0zx92nenya3lr4fvuz5pqoc2xed1igozts1sf6oj4bar92g2byxrixsyvpwtv65om90ih2cr53evbqjnphf0ctuycjocpumx0b2z5fbb5wn4y16i1u2m0sz7v4x1cgjzz9852ard4ukwkzopy3gncmeyaegvxwnjl9cuyotk0heu8jlc0d7x1jcpm4wo2g9ttk',
                surname: 'at4uw38cq7jkrmw9yjfrzdejsjf9e3xes1tisdn3n9bkygg0vwpn0gtrrt99qftw0427qmx76y4kozk81uzv42xn7708ka5uinc3qyiry4n2xlos07j5wypmpij4dnhayj9mpr0u86vmefo183m2wekl7o0zws4kd22cwa1qd2o8zdkr30bkfgepduahhpbais7qqg2qov7d2umxhdr4adgp39opx7c52iq4yjjkfu8ysqfouio01zeldj9g1ki',
                email: 'rmubmwqmp6a4y1vhqqp0twurrwnxcntk0sg2agalyycb7s5nwvd041rgx5as5wr4thea0ru9ni2rlfapnwd3vejc1kq9vuu3l6cjd2i58k4kthmvjv7j9xerl',
                mobile: 'jq41ifd5so7wltzbm1p9hw6ecjk4fxmkxqo208blj17kd1n0c7gccoq9u4od',
                area: 'khtk39zcp66e8wkttxpvnatbc8pyyzeqy8vmpibl79t2ufit0hxalxzgw9nyv9tjv2mez32ebj42ktfr0oeeqnqkc0ek7qmr1jpfdzj02lwdj9k3hkttr2edpdr1hi9673nc4ga94jrfb609y4xvyv1o58txyx41vzhv85vnk6en5ap5oayx5h3zyn0ydjgmz61iqa9oo9ltc295eo30nsns4aa1gk6o3p0r4z30a5q0lnuf6a7ktfzbskmji6g',
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'oi4nrv32428t07waok1c',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'zpvi8k7tqsim5kp60rwo4u71qgvsfna9wsxjy5zpvitsl3ij58od48rriuivbwhfpjf6fzicrto4062iuf8pxwdr09rzwv6nokri15adbqb1g8vue7pn99zvdete5df3ftrazjhz5i0p3cxl2bm1w8zq6l58ycg0ldf41ikwh14ehw7v7xtb0h19nbybw41tpxgnn3s0ttamo485hh7s4h10bacnrdkfbz30hgl1awiy1ly62w93vcrld03e57k',
                name: 'emcn9nvtehtab418rtxo42rugbhgeac7wwqg0be6m2p4fmj8le5176xrt4oaig7malaku2p0vpg8ky6w83ippd6hu62rntny459fcwaen3niet4je8iyqzksmjktzwz28ebdzxaio7jozrwbzuzjvu8l4ib94i5dk9qqfxuzf0hjdeasnw7yvp8j216o1ymiepn21l2igfk1eq80dpgazij9uvr90r5h6ar0lypdfl0kim7s2qq2ty8ihdyi1qh',
                surname: 'ld39exnoodigqawkm7ib21zl8sx9v21h6gg4qoj2twk7a0odt477pp59bmuyr9zndweaul5ujgqsv3hppuzp4e85ckhxotr6jt94lb9t90xv6ygvv384defak5oy8ij8bpl33lw7w6gf71x0prxw4urqveruvqd8072xtojf3zadhwv3upkduhubx1qh1ehk9fmhy32788nl84yv88ik7vmrroptcrk9e7hr6wmtity8qg8fm0nskxwiql6zjfn',
                email: 'm9dwb78jkxv70oq3sffuqg4l85uunigc6tzj8nc8ohs8wvl8l9j4ungfyvjqx3wn851vr887ohkmc0qgaxy5zgfh4wcbtbagdqfehex0we98a4sbzczfix9w',
                mobile: '7y169vdlq8hwsbmu1fg8i1t0zr5v8wp0okhgcxy19ygeovzk66qohd4c1sice',
                area: 'xssw3bobzmmluy6uk12kyd2wlewuivn9x073r7qe3btzquzqkzx2j7b35njdu0mzbz2riw3101kopbgk82puby681bjx8z51ivczier393pzs17fq3czpqoyr1cxqq4cywciiil60vc6gmj9q6r6ijkqzj4jph70qh394m7znoc6li6uqnzlqyeht3imd7rpxarltrmegk1aqwa6xmn6k8z6ofvoxayl3ih0erfdr8wxnyi8z1fzns25nayk52z',
                hasConsentEmail: true,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'gsc9x4ht044zxcm1sz3b',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'jyba8xo67oyep3lwc0om5te74q1w2qi9m93l4sgwptngff2ci8qzfddjbpuu32kltpfcodm1hhr7i9mwmmgqf6tpitzwo7b9ttsrlwwp64mfal0hkvq66mw69cbdavmgz86jiimcsr6l2edqvgvc7h6p07u8zsazq7fkvj0h5c3f0ai27trx654ps54eexlanu33icnxt19496tz2bv9ww849o4t5ll861e6pjvqjm85ve3i303dtfkhbf6zjy3',
                name: '6ym31unzqulfe0o8ww1vw4s1ehwvi6fbik9sj5h52vzac9wapjarhfosa4rc4oo73uyfw6c7740vusg1avuxt7913yfrik4snfyrcu3fmmb0s9gw8cggc1xhg1h4t3vtztz5sv9ous2rx574f9jfwrkrqx57jhibug40pwjtklhxpolvkvjr4abh1azagsvqqjtzhfoy2oek34a18teb5svzw4n0e5vs1yri4n4r3a8p0tf7nyfdgxv3mpcqwgm',
                surname: 'jto353055qdr4s6qu8e29k5y4ak8i9o8rwqvsbvga8s1o4juajfbpq5ije6b7reltc3m15qqp7m2rknagzms3kbyoncrjfzvusdpmp2suzbnh4w4pt4ly7mj083khrqq1dv646vydji35lhoa5do8i5adi8qq6l8oqk4k7t28zyfm23vzujvuufumgmprs5rh5i4w80b8to6rj4ic01qkjuuuehskpys1lkn3154hfg2npv6ae13kqxoaqk30pj',
                email: '3nulblkqn9im0r6x698smtivvj6uegpn6b9aa5yugs9ye98s0n2a43jj5w133wodpigbhyf9nnoe7am9uhz9td07lu8h98l3vpl48x4fpdh61vicay7fm65i',
                mobile: 'y58m51bhl7krx2ypyk8sdi8yqqq2k5ghgefy7e9eovdq0yfeqtmemd7vpf58',
                area: 'kwdeug3fjj6ff9pirojq8ucgz1rknkx6we0mlhq5d3fl1nwonwbphclmaxfdisvvgaxkgsy1q6qa3pbfkbp8bsn9rjewldd0gp95utut63edzq4qyzwradz2koejm31ic90y8qtf98m530ynitt6f4862cdrzm9837qwl58ykvvpq9il9q33j4lu6cma3s7u5a8ldujtjfvwfzl2rr2no8i9n986ojyvk1tuvhio0yder61kfy3yt9r3e9elo6p3',
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'zh37u6nz7bmd96u2w9e7',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'xmcqbufvjx05dsl1esxkc21g17hbv5rhy1bvr6t5ck3140dcx6xtrgiuc4jex64m1hdjyr12uvs6zwnmr3yn73y0rrj6a3dvitofdvkagkvm7eoa79fbvmv9tgfw0bv45yua10q0cvjrhybp4a4yhf4y8oxjn5yq0xditq255tk0dkqgjobrja4msdjdm4rcg1nug93qgcsb7tdzgw0or9n4ak5e4rqjksazzv2xcvqpl785hi670dx9sr7vo9d',
                name: 'rzxukt0pbcw7nkd88ldvaox5sdhqb9gf3r1kzuqec9pimrmokn255hdwn6l3b45l1eotk0j5tulbf6jsl8q16rbejsxhwi3b0pw1ygqcpuxm89ade2phy32sjmpzckd214nr5l2x5nzz2ocio1lojsyp4rt7ocn72sby95q2ljpl3c3b2z8yy3xxty8mp22u3nfmvmgyxvr2a7e0v981wv46ox7n7e8uuyw8lwbd3aaq99vx15v13ej14sa711m',
                surname: 'vacqknv0txnxzx4rpcrrvxubqxntxx2hgyguvlviwwu15wbw3hdk0a0tnjgnrfa3ivl7oyu4jgths2oqty9oye1jbkqr934hpqh2v31t6q1f4icnwtzi9dgo5gc46a0jgihq79z8ct1p61uhhon6ab4e12pu84ry43z4saf4qv747lzcadpgpsy5nd5km0ch02nytqy4ju7qqnwxin9z64qubj0qqiiics1j8ihmmotk7abz5ihpe96g19wb9ba',
                email: 'mevxxrhb6gjhpy8aw7oj5l0w2nx5xqsbrrxd3y975t8autbmbx6zqfqqj2vpyklhr0ld58a6wrdrux22jh6lewuqyxv4zlcp5ws2ahq6p3rveu0pky9da61j',
                mobile: 'yr7uh3me8tjzqnwp8jo5kh0hf8707d7ufhv8f01383c0jbmr50cvzhvhp6g5',
                area: 'ee6g617zpukoc2qqx61gzvrqv9aog120tuufcbnzxvmgaydfeqhmkuj5mj85uoblkw8q8ipz96fgm2gmkywczv3wzevjzimbp11258rc052v9wco4smdhq9onms0qr7z1cfrfnwd0ajsn027ts6wyj2zvo4ge0nyb7nhl7xmg5vklib3wtapavtf41y3vc0yx9ejokb2tdsrb2a1dqb1lydiezd2f7o6n1tjkga1mydw8d6hltczefibdtpow1d',
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'cmty70op393yd9i2tlcn',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'rwumdl3rfp8j6jxl701zpiytycl1olhf56ik2af69vw0j11hmfaf5vxkbun7jldjkaxsugitr62egai4xu6yzqdbjzeid9ddlp818tatnlsrxc8tju5560869x0s2nf2zu6axqkwiymk9vogeg87rhw82ns9nwbvz4z8n8auwvh02mzkvtfie118aa96lmx2d8gft90cntu9tn7k128y52gdun94jtazsweh9t9hd1nxz4tlnqqng0dnac3nj02',
                name: 'onl4mqlfzlojskzbxh1weu352vt7vm5semi5d1n0ysk2o71417noxir17f2bxcbar5xtjiyka2mx1zs2htyj7g57t08zzqkwf4o0746px3nyqkgleoiul18b4o2rz2zcmkcyya8a0t6r7k2mm38lozmvsxze6946qnusyrdwcyf3xowavk38dyq9wmlc2996gkmyr2gawb7gkbhi8zhg9lx797m2o1x2b4b94c4z51xbi68qgqklkcq1u46yo97',
                surname: 'royb631uv5hra9f63gt4es7uupmsitzs1mgw2q6r4tpuyira6u5egzkl0bdef2ab6y8dhp9cpqk9yn2m6izul24khy7yoaatx4x2cr1eno4tbrkxes1bvel8idwpye5qo3g3wkrj6fn0zqjrgxhj4y7d0j3wipos8q96w7gqejmsn67ody74do98e0lh33lhncqjs055yrc6mqxpnpunvd82yuude9sy6frpsr0e9ojbrd7o2bx45eczpu3t9u4',
                email: 'nwji3vignmjl6fuweo7swsnv7btk4uhlgocnjb4ll4saz7vudflwg526u8dad7haj4vtezec6gawdo5dtljx6wcausmdfq18dbtrjp25otxih3xf2ec0ul0z',
                mobile: '45ne48ue10al5h5qjhhhunpyt3u96m73n5rmx5qfm88r33kzracgctcj9e2h',
                area: 'rz34a19awvygefvrki4xnph56ex9chzuyzsd8hyms4gj7f4v69zmxwfayqs00mg4he1tuhimhev1qimp3yfhm2c9r2j85h8twdot2fvhw71rz74w9p0v46ygh8oroyzf29z20z2djotutv4e0erjryhhjzgen88fzlibeonpiu0tzsdd05ul4wyfjlb4xkdrr46d7yodr1wh7fa6b1wx1xgau6ogcu84k3ae95m8g6nbcm8m1f45n2w1auknh8h',
                hasConsentEmail: true,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'z4zlisn6agx01i096kg7',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'ea4cdmk6nkventsaj4u6ftsig8o8a9hmidroqpyofmzybtxh2rn45py6qet26tiwb0w6ft81koyal3w496blv7wo690i1ezho4ngqaybd7ondgu6hkrj6ln40tgxu9u1ayeqled443w36i6i24xeis4558n6wyfft6ic3f10lh1ac46qp3fr6q0x7ndh0a2whski58hwpouyzce20q54kl4so6ulejqfqchvrn2t3qgu3pjy29vj4cz7md0rdj3',
                name: 'cydecp1qvzlj3gy6glfhalnne5k81vc99oqw9upde58uqvzmgl26ch7l7rdebvmgdp8ei2ed287ec2qyrr0shi0k6okzhzbnyzg125i9xy2due4kzxbfugkc4cmbxdig3mse96d1naqclwpo3rp1nxcr8ud7nhx3wu1prdszx7spblz1dz35inuxcuol12t0z9g6uys6oc3szgyio8p2aixjeqfcmzj8ys4titmcszrbkjqkjxsvv0obdjlrwg9',
                surname: 'qunse5mq27ppyljb9cyv56fyswm15y6cgd1kr71uk4ajnuyz0spabebcyswmf9xy7pt4ecqzg59x9p73821b4sp3xenhksh8y51bse6gioy0ia1c0ku51te2741zjn1m4guowvicdqqyeujxbpsresj8sr3s7enh1ie2cg2pgps1xw8wc8omrez6cvbex0br39lhkcx15dsuoydlx5iq8tiai5kz2wp1yr4l6bznwwwdgd1orn57f3se37pabkj',
                email: 'p6yq64qhcdgbu4wi3gazzpb7e5q0sobkp8sajse1i9i72qc4nsrgkbtrgvx8oonkw01hqsms7yfrr1t98649cdfw76jkjqyt9zv6g5rfdi8vagpw1trhnj36',
                mobile: 'g76yj5wtk4xn3sxfax59urxtj6djqdjtmy4tnp03t0gvcwp0frkoe3rmblim',
                area: 'cwa5rccdfmpoqyyc18p6a4p82sj5txto4cvmvcnxovf3rgfsdx89o10iz414qj8djcih3bmykbzdz8cy3ivbc8yg4fydydv5yb93nj4f8400dnuq61vix9zm7cntfkbpmyoeywlb0gwayh1mlaooicm00w4uyxulytif7xcj3g1ri10u20skqni9bcrg7o8z2rqgmoaakvzyadzw0t145a3xv22ue5kpkwxrb69s9m5x61fyek6knoz4tla377i',
                hasConsentEmail: true,
                hasConsentMobile: true,
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
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'ovtsxvnwpw6vqe254q7y',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'z4000l0oqvc2f1uyzoxej2g1pt4mrfrq0g4xfu900gd4icilnivulmz5b5ohtiw5pvqcaopapedqsfzgtcel6efclu375bzwhrbd004u6axa1263c9zwi1ah5mv1v7s8yuqgpeajrqi232lmsyfmvuct3eix3ozmf7famc02h1b7tye3ls3atv7stqlmz45vw37ewhirmy3t7b95vd6zpq45dna5w9oer7qdzlj7ngit5so66x731ukl2n0agd4',
                name: 'e6hkq2ehi6ohotaoqlvy0kx1js29cn1b5m7clkaq0e32u1mbm4yytm45r5cugnwurmaztd5tfskshusfv3gjkbaiupulqpwdok79j4zno4hj32ar544th5l8bdxc7y79icmig3qt54r31fxoocbf6j3mxu9o0uhwp9um27l8jkfe201s4lr4t322fcuea5z88vvm06tojs1xja2njnd63g8lu18peuwlpa0mp9dp8co8e0ymlxvhltn3aqmgvrt',
                surname: 'lud46doa45k5lo1twtortlng33ph5mzsbx22spq5xp7xwrp4dneg6y34spsdqdwu2wo3bcx4936wbb3auvwmnwz2ca5q5kt7zrxo96xxkypbg4y32le7x170hz77gwi7si8jtckiiwoed7nrkwubrzxruti7gvahpu7u8w3uj4s0z0zmnaeamum2ld8zqbonaot2d39kzy06ootz40kyy9qyi7fq5adsr3vq3q369twtza4jvgy3irs59mf0g1c',
                email: 'x40kkj3rmlc480nljn6i0gkaojzrrvtjjmv47zxdww9crxwhrjgb8668etzpq3bmk0eg3ebyobld2dmjjhqc8vumomreetb1zl9l9cr3wza72kyqe86yzu74',
                mobile: 'xys4ciriohuh63gaodskesvfogi81b0303xpd6ccmz93ctbyw744dd9syvh8',
                area: 'k94zpx4okby6j45z2avto9t10d695y93xziv4ekjt67b78yb9qco3yoo3ixigf61bv3e21v2zp3utaea1rc2upiavf8m0iy4s8t5qnqr3xyn2ubwajz0w7ujyctyx85qpv6bhwu2x3my21apoqj55jeh106qm7zuvpbucgsux5rr4eupvtddezyb3u29i12ob7ltn1wkcmpdiodcpozgrvqapq65o4mshidm145b0oakq6bnvus8tar6lowtl0z',
                hasConsentEmail: true,
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
                        value   : 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2'));
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
            .get('/bplus-it-sappi/contact/f57e19cf-e0a7-4976-b49e-40d4fe1f20c2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2'));
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
                
                id: 'c853575b-178d-4cb8-9c09-ef5e56aaa0c6',
                tenantId: '3443e388-c8a2-41ff-807b-e509b3914a43',
                systemId: '7ad93d26-11de-4749-a8cb-b62beef06d38',
                systemName: 'un0n3xyqlqwvdl5dw1iv',
                roleId: '65a71cd4-8749-4c29-a755-bdd756c1dbbf',
                roleName: 'lq8s469z52nwvvk7pgxn9f0nlj0bd0i9t5ehrxnnr89959dwl2gfqlrhzaxmu1d9ywyxessnp4yqmp4y85o75fvdnsqzegay5okxm7fpf0q5d9kry30dcgqxc1elgshslqu3zq3i1900txkauajy5rzvdveb2vhshirt88tv5sdu08bqji695toe0twfytvzkv182ppmpmqfuug6hieqa7ouw660yu3vs9rf4mr80iav1lkz0fvykib645xomkv',
                name: 'a1hqm5q7j56ox7sulhac91k2wvg4mromghxba292l69hpbt9udf69wloo6oqmd8h6jyxfvwyy26s8u68lxfkqoj4vxhqtujc4nuly6zh3ds6wfxvlhbw01vm4roxj9kk7nujpt5vnr5zw7woahsa818xb9g3r17c7fw9ixdt1ba62iqqbw4bu1aqlk6t6idqbvuezzs6am9wzvwmbn5vli8gx4e101mkwt6jllyjcnfexmo0t4ul8xukhgv3m1m',
                surname: 'oqxvtpois1xtb6kefdyus2e2fd9khvwen5aeaegpvgiud1bxhnvbne5p4jr5x999utfy2bm1c43wnjua5b9muv7vx1vstiz5spygxpyydtm346lb5nkpfbwqo6y54h5vysy1160dwvovjf0pxsvdleyxb0m61ibmyhaf12mlkhcmyjfo5ilml3ggpr4wbc6wno12yu7qis8x89s4by6qgijk88h8yynj468012pmeo1eosviv8hcj7zsnu3rqf4',
                email: 'kklp8inv1zmm7of2a4osvtghz4lk3d4egva7r5b50ru1v3ta86djdomd1cep6e6ewbrw70fnz8o5o1vau8g7cjzzetufnph9amf6e9zyj0l0jof503zj0zod',
                mobile: 'njh3vxpirrerju5pn3cmr6vmkwdhs11u48ev5ysstumjdl0ugk39flozeert',
                area: 'knrb5djqr3nx21q2ajuk4cf5ttf6itjk1sbdvq5lzamcg8myk3joa6i1gemscm06fmta6uttfx4ac3c4zw7x21jnb94mltx3ilvok3ey9s8qxa74c19l6vcoaefe7hcj2ejlnt8bqy5gra2j8nxuumrvaz2ihmjmbz4m2bjyr1tp5z8fxiyuthzhbud12ts5a3qxkv49owzqtlwa2sknak2mq7t8czxlw1obh8c932kppckepasy49ackbif508',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                systemName: 'm9f1gi6b5a3hmzywpuha',
                roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                roleName: 'zux6ai8bdhqxfh668f4m5si44qhumonzb7a8o2jeyd37793bpgcixruzodh9hkljeoel3j1guwrzqlz1ty4xmiac8lt9netf1szl8md2me8jcp93n84bk699rnxxeesm33kjnwqzi5rcpc3b9cn4ronnknvo4byahr6yokeo02urwwltp4s8y8rnfm4utuowlv3hyj6081s4y2n1qwiy19xgih88ga5ienes6p8oxljv729lvd3hzqurxiwhn2r',
                name: '50ldfbbaq8vpu2lyq5nvnt3c858j95in1lc3v4k7wogxf2lbiu0r3vqje3t290te8tcpaxow1bda2i8e613rxa4slmhumegwlu6xwixbb7u9iitff0h6fgh6aa0gi9lmwr8195qw8lndkakdetxvr1dhztvtx926v6253oebvbc3mh4d8tk2saz390pnwkkcavr8keo2e3hp9p1smyy23nhg75b8i7mn4vgf7ihirzsmio1gx6mp66ln07oxcz9',
                surname: 'nn2sxjskrbr8i2ocdt25lb5i81sy408k8jwaisknbar62blnyh5z30qh0ixaces0d6r1hyo2z1kdfiepxanryp17m9sii8x5423nevb19v3orun1f5v0vyz2wgry7vsdq6t8nj5vxwiwlb6l8mdi5m0aq1ktnd4npuw9uirc4rkuqqa5azca18xr5lxtimkwwehfs70z00chqb8zcguiil3ip9n4ek4wloodwut3qn9fb1e5vn01tuzv1djvasl',
                email: 'c711txijk4f3aldbd7ubaxlhb7focqvz5j6uravetj6rvaqyiqaebqisvdjgxgz0lehazsw6fj9dlkyg7o7jb21hpwvbhb4qigygmlnwgysiyhr330wh61gd',
                mobile: 'gqcaj4dm3rvqxfftyru3hwo1lso16bgy8qmfzoy3yshaq5gwr4jam04u32qg',
                area: '9jrwkmhakuax6hwscai36qyyk1717m0zobla693dgj7uu3ek4hcst3n2d9t4bbkw5haqzx22hjnfpw8l8gzyb01dnypmpi6kxvigtkp10ssjtek4r4tthc8ilje1zmesad6fipq88oxqe3gow6mli2aik37gx0k32q9a6i1bjkefvzlph23ki0hs0adz58fjy3zadqbncuda1ompxavgsbm16weva989vpv0ni37uwch7jhvtgqvtgdx48gcxn8',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2'));
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
            .delete('/bplus-it-sappi/contact/f57e19cf-e0a7-4976-b49e-40d4fe1f20c2')
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
                        id: 'beff107d-01ca-447b-b8d8-3f4fedec14aa',
                        tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                        systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                        systemName: '20gnost8kfkavc9ju48t',
                        roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                        roleName: '1ylp29x48rrk1bgcbgi520kyj9h3byps6peku4muqzfepezsz69utyo925khg22yxb42o1mcbysmoiu1ef28rsx9w3ijnw3bh5k2bapxg05soib802goybi2cetzjwmdxn2zm5b8f6eyyuxz82dupvkxp2uac4vmoh55sblcvz4png0h0qpzethy222ttxz0jxb04p578f60xmwmgddd47ka313mbpw4k90knc1g5qjp9occtyt0a1zm5juitsd',
                        name: 'y7d7gnq1x7wwpyfbofd5r587vfi2clqdaaw2iezv8ovbl9sqaorpcw4zy7idvnvcdhnukm4pzsvtftuudl9ws5249nqrgjebyreg5c48gfzhsd9hdhrot523192oubp576qfod9jgdg3c0x959qs9xgkyu9eens7a5zgqzhquoq1vkxr0n594hx1nsrw2dk9lxmtsyzh9bif4a0bqylmxuz7gzbr0anfxjjh0nvxk4aw0givdrcrfljybusex66',
                        surname: 'wkeibq3ph20upk5vreq0ok61cgd19qz0zyeb3r7eqbt3jnz8mv3hwty0cxdf1awud6qyl1ijzde5djdoxh1c8h65krt3ujoh5jeltuzw0s0ql9dtdsgg5imvvwb7d7qpyor9q4o4aquexzh9zhzv2xuq2y5gt6rew3z7fjn4hkr02gsun9s2orqs92mnireysgv49277evvfb6d0zxr3lnr38hds784dacodp2g66ij7l6ffbmo4fserc1k5a2l',
                        email: 'sshalge7ccfz8m5kvy3e5x9vm2jcsa5579hhrs55adf5zacxaj8mmpn7ccpewoqhnprrj60jvoc0cneu7xfsql1lf3xsjuufgtsl1fu6i8j9bkir0ab4tb6g',
                        mobile: 'rc2l3oxhrcv2ee80fu4yk5mgvksboycvokz5olkpwyl6odmm8n1ztx86mc0h',
                        area: 'od8uip84vclvgweaqximgp5ta77ke9x1bvsga3bwko9izinbict4y68cbnn7fs6kc2wd856u384yv5gap6bmapzxuwc5r2kazswvf04ifkgt5slz04txyn1b974u4anb96i5vsh66vbdopaw8lj7arbplh3dw3hnfmpywtsjj62hg0bhtonkbc7x06wwb0wnq17xcexh19yh6h7m8fz9cno8bvpse4lbwfy1g3e0yi967tj84526jvs491qd939',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', 'beff107d-01ca-447b-b8d8-3f4fedec14aa');
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
                            value   : 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('f57e19cf-e0a7-4976-b49e-40d4fe1f20c2');
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
                    id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('f57e19cf-e0a7-4976-b49e-40d4fe1f20c2');
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
                        
                        id: 'caf67dfe-89f0-445a-823b-5bacd677ecdc',
                        tenantId: 'cebb3f42-7ce1-429d-834c-ba414d6fab41',
                        systemId: '563078c4-04b8-40c5-86ab-3774f675feca',
                        systemName: 'bpcpcoyh0pis9my0lnbr',
                        roleId: '8573382e-2b5e-4296-90dc-abede130fba3',
                        roleName: '9v4kafe08t3tvyk5d4ien7ps7jv7ximbmcsqhfmqtsu17tp3wpmxfp4zrg7uji6d4ji4ijs0nst944p821hr3lo5yb2b94o7vkyk7d3mipxhoq3tldootk9nlcf7agvw876xfbw9uooqvbm6cqaddy7htf7j0sjfyk5gg46ae9coaoseo12dhx55w9w0wjzijxl9aydzcjd94yiic9pnz3mybwwmx8dya6oa3w8f9pd3xsm55xagv82x9u3b24y',
                        name: 'wbypa750ur5q1e2w9nv1x1xgceo9p0xbqsxgdc8mwfjdi0j077vz26m32kjvpe8x0v9wcf5uiaasn0cc38cg52usugenogst0oo1pp1t2g7u7lblqvu80qygby8vb5p6irtorlyaozoklr63qhjm67sqxbpl3mt0cj9bdshgg4qrtf5eey6ouopuvd26ukh854uz6wv0ff1fp8rngsoa8vqjq8e9zpqysxmoyo8c8ybuevop1pgx81kf4asoprc',
                        surname: 'lipso5n9kjm2nqq2yfjyz1z8qr0pikpc6mb8y5zeco1zbin3gown9qu2f5n44flj9mu7n3vynru93s141r8idm3n02fuq44e24w7jopu6i5xmmdm0v1r40qxg6gvo2z8wqtdjoc9sifuz9hatg5ifpw3g1qkmrmiviyhbkt134xotqnm2s6vmoxkn0fci7ptkr53f7hhivri0q20qupwvah6kimyua32k6bdxwtzflm82ksidswetkqtpw2s889',
                        email: 'n44okk6libpkust05ryi6teypnhkplel3my1q6j58o4025jlhz65ibsw8azqjswa0tlitozq6kozbq08yfuglatp887e7qhnwc1cug6hwrni6w4luly6qoou',
                        mobile: '8psuchgr3f58wraz4kuhrlt8imgh91qas7ah3pr2wlbnkjf9uigq6gpoeoxr',
                        area: 'xjdr92ufp4jflg42p33kflv747mcam0qgrr59n9c1s4dwfs6ywuovdq3omolvwndewhknm5luoy5cngj9lm5h91y7uj432aliekvzf83lin7cdirwxrikgn361mhs2icqjpjw44j2n95mj96qhnfb7mgzreq4qhupjym5vwdpp9fpt5423eqnpo2r2zactsl6oj3devnjfv230xx9t1avhyn4mq57tyfjcz0inskj7i7l7yt6kgoyb5ysbp8lan',
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
                        
                        id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2',
                        tenantId: '2186eac0-4963-4b7c-a768-4dc9c97286a4',
                        systemId: 'bea95f09-4110-4ade-a8c8-97cede034565',
                        systemName: 'qncs9dybr1rvtnf0eptp',
                        roleId: 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd',
                        roleName: 'cklyztfflpbs0ez88xhfc7rkgwnvbqx2emhgvcu20copi8g7o6b93b13tgzzfr7a7gkoxf8fcdgtyk31q8dey9lbw2dt5uannnwg5t5vpdspbvrji7qhc6oxvun8c7oqpoivqg7sp4851jna4ma1pxq9cwr36rtrzzcbwqmnwny18bz6d5don8dsjr1zn4d266224350r2ujfzksxztmxowmf50lb6a51rlkx5w3w40bfsrqi03180j8tz1zhwv',
                        name: '338w85z9a6ms4xob2clirigj73vqj0xl7ukzopj735bhvcwbgdq4i5w5myzxm32xdxj6dwg3qyxgifuu8ylvwevm6wugljjzr3ubcr6q16hlflqknprdjt9kvagwff0qppwgv0heknik16d1x1imy2v6dbc1sfc0obla2tgwgigprf4pcdiwb4tp1sqro6pjrao3iz6f813uy1cxaqhd20wktvrxv0w96edqplqj5jag61alq2ysjjvxyooy9f4',
                        surname: '0pct7veudfrqzy8knujh3gh5no3omh725w89h1n55g55zy0mn2y71i4ofhe8bmtfhllm3xikvqfkb4y9u5c8mvi5fbqcofpxrk0e61wphc1jj4onri12c1ib44acuuqfuvuuuqn3odv092lis0s8yt3z36f4uu39wwqxcg8edkw3xxe1ncv9qq6yxxj3jmbxme4wj0rmzhx11zt55h6v6cu5m16v7lqh7z4zecktzgzeljgn2r2bvuc0kliadim',
                        email: 'a6tgyt3fgvv4oexic80uxirbw8i4foaq54jrgiqpp0gslwfjwfdtxtjawusq53c3rpb0qpqa52my5nppqmqqubrcj2mj1t96fbcn6sy9cfunq90w8tw7bfb6',
                        mobile: 'p9shz59qzmttj2w5a6ikx7pl3ry4sxv3rppv3pxrh0ufwaq1q78uy0py4pyf',
                        area: 'hqpauq5dfyteqgkau7dfswoprd2vnhygttktks521n5p5laomgy6lstsx6abgo2o7e15kq4ohtjy1anvnx7nixhge7yhxrqn1abgdvco08wtobmj5kxw46doghv2x3y1ochryb7twp6tx3n3coountz22v9nrir2xwgsjuuewxq470yvdlnaqlfosy44troiap7cqq191gj82t3qw8a90sp3dxre9pntyvd1zldsuwulrstxy0fy1k5gluyo9zo',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('f57e19cf-e0a7-4976-b49e-40d4fe1f20c2');
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
                    id: 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('f57e19cf-e0a7-4976-b49e-40d4fe1f20c2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});