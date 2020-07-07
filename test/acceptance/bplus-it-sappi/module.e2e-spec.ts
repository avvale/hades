import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IModuleRepository } from '@hades/bplus-it-sappi/module/domain/module.repository';
import { MockModuleRepository } from '@hades/bplus-it-sappi/module/infrastructure/mock/mock-module.repository';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('module', () => 
{
    let app: INestApplication;
    let repository: MockModuleRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    AdminModule,
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

    it(`/REST:POST bplus-it-sappi/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: '470ssk45obttxvop4e9d',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'jq7qh1dio229j1ovpu7em73h9ccm1s90h8ppcilzrxq07nqpkh92sf28wsiwafze21pz4drdlfe9xphuykobcmu0483xwd0csp6h6efzpdpt0u4rze0xoact2el2qpar2lpuj4uruc34so4vrf09cofc9k2airw7',
                channelComponent: 'hling9wzajehrhtkmsw5r1y2ecbl1mslnyetiv9dn6wcyoq1b3flpj5c4wdh618yuk9dyempql2fe9788syp2ww9lmn98e1hqsgizsk4h1yp5n7l5yko1hytkut4bg9z7amg8f0o5nmp62qjmuzwsv8rf6sm5cnw',
                channelName: '9ggb5idf9exahsylzgje0tciimqh1f7t5g8ifrwp9aspzv9a5iwf6jwoz80uclh2wyw5s70xxagn1lmgp8s9f6gwt709m4hngtwla2bd1bvkl1hfywmrxjsh94km1i95tugfebfrl3p2i68etn6og9egvc3hzz1a',
                flowParty: 'gmrly8fqaz6hs52gxm9sueki9pjcg9hdx77o3msken8mfmkrl11kfow5vwy5s1hrj3as6x9misl99ip7edtkud85xzarnzu1o6f5vbqk0p9c38g0x2angjbaczc3j3txbejqrw5g6v2pd26hise9zy7sandb2slf',
                flowComponent: 'isj3kasv161wude8hp5iwf0jw7z80itq3e7ec869efiigsluyf1rx7zc0d1iv2q7ijkvvooznutioaxowhwmce4wqdznws50kog4wcnp5s68a6nwi530y5h6oa9zbh0eyxyht8w10wo5g87t96b5814kwpedb9uq',
                flowInterfaceName: 'o7f7x94w5nbx7vqyyej58ktglxy23pkq8mfd369yukpjtei8ibwow2x8blmogwz7lt7bc2kr5lt5x98tfpb60tbahly4eobf5ktfec06yr72zuhrpyhkd3wk96dto1lvmr1e05wuz3hxoc7vzicdy42kwh4cdmk3',
                flowInterfaceNamespace: 'qxy5xjslz34q2yfy6rqfaji4p317vfrdm17ctyripqxw5tlsaappmw9zsd1iy4x064noxbfmcdsndwoiou3x6qmb8112jwqdd7i5tnlggq1v10au8yq7qu269nwh4m8ygie9hqngl3oq113czue5vuj093c3aqcz',
                parameterGroup: 'snqs8e7rttvxq5wwgwd7cjuhifw8djwwjuib7u2s93udiwux4gz6uta88tv7k3ut5lcyq1lc80f6zxsvaunuc9vg8tenyn1ryminp1dz4bbn7r903r06s6ot9g54vkorxfiqnkrhbolp9j23pwrw6bhc11wskil6pr8dqg0sb0q4vw30mpykeant8uyw6qwmjlamcekl41q4jeg86ivcswgwfiscl6sqvt17jrebhs84ym5uvyz9taiy8l6u2fa',
                name: '6spznh78pwmv44g45olso517potfca2hnd8rsf0ryi6cqmowse2webzlkvfjqq9d1gi3b5xfmyt6pgvtqo5is8yr0f1jsitgbsi0gxefp5q8fr85to4ths1riging93zbuaxij3rkb5l6jzryf324tou9xfqs4o6wwmhx801b35m8vx87twg371qhhexyymrvhmd44ksixgfrsxv4j42k1u7he29f5k7gm7q5lkpnc5s3yoehu8fnp9svwzhfxxsygz2dgq9cie5vzwktfpq3wnf2e25375udmvbhhj86npd3qo7callm3zrl9oxou13',
                parameterName: 'ub1hfy3e1k4963xhcb44l7z19ys40i9dkpxou3bzcavnyl8m637fwawnx6udpjsd8x0qu83wlf2lirpd7z7au3e3v285phnbnfxix3s5ww7hzke6nzgib8fqe3jw1m4iq8u19pqln72w97x1f7hy3a77wp9nq0bshwexw7dvtdeke13q6hgsvcqhsisw77ab4wq54ulpglekqry1iebei9zfwf1wqzviqe7p18epzm23rvq2l6yhn4mbbvjnovfk0kwqps7gb5hmzlza31zzryle9fukmtz6bkk9pcur14tezjuws9by6rkikzpinbl5',
                parameterValue: 'fogwzy1uss6jtxlxns117vk5u5c98wulx2o0ue7xqbxu01j2a071sznum6wwg21mfs726f3hc3cyjdl1ex4dp3z59dp11st2ljv26duav26cs3rg55zkw9z89fggxsfw8ds5bhixw93jhelpwnlgpfumm90ft5ogco2vktpfqcdrop6nmy5mpu06qogo3mmldr17vciy8n7p83rnelussj5ipjzc032p2101wttxp9jtmccnubnji821i39z27hzjmc75b0y2dk3n7u5ji8lrb23lt1af7do5kw8uwm10y8t6zn1iyfxtpbijypavy1jm1g93di9hkessyt1hw3k2sbqe65lqnz15tsap5gcp1mxnet4sffd2fqsn7puifipw10zgv6sa52es9x6g8cd3d34okwrbr24mafsx8911apxdmjeiz9m53687ylpkfdey1x4a5geq1z3qpwh1htdnh7beqdpmqh9btrxmttzdd8tz48jvrl7w734ivr7mkhgj2uirbof8ouevoie9niygvz9fjd2mw8l0axx03pf8mafmetzv3s7x39zjcwdqawovi125xkx15g5vr2mc2umhx6tx9w7cvbpvh6mdyosvje8r0xtrdnxie357ji4v3pt1eo47ih7l6it48s4co3ag8o1b1pqqooixqyi7los4b72kddbpv3oaohw8kz07zznbwnv4bygi0gbinz396eo96al1o5jdjesdwbn1u8n61nndk20n9dxcd8ieuoi5c9u3r2yrko2o0qgflwukxk4wkjhryfe3arv3mu4bcpl18nxihmd1ozwcxplfs6zghr1icjy0qk950hbcjwvvdrjhrdhlm9m5pvvh3nxpbq7w80cu794rt7ae1wm09fiiep5vtvto4twqnmwumr2iqh6d18gwssvidq0k5g8dzmuvosx0b2biwaavqjtoyrzfzhhkp9kdd4id88w1uopy2owun873pjsu5ce0tcakhoh79gwjuzix7778oxuwbbh3xzv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'eirmqo6w5u0h2u700jb7',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: '1omx03nelzy2c9hvipf28uqpf2rbh5ydm6lscg9fnyj4rxvp89d7tdauf3u9jygijma0lk0g5qnuhpxtx6xb013ua03ene1ww79dkud8htq3z30qldwhit2l39jk7pb89jv7nzpncvp7ss7oxbaq0u63qhq0bh94',
                channelComponent: 'ioa8348fxk44keyccpbno9r7mmoyjh7cs1tqm3pjjgvqcruuhoi84tnzp18reic08v089iqhsi1tclhb7sjzlkq1fq2wac4pl34dy3fqinw3oyhe7ve205mhdgw1a50c2elwzsp1ejmshqprdb4yqn0t2jhp1bfw',
                channelName: '1wk7k7q5v7a8hylnpgg10tobhdwvzyx7wmxosr7biu3qs1czbma7lwuqbohlk5ju2bkd37jzow2zo7fx8enbdr1koyk6e01yfkeh6467epxd1zbrunzwdnfcyxfricaqfy80cmerleu7oadpwqqyl1t1m3jptz0t',
                flowParty: 'uxofwd86ciyijqgxn8y4wr3sqv2m2g4xbvxwpd5gdy8aoa90p8bo1ejcrsw1wa4x0q5tce6ou3gsr1haewsvy1pio5xfipne4bufjj1i8c0qje4zm123by34ir0ao7rl9mlscfvltjss40eh5c3hy9luxdlhu0ox',
                flowComponent: 'lzmg84dwt23txsg8xwkj1352qm5aagg2d6k392nrhmi73l9yjchvwy7h8c9fcybam1alhku8kufgae2oiblsf416jgw67535gyp15lnczino17948wuu0ofnv6sf8id8bx24bvd8xzp5zmq1yqtmfbsimhexlfzc',
                flowInterfaceName: '2qduf0kq8yopp2nk5xsyicghveqytomrw9lb9c4tmh6jbk7p3tvyzlm4da9xbthrwditq4pdw42495btgfr87cfjf3wkruxqm3zwmny55mq5l098oodn75mg4g6o02ug0pn7fechm7poieqqcuxoo8wo9034rgmh',
                flowInterfaceNamespace: 'glemeqezb7zkf669andoehab49tglqbk7fd6zc2ibbnlyi11z58g65mbvzvytthuwpspln2kjm2ad16m43w7aohrx8i2dqltybhjhhmgr0i1oomh4lrghmptf5ftk96wsx2xav6q9o00fd596plwejuxq489jt07',
                parameterGroup: '83svc4tytu58wzwssvezteql5g1e7pd3aa09jnsu3jt4nlcaeplt6hvvtityv8mixa3d36a5fqkx1zghdbehvbdyoizbx6j0f57lo6b9ker71f6yww9z92qbvuohcmxqm27nicm5ifbelh6o5hv7xbwff4nledo1dftf75t37hyv6ptbgy1bjbq4kldfrt0m81izapruknt2ku4cts7se9crnaxgepg57xd6in7c1lgyez53icxvnj9zm0dzii6',
                name: 'lfx7mqv0e2fxojmxrjbtmvu7ee3r6oxl7qzvcfjgjmvbfopm2924f1efqf13snp6rmtyr8isaolrcdewty9c8cz926i2b08g3ke9fo7hcl0omg0x2kgum40lwiwysoluyzug5azkpsm6hwuha77xfa7qsrrbv0mshca3n05okehtaxvbtkhk9pssdt1q5d3z1x8rcci5haf2tvallffif10wo7u8azeocdf01ooo2mrgas69ewzegedfce3uxj05oc5vuju2rsfvxnejref5oui54qqrf3aw21ona5cayjrlrmhzoih1fyc7cevristd',
                parameterName: 'zlf7ukd7g8qpprido0nfsuju576ms3lfslaikvqqqtbcfvsczpcipzbsadxmrfnju3ws9lm9wldkq07qp1u0ssmt7elebsej8tfrc4ofnj99rhak2cxohad2f6rmh3d7phlhm1y5du6bddp9he3vl75q6b3jktj94y0xkisqejgbm1fm7rrf4d62wxwg1gt7subpfydq9nunbsfxk50jfmpxlt7kyr64y47w2auoaqgg3gji25a1l5yrx2z14u6ricn5e3tzx5evp1kr13objb9g07yzgvgvdw884lxkbk2a5awwe9jl2ib49ytr0gtn',
                parameterValue: 'cw0e9rl6vu1d7alu6p5he2c3c43ss8ajmfbuaqq7qhw1pdu6dv82r9krjel7qa0ru1hwsf2xhf6vmur1brgifrkrasiumvmktdk65bwx73b5341bbx462uevdc5d4fe8nxahd0vnodz2ccxfqnf2hm3ae8jl33f170c1xqx6uoasv0pwzb46obyr1m5h3bvcv2rmuoo8bbfuaec66drzodxufjdwb7b6wfvmav9scx9meay7lh1oidenjnszng9s4lsnhf3saqyqwqoffd1mrjp1gsislzwwydold9nxjm5urho248ztzkdui0uh67zhg0c49azzimsbm71fw82i2uwle7qvfqz4hbsnyczcax5l2456vo6yhbfqj89pwboa69ojcnksqp80d7fr5r49vo8lf15r3d6jxxb8mp22bpq8btxd3agcktqabo95gf9jvekhyl3m7o4sftzxnrotacpk0mimbya6yezpcxz3e9m9adfo8sq8vz0coobfx5vtj8fgfas91bt2ssdm4yeiipm9094nxom9rmqukhboofiif3amm7hmnpoxz30v4m8p3beinpjtbhq0ap88lpn31lu57g80sxnbgydjx6abpmyxqv07cft7f5o80zdwoyq28x46641jih56ohim4qhe3n1yce6i3vq6g6df13xjjx0sd9plxi270jcnwvmz9grokr9z5tvthgwmf7g7tx7dm6fmy4kg26d6utdmjcur8zk692sx4crl9yeu1ncje4t40e7slkuewe9dyqhuy19ugpaqmi52k7cx3m93vo478o4dlbso38wj5shqmaqoxg5et3zij8sy1thhx78k5epy8d7x4p0mufzj1vqh6bctjkiug3kjodvjiu8da096el1vwp4q2yvr4pyipp3tycpwc7fmy2f35h0bgwrrmtxybguz0y5bgmuz31zj42xwuziuoh7m2fv5gf82iaepd3og13u574b00qk1ixw8mrwm4rqqizk2gbf7nlfw33262e5b',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: null,
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'fa5a7qukh3sko789av7x',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'isilt137vizjuuavckh9sc1fj840jgdg52n6r45es6ds99wkuke8405i8cdsos1tzrw8of90w669j4zo0vsj8d19pt57i9huryqzc5zqy8j5ul5h8ha4xx6hv3f2qyt1gd3e7xjnf9yf03s7i8lwe5i1rrsxrkif',
                channelComponent: 'oz9pb90awzvig20lc12x2n3m6290vd177y342wor352lkpplbgvkmd01p888cdl6fgccjje4dq8ljh524snazhbgr50xwbfpwk6t74c2r03tpadljm70aiy6r53ae2o02jq6e3xhhml1abmgaxto0563zqxsu69n',
                channelName: 'i2m7mcjecpjjrr1x4ryt7sdgh93pev02w757szf05e9hk6c7cgtqkt3dsgbsfvz0ztntmeu0clyluhrt6fmkue1nh4trj9be5b9m1e2pyy1njk8hjkxksc24l6lts91tc6bd2yh3zfgrodijny2tdjlezipjs2e9',
                flowParty: 'h1thcvpvnmsfuldxl7pxghckxys0709olfnsdviaxsyl2zbec2sd90ykbx8jpkda30dww6pxjcbou9sfyjlbqn3c4ge33l4n1fe0gn1a3y0lf7dqebg0u96yvw9c47oj01re483qevperhpbyuas8o3afzilyrgm',
                flowComponent: 'jhmsfnftaugf2dgwul11qyr14y8wczkhcw35c0yeisjmtewfwdv1586fkz2a130gpz5drfmrmjhefit6uqklz6weemgr54gf7vd79pmyhz2263mp1xh1o5vfbteik7bfyl75kn8qrk3v5soilkar9g7clrr0yuqb',
                flowInterfaceName: '19p4nao2z1hymfl9kib3z5fi1r3fprrra4ixy7ekp40qtnnd8iqv0iuuascdr49akv5gsdjfto8jv3ukq83kt2zs0h4fzwcnk5mz11c31g6p85a6k73d1ojhxdj93e6b8e3kgyggfgbodshy0iv1nyshaf3urndl',
                flowInterfaceNamespace: '03ic8vjhbrtj0bqtq5xg9ivsbx232o8vkr9hpgckxp312uopsp274rnolpn20ff6r2w6jurapwwpiyvkipl5kwv6tb1xnysp3t4ljzgjjxnlkfhozmbamu0p8t57vw8zn3jab88zqsx9rtvbaga33oa2n4budtz5',
                parameterGroup: 'tmn7qnjnqm22tom06bb7sre4niji4lvkkss9ayu4ihrk1pjusbgfrrdsc94nta1okxf2r6udfypc49iihustghujq3r03jhb76pdvqfe029173qx843i31ofmkni76x4vxtbsxbghyawxxxi6ydmhegos556e95gq8yvazctqpdle5fojriol3wf25ra6vnzij9hs7kmnl0ewv4xosavae98gsoj2tdm56syysyhgn0zj88wowvvto6zabyn1tg',
                name: '9pcy4490mznd2t1jr2t3l767lln2e9k2rpg4uxx3n4t1eytcrhvndp9hpu9c54hil6d48rb8bwnn43cck9glo5nuulubnl7yjn1zgv9dqiebt6z5f8o4vhqhxaz2v0famh6q9fbbak9nftzoa3ngbbzyl5nnlqs5s9l476d33ysm2k8qflks1sah85h2hrvbu7icmm3k03w3o816vvedhspk3baafy24806f222u6t7tfitvjpu4k9q9q3gc57n4urc8k75rk6fx7uv0pbqfhr461frlu7blgf9pd2qg155m5dwzgzjvb47qsna9x4nu',
                parameterName: 'bnl1cs75kcpdw6ty9o1yv5nqdhzc06dytqxun2dqtfc9c8qfv0wjy1kz6nbxuejhpy1qwprsm8k2f2y2t7hegj6n68dt81cyk3izxmwbgnje6gc71zu0ze3nakvgip7a2qp7vlepifens9o8e6hvgsa36k139mmdy0ls8onxyg7hprhvc57i47vc6utz80egn2vkzqiwmto3aa32i6xs8oz5whkw13texw4nfb0mwtiq66qejkk9tw6i0upv3d2ax9v5ka13if9tpzagppcdf86nkkijad769uxh1tw07nit7mu4qcr10mn5zwtt90co',
                parameterValue: 's659whdgch6s7f21i9jv7mhulb8lhosdc5o1y1chiref2n8ruw8ecubvnac0k5isxlayp76mb7y4g38ft12djqajm90gjxispq5nqtf6lkbq78vn58k6cikir4zkfifsrcnxgn58psxchovkgchq2jzu6wpy2xeagh68m0yevgk8z3i7ubz2lbph8vjwe09ps4ylv1jebypd797jnpkq5341a8bvoozcq94cpy1206t75cskpqir10ylyeqwrucqzq4ladhkievpu4quzxn27y490kb8o47mm4gnvzfgx82gpl4vfj4lx2156x61jqcogwz7cxalwh99k210v988twwm3v5foa4mes6lv181yfh4ce7siwy3r8dk09ylcpmo9jcnah3svwf1elatwa8f3ohj2qimtd1mnwcourhn3brp4j24jw6azh4utgiw7n5no596zqpsiykdgsurjn7ptju45dbiqkzf09sqppdwdod2zvo53awhuenha7lb9tt4eun06q3x854s8wy7qczg8gydl082j9n1gvuee9gtxmxgdca6gj7wqd37lm58dhiwkssk3gj9wqrjkqtsoo5q0wepsvw9qosdrvwnlzm2x7k6wljlq232xppdpfrmjswvu21j0hrfc5e30718vx04uokmg4fj01z1igrlseelg2o2zju82igxenolt7q4w6iqnfvjv3pwrupy3y34w61ze45umyfs1lcdo8qispfdmxwqh999my245dwudhxh7383ln8xk4c1na1rx8r5xos29uhuqzzl78jn9mt05so7gdpg07j3990mfkoiijanxky0pzihu48dln3iy6g4gh3112qxb3jmhu5vgo55mnlnfvdctkbdiwvkjnmqutf7m9g1yom40qoryxy98fo5pykc9kytksafplzz5fa56gjcdra0bwf1y4c7aw66hlmcqlobevruyxmwr6jru6nipbiiihz087sx0b05vsovsq0zrm97lt11ec44t7tl2chmpu3e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'hycljw3kqwmfxdorg9gn',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'yvireuizlo00yaf4auuzk7qh0ag1gmvmalddbbc5bzyjgfw1i6tlq8tyqv5p9kystzuy99csx4j4bsi0iuayaarl2vbdls4c13tc0opbtb5dyjbnsggm9ky5mpud5b270ddbate8ggl50pw2yd26o6lthg1y4dcs',
                channelComponent: '0dmyfmvpth1tjgivsyg7vrlbjlrma82tc0imw61nrly30zpgjko0kfgdzuxgumiotz4271neil247itu0h4v47cvf3aiywzl5fc6rjrbnwkit999rzijk5zl1mhsj2g6n7tkxrqnhwqwulyh1fl5rrxadn4n0ay1',
                channelName: 'phscw6aqa3ercofic2meh0in9yjxi89fh1tptqgo7wyrbd8axk2a8rc6qnb817ja3q18iz1ec1vnv27lwaogqjizyy4abqivid58celfvnuoggmllh335xeol9tjgwqalsbxnniwofv4sbibb6dltjr3ap0v8d2n',
                flowParty: 'rmwzh4swsxnymozncj9rs559jt0h19p2mnds48gen1e7hma4l0rshfg8hxfnsxsbl3zzidrq9d70fghl0h6vfnq12yln86m2s2wgr9zf9wnrveli6wsuzfzyc3eqsfm4kqvacleeytlt3yrbrxqdrm44nrzy42j8',
                flowComponent: 'an6sxurpkdwkzjfnlhhujqzpfcum456wmyb7851s3cbs1xtg3wemndtss2qu1ur073wdfzwhfs6bsys5rqrn2ebg00vbdoxogh6mu0zvkwepgufctwmz9kjkbo7va8hz1s5oi9nlq2d2rf7yzzsmuvijbnw78a9t',
                flowInterfaceName: '91wnpc5oduuo047ewz198eep7nyeco6ic07ht4rn18xhuiorweag0blsug7683o31codrrpbc2xjdhpnr8otq6i4pfaggirkfowz1f5r4k2hlbry0pdn3v3zhkc9yrhur8k79oyyycm7wh8pcuahm2ss5dp90uxt',
                flowInterfaceNamespace: 'oaa8agmh3h7ewvli69pw513ji31mrdfg0ykv27me4ki7gveescrqi8zccoj0yto3108ikqz2jtdqjhiqc9t4pq8g8nkd0aal3k5fgr56p0x6wdnfdhijwouk18y9y8del666znxbpfy2ym82vl51qt0n52o51ojw',
                parameterGroup: 'qamcqzl3coml9hizma8hovtowt66c1x7c602hrtqwztiua4q1mdwnq1qq5zkz17zofh5josvguedkqx9mqs7q6i94i0pgvoy2gdxyc6u01tqfhwhemdqw1okj2lhs3n95vbgiqryfpubhlriqz6nfe2jo3ekor8damzqdxf823vcopcgo54hvxzss9t7ljt3bju5urjonu4b9mbgkrvjicccnmnvx455vewleky70fok7kyqmugzyo3iffe1twu',
                name: 'u4ak5g2vmcyd454pizkov67jxvoveeaubp636zey5wwqmrklj2ziehs1kvojurca48fmhypt61km23vhy2te3jr2y4qhpzbehwzhcfo7hahptxjbgbi0dm1mm7ivaudyv2lm7x7k2mrmlqoxd7hkag6ksikrg3d8o481ec428fd0uf4os2lzutw2guk4j71lnc9q0jjwgt8pt0y1362ccqb2mgrgz9f80y345yd66cng71n00qhuksjdvnhyg837uk3djmxf0yglgwrp6u6jigntzz7pwnu90cail7k89eqb06fq4lsmf2yasjqqzijz',
                parameterName: 'v3gak559ultxpic2ehn6t97d73q8mxf5vva4m3jqme90ih4d9n6cqat4rgrxc5bw4u5zxkaywff6haj4dzyhh7olzb0uh6fw455rnnld0hxmk1zqzslu2nqgythu3svm1wso9640t3mj39f0vkvbz0b8b6qjen1tpwdzg1prtv5realob3gw0csp31bjg96w6889h4jk6iet5d06v2efeh1dinzoxwllalwd4zeragzq5jys67jlgzxisd8fjrent47rocgdeep6bk8zibuofgzg73dhins0t1makpo7xfy2pnmkuv749s7si5o7rq63',
                parameterValue: 'd3ag29ap4a5232sum4av9u4239r7k4ptbroxzzpqds9y34cliklxcys9uwzibm28tq5h6i3uvq15vk7bqyi14tm1gg2ztdsq0xaf9scehv99dqwkd7rmexg8tuausyjmc2g75p99yaqio7zfqt66qgt83mjo7zwj9ai8m80qcfsb8f05zhq22vwfk67md3o347e44jwix7qnzdjfw78c5fq9udt2ky2b8l2g1bia78dr6w3ceb25a3oc2zu6s6zqtqv3qfwc7p17ro508yshfenpdos2rzjb9uym58qstfaofmnmdwc5qsc0chqktm5vuqekxj0mfqhbv5madd76zauvkcekynhzml28zcshg2xra6rf1zoap4g4yk8sbtustovia08p7194jm9x216qtqzglwus1jjz6swv2haess4ji7u8eeeegq52ygxsrazailnsn5891pgdqigbbm2faz1wg3aavz0p5gdp9isgapuzz0xo44sod0v9hvarxcn7k8zavhwysyv8blakoqd0ucfjzzvazks9h9aipsae7n2cg5jomnx0jfygw8qezxrzxlz7y3mcx0t38q03z2hhmh7dldjaku9nyiskjcuilz9yigzb395wwyzgriz4kvwmmms6o59tok1qsrgditrl7weyk4kav8okerfeqm4t1eqb1bh5ki390p29sljyl97hp2ejatgnzdvvtv3r9vfn1v8y2ocgxuscbrvllpwdxf7j2cao7x71fjiz2htccxwm56jiqyv07sa0rkolxbpn0yl9oc0jhx7m9esio2qrxsl052hgwonipi2wp31oyc2v1wi5scgdrjvnths788a66aykh24vc4ng38jgx963ym3mvefchk4dguhqnw6n44yrcm3rg88itc6veltm4txy1lvbr0710bbfya7wlymu5ebfnuaejsc4s7n47kahviq5l4rkxhhh38nmdhq0h26gscwt1cgsxp6eq5nbl15tugrnuo8hlpi7tlf1fxz1skxk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: null,
                systemName: '24ty0jol44t4gckeyzls',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: '0qep9wmqta8yv3l2bym9pcjf7h9orr79sak3qqz50dxsjjqtafvq7rrba30zcp5hq1sjudum92jwpwa7vw8spzlag06i5gex5demf9zlmxwdzr81ser9qkb7peutu5trviokkx6tt0wg9cc23k7pj3c45ckeskdx',
                channelComponent: 'wyn5352gxtpgrd3y5i6sfdagq9ok25iv9g3c9c28s3l8yby5h0ocffzfuslpwqkof065jy0i5zya78koyyg55mg0jhglvrctit70ted261zrc2yamtnrtrso4a3iqyrt7bjdkg58azx1lpftefc6d6plxx9g2e5f',
                channelName: 'n8v3ui6ws4biavs1fhyan2087ctk45v1et7y8tlq7yytaneowgrbwnu4ewa6rwnbbg96ixeil1ev0phf0ht4jutz0k9wthia3flflv8bwqwok1xhx4edie87n1wzn9wqghmso0bw7hd9k8ozblxdwo7533bo4ygt',
                flowParty: 'omts0ageea6o0e99yieb2ocohe65h3z5p5hatz4jf92twc5xy8067lgcdzf0h4pnbw8dwzfl2wz0t59oqnro6ie4anl1opkf9kqg8bgb50rosoacksrsphb8kvsiamb2dhmatf8uuhaq6228krt2qzfc9u6lxovg',
                flowComponent: 'odlmuwir8ttcty5zj01opl0lr43cqzxexm5qq2ye3zfkr0cc49jnnm6r5fqhcw1l22j6xn7spfbttzv4sblu6p9dleijgeg83derg6wxlvgy9uatrm72ltg00eaptv2o6xnpjb56qrvsvl3b1dvlwi8mpmoccko5',
                flowInterfaceName: '03sof9a1x0vmqzuw1h4gn9cve9t2tsln8dz9bo8bhoiwq66i3srf88qxnvt2znt7eh114h2jlqwqz1gz5o1ruxmnomre1uo1lg44dg341cipsf76rkf2n334cilxxrcsqo8o8ahzp6gu8vhnwojktwj5vc1540dz',
                flowInterfaceNamespace: 'l1i869yf1385edd4i7n8t7xmkq2rja43aqg9vpnky7pgbl3qemmvsjdjnq80jsxinszqll59mgs38oqstnizkif2jhsdrrz5zyivgxkewvcxqwl2k2dx9fdk0a2zzyqqodvj19vj4apypu60kvlln32ig7t7vzaz',
                parameterGroup: 'sdgacb5nlb7b2hvufigk6anqk1gyfkyyqr3lsb3w34kccsjbcgmsxfo5t9mv4kl62derjs7z7mer1onb4qxoacjlmyv34fqm6cr2dhdc78fcpcfaw2thsauw9v5txnuoiyukxm30wfiagy5iqwk2a6bvuy2ptlkd972ifi84w3pfa9efm7vduejww6nqvuzxf7bs4i87d9yn1an8fwnkxjs1hzu3k8jll2fk1m2yp5x7gkbveuvyzvg9707dmu9',
                name: '8vte4hhydhw5anx4kf36aiefwodtxwokbk5jr6fsyya1y067t422rhud3jw82itmrntpm2g3tozo0xfrjsxnh98y4mq0m0e49vxl1kpv2lna23i0h030qdknvjd1n18z4lkno7sgrip9xxnhyj339y1dtusjtue740gpg99307mx232aj3dgyvpw833zq8jaw3omcslh0byk9z5r6d7xlg2lybg5y7yawtqwtu6czsnfdtj4tzmputjpijg2ksh9zizdj8ltkrocjsi9xkjjzy06ctc35ei89wlcri2wz5ynq9n0myhh653bi1lp7o11',
                parameterName: 'qposmidnbs2zvyhee0u9i7lhx0tuvkfkf7lky39trjylx6zx3fgaebgv4v50vusqvwnkdw705nj0ztovbkxkb64gujyco2t79ctiui7llvl0bk1dyh2k4o9riiptee40jrhkt692tw8widxgc1fs7ve3qymvglg7sm6f8rlj8k4t6a81tbpput2zzj11kcc0e26ul89q9z28t43nq9nzydgbxtf8dwn0gqyt2wtll755wbmbm64wt3qsfg7f1rmx9vhmmthoo6qo183vzpsbu5rde7fe68r90p5qma1xur88n1tgke9jusvpv90eztst',
                parameterValue: '0anotfw5ssdqudytt5hrj0tfuakjc26zq07rmyr4zglcz6qygymvvmoa9g9hlrwhwy3aegmu3a0wufg6jci1fuaxm82ifl2iylxt523oqmdveem0dcvz6dzzfdaro1z10wndyfmde5wpszvobga2k4id7ryp2dta7lws3eao432dse9ipu1nm9p5tzebx6l5jydsqwgbsy3wjapss6baaja6v15nmy8q8akyxmsb01i07yicb5cxs5pk9jmvgjhug2j1u9af5u4lqbpxl6jdd7ptmdzk6l95co13pw6wt2ru0qgeieyawaqy783kgmwf3n9hw1ke8go7wkianscxswsru2fk8575a55bfmukd37jed2gac62691iwv5q4f6624niq54f52xstebruheewdzbqj0kg8skvkkx6r1wdv0r5epi3la5jsd0is5vvm0zsr2tgp64m0rco8ewoenviozugp25su5zgsueo2gszzos2b5g43diseqt6ursyx8h2mvffl7l5fiyh6bmhrbomn9nj3jaipnqomhn8xr35jlpqkyxe9fjkkuay5m514xayw7faz10xsyfbr2pfvi42u52q5uh1cvgbj5hk9z6qxdz6l45e63crx4f78csri09mz3jd2wvr0oz0376e266gjhxr9snr3067cno8bfiws49jxus7h4xly0ng0boe44k2k85ij84h2jmiq2r1984guwah36nok8sycc65q9fp9qlc4vmwsf2s8tpc4v1tr5zsi7b6jfd1a1c2mhci8g4rqljf8io3iv6ayrtqkuy1qet6dd387oe8k2pdcd4uswfz7stsi1iqqnacn1zatprrn8p08axdskhao87pxr4bdrte00bl5x1hhudqkhxorreh9wd6jx9gsvqfpapvonrbwv73xvwd0wsg12to343s4fr3sxxjufgfjiq4kkui3n38phfvcsf40zpw1uyikeyw1j21b89d7rvp406kn8e7wozri6qkhdazjmy2egeoib5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                
                systemName: 'pswmx591p9wvsu0wijnz',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'kd7avknsppm4bewonfencvng8rgt23jrul2iuf04nm4xbahfbue50qryndr3spnsoc4kjkuj04kglwxpqhcs9m0uxc4hme6rt64fi8hhiip3xbkyqqg7rm8om5fksq7e9pmlxljazm3a2thrma12kuyhp13ub23v',
                channelComponent: 'hvdfp3abgvte7nnfikjiyfoxuecj04dwrs01uoq77l6cq8mrjalwy6mewxcexc04vgbjxhkx4mfesanx5wtajbxz9qbu306ipgh7rova9znj3pn1mt591f6znthta5wlc0gdmey167qnqu014k7xtl2qatphowz9',
                channelName: '5illvt2q33l3x4elbtlizqxlwge7sqdwztr71n2n9k2pdp3r7oceyb7mk3xm4pkbzgd351pzgv9kfejghhabjygcjv849hi75lfxqdb5382k4y9p6c0gh6ncpron50jeh9jj8c9wiqgu1mab08abryfsxpadp0jg',
                flowParty: '5aibbzmfegbplmqnavwwbkkcxpjxreik94ztehk655qwgrhqqu2eezac2zks2tvplh5k580vayn4rbe5nnd9qkzweedfs4vzkzhh97j350vbfm8ofbcklkqy5vk19593a3uobj9b4hw760nd7f8rqp2nufeamjol',
                flowComponent: 'q9e44bw60zo63ybp1ckz9d6g5w7arvk4gimz2ufmermduijady86jpuafvdvk8p6up7rksz89pl73tgngageufjqep2ilmvk2b0fxacesg55jsokinc70ark5io7aytf7l45mmm3e3q0gkd6ha2hw6qgg64w7zpt',
                flowInterfaceName: '4pjxom5ur1ri7r2sp77vc7pxz3hu7eqjtzr6owfrx9sxocpmohnzbwxjfbvd8qufsst3280pch7fv13iw5otl31nqkh762fxtw97sdht52go98ahqwu9x4g2smh032f7dnnrj1rd38jehv6rxr858qecjizt3zyx',
                flowInterfaceNamespace: 'r9ab1s0kg54j1k6fk1g7hctyte5k2e99c8lo7cdp2prtlme4kpfs3of5r2m5ysh3nrprb9loath47ve130f7kcmh5545p5stz0lvn8l1c3owa3eo93fdcx8geyphqp8xgxakh9t77tmksi78fpc8ypdfe5llzd20',
                parameterGroup: 'w5ji6gtmkqsgtnqlxxfae4ytv7z2yhbetcymx1vq3mepiffr79r638uuwj50m60mizsd4z6kf4ut41ie242dagk6b9lmxpwrhjmo300by1h60fda54qiftn1t7pr3yrb7yujgl9qr14k3ftx2inf4w3ur2ood25uxzg4tir5t3lzb58y0cxz54gvz6fio458rnt7mwe93lgqzkw2drz25vj14c9tejk6ufwj03y7s787u3f5bydh9hksk3rzf1u',
                name: 'il8jy7h94js3j49moxzhzc7klb8wjks7ypwtbyq3dyge6ogk1abq1tx5m7gr86qrgxaiq0su0zspdnmsmhpu0jq2h6290iiosk82emmsz3lfcf5m0oxmz0i9vk7myxqetuyo9tor91lhgjcpukhk1ogum4q0wd1t2fwcy7s76b0recnfjmkqw5z2to8hgtyxbh2fiszac5hd9z8z0xvus5wzkdltna1tqp2rlkwzbiwtn96vlwraqlppepm4e66ome5t4axr0fg393wil2k1et98dk1w1gln1f42i1u6e5sh0emykrbwy0j6r83e4k0d',
                parameterName: 'smkan6pojhcc5cggtbew231orog6x45afoofemeacgppl4k9natvel7orgcawvkdav1763p309rea0bpfxw66gio11j02e55gwwl5kutvzex8tnfmdmmb7wtxwedkl4dhr3s4f94efsy96eqgjzv0r958yo50uvsm364jho5tm4oys8rzeky50yzsud23yqqmq334am5xd61qdgaod76tn9motre0juh9x9lu0kbi5ksrlbt0hbgpzd2iox02e5u5vyxmj9fcsp1pvbecnxwhfp1sduf2kvw1u11o288cjm7eoo5alfao2jjgfw01r9n',
                parameterValue: 'nkcfl232g3raqkpfsxx02aokyson3g2mf9c0n5w73mzneyyvbecxilto25g1cg8kioeu2ycyu2p7miz3w9564mdg8a0cazmispnaoyue09ax36gut2suv8mlbyljz8yc6jyrur6kpebsn6gw2sboam0qz92sw34mrlcmcxpg491biptrwjc6mckqs6vcmv48emb6r0wwu6iggx8k4caz38w1xlfsrxev9cpdrlt2rp7mfwju4r3uy0wnosuwnqhj2x0h7ild3reoq0nwpx3gsgi86370ynp6hpyz6kwc0tnedhnl89tvyrphb2gze8ydq8gtjngf3n3ijy59chd0dxe71b7rncrfdv89a0olrdip0v1715qz55d6pey10kele0e18485s5e54udu97b5djpqsiremmc1jt9g3fj5n5p79heebjryw7nta9bis3fvfkdt269elbqo7mxd73af7b8blgkk1irxt5c9n6epz5qwhcmv9lphd7zbl9unyml8v5wgrw1zrhd4inbrv8efobr51xyqm2iwzibvbprf6jk318pqadjvr9rbdsun728eb1xp9pa6ip8wwpy45pqq6oe8ac01olty5ot5i7s0ypbzrung1ufrtetd4oyw9j253wrfav2u6hq2aullsf9oyq4ahvvkicurlol1y7m3foq1f9npsinr6p9cgi9i99z2rpez1hl75dpaey375815d874s65pgkduezf4omu3vl5zdceiu7fqdez1utrhqsq9dy3qwqkkrl7scw11wbpo3zh4k29tsv9844t4kwq3gnoistpb3vsl949y3e0bkdll3bq80ycewkn21aw2pn6pc5k5sbgrg1jzba88f596l9s3nldwj1p9taknmh9v42x4q433z6b0xql9o3k64ec7hwnikytksiv3i0z4v9sqj6075l600cobj95tgv24tqct3kqeq0q7no6kad6cfeibf0ybm7og4cex6sa5u8r0w0jc674ga4p5z8kdsjx5pjju',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: null,
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'pqk7hzj4ngv2iggu44ht9d3gjhst1goardrsnhip03zgu8bxvvz0s6xuwlkrbxo1pj80e5aa198judqimm35u2kl6gftn96v8k64v0im6do4puukeujjw7upios268mwpv4t522talduyjhfpd40l2ff9ao773wz',
                channelComponent: 'd8gn9fy78kav89l23a7w7bgukf5alljovd3r40l7m206l7e56ved8godna6zz09a6c69xqkwktx0uqpy4v34leg4jgxfkc2pmk4ndmgwqrzmik54zwk275t5xzs1ijpe5x1yuphrs69at955fagfqpfzhec1ufmq',
                channelName: '8yrpbuwa8kwi3e1pjgrwbt14u1tfx2zj0brndjqy50h49v83ybaogqd6hq2ewk6gpwfrq59ui2l4jknihx7hwzm8apolf3fs46kbjkw6sfsst80dkw8vbnmrexvleb2idfrw7bs0c0sa1r448qxhg1bsl1ukncxh',
                flowParty: 'ass2y5h4zfuzoof5wwdci4451n6ythwvrd7i6u21r6r03x0w8akvcdfrv11uucd88548ger7c86kwlel1rbu769fm2tqv8nqsqe4ikof5rg8zi8y4bp2mc9j15vuclnzef8ehvoask6u4gsuldrp565fqijo2n87',
                flowComponent: 'xlejfwhf1c100sbevzry5tzsr47kf5riq61jdq1ot4vpwhlkw1q60fwfc1yekkshyf1kpzkm5kxnnv3wm8ka0tl41w0e0kw3931j21vfxcec2e1myp6ckurln0700zz7wkecgxwihws66uahi3h74x7usziap5i1',
                flowInterfaceName: '0rncqu6mzkbv15xnlibn0o49p1zzrniurznz62ir4yo40mmojpgntmhlvy3na9ey0khhfpgtqe2dztws22k7qkkxm8sz03alq9np87p9ozeyy74um65zz6euz26o7gevg9zgq78plv6ca1u14ejcb33lvevfthau',
                flowInterfaceNamespace: 'pzvmvxnwnah5m3pj7lwnsjyoyoo4bjos7ql0uijq9cqp27xqwpyynzc82dd6p4g4qe16vovkq05utf5xwpywr9y13m6yrcrnof135xg1ij94rxqg78rwkqthhiuah32ofgmtuvtjwthm1k2ev3mpxszd6bfvl6d0',
                parameterGroup: 'uhrzed1oxgs22shq93946j3qih4i9wquugvizfmj9ee6rtmxmxfdf46czesdi0eflctxgeikjsp4crh8vj2v7q51zxdsatbf8uplwja3z6sbb0hy9nvzn6j74lbzjp9p3vse0mraiizt5edz7sld1sr7guy6ssbsfkjgwb4lgrs3jw6nlsphq1intydyt6d2g7z1950383m49ykinfjec7c6dex77tsu9sfn82vwt56hoitxp5nt04dj6eta33y',
                name: '9nnnigr4xnrab6u30wa4lamiaqzl3n1xo7mpz2bi9s0m76k4jm6oceube1qhu3azcf23437eywg5ppzszel46jg1wivh5eyvb98qqe6pgcrnx2xb6darj70tubklg4ne7nhlbr3rz8jap2vg26pg33njvs8wvn1j1dxz3dq2sndby40o5rqpfu1j2nl65lufb3r0lwwm1rnxc8ocjgvqzh8avtzz4pc7l8a9dbe44u80b16u37cy1sfevtevew2qezyaj7rmgumvm4vi0bzyi5t3966qguco4heqql80bsg2tr5jd6wa02zl4lw25ljj',
                parameterName: 'xad9r217x89ti3oaoarm64di4qoz6m66by2lwiurqi2dovrzka0f4qgmjvupgwf2i052cy320qpujnfkqqsy5h8dc2ubtyix5z61denj2hw5gan3yaqt93r40omsktpyfklmd1f9ypbjnnh5nzyzpoi1cl49ghc84yen75lwfspiv5anmwc3eg7awe0awr9rzumm83ivjxn1kxdt524t1ncl4jgw1ghsxlm8ffmozs44wstk76s94s8bkgjldju1y29xh6c95kf1zvz3rlz35sxii50wzz7g2hc9yv1h684rwsqro8ue9sy79bgbglq6',
                parameterValue: 'j3yu5mxg8m9fvhkiubrf32m9dpyoncjw5r3npmu8694okcwm2ji3pyyvouy111w6s7ajuoz5yq5eielx3cv2lwr5r04tmrp7op49pepu46z1g8pjaoh8p4jzwajbo1wjsf2o2ykk4flqab229v7zfidv0gtsw94b6y2vaveho4wjerm0bog0m7qtg8advkjsa554nh6m9o7e531zllx0kdhpk6a3qnev0db7mov1trzkc2g4r6yguaug1k7fn823ay5k4emilakkb65ftohde7hwdfgkzvb2s6m17rcl6by7ztfjhv1mk750wh7oa1mmfhefva02zffbsrgp5o9y6j8k4f837junv0wwezy20tdrwlk97xfb4pgqa20qb1yqcpgn860wjgsss1lqyvn0fnjm1oe3wvn4x951qyaon9r932xz1u2m99223c6s8pmlp8zzf5j5ntkj8z0aly32wakdm0rtxko8oyft16bho2hxwpqef0p0dspyl93wbb0l7thb5v5r65kzvilhip0xgbu3lrdy7qng6y5ypsj5dor9b9kuihadevc4apvk1c1cg0qaggrka3fs76xoyf1fktzk1sqmryggowd8bnjixaaimvpbwd2mmmjt9nc7yinrmusd31wi8g6bvy96a76xe4ky2u55gt1wgqmaytbojv1sdtg6qn92c3ii8l18umhpxxxokbzo69fii2qthz24k0hoj3u2899k4b171d6it87pdvovxfqrt6mtp78rxumaq4f8mqrkatfxvmcc9k3tv6p029lbbmwvayl1f02uh5ynhs34pyrprefkn8oqa7pt2z8thmmzbyizttdogge8dhe2a7hcuajynmb9aou6fxv0hlmkmc8iq5krwm2jywql4f7c0u0iz37nn5nyldnqwzh3el1f62zbmxgpu6ca2apuwdoht6zmp32158tpgzdaihqzvp01a2c63363yigsbzjp3e1unu4yp0p0bb3qm49u7gwi4pea28t96mcgf6hz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: '5lzyri6aasgpce310hsswpaquyl3cvdcswzbmcndwmg1h1b56ws06o823yp2k2bhlrx2rllwuwyxmrtg2p565nma1p5wbxjxmlm8slgi3sx2099j9f7rtf16uyjos7n6ixpxopekyw6pwf97ut2asn2ubks1lhh5',
                channelComponent: 'erpzztjmrkvdyuv7gldm46ac74bbjbty1rtow3zspq7se3fjdef8htf3qszb8xrv9vk12m77h404i7ovg3k4vy40k68aipp4sn863r4ovkg433swjrw0biehm5roxtzd012b7h5qoxefw0fguergt0o23lyrgjbf',
                channelName: 'aaoz4or6iimwd5st2lg6edcbjlppohdxoplxmuzian6tk97funx06isqltdpdelj7lpk4g99z6dd3f9iiszz2935660envgkavwcmf528lr7xo6yat5i9eedbodb587j6aqs5qg90tmpxnlhroe4wz9bj2ky7fct',
                flowParty: 'jzpd465uvmmz4ojazmpw2ugozdifkw2vehe2frqnxq24vdr6somj1cftqpmh8n4uaq9li3smz72ss3jvbeufmfktak2xs3ug0entuee3ik4lhak5wsnp0jskvob11gnkdhj8fzv6f1zhuiu2t1qn0gdxd08zilvf',
                flowComponent: '2b5e7xzkzwx8nomcj5x9is3foolxgqo97gfrrs5t9bo0xzha90j45606lhfg5aecy8udze0sr9nvnx3ej94aiqxfld6krilippc5bsce8gdg22ag858bqkorrqgawv75qw5we92n9r1hrhe0nkxh0lbhzb5pi6tr',
                flowInterfaceName: '0w8tlfmu9j0gwhdvecmsqso9iypiy580sjw0yek343f19x4m0ca46cddaany3pz1jk6auy6zi3nt2yajwmm358kwcjv7uym9jiee23742dxux5iiy1exhqneib0d2nzevrp46xznyphsjf2x7t16v8mi5udu4qpj',
                flowInterfaceNamespace: 'fi2yv1rpi930yf7cogy7uumja7zr9q7zk9lv0ys2h2q4bfxhepq195jnh0ljvxu0i57ivbfe5yuwtwvesdhvf21irjqq3hlmdyvicv89ms0xygk8cxhwd6xshynji0qncr7lxga4y48anqtrwdn0zmqd1eywu25t',
                parameterGroup: 'ot9kqvoupk0ueh4eu2n3rmxpegmsbsozyg4nlaqhjo5q2znjmfddz03pxiac7t0qpn42e1m18wbtj8lnr2xbvaj0ckghto05aekokxtgherk65bzhu0kuibebch5d89hvxvoyjhe4bpq8mq8xkt6yzrne0bu86ax5axmnnzwa2nio3tdeu7fnxae2a38u2faz7wr30tnbk1mwmsfytsfzo4eympdy0v79ehamd1o0lh15fr3m1o353fq5aiyhot',
                name: '6xz3twvouq716u9nqc7uzux3ty61xmwrsxyewut8ahqzttfu3qzeikwljrbww5gieupjmji1k5s06w4drjs83hoyphbmryzbsdr6y44q6as1re3dtj126uv4mnruyyh0i7k3ty97hom0jlgwp1nwhxqz3nrzsowr7tkpehpzcsuugdlb4av76oh8owh4lwdcl9orzr5mtvs0mdtide3b75jvufvdw9qepwv82ts5vc2ty5fa9yisfs1asvcv9l338ey76n48g7c20y9y4dq4gtm5ollqd6xbrjcnivru19lrzf4iq4t64sbsh4piyma9',
                parameterName: 'zwprhlz8696y307mxb9t05a8z7pjbf4cqprzw7kgxrmgi868q44spl3pwthtkm0kx1l9vjpn0yicvogg43tpdnbifl1ij24xqdt6vfojmjrzl5oy8x7y12pofi5d9q1xcr182liunrbxmjn35z5i0nxkchtg6awbkw9p22gs5cuyv5346fndyjv2s293f7ydhx4dhpn3mkak3gckjgvut3igwxj2lrlrp3jr5k0vpx5414hgz1iui2xwrueldkl1w4roe74chtn97un33fpaxyimir6mhpmtqzz7xq2zhevb81sybybtr1xu7innnmhv',
                parameterValue: '8setnv26gm1dwn9t3qjy0tgutao1spibqn2svl40w9ei3x516u32t350asm0vje263ujst6oj6zp1rsms4kle29i5n0ium2ic2vso6emledmga11qf7ib93bafmgfa0jyv8tn4sj1x2aq2lhch3498edzyo5aykhxa7jt4qnqm33yxeus26hr8psw4oxjvhf59oy0h7vdrvb76rh27rjakifz5zi6adamzxrazwmnvhto5qi8yp8lo9dix9z0g85vwy0dtwwon7i3xluhh892iprpi02u47hsr15aombs6ak118fdlgjju59zzsdgm02gek2yu7vote1ipvygqh5w4tx8981ie6wbboowhm8zwhtazhs02dv1kvuthdg3gg92k05v6765oanvsaeazohui8d36v95xx5abiltzjbzt41wevgy9qlm1vox49hs48fgilt5kjw7busgdsmz30qwk8w10r9uvqsu8hc5j29e12aqcywrzvfcf537nn8q74282x0jmhwmlfc8j785hd1rqr1xszkej0c5a82u5rv5m9blnoein3hp506o1r5t242jfqk5t86mxd5a96p07386kvclz8kcmcblbpoww93qq96dzam8tyhh44wnc5h5e50j99jiksnvfrnna396z0ljtdosmipkkhzkw524m22xgvdyzgikvllofbl5ocnxcf9teya07l77hc07ai885rz0oyvp7q3t9cckbtf7pksx8hct7cxajl2wmquust7som1pv9nkgzlj7i7t2e6ry85xt854ku5ps2jfetqysb29dqy680pfkw5yqu0vnjinhato05tangfwddcwrpcqilnmvlq9o40ycuj776xjcwhn246t6zqs0giiazx7rlnv9xs3je2wgn7iqjffc1rtbf1qjh01dqmg8xltbhk9nworctu2vort3tp7opxpuvbuibztumv8ynpbbaqxyana7uch1hgk7ldyrgccwyd7ujth1jrrkburo5ep7qf84nlq9l3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: '2z358qasia7hgp1pnaul',
                channelId: null,
                channelParty: 'fr8jyaj842ntsfg76ted86kzw9ag8y3gnj2ohjv080b086grclb2sw62ywoveytf8o07r8bvcmh2qx2frclpjphngntvvyfh7qzasjwxz4xuestb4u2aos30l5dbz00wbikc30qb8q0rgmkl1f08f6g8lzdxrwoc',
                channelComponent: 'awos4m924v69ovawlvln8pmoomd8i175za74plusbhor0i5grweoa285f3367ffekkfccnb648qnqxeoe2figue9wbnp0futqsocmoo4hx65hivq3a65veaekfb6psslzxpuzp85g0oxt7qcywz0nxaf34lb8atn',
                channelName: 'xv9pp5u205w6u7uvmvk8npch3rssrly0zp0388xopx7uy9xr17sankra3b3ddosn1wl787ylp1n9qtwysf2tzyb2wquavtofs683378d1bdzhsoaml0pi7v1k7mi5dvwgp4yz1w0iwrs3eog5fsvouyhmzw84n8c',
                flowParty: '5xbassw9e68hl4ianvtseim57j6tjwbn3bun0juawdrzpf7p0giv1a1gexylj45hu1jr4iwmysbn90vcpxgmszq2tftannyi3tu9szi67prkm87umoxqef62fih42lgtmgnzpn9rw9eopwabgiyf6w431g6ixyji',
                flowComponent: 'q9yfmypo3q6k9vk9i9unrndscpxhhqyuac1vxsp2vc95vlwoq2bb0y7yisdgepanjye9nqpmala5ti00qgknp4qb2wfet05bpz4sjhd8ojpqo7ap6jmprn8ono26495j4bvbqqdbaekqcveavhntj5sfv4czsjxx',
                flowInterfaceName: 'lm3xyhptukwjt4a7fln6y2xnxgqd43qoit88p7s5beq08pilghcr990y2oa9e1eagqn5wo7t2848hjge38hxnucapzemnrenh0nc5uf1yf4xmumz9lz4vuzwc00hd1fxvv5aawzf6myzzubo0hvnohj3al013g1c',
                flowInterfaceNamespace: 'g69m72lyr36kdw90a8wvwudhoqabqks6nsqyfsxd6j4tv03ow8tozmlcxe504hvlqn69p4bp294ojkudx449fhti8imlfusnxq96765v2odjq3wyhlnho1foq9in1nvj14drh7pgpcncvui70utawy8q7vbm0pg7',
                parameterGroup: '56np2i9t73slctse3zt07gkogaqqc6xfg5jjmer8e7x9em1rtlzt7tw1sxk6g66ptqh77sanjwynhxjwovo7fi8vwge5vdklbjndr15a60tuxwo3um9v3ouyv380w2txby5w3pk19x29c828ape6aa0xmq2ecrexsbyjmha1b63y5ve3m0iq2w63njabxhly9imepm10s6c9x2yywywnaczagxp02j8kzk4dd17o3yc1zpsmosvuey76xs7v2my',
                name: '0banqgerxfegb8jehas99y91fki2clzupa0vs741reezutk0z0o5ffal00xs7s38g7pcpekaqyfbphc9vsirmffzuk7qehnvby7qx78hduukq410htqmvsx6bzo3zsfl1823x52ab30lh7cpe64bt1ba4s4fsolcgaig344k7wmzyobf3swdhwese4eq55ddd96ddyxdm3dhrb0ij1lrz8znbg1m1r5dna5d94wo8ksk5whqecezoj6s7a7br8sfqjk3kp1ymdltmpt2aw7msk2tvr0m4n7129gj4ms7i2bt5i06hpqkjab01789n3e8',
                parameterName: '0oc4d7n7eiem9mcmth0sbtfpmtrbkrlwto3twzo8u6e8mravabz4rpa4346jltok57jc8ughddechjxjrglky4kzuj6g2d6tgo8q61hsteelan3zqeeekp9vz6a3ff0bsfd58hn1lookbfv78fiwqbh7q6uv4skwzx2ddilziyveo6fkyjfsxhh2mx83que188got1p8bwnkkqiowh8vbc4519zu45aubb0exuarw9pq69t5usxwuybcohrbc542oz2v4nhp5y9fqageokgdc3jb5ltxtcvtsxtn0gxu951vsk0q8yx8e65xujnwfrwo',
                parameterValue: '8ria1yatzk31k7m57aqrty724la3io279s4awxsqa8guiaf4fezu8fge1afimjhei4ymuzsh0i1od76hit9c8ikop6fwe2c3y57fmcgwd5npidmmu3w52zsmpz11p531cd3ffdyu9rtcn3jfeehpqubp0osdeu473f30wd8cdk85d6wqq2sqpszde0q9jc1qbdw74lpx7n85uwylfj3htf5ahzcfjifhfyn4gzko8q4wej2z4tpkk1lhr49fztii545qfuyr9eys6squnk4idvulu2vpoikklvb57bzh7oix141qjkz9a0rhfb7dgusqeu9cgplguejxu1vnwve6viwct5kte7nbkkwfraz1zp33rcpnrd5vp92zebcns7vhgstufllbbj73y4ziljswtnizzoftlg6wdfbw12qahsdqkx5ocp1mctv95xvzdlf8ynlvgrhs1p1hip3fc5tc3wqwusx6rop4iaonatkxf0se8kkwufo6c5lszsemptw6cy0zdsp4ym1famy0gel2jg0qte18h44vu7yq63akxhuf129smh3f17ebz6i7e1xpejaqmcf5cr0az7iwzvjmnclseekzd5ip0z5jdgdnss6xigodwzcomobxga2bhhnf7q2t5c5jiwikt9quwilikpp5j0jmmuc5hnnyeesu01ze05iuwznc3gh6v4xznwcx03995u8spavbo6w8dn9ov3axyca5us8x4lbesaufimhgv0pfighcbb7455vvk1h6258mzx2vshe0bn72gkd4tpcfgo0u0cpcblk836j2kr152cic9vmta31iliqy3ph8qgahn7ajg6fc2ltirq2w3uauxf5dq61x5x8pihdq0bbteg5k66xjj4u9dfwn6itm10gphkluzfely0zwoay7sq31weh4s6hyn2cqb1ize75pjmrkju0cj5iay5vb0blk567b7g1y39m0x66maq8qp8fcgbo9x0yp03ag39x3u09l7hiyk2qiao8mp7vetv6y',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'jtj3v2kjlntjohi4umx0',
                
                channelParty: '3konj5h6bhwej0a23774yl7yn3nbp2fenwtutzql5jwod4i5xgobvw4mb6zmez8nl56xtewuewfwgq3wkjxcv8ek1guuk7wy10wy6gmmcdwvz4fprudpihcylhktv75dmp4v2lid3y5sbne6g0qet1sy1a14ozuu',
                channelComponent: 'arbq5p7uiwte011ivpbgwkn4qp58y83cz3shc7dy0n16qvd715tdmm5gbets72y8ch5dpqamm9zcrs47ta99uulwjmdh00w1w9qshmhndgfhaov7rgehr07w3x83olbizz8yns6qyf7oshfclez0qwn01bar71fv',
                channelName: 'ku4f6kla9m0ngbawjenw2psyfwr5afdfc83e82ci45ew76m5zvtvdf7n8cejlqazm625aca4r9u92vngthdnc7b4n1txic10g608s29q7p2d8uab1fbul206i2brnopx69dm2nwh9cb2qg33b4ckyo5axaqhg17e',
                flowParty: 'n5oxlxt1992s40etafuxzqs0n9ttuahmcc9exnd9lazc27f0idf8lwa0l3rvm3jjj0hg4d8x0lwsm0zncf4e7z69yrv4iihs79ktz0n9r7l07ksv1c94tum01lzi2lcyg76laob4wy7lkb7gtzc48f77xlrq6vev',
                flowComponent: 'klzi6k7tjl4ihgteib4wgm1ysjvok4g50o4sv7pql3sjlfefggd3snvftcromeretk0wtgpncnabsknx234cmdcqz5gfm9bka02m3iz9l15aupyng9xmxjuuw0lc64cgk2bvkkmmr2kkxil8wrco12ltf2rekcya',
                flowInterfaceName: '9mqi5sg05nz033cua5s8kpiv0u97rl459ew8hor5w6xz8z6oge6454hi8rcq4r65appnfufhc86h53osgejl64pe0efij5fsahqeryog30vwfkm0a784gein3ztwht4ah93a7hqd9u4jfg8zlq9z10pzdf8yrosn',
                flowInterfaceNamespace: 'b68f04hxv4iw8nmkywxs3gscaqki49p2cb9yzeub9494w7kpmt8zdtf0nw1998k9iat2jnqx79kz8vkb8jk97m3ugdqdtvzpnie7ohwylyk1f2s8girhbvx9zsc3pkw44jybc36w080to5dtfhcs06cq8nytavf2',
                parameterGroup: 'fp4pw2yxk0oylgkna6wfwh68q5mry0ghnergs7t183588bul97xe2xdsk250g4dyryqynzomhalh02nuedltywt941eo3xd0dk3ck0qb4op2vf7k99dkrbhhbdleii7j8qh1d5bfstpjt1atyf07g6amaieffi24q0z6mom31egxbmax4dh9q69zedjbebg5zwgn176wfjnh15wklc10x22tpxf5q4hk83e6mlhnqvg6lnfpga85u90f195hgp3',
                name: 'fxrgplxpgohmz9vgttfpmbfg6gc9r07h5766qm07jkd1en1ig1sdy7cgaez6pqh968es51ga1cpi388ua81kf5r1alb6ln0eyn73k6v5yd4bh836srpx12lk61qdvzylnrrceujo2vcc7fi9utxe4qx3b2rggje9jp96o6ppcwrwioqm514rr9tgoegtezvxrz715c4e14mns3c4p8sq0tljr1fak6ir2dexkq2jtazj6n9o8c7pz1btb2jiorvk79sm4e3xt3k52k02l3nfhvoi03ewisuwavq0uy3fyy7kgilyd2j1jz3ce5yeyuhd',
                parameterName: 'ontsvljvr96sw3g920g0w2cki137ljbd94dh0c85eu31jpgf2e77iknhg7ztyyrpc2kvbj06mygyy7jd8m24q8geogdm9vn93gak3ld8gzgdvjbrtod8dlgkwiiaqygsnzc25oei0t3llaf20azbshhtxkk9w53o0i4qxmgyok48b1l6nble0duizcxfct5ygswurj8ue3cbvj3za506p2ubgulxsq1vp0b1z1m34nbvcbqd6qi2onho2if4l0eqalfu0ey9uuqff6zl9a151lc6cudqfssjpebzbr46g3epdqudd9qw79jf5jpmtro2',
                parameterValue: '0dabi0jtfoh4e34ssmrkw79epfq9sl6opf1z9ksgbv989be0173hkmx5njpz9of2vngt8g38dv99az58cikgz4i3es6q6uwj6zlo4kxf37ony88eizwhvevaswvaa7ocs8rkxwtnqvqc9b1w3s9ye15s5rxhmqj526ddm1f3k6aslk03ly2ncmfsvpctbetxv8jnc2lm16rg3k0fwypyestjcblld46w65kx6fnphbvznyb4sgzu5dppdvmra0cptq9r46js632s6ns1ig76ong8atlgmvbp7vbal12i4kh80sm7u7qqj9j73u8rq1i3tsni05g1gjuek19k0891apkt9jezlq4z70vey0iaym8eh2yjixh5r7g3ez3sxvssbetoa3fq49k69btdmay3ru19342eg3n43fv8rbiuthoqis4xpqgqpkc1bv8trturpcyhzupcd0bd6rcg7rvwgfmazqhbpl15oi0r2t55kud0a6r15qe8qrkt8bb03z470904pt4zjd81w7t5qr20wiqunbherv6dfh6hn7aurrqc6l6px2b7oakclmkw1dfv5g6utncl6igewgg3313seeqizz03by9fqa5tumjuqf8tqv01yepzv7gliametcr9hrwkur3jb44dnd9lnpq4yd2f9vxiwv7m1am1xgl80grer1xqse652c7ozhfizhr557j6mfqvwz5992i8paytjb8kf5f8u4v9pa8fwjb68zaujp0cgs3wc677km8i4p6le8lnfkbqvrzqle10e9nbe6mtlbp0v6xzqek6rpa9jk3mhj7x77zg0nfxpjfedhla8wz1oxa55mu11mcekdwgjcyhapichtfhp2bxloks0cjitmdwb873fwijwlgavtxqpvmvuaccreg2aw2yp4jnxal18po21hmfpe7yxpq9f00dvig46zv9ekwbcv6xvpf8m5ct7kyeexdthsgjv7n9ahzwq3ue5al9debf7w0nzgds5n5b26jgfqw3o9dutp41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'd3akuiy430xv9dh11ma6',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'i1811d35vrv38oywnbrsmo15d16om8l0watq5c0bc7hjw3y8b06u6jd1tqj3txceomkl4qrrtoi4ldppdywcdjjoj2c6h7hqpqfd1u5ygac8b2uejwfsfw3xdnnwqynjcz5pxjzhw65zjqerzkgchny0cyrvur4u',
                channelComponent: null,
                channelName: 'yza3l09t8i2mjq1v2ntmutrdif2emb2b9hmoro76r49ebrt5fur8x4oqsrz6wc9fstkjp5lshg0zehyy5bhxtkiiudx6htllwkh7zhxjdw1zf8f7p584tpruqss7wcq92hyw6c61ari9puuodv5m9hfon21y918r',
                flowParty: 'k3hhwwtm1fk50ro8lzg8oqvg11l642ea048lgj21j6q0ng9hoo4s10bk70m42jpqb816zcjmzgb9b7ssvjriys4vvtwrvdba10pciy3ya2pv0o1iilu1d8gykphukmtgd0ry153ivex35reglbfsaxekb0skmtzf',
                flowComponent: 'abfyalovdnccfwrusv1yqifhip0k4laurv4u3kgnb80nvc3jz6l381risaernpnrh0hvfpzpk78e6l4docuyq9oduw1riij2luamhbkf8268vz4nh50vqks80ducnil4087qq56ufmcg1ghclszw5y51zxvgwhxt',
                flowInterfaceName: 'v1pxov88pts6shw1sospxv8rolw99f0dxz98vwubx8vimd23vigvcafoj7z3od30ef6m2tbsc5b6s8301bzjclmc7b59alr5y5yjfnyixr3h4frj3fdy7gtuj309sf8bamnywovf5qliq17cmgz73s2pb4clfb31',
                flowInterfaceNamespace: 'm4e1eo83hnd5pn42n6d2bdh9mf8xy9uegrkf0wm4oq2m7c42g86os6d0h83j2sukg5digddimsbwjgburktn15o1xchud22rq6ybz02cfmt630bz9i2dg9mjd1w4ji732itmcpw9ugq4032twxtg81n2f93hskvk',
                parameterGroup: 'nx49lp7ziffhq5c6ljw0a7j9hz3j5ftf2vez3bspu4a34acstaic0j5yaid9lupk6a7fdd6xzla3v2c31xomi4hlnzd9hlxpi5k772cdk7uamjxr15c9r4xk7oazqqprb838u1pfer5iqu87y0n4goji49mvpzlkr0tpcc6d7w9a7d132o1skt4bx3qmv6fnflx2rsh153bhvwsesihnbfx1hjaxulj1c40eaw7j0yj0nrpt7bzggkhh1i38ucx',
                name: 'c48fxp7fntssjut39ls0alvwe440a80no9e8r6w82hk47pmszvb2t86t49on4lx9w083acudp5rvan4wpn25tyq0rrxab6xwsrjhpgz06wbbxlcxu6a8zry1sktxlk72ue2wo7gbkhnabwn2wn839n1thyz8udjz0tka5h9ojmw6zgvdni5d7ykp63ai0jon2s89vbv5vgft5hhz9hm7zjrajcntam9im27sji9y80qfk9uxmnq5aztl97u27o9a2ndeu3aup2870bmcic1kk15nf7kkm1kitceg3oycnmwmb53row1m53emg7s2nfkj',
                parameterName: 'vawecfvg6k5h67suohsdb0g6440a47cpp0443hwqgcg5ep636j59os2gn7m1r4pjd3bz8aad6xegxwlge1zlucbta4f46bg6nngpay9pg7rc63qtfiqh2g54oz42fut61s2vd62rpurg9aamjihie0ghw783qd7nilommqb9epiwajrv14a7ri5y9ultzbmhmxcyjp66l8po3easva4fawsq5vghj80wwdlm4yy8qpll322jh44byaj22kvq1hs2d3szpuc8cpgy1swcx21dmvpwxwnb6kexvminbzokbwmt7d99c6tqywmqv85erlcw',
                parameterValue: 'jt68xwycyvnl0tyw92hospk125bdmp974bcbgiqfp6lzqgarhkkzc68h2cjght7xe49q46rzkhp4hxu8pf7vjmbcbi9ytn8incc4yviyek4h02ckgpiqitx584o5aqpysjoji6dzktfmiqtzcy47rqg1rh6z2nfmem80tgw9fpnndm93qt3so9zst5g30fjc5pvqg4dgj8161458sp97f7bjaua0crif6r3p1lcgslnxo9y2o2wmaymxoxaf0obkuwqvp41ynsd32dt46mc4vxj1wtmspb99scbnvgw2agjdhm5bhf6miwni38ze8mnnenyz02kpykz3rl5p4hhrif1mc12cnek1qqdyikbfcmwikif9yfkigbfmn5e3fj5zzk95uiv5emqug0a5ny1am8oyv88h2hkdofqncb18arrbam45m27vx370p75v8she9orudyoeq0e263c65mymqqq88x82jmq0s7691v3tek4jtbtx1g1w2suidltielkjy94bhpjpqehzctwg8ho0w745b2lzribq52jggxgsekk9mdili321kkkl13fay8fy4ro4lrrigltg2z1bljul67kdhl6qxmnixs6jb866tar036czas4dcetgjar1ymvqx6qe0htvr558mtc1643ptew8uan6srb1l8ilfjb1fr9rxywhbhceskn7ebxzpvhpljyhb12zyqqowlr2efuyq1e42ubisbb176vix3ejztkiz6ewfri9lurmpdg77uolbhffxujgu3syhcx4knv681kecy5scfq3xwnacargw0zi6zimxxge1s3v3yvwqn5kr6lgqdmcgs72whxmx4k7s2s7iigi3db1cm09r4brk0rbe3fs8xjywxd0kju8usv1ppcsr80mwcfdg00hantrl4xr177fo8pn4qxxbaax7c6pgok4b8o7y3cofye40tgpadis5hf8gn3h443yz1wkrxmdsz6d3br72woixonbfqokt52m8eftgptaducwjotl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: '6tdkkwe1rmxkkhgt92hf',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: '81cqk0bhpqkaboqp6cu4sykqo297xbyr7kec4ocaxh6stl8uosvt9nq8axl621urfhivza2a0aslcump0agz4cb8tw1r1lp9y9hryaumekrhpmbk2p1xlslbqa6ya37er27z1zypdetqzieyhwu42bsi8znp6zyo',
                
                channelName: 'bvqikbnawbqzymkp4ze5qd9gnz40nre3aoqx0knj74dbladj94lpmfm6i9l6su3mnmucgvoxul5meg843j69gmf0eaktn72uvbon1piaq4opx72wbssoe7woagt37jqeux8erwrf2hvdxde6nm1dll850dy987u0',
                flowParty: 'u3pyborlc246r4aaj3iy6tokjs1yb7hjo0lsvwmabyxe92lbg9jspogh2x07gojh1viw50w0q8gkm4it0g13j8egv84rqeq3wpbx7svxzlwodn70evufiw3cbp4c2m45i1up27gnxevj7hm3bo9c1pry7pxjs1qf',
                flowComponent: 'yzr3ipwzk114t34p0oox03itv2l29ijpwvqga0a958fa37yn2an1dak954escifaj195uo3dhj9yk21zem5krhdg6elbptyh27cd9nfevhfmpk8uc45pi5yl1shtoqpti7z3cl8505u65qgl88i7nclbwvmq8nxs',
                flowInterfaceName: 'yz0bu2v29g4x5431063tump013y3mh8yyh7qm0ia8pc7wlu612bfx2ankwh7fzgptllfe4ahudn8bctb5dqlewk3fgkm4i9cw0r39wvfmy6746blvdhnvj9alqb5qr5z0842axji8s4hf2wtuqu517960iu31ghl',
                flowInterfaceNamespace: '1mcz0gp1rrzm09bd1c0gz7m4vxvjmwpwm2n21zhqzviyuwnakfsaepldwgfggs6zqrb4fjcdb11jev2jty9rhx0fzofyzyg5sd4elwz1t16wuig2xpajjqtiyuhmknvrxhvrv2rp133gfvlaw0kjh84owdavyxsc',
                parameterGroup: 'xbv33nbmvhnpbjsbaxtsq8jcsv9y6uw0rtmulgt4sfxuc76cip2fc2wkxndv4zcqu63vu42pnalqe1bn4alsbguu7pnh9pjeow6j7eiq8qh3aiwxm0c43usvcoiziurdjwf8sk0xufkypb2o4dufsjnmatl850my5mcdrij0u32fsiasrvk6i754e1lyvrb94ey4jyqb0uzt3ksbah0ssgwey9t9nit844cdao6v1f47gymwem8vrus0mvgbwkv',
                name: 'nyih9onwme4h96g0fwfix04qn0fru37twwjisl8zqjy7hqx6ox8th5w8gj831lcz3a06guvbzb8qc1d36buvm6glq0wjtx1439vfsdqosul2fjup88m0j780ym0h143p70ohga8qzbjx72lgelxrgubg0h2jzzyqntcf4iauedbw2ag2fkvuuls0hu9fr3jv1royoqg1eiklzz4megm1sejc3288g4wxgrv6nbqylwj1lzf4ljm9k1l6sbqnz5hauxo9ln5o28gqrob1lpcwtev6ijbcgjl50er6mqfgy0mnko5zzstz1ck6p7kbui5u',
                parameterName: 'xn0uv7odack46cwr52pndf5asq23awb9pitfeze6dsqumh9inrruxz87m8r4uw47ve3g8qtcsd78eyntisow4ajpj80oj688pqofey9jrdkwym9woon6xe7ua2ualjw2ovex0ynsrr4stg746d5xkln1ko5hpuhxd7wav3c0xn0ydldcfee8hyaul6e9522wck5euzsnf2h2y5ungscyf4q2g6m8pcv5rqzy7w73fw3d5aighvka15oky0wnfjl0k40nnohchc5xracg513uahht7tyna0x5jhd6pycywpgjjoyrbn4nwxl2c2e1bvky',
                parameterValue: 'tkn89sd0hcu2rkudojxwp3ai68ncs1rmsm7v2bsh81vgjogprrjpdpnrddc1r47yyb2fixz6ay4wq8kc8mzqli748f4b24tsbdvqopgd1d4q6iyrxw84xfm4zwv0xq3wil1ibknm6fjwlt88cbqflw74uyl3tr2nyckw5vqthr74xn7fajmjkq0zy4kymk92ie20q544wnh0qhulvug24u4h4x2o3im5bmwo2i56obhl8g8ea9ofto1sk60n2xwqhig7fe1zeou4isrfzdqvatbh6l8gez2gsh1xe8qp6pnn7dlcwdfzzuljvyj61gvu3q51nkdiesfo89a946hdfgj9le6fuf335eh2f8q3k217uyv7upxivv65l3umhz81lwicr2qpviob2n4xqxwdk55i89mynh9sfsdhdpn1bz1w4f7n4ty3szadkpgu4xsouxlkxcird1byeics937vtt6mbovw7wjrac18by83rqv84n73fwdza3kex1v8dsmunwsvlx4pdgdgnomf94xe9aiqksjf56f2ef70kmnu3oumj2nfmiax87hixij77alzwt7o0zuv3dwsg6vnx6dp5c5wga98zk3ibign6so5u7al1h6f7ec1r2nw2stauycdb73omk5udno39evnyal78ynh21t7ydn0k9vbp6npqjzw6n9u0xks6ws28ct45eun2vpelwgm660969aclvo4xhgw8vrbl4je8c3g0ao1ibnkng8s41hloosycu8mn8wjplbk9rgnfzgr4s5cz48t49w9dckw939qj7pbnqqask6psq8x0s7oiyj5veakrh9f4vw2nnrho9hfa4v8pdoaussa1q5tju6qz6be25v3f6gbj1mfp5j1w3bfbchp0ltlw7oc30bmdych2uespkxwtxkt9a3f1p1y1nxrfess5gv3dm9tw0pq1ixatxdluprzbp0bnlhkx360nho8henmxdm58e0bon0fgup310e5wtp0j8dolsjw2mm8yj16conq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'lu9ls3sy2oeeiaberrxj',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: '3fm2xvx7d34c9mcyfi5achx79e7w6376p3tu75m5yfzedkmw0aqlyn9pgmlm3hnprz1hp1knbfqdt50c959y5tdqymk3v5lssdy6iea0cw6bvirwg8ijgl7tj3hqin14xmpf6tztkv7di7b0qhgweehc3v820cdc',
                channelComponent: 'as93rp9txk1c0z3ouf1y8vl4rsoa30z3yve1ksy472zl8k9f8nfqv1ezkrg7oa53i20yfu2kpai9n8yth4699022vzuv29safw7nwuwanj3j73jm6qeurd4bifdfkyuavcc43d23iv5jtwxlnn6oqq9n7fp4zqyd',
                channelName: null,
                flowParty: '11mt12t4ridknfa4p7gzx0cohjexhq2ma25nmxe7ticzhjty3wh6ltlxb5rd43qxbji5470hk6hn2tghmm431ths1dpc6bs48huor59dk9kqy7hdrvlnx5cwb0z9z9fyqn5wg7g777jk2eapifd5neczmuwu1zy8',
                flowComponent: 'bw65lbc93u2tnroqcuic75l0zlmgmq31is1s1uokzeh3b2btm76cl7b5e6iq5keuyc5lwbnshn1ti17y8kst0cvsbvxp83rn54xi1k2bb2ycwluk7olfdyqkktxlg1f2r94hwkyxaausw40qvotgvo87dfrmvvoi',
                flowInterfaceName: 'toh4wjs3j2be1y1wwwsck9etqcm26jucsx27vri02azo288jy71wlzik2id70o16hi918ujlj7mh84kxhugza0q73uq2dip7bolnboazf3nflms15w8a8d8wyz4u81cnq23nt9nhbup6y186fj40wyl7xl63vryt',
                flowInterfaceNamespace: '4i8ywnmsjmlq7azebymkv8y74njpttxooothciss3h2cqj4kwmeoxuupo6h8lbycfbd58zbkjmvs7xkk5nm7swtafmy4v2boy6bzmpyv48pc7snjci31akawau93wkxl4xzxq9y4g2kospylm7zzcy7xjhjwsklt',
                parameterGroup: '59pwgjaqtjpzbht02e0stxbocd2ugdcxaoilpjbw3zwu5znpbk4e0871dpobhxvy6ohh2f14k5udbrfqm52bma2sljm4ld482rahghv22fbczm8azzn054f3xjh3di9s33veoz693tqz6a7cms4xkgfz6ewlpkkllnm87wq6ec8kphkfdo925wb5lthoz7qz0i2duycfgqb2fl068m1jeg2307gb331e7ffxb9coq6kigjl4qbj0xungf5a7zkl',
                name: 'pzdxeivcstfdjzzs79cz0biwpah3vildl0eejpjsq9pfe928hcwf1tiw1vw9p4stjutv2ickrnuqs6iq3suk107x3jsxuhba7k22r4r4num64nwua5ne0y18mie9y3is45yuwx00p0hgpe5a60caxpi7hn6l1778rzjd5xauu6kyhc8z1lyzjrainh9oizejlni7jbi6ptsh5hoecqvo1nvxwcm43ng0qeaj89motgkv5n52q1ydm2xwg2dssoi06xp1tzkvmre98k8u90tos79445hmz0l10ku0f9feebb1zvvogsllh3c1vmpjwkj1',
                parameterName: 'prieb1330h6gpl9lwcdi7bv18mbwjdpdqaukx4u47ntd8o1l9ss58crybhe6s7ft6adhjp1p8l4u388fe006mb8618w1oy9433ajnuwq9fe2m7peq7acdcdjmu6lz52lybun67clozfli1vzlnjkqzpuoc07vkhd0g4qvlh5jv05d1j1orf5cgyxuskpl7mfwzket5thpm9yn7f7kgq8pqpy56xpbyebyymb72v1an5lf3ozoxufl690g55rx5p1acxpqgluvbdrrb3593gjjbyvbozv7fdeh3fiqbs00tg8979v07znbucinkc8fz3o',
                parameterValue: 'qt104moeho00s1xqg8kdpfnrl2z74wun8circkly4opt1izjkrzh41jkcf83r86b9jr1rryadykgp6znuut5mqge3ziaqqzhd0mttxow22v3d2s38en7nss5rorkejtzpp3jwxkd6l4ik6vi8pojib0khmr6p0cde2na3mrqziqp85xa1zcib0rtcolmvytv394kkxa9husvsi1p56c3jt385yuuapu6tny76lkf68o2zwij5ua8vk0l57i9d7www297r9gal8zrjcc1omylw65l7avdghq097tnn9n31xzw9oz9hbt8i3aa1vuy7saqhhrpvr6wfcrnftkqrvpivlp95039myk05icmpzozphmoqw7sb0plqnn0775b1util5ci4ydtrb5o3964ghc72yva0jzh9o3vou3x58oo25zcnuivyzf884i4fuhlj32vtsti4bziz2j0apk4myc4rfra09le6ulpekdqyvi2opon6kskj71113piuuazam6cbbob3ekzy72243s7z0k43has6h5mkovt129k1rscu0hxcycag62c3baly98r287943livasojm0cktjfitgebeng8eog9vhk6jycbewsgyq28b17rwf5m7oxrwalmzcte30gsonahj9pqtxhmw5kaa5206vnkytq1qpubokwsj0o48jnz3sjexa8q468bk73u0vvgjhpcea923fi8ot3aaupobcffrjahc7d09d4eud0yb98a1k10o1skga4mcahw8wj7eg80ugjlexxwm49mpejvv4w9hlqotoa06npd2bq15243lvpbgpfjgbfwpv8a4hald10foq0o246fup5hrcb43i2nyews6bqkcipv7821rs5mbz4fj27m24xkiglrqzh22xhhgaecnoe8x4mk7d79yriepnqyb6v7tks8mjk3753q45s4453boswdr5bzdc9khezjt61txqgieiokl69ssyk6n6tjr6rjja8xnz3616mq7y75lu92uruh87r',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'mr20dglpbl118aysi1pk',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: '92b2fzcmpx547i7b8yjhdgjvezei63r2o64qwuj33cbxnspflagouydwzvp1btek1cmjjgmv6khnlj07fzbxjwb15nbe9g9b9yaq1gokv6ld89hc155xw7y9zvwlbmovmk4ihmughpfs0ucnoqgfcc3n2vb5309e',
                channelComponent: 'gx2ze4l5z4k34f9sn4by8av8dn02zxn4i6yy29z41qejbvt7f5mtlwmf83h5gmftnnrkthpccn790vt7oqgdi69gbb5eaa2iamsupklrsj2m7ew38kogu1mlw7kwfqs80oqnubgdksuz4kh8h328kzp5i4399ej8',
                
                flowParty: 'ul5dh2dsl12ynq722psdablxr7ze5y6f7x5c93i5glhuecw1s4ws7y9mssjtwa73ua03xw2a7macev0fypnm1dvpaqyrofw1jbdzpfepd1y7z19oyjy7da9aho79wb41j4dgo697m8zorcz1lfwtjxxxix9hkn25',
                flowComponent: '5guit768azkfxggi3yphs11a88odxgx7r0qxics9jsed3be3ia041fdadtvoszy1a16oz8p1gqxzgwatxxhczb73v1ujbuog71c1kwg1hrbhiucwuchf3qcc4s7idk0ihud69mls6yxf8usbipnu2bjgbe4oqppz',
                flowInterfaceName: 'hquyhibl5eitggmba254m39vmtl3w58ltjqjhov8ma81pz2hb6bv3upgbqnpt3fjcg4kyuojv5rgs6jlfswnmo3xzeczlo158b6u0luyo2784dm8nj71km26lqnvvnkpdwz0soo1qftthu8h9nsetqbp7yiq8yku',
                flowInterfaceNamespace: 'vpw4p1aq3l5nmdkso43xc9rs8rpl9nkjvones8jud0j66ghf76keh6mzefqmcnb6idktft6rj2bo1cckeiuw6m9bl31tc0cykkdsjvqbtl9bxk5we2bd3xhk6roqbml96dhb1i89sd2po4d5c65z5tt8uhqfz871',
                parameterGroup: 'jy78lq3hb8ib8lrqjsypkf09jcwdglypkgzb7uh9qhk5767gjviwrhw0n3ow9x8pet8mvdawxf87qnnx44zq5cn8nuxmab720m9u2tfn2r5xd68p5sff8ffk45x6fgjde5i7n49e85m9yxmbwodr3b1u6jm2prlrwlust0cqd4nzxakf6zs9abc3t4ikn8hlmxu7st8ozoprk2o63i5szyh89lzv5h6rivbf0b9omtola4p1c2csi9e77mx3k5p',
                name: 'ugmhgztqx3f6trgnz5umsf7wmob9t1yu54iwf2i99odo5i8ped6x8nn5ynijke02qovj60hobipq9s6s9e364ewxvscj2xjw1zgxen4g79xqig2gxvx6ru8wbjstuboy0b4ytzhtc01u1zw1fxt2stp8q6u8yn4j5ow90gb3pt2wfhyddomp1oxmwpeurj1vq7gek3l0t3q9l1g4zrn39wqh60nxpk81azjreinhoytdns8dzo8t77bpxj79yiwzp320301p9lpvab52dr43ndbncz7tlsxpl2ge06bd8dzn8ie0s30r0egj8f974p0y',
                parameterName: 'qwpdwcyvudcwz1qqwn6uhufvhw0rih03xxon4hy65pg6lp2tmxbjovnkihu29taa656d2ubkd4gby25o9tdv6yg9weuhit86pope84ltr8lw4sav6smm04g2a4fut3ft62xgve1ewnp04tvadbn569aorotvcpknnbq7j44q64mtmkfby61j27dyg1aragp64ggrhwssadg0vx4jzylyhjz9y6lt0lwlwnk8tnnuq4tdsu4odx1bpdg719759vozp9evm8sd52qbdbrt30ffjlxlrdoilp6a1y61uqltnjl59fl9t85tqptpqf38qfdi',
                parameterValue: 'd5ps1ghx63b9aesgfl940rkezehtp5unp0upkbtkcjke3z2qg286z14jmi74py5m8ucqramwjkm1wrpfc73z5bdmfij743nog5to7995u89h9ncunpfvzya4bz4oivdzf6mw785t1cfy1iaoa2whg5koqb4gxurxercg2wvbdl1yotu2fly3ajmhun3b8ofqxj89l5s79slq4k7fazu07akw051sd4u6p3u7xtprhn8murp96vbrc6ewe65c9yjyvrdf0gl5qfvu3x0lhrzzmabq1y0arpxopff2n9drp8itup7gowumwjp7i4oehfno54dv1hvkp6wzmwo4gtaa736hv9vsupdqo3qihz3s7fajzi5r7t8v25ydip3o87l5froqqt38xohskb2al0l7olo37wc8a074qtet7dbwqmm04dywochxho8j641vvp85bbwvi9spc7m62gjhkdulapjrqjlqvr0xbtb0t54vhua6fzuf7lxqyms4dqss4161u2xuc1zb4887m4fwcogwm9t9cwac9klqozi6d1j44mkqaojc68ygukaxfatwvsrc2z9j008esuljt109kmkeobpv29wr0j3h3fdv3czimsg3u2fxcjkzxekx81gdqucrjth2gtyue37mba5k7ln16qr1rzi6ixvbx94frf0sit441r68zfyeo3xwmzlnww0h46439yq91qygjy2l2di7wtkp9n0lcgwqzenqzfl9fhg690eatj901xrwg0b7bc3s8g8dsinklvrgbx4lbx2f0n43h3n3po51u09xox85i5aqvol9sca5huwewdxmehehm5h9jt8ekuy8ej3osd3zdx51mrnl8o0dsyzoh74a70uwz3cb2u33iee7tfjd22kzrxt8f6uzyfjj2n8iausmd9z061ed1soe4t9x01o47ojrgsi0h3gpntmlrn3m94553jik0zrgfcg0qvsv1dnt9don4e4iml52mokpie1g9b1590ah5g29qsbed3aq5n2c',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'o4lyj05fu05a0ivay7fu',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: '4bvy0us8ie57c7nl65b8olvyelytd2veuag66tkucjy40us6k72uz8b0jpao6ahsqiws5f921skuvdmvwfyfft29qc4kih6p769q7di0jvnizzear54wj7k78r3a5v3jfq3cis4g8azdwgw7xz4jms5o81q16qtk',
                channelComponent: 'vfofue7hxutpjj7n5umxzbw4jbi3eyfdo7qi9bnd8i92za96gtl3nh3u8d36rr716mwglz89sls5yyvbp45cj6rg2nw1rs73tpj29e14kkv05r3wpdntr3uzlf1yguw81v56pq8o8c8y7xxuplaai2dnv7rsspoo',
                channelName: '7xhsf3czfkfr0tk9em748kdwl1mb3gxcrsw7tq56apsgbbeaidcht6hnhfnv20d4hm2wen0z31dkurcf19w5ot8m00fo0zzrde32yao46h58f3u515f0pmqz28ex9k61qz4uur1m8qluaybe712v5ric57ox8z1q',
                flowParty: '8sxdu6eqw63o100hql6ei09rdfofkxy7iodl8i87709iwm0akde17ohspvpg875g4ik0ruy5p39hyzfze8rdbzhwouy00dts0hb1o3mhr4ncegco5uu3c43p1l5icbwhvhrro6isoziaq4ya23zp7udyiaxo4ydw',
                flowComponent: null,
                flowInterfaceName: 'hx9vc2rgrooplfxmy91va2mu7glqr8wtduzu278oq5ra4wzu8aie6kelvpx2hxjzw2scspemesx8zt3gwqyapvzt5r2qswd4pj7cdn6zzuf1hxi1z68oqin26at5q3irz9c22p6t3son4um4zi67naiq5h4mivxs',
                flowInterfaceNamespace: 'r7y5tnfzaej1hkc33vs6vf64qkvmxtp6lo5wpw4ijbukqb6zq6em60bpbg7rxvce08pfkbgdpvxr26l4pvstcuxo27fy8d23sqfy7kqibfl6519th6v55hc8ti8ds5vl4o57pohjob2k53blt5xtard2t1u0kzjj',
                parameterGroup: '65wc9ddgw1540ahy7ooeqi3c6s6phkhiw61k1y9fe3ys982c6qyubrvvwuz9qzdgzejc8tvestqxv5lpa194rjfdpmcwkl3knp3tw8xtir18kr7ohnefo5tffitav53ecmooy7y8cz4yofkocfe9yy565coqbseez2gx7oui0qyyiyg1s5ntlc8m8ggubki6jl5zqkel0233hzgpk5tpb97daaohm6gch6f5ysnphmwxop1btln46zrrs5hnisv',
                name: '2i96ktz6nkb0pn1xpfb56sv8hti644q4da7i3yzjnsarn4u9y2xg9hzufyv43ck2j5o22x7ify1x0gyj3m5flx46tr8h5l71bmsdrkqanneqbojwrtmeolklw1oqtmyupp0c4a047707oxnsfwb8gntevv0nga3o1xps7ic9fjs3krd8qgbspr6w38o1f2uqrmsldr4ybug4jbf3pmkrou4lfuujiju3dwxa39y5ihxboki8jxaz4ye33p3i3j34ndr2pp8b62lia48u9jso54ltrptaw1f00a3x00kcptfyzyy3wu75ceamaupx5gpd',
                parameterName: '9ih1u646lvkx4pzrca0pmrq2k9377uhezc8p77zpxztor531ttlurhbfqyliufgtreq971fgjg2pdtr2ek4hb254b3q3tlo30ooldbh1c59yw8qcc75vrnh8ss0h89uizfelpf825oq9l1tctfsm38srt7q8rcgdu102g1r316m4k239tmglr9mn5gj0sfd5zl629i0tsprs6jlj2b9iy1qx5azkko34etnclgcmufr12jtatvifv9ujzqxlxs546xq9xxt4h9oxy4ygbw117ylb2hgulf4xx7u4l2gtncp73eo30f74um7101ti831n',
                parameterValue: 'csuaiyl1ij14x8p3fk48ilhy6j1wibtqs08kc72e3nhccdv7mr6wjndhhgljqt3joln2aiz97utwjvistcdps1psdk83r28faly0m5lxt7buvuh6sevut89rkv4nuitkoiqo0o5zwyxambkznc2141lhh4w8x34bsrvyo2crn1m488krc9sjcgezmsgds48v2r7kma4x1y19l6t7mbe644ypxmh0gn26a1g9stcg7w224rexh9xcf8u33x14o82nefkfhyxkrpxgc38rwdbdjxv7owil8hlnmce6w874gbptqvzzz3m4qtke2qym34igjncd02ip6s2s4ae2i6d0uh0myu9szmajo81sjf1f50kq0ctj3w13jz9lr4j69vcghw846t3poy8brix46ohrphudw78z3sbzm6k3ll3ij600c2zvg0jxqrrhv37qu9bjkzy0m87lvn3ho12wctwxjupnzbrti45lxdsnupye5906edpihbhzausftnclp3a3smn51xr2fltjz9ovfvrxrweern9qyx6xrgwndq5csxe2mroth4qkig0an79g9zv8viit3fpc433egzgq9ukid8hm1vcztbrnxgoz8jl64qo7k8nlw6er1glf0lz05uoqzb3rgspc7vvjs96jxike08uf84jimx8xxkxw2daykqfig3mksadjf80hd7s4j9ncfvawhgbzzdxi8xql1j7khwgfizqxq6lh98z657fo4oaixiotcje1eez82tscyu46v9naanqjfi6phnpdibn5z0zl6m4iavp056xzolxzkctvlnep0cxc5e97jbz19yfynldhpglbpms58tm9qt3oc79tyyr8466i61atnnq88ctmohcnkpjozllr3gfiq73gv01zkwck97t3zs53mb43rieavz1x1oe9zloudjq4t2up61jnlfn15k1hjh0gjwpwq45lx8bcc0wnafrp2cr5mhmlijd7e47h9rmr8c02n2nwcgym6v1khuith9fawj6u',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'ij6757ux6g7lahpgmevo',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'la2nav86uq67wdpa9ikygvw4al25ale3jnbww0m88ijw2qw8l7nx3ofvoyrm1g1l9oss1ykwtg9urubx51464g67lfozjfx8qj2wa6y1crv1vqsa83dwynmv2ttznzb1jgbz4b5bb7n45g644eec8wmss4wnzz6s',
                channelComponent: '2c6hv8en62h86mmof6te3y5gdey99pmnjojfoskb3wijj0500yxadw9fe8qvko95ys83iv9oi1q6mw3jn48m1f8gqjm1yc91i9mm1aykdqqhfirqflst97o6q4t548rcejf41akodcxfeipw2338wowg2a7sws6w',
                channelName: 'wwigpoy22ij44h7akxcxm7os4pnk3whzns65y0152hdpwo5gg1a2arcbv6cufr7zc927ydj0g436ti98oemy1h0cmfscp2je52ab689sv4rtiakda1sdgyjiklhnexix54rfvbtgdrya833v7qvqdz2ulvtu2oia',
                flowParty: 'dljgzmrikmi7jit7r4t4nliqekirbxo1k1k1hwygdkqhl62i2b58xlv30azbb2th7xemukkg3bftyyync10gc2482ko69v2sygxbiquwfx8e1qt58ti1gq3bnhsvvn2skepk337istj8dfro8fl6zz3x3yoay179',
                
                flowInterfaceName: 'w06omidfs9kuy1jmmlymcwh1o0st7ai5w86xa8rzviux8dpzzj53dmecqacic3qfcn7vqegnxpeiphi85bxi4r4x0wsrws9nh9r5bwd6yiacum09j61v5yh1bm0aw7nq5nsbhtps0fbjaixk3vlqkfgzqp9tq3sj',
                flowInterfaceNamespace: 'd61t3yre5efhavu7p33lr8j5a35ym07rmvbihsae4up41bxfwaeyr62a506ryzjqyfu7hewm49rbl1wu8f19ola9x2nm6t1piy97pl69eqy6ky7nzkpd48mymntxjewxpc4ddnkqn4ey84jcxq5ajq88xs2pg37r',
                parameterGroup: 'ar6dsgh7kx7rw9oibdnkuevmao4w8tfr3wo6tgs8snih5org9sbrq2w6s0dhf95w3igmp2kvnp4z8khe7dafbre4rh9iyzclyghxtwuzanqn5ilee3q04dinqbw9atzindyv48jmuzkp065agp34rvxh64ip0bpyevs8gshevfvjvia5jipglaxyarko880vbkqd5shssliuagjie4ujbqrwyknnjc68v5v6v04j1qynueyj8ar4x1truldsk3b',
                name: 't7k1eqysk0okamgikt6av328ennkjbj5fmh0ugcgflqo7aezoxbybrdkqmnp4zr5em7tues2v41jfo0zmd94xnpjgsp57oj76owpg9zl6ln1j9hv5p8gxis0aki2rldsr0egzd1gwu04u5eq7f6zcnvxx4neqhs7pxua3fbwql66fm537jvhiidslxvt6zx13ge4kfc9hbpww6euid0qm8hq5tatgra3k136d3r484ua0t76htxl9q7snt77oyb3u5qv6i09nnro4nlvqzkal1hxda1t5jkxqdxe4kaheiz600g3cjq9eifhh2p4cg5w',
                parameterName: 'aa5w05r2lxwzcfmb3pd53n361jwsvsxm1oxkbpxqwzmlp602rbu090ds1vmdkmvm29g8mncs4hb35ap76aitlj3le1smrxf1eia4zhdo0h9lu5ub5rfy02vc7jkd3hqt0k3rc3pw6bkjulth93ma42j2xt6h6v092jl5vm8mvkxgn46i5eb0u8qo4n6yc4z91t0luq1v5uj7704cmehtp8pk5pmtywk9b4wd142f29kfzn0ikw8wn9lc68cvlyq7d5q9ugmlaqd8r74dgwjhkh7o6uppkv83i06yrbt4dr6qkx34dpnmjtk3vcs3nb04',
                parameterValue: 'cj91kck75buq08xxqu05z8bv66gumjc2hr4rb8szlxaxyg4zyvjekjdhu3r6hjeke4ptxepwf0ih2freqbqep3i1o9xt2mk4x1yizz7f5p19gc6by33ulgxut3332vapoo0ulnlkt1fd87aac0vvpndyvlmfjcfmflz5jwnv05zn4pq6uor8yizntxtmitkds8upwz0k8c5wnc008nmax7bpl4w3d12wfqi31ufr61t6m7l9s7ftycp8zg50fnqv8umi1j7jl5gvg2uqlstgsjypy17lcjdu48zdjzhfuhauszdn1bwyisp9tvhfh6k0kdsksmfn7nfd4ydqspelleiey7h2el8cwu1jmoz14wtgxvokwbb3ft7n6ss7hw9lzvssir0185z2a2iubqzb0ew4pvc5c0wlqwdm3a8uv4eh1kbxx034ps7zmr9ceu1f90d1w8ix62a5j78prp08ku7oaw8ylwo8e5731hqa8sgsb3aag5jh8xmhq8muhopcgvvpqo76244nuodwb8b551dsq0465tg1oqq9ues4qfn13mxt4v3ymifacdovsm4sviwznlx0w72z7k06r240az9htx7pb7ez1r0s92huh7lhwmorvw25cxpa5cooxg0jb6xqmezi3ftuysmls60zxu9e5tw0af5tb4g6ur02e07rgwhst57zxsl328xlr8sa0czt8rj0lnixttyxvktqhhawuda7ax79delnte6zyc4o6i0shgr40zyri8uhgu3xidgr7tpiy9e2ds4e44jnewpl5nngmas4tidiq72p681jcbft85b3uw7eek98is7v19c3p2abygwab10099smjehqehfx1v21ea2qppz00f6azjkbcelxwwbzsdwfqxn4l84pm2eon36y1akocyapgu9x5lch0hg9g3mhxtzuqtwzjc4x54c7qw2amzps1c44p3ev00suagtx58ibrquya46n0mlmxrbhbhv2agjv5r62aqt720gun66jyui3o8ko',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'w94ckarb6a1frmx2vuw8',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: '8asyzms2jyjdc14cd62d2asxti9mxb2gsfeodowo83jwzts4m4evy32lvmu7k5ptqjtj2g8bxs6camb9onnhzw855j70cre1uht5cu5hmqmkud2a2llz434drksw1jwdg1r5jftmf69brrdtanh8zzmcnntlx567',
                channelComponent: '4rgy4fpnhwoh38ut9ntndt3ewx9fuiuocw9u9oxw0lffw8ivfoivhqwdrujlw5h86rjahgaojlyufsp4dufgnh3rbwt2rfrpbc2rmzx0n12ymi9narlrym42sk9elyeja2oy86md6qo5ro8nylz6it9xf4fkl8er',
                channelName: 'ni25ph2b9o858cekg446u2us699bhu95xh49x77tx0266jg1v07vbtol8h1m7glzvremyz25okv78r8bqn9tisv7phg0cor438gd6t0wruihdrgzzvc4faquuyrb6dfdcvl54algt06jd7nexan4ofuz04ok5gby',
                flowParty: 'icc0y4y9fe78g6cz39dlfqsuos03bh8asqh5m38w9v9dcnr3mevr2rdcl3njqxjtayk0p4z8o6w0it35sfeoshzkv0u7amzr1z9qfbqduay7804remskdr3bqgatrega6i8vkdt77jmmp7dcp5j7usmglm1cvm2r',
                flowComponent: 'acaz028cvgrz4tinu9ykte5y1mhg1k9rrqwguk395604tvcqk55jdijd6jkpm7rl7r0gke75imgq3zg9skiklipn5ut9ecvivy117t960rpmu2jn1rfaffeadxk6pi0eq7dseivbske00q5ggyj9pok8e94i5uxi',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'vifr4vf37esalfa4s7g2rz9528snfkam8cgygqzxioys0t7ayolpr1n09snifz0t2afjeoa1o2268iqba4vmrz03frnb93lxrjilge43l2oh70rgv3lu871fyrj1bnxyojqda6am561rl97avkyj5c5gs0l4wz4a',
                parameterGroup: '9wxzm3nf0xlmo32091rer8avhcu6h4lcwx0md959wvy11ekw1ue31z9hcdhox33vgoja40q5guvib2i3mh2ydfrlscxgt4g0idkko5p8v53a6xbw621ebeovxqq4oe98oveken2ttjzrb88gxfamph6iziu6g6cp9hi3leg51ndjmdt9i4z06rq8pivdbo2wqb4255zy2bf8w6wfm3d8s22zkid16u7a07qdyztm4p93klf605g9gx5bbamih8l',
                name: 'vshvm2hftobci8zaxx0ogi3m3de42p5apmodr4kms9balck2npba4g823nvqb4s41ragnlrbecyyi5nggliqft2cozz2bb9mg6m02yc9mkk3nagtfufoy7640qdovv5qredhq2jrmhcdo2347aebdowr4rg22gd2jr08s3uhreor1mlmchx851zxkwdohsmwpp8r05o0fut2uqphcv7ynd08t7bkucuo1iwsbr5e8f5isvm0hp0tdq6qu79llbka8o8keotheg3otsv2quxdq00rv75ybf0e5lwgocxcae2u0qby3deu50uljbkzzy7o',
                parameterName: '7vaf7qfb3x835yy08bac4oq27t0tz46a440en2lr3cpdhllvhutnf6nygfsqmqd7ye4g8owa36rzk0f6wachjy8d1letboflicbjtky7n7pcxx4c8oikk6gcz7nkw9dax4om8vs45zgdz4m3l724639yvj2f41iw6djuzkmzwx3uw25xbjpz4y0dj8faqgu9ced63jm8c3suus73w4eqtppzuhyj4vuhqrlymyqhaptu5k36rxsroxj29oqvepoclt0sig11arrw9qf47vh7wbs8hlpe54059w8l5nbrwrv5agqht82jwjuon6tnjk6v',
                parameterValue: 'ema6fl6m4js6ys3l39kbn2i5ha56dmo17wwrtenowcyuzhx6flp3zaqdgi0rim6lv9auojt5n9qrgzgj5rtuqgzjl96m7p0tcqm99fpqb5ub4oeikk9sye1o90jakra8unugh22pv5amirj73j96yg32xr086idl55regzpdt9ojsbmaipqi7v4ih3qfbnlk3qy2j8pfx3717r5ylti9554yd9vgdebeels86uu7dfey0rfzr30jdp00pwaryejomdrwdsikxdhr8khh1tywif0txhvbxqw1483r9ickm8be6dnbo7iqxnsfw2v564bj65au6edwik4b0xlq8d7e8nfsklxv6cddy53x6rl58o4r1t3n2jmllfbbfuarnzdejow0c6kcxel1zsp6qigb58ywby1j2tl6iivu3gagp7jffehlra1ldenpjztn3bcantepqart9gp9wok5wvxl853denzm077o13h6bzyx0h575bzlkeokvxis5d8s3utlk3syogy00xgex5gj13yzc99a6xwuhvu9rds0qeznb9sx7zgwsr74x64rzfo2nhck0ayzhwsnmgpqdjzsmt2f6afmcox92b9y6xvptgvs2ca0tfc3k8p4cjh4doytw93ia2p2t0e21bzb211tidtoppo8fb8f7kaug3jqg63o1a2bk9zsewez4h3l1mtwndnrrmvqyaotfio25926vuncewjth2p4sp0y9ui6twpgxj94qbv3pffla3ehbkm5m8bh2mlvqf7jnqpxf80jdorhnsgf8jbrdadqbxk9gi50ckfevp3qlghklvtup4a6kogpeuoaf2icb22qt33h3mtuigj5uwt4fs1qaoffv878ac3qekxmbbachxcsutq83l3jgw1hkurwolxigce9cv4zeip0y1moc2uc160tp70flxin3r2v89zvez35aseli2776b6o45azwzw2280p7xz3aql5qrhlcjq2a1f8tyt5zut1c7xh4ine2etmz3rabhdy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'j6lhkkiglsn3u7ejwb2j',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'p2w3ex7b3xcfkuio6l0gcq9j8dbefg66eizne8gcyzf7po1qi57sq3zq7oxjj6lfjlue3w398d6z4n1y9n8utgmql13f95045qlb6jvouig866tvt2nyqwoiyr061rzztvn7t02egr14a6j0nq2sm7txcjb00ahx',
                channelComponent: '6j7438hs3gs0amqv3z07xtotgs89i836t3xvy0mnjpyjbae3gareulhdf9h8pdqsmhalpjdhhw1z0ikl8tgfoac6oic8y5i6t5126ozsio2z7jtzfp3bcmgex1bjae3dgeesursou6l0x7xp6no244u4pkbuxwbl',
                channelName: 'i861pyv6zc3nxndbn7k6ynsaog40lsy6g4e44hi5wlc0r8l35gz2xlisap8r3a3zad44ak5qj5s56pghrdarf42do6vqsl1xe5zwyditvqbkh5qb54thboi9x5sr6rfv7mw5ivbatjzilrstnpp6q4wz96nk2w2e',
                flowParty: 'dpkq8fncva3lm04z92jkvo0nxrat4b26rt72pz249a2dv6923xv6rp0y0v8og7tdo7u3seiv7h9z2ahplvpb4e5pdrufuf3itxbku2nvy32g1twgf6un2klnc024lzufr9p32zubw9lg6ojqi4w5f00wx5w2t562',
                flowComponent: '88oe2qk2n3zfq6x2rk7cmi0zj7bsmfj4t9ujtlhgv477ts36l0vwwnp1k6faennh31xjuzgml78f5hl789i2tfsa7iwhyxdxuac7uci1qp982o0hvuzixuiuahfl942cyhpsltia5gm79cg2p2kkzy2p6hzkh6h1',
                
                flowInterfaceNamespace: '6ji9efyu1qo84p4b97kjzujf1i4toe17dciwgsundkvs6d9mnr7q9wr6u1zayc2s4ts6j6zr6tnz5bwmz9f9yxj3zl47dueim4b2hd9mh6g1kfiqrskdge917ueap24rc3l9rjpdr3ukc9bor75x9ghvs99tnbzh',
                parameterGroup: 'ro4431wxpa6iu36mb8ooeez3q1msydqpvdrua9f5lg9m7q431vykbmvz402h4scyv0zoghizmjmh0ksvkd56dt2meo68liyiq5kl4t16n4n2xufx9e6saefbuy7cm9xxj12vmvyw9bsc5ucb4tj3omgmt2g3ymcf2tzhayikiqjooe1ekjaezk2w13jcqxqkewlkskhe3lfrb5pzyid0yph1xe65t8ll7fpsg8bapvyoc2ul17weo0u8w4mw63y',
                name: 'ccmrkeqlg2ffcurtjkqe7fxs13tx5jc4zp7ilbb8bjy0t1qctglrb1tgddqjnkksu0p2jtjrxe18umv4bj9vje2w7jkw76ewjiclo5nprq0iok9yo1ukcuj514i9a9y75430de1bnpayyl2xt0u3uqz960yhj6x5b0ubheup24vmwb1ptutsjnp3ssjx5634yhgwaibkgwtbef8szcfbw3mhvbej83qktijhmlcjxf5wvbi781giew3dejbkpb6pggoc53ciyzgti55wg7ro7hh8opn57476yms1nmtw7bn3ow8fffevxh64zynho2ux',
                parameterName: 'mvqsyuxpwwqtskldpdgo5d17qbqa8vug4ku49lud9ytvonocyzkjqq08q93vwl6im6xpt9rwf6dopgz35gqfye3dkbn284vf537s8cm8xttqdq1qgv7t421guwjx6apzllyfogy3vtsp5wmh980cdtvszkwzgf91n6e5pyzfcuuyrjbewsj3e36mdu9g7pekal7ehcs58jvt5oudduv7w67aukn8na528qjxdbn642y3tgaiud2yajq0jarawiftj198sp7veaq00bb770j2pov4hgj95o6e0x216dkne4vr8reeyljudg491hh6maos',
                parameterValue: '4lqxqgtrbw9wokdy5bvr6hqhzy443e6th3ljbcbvh52enoce6mcdl8kuq58c81hl7pddnawa7vkc83uce2q544cau9lv4f1sff0ioyb36os4d1lgnfbhgjnuqq2z5cfuc6veickq2a8wrib6t40p97f5z15copulzfgpaa8nz918g104co0v3tdbtt2cibpq9q483vwgjc4sxm7g0a8p9ztom7rhwthbhnrc5t0sx53jsucvigx79lmfmh6v8n8ohdbma6ry36pocg3ywlbp8no5bn61npc5a051essu0kl6bxjqlewnm646fezt7imfjco3z4a7mfs25cl2i9pixnvgi5zf8hxzlxwy0g3b64i7e99jjop6xij9ngykeyfi1pahtlatpxb2395rwg55dykexf5ao2rpooh6wd2fpmuw282ohwu5g653rw7jagnz2uxbef8p8ats195cgs5o8gtyihy9n6o9ifjf5sfdwvx0cfsy69rf4fozkkk0s1oqprk5pv8e4h0slp7x1iya3d27qfdxirahmevl8rx4qlmwcop6cdpap7sp2o7yg5cfswtwsape727iki5scn1x2k63flat7cr75sl1fqv7cc3oiul4o8kei32tcyfi3lwbag8dd6xqb1x4c04j6vrh9pxnha0ybrsxh55jma37xbmbrcn8pibnx64ku7k1c0ea3cs5wvzmgsoafkazycul0x6b1hrwdg66a1vbsss1uypugg04r1k95ywvo4qfbhs92bof4tm9r1a2syr0as305zpuomq9s11v5ycs5byj9x5nrs0dfwnsws7hgv4gaenc14ao0d6pt2z25kq74rd28tmng71v18dol3n5yzlb1j7k06sj4c9dcnvrlfqg3s2l1wuhjidle7zxye4345zesbnpu0njnkyl4g8qzgo3mluqqsjidva7ux2onh7ogmmiglfwhkcl7awnikvmet2a9bxz3ey3fw8ksvmzd8u8a4vubmij3sbim0zmwvdfjur1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'i7vmoivx2cn5xzdiielz',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'y9hh5s0gvc3yo6oyeniywnmmpzzpl4g8kxdb3azcjbr8ggvgt6b83sfxb3lh1dbljqh7czihife4ebjham9sk2g05586vn58fg8w4xqyk215091yb1vr7xpi834yw1wt4v3xdyux9wl9rbuay1o3f41li5gs916g',
                channelComponent: 'djc1xobk2vv7ollvcci9sxpr6m68vcdstpednm8zn234o6xvnxya7mseauf2vhhs7x66juhhw80ilpo509gca4bbc25ar255phuncy4bgalg1812t842oab089yzb7y90b6024isy88ei68h1yg8woo2l2n1aj68',
                channelName: 'if740gumeoptcbbxlkxnkl6rui1g8iweayammea0xmk31550rkz6gpkdc86gvg4ln8q4l4n06f3o7ct3frdmo9oaewprl8eoq9azq29t3x7r0cwr6t3vd4zqe6hq4lv3wswusgfzj6gfef9a8e5ufbb5qqwoc6fi',
                flowParty: 'detuko95yyu1zokwsz0bded7mbh1z5hqepks1o1u7tjpj5spupsiqkam2nsnmtmdvo38xpsdihm2g0q43b4cq9zn7261w2q59xprsax3891ekj6bc86tmygfosbl1pfqb0rnuokctuz32hemg4naqdfs8uw6vy1z',
                flowComponent: '2na3r5ammd9woxe8eec8zzmj28y0yl1u3ipifi9dr6o56uz04byhby765b81u3vvnmszd934v4ph5n0ifttjjmw49794fhdu0xui2n2zberlyzhx3rwlzxcjp7xbs6ma0xx5kmma2cfjw1m7yh0ugnlwd5or6luu',
                flowInterfaceName: 'n6mqhg2xt3ul9l3bepdhrefc2fw4grlcvyarpvcmjyzt5jksygdqofcgdzwog8whwrsdmlkl9vrnjfo462pnupd0i0eijzvedd7y1cqwo1e43nk163jgbox9iiwru6iryu75klqld9enf36u676t9qyk3yrsdjft',
                flowInterfaceNamespace: null,
                parameterGroup: 'fdktlu7qy56kkmfcdrhoow7c499a64zj4yvat3m9ipbfgtof7ntvqzwfr42g9h15nzc1131uahh3m2zvkitztdt4v2srqjayc4mqcrqamail5ai5xtlhj3msma6gwne9fc0qu39rt642i1pundt9xcrrou2dzqag3lmt01od9ydml3xl6zx7laqgsz5benx2yqd7hidgr1xvcssztb7784wa57f0hlfk6yqfuwk09gjtkiqqvfzjw0j8jjoziho',
                name: 'k3yp3f3kckxkmsi1ow9hvxj5yl9bu6nyz6ni91hjf8p05nk55odwhp2n8m8gfhaqkzirqv57ox4esy7hh2r0pi3rxrqcgx8f6mvl8lty7n26lxvfdzqiqp5chq4aydt1f50pdkk5toavsyd7g3vosjmj0q8v8i1tsbdzo4564jsg75g2nuhjg92mgsljd92yzq95yz0u9c6vs3l19e5bol0n3f1zloxd15llj1pvriz2yfnrgzrugosw5cy90ldiorfdtqe3jmk5dxx8916tgjqwjn205f8j2oysxdwnvzpdydcynn25y72z5deuxa68',
                parameterName: 'owvt4k3cb0xrqepcga4ytkwao3w79zqhm3ukdn7q4ml3u2qotusptf8bgw06qbq1niqfzxh3tzvza5nr9ppcvxr27fzapy5jru2j798ppbhthuttpsu0r1hk5iblwqzjqt52jv7erxwnoob4qkv1kcyfmcv1bpuuy1cswcj49h1rbku145bw6wf9tl8ol23wbtfiy2o9wztljxziq2quh9ai1sbf22bfdxau2rz1fwfm0ngw2lv3htk4whzmjy77qt8k5jg13b1744mi8e6g7n23z0xxa9n0w8h3m43fmwp8vontkb8qk70qf16vua7v',
                parameterValue: 'ofheuz5xrgo20qb0gxifvn2bmrjy2mbgf59ki8kfa2skqssowbqe2u1rtw6gkjuvx2p02rlcnygdtls6pdx49modox1ajo6p3lxap3gsd702a5zr00ykeh0hzsldokvul804tsdreewhdaxeqqc3z5j5519aznhy7dxfqh571h7panylazatu9bgkibxxbg6brekb35s4cq5hxvdw5n4zh266m3935zlth779dx18mtn8cvn44kh75hzpmo51fkb9mzmhpl6q522gh5i6krk4zs7u7l1th11aucyfvonv8iqde34ayviqq58b1ods6h69x5jofzk7liteb5sbydnowhn2dk4c1cfjkh3aosoa121k1rccymihlx7gidbbepal0hzdbo2r37w422d54r6qfzul491b0didgbpi74qdg2aovc8atd9kzgt7ggkqnqd46nyeoxqwvag22jijmkjn1xamwmrmbha4ojmkwy8yeqt8kvmj6ceh3q0uaxs6fowe4nnxd6dqocvipkbnr9qv9xfq94jofcqinrn1gg770tshu07wepmcahxq3nuyi54vbcypcrh7tewpduej4ywf801ffb5ya5td5qn80j4kkxpbuqjetz6fh6w621ejk8l02qwv5nhihuz46896tfi2327oveikjnru0aznwkggfstwucoudv144m8wzm694tee7yhk5d406ag34fasbf7f81x9839jbefqcsr1g82x9roserdv9sc5bz8hlekpvsaqolkottzu89vg01im3r5erkzw6g99fytjqy6q5hfeoagp3slfhkzrw93q894inmpooxrbhepqbw0gg1kpciqs0ycxtjmorhh70jvt6vhbz1sbaisuc4il9iwmwhth1gedi0ioxv7hhcieuw0j3vcxu8qs1flfexy0z4tsuzkv5hd5ddvsxk86j5vo4m3f7wwv3pgy2q0ymz2yf3vc7lts8mw72myxe6k7386ddfx05tm9zskui3tjhgmigci2z80',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'mffilv7wp1vzyv4z53jb',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: '2zmjils22unh53t0m5li4pc7wzewsle9xo5swet9ml3b984hoigfcr2eagc305hywzb72wut7dylp5gi2ksur3mmnph8f3whf40qd13lqi7l6y6cfpjtk2wdolr98zwjbed8hx3ts8fq24m0t4wucn6wmtkpwlxd',
                channelComponent: 'ee3e3dzczytze4n2rvms93u3nt4x5zymmm8kvz8101cqlyp96supm9e92w0zvrje32xejg86ar4j07av1w2bfsvq0wk9nyaxtxpuhgjawhns13gp57n11tsw5jck9t7s922vn10u2rwowssv8d12vmimrvtjj26o',
                channelName: 'rz8f0z204o2x6u6l0gla2f09cxvoqpu0mk89qeggsj6q8czomjsjp50a6wl32nn71ssq1z5rwg9e86xv41j0kafw84tf2m71rrqrnsetrq891qjvilitsz04571lvd5kw908tctmhmb52c6xpn24la13nou4y832',
                flowParty: 'wb4gvsxdtb7iez8dstnsafhminb43w4o6ejdten049i6f6owg1powg2f04pdbhg1kc85amg4k5vs7nd4r0z06w8t3w2hehdffm4hp818d4e7l4blr6opeqwdy60jlvhxerlcs9xv1m08nhoblhhfz3euc7blbouz',
                flowComponent: 'vfnywxkumowwv2dixn98th3e94ty5nz0o43t3v8412lsbbjxsakfvkc0saj4zg2pfl2e0jqjbilto4ansvw6kyxgoxhknt82lp30b9i7m9wr4hom5wy6ouz7ojzg31eous87h4ojpndna40tvzy2ibiceyhhypkn',
                flowInterfaceName: 'iyn1kmzbqxj8i3fqajpsffx0bm9vlfuyxafgkn8nid3v0ipgl5vud0hov6wcfc6l73bibr1quobzdex85v4422m5inu0xl94321ieb9r4tcj0qhwnnumgapz1p7fwxzadjuop73yg6l4auv3i0w77e6r4sajjlwu',
                
                parameterGroup: 'pje3u2humcs1torf0dp6xn3526f0yeunjurgeevyrrhdycfh08dp1b9evhqa4apw6kxctzf8rtceb5xi9cgntrkxfzr09aviisxu7x9be9ofkkszylceeh1eunij4dq7qy43xnmm1ksrx7c23qt98lmcs2zg9wcq9g3ghmir4uv9mqm210qdqnr71vghojcuqk8c7jv1ishtotu02pngqyy0vvhattujubmi77fg83dxjsscgml6a8uvz0qips3',
                name: 's5dim963zlkhrde4k5gzzc20372uniwz08tojqovkpmkl349y5acgua8q6s1gmke8xbzorx8dll6jovye2r0mg9j544xi7rnf5m0p5v2xwd1ir49shupxluwiw3o6dgbfnqn71a45b708yip1672rb95mfc4kegi6y93w01udrfhxynje64e9vev16nfgeno15hltp6pfrtoocq5q673qiz59t7fdpaf8o7amm2gnpmj6w5zanr1vjy6y5znig4oc2fy2plcpxq0kfepe6pgdcxynk22o8u5cfgv2yzhjqexfylw51fs5mozv302ybkv',
                parameterName: '7a1q2ocgwymd08nl0y65rrqn4i1d5gow5u5hznfwk6pa3xwulwi483df9l3pkos77gt6574fzt3vk0cesg2k587pff7xlggotv5tw2cq6nqyzj3q67s6x6cvujqjyuralfewan7qbhmmruzeijm5k0hwjtngkd97gkid646tb3yj0hkav4tgfox617wqqjroxrjkwaphp4jpkthfryv4oo1k4iofrf5fs5wfdz5kimun87mcs622m2h10inpe1xrmfp6w6r0ttowuosgz2jy33y6hu0xbxnad1qu2vxhlzegzpbxj8x7fojzbr0j0qa9',
                parameterValue: 'sg98fkwknae064oa3xb0ktf7wjuqnerkss71elu6hr882gf1hqgr0pbujq4ka1zd1x01s97yu0f6bdzzo65wskp5skqoyzdp2ukz69l6utjkgxrlvidvjpaspfmlej1wco926uzwi1a0ssw2fd8rk457w7fjyb76z938zhbz83soky9qrqtx6wd4d71fuw30fp08np9ra8m2eso797tjctkwd9bh7ydyhl0vshf9zt65tdz2shvdr3b6uou97wfywi8z87skvq5v9275cfhg0nitaloh3m5l9wbbkyjulklvlewhglri08qkj54869wyivju2v8fi2hu3pzrv07nhsr13zv848ntelzkvpetlmg1kxv088z12utae7mozu700i6o52ujegeaqpq8v1puotlegsny6c6hn2w991vewhzs7apcg5apzclo21hnu1l8jhikafxgt3416u346vl321b3j4gr0yi3gl96wtew610sy6j9eonh9nvkg4brrvggj7hlvh4m6ffj7n8sp5esexrt0cxhysr4dh8h83fvyshkiw45bxic5o1d3osg820koq93dww8u74ks98o647hjjrjk57zjw9lb5vf2xxlsxayvugs03b2jeognm35rl117ojtciai3zqpubxc9h10spaycd4wsffvu4lji55cpnksxsktvbl7u1hnhdl57akf5d7cjllc86jmty6jic6qa222txfy6t4j0c7o3w2wbwc5ttc03muxjk11ebczg2pp4l9ukleachrwlblimw30yda6ddb8ada5q1benip2fxy01xhsi2aik7k1u4fync8gu1d76t5fpxfh10k8wm3hynoq09mxiqze4xwqs8l48v4h3vbiar3igpow3ukpoj8ij6s3kthcq5czo2v7nbur8gmfx4xzyuxzbfuhop0vj1xfn2syvgz8bgrgmxe48m2coc2icajbjdgc78s3lzizypx2xfb1z48heixvei45tz2zj98vj5fde3rsj74mwlbf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'i2ndzok4ksma31zsxbg0svf4yb200pyaxtqje',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: '5b54dtxbprm4y1nc3e1q',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'zp5d1nqlgp076pl8419margif7mm4b00fgrl3ekq8zp0qy7ea6afcxvr2mtqiww66pgyngixp386ykirvpatckxab1wgvhbxevv93op2nk9zgt09o4zn1qef0jrotm2fovupz3m7b582e9sowmgt9ry22jrcki0q',
                channelComponent: 'fhllbvfuhuh2527sx0fiyiecuwb3box185az3nrstjmo49mkz1e9huec5x6kej5xqz82aikb3o0xwjg2ar6wk6rar8no1dfgnj42mz3glcn0r2gdjio2ng98ysgv9q496aivmvlq770g1oe5v2cr15vb8mbv9b1g',
                channelName: '9otkdgd105moggso9rl1m6v6xr9j6x0qnavb3rl51v4wwgmea8irhk55rdmcxpezqa272f0tywos5u5xf07o5kyhniz5lqljug5xebxg02cfck8yz87bzt5pdel8iou3du0b8x8c4n4ynn7y1s14ifn3ru18enn6',
                flowParty: 'f1v8bxtacenh76pefh6omwxcjllxbtn5vv3bmpghhwn7yiegez3g5e0dep4zg71bxv6ren0rdi31fig904fksmiav82hj2mnfriuxh25f0066gbzt3g9uehcc79nliv2k38unjif9ogs1tinrkn58oemx3ef80le',
                flowComponent: '7nnm10tmy8jjenlqdg1lnjlrafgvv82j65qqjokxyidcfedempxwmqynzfr9j3hvjbiibp65m0igzuiirb1qll9hxgpc9o19a8rxl4n0cztq4qajnfu5uw4ekg1cwtdh4wbl8xh2uhtsseh8969eciijlmeq8adc',
                flowInterfaceName: 'yj5fjzuf7o6ob3qoqdxbcn0rt4llhvdj7yys4zdizgj33kikb69zfljwozycrtk52fb3dmf331rfvxx26rqgfz2can5b1xykzqg3cbflacik7ht4i5krlhs8onhgtpjb0z6j2xm06wh42qmz2sldkr7ityt7adv1',
                flowInterfaceNamespace: 'jvpj197mshggpe4zauoqbk5tad32pctiozp0f5w8wwxdgji48u6xfk5z2f26bt8uspe0xh1fts9ai2wfwsmvdzx7ptguqq4nzdbmblo9obvwfyqznhsr4a78z9zb05innm24pn3b2znhvwncbk60gjlp0ysd1ffu',
                parameterGroup: 'ihbpkkn4rdg1isp97kdadty3fqtlie744g8i0z03d98qt1ow1p9pvpd3950z5xahxkry4pgmt8srh3vjdn8voq2vevpff424e3oxtdry2osv8usjni9mfx5nyefkezvv1ps6ab91yf34x7sv10tmjiphgt91mgp8h6zletq53132t2oxozgul0v2ov6lo9uvsr3giau06tuxaujh922znnj5ej4k5do2a4rm64xtvc3wlkzhdhbo9wuvblkfldt',
                name: '01u1sjruotsgjxjcwxvy5eml82tnph13tyo4enqfmmd04jjrch9htm39ufycuohsr8rqmqkofrkeq4i6wq3k1tmwklei5aeovfek5j70pah86tse5gi5ni5za38thehruzaxlwa38xpj5to36jbjx1cctp6jgcp8o3e8qwyin8cnh91drfg5et1bwacdqqqq4d7svlcsjijvtc9jjmz3jlrw2a5rpakt10gy2wxs8twqalu9d2c6hgplhsy1ks1iv1rv19p5ygginx80lkzi6kdsht95psu6tsktt5io56pi369c5dlx8cahmqudowg2',
                parameterName: 'o95v26cur3g023apu7nj5ceybnmi3ao4ayojm2bcp63fefh496614gxn5xr1o9osgnnaf4ed594k87z91fj4tenzukhi37dhmobzzwo8nqlxr2g8ou7tay2v41tktrj645qygjrnegjqyucolbr83ny6c2znb8yp3k9n4mfc74oriorkwera811suf89auygt2x34svmc5u3thr9r8m8x0gjqqsuolhx8nni1ni3e4cb8h165so1wagmpbeyro7uiyhl9ci6xofa15u9k85ywos8boejuh748hnwq21cef35hylzqlf36nwwpx8ky1sr',
                parameterValue: '3mehd0me91bkwc4tqrpbpe1getja3qsxsxf4qc3tm9ur0miu7194bu7yht8xo8xzlnm4ebugu7qdpkxk2eulh6o0hgbwi0pxzur2nqghduoj4hxkjuzf7ymkmg0pps884q4cqyt554z3w0a05b1ctlgu6ri44oaz80zh1xx4qcztsk9fbi2kqj9j16qqgu8xbcfqz7pz8tcduq1tny7nch8ztzm8d4nls1ulszru6g0o358vit11wozu4e66i1yoc6sdpzkg6awh34pneruhur7tfwm7rfyzju9w2zdxz6r7vnsyyjz46wrml5cdjdacf1r00kwzdodv2l5pu2a52wx0k40tgiuwagirp84okxzd55muyffn2bgeb5um4tpvhb6risnt27yapeb72lwutzgimrtxdmdj8b3xg80dkyb3pv59g1ref1n6t9xz2i3otz3xs7wgq83g3dkmqip6lwj7i5ywyhunrb90mpolx5uhqzcg4hvotr2uclvsbfnmg0210siir46jktstzp5ocqqmzkx4ner6b9niya7v89fcdi61iw9biavq90lu11ejzte1ilfp8kcn0yowfa29nqtlrnqo44hao5tsska7qx5132ytjhzezgwoiefjz1xzy09vb1jzv7zzhgka7xrxn2tcxb6x02zslms5dn36di3sv9sicnc2wu5jjz3rx5jsmg5ytwtlp71dmg88f890bk67w30ku8c5h5pf6u85uztq07hj5ae1ba7exlcvxnvifu6pgxwywmyqwxvj4ynkrl4mhke8q20ygknim9hk1b6gsc0w970ggjeuxhyuk7jjwd29xvl74y4lskcj2ebk3aj63w97lcym0w8xklyfmabb75e1mvmsoefvumz21kbqbioxtlytf9yaqb4bxre29pogap28mrr2afbwzxitmy8dileti392j4exyv0ieqrltbwdfsqr9cee3qcr3kjotz1pzxms3dj27t17yu27f0cvrv9e7j82wco62lt8l234',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: 'j2vqyy33ydnljgzczenjyzqqsc0zosv8ym9qo',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: '5a7el9tspxxbsbz1s00h',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'wywfolz675sjylxfyxb50tigsoaw71dy0e68z0ic4tgeg153amvfhkv14ddz9o2xe7xahju9l2ia4egj1ym08maqz7lcafcadzc73rnva86w2f7zjwtkaw0sxf14k65ytrau1l4pn14axrzs02vre43gim87ytno',
                channelComponent: 'j3157ra2zek7i34232xoh78tapld3a1xzjk6af4v5sy083e82vh9o31xc2ilww348i6774elgl0149zmrtyj0aeqnmapphoo994wodak34c72jbnohj8hkqhde1oueaf7ce0a3yvujg1ujy4i2lah6q4bp9y4na3',
                channelName: '4n39j0f2umpv4svstxjremltnktbmpve3yocwjwn5ac3ry38e326kp5eii6neuzne4yxrj1ddi0pxflxn275nmujkuhc3yl90vyzvvbe9c0jzl3m81ozbl0d6dlmyasd6dzcczsh1megwa7hg56esq6frx8if67g',
                flowParty: 'd5qkjj6hua0c3f4106npsdm5gewp9aj6enzhe6eg7j8b9jfkh7njge8hm2yeh4it2zlnsl2uat4ogcwhky477bkqmy9mcl2jiikci201h85a780k1jns2hj5vhd3iowix019wn93x2sfd89lg7jlzcydsu99ys0x',
                flowComponent: 'szqb69e38iqhn4l0teiijmjugj2fvmvkwnpvnnywjkoaxd0kviy3sq1ioerdnsqhesk11vynfu1vmv5ve3406psvt9tp4qdxta9wo7n8wkicxl9jyg2enzkswo620m8qy5ub4jaiv57ram6vhq2xf2o4lwz1b184',
                flowInterfaceName: '74f85n1sq25td5bzgiyos3e0ze0tp2bho4bfwhzqrko4i4we1pmwqr7re95nuqjkimxqw48wd7l49i0so77hq91vcvp9exl6zemnhwvjud83l5acshcj5aumqg9ed1fb09pz5ykmk4sl490f4fn0knv1omohg8a7',
                flowInterfaceNamespace: 'z0s5ncgq88mfw0u5ynvespymfghdhtw1ahcqua0iwfqzznf7eccgjdt2fkmnnrdgznmbhlqvwyc4ji4u2avony8nsavv73fxybfzn277r8oamc7xivngrk3tjtv904huh3xmleuq1ffu3x7sce4mdu4yv8jex8im',
                parameterGroup: 'o87h47ts0179satw0dhoa6q7xdhhcll072am6wsmd1qux3dv23p2ia51i1fcejitkjtqwgfmqfoolslq1cuqjsocftd7ad7l6rxowiptf1mj92k3dhczzsid92ifgu60rqo0eh9k2axcs3nmsc5q161yuukodl79x75h7skdlcqk0tyncadbmc7vt8mjzg57qrzredab49x2fa07fltaaybpwp8mr847ge0noqknx3h4wxom5tg5tnhpn30amr5',
                name: 'sjkrl2kusurf2cktcw035quv498eq2pjpid3kvmskgypuhz30oj1n1kx8kyvo1osa02ko645joidgmtivcwgytg5k6tz5z3f3oazcnu8gr1yon1ulgl56gnrt01yat9b2e7l8unr2g0rbv4kxhqxrdw5dhvl89q5u45qvj2aa2nstq284av25urgifzt1bbr1lso07yblxfbvjy67sl894b1blwcvhiiq1ul357a9rdfxtvu8ja0qmwf3tvtkagufrdwxpjy9ixigzs71bnfwnjkutgd8itzfe2zriiuzplpy0ugpqkgqoxwp6rszhq9',
                parameterName: 'o10jl1jd9f5cvpx7afql0wus2lrasteg9pa2xj2jm59p80p221sj06m8c60jjo4a7mrb595mlzpolrnousrqmgxo5hc8k61jsbyy5jrn3uzj6wbrn7bezu9jsxnzt7rhzo4wat0qua1rvez1z9a2ixupiqq002xxki74bizfx41fcor67b5z5nxo3tb7oskm7nvg4tcwzyyhdi7oz2wy07nuin8guczft169m9krtiqje1xp75wf16y4guu3qlf5huppr92u0df0067hu743048zk3mfw7uj7u4cj9cny6dql3t8byloo8tscgvwc244',
                parameterValue: 'z0a0ppckm109n8v37ml1gx3i1fz8mavc7ia04t80zrjwjm93n0rmockua0tkn1uuahpz1ivo9kgu4cyu6ezf1w8lbags941aqujlwiadagvvvm9w5rsngoy3ntlhbm9b1ccam2bhcnf4h7zpniipg9dfanwrr18xyp5isi6yp2g1d4eraejcsr7qlqd963taei36h3vu2bzcu0fmdqt1fyec0qrro7p00l8m4jgrajezklbnexxx94qi6wfg6bsaukm42jz89tsksyx1uuf37jj5jn7fzwjawt9itrgpqkwxxgq8su37fczx2f2no6u20o1b1m6btd1s17rm0atu1qqpxcfkdxdxj3jy8l58nhgjkzjlogqyd6mdqv66vsrl8ci43l0f4hh9ihv26ktgbv2t1jhocyjt101ee0rk5keihm635ydkuklhz4dgqujqxn9vb2z5oozt55nl6knlv3y48jcfn1e22ebjrbalzphn7snn98mwl3a0iyzdxcmxhefzhqtt20dahejgalz67deciogb3ui50vyfecqj9v0v2o2mxwwane69c1iex8gs8xkhseuy2v20xvc78jnbtbgzap2vz1zh201snhybvf6i5hdvr50x6nishjgt6132xelv15sn52ln4esjqh6k2m2j3xpi2ltq8c2gpwik0mnigeg477n4fw18i109utdl08i3esunj983fzn9o06ljo7q3hzk2elggz02fxjhse2io20gro9h4o0s5mfke5yvscyeldu66ir9jdzzp65t1pyrsaolovqk9p34dgqxlk505a47lm5f5vxpsdk139n8bdxq2ml2xpo8x5yucg7hjdpsaq8psg48xgh0zkohg38fhyyf9p84dr912ljey1rsfxstesi2gsyrgrh3gsbe59suoou7qcvssd78mhr8sl1a6ehfi1sfbyl1yjs9qyd2qy8ugkvd45a5o0gqv4us5mngwgfrmbojek15gno6smf54qt8x42s2r24pst6agti',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'vjd43y4fqrp0zb3b2oiwlwylqypjpoupin810',
                systemName: '78c5ryx780ww41mgi2zc',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: '08kfc7k3873fxy9doz88xvy7ae8vthrhnemegxc5djiv41qbn8v6kxpoo8ung28bnflp2i4dw94c7wyd8j8blygahk4ys6m1py0vm3p8v1m5vtvidclhcd6veo46201zyolxu9s49guxlesybi1afyzayh7wv4o9',
                channelComponent: 'u4mtz6pwh97kl906ef8hzdtf0wq5x6icnnvkii5ko01t9w8wixe8fk2nvwukszteps563uu9lr12wm52p3f6zz9g15v3sxx45r1t1gfs9h5bz9t0gd75hom9az8i0hpkifa6r7icacpn8pmt445osly2gli77tfk',
                channelName: 'fihyr9zdkkz1ug3mlbl45qwyrvk6vw1bxxfg7vkz7yruuiqh447p7aizb272zrln76jc9wmp5w152fuwwek68mr386dcxfdznvpa5m7bzv0odu5q7bigsj9e445rjp29hqlx2qke7ng5l4ejtetiiztf84ig8cxa',
                flowParty: 'v33jsaa2pcgiugcpr8pmdrjo7rkbmrd9d0ynyolybrzb819ndornonkdjx0oalgitx0yknk0uby7eud5fbzijir8rqv2pig9akppltajgsvi6ilrprhsfritglbth01dojdj8q9cnjl4nuithd48u6dyyi2khlrv',
                flowComponent: '26g1eyqnzwki7uxruva2n88qko8ipmw2703iyz506jbmxaypdsu5bi4zktil8ngsxccb0n9isghudx6p455o4h7qnqre28w4uxr672z1ylnpx17bg0xa0ofj5kfqd8fdzixgr7m4rnsc1w6vaq92eblfbvix3b0j',
                flowInterfaceName: 'lfbsootahdtt22eh64avxvh1nkzei3de5i24rfgyvd93u06x30fhjng42bhfj1ftb1chul1tn49w5oqn76gz9qgfjav4ysbqi3yhbtzs9gci1cfyvn0s1srshb9i53xr6o5csu6fkn85vr4lv201dy1uqomvn3hr',
                flowInterfaceNamespace: 'ptavqbbwngi0u7eecazi35e8teu3oyey9znsnveivjdd24rlohtw4ia3jhclioauwbk0h37wevzalotabn40vikokt3ve96noqu71646hrwr9iv20srwi5t2y6tqchkx3s2v423jt19x6di9i3d2cisaq7i22ciq',
                parameterGroup: 'nq1zgf2jddzkc8axhlvmxwtsxf2tsfvfr71jgve8uc673kng2f3d7v9axg6n4o6zsilzzy0o2v0r3w0xmgjpo6t23223h8mrfzq9vzn0woktdkiokhi2zdltcf61jnhikmuy9evmzlieobjs2pjg07ipfzghpmj0wetwogf5b9702kbvfa9hws78dejkavexeuhx2l9g48m33d5qbh53pzvbeg22jsgon1jfpck7j260fdmmx88gwwe88fejkdq',
                name: '8l4lkvdk7bflf4ck3n0fy28obqxcrw94triagoxqhn0oax7frv3pfm1qn14lk9gtlbzs6ee2967zq8l03zq6o564wty5qzqspitk6axqdr9102t5isros048r4gibmkf9jylpj5u043m1fnfz39y0ickqzcr2syxk181dx8ibrmz6qpyeilthb3zxqap7sabg5v1976xqw8z6rme69jxzzrdcz5zbnnvgwbkjnipp4pogl1ctkn96znnw3pcx6clmz43s5thofwh89ul02yl3ugoxh23wb4prpdvssrdibxrunyqx1fm30vctgz8nldx',
                parameterName: '64ho5npf9q0ziupeb9a5j35722tqyfh7ropedxs8koxjg8q6ifzty9p7s1pflx4r2z2rm4wo2j0474t680nmhx50y3rwe62zo6xlfovmi11b0zujsqxkjdbq7wtjd28kbj72y7xwq2ilfh4qlv3qgl1wixe0r8pskp8es4xt9v1d366wovtxxf8fzkgb53srqi5odjyi84bwfs05ol040mbjyo5xl29qiijtftqsutln03o0s9s6vdpajibdlxb8b90yzggyfqrr9bwo05hbigzj6hsonzdz4u1z3bp0b194ogbczboky2nfboyizbfe',
                parameterValue: '2iijutqugaebkcap6rbo2l30k3igxlvz263l08ymdbuvd3ekrtlxvpvy0uq12wk4x5nanilchvfo1bjrf9p4wjj8min6ecvecabzzr39y7uchoxiydftjikasv05uyo893netm25tloa5wwr68itj0kchir3u3tbw0aiioxaiyakuy3wbhxc5dafpahjnpcx9wykja35ztaxkpxyu2b17lbxtw20yzisryxqzaglu1v7zfi1fo3ffzoy4s99ev0gru5e73yth2jj9uz1mtmqz6e32x4ic5im2s70i073k65k9us6xvr5hm99pwq5luq9065y1li5fhkvmhs2h7hmiwjg6u53ljba032353axwn29966re6c78fuady77bimx1pn40ucja2pic88xdnncj330esqc17b40y3ir1t2xnxg64sgxultpcd6270exrrnluefjuu00qiod8t027unuk3mjvvpynfcmzbfzjr1jljrsup6r1yjy0z9fae89e8idhjszdagyibdh276zvmk34dyd5772expsfp1il4sd1k6yzwpz5a6wp4xdbc7nvmjo6eda4lr20l1lnqipaz2b14w75w7gu6nx7yqvjbw27cs7xls13t2qt223hxwdet1zo8rlf5vs1unb7ws87z9o7ml0gmyunytmexupwg91ztp0kffzpjbpbg9zzp7mwsn3b3dfrxjhhnl948w8iu4d2pigexrdrm2sonxv0oinrf83vkredz1qa6j08ygiw5dcbjx98d9xvpu0pkv36eecqgyt2idcel6wzvmyttn5658gkw2qltz9s2ptsvkycl49xbujkbmio5ahznqklto3afum2u40drhll4ty47jl8gqjwptjydm8id5018nzbdwtfk1ognwo409h9zdbxqamxgmc7mezybxc7zeea9vh2jh8c14wsskq8y9k491m6g08forog1ykibngkridhv1pf40pxbpg07jbd1g2ocqoxklaefuqfvyqguofrxx24w8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: '3eqgkuwnun07qnwplsjs',
                channelId: 'y08qlprmk6ugxzjpj3aiwokzdean617tb1fmv',
                channelParty: 'q7u7kzx7zemy720p2me1trvm94unosi0s04iw5poaar7uxuhbyuag179h9tqm0an3o6jy00n3sx4tp269k3a6t7fq4ep09h5afo11f32xyqzc36359odypq3krdprluxe85h52z5fjo1tc8j86q1zurnkm2qczn2',
                channelComponent: 'izi9ekbk2tq7sagm68qzsm0rdxcsbfj6b8qe56ndwm0ar4lj4r5wnfa08qc2e9iq4cypflm6y6frcdv3g6phtoaire4aolek3o0p0wmo6kva6ixdyd6ix8g13ip52bcncdsghv6ggt4xo4d8k07x6sxror0odtrr',
                channelName: 'y8ph323xbw16n8mrmuiesmsqhpzhfil7lwuzxbsxo95hagpguopvu0j2xs4f0ezfzd9yotzvnux790ovi06yln83ntdb2m0ywgtfxyizcg1oaofwoo971jd3t0j38tqwtvyv98qr8aasvn1lvgxwjctfcxtclvd2',
                flowParty: 'lkjlo7ukzgp9fx0u3u44oj8voxgr9qutdvsbdpag29tpvyc06d2t4ebtlhcs272qrw6bmdahvceb20jh8qbjbka3uh4hbnhyhldl32g4fuath6akdusbsax8tasg2inlczbu66k2k1rt6areo2g0he3in7wpc4a4',
                flowComponent: '0wtfze79my09udn9lzf4qarrw2p2huubflvhnvt863r8qir2ufwv1bike2k589v5f4cmkruruvp5p0n3xpcs5p2gvk2vdeo9v9fn0w3dkumifizxtwbli4m8a100evolxq32ih3w57l77j6vvzy3nk51s6m2styt',
                flowInterfaceName: '70k9qoyopmjboqgk34cupru04ffoca1md93c4vhblncg2dtdj2duz9geq4tkbgzrk932qooswjtuij2j2e546sbw4r0igrhhla5o6v10r3rvjz3m0bj8jbxf1pme7rz528q5b4te0rz6tgkm3dvb11vdgz00d2za',
                flowInterfaceNamespace: 'xfoye2vc5o0f9in93gzcjvu0tsmxgvw5buawur61hckjvkb6pbzz941o4ci852x940umas6d1gko56igfzimpfgjzsa4nv0g3t0qr5phsoc8kimvw3o1iwe1m3h9i98qtdr4k3ibstqf45l01y08blwhscmjou9r',
                parameterGroup: 'gigfhrn1bl1yaicovcmqxl9loepm08mmpdlx3ccoh7sfpgv93y8flhufbkbscp8j31anmzjlmxb154go3lrkcculoew4va2dmvxuhy3f3toey9h2tq84xbvx6cippdurd0eq726yex3c198nbfnrn8mbtn06rry2dwbeif6o3b3dnoata0url22y3wuq37iy8cjb6l4fklpssevbfmqg5mhoz0ffm1zyr71luerdx41e05ehrs70jtkal4ndlrn',
                name: 's7sot8xenczsuxyjyz9iflq1zc6tnh5ylyvem52bktvhfe5kumztgjouvrok7e1ailla1xzxansxrow3tip7518uv2zzmns15xrc1u0ynlq6ie3cb0vn0w1nd55shj8vdwquu5i9b9w2n6bgwh2m9xqqjqwnm44a1qqmxdln6e06nszim7s9eo2ee0wpdpfkj30hld6d238levupshlj7erg13qidtm3ja3vkeiq7l3bqyrt0lb90e1l8hip4o2yk72vhu9c2rw625rbiwut89a1f4a0s6a0cj3hut7qrr0487q75aczvcrvpurqtudr',
                parameterName: 'jzqz8ig45s6mitcerhd0eplk2lyqkwtbylizw3akdo8n23ruf4860ivvk96bbnjw4fzw4uost5tgqorr9h0d7d39zc6c0m93kz7y966j8lyvcw3bpf73qk56cpmp2e83lmyd2go1265swob1ysh0ohtxnilf5lzqdfjsr4c9xzuhh2fb35fbozbjn90zaisiwrmxvaizj0miifox2fh0mbrytuotcoa7f5vw1y9ib9qycuqgfg7jxnguwghhxh5nqhwij9u3k3jwpo1phczrix65ducwhlr9vz65dss7p1cq7rl9gvxln5gmqm0lcomt',
                parameterValue: 'ddfh0dtbels4421oqnzwchj9ruc5xbnddorj1uhtyebxu4vidmo5jpjjuqads3wsdvk9wpusldixho9gmkn6bvj56x00nsqm3nuordmg8cpgq0qs0115hc2k99x6seguqkr1kzco5opnz7f11bmeu5xc1t3ame087hkyh9xh8o9fzcy7jm97l4756lf6edqx9toh0s6sx7dcyar06bc7zlpnihlucwihgmi7qifye4drl35f3deyguttojmzuffbem2mm3whnoo046stx7kzrxspvhu2cjxdfxd7gtv3rkqid3mrrf1vvifejt5xflvsz6uwd1hazrcc2xuqq41d1t7oanf4wbxdhjjakkignev5i98dnci0d4242a9n8iw1kot5yjvlqmjt1e8o048s9iha5oj1mwb7au3vlf8lrmew764rxm9nebjmwg1eag5fqbyao5fzucja9iwn20l7qcw42n8dtedczdv49bvh8be2kl0av3a54a0d3spobiscs6m1dnzu7vdqaoz9b17za7ti87t5bwz0lbe72aw897zubgqdefgow03of2i4vz3rllfp8cutnlfypd0ioukqy2k3oim56kz53w8niq25yzyq0tzhhkfykhzuwk0hmlfcoaod1przu2ezmjqboqcv54a2l6tzjfo6urm7r1pa7xm21720mdbfyyd39n8ihlsvmbduf4wzs1wwypamex0sfmnqp57b8ti2jrsorjvfrgn767an675q4gynt86c5vtj0mp0f4sx9la7sczsbn2cnt5ey26vw335j17tmunqbpkcuqsogxhkvl7cvcpy0iu7wglkx4i7vrdrwu2f2mltuzelekot9jpv6slvq98df4ite3orkos1nw9427xwzn9rj7alf32uucggn41ivgk72n1vdfi8nsxkzwpeo1xofibiiru80fojaf2jrydh97psygq8wb9lqgvox5km9i7pg5pb3h912jgfz9etn6ljh62kghu3c9qzw3z0cxnk6e4q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'fiz45dup5jp6vm7avrjd4',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: '90tptt3axh4ak27oo5mf9srcio88cp8xck4m3dys6wxbefmg5t787mrbtwccr900sdvc3qnswbwodstx64cksp8l5zmidbdlxr6agwp4eqj1t5z7d7ie6mt7uh43jdcvxy64y9eg441oo5r9nzh0nh7l1njse85j',
                channelComponent: 'ga903jiza6o0uwzmfjc1ui2fqarktr905x44ezbgttlwft9nqqq5gug4h4iw5tb4uvw98pnv6bvhoyb7ka9ub8w734r15fwucyvuz9t5qjpgudxqecc6816uvateevpfe499upbd0gvvtoy85i0w3zqd1zxbyi38',
                channelName: 'c0qdngnl01azoz100y6b7q1s0w87yi1gyd680w8sl5b4d8u8jl61g3f2ym3o58x4no982mr4bgutsbocusq84zwr8prrikp0kmolw4g8nuro93duyms3mlin27tvqvl2hc1b1ls6xd2oiz42il73v9v8tnwj8wht',
                flowParty: 'cau0lrvf5iq1rkxcgdmh786fjsq0s5u0dcdwmafq1swa84pcdchydhazbmg9jo8lq4i5bqca31f9a9qcqpcqlgcbuvlhau1bh68mq7unxm1icxtpd8knikzlp6fb03mdzg9edf20ysb18p8takvcguufui62bsuw',
                flowComponent: 'bzjcmtfwljt0i3ihxczglvrlx1uz5qztaapwlrg8crodho5dhg9zwzsi9hlp1sbjguc8xjyy9qn8l80d5r8avu1jvilsm76j4gxmwrfeumz29tsubprgre45b568xj8tdcav038f6cahxe662425hke24n55qvjb',
                flowInterfaceName: 'b4vetbf4ypce60ufwz0op2tzlr4gtck8bq78rvxua79a9hz7iuqdm4tl98qijwszb97vx279e919i6yp8mtkgkl39li33cckp5xuol8mm8ra5nzu7prjua20outg284bmwsgzgpkd350ii6l8pj15fwpukn1zxpl',
                flowInterfaceNamespace: '59ihy3tsiz1xf72t09xico8c139g6vodh2ejnafi81u7dsryywptq9b9ldcwnvylf3agb8f3c5twcussgjslaag0riuimvwgpa9mpjvowd6jqsrr9x1ykhppsjg3ttrppdjmwqjbewvl4ek94uuxmmunc0l4krwm',
                parameterGroup: 'bxgyhyr741de98iwte1e1zjqpdw3sv3fq1v7coroboyt6shbhty1sdlpjjchcuoztajtmofgek271z5dcdjisk1afv5utjvv9cvh61zrxckcogj3vjtzavwa9y6sym9brahmbf41sk7c86wyxe6zwyfccvo4z5vkgn1m1sejvh0sm3gj1v8u24qe4phlh1jtv13lb44zr5ijft90cnqx5pjpb82w1oehydz0d6wyjdabtclfw98iaqxfp45ve5v',
                name: '5i516iz45ojomnbljsocvsn39zc75w9ey0b8rzdh9nfsjtx95y60mgmwv38vhkqr0gcsc05dp0yneayzucabek1vrbvmxcfe6gws6iy77k3nylucxlu77ivvhkktmdy3muzc3s2ktt8jqtmfeq7ss1zv9m8wqkqkd8n35eeba0ee8sgclnifk5lho7g3q4isql5q20ul3urw0w38tk7r59k2t41cj5g2azisd37vp04duvwlc5qhn92oc5018hf2nu83xtsdd6wril712o85qqmbmf1p9oj389rivi4ky9nt31zdeh02iu2j5xzz7c3i',
                parameterName: '43zx5vhpkli11hoecwi5ug38oxl292qqmb2p4qxhsz4xh3wggibtwlusxw5up5in4pjqucsn4cugn5nkcc5hd87v0m0vnud8wscrrpxjb5u9titb9iugq3fmi3uqp1s5t8jrsip3xbqkr6wauxzpyyjanspmgf8rm1d33dvzbzozs338i1muh63rd77698vunt398jjz88spws03dq5za5mavhpcxhvog98s2gw5ol8m25wp6uql1fj8zgvccv5vbu1mz694cztskvlzomm1xbhwcklrf0sy4xr9txcu2f0lehgzjseu42l646cyxokt',
                parameterValue: 'wjiw8vl7obaf65rv3z11h2x4068zol53oto30vhn1lfounhsv95y72c68hg8hera8ytuc92vhza1drm39t8mqz7lre5cg8fkopo2ficd3ma79u2av8376b8mrspkuib49h6gbvbk1cid77tegnxl84mqc1yrrv1kfsc01mxcg4yzotdwpd71q0n4mtgrkq33e3493hxpdaakgtcwiowfcwku5asjdxm7pcxeyf9ursdxeh79mfzy06xvb1ynmyky4pg1bursimup3k7fy8gl8dtzbgnjnwmry2uofv6qm860f71xtm8bi38djn32r5dhwvd62lh9u5hjhqyuh1yipxlw46h6dn8ph7vg2s8ajobz2p83t1qqdd5z7rw7eeb9yyg9mjrovoaoqrntg2k0pbiq9l7pr127fb65ccebycd66upajt8p9j8jlmnrt3zyh5ay9plivdqia4affwi8ceiawmxhddg0k1un8r1nvizya00ndlkvikgmb351uwskrj3c5k22uqdsq9sjgpno85ju1ufq01dvt8stc583k76e9fu9hpp35l8mcetdfmkm97utpdiv5ts7ll91mfa7kc9usehh7pidp6kuxqgh4lihk9ddeaoz0thii59rfs4bynvx7skznbcifkf7mctptlvxsor50negiqjau44t7krs4yvcybl2japleutf0a6zobsrthca1sdhef00eou8bm2idwnz2paa5ov4uyf5h512u2zsh9589pi2a8yn00vvvu1tvy79jsgtlcks0m6cgsgyelsfehjx3qxgam51py22gahl444wyd50cfdr9undxd6yxvamva7z1kfrp0iqvynzgcmhx7kgd1cgy8vm90x9d5tzuppneyfm57983b0sa6ktywdeieommtxy68w3818bw22hg2rch4vclxje4873ny2yl1aferok5vs9oozwqdg74m2i24wh61ig7cy3to1jw4qfkm057osnrrh8dmwwcrpji24kzek9zy8weymo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: '0ogikwtyfoi9uqvnvmqd',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'u6rmmr90kp6dhdha4aqm32eantdru3r3tqnkzdfp85m6l9s65vzz1xcfay3r52mnxb9bo1ntgwh9gs005mlioqz9mr4uhb6wk70cw4qr8cqpag1j5ct76a68fr9yohey3patrxsyfgxasie9s3gzhh5fkcf7ii5ps',
                channelComponent: '8dkv1esdn6qp5egchad4pfj8ayymkq7hjaq9n8qjqh5f952qpdghaznfaubuy4lsvolyf955sot29il5saamwksv1r35lyim9eqkylah1e4gw1nbg6jy937zz1vdz9tfzbnuh7zixk13fnlmx320783jodgn895h',
                channelName: '65mb6bspx114f3of99jd8qp74x6yyo5p4du3nh4z1kum7sysdv472z3lpws0r2rrlyagbd4hf07mifa5yx5k60wko39eu5t1i3ipzxzlb3mnplqkmvuxylgq5tdzkljxt4iwo9y2js8ut46xo3jxf40xl8hh1rth',
                flowParty: 'c05xjxbtf6efw4b9qh2m18uipuhrzab6f64el4dc85lfeykxiln5bw5m4tys7fz9unncz9jt0743wj97a73kg0tqnofig9ilie40s5uyjxwkq0rq6mdgw5zipbxhap3sfxrjv4jbfv1e2umdmw4ei6pl6l9b4mba',
                flowComponent: '5doj4bspdub2kamxxq2zpvdrvivdbspewj9qwwwy17i20dn686iftz280x0cejj3l8wwra82q39katk6c399hfw9g6dgi5thcfa2co09at58m0cc4xl8kuxyotlndownvw6wwbrzz7lww3cszemi8i5kqbufwxv4',
                flowInterfaceName: '5ssittjrkrmjmr9zxgfz30ucyacaz3b1c57atbh5hqj3mjohx0ewajyqnj2w1u1t6ozic7cxaujowlvblw1v8wbctiy164lxccyxcqvhv2d3i3zu307ytptcwh0fou67ppiiefgx60tej0xabwah6a777muqb6j0',
                flowInterfaceNamespace: 'u3ciozfd20oh80d688oi87vkvmw746labx6xqto43y96djbuwlxw63mrewpktwsh7n4v7hsfff6m5vle0in0osg3joafvbrcp0otq31nyy3oh4f7dfaln0fnujv1yx2fk97sxg5xt1x86i8wwc7vyg9a9f35ai3f',
                parameterGroup: 'pw7mg0rs7nfiox64c2v4c7m6jrptri2b14sv7b8uvqv5sfrvy7n8kxptxs383mq2luhqfxw0hkze624x90vpq7vprsmemsxti1tk9ft5dvg3c5zmsvjyevf1zf7qv8l4oqkr9rn0tzjxh5su7980re4npknhgqpgg83ps6btyxlkxtej6w4xx7ysc08b54n6v0nl9ty8h4fl0wxc60edqphj040f8vsmova6hr4hofw7fkl0si7hkh4fvlkvpde',
                name: 'i2d1uwwahbdxg8audwgw7cszzl4jnepe8ys4mqx6tchzr6sxe1mog613ug5ivruzfn526dgm99u72e2zw6reo0nzyjalyr9qh2w9567pd6meyeeqeckr5a0z1rs1s6qgmkgrojb16onp6bhvikl9isj0pg67obcp3dn1jexb4bd7kj882x0wbw9ifwsr93jjdkse2wc626938o7hdf23qh2m0zle3tha1bh9qd6mqz43k1qazsyuicmi0xntd0zsgrzys9scfv9jtef4a4nb427mp287no9flfwqpy0z0x2erjk030cddo88pws6bqzo',
                parameterName: '88dwx4twd8mh20sfnnqf4n8kduacyjzky22e8efjjsumxxkt8slyppb6eattv4iqx2dfa6izqckhm1hsd3yjgvf60ak34gvoegco4p156rxkp50oj9zfyiiihj267cuuwj7b58wui1oyh3a0qksejd98eehwcx2ikwapt5a3giixmjjyze8ltuw6al0aku76sl47nt0svu498itap2tevm8x8n2bmqaszzmnub81aj2k4qbmemlys5hcciavmawaf5j2rxy8h1fqnd0dnox6o5r0fl75nxjbsm1xp4nlmvbthrv3pp9abexuvfl3b1ds',
                parameterValue: 'zslacu7osz9zvzmlncflzb5w2nofugjy5vzp2yyfh4qn8xue1nyje8cobi40kf7dbficivqy3jift4g7kikd0ihkixfpnhukoqcugkcvs6qvlamleykumweol42vklxmcmcoajn1cdq75lffbmwzv9qk01rixhdljy9zrxbvxxvg5tczi58yxie617ltswxk3o7gorifw2w35crcazl0k5rem5xbxbim1m1yksyttibi02254sziiw6k6kbzjdo918nfw107zsntiilokpqhrkgn7wrferoqsxc0t13gvpw80gg8n8tqxv471apjed3a7vh8j6eqrkm9d0lcda7u5jk2ieiz1ftv8877a2hffqr5imbbx0v4eljkzkjtrm5ebsl9nvy7ube5qrzqq4lqy4f7creyejq0kqrf1hmn3rp6jpw2nulp0ueh02qcuirm18vx9a33vla9g4e786tw6c09k964e9hkkffe2k8y9k7pp3mosa9deot8w22o9wyy2xtivqyq5nzylengv6nzm0zzpegrh95be1rf09lg2wtpakwkrovpqntlv9uebazybk7smhf7cojdowabh4z7muvkpd3szn0ygjrrc1r8awqmzpot7zg0sv4l0tip6uac12fnd5m6ygttiw06pi3loau69btb1k20i5vmc3zjasiefn12kz7f18sjy8166alz6qr6hk58evsea5ybs3178ecdh5896k450fsmqp8k8t090ywitvcbeye53jmskjkzqlu3e4i5nxhdfyz46g2fpzocnhdtmussyqj1kxkv0es2tgdgowjkb3kwg6sdln3xltvfkkejsozfsyx7n93ny03faqdx8455owey17ekxyfhwr8ngyh2j4gxt3a3t64d4kh0sf02er2iahclk5xcnhzo23cn2dfof28u4khn6jr0dcfe6fuyubu19tdpc9xyg3zq720ik1jo9crufwk7wwvdeiet2m81a5mnwn5wju4cnf75eue8yhqbykmagx8f',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'uekzq2en1v0xcv7o5mg6',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'rxmgqale3r4p6s72pbnwjfq578ur5g5t2o02qxv4a5o5td736u47awd9a3ce3mlfzmzoszrbn6jr6zdlc373c2w6fj1krngtn7zrr5rqff3s0zvqkhjj4f37g34lvzftpp75l3nts8s6huqg9lbffpc7eahp0eqf',
                channelComponent: 'pv43wquz48k0454bjewdedv0ich7jqody1s9j6ggic0flbufwe2yqqt7et5xczuhyd7cir3cz326tpgurj26h9ez7qqw9jek41xda06ilv0xct919un7on3wpz1gnzx3ghil87kh2ne9p9paee4r9xcf689ad5ggv',
                channelName: '2wx92o9pry0n28aoivpv3td3y0khxcv9lnwjk8hq9p0w821xn2z1n9w70vhmqyayc75xjyxw7icve8vrmgupvanirlnbw8yeqrcua7pup6fllwx6zwgzno2ntce60fgh6sheqd229i8bbc46px9vo847hlrvtp9f',
                flowParty: 'dbuudtzpn5ovt2wec9evccfikeakmslcuo2soz2xpcr01jdn60ht9n9bdo72rmoun2ktxof8k0kmd3tu0xs16v42plq3elx30i0zs68lla16ipsu6l0h076g89fw5iepkywx6kvopufljx3gtligwlqa25wy35wc',
                flowComponent: 'ez5t2ggw06fqth3397movhc58tf9qugu7cw4343ciwtcbwr8ygatcjg5jdrz9pbcndq641z6r6vporbtcnr5avgr6pzds8vv6ulgklcqnowzvzz8gx881v71s3rzdlghtktzyy5vvjthoebm9aanak12jlnhojci',
                flowInterfaceName: '8s8dmhq259it29qec21ms82ubgxnbi9r3tcgbg8ma4gsbmnbzz1vq5ldf8ege8nbseh24qxpsoqd2zuvv692i6z55sda5vtvtjm9z1xvb3r1kdjy577gvn84egokuslmyx496ard4xtbwqv3ee5qsk7xb1z6twqq',
                flowInterfaceNamespace: 'ilpvyuaaingeybodh2soir4tie2p4rm23nm5w2jdrqtm82s58i14arjabprsemh9jc8073yv5i1jfrubp8ag3f21t135jylkysbkh9mmbk332oc3hgaj208x0tgf8h6mcusrffdk29a7bb9ekr05nw9ldt4mm31h',
                parameterGroup: 'yo551lmt7cl4i5rggth9ggrp3ujb1qlo9w4kvbkgp2oetcu3jiw84a7h9gdvrmu3ie1g23w5ds3emzwed60dhyeqmrvxacu796vijl5h20wr9ecouvfo7f1ogw5wvikok2yzjijlqteogne6n1b77pmy8h10bcjb6ipnckrr91k54kl66pmkzufz10l3l90x6ie486ysnrm2htlmxe1jv3lzig9edccirafu7bb3ds249qr5raextwyms2n22dw',
                name: 'c6hcnkg7b5waj1y8pgrwwaqk3x9ob529ghcgh8pd5qmie6zipkob4xzjqhqjgg827bs2bneuq2lgccxl5fjprxw6qx7kkx5c3x61hnb103v8vq0xfvdterp1hqvqi738bjz4qnu6t9dxxqscnli20os1upg7clpgvg49nlv0ierrhw9x1m2xaioo7n04d3efkdj8vqkby46f4p8xrclbpmmu31dzywkp2q5p0uwgyxdn5hqtxgvr5uwbkhcf63rvebisg4j1qi9gcsi2xojtsyyd1tstdvcczt29elmrdng0dzyd7r3kgcswcic2au5c',
                parameterName: 'xbwsatfy7wttrjlgexjr218x6cfty4qvz6mlm74uvqooicp53jx4tm16s0lkb5y3ja95h3gnn005sd44wqqj6pxds6z8q7ckgsyntae141weakf5s6lf3csi2th5irjvgxrtq8xa49gocglxpp4sk0t38kb9fsdiydl1ps8l1zpf6vjjzhihj8ycne2orno6kvj5s3f2ou37m1h6rmqxz409vbmffvafj2eb1p9hw0boy333wkm6cso951pc85s1hoachycatrbsx2y28u7en7yigt5kj3550wg2egrincqme047piqnoyj4azbr7f1t',
                parameterValue: 'r8kgvwphuquplivuoxej04hotg8l6gjrqghsw12t84aji6gefc1s6pt12l2nih3x0w0ffu0i5lvjgbz6yhsdojofyz32u3gyrru22c3l7h9rfnipdmvuev2disk0epkq7250k9upbvc7g8fr6dmig7hwq0mgtdme4uyv9p9swrhh2pgbjr0awgv1k5dpyifzwglxj3y2jbydckty70zrsfolamo21onijb3tnbav57vf2kxc1ckwjtndyj8hdce3k6hv61iml6pibt2seap9mh4ugls9fnyb519ldi4wb2hdlqhi5nrcgtkbdsowvezbk7ol7g8g40yh9g9puygwhz40f3597w01626da7d4ed9wci0sqfc40s0u0y4ukcsl9w6qrq9e2oiu2riwxkvb62sdbpqvgn4jqzin7hfqw8lmeg80ij84ifepx7pvu9e2jvfy16c58xbeonryvmu11etqzgtbs53e131pktx2536t5peom15tkyfpl3yxekl7vx6yz0qvvorsp19vpii40r86wobz01tlw4v2z687srcdro3gm15wmlhhe67ku1chtvi4drdih475zy4ybtunu33x1z2x7fn1p789874uxxkj7z3hwj7tvtv8nbwggjjs74bp6bgvye4uw63t24wvxw35ycpyqj6v2zfovy9uddqrnouuwa7toxplzlwvg29z3p4eprbzrc5yk48t9bz6izeur0iix9lzcxj17w4fjlk8rrwp9n8anw0siihglwdl5kftjqz5wllpf5bcdr3kiztxtt57v146zq1n7ht9qldglnlz74mvmavqeon1e0xitkoknryi4v2pqgqlfls9pnsoyq8guj5rbh117chg0ohw1etlm14xwcnbzyer8pg6onbqyj7gnf7fkrnbbz80cj9d20oqdfmipq764ayby7p4trfjsice56ret00e72basiwnk8yibck882t6r731ayzfu94ipj6b2u7y43b09i5klfonafi7v8ia6u904a1a',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'djfg9jw0fc6cf6qeyif9',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'inu9hr1h3wo5y32ggdnwjqmb5x4pd98gf2m2btfrcc2re1nvu4y1kt62yxfajielryk4vsw9figei2i4r4snc4nf696g6r2brctajl8xqavmetzs8w1lzjzjscc4g3ezu6xy272ycjchaodczo5s7jcfphmlrht2',
                channelComponent: 'o9dduht812bpomsp8oeskwbq4gnbmclp39hidh5hwleu47252szmc6fyksqhnmn568mrvksrjtx8vl2bhfr9ppcmq7kchcbtdv9wuz80ochnzv0vdizebqu3izix634hb3n7hycmnu52eu23x14flnr64atbelo7',
                channelName: 'uz1owu7savikc1s8m75544qagcg6m9aqlczgo2twz190khes3ou7vrlrn93yx4p5fwrglabtdio62cxoz1mbjrybthnz5p1j8mnkmz04oq6uwnvaz5unit49yat0buw34kr9mfqvzdnscch24n1ezheffz6hao93x',
                flowParty: 'rufb75s2h8255kw1fsexxr4uw8i8a296cz673czgy4nvpge7rk7reo7cfc0ffevu9dtedwrl9ry51b92hdf67cy16mmaofus3ny3okmfq5pn283neihpfgiesdyfhxss83u4abhnfggii8fngg2wb4ljo74klog2',
                flowComponent: 'l853p5h4r0y0dg767vyvudl6ebapg9o8cvzbyfi28gpjose1i4gxk5yy0qq8ggj3z4txm4si54v389x0wjux4q03o8el4iz1jkqtn1ekvskj7k47ypz3gkw4m4ei315admhh7dys6lst3mcwln9svlcdszca7hbp',
                flowInterfaceName: 'hfjpyj5bs6ifig1ibb1jpd6sa4t9z4tuurlo8er2o7ivnoxpaz7p9h5vclihnzosuvirp8zkfta5krn9iqwxj26n0ewfwblwx3nqdjt05a2uthhoq80g8nu046mnmeubmvvgrc9ox47wumwd23z6mdso7m13oone',
                flowInterfaceNamespace: 'gthx587r2t4m9xbc1rsvjhtz26nlvluai9zavv07ydriximnjglhiw007mvqh7gydxhnwgeg25psvxmlgdqiknypafixuuh3g00uutmygljhftnj1hgwj1tminzodzr8jcrk3v643t80ke0pj4vnf8746ybj6gya',
                parameterGroup: '3qpvaede4y6m4gpay3zx5gbe9snsfy0i7y9ik93916x29nj78tc7fov2n1at7ml0f7ekdethr6dnq1jh6aaoydbfimywxcnb2vg8diagjkpsc41w3lq51rufr9yr44li4y3jyxomlex0c8y78hu81mrtrf8ohqs8ct9781ffn2gppxu40c18oihkbwjsvus1w7eek3fybhc4zm7tr3w87yfgk4rijqh3w6zewmrg114lsfkyyihfkddn728j2lj',
                name: '3uu5iw39vdiw1kl847kz3woh4sz6502pb4o6xu2uv304itxqj65mmw959rxvcrrk52dejslix4v5gaykznafw525kb5qxy16k4cfs4egpdava5eznb0lwgpbsoa0i6sf3sf0j8w2qsajjkpn0cqea239fxmgzfrd5rwyu8o0llxujhlbj5atvnqa9ca1zwdnhtrr3tfl0nqjx6x7lq1eocixhj00yg9bw9e6ttca08je29rdln6o4vygn57eoa0qo415afc3xcgq9fmioejiwn8s0jbce0iq5bcsxnujf3jp0thujf3eex2ao27mphr0',
                parameterName: 'oi75enaxyel3kc29k83h6vchwuo4i753ak1ausizivlb3x8yd732e8d8kq2d1m8c560j24cfijhsm1a7ex48023s94ozi3t0b62jnvj0gek99hvryur30u670vtlzgfele3q7sb3z8dneod93ohf8n58mqe4p6cp2m9wcahd2qkkzymbkoj6nmllvlmsocrb5y0r0j2ujf9cdkq22l1fy579ddsp2s5t7n12obxrrgxm38gklbe87qnoadl3cjz8zkbt2osv95cc9isu0r2ewvluizlmemv6s3ejejm809al6bxf6gwng0bldy04j40r',
                parameterValue: 'pqg2vkontjp1naopaqpzpks7jj1rhlpai6stfzdbwp7yse4vbc6cgdhbayq9ap1lpwl6exjf1alvxaegpcnl8qo83dlrwt8wd32rf8m82ebszmvzxzhgxpyp05hpnjpluvpb8wtp0isddcdymluf20jk67newsn7wvbhtirrvedmgbpj1mktmxy1b6ierc8r4k35z49m0vxbj8kdskmnrtnn3k3xe9sry5yhdrznopnpvwr644emjcl1xtgmy0bfz1pgoezhd57rdpi99huntx3fg7lkqc7b3bqyw25o2muspo267f3wnnho7vsdnchxqdxclrcahr2gb87t5tqkmxtxn3cc2nz8dmddaln0fz7qtv4zejnblqc4eh0sespnsh0886lkrdmq06ih8ikr0jhwkyy2za99b1pqkw66u9999x3qz0nzu8mhm6t53no1naz2ez8z50rqil2sfd5084466vuep7oxjb1tvqcuy2zlpdcw2cusxu7pdg3rnlpuqxsjfysd9ev1wgg35xfn5d14uhysdlr7rdolre6wzunk74jgu9rzjcqpjjzvgy8smiofxe7nsu6oxwz7dfnxph7sfogbsplc6rlt524n0w7wxa3j8rxjx0kxl5cw82a9ki3nvpltbfa314hp30mt7ne15q6b29za4ugsrbq39xz8v47f6gvpclqwoqzq3r0k0jae6we2fdjr4lfew56012lqq1dv27vi6abjv46yi7pm9jl4o3t2yddydmu8r1cojhtmi987wae2ujjjs5ujrxfq3jkwuf5kxiwn3jt561zr0fq7bbj3phf61h4nsu7ilq19ab30oddyc96n7fq8d7ojxzvwb7haao0sqfmi9b1u5u08i5a1htruc1rruqnfymng08sihwl578f4rqq8vgah3mugro0ofjiu6z4g7ubt1gf40rdy8blb5oyuj3lh3oad9emx8vxevr1umgfs1y31stjbu6dd05emz20oe40p6kiyy2pgk2x67r4y5fq1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: '2a34bqccx17qyxo1kenj',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: '638u8pwp2cf9su5ixdwkrzhd3md1h3mf93b3jbw1ngfbfpoihg2xet7n304j2p8w75i0b9nlrt0fj5rz0386m4dz5eji3lufie4iwcnzgrkn90909m0owioofj4ym9ij5xh9q1wozf5mnq32frck7st9f7c9dgmx',
                channelComponent: '76lh17rja3mrir6yh5fzedd7suihyurokmxll6zwsha0sb0fpq2dcdn7ynndfcv0dkbavuatk0zjj698muxnqvc03bvpzms1qdved4jv1c1bfma807ouwr6s2nlb1jlcg0k2oyc6ok02wd3q32qnorqe5d9sjwzv',
                channelName: '2rg4rppzuob8u4rbe1r6hppygu0dnv94gt9kpbwktxtu174gmqr50sylksexhynii2f1xvx58a3lm4k3tqfrx3ipp1anau1oddrfgdup7mfihkk16zon33i8njukbqlmhaz44rtlgo5jwk10t9d2qymson2cd4dt',
                flowParty: '3x4s6dvgrhfgl4g9j1hkp2jzqd8zv4if5r81jstzq7xmxf72d6z0igcnnea3h2dp49d25dzuy0osf4ikd302pjvoet3yg46njc0r0c48j6htced6f5czzs430sjdrdw2kco971y6regzz36emd13e7ypkvdyz5do1',
                flowComponent: 'ooild0l0psyyabt3chsy0psw6spej0see4iinub4q9uws2uexmqsibmj1pkwny6ar2fwm8hw2832cg87mx2ztlh8tct9rmx17ejyhbp4bzmgzy75208dv024pvx6egm9poct1ry4llzm26j5q35lcjtoggeeiv73',
                flowInterfaceName: 'mavzcja582clq2c74ng6dgrd1kmrarmrbxg82y6abnebiyey650ty2bbo32b5j48r5qy2gxptninlys4gifn5iwfvujdjvc4yw9msg3cqs0r3zxxis4jmvixtljpgzn2stlvwvwo7p54gx2z4e4eaqa1q6zxgpy4',
                flowInterfaceNamespace: 'd1lu821ffcjrz1ocrtm3xa3f850gnbmafth1kflde19wxfmycbtofyp9uvflgfkdx6gdw6tlzb2kf3auxvoreqvy9lstsr09u6puw2n2ydfpjmfa7godkyovu65993dydocl2kijtxcfgg9xgh0m0xso4sis9sii',
                parameterGroup: '0q44clgwsspvamg7bxhmhk8e4nv15idbrlghxjg5s0ydoxddmwww1edn5ctu0qqubiau7bjl2ju81jqroqq46k9x82zgp13zbzsy8uenrgy35c7c7oh0u3xyyxuscr63ev1z3u9lwfl2hq38ihqe6mjdcx7jkl51089l447uyh1om3l1dg7gf9xbvxu1tjolkv8cuy721zhd2m7m5500huca5jahcwaswfktkj3axzr6d12tydtj3tbz0uzqibt',
                name: '3paivfi250nw6x3bgaiobcq7frlhfs1i74fhow3l1b44kn2giie1ghy10547qml4slclgg3vs3e3ff49zjkcs20c6dypoq80hjofc04cc7nt1145v6sr2n3gxqrenupg31v0qr5j4war4hkacmw5jwoobuopx2p7xku8jgs8xr4664fasdn9s70v331xucl2qubl5hp14wx0hcxbf44an2s7ddewgdu07wukx93fvhcqb0n6qzhzylhpf13q2m6nk8l2aq0l0264fdok5p4e7o4x3u0jnn6501fr2g9ki9jkjinhcpjgjx42pv2hfv38',
                parameterName: '2ulnkm37yze1tj3rk6f78kqb9hl5xt7nbj9aqvx16qhntt73agnlx355ikonesmj54mx0cp2hrdnx5kust1icgyw7hfuuhcdp5q20k7gck6oj8ez5kzdp4btyhgz1pr1mkbeahkg2f3ces8sb3a20hpruup7gefk6tun187cyzxb66ysczbspdlnzyj74sgcjifzvdyo3vgjdlc5hs8r82bhkkllukpgcd0lqqgepd7io6kvfw61n65vmd6swyntcdfn2p1it9600e4bhrj97q91x1rtuqx6xtv4e6ym1e2l7hpiqf0arlkd1wbi3eua',
                parameterValue: 'cy4pwca3m3m5qsfcnswesr99r01zca8tsjqak4rblaoiyz32k1yypgi6zbti6b3ozwfujhkz3hd4guiicxssdxmpmyoa3wepswrf7hhzcbwtgu9phwcbxu8kipn9keb2yaj0jvd4xlrmsm72m2y564qpgqt2qdrtgxmxrbhe7015c8uw6e9odf8ycw5z1rcyt2rohsi0nlifd3ftk4b0jxnb7255dua1t5anvvypyax8izxekmn1zdzsu3o696l3glfbod41awfuo0eygkpou4ae1tardzfvfhrex5svi6z55ratx6cqlsst7q1ec1xp43kdhf7yda2d69g2f6527g8zmz43l4hbj3i9k82daxempcd21n0evxzorzerz93mhgcmu361f1dibinzvsq98e96yb4icm5ilryd9ddbtz5ueasgo6bf38ls9841lkywdio8eis4uhnqesevuv61bzmguq4sald9ay82c7yj11rehx7uj8epyjsi0d0sr5gwaegyf1m2xkfn8v05p77jwnlv5d41q091vh0v5r9m1cb24qe0swmtm69nxz5slezvqo3yerbgh0ubtxb3ldplj0v3tvn52q9ol1xddc0ghud8bnilvriavwtskmw6xtgni3t0qnmpbebo2q7w0vd5sdktg4hb32cedfvzh9g9eyi3ln3ruu14eal933iq94hbcvdgp0rdp2dob29u1xatzpbylwf2elxvbjshj3iz2wh5xpot9lewi31slqmikn00x46t5re2ban5tv60nzqvzwdd7076h7rp28s7wme0xnubwh271ojne8b3lravj6mt2srnbzwmz1olkkaejilk1kvz85munniea77pj3i0g0nyvcghbtqlswkxmjevx797i3cjoyl5qr6en8ybvh1l6we37joisnc3wbdcl8htr52sda3k0ihqualkwf5pad1tsinxedijiv3oipxcs9no4s81x48p7lv8va3lelabsl41d0jmem5wcvtmry5blzqy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'kxun1kz7fxx894v401rg',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'xxyfewedtgx150e2kv82hdrjgwir8icfh1yp4mfj5vpm5wo9misdo8r265jfzmpas2d3ndyyr6mup8ijtqrgeigiuj9t4grcux98xpis039782udyasbqzgxbt4x5uk3vx556fr6gxptjois1c5hy0t4t4lkiy0y',
                channelComponent: 'fu5y7vxs8rc0fgj9crcmkmmdc0yds5h0xssxdr1p5nzmgvzrd464s1ntqoh5h69xps7ld4p28pta48a2dcqsofsuq1hbnmmoapyds1ncifkxop0r2pjhtx48eimqcpmwp7ep5ovwms4mae7b5qna3z8v4rwu8wz3',
                channelName: 'oijpj5zicrlmnvk0sx136e7dgzjbia4hd4uzjqxadtz38lsybflsugiz9cszykvugy1fhkcts3zq4ektkllkdq2j78whcdu46izggzghfn19hddl5hedgj08q1rglpbslohrmaktiyfstpbv1svhlx9x817jale8',
                flowParty: '6cr50jf8nacs1ol9m6boilg81zzz3quabbc2ljfe4qn5f4crwl6bpfqtwjvridqlz6blmewr2rl60ydqbv0aizt07vk66k6mhni4dzfdlxfi0vk6co1fg4zbdclo4t2wqmljhjuhza0zijng3ezowjyp90aqsut7',
                flowComponent: 'zoinob9qs54k0adtcx3ml5u01hglt8c8bf6h2mo79zorfdaohy3in7qe6ol20psfe0gvaeimvug72q65f5q074uy15w58o45torit9q0pbjv0yapenlzc6dds2pax18by7zeg5suwtzkwdk32kz9lnqkkojpj41gu',
                flowInterfaceName: '2mtn2hxtdkao20q4eu82nn9vd0pmrj27sar5ix1d1ki38u43sf0kqixl3tjef3hsxj6t1654zhr6uomaxq3kf1bacxeibg15d7gem5fmkw426918ia461jcuq1vaz9ppsjyau243gzuq17d7pn5rfbmz8gp3vn0m',
                flowInterfaceNamespace: 'mdjnckhbbdv2kekq4z9flbg7w5hgcah4espuxjkeowspwnn4ru6mz45i256v6r3t08f8oy495zpm73mafnaab6m1iu4ebh1h64235vh0qhyrtv2n3xf991qfgr8crdql4ug6dotjxa3uingcfoxxhnurjnauv7ni',
                parameterGroup: 'jvc1uoaru5kettupecocmzdd9shu3q02y40waqz9ng0zsib40cfs0dnba0j5pun7nf05899u2tiwu45ncvswhjeiyrjzwzp03h3i5i9uzyhnc1gqot71ex4pxtijp66wtawkbq1u0n54lq4vksvfrw0rk0hit9rc1pr151n2gf8q5gcrjdgzjc2q62s2kdrt3xm9xy09egf5v64kuyds2gpul43vzdfei8alk6n08gezc19rvl6nxx3csnti427',
                name: 'taro3eaz4txfz9yn9fcunpj1awq2pncp6mrtwqcdg549s6n1bfbfn8z836616wyu7sndqhlx8k2t1hxajcgpn3x11q5uj96l87chtnxzbhqfsebd5thyyqb945ddpwzbnyqwf1ipxnngnieo11wdvf1fzb2kydt6e030hdxtbrzogxqns0vzy4pjhrfe86g1wg0lya70fgjli0b1tebyk0f6kqsrcf13at7uitrma03hlvc80xo25h21i32u5qnl70blnyjbul9n3z5rh6vgozxu67qjrvds993fx8egk4ngcncpfw18l59ka0f1gja8',
                parameterName: 'besz19zcvov4mm1wd2qe344mhdugji6etlisiqytn8qwosbq5613f2qffv9rvr733g4x2xut0ca3ghm3q23f8sfk5v28nkqwmk6f9rocutu3plg1m3w4zbhfoekkby1emsd9pwcrcrx5d7yiodgk7zqru5fqgincmqhf57jp075zqtcu4as50ddzzgufyajscqya9cov0zmfjkcdmtl834cs78asdnndlmyhr8t8nyvycdc8dgt09j332aik4iwu4q375icc9o1ly6wdr4nw5mawiqtkouh8jacmy2jisnouixgehhs7u6kk2tbco2ns',
                parameterValue: 'v2eateeio1cy5rrzfnahyo875e0yidhes8vc5pb8noyhlsr7w0mbhaty0hz0rzdnzjj4a28f3ufp9penq3f5yni9so07mmdbsifoirk8rcxwt5pcx4ob5jwznbxsqeaowmcd4wjaln8cnxst62u25bb9d310ze2ufgj9unzzi1u14i8oyaqaez46eqg6wd5seecnmxala350c9yuvj3a5zq178a4753drhut6hoiqi65fwt9i710w7z9odsno4ponr5k1j6mp0l8dh46l0tbrjj2ia9obc30xvdwm9y4tatu96inxfpmy232cz29yzmll791oxlo04a4kg8a07xmvqotqj9t32t2o5ktdytv710788nl0pr7blobs4teqm68crtta8twciby3fmwlas0hjey7a8dlyiymdy34y88w9y9wu84do74erik25rf8mmxdf51x6i1lndkrcw8hvzgq2cid4ie412x9ab52ffhaq5infbfuhgwcbwq2jh6fhji9z3bmw0e7qhybosrdywocftv59bvm3jl4mqrfrsglk2qfv7q7pycmedn5icmri8mchtdmhl6fw7eg04lrclzs5xi83s2ii6o86hthz32xxtt5was8kfizrhdmr916w06ny0zbtqe2x2w1rgf4vo2654b182eh61bmhtoy2jdvth1avqt3sz9gk0g0pb9elli2h8cwo171rme7aaoq4ve3nrq5uxepug37ag4exh2ykfxgnpvkue29o8ppfse9wejymxtayng34282ooanuxihgeqq26ig43x45b38ixxsolfwfavg3haj07mdy34cxyi5pxk6ac7svkblivo8uwhpoabrxb9i3v5p0misk89i2svzsjgpilay4eknnq9d65w9pga9twhd2u04xzqxsjysn0up9g729jk6caw498nyinr6ptulnt6wqtncukhd4ch7qzpkakgdzm92gvbamsq3yofzo38kdzdnahv5mayji9p3k9n51lqexnkdtf37y6y',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'gbhyyoqc3oacsk9ai1p8',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'kpd4jhk1izfajhdnqt2ra1r6gogxeyj4ngalxxnmsww6veokksrv1ugv778iiq43ln1kf9s0v3qq55vf4ik7dsp76cvv52uh203spm84xe3vog3l29hizvsijtq9r30ce0cwcqhidb3p5ystizkz02tppts6qr4e',
                channelComponent: 'j6ktxa9sfg9f3h2qbfcd1e6z99m8dv6gdjpzm5aqvx4l81eemgrojiw7ra0gjq2lt71r6xvs2tlpqwokf3711e8lnht6qoogohiyzbz556s0ksqejdrjtxue1rbr74h1z940y82vmc2odp5slmarp351q4ikrfoa',
                channelName: 'cwweoctcpty8xt4w1roh1e6avecnli9ypwnxaj84gt7cdg2h97i4lkqa6lbmn58n0e9feutba0kj02915vey92n42hgph63czgkdr2e824scn936mg0i5bvafwt6xf3yge9mxjwpk98473779ign7slg8wqd3q0s',
                flowParty: 'xmxlg0j6hhv0k2fw30pzitfm0gd0xl7xfyq9h0t28yv6ar5d22w7ifgwu6xb386ti0hmag83qlyekz9zwn3eo9uymue79scdy15lu53cljccivk30ycqz791zd1j12af5avay4t8n2ljncrwvkquzxm7avy18nak',
                flowComponent: 'fb0jwcq15m7gpjnpmxh603d9l0v1unxpnwrdji86sr4gayanugc2ubtlh2kr19my5az4mkcqglud1tqg4o68lruv4lk0lmgto4q4fjitrsjcv91l8h45q80dxw20fppekzw4ll0i2nn3lsq3dcsw37c9vlrjxb69',
                flowInterfaceName: 'ehga4832wt90s4q4ikcn21g8bbtiz2jn85l8o6x6va70lu120m0tal6uqyh6n0i4d8n30yfl6v19z3x2kc3yotkyi0nvoutb0t40z10bs6j52jken7m3q7f95lr8a6cmgbd6aw7bz8py7h15lgygtq7ez6uni0wbk',
                flowInterfaceNamespace: 'q35zb07gdci39iq3gt5rbbiie03zc1bcdxcg1wf7fft0cntc1egsrey5bwt3ditdz9edwwptdv9wl1g8722cqq4wz3a97ic5fdjt3l82lydmcnp1dm484eit9gdqdzj8sjelbxai2u2fi636huhbu8hjkrgjp5t5',
                parameterGroup: 'vnkoowauz3ubb5gk2m1337zc9me390kwsuky223kpgxd6xezgvgbcwx1gj91xjpo6vp700v05zowpi3wdcbpn7seekwq1z194oy4knhtkpx17rfif7ka0v8vlf430xhl0lf3ay9oibe571dq6sbfqj24ng9x2v8te8vhtmo42se0o2837kplb129f7ulhy54eybu8ekogqsz8uhxpx4917e3cak0tq7wkh4n5x7dp6ghka2zk9d0db3ugcaf507',
                name: '2no2blnc0nwjdq35th9p3fyz40e7k9nf2ifgj5ug247mmrv0qvb6b0s3sst882w7a1weaoxuaxg2qbbmrz7r8czmn9jdf3yu33awf4l182azk9wuvg7wwcpsnw4wii2budn1ye3ca0rqjjhkjjiw86y0gcsv18jlsef8ozflsi1ixhgn7im4txr56r021xnys1hlt6xdzjtqrory4ffnm7vivfjiuhx5nkh4i3e91uxmh4xv1p2qlc56tmf82xi7lkqxkqjhhi79sh7pnrx0wtikcg7vz7h8vdcexol15cucl2z9r144b5lskz0jm2v5',
                parameterName: 'zyn3lqrlv016jrv5tsdmdqn6l5ua5rjv0w3nuwvsrc2er45ifom2z4ftgl0one0x786ecewadanufkub0medhozd9necgd3mp9q9dmu5jzhvharzli5jj5mqdqjwau5b79dkfo2wd3lhnb1q5rao9lb3jj96csoaxewvk2ixjkriaps8czllt73w9b4ch8mp3omaesy0c1zi2buc8f0tn04l0s5l3pio6mggrvnmlq1jkwupnzn68hhhp5po38cdpda15eo53p9xchvtgqysfnugzqcrj723c5ktfjcsb1jz7vt9fcr68w670ob1zsbj',
                parameterValue: 'nbjk8dzxth6oj46joc7o7xy2xq3yvhcy7vswgdny4cdzjx1stigy3hjf1v7ueo12hh9ingbnpq3o7te7ouzj7ceth0ou7bs3nxmscasuvspnxf2tl64bffl2622ii8e8qrkfv5tief6994xr5uzaqgs9cgm5satb7tg6mgfp5mvhloiyzs6lxv4x9phrkwwgxkqzad54dxv18bp43beifcx89apy72h518955fe71b6p3tm1mstsckpuzee0n28qvbsrj300uo4hzorp3y4c5m8xl971xafzxeec45wpgast98wccou5vzhbfv2ssbg4ism9epdtvh3u3pnwgq6gfc5eugwjp0ewcrv4lywuqv6stplpa0uqu268gwop0xre0m2yqyu439nhx0aypmpdmwfc5yo17ak3rxwqrhbt2kjla84jhpzqtyz2629og9end6ghgt6b8s9cbhyi56qjf5z21w73sn24eomxd8k6rwtbmr6kqu3yjgu8uen3lfjkh09827n5r4ci4v7ivabw7wfsma2aaux4sgxn5tdz8mhmshunxyjzmb0l941kg15xnqa3ihhb1udtc3fadl176fkolmjr68c5jv9n2r61zdwad3nw5f85ljhpvboo1mf5jwew1uyq8px11ewh41b2kdc1kprwzwclf8izh6cck5b52iigw9m1man84m92q2bgehcgvca2fk0j4iecb3oq6s7qsevqdqr6gsfnh88ak42a08dr5vzeo00pqrt85i2ihbayn5lcx6v8pgjeuikyfnoxf3hz5m70q7wzatwcy31oh6dev8el7es7sqhlczpg9p2ttnvo7fijgxv8c2sdew9kjtbqour1b070g5tzhwqzr811fdyuzteku6nt89t5fxpww9t8z7v8coxw3j9ctnvw2305chlbhgc8u2mc726rl09xm53isiq5wzul6bktoeb94od0wa29h9gt1os2620ejvqxi1hnp9e6pxcmatjixvhqk9ymzewtt97olsqp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: '2nwi3l87x3mmdy23rzno',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'gi4pyeekb2ozoy4wngldw431hshk79ggbnyttqc5dzakwryy2t0lgleitlgkwssr1z0tlr3qt8pf0ytpvhmkpdf4yenareh72iqrntp2bz8sjj0hjknu5m3qzo9n6xin6n032lg0i8nbw1lew8mz9jyxo0880v5r',
                channelComponent: 'jg9ejql3o930arphqx846wfi98bk96kr2rg01n4r71atjsv1kvp77uyzu2li9r86w4wca6n67nvwz45aroa22wovwg77n24eqlr3biuv4v3nx2vs162qplz0vlm2rqyh66iinn17r4y0ri058je894o4jacye6pa',
                channelName: '0dzjtvdikpz4a9wv01h768c80l3gw3r8xcj54jnaxxugdnqwfqv5tqa4yy8de26qbz052gb1p1zhqeyqh8w7fuj9g29c7vj7ie81af9lhc042jp65w5tfxzsx1kq2rdzvasuyzqeh7wao6z3riulweq21zbgd3td',
                flowParty: 'bww5r91umbyjo3qiycvu6uuys4lu13j8qma4u0gaewdjurfhu3ijskhbtyql9ho52vidvbnsfjt4mvnfu20pnx81wpuzdrbp19z9kj3md5kt769nbqd1ymt3ni11adxzfqy3n0o57n8v9dnncgpjztwnccdaan2a',
                flowComponent: 'jrmuvm2y8hfeq7mncphajq75jedvv06apoxr3ms1o2xhizxrvkdlklmaixesun3tycolwmayiofyrgjgaxddqoueamcdw5bikkxmxc2l3tq6jm0drwgpxxw7beuqo0c4pvqdc3x4e61g1ndb17w056b3i41xei7h',
                flowInterfaceName: 'b048pjewc04f2ve7q1dnuuulkanjwb8771ymmztk5rnwv9sua3ridqqyun2kzu89xhi4c0lp7oxj2khqutzqebevvn37a5zpwiq4vysf1v7pkvul7cjsomsho6ppn5dihbu7bu5qlyq18msf3l3ecd6gz2hung8w',
                flowInterfaceNamespace: 'jl2ydotyy2891hcu1vzqt2fzrheuutft1awt5pt88e19p8w52nj2rdn875v6qj0nai8oq9k00wuxhoad1t8cnlnyg0jumrrung32fs5iadm15v7pl9ucjh13wyoyy0869iy4sazz9eu0kthsnnkydtybw9gaxennh',
                parameterGroup: 'jjfd3gksqoc93zuphsq8hht7m2d9ikhenq36r1xnuaha99oywbb8np8s3b4zliy78qp1m59kqwawrudaxnkra0wfw56drh5u2it00yhh0tfybgofcrddwf492blztn9t42getxd2jhqd735grmi0u57xhh10uhv9c4egepae7b71d3mdd5onv1iy21b6sd0r3x5lzal3apqrb0q04c4sb4lfvoqvtojsl8i5tbhsvliff67c7lp9sdy4xzs2xvs',
                name: '9fk8orpmfqxq6ewdm37m7fopjt0r72ps20ab87rpk4ue2zj7xbrqexahhdbk1cyaq0vxhg4qx2o59w9twsmgvpf50gtoor7ae4bziqjb9yjaxxhulmlyg4eomt787m3nht9p1ue6wsc029uju8v1ksqk1l6zs0282zx1ctbeghbpcw4qr6a2at3ejbzhqqg3kxksl8qp315n3wklslo622havkdxf5nnrvf6l96ssvhowivn1ghdhy4rg4u9cozxuh60n3o76o2ifa6difunajxev1oxndr7n8xbw0re92zk2dpdiotirgk0k5yq57zf',
                parameterName: 'p19z80dbh9k4ergrop0vpof9y5iaepgm92r7ethcpbmc2phi0hep3gc9u8piyjpml6m8ew2tqq3nbi70hdwdgk4hz5z6r8bqbpriylyb97i6pqaj4havab1tnfgpe282jrs6o19ip8y1rc8zw0up1jw6jsieq0llxhva8ljh2lftlepdfftfwu83hkdjganbk5kbcquavlaq4ed4gqlvh8b47ju6ckuyt91x7owm5mo9447azu25zuk5n2w5hn8twp29n1y9t4agfyflnz4vuwxq1qr4c2za7bt245967g4gxqbiwy0stcfnwt1615gd',
                parameterValue: 'lienrkb6upvmmvo2k4opzitz0xi58i6o1wxi2d70dxnpeymjx36ixg8g6aq3px880xjcehvlynuoffbsf271pix6ag29s9dnet884399ff22m5iw80rtdaze786poo0fml2am81d8ps3lcil87axhmas2vtdeeux6y8jf09rm8isggqrlnszq5xsge0a4ob34efpb9tvmr2bk2nslutyf7lwo6s8aom94yvh2ykqtubo2t3msdvdd35qnj46oyphq3vmgxjzcmdsgl5up9fedv0gbbmmjf8i9ybmq72wo6b3nqv72hf9mr42l46u9bcu2uvxj5pqiwdx18g6fbg3mjkyn3mx1c5fwof0muge85838d0iqia1yb2wvcfovo8efzoel0y0qho8wxxg6xwktq1d3zr5ts1a9g9xb55f240iqjy1kd02grnvjiffxzb8sjc319iaf223soocpf9oy3tuzv4k70yxhgyk4zhc0xw2agujw4qcocv68v16bcx1ib9hz6wgb7rtfps4m2l4cfna20loxjegf5wj1gwwp0yhc71yvlmyo8j9lgg32nj93vwc7nbu8qv8sxo343jtbkblzksfec7wiadxnl7au3jiqwahgq6c07e848g6r4bbwsz6h8tjjqc9xnxqsfzynpxn2cfqf05wogl6qvo7xhz6m6etcavxa2wblwvmw0zju5mvnfk57yh7r7yrvaxpywzlwis6wepcj78sfz25q6wd210jb5y2iatktixgn3l4uel0nzpbrf5ewgiccybh9mg6c6exahlm6en0bkmf3lex6ql4zk8meerhw6gu04teg06vqjxo47rh0rlwushx2au7z1g7k6r16by9a908a8u1x45ay4dy8zkfpabl3xbmhdo075nld99ikvnqpdo8v88bwxnl0v4hfdvkr7jq07gy0ew5nqz72ukd5k1r0ugnaubk8extebv5g2iiljystogp2462a4d7v7ev04nu06e4v1i244xkok3fwd717krj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'fx8d4k0zux27r0uybxdg',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'uatihtkv79zbhlgokrqpnravtjuly0ewciv3dttf9grhx8u2qf1xmms4gurvx20xalgwjfl2h3c3d83g5ksrmerpz0kvzj9t2x3zc680wbzr2q47wbr0wee93l5lo3cl60m8eah9f58u1ol4usbrynizcymclo2p',
                channelComponent: 'zy4riupjxhaph7xp99zwpr2kbyunrzun3vu4nr1jojhc4j1z1py9r7iefyeztnu52lhvt11d9w2g42m91aansutoytd836461o6giinubx5ldva8r4xoc5sgv54yho5hflg3qr7c3pdw17er2grmv1vwx1nyhc7g',
                channelName: 'dlruf71fd1fdj52ya3p38wwacc66fgdj19h0uyvnzh6z7aww4t8siglz9q0d837bf5d6lwoygnkki52n96jdsymjkmrndkhqpmvosarc5nrdozp888hh027eec0zfj7yjc2q101zh7zll6itdrzs3uay995mlhqq',
                flowParty: 'bxqcobylcxrqxf1gef4q5svqimpktwr4743sbw1ayxj6igwzhe3pjzgaxed9rgvamdcpryqx0ft6he4auc8fxgknszsgvhggpvbx4szt4yggdcpw1docz7keepo021khfk87kan9jssdmj18z1ijy6p2moltlf6y',
                flowComponent: 'd4due3wgpkch8b5dujl9effa9svec8n6xbl5w67xjqmda0xqk3w5voiae0ecdypwqmmwdhmonjcwl8n1nbfc3dv18ql9fxsoffun5fsf3tvci9l5tox0cchtmi0w5daf5senw9r8p37w9a3mc8tcb1frtwz5hoaa',
                flowInterfaceName: '1mmidkxmvo3n0sx7xmtnr3tsl1b7s4yi06hfrt6c5ul647d6ozvg0ho9jf9hapafzf2krfzpomyukw8uh5dy738xqbadf0su95zozxruopdrnv3uqqbh6osukp8cvvxuomqg22hw3cuwl2corjzoki56kt86agaa',
                flowInterfaceNamespace: 'ylfybnbkxqvl5hna28h5c2lotigx67oeh4vzo3er5oa1epavqd4r7yflgxggi25yscrmscfno1olb3ppzzxojxpkxhuag74kenhkzudri104hvms2gvpyr5lvgkh8xejt20pahbljanv2n9qcb4syysltuhr6e8e',
                parameterGroup: 'y2cnt53rmdl3ho2x4q83mkienlm446k9t4rw8cd6wvv1tj5z43cbe6nu7se59xrgk21lqcusnuckzfq0ug6ryopre0ljbbvxoypvu2koi37wwlsnmwjtjpa02tts7r1fqjox1df76x4s6x2pz0426nwi8rctz55i2dmor3v9s6evd3f4rvyvj4hgdmg799k1mu044xqt5s2a7nlngcnc9cqr026hlfjc0hk26h8ey1hwvf2mkleqv9rjoxrpzny0',
                name: 'acloykh8j0sddjhrj5761mmvc4xh0wn4dh6y6pnxw3b57f797zzsbzk9iz34xtsk8hbzi0hczql4d1nzdqg4g7knpovprgt6c1b9gzoqgzv405rr88jeoawbuukf166yi2o5ujgrxmq52wqdarvm02am2p4jwu1b0p6blvzf1mb6if8glsc8cgy517cijnnlfvpzpbeugy2rricsiyk3djhyr1741wu1tr72bsi6dsqsr3f74wjdaepp4g0sngxv19kqo95gqtborgxqticanz9msglfhscet5g4hcgrdv04njww3y40hythwd0zjbzp',
                parameterName: 'ctc805ru89jrs8ald2y7kfiyjb3p7pxnerf5j2lcdycuf3omtjtod5vl0wqj17vtpuboszxw2ra90trddskute4vxozwd5nq9vcdlsup58mn5aafpm3ygbh93qqs0we77o3wfmu9t85xoy4c48bm3cwbs3froxvxkb2ywypo2xnaw5br0ooqgs7ut0hlmnoie45aotv3o8kku2fhxi8jxdyhvvx4ynd96hyk5kq9ijav35f2k7r5twg6p08bdgvkgkpb5vjojxaaibr6f9qi30wujqvfud35hb5tav9jlfjstpuvf58qiq8ci51rwav6',
                parameterValue: 'gblx0wl5d62clk92jf2rzne1ktvvyhv22vx1m71ykax14fjhcbc5g09dpisb84esninmmd27mtcsju47ehn3v5ub31nxeun4kk5xo1jnsgw48fiv91bd3cjxlhljklwy4p1vixtfp8s2bbnxgvh64w2vv84avcuann7lae2u9fc4zbuvfubusgi0l2itc1ha1cgrw36x2vyb4bqf01s1hackbmrpjlt8o7pp9bglrpn9lpz872k1n99xlwc7lgsp5gty7unht0pidesc0k3mxbir9tycxndhzq75msu6ki2unl05zqhpk5xl0efpl9el4v5q1p4t4yga1e7kmd0ijbpp128s3na4dd2rt22sw3fgy4s7jucaflok7eg97e7anir2gk1hli7itkg8xc3i3mbtota3w14tsqqen3izkcpy2r06fwyemwxuckfi6b1o0827hit8gihxuudvrmll202svuhkxrjjd2roi76tdka99po8ihyzstksecmr15wnx1c40kofwehq6be5owdxqd3u6ir1yztwx2nlzc9yv5rcee2reuilxwgkctte0rsjt9olmsgr8y3e7penklhvrhh47k0en2j89xcgj73atlusnu380z5d7gargsw5dxzzbk6ndzoya1lzjs08eb58y2ux0lqgdoe0hoi0xaeak8qgqtae3sufod5h7cgyyat8vvo17yl0ze3vn23lmas70qg3egcmh398yw07twk3v8p750cd65lspru6bs5wrorckwcb85kn57a4qyko2fzws57qoere3drjs5kxvbtt1s1zidjiza1g7ftsaccmgam52fwzobrx2b5itm8dxndvj6ngww324fy9u143tus6hsep1mgx0y6nxylkdj8c920e47c5504028u5cbz6vkdnp1ytsk2pyk3k3yba6hmbd7162cgcbhtdqh61yhy8mf1ih44g9hwglc7qyd76gr6rr8iqu0qsb9oqsz2996b2869q5nk41hmcpf6x7jucu4au',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: '8anj5tbg66z135guyguu',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: '9iyws18sb4kcoc27g385kb8ka7v7fzpv0z7hxclm9o3fo4hdidp2py4zmmpmlqchwfqmy12fx21ap4mnybk7r6z8pck6qxghfsqejsaoj51wb6zw8nr0ooa6gpwfk65ifccrcjsjlb3sarar2iy5lkdvid01wcpa',
                channelComponent: '1nsyelhjw68o96flxtdqcxrbyj6uy1hi0fxa5s31k0ham59dnkm5bu7ul6kc8sb3wbkm1f2j5w0vz27el22okm2jh5gsks0qdio3fyyifcoa65juklhr032bu84pob8hjqj28d3qzb8cng9u5n4nyrfqouspto1k',
                channelName: 'ncyez9gboch23vshc25ilizyaijhtyipjp3nz4wp84ohnurfwr3vz6bz36n3a722ck9nnos030zhooota5qbjz3427b9we73jeuigmuxi7c8ylu6exvgl4i3jsw0su141vdpqy4m4nb22x3y2iovsuyha1xjjbcw',
                flowParty: '0rx1bjxwqswlz2opn5lua2c8kl4w5ofok0730ypp867pi449reoe4g9ci69y5m1gl15azjhrikikrnwdy687ndoidz3qh0z5ep80ed6rwoq977zttg4ufwls9kwv55vlt7d1236iqgnlfasca2l7sgrqabp87x3o',
                flowComponent: '5jm8ic7obbcofocp1ezvn7ng6wyxkk404k4ssl4fn7dc5ywidjz1u5q1yrqqfa1dswjoo3l3rx2lxue2fgnujr9gbeaezy279101s1qeq2929zw7kn7v06dqqiubmbkfxhnjs94z1dfosga1ivtz4w7y4k0xa29d',
                flowInterfaceName: 'lno8xb3v1lvoq8cac29sgx4q6hozi81d1xp70xlgmli8zhbko4wr608oh9emb5letxn05icevjsqwk5h1rm5effl4ko9i8tfplx2j12o0ve4yp6p6zx83fhu6pzvkr5xgowc4xussm42w7g2ns6hkiaa1hlbwbia',
                flowInterfaceNamespace: 'p8ha19g832gu4y4h8bnqnnvstfwcc7w5ln38fzne2gvb0r4uzke9gjbure08jqcjl441tk8y24vz2v3m2kb3hwjxbtwvuhfiid4lid980fql8f9eb14jltpi44mtochngqivqq9v3o768oev51e3anul5f23062h',
                parameterGroup: '82rg7vjqonmscdvd4ajl39k0p7slao3bjwlcks368tkijho8hf1nv6md89c7nvzk4tn2wywy9i1hq9fa3f5vrye3qo8fvcwcw6p9cf6rn7ru8txv4u25c0ju9rwpqw0szfuslceakrti2u01zjiy9bdwye2s8a121bhupe7xwz38rxuvg06r1jxtq2f8hz3qgynzucjky8zgz5x8mzcjr6q4n7n4ehw3c9nfr4euotb5kij97nxhkbl5supg96s',
                name: 'nf9lcrrn7r4c03seux3qwusgw47gv2flh2t1mjkv881x04klwx778drgpcil7l6jccgobactpt3prk07l3n911up7u35ava4rtpghbgbvzqiofm6cumiuddspgmqrbko7km79640p7ve15e10w7auqw9zvzw4zzmcuty5l7k3zcgy6q92uw1wwr3ql21h105i5nfox6a1ftn3j4j5x2ue8bnb7n3fq34u488pn0xg0lknd532ybybipydbjvqtz9s347w6k9fafrchqenpxhxb2rkvstxq4vshgi8i2s0xdqkarg3v9htb00c69unw3l6',
                parameterName: 'e6fe5wfsrfesr3ywyg36pyods74ztvfjzxsvt0badbxn62mhwvknvxn2unrrxvlmdq2v1a2pu8a9sjnvsa6j6t9fji571z7d6egf9v6unilxs0b8ixoccob32yt2g99uzbwajscxod7xs3s44nb3zrgm9lmzs5n1hyu4zp2at469n0wciktpftbt7zgg5wl4kfmsnle0xxv12f8a08mzz0pkjtfwyhq0685o6plq7vc16yr0pcommqdb7z62bactcp5bgmlijf97frb09me1k6v8aqggo7rhaf4btjfa1hukjkvqlonbi7zz6ned4vfm',
                parameterValue: 'vsqk9c0bm0aokffws3cu3q09wlleicxzv24ub25lse5q67d6j8zmrnslunsqb3t9pdlhot6dfv76yvm56jeti6kyp6fyeugdno2enmwncvmu5643t4711c8gzykzui3n0z1efksbg8irxvwtyss8vxqc3uf30prx8dsvbbni2qeyty6tfg3yy5qua7wyvp3xisqz0bsqdk6atiek0c628jw70czwgbziv9ealgoxaoqftcgolzejaha8aify0arbdgyax8s2p7kiwy261oie7kl3ikt0u3mlk5sugnjxkliuy66ldahra305vfx8b4ly96qll1lllf94kixwkodsycdltroh58eudaumo6umificvqfkmzry3cflayo3wxy4ygo7ivwoe5tzcglkqnwjpi8pip5a6vdvovg0rs63udknjsq6ib2jaqhq9anhmdogql479l78kx2ze53i5gr5lid4z1orhr14nczhgmhiq8qyh8nf6of69mdkpxg8bxkrltdtesdvn7d09p4momdw4xquigi1qvj6td5gr36l9xdrc8ncrcxet85edvtx33x78gv781n9bstp17rb02d1mbmjq1oyojfjrpthfex2t53y224ylc1rm3c28l8lw36deyn6ijjsx1yfm0efv6qsxkn5f7oy2ma1s28quyg6a86ky1uoju09c0xtwqxb5xc50gg59fq9jc3idfjqhpmlnq06grxpymfabhubd4jt0q0aatefaat5t2knx5fi9czr1qrqo9ft3eop189f9aan09yisp2cqc34ec5eygtqsgqrzt6pbcwbcokhtwhsngdqdzhig98uef67sqxjx6c22attpidv5hwq6u6u3ldw3sn95y7az106fqwttcjzp87m9nd9rr8lffqpuo8vnbc8efvp8j3rt2fbepttkgx7dyyxizc8lwyyib7kv2r10g3bz29pjqt1iau4a1ix8nntn37idz2mljj1suo11nzz0epla7esmztrej6ide6m6zud',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'nara6rmandvhjnq6nibk',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'nyz9cg25ay91v8bjxsm20bfoogub7kj6l46a1joc5jsuk3h6i2lf2iv7yki5jtyfy9af0vutm69q24h5h8ohi5euw0wz4wvjie6h9qkob71ra7ttktfiitut2k1lixxw1zol43cyazyxihy3amgv2mforjj9hvyb',
                channelComponent: '421cs7bkf290888t73x0th4jsl1dvo9ogah1zowjwszqqm3n55jro8x1nkgfmzk0mk4e6wsl2rbow60qc3vvctdlz6as3nkhk5zjquhogreg8babl0blzu2nomd28e27bfkhtmt1c3dawhj22tmeik4tbiw1acjj',
                channelName: 'ssa87lgc0z7jtsvxt38gear7kyonyi7yewcu8ufq7e8xj4lh8vp8gckvec5b3rv54nikp8omkqu9e8hl1w4cbfcjhlhjygv91ac9g8ewmhw7tbv5grtsooetzo3oea0wwxhhcy5wrbck2u8smd6ufti42eys8glr',
                flowParty: '47uayl17rg5fft6ufp5xo9lvfxfurqsd91t2wkhngxh4ye5rc3lczch5hxcrlalznr8g8q8nplqymbz1fqo3h0k9pn5q81x83pb6g9t3fqxed63u8lz32y48y7u843dwendw46reslg9n6inykxxxcai6t048sga',
                flowComponent: 'rk6x5z9r05lblc8nndp5m9y76in7regmwo2nilsifluej8x7z8sjdsipb31evrqezmi0vybjtwbrmprovhjl9i3jxyd9ab7fxoq26bn9la47v8l9u4wxj6ljno5mzh23a8ae9jkt9gmrk2oy4aqjf6vg3ktocfvl',
                flowInterfaceName: 'p5r43n73aykuir5n07g55zxe5bsngqy91glrxh4mwpk6jeoagavm89p5fniq474n0zccygrw7j74ttfg26i6vlyhatl2kjyw8jl3rib0m7agpswzsz2aaem3wwcmlhpji3s4l8u5g02iscpg1u4qrroz17i225ci',
                flowInterfaceNamespace: 'ni8hwihydcpihru0vkxi57h72vocs1q74cconsd0jghw8vt1hi9ka2ym3vgkkpvupobksez935q0kdzq3l5oq353q4swtg7glu1gt67zlnkfy04wsjaanjms7r8bzzp02qj858atjq7d8k5exr514qch2vpq4tve',
                parameterGroup: 'f1ku79kwwn3h1aclsrh6hs6hd5ke02w55ig7pxzqsrn0wth0zbzno4qx5bsyinmgty1skbunor87h2trlh7klf2x0k83nfl3bqz0bbset49sonouweyzne2lk1jev36divqw2307banwbh4bfsozt803ybb8n8f902quhhqek47gdoio11jqrydqj6f4nv470pkwl7pl0x8lc9xckmi2bc8c18mq5owalawfp9wrrfv07omb5tdiiph8qcfwl56',
                name: 'pdivfsqj80ml5el0af2m6owoeijm9y8iw0kzc4ubdb5v5a4w4u2zoxi1412cefaqtdvg8a1yw3p3ihs10vlm43jnlhmpe38wijbetg7gyrudf636g1y9a11snuxeuczcjs7h8x5jpw1toafwgg1xzw36exj96etkgg4abmxuxe4g8qnbwqjh6xhc3y4ila9zs8mr2zgauhflex3g191qtcb5walzujj28q48gtur6e9hqiexak2eplvmt8258wjlo7ar6k8y3o3vctjsxyahlrl3k2ov9e1vmxt7h8kwq8je7h7p8161088llj8q02i9',
                parameterName: 'tnvckmw1p804yc62oqbwoausktra7rwvwwjjwgshwony3xw0cug25s1yv22nutarmqq1kxuozmpz5x41q59ijcp1aid8mfkvgfjjeqopkjgefb4xt42347hf4cllmg7s9scvr0shmb073gx5ey1mh8q1vpalxxn6ean3hsc8q7850wuwsotk78b5qrcxf457jylaknyivfecdstmktrerd3ifllo37a3fj0rmiw36fgzeyut84l4u3hm52tgroxn4taadrgta5a69fgshy5oaf07j2h5q7ybuui3ewid8oipuvya3s3lpznd1opqwxb2e',
                parameterValue: 'eguzqk6ic0vum5krwo6qjs1lw6eu5t22ql7vd7c4lbgpd33gyuuanfff6ilgd2ettyjdjnzw25ijto2nns5r0ik7fl7sfey1tbwg619jyny1wz75nc9hkm83zz7bh1r6foav25rdyu6tfx31nxmnmwudgy09wijf3h2ved1ol3jlpqlmmrgae0grsi02rfc9okmxr7mjkjy4s8hvvmmizg8uomv7xz9xwcg5qaqa3gg06a1amzth8302bh07hlt36tny7dgbt6h1kyoptmsl0cxa2reb3rgmeshplce2wi954k6sgv26ef2agqjk216fg3i6fab4k6hk67unqzdjck8jf26mmljvagtnvwmj0oezwtcdbjdi0dg3k3agh39zvbbxip8zy4yap3934pad4i2mx0ifhl3j79dqulhzr0aafmstj5xm3ock0kxkk5i5bcjg9ugnk2cfqtkk2md9rl5cquri82xquevcpy3zbo0rstxumi0x3fwdvcdrxo13qs7uyurnzfqbdm9addjr6ymk84d2po8tcn16rk4765ah5p5fae0s5apsslg07ducnis7lpz2ypmf5ydmvuxp05u89b5yp6ihf0hlg8evzquw3t2nt548g2dab5hsud8gjow4hf954xhnhf4b84la5n5tm1gkkzmp0txp3ovdwrgkzznlwd4ezuualr382wk7f7wr32opbsgt2j8qkfwj9boy0dpmcyqltinyvs3xjdcu5lcewwi8a1sq82gqdg6yumz3m9m5xxh6amds3d0082p7x6qas0jxxevjm0r3kyq4fk0q62e8qlnrk9pu0uc8pk67oiwz9hx95o5s8e53qa2woi0bwbghlasnfg8nythuarw3707p3jwncdawj5vuvikpob7rozs9va8ne3ny32q2b3op4b6t9ntlz0ehmavcmjxbfot54h9tbgaagko39kphf9utbzrdqlk1k408i26cj92gnfypo0ev3h4tu9z7ex0iq52tmykiolfs540p',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: '0jp1o78ggy5cd9brrrnw',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'gon6t26zx7wkr3i8velt0ie0f8vwrbn55iolzbkl7dd8zg3d7v1qi3sxpqpr31acmf1lc5xkcvncc4al1uwxcm7ymjs7vt8bgbrlwwmofqhhfr67oinp25pv5zzhttqhbue2trxtvfr514mb3dmdwn7sd8q0c2y0',
                channelComponent: 'iz2kuews0g3s88mr4kb3fev3zoyx5hxjqbk56jge1yaix5ob06ier44jpeuhd83z40itlu2qw2awrtp7lrtwoz7wtsti0urivkhmvgxwjea0k0m7svu08hrm3m4n80wu5azvghvxcewguzlitjnpnckt0g82yc42',
                channelName: 'xg2s5gl8hhqrsw50yyusm4s5tfppv0ewqr8ec8pufrdoy9qoatpbspnwv2uekkns3s279vwimntwkmdui0o0x99eeek1btpyx88p6arudw3naaull86ophejqpoiuuzpq71uu21ydbwhwho7mh6wu798e4by9h5x',
                flowParty: 'ecjnxbw9fq45s1cepee9x70ah93e9365krfdktc9r55hmeemnyyh4tth748e4u7wu4m1xzk4g62lv0dr6lr89n9a74cp8gzlx06ql095mhtlrtdyetd7gkbssjiscpdt76wjw3n38jm5noxzvffzkla06db2a6ys',
                flowComponent: 'sk67unvkk5yr698ihm91ucqidsesi8pexw4mympduz88u0docdf9nqapgxbedpp3l6a14l3hcqka7o3xtc5ck507qh2i3i7lfkvcip3ohzxyc1vjavfwzg7v71wwhhc287zt4rxjqijchwp0bk2jowfk3xdl7xgx',
                flowInterfaceName: 'k9882qo8zekgyt0m3n5xvess2aitus7rsqt2l8j8ptskrqh5nbk5yep7grspob4gzd7n5wo0adjnqeb7txw3gpoajujjkge4v2jdw30ho06ezkfyw0stfds7k1ejyioggz602teia7d9umien35lvt4nq5pjqoi6',
                flowInterfaceNamespace: '5ewk1h5wjy01lzpsg08ev6ixqbwcfqxrn7s8b7lxid202lqttl86u65g9pocjqug7547xkh0i4viq9nz36gwcbyldb4wqsmsbmeotrwmt0llo3s9upj6dfigslhmhfhcdtai74kkc6fgp4myzj22cieiht1avpkv',
                parameterGroup: 'jbcjhx5y8czbvd1dk41qpja04wtun0eu2xj28enkf952vw0o4f3t7fd3h0vc68lcbsn5162wkygs6nhd2p800aww7jgjegfj3do3a5ujax9a3nq5zd9mzqqbtr8up5d6t24n2ivnca0z6e5sj6ln4cnu426etn1j41ga6y3iuxfohwaovm6yu6m668wwiejvc6jjd8gpg54mwks8570f2f7rqqiwkh1ythdjaj84d0gmxxwuf5gegi9tsf1qqek',
                name: 'qba6jlljf9y2ohl1fxgzlmskz98cfjxrvc1c2in073rxkvjztp6oarqne578eouy6yu9x2vpb9jzsoaza1ikq04gujzmw6dwix1f80dsstkcnafzkitkj1y17c4t1c4h3aqkad2mp13c1emf9oe4wngjfa32hui6ry7mreb9tpk3vxkomr0gv6mvjtgbg3g472hmmk1ysdhhju8zqf26k61rplvzvie8t4nex73kf797l6q9eaogstvv750urtyg3fnw7grful8k6bdx85fxwohjhinsuru87xvsrc8aq98mjs4fqqblf0pazy596cg1',
                parameterName: 'bigs4psc4475joq4f6u43v7htde8g3cxdwd6vxmv66mznct88nfsu0ycgljwc2skz9ua8zud4n805bxwb6hkoxcjpc8cvlos8gk8yn9h07jmffrffsnkkx5729f96dzvfic0q2imrrn6tjijpu2y42cbsu3h52cvolvgs6aavthz8qh1ux5vv3asjxpvdv8rhnb33skg2ul2knp6r1zm3cr11rhimpjpwau65qyoqbv8f7l9xzgxajzys6xnfgwavfqbetd7f8xy25x8g50kt6ot5099bdhv3nuilfap0k40a0rklo92zyl8qcsd0coe',
                parameterValue: '6kunzugdm69d0i9tgvr9m04vduvmc7sfcz8dtzbtkl4lstww6na2qxf4pthb9zh0rnazhi3qnestnh5j4lwsiado3y1asqs69uk3550f9f65rv1mvkpz9qlo7zpz69g2lcdg121qjjecla2a7o8toxeru96uwhclt9mkrfcta5fjz7h4szn9z3ujq3pk2j3pyduk3jnl1wa7czzlxbto461sg8z9pj3kcmt1gcy6p30t6dp4jee7heibkc1bmen56uew8zbikus2nti7sa41zhud37txs46g3v6d33840p6yllddv1fuzo9n5qhp73ffmi0a8oj6myaz240ge7jp9n5a6o77biaxr3miyfqjmz015khrppgd20s0h7pwt4s4dtdibcdeo2mjwiuv1j3j8f9303v5lfecwwgtcl0iyluubikoy38vwew163u9syhaomau021zv25ypk4ckw0nau4v4em33aqq8evlsewamnisgdod00erhkp0yc84j1satwzxfvo0l46fam6er0ur41c3ds9qihxr5nsulelqzeyir1bjhncop7ikld3fza5a0tkdhmo28z1xr1jwgf7s5rvx2mgg3p4nxxkvcpwxt21r20ii3hu0p5db0o5hk45ukcwu97ydxauwexle8xvstc76064dos5f6ee815vqmb2kfmekloqdid1lkpnfgfvxwzos08kxvgao9z0y3fgq0lvgk0o7cirwfvtde4x948hwab6b223abqn1qqvvnf51ljddp0n1paiba0k57bbx0qosaleicc92sjxjl5nos9njhofdpf1bxdztchfk9pnmvpme57sx3y0w2nanae7eev7sdkc7duybo2e2lkgpft7uwjntjgdsxcmslrg23fb19i5o55w2vre3c73m53f8p1cpd7oa2mlt3pzzb0hu9oavqw3lddhx7xvjcg76k21h1k28cvo5eho4lm4h8pt2ic8l4rxbs9a40mh9fwtstc2xfc5c1k6rrx6zpvxb5sd6t',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 1024');
            });
    });
    

    

    

    

    

    

    it(`/REST:POST bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'qpffbrefmhki87m2vydf',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 't9zl18j7ph9qzzbe261l543u78jn19cx78gy3gzj1qy8snetc1wvp97ixwazyx2xhgxxrd60b5lxunekd38lfagbxneb5i69a6cfouesu2c9yid5ld8knpixdgzrulwgu4ccsu0jpd7dpqh1nzn72hl0o0b5tfdb',
                channelComponent: 'hll764kwd0ctn3d3scn7v6rc242c97oidk6ghmmf9lcmsb8ly8q27hy6r77euucbghb5foppvzxfas1uvhy2kg04memyg45rkqjv7uuiiv84jcrh81nxlz77ytze4sdaemdh9ojaz01me55n7x254ob2vlaub2ed',
                channelName: 'wcyuf30s0fe29urqqfrcokkbjt7t0lr7r1keblb43fycj6lf9q0q4qa4obgzwnhxoxujltkkcvybw6e3wcnvekkw4gjnwvsvlj6ryx7h0cexgzvmk32vw5ysncullfq2svqeq1ywjlbfone5rq1wcmjefrjwvb4e',
                flowParty: 'axq5pzhmyiqrseqobpqiafyjm6sn4y1g1eyoek987ep7odesjns7bkyssatu09szb9h30w9uttncecrluzbxhyqmaxcrr509fuee8xyjxemla6n2g85muqg88hqo6cv60mclrhrsj6a7mxcbr9i7huhy4g9op6or',
                flowComponent: 'hd8mxlnyl1nz0wacry8zizc2rg3l37vvboxhhm1vj2e7y9shle3o37vvs11vamy076cj5ba9h2954jut60wkojp8kyrxcqu65tdrtumc1ktn53d8yb2wwl7uezk2eafxdctmauo71f4246sltr3gzc5h8vydy9n5',
                flowInterfaceName: 'vjeuwf5p564r6m909uvdwlxbk2dgi45m29l3kp4c9x1bz8w9nik3rmsr9k427acmehcti3wu8e2v27ec3takmcq8tkommt72hvtn3pq9rqznhpmknfwoec8f40ob3llo4lxarslc0dldbiu8gllnq8zx87vp9ipu',
                flowInterfaceNamespace: 'fawdtp854ijjtfo4n2ron4yr3q5s7dilfv468sih3sz7y69eg734vi9asqiyminngomysmsp45ly20jh0l9t9jey2cy4q2y0e9lkgompfq5praewfjd6shwptpzcc0vqsptmcbrqm6ujvax43zimjzul23ets9zt',
                parameterGroup: '67ijl8lj7rzl6w7lww2ajnu15zoz1k8enjoqy199alsi75jryh8m2istsry8v5mi6jrdz07w859xi022h2952dpn88a5nsqf6y8l53ubnf8a5vgp9m2dteoakbtxg68fvruihb5sencsxabq21qdlvr7o885113tmilknd4zvw43qg73ym2meg2mhsickov0ompfd1wcxec0cnejeikvmw41pkard27giugzjn2ck18ldtwxq8d7atxjdvygq2h',
                name: '4zr9zkfnc0fdph8p7tkhzwcezy2bhka8r19sf2jwnyr6e0qqyj557l0v28zzk4d3yi0dst61pxxfsuvdqfgc3ywnerjwqdzv8pf1n0rlcw2t74z7y8cahq6ye7qokd02ov1yr4i7wqxrzs9yzbg6msqxngkpi6ausofbx52jtn0w0xobirt2rx71mujelcegexupcl4xqenuuk9mszihyq7707myd3kmt6a59cyulsh3vpl2c75uemd2ge5jyfh745k8d2zapn0x9b8u05xce8csy2ewy61ex1fvss4vsjch7f1gic52itzso9832i3c',
                parameterName: 'vhtaeupeapnvus5jqy9af955odnda15k0lbmk853ego35zvvgz31zi1b3ko6cvcqscl4klnap51x6pmze2c2sepbe1od4l61h3n2w5rn3i1fine4916sprzkb58m5s8xgat37j64zm8usx9ackyqg7i9mp3whe6pct5zwv98c5q32rs7fai1iyhijllorigas0wcvoqodrrtsbhny4klce4hgokpyh71sqik9p6yi9p8jz7qnrijwwmqy0vyg4k5q4hctsb596jicatcaigtjk1lqmouogwunq3i9akwiqfau59ef7fimiy5umrdvxdj',
                parameterValue: 'vcjrr3aka7t2fooxvbqxnnzviz7vs30wtj4ryajxakqmv6fosrs1f60vip8wkodnzbxbttgchhkgclr5qs3uuu05zhb2o1hl65zvqduile9iwl6zm375km49swhnrb1wgrjknw9dpt8snqvur1890xg3n0axu3ldb9gl8bmlmjatbjwd2mcrxqj09w5wz29iswzeexyo31ohb3luzk0lk2emtkf5ngx390qzse6ml0eqe6u8dtb08r11lt01ha4vb66b40lvqn9wr6qr4fvclp1gmppgaq2tfbht20dqxawqs2kmvicmrfcn316a0cez4rgts3wt9l306bpzoziw3nsbefiwl6tzudawa73bk239gcvs4lnuzdekfxou72els2agj9p1wolhero4m3dkajzvpyiyuy4pq7mc70as33zpk0e79khfiinpg0t6coatrc0hu0otqdb10r1uw9qzw1jsxq4iqqw7sw7qi86tpw3n0mz5qeawzldeqg3u8t9oeodya3jm1uidallemtd75rg61qbcxmhlxir5djcgq45uhgcx797ixxx5pkmxm4fjhaauolrkkerxgnpcwndwh3lbnpo5r3dmjxcm46d1xv9wjm37ai4dtvk9sflgh4n2ofqbexpt2fb2q8z0g615brhdshhlgixny16hs7tgxbuyc4jgo2t0a5wbslbt8j3qxmrh7w5nborjkicd5qvwn6zp0hxsdkrqem11chz3ty8nxwvfegzebytgwgskg3sc5kd6my9l83zzvz8ma9x991l7yu18wkwhxdex511wtii5c6qlyf8lmao91jugq7b6p9zwh057stpgn2ygjnxitpqn3n745jatr41yanyw73mbf3scfssxhfm7alu0439ty6hzgp0yyj9okhmkhzgkxnzyhazogf1ynhwdc3u8c78k4aaslazkqiff7ebzcxp85hoapkdu8umqighhg1pvi7odewz5o3zpiu7118w395fh4w4c0nox3yorxwe12azk',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/modules/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/module - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/module`, () => 
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
                        value   : 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53'));
    });

    it(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/e2f1f5c8-e585-4398-adbe-bc6c81a60d53')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53'));
    });

    it(`/REST:GET bplus-it-sappi/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '313de3f4-c9cd-4703-b558-93ec55f4fbb2',
                tenantId: '735a41ea-b705-4c10-bf99-57b6503a36ee',
                systemId: 'c99e9f78-66a9-4a56-88ba-5b5ea03396bd',
                systemName: '922l2tlsot1ecm3t999w',
                channelId: '7b1cc14e-7c63-4004-a21e-81d5a770db2c',
                channelParty: '79qcgwl51t2c50cuogx1pfyqd41phz3zqgxq19vpemluu33n395m4vyr10s3h29zq739acyjnurbanesop15phwey8twbxzdusvbmrbdscg4pnvbv7lwpbi34yo4pkh94nv0bxlep03jtdv3qgivt4p6it7dv8ze',
                channelComponent: '0k7jde407em7swic5u8lcyrgji6ro6px4zbwamrt0vefe9lpf4uxm2bwr4zjhyguhgma2jid5myf0mddu67vk8fwrd8k9hlynal5azzg477fdg5ayb6zsp6vxbolbv4ch4uatni0sch98g5our066mu4off4005e',
                channelName: 'hk7148wmzhxfpzfipg64l1lfxr220775th0cmmv9rvsw6z1kpbb2rhy45206dlov22bkpt8bpxz4vj2u41dwu63hjfxkhx70frlutjorxdlfbru96u4i4sigz3b5fpcpl0e7ingcd3t56jsqaklrhkzgujwx0izo',
                flowParty: 'rzkudgme79tpskspjrc28uhskzytpl01o6e8v83ttxeg1ogi3nvylje0usqb0q4z1u6b8y9v2qmtetrbbi6y6rlb40x0snbzigt29aeuwghfuuoofpevqg15tmbmq7iidclogt4rs4hhf527frfxm415qxjmemvl',
                flowComponent: 'vprgwy2vk2n8mpbivndw9oyqhzvsge38c1x4nwv6rnp0a0i2d9mtv62zxdmw5evlxd7l3so3dnx4kxe163n13ukm3hc4gzhnfd4tmel59dduv0oll7e8lldbgb8inbv1w6i319gsxah3jrhgj5djvzhjc8rb4gtq',
                flowInterfaceName: 'zg08dlzq35476fs1p1jwhy6qewt4zpham8hnacss4cjydymwu2micvtdk8fmc6ggxfinf9afxo708jph2wschyazroo6oto9h7hg0wg1zjw4b9e920zg03n53p9pjlizgfkqwtyv9z389bc89xivvc7e6fs8oz61',
                flowInterfaceNamespace: 'vjqa05998uze5ik848bqplqji4p8ejxs37gfrbg73o3injpv8zy30pvz3za1sbpy6rk5zoyd5ut5c58cnjk639m909wpslwqh7qidbp3kfvtzdnyx9tt9975lf0jnbkyvc9ajw7pyjoreq849el3iptwtl55b69x',
                parameterGroup: '00kbarsiympvmeydawjj6srswo25m9l5w0jbnj631jb07u8fj80k1w2jsirp3lsmlhwwuih8w56d4h1v7k0d8g2e5z9plvph3mt9xz8c3kcx3dfefyvvfsh77py9uf8n5vc2zjwy8v23tyml2gkhti6bigjnrbim0lp466cecwd1vzannxtrtgjyttzvflwzilpkvtxyz6foklnovm2its54nzfx0c1zwowffmsju6tlk07z1fc1ae6lkuv4n5k',
                name: 'm6c2y1x4r50a5jfc2d1oqu6xekahje364q575dbsszlmbtyd80ocjdk488mhw0tp5g5qmr7f2w7infva6wtvlaasdk7uc1w8afm6sg7csic07u06u3vi9kw5narhco2bsymu70gwi1h8nlit3cv2310gtek4oip0552z52k7w1zbyiqi4998wkmrl5nd05rxza8ab4gq7bgyloznninnuv7dblbbzdvsxsvbzam2zfb9vw6rwz0uqj8nxp9odyj6t3l3i3u80nrnskvy15xoh8h42h4qdfx1rg8bd6bmm66o94vzmr8kvu18yb0cka8i',
                parameterName: 'kzgqecdjwo963036mmcctc46sb338lfbtme0bf4iwika5mhkd3g30s7w1lqzua80a05k5h2fjimss9bj2oklt96x2a52r95cb9py7p2abprf6y02royn0wfeiueucf4plr7fm7h12y5f0o3lyxalmtkfwmdtuxanj1p3n9gsyo5h3varc09orduc4w4oayioa06i2cbn2bh4779dm4t5vsyg7979tyz969iz77fmh7q7y0vi9yqy54uv2qxzw1p5s25my0038mw2c9ii8uktg9s7tya1jich4682jk92of8wrovb1prj25vxt97pwd5q',
                parameterValue: 'nf5iu3tpzuq6jleevlsiqbns5h0e5bfhd25uxkxlcx3kebhjxuj1bmgw86ri1g5otvi8kz2yprr94pc33n8tdebmksi3uxyopwm4rzj0rzazi87k4dw7mcitfh6e460p83084foct9hyuirmjee4mcewktw59yjzdpbs2ey0rpsna80y7maxtdlf4g3c7ovuiwafznx2ap7w6nfo1wi7zg7rmxu9wio1m0gpgo9rec438pnduevdgzewymzkd1xr6rzhjx2xqpni83o2fz8amqd194azdu7o2asrjkh9ah6ycm6n2kmfmr07bsdtx4m3ac5f2hk5q970ddhl1qnroirxfyvmq987wf22pmwqp2dzl78vtibxudgdsim6qhzxcsjj29dppge955tt1dwa2j0ewme7s5hqlqok4icxv5r2t6x0m5d1e8dfc8ptihr9xem9ggfs2vi94ko23mdu8z4tuau1grtgt4kez9twu6x0zg94t86ossbn4qqjkixf02d0zoeq8ga8yzcwpi2kf2hcyzgq31lj3y1akcmbmobyh3x4yic36ej61xzuanbtnvhqcftycuzutahbh8s4zbzkqmy6oaihf3fgsueb29krczv3c35dltu9ud4n29zuxocvjqpyenhbgz5x2zlmvlapwuk1douwrgqq3ko5d4mk6nuq3f4l6tyxjfzky3xwbckfhad9ud4wcxr2m6jrbbesiy6fyxrboejxw6tfekk2gq744p0frtzqhfudf78a2cqbi1pa0jznf49ps3j513qjnarnv3fonzwg0tuuxmxoy1d6prs1ylcemnjae04niq0pzemnhn42wynhqx98v0fzxdyulemyeulb2u85daulo9rim015ns0elyy2gwoiennpfuqomtnqwu0vc6soidtvq0550hfwp6kit08y9gbzb72bf4s4l4vlf28oda4ax3bh9r8078l3yssdtxmndjehwezw60ujtv3f5ftsa6a5dbc4r803dw4vje722ncd',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                systemName: 'sfpq3lmstk0ultfri5z0',
                channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                channelParty: 'tsoyxoe2mhzftts5jbxwef6gex8wzdcgclydozag0qy1ho18zzhqp392zf9wgunmb5io8uts03tl1gvxgphv0jqvf2hzfkf8qb6vvfw9mfjx9uuhgqxm1zniq7keqxbvaoccg2zlp02jr2x8zeqrl12dixj0aqwd',
                channelComponent: 'b87g842yse1cmw4cz8axeu2c0bmzk4vwxijdkn3p2v9s6fdxt0l1mbphy5ef3h0rsrukbcs4o3e49d9zw4dzmamn68gx9ebdi76iah5a7exq5475yizwjqqp1iijum8bix5sxoajmta7ri4hebmdwufk8xi7cjg8',
                channelName: '3xmcmz7fbb9ka0yyx7azso0mr2mxjlre6abhvvspbym3w6vvmxrpqlr2ijpx3633tkiafkrzhh6a9cfhc6kubzt02jbtnszwfd6up2ljijqbqozp4vu4lvm8x2v1uk8tzt6wiehsx7f47hnhbytr9n0pj9xmr9wf',
                flowParty: 'wwf6hpm3akvwmcfel48i0b25xo7yxdwhghyglie9bwl7pwvgw27wwidvsph13w62w8lexvuh6ae3ghiawip0umb4mdk638kpjjrdei727tur1jomyeh6u95topdjojowuthh28sw3yld89b0nchueu1mi9b7s8pg',
                flowComponent: 'dgqi8ed6z7q2wwk2av1talrocrp0rqa45bcose45hen73fsgnl5gu459krv6ix1to8x2at1ccz12kmub9y844q52gdhjiz4bj96eufvs908y0k2zem5e7u9ztx9qs3nh46z07fiumfd23eifsw1d2pf7ahvkw5yd',
                flowInterfaceName: '7shq2g83lpyz54c4igrshxt473kat10tvu30e3etfhu5ybhtkebkpkl7tfynsq16o3nc3cfrw470kowekyr2mme07rauzewmhsfq146hms1enf3pdugg8nvw7a7vuatydhz2p3wmtf8aags4h6unhpd1mj33fhs1',
                flowInterfaceNamespace: 'jsxicpktvmu75p21g5ur0bbyaavsnpmmt53ye3azs8saof2cw8hwgw95kgjecctyyjjhwc2mdwxpaz9ug2epykrf2g8qgpyto3hsu5gx8jdoo9fam4zuheld8kqr1jgf6hy1cf8bk1m27yrbj3kelc7ar50xy7hp',
                parameterGroup: 'pa010p3g03i4a9j7weue0e4tt6eustavdzqi2b2nwt37xah9dqj47p7qsf60l8bhsuuyrwhmlzk286uqxuien2xzwjh7gym1mm7lslhvhw5w3s3ff8b8fzwk32b6txzbyxfvse77sjiyh3dk6ob5lob1njbauh839ardujom4kth716y58xpqmbbfjx6r0jrta949dctlmqh8e43wijwm0zv6092b3gnf2r7u9q5ns1div66nwiuiedfldgr6zr',
                name: 'yingxiyji8xt9zb68avj4xezhv020pundw551sckljgr9m3co2mm49d5f58c2yluwnblco5oz5g9vw9hbm8b3u858g6nfonzjuc7j5z0ts3rcadquxs3fo5z8orj95lsd2sucno7csluxdyp5mh2brf0ow1j5290xcsvtxy3ewt4p9ihliyklk1abf1i710i4yt9qqv56oomggcizu4n4lalpd4u0u3r336qo5c7su6rbns97v4k498vdnrwxy983j3eg7k9jphf4909ggy9at8c66t9rybb3q5vodq1luiuiz7dwpubgs332hss9bj7',
                parameterName: 'r255og1xscn6da4raih2c9j4rly00j7lo6js5rk7jkgsfhvij5sloz9hioidzxfcnot5m3xpk7f0k21gjfltsixtu5z3fzlhpia598m73irnvi16tcbzrzl6njkq7fbov863rzbqxgw6isof80ljl3obxdu55dhbk7r6hwi8ixj643r6f6fbg3hzpo2fluzo0d4a9idsovszeuvkrdpcabmhivuk2yd6dd0551wfq71eleelnblhvop8bbt8wfhngd9y7gc8r98of4eiqnvbl80bra7bluq6uw5qm96zpqqoy72ej6qrjjd138vs8m6f',
                parameterValue: '0503hu87uvpww2o8lnvgh2e5uzp6ulszdyotv9l2s6q66da6b57smicul6smni560xux54ysoxt9rwjhhria9p1ljm6ajl0t6dfv68nrh2wk7kbjvpmc5t9pi5693b0wexc21xszwswans36r4so1ulffekupjy783q2fzsl2d6d4oiwnnj91yxayf8x6qg2zmm50q9ksethn0ad9j6hoybpkt9sp5vb8qc7giroj6c4mvf2qpsi15vqkobreykrrg92xa85rf670pt0e2qqybmtrf8pkxe7rfbsh79bnkptej7nythz0xyni146nmjjy86du33s8x19nk6r1wvxvlh6qf0gffhp92hgk26a8antxpa8adpvqkfxgk42ae7hgjgqxt0imroa0i70j05eccu87ia6g14z4maiywlrh73lylce1xjsumr3iy4v47399pryzrk9s56axrf5jtnaoubdu7ntmq3lk70a105strcem34m4ox12s19stn5mn1bvyg2k8jxqgnasugq3di3cc3do2j7ixtnprkiokh6w9yjmmnvwquzrm48m1eab81cd1s49d95jg9mkv6gq5lzxcsmmr86woosw1uuw7mga5rs6iy787hhzyf4ihzx1y7n4la4bz3et2l47a607wnumxqbrekq1ztupxmzfha8uc1hzp0nmuijt1dctq4ruyxt9mhgul44qv35wu5tn2ow450ea2o83op8wghpc9evz2clr69wpcjl05wm0hsrnx102r1h4r33vc4eqfyxf6aph39hfsmntb5l7sw2bmgj68knssvek009gobx4wuztolwza36i60nx472df1lhunsf7auwukrvb0rwzsxxi518szcwkvxtej9lzidhgxmpqz1su6tkpa8dl6ir6gi79f28x7wy2lde35tg99pld4puo8f7i63vmrmckwdeky8hhqcap5wl4lr1319wnmk2sb0ezpvujyrus2qt4dzui3dfr2rqvblx9ue42ar85yy09zi',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53'));
    });

    it(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/e2f1f5c8-e585-4398-adbe-bc6c81a60d53')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateModule - Got 409 Conflict, item already exist in database`, () => 
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
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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

    it(`/GraphQL bplusItSappiCreateModule`, () => 
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
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        id: '63828d05-0853-4448-a583-1bad0cbd4b12',
                        tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                        systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                        systemName: '5dz9ka3ku00jumi0540s',
                        channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                        channelParty: 'l77sj34t7j62kvywihhpsvnqp0xrlimgfoqbcnmibdkeq3hyf88jp3p9g35npjovrrd1fipi9pkkspbjgseoohmepsoxrzw4wd4s5k19xtw9peci517pw0rcnipac8606exchs587cv4og4v1jt1a9v3vn26amxm',
                        channelComponent: 'h5ris7apgz5bstzfqu1qa8d9h8mtguqp5ayftonav53ub2ugymlvewxnrsnuy0a48zgsgmmkhi9j297x4nwfgtgejxw9y4ed9ve911v86pyr3tdfs7rfepbi3xyy2oqpizi5mukz59uhtsh2x91ia8qt7j8ye05d',
                        channelName: 'f2tx0q3to5wznxyltwz3un2ykq6v4y05bimgbo893s5zwrbuun5iql53yqlpb31oqgm6ovzq2jffmapze14o9kh782r8sip83hn2is6fau8hv2qhuh5z0ogh98ybkshzzo9pkoumoksufbnsyrgbv5j3tg4m2ruw',
                        flowParty: '3yhvzcnr93kheoo7dz3tdreobglelj8togd7xt2riqbggt6jsp75cnsahutzylqw1rdtphsp2vvapw6jnseat3sxd5qxuhqohcgpfeq24ibjtb69pgsrx2s1fpd8joftl8wfgdb8tjqajqgbokqm86r6e8tjbab1',
                        flowComponent: 'xjzpoylgudv6v25qb3izepdew2q12m8jou8agn0yuzfpg3d0eslxu5j15y02zk3l6fpeo4h5e7hwp8yl85yqwe2c48e2bkjeok3zsj7gfhvih0ut7kyo2nwg177pxpmiskjdtv148j54davo551atvea44napchb',
                        flowInterfaceName: 'obeh6r3jhs9jnjmonp7djrenfjh5zgnkcrzcu8osk6tuehkx3sq8aihfxkpwsxavmsg2tc7bfzc6v0gkd1c0eed1b0yt24ylqv3pqtd57lq7gdz5b6i1npfp7u37gntwy5r0b9frsm7ag6fruwn05ner55zb3a1r',
                        flowInterfaceNamespace: '8tweniqabdtcn61ml37b43ob03zdqfagfe8v4cs97bxojuotbxwi727zzwvdvkhbuwwbzuervkbk30tept7aavu3y1r0aq5p9crpci6wxggvorvygw90udjzqjz28pumg9aez5z64ckef5xyemxpdzw3xgktbzql',
                        parameterGroup: 'is0lvcv7pf46k1vtncdr50py3145s92sn4hiuhz13kydqkr3gx670nggykenh8guj8s48grroi0lj0g9c478nck14ymves44j4ulh1i3v2fp1ew5op69yxe0lvi6goe9mq9o8k8280zoq1baas26220j91u162b0frfsbqersn4t3lacn8ydrejg9yu5jrz6vtpia3fupti38els9voj1jgv4lv0bov1iw24tv1nw062serssn93oyfngiowop4',
                        name: '1xpm8sy461eb79j1p2zlz50g2d260zg5hur7hd2p5srbagdvwi7i46ohv76ans454l3choxwusqwvpt0xznpjj0sgjb70bxxzed07detafruuju773j8opbqq769ruytpj9g2y5nzqd4hm3x0yp6k0o8blyzw4jk7lz5frymclk2uuyybfbepszn091s3es1ilniqehg3b0xbi1z220zhhv67pu64md74eukfzf5xr3fqoehx5qzfey4qgp4mxywka3tupovo7m8cv4and8turdrkv3rmk3pajkydfpwmwjn8jypni48vq50jqvq00tn',
                        parameterName: 'ejp4faf5k9libzakld1bq0g5ymmmss041yq10kwcfdu9qqo2iu00qa7sdayfy86cqkgbm91ti55ta39tmyurjv37of6ci3ppdqxbsiddfvh8ns1wf4jkbv686rmo22llo5cy4fwx8hjd8wd3kcl40s5vav2s90eahipgsc5xuvv276w6qika6nk8bicglkpraxihibimc3pc3kbwtx4clstacgagk6zrp4ihr8cncb14qmrqny8c7wr1rigmx48b886rq6qq53i00392hpxnmxoudsy1loao0ryci7mb3klwe5y2846tmyg3dnq6kwix',
                        parameterValue: 'fvdipdygt86exbebi4iaxqa7bc8d7d040qtxzarxc8ku6n8xh8qqh00p33wxmxdu8cvbdvpl0fakxiorj2rexbsjq08brwdtm6qaq040cxsf7hafudeoqwufd114ubfas78uuha7kq2rr18udl2m5l7b9ir8hzm4ngpry3um3kntz9wqaq948hr2bww9u6mvzar3506ypycnfwsfsw772sfgvugyig0hgms2q98grgy4oi3lw01zc5vutasfifusmznphgsb6bk3h5965kjb6xosn3sw1pfb8rcj1v0j222ovboke4o4sew9d1uqcdzf3wbzkxt8wjyq3aaas9e2fs95j0crstq14o7rc61017zeakcu0iomzb4nq09vmtauhyzg84os6qb21h6kw7c6hdsk4hb18jxa1dbcdtbffwrin81hmwicgz42pvo28fncq0ejwpxf7zf4c01lp4ghonipijuxfi9zzf357x8t3nvo0ds8h57jdt42tl2a96v3cxjstnnfvt4fplso2you1jp1nh91ygs5qiajt5djn6832erw6bfqlb5r9li8cwjshg5k35ak0hu0ztvm7m2vl2ivor1k67eryymlveovab68q89y6auy0mhrx8ie4b4cz1v0iji9ufo3ieik4uom2dksq0i62s8ej97lm1okvg2hdj3olv3dlioz886ruukvsjctk5rjr6dislheiwxn6s4szj9d7w75sh8h5bfd4zwo8aazzstuo7d11zlxza0y2x1xokhyef9rzzr7jjqnu5cdt7r7v1wq62su1d617hg7uovfcsn1ebelypdhswnuq5alj1j88famj3ygy94p84x4d2p4b4c2ei3u1294dbk6x9u28f2niwbadqwpy1zgwkuk3z4jv05krqv5r9ybjkstc0gs450r2psa2o8djnyyph2tl0wnrw16njfqq6qmwu9s6ofxoevhn315h33o2pg6f3ldhp3dqvyolrosku0ic6njle8b6zvni65y6qr7',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '63828d05-0853-4448-a583-1bad0cbd4b12');
            });
    });

    it(`/GraphQL bplusItSappiPaginateModules`, () => 
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

    it(`/GraphQL bplusItSappiFindModule - Got 404 Not Found`, () => 
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
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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

    it(`/GraphQL bplusItSappiFindModule`, () => 
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
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                            value   : 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('e2f1f5c8-e585-4398-adbe-bc6c81a60d53');
            });
    });

    it(`/GraphQL bplusItSappiFindModuleById - Got 404 Not Found`, () => 
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
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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

    it(`/GraphQL bplusItSappiFindModuleById`, () => 
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
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                    id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('e2f1f5c8-e585-4398-adbe-bc6c81a60d53');
            });
    });

    it(`/GraphQL bplusItSappiGetModules`, () => 
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
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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

    it(`/GraphQL bplusItSappiUpdateModule - Got 404 Not Found`, () => 
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
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        
                        id: '789da6a6-3d4c-4e43-b5de-ceb93a193578',
                        tenantId: 'be322e48-66db-4332-a9a1-f7e8b23db8e6',
                        systemId: 'c442297b-0a01-4800-9a5f-eb988de6ad95',
                        systemName: '2wyag4qry2a4m73q0lch',
                        channelId: 'b0f5dc44-7c5c-4d31-82d8-7d037579ab5c',
                        channelParty: 'yx5w90tzds65ah5umt0q9j928py83pu48e67y7ypeupvk6x96cefnqxyvw1iyuk47a0w8rp3ze9x2wrqurq6i5dk2qk6ba7trvw27pllj9g6ysuwx55u5ezwfannh4ci46l5bo79amls6tt0oiwo0tt8c3y8w8e2',
                        channelComponent: 'agd8hgsumpkxkuc4jtc5fguyjfeydz5yh0d4hg3gqpsvw36ne6zwt2n5409itf8j4aw2cnwy0isrc6uox0jhg7jz20uhk0pv5v6zrmlvjsp4no2q6im1m2he06w7s0uyhw7t4y5w9rocef6c24vkvyr4eu83zaun',
                        channelName: 'b5c3txe3r37vghmt61ttoen9qnq6auak4w8j09npiul0gahxrhtverghthl2rw85tjo2l7xi4or8yu6ze0btj9n2e119lpj62zympa55zo5n4g6r39vvop5vmzl0i11hismuxejaaecirpcpix8g7xsa0lqd3ya9',
                        flowParty: 'dctc3dhjcp0zeza4m39yawisqbmr5rknuy1tlpqktkdkenfxvchhi78a4nlwfrzuw45inp61t2j83ntc2artst4km8e37hwkb3l4xjeyhcgc6getv86temvdst99q6c94k8jqhi2enrxvscbiyfc7bmp46916bus',
                        flowComponent: 'gfnc9f313283zttby7a6gk42onjsh0lhn67a6b4tge6t1yp94cpsxllgh3bonpefcridb8vhz1m2va5493x8d5a58fgr5hs2y42pgsa05xbmr5e6e4bgixnlbi024jhkkbelkczbfw57no5chgeqvjx5gxogjq4j',
                        flowInterfaceName: 'y68xuzgkf46fhj5rfgdza3f3i8q12kcjki1je4if9wxniwex3g6lsb0e5nh8casg7t8q25sniwc8o5mcouwyokck2r2siu4c46gobp02d4p7z4mtpt13ei02xqlxo0zcmwxmjp0i833tiv848frf0ck8fyjryiu3',
                        flowInterfaceNamespace: 'a28k4ydzjgyrd0qng7fe0oo7hpoohaxohf3f23gns6wpdu2e9v4bf6eql03esj7kehuuze2cyhhxyhqbwy5e8lu48smvxylfi5h2vf3vjz47n20tisjrc41kqndi92lzp8b1uo13kqpvc1l3uxnu2m54llvz3lul',
                        parameterGroup: '5cweuhx85m6qs41xokyohpoe874yrh483r8leds8j9g8bq4o89cw3njkrpc8shw2e5bxnajbe1wjwjfs2z8f1jxzyeuw4qikgpt83oybj6rxvv6pto8rbgckvfc3qp8vhuqrnai7etznbf3y58kht5yx8q64h3facymz5x7rgfkae6r3me856x71b97rc22p9cxr4j0m8q9wz821f4l53szsat6xjrrjz0skonyq978y1b6u5kdy62lp03uhhg3',
                        name: '5wufvqxx7m20opplele0hsspynt7duxx8uuyod8plje6nm8rx1ld230aio13tdr9nubz52tl2f8h4tg7voarfa4il0oirqiejcnzxcsv9jekm67552z9sjwzebod9a8m8fti9o75kbnbqkivmsr0aiptgmd2rc3rwbxyafj4yu93knf6lmkmti8h60qkr45z1e9tkng61uyhsa7e5bj4562xo7meg59il7elpyrg65mgkd6o4z1k0u66qrprd8cwzyt4tz8bx3vsff730enjqi0vmgimin945yfuepm5ulytyosadm50uwy2tqbvqjnl',
                        parameterName: 'pbisipacxa092tdr6zqw0ez0secd8ej7tz55rkkl8k6oxajbtfzc6c27zlwi64dmv44n6u6bpg99v9bkd12hlwuk1k74zpbxjvfp7kj5tyh52judgsmwsfujh3cysbiktqjnh8n1xtzzh3sb1h7ts9pee9es3ptw1it00fypbfi5bzb2b3469pcclp8cvg34kbs1lxjltxjjrezkcl70qgorr8bhrgabpktv0ucqo6wnnwdwauop88vtrgw81587zq6882riqxyppnbxronpdess3guizgp84w1yeka5x2s0hur8rv7lz3tswuon97cx',
                        parameterValue: 'tqxvz2dympg1c7phqam49maf3v4wzmaohslshtkhdqg75zdjz3s70o6zaz3gfxufbwtyuymm7pg80y6tnubw1yoi8wsnb3om33crt5zsvkxux995t10v00hp5y72aetclbqptqhh9vvf0l2291h81as74fapzw773k51io4o52gv1mzde1e7d0i1ahc7cyopogznrqa6suhee5e0kfti53dmak63neu0byhse1gh82rtuwojp7ehi8c8s5mw3hnhgbzk5lnegu72v6sgor6c3fwghoqcc72xlr10ofsy0kwj7iji30rgzpn1emfsf39sm4gqbpn20q9qkvixibvg0cxibdz5xe1edjmt8ju6nc4m5k59yqh8x6ejrvpkhmo1bcl39dm7enugq8tv2h1cdanpsr3exixkwyy1ozkg862q0jyoubb7pjov163jgy839z9jfaqluyugrz9ohp9hxdx393sd01c5u9pb6qiuvw51pq117xyf8sthj4oigrjtqwy4qwldbuh2xxqywur873hbahg0gkwwfu9dmivdnekoc3jow110jjxajsvamr3yayu9r61e58kv4vwydpvsb14e5zutbe5shyn6nvb1bv7bksx0t5xjkf11fb6phdc9kgjtqbw3wjg2kccc0eh2mwlsgseazae4juhqfp0qvt1egovzky662m78x3cy09lopnrogju6o0czqcmhkhazgw217ohbd7t6ajz44t5z299qhl80fg71bp6tdxfq41a2o05lvza3k9kcxclr86jk3qzavlqrnneyqvx0236dxffg6ev2seja51yaklukhz7qfj5r0o5laip0rqsgshkmvvw7mz9hwuiq7imgguzrggrq6hhydzn6acemocbbg23e1hg6rzmaep4nm0im4446zaobc05jc1x1fothyv3tyeqgav354tky74gcf1h52u21vn0anpgr6mvhk7iz1p8fg8b5rkqg83uyfb6atuui3iaxaj3hh44g1xxm01slzxe6',
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

    it(`/GraphQL bplusItSappiUpdateModule`, () => 
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
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                        
                        id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53',
                        tenantId: '34301028-4942-45fa-ac1a-80ee2764a9dc',
                        systemId: 'cc916bb1-7995-47be-8a93-30554c14395f',
                        systemName: 'm9kzamfbmyvvd9lrlnsj',
                        channelId: '8b95de32-4c8a-4f61-bdad-bd53890e1bff',
                        channelParty: 'o8oq2sck8lmt88h3zmfuecfr59w09cqyp90bspcx89xelckc7iu2p3kabt6np9plspcr4xirfl1sk0psp1zwn9xai9rz03bjdq5cvppe1ogww4qc1tucdc8x5bxms5909pd4m06tgq5gb6a1jsvkkruho9sspsfu',
                        channelComponent: 'dkk2a4pqs8h7ni6yti0xmfc3zlfre7yh7ngejffp9kk39zwcbymrd3k9ygkdnfd30e6bx44skkvspg5jt326c895az0owk2amieabu2c43gusfdj0zzyxniadg6xwnefon8m4x7g29vo51en1fgx21dtq4q50ppk',
                        channelName: 'b2ezu75a3caxme7abhf5hvsfzw0j6xo01hqnj3jkpq4tqldgjxzon5qd24y49xagb2s44ef9ok841v4dvxvox9yde6bhsx2xpiq47e54j3l8co8hellhudt8sxd4m4wb5krslntaisyznst0p6owc0c1kz8uxlbh',
                        flowParty: 'wk9ljxu39isbe5l8m3crjpaoig3stqqubs5i1hphjtt9ak7qcxfjy0jb7g2atanfex1v4x9i4l269pkmd75h85e7uj2lehijc8p1wr8foyn3lyihgdxrrr83j9j1paie475y2kqzrxxrcq81bdy0hqoa4086syqu',
                        flowComponent: '1p4vsdi0yebicz1d4r4ucckpk8pue8rmlmmp4rupejsd3tbek6j443m5jsvx71u253jaoj64lfjmxa210o8r4rm1myfiino914q4nk3y7iohv67bi8xj3zimahirtyvmum2g9llr2fdzfl8ayajgke8aat7s1e7w',
                        flowInterfaceName: 'dji91askgced3gs6ym8mmfykextyeurui31xbf8puu108y8i6lck2ewrep1mgs410qcxvpazf726id7lt6u97aftul56jid8txvxtdwvaxuq2a55t7y7lvsfdtyck9uyz33k7lijfga0s40dua76hrbw8ydeqrpm',
                        flowInterfaceNamespace: 'icf18s6t3hormnkraq47ayjco1b2f90n41ej9m03e476nvm7yxrvmn505ltz1wkkt9pjcv0stw9o4m34yvzz6z9l5lf3bhj5opr614dd5qrses8nx8dgmafkl5agpmbohp1rabmw9a93877o1txvx1pu97v2zwcg',
                        parameterGroup: 'ygdvzh0qvaoorvgo86ch42gmtkihhw0iaxc2yqfpkgvhhgmcjm0kzft05qy3kskr5us2n7srkps8i2k1rx09uotkqxjfdfrza7k499iquemtq82paaspd1qh12qzsu95dpabz384vrnqgibeel2udvgc6fmokzq833eukk4kpcb0hit0amlojubpc2ldbww8s1of2grnfcw2rkqaejd03cr7lmklzxilmgo7w9g3l2rfc3tk84gz3d2s88ooig0',
                        name: 'h7170uy7cd5fhtc598bk753k2cq5c4nptu89dkxq2i7dmfc35zdhmssv8504y2uqjhemmw0yc5oevxwsvf7d6yy8tdkmxd1i3xre9ef7orm4m19nqmpwf2wr9sfxb8cimwrcj797bpnv4eiicaynrymsprr1071oo7o9d7uosgud6zgflz3ywpm2ji4uznzalfwfc7gfu0hhopj6egjytxa8kdxd9l3t6ls3hk20x9ngz53bmnjhjstzuax51kmufdpok67vd4mg23hb9onjebmln9ogqwxqq1ti0xsa4c8wnoixri6hodopod70q5kp',
                        parameterName: 'rj9pdhdttbrboil44y5wknzq7gw8vglfahi8ze7sfp586rsvt2r1jtangyuhqc6nh86h2d4vq1fhvz20fa3m8ioyo53sjp9slrjgrvf0vj4wuro7omrgyyu06krkq47qzutd9naiaf6onnlwashvge4l5uzeewulgoc156gsvnhz217vcyrzk1t0pzdycmlsxlfzyjoxzmr5adskeibciurb3lhzkq00hznu91m8egfpsro35zopm7gthjhwu2dy5mp72aau2j6pbzd2h8lghue6royqtrljlhkcj1320gim6fglmj71pcnng00ongdo',
                        parameterValue: '6ujca8g0dccwzff7kqtjwm7bej6ph7o0jv0ts9fea4gxh200z8c87nae12qs9mfusdxr7k4nwpbaj50dc4oz10g5gc25ceexkh0go56td0gm7lr1buqlftca378tn7wim691xze0uq85hq2a25ggoigugcuar1pauv5ukyhdxy3diu4rx5x5akbh1boaeh922ars9a0yz1r3nx7yc3j1zrpm064njo30ouoftn2b5ogyexwymo5wbqzbx6amguu82tbsuekjemdgs0a43v50egvoii47xdf1uy17tlze1cqx6dow8phru51aq67qw3mdmyqv572tymmemymtemsrqirmkblze9dbes15wzby6tosm70u439x2vd2vi2ziyyogns0ipg2n3kr3tx0yjns4qhimhlu6yhgl92sqiwahu4sot9xb7t9pzfd80yiitwcpgpu0zzcfxqufyz5wym6crwvvyyi8mces8zyct8ow5wyq7rm4n055ibf0whyzy1tfdtrl4i2qj8npqr0yqntik8uylc6wxijwi580zjyaiufaklphodk09s7trxblrv2m214dwdcycv9pc8ukzzf62tod2zlv5x8wvls2d3rn0cpzn5w1u2ji11hjjtpco5vc3p847npmmytjxkrft2ok41cb3loeqlgxdwviym2xpz71i2fl4b8omu7g9a0vlt2os174dpgnj5xtkvxstj9x3om30szcnj5xkrecy4ps89wadm5v3oaz334tw73vbxdlecghiyq6r84rqmmh4h4r752ghlt1e7ro96h9qv2ebjc85a94k26tnf2s5m9hzj79ww2knimxuanfwtz0pvtkkohnbv1p6ad17c7kuxk2eiaj1ft0wtpdbbezf9zf1vh6o1nyb7cfami2lbz3xyyein0ky5ajjhx15v9nhn37kuhhmpkcjxd4v15s10mkprm1din02a82ou9ijloxs74rs0ucpnf774nnw75olgu0xuqq1sgx0ke2qhyht4ew26u',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('e2f1f5c8-e585-4398-adbe-bc6c81a60d53');
            });
    });

    it(`/GraphQL bplusItSappiDeleteModuleById - Got 404 Not Found`, () => 
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
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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

    it(`/GraphQL bplusItSappiDeleteModuleById`, () => 
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
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
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
                    id: 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('e2f1f5c8-e585-4398-adbe-bc6c81a60d53');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});