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
                name: '8bodw40sepm760ggvsd7npa8e5df729a1ufnmi4kwmtrds807rw13sv5npdh7d5orf3esj2zeg15zr174pg6ai5y86qsgdo5zkbjb3n3wowzgdh66ct6qtelzmgi9svq9kkd6ztyyc5tusxytgv649t5py9dqrvc8z2ojuk6f63izb9jpovcvoi4wywquh9k3aade7rw9r9lrdnr0wk9lbude8j4hx17xzyfhdsz1ie9vr19h0kgjicntlnhhue',
                code: 'bzpooc72b6r3fstfv9bv270w371uhw0p4d2dm6leg2mmohqfbn',
                logo: '3nt6vzftvd2493noeai2sr4iqy1bcdk6gjnd7fdxkt4lu06qzwmwy33yikx2bp4zgzs6mgd5lhzoq6uucz10yoafowggqaecdfnoggagb8p9ri4y64gbb4b20ks0uixlphbqxhlmu0svfocdwd9jeq7yrts06pdvsxjn5cxfxiw30ert1ngb4yrfvw5savuurlxoej9eto7z1lnkgnukfzf1v49oxbccox3lx54f7wgycb8nvuaqnf15ck4dep2',
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
                
                name: 'ljem6u2831qrb5moeqik0wnb3wufiq2skpc8plc2ulnyk966luvjjtou8n8hdlfqyril4lj3szf0km2l7zkak3ydl047l3jurohi0uf1i4khe8qyzm5ubyphd3zuhjc7wbw9chzm3hmszwkuz6pyssysmmedlb5plwsalhs7vquvahr4v2ghce4qaanxm7zf3o04nun13wz697jid2jtqzbdbllz1e6qwx3w3k73a2n6hnrs4k7smoratmyk01x',
                code: 'cmy1c432sztipv2ey7aggtadc6mze6w0yqaq3qm5ion11jflr8',
                logo: 'oahu8r29n7z5la5692dotiefr89wi9ej4u04za3022rwp4u51qnv0d3iio4lhwid3m5jpld3efuef2kkx4go5d08u1olu2ksol6y1saxyj4c35eks6s7zoqd23fi6wqo9kassnpxleamiwku4kj152u28ismuplu2a78al9vt5sr0i2evvk21gsvxdfpjvnhken5stzizb35ktzzrrsqrljn09oe88ronqg7xhp1l1be6awebllh24az0n1gdta',
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
                id: '4a667424-9e8d-414f-8fe8-2121a8866055',
                name: null,
                code: 'eds2pbza18x1s0tb8p7d29gjc4hf3y1nfzxol8oecx6kbqr3ai',
                logo: 'ip9uwztp7gsmjbiwrdrw0b5fnvbi9vl89s1083yu2p7fxkztrn694d58wigpr3sn87bxq58va3sifebzzs4ev9g8bl2tgr6wg5zts71p243fxvj4ismuv0qkmrq6o1zb8lxq8ymjowegppb0lw0kyinc43md075zpg25miq8p0mtf08fltc5ww5iqkz8dgt2a74yuc64e94ppknzystot8h94npm0kj0h2hpk8q3by2erxe14bdp0iisuc2n58w',
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
                id: '4a667424-9e8d-414f-8fe8-2121a8866055',
                
                code: 'kqn3asoweo4mzq11gdwvn6u2mytykeuzgru8s64zw41kximli5',
                logo: '3fax359pc20ixhlg6tm4j6ef67a50hy1bi1d7s1axwma4sm0yef91gwmxq8n874bdtfypn3yin1uykmhxflp47gr35uo85asirvjudvcig7fwych1rvvupzq0lp6quuj1j732k82cxzdfmz7xgxx08mrucy9m9i38tmc7e2i9z13kjbug5tvtxai87zrqm2kerruswxcip5grexr6j5g2av81dzymggpslfbloh6m339xvtydnzm0l1h56dmvbm',
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
                id: '4a667424-9e8d-414f-8fe8-2121a8866055',
                name: 'p091met3v295kry92d757lwjdenwresiwie0u6qhm1hwv7jqht9ps1npkzt4kskk2s6uuajyl4y1zxnps0am7hcgt4q4xazo6by4hciu6vq05qllyviernoie2lc5urzg8e0fnzaqqxby52g2np71wvrqh95n252v4atj90glzmrgtg92zybwwl2y988gf1f5zzw5jt8u5ag582n5v1iwaz7chigbvqycrvmu6uzjhnc5ee3v5i6rzhggnlqkpc',
                code: null,
                logo: 'j4z329jyxvnyh5zrc9i8x2ojeejrxquavgxcxb1y1jen5zootktzwf3cvcnm608cfgmek48ghtqk1joo2zl4jyq7qrrrogcg3wwtbdo2kg6mino2zkp8ox915a18p7wtkkw2b1xa86rokbejxpne5iifr4hmp1k6b3k9oxnqfotx9fk5r2sdxbwhl5gwol1mo10t9y59tghgjjvb25qiwsulyiwdyktxgiulybw4hmi06wamyjozir1qlyuy2fz',
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
                id: '4a667424-9e8d-414f-8fe8-2121a8866055',
                name: 'n6d66etw4xwj9iwckxo44558awy8k14v7d977v1hmva96v5dkim3yqnyirf9hg5hinjzetwsy6okb55bhs39lkbx050lbn4p49mqokzqdgktrfmzjytl7srulikd5ei686m3p2cenf9tp811ktr0ow5s427yc9j39ci3ez4kyj63trho0tpgcckdnyv8x33u5f8lqyqfu8krylpi9akk9x0kzzgwp42j5gzz23itqsh0wq5i04licz3d079shud',
                
                logo: '38elp1sesywym0bsqbeasayhs8el6vnhq13j92kflhgbnu7cvrwyb0sq3yc4snak7b2i8pdjj5kcgx1bueqvzvqq0xln0gpw9xyah4zqgfdi3h4olmcghzbllufedcg0ke0ndipk0v40kadpt92ngszz0hvkgb2rpb49jasxynutoqxod5lugx0dkqwjfbe25a6ajdl7gv0k9tw64ej8u4fkbxd8c72pf4m049zekr8wo4mc8xcltp31rdktg8o',
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
                id: '4a667424-9e8d-414f-8fe8-2121a8866055',
                name: 'ogcqv1ts5mmtikpzj5p7o3p0iwf1h5yl66mkrovjqyoc8lh54bl2p3ykx0tc9a4qcf1tgu2r1h3rw75vx0mjtttg96war7olitrgbpj58p0ziqm3fdc4qh5l6dt6ilzmm7kip5ebw4gyf2pdlxmi9prvxfef9v9ul9e2vv3ing4a6sark5eu5m4v5bkorvc81urrgpzcbcwxd846kwlbki9nr0exffos0tbuuyxtdxl6l91mx5spo93is8k5aps',
                code: 'f1450lmf94vyg6t8b7ypcm5q3al7n9pueibf3bj143b8zrcuqe',
                logo: '0onbglyepe815rpwv72zpx07nch1w3pnewrn3y1swwxunbwj2illv6pxh7f20wsmpco83lid9wcyjzwhxgogxx6otrj8dhagucr59l9eqomax8awvjdre8t4s7b0uojdtld74ffb82cdt1gxt52o122jy6buojav9p3ydar04mfz455ilqjfxxwxlkezka99iaw0rp9mh3ownpp56qgr7hzoyan10gpt2jouwhvpauenjoxa2e72r5nbrqmxgrj',
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
                id: '4a667424-9e8d-414f-8fe8-2121a8866055',
                name: '1fjmhx7tnerv84gacqyfcpo9pt97at3ra9l5fx5nbuj7rtx57rqrlsjszr47vgjcrn902609s8y9iu6k75dpzpiurnwi75gduxnepxiku9h79zmrnowtj23uh7ubwjj29uo5j3p2r60swh8nyfg3df7zo36ok09nqb8d5hxnch35zv28sbi4spqv5ivi5ecpj7aqbll8ujphi06gtb1mdg6sjdkdumidz2tx4q7waul2jao359tumqe811obwjk',
                code: 'ztaxgm7fgqw2xupvij9cv6h4bcsjqkbb9zj9go9wmvw9dk9gws',
                logo: 'istkp511j964o9qyyyzb89cpx89uuhyz5ztemm35qu49yutscdacythfw6cukd9j040pqm2s12tuy83qzxuyxrtvtve36yb6uza0fzhp521h2enhm9oqiz08e88vqb0740e4mpw3onrdt57jyzt5pou9mumubdy1ghm58s3b2e1rktbhnsb6lxacrpzyqxq9zhn130ltqx9forb0pdlldme02pd9m6lsvxnv6u3djyy248ckysnbjp6g3zweqrr',
                
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
                id: 'wwbkfy5y75bmw7wzzsdg6z8hyjsyapnkj1dxk',
                name: 'depzdwhr3dv93yifrmtsq8akl7uc5v244uqyve6k76hl7pei34wn7jjy0chgcnk2oy43fra5cs8dhbxlwgmwr015heysic37h7efbesegm7wqe384g3yobxjzdkotfof96sb8cfhysg5e321bsr4oj1wh1eg39la5v0crjzh7xhuf8mkkymjze71f6skfmshw2g41lh5apa9z8eu5gzzau684d4tqu5kmfb0qzp9orm1djwc1xofww92z7lt6q7',
                code: 'p0d7neky2vh95f7pnhndvjv29vw2mbd0hj9xizaa89pjmv68yk',
                logo: '333bghjxqgf6kp4wj9g5t20x3su76jsbis4svhrie0z1pa1gznaf6rtw1gaplkvi2umvv9lh9v6syc4lmekx6mpwh1f1mj4xlmr9oc70mipdhvrmjayelkamcajohlg9hmi4jvqje981u5hwpi84jrfkdhqw7nq9i2cgoxvc0xncm0e8c43dhmui50f6muxihwcgxyf6wuh9vmi69qnvxqxn338riivxcked5sazl2zhqdlscooudz8lcwvm4sw',
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
                id: '4a667424-9e8d-414f-8fe8-2121a8866055',
                name: 'af9audv2obxrc86d4h6yswa9o7lmh9ae09yuyr66rvwaktu0mgd7xshfwqx2dj5in8tu5jitxnumh5lmt1hidzt3cm2g2jwrmk3wqfjkwpnpqpklrn5mdeyo3mqw5e3ndtg0wl1ea4m9fx1afd5a0dr2mnmzds6nglfl5sbm0xb901u1xye3y4dxr23rxtcw36jl37wrzzktrz66uj7bu9t8nbfohv0v4lg2hq0fgjl6o3bcp6noixcsfwus96sk',
                code: 'z2p3g44ppoqh7fjbsfhp0wb09eekaqbhrg6dap6er4bviy3fp0',
                logo: 'r7ckerzeg9bi6ok3jnsp33vxzx9ej56gymf4h4b3t8yxv4de99ugp4xye3szzb25fud1d95izzj5m7so6w52h6dk08xgig00qi6r5sx10xk32400fjaz40pmedj1u3nvit8s61v9giqrajhwo056bhnosuxtqh5bf47qku98wowfkeiakz6o68s72vf5dz5887wfr2ishv9kbbclcn3tvqq8z2k72mkpyqvoluger01nwqogx9q5oti75p1ur9s',
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
                id: '4a667424-9e8d-414f-8fe8-2121a8866055',
                name: 'aedd21xc1uypehpiyld45ao9p6ux65rc89cuwuwpi5a6au1v2hjpuv82fsi2gflj2vsr95lbr4dthoi5bxeudcpyzk5vvfwvoawpuo24dsn2i55dhyc3p9ts3v9265ggm1vw6kjxex3npnxw7i2faocjx6bsaj93enynusq4prya2nqwvvs6emjm0prpivl2jiyx45igy4g50iy5e8f3ez0ks6sevxmqvsj1mpctjnmizdgb1opi0epa113mcti',
                code: 'z1snfk8v3dgzkqdhttecca1hy01dm38nz4vn0gi504c16m12e5u',
                logo: 'gi1g6xsxbdsay85tcenkaaf0o16y24d06gqj1ptvc9hj4pc3fzzbrc755kby0cp8s7hggrfthmm2vfvm2u8thi9u7hp3vfjc4cn621roj7krmwxbvl3xzjl5kmsefoikkexgpkdgdzzmrk7ea7u4vh6uq6gf4j2lrlxts4773ijk4u8pxwjs1maom2wdr08fdynziiyex7v6toarjkstcg9hbfylzrzsux4hgfraj2jetbrm768fj31ihdsq0aa',
                isActive: true,
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
                id: '4a667424-9e8d-414f-8fe8-2121a8866055',
                name: 'f28bc6wp9kj1qq9orkfi50y8s3rhk6sk36ur1d3ucmipmbmmu67pulkk15bycgixkuifj31r96e6tcp2g93mqgj632ynzmmlnv3v671ruicj0jprf1lgexyjsma75jocxsimzj7xp2v43v7035vao2atlp6i5cex3lrpey1u7pdyvbg1g83h2qsk54gozl3p1k8yjljxe9i9zfo2xb5q0aw0kmdbhoz6zz7xjd8gpygn7bxhxnyekgztuw7sibg',
                code: 'emkwsc85bm3k5qpr48beegwykdnlf4ghxb21fjeihfwezunycb',
                logo: 't2mrdil3dqwmjtpfzaz0c4bpdcoe6cdps72pzsmzckzcbmwf8a77mh529cmucbldv03m5sdl74apb6q9j9tdvl27sv5gvb8a5tdc18qu1po13jq9dnruwxzpwfrhxd4b43xpb5av9cvqlg5ma7u3gyd15oevmt8bbnpofcg37ocqazk6pi7ccq9xakvkegthp3iwcz2p67u212mn12yb73202ujwhrzc675ha94166gfsjb1flnlt1rddidb24pw',
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
                id: '4a667424-9e8d-414f-8fe8-2121a8866055',
                name: 'cjriz3lvu7eoyz0vpr7iwckh9rwm3pxi4oyw7s84p9rurk771fwvu326ven18x3hqssnaqkv37uuvds0ften9cr5iwlu01csndmonwyqpxdmtjo8b4y7ttfudiiqrg6yvatdfnbazr0jon0ug9zlhwtwadyh0mrfrtl2swebqva7b8kqwqy7dme8emvuj934wsskgzsh89r4pw35ji2fwfse7rzrcnykd81tefkbe162zafa65qugcp551w8a9w',
                code: 'ld5xu6mupjvl6scz8cr0lto958vlssnxtm7iepn1l35516rivh',
                logo: '5d66qo7ld2yl30z62rx9gs9zltbqn5fsspnu67m8cb3ycy8t6hqz7yu6gxlxy67e766t90u8twdj664irucjf0rk6tkqhp584x9m0q1yc67dxxsbjjea0vwued54d4w5ux3wshy8h8fers2e9bjo3t6o0hl7jrkus46jxlpg6tdjstkt34ldu96pyuwhmb62xq5st8tbzubnlm2f4xv2z6u35kxj92f677favcmmgvixait9iuidq10l0bduymd',
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
                id: '4a667424-9e8d-414f-8fe8-2121a8866055',
                name: 'gc9r4pxedzn12qkf12i28rxiumrixwuh8fvflriorzotkhlxu41o7om01b5gusr31u0f6slnnnj2vvs3weip5cvfocfzhsygsaskowx8splb07piep15yfmdfxt1e8xht4lpieb2ifkuign671gokoujyfkvlot2lfvbvdwyhtihqvfz4gyhpsbsndunxenqduupjvtovru1274udlyvh8tznpkof915v4aj3kjuv15psynlah2xqzwdtb8rro2',
                code: '1dkqgtb91uq7gwwksunswh2odzyvs4s2trhjzdyff7wqrgrbo3',
                logo: 'ifq7qvpo75imwsy8n535dobs7npvxl5y9dbfmkb8smzqe8j0q5nht1gzhagxpmm9jpky1dkl5bp3o8ya5y27orbuxe94qqnyk2dvzhsnmg6zvuulmtblsxbo6zx35pyoifn8ij4x88nscf01ih4xg2veq38n23xzqqyy3vzqv5a7jp4yhiby4nd2a79q5bmabjbbhn9p201mk1q7h1o63r2jw5a1ayqiqdc0tc51f69b1kugwz0mzc47ldj1fkf',
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
                        id: 'd9f03a5a-c9bb-4520-af91-fbf81fea0d1b'
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
                        id: '4a667424-9e8d-414f-8fe8-2121a8866055'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4a667424-9e8d-414f-8fe8-2121a8866055'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/6a27da3a-953d-42a4-b001-9d39090a62e9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/4a667424-9e8d-414f-8fe8-2121a8866055')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4a667424-9e8d-414f-8fe8-2121a8866055'));
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
                
                id: '1d723143-02df-4d04-9334-90957c9410de',
                name: 'i5qyrcu9i2weyhcczruy8zh9zj5onasz5k8juz7e4b746aizwl0xrvskwdjdkzdm7ikbf5rbn7jzhjxzpgpdhz887ukgjc580q8xsiqf1xkqgn1un4jh6qmz2avsmfuo8l5oay79vkv4rssnh2qbikbq91zzqyp3jdl9xgn78siji1bga1018c1yvhv7036ilmak0d3u3wk231u8zgtkxzjsiuypzpqpfn3oz0z9o74fpr2hjcboyssdofv9qd9',
                code: 'armkbm4c142wbisbi4k72avdch6eei4wcf672eakejn0i9nhl9',
                logo: '0ll3j780znz9tj67axcryk8zdlqm0mqvn1b6y6s34d9gbktoxh1t2dszn9yd8252mtorjohr6jvi32hpox0ma8u10b2ys3k2htirrkjs9m6c72h3aiab42dp2r29ll3qkhuqi6o1t435jft9zc70520gut5x1lhz2souaiwch2djeu6okyzsiu3h4fpopbnablzs2dddgjf5nk3l9c38pt3fxajge4e3wex967w74zs0icsld8hvw553kgama3c',
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
                
                id: '4a667424-9e8d-414f-8fe8-2121a8866055',
                name: 'kg7xelspfsepupebsm0h59kgvlv0166d5teieazpb5i79rlepvf8et3bjbll8mh7fqvfooyac5jdtitti5qzm795hcq7zayu4na7zpcxw7sby7u1630es6ijt4umcf5euuxxhvrnn31evd4dw2jptxdpe5e7fjb4ng6fpttqu7kwjvu6zyl9lyep6veubnstzz2sww0aettdsrg42igpnnjdnqzqkaxauygsacuklgykg4y1up8c27l066qthin',
                code: 'fdi6obrj15l6mlpus4pnagl784krrz7055hcgfgbz7o00cbp4a',
                logo: 'hnh605zgyrsydxgwn0nsmnp9ux971nwh6iuxegpx6511tjkaupnnzv06s2b43en3h10m4yka4p7zhh4ddsvzhkiwe0pa0zfdg6zgpryl165mv5xcgkvmhgvnly45rjjbn7ei1mtctt175961lxifq8yt4nuaaaywjb5eikcdezfbum6v5t94mlg656rx9v08x1qrdtuds4fdvb1wsjd31qxnzr0chaz6s8tkt5ypqfiyteezqute5johtaohge5',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4a667424-9e8d-414f-8fe8-2121a8866055'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/45d395b5-7bb7-4c2e-838c-600cc744a252')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/4a667424-9e8d-414f-8fe8-2121a8866055')
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
                        id: '78839f4f-6d5f-40c3-8eda-fc1b41ab0f63',
                        name: 'a11l51y0fr7zfexqs59p9pw0e4h9wk99vm3oyv962ry3j9pgtyyvjtwiw4ufphis400y3qwhf8xhdn1hakf31bb95adw234kjovms0l0gct1s2crexad977ly1pw96qtsoox8x0g70yvbl7bdzatii7baii61ceobhbrny3ljzpmxjuxlo8oremtrspov3bbu2eq4lgbynuejnwllsgytz3escx87jjzfnye5xructwqq2ca1l3ih11t2j55kb8',
                        code: 'lr1kxvsab7bo57o65qh9uimjnk1kpgl3sgpov9dx55ju4emg2u',
                        logo: 'brrmy5u9fsfmonntabjsp7xu7nq0ys8ks6z78k9dzqucpcj5nz9vwnicqui2u8jwa68yc16wq879tv3cga4yfpelhns7mrz31axuc7gtp6x8wvosuivv9kabhwuh2e3wdhsvwon6sao8x7uozi88z94su10mq090fru2yove9d9lrkz12dyatqvjnmr8up1e0hateivx2e998ch2rgnkaj6rfv0c0uujkil1f7kqxaxmfm40jrvr7gf400sugnq',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', '78839f4f-6d5f-40c3-8eda-fc1b41ab0f63');
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
                            id: '4458c388-084d-4b72-83e9-a4594eaab7b3'
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
                            id: '4a667424-9e8d-414f-8fe8-2121a8866055'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('4a667424-9e8d-414f-8fe8-2121a8866055');
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
                    id: '2876469f-2e11-4b98-8342-ca6538731bc3'
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
                    id: '4a667424-9e8d-414f-8fe8-2121a8866055'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('4a667424-9e8d-414f-8fe8-2121a8866055');
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
                        
                        id: 'f1464ec2-95ef-4b96-8b91-9556f0da9eec',
                        name: 'u7vs0awgq56qof3yf6ccocyxpydowamsxf44ia4ck4u239u0avsx0wzct74z997ulv3yo28mh9wwttof590venkyv8vazrsg9c0mkklm8zjngw38pnd2aiwhv707ez2b8u3itws4jinb37uj41jb6kiks4ff54z60cr280dxieaw816d29d17tumo0s1c4yfbs37sx2vj6bent3ueua6evfar801pc86blmyt776q8vmh37mmwixz36ncyovtjl',
                        code: 'h90v9is2unzblai38a0kydqb8hu66ku9nlp4yvk4840z7r3qsk',
                        logo: 'otz3861wp7lcef5qo2lea6qg3amhx40x49lttnzkdoki0i8ivfs251rrefphtp5jj58pd0a3qetdizd7ty8h239nz8jxwgx5mzn5cv4w6qkpqiphkpuuhyxhgscfffacok6ycjg4ye6opqvv4l3s8r4l89c5bixzzmm3h8rl3gvd00mlfqix0x09d6at53fa3824nt7pryqqrhp9l7y1xvihi2su7rh9e2javstkrlqqtpn2dkuqogm39y2snfb',
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
                        
                        id: '4a667424-9e8d-414f-8fe8-2121a8866055',
                        name: 'vdykhmf728ntmecl67wtukkwogzfcal06icp43kowm2xyw9rfmk6e2v3tl4sw64m23bxeei0jkinb43zdqvzjvu9q7xk98n3d37bwaraga9pxzhscsh5oce7qam7ni574fmphhogv9e6o6w3ikjtf1qrrpwqvysvqv4cxz38sd5jmvcmokb2auygid2htbmdncbh95u19f1nea71m6uu3zco0te24534lql2840068ka9utiitay41qencbe90p',
                        code: '6qr2q1x7qqz8n49tvj07dfa7s1h9f984wphaev7qwd4249nu7r',
                        logo: 'i6fibehuze7vc1wweig34jqcriwrgys38835eilx1dx2z0u5dfobj4id44t3yeipv94a8d4gyapjrqvcl8g75bnu9an0bj3jau7maf1hdf597fvzx77ila1ro0ag92ah5ns34j3ys9fu4ecd2yey2a0r7lqnba9m2e8yxq5n0jwvkl1gx70i8uigzd6zz45nx2rh9u7rzr8hlzws86fworn4nq8x4bxkxv8cmb6lo0j5353bmmbgue0gkn6yh2f',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('4a667424-9e8d-414f-8fe8-2121a8866055');
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
                    id: '47e43cd7-8cd4-405b-97d3-bec25cbe2301'
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
                    id: '4a667424-9e8d-414f-8fe8-2121a8866055'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('4a667424-9e8d-414f-8fe8-2121a8866055');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});