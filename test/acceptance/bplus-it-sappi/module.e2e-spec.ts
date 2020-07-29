import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IModuleRepository } from '@hades/bplus-it-sappi/module/domain/module.repository';
import { MockModuleRepository } from '@hades/bplus-it-sappi/module/infrastructure/mock/mock-module.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('module', () => 
{
    let app: INestApplication;
    let repository: MockModuleRepository;
    
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
            .overrideProvider(IModuleRepository)
            .useClass(MockModuleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockModuleRepository>module.get<IModuleRepository>(IModuleRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'uumwugvftlow3famp0pmxw3pr47hyimpdetxw6otmx5fy8854w',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '48w3nep8rjh7975sis1l',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'aojefk40g19qvd72j22eujoy5jympkj2a7htxrj07anvvjsw0r8o2cny6zyoxmii6m89l2rhw142k03g25fc5zflrdjfdbpnslqtfviqhm3qsypr32xkpl2n3vgojhsruleliwvdl7rror55e155vbmgk4uczn56',
                channelComponent: 'd6ya3xzuty30ctnvpoiaf2uocmiqctmg0e8l5029mhmf5yy02d3x2erff8hlakxbo8t3s20xg70c3wwrxv7r6dho7zurtw1x672xbtu2rjwjr54yszrq5n8lp8b75yz3061wclr1nr7fj96fnwa34of01ru8lndu',
                channelName: 'zfi9x7l83yoacgmdup2f2rzol41wpratep33i0jjfp7k35aw30cj6ozskn1xz9fsh5u047tmxab6xhnzu06r7tqxzvzxu0hma0t8p7txye0r4fnlirh1p37w96ym2prl9by6p2vbrbmh0uieilgj3f7gwpxcgomh',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: '96jvk7g9af02z48ul6zkcxp8lwl8x8i8uoh6gc0bknbbuy4mmumadvsenlhiuza0kzt4vvd9mg7thrrqvuk40ptutilf5oncv6asmku5pf0hiic04omclpomsr45e1hiv2lkx4wa35xcwfz95qd2kag5osp84as5',
                flowComponent: '0f61mcvspeb3isbkwiwygltd3wbxpgiv39svtytcp1hzvdjfm1domsyod3m5fnkfkwhvje5lfnsx2doaf1j0on3kygo8ek7i83govfg4rh7d6lik8ne4vpi0bnzub20w3fr5o8vmjo3hk47vvdszlw05wc4da605',
                flowInterfaceName: '89u04wq7xwaoonywi31rqqmnbmfrojepqggkdi56s1i2858epys3mic1ng0ap9quomqfm1h6m0t5ddv178vo4i2heyv7wrhr9neki9qefxfjx63mgees2zea2rerlitszu5k83bqvdq5g4fezjtr3zqbnk22uexl',
                flowInterfaceNamespace: '1vmntagr6w4d18im1e142ip08p0g25x58z5smv5jgvlt4veytavfim3qjdnx3l0p6tpijek6dhxr4eziqkqp2mks4aadtwtodunsvl3pye3ie1nrwyilo2kf2f0yslhrt87zf5cduugaozgwyig94vyk7x9zrgmw',
                version: 'cwl51wmw5vug86t30sjb',
                parameterGroup: '59u2udc5nm3kfevs97wrl1knyoovjv0lmplz3wzouw09n2s9u7rtz3m7y0oa3jyvt5anuig9ggralhzmekfevuk1avw9wvxtm2ix7odppx37eny7dhybwy3jdlqvj16l3z1bmrlvzna5z7gkvvh20w0q1pummf7oh8651djfa46tg92258vme5qnk0m5m79p481pg1niarxh8vgh6o5tz9mpw7p4v9acx1n2nk9zorua9ynnyohgaeuvnbo37y5',
                name: 'uhw7viwki62mgnrwv55oxleplbo21bw6xc3aqt8er2ezupqkpsc7lv0dw9sl7wem9vt01der4pfd1gyho5zbhb1pe5zln3w1hatak63eh1nkmmnam4o884130yku2gudblwcr1s6ri7civedt2bt2xpj0mf46q9hb0bv1cf28z9d78fxlb1z4m7lcx6wlk0ow5y6fuqsgoc38jbr7q1v4ux7fb3qkv9iuqg1jo1h0med0zbjhta1uj9uhki8igdyrmwrwdy2tgd3zdn38an6tyyng1mscufe0o5f0tviij2xajvwkm4ipdhpkorsgi9n',
                parameterName: 'ac1q5qgfpqyjzv3t6en2tddidxljf01fvg90tot4kseglmbd5s43jrjoo9q49i1k1l717fm721uzoyge0re14lnc6io72dtutdbd380m1oayxp0g393apwa3zgvy2h5nx0xoj570lj9v81inl5fpv6slfaaf4ethy53iawt2kq8nkougn0q6b612q9uerli8cb4elrhqevensc3tj2cvs58qvw1rz8oki2sysg6atv400ua21hfwzxjvd000iypog0gghvhobgbx2n0xmt26g8h87hvhz7r2cqiibfryuejys0q0vvhnw0lfa189wowm',
                parameterValue: 'x1q3ee9q3ks1u187ynll7xzbz0ykkryuykdt3s4et67f4rvw046b6xu2jkhwxhje95qodacy7hk6rocdao51pm5frrf55pegquu4hupihy1h5rgps4j9yq1z6ne6ijwxy6jvch4roppx99d3b5e1nh07o6ird1o51atulqrdb8y9kpvpiu05z7yfs3ljspdf2xamfzbohnqydr82i72bon2mtpq6tnipgbu86burbl6wro0mssv5ab3kjh2ja7d5t7x6kggy0or8dh2al4wwyws1d3x8fpr28oyw5j2cu84j2xkremhnitlqc00dldqpj2c70jwx52ngiscwpmb2udv67p0fchb3xv9dzwbipvtl1h8t5jde7fnexkxj9dbhfr6663r59j8g6fbnu2exiqyp2nnckqvjh280t7as0y7szm3jgfhhbdeb1i8wr8gtt88irc2e9jndt9dhv4yp63yyeb0pjovxqubgh11e7rtieeqzbkaqqo1bez6i0sh2ch82o0t0xoxczxg96hr85lo5x8guwlv0z74b49sqj1ce4ffj8iz0od4n2tu8a50dglq9nkzs62oi0031qq3ruxo8xzilxx8j4it40tj1ccjkdprnaj6vyj66t5kq805pfates56zk8igk6yv6gw3ydtu9vayq5r6heqj4f698pjxwgtebmh0rlm4ax0ni2vcopc60crce21tafaqctbvt75t8shvg5op3270uyw0pczm8ovlu4wftvl9rgnmzce8wczomz5ljh13095fpwr0jyk2eboz7i9x0x9na6ths8c1s1xlovblii81s04vqzcvii78jomry9vhwxfbb63xj700g3e4r3d2yoqcoja0j0qaw0w9gbsrrywxob2y30trnfgeils3mdxoxcg313m3vjzfw39lytomo6xxemupgk5er5lxzidw78zezb7yjs9tzrirv895i8c6wwa06pipxzyqv4acqq3et8tro6bcab2eu0mwefui0cl0srbqfpn2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'kn80bbesmskfvx7e8kvkz6fx1dl4zfgqczrxuz8f4o0cvihk1d',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'hbqxe00mmt43gn872smd',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: '77vzazjrfdt1espv5ll5cu7bydr0ogurfziv7qrg8526i1bb1svlz64jsto1k701srlo288xyauzr3hbziz5ypktm9qeku7yedcych7n578hroparzhldmcxbiunyuawf970xn99amdwkbzouwe3e9o8elg0v89q',
                channelComponent: 'oake3s1jsbhv3n2meekk8t6nyljlkhd947tca7r8q76d51xn8kyrsbexriiwr21mabxg2xqfbv2mxnbiks1eztta3f5ctyxtkks3811onfi7vv8flnqdtnkd027a1naswxquck7y763d15o8gy0g3rbedparmpbt',
                channelName: 'm59g73gsqkiucw417hd5swr682n6anzzaxi7bf2izbdp48odec6lvjk2kz7qt8phgzy3yosmj36ay2dy48g020uzp21hp2kmjmwxu0gc159ik66ar9mfbcobwqpw1h3v2pwwfelzmen0gpasu9gmauq9ahvv1m94',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'wivj1pmji9u7x0ou00gb79fdd2smome4me6e40lv9s65clpao4p7xc0j8mh47vlb7stwnn6c1slq7fhdcdtqbqthl0itsbkhv60c2prmwk62714usy1k29qcpd4m4tos1qgjrb07ytyk6cgwxjqr3eaiu1pa4n4e',
                flowComponent: '7chbbpptdn7sdvhw5k29u6gpyndk9frmekneavzcil6lkw7r04gg5akqhfb2mkk7373q9ebs43blk5jvte5uj6f4s9uu9p7f20jx1kibqglbbcdmtrbeedw0v7wfwr786yfuymtqtggzt73zmw8ncvlnts835jxa',
                flowInterfaceName: 'gzfy3tp4hxq7fs29g94ncjq11tiyb0qq30z34cmivjxkh8kthj29mlb908oy9vwiuly1f8x95qwii45pr19ig9vk3khv5a5bn60jj8is6pjxtuequy4ydc5odm2j1xdtpdanmaowizdfqfz7shftfni20n9pwfl3',
                flowInterfaceNamespace: '6u6q2lw8marszfboqsmgreiwy7om6aaobtrreigtvrc9i1swr1waaih69o4nkcqws0j6u1tdo8aly25d1ynwaemjh4i5a15bokfxuxyz8ppzew6ccvzym0w1507b4glwsskkn6haiokqwpo9ngmo20tn9d1h6jbo',
                version: 'uh0gjurv51npxuw525en',
                parameterGroup: 'akz645k3ekp2awav03vgom5zw18i0stt2w2xtf16i6mgroats3719vyr0j6zeqepakhd1kvm1bnm7sngd5gij78ph3fqa0e71enu4hm3bvkhrxc4t1xuxn33hhebrwz4hkg7hae6e4sda8nmrxpdy135a8shzowr4wg8jan03wgn7b86vbilxabpw4c53gsbljvwisdubht8rx834b3atw005pi2gzot1bf2hjaem0cf67b3hi5qt5ny6iezkyg',
                name: 'ic9y49y5b57u9udkgw6q2r7pid2mmzw5txbz1edptl5vm5elbaw9grc83dijegw5y668bb2ah2i5x6we18odvuip3t0l9fuby1tgjz69clkinkd7wgrscwq5klk46pc49sje5l03a8g1eyekqbsmizgnisymrm98pkht67oblyji9975v2gbm6bvhj6b2vrnan9bu2spz4f4q04xe5hozwwzllsm5e21if1y3oxa8d3gsdazwwpyrise90hvz9tqx4x354ocrw4l50338ajnjf8zz353akk76iosrcu61p7gitdsblchim39sbmu8trm',
                parameterName: 'gns0gprwsjzhbc05uwkxheora7evs2fgwf6tvlze5e2hsjjk1gggeyc5sq2hmtdxenh25lusbiocnk0amzanxpzm3dx90mncmtqx59m66b6c6bgv0vqtjreyclrfig1chqwxbeqhomxhclbbm9c848pix44wseokjpqop615atursvmckqc2ijx6b10osyezlgfxflrpbs8gvx849gsqwp3rpz7bq45a9h3mcphe3ecu1vzqd164dnmvrvs2o9zw5crp4vm21i862e2kisz1smzlm7mc3dr5e2uwqjet4ec3dns2i4kufaahd349wpld',
                parameterValue: '1qxya4lx2bddz30uffx16w91hr033gqht4bqpj84kr7v9t5arb8pad6z74pfx4f5zb05hyfqkpky6z01no494grx16ehbxz08q6yft5rp5qzr0t7kb8o3pfwleo3ax1rfz5tyio0s5fcdlvbmzza1nsgiczmu896xckywz0pe321r0pcil83ljqbib7xu3ns5j8gxgptiy26h0tk4rfbz6sk5aogxg9ehprpemzshncigeuoce4les1zcx4thvlw7aaltxcxuxp7lddllr04ojql5903tlrf27juoemv3klou5krffiue5yz2fq8x7627bgnmzf8w1op71jtkxuv121994c40zap8uvdx0zehivl4iwy0tdpufjuhxrhb7qem84zdza294052zou6yd7hqjaq1ukmnvljosoztsqmrtbfhi65y4bix7w6ukocrj1tz4ovwga1gorlu9xr6g4unyb5o88737xllgggemodtc009qil200nlwcsw88djt359exyprgkfiom7ag38t7qk3zwqvywsdom7uo48ao0ncwcf1bjzer1ysiqu9pm2a6jatr0c9yj53xmm8itzj70dkxtl6djfqbby4llvwjuatfrlxhk0eqxfqg02qe2245pgytk16ttm60z4rijm3e4qnlya8kqcj6q3e3cyjpij99z2b743ggyy8j005hcf3ruykpbewe4uinxxy1x15nuyzc1h7ihusbx60gwbjxgjig6zeeqo6imr8k4ucxrbdkmh8fq5azhyidqfet68b4lgrmrwigxa7o4lejyf1at1kifs9n28adhhzejwhkb8qbuj4p5irlg42tsra5kodgslk2gunc0ncrvtbq9p922pmxlj8az1qb5pkubhia5qgzwgpbiake6vq5ea78yrm2465lggmznsdvmcgxe5k8zvvtteo2p8vvi0mngb0qmn8mgu2bwnu3nb073evnvstt9vcoo8v982s3h3bq9q7s2rci8hjje5md5jb1c7cea6f3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: null,
                tenantCode: 'qkvolbzhtc70pxonws0db9m66ld3f5gb8cki189hecot58blej',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'fneufx0wl9jt1dfyokr7',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'qyfua0ggeyvx2y418rnqwsh8sa1s4pm9awlptsp7nhhaqyg70hj9q8sval1vymuiqiadavat4n84r8e4i16io89xudwafdcttdf3hxi4p1i5v90yywh3wu0wu4d1h3iwzihbjitn0kgdgc4voifcnj9isd64p2u2',
                channelComponent: '9oibgc1ng6g04muhgwsno7gkqy0piu1b9zp4my8uur9a95y0nw7r20txmvggehdiktld6uo0vue4mcu1exq0lc7u9u2vit8ttjbe7i2j6l7vmpfyka2d7ofcqrl9cty1f97dc9r4u49gjctthtrwyheujyhly9sb',
                channelName: '5407l7j3o8ncn4ea3hmeejg7wf43drlld47u7smlh4rt8ogb386gn222sqxuwgkznpcca6uu9f7mqbv3eyddkh0zuz6c3fmdagr3bf4du952trz3yalecu8fppn93hl65tonepckrf2vhzxwqkl2rzn5cn1aawxx',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'h6047nky0ah8p469h2xtnpnc2hkkibe3gs7f58l3elgmjc70v8erh9vd7489demtw3h1rxgul0h5t8jb74wnj7wr67dd1m0ty1v1nnozn0dtooz0anvbswr7deswbp61jkdb7sjb1av2rs36u87232448rxsdzes',
                flowComponent: 'ndm9cjbgyjs58tgol0vd8628lxy9yqasmwgndjzu8t3qrei1qif75feb0djwgjbkdnklfvrb269lxacyf670vb09e4sk1flmdbv3qq2b47895nm3azcq2qlcujrr7iwetyybzbpay49foxim725rud3wvq54ekq7',
                flowInterfaceName: '5dk7vj17d9vsf0vjypwdxt1txldpqc6i25orhhb7kuxt2pul1ealnri1jrh8cbxxgdlgrebz6gv8tul7kmxb4kbfgebgppzsg5k59wxw2inzt296anf84y6cvszbzhi786y614l40kvl4rl96ga1umavbehwbytb',
                flowInterfaceNamespace: 'by69cia9x691hl2a76mw6nata4o84hpmfha8kzauq7xzjy3mrzyruyxpf1ph24dds9bma12tcbvtfb9qetsweq1q05dwhw6ud4vho9xdx9jlivtbi5f98avb32b1o7jxobl82rrrub3pi455sa8aigbrx8wbmkmz',
                version: 'tmdoa4boftfufzmy045y',
                parameterGroup: 'zd3gsci5etebt5gbfe6wqm8ff22km0zwycajs6mpx4vadh7a4hufsd6jcp3epbjzwegeczqc6gjgzsuqr2gaynxklla4wu0isalcwj1sy4s7w4fu7lp8szs391vll4duxs6mb7304u1rprga1fm0o0wi7pay2l1povzkciea8k2a65gamagkx3agp3k7c5f5arjwjmacal73824lzo76wdx6s8fy2sx35dn5s7hhj37woao8f0bfgbbpr01piqz',
                name: 'ya2wiohrogss1r04hrisy68r8jo2ql9jsc78gkxpf538zwyrz18a85q20ookhwl7onwh3yxprsglvh9kjlj5jp0px7qxwug5bgl94h8fjd8opp0w47tf392nvudqbfajxjdawpcw4fgrxwugedzx4lv7997icl369fjg0s51c5zidcnkt1y3lxb0bvigomlov8jr124jxz0riwdyq2ybw17ow8m6hywzo0txrnlc7eaehspn4nu1qdgj0ab824n50rkcyfay7lisdzv6pj8ag58n0k8f4bbbctbbmxi4xb7eq2zd6zpms32ygenitjmr',
                parameterName: '68c582wxdaiw1bslznisvwrhceflg5ain2dofwga8dm73i83hhdayal0l6fkfhd4tsrgunucw34je62sop9q0bxaezt0fhxgdqf6823ijqa3cvamr79urvlk8ehgt6jv2d6z23ya0eueao2l8lpi5bpmnazr34xd9l1z13mqneaqdnn214uauep4c3l5dx0jhgbyzztuky6rhcgjiqars5geivfwd7eeup7ijb0qn6sqyzucgm8wbywmx8kiflsq9nz7w0hkw5gy1m3prwyvp786o5nnaprz3qje8gy4wiydo0agbplzutezs3jlz5g7',
                parameterValue: '99pe8kh3erdjql4kpeeuccwled0k2ekxig994vjz3fs0g7tstn2f491lfj2xsrxapthip2b4q9wt0di634r95e16mn792e0ea4q7si2ig3cha0ud5ybpqyhbmcp0zqid62v7phfzs9yidfdrhjj4781dvle3sq3hfczz5nigmgrg2o5cwlqo5toqdjhk9c1uet8m7u9lgzu4g4knoikibk49xz3v0r0qrmk01a5nta1hojs1hct7naqtrgxbwgwagp3b506f3lchtso6lqv4mklfyx96ua8hyxfsi01oabwzlmzeat46y1healdfzbsgfgfwi8u7cks9ixy82wugbd2x3oculc9caxkvpqlzvt2bg273h5vdyc0p0g42zbxh9mx9yqd47or5h2w3kz39x31r6ztp4qrnuhrxbqsw9nqx3roe9ri26i46cvun5vlelbek9ot2ym4vr0rs2smxqu74k8983ig8aqb44giylydekg7408ocmyxdycysphxc5rmmwp3htg93kepm8hhbnq5o64uxruzzwaxlsaagh22xw3q38bvp9rixemgx6le0gf3tzba5t3q4x9tckimu8n1ienfk5irnoi2kiucqyx854nro2rxthtt7qgdak53r44xed8ee7czok75wa2fuoi9nrk6btulebstsvk2s96h4cwfk126p42vmmmp448h9evhe7k6p2zrm5pbj5v7hjog5angqmjjw8k6miiz8u65b07v3b89qhjbst6yf510gg3llv35uvcpx0j4l26p2avgiz686li9z4anvalhx58x6hucwrzanrdq4b9420rvk9zszslh88q3trpn1czomzfq9urlx8wt0q54ebs6mh2m8zjkm9bfd3hvbixcnoj3vmsllb1k254grzr5pgf0n9q4ighjlrkuanpn54ixp2mkppd56u510t6a1b5ymepbugzfiaowr123w6919jsd73sqgbhfxlddube8r4bo4hqrr6dfp4bllxisblr32sbb7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                
                tenantCode: 'nzacn1z4ulp2xp1tdpv9deb73azcd28esb3m834furt9o0c7rx',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'bjlsjwob49ap3iwgskgr',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'ikxmpe0x39ep4cehtwj3jruqndy9hzcg6ikacwwbbp8ewwl024km5pbnmlhdu5qb4b6qtk2e5te0916woacy3q8y3anskvepr1qz8gs6a18at7m23ksxtfu9a96fw6h8zp7trqk4h4kt3vn2bi96rag20c023etq',
                channelComponent: 'myytejsrw3stysyb5avu8v7sbx9vq0elk8riby7y0g0un0ow998su8tg2v3s2j5ikghsojeaqgotfcli0985h6smf2jxk7ehzgco1f5i6g6s9b183buqcjw6r06mt2kvhcz4khigu4d5e4huisjp6gbwq6eqdhey',
                channelName: 'tm4tcsglhwyt25tv95xjidgh7d8g5xx3nqibiwk12up9weotfjyrh0s9xodl425xuy5178it0j1o6kz8ughovclbzerb3o5gltilkvwqn7omkwtbodjaa97t02qii754jr6twgj2a1t01sbqwkqez35q0f20zg19',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'mmiqur8s190m0p7c85xl50u082jmzthxnl6itqyog1bua5nypa1bvjwwji1r0ty5qig38b605auz3trss2cgopznh06zwop8yg88iw41o94nqw901vkmskyjq5ilqmu5o6yaw50lc6hdhtwibggsj4gvxbe7klm2',
                flowComponent: 'pcdy266z1nb5ifizjex42yohho5i2nlnv3yja7k09u4g1b4ebip03eox5960dg4h3mbkvy7hfem6air8vip2n36zqu7gh2li8z4vn6spjr79fdb5yu4x0vupfkt217mjl358v18wxkkxu9abbv9vwj3zq1e15wdc',
                flowInterfaceName: '7kj1rfkqdssevwjpggvtsxem1dvow6tjf9mk4wvur25ogw8wgzuy2grsy90kakx7t4w2597phh4myakskvk7bzlbr4ees28zhc5yfecjbuibbn8dj8t6oioaqgnjiafrgecnik19qadd26k7e88zsm12ddp8odvn',
                flowInterfaceNamespace: '8t61yzao2xe4rnjfy6xrmkzeckpd0y809byroyci1r5was7s0ps2h6aiayr178odaqz83dk5wyh6r8oq136ex7do00349lre003ugj2u52zkk1cl6snit8bze44rftorv8ga9q1ae19xm7mf2p8x8rsu7qqhg6qv',
                version: 'vuu2x58k3qw01hp4a6y7',
                parameterGroup: 'g32f9drwyki9ywi7acacv9lrp72rhl3d564cronrijgxwnvhu10d0qhp60dn106jo9pwom84gd6f4hg0foxi1zxfv66lq0q7ll6s9r5ku7eya5zyjlehgidp27ac4wpzmrfqmsggorqqygpqxgj1fskzzxvptnht33rpko897gyw90pr89xryyhkctnvme0ibbsgze5znh71qrt8yv8ap6qi2qx6rkadko8frw0zz983xar7jmjk2gw9mucnmxw',
                name: 'z3hcbvyc2ha0oe8acmrmomo4t5h6vzhyz1l63skte0c4mq9nix5bedhyw5ags05hwgecdkimw5zdtimxykgbzeagjqz9dci5p5sc6n1aie1i3nk4sdyjnvzqlrw0skizow0wo1fzbikzrs5v0uvkamqoaqr5kp60y2vqlq6hrsywugpxrl5x5tum5xtbzst620hbdrk5mz2ygoay2j3yuiqallr8e080zyt1v4prvl8api29hgkee2wfjmld9c2c07kec1ast42hgfsx0tq04jlvo21t2v8ciqam6wmgzdo25ikyzuzrsk1109p0u46p',
                parameterName: 'qh6o12kb4bsh63mun7fzh14cfzflixbi8goanbl3l0rgrd4ymwhceeptk8pdod6brlh7721wgpgdv7hw6kt9fdfdznqdyg1qv62wcdpm955hghwpb7xmcviw10aqolfnxwyk24fmy0dxvik0lqfzfo2z9ltrhrcmceipjwjs7yov7v6c3g2hhmo2a6b2qxgk7oqjsjbmlm85d9uv47wtgwo6con5li899ch52lb98wb7mpjpwa8c2pt9r52a0m1gyneevlb0zym6dd8ijrq8lgpx31hxsxxho0s1h1pk16sb1uios9e9z9eh1zwqm0es',
                parameterValue: 'yo44cv040hmjlgeidt463l7idx91embiewsr7kk1lrtg6pado8thhkx0nf6ewbn1t573httj5d3ykfxk8h7yysbo4i2fh8lgrlpf7nladvtxsjnvzwcv47gk5uafovcrl89nvy8jf44ub5j947n7256tx8hu46s1jxxztnhw9p2zu1pir6w2hplg5p9gywkq7bty8wcinmls5rgbx9borykii0txsld7b0o6kbuxa6fc4xyxwzwbz2wirla2kwf8ko4l5hn3blu7j75qdyvnym3r5fjtzzklsu5yool45chfwnb2gncelq99ijnsm9iqfkqwmx24b5i3plrujisskjaampv307dl6lp7qwic95k9bvfqhte4eutxyp5iohjokanzalu5emgkp2bte5yf2b1ngv7qfpv72ysylyetb14gak00p8tb9qii909xebe1eu37f1kq4omkrpfokqhlba17mno8a1jtqwtcobey399wbwfmzs623rmc29ksls6482f5h55ojy5mj6vv31nknet7z3757hi1qfagfry4hc7caylcg5eg2t7p1q4i255gg58t8vevhkturigtpotgjvjpc5r88pfljzc9dask77r9nj30oojcvpc61l1tbaj74gn8wlgz87ak65tb44iyl72gwo87hf6fdiou1fyw7tj4sju9t6sohtcxo8jbhp9b5g20fkw0wiba6d6blv7blnnf6u0ms680yvr1aan05hk7sb7ro1iseh06hzc5b470yepo4jui43rjw9hjas7ssthh5ewatfq8rlcgk8bljtlq4uwetlrog2i9os3emtncs5bxcbey212ku48qsuakb3m37v11ky2nmto9njr5z9foz15ssr5ftksff5s1cx83byku7jdbzqk5mwuut8tuzedqow20eyk3b9x414k260rofxf3j34y48susb0awxc9xseocgxsj48u34i5fjdd6kinbvk9i9pjook8ulkzsaf5rfstk7v9rw4kqbo6r2yo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: null,
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '63ngryhaherzb1rl67pp',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: '4mrvdte326oqswger5kwaqldsj2919qwa87m33tq4lx8akyvnjrneqdkygupxx6o9xp8cdmxji487gv3cqb6mwszmgmxfldcgjc89sycw6pnge84mruq3r0493gw8mz50ehkrbcgqqqkl0sb936gs6d3mc674mj5',
                channelComponent: '3k3ad4edp66hs5ru852v3uin82t4zl03r4ld5jw55apkpknpayop7bnbbrw8y1w5hhq0v0nyq8er9f7w94nz4v0ye91voxz2oewdp0ifrr4pk1xwfhmvet80hmydorn01s0nvmcbip4ju9s4jgv3uy51f6z3ulo2',
                channelName: 'pqpz5cc9j9vh4d7zn48ijlrcommxepk4im5dh1zjs81mvyllqpjkr4kbsjmwfqvecuxb1b9u69zo6jdf6d7mgdbdqmb37uap2a7a4kkwvw4wt26f97kshdbd7nfxeumair1vcey7nvd04kfwsq2lu15yefstbkh0',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'ppkrsxespinddsur2wc5bh5crmk7l9i7ehcy9pi5utelp8nzk6k55g6owtccpeqntpow1mzinclac6dp6u24v2geld3spvrxjebo1mvsuw9d3us31rj2l0iwg6n5uc7z493u2z2vnv6h4kssflmowzd0y3vv24ci',
                flowComponent: 'ell1e1weu3wd1ntwwqoj81ow4scl49eta4hur5blvo4znjeonyvifnhujnxlhcg980mjrdqzmxvghh1169kzwdgsoxhg2rpzblkd48p4h4ax8atlt0ntgm11w33mvigdsmx184vg1ib0geqnx1si9tgkfizidl04',
                flowInterfaceName: '4npxr2bq7j2tic8751qgl25rgiruvkb6s6609uyp2e9glm1pmt9cq9hhmatvb2vxre6qilmw7zr444lqkhjcxrtqo2h2cxtz20w62v3jpndaun4tjysktnyphfj2hsfv36doixx53xej70myziy54w7zz7pjqwpn',
                flowInterfaceNamespace: 'vqtl6x7roq5l8dgng9pimy553tlz8pv8na6q6woctbw1wl2qfd6tvscwt617fvcs5to7e3r2nuuc6btnup1rkke7ll6ojg3knjnv1bedxhwxzrfs1xwqiryr8eymiudfla6newi3yj3ccc47yhgfd4cu7e8mljlh',
                version: 'apc4ur6fj0nq0nv4cuse',
                parameterGroup: 'p4wqfi0ccsjqq81ail5i9w62h4cfjr72grj2ljqdtg24s5vev4a35bnc5hh9w1m9e9d80a98sso1azs8c4za793r7g59c1b1q88cjrchx5rao0695do7fv51ey6r6tfg9zoj5bveinkwcw208qgtt5mdp3ze504gsaxff8arm5axolpucr4vl0ax2eix4684j1oh577cts9k3ktp3koxprqaefnk7028h18t48tiowkwf8x2ioy3wne89jbi9ec',
                name: '1hpvxkahympscku0o864plf2t0z97zf2nh00aw1p8r4r5meav95gb5wzls6t93hrbtohhlkhw1gfxvwlhi3naomi2w9ct2tenaorhd7mrdss11nxx4zey39ab6q1uxnj4e3o13cv56ykl4ok100n9mpsko0s821scvcau1109eda3lkclbj8fol0s9956bdj47kfwlr18kmnjqeevz64hut2148u5q623gfiai0ndrvewcnambaahck8fr5rl9o4datmtf93ifuwv6dxrbqxw37uypnfaow2modbioijt0amn1veo8owior2n9mnf1e2',
                parameterName: 'omuk0ldzepjg0le9lax1pl72ad78ohobl648mpwiuk099p46hlbrjq721gf97la5sggecqh7y5jg5j6rt7g24psn5f0izal38g1nhvgkgl26flivuigxoaj9yl1935dkddvoo99mw34iyh32tmvatgcqe9nmqkxravfou44jthp9jhy7dwsv5j0n8z7ivyyoyydlr4hl05xphn48uom91bkfmzgv9yvjqhqzg6l1o2ym8wm5ul3u9614qbvp0xq2h5g68e4op37adnt1twboyuk8kjaomhzlu9tvjmqxqgh8w1lx0iuzecdh336cdl2y',
                parameterValue: 'lvn3udwzxxio4mbixlcgilt121w27xkvi80coqgamg6z09nvvn59s2k5356lwlmx1ga7g3n4lspygfk8o17xmrq4ktqohuhg9kmiv0lyr4i3ja4ubrwmz856ce1aopcuipoyuq5wx0pm4djge871d25hp5uwwt88gcpqs2vecsi5nt4qo9msrowgquaotaik3v6vvqgg6tnlp4rmjsvlewkday6fwg2976k2slbcs115iagbdrxt1d1z5ey7lgz7oaqhywefyw31ej9jbnp07t05dbpozs0xihzka235of3afyaquy4pb42cfpbc6pq682vhez4cps00fz3fd9l9bx67itvb2jr3pxf8pdiq0ubnqmbjfvjzgm7zb1jsizj7iq846howf34w8mna0odab1xqcwk4jng3ivutt8tki3adinwtay9x20ijehgxf9zmaysw5wvbiuqxzl6k1q0grsfnan0x6rar8rzus332gdxvny668q2vnfrm37cnosilvh9qsqankkbr78mkjkag8w91hkchq8y3ilwoenm1vpenq0io8o4n9lvr1h2fsfv8l4m6lqdz0knz3hnyof2nmxvorezolxhrzpek7jze68oawvp3i4n2j2e6v3bn9ocfv404ley1o97o0usdixmfqxgjabdmz1zhyft9bkvqpjp5cpgaclmcoqzsw08p8zu53uhss3u74jotonjncdtmc8g0192hjz9lhfl1ibf2xtshbmdqzqxk4d7jokhznmhhgtgy2hk91kjo9sp9zvimcky0x7vlh7t9mjlyrhqu7zyzws2en5m4fe8f7262f9smv3fsraz2j6j19lnb6292j3fqdis7rcu6q5jwmean0hzjl98kgsfsejj8hpz5dd4w9ctz1xp85tihombaavqh9wpkkxiy3fhjuy1m0a5f2hbza26snwzljjmg6uhc31s3c4hf3a4cxmrduvboqzrblkxu2sg578sghpqetgpwahw9ssjdtvrnu0htun2wo9fj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'a1gygffxslrgv6i3rd0l',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'hklw0alzdanjdnq80foxfsm6wm6b9xlz59x6jinbs8fgxrway220872svrxkdufb61sjbcw8echaq0ycycvd5bjvo2vflo0kem4cuqcoycoofc77uoi0pxbbol4el8wria4s4x866zjkhdrqg4c9j5mq8iz0lmq9',
                channelComponent: 'b157wk4uew4s6z7nvyl5cirj3sjc3j34msw9oir6iukut4tmgbmvu94aawkzutat4li6q1icb6oultp0oaplfk7lfek83liivjz756c3pzhutpq6nguntk5npmi87fe0184mb5dqdzvvj1yked9darwtr80zk3nj',
                channelName: 'qn8t40k4ltmnt09vd9wwnex11ktze820v01hlw58jvfd5791586ve1zywgukds269f79um3n7btobqrpq7czfrb0lhql6qe9k6vw61ezoecnneqlpfrfoxey6ayarfv78juhhvdhoeuw7droz1zftxgkgre2gr9v',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'ymus0q368zqu0cnjqixdqzwd1tl6u7ykk1ir158v3cy81wr7vqgs7i6k6m80tvf264cq3olvvdy992a79eji8d19hvz58mt9a8k1mdelglk8hg95adjywknihu51hla1fclz4ol25swa9wzx06d0cgzjfdzgml68',
                flowComponent: '95u2gw5li9yz1pkuh7eqms7la3m2zf5yfkbc4shwk81krnsr7h4czjveue0nnoy4r418fddvxmznqa46igt0mbffplutc8genbb291a2h6xbd9xb8b5evveytv4z7f54abdwafpu1ug8m3zoz79whbn782wnz1nh',
                flowInterfaceName: 'yiuqj03n83p5dclmky64gc4rnx37lxsgvsxyb2hut8ptakuyzoevuc5vvdbzaiycra6mijvawhkquiunj3y4nyqky46qiascn6waii2jk8gqekkew7ftutrkoo255monzyt7g2gsdn87vicevvmqrugqtbz3l1tl',
                flowInterfaceNamespace: 's06mk6jz5zdrhnofkne5vuzh67zjp0mjrrbzoh2ujpw74trxt6x2ftbj7bwmmwcud4z22unu4wo9sclp9hkkd50ybrn51r88w3tb790m62y2ml0vecnnz2yidnfvs6d8k4dto3afwr1hfklrbipxkyf96r8foqf3',
                version: 'mi5l2p4jbshfiqu7yp9q',
                parameterGroup: '4vshpklivtg4vwmie6a2602t6z5y8w54tpucvud3psc5wqkfgzk808attb0fxq0h04iw7wlx3xgncko38l0q5wddm5hi81lhhj5dql0loypdzoj7qr08ug57s53e2r434jgfvr7eqs5h0bpia4hs441mzcb4969l8eulvjnc6af18oc0xhnb1syjqagm7mefetpkziauyop6mvwusycxso8enardykbv7wstegus8na97xr9ylullk3bg1lsyy4',
                name: '0okaolgmoy8bdss3tzo1sw1409gioeqpyffb8esznk5ns6i12j3qcpwcd1ddrls5vlakfpe18xcqs9exiq8762saonvjqs05a9lybjhqo2ne1psxwp7w7eteoif52nau4uaviqttnx5hn360agw1e8il3tg9x8vtu0em08d4rqbmvmm48yidvly65zajansxmf155vrepus2wk2mexgnrcwg7dd8zxlmkdvv7x711objo7aumnz7qi9tdqsxdupe1yu7keb573v2uzae2mb7j97azxqqpbb6uno4tegv1lm3rzn0ha1qdpv3szrdtt8y',
                parameterName: '5vej00tiwysj8eiie4dn75hizlax2a06jzcgfpi18hz2atf2z5uermsn4jmxh3woqz5lezbls1ias4nh9u7u2u3gk62kc5kqqtpfc8nn824f872qeuvocdexvfj8eif580605kyi4ttui0vvoc5na2xhl9umvijiscevwgkmsjr2xz6ds9dxg22itwz22oulsz7q5y87pjz0jtgmiiecugh8kvn5w4bqusop5czh66v9hj7gj0jryot44muy1uhjneqdyszx58069wn3g3nfseu3n37y1w92dtzzr5azxscmpclto3rjrgdas9vnu48w',
                parameterValue: '1kcf66gm3r73dskw9is9sf1jtmvo553u64io4gol98t6qaay9zsx64v92vmf3londdiovxynj0d0rfwv3xu8ym5q2tyul2pmgc75f87rph749pvdju1dwqsc103pmrnnmgmoo6ddjgvdke6mnkyj6bckq4phhvhwpd26r0miya8o73rx6tel8g1flnsoeu6t5w9704crrscg13ambhlervjnq427mrzedzcffleky83diivivzmgp4bech4xcyrbxm6tfbposi6xp4cqwiasxeujavv6pqy5a2hmgmew03p4za228o32dxrjez9hokl7pquc9hq7kz03qxv0a95kh9t0767lee6tsgdwzjup03tnooshclpn6k2wc9qtjght3jl2uejtsd9u18l5vtjoyiffr4j7y4g99wx8kdm81gpyq8a1ory9x9u78it2115b9tak3ckxrl9eoqjapcajgvxfdp2b71j6r17c42b864a2zdq5vzoyfmgl2a62skjmxhlw5nvamhz7ffj1hl20h0vfu66u1irf8eibt06kyunnau1mhmeux3467g1eqz261cs5h2d1n81x7xk12m6zh5fj605z70pjjoajyw8flz4b6ay0eofcunprce0m637pbxab3ell628elhluq0mkmi1tvzmwysayb4sti5ufr9xsxejj3pxl07ktdkkthrja5haqiaap42jnv38e3sk15i2gw6mvzxvgpq353v8m5xpe7hzpwvm5l37h9owmdoex3vvliw3lso92r878x0bvem2zukm0pju60msybjzem8a8vrksv33t5fyicz97cql7jkh0vylh6btk5xmbeixdm5au9fta85i49bififo41bmavxj30oa7oi20mmqfg4wm0ci4mt83tzudoaalln0zdecy7h0afa5qk3q3n8t9havn0x0c2nqcwk6ovt5j8jrliznai5oe7mlr7bgzrb3floq818555u01q2xnrm534ytzv6kdn4xct8m2du06da77',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'pxibftf69js750gjsnjzc2u3hpc2gquf2qlst8cfr8spnqh720',
                systemId: null,
                systemName: 'nj06peuq8dlty4e24qfa',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'rj3mqravg3pmt778jlf281aojyz3gtfz7r9z5ttsztvebfy4jrsbxjxiruu3rnamk6cc7s7sefyzydprgw8drfbvomgzgvvde5u1zy5nbd9l89bznpd71jjmrg12s3ev2o8f4ie4lr4ggzvduuxti3u7vsimqdkv',
                channelComponent: 'odpww0hj4cz22h5calg70tt4bhab3tvj7bb3g7644d6hww2ta3ogzj8nsjxk91ltcgf6h2r4n9btajdwbdepflfcbc2iq2sdq8oyzt93llqp1se2qgkr3ts508yysl4sc9wy0fz7e8h69q5vs18dc47clanxsurj',
                channelName: 'zlzycniiuilj8zchfgb26g8p1d8thlcstx5ub9e1d5b9c7n3lxsmnffgmoo60n850n7vs1f4v3pe1jq95f8svin5kyfbxfs21eulveg3s9yifs2qc1q8xvi3m6f7t1c8kieqwjo3vgayc9ldwzx2d5c3dz5byyy8',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'd886xzs0qv0xw7e9gd3ojwm4pl8gisle3w45ax1z9u4mdgui2bzas3di64zqjt17zrfu8vk12ee8sj064383xs8z080puxejz5awmxe2nc0swh3n4y0mabm6srp20948u4a7m8a896jtsviaex9lef76kpca7sh6',
                flowComponent: 'f7ioxkghlgxfrz44ncyjwmvyuiwdor91mt86g3df3am5vu10c6ohrclgm9l59g0hkou6f1qnlpym1i4yem0a4xybo1b38h3rfi4mokcqy4gpfsz2mxzeg00q25rk0m2fbxuuto28s7v6ykqv3vcxh7mdqef5zf93',
                flowInterfaceName: 'etbdx2dq9y5u399epig7qfipgg1clqh2w1i4gr14i4x6v2p8zgbprze1oyvrsvxsl1eokuesgki4r0xrv269bs77gcn1s049o9rr0n0l9ud1duvqbz0590kxnhkyielvdu2ekl8z5b3bxwksy8hjb0fnszfim319',
                flowInterfaceNamespace: 'clw7hiy0iix0wczbrku4ds4ka21pacsu9wkni5imfuooepw8n69dufe47nciyfmnxiwkge2eev8y2ib21isb57br9urdwbj128sz77u1kmomk8uiym7yptrnr3pjc6dz8qmuk47n2qrtd5r8mcsb4j0kapbv3wsg',
                version: '0t50x0e6jeav4tbs945e',
                parameterGroup: 'qbakesw6ep3zgtf8mtrmpkd7m3pq1ojlqsuv2j2kjxz8m443o18we49mrqmyethhr1ljxw7cvx6ol4y2p2fix4dpwz6syvt2gpsuq4u7fejtqatfgj973kr949fhk64la41hbfxif885wtgm265d0t4ryo0hywapwhh3aq6hthhm9tdl6e4spldtxlym788qbqf3xiubixxg90uc1pideoxcj5rkexf18dghcero0y9q33assc7wndzr0m64ioz',
                name: 'vjomt04i5yko8ykkm6wahb0i171hy3678ddy3a1bbmu96hxzhmmukbrwgdi1udidke0zei0bn15ka3p00u0qnvp0uk357ym05kyh5tk3fywaog1ew734f76d5w0vwid2g4tqq4q5w9fs276r5obi7cwl8ake8gliujx6oxm9hn2yxh424p78l2hy7qigbcy5lz4dvifmjr4ju6i5wp4b73m9moybktkzi8dc7k2hba366k0039sj4x8ztfhc8cv94xzfqivnogwsnr057f47ad40jqlxmhm1e8rwp2e8c2mr85jwun062dzk189k9zb6',
                parameterName: 'anjb11ykotvueiqqnrqjswzn4mnptavhj7w791wfkf6d2jgsgfq7wxudg8v3q3fapkqvt59ces4czew49krn2cq6n4hn7kaayttk5v8zithovhwcupywusxt6qjobo3jdi8kr83of40en51vgg0ithfg0nusutyllywzjjqij7j7eonnjefjicukr8oo1ejyfgv140wqnkfh7icvs1g85bowib893xa172rcdzoyix5amxl95cbpx18cvvu6dc83oig5qif83dqon47ewnvlhk73cb5e698nt4fqsufph1xdc6sfzvaxk0t7yra1vn0x',
                parameterValue: 't06ieis7osxdp1evfcsg64mof5qeseqle0kfixsnd3sx9ytlwothrqhdmmz6osc5yyc5bq0nit8tjk5sfqd9mlafnbon37mff1d5ztzg93qh48itjbfgs1shppn36o1vmjsaopx7v3hngmzndydwu34wx0z4qf7gx1xegwjk0ama47p6ruf77bfcnbx12iogsuxk03xw2z2fraem2bfqgg9tvrsd4ti6l4cbqpccdvf75jzk4gwtb7eof20muvvlespkvzsqiybvcpxmfnzsogujc36ora42lgvuzhzuui84hi7iy2njs3dx174rvgcxjppkfn14u99mzykgyo7wps6nlfw0mdmm8wyiwsaiyrvlcsyiuxh0m1v49xx2qnqkhbarqlu4g9goesz0aizrx36kjt723akmkgbjaf1jkab9st2thcgqxebub4gby6nz00w3b0nc6j2zfvje3n172lo1376yzv8cqf54vc4xhhlbnnu22y79w1xy08yj6ayck7sgtwnkio5kgrzqyzl2pf69l2ii6d713jljk90in1ddyiivk4ze52qredw8hajoelbjpudv96c3ct3dztkzvlmd1ck4thgwyztgsj77i0fkm7zfuplpbgfcembljbo2fwle744w3mmysetd1l1k28lswxtjks4k4ofszk1var1wsq3hg98158ghmyb5uiks5jqegy0tkywfp7q2jv0ls9cw3qq5ltjgpq0i2yaig9ctm8ksrgb8zi1qcmwk0qt2rovqy38enazap3iq1s3th74wq5qftpdgevk5dkwkd645qxavq4np3xekxfddhyl7j9zt87kcj6mmgjkvj20yevo111sqkt8r7yud9prphdqbnadwv72h5qs8owuy6fao9hlq1iyu460x3s682qtz41n78lm5cxpmwahxzv2wskj0fo4szzr9a1li18q55crtmosm814rczyj8brapnpo6zd3g96olvscs5z0pvah3ta6874retk8kkltvv57uhwv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'fs40emagv0gj10dpqbhqxzaigoc2y3chh4cf4adajvsk6n81gm',
                
                systemName: 'xm2732s69y5vnfmcnldv',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'gxf11cycebz95jgfzsqs547uzd8okplg478amlck1i2lccqkez941v1q8ddvnlcev6blqdl8q5v5s7on5cg8ubjnfjtzsdtf9zwgl7ccuz4neo1nxr8eck0hk7y74a9w2agu188c0w5v3528k3tdki06s64ih5wc',
                channelComponent: 'xphl294hqvs9qrpqg6zqxfcmuuymmne5qhugjnsf7y0ptsp1e6k9vtrujqrs691qrx3uu4oetxu193lacv494ku6xy1slztiq94fjsosgj5pq6ct4whn7835i29z3i7cfzzm73j59oecfexarkv0dqknlr4dg2ax',
                channelName: '6h1zq1n8h8kza86py2bhbuxqn843jf1cf0vsl29ythrr9i3p5l6ke656f1l6sozlfvwiv39sn1iehec0gpsfri5hyooiksbii2m2lpec1r84ao335x8rp7o6vi4pzkwlnrlpiqplksc8qlg0punnw10x43oibxb5',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'r1cdg1elkoqmwrg2c2kr1rwgparyjqjp66qvykd3d0owan31d8tmr4c23o23iahoaiy39tnlg6u0gi0dw4u12jbbbzf01qv3oqkjsi3t18f0hoezdjt1mgbpo068893ciissplc9z00gwee2vctdu5yot3ij84ck',
                flowComponent: 'lfmt7ryuwo1os8kccjqhton9o00ziyx7rfksy92hlf4cf27yyvt0lusgiiea556e08tmduidpa3ks7tv60395nayw32a16bbb5yihgnou4qmro54xlzglznwmybhvi8b05lgvxwr0xr83w8v51cftwzd8g9ytgnt',
                flowInterfaceName: 'wkg8lz7o67dt7h7iwoe4foie8n04zjsvvtlmty4gmlz5ey1f5t971k6ekpv1wz1uev6yxf4hvbs3g3onufxo0ic8jhledv0fco654ut92pdsgsdyo8ieq139eqxf8y32fc1yg2766i1c4mngaw2f8tukdpmispak',
                flowInterfaceNamespace: 'kocgevyry9q52yhsyywsvmalpunhbbh5yb1mrghkyd09r87brmvf6tash3dd3djtg0obujns9p26qbg3ixzawfjl1ktk2zt1j6g62mxj4hgjmvbcqqzgafjjsw1ykfyqo19wa8cymqap8edsqrmb6qtpnp1eo185',
                version: 'cproud0leg231r1la6bg',
                parameterGroup: 'powakpw6ek2h5ge6fxme15mbnrqdeophzc95zdh74k23xouk77282jtjbn33l1pp4axxqq0njhjc6uctplzstlteb6lcyov67djwiyaqdo598v0h2u8nib9yi8l15nvs9oyqzu8j1n5c5ypty3swofbx0tuvbpq98r82oecpiv96isrhiu3ewt15wik5n73lb58scpwzfugfx20fy9fcukpd56f9th6u58j4hruwrh6dgcfv7jj5lschts3adao',
                name: 'v4y2hefg9tf28ky2v8k3aj89hwwe66lbtmjtqt447qq3tg7kxo2w6sqyj48svnmtd9k0h9eaid560x5kbxwg6uyf72s54a85n09x9x4zci5rdaenn2avghh5whfb3irix6ie17is7jrvjw3e1wo1rjp4m13aidq5lgq8q40789tim8i8eopdqayokzghhyl188r44zjufi41ihep31qkol1ayfb4bnjtr613z3cgud7o9rgkwdcvc7jpkp0pcr68mi0fgihleikjcecjl5hen8cgnkhx4kjh1dfm9obpkxcvm8sarc7ecvsg9ae0sbzl',
                parameterName: '68lcn1gsej1tgmwtg8it7tkd7v6c8d7z74wtut1mwqknwy6lkkb81cgik9sypcury5vu102gz2yis6q8anu0g8hj7lcu8o539i5u3up746q98v0lqet71mpbmtfeygm5wm6isosjvvgkvx72xys3ixerajrfh0nzwzvjzc311zgouv5i879ke7o0jzvmub6tv97t4gu3j8cjp75erv2lkcuva3i7bsplvf34mna3cq2pq0bp4y96ermocogadrj9a6fch1wgd7omsly5s48qtzy5ky483ll0ahberchexzor99flxsd7qbwvewkbf0qd',
                parameterValue: 'fnah6yd9n5na5pvhk9vqkku49kl4voi6afn9j5lsqk89yrjx6jsmiol7kp1x1cmmjntpnfajaaeqkbkd90fgbt4oe9qgmr7z6fn4wyo0ifg2spa5h7jdaj5rb7s7x5hid0bj2tjo7qom5a6s1nplk5ort5c6y6aoozm2m7r4wgsori6ju84dcen4jl56k4576tj888scurk8d1agpwhg58j2rn4w70j6z1ve0m2yrsyswsnaczql79zfoyx2dm7w3fjtwaic9tdkyyy6wujz8cus3lahmwgtpge3vl74i9ecxrmgvq0jmyim8o7pb8irdi45v2a3la1h9b665na2xa29qstnbllgbd2j9mmf77dfq452wukc7z8vc4nfjnca5n8isc5vo0yhzex4gzrgt3j2d9yfk95lufco65zxfeiklx9s5tns78hderik9p19o2ca77jqvv21ssyt3ulzf59rwm0hn5v7k3wmmyi77bczsyl53z5x2vii4yiat5imy8g4p6elpl141vgn1ejoyv0qs57bp84dz41b69ks7e4bc35o03ui7i5gya7t27bnufbl7irpmamq4marel8e6qgpdqbcf5rxnuzv31452aeocsdg7lnpyy33fqtqe6hxgicmtvzh123kxzkosoyj5vzb6xe0up0me70qtwv4r8pwbhqrs89uud95b3hwhij1luupw55vrmedpr4ea72k3vf7hsaag3sys9cxxr5o92kpgguucghxx92kqlowpe208etqikiq8954utdo622w98g042nn62q969dr373x4igvx4bduom2vkqwwue8ne7r0d7f9slc3n6tag8toeezqe9k4gjwhv6mxomewtrv1yk2f12ezf96yag1fname87eqja183gyvb65ktd948agd08lddswt2gwxvd7x1zw2khqt3t2omxz7s9eulk3au2s139qblq4tnku5k4hxd4yvqc01f05hw4vom7y1emn3wgtd601pwzjo5j71bwmxhvg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'v0uwcv13hql2inezh9xw922pu0v0i38l7iz0wggpszmktgl0ay',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: null,
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'yhkd3yupzfy6g32i83fdkg8e6mca59exvczfeg9wx7ieeuetyo6on7tllkxtd93jscw7r6frt0rdnwomx00j5m8uttyvz3dfgb7jwzriil8elvrdstnxu3rxqft84w5hcn87c5qp9hcecwnd4brawlyumufonhjo',
                channelComponent: 'uuoz8f20jlnr46z0x6au7l564jpu2b2o0u9v6egtucbl3jh81tv5orruiwvyca9rs4fcpxmh8yp3t22ry5804m6uceg0z2p23hxsylj5x5fqf5x1pxx99gm1ommphubunonlxpnqbrvave5r5ag6ozitqrc668cu',
                channelName: 'staxozrsl2apxrmjwrbpzb1q9o4jkqk3fw3el9w19k6xk9su9qgcfs2acayaynim2ix4n8oa7xesu4nsumzfqh1o3l9wwf8x99zqnchbwn1rptte2ybg9p5k4ty9fg82nflupp7vzmdhdd5hgw9uu108n5ctvbd5',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: '160f8f7hna7nl8asvgixdzb96of2qt8ib8iepx4blx8my8z5vhabo7kc7v5wxvzfwyjwpvsfpu63yd8p576gi4nw8mdifvmfzqbjxb78r3x5lrwl35iafuwcrhtdtzef16n06qd8qde2fszckic43gy3vbotfobv',
                flowComponent: '66kiv5k86c86sjjuifeb5ehl9aqw71l5mtn38ah5nt31p3m9uaqdlfuanmp1feii92065ycs43dklk2qkl5mi630ywnpscep684ay61r3c1vdthc3kji4m3t0rosabi25czow3mnd7fn6v53f7navzxderdsggv7',
                flowInterfaceName: '9z6ss3hp50nwfwu5ymtzeezkelz2awkxwwbbuw4rm7urrmu9dv0987yhbfyvyrfgwqghj1aqosifa3nf00scv6tm09zqgxkf15tli6wlo5tkfs27kvmhzeyl4gvl5lqanbt5a5dsy7myq234spe2asd7471m7nug',
                flowInterfaceNamespace: 'c7d76v12s5gbztsti0qmdf0m721dkd1d6qv7k4rvyiw5lob1dz9cncfszlu5rcogeac00oontd2ypq7768yl59bhkg8xw3dzhny5pxotrtl82vhyqblyw2ikv095gsgw5bb315xi6hwpodxqru645xl398tss3q5',
                version: 'ixgjojvys8ha1w02zxck',
                parameterGroup: 'e65wk7th8qjxkxaqe6h3w6vejvlddysedledychwtm7931cdkt76n1tj9olib1x8n1rrmmcc48u6dxglixafzrz66au019owcisp6c9vdmygp3aiaunssjhthxu0e2myegv6pzascfctf7thez6wej7hz7nx47yo80vyij7zdkj6dc9ct8aa9bywku5fmmtmsp5elc9ixalpehtpkvvamutnutdl65q4rusk11ozc0lakj12dcojrr1z41btr0j',
                name: 'isj0eese0tfy8k123mytjst4n2pa8hn78jweft11g7h3998868gnki44rmpf5r2l4nrb1aqr2znni55zzc0yjvadufrhopo8bjmfib91i4ljyw90yhntl666szprv6dzfo98b2guai1xcv1npv6hjizc5zc8hli8huyir3odm4h8hf4a6mhchs5u54dzopbqibsf12qfo1c0vodjl14uk1q8xazgyl5rbp98f6febs80vl96y9e34jiwj2pexibfaervnuh47joh3w4s5cvv67j3yatw2ki9omzfdkufh2iq4s0dub01va17arkro3p6',
                parameterName: 'yz6y04xw3u3n60j9m5liel9c62b8cxjs1p946w7b9l746w37kqgagu5cbvh05cd6cktjealfodrkeyybpczbyrbnjvyka88ch3rctm2jak3d5k9f06dno29tmro2fq1jvfbapbctr2ghwweeyxnc16fi4zr33b6zbgutvh43z6u8h1hgstsg7knoi21wvij3rz5c2trxh62rw71lin8bltpu7huesofu077bevchzj6anmi100bozhg7e7l02jc7xgv9l8brvc9hfjb2g8spybk0rctsjgd55z3efs5fxhczvx5ty7mbkdx00wcfm88l',
                parameterValue: '3mu3rzghxle088wn01f49edw07s11f2lbfa0ktcse0nd9bsqzyj9137h6m08petmkpbl88t58juzjftj71tegjxb9coflijcif0rbsd8dy1x6ik7fyjy1rsveyg920hcbxsjes5axa1s2mlx3et5vf6iq3hylv2k183l4r8840x613h5i3utmut9p3pmtr5aq0p1yxe6eob0d8z6jz9rkxh1gf11klfvus5a4bwzpz7zpbvpmpxowxl53bp6963l2boe9iornxcy500nsyb6f4o9fasbx1x2yi79h3auga18qp2i6dtdtk360kcm8olak09llfif7v059dbd724gkyanxlhlmy33rdt3zu5ocy4c7ydcgwc2qno8ogb8ob36z64qb0k7u0p5o8rp9alvyyg3u5y5d9k1zne41asm6u1z1ets0dntcsh46fh6c7th42scly6mjj2wkw9xzdygk0mcbahem1e4yb1vfdhez875qelf47ku7ybi9gu9tvf4gev3zhcd1u4aecaj96zsbwna0ai4fwtqyez9k5xk49uqeupm32jo0eowljdou2owur51z2zi8z52agl8y1xonxdw6n1djywyjedma4u77aspr6ci6qiuvotdm3jm128zupbajfp1dlimfvj3bh3xntp7qvw9t9mxpw7s8ctcxyl3q7mgntor0xb8rxi3w7iaraa3tluwsqwax6d9ml57bfi8mtde21ln1o1edsdmmmg4rctevvyr7k7ost8590qp8n32nvmtbmpvk7kaescqezc0xeyn45z90e4mtg8km0n8rvxdf9f3n139opiedk0pk95z39fk7wukfwww373d2hdsa87e46z2a310y6pudfkh4rioiksd7e61ym870msmq3xin644cprzdw510z51pcbf6l4lx0rru56tf8cb8yujax3ksyleg7zkbwdiyhweb3lio3vrh1hojx9d54pzdihba8t6hmgl6gaxpxymx1yxfxi6s26lrzbrhbm6ekyf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'd8ykzomj8tgxhrpppjgvuneupoydqitzcxkdeacifnv6mp02o7',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'ftav29k5ieu17z9i3vfbqhjneb4i2i5bwhpw8ft1f5so0bsf9w7fzp3mdxxpzvghr7nljklof0x07knklgbkwkqmy1n0o6iyvog67lw457l9koto0h99xo5gzq3eh23xkb3xyjvr866d47zdoivz5od9ep5qt4pi',
                channelComponent: 'k3gifkj86rfjyq1yq0rwbhmnmri31ulm0mg87c73fwmw5y1n53syryjd33k36snma8hb0colma8ad9v7n570snpoeih77fsvrvb1jhs4ci4a1i7dsoqojfffwl5bqg7kfdxrqyn0z7pc9jxokgdijtp8s2g9s1gk',
                channelName: 'vs7db0efkd9ase7ncug8afy6m686wukwgae1fktasuvsvb27y856g8479bw58vfwq772j0llxlpv0c8058je5gjkknknlzj7twh9n8w1rlsqqzk7l419wdgj4490p26r7fmdiihz0qa86v30xoqmk0dtifrzq872',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'v452z1twepp87rrrhpnmbzwgkyhulz8dlwmtpasn7jbdx4a540w15gnct1oims0id9mk9p17aywh0h04v66wesm630prlrsswlri3dhqwq9qrnv04ks27jy62qzwxfxpgk8qgr020f4f6crdnaafp41dulzhhf40',
                flowComponent: 'jh47o58l3nvpi39sj3j1xizg6ypb1rw276csdglr0qe8mx7vlovsyiugm8667tzkj3vpftbq7ddkkxhqllyiblaf7sh9x73g5w3ld7bjjmik1wemsmw1paj3opi0jd43gz7iqwjk8kbww0ulbynzoi9orfemnprb',
                flowInterfaceName: 'om41bwlwqc5flampnrgxkb9mul4pnmvhdi5fwq0v8jjfkih1wbj2lb6fmzp9nbnp9g39h8mp9cr1h1g4brc7m6p7yq764zyfcw2gqtqpjm8s1z96sn7bovseeear783fs8j52mfjc70zg0t9zzs7n1uzgne2c080',
                flowInterfaceNamespace: '2udcfi9gnid4mmtsbjncjhbs630i2yy2at6286kmes8m2axdfryl9l7h47flrbsbn2hf0tmcc2u7hatptn8bt5kqdvyxt5hzqlyyfzuva0zpox8r2q0kz5q7zx7ytq6kq24ydy21vn34x14vimeq158p7y2c3ift',
                version: 'iln8dwuf6ib6of33qhuu',
                parameterGroup: 'pyg05xgmwrhjc9lyviwzbzfw4xsk0iyuy7hfgnktilhm8oq9h0d9yfbb4aqlej2smhy40lynqz78m8lgasf7eiwcs8eavbx00zy3lvvapqs0dqmn4untf1oywa83601fp5xhsuauuqt8urzqwmb94o12l05ws8rb1oppca34yo51kvjhjughbrhis9vnzh1wbm4fzxebjfurw5ch31lygc4uonrxv9z1qxii25nlzrhr72v0g2wfdep2ka1uxex',
                name: '6e88vow0j37a0mvs2d9d4ej65tv983dt8cpmh1sfwcx391k64yjsfi4zjqq9a6n8cc8u5mj7pctynjxrbufh8nm8taf54iq0owyic38w9ie2jr63j271w1jbski0w2u8yw4okan57nxjtjle3cpk7ma1oz1sk9oxxhpvipoh3j0pradivshc12qbnm39g8uhyf5s1dxigka13u1x817jdsz8fjd7re6gxldcrcy2omsk21c1jv4htrod7hxj0c94oita1twng26nbz8od237vn1c4dzjdygi141k8g4ev12i6s5lfmstp7wol6mbamg8',
                parameterName: '8h3ek2xiahn55g5icd32aq3qthjvug1ysr6qwctb2tbcq44ur9yofoj4x7khh0hdbq98wikyg2lvx36vfoextk903x7yanvct7eu2exju1dliucqu8dbrf7h8pp2ksyebapj90ilzhhfo7vskkdl6qn6hsjbdlxvl6o0b16lu73g69zcd7tsw2wq9nid1j2gn7a9z0yyk2983lh27v7kyilqdplnw62s4clg90mjup4vjd91hesym2l6jn0ti8aelp5myakdokwz8ihrxoayqhtlp510bb1zy66fdq8964fsqvf9kn1g41wc6l26sbsx',
                parameterValue: '3sneimck86804dzk6rvkpqaoljn324l9xxfjsd3es49569soeflbf270mz5sptv3x4fligntfm2ghons783jibyyd4ri62qowr3zsh5d65klhtlsk4al9pvsv1vlj3zxci4s74nmmhfg2pbz1mtpztfj811kxw8gng4yd7a5wfwk1hohzyozc3o23vuzol7rjuz6yfh7ufl936b4jw455x3xoicvta0qdaexschgejqvtuennzqdnawg722yftg30ytyiwuncjq5r4urnufuu2cqj24fex85xnhr5lihfa9nxatjdkwlyy2u596da8ypcl6xdq8v67jukhwov814lz0vkel94g25p0iqbjffw5d8wm9s06v1g0r7l4bw4to5qvjyh44f9w4mek4nd9spa1hnu092ukd6a9jplphlhv5s1l1ms6k8iy1le4gaw8or7yj6ql28ngk3zrv060rd18zw5kmzilsa4evxsu9y5bduycq4dsd185u7hafgkb23ycdkuon8seqrcs88tjctvx55dae41fkc9bhat1e92nqu31a3kl0zi0kupqssx2hw68se5nsqn8vbw6akaepuwzhq1ik6jpda3al5ajlw8h0mzi1ri6xqie4zv9kjgi09zbdtceduojdt33amcwgmdidowzutgvoz35jslni9r8237pw32cysvtcbrok1s5h8dkb57dsl7uzwi4g433q0nfjz381otdstt35gkqwi5xa98ngu5ovhxgcm7szwps6zikmn0yezf4w2srn2ema5mkir0rs2wo6ev41gy8c4bvqs91zxb1ujrz78p95n7t40mm2b21otng65gj9f23lly6cefnuiz5ut7ztfwjb67qu25z6gdkdudq984f9fbzodyvou8nxu7bmv7pf5y6l3xd51wl2o8kjhbm16ho24kacuap0u3aarna6s8wquabo62hywmhjvk9k8vu7v31kzjvuftwxsz7r3mjhi4y4sxmvbdrbengtiat9likf2i23b',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: '2x3t2172z18ovhdogv4tzo4sa6f64uw9fdnpixjipmusygxhkr',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'ypg2hzdfqu0dx475qiou',
                channelId: null,
                channelParty: 'fqryyicltg3rooy3sygr7fwjozs2zddcbcav435fz38tc16f9f1kwu2083ri6b8ch06jrafaji78zwbvrzizvltda50dsfh9nakvged87lpmzpx12r8redrajbb5gdo4sl3unsy3avbn1dvkqvm6xyotg2b87fj8',
                channelComponent: 'x4dhqybddqf10ln21hsw0rfaap48q7gncjjwijzzn0eg0uv46sot5ng5bsokeoht8ijg3dkljo254uuieirxdoarx0tfo329e5gv6zgth8etzs0f2gzw1gz330zs218zz90lstxaza9h7q2re93crlmzh66xrsdf',
                channelName: 't94dckoq702kj1v2jrlbinavpzzcv55zggi7oxmeawv5xvz3ah10j17rgjlbyskxm3chzhuo2xv2g0kmh1xvvpu9dmu8g8fr1hrblrxxmx5m3tsxge4q4o8g7oqy9hp64cri2y4mw7oex12ir91hdc6e08u6lhqc',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'x2ovv4vyqsb216inasf40909acfxsz6n1lkvxpqdiv7af2cp038b1l4a4rfirnaeapek2auvlnt0wv39udqjl5407nbcrci2mdzjm8sxyrmx3fxbion25khzriymjntpn16lmo4y0vb6zu0t34zg3knjg8vyfxeg',
                flowComponent: 'lm6dfynntewiev3305795b1zz75sdgktl052l5z2x3wefm3q7c3b9txotm9jvmx4pwjshvrqyg5gtf11424zkhh5mgnv8f92hwvrv544zqehpz91glym0wbctx5gj6de6004mivo80r7vbiygo5w4ad7e4r4qwv0',
                flowInterfaceName: '7k473bxahlqcuzul9hapzom0wokcgmtka2npsikzla4pnerboko9rgbxs68o2x3xx7fsbe861c0uhugsx96aank0apoa4klkj1wtrwedrl8hfsy1h21ni3wkqt6sxx6vc0zy3pnh67hol5wt7ynmeo97zywazkcx',
                flowInterfaceNamespace: '7iaz0fioizweq8rh2daxyq4fqtm5zjybqp80kkn440xl1wzppy6otiiyox2tz106tr10jtinprash1cch5tg4psl5rpati3xhlbngjqxqyzx8gjqoiiw415jaes4ssnftl6vlwctdln2vdyik9v0dydyqvez095f',
                version: 'byqdcs3rnjhqcz46cqyd',
                parameterGroup: 'o8dcipl9va93knwl3o53uplb4rhk8w46r5uxdc3h2bqp270eoybnf5g4nnycltwa4c3naev30xbklmrbm4yjs646hiblj73x8c9qguiilzb9ymemm03ldvcn8tyfboef2hkbk5chcq89y7x8eueqq1bqll2fw48lgjcbtiadromr68c9t4lcuwy2jzr7ow60o2xuuw9506bt5sx9gmcd38dz5vos1xpy4lr5pmt4moednfakyeun527yzmmwd75',
                name: '8p2cwjhylz8hgd67irg9ljrhd38fgxk59opyx48bp8pbgapmdxph5rq8pm3udtdl3ky5zqp91vsnc6hmd9zkgtk79jgxgstzmax7o0af9nt7m0o55nrtzilyfyndt4kofxpu01n9ful5ur0vz5sl0f1dw0gnu463vd5xfi0bavdm3msutrkirs7ay4cuuxualezjxnzu5v33g9iynnml4hj5too2ul86ykkzyetshtgfzhrze17phvu9z0ee99yxvm8b08zc232ai1pkzjgo5gjxq5xub63gwnw56dd7t5nih4kfh4f7pgvxtn9prr3h',
                parameterName: '7mu7xjvzubp0ybonx30p6feehw5f8r1ii0pablnzocn7k210go7xzovhsccr9i4an61xri6m1uawtv95hvqjxtokrpjco16wuutadywdb1ghwqq57c8v6bvp9pgu4dismqk06vqbo3w17mvfrsjuh4fush4rvrg8hy8h9r4ksi55cl5oc7l6b031pw0dr59az5vfsnfp0r14bul5qmnd4ep4vpq5tcpbsbl886pa76pnn8km8y5awhup0k7o0op72wpx7i13isp0jsu31ub4bgowczchoq8ecnuu2wryj5xwlufp2n26j2l2rv2qxrdx',
                parameterValue: 'geqpzyp2y10fq995xxka83mmxnwpxossfc9n6wkwzi1fw8iefkbb26hudjmdhbib8aowiiiw7q5u46rxn5rdq1oww0eucc59m5zb4n4873u2qoi4212186ykqsvcds1wlws3e6u70brie8mwj0daqolg9qf6z2xxhvelys3m4s864nrbvontgvvt2oqn0xr5rtwt6zgllcks4peo5cg5kic55uasf99upv6mv02bvdj15l9wmkv5ubvvd2zfdf2w8jl5gxfbph9g0fbo1cytmy1nqk3s5orus5y93an4tau2pqjmhrjfqeoiemnijpr65et1445g1dw9svtyomzi9js9rgt3mgrak0hmpq9jqncdqn1j3fltrg1a4ml29gmp9b1qybc2fo3rzv2v5y0axgdab743d01wc62b6gej2hlwrpyrzfwg73tdyo7oxpgm7b3nqsaquhb64ae8k0evm62i6ad2z3qpf5axjk8m8i7f4hrxgs3ej465aaldrzyfy0l07kfc80tzift576ytdipwv2n2tv4zssaey2osyx9gz1blj93x66xuyap5v1l58k6hb38tmtmu9gyv7rvqpixmsq2d9gwqbdfis3ujyshedd2j7kpdo9553cgnxy6j49mlya7z4lpc3rbqn67pcyvhb1a95yk6tqfp9ia897d9ip48ivbyphf9o8tshyvbklxlr5jqjvhyhbjxoru7tchg7yirnsvvzj81jyf6dg1yqzlg13rukok35hfb65vilqcyt0fl440eppfpfktgobv1tj5nr0vvkmtn48wlpuj9ajbiuyx4vkdom6mdj9wctxgnq5pqvly6ktm4hujmjfv7nkfnnn8pr8kcbk5eby3cliylihvz7dceg1cqufq33dovnhp1bqohaoxr1ru2isaqfx53hd9m7l13ybb3pd8g1oxnspx4aoaexgrdmsepuwlkm252904j25uvuaq2auphedbmggbuicy3tpv5efkf4mwonmg73i94j3s9h0az',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'cuztd2aawm9xz93pw0qxv133gkjphr68hfxlo34am0stp58m2w',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'jzc5bn21hmvw200gcdsa',
                
                channelParty: 'n19ktpxxvo98v2trvnsvxrzbffj9m0i5iybybidt49qv0x8ckvg9tum9x4mb4l4yrj458a1ca4p8vydgdyqbeaqi7kiefhb30077n4ulgbej60iet5bwfya8p8s5nm7jglmxazxaixzzhq4wgrawkufckl201y40',
                channelComponent: 'irh8u2q9pxzweblcs0ztgm6sdqdxpsd8xuh3dw1x8el7dp2qf8e6o2yxgdfikpzg94uc5ac1mob4aea9gthx7tbew177wlbgjceyy1m4xxhawsnf84i6jmec97m47bdoteme77fy5cwxrf8o0lmn7wmpgpiptnwz',
                channelName: 'ro3frurd8rov06bo1qpfs9k5scv3pukb5eke4zuhd15xzs91fn9xl4o69uidh74omai2h1smgqxeqh405bzl4g58hjfr5bonsm6tu7sb7uon1gmpmt5gf19tzyaak2pcp9xsamdvo8gdvq73b62txjsyhsi73d6g',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'ezervarul8pe6vl2f2klzag0in15abohdck21ewew7bco77nazsziao0gpfgrjc33syipa5rwwqkdgt6v3zko1g9koiyw29euyetctm4ru9fcd8tn662dbti87xcgurdnxnrxvjehil821k82rqxqmr81o0s4qla',
                flowComponent: 'nlkat7jw6910est6wx1t16yjw8do9bmf58jzty78cedy0rvdzz7n0305lk7k5abvm5mi1fait3az6xi9zvjgv6gc846c8rzznm8kbddhxkgry567178g0q44uojunl6bccgh7svb8hxw73s9zkh8gsrs5mnfms0f',
                flowInterfaceName: 'yajtt6jn25o0a00qzyqy1u4s50tbmm3cvdjt5r9petid39alv4gjsy9dx7rc76maptrelzet8vdb9d0f5oy36qt9sldv9luy3wu6bdxt74a1ed0xgghnletyferk8nxcenjhvr5177yhgc3xlgt9clprq7l5x0uf',
                flowInterfaceNamespace: 'ahlmi2trq8kimw4uoua5a5osyy3hgqnwam0e50rpr05an9ljgkregpokupx1divjhztodjcwblsp6xfdu14icrlt9bs86ze755ecugtgdfh2047o3a3u19olwccnr8khgveefs5un6yaemb5swggkbw1tnxoj788',
                version: 'bj17aivd4dko9rejp629',
                parameterGroup: 'n21q3xo137k2rzsfmcj9l0tvkhxd5a7nxbf3g2e1p483k54nrl2xilc86b37yf40pvw6pa934moab9b9vo0ix3c8tvy0eqqo6c57tbhphq509p5y8iieib633aet5i8fdv9m1nvuit3fs2ufq02aluyzgvmb5iztej2nvc3qgn8a5nj01nh6n9o559k1j3mhrjudu1z4r9u4xwwkptkmzbeyz3hlcyn4ms1nflbv0p0kgg2sjgua6cuv9y30hnt',
                name: '5s49dhvsu1hf3qckde1mgzwm6xea0liwmger4zlp1fq3y9jd99oafmyotqrlpmbs2uupsvpv6lwhvj7h56iwyj1igy3m39tr9kigrl478xfrwge1017jeovajs2k5yoyrwiyawbkgq4zwv98bqrznpsjmh3tshow0kbgnm4slmu1oa092uc9phhchhuv7vh7z7v6282drh342ejxl1z2jhufpudak9g9sltexfilx20p7sf1yfhhr9f3g8uuebtdx5t12t5j9o621c2pl8hn2dyolqog87z1l51hs0zn52xdu1zkds2egei3hro0xecf',
                parameterName: 'duyre493nlbq8du24b06asn2snw2lk4247iim4z69565kxr3rt8bbng3boju4fzj1x3x3qudbajwt13181aclc0brbjnq7rnn6p7ldm03pbxwz9ag0r6yyi5h1sixjaxigvcnh9fjv71b35qsu7k7qwkd8yievm5h53aswo5n3e1l0j81awl9yfzalfq6w7tpddaoxorhwtnqofo6iswln8nj93nyl9ncu5c95a0vqilkhypp6km0fdppsynvcawclpmo6corzajgcd3u0tfbkwur3cim8yeg08y6jo6rpuwp7a9d2k89liwrr72qet5',
                parameterValue: 'qmu7wpbksmoxm76qhzmfhr5gfwqdd4t6v1frzj7m02odr138odb07alc59ei3vt7z0qsrrp7bh2y064n4jhow6f1s6x7ewfdjgqfou4l0unwaab8w0jz30jgn8t6ntuf94776ji9ayjvbsjsn46gksbrt9yqzmro39xlcyaalppgki19wjzgunma4tn49ts0rdu3nkmzvodlcc57mhvay3k97gc195t0yp03452eclcyprvroa0b9c794yxb60o2l5jrjusvubrodbclapr9ncnmn1jtxdagj3omf4322ek79q2ezb1abzp86npdrka88rq3kq6xxwp6azzor0ptk0yjdckiag60gabzjeyaou5nc4pu1ve8cbi7bwwnpqt4viz5mquu0o6dku0guo8h5b9u07d5i10c9e7mmnrhp9tqzygebn4t8xw42s3l0st49qa558x3flp5c935cvvgedtbccdgkrnwinn2q48h2zc2fq1cjq8fj6igmvrapxvj7bbt67iz42gj5tlls9k4ajdhu3rgzl0t9pawmo64bow4vbayeffjzqozt6jr14k70y9unoql960gecawnf1hhp3yv2pl3vhclegwgyu56t0ccplxu1zrnlciapsrb09jsstyyd8xr2pl8moran0qac3a3dggtcimiu0nrw59ngoc8rzg3i7cwoirh286ugow3wls4p5udsuv0f1ijr1k84pqz9javu5rfez4pqs4iaff56ws23by7rslf60viqss1c44j0oucx6ck9b2pa6k7yzaecge3vb3m3uijs0natouyu87s50pmltxzr0cob1p6l604b3e18zvrn5624czs2vir8evbor07ik0l1u49v9uncqlf377ptz6iwygotcv83ex0gpp2fjtz0zsedgw41duldzcumjxuz0170rl3eruuurlp8byw2qhmg456hboc88jp4nyj6lfy942fbexn0371er9ub51oo8l8a1do0d8pi7sy0htsqqyvq5nqsu5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'm33g39qi31u3jogojv8zsnouq57uc5756z80emb2a5342qsue9',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '8zhs5020u3l6wwgty124',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'kl5ci0vlvbawwq5zut0ha21oxz3i11zcaqafpvnefc6oszsgvn9nhc4aq010cmkpky70x0kr5sgo7u9hjl8l7eli9ku1322i4yy6znuqhx8woi0lkjv90ssiqk35yh6t8ypa3seacb9li0wl6oqififrk7mcd294',
                channelComponent: null,
                channelName: 'ckg1bnzkx6b5a0lnmeg0s62nscqknoqhzbajoezgniq7tsre5448lk40wybvlgq51k6qfm78gvuljpqn9t9my2fcby9lrw0vjv4766gnovu83rbjddxtyub5muorva3fpw115o54pdjv358aqwqdijoi8sfmnxhc',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'yhl5070o5vpsr4bs39970pydhf4lkboel6gzsraf6j7eufchp5yu4cze9xj82hayxdf74e9j1la9unrqiw091xucj5tfu0kyfhip3x5axfn3i9nebqsm4zb9betx5vxre5zrt6xr7coo60sakev4x0q1emikn6hb',
                flowComponent: '2xqowfdsn85lw8rgo0j70ohqunurjc8i98zb46jzdivu80tz032pppt1bs2mib4eu916bit04b4bzoytxtraebup25nk93jq8d6ay7sd5h0nfu8mly7igefvn41kqp7b2w788xwr1bdc895nnufa3xb9vu7d5gb9',
                flowInterfaceName: 'aa158pdfuaqc1xqetn3az89npx61idx090m1u9rvglh3bock24lx4jqgnvlr1b1vd9a68ewg83q4a9hnzqrx4t46322ip5gagb050vra93wgst6h4wib0t8l2cbk90znrbivwowrbgfn0xplasvoir5jjeol8sp6',
                flowInterfaceNamespace: '58z0b6nbyrz4ufvnnndwl022k9cyifxu0txes0wsu9lyzlmgysl1uorvfwnqralilfhbm4dbes03tf15bo4sxlkqsat4r9n0xoomyfceudap0neb1ur5etos8l04gia7o8fihlwva3xhvutey4y77j4uvuztbr0q',
                version: 'x5mpba4t34i5b00uqlmk',
                parameterGroup: 'vwq5uf5xgsp1nfmjma65f60wlozzz9rjf11jydzo67rmxr5u6r93fecr3f992f25dw7hs2pbyxkeprwtjvqhe56njcpf6hc2w4vfb5p6q36fob329fz0es4htx32xwyws7u3giuy874muncibkiu0iiuk3uec91n4jd7ap9t1z9wvyco3b55zi9fdh5immfawbkkex3wwwle5ghotu2fkhj43syvx96t4v0owzg1n5dj625orpkm77zudfqj0aq',
                name: 'e7r9koi734qrcdwhjdihbtuj8onbowggbix8xwh4x2xdoip0b0cbmqv8fsa83fdezkpl20z0sxgjvf4j5lshs7cvmqdt68hxlcqu532m95jy09ktrc447jg6goua978en8rwl4bwe231m4p0vioskcobbigmr9o0v6r1abyhio52k06u7kd3y841c3n3nlsplqqm9vreh48g1j9b72j11ninfbfk4h5ol512oqj5l67ytddbahxz92otp5r17b64gimvkyicgwik7mcu1433ycwvr2tyriu83xg89o1f0bnu3urcwl94jxqu7dwe4iy7',
                parameterName: 'j4shay7fo7jfhokdqfk4ouxyghwmmbm34nqno5bb5463dft5yuahx7glsyrkasorhgsitt9enwqh9u5yy3hdfqy920rvzvrmd3e48vbbro45is87fmw5pfwlpaoc6jmhew7mf59sg7e9uomleng71qx3m0vd63sh803o45fnqagf9lctgu94mmtt2c7ofoi0fxmq1mkd925gzaxtxdh1dlqova8wdck1b08l3vpogsfpeo0cfug02rzsfh8w5kzta8h8lh57tceh5kn72s6yuihbb6u6z19x4ch7e2w3k10jubc8ac9n1wufkv09nghl',
                parameterValue: 'n6qb88jh31zri3u9pq150ipy50l0ubhkckz6ub2ft5sya8z24daye8qj32jq2t0bkzur4yybv4tg725a1o5xmihk5odaqwn47bv4nqlt1cx19ggs8wadva5v67km0iwnwulg7l7s11g7k8d4sqsie0zadiub1s1s98ffpkhbje7u6ls3r8bbi5lbwcek29gxvdhn4rn2jfz7n9dvjfw4gqygdj6ibpnenf9pa6q0i2fkccw66c4mqopvqewgpii1590qfnbusshqei06or1f971ypiqwdlpj5cp278pvc1pfnm7p3rrhh138qxdjr91ezvpifp945l9xbz8swo91c41i6ayfxx3jeyay8z0eih4hsravhrcecp40vflgt7zw7roaz91nx5vshqov7nxv3nhtokgmugtdfynufqbkb5n3kgvtpmg9qqye17062cn9tky58s9bnwvauwci73r7ugi57l56xzv8dooobo7otjcglckvu75ibaan8srrewni1r6l4dcoffn0zkz7snf0era8n9kldoy37ukif91408up2ua9graq6b4lsfq7pxgehy1xrh35sjhfwbjfj61moffebb001qhp6oi98uwjsp2nny3cn9l9g1h4z6t5ogwwyred3z4c8aqu362kif0h8h0r0ecqcjf5h5l2ijciyq77opdg7vo36e9nb1mv8pnaneyq8skz1lavrlc04xvhn6h6470x685kzinh4mbul11rtk80m3gc0x2p7ko6g2skjlfu2563u2z0rgw07x3qlga7bglqe3vd5z8s5ae04scyj69shbolkd35006eigv5g6e95vqx4109g7r753l9vgqh46f84tvzvz5r9gb6pwu1t705uhu5gamo7b127muuuvpbaxsg750yovnhvl8kbmav7cxmn6zfp93u2kqe4iur9261v7yik9qofdlt0qoto6s7znpkk2dvyxojutteee5krep7t4tjqujf0apn0xtktfblgos2lwrkfitejese',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: '16pvhx414ccfwoy2awxw88j4rxdrjcykmlrtnjz82xunludd0x',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'fi3cyq41910690b7qytw',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'bxzfpgimiv3db21p9h56hzikvl2meatrmaev05it5x194d57y2j913otrffq2mkeff94myg268f963l3flxj5tnou79tpf7cvniu75uzwnmhhn1oqiu37lbbowf36di9ea3amq2qb52rf8x5b0ud6yd07qdvdrh9',
                
                channelName: 'zbv7xidvcmaae5k94dy7wkzjr2j0evm2rs41uol2ye4nom4k2hgiekuvbpl3dmtpyzj1bpy1r8owd54m8zcg2uq3wa2l65x0meu5x80nvbzafs6h6732arj0stvd6jlgmhxjdhjk0fzpmao0wbgts29ozs2s8qxo',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: '7l2jh5ce88h35cs4krwlyx7aiaghfk2aop1qt3tcwd0ta7fi82t0y8874dvip3htrzr6hcv2zmevf6o5j0h1i4ho7d0m5vzj0ka2j5uj283ftvl3v5tf92qrve94dm579jjvmfw6rtj2rbeuzyrbcmnsyojn4b9w',
                flowComponent: 'rivbh0dfbat6s07o88i8lui6bnmpz901ceyn9r0expb8y08qo2bqplky4ccmr278ozchzyxvj5w0uy2bmg0qwjhq3eqtw5wfn9jhngh3oed7qs5vmhrgzhfjdtzvfc1ezgj91mibes5jnhq0qquc7f5uew35rc8g',
                flowInterfaceName: 'drun005wm2u28qwh3i6dnme0rav39s38fasfp6o6gi17kgds41w6mlo084vggeydydc1uo9a3uf1eq1tv1r1d0dgb9y2hq08z1mypiz4iix9yz4bw0suy2sdhnhb4bvcz2vp1359qwmhq3ielr54swdc3g14tkd7',
                flowInterfaceNamespace: 'w2f9xm36tjr66vofepagf37jm1mczmrnmwin34bc3djk4snyf03kn0k6e7n1zvmm261bdelqv54a6f4ezuy5aixmf8roi4m4ak7b9canz1pn0cqklasq0n358jyngbi1pmvxxnwbhj0mb4s1nb42v1bycsi8pkm3',
                version: 'jkok23k0wcdbh8f3qwfl',
                parameterGroup: 'xu877g0ry1ta6gp7ma06x8c3ez6dqqmrp25qt7l3o2iizhcl89aaohznl7t0ig29itk9kobidzptmjuyzp5ip892xd05zr0h82dn4i20fruf77kyavg0az50nx8ia0q58lb9ww23wquj68r3pz8yx861arfh7mmoyhg1v9bx1clg5b3yxk2rmf7ek4ziedw61bfknawkicmdr5n4tif3pe1usvwx58eitbsdtqz7u4df6jg5i4tmtnxp2wp37rr',
                name: 'uudqnam56wxiuqk3vyj0f7lrg5azc0dstuo336r6bro7xn9phif1fvdy7p3igvu148n268al6p7m3hspl8bu3a3dxb8sjiiua6fk8xowb3runruy2vp2sfbr8tbo0rlm8t70shlotul3y26yj4f8j6evdjdifgw0979o33o1gxmyn5o8wgxo5eo0lf0k690rxlnpw4raysyqlatz7wfb5whbudfbkowfk2xl31l5rpz4xkggh9fvyhnh8icuzd0987hqew5w0jdwr84a790s5hkwfxc9dd8alj2k9l18tdex33mxkzpy307ztqluogre',
                parameterName: 'a3onalljlmfp2cxrtbp9sn9pz0ywy0w1r0yjtdi9328n6cgkmdeizmn9o56t4gnray226zhgnpmmipsjyf438w00bo0c5nzkec53qhjsfnabrymn9yykojh2mufgorrefj8bvi6mm26j9omkzdyntfy8ko8zwf9imc0sn4mu9rdvxe4suz0mcccr1brg95lktn4o0hhqouy735tzaft59zjaqqiyp6kfp0xbf223oesx7e0w4p8sm3erey2dtcqceq8exuoz5l3aysj7lgbx820rmh2f09gb1irnrcj8mgg9gchztvp2muvtrtgi45bg',
                parameterValue: 'e8ezn69s9wpun72xcumk4nnmi2lwohhdk3ipxedn3c2zlqlontibzynd2eo3pu012dvynaz7wjc6muzk2uvg1pttcgtgp6ixsywwggi4iej31qbri5y378f0v1ip0nw94ua46u9ccsgqkghskqe8vzo0osl1tfoa25qmj4lgskaly5e2u5hzu8pium7vo5icoqqcz3eft2sswk1p7udwkdo078qel4gceqfitxkqyj7812xb041fd94a4mg3w4dccwg1hsm2dytd3z6a3fg2cu56mmoay6hosydmvk3eo0551zvwwveaqb5szgx6n0mole4sem5s9gb1pmq4223c538mocj3v77oqxan6rej2do4jpzj2zmpysqibrb7szh3arkqjuxbp5t52kquyxlz90e7egjthy5w4e3fgfzsrtd55tl4ndlktlsflw327joa3wio6zyowxy1e145x0kdxsl92jvglgklnaznaw9uah8jk2x62qwy4ecg1v0hv0569tzgcg8h6kwt52zsap39awfhwblc9aoqtrabq6n9fi0cert3m4wqiv2z707tha0qvtffvmhkjqfqizgbvjbgnvpgtj9gk83acibhg739qa06qxgt1er4qc2ssv33yfdrl55bvxqwj6gnmiqhvds230sdookojf7lvscweklrt1cvyqhl2r8xv5pdhfwbe23j74y6rramn43xacyw1obamjesck9m8986y4ag6g8f9gx7rwgybimw3imq9pb0g6v2n7u0tyffsfll8pfowuehah4x54iq2r3yup14gkuylj551wdlcny1dki03wxvlky7ecrhhqf25ajha6mr013cb7vo7gjll8iy359zco1b4xgi6tnolt48rlm8ige82tjl3qj7nf78z632sphy51mlimhrcjk3atsguuywy62yha42x76r39r5lsn4tltfm7g2k1zmqlfytpr050qz323nxhoii3rxbxmfkky701stnrhni8x0lxtzgpky66fx4bvc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'rm7pyqns0hc5uf1rfuq88bzbqiph8k0qs82frok70vl41db293',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'jqafkt45hypqhrh8svct',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'w4vtl36vll115bk1on3q926ms4pb4ahb97inu7hfdo4b24o8lxugqvwsw9sw0hhxawlyiip76skvrtkbzx2gg2friuje9spgr2pdje3jeiz749h59fqynivteakuv3ocwnukoxf0u1c1l8qot91u2pf6yb8k5aux',
                channelComponent: 'jn331xxlsdx85eqi1wizeevk3vavx1bk40p33uacdoerikpka602gt92uluszvfl64eh6jnln40h4ra9fp581d96ox2h7q7sjmua31d4br2zg1lbfvm1n64mpypf4iodf5puz2gsmqur2vfvjpwrsmzt7p227ii3',
                channelName: null,
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: '56ye8c546h02pw2xyfulu4kt7ktit2e6u2pyft4y5qj743o9ybggqzribe0y0ls0fhsv5ohvifopnydoufrh5jk0yh6ta60qghfwg2exichm3ae5viwuhsdpjs67rkiy9gz9cnkm147o378hfbinzwvl11gbhn05',
                flowComponent: 'zlenq0dexhkm8s3zwetaied00dsd8safue1pf3ehm10r9eggpkp4s5wcspva9qfb493ckc3vrrwyzi2g1znit80p69qnlyfz0z9beg2a9o9w2hnagfoux7nlktk79119jtqps40av3qug0j7nvp1ok7s0zp8cdn9',
                flowInterfaceName: 'rf7jde6krhobp1zefx3ed5dukdb6mpqoi16nsyoqhq1x1wzwk9tgx6vr55wan6szf7js2pd671d8bs2wsjt40jnnloujbtbiaa10kidzts37bphnix4lzi16ayy3wxfjw1h37qefootxgou9dgt3jyn7p41aer02',
                flowInterfaceNamespace: '2j4dw1exridpyv3payobecrrrmdoe0yp3np810ldp144fmi0nmpczjlsihcum91fectn8ve2fazw8btb2bumbmiist95qj5tfkabth5sc2pu0bdihbk92dyrr8dlv7rwz89wztiythjr1m2bglarma3gnr0qhpbs',
                version: 'o4l0017t6iey16t6yywj',
                parameterGroup: 'bcvdfxchd1tkg41kf599l436kutfjny6qzavevd41harpb9hbq1u10sf8s5r5r2lq041lirh1wcltia15gikx4x638m2sfqt7b6pnwrbip5ov9ye9kuieuagv7twxsmljku0qshky4jb92f97e74oel69zexezz0mg3ir9hx2bieywyiqdjck5kvbhsn8yco6jm7ueejjgwdmj91ezd6a0rs4if609hrs9548b496hhn6th6g20se8pujli937m',
                name: '58ap64uqp6gaevtxxlbdy1xcy8xqka9cibdkliov8n3gxfqjd1e7yxezi9yu2lyakvchndio3yrwnqxvqkxonacsmhxajk29nfmr5so09dm75vss19zl9ss76s6ab7tauzs4i7m8pvp6a9ia7a0o3g7fwx54z96crww382e61kuorppnbdvouz5q0avdf81tgegv511pp4q4yoqmalb8cr1jerqe5atpj7dgo1f4wz86vb3zkdlwi0785m8g3nxmh7olrfkmwqapi4u9jmtlqkgglj83edtagpfhoqrh5ffzbd7g03mmv3ajc2zm8tei',
                parameterName: '8pktjybilwerf7p656lc6rcdp5nvmefbt5mznypaf1ll7j12s9plracybmn3y89u7fhvd0hxlzsywmzviaqjnw10z9stzhkajgq6s0nwhzzb7vc6zpx5beah9qdj2mjzvbndfsh0c46hoy9fe63ig8j7ki4qq3t7x6oxrtwylrul9iyozlxh1ntre80jw3jcgndvtk9kkwk9e13k7auvfv4qo4saqpdezxsrbubluiephrd6uy1p7t3oc63jb965gu33zbs5rijvn5lpna6jlgy3o20lpg1y8gcnvu7yz3u2lcdeskh3847er6jqt7i2',
                parameterValue: 'y5bdyqjjrvdr74z91r30qcsl71og5807iz6aacczjnoblsqs6p289nqc1gotf9rmruago63b1301h7komnbxlfi9o0zfgetobx1rqdnqs9oddba02ti5h5n1qhjzree099lvkzahpopenghabglauev1j9qb2td7o3h228ww3vvgrzrqms1t1azjdd696tqnswi02gojs2o6wbmr8jnb1njgq0vhdu9h5qbjth1yszrhz564c1zaf3n71payiyk8bykhyek5y50rccm8g87a1ssrpn2h2st56fdhkxl3zew0wtt6bzn6d8fjflghw58r2z20aivls2l7ibfktw4t3xb79qgr6ob90o8qprveu9u0i889ofpejxkd1djqdr4gdz4nvu44f11lcbsp7157vcvt2a936qjbs3ujxwj5xftvvz32k2819sd3103bum5nlqfpchbxsj93njd13yikl639brqruw0dx738iimlzphv3cuyqo9xgc6893w1d0ybeum5kzfxbia3vu9f2arwxdsxkk1pyw7o1i2xszx6ibbzxpfhiii022c3t8y6ifyeh1xsf9n6axyerv8j494lsnpehhdof2g779cnd3cpm8lb8fp9drxibfhl2zch8idti3dz1oil0322wo98heznxpz7qvs3f4uyf7yzrt06jc81n8ibbmg3feq69msuwuc4xjzndl9p1f1koto27rl27m03wcygu6wjc5gpxd3cb1stp3vadu5l11fnd10zora4ifcpw7lne7tculanomgq5kca35bvyte42gd3e5scgr4ey2aws60oytp6n01mzrnzh8al5avqxo4vhftsaqcmtihkpjlkfawns5docmf43jonem8cn18l975tsia6hyamydgjtvreevjtcsk7a2bcj6yepxc9dq0hmwkbpajn6i468d8vmti33e0pui61d1kayvl3q9c2eziqb54ikpiwpthvzxs6mx4hurf3r46n170jkrw3upsm0co70nl4gcrg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: '8ctef4kr0bpz2f9fex89xsemz5hmsefuzhu2vfvva4vzegf2vu',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'dywzww2k72pjls5r13qc',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'fwlyhspfw1pr404aln4g4uo8q58tsv4bkwn9s6o0p3g5u9of8o5uq6owjvokw1dmzzae4n2laj56d71bp70tl4xe8no7ks4tj5p5orn4sgeu4cn9xsf62hyfui0kueo889jg72srdl7vuwx1hpk15ah953wsb3l9',
                channelComponent: 'fnwi3g85torznnckpkmh00dh2eyiiojdtzlbpnbgm1pcjc0jaj80ix3c75ppz256r94hpbesdmzz2u1tqjdjymk07ksfz1v8lzl6j6pwhj0lr5wgb14hykep8ziwni7aisyaigo5ji5dqruf9rv8g6adpkr3e9lh',
                
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'o3m2mq1bb6i7tem5d587sq7sc0v1z7vav14j4rg9oerael66dnp9m1u83ulp23v8f8nsnxtdv7uyee677ksjkefqbzfdm7x5ucwz5bmllidijmm03ghx8i6ihow7a6nv7zeds3bcd1yeva1l69k1l786bz1p9mfw',
                flowComponent: 'tm41hb39rfngtp4tp9lmw8y78f8w9xrwbcouj2a0j2mdx9svt37tmy9uyg283f4cllooro39ti5kk8yqouwu91wracnotkg93qzl63hou2ubolxhsprlf7sysczp4u5kgnraayi4er0bnt8tb49s0x4k3zzjxxaz',
                flowInterfaceName: '3tpe99qe88qunerpquhbtnd0cbxowfmfrx47ccw9161iamomf9sfu3jz1f0jf2tg9lq5g7c3dn7s4g3pc18d220fixsgky9zk6me56wstwhc3ktjjsi8xlrfljgac15jke7kkgh89x6jjznwsq7n5vztb332a8ja',
                flowInterfaceNamespace: 'elece54tdny1fmy7l2uxbovm7f1s7tfavblui22q5ijfqlnmho9z5rcjhxyg0hx0z6jsv1jmdiwywez55e5qd2wfa53miqpr91vkbqktjj20e8jn64kt7t67m9h0yamfd7859hi4pvba78w3r8ikin9qu3rbnc54',
                version: 'xwbl3m63lj41rvz1jpnb',
                parameterGroup: 'nt2urw0q2nqm4jq7va2k6o2ualhtw9h8indf9hmpr4vljonsoq0rxtrumqm0bx3m5a9nnwklhygpf20l6ts13jewhn9of5ehmqql3ydsp4mqqoaehku261rncs4g14tj1olm3oomz6sy4nke719jvmm3clld1clfb3u8c9mxyfdeligb5onjjyjd8ajn06sp88et7g98hjx47vy2cf72p6mvk3t88i850q3srzdjcai7n0csg6cce7b7wm3wen7',
                name: '4l1beuw9ylce4gbgt9yibqh17z4e33ysz7megbpehokuywcri4uzv6bag3cen1md5fn1mmtwp3k3wtdt581ewz6xrcafo3bo5xbi03ogosiiq00fdfzgi4y5k6be151kshp5u0o49wiorx6zu7ghrrsdy6y792nmg7g6nklyfw3f75b60pigug8rnf4bjjruqye1vwh924fol9xjghuof6vosptq1rc0ani66fvhrmkjitina4nq75boym4w91kginl2lgyf4vtex3671nolyuewzix8xm12u5u34hyiff0vxt23xfaakjb2apikymmg',
                parameterName: 'mcah3c7dg4vrob0p5bp0jioqy171tlbj04vxzz2xrlk0hmx3wxuvg8q27ep82h0yds1vschcsumv9vpk98m7d180s3yhgi5whxoqfmtnvuusfyof3cbei6u1gghqtasexmj2pgwjgjk8scj8hbmk90uyz42cvbka4y9vpxlmpc9pc3lq7hdr04ucx5gfb25ozitvucgo1yirmxgwv17o7pzw3pg617no55qf1wlpdrap6cmaqekbzpnipuuwae5kd8gao8hdfnyjutc2z7prrs1dffc3q002n3n8ig8w1ml5fuheh5m7w8ttnyf4bfr7',
                parameterValue: 'r3alr0xb5upqk9c56gndk1dakhi65l2ekbiiyjcgfrwbbw5f9jdpfmgzste9qdazpzxoybxd7wyokqth1b3aobwypk49n3pmrwcfrotgz8tia92iq6r7v8cwgx1c6kj1j19pu9hlfntebbdne16ycr8rhq28mtolozb881sopzmlekf2jf5xm2fvmp5fcik4vmp57a3rpaxu0ue80hm553j46h4r67tscul3edi0by38kpzh46o2e6vrb2rb18pjn3a6prqy5wjls3eu754750tk1zqdvv4kq2b02b93oe6ecmg2xyde39gadrgltvoly2g2n5o6l1dqi2f735rynsrv76gj8qcrjdtikpj5da2stxna08cjzpyto3c7x7kkowlotb3bk3wquz9uqkhz9h1ymna8peepi2iaunw9cpbu1fvjdnvc0uzcnive3grzvaubsnqo4xj1yyrqtiwpm506kfm276w2aj6ut9987955i5mcn9zjii9y6ah6di2og1b2jlujjksardotf1vj6fh5d4izjsjfny1x0hf89awgg4x8j73seibyujlke5bqpjrpfby73p2ptv3q1sauq6q727tb7h3keaoybqapbr5d8svbgay52eaqo1mlkjsivk189flx2odc83a3q0yrebloecwuxi5ybc3bpf163lcb2mnvzb0rpqzwa8zz73zkeg9f9vtvxzk8708ecv97fr13yfru1tczg7jz0mficlt7s6iv13yt9w0cvfrk9o3xa2d61po6sqjd547u4o50b0bl4xu0pg3jro59gu2q9ih8ikhxziyh0a2rill94mqmpli07g6hgt6vq3y069umgyehju4o3aov8daaj9z4p3sj25fmlg57vg6e3uhxr7ukmna2umy44x9oxa5jrkcppftv0r3n7nbnefhye3hp5kz3c0r87sqj96qzut7na83y0mqo1vvxh2mbaemft4lf8ztgl88xg9fxjrryg22ufmsd7f29e8mbde4ppu7lbt44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'sl0dpi7g02dvn8s9851mtojvp3di32z78ii2yqgklotjzl5h1x',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '8lbfyk24evhuo9u9d4wb',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'tero9v7epm6v14r2gknlopx8tfl37zb42oaonk9v1avxy667ges0clo1cvginkhutmx3e8y4quuf896e2s64dxnk2eao18zstyidnw7mibne0iwruatgpfr7ttongnxi411aveqgusv5jwc0asnabj6cg0pmun07',
                channelComponent: 'z9lhxonv7siz2kfdfp63ch9mliv444ruw902ajpvy8bqrju4rt13cz24xbdgo7mnadg2b9jd4xmr3ks8qo2go4x4ml53rtikzmy0p36t27xoog7u8hxkf8x7un8pz5z3ukdl0jfj2oruciw6hu3csbgis36tl204',
                channelName: 'aqftgkuc28x8wnjs6oibkfbev1ek97s3f3jf4vagpvrgf7n0wj2sv5fey7opon070axjhzhoyf05z9kav7qqud2ywkli5dwfhfajkaxpsmn1tw3zws5bcpvhaiors9rgsyfo4myb8jbtfy058p5o6usl8c2bmrcf',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'horzxukxe8bqh64ht3sy2xyj1n0wq58gr4eaq8rw9mfy0vthq30znk1i8ajoq23ouvq59bcdabq4pq5u3u1973n6jw8hc6ghbdclv2u0w7ngcppgvf3rmpzyk1jwrgu1gr2k65a15yfxjc9la9r7zjq8wpmc83bm',
                flowComponent: null,
                flowInterfaceName: 'i0pj6ejc9mwxp30nbk62eoti7k45sftth87w8gjsp8rqye2311edc2atr9eb7xc1qycq3euod12lufgldghjoqlm0enhw0r07pnpj0gjw8rgbafwk2bu911hzk14o4mvopl8heshjqppkwrbtlx492w0buffejo5',
                flowInterfaceNamespace: 'u6uwr1k416jhkc3g431mhf8ceeu9n9c154f9izqqbsweuqounmldp8ck5kv3mpc79i7rh0gjgsybd8vys9rm5psdf338rqdwdi436vqln8f783rhb40d7b7efw7i8bcwp880bh90n8epfnvnzbbimlpjzijfexbz',
                version: 'ua2h63xgat9kfk4og3u4',
                parameterGroup: 'rlamnizcp2nt3g50w8otl0doicgwa3zvahodxif121sopgsrfma6u8ls3o5bexka4xfz70oyyxkmc3pgm4roi8ttswicrqmdb0ghkft0q8r6fng4qqp3o47bauyw757nae78p4ot5vc0qnha1u4gkv4coxdhl9x5kvcbe0e21aetppo9pa182089mktv0qowxxtg4izz503xlvuhfmnbe372lunzt5gra5pdyd8r6d1hc29wuouy5dd1d6nkjs1',
                name: '4tnojsp0sfk6jurfosl188zitof8w2w37nvdyzoukx9xg30u08inpdgrhn4j4u9x1un0mwpy90rpynh5rri8bi08pfedjdwx6bgabhk9alseuv3jfg7jv8nbfkib5nvn0h1rqqf1j2rxq65tzamaz4njnkv0zeumlo733d4fpzztut45sx3q586bmehlygigoqtehk9kvubl2ob0ythaolvz14dfnp0x1nohyzhl5mdzqpo3uj62zkdfnd5pfwuficqwc1e1d97b185q13cau86c61zybsfp9103mmk12q245toq71vgic354inueboi',
                parameterName: 'etxkdcmaxopxlwce9zswrnu5z355plt6o84580mdi6y6eu7rkxs2h2gauk2xdgsghwpadcui0zef7r9hlfgurnje8eivqxhs32i13pbmc3r9bhsnwx113txjmf4f079uduzhhru8obeqix7cdmo7d1vbei1hpmqaqv98uv4tzcotoufab9e2brnfil6irbxze0m08njkzesfgme3v2e10ranxzernahan4b4mdq20dx85r22jjo51yvc1hd6jc80fpykwqs0wa1i300r44aor53rwrzgccgoownzzyqr2j17fvpmbpfqel4ouxyir8h3',
                parameterValue: 'mk7q5snqhpkmcpekwdkpkielfswv49353l8n929b4natfpgvrdpptm1534ufann9htlc55jvp6cs7etx2nkwdcbclyzavi9m73omw0dpjct072oigkorg9m9imvup41wha3avqie3ubfmt2c28qu0ccxt951g87nshs3qj33oa63t7p0veq2vaha5f29aceb39rlhhzazy7ratyvaih3uqevmkgfjmfaio6722cfi21dt4dppv9d5lef3tcg5ly2b214hygupho0t791pf0yiklrzqxyujwylghk73rv25awywi7n2k3jme3lxpcd0p8cifubzy5khtkihtss4swcaegyy6xncggx81arad86kae7x7sfu78gav939kal3bku1ack08o1dxjv2p0jpvtqzi2qy2u118kmohyogn3jf2wmutfw7q8yr17wjor4tc7680egf28n3hg83t7xow5mf7d48uudtcdlkckluebidsndfryjvr27ulev2zt9pzk7hf5z73dtazw88sdqxl44qvzm17lbpxe6y1y7yss6zzlxvtpv7qi98outbyjxo35tt0vd4pzqzbmtpxnjiaymbfe8huhsykc22bwvo13nsb8d5amvcsmfv0416bke0oz5m8hzwpkyqe4qwsje9kz2yu2s2e6t74uddxffmzjyqd54f8wz2bqhjscbgqu5n1ug2679tjikn5ftdebgzb414fqlcd0dk1kxyhkvmd13q2u4c9ebjq14zfid25hqlarte0kelcgjeer071jfyor9nqhrrddfbfyndhtu2osgqj2rrummy27dj6730ktggmc2lg7od8wkmny2ysriq8q90q70rnrojy0r7t96gf87uy4vtt4biqe0dmjqp9ywzs3pr4opgjhvs7neug4se8mc8gqn3hovzrrv6q84m8pebqo8o6qcsc2feylfgdr5c263i4ko6v111q8nrfqwaa6v03p3kyutpwcnrnq1xfbnxgjutjw8o74hi9nr0k4jn44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: '9v066x3dwmmo233n0dlbrncb9fn10aedk4d21w1wtbht7mkkel',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '143bbxx5chefdopqt30a',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: '821jvwzxi454i6he8hz36knpj9asbr7w1lffv260kbm0iklijzx4lnnxn1vh1elugcajagxmjer96ja4dghakfv12psz8j16gerotecmfmnh7cj3ddaci7a6i731q6p3sn1x9jrvzhhj75ql8dq9pykv277kb9q3',
                channelComponent: 'tdx5l19frt5hf4l412e8ryxo3a8vam8twvafdro9ydkbud2wginozcfroy8sf00ukixwajlr9fjr865zn7db94jcplhz3qo8j5d0ehz8vkt6s1yo4944lz3v96er94xhyrqx2b8bjl6u8kooom3g479iytoui5d0',
                channelName: '0dgiteb0z40oqnpcmhepik5pt7adficujr084n46mzqpb61j17r81jjeo1yoan1khv02uelqescaahyinixihvbqexocwy44oall0uafc7ej9san1q48q742lwtolzdn7pllwjf2l8rhlb4qc2wdbr8mt2emwkr0',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'll4vkererdppd6aeui58ab52tcpb7rslwr6hcb271z3y8peulrwb9mal5s8ybgjmcw6qhvgprv50m1onn6ixsj9vqe9hd96sp8lzwofq4dnk6d2ezu6dh9fl2cs16u6v0hb0jts0jlty8fmduwx9kwi0s0ss2vsu',
                
                flowInterfaceName: 'kqfmulk0arg1j29h48ez67ifkozmch0ngc3aw39t1dxn6xhieen0ld5qj5ugwpf8yxxw1an8kwidfp6sd721fhz8fq02mbt5qwibh91hz4qr2302t41leh5m9bdmikbjo5upxkbhtd8symxqwopswk9chvaybr6a',
                flowInterfaceNamespace: 'tcvyde1s5nfe00sly1fjdocrioblkbzzdogmavm2rnz8pbz2l3pa0srib148jqdo5240iu1wzk3lsas4oylly1bg4xy78khlcppya1un2j5zyoguek2eogrs69on0h4s6acclhmwer87n0u739dmwwjc75el9jwo',
                version: 'xm4nckqhh3nlus4dau51',
                parameterGroup: 'yj1toa983dc9gg6qetsmwxjsv2dpexfkn5gjdwalyfq0tnijs2cq8axpermxk99yhqjt15zradh8k6hbct3ljlq856086dwumtogzkdw20izu4lfcos3vqjz8c435sku4pyvmthl5f8ij5hrmelo7t5z6d99nn34ox5ycuxbdvrgj3q05mbahxm9in3oecsrzeppuaxl4u8freqwy684mjfbieeqcmb8r4epcrbbwbsalbrp6pd1da5klrini1j',
                name: 'bw392blxy4qgghmgl5b97804jxhm4rsl2wbgruau0s4dy93vv16bkjlu4vg1y5ohvpt7ht0i1fcgjrkpsud4uur8y3qqoqcco3z06osiwtwwq23c9s0756f7zrxkqjuobt8aw3vxw1d8wsqnfrbuqkmom88knhulmk8an5rx2x5mws0ofsjw8xic0enk6tpl8r0ik01qviyu0omvf3khjwyo2ic395kilp0naerlmbqv0bon9et35evblngrhqce2mtcpvb7aibzcsnw0zj8nmfmc4m7juu92bbhsbmjjolchibrha1vsvolvtjrhiro',
                parameterName: 'jxs6dktl9gfx4ucwr681q0kq7ptu6lrlzu0p5ha6if2eu8pyq3nmxcohqc3kc5lsx100p2mfk3br662fhp6ai42clsv8a00yrjg3r7aehdw9lfbrc649wofato88kc3qd1odwuowoch6afc90oao60yu58u7p0vwgc5ildn29bnvn9h0uqayd0hj6uw606wkb6sme7w1itbff92yfcsofktzdbfsmfuvosy65w3bkzk25acvgqdprh265yltjgx457arshu5qq2js156qc3ezqu2amwuzh44ahxb5gb7y5u96bi650evf970q5njknh1',
                parameterValue: 'r0l79o4sapzbtsyzy5w8djn7m1imzk9d51z125ap7x0679a5eqtzfbfo6jei27ii10j21xzdlwwwoqqaazj5ltvsvs80opfiffvkot0js54ql2b6huben6ldk2xbutwjsppvf8qwet90d3cyph8z3jq75tmnxbj31oeazb1eibf49jchwo368cry33bd35xa73c7c21yb0uj2xntxx01q2wt1rpd3bsgsh5t7casw66dmrsqylwcx3bkpwk2t3jgqbqpsuw06z8ywg4gybfifr5gtjuynw9yjya36wnyltlp1cb6h8h8s8otfucl788czd2sejefmttibjaxpvluf7zc4rz0kkfwkz398zx50vlwiey4baau3xkftq51eo9nepg38pt0i1kkg5vvj7zksk4amk1z9bqf2vmk9k4ut34o5mx1q0ofy6elpnbwbl14n1n3om4fwqcfr6kmdz7akcioxqyrtsolau5rop7pfeyyo2umw276rejut0d8gwnk2j6jbjnersjjjvwylmcy54rco1o50vs0wyq45notvzy8s7gadvwdx3ohp4rf4sekxn8ifxv41wh810hnlmyncq2au547c4wjsbf8w20rl5ax7h85u9xp463qprs3duh8ne7db79yj0g2tlg1im1kdr4h3b9hv8alp0j8hxf2brt5mnevxx91am7frqz9wvyigixm44l2pxsoll1v09b66eqjowuneqqvg2qpwkjr1lmukcs9671osdcsusfzckx3r7nq7ybciro3uzrzg28rn4etz9blwkfztc2j42rqrt6atehgcc0njquwdrwm5ob9cyfb90a3e0yd0hqnxh0fg08k3axv95qdt9shl7sqe61sgb3ddgf2fwngxx6imb9fs6jeuo23ohs4y591yrmovxq9rz5c9wyqpwqrqztsh5gfrjgmbtidllmuk95yr0x3b9w68rssaqo16gzo727s1vsppho1molyt5swh4viuaxm38aqddpwwjgba6nyd6jo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'tftu6u0v4vug4bfbgewzhc2skm2pfqna8ajoijecrmrt8qgvqt',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'c4z7hvpyixg7365qj61w',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'dv2ysz1mteihndsrm4jhn8f9ue30nyx72x7q1zco5eyrdxytzfkrec0vfr6yk6slnm53pdwjrnhkomv3nj8dxbb06s1gnaqmv8ka0vyav5wyx5nuel2xweegtq1bdp06nylmsd86fc8e7mncyiazd6y95gyoh9xq',
                channelComponent: '22dbo0hvcbxifij7j2syouy059u9ji8jb0yazlpwglusdjfebmwcwa2943eu25vkcyieancfm1xj47wg1cdge7wzapqs4nw51wdynm6t466h3mk8mqwds337guwyhwlc3qb61dwsnqxe5hk2ojf7vctjbm0qoncq',
                channelName: '7bmasqndk746aqcbvb1c0zaesp14hv8szstgrfs378hq8yvkeh73yrxjwf0nc69gjb1a3ph4bkakjvgolqpz9n7knpsbr75vks69lqzcj8wrouqy2xyb1q8a9s5ngt1i0lz5f93izl5yofsio94riqfliycv9n8q',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'c5ms4kh9bkhknt3yruwi0j9wkprj9pta4gswf1gy3vb5cbzj8symbykr3f42tarjoww38jajh8l2dtml2wjl7nrheztjitn2okr4haytudes86s89zfmpg6mhf4zfv3q5xcclx2x1gv6ga2kq5di2589n444zcgc',
                flowComponent: '2ebe2m0vs3efmm18y6k8ib9qnq9e1khhxs5ft0v7pd58hpz5esx92gpg5piab9xx8cigu44y51fnf09klgivgjosoqvx0khyl6ugdsrm4h0b18dr5tqfh3a0pxiq8x89xd8tg8im91ukideqzsxbeuvffu0oiuyb',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'zf4re9e292dckgaunaxux7x7ci7j7lbbkbqm8qoov0m0ykify3jfmo92ajq1qwh7yx044xu4as4lz7tif8rjzaolp94ifeey2jubx7o2g2qy0ey57v89r9sp746ddg4mfnc2hequzh8svjagh5ysfkoq6y7ezol4',
                version: '1unck9f36qt7wywnxbna',
                parameterGroup: 'qa7zq508ff8m9czaag88777yx7jv4cw6mpph3q9c4sgmjsc1c2juco95o6yrm7j69zj54lh7g2bucuv8mq1bsqst48q1hzzrk9q6zw539vhspux9cr7dph2kkbrt0mnn3qyo0805wgkqzqtf801ps2jr5vbtdcccyna9i1ng4jmmji7gzv5o415ir7gd3w67rbx2oeuamp3tkgojz9wr5l3xxgq9wxt1ta3ohawevzbzbs4ijuilv83vpd5cx9o',
                name: 'p8bovmn538qvijiwtpoyz99kfxi7twxdsyllqv091e47g5onlwu75u5t1wg4tx87v5o2waep0rs1uel55pqz7w5xor3iwjzj9wrkhknodljgspagxah21gouqvmgjuoxfs2hrt7ah1b03sriq9ubfstxzpggny52l5h4t8whz2ost6kvnpq8wnx009rjvqbm43n0bcnlwapxg2y6kp3v4enaz77z7mbqp122eg7epckounh3s6106l9dyq9meh2ijq55wtg8wfduzb9481ss45udk6l4jhopcaczjh0nkqgepx1g3962flicm801a9ys',
                parameterName: '00zotdvil7bkigd45t36e7xxolq0pcskvvkbtkgb8yfm54ivo7jwnv461nmy0n8ja36zvbv5w48c2luvz0k025kjh78dpuxl6u396dy6vfjycgk0jcxqp4n36gww55fq6pge36qg1lwo55kyetfjsnt7w4478y9aohc8as9p95ohs1e0c6cvp46xpd9582zw3h5o55a95dx7jpnn9g29uxz0s9xysfu6xhkmx8ooxnom6qr8cxypn4bsf2uko6q367h7rd63t0j7rl74b28aywzk46k5afs4jn8090jopogym86pxn7th2a2erc8xz6m',
                parameterValue: 'oc3uex0taxclsiapbz0j41a7i5s2vcg2w92qkxvqk418m9xe1wczbz3d1806nnu3l1r4swdtxpo5wmoftbaexvksskuqv1hms85o7brolg6at24bttah4xws3j83ul4ukovdcm1xezriy2gs6zjqkv2dckcuvluwhvms4jcuuoevxqyllpvmm4aebj76tpmo3a49tspc3zdi3a2l2v8eob0wkst7arveg0lpnbvp3ndbkovg0ng006a38slklcmq5j6bxdf9bsmk3om5ytskf2bdflbyiy0lhincs5z4ljaq32x9pmo35byaefphgjknlqpbfmhw87d1il1a6ywxzlp87ome9ox09x8ehgia4qwzt5k74tgetwgk2a620bym5yz3055eddl11f8uvaulqajzgyic4r1y5ruc1br0sqf2clznbcmdeis8s6b33jqyxhtrcf92i9z7u7qb9bomcjs90sn62bkn98v7qhglxgyfhp3tajw1cgy1hiflzllspqa8dzuhzt0r2hlmcwdvo6yytdely0ukmceupepjuz6czuindk7n4yvtzgmzp2zb0xppe52qlgfd3g37ds8zv5u9ic012izxd70b6s954cv6j83kwy272aucu3tall0i2fzmz1kflz9dov6sq76k07th8amk0jl91ydr50a2r2esmncoz4rnno9mw2vln6vmqln47boa97oq7vw9onowenpqyc031dhh72erk9ijaaoo8jofb4cptzar4yglqn2pwdcmeuja22zg1id4x1vv077imtlv32j9a80qum6pvwteiny0t7g50q33mo8vg859vtvqrhouqd70msini414a3qj7vgp5qn7r7gojsntdqitpxhtrrpm85z49ocry8wtt2th1ysxsvuirejm4uqcz82e876mtc1noa4bxbx1brxnj0cexjg97hv65hwspiq5tc4h410bnw39bj8nj2tlyx79utf754yphl0sw4dovkrakcb04ytpamk3qsme28l3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: '09h82ea43cviwox2x7dqn369sqdnlqu0x0hvxzncv53y1zwdf5',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '6nw63czccuvg7cdc4ekf',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'f6s8tku6v00kmqdo9syovefq9gt6dnuc8mgaju12d8ztdzi9bobsvi763sy9aetn1juukhxkcipunshp2c6bjppgy71hvkpdcbpebxfdzvq1ytmhjgbta58p41yxssd710mb6bbxleoft0emgvp2tfog15nlsymn',
                channelComponent: '47j2k1s9gn27p18wtl32yxu8yr1jojhx1qrdlis6r7jbk9srgcp6pq0rnm4fyx70prfb1k2o5xm8qmqt8ukk1x7cy6l4aamd1cew6yv61z30wmm80rfuasv08lsgziekar8vkuu1q7z3ss6oge4ntq2e3ac8dw6m',
                channelName: '1iqhg1a1v3gdghatnyjn3zqqrt8yrfibhrz72kasdfsypu5b3o2gq3vdgrcx4bkxbmw8i6n0oiy6llj4h2rzjooswq7q1hp669433xrkbmu44fg7qli2ta9mqhuxr6uhjh4e54twilikxnbc6ufq4edi5qa4vseb',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'f3l9beksajfcfimfohz1kcq4t9bmt1fjj374fdc8y5zsor58gaic0xwk0qqf8jgemqesazlbk72tifsik4xqjp437d2gfwlq2dnznnxmb8bmpi76adg24vw6hf42caztypwaol0vks39kl7naoil43dgarcm7uyl',
                flowComponent: '0plorwzza80t7frie7q9gtsswxil99j6u9nxqqd58cl4ti5r9bqa4ftfyrj0ei0ogp70199zp2dvwdf0aji17s9j3e1rz2pk0j36hfweo2qjqccheyfx4u0vxbho64yypm2xhn16s765wfa02c2w1u108mb1vbms',
                
                flowInterfaceNamespace: 'l8ic22a55b12pvly9s6dtxodnwm2kbz12s2ymshlus95yaojp0l2m53trwtdhgaprsywyn1l33dbx412161zo411fkctrpzw8f3mmeh2c930g3te49f0evwv20ko2tl6h3s9e48xcziwz0e6vyg8r2btrdovoij2',
                version: 'mc06mgf9hvxuzy0u8yep',
                parameterGroup: 'sul4r5q5499swjlqgyq3lhol16nodymymj9y8oajdeb0sp7vxkzgt2at6w77v845xp00eo89daxezw8chinamnyigmo9oceha55wvfptge5gn23kc797u96gve5d80yqyc1ylhgzlf7sq102mf8om03aw5vam8amqgqol88mwalc5r5bs9vx4d115oe9m4v0s04bi3b4o9qjirulop4jadzp5tts799lsxfki06gb709gqi1ry4g0seioe9wg7i',
                name: '7udpyl0yir0yk5zny1wwavdh9n06rhzdghe0kl33cqls7mv5n050trzrzm2srxf4necllq78eqwxtcxkt9yf1eznqdv3kn4fbo8skw41pakcxc742763y7kw5v2ks9xvnepsg4ekvav23yk82l3t822w81gr7lm7jkgfgbgmahegjgalho34f6xxiaolykpikysbrwo5dfodfe2x5hvkicgqepyquw01yxhxcv6p75pi363n4plo3kyfx30zuthtbrx94vl8d1n86zg5wo8l054s9omh1i1sur15podbck8icusq8x2hndy55ibngh3t',
                parameterName: '60a0vwivsuqmkkolks827a1bc63t861btupqni60kbp7e4x1gqi4nrojzzxa3og3bbi2qcciec3ir7rnvhjr3mvt4nlk54x12l1oa3cfgume1b5gm6iro0e270ezmkt0cnnxe82yz7e5qoit0iidnvr79tjm1dhd90pdplkdogt5bu15v8q4lx5z4ivch6iy9jb18bfobny3jghjqt2hd418pejl8dlrbi5m70vjpfr4zgk7xjjbc86hw3snruu83uw1cmzk51plj54ikw2x62ze3smio4cdo3saljwk00i20x2k19fe16yzxvzeu36g',
                parameterValue: '23t0vsjktmdt0wi17wi2idktrk27r88grscaef6ctliu44jvniy4s1d20kclyermrirqiyf5wyzs4q009394e1hoqptwhwd666z965al8peve12jo0170fisfl7zgvaymp9bdneg533vfw83hxkow33h1diyzu2unf8baz6vrjq0kmt44ykpv6mug3nija1glglp6807bj6g0byjvkv35wi6n7lcyxrfz0i68f9olgg6c5di73iupxlugo50krub3xza8tmpc99otiu4jr42wv7rbd0nwwc0tsx0oz95abcj8bi4a4b2f15dhvfb4c5kxq7kuvgre1v5iov1h7yvwlwo16fonklmqtgdxsongq4tz93hyqrgy0fi56sdet3flwbyxq13uatbuz5em3lsr8b7br29vpceugi7r2agx25p9cuui09ndj7h1hk2xcxwx3qr996phmhkxjwui2s28yu43y6p991f9xj249xlxzm4ixjrzi65m0h7osmkjte53dco0fuupgdqpvhqk19o8g2gc8yh6wfd0xua6vv2xzdlqcqimoy9mxqy8ez7lo4fcthh45qp8o5jdagnxawxp94e9i0za03lo27069maim7167vy2df47bfd1vmzl33dxtp4pqlftru3hm0mu8s50evu3rypf81fqa95e5k59jjnn0jb28dtu4c4mouh1oipqhisildossoarnmtag9aloqvoa3yvd82za8ljs6i4ydrw028ox961rwa5qa2tumzgmnwkl8ahlotokzs6m4fqazkbopthfvyw1a1as03rgvnlns53xzuh91qcjwpuuynkz2uxp9vlg2zosrw831yy168xiy2m1md0xh7elz6xmu873heqpb6glqtyz4l58cn605x9qplotidwr5nbxarjzy9a08mk2mgdkl7pl0mpqi2cjzju4zumucwvegeptyi63k5ad9p66go9lg6ath6lf1d3g35j75an2ul2mxaxtetfcmil6q2qfobbwf4sde1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'ml1efffvznf2otwkatlk8enn7l6w750kgthwrqqvp8lg44hb1d',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '4yxgj3s0jbpt6q00cjx7',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'lbavzn6oyxe552vmxurss06qd27opesbhodkbp6gtn3mhn0yoey84oei3le8niwdq3716fb0qjcg6t4kmow316ajob7awetpx2gyyp00cgsjv98n1czy8sg9q6ony9948ar6p3h8en2x5uvqknyos11kdsahec24',
                channelComponent: 'u61mqvsj8v3rv9g2m4ounipqzfr43n2su7188mwo4iik0c2vwlquzbn5zis2vltek0ghl4uv1xidj9esmewfhyklu43k2rysvd13vfnuowe0btlyx2yimcnrcjjr4t24cq112eaich4haz8yc5mtiqxdltwmvov6',
                channelName: 'yxanjn98xgulfiiwavpogzeoyznamybk3yw6e37zsztff7usgx0d405md2hplx59gky3gdmoc8dl0m6yphxg1rlciisb8wcwsqykmdxomyywnpxsvn0b49rx6jricc4psrcmi58amrcpvutl0r4jm8oep4ht47cu',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'cos1obg9hupxeqn0y02ex99aekk6ooida53wi618l1vzr58xd9kox11e4aqnrj5h12ih3ax1l70rrvnm41hhg8bwab26ol4wj5m7kqw6nz5uidzqz73x3fr62gsmkctiw3axxey2k6lhchjn544osg12o6ooih1u',
                flowComponent: 'ceo4cp8xhnml7pwo46dbndpk5kxb2ozxp48b7fytr8vdon96g0hz570n8gfu0qdmdz9oztraitgq1fr8ez2n1cqhnqxw89gwx0q1c3j6f6sltitadwdzahfrhag6n55ccp2kvt7c9h8yso0ldwk2x2eg7uyomppc',
                flowInterfaceName: 'r5eopxy5wqy2zo25xmcobksbn0mnfwt9iv8qh2t1pdaclrof4diwmak5n1351rrz3zederh5xhryut006dsvfielf3ibwpcbzngy5vqnz1beagwf2oyy8rufhxhfb4f565o2lurmt81fn81ns0tvxebsh0fcvf7s',
                flowInterfaceNamespace: null,
                version: '80c84jnyj8uudufodgzd',
                parameterGroup: '42jhwag7qnfqdecwg4af2rqkcs1x1rmghx57qwaiuophlyl7oneq3gr9yoy3pe6aeai054kevcsrzm27bj5v72s1vdo71vr37m37gsd3jmwqnmz5facz3gabbki0wkvt9uxjh5dvqcurjt0n2aaf46bxi9zrht9ppy2hj8jdb8alf6fpc89ss1m0g0ok27o1rj5ipzwmw3xu5q0xvk7ao189n2g429rcas0lf2jrrfvcbeljkza09j86io38iej',
                name: 'oe19z6c2gsj6x8fob8rgkqz7xk26mfmn2x60qzz9negsmjhy3mg4gnepoj81gpssj92klfiqolk9dyw6vzcy89oucahqzeesvelppsluq19svtnmaf0qekdke8rgsn901bcqgdb2q2f6zxeojdoi2tnrh35zs7d7x4huj1y0gkky9d31f2sm07ds0anl3x95norw3w7neii4wm8cuqz4kbi808piw14o63enyv0nb3artfsmkgqr92fy8kxx9pbc8zurixqj2enzmxyb131ta4okq979ane01sn8xc33navvubh23dzod4uovdgbfct3',
                parameterName: 't7hynd6vc1wkdro2imrtr92zbha7x5aso0bl9xhfm85ywq153afst63wd45m82c5t03tpisv0iu1mkgf2bnqzw2zakh39v2pds6nzrschsyu8lzn8poxaegutmgvvh8l51ds8qtw7kowiv55yku2p80utoh6iw7ld2pskgdxq7frpt4auwdykea8dcfarkp0b7l1s2lf7jv8ftrg0mxdbv3pw4p7ahjf2lewiyeimpdmqk7zlmfyt8ruxsf5wfmbh7qpsj2e8qcl5e10o3fta0ptv39qq0t3360vkemqv2gwj7cr3z9sqz6savl5pkal',
                parameterValue: 'xax4t67181bauiohm1subib74z53xavkfpbcszmyayed4ruuou1brhksu36mbj0drovibun4iq41pldws9anw2srh84zrn0nz7gn4d2y4vv3rc0k1xn9buz3aw3d35t1aylz86b1wdir7ufe47f19k7e2fhr4jhjunxlslkeyyhv9yydtfy71dhm28d0i12jesyulw0a92nfz9k270kzdgx0zwe0841vig635gzd53j00f3uf90w2obu7c2ksh10ykv62e822m4qqpjbydhfyot9nqnm3gb2tyhxxn57az6f6yodxzlrfuk7jn79th99qabn8y90cho29d0n09i3qu3tw8lo92b1wxw89sx5lnfoja6xuwsk9386wxcd399qk8tuabgsvh5fraasbvaw6ytn5zlwjblazvphne7cw0bdtsxsxmzdjt9a2diq9fty9tr3cfllm8h26bdfks2bfsiv38uldaiz94g1lzi0nvvclgx3qiiu1zfc8w0u1936k20qv747myozj6zm9s4mf8p7t97emafou6nsk71i4na3vse0zdeo3ddkgj15g62scpzsv68ohuz8tdkfjwtura0i1y169z46qrjpamcq881sikynxtbnar2ichuptjo0uy27zlf5irw1rk4pu46nueptvpu0exan7t8lcwworxj025l7yhhcjuroh5n0qzt9gymvrnp8l5e8frto97kgep3usyuxj0og5jd0q73rj7o846wghtonhn831mr5wf9vyfkmpmqnxom1w8la8pb7l2nuk7dd3dpl8j7ec1nx2o5q011wvq169xu4jq9uvhw4ae37ccbtpxu417ubat8c8frvhclj18biaoqi9gndilzukblnfh8j9hpz1abiore5tjiwa1fjm9hv74lbzfi5qg8u5pu3iw01i29jjylbbvd2txhewdkahpj7ee28kh3opht4ss5z89i5e4icevhgzx595vytpcipolx7j2h35xr7cvzxullgri2veoyxp1zf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'mejixrd9hp24p3zoeirpin5agj4lv368dnjq0znhpvtb56hu83',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'ktlodj2qblut1p03ew21',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'c4eajtpk7a81s0owig2bk1uwuaad882wyps1b7w5t3cn6p06e9tguc1gia4ysf94v7a6e0ozg2tgeh1ipoevkrhl3l0xylglnqrnbwb0k393ge6xrco8sru59yydk1ic7fppo81eauy5grhoojcnr5g99uddveh6',
                channelComponent: '7t4ictduohqx5bjgq8blstqke5wzqu09o3ce507svq4go6yphcnzc09oq6iclm1daaw7u92mupmwx0al5hivfn2bso65zchpfqbb9y76rkozfmgc5poyooqjgqic9m5herm67ms5s1q16uzysqmsu8rv1al2l0ux',
                channelName: 'f2xeb2j70osz1y26w0m8wc5cvhk3ldlqh6vox6o0d15ue5jwwzw7yhjr54x07dd0il431znaz1xxtntwf40tg7kqfnvokcjfg7yssyjnhgrxmof27h6egl08l6u852b3jfkam9fjav7aj15nctr9v0c4spwhs3tn',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: '71yeo8a1gahob81r5genplxwzbc6ui90ol9691x2hlk7x2vacvfq7ksbqsxdflqfgjr053hc13a7qlca63mcgds13mve5r3kkx8mtgx8wc5g2klrgermlh8u9oxtnel34ndlhdkcturxz1b4ti2c0algacxozve7',
                flowComponent: 'wscivtsysmlgqpqt52kaavj1dslqsaykm7lmqx4sucl8bxem0jhsssk2bhn8dfe6ygimtbpaf4vg96nciuz3fiuhc3hqh62f4qgbkb9ncrc6z6hjk0na2e52xpr6yxflspem8l06b8wot3mfdk711lxooe5wvwas',
                flowInterfaceName: '4jzty9nmlp76q4nfh3qm6przcsluhyc67ivjrm7dug9arkkqvfeu3xrje98jau03y8ky2e77i9551u58h5zi5bb1b24o0rxeovzyapvb8gaglq3ptn78u5jkyvfulg4fhhtzpmkdq2op0hsif4bk0m1fi3jk5k59',
                
                version: 'mf39px5y7a3nu29wgbvy',
                parameterGroup: 'ibh7df4rqbm0yqhxibsicwh6qrsez2jstq9syd7yegluomf2znmn9m59doyongf2u8vy42nzamdw71qdcrfyngi01aollw3nq1agsvhlxlewovk9d6kvsb59v8o3xk3xthdpwtcjpa35n5k3u5jrqng1p83o5lgjbaa9tymqwkcf1ca0nsc8braclp2ugly19229fnrhpjvbgdv05lqcq1waus6ia27l0jus2pxoh9jvb5gq3owm57ixj0ljdxo',
                name: '9gx2tn9iyiykxw2gxmve2qinwqo5qkbjdepqe047xbd8usmodh39iv05j31zno4x19ks52rlxaixmwuqfaisnrryau5pb631b25rt4haj4tvhcgr627d5y8uk4fc66o78apwi7fvkqsr0qg7xady8mibntjkl97qbq5eogdav1xzb8qayicbxbwsi4j3jkwxwktxkmpv69oax7i6dgcwvp6jxj5p1itretpwztysli67311py9nzt2hu19gvlu79ncg02vo3rfm4svv00gumy961iq01emrjak4jwcubvd6omslge2fdjo0iroz9sbyb',
                parameterName: 'kwi65gpo7m0syvyp2os53mmv015v2td0lywdqbz4a2iy7nnm9ep06qc03rbykmt34aln2fghgft6bl07slvrhaokomdg5essjxf8fh6x086ixldeteke4254d1hzy2cnbshy61gez0oo6nfd207e0dji2055ilkq2ke2hn57iys84p6zlm18g959x1rvobsxq7o6n51c7es8av32wzv1i6t81lre23cjpghwhuxl57yt466nm1xaxdag1a64bevdgcfaqn237pk65zo44r0wagmeojebjdxfetctxo5fdc1i0o8v23b0zrgocw6idubj',
                parameterValue: '9mmpttvy2qs25oocj4d34vm3nyiqbp2knwn39f3di591qmn5y5984zc2kojyiu5cpudkmfn4rex1rlki8apjd6kozh3n0nr8hkp6onyu1fc2m363o7qgyi902ktf0whyvn4g21rvksowcvcs4uiuavw03x7s8duwhl3fu4x741kqekvdkj6vqpkylysikruwarbkcsthudvx0zx1xr1z4stiw6lwery8ras351wzn2h91m6e8hs5zbfhvcugs99qcpm89bhpd2mfcd4a9y4moqv83oyk6nn4ep99m2iqqb04no3waxcvam4hxv6df2jy9u6j31hnzyyoalnibsw42oepox1mrm6q656x2kym37qkb49nrv1vuk0z79jqeahwwkgwtgi0p5urqyh50yxxa9wclfq2vo2yiotnlt2vjiup4eqi00fzxl7kuhftqievxwfa1bml9xr7474hbx96gegzmuup5slbjv3716j10l112bkquoutnxyy8bm4bzxu6b7u4svs19nu4o67zi2oh59aamsjaldd0u1j6vwmq86vvoj4u0fkx2hb22bswvswjs0sppg35tnmbhdvxd0nxqz8o69ogpbb94eyvjr1oy9nhw6h8tihz54lwnk5ducok0ul5iiqsgmiazqx9w505nuis2nn8e8bcjrqv6eab5keverzljjtgiiid32n8wm94go81us85yuckoaj8snc9agqqekxso9ht6z1iudnb65gjninyq4mpkxm94v25ojrvevgfmw9jhwr86vgaiw01rxqz3zwolsegs3ym6z3nzmzp3pblwb6i20086xjtipevispahae6uqnr33nmciylnx7ghgk38offy1oe9agfjsf14dhn6g13w9862c2qgr8zs77rzonrs8lribizm9ciwbzutjmk8gvlarm57nqn6kjcjxdrvspfoop67yi08tptistn19pnrnc9hbtoklcpoiejpnildb982zxyg7pe7305v1vlv54g423klvw1vkm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'gqymxhqg6qp86d6yt43uffyjlk9umycz411u3a9q0qjz2bvqgs',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '3tss1zahgs5iujzdpnmu',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'lu7ikrxq1xlvh32z8hjh1qvgi02ws16bnd2bnq35vr3idh1g1ae245yh6axby361o1pcmcystjv1y0jc01em4q283h0as4wvzb0w6mgs5y9guvo7g3qindpzotwhjgoyu5tlqqdb53q4nqobvm7knhfxp9yxkwij',
                channelComponent: '8ijtvnv1qfe4h4tkqt9y7yfllguu1z9js9bvtjtpnlvj0cjyzqe5m6uu67hzgdtqkuqucgwvhukjdmpfwuo5lc1a1kn6oute4893zrm6f3rtau6qf5syo1o3bg5ud4kyajp5ymt4ubkmok4pn831pgklk3llgwl2',
                channelName: '2q87ybnux2c2x59kxk831szzzpdvih7yqv75n03chsxxsu8s5aplkuftelszm3bescevcj2zabtuy7spjxwnutz9vuabfbqgnzcfuqlvma0vxh8j7wffs2i0f93636ejm73ozfq4561t9abip712m2kpzkxvuk35',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: '63htkceqvfw14qawnggff0cg5fqh0xhzofyfo66ded1v6qyp9ndmwwpzhdc3o4a45hmbwiby969x3yc0u8o9ssefu7sfp9znfzfi7rgx2lmnzymzy88ojjdlq30r6g4vxjizfmi87vogkc1ioazrme21wjer5h3l',
                flowComponent: 'cuoxd2445b0s5ltcmwonp34fc6n9x2nus280h76kgi8wi5lxg3ck65w9z9dcmnyt32pw88c7zljenoyta4kadfd7p3s4icy9khm9we5qf40ov8fytfw33viono3dqnovq2064y1yydpbowblxnp1c2kot667vnrq',
                flowInterfaceName: '5rxlkti9axs3gadzo2r8h6cy7iv1mscwteekqi8zjn8sov2tl13cctqx4fzt6m14netp5nxrzblxv2pw8n5p2sm32o52phv0usszhfk6jg3nia5octuq1tmqnrtjp5oj67qmfhn06qmigwi5jau6ie7zno0xbj7i',
                flowInterfaceNamespace: 'rxvujaf6auyzeau9e5juppr33u2ow889i2o5xh93nu01c80f9q0nwcmftv73ofy3wfniaxb39x7uemh0gm5l613bsbrj4bzitdl7xh1jhhgcft14dn0lr6ldrt299tudewk6teqt35atqisdmamosk2jfnjyzqp4',
                version: null,
                parameterGroup: 'r8hzwqwwdrvf9wk8jh6d55108zhstkn4nm3e17jfv0errcxp85fsagq4r76bt7txm534r21byiluob4co5bm6aa87zq841y1waw15w5gdsl6vwjoswfe8kon8dw6y47nn5w4mwiiida18vn5dwpcac6qtmum0m487inrb4pue9qp6y52fs8tjqgf6p22ohbjolb413w0m65xhgp2zu4jfe9lqm8f07eo1h92stwcgr4ec8ipcvckbkijkzfblub',
                name: '2huuztnhapegbnzy4fpnhfdhcdzv06w39z8z4zqnpopqyy13ma78i7oroveyag5ix90vq8tzefi37skrjnhfhi0z2bkc3na9bx7ofy5counaragutgpwxfk3wjzwhzht7t6vyhh5iq5smwrzx8vje5gfisjpjaax276xykgojnharl3ro4epjvra4o94bzbns500nctws0lt25ezxu03jre0pr0szzsbbutusqy7mfeazi1ddc11zyg08t1qar8ndq6v3cshxo6oulfpbz127ftt1o07knljiks36bvl12kjko0j22nu2d6219iegcug',
                parameterName: 'qx6huo4ejftr8lepddpwqd3rg2ulkd45iqgx6tempe55hbar2p0oig8o42lcnn2pd65kpesqg1e2ncuubl9p2y0h5cuild77poejihsfmtfinp5jn8e8utwhih6rgaedfykdwbhjtg73r6m0r9i38g81guharefuvgq92w905nncfee5zmndvhwpamqnmv5bv90ua0vjn70fnv1n6ou5z3zgn63r04s7ub8f7nnyzph3avh5yv839iefo9hefjhk00epk4ir5dpvuhvjsjvpeb71l6nwmfp2l2ulfz62iu9e5h39fa2ksyl2gjxaezxo',
                parameterValue: 'pmhd3k94hmc9mrj1amssn105zf8ur82zudhpxxfjmd4nw0n48svqtme0ytoby54m3bxu0mwrrpg02yy906qhjbwgd2y0nvrbfqvjqbdytxp2hd6e6x75ih7h0t003jiysnpyr2oxdavr4bhviiqhy3n6vtqmjqr852zbzxempzj7ruwbu8oetvsxaogy818y6ep5ag33vj9e4n2qmskfofm0i5bqjhsemakvir8lciyzsdj38ra9mfvk5mtqjmxtur57ur8t1y5e2cicty8wp93pd83ciqbf6ckwvselgskmjlrfmctsgjjhipzvnej1vxfdqnw5v1d5ij8acyaxfk6ksv8xd18otcdyiwr9wtrzxll231t2kko88itik7kb0rg91ic27e3l2v591ull7bldla3hwbul2cs8w76x0a8jfpdl7kfdsmj70mfbhwo2gu3regrszq0ph5pjz3iyv28je3u9u2kn1m4kolsnc0tcw19zrqlpucm8qqz4llp1v4autfe6hanbe9pxthj34sntqy6ed7j8noahpwi0gf06vnpby29wj1fzo9rz9vneyhy1i85hunrvh1xe7i35wxn0xv7nol6gfuguqmsg748bvy51l6jde0mea14zur97yjsujctl81fsq8l7np6ig4bc4ggah1c028ey1db4aqoyvwjmnoi957uqr99jpf3n4q8ebsp0n4gqpwykf94woihsupkjg9t4g9qas3z90u4mrmno8qyvo3e7gt5bl5q6co2lpygkt61dnk3dtlaifyfpflwpnlnbo4soqopv0hkkhelwhq1n9axcrxdexzi9xhm7o4g0cir2j3gpw2s7akykn4kd8kd5nvxneu554bi3yrcnftv1ftzs4mk97pd3darmc9ae78o993uhn8d993h4fnxkm3hdcmerj5y6bqdco3o6uuhk3gvieez0qgcklibgj0g7djcrg2gjs4gibagbnbqockj7p68gtcb6glycabyja6p5mkyv68z5z548',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: '1bljv9lp8uku05x7vjbqpy19f6winrm4hu9yi2xqyttwf2xczz',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'a4eyiqzuduvrmlljpsmi',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'kb10wgayhfurykfnivkad0rk02np5j77ztg1aqjs99up27qyigol84ftm72wlq7isgs1j18gdnpjhiq9csh6p0mmeflso964j3jdrtfj6m7iehef4jbxcy1xiqvvrx6a8tqwg2cf5lf00a9obyn4ofo9wsrlnfbf',
                channelComponent: '55l2lrpzonpy758012oznap1cg8ea22jc1hfi5z7hspaeod4vln12clbe0794plsk9mrdegl0neglqlhu19nunyc4gq1x2k9bmwp47v22lkjiv3a5hhaywe0h9fecjl4bz1lqnz9y2lih7dyr7upr0s5mtkdcoy1',
                channelName: '0wzmy1hqf1hvl6cluhigbz21ubg2s1fr4agm1bwybvgdaoio2tfi7o9chzp32a687z1y5nkcskmbzcoyxtz6um9vri2ovxgjmo6sffutnclgi0fyl5m2y594yyviy01eytodmrcsym0rub8id2vaxvcztd1im8z7',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'alawvion5n8lp27vg27kp1h2423wo9oz2alasyy7wq8ks0w9phdp59h7ic6nzyfr2dgwk0btbvl19xqcbp8y30pq9e337xa6it9olrusb94nv8366bx8i0fyxlhwqm4j7ncwgbd4imns5i454em3wtpoggcxw2dt',
                flowComponent: 'qjrw8waom71zkfxarfee4v2cvjm25j2db0vt54gqxoasyz6gguee7nu075teme1pejjqcebgc5dz6v4u5zifmp9ev83t06orsg5w21jzqjz5muc9w93qkhxgxv5h6tgkt2w5t5e62f2i0lek051ko7wzc6ljy53w',
                flowInterfaceName: 'lc32m816u0r8nw0o4sfnimkalbm9leqyuz27z6bswzi8f45m6sszmc7cs5vov4tf2vchhmrd702hgqpbstuf8hjfvl126tag0eruvohium2bctq7vr4khm68hbt3hh9ppyklq7th318xeuurjar00auzpn5g1v4w',
                flowInterfaceNamespace: 'xpsb4ctto8cflkgn6alcv58vt7ezkxky28u9m4u4bp0xu5mawazmym4hfm54xqnowrjgdtwbqrrhtnxaso7cdm94w6vc3lgsywxe9zryh9qgeourgrxw1g9qg604x7wm1ay67hr74vo1h8si0m510rs6qcp25s7r',
                
                parameterGroup: '925rwdmrz7rq5lhjgxddp9yg5n3sne8eemeubsj8yur5kzt0lhy95rpkha0xubeev61zqshseohtldbh1nk3g3ioagk17tpnqk0ee6dk82p7nr9xc1f03472f4xhi0o5ks5ljgv8v8u53yu5kagqip6ehphe3sawcsnddwabpedg2fktl5wfdshyb33r6qj4ltcxfrx4jhx4w7djj6inpfp7lwuj99p9475b8wrh0shybwppod0vgkm0nyhrtl5',
                name: '8nvqewzfte28mb9erzftaor3rzxt0vmf6ooa51iofxrg7nvuv990ssfrm9pyylfu59t0p82eczqa9zwzq0p3ii30qy5n0nn2lk8exf1wgvcv0rsmq9rdnsko74ln3m1vp4cw42vmf11ob9vewbyk3m1vpy2254ftohymuruebaa100lo9jcfrs3rwrryvujrq0ai85ch3vx2q8bcb3dq4j47426orqa13mljmxemqpejc3j6v0rq2khpu5sfmadelcatz8fkg150ko37ikat5dovyd4qi5w4ld22laswhh1v76k7n2p383rmhkhhwxsl',
                parameterName: 'hl3wejt2ut7006ltxdmuofj950ie4rm1aiqv8itypxbkxqb9n42zfn35ctj27kgcb59ln7s46rzg2rs7ztdgg3pcioa6m106w2zorgxtkrcgly1bhqkqugds9msu5o3luhh705ia5orjc0oneod3gj0dwiwzwyvwgv1l0l8fz38rjvrix8jr34so084mtbtst3hlwjeo4hkggs3k5j6v190y7uu6rtvort1hh6ehs98s83b1awtsqd5xvrgksfx9l7inwp4wpa0jjqurymdifwyej5lmi8bi4055t7kp4ohh95108xnkvpapl779urhy',
                parameterValue: 'kxigerfe3ncw9rmdajbkbrmxt1t09gpi1b9p2p4u69spkx49a4xllqlzuufr7fhz1o1aw9q62fb4y5ca0ogaicon77jg7gj4mvxsjrjfykboy29d2q6qzyvvcol8f7cy45no0wrvbvg4ia1aslj2kpki3pcoe0zc4dgeyk6i4jdlp92ln0rhvjcvjx9vkvke8a4y7yaco7b9nnzypymftp6b7golchz8fs9cgrxsm0tyk1dl593b5a5v0m9p3qayng6ptrhcnh5m0rn7er7rkb4i3buoenzi7k2b98ei77osfz3m7820a0tiiqx6z6yopnvbkwqkx1crp5xafanzrbks0in7xdt6euos2sp4xt9gqmctfe034ce6ygqr77r35nthf0aizjnhmdizahn5g9ta37v4ptpqlc7v6oo6at1ezw8prnxkl35x34q2odgckrge9yr2xs15gbcejx475e3nswbk6e7lbb682yq0mtwm7rgp16122ofyhcuhr2fojqpb9fjihayighsohgggkmdk84pltsybnzk853leltde4toktkyihkyvwdai7wfhtnbmlululu4pk5xdnuk5uh0ay23b5wjtrzeit2y9hbv15rextovq7haekdsf3ix0roszhyhu1ntm39ej89k0cp9bsb362pvzo52etx1vdl2a6ha0dtzrl0unbf1zjty8q2cikq93vml2tw7i3ea8fm9anys09u8se4f3u9k9wjnf505n5k1s972ezo5n3tr2jr13eehrth4iopnfv3y4woli0ox5w7o7ijw2pkab4fml3fo87syar9z2b97wtww3tmrdo31orqzba3wrmejs8xkmizp572745kguajbeltbgzbrr2ccfffnmp7cmlyfvnt5m4ibka84p2r2ch03askgssl2hwya3xgs8ll1asyes1v06qvnm2m8uqo7ggs8nr80rwx0umsdgmfrf8331t11b867n47zj41hebbrh5or0dz5280oo9qs9tne446eo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'bbpq0x373e7ghmomnc7eljdd8kz4pnc11fhml',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'ukslac9oxt6qsk6sccix31xgfwfcptvro8aog98w48tru24u5p',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '0q5t0tai7eg3bmkeqrtw',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 't1pdg2bu4h2zz74f5iudq47nvdlmndfv3qzwkl9o48lu6nsk3jwyyg35zp2gqvso9b7cjqmug3mm9lwqbm0id5vx67hys4kaa8q0y4zfvjeup4zmlaj7oblytfnbt6y89jrtgu8mqcbjnwe4rrgzmtykb7vuxrde',
                channelComponent: '8vzy2v7f1ob7by8kes5aqph86y2m7k5ylx8vlhwazqchdjxj3zjlqqup5pi58fp1ugmw55zkdhrhmrul305za3vlejfxesc1md0xjm0wehezyfpsdsxszxedhl3llcdwamp9e890zowmeo7qd8z2160aatkrk5vh',
                channelName: 'cft78lm969dtgu4695rr7r8sj7fi2whq41otl41q6tjzlczoi8jjzxliqnqwik67r7b2neparg9988hzzi2ir0vjinxvzveii8xzy42vrqejn48al0nkzttlvacovrce5q3nyl0cpgagjghvhhbggx28ea1sg9my',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: '0l0pzd7rvf15emlnjjhr9pskwgyprr90a7e2rqnq8r3yh4c489lhu7lqph56rfr597we6fnaiftf3umrcadz6h6c0t9v4ocuj1bp4umizwyzfkbegkcf7my4vq7ph3lnsxamnngbziqyfhdw9i5qme1l41q6j8ym',
                flowComponent: '15mk3hmua1s0p6yt23vpukj2c92v93z5qxv9ay8338f6rjyktd7dq5oasri1vokkrp2velb0m7uwioqzl5a8pzgz8ty7ghm68wtysvcmmewwqh7xon8o8kmit6d90g4hbmzsizdf146tx3wlun84gq4fnorl4351',
                flowInterfaceName: 'soj7qepx751ndson7yzjmr2qrhhghv1pl98duflgbj8hx5crq1b51mz4k41r9zvoapxsh0tvmtys9id0zzx17qhn8vxdue0t6czg8ey89mle90hq4x84zsswvmacpfso8l35fbo6465u6qc13dzy2mzr6klp5dku',
                flowInterfaceNamespace: 'dn07hqda7bncd0kftym03p6srct7hz3rflqyh4jp8iuu7wu176dq9vg6pfo4f88453rlgzyeg1ej76b9twy1q6xgs6375hanpx5zscbi2wwsszrlvq39uxuf1946dp9645vygp820homhkg884gktemv5spcfkxz',
                version: '1hcfnf06844s2pygh3ea',
                parameterGroup: '1a8hpdawti4xtnmp1qe1xnx54zve8nmd9sgbgkewfwwop5uiu5aywfzd2ews6vlj4kx18vlhzamr1gm35wvww0ltdtlbg5n5h60subz2jq5kxnzgbu8v2907to1r3smsbio1cogn5ytgqw82ixgkd9crav0ym27ljow2dcrt63p412uj1ntf18s9w8z3852m2dte3iq5a3pq2wfzviasamnbu3b43gcp3e4qu0l1o4ur0lt7oujw1ydhns4eq5f',
                name: '2l37zlmafjwjqmkgwhfgi5m5sw1kgcs2x27zfqgjcvojutd9gtstfy9unvt9mo90yd5t2i2ajfcy074kh5zl10vq0ygv1ngjeaylw18pq0xh9mo4ik27sh43x4zvtbgztqymhlir9ansb4z3jdzjajlg41eo9n4ex5eyqui7a4ojc69lxomihntz4l4vsehaj2pdr8zr4f8ir6wzeyccdu88m3nvu3f269ov3e1n4opo4108k76iux9ecdbegtkp6elt7hd1t10ih5rhpi5q4kqi5w8qehfnzwzyiz9sa73ytjvq66hcaje1u082ylli',
                parameterName: 'oqe5flrr711cirouze3i82uisklfm04pv28hskxc7dxv3rvsrnq84vrpawv8ib7agprj3mjo26mh27qd5kt14hccvn9odiaubjel3yammpm50ig3cgekub7r6nfqv0ab3e0zj8twnenys6xmx1sos4qnnph45zlzdu2hc4x2fjms1drwnutmpov4rlzv85khxq5kuak9r73ec0cmbup5hp9k9uuanud8hqrb7slks56vuryrf1aw11ymcle8h0rddwzlar9oiqflbsynel5gxi5d527ngxa0z29fdkdn60cmq8rsnv5u1bttwxzumkdo',
                parameterValue: 'rtec0no845kbezx3a5u4unzahv52tnx9sq4w370s5uc1m1mpqkvphdwx0ee1mjqi5cw9jxg1wt99cji0mcgzjkoqmd9sii9t2hz5drzqseek1xdmjo5yd6ik2zygsf28qux5258hpvkezbyj5omoga19i0win7rgu6mhcq60arn89ay37yhtczowrk3nl92lj4rnqskhh0am8z3i1gyejr2gxe9prb47110wqg0943tptswezpvxjvbw9otdptx1vvda5j6arpl96sc1xh98h8eujv6vk2v4d51rr5zo5aocumnj9pi3j4ytv8l2o3tw414ftwriiy2uwh1viz9ix12mbt0c1aa1mbfowbyomk1o2wzpnypxmcz6vv343e2j941fm5ut4bvemh2l7vuy7ifna4yu76ehmn89z554tof304vshnklo4whsyhgjs9q3jx6x91bg1swfubfokfhhgzlbgt1n3gut5kscni0evw2sdnav7h0p4d5bc610va045cegpefpm1v1vmxdnt7oog0jj454pv2okx8ulk9y622covmyhzkgvqag7ojns7ayh7mznmsrjpsw6pgwod1e38c9b690a1s9u05e3d9po2ehqpnhwf6oh8n2jbn9jyidns1xooxg8egf71yj4mrny24ka9y9b1dh7cbyijjk3ds9m0mu5yd6gqg1dlwaab7lvfgis3wf5mmlradccfii8nc1d843dpnpgi19g7fkogfe4ys09l50yn6gr6m2gh4zup7jrbb1w7hmv208xmyx2m1csx1vbcazgkf1q9vxrzmsqt8h17dxlcnj9sipeobj6a24vszs53cuwon40lvgm4unv24khp7hl8sxy1zezcks9o9xahkxrsqdeu25nh9j2rxumgo0tyqdu739kh0hvbhdhhucsgrxmixtrg5m77stzdkj71t23qf6l5434buv0n73ap7yz6srp6caqhsy4rx6byzrththixcryb1rzmwjvtydkvkjqkomdg22qi3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: '5f9a2m4jmrv6w3fpqqyk68c5j5gk646n77eo9',
                tenantCode: 'mfbkzyruozyon6wt12sw8zpsw9d5ergjc8cf0dlvg3r2c1y937',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'tvvzn3jy2faxvte37qz7',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: '0kl2p84pqmuec4rligjl0u29pb8g5bxiw70mt60hb7izxip74gk9jigw9xeum8f8hhk1udl229tbvdp1s99f272s09qit3ceehqkos81claps7yb201clfgs06red3qhj2w38mth9zf7vvavr0567657pw9bflr8',
                channelComponent: 'dsc6rbx2smqk46kd6zskkowvvpz7vwkcduex4gkmbm0gbdohk8mnyim2a0vwlg6nvfsku44e5fho9jq4ckhm1tb8ma7fltrlivccmm42ugntq9w5izdfb64r3tmm57ga8dl2woxc1eip35fcikbw7oudc3df1uvs',
                channelName: 'f92alllu1l7b0x894zlykdgnfoyd1sxzmnklv983d7e7n0q81m62z7wz5biqojdw3u6el2seq9dytdge25x3xl1cjn2j7e6jbtkq1rzcj2vmm723qzp7su8rl9186l0skr4mc4zsvamw1v6zeo8lt2d7r0tso0nt',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 't126sec6ndp86i55gs39fvf2lk28zzu2dxhpte934lsyndulq7u5p2s0uvq6p86f2bvk8lt01a4r6iz8xg84wh6u95zacq9tuvwhwdp64yuf5f3ejtnfugv5rlj655yaolg4a5r9xfnef2w4qur6oyed9din3mbj',
                flowComponent: 'lncib9vovu8mb60cdwyapqt6fwm4w8xyfg4vg3emacbwtlnpndfriqrqixeoe6j84wyo3o7r6ytuqc09du8ay6ftz0zwvp7lltnln64i1pz7qp1oov2b3rcisgk8k16a6c18pa6zb2f5r4o8dgbqvovfj6z0mx11',
                flowInterfaceName: 'imn8xchlo4ij5gwzubur3rnkk40s3iu22x7h10lh2n76g0cxci6k7zxtlhl5pkcy7j96etc9mz0pabihbsw0befx2skgmoc5777u18hq391vga84n4xo7e4rxz9em4p5pkoi2zz6fzvgw7zxdfbktxnfntp1aw55',
                flowInterfaceNamespace: 'm40x7r4rpdccd3rggz2c1r0ysurd4ng2bmsfphmgxzutqasnbg8jjjjr8a68l3xvaro8y8aylcceqpm2s16w4lh8nd367j60x51xgwgp3xsw0drdt8wt8boa9glswohyp24oui3bv2hzrz1nnv1hpvr5lzl6klgz',
                version: '92wvxlpsmy9umm9ck9p4',
                parameterGroup: 'tgunwt22cjbhrlvsa8bxteky0oblrovupm7aop4wrgq9q96cn2t1ajktn76dfilhyhpm726mtfgbgtaiiq2ogrjda2r9dln1hwgtnifl1wcl3w63qxygsso5wf0jiuxy2gai8cg3qhv0o5tc55u8nqpjmg8id2p88rtlkldfj0udh0v1j07osb5u9dk2n6uoxeux24iuoyhzblq1yphb5fskuasdwl5onzzozbjxo7g3yagb5g8ar6f9h86yyks',
                name: 'yz6c86bii7zrjnedv33vxzujdum8o8n6619lz1mzua4ohxp1w0n3b8xyt1dvwaaygc5qg6nyn6gz5qbll38zjcivyaf1hsupmzaxw9grw9rvdv08mt9yymbs2uhbdwym2lttiilbe70lu80leny91ke8hool7nf0i5k83m7sp9znpetmb6iqpreew1ssk6ol0lgrm3lmfp7nupgleukxv1a3054672gvsydjkbfc62m18z8jbucqmeu5sv7y68modjwnnqd59vznkj8ozzb84j858khafaaki47sz4cxdorjwfvaatwo0ffx3ny9d3qr',
                parameterName: 'x21cg1s8mqdudttqd45tkwnrlwad5bx77mgjyzpgj5vsa2mr2m1t895m4tf07wrhjw8adkza0pfccsumygj8mjxyvlf63kw9els58k3ijel0q7eo5wbcm1k3uwqxgiql9q89jubuw3fypnxtsaemlxkzztahdlgh9kncntmj7c2ckj2grp4kcewh0hdv1159gobvfohw4lxwpeokfk91n6z915f5dxuoy5ikaqx7t0ee2gmtofo2axxx2n7juzsabpqvoxd8wmgt7yzbtdo4ikdieawn13pjy4v6tt2s5uk91vj3splej9g2f5lhg34c',
                parameterValue: '1xo5eww5atyde3o0a5cx3ak66zuov668st4vuq2kbdnwqvruwd0afpgefgkkl6zk7oxv3cmykoc41e6n4lu6z70gweh103jsds9fjlc655curu9sgq4yy5embc59nred2bfueqcin82j1mlr6yy2w33wq1kjwbbo68d8caeeywkne576ai1ql16solxkh3u1qqi75u7h8bx8mgnd33dz2rxm29pvh443q4icgui3qloj1xyzlnx61mdu0lzzrfjz9qdjpki2r1m2bo3vm7r5z5nzx5jwn4l4milz943bbbe6gnnlpy1usyhg6q5ad5ap8w0bwhqjxpmjmgtvkpxfwjfdoyyxlxvlz2sf4trcydksvq2tw9e3mv7yla3z77u1xngmh1w5qsbwf6x4fkonvwgb2l9jzhs8z2ia63xbf79w1dtwsqeq9xhvsqjrqzb4dlbpwpj9sj4nr6uwk05oh2k29kxjp240x2k0jrx1twmbut4fk0zzn5rybr9fv0thezzv38ooadolfwizm73iit78yrrt99zm1k1vh0zny16dy5pn3swr8ekhp945sm9o6aad6tpneson2xj7wvwrib1g8biq0wk8iaeapvo199djxjw8a0gspk7phcwjeb7x3f5e0loi1k4u5xjbsi7lng1lmm1eyp244yde2jzfrcvk4watbeu9cwud3bplcf5no1ufimj9ha30d58whaq12d8tfostg2erfek6zf3u48g1i6so3geobt330kw8btp3casib0khjnn3bxnj78w9nud70cz8cp7fbxym9ih0xokb401a0zofrpm3vr6ewligsjjycd6vyotf7mor97hd4afofjyjtooqmy3eubsg6lppb6or7qdt5x2quxnfanov3kwnmflsvwfbi1s7ocp4f0pju8688oblzrqxej0w0uniy3c77im95d98vshdzjd6koxb6d7rr2pv29qhg57yaavzjihpu9fzth83qpkh1vmru0s4k23ivr44yp9fvva2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: '7ar4r8fw6rw0tx2uwk7kxf8zkf0jki2oyhl2xitz7936rxs7jo',
                systemId: 'qs1bku6sbwpy7rt821rgk7gcl9zczytfliy3a',
                systemName: 'w2oy04kks5dtjk0z1xxd',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'dxn3t01d45n83fwvhv9sfhoh7mdmsqs3a0hc61mx3jhaec8zxwzqimgq8r6n8n4b6n7vy1wneox8wknqev01uqc2nbja727ef0y0n74c45kwa2gcax897gjl6eevvspo2hi95s0ysewavseqon0e9c4tn6oqpz0l',
                channelComponent: '9kqs6h6w4eybx7yxte6xvls6adc0i67lhnmq3z4sy0oc3oa623nw86tysw0o34nyqi14gs4v3x4bhpiukzgvw3d86evt84jiva1rmznffs2ojtt8tbpwl4upn9s65xuive6z5gkwncve6dczhjy04871zbh1jamk',
                channelName: 'cxqgxsbiz73m7oxjbtb6k00zowq7ugzigt7ag6idisp3o9vc9a23r7soeqno44yzi8thtkhn4nbcj1qnpotgej12q5uhretevywg5tmptkkeqotlum84kzdxagtwcrkac6v11mixehbag5odeefsh5j6wgb50194',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'b9waw1v5x27jh2lppt4ifnaworrbeygrfi9pblx9lc1t2b8vx2qjunmj609bcfltdpn97ks9bo1t9pakckctvyvq6em7wjbzdjtxsn59seiftmo9hci68bif3i0gla9tbw81gse23r82sgsmfgj057guwr1g4gph',
                flowComponent: 'l7tr4j25nleezg5ccskchkai7670dt3mtf98omr9fb56v2eokv1v9pzs79y1rpexwpymwekcxzial6d2vuqro7sxon0e2k82701z93wo6va1d6en0tdc8z8hwnl1hxr25nv72n5xvhr2y2u98buptp7ee3qugskg',
                flowInterfaceName: 'iwovcjiyofrmtv0y41vf0nx19v7bkdunsw7baiq4hag5a6zh5ma1ss0oebtcfvq78v1gbffq4ju4th53c2r8j6y9lerrazs6wwl9jf5vbe9nwq4usnq6ijfk67fmmb9wx00xrvyc3b1qi6fimgk0b1f5gtxn6apw',
                flowInterfaceNamespace: 'deavaisetv549vle5c2phgurkmkx4wo5pcpysg9b9zeg6d28cc85mtb8l0jfr82971adnxrlla9ex4sqwd701sjmnbn3q0nh1brn5gumon8is6mmg52qpfnqn01phhy7cz81q612n4t3qr95hoafnalkdxx4sno3',
                version: 'xmpt5qay6kn2h5zfjxig',
                parameterGroup: '75txy6wimp35y85a7n3ywurvjdg6ynrae8ugbzpcttsdvo8y8lujwbupaheapq7te7z5ko5vysxwz84fp2lhq9t2c9eiwux52saiv5agj7myb621h1n1qyl64pqpz7hkep8yhlhk26jdnpd1e6bzr028oimt12uki70ut5pplctasfyelgxxlmmfzoi99yx4dgrju9jdb4z8vxtv8oyogizw3bg4eqlijjvywe90sl03dwjhyec8d2qb7ij4ssm',
                name: '6s2iex2dfkyhr2ng67uy8tl27isdd0aiss7m0vu9nwaxsvstrwvykisni2m3in5z5jzdlvlwzol1soco9xpxorgahh5j2utaihviwldsm5ffgp69obaxmy6hu6m4unhgzhb8pcifb6t8c56ib50fmqd8a1sd5bk0litc80ch13vfdfr9foup2ifbj12gnfch16utcxm9jen8ghqbsktqjmkcxcspjea1ippexwmpcqhn5ho4lc2l121mclckn2j4qh8kkfgj7joudi81kooymhb1swhi5ejhxlz8xbl5zbyy2gw1gsdjh9lh67rla9nl',
                parameterName: 'tctwfx57w18ft7j0u2eyb2vilb4nz6qcrum3iwdyb80cam5nyl31tlf0vt4z1sof85jwuk8dkwc307v5b3rzar1as8mbkemf3m91ji1kv0yfgdrz6suo3p3a99e0x50oj2n9xk03thxoi3tp5e1oboe7o2mt8d5o1g8iljraex50i7hcfk8w4fh3f8fdxh62jiwifpi49h2dhnn2hl31a524q6g8k4eayv81q1lj7ogc5s6fhg3k8dhuwisbdlahl5a3af8bibft5k2ay0mgf6wzf9vx3y2dwcsza7oyuxqmjxuoeb72m1vnvny7igww',
                parameterValue: 'apu4qxx6yeki0baa6jgk0ae832m9ng2zu2l2lwayfpp9yntt0l8vtuxkwv3wn86zey5neffie5ky5imcwpa45u11fzxqx9lohe7xhbn2cbgt8s2a1v6ksqecqdoz1ox4jt5n15uy707fdm1oc98j95law4ki68ugxxa9gjtep35f5aenj3eb1sc5lftdnzgul9x66yat886370d5a5rx50lnpdon5l5mvogn6j3j783639ultjqxdf1ere2393l13p9xmgx4okjgxhz8hvti4ya82e4mk7viqm3u1yi74skjhjedgoja6s8lonne69ofwqvw49gjn6szouebpcliq9dv4afcbwt6k984n2mv2pru6fhi9f24om9kx6lswf59hy06x6djlfmup36gusf5i9x96u83q1hk0uq4i279qre30n08xhbauxxlcei2zsi8q07advkqww5kt2gwj5qyffaozh7v6exm5lni1ppe703lggoazccfrjfsbgyu9upmmo6vrjmn4u4axcgbd4v2f7kuw6pvirseilouzvl8jj0j5sip7joxez7kc2kpp709ktvnv6gktn3u8thas0b2w9pflrbbw1x86io2pi8gzz37wb1hpvuzjj442aalzrqvwrjnlxb0vkw402z3jri7pgubxdiqy40bfe8iq1qy82qjjj3nidcx8m47fhpmoy6pt06xbuxls583yjipvhoqk8ytfltyhb82zq0s0v10bkf68gwwkwnm1teiv05cjzdw7rjvg8u684i4eohqtkykru85z2bi5ig8rr7kokfxor6bor4r7bdh4gg3i4hfw51bqpkln19ebap5e51fa4ena7zbou49s7oaksq1qilxh2zvfznhoux1x4i6qg21fxwriuubvtle8715k91u4es93tk97l5v291lus6x91fv5i5y1wilsc6sz7dwqbtowuks3de8yysuw4ok8nuwqqrq7za2x08opv7gumvcxmd2nubw6aaos7kc06duy8coa2o0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'ur99mbp1n02etndo2k9oxpaej28ln6now7pa00jxghdk34kz7a',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '0s252wrd6knfxdlkt9iw',
                channelId: '2tdq15oo56p55iz71u6id7cxsryxstjcjnzeg',
                channelParty: 'friphlns2ady6xax6ym96mk4nu4744hrv62s01cf6sbpkwfgnodh04dt3lp59m1l0lzb4vrzh7idi8c1gi6pttu3gr7m0yxjgg6m6me39xl12yo0zkr22vzgcpxjhd65pf6lwb1c5auoleyb1bi5z8qblbhmjl0k',
                channelComponent: 'lymbt7mv9oer3nokhptbmo6yzniygj5jucpo4hw7r88tj0mesrrdpp1v07fkibvnj2ochddvlrdqbcvqjeoz6qdnkc78ptsu9sx4dw2qdb5opny0wle4t8o7lq9tvypfb7qviocnwdq6bf01cxf5cv4du4cbwnan',
                channelName: 'v2w2hdg5dq6cjhkreykngcklhjt24hwzy5dn15hfj1e7wmv47nf8l8f8yb25w802n52130tpi2c5e1mfrok330aedyyqhij1t5nx3qe89rxna6850ox23hjzz9fw9avt8oze69hefj5lrn0gj8u409g3xotczt0u',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'hrpkdhj95qrorjnyxzu8k9xnmqsjo9fgji78mu9ejgt01h3skx0ahitobim5zuvyuc9dnh2ncff768ukyq16b0puuv0j8sf6rl9tp8wwdxhaezcfz9xlfacc0pew4p2ex9gxzcttcskdhdtdc1ittu1f16eaqcdg',
                flowComponent: '5ekjc3u9oooo3msqq8md3bffs8y3tevp9ulkftlp0chrseorp47o4c7rmxxb1zg5rmgylcxk9i3e5649s1bvr87eprwaaa5n8bk7irfj4fnen1j637czzolgc551hqm7qnmscseyt5zndbg7wfvjzuhu9is7ag0j',
                flowInterfaceName: 'b456f0ttafw7o945ofg8fnjhxgbgsalljxi8ur97je404qbxqt009e8hv6bypq677b9kqzbkwx0jp1ohjad3o2vrulv2phst1a38bf0gq9nigo57ozz6xm7y3x4ozoxcy222bx2sfoe6pz7zuq2er362wget4a78',
                flowInterfaceNamespace: 'ngmby6x70of50yoft13dslh09ksdr6enqsotx2f17qttz4vw5989cm95iul7m4b5y8a7swlmlp3ysvbf9rh49skq88fxl4wxdo7w482zze649hgdm3uakfk0nrjbzy9enfi9fweju9gmt9wuigxbrkdjbzkguoh1',
                version: '2x1kzs3olfgs9sgr6cu4',
                parameterGroup: 'l9fo26sump4mowuk1zprpol6vwmslzr28017omrurp7wy9utxafyoxthq8xjkyyauj1jfjsk7go2dsbt74mj0foktgoppif3wyvenhj24c4228tpcnsng6nibmj7rp8j9irojdqif76vzte5vjyrfqn7gww4x4d1924m80va9f8v8rqfayhgr1gslaopifcmpxkxxqh1xplfvlmljtcb5u8tnuacjsfzqpggq77moha9wpb8cfjxubblbowrdsk',
                name: 'smbh8t3f0uu2d620n2h2tpiwc94f901wnoa1clw7b11up7rzylgfg7nvo7c28yfgx4p92vlzuvdxxamjozum13nosmn8vpsdl1110hz8zbv5pznk5lo157vqnocdkzlv8xouv69n2qvbxloytl9sfd5chapbtf7gv5zxqa03iu3ed6vrbhukcjnoxesqqklsfxvebb6n9uvegw0y5drwm95v60heasu2a102e9yv2efv3v23qzn25ktdcrbdp2lvf74fnl2e5vnxiqrd3iw1ha69hdeh1yj0myat65000qz8njr9q87ut5qbcx6q93wf',
                parameterName: '66dwwtqhu15jwuxpn6sbyavattt4gg8uqwf668fn4mthompomwe78sclof3cd1c8au1ejqt0ld1guu85sjg4z6uv79qkq965m5duu56qff53tjquyjm534560met65lwra3cu8dngy7w4p3hl7qamnhsbrpwjjqbt5qzihq4ft6c81b7za31gcl57tjctg9flnfa49aq3aaucuibivvx660vv26lyommouxca4hvabrsii9e8dh9yhuew4tcpn99ihj10bxokfjw5gvx4dac2hftk8sbkkksmx5qeiv6zp678pru6zvnmoscb3iyg9sm',
                parameterValue: '03d8wmyjug8vsuoapff0ufiquazivarrvdq9h74ljpl0f399iiwgklc9asebyhciof1ae7j7y2khj5jqfpcfh6io5k5ee7nouwhlra8smjocj1u0c5cn5on9g0p8h236s61c3ms6afsi3gz7bb1d1sx829ll1httbdnmhlqslxnurwxhzbrwz56do22jvaj3jy3c04w0dzig3m74dewcd0lzg06wssgn7iq6qayfsdji964r2b0b2y0pp4pts8b7zgb97m1jts5yatwmd7sszqcjyjdmx55g9221kvtzc6b1lhhsd94ntwigz0yne91sncb935g2xelcudaltnyhbcgaacbzfg8mdrac6kge55tzz9bciryxqsl6r68blkofwyxhhb9z2ctbxnraj71tokn2sfiijzf0mumrwf0xpotsdz59onrai8uajbjkayj1r5yovpou5j7uw4qzjnfw0ifvxdfh9nrp273cjcto4ta40ihmo9tvjecxcbypsuqri328qyedfibzmtbohmbpqrdmidsmrx5yjudw3d9c3bm74vu839lqp4a4mvf8khpmaz49gc72yjyu2m1038ypewzqcpteru1nq04r0kpgpei8eqn5mdw7iws53aiy4keabl3yybeij6gbaaceg8hiuc4ivpl45qy0d3cp28d2aoe7ti4xa51hzaytbsjzbhkatl4nqpeb82h34q3q8xa0y8ykyzww0b37he42iyqd5hnyd2cwitlm2rnfhfxt7nay0787u3om7kkuscr76lfw4vxykt58f1vt5xbv21lj5z3ae0adxlvv0ruvu2tdrzp4l8l8eaif4nzf4227to3u52jv1zs3qnopi5ednzvl9ct1wufcjwyorg27j0l71rcy4roddigasj0d1raudkaebcjslizki6xmqljej4u8nqjdndur5k49c9z4o7ldtmzi6ahfgicagefk67xzupx68m3raof7is8ssa8fkl9ybrxizbx50jl7bcfng6n999wh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: '43tm4j1wyzutdnukf66exlvhhx84hpbhfgn8norgshj10p9mm6',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '5c3bvrtwomzfhf9en65v',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'xcmuaflf3zuc924kry1gahwheiv7sq6z7ski7znk5brivsem1p33dayjkzlklvs9a2v3e0kjr74v858i3jw08dnzlzuhhy43xumuvm34nk32v886ifev8m0v4vl21vefylf6ca2biirkp4imafjfxcm5foe8a1p6',
                channelComponent: 'kf8czj3f08cn5s8tilpt2iwf2zxzjve232ox10e753b0i27014ntytfe4wxpxln74oo0rqehgl7zky1yw8e0yf115dey3ovibw9ja1axmfvkalfc6yp9aw8ajr3uvxtimjpmwyr424busmhqer01zp00yknzanuz',
                channelName: 'z5mt882kn6xyyo3wn5g9ml68y8vhbloknhjlivxitkhcnweb8eqfzrtppp4j9jqi7b7n03go3y3dqh4u26ie8thgxbv5vwn19jt5dtrls77s0cbvfk05vfw1z5mr7grh8qlipal1n63ebmvr992b51vozkgv0yny',
                flowId: 'g6b8kccf4e67m1afz8zsr3cn4t779f665sfwa',
                flowParty: 'nlq5tjzq074morhcoswmvh7wha8rzbdnnz8wdgo2bzdgz1llbm2rq708beutz9gtxhrck2bqpqr1ebkc38172gmle8o4k7mjgppb9lm3nuo5ljcs96cp9lxw9h6pyfjr5fh1x6vjhmjzg4zgyraztnlbxj9okuf6',
                flowComponent: 'sp2lgg1r7y5nox1y9xe2vwcmmy9z1sx5jand32bj6vj44joz0b5nyr9ltyyc0pj8frdnsqzaa0pp41dq0486ze0iowkw1p4dj9qtned857pid1vgs4s757b72i85i71mi1obehavr5fblnpztjrkzaqgs3cw4pj9',
                flowInterfaceName: 'bf4dznqhyub8qy8dj08qtrtmbwto6grieudk39rhsc7kojf08noj1m2avu1j9femoeirjfynwsb880zscul3o3uzn3limxdunm4dtnz8pyvamq452juc4dapkhfbyscoit99ph0zytumexb5f1pmnna8xrjctwsa',
                flowInterfaceNamespace: 'pwz4zwgj9cf7c8cyod4sfer55omm7cg3v92ki6wra8j72av7oygd13bj4ntgm4rdvg2fgxi2l8r3iiwn83w8wkb871lxz2j5ei2nl5i8unhfmu04q2h94z70g6k4h65o1tp4edmewqcayqdbvrng5elo9o4jg9tv',
                version: 'jhplkp6oz286swlivxy8',
                parameterGroup: 'nigrrcn4muclu1tjc9tlli3bad17gw4dcej6ruwi5ih1o6pia2wysn8nn8i1x2murxxonzmtd6cytxpa8r5skz1v7b79ougyv3pzppgdo84zyto0x9x9qqkupb0r50y6besd4gmx675zisal6rclrzpdyxvi05zrdzr7lrpxcznyn9gffn16f6disfmdp9nopyxfxvqu9d5mx54pm9rd14akyhz60pym3yvdm5aaxk8sx8wpvaw4ksj3nmowfpm',
                name: 'pfxyzz3crzwkojr10kkbpyre2ppqmp72uo22hek9nu1ru4h2zcdnbx5qjpfxt3v2nusqnqn9iyfxhv3z6gs1i1o1o9si2vg93sl7sce8sqv2xxkcwey8arhhn9l30s2r3q6y7q2jezvba8uhkmigs9yqt1t74yth8bt2jcd7qajfdaweq4lloczcsguksjokvpto96si8slp6js46be7oyk17aptexuhxajjicow10e79jqk2rli5p7laxzb2vmpy379cppm60vxejc94ua3hunst6glgsnj4e62uge50hzcjjhz77iqock6a7v3bfnz',
                parameterName: 'coce69olwfnpkcydrlrwl8p71cscyag4wfj2yfpnx832ftb5mtd3wwo7v3pirk4byex411medje2j57q92p4n543splzkghxqr1qx72t4y3msstrx174lrmtmqy8emxb3qmyvapi3wbt8aqavrsi9fkqbk9vlvtlpcjkk3now8bgruejaa6zbfgj81fzsln6p9ox272mrc5e2qf0i7xfvjnlnjnhwc8d41ke6bw5pxv0vzrqgoyugy0jq5bk073rhhn5wuj6u0yzr75x4cow2zhm8zqjta4oao195x95ypwgtg8rmbsbik7ypeppr367',
                parameterValue: 'w050q738xwm458gu91wtbmpn3nhx7wjf9hkuuxxor53jsc77wmo5mdfs738auxttw1q92wi4v45hv1mcf127867ef10hnja4taabehapfj99y0bdc7eqs2tmtkf8zqvbyhk3bfmlggfzow8y0vut36h24sdnaim1io3c6grplclvcyxcpvstdrtdzn88jro2bct7dx4ertf1fohb89lytyj5qk1ad0vpqura572dj5587oiwf5a01tiqvprgt36mt95tedm5ny6ko5skuvajsuf7nxzy3neswu9fdyh7yxd9l5akqc2lzl2saokt1ljolspjjplaw1fxt2p8tqkib4etal4bhsgpcwxzi5ipmvhznnbtasrjnu1np1tyg4t8tyuvp7rusgujpt5bg3s60db3gqh3goum3y4i9g34qbxcxj6qzliree2s7e7gywqds2gf04jj8jv99423t1p8hwlbt7lsvtwq1vj731magxxn27quxjz2o4g15ydr8zrjtr3ivtx3mrohi23v8zhbij0i256z9zzm57c0u9k1koznm7d7d1ce794l3yafk9l2aj0nswmhvrvios306z726f43v0utwnw1in654fc1aunqf148zkj9jf1kh9a4n0022d86mps0ugtbgl54u2ljvzfek8hp2qa87p4k033ka1vf5z2jdjhidqpgu87x5lnv17dn03y3qtp3jrn0f9q0f016vd5h9klf6l1wo8pre2u0yj2vmvdfybhrydah8npifbkn75pxbj93ymi59d219qdqqd29e2m51oekev73m19myxtttz66rqwjeaot5bzrtk8a03isne68hnp4iomvk0fl1htcclo7ydcuwx1peqyqqh6nfletfqvbq2qdg54x1miq4feherrsf2w4paf5dy9l3zlne39qey3y99szzn1me05c1iujqx8qne0yx4osmlmpjm5qcemkwzut3a1u8q7kd7sym6cnom3tm0vemdgw6n9ppf3yc7jal0yc2mq6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: '8s9nj0l7v8zabobbqnzjt2w339p8vj5vcwv60uo57mwxuaw9s5i',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'htvtehztb4ypjxq0cyk5',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'mzcfzomf5xif0hanh1k5jnprgz5e8xzwh3ryo8ms9agj9gy7kwg3eml8c6de554oenp634zovgzvtj11yb0gbbm7vpuz6sow0d2384ayo4o8g0gsowuhvn8apc6m3kw80odb2e07s7cdza7dww3jx8s690zn57vl',
                channelComponent: 'g8v8km6v49aql0dygvvvms3kkcvrwglkh81lz7nsnu3dflkgzwi38rqhmoeti8wbjd41bfnfpa2ktc8u7hysbqvp24zox00kn7g6h6yz1g67uqky3qyobxyuozylox5we0nugo3iqlbiqa6nstyydk7r3qlu8k5a',
                channelName: 'aohnm3qs7kzxa884gqvehc26ovz2azocww9ujuidh85wx35vfeqwimfqd6zq5fvoulafbp7tqqqtrdliryph3ejm2ifuw589ounzy16alokd01zufayxipktply2hf9blybkc0fzt766brq52lhctkwgm7zs89rt',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: '35frej5b66jcspogybt7f76aqlc7y583pzi2y2eu8rc12stsoc0cisa08da152t7435moxkubauxye1iliz4uwzmr7eg63tgbjtaus8m1mwpyoiezo5oitldi47zwnjn89ax46h8u59cw0gmh35ajt7992f57bl9',
                flowComponent: 'knwx5vr6eswqo24nvkgrqszxh8qbzprpv2suz083dbovhzrs43sy5xqj4wjno7r7658b4zvssyitbvy8h51frkmve250hwdpm4ye1ewopbn0yhe0ismrb6vqerrxkrfy38f53oqgjpujlmbz53jfle52ywe2ej0j',
                flowInterfaceName: 'j371fj1ac7e99me1ldttqk8807uvdgg4vux6ykduu0ookzqtihv81y79bizizjhpeykibxjz3pzpnu66om8fmjf4wz893spbk1iutyujjq04h6whbsgvumkyfmyplt3zmz7fc0yy4a8qlvj3htsa2favdz8ugtvj',
                flowInterfaceNamespace: '2md7jtiin7rsjwrkelheus7xtw2qlhfy180qc4l9h4ykt5kg60lu5lo41b9rkub50oxm5erkl38433gyp3iy7f4hpik8pwklgmp293z3ee5qlyx01zf9wqx56j6iafwb4miifxyj4dpd04wplo1219xcscjxynah',
                version: 'hi4o3gbrnadjk0wd5bl9',
                parameterGroup: 'skl86hxoooqg0e1iu6tgnzg4wvghfwpeldmmdfm6sizum0kun6kibobp7uywm9wnzobbr3nyhgvcsge6wordy3wkvurwj67vbro7oy1559fd84s9y6cwe2mcqkyr5fu40x8kxqj49kbw8bq2bzid2ioymhajcuncmhlc77fg4k69yrgfi8ww7v06028r696pife9lkskcpwm45ti510k8y3ipij9vx4ufswggchjmcfso7shksn3okh9hph2w4c',
                name: '5jd63kdugjtahoffelblysyh5gvid06k6vomgr0vnwqyzcj7rx5ld5icr9hekw47a1ns9149assf1do2iaae0dfgzcn06ffcguct1mft7x8qnk97z04u9rqy964p7e24kbswvlh3onzsmeqqz9qs05evwj57x9ewqfrqu3a0myrbr41ly2bxyh6aefaqphvd0s6yutz5zx3fxo5ucwxhqhzzczic6ftld08m2o3fmgzvfc4erqmnfmb25akesv70fanv8kovheblgmo4cf2x3ihifvqh6jzvz9atohd0cfdk2jdaxrqwb2x3glm7zl9u',
                parameterName: 'auyppiuletzt03f7lk75dggken2pjxpj5gf5936jrarrtiggdakcw14y8s10rwhrd33lpud35vu1rrjsf48ry2ztfpagts0tfn0w3ya0pfsn974n8rx8e3o5ytf5puvcnl7qi4r5yx6rosvq89ogjhs5szfa5l7uqq117iyc459es8f4u9uj7qhj78hjguyw7ox8msmjgptiaiomp3va0gjoo8kspw1w8u0diwvw4qmerb98p3ai0uslm9a5rure6m4b1ft0jl0syel7fzixin04fbpnlm4901b8xttn0fsxyp0voo24ya8xj39rpp80',
                parameterValue: '5flsqup8jpn12vrf3hcasw2jmch4fdf218t9of3ni44rwa2z5pq9xtleholni5f9wlxqg0mplzjlg1reg40owvmlbygkznaegd3kpxr3bakn79cxgygmd1bgk99x1a4yoq5pbb31ixjhrhskul6kvayuplk3ikhc437h0ke27gptwz6bicjjre12orlz2tabr54aanreq85775pb76kucyfn77gipy9javf3ex873gqmtv9ikx7oejbiecyu68412w0l904uk8zf07q637bs3o4tbo81skh9ag8kelllzsv4c4e1j10id2aa9wj056d9hdbdztyrrgf2in2yoaqe0amcm4vnwxffgmq31jui53g20n3mu5jv3h1fk0i2ccj3leji20cbol3alcgh5skp0s7x8xw5u8zu4g0zxiwczwls1znurih3pm0vp2qkpzf42omqsp8yrirgo0s2oi468xzxzcqez1wlh8bewykzgdvbjcoij4vtno9d2283ja1tprh7n5sk6keneez4t2iuna88feijta2h2ciq37pdg8be1qypdbthms9ut6mnia41z16u3du188ght17b1a8j20roqulxymro3hucfb01xcxt8t49shqb29kwipk4hs75hzs9cajbi1kwbfdwjam84e259kmq6ei2pelkh7pcxm5zy04dit3dbi486esto5ki3fx21pkjb6l4jjkrsc6ctd2982qt2xyw29vq3ayebkq6yfiac76lu6fb13baif3r54qom6o53v35igxixx5m9d5755wckaohjoapk5fi29zkhqr67orpjumd73ge7bfclcw36d2648exiup97yboafalm60irtfclbnwz3u8bbsgnvyzburaj31go6g9ud68qpmnxbqkdisa2dfzreub0bq460udxzlf0zjtex8ocs1ltvjw4zyqco05jdzy4yhm5b3d94oj42f5lpl3jdn7lc5h93r194rbfurm3wytog6wgvwqua99b0fbzpvwkha7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: '6fc9nbxsf5donsverpw8022iwznzkupaiernqp2ngchk8enn88',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'ngup71cn76pgqhrv6m6gt',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'w6y4jspxf1wamc1wn00o57aloqv5bzywhg4ivcs1vos01fj34m25qt9ud01d2w1f0ytv6oupa3l3fvx7waqnn5sp9dz91azkcxge2kfwjn7ojrvk9nmhmlujijl96dhnnimiw1oo3ao3dakirsrfrconm1om558l',
                channelComponent: 'arrkw6km2glixkfhhwgycfr8md9kx3bs35a207kvf6cqnfbcvpcedkzzw6nrnocim2uh18rkup36z7ij4yfyjvcr0j22ceemce0jur28b0wsm4mmssh88kqo7aczcdaq047k85vkb90j9l59xc9j6et2rr4ahw2z',
                channelName: 'fahpfnaq9e92gyrvyiaiwk3gzllupyq46tsxfrbfjm2pbstc01gzp7fejagnpxjjpvjdrirm5ytd05bxys502zudzuqwpjfpwp7mqjddyemuid9r4jke3nk03zfiumrvahym3p8p2uxkmc3tnqx5vszegoho3g73',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'kz45ynxofg3gr30athwo673hr1t0x4hx6497ql9c9egfo8zntf8cs7l1cv5athiauikauk4ciswlnky2e95lfop3irliezwck29blgqbl5kvew2kytf6r0wdq8esunmp3q4tr19sofvo3sowi5f2re0au2xds1mk',
                flowComponent: '4i1yf1uoexy1aj6185kpf0b3d4aog61mjjfwwne5kxhhe33jgtai5z8j0tt703ccib3fubowhg0d9ly781tyyu5sdthj5zntd7jdeai4i46477vpwnw1lxfont0mf8lrtkmnm4t2r0e17oytcfhcw6rqnydbxvk1',
                flowInterfaceName: 'a9v7zkpkkcl36cgykcvflv2l2y4kp3hec508xsqlxd349v8mnpmj234259ewt70i9w3jl7t9k8se0orr2def0vicviiwu5ube9nioe220pixc2npbxsnjcr5n8ynwce8qwr1lo9dkus0zcq2finwu3u1nn005s2w',
                flowInterfaceNamespace: 'yaax6irfzpr0numwarvct86fnzko53jdzrhg53p0az8lrj8ii16k4cyf9dtbyal36wemhg8bsbglye34esq08f0ztfu0kgygswlgzv589f910j59e5yjkkjvamhnsubl6rz3db69un7ey0d2v3b0g0jc6xgspg5s',
                version: '8w7n1qgy2kbkhgm9iwaa',
                parameterGroup: '4pphrth80vq9fn4l6qie0klekoio8kk3ebw44mbyqrd9fw3131yupv1e28eew93k73mql9g4p223t6mh05zrbrqctkuqsp2ww4kamzpxa8a9akzm07otyu8osvtz17hdzk2wsuga6w2i0nd8ujk15okw4r3jt1c2rb9q5b8pu289hvaddwjoyqt6up43xpcazswz6yulkeyl43cgr11d8zj3dr9hu5phxco8wzu6qv470l6o0zf0fsvfc2xbr2h',
                name: '0v9msrmyou8lwp36b97wt5c7mfv56947j52j6sv219v65fgaqko8114ytqcn2cxp58k348di11t441usvqixjngadxl5912i4aw2oyg4olxdxremz8kh8fma98y3btr1brpwkqrqniinityqd99n0wh10j1grhjyov07l9cud1fmk1m89ogvtczz1ajvz3vv9ucsb2mcyb73m83tpk69cxhhja0h4wqvknw06brcutsw0ewfjijdais00aro6j9oou7h7fwhygpj0dsthmcyl2jeoqbcm83vjzs0o40o3zu47pmza8xlforz10luzwwr',
                parameterName: 'ohjc0ydf7v4808mamzzkug3g26t2xbkjo71vu8xfudzu61wjhnadgd8p73hlyvl2zcj6zwnizf22ivn3lafdpcwyndlqtssdbsa5v29khn4407jv40sx491c3wd1fdli549uisfs8djvwkpaolwpv9bc4d8jggalpp02iwet3x28i05eqv6e2s0tvvl6s4rtjsaid30oc3vkrt3p2v6xw7ny8m2n6gmqdxrsddufltfz92v24izaey0xmxcjk5qbl07e0c2zsclr5rv3mpkk0ny1vk1lvyxggd5ch4mw6cxcv3ylbqke9ls90c72cift',
                parameterValue: 'if8zeyb5qgh01n8ixcyvm2jtjp1f61pxhbt8zkc9oavvodvbyw034jxchy54fxbdpznn1tocbgbg1i34kzvad0dsmeyog6esn46lse2qoighhaszs7vhklkgzb2s9fw2fhiad6mpnhfqz6xgvcbf9avlxn4edm862thefr4qil3yb0dfw462qezc4ckfzig4a0yefglec143cdbn7fu94yepwm0ujnwl84igw6jto4c5nvgxpph663xgmpz0ed2qnaxdcifhqbbx8jj0fzeo7su3j980oz9rv8f4abkytwsoekyx8c0ussgzij4gtxzwmb4o4zfqurlaz9pvwdtbxctey6vw5n4xtk9c0sgupns30y8zxbzfa1l6yjdnc3azlhi0efx0zb6l641y79dereoji4pcmal0gjfrfg8n512dwtyn3my6qaga26kv56vzim2xe164moq2rtyz4ss89eclyat8h3byu0tliljwwk5dxpvecyyklvumq0ve5kcxukww0k77ppmof0xvrfpgp49t5wi6xnpgo9qcetxopmkr3rcnn3okffan193msc28835jdatcqfmujr3ffj28vm0s4cri2gvaxxjw6olsr6a0j7qvd7i9e75194ernd1mwozqko7xfl42t8wj6q9ohz9jc98czp8j5rlxlnuvm5vgl8l7r58jvpyxw2z6gbbrjqfcfc7yse5bo50u6he2l48q0mr6uhl9zkq7qmf9wkqscglxutl7zbpl5eq08qh0kdbv0i4fbhyobob1ya9armpq2r9d1133ry66j8j25oc40sl6akaip6d816cpx0lm864tk7bsra2g4c4tzi5oubbazb7b2ljxns6u9qtttw421gbuj1akgslrd6xwpk0ukqnpbrxd1ppdmc1h58o84tirtg1sl5ewpqgyezyffvc4zki2dhzl0djjzrnbbbvio77kieoqeugphacvlvak13udw99izejsjhc6ed8e1rl8xkfhtkzna59z4p34jlm1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: '89jviwhq2jm4x0d9thoq45tttke8os300videu9nkybtid56iv',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'pdrmnlbmhg1jw4syjry6',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'm4h87scf4cdrh91jlub8wepxkq5asv1bnnlzs3svilz63ipqo7g4r7sc1kcbmug9al3ug8vloknhy0yg75ll2ae7jgwdp2u7x03jlw2mdu45w23pxgcxi7ovq3umzsr0akm9134wsqzucdsf298xy3q7meroi9tdn',
                channelComponent: 'n8s5bfuwxvo6badx67ptxcpw7n0b1a56fvasd3zjopaf6bca15090q9oqdwuozaxmawt5z83r8xmazhnxz6l8o731dzzdz8hnylcm0ytn3t8rn1gebyt79iwvhn350w85yffkqohtso1s589lpn6sfmhtoey0enb',
                channelName: 'nkew937yk2mh3g6j7nve4x3688b4bbi7ckunkzxrv5f3pact02n665dhv9m1mdrg5kofyvlgj4yqzdy3pz6tpgiw0osek8mj06vfgiduitfaoame31hkeua8zq0egkwgg2gt70mih8fee8xkbo2zcd33uv7ey6k2',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: '1ld5rzccssby8vfoaxu1ol5qien1c4g8ngnfocvnb4tfteh685l5dluit0yqv4wmdhrzx7d3pmpew57m8g0zwnqp4saq0jjcug0ly0wgpkspo6np2bl46vguuxs3399ofdtwqjwwf84ygw33z927q7rpim8m2g3y',
                flowComponent: 'a8xzfsnwjfty2x6kxfudzpibuzi6l6az0plbxhj4o25iikxp91zkloq9wpav1o6wrdu129kor4p1rh5kps9wey8lx7jsabubsjpr74i42s3dbu2av8tmadtxkkncx1jhazxccehwvx9xz4i8hwj488tfvubdh7cg',
                flowInterfaceName: '3x5xq0pq5jwnc4i5iodk43du0rgdj402kuit7gtharl32mqgld1dj0y9ynvdrez2punkbmvv8fcg2kuqn7pbk5yo2awmdviy4y2o8tepvfhbinud9jvpt5j7foommoxfko1cy0vwdjku0mea43xjfczgb9j0g4wu',
                flowInterfaceNamespace: 'yp8oapcv55dy5y5h1k6rzrvsdjns8ap7f9jw58hpc8rljjkhgld1xlradyhx56g17cg2oiavvnc2kpee8cesr16cgibsce86xpz2ee4p5hvjk7y0g7eqta74pawgn89c2dadi707r1y64lt0yre2hgsw2kp46gi5',
                version: 'ltu249ex4gy62ugc1n8s',
                parameterGroup: 's2cnmzks5xfsi9kpfnr64zye6ysw1n9fi8eykh9p0pqp9vvpnspimejf3phlk22h4ua67v7qitjazhvy0d5jv2h6yp09darvrr6hdnhbnn526xu1roqkynmb1qyjpq6hogzm8bgmf0kfp9rfjenwq10i4b5bjsg6nrrfbdy1zls6qpqvldgbhtrn89mj6vm98i187y15rwegmqesmgqt3iqx9dxmws8fdei7h3ir2eey0e4efnpsglww23yuizk',
                name: '379ravcwobw921pe4rh42po5mxjj0li497wxmaijtfl6baa91kvrhe0jkhlcbijmszqopjqw9i2043azva27yz649s8nykhdhtz22jogrhv3fwdchnwp14uladn8xs5qkfmolc4juiicebl9nzq5cte96epbza3ci4yq17i4jwmsfd0qx8rdhdk45l7td5mili7zjfd9ol1iph13ovl1d8vvzyus6rw5u2j0kka9homxw6n07ljkqive5h7glswgqgpzhbygrjph7gtzcn0mowh87ktsk9j6z8mrw3l330p7kcfeure3h78835c4grj0',
                parameterName: 'uamavl69rqlwqqfhq0wpryer6as45wu4ae338owwb2pktctmvvbl9xrcqsnpha4g6bu2pwu9k83pbjcmodwiqg4vor2uy6iumval340jfzh0xs6c1w26tlhqxn5nnitodeie8h10hkm4it2aajuhkdnt39ni2efhkan5aaozr7vh0lufk6etx7aml4f7t8rh0cx086qg241cbqjpo5chqx89l1vhzui4nmv3bf5r5qwx6ojxxjfj7kkls13a9me3c5mvhyai8s6jot7j79l4731xgxee3up07jndbe5e3ffekgxgi7v758393s96cmes',
                parameterValue: '7em1hm7mkrei76tp1bs526ozl9e8nkylqhxktsc8dx1s3td0fvsn43q9jtm7t85nzfve3dtb6ghbphb8csxau6a9g0dvrs13u0kp6pz2mgwgeirivhwdesyg3oao1wprwe9t7nuxfj0nzc6w1dk8bjazfkynfb6px6n1h9b052jftbj558rsby8nx437vps53jujnx7ud5uuncyhz4hgf66p88hmf0875jqn3ju63tcax42ycnshq1q5dbzk6uylbfkqe49q06knfrg8fzyyzdhzly8z40kqktj0vck5j524tdg2yiginzernv1bsl281vkwowrxei7od61ssu84vck12y8vlmsub7ex1texg7nevwitjxrkdie6ig9r4i31r1sqje7fo8oldalg8a08zwmt6wfblis5odj0u58blf18oa1mu649ydc30or4hf95a708ppt2crkahtkh7cp1kb42vd93rp370pa9jxdat5kmloafmhfuc0y4iy8gxn17esqqyc4wljwpkn4hev3oqgsz014ixdd6bv4cnqctdkr31t0d4xlu3scq1djh409taepie86an4x6wmb0uiw6ultrgeywd0354i8d5w1oicj9zxyfwr65uwgpp2fkknlraxp1oyeztj5rw6syhfactynguqo7l7cza9559namsgyc2za5xbzvwpcrusnq1oue9p9j5pfl6k1vgquhn9x1ub1izu1u1wnp3rqyt7f81hcp269e7awvn9t692pk2zpegor1s3xmbj7s12ukgkdw7a6l6hacennvc0wpr47tdy808kp8oh5bfau1iz4fvxs5gnfcqgq9h9gt54bnj0sekn7pxj5h00vnzag2udeyn90x6bj1fc8zkw5c9yq5282rnlyqpz4uyt5xlxqhn64noycb8yu18tn3d0o1s6005ha5s96vo8zdqnh3liasv0l1o5a8iv1r8xwknfghr4qvu4wgrlnmxvnsn7nhbsqkcrfa7lkud9t83mpsqvuyg95g',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'xh0m4www7hk8sjxihfeff0aep8ftu52b6kh82yq5kulufq425n',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '2kii0ez937f22de77rmm',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: '31nsdrostxvizsk3z1ga15e0gip5b9sojpq7uot6egti5j2wlwmfkrf8rp4putou5h1kiy9o8zu1lu13g20wnzldo20khshwz4uqgny9jc8ku3lltonjtkal4x8gol87pt0b8hzikgl3eoqkk0t8w8ilm4p6iqlx',
                channelComponent: 'qwt6lvadgrkek8nnql30qtl8yfsg58aswr29napbzrzj603lf2hexfdekelcz9xbzyk8wjoq4zez1nstamzq21z13dvh010jx00ppc35ikgr0tkc1p3qi3prcxp8i0nfsrxjdhgdgssnaofk7vc6jv869wf1zsxm4',
                channelName: '9rhnahndsn6uclt75vr3csorr39rnwkztkk7xi0tq9fnhet3nvaflky83mu4o8vw9hynj2ohgot2slfpwzjkzxgxmr1z7mxk5pyheos7n4xy42vjftkhqxcidhrf58anuj592pbq1us631vrg2p4p38zh5b59eba',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'o9az1zrsidg0u3ogid9hcdyjz7ycls50vkggkyviqto04j3p60lfbb7xaqw93drye7eqwjd6vx4xwdcc05houubw9ca8apd4nh288m89u4w7zhfmmogs4yq0u76xf1zhklecu9kzrvkqjd08g3qu639mp4stvrrf',
                flowComponent: 'ekzl1lmehojk356pram48hfpai9zbzx9czu5u56aenr5u7czw2vvfu49n3q7d80pm4z485wikg4r0p1kbwo3wowczqxm19ua3k0vlrtlu09tr78lfqe9h44u0w4ojrlbnzx3aal5vnaeacff2x0jw2qljkonlpvb',
                flowInterfaceName: 'mk9xut7h7bodkxs5dc7h2ed9oq06hwot8w6h9ti9ywazjk9v1yxlw9ft00k74nnklmm9laf1vgj931g4qv31b858arwvfph70f8ic4un1mf2sc79ogzee9yclxb6x3hagq9r2yhpnwlii9kpwr4tu2msek3ibjvl',
                flowInterfaceNamespace: 'ggfojdsugrcgi06mau7f4dyxh76kpacmdxv85ew4rck5r6gz03n2q6rj3pjuh3fe92yy4ud59q2n33ybs1lyodeyob2fywx2p767rd1ii9rvyco5kbzvgmb0yqf49by58ydwwya68l28fkjrpo8ikfyco91fcf6v',
                version: 'i0hjprls86v25v232wwq',
                parameterGroup: 'g0mljsa5305veyt9hcmwzre64ee6n0dhnxdx06d9kum78jpesw4jxsczuheopmttokpg9k8l9e95gyyw07jgpwx062cymgoufpvs01im59v3x1lsxx3z5t8d17iywuhdz5tzddfhy5o8qz13ng4u2ic5qjk064rek81yokq6unvq4rewv9j9m47uuf6bddmry653islv8wqbh9rm853pt7jkm2kz02208iymf1gay8szzwca9bx40swqsuz4m1k',
                name: '5s0yuh5w2b598hzk27mbtpyio73s4n1tut0k0dgqgn17vufqfjz2jbg7o89ce3i0733kujrdktoylkxqm6fclx83uu2lki3vkuwvdkl3xkuehw1cnu5w8ikp7o5riox3v8lhbdzdpednbs5umeo9f53vugqk3l4b7hsoy4rl7q11yrpmrp9i52mmsojboy3jq4c0hjhqkqp8tazou9s96hzc9p3zn4dl5vtjbcmjt1tffwmr31dpw8dsbbslltlr84qag0oc08zj376kn62k1cbjdhv04ws4vtnythxzg16z8ie5ztuujz8me791glja',
                parameterName: 'n4akmsd4ua9j7tes9qiwl4x3aj87mxla94gcqsnf7sbunylcxqc8rqvjmpyhfvemuuf72il4r4ez0isbdxdug45dnh1udeipfe5uaw25ywpu3819qd7u3dvnzlodgv01176qdj001vmpihjqlkan2wjk1rbez6jsq3t6wz7aze871php8z5twpol0gxiq4jacb8kmu3pzwzgwmwq11ue1bhw7knwzv70ht2eybfzuacuwascrqnt3skdybwpn5984vat0gacudy0ucjhli4nuiivqq4akeobu293v4scqfbk02qg5kq8ga7q49d2tnj4',
                parameterValue: 'fy2jqly3sserwdhinjbb7yxl396x8sx7f14taafzzas1mtmvskrh6a7pcdbkvrbi5nok4dgkcsh0jbcov0isbw1acxxvoaxio8lnad3mxmvv9g98abnozwa2o0bt0ahhj69a1tm7e03g77kebrseyqsxjs2fj8ns0u6e0ukpayapwrbc1j2fb1hdbpa5ez0cz6h6qg0ajiisqa9ty92oooprug2kny5yeyw4sfadyomfzy0wbe829m29wayqb2m5vx6strkcv4zw1balvkiixw9y1plrh8c5u3r5a8cypgbqltyi83ygy4dzmw4pji8v03us4nhqosxcy3g1durjdiy9mptjc6slxbtzja0wk8f8qb6t46zsf3fd0wxxb11ilynxveskg2m29gd9kdl69o80vmyb8s80xpmv755jqg6n7cp31gmeaadugj3xbk85fklbks9et9wcwyn1nybtt1nhndt1z8ogab88tib5o45863hbehjkr2v7dyosb4x4dtoak3w16nck2elb9tnuq9kl1u6w6gskimwc0hlbojnzzso11m85tfz1s6rya8tvu6k1tg37iuyywb65humg56qltr26moa5b1qre4zlyo53xytpbqugjh2rfzqmnu43n0hq06rs0v7d9h1h1wjazbexxe7bvg7hhywo4mvwp5ufmq4bcd40qcayp3igqke8995b89r7lnf221j49dpcq5p6xqstvpebxg17t6mhoxpee7e3rptbovorasz0joxxu3wrl916qvvnsjdrpp1uok9bnzpjusx6nv13dlwwaxnoct2ynxlj327gspem3yl5jrrw3i0kgwepm8t5w9kzqj3h1orb0vwoqw16yofl0lnjj59fk9eax897ndt6opupjqx8flz683wj8c4kz6i5sybf49kcmoppcdtrv0knkoftd06t6ccmubqkfga2y4ybriyfw8w2oxf6nuhn2hmwsddlm6thu1lgi4x955k5gpcodktm45gfa4zc0yhcb8ow',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'xf2dcygtd32852fqebyda9f2em36a7z80m770y1zl42d01fujt',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '2lt5f2ytiewl1vwqagpt',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'bnaltqllb8u99jtlp0vokcmdtvgayv0ybcl4dx6x090x5wx5knosg5tj9563j17lzhpvqmzmqpv9qhh3ykufxiuj72z2irm2leoj3vbigx583338si2vo6oo07qauqnk7dygn6o5f51fr6dl0ddea2jnfu642u5b',
                channelComponent: 'f4z2me9p35woo0alwqqvkspglfa8imz9osq10c3mtj64esshhs9rq678vkjp6dopo9oul7k67k45av9a9puzl2dfm75tw6dci7th01sxea8sfbyx8n88ikxv09119mjdiv2p1sw1rcpdt41c78rdpani3o8dzd8p',
                channelName: 'hatv1q0pj4h1mojjpkuu6mubm5fq3vaazvosm76se3wi988tevek6wbec9o4ij198iz1gjuotoadrkyiry7z5kzg5cxb654kjkv9dxypnuoqthdlypxcw2pqb2hm8wf2blp48z30ld1vqro63izl2omg90y6bu8dw',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: '8dtp9i27ql874jq1dj80wzz154omd3dy83ac3xi2ap2b07wbckccaz5idpr7ux8if6ow5u558dtuqe95oe52irxhaoo6o5t0vugicgolfh8843z587jydhxmser7239ynidlldpv95ulslp4sw2cxlagoaq2nhtt',
                flowComponent: 'tq3pljulmveem0a8v6yqh49momghraccxdrvjhmna09u5nl0f212x0da31n4oyk2f556l5mvfo76qi6bbj07hcz5pxn21lqbn5qhn8v2xbr1hld644egc7zz19h35t38f0eb8p35iqjrgb0ca8jg9324iy90bsc6',
                flowInterfaceName: 'lmk4eex38hysvrxjh0twz2bwym7qv6i2yo1cuascp0m7kqisla572d4ytz4u7co3c42z11msbgcorarc5avsarjdicdkkpxulrz1fuxtbdguxiiradq2adnp3jgdavyxw3j8ivtund8np77aguibwaxjjaf8o059',
                flowInterfaceNamespace: '51nu74atpk02lkafxo61oqycsntj4ltmm8wjacdomvw6otioxocyhw47geixmu29e8x56jud7h4e2mzwicd75i9eexkjuedr5nqno3lai7do26bx7c8exglus99zrt17o6iifjb4oa4gdf5fj7nwlae0kqw97l6a',
                version: 'gw81b4in0owsrs464i7z',
                parameterGroup: 'yamribhb8uir27o9rjwhq7zkdx3edtf0nk9ucpkspou7q3humxllz5vq1elowrcmt2ilp75nf8xb2b1sg1p27au5at7capwmc9gd3lin2j5hypizntegm1no7zmpby1achh4imwdf3bh8yivgt6ehs0ht13u7ld04al2qcq93itoglehkrpky3fva1mrb582c7s8zubzwe3ax37hx4h3m4mjs0ij6atsvwfyekjtuxpaomlhadetclkqx31a06w',
                name: 'vb2eyxl9mdsyd7fccpz32b20zolwmsdtfgcb8i0jgxpi50y1773lvggdt6wve58816m7c4qxkqqvsj1lill63gmp8mfldsw7gikef06w1ok6kdnpkrxyt0c8y19k27l7c769zqwa9ehu90h3na337yart6z48shybxkax78g1dkq8ve2sfa6cfszdo3eprff952qkjpuncaf466gk7yhat1c59gl3l2p6vu9eq4w8kx7iec94q76uqzy47zosilupxrttabh6ii4sz2n0i24mr0urs3ksqtrazq8w4gbpfv7eqw0v359bvtnleezagqk',
                parameterName: '2y7pbbe88ayn899vykox864zi7eaz7o64eixuvw732gwfss2a4aocum1fyqgrusd3t3oa9n4ikcu4meavu8bmd4f02pxkih8ycmyip53vudvxa7qk0mtbuytr5vwh5jb65yw43m414eisc0n89q204oh8lvrtloxn489ml060cdyr5qs6cy38m5yho8yxj1h9ppds9bss1nk72zu2kyb0126fe5aiuig1z6uoomscgl4yvattkdnoofx1wmyugxpx2fo6z7sq4ylpupvso0qttz9hvutbh4kcf7jw2lamfs4jkl4esrrimpxh0mii10o',
                parameterValue: 'zo3cysjmzn6inzjcc7nde0r4in6vio2rbmqs12pyawzhfzjca3vcw1ofmhdprjvoqmjskctfe6dn0vk2ijowwmvndoxkbeyqz86f9w3w193qyyqoa2oc3oz1s04dsc7edtfdkxn8sp1prufdnmcprok73k106ytenmgc4weziraja8hay0zkbe9gu5z908gm94pafp6rwv7dlyfxf0cyudxmg6vvr1avnphixuvtustmnqr7tv4benk0vpm7fxcn941zon0qx4s3bolpxtxjznjwfgx78akaxfa9os61cnwkfhvmr27zxr9ztqmhc573iojfqio7kewu6v8ua6jns2l0nhta741zm291nex7hyntuwt536ej67ug84z81iwikse8u4t2ugneoozmoof5smpo5eukc95w41zmyktjf6aozh8q8b0wc0qhxi1xermdsdzc2d6zjzjabeqq70h2wmklilcn9fncy3xe7nfbagko2bn685eholgh72546jzd7fg2hmjz6a468fbzg841de5rmeykc9n1itox0mvai3wd5nogqps556g9ijdraxyy91i159ebzbyx9mtakt3x3hj5z87boj6rw3n8vzh0sk3gb5xg240x7pzee6toddh6e49gv62xmygtqe5jce3fc6uvibipt150qeoqn9b3oxwfs9x1i5p8jxcqwzqhzmbv2cdl3gx5zwxtqzss1l3hr0m8l4s0lnl68tok68kimog3s8br5mbbfyjlsgv69lkaor27tx7aytztcuk2pxtu7fsw0mm6z6pa6dv60dz1535i4j4e9f3for9qkr4zm7m92xb429xazbkgx9d5r3pb97lltoov77ahk886nddbgxwsx7gaz382geqx4wf6wvwxq96hos2oko4ttbwsiedkznkm1a9hc79ropzt4bqduc7g9o3xzcqxek6hjc7pcgp6wle5uky21oninws049aubuo1b8n1735glf1byjwzitm6y05a5ad9368b2b56xpll',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'v98lq9osy561l37j5zgqv3zh02gbcrmjsmysrofr6aramy02q8',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '6zt079tr4dgj5xgg2n4i',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: '9nvv6hl21ftiwrsztjbe710cpl8x2a6xju5ityy9kzjfyweci1duxt2cqpxigyjumuuydfu2adpwxwt0d418j9cyfxkrbuo1ljbnbimns9qfvbgvrx6qe53h7czilrq42cxakvlrukpg52c868m7j2inqqosd2dx',
                channelComponent: 'uug1b1q9u6lxq4syb6n3igjzjhg89fet53sq7tmhn1iamn2eeg09njntu3urqspwckr7f5wjgzqyw9u8qfiqvdq1b0uwdmmk6vr4eqccp4l3pfkgas3gaccymt39fr1fzk3z6hkhhob7lpqauov1tn53funebjkr',
                channelName: 'bjno61k3lg97p5fvhvyv76umd4qjc4gvc02xuqsa2t3rk67z6pa7diucdv6cq6bvzo1ng0w3juhxrk9a71ck4eui10ojocgq4iaz12s1znlrc84b50uuhpamcbrsoe04on13sqleazmfs6sb5bl3ftmtsdff0epv',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'h7ebyz2992murjcta90s9zapamjpw023f2tugmxp425e8z2gxxqvnwcebf2mxwnsr5lfv43ktyurcsfnvr9oky9vyzxusaso8qlejimdnynu7w6swv7smqzpid51sbwa09jnf9v41vqbfjmub1ryub5tpeutlzo3d',
                flowComponent: 'koyjv3q58e3z05nky9axx7lsn4wzlxngfw5m266ga7s4vtcderl5gfjc611m8nuqngtker9c2lwifhk0q1d0q25dq5abs4r6u4zb38uil3x476jofm2ekrb0fflo0o0rpl2nj9z764gzrt6cjkqwrtxx60fnrexy',
                flowInterfaceName: 't12xvx08bmifzscijsqs13zjfl0e50lz660gonvrirlt1b2fe8vpo1hv0krwwx057o6p9y2374lsy7ed7aktb0daoiyy9i0eo8v8j3yr2zr06jk2jqnjsrimy18d67hle2li9n4a84mgnb68xxz9sncqsixgyppx',
                flowInterfaceNamespace: 'l95csuxah4objyuviahiorx7vchedhc5n1aq8j497nanaommxhwb7lb1hp4dzcmxs6gwfveqzyakiha87b7br1ev97m9o4qus9fqxsn4v18br12hemovg1l4vj9im1lntf3ane9g85dyk5m8tuhzo5m2hccp74zx',
                version: '5ctt7fj51qnnnjwu2vck',
                parameterGroup: 'ikvmeic35tq7n3rfyvlgfbtvmswzntvunjm1jhi161vqbjrw81t5hoqjhnscfehiwbu43eicpdp02wn4bohal9e5itnnm8ueq8e6930749exo6s30947ugek0n26p05pertpk2yvjor22fqp6kglo7cf98qxwi5xdrnoqivqr20zjfzouiogxey3poyp38cq7zj3c6o3j0tcjmke38l76umv6bhumu6zih9x9mo0hcitzhknhmz3qpnepn1ueon',
                name: 'xa2pnexyu8ikwddpcjuosjqmkdpph70xd3nb4rfstnfagt4zxw9hfkhxj7rt0zccmdqvimda5oz1kbi4c3hix4c96ro4vm58vzi5gk7fjenrnhanqjtnbisjdu4gelyi84mbo9lnyexdu5cvxkw5pivdkt4kj43ki73hxgvk5tnosw6l2fu8wdh0siic1nlhlxrhkrz1tin8yrg50isx665ehvnhrdxnzm7451wmxr75fx98tyzwgal7o71b7rhb5ugrxk70il3dp1q19dw5cvp75czuqbatzcgzc099s25mezrns7vzthfgl4y91t8i',
                parameterName: 'plmyi53qiqu4gdhhmat0mt7e1zkqbcsjgey5hd36pwvrdwdqp0lfg5r3j6zro0o3lx3rcg4jul04dwo6gtqt3qn3s77ejxois56xezv9vd2exa08ja3h2i5zz0ue9qu4r0u2pyzwzvqxwnt0qcwdi0hexgowj4pv2qhqo24yyakoetgwiqne4f0dlb1ydk21g84sisfjh5f07e6gg8ucnfdwvb8i8io7wwrtdlr5pfjbk9k6vwdqepe5saae1csqykui4n73xz8hkgz2nji1maod6w9agam6rc00ky9y5dx7y4eosmc5fqyhobzwfmyq',
                parameterValue: 'ej805ajui6oz2mcn1pf3tp4420tcb2qevbm8cep7k0e5ltu3mox22txe612htvnhd4etny1adctcjhwypoc9hnr0rqp10vj2n31p5pdgkbtsz56n9rxn1f1gzuiowah59kmgj1y6j94nernlc9ksvbwax07v391k1s6hor8agacgph3gp22dkovjpa45uwj3oigl6mt5p1k7nc700ha6lxycgia2ekj1e4gsv63pyk4w029bm57aa7cu2emihncrgz6o7bjps8ibjk9hhwdjj3rqmay4hun4bz4q1jzadbs5um9mpt6jzbfj4qoc6k9w5i2ezpkj5tvbg45w2r5o7sh2kiep83bhool0jf4q7e3lb2aokbus5epveglmdkabw1z2pbc3tec4yh70mjpjigmqyvqqusd8zor4049stt7wvny6nls3088h4wxibs0xc0c1rcp6553bz49vslbz2laxt0kxe9kwc0t1jwm0yixstt6vhxtck2osmcje473k5n9m5qsno2off26jdae8kliehn0pgrp022qlz4x8yh8bcjtv2z7tk2uf5746hyaj2uyuoen7gptmhprpchnsno9ga9oqscuj7xvmqf1ar2yr5c6r0sealgshih8t9ol4sh2wnp3h6p6m8sxo5cnrx9u8cgzvl8vzrd93qaqw7ejruq2a8tjin3dwij0iirowweew5wbdkuvdydam4d1kf7vw8hzekv51ryz2xky1x5opq3187qcmmnqyjof5a4bzgeeq8kg0tobggfz34a78hbpqsydwyvt37x6vhgc4qcxukd5idkd7rmb7cs7497mo7knbg2wqak6cyjfkv40g5ouhittm5ep11i0zwwmo69hab1fre0c8o81yj0w3geglfntw9lg1st7f7c2mos97he0bq779m92wq2ey0qhaazmndqinnmhtxulhwsace7q1a6tzpqieqqlyr4joptva29vhmlfxfz07txa8xugw9xorv19um8utrxaa9a15edgz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: '7miucc3phnimx6dzwb24q4h90t1j0b8n75prz7xwfvc44k1i1b',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'zrmon7k8sqivwn48dvfr',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'j37q4yekqw1cbhpo62tm3zsx5puh3p2eewrfqjy3jhzc9yp7e78mrylm7ce3yizo910nf5bnnwg9xng4b5dbfk8a5wngcfwrqgsembw498aywnw61nn5hkf2rm2meeth3hlp0f0bdwbb05mcj04pyaobcg6m4z81',
                channelComponent: 'pddeuplh0npmzpafc2nk09nwwwj3g8xqtuylgmzt9c23evpvp8xb7iyyzv6rroksynya654ed7i6y78mcy1h9sa16xzz45j6h0mi966exd9ezhnyofnmirv8e5w1bqtt6ga7rbwkm5us574dhj5hqi5l9gobeknq',
                channelName: 'a5l6r3tubmgqts15djypi6i7kojtn84gipblcrlydszkb0ryvvbx0kxjf89kvd9fvcok4xk0woiko4catexkxgbttr9hd64iccyd31qf3z6new974zjvxpdcf4ae8gcawp0d51w4lun9twfcw6ln6eppph6lg0s6',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'npwmkatpjh26zaf3nurkxqvw44fccqdedwkc7cu6657cmu16u6z461zvl4sb760y56uruo0eko1ifraw0lfjjja0grr1zyzysxx74yvtsahue667sb5ha8oxhqage8uylukann4ef7ho96hsu0nyh0witxilbuww',
                flowComponent: 'g5mm2i20ouy1y96l3kt7n3wm66rj97if6htkpca00na6vctjggh5tiolb9hme5m0u6jsegc0o1g9hubvtb6eqjtko9zmm5vab9cgf30cj2gwuaml0n46e39abe5w0pxopjeci1d5hl71cnj40v9mvievxbq4azqz3',
                flowInterfaceName: 'hzulbzsjhla775qtsvtl7fdjxg5b1nd1uyz3r6xvqtaottq4phpxskceanuuhrexpm6vmyh2vupjdvcghfbp440ap78ph5uxeu0ro219ttnz99l2iwtg0eif6gddq42qcx50od81xn21g97wkvigvce4zk2joovu',
                flowInterfaceNamespace: 'p7gkuyv2er3i880ybqgdx8gakvjiqscrozjdkpt6adi6an0q6aye3fosknawbduupg1doqujquegdjfciou2m6g5rvj6hw9cakawpcyk0oj7na5w4fhrnlqk6h8isjgkg7hchcbcfaaqyak8sfuppc0dcuu542w7',
                version: 'x7qdbo5ng2va4q9mtgv6',
                parameterGroup: '4zusvxe13rhjw5dmhwgf1x2mayzsjtyapa5fsa4uu0yl1iiodljlaoy446hmocbu9c6j6z2ma2fur9olgi3e0xfqb0tda6rf88nstcu0i5vkbba4rzmr8aci98tglhqi0eyb3zabwbr7v4ij73gkqpp6epy2nl9o8yepny4th6pr8p4k6a6u0ryhbuhgm25wxlxbkq1o1741fjgnsebm5mxxrfpdyvcu6zqc9oh43tudo60c86qrfe7xfpbt8h2',
                name: '30sh0kqm357iu9u49lfd70shzxa4mk77yh2f2k4ttrir2v9k3w2rii6g0w858bbvhvra2xapsh4pnr9od1lmnvb5zku9b1vs478xff1p5wf4yqwpzs8zob976o1z7k6n5x4lqm6yynlkq9pxq4ul6srk3t45as0h6c5ew24ptosykrtaioicduwvi14ggiloxoioco993282yhe58wqtydsl11vt3b6e5lkr6um14vi5xhh0xhehhzpjfbp51l4kwa5najxlwdhc1a9cgn3wcuidf8mt6vypm5f97hajd4iz6pw1rrr860vxwpterwe3',
                parameterName: 'qodszbdlrhdx5sauo9mjazhyc512yczq0d9t79x080octynmxv6ycksw96avihj6yd8any0s2qtymm1z4p4of18d283nhw8tp56xs3hl4sca1gsqnidvrcyc06x3h98pjfdea8ozp815rg7osyad9774rekuppy6umf9h9agja3wohbc09l0stl1cr171n9e5lh2ukvu5m5udxuhpp4gi163exkb1py8kj9m325hh546d037fjhev05tbg90czx34qhj3ktktsk7b9i4ab3jvb36baa6cx5en5fzlh0iomhxg4u64hjtks0owr9iljd5',
                parameterValue: 'q7o6obe7b4oi74rfiwvsfrw279msxcga1yrsdhy7dkhl97f9h3bppn8gqwz7wuhu226q4p6k858txtqt79aup7bbwkn9ibvm3fv5r28awa8riftqicge1j0hwkjqsurj7dxe7gxy9q3jn050cc1ka2tqvsef5sgvjhq8icmzpi0bugle4vpk65iw703y6q9aj1wwsp3ihkcf5y9nbn86zeoi3nzj1dur5q33qhn6vzyhs8u541bwzxvkwpgbeg4dygr4w7shi09i0n5rn693mnk21n224m88prw4htlelu46pjgxozwx781808q7f7neku55l1wxipns2c0ogvmf416pf73il9rrq5rqkazm9w8ka1men9havg1n744qqoqluz4vrm6joo8uyicx6fezdfrvu35z5r1fdl1taums9vn9y7y8q0fc456wlbnddnb4ptsxtwea6eyy8bh4n988o8mvfqgtzay61eqw9c4umcz4x9i7b726ekb6cbm7fdl18cooeitvsl79n9nzka33lczj4h3kczsia3my95zgd6g7n6tz236t69x947duuu7g0nxswh1k481kjjwym4ji1pa9fawlthwylz8q17huihopofl3l63pzvg0qthenv86muaip2zet8dv6ni5pvhr2fjlr0mwlpfxwz9r0oz0btxjvpe0mrd3kx5sana14wa2t60obzr2mwe7pc5e1ju0xn9930uyrwmiggjck240wignflmxbc0cej8hmdojf2qinwq3ibimlbxl235dy6xfx24zl8omslnwjxjs2uz8lrxtpecr7lpzjnt5sl2zmtdbfl0blcp56k2dfuesp24wzj7k9gvjzqsgk1hoggstub2ap3mgc5py9xefstfz9spe8yvucrsgz20a8svldpbtos4op5rw08edlyjq95lrsa1s93xb10qpr2aj7x95hvgyfioafhvd31ljicxxxa0rq0efkl69bqk7994go8mgi0fevdpj49eao5ck0ashzwi6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'e3buy45lkb7xecbxl8ulqsftvkgh4v2xsrwcjifskog4q9dr85',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'k8b4m16tf1xb0xna3gn7',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: '921ehk22myriyp6lb6j5vw9b7nzr9xg00afkj302xq39ppv28dlpwqzaw3ln2rsoxc7oa8uzvcffkhvqwilsa6ky183zvmr1qxh4udm6wcbtkmg0wz11e6o7u28z6diyy98qenjl5vk45rp0nvos3j8uomaewwhn',
                channelComponent: '34xgoe7fua0kgro2krp6v6c2hx20g7eoavcn9sxnufbnils0j2n8e9qderdf02fe5oq1fa2dvdr0co35lwljhakhwtsn3kaafm25lsnwiuzd1h21a5d9gfna28pbchy9st6j6uwtipifvicsfocr63wrtm54qxd3',
                channelName: 'hh5d7hder07mxn72oony8uxh81hksxhadvvpyxob15dsr9y60werzzma92pgvt5603vis4xcr2pw58tsj9xz4jw4grl9kg0wow6fa54sjd83tkav2xctbeyd5gqnc6ayy1ry34hqbyhbza2asl1qbp6lqopxcl0e',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'c2d9fse6rjbihwd0ie8ry9q1ogsdqty508f4l1fdrxsh0y99qxpcdr3m79b1qcb15mqbcp005qg683yelbodxfrm6wl0p58f62hp7toch8871lgvgqung6rn22x0uz9cfcv8qmz5z2j56o9act3lwf0r3lwzrilq',
                flowComponent: '1swaujwn2rct1tc38osnqquuj1037ujwwjnc3fu3141b0e6c0s1fjterm2780f43psotr7bcq4fbp6k94j5ygxuy78173zvhyupabzb7835626vzderdevm336ah735ks7fowmoi7oxz23n9j62lgluxc52pz4v0',
                flowInterfaceName: 'a2ql4nxez0v2rciib7snnbn6lacx2atqcqjvhewy012w91k8xi5v0miirde1zc0ui5atemyneqpru8j41zcdfocg269p9zh661p8xa615izosyssfsythwfj30rdh8skn0pp5d8bt7mxzik94bd6qcx371dra9ac6',
                flowInterfaceNamespace: '2z8qshnnxrq0pjfox6qb3gvmbaarw58zwvnbuvw6ia7v1015zdusnxi7vuj41goh89ci15u4iwy20fa1xxadmi4d68pmjroa2i9ieebdlttodgr5p6ukasmsrzff5pe3wz8nstn13a5wsf0atgiolp3uo4vqhn9q',
                version: '63wp702yxb3278ma9mkg',
                parameterGroup: 'xeho66orh3chw7nqof6y3lma78r6x6m220i2pzu5jym1i35629zqmkgasr372vc7umiu06x0y7kslbofa2ve0r5lohnhfsh4n6jbcou5veridq9lt88x3xrjx5y6ypttilmaub8m1k1vx79ui0o58jjun4ty3knfxvhxfatql15fy2yuqw16sor8ahvjykb2w4k5mvms5peodogu81lh7lvepg3wofmg6ma7qgxxmc07rzu5xyv2iphc13xqyxn',
                name: 'eimgiuxf86y5qonxla2unox84ewtz5kh1tgwuqctxxexnjf6xyiozh70oz7wikc0nocnjdumyqwaoyyku5gw5i9dq7q9u4pg6xo9tepqw40fnxghivb684c87rutgxhlgmc9v1eliar8qsbbq64tw3xygl0obx69klyivde640hbetcqg1mb9udzbl7blv1weujuclq36kwpc6ek2220b82r2cdfvg0xwemrn35dkdbrs6c4ol43qga7xxhrpka2czjjtyx7sc376f7uxm3629mukb3h824fqwz03sl1blojn1oq7osp2u75qiqzwk74',
                parameterName: 'd2vo6ffkikbndqcoywlnugb06hgt65xn53lt1yjzkddbtj35hod5z8j1by6wcwjxl7pu1evv6cba17hkdvddg96f5n2l4vib60kvmhbszv82ot3qg4ul0gbgk6k2v7ou1ebeusgfums8xaku9vetpskd8snaya3xaxghq7yxhve08zwh259ab3y1vx8cf8gpxr98gvpvv8kglmhd8otx9tbalithlbk0xsckei87scbiykhrf2sa7cmzfemc498ig72tkqd3390dms7ewx8q9uzr1pvxrzj8y0c9q8p2t7gr7kce303zrbg0kom370i7',
                parameterValue: 'z5kd31t50iidbazajoo97y63zgotmkri93ij4b6bkr69cl1lnu1shi6ibuukxbgzr4wo3p4e8ug2dd78hdjptgdd46f5659dr8q3thnjvbwtrb43x52ecucdxnujprybofcpp16tyr8c7i519kf4dsu6sxii94a6pimytyxhoxhs2eusuh81oa0j8hsxw90r7eaqd101ijb8e2a3np0haaxeug7d2cxl3c4z0nj1v789vltsl84uh0wfqklnjqvat9gi92p36dm5fbk4vyaqb52re060nsi1pyth6dny3f5p72ahx3rrdagmxunvy42ov4ykafybqcj49q2q3we0exc9gvm17eb2i3q9qdemn9mjklawpsg9lbnaw1q40h7ai7muc23mn092v7gsy6kq5bx16ve36u5gdgm8qg6n0n1220zwzu5x2jl1sium0dm5wzvyag4sj2i1cuaigu7fxfp8ige32o4li12bvvihz48s9gzo2u4qujcr5z0ptybcujhov2c1ofixs5juhr2qa9jn3rinh6wz4bg2okvki67yyshvpwtofooubz3d4fatxoc7fv5c60rhs6ylz2iszevj99e7r19tjrdneipiguil0ysu8dyze4zkdqjz6fic6i2i0ibx18mjjyzjrfdzuzkhin2yy2ym0z6ga4tuxumyj2mt98z6574graxznsqu2isrdw8171ygvgk65jm7g7ahdywk616607e2m0f9cvlhuaw3za2bowbb02mpad840cgtdgmj17rgq5wu7sglvip5hvxeejga7rqobnamcki2hwz02sccpoj73rzcm7kyjmpnxmrjgptv4qcaq50f4bczwknv8od7qjms67abv5c7bbjw8xcc8j02u0dx0nf2modutnrjf2avhmz4bzauzvxs79h6gwx2j6ru6l2y7p83l3ayjat8lyl4ke1jbnm9zii73qyzwp1r4axhxkzgcci1jfdi6bdcmwxvsgkb5v6ivaoh9f8qe1cmwnvocje8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'jnt6glqir8uqr9ch6f3wt41l46xzjj3mee11xaex3cdfg64lp8',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'deqzvda86rv5kkgdpt5m',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'to2qc36j8trydgr4mlmkoppgkvzznjpy8i4euokrltjyspc3i49mqkq4ed0kp9dd6sfhrzopxeju14l4rmz2uvp7qfvd9fomqrfft2vlw7dpk97f1if8271f8kzk1prxxy0qkbozilgsbwnwj5nieui7v9l1hsl4',
                channelComponent: 'uid9y7dxmdpihcsq9s9ytdtvo429cbesfo02ggdv81v3ssvlf1mlyf4mho4tk7tzbkmrkyil0gqsylir89gh6zism199wr18q6n8wjf2s5f2gpnxak2ubn8d29g8wgiycrkswtgi7e2izalngj9nu43cilifhaer',
                channelName: 'pn5krpztpb4tyr0yex1ospmwvoriubmsoiygngtg9yv8hm4w6hfl6yvk3zwndbbow44ggm3d75feh5eeqw5rfb7gq3nvvsp2enpthdu84pv5vm7ygh5ga4whc4ojekx63ezxacp3svl3ije2a9vyhiiddw5t5xpt',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'bswbdd5i28xa2u8zj7l4qhnlk43k3sl5zxlo72pwewf3dxzeivktzktb3ekwfg9onwh5kwrlby6zharal5hmkcb3efvnujm5up0mnmos2azc291zx9hnx947v16bs0z0j1fr2yywbd2ccfh82jrz69auyscnt3ne',
                flowComponent: '1d313iz8dmve3vudy04xivnefhcd8ubmhdl8rmfm9n03jenpnlcxxbbhqdu9e6mkv3bbpdzs9z9jhx5fiqnn7tp3w0ykw8cgetaq4yaej8dz42ny2pqfke7lnix47zer57dq5fr2cpru43y9x71cwmeju7p9uvt4',
                flowInterfaceName: 'cv4p8q1jr1wl5zithp1bcw4gfiu9kry11b9fn58540514eq28rl51xmr4xfo13ti01dira5jrh0o82hyoql6ccihoros4kkq4663azcc9759wsjsh7a9tw4q8zhwz6uw9lzfw6443v2qx3gdtag5hdkg24n6aqmr',
                flowInterfaceNamespace: 'z9w5zfki04b6qs64ugc898vc11ly13df8ueseb4u0mgipi0jvt06wccklay0tm5t0hj3adrjlj7mc63p62o3g624qcuaardivfaajnxh1mibatar204kgrbtdmfxf1x7j9xioowaagk44e3158vns77npr5ydqtvo',
                version: '7inn1ohreulyqjmeux8a',
                parameterGroup: 's4sxrttimskb619wnv9j7j6pc6hucrcxe43cque6seesfhfsvuzhryb3f1sjkao97zxzky6p8wnd87lp16ydb95xacoxzdmmrjxtxkxaxbobzn8dtxiasv72sbg0lpzpz51252qaham952lhtsxhsgcp9a9ljqc4g8hkmdltkd82mhb7jlqby975q9op37cfk35nose4fdenapfp86bpo75gscpfw4689pr3hs9h02ki3e5ncmw3k1wwfl5h79u',
                name: 'im977ufyelcpou7t8nl1ygxh7dtla4apixrmmdy61b16o6j35qxcwyc3tcj0arzxzccpuqa9grak08brm7p81qfjr634eupch68f51qpjwe7dukw8yamrfpb4z7bljyxfu1squxeotz93gfovr9lc81zi7mc9pcnxdzv2bgv28ow4aro0ke6m7qrxcaa4x58x4f5ve331usl6k1zy7tfxdpvzs407fu08kgqq3l0w3bfaxbc4vmsmaas1p09kjoagrce6l7dp68tw536mwshc8344u0sks1yrbmlrxxxqy3w423tpomz1qz0xzqs7ycf',
                parameterName: 'e0e0vvi946cnp1sz0d3n4dnbg4f3j73yscy9u2q09doq0vffvamenuahv8mvwfysiqu6993xzor2kagzvc9q8yx0tughi8zyz44bcjimhct7ztfwiy2rw4qcxkxayzbf2cz0ggrdhixghwty0umtffpa7ummu72g543vsnwosyez4rc5zvcc3s6hjqffoggpxzow9e6je2i7gz40ettrc5ve3epejkx85ute2zjzkk0ty9tcpfsmdvll3g1tgl9vbqabyywa8ai0ne5dzhco1fkp8wa6cwgx8o9mgd9qfan1xozifajiuxr9egzt14w2',
                parameterValue: 'wpjqgqaly3n9no9myh32qjuu9ryna130hn5uenf1t8p6796j81isl3gnvdq6ktydauze2v6nojlzrky3os7udey49xdim7x4t4cb9q0ii7fj36i53eubj0k79qi8ejjah9befjw0s4nskgtsvxxfwzbzicrpdg5ug745ke4l9u2532zfq0ntplmrync6v2ujya45sl0slfg3fdso8o86xbcvbtwdksgqkgfeiqcbp58e6r3ij4g0026xfjk273e6ff7i6y8io3gg02b84r3368a29yu26h9t6uh35xm04d7saktc4yqaau2t0exxj1twefejjhnpagvabynkz65e68uzkhiag1u3mwxc6knoe90syr0nwk4nhheyfjqiyvngu55ybpgp0i4j3ea8mvam45oafgygt27thr49tc503kq7lvrkxk8wsoeus5ys3td2gjniw53zmtad1ebhyl2zc2bttmu4cayo6lo81bm8j3276lldkqb2r2klaz944hj7ga8imisx1qkyb790ydzc0m9zewaiivrzt1mq36yarcht2jwq5iskm4yldrhjlpent17z4qjopl5yuj8shq1vzbqtguqbqdzg7zxywra7ye81r56z6n4md4tsnqufi8ddq37n0qpn5rudfrsg5mawl18dzdx7jlt85gf401rkfl2w29ts2y6ldnf8na7exd2azvy86q3xjataojsmfvs0fapktwxl0wa9np0yvjpj5d170zqs6zxs8jc3zxn58o2shq7yio2uk51o42eh2rnzn5g2m7x251amormunprkgo6ue6zo7kbyossrxor4brcn7ujlzwhxnrgzhco9089qxwbdwfqog6j6g02o90nyso70su96x78iqf1576je9sxhnkjdiekn3zssto3nhewuztwcmr76oaw6halo0ac5igkuciqfem8twu0nin02ikii1uwni9hh4m427b0xnnsvw8kfos6b81z9ogew62l6lyvf2uwfh15z0pgntsx93moo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'q5w1mza3omtqgo5yp35an6wrti9khsc17u5et91lvlbmld3xku',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '46dd746po6bbxs4n85mh',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'xdwtzmr50rxausl05w9pxdvh2l4xrwtcit2zw4g79szy4yutsnvdeja3c0zkzfg4hv6ldwfo1unwb4wa3lrun0lcygzkhyvm6hb8o2u31zbubiuer4sblv6rixtt2lzvs26wk0fg4wst2jb5srsmwhbwcwj5nyj2',
                channelComponent: 'ika43n3l3bozv84tmx19w94j4jm6prx78dlvyt39868lak9aecr9b8rx2u2uh4rha55106ei043l55237e0trm0oukah0gh3l8rxijfslvlkrhgjny1pqo5tzbrf2nhytdkynej7kh3clncbn2gc7ihf51uftjcc',
                channelName: 'e6sovqwnv79848km3vnt04a886a4nhux9nwzvxpxuq6lu14up7twfi0uhudf7pij8qmi6gv7dzt2x7yg9trjjzm246xnj3ayaldgvumxfocfcqoc9fesn5m8spwi2jad2674nc7ru4xm40jwxzo273x7pauoh2gd',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: '7l5ewequmwph09qg4zddu3y2gyfpnwvdw7x2ypfizpb90qj0cv2qv0vlyu2bs88ss6ixgq0im4yzd8aci1v4jv5ay3bl8w73n5k0hle95i5hxjqc7wp088xlms0ga4553n93fpz70ylvxjez38w1vl8uqgf153ah',
                flowComponent: 'jezijcis3mulybcricbr7cbtvjiro7pczryhcavpyov74ykr5rkbjrb1m0t5zhfd3w5td4rs1gkaxd5kl5qgbqbhpe16s38ezabz58mncusz8409jvdxee6djgy5w6doobsnvqp2iriulsl3x4ruy0xsyii2k9oh',
                flowInterfaceName: 'dg37z3uegvo83plogc3d6olj7bauo6bpyknyv59ptjfz11bx0ivmf8qtf2kfe12iep8islbeve027uwme9oh5h7968s2n9zutmv11zqrywdimht9mhz4k85iulapuyggh5aw7kekop9h1y112gp6vwgucb7tumx8',
                flowInterfaceNamespace: 'yog6n00e5s31lopihsgmpvjohds0a31oou8cvxv241u6ufm4yz7y7ckzgfsfpgb60bvpddo4os7ruq4ixuq3vgoksrso82b1mqxw8bs5pvmf58wr3ouw5a6nh9ghlqpdgzgjcfb99g6xb0o6l0b4u0yiaq996ebp',
                version: '982k7hdo2rc9kcnjux1kh',
                parameterGroup: '4fjkjadyjs1bnk1httjgyx384s44ivgjgt87h0pf0pf7dr6kwaloi9i441jsno88zwxwu7dr3j368i8smtxsrr6z7a6qeqifnf6hxyv9zohf16v6cwsc270d7ng5m7un1rt1iqh8a86m64bk9sh0vvqqv9fherfsy5fpoe4kp3q6hgttffz3pdskf7vs64tjcjtb88ujdyhjacdlcgq371sm2x5wucnvhn41l2ml6hfwn6li3f5bwws01mt618c',
                name: 'xrlksq26i6zatfiqukfdmoruo85jplfxh8aql3le5ucza6h5afvmuiejnpajbcmgb0urssml9c97zk2gqwtrhuonc5qckuzd4f89p9qql5c8vujyospo7t88w4jyj4d6qmmzacqzbs8mz1rsrv95x81vp4ukju2y04eqq14e63gc1psbmi6709m6vu6g1g5mmritfms2eryo6d3yr4fb8wkn6qzrusyxrlv7yf5admmaj5arcjudlfdtntfykxr96tlk075z57ipxdztkqk6lsx7r8sh1272bhsoxhj6rva9lsio9m36estrymxqnrva',
                parameterName: 'ocve9q1huncsxy7yl2kjcwpkohjsir3dzgnpvildr8arwt2rtn2hi3aifpbqsbgzr0xghumxzr2zbqk8rtf15thc3j51z88onzj4p7wq2efmkalzi5xvibucgb63bz166re83s5ocs6i62ht8kgrtf6pypu41ltpwijqaietcufahw3hcxnlkuc7f9lblqt3lo6m3edmxotqn05xpp1gti2i2h4zk3xder4kox7065yc8ntvjl9jy1ml3wvt52pz1tznbsh0yd02iw7q240iafoakmmiyrzru5g5xmhhb53vw2yc6zigaqtag20asxk8',
                parameterValue: 'oel86eol0eanpwz4f23alnbv02xxu1i14sj2trf0reprjohzghgoa9lesr6mwzrpde0fntqwh732jh781czlhx7zpqdb7jpv94jwu7nvl5up9qkauvfaecox2zeqygm2887h5iudd0vo0gbzipe6s7tfqo0xuz03cjwyefznlahc20c8m7z545j3vlob2dirvaksoqt2719konph9xd8tufzuhty08k09oy31t6iivuccy1dtbxduacxszmvaitdj5oet93ong74dvugpey9cygu1zkhlxoyfmfkpcth7mxzq2kr5kk4ld06xlfjx7tycmdlnoykacpks737z10bl37uaekq0thncb65nig5t4sawf6um8y6e3eh04g8p27fciax76ayg8iojt1vwy8zhavv363924qdg1ztx0xy5uqyavx617n4x2q1h7cmeiu4fzgcfwnv282dw74y4v6loxx0da2y9pkcpuxrzrn6rsrtsw8fmlj9tdtnnkv66g1bkdok5hemmn6xgky994v88eo16xmnmkrqgvgohkr2rhshvr2xi444y4q0v5s28kyot3s72oediifuohe4ho4t1yhkwvxsx8n8u9idgercvo90gmp3cn5627j9tq51lp5a3nusd3hcd6kd2u8xtu00xg1i8lughofmyyu4iszsr2hslfays6v4ibt7ylug1ma5fs6ze8xmef2rm166g11v0puv46fht1ko4qha2xuw3bjwuor9h8spn2y9hrwvj0zjbmf0qq1gn2qm9k8u1sb6xwlzkc258ob2iq2wzd9kgfp3jcisqgml42iq7dkgif1fxakwdqmvvjcq2rklzen14ova3q31smavtwayj2h0i1mwcecl3cilodhtnq6g4888ldcxxi7i67wtbgk6fxy0h58y3vxt1equwxk487jzcu5rmv8hp84wsyhrdgmtwyd6ovirb8rjszzpozxxxa2o65pl85f9wk7cr7ustg09k6rwrodq1xp9dy7jv07og5de',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'nwyso9iuzdu7kmmfl5o1pfnkgbis1halqxdig9t12zkv8xfwnf',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'rx44b4kued376ndtu7wa',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'yc0absrglct6atl4ol4818d13lyzm2soxb9fy4fhrq3k5hzzzoh5i1dm8wqn8ws7arpxjfd34d8kgevevwnscpcj1oqkyvki99l5rxntxz2p580766qvuav07g5mxh7qh7mkzlash45wrrcxtgd2e1j1yf6uwnm7',
                channelComponent: 'ase32xb6lscbqic8mfb2bos68upilgtlkbfjslanw8c77oq2a8iqq4j0dtum7f25xavwg9nqtbtxx7fumeisy0aktfuaxoyj0wquyewq4lyki0eops2gd3mziwtmsv8lszvnzu0rxoh6v7evu76aywjzesuvhwm7',
                channelName: 'tqnd564312te1hbumenvqtd32ebkg0084zehpiyllsybqbzmrzsgpukybmpi7gkzruam2jdkilyqjc8oyppdt2x106uwbi65m3iuxrtymh0t2866cheg5eax13acoty2inv47p75peb91nx570smy06wu9s7ptov',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'n10zke0m0kez5osh9k071ho3z2ik4ht6s254id7v3uj0mkxkz1itu4dsqmbz5rehkf8tehzqwm0lq9r9azrcuc4gssrssfjwnlogwnogt44zd75i2nyls3euy9flme8dncywj7wju85p02scwixtqcj6p48pt8zk',
                flowComponent: '7w09y8pn7cteo4087zb240e9472z3uyt02hdeqfe1y88nth3jj7tmu199sdc9519v7nl6e7z6xym2wtrgl7xo7362nomvxhgvk62b2ko4b769vl79ehnbiiu07a7hh8f80nu1rfsbzt51gddp1cttzyca9b6s7tg',
                flowInterfaceName: 'kewfij0j8e09ragf88ir9apshjkoj6dor68yhtoz9a2kgnx40xlbndubdggdbeawojbsbnxtz86anupyvzq8wnzfmgxhvn803pdlgkeo19t0gzz3e1dza8lp5ufsfi9hgvdhmo8bt26ntn1j9r8hyqhm8fjjk9v3',
                flowInterfaceNamespace: 'py0a11for1mv5fq57vxe0hcdye5b8b5hqvpagv4z3tonwpd8ngk0hmrtjds461s888ilpkhneg4jfwjwnh8qvf1fxxpomd19c4185jpvix2pmabznqp5blk9lf69diu3qqzz32qo3v1m5riiw8yf3absmwirkeyt',
                version: 'zhf4cyjwq49l61v0b9et',
                parameterGroup: '8ba4oh9mupf1bemy2e2ckdo5btnywrpwq866elduqr2wgcvdkbnaesf99nvqh36z3c7htlstxz6i4c9uvq8jrgqu8aketgge3k8f8eg2dkjfti9ty11ywm9uobf1kj8fu1ag7nvbnj4v85l585p7i0zoqgrbhcgffr0tbgjtfmmmwgbh4m5wqgq70nghbl1v0ezf6ozsz8j3tgoax8j4vqc6tvbslixqmrel8gb4k33ypygro970dryu02y2c7y5',
                name: 'kelpf7tc2zm5ytzsfp3kkynklyeeg8jpf8u0sl5sdgikpdfy17q2j4crsr7fqr5q7c124nnlwx1z8ehes34rfdraami8tpxb8haua8lf06s2rdcuxj2hvtcevmtztulf6vltdrxgglg935fkcm6ofcyka42jw188i1kuz1uuti43cvwpzsp5fzds49umsbmizju8eewoajywag0cevl8yx55e4snhxwuust4fdcafvlja18h6t9lwyn40ntrk9bz5ljnw32pzpftyjv3itsraek8o7xkh5nuafab8270ybeuoee2m0dvgotz0wxj252k',
                parameterName: 'q64digw834dsrvcdfe2qjg54wc0k2hkgpbfqsjtdgsa6vfgadsh3b7idkwr97la9mgu17y9luei8rmusd4cynbvbweqi2q8g3aakdihadw16rez91ntiar4ka858ei4dak1bgghx2dq6i2ohl85wa2yx0zzhz3t476735rh006hcq30ce1nfzatv6owe9a4ofndcpp3y8jxb61x6vk20dxf28m27ua325sibb4gfh9fe69t0r0xftp0v4uuecn2ymbgnwp8egcu6e7r0fpocmf8qaacy6zay4zepj491wl1q9yof1lh60cessu35fvi7',
                parameterValue: 'zro31kct79tzv7npevrvb5phmaras7yebfxtupvj73tfpuq6kkv7qyljy12xfk9eovywzbgdkxdvp1306jth328tnkdh8kur4js6yeo0qi3gtdpt9os4hk0mhfjvl8a2iubh96iy8yqjicdw8dl8fq8d2rp2psd38itl2f1jmex2z033eph0oz78mpaplgwiy6ib9uqr8wxhbk7pzhpplntgtpd7p1en68brmloooaqfa3paxqi7d8goe3dfd1i1wtbr22kgd4zst6fjxl60qo34ulbeazxv04albavlv0avwaxjd23g37ysqr1wz2w6ynhke91s44n51atghh84nriilulwdy1y8be7g72cn0oknxuoe39zr1e27lf595kgl5ie5t7w94pmvfctvammgx9c0mhebca9xypgvv2rgcd8veyz6xpt8bn9majksfatao3ruavgxl1j5dx8gxi0yuq8j8ewdnhflqsddj10lgwtnlmxa5qpqr3zn8tbtfxcduyrdt9dy1amgucd9y8tutdgcwz37e044g47aoymaj3gnui1qxcax9i1p4dw7r0yzz5sqfgu2lqhkntmezic78lsmcdlzvza8629uesya94fd3mmwmsf7q0et0n1i2sle1yvmq7kk8xvfyfahgn0r1vv94y7m7egdkr93vduzfr8uyt5axl6cpwii260g1zjnjb0nf5mmsztreo0nsys7omwvip7qvf9v2imyvsyf1wfw5bkam5f49jzwaytfdpgp2r2lkfyj2li59uvu6kqib35900b7vzuunylk032qky5ebnks64gln8r431d44p9a1r43mtlltd5ucrp61ocfkdg0vg4ts6opeq2ihsgk9lqkaws0og41xrrnhyt7fpooq9hpx5gdhjqoh3obln4xcplhblschsou6cklbqz5bsw2625ptjdzpgskmwcak9yy7flwxel7tndjcigbsmj3i7k87hr3k5im4ie80cve2s5m8ob104rwonzjr38ggvx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'cge96y3u67z9sdddxie8u66by6rodw9xkc4actjpfs7avtb8lt',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '20dz86skb61uu656e128',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'zptbotxczz2smuft7ecz561qb2w5cjx6lz395zay5brfq1v0i60zq4pqwmdo7vqggx58ruvw3s5156f4tzmj2cmwsg2c8luf0f03rsagz8t0gjacbcfgupn1ygjl5pgmftze0z4guc15vp450fbtzll60ih00qwc',
                channelComponent: '98nih4rw58yds6wg6e7anqz6mvabsi67gur8xecg7lojkn571rw1v1h9zsxq393me4af8wt03njvintp9h5g53i48en1ils1cafsqezbqf86kpmbsincuhfgkikfmfuzqh339jic4v465z7rc97r36vxm7robeu9',
                channelName: 'nl30qx9qzfjbqpkxibskugw58sjooleu7coaeuhrywh4zffo2zhy98uh9wnesmwt9ryh45hfhkauqzk2bd8oxriigde3av2icmayhrly5cunzmkitrxkhh0v4xtxquicm3nszi9g9ps3oapbbrjbogm1wxo7rlh9',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'eli9j5havlflqr9z59xqrcni5wx16cs95pr7zomijkmh8gxql5j7sau3c2gw7pi39gtuuz69qm1gp2jv0vagr5ulehy45yk73qziox81v8fvkrcjunlebwnn07wklejp9u1bcq5ih9rlbuvngfop51kbekwcdxrn',
                flowComponent: '53gzsjxltbjsfuf8x0pzd97twl9bbac41yqemxutvn6ediie7hlv0tmo00eb5dvrrixnan07i0o2dvl3cq8427oyzjvh9ximg3lcixx5c5t197j9pq4ukp2ytu55zuviphw1it5p8bdyy9ghelfz380v6n0kvtu3',
                flowInterfaceName: 'srte9m9m328qy7mv1v7rqzjntrkb51o4wow5n9vk2ryo6wt02twsm5x6x056411ijko5swodifxmz7r4oawt43cbavyw3okmu91ykdvmdeem6ng14infzr632sta1k9vrycdh8ggxieb65apklp7ofa9k9hfrx2u',
                flowInterfaceNamespace: 'b8nwem4t05y14m7d60kmg8tcqq8bwaog7i17itv4ce62k4xzz6yn17c0fkh5dgzvicfif6gxj56xpq9rata0urvwb07cswjuhvgrs8gltsja0akdyncrh74khvxdvxh64o7325txe0fpp3vrf935v470mu87jl9f',
                version: 'r44nbaaf623vsr2uqim5',
                parameterGroup: '1v9uy1ybv67c2eiyf0b3fl96bf9s5bmjn80jc6rqeo2in9s3qm996n2sxkd314qf00jp05635b6vlbz7rln15ars4tmhslfn4u94gro1w96df5npbdynerrdjlsi8n6tewkxivoksxoogg5mbgx24a31wuoylhhz85hpdq10uj37zkizy5d2rpykcu858m50ch86sdhoasd9aq8lbmqdlgl47xy6hgopg5n85x6gqo4gch4nawjahudyr5hya4m',
                name: 'tkl04cnt8u5b82v0ht4p1q5gx16bqegfytj5vwor1uwz7k5b3r2poqm6dutezvbgr2r8d6m7yktudnghtcmvq5lrnm849hxpr8fd0npscavh49pea4fhupn6lnz3rewoa1wp2e5ltal1sxx1rttjipps4l4q4dwbybqqxnzmsbhzx6j81u82b5ux0dhe8q30sid189xb18odiypz8owuiqy8gre4wxjmddbkpx55euefdk1erhmu9parxhicd2n2k1w3pdp4c4257zimmfwp1givo3375474gdmf202ysk49dcw7gl2fx6iov71o9bd1o',
                parameterName: 'lr6hdhguv06ewhn26qi62utg7vzyg1kawz62g9y1od0yvg6zy4hpv5renfrgldxz9oo00pknxhr75w4wrmxa6c4i5achk9kx8ey8jbww9gkoiokf4j2luyxlh7g1ndyridxyt6hlnjizd0xpfq8iogwobhzjniqu1szz2mawum7i35p87ol18ppkc6ubzocxs3d7zu3hqxm2ngk2mj7swsl4ohqhnzl949yrukj07bezame194xtaxg0if53q7k1uy66t3xdapgh1y71odtz959u3wyztm59cmx1erz8517503ewfkregfsmzyxf6030',
                parameterValue: 'y552iuzx4hngnksmi0eptagr12e0ifbvd4cf6o1fjoonxd2nvypyfic1ud25bx2w782qr6ut1dh4r84se13gqwgmrm9o01rv2e43ew668paik6eaqcycz4wcvt8yzq3u7y8b4x8qwisqu0m58c6oluo7y81u8kywbv3r86uvp3lzxksp6ymmjepvgyuxlcpufrretbrj06qpsvw23taofc8bubywonlbrb8abt8wzgdfgjw5zchhxlqkly4bz7yyr01spmoh052pb0g18n77dvt9jfgtlgjvk364l5kd8nfti14ydjt1e0eta0dal0a8pzz1dwd32wrw0o0yd5lhuyi9m2ce0ffnndb8r1rgetcdnvhb0uzrfokugsda7lt71tdfpz0eu95qmcbh71uwpsz3p6rnt0eyj6sedoaoc8ysnlx6kta1pe7szzeucei11y6qqu9pcehjctlla7itujfnqqx8b9ue198x3bk0gr0i5ck42efuujszcbk1bnroy7gzf413ehcxasy95m8kpdkfkxrc1cbpqj68yaeabvejhq548wexapgjpdjvgc1zzd0wwu0r61bl3p6lnfn940g5g0frs4nc8z6kjc7m3oif7pjefm9lq1svwcn6ip0o1e16s7b0j7lgxnq0afzxd7hr6eoga8ik2f3hamkopa7nn9qidejmm223snyk8bp79mqs9s56drvw2ot7pfw8nbb4qq5u697iaaiidb7rd2apsdxglqrs6h391fy600q9v8245z0hl8l7qk4i02r7x5s0wz5hh88lp2jomi0dsvolob22kovse3cr39ymy4y9si0tumcdo8tma2vo9tn5nnb288ptmlvjqm4da1fe8t8ey9ypeom6kiaupocdgcu6lch7syyqi445u95d10senr2fbzei1vmgjfncxut724rr8kiyrrki7fovfkz0bzhsqksk065qrp74dj0om4bj5znwjatsejqetyxyn9k9xfzy5ma6ovsa1dn3w4fmk1d2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'n68nzug1gnskfza9xpifb332ixpnjm5ok4c8mnu7f0igh47xol',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '513n80mz267mq1y47tle',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'jts0txj2ynnlp9h9xi4jldjivx6ib3ip7dq1tpuv822e5smk9fbmh8lw1wyr7teecre7ha46eqsqyonzo44uwv4ezoj0bafwvyiaie91op5nuismkx40k0xlofekm0lblzrssdfb4anpp0ybw7t6ydl24pyr8fxo',
                channelComponent: '3auipifiah4pfm1y3mt14s73om0ndsvzu5zupffzbh9mu7p0qg10rg35v1p6u6lcwn1a0s7dx17kg2iudcxfkgtl3tlzgmdm79125vj6fk46oui9s0sexh1pefz0pt4tpk0bg9pa70triwkxrng3u1hiefw99t7f',
                channelName: 'szvcnwjyqxvylag06cgji2ihk5vagvlit0wxdyjnpffx0n8dl3spduptfnijqjegsb6mqkbnz2azn5mc8t2j8ew0uvjshejueh2wcmappgz33kwpvikkmn9nwpg4ojewfw222y85jwaabjk5zhg4577z7rcv0iq8',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: '3y4xsqzqt1258l4ij6oxt77sacj0urobb5rz4s5lzw9i7g8nw83r1l98g1zbjmv21i1prbmvuo7uv2tmuwfnfkd6n637scgkvm0i1tuu75u8gvu5ajzsa0gi5zxa9m6yl2yxzmxawvxq0ubtvzn484qyuyuxkkiz',
                flowComponent: 'x9grjrhe8fjywm6powu06p0qgmci5dl54rmsuf7zoh2uq9zk64dfne7lhxw6ns0hxg05k5rp4zpodc14i2oxpmn78dlkih4iw6p3xcssmpj5z3botu4yuicsg6s48ymuw6n9kvp2clrux7xh6o2w5b8xqsm7da72',
                flowInterfaceName: '7kh147ebboaxygqk1sqih2gjg409u93dcmyu24q4b9mbs9hgamzj1r65u7iyhh1tk3lvxcq4gw0ql0aw1i3rijkwfo9h5cvxrmewul7zbg1cvn6dqsaq34ecukpzidzx7j4cw0hk1zx0t5km00hf6ja0x12nes3s',
                flowInterfaceNamespace: '0ik7vhr4zhkbr7ggnjrtjrng0gobkj2ozrox25co2c4kk6tqrkjh00ycz39a97nbhevxtso5tyyyykg1laxgs15od08uwmyx7h41i8wsxhxlvmfypu1xbrixterjc5c50ac0omj2wh04v11o23lk7g19b1id5sgf',
                version: 'jj6cew56mwhgm7ft0ky8',
                parameterGroup: '6li2jkrjgsdi54e476x2olqfpanxv0rhfex8p59eywes7uqfjj9svqcwiktbi8os90gkwa1sl8lvtd9z3ofxykkb0lat83y5qu94zmvcwib5w8irewpb7b6rr2vyxfmvqp4i3t4ngzudtojfw4cqkhch7luviy9rjts74gf4q8czdc8vs9dcfbp0owujbq7b9rg98ngtr3hhramwnm0lm54h7gj0y5g525c5vg9d4u4h4cxbojlh78903x4a469',
                name: 'vwamemtnos5hpt584vt7m5djsaylyjm17ghubmmjvgqbubj050ija6ponjlk3xl70sayjpwh0xlhz617tp4nozzwn8qjwrmz6f0fveevd6twbynt2muskqsm6zjmew5wa6vpfubzrsvc6ganvr5mftqpdb8hb1xe25igp83vdfmdu91a2uea7xknwlif9rw8cc2x8xj8m20jokwkr92nobj4z9yp9qe9e365uxdf31ovo1c25h425hni88jai3kyd6jh692doltk72oxwl9ajvaxhfokruorxjpt6d1ivynpt6j2zej1r83sdaym2ojb',
                parameterName: 'dz3ceesvrpgdybl6gxae741kouq092c5sdzh4h5pmzmrd3yfxslacc2xoh9foxdpnjbz7x1m8qkg180v6trfn4ya854dzudqf3j3oag4lphdrpx35u94u606id2jukbjdrp3f9m8llxbsqejri58oax4qxa6o5scd1bl380841cpdhq85mqtna883bjmxktrhgivshvy18wuzelpn5cx9jkglopdw2159yzna8w3c1b6x36vab81zkdhd0jkzc1cfsx7stdbhbeujblt9du8fu6jftx5sg8jfytwkj1xdr7ljdhpzwjlfzig4uwoewifb',
                parameterValue: 'seyf89qa0il85qs76tv07rhdx9z9qq0b7t9ohi96fkv17o2yky5eycia5zva8tkixk4m0f7lvlndpslxhwmvw81rfe08uiossb0947lfj2fius6sbd9fbj35l5gm3u4tmdogqh5gyyq44f0gg9gv8nwpnmfy6wxlflusqt7570d2ddwctzncwk0khnb43q215l14pwlsfceah9xr7pulfx300xrc66vkslysm3kp4eiiuv3c44wxv6oo7bd3twkltujl84f333fiw9i4wcvsaxo8mcak903s2i3rxbfjbaw8mhktzksbixjwb8qhbskzf4fln09y341zgkjk0gdtj6g03jdohjp4dc77b3b5a0uzrgy2es6hvu3h4sckr92h8qnk1l32jfqlbcf7zit4yzu7zhm7v2nirj3etlltk7ytws2j4q5iz3fhwrgwtsytsv13neyco79l52elj3i6nlxa97xh2uvbyr510e48uc1g6064rmw01gha35ggkc4x285o2t8l4kk4caidzfiltz4dyky0fwm1emekiqdfbyrtj8kbjnmmh73hbg0t75fdpahzf8237ex1kmsjhjmbsbjmhwi0t107p2m1wy2forg2k3r043fvuj048j61mc3c2qhsh5ouw7unajx1y99dxlago7qf73qmecg06yyhyqtyl43pptob1uqhqczt8tqv08lyajwqaq25xei0mpiz800c6eq35hvqrz28gkjt1f0384dyp26i6hy13zkcm4srl6sh9c2qxgekezdoy8y0hb5qytvrx0tq4ddhy3ethkz52hu0zchyfpevi52drc4s8tsesr36rgr0v5nmewc1jst2rtaugc4xa3eg42ilvuueyrvg56uv80td2sakhh8pralows09rf5g9mth5k3p77y16b9gpx3ha45r7q89jtjmsrobcuwipf7zf0y935dlfdc2bpppeskqg83irgp9zrw3ufr3e3jvvwynltyitmw8vcp6l5lomfzi7orzp0ia',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: 'tpan01orkie2ktlair9br4z0l2qkzkfpwj6if8s1pm12p5fvyg',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '95g4pi3p9tza6udd67g9',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'g30bkmxbwtvlsxb91b6dsbtxqwj3y7td1vw5rkcup753x7aqp67ff6dtbbseemttwxez21grtwurmlwrgxpxu571d6sepaz6qsbi63fowyl2xq5l35q9q6u9tgxmyjl777znrpz1olmxob39kjo1aqcpedhzor2f',
                channelComponent: 'ubm2qpatsrdiv6hspkn9tfgrj4geu12zobhxbrrlk90jgwn4kxt8vum01i2fd1a5vwjt4k7ld3romaw68vct6jb1b0l1v9fkscjrx4q602p7mx1u3e2wfv7889m9de59ow5stvjg1js6wohcll8q27au6g9av52x',
                channelName: 'vberhy5n88tpcrhj0s4k4y304a4lembhsyn7h7nde26tat0u78xpso3nwhghf8teoby9ibypobwkgwnw6obn0stonf4ys5ly7zj6kx3sbqw87tiyic0zeb38mt5cgrv9p6e06212vh6ag3xtzs6bwni6qnhh4w4w',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: '7xxy8f8nyx34jh7v4ggdwfdyghca6dllp2a0dsdascxeicmiyf7wrln4377u61pjw67ib7be842q96u36jdec3pw73h2gpnzlk04l775iot9sqs2qt49psr8rtwixhcnafgg7fy0bq4yaewwa2s4yblyvrrdsv9z',
                flowComponent: 'mx7lnrv15avo3hfir682b6p9e165t5fbgj53vci1cifgoaw6u7g2tfqib3l30sl97h5fxwjihtq9gqw5899pd6kuw4z3zp3a6u208ebwljbmt1t3p4jo2s81aa7erd5bqbqsg04m5sdbd95pprbxvbazmd069s2a',
                flowInterfaceName: 'xp27qyiqoypkfrxj4c6cg14u5mldqano6xpmwk3gsiq9zpdg50nta93vqrh96azy7ra8p5crtt48m2dj1rivnq3kuu6jmc1swz17pjcaiscoey67mpn6udb3zs2ey6b4gpukrf28rirle8020nzg1oj0yzjz0dn5',
                flowInterfaceNamespace: 'q8rweuc020205m3aaaapgf2io8cst7tbsq1tn09nk5x8hu36dnc3m15z63yjjxtdvehc5qdrn19b8ulyil7juonjqtz98ej2v0xnmydpjqwhl89d1qc50ciejifqqgg6d0kkk1kp0pxgdtc7fqm1jzyuurr27ujq',
                version: 'whgh6z28k3tpe7om8h3b',
                parameterGroup: 'hk4ko4bsxaitrrg0e3e2tftrvmdcwjim2pgsvtqwh3zhm4l4rbs822gm5t49w0ej6tykxwc3nscsxo7rd5gh4grrklb6gn5lw4t7gobnf5n7brl2lsyi8jut0jop6obplxrkbbjflqy0j2ekpof6najp5y9jpab9g6bq2u3atnvmpcwiy4pjrqxar24wlk4a1q1r06t7nigdop5xclfura2n9be7gpebhvbicwgqnguxcsvx8sf0bz6mcsjn2my',
                name: 'pva9w1zoakgx9eln3lhybj7fj4o3cjnhudzaf1l1vpn78gasrb22vw8gbgjy0u4ga63pjlgv9smpuv77bfaunwlteyjm9850396xvjklynd1s1g4bpb5kp2t26c9veehd1a6xedicxhmuihuxk96xe1i1fctxrxjtszlqogni3ti3s2me1bz9ug8p1mdjjqsocmcvlfh7m642zm3w9xt38135o7j6dhl8663apk67086ot3es1ipj8g24pru0gbw80wydfe1ohk3gzkyezjexjuwo063q80e71251gj17b5aadhhuwjl2qghljqrty5h',
                parameterName: 'g4xmyqm32ekour8dpixsrhhmleg0azda34eotap2u0a5o2z634ci6tkye4i3shqkvit7ys5whstop1b2irvs9hxxhl7qp7cr3610s178qafjce9lrbtgi6iwwikwga2yprbpfr04wam67gvy855m0a682ygud7fcn6xwxmi88uvmbcn94kwkkspzkg6bvuo2e424j5h121or3vg4pwuepr0u4iknjz86kmqcjjt9n91yuk7j1ni5u94e6grl2rttcxtuvrxnpe8hbri918sk3ax1fx6bmp8s9jgkqcw445r5zlxrre3gwlscmgkqx54c',
                parameterValue: 'j9c3wfg2fca76mqlnak3euf32o4bqe4zi8xo5c6l5m1wvo78okjs4o8fs9hfv0vy48j8t0yghw9wkih0cmd5666a5boyx2e2bb7lcag4brf1sdp6z225bt581d8kufjb81f0zgg8mr3xlosjuhr4xmk4eeeqepyixn36qons5jbv758z1v0hzleouevv2etx5iosqhk3cw62kwqv341eqeikiy17rh07lkigj2okfwgmpgx8pmu0zw11exgq07h9ygy6fbrgcb9x4ckyn5p7je619wca6zhvphrzvdt5308c4sqrs1fncan5eidw6aoo7y06jljas3rwi9fpp1c28vga6hbye2un4nf1yii8xha8fyzw4y6hriyxeg9pqvxjaddr94qhg0d62b61v2cbm9x545cxhmvdmm941itj451tm517upq7hwdyugjtvq2xgnk3a5k7qhx6iskwoo32k29gl0m041t60008rpquhwn6tr6jb2wi3ytlmnqew9hh7xtj418tvidjayi56x4nlsj5gr2y80xvdv5wg9q6dz95mgnn9g42w199pvewwfg5anp9kp2uqqnsiu5z2p066s8qejpjo3wsddznb5zg7jk4sq6iqibmh70mn8l4ynq56ynygwj6j011oya9x5opint0s57h2c66m0ij79jnxdu72yjaxxbd2m0t0io2kui8x72usppzb22atyov31rf31y19f9l0vvkqs65oomsgg7236awgmqx8qslbac23wocqp1bf3q93ay0sc3kmjgmsex36ppmxkcbuopqevdmhz58lc4vt73gw8x14ke6bag418klpek53nr4z2d1rm5mt8xw2q40bqhyqfbn6808153ao3gdg567kvl3iufoduljt5k6b8cokywefigr6i6nn40z1j1mazb1w486riwrt128yp8vi4u8y0qbu9lav3z8pc4t1xw45x338l9dmkmusx7dyhrjlapzfpvb37bd9xbupvffjv3bptdzzrrudgt60',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 1024');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: '4h0conu9xblyqbuusqa2v9qg076w2g45kzoenlk4ndz9tdhba4',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: '54djeaxj7es6s1psvjoo',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: 'dw3cmr5t7t8ucry1ui62imil6dezqze8e7j3r196x0kxuwge40xkqb15wjz8mic7uq814eqozpkxq2dd5aitqljnl23m11ggi7josiiugl3f51dh0zkpv1zzxcbrh0npdhoznmssidxa5gx3oywi2sw9zqptqgd8',
                channelComponent: 'to6zl23sbrq9mxfufh0naarn4okqzalv0bb7w7gxfemxr67gic4v5p9htwqxl31yrlpxp5le75ysxmwirjeapu4kb9c32fdvai380r211chlseoo8umzy2g98dm46lla4awnfqegx8p9isosej1t6c4k77vpr30o',
                channelName: 'kc4699sj4p8sl8mk7r81gc68gg7yxzwq3jxvx5wmzqvcgbx23iiscdnoz6xnwqw6bonbc7a02crxpnvw2j8mehp9sbd0ht4a86cv2omvj3bt5xgie2izkl0ts4mvgu57j3qec7wa9bchb32reug839wq2a86n4j1',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: 'k0b45l6uiua2fhxa3pzf1jhc1m0eef2kh72p2ocpbagn49aeen5a38urv65u1chz0ljr4cwhp9v3t2c6k9kqc1odmycmais70a58h0uinidyb2igj4fea86zz7lfwtgav1wsk295xcfhho9pv0whstt5pj9pfjay',
                flowComponent: '1sht8ljfpcge3ne8j62elkr6wvma7pjmtgsoixao3dwsp5hq4zkggvwpohkj344avwzbn1u6vo79sww9843x8yk3qatx56ihjcdaev0boo6d2rpojks1e3y4ux6tt8as1yl8kc1t8lrbuaezgqjfuzv607f9074k',
                flowInterfaceName: 'jrait6r8zqpa62xhze0zh22gviey40rs3kzoq9spu263a9pu4tgk34th16tj7svka6e0xvp604rboqvyaa5jw2xwi93uan15f6q96yzekw9zdx7cm2396xg6d1vhqxfbjmjcaoukulbrlcr3iggpzadc44tcsajw',
                flowInterfaceNamespace: 'pawvmjhkk3uxozgnbn5re0jezb5yljw6h5kmlnwkkxso5iqo50k7bjgcntak585gclnzp43ikp2qvruj2uz4c56tkulouwn955gchz2iev30o6yi4zzzbnibfsn9x0m3jnog4alp4d5oqtiyh2gmlxbi6b18lyvr',
                version: '0eqzjdwt3a20ooi9bvan',
                parameterGroup: 'yk68upbc3rqcqcmhxwzn3omkc5zhr8y6hpzs892voeq6fzpc9cntocyeph3it1jg47uo99v67bgwr2jbv6gmb8jj0au65rmie74ccx5b59lofstizpzdpz5ha4gyugczu094ek2q8lt2dvx4mt0twvdytmy8n6mq80txy29dct3ewwc3livsh4ur86b7cbgnkhlt0cj3lmme7j3bnvjzod2lhh7xkvs62n92i61njfv33dflj01n33rfj6u3nez',
                name: 'emlsif6fqzqp4t6c1817htp3ntrhcbzjqxiapx67zeellgxdc04e48tupvetkl3r38qxkfmpcax21q2lc5jjwxy7t8jhpdacpd8svxz08de7bzimerozu7v1tenzj8abjz6z9l2hduwf6tztgc43jw57x0hdgto4g24ifjgkgzngbfpce24wbiudvgvl1rrfbq6dnvtqjnbqc7ikpjlwrhsttcw9mp5591bs6soq73yxbqnt7t2gyx87qakqlnr2h18kdius4p4v2vfxdz9wg7dh1qklb9wr0zyymbknamomlc55d53mpuslwykg48p7',
                parameterName: 'qlqedjrwqt8l5e0v52ge408pssakv1bsj2q7wniyj3fjijfg76u9od957v635hj7ckdj5kk23pfbufjusscydol7q1o3x2tjhkbpd7ow50q3uxhdk2hbmvz4ojake9so3a86a0dogzemjbu6983v6qsbmo90et6vvx3rn5k2pktr326lrdq19i72fvdc6d747en1avxp2ogiu6z4vgr1j93sd81f4rhi5a0wo32g0rb5xc2eyayq1pq7htpl6urkjaj0x3gbg4anmbd80ggdnom09f8n8l0hh15txwj38nb75zotcnl1zkso9s9aiqgh',
                parameterValue: '5lubsqzkckz7e5jvjb96xwivg2jqspcyj899m2ss4lg2cgfs5c6qdp9n3lo800a36smtpzf0ysyt3axbiooby1ektfe5cggnv39srvctyhczigjbpq6f494bt1h02raielzfu289cw3u2yep2m55t4ukvgeb4pd1dwoul5nt7b8l5z8xtuq2djwhi7kzsafgl7vxioy99x5qmusl68g9trqyirfdi7xh47yapu614t7qzp3xcnym94anqhhgj854fytgegchwbiiyvvy8i3larmutunqxfag30dbs5753tvxq4y2ujh09yjpczfieg1kzzpstuvu8kmhdeqrqbt37qy2uxtvurmk4000o9t5fmls4vfnj6lkerenb28b9a9v5ilp37oco3i5paxteyzbob6z2rclowoquo67yker1tmtd4mzhhe8k4br31g30yb5g3n78evwqfi3grc8t41xaad0598mjajfxz32089ts680qybgumtqc25d5wmenvykkajrv3te80ux4seohum1jrgcfm053awq1f77cavhoghhfk0jf99pz5id04qo4jua92w03b23upw04r0ypx9nubs2gli5b8y7rz231vaeqnlpioj8cbe921zanc2evidq87etg4lg5namw6nfub40kleze8ugvorwdtuyscr5vsdx1md8j1crcneeiq2vh7i736nqz3q48j1rlzqznvezbhrxe1cvobunvnwbflpbtewy7yynlva6atdusexhhgjwts4k8vk4b5c28wkjy5iw59l8sry6v75qmjqrm39l4ljc8a45xhwkitj4z177dvac44ioysmvuuwqqmopu88g3pdpaa07o7nroixgd7nvtspxa7h6bo10uvx5h44q1hpexb9oiqb69vwd7djrpz6wl8fw5zdb6ty6z0ibg3lhu770hyaj09rv0z9oqz94s54w4rb2mbtuknnq2lo84ojt3icbylla3km231b8h3kfetgzcr4iklujpi9w730jxddh',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/modules/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules/paginate')
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

    test(`/REST:GET bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '5ee36884-a063-4c96-b698-761d22bc8432'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '29e4040d-242f-42f8-a1af-31d6f5b953c9'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '29e4040d-242f-42f8-a1af-31d6f5b953c9'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/c6c2c104-aa6f-4009-a475-f60b8d08c00f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/29e4040d-242f-42f8-a1af-31d6f5b953c9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '29e4040d-242f-42f8-a1af-31d6f5b953c9'));
    });

    test(`/REST:GET bplus-it-sappi/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '2beffad5-d07d-4424-b436-f8979a6c3597',
                tenantId: 'a3251514-748c-4d4f-a764-91bdb2ffeb1d',
                tenantCode: '7ciqr4kd6yny3fn9c5pl7gu4dfyvsh1she4i9hj4illsoj2woz',
                systemId: 'e9ea4d8a-1cb7-4a21-9d13-eb49bf5b7941',
                systemName: '4oh8f0bemolsfkicuhl4',
                channelId: 'e6260ca0-2562-4cf3-9abb-a24a302a208f',
                channelParty: 'ux1pup1enzwyrntn6aghk99l5xpuigs5rcsszecpah0edqhjx8e9wbf6c0p61u4hw6zeqf20bc3lepp5ui4q5vwkq0tf74dsi10s20zwvxnswdztuxg2ld2ydblt37s782c734ecvii6msq54j52db9ejjuhco0l',
                channelComponent: '4qtnjfteccj2djrbp0xbdbsxpa53cbx0tqd7ilo65hcamcw4xcsp2ug2y8712f3unwbk83tmdk0dhfwl56mj0208omlpznh1k8qrm2soc4x9awzxmyj1kxx4pthsxa0utceiwt5ht3vnzt0dqmvh625ov4jbywuc',
                channelName: 'pltsoldulseugklzps0z32cwt132dcwzhog6s0kcy1ai20syx79qi6467b9a02kigcti8rkbd8t0iykd7hb84m6nbvxve4gauu2hukly5hjiw7xmn3odbvfue7g4873j88lxsxzyu4jres4jdqq2ao5is8efzjl3',
                flowId: '2008d594-bd35-4919-b67f-62c8f9fb3bf7',
                flowParty: '9adqfrqq5y0mvws3o2043jnwqaa7nkc3khidbqm38g5zaxpf41n4jlh9v9k3axp1pikjfzhiepv50vgzlsv66yhqq3l63qt2de1t61qttypc9pso0imd4gg2dg2g3q055oyn1wjik81bdm2gqy8ak20pfwyyoaer',
                flowComponent: 'w22ziu30ezir1ed13yc67xoqotvw0kbfvt72o4ampghd5bi7l0nez9196nrc5d42giomi3xv7fb2ejhvpfb8uvwqha850y6cc9a86ieny7a7dtwp39nbhd6m3klgok6h6xbqsk7vo0k9pkxpj6ho73it79jn2ypi',
                flowInterfaceName: '5xin498w03t3p3b5vadqfpmj54inydssgm3excx92fwu4rw0ee1cooriwo5ay26l8r32bzwnpxnmlphg0b8xena45g368lpb6jdu4e0jb0t7qcden1p0t8nqry9ff0tcruvnkzx8qhl1t2lod9f2b5epn9pnqr4t',
                flowInterfaceNamespace: 'zool1rmqepb0oz3tk55ijgce1y14g594gua9t8apa3oqrya38oekb88v5h793nlygxifjd9qadxfcog5odw1to9jqxfixca6tf7x64ao9z4jutqhwxopdeocfl5pc9iqjxkeemdbwhfhx6e2bp73tq3iqju4h6gi',
                version: 'j8iot8eg3ybeegpqf8x4',
                parameterGroup: 'tyr7s4ql833wbhefdshxz8wmtd90n6qzpfylfhbvcalsex6molo5kvvs35olnxso48j7quq0bo9gvkz78vhryxwp85fmgd3wpznwrhhg6631os1f3zyfact5ads9j2xm5ceb01dt4h0oyf5yx3jhv6at3lxswuty7tna80qf8zmvtuw9w3b3eepnn7gn9oi9xbd69hfbao3vh3ql06g4dmwuzuw8h036vqv7y6aqfb72wjxa6if2mxwqnwvc8pf',
                name: 'r6osx8mud5pqiagagh1tjey12osy73hln52p5karno87vix8df0st699hyoywx6vvbc38ms96vkizyn9ia2vq73wkjd1bsmcyqvpv84lid0rwr13j3jl26dyajmu7gwizqe7fah8gw8lyac7q8tpjybqte1le75vrdy09cgolrgo80wz2oecleatq2dupm0or5ys8mmcg2prk5tik7s6duriqdkd6148fdamnexm26f7m9b4x3c2786gl8pb91vvasksfj5hy0slhrn5xt28oef3wo6yce9jfg1j86fvliydolomthb56pmwg0pmqa6m',
                parameterName: 'p4yhm7nya5cjgvt4ks8908gvmnf39tjqnlmgyofckcpn7x8ib94ee18pj7b142a3xwz7jqrwgaqpqdxr2fudtsohi4l3t6cq59zuitdif9u1ekudt3ht9t3ze9f5s34ds0alt3vwcy981m82isowuwi6rzg9wdi557zof88bln9kgzxmskpq9sb51v1htj1du21leuc2wdd26s69dwhhrarbld9tjv26sm82ts2y0ozda4sq6xxvswqknp8xgfusjc253jxxa22vvc1qm5tidqecwexp8ty4ln29ftas3mjryfy35ytxh47igborauyd',
                parameterValue: '8nktgvjd1lmn4rxvunquengdeb9doc43kdysctv119tunf3qwxgprqvh04ewa9llxur1ho2x8537xf6zvlszlh8elr0uo4rz2ra2pwex9j1zgkf9wxpzox8c57sp8jdnao6ict3w0qpezozemy2jcz7fn334p7pzfjgv2b6igcfdve5fbds48qlcufomebhdw4p0uqi0xx8jtp1pnpnrmfid5aovonm1bdaf80o6ako4xtzir25q9nykt6hlmkfjpu10h4vevgkdxz2ec3hk7pqtzkz143hv8aduqgsbgwxxh4a8iou4h3apv21esi2r6vkz42oizhbr0gvrbc8u3qxspp0tjsdahmqgaehoogv7qvvwekd1oftm7eopi4xmi3p9b57cmyadwdq7uhnrsduhj4mioghx7mbr3rl4m0nxx8w2br3scqaaener3ava51wkcqgctf56ela83u0x5ekfm9uii7lolckb8s2p6fbu92k4zp5cmaljs03aq4ikvv9dy0t7sl60px2kvh1q01n045r7sf068da4fo5osts1ueaaf061g520hygryiee1mnfi3joda5klp7913zng7jx6fgq30tld9suro7ayg9yg6y11pajub6g50g9c06fcq3h8nrast2ib7nv9541r7yfsyhy4nc8dhc00tqe927k25flc9lte633gifzqc1oswgjrxoewxc06kw1x02ogwopxvcj6bdo73jdwu5o731eojifyrm9baz4oi5zhcjsgker22eahtafrs5pwytg5jajchck8kuv95sr4cp3m5ev7ae3ka92s1pypgsqtwaizqhctx0l87b4yi7fz3b766825ufqarpsbvrzq8a15sd74shgrcrusmwp5lzcepgkx97ezsbkkty01juh9kbxemgy44skdtphi0qlwwpqoay6knllyu7ew1jci7jjs86b9d71y3g6d4900cbsg7lcyn8telgsny7m66lmp1csbl4qyd1x2bvwr27wfijf7rof',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                tenantCode: '7xl91j426lue9zyrjy0oh4uerostkv8dv2xjv5bvxb3l5zb7lm',
                systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                systemName: 'yf6k4fvqc8t4jcz7li1d',
                channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                channelParty: '21ydj9k8oh8wzj88v2ghga4a5fo54gy6kyqegjkmx912arqva8r0f7k75jn7jtqrrd7lb12gvebrjujbqmgufp5j9me8dv5jmw4znw0hl5vvyuaw82as5qor823k9ld0udp1bu5mz3gzr2qi9nlglhlnqfwho17p',
                channelComponent: 'qabbcsv579z8esqay6o47fc306d9ba0wo06nlgq912duhywji98xj2djlqmkwhma3f5sj39mqu04l30ain0pk6dyonklfimtd29rgpfgjulnhobar4xdczsawldf0k2bnh7wwekotjq1mk37ll80iw41qi7glltd',
                channelName: 'limbwa1hbjd7clt1k72sm22zj7pqzqtelbfiz62t1bspyiqqd3drcsdb33rzfk9bxu1r7jqka3fz1frymlgn1re4xxgkt76oupe4ro7dn418snndjh89ted1go4755see1aucob0132y29isypsykctdffe7waw6',
                flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                flowParty: '672afat66mr5i02ijx0pjwrq3saw6a2wnjo53zvy8crf8uxo3p8ts6wy4ldbagojzr660tvxo5iihb4942q3etuuazqcxslne411titgla385kjsggz94vuk36jdm3u3wg4dutq85s70axfkmqdgad51bht9851l',
                flowComponent: 'yxxmkvd7ac4m9me91bqnddr16ah8he3qslro5mojnu4311x93mc9xuydfltha0cotqmrdwjrsmr0slh2jue4pwjugzp9zl3jas7xagygl1hgs5x060h5yfk6lfhy8ww5e2vewxq5fu3fwp15r76x55b0pbpyu3qk',
                flowInterfaceName: 'dysko1ym8bvxfo2bskw51dwk0q6shdjsmj3kqfi16zpsvbuvxzmbru7tlqb19te4dpy4huu27bcw9y55dhbjje4e8qe7gxd8j01skzgkr7unrrlnpie38qwffakaqjs2xje9t65aouh90hv00e4j2jbm1dyw8ygo',
                flowInterfaceNamespace: 'ooj29lfqf18thqvqop5zgaor30c3i3bjsza0v1j5v0kgcmgggwtndnb03hd738eq0rk5jl51dtundoi4gyc7fo6p70yoj8ht3gxizh4m77xxq7lwqn4062xo3yglv2zu7h651p938yjm9nnozlplcskypacbuxd2',
                version: 'nrnjs43kcpby37ndtcxj',
                parameterGroup: '0q0cfp9kql5dvtldz26hv99m8wrg4p8qmm6y4eno1mjof41karrhy07up5i0mtc8ywxqx4soph0dbh4mi0gw2loddgyffbn6y9ob4pnc8299uidqkcb8lwe8vs2zrxld5c9chmqif70os7bkj8n2cir1xspxen6vnlhis8fgxr740sjiv41yev24fjgqlcg4b7ixoy32f5th2yjgws2we790nj7demozel8gvrjlwevwrecaxcixjelqo5tln9b',
                name: '3mkcmb9baoroavodcaumy9wz252gzlfm7wlxznird1kfwifaadw2rwt9q6e7t0z2oup9lvg0erk94rc1spn3xkxrbsdysc5h4t5kv19hprveu2nwnpsidmtyrpz7i90xgm18yv0w10jj2ubnxn28kfva4n6mv5scuhu5rnt41jnmbgqnw7v487cmtvxafk41xwa5g3p0qdx61rgqv8s0801wkwo5mzngq7o3x9nlhw6xzidxua0dxc313dbcomltqov3wi8n68bmsctg3nzvl9jyx8v09k5yma5qwsku0ljw2y6uk71cspwz8weoxr6b',
                parameterName: '56ihdvsqy1xuqbvuwkffwy66ve963peskhndhzdxm9jpo7p0mrf0s9xdnanto9dmc762c1mdrf999qg70dtfiezr8yyxtxlql5ay6vvbmazhjovqwwd7gwpvwqtw2ztkq8mfctedcq0cbyx359r1qfdshgq9vre1iwpmj7huah697dtfm1hxqdr4j94willzgtl9bsk9c1fn25w6oriu4v44fhx9e8qo2pvrpi2p6xhagqclht5opno3hhjbmxlmzdryt1gdmny30piqtg35y2af7n6fx6urqi7ind00hjcy8q7j2fexxp8nrmv0642p',
                parameterValue: 'juutoft202gtw0re4ju2tjkl1pzgpasvcunva6fo2e3pcdzm19o49oyfhd0ycpqcbjeee2arfvwi81n00ikurl3dk6u4h5hf7n1decmul5h9zt1ugytyjz9tg8c68dsfce31g93qppxh133bm7a6u14d365cqupnyaui2psky72m3afv50en1i0l484800h1ijiynuvviutu9cdbeldmbrpqopc3tpvcgfqsaycoz4tc8mzvsmm1fdkt7kdpk98srqlzje99rpp92hlip744d8j4u10bjphqcyqx9ut1la2dfblvft6o2ywcfbygyv97ecdsghih8hp5c8rdhpir0l5gvqx9s2vyu27sjngljqrprjnfpd51zy0o1hgmbq3btw9rzi567ana48gax2nie1c97e42z9yrp1hi6o5fwukl97n0fx0lcl4woluzc14y4ic8nfo188sonlyih1fwserkl11dkprdrm44mox433ny2upurfjtuuz7ez87lpi1wtbdneqbu58gucvrzmx0v4xnydcvhnnremy12d93vihqsuyxac8by6xkg68r39jy5weekffw2p1u490jkjz42utc3dbxnmnj8n5o8k5fnqz2651amj6eya4udx142yfwx4mfml51w9vkhm9nzbyt4ztg8vlks1blxsehq3rsww4g0jpce9z0byxdy4ivpg2h4lppsi9z9tp0wjwj50rytf9crypndq813k0u9w30qbjildxbov7y9yejb7z5i6i12ki7x2mcgam973izgsgz4xc63spumm0q964z7q31jfjvcrzwdmanucvz93f09g31hlxac2p116saqsuga89g5i8o6adil7mm8ygwwv2qll8dlipkk12ynubez1wgk7zxmkzb6a2zctboek9fzuxictvz2d1jgswns9ox1knwqqhjkbfh75hmm2tilnariycyvuemlnurxsfyj76ciaj93jmifrwwnjjftnw2mz8keiht6gl05sp0j1na839r3l1b',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '29e4040d-242f-42f8-a1af-31d6f5b953c9'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/0617d2c3-01c5-4161-9ed5-53dc131fb8b0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/29e4040d-242f-42f8-a1af-31d6f5b953c9')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateModule - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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

    test(`/GraphQL bplusItSappiCreateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '623d141b-a7d9-40de-b7d1-f41ba47b4830',
                        tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                        tenantCode: '932i66obq5odus75gzafrf0sxjq1ciglqjosfk1zxncuca8yex',
                        systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                        systemName: 'y2g2g7h4ogi94lfqx6gy',
                        channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                        channelParty: '6hg3s907n45f75v0sce71m3ga062xkluxl5u3rv0oe1zm3m2szdwqz36mmnwtd8poknbd5vrbzxjbpxulqft3cdgiw7wfbhibes43jswex9dklu6f45wxplc30pnx8sgih3dd5rs85hvhq1bvi1a3igvva0m4vdl',
                        channelComponent: 'b7i7l42gds2qgmj4trx374xrvtbky9wim811pr1gdk93kx6cuilor7y1fj7rlf7rg4qw18s04swhv1wglhjheueaabcc3nirlkipa5qji6dzx0es2bm70ru3eqbl8oi19hnmsfnu9onyivdqpey6ofbcv2n8r37g',
                        channelName: '5lwerakss18vjxgq1d82avdjmoerlkqvuhet6q6nxbfpf3mivfm5anrqq55npfqwqasz2n59vniqx44vn701dmw71vikjdp6s1ht2qdo6akqfn84xhuu30zbthu9ej0mj1i7pj5275j9l166g0zvvhvc0cb6gfuz',
                        flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                        flowParty: 'j7h6qibf3u3xdzwbag2mzd7k4o7y8s14euwx0fa6xfspdb7ebrhsf74jqmx2ecbd9jnctcm0qfpr86e134f4ik3nvcc2iux4irwosoto69d4g7dwjkorrl6grrxnh8je6w0pdydi0115aakyba51ddrhifmwpkmq',
                        flowComponent: 'l12cmbxagii7odf44h4d6vi7qu5sfsx4qts2gliykqodemmfnmjxnj5s0nexftk9hipf6pd288330wy68lz8plsq72b574a0z441t0uqcrbvqqyc5c6leewl8tyw0o0wr2lcu3wxw7ay7dtl8u0zwamsk6vzh0rb',
                        flowInterfaceName: 'lrk13h80z254yxyjn3sq2r7u8rurr5lnwe8jemty5onzhkvfljevuxiynlis1ctskntelppdh6d2vz3nl3jzh26wjzg9mcdqzzo04ebsvm9ysh1bobf3axq9xqnwm4n8na9ep5aocnkbvjc2crjg3rmt0se4916j',
                        flowInterfaceNamespace: 'otef2m7do40p0k978gohiuymar6cu57wb5h2h8q9pwjy1uxl2uvfdyoytp0gya624xp1i6jitoc97241csp3fvopcgq8ubrnrqhf45bnljy3s2m0r4c5kh20c5nsgl55459nkhap4oahmpa9eqit4r7ymfxuekc3',
                        version: '2i9q88b1ueqfkempau7m',
                        parameterGroup: 'd12e8kh8rlaqvsy841a0p6pp2536oywg3ei4h5rmws2hhk54ruxjyylpyr2twursh5lrhqlrokiulvmtxn4kgkcuyazhec0dp6v1kzy34uwxvtf2ygtv9nujkpyjq8db6od8l1hgwg4cx4o5xfpk64alhocs2k80qx71u26x2v75mtv8d1hl2ho1509cdzx37lq56p74ia759y548h02cxarpp9pxxo9bkwzyv13nfs6o2x191ctm6bgbu7s9cr',
                        name: 'd01egc749dx1wsnk3ococwqkdv0ou7awf80cmu42jgziqhpecmvbok6lx1tc8mz2s9davzyumn7hsilckt89nkloptwn3qbzpdhixy62w7mrfp03hggs4uhf8rlqdpo10rxi1w6114rihugo2lm77x3ibizdqf9fh4gkk5opkt63mqlm5ue0bbwfbirque13vmvp55pic4urc2ht6ndyksr1p034tvlm5fza4yzcnpw9pcbeeojphvt537zaiuryvaa0w90wtes0fj3a2r54rvcob5zzwg9o8xqnyu2228z2wnue0mw4inf2rrpqdh3d',
                        parameterName: 'glv4o15zrylvbjsgmot2ss4jfvn9b9p3blr14x0d71e204u2fbcf7a6megjhv87atxpzoy4pdhckc5e7a39ejvhedmwg79cu782ozncrx1d6tomvo19oqyusetz313rlhwjvew2cm5s6an16p1aty7296gtzzl46abvbfdhp1y3g141u1n3kv746bkebxq1qr2jchquq5zlwl200jdu9orthdwbqurannya1uy6688d3k891opyxi75bjl3ulg8bctpmmai1873g1iz40n6fsh16nbx44ms1r9kd35u9wx95kmrav4tqwsxognmk6r2y',
                        parameterValue: 'a404sy0i73dhrnbl287ltq4nlhv3v9mj3t326wmcl2u88lzk2rqw4gj5it3wcsmr9dha2h68zgb97gav6hzcv5560hx6qatkzita5jcio02rsxgfqn23o108oce6ett0vlfwlpc5du2tboliiclce8atb3pvics751gx6kz9k8b765qdsm8gdmppuevbfr8zymelsa71yrzcib8lygoprbntxj2oy6d25pfpwq4s4zmer07kfdudcj7wgxg2k44u6y20k6cmzu686vsuhhzy2ksv9vwwmhi1hr05q43iri79o1e4wvsy7mc6aacn251ecymqyap0a93bwxvea7srdhsvt6dgna4szzey7sujw6i1qh2ncvkvkvcca8lyig939vfn7im2xxy3963mtmpo9llndez8vffd8b2psu5u1dfvluzqxibhzc9zsf6k6c4m0y5ghhloeg9ne8kk8w34jsmlgicw3n1tzp1v16uu0sdx7h3v86xflss1fllaxwxe3imyw2264q7nsccnuy9rtn2u9ip9tyham1o80j63qc89iw2yeu4duv111wx2mklvd2h94v61sem8n4drnirhh2wxb8evxxaoja8o0uqe34r8e84a3m666kslcrujs7qv2yzbf1sbdwsc3ual5kjzlpf7ojrp38k8pzek1gy5y6gs1b60xgvsw6td4dhbmsllwbrravl01sbnxqscg9iijlg3ccwydrbeql8oa4zdq1m5qzh5wcil8lp8zzr4qmcawqgfhjdqoz190o16fji9n0eswj1kuvxrty5bte1dgb8orrre5ka4ptkkp1uep553lclhuptqbxbhmx63hn9e8nob733ct1qestd3v5ezywbzsz8rccsrgaoiqrq1jvtgt4k3ff5m4c4esl4iq326woilri7i12b2vh05d7xjb1oakvbfgo88hrrgnl8kakbji9liy6qzbmtphc3n13dzn9c5z15y2z3kujqkmh4nyhbd0gygjuyypk3o7zifdxwe',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '623d141b-a7d9-40de-b7d1-f41ba47b4830');
            });
    });

    test(`/GraphQL bplusItSappiPaginateModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateModules (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateModules.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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
                            value   : 'd076eebf-5621-4b10-8c45-1bb37827b943'
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

    test(`/GraphQL bplusItSappiFindModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
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
                            value   : '29e4040d-242f-42f8-a1af-31d6f5b953c9'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('29e4040d-242f-42f8-a1af-31d6f5b953c9');
            });
    });

    test(`/GraphQL bplusItSappiFindModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9c99a801-5030-4cd2-ac66-617cb38feb75'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '29e4040d-242f-42f8-a1af-31d6f5b953c9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('29e4040d-242f-42f8-a1af-31d6f5b953c9');
            });
    });

    test(`/GraphQL bplusItSappiGetModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetModules (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetModules.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '82b72214-c60f-4eab-823e-6add0ed0ae37',
                        tenantId: 'f0f70c18-b19a-453e-91ee-a834ae4d406e',
                        tenantCode: '0f23xvkndwfj9p7goikgcsvolvqaq9447x3fkvkvclh1rvcaww',
                        systemId: 'cd1d966d-f736-44e0-af36-af751f25681d',
                        systemName: 'g27otxe8f2f0ot345vc4',
                        channelId: '5dbb47ee-e112-48ba-8c03-0ac669e8d32c',
                        channelParty: '4fkvyqrek5ryypc2wmrv8jyad77mjme4ixi1qeb61nrusyv4b8ojjwn7dvppxouu1fi59a21cz0shrdlybibvrvbvhudawicj2q895fbureq53br621stvje2wkwb6cct14a0js89qcnpjnxsv5gvvuzeu6vabha',
                        channelComponent: '5ao070ct70hgrzag4cdy7zl1i4wsiqxg1xqpg8pssn259etjaa1dahmjn2fw8jbfebzfjdbvp4ujrk7n3c2h8nop362lov8phgpbetckd7ke9f8ug87hq0tm05vbi3e2xmqyae5nx16deayig6la125ix85fn3xm',
                        channelName: '1k16y7lcn3pwpazfuwzdgkdqjbml2h0wj2fk1zcgl28asaygsd3ji109mbpn6wogbwpjt21byqr9u4vnua3y2wc062j8k5bhaql6h8mc7rkwip8q18lhxetd8d0q00gxrg6j34jvr0sr1qn39m83xui7545j95ld',
                        flowId: '133c2177-ecf6-4a7a-9680-f08172f4548e',
                        flowParty: 'e65fe1bznd51ky7ylgiferr7vo9jurnmuoz1xxdghdqt3dywrmhoop1aq4ui2c9mjamu2f2fh5f3tw9yt0gnzna9x53e2t5ed7e9cqwt7ydmlxsjsxohfzwgbbbme9svdnesk1oub07aczoae6185fxvh1u8vf30',
                        flowComponent: 'gi2duwqgvczks3n1kom638x1ryb4qt728r852hifbvi3eusf1l7pdwqjy06ufbm1pdb5jqogzgdqrfeoaho1ssihfegb73j3kuzd3dughjzwto0sc9pbwj3urfwwudbqzp9k09cpb28tpt6dzvb2mpxu0tfjgli7',
                        flowInterfaceName: '3x9nd8bmdx3f8b63eczi769ukrikcqj734oxrfzlwkgyx7onk5z7vfj7wzs9yf4vz9htvgwmyvas0udbv0gbiqetal3kcjibuyx7bqrnipiaf0x8f0leinj1wdzjylnjk1wpkjtq60wz8mqbcgco67aospu60ozl',
                        flowInterfaceNamespace: '5i3ml0lply9rixncuf62khs2xvgfp9p03l2vtxpv25vi6vzouw21l9izminhlhd8g5z51weotye2y6bzwvcig95er6681q4umetr50co081o9k32l93k51l7zjft4w6kyvst7sunp03s22h3x69ezzlkq0rz05gz',
                        version: 'pp2u25qq071komlag6jz',
                        parameterGroup: 'ldgutmhkprvhd7qaf2bs1w0gerftmsifapylku0wgn8v4mmgk6ivyr43yn53bdzltsfan3ugwl5exuhracdoxohs2jabj1dknuv0klsras1yb5yjhu56qf3e1zqwo0gghf7nhtw7sdded2d0cfjzcuq3ebbhpf6hrejkl70xw1mk1huq9zbxi9ve78oslc4hr96mk92x5p3vjwd6sxxsg77qch0irqviymgv8yt5imip4yv6qyrlfygkao7yemj',
                        name: 'r0c9bklrw5fvqylomzb8hwoi1atdzwlxqacn2yysx1lohcsbzez4r3lidsknpiskhsrg4ratsblx25m20gmcvnbm08eahwzok4iny8una6j4ukbmo7ajnx7rvwsit06naapyrbdu1wuf3limbb02mi7vwlym80kc8rtos63o1iyyvebewd97ezvkhh8cjmh5v0s7gm6o7cix9bhn79wcbasx67oau5hj15ikcjj5sn214ffzdqsy9e6583ri44r2lsi36g1i1vtetopvlvb7yzm5yqwxkrnkszofipwihzm2epjhc5iril7v04js53ui',
                        parameterName: 'qgoqk16il865l2pxon1un5lci023xwkh1loph1gtw7a4no661bmkpbsispv15xrj3x6i5hyu7ly7d6ofyf2yhfs67f01ikh0kkw6b4l2fjr5lwz5zre6lb3r5tgga2w5d55ybsakgt3vdn4b2b1yde38uiwzxupbshvusos6b3302eu0wcbgpn90wu8tkc84wswccdorhur0bf3n8ebh7z0w4poxxioui7jl0odde902kxzfxgai886c7lgwxq64vd5b31qfuq8opjhg1pgllnfd47w9y3azzse6q5b07syqyu7wdw5d32glnc83k9jf',
                        parameterValue: 'qfjyacrmk0e94a5qgwpejxtb6d7pwgzrxv5znkyypvmowpg2kao782fplqam381p0rt7be9m0o52enqvy89otn5a5vy2dihyyqjev6obto5dy1q6hunkmfrcgfv1myby8hhitubaz7tiv5cawm824ockxl1udxrn5cpkx3ha4g783tvekx6ya047wt31ecvilgsearkjif6qicyfneg7zuwpu3vsxjcohaohy2l7qk4ib8snngfruvu6b8qypqfilab5cnzw7821kb2ubgohymd7qcqzypuv528lky3i0zqe1mkr7049ftxcvmaf4n1upds7fqx1qiicv21wt9rsf3njiy153eklk7kpdbq5x3xsrxpxrwg9omgbnz18uiehuafsusz5y5nnoofqb76lvhkrdl4onvw0bvewkqq316egw9ugr3zy8iacrvqs2jirqe7odfqqrzl06idsmtzx2pl65htc1afck5lt7ycwibdnz40mnwl773l94949vzs4do7sko8s35isfcvrm9ts8nxpcrap9mmii5bxtqkooig31y7k3secytxibu07oyyaae01uar4pj69z880uwhtvdse2og2nt002uq5um59f8l6kilshgeaydk5inezcb21314fp23fgjiwcmt2t0mo3tkdwo9f6nbvx9gts3n9cthfq36qh31v0ott3i70c0soik7e68kgbqeoxcyjiij3txhy4s7qxey3rgrq10tsb6f00dp9gr54k9s4cep1lik6yy2yhsbaf3f2nvhut8y5fpcf781z4lxl0ehwlhrfnofnnhhcraucn1rffqk48dusj1wqzy66crsy0dcpjevbe9mz6nr4pcecfpw4nmrrtzjxaiq79ccj1mhs9x75gyqoewb6ya618tf78xm57i4bmwckfjqoul4pvgd8gh2spfbrqzqfyoltz00bdxf85d7k5tqh5f8i6tw0wp6i0r1vq144spkuon8errp75cnrowkig7bnrgau56iz046hsyau',
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

    test(`/GraphQL bplusItSappiUpdateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '29e4040d-242f-42f8-a1af-31d6f5b953c9',
                        tenantId: 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c',
                        tenantCode: 'rcgl68mw4e78w98t1e6xkqtm7hzt6lfjhj4pvxh63rl23bgl2g',
                        systemId: 'd53c4c82-89d5-4a72-a011-5b34937c3ff7',
                        systemName: 'vadevcf93w9kf7bimoe1',
                        channelId: '01b5b256-9e4a-4b87-8258-0e53295fa86e',
                        channelParty: 'p4ibj0z5aarz7cee83bshv2sjq0rl2vltca86xuyyjtsmrk37j26kt5ljnk1zeh6jlx1b0jat8s2zrog49ek6pm8aadgg1gj5w70sa3bqfo81ngdplzmsx3cy4ig8n6w9ix0onk8kmi3y40mefuxphtplxcxia4f',
                        channelComponent: 'bjgrl7k7why9ggixd38xsfbeczo3ee0dysfcp4wtw0e1p07vbxfna3teb7xvbxw75er0vqag7pruznd4wiy5dxnvnx1az8d8pj2f3jrxbq98cga62237nju05v1ilf6kxmcag0kjy4ineo1uw0nomjx7c4rf89ve',
                        channelName: 'gw4yc9tvnk03autvxrpmd1kbpxqzefarjyocp4biuw08dqtzo03jyj7t6qabohbbxof01j682ilsaezmwjjk5taz59810w0dl1mmvvpv4fo6cmkf5ln7ltpjvy7vuxywwfmb8l2svoq891mjgvmh91zir5r4pefm',
                        flowId: 'be2c7a0f-d401-4456-81fc-4198c6661f75',
                        flowParty: 'a527n8pezjjwhjdf0d7seq75vv85adklkrgn27dasl3krz579kadaqdcwi8ymf9tkvwby91mx0jny5rgw1qulla9o1j2zddyif03n0gqnjhot6bubam6ka62d3rsa0kqmt7gjqnzyobq83m5rnqzmdp7ibg5xdtq',
                        flowComponent: 'qplu6iwc8nb1uxsgiiruwut5enk79enubq501wxuyl0fsh5sgwzhr4vfzaxn7tnmpp5nxdkleckfwu10w2g5ztb5dhh8nd6840xraw359764utuznp88n0qmtkjnyxdjt7mo5h1zntmln2iz1adcbq1xep5ikvps',
                        flowInterfaceName: 'o4fyeoxpsys7kbpbygt3k3xqw0ahm5646g3gfgv844d94wmfrer5kg5sp5i8uhi638z5xt9zgqjl4isdtjzo6o4ub04zkw2az6qxvk966eozoxt9d5gl6ozwmwrszt7ylzddmelto8dmrdccca7t6c18q11zbexo',
                        flowInterfaceNamespace: 'zp8tcv18fl5q8ysmbi5epzpnmv0736td3okeobk5036mwo3poqwuqr9o6a90dysqttg7tug193zd4a06cyloi84zfp88p2659om4c5ajz9p5b6rgaim1td45d6r9orugwv75pa5gk54qll78xsholl120o2jafik',
                        version: 'rnygvhrm6nkkf8tfeknj',
                        parameterGroup: '8nrryo0947fq00jxqs8g0lf80t4mkxhn8kbnh1h3zp73jmnh4qsom7vi9ycn9vyh749yv1jsmvy550pc7fu09316f6101dsyh5m9bq4ibovw2hsl2m86x5hospy79ecpkokaltekzt36eipd8wrr0bhz21f82shwpmwud5qd4xkr91pd5h5ip1c1haohwzj4d3xct6odr0dpezr9dvj4c5b2nigbgrpay1zr8m0lgv8gm5r7fdrxswrm41ip3u8',
                        name: 'vq5zq92fm9hgptupcaubiqugj5qszaqww6k19x0tsf3lw1n9lx33klql1jx5wbj24qmtac6k2xgkzwy0561ubnkua9ryjjovlmgxj9y3r23z1rzaihnnsrnaaii97ngf5gnpju01br4s784iaimuvqmz2g7f7cpkxei9rynp7zyssglod0fyvl5hnyjo3qr5q1ya8wlpolbp8q1dlsv2fjc86vb1dbcre13p9bdpixb0ahykm966lwg2pb3i1eryjyvh1qf23lt64rkg1m1qdmfaibezw934450mebfhjmazjzns0pn0d9yirvggr9z1',
                        parameterName: 'unk6lx2f3jtt91au1fusv6ef41wp9d1r7i9qb66tg0qyccc0z4p9tcet16lwhbbsnfihxt4a333sk0p3g96n0qb9i2m40ze2i34wcdsu8nruuuv3k5w8kj50x5kek3feq40k8fpx42u3qijaam6p9q6x3321l84c9bssjuucyjldp8kr4aceumouk13f82ki8j4n7877ibv0klhsqj7ow65b8kq5zcf6ms633ejk9uygawigieyulzva7b6t5sol37r9n7c53wchrx55wggokx5c12iwnjarjyc3auoh7emkmz8sa2fmz2hfkyhbg7qc',
                        parameterValue: '8knfowwydbu79dchjew4q607epaxwpttoze6p3quzva6dw2r01pwhlw9xkou5cmdm4gsolse6s1epqey8v97ghck9b7scky1nw7ifhl6kp30ap2vlnr1j8tnqfw5kp4g8xqxf77mtqo0ql2vi3oh7p2yuulzgfljypdhehgb3442kqwwcclap5rpwqbx4i6yjgkn558xc5ougovof6i07m47eof7woqibmrn0sus6q4qk0f8dmvj3128hp0qp5vb5aacexswd86wfe3i9le7hdjpwh4fup76y80u5sqopqoywa9zchc9j4boamyvlkuasved85irf4l5r7fnvgs568cb65odq6ud972sm9k76q6iq8li8jgkv540buot2lqot0h593cv4cdoenx8i7mat2fp6ud2phs1a9xxpn598ht41f0urkamo8qa6a2g4rzjghqdj0xnd47kamm9w5yltrstxnhlonc4g4zocofd0mpv1zhbc91p4vamdxqlopwqfib7owtir4u3ai1ozxra9tkkbp0sdrhxte99q7zkfwgkya10yyfqb8svh65hfnsq4793e8wikyct0cf6oultf6w44z62thftg30irj3zv6ibs90qj6leg9latt426sfj72jglhjp2as2k9ig2zqdnw1kb1x3kq63fdjf4p20m8ooxy1ejre7gxh7b1dmp4d84b2991wcdfv1h9p05rdgp0g8kf6v86ddobl2c3ih0ovkgbrmwq8j9o5406ux2t7rja7ytp7y3jlxhqqa4w07130pma2s7ua2ul3md34qhxmfocrl0d0k0coy13xjr0ywu91cmv6ratkah1v54jrgfd3eu2349srhc7d4m2njjqnctl64itttxgegstnhmkulqv8woe6egtzam70mg6gn9p3pawihtvljzgq4uyk8khsbjlnwcfimf0k2psube8b09t8bie3crxk1tc824h93iwvg8w511flap3wg2jcu2ixlz8ul6qdj78zdwtiufms6',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('29e4040d-242f-42f8-a1af-31d6f5b953c9');
            });
    });

    test(`/GraphQL bplusItSappiDeleteModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '56f4dac4-d667-4077-b1f8-47a671c0127f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '29e4040d-242f-42f8-a1af-31d6f5b953c9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('29e4040d-242f-42f8-a1af-31d6f5b953c9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});