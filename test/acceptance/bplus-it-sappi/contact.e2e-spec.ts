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
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'eoxh8kxysi25motmt8l85306n23uhlp4rlr29lw2jtqovog8pt',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'f16l3c0kunhpln0m8c0w',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'ejagypnuwf4ky0hfkk8xpp3r1bf7tyhwvp06l5mdfi1ijidtny4rmpqg0d5tm9vkpoxml2jnfygg14bpt3vh3b7h6j52878m52jpkqj3hwzaln916x2niah9wyhemfkh1tpsbsy6dr40y0ebj3geaquk8qz42tv5acgsmzv9u07zcrccy5qbwllgeh1c1k7pxg7rpgmmez66dror4e6tbqenoaiezlzl9cb1ps6r3lhpf94r20fadfpczw0sjcc',
                name: 'j9it0faifze75848uwv0uy2pcjnjz7l0c8u29k3wzu5y53m2ebwmkr8zd1r60j25b1o0rsc94tghrjzanlfv5ruc5x1tpwauj4d2aj5kel662920kz7nsoxlozq4epxafkdczsqxsumchmrynaef53nkmev38k2bu427xtsfwt3m4ch2iyxoccilixfrwj5209vxn813qcbubi8opcj4m74im3hr4c7o4r0o6gvb1unek7uefbuaju8kwpfb3n7',
                surname: 'qg2jigyeuis5qs8c01liqsuiweg4nbfungm2jsi5tmrv13kj4v0do5whar1tdko47p42x1w2kqx84gev3m1bx868ticrep4uw788agwdx1t580c39cvk4vbeh94sjoopc2znh6yrgkig396wotf788sscbp3jqnla4n5we6rjohprg4nh4qme3065477hi99aclpsy4amgj8x63z0kmac0wbkr66zqmboxenmlrpjzgn1pryneip8jmbbjk60rh',
                email: 'xfgz2ysq1bftofmixne9jflue5u7tplpggmk7pe97hxdv8vhmiwkm4p1ssl9xnh7hbr9awn95awpu51j2bosqyxfmuvv6y1sgn1dt91rtufxq2mg7zn8adi0',
                mobile: 'a3km567wt5supy8ali4pc35qesmpk9dwd2bg9uw13i9qlgr3mz19x0p6t7jx',
                area: '3thozvwi6ip1333bx08liuqhgr015xcsytbldq1zwl17dusp30ey4adhof2bms5um49m84args16jpui5unrf3j5xx27xffjp6bp6mqzeh5ttjw7ld9999bk59no6yct1velax6gon78tpq4rl5j43rayoor7q375zaug7dibu5cws0htffvvu7v15av7zbpg3j0x6rv4sls48puoz2gdf4i82rn5v0xtb8qbtsv9ghrfpooqudgoiocrcmuhye',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
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
                
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 't5g4fawla4fbbxq352xopmwpn4ouplfa29aaslfz2u9gdqq2wi',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'g616i95hz7lghtvy9fgp',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'lwkhheoimqg8z2y8kjvmdmo2cjd7esl7b279h8sbqr5xia8a923160krty9nftwf0dkmxtwv6l6mbv7r4mlxeclwa5g7wfzbjhhym41ooyzd3sisg6dqp4hjh7nklnlvsd90niy92akmgh7z8u5utobg8okz4747wn2e9cpm0kisb3clwjxzio4jbqwsckt7eerxvmmm91w0rv394mhv0y2rvp599xizhd6lfm0n2xu1xhshac6hwzs71paxq6l',
                name: 'f347aa1scycgv4gv886af2d325olpwdhhatlg73r4kl3nykvfq5lam7k98r2xd217ww3x1a1ry548yhwk5a3shpr9aetow5vpjund3oieaw8h6b38r9xb7zrmjcyfdblek90sqqkyzy6tlue8o6potmx7moyhg85j43di6tivg39o6c9eld9hnq35ys6b8m1af9zyivog94r8qm5upk83ckw81p27pjy1cldatghow75i4k0h1qgmmihpdxuofs',
                surname: 't05epp7dcotji2fsibitic2w1215xt4dysuamdzp2s0d3j1mggrcbh5y1cqxw2jgmuy7y9207k5b937r5sj48m7nx90cj3i4kwrj7fpf9ljlvofdjkzuynaksp0cne3ba8bpm46hk315px5nk7ebd7wihvuvw69j04zx60jg7evfp6duwktrd5lvqdefjwr8xi7n1lo6v4yh0hq48ku8d0ilp24u2umztvxtw0cdlzkm6kmghi8cno5gq5ww6gc',
                email: 'mltktftkfvzw69ojmxg3i91hmq56r0qrqgpx2j96q8j77s75l4pg264jjj1dvlj7re242j3tx4eok3yy4f5uaanvmj4ul2wj4ls98nynljlw1ruf0su31mwg',
                mobile: 'ec4txr4fircc8lbrbo3rivxj29i57pdqzqucbjycakvyziaxru8k9zkhwzj3',
                area: 'xr3kdzz7t874cp6kwc4nrag5qbjpqyjrrxba3deph243q1xwhhls39z9kgroonjj4qublhbnuezhaz06ybmhsoy37494zcoe9hibkf768cw8jbz1xdhy5s0tdr548qel0wzg239p2a2m5klugijv9zfia021s2aa64n9ny8pygkzuiglgbh6nhtcpv7mno7kyrf6r7uwh1mq3mhycb49m9sioj7vouly17bu3tbfvw5s5g15sxooqvzujb3b2ag',
                hasConsentEmail: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: null,
                tenantCode: '0oybbrehl52vai49gcf76ly0zhc4daplez0bo3piiocnyfb49l',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: '7kzxyy3d9gjqx2kraamh',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'za9oy94msynpjrqtgs6ankl0ioswuy8bwbrpwm5s4snkedcgvn23ef2kx5olx1ar52tr1wio08e392e5u441ocy95tcxk0469i0bn0sv4wkqxxjd4nl3dsjt258av7ilbh7ji4mcj7of2o7aubwh1vhp9kygm2i8hblajdzs6w1lobq4yz128f50mmbnox6nrlgao3vs4jpckd4480e3ye40i125257b2adqivz6qod8h1cduai054tqj5xpy3u',
                name: 'nkisuc75uv053kicn43hlnh15eow43dtu4rdjmilt6lfl93egv1oodpl4ackwp00zsomywavyjex4365otd0uk6duz8zjm8nw1e73qseprasbbf2a8wcjognv25l00mqzgih9uwisbu4ol58slmx004fo3kj7vq29l698e0bz7p3ksxceyzm3b0j5mshll397bz6sytyseazxt7b4mjnh71e09qqqw9wvm4kpjhxheb0nr9ewhwiyiz4909flgc',
                surname: 'vt2xehf3fs38srxsjtj3etulfl6zxd4ivwsfuh5xmlq93drip7ebnlen7bdt7hluwe3adn17x0o31pvgj1kotqe7g1euc1ocxkg27voot46vhmtq64g9xtqm88jg3x1n7eksgjryvybmglaur2720b7la3hce2skf46zeochdzl8jagqgewwg737ocruj8avvwtn8u4qzgaae0mzqxm1i17hz2ecd7v39hqlxb7k2y9e99t25gf6mnv7yox56zn',
                email: 'api3j2gl6y98k11nrm5zeiv6uppppwxpvd0mbsesd5hb39qxwj81ilwe0fys31ab2dm2pvdpk2lt9blm1xhaad5v2r3rqqnl9aovx2m30xpc4hzbd654u3ef',
                mobile: '9qulzzwq4ifmumqv8alfhwwn2kb8d09smzz3tceix2nmydf3ly6caznuyml8',
                area: 'mu0wtkhfoe61sek9i8vv0p5088c7cbz4s2n7lbwhzx6ls3wtp0pvphi27lrqbfu0u1hsgpcx9ouhalrw3p1xwp4ceeaipyb71i26zej5nwlui9n46g4hj2g3cvo67dld3qkh3wvsh742a9ak0ss5n0dng6hamw5a9ck091tpzk8l6l8d3amyewpvcl6h9aa8b7nu0n8yt4rpltp9stmi38ld4k9zhddjdhd45rots5vlubsrcjfv4tnhvqw088u',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                
                tenantCode: 'e4xfwk79z3ozzy5sfzj20oexe23fksgywirmnt2vxbystfn7wp',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'c9d5ix4awqj8lal488pa',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'pt049g2qgfpvx5s28bglmn49jt98yxqsxhym4ixo9cyqpyxoqxw4kxmpuwbjfrsvf4uc9i4yitbiq9as61l28d9bo1ugez9mfgp6sdlgzpqg5vcue1gng47uhd8z1wc0aew1xafa8nzpsilg20hybhbylizxv9ds991t34llta90g4qwuiu2brmuehpml7a7km3to0h3cz6s5tkm0la3dygksr84wpkehgyrjt5qr513fvrawlgf1y81p70odq3',
                name: '4krttao9cyfok7b8yk4pogwyeuz9y1dxwx00zrs8zl2wzz1fqyhh2vk6ey5m6kl71n5p2ar84ht16af7irbvoyzt1j7bd9rzl8pr6f6xj77mtvam5r8ts15spcka30er3ujpf51cwpgqgdy8ni18jip2ei0r52fxfszk23oxx6ucqssotfgu7hzmwd1pcrq62zrb9nv9cakfsv0j74zr9w5ixtczkz23bmwgh5vthk5oehp440v4cnpxtbnpcvc',
                surname: 'ts90s0jwp8iclzakf15diy5cagge08w5qf1dq0a3773qqpda0n1897b7qloqheqd15366rtbzi03kt88tlksozqxqfk04bimvqbomu8ygd2xx4hp4wkeio2t45ahc663mo48xasacl9q07uhvz2sezxbm3293x03x22y18swpaze5mdwoc4fir3cs39efe6jldvlvfi59gzdaspjfoi92usqwugsr9r2x0sy99dtci0zq3t5txg2i1jbrpesstq',
                email: 'nhtb66o4onia5cua3p4dpv2j1yln6f1tdp6222wkbew7gp44871i3yl5y2h5l6fy2qeughb6ydny7487tveezzh6ldo5ukzguffp5v17leiteihgfbd96zvi',
                mobile: 'mowpnfpv8ftz6x5e26aetdvp6x3hg0hbasu3v58cwr5tz0uo5nsykegcv1bs',
                area: 'r4pzmu84zf12gzhm3ll83vk07tfct05ymqqayoqu69fdhxqbtqqm2smar3wwa7dmrfi3f4wp4fk5dhbyf3zubc0xg2mbppvhkd54gpxvgoj0lqrqvq4yn0p3kf0wk56pb3rpbq1wznobpbili2b7vrr70ouxynu9rehv8pfeevxy3y3aey3xn3ifft4384byhglyt0gbnlhzdszxe6uq1oggaqdax3pywmo9oju02xzyxvmwnxlfl464b1igfqk',
                hasConsentEmail: false,
                hasConsentMobile: true,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: null,
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'b58f88l9uyx8xdui3b31',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: '47xl80sg4z34zq9qyq26fqi119hjg9kyrhrrxffm6ydh4dx6t58bpozot7wzef8bzj7zoe1zzykrb8mcg6juohg5znhi80egnpnby4gs6xhiugr86t5h9hbfawqchajotp2s9gigj3nxgea4fs3mtz72ncwcsclylcqjf5aqm8lo89a882p6qsuifo3hyh374q876lx94cp4awuy2i79hwftn7ehpsv1ja1i50hk508dqgs5xvad32a0zdvxq5e',
                name: 'jhsqhqp6znyge0jvmrfi3guof3oz36gxuw6j01ho26espe7xnvaw6ne8mb8lgbrel5jcmj9ym2hn758e8e17tp587a1tmkzhfiero88t6spenjasj451w7o7m19ogpdd68xskajao1lw6rhmw28x0pwxojsw60h2a9fu8hwd9uc1hw9ya5o2kfn4vi6y2dbti96h12sk0tb09gxxvi8jiol9vtnmpry7bfz7qzer13i2s7sdpz8xa88qtsvlx3b',
                surname: 'y9bjzyt36bjflyjlmzmtt3e86oqt2or5vu0d7b7mc3kskect7thqj290yp72ct80moigkttzkia5c5wloiniym35if86ga821luz8qu1kb7p8uj2ig4eb5pelb5c8sr2vyar310lgj70got8psky2wmbyhqu5cqsp8bfy768s8escqjjyxejjef3dpagglqqcdhytxmglz5nnupfzeen47nbbrt2ydu7yrsclntzfhiwydmtg9t3ccnswyqchc6',
                email: 'jxb466da820oko54zoe8chw72b0i0mtq8eieg15c1xrfz7dx7p2a84s6upy7ulrt2gwm4ze1ocx3nrddwl8jdmyr9mh0jprj2xf4gxstcb5zegme541mliok',
                mobile: 'n373hf5naw1ezvxdrm90doqkj9mnag8klbmp3akhkl37v2jn9ter5oi2ooal',
                area: 'xc2ep6a0m8dg8u01c38qh5q80lipzbv3knpozr8oux50d4n0kvseod3isg8uux1zgt7m404qcpsis9vcwo9d4j5qzm9c9gdo7i7rlnylv8vqeoxiqnq30ljbezwkpx0rxvha4bigce3562go6qr1anisxnfaklx953cczl41b7gq66rggnbyitc9equp0t5ibsw3bk0qknyk1whg6s3c3kus55wkyphinz72mj04g74csu7x32wokjx1pogx9m9',
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'cvdrtnzsdzoaar4mcngf',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'wjyxuiz9i8jgw5tuyizoaebm06txtxbtkih7h6xynik6i612i0oo39eqdx29btyoh5pn68nxdvql0y0tlnz9f4qjanshexsw96ymyfnuyez44bulxuyh92ungn6vaya6hj0lp4rjnhdpitn892rfgb43j1e1smk6catna35ulvfz3wnk9fuvo0lnuepyigkp1wvgnwofv88q5wearhf0hg97n6iz74kgqbknbvz5lrydakavzwwxwdfrf7e9xgr',
                name: 'l88i5amfnw4jchlvcmjub86kernmpmn4o67fnv4mrz3du71np3wbtwlfvqsama5hx2i1cjrjjsgplnowr67a4ynarotw72wpqazpmk5ghp2qi118smzzypixqzw3z6fuyzb8w641x3w2f3vwrt1qqs61y76lbqdqnmgyj7h9nhpe5du0whvj6jmkfh8c719mg7wop2sqka5hthu894ndie4ropv2d4sofsbkpnewosd1ocm7pwjb1jv3uoijeub',
                surname: 'r7iogabshl31mrq0n5awdgsoslwybhd3n1wu2jlp27qr2dt9ull2d80qim2bhgfxgmg82iizgo6w91s03gpe6ew5igyc79438utieza681k31znx8p94hsylwa2rwknm8r6g0x3y38ab3abhb8q7qmrfknngefcgh3rrx48l3ugxb0x33iuy3f4ft20teqw596rhyt3ggymaphd8zoyoldmmpyssk1sute6nenziln04p6igzr1cla4fc389ctt',
                email: 'ybwvnix25a8ozxnsp9gjsq251swbrbo7vqmqodmt6mq3rwgkqlf29rke7ry13deiyketbczivdsm95vmucnihv5rxu8n7974eso0cc0zch6emv9s1leaofic',
                mobile: 'wl8z7a4fltuimitixnnz726n5w888ykzarj61radvviwxvqd4dq3d36su8d7',
                area: 'iog3t2pbax7t16w4m8y4l53xldm6pz7xhnklralp8z07ct17wmpliuzyc77e9ecznwu8t0j3x8ipn2knl8ps26h0tk4ankk2e3p4e23fnre4mkfvmg6xji17qrw0alpl5m4eyaucf9g0wy398yrpt4vtlahqdehesxq9yugj6zyxkwcfnmnopnh4hi8jzgz5nk3bo3p64nxccvp60ur6d130itpku3n0oqy38gd93p8q7c1bhhm9nx0v1bb59jg',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'nghekxni5kzinxkl7gh1vrvu2m184z4hhaid9a4tgwzl16z56f',
                systemId: null,
                systemName: 'yaq4lvj2xccl84qhg01f',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'h69igls496u4b78k65vmqpslc6jl79s1jrnkzpvq08bsn6w3omf4jtqxal2gsdui2ac0iwzwojv88t0xlt7yzrj75c7tmy26bnhq7vll5oc91ety2eob4efxii106qw2i09c5kltrpd588slr70wr61zzi8vzxow9mz2vuuaeu7k3ws2owfj6fqpkhh6zrmqf5or0lsp1w2eidklhaeqdrpm0eyq6zkp2jv3rr7ylp8l65la4vktixy0a3bmkl5',
                name: '0qjnna3in2w2vsl31lu9zjfludgj5v6h6wjz534zq9hb1wh6957577czn06acx46yqj4kbb0lwn4bhooh5r9pejpudsa6jeox2z6lbcby7le3358hrf2two13apttalqp0umjyf45ubbz0iqjjqsc87mziw1xhqbgew3c35zgg5kxhuotoycd0dmq75uyljto68xl82ho74ew6aeh3xrc4rz0yryxhrt8ib1fouq85dfjvuz0yck8rdi9zpjgly',
                surname: '5e21o793kfy31hlujynwcy5kgiqum9p63p9czhd6sq2eznk288x0g1vktqik152kb8hfgs325zhzudanx74givdhqth529ns4f90pvqe2if9ymso9z2fgp2r6igv0unm04uhwiamr8qgjqoeey10341dfn2rhzu2ctkcpnc91fha2b67870ak7zintn66acvi3mjkoqc277qjz2fgrp0eahk24bvukt20zbyc40040swtpqojlf7k4g2fv6p31u',
                email: 'bc1rgu4gu455imdox5smrmmna6s7owu21lguavxp4xhaemfenph5qg4ceiq0flhqdlzeurnun92vb4zbfd4m6b3f6p7sx9ox5qsn89hfg1inbfahl5cuz6i8',
                mobile: 'sswdvhnzxjxrrbj706kcs7t1fe6o7hi45h7wzvonsioqzcwawoatomt4aqtf',
                area: '74s88wejky5fkdhaph6dikplz7k95iq5njihzblxgy5ip53phq1rm4o1e6gex7fxmlm0rzj5i1f54osh2fesmu9b2fquqzmq4kpq05ncu4idhxbsk4p2l5kef1p21my8kz3u7mrp9qo88spp0fwoe8oahyyngkyoo3fc1iqtw9k3wgjka2gbdsms17qo3iayb5txivk66j5dsh9p3cjka3psumx6eo2fwxyt687w9llqcmkmg4ow8g5ugjf0ti4',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'uekwkysvl0hm4g6pqgjcjb6mfv5am89kqboxd1hbsk56fkif97',
                
                systemName: 'odftaby8jcb1q4399fek',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'ficrdhh7ypisd02zisp3rnowvgdf3d4ze8h7d6stutl8b71q5czls2uqbuzn5pa1we906nndmwua0nfpkob09fuyskm3yxd562jfac8qomu7ql75bygl0atopdf6foyk2oqoxyblt5ukcxv4fd6i5n5ixbtojz5vvyyqyreqbnbf5g0c9k4hg2oykd4bti0qp7nsbv8f4dtqgbxlxt1e5ghx06te85bdxrcdj4022n4kk0txh0i4hj9mc2vvwbw',
                name: 'y535uxkiunf641mkn4qrnepve77ps8vljq2quf2k36bcyb6lz96r8on23k0vyxd9r854jgbh0cd2o3yseeb75ohg575elhkopb2fh4niuj86wshqrxaspcz7kxiqbhyrcew2fuxlavgsh6u350cjyggy2x3t9pndiobvzrvn72uc9etni1217mdcw0sh3bhtsjta0oztg5p6o87z1td387opeojfpt85dgnmw8n6ewp2ih16sp7a1l6lf4tt9tk',
                surname: 'qji52t31ro1al7xxrteq0jvkhxs0suymxdt1msi4bu637r17k8cne135dkxmhvjhd8t4srivavpsm0oqxx97j8oa3gxh2k39h2teygsy0zdtmkz0hgu8n1gorouh5w8dhcmqlyqkhrgbdl4gctgopcvfbjzby0dgjtp9zvnwg926cg2sofh4wf8ea5x2uog5n04b45mqoiaklluyjyku9qnrlcdquyxwlvoyv11pxp4s33na16mt68k42nn3ols',
                email: '4njjh36o4ddqfjrva20tyuvksc7d7a10rb4b85iav110dgwz79o7ynsvoan3m57a9atgfnjcok05q54kgrhovsh0t0892k3umwrjwwtwji7s35dmjypxo576',
                mobile: 'heaggd0qxipaed75sq1a4p80krfh0kmts1con7klbygy4vshx09wutbsvjjd',
                area: 'lgcsa6syeubsskyatuxngqt1v2sxdgnseam892v6i2peboidcs3yfcvm0ww7q6jmqpjuok8fnyh1l1vp78qk1nn0h9z46ivzdek7wtis639uxi4e1rdt57dlyifdlqmo46d33tg9sh166popho1ix5wr2g3t4fvpa86zcikqf83z9pm59hgj1dh78w9h8l8iuz40xoutb8qe4x41a7wjv6hqabkd7gdlnigbs3seu9ktapou6cn4pzbk69did2x',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: '8nsv8kdv9231avpzcm0896nwtzqz0mdaj9dqah1n0xrcoitwja',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: null,
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'lievneld5h33vvnyvu0j6n5fz32upjxzisesnqsi1a0904hhw9vjiffaj69kq4cpiosw0r4qgruc9aihcb6s5uyr88h8fb7of9ti6o4hzxbl4tz8tc2eirkd6zlq6mi32semh6soux2ok83h7sh33uy8a8ymux8y88dot39h2og8xnj7jd1wa35ir30ljvo5isis0da0w4yhvbdzzx47yb0k0e80xw1wjqyyp83xxtxsywefcmtablenzj11d1s',
                name: 's2a9jp789fztq2x5cqmm7rga82otlm0eupk8jyvtqx2sy1xtfahxm0l32idvm2p7iljofgql79wouvibda614aqudt2mz174g2poc78ygim3rpwsujo2j6o2h6pxyjp5lix2pzp5bchsn38fgzc3y1ulw2jtf8rkpyx78uqv0fd4p5cdf5ulyom8m3pv800y2kq01xut5kkivgntcmp7m8uufcyeqt80x55p61nppwvmee50jksksta64tv8dcu',
                surname: 'sf5qn1i7wb3t51s75hrg5p58i9okipavtb7220hf9gzqazmridrw9drfbvf2fhpt2375u7xzxb30xp6yfzwzrayesj5zb3h7nual9vorn1o32170ytds6v9lwwaw7z1cffgk4z3jh3x3ng7w46uj1suo64p76g8pz0ufdjzqvd1878pfq2jmfwk763jzlkr8pnqpo0hix93crx4kwt82mxvieew7ayd8siz2w222lnknheo7fvac0wtq36db2er',
                email: 'li8jknpw7pavjn0teuonw6277f15j9xlnn1k0h7au7lb3r1mxafu577zaboo34rui68bhf3yoqn8orb9nd4y85t6a2gwspgzcivi2xlms341d57qzubkio94',
                mobile: 'dhyt80276ons7v505zg9h0oj5mfg2sgpadg8d0e9grf8tq1fw6s3uhegekx0',
                area: 'ylznbwufp3g7cjcx42qfgkqe2saixqwycc81322u13wcfntebcytluxvqj92mx6avt3j7fqfpdln1btijj3yb8isn0a07r5f3zczjwiok50t3oyarcob937u5vymgmag2vfnx5y59ycz78gy6ncvu5u4tdyr7lf95cwpkw7yxvquf61d5du8092g9x8xt76egcpp57ir0a1p1l3gc06xefel5khas8oxj5xksce2uz3xyoxxd0riumxfjhchdie',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'g4gxxlf2te6ebeu4cldknkirysolk0hf8lao7ttcxurrlhnj4g',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: '3mz4xu7962gay8l3t8786gsr72jful3oip9tdx91of1ccyj3it97mi7w2oyyc61c5kfso35kf74nrgj01w5daqnskpbwsml9s1oezsu7l4v58z06l46vtbpblfgejn1wd44jvg49rhl0jgpazar5nkm3vzrghfe10j4alwbdjejfg2kdux2aathiqoiuqly1nyg6ehcisopsjksvca0zaul533hxo56s8opzbw1rc0s939dj17ncav3mem4cojv',
                name: '8nn2gt114v5zspswxsrb4xataed06baw3tor4ek2j7shbtzab3zkyfg41awvpvlcxff9zh4u40q85gas1yny555by4oztvsh4z51yhqoczptw9ofc58n55xu9evf1dqfxjpibmyfz00j5eskv99jvcxxsc3myqg0vso1brdt6ne9zalyiz2xdt1p6nji7atlmfo7b02i1zxjsmile5ptyncwyt23vqm9qqltn196dzp5t3xb901le8xxg0fpo5j',
                surname: 'am5q5mo1hjbn8erb082y55urteluyp57j1lq4ox4nj0a8u8znkv8zw3jysa0s4z901clsmizaon45rbaa1nqpfmmtsj8pcboshswx9hpf5wutlx0ouchiv7l2284b40vbpcyj5eh6tl1510lcuwazeaxvcsa0qon5swh122ub02bjgmx6wm12kfw164dwcy2saft44fr1e9jqdjq42r06oyawgg8idw1pfq96yb2l2qg0obku5p75r3cs28z72s',
                email: 'bowp9xpagec0cqv0kgvqrg2xhtpdtag59zlc67z2hmaun85ivmxcbwri9s2s6taog8hgqpb1t1sb1butj7z8rsu6o8z5q2f0lv5a7hwjc4day6ik24k5owp5',
                mobile: 'abuqy715f5mo1tb907bgmiclgybowm8lev3gnxkv7zqbx4qakrt6yntu2gxi',
                area: 'ocfft5ur6lysm6x6ug06819iv3sp5xu9ywmlbubgspkjyp2fs48jbh3xu5jd7kqerbox13skzjl9cfsoriiosa217eafjemo872pn2tbspqyi2uaqevqsye2aam0xtk1qvblilb9j4fk1kp6rpowsthmsrtl2xlmas3ekhbdtjm0gyjojjhkxmsmnhbunhkl15yf6h2vjj6f6yw1gwkx63pk6v0le28wgrzggv48a3vwg3ofeu4jgtbqpp34o4m',
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: '5qt1wnpf4x799p3pfkjeatl558yt41lx2hrwttezy5gk0wkzmt',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'fh1ng1qizsbgmtzgreqp',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: '3s3hoslj3oyl4kca9ulogjofu9s1guc4bnmn5j3osujb37kinx5g8rb20m4njwpkktdmfmovd4uzg0tbal5ad3fxemo7c68665zdxviplys01qgb52s85cfdmu06s8h3pjyn7z2lr794p0hgtpz0lhg9r0uc3j8nsuxz0umx1ab51tj9xjnztihpaqasvmh9bepkts2m7p39z5o5w8krz6ljc0o17k3dtnqqhtqjuavkcodb60ja31ab2c63izp',
                name: null,
                surname: 'scwrvwmodtakjnrppa2ao096fg9942nq3ycd8ahac46f327ib7cb62x65uuhu5fjm4juhbdg08zhe7yxooc8oc4flxhnisvsgyz5gercgs70ioljtgywl2u0wnq35mhuzv9nbjb5da7flm5aq7ev8y0wczgq5i5twcku41o053bpl45io9m14gy4qjf7mx5lbazkq235a4q4uub5dcy8qxs0xy9we79b9r8qnbzsb61gwbp7cooivtx4plslppw',
                email: 'vdiio5ax8lckk1q78jvxbk1e82uacsa2gzdkbyby8pi4vmxtevwyv5dye7ppdmpi1g7stc7ar3mwcu00m2pujd7alha03vyhvsd9g60lyd195s42cn7qsy1q',
                mobile: 'ncw0gxg6z1h4b2etrxgrp8vfwbvgbpodlo1yrer5gblqfs259d7ljjlgp83n',
                area: '78a962odp55nwtwlmab8ai25114kj13xaic6cfahaql04vqdvos7lyxhbscqg53z9zpcz2vzvnpqb7dl017gtrksxcsrgf9edqahjx33jqobn39c1rb2to7o74i3arpp3idr8252h1iuqw80sacog05pxvr19nl7551lqvj2ziy3ugjun2i5dpa4cgcjshvjkj47w7ysnk6r1yhs0dof6dcm7xaj91kgl65evmil0f1qdo6h9h26xdtcxhgyshb',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'n5kd8c4o7h7ehsus24r7zp2hu4qfgeozeh1aa7ne3fg4pfuii6',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'ufp8dxqgu03v49jvjbw7',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'siriockmcd6gv40pdh8i201dondoorolh0jpjefa4j43zjqjajqd1z96tcq4ypqi1mqy41l1nkg3q26qm37j0bewym3riyz1zhnrizpeefl70ddjpuzrmk38ll90rjfdzardl03gbnq0hmoofc6lknv4v7mlciweay48ad17affiza0ft65dtqffcard2i8dtlwwmeg0nwkb5kykbmd1h9xegia4sxxjaj7hz07le5oq2ndxqtny0xoya2m1t5l',
                
                surname: 'rqvoq6lj2b3m6qgm4qxrmd1udmdmeddtpmgkfw4mgtjswzv542du5iamn8qsjha2r64yhthm22a2xf4osrljnvdajeb6p7h037zpyh9ywkca6pxry3tkf348hn5jioi8u7rysetv8gr09wwvieya6b04wbyjb2it0e66trqkf3i0t8auqe1rbqae1skwkde7js26npm85aq2a2q50izvih8r8xlmcpp33rg6th6gnf99tv6144f228df5pzclyx',
                email: 'vwtj9oxpafq3ng7fxfqstwqhcel4txmn0hs9kedduki6nr5xj97juf2trb3oubonpev57zsfoymciv4mhqs7k1az4c150fui1xbybqxkycgjgao6op2nwe1q',
                mobile: 'qqg2qadgbcc4qup9ptsqztignag3tbzq4va9hwf0xns0zgnv1266bdw0z7hb',
                area: 'jm8yfgcf0n8nmis4ym31nvlvxpcbzn8fnpbum5gzoi0gws9m4b6bvbx9fk1xadchnp0wp5095tj6f7wnmbfp3gcp085d27f86ogvp8h9habps55st71o1cev7fkckpej6ep77kxdckr177tbmh9k7jfex1texzlgrosrx6vphxqxo48canhsyb55alwm8df72lxokffv7q56tc0792h4a69h1v03oie19zp19schib5vy4y3i1f7z06vvtrjdaw',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'z90tawllcz9yk3wxmjtajrqn4phk1o1niqc8wva1pi8r8tlfk7',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'k5ix7s1d6m8z628madq6',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'l6jm0bzyygte9ehfy817itovtctno9v7bs8gcuk2pxzpbx90omm45v1awzuji1245hf4oa1klg2cmtmgg09o60zvel398ee1f48tctoucfjr5xyrhv2xa2n0u2vn5im5ccr9wnyxwl9bpzo2c37pfg8lb43pgvc02xcyw9zu7o8odc0bwnzqw92f5x513sscl7ekaadeajorqadxg5p0nd5wimjf8bd4hw588nhoacdhdfsspje51dcl31vlf72',
                name: 'mbl9imlcgx5sop1sb2dp2jjnzvnui5e51wbsxk9ntsshkkmro9zo0pdzl4p0mu3mopdtcf2p72qx37a3mby9gbrogcwotn4vl5n0xxiwkj8896w1732q9vzgs1lsf9bwb40pvu1yvi9klzbgo979iylqvw7zkregep4mek0n0opndqpahpv8k9b92httl1ue9a19q2skq4q5rarsnfsd7fsxm20xe76e5wahjcdogy4a08sdmn24b8y68et182k',
                surname: 'jkrkzal6xgr2e5ncxnhp7i984zj66blk2ldt0dbqg3zf3y52gccrp4ughh8mlp8ncwtxf5im9hgt90bukmxz1a713glsmh4logf08mrnd1snk3dhok9tb8d90bemeecx0nirqrhsmnvvsbiu2yt4wme8q9cdnxsl9z74twhf4xbeciee8zo7usfzk2viuqp0c48bg5a32px5lne34t4zt41j3k68g4grusvronhe3szyabkgt9xtkvxxq4ln9th',
                email: null,
                mobile: '7dh8t2uycusw7gsos3y0yklgenhs7gf8igyl7768zc490kjsu200h5vmzw0q',
                area: 'bluhwh8l3sgfblzt5j8ya8u1wzcdrmhllagx4vkzml7lg9yweb5dgwvgoa036o1osi8jt55v61dyzsls9mnwyvds2dt1ckuacmgbrbpnilr6vmqshhyxahxlumr7f6lf67k3qhu8archbsz1pwo2qw18d84pumom5dlhxyrym1m3qvm5iifg2kb1qf90395f9v4vdxpia8tpn64vkvixjeeis0vthr4hmcg3ck838bjf0b8oi6t756osxfpmgka',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'lpsucgoke67kzau60x8telpn0tyizjrmbxd0g4uxxeo9cljofe',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'gexmj9nhtlcngqf6xt7q',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: '17ue28gsir5m954r54htydy5nx6u8ptk5abc7cznuzz8xolyasgz5wqj462qllweyu75j553i7k716kzhs2rmb5mndcadgv9tjvnajl0ufarmjvs5zqaytzjnyeq0obk6oowvrun45c4hhozaobx2dzq93ojooaxj5gcbc2nl0sx6ppgrrohqitmmu8q3y2ghlorx3hw5h3ztcxrrqx4dh753p0858vlrsl0sjjam1z8fuc2v6bhyb85bonlyqz',
                name: 'mc1yggsue8akdss9mc0f8clsipikgp57efac71uzbeiofvp5sivay355lm0x6qd3xq0hhasjj41o04657iagvdmbb0i6f2cqtqb4l7t8agjlah0b17g2wc8rkrhi26gfhzvm242mcfsxr3nqij2c0vojzhwrivpj0o0r6zx2msftm1cqyv0ifbi8tqzz0ifn5yn1x4i097gud6d5mkatwaq967yo7a19qwo1c6jhs0gnlw6ja0t5yjgoadflhmb',
                surname: '9wsvcywouu8rx6sx8t7w0amfik6wkva714geiicp4f15v3v4j7twvuobhid9x6rclggv9yeqw3j7p9g0e2n5j8okza61h8lgo2vfrnyppdrnwjbsozrc006vv17x51r4jfn2ta1e83wjmv04ipyk8dy8p88pw5u9qayrfic4u9c0dvh8f1z8o6kurn4ycwbivpj8b0x60gmbkqpwe1em46hx10bqco08zyzne051x8yux5ukcn3wwmqwjlfsk5i',
                
                mobile: 'znknjdcajoqrg8umlxgi7jc1x5okdtrap4n4sldb104vtoh4q7ugihdm6er5',
                area: 'jcg4xf24y2iygyx02xxgurxhkeve9gad4u5j7uqpxj2gymtszc4f3fkn0o7puv1zsb9g4ajdsbrx2ssy5m4duknvi2l896yl4m30b6w5anv8u8us17zldoygb66ozytm7xtm3b2oavsdhj2048cpi57b9pzxdpnq1iiyol2yzvyl7x27es8br8yk1y96562rthyrtfnzpkayb8azhbbm0jdl2gcbb2ufvlsxvpsw5iy4dag19e527robgwf9njd',
                hasConsentEmail: true,
                hasConsentMobile: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'iv603bjc6z3su3j95jv5r3guvptad7sbbxilcmuz3ikuldpjet',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: '3y7tl1novymx5u0hmkor',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'jiivuk6e66xork8bhv13hruutlxmrqcibapls8xa9xq6fnsvl57smxas2xxwqo621yhp904vryugteqqf72vv95pjgn8hdtz0kkxcwwq5wwjfoh7lsk3zkho6klh8sc5xa6t397pdy0wqefr7hkmzf0q5eo46mnhx77ureb641vzx4i3epogqwwdalbksa5ar6eal8kj4mu3krbhkahd065dbvformu1tmak9at4c7zfiuc62avwti9p0yok1xz',
                name: '0qdra8wpifvkfk51svamb98thhpjibwvp6rkjp6qv3sztefz3td9sddppuzxqu9usm4merykzg3pd4brnm2p2sq7qyou7co3i2h6e0exwg1o32k8rs8sx2evo7wdeao8iuzsz5zyu0mv1gs56e9vvifffvh3t0qkuk35e2n56not2yg6v361of43dieh1dhmffldrx8kwv5h3ccegznsctakiz5hgmyycenv5ljouxzs15mjuxe66tt7jhy1juf',
                surname: 'z6awjw6x0iwmd8j71h6uasi4ttvnbhu3wq4hrma2mj3q7kvjoaxf4671thcmsotr1zh5ytc9gipoqgii1b73dxulstnqhbni9vl85ybaar4ezotnggsqk88udtinetzeq9l7k46gb7se1di9a8sj05y9i1rnpgs6yiri72yn3mgynl92dpw1fkh2vnxu6ssh1964zquox5m9qfx57o8xt2i42rf3iaizug0frwh3bxzj1l1vmbaq4zuud7kvy74',
                email: '4gkvdfr4hlqkd6tlv8azou4i7yqouj1r77yexyeiptpikuqogmo1p4rh8qcofcid2d2k9zgiqnglcc44kw4eb82soxhqjctnjpv5ycmfh3w9rbe7xjay0m8x',
                mobile: 'bczm42hfi1dea5davgl4dpd6xcuky7icuzwmw1pmj3k3fcx4pcdf2kuwfvns',
                area: '3r292urw4zkceovt2jnbmhqnq444y0f947tl631ndv6emspbznlo1hxwuktfz4it3i7z2vgwsb3p5tazurk330zbjtilvit042xbuldq3fzh0ls9o6ifa6cejtnwq7oxyjx0wk686zsniyps7gystha2ixkitxpkpa0j7bd3vt4lw93hpe1z9hqh1b25lqma68q6303tiy9y02huct51uyut8j6yg3pddkymxefatge84lhn3kig6b27woad7y7',
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'ziog9zvtqu3s9l92gl5fu55hb8fanlqd2sgqrtau5lxldgnp6p',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'ebauncgsocnsaotjfypb',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'gylb05kz8q3vori7lotiherimzd1rhrpqsl21dluhf5dnwdka201j7sj41wvy0nxquj7x31pzl5kq422qypmkrw1q4sug215wtuakwv283cwxjum85a1kalns21267eptuhm7nw5vyz85natyz6gpjwm9v4i873iknl3yz89itha6ui9h6fpk84e1kp7iy3fg0r6u5v5d7fry4ljh16c7xupxrc7ioqtf5wak542gy07fj4hbwlghhy68fcnksq',
                name: 'yzp7kcducw3io7gq0vp5pg61xom940w6df1sldrrnhixkech2fkvz5dj6bh3magx8gpmd9inoqrrebeb85no3oksrd763fxizz3pbg5nbjqonfv9l9zv3yk1d9237f8y8zz5gbu2hjhkmxp0irvoxm5qrb3tbb6v67l1w453ucjikkaq8shlpc6l9pkhy2roqlwnyhz3q78vr26b966mp6fyphjcke75hqcocqtswmrcc49fl5dcpwrb08vgc4m',
                surname: 'czjpk35m515qdnb2a8w1vdkzvbvbly8qn37oem7hv4bplw8eny10bt57myqx13mvbvvb4xyiqr9ry943f47e7wr9kzv03575q5fk483ow97j9e54dnw1do825pnj8u3edbh7ou57g4kkh6epbuir60p0mm4il90xxkwhpayxm5iiqrydamircauezpjin300n49mt29lm5oib8pefas5jhrud9q4jm9d67ruhwmfh7rfrgzbg2bwl1ka4dgvvwm',
                email: '3q56wmdyys0ai9qopo4gkdyt7rxg139l8chgpqkad8ple4xodo7vxmstqt95kzqh6gccvm5ereuz55jqpxlgp77moi897phha3edg2ak5j08gtk6ehg5ajjn',
                mobile: 'xvl0h4uytabw3p1452s4u9pkwesiethdl11vvhpuqfw81yagbkva4mtnet9v',
                area: 'qwciyw99i1ig9t2nzgmvcu0fdrrl6u75ta07efjpsjn3nsbqz5obguvhtt316zoe3tw2gr7sz27qc2n214yy9ydsfcm81mad4ttvd2c5jlko3snjfaed269smil8thok07as1ownwd6rczbcqta8ydc6546lq75oc45qdpqgwhdp0ldom0hk0p4q5lb3y9zy0jt8qmwdoro8q3ip2gen7qeni83ku9wqfw6uss6jv666w9gv2b1b1z171hiqquu',
                
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: '66dj49hua74u9t90h6hc82mdjjnuwqr485owstvigw194i7kv6',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: '0secctw8bz5jfwt6uggb',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'bkgnr2pcp43fggo4pn06n1al8fvmdxli9ksuprxnlfzn0ob4f7tb8rptjqzhezvm36fh8f6jh3cygs80onmlv92f8va19ourjnawk3m3z1cswhjm581o6bfg1ihu00i1m01ax61g50kwzgxtp2hoy2vny6856bdu5ocfreb3waok63hbwahvvrau1c19bc8lkxw3kxkkdguexz3n2q8hzuf1ts0bb25lge1zklf340lwio7mjj8issmmvljjac0',
                name: '5hztequoieonc8xh0ijfxvi8mv6gevnkes2aarq68f5oucuum6hp3hnwckj2xwajh8flu1gcx8pszrc8ckht6ha7stu9c7updisq14pef6cb6yzfdlsl25utj2zpoiqmh9viznrqd38i9v7eg647210gxdlrlcpgd3ohb9w531s1s6i570km1x2muvk5ofrwtcjipvlhqnwcytdfsk90k12f62218p0zigdbz8eku2165x36as2pjhv7x3uq862',
                surname: '2p61got7r1v02daepbho2rh0e6llt5rv9zcjaj1e9k1sch8g2ikuee81je7453a8f9fv1nisoxc8hr1v40c5sq9mamw9edktrcg9rdxsk3sbn38737wdcuvzyicynu0hscanmqfdaxugqd54hj71vnnedyr2ds7a18bqnnoxzzrploqy6k2xe2y8ssr5nibbmvplcwptqh0v1cljdt4ifgzeoqtjruwur7pplcp05yizpndq0ki1d9jjzkrbwi9',
                email: '0g9dvmq68lj5qeycoiqmw7jerr3ds4e20m5ohv4hcdiq6038adcettmo672w0qo6x9u5tle6ecxgxylkvl3mhrhz0xnz8gb88otw8bgpvl55x8po1bfzgusc',
                mobile: 'yhbtnhcvz8qbs3izageb8kjvxrvx62wpf9q9goaavwdl6e84jeyq863qwtat',
                area: 'qnmxujog1v2t6wk4skk8la3aipm5j1o60rh1c0ydxodj3i8e01b36886aquddqk435pymk3itbwrrm82c86pxm5klugjsf1kl2oc5l9bawlqnhpnst0d4h1jdgnr2ba8fxut8qcmpuo6vupq4nja3tphunml4kzc4u1hpjbiq0pymt6ypalmnnlqar1ywzj8rl7tvrogd927u1u9z8o1omu3ch3gn3jrt6pbpal60mzg2sgsyf78g3z7f0ctfg7',
                hasConsentEmail: true,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'aaetqhoo0eb9ozg1m4xeh5q4wi13aco60nhteakqcd9hmrcjkc',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'pnzdlg0237qek8uwcfqx',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'lek6fwkuv309orrdej2efx8s8gmm6m9q9hnuns8easj3v7yza7uk8rnlszsm6ni7aunjzwfvai0x6h4tn5brajjuq8q4zxpeyuxpqwu2hxixlbyv1qdgi4p92dxotdklrt68mk9nprklkx3qtsuk5s8hkl4vg4u8nk5qkba9roih2ccjrmxvx1arsufif7eojbc9ediat55pqmh7zi853wszyc2j9if36ssp6b80wdeaydl7cu7nrp8ntyckam1',
                name: '9027d44q1ctbohecfp7436vyv4m5ei64wyep3e8kk3zlcb1zanktuhazqpc4575p5nc2il0znzthpvqpvdqkzcnm5vbsvbbuiqazaskh5u9h4dxgc3kokm4mbupuajx1o0qjia03yfxdqldidbr66i2cdm6jphvifu17cmd095m04q9hsxbhurmglseyd29icuu9o1229lu69olagytzgmmbfqizqfb8ryx9t9srj555ym5rkbfpx18b1v7jn7i',
                surname: 'zq00unkmdg3t6lisi2q8ql0ydt8g05b74h88h8bg54ajmsu3diaqr8a4y1smdoxo60za4dvsbi5nny5fq627g8497weyw7err0pau5v94smedawxop886yxa7rp57xeq11p9jjz8j3nb77p76gohat5y4wu4co0xcp7gv5ldyocddmpmcgz9ozeo7ga1hamnjiv3v0k6wrvng4k8k8d93v0snyvs28udhzkcvoth9mu0kh33afnr5ltkqs2mpu6',
                email: 'jl33g3hdlk2d7al1hzz3blbw5vywshz2bmik8vqcq2pzg1yu435ecqxudi5xhtufoxdban09ajpfegsijcsgzi5d2zf4o0wgvjdq9updca727n1yc1t4rfhr',
                mobile: 'p8bhwt3amabh3whvw69zf1qbxvrsbm8bxiswxkdot7z7pfwsp082nkgvntn2',
                area: 'ho892mw0ec1x2wheyu5dwkzz2tcvalpbqei4q4g1cpryyf0osktqv5yyynf4lv650qonjkooyzyfe62zwkkg4au3d0rkx88enpo7zgxc0fw29hzp8o83xhed0wj365tmum844pel40hfi7fijmkim3ob9h8arzglojpapii5m3gvquth4m667wsqe1wlasfzhs7o843l4l5pm69m6ml6dkyh2g8i9reukmpktcm7t9vmw70m881tmqjo0m2fw5j',
                hasConsentEmail: false,
                
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'p03lsm8h0ka8mdmuusc2nj5rcand5b9tf7rg2tty0jij1o4wk8',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'q3jyg90xrkbfd0mzu1mw',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'cgzpiu6f7quro5m8k1y1eidycythx6xi0ygjbtumsggwti2e1zo2b8tsickewt0lix10i56v2or07cev9yjf63j0tvwk9f8lf77grcix0zijny6lua7cl29trydtdnne1j493p1rck31dgkm47ua236bsb8qecvefgerxp4shleog6dsd90y2l16etjhoockb7pzis1oiaic5hoed937lg3ew3arinc7kd9ehaew929h87h8npqlanvw5up0f46',
                name: 'diek1p6bycqxptv4xxrse1qvr4hdok45398094a2dujvec96j0hss6sul2a97fpta8i0nvs39a0jr8jn53hb6vwzb4b8e5dggu4v1zjrzxr9qtp0pp0lwz09k6itgvsxv6e1jcy615hpmunqpofwg6fuc6c3tv22gjvm4phztnfchuk2lt9tzohxbcb501smbae1la80uj0d77uolvp4fxw3g2w8a96y49okv1c016xi8nje60gdloyhaip96n6',
                surname: 'asyq0fvd6jcvkjeo6xwaxl0mb34w9afhacs2bhsdgllfh9edwvtvs8vxtuk8lk3petddzo3h0d4fed3z3v5bcerk2o6nftir6mjjfkkbfc238ond2fgvtcun5ueujr0oe6bdxuxtq6axoq3wd7ufo27tthgashe8t2f1ofazmpq5uzlm9jff9udp5qkdqf7zxc2hx9csngi0o7qcof0zmys4bexl4y53f15uscl4if44oe2ec6eu2zx40w03ypa',
                email: 'kxjcuvg5ldojs5a6u2hq9d2fo7vl5z4216ile7ryept3afwgo0zh8asprjii86m19nt7t41csundasymd7pjcjvdff4nvegnqlzg46ssarj0frm5oky4p35u',
                mobile: 'rsd9dqcymioprav679san1cy8171vr5z4yjgfqg2nepyfbzwdttbyqp5cl98',
                area: 'vk0zwhhf1u5k4fymhzafb3v4x4rae7yw8yof4kmm34kovlfhynvuug1jwg97msktve3iouv2rc5uipsr3ozi6c6j1aw1epvnwggcj9kfub5dzs098fs3h356gjx4id9kog7924lneygvy5b67pmhq9w1o2n4i761uv6ruhsmh8po2iywvvv9hwxusqpnohl0dzimbzgvsfxo9ka39z3lvbud0t25cqdtt5fiq7ra7pr7kgtk06qe133t0ojlrsn',
                hasConsentEmail: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'sojg24cfub8eahjn43h93s6execqvfoouo0vy85y2x1ig9v9ep',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'xj32w9qpb1osoaej8yiu',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: '30he0n1m8w21kwi9cwn4zcrs2cogjcwc4a3x7kuogew9xpbermfmlo1vfuqqp1gt8uobw95b0a4ly9xl9xetx4p3o85cad7yn2n884drc4z0gbzpum8z95nhc0qm02whajeugynhozkc6qwvgye8iiy1vcfh1ehyf6qycuunomd0tc7chmw1mzfevxoeafmq8xwoebn7a04ta68prbe67515krulq0jjubxqneuo69nn6e4rru64ha3nqwkxfgs',
                name: 'hq46f946ityup5qht2bgseptlmb6ra9gf1nnkwvhdru0v2009uyc625mr6gn7qmemyjlp1jkmiy1xowsrl6182g0ojvru5ex0s3pw4zu9ryqv09r7r4fowo6239lfyit4ls4ry8qfuj665yrfgil7xc8pxi9hs48ivgybbqo9eq9g6lae36vqisn4egxixasmvfz473uqoztonjb07ei965w8jnbmjf6teirqy6g7cgc2kk03dqwmfocagph9uw',
                surname: '7u030wdp0jnacpws9apu6nwoz8dc2g48cud9hxj98j3og7f0zqhim6jb34yb1vmlt0opqbxr00fyt9p8h202zrotpufqk7zxee7daif0gligstzl2dgb8b8gs4eb9uqitt2gm5vxnjcr33dich2m4z5gekao62x9cu6a26d18ig2c2s0qqdy244mmg8h6y0hwdgsiq5hfihhfn534vu6tew3d988iwz3kk3rav2bpelt4hldpjgpw36x2yhxxtw',
                email: '57ldxazagpzpw1wuphzq22mqfp91nx5zwa43y34469826moy6fkcea0sfi1y0lv7a1zxgcydsq3313uii5ux8u1vaoeydjdi0adrh2j8v4ggfa2uqshrmwmc',
                mobile: '6hbht8ikiesfv0o33xhfec8wpynk3qe2wngqfh53c419calyp8irpuofny71',
                area: '2gebvtueufk7j6let19ltarh2oq4figgiu6545b3ukjgyh7glbgy1yk44l8b83lix7ogagdn9izq7qbu8n330fttl0wpo00i0b5vspi9twgmk80unw2just33gisi7q49a5u5mis154nwz1v8eu22pmab70ia4h4dfv4zx93hafovh1ig01s0r69sbtz3oubgl0y53iu614wetp4csre8he93jdl3uws6s772qug3ti5dkov1psfs9hc54txkrv',
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
                id: 'tv8xqkxn6knfj55udd2jhhzksxb55zcoy5c6j',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: '5nrt5f5cplw4x7d5fzh1rcigeuo3hp2ecs17fo2a7of71lbgky',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'ol6hitw5a0s3d9moqty4',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: '5t54p23gxfepp207kwzjoeb5lchaqr3ozfgs1tmsze9bsig9tu3d1n7bmkmicn324iewn1y7w8z0h6q65muy5hcjowpp244iyvl89ntro9jol94njut12d7smp9vdjm20mzm8oa7r6dgv6mvo8ze4d70udvabpj6t3i6m5rip68k0hzc589zhh36n9asje2626qnddxc9l6bokrmr9fdbviytwnam1gy8k4fjyqlcl0ykkyhcau5mj4bzntt3g8',
                name: '7fhm62te36984wq0ragdjjck3kokkwz5zw2e1ltqm9j9urrbagg542v9cwjfdynv3giod52f61ck2auitp9zwn2pz0o4fh0xcgsmm8oq6vrzj0ydsna1y28cyx8zyx86ysq2b3frjf45a8ipdrhpbuxirdorj6rhv05ge0vuugfchpaltsolpbfsdb6x1pcrqvfd9x6su5qu6tjfysds1j5ey6suo91fdtl9jovssrlvypmpgcn8uaonig8h6io',
                surname: 'ub366swqs0s83aht3wjr4mbjtwfml77ctpg1ex5lbab3n5ulxcfmaxb4wyydewwxfylryeddjsjp7sfd0pebt21vyu4e778qbqyqdkvysbzxjof1vb5jj0vrxbb0iju6xew3lvavwdx0kiwgh4z8l7sco8gxu9u14gtmyb7bs62cvp4dbdkjeo3tey3a2mznv4ewl3bluomscum49p9n5lbdthuwgt5u73kxdym61qyy6m23s4ofwgamfwsreyq',
                email: 't8ks0t0fmet1evywmcd43z8iyqnalx285s232re4k7um3d9v1lsyrjghulst0evmmuzfs4wbf2p455unmwcson5bq9zbj39iiwryhu7crdhj0x95ke3k59rv',
                mobile: 'ucfz9ns1ec86kl1oj23sq8tuwk61lxo8u0zdsp3nigc803v5pgifkwkrmb7e',
                area: '6ptn9c5w2lnhuy3ccvtsmj4chudeq2xqb7s91xk2hgxsrh2em7nktdc4ygqflb1wkopojbc8ft63j4j1ni4tzpw99jrpcs0u9kvdqqc1s9zn8cvr6tukhervzbj869zd4llv5lxvwy6b2unqdcaa4i2se4adorvtb4q0g6cdmppsom252qdiyfd2k9w086373hbg9vtr01ery7wqprt8awpt6lgotlzdwgrbvimp1khq4pobzk8xwiz54brekpr',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: 'qvziw7k8qlmxsqqhh9hqu21r85maxk1aa2o3d',
                tenantCode: 'syot404kt2osz2uvcg8fi0qvyrazz2jfzt62wdsq5k4arvozat',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: '2xr39i75b4fpadh9u53d',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'qar2brnm227jkoelyl801xrkvgx7s8lqr0ah7klw7dthbzaucah9arj000bg67x059o4d9i2b80sojwid1gkiaakvd9wi6zwyznqef2eiq7fozi8mxyzyogoh8gqnarsun6ql9wwkkx4axflifik4eydvifylbvxw15x92h1689lo1nyatislbyzxdt1wq12v3gbj2b82dwy99tgbgasmid2xzzx1i8oasvqjf83fnsnab5lnqv7x13e9tw8puy',
                name: 'g5647jyzkt1t14ohtn4w2lnzgovuuc1mt6haeni6gtxe9w57m3afvb48ychwr5kc4z8u3u9az0jknyvj2aneubb0gcqa4kzy40j53349ne8nvvq1m8wxgiiis97p6s6zfsvqimropm94qh52z64gl4pkqttfoik5ogqhfefz0j1usfsreutlhy4xgv02zqoqm9zn7t9fqa7u2yrizwq7odp774lznn9jh3i61ssf4qcil03dwijwztpvmh9kopq',
                surname: 'sbzwst23ehna86127u3ec97ukgheo7qye5wykdwxcggex3x9hg30ufcs5m7k3p50fsn8rift49xxk5i378zeua73265ng1dxr3wnse9vnr8stm1waq7fxeqeaehvdnhy3yo8tngfotolbfl5zifat6myunt8xdzo15uehmvr9mmppsl61byyvbn648bz88dgahx4jiv0b8lau3ezppijjorndwydz1epxc7fcd3ghna6mo10379vkw9tvkm3u5z',
                email: 'rdj41suya5f3qb9ydoblhfcdajit93cjcvqlzp8w8vmzc7swbktgsqp1brpo0b1fd83ic5mlos6n2e9vwt7cwn99rb7bx7brj7hn5jdwpxdl9blwl51othbo',
                mobile: 'cvuy01t41fjiigu05bl4560e4g103llitofqikienvvfirwsno5adpnk0tkw',
                area: 'h23uyb9zfrhc658bvyjd2szwelt8qc76wjrmwnlwrgm7owbxy6p24jbhcj79ivqebewnp0zg8nzl5vgq7dexzkrh6l8abppok6xa1obtznztritmhjo51isx0qjb699h1z03q3sxgldi3t3uim4x98yw8fxncbe1nxl1psll2tebhxr29qmn3kv58xpa327fzgaplhvrcu7s9x0x1f82h0ul4e6mc7bkgse5b1gteechb3au4rcbfilzy25ek3z',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'u1783pymqk61d2yym3m40lzlhkb9648422k03746e1uky8j0ve',
                systemId: '9uy2r21vvjmukz7tvqrxll3ovo70ddh2qb4mh',
                systemName: 'd3pfrl78thos7vs8lr4i',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'ntqso6iz76iz7nerpd8d2fbp2r3tm3y25fiizc9b29rcqqvw2bqwvk94gw18klvoa5cspj8ck8rp7h0l1ngy60kwfort528djxp3mb54djy5bty4clirxkdk2mg3ib75shuys1a1n7bpdg8g5md4hrasvem0aneamp4en8fe6gabjtq2a21fr66m9bk3y29onjtetpsgh6zduqa6azg1u3irksjno3pogjzpzgpaxu7xiyniyurc8rcyjozi3ak',
                name: 'h6q2tkd9rp3ogdf6i14b6qya7ywzrfh6uy5nuecekgm1n913c5j00t6qzpznm3srwi31z88i8mecksi0lzhbivvzv6zbwd0iholu1k00hx2cajl5udz4ff59rrvhnybjgpz6mkkx58b8c23utih36ys9wr1hgeh9b9m6c1m9rkeoqygdizk7qbn41qzycujyo6eqw0l97xrr46sp0milq689wrkd5eemfuybe838bl3waos5awi0ofnkzqzrype',
                surname: 'ark8w8fr1qcmif0qwg4fer0rajvog79udjyfg0b0ho14plqoeqqckql0wt6x3almwxzse38m0vrqvu9osjna40mu4w663abxis7d7liiof67gpk3tnlyps3vhvzn376xn45ej2eqyctrvfot8w6lpkoviqrff9qwn0mnga4h8lqy2xq2n2y6a685q2hpnbef58t4kw6g849t1uftm106u1b88zme8cl2f4dhmona0ughgr2cvfiduvnam7b1rdo',
                email: 'tkh40brmzvwmvrs0lt7fk3nici28ud6fumrtau5jxgkbt6br57d9zvexqy0oznv4j5h3vbxeybkh18i135atnolqr7x3y5yjh7kszu801vn4a16c31x5ftja',
                mobile: 'oazhwx2fe1sddv5fe6piiovl2n2umlb8b92yk83zmr8j5wzmnkhj59hyn9w8',
                area: '6mz6h1smljvafoupahwh7cjxkh5tetvwe0tm3vvtuzuo6tcij9j5pni2jokm6i2h6ig738l097o10gy3zbwmev0bb3g8bib1pnkma2ce52b7ijr4v6o7i1j55kqde0saklxwo01fw9s4wgc21x8ikst70vuhvcemaptbeu69wh3wulp6ep9ak4wl1obdx1ovg4dqtmg8bm103pzgiirj9j4pclwsd5cu7ljlgbjr90kwy2aedgnzpyn6y0or0ug',
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'hs4uw3f094pya9e6820wd4nfx0k2cy5ws2uae5x6j0986vvdv7',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'vl16npds1gppvj84oshi',
                roleId: '0e356zucfq03y4epyako571m9bl4mmer7wnpn',
                roleName: 'ixqon3ah11jsn3nh36kcf73ax8pfcbjo6zsakgkndjmo093dycr1nx5ag7uqdyxwyoe5k0247c5wcawdp2q55oibwqlnacrgx3zl7as3mujvuu6kmx1bug34z5cphimxujiy6irkno28cbt40sq6sybtb1f7e351vug9o88xrwsou1d4wmvzm35czz23716xbumhvigyqxjhutf21oml1hk2cvz2aylz1okx49m19hfygqmx2qytwsqvmctbpdd',
                name: 'umi172ijxf2zxxet45o4r3l2sz6cx8njih2kjev5cutz3tm0fwlgvawa97t04ykrfdijv72gsaaiabe5i9jf88r0mrv7pc7dndtsh9k3c9cbfuvgf03p2s6z8902evufhfynwca86tiwafdxw82n2p3jxgix82m6eb9hrf33pymypr6igkv2m4c0blmp8xehsg13smy6ssu270cyy1ifvaqitwlqxrmhd4vi35eamcoz38sh8iz6491iqm6bg4e',
                surname: '5fudbmp4vubt54lbgj7ay9y1sgtmf4unaod33pzhskzuk16ff96pj3x3vkm415oj62cygd2sn2kzo65jwtvc9dk9ypv23uakz2oldspnoy7lphln9fp4suwz7oiqbxm15zi0xlkf57169hc7hrvx1srnixhhcw6q2w1wu713hrq1vbmuefzn345r6w4du7m3uyewm8r70rd9ykncn9aryv4cjlffy4ucc6bo0yabkw6sms43kfb6i6f7714rlpg',
                email: 'zceybacb0a3x3y2jaektjzkzanvebeugwpn85elrpy2uqc6y6ldld9uw1o6wmds2sfeiedpvkee92gx2mlt3a6b912jp2z5nngonevyddhnt8t13ypu6x5y1',
                mobile: 'rd829zcc6o2z1o6umyrxdai9hzid19ob9wgngn9to0c6wldz36b0wqv33ns2',
                area: 'c6zn7mf0arcgbm05j592bupnafa73kw4omgg7x62bkp9eaojfqyc7sbji28ybcxe4oeit7m3vf6bers3jfdg1bv5a6cxjx6jr6foslh5gn7adxamcjq9foi39evll5pvogz20a42uve5azxvr9q0mgahzjhmf63u4sxktct2adfpio6uw7uelc6ny4u7eclzub4yyeu5fdg67l6sf9de5dr0ysgkk3btif076z04zau0dmxlvzi4ovvlsnyhfud',
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'n22upzjp2gemd16e65dsmws5kkghxhj04iwijc29jnsprda22ig',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'h147c2pcc3yjxnl2wqcw',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'jl317rnruzk97sn3670fgpt53b2769tgi9khb31hwzhqsdk2tun1tb8jevrw6axdcty2rcd13rniaqoise365hljeqm4b8xqok7ddgbfni4qdykkw3wovcrp8byzq3lxgmum9sn506b0j2ognilt7uikhpm50zquhesn3836ygp9ubotqpsqaekvarnk6ap2jf5aa4tiul2mw2me9a07ol7iyw17yfnrm6qv64ewkdcajz1y9ce2afqkadlccfi',
                name: 'cnvcuhalian4o2dsz71zmjnka8idfiavvuvuuq81vxd9amouwml9bxib9r6qnzls4m9tjmoxgxehtvh67rvoh6jz1d6z3ouqdl6ppqidr1q4q97mzrnt3mv0ky88gha20hypy9w1ouy5xs8ibc7flcg30gagwfy83kxuhxiwelaj9snsz4d8gu0so5v5acugoz31c0532rqulk5g5o9lrzjj6y6supn5v133wdr54v8mowx0yz7oklq5xo22ebv',
                surname: 'ibayiowpmx5wn3jlwlotw9opqhsjpkjpu9q1w871tjb7ffrcu9s5iow2o87mvihpsbukiut7ngdgrj46j7bqjf0t4btrvx9jsrt0jk3t38yzyjjhwp4y9qjqowkogx2l1ohpxyd0x9aypo5qa8xge5fakdbqcgf8u2j83ozch4sqdlehngs0egsc7x7a1bn7mbd5krv4713plozwx92it8j3a3205ijn8rw9bbxow3x333k2zfcku47tc34azvx',
                email: 'pax5kcw1hs28hh9q385igaofjj6f0mmul5hxru71uyp0q2w3l24tch2lehlus0n262kpb1yrn496fmrrempx0lqsgjckzv1dxvqerfwkwrr4m58nd9a65mk4',
                mobile: 'zd05b2jjls4z3546yifouv4hfznr40fgg713lck367caxskpfmct98eg2071',
                area: 'j03nagzbnw1ikjyer955q4yesfrr1oembe6rr5zp354zws089ot33jvat9ulqou9e83ojmw915w46zb1yauyu44dazixqkd8um206d1g6cd41xolgabwbl8evw3pfkzachafkomnktdon15sdctlu8iz5pgz7h7bopirtirftkv3qyksl4qw5nsk6wotz511xmdvvrov3bz3baytgl90o97h0qo5b3o4u94fye8y0uj1gazy0jrc0u6budwtjeh',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'mu7h2motfd7i87yfys0i113mjwonpt3pc56l630hp24nidhw6e',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'k1uke8jxfpa9n5zsftmp4',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: '4a3299v002p64wyqd9a4laiz786jne2bshi5hyewoz1qhv6kx4c63zrde6lgz8v8h5477zovlckaqgpiggxt4p68mr6rj3zob8teicifwjoo1na8g5jompxm7opfs3kv4czkqai93m0eurnlzsw0jspn8gfoyfsylz8gi9sbjjfdcnigac86pyre95j08bp2whsnqliifilql65yzs0mrfivho7tn2u1ipojhsan019d3je7szlpm40w36e8qu9',
                name: 'kd9pi5b7tcbepuq7w8ufgpi7ltk79sdt128v58pci4xgceth62op9fvfpm4valcmhn2ou9tgtycnjg85f4txfz2n7ifgnx3cznao9kgtd40kyc7syjtgs24dv3mq2xrdcu239ruxtrd8wc88poug6s66qnebj3iw95sseot2i4no7nyx78lpnjj7ramzoluikqthj0d8272p2vkctfx3uzsed35sjkz4yv3dt8h224203dhk9c5uiys8pr1w7pi',
                surname: 'rx0oacx6348ncddb68v0x73czi450rtt1yxajfugoumd4c7hdu54j1i4ayo2m8iaf1ludqr9to8z1wjjqsqc4hn9ciw8hpu24w1k83nbkzyotah06grkbrlkne1pxl0t2p8i5ts6wrf6h7hi0o9moohcaq7gcdb79vf1r1toqx7so32kagvylrjhso2t7u1ny6qzdq6sxo1ajvoeooumm731hx98f18owj467e2fcu7iaxuof1exai40ogyj5h8',
                email: 'sgwh46c28rscmhuq2bgfnmviaqnn095ei28g1zq4gejm77i8hrr3fb2s0a5qiccsa5bb2i0qc2s6d5vh9qfw4kekmu9lk6jyt47r4malkh27njrydw1fff5f',
                mobile: '56ovdmkx9prm0xo56hfntjqejb9cbe8d7j4ugp0nihdav9gp2ywqk9dp83zt',
                area: 'r6w1sz2dqx1bmph2h6f8p3c6kmm2oxtz1btrikx8tvfdujzcgek1baa6hkrzsrxcb5ioyrtu8gbx0d312swan1whsiy2bynlhev3bu83cs26xafbyjuqhv9gqi8ijwmnturrgw626sdwm56qi0gmzcilwc7185rd64qjus6axgeiq96mtrmek61jqa8p0lc2z2ga10lkloh9cqh397s723gbkoixz8k33jl3tvutz5rm8bh6189p6zag54de187',
                hasConsentEmail: false,
                hasConsentMobile: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'r1efau5jpqhl8e8zhlhz7a7nn5hqcq5617782gaxls7skxtwn7',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'maiww3jdqjck2yj6zm8n',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: '199ujencbms5u6bkv46j08xh3ifvnptchhgyqeqi9f1bflxvrvtccmclh1aqfkhltiuionp26venbn4bxqlkt78r6jcua1tgarolp5n8f8kr1fqv1lw0uxx3gjfo5ou2f8om2re1r83w4b0dxgqniwjb1yqlkzxrmgefimveutqc4kqystth46uyrehm5h75t86wzqcjb8n2t8vzyz9l6wmwnwyo07ud6wabuekhyd0cmd6f4b8r0b37e5ec1ecz',
                name: 'su4r8doq1o5ib1w90vlho05o41gkkilf0ir9n6oyz2v2nzh0q4pva5pq8yxedbm4a1o7vt90so5mnawrvw1qix1y4cf6z6t1r16i4od4dgh5a1yr7fod7cpaltek3sbmk4ua59o5fnuvefgigi04tjp0hdzr1xd5r19oc0ov982nbfu7q2u8jtzcfc378qvhmojz3qu2rlpz30h2yiqk3gvs5h4y7twzzo7bkph8gsnj5kmblenevgrbnzb4lb9',
                surname: '6694eyf1vrhy44puxrnxxm3g3jc1vor5kowmj25svvxywtd20zkv4du8d9dxamjcok4g8hkb9ragd0p05d1ivpo2nuw5qlyjsc3j88cof1oxjgw6s58r409ps1bib9iet21mjup1h1otvmu951gpqpxpdapxlo26qu9apkef4gmr8pfizhk7a6fwq0k1dv00iygitnxserzimp8z9abgh25zq2qmrs05ja33ehkgndv9u3kvnibgfinj6kqji93',
                email: '1sahpertdfvnco17qq4d38orfegw3azkkewe8me3ng6dcydn58gaotp93fg08s3i17djt5x2zxyynzgc4q193abdl49fk6xwe5k9knij78r160xwx84oudc0',
                mobile: 'n70tv1t0gnzzl3uf0w599i5rxvxyr0jqawlzz1vv2alotuv9uhcelaq45uwx',
                area: '7dgb56alocv4qp9j6x5y1r69xruffs8das5ppgvvrarfbskexmm1j4px87be5i7li3bfpwov6bt4mjifubkrec2kniiy82h700knkfnii4s421oq72reftozrhuan7m7hu9ixekn2du6peazrk55admmyg2pphbj0e1dw94wsr7lzhz4d6eq76ijhszhg7368anzot10cyoz842sgqj9q3y2bd65g1cql7qgm4eb89rids3d5v3ag5aqrrkyi6q',
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'xqlnmalc3umooqms68dhb652bt7t0fktp9hgl2f70h1ss4z33s',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'd4ypeq48b5p1hekzd02m',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'k4nxzqglfrrdqp52elan7vhzni9uy6otgvc2w3ivr4raouokf2idhaabqi5iwe45m2ibe5w0b2b8h728gkwcb2g5e8hb3xn3e0doflb6q290v1iriujga5fjsqjar84ne48jschmvegwi6w996koh37awqeyveyj9gq9keym3oordqrlen2s426wh7bfkzlhri2upus0p2th9dk5ehjwoqcwdnoz67ebtmsvu28mk1lf1f4qfg9g2l87zrdbqp2',
                name: 'muo5rh4tik21pqntt42dfcom4ig2u6ld9kvwpjpnu08aws185okb0ca8daubrx4x2kk3amd00g1clhx2ehvkg6ahvyvziyuqygleeg2dma5n7vx1l1itbwxxtpemb6ql03ohgvs35zmcjnhs6us2pezudctf2zu97o0x24gf87sf4f0o502xiw2t6ozpy2jzpj6ajc7hzfhfcn2pldvud3f2x312j9szbzq8qtgwq0ew5g6v6le0q3faj6dav66f',
                surname: 'gj3wduqev5869s4x8okkwosznewfqxyxg6d41oxzagy3xk6tntrai4k9pmhj2um8xevymslq7lb4q7gop3izhk124521tul8w1q98dbl0n7l0lrc291kjie30xqg9nincg0vyx707t8h9frks0eh13jtrcy5c08rckxnsiljkdx8njsy1hhagspi5payi71o9qwwyaejvqs0izm8qha7movinzeukfha2bvynbocusumd48j81c0mcodvkr6esx',
                email: 'l7ombbm3v629ecver25c5s5maaz59imkx5ed02xrm1o2gipmosbab474146z4y1lzwgp8l6odcyadm2bbr0dqbt3pr7sa21qqufjkpu62t0jpawtkhvvgshk',
                mobile: 'mccyuhxqah3nz2fwrq99ohd71v5iqt7742ukj7y63gy88svorqaokkat5hrr',
                area: 'srw2uupkcvnldzj2w506dipkzmyhv7hoqlux44w60ywrf9th2943miudgtel80hfiqah5yp88b5td41qnqox6mgejmuyom0x0vm25jghvcfmnzaxnm2vx4s8fxxb6xrgqh2rrk0mzelom7v8xowf655w2o21sum4mtrth1sub7pt47p6ur9rl012hygvoupjb1zwarh9us2fuin6yoodsmk0kjjt1ys2kci3jvgfj698psr6cja4fmpvj1whew5',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'simnmpoova9sgkgdrjkfu41dpl94ccy1c2cnmh0y49hgl5wi4y',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'qaoeq9xpcge24vc83u12',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'sudc3udb33iitzp9vtokpljmu8z2jxpfogu8eq6ppfvp7pi1p7c6b650bftq8j8l3ulz990i5d2ri0t5gq6k7rfi498nfpzalr05dp2b2gy4afzvoljow1i8g2f8q9da9awiofw7kyf1v5ad9s6xitgdj5of6wy4067yon1dh1k37nsmvjvrmtb4bdgzt62th04ttcuitg6wkbut4rqfterw8m197sjqkgvmzp1man94ykqbbw4c00u5p2xjv1f',
                name: 'c7s2ynrdrm2s6o4hmeyrjzxnyiy2zg9bceulu1p22gvwx0zpfmkik28cg3zznqj65ahmec8gbqzr7zbtdnw7nxnvhgmb8kgv7t23iwxb9p1gvfdv47nm0f994io0upirtssl3nlbtrfe22f9giifzo6yzcz67uu07lploq2aqi1riewetp1jbd4mvemwveiv4yt02fmm1o3td0nfq74exvmhrtkqtji327sa3o6datgp4ujklkejfj51z0ja6fn',
                surname: 'msxfx7z0vf7yfvt3eu4p3l3121okmnulb27th06yfxmqexcz95lz7cso1zf29dty1yctxii5r3jpyixnmp51npgpokn8c0tvxpinbawnx4vjrp21h0lj146upp33j7pbqx386vhwigpv4m8ewzq05sywj953tf8vfjirqo22ur5i9ohzowf57q0g7i5a9fbx1hr98vg8mixfiz08uxyxovdcqlt2oecjfcc0ctofjkfwjuxoryfavujh7jikr2ds',
                email: '6gcbzf6m529g83vgun3flnrj8g8zharyz23qdcj2oyiu46akdqolo9v7asirf3nhf4qgw4qotqmk519c9as8vrt2pmszspb0a2os1jyf344dzf1p0l89m6sm',
                mobile: 'fai0tmt6cx3mnmfbltcozxl22q2ifxucqn3spqdrj3mngf8enfm7rcvu6che',
                area: 'ywv47zaj59obn3hjlelzrmo28sk7s0k6elq605u4lzhp4eqiq7aegnl150hbflsrccvw3q3ejzquxxn3bfn3sbag06vt4cl5qo225cd54ypziku8p5a0w8offszsxvdcdo6vodr6qgglgbb0vj7qhi7kiqyic8ozk24blfkudygon2hqxoyvackqy20z9vja0mx8eszv907o5pp6md1lv6s9aigpjqnt2vo6d7ip5bk2vuin5aw8qlvhm1gy0ev',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'rif8kh0bnzg9zx7ci7mvk9avdcktk6s0bikkvl9b3pejp5v08p',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'fwkyb56956b8bd3vumyb',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'amgjb6n6wylw70g404k2lgjdgbhfzg4ez454supj57iagk08zpwug7cnf5pwe82fy9y21gbg9njhfp7dvnhoc4eyxh07jyy11cg67yzkz8fnccno3scoqxsx2b6hg68s5y2t0k6jpke8mlt7tshhkot7a9ppocbxxf0wj7cwohxljsqdmj7p8oj6o9uogiper77jkw03kmby3n915f469l61glrx25bixxojdc28k3173kl26adslf9z818v59f',
                name: 'o0a9gx631ymzqm23kcqssjfvy719itbwdqo539u6ulgdzypze194364te34ywkdfzgytwlja93rwfaow96nd6jcin2llt1reb0esymxmtcqz9c3mnztev44oplfk0wq9mfqv54brl02umjmazy6dcdm51gjap674173vipr6ofl94nxxkar4ifvcbl95qohradlxmorn3lehwu8akk57uw889ugc9b3mozt1d09ok2nc4zozzei8eo5afwoq499',
                surname: 'zi1lx114tfgivjdqu6lgrxnqt32an8hriuar7abdbb5tlpgcs3k4dtqb7g0gtddr9ffyovxvau0umd20sbktpcmhhci6cdcejkdl1ox6cetmi1rrttcrfrknfrcv5ijp8jk9qqqanfs1lpzrefctw13kwb9o6npmo3xxbpmcfsv221df5rta33kr90q2wjfe97l6rmogs7ei1f0ypl0tg2p2h0vpxgppl6idqo6ifwvgmp58q2cp9q61e29d9vj',
                email: 'jxpzwn9l3yu3gbqnpbeyp79zwiwaop10l26oytfzm58t85wyd7oxpnqn4eqx0cu1aopi0diednsdbm855uwp82mc52z9j4iettj0mhlj4a35sod4hrbiqp09y',
                mobile: 'apkhr41oozt3zywe4q79sfkaqvfgp2ihzjvphz56lj0229jrifldxk676tr6',
                area: 'jgvtybh3pa7xtrmhr3ev4bftq7njzjvn9ljzctxyibggdczfedckd8332u6uz92rwuvllqwfhah71vw7ct6zei4qlwhe7rrw26j5erawg03iurxqmatem2n3f5s0zatf7gc9g8e8e7wuen6sqcurrh46vsos898vvz6xe2esv34r65k50nowi7px0kha8w27q61x4702yqy1ymtr0i7dkg15cklt3hkcb2a7aqoj2edjoxej85xxxzja1kpugpj',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'gj6oyuyhbswt0dgxba4lgooftybblw9c8dx8l0770gi3l9jtr0',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: '6v35rrls9h8keum7jxc4',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: '0ws4hcordut3c9f4qjo5r2i080u6ra2tpieoz2dswuyxekadtpmyyke5ts9cgl5haolf4odvq9kw3c2gfmc68r7jw2pn4eln1kv4ddato642ljlulbz8kp9o87laha4kyto8klje9hrj2ns13xtm36u6qlz7xwp9cgpf9mh3o2rqc97udthfcqbfju06qpubx9d5rez6bdhhywimxhxp5d5eetzb0zkybd41o5wqm2cpropyqnlim80o91v596g',
                name: 'j27rbbmyenhnhl6vr6q65bqdp2sx9ikb8hzchmth1tnzayqllwcx0k9mjiqv20znp42bin9qo3qvhawxrhb3821hur92fndzu88v9ddpm2yy1hf4q47rurslarpwggb64w5zsa68poa8jww15ja2i0n2kwatpufk2xrp5ondfthlihy5p7mdk9k3792850nhp3nbmkzl1zgo32f81akcgioutwypqctvl3jxhojoun3swhhv65rkmh6vzfxce1z',
                surname: 'fjx181xrr66qdfj5zvlpp7uv4pc1c9x26wfdrea2e8yxnfmksieqvt0sjgaxfgav6kip2q4t2inrdpx887joqp9nac7i76qgk7ozb9hpzrnzc0emweg5gy2k27zghtad4x790atejr9mbvxqyzc2r6dmvpjbytryrbkxb3k3yf0upxv6i7lhig3zmq4vikdxx1lf92bqc4u2i656uwlyrjjznvvnnkgnxgr70e93c2zvcv2nvv0793vkpzgmrrg',
                email: 'vijbfd3prs3kz1b9uawzrmu6znpuic87hb96hhtcg42pw9ngbdlpyxqypk3qidmrhyj98mhx8xrr1ynm81esdxce0udn962feu8bia48sofqy2p75iz2c17w',
                mobile: 'nwvtm89ga0dxjpe74p3fpcg2bijd0m4rdl8wn9f849kbor5w8deldq1a3p2sk',
                area: '7yuyvdzm89n44lro0u46svxjt1wo7ebynf7is2n90w0k1gq0bmvmj74xvtsy368orte0asa7pbrht1h2k2rofwitrbf82mavy9sznmoitu9i103cjz54pzjqfew9iughkurmo7yn1pzi09gzerq3fbe4rtghtjewdzfmds3ui9953p3k2gtalwwy5431cdit5kkr0fqveobh5zcj64lywfymrqkst0agazgtl3tckdhx52mtrygqn54wuj1rrj9',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'efmtutz9jp1opp1bw2excnztfr2p4gpr6264gu23xymoarfm84',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'sfjnxfx32a1806j9lcg0',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: '9zh90dqh0svu8f1hq9dud6lmwaegm1jsh2wy65j18i0ks20g0tj9q7gs7z7cwtcn24sy32gafg7idy5o02x0qj6orrt9mq9h06obm5s2olq98vatqehcwa2j64jd082ul6rwmq661ni3ja64ham6j5vw7rkssydeszo6qurks7wcp9pw7g2stkx29416yxzw3oryh1t5mfwy0phj01rbuqaji617keb8myxtqvd5rh7tqd18ry2o9fntto8n93j',
                name: '7n41wmgdp66bkr9jj6d5zzgq9zwbptwa4bnprf8wochsuuj2vojkl487q2hk0aiadmx1qy6ex51ogdi3t2f37iuijuceow53omlzbrucwjgevmx13qrg35iil8djrtwx3pmo14rpgenyotcz1dnd2ztzs6c3a4wtxmgi5s4h90p1ipiy3inbiew1ldenkb1mew74h1ecje0ea7fj2e4x33zx7hlsqfxyojv0500qc7oc9zj402ruq61o1pfrxzy',
                surname: 'plig1uuu78m6xjxiowj41zvnlzl65g3iso2468cn063pu64bg77f26o36lfowkdwxly9e2pi7vd8qw5hute471vglwep3585wolm9ch4bkjfq9sriz19m55x77y2fwo4qo3tzdp87vgqqgfzy9i4j4q8uzhhtev15qgdlp6p30vl46odxntl0ezswg6b6s7dmv0sam6cl8eemc4xm94txz4v4qvqwe6udolubrjbqf3uy10n3it0399j2alco8l',
                email: 'w8on6afx24jq4cc69or3pcbkfvsv9od7k6ahd2yehoplchf6lw21ew9u5gjp4hufrutrpmuop5tom9fvr62e1vag651md2dnbcd2xbg0g6h6mq8mvdkm1h9m',
                mobile: '7jm2nea3an62q6nax4oaqyhrsps5g1xvbuwr87kcg0krrkfb5bcwhaduamde',
                area: 'zv1pu1t9jfps1lq30ossqlowsddzyjabpmwkkd4fvvvpofdu7y5tkjadqgl6cln7iajeytkx36o41rqza1lp15s7xw9fknsirqzqfi0datdbf6xupeacp4ro46vkoqbye1zt17e2qg0wzseo1ie4pjeg12h8n55541rrkuhfk1j9dbujkh8fvhs9phrix1uv8guhzqsqveztiwrsi1avvqe7fr131j7m638mkeqg2w0zmjc6vubsk5ubv5ncsunn',
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'h6dfq5cc1bxklmhqorgk7yfy5o5m7nl2lx6ga2sx11e6e2778g',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'i85qtm1vx5kxas8mniob',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'nlkymbsqoryaz5fhv48yeep2bvgd0nzzn2noy5ro4ya5589bw65906k743xurrjar2rjjte8xmh3bofrmimib91wwci96kyygrqjc8737wo0pqpse1j904n0pp1bqgxvopnyy9brtgc7r3qwu54f4m9jjwgz0ujb7rronsg7wwz9ld633h6se92lshgdg8l0x8ol7glpvbe5j391se9i37jbww0wtp6whfoyud851um8c6qws2hx9hic8ppltf0',
                name: 'jy3fyo3k6shcvugoz43c09ux14u7e2jwna0tnhnmzf0km0eo0e2ouk8rqslikxasxfmoojd26x0cki3rblvxv6kr779pu261wcsz54snl0hm7ofpup2saosplxwmtko3pjb0nzqgrowv2ps6zr7i55no7apflfuawiis1k7qufnpz05ondor798533o5f1mgx0k79xo2ryy01wcev64nv4yy3hqh4ofz0pttou9xlkiwbtplr20p0i0uv13aj6j',
                surname: '9vaduyic0qgnmf54njkoia1jftb9a78harxy28qu4r7zfgybwfjvkxaxgyv21ond96g6c467oywpwetqb3ofpnuh39ph95ghbc764tn34mbxhnkjhofcdndevr1suyre7ectn8ndj2iz5rm1pw4otwipzu9fvrtrhb9otehwly8c47p5fl2vwfx43rc6xq4vlvtteukh4f53doep0ots16svb58ixkf2igx2n2888j8f2n304opik7izkshl0jg',
                email: '36ndz900emnrrj8a72st7ga5ssvy3hqb6s222v8705oz81vq14flb9hm5dbjdxkklrwc32ovq3aizf81lzkftia6elom0g0kpisulnmqercpb4pz5sne9dz1',
                mobile: 'gd71qu67j9kwpsqbbj35nxombb3zt0rwtfitp6aftwzsobbdph7eriwnhpnv',
                area: '43ow44f7agoyqcdrm3r72kkj7dxhxpt5udeh8gyqte58gn7z8qj942619kn2y8o8pf5arkbenu48s9dpx3zkq4emfn1jceu2gybl0o8zjerdv263xjr0luo8j9o4nnilfpa0hq46p1i811zvpwfq3ar6esf4yxa57tfqx3qbrsinb2f31vt7e08gg9ov8a9tqxin39t5tzo09akugl4n9azekjqfj6h2w0fb9qprwws0t7mzc3j52pq2whgj5x8',
                hasConsentEmail: 'true',
                hasConsentMobile: true,
                isActive: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'f9p1wmpzwy5ladsglc8s258goswt5kzrzom50nsboycr5md2t7',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'csjcuhdks438kjel3ney',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'zrvxr26p5hskfk7si17s1opkockk6mxmzw60n9mx5x6w3gnfdemwgvhkjjuirvok9tray6ztj0kicflqhmwddw0sk1igj47dzsvij4s1ho83cz4l0lv7iew2rx5535ba7q74gfmzuhffc6mz0bmkfk4riz84duoi117wsspdjif8dody0qcqvewg65wcihsptxhp67t85i105kqfu1g41m5634ty7h4lmkzbow2b1ycf1f0llu5zuvuopiw7db4',
                name: 'e7rx3shfkri1d6fsg337ejit4t7tkoszaddtied3rgsf0asgmaohfrneqj39915qme40a262teiy8wmsb43tn0itt59ugark4crye2xjiwvg6opi1c1otglkg2zvk831ukrfn5lguicexotopqyutn7hyxskjuzik23olx74l8sb78fh0vd8afuesldw6b96btalmukwl8ozro4uh5d9dst34ul53djonl6ss26fkvlyhk901rrtu5v1d2sgz2r',
                surname: 'fmr8yya0jfmnpjbltixuap1nofwqk238yxct6zwhf1e092ydvzw6ggtpmquv3eyq1z6o2brj700kj3rw7fwqf5eiqvq1dlsa2hynasefliy4s3qvqxegtr9idbbnf842ztpnhe6v89uj386mvopxsuft69kfeisefgc0eb29q4yc82e9iqx7vpf713mev16lw9w1omqgrtfjm3102r0f0kbje9tnj71ujeob2qm3nmyq87xn5riayr6flug3ivm',
                email: '6mjmc15xj6vd4ug2xjf5ufjmrh81rd8x9olmg0lnuraasw70lexmz1vvbmjxestwx2uvq2rv35kc9xenvimh32dfv7sa0ovz1txm3bl90wgr5itdoe37ddt2',
                mobile: 'b03xm515jsvx3n4hbv30ssezz2llkxg8ir15c7q2m0rb4jup4an120fc7c32',
                area: 'bor5tubbtsh8zaz2xoa3bjtcmb5iqz5n9vv6w60eqzk345u8rgz9ou5z4a21m4jvtttn7s0aiaefj6thgylo97kighuds12jpgrjbp1ajpvxgvi4lor0iw7xuz1x3r7y711dt2gbn4wetkshjqm3eb78tgdkg5otd81zmiu6xvuuq2nqaxoh93fn5i05to69suaknjxpb66utglgzxlz42g3hot4cjv8p5in1vaucr6bjwdzro9d8hi7ml91qlp',
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: '0yd85zsdi61se99x1es4esxllepocb60ipuo9hrapxu33lkwzp',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: '7apvq8xhb29wpfh32s08',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: 'lgmvfthtb9n6t3nwcm74ngn9fjny9yp7pqpgfayt0ejquk18q51fgybrpog8pfncca978siy2c9k7jih7rc9ivxj0q443d6ztea8tyhisqfsauv6721mw4e4cmgkvr4wnhar5odmkd2hzbmhf4mhc7isy6gp0swhzbqtf6zzgh6v6802ezvz1hhnmsrv1hrmpcwz7yqwybyi91o0q8cbqrwt7u7eaa4pfrbqji04pxtyjwyx99rad2uenr1b9gu',
                name: '4icztaw1aue3to1ajz8pu4appidfzpbgzrmdt9ixizqfi1o8jyzt31dq1gbpihj43hdhonynarnxzo5on1xytstno2yb1hyx1fyxsp2z7sq124akbu79j9x7pjd0m9dx7647qvdmdsgfjan1lwkgfovlwyaw27094wheulfaai5xwv7aa12sricnf42yb9dqm2sd67vq87pm6h403bu6wdif5763hf52ug84i48jihrlh1cie0gm00iwuof89bk',
                surname: '2ksf9hmf074bo6e3qd3fvzqoyrh2kghvk3rcdtt9zqc53d7jsrkralk8lz981qe7ejppoa6a7fcrxs0y2y97unlqlavk6tbfywzhbc1o2jxt7rld8o5myz9wngqgen7loqav0rby7mvnzb1p4by0qs9g23g33ej74u5iek4do1pcmw17qotj56yxhezu4mt047wipfjzsvucqt3czyimgx64ktvuqvk4833w4u18jfmjeissdij6epsfkpsc90m',
                email: 'gi023k8e9uihp8h3mrtj329brov04dtq7cbpft53kzg6nttuir2u6x4sucgxdtqhou6v72h1jt1fshikb6d03ae615abk5p5kevwhch4bs80vqf020gsd1rg',
                mobile: 'tcet3n5bn0gbvgnikhfxx7hpdzg943bdgfthalh26r61ouia5ebbd67bz3tv',
                area: '4i1netz35jpngmfkmeqi72iwq7xg0zoujjuuv90isvije72i2dmvkb3dml1z0y0ejavpjtnmatfivezghwx6dly20zk5tvz90rnc2bbvquvr65vxf7htchnoyf40mk68m1qhock9z673kx0jbna3rovs9t7bdakkza4y7wumcindlif7y4o2zyov91ao6gkpr9mgrpfn5hbnnn822wbedgc81i0law8pa3rnzl2efsxo09d3njr5lt9q3p4vdeh',
                hasConsentEmail: false,
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
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: '9cxsaoawj3ydheotbfkr1nihjw4rtc8pie8eh5rcesls0aqgdn',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'kjo81su9y1kupztqzbc3',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: '1qf2ibwlzc6d89z2qdmmaqc6b2pwfr4o014k5ud218frvzr1id182cfb9718bkummzdq4xtaugwennm97x5jkxe16b4o3cxbgykk06uos3dxxhcyvvei9jfte2h15bfi5fri0qx8grg57podhhva38dd202qx1pf553i4z6ooc2j81tu083ln1em39z21zfudj11xd5weop3o6tn4de0t6t6ir2d28kusukn6y08xd99fdfajegxcfqbvxxi0bu',
                name: '6mlrjybanalc56qoun1cig2maq6htqp1kqri9so8ducnnj6zrxujxebdlh14e29sy503u2ua7k92qb0cxqufs7fvuu8jt0uzlzg0k5f0hjre46t3ujllw2ab8ezlgqcxysmko3lb2wiu3g125a9241q277vxl8a6qo4waurf4uzrssbfmqvpz5y2hq3e8n83lmlwgbgmlwoo7usl2tssmspupmmagqtg4gsbca6yh5tox8tb9ldflg1fblj16n4',
                surname: 'jynawgxrnhlhafue8s19ig4i50hijoocu5qxq49ygf4han6hq5bvc34ki6ktsgzbk9yuyx33lqe0dcgeyr61nyejl0etvxcaqvnclag4exma8hf3solfxn7wl0crunn29seoz54g0hf2exugsa5u81x8yufv10qqo90c0iejlk2d2fev15lnp3bu7004skf0unlzzyli6c7ii4244wcz6fszeypb3xk5smpaln1qcb1rwsic9seivohsopfgmzf',
                email: 'xz770z1mny2juf74bsdi93kmbvj5gczf48mdgkecu8cbeo95xy665hvvcxx2c8o85bj9gom09uedkx8ya8elur8dqu8wcbva2dxlksy8ovq59dfe04np2fii',
                mobile: 'l43a0p50uzd1v25b1ygmutewtgdnir0aq3aod857o9h5ywpcyodcv0rsvlkl',
                area: '7h7fuax9ycy5a8p9m2m6i6f46sx5i8naqfu5ofccoz9uyno318cue7k45u95g4xloxd6xvfhhj1eca49364ff2d5j3febtpywockva5enjs1r08qqgckfpqt239d8tupgp8sam7vq629qo3u80jcm1u3luo8ovv3l55a0h0gpu6e1g14hdm3j8ccwgbd79th2gfueoju94e32kllty4f8uqvwtxnw0s2y2qex7z1rb7o7kmk0vx1cjsln4ir9wx',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
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
                        value   : 'd685c37b-b41f-49e1-a3f7-f1a6f3fa197f'
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
                        value   : '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f'));
    });

    test(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/229b38bb-360f-4e94-806b-755131487a2f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/9a2d5e70-f56d-4a43-bae5-5d8a40afab3f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f'));
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
                
                id: 'bc671191-1fe6-432d-88bb-33d9757ded50',
                tenantId: 'f6f5edba-f3c5-4949-bcc6-7b951b95ae9e',
                tenantCode: 'b46wtogayz8860z36i9tus6so9a3a8rwmfepqlgos0in1wlr9j',
                systemId: 'de4652a4-ac9e-4168-aea1-d6c0bc2aaf3a',
                systemName: '3b0nv52i1ak1ztdyq2mt',
                roleId: 'ac856070-29ac-4003-94ce-ecd79c5dec8b',
                roleName: 'mq60ws27remowea4mx83y24x7rwpld1xbjgwyvjvkj1fhlr6a42qin5hynp5kzbyfqoe3qh5m1dcdx56j4wgbsuvbfi91912j36srs6fh41w7kgdg6psetqiox9huhe2u5e0ji6idf7h3x5nii7h1b7cobcybj3uabopqr8an8tj6xpvkb9ji9he7tqoio04wu8uwy0hf9u6s23je6x65my5fq34897p6fr6i8vxgqdrjrokykx5mz1z8rmk4dc',
                name: 'b8oyapg9q6khcc263z6gd08bp5qarc1jnvvkdpng0gz9prsfkh67jtlqc0a2d7nbzzfn0wl0sax3zgkmc6z8bvrua4ilomdbtyt3r1u31hda7exjumkeiojm55ltlceq6b9bm32cdfjwza9moelsn4ax87rfrs9356xqt6lf2oedub5lo0g5kalzsry5ogxvl15qeqiap99xhzqwooxok7a27n04iq8jgfh9hhzx2wl02cd41gpwn0cvrx19zhw',
                surname: 'ejhvxv2xn4aks51hxo1g1zx9fa8efi7ik2ohtacqjgamfipzuvliejgfpjc3soe0vej74r5xadsygbkzqttqll60s45dldc54jy1on9pxm39fftnx660spa8gpc5ucxgl8ly05f57tzvgtgt78y1bsuchfkgdqbb1041l23ykc01y8ydbki3cc728pkpwxvw0xelz1whixo9lvp86b63355hag78n705vesnzswanvj2x9w6ckgb0acaegcje7x',
                email: 'sh2erevp1hz8dvlbpn4yvbtfu9pnqi7fbddta9ugdx24eebrs0en47cb2gem2zeku0ag2hyzavspdhc5blj2y9b58rgcun4d8mxhlekjcckw1rgajf7ngc33',
                mobile: 'mm64va3i89qgaovt3w1vgmwd4ayfmj17ypud2k0f6a5l5fqa89q3zy5cq2qz',
                area: '7tjqoz7a7pmwkknxwhbrnzacwv5hprp6ph46f5c9cp99f8m93xownhyn0ptwwq4dga73kej1ghd3vgsrdxfi605jy07l5ec271u6flkoqyqodkwq4plhapa8pqcck6hemtnb8bnci1yf58nwzjl8e1x81qid4d1fak9wmsh4jgtj1ty3e52d6sv33s2c9im94jbzhk8ich9j3rqval0nx1m5cpaqhkbk041l3taiv01a7ead6v9gn105kx061vn',
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
                
                id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                tenantCode: 'jjx8dk9xpe18vgpk1zkiehcg92n6y4gvqs7wu8i9t8hwz6jl7g',
                systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                systemName: 'ul3xcsgrpsuwszdsfxpg',
                roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                roleName: '8mehel5lhegzzkp5do8mzez0x0900qqnsk3gu3avigos6v6lzzquibd1bv3ziz5yip5lcg5x4uwsodg9w8klo6wje886n8kippl3zgi3a6v5u4szkrb0k4hxsrmqs45s7o8kvlq55o926mvvcsvvc7w1b30ksfjb7jufat9998kgboiv8xujyxhsh8veda0ogwezhbj14kfs0ujk5s5l3k7apa7on7ezewltgkajbyjsbl1fl9ea0qpqa22uujd',
                name: 'xgzljgtltyf2ne9wm31e9kwhvpexi9bh9anic9r3ncxnx6lqodc7vzxw71er2vbq0ym7p9l5uvzdm836xo3x27hf3mr8m8uyckalby77l7zh8mnmy0c56e8p834dxob8jw330ficau8s8cdsphk8pgltuhu3swdqrzq516mjhc2hngeek0qw0ahzd2e2piq00nrowy52lyz813f14f3a5g2g2l3437horudmzp8x7eweb6guvb236kt1usfzov0',
                surname: 'n4e9w7f72huhm58kv7fpw8wwvbiua3hzl03xukcuhgzsrrdnx8nfktx8hplmziarozps00jl8fftkvll5woqq28as9eu00qq0ugw89zzgm8t2g0zc7w5zh20k64xoce2kuvqz82440tpj6nhf7rhxno81o910brl6y2jzwjz0bfnqwdmlcqioesom1o8tjnydrixmb3u4kjbk9pgastn4kris7aqj3q4rjkmhiw8bmprq8z8yxyz6bvlyy2kl1j',
                email: 'a6bfr17kui7y76thb562reh8wkuai5tw7yzxs2zz939652189ewoxlftosl6biehznwgruh1iz9g51wowvzdbyes74rk795zqzxhbism99ttcxvb08srhj66',
                mobile: 'fl1dkj1sg1vv9id6plk6ez42g5egxuxv46f7bvqywu8i3gezi38e0d765cnn',
                area: 'imck4sg1w1o9zn1yzu0bqim7t4asvhk799z1r0n1gpy47ee2j4paypq90owwjvp9uz7ilhftkc0qwia2155io1kb76ig7dh2xtcz92aqkqufv3l2jxbxdk0dcc3oy41xdsvsuv8htnu0qhdarnjsjzwmc3mg2z8qkfkndecx6pln2krmx7d26t1tb4tld4xsrumqnjudsf0w4adliruay3gfb4st97thpfx9fzebyjqloh5ayzprk7zsb3rl8su',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f'));
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/fd0d1db4-e891-4430-8c23-846180290557')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/9a2d5e70-f56d-4a43-bae5-5d8a40afab3f')
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
                        id: '4f0c97e1-eb26-4bc6-8ecb-85ece8400ed2',
                        tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                        tenantCode: 'q8c7qdpe7bobs6vb59c2bhix0ly3qz705rjkadkmtfcr5a9nm5',
                        systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                        systemName: '1neywkoxugpa9a2wwx59',
                        roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                        roleName: 'xrc3fmiejj8opv6qwnulfsg3zio29un7ykuo233uyiqnqxolj3j4dcvavw1xmydkiucbqztc0snsinl9f8b7jdtcbov6c16vq5m1r2p5plao0bpot49d6hmdil0kjab1ikfcbnt6wudugr8klx24ulzew26u2lxxgwhoabtezlx3880vtxqkyhdr82qaeujr7t5k76df3ofa8zlpyz62lfhs69h5z2dz5lbbndxtf6b9w7bcotyzrg04n710ccl',
                        name: 'jfkv0cnvzustaozly5go3qk6ps0zt2dozzjiv2z5m9cmuihc4b6gfo3ghc5oy0vupiachqg0gleovuct4a8hbak9xr9s2w2x9h1nwe09sxootr0kmv3o3k9wrxem6rpx0m3i166ymx7gl1bnox5eb3gppclu4f53qshgjzdpryckua5spxgmiuabjxebs0ms2afvzhe15gvfl1g8p5u6w1edxgsie9503z4zpoe5v6yyddocbk9bd76xs1rj42s',
                        surname: '32n74ob7tdzcqie49mwpceo9yut46qmfzds2oo34106nqxsiaod8hp4qoer8te49kqq2qh29ne2620g2wo172yvro41r4tp3inycu21hvn8di7kkcati6mxzgk8n4mi30831rvqz3r6fbrfitkvoyoof3yya8osbacukw8omkp4ycwzof8f5k5j0y3z1gmo5cgpyc4yc9ug15hfenusoj7p8mxqi3x4wq3f6ygd4zfdtffbjoq0buo5wpanayzd',
                        email: '4xp5e5x8gg4ryn669ab5e1nvrdjbkv8f8trjo60hzps5mvzwxnk6dgu3u046fnttgofdio6ik2v2eqyzn5rjngeo5rqk6luyswhb8lew5qh97ea66fwf6e73',
                        mobile: 'f8r4b78l2lvwfju1jd9v2nfm20ncvwomj5in3bdaaap8cxcjci0kz360xgq0',
                        area: '9wpoy9leayei1ezdc2kykooj0m1v5u9izqi60rvvuq48wvaxzq85q04n918jgfwtneeeye3126rn1ac95mu56qwj595k2t2g8wlb2w00vxcusjno9umhax8uj89qdwy794bsktkxjytf1olwk9of24n158nt1lsxpm9wk5myky4rvu73pfmomrcsa14a0rzsofstb9lxjx3y2ecuvh5nlnzmv61jtrsbqxfozzsw4quorxz42ip016fzrvgz77x',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '4f0c97e1-eb26-4bc6-8ecb-85ece8400ed2');
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
                            value   : '25ca3ecd-848a-4150-9ebc-a9889831d652'
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
                            value   : '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('9a2d5e70-f56d-4a43-bae5-5d8a40afab3f');
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
                    id: 'da0dff43-4ad6-4882-a5c2-ae7003cc5cb8'
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
                    id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('9a2d5e70-f56d-4a43-bae5-5d8a40afab3f');
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
                        
                        id: '7f67fd85-52e5-439c-a76d-358b4f873f93',
                        tenantId: '4d7872a3-52f9-4aab-b21d-b199ed72d0fa',
                        tenantCode: 'sjnyu35160f20xkh8qk7vkt1xqzz63xj7jz76vbe5rjz875h7x',
                        systemId: 'e2477f23-8410-4952-a5af-e14e0d7458c3',
                        systemName: 'phl8whb7owu9c6m5pke2',
                        roleId: 'd157be67-acb6-4248-a979-54a8f94cbe15',
                        roleName: '1zm5zkvh1e3fqjszf2q407uvrsdq3s6ptiwl1vmk6ufjzncva5r5xtlws3opzmrkerkv7tgx4lzezpyrkl6x5zgh2b5tdj3dlx3akoikutem8hgcamlwn5ulxzv78nk3uhye2gqblpmc7opylh8jlpkmko8tc8vaynl2xbb55mgfdsq1gl95cf6cc0b85ehk808am0y2bpbemig9e3qkhrgn2pf2qa8b46owk1u1zhvc0cvzt6x4gi529yrkhs1',
                        name: 'oka1bmuducy7u4xf2tl54eqq5pywkun0i7q0uaxui0dqg11mcncb2adxe3dfnwv1nwg9afg3wiggmuax5zfsl5hq25qorerxxgo99o0cg7je9di2xpjimb67n5cq0n620r9s0nyoy4plwpdf4kocxghd8p5kh3sfrai4peoipiorw729wfd7mxvp14eufnydmv6uije5ptgae7ckyvapj95plr0iht0w0600sxmc67zqkkm4feuvl76i5lqztxe',
                        surname: '2gilbxdeq5ojnzz7p2b2v3grjyh1yws4yluask843eufhq859jj3usup5rq7f47cn31wnwbhsiqbq9yasr97hwpcz7n2eayysdbj0c9dn4dn9wvvnt4z7xp7bxvp622op1higpu0yy21hatywf7gdmqw454vifrsiccjfu2hsg88hqahut32vo0wllv4utx5vgsq3jwzj27fijle8kp8i805hlrd7xdw9eb4l0xjeir1k942y2ic56dxm43mgjt',
                        email: 'zjrqm86qt9t9ihdl73n5wa9oreppfzaktgw0kez6pm5jhaer7j1cq6a9vt6299vyupfzq2ztctfllmqbolflamzuyiymugwrd2vdmp5urmmsjd9mu0ecm7mg',
                        mobile: 'mld38bwz99u0jz5eyan3vw82khgpsq5xoxvxpijbftrd4h8s194tumirt083',
                        area: '2wvk49bwaictzt5j087uyok0a00xs4gfjl3t4rqce0krooc30us713ifr7islhluokhriigj41yc6blpsbyow8hukjymyap6hyrgbxt67jpz7sv4229ibmk6qun2jizc3gjtwij2pdynd0ubhdeflsb444a4bn82au269r2m42e2sqhvv7v2e5213f0h14ful9r5vnul7gkwjpbwene53uuxz8vfb7jwfs0agpw67khv8kfqr312r36zvnmnfz0',
                        hasConsentEmail: true,
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
                        
                        id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f',
                        tenantId: '8ed95fdc-7532-46cb-8408-181368cecfb0',
                        tenantCode: '9ojl74yomy6zs8j5b75ww52i65wgdbzvpitn2i7atzy8ni02j5',
                        systemId: 'ae9efb0e-650a-456e-b39a-8cba2399fe51',
                        systemName: '3h2k90012buwli46sscv',
                        roleId: 'e8893008-dcc4-4e54-a094-09b2287d20e6',
                        roleName: 'i739edc7yy05idve14c302dq4hkch1e4o9nf9yj6887exksl9npmj7hu20ghluh9778w6wk88ubwj1rbq6hswayyiux0fm88eqtp4dsq5i2zmsqmmzsgwakd5hedcx4kc0e4u02sxtt61610kocydi2qbepi7yz5omp97pfgia0qxq05y9l34rcz6clueblbbbzze1qf2nn9jeju361wmlukw1s9gtl12q0rd6fb1am49i7f7mh9ba5lt5bbx0o',
                        name: '9l66e4g6it3ll8e2rb6zbids70sbck7tx69333nqi9dqdkz8ra5pxwn46y1ly7x6x778j2f5rg3czhz1necbroyvkgdsr0nexknwj6scyz2lrdix477lvr1edoywpnx89mt875ggrapcfq8ga95336occfx7xaymb1ckdo95q82eoeh9fgs1kaoibqq1n108x8cgbk3e9hspmif9rfy4tkssdkibe2hkj7fev9ky003dnj9lozslrd2sw1pdaai',
                        surname: 'a9l1lb95be0c8bg2sm39acepa15j3ahwzilttp2fglyzgjhz5zs05oqwz0vg6r25xhs7nazurew7d83a64pn72ournwb48mtivm2hd6kcrnt28lv9lpu0pz55ex3ok21wlx4pmenwlutjodtyfk7uh16670s47qhpnlihguootfjdz2wktu27szhorb54rbcdjjzbocal99r808lv9mntx9lrg9znw59p74rfd5d0bn2mqibo94f6kd03hm4n24',
                        email: 'ppdfd6ir3qugqegajm5qk87nd9kur6ja665hqppscpl3fl8bvqjf3e8b5vik72ohlsbhd4e84utp0s5y5wqdm35ra017ay9x4n61ijhgkcapvna4vhab5z30',
                        mobile: 'v90t5pqwr84y61x46pdlr9zr1ff7ys9qcqizu9zb0k4epfnkd8gs7q0x36c0',
                        area: 'i5jnj81r5ziur5h1ll2jcuqz05dc7x1apei9lu3j7fczm86fw80f2ebhekiofknwfeugohxrcpen17tmo5vsdu2i6epdx2e995cccxcctwwbtwf3io56nmjlidupwrxxksut02qegkb0g5beqj55kr8mkf2q17w5wwnkbx2yd25jz55o6dteso0pg4mlzqz6mmcldhh0umecq7r7uqt9mf5lxn2eziru6y2uqhi5ulurmwuo3mfzcmciljds5aw',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('9a2d5e70-f56d-4a43-bae5-5d8a40afab3f');
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
                    id: 'e19ffaa0-76c7-49b3-97bf-76b0a2a6cb22'
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
                    id: '9a2d5e70-f56d-4a43-bae5-5d8a40afab3f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('9a2d5e70-f56d-4a43-bae5-5d8a40afab3f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});