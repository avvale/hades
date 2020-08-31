import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/bplus-it-sappi/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/bplus-it-sappi/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('flow', () => 
{
    let app: INestApplication;
    let repository: MockFlowRepository;
    
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
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: 'osh0w3xwcsv1f9a6u7ek0xylfpw8f07gaw2rncoq',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'ysrqjmukrfoue32p8rspp0p0ufuehbxdz6k9bs23jti13747dv',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'jpdcaryoisd0h2zlznqd',
                version: '4bl6q83vqak3jnw2cjvt',
                scenario: 'quhim1xn0879qp22w7zbiw0dznhh336u9e2ps2q7nwf0bhwpa61rg0rnl4ol',
                party: 'lgf1ij11ky5d1thyu6jdpesn3wj29h3th9ruzzxix9bztdersk073bxzsc32naqe4eden90qln7f6fldl16ze4z85w9fa9pvs2ui06h0egn6j1thfp7npyz15qp48razjv3q9wz7w3jh1j81o8egh9tea2hm3fe6',
                component: 'bg1b60mlgaoneinu16y2a21ohmpd5tyjkx742tu7iotxc67axl81z414reb9jkdz4jpg80ef1wp57qam1o7kqu16y9bn4jjaneqryduxr410vh7t77nebqrfy2p1whlwr1dc8p6y9j9tlt1mrza1ae8ll5l7mc34',
                interfaceName: 'rketsu5k41pherkcmmdmdeefyn3n3cyr90y0iti2u3deh3x7vq1utqpxpp4g8j2sz8jcmoudxzlb2i83syyq4y33gt6e4a1fwxddm375n8sxgtqyfyxdtcan9v7r0iaeiyv1nb4n41hs751e6zdhfdte1n8o4jhu',
                interfaceNamespace: 'eg2tyu76crz3fzkc3zh9kk227ofcbfxptwnkrtgj79fl25k82apxhij9alox3xh9ihlm9z5mtmlxxk4yeliu5czrfpdndb6wlj8nfh6p4pea7c467yhrbbbw2eadpmrz0mtxz2dm9ssx1vne0a3h80l61ynv9sn9',
                iflowName: 'uiu9jl12xg9bdu4adefb8p03bi86i270bk9zzvelmlv478p0lhbjylhm6zm7915vkuskfza0azu7kn4mss0vpo1jlsgazvg16b9bffv2kzm4z0zadq4q4qnqbsnvgs1wdmugpesxew9api7e0sgnmob60w2w1jrc',
                responsibleUserAccount: '9ai0oox36g868nprfjay',
                lastChangeUserAccount: '4yz7x5qp8norq53zajga',
                lastChangedAt: '2020-08-31 13:21:51',
                folderPath: 'bgcljfokrg7cv66jprrhlp36c8o1knjbdchkuduxcpdtky2op7x29v7jv82nh1653ga8bwy3yn54mtnzk9h6wn3xsfhnrbre72mbdrb5nfrus07yejdd4ompi04u3l6xnpfdwbmlnbd5534f3c69klwx711oe54qo6ceyzgw55aretgvkeuf2r0gfa6j5e2awmkm43fu9hu9999t7bnpt7420hgf7h2nopo0ad0bsicsspm0gydfw6tyf9bxi8p',
                description: 'jzgg122yu02qdzqurrjo4r2az1fkj86bbhqfpc90m2vcuc5qibntkt0nfk3warte47gensoyvnqhve40g0q915a7e8lmpnv2aedyk7ty1ocj6bo6ql91tbfcupdfkksadcm7k1tsih94lfqz75ry29kjjt92tb8yl8ivhqhpr76c9znmkvmjzpenb6muymryb9u9gtae6ha5djnz2fxwtufeqo2yqpfkuhrvrgdcrex0x0rfz8ftapht0rldu49',
                application: 'i3srqixtnx87d4dqhxw94ruftsc1pavscy7bnxf4yzbr4g49po6gu7jqpffa',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                hash: 'fgz1dhmcvwn60j01gq88y02099h083vn99e2dtv8',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'xesakayt3vn1bb60lxswad6vni1uto5ysfmw6d5k9fyn5lcdvi',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'myzdc7vuj6xbctp87ec1',
                version: '73na3zdcpakk0n4iwvz6',
                scenario: 'pfq93apiapeb1g6dfav0dzad47zpjm5zer7bzov0sqdrru7zd88vmgqsr1sw',
                party: 'xycemqo6zgr3s4ugstuw45pb86lsjvp9qvjvf7c8pr0tzcmsplq5v94472r46jzfh5z9a7q7agthud6dv3f0rppjpwbkzaoisa3yofbj4fl9m09vagb9zghazqf41hztokun99gxkveueuawzw6k3onu2q7u0xc6',
                component: '8wv19qj9kolnp8flvw6r7x84f9qjiowknkgwzndr6mjlqxe28xkh9s5fn7fvhjbrtp6zxumti3qs8cc5btot6wj1sodhjgwgc5is1c1daro7kayd4xecd46z8jzltqzxu1w3ow93x67m5ogbj7zutdco6t1117xw',
                interfaceName: 'pnnvt0jmc1aceflpacwpdi7jlbzjfg3m132plo66ph5zhuzdq04hzfep2uonlbgbmtw82er3ms8w35ni9nxsh80ajko71195ipz6rerg42u5ba6r7c8l896rh5l2fw09dbyli4h6bt13yxyxz6emig1mh110tsqb',
                interfaceNamespace: 'd9h3p9jcwykh88ngkhk4xn6d7gsg8vng4i9hro7on1zg8623vdiu89kt778cgrh0uhunif8ldebdpu4wfchrpv6l67iobzaez6nhj1r62hz1r5uorvfcg31blsyf5o0dykb01i3h2adjzyydrbxpmu1vdbgnmhi9',
                iflowName: 'jhds01hpa4eapf2frn8s01lg6yoz9cvaafzpyg9rkyx9w9acapugil5f99myat2369mqt2froujp9siy7rcpggg57nmthdzn2rzjynhowvk4cs94jt8ndtt9ut4ffxb3qc55zcq67h5mnayvsiadji8jkl4p6i81',
                responsibleUserAccount: '02hgf9yocna24i1h69w9',
                lastChangeUserAccount: 'a3zzd7qc4fy4df67salq',
                lastChangedAt: '2020-08-31 04:12:00',
                folderPath: 'fb443s5p87b1r0h24rhznja37iv7smgbha7pdxujqikzgu7ha23b5kw448l3fowbfgzelpjuidws6nqrofs9rtw71ex5mlfgpa56yjv3gi0i5ez1r7q35v1pkkn0acsx6k9vkvi3ti18cu4kfptc7bl2ng8ykxipiyjhox5usvh8hciba4f9d2tq1p2i68ggigm2semsz5djvzq0zu7oyqiv5qy9dkf16oc0yg7op7v0ijyprt2ekz3wrb4moko',
                description: 'pvoqcbadbbjpxhbxw9ng3gzn06rrdgi1b1dtpbl5677mfd161mg6x44gs6i9ws4xd1wg21gxejrfy9y8hen6qhsxh70ivn4xvcsdvlgs636qqqehldhjdk6c6up3m0dia5jmp0xgqiqa3h2qqsst2r9wooelv76fbfkatgf570n9jm0l7ybzpko7xmmg1w6892j3uvqe86rcz8pu9te0gvv8q6uo0wkx4vxi739ru9xkgehp9vdnlfd1sth6wxq',
                application: 'vme2tk9aamuwpqgtltgibekuiuaihg1ebn82prj3eg906geamoivj3t669kn',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: null,
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: '0xec8g660fmq4w59yy7txz2o28wmotmb8scce0mmmmjb8m7ct9',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'y3631l6nborthuxn6cb8',
                version: '3achse03v9xuiinskiva',
                scenario: 'hyl78xonzhtgnw0rnxdywb2x5b33hd45jiewek7kaxny00tuiv59vjr9vheb',
                party: 'kxyro9t0kpsky1wdzf69f32on29yxd031o8pgmn9e9obl4vfuvh6rriglcoaqyy7zhilk1efcjtfxapxz1yh6hie2z7i4orlhr6z3jsfqmx4u4k2sllztkf2e0x8679yotocfznie39q6unswgn4k6v4ovuwrnxw',
                component: 'vdpg1ocxzzypetf7hmxtk566xbhw0uixmx1rzaytdtlpi72nhbyi7r4le2gdh8xv9rrvxlch2nn25ytuzqz4my5waq7qa3kkmxsmkbdru8934z9ufp5dtlohgt73hnjvvs66ahauq4l803nnwssdg1q2iwo2ln3k',
                interfaceName: 'p9b92owfhu15dzjnploakgujjfstn7ufnyol5w0hv9bbtsog7zigqi2i4hr5m5l4psdv2gw27qc73yjbv2r8vaqqepgidwiobb0r8o8uyuhdxukttdv2l2q6plwz1vmdpi05p7fgt1q7ne6it4ehamp1uij249k1',
                interfaceNamespace: 'dxkw6or685x64fk2yw9fxilbqtnpscjc8pvuox5c5qptqr9pe1vxxkesorpdy54f5dobgetvhlaqi5cvdnlilf3mmbmdxeqe8sdqbe3p9mwf1sw67awp7e3zawx8c2124hzvr2ej9f2h42hrbuci2lvnkthe9d8d',
                iflowName: '8n2t2xrn8q6efwx8yjq75aevs1o3hkyzuhojpascfrjf0cqxiv6h7eafbr1d9wkjb296otb2a06whwnaomhe03lqpna71doy0riuzaoo54v0lb8dig9rzubntcopffg0zehrooi34m8n5wgbe36fm6xtrnxfrgxv',
                responsibleUserAccount: '60wncx03sq6i6rkz5lql',
                lastChangeUserAccount: 'msonrcnlu8bl9pk0pi7u',
                lastChangedAt: '2020-08-30 19:27:15',
                folderPath: '0y8yvfi6e1kx3p405yf14q3415nx0ltg7jccs54e1d6lze4k68lkwfis9y5tne65lf2jbgfhyjp0hzrpi3qgbaiw4smbc5p641kdegi2lhufdrxtu6qzvkir5uizi7gbxfyz0q4ndppdm3e1kvvnvqvjr97jvx6ecsfb9bsmxqo0u3un1vchexrfjeoow7elnl4ajnj9txmvgw1cwl2d8w34runqzk4aw8myo275zqm9j9gn53dlqyitay3ykgl',
                description: '27dh5yabjcvrji714v3ssb863dwx0915uicsfst2e9pr55jkcft52h71726rnhfsafalnli9v90xyq186u6wzse2jrbw3iq3h7q4rlkr42kklty217khmvarffno9meqv1y1a53e48nlhpchs152c7ratspto1j1b28wgkvzl8tc2uo1srgmloh2s8l2l1lpt7ym1nliom9qskyllau4piqdsax44njypq0fbvyukh84nnu6hnfrbhh2lzsxtqy',
                application: 'efxm95tdybq5bmkc273gp323cby7fwv8ukpei1uzq57ufpjyximsxx1qr96e',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'ixtfyg5reww67xfsgk0269jjq1kvqvls27gpxlh0nf3p1b3451',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'erxudeeb9c7yqy3i5iba',
                version: 'zh8xk537drslhan43o45',
                scenario: 'i2iok7knd9q4ai3z328j95mfd2no27hfrqd6btka6tjs4io8una70owj8gza',
                party: 'e8expndrrlahjkzx16dd1mh14qr0qirga0wagijn11fewmq4y6lm48jleyeac3nnsqklu5fiidehywcr3yxyptuujxg04f58p30hvjb1rpvljwd0qmnoae7j7p2ivv9ers4l0oeascm5kcs9e9ldd0ydzp0azitb',
                component: 'iklidow8ezq38pxipekvfijacnfuw76kxkvpn1es2m13wkhzzldl14iz1wlbwvgjlla38c6khsde3jddvt4m2w3jxgbxg98w5p3zjty1e2095bp722wj6vdz1qj19gv2hsz4ppvognxdzkwmqjo1zqbdp7bakd4f',
                interfaceName: 'vrju5qbouxwlzzbnefm7iq7nncamobawwbbgaachdrwdx1zeulx3m8hxpz7xiq79ptuxksynw71mwh2s82rou7anpwlo84w21bsuiw7cwwx2ojp6w7zvo9zey79xa9n4laktfcriir85m8m2qcunlg6r3s5lgha8',
                interfaceNamespace: 'rs2lnsvqzj8ukfx0dwghslwl4gpifl4ate932vb8k0ckii2f1u3p7mgmupt9854b3bjfjwx0oaz0foy38um846wigtp86fyyk65a9vacyj6q4q9oary2x8mkxigoa9zowyl2xy10un8i441l1cy2ia4l5h1s5o7g',
                iflowName: 'ocouvvt1vxqytpdkvnx1di7ut925uk603en29srm2t23hhne0mdb494jjt6fb87u6s6jsfdce39m8yjb55xv432115yzhb7tci8o2yixf96su7ofjyt7q3zcalxl8nf7z4ikmkeg103cpl31tf1p3psjxyf6lnyh',
                responsibleUserAccount: 's10kik1qxrrla042naux',
                lastChangeUserAccount: 'e53ro5808ht7dfyiz4hh',
                lastChangedAt: '2020-08-31 14:59:51',
                folderPath: 'rp2fum5kj0uj2r4el3ehq9r3bq9oe1jj8z3icqhyvs7ncsli9oed7wnq5j083t4lv556ncbnnh19amhva30huz11o7q5kmjmzof822leq8mu9vdtpaqmgsj39v0ncafwhhy7ojkp3l7mezrr26yht46sssqzp61dmpc3h2ah4j1vwobtx1y4qxjgveurl448nsp26f8iq6zqaao7xrdla4qylk8wnt47ai5srz4lz0azernwckvhbiflyyyp9ai',
                description: 'v24trhdi73eesmviwtkchsnq2qtb5hm17ipoln6d26eehay5ohe07g490m69m7cijrhniy8abj1j2kbw8ln3419gfvxwd2wjy7jxdrio4xzbrc8d0966bxvgngjks9eb52l61erqftjb3q6sf7q03pwkpg6rwx2j10pxn4gbx88a0zxv549z85mls2ial1js422181jmwd0x6j5u2ts8f0yv7vm66432h0phzbcftykn7set6d3ljidlzfu25ux',
                application: 'd6vcuperpgyh89mf7dbc9qx6gqtez1g1bttfeq2grlidcdjx4b1bv0b2rjba',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'hsqa53uvasb0tyb27udfsli27t36rjn9gbiqup2z',
                tenantId: null,
                tenantCode: 'sys1nwnpe4zptes1zejaq71vj61hyx525q9nymknpjj7bebzvx',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'n1gxmu4k2wy8jxdswva2',
                version: 'haa7fyirlvd0nqcmpvpt',
                scenario: 'jedwpkkmqzjjgx8xeaernu0e6ez1ycy90citxnpzqfe8gv976ik2o3wtq2x4',
                party: '8w72aee92tcoh70eo9wkbt0fvevr12pymr4pi4owtenytnkbfat0mrn30whgzkx5gsyyyfaf8z4yseuhn0xxorllkizhec53o7hz8kkpgq8176fbbum1u5bv6l47fq09dezuh3p13yhlky1kclw97wgwrwxmnd0h',
                component: 'sq4fa769e04k8dzm36zqmjyunfggrdhqtctqtayunzfnc7xvxdumuz02sl0lz3bhg3fwtba3r85i68n2i43n02z75gw0wt1x3ijbjpvqyt1mleoojxewrmxa7gosw3i5teqp1tgbauuzjbfcr24lg1cwest068yg',
                interfaceName: 'tqho0fb6t9dkhu41vp33zebgxa579gv6uy2oq3br1soibyv9vr88xsyiewudkwm9494prp2r4qv2r6bd2yqdpiay98siq63wj5w9j351v5hlg8m0tuxgcllrzsu6xl5rwmh8mfe8m3kg0yck4004idupfo6azj6k',
                interfaceNamespace: 'mmk8h3rfbcsqjkurj2ke88voa3pl1oj0hs5sorozohiwwrmebyq60r0r4276fgqpug3ymch9fy9jupdvzgz1uk6mhkmj0717mey7eyovh2pyd3kjz9j58zblfm5z0bqvkzgq57mck5e6yzrhmz3l4czti9tog9z7',
                iflowName: '1earregxwx4jj0pgkjv9q9zzvzja2f0id3v4f20y5qdxreu0s81blpq4sf6rg4buo6pdkovho7vr8ooauwch7sgcustw2crmzb1c3abnmi3gpdh5r04bd3cqde6zrxwmrzdgrn3jepuv3nyo7wwebitlsozaffi7',
                responsibleUserAccount: '5ahs8qmiv9ojl1lfvfjx',
                lastChangeUserAccount: 'lpoyp9f7uu7qd6j6zml3',
                lastChangedAt: '2020-08-31 10:43:25',
                folderPath: '7jzht1qhw3rn5g00edozn3durkejypdf86o3vtmo8mvhg4vf44a5kx69hagaymng4xgnkkg1uyklttg7k0gus7p03n8q1uzmgte5zp9shz7rcakoug9qiio5fd2h32mpjz5t6sr29sl9chno4e7ldf93t0gvhh4kd0ocdqunku0riwurq4dy43koqxcbeqlitcb8vum9zce73dh1dw7uvitmc76v3xi1og3lgnsgn3kt1vfblq1nadtlz8lvwxc',
                description: 'qesz2snwhw6owiyvjj2lp5gcozj186uqxahxebjz2p0ugk39b8tkzly17v8ikr9uaj8n9qypmz5thh1qaszlradfo8x8o1utfjo7yo6h0nz5vjuk3ga5tb2q5utdk6kkuxqy6bhd8wi0mq51i3k7rp0nzk3hvpytk5ur7widrliuok899bab8r3k3bggxutd4lx6cz8n8a06byzk2f5jrxl335cirjtfxmmjqkrxirodv0xp87k6qi3a4zp0vx2',
                application: 'y2tlr2baq7v56tt7nkaeqddkmz39mkeax9vsdzg6hyci66xwgi54awjk3l8a',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'magweyb3v6ym34anri2wghlr43v0qnd488prtazq',
                
                tenantCode: 'q3pq4474aph7as1b00xb5g0jh6ng6406yk9zrbiebmgglfhquv',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'hdb8o1smqoo0x6qrgc7y',
                version: 'lr60s4291clyw1uow8uw',
                scenario: 'azxebpmx6g7c2kbkrw9lsijucvys2resym3wo6pax31ennh86cbaavknbuid',
                party: '7pq0u9acd9c5eykx3y468pazkgl70wgwm1e7um06ahfdw7l0h5809bquin91c9dbyco1nsofyaie0v9jjeu5n5v0p8uoezhjj1s1hqyae2yfkbfuvqr4s8yflk0bt16ehyjk0p1puatgmo3rmplo2mwc851e4mhx',
                component: 'hv274awczravo3eish9qbgre69fdkk1y6lnuewdcvjxipgeuzqcvlua8ly8sw415wk39wv5w0or5uioaaz5n53adtjx48c49dv4cxmp8wqcd2okbn7onlzwqjz3oac0gv7ng4j136yi2l8v6qibmgiup7bx6mfkr',
                interfaceName: 'cm0pleam600zfr00bcj9t3q4hsug8b5ev5i00aibvdnhopr4zn7u2rms50o5akcge53fa1sxwsobbbqipcz64f7qqbsz4t53ep94yfvx8zgabbawican55jq2hu3wp4ko1gu87xg3ajliqci4l6c12v46cl2a09r',
                interfaceNamespace: '81z5bzyd55oh3yglhaicdh11mimqqggk4bp6zctw9r74ihljic1lk12tu9qzldqo0j11qw82zuhlpg27mhbnkebc2qvjyk1iz7sm6ch1c8lselomdljnom9r9jbq1xtuilslnl7bg2g52i376a2po9srg0ezxrlu',
                iflowName: 'x79wwlxrfzf8oc9hv7tfggxcitwumblp5o3w4zf92w63pbpvidkecgf95cgkl3r3u7m12ynewumxvoej40erc0stqb9iwy0560df6lg09mppgwdt1bgpptmkdalih60cygf62f829vrv0mrput7ydkc0h1yk9tay',
                responsibleUserAccount: '0xi2xk6ftcnbza31i26r',
                lastChangeUserAccount: 'mecdaflz617vktm89bbk',
                lastChangedAt: '2020-08-30 20:15:26',
                folderPath: 'dpwttsybtq8ktihx4f31i3h37igrvz9rwrj55ek3edk5sm08qpirxw1qk57v3eegt8axbnkgrf4psd7mgetvz17rji2puiwwmk1k87qeasv8pcu7rgvuku8blyr6dq6q7z7ev5mydple6r00fqgsi390ezz1fn73qxro49d4kz2vp7l4qhtfb10igclk51vo4pwenrkvmm9qcw0rsu1klv3rrxyqow5ut67sufy8dnjq9vm35t59c2tf8qpi1y8',
                description: 'a725hfal9rscddbxsuidwr1p5zecox2jsdbcbsvttv6w253hp6g2x6qd6smsh5y1y3vp6nhzqyiqfg7mgbns6xh24d4w1b1l1r9mvy0nc6jcjsplft8pe76wmr6d8yczfqx4e2w0absn1r87u5w4j4an32lzuhse4m47nfco9wd235vnpo20bztizin9qmtiodph47itt6we3tpg447dnsyzvm8ildtxeqj5jolta048n07ykbx5sl1y9ywabrg',
                application: '5qxsynqvzz5hc05olcrys5ki2payh6qq01v4u2jvrjn33h8n8q8noloutinp',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'rkkbhi4mb3tidgd4jib19adtwv1rh5i7vqbhb9kd',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: null,
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: '3d5xcz45oik9qurulqbr',
                version: 'y1698dsk8w1iz4w9z3wl',
                scenario: 'uiet1s1sr5d37ro120da8jg9dmt7s4ntg3z3vrh496m3b2usehzrzjhc0cg5',
                party: '1msdmeaz375wgufjp2cna1yp0pbrnowyc5zqvst6kvzdcwn2qwk4lb9t2cgj36zhs4ulgkvgo81hor8kidl7vvtj55tp9s7ambzyjvly2tr7szjebqd2ap5yvstobxapowh0ku3funxz3ldc4mooefw90jtlvbuo',
                component: '3yyghba1wav4rd081n65ge67957531sdwygyirxui216iuoa9ic98atydk1m0kfogo6c6go07u4puzld0cs2c3uza3cnr5dbqyl38za7e9v21qu4b29becoszu8jwlyul63mafii8noopmq0xqvlk544fxlsrdxd',
                interfaceName: 'gjo2ymykoxjmwu2xug23y1rjlcily9hfbyvfc7kpep7s58yizxckko3l1amvr9tgol8hhimkkdjdf4gl8et79riz8t6q8isofrzy7g82jofdl5v3nmd0u3prphch7j0jyqz1uqfh3vqassm5gxohoxm2scowkv0w',
                interfaceNamespace: 'a2751s3tclytguctak687dwd0risi17rwezgwiosjch7ww51i2jn99ioi7kk9g20dnupkayuvq295hob34q0qrj70y5coffkkdu9gke5kf0whiw4k1pnp3aajpb8rgdqfw8pkbinov40jzwpaqif8qffp4zxu5u7',
                iflowName: '5jd3xky2upfgsiczsf98b0kitd5mkwvjc9gija3n8lzxdrha1emdzecrffru7x5mix33p7dbrfao64weuq3rww5mhpoirsmyq7ewmbolx0san12kdlv46iy5h0x5cyofor2idxqje9d207krr58gg99jgoq8wrso',
                responsibleUserAccount: '7dssiw534bsyk7bwejy4',
                lastChangeUserAccount: 'prxiacth6ogsdyrjgdqm',
                lastChangedAt: '2020-08-31 08:27:53',
                folderPath: 'gu6ipu2255p1w9l7mnm2tnkgl3fwf2r4fg12p8qv3bq412wbcvw2s6o66s3bfix4vxthztzo9bz912z7xjx8prrr5m1cx832up44seviwfinwn5qdewj7r6otdimsla9jw0c7mxei3xvk3ndccjohmqk0wz8yt1kf72nfvlk0305lvus3j9qy44b692rp5ou0dzaid4kju860sw8pdvbu4wuso86ayuufv1zuyqeec45jvx53haq2u30iwnhqzp',
                description: 'tgbbbel9nrcvlos0oakbhvap5z5fj1544d5bq91aaojq3xh8efyz1nv5h1juaxhzh2o99i7ns4eoze989l70clwt2uhk3rga9kjeef7mo9cj2mrzhxzrsxit11emfevdk6uzfr9n9x3ky8snjhp3c4e78u7gfce540bili1oc821chgbc03h0w60i1tf7m333ys3v58frg6zi49a8sktt85rsy4ukm7t9srlmik9laqptj7s9z3rpi7wfv7izx5',
                application: 'jp5ckd2bkj9xns9dnwkb06wfgtmikmf8acg86bczharmxkqmh69xsg5lucfl',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: '3e5omqk48f2k5r2vckwiqemwt8o00yj1qy6s86h7',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: '5wdixxcimg3egxrlp7vx',
                version: '6cm8fbejyvjitr22j6md',
                scenario: 'cz8opd3kvyypxpo6uncyv2tnt800rtrfv42635ehqhm48ee2i5tf2cwiz1t3',
                party: 'a0cqrkz109t6lh2eynptctiqeu3qvm0mhbwrotbu6uowkym3gj8ch8kxcfqfdytuwku3z3wd4nd0f0eo7qwkgpd3nuprlndfpnt2nf1zvrkabf4vonh2zv9yxjkoufb1h9jcalki1pm48hrqoay39tmcd5tmswso',
                component: '7jidiukfwnpumiq5r5m9n65mosy48ycwt3fe9w2bpxmj3of97selgsn9pnbw9j3vywy1ndzholkk4rg28efj6kp25geu8hd7572vdqa1btiueol70rk92sss0c8w062no6g3pl25y761t73fzatpksugn7yzbtvl',
                interfaceName: 'rad3vex2wpq5n3qfj58moogxdpi75t75uzbb0z3grtkuege4sshif09owt79kf2xvwdl6d2163amm2voi5wnz18l0tcvsgc5aym01am3ax1fxg0u83s64a0ol56w2riujdp9xlvtptxcynmzl9fzihvu044byhpq',
                interfaceNamespace: 'rb5mm3n42e2boz2k1iyfspiwgx4nzslo3lhetw39x4r20lgwkweuw97yuimt5abrraz377cjwz3vawz02wb81j6j0ngjhxbs1vadvaquowtrui09kbqu0ny9mfqp0w8l4o5244pg3o9mjh76q4733x9x6gjzcr3l',
                iflowName: 'bw6h5p6y44rit3qyy3kquktfm5aifitv82g4ywy59offmos0fzoyfc5tt1bzy0urz7vdaendc1xetmvystzokdu9dg449rpg7mao5d2fqwtms5st8v7nqy65385cbv9d28hvqr3a9t17ccje22bxefiwflhyjz8c',
                responsibleUserAccount: 'qjgjk2pqifqpbevc9zsh',
                lastChangeUserAccount: 'zdf70op4uqynepjvsd7r',
                lastChangedAt: '2020-08-31 05:08:37',
                folderPath: '38tsi1pkem9twg0vzkj856uw5t23vzoouvz7amr3cecxe9h7mmxtkymzbhizt6bue14fc6hvsyiy5lqzmjvhcszpsuwkk2hzpmkads19xhy6pcrenlvmmscq1tkxir41tada86c7wav7b3ji297m2e031dtjcxg1ny8shxsatf1j0h027sk1qscdvq1z9mhpbl0n7n7xdxhu92c4h87o4t06zdhx4musxbydkomuj9sqqr156p55fpdgjt3euo3',
                description: 'kzlck6qbwvxvzjrur3ji7dy0e7ipwsdxqzlw8kidokw76gn59uthm9pya1eiyhpn5umq54jpavmjhoiz8b2eglfu2hmpl82dqcumtuetknqiyja3e4rwkmzjta8qv5alb6yl5496t7toq96ruwr3tv9ee92hrp0cbkj5lc5yyjiezey001jpmosboz4rzzhfbw4y6z34vrvzxjiyadg9n7qr9ezq4sg65ba3rn6vio27yqo1a1tlcithfwazbk9',
                application: 'kf8szjwj35utsrpoe1aorrtvjw43dwqf33m2067kf0x5kot4jolbu3gm502l',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'l2czs2rqjef3w71d7yg55myjdfl6czpt99wopmi9',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'lfikru3exlmqeexbskgsffv7ujtchf9rck7qoo9yd6hl6s0azl',
                systemId: null,
                systemName: '9s41ymxwt3noelai0loq',
                version: '85hdgqv2mnfvey1gkef3',
                scenario: 'hm126g3gkxq2h2r4jgajptoxrhsym7m9jxzzb0qb40eqgms1p5a1pgsyrl0z',
                party: '9rqvd5qnmnweth459dn1yuvobwgdge470zqg9io6een0qbibia1sq6s625c5xs40ctce174p451r9tqhfjl4q2mgbtmkwga07p89181fosfsuv2j8ygn38um9aadfksvndr7x945df2a4pw9ou1u4gxin8jhspeo',
                component: '9u5772yy21tnzhjdrim1soyhlx9rw7qkgyocilwnh9w4cnpns1dyzv644ed3e8p0vqqu5k7smgqpdipeef4w2w6rxxmp0fc21bdyr8b0kiberwlq6yl4q2l6res0frhrzw6qja8ghci7trrez3x7fzov29hthypt',
                interfaceName: 'bnl43qpmsr0yavgwpss6v2uezh4a9dsim2pog5876tjdm3gdiz8flq50tx5oqup87rk7i6xj4q39vro4mnr9txuqvr5pcszu78d8qint2c2xlhmcmavee2y40dhm4w43sodoq3tp8gkhx3ge1s90omw6orsr9jls',
                interfaceNamespace: 'z51ziu3v2sqir4zvark1z05npme7x4mdhth02kpuie64crmonb7e9rxuy854cl3vhqmpdidpwiqlodwt2dkjyonznja4ttkf6okauffccdraisqf4lyllzjcmnrqok0odkkbjae75epmlvh12pwtiytfmprj4osh',
                iflowName: 'n4ghjf4s010w8w47er6ut2e1bikyf3w7l0d9zhu6zfwl3xguzgpmkpjk8vp4adt1ockyvbl51l6zfwjnheezfskc1rxxlbvuyct0zdak1ljluk3v8pf1trprrmry9bxtp420zq1yl10yb0kskzyv1cm4l3mxnb7t',
                responsibleUserAccount: '3dkhgnjnf8dmbf3ifawv',
                lastChangeUserAccount: 'ur6vg7qulxbfjj6i3pyu',
                lastChangedAt: '2020-08-30 18:41:21',
                folderPath: 'av03iooet3jraw7b2yq8kfgihbjwcw3rwrqr76ypz0qlwupisdmprqvjghw36pv9b7fd3nhchwxyxc9rq2drpxyph2dtgvolx06tghpz5zix7qv7te6v28x79x9wbxw7ajwjw1oqdc1dc356dg41mu95mdvwlg7nkv6jkfd17wzuptezy0myxmbhxsl43twr9mu04vazed3w7h7gvj1bf8whoq3cu5x5ulsiqqamysh88i4o2kkhyxmabahcfll',
                description: '7zsv3xyplmj22yehenjhkjketlbb4g6qm8je7uk4whmnw0b1p0bhrs9z3rlb3sirpf6aqxefh7tkxhb40ambtdb1j26dawdlu8wnl4ppq3kz7ito8u7ctx9t9fb8km34e7v8gt017ye1a29x3zq5f1rdf8qbg0ajw4dkeg7mog4dtqgagf6hk9hl3ycv5o7r0ad3i8cbdqq5mpmcsm8sad6x7r9ft2hml546oa1onsff13fi1djycsto9s99b62',
                application: 'e5s4lu3sto23qwbs6ijwaih4tx8s9ydxmgw5wwveapzw6p6z8i5a8ggogr0w',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'oxzc2b74h3jt2i27bkqjxy5wehd1c7o61fjd46ga',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'y9ayti2rg0dn8e96effwdb6slh3r2006sm7weiikbex8vw9zq0',
                
                systemName: '1ndsz3q4a4ff78awctf9',
                version: 'n9merc7fwfqxmdufjfi3',
                scenario: 'x1rne2028gtr4r7z79k9r09za10bc3rri45cbp8zbqieaa4ooooozgrutxa9',
                party: 'fh1rg4h6874k990bx1j887anupbajbxor8jaelod1q5idveb2a5162on1l2sclwrh8x82jkld9k1hsnxoydv5stkgr4ur0cbmxwwnphwmumbwix8njbi9zsydr03wqaoq0goxtdtqz7s8s9pn3f1wa1g8rc12fl1',
                component: 'kn7atylfejktda06aehjsmu9ratmnk4gcuw3qs26mowav6lnlqizavbsgqaertvr2g7uqukxi1lvc8h98wke2f5cn781uy0rfq1s5fmzpyo0phuhtloobn8kmm8v6s9lquxgd5s8w46xq6ioz7aa13bxnxiol6x3',
                interfaceName: 'b0igqxzuljyxd3htfyefhaw6ilzu4evymlpvh8c6c901bk32g6gns9nk88anbz7xiz6pmvggzsue3ivufgbkpx4iwjytlcu54pvhc0w7fzzc8fwt64xmdrq7a3owf1gy0gj2jwx5vq9uukkl63bctcdgst8ua01r',
                interfaceNamespace: 'fmcdccyyz4tiofmepazeougkbmabht7ea3drgpqzw9kautyfzc6du6407l6pny576or90lc73lalujap09qvtbmwshsh041p7m98qxv714md8fn9qh9i7xrbd142b6if61415gnd3cuy2ewenj4nrnn0wxih09pe',
                iflowName: 'fheetzqbpmhlw8f1x8wpisuypau77wvlim6b6u2cgfhmw3qutf6y2pwfsiwogkxxfk39kagkj2bcwoniuz644i5wso463lkpcpsc0gpn6w34p26zq3zypau5ek46qea0x84vxdxhtbzbeh7s8k462xwyiuiv9mac',
                responsibleUserAccount: 'q8ltpye365ls2taw08pz',
                lastChangeUserAccount: '4h9zfrmw7ogzemt5dyvw',
                lastChangedAt: '2020-08-31 12:35:51',
                folderPath: 'c47jqu52b59rci0hrp09wezwl8puhmoe3n1coyp027kd28lgep65d1cddl1da3e394vun4o8k2uf2zsxwyh7t574wbxuxfeu3vhb4glr1h03nmgcsflqw7ew18xqc5z11u78yccaenbz2521mt2jhs45gi5yonfaojf8mlb99bjj9zlx0yrmtei7snfo5wdm3pjx9cvoakry975sjyocex260knnvjbi2i4fg40okktsth48zc08urt6rul0rls',
                description: '1b9enufzsab06iug2tciajz07v0erfnh5lyxepygmprvq9o8ap0l665w0hls0l4y0sqjzeik8h1ie9jh1swtp70b5rsj58r9pps06ykc6k5e0buxo13fgzrc4z8dxgs71vo9ffeo65abo8swtp0jifrkcix8tvhc2jak10nbdktb8fw10j0751tarcewvuvdan8a7nibl408siuipva87cs1kxz4ufc6tsf0ss7lolbst2j81svzpc8i2t871ld',
                application: 'akwxugcpouage8juld2o2ku0nvxyukulk7p2kqd4r0x9cmzlws726o9ikq84',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: '65bmlul7pv34bs02s3ii5jaijaotu2yebuenl7oo',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'v8fb2amx22sm8s7b8rvf4yu1gjojqcqfoks35vltnqxomku798',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: null,
                version: 'pxb9zg4jwqny14uwc1jg',
                scenario: 'nwrxo436r2odmi8bfx9kgkit1jhtxywku34pm14183dtaqr4kmvolplp3zge',
                party: 'xfnyuj3e993s7rvz7l7vbz3hqm1veyr6zempwe3bvt4gin5ezu7tb8hojthdo8kyyldpxhca65zolvsw9m6zustl9ba44gq0yv9w6lf3frt6w8ur0fi7qmbrizbvow88qpngzqlwxgs669kb7pj397itjqu1bxbu',
                component: 't4c5vjxppodhs61z9yxl0kcczhhb0jxq32wby7sj6in0pc9i0yubsdmgrn5i379e1zl293z38bcyqdekfr7dfmiik93xrezdute630xuut7kgopfnu438mycgfdryo2eyse4948ji4ldb6bzarhrmz6acasbq0fy',
                interfaceName: 'bwq8xtp98jqnili98qj5xm655voe4xg150nplhplycohdj5ulpk0qp8xb4zj8j9r2hay9juzqlq2foh9lwe4he5uc1i8x8awbhlssc5ooai9g61nb3l98p2mrhdc2bhr7j8lsj6ge6x7swqft67rzzduss8jvl4e',
                interfaceNamespace: 'vrhzr37ytpn3jc9ks9ae316lxeha4j1tf2zm6au00apfqjsrghv8anmzhb5vypfm5hofyc9j60v65bhvqwqxmkxyb7bavlqxxgcdrkeeyx29kyuyh7ynkxftexi9yd4zcmas9i9o9t5mz09wmg44zcypbp58tiuh',
                iflowName: 'v1amu29y827vb3hxqnvuhtt9ob08i7c4poqdruns6e5df0pf8c2lioofis1d4mcf3y83pq3jwknb85s0amxq3p59fjh08042bbukx61r2ey76f5sbo9w16pvqm4v4sk3z2xlndo11rmp3gubexszb3xjn0gpda2j',
                responsibleUserAccount: 'g9rw4zzn2ip4j0jbxnbs',
                lastChangeUserAccount: '4zju7lg4q7bsb6bzyco6',
                lastChangedAt: '2020-08-31 04:53:34',
                folderPath: '1791b5lna9csslr05j66z22xan7dye6ij6f9zmkkpij0ez3si7lv9fd1bkpa8jwm32jb6f1opruykfjt7i44t3ax8l1xf95fyelvf2sm9dtath2wo9evd89a18eq7mtniiy33kdytndfu2fcu7nzny31gnw7bhaltyqu4oqz8pycj88j6t1bkowjv7rh76fujmr2kiptmlariq8xqixlgvdxvo3kt70lu6oa9018mnd4h0vozp7adkan292o5dp',
                description: 'ud42q8o9p38qyrmfyyh17qigoem02ed89vfrqkr2krxaoc9g8kg3pjtsn93cohoox7304aapiuq0kriky43og9bkvrhikqpvnlwj09tnl6vtqx3h1dxo3andfiyf52hgwct0shbktml2yyapwfsugmmb326sw0s5iwwxjic80xzcyycphv92bav4jb349xex3xwzt43kqf6xii58p8zfcx9gguw6evunist1j3iotrsoamopmcbea6y9sb6gp0t',
                application: '3s4y029luil2t4697b68oz65z7ytvylq2qymvz3hggg0im1slo6h6r0xljnr',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'shawz3scecl824srp9kzfrinqxrby9p5jhtc1emn',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'ruxi6nvq3hiyihmyucu96quxc6lr8d3x785avi5bg7gu1ynh7g',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                
                version: 'vrckfplsajc0g4eytdq8',
                scenario: 'uownrs3mrphrpu05apfhk3ym4e1rre4k1q26nygo8vbwglvukb4giyg1w2rf',
                party: 'tfe73vg1effxjxod6ew5slv15p1w9txrrshoxpvtrmdaf9plaglbpvhkafcxq4girdzhx9f1qd9tewjil17tpnjpzcfvkkaklknojb5f7cqjg6w6rfsfi0o8363vwkne40hyclon8t7c5neu4g4zlflb2uyaxme2',
                component: 'er0520rpy1gfw4f85zzratd8fhhxkrpmzge559buc90qz6yfm5xa6fnk038k41utgvxvu05p6237t9itw7imo44nakjto2f3hhx39usizseah6rb2l8x27ouxfjfnwapgytfphrwcpfwp6xmx82yw6k4lx05lsvy',
                interfaceName: 'vua8s1zjdeaurfe4l5l45yy37t0v6w4fco8ggx19wkgdzq9rd1rrjrh4fxaa71hbk27ys1la6zj6h99jt77ey3a08tf8frqtc1akabe7nsmoikqb45z6fpiraa2qnjbvkro7ugoni4d3aalbxybrqxqhwvs9tdru',
                interfaceNamespace: 'zahir7jzc9lvkoa3k68bi8d6lqnqqzfz89m8ct9utzbwlr250rdgksjuxd530xe9ll4lt8f2pa6gc7714u89qpwcsybtdfum4rbyhbsixryicmz6vgu4gwwdm4y9mv8czwsxi1fa8wtlgocih0ndtwxpevt0poxe',
                iflowName: 'v9ntoybdof8rhw5c4gf329ik27k6jehbpphcfyl9364brojx1964346kcewa8yhybib4ghcr8c3whaluw8tjv5zsbzuf3hwpkrmw9nx0uxhl9yald9mm4zuscomtdda4tfroaz9w3ajavbjkhz05eykty0u8lwdv',
                responsibleUserAccount: 's0596c2c8suy1mi5xivt',
                lastChangeUserAccount: 'cn65ukje6liyntitbctq',
                lastChangedAt: '2020-08-30 19:43:10',
                folderPath: '6tsohz5euttq0u6a6w6bwvh8epp6wpfk84qfsbc80k5tz002zdsdkzg8zsg2vfqjhdfrod66leh2o70rkztr2prta6f7a6q3b999hk9oiaszyjvrib7vw6mpgiw8rf1bmqer3vv8flm7lo3gvw9uysl2zvvxjfgs5whojf8ei4xjaw0sdvfp5u3s9viplzazz5og3ouf1bhec1089u2w463or76tjtzuv8tfgrniisc3o9u14389aiowijxbcf3',
                description: '6z97tcpm8z57fy3927cefs4sxwm67tqbtbx4hahtrqzc54q62x9tqf2909ccjwxkgyo5mizy0i8g2pf02idql28e7ye9os4arob16d73iotnrmoc9ocusup0mvm4jk8s8rjwzoto9n3l4pnyl0pdo3stp99i01djpfkx1lis4bcidem86hscg89ehgpimzg55e7cuk42qua114x2f6j8dr6f1nzh18qgezd7iil6xo02dk50ay5kahxdly4m5t9',
                application: 'ec0tckr8wya44xbnl9sbehfikkscj5ilq3tag3cqviww9z1amkh3pt0fj49h',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'wwytizc9dtenre7dlkrj6ed7d3w7kak7evhbqsy4',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'r9oq7hm48tziganhuc2fv8y6625qf4b9vunzmfvt7ro0hkd1jd',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: '7nlz0v6ec2g0q9t15vh8',
                version: null,
                scenario: '32uabaj3cr7ysl6z47118fcfv1s6lmwasaowo8049909glm7wu7f0tubedfl',
                party: 'v9oyu351jxhai6z2l104uxwoneywa35bly1dzz691i5t0m04f5qsaqemulwbxcbz3l7452zhauujwcwmp4bm4ai7k9ic1qw5zoqagh6h91vzeoowq0fxfh26rtt0a5smeovsbrbvs4rco4behp09fyjn8j58f0ks',
                component: 'ueln77kn3561gbw0be0b33ut53542t6bs9u8j2xtx45uq3qrlff6ug3ut1tli25pnsmed0dl64o25o9i2dz7d66yner1zkuq7d4jeesc0n7wsbsrfz3344nfzw18kiq4ke8w5tzk44tnarfq600va3qap7usxrh2',
                interfaceName: '54bru6q8a48hepqj1w78q11gieqap3s9ci5q7v52f61w4fp13qgz5gpqi9o983u4i79r3ovtcepxup40b1sedybwvz5w377jgpz68huhvuxso63ldtk6l4pdspe8eqpv4k8f9cbbsx3kmwuabadljnnquq5sjylb',
                interfaceNamespace: 'd3sollw79buq7vpn5o5pofhkf6rmqsjb4mmt1kpuc18qi7msvtytq413cu9wzuov15gfxqhjcqs6f9z2eb32m2gz8592kw1hohyja5wuq1nhsnoioqu4zm0dcvr3x7sosw1vnzz8sno1oxx32rg0qh167p9k6ncw',
                iflowName: 'y6807dl0qbocvoumrkewpgrxjtkfuuhdemyfzraai80fa1p3kz3qgx8m9lriqqpltg9zn2rplk85khx1y8smk63054bvt7f4xwzb16c1171119mzrcdklrx0pc1oygxjn3jtje7j33sbxt41o7fdc3hnwsicweum',
                responsibleUserAccount: 'xrhl4y5h1mqpj6aa6tlo',
                lastChangeUserAccount: 'kybmuuyzs48wy4dpalwz',
                lastChangedAt: '2020-08-31 08:46:41',
                folderPath: '3perq65zg9yei8lu2oaa0rgtodpgsbuzm3rf1el8blnfb8t3xmvseqn0ajxmvdcpuzgzgs98t6xftv859505ujxe06o0xp8ymn1dn9m1poslxrkxu2qswbi3gmg4gp7xdbgter6u6q0iicv6ryercsafgkete9mvhvci4g9j5wey30kp76zk84gc9qbctiqca86vi64ik2f5bbhz3e6cpkzn32l2n0ojfxs5q8wsim4nve26u40gp9srygndjie',
                description: '1z7nrai5k6yxj850ajj9m0cd99voc4dyoew89oeebig6w8wyys24xdbbdu26k3s6tiwgogxkr97fs0b3vq69l3bxpf3j23n7ehu3kz8yim3ar48m71i10bx2bxdxvmv7nmvw2fyusmqo3b4xl35dvk4tmvetrarro07bkl5pc0ygsdc8zhz7dojvqltrvyddk03hc3zpxbf4v2ztw14erdtv1v4e2j1504sp29psz8lvz35ntwj2o9mvxbtko92',
                application: 'd5v8hdvrydvc993tknpzn7teqzhk5etdlxbo9acwzi8qwudd4ew71jn21nyd',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'osvka990qspilegrfly8w2j9wc2rzh59v76x9c8c',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'ieeoji800t2d1en3scaj4je48hiykgjvzraxpgid3uwa416vgd',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'rcvbkq8oo2quofjt0g6w',
                
                scenario: 'fmhph7o6h46wdildu6zd4taf8oknnqf174kdd94jxhc0dhdfdj7axaliarrv',
                party: 'bxkcwy8w7jjgq4isoujpcgusafg2pfsdksr7rayndrwpjl1ljr53w8kun7m3c84zgw74qm5pptudxcnchrcwo5evt9tu644pioucxa4m3qtkx5kyujaql3e8sryrx4j2yraba9zx1uaf73bsra2cz1e1e36ucsup',
                component: 'bh8qtky3br7yqauf4czurypfi1hhipb6sxj2lx530gc423zk1wxjhdtuuumlqqa4zuzym218qc06xiiqk4223igjnvu0blfbj7gt2lotuespoxox3lr4ewjf3bih7jk73r7l5l05x5latganqh39ht3ns06i5wo3',
                interfaceName: '9sqo213l5clgnfr7g2pxufzyw5vq5yfwdmjt8gzg9mp8yvc9ydkevxlirpp2jej1n4a76vqbl245j7045k4zb3bhglxrb6n8oj4lh1rx9486b1binqdtsak8zc30zaul61ytsylavxe5e3j35au0h1ajkaa6ki27',
                interfaceNamespace: 'i1nkw48zel5gj8vf6307yacpyyhbw9dvbda8rmydf32icknl9k9m447l2bw10pk8y2o1t6nsstw4qy1bq4hgihty0bjl86b395baw9vv083as2ntbjkqw15gz5v42ibj9270p3g95yt9k6t3ucwuiknikrfrn1an',
                iflowName: 'ket0ivuxorpmhh2f29i8f1zy4jvqt7dcs8fx18y77fchk4vpxqidxae99ji6s4wy7l0vdn37vvl1c78qg5fl1fs427hsp2a33jrfpghkz8q4ejaatucnuzqibt9pqewc51vbdk78lv88rgclnnkmmyn4txlpcoug',
                responsibleUserAccount: '3339whs8baclcz099503',
                lastChangeUserAccount: 'gxmn3h03qkzeq7mc1hbu',
                lastChangedAt: '2020-08-31 04:30:37',
                folderPath: '43mo97gdpqgbo759m2tf5weolpwodbghjcunltvnuruutdqw2854to0vr7yo1z93jspw0plb4pjo9pzdtd2ntoailp72xywdnn2o4t4mx1ha4xymsnzdzinnp9avn0zdj27e2lnr68yxu6y6c05tmvj7o1i179hj9tkdyu53pq3g4izf0aceampx7g0cqzmcm2j94meci3liuk4bidkngtcszitvgu9c2x61oxhbfribaxydtinemzlbb1g5ocv',
                description: 'fm5k2c1ostiey2x8tjanj5uva0q2akd46o6r1v4of9ght0rg28m0d3emk10nslwtgi372mk8f09cyhi92531vzsn3mwcnvup8l4y6ji45o7creqg9los906z6i0pvr0i8cged81iz3zrqucmiynlcv1r3h2pt9ujjf4n8pfo5u2tc4g88o9npals0dq93jzeaquzoeqf2dw0gf44x6i8qv0crg6234rjp5rxuet9ekdbknxt7atba16380pxyvw',
                application: '01ip3rxrrwr679isux1o8h61ex8odbiz99fwpkloccxe6r8c3og9np1kznvd',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'wnta44xybvw5vacu19i5no0yergetvw3v5d5yb1x',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'nd434n04hejzbwfae4usb79o0c5j3esja0e4icn9rxux7gsrhp',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'qlim9s4quucr8aupe9dv',
                version: 'ufwzlcvtolbtgnqdowce',
                scenario: '8qms8aok4q54d0iv10cqkpwzg5tt6vzzcl884a3uhgugepi034m9cjra3pbf',
                party: 'sy28o1mhtp4xtnmwomjyc8mi0xm48jqmpyntlfk4dkwkdzddzsz2pf2mnvv6h4bq3uzqnbwl8lhebjl0ay8dcibur8nkjm3laovlra37fqduzuh7y9qy820h50yuqr98syjh9lstssxbdpcadctx4j43awbqp7qo',
                component: null,
                interfaceName: '6sj558jnbfa3m45lz8poifb9t7hfubao3dwixvy8ezewnbc8qejp5prhcnm69vik3vy6dtb1zpyj4th04z0kjdlwdrdyv9qnwap7vwmcv0dp8ms5qztrv0mtlruguxyevzb5on19l3mmvis3s89xmq7garfps297',
                interfaceNamespace: 'efjozs54vrarezatkg77fdk78kwjww324yaglgerglmmu9jaivtqy7pnoy6kcntgykcgarwa2mshkw3lnads4cek16qcakm6bj8bq8eql13zuz5epykntkrz2wsl9q2wozwajdtch9q73f6xqfc14kw13joskjm0',
                iflowName: 'nnr394js6vt8dunnbiv2vf5haiwjfanl1kgl3feymyu01g0xb35jgcg98b5fxbfxuoxstfbszbk79bnv9d1y0nzd2f698ufomy2d36abtlxzi2nhfpjgpt18ns01896sm28ytox38n8akjedsvpmbzvrm9qp9zew',
                responsibleUserAccount: 'em4obbijx4r5roqewe75',
                lastChangeUserAccount: 'v5rst026r56m8pbhceu1',
                lastChangedAt: '2020-08-30 20:38:26',
                folderPath: 'u6vzo00aytcjv4oypkn5qnue5mmfkdixzknwtm7bokm4gu0fqzccd6kld1fccsd5v7sgizgjksi6xw27o8zs4hqospv1rxaylw5drapypeaxuvd3r2xvxzru57wfjni40fwg1i6y3nf4qroiz1c2pjf7uk30vsc0e95kdswovb1xjcecened4oqlh5t43uly3ua2ch8n6cujxlk4ban7jd39qswrc3qkjfgter9s0m4ir2dsa9gfpfexh3zxw3n',
                description: 'u7rs0hsqrey3flrqfeyocjhwkr5ew5h8tzvmh4rv90mozy0aztslbmllch1jvqb7731b4y6vkm3dvaqkutrbg1ls8wcmfw1grpfe9xmx6ksaeri09nx1khlczydtxnfd009t97crwj50t9gb8vrn99mt5ehhwsm4fboy1gl933pdg55cmsc646wlp3jipq6hxujp9ukt8uubxjjb1d5xtoo5lfcvj904t8yt2qm7281smmwqmld5lr2h3ubb1ce',
                application: 'pnhlq7bsg5dvwiw8m4ihsz70kw0y6o1ha1em3xyg4sl9jvhuk46xuqiy89qw',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'yo0hgj9oir6fbuqt5d78crqdesf6oy1i4i40mh7x',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'yn1wye721okr2cy40mhgws7g1b1egpmfwe9zbj6as0cm9h4p4x',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'ux61b16g7x290b1ozg5b',
                version: 'ongvnzy5a4nc446uskq8',
                scenario: 'xric3w9e8m2adhowvrrkcvj0ruh45pjjvx45c48p9sipgqunn6gxenh5s68d',
                party: 'kvgn27xl451etmda0xelgu5zyca2hlpd0juh49ihm291ciwz66q15600d8mqc35rvzq1px5nlmehzve6ndk29kk1ilxfdbhw3l0u4qnqru0mk8a2dguk6eihpus8ui1t6wh0b923aiq8rlzxcfnuv19ou9mrw59t',
                
                interfaceName: 'yujnsupc1yooq5jnf56jp9nx7h5i8ix58kgei5ap5z3owx0dqr1silvcrh0267ccfi55v9jwjhdh9emvgj4t1n3l5ng1qvuymrgjlyco1p43sqjzdq09ayl8cw0fjk6fo38kxvzpep6fhti1nn6vb98dvl71g600',
                interfaceNamespace: 'u32ezgsuu2hjt6n66abc7vxauk0yssxq370qvuqxdznyqxxvjb3v5wbcr4i72iqo4uh22rdssuxb76usgo60eb67bvcbjb0fzf6tskojudz5x53o7r2r6z8tic2hqu7jtqtm9iaavqmfn947w8pvprnmvr0808bt',
                iflowName: '87y2wvtwoxx2rf51cac9hoik5r8q5hswx3ltw1r5o1s6bdhctvkjnmkjghpaaomvrmoe93z1nqfx5goajrtp52ckqfpcfqig3yem5os3i8z9pxwl5iinlt1onob8xc3i3j3n7mch85r9g78n1kdw3rgoekh6ukzx',
                responsibleUserAccount: '3z36wuqh0v6js1kvii63',
                lastChangeUserAccount: 'vakmhscgrwee80s8p32g',
                lastChangedAt: '2020-08-31 02:09:41',
                folderPath: 'ftbersa45wrnp2w0suztbvigicar87h783scfsv8tkuwg14k4j7exgv0b9lfo6n5ge9awnp5fq5zc3u6lormwatxg6fs7jm5bsq0o26w6pvfyvlv8d4a84v8dqt8rlrp1f3ysdbf6jmprd15l1rmd51un3qjn5bognc05qv9au784oz1l9pbsqbhyc4osanmqryev90x2idhc78yz7pq7vm5x4lnqill13opa8hov46reowayxaad5xx3rxw250',
                description: 'v137nfsbd58j43p25tt5x2cxwhzbl8pdwlmquacyru8t3mucmh5n2n2j3s5w5weo7k0oe3zl76mm2ytj972mmwy70tzlum0g9rluux8u3xjchlfgfoafj07ptj9h04ocoe0p0yiwldd6bdv1ayxvbh3yrha55uw5h5y697jwoz5mwkc2h6l56scbrra4fvu4fu3dr59q5fg4ljwj4rly93lzdeladxtqbxrqvylf528x5mick8m7g4t5wmq6qmz',
                application: 'aw2v4h70kj8cf8nfgaupxhl86vytrhjf12ziuc619kizv1ni7hmr6mb56fk3',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'nrzzlab0mia9c3e0ozb58x8zo58s2j18e0iofeq0',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'm1mis770wzyz0er8ghlrgi2c88dsid2id26pdcglgubc5074vb',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'ilr23tmrwqs04dj87g3a',
                version: 'go25g1yprczz1byhawve',
                scenario: 'fizo6966t7ygl8kyyixijiogbo8rv7p7hcutg8vpfjs8gtjpbgxbzsoo59gj',
                party: '4qqaylr4vocprazbzcmyq7chwhm5b5coym80i11bjx42fhgc28lzjfrlhe0jn2xcwmw5vh1u33blg9q4b8ul70g65dumgshpjel7oud4e3h6fxzv676v0dnj7gy1ymtu45yfcukfvgt0irm4605hv9qjzv7n6u3c',
                component: 'zrxdj42p1xuawczth659orsmsum3cbp2y1hllrza2i6m6hteifsivsgu12o59jhwlut7mngb70t42db236stwlaf9wi20n2eh884gaeprxik7plt2zchcvi0c4549k2c4x1qlxptnwi932owp099sc3p7z5ksnoh',
                interfaceName: null,
                interfaceNamespace: '4shw3e4xpxbearln2vi1wyk8gpmmcmo6pknvue37bu2h6oaiid3rzxyptwz9j84rpfuropxlw1q8dryui540g3ckxy34lcpolnbge7mdkqnotsh0bza0aucq0bwboblfpduxhafdrwhrlf3cs1o09bjr98l7ozkm',
                iflowName: 'byla0o6waoqht5568b0p91mdmnxnnjc7py6x5ul1xlh5uwupkk6h0x2ugibimdt4mkikbfr2tov7n4lhrnug0539ziv7x3n47ijehdyqb1993teoz5l4zxvidyvnj56o5gi4a1tgm8jw49irmewzlqfn6bsv7lhz',
                responsibleUserAccount: '6hoxbv7lbu9t9vdigl3q',
                lastChangeUserAccount: '0m6at4w90hinxb66jv8t',
                lastChangedAt: '2020-08-31 14:06:20',
                folderPath: '87xyz42ar4lzl0pob21twwhsg1azu4cr33t9br29bnv3lfins3ly3sy9wbr3qbhh9aewd84sd6bq4sh28bvlqlpbdtfvkfvt3x07zb2t4jewlkxccr1xlg2e6pxbbsmtaywfgstt4htkdarffdr0g5945axx4v0bzb2i54kl44xk3un3nkkdesw91z31h8u9uth07hpkanqg49jp1c1oj37ilw4bxj975huyak2zi4ld95oencsb0b7huq73mqg',
                description: '1gjntaei49e7tymxc13yguysi3kgx1vdpieqvjinm5udr0f7tzj8e085ibu8zb1tn81v439q9nn4qydl0sepiro6buo16nypc7ka13tjirrqn4tjwv8w3ifordetmc9dkzqm2gsudm04hhfao6e99q7n3noyxmq8s9qz5ieyb5m7vhc8e982yf8xk2u88873j1ji47ti1gdqolm3f2hmh5kwu7l02rm85danzb27jha5z6b9ur8loc225x4fkzf',
                application: 'xes4q132k0fzif1l68d0u91u16rfj9n5i1ifgs1aj23t3v5dju46lp5lyhui',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: '6rnufuusz28s00jambehi3opsp93ztpw202b64le',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'd1uvww7kdod8mi5ym37gsaiman8192lmzvs6x3h75upvg9m2ed',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'o660nlkakatv1gi91bmn',
                version: 'pxvshuo7owvghbgedb82',
                scenario: 'lnou3xet3ukrxnnjnarai310g1bxh1vg3unwdpoafyi0xfdgt0jbohtrk205',
                party: '1ipb6egqna8k1fi7x4smq4efhile31xqx0zg6mj6acratdm2gjoczw7thxz4t7ikaonq98r950354n45es79k6ms0z5xqdrlhhpuzhhv8cqu2bzg5omh4gs13fhnd9i22o7wq8icv8jyzagme9oy82bf74q04pod',
                component: 'e6e4el35s1t0f6e7lkvtjadwm2u52tcschj7kng7ug57xy3gn3hgevsdarpyff67rordbyo69wiqb4xkamjpis9auqjyuquywd8w924lap9ldacilts4u53g4zpzr2bkug3gm5e8dyhe283h9mddyamdcava02z2',
                
                interfaceNamespace: '55vh1e92f5id8ep773ibkj6st9c4yh1kc2yhuvur170k1yxlt0ad9h3lnxej8pr4rb3kxfrbjtplmmzfa62v5550ljk3o92za6xpjiykbzeuk26b97pphol1wvgmmozmdvslrxjpdaghjpye0z8klk8akku6fkzb',
                iflowName: 'ibzr1vpp1ny5pq8mgm3ug8aexywljcvdzc9tzhbb082bz9vlvr9695d56p3g0hwak0vrfmvsh6i8hwltfc5qr3p3h3ejb6gz04ubfrqt05ber5agu90rrrsbhi0qyldy3yuz9y9bqoeyi5hic69p6wcgh4sqztfn',
                responsibleUserAccount: 'y19b3fcqv70v4ndkonbw',
                lastChangeUserAccount: 'zoz0ib2jca3a5j6zo3kv',
                lastChangedAt: '2020-08-31 12:30:18',
                folderPath: 'kz956xtvwc0hrl58opweyczxoebvt06ya00cw6ixzhsjslsp71ddigqs5waqzex5k2meiykzdmdtymr01oyb0xw5elljtz29gadgwq9rn5rrcuuunohc7kygpd1otj2zl9yler2qoj3voictvtfoy2jz0lnu41mf54gk7fzbgnoflbdrgdkqptzllo7odhrv713cfjz5jx8x1fauc3k1maz35n6s83e3chfpmtxa19rqh8yp2vj2w3cxkciue2d',
                description: 'sz3oyidrhoho8rnspbfo7g3s0bbko96fcprbs79aoeiadxj2m9l7y0gg3pm2xvt0k0jn1q64zn9eoc9fzagkkso0e2mr4pmsaulp7agp30153skpr5qkk0hdv5p2ssvevghv1pzyycdb4jww8bbnodt9n719qup37fyu3lipp5dyyqx76k3j77b7nas1inq9j1f77crqzn4efjg83imtzwrg9tjwbm3qqfflei17m0l2ea5z2l9uiaj9w3l9jih',
                application: 'tc2dt7xdezpmlf9yxakm71h5p0cmky6xcpp0qyobutgaxe6qabw42ewfy83z',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'bvjm040g8akdi707yeeysodiyi90mnvsxfx30oof',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'tz96iwy4wcs8frwjopndaggoh7h5m89msq9d6f314vtifxak3f',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'hv1jc4e4xtez85f112kj',
                version: 'adiiogl9p1t493qrulwx',
                scenario: 'w3yat66h1ewld707giirh2fsjf82xnwjzyjxx9tqr9m86ln5wuy3d1j73vlj',
                party: '3iusovv6dhsd1caekh9tw1apt909xx1kwoxqt8l2fz039tucmtrat5rwic5y63kpxcc35pfeo12s3nmewsqoc98uqzl9gt1oo5qi03stk11i3nk5ib5lvobp3b0mb70bvbqig2d1lsoumchavx9xt09a5fqigibv',
                component: '2y67a97oes37eg3z4bhpf2zum466995o5fhhmidze7m5bq9fd65cv1jqqx5d6u9mr35lofpa7n52hsi4jj83juro9ufewnjdya6lkkl9cpqs232ixgwwbotyniv1fgue70l0yrrxatupagwpyhaz9tmcrrui3vkd',
                interfaceName: '4xldg2e8p5qu3ansm1xms4wj8qo5vssbd5zno7h2jwh12ksf2b0wndu6vngoezujpkdh2hhzrxrnh6ggzmz6vkb2k3n2zbbdf3ihkr9kbhcmki0lau0cysr7zwk46yrl5zz32igo0pdznlaz0j7x6lrb2pf6rpzw',
                interfaceNamespace: null,
                iflowName: 'vo2jt7rtpqystvmynzyz3jxw00gt4uvldrr2rcwkhjhxwcbstey5iekt0hf2u3597nxha8xwak800cfbxhh5fofid3kvaroxssv8i5wnw5a6cbum8zgjae57d6mqazofacg13bra0chwshkxhovda30rq0xwnqf6',
                responsibleUserAccount: 'g03gr2qirbdgf13ym2x4',
                lastChangeUserAccount: 'p8dvg0uti45wszivb1g1',
                lastChangedAt: '2020-08-31 14:47:25',
                folderPath: 'zc9thvwjbv1j0g11w79c4irqahb9mniuq0md7rls3ywjqmf1phb4kg6kmrj0v0g2kl35a5njpp6ge2e0bjcp7qbtl9jdh6wg03hf1tc3ws4e8dmla5qtf38h3tbfre5pm9priqjee99yhx7hu30jtr97tgsloefpnt9y6ga3mmstih9ebnhniv0sry17pmxx5s28p2bds46ty3f48ps0uuvzh266pn8p4pahbyhrjjkfgmbopg4ctllhfgw1s8m',
                description: 'ixgjbrt38jnc8jhsybj15gsffzgpous8cekqut41he1hig4kdkj516ew3g5rezh14rlbt0fhy61ibl6uvneifzi3xqtopv8u82gqk8ku2x8has420dihpbni92nnswkxmu89s7davsgxh691oqeame2zxiixu75z2ul8tpe5l3nv2o4i6rzg18khlq9b8eybuxbyo2n7q3dm1ub58rxl1v8strnov0rl0cms5t439amm5tc6mgl1v13ygvfw13m',
                application: 'wxlarbt62p63bw0t16ii9nkjp93us9joq1paoqps4g1tav61qf1k6ujdndol',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'w6pahx04oz9wpxkfxbnjxvsvvnqq3vzx2fn3y8z5',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'jw3yrvwse842l2vy7dm8is21r6vya9jul541qpxxntlhmznoe2',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'ndw47kzuex7xvtf7naw2',
                version: 'ls9w6u2x2wx4wvdcojsa',
                scenario: 'psdkxrx9or4nwkpo46r0jt6usq80jrifbw6c66ib3yvk038jb9ew0fyy8ukt',
                party: '6e4u33sgujxjaaxch1e3iy3q5xow7uoxnhf47w13sd56nmh7bkd65rvrmartda58w13u0b6s87ekidfwakejajr3145ng0cdqahbyzg1r51891ffk9nsmfm13iodp1g33wobf42nxf00nrffxc9dsqt78qr6auak',
                component: 'qhsyuvggehpa3rxh8aguu72rdutc68a734u0ymdwdc9thewvo2m837di4h4ulllrsth9s2y5zmgn5nqxzps7b4wfk58tcczd6wrplej0ec0j8n9vy1wk495l430351e09nh8aunoxshew9l0tisga61kk3x2hi45',
                interfaceName: '6x6ro4bjx8h669b6q3zu687m5j1j8w7bcv12ysrdfe3okx56vxkbv91ay6t0isc4ay55jniqlkvag7subk6dk1as6pth7kzu807lol3ar95ky9ul74p9xhmw99dtk2xanluvl4n5m0xgeq056ywzzkmiom5lmm28',
                
                iflowName: 'tq5s3z48ajyi4kpphxm2qg80qnrup89o68mndcbeekonx8rwqrq6hib85kmd2af3rcent10j9zncb4i7bpbnpluxzront6floee64197zpscidye1ev3702zc7bvx2echocam6iu8jgm5xjmltnlp5gnd85wmlcc',
                responsibleUserAccount: 'drm3iworelmkozshqjmc',
                lastChangeUserAccount: 'vcqepqz609suf0svxo88',
                lastChangedAt: '2020-08-31 05:59:21',
                folderPath: 'mrfuvp94e8meffwm7jtxdz3gpv1fjqyf2fefigq2xgcvpo1wm1ztmmy67oqp7uaxymhea9yc8lgd6xdkplz8t3d37md3g6pp10nv9rclmh48cnhm2wkung3scozkxevv9sjkn092wybi4ywhsg01lv86oi5gfsz9kepdjj1wxc444valrusbxgc8rwpki9jkkmvt9wbibrsqu8nrec3mp8463zirk795bjimy18xd7x2vchxx15r2i4o9jbnyd1',
                description: 'cu1vyvnx77elnnhvu5x2psjovupc0tgkqual6iil0e4ajpjl0vzy4bgbw00lc6cn4yqeu45knb6xk7zdzxdu2ojkwiwodjm49toxo97e45cl8py8keg8run8kvnvrfx4gw0v3in50gqnny8e7p48jx9llqhd3be8s2zvg7gofno12v8it455yid29ebycbu7falrleicussmwjhraa1q9p9yqmsmenqbk9xg55rmim3nemfjy9sebo2wjc7u5ac',
                application: 'zz7vxqas17ixn0iq61jt0qxotd1xpwu2bnosg19tbtpn2hnk46r9e238fa42',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3iaqdcfbyj23hjc7vgg7tdkztfvg17xofy0pw',
                hash: 'lvuxw5ll8vk40gmpmzqs7p22p01oo796lmd5myd8',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: '5o3pob868b01n51v4545geg5alc7b9c9vcoe6gy13sk4zhphtx',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'bth7ww4fa5nywnpnwzuw',
                version: 'jginkm7olhvexaecbeg8',
                scenario: '2i0l5cjga9uxnh28np8d2vihn4vob09wbiek9tpu89jevptfns9spfxdiamc',
                party: 'p5g4k7byv0ye2xytuam7uxcrv24exs9qzh2i3k8we4gbfivy350z6k1kzkiisplg1jgwqz9m1dzdyh7j4w6ztqj8sp0e6kzux8fiyuodlzn0b8mxpjkcaoi550a12ajl9djp0n48kracd4i2y7ed1ckruv2qpmlt',
                component: 'xrfpmwrc6fosjmxxl1k7e2mi74rrsvl8zhlev3g1vr1cfhjuj45qsfq3sf49589ron2afqijspjv4ci9g1co2iwnl43rum9rq8ddp4pupwbc1qcgzxu20tkumusdgwqc7rdb5gkl1vfy00eb7f73mkggmudssw6f',
                interfaceName: 'lo41dazwphh2zyibgxhieunowbwq8c70yzhr01995x6ph0y8m1yows1v1u8aynjm1j7tjdsdf2u1kk4oomv2mehgov4pq021830yry5q5lkijqr8qi7jeaptyrcsgps7g0gnbar3cwhewdpxw4q3hple5linujab',
                interfaceNamespace: 'abshmfahp85jlayfnf08fistigkqytblkc0dgms7d0wlxbja37yxdyyahcbrj0r5zh9arp7cm3iy89qm63rnxruvo8gz9a9bbzn4090st4x21mm357cpd53lrkn7hg5epikmo0396vf6cvf7q2hf519llbj1pv5s',
                iflowName: 'xc6tzswtxlbnxpw0ai1jm6gdu11h1kpanp22tuxc5y4537vxn3k61rft90eensblq4vwyn4kujzef7cy1k06jog66eme7yjazgybgp7oqm4llossao4spkkk5y33ct5krzsex8miu6ciw5h0tdz49y09qvq3qtjy',
                responsibleUserAccount: 'd8kztg9mwa5udct23wm3',
                lastChangeUserAccount: '1yc6bepz463z9mok3e75',
                lastChangedAt: '2020-08-31 12:39:37',
                folderPath: 'd6i5qh6ovetbvomiq0sgohrhk8geiv9orhctyra6r10l1bwt7oc883dfbnp93pbw81pqdba00xt3s7vbelzgt63yh22qgnz8l1nb5flzqn1yqodejhrg7q756nh03u12qlmgjor8y9hihrgmgj4i90ag0wi5vjlwgxq45nwdvutguqkgzi0xv02lzhs4jqs6yx63wsma470kaz6zoazgkzpm704c1h26gmmwlzesmzacsfmt2012zapauqxvudn',
                description: 'q2zqgs1cqu5qc69jwwtygbmhd21lpm970fxa3mv5k8848ux6hokfb14z1u4a6lw5f727m3ndq7fev4gyt41m4vk4y1tz36nf0sexxw1cq83dga7eaqfwb219ysk542h3iazy33wik71yaktchka4nrhot1zndu21qlt4u5otd3j2intwg6gt8scl9dgpw3ljqm82z3ocf7gd893bggwspzg6xh38tbvrbpj3iu1bym76um8a3kdndd6j3kor4vl',
                application: 'rlumtmgfb4qlty6o9ss9amezjhycm4d3i4w0efm2s47a2xbcu77n6t7iqact',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'x4aci9fuz44lpxw46jozzmnl7m7ywyv6wqflkwmw5',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'x6v2y54trj57f9pfo6niq76t9cb5im4nk5y9j9b6kx5f70soyv',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'xe77024knu87ejszd5f9',
                version: 'lctz4yvfluijo04wo889',
                scenario: 'gbdywjvh6m822da541q1fmsmzt2gfy1by0dz2vel1rwabco7rivsehpnkw8g',
                party: 'vrldnho22nwei6gvmi5r4hwvd9pmx0s4ljhvatcpqel2kukb0qri312yk5ixobiabterz09sn4fxy6m200jdwy1k4pr86pvny2t2ia8ury0w6ttjrhzsq6tr7vkef4udh1wr2gmykt5xjir3apyu1vj4tyhbaddt',
                component: 'jnqp3xi8m4xeyy1r1v87zjcns9gcha408u0cjomkvs6vuxyjroos1hxkz7xgr9mc52rn343zkonehnzuhhflhsx2ma905t6d2qhqg4trb5i3ln9xal2dwbdapro2955jck1j8doekzzy91q0ffkr7ushqbuyb13w',
                interfaceName: 'zqpky2ourkohr8mvryog1pbc7qa1yjl255dl98366ys98n8s02wxfcvs4p3huik914vp0ygd7423izofoo7gjfb8h8w0kl8e4er8qfgtpkaqkbw8h06o48y7dxtnurta671g6ek7vpd9pywnrojioepeiu9dk0x8',
                interfaceNamespace: 'uaikbm5z06x2gwu59qbnwk9m7ue3owukt7gost739icijno5ham180v8yvly5cr00ysxyus4glxbmkynez9cx2r1qdszrkt19vvj6miu20nw5q8paeeoljrgcut2gz5i8597764u5jk90mq6ksnv9jm0lznf4ia2',
                iflowName: 'pxdomfj56ie4l451qodowqxhn4xc1ajws55msnnw9xjci31f1hx4cu8wx5y1oveqjjk55hqookgx2g06lmcsf72olbu1ls6n14wwi2ioz0up9yn0gla6043zqatdd85mcr2348zcndictvjzfq5ix2736inre1pa',
                responsibleUserAccount: '6sfp4yn1jirgb2er8svn',
                lastChangeUserAccount: 'z1tgtlvbsdxb8gqt29s4',
                lastChangedAt: '2020-08-30 17:56:06',
                folderPath: '6jp5qxeerbc0yv9fkwsfb676z6rabwlfd5umu2ai1fksn0dbpox8rjcrboxdf0z2mgxspu83knk0s9km1ce6peki3ovxa03af302182e51jtmudwfxuzybvohhs57v9u94ryuph8a9sldux1wut9rlamszjmffx7nsvykkglwnk7p3ux5qxzuxh3ce7v9w2hj24g31zfm0e1eyr2tqzvq35nk4q44cdg670h1txcvb50rz92g6d5at0rz7v6elp',
                description: 'r25vzjin0lgqw6aiwy3g7z91r56mviantfoxv4fsbsczgm7kd1tnsnouc317usu30hiqdvgqvdfh5mqz13an9dn4daeyx4oswg2at3y1lruugopf9bi07uszfcgh69mi00h99sr5bcvphk3908sd729q73uqan0g25j9h6tyk5zcsg3ed2drp4uhv260v43waajhr0zqlw8h83r5cn345vk83wri5ju9j477sk94nafvjb1bneskvmtvjjsx1r7',
                application: 'yvxonslfr89zp5u9f5e0bmksd0rlq82k9z2986by77uak9cya7o8300munrw',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'qnt7wrkebl8wg7zu62u4t5tyqyix3hrajasx6icv',
                tenantId: 'vrfo0wmw647zcoazf67knz5cnbegllwmzpqw6',
                tenantCode: 'eut3co2ow5esd7bj7xb0uq1srfjpwkoaxvaoc7gx5gwt6568iw',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'r9jmnpfcf0tsug7816i0',
                version: 'ek2k99vs2xcbej7avt82',
                scenario: '3yfmr4g2c0uq8q5xwmlfa5nqqzjvj7ww0cyi7z30ooxnehg9w0ksc2zngsw0',
                party: 'il4aokp8au7aekzh6ndqaopjooit5s9ibcwfpnyz2yl917yfl6wofwegdokionkx56wy5zn5xdd5nw2oyi72z8abutf21cb7xiefrls2xafbehe6m2nllenjsoiigwlggqm121j9fzh5w7b3l5mwzwkg4ifbfgvi',
                component: 'hfl8aiffry8v5icwi9m6327xx4cm9404fc4tir22py5lonbj9601fwx81gf8nsjqf9eb3eluyizgmixlznwutqbu0i6770mcbnuj1mh1cqbbruqrwt81pow0041vqyolt5n5qzpk82b0fgf78i5w4idvip1abzz5',
                interfaceName: 'anvo7qdfhpuwzevkb7p9fmzw0e9o3k6mn21rokf024l359t2m72aqgxbar599jv4qwc42ecgnhy9cfnstuf9e7d39my23oagyxbe5cnecnibq6dtjda3zq1iwdat4edp2aqr71bqglfdvsp9mctsnybpop22ptbb',
                interfaceNamespace: 'dw51mukvnhkeyxmbgtbvwh6tgygfees00b36azs6x2ds587egwlio0ousbaa3hoi8tkzvgydoybwp2az6z79446wk8fqyaj7102x6thwidm89dmnn706vipmgxrdawleougjhg420wijuo2yvjdhplnbbudpnika',
                iflowName: 'ag9i6oqsj23uw99swf0e5pdpfj4z5xgjm016yy3g0198fe21nkxzdr5lp3bq02dlv3dgq9s6sfdv22izdtgvfy6tdwkmyei2o2h9wjn5jgp63ax4rm3bkfp90uvxlicz5f26k60kfus527h09u7outy0d57ml4ho',
                responsibleUserAccount: 'cvt54kcfvrb5zdtmcy6t',
                lastChangeUserAccount: 'ncf7dv9u6psqq70durzb',
                lastChangedAt: '2020-08-31 01:49:47',
                folderPath: 'ilh1cag4crzu1jr8h6sbw1got3r0r2ture9yklp7p0e5lfp6ypweadivjcscaoxgzuztvr1j3rti5vcmjw2f0n2p0bz0pq6hrq7hqckpym6en88t3k7t1ojp3yzlj6ih6cz0ymherffh32p76ewptfe6apaqx2nrgc9uvnuymjfsqeciwm4dy8tj29i2ww3c21nbam7p9jzzs3da1uu10b356d3ctvyei3jdcsbibuvtcikdaiiwqh3ewyfszhf',
                description: 'losd3r1ps29im4t30ezd9mgvk9092xiu689tk1626iv01p7c8628higedfgvfzbjtci1r9cuwtw9529j445q25jge3c8622o7gwqfzviez65z8ec128nmwfsel6yv0ow0k5dah4e7jdj7l7gbbg0jw2rznhjkek2z3gzfirq1dqa9vccsqtmt1sqjsa59vkzd5mo3du76y2zbz1orggl0p8313557jfqebr3gyevasmfhz9skb1jnmr733s53cu',
                application: 'has0hsvjugltt2f1pwz4aqmocg03bcuznoo65oywrl2clwefg9n9e4dxbgds',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: '4g763d9kvjulag6jyg4tj5cmxyh1s855q3ha6yl0',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: '8y9fexg2j3zlomcp7q0o08iz5dpkmojb4rqr7jgu7edwnt0ns8',
                systemId: '5mvlzvcqtgnifxfavn9759fnubgyhm84a9khg',
                systemName: '7d85twryrixxcmccoiim',
                version: 'kd9999wy6hr0epe6jgit',
                scenario: 'jeqd4w3dnyf2in4aygv1ctc9vpvhw4bwgfgk082etor1sqf3ygruqkjv29hh',
                party: 'iyjh36tuhfwfjlrds9na8qhzi7gq3iyk4a0suzu7endboll7d4q2vu4caj3cpaezavwjca3og1r48p7mhbnfrygeqjq0bpyqzey1m0dkilh6hpdxf23zyhmjdpn2ar3j69913f7ykwpyv8gce9xwtl1ukdotimt5',
                component: '4u64qe2gzb4sgknhruwiafnnkjd6iseww4ljuesd619kq383woow3nlox3jqmjd9ocrpfyz4pg80m3bjp22q6mnwbvxozjviye7m5nqmkclq986wo7la7q8yi797o4y93pqc7kmzkp5bbh40mh6nj7e75n2nqvny',
                interfaceName: 'xcc27x54qoiarz5y772ntoqkxamojmna1rs6eqrhjwnomhvmr8g8bia9bjraw7tdurp6l5lrohh5wnbybd5dc1ipz8kzv24f0c0iby47675j35ptdi7ryj0xif38e7esj94zrlz88kr64qf78s724pmjworw86f2',
                interfaceNamespace: 'u24t5g291yh0rkz9k26uxyq82720y04buysbgqey8r2slta9tef1ixfaqv5lgdt36g0fumau4wcay2bltpc0qg50zks8oqr89igm97msw2bd74wzthr10z8kgwr0u7l1x95t2hlf4es4g0ap8fk27u5a0dy075ck',
                iflowName: 'uv5c16kcci9kmpqd2pnj77lsaewnfwoo3870o5a7rtv91xf5gfsjz7nz5ao4bbgrtjvx7ahv36calva40b1olwwbdt5mf7ubszajakh3qfd82lhc561prqshtvmjmrjcbcz6jdsp6k08fx0hhi5l2wfzn3plvrpt',
                responsibleUserAccount: 'l65byd79v5g4v8mxtk1d',
                lastChangeUserAccount: 'tby5poaurg8ld8r3xkma',
                lastChangedAt: '2020-08-31 06:59:52',
                folderPath: 'a90vv9v2xhmt4g69vxikaqd69gmkgfb2tnomxzzt0aoxqc69tb3re5p7btxa2yr2q6k5db3noaekghsj9fdazlhcxl7ejvo3sd2ufqlt3yafuratclftwrudybd7dpn1uq3mcn8hphia54efyjmqvitw6syqu1krmqwdw0ic2ykrnikp4qok0rx1oqgs6bnrmkt3xuxdszdhessw65xvb8nit7qrem12pllvmgg4shmm0rfkgcpkfcb2pqmsv0b',
                description: '6glwu1fvdeyd3z59dwzh6a7gl8nat8qcevaq30ob3rss03ie1zfrne794qdot5dmj7o9ljciy00q7ay1dlx62ld6wwoc4mi3cgdoyiacntucj8ya692si8srqqligr2fb856pxyptnt9q87sgum9c4r6rlcsx52hh3xuxwujulaz2y579b9jqwbp8ubv4r52jkkgisiv4qsdob146id14d2006cnwb6hmbo3o9hpbhdbjomhkhonagzp4kkluwv',
                application: 'am4y9uu1tni29yda3ikx5f2barrav44i4sdonsu7e926v652w9jj7uqs1ofz',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'nrwkvuhucm0o5x9a58irrcv8ji6aei0uzwkrxxfk',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: '3gx2d5p33yi8mrli7nlyd6xqsp9k0j8t9s6ihzy4b0z4sgehaz',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: '0dz3rbfj20wug3to0l1q',
                version: 'z4p3xpmi1fy3tqm8o7gb',
                scenario: 'bu1ii04ya2bsx0evt3qryocvckqenyntkjcklelwr0iiqawu2z6fxsfvycy2',
                party: 'yfnlnz85tlpotfoheeu0eh57gv2113i7zouhty9y1o1dw8nlpozwh5ieo4yxppq3d9wnlluxknl8ilyk0y12zrlvwoqusddov0rshemhrw53plmwwhnsxrnrukavr6knawhf1z1tima6b3ocu93yheitlcy1mcm5',
                component: 's9s2meugr5m3yv8xk5oaxcruggqrtt8iv28asxlw3pin7kji0lr9yz7g145p3r4im5pk0l8cbtd4u96igs5me4qwe2c901nkvr8q03gubb9obxmqsmrwjghr2vi09iqrsxpy7at6dodh6zhjz0g03vsbiakpns37',
                interfaceName: 'iu0hd39v4bdkdwasdo10ac50icdsbc01jych6l7cqt0d9naq8d679yvtbtt1tpun5jnatbpi10crqrtnlzv3e4emmvjf2s8wg8z66a23msg8nih5nu5zdyj2ehtxd7t1ix7mjxnn0ti87aue5xibymt6u4ami7j0',
                interfaceNamespace: 'uidet6cscc457k0udloazu17pbdq35g5jjtkkh4le8419echatug4lvnciu7ebxz6vp9tjfswzxwcnmahdg8vj18us4pssoejw1uxq7ztw930whklid0sqdarqvi47i1yfu9y2e6qabwc0yc4wqb2ga3xsq3npiq',
                iflowName: 'q7inpa0ovkznero31hpro1l7oiguhy5z7jkxkr9cwwp75c6y3tz0j81bqekg0srtbeiyc6zytf7sm10zi0jykid3r0y336sax9h2swtixcmqnln3eir6gc3pat5etlc0mod3ey38j7972sgtg4cibrtimd82mm9e',
                responsibleUserAccount: 'ml1xcwjwf27dbkbxiyes',
                lastChangeUserAccount: '22gzcofbhw7x5tyj52jn',
                lastChangedAt: '2020-08-30 19:40:05',
                folderPath: 'ki4e6x7c6oslb33xik9agk5fujb7so6gkqbiuou4p3riz68r02o1zxwte28dr009heade0e8ubhn1pn7caxtopl4esd8cvpggzcc9xkkp2adtt590u4s2gbk2z13i21qsvpy434uzge6wlb0xwr6asgfx9jq99cu94vsd1ylqjg7xym2sk36ybnq0547itp6r6tv9d20gqhu47hfndn99ugv0x7q33fz1oh7m6pgh5rnjbyr69o3mvu1jy0v3e3',
                description: '3062100sh3skoo4546lsltcmfhr20pd1nn89pkd27tcljeuvyfmrdmkzsctezjvqb9a48ltaz2749lvr232iic1wcijij448mgjfqwem10k5mh8aheajckaikjisurkpw7i3r0l1ypsq7jmqfunazxqj6t3w4gsju6cwsueendkmfb5wk9vnq3jftjwu8japx1ot3szpulkl5kh0p6nhzbzoliib2h5i86ovcpjpf7k5hnp5wdtcbk4jbuu3udk',
                application: 'k2ngudhf4sbldgzxjwp2rimt6mtvjr69yb75vn3ubv3q8j4brkgpbap0p15g',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'cphjypzg6ehzh60enlxns3y2a75o1joh5nwq4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'yq6akmbynmfb4hmoz97epzxvp3253womxqkrnw97',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'xk0iwm4tg6lohr0nu110bi02j0hidbfmzkvrsbg9chwxm2w3x9s',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: '0cpa8k7x6btzcvbpwa40',
                version: 'mmhur2j3mfka134qdzxx',
                scenario: '60xz7jmcggj2qz2b4vlx2u5ddfpbkxu3t58z36trz1w3wa0oi2nabclezhev',
                party: 'a7ixhwkhzt8gpcsbb3ljxcek1da6j75zyzokdq0yhusgcwwo3fbyesp0k85rhsy69uqkjk38knblr1zh9tw2d3iha0ipuzr7eq47lf8w4ejh2dihxrzir2oqrk7mht6pitvj2o7apnqmd8we6gzshrsazz6ndfc2',
                component: '1zzwe57r570101oc404mg5wx0vh94xch73pbbf2erezhuunicy5stwkq0ntltquem84tjx8xjtstswxndtnlorx0ogsd5x5r15pt9k6lwoa8tde0lmxm1lsi1ew8y3rbm6982bp8qma3scyst3arrk34sillr15l',
                interfaceName: '72vduytixdxqm6lj7nt8yy7n06ac07sh0bls6yyv3xrg28p94g311io2iaok75qizvdbubtqkjxvgv2dw2pyefxy0gthj1bfof575f389mu35bqazqn7tuujlrg881nyer7wxmo95owxx2vb7jcr9kx1n5hnsayo',
                interfaceNamespace: 'j4y32cx4ou2ho68zkmkeuzubt7x2og9j67vqj8bm20nh1bufm3yjiro0robg9v1mjakml47bdvyk1uqpbz3r51kqc4m0ja49bs3t6lnse22ivuzoko4lbjicdgkufiz51ukjj3vxgdm431po9he68tgp8buoz7yp',
                iflowName: 'pha4edfkzkjfcnte3fbs8q7kuqd50ytoadnc012bxn45xisuypijz6g6suzrd9voxnzzymzx9hxmz0ilvpkno6yf8ew9tqiobyh86vkvemufjoji1piwntgu69k9s05wdro9f8r4hk7cosjvl368q25870d7tbbe',
                responsibleUserAccount: 'hcaa9wmsb093uzse4tda',
                lastChangeUserAccount: 'gn3bt3gkadq1uu93zjz7',
                lastChangedAt: '2020-08-31 02:52:02',
                folderPath: 'yg092g63ltqfhqnuopd8ay8ba9kyktrye2wj8nnugtv6if0ocvd8rzjj5o5iuz476inxm7uidzfj59szikbkx6d7anxdo3xxnwoei04wvkrm6gy0ff2wg4g1357u630b31uo611fbszssxohl2xmvvinb8ux0tmhfbf29edqrthmc8h3pv0drmc2ta2xt2vtavvgak642l350njt69pqcg7ziakdrveti9p08o9xyiyp72quzsaikx8z7anklu0',
                description: '4csbs1fdl794p8ezvycto6ypw3jrf2adtyx6ewgweggkjazfm18hvhotazrv9494h2ckv9i8wjb07odku69oq6ym3jllvnyqsshy85cwi0u923n4gvga5a5lps5o5pu0e6o4qjpb4bk04a7v1p7kodrnyijjabm0e2q3lhbrostlqkbg8ng13ozcmnsd74zcmulyonhpz3hwo8abjikqklhkexmh9qqju4vgwfzqxa7y15phk6qh9rkdzpdb9ri',
                application: 'mqiuppdwkp7jtewabb7hvmx64lnhul8rawut5zo91p0r19e0i2imivnvgli0',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: '8vsmzlbzq4fuqgajzoyggufb747vxf9rirt6tjxz',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'lhfaud36ynig3vmgzry0vieut3qeo5ojch4ra7yu6wr1byspyu',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'y1ewicv4pabzw5zr225sr',
                version: 'ljtmv7886sa4ginm55f3',
                scenario: 'btwet8rrfqezz144rbu80rd8prtwis7c8vpx0mldpm5l9wkqw11f8l9ti5e3',
                party: 'jx6aydlhhyd8hmd9w6ag9y2yhmu7nfwcz02w2p2etoepkd26n3ihgvnskmfud2xs9sgabojtu6cveweehn729oduesqtey4hsaxujr4l1krj9zyfw27fxldnbjv1s161g0xihyq7l4n9l2rpqcnds29q65zhi7jz',
                component: 'aeexuw6de9ov55w4hrq9l2egldqfsvy0mfaalrp694tmnr11v9d8ugrjt63tcrw2dxwme3teskcegmcm1lxdksb6y661hrrtdwux6t8zegc8zclcfr9uy9oobpgxmmtu0xzpziigc0p9l1lo73qmk4p2j0yehg5s',
                interfaceName: '1isoengxcetla821vv4eg8h37oukcfd6k5wvxzkdtddyvvm9v2mlhl6kiltizexh45o7q0yq8inv73pm9qad7t46dgwf9280paizb70ezpt29qbh2dstcsgpnkvp5j9iqfls60kw43brxsu4x1ks35cqb2szdn05',
                interfaceNamespace: '2jypx4mf23gdsqr60hr430inx431gp13hdpd5v5zyeoshhe4u00wnpuefhzrovyqemgw4y12pktp9vub4dmp48uaq63bgfinifvouta51x7lyvxzl90tuvflho2dde6cpr79d3hq2h413vuy07zxkgg72fxt22p5',
                iflowName: 'kgqbzlfnsmmkxnies6gqo1tbf93i9ghnlrhmt40c63g0v4uc44sn5jl485ekicmgcb9xpxkrmw3wd4p0ibmbsgz2lqi5qw8oi3dkgx8mujwqa6uw7t6q4cr1gw002zvejgf9nfpfz27s65keok241asjyvs1anhx',
                responsibleUserAccount: 'e1heh38vl4ow2gfdpr99',
                lastChangeUserAccount: 'e3oerm1vmsguefehbs01',
                lastChangedAt: '2020-08-31 05:34:39',
                folderPath: 'uj6aljjzkyikczu6w5xnl89z6q81k0077so8t7b8ccyuteb5el8lp8bwfsratnl630kfv1gxy4ybqa2xrqwxrrivlc5gwdsj06wwa7q92ymjjuyuixmnn8zt1e6teu3kunwt77x8dui4n5pklonot3mz6gaptwn4a3u3yt6wd9s3hpjp3t0s53zpa614iomk85ez19v2y4d9oigd5mq0m45uga8muakn5fmyfytc0qpr1h6grv475cto5i0vght',
                description: '26lsjiv58kngdoavtwrpxeoydm2p4c8f4j2jlnac6nctktu15jzmr9w0qkcaqtgjqe0x3447lbal4y2an5t9e8zgdf7es2p4k9djmeha4vhw8t98jy01ump39d5ec96re4btz78jqzqeszl73jsuz6x83cc2jox4gm0shwciyu5a1rjucg0iizyzzy819bd0ebyznzz5uo86vz7cz4jgs72cb1xa7fuegvz8ctgjacq18ndu9qs4m0l1jve9dau',
                application: '8lv8h39zaj1r3a3iftzcoqyngbsh3ox2ypfxxkfvj7hr8unoem35jorrqtah',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'cny7bzcngnojsuvlcopeug57ryzn4laz96srsaj4',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'lt633cakmmhv47b3y4q2c969umv21qlguru9gh5jp0ssird3vm',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'kdfkj9hhje5t3lphs7j0',
                version: 'pbhbqdlwpijjy31enly6c',
                scenario: 'l5vpli1hxclxz0vokhhsvecqwy0s8mvj915sqq80k9wis3nrgdm31hbfc6bu',
                party: 't5zoy07jp7gv1gw4kkvocdrs2qnbjrp23w3s8xifz2vkbswo9fvhkjrcripayamnjdtjn76x7mwsgzcwt2190yxoh48s39mq3mplg4whaq9l9i1ssggp9gjklcqp6cda4kjpzr6pgfdi9y07og4fxeicdxczrxiz',
                component: 'c6n121ruro1vfybu90329lstkmfigk3t00nez1oukmdmou99lnpuk175thftppjbgazpphfr7sny11hsome953ngxydu5c2wymoa9sdmyh7896gdsdmw9a01u0sn1ko88kqgm4re1zy3e1b59ecz6leii4ehzmmw',
                interfaceName: 'zgrarh41dngwcpmk495yi68p884cb562qlrjmdzjiamfwaihfnpewwsbnx7fk7gpgezi3w7jhpmb9h3d9h42qmlfhw43uwxnthtenggx4q07eu007qtttifl3ofvqzp9khdhpw1xmjxlyzros1h06hfqpxgrj332',
                interfaceNamespace: '6binpp0wzzqdoxbdiydbfs2yrmk3g63uoch7d6pq1qok9z04thim98cz42utruznm3nj72ipgzh9xaf2wqqd2f8qmxdyzv9146ncl4tocfoyau83pe8ptcfgy40recly1zw4jo534107ay3ej0p7dw3io6fhus5b',
                iflowName: 'wwnhe5c6nd6nbcyclcw5hm69nkn58i42clyxjcmpd7rw2ucpmh09fvrz63844jivsnm5zo0k6v2hrg6h98nlapsu7bjld4vgnpwbc5qy75idxkk7n8hj5xizq6nejwgbm6d2q739md793u9lneureltvdetxs5de',
                responsibleUserAccount: 'rfh4j46c2y4peknavaqy',
                lastChangeUserAccount: '119occcfqi3jm383c2wm',
                lastChangedAt: '2020-08-31 08:24:09',
                folderPath: 'vztj7i82swubrggaycj6qdnti2ocyxwh03sqkxjr95w8an6s1zrfqjmn3glwl3wflbey28bouizcv7c5mer64m30bvmbwmhqmqa67z5d2v3k7jou3cdbdyhc9mesxtyqpqfi57gvbh76thazbyedmqpibo2vxt56av9sp4mfjcqno7eph31uagi71fau58dz95pembsbxpaakdjfj0wzxvspkqy9zsk9s8ydjj41z4agmfyqif30pxyjve7s400',
                description: 'zyyt8dtfuclynwdpg28vw9c83gz1jys9emq52x8wx67p1xpzt3ezuwihwcseaxlvmplatse96u206yqorwm3rm06vben6x6jbu8q8lus9ejnvhe6m5dcheqf05xr6qptaa3bgrxd7bt2s3t1usynpr82l00f4jw1f293wkzneqwclzdgxk82rzf4d7iv58kfkyf0xnhm4tux5x589avmkbhficva689dj3snjkpho69fsq65rii3mky04la2ecr',
                application: 'd8brhgw5ifikicfynokjujnw64fiwex7v9p3r5l25qcbnoikesiqvkjd5w61',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'wt63vo6jnqukce2142njcrz4q3zbvp5oug43k69p',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'wnkox2omht5uvn1xwo388kmb2v5lgcbt4qymvoi6q62bqq3jew',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'vtwfhbd8y4jhou21t1bo',
                version: 'thrnku4nsaa375hers3f',
                scenario: 't4d1ep2129yn1e1dn36avf8n1brkz4kez3x8m6krbodh608ycw89inmwu1iml',
                party: 'i8fz0vr3aknxvn3di1hgcbesum1ctwpua010evp24nrs6am9qawwam0eqpac0xdwckje21ivfa7llmjp2q6mulicnzhftn17u6rroi07nsmuc3r39k92rtvgemo20ongbn9fv2dbx1mzt7o538dd91zrljvlwgtz',
                component: 'lzcha0ug81a79lv9vd49dbl27t6vj58wplbmdynr4iebz0irunt0u9jcai0bhr2xnsy0l8nltbdzwpim9is523i8bvtst1vd016cjy8lwj3b0a6cafizu4mvhgdui4nn9ggyhuk6cpq58fro2acyqq4zv787cz1h',
                interfaceName: 'ojj0x5almg8dzzim520dmz6y7xefgth9e59v8yralf1hwcdg2srxrz18639kvw77lfcbhk7bi6wb9vuojx89jie9ox2ahoeuedgvxcfp0x20jjf6nof8fk2p4chwrtkgzhg7mxni4px6fy9p1z2e3tjpn092f04b',
                interfaceNamespace: 'bnmnds0ig48glnco44suo1pll1hkp47gq5989hllujreus7bm3nt1m4826ylfxt95270d79y3u8brlwqyhxsq0ebmnzqzrftbvqaeywje1nf3bpc7h42d5ykh6b7dkqus9hzdd2jfjehvxqtazf6bssvnmbblyyg',
                iflowName: 'vv8tyyg89cw0nv76r2vd9o24obvmeg701mumfzxn8s6awysms29158dcozbut3k474jlfkc904am1rofd5h9tj8og1jzxx09zsro2jbg09rd5j429r5ea38orfj9zep908d53adn6nk5lvavaenmksnbcqibqrj6',
                responsibleUserAccount: 'm8j4tasddatx4m38vzct',
                lastChangeUserAccount: '2lnckdrqkycdqfkswfrq',
                lastChangedAt: '2020-08-31 01:25:13',
                folderPath: 'ecr7shm79vcu2kq53rb48m9ofyi6nfro4am8xy5w62r4efx7nq7x6kvgc1xm48ddt7h99v43fj8kasy55zva7qliyo9c7exdydyswys7y3krippqg61db5fr9u7t8z8om289ev5uow5tocmf28zz5iuujyxx2c1ogcnnmmrn91rwl3662rnxp75q9tk4yexwffnhebyv8yj4wop9gvufrbjfgcnt3hwpw92jkjpv83r8mgsgo8lkm69tpti4mq7',
                description: 't4pk97evzklbcceqh54t01fjwptgmvcxr6vmners1qhmy3wulpi0s64ewa4ppnyixmadrjbnc1vamgp25x0wutpb7iuohix44v2fbklxnx266v100e0soo15eftkhtaa3u6re2ce8wztxvmaoa25fopy28gztiygrv919iidf8rtar5w263m88a85njd0iax9454cw0auw6sohqfld2qdo3whn6hlf5yp1gnatb4kpqz5nrr794snk81ju1jf7l',
                application: '1s4q7el1a0882lqy7jre8xiweid070e31pyp64nsprr328z64rezwrk2xj9u',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: '3dw15srytad3t3006mdcl2kspspxcxn52gxhha0e',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'pzltogqyrkia6j8wx5q76jhlmuqj40xcobgvzy9ctynflcybfh',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'cqr3a4mzq6yy85kncmme',
                version: 'yz63a86j2turi9flkh4d',
                scenario: 'zyr6hprgltnzqidvipyjs4wm6oq2o8d8accp8cz1vlysvsge04kt1p5co61b',
                party: 'mog230xysw8v7vn9lyanc7792oyof11jrenv3dcxvedcawswbax0wywec6bmb13pu42hgpo9lfn2jg6f01q81euodyn34vom1llgveckefwhnalmc9znsda8wsmgr376dttlqbal2gn29i9fex01bre24n81acf0r',
                component: 'xkwvs6rew0ltu4hhk49gwj2t0v9xio8da1dv94myemog9kxdfmxy1w38atpsmuy4fohmszvhhwtbv9723228nahv1cww636cli5sbmu4w0kn4iej2c9ox48nzmo9wha34eeb6undy18j6cgb9s5dgmbaoyholfsp',
                interfaceName: '4uaw4gyqbvpfrei7h1i4ki33v7yozuefrf5n2uchnax1gmf3sb5jdxr08xdaex69jurkng61igw1wv2kz5d6s8a4y017xfz42rc3scd5s95oj0u0xfx9di4rc6p9i61j18ft1vkwyniifa80hkuyeekh2j6937km',
                interfaceNamespace: 'kxud5axnl9pumc482ikm2oocy0dps4s6igcebiywvwriacdd8gz8h5vc7g04n9t14e5x2man2ve713qrgy5hmj9q3vvg4e3ww4jat8zytwa4yua7svpt5qe1mk2wt463k632z6n0w58vic9z5tl9qpepmjdxkqjt',
                iflowName: '0l03ayl7p3ho1qw7g8msjcmm2b1c5p3zjkz68wnsswr2hrcj9yaxu2u6gjrpsu21251dv6hv9mpwji0wvay5keuamvq2gj8matkdrs44d43zg1kd91lsetdzojqm4rlaslrg8yhdgri58kamw3otftoos9mgqesa',
                responsibleUserAccount: 'w9yuphmh1upshae89o2q',
                lastChangeUserAccount: '7gltxsiea8v03gbxcvjb',
                lastChangedAt: '2020-08-31 13:19:26',
                folderPath: 'jzrxql58doj90uzevqs86aaofsz8jscwggighfrprf4j99wj6wiyb06elvhq9syuc12dwazsnmloidp1ztjxyfhx5slszaogap8odsd3d57hqtcv541jd3oof1z8klg7rrtk46ymw9zk3jxwaiv6kxpgsso5gjawr108vd7h8gekh5ho329k0v8egwynw270wgwuw0fouxv6lzd5fjfyivkp0nxbsfo02mpjyib7hng54wzej9r6fvgdci1hl0z',
                description: 'v4ozggyian92aqre4glzgfjbi60gy89inzr60lb6pcr4egewmehhy58nlisbsbqp2nwwwc2ebhoor9s3pxhrbldjsnhjzvflbyxtsvhwvxq12bnny4d1qxtrfbo49th9xh5soaycedo5v4anjgnkpd4b4ia1g4pnohqryn1frtdu2qswaduy9fthxo6fdmlkpsn3nnsr201oa7p23d8azi5owwfj53oxir7lp5z3gjzj7wiuqly9lcd6wooxli9',
                application: 'hl9wpeyett7gj5yho1utismdwtozamwv0n4rb4lzh7punl8hcki932zrpyso',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'bprxq0akuidhgeatqhfbxk0v2opby29oqt76lkmi',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'f6v0yhdq7skqwv3w87kbvv0cz50hr06w1jo9e2sn7bssbv4dru',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'wl067v3eem07ilf69ngw',
                version: 'pebc8qrsgzr9chofejbb',
                scenario: 'izhdggxtaxedvglv5w8xaxsbpe4mne07q1luq33u61luy75izbeq0vskybwv',
                party: '0qnby75v5qp59qgf7cjxvrs99atcwhbf9rus4u0zdzfvvizo4exaz3sgb8ov1avh92gbf684fsbvvzcs2rqv1iopope8z2mzqjfjtj84sm2vqpeyb731j8xqhines94mnzfbq481h3t3morsqgfaqfisg8689wlc',
                component: 'ewajl9ybioshhpr7wlvl00mw1h184niix6riekri6xxvi97btm2ahiqypmnwlsyj0grvwbuephs4gd7pankvbosu18pjcfptxuom6wb2r8dr7ui1vvvtzl6z9o7zzy8964pcx6czvbkme8zprbaabp08z7l0sspxw',
                interfaceName: 'qat9r4x1xqub1d9l6xqsmg84kx56ot8qer86ymxdlltxiftouadpzrvktxbp5tpbx1bakksvxqyjqg8mmqladej4ft6jo5k9ccgvxx04mrpqr8p6a80twjhzfwvh96pah3prsj2ivd9rocmcxh116wuuzdophmx3',
                interfaceNamespace: 'ox5bex0s50divkpl4p0f6gb89spjujkqmpgllwyx8zud7v5tmrjuaqkaxtto39l9qbll0slf01a0tst4c0s75iinmc4yflqaiw6988f0eqgbjpd2keif5qhjyd2wh0tx9eowma30jbx9mut72yfsvdlfon09y3s0',
                iflowName: 'dufgm88bx2rm2wgix9ue9u77ctw1vqk1twjnd33iybrd1kc9le7fxsaczmuwh4pab1zzi9yw0fgynytn3sxtnwjiofjs03o18102ndcujmm5je53ij10kp30lo2l8i34t4gtf2sdn005gplsb5wxqh6h64jdxafj',
                responsibleUserAccount: 'syzjfxmlrpfqzc2zgo2m',
                lastChangeUserAccount: '8wq990qcejr8rkl0mskp',
                lastChangedAt: '2020-08-31 10:22:17',
                folderPath: 'yw1pj6jghfpl97ykv9v4gixbsk3lozs6wjq12hg377ab2hs7sjxx20bhd7nhdsskrfv0oce8f0dysh6wnushqd7gh6dl9nbdjlir3tvasp1h7j70tnsv4cx6m1qm2dfz46m1glspz2p6569pzv6bjonrwhtkwcjnv6i700box60u8i5zlfuumsz9unhdui1mkqi42pemdhyq26uwb851xfo1ef9tbnh4clu605puqnmmlh1d60abzj6qvrtoret',
                description: '5y2jg0o98vbtf4blrsv65gho3p2iuoeseqg2bwx0oxj1rvv7yz9aj3dt3wh5h0hyboczmzle9waehg0an6ivl4s4l6vuwzx1p9rhw8bhnmcx3mmd7pep7te6lr302wi9fjinbqphees5wvcm648q4p59nmbdmz602pcc7lvw8yqqftl1ozmvcapp95wmo0n6j3w8ozwlvnansxvvh2d4ycn4b09uog0alywocbt0x5efwgorsrocqrrqxgs3qdc',
                application: '1vgjqik15ke9y3xb5zp3clgh7za54iwg58cl2x84s4k2p1z9tvoxsbxi7t40',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'gwo6v388g2g7odwcst82s1ted7g4ioajd2kdjph5',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'tp88ye7oemwr6ppybn9qu3nboryr1wmj64jeth175wt65tk21r',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'oruf5ihop4qilyyvd8if',
                version: '4ha1kbouybs2etvvx4d8',
                scenario: 'tf0dnj3fip18pxknv4l11fyjiq0fwexk1lpfmdcgp8wvqrrea2blcy8w21c4',
                party: 's7fbtxh4pf7j6dqjyoucos93z0e7zlx6odoh6b0uhg2725e4u7l916v9hbd2bq77mx0snv7qlfgici22ppjxhpe6z5fivpeowc3i89bf3ma9lkzb5hjdw096azahnj0skbmj7qi8zi9v6m0xn53eilh1yuoizp7w',
                component: '00cf2h2depuhez1mfyjm71w5syhfr4gpm5ahfbjvd178wtyslr23ftkbdyp6r5bkaan1x15zv66pfqka94tnur0wf009hl5oqn58hd0r4h1835jszb2drpv9m0mp190h80ziqgub3butkkyj8tt68ek7kbgabhnt',
                interfaceName: 'ksyiz41a6ddatb9vo04nmnidhcia9xn2gqg093fzelwdnofihsxgrgivu7pxmaszdc1ghe8z3uk7xg3gr90qeqcg4q56klvhrrot7uztpjz36f8581r7lpomscq2xmdxp0wc87xiss4sh7fxb08kq82e0aqjw5vxv',
                interfaceNamespace: 'gmm2253tl1e0qsomildhip3dmvw61v0jjg6rij4atfm7ab2bnzru19tyt81bya4ji6p1lzx4i2kojzkkjuqqot7qfj3dr228i1qrb7f1lod5o68dowqwazis6so2i69hus9ir7w07kx3f9ccofkbr8dag1gm2igt',
                iflowName: 't7kn8bbm5vhk1qt3fjaaayyfagf04g15zz93tpnkfpb9fpdg62a4wcsno3erpi7zysxhfbtvbkq6jrd5f1a65gsbhyutl6na6mvipopgvm74frnjxlkpn25gyhs44rmgzakst7w3j61ulh61nyin8747bnqpe0eb',
                responsibleUserAccount: 'xzxw5687kovp1pyj52k8',
                lastChangeUserAccount: 'bxddzz2sj4e3nbejubxf',
                lastChangedAt: '2020-08-31 13:52:32',
                folderPath: '7b4uxkyqe14t8s2qxiwqz09rbfpe14yk4qgp2o9m6ttngtu7vkoq803kgpqoqcvgv1t7h8ooxp1v3mascsqqa7v1epm93b2b7rvddubaeg4qd60b4nvmqcypyrl125e3lwikgy14sxns3kmixvofm454ul69jwwwxo0lqgwv3zrkf8n0tw1kpnqxnqshzhiqga5carfyl3s0n32ry1itylj6ok1r3f73wzak0vol5kbdmcciz7e8j53bx7pjplp',
                description: '1oaeaqg3pm65h4hnbuqkycjqzom9064gufj61ixw35vvfqnuos1xtn2r6tt84uz4zfphdotasz4d1gccu6wucd4bs3qfdlnzijbryqfjv3m9w3hurb5oxeuhaahk1h2m13e3sipdacodmw05wjnr1tww8khtasw3w259l8szu2hepenghjgnsdx7ehm5cm90e0j130k2grf8d3ajxzt57dbspw4o3mhrr63426pvjpmp7uh7bhtgcbc6q1qs39j',
                application: 'a19sexoo32c3d8nqz29d9x4xk4cd2bbczt10lhm4n76cloknlpc1yxxdhp6m',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'onmetyz4l9e42yvo8dxnd4rfqi37hqqsri16a5u3',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'cqmnhqvekkpj3v9gf3se0d8dorfyfgv7oi2ym9dknslnkbgl8r',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'go4lcoq5tygdg3x80e6m',
                version: 'foycu5r3vafv22zou7sf',
                scenario: 'naftnj28cv874au6ze2qb2wn2qu0v3l0l97zagruzuy11lfaasce1eg5rqb6',
                party: 'nbydh2hpuecnyw7nuqy5so7zqkcag4vtgrywgm3y996nfa2in5snx6n1lv8rqkw0hbhgl05tcas7txj34391cxz1zm4su0d21iqtuurzwsz4svoaxmgbkedlvog3wzx2xcq9mtrfebp0jd18vwwj77klxsgvuo7q',
                component: 'sf93axuwh051fw01eux2wrr98dqqnqern1y00bhxm87ri3kvbx1ukj5ydjgqy9v6v7q3ut3t41qjvncyw6q9tjwo0hlbggk2u48s68q8h5ktq41xtdeztq8nijl6n3y0gl6n9065ufb04r8hxrot2s1au4w59bug',
                interfaceName: 'ppq79jgxwguvn08s6no9a5kzkqk27ae9iwiyeihgz39n11zc5izn1qggecbedrqknhmbs73rasubkfeii9t74v4e131p61rai0v5jjvgcsbg0xm6qtvmjjg5r1wlrahuas9a4mcblk0ctuw6bx5dwqf2qd006mm6',
                interfaceNamespace: 's24lvr78oqc9mq92ip20dtlnz70ie0zmibuu5ux6fdmw97o6li0se221yz4t0iy5laq0hvih6dqisz8v75cuyc4hzo5x2xp4v5wmkuxxezfla769267likew4g4xtcn58zki8eer5t6yifxktojact75bk9dwsl2c',
                iflowName: 'f4q79j878wmfh5zgs4mscgvw00k7dv3l7kqgkftxa25wxogvbpj5v3m8hw1skfu8h64dbqpj4y2dbhqnti09kymoxw0oa9d1j3m8pp83uv1yg63gly2u9iknwuhjaluwa9kg1tet83vk362bqupjbxv7mwix1tr1',
                responsibleUserAccount: 'svvdajhc5jgn2je9asyh',
                lastChangeUserAccount: '4lwv7j88f8aps2fxolmv',
                lastChangedAt: '2020-08-30 21:22:13',
                folderPath: 'igura8m2nwsl7m6rbygq43zdkq3lqzhrhijfen4s4ac8sygoku7yruhcugl9yak3x4fogd3etydhm7n63ps3b5vzubzhrtyi8q3dh9f24qvn8jzf9l3ypu9wpwl42jtbzqbr03s1fljuhyzlmvjugt1t4qjvgatvkl5acuuu7jjat4ejpmcgm9nk7nz8t8edtt402gfgrenk8m3wxvnlsnuj5nqgo7c6h7kijrukaaoc6j1rqas4i605st3av83',
                description: 'z67g2hu0d72fu1myk254jk1aqrjtgvmxdhvypmhxnv0dogs3hv2df981yvt13p6wsxtsjcqawu2gn43ttaky4fby32r1ldv16w13knc0z1a238wwh7duzqpq6p1scq479f1bkxq7trjiotjtqwm1gq0yc8s3aefb2xbl4cu5ond6n9x2vygc2gf4zvfjmzntfgx98ltjv175vrl8hdmu9n98a4adz2b3locj9n18z4nq3slet8kpq87bzkqlg0y',
                application: 'xv4jxls0njmwzq55lfye4lp3xgil40jnjdttj1duhk11f3gwxmkgopukoj1c',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'msbay4s12c1j4hdim4qarlax0mfl8pmuymoweqww',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'e9vg2xk96f690vr5vmhcpjrc9c3unskalwz40m03970dynw1z6',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'w5io7zppaqknnzikfi27',
                version: 'w3ieb6jedktdg9ldruve',
                scenario: 'he0pqwxcris2grb5sbsxsck7yiop552jaco82muv9l4ah6ih2e51uisva84i',
                party: 'hub9qrtxfyhdf4h9hpso4rr52i0006a7hty4kozb561blfqsyz4iihrbghpiiiyc154tqlu2ws1blgvfauictfptd9cqnm5qm95n5wtvqvmc2hgiz8a99npvotjqlmt2qu9ienfitikewvndtcoiwvbtssh0nl77',
                component: 'dygennrn3uc4yu1us2dr7xjdrxibl7uvsepcgwlqt7xs3zrbpwlo0j3bt0fsq86050oe8azvhjz1e08umxvxi3dtk0bmyatx3zi3fp43j0uf1rb4unrwdq1m9y8723i45wjxca00aasemubp9gaamywxyy1vjwma',
                interfaceName: 'chtuz8qrr02auriwkznahxio4ml9k9mu6ybtdf67259m61opfl8xn5dqaadgm6zx9uyxw9u14wewu2ewv495q72gorj7a5byl4gkzzcpwobud8pofajcg85f9qmph69bcvgf7ep5cm7l5gmp6obsmvc0qahbwbi6',
                interfaceNamespace: 'pggu7j8wcxrk3yhifgf06h7xvvhdjrm3jw0ol8nkg3rm4sg0l0yn5drcu78em73r3oil8o2yv0ih1nzlx0fdtqlh4kmd42vm9z0plbahpykfcq4h76d0umt5mdepyp3pyfqsbqo9f863ms6ogb189yfuioei6i8o',
                iflowName: 'klk6p95a2hogg1tyg9bsujpwqh4rdo7gm6sfipzu3bwy36ayllngexrkfooa4lkp3v5k0c3h9my7n8wml1kdgqwoaaol3y65958tylsmfjmz96kx91kcgbnj5gk3jgx6iy7k1oovol1s2p3gu4l2sl8moqagvwhuf',
                responsibleUserAccount: 't5zsv6d7u5hpl8x0synh',
                lastChangeUserAccount: 'yc4g9p4vh6z67qheyrx4',
                lastChangedAt: '2020-08-31 04:58:32',
                folderPath: 'dse0e4ftb6gp2qmb2f429n9n6xo96wozl5ie4hkri32g2zk6ktuwtjh6y3slwnb04zi4rum8rnwtx0dw2tll3nzzryp126qkt4vsvhrupgkwrm92zgnljjxmxqjpax7pkdq5036eq76uzfy1uvqxxr3qo9j9rca6p3b329sux163gq7rcjcfxcenvnks62oe01dxkz1ch1t686qwf6wd9140mie1ysi4vtxw2udwu0x7dn0a0l3dwf0zbev7xc0',
                description: 'q3phd5suv7v74olb44660g6bykiif5cof25s0ueniefuvvjs8t5j7zdjf8t857yd97s3u8i97jyu3bvqfrk863fi7dw9kwe4lo50pzmtfj9hf8xdj7tvuo9zmptc6s3ugpb83zomfn0mw3hjscdnsl7dkeja9bgt0pzet4q9v244110l3fm9wjv1cfuegdnpf3gk0ez8omefmw25l9ntc7assl010wsr48aw5n4454jgi6vxx98tokimvancmho',
                application: 'tob38mc4jakkjx91mitloqk68exbs42f8hzsgpsssf46q0xjy4pd2dja11di',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'qmh3che978wbjttxlczutmplkcw4swo5b9nhwlz7',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: '7jnpx6x63c3phkewe6rtdaoew3ai85domw703v8eofhg4o8br7',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: '6i1rulq74r40d2f3qa2u',
                version: 'lobpwnrwtwz3gjavi8da',
                scenario: 'j66bz3q4fyvggf0j6r6dvn1xk1a7fek7d7z6ftdafrq3ayass6km2e5m67mg',
                party: 'hjviwwqmxjubq32zj0lkynbrpc7cvvumjhh1balgo9h2b246yd5y7tmxgywkfjly0dzfthlyqllk1mcv4b3y6hnr2xeqcq8hp79uy0l8256jk4pwovzrebwnv9cjsr9193tf5sz0o3fx4lp31qk6lne0jkm3clpr',
                component: '755p6jhofk99cdhxd8ytoactm1vfgbubk7jvh5y84gobsocuewu9i9hpxrik30jdvj2l5chw5kb1pzj609j8hvx7soxo2u6abwrhlwux30ob5xvajnb4h3nncwnn2fehaws0mnf2a2ysx5hqoyulv3k1pzj62gp0',
                interfaceName: 'qepgsl0fjmfu152mhdqky1audjqfbaun9fv7erm0sdj6icl50z8xy0p4ilo2h9ojt9j07fyyln8mc2316lfeywbwlkxlrgjj01govu3kam87l0ycmwldyh4349ukfidztp44yb98eynjn40awwvw045v6lrtabyg',
                interfaceNamespace: 'i9nbdwfg1831o1cg7rq4edxrrbbsw2thegdfar76opx3dbyb1ocnvzqt20jj3q1slj0kxv8f27jtailqzdwngoeb4u9y5g8dbxi2fmb78kf0khhipc0eo8r9myuunmhj48w9qx3zth2bni7nrkt6kcnn1wxykzhq',
                iflowName: 'ecehiri1ybpbjqxhgse7cpy1c9u9gv92uz1jfprqn29jqewo2hoib9cupkd3dij5qu7jwjv47wlvdtg9v1e4yqzpymos8ruyxwacxdv5x18kkczo1tlcwulsb8hxv3qol7u99h1nwfz1lwxeavozk8yipr6y7eqa',
                responsibleUserAccount: 'f06agvwrb7m6pousw6ro8',
                lastChangeUserAccount: 'srzj87j0o0deqzics03o',
                lastChangedAt: '2020-08-31 01:48:09',
                folderPath: 'zfossidw9eq6txhuvrwhtzksmv99qolzdpo95ewv5h48bfg5gtej7q1y5j276yrqej5m3jtjrd1fbkkvl67rho562z5n9twxwsfseszegq135vqf325sfv5fzmd9una9119kxw40d0tfxj4moy57hn162wmad6s0q8wnckw41bhc1vrfy622w1wtt6lwjqcq7f84gw5l3it3fvfjkyesh4bd8r7d43paoviwgjgeqx2dtg389afb5hbiql6iwqk',
                description: 'zag2veuo1qwoto48unwve86hjzhlcha0z4rjgf1h0uc65ero0lk5s01ed2cgpr0hc42unnelq85u2x8e7ztx82ut41ctwyc1pye7okd70x0zh4zvqhg0n5vt2gfje0ajhjra0ts33xafnkibucjb66cmbhzcnk1bxxxdzzo7o7rk9fiyjj7nbwaekl7aeniflji9f4syzh30fx2mqevhdohxvrsuxnyyp7tx43s9kyppjsakzxoaev8tpbvs9bt',
                application: 'eg5sg83ywms9q1q2z6cmdf482ws5g5nynhusnymbmlm1z2buiubu7y9b5iuh',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'lsayld96mjghoqcyhsu6jbbxuk5wkadrhutqgrfo',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'dxobkcf2vb6xtjc401r40i1uwvxgh6xs3xybyo2obgazyxtcqa',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'tidpcberecb0hx9pyyz8',
                version: 'vd9jv5lfiace98esrnmu',
                scenario: 'gd1ajqw07l8x238wtysrvz5l4gn7134eq7mvdbvl7u2g8erjs261irf8102t',
                party: 'p2s3pg4kvg0g5zyzrem3qse3by3m9zzc3jqdvj17v5u3lh954ukvixkr4br2mfn2imng4xzfphyz28mhzg00ev0moptcd19j2vqa9ppvplht9lqsx9w549qlmvw4yag4wmnr91cnc695o9y3sjk0ltbztpjuohdc',
                component: 'vmq1ejd83x966ng7fbr50ob659hwtalpniu8s4wxhwlto4d5kuyemwnzrb6t53crahwjtbic0i59soeld33mzg0x5i5aqhn41cqrsphtm28yfg5l4h0vrnfahfnskq6hw5wygdu6bhkm56rmcj74zbnr7jmdk7qm',
                interfaceName: 'c1ve9ylkkr960rig7aufs9rlq48p9aw5g2a6jaomlv65m4dmzt0xn4s0ke3t0r4opqc5hnz8ksr1eq29euuyihw00f4z6ecbk7b8rq4fjh6vbyrjlmm47c2tla0swn84ggoraz9pf0ids7p84qbivgbkpto0fs4i',
                interfaceNamespace: 'j0tbc178id1637yhz4ft5avn7t208m5fz2ds56mlwxhv6qw22wta77rn0labl0cj1ljfqwwkbz6xo8ltfri6f6j22asucvjjcujk74icxnigitrjqn25ae0aftngl953vhuga4c6qnqc0isup500nssi7aameh6m',
                iflowName: 'vuw0s0upxjwm9jp6mydm10sc64es1kqukeinr7jpirhb70fzivgcoro1hixkh7qez5r6wexhdm9loirj0wbwjpb7ioks8q28bk7v2ypfcdzyg239cgbjxyj0mxl2e72t4bcjcig37y56khl50g1hba2q3ug1q05w',
                responsibleUserAccount: '2leq1t5wki9vuasqs3ua',
                lastChangeUserAccount: 'hl8s8mbioq7mlm42r9rdy',
                lastChangedAt: '2020-08-30 17:46:31',
                folderPath: 'mhapq8iqhk9x14gl7ah4ziw77czxiyfsjvdjo5chcl8yqc7cmc3ytj6afmgn04lh1uxs79idpif7mcm9kxuoub5dfdavz0ym6pzn65j20v8v28ju4jzh7tzahe3njajqt2mxt5fdxvv0i2bpupmdgxg2b464bmc00roe6kwka3vkmmkarjkyqs606n0i9blunozm1qte8a9tvbznw7takh1cpnyyb596z72riidzao1hj05iea675njivczif8e',
                description: '2sctkix4gddnm6fwjqmoaz34st1cd5lqpd5xobxpyifeexgrln36a5kpju3gxci7p8abevd2upv5sm5h7356dzo2edw99dk9rqqoq18b7cc71ddqtp1xbbe2qta55nhhh7x1abdvf3rsxxkh5f94a3x71aarz91oncy13k8vuui8mxbzzqb2s70yyvcennho9r6hsmwtnrbx7uwbt9yqzwekjnu4dwrnbbda2yssxyul1ryiah9y5oclh6mof4z',
                application: 'h7qz9lltsuw09ssdd1jt1dlmf3cn53yl6nvnu2f6xtl62lsyh2eal1y2leld',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: '54bkgu5g8628yezya1u0bp2cgo4pfw7944ociv6p',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'qc056tc0gezok6l0wmbnq2kt6qxap2eivym4kz5n8u2fo374uf',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'agy47v70pjnxfrhx7zij',
                version: '3f3rxmp3e9eydwu9wuy0',
                scenario: 'ursf3vplj2wl7le3cu0q36xmy3vsgm9k7pt8owq6cqfu96y2pb1td1gcf4rm',
                party: 'okrh4o9idzutlxlpwpjmbhp62qwksdbdsmb3l2zwflqbgjjns83f6ydcb5j0ktfzbjdkawfxzxxgndimsx4idylhgtbn2635b86ev4nkq2osfi5lbp8hiwwwbqdc16pc06q72clmbm70q0hnki02pa63f4hh9mj0',
                component: '12dgil09brz5x9tb6pxt69txo36uv3e5pl8cxpjx3synmv8wrqh6qevej7el4k782p6ghoe9bs4mympuqqe31nbezijwb5mjag2lqni8zxb86yz350bdyzyfc22sz67tcy0v7opqmyvi2o5syp57wyquldv7rsth',
                interfaceName: 'i66qwe5pedn1breg3y60pl592qlgjjcn75uqng7lbigr2aawsq7t15gj8ukxy8co2htzvlic57xeqcn87vplt7myivjulnudqxfgerr9m60ixp5ct3r11po98ic211f4vmm8stbbdaa5o8s4lxqcwsxonx5lsasd',
                interfaceNamespace: 're7o08juxhjrjuns95lgox3fjg1u0fubr7fi23vkpgxmmo0063p8j2jo9nmybklpdygsc4e2h9aeug0922a7klbqx0xdmp8as4i6rmw20evo7t9m1e85jdyilxpowjji6j4qbgim9lftlaaaza6xwed8qq5wk393',
                iflowName: 'kvtdltlliq8o1077iirdun7ym13qxrsg1eqjii7owb5lqra58x7ocwuxf038vpjlygfvv6yhjjatwyuywj4xtbnbfqthfxdwrvznnmusr5kbfh9l9m874wy7y86v8nvtsbv05261zb7nxzcnbtx5db4ksqdmruxj',
                responsibleUserAccount: 'anh0e6zafa00b10mpxyb',
                lastChangeUserAccount: 'kg20ybf4ku1fga8a7c03',
                lastChangedAt: '2020-08-31 10:53:52',
                folderPath: 'zz4x0kxxzu5e78z739iziagq251ngtpt2ghtxjmygedmk9dp579qegkslgyi59jq4hulqg6eaydr7a53sm6dy8bgyrpz620q9pjosivhhgy6vv81hhedjd24hmred3h0wfzo7wqqghhrzewxdbm6encoiwbit2w01haslrm2muiu6l5ktl8ug1m4hvfm1uc8b26f83nnki6tyt6ynpzcbfwt4s0k2nsg52cfeyb1zrwirjytcpwlewnjjko797n7',
                description: 'k20m0lodc5a7ygttxh6h4mnajnu2uvkb66vfgt8mjzrv5bip74pxbwuh1xlpc941p7hpit19it9gxleu2e9ia5i1r71b04majzrib4bu5sdwbgattvj3crh9imlcbky6j8p3fsdzvht8tgbgcqfz178662w7mgzq79jsfw6e0ri840kxbub7vclgtp6apj46wwhalwf4pwuqhymv1n0vvylzivtxbda9ozfksrfp4ql05xe8pzmm8uqfbwqbnn7',
                application: '6cuz0tp6vwqagvmzlizxd0ctsxmn3f1jew3onl1hd95mptztk4j37mms26q9',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: '74abtcb6s05zao6pqs7t4jotctg71sc1x5rcvdo1',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'ks2t8so6dpghk0b8ba28zaaokhb3zl6viw9ddeqlpjpy78vkd6',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 't9s9nrpe3449bijno5cv',
                version: '8qunsg8xnpqz697o7k1u',
                scenario: 'urms4i42xkkdmdj1n71ci1rwr4g5yniqed9vb4dwqmktcxji9vreny6jqyvn',
                party: '4swrf93fnxp0til3tjb0x42lac9k8rpr06zt3sexnqmq3yq8ruqh2j0klq6xzzzfa484hv8i4hurz0fpw78ttjiclpikpuyy3p429www0vqabpinfw33objdouq6l3vyvjudcc8obr3rsjg7ps63zluj10cxunm6',
                component: '3il6xyeb5m0re9mumka3bu6a7rtiq99h953hrzre3qfn3n953xft71spjvrj772yp29ddla44ntp8bwka6lqngnesz2yrc36konk8pmcesw6gpsg0xwei4tfug1wjrsakror1jh348nxe20f2ue5knws6s9ut1mr',
                interfaceName: 'hxnzab1md38xnhc0q0zsnt31u8qa3a9e8czj3vdozd6sgmnpsqaf1npedudbiddkczvrjmwt1b9m6jognpgnokee0ln22srfb9mrlstlsx5jkf01agcgq579jlbhysy02gf7zyj6xq8lu77xvyxcoge1lpzgpv1g',
                interfaceNamespace: 'zfyz2oecevbjj35rr7ybjvbmfn3fvcl2whwjvsxos99ai686v27b17y9j17pme4im8yel9964g419qqbwkox398er13av6tdirzedt8opm6zcyf7r1fxxyifv3sy87njaalr8amxzxj42oczwqoz2grpcmidr8xt',
                iflowName: 'teuipgw4r9l1qdle0ffx6p0t4lznb8dv8n42ibbi77i3ejfmty9wdhl69uvppn8sjt3hdr01zgxeughcs5tpyuyuop85v1mf3f4j2cevmgqa8l1duvpm2fauosh44q754susu6cqwf78xk8h3dvr8ydowxk4ocde',
                responsibleUserAccount: 'midfwsztkq49z60j6k1l',
                lastChangeUserAccount: 'mgqpzqs7pb0onpnaqf9a',
                lastChangedAt: '2020-08-30 21:18:19',
                folderPath: '590x7elwr1dzu2jrmgrmo5usnm90f1ksgvgfcn2z5trc70750t3jmzf0j49tenz0k1e59psgo3sm4vubf16gnzf6z7ksyqr4dx9wg1zhyt361c7du37amhvklf8l011iy9a0o5ax72j8kw1qtkfnc4h525tzd74r0js9arfidf6ut4qqrm9tmdhzjg56zx26wymxyiotogu6vlvt6idh8cb3i6aezec958edjmtd7wni4fzdq9uk0vfcl6uzq7u',
                description: 'zrcse77ecm6ri4wn1dfnj3miopxcnlhjdtpgjfxbrjzb8plxiajpjnv1gruopsjgsq6x3eajaz5o2xnfy6og9uu1ydmf9omoc6fledgjo3bna9289eynajwdmocbm3jvh1mukir4lo4fobjj2k1p0fcoc6mfjjcq6z2i7iuqv0r0wtfcp1i2dmibis9dyz6ka9onsnz1eaelage1o91tysgip6l9mc29d1zq112z72agf03iwlhipb2g1tf9qks7',
                application: 'l8uultip7unpb0tqabka0ktze6mkfnwvarf2s6880ztdmaujvza11z3pge51',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'l91f5ycsirrtlay06w88a1sccb0cay1hvjz3xk61',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'tmq447mw2ao8bqi9hj7q8rh7dnt66p8o7ofjm12904ym41bsb9',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'ulbt2oe8g153xr1tbuni',
                version: 'nx6b3f97ccbzpn1y3rlm',
                scenario: 'tpcq59n8zhkgcmnar4vjl0kwi1um9ej0lh2mc6royia5ezm4pijyjz4yxfmn',
                party: '7pi9hp7bgd1n5c3arzup6p0ncgtg08urn56i1d9in0bbmfn7l6wm42a4gvsl2osima4hbuq6jccdxw720ftq2rzpbcneo0moaejriwoxbixubvdlu3jwk9ypy7fdsd3wpbns6gsyv40tezu9ec0kvd621u9qarzf',
                component: 'juewelku462wr3ykigtngah2xr66tscwmpkbogrqadn58wj7cvqje5tsl7fa3pdybxlaiji6ml9qblf7j6bs1geq5vebtr1ba2dp0q4lecwlb3ky1oycubkd36ong0ky5lf31qt17whk0qwwj0xnms603sz22umc',
                interfaceName: 'bxhm7nyepzr3x8cotsdefqawvur1v9wagdfv5wnz7eqcap0tmj405znsjlmtyyd3h2sjgnodlulh2tybr6xm0e3b5kgw9biiizyejngs8n41ougsk60dffv79sowe4crlp9ud8iyzofeffjpssa6sgfle6cd25nh',
                interfaceNamespace: '8ho3ur9rmucpaulc4y3qrl2ea5kncpy2i9nahyx9t9t02mswaj4ruvi89kxztf75vc73nj804o14lcde022tmebpcpruzo0z9dkulrs3p00ydyi0g89dv42ccsuf6akgmelidoj66bz1a1apzk05o2w8qiuayf7y',
                iflowName: 'aa1wmn28bfhlcf7vgaqnj792syhlqn1kh9eodzsfbih25hdpkrovemma41j9mkuuea00ukbpntrke2lhos2t0mi50fcaicemqusipfq713m26rr3awu1c7kmcdw5stvlmz0dwkwblwcu8irhwiaf7jtq9ch0ph7k',
                responsibleUserAccount: 'znhs5wz0sdcp3nf5p7qe',
                lastChangeUserAccount: 'yauacxu8jl1gd1jbutcz',
                lastChangedAt: '2020-08-31 05:30:24',
                folderPath: 'c017o7q499zoctmeu0si4nrh10c9u6b051ya8hsk4f4v3a1tjtnct86ufaznjq2fosdnlhnnqjhjsmhoxnvks48lipq6ddy4j1wzu4hjn0ju2wf09okkp2ea4dxys90ybqjpyrevi96ckgwho0lhvyeizi96mz5n57h9do6ssqkg2apeoyakk1n1q0zhmkr3whhecdm2k9jq66am5kdwpnp70j22a5b57sirdsg5n1ra6h7t97cgo4jp811nzyl',
                description: 'sgkkcvg34oz35j1f18b73yhcmkvtk0r9c4xkk9ziw4hwdrge09ab0lrkmfg57w2578jzzjdcujz6gpkpuvduwus5qa5rmxdc9uqy7f0i88ou76nk06i6w9nmfyoh1ubctbvqtnp5wrsssh6x8dusn263gu2a5u6ve0x1hbp4u9x8fwqoibbt0xvwq5pclnq2w1hwwov57bkpu8ywihefyv3ja4z79buba90m8tj5uv4v9s9wz43vgbg1iuhpy5i',
                application: 'z1kcwqfld10xyo8mnfvhue0wtf43bg7r4kpawl2kvlwe1og3e2ddb72felbsv',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'omwsthmmcnls1cl9fq7pbawkkg7mh2bj8hoftzwv',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: '14w8ozwxnepa49u3w24gbl2p8m1svpa1w2kgx62nz7nqes1fsh',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'jr7ql21ipdd65a3vaz7u',
                version: 'n3ak0p2y5mjf2vhdg3dv',
                scenario: '62dfmmz7sckbvfftig5asovld7lc70t7cp2abgyoo122gvfrw37mj94fhfk5',
                party: 'w54j3lmj4lky4sgximestflafnmz1i0upimacdxy0zisbf6jb2ota2mkwmp2aejl0pjml8v5o876nq3eotltlwmrbn7yxyjbli56mdohvhg6qyrih1trnrkudis6y3gp8oyyofr1k5vu071tygrsy6fguggngf2m',
                component: '7g9m29pyzsfx4cj8d8pabegwpuaei9nc9nwz32tptx1ysc4aod86i37eejdidld006cmrh91dzlsvcyz535kqlnie4brnr66i1neplezwk9n9uow8zkwmlmzovels4u53hoj8cwb88dpykdzjx04l479oc4ee62l',
                interfaceName: 'dp20qannqrxuc1lcmwb8zv1u2298iqhfvy78v1d98udxo06u8hbhs7a150vbsh7733etm6f8ognd8tmrwvixcnqv51n67pmw77xe3qi9fad0lxlucgubkchev4dockhdtyry72ysn55y58enh2vxvwidhfrhazk7',
                interfaceNamespace: '9t0gp5ka6nbmv9x381zaetgmq5jnh7endegbc0vwval2flh2fn6fk3wolv4hddu3z8y1tjq0mzg9xsxigkzecnlvmfuvmkrvqpiyqz7pxuqc4wg9ifz7xepvneepppqrxnst1ecbunzsars16weaa7b5wx3zbyf5',
                iflowName: '5m5v2holk6rh8968jjclwu6etluuojt89ffdv0m86nkqeu6ap8w2mmeqhhdi0c2e1rlef35hv79tp7bp7yk1dy1fcr0w2nsn5gtet6hgyv70sfofj4vwi77xxf7kr95dp9sld216rfx8oe9a2nsqywszil8nzx3e',
                responsibleUserAccount: 'wumncj4fqmjekii1n8mr',
                lastChangeUserAccount: '6grynev6z0bt83b5ox1t',
                lastChangedAt: '2020-08-31 01:43:15',
                folderPath: 'ry0vq4zctehrrtr78old3j7yjgbzupyp8x5hsbcp7n9zhntgkuujkpfg8mxblsupeopma3dpy9jhi2awt33a53dimhr8wcz7ajverzqnvjox6ry1f5beh264roocxbok40i39sp5uu7ojh1zhl88ba10k6zsx12ii8pcd57t2gsxibfxd84n7kcd9ln0v3znrl7cw51hkpsgbb70apzgjgkgwk82ac905z16igys7vugyldn4ncx9s8np0kdob7',
                description: 'jg9f2xw7gwyix0uyy24iekg5711avuciaviqqkyhzilejirn3dpgmt8x0kwythd0ons7lwnt43fepagcipwenkx71ctpyd411c2v0cl28vzbz9iltzvfz44o201ik9lhnc70uas2b55wcluzh3vq9secwitkzgzgk5je1g9hh15o4lat95sroangr25ugb9z1pan46izxk2cq0awkxkk5hqmx808appjtchajyms2l6qs0s6a6aomy2fzdsyunx',
                application: 's0xnwymt8ejkdpldy5n2q4opuj6l6tk8kf9s2n2773wxlmainuewcp2whcx0',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'uh86mx5yd1993v76mhwjeshim6dlb1gmt3j3dxec',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'jiu06w53da9bot7ic5ctolbbutyr4w92qpnu12kjbh0xfxlw6c',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: '242zqgt96kvykrigjbtu',
                version: 'z55w3jdzlwggxbu23ovk',
                scenario: 'ie6g2qc8wnhirfhws4y8hkoy476ycb4lulu1iv7af8jqvniw9eowovrizbt9',
                party: 'oidfut3nt71vxoj3trtv3vsllk8l9wst49k6w4jk0tugeolt0omahq3f0zhxw23cp14a2ud86v5sty9q3any59shpw8asseqv4xtb4moz89362ar57fd43r9ya8vbqfg2e9erttp6bxzdhyzdwpm9pjtr0hcpuyv',
                component: 'nxzv2cb8a86x6528w4bb8el4p7hiezxmm3tw9rjira1v3uzmjmlnqmvuirvn0hg0orp7t73pvahykeb286of3rjvr8ixwo7shn3cunogjf0wxorubivdpt14cu5wn1twvpj0wviiaakwo8dd23hgror6w5758htf',
                interfaceName: 'yy8yoyiand6r6si66yrty3ef60cqej09j5ouyjj7s2hxriu6od5c9f4b83hcochtx3zkejckkrsikh1vcs67btalrshqv6qm9tf8xsnpodiwh7w7g5ifrexiw45rjzisgwyn1wt2bb7u56bwwuiyxt27tumaju69',
                interfaceNamespace: 'vfnw6nmyrv9cnz13fvsjplz5w45ve4720m9qzd2grjbr1svtmh5rj9o4jsgxbof98mx8xti9v2eumi8wfz8oqv6x1k9j2supnw9kcjhljvgzc9efi8wzmtso22du5i988q64jpro900u7laetxye5rkp5xt0j4pp',
                iflowName: '82ztiobh6rg52a604syvm59uyks8r147qiwre8qmr66evazf825xsfhss5g79yvce9s1bpallumypda7ybqtsugdc2ijrlwchj4y2d5bxsdy9wzbvs5gdmwy562i3ccpsst7puhoc7k3ibmxbamigxvknbwdqiie',
                responsibleUserAccount: 'vmm8jrneyx6emvoki698',
                lastChangeUserAccount: 'zor4n9qcq30ce7kqxhgc',
                lastChangedAt: '2020-08-30 18:02:27',
                folderPath: 'px1xjegpjg16z9efq88etal1owtnf116gs0f1v8wetfeuj7xc2rw9fvej4r71sexumn5f73tl6wm5xd5lvdzfrhkz2wwbsu2kwdxh1fnkbgrpoxqvruq6c3oej4w0ltik1lao6mlhqcvn40dd7pq6d37jxq0qdlcz11c2q0s76x890yuvsdt2a0elseuriv7k99pir03k2h7b0h770v6vrcu1fa5uelnpfoiw7yrnd1yvdahz8jox4vonasnjqz',
                description: 'td9dxf05man7busg3avnrrutmo0dygeqtvlfgd6vzp59dkya5tfvdqfgmyoefu3ejt3503qjel81kh9ii0z6veyx68zamnxbmv7gyiy4yfbaloeok5ljv2wxj1zpv4oikknbr5l4l17i91fm8oxgyopbx428jz1u04kvos8jhhsr3uqejq869cpfpntwh8x51j1zueid8pk64ybv96uym88j37z27i5uthuu5zjwdsiq2og7sjw85fjbmc2h38e',
                application: 'dyx8nknidbktimzm6ad0dfe94kl9hs8eu7w7776n99bxuz5l66bmvm5gl9v6',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: '0rr17kepc1pznc83xyirq4v6d9k6onygklon42ee',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'mfqpn4n3bry0dsrqg41yiifdhdwk4fe8m0amnmq5cxh9a7ph4e',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'dvoydproei7q7nbt99g7',
                version: '80iqdqqggr8g2i1tl41w',
                scenario: '2pj7ersi83ewkccz65bqgod3kgapei3mko0auafabrn195nuwlxae56gap5r',
                party: '3434ck53ng8m0wts74vypu8kkhnt8vhnac6ov02mpc7eoc11j8n29ui67bvkb18dbcsa5dfh5b0tk2ivsvny5tuqnsa38zbp1iisv59f8gb49cunwdwjdb9jd5h3l6anqgh9bg63qcupsc9237z6k7c0qx8owxxe',
                component: 'tu7xjvrfubkn8h2iyr85dogkfslblqhvqlv6lfaybt2lwv9ffnn7yk0n7bb8cn3pfdzo0zin596dr1q0fichm4vsewx6t6qt8nk41rgzpvd1kir3ytihd177dqsrkkz4j0yjnx3qgr2wqt5up0gpupm2zhu1jd4t',
                interfaceName: 'vlmuloo864e97zay2kvv75a1hn9a4idt3uepki97x4et0z9i1l07hjwt5m3pcgrghejk4nnc7f19nwird0fyyouyou3er54uqz12dxjgquf47adix7qezwgn9qn56rfgolgph161nqf1jkwe5yz19ylv0jdy7bxb',
                interfaceNamespace: 'r60e2flwjfj3w8b6pc4szo0b2a2p5mljez2gttez7g6d0bgtyjul2al70rm7rkomus3qpgszqx5j09waj7utqtagi7bv4gm2i5q6psl8ypxseq8lwhso06teq356zkhx16lg9kvgq6db6cypq94m76t0wgf0j17k',
                iflowName: 'j70j52mzf0d1rn0sxrcv7exg2qzvx0hxqhiqtk84f5d0h93ejczoqpbn5g0p01axjo67ca29n8t90zer55zcrt9v6yu10wm9xbwslicsef61y52cjdy8n87vawsh2ir0i68vq4b4zq55bii81i0w7npvfrjbfpzh',
                responsibleUserAccount: '0fbrcwfnjw1ffqu1ajr1',
                lastChangeUserAccount: 'eleyg80rnn75v4rgz596',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'o8dkvk5xlgor8nbmqjt2vafbfrgt0xcqlwm23ulp4zetl5cp9jx6ja2cjhaeodpibfyyvluhp5jp4hqkwlpi41bhvvz8ooitxgzykn9682dsvzvunf0ag8ywokb5zqdc2im8llkxe2oe3wwq3toalv5kr9ekfcir3c7p0h5p6sbglf1qju52zd9csckywdq5s5d2oldgdlc12vt95trphzvrtzpckio74khmgnn0yovd8j5edij5kphdzz5yc9c',
                description: 'pmpalribu19reyotbp0kjurdbzju80itipc2ysbajtrpf6jgxsdn779y025z24yevvds5ecbjubnrnpymo8b3ne62suloyptuawa23z5y1c7ohpbk6cw3mjzcimxnaugy94lzze5bo26ciyi4niart3ewnn9l5vaxzusucryhuplennve4kuv4mggqmqdnzlx6d0jqsz9nei4zq0c5idnetcilyw41pl5tu6rlqdiype187qh7gzketk39wvhci',
                application: 't71ry27rt7se70u06cov5p3qerzbhvf00ks227lvpwo453en0wol4qba2mtg',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'qxff1yht980isofwq9f8qev3we14odti7nddunte',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'gg78bd940p9dyf6fnzsm7rjptfxxxd06hrdasih3eujxsd3r0v',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'izdff1quiz1j00yqa4el',
                version: 'acqplg1482j7txb0j6qr',
                scenario: 'wlax0qdfno20t8oz86fysvxfcdzz2fbusmg7f5rvlvy6ib2jyjkw2u3c8oqf',
                party: 'pr05n7upfmzbyutz8akulk8i8mfhxzyhcryfcoygu9uta92t96oljedvgisk4iw293f5f0ots3okewkpnwr7l9lhbmkpmwsrvyxsylnx7fw9sy474j9xin083mxox9brol89eih3ayim1l9zsq0wtkz1bo3qqxsr',
                component: '7s8w1057q5l895h7opdog7j00bru3by6lmww39fi9vh60u97xeg4d5rig7lc3d19hdhi57jh084f4edgeamep25qxcdy3hj46w1hhjhlbdux3atjx6qmiu2i4ugaglvypyrxm2goz93gylge5tckwq3kx2gu33cu',
                interfaceName: 'do3g1e8a2q7b5de7fhnomb691y3ru98afhuy1lt6bw69kmref2dujnl2pnb662i34kc46m9ak7sj5kbedskxsj0rg6fh53q3k6qer280ussvj20eba1f7mqcgu2aebg4zjuuv4pdzivr4qq3i4lo6qm8d2kvdd2g',
                interfaceNamespace: 'sokg4j3bt7h6aj1jgdpl75genedf7r685wylqov0u6zm4n9w1st7mr7pan6s059yil1t0te2ebvkijmya6bbsvp94dw7yte4mdw3f22smxw65m2aqgpkb7xa4bs3i7ykp5thrdgkb50izvl1hpw1s0holwp3m9ww',
                iflowName: 'tucpln23d706770hn9r1c85ta4n4m2th1anqtu3b6517ql14dzv8n1k5xk2jfta95byqyrpxgh1gr821pyujv3d2gjq4wn0hq2bm8cr9g9ds7qpjeb8se0of6vt2qfqlu5j1a33f0bh5841c1zr8v4r7c9yowodz',
                responsibleUserAccount: 'iswh8hv2tfwkcb9stmx1',
                lastChangeUserAccount: 'vfya72w646yc2pczr23e',
                lastChangedAt: '2020-08-30 21:06:41',
                folderPath: 'wnkfkmw9txxpc6okbnx3qp1u0oxvv5op8v3wzr4o0q84hjqq0gz2hsh6htokn32ioio38jsjjxlql44y036qb7nifupbooqz61dwiqg0i6zw3yem5xulm5rtcoc7ftzlbgb1kxhr5e3g4gloovnxzd3wt10mu7nbnz7a9wf89ykaa6u0h6zbnccqo6yomdpsuwshi0f3jmnqplpo4otrg5cclemh11c4llsvdpe749pzvhlmsfewl3vke2k36rp',
                description: '8vxurje7b8zkqfpned9sb8qxzbubz36ebyqg35xd3fa7lc98oflxnx4uzwgfd1plda2nluyb1z39q3b4q6uvs6799nvrjj20zktf7yqw4em8y17640h3es9l0a7d9ts7zge648d3kdgnk00bajz0ncu6w6co7ck5qm7g1bs0bpt2jxk9m8sz2fnz7aj6h9vl9hl37zn2h1rff1rdnyjrwdf8f80mvwrtce8qi40gdbobrqwn20hz59cmi16ujzs',
                application: 'eqg4h02klrvorjyb478l2k4ovy8ajso33qml8l6jcw075ruz9pjms8pv4q04',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/flows/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows/paginate')
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

    test(`/REST:GET bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '1abfbe78-2e97-45b8-9c69-27e8b422fdbe'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '587eba99-315a-4cec-9a33-9417cf9ded57'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '587eba99-315a-4cec-9a33-9417cf9ded57'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/9cb6ee62-7e90-4dd0-8919-d5cd9b9a83d7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/587eba99-315a-4cec-9a33-9417cf9ded57')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '587eba99-315a-4cec-9a33-9417cf9ded57'));
    });

    test(`/REST:GET bplus-it-sappi/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '475131e8-460e-4f67-ad6d-0ffd1ce2c7d3',
                hash: 'xaskzwfbxrosiu4tnwab0n3lorbw9b3pku3zvld0',
                tenantId: '51d7600d-40cc-4af9-bf66-f651db58dfda',
                tenantCode: 's08j25zaxrwerejrt9gjmt20kn7wchjhvbg9ry7lpejlmqvb30',
                systemId: '452dee7f-b087-4178-a206-c43196bed72d',
                systemName: 'vwqd5umvyzseski2qson',
                version: 'hol0hym6xzy8251fwtne',
                scenario: '08eq1ec5qn0yfg7w5un4wru0nz4o1vr47vkpbwue4zlup42sfi0jfqbjxema',
                party: 'fs56yde3yffvoqucaz1m1uhhjg0kjpt03u3epxc270c7cmjxkbpq9wh1htosy8g32nf200ntmuxihmfh94uifw8vfn543ludpkha8uzw80gf1ury981f38b23cc0pc0344jcfwq9f4vx8tjrz4492c3pbvul8sbx',
                component: 'd4luvrp0fia49wvzffad58qd7ofil4kke3z2ieajv4xw3sj5p0h7w1kyycsvzmq3wnu1fxvdjmg4cgxrwn4jwmi4zl6tpfp7hp25h9lzsr67ci4fgjb76yiiz9c81jlcwyz52x112iohjwx4pkvunhl8iwzbghvm',
                interfaceName: '87l99832boaiu30a4rmshoy1zt5be51b6dh23ar06ucoav9qtigjsz23h2u6t8r8re43y02k5ue5n7zc3e3g40hj8dkfmmszc51rwu08yngfqhn5k6ym3vooeipqopo81qzt1y8csfvmxznghp567jisvjgfj0u7',
                interfaceNamespace: 'uwxohrqtsyn3c8f8g6yln1mt9oyn4isik026vjzp7uuwgf297i9icimw2i3kinhmpgurqobbeglx98nytcql832lb9v9h4w9017i0ak71j74rtc296kadxjapvokeixxqn95jrwr9wfppq45d7d55smr2auuir15',
                iflowName: 'njnchv680onj4jdenduj69xihn426rwr53mluu8opb70uv1nndlvh3sj1uzcg1dwffbgxtwgnlb7vic7xbkdyywvik9vpif7yzarlciuhu771r0uwj21jtj5o3fnyvncay81dwmiqiud5rvt44nmcxi4uzhe0abh',
                responsibleUserAccount: 'ef51uyoqvnyzc8o8orl2',
                lastChangeUserAccount: 'itxe951s9bzihalp60jj',
                lastChangedAt: '2020-08-31 07:57:18',
                folderPath: '3lv7nh6jqw243aot4em79a5j1u8em219fd6a335l4r82w3b0khyy54x8lyanpx64k2oibze47t0aflxns09q3e8vdgl0al9nwcr5lklizo17q2ibkxegaoyvr9vlkl40nuvcfwv1avm71ocp47wkhpdalcwswwor8c7cptpeqg7evs45qrljw2vf72io9vre4n5ndlaxi46pqm6z4i24zwjor10oho4ym10hb9tlsrcu8e33ru100ejfuab1453',
                description: 'ld4i3fo3nmq0xy2rvvwrscxdva41h55omur93fg5dlr1fysehankncwi7reogym0iqa91is75si94ab95dhco03cgoalpssgvavg4psucobjz6en2i488in7q9f1hryfn4ietohi30gdy3vq0gjvzqosfvvnrqa3rz8gv8luilpaa9fam7z78sw8x6rdliie9u2icezz85tiedu6dnyk7fuwsub00bqnnwuwd7suh0txltmkhyi49jhoq7lstks',
                application: 'is5gr2bpjz1oqolebsq71pjc4bjil60l9dtbnxzn0125j9c34j1pwk0enlzs',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '74f6b847-f1ef-47aa-a442-09707937bc82',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                hash: 'j3oj5nbrxvd4uf58ogb7u0sxb11nso8fduwiswph',
                tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                tenantCode: 'wrunrbrarfmhhb1yh00m83lqjwr49eeaeqpt7jiyqgf3fz8v5c',
                systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                systemName: 'q2sj46j7668wcjgjtnsp',
                version: '7p0eyv12ch48x6nyosqk',
                scenario: 'x1zmwyqg603w11l7jh73i1k9qxe1zb3bptr1e1hc0ukghntmfcnuvymprzti',
                party: '231pt0uma1phu38i4ccg5yzrvby0g98cwktelec9cnzj8xfqsrw8u5yckp0c7xadns7sblh0lew7rvs0g5cl35aa4yfbrjm7iqtk3hifcd0grehwraj07ra8nwf4wv2xvb2pd9m33wt90vj8jhpginmcpsnszfpr',
                component: '7p1l3wmfyad3rd5988qgwa3ni221q1nzbxyhdvdsgzm75xcr6y4i59sr6x1e4w09hlj94uptcvwi9lxrgbojtqsnfk6mmr8h1l53qrcn98aba21278sxbuooacrvtzc2sox4qameq0p9zef8krhxjodjbweb02w1',
                interfaceName: 'x8xxvtz4hep9jbfi4pn68nztodx2uc9bqb3dzkbh2qtjddl45rxndk1jwhw8l6h5i3059162x4c1zjyw28mx3csft8wctbt8n9p24upxn63z956nhl7yqyib628ek4b2skt8o4zudibq5v66si6xagjtttlvjxy9',
                interfaceNamespace: '4z09el5cheifdtkw63jdosvysfxj6jsqxm2op73r7hwxxz64fp9vucyaxaktwjbqxpqxhm6a5l44vciszdt5lr8zoeionlt5dymxlcq17kfjstx7xfujmkp24765kd5crxe05v2e2eqqav1u3bw69if2xnrgttej',
                iflowName: '7hnksalby90u3cl27q81a12ykkn3i5w7mzf23z7heaja40fbblapbeujbq6pcdi1o96k48znzzad7sq8zj97wnnv2qptqiofw7r3lyv1lfjckisjt37xhhktg9kmqpa8a2iokh2aa6di6ddasfo4vk6dojth3ezh',
                responsibleUserAccount: 'j3teyuq770r9s2zebz35',
                lastChangeUserAccount: 'vx1mnmpblp2z2onrrta4',
                lastChangedAt: '2020-08-31 07:49:36',
                folderPath: '268iis6nji1p0k0t7qhjlvy7idbvgvu21uqz7vdmh4rh97gyamltadpd4s3begnbvmqmmcc00dx32ux3u09z9vsasve84ow3w7cwps9ocqwt9q8i7ha40vb1vccauwploeiqjp27zbt6fp5cynwj3o21ne8igk6q3s9h28a8dylrlcjakihrwb9ul7ijg49jybyc9d57z4ef4prpu0fx6dox2skgt0ll2qzzyd816l1gz5odqovalnkq10ov1km',
                description: 'nor51trntgmjvedzgr4v77jv25x7s2t0zhta9z7u1zmh2ut0v5a66m350gw1j9znces1o999tu3e43ziw8isfuazbv1nvpkiy7c5o4gfqe21mh1jq0znmsgld2mfscr5g5b7pnk48vxv3drwg4mbvujr72lcbjmkf55ijybvbiiasf84z94e6imo9vcgvsjnxodwfj82otivy9fucqoohz5sr38e0m4tu3wtqo6vnb03wzovtalbmfgqikbd4qh',
                application: '5vkanpz6mtkq86p8golz01uiruvqcyupw7op3nosabyqn0fktlr15g86y0zi',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '587eba99-315a-4cec-9a33-9417cf9ded57'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/e45daa4c-ff5e-4338-b868-c90f8bd00337')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/587eba99-315a-4cec-9a33-9417cf9ded57')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateFlow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    test(`/GraphQL bplusItSappiCreateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'a3bf1996-80bb-4b1a-8c15-6100e4e2d4cb',
                        hash: 'uct48y81xsbjfo7xip43ays8dqe6dd5b8li3d4fu',
                        tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                        tenantCode: 'khtvirx3lniurywknszpiway2mrtviw6kecre0hq5g0cx0dt6j',
                        systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                        systemName: 'au1ke7su8n1ot59kid5o',
                        version: '59ler2w10yeoid0w9tel',
                        scenario: 'h7pn31ocfwbhaedzg2anlprm1pzwea91fu9ifiob3qldtgfmlwt4rg1k6498',
                        party: 'fkuczd97zwi0j671ki12ztl7x7i9uyg88tpw1q7xut81qb3yzix3lus95ufy3emv2x068ggna5p4rt0brc6nnqdequ4quq109eb8irphakiig96kbs54zefvrtdcls48vzbnk4uvl9oc2j7f4c01gulacm88m62z',
                        component: '6wul2vn9526wn975rj243qiwqat44erz31rnxntzutiyezln0xu97upgypc1n1gduv6hmz23mi7hgqswzhif1zlh1odgier7hpwjfekdik5srh9zhmf4j21dxd3gu8cyfx8mi22ajw9kfdli9jjm8dwoyjo5c1k7',
                        interfaceName: 'f58n603iz3w3wxw5s5igenktc3k4f3cma33cnahxqja2qgd86lylo2tg4xy6xl2lcxf2cgln2a7ps8rxjxo1z4484vk8kha4ol7senrbfonc6tpe99hn108frp9w0esvedw4y5c4ub0cbnggoy35rhbg6je0fau9',
                        interfaceNamespace: 'kdk055bdgyltxu3a1eiui0s20lykh40h3x6ba9nu0om759mt33osdb9vg0t3hijp0nzdznd9z7wvphkdkl7rivcxk4thdwz01z9seclmaweja3l645wvpxpwhnzso04pvep1a5bdxluopl6lia8s8ilvp7clfiob',
                        iflowName: '4oaudli7rkk6dae10ylha5y51uryceg0ikx9lpqa4rrtr0ood3yxhtnepbus82p7fd4cg24nw0bgq39xrn42b99fu6fencapkxqulbbhjiz8kb8j8ykj3jmbal7akhxghi2xaa2a0qr8przo303velkufeghi2rm',
                        responsibleUserAccount: 'ly4vxs2odbryvnrpzjdl',
                        lastChangeUserAccount: 'z4tmf30u10g03rr5o28c',
                        lastChangedAt: '2020-08-31 04:22:55',
                        folderPath: 'mgys6xkduez4tj5ethan2trbuoiumyy98iwhvbu90ngjg602zn8bziq0tu85jwk1fh4sei2qvm70e9447qzxfskzsgmbu3kv3d1r0m7jr5p7orn6a0e7plhvwsnwjxn33vtwosllaxpkjnrbnpekpfosa6n38p0vllhr59y09muz6csrwaw2uz1sg7lse86pn1qom6emqz6obfz6sns8ywy2bz508y71gkaho7wiiqnddt98fqg8os9j5eoe7ck',
                        description: 'wmrb5uxf3ny4zikpb9vsujunlf9rmtfi3de7x4cmu2uaq19j56gmteth6sbe961nz1lkr07knpidrfdy6lqd0ux1ffg9q0jrbkxerxd7wm2prui2lrzthv2pe7wjq5fvm2hrkq3sm3pr8hxg1elfv2eq03usuc0vf8uot7webwj4169bbxf30ogieu16ufapd4ri4cqsup9n6lzbi2f729irgmb2ojy9fjjbde3zcyecrsnkqb3jv5newi6r6mk',
                        application: 'tcb9slb570uer6qmegyixqu74youxwhshnhuku9vvrqnd9nee068coe5u0s8',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', 'a3bf1996-80bb-4b1a-8c15-6100e4e2d4cb');
            });
    });

    test(`/GraphQL bplusItSappiPaginateFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateFlows (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateFlows.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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
                            value   : '544ebf15-31ae-41f1-ba51-451e3f88e2d0'
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

    test(`/GraphQL bplusItSappiFindFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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
                            value   : '587eba99-315a-4cec-9a33-9417cf9ded57'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('587eba99-315a-4cec-9a33-9417cf9ded57');
            });
    });

    test(`/GraphQL bplusItSappiFindFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '17a924f7-9362-407e-b066-60228e168075'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '587eba99-315a-4cec-9a33-9417cf9ded57'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('587eba99-315a-4cec-9a33-9417cf9ded57');
            });
    });

    test(`/GraphQL bplusItSappiGetFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetFlows (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetFlows.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '675970a6-7ed3-4b33-8ebd-c41cb10ac727',
                        hash: 'v33egr6zhddw34fyow7w28uym0hpt2a1lru3iy1w',
                        tenantId: '56aa19a4-549a-4bba-b990-60148d2de8aa',
                        tenantCode: 'e279hbtvuja77kic67lw9emv5fji16hnhmfl7bie1rzysbjoxf',
                        systemId: '7fd8aa3e-cb65-4b43-871a-143b07277506',
                        systemName: 'wopo9rr5ggp08psdkbv1',
                        version: 'ot9be1w5zc3epbirr2mr',
                        scenario: 'w0xvjq5i5bx1imwnl4r3vqzgz41vr08c9kdlpza2mlf2rg7dt83088dud9rp',
                        party: 'elcbop7fzla36ywoe4m2uca8aqzm3s94cf7kaxxvdqmqk33nf6zcjo54fsjqxr05bi0drik4khmtv2drr57yzsh02kioeojetjmjw98yy6druz6af9zl1g44157lrum6rjwfdmb5s6pd0x4opqj0njdgr7dm17td',
                        component: 'p0ds3pvvw9i2vi4xtak3mgbfull8kalow41gw1n4fsobcoxkc3knllmn6nkuf2pdh1w8rz3f4g75jbwgmq9h5q7bm9jqxdiaa62desrwwnsfe0uodvkqumn8okjo8oeqdjfmpb40v1mf6vfbr1523q286gtbsboq',
                        interfaceName: 'yxo966jv3tm3ak04m1fkyfv17la6tdbz8moluf7cf8quo3540eb9ao1cp4fsqp0r74xsnuwna96ui4io425gr46k6apli53czeto6s7m2usbihxifv8efhdmgvydsgahvfxb9rc7watzlmgihjms6qw7n5kpcp5i',
                        interfaceNamespace: '8woqj2rpz27trhi24n3faguhyq7zwlw26z09l7emz5phkho5hngh8ob80atleoyoryb52gyzlokfrjxgpmdmn1ggzu6he3qxovst8ybif8rrct6k9x0ov9tbk6cz9fdty1klo1dlty2rurks5vlo8kmve7lh3p7t',
                        iflowName: '56fm82vhupjmwlpe5k9zy7jrsr840k8va4rzj2ihf4h7u6ouz9a6gw47jpin8qonfbq3s54p4fl02adodb7rltmyx49dn7w1fmlusi42s2l4mmfygfyyb6e25qa8c8sazjetfre9xxgrynl4vd7ch8f6qv7l3v4q',
                        responsibleUserAccount: 'qy579k8mgway9kihinan',
                        lastChangeUserAccount: 'bd66oyjcwe30xk6g4x4g',
                        lastChangedAt: '2020-08-31 09:12:42',
                        folderPath: 'wf3g6550ggpkihwvl3e9fcysdkqz6i3levbhvd75csson5xnqdvp4jqnzqvwfk9ec3iu7mmguu2s8njzfh35xze80kaar5hgsn1jfl97oqzccmril9hdz6nxf8misekmvz3c9o2ljix88hqm1uojitc9jic1c3559qbwgvr0rq7jv3hjv0mb8r2mtlig74ly7w87wnceqpyrjaad8n6vre11h76c9394sdy3zilbh4fd8o3rg09yrl3uqisg9zw',
                        description: '1xdli5jiogbyzpqhtidbnz8hevyu8m49ft6vu1vwv37d9d1a7n4zoycm4piqk9zfktuhd6lvckr8cpoes0nul4qlwvmgq6ozsf1wvx301ozbehy4pbkegeyn2tc7xoq7kwpo34syfv1581cqsf0gn2cwyvybsf83xghtwdk29f1sp3lh2fa62eakormt1i5v7cs7wbgu5723rdcnstg2488sbxjxfg79fw9ua87bow6i6ix0beg1ybkvsrjvamz',
                        application: '6pkfj0gyn3gs5pd8ak0vs02sc63ruhhkmsjhhmqvsczpvko6ufjvze1ps120',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: 'c394776c-6a51-4768-8dc9-bcc4c9047d20',
                        data: { "foo" : "bar" },
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

    test(`/GraphQL bplusItSappiUpdateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '587eba99-315a-4cec-9a33-9417cf9ded57',
                        hash: '6i4n7tqs4juv6l59utjo5yn1cnwcko1yso3nos46',
                        tenantId: '89fa92da-387a-46d9-a7a8-a694b6e40124',
                        tenantCode: 'yjndmdl96wi2gjxb5svpchytjajw0d30irl1c455bgwkmkaff0',
                        systemId: '4de55c5c-628e-4e9b-9ab6-97649e3e7d57',
                        systemName: 'ffujrt5m6u64efm6f60j',
                        version: 'arffx5w7wanrw3i2eji3',
                        scenario: 'q4gkffps300zqmm63exk5ym1j8ocb0vtnwdf4tnfl24yx0vcm8wxpodidnwm',
                        party: 'jpg05x33208aaiihoslbr5ljkbrsctr850uvsrtxgj7q3lvzu100lsk2s8psi7qqz6wl9c3wh7k23nv4hp2b2imu8rdjofqpq61rbum6qpksj5q889ctlnu23jsati6muh6vs1q6l941dwv83lro2np80jzjkxcm',
                        component: 'kyuds6f7pc8p4a9zyqpjtfmhthxda32ypc5p8y4z3egmzkfymdw47od97euktkl3o03cpwpvky4n7f1bthw41i0nru8871qnizhgheb3a6tbf6efpx4z6ccyhk1ucfo764z5c59qvyuuo28dmjfuin99uk3umf4d',
                        interfaceName: '2j1m608ma9ceal90y4jv0k7ke7e2fwqa9qvejia7som04psytg2nm0mmcv3hapjmfoiorftjj3cr8d6i02zbskkczse7pjal7sh2ftxypr407gd3vo38ao5tg5zfsd0n1cmdukk6l3kf9xq6t077kd7g8jtmocgb',
                        interfaceNamespace: 'zcg25p9u2gn87uy2e012znenme5r2mw7jucnfkk9ginxngscll5fhyr3bocgw02r8gpvxrbnuw318h1gkt4rpvn8uaz63q2s2e9xnt4717jkdoswlh8hs8w351ocbf353qsgjmeglzn9efp8knn2p0s7hs34xm9g',
                        iflowName: 'qieakqmv8jobzw7w0gksob1ns0i6h58b15txm7vd44cus6couzrsaey93t74p7f36fmt9p5g0qo3w8hbfnxpbmsldum3pkssess2wy86yhl4l8uiz90hq315tmpvj28qgr63avsn3o6r3jnp8f5dyioz2e35dggz',
                        responsibleUserAccount: '9szsu7k3qpdtohmhz0d1',
                        lastChangeUserAccount: 't1fv7oa1wc895s5tru27',
                        lastChangedAt: '2020-08-31 13:01:52',
                        folderPath: 'bgyk6zsnhy5n7elmc1c2epdrgy25tusoc3xbxg2fh1d74tq44j3um5uahd373sp4unk3vq4i0fn8u9t3bqr89nxb022dvtwj0u7esu8y3yiu16kxqlp2i2f3l6xpxvx3s62rstrd6y0hbabbt65ajhccyxbewxl5ai6fkftt1xlvqmzw4qlpnlpjgwdbb5deyv40u2m2n801m7eppm9jyzf91nu04pn4c6kv043inlfd25xftcbz2dr2tt53s68',
                        description: 'cimz3m8lccwl37dc2wrjawbi2lx015hpecz26xl90qrxzzkink4n9z25rjuxphefydk5prted05l4jvcvzrkpyulcdki79fm7xhob5gmgpquhd0nur4w0x35lchet0kyh1ar2hf29c05s1k7r9k10968ii1jx7s656n12bq8stc5tbp4irhxak64tc0w0etml9zd6lab9daie2tik9bxgg450lpk5oqy4uboomnh78i5v42lbd6208u6qddmb2v',
                        application: 'j7rjisfb6p1bxlkqp4cfb8nhda050bmmeu6sghwajrcml00qv26ns2p56mg1',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('587eba99-315a-4cec-9a33-9417cf9ded57');
            });
    });

    test(`/GraphQL bplusItSappiDeleteFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd9d9d352-11b4-4ffa-859d-35416571a3fb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '587eba99-315a-4cec-9a33-9417cf9ded57'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('587eba99-315a-4cec-9a33-9417cf9ded57');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});