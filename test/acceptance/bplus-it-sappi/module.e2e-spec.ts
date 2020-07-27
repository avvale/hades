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
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: '2r4tci0lwmvmi15turuxkpmo60kcl4xjs2yihxjmvkulirrtlj',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'thmqa9bnotsksyzlfm6a',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'arpaof3z0t8jgmeakn4aeuoqpxf3qhwveqs61vd49dd40uwarl43pwv3oxmh96mmv695iv0w4evfpjzgxsoy16hd9s9s0qm7tc4k28t19lbqk3s906986j29jb6iqzl5rjocwhgmdmevday7pfrzc0ndyer5vusm',
                channelComponent: 'i8joxc39d3t1rg7nn3jpawgq259as9nyqupo3eb56m5w8fybg1yjp41ps3qtpo9qjk4flsoo3rjb8vp2bs9qprevvwrx8elbnlmyi3gff91576tqb2j9xeb2dp5v55fvlbpos959248ju9p9qagino2ak80ms4k4',
                channelName: 'i0vnj6bo6upiqdjd8pcxumtkhftycnqhljrh9aj49yhdrdgf730f2i1ga1xct35xwzl7e6081ic65iwybhxb8ncwjxb4ch1h0nls6lfuuacebm9xzar711w3eg8x4dnqgw79twnkllvhnckqha47528nddygcbco',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'vxpidllahekcnd7zzjprpo0mfhsvada0d478voh8zqab2erqo5ggj8l15ypc9tk555yibp16o2ncaepeh4sa0df1avu93rdlq0qnkumcf84hhhel9kxthtogf97kenctxtl4wb82s6s85y0xq2agexs1ayhp1l1t',
                flowComponent: 'oucybvla5hxtn3gi0idu5ycbn9qzx6quknuvgqh2iykqr9uuk2rxah8vvi3bq98ga2xiw5qdhidj5wayag266cayh0e7sy058s61ijy4gkrr67b94bysknjlx9ebme4zk6160r0pghabgbafmxiimyxic2y635vq',
                flowInterfaceName: 'qx4s79774vr6t3nt10kkvgivvvzb7nd15gtp41fgd6dtqdwup7zm544lpbe5xeaa17lxrpgoa60uuhn64zrhtfpbz2wcgkonr1stlp7m1d7o088uof8sgf791pwoq72i00x39hs6k6jgv0l7pjt714mehzpasfj1',
                flowInterfaceNamespace: 'j4a00lkl0yxu8qgmtirw9p3hj521i6azsvh692cvihe53zb1pev8cw6mqmy4agro5wem29hs761dbgr4cemfz34gixyaregrjh1rtfrdwozxn0gezyn40ut4ls22t9uygkuqplqivr58l5gj2n69r23acgapmvbu',
                version: '8abc1nh2sykgi5j29f0j',
                parameterGroup: 'huh9q3mkxrssm2h7gse3zshn8eijpcjjbxpg1gicr57763yjmgsk15kngta6tfn53mvmppgg6mud8jeirw6hm2gfnpcqsxbx83oq7joghcw5jd9w9l9rkb9a4z6zla45cwzn1yjp1na4cy91e31c5siuepnghl61lmveihtgc4wmlio3stasobseu9s1zycxynp1ltpogrryz7aw8s6c0ay3b8khsc832wffdxtx2lm1f9jv0j3vbnvtstm9p5d',
                name: 'jb7xjo0280vqkn80ggbx2wc6zuvnmmmjlcrm3j7lob2egeqrzw9ym8nmzrcyjkmerj13ts3ae4fxw0fcao7qwu0rmjsg4tv5yhqds291jlmjrjapvrsvl5j7q2rma5fu55sejigc4fdh6wm7r1hnq8yjvbe51i7cefi1jp3k28xkmk4mklspc93m0pr6zkpt35kq1zpbg4t6p4uq7b3fawvi3cbfidymbw0hs0h4yo8l23n6qb3cfdvg03tbr11wk2g01e0ueqxtn699x89kryr60yczgv31qnd56xw06952tdlx9bs3g9q6j9hpy0e8',
                parameterName: 'n3y7qbe8qim7h1s6y0iqliyeh056xl7h22ko6in8ipbb60xph09ojgm1n45a4741rhwxv53dvob7rx6e093sefwkuuu3a2097to7msib9ulmr3yskmecrlhts21esxm5yezrgg1zfi5copipf0d9m3yypbeyyo77r2h14ijbvf07vmhj2wkuqldrgpvtgbp5f7k52gswnv2xmygpsdxjrwa4fi6a19s3mpzkqoui24159wug3hc8lrlwllaor33eu28881lu8l378qfh3ama3afvm6s42cyg18ec61cpwu4ap7z3b63rnt17e3q94j38',
                parameterValue: 'iassjodor9mak5vejn9a33yj3996lw45nfrzaudhjeie1q5ejt0n1aswuiv2ytc6l79czjn8aqe834h81wsffrp7wos47lr2418mxwdqcm7kfzx4xlv0lnu14okcowmv0j3tp1sap7ybghlxbyultffmglt7l7sqk5ceh7q9p9n9xqnkt5k32bb2baasq09voefowwsyliykoyb3bezm6itdpe47orr3xqhuzt2xqg96denotx97u5z7ej9wqa8w7y18imbog4dogez6hnipjw13omfd6nvqotzfgt3ojq7uljxwvmabpvjscsckouw9j1wegs8u9v87je8mrpfyhrzbf5jua6dl6749rta470nwfgx1lfdgns13l87o4ib3mce7xnvowzk7bl9sy2k37cpqhvkcz4xcm8taozlafpr4n0mrtuxle6edoh1fnuy3029g4c22ye1jzcxhq86c2xx62ku9atnef1du54jsjd15jg3rav3aqbgx7qx20wyq2ng4561x6551mq67sya995masvfaatvyxmtqabduwmecyctqkvxq4cdc7b6mvkajf56813xi1eoz15z3zilwn0t33whws9hmnbo0oes4o9hhzrdfx938jtzk1ch963z790d06j1j1f7ly628hoj14ot0j85ddjc33uqq6ck2gl7jo5s7vs7ojgvum7a3rg5rca8mr6gmc5900vuk2ra7vc33qlysb7xtmlqjqocgvafl9au3tvzeqr969lmdru5v0zbc80ns54y2smg27htzcq4togejp03cel4djnh6qk2ry9iqr1yuf0kqu2isnm8geaxf82qnnugl0ih6jb1cgfhe6dcz0rcimcquh25cl46wg7h584g07kvojhbnw5xgwtl7sedx8imh5e2yno1cxler2rf3242lgjqzh8d4bkzw1iq1u82wo6o0etpcs8lxxiq2ysve826ybrjrmc3z45kzihgpicqhzfrzo8lskn8wax506tjdzunmhj6mih2e',
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
                
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: '15ri3jzz9rfyzsgh86xxboyuak46byf3w23ed72sf23ie7zxra',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'b1zlsel3p7ss5ehvsrly',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'oj9dbpuatkvckk5clv6xuvsse7yza9zzez25wdu8wwqgcovfo9ducg6diwsglvrds87p6htincbvtvnkrwl96byc4msq80zpq8quv4ls4subi4i61m8v2nlivu0a1ixu1p6lbfamufhj01iga26iyom9vhcpetz2',
                channelComponent: 'sc5krik52eaji1lhyz45r8m3eovmkxtve39ywit4jz9o20n746gsaa5mkxp5bjhqoja08ejar2udbxj3jespdlom4jo25ta6hufxcdgijx0niy6q4zwpmbbh1kxzv4oujhnv3srksqd62ar8tas2pi330w7lc8qp',
                channelName: 'gesz4sog0i2bt0lmis8lavjzywmr9blqu2odmxan271de8gk9wycwep9zkci0ogsxnaehq0kmx38cd3fyizyrw7oin24i5fw22flfort8nm341v2fa7awd6tj275zkeai7kn8wrk0qlyh1jmt586nldmv33zprho',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '7on7t83lncx5sbutjyfxvlr158dhcxto2lx4mdwbd39n9j56zeekiol9quela31o7bfqk6cp8ai2f04c3wiisfnh3u1g7xbqgfccm4zws0qurp0la372oh4gvytmurrvfwg44zg47h9ogow7bddnlagrqne3b4in',
                flowComponent: 'gc8q1lwyh0qx3t8hn4sj7sbtxgq0dxoi4e3z4f06dx5lhyg8mt2p8b2106rj9tl22jnrn3lfxo3c3u9e30uh1mlu5std2072h13xygo3mzfq8nx3v7vmhyuulinfm57g7v5lzgk207fdzcbf5ti72ycpu9fxy4dw',
                flowInterfaceName: 'qz13uabcylw0skrska3ucbfqk5dfhnssrglt050jof9az1fhbo47syugocv1ol87vo3ljn42vd3snwcadxbuz2j76sta7o2glkcx1van2x6yx9rz9x8alndwbwflr1vhd7wahoyrbed3dce70fjmh2wcmido2ffh',
                flowInterfaceNamespace: '8y3g3d38ooi89z9c3iib61o2qwq8zby3axn1v2gr9jat16yumqbhcfc7n78whsavfx763lqkde4lc5qes2eqrsmkc3ukp002tf4apz5ccr2hcciy6sen3obssxeujoip3ryebd1cj9mh4s68txglm63pyu3hjliv',
                version: 'okn0mate3zj1d2mc8h1d',
                parameterGroup: '1iowh8jtuwf9czm8lscieowg5cmqe62935k4rp7bz67ifcqfswp5offtxpu507qnzwje9ol0w7a38mdedw2m0x7dn76gg0pjp2x4tv00frv9ywi7hcrzw9697mzx8zsd2xt2ysrahmub9149lrunqpxy7rdjgj6w3uxi48mqy3p07od53tzuwlz5qx3dxeyo3bwlldjtxxce19ykg1xl8fzd42g8ong4lw6yqgsvmgsawh6zsyd0rj3u5b08nfx',
                name: '6w2i0mi9725ox16xflkt5zx67t31ri0myhkuye0llo0z55u311xskp7ul2mw588mk5areew1dscsjwl4r7rn4mlqy5onnhvtvc5ww7sdezzgrq999qo852okbxgg7q9ghl57l4h15a9owjbdofzx9lphis7uwzloi7vhezaos2wgvttstugi8x5wver081rkti7c5bnvrs08t2ollown4vi55n9j0zmvbcgb7s77axjmm6c2fbiw06fey96v0bg9bqmy7hud1b9p2tcr90ksqkoxi9au9sij295xzi16muquiqo475dy2wusi6x29q4i',
                parameterName: '3o8roehhe5gn2yjewxkhgy8yix7xowsksg5clrmbuj2w9tqwmaskmz3f0t8zpnpritz3cy9nwnk86mz68wd9avp8or5sgbfmeem8i1jhbtcq3sd3le25tqan5xi0vpoteasjlc8idrzwf6yy9m3qgnqw2c242m8rd9styj708egb6l9rflfmw7vweeovl1jenh6kho7x2ptw5n4fp6qws6r56cqefnhnxcyccohy81zytfef9lsx9au01jaulevfeyfcc9lbxmvy0oxboqvq8r5pb1ls2kruvd3lmr61e02vlv6gtl986ri61gz2ec7z',
                parameterValue: '1ir559f4znbvdbqj9og04zf960rfgoyftmajapcb3k7io590r6ccv318a5s34cve2tbx6lnki5xzp8hoqvizamwz1zmmn7tselywqhvjqk7cgcs3sue3t86nb3t8plmf68m4m72jsygcayufiw3hb8eseiaehkp3t76pz3daefqsqqxgb49ckgjpjpbonnw8wkgll01rfgxp6xmj7pz9spxedkmzdm4rwr4iio6munpli2mb5xqm1rbxrzwsh0mjmb6mnmjt481wgst0eggg9d2g0xufgpbuvhyu61ysk7t8t8ed0xjr7812oymi58frg0mzjkyeno6jdre5q6k8jz8k0jtsv7jtwbvtphf7ljqi1agyydvqgrm8ycqxc5sxilrhxxob4lqguhestua4f4e5t389nnv6bcd91iqwmc7ceobfw0fvgi7vsw7m6suno0ejvc2oht12qiqr5htprkrdwmeeb3qbyibefhrlhpdh6ln54t90kfwcdalvyidt52vk4n9t81zqd3468z4rt73ce8aentqbyypsov12s0duuqjxp3pc2rjdpii9c9pi3akja5tk4mmzmv0mtf5wgysbfnvkni2ynlsvobhi0y27x0mzv24uboj0ik40ztrcpjdpjguqdz4w7zgy32fjdpriyld7vxa1pav5fzvyzxvwuscltkym51dnsgl7llr9c99z8i6c2m5rld8r8gpfw4jiriduwe6s5ag2yx04b2ley4vtmescf9opv1ygevhj0xhkif3rc9fg3ymej4detvgopagoh0kgo6rqq6besborbhhrmh6euo1pacu0em7malzrcrqw0kl4oqg0p330gqftloydxexcw3890jc8vadht0ljnwjslolfcnqqxy1xtcm1mj2yu8287aauje7ndbnb7rbqcu5s6pozt3fjqmu8p3b64v2edodxbmv4hbcvuh22puprr3ccpmbt7qa40e832rf7pzp8kq979iw5p4phqmeg6yuebsgfrxkl03dh',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: null,
                tenantCode: '4pkampp8c9ijh3383xwwenixb51efdxyzclh96txgrqx7mmvmb',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: '4pjjt6swqdh8pkm3xq2d',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'shnq2rg37i7qlvsbbgx1c3hrirwphvuu11reow538son5j6vqhsgwiemlxoushrcj8acqd2cmi2572gw9a5ep8g0skcmzz7xxp7p4wm0mc7796dpzc9nre3276c0x6y5jgkih8u3dbnqdtr1lmabu9z2chqq0goy',
                channelComponent: 'pvag03lchp4oa7me5qfmp1w8y8gjesqdar8d0tes21mykilt086af5fgoybvfder2i4htfrhegtuu07yzeue47k7j1l3ejnm12noy9klbuhirppovh54uvds34krvzmbesn71ttwsqtgpmzwjre3uqsjb2qnwrq6',
                channelName: 'ub4pjcqtp8ug347x2q0azcj7fcxzfzuxl3yheqx41fsplotd6zi18zb7l9vts7y0se8mn0ccday7wg9fowzabzjg3rfgcrkqrstgc1snynfm8wjn20qq2mhjwrc7ggvxgnpc0dri3b6ciwnhzhlv242msnv4fhsx',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '3gikawtlpj94mffcc9brbbn9r0cv3t2cwsyy1ur90gxl0pzhpix9apx43es9erfuf89rx9u5xzs2mgaw9f5gqqps0i8hcikn4gntgxa46fo65ak3b4b67oaqfn7o0fihmlfgvwux6ma6h8t44st642f3lol10ufe',
                flowComponent: '9vbqisbqqghtawk8icqkdg7s7wcrgp96ua6bj256y8y8d1zjwptcz66bqsgcbj7brnf4n381o87svoob5fyfj82bupzib2l5gws9l28pwy20fc8wi0h3cn8gi1u6uk68g7k4xbag705ho56b6fykqsqmdhg0mkff',
                flowInterfaceName: '6s1axslj1pg6y22yyot8s35nwmxmfnr34yq0e90wrvd281m2sg0vv08ah4qgnnlb2gikkjeorfahayrfq97afxobaimmskt2evj9grqm93se0csp0wkvthulrwzs1s84jnephm0bdqxhf0lm7eeibl5yesbculla',
                flowInterfaceNamespace: 'kys6asr9gp7pryyho929inynzw1zlhjwl0h67ocr6ag24grm2aqbodk23dcxiev3890mer8jaklddjrvpr11cx9xm3eicum6di6mxmzg9n8xg24m73guufpu306neua5d26xqsdsl92rqvbw62d91m1ydo1dw7au',
                version: 'i2xw1lu1brnmq0zxnhec',
                parameterGroup: 'vlsd7zodjmnt15cgweznsw1yh6fnty0jk86lhqf65dv8deh12cfz85oiw4b1hwzvl1qovik2hx38in5dyhrbr0rvybb8kx2iv4x4j50xu93iadxd5bn3v3qen342bk9591s535evznfx7w6iwl2yawjx2y2nyp84ngrd50xhveoww3gqu90q2rbn9arxka674jo6vwvk6hmj5nf8j1maxfcymucctasdq34gg3kni446gaix1lm0zepqluj703r',
                name: '9t7nycjxdwa9kpikmle3pyjzb2gkow6u7o9x5lhp86bbdzpowdpsttgc30eyu0h88be4576w6gnd89wcsdcc4ihnknotg76p66e1lr0js2h226hsnupo19mqryix7y3fe1l8o302a6qomb3v3rbpmo90zwhv9com6wc6poakj9p5v4zywjkjgad5pz9eloeh23hx5trfb263yljv2n67dvvh56vlgo6trlernnroxa64vg0vamfogli3kvzy9y64dn2nfug1izojdecryd3hcw9r3t6e95vc5fzhesgtufn9jfn2il5jnm04ahpcbn47',
                parameterName: '9be4myzmayyvaf6jcj2n7mb24zm0kdw6uc6ctu8eqpg2iqubpu5e6lpruwyzvxmvjwenkgn9frfxumt3cinljyuh77abjmck2ytszn5gfd7pm5z79jiuh4zcgyhzq2wmxxxow54st0xa0x4dla31qfjsqneauwdxyo2jkvx4i9bw2cgni8vebku2o8stxchnhkb0pk4v2gyv2xg30n0oa64d1ctbr1eb31ssw9dgcsot7xk3suodh4np57r4z2x6fq6ngyhgn4bhuqwvcjtqnw1t244own3j3x1n0or0vhzk6pqjup2r4cg814n6lvku',
                parameterValue: '7ozrnk1sapscv3c6r3z5woc6kbr30u62a1uxktqg32w9p506dnfkzr5xr755wydi1nh2ijqoduoxngtjacfq10x8pir7fb44o499h2ep1gqy607z0yf7949lape9t07nfm0fkxedqsled4j10u0zl4blgre0nugr64fgj6i6fl0pmyz9002dhskh6o9rhaf0gn3lnzgi6h7mbcfhdmg50c75iqlgg4fm741xbhdsknhrup93nykuq1p008jv1vac567iubx6gdfa7auj8o4ujf1l4g9m6dlcwmby9nyzt5a2zacvfxvhajkggfh2vh3jc19h0jhufrsotlks13f5fbwykvin8o1noavi90n7fya5bt2rifb4dzba2xybax5d59ck28u3wzdgu9n3q3fy1m0pc0ykv8pyt9v9ujr7d0kcipf59xo2iaazvpbjswkxslm366nstxyr6mlnh326g5myphypyw4t4rfxwsmkd9x864o5zlc1lwyw80hszuwdnnxksv83ysmy6n4gzt2ih9h9tqdsnsxpt5td7tlhlqriy45fkiceftxn381wuwzbj9fnbjom1wfejbimewhcv4btxljggj2a2cy1b4hwhy7720xuxjo1shr8q3gq7wtxjcmxoa6ga9v2opz5xgwqqfdy6otbgrl71r1pxj1fpsvavggamnb7c0g8d1pbubwllpuo58hbfmxkogvsdvzfyu7yvkcsl2tswzx8856jakthtkmbf29p7kwhgnb5gc1ozj74p1joq7c31ss5sg52hb40q4fyqkhvh2sjgmd4pi176nrst44xfrj7e5id1okhq4wgrnini9gmunb4txmxekzbnxkwt10ak9dhafoohb0ne7hdn7fyy7uqqvq212mcc86vngn8nn45o5aehwlgd9ndi6dr9a2slofwi6gapqxtbbfaatknprf5qr7h9nj2lusrqo85ta9gn32umvvaazd5zjady9lmycz59qk0banfjlsb7ryzdgjvxchl259u',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                
                tenantCode: 't6105upi1pnazuidqxz3a43potpzwco4dn9452y00elpcli38q',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'urst07g864prqcp66at2',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'nkeu4edrqbxk4j0rcl95hywt3187qkjg3b96sfnyfv9efjjrf41jer3toakuh2t45xuu36iz4z8072jtxo2959n0q0a992wxvxymze8975gelelqqbk7yescll8t5nl4kunly9oqi7p7plmrjskp5n966glm6fss',
                channelComponent: 'kgn5xbkn8jsmcoawpengqz5zrbr06rjykgjokclppi6frd8frotp5dd9xacvqayyyd0xcs9ykup0e6v0j60wufawnup49h3jfnq90xk429srloq4snsx35jse989s80ug2er23gtuev1amg8kqyfbitbhzpzoicz',
                channelName: 'bwrerr8f3k6sf3pr8vz2np9vf99asekk9pjgfzolxcksc9166u3tplozq36w4knfc0mk6owkosrnhrpvcvzksdz97h5un785c88s2o5tsf9ul792z191tvrcyto2b2bbblzd9o8rr0tudtypz6btqe7cjxek8zdb',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '72ane1lt3f6t8hizkrgcgqv0uqrdplqjfp0rp8ogb717l4uc0jy3vy3vgyr6j741zi171fj1iowo5mwbmgzf2bcs7d3xu3zfswiyu35eq12l5lrchqnpzgwu1sibjpyxjn8van45k81ihxwxlztnm50zoyt0h3rg',
                flowComponent: '1amz4q4ds9wbyhpcxqlx6fli1ue2xs9r5voiihxxiyat4ne0dg8j7gexluz2xzt8tms8o4xt1l1b8uu8ho0wr1mun7q10k61kbm2a0z5r2h0htwpfkqgy12p483chkok3wgdhfhcrw1wzzb8oku39tjnjsag3bgz',
                flowInterfaceName: 'luu7txbwzppi8fffu1vnvk14fjie2nqb02xnjeeu5l3560he45ea03ih03obmacrthx591leut2lm1ea5wpn6lt853i9s009yuyalx2e4ruwqqxkfrankwupcynugsodmmhesnba6wcb6klu1xpna3wezpgugun9',
                flowInterfaceNamespace: '3hfy2rvm3vke3jrjr9ilf9t2kzhanpdxx9m04gm0b2rypiv0q77cv82f9prpdj9paswtxjpjk318115do6t1x9252t6g10btnxj0s0jd93aiywdkja77415va7r00bhr9at87s41q3plefzj4z8hvnewmjeluysh',
                version: 'dakvzdouaiii11axhpso',
                parameterGroup: 'b8cevoqa6eqfwswrd22n4r7tm7k2yifphnbul641ra5ms4pd4gi62kjv1vi623jnsfgtv1v6aq41t58dsz5c70us4h9lca212317vxuby04smgszyavx4qfddr03qdqn9d38piq94vmnlwge5hjnruv3ml4flhjmggsfsmnjp2mxqbwztcvqx6ehckuvosx12kghif9m6rp14a8ejao8prngu4kfvcte29yus54z9gkt5r2a5x08axdiecneu1v',
                name: 'p47lyzrcsmgh24731h06u9aytieskeec8rqd48wfg2hwl8dl6zzzc169xnx4lz77mrfjwcbs8gw5h55g03z7sy7hfcynf7e4yle224804ndtendq0ugco6todds1z9rvufjzykr61pl3tjto0npmleqi6ktc1hemseoe7km6mte9zh29xvbl1rk6qmihr84fed9xeehbgnny968ln6svkwrifkn2nxhywsp5s83u8g66ksrhdog9ryvl882qvsjtm78yv988buakhcl4lzxwc3lsdcgfwpo2hqgbmodkc2qdrv8edypatkxezd73pk1w',
                parameterName: 'v5vfi42fubmuvqq256cblouo49cria78ph06idxvld22qlyetso7uqkd6rrlxpxee0oqv3t2dbkk3h4hv4t75rzdc5h7j3hvg5waff0obisa3hsmgqe24jqg7a96myzjvcms5cx9xc7vkek777pfar4d52f0coolloiqe20lm8q0m0psymb3wuw3c5b7tf0rf594o4psy8kr4s79wtgjhsvwxfpbsfel1wmgh1lis0a3l0z6wqbuc44os0ivd1tzcf05mal4qqila3fu3ky1ude02u63q22rewnlskv6i596e4notno9n0kscegu0r8w',
                parameterValue: 'edizohnbfod4zpxdwz8nlo77ig1lbq0ffkc578guwnyeq06tjj0qpz6iz1ct0cviqxc18b9f63nmo6o3sptbg3hh7kom7jium1aif7vn86r34dz4tgxnd6bx0cauivcgm9fhpz61yw3idw5tenmpah9ojxq0v4eepjag56l3ge985h6zfp82u2muzj7i1uww0v8yp4hcd33n5ix1ado74aaay7oxig7wct6wtu4ho934u96erc6dvkbb44gjyh9uc7h99y9sjgsohq9w33xgxsbckin1hlbde80tg5j6lxzcr2xz8ncfi3ecou6q8h4sna1jdy3hgg4gryq5xql52ypn1q3fd62dojr9w3gwbi1fdojeh9lwjudnrn9mxwx957r41rfrgc3z0tsfcqtns7u9ai9up3twfmlykw69it1gkl6f1e1m00lbms7ffa592edy4gcdyireix8vpwxtjzusveothu8refcsqwtmt80gzpy2im98y7sa5nna898c20222epdojvca9uv40s0fefzkf10r8tqxf4m5030uzvflybm8b5aykuliaq7uoovxuipn44qtgzsm9i41z3jwip1yc1ozb41ilj3qy73x4rhzp5aipuxslutgsrvgmjhf2igrn1rurtu2uxs5o3o1fibzin82egh9d90air21b2kbk9qxq190v4gbvi4d9r6p47ycwop2ps397ogtvdn731hl7nmj0do5v3f2wzimkyw27ve86e9oyxgn1si74ho6z380mvaeb7p4c0eyc1orsyts43kp5utt1iyv95mdj79iu8narp0wd30h74i5wdoe0q32py52gxzsf1iq1zfllwtait8j3byv8x85nd2jwxziqp6wdpebhtf90d1ssdjs7442xr6aztxdjrntkx5x2tt63351z48atbh2xs4zezisrlyu86mjy8tsl4zfgoprgkrj0zdpr9st5te6owf7dxj1osmrn818066xog9ptz6nlz7rfbnmb8m2y01lmgr',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: null,
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'jvsnfryf0pprfzcj02gf',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: '4ouwr6tcie8f0co7gfsucc7yj7b0ttyoiyx2uuciq80njk3ush4occd6aoosl7xiyzs84dfz9ur0nwyk9ddg5qzpj8gvhxhvo7lv7puj134tpp8nqcdi5zh5q7p72j6n9vb7l1y13uxlpa9lcevli8ctmf8csyxr',
                channelComponent: 't9346v0motigc6t6ks8ljfo70l0ly9kt85aqsqylzi5nokkrhswzjiiw5amm1lhn6pb6f9y8z7ipohhu6uah8cfc41kcn0sp1yh89hhxh4evjyuofqcjdved4abgeov9g4cgach2l417eiz13bdwvqrk8h0tnie9',
                channelName: '5ww3eacmiip753ezeer4405kkdec464423cs0gbcabz5auo9smocc3d2wgb933hnsci6lgprzl4mgj8xi1vy0wjlkrt73er07ute7k3748t2n6obmfwzzi2hrlpczzowwgjj570xv6eh9coorlkut7ko1d9gzasn',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '2kmf7avohaok0dza1u1rly0utkvsol45igp0k8tl2ognk538ogtwg3qjm2wgg2bnuw9ur8n8jw6blgnkxhufzdza05bh5e8dqjbo1xjga95ysoqm2v3afi71gxtwizn1569f4e24lufc1t9ucsmgihvsmz2kakd3',
                flowComponent: 'nze7shoq3n2evgmrz0g746o9rrn6amj93sbj4zdghzklkq4p7z77c61p9hk5crh9zdbnt205noj4rr5a6thxbh1lwje3wbn5875w5rqc4o6aldqy9z2juo9c5cspn84rxg1ydlren3b7rjasplcan8bfwm2f6gyb',
                flowInterfaceName: 'qoi00aeio0qt8quo97gvmu8ikgbmbrdvuh34a5emkhzdhu32c87gmagllxr0saoa9jpn0kjhnqbn9i6dodm4kqzdhtyw84s9xj7156hv2u3fbsmgtwi5o74i0jsljsc8b0gw1fva97og7s4ubm29j1m5igjsac5f',
                flowInterfaceNamespace: '459do5t32hxqbokozf4mqhh1mqt2whn00ycsd6skg7xea1t1zneebt9xlswkct51kfifbf0vy964xskyh832shz0tktomu8m3x8yn3m3fdmzweqmtkukthu01hyspyt0075no2sld9bq4fkborcsea3t2arlm1w5',
                version: '55lcufdeum5m21vvnz3z',
                parameterGroup: 'mg0khy2hdl6q9dmb92uflkdaijz4626o7xrbe39zxldwsv2dlizezh92wl2qouqnfl69fnvpsbydd58s7oih1e9avbg7ti4ebki4vlcx310bvt6kp4j9x337o0b70qmtqtxj77i9kdbs1azbcg9oq47kajgy94gfwj5wl9ct27dy0wklwhdhllwn1b99f6i1p67qfvxdwf642yuyxfhy989m6fyh0kgo5xtr1r7bys4gzpn8m6g20bpg1bbzqo7',
                name: '6n7jq1x8itz2hfru1oj4h07omrli34mopexklfci968v9kra389c787kai5arkb96hqsoxokwu4yx0m6bjt8gpn5whgjyeaj4ykqwj4lrjhilnh6uvgnwly8lwk714chzhu02oj3n3fz458z2voe02cmuieo4cffqyo3zp6uhd0irc10c9zuluicid93ysw4z7hcd6ofhatfhglpht8m686fpg542dg91h94n8yni0rxj1ny4f0yplm8vkp6bol2yl1rff773h6q4hht0t6e5eqti0nqd4n50z6oqy8javubv3ogosxw5nvnf4mea3ej',
                parameterName: 'j3mkbn11ejpienn3jexamb41pjb82jm88q8txllp93n0jeo07fen8bu0yw7swgqfl300jg97evtnhdbre5jozk1i3y1q4pda6ni2o9k3koz13dhss7nee95ju7upbca2jbshvgytv5n8b635k1jvuawu2apoqacytpx30vp8mv8kvi467w5vnbuyjo9witz8lzndbdnps7czh1xu4efl3qoj3qf5x2szeymd1kcs5rviya029skqzafxtvnyid2o5g9d37zmb1lo5ee7ouzp5r34gtiio9d8bn0qk8c5lcqpd1gxq4042lpdy7nze3z2',
                parameterValue: '6m9lya48ym1go9fdffme9dc9ng34w9f0ozlmv3la4v71h3vek1ttnu0h5p33jn5rtm035y9p4s1rrt8psv09xygyj9ri4fll7ucdiqrm1v0cro0xnen3r7k7fe0h53af0vyjxtimb2i5s349493utgy874b1o7y01wq67cdrzxvmz1o2ny2xplu9j899w0zim91gzezyfekhv98om2bqmsphbhv59zufu4avk1i8s9h6alqi5vnhpp5euh8jy9u4bliav8v2hoi659e9du9x7qg3uh6jfh78e1qz6rtglovsqaui0jruclp4uv7xvxzi1f7j8zwnh00b4wtyo9t9b51t06a5i5rjhv2h1jq857evjznnnmggata06l7wu2tpydpghkuznj3ma54k1t7vud5ot9xw49mkj7ks9hxvltoyap969094m5e0htd1cvcrysega5e1q7tx3f7fu6bz9wwzscc12jntovyuq3376qbtvzupte695975c4r0ftpdrx8gdgp517wjp69mr0xtugkzknzib58jp66c7ezo01rmqwt54awa206arz3u0i0a0xej4ekbbqz3wrfd11969w3absz9zej4kgof7rbf20ex8jcgeh9u280f5pxh2tzievl0wthg23a732rzuvxvjjmly9jwomjs0zn8jgptoq97f8oyrkn8lkulpxm9h0s6ap1qhvoxm67zshn70ufyk0e3rgk907lahar1aqbmy5xgvvtnqfjsw86qf5jf6r1u0aci03vbwtaon6cz9tylti34citcif1c0kivi0qsfkk6mg6cgdx9259dkvue3h1gm6l12x0wl1hfr6lwhvssvgfph5h2ltjhen5htzx2zvs8xry6d3e0ectud7a7z69bv7xsvhz3v1tycvvl0l9c4r5vzy1zw1y6sjzneiw721xeasfs1fyr0ynlbilivk319msqj1ja0v8fkocvxbhoiywciqul1t8ihfugvs1gbvjhwqcgphcqfn53mgpdy3xw',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'ui0n2y3vowqdxelp3mjj',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'ptzqkljsohvvgbkujefj2hrln6umhlopm5xtdd6v4zpo5ahn2wit779gf5umnx0u2cjowb44hy2yu9tp3qm8gmo2i74mzbsljeu5jxri35p357wobzad3uu9pxghcnteaf5gu4j4fdpmkweqr8qr8hpjgikgl6vd',
                channelComponent: '59tesah1npnirqr4x2xkilqmv4g9yk3vwrvwynrfo4csirv7m65pk6m64l6zd68n5f86s1vyzzolqasmks0io6ib0p93imevicf6fzwzvzb60lljzvurwbfbns4kpsh1if47w6bb1nbg0k5nua4h3jq3j8mllo0o',
                channelName: 'x297zwvzsenpenacy600f61cmkskt0fdzuuposuc7p7icyb934o59read3ikhbcw4ujww3aa183jmvfnhg6uq52fy66cc9lu2p60bgh532b0rl7eaw5iccw4r7lbrksj25inwxz7bmaw184w9jvz3w11looosdjl',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '9c9xwcnkepdafr6gp5jvlva4ww4kafqx9b0hiwf34n1hj6hfe8353omvcz91dwwmf1ivcyp4du0odwro34cueqksscugzpf9lz3mxmagq0gdnwstb81p9ipb8udfz36lxuweddlplnyrw92w44i4f1sr53gg6qij',
                flowComponent: 'xghrbve2qv9bgsiooku46tmy4tbr6mgp0ou4dm55m5wstyhzz2wljc8lgoicgaf4v8d58s5m35xoup8fanwpozbeln990izzlv93m3itqtc22dhq2yqcr8ldg26iwfgqseh0ek1vei2kz0d9vtwretr46yl3wnw5',
                flowInterfaceName: 'r4oo79m5phlavj7dtdwycfw5rhbxv8rn58nvheqbyzfka99p7da57fpxmmtz4hmxlosdjfe2ik7iygcc3eudva0xltllvr7u55ivjh6wgfnws9drfxb994fckoa6n62u8yk44ql7x2vpw5clyxpna39t6ok6uj43',
                flowInterfaceNamespace: 'qkzrx2keahxmgg8192k8pveahj2hbrthzruboqolq492zw70pkv3zj8e6cvn28d0z8slewkybqh75w3vmz5wii4tzra97gqizl36t0eltb54okfzoy2ywwi8y8hfusy9x0z7z9o3dehf2gxwj4w2kbeuas5qr9sb',
                version: 'nlv32okuji28zplnpsfb',
                parameterGroup: 'lznd2wlgvyuq6n0xqyvdv5rrqjgf65w62cq4bu0qkoruby7h4w498ujvkj20wuuqcykvaf3l2rcbiog3lnuta9vpopk1hne3yez6j527oqw99heun8h2e3ty1qv28hga7r3c98rzq10q0rj9tn64p3a3zksevefb700ulvfj7kxnqhn6rpuw630wkf7llgwplyyl4do14hd871otv7k95io1j3zcfac4mgodqdfe41lfkdjayx3oy2vi4akr3a2',
                name: '45n82fm6yglmhjuc65mvvftbmbg7qqqa3z2025emjfjql7bivv2jprum2m6d0npxi01mziyabdqq4fyws8n0ix3tmbvasx1hm608ozprbbuvz1kr3cdl4c8n1125zbqxyxnry36c0ug2lo1hw77ygkzvtsd9c0z5jjgae9ckd9mol5nimcpezn6sv78nzijfougsh2qnr9bt7kpk145gxqds36bd9xab605g19oijncnrmg99echbp61wwcnb7a2a4yufyqkbmdax0e4ail6trlk0gbm5n60twapejfzydpcyllvft7foyrdw6csr1hy',
                parameterName: 'wsz0qq781l0h6k9x2qaz3ert98tji9c5a4hhd2n5jtx5jkw3l6awfl7o35ccqwoquuvzjn0cwwhi2gps75r8atyr11tdvayl0u3lum82qsy0jpgq5bmp0s43h0s4963vyusq4u1zymp16t0hbqhk8dnftc8ym632ij8rnay8u7jjr5xt017js45scuiv2beknmhvfpyn55ijnvw90zw1ynj47hma0kqfwr7iedic0r1wy5pjakdkb1uim9sfeh52az3oy5gbcl9a8kon7sur4r4mdilcuo4hiv6au6sqa8m7higyosx1872ww4drxjdd',
                parameterValue: 'avcmwlol55v5c9v3iimunf3lma7lcmgiouu0ugit1i8vwmqf1pnqglzczphong19i2x44ssvlfx62adiyjxgqk0be2gl46bltg0wnuxkz036qgnabejikke9mtb5gz4ay23bow8gwpylx1aysav8betra6gudth8wsn38s4cnmpbowvc23x77drax2f62zjnygpd7p5p71wfhlim7bhh2bvd6d5o9s4jf3pyokhn4qx4b67574vkijhfg8q6dbqe592y65aflvfh87knm2ddantepiqioxssiq6l7nw1zy18dds6i2twxu1alr7ln9jdnvxnep0t2hrze0kh9864r5edv7xer44562fxgk1j4aq6bd8nw3ardqi1ak5utslwh90mkp4c6j9rlifk7h8c3ngbnqi353exrvdhy9zdvczr09b1yr1s4flnhgifw9ki35il9qjxu4v8idri68s9yfipakz4mx1962el1t7ukxuuuqxsca1h7etvj9l2kyflvbromvcyx6ho4y13l7sxm02g6dc2ciuzk60trt1ei8km5mhtp1s6oexzvsg0cn7v96fag1tohn9e0vt1vfjrf4e3e4vksd1majb7q49w3azyp3om6qk79ek7ve1yos0whcbw1u9hshs1yva1q7izm17m56pfosnawcgaocdv8jzbk3qxoogss2c5vpt540zehw6chu9mq2cbtcrh40td00y26cylah5e6e1yuadxww6zif94yqybracz4aa9mmas6kle5an9utzwgrukfmr7jsxkrcii4kcbg02w1zu54b5gtn2ffelp2wxkkihtc6vk2rvb549f48ce0xllqfnca8swmcllgzstgasw6vpowptpsdr0kiy2igs88kebjbvmcw3kppd2e1icxcm4tj4bcbvzvd92ttfn2vylwk7ds305p6kczfz9ylx6szrkdnzxt01fitjia7nd6hsyeyasgqt8v4ldg1kme50yxmlgucnwecf7xooc3hgto8x5no9z',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'nw3t7rebq9c78280qc0wegn0ieoal3ttup2f095bhir8gbtloj',
                systemId: null,
                systemName: 'pxuyde77xx3oejcrifb4',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'vuxhxijqogcs18fwrlu1f0f30vagpwdmrxl2jzxhggdy8ojj1nlmc65atxgcnc4b7jir03sg1jhxy9oocmzz9y678cjujxifzf5aerzjzr9iukp509ojwdvaq90rusvgku69ga29i289uy9cvqgy1id479yqpfrc',
                channelComponent: 'wehkp2b4ybgnkascyi51uk0kutnocmb6nko4l53uutkrxoge6hdf2219legyb7k29bnrvcmurghyspnr0vwe02ohfm7g4hubk5wsbkxp2fgcvspvdhi3j2u3s8fj86omm3i3xjnn4zw4neud75ei0xikyuxyf1nv',
                channelName: 'b9zxr3vvlua5j6lttiqf9azi81vk24j1k3q9jt47takzey16zv2btij87o04ig2stsvf0s7xxg6qvi5bljjhjao8q4e5625h66ffk6n393igmwe8vl3m28250lla8banstil7bj1bbxb10ndpsog4ebyj4u3wmb0',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '0nsi1pblzvvqlzpdcxqludn05h6bfpppzj89ldd42gpt027f8dkx9rh91x86rc2yrx7v87es0pl2nww4s6ie47qg2a6zkr860ufc4zyb2banftyvlszld3gykyf9cijv7t6zpde0og7ky9wijum7curohfwrxv95',
                flowComponent: 'xuvnkbt60cnrcu4c9jv7idf6muqacbc6venlg0dg25424x017u6neveo85bczgnw7xhhunssh63h8iaabx361m16u8pdu8nfwc0nc67wyh01v2sjc5bnud7ys3izdk9oewowkdgb1kxnu0jjrjy51kos5qxqdmss',
                flowInterfaceName: 'on5h39kthee3o5tqbtdt2s1hkv665eb9sfzvdqd0oh07pzdp0nf9pwj3p9eimhnfw7e5yugxxvsamvkwclge1ccy41deo9t4xbeqvbnhg2ligid5og6j1mqck0cdun7crs536kb3h9b1tnl5f2j15icw1ko474hy',
                flowInterfaceNamespace: 'x6stavj3y3z3v8djxayo6s85hgdott34d85syim2ne9gflgiry1nwrkleqt0e7s1gvhk7q7f7h3lal0kqgsg7h3v80ggpuosas2tcyqv3h5ayghe13s6g0mi69zbztltyjkbhu2uxmkilhtnobn4nsubhrixbhlu',
                version: 'zdnlw9x73nrah6eqikel',
                parameterGroup: '1bcxlzzszebg9qf1stknymxa7b6j6bt4hdjuu3afhs256li97og6enquksup30d7lj91pnwre6ifffydzplr4ld86kp12ye6h6o0jd70aht4h1g91lcekixxn4i0wmubg0sasxijvua1cy35nma8zrszst99opd1fckqy6w0ff3ph70rajmf6h0mlp5kcr4botswnxvaqfi5z9xsb5wyxrbfm650z56armtgjx17w96mgl5rfrb3ujhmqxyi8cv',
                name: 'xdhsei7orfs5j230gmuem63brbafx8wpldrf8ie8zit6s9zdzegr3jqzae3f2jlo3bwykr3oq4m7kbjchevd2d59fcgw6an44qfyfbzjup4gdu7if4fz82vnz849tr6eo3uzc2yyinvtlcfoax9nnq5z4xjo2dd2a4hf3qdqyuvpyk395vw169re83g0h40v43fs42ieqjcb3i0borcgae0x2mlavbpsjeeabejv3hwrcl5c4tlzb98phwgtrvy1ec3zcapxca3b31udu125bnmjtzeamw8x6f83qfha2c2k3svylvzpa26dhv27bl8q',
                parameterName: 'e36nmufv9mssrfi2ichjotmi85wziym45tvwev2qw3yl7zfs2cwy5gle4rjd7gn65njxizqiylljrfygvpxk9zc7yq0hz4y281yg8280a5yxznrc9kr8p0ucbtfouozhha3xntok2hlceqe5g8w7r8y1ygmagvbjlvgo4nv4n3feta2u5r7za7t1fnrfoq5l7i7j26jksu4f8l3ldeefkyvt2p4f6zzg85vepdd2jj4tzkapy79r8wis6v4z3ijxmsvsgmuu89eisg1h5gfeztopit3qu3032y7nek7pcjqevp32q036smtl3mfqcsty',
                parameterValue: 'ks0m87bdjdwa23jlvpoq97qskosd1r3xpt06bm9is3kx8ngal3p9sk2lm6hqlcbg1j78nbk6arjfvqd0jlofyq6mruffdf2k78ednj2ziujqzvzz1mz644nakplhx4f0te98uoerfdwc4l4q6cpbdf6bdsyn2dkel96ijrap0stqizg3pvxoahz8okflwy3o27sc7yhoab16dlimfg27b953r29ohow7lxcr2bvotfbbrr8ltusgvgt88cveg5oo1aohoq8zxkb9ohdxck66u77fypm8v0j4mot8382prvuxcidban6n3y2gor9nfr5o2c3zicbsmf9vcrjpswvhexu3uhtod6pt7xr6axpc5urvtorxwqe4p5lvrekor816z6bbm1oln15d2bak47cbwdw2lb0qlpkwglm6kg3nmu6hncmlz3jogf6hyknxuj4xitpwt6dn8sr2rkpbr616lmnjxagk1cm8csol6ne9o1j5eem0u7afkncizdir34h74a4kn4iow2pm9vnnoxgg6tdqd1h9yk8kjwje6evea2gfhkn64yfq9slk84gmgq9cfxp32mik443fur0ma6l7rjb9k9g5eu0pww33da4s7iy0l2pfj95430jblodpz8bqukfjyqmkyb516ohe2mlav66dcsa3lndjqsf1umga0wp6bookyvz4ulmezt95jih0m0rnfo2n49f1bsssmqgg4kxl15wwivczkpbaq7uxli9dbpcwfinor07zddt857kcbj2j4bq378ayhjr3u8dh1wt0zzx2oebgwxjzkkovxwqa6ueyhfu3ef3v0rsi34857llfxoq7hi3pexc5x9a2f7i81t99s6s48hry0d6pr3ukvqczgqhpdgmr2cf4iyasynulba75wsthg9sjlon6hbvhhuwkbkhtqradp9ymniosnx9bpcly3tshm2jtca40mprxu76b3sxq3cdpxswhi5xap040ythi4jxkc3crbk5uahb3tmodeof9bjdm0cuj',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'gv9a4kvidvv156w2l4ebw2qm0g32qyoa2mni9s5026lvuqy6rl',
                
                systemName: 'pay1785r3lf7mvv16xgb',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'wz0ltr1wysw0ut9ocfpxvfxh1tbn5xelvu99lycuqi0n51eqawz4m8mr2kbstgx06gr8fjyl89yourvitg6ltjkk7zunv7h4mwmyo8y1mqijpjf4o3ivi8rqjaq56edaeca9an0z98sr32hgz06wf00ctc5lhi4h',
                channelComponent: '33y81dknk80jxafi5jbrz91ox3ceyiqyn0miln239oos0zt3sbu504jtlkl8en5bgho5fx6svldhy9yzia8qqoxgbavk13i522l6p0g2kqknucy1ha7519xkx9yvuywa0duy4t32azsiua0inhyuzucxmaadwlr8',
                channelName: 'chaw2rrlxwschm2sefky7nekqldxcam0js641l0gjq4stxdu6oacmwy5zcfvepqmm5miu16r0mo3zw8n553p9h2y8rlw3gtla6c2vp6geh8ti5ox8cpgxupj5xgesdenqw26gd2djxkpvfe9k66k5ukapxrx8640',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'uagg7ae7f2lg7gt8uckcx1nkx4v1qb3zbd8qv7f4b4c81fn970sqs316c2qv4vjc8bchfzkykuv2pvf1jd1plg62gih5hbpuangoeg6892cr2hycfrzkctto68uuarhcj4vusd80z998os4vqdsety3cx3ro3rry',
                flowComponent: 'kvb1ib8xkhy7rwgdae5p874oa8tmieasly5w28t066ec1zpqcpsg5katw1iqhorvugxle6txcwlnp4zlpc5ldaqs1fq3sncncz268l44ck9mxa481jm6u99i6w5hw42w46i37hzsm27xuagql06lrrn0qg1r3q6n',
                flowInterfaceName: 'vzc6bkmfphvzezrxhknybq813ybjng1xe54p0k93fkuawx8xiciwc1df1v3lf6txnqxsh0m8dfgm3rwx9r6stfdfca5tb16ulba4ax9w8di37fxi0w1p9cl3yia2p3vu6bt44nqh2tpvuf8judmbpmr8p8z2qosj',
                flowInterfaceNamespace: 'x24ykkhjo8dzye1gx8jxoubbyj0nnxgbpzsxk16oedq42rkg1ls1it9wkllsmj5r2uebugn65ho29s236a6cn1epn99bffgdwowbq6014tydtozqtypvta2tsr8ckh1wxxnbje15revuhnerz0vm1klabs6eud0z',
                version: 'kopsvtt4w7u9ckxck9su',
                parameterGroup: 'ilhnrl88p4qfgg7v419h3r4gmfj3rrdrw5bd8mo596vt41zc67qq9gd64nx9x78ul2dzjdisx5m9r9bf5kdubyilu2xk7rhoam8w6h4vrr694p68tj4qbbvej61bwcfy6tp36ylqrcwwcmmn2p60ti3qn628k1knze83w80jm5q3z793p16fmo5559ag734whh1efphwfhg00yb1198a3i53d6f91iz9o1zr3ptmt1l5w5j43utmnhho9mxdad8',
                name: 'seiifub7svdhjqrpkspi6trq4zbbiwe2tll4k72hg45n45kh0p7yciobsovvcl0l3wi8d8kzfk0ktog8tlohf6flxnkb8ymuypgp50ovjpji39lcp0zvxgdsqhu693eismppaagm68j3eakhfcxgegvyn3qtlpuhioq31ckosb6yt6htjc5fje3n0ntcvpoiuo0plnwsbprnnv8w5luy3t0l8mitsdko2gbo5u2fwr1tmled4bl8bhmyu8mia2i6czhfkb4e7eszyennwz4x4sjdubqz7x65328u7cq3u7750kvp1s8j5fouxlxx6dcg',
                parameterName: 'ymsq6rrydligndc3gcwiuysxuv4bvbpa7m77g62ibj5xpmhw2og79021xyz6ig0ukjy45ecbou8dq1nfkdurduc6qo7poehfnywity2jdl6xf73iakx5wj17e6so1wpq4bu9eruad5bkn24aihfryzqpqfzxvvpbb9bhaw97wx3jdhubwn3vjfsysa2xcb7zfmuwxjs7j7fc5x70tduocf28iqf1fb5iiv6uqa8s1g8xphm5ndv7qn05wkqmne597mlkwmwc8ojjils1myrcxr9e1mlf6oz8wb2oamghv1xng04qign31vqsuj84baof',
                parameterValue: 'z2fuedxhwpoxj7pznd14fnrxhu0mk77qfsbs8aqljnsxfalc1twz7ysxsqp7m0as2prbt6dqxbs35nyimup0eri00uh3ptbhy93p2r5ztq558tl99ham1m4fz9267jdlzww0a9quaaiqpnk0ffosz7y7vn7hisjnxbu0bq6hw35fgf7hx3dwgr4k0u1p56y96q037u33b9nfr5a4ezu91i3xl831ib50drief4c88pbz4vyehxgksdt1bmpas146y6unhuz8c8p33ly5e3uvgxfjrf6tmfarc4czh6rx0i9l1o153m87fe39cq6wmk8k6bcrfe1blb6e2ugniy6f42gylvdqd1dr5nw8dr89jdm1lq7c1fjiwdmj6g4zhayk7mej6zhisf31oal2crzzpuc3yf21e2lqnsgdizgxfaawb6lr4ff5661sl19u1rk0ejh4xm9mdrs73xldtep0jcdccg07e68uc1wd1a1aoums8vn6e8pty8jnmo4unjb8feuhidclrg4atnza1vzrjj1q073a0ynn9lo7uvv9kaav02zdwxcvrv74v0251tajufzsec5kxo9ao5wy8qln3155lcpdjnqflhl26upb81gppzhk5k4iojlh5xjv6n14qkq99ps0ocgfpqt3n516x9mhv7wu6v74zheab5r60xgvw98pe5d737cg857rny7yst6wmkczqdi3ak0hlmwcap8nu6ruvxr8echpjoz8z06h8t15snhua4idqxbgchwlkz5j6dohkzxqa0h6l0zc97akzcho2dpnrklppqpf7mkzzsi5vt2sys6xlt7j6ocqm6sqsmfmfftbbo7m81eh50t4csw842ow2mpjz057bsstkblgtzqham1pwry3idrtlfeojb895ygjgfc9rnkarr41gxulfyf62tgpapjhtbr6ik1h1cyy7ukpmn5r508ao8ufkc3qx6zqn2dxhpf94gujvtx7mx2zscn3vz7k37ieousonfxp8dkrmws5g885',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: '235nbvzoqi37d4kjsy63shbwqibv78io7a2r6ret5qbjefwebg',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: null,
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'qun24jox9sw8d35r7ynt7j65kvdtcn46kwyazuw7yopccri5o4s4twcmahrjnwznqq3f2a7wdeekm322e44peg2x7jfwydohpcuns3kmlqwumygywkm406bt3ysffy2gba6tsmn160lyg3hfcx196yihf9b245g3',
                channelComponent: 'zt1ldn4476vkjgmo1a1c4icheixyfgwzisb689nijl44dfpkcggget691s5b47aaubk41l3l30oequ36p4wvskax6z1yj09rr5m9zxs7yw92uag3q5pvol42qlvz5qkzldgp2qauzzfn2781er4hf9wkjehifej7',
                channelName: 'un0fw59uqlmi5gkw5ox50dynzqpo5pu2bsdm7ls7kp3t6gtvnsfo6bb5tge9umhinpj658win4xf0a5hkrus77w3uksdcwl9dij85n20n1n9ig0bzo91op0z7tnzl9eom64cnymlhrgcvb6mgzdadmn8p34iai5g',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '4kslkl9q94awaw45emzq7t9ir4qpy3642is2f2jkzzygb0ypwg9rd1vdpeexv66d1702m2gwv1j7w6hh63fmv5v9wj6yay5ix4e8fyjtn5swhgh1k59uk1eu6yecjl105y8ltykf5haefk56dm3bk1bfqmhqt0z8',
                flowComponent: 'tk87j82zb0o35wgfwao0vn2fuhq4dfzul0ea231inrju9xntvqxyq1w9dj3bsxdrdl3wt6pl6vcpn81tzh8vh98ywh4cz9p9tdy5hce8tp5att3ueflmg26ms5ptok9ze0lzd4eca2v3n4u0lu7sspzwj1uijy3f',
                flowInterfaceName: 'o19k0jsvair0vbp2tiqprdkydmrq2asgxgqx4um8e5u3kyf2w6xtyewrq4vt53pootta1bznebot0skrolvfkmc5lo2kz1y4ca00eddewywwbm1ymrxho20jzijo2lqazrsbumqfdmujg9dz6itcqu09rv945tuw',
                flowInterfaceNamespace: '32al0kg5il2k2t1gzpjffxa6fiqh9odlbk6tltu545jag79o0p2z9ue66nryt68y5j4zu59ydh32zodfkqat5jj1ikx6e6qrs9vlp8f5e8h21rtlg9gizgjal9l2fj6toctg5tkrmw08g13pohpyl1idebu5menl',
                version: 'dtga3t8sqvc7n44zx48q',
                parameterGroup: 'tsagziu33swnpw930euwmk5pv04glqg90taashfc3l47fnvvuxvfly92wiiyfu0vva8vyad41hg5j214vwnfh9igbwyqsj74knfi0jnllezmou5wuhsyp7raofcnrm26vwjvfnhpc642kuedl9a18rnr19te28n8of14mazgcx00q37kvoq7y2e3rx968pweo13wxsoroxrqje1ia9fktk64mtxfb2ajc50fbhby9ves7us4r77gmzd1g4qcfu5',
                name: 'khxkoe7gmm0c96qsey37te7bypcrsybpfqfbmu3tvkfzgenoc1aq7ply1cp1bzfpo66s3dforsjnm0qvcf775x4mzak674g8wy93kj9bskvx13k1gyxwc1l4898i2yj8m16t4zgux2zjatidpw0ayy9jfkizwwkrw4sdf4n8wcs0uo532ogdjacnxfpacp38x91b7zc454ddjda9p42ijtl4od2lyrr2kftotxyw9m2qrdtmxabsb67001qkpayilt3qbrie9wbm96f0k5hium3v1zq866v32v09kjya2icc1djjemasv3r0g76ww402',
                parameterName: '0pnu3las062dikxx9743gyt57b0m77p5l61py4hvx6wnuj0z4pmwgfcg8sal3fnv1qmhtp3x53hpntvdb6ks7wmwd355si2khc8sz4jhbcmbz4v8ay9t1zaxs82hp3zl3ubw0bfiwzj8zntjddjtuygptwwyp9nvyxm29lrvo9gp667wi1grv03ceb3v2zdq2ubljvhjjt8z5nb7xqk3soksbtl8k7aley8mt5w9szrxje6j7tzf1bgwep991vn6diyoknvbtsz3udjgezuftsfml94c5y2p9x571jzfeoy5d7st60txhp0t6zbl62py',
                parameterValue: 'etlbi3cn9qpkuopzerx5uq2ytrxblog0blxz2x9yypc33antzwiw1embh1caumpuyx9ni8dyujrkeqe8l0v5rer78owtr4fvfw5tr2u3zx49h7nwwozqhw5yjjm5sj1l1ohhnmo1ezbfzvb5ejx9cak7ovwhc4smzj9s6oqubj05i0632ja39pbn8j9p79kpx34rqc9y4txn01wqiwzyxx3p4qub1wkfc5y55i2adk3obq73fw8k1dfidau8tfx88j5jp094ie48tsx7reyermzm804rmoa8s8gtixdgimn9zvf3qw6ydcz1j6bkfshg11wg2fz4646ta511oy28op0evc3znp0rmygjo11sr7glsu0sz28ztsfx2qbsmtfjz5tnjed1r3rpa88oddvjvun1s0b3qbgok6atvlxq6p1uwndg748c1h9vnxl3tfhecq0bt9xkyd6gjutbojmf9gin3kts156c7n02ma9iozrqkyvf4s2voq8x7j26kj8nuzfa8jhl9erwf9fvediwcz9nqs0k9bi04q71hd2p7un71epppunpyxlq3p7imdn8burmeyr79tet9c17cbfsjb0jcu06alasqohafbyor5s58ye7vdrkab7a0ksbsbz5r9zba54lefbz5ei6q9l0fs6l0un1dclpoki8b0tqegyfdejvpd12nsmj8zheulhfapo8bsexlfu5l93enyolqd5003pkla4839raql5laopugcqapbfth10j2wenjbsa1xyc46kcbwdctqko4kglet13d6e7wipfpfk24l6cckdianej3sts184yzkqf7t17cbni7u724yvjd7f6nqy5qy58xy3ffxvpga9bo9qfl0zygwuagmk0b3z4uniti4kdd18i3rlhehvrs1yshsiw7l8zl7szyjdlls91u6juzoy3jzfh17211wc6zqrrm17ku5ku5katfya30nxvoeho82hqrn5w3ilbrhavwuvdicq1h8uh2kgaqlq10w06qw4g',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'd6017bm98q4tq8f84jz7g7k5gxwnmwcp3v220kwa4wm8511s9t',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'umakmd5i1rkeo2eb28tcr9tm1zp9z1pzt4ewvhbiyylnn0cj9wy7d229d0zxzmy20pe46f2e4zynivpsrrqhipin99ju4oma795yrocodmll8abqo6p1xqjxpdx7fter8imtp3g7trv7arnlewrubz5bg7wvag0n',
                channelComponent: '0y0rtgme7dlgxtsbsqh0xfun86u1j02byq77y3xsz7hbwlfqau90kfzzcwbl9q5xnswdy740vgpnd6yjz6z856hbl6jexxyw6yrsqjdk816kxg19j6098wou33k3o8t9unyhjte3i4ni5hs9hj8d1h72ajrz1cif',
                channelName: '9c3yke956wrdh7t9fxa530i00cppjekh0plz3k1ljpmocwmy01ghrvpdiwhnpr9mjs48cl3h8mx1iiuq0d66oi7m7kqhp5j1x8gmvbwlhxnwh5llbejejf4z3asaaml9ykhwu1wqvfwachq1j3v9r6w6wfk9x8jn',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '1n6ty13abyk73ijotkzkyoszklqnwgy3rh4sdm8njt9qp2otb0e6eifxp1hyf14h3rqdexnz2kuq828p3ec0vjwq66vcz4ee5dnteq0tcb52nze77w6usvud4vm32n4jv2596c9l5ygjoulxdpb9vqnnr05l5d4w',
                flowComponent: '4jmu5kmrwhhh9g70nw2bu3tytj8pe2r8f2ywc1xnjjn6p84vkj3i3mom99n6yljmth44e962ex3jozhj47erxgn33rch3gk4oxpxt24fu9e24m6i57wbmrknoctneeev457iwl8hj8fptcuitxzz9kgltck0uq8r',
                flowInterfaceName: 'vq2x2xvw6wyv0uwj5fyucce880ucgaedbmhn405fsxoiadectrbwyirmbal2bed2ulshp79dv3gc1l9jnhnio560bla0x33p5f2ydgu63xc22kuvnm6146uks09k4q7p7sq9pwkuk3nvgkwxp77o3swiru828967',
                flowInterfaceNamespace: 'hkmale1bi1ssodow3tusr3fwfw6mi4r6zdeakrn9ui02osiwexnfca678xd2o1japzr40sbfjild22i4b4pod3nx456c5dlyfhn14o1tlus9ub8a4m0gs0cs1ozs01nsoqsjndge4ym0i6bngk72rxxhc3mlj01x',
                version: 'mo9wa950odp5buo551n2',
                parameterGroup: 'a6rtf80u97na8k5dkkh61466p4w4fszpgq5e7e9osoxibf6obbh8kxiz79zeb231pj206h3zjp2gg028iypsvw90dcdi7cqll8k54s4y4ocp8fulnr0p4m0arvmlqs5lwvooyc9a428wogvelr7x5m5ypo37uv6yl4x5y6avjxo528h8g5tun91cofim8l7g12zkf00lwn39g1ic7w40a32ac9jn8vg6ypfwqzevmaxcbwim75haccs7c5b556y',
                name: 'rwvsm5rvfmktnn93q1q9pq30royubzf1591sumshx7r3j5bvk1ppkyi63bu99dyjdqju88dumphejpp4zvxtf3mwyg98utgwdti41thgmxa8l05myslegohpozp33cuqyk7bd4s35tbpcdwlit8hw6gedhdd1ju0a67k2bfk60b5p6af75tg075u3b7jznqpz12x6cf7hz9wmelw4876v5bt6c8kkiyw3hsrcs3qwyikihjs7ebja7lrkgui9wu876m0q5zw7ckop74or6l306ygahuiuvfb2dv1wagfioei17eejfv8ud9fokfa0vbg',
                parameterName: 'vvm1nwvrtlvajy5qebztsv345vorb6a7hbi3zyntuef1hyeanp6hlrmndyit3umhtygumafmbrfdujdz9sauijfbgor3ctrt47rfr4xjgzc65vjt2t2z5x9brm8xkmdckj26fe9pgcf8cfkjhn2wy2tbp1g33y3ehawlzfanxwk33gzg4x2sfaq0vg3md6uwd293vkk0x2c23qnq09y58o50h1soolcrisevau3opuwuo23kg4tfpb0g0ycx9ks8j3lf9mrut4c1sgoqrquxiu11wmytgd0de1ppg5uruasyn6w4hfkfgrwig7bqu5qd',
                parameterValue: 'uo7695o57cz0dh9gi7ub435kbhj8dz7yvtqfwwvso5i9jg50ewlmeuxtq2cw4lwiipv62oxmn31nuib4onjucrurj519n76fdc82tvv1dtnjibt87tnyv7cvvv3mwzhssl4fz7txk72g7wr0jl974b4w4r9sv9ouh8r323iybyzh7lpbxf5oaurra17bnylo6cbxl9opu0kt0bwlj8bvqa8xsth6ltsgjgrr8xsxvde9z5uqu1zvgty7nja4zrej2ytl4mkku31dmrgz6bztnahc74myjorky5cuy44y1ct4obnyhxppyra2gryav2i1g0qskkxa20admvfypkzb3yzcyrusq56t39dyy2eh8cy19u3oemc7vg7barq81ysr2pzt9m4bh5xwhyaq50a4xm0e5rbw0149l9tq2sy6qg9ubmbn4azsur7fpd1po2ht8y7itb05c4wekb6yn1guhzvvgrbeffr4y6dya4mya5yc04bfao3agvi0n4kivak1s3zl8qjo1cl09dqkd8e9pur4foxmhba3basc28q1m2674rsvx0kvdrqx01ynma98tgl5nx64t8kohg7dn03wr23qzzmubysyipo6dl7npocpxspt1s9ygs8ngaganc1ws7dgjagc551275sj54obwek2k1n3r5vumr0ob4v1ojvw1xt9zflglxsntm3lsdlmndw0ab3ly9kaw880sb9tyhvwkk3xv89au8qs6qljs3afggese9kc9ji28hhxls0c2nd1852g8ekkznuv4yrb8k6966xpmhit7paer0w8po7l9qxkwz04x21c8lpfgv9h6tbfi5mwv0wkof5y92uuiku51v5y3xms8gkrig64m9pvrxdqa6foxfa6647cb5j1ygkfx1bt8z437c2820ozkwgceu8lb8zwjalhfl98n3onlozea0rp0o7e0ydm0zbwr89hzlet326zyug8qt2efbxrddj1cs8vj5ica758h1txcp8lpf290uajv8m43chv',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'eympjvc1h036i502fnmac3y68of8wpju64yjxfo0zutyui6g7h',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: '9sbcus68ebz8ey7z6i0j',
                channelId: null,
                channelParty: 'btavj1jivdnw89t62qo29obx1brp4f20n5lpr4uyvx3sreq74giychbyjctis4w0x5yaw35ft13uatyec0ytkymucze9otvwh4m58okqdq19d2o4n1i4r6wzv7x4naf8ey3z22ipnf5u93e4nnutcdl2v5i7nmdi',
                channelComponent: 'buopqsobr9yb8zr2ahaxepkj8bj85nz6j5liexwa2pw47k7ydu9y764zs4f55a1bt3lurvmg1zlojca8i6blhpsh5d5m2zve8azmlg4vojs36yx14f5p22x4lswbz3ddqvj7ziyurbmywxl3r6wi7yb8h90i96j4',
                channelName: '8i593wd8lxkd9dkxkpxwnp23vwqkldl4iprftkcmns66aj6vf2enuxbxjvjqwbul954199dg492pvcum1izkymjb45s274hen1nmawgbqrs9yn8bog8p35t7laah7l71jadjmcuzmxfcc7jghmap5ahwrn7xix6n',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'exv0iuwcojprq42e0x3jdi34n3lbes0s58v1x2yt4iaz6q5fxk1r3tq3plfwfekkti66qz7xx2s0iftornfb1pl1ptn6rrun67gdf781lxw92me8ffs4mubhn6xgs5a96j62gl559llndm32496x8fc8kwrwq5dc',
                flowComponent: 'drgs6q33esxlww559ow3gzlt3uyt472spjj93x9z389nb5de3eaaj0fsuk9o7h4m0zhnyqded3ykq7rcduhg3ne3odigd6tqdq586bcxb3ugenkemm91jriely0uff3nrdcsnlwg6yykr8s5zubh6kmyaw1g48ke',
                flowInterfaceName: 'kjcv7bfuovfhvzfityzy1832g9zapwi1cdwh07z5uwf6ff1sbtttw5r5vgb8jch96a2km2jhct5989dylj8uyw8z41atr46zvhzf3u1hywykwo7tziucqsfq2zcan21tlit4ds1bubopfn5c2ngw9lxu68qaxh8n',
                flowInterfaceNamespace: 'k2c6y9vhoxvlx15ujgz4w1r5ofh7yxc7qs84lz4n77eelb69b0x3wz1sgs37fg8x949macpkrdh1h7ww5fgcrvu9zr78huualu2baqjwldj3zj5etvclznaygoxwlswtiwne6hgh8skym9i9depm3fgupobplryv',
                version: 'o358k4cgotfymagg9rgi',
                parameterGroup: 'n0876ywh9g5rdnz53acrip2tbth8pa2ghlv5i4y0y6id4q1wqvdfx33xtwfnwaz27x9hlifphctgqcut8pz30ze4mvcf0zvjyi4za27a21vabjr179lu4c1rbelgm10arwu8bjjsfubda8sq8bh77eul0n7k1fh6fo6x4c9o0ydblxuzk73z71nt9364z2vnk6x7wpfxdtbdi3qbt89ag6uw7f0re8cb99y8y6xlwdufm79cxoddwmwme6w10hi',
                name: 'kmct2qliv90fxf7a3xjbvmljrpvdlbqzpti97g2udg3w8bmorlhf2zw78ryf3gpk9vqizntck4ssrydkn107jcqzfz1is6aowe835ksxrnsxfvmqycoe61rt0yx5zc3i3idztow2mq0j0oebi8jqcq4cvdh09udjae6c7n3ch6enkcu5uafrehw3jk4kak3na6lhay0gfc0cwoxol4paa4sd3swev7h2seshvjwj51duj07jyjdpyzm7h0cllzf63z70fker8vw25kxo6ggoc3buk3mzijqh7avqf07j7et78j2xhqdp7lw8i63sayyo',
                parameterName: '2ev8de1b0aqrxuybmsssw5l41jdxce50sd01jxwnpo7n4g3b9uyz1ieg2e4ti6wghblk78rmzc5icl5dz79z750dhnj5gjyj399z3jhppksm8o6ea6au40si0v9arkvg0cnrmc3f1uafnv2kfv5qw470mrq3sbk0qrra1rrxzd8vhxp31pkir7yvtncp2y4cc88u2bc6uf3indnb1fdsamganq7sana3q3hqmhpj4kdqewtiq1glrdd7ech3vqydauar5gq20wdp3axqd0hqkg9bvkmzbt2rocz9228i90g0xwupebm7q1h6ecgr2nxl',
                parameterValue: '9c52tl18bkcopf7yy3j9yxw9fsh6349hs6rl9rrg5tpppt5kz6wg0zxxq1ldwj8nsyr8823vdnmrzy2q9jyi92q13975b135wbyar0cas9r87dpg19bunnp57c12xoh8w2g189az5c2mfr1yhq4g4q8l0nxcsslubnu5ch5y2his161kwxgmuxqoz0xmnjj9eciyru73ow2ytyy8irao5f7s7p91ofqqeiimdirlqgkd47ppd8oiliqu7rspoqw3nh5u02emc488wkotigny9rh56x2qdq6gonvx02mac6jk3frgyq77nctmy43qy0kq3bfp8b1n0yir8jgi1wppcfle3rig3c7992472gia3g1mekg907qmluai2o1xoigw0qikikhk3hvqcdv8raux980pr8g2ojduyqymhelfcac6rx1g8z8f2lw0edi0ftum4azubgy8fo7bmf0jo1z4yzpiks2hhnknmvl14xam0ujpxyticpvp9nto8o5uqqjlmt1hpu53gpbquw1jyu7v8qwlonjitqiqkxdwoe90prh2ts9s94am1etheqi47dg7a6m6nq3zlq37ug8parkvxy7qwjwzduxqon6zgto52a6gfksgyb6fnpppg13av3lc9d54vj6igk06f2atqe6xe8g2odiyjor0cyyjbdbvzbi8f20q4ds6z1en5qnophvm681llq0c7aux5k45uy1kcit9oizwyb3lw983atttcqsafnz5cpc8gr0pp2k6wyav7teu2hl1tx0p8ojvmhbodwsa82n7746dbywpbh8kjsoxyf1vsrmlqruhxlddrlwa60600q4ywqx7cjvep7qxtaen8swv9kszd1d5eectyxc0yyjd9grmcnjxgg656h4x6szqqrasvyvpn1b7qp724uniy966j0ll9d86zp4iqwoguc12wrj0dw5lmt35u9meiyrm34asrmjj8zgohq0keufhytuvzd1b1qzxt464m7gbdi895tfs3r1232jfm62b',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'rq22qtq48e3zbkag7d83ku5m1qcn0dcln7zmaipgvl6uvr18dz',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'nbt4hjal08vonxho3upz',
                
                channelParty: '9p7te9d4zqw1l90djh7qftjpn8as2c9itoslzpqa2mki9oe5b8efahuqo9syqntergm30zye5i5ppt7nwimueo7tcwgqujm3k94xd1aq1mq8p8xstd47t5hvmncot1uzz5sduncj05gox62y8jjjhyrpdpqdpyr3',
                channelComponent: 'u3p0zx9q0q662j3d02ha240bbkwkff5jx9sidmbbyn6owocoy469et6jnou9v5rckw4cc0vf0plqraexcun1c8swhkh0bjdyjplo5zfz14g0blxz2g3rgn4iw7iywah1q8fy2m6eqqfh6xiskveplh1n3tty5x3t',
                channelName: '461deuxae9w8lhh7utdtaf9qlzs17rck68mm5dex08wi0w26xs7b7nqdky3xqt3v06tz86sfc6nmomkwr8du4tgkskwuysmnrze9s6t51xmi2hd7l24lx8kymkq3sab1lwjkj3o3pfyy8mrjtfk9re5sqqni4udq',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'auxupyc0nexy2kutjd98t8ofdhznxyqjn7el079utwda08oe9ch55n6fqtn7f8iwnkwx69nd7uxaoyy687ryp7va1gem2vch4aif5ricywlfkcwpktixdegfqinj5czktpfoz05zifds2c4tokd9bz6yy0iceje0',
                flowComponent: 'pnvzovzj8l5oiq5rd6au8e3f3hum0mde5hl74qrsynn1354d7olvha45ppbbi5qfcifrltugknkwlk6f8dofpkhi6fivod88oq8vvvw3tf7nb8szmsi8d2yo6jxbx62oz7s0z63goc6amm5a1s5ucv52nix5wz82',
                flowInterfaceName: '1i9izm8ka5jbxpn8pyexjvbijc6a102t5vc11kkj87v0bbvnqpxyk3zakcs41827acepc7r7udx1eb964fow9r3ctb7prt6v02yf5ahhwex5ofi22nk0awaheicvsvkbzaif7i21azuv91l4962z9p4u7n41gcl1',
                flowInterfaceNamespace: 'brbpqjt7kif29g2rhsm8thz5scvdxv8fy5sr7vahrh76kl26iac1ymqqq080o15zzfklvej5rkpea8hxwjo50d1uoal8qph186njmr5cd0uspi22b0abdgixeqac2r8lslraiyef6bl3xen2u9utribi4iu2v4b9',
                version: 'mfal02cpt0tiwfwlpb2e',
                parameterGroup: '4eohd69616xortce2ff4wbkjjk5s72z0ohma6txl37re893101v8cfn8hjtiox9k4yq55nh4n6u4qmx7fsebhkuub9173kf76admbilusqmk23172zrzmvg52x6p1d70h94ev3iryf3unt4w8yr57csbs5r1bsnvwnizzkty6rbqdy78yzxc4x22nj7p63ep3gs0itagh4fx1ukk4v473fmoo8ksgpr1d4144g89evhjln91roft3pgjgxvczkz',
                name: 'kumqhtoot8agg0rylkomd9kvpqnuubt3ionlsbzsakemv4wjtkcslgcbwzsvfv0ynezw151zcanpc5nx347xhybwqf370dhvjdfzwhj7v2umyku26b36iau03q9e1lomupm250cv7r385eni6p8h5bheih28912t480ia8oxb0ox4n0ejiiwqoe5dz8vtt5ws0bj9a1zfmlvae0pvv5jsxf5b219f08qnrju91u2v9784y4k4eygkhrtu98zl0yngrgwlokkwx3qejevgb57tv538zdg3bvd0nzhbgxc856gtuto4kgsawef5dgw1xgy',
                parameterName: '6yw9kuby9a2v5nht5x69uk3ze7vm5bmf9tywi929f5242fl9jiyt1gnngx5cojap9l85bl6xqmxyy69d17q9h6zurx0q0p5ybwpowvv9pz98a0k0pwpgavrqhzycqqtw5ep2c5oahacdeh95ypfat5uyzi8pxxderwdm0trdw47axdko5ab6xadp1dsdw5rw8bvrtd0yczjjxdbrpmmmv8okpcurohmrg3urajtlmspq7lmnlvzjqh80cd999ij980yc1n8rdxndv4f40cakc6lit4yb2sgq3ko31b10mh5hs30l91wjyd3x6lndtrf2',
                parameterValue: 'nfqi1jgkljbpwzc3dgyn9hde9himxbvyahj74thj8g936yf5z6nqscxpdiqeq3sscwu6znuar1c6c9edbp8uqhph86g6um4325z2qjdluehyn1rj3zjwfs70oz6wnk11vn3jdsm0g1v02wq93ldz0zcz6p828pork0k5an9i8nmqoo2tgqj2j4vgbiknjlja7p6e92etfqfc3tvpcdth5mpa4wo10hgv6xyzv7zjby6pn2delh2ytg0lhe947zvovsqt59olzb9onxbm0isfjq8bd28d17yyz2a69hy5m3544adweotq47nzdl91fks7gdvrus7ctlm8yfmlw86fjrsjrh38u5tq26lwdz28d8h3encsvzhau94s0atc0zd2rgie6qm6a3lwknhsn1ny9q4g3ezqxgqul7yy0enopauqun998oqt48vc29e9vhs9mtnrzi81okwam3pr7wp19gm22sv2gybo37wr6gq27au888ijpo6pffe8vqlm28gqk9jpmuf40spsh0n6itufzoo0zc9k4k07dplgg4srjitcuonqkldti12gbl32biedvqvaieyfa1i0qrjpgynz885ifwaoowj4xvyut9r3aow9876manfnoepc76h31x48c59p46qbgjl7e7f5sejde30guxbfwmbk5refomxl8p82xmgkh45wk5giv1ixnja04yyhpedaaplnwts1cbjypogu7bi6lk1yshf8ynp9bb2ru1jtox6f1k487hk50aw5ov39cbgwndnxiag8vikrb9x0ulshbhuor2aw71phodgj85wzqt70uaag5ckrtfpiu537sz3jlo8y22wma2lt0xtgtdavgdjaby6g30mxvsrpbmh4n8o24b3ypk9h6nv9mwpff66stux9g53h35gvxmrwkk3y01rejap7l3gt4jf1ze5go57gngklthunh4f8paptnv57uwdlndw8aoh0dtdzrc01of86wl6qb9deb75thhdg6h5vn6qvwc9qplgt',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'urx0204odbsirgotti2kuwkf3cjf0z2qrw6rmulwihq73qjuxo',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: '6lzzgi1jo6lwslzfstuz',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'yqbi9yymjgcqvf0yceihv31hpmnsq0qkyvbagazht7anzybodne4x5bdauorw5dwka2epjsnm7vvw3ryy75zbjxmhq71aekmhwxlhjz7h7hfssbytz8raiw1x0j0flf19hi2gpw79t7fmte4rwf61xx4x02a72t4',
                channelComponent: null,
                channelName: '1eytsc1n5v8n61zvk8ldic5v91n1vmuc41m2yifj00dd1ggekab8ogx3maev0wej8vmcs69t19p04120jn6np7om4eqsxvgigtqmvrm9tq3qpra2db1fdcwrbhjapzw6yyq5495hgabxjbvix9ea9zosze055u6w',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'iqxygsfbr8mwx8domz9sqosag7ai30130b6bf6atw679saturj2ymm6fieu550fx1ykdubo7f4wtu04vtr2o29cv35h4x51y5zij3uswftgi32nx7f2yt68akjos9bg2uocngsu837vcxmrwif6bie6ocqm0aqmx',
                flowComponent: 'jbf0t5mrchvk53cm5twrjzmv4pzgc6jmfy1ys9t8z18e9genqjchzouzorfyn3o9npjgxkmkwyd3zqs9dgny2g42ngvnwgbi6wewxme917qyqvffvocvin4tiy5p5hpg40i66xw9lgq99359qjt103crcyuxwvaf',
                flowInterfaceName: '7aa8wacl8bi9mzusjhuuhlueuilqv5snz6boec2yui4189hzs92exiwz8dyx7gxq3boyxs2f1pec5uo9tm1n84cmz4y0gwecldzvw72dvl1zxka1gtk79tskc04ic2qhwt179760a0lygv0ccm2o9boiawxs2sbw',
                flowInterfaceNamespace: 'dtraxodkfe5t7kq0ojuvf3qc8my1ezesgh4tnop1ew6uhejopuofjdde7dw95gwbr4xoz73qpwdl2wq08mxmfjamzxvlnrexql9y74c8osfh1cn05yx9ttnh6o3j0741szu8opxp6v0d4eebq1ehzt2xjbn0xji8',
                version: '6zfvbizhkex0g2d4dxuz',
                parameterGroup: 'vujccoifcwmrhazqofsqrh82gaib2bxqxodwkldfig0ebdcxbnbmmowt1ji1gaceukyy0nwygy7mrlcsa5uro6u5d5op1b2hg7j4jy0ojnpjr2n046ud8kydl2c3bhb9lrnt0535crj30q9svmn3xnpmz2t7bzdaeunmrptrcpwwvjhpbukh7h5utyid5feywyi9lqcn5cpz82f4hf1obbqkofvfohfr3mnduv7e8pxgehhz4s3alatyqd3xjx5',
                name: 'hqmsc0u7g82ciljba2lafwd9kzd95aiqotjiw4qro30n37nn54l11ob5zijipetjadq98tuhtchrsf854tyv0nkya8mzi7vigp0mc2drnf0mgezofx054a63urpapjze7dilwou6otpofg6k262jwr7p2pm6kdxop28aljwi328levc1fp6ul4tj69nmwk33tt89sum2ohng6ssmyi0krpr6wcfu2uz4hz35p0ljqkdshh3shju89inlb0u3w2jpt2ve6szika18sv72hgs3aaaau8vq92bro055sffowxddyrigqdfjar0pyu8b8c2a',
                parameterName: 'xfkic5kutz3kmh4cya7rtwovmldlbss7jzqa1ddtg1ja9e35i6d3lwi4h5nb04y3vo3u2542vzbhx0l3jxlsxjovfqksqs55rnu1ty4loixykrxsnqc6ujhtc97x0z3kebttiiawghj2w5e1mll09dam81mz563aprbazdik0l9023aprkhok5z6acy73eohud6jr2ad6d50gu5ifdkcrusn547apm8ing8gqhps9xav5oci2x9un1tplwgcr4ip6o0edh5ej1b7o2i3font9vepea67pqdqezeb3pe5e8bx1oosoea4m53mr3kllv5c',
                parameterValue: 'irzyi82gi0al9bnoqblktmhgamhedvnh3z9stajpp2g5ttxh1phltvqgbjuhwf5n22xafxrm0m6nz2gsfhb0ky395ppvfx80q1dwi6qtw25zp2wsxhxofeluaotth532s9djcr8uivmeiazegy5kbsyq2kqwgfdwq8rgqy7isx106a1q5iob496txm3hjov0weyzu7yo2128w1q8t63yewi1yr8abdi7c6o9dd55mug1mbd0zhtpzk759tlvzbkrtkelo4oum5f70y9sc1qf9h8c895mx5cqiqd3fmn74mfwpktp5hsc3ddyt3l0r8ca3od9dgh23afby1exrrxtrsx7n4wjij2s16bapfif0f8eg9ia1cm0ircebwzngc6fmn28vz0exjjvuzllz4c2vepakq3iphcjhp8n6fwy4e12acw7d0dc0cgy2ihzs8fqzzv58airijbf5rrbszi9ux5o0vfehy6xg3y0cmcfztm61e53cffp0uheepqr6q5etd3bdnk8ljn6k0enbhfbhtfcgosyzuiigb76zuhyw3k9zodv0j4euuhr99tikkwwrmqp0by18efmntauycl4cocpe6mofastydkk1xkslgl81yporxio2gvl60aaebs9t29a0791bvs8ak17dv7ml6ixg0rknuljaktkt4gtzzio9blxpbztxnkwupjtxchq911ggets5rmcrkm5hg2iyoynirxf51bz9ebs8erafy0rd792ri8wecw8z1siydtmk2ehr5tt7b330smodq3iz99r0ids50y918w4vp7z3ghfgqiwowm1lr8t6e7ej8v6y4o3zjnvkl1t48pih7ipg0xspk0n7655dwszbsuor8l3vthnx0uw8iuyao6p6t1rmsnu6mk1reop7vgi7ksspzp7frjwmdw0apo63m4epf41j1bgtcuosll1zhyaw7kymsoepz8ipnudu7zj9pfbqqof5cgs7xeu1fdpxy9etkhggryd7byro0jymp691hcc',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'z3yjdf750axwlyo65wbde5h8192izkm1x5cof1z216ijoug7ty',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'rj6vvdzumpcyaifp9hin',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: '3yo9pqmf3owh06snhjhn00xzrhez9st1j34hr7qsm4pyjb80rdt39fl38w0orzennsn9t8zcjry6vfxnzqhi504sl96ba6tjhio9hgh0zcyvpkum0cls3q7s2lvh3q4bdj9vadgbs65qwtqgppz0n1qeuj7d68y0',
                
                channelName: 'cw7zn4fnafiwz273s7oco9jtetmq6g5752hg6dyvv4xejcva5rh37n5eon5dy8qcwp67rmw9syxqyfbyo5oo1pjvdwtd0a5rqvalxnup6umrui6lxbstx03zfmkgkzhplp1yzgi455ux0guniuu95tfs7wlg279r',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'mq7l2nfxw5wxzp3u3vpz5d66amu1kmvqpj6tz4hgpspjsgu03uz6lbgqygcakuu6z1o5jxd1ycjn5tggpyy11xdakc0o8do26p5718obyfgnlsabsliwebcqk088jevmdma02lxmfwwjcccrb0bsd5japyu2qac5',
                flowComponent: '4neg8wv1riwfpe738g61hlziek90fs8329uqht5vfag4p3u2z4kxa4ah8l7y0b45pogy2mst5s0ikusty0kiom4ts811k2f3yhbcbmiksdky7948rtx2ea04k6c3f80xteydqavfu1zpa7abe3722mj6fag1difb',
                flowInterfaceName: 'mx083e169pmxkbjo7uqtxqv8yyfkwf345duxp448pxtaqh8osb5p8drtby8pqutkwlgob8r2hh3qupu0meklowweahx0w31d081nzhpfgbbwpgxlwzl9vntiw2f8oa8jkc10nj0gk6nklyfpmqtod61ljr88dt3n',
                flowInterfaceNamespace: '3to47b8uab33xjzlc9cteyr0n78tazh31yc3ek4vuxy70z5spobjmpgcu4g7l2v38561dmak8o8ngiaf0r73folhayzwlybgnh0hhyvtbp060ppttibj4pctomtkfj9sugnyyhm9scckq016o53gvvepgb11kqs9',
                version: '6t8ygabawsiqa0td1tjj',
                parameterGroup: '6soqcat3r1kvpblxa9zg7o6zfe7lwg724jtjb0qvpk6unz4qbxxdc8f9odvevvqhsas5dyp467z50feevx59mn42309u4ngqzvog2bpdlyaibu1dgdldjiuwyrcnjsccepxhtznivsbqcjy3kapq5egbzcpmgc58ha84kfawcdq8pw1rne65k8vjyo21nku7swdwkpruugimx25848un2mimk5c9lca2lgkzyyfqdnz7n6e26arfnqqfgtrb7pw',
                name: 'shs4qzk1kda2g9jcpxjy6tuxtp6t03uevjz2y413crr6c83804kr7uctp3rk0k3refzxlkkzy2llcmwc1hzkho731dp0c54yy2ilthd38l5yynkwjrr4xsc64kbueztwkvasrm99re4bqvg4aelqc98eveiqjdxnp09jmmkjfotbapdalp14o3ec5c7dhzu3n39dnoiv7f55izl0hwwn53faxfubagvj1qqixl1xb23dnppyuuoiobopuxc3famdf57otaug469nf0fg2cfqrg9szkba8dygd9vbp2uuw7biczx7azvns39hn8a4o2yl',
                parameterName: '6os5rtxhcnbq2pukxn0p4kdcz2toq733twiijrl6s2hu5qa8fbpum7jwp3x823ce5m2lpmaa4g2bqrd0sz8jucxy6qyx3ei4vqpxax0w8qfy5ufem3rfqq2xztx35qi41va9pd9t9eaor2jciutgg2npyhn52szn107ggibno913do6fh1gmnd38uhw22b2lg5eszh5v4mqxj2jl41jti8ej52k3ikboggtr5v9ct2hd4ea5alni615ynqvf2622rbmtlcsfz6q34g41rj2hoj2be8mwdlt39jv1du1lxrzs1qlnyq7s9spi6tdi0c3c',
                parameterValue: 'argp8vo9u5m513qvbocxxsswrh6998z8fbnvr6qvt53wm41732ehz524bc0r4hwzwa838xj4fysmmfg3v70n26oxkil4rf1voyo2ypnpbgwsezmbrmm1wxtt6bodcb0cyv912qxysdqkin0jg0iexbx3rhy2dyjhfdavjtbgd8t5b9uzy0km01ktfoxnvl6g2rjjs9ioq3lxh7a0sjxvf0gji4b3qa4t6qm0vzhhry3mtqwi6u9ehq82rgkj94l7pogckwzm4t9ztl41w5xkn5j4m8a7movwofc46h96q25pbiutl2anhrzxaegj5ozcem7fb83ot018ilgyxgmb2iyqnet2s5tkgqj7g1uxwd9qyvkide5lh6p2xw59jsid3pvb3i13ocmtwf86hfm54zaow1lzzwob3y7zwhpju1389w5tgd3gt7n6e745ehmh8uwq299cgrj91rptcbfradt190jsqwgomaterdbwr73fkzfnqoxep8c1g7yorxpdpm1btoq2asvvhbr52w4wd5bm6k95cp4mnltdi28thhzdn7b3spqk2n4vmp1b7f490szsev6rm9cke3zdld56adgfo6wcx7uo0plmqu37eeznu49f2i6p0k0yie440smvit16ih266g939ixororz0267y6tw9bzx5bk42qhn026y467rqtdjea2871pdcu6j16b61vh6cbkje6vgw4on9w9wxeo3irpfwspoc9xehrjwm5o7eu4tgd0ha361ep45qw18w74c7l5912dra1p0qf466iw24fba70a5f99ejk5m42ky1n2zai02ssxmlv8osvgva53cmvi4t6st5nvw86wm325h9csx306n0vuvkc8smukmverxlubrt2jdnny5emp6gc7w2nv11vxthdcbvrxoy3a7a9h7x6kfawit9fwt5t1z5jmtvr792g6vhy704pum5w7s1kkj7ixc4i0hg9tqvqg4qcrlncywvvf2kehxj2ovto3yaapb6z1kfc57',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: '5ioucso1hmoha3m0kohw51b8jvxya7e6o1ph33w36bew0z8eyk',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'yqi3l7a9gx2s5xfx616j',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'k75q9dkocr57q6cb3rkjr9gtcuh90fg55uf2u252wr89ddote1lge8486etyircgcupn7jz1rfi0ks96h6ts1v6srhlsdosvbldakq89jnl26cholcj90yhn9g20wq0zx52cqhlo6ke1mxcbxbnz6khkt8f3xrxx',
                channelComponent: 'u1rpkxdevwxk5954nvs7c7gbksicvzblwqnrwz70rco0mw76jp5ergo16pctz9vrolf9o2qp8ny45nxlocuxwu4gfcfdnezfeiy5gwvf8ir80jialptvmw7s9yrzvspi3kjxka2hc4qn11hpj7znb5gqaxfxkyrb',
                channelName: null,
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 't2d62dd1874tzqgqvde8cvjrgjaot6ucc4t8fhn7lm0nbksp53wf7y5k8d0jbt2fgbdtgsr8e4uyc2ikglrnakh4vf2h51xjmiz0uo2jmkgz64k5en0exi08ljz1kcq7f50757k2y2630hwsrwc1s1dvzrfv1taw',
                flowComponent: '2qewvtodqal99r1c38mojfnudvplr2x5cl949y93brslhh537cx2779umfunxlz9wg5pq4cgektf7exokgnka12xmrdk6ksn0i4g1l5favxsl2nu45akqikkqrmr4jrr6y480vh42peklkbf3227g6vh58oqfv0q',
                flowInterfaceName: 'wg64m3j5kebeli3jeksvte96z1k9n51hm9l5pwvfnfeawraca8rv50p515rz9akq3isuglwppzmtdlmc9yjm4zzwbsyecsmn2qtl34aa6vgp16jhu1tp586afr2x2my6p7db3g05s1cfaqvzca6o6o2vz03rfusq',
                flowInterfaceNamespace: 'lg0f8msncsdepsp1ztzc3qjgtrzg80xcj7s1ju8miwvp140hjflxdq5ynfrw3uqh3kj3phtaok0gb5rg4pq6wvkbdhsunxlbj5o48c8jqo898nbngd3mg88j0jjc7rcuzgmi400h42h3cwg8gnblf6csawehkhxp',
                version: 'mpsi4f3fxd8r75mrllmj',
                parameterGroup: '3jjaksqpue9r6vx1txk9cgxue3sejoe71lb8l1okoyptphchr7o2uotwsx7emk0znurqb6g58q803e2od84e7m5fa7tlfy8z9z63u96ceh36v2zh8uuusfzn1xeqhdril1qmlvyy1qk0se35tj0htzt1cnb2imlpc59d0ld55mgon1lletjk2obtle1idjhazn3oae1205sm75bfenbr4334lezhm58dhiii41ucvks3kq6gtiiiwnzttd91bhw',
                name: 'l18cwqeegufg1q8wyrdmp3hij8ugb92rugp5k649t9t7zyyq4m8f63b3fc5dq8jcjw1acxon9hmiqi9u7pldevweq6pdop65bzcvrnuf2b3kzyioejrp5jtp60o9mpjo89up5y01cba9ubabyx7id2k71z0e49ppj996kqk2k24qomz4wwsrfgakdlq004ak631t5qt14cvz9j6chcmth46nfdbvhuhvn8fae1lhnhw7cleeedfk7o39hyav3myh18di2uo963bkeqms5i2zky4lxxxe72j0f3pzqevi4yko0unj2mazo8p2v8wigqer',
                parameterName: 'o9bofh2cyo9hjgxhzevt8t9h32f833ydr1ywqv4owx6zqc9mm1r22owlpmhmaii8samotgqexhptorxec0xnoilmj303xjvxm5dfsjw24nxt062w8b9vzvbkbzo92r3eevincmcq2xhav3v7fc32cjl7ucsarirqrrokwjtqnky5mdvj5mhja87pxhkioqydgnqlzi5qs44qx7xv2796giarglqsok7q21aqr0p7qm5rqyra57a60biorowkjsvblg7v3x3b9hflk7itjksn6c3hcmvtxdu9tyt8yhct12mvki8pkjpswvipa0f8q0rx',
                parameterValue: '24j2m2ilh1ylqozzgv4b8au1223ion2i47wnin20j53g85p7rilul1s7bb5y3cetkn1euf3waq1ypcllc185h2jpi9qhrjr5jqjplp9dpd5c67p7gxv4c2xlwsmha4qqc7mmx7iydpovmiyz5ykffe21f3h42h97026q4nt541xlpek1j4qz95tzuu9govr009irvbo240f048exy61cfy28qqq9bueyv3qhinnnwbrdsubu9i7yf6t1vuvypfka5fi44hq7sgt6dyz6zmnz5jmrb4zpkxdyypw9a5hlp3zuwyxooi1hymyyw8kl60qaexcw02ha8tlbowpue3bciaxzfjwfbhj3bhukbg3gjyqtzcccuxdbptrxo4yt6dzrt0dni66b1kavwo7c3yy0m6plydn190xaoii96vz503p7s2c28tc1cq45h4nlrn7ngkhip0j4t9xwnhk741szjmy8litw11vyk79581f2ncqgbc3hxo2dtcq2ro8j29d63ytcnsyyrm14fpdk95ojmv8kim2p7fw0yduhds4hfgo9207qng0afd3uuvn9jp15oc3i23z3dls5sfmp4iag7o8nm67j6o5w7a6wxt9mx68o9bolyyzzy10re5c26du87a7h2rotbtsrxj56h45en56nqq0wauywu8x3bkc6hjbd4tb7b8nox2jrwicexy9fw1w7mpc2frclzpfw7ov3k3mkmhv2gjs27s91ci6rsfrs7zygswxt4l6nfbscdkqjat8pk758zrbdy5x4hdbly8aqdz4nj60mlne8gcnlt9ans8qzieuy91vll0sscxh6a1b8nod0y3f4k87le84i61y9eh5i6fc85sdjzpvbfdghduxf9uuyqnhleple3lhvjsy1jzrsqtw8n18g1mg2iobabtrozwhd0na48un2g5hqegkxyag8x28p9ar8m076fljkwe8cvqegp6h26m7xp2zvta516opz2zxfggp8j9544duu6llvyn7hl7a0phgm',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'v00a8vobxoxi4oswobgu7vsgr8yvtusgzryson9n67kyzzeuco',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'lxc67vv032b9xnmhubt5',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: '98wfed1nf3g2deqrxcaamiq3f6umnou9ip1j215g9uzxs1f0jcvbtv30e3bdsrojc068v8aktnm6nrm3pad63csxzbybrjic3n1yi38xh02k7y4x2xwpmvulvnyiutjsoq7pecicm0j2zpk51fxitp5mcsd45iyw',
                channelComponent: 'jco5qrr9grtezqm71qzal9itt4jcklmmkty7oio281upoxd4uli8n8h93nqmiwox21f1a8xj8rzccmgni7mjp9vgagipgh3d3jqk2mik3q45tpv2snov43tlmkggvvz735dqksaam0p4ik8firdj1lw1pmj5g2ok',
                
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'b5y15oz5n3nhwutprsa76jgsi8j6x5l4wzttgb9xjf8m6tjupxclfptx2l2j26mmrd0afn9nvvposgvtcvi4t0l1e3q97qiefjtg5thlgss651cs6ejn8cnrt8ilpw91uw7rrqn81nr6y6nym8h2n1ws8sd7axm6',
                flowComponent: '54b6qh5obomwvo8ll5aiczq2jqvq4qybtbst96ufni4ycroxyuulqmvwxmmqopiz57h7xtqs7tgpg24lk4zt6q4k6u2nlb46jh888bffcwh3opjadi35ulv2nrzf9a81210ldw2ttws9128vyl2bbr0zzzo86w05',
                flowInterfaceName: '733ingaga0pq4xq7px7q3nzy1c75f2yqv6ecmtlj05ut2gold6zaa9adhw4n5vq3efp6qiwzhnozrshl9m4d73fcl8dzex7ngiay1ujm1cm3mr6ojsqjn1mxf98jodzph84d4ios2smuwqosmphnmd0a0u7cxyxj',
                flowInterfaceNamespace: '8sq4uuaxh3bq6ziki8ngdfyp19rhnafitffu1nh0rspe0uabvdp9y135lop8mfgp88fkzw55yystxnhkwffxblnvcvocxnu1abzeguo220m5zvh9nx1g8z2ydl7cq37i197g3rh8ncg3iihejjqzoq84hzq93wvy',
                version: 'ztvqywk5eh9riptoartz',
                parameterGroup: 'dtq5mab3vexp65lcdusrowpdv8ok9m36xj4txiq8cq3d25dwvwjl41vsnatw20w69wsbt0pcxuarr50js4c3cblfiy9pps5blgodyqvgaw9pl1g2ojqzv8cn2djc0xv5qd91cvlmrdhbeox21as7ejkknfxhi0v4n64d2llukovinpp4q44s1ueo3j14q84v0ycx4a0kwf1hawxq8kgm3jboazapz1kdhqsh2mwjp754iaad6ol8g899r9eu2lj',
                name: '5zyaz4kkybvaii9k86ins41w76jmvstx3059q8c6j9clqrjbvhpsnyy32boevluuynplld58rjxeuwc225fh8neylak7ja6kv2b8v72wl5qon01nn5hdie0096gueb41ejloluhut53ceeddclhrv0hn7f6u27leqomzitr3qv18ds4jk4mxj4naw6fwv3emqvuxziho3co73q6on7vif7odurbnuy86l7j3lodq50a6w4f31f87clbrktkd9ee52051k5wumqlf9keyfjb9mp272ezouhve6mm5cl8gemml853jx46sba3mfue4uenv',
                parameterName: 'mw0fzv69wl7hjip2aok7x4lrv6nw2ihlgevt2ktpa6g6k77qo7bq7csdae0p47ekoid62hd3aw2odaji396ovb6gvy6djje2rw2y7hvy854q9hjuext4me1xp2f0d4iryexukvg6olf38hgl3c537rlohve92q7wtvmisvlrg5pjwlshdfrzkyixpigpeoswirj7y6deg81hz8jyih7kjak5h590l17s5ln1qgoavaht630c3b6bww5090vvqik7gvic5ti1trnqhl3eja7dej83iuos7vb36qe2skh2lpcpyfdouuv94yid1c1amqz3',
                parameterValue: '520bcnfy3xlq54fobyucevx4z201ul5433sf3nrpulhlg7wtoina2hbv053a46hu4kzluy5mrtzufrjknkv995z5gvjcmqm8qrs6n4bo8fxvso77ofumuk62nmzkqlq1jgzk6fvgd7bpyawp4yavm5rwzuf9hrkkqsadr1hiuu9jsrsifbhkocni0i0l2tr84pnqrej2ourrauhu7timm7ajpw1drch00ycp8zyuwtm5gg4xpi3as049dv894sumhh0666qzrze9grvxzlgkhul65kqgaxxtdemce54u1uz8woeh9t2mrrcheppj7efx7tenemriv5kml3nqeyd28s4lw6jz8hhuj4dp1ehoo3itqvmksetn04m5fykt2rp4ghjlscsnm1cs0hjwh0ee5uafqdaiidljc8m3twgrgsyjro5p53mogcyot0tljanvkjlkie0kvt0xs5u0hbaf1btos40dy7bpps222muzdwppzw2emd58kveidatxnc2fj86ufp440ias2izc3kuel1xwd9hyqphmmgryfjmcz2dqbt1r0qf6yztzdm51gyko884mf4ouzn9623ata4dlxd96zq06cpx6uhrhgdjeddsqkw2q72bjuv627auugmhis9l5hvw8h3yo00w7azxwhr6uzb6sksibl8qxdorezlelxsk5o0hvcucje8oull27aje0lf85cfitbike1pb4q1t67ramm75kp1pi7x1cf2l7dxk78fwlfeg6x4a78zjkcdhj5we0u6rzn97yr6dfy7dnkffudedtaao3dcklcgsp6q5j1j024ig4sr12u6x6z2gyps3dt4fybr7mky1p610phzadb0gcwh18x9w0a7uj3vzeiulrce2ubie3ucyceq7gjcd2ggaknqg0yhl26sc4ez4d567h6l2ia9a8v3b2qxe6cz4q3duqvvuhvoc3elj1i0cd2zbs1n2z2f77dqi1n9aw1qmqbnwx9m0b37slufq0ntmci0z9c3rgup43',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: '43b89z6t28sofjc3zebqqjsco9ktymh5l7ob11v9wl4yrh1p3j',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'xayuw4sgevya2i7li67l',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'cjevj6vyyxcdatooyv5v815octsrukejs452zu92zy236qrxyxqt7zv6nwd982qri0okbyp4b9ytiumsbj6034jzk8rk2k5r9y5mhkfuds9k68av4zez62os94fxpwe4453is9q14v05awle3mnuyrjprjv4imq1',
                channelComponent: 'mi22ggfjl2m53rdp3it8o6jn54slb81h44zwl1prbyvcnxe4364zku1hg63pmg8ec2cbc8dueqhk07ak947zpgnlspnmpckibyuzogopfv35ytkogh5owdxiv8t47wjh89zamaos4walgxanbhh7g3cr11zqyeh0',
                channelName: 'r0awz3ssjgwibkmh6l6ldjyabkpcvrs3xbgk5op7eoiyqranckur47dxy3hj8c0goucke943cvob944ymnwby9gv62hlu1hnm27shqql3gm14py2b7iccjdejqlgpo9z6gykemulq1ho06zhqfasbvm625gy1gjb',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '0xzdn96jmbys95buz5ioifgnkmexfiqa0v2behf11ybcrp1nwop3v0jb8xef447vuruwl9jm4qa1zb74x15fdd0o8jnwjzfnlsxsatqrizrllnzgpkmadx7vzirtld6gq7v64b78jesw1lrxbn3d8fg21gdoeijn',
                flowComponent: null,
                flowInterfaceName: 'qf60pmf3lvngzb2d695h0i88g53t19wy9g4fjwjd61py4zp6vxccoqsh1p1a3qj03s0tqdk17wcjrb3cy8yc0ay9phgbysvq85gynri5d9g8um94hb0bdr2ur6y6tuyzc35z1vqznnmka59d52imdc8shyaoxwvk',
                flowInterfaceNamespace: '3whkh1ksaiz5c28izzzu3psd6woe4zzbbcdyp91l7nui6j3p3jtzsxghroxa5hpm3v67gas86m8ob07vm9b77af886abf10mtxjwy3x0066sgnxkid8gmmlxvugkx4ue32bqtoq6pbs1ez3796s35z0y4kemah2x',
                version: 'qgjlwgdr8tr5ldjsns36',
                parameterGroup: 'iyvu6z0fe5pgdqr2m7uybf5hz74hz1kajnrfy6dszd2f1kir424d2lcyvx14zvni4ldgbhy9o9j96e1eg94mws9iap7whg7djyl10f4f4yht49g8ug4s6clhai0x86mvp7z2nsfvt68s8m5rcy3bn6nacetrz0432acgd9bmybukll4viw5yt3ddqybf3ygqagxsehr9loajbb5o385vvpldxgak1towahltam7b37g92wlzq1y3xtce5vzztox',
                name: 'go5xsow7tjf8hi8h5xen7e9nuljzejhgsjuqhqn4ndl4r040mn5rui60phr39y4lipgb9yd6ail0gfwb2e635s06krtg2r46o67jpged0zbwxqev87qccn7lycpoyy9zqorxkinicy14focgtf74mrg1sf3xxxmanugbg6i54kwuexs2v1gx9uck4qp5vccujvtdxprhtbe6epgznyaw1z2vvcl44v6iymsghzl3jw73z8nmrvw76z30pojk93q2o2tmxkfknada2pwxqwbdev2h5l348ddbsdoitsm1hdd3uhckgy17s3uacxlt2dl4',
                parameterName: 'i6b4sgt9bgyclxgwuot1fd3hqlnpbszom5v91dwye0zuwhewwxx1tco25ckc3v4d4cpwgycqyqo5nddjn4ftl3pgfmpttdlfudnwu8epnusq68gza8o3ba1prhnk5oehu4hs8it2j1udoswdp5g2hmwmjpx9bz1q9hojjq00aop8kork3hdj28r4svy8cgxnd7a1hrgj28jtofxggbwvzwc8of6mn6b68nh8sv4vqaymogtmks5t3fa7ka9zilqa8lbcbdiva05xs6wvhufib2ubfnur1u61al93nk04d3tak0m1emvquiu0ajtzy1dk',
                parameterValue: 'h4kx3uryqz4herpl1l4sk50r91ovb8glo9x26c2uw6juze4rge8h679pxr12gp25oulxqr85e7l77t6cd3n41wzz3y4wxluz7g2ihhdk0jsuyyk1kog6g3rzxgidggh8d25dpo8qz9ww1d34bi43rfiqsc7z69ws51xzl2ypr94kb261bd5742yk044x86hvbqesu78c2xw64n9p7ijv8u7x2uqk71exc9m58zu7s5260poh9vq2vkb5h3t4upfedngbkg9xmlukx3qnrtl2e34yylqeg14dx1nzi5g5xmscrgaoxop6dp3zay2vhw4e8248g81u9i3uz9vhhcme886a11sfm1n6b8rwd29skacmiyqiqt6zf4sjy3d0vs2n2ultkrimobjee2di4z0vgy121uuh5ita0nuhf0vjo8p8ybpyyvmyrhwel5jevrgjttsgeqg4vwzrvutw6d5l3dr64f1qrforfa2labyufjzfqf8szy6weqev3e4p8zbtipy01c77voez59ivb06w3lfiqf8dgcenhku1lqbh9qaq60msf7mx7xpm5tdyztykp9k9b5jg90o20mrdby121txq3hxebprfo97ory6fix5g0ke33q7yrq690l4s58oayxyvgan8hu99m226eactnryo43nvo8flz3p6mqp8owtxrxiz3w0mduikivjqxpdlr49j6qvsk1ujsj5ezsbsi5hbj8b9yhm0xuq3wcd42m1vcr1m8oscjltf0bh2k9xkus9tvduxv63ckku4l8icr8rbljvoz6dzf9edazli6bsuy6qm6xxq7cdzw18kdhwtcpk1p42fgtkqexkfjar5rse9o5x172y8i3qy6fyys9mur246ve4jwrdz4uydsobows9zo13plvz1yhgneicbfqc4gv1hoiqv9tyfjmy3uj7ex3n0b1h4h60m82w54q8h1ne44tzda959gfjc2jio9foh77v2a7fkgve1yqvmzcv9vi02vgd57p4h4afebk3p',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: '8m3gmzh36n93z24z9o1el8zgzo9srxn47904omjeg8mnm9d6ac',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: '6iuc89qeyd12zpeqybgh',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'xpfp72g9td89lm318ctfycys79sr8ju5mlgd4p05nue2l3q4jrl5ve77ig6po7caxoferoze9wa66piin2h7yd0mu7lkd2syuxh3xm8opd780tkwyb74veud82sq3kfmhmd5esx4m42m8o4morz8p6vmomba1oxy',
                channelComponent: '1cvz09d566wtui58iwemwl5sftkzdwqwq15anhv58v1wzou980f1bfk8rwl5on3irz22kze0hmfntlws7hnr35ra4ugi8rqcpraa510oykjpiuty9f3pf7q0yuys3tcxgo6jmgk47xt1t1ndgrohgnm7t9c2afqx',
                channelName: 'i9deb9kdisiwwkcz6mc9vqkgy37rhtromfu2j3h5yyhy1vucs6mp8sntmglbson9nvsj23ctah7e4yj1qaupe1jvxm07xdfvsn0ez0xpdx12xstzbszqpnzl0bns6y6yhtcw160odwmc38czwfbg33x8lqn6io2g',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'di7vk7f6ju626xtbb8hild1zrdqo0pfaatdjkjmoh88xpgcp1uq0vrjpes9nekxz0rh8lh544qvslta7j4dwsk5a359hstf7k2eysnsbksqujum2wfibe0h6x6u353rqd6holdjye32pjznfgzgtgp12h4zj2ih1',
                
                flowInterfaceName: 'j8zmf687pdi9fezt4ruyp0lvuqrfz2xklkw6rl3a4ci9o1kp1bm5l82k3joa57pz7y9yb18bx0makfwxzxow6e1twq0jo9gii5ng47xp859j6ny7i0d8v3rl2jsrtngenzf3y4gfpwmlv83fugzaeqs7mfdeeqdh',
                flowInterfaceNamespace: '7kl4npwkcjropwxjkj36aege1ajvlxqvfl1ltjqhiucvnawk4p8cq7socb7hzzm2tvvix3m0q234pmvuq426qxx4rnpkdqgg5ned6wjhztztpk2q06zjecu1jskt51jlylty37t515uef5mxhmxmo09teyu4jlyo',
                version: '11dm4xqwp475t3c915pa',
                parameterGroup: '6ljtee56h4896zinp8liuxhfsk4xufi9jg59s0e9ri7n14zpeseeovyqpqz55sdykhiltihcw36wxbwotq3etdtmqzfutedp2vp8o1rjlk6ugtecztne32xejccx4bgl49y4ydy8ly4vt696gyd3ep30wc57e7avkupkoezn738l1q34u9aa74i58wqixsxp0257njx1mgwac0e3edx9wl57fk9u9bqts3kkgs9kuv6efi9k0eg7e796b28rxm7',
                name: '2an4til17zj7pdv1uyrqgqnvdvjcoe12klvs9xkesdjbnq6uqzaergk0fpqghmf8e52h46lcltwrq4o2cnvj7mf4ifuvz3wkrldjv3wnbpe1xdy2suicqy0rk7bboyt3hv64o7wx1rt9m64jvm720dlcvq5g1zsi5t3j2koogd39y4c48ylu2o3hbi8dlngmz30q2q1zp4zacikksbz9ncjwirdvtuhvvcsq9z4qc3o54w7j70tn7fdf2paxyt6evv86a1v7wlogtgoyh65uamz9433bgaloappus0u2r2pgck5rq7z0ypdarpauf3zm',
                parameterName: 'mc13pz1qnrrk2jeo7vnfmncooga586i4uw8nn39vese8dcnum9ifoqnyx5kqxzuf6nwauz6wbul75frueqp48m1zzimaqx764h6iixmro3fk8ewko8q8tt87cx428854izxsy7s2fy415nvzbo1z96y8og5e8riao533o8fgttxp1gksqebl75bq6cxkke8xv9egw1nwvbwtm4pmwxttv7l99d7q8eqbwz7u30c97vglhg7jm0fybsqmq2rkf6vfaqgs9x15ba3ok8oaod3e13y4ctzxhw1x30uamlu74uzsgdkbk8lrw0lzn1tq7755',
                parameterValue: '1tdbuo2n36pu22uhl84btjz5qqahz9h2zubkkopdgnvd8g58cremh451do0w7kwbx5jxcl5rr35ztbih0gowuarqmh2949n5b2eyylur7iwh2vj5cla1qpizylbez66tp7r1lfb8zxtvr7x63hk2revj30dpaae7k13mlnzasox3hsjh8zwqkoh8kcbhq9b4a1it27nn9g4bquuntrnmhp8x13esxmb6b0yonpu0apwmh6q3ztdja5xnakmw62l81nuif5ajyir3r2wd5e9pbvhibt36jpk0eu5tyaugyilw96bg81q0vbgkem8g5ewobtdzkxabgjuxf52zhaxpygqjip7zvr839zexygn76mw0blbs2sszjpgizp6n1h809fekyvg3bajfc4g0u8m2ohwx3hreit4eusxkz9engbtjo8940hkmrskt9oew5bzgbimzkr5njbud28cnacmbcbb339ylyc5yvxhjnbb63b0xiyqsl8xz0zknaidatvcb938mf6diz2934gan5s4ok9zlxobktaexx5mojlfco10tgq5g9eiu74sgqas3e2omy4s55f1brn04bx3nnehs6lh91l02009sb6nvsahmzfz9p0besrqvhw5tmiya504efffe0d1hgu8bbgm2wf521c61tk5933k1p95ab6jere4oe38ef8dwl2pk4vayd9f93e6xj5uoa7g506vvgjzl7ojawtllk3sqfhhwgk9lco1yavgrb82nuizi1sejpo2exev8bp201mlkmt59yll19hbhbo8vqz7o4a06penq6dfu2uszuejielj47mnoeg6fgs5o9eb28sw9jtxll2nrsbdrwdxp3ix97xvdp9mkm1qma896gb2ndtlt64uvszxj1q177gj1xaarcu3zpaadlzl0t3peyn4ann5v9xbu9wrrbr3y8nlym67gxxomp7p4giqsqnvjg8bpgt4do1dg5iv3r5db9m1sh760pqfd8ifz53yw4liyojh9y8ipma81',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: '9yeekhaz3ir1h2eivpmx9imiq5rdfa5s35nnclbmfl8h5ezarb',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'vrrz90l4ts6ug27a8s9t',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'f6jdry5mn41wtd2yjjv0jax08hpr2zssve38auypkzyuko8hlyhvrm70bjc0gxkeb8kmpjtc0qj8jfefu9s353qxw0zt1ykj4n4k8llysb4eb01wek57zb2bfqt276j5mc3jjo3wziq7hi9z3a742kkbsoffx6kp',
                channelComponent: 'sj4td63uxcyo96u0bp9y7o5ksnr1sblgdu6kbq5ufw4otof0w3f9l0v9mc7wwt1uth41t34g9zhd2rco6b1pi9fvbt2rvenwhtqhpstzhe8ad433kpo3ke0qzz332rlp4ly2dwupfrp5rgeumxksgd6upkymku5j',
                channelName: 'dwlxqhe6wpwfjube9i9u1fkvxxqlm8zixalld8xfpzrfbj6aoufmtjpyi01p5avoqbivgzb6g380vs67yoobiftw0siatzl3l2w7ayiuvbaj1fbrihs8z7ufmj9ftmbfttx77tq2ng7sisb7rc73duna5r28esqc',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '8rrh7b7x0rdk2q122y4tlamfk4xefd9y2spv2cqq3drapm4psvsqe04sm5m84xkfho1h651sutem15o9jjv283lhja8qqe9uldmpesw347ks1wfeu27lrjgkwl8kz0lx00hr4qepc52yz0xoljcym431m0r9gwo9',
                flowComponent: '2nmp1x6n3q8fsheoxzy40p2mo3wunppu2u9dr2itzbg4xehh0gfsua14sym98osjn397hhkgivlu3xrjioir200aani9jirjyjkwjhxnmw3ve1jkdjtd4v3jefzw1wy4het8wyzg97toc2xbkpjui9p36myetm7q',
                flowInterfaceName: null,
                flowInterfaceNamespace: '2tjelvhvz50rhr3o7q1ohyaxss0xn9jej2su3tdpc1nu976d06vu26ngrh0mau8cpevuths2ge5qwytow3fq9lwjii8vu1vnuz22pucucdsnkzzzr3zq4txov392ma0z9axyz6zszl5645dk6j19wuawwmu3ufn2',
                version: '52dc42eb6vx7d32uyqh7',
                parameterGroup: '8ji0ykp0rwm7729k1ryk7l1cp7mxk8a4o1rocfovuzmuoarvb5rjbfxhuucwl3i61vnlpskc0160plebuql4ij37o9gzks75fclizec0xxqz88pq9qhs00yxabyqw1c04zeqcqpx8mi0s72bvk2xk3vvna8pt1vjf74jqqyi9cq2toz2pz8nr7jtzrcoruyq18zy0bed15brr03p1c5gdackzgyirj2918etv26oe4xarxlmae5hgr1xtar3jb1',
                name: 'bgq1qm3hx9pme82lhstsfvwru5mxa9x3zzs28q4ounq7wkr04cppnwccqarnko2byn7vvl47gbevgroin3vzvyppd8ntku9le3esnohsxqvwydd8li33ys9q1r5jgr0ihd7wydkkqsvldin4rrhwlxx6yvksj9sj2tm1g1pm4kogtgecrwrm0uljm1gcoekzaps9myusbyajxico30s7pd0kf4hr8qpag317130gv2du2xotthp6578d8rzpvh5cvb5uzmzuvpjnifj6nx4c2yyctadh8ghplavuip8yq2pfa5wmf6oqzjrpor94mibh',
                parameterName: '4hvvoabf5a5y4i89theglguq9gk3bzivoyce9k0kv39fjfgd1ahv4k0jtnfd4x4b0ar7r917s2ltyj39k6s63z902jt19rlhe5nkygc7h26pxm31uwgpqyju97mito2kvs7v3ms80ok8k1r4cr4vf5bf4c78yd5rdqit8vvzblc3h4jpdo1bt29av9sfwax4ajzm2thft6c3yop6vtupu1yrvoyj3ayfjdql4knhrxvvl8o64pdk2w3gw211funom66ar3edlwwrldceqmnpuplwyze0s86rualjkwtxmxvnyn0s7i1jdxivemruipjd',
                parameterValue: 'eyr9xysjr8rzfjkysda24htgytfrtkmsdd6kkau681jpvpev6fjvk3c57megmjop1px5v1ydi0knqvmssq7ckmqiuqow1ayucqfli21pjxv94bng1dvu47utg3ksguocdlkiuq66dn9d6apdhgajj0xagk9dmlpegbux0ngph6ufezt5sduvky3xea4ov8ptrrli0kfw8poujxb81n3at83j2fk8m4o3gfgituzf0g2s59uafojlc3prxbq5wsghxxqlltr2huz9srjdf200w986wjj5aus4ogvjgv33h34pnwl7dke1wokullxccmq6rgoptsmbf8gxb6krmk48x3jwqhta4kifzc2ylya101iwqwsf968slcv8oge49ce0fl6x8cghcp15qhwgdrm36volttyq7vbgdoxb33xepl6h0kibvic00a0e2rlsdc9bqsgmliged7aspgj8ln29dv8vxymg1cbh6gc28qcydapy57t4bxizna0eab7l11t41its9bwge5b1u99z3b49ut5khx7ifsp5cvw65gt5e8vj0jlg4tym2dt8a16yntnmmnxt02jy2vi3wj5fzen77hafkg66tjogrp3mbpddrdlikjm4vf2wkvfcm3aw2y2b0913152w9pkr2pbd05weu93boynzztaa3ocv89q078bey2wjvtj1xyaej3omgfuaevr7w5yh6iruukaboj8u127pxmcdc14eh46n1ga4cmo6rnda6jxgqyhq9uzyludinnx4q9i9qeqrunnrudyelyopsvungoffyliuqc1hm2805ri2n1s20m6hcu19tsggnczbhiyz6vp4tfcfu1ecqdd93ccmjn16qmo388hgvmluosbyao6g5qem1lq32drnlwdj6lcwjpy8tskkpfwcio39hnn9zvtuspjow5iv1f5vei5l3b9x3zcpyapk3g28cnfk3e5jt4tvz4vtswivquqvyjw93qn73hgrf25z278oepqzxzfuo5m524k5jwdy',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'odpwkcwy5tudy0uyvydz5e8q0toxm0psrlfyh0exxhx9ni11d1',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'tqkdheemdjf5cfewqh1l',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'em7p6z9egvggo1micjr8tq9zk9shlhnosbyi0uq6qjp8dyo9m3hteddm88qivzvqwqzse96qs3nq6k6409qphbskwpwq7d60kusucglnpzecacxzc6hvcohrlza7a3hfeto7s0ee2cdelqk88hqjmdji4rf2vxkh',
                channelComponent: '0c034x4o2shlohtgaw0xbkzjyg2b84m3pi1m8plgx6pbqgndomin9x3oq8c9uip79vf4dmhc8s2z2x93obz0jpdwgx0q92hi22ygd735nzkfwvbvs1mb8avnyf1fmiyhfdhx6m84t3ocmiuhyvirzms3guawb90i',
                channelName: 'c745of0iyfzms7buv5w0478s5qs7kn6mgodceqff75j7f9rcxs46peogvhu9seloji917hd0xavr17lwxbtv32u1gxr19zmqrodlhpzzpk1z7f9jhf22wlvl81344t8cj5pd3iz71wd0pr4qwon3eu4cd5hcugw2',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'q9ykboamavsqipi196qeo9mes62iszxwxe1cemzjr2zm4emc0giog051rdykncyuqcmzxnwaxdwmenp2ebj44l86foboar2u104s4snb7bar0t77gf261ehx4ybt0fq9psoi9wypmgxbzazwq7aily2fj41povkc',
                flowComponent: 's3rv8fn5edkikcibpzwxs576gdiwm0pfnwnrhdfmecnw8udsc1jyruokryz4q29r9wt6ilsy3lcljf2n7foilukgdtzupwi9ejqd728rau9ndya8tqh2sfnfpjb7bdw50wviytjihr04ylbj1pnt7c9mor3lc04k',
                
                flowInterfaceNamespace: '03uie8k5w1dygti4detm1w1u4pocz5v562l1ori3h9kcxoszajr9opxxajug9ydmer0xq0ztro5hxcu5tsg15oslr3i9gtw97nqtgdtl87n7pm2m8ima0xpcoujrydr9u2rwhqe5hlxt65v0u74uvgl61sou3izg',
                version: 'ycu9tzafehtawv0z9wyo',
                parameterGroup: 'khw65f9ht7ietpp716rp4ly0io4l0yrnwbbqhxijeaebcm333sbtxyhghls01fg0gn4u962ycqpejbnkla55d4rezy9f7rqx4rfvsohhuotws6eag5m74cs0evn00mr7id664oqbvoxv9rrr1d1y8hfsy8rba307199ggzkgn8on1eyp6bw5dukrw9y84isjphurbnqx69opo8e6yyaudozsj5u5rc9lpriexjqsum8en3vfpxmm4d0pejbepks',
                name: '6j8gyd3n0i4ish5biyegjbu9ilgem5tqp0h8xclcnej1ocv3i3yswfzc1lorswe7w2nfzi8vng85a6exutz53ebt76t6qyrtscduasjauhs37yvzv6b7t931c9bdz124hnsrcdpnefyykmcm9ttjkk1yus6v8i055upwwq8nop3k29citjxt0qz115yhh8xajwdclazc94qojrk96j7lhdfoy5l6f5a17cwbdbkf8h2ndk1114xx7o1iweb6vjg8r0oyg7c8hlvc5wtmmb413i8adudhkr239ckfgr7849gqzrfoykajvvf3mztu04sn',
                parameterName: 'azalxka8k4fxr3ud9te0ee1uz5j287aq66t34v5nqoslt50bnn0i3f2cxm9dsey9cno38h6cko7ce1n1y7q4wykrn7exe3brrr4ndxi46m3nhohhix9jrw6h7zu252ndzc274qcaz9xexdhjezu4f18c2h72rj0c2zx6npd9eh5y0497c4kqv0yylqbwel6hnwju91g8c1dloxm9knxrvgn3b116pbo77uio5n9qqm72ca5xocksioomlofqzkvqdhvlb6ggwtaa45gqj6lyewf96um97g15h98qlpkvn4rol5z4ahrsufwurrbibdxi',
                parameterValue: '3ssjzspwxolszebuod88moas3htth5xyl9mjo1nz166gvffn7nopw438wcskpaqdyp8dtj6nb6aq8w7t7uft8vg9xthij7lyetx81u51cyxvwtt7t3s2xlw8e9rvr1x6lglb4stt6edcfnfsznhxy8xlor8pvw176ilin6a0y5tbygbkw08nhue93etjeyt9cxnfiqbjuh1m8quhkeaj105ylob2vu2zb18n9twl7v70mnebvplp3y8vyuh307jmz059oxnt0gs84jxrm0v87podpgtguk5aw7tdue7jj94q7v7laftzkytsxcbx07g744x63sax0kz5cs44b6n7k9ele76wn76l1edwboiscqtad8dbhuumthjd1h0he9g5dat9my5hvlody72qsfvtgbkw3h13i7187cjyh8agxdmse798qhto33bgzmmut93878uhikrr7n19otrqp42wj01kdx0fqht7p2gey1yut9hi90wuvfhvd4unqb7ib133uhcow862zvftu462vqelgfmqe8vq51xr4a4l7rriumiyriqhhzbfoxmupqdvxwqtkb4xhrvqbh4g3zqxlpmj5248f6dncm6xaidji68ixd3a1iljc0xxmwt1snqf99agoex8gz0zmt3p5dyyjtpzvxykds6yfffagig252e3p8ru5xqzznqifbvrnb3vajxemyg0ic96mrs8s1n1nhvfvz0vivkvyx0ib6ljgbg2uox8gz63jj9e6aoc097gek59dkv7x8ak0mn14w1cleunu2vwv3x9m6dvo0ka2nj49rnft2si6w4bwbumsi6r19rwymh6fdavy74enhpwehko1hi04nrzna1k7z5hi5tp3eijud726h5psguayc8vifyquobe895z433i2908kw277dm2wf6993niuhiio3d4dxy4s9ozuwvmft93o386jkj9l4oden9h1gei3mm7lh5zkwmxipj3o5rddsxjy8g2vl5jph3683luil2tgk5jdx11',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: '5cbkqmiki25e51zcfr50t23acnfecyfksnx1u6yy0ifpaftklh',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'ywsyuobl0n0vbkfieqx7',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'rzbgzyg5qp38vsi523at39v277gzejf4ld93adu5td57i5mgqu7imxll0f66l695f5b8ltdlmbpes3wa796r24r7i7ha0pzbfer1eno6q4ckci5cffitaolewwcu0t48p14eb38kbji4w7rq8d70v3yg4vymbyaj',
                channelComponent: 'cl9qdwhd5nqlkp2fbbj3ngvf3at8w4d0wvupfldwd8etxsq2j69qd21c7i5xjml1cwjflkk13ehmsih2rww6kmhiefvlte2oib004e3eda0zvgi9aslegsgkelohemo5we7useyq3yznyn4qe91jtwodeeo8zfbz',
                channelName: 'n3vmaez5ocoetot2brxgprp3fmqzoihg6h512wwzucv7d39ozkqshgm9blziejvu4c8u5o92w3nttok8ra3tc9amwsut70afq9o6131qowbw2p1xgux5e33nksnc6b5eu3boi5cj1xubjzp5mk62xo3nfpwaql7o',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'aldmjs41irtb9wthjqfiu6sllkctah8a1han6q17rgtorvvq8xnnmfr3xwkjcprkk2qiglcrhz3ktpgd99h9xash3q79j5okuj6op1jnimu7cx3qevso036jd0qfx1pl1ktbqmgyi1oqggupeb7bfegagmm4fy1e',
                flowComponent: 'uykz1tvqhnlde7hpa9oa53qzh8z6vpc5ykeoko7y9eokqgaqyy1kdno9sn767rn7y8vm6oy4pwjncvcw4bdvnl8571kmvj01gnwj9w9tvr0mcrplz19n653qtr3ubsok5ffdm54q7lwo0hasfvd4spqr6l1itg1x',
                flowInterfaceName: '5dvkie913i2ndwhbatpodc1cd5rssvrf4vs6gmtplhb4o7mqyui7sjyznw5w7rccc1e7480sqmwaswzczuxeic0e66vms28qlr3y3zsng1fjmu44zw7ci3e9uvxppdydq9uuwn1j15zy9pktcxee5cm7sw67foe8',
                flowInterfaceNamespace: null,
                version: 'osjq5f5xf92h0okyqyp9',
                parameterGroup: 'q9xqx3bkvn4dpuf7h3sf87c9gqgj31otjtp1kd7wzhvs0ng91iklhyrf10qitjxwq5ugr54l5e3pskvgyr0sh6civl4y6fb941hy9u1etgt13z1dejko3yvy39zhq1fxhctrr7f03jmjdn0pui4vtntbyr3xa3uqjp11w014qqb62ja3tc32ut0o7pilqdbvq8swv4z17vzmh6wm1xalswr76tn4doce2ns4s6uopycl3y1nqvbyua9aquaxpuj',
                name: 'kyg2wyuxxsoskqg1s8ybb8nlo489a0oqchw3hltpolaau24ihom6333jntjntokg7knh7wntlgz3w1mjre7s7i13phy4akop3yj4boka4k9zo22d6y5ukk5wf4gp0ry0350h1zkipueu1hd1liatx4n0lgt9xxlcapel0r7zyeorejpn2525722e74l39hgmo5osy73fsg1mpfmxcqifaeqgx71qh7dtsdm9l4qbaxht6aa1gs9rvbkth9kk0jv7q6ax3j9jx537jfgjoszen1zj8rjr141i2nngcilixap22senu5yref1eriz60ibj',
                parameterName: 'x0yxsuy25mebxa3mflu7y2npi1q5eycet0eck8dfdgncgjq51vao3mp0l1fyeudea3k4jdjskez6b9izqpezk4i9b1ny7x08dbwssk6l4mwayulwe6qog605ytmuoy9xe6l5m6fhbcovyjshnqxq6gyneovqk3hgslj93c2vpbq34jlyo9zk211tdub40frq2xfhz5ls4vhawagi91ezer7iia54n5i2fvix8thyuv2scmf14ijd9ojfgimyq6yb7ckc4ymido2zrlgid1ftnvqktnoh9yz5qocp5dgwn1kf7ar53rsess03k8gwmq3u',
                parameterValue: '6b4ttztqi4o57kdwahc35tfc36y9ok49b2t3hyy4026810xbt0u4cu6sytw9qvuor9uo9rmyn4bjfnwzv54noo3k7kicm93huurw5x0pn0wl5mj4mnt6c4cxci92r52ag6hb7doill3tc6ysccnkbb72gvohpz1169jtlnx98yqksl6m650pzst1qtpqwr02itshgc44880c7hlvks0ts0prhmwoi0t6h4wt4j2zo0y7ypx2cp5zhnked1hmhzumzi4ketw0jroki6sz45aua7kc5zs55c0fcvkyr62pc7dwsdt6843smeqaoi2p2uchq2uc9hsmxjtanpetza0fykaitt32hza4vr48d1hczzwxcq6ac01zlpqwffcojhzz0lqkvmwdm043fwc6wmgmt97kvu4hamuafd92hdqhm3e12188umb9x9j01p1jt8t1x2qztaj2w4qlw3cfbzycn6il4xxmsc0pgd3fda33ad1bgmhehkeorj7gwqyfz7nyuqoazfp1igoodz7wq0l0tipc5d7ffzbps3un63dwtkqozehfkh171oa14i243xulwr13m43z9daez5o1eeie36hcqk29xwx363ms9mw0o8cie572btf13bn5gj2d2h6jiyoconmms3zwdon087livv2wkfwc35bug3x45ahcxugv9gr70u2ac7sqpoczzc18x4ml7y4mz0hqn5lj1hetwpew92ce7w21mbwvqk59zktvrd318q98x8rmz4obucv7txmtimsiqyy8u0yy726rqk22hyhxkk5t1bug8w9cu9qzmng5o2q6nzswae9kg6vsqdbhvha4sgsecdew0zzl3uxjfblu6t6mz0y9uu6gprvz3sevpwbsmp2lqjtfkdzyjvhmk8546d5uc1apx418it1tlqw5tx0t80is696qehibiqiadmr8m5xi4092z0dj9z1h4tok05znfm6gdwirj4de5vsdcttucrik0svz8xm0kak6zfw2i2flfktvlfth',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'p1ns19f8h81t0f12loj7vy3bhoyka5etcfuoofdypmol1yaf54',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: '2wkp4rjifo7l3dhq0esh',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'a56pbrjlyswnfgsyq28ubg83oaxb7kzj9zlw00kw7cgjy4q6s3oyq9qu87v0fes1gwk88skc3h5kieen8ihdhnkk7zfpfzrabh9ogslnmoohtk9c599awobezoo45iwyz7xo8jxlmdfn1kvsyv6hie9ygvoannbx',
                channelComponent: '4qg49my97q0jtb02dtl38zmkc30n50jp80yuimr8nmxjn1vb7j6qmj1wfu80egmr35c8f8yj8w8hyo6l7i2zbw34rn7ahivdmn2d4xob77uue3q07wisgazgspbobhortjpfe9yhz9pvqew27iwzj191xetfyl33',
                channelName: 'avpm0yofasljvkcs6xruxllc7s546vc9rlhnt4m03nxdy9wt2mrge2nglbgptt2snoaq8og74v9oh4m11hla8c9q2g1fl3nplp8stbxw7s1gyhh5pbfnoq0a14lv6hrlqql64qzlnbciib2z7h9mtrxltinoex5n',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '3b067775im15qy9qc61eytbpl2p2z0v1ii5vi0suwnhss5n2nn5a57nfzikpkhm34ka8ndlc7oa8tz07k98kw1bwdla0h9do7kuzfcezaptr9j1s14wqokr2zuryvat5p1o8iwi2mz6k01olepjzo7g4e7fke5ql',
                flowComponent: 'friacetnauupcy22m60jdj8hvn7ke4f2g47ixkevlq3hre0em09wkzb4vt810lbggw21bqic5ezazn2eyce2oujxixl2qgi0jdwty7yvtnhlxy9z652s5udvd0esi337ymzslmo19zks1w8ox5aq9ggptcx2mfyz',
                flowInterfaceName: '2opajyl6zd8jv51a2wrv0cwiobd074ddmaqne9vsosb09wexlmozskzhhyt0pfx3dkk7vev8w7l54bhuqhs3d7ec0i4de2b5erkpn8cv41uhuxe8qf3m5i9lgl1cdm5x6tqxo00nqligjkgr1k4gm3vjaezgq9jd',
                
                version: 'tpfcdcj7rmgvrmd5a3oi',
                parameterGroup: '7xrxtpmtjvvmhfnwrehx47bguebot6h7gx90mlgl3cb6hepec5m1m8etzs9wqzo351qho2nvvj1as0kklz8hrjizsg1ks331umrn765idr46gtvcsqhr5w08p9zta0v6rvd9h93lrwxhf05uocqfxqycigswsbgzw6fh0324lrsck0qsfm8bdlkkxmqh5afl2rgjdo1s7v0q4w9hkgvg9c26ptigreqbsavi78dsp0hvvp2hwng2hlh1eke55d9',
                name: '0xuh7nzlsm2g0p1blb8aic1cvaa7dc0kwi1xd0w6ln5r6xnbx5jammrixe3m4va1dq5njlgw0reluyqr1ci3eh5blql9e71gc1wa2e5te6tnwjtdu60jmhgreqimcvtx4rqmwr2036y5xioh04ww5pwzxom4auenphpasl6b98p8lfn7oirdk5rp74bst43m0d1co25aeo8voecyjavv81ii2lyc1jbv4fhxs8x0mc52lgz6kj4v02bj1gb6qfd4n6mi6udjaqvkyj9hh6k1s5fjgj4aaj123wo1gshkudqrsohv7fypo665xi04bj64',
                parameterName: 'cwakk3wc51o7z6b13attf74z59mceqo8h8fvbccltrfik1xj4fv4ftzg0dn9x1tz0jmqg4q5tw16en1cofpewzwjpdq1nznuxi63r9dzyxk6epizqdibpt6osyjvfmgwvf0e60pg00115wksukirel67r4hikz4jdz5t4oum4cld9t74sym7kzzqffij46hxdk0eb7fzrcicf9nj1h1qthnvfiohf27gt283h6tc3vat8vy1qlk5r29k5h430zgfyo8jeowzpcj99j4w3ue5m2yqrtcl3cb3o2a027a6o22d48vi1voanyu24j7058px',
                parameterValue: 'txkwifrtx2s2fdifcx9w891hir0k0780pwi3bd5ob0k2a7vyg0ejxxiwnbrjergvzyzrli53o4gt5v8l2ftqfh3gp1l2g1dfiwfcc7f7n7p63sypwjea71jxw22esxjbsdzoqni40yde9qmkdv4uhhfv8juwkikgdfjroipedjufx3mvvc4fstxuzjbd1g0f3xa7etdlaamhzrc25863nf4d8b4cwwn27rsxappbtjduytb7935qsaiawur5zld22cu8rv8hdoj54ytpo2607u4lw3lo715q40v7b3f58cq2wgflei3zrcova5dc4gfjfpekrnn8l1xbq38146vfu60cd94jcz21o1cy005jkmdrpqfx4r583j62ifuy6zjqcudmco47w2u46tp03x2x2dv00l9rnzredtajc3b2hayz708pcf9nqspiub1rgu5zi65dbh1hi1oonadzrh9m04fp79tdcexke4a1hnjz5f1tmdklcsmfkwpaafj8c8pgphju3mz7qx4cw46dg22xnbpng5zcuksmu7qrdfu1uhc27389dhf7onhazdo5t4tnf5hciyxr1yl2b8zw4qylk2rsp0o8jt1yugsui27wrzgfwqz9g5dve5t86fn847m7cdfoxfaut44zh181zjb4cvt7lpnbjzkwjwvbmafvspc5j09geskbq3fxf1re3x2mx5a87lsj65q7c78glejxosh2iqpehokoxrxf5xytj0up17nk6bu5yw1tpvpu892yr40c1mp5gvet0dizt2jtialapx6obeocltvbppaglz2488oe4dysb778vuue2l05p2mnw7zxjfaphek1a7uoq8dn10coao9h1l2b4llzr7pjsynods3o7iv27bi7320syslzx5bmrm4u7hiyunog3q1gqc4pilrnfez675h70ruoqp8gk23ssiyxbem2u2e31ozvif8p4wig3rbcek11j8ktuphri0zbxp5cwk4nhp7b4rlcmgaidkiz89t6rgzo',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: '9t7gm4rg3hz1h1ohqq3acqm9vo2r5cqqtl682p28jmro395wps',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'wsh7dsqeom9tdp5kfw94',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'oumk31dohtuhf0zy981oudeuin9usbl9f0ldjavzmna23r4sooi1zdjnt06c1lf4f8knh3g0je0kxmppsogef50s51c8ku00f60y9y5auz5q0tek76dgr9ujrx5a1bwnrcfri7s2mxjexfzean8pwnffxz9c19mx',
                channelComponent: '9jwhjhl4d2ifb6ovegqpjxq3cs6sr5ixhmq8lwo071tm644c9r4egrojqmqw30kh5ga4s3dnhtredf6vr8skth6xhp3m9bql1htq3lh5uiytb5729aqowkufs96kdhe782z9f8hxsu0econh3r6w6hwljc3hox6v',
                channelName: 'mv77648so036hifufwsxl6i84g3s9vm1u2i66gl5s95wc22onfhy35e5y5l43rpg5jtbrfkf99p3kyarjywiumf2z5ogu6fy6w62h0g5frrgrruiodt3q1crsic1ioz1bjbu9wbwddme9arch5e1osn9ngvzwlz3',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'jv1euppq0not14rels44ad5cq9a67fldfg1igdia6h3i56kfjf15amaw1ebl6jdltvyaqrgtizefgpnhsdf5zti25abjbaw6reignj4gekkr5engbw98p7bt2d9t1jyrungpd8hptpi32crtd8utzkvqvo1kdo51',
                flowComponent: 'zz0mqer8ys1xy34faq8w88j9j8ze9ffn8qsvc7lnxa70uevfwck2n1kgagbdl2p7e54mrrc4nmajtwjd99dynub1llk6tibcagjl11lxzmk7moekbwftrvhp99v72wxqkb9gpc9r4ls0jmxv1cqrxirealk2u8eu',
                flowInterfaceName: 'oplfewymljyy68vpxa4wjcdr4oj14kuej6g69bk7k2761e04o1hcygskhy16l0zyus17b9vapw9tfofvkx2ixtzfq25ehkyw0vw7pzuqh5azqp9zgnr5b0sfs6fafeq2xs47wd6vps6g0av69jr8zr78y8hkc2n1',
                flowInterfaceNamespace: 'alswi7woqr82pm4n6u85ymsnrkzc7ur7dur03meeqso70wzeok9fwd61qjasf3edqm3oaxvsiu14qb69o71vl8nhrz0by30qapsyn4ndwfvw7z1148hu4kmd75lreyp7tly19a7jxz167772hok6gz2gm1slqck1',
                version: null,
                parameterGroup: 'fhnu8p2bl3iga5yc75zpm9hkc185bukyp1n9ftofpmn3pjvq7wkjcbz2jc52sinpi2hrpz5xhzi7i1nhprd19bzl0g90pr3pr4ifrz9z5gu9cvpjntc5375dzb1jhqchfjqycp9qjhikg28k4jptu5qnup0bwmf64jtksxwnd9njjilnupon6vky96dp9b5bl5x66r0lnj8p81qngjept9c7knz37sezyg7r3v361llczunjyu586ppnrsankzm',
                name: 'sgbskej0igie6izj4gd0zpkzcmv7zlvlkqbauvp19dtzyxtzady62fsyueg7n9mriw0btz15hyk3k1urit1re1l77qf8e2lvd5ndecxd736ed574m5qt3zregl47puwigkvshp9qel88988bhcdeq04w2xa3peg3xv1hw0kbwrm81r7398blr0fsmp6imbgmjjrszuunc2zft3q19pxz7afi23qoz0ye6itphqd23wk8ctfj7pkknausqknfio7m3krvzp7w4q34ug43fbevoxb99sy3y0c4g4zknopu7qsp7zntunojvb6i3qworbyx',
                parameterName: '9d0b9osny92k93pqtftepvfi9jz5t918dpvsvptxymdcaoq3if2eatwzqrgkqroz33b19jz3srdktm3q2fq6n706wgjwkr98ci3ewdis6mib5b72ffygfwczgf8bhgifcz74ooewt6avsacbbs8jz5z0v541vvyv6zvh375761cc465send5gn2gjdpchs75r775ae0bv64nysytq5g04fowl3ejm3fp2ssvk1dci2em9sfuntcvq4k7i5pwh1911q3btrpx88naz5p03f6o8a4brv3uqifkk0uw3n0e7h9aw91fe3zm0fs1bcgj45s7',
                parameterValue: '8vombchxi66ivfijwm3obityix128rblg4xvhjk0mrd5m0m7jx9act14q6j1aspmvoc51e2cbu01af2gjwv84j63njkvo9h7c4w4fs2h68wly5cq5ay8si83e97tv8tannximkpm8g8vjkvmd1nwiyanwj1o51juszdoe88f4p3qsi42zuzstame759f224n8rcapftr64di4u36swqqljumai999ty1zl26yz4w04cm2fvqc4bai0eerrnt7p0qyvk9kerzz909l3p0942sac073qo4l473gyujwfwcys6j8uck9o16yyu15rfqvtxm0ajlvxw783hi4ipojtc2gmiaw036a12laphb1srfmbf6i2ijkg1s14ra1fw4lgui5o23vc1mma5seivpywad1626fknqhruv46cz4xomah71sk8dn8ot9dvmv6pc40v60fw7rm1n2gt222r4imtbwtsiipyhdpbym4i2o4kedggz8oc5vlgmogaqk7y7cmfv7wr4bm3waairm8d90xu5492najlvu5sflcaygtt2de1w09xi7bqnqfe5kpxm7kdwyznqu9fciw46cxi0mfpn3vywlzcctnidy344ixdl97mp4b9jholbg1b71gr4l8cyk4e7xkt5uij4ew0xf9e7iqrcxqzo3h0fjt3edgbhxi9079d2qo4fg0e74n2fm7207ylybamzjfe4n950qy3qdm8fcdgfx73hjn33smqib5iqnwn1m1nqe16tt8qelx63irjkmqvck53mspzy5gvmya0u62yarutdqnct06vcygmi6tgzptqi12nl2ni24neber4sybzk46j7enbni3ge2o9pgpbgtxey4x8glijc10upezjfwpgr4yfs3rp8iau756lk3u6pqno5oit62vit3x9x1kjolkw2qpc95s93tnw0bexbdylqusmag573sjstnjynupvi93yb4hhuqmch28bwnmpqrbvqmb7ld2lhcftra1sa7wvgh6lqiy028twx',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: '34w05tc2vjdiaembhby1slew5wucbb8kpvi6exzmw7x0fw5st1',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: '2ll40o5lonnncgjrockv',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'cdoyn2dug1b0x4axbgkoqyfc790zxvdvifzqy11pi58d315vnpm0nbw0bo3kdsbgizbyuad9z2oht4onryj9ykjwsl6p7t2q8kysl72mkhykk786p4ibd510wn6mkucnz720t8u38z69wayeblf7h2odohw1dykx',
                channelComponent: 'zpvxfpskznfzsbzowe7mf61fpsad6xeru9vtxt9pwuhviof9t2cmovsu972wiferb67s0fqn7rd382vyn58g3d0f60sbzv40cn48w8r8rf6cepmev1j5ucfj5ujvab0vg99m7alnadh7kgzckjy5epwz3agrj6h2',
                channelName: '8h6v6tgv8ncmmt0hdxxvzm1q5jh83wd2vsl9xh7qos0ftq8ya5si4w4xul14wvqs1lncs3wwndfkxx9zwouv5xbiv54s43rjgjlpa1q8ckqfucu2y01y4qdr9chq8q24ilcd9g8egzyctk40gbwfs2ks8r4nx897',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'gawemeaxxrordfokq7mybe7qij2wip9sktjqpsm9ktpgkvzuyn29j9c5okzabjuggjbeuve2dnr63wt1kezgbi6nl9wo8uveapkfz47da4jn50g9a1n4h55rd5840r5ch8xoue00809kcoms6wvtxstrxd1om31y',
                flowComponent: 'bpjyq43wqf2cmbfwshc37p3okrasp90khs0fliqrkerdrk3nmc2rpfiz26b15nhs4uub7ysdv1bowbzhgzes2aeoqa4rt0zzl2dv6t5em1ue7ktpxfps9imwq9bioob9q2cvoa26y67ce2n6r4s30h5i9c72vb7i',
                flowInterfaceName: 'a8iz6txqqnhs4i4n1880ltpwgzcqxwxh4796tqmzplm2u99qb6g0zxj5k5wtqyv1z3a702xvxgg9ufq4ao8bli9sj3vw8weg1i53ica7tw3ah2ebqzxtg028rg1s18xthezmf5zl69h365mm6b8s5po1ayzp2yuj',
                flowInterfaceNamespace: 'wno6kvctwtlgj2ikv637on58z5gzrrbwbephb9hhwnmathx51en0c5a0xr8wibxt4aqowazx0wln89jrrbk6w9ibrco1jb6w51kkqqg3h0bn4i4gtxmx6dg308y3emxau4zeggsyzggqyakhupvodn4mhbuw90jm',
                
                parameterGroup: 'johr55n6ux1rsd2wyv7b4ipwgixn6xcasqcy9rg3b477p1o2kp6rzx23nkrmhlb0rpybzcz9neua6lfkmkq0aj6vsc6zxtoimr93nqodtvvuaieghruzbuy1ab7d0bkd50fjmn0wljpqexnnnfuc4eqs8tyq0ygxgk64c1uqz9j13ml48rot6968pl5b4xrrpl2r1gxhm29ye62i1qkfbloxtm5u6e1gpnvo4v890njkjipvbo9wye7slurvhii',
                name: 'dudz4emhrzrkdk08tb35lwpeamovb972l8nt4mxxthb1xw2jadlyjcz7rju1b7l1uglggu2uid5o6jhra7d84i6urkb4barjhyfotnea91rrj6bo6qp1vs7rjgsig0948woxzfcg3vv0rrv1af2huy1cvg76x6kt3cqniqa4jaiqubnhiabvw2qh3wlwknrny4q2m95xg1wb71fk8mltmyveyxdo6rhh7jvdsj6vp80ms52cvt75wsfo8j3weh7h9uf34to2ji21mt0phq1fy0kl3ydbp6rh1ve618hxnwmtt2l53t27qjqv1jnt8dbp',
                parameterName: '7q3nsdfawup5j3rh56w25ya3e3nfmcvr66kjap6ouf13ae7to4pkyytqdy0ysoq9gqeda5ipm4pxvirxth480n21mo5txyy7pzha8wabewz7uuquhwz146o68o3gw24wwa26hzp4kpxvm04jrdcivz59y4jmoz71euuksax7lehf64npx0a5dqtn8chqpwviir0gng4zvzx0jx61jsqg8wqe2tjx8bid2xvsd352pv4hfttqoq1f56grq2ts7y0zyqnnntnrni7jf5o5r6ucxareajfqxu2drsgchwgrkujxrjfrhqgmdbvapzsh1om5',
                parameterValue: 'tzks9gmjd41aatdtpdog27ad138zbog95r9ifd5qw7nkqj4af6lp161m910zf6olputrr34f5wsqrgobyga39kawwona3h8uez1540vxh7pv7xw8y0hbolw5gtxp2pwo6a3eg5uk2xbo5df0n2xru31115lmon0552z3jjmdrb9h5cxj8gomv12aoykiu2sc7ju3xhxxqp1wco4gmy87obakq1o124uczt2l78qbwcdh3bau6va666dfers5b2h0vsymvj2323n6kxp1qs2uqwuljrv9zhmup6ql4rond30gnooav8xm1zjuq8vb1k7a6ukssjwv8ubcz9ervg4bwapvsutwvcbkq1jbnfw8p1knb921cuu2hm1kf0s8n68alvc3qfmak9p4cj2bam9mc6461ryfjt7w3jxv83flbg3v7ji8ohr0icfc7qqo35q9cy62xwcitn4ig5a8wxmfmh4m4kdwjo68qowz804e56ixy4djibhq0frbewr4161nfnz6gfpawl4pvazf91hogq7oq0qtrv9ecvvtv19wi76bo8wc76yunjb6ff2k5q3futwohh4yowm40tjvsd9vycwzlfrfjuu07guvudtedjttdb8inrt59ydwgelsqzg07oexqm3nbx0tduazrkdb0hesvr70j2lkvhb7p052v8sqbz08qta9bwsvrxw1njybprl407hib8bvpccjz0g4zx12vvvxn2tlc2lhfa3rmi703nuwvzajk6nummvkt5evhezg3ptc8b9wtqum7rrcn6n2ncqcl8mafvnclbgx5yprxuk7wez5kgfbsh3j1jl96cbvi84yhfn0ph0ya4728ygartyu84upw0wpy3mc3gzuaemr13bh7fiyqvry3npzr9qh1ufz6nj97rw7p1869mribmji2tspiibdmem04i0c9un7x6bs4udaz8mmco9jw23a2yhtyox4mut8wqibgad8yycaio7nufvv6gzz7k1gv3e29i42q2t00x2og2d9',
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
                id: 'vmsuecizypf85ikbblz29fr7fglskegi9ipr5',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: '7y947nbvs8d9o17m3tdnnf0sfwq2mkjb1ld9dl45cecrkei514',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: '1usdlkmzzm7xk1qcbud0',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'jyq1jwp9t2shyz0hyvk66vzniglt1t688soxpxi6crdv78rbxmsg2uk7ngnvmpiv6yoz699tbq7qttfcj2ztbhio8imqanedu44w14sq1eituq0ctnb9gs6g1t2ph13fr735nas3i3cjiu4g22ytsleegdfixxtm',
                channelComponent: '8psy3hvl1yp4hz3exb6ctazi878xldr8ztyoztmz7gk90anssjrq1txipx85kr4vpyhqewm2e646m6uuy11sn9olrn960abcnrs2q3tdcprtdeaghoxyvsefyy5xo72ck51wc95l9v6wrwr959jiavbvtjd78xzw',
                channelName: '5mjuqoluygusbiwvcq0pb4xl1ct7avmwuy3nmj1pr9jumpkiety8nowmhwkt71ulss5piy0gz532ey2h9irjla20uzy205xl52enlgyhs68tps67w7lmfe2en74e77eqax4xf8nhgs5flq40v93n88s36yzlvei3',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'd0kmxdpwm5fyvdpf1eoeytthahptjy5upn5jtidkk737453zbn088dvfqf5d3jye7lh4rivlq8rutlwg3131knpnpcaad7ynx79d9ih42f5fyl8hufbdyrd4xp6hq73j3qpghfzgo2m5d59vuvkulg2ze41cjb3m',
                flowComponent: 'a3w3wd3fst87jfc5nxe2s731yrz8yrpnhhcc26ssftrpg6u2nghppwn3qm97cpfivkwca0x64fuce0k4ghpil1z7dztgzpqe5gohtkglskn41pppyk1tiz6sd2cy77ppzarcdh256f915gzp0k0varrfhq33e3ll',
                flowInterfaceName: 'gfrsigeelb2n2kqykg1arp6n9wncvxkqttte09a3hgw2ttq1jj4jajmipsu5orfezyqf5xcgwyfwvtiyfbrqfvbisvcqzsjslos9v5qph4ud1z347z0iocfzim0wmstar1sdk7p3j3l8he0k8hrp488cyl9d8vkh',
                flowInterfaceNamespace: 'jjt706nwd0ir33xdscgpbzba4q15mel2s12oa1xwrwdzkfi0h9jzyk3tmqaahlr5nkdkbijonfi7einzsn7njhe4zoatth7igs8y01l3vv6875syr6s50mx4cptv0jb7t7f324oyk1d7smtx05gs356falij4cgn',
                version: 'tumn8jbnf8ade6n0wh33',
                parameterGroup: '7b0txv9wo56t1la0g3n6q4xegzr6gbknxeu72998a7k8zdmwyxy4ps9fvjhs1h2xxyo435i8msjlxgzifkurkdk00rxnl7m38yzxecjlq9nv5cqjtj38w45rrs6qvd1htdyoxt1cr6y3xfmzcvxmd5us7z3gckrzqes41vodizckvwx9o8q1i1rthhqs77hlw8f1cl4728e91ep1c9e93x40ht02ji816udqzn5kdsjl1vlumlogoo7iehvtp9j',
                name: 'kufsls654c45oagm8n2r4b92ack5uv0ldk0akyexy2hd4y31icpm7s4bcbou0knsaar27coe13mekxzizvxwt9qsgfrow2asociisen1o7zepr591hmukqq5ofq34p6po2vm352w7kvlf1ybqyqbgmlp5azszbhd6i9p46xbdu1bxfiva7oj2grwlf7c3eon9pyud2o22hbh0kg376fq0dt3lzq9ss6vbpwd8gvokzs0p7lsiohnrbkrvjfo2ziejp9kg9k29i1mtc6lhy0t5m4gdzmwfcosd5uh2u61d066ma38ur5iezd6ke8pjvtq',
                parameterName: 'j28rntyslkpvv851u2oisutlqeuyahryo1vdpvzyyjmln391hhtky651d9468tq1b9myoecgty0f8wxtc9su965euahddurtldjky4dcandxuat9lwnrr7x0ohmvbejj589k42b5mk38skv2vpe2dfu4yhbe4k3wbg1h8oz2x59qxg5ds3vngn9k14dg5c7jc62hs0z5gz461xytf0dfo0wkwch7euvx25thm84f73rmldzamj6oqmaqju0yyo1r2voi4vmi6gp0ctc48n8faag480dcpf28ryeutmfohow7xy8u2n5shvqv7mvqkfox',
                parameterValue: 'pl1stgbhtl479tle0gufj26u0ks8lr5j0e2gyzxrakohisdktsin7bu4eznzf99id4raa8trf5tzw9ft23zsy01warj0wk5umpui0l9xbiivajpsky8st7frf28pbqvjftjohxdj9v9pvwprg3iddbmul8v9k5xhjor3zk6u6g1c0gger2gzeupc3728om39difjroxcypiwwhsg820e2pbt9ui8g7o8ljng5z9tu2zad675ef5oumxhtesz0mlu07gkx1tj2khdhvcfz0haoydaaceu4ajk7bmzm7el7jv2pvpe4iwm0z60ljt6u6beaoyslyvmer6f5wqf7h553xa84b9php8flz76rals26maet7iijm763u73tmbqyjfh42j45an67a70w0s35blordpiutqvexlnhvb0470i43k06t9l1lkprxo3wwba1pmfofil5sj7crfp3w3zhcafwhqwu4das5jx6mybn0e19lehp6gfkt73ix0ivw0hswcs3l61xgmen3owfhu5nm6k7vk8pgv9k5jjjbavf5dqcy03ibjamsak3so7qf366bwlgeum1p4k8tbcx81nu53hyk52heqc3nde0j588bp0g25r9eix4e9tnqpa9jii7h1rj93xy0cvclb5gkyo17jcsjiaxxsqx8rc65pvzj8imrs40kpqsi9lbvgsumlhscdsjjmsrrngnsg6lmkbvlvpe2ucc48xwi204ohlz6p4ft7oi45axhv789eqe6lpjq8rg4yzpnpxmjlm3mmgp2vfqw6bg1y5ias30kq13kxyy5pbtmcrlvxedw8lw48xmp77c6m9sg9lckhn8vuc0exzcffczfhnpjj01jsnr9oplpx66rc8mecdj6fkj4xmzu0y9xk9v7rlfq8ijsyej32w260kwx7rhjslocl7g9f0htyd94if3vt0tmtb43hwyh23rodz8i96lwf1o07e1vidzg7sgg1znzq8f26ykeh6erf4azri6lribw87xd63pzy',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: 'zi9yr0svsx9i8zb4f5mwwnok7q0zcq226ausb',
                tenantCode: '6geytqybyutlm741zhrvont9qvo76hwzx93x0nbfkpwp4w79jz',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'hq2qjjdbexuwx7gdfqxj',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'zum21gyj2tom9vozuyeszwnedynq0npvg9yy0b9y6jnby71bzblkhurh4jqzzdi0qleagzp1ylx2gio5xnrsrkjkirwt9mn6hg09xyc58l0f25zsb4e6ozyw5r964sw4811jcl9mnwb33rch84dl1dg30wtgvbr7',
                channelComponent: 'nra869sw8mkxbm03lr14ym3nkkzmhem8e6vwqncg0l9i7z0msstzhl446q7nio5izi299t27sxhqo6ab0gdxvac40jodv5867cktdf5g4deik9ndf6g6vzrhtmatypypffommtpukew51aqgitajvxbq77if5led',
                channelName: 'iqwko926bqcugjec4vl4r1h6qwwv1alsk2zwu7xblzz1u0qn4tbl1b8m91yxnwx995fsnj90xw2uurmjzqg0slpscwj54yydis84uw35xxnppnmvimkbujs3s75i3krcjo249fhyqhrd1cplrmb0af6ovmhtdepl',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'nwom2egohrn6f931yxwtt1g1i0f68jzul2a68p1lbjueh0u06i1btoqde8wfi9o329ei8njojk17fsjoiis4jvq9pprfdwgu0tn6xn2vj2izifaqcdljgbwaj347r41ryis69pnynbkmyyq0xkljn8nc41s7lxru',
                flowComponent: 'qxee74dwrs49noo2siy9ye8k5217owki5uba69lf1o6qc74l3sx5y4iaqyvbo6pbxdud0s9k0cg512cixuy6a3mknusgi2vx9sh70zv2gixjdpgdt2kl2i0qj34gxu4mmm65pvbzp2lwrna1hns16g3k0unfibva',
                flowInterfaceName: 'bl1lwkwoenps65inzuqqdlacic1jcjidpcp47ld5drzaoxzry4qle572rc0irkm95ur167c01nq9p2r5id4owbyrhwn7kbatryo0zbgyrjctb153hdcuyyocgmud9d2nho88dkc1z04ashbi1t06ior7fwngmpqg',
                flowInterfaceNamespace: 'ci6ljkg0ujec238txkhmkfnavdfrm8j4n9k5o9eu6zjxykbqnzzqte8a0os9p7c9el60atyx3pyy4tqrwomm7mvlo71defj4i809rf1kiyq8hr45a3179g9ucf5l1qd99yoto6asovzgan59cm3c0zx396131pn0',
                version: '3ue9tid3yq921yc8o2jy',
                parameterGroup: 'u6hymd56w4tj0xkxsry5vj2vi4l6rpuil11cbq5gefxmek63u7wdp0gitaue87kls7vy1kqeqi00ggwwp4y5sg2exyl5m5qdkofs7ryspdlkj485e92jq9jjcgkljwpyzvvpfhwgytiwtv0wa3btpa9rqs6xo5wg3q76g944w24dvwdda81fdpdbhvjo38q60gbion65avqh86b377crnkkfqynpgurow4o5yl3k2lls0k8hkl7psf2d2bigik3',
                name: 'x9avewzrmrpe0tn33cl454scaoexpo387i0gd33pa2ckz419pn7ispldl2atn39ojk5hklll7x92psk8ntlpkcok0h4vgz9cfq9z7uuc6vl71kili7ex0l43bm4h4hiwmrmateedkg67ldksw81jn6x2gtlft0nnspl8wx1pkjfn8d2no8bi3n0zu0rjk787vbde1ljzk9k0mtsdlsxn5unzdqdz60k9ivpscjq3fchagpzz4l7uilnyoaeboo9rmgcz89g53fob372wii3rd7kijpr7jjfk88gy79m7voenr60ykjfwilwqr62b5k6r',
                parameterName: 'h6qlfw0wqmab3i8r9vcvoivi1ibjub1e2ty4r4hxc6gr8xtj6wf0wmnnwl8sjxsr2rfwn4818z7nh6rq6n5t5yweyq2zp54qqc38immt4tf2r7mviw6iufp2qs211k4s0smunijmuezehxh4v7t1gp8ms7qgm4jf4gi7w4ns4ajcd6hdcl7litw09upzkf7kpcisfza750kwwwnjv9tli1069ja9lmbbvyg4lwot96g9k49yrw7s1x5v7g7431gdb10ksw9jpw1pw0ug03lnoq472d1g2ax8iag7y5w8t0uo4t59gd2qlpklo69go2d7',
                parameterValue: 'stkt2h8waqiigcixs7vdy7gqsk6vbnjszj2cjexu1u0y0k01ztoaqaf5n1e2cckoanjtpnm155cvughxev2gcki79v8nliut62hlgcni3dzilri6z15i251mcq4uci5iuipbutxq5rd5dty55ck2zcn8y9nfpkb4ozsv5t28dsnwbj3zxn0wkrk0paefdapn0qyxkdijmdqwa3yhlsxrdy1fzmmz8r5wqzvs30s0xsnikj6zjenl973s5vbtgyylmwmuvbz4jc47dbbmlw41bzolx6bfeecjgseam2ts27toenewc0v2nsfuu41jju2bey0ct0v89ivftpyl08rnir6q4vi7kun3kc8m5nvxki51p1hocjkwp96opiyd52zv5mu683agfpntn9fhg6qd4s5k2x6ywlgj1kyddweijijvztaykcjlei0wov8d8azexpcimiwwik3gxvamq9e86txfmwsnaanoocseq9syq4lwz9splmba8y5el0x6imwuivbmqwwc3gg1ka3xd4xa0rh4c213ux2jbjxrhsp4ot9rr8kdqi1lgv5uuegwiio4lxsx2gsgme9dt2zidwdsjlrhwixzaj87m7677l71ewquuh346rcwpyqp1q4hh3r8g1dln3iz3dvae1zupq1jnnia2gytgdfgzzdnb2low2maw42o54e3v6zrnbxmlwxq6teqq63c7a8xngsuf0juuhk3dp91y8hbf7l6w8v50zaplo547077ni1rstd3r3yqmzzj4ay8puf6jp87vso5zw9yvmhbfi98ndm0a0mzlx38j7ebmpyykp4487q8ufrrvelpurfscr95ytzqlyk4b3g05lqe6ofdcmybdk97mz6yg8liwx5biugmxjt5hrd06opxysf586zcif83flhtsyys20d9nyd949rm303orl8yvmr5v009cjmnmap7v7ixvhez2z61x7bhzj5i2u2tvtlvckzgvniz42c8lfizhx8y5yh93qui9xodaz8g2xrh',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'ekd0vth148kee9nnovt20gw9day2nrqlf6glnis1tt3cgrkjwo',
                systemId: '6di9b6qk7rk454otmqklo80r050c23f7w800s',
                systemName: 'ljqgwxx2h2wnv9r1o9q7',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 's9gtzb3w6vzaclxsmy9mnh54ujapcwej2td8xye17o4d5rv9yt2qebc8sve8tc8y0p2a68r5l1glcmafvxxqczabvlibvjb8nxjicj30c4b1t21prc65w2jp8sbqhswrx80uc4pi8j2tpu8uchwj5amngfk4e0l7',
                channelComponent: 'bun28xbndct3cx31wosv36rja7mxotvv8tizkknzhypy1bty9hqp591cz4obyyitt2tu2ji00oczgwv2pg9hfd823lfsb2xy3wx8dadvgpbjo5rigebq9yqgddcatcvkcno7302f6di4gdazw4eoj39b7arw92np',
                channelName: 'obr4c5z5sk8n6e1510rze9utmd6m3sxg0nvf8jzhwb2aco83eyemds0fljnrhek5z7jqf4avy4ddkbavj2bj18eg8i99335jyg70p4mnwizh0umufp19f4klqxao85redlrm58jkf98ar7aqkv0hskt6pbfom4pm',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'kx1idxmk6v90ccy066ghq40h0on8jurxwbwt1kclgmysaf0aut65io9ehgo2urxporgpc88z7o9vlkcjbmt6rfm2fbqf05vokog9c89n5wustou7n9go2ps9w1g2i8lcuqgb8e9awi1ylqu6hfjh7x2cflnfk8zn',
                flowComponent: '8dno18dxk15n126o0a610fi2a9nh1rkgai2om5q1w9p8nkgmjx3h20ek2zynvmvpb3gp5lu3i5hm7uxmli7qnfpcjtd38k00rqv7ki6swejk1dlewboctzn0siy8vjeatit76wwbouh51drz8tmgbeduuzu13dop',
                flowInterfaceName: '04tdj6vojvvbsrbmq2p8iiu9tf64d3qhri577909to11lhlijrpjhbvk4xjj76o4cskdmgjm2f2rcpn4ix8963fl0eribx0gs3gsga9jyny523e9zbzeitqvivqhm3tgv16y3cuft8n763i0w0v66ured3izsw0n',
                flowInterfaceNamespace: 'bj5kgp35fgpxwk8naqqqfc1hnkzmzt67y6makq0n8nenjjn2ytrygkldermaa7myifsxf7wzy285vc77tt50yexviwd8nt7cuqw037p1kexr2c20u9t8zxcdgwxpi7k7d9oh0zyrkehwl2wvc2yqq1lhpz8t6pn2',
                version: 'y4ueow8dmpsh64e82c2z',
                parameterGroup: 'h0j7wmhnajk32o0m6v7vyetf8biz64ftmc8195sq6oys5mkhf8nfx19cqtgcnnd04apyewulw6hehnsug7pmgolsrafvlqfmq3c46ady57ssmlq6054si7o218cspzr46sjd7urvdi5vgugvxkm0xprtu2mqhfvk1vo8n19ut2e4ga877x9vs7tyy3vyk5bud6efhw7f1gpy3ht3csx7mppbsj759dcnp1yqt06m9lukq2locjpn1i8dvp66stv',
                name: 'k76sv8vpcffwm2skqkycl86k9m43cwwgrwt48inrtt45srg7nd4dum2rdwx1v36gchhnwm5zf8ooo4yugb9o29yvtcpinlrzsu0erz2sv22g8uz0jsp4wt79t9nvunyu6urcxccf94n5mp0qfvzwjgc4i6vs85ucw58izhmat7ljqioo27pz3o2csfiaxwi5eal15gyoz2fgwzqywbbo5eapqjx06ur3mu0vufd86vdjhhf2simzhvqivyajtra2baaa6s4kfjxujezlupyiyrsk8874fr6omuh5zfv2x6hjtam4mg71tgyfei6aja6h',
                parameterName: 'vlxqcb43n2t3mra3w4ff0aj3c76ah32f1fovd21fqk7m1if81hxu539z1z1l5jhn5wmg7vds5i1milzv7ws5542487zvj31fslpkz8hl298xpp0d7k1epa3kd6fvpc19dtnvtev9ja2i2mti3p3shw6tbvh9rn44b1ykzokesyw8fqzgno6fxv0ve56i9erldjj0xia1ko9jje309j3f1dz206k97bru1nx7uixzqidoubj5pqvps3an1jzyn88ui1s8e44p7lcsobrxtf33si6pedy5j9ngv5oumry0a0ss4g6xzt5c0nprbhsdk4lc',
                parameterValue: 'lxgurflc0biwcvpuwzvu7zbo2pxkq1j6kked2tntg6149uojo64wmuswq6xug62opsn75aaupujr7er3awek4bicn994qy8z63iy2o9clq8yh3mzau2rfrjt7ka0jjnwf6npfw7q0uzhxjtkwlxph86784l8j1aty6zo58c6j5j5nxi42g4gt26pbamsq9ajqq7z6grl4jkf6c9hfqm66k4ue9d87u8x98duyemrizu142s9d9cvrimm5kz0fqsgw68we7ynulklvtqofgbys0q00c99x3u0693lode0of0vog2i3lew1019ynqf16npqfcvz0vdozksakf3qjatrij4bmnr15617z799909xr3tellqkh45as7cczptjb58bo1odz64rbi8joa5ei81iv3o71ekxavk38snssfpw3h3ollsldet7hg2bvh1fi813s2htk0qn4tfkbngeppqkyop7lujh7t49bhgwyiyf6gdp62zaclckinem2xs52illmk3wr3ez70xe3ulj02oehutuwfyr3axo5k0du6mufe07ing0kxsaq5oj7xk0lk6u6tsgcepr6ibm757oxqx6089d23lboiby9maw4t82e8kps8pycxmoqnpv54k2kt21ewz8vo9nq883s59s3ba2e6cfcdzrxrwqyd0lqsil3937nke55na5o60qw366hyoqi0kpsuh7h78h28jvtuv8qkfcpjt0nr935t70dzdskfv3gf6iizjftgcleyeig213c5prtglemrt59imep7z7kxtjw845lnwd2qmqy98xnur7gmqe34qs5pza7n3vnvce0u9k577rnd2zn0aki6k26lwb4j6jlhp5irsfumbyzrdssljubzo59xf1bwsrbqp1e3ty51622jp630l5fl7huupuv2ol3q6g5wfg39y6x21kpetnzsuhbmgz4s48od1wge3v882papvniaywijxuslquh6opvbjni59g2ib98vb7ziaj3pnvopjx66y5aeg',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'ylbd41sgtb1n4qr2nyg4c06180po9r3wqyj9omu7f0g68lfhgx',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'teujidhdaonkls59eb41',
                channelId: '1t35rmed9592b28thv5bphxpv21n85tjqeq3y',
                channelParty: 'hj0rj7rnrqrz7loa5jss2yph2uwlz8k3clgw55a23vzjn58cee3cr4i0yfj0g3cv2dtc6h4ldpldgibb4ajbb99ib34y9gdsbjxtnciz3px79p9ioujqmjezz9h0hlltqpo7dirpkx7guweed5c7wi293ngrg5nu',
                channelComponent: 'vunfig9oz41hg4jvc3lzjuwnusb3h9qpifo119t2yrbelgdgqple7yqbm17tppfrbsuodgzjsspaodrvcchy8h155runscxvju68t5vysxybgjp60ay84tndxj4lmwhhabxm6r8nch19wvg4gu2vs5x26axs1tkd',
                channelName: 'uftrq2d9rdyrmufoi5owsgq5fv6sp184my5d3mej1fl9dwcuthbfqs0g95tg7yv1z6x4g5w43b51dh2fe2u1kl14p2e91t45s6zkudv5yszqda70sz1d06y4c8hxv0mw86q3iegfcihjk0mwqmjjnww78blwszqj',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'w5j3enhvydj341cn5hh74u8mr2zmn39qa4e0agqdt3a7jay7cpf4amni7l56z0hgfkf48ayimdqfp4qx8uku617vht4driz81mmewnhsjzx8zxrgywe04k718zq947yuuw7s9xzk0dxtmo08mfs0m37cq18cor8p',
                flowComponent: 'a3s9743hcs38pooxo1ids29a5i84kgvy9aopf81b2o4aj4q0y88c61bk0gccptejfv3ppqzxq3wrdo7tddm2akzvthvz3onrq7ti7sfuxmyvfxfy6i6zb9o8ct5wj8qdnqvjnnfz2ga2x2bmm0boaozu2n2t5iug',
                flowInterfaceName: 'yy45wmqpqz6p0arthevlasixrvo3tsdc95pee4xo9i1lyzqzxvbalk4s1fvw4dpsfnzh5e1104fols6oyiarcal1v6o5fgli3culiul3hplfsveoilvtffl2pu4v66xtjvda8cb475fbswga5oqjxrylj54hi9mk',
                flowInterfaceNamespace: 'mj3k20kxmec2gkcbm2p0y52de6mnze7v099fx2t46j999nuctwf50oxuvnflbot86i5dcdsgrtdy1rj8wsk8dxm5of664wh3mcnt68if13ub13ujxeq313hktk5l1o65fo43sxcz7nkke4om1tgpphbxblo26k1w',
                version: 'uak8kprmtlv5mee5ejdu',
                parameterGroup: '2az45lucmp91lai1ft17rfjr24y78wmfzzq10hapl3yhlnzfmq0nhs9t2lupd2v9yv9pkw61z8gme8v9aldhoyg21rh5le90p3hted1z7lrusqnfged1igmbaj1g5vfalv73xo21mz3p8r1sxc8hl30ma2n08vujodsnifh6ur3twajcgl10f4nevmi1v7ky9x6b8o30ky6j0kxjvqurt2ogvi9wpxbhb98rky36cqgmg1vjsogozwmisi6gktj',
                name: '2pygiaghkdsbf8u3temxj8ywzrrypwb35300qhf6jt523cfv7uy4bdxjjscmrhr4rnlqglmursedmtba5wnv4u3olx63sqgpi6wa5gqbg21s7kdtu9zx85crwweb2392bchfdm0zny84d4e98w96znwb0fx2refklzv8fjvklk9mqmomp5c5hujti4uzrupsk2msf9sct8sijg8452xlcpvgtbtg5adagy81ibxm2awov0u9k8pqfl0hfai1ops1lkr9wfkg08tturl0vrcvbh7e9n3co5j5vamc04bwow22j1prqr12215b89ed8wdx',
                parameterName: 'mz2bancmmpv0wrbef2tdopdt1ugph9xhi2jy3hyvcrc37oaujdtksdvbyk8zaldsi1thbniej0w79pz7uhij5e6yrci6z88w9ahqtgegwzdof2sng7irjm87mb6w1dubyhiamiau88t7w1fzz9rkvuh2mo4q2muo7jw0z58ryggtpkab4vqpp0wlcf79u1a416mva6i3recq2shwnth7y64a7uvdrm3rysz6h46codfhne484yymmdwmclhtwp6yyro2jk29ti150s0l22j5px6ls7ncir8g22htmz5wv618isvl6n3h8rgbad9fx374',
                parameterValue: 'tqrs7fk3r852mgmbtdm948qp3534bxwzrjjxjbjzclxiq0t0or534dy2mfr1z8q36aitjh33n6upfo2t1e3kxoks4p3payjs1vb7mau84zsc6767tb4isy8xeshbd427xowgk2ncoizi68tfiud4dwzi6efdo5f73zvr37zaqlcuiz2naefofj6wudiwyqe3qpghsqouwzds3u6ejuy3lf8qt3dfxoazf5hdxwhp0wovtt8hiwz2ru5fgr6ua17piz3y5671yc0gyrhrfz2ylmmlrlgdrw334v1bio3mqn8sk4fm2d876tqorf9tj99ks1qwp1eajpvvk4r7hu66l7e2kxktfxi6kotc2iwnaphi68kv6g4z7dh4gfxv4smermud7955uzbshp8ij77mjmyycq1thgmft2jdel6zj9uq2sfdj6ob1xevycodwoqsssn774pifkeo8slivvcnf85hvmbd5d2p0w41l7f0p37krj27ucynqg8kzn6fqlzaxl25o2h8fie602q7yvrxb6vadejc4umthojs6o6crqd14q7gcpzx2z10sy443qcwjyw9724zcvwx6dlovjqrt7o4legr3xll2ptnuy192oa3lnq6j7n2pzwtx6hg604kuany2bqxooxlxu4cfwlu91tyhigalo9z9jjgjxltela4phoukvgb5bv27zw381whqsywz11qgqbd6j4ja8hsbnxu4l56zz7dtj3c2yc47ilzz9yu0y19j85c3y21qm4gl0axiwc8nub5r3nyft7x1u3teosmglbuvv8c1v161af1pcjutugdjqeowx4p0nc9s2lx59jenhu10sgxn0x96arcv2q7k1szkbx44anso1xftfvfqqpfuzl9q4tfh6ofbha0xplx58aqc2366nqcopvyj0cismv3j6cyvfjzc2gvo6zok4sfss9bjectlctxs4i9rjpgjtphda78ewmtrrhh4idnrpf0b0jqcqgjib9z7sk5o7oei3os39ckdnce',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'zbrydvfr18an81157nlldshin03eu3fxata5tiezpj3jn4unc7',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'iwtbavxkl8unrpsha8vw',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: '5jhyf2vhguo1fofr0qw7cbrhoxyk6daiqcss0qlf4d8czzkivyzmsho06vqn1mn8zcii4xa3kxzrvxg5t1k59tbdcx33o9m9dibtgzhdgntlk9ouc3nrpi5im1lzyflc6jpkh970qzc5k7s3fjjqdqt2qx054yhy',
                channelComponent: 'b64inv2jmrg8rtnj80mpr5oq229t8g8g3fxbxrmxhyol59myey4s7we8mu4d6p621ptmkuaun1634372s1w7aou4ax65ocb1oip3lcpdo30l9gsjf7cr2ni66qtrod51guruw62mz82if2n32yepy0w9r0jg44o0',
                channelName: '7gs00f507pd0p4ldow898tq3rgrcz97x4bldihyxasjgnehifcz5ho6kl0y6no5xnaed58fbmego1ztfwmeuba2xiopgit6zih1tg5kiimywrgnbw07d72el29klqrq2le6uz93j4ddw5ae267v1a49az6p0osrd',
                flowId: 'uytsmk11r5vkwb7qvnojre41ie99bcctasbxm',
                flowParty: 'f8b3s3kip45fvdg2b8ykwufq1a20zmw5n5s6lsk1jdk6rbc2r4egvmnz3dbvi93j1iit1iickdemygfi2qre95wddyrwqlt40wm1jx7z3yexl2qymfgjm4b738e2ttx54lvqvkx57miq7aatb12eqf7ouk9vk557',
                flowComponent: 'jb8q4mlgfs5pj8c5llzyfa5635xv3wlopz24pwj9j8y5fkevt5072uvpew2iepeci33gzzuku1nlmbpof5aoxk8oi7x152566sa1e8i9samg8mtfl9jkiws62cy9e7ovrbkl4mkhh8qskuht2wb7a6szicapzrlj',
                flowInterfaceName: '8rqpdtv34hxobsq1ssubbj6tn2p72ntwdkx5mnoawpoclof25ox2bzzjzgrrg68xyyjv5iyx8pqlovegnv6a8hghmwxw83rqmpqi93zv9pieznbmhmvh7sa607chq14co9zwrooe1m7saaa50zymkjvf2cjya2ey',
                flowInterfaceNamespace: 'o6clc0px7bhwm00wclg3tg8piciy5rp86fh1g7hvfq7k2u7rl4ppb4g4jmzvdgagi1eoukxhstbjxrpl6isfh2y7o2b3qfxhdu2qjkb1ap5ympkcdaoat59uslfrszlx1bpub4hkg0y42k83ks130q0jlbcl816d',
                version: 'ofhi5qqxkj5feuy7wvmo',
                parameterGroup: 'o0rp08ddrc4uan70bbpqukoi0r1v8s42u6ztyzw8iyx5pc9js77fqyvm5d21hlphas791hrhvh5x1s06un1x1m02alhjckqshmk29tmoo1oerscnf1r6lbwxtx5fry7f04tj69a2kdhjue9a9cool1mhlelavc5u51ta6c9xa3rj332rmbhf6ftk33io637jqst9dj6bwy9soz5un3cfxqi19j64kpdyf57hutb2j4djs4ky2n810ydc25kv3s8',
                name: 'g7v02783usv275l65u6ieeybvhx8d11jowh3ta7mfos80kvtb3zzb2uivm2iylyng84zdbrui2lzvmwtejrkvk1u2psbjjdlf4lj4uopp4gj27vrr86rppfmcgvpyhu17xb5eap696zgyhmwkcv1cip0r1gdqikumkntd7c3usgcsqqy1j2fior6x0kmxd4wsbsvgnsafm0m9b1bg7k5uxazlsap64835y7shhe45na5oovvq641ta4itghiw9m2vhnylt8edw4q2y59kq3435bdphjm6ja2uld151sgokit21qt6ug3wao03ohis9c9',
                parameterName: '6r73svgpcgttpy8yr1nzf2jfx6deppccl93c45ng6n9sg6q35evmkathjoh5ey4zx38at8tzqjtqcz0j5eqmd4o2u0qm7gibwa3xsros1ypcs34lo2x503io38oy9gwwogcccht94fgpvempt43ver3yvn5qmdctinlu3x68z8l4677iji4v1l5qwdjlci0992yfa2d8cvfthp91vct7wcfl6quh346qkpshf6tpfsn8ubitrh7higkn9glthylmvgaandj1q70bzxkklpq7p157kq7wvjovjm5lzpci38jxs8wl5w0b6ve1x4fpi7lm',
                parameterValue: '4rpxnphouc5va3jgpk9x1622x2pbm0htd8cq6t2ebycm2k8dbpnc61ydf2yi8b06cmp3uyzrgclvv8rsd22majb1abk6j6mcaz7r91apvlngyhih9bzmydialz3knq9vjiyu2v9y9o0dq1ss95zbn4yx6xljhtk4cqc812vrbcupf7zqgtbn8ia2l7dil5p0cw3hj15mv4oepmvmezmkpiltzbyrqvq722ep2msfjubxkhfhn9e4w27v768jm5i8dk9tuuk8pqtv61sc1xakcb1rmof77kmg0b7s28p5i2ct72q0m5tbm9iexd04biyxadrzrrefkq58mhhobuxqpek5tlfvjy6on6llrj0fz2tpibsdvu8t8ez5958hkoegsysb9t5dff92w0rftrhwjltsyq9lylgwb1ee5x5tqi6wbe2sq3itpi1pn99w2gjahmbgnx4uiv2psmp8kxgrfkja34oki0fva58y76fg129x2lzx1ujcja2039x2qctacgta9pbfioixpioap4vt4jy75r52edz0bh13bswsia2a3w2z2d27lbimossshcnrxag2xctuchsk31qfl5v11vgkebysj10ss8p5ea8sfkpvhb1khhme5sy88ov6yu24tgb6yjd4ev1dgpihvxgywvom16vn5o7cvdhp7et79vc4beq86pin0efnw8428sxu6zblra1cq8dya5zhmwk37exgd0c5mm0f9cdcpnxcxhlq7d6onw4k5mnmf3s5ee8a4in39939ugnmr882cw1bb7ur5mtfqxh17kz0f1355d7lzfthskmruu06k6ljhl89fudd8fsslyzsaymswns7i558u2shictj5h2towvgnfkaaxusirlb4711hcods0bvb0iqefaj0uwl7o5mg4shf8txe2bkhgzry8hz32z6pc386r1qj8qz8t5dzol1kgrwrudwt80axcv4oq6i16fn8phe97lvrsw0zf83n51ms77ot43z8haybrj9po4h28r5',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'gz9sy1ojp5yerm1jtmze7m0ee6cweqhosgx2p1u7tkskhbkl1ih',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: '9l1pozky3jgw5iydgd08',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'pwgv3j6mag4j2s5lgga175uf8e7gkm7ifcb94spp11njf92qqnignzj536m80pt9kazh0xwsqrraehhkz0mvusc2rj3j1zb34fgq4ol576emrpq7433pswciwykvwwst25xxjnv0oz2ncs3apem7bcgg6lo0lrkz',
                channelComponent: '9b0ubmjrswryb5602m7v3hw8312h38uaqdvghbmlbuzarsanqtplo9dbh5dphv44eslizs257b9b3e1yqtyg36d1mbiazg1evwf9p2jsj1x4bo7xl2g9r857wzhxdb4f9ib3esf7qz0ssxj42i8b22jc94z4km9g',
                channelName: '7aeuea39nsyyc48f7djeh8zpi6yfn8st16v622ccj6gij81h8wnx6ux0kc4r4e2jupdynsbzq3xupgilyj5co1oqfqw1dqxixhlw5oi98hlcxpdepfd60fxuf4a2tzabn6uz3egd0mavdi81w0gzbgdtn0jotjxy',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '6sgv7idezj46eofw0rdprlnzytcevtl0m6kq92f7ctvwy5j1si4qb8hggtvgc5vjhttmfhy000vagpsyejs5cxdrwjk0p7gm71yf1jkit34xfy3s4xf1fhl873bzfiul4nbj9h0zvr9g1ki3hl0drr8tjpuslpsx',
                flowComponent: 'q6mbsb5vkp87968l8xs9s60tmenqosxmfxcan2ck48f1dhvc0la9nxv1al4s0gwxc7t929axtfdjol9kz4mgs5sqpr4ivhdzby29igmrceaat4gqv6opp97h8wea9nmb157556jd4s1gjq5yxsd6w3rqrg5wipmr',
                flowInterfaceName: 's5qqofz6inbrutz70n8bcrvge8iwqzeujq000wp654ektqp6nr7sk8ik64qm70c760xwdx6b9vh9ysmiioll0wzmb8t0scvhjp5w8nm3r5v57r7flqo4ev2mftg1qll9zk2wao62y8vng0ulhyquzd01o0focz5o',
                flowInterfaceNamespace: 'ide2upd2153o2tx8u61i75dbhm0xwd4fko4wthk17o1akmd76etxt309zfpxetmdrn4xlx7kur9pdma750wcb1h4hemtkrql3pfosmh4uwt0jjiqala61bxp6sm6m9a00rp0cnbi1b7nxwrbisp3hw0n5f4zcghm',
                version: 'hr8w1gxhhq2h18cbplkf',
                parameterGroup: '229yd5dojetcded65spzm2csb346kdaf16uuc4r78gg1hjvnh6e4s63dm0pafczym6bjv8piu23mm0npaw2ix3xfu5j7etkr6eizlwmw53zxvfzy1g2kqpcxgppz3ddo1r5rf8jor5p0p5mvousqn5iiqx8e3kttl9ekbilbelwb56yd4hjyc6gpzq4wtrbs23oazmcu3r3zpl8tddq3njvlo1hnhvqzho4vu32mwhcpkod4f66mf7vpvu859di',
                name: '4ay8r0vhnrobdkhmik15n5d0y015bvje2b45enan62qx4itpp2cphr9bz5lxx6h43ei6ty49tpuey56f6jqmleqhyg1uyh2y63stj8w9lnfbz61lpa13p24cn97512ppc0unszz1qmz7vznngv7cy9n4jbqzvn127ddvpmivc5n68dj0ehrgcacxys16so35no6xikgu7h89ln7vngi9lr0097pncih4klllrunuyi8ex6sehvj5rmvm816hde8xkl4lyb1fgokmah859uuqmfew1qrsrizyuubk4axo0fn82aioc34wv76bp6co34vb',
                parameterName: 'icjv4fhgrz80kjkxpfisk309dlyckxyjqr5qnv44zhjz9npvmny3e927a1zx2igaw8uigvi9awijirpvatagvd69h1pumb17mm0rpy74i5cxok4up00cghd03xk7ramid4672hdtny4b4iz3m7y0opdf5otnnfiicxe0v3nflv3y58j0kjh1ziad05yrm7asr1okx9p5s7q5uke2yjbb1afj1hsd2q0s8uvqzm12s49lk1x5lftv6tlq165qhfyrz76bik404lq6x397r3aoigf9f9bg26ek8kvj21swam0d6jc53ulo0qdqh9fi7qzh',
                parameterValue: '7psq1zncukyvqj740mdlvr15b3iuafj6bpwhueyzzirrr0ql36cvdc3dz5nysyrnl4d3vbnou87kyvkwwac63xf9ed2sklh140v357hycscjp7rukad1dl2q7q9vanawcmqrl15hiq87ppn3kx3k1dbtu9eo7sy4yvkrnh5sxs25n0xklshc3hakgi4vtavx5bb79qzq4jq40mu5diiuloi8uf50nyl47bqgmcssur0po5xk1q8ljx7782jttxlrq7s6z2cbdrvs4mltdn45mqiitd7vjzjwmh2h0mudn86bn3ccu2tu0wt1zpk2yb4zmu6yrem2ga288zk6nai43s61alqg4ph5twkj90ntf7vzaiqqmxmk1bz0rbuiqb5ohl28w413n6gfx1vcccb4r3qdc5adg47slw7ekfuhsos1vu8e0u3pmk9zqtlbqt2tfyec7oty9ebokcdz3w3kvpmgf062y6u2fibmjvldj7z15lykf2u3ly5p5vew4qrh2rfjzfkapg1aw9ynqdy7hstxxyv8479mzc6ckl8648ya8x309bjl2d904tp4wa7xmxjifr5oxy8ug0vp3k2kuwmljh8qm8o94mxqifllhwdporr1ep1od19pmyyba09lwoep5llb3conycsqd7t04pqgg1w0wbhh6zcohtuq7k86cacxikowj4clg52wxbhzooctx9hqnhyknu72e5lri0oyxvg89nynxdzymzlofw6rhd431lhnp6ykghvyqy3j7d1s59kimgbek90rdj3xq06917x2f5i0yjm6lex70q1xirzi9kmv8w9jve1mh8fq3qh43qod6tfrdmb3dxyt19u8vtgr8lzmqmin61qsl2kewx5syvzyc2zhzow101ywzj3tno9kq94ewxr92p4b6f3jhozd1ja5adb4nkk7ntrlpmy9q85pd4ome8mq26bq2n32c89ou4oa0wjxjcrd9d9210ut3y8zqxtpc7i3vbx2mx30xqvok1gihk2b63pd',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: '7i9dlg5qlinw5vyhpnptx9l2gffnqn5at0rb74nfkhsgo2i5b4',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'c7wj8mmxfiugzr2e38x84',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'tnspsyjhbe1alw5f8vmbiad1v956953f8b78od1bh05qapvoacbneh5jkp205fvn37bahdogh5ith6b1og50d6mfhhkvprtellj6bhorlpjopnyvuc08il79ngixbfsb6ua1cff2d1nkzwsoj39kvddt4gq232zh',
                channelComponent: 'gdmzkcebydnsvdig39o61qyzwci9ls7azni6uf42ymfrjngdsjvja1nom8jswsqcn8ezai3clnvw0p39lzq57ezsti07e02h6d1m12f9s4iccw9x6k6ibtw0wybdido8xe6vjphllqc7t4tjbqyhdr2dj4lca6xc',
                channelName: '2hlh3zftje1t56y3fspow6799y2hs5krsyh7vza82b42ndy9whmpmcykgq2433s0fx0itotz7ixqxgta1pwy1n3wz2sdht4fn6nzh64sfzylp6po8fp6hf2fmoblrz3qllpr8l53w6jgtd8v0v6q25pw1zpnx654',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '4tkhojnxrbgg6yz2x3th64apjihmjbt8ig6f2cvse9r52oczai94iljkxqv0mlkag60dge7vzm9frrfiuv1h38te80swgywulgf53c4d9iau2kprv158qypk4vi6zsdzsrwsbgjkqaeriizi00qfc8mmlaq9ya7f',
                flowComponent: 'qkf4kxfsalaq54556i97viz3pinf1utxtl4sclmkxiqqjknig7mojx47f084bwmsqxvckqchigpn90esgp28nh9da3rahlige4tg0x6rn2o19bvk4wlpx90umu9muw0w3efh0n54pemcs3xgp5t6ntojkfqknes4',
                flowInterfaceName: 'zicmoe71q0tq3c7sy98dzm3fzf89sxhd2trwwalg2puuboc0fwvh2k2pamuyqfeq0huuitfuuz1sr5k1ohv5adenap8dbmsgs5n9ojwlcucn8ab3lnqdbuc0xkil4xpax505hzcom6sw6xe3n81kr2i60a5kll0h',
                flowInterfaceNamespace: 'saa87sqinm4szpjdbfo6cvlm940jydp4242gqrx5o4f9nmy4bg7y5fw9ms6qopm7kl3xu81comcw7oy0i1uxar8853ppp6i0r5wwrqu0lrnrc5o4bfnfe8f8a9ve55heu40e3lekwi23o0x8ksfkbc6b0fwen7dh',
                version: 'h6z2pc8vhv0svxqjuar5',
                parameterGroup: 't5uz6l0bpjvxaduk15ftmpfveak0ebm0h62limxfoulwq874s2q9hwc3anrcsa39kxl24pso2rsywz1uslslq2f9gnxc8yoyctz9rfdf5xlsteupq9h28dulcxfbdzu0k50a15nop166g2crvj82tlxv7iioi3pm2a1tzqnm969f4h38rjh452g7t9mu789vqxcjp1vqbdzzm8l4cra4lu64hhf7gv2jguyrwstatnttffn4dm8jl876ptm6o6x',
                name: 'zoo563pcpk53xxp652u7uixk0ywezwz3bynqpjgujijexrkpszbgt997nt24xog6zp4gdppsn8bfgv12lfw0ducu18i0pmftftr9xozh3yh4ckcd06epykdgvzsxyb596oeaeabu2c4q9oy6ah0uy0i4lr5nhr3xuc2zrdmfife5xdufbfxogdxotv3sslh31tbffocg3rnydftr9ylsnc6i1dz44aa7qdhfaiitgy7htos1yj2l3p1ffz0i0edq7cxsfj29k8x8v2xnat93wxzjgrjapkk5lvvp8bjv2g4yob4xso1n4jsc4w3gcmiu',
                parameterName: 'cliuta7v4d7pt5yq8u1t66o3pbyvvm45r826vaocath6hu46unhdca3hpjlfma3mj6inp37sjoyhix5ttgda60qad0ek6s7f8iaje0deuglll5ja285as1upapgy0tnteokuxxmcnka1c637zbj2uqrixtxsq8v34yidf7magvgcw9o80kttw8tx0hwqldvsqsht65aq1yj95ski9e45waes1uvmcm2nozdhhar2fjk1s4dwid8a3mu2l87oginxtpkbg4tz1m06y7zb69il3jhsz62f6j711lb1v6hgqh9ugfgk8tjdnzhmcjf0fjr3',
                parameterValue: 'so9avpjht944igpyzk9jw10b9wqywbxob9wxs4u8slbbdcluzae3xm8sigy8z0ma3x4hkzb99mtr87sfokpl1bdftifeyzkcr4sksnoe1tabtxp17b315kfy4kgfe682rzdyjg3ljjsw1pwp7zbp6vfbd4zmj2y8a4kbykni4miug7e1t6ewr19wi5uevv16njq74mq36u0kxvw4iqdsmat40bxbjf5f33m8o8rcph0tfnzg627zg3xlu160ycjawymxd34f8p86wlnz3z34x45d5bv0zwvo9kv9b91e3gvx0hov6nan19z3gl2gkuiizxhuyb1r8juyq263rr0guwxije79zfeqyj4ct39tvr9ddcmvngdgdhnv7bdwluhqxy8tkb05kjgfh9zeu7pcjm40jo0izdyf91mc4ewfx1jii3ghtzfgu6w8vn0uaxdukz3hiyuogzizllu1uu047jqt2d36c6wrat5uu12zffgcp59pa4nebvo4kxe3vawfngdo1tpk661opv3tuez4ndd2gm2usp854vqyajz6589jfo819zatn1hof4g4uaandtrk8p32xbevv5oxn229y637gc1f4cglmn82vbf95tqr6bon8biibjed3c5z1liljtvkommm6frhgjtz12azdnk2bnpja8f152x547788s4owq9uvyay5c9y2f62v4aova5g8tiuuvew9uy2lkms5op3srj1ugipy9zrxy6cgh1k8qv6nl1mr492wmo9dlt9zeysopcnw8kq7b3pc6ujmik93gsc9a5aeaju90dkgn7vzlnj0yxwc0ps0hqg6drkuuqx1vh46sho4wg3lpsuj3bc3e91nt0p4n1c3sss3qvhof3bwz6mi6ws25i1m28noim7ecvgv2p1nyxlp71q20bb61b5ie4pm69i96sg5muqq0stes0iow5klo2y9iw0nmudcwzuy4l8xfvi58x453cc4cu7iu6beidl2rckswh033tpfahwwp6ds6a2203j',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'alejkrl5enmu2o30mos143846mf5s1dgdv36m4oq9lik6q6rh2',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'tbuvn212zvlvg8f1ojbq',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'gtu7pmrkwv6s59c3m12m2ygx6t9djkcdlzxopkko3qlno1tvy9ot71ls30r1dbwgf1hjwdbcr3xzaf81ztdqjhz4t8u9m2ibsg5ageg4rml6zqu8v3ct30b9crrma2c0qvkyfqpdqup4jj2u101ide3eqya0k4trr',
                channelComponent: 'mr95afgbebsywy7rai39li041mzr4pbwzqajkz960f2szfie51p2qpazx4s10pazln0sslzpgk2kiqwr9hx39dkb0hww5x35ee2w44s5ah2xczbh2uhyqahox0co8fups5738ufjragofdv3i3libyxhj42om71y',
                channelName: 'm9ajrqtn14xa3tz6ieu6qn5xxsow3pvcupdjfshg1id49brcrmbrspi459vkbehwm2k3j6b082f1xa8jw5ngpmeid91winv7u756sniq58m86lgc18do6ljz3cc3an555o74ny5g6t7a2dh65yhw528ydzawhdta',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'wn3s4nsag431zmumbkpjmb4xlbc0ycfv6bpokb3euanyhqy1wed3fbdt6foe6p6gyj3pdnlttb109pcb3y4u12i3cuz4ueij9dgdek9zy7gpbdzg500tbk04g2dgcchy1d58fjsrkvqanevhltjq0lee98bpe8we',
                flowComponent: 'z2e0jeouxi9khxftozr107xashle93wre7tqw0l8bimrx1p7x8r2e71zqw36ygomp7bgui3rb3a31uojrwnex6gqkj5q7mixkreff3ivf9fxzvv7f52272xg364nvm58dyv08yra6epd48gvkxizccpk9xr4q978',
                flowInterfaceName: 'h5uwmctr4sf1pr7u01hbv4yfhmknuaqr9bk806umy7w9v38ifkf6af6ox0fbdj4sbbfthe7mgoq23o3dpe620ku1g96m282pdrj32xrrchazdqour8c4uef0lsxkv3gqyzcq6pt5mjl5bxwsmr9p4r6t7n1z7k26',
                flowInterfaceNamespace: 'bet1s7ef29fsn979ks707ac7p57arybxndfaowgj44u49ox9gr6l0ld6vnpwhyrbfxu5kc5nz1knwumw1dmg9j0a7niwahdp75l66faxbfhghmahh6q48sprq2ohkdht71nncbk4mqbqhneqkmr35oefysu6oewg',
                version: '4u3dfyk3n6c8y8yfomnf',
                parameterGroup: 'm1l3b6q6ous5sfzd6oihgqakj4bxprw59wtkkkm55il4vh6ewh4q8z28f128rjsz9innryfabro73xo59bedxpj1kqvmjv6ymqqivz2br9pejpgqahtjjl0ni8gtwkchmijcvho1m9vx44mebsssvmsuc5uz9ltu7itfrl6896hyfao0ymf1heo5hejsfc1z6h0y4mk5kwfwdz70pwn5jk3lr3q9gs56hdwcdxl8c466nrjl158hma7ryhximyl',
                name: 'kuthm3ue9m1vzvvq5kqyb2aa5xmzdk5me3ow0zck75c9cg9utqp9cnsoalyg033v705t1shpjwqgmaxl5ejqfarvin9iq1p7gwuufrbozs0un444vk5yacn5d01vale0jozz1vzvoyt9rzow1lytlajou9ujm130uabsip5k3khtpugt3we2l4ohm79uzxvv60cja2iupr3ac5bosr9rg72j3dcu0wi8e255kqaz6x7bakmzsdcrxgz88dlwlvvgiyrg8201ig84iyq2g1elprx92mosmo56iydr4nfv42p9z592wi5z522af1utvzdj',
                parameterName: 'a41jl2imfmdlavy1qc6p7jyogczzfx6mtfm0ifinwz5ehs36yj160mu57m9pkl1r9cj5vwf9yub443aicki9pzvn2j0hahk43edvrk7djwbbnurj7e2bszvg2utjuoepdd7rtfcikhupxn67iqb91m7pwf37vvnek55j5v7688elvi86lolprz36625m5cb0030b02zvrtfbgpt3co989kpien5njflrxpxzbt25a6tdxququq37e1cd4wezzaiv66x73bw5ww7c3nr75z9u4lssbgxbbbyr0z1xsnf966trdjf3wws8phlgtoxwkfk1',
                parameterValue: 'y0725foi32c6e2zzn6v48qqjr4kcf0ghhod8lybl2w7tt5x6umb56hu1uasb4lc6awx9ljt8g1fg7mwz58o6f2tc4q86uj5pejihtpa0wa8b0s59gvupe3ibjz7dd7fmj7hnc5w9j72205f70wyg856ih80jviz8ko6wk38y6g56pghjuep41efgnxronzd0zhezym2dg27zg5el3um5nq7ta5rf0zdcbzq2x6wkuikw7zb3v5hhofng9cwt3m3s28cb6cgdymlug7dht3hz537y60r1cipeeyfnklokeo5iet8qnaj601gwbye64a5tgtsph0xpyx3sfpu25opi66ee8pogmlm8lwwwi7m8kpsmvxeuvrxjtunxmjvoaya14on22ndqqbpit270fqr2izd26ja9l0k702n607iinv4q7xxdaejgrv8hhwero2w4h0tveupe7ig458duc6ts7nketdga34u2v6h16g1wjo5hulgzc45tdmbsykuo5sj2gxiczfulbl8l9hrxdyu1zj07ephrg4g3yicwh953i8wq0sb0ktc8cor3n95zdaqthj8l7qf7a3lek733g9ihmhv8yno0b7b4p9dwulufu906x3twjdjqenw138icgg039aahxcah4208zy9h4ly288tcym8t9ex7ftgm5u4irgrvljkmhcd6lt0nodblpz1bzwrglz01dd43tk8gxbqlujijda4qk2pu5a9k9dlqzj0r1iyulbvwlapi3pyb8360ukbwzqlc67j56ofs3f3v6ga5dpalfa9k0p9uq6ilxdu1upm5ruofveqy4tnwucalmc313733ccrmnocfx4qxmw3b2jnm03crf7vq150c1ophoytlesrtdzkor6w4tew6z597nosbouq5s5jsx8i2hmov1h247o1rlo3dzkb0v6xdzzvtj4zb4qemh4h6oqa8liv6euqmy74fcjn1eanidqfql1d4wizcndve5853efj88zrfhmhqnh0uu96s2jnc',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: '22sztv2myt6pudaigtl331o34m0n3uo3i5tavjyb8rbazah3el',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'wsh47z6l8geyyvcuvwkm',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: '5wzr82sc4gaieckg1bjai7cio2gqzjz3hkn8irsctuxbqv3731yigux17rni4qohx4v68gywuxsikszampo5qmh4ncw78w2dmldllx3sdkln429wohbjo7vfmhevoefczdc7u2v8u3g04c9dtcjt6ucfdhuo23ob',
                channelComponent: 'mrab9n17ppz6xlvdw2pff62qf6j7t74y1g61sem5k7agrie7cjd8qswp6gowj1m79so7sq2tif0tesycs5bmj6h4atvttzvnxi930l5db7jg2v6vwrt7lswlhzeldqwikc08h4e9tz1s5wats2s1jsgvtko7l80d0',
                channelName: '9erp0wlky0jdf487t071ph12g7vguwalel98wkn4m0zs1j1fb70goi2zv1wbk05ef1pcgl7aq6znrfiubt7va9mlajkmrnm86aszoontnjwqptcejzws38bj9mda9zbp1njzyhpkwla3jvopeu71jhts2cdsbrcp',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'xxuavn21ejgb1gyrsjbpe5cg3azkcp88j0wkiwpcz3lscdxr8o6bq6oe14d6h9xkk1buc6m07y0or891vlf7vtqaq9jew5n9ly6p0yuovgf26otj03n4m1nf624jgu8cm380k7eoev3w0zvt0vdtc7g1czyo6ivn',
                flowComponent: 'grzslhfqwlcy0jbu6vxvr1ecxiri7sm3ipqps912ms7824yzqaml9gtif51u22srod3uhcgm9149oanh3d53hherysoh7m019vaywyrxsao401fvhg1726mpua9pvolxxzmbtj037nxyi9sak6035ea8y970xzdn',
                flowInterfaceName: '1xfozlnm7h0hdhdroud31mfhq0cft2r5fxhsub04us6yb8epzysrm2kqc9q4cjtmbjq35vsmch9uzp2xn7ph8k0a2f932oaymb0aksykm3aqqqhykl1kp21q9b8k139ncttxue7y10ub1ne4dsjc7b3i3yk93z4j',
                flowInterfaceNamespace: '5p4gqglg4u0pttooeoagjjh81nr16f2zjjqjdorq25j2udirm8uvpaiz5sbcjljloa5c4l2blqf8agnnjuyycudfxbl8hricsnp1k2z7cffbqy63xgqe8gce3kjkxdql25r7utx7gagt85tg9vgbeluex2531zdi',
                version: 'ctp2vl7npw8z89j8lp00',
                parameterGroup: 'yvhti9ejnw2xsrf98mqqrw1wdaas6r27d5wb6eau9mkgl2og7tf6h22sstrgiztfnfvdk05axqy90x4nt9v57v2wng55s5c3bu1vv2hxf9jwt7nk9nl3lwn7ylpa6eczkq2ijykj5d51u1nb576zdnf894tywmt9k66bnaam1e11ubn2ynrzhj1lsxg55yruohfksmmodsgih5zj5oy0z9zkwgritpmftj48v38juklcteruuekasmxc0qjw2xx',
                name: '034z2g4en9lgg4uynkn0quc69cgk64cc7k3dgerg48u3wd36pbcc2qiomfg2t9wrke6q0c7ijzukg7llozbh43jnk3kbg7qrgxlj3f4x51z30m2vwei4y5cv0nfouvzb2dwvganiyqk81uzgar19a8tb3uk5v48fq6v7jxuhcatud6byqaa14bf5rptgad9lq1ymyiv1vw9a43ceepm71ocbpirasjnapr0pjizpc96rxewnvwwy4sdgvrqrb709ntpj6z5uuz30iqcjd82bf93uzkibladxj4gt70wgh0ug1obizkwysp0xnekf8adz',
                parameterName: 'uzfaqjkcfqgxhr1h47i4ku269zzn0m5y6q2khw6dnoqlm60eyya3e646cj64zh086qc11sgsqe0ukcbmda2enmjt7dv413dwmp2cw60f9wfrgwbvq876thsh3e1f49u5lk4exuks4pr5imboi73tebs9hs2lrdqkqu1zc3pqrx47ydq25ksdg9r1tyy7yvhcvdg4gpannazd9l5av17d6gyao0ifp2cj31aeq8ake63k9iwxbxtejajwyu80fhmmuqckdih7pakw8ga8nxg0ddhc1r7zgd0g3go6rxjojalygd79b38mseoi5fxq41rz',
                parameterValue: '0rhpdz99id89vkx4y3g9dmpw1bhqjpqvl5zv0w5v5hzzie8tf8dfzpbru8gdiihaamngvweoqu5swyesza7abkc9ehn0iyb0dt89uz661pnvpoz5wn1dkf4ilihscfm5ojjwsrbro0nt33jlremd1238u8x2t34txtxmhtl4tmxoyir9g43a3h0g96g65wmkz9ib49anxobehtiz4toiulzj4g71d7qep4ov7bf0he4jwrjadlo9wpb7tjju4cz2qlo4xg35gueoujvak59dg7qb3h1jon9rat563a7ayrhmf5wyfk747uzbhew6cud3n35rvmfm7pokfth16q8g6yl99wi4pnbmv74v4d69as76fwo59uj8tyghq1loi60ymp3vhwq8wr67ggppz971royhtorkbr2pwbzrfubzsi6lx6c08et8uo3kz6bn74jzduz3yz420pq5zb97b5q5oer62hgbecxpc4w2okk5ajhzjpt3vhn2qpf8lrv7i4rhqnigsvnwkhfmuk432ozin05crc1sklp8i6pny6m5wp0scwxkfjej69kegcxsd8vv0lqgsgggh9q2574hmofy8knngx5r2vhl9stuyh8q1lpblit6lr8wgo8ni2iql478v2wuns7p9f4s30q7i01tqc0mohht90szk3afapeuue85a6fse6y0ajuenghedm2772ruksb5jky0uakgcnrsdq9ct4vlae4fviwrgwycqugg07dnznb6tmuv9f3eycjq0k8yndgnhda554kf58tl7kqkzw1hgv5pu3nbs2lzpnslyygj3roc7efqjtowqla4gkxyx08mh0ds0s1yp2yz88e5dahy3eug3cguttikg80tp7foc6x4bgxgb2rbaqm1w6k9u2l1px3j9egvvfxl5i1j3js2jdgx87y7kp3yjkt0el3z6qmduexqzvh1z15s2mpaq4e0c2j4d0hra9dmlglk11bqarc54wot49j02bz21zxouf5mmfhz5yn44mkm',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'dwv0ar6642f4gbwsyo14ujwodm5k5cwpmzo04kx2ybj0kobgd4',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'vgwf70ct2u4ae1xly27a',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'bf5kaf6jsnd7qqwdky44mxf0upkw07g8xqsjjkr56c331ig59jyim4yuyn8ln60zaop9irwj0qdogohzvlc3pb0xn8bfhrisn1k2fvcleb4luehc35j5haa9ermqb71uuy3dy3hkmsymdcj98ojrump0dmeljhu8',
                channelComponent: 'dtvy1f52nhn01r9wffs1ugut7vma0iskq8nn48k1jj16f7gz2cggfp8abu1szjhc52xma2hq4tywj2ba3941yxbpqmqhvpjd4sb13l6jd9a7b7vpvo4c47sg36a82phabk1a4orcwhclszsg8vc93huzpi8vdvrc',
                channelName: 'xm4fux40vz7iw3o156g8j9onhulicaw1vcse5s2vjyhk2ts7ulywp0ub6oyrsv9n4z0anxrwxn0jt2c1tqczeg39x31sbjkgnj8kin7816hqqd0o9hxzpl6bp6ovp3ztla0glhk1obvywdm9pgvua4tbgthtns7ry',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '8xxw4jcnrd5oc9nw16gxmyi38dsfqrtv1bwdpcr1uo8pee0xs1f7b1ej62wm0mxectu6yc4t72kv081sldzmoiiqytw72ax0kcfd2vneb09yt6ms9xn2bywwk8mcf2ku50zb7p2ppfw4e1adq8bc609suzansjsx',
                flowComponent: 'b1jjtp0odf6gdiocn6to38ho2re2m3plurmc1ndicchx54czz0rei2k20my2gba2xfpq7xia2kg87qjajtynltcac2jg5kzxxrhdfoa5bm95lr05rztwbxyhh418954pu8ez481m8jtyiwjtxyync34agrky0fed',
                flowInterfaceName: 'iziqkyn7adu8j77soqn6t84ma4mc5enh8px4e0lsyj2wjatmtneg0j0rj0ntjl8kz2b2sehzm2oq7ekg3rietr9gfs21b25ckpspiegz2m0d5xuhj56d3k4p6xwrcw9zmnlwr9e64i58w3qvgympl4cuni4p7epj',
                flowInterfaceNamespace: 'ssj1mm4nuj5ega5hwxgvrfeqxw5il1yn9latv6psnm146kh4tenni5v492rl6xb34wyuwa5valyhz1zlwyttzxio59r605ounz30o4tai5i9dluh8fpp17waxrq16jfc0fclywapn788h84b44uhob0yo97cv30a',
                version: 'mpbqtrzjgmlvcmxtifg4',
                parameterGroup: '2nbhr1nn9e4fszlzezo09t12klg18ejfms3iri4ib0ku6w40rr7afo59dznorr12o9zuy9urm75grlg8ntni3aqmbyqckjcdq4m6pbqxhgmu1vcod8771c0grnod1wxrjr0hvw3m12dqnw88jlknf4av2hh21y9ybp4tg2jcu24xof4z65q5uv8tt3s4u5p2rx5kntx7ef0kqur545effl2bmtsyigzhplqsshu62o6bgiy5bmkby7xafl3rl7x',
                name: 'sapcbi5i5aiefmvu8fs3h7ttmmqwqicjd3dxupoju17ugsp0q4qi7mc6n8999xlzut2p9qi9qub43hj3q9qx681e6wtfwlvyyrs7ei4a3byn79n4qrd7z5d3jnv8r8luatlm9fqd9xtw9n03aijc7nj3h91zvxxzwz6kj6ul1pofy8ot7fni41kp258kfznd3y9y6fb26ftpyuzifwdq38vbn7vap9sbkmvl4nik0iii80432etw0p6afob0vowg4shb1ebeacwt9fogrccd4barvm0hiegda136sj4d08ejdcpqyep3k7sdi81nzvba',
                parameterName: 'jiv3b0jr7ycqyrft6vykc12cg1isg2ycvfynv2swujf2rrt9l2jvq0ugi3yklok88epd3cbfio0yg7y5h6ducsxj95iyxgc8q6qc078hyg5d666mc15l6y32cj587euu62toe57duqw87mr475waplibu9nvbb8tglmf7h20r1u0b9r4cq2ky8tpa33scq1ox8ze2qubxyyiybj6eknhxj5eprk8638jyju94vcvm3dpcd5siyxxoq0p7rbt0nm57z4pnt8gkw6f4uu9taepogio8w2wj61tii4wwcfjq388cxdmc3q2lo5ln4slchxg',
                parameterValue: 'oe3cu07j2kr1te1k5ae7p8c1a6inr4tm18k6nec44yq941trdipz5494r1kkfpx7ciw2kliyj8rbwj5edj3xcbli72c5t9ao3p43s7h1fomshurk296ku90gs15ild1d5pra20mm9se0mm03b2ayabh6w8x78tawofkd85wyilenirdhw15auey0anhg4e9w32xr8x2nf3fymhhguk8ifvqkf9cwh3dgza2q6we56yw18m1994g1n42fu5ikjf6lehxp2ezwfyvq61tz6jpfpck8edm5skrbvjq308fvxmvm4uy1xgso2sqsirjce4241gsulq653hp4l9qmzdx7p9pib43dpyprga2mdprvo6b4zidoq4kx1rhitd0q508lhrabz51owe2vg0fn5l6ik12q1iekjgztyy83t649icqev7xcq30b5sz3dt19fvupsj2yl6jvu5fdeok7hd17zuziwo09fexrzj8uilhcvh3b0k5v9nx8b1r4tm1wnhym9ux0o5rc8fb44kry1br11e886zvemhui7owpy3vkwlgdo7kwor4wpnhi6ma3nr9aeprpnxw5gnvbcuri8n9s8c5lpd0jhy9nc8jsv9f0choryznxbyyvuygvse0v7uvva9eoy1c532iqtbbie80h5uiwcjmj8eybnoxgm9t7v5o1ec7lfeyrthahwd5e3zrmi0i6jkll1vwl3nfwgywcjtspldisrgizyg4hz95sqparlynllmhtl3yjb3f3ytw9nm27ho62v2nnz0nlsgztbqdsxbkl2ufd1zxvf1bi6nlza5z789pn1tr0js035uzk1xv0tybrsv7b4e2geg12kk0ybx3s2geigi86woxqepk6ca5ayols6r1x6qsy7z0t8q9xcx59n22btwzy7kq0tq6tzp7f6rj5j2lno1a8zd0alojujirmvgdiu6cy2vbqbed6m686w3g9dc51crnptmnbfphgc93bm55r87b3igplthk0q5mpgmul21eszyxg',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'ijfhep0mt9jatge5qdcdquwqfes0bydywb3df51ozt4ni7qapt',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'djy8kly2xmph7qw6wueg',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'p6qbs3pl9wxkn3ym2xz3573jwe03fm3kpt3wcvdu6dyb7h2pvaxy09gjg8e38ud4e5ts7fk1ikjkg7u6vu54ow52giw1lzyuk4047h4tpp7f149e3agyp0nq5xe6evwvu5p6fhilo8s4tc0faur1noupgu56rlej',
                channelComponent: 'i0wi57uxbvsxhim5o4degc7r9mt2bvbt7e0y8ki2wvs7gusoziv7v0kq8ak76pc8c5i5vj5cskynxeikt3ze3cst4r4htvkepthxkmouy1zd5dg560zc7vylutegpcz0fkfzw9nfn5mftjh63wtyn7dlw16zk8wt',
                channelName: '6szbcb88tumsku85yzvwl5vy9d3nx8okl0nhozskod0xeylsngfemylbvnagjkf8nwe9uuhi9qxatembts05bv369yuwmjxaudtpxhr429wialvukav53kn92gjgt0j2tjmwxqprpndte9i23zpjuy4n86f7froc',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'oh0kkgcga143puskedrm4vcv3lj8vunqxfxglbc1smsstxno6ccfi3hrkfhtrg6a4dlxk7l60x9vsn9mo01zpghg3p98twa0fx1cq57li99a53fibyuaihukzsr741kjkyd36g3hwpjxnomokg51kfck48edom12i',
                flowComponent: '5y5zyjlvlvwidoa1q3uq7ip53gsc2ytv3n8p0hauzl47rg2ua0iw18xp12tysf7olrj8076iggg2bi9ara9468eh78s4ido162hzeapvdptmi15qguyzu5zdxus2frcc8o9x7qqfw0feamkfjpxi5fcbnxd12r16',
                flowInterfaceName: 'e8z9rwi6korjmpid2etgollebwskg2jgvokrvifvlgtg91yqxjombf03b9wk6ltl5wttfgeyezgwpj04tc8ubhte4tt3krivkio5c9y0kt5br2ol4px0v30tpy7r4tp06ir0xczlh69t4axabhuct558rmsylhz6',
                flowInterfaceNamespace: 'kbu9ybd383iew3hbqhqya6a6tplejhwl82w04iblzr49rxhz66snmpgdsxgstomnoae9ajdr0rx2inukaajysgrfx6d9dfl47i37aztyr0gud4ouyfp5w7gx0kre5adgnc4gjh3j0bznyn18f0b1h0gpug3cdmic',
                version: 'y1nyb7nutfzhhsmejjan',
                parameterGroup: 'k90rf0okwon10rez8ii8s2405c71blw2otm46bba32yym67xmmsvo5fgud4h7a785mhpkbln3yg1flp71hc5he8swdlcnvswuxupws5uh8p14ybci1gjw58y4f49sgz5zly5owcv9pn8vxhvva17wo8q98wie130wityoi6e72u5z97obd14es2tzmuzptgzb19wsebo6w30tm3vxijkxts9m84p6lgtbq0enkppo4xxer2wt0kh38f4f0jzsps',
                name: 'wzm2pnen74a4m4q2ltpv5bwdcu5ic3t5ihrnv7m8a0f4i7lbf7knsy81bai13slrva41r09zfyrkeftoprva6gqh0m9r7p43g7bxedrtnypjsbpc8xdjqh8sanri93g8tk1n6oy1cf96f0v5begei2fkxcrudjhw8ovilbkwg915usyhvneukda5zmr8vz1dwou9xr2k5jrb0pbcey5wqny8mcoyxf4x86gvavxj55rc36ntgruwmxyjfgjmhtijxvyfyw923szxizs51tprtppy2yl4r2y8it467bpfk9cair79n7hz2jjn5jek16ja',
                parameterName: 'o9ocy3eo8fltvuubpy8po216wousolii9gmh0pom3wl9im1w53bgsumhoz9ys7pi4x8ygvjl4x3bb48vtsxph7lq8ssmfu9ppoghpd107adx1vpwxjf271492okl8o6x2kjz88qk5e8to8w14as35ctxgxh7s6satuowwtymml3ewjgtzd1k0uqh9xb8zmz1jcgp6zc6l8tl86gdgrxvixamgwd11cuy94j7tgxyi1yx7dsu3at295tbo4f8dk67okoskwspftz4a10k7d8vbog09796r3anr6uviky4ooovzqtd8i8wh5x0zi6u5mo9',
                parameterValue: '7ikoesvrxh49a5e9omt5cxpunxc71zwp8r8bhyamncafgcpbidsc8vvzgk02pl2z2kt9q9o8lge7wkwvanpnhl25lilfmhn8wey0tls9tme98qov94x66oemkmrmv5mcxx156ulwsnqv8njqbwhriosteugkdyahfbwghjaabbauql7qw70v6g15y9s35924nrzellyw7mtmly3kqgnnekkkb4513tw9342jzqlhnfzeyb9carvyjkkjmz7vwmphsqbzcfh4vk0q0dp8kle81drewkh4zs22rjaujru2amxisok3e2miaiyr4pecw9sho92thd2c3bbp1gzl0s4rq3sng9cwltq287ec3av0a9qxvkwngqb74au2swbwpj7khazej3a15opccs30ls8xt612bmoue91gexi296ss5qcgeuj11d6qhw6i56khuiqr7tqa1fhq3sz6gdskr29i9rnhehlf9guc1agrhmhdegnaidczxeu9hp1s2eyp7url3yz2hz6gvr0ldu3vtwue5ic7jflr0x0z4p7e3mibqwehuwhyzgoespb10ydfbnkcb1cx61c8jrs51y3ez01t91bs0oxmh9yqd651awc2kyrv6gmrmg6wfhqsvocx4t5u554cshmrwy3f2c56x0zkex5dxkid99po5dt6kqz9kseq54n79piva9t7oedmf52f5lomziwumg396mxwvenp4gtx64oaxc0llio4zm59su2np2h5qtzdco1wuruxa8yx8gk22aefi05lbxd7tkouy628ukq20tvma09uv2tautie45gsu0osqm6q5mvez0qzkscs5ocru0my7vcl2dft98p1aii15llasoxy93x169e3i1aeoa6ugv9ocjs8y11puegaag23cabrqrza0zxkk0p0f727h81p8utujrqzbqgrqy69h1ky5xohy5h34w096rcxg2xhecy42tcnqozhb0wr8c11pe4o4mt2c1u62wm8wbnx2c2cof2dzkmm0viz',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'euovpv5dmu0kvk1c9952ybfkw5glw2md25ehxwpvdmnxvtmb09',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'm9ofjnuxsvtm7kdc9d59',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: '0znutmg2qkjoqhnkn1eh71xutbda89kennk3bni5p77lh2qb6q00z5nwo7aqhwruo36pv6spseb5972tuo9asrnwnsuwv4h8kjsbcr7rh3yiwi7huath0bun0i0kbjfcfj69baxps3hgr9gwlipcuml29vo8jjou',
                channelComponent: 'scuuyb9jaiim2u9aywvdr3h9wvr6esffxp3o6tcq8ceefbknbm5zpwo3f4wl468a99zs3l4h1gtsg71muw4pfe9dqd2rnspqqzhlwwisiqt36rm4fs8rgbfw2z9ojt3ui24nvb6dzsarvboi8eyiabcgtdtosiwp',
                channelName: '0nogaw7uhqusme2qmsmicj09y9bn5mna7oziu46t9vb1j4vupyhevdra1oxv3c0ym6spbvhbwm1wry0b7n7w4c1gi9os5rq47lbx8niqmtnrf6j4v5hpxxnw88i6fuf0kadd3p3m90qdazcch86guuax2g2b4a1y',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '0wcmjc64pr0luqe98jlogs9o49ldepzcorl470qxs155bx68cep7maw7i63854npim20bjwssypoo7qioglaza8ovvil5xk3ib1g73ta4671o1zte1sx2vhi1zjqu1m2m9jqxr6spo81uuh6kpg1jknejazmihtw',
                flowComponent: 'btt6kksev7373z3u2w421ulc8mcmhjdb1klaw8x9qr3lm0pgxveuds5ajcqa28burg8kvr1tbov4pqna5hz8p1bx98pr7eau7piksndb55i6ysjoso82l74d8qxzyvl2z0a6b4whyer43wj4a9spmlwgd77iih4cu',
                flowInterfaceName: '3xyidd44qdo4gymfgxbsfnox39888lr1de4reit0w4hx234k7ix080lybvxlalgkxp81ax48tq8x7x2pu3boysnv01ukca43u228t48dplp43b51y9t5rx9g68r1anrvvsu21yiv4coufl7czsa7c4ghooxykvyr',
                flowInterfaceNamespace: 'lvn48a5a5fh52an3pgx4f1xx8p74g09oj3k48qrw88emtqbgdupqbdi4lv1zaeqqwpy6xaygjnj6eyw1kd3aezwky0b2cz92e3sb37xra0as551h87pjq6b90ee3098vm7xy31wh2spbe42bwvaoihihy16oofsx',
                version: 'x5mvgx6vyfx6d4t472xp',
                parameterGroup: 'gskew12vl9ghfymt1h9d422ygyedckcluxfxlhb6wfz51778dmqo5wju0qziglmrwma4at0x50356fndny5qnm9fx7kjw79juvm76io1pmx8t8da1r4vftcjymquiy3stl8jwjigwr2s9ki3hj6f9ptuugwk2k27ebc90h8wp06353op28qqjobpqz2e93wfj3wcmn9zx4yt126596t8b4dah3p7jc3hw3mqf0rb2ojfwysixkghrq8ji85f6ec',
                name: 'q5ppbu8aeu85byhpszls3bf1oqro6b6oelnuampamjypum5o1km1o3b4yvt2aq9och4st360wj8afr55jcvmrfvx248kbh4z7pqnuv4yxh1pnmbaxwilnrjff4zbj5gg62sf2dupxmqqq2ny0noqgdr4rbtexnlgv8km8y8n6j4ygkudyfn8pf5hyln6p0f9yt5ajq33ph8ktd78vep9m0deslg6mdrv6tu16jkp52vekztrzn5ld38tzjpwbczmxfyvojymdx1vd29kpuw4s4y1319hinpmass9qoo043wc9n6tcc67fpaqc1zy1siw',
                parameterName: 'bnt91ejnz4er4iew9ttwdf97az7mz0uyrm0zmb89saumzuihs14u9y0p4pkuul74cun4n8dbpqfdpryisuaru9odfykxuhua4i2an2cyfet7xvmmpzpzi6qwm6upzdq2e9fu19c97qp47wzaw6nrzlf0ymse1ipuqvt43rhopapww86ru87f9gn9aw2yemzl57f0ifg2koqtraxop993wnkju0odo4133k0jxsavjthyrcyq86mp16p018rgmyeuhlhlf09miz0hr6jo9iws9arxoat4y13qy0bjek7pa7jjslflyp05dednju1pekzy',
                parameterValue: 'jgddv8jc902v0qjahzir64lnus8wp8s2dc0tn0xegninccs7y45oepxgq6o5qj6trsl4xhdagu5i8l52igzevwcc9qnvtfw3an5k4nxz10icruy2boc00hrtxw6yd6fw9u46uwfjisgjv6nmaa7ofr03w7lgyx5m2lxs25ouxy4tyx6s1g6ycr5efapuai2z1ljzow4whmot83ns68cynhsmt08jn3vtxcpfb0vi2mhv3hmknyp3cnbqs38vvehy4sv85dav1ek5xmto2bs3cv59a6tq31r5qil7imf9f8g745ncabui8sz196577wxq5hxvp4dlq922mf65xj9hfn6k833aex2xlh8b1lybxh4q2pj2op45oh4fellwtzcqbnsc2roawl4esbbjko011jaz8q9fbap3fy801ga8trvozr5i8jkhs87jt64wc83nb8xutp513ml1bt8mxdmdzsjsotzqmw2zl5m1zu5m1za7t27bmq5cwwzji9f4cp76m1ygryg63p2yrvunmdagk4q2sgcf3lcdh94drkce60t3avoa73onf33hjlg69fffgkz2krm7md4qbu0n07onuw4f84da6hejpewtq8v1tlhddpt61tdpjlrewho5q4uzzzxqkp1ebmvwoyyqofueyk0p1jykld1berwp8ngjhhie0skolgn7n3x8a00jz8bj8whhd7rv1ay26rg51g9izfuaoz0q3i9ctq0gs4g2s2o1fjjufllxmjemzvqb4l0l69r2uljgh7u057gpvzq8sgoak448zs3uqp9v8w7k3qg0j9m3hwnpfk633le7vgbv3fpzqnwwjwq67wrpaubsxc4nao3nxw98mqutldeac34vordxcu8lxpqnuz5r58twu54iz2t0utt2nu1jk3ylo32ew0yzt6p1cb2o4aqtydow41qc9hepfrya23psqyg0td4yjvnh2xieubzu20uzm5swr46k54olfplg5itib13cwgvnj28f23kx9wkjrj1j',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'qnbkyi401jw1nrii0crey4mhoxryspigsk951oc1fokq6k9xls',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'nozrjc1e3d2m0irpt87s',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: '9ry94eh43skqgmiaxsenmllcnsoazcyne96tv9carhxjvdxg0196w7nimzwvaiiobryeviarmousjey8a7nakr7ulrl53kiwtdjlz5rscw49adbnm3mjz93nv7iode628fwt30eln0a5xuecymvx3dnipiumf0ji',
                channelComponent: '0de8utlvp4tattcafcvyuylgxdyxh4uee0mki4179ubrjfcom3euc1bvldemlx2xzaovfo8oh7aqv0q41y8qss97elliq6lvzeg35n4t1snlesmti0874ed5k9f5lm4rnj6vaokdgfdoegccqux6wjpupkjjqjt1',
                channelName: '57bhbotlj1aqlr12bgexbyf3jpng5rz8uda4odi5ru69oumy5qlm34r65xewpemmkj58invrbdtg3bd99h8dchc6ndlq236ytbscn8zdnh0i6niow7n909oukixcpqe1s5oybk5b9bd7mjyiy1spro4hxxbdrzvw',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'l37ekoyzxizgijvsyqi0pmo72d2a3aog1yrpue76vrse01co6cb4xwcqkub856trumur71y9d1hfuani7apf2vjo6txk15lqan94utat7zuiuublqcnap73kdjmhfgud2vix2xu1oty231udh3lavj5elqmq3ag2',
                flowComponent: '6fr7upllmy9bi0rqp1iryvvb3w4yhw2ewe7b8f88u3ye4mn9c9gmlctlvf3em1wcuwbt1vhwv6xftihve2lhiejufgqmojj0krw54blnnav0rli5pejf4a2orqgqahxc1aoxg0o6r106n8dqe6dvhadwimafi45f',
                flowInterfaceName: 'h310c81onbgxuezfbz9ke1x0fw8uai3u3b3svvutzmcsow0liy27odgn53y85ux4ngp2rmucb1vrznvknliv9ltoq5hm8e6mtvxujr8vcemxbrg4v6k1alwdxkru7aypa8tkq2ky3087ay6n4pvb5pdwl239jbmlv',
                flowInterfaceNamespace: 'edjl0xxgaytyil30afqy9tc1fauvpat6d4xfrv3c3zrjxdcg8g6kizd1rnk94crybwq6lcx6bcm53zh05uu2ly82gtjte9u3dv1x9jrolvhgviqyfr2807c7xzx6uq15zvgfacyy0iwdowo4ybaj15h3q9w395j5',
                version: 'j3jv3n9kgko0kj52qy2y',
                parameterGroup: 'nhbr8gfa2pvlpenw64kt4i2z34fid2iscwrc8d1yqh2vb8f6n1vpdlkusnnvp3eroaxb4oh3u5j6bg547s1nt9q495lo5lphv15xuy7xshd6rkrpr06donsmn13rdhh23bf2ixiane3bequzfr9fwvnv9l0fr8c0zgpd86qukeiamucqena9875czt5ol31eenlcplnvo3urlsw2zze0zwncl1ium7rawe3eqhfygowced0nyqp48wkpzxy3zw2',
                name: '4bucnw3kwdl7k9xr5ihetznc34e37vqfkpbs3e9d3zl50dbdss8ksvp9uihd2plvob98y2bi7t6dhle8tv0r41w2zbhrf2fvqquy6hesn9da9my2pdg8ciqe9td8bvb3ou3o686leyz5q8d40ylpj9dc7n4qmnjzpia27exmwlakyh0dktkjzl53f1o5i4zpfpymy5f6v7u35soyphxph7pdv5sqghb4cjm3k4z660ltr4mcbqxjbyxrrmjpxp29dickktdf5t7tw7lmt7wf8artu0shlambtlbl9zll5f41ax0s9llo98c7qfbdvbh9',
                parameterName: 'doooh7n8hkyrwrnjld24ib1u3d73zymv0gdr86oqkddyqutmpxh2lktta0zrjpdq4arl86p6bcxu57ffnpadharsw9aavql2jael66wxd52mte37hy0cefqdnmxbucvw2p8a2grn6okzd6xpeswb76qzmlcy93zwb33rk1t6yxfcmhxwgs9fjr6ypk6kgukyxumnh0r81h8n66qbxp9czil89d69h05mqwlovwonevyxobus0x0bs48ek8gheii1u9h7xam1da7a9rmjbyzw3zf0jc19nz6h1zygwoo86crb9mc3bpul26sb29qe7irw',
                parameterValue: '20grpicmkyo2fb0yi4xiebrh0xkumpax3uansw6bulamr2350ia3zc0v1mkmg13myzz0yom2wo8bn13v4n5i0zvtdnev8ep1ezhi7oqhx8y3ls3mxbdvoediorwzhbifpe6fkn9xxj8h4acrpkfrhb4nh71vj1slp7cypbf5lr1wp4sxmlssdi1h257bdaxlnv38v3hwk8wf5xwnxjytma02vpl8w3fkelfxn9osk1uds0styiuh7zlrsqddviiyraos8uacbmx708wfek12c7caug0dh3ydttnthx9dosjeqqa9xhpdkiud6rlc9mx9burp3syzk5lnfb2frkz5u1ivd5f43ashv11b0pdpalbg0cj8c1dw9sog772cxdoue7hpcghbl28cbq2iplqoq6ba41mzzp2v2r6kmkzjob58ftw8mxvzl2yc17ep8a6f2rjm8tqg1frsniw5dn0scd5jhs5oad2pmdkfghs6mncvn7gyk7tskp5iy9diwmwaxkjbmmlic6yx4b039lqf6oqxzaj0zc29qik83o3p5hogmi4ppxu1909nabn3235ly3uvk9gg20opl6eiyxz5zolrnlm2ymybbj4pgt3afukbraq9fr7zyt656fzve99qocnafeg0134uiqlmn672l40qfqjz5a97sh9hsjcr3kvn08qkiox28lem6dlj9ooq5ij0lkrhit2p6qukv6dakfyxj80snqfohonggv2dnhera6k6c2eeg9qki388ifktk1wgjie11jcok4f8lt61vp8s7jcqdxs4528n2082miop4jfy7cqsni57iexzjm7j7rn2hmpxakeg3klirwoini6e12xin1uxhlp3suo2nnst5d51qye79202trn4c0nmy23w4ug6uguwrqul95dcrtffmcei1n7vo83ax21qb7ii1i22ouquca462ilh59mt9rde5k3qpt7an9wvikhyo2h4idfuu12h1b1wbnd4yhwkllnj5yg85r9ljgcnocj0',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'b6xw1gghzlkn7rp5rss127kjdebljd09hhq0o2m6t98uur2uam',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'h2q2w8nk8z6r3r089pyg',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: '699s5wm8qt30063i1lanmh8pcjuelopmz33xuvsqcgw1tn7zkvy5xvzqfbcmkl1cbl2g5m4lfbvbe6gt2twtqjgni9q529ujsmivw63pi5pckolhj84r0zwlflvj36k0oa2h91g7f2u3ixfh0ei0rnf9f584fu88',
                channelComponent: 'l5aig8nghm9iow4m0u9l9fbr82syq78zor5gxo06z0bjrxlc6zmzhn4f97sfvkjttcy26exzuocbac5k4lf1ol7caw3oadyjw3xqb1yd3k2c4c9s172gp1bk52j95eqegpvodr0x7eww6lwcfu0f54pbcic2inu0',
                channelName: 'wz2hqcnzspl7v7jbijb5hnextl6v3ck4259o5vms7ggpvqtqcim9csi3g4aw26bw8izeakrf9q9296887vx3gxy6ip0suxgwaluhyihrcvf9dtngajq2xh8m8u90rtcnzsp8wv76c7nww0soxwq401z0xk7ev1ac',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'cqrnayhk48lvix7senxoz1ve7vfxalefff9o40vkh26wltbwo8brw92h5mwzxl0x0n58zo8ppyahh2ijp8fqqjhenj1yr8ge2z6a7yzlw8p9ea3o6bu12exeqz3nxwpr5rcr06sy6jjv939g3rpwl7sbj7f1zx4k',
                flowComponent: '07g1tnsqy9flrjz64fsp603ada9275gng52oiaxgga8rtxivwwc32a1cyl728pkdt4fpe57nswajnoaw4pj27mjmwp0oxpxngw2mrnjol8d9i3w6xkvssi7aznve4jpy9rpuhidqhw1zrbhot662996d4oletubk',
                flowInterfaceName: 'f09pgh93kf4lhjomr2p9il86v8fqehxf99vdv9tuksevh1auyou6qlgojs02j2rx6jv6uxq7z3uy132jmjowaui0cchrcw2pl4cbfzgu33am79ouqo7ljswviwilqyl0s3s068db6mn4ojgytyuxiezjr50jares',
                flowInterfaceNamespace: 'pyez0p40tz99bczqbmbmko6z3rl6ivh4cza7les8fxanm3iqxb9jqxz96eb5rmsoiltbe8oqjk04p50vh67pp8zqsqp4ssysfw3s7oyv40a1z0as6x0h70gcfpseyom5xmwhuyv7e7s27kmk9c8czt58kewer94co',
                version: 'yzdjds8kwl4wfwnzwh9f',
                parameterGroup: '976rmcu8mtfphff9c2rlgirdedh2m7oyso9dqid6cbnt7erceew0fcxz612jgwu4ud0bqtwew9jbtnd9fru6b6brfa4lmxs7vv31z21nj6qh2074tvumsbobrdgb5jov1vx5f3m1bn07mi4p059upto387wgxtrclf94briw42rhhqnrqytwg304gthnqca7zgrbammctrewhb40jec6dbwk3mm76zgg1kyn6gj2ekxyzsd1upnvp2acvx70hvr',
                name: '3ylak1xby1nt2b3ifc2m95aeat3fq4f2qozloqdb3bcnzwjr8uqteys7ennom3g4gzmjh1cxcnivy1ignnetdpy6ojxgcmooesogvsd7ibkzl9fu3s2l42jc178od0niyixb1ee6z9etxqzg8zzevsfkzm7inbh2sgo5zwbezlxrs3dbph6stgbqdp8rs390k35n445d0axchqfavi6zkfqmhn25r0gqiuj5zx80vrk284kpj88ofx33wd3c66az7d5igrsctbkgdpmo4r4ghjv7kz05cyuc5pjop2u6t99f0o82srj0culalkp8svb1',
                parameterName: 'fiee020g36hqd19trqudee46mmgfrioja5l1f8snl72uo91v25akcpj7jvn98hshlzkpr9fpfhcpgoq7zja2twhqwvavqkohv4wbnv3fds1c15ezokld22dnzo9ghmd432uxyhd3y6fbz5n14t9nvpn7pvz6wf8p5431rk9ja1043nq8vw23849ulg8i63dyo410lj5qgrhmx4v6bzjq1qvhy9wvr6rnl5n281y5128lvtm2n6jmaph5miiq28870tem9l5r960y0e7c9hvplzfv9he5kutqil7ad66fwvff9a4ulaas4r5i64m9l6c4',
                parameterValue: 'dp1l9hkxljgytp0jjshhz2b3oq62lpyov4znznjb0lkb856ae1dvj1d9op8iez0avsxx6nfra3zro1gt0uiifn61ns7h9aicnwp42py3zre64twoe69v8zh6qx9pfd5cyophox4huiouj87vgmp6mjux3b26d03c8v6oy2qa8g7aq3yzv2ac2gs92jb0cudcdhobgtg5u656eiku3qn5dy59k1p4ubnns5e1tj3ousohdv7nv6qlwpeyu0mh1w22ucliy4yxaga28yjlut9xuc0goqlolubqdbfupqksk5fz6fwp2uu27912kafl9nsqgb0in7cqfzcwtd1iavtef26k3iak7bvxwdr9ijuhhxp8a1t5s3l7xgpnepja7sfb1pl1nw16czs8mrouctpa5smiv35dwfpd6f0e1qymkprab7ztbmmte3qzch47ss8l75w272yiw9q10xbffey0fufekja1qsbtrbjyz15t99ulwki1kcelny4y1b623dzwjpjwiito55dy3s8r795dwt5yxcrtgot1mqvfb655101ckwepzcjrh1gy0kevc22u0605fjryy3e8vv9jn7d07cyiefmzsshfqoueb151lopsmkjgk2sfvnaj0zfjafkwdlo7vylmmk50062ocigyznziteb4gbgsvalalsnwhql1768rc06aqvman5euf5sx36osmihudtuw2oq43yoh8hy5ov08gz8nhxbcs608u6rbacwy22o9wc81ecjzu90exz15xe8odnw4ll8u3lnnwxbgdf1qktvontngs3jp1xtkn1p5cra4r58xxa9vk40ihgkq9b4km65rfe6zx7bcm1qbapwkzsc0bp0sjevirvfd3br74d07l45ja5dyiaooruy9p1xc5doejcqzftmy9j8x8xb6aatpwwtihju7lnhmi8p7z2w2vf62tas902y0g9xgn7wtaajbvedsnqejiceoqstyclmkk083picisj6nwr2ox3z1dbbni8806cp6',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'l1t1yx7mhu5xb6cd7a27wm4akz0017nha5gj9bz04flfbv3lxc',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: '6tbjjv4qdzfeaezy86ur',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: '8d4okq0n5wclyx90qtnjy1pp3cjvd4gog9dljrc3fm8k0cwvkfu8ku7g6kg14dwqzgbeufmdvb56cg7abdv5cs2xlqo2twlpjlkmoyzsqxfcc7v3abqqv28rmw83t6q2zeb2eci1koog3ctm0eq4enoqxg4a0k2q',
                channelComponent: 'wrfnuzjhsg4n26ob95u0i3ls9r9oz9rxbms90akvot2u6afs5yo7l5jgl0o4feb1k1vqxsc2vtimx3fjju8hk38msyufagn4mmc6ki6ie3ta7kpg00tchxw553opsg8h3gds5ae1ku9ahpcvrdrznrdoamiy741j',
                channelName: 'ioo2ld7uec7gd9t7g7tzx54r03xvpiejz7azkzy6r329q0ojcmu4srjq9qcreyukv2b9jhlv3li5gsm27b29y7cmx9ayhpcyfowojecb4lb8wr3oyurqwnp7uq2mnvzslvnsuoh3yqp0u3j54rpcw50qzd9diava',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'w8w3opofv352ttf08h11di34p4z2ygjr5g64xxrxvt8mjvsh187avxbf4ekj0zvt1kdkbwmxu32a1p04yc7s8905v8iybz26jgwe050y0t619xrvifq7zizfw7wxm8l2iwu05vv8h2l4l974wj9uf2u1so0d6d6f',
                flowComponent: '8vl1t413pm5iikinb36ceda3l2etkvz6495cecewozfm40o0evugw20owm240sr4cvtsxq39ao3onz57i7ctddxxbioh0zpdq0m8c2rovxzduc4jlz40oakosypawv3q86pipbymyv8ip7hthey0puj0ufwp7fzt',
                flowInterfaceName: '8vzzsn0edrpr4rxu7ayo7uibum0wv0uibm0bcaih3ul6m24bm9qpxyv1vxh3giomcp16wveaiuh4rmaubgp2j5p69fz8zo5o9zat6y89uu2x2zzidrtermabnubst0diaz85sqf6cpex1hf9oe8erpi8kqonlwe9',
                flowInterfaceNamespace: '2vfeuo7task0vkrbcpqyg3g3094kw5ghm2ncetfje23bm67lt69ei81box2vuwr4crxbswe8grjc57gbtk7qx6vm6y21j04biyzub3djmnptphfut85l5mjnmmjl90gvonuo48vvzpi2m81atxdoch2hx0qhwy91',
                version: 'jmpr7psdyh1mhoq8s7yv6',
                parameterGroup: 'kpnm65ykm7rqc28e56e8scsvvtpxgekb8zachjap2yazt6kejmukst0bhvpuw6slbdkgtf9sjul8688ovy3mfxf11t9ru3y00jj5g8dfouhyo41jz1np67j8252rl41aghi0bsf3ml5g01z6fucyrn5xokdcda54xe8xjrny5zmtw433iogizijcfwhnkzzqkmdns6p2wyaa0dmr5tpix3ex31xljh2om34u8vwvq4zg04rrwdgxxzh46kgkv5m',
                name: '92y5c57ttzb94suwhei9i90g7dn6csg8q5xiq33m2r93jrhmbvopkc4ie5xf4qemcjunrq2csw6i8f23avb9916npdhc4hcmm3n4khz0r6sb2guzxsifp3kuvwgkz3i695y43rlt8yzgg0s08rvwnycd8b4wdlvw4jq0yyop5m5kli8hu0iptqunn5uf3gbp9w78f4zomcji3f02729gkkyntd55utoqy6p7053nw4ql0gnc0j5248n15nocyd5kq2kiiawlxf5373j4sxmlzlvuesbczi2juislxyqx2zrzxb3obfutzugnmzvo37a3',
                parameterName: 'sqlxrejh6lvs3zsduo3uc14ep9k4zb4i0ksuvdfkbncw0w5arhm00u8dcefhcupx5eolq9tx613zgwbgm2sqqd1fv66aguatqh3a6t0jrl6v9nnp152smpylp60eane6pez2mnyfaa4noizdslckc2pperioqov1u0o7x98gaghvnveefygunvb4y7k0e10ume9wawor4gr4zw839e24215d96rxn1cg3fiagpu68s0jkym71pjjfqjpk0pw8hoxrq0ibd6ibipz9sx6mpz7xe5dyowdulmi5q37xc0ez0t61o20i9sijejo5v0egvp6',
                parameterValue: '5snljs49ltq2rp3wo222ivqcg1ox6g41eqmjxeawooekga44spowizu95qwwzhb3rc49u0icdlovieyybk7zf4onkprlol0abod09wtcfd7srbwjm3rulmfvfc6490n7q0mz3ly3w3geqq8063x8a9hqynpnk3fvpgtks570wu50faqd88fdpr24kwk3i6sksnb6ptt0gbge0ge54we4m41coy8ahifmmxgdoljm337cq79kuf8hpqy0262b1n0f6zbybzdbb8tdzrobu74fnvdm7h86lkikxo6i8olzy0925r0s8io590j7z9h3cir7la8bkev2pda9iowdruaiyd4blbdxe7igvv5qeqqu5wxyjhb7693zoy7lzvl9tq24pcc01jl8i8ob1pokajnzcpwgd989caemzbbsj5fvvyf1olwldqvct0qcr4xbcuygfv6aii2tbepp4su78em393oqx2faukxhok89pvqlzp6cdg98dmysk4pjddk6qbtlivtwljmrtbi6r0m0e5c7070ac6gays2ws6uohjnxi33he82dw8gh58fyiu4ugoplsbdifm59lid6uqo3p496cd16ahm54qo5xdbsrciodueypb0l532hn4b5a1nu9qzhltdfb6put65n1na5cqt078ep2w21ui1rh0oa9chvfd821otriacv2q8gve3rxnxfaaeb5mgjluwwfb8ltn7yhkcrvfika3g58x89u64rbsh6l48hno3rn5azab1aprfnp8lxtf67lmqrm7082ad2emv4qz0nt7rao9c6rglxnzpu8zv99672f4tn8ncrazd8keos70dpi41j929ynuccn35rszifbpc2utruxr0oe7wjjj4a6ymogxqzwnl2z1cgdmw3jzfol1hwg11ls0aj4mk0bgjl1nwjepbem8e0r6lbg5tshs6fw6k41r1b1vcrizzxqwvagzys7s5rdlh9i2e9gamn4hi8jl896x0s3a7trctg2gvo6bf3q14ehaut',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'qj0nma1tniupuq7uodzm73tfay7gj1dcnw9bnw8ortxuyj0uue',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: '9h3vgo0ihrcja4r8nqfj',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'i0h0ang2rxsw3mx0blol5c251gl4hqrigqed89x0rljmmcvk8pq9azxoucuh6aj6ekrpih9be2doc42n9mn3yrxk9tggmlo8u7ib0y3qn41h89roaq4uzw14mjqcbsr8fx1crnp19zm94xghtizbplkqrx49efc5',
                channelComponent: 'n9ncph5bgjc6z7epeotrmsgggekp2y94gkkwx3y9n3lyxirzz45eh5evco2frrwvhmwlj6kaplnj1vikoghcqqeja6m5v73xutudxis7vhisdbxz0z7mkzogygckzhp7r5rcc03yyb2kqe6t9u5rz46qimbmzy2p',
                channelName: 'h0ksxtef8m783y3rz0usxxnqyl4deaq1xa0ygxdcg3n2om52yhnmembyq6b8up8t5qgjzjq4dqfo29t8k8w66ny665jgx4f3w61lvd3o2d25ectxfvne686pluyiiuluw4kn43z8uibsg6y6pm4fia50l5zxak2i',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'fdrlyz4p8af50y9apznabu6v4o13okjs86fiiikwk5mmbvci6ybfepd06qj9lk3tf9p2liw27bqnf8zf8gxfrg3wtcte5m446w5szdg5fgo7p7jrafrnfk0e46003q3pj5jy71tkbxh0vzubujenjd8qnu81dd81',
                flowComponent: 'cxatrxpixppg0dgik604g5sftwps93bd50d8namill77bn2jciwaz0tjk8bqml1fkadh10pqfuk9pdvwh1h8y0hds6k108q1hs258fwiz64xtz9bhi09ojya1o61bt57332iuo50g15x5cioyfsclf6qqnjg5z5f',
                flowInterfaceName: 'h236akw6d51w6gtix08g0notze0ocustmg5krcj1pvvqqglqtt44j8wbnvzaeyfq864fnacrzsyt3ghytrj64qsmugstnfho5kw02a4ljnpl73u2x1xzc085yzcyipz577afirr0n3u9o72qdblat1w03syhmkxz',
                flowInterfaceNamespace: 'u71uk652n3o3ses7sjcwvfodsvghiu1ywc1izkefqs8r7hd11rpfemmh79nyi0ngattmlpp2so3nsb06qnhq6q3xjhqqlo4yk4cb1wbw22venlffltdmj2ft7fp7gtfx58hxepzc12gccvb7eqdea399n5kpqd7d',
                version: 'cbmh5slss6anedyyuxpb',
                parameterGroup: '4ln0etub5p95s42a2knexir4q6gfrdwkdxyac9z25o57o56vl26sijxy80vf609j35fofhwq4crjzrddqp2ko7tov05vgd5yrkcswu615gtm3fqlag1vddu9czwqh15wym4lch5vyue4oikqqg4rlva8vrrj76vurx50oxom7o0jhdvzjkpsp85uoav4b0mxmqtgu4w2oxqhcz70vowndovtcrsqf3ajlpzagvz6p2fsi1yqrl19p0r2baoqw87z',
                name: '86k03dxqnyq10uf20pmdoicebhhzhz17ty3ew6uttwbzmhjechjyccp64mv3uvi6to1l53bgsctf10ozihqjoidaixefgl1sxvcwxhe4l8vhc0xwmjvuhwvx7hfeg7qd4j881j8i8j13l69q0cmaffnexa7hi3smyhl0aag15zs86pr3x46lt000ruaem1c2zsfk104yhbd8m3x7jnawrp4skjtwlipncmc0wzjmncdp9bsro2wnbrz8fgos79c31jrgurb7a59ad1k0v26ytc377bog4wmvwfjpxri21zri0da9ikg16a07gvvp1ywj',
                parameterName: 'bamrpt0ogrocx71149zjuvzxr5vylvsc5ws2b0kktexh3njkn6f7d6yhwvovzjw0hj5k6v2clm05z21or92pplzy5118z6rmnyr6hrmn1yzbqsa4eyyktaxdv3nkgwuezjsmufh8qiwhsyo89bpg4xwn6a99tu7rb165vh08hhxsz6l04ki561ooyqpx2i83x9059px9hrw8upgfl1wb73j24q4zxoskc1lprtubqvh7uvxt2ubssln87u4gxsrwyxmb28xi456qfbdrvzaxa9if9piv9bvpsywwna7c4ufy86ictjvg59ub9v2ezcjh',
                parameterValue: '8lldke6k4dq785mwhsczicn5rhvyhfhkemmjy4gii4xor0oel7fdbns91qbcewa42rw7vclsc9bt9wmwajc425sxm3ai96tmbvps1k50sj04po2adot90yep5tnq39i2efzlelxkds5m9kj4pd0sfm4s530iu6tlw6wx427kuo1bb6g7kx5pctut8i8i8lqf123jea128hel1t6mhvfyql51vngi62tk499myag1e7bf0wcs8jv1perr0mkmxvcsxpa8qbonf89oqzr71ikm6khiwekv2kqcu3bxdnuive639xxc9yyn1x1zj2ezbohx2b1zlab19pxzrdlb0n5jxj1mrhw5y5s1po45vq2hkaggojc6ua6f0o9cqr3eh401odpn0hb2arf9iggnmwqtz5m3bfgmf5drt52xww6dmcttneu14dqmk72j3mm2n3gwg81ycb9p4goplak03vgv0whylvec223gcm4suh5zurhny1ww8dfo7og2yhb2cjaurqxujmyalhfh6tnu8bs8jodn2gdccqrse59uzjhq3ksblzs5p53mxknm26pz6v6xy49onkoc95y9w75j549k7crzcpykq3wayeqdvjbd7ssfv8vippdsa6nrj2n13ovrmg6uv23z79173zi6gdj3nz61e8kg7o7tlgswleaqa9vti0ne0pzc8ep9kczln0sfnje4wk3vzlfyvb1aupnnkc70vdd8g1j8rhbozo6esfkas9bmaaxtozs74djxrnl2fmclcc4dntp4k7d8njr0cox8v0vxmvpogmpqin7ec9ede5e2dda98n109bd4tn1aiyymex2l4um8hr5sx1yr5w53nnvrcf9y8o7tb4ba6bxvr2rltwpbijwzhc5du4eoh7gisvvzl58lnitxg4h8jj36500i9b83yn9b0e9ccb0i3hu6o1m4fy4hbaaqcoxzzzl9v8jcatst9h3njdi6ewtfstosjjjl1saexo3zbb2vcoxwx1atl4up7cec9xti',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'y4d79a45vzyc3jwi72n2jr2ecgnj5qveoxc61nn4vx429o65n5',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'tqeupbow8a1va7b5r9sg',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: '8a3fqtx1k0uzrc4bgr6o2od7mf707iuj363oore3c8twimkgkyfz4m50tj7cd1w8i27ap58k754bmz57jcb64uogon4322uuuz8phn3ck3fnd5b5wcdpi6s3agcytgjncx5mvfx66bef1lgr6olgmwa0amgspjxh',
                channelComponent: 'i7a7p7gqjw9se7421hg8f81jbjx7shqfitjcq21367k28m68n6r4bqxpt512xuk2vqc246u3740fgd4pquzieqe3o5npuqnqzzqpqqc11hmpcbjsd4leusfnqpkfhtxoren89q6x6z3bl1zi04tl2j1mqwypqrtm',
                channelName: 'orgveagcd6fhs07ocs1snzxexud8dk2sj8ez6q7auqjvvlqakyo4fc5at2nmdyvilkew3a2xrxh6my8usi99ryimt73ebf74cl5o4peao5ieykcz8896zv8n6h3tekxnz2gmexa5scqex9x9faa4mpcx4uxdeyn1',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '22eqs6neahb9qlo3z05sh5p7cs4x3kof5f0ycy2ibqkk4ch2jvbvyav1e5c8hd4hkrnnr2fa07ji8ft7k18a8pd2xnz54cns6vi1lla4o91km3zo3ddx9hv1nvcvi7onderj01grvk94khzammmeshlwcv48l14d',
                flowComponent: '61fls2xu717qxnlakb3cbctarcjouue48swmx06u42bjcgxtf41bqadecwzneb4pzf9z7hy16ggii34ogwi4b2fvmzms1y447b6d0nllecxsraobi7n7cjn5r8zraam9j80jft02cosfn1fupflowboklo8n0pwi',
                flowInterfaceName: '494qgdyabcdd7ks6gy7ixe0oj1yup9dh3yh2sv35tkpjib2ba9merqaz5al8rde5b1p8mnxaw8cdvx7vefr940b7bfk0srbyo40m00sgi84crfh94f4g87gegw8vaak1lir4a2qha4mpdv7dxcb1jlxisak1red0',
                flowInterfaceNamespace: 'cadlqu7so88n5hgbefasm0p6ztajn6m4v9njilpxln1km4pdegyae3n7kmksrc57lou12qt4iep6t63g37027tekw4pvj9puu0hfw5hklydztc6qk2ngch3n94sl1fgzdrecn94e0obvfn2crknvr0xy2n75abw1',
                version: 'ssxbg2hw6uq0lsge2d9h',
                parameterGroup: '46t0plph9yjatsvdjil4oanrrsrfi1zwq7gngf6u9w9yjqemcii5v2qskel1tnsio3z82xq9f3njxyvxjiw0ln2ynnksvjy3u638i7v377lntlsx36fkpuaquyn9m7fr49c6spt11fyu963w7e5x7bie4kz6upc8ixe37fjh8h6jpn1edyllajpyil38ck6tz5zz6iedqzg2pvmth14wjnlqfux04stmlhteuo8uq5bofd2s8un2ap1541e84jn',
                name: 'dym7pwtbliq9b89zsgj46mjr42vgifj2zqaddp2xduvbpnpktnthww6gsjq1ove3n4y4poau23xq7hkcavjqyexl2qjcjdbvuh5x3b4sokb53p8xmr2831vliwx6u45t43cwmw4l8r32n6q1icrcb7aail5h3wqjalnlvvzet5iryc6309sgek303unqkid1v9e5x5l16pq2f8rym5whc2c8qznog1suu9rhow10xqwglvyms8npqwi27qqm1nz8ydwdr7o1qbnsfrqk1naxos15mb440ve8gzrrxddqtbk26jp27e0ldkktmyt1wqumw',
                parameterName: 'y8plbmvf6gefv3zd83awevyq0n8egn39ifvu296dyt1bg83ivcyg9blq7d8pm104wt538g01gfaxjm2hfhdkqphz9n05v9dber0w72soaz9hv2rbc0bio4vz4dz425sdepttzmfpmhkwk4qatxtjml2o7pmouclor9c9geinpbks0boqmt2nie72miebs60p5z7rpfqrbukyw72svvpa2spex330v82euf0g6dbf8bop3vtiqgskd1q30qa8364f7trk0awqx2j9r0sppm4bullwo8cyzdndfhto08j2ncs15ywi6xnmn0pnssw7aw60',
                parameterValue: '2qho18jm0y3m2alvnq62bmiw00w3ak0ub2diehihpn090dyviwwksiztw6l0u2x4k4ifsurbo3fc69oc0k7a1egxs6jk272g2te0mkgnkcnp3283jbmj8dupyhihdy80dfpub47ce8kglkf8xa5dkcr5krwail2grkbl3owfyyd7yd979d47o1xdqu6m2th2ak6mueq8hdenh40zcznqlmddoc6xm44aylh42hcw2lzrohnickunapd1b4af1wwqvathvk1jm69qea73ibo7a3tx9j3qdplpcjfut6hikby2bakb46x8rg9y6nti7vwn8pscaf1ex46yk9mdvebsmda0won0cmbqc0phrf3a9g99iss8wdgd2t00pkdfe6pu1l84bf6q3fvwv6nogw9tj438lm5xn9gt43l4r6woj9thtfze5kpxfyvj7yf5f0v2x4gqini8etbo7686f8l76tl4vec55oybe5hu4r2l6svjrijn9ik746oatfnc5gyne7y9wxgb5lycvbocudjca0mibbd3u71dmfjlfko666v6cx1rdk1lalx18syw3xqhpynutgfk9lw9zqj7jvngna5v5audmzvbwdfuuwcdvw68ewr32wx4awytabg492zzks9dow6km4cbhc2feqejp99gdlcg1rvv3juu73qol75w26jva72iwtwbndj0gofaylrc5w1hitp8xtvoucdxkxpb4q9mx8ys1gnbb1rb56kqd9htfrc3h5lh7mxe2rixva8eqxq2y3tp1et0gbcexk6y3rwa5z9ge26hebd0s2qtsxo9u7tuixpsf6z4cuoqi87498wi903o7r0fo176be29hhhaic3mepfvrbwe4ktsnt5pctfx8dn6799sflv2i10jcf1vvp491w39xpd1sur70lki4vswrocubqegpgbbimnllbjy88srfq9pqvzlv03kz226d7srefntk7i0k638go383q7hdd8rl0c0rnwtmbbvdekkot3hqihqpk18',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'l13t98da5v7jzftpouseksks772pt3usvirovwi7orlokqax0s',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: '86rtjm9xlebqcecwrqe5',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: '4q7gq9vvlp1y19himxtxd273wg0qmthaji2zs8084ghuqlu1axalmlp8b342qvz9tbuvkilvd3s5y7a647j9qoltyqqcjnss1vs5hrzpw38npwzxeh0jcuenvidxsclgxs1w18a1sx7cjoawig298xx585vf4i1j',
                channelComponent: 'boatxp3ocnfpq83a5ujdk8p725lvy37odzps98uhhynb0fr7hezyzzucqnq1zs5qoitpsa6fdttl3sagp87cl72p8ajx9wn9tusw9jiitalgqeyq79qvaskwnwwq4duwww9jcoak4f0yx0iz3int79bebuxew81g',
                channelName: 'g2ezuh0yvm3j974hbn8pfguq4vgfv82iaemwknlav44khk4yf2w3faokoi4rvzqdrsuwt1cniqdwu4d3twiwsn84es48x6f3n64zaet34imbcuewarjoqclf8yhtg2t775323lcaz3q4bfr6yxxd6ywcwyy46oa3',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'jke30ds76n29ldjj3vp8yg3q9aa26j06dwusdcnilycxmhh161ldn8epfc68aqe4mx51sv3the6udqxkcwlu4en8jrsabbqtksw4hie2wx4oboxnodkblkalsu5veltlm1t9hwwb7cfvkleos8blxs07en5bgqto',
                flowComponent: 'buo8srf14i7q5328pj9dtxkqbs8u9lkly7f49pnvd3dpvyjbx2b53o9a2l8zv3eopcqaj3edl5iun9i10wjx3g1936id7rkdirrkcmuoh9wflxqzjp3e3su56lf43psvrdt3d5v6af0fwme93bsfkt9uarpp3d33',
                flowInterfaceName: '6hez5u8rgk1himobqfo09xcurvg1jestcfarjcyocksda5sxq6tsk8nzgsoug8q3xp79rpg5pv3krm0u5og7dhobyjl4zrmcbimsmn3o4jttcipg81o4i5k9tlqkxtu18z940e0bwywz3y7sili252piu9edteby',
                flowInterfaceNamespace: 'c67y6w3nfw7vd9wycblfodb5t4ay60r7tzeizepjh9gm65xcwbrej6dxereg25sv3zoh3g77gdx6wfh96g8xnm9qb5rlb7po6dvf89jou30yebijyyrmr5fuvl2pew8mcjrv109ndstmi6o0sc4xdj4rf0i76lfb',
                version: 'eoc4pfpw2y7n13af5jsn',
                parameterGroup: '2tk7e8s6dl0g0qq2y2z9jr35uv67erh7hsh48s50ohkqakwnq1ial7jmmhatknjw19wr2ci6ec16uxh96oo2gw2ihl3hz9hvmwixcazx79jvh0ez6ahsw0u11sidy4ruw0mmiysgozybzds714jsbycs45dmsrqem74nhn6fysjy3yuqw8bx5g8ug50i0xumna2jjr3hequkdq74jioludezuketwpc3qnz4f594hh5blnsr5p9jx8ukbtz0op4',
                name: 'iaaidinbukud7qxyn3danqb833286zr9jolfhyb6ppmx6z3pcb7fvkkjp6q78nfs7tv09yko4snmw2932tl95irqbo2tld5wozcyt488ukcy8u6shfr72inubw4jgjxwe5vw2ye3kbs5o0jfbegd3lifq31mcf2tysntuzvv96c0kkfpjbvqmm81bw1k8n6mzr75d03d46xbz78vtkrz4omfgn183rim05zpji6br4m0kb54wtm44bmuga264ivpsj71o2iztqyeka5srcil7cl9md0m3v3byjxd7z8hyo3at7rgcv2w15k7f900mddh',
                parameterName: 'br462fpcdyjb99lvvi5s4b9c0xecvq3vo2os3bmpngmqjns15v3i45tfi0inoke2412vbtlvnad2hfj9efm4ns37idrxr203e9i0apw1fihghlcz3l5ntp1v20wwse2nc3k5e9p5ztt7qlcllr70vgrtdj7e1xsa0f89ea1f2wh3iv6p3bam7vag6ecoki7v95lxed3kli0unq44mn5gi04xzl2qt8fa6wev501s4yj3jlwu9qo1oyv26hxh82a7su7n4g2q7sugbvoipwadxm0fn3i4ujap6oliyaqor8ta4y4jaz0cjjsbwrsdvvdwg',
                parameterValue: '1a52lkfow9d6t77uclwoztf2oq7kp93imlkrmq6xvxcze5n4bqfry02g8h7jogjxlkbgujkfq9581zbtdmm2upj3fwbrrrs08p6qnfewhd4gvkpf1s9fc0008d47oeymyjzh6dww6mxnrqe3wxh6mo4c6xctt5p3zs41e2s9ns83ofn3znf8pjzgee0inrjz8i5t7au3o1lob2r5b1yz009w1qfkt4v27a302ms40hs6zb1hzr0hq672dhurb1hdjlvtn0gfese1qi6ho44u2l838tpi03hkwu6e6r3tc099avuqgtyohk3n7u92m6i7v6hvjuctxesqkaill2vxrydpb4locx0mmht18sqzrdd8sd9ezopeqkacyn4warydq78cqyzn9aay5gdoay4gxc0ih7im055kgz95vyukw7phyk9vvj4e5ba5oyaw8aor7revj1z82d2lf9p4hjy24u3e07vaytv0jf4qejnn77xdbbukyyorbt70wbtk0cbsl7o1r1unbix7iijm6nt57d1uuhjtc23udav0vi1gcidqapchpqcs15aw1ge26kqokkk7i7644y0953tmlo409vf3jms2q5djxrzcrifzrnwmpema08tgpyyglar3asdadzk7p7jurcx0xtmpenwq8a6uizhofddvk76f5ai891u4zmgia1egpndto61oiq2qytpihrrfefegle5uvgfvci0iq4l75ea08vhla4quwu8w461q1d92pczu77h4g9sbexjb0wtrl5sj243x3rocz0nngznfeec5lxcznys6129yluxjvx9z85my64oo7khurs3jrd48d27zumi41g61tjt36ds4ykarl87hehgqooascw6slcj82gjdvfyay8nb1ko7jchqqdtl1oly6hsauhs7y908aj1lr80rvvtuzjtqqxkl9z6o9tkqilt54y2roxi07rdnassu4njmxloufw36lr0anigq42sb80dcat7w4u70f5ek7gc6hlepvuhl',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'o05wmdqyh4tmbtrwxmkej2mqifrowqzibjpnoh7gjr9g2g8d5z',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'whrlgvc7olglgz1d5b0f',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'gzwjlw4bdy548n8mkdjm1a2gbphdvycfrwjkaje00o1i6xbivrwsmqwxb7nc7p0bb95ov964cxlysk2q9oj6xzgbjhjpbgs3yuenovy2zwqup6c3ifos81zzykhj0m4d52ps8hubcaorohcennp9gk97zral9znu',
                channelComponent: 'dbbqydh9ip0i9oz7r2ovu9t3aao92206g9l38gui7dqlxpj17uz9lqjew8jiry3wt1ou5tlxuk6o7j1nmgixlzq5bln68bks90cq0xolixjugbhqylviwku0r7s910fd59cezv66lz2f0w39hvyb5h56r7qfo4vp',
                channelName: 'al70ywn88g2ejue2ev2a8gquscpr4rcbc7kkdwvy2eq6qka3ktrytpylaxqdrqhgbhglile72398uw9voo2vvkyh4kvf4tpnriyd1tu7xqz3esycfbmfcaeq7k7fkf2q6obrknobqv8q0y0dnkihub51nve8rnvm',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'vm8zxz7xxrs39ex3efb4dvdwa9o4v794iw6yqde0j1q3z37i3qq56kkawbo0v5smfmqy8zutfgiwws4kc8chwmoq7q5e69adhfuxzojwplejjni2ckbf9urrl8de2223acmiido9m9907e8tsgcc5h1tbwwd8pdl',
                flowComponent: 'z3w57uhrd0hw16yxkqvwwpfb0p11li3tvxtktb04pavdm23x75jpx4tnl6m5t1g15ti257f64a9nso12ns0ez0wgyc5z2rme3ihkf805d9fsrn7vr42lx3ruuicwblqq41w2lji50ex6i8bfmybpfjx8ddllgmyr',
                flowInterfaceName: 'y6ztj2518251opk4tihgqwcvzux5rafcev8uey8ef8iyg66hv6hswvbrvuh33oh258sh16jluokw1t8q2ryl1xgtfdcbfzxni2a0cmljiru7jei38aqvb994oqurdjrupg8gsxqzlsjaqz22f7ev0bhihlhg25se',
                flowInterfaceNamespace: '9nggr9g7k688irikgiha4vm22fq5d3x0ml4b0vv8utzz6khhnhr6h1bfggajyu7euir0pd9qnmmosyosvdcuvfgaclgjctrnysh1y2r7crmz4n86x3sr8vfapbaqwfx1bhi7l31r0famla1ee9ff5tg0rrksxoqy',
                version: 'b4u71okohskyqvafglik',
                parameterGroup: '60t34o0wgdam20437enqntyqka1z1kjkgzgm06x442y9ucx9ih03wi1aufl6wwpkp6cmnboer9iaa1usjakae7ndb5ki0jl2l7e0u0tg88k16bxfe1pikuda30pdy702wtwmuhhndy3c7dk8psw5bhkemua250x9f0dn23j93lq5vdxlyeqj3c439qe9blmi83j9szbt3oht489jsnj3zv8opo3q4ng1yrza94u9aihlalu98cemjjfh7jjj4bs',
                name: '125z6r0nhh4f3yp7gup2q6hiqsykw8hwfv0qe7oopystny0a2boqw3xogzale9pvap1cqgpk7rh05q2fy2vqjsocps9meiiwv0y6e7kq7au8afdaxuingznejry03oz3ehu78s1ucj21j75t6uw48iw351xb8jg61txd4sn22o4p7497byo7ikfalkikbkdeotz5i0yz3dpx0slyy7r1xsuzuq4iakwwn0cd1f00pyj0c82q3ljbnlydv9pviq647pkzogbzmzdkr7qfh3su1sekv57b1yklyzh7rh9i8ua0nwdc8d1zonunacwd3oly',
                parameterName: 'rlkqyb4vdqzuajmygb54g5hc3e2syidn6r5d7zic41gj9kgavnyrb4ltzfxp1t1b0sa23f8cbhq2arcglym9fiakwcia7b1d1in4n61xmzdow3p7xzmk8bdeiu7cycc6714wd4w4rey2kgq5ct4wftuhq6okik2m6v8w9zz6c9lv5t4v5lc0gdree3v070w7zanmtfs1xlqn29aseo5brqskv5j8ou133mz0khg7jkcnxgizt1c04nm1t3kyu7i58xbulq0i384q47tlkxqt1kfnawfgqvj7uyusabpgxpvmkk7yywi64xgccltwmpu6',
                parameterValue: 'r9x8rl9yqw3s3noqpwmve0h9ucp8urn9uiwjpiluik85feeg532d3gsmmt42cyuojz64bn0jlw1z3gazsve7fcdn1xkakg1iubdlzz529mxsypn058jgnybtve0t4mvrf71lxl57wtmlvw3jzl62ztwc53c9fqnzuxt59d9c76gkpodaf63av49q59i4782wun8fw0km04ua56tyiga4tgd4rtplz29mlwapbnu60wziz9vx8oprpgjx4vkptsvamc5f9436tp0h0aruj2f0o3jmf3eewkvjyzbq4vtmp8cbbb6phf00t5mdn23pavx15metjf9w1jdqifo0ixis602iloblv4ri7d2dyepfdufitgitx9ntvscut4kouz4fsdk82ptq51fuil4xqjw58gqplciny26oxk3xv0qo6iqlttlq5i8wjon75le5w02ufiljl75g7chxkneb8965sbtjkcs67u9lt3ntreq0i9zouq80mfdavhbco4qeoglnqz0pxovx4zxfupi1aenzhmt1mf0afaguw647wvmyijgxigitwr6sg87mycoiv0fvq77o8x41j460wxrht4gcxkdzvwm2o9z6kk79w1kmrpiv42h49yw2ioyedgywpbq28n91iw5dibjw5zx4d8wx71nx57sqnieb61u2pnhd2ynxe0csxolcqzwoda11opd289ep19t2v6c13x5umc709rqo75fuvj9e1m1s7ggfrviw1b2bki0j45gytdasyu4hbe0gne6qmcy1x2x6npyv8bey001jornusabbmhdpmxcd9dg9ortp4eltmghmmueu0y8wj4vz9pr7607nsawmnszhj5zz99ql9cvsrkq4hd18ntbsp4nuybs215ipzkwrdvg9wcrnnsftqzmmrop72r85jn1v35pl3065olx2x65ac16ig03jyn1oplw65gp66rzif84w7g0hidp9sr1i22zn2641eycts23i0f3w6u5deaxm53ybnkniam1je8hje',
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
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: 'jg16t5d2jp0uvejfd91qzpusm9htidurt5u87hj7liu7hkp0sw',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: 'lmilcnyi6ebq6zi3c70u',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: 'ne43aa0uyx0bptwv1czxowkqpb8u90a1irroyztkamzkdwexki57nc5kq2ruh8a3ot3bi04h9sumcswfiypxn16jdi9gnlohryfp8a1yjuwn3vw3o3ifid8ietdhyinu51e7oe1vch0kam0zzkzk95wicn22n6ph',
                channelComponent: '27dpbvwlof0jdkdf0z518u5jqetrq3gxfcucn6ea0pl4lehxkq27r0khsb3ebwgl5zeobks5dnbemb7tc9ycbjhgy3bg3ns5fdml3lt0ykh0x3868xmlc4rqb2ovhaz04c1a3rvkw7sjormmtsbsq01ec53xmtzf',
                channelName: 'pncmc510isno9ltpx1cppeie0cbtcit2mzvnx5lj7ugbw8fedg1ynt616dtahrqspeq91e885urpgqhnuetczvwr8lf6aofiveqhpcp5tj1ujxype6vwnuvgzvycdhrpdoamiiu1rnhz3n6iruo70lwcyanavetl',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: '3i4o691dycvypdds7qra3vfc5389zrkg6yz33ywui1q5ae0y104fqapgc6edzfomr058yjq1q2w399b140hav2forbbfnr8ch3re7yf6tig4d9cs22z2iiowwxaa49id26s8jxdk8c08k2savfd3l270lucfkqco',
                flowComponent: 'dm7scvcza05tndylynhkfko30dpsu29f9dcd4t86hew7w15we49xxeleqfroo2wvgfvnccmtcxlhd4dtu24v6ktgc0jclk7a2cc957ntc2073af0k0oki620yc0z0nz01rop7ax6wrof0nyj8ju63txsu6nykyfp',
                flowInterfaceName: 'fpmw1vt0fbr0tchh3k1y18bt9ar28plip8r4fyafqg59pmlkjt7wr4d8d01q80c2e6uf9lumgodbq7ozr4c5qz9xjqp082zlwt4r15ckv9ncclenxvp7o7dljf8hp2g08fqg6004ny28vv2bjjgvcbp03fyv3rt7',
                flowInterfaceNamespace: '2gun2f4fl3mdqqeadvahdcbn8pmq93tqus40htpzkij3fmmy6odh1rigl84h2pgc28fngvfxasvmh46927s5fnh15nfnurguynvjmwbbtuc3vrw12t5xdkmetajt4bwkv420dg37rzhe12mgsffnbovz00vqq5w2',
                version: 'bic27h3xpisamssm8d74',
                parameterGroup: 'cq0ll9zp6hjwawgdp5lb5lxlo0bwps26fl5emx9rzu9b5f5stp6jvth8053rstw48q0ztohr7w4lg8q9o6w0s1vgfaar5bo7k9m4kq8k25s5b93dbre3yqdxks75s1on0svae0898613p7ixva64cgb0q44tfl2j59542c1xx0ia2675axvva9acd9d7rwiznmmtgjrgflw4qkg8l58cq3i7t8nxvven67j3a9yyasymehfqcl3voeozgobvxf1',
                name: '08h4yy4gxyhh8v0cw5pe5vpk3iaj8irs5al3c9lq0shqig42a2kfolonpv78906godmwk4hubbxj928li59sqp26yo61zwl9mdmgooarbhchn22r9c15a161g6xtaribaanlbx7t0h7vldu0s66f5i4jkeioilx42rfvyl6b5qkxab4vswr6inmmynav6y7jugzplrgb9skai28csjtt5a1sosdzyp5xoy5t3jucxxa3n6yzghh99y8ihpcrdeuuv6luzdapvdkm8q3qlp8f0a1pg3t3o0aa1gdka9bynai10p9765g61cy3fi8youol',
                parameterName: '5nesprej71t07mbm4nny2qqj4qqhzcrrls9c83owwgqp7bge5ida0qsodnt3z6khlellrx84yocd8x7eb2vngrgmbapldptswh7das360tjs9y790yriprpxlw9j597blporcigbtlggf10ix62qotk6abw5aqg6pxqty804s6ewmr6ld37hh2v0wa8nna9j43e1zm5luqlbb3cxzqs1e9sued0r1mg7ja20uxmoeurrkgtgjuoy44aa053g93df2jbduuif3j5q2ltorichgkopru9u01ww2jfaeo5z5f4mwtrbc2j9e017f5se2l0k',
                parameterValue: 'zilbtthyzngmsl90s310daxsf67fwdvb9e4pw5u1hhmmizjld4h1u5mnx01tdskjzxforaf7iizkfsdlsut999b294jtjs7ip4uj35f7u3lz45d8ljridn8cq8l2hd0c2bdjd9rjj3rs8u93ue3kojddykv9j978ogx2h25wr28x2cgege38knx4ij33yu91rarqrqp7pmg6pt901pllexlrmvwn4zdk8ssgsqllkh30y4dprorv5axn04jgtnl7ozmsnd9uh55mfgh6ftf0d4bcmyaws84yospub2c0rx6mm7axhyh1xjody7oxejkr3ddydykosv6ri3pdn0tw9mjdhxpc0grdmetxnzpbr1bsncedqqtx7vqd758ybxfwqtnyjpsx8zagzr0xzu6no245rvrl176sz5clj8j17w5p9wljfv3cuj8z093hmx8w1i7hegiym64xwwtffi8yq5z2olsw4q0skx1k31x9blvjpqxqw2z6vzawxvfakamqjx1a8tvfih3fx5z1nisofp9mnjq2qc1tnn50vrnpe4ziy4jh49przhw782o2nixxby8zk9epdi9qbb8w423ox7i6whai2tlgr9pairm8uwcfgunlrzznam182ohbb4sjdgr1x44bnkqqua8i7t25o493u5yq99z69y9izrebeg9f1t0u1q6tt4h13hl7ep7wwqsopvf5qjbovnsq02kzq5kknj6j7a317dqiuqrxxj9cdi4tx46f1t7w8b1lx4x95b7f8chsr2co7ca01rubfrwb1ie41uiv3qs9mg93014xohkoeldlu158qir28lw10e66amvzkdd2vfuyxpruhs63xyisntisv43bmlsnv28tcaz4bsf2xqk8235cvy2lmfuk5ill6dfqh4ajykqyu2khq0nphs9686fknzj3065obuw2xixanx0h7y1f48ybijj5rc430lkg1ftcspfoyi0kbh404lhf323ye521jih1rbgvflilokiiz1dlcpg5',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : 'bce0e175-0e73-4e47-a773-429215ad0f63'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bce0e175-0e73-4e47-a773-429215ad0f63'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/bce0e175-0e73-4e47-a773-429215ad0f63')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bce0e175-0e73-4e47-a773-429215ad0f63'));
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
                
                id: '9cba8fe3-369a-40c5-9333-c2beafdb9e3a',
                tenantId: 'd80bdc94-726b-41e8-ba9c-107f66b96be7',
                tenantCode: 'opbhritin6eg3vpycmx3r2qmvhzwegclxfzzfq0rbn0xcgx54d',
                systemId: 'da2c5066-0331-47aa-88a4-d03e2890423c',
                systemName: 'kxe043b4gf345ibcf3if',
                channelId: '2a1dd36d-61a3-4921-8f43-e387db9ecf23',
                channelParty: 'wp4igncgblhltksnfcgr2bhramgkddvdsfzmd573tcrdgaxh4otrzmw7n0d0tbfnmaq1wp7nbrj4148z0nrt9ngu6nkxo1irhwqd2mhdxgunqjc146ujb0m7vl00b5xlgkcfsxedgs329xxw71u6gqq2wyr6flcl',
                channelComponent: 'bsnbl9z4t98de4d4lxlnm93x72h3if8cgptz94miu07g6znsxn3eh7ndgppb8j8ul9mqxsm7kdjm6r7po8uoe5jzit5bpbbb1d5gtwwbthsjl1goh5jskvc1dlfj5e4q1awy53eukikdvnsvv9nh1xuw2xzbqcx1',
                channelName: '6kac3k0av9sh518yezeers4kqcld0h3dtk86e2aece5tzhhk4cvgep1n4vmj6dd5isp0xc1x3swv1wa9e0tnqdwr4r16egqszotxhod272im234ag9o0roilo7g0s87od690l8anmlwhu48vj2osrdk2f4apmdzb',
                flowId: '4603ec4a-1ae1-4153-b723-f39c1fa71dae',
                flowParty: '6ig60w3snhqexrsg2odm3orjevebppptfgx0y4a8m2bdp6o71yq3eszsiv77qosxa3v8mwnwmys1h1eyf2ggvdjnaq8mjkiy9pj1byp8kndratsqhccnwdu7wes8oxpjsni0drhcnjgngrfjaulqijp7zp7c0f8v',
                flowComponent: 'hjdf2s6xj9k6b0x9uam4t7npe3migka6gx2sc1bg556qfh7frfozpvson3j5dy7m66kpvazuyp27go0coqyrwggz51d5853sz1v5ce8pf5yl8zavxl3ogcd7k6aplcmb6t8pwpj0v3oaratjbnim2h6jne8cwrjg',
                flowInterfaceName: '1lczx67o9223uxu9e9z3335rvmuwb2jnzrb8ir90ku0egbvcu0k0tn82hookcwukrx5onetp4v9zqqcy2y1ii9vn68v6c6wtnerdl70p3xkxwwchi5g08eb0g17auyxbavetu4l6s0cqqfvwcy536z2mxqkturxi',
                flowInterfaceNamespace: 'izlpa4jhytjj2kehcusuktluda0l0ic1c6jatndwowaoqquxhoekypeae36er2pw0yfdm10ag7whbi5iwgzt85yk873898av54zh289li5m0r581mlojl8m3l76ztsvmj63zy70n5kacn89y73n5qgkdlmyjyg81',
                version: 'dcldyjyzxgdj8a65wbjm',
                parameterGroup: 'd8ntc4568p1x9tsscnzblcb8xxh7jimpwjohb5xarvhmgxihn6ekujmle1lbg80j66pj4gt0j7ynxsw56xzc9qtjmr67n8c2jpy7lj7whzki3kj4t25zp18294qjlmdnrw0f72y340plm6vl063ib4wustpmywxy2bvis49axa980snhhdve6zvd0o7q8tjorrgi4csbtqwlaridz6xingxkmsidfg9ng4hpjlms4ipvtp58bnptxcrtqaczovq',
                name: 'vdnaesxtdi9dexxwbckrm3npluydqoc92nl293wvb17rxayclhb8qfniq8hjfdbfmosfex9coqtqgdg1h5qet21u50wlx9u4yjxwadc1mh3sjvvly0ce73hs8om7yyeauum1kf61apvzm0prbiyx1qgg4zu2jitu6qnx50mbhl1pfspfp17x6gkyj0wf24xcbzlcwm72g7tvtiyyesirg3tbhx27wp6f88yscb2tjsnfp9t3ry6p4zp2iui6jqfsv2d6rq3dj30op61hjd81lp6yn5yxrfzpjl9g2z7nw6dvp1065onxcx46brjlcev0',
                parameterName: '9tkrmlv86zf9lzljzukdeuz1an6lf0dn0rks9ol145vij4im2ctwl4ykunwl92f6uksb2dkyixtroh8885x775b9cm72g6nuurl663jdeahkdm8ngj5i0qtm0brj6z1038v83g4rquc7y19bjvvzi5c73dt0llrpu9rkpfsl1dhwkqbrtx6lsppkngwbb66bjiu0qh5qnrwlov63wpmm12t9ma7dd3xhanapg00qtjs4em0r21b9zfyprxwgay5ahgoyebqmcpfq8jyy26ztep78oadob5iw095rxksez5uln4i1fth4nekpweqjunwb',
                parameterValue: 'r2qh5jzg3r857k5yiheoiuqlog82jgyx1p71uxxn07nvoi7lnspcput6q0cg4ziaferfw9irvfh49iwlmzvh4it1a9wzyj98h95cdnky90a7gbbacvt6gx0cr0duoq0qjf2zng1rttvss4yys4ihrg07w24o0l1h619p9mr9mdhz4uz4xajwvkbcthwlh6yfncj9drwdph95ky7vds6dlrume9o1w1ogkd0lrwstn85o0ce1kpkc1lgeatq1hxj34pdzwr0hp52b1ja1cwwgdz7jgsjm9b6ahsnwn0hp9dzyedr8o81eu0l95y9obikxvj3lg6y3skv44icbh0asu125h05bm37ek5f6qg3jjc6ucwyxn8vvu4uq6hyq1f1ges2c7pivx1f1v0wh3m3xt138nx5e7y9gy0w7cllku6erx8ykdlgn96famnj38u9r5n1ewgqay7rkyr1yhse1a6z5x65ontz9ffk3yx575wr2xoagd0r9a2l0da2o4wy5qn4p9cahxlxclrgoi5hmzt8d9u4np9fd2plq7m04owk2dpkod1kssrqawvozc8bojz7jep38ojiichbkot5j6254yu7rd9mgbhhc18lpdkr89a9qeh8575pmpkes43sl5f5ivhqrrxp4synityoial9bgksafj7pz6mp4fy28m4ys41vhxbnyppkftbwogjwqa6q3qrembkep9sf7b215h94y16xu0r6mgziprvq2sopdzk82fni0bbbscfmoykoeczsksjkpb0qh4r291jfg2euhpcd3ujutnk7maufz07znu3dxu9gav36uo3kl6m7usaupu8u6g653lgk2eacf15z8he63l4sdago54jzum0x82f9nlmhzzwf0s206ybvp5lrlgt1jswzp34fm7c3w8scab34a8rxxwcedsrjnghb4kfj7ksrz6x11ep8d7tza1t4acauew5nnajhfhboe377b15sjhx49z6xhuvyfeqb0fmdg1fxwcsdxvx13w3x',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                tenantCode: '15bk5635mwmwf4r6rb2t6yo49jbh536w6oc5sgdjgh5qvnykxk',
                systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                systemName: '7ssaqq1s6hvkqvohszak',
                channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                channelParty: '60who23ob386aqalkk7nn8c8jcc1h8zxfqujiewa8qb74iz42hau86bcwacl4fcle1pi7rayz0zeu7cmw4vigq03ug5xlmwxjm83ow005nfb2ovrb033y7juihdhdzytpcgsv4wxz1vteof3v1h54ifrn55nhyg9',
                channelComponent: 're3waq1snettouw1rh9iirwtuqk0yxv94jauassjxe18h1mq766g22rb3lm48b027yqvc9lbagfzie312qofdvhexopntjig2vtml86aezo6bntnvs9nm29a4p8hhdfonqnse0sg6l048w4svb36odak60yycnsp',
                channelName: 'm22crsqr8fxdyt0nejd5e6wunfnezqr8ql0uyfaczhr7pktvbrzoomuu4t8rtzz6h9ue213ss1lp4ljkrhdq3shwmxpzz2jdy6iaphi8ycb68dfw7b6tg7ff8lh1mfzcujujdodro97ba6dra6jzpwapplhxb56z',
                flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                flowParty: 'k7r9zy973hz30xzuibh6gmj1wv4adz013x1jg5ld5z1tod7k5ld04mpocmc6zvrrjwwx1vd3jhrzphxmyp31b907rbxsfaaby4kq42jtdyzw76rjc5a2rhdewdqoz7nic3tonafxyrc0ejt34t5gklfjcyzpp3o7',
                flowComponent: 'btq3icdhgy9v7qfmr5kof0wv1xhox99itsrvzgkk8eoj39ye02q5mi8zuyj6dmih8cgx3o1hierb7ynqrbvrypvrla41527skt0r8s1wizakmefjqs064v589bicy98dt5lk5ovydoyhbnluc3qdyjcdsgcwv0d8',
                flowInterfaceName: '5gr9pu3v9vm1t614tnr0ocxqnw5rzg48lzdo6g2yjk4o0qp8j57chzzdldqq4nwoh2u1d7ammmjom3c622ssj3xua6hk2r1ku35ck2k5wde7djnacqmwgu93pcock4re5qxult3el3ld0jpul4e7rra0c9q5j5hc',
                flowInterfaceNamespace: 'rx8ttpz7wo1zs9xvo40tsrv7kv831vtrq2p9msaf378hcsj5uoj1s3s6gjmla8xvn08xlitnkf25vzu0d3b4vwed8ut5xk1c47pa3uk89lh4obvsgkzqpafzrp2ro9fwp6c0kmbcdnzc6kibumxkq9l4cg15fh0e',
                version: 'r1v1q893r27rxku57slj',
                parameterGroup: 'f2izrkqabbzz0yhcw0qvtho1k7rkxc75ttxven4epki1t6by0i5o7hhqi0h0ecqir2pug3moyylp21wuivs68ef3euviihvpftyziwkq90sd18lcx8nk1q6y2sodgt4w1grs0dkkcigivit8wr5b6igifcukqi1ifm29w29rzgtqr1l14petjtmdyaz158kgqlnuu96fx7bhp5ce8rgao4vf4x2pvtvno4lhte5vbvmosz87pfbadiacxsqfl90',
                name: 'auj8utzgncbejsthckpnwsslwjtbxm82cok1tmp5kd82cw24icg72ouldztw91tw8mawkr8dw41jo1k67sglm6m3jg2bzqimm706nmzej5ie8miafnbcy0fcc1l4plr2w3xr5gg2iddega8mzcvj0kq6h8rjuvweerehm5f42r7cttat204gxwt7hzm7qucsmae404xryo3rpufk6374r8pyfwqf9tok4zotiqtr9authx9szfnev4bh01a77eivq3kvdgvbm2037ljdk5hmha5748z3okl929c8jl8ydu1di291aqkjp1hq9al69x47',
                parameterName: '86bs42x9we3sedr3ec9ez49dei5jsslor74z1mv01382czc9w154esr47b5j0h6qt1goyjp9s1y7taizi9md4k5v8cmjvtxiod4x5y2yhcz5a0tpzbqttdkid4z71u1hpovyi53aiagyf0h1ar8k877s4tio6o4yxv0a3qz6yu09m95ragks2ymw99b71b08zwuxn3sc8p32dr62xp9pfx3weexpm1gq6d21x3p1zbhwgze8re7r91tijh50wd1jpmjfiu78qfdvam9qww89s1j3n3dquaaho412ceo9vxu52v55i1s2fodk7wvmv49y',
                parameterValue: '855yt1ti14shsxiw4dzi6q8etag3zwwl4jheptbdxo70m415dpy26dxof3w0a9q18ejss0eh6aq2ew4g536u0d4nev7045pzttdwhkawcm955yp62oc1lqwa11ueiarbf5jue4wp40i3ntkn3c8h0hwnhjnc6rz0cjj6z16ml2bof1fln7eti3uv2in9xddfuusqlaasv5h6kpa1brgzpmkpgocxtxnctgphjnqrsprnb05va8bhrprv5o9mg5966ihk7j16yodtw58tlsiruvf82p8wk82nanr9t0hz7ltf5o19w8nmgy5rfme4v31v5lrtrri9vbillf8o2ef3bvqr8b8aj7zvp9zthb16knv8l2c0q9h7uj2dszfydcs7mfunta6uxp047cx7fy97fhv6fv5io3jsdc81lap1sxr4fpedf6uomk0iet8fo5p8b1easyz2sgmfpf41s5a53vcm2y7q3shh4dsatwokqf3s9qiatinlcpha4fbjht7pra3ytmct2lreymbjai3bxdx4isq958c6ecfxxs03xa266ngszgfqyjbsczhwvpde5p94euwryd4aa4q86eh5drgpcvzc457vqlk9y1m5wp0hssratvjidj1eftu9md11xpvdmp3hi8rmm4nn9x3b8uuoe4dnnvpx8a777qcbu0wjzwaaxompaqyoixs32n4gs33osze34sle6hadbcmvdhcfzcopnreaqk7g847i74o1oa88z6kr08k9lkuo4hxdf4y3peq7ws9sshav51e5fh6jzp0heph780dd39pos69pdr812dptli7yt1s0utkkezwtcpbbsb17wmyb1ysh1zo9c7j1uotjwz1h2pa1m17ltr8cjr1oerdiaxxl23uqikqvt3b6xt3jpak4vrueaw30jzsgfj5inht5f38yh52hz8kp1b7x882v82bsx007m1qjelq6snqzamdkgnsud3kdqmg3ig6visvrjmki3jth912eb7jr6fkapn5dnjk8',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bce0e175-0e73-4e47-a773-429215ad0f63'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/bce0e175-0e73-4e47-a773-429215ad0f63')
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
                        id: 'd4fb931c-dd0c-4615-a846-9b2366477861',
                        tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                        tenantCode: '5umk3ga3aegxbckfhh8esqa2uhf0ubgiupha18bldbvsyzanep',
                        systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                        systemName: 'n1s88jxhfyrafqf5dh1c',
                        channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                        channelParty: '01onk64dvp4pgycntcla35rk6vuy0v8w9w0osepjah7c7d8kzj3dnkqxtfnp4ezvvcd5m7b5l9fsjepcvwx793f7ktubqy2wlyupu1s0uxtc95q9fcmhzwtezjyuxzhhqfatpyez5ahp1h4tjhgv0fvd966t8nmc',
                        channelComponent: 'prbyx4filupbqo64t5167tzhgs6uej8r7h37qxzxfrjr57xy50bwas4moyikb2thwxgowvghbp3kp45rmiqsv1z99dr6y1x2yjy6uqer132skwijjjc4971vcg1ds9fxa0s4fwmexyzzdcwlr44vbilyduo41d4y',
                        channelName: '6bwwjbg1xq1pko14dj8lpj7l725ol5wt9yrobikacf4vd1v34znlhfuafa5fvxw7sfctkypg6ot2khx2h30r6bxa512wa5jrpbk5trv1llnqwwswecvrpti47bz7445swd8sh1wvt09pkb3utbcn0436qgyak1fs',
                        flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                        flowParty: 'o5n7ezhbqhg9mxsx8f1cwnvveyv6x5svnvior7u5z0vp45buahhctpdn6t9pec0lcdsfxz8yfztjg2wf9xq6htmdq7gnm3ixqf3g3u2wnie483xcpg23xryo0t71b378us2jh7g1txdftiz7he3kw76e526r0h8k',
                        flowComponent: 'mzgx9jdzmf1hls7z7vq9kv3d1erb5zmjchzxfswdfckdo48cq7a83510angr76x2g8z4y89zx0194ra5luf7dxu3l3r0ly543wgv2y0a7y0aqzft49xez1hqcsi4btji0emc1tuutjtr5z1zjuksbe1l142fdhsg',
                        flowInterfaceName: 'feruv8bnqtnb4ammdh0klbjklc42sqfxs23hqc0bbljdh5ybwyjfr9tk1ddo77ul1lqgxcrw4sz3xnygitkgjyemnf6notkn6yawampfq29u0eobkyra2v0c6zu8dtm6uah8isle8pv5512lh9lqtv5hdzclgrfx',
                        flowInterfaceNamespace: 'xettrmi1jporyqitxna0d4iej0iwbst8vntgz5dupyib7nbdwqqn4hxk09x61buk6f2848xcb9nh69ag2vj02uy3e80gbqmhtbtgzslkamag72dptrh98xcckq70xumd04dtidcfakpnykwmyw6uuacx5mtscqgv',
                        version: 'u98tec37xx5mjeqobtuz',
                        parameterGroup: 'v8nv7v58pqyzljrizdl6nf00of2q4s8xkv00xb6p4j8x8tmrowjdjp9yn59yey2z2556dk0i770eosy4dqhyuu5du0h7vwgiw99q0ux44aptbfjrfw5dm167vuz0p1yrv1h2fmoaf7lp09a7k71lkh95uhs7kammde2dq07o52wp3e8d097otjy2iswuez4nqdgei6uy6zmpei20frxtkq9ixlwdxj7gy2ru5nqzue5ctb9hr2gnudo2u80rr7b',
                        name: 'nie53ovmj3vmuzfjiglvvg850ihrj3o5ob3v5i0ru99tawh5hd4f6m162lfc68m54au487v6y1axjm09nfg4yvvndx0jqldgc5k3lfv3cww6oik2l4uz3pegc45kpr4rw7u23p9er70cg0ithofp8bpv0c1esn41vz0mp9cs9gr6bx0h9dame0k1v8loo4e3x0xosr3frtqhzmlsevpk0kym855ejbfgiggk0e5hur4kbv8sqq7an51t69fse16plmuls641it28ko3ptni4bngcpw7zcq4bry30ytrs3m3r297n8dewvqk71d36kqv6',
                        parameterName: '3kcc7v7lpj2mc0e86hlv6y8yxuc7cwv0v8at31b8i06pghs19glai16z7w6jskl6qk3kitvdrutfhhty2vu9dr48kle60sasw6oxuy97hblmli955q4hcz948as4xx8d52bm3hmgj10cdxr4vkmqvnepscz6i5b908nrndc9ymj6ic5rk4e8wf6oq86ysogp5hhmth8cob0ot3c1the2ato5ho9c9byeq4gzvozbs73iabk0qni6yznqwgatdeg8f2zz7ue3fpjijf4pulmmmpwv04y4oxuaopkehx032r4gtxrnffa4mf7g91ec37km',
                        parameterValue: 'awxfes9h5tlsijnncarjlsmxslylmlcm063xt3r6k0pckwwb6fg5io2fvf5qdjwvqa86foxoz52kwwaa7g5vkdn65scvu4u4xtykglehvg8es9wk5sl1rpm54o0mmans1libbr59uoo7q4jxqacs6og0ip67ujy9zd71fgi56rcyqhp8d997iohj7f631t3kwrs4uw6xc8mmc4hy1fl3n1rgi9pj4r57u33ootuduhkpf6wpar3nfi3q6usx4mtefziysr9h7boxuxa64scjbv0rixc0ljpnd8bivjvgpyujnu4688ue2hnckcc26yglpa10tetdo3969sgd3cdwc4cvvffcq6nutgjp085pdi7h3faqyozyq3oqu5qa50epphr5owbnbd54l73stjiggcthht6n0jm1g70h3t8yf0ah6s8ly3qo5c00ifi6gzyhsbqffxl91sdhwp47r415xq34j5ysqw51qvoq348ryyi9d19nqvv5eg7e3ccnri7fni67vl09ar9gbwyg1rx7xl06b2y1mzwfekz9u617xjtr5xhy036wce1zec1jhc3qklubn23k7zwd1i9fy4jgyhdsujsq78g2aip2pereorawku19ifjztoqoshov1ebrrvk39fb0feb7lxmilzngait3rdqj9w8b4xs5x05ul9bdsmdntkla9v11o8br4lo3k2mmx6m3sb3y1j8a76ps0pq130jkfmk6t2gpe7ri6w3ppyki3j2px2j2ha8vodajhhqw201p3t6jnhqp8ooe6onuk439pylkpclffq586u5dc3gb3oc2s526lya81p70ssccpixuuag9790yssydpbpyng224qefw9ogl7r6yq0taug4mvf95rf4rc490fokt81fr6zuqrgmk7ecnfke56ip0nja457elzxl4mfqbcied988la649y8yq5yoarz20ikwjnodppomhu34wh0f3r5d7o1e4lb1tjvwfn3nio4ts3dh4khce2kod4zxi2kp',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', 'd4fb931c-dd0c-4615-a846-9b2366477861');
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
                            value   : 'bce0e175-0e73-4e47-a773-429215ad0f63'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('bce0e175-0e73-4e47-a773-429215ad0f63');
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
                    id: 'bce0e175-0e73-4e47-a773-429215ad0f63'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('bce0e175-0e73-4e47-a773-429215ad0f63');
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
                        
                        id: '002949fd-6d6d-4f96-80ec-306538b35425',
                        tenantId: 'b8f13bb5-f3dc-46e1-bb0b-3c6e6bdecc4b',
                        tenantCode: 'vmbl3f44fsadll3axsqtk930dbpnf5ugtyy4cz222n06oivvma',
                        systemId: '4fdec0c7-03de-42be-926d-1eb78c7d0f77',
                        systemName: 'se4q3y9c8c1qc73i22hs',
                        channelId: '458a66df-61fb-43bb-8e24-f488f6b5c90c',
                        channelParty: '5segeod0tt90wo8ehyluj8p10ds1d44k3idcmsdrkueil7uu7myojuha90pbu7k0pxr2psczwo4ku5skmtbkvv4vvs90k4v62dafr8rsfc6lvg4e1itnms4f9cwlsy65wc72llot05gn3ifn8v14thldq18de8vf',
                        channelComponent: 'pcr2zhk4m3zwfwxesb5f3r0ocvc6j5nsbder5s71u4kzkqti22ngx7dlcvt1z3hb5ll09vfv7tzi5mkv4bk0g8h34ljoxugb0w9s96qqikltui6b6gisf1csanaucfcqngyip2tskstfheon0kcb637c4i69km0z',
                        channelName: 'ejhdouvglpfxesz0wlotdzgoh5sdqhodk66grdl8v8w8eohmwdn1l4x7pmf8inae11joybhgmi7rq1wpo39w2lhevve6y67lniv89y9117xv8wjqhdylnbiwx22x7s54i2jyaajlzqpya75o8vuni6w4gzynfpbv',
                        flowId: '48dce175-b5cd-4475-af1e-b9c62984313b',
                        flowParty: 'qybwhnbs0wr55fxqoew7olyg48qwqt9s5nvrefol4vstd2d72izv2y38tntifmlq1h1bejag3j112do9old7wijzvue4vuvw42q50pcstixtauc3ifu5nyzczpzw55kjqrbpna6ljnmxi1mbpogrv6ql2zdmdegk',
                        flowComponent: '6to4g2ryxr4ax32kphezv9lz8phcio2r7yroev3z0pcw1b23kjuwr3lqh9n0zn3x0cyvz5yh705x0w1camyw6ql905392re858bs3japxgl3x29ak7jfirwcsyl3uwifw0mopknkvcc52nmfd01161rsxvpqmakj',
                        flowInterfaceName: 'q1bczuqz09s3wln5yfxsg0s05fsg41hbbersedxbjyr1rbnw04h4saqpkhbseupiiizhyrunau6m25fftv1fsuek09c2z2iux5b0wqkd47ui8n400ho5v21d0cb79s715mt8iu5wuhtaadhutc9u5bjcqrynmjy9',
                        flowInterfaceNamespace: 'oger8slshe2xac95g65suknfysl3v0bxh2yesltswjck5unsmffpt7pr9hbmj99aym4cvsbaiw22z530yqc3ownm2m5w342ibv2isgiy6mmupm6p4a9qpwejp51a2wa81t3jyj41xdns49k6n2nfl9d8s56t89jn',
                        version: '258oht0p9k3vil9nocj8',
                        parameterGroup: '1ctwlsluhb0rbzh6dyvh8prdrbi6gyt6elwijvcacz4chd6a80lpidgp4yoj13mnita9do99l00g6bvoks9kui8i7y8sqaqypd8mfz75gldb9dd7b4m4ls8sl5sl6yyoqens7id3soo672y14mdh9x0lcezmt1fsm0jmf6yku5ogpd5h6m23dkrzeldrnelv990cm1stganpm7vjhdzc543xzuukhspyogyxvb4fj30wirl6n6dqjhl1b2hv58d',
                        name: 'tx6qgnxbyln9nnduzcfgerim0fok0d8qm0eptuieiz8jecpgsxj4f6wuoo2p7ato6bvd3f9dpl0ghxqmb1nne5pw70qaspzddttgkaggxv8itagl77g2i9byd51y3n0hw99d5pwv6i724zq3bn3letvp6he51ouhjiq67982nt48hjcvv34xpecqe0hyk6vuysag1j4tlo9ekian2kyxbv6t8qn8xueg1kf055r10oxtx4vdlhxos01iciuuqf4aggh4jp60ptvc449w4zppd2352s6mjuz8mb4uqjkn7vfcpsspnnrrv3ep9tghhhtb',
                        parameterName: 'mdxsqso1luii2pvrs6ti5d6yl9immb2lqpn7abvzlliy1wh54oi49c3mgrgj8a706coexfnmu305qeh02ul8hhycub03gmdx5i5r5anr8r3edhmzhmpz41d8xwiifn5wviarwboos2zz2wyxx5oaocxbwalsk4lq3kl5sy1220lv7eq5uwodgq663ixvhw55tto0x1q8wq5znetrvg9rjxv8nth5pjarbsn9li898sbjjaesv0h7dfexfr6l3ht1sj8s44uxkz7z83fy59zvhho3xz2tzgjr69bzxj0urvs1403j5bx4vuc5qmivh0ua',
                        parameterValue: 'juzw1rvl4cj0qjrfg0wap1s033y4uqr2bgk8wu0agy6n175pb109f9bk7t838zv559ka1l56hyh52q93v8aduohm04rkkq20se3zxlc6m2dqvrs1jsahz2cicallva5wxi3q14bet5awnrsqn0zwzd0fuhs252nlhq9aazrs412f16c26g8ci04lf4oyazhui7ok5sb8oom4iyahs3o5udsslxcg7ef43oal9m6ukeur695r11qthb9omytdd61st3nvkibligkcg5nidh6jyalmmkif2a46lmbhvwyqj2uvanm0bt4h6uxopldb36j2d1ckfccvjq0qbm1z8hbz2a03ojsdhu2ek7b9eewp1k5ifqrt3zli24wpvx5fjpimocxbw8dm625kkt7jvzd9a87y85z8kel7lvgv2rdicnnu9j90ndcouutpamzmja4lwwzs98jkask86gsd91d3mj0id8fb2x4u6wfg9m7zim18men85ncuhz18g0yo4ksqbi5dydwki8cvmgdufg6gz51un28t4ocaht4gr5na8aiaguhmwvbj74re0lpl26ipqrtcsiutuf9swol8fa6x9s619szrr34vq541baff8tutnckr39ragph26xm4lbabsihppn3ff46xgn381jw0q0sq3jjdtcaj0croxpwanbyc96f2a89r100vk7vufo54b9ycetutaco4rtkul4gcy7whlk83r9yoovsd8487o660klorq5msx2n75vgpmwxlh6lnhzbars627k4hmctgo460djkbdcnn1rt8td9tuu8y5kmwgbzsg6yd540k1ywsc3cqg7s0o7tk9oa3bdfy8t9o8semmkn5ux1fyh3hxf4at0o9mf8zk1g905r32fuqcss2trtxi53qjdauln0juxnfztkc5rw12w7r7eyukzc1bejtmlg7w24j06zqylg2ity0jst02y09n7gn8bzf3ee42on6c9aotfbh5diw55szo6iibmt67xt7ztbg3a4m',
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
                        
                        id: 'bce0e175-0e73-4e47-a773-429215ad0f63',
                        tenantId: '04cd311a-5e07-4503-8f07-e1390e4c8ed7',
                        tenantCode: 'hb3y678pwt8lojc3zowy3y2gj5u50wweysmdsn6gvr0hialbpn',
                        systemId: 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9',
                        systemName: 'ea9r0nkystfc1rqo8fuq',
                        channelId: 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1',
                        channelParty: 'qfqje4s5ntsnexy3mwi07vj1turob1rioem3bg7gketdjei3l62o1pq1qdjgib819p8by7wzb6dh5ljs10x0bqkm48msjg65runkbldaof9yg93d0nuqcwj3qmda0dskntwkh7nct6ko00og365e2n3i6anjrr4s',
                        channelComponent: 'rcgxx2qf0qm81vo82hczc3bfd22ciskf4jxqisiys2j85ooc6h8zexsisl17o667wb3kxmnu7jax7q78q5apo1gv3947gxyu12r3lk0nn1nndtuspmgr3zhxq9sqtimhowewynki5cgvb4oc2wtn2wifssudw3ja',
                        channelName: 'tvszrag40ptyagmgsj5kbc8ink05b9cl3u7rcvaouhe1hur2ro0rdkleazo3tihigjknw26lh4hak347t7elglqhwgemgw9dd2zeezj9mzifpevgsa4mcw2wqaiwvaw60h92b9vn8ykggfs591a6dsbj2arypn95',
                        flowId: '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8',
                        flowParty: 'imn85r943ns7kasyq15v3lp8h1gcrsaqxy73whkkjhyoprfuj2qx4wgukrnw3x0toht4bbrw6h0ru9aoqanc0kxb4ulfv8qypx7vyg3qhvm61zxdllvh5celdnfxl4hi3gaa2297oqd7vbtxral480gp6yawy0of',
                        flowComponent: '445bouo5510um4ty52l3n7mbribnfk68ab7llfpniduy8kn98suuwb6lszicn9tylpf24bt4v2vmb4opieux7673mbv32vi8dkt4s0ypnmb5t2e5difvqoxaqllz4ctpf9o9hgggl02ch3komevlo7sp7wk461xa',
                        flowInterfaceName: 'mx0cph0xpcng1uwxd5k0rl47jxa822hy6mug0qmt7qinvlgssuxq2690fly9zsj22ua83k92m8iw0oau1g62wme06gr2qnhu89sla3q0t52e6w43zrky6r3bo6l2ghznq0er2sng53fw5h2fv8s338azd8ot3g3g',
                        flowInterfaceNamespace: 'wnilzonja75zezlmqefljyl93mewgr3dj5csfd0neda773sfbw5f9czfwudhoiwnb547jmlj0dccdk7mt9qe9oumjs68ozbmojqsnjfb8oqyorddrj6nxmfk84t0uboj5obs1y063wwwpvs64hctnogi6ur24vr4',
                        version: '17o3sq6igpgv3b2ai3o9',
                        parameterGroup: '82i4ao3p354pb39fh888paixmzklmh48og5eznxjwtmqnmv343pnicnnjeqgutmwb7wpzl22rhfazdqux9m2mc1tjc9u9iotygn0yb6ytcrk4hskhwc9g7kiyxjl75orte8fm476lhn1jy9h27vi34nybba698q691ofpl7zc3hc8sovqo96yykybwi8hibqoudgcxp17ujfl3huz53mm6u8r13ba98ufd4e3uodvaoblubf5cagoioll4k3yai',
                        name: '5bjee8jtz4rdtf9zu8oak8fqgrih8tcxkjc1cty8rqc7s620diyvq2a7toj8ku0sm6tp8x235byi8cigifigidpyoevrzjp93fs87s5dsrofiw09j9esqfjcx0g0p2r6hfcvyhdkfiz35bkzcodfiwn3get1icsv8cnov1s3x6db6bgr692phzpeawajta4x4l53hlne5iohz8rjav9ie9wzbhcv0bxl0lu03maiupp4vufc3b8bzjgq7rbl5swtoberzowwrqqba7m1lqpg00xe8ylo0i2mb11tr0zlpa33p106924u79fmym5uhl2t',
                        parameterName: 'wx36t0tlnx2a05jz1wt9qg1fl4ptft911zgo7znc8i7dm0f4ghfdj78c1tsn4t02swjbh4ds08fqaazhjjqjcag4quzpklvhc1re2prla1oqh4x3wev1f9p7cafqky517mntxovjf198ffiphgnqce3jhpigmojkwdd94ukesjt20hp2kldu8wspqwh9qt6wohrtzc0abadqt2dhwo9tx14ajqxbrmz9i0g50zr39wqwceyl4twr211ub194ia4xpeg65tlt1x2u6jxuypyecg785j4oqxmrdmxvja1crlulxb3jwi1drhlziphd76pp',
                        parameterValue: 'j1ielih5ur0w1ih94897239y9x7h04d47ztyljzju7fb6hr4zg2hjatyv8krurmg582ch28br5rw5i7ujxs4isb0ew5bfmubnkzyl2n940w3ky276rx1i2vjk95d7qgknkjc7r71l49lv55z6263a9iymnump2lxw8f54hzw12c7ysjwf9sd6ylp14s4r6zq9sge7f9e8py63q772q11h05nx4aebguvihcgcx6wqo8b1pa0vub0rw8hk02bivr01sigxj8aniqzhp2bou3x6h5v15aipaxreiiygabry6av5u2lro2r3khwdicjkgajo1bhm6dwi1zmasq1jukv6d2bmcsxaprs6s8tkvlq8poyzo6ngzfb6os0t7lpunw1ifkjdsgnk2nvutz958recjx72brhsl29f0f4l9ls2oujgp1j5snbo4c9m6sth3mj02rjzm77azj0jh36nejlrhpqs3uaoa28w7nz7a88h9mndl5ivhvn2mqw2ujb04d33qcghywf6hwxkmn7prooob3tyh95yxoe5x8kxytbe1klaucqi4tz4mowdvqbpp82trvpscg3lz3ho83w25uyy4zge2di5t0yo0hop7t5vdafsz1l313izuznxppyesoc6k7rbhnc0cp5ojidajkw78nu2u2342wy6i7nn7xhcqhc6zo3y2jv7xhwj6ilgt7i6t7lyooytc90jks36wzebr224rzinhsao12mslzutcnqq6c3vz9yzu8z7uagvob0t1rpld5s6wkl74ftdfuhiiqe76zls4iql0mdb8cxlf9s3nhz728zlkdh7sphykdb6cnrweekf92jupyi8oitu4u45yp9kyb223vtbah9x3qcmde3xt2jzpjzcdzmu8bz4nzqjjyydy4e70z1qonvwk8wdg5g8hdg5vqy9bepwxrm567ykwlprptc1m47vt2oecvxyek0qmnt51ri24bsxqfytcl7z5tquwn7f8cigwqr58fmw2md7qr9t4ay6qbb',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('bce0e175-0e73-4e47-a773-429215ad0f63');
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
                    id: 'bce0e175-0e73-4e47-a773-429215ad0f63'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('bce0e175-0e73-4e47-a773-429215ad0f63');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});