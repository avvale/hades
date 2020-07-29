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
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: '4t8hi6th8wqszf9vgfzkmykp4r3hnnicr8e98w0sof68i2oqdz',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'r54u1ssiovbwjaoegkj1',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'bw4q1oj9k2qfw074l3790p7vfsahfdlmt5dd1n9k9ge8c5lfxrkg0mxs9wfrqlw97phb2kspyfmiud9ua1bp8lcbo1b52v8l26xsh2na5hf0iwrij8epn1a514cvew2ge7fglzvf3wu9ys9gev5wlyklayp58b5s',
                channelComponent: '9x7vcmjj7qab409bvq87rg46ydthy7hjd6ttiyx2f83pv9ibfa6nyehcgbsuw7tpia37e7w5wusj45t70x0e2iij3tg8cjvs7xfoscnb0058lmkd9l42cphfl3wckg7dgjroqqknwxlkhcyeslf86f8dm7mnw6ba',
                channelName: 'rzusgvhpekoby9wd5wm79qg8ywtcy9ckb70iyhltweelrhshhhb5xiep1lccj3zvn9ul01e7c5jk6bjc45jzxmicjzpjmac4zcokayzc4me9seqkukt2b36pjt0qrhgjjsvembx8v53isxnrlyl689dtoomlt0ei',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'nhvl3m8vr1owkawur5dm5pvx7kgjwe11otlsvctm1sy93a5ooz05snt5usj0uu2k02zcq5awi6wxtofp9za0f2j5ynar8fcbngd216gn5p0kf0upidqovv6mmx3igoq3rx1ybkbfr7ipce9knkxq5r7q4qiwort7',
                flowComponent: 'lg5sf022jz7tyf5xtrz8q18ztjwhu3qjd2zq7p9jmeqpphtol100dn88iyn8j1yqb5u9peztyx5m4xupiieiscp2x4ghvkbhk78sc3d5bmdx6s5kzsnz6snu81wdrdluyrnmspdn5gix8bwrgxema53o0bbwtd23',
                flowInterfaceName: '0961l1yss1hykgyxgy52dae5eidgin1u99hvh9oj8j4gtqavttbehneh17vhumobtycserw4kez4nk04p2h0qe42uq4na270n99kjfikvieiavqdcafnnj2x40nygo2t0wxd4aqzmjmlqscdx2pbogzoprbevprc',
                flowInterfaceNamespace: 'dzxg0jqg4h63qmbra79mg1bq4c856xhfir6x18xetbzmqg2hcqtq0ig4ex5vqlwlt2nhsof91ao8ki0nyd4vbrj1m0iaufaenx22hrupf81w18h0120sr7ek7a167qakvh0rdh36zm5e6ihddjov1imga9n0sfoo',
                version: 'ly0li7q6nfrp8w7qieyw',
                parameterGroup: '94ldy7l25qnad0cdnfpx4fj3iosu4k6m48orjed7cjgj2oolp7rpdwj8b9rhbaa63mg094hjc1tluixussijs574kx8isokyswmbpt4j2x1hds471h6tleljnml76imr9lrlpdm9y4e7st6yjf63qtfg2gvbv96h294w82qg5g5cxudf5d1hklf1pgw6fz1t8q3mb1ygev1uxsdiufyinyj9syvif97omhckgyrvnj2a7hot1znkh5adknnkkjl',
                name: 'x034rjv3ofb7tanu0z5me6girfmxfrlc51m1ecfx5w2v4nlksqomwlqbrzqeirlmiq92nyoam0hk5zm25fth26nvfkx552fpeoyw3qe3z5xvrocq6ad9o5bd0b7x58kzbtvpu4a1z4somguzzk2cnsodvetromtytq7co9y4he5pza7sn14loeir4q5idm68h4e3g1106ku2p802fgxltyj8f5oex0nxhnbmmyra3c9epw86ntwtirttdew5opc384ct9ca0z3u4iyq4ec42ioockqp809uiu019j7dfcxmhuoons51phah8nxz1v12z',
                parameterName: 'ert08218k7tsj1r1igywmtwhups1djew3fvxyts66v7w3wlazyn0ibxzvs0rm1wkpg2hrnkjltpyxgrj58x0i7efjw4y4lumreo1jdnokg5niukmu10lcg254nevwmksvorlwzql5lzszd5ivsq7ftxfzkb3iami0mso4dwol0pohr33eb1fl2mq26cmam3gpdfsrxqq4oomtr432hbe81cdrnbujnoj12o1g1rh69zomol0f72s2voe8xds1b0b42xo4y3v92azcfxaw7lh4w95sqsqrz4cp75im15goebprehb6qcq1czrzlbkpw96',
                parameterValue: 'gwnqttnteqyr2suxl25i57n69deqjl9v3p77akkkuhc6oyv590ta3z7kgroz2ao1h6tjhry82eiesv4zlxkm9r7tkrxha4zqiqovu0yajifka5jf8bw4go9r6p7ew7dl6hpw83nbpc65v1w3zwr3oe31tb4lx2nkndae9ugzpq5geis1pyfkwwvisahtlw73sml3052b8148e1jl4lhb2j9sbuvm833ihhaxmootdoza4ncff5wb9umff25wzlxe9uf3sylx0ytag1eba6ub1dqycr1247nabimeqjsamtjm0z67dqgbztni4fhnuikg0pexn62u31dm4lqv758gb4aala6yiixe1hqn0j62g94sflzs61cxp93jcrxdsn0l3hr2i4r1jlguzgtx6mer5z84j9ls4zsiuysemq1uryqa0znuqvq58g6jmmlf7q6j4v43p7ozmij4tgmagy136h2odmlvywxmxachvooks1ree1se57alobae9y4c5u9o9t4krca6njf7j98cnmmpdvkql97q1fput7kd4h4kho3fvs2670wp2fh2duozudet19zl0793zzm822pd4duvkv9dgi9cn5rdmnpd8dubvzvp11do907ugpurgmes8986m4pws5qo6tz7z0vyqu1qp5fqjj98utf65ccbs1eh82whlyhdw6vtwtbjz7ecso7n6nkavwdwtw3bifbraw1f6bvqjvautm10ue3fc2t4p2u7nnrwkgm6b9wecmd5by4n3dr3e99j4zhgayw5mibid80mgf8nk0h6n6pnezckunuuqojbx21kmwqisx7arngtjf7jx7sdz2i7mkonb7zj3nwwlxl9wishn32z76zrrnyj6i5zbmo1erkog5hy6jsfj3n5f72rnc1mh65p8bofohu3kg6gmrbocgdr7asm694xahwkqdeu9ligpdzivdlhivyxvtvook0vj8g5oljhc6q4xq100ll3td5ezeaa46ikejzhwks5d6jr94dhxjty',
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
                
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: '5l8kwb7alixm1oas1w8i9kum6exxb60hhkxj9lzlwivtfj8uco',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'yaglpe9741diouhxwjt9',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'n1edn8oixwvqf7rrkprbcqmzf7oyavt1ahvt976h3pvmje1qjzdsrw54gxx36ebn070utxev1mpx291dui5mrcnkybz8el4lpucw6bq2giz24aexgut8u5tjc8ley7zhynuh237kwswmvp45qep9iis4oi5vgsxw',
                channelComponent: 'sgsyexc0rlizz8kzedvmjyx1sve9b0lc992s3yoshxrktzoz87y0yfde9c0k39uj7askvlapkhlxu9ppv3k2pdgfd6ghq9e6ufj3yw64f6bm67i7e0au6q86vls2y5olvlcx1vejgijsxn0urkpdjyuys251rbs6',
                channelName: 'gnahwiuv4ok9ywh11o7e1q38azze233coa05ktgwrqvjj36munamwe5xwwawxs6jynyobpslkwoxcdj1xgc2x3geulv5kv4zccb3fxbe07izij4ihja9o8fazdn63w66xo7thyrwhzzblaesbur3tu4ku0q4ztc1',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'dcvrb1j5hlxmbhvqapdpsu3pyur80s650rm5m6dbmydryw5gtvsg7b2p91h261knh0h64ylwprzyxzeccqmlrkhtl2n6mybimci2hrgnwuip1pmcx4uwpu6tm1o07mpd6d4x2sgws5qcuoea6e6a9o3q8qkymrib',
                flowComponent: 'sycmnc9zwtrm3y9obu0zqvi8wcsssd0387q6555e5raz9ttjmy7v0fv2fgzfxzckozkyhocphtss61lfwzpmwfu6ri8vfh61ilcuobvx3tneahu9m2opjkwwqh0ipkrh4kszdcnrv8yforpg8dcfa94fcqo8nw5a',
                flowInterfaceName: '4urzvdxxtsp1gucv14and247aqo185aod1uxpt75kit4vurpivmu9omsypnfy1w21wo5pp9h8w6v6fqz636s3r9rxkaoktfvaa094ba4p8vhkshc3z7bnk226hganceyt9a49wxbhnonf3uevrqe8ytj7o1y48e6',
                flowInterfaceNamespace: 'gprpcdmhzyy6oz0swe1gt12jc6somp9gskxuefadfcjlbye6bkaj8zd93hy91i1q4ej35fzbzf6q5mwfl3lhpqyz7jzn28tdospom1yytlzkxp8kb2850ya5jrrpdg1yepv4cwygqa4qfsxqnhqxtqqtduoehlna',
                version: 'reug8gffj9725235prsk',
                parameterGroup: 's3rg9lftotsou196fqlcs5jyw8n51fzp4icmd2aup5avhs6ortbksp7qcrykcjpbg1nl9rllq0lxa3xudnojph2fcekzhbbx35ktts4bxn3l109p83fzzdu54n82gvzxhq5aolvkhgpdya2kkm8ylsae7a7t2co3ijrw7tcuo16w0n31llu1tvow110cggnhyp2alnl7l99nzai2nj1pbm7oxl9ylzp7g0rl048ghkk6pyh1laqm0m5ovzw5hcp',
                name: 'w4z2rnk16cu5t8lopm9amnu4r1u2a536ls0xqva5fmy3bmaptuy6r2bsthofmzxtti2p5clvbiguyfdr6uqk84519bt43va4cfnq2iz139e7dd440y1uqj3n6q2lpa6r022p5xoj749ee2aw74bsx0di4otv6b0wc0mxay881cfafxdotr76ozyfyu861vf5sr132iqjmt19q5w53qcy8fnny9azsj9133hvrpzjbv75a3a4nebc2zgmlr3kpmbenawfgggxyxg9ajezq1s9hae3e20a4mlitpb8nyte4037mbwpe52r5sbxub8o2zvd',
                parameterName: '9l60738ogwlv1riyrailesaxafldebahdzmmlnhdmp6vtrf56h1sdx7cbrpyqyeife29zk3ds5ihepd5d409nqqyfjprjb9q2w3tlqqhy3idwf6tp4tubxk7yugf6wbwq8q6kmdeatxgnar2j7afx5bllllt1gs20cg275ahmlyk9gwwnpbrn1nn23a3u0c65s458zu8jm4xsnfqf8g3v989jjukjz2xgs468h2j9smrcaxg7q0nr7nejouk9o10e1st1cs06qzcjqkiopj6ns7xkk1iorpff6m74jmlah06ydlh7c02aovmr73hge3e',
                parameterValue: 'udiwdqwwgkvktyb65wwkje566gomr6763hrxnrabc4pi0yrp66l8afudm0o3cskccmfqy36aet82tdugy7rrfmp5ovewui974xfj145iy16vrkhlgana9hyrvog9hjlapgiuj14pwbzp3fjnvcsoffecobujyzdus9ykyf4eg821bwep8vowpwcp2jsvs66aqvemovfbn1oyvsuaoanel4th7x8cuz7wrf5zbgj849t51oldchejkfpn1f94zdc99w7vm3pfuaxp195j3nyn148ut6jeapsg30ncqpij02awtcemb500i81gkpf935hyjlaeabpuu85bkl80ivqryfxs15fswcz2fsim3p74twjn1x9ha46hmhculv8oe4d0lw96nyhccjm33b7108cheugpgkwzg0ythygo5d33n176s8jqp3bc19m8ohvkcb20eg5wx96g57ruoao3b8v9wcwbzioi33sob9egmakvzmn82k2eze3sen28fztl5hx0qu2sq312kpzes01owr0qidwv77rr87ld62lcmklssid3ydu2elsona1fbjxswz9qbaottn7eggsf4lijgcvpxai5y8whhdr9yr5lih12wy5d8cly8t203xqn4ngqyscb45ge91l467xbxkzcdy1iaaeo1gr20au8ieop0md0rlxm9lt32eqkf4utgijpetb7zkxviohhelk2vjqw4zmwiv1s6tn4un1sbonwo9ntqfypv71qfx54cnqp0va0951tvnvppxfnrr6u6po33e99uf97lq9f4tzdmf43vp0id0t3szzk7b7bcx2gp00dwhk7ejfjzftjpiynpj1rzntvd1mgmndyy3l05lyolj0lia8gbkkult28xw07cfrck8lktzu0eiqfvl2lof3riemcrptsfuhlwg9j39hssag2vaxiwx92mk6e0gb88n7xz3c2b0rof2vfjx5cjhhoj8567ys4jzkzqrerbamyavar09kkf8abe0a9cxdzs1s83nlu',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: null,
                tenantCode: 'rma2y4bxwpvzocd1cle4fo1q48k2wnsmzc9umse9r3b5hflasf',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: '42m080z8mh8fu92fucgz',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'fdtcszp42xyizzws472s3rwnv8tdo3iug6s1d0p0wvqoofw054wqdamtn7kdc1intye7ihw9r0q1ilvucrpz26kiu0ov2dtr021u0vup96w1ap7gpn5dybrxwsh4od1o614u8kf7ape0e1mra9gez97xd9yjo1jf',
                channelComponent: 'ct4azay4zk8tjfdt67kyl4yobxp8ylt4zzqdt5tvewo94bx7tyou0x7vw043opikp1do8ijedi482k8x9i43kt1ujoe6wml8h2a3ap45r5pvr43p0fpshtwq8lnhkpygejnvad5wvtqp0i7v3lsxpvo5a0kpnz9t',
                channelName: 'z2yk072o4m1njdpgtfdtfzy2u78qxc0bsgcemtijnv8tpadq2o8pimi2s8iy61jbe63p3u482e2nhdrdd8rx7d181taqedahhbdmt6w8gfbyxs0k6ykxpdkyy7mx78233uz5kv7fkju1vm0ov4ehhrvfjtygt50x',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'j63znmw4v4yust0ndybvcygnbfinxvyb12d5hw4d59it8lyyxxd74aypwj4y97aqu5v7ozg3bik6ui7vplulu1tn08pru883pat4922db32lvmnfulroj0v6gy2hi5crtcr6baj2zmd2ue3mdeozqudylzrzizwm',
                flowComponent: 'mntd2z1jn4jex9cd6kog0m2g9hv6vrii39g43tb4p166eh8ucpqrz0yvmlp8gsulsj4xb93r2tn08b48t16i8wf3k6oju0lk1m7674ev42oypo3f7nc1fnujzd1crjc934jdzlvq2ryipxvb6lpqpps35b1ik0qp',
                flowInterfaceName: '9hbtjy5r15ab87ysfwfnrw1hyzf1grhf0zs6gprbfkq3dvb9ez3hi19nax2huywsj9cmc2vq3gf3nedc4avjlxag9drex11xc7c4nvjykbbjtaqb1znsw2lsnrfmwsaqc5g2xpe94nkbxs3n5cz89905yoryzzm3',
                flowInterfaceNamespace: '5ytugsgxos2sxd26ip89690bpxzlmnbz3ncl3urt0xkjtad0lc05j06ve8mkf2dcqklt4ffw7oa78dl57xjw7wt4tdkn9lrp9u7px8qwwe6qdsb5r8bthammcqyvt2gkq5rirhdjkh29nw62rt97s6voc3oms4j2',
                version: 'n7afon41m7rvjh1z9kii',
                parameterGroup: 'm3ouqv663sebte3anxywmw9dgqj2tpv67ueb8q7ic6y57iyp687znp87tcwjketnh0gerq6kbgsjqmamgh328c6wafkoofnk31cm6t2oqb5lalgtrxtsglvv1r5h4o2reio9gxjfjiol29et1urj5gm1sr2zeizcnaasd3418gkk7jt37dv5blsgm7jbw8mujvzhq6ra6p6daz8btv17o69aiyuszffuv3jkvypdc7uld8m5qicszx7vsbhq9r6',
                name: '5gnyqixr1mtae8pcr9flcdly9pwni89libbe20eigumlk8xt7mrzuoqc24118snkow84jui24y7lm8rk6xhune8dk3mny3nr00cusr6aew4v5fiq8y876t6givdgz5xzq51dxj396wiis7clfldagzx6clnxcgzcljs40zcbolx2md69kpfzrphc34upy9jdbf1v9kbukusb98h2brub30pegla6z3ewam9ni0mzvx1iufh2z05t6deeijhq8sg72sozpptwpm6hrny4c21m7ydv9la8jvs3izjoa05wumbsii9riiwrlwkuazvycsps',
                parameterName: '7yk1st25zo1wyz7f0tpxew0pykaud1p6jqr2hkkqx8t6lix4nb5ovbenqgbcx3h7cy9hp6r7qjuox4nhggslslw7g4si0ji35y17awjzurlfp6a84uhze6t2z712vptv3yxoar8q9ms24tp8jxuw9541wfomw9sxnyhcrbksmjt58grrc1svwgpueslwuz0lpywzeg9e7ladtingsu9kknjt7gzwsk0w10zwlny1fflpabzm25q579py5qqww3chjgt6r9bpio1u0e63ytq29xy57rvl25zdh6wqwo612qe2l3tpmzh8jidgzf9tmmqu',
                parameterValue: 'knkh01du9fx9a9j367sjgbv9n1spv4z8j7zwzjmz6vcdyxjoq47i03dpxzdue1wst0z4kpu3dzc3yi4mwkkydzxis6ejxmxwtxg0y0istv4bvi160b4un2zxc43d21b9rgr08pw5lky4j9d6znse8qwhf8skf588r5v05olw3kmtjjbtw869zi28jo48nanr82xlvqrpaunbuhj2u9abu4a7sfyretuegqxslxnwh3ceiy539c4l9joa11a5wb9mh1q7gqd5ibu72nuksqvbosslw329dvqmzl2z9jp4homeetupulhhjtpsohetd55fe6rrn97n3xlmf5zy4v9a9avfx4d8zbsn0avh8hbiab0z9dze2pjc64hlsrfm1qrojnoanp1bf96ly5jk8ho8goqjpk5w55csc0arj6eqm2bqt01ywnpxrzi6wz8wnyli7t4p5qblmbjf08xrf16k2keqft4wyd52vu6dy2ku3wlnarlrdlz122d7vf20gjg69gurhrhm4vnb005pzsamwmbbndqwr341ir7mswdoq78kuxw2l5d1i3s5i68lz8msjxgmmss5wk7hgkcdd8oelpoxe4485voodbgknjs7qj9ndvujkvffqa1g7ld36zv6ssxpm77p3inpc1r6jjhisz2icalt4qtyq882ivpgfe6zli7tk1xdzk3h1i24vmtu9atx6d03lb3a01p41mf3wdpusjyefhse1zkatn41nqo6mv88vl9hit117na1mwouf5m5dk3q1r7fjwcjp4ji3soykjypclsrhdggbfqanlke4o7uippjbc1eocoqa06z1pauwif4o4bd65z418mg1npmzrqchewn2sy3nik2gqvzihjiiag418fngzpxlxy35x0447pf3mcg09mxrku93hgbd58sdrzy5hlmqy4frb7n7ldfel8p5yt8szztovvy4ir3pqrjrlo1rq14548rkp3svpfgv3aq58b7hjhcg5o4o38vt6ln33yl4jeg9x89',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                
                tenantCode: 'z3gv6etg27asqnii5n9rbb3qvgwwg086wpw6eksrtzjrl61gh2',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: '84hwtok1ty0kk533jgbb',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'srvhfut0p8n9gkh1xo1ptcpu638ph3rve838hux5qc41xjc3dz61rz79foi38gr20b6pcfyy0xse8528cy5n2m8u44mi0w5n5h025gonw5b7dpzg44ka5cflc47hupmzi87n2878m17rzqj5f9krdfedq9hmm38e',
                channelComponent: 'x9qp0pz7v8ulm0exn0x62kwsjqtaysjmxlidpky5ykwx5swgf30aq57brenzvzq9hzhey3gv4jjqgdxjutotuhq3wsv48ewlvhxk2rllbkks5mryyb9tafygmkkaso5hct3vx648xrvxkl4vxiffsnqzsfhui073',
                channelName: 'wjponp85hwj4csipubpqw29nh9pvs9okenynmc52g1gckrseiyuabra9sigt72huxzhwjjmqlybo10lsynb8j9e1xsev1g9e6jl8x7c03e5cn114bn98wgjql4ye680p24we6ubvm8m88wactjoeiyl1po5iggd0',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: '5rodi1lya94pa4ojk2ao2m0vgt97s4drf739reexotl1e9qswk9r98ko3nqdqgzprg1bvrbrqxomhc4si68anirngiox6nq4lh8v5ungqhu1riprnlbnasybl7fz4za43g5311fp3ahbngevq8m9pyxuganfab3o',
                flowComponent: 'e83n0hbqxip7whaoll3aecjg7c3krdjiijkbglttjk8hh40karr6ohm27277oeiv6bpaiho8ffsjhroy84r2pqofa3dfnleb12dqlp6lhxhjo0g17ol1s95jtjgcorecyuqho14djzd5m57skjptx3mumdp2zecp',
                flowInterfaceName: 'z9m42qwut076h4n3rwnrhi7thl6dfxugidomqb4pcyvrk74r1se818k18unneys1r08zenvi9zagzy3w5y0c4l13jkumixqz1z922umnkbao52u202plh3ro8mj9sm8ckaempjp1w53non6dverul609wx81zzs1',
                flowInterfaceNamespace: '62i8jvy6yo5l7rg96c37uwf1bbgde943wj71r968ttb62qqyzui2n94e37dno79yidc1oo578ck3qrm12o2h1smgbc0z1o6yfhos6ffr9cwpktsl9suhoxl7acdytvi5auqm0boj35koq8ccsr32apu4wh0dz63l',
                version: '76vbls0nshgoky43ibae',
                parameterGroup: 'mrzmx51ecapno15ockcqtfck7ekhrnh7eqpj434ubqnw3hd29ixx1xqvkx5r1wrky56eke0ku1tyr0fdqnh0tqjigm6q024evi2gth8u99wmhkcu6lmhn23oqwutan8pifuhqnln9l64y2ldv1jch0qauqudmuhx7qdjzuf7t8vy93q1wedddavneh5e56i6w9fynm3cp2zqv83mjdffzswfmgqlfmjg6i74j15769qdkjzrtf9bkzokmvfa66g',
                name: 'zqzdi0enn66wfc9t4vnb3pki248mh9v1pqd8mrvkkf2nwnerejihgosh4xr3aftaeeshc87jovrxfosdlb4na4pwsjp74ugl2ax67e83v6kh0kusgn8bd2t1vqubcnf3m48qhwxpsz8uo1z91lyn2a780pfaq49n7j8hm4qajdp8zoheghbfesxrptmglptnj46mqdoplju1istrvjcxcw6cmal0eavyi2t2ulyr7ltspv82t2rxp6r1b38geeer7qq588b8qmz8xcdxloah7d8gui5zu69cydktawq8ai6i0l8t9zovdv8o7hb6btod',
                parameterName: 'g87lzitqf0xxv1ktwyc5rpao0rwtj2ntsha24gd3t48pxlux11n7tf1jpbgb0smp0b4px9u377b5w6azhobsibrnrylegjcbz06lyynjom4ill98wv9yptwhr16pc75ip23caihj1s5uyeof2huau7acjqxpveyqmjreuci9szoxpckhk35evypr0hl3fjalaux4xcohtndrq02yvz472mjz5jubulrqlr39cdpnyy75d8a641w38gzl5ul6n0yz24jdtzwom7b6ro9jd0gsa6nsztojrs0qwloc75h3eiyw6wfepssoy789q2hkf0f7',
                parameterValue: 'ma837zeztblljq95gu2gh8tg2an9o3w1wxn5iyfmaz6eu1iojkgbw5rvm6fldcu3gvu0zoixb8yv391e1oabf5hw5eefzy89gkq16jam3xsc14a088ytw309c7jqcey36trfnk2zriccsjjmz2lozktbki3ay4jbmu37jhfd09qsup7t6e5mpcpyby6j1g2v1dtz3i79jr83lvt4yk16vcrz568p80brby5rr1fpzdo65wa3gzuo22inbhe373yaee9e0bx1m4akw0uwus8k0oc5wkzysv5pp6hjmb3lwhnd2t7tiulyljgy2jxpbjyd95av0tj8ijabr35y5pplhcupipyiixilez02zqswa03zfmysp4l46djt5tq2nawz4r87yog6d3u0r733dudogqrfnu47igkwlj2t83n2v3uiu6q4zlfxfo8unefeqouprhvap7v2c30ds7gtjiq2unomeyd6fjqadg4ckknd7fgmag49tdluakmek588c7tnft9kv056f2jhxc84m8f3w46lveg13d456kjmzrnlk7y4zs6x0f6vtlwcyqdi2apil5xf3l77rbeisi1d3n45780aj0mev51ey0l2nhoo344ke6shzsokb9kaugc481haq5b8ij9e8g80fjjjfb39ad7mrte64q1vpqcp2qt18i5zn83xvsj9fbjcajjxvpehyalq4e9d0l5fh10ui6nctwsdpf6b3jrt06ewrbuzxkbjqfwvl2vqylqw2hedoyqme5clxyzthzyq9ptbs0jnttym3xic5q74xd04gau06paqn68p9od30c9z4kryz2uqslvjdpv07aefeacr18er9ifi6hxc4jqs7jt7esm5sbu7v4tfjl1n8c4mfhy00gu355j4n1u50aa5okkftqpo4ytr9t1vsji1rpb2ua7ohcnp53fkie2tartbxnqbzhgw7u04m8puqg4q69a6t5l7dzqrzt79g5a05deemoki3isgw4p8q6box0ai8zfxp0zj',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: null,
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'jnzm5ypnn5ps4fzgbdwq',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'lsx4k4cy18bq8e8wnq73939d4gaqet9qp6hkassiza17puydh19nij8m8qsrldz6qfuqebpmtupekp0ut3wz8d74cvq5tdl6ii1fu7qooam91lmn4h2kb6bdknojrlwx9vjoa1ruegwq58iqeq8q2g70ck1ffb8n',
                channelComponent: '5f3f58048rqt8x7wdez68pjc3vettvv12diwlqu4ep2s18yufbpjbfyt8640jzulal015asgita13psj007gadkll5rm1poaqsitcpl0ypzquoxlntge02lss1iu867a17eo82evq4eqahobhfy2y9d0274way1x',
                channelName: '479hscp8pyh7gyozitsnie69cshc2ivj7x32w4jo60hh9oga2gk9of6pv7tgxt1qbcashvwt6zl4bsnh4i5g1s6tpx81j6nc3at26efextzbb0152m71ggbmw3lho46tl8r8fw7305tmckuogii5m047626qnj2n',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: '415wrft2fbgqybkzuy96duta88sqp8gxr2u65lrlkvptpwbux4y6se5pwf6bzpxulwzk7x8sn0qcw1cs8l0htbvji2xqns17zlj6s0nw8qigh6z40p583lkigy5y0r5jlc07z5tk0pcb5mrhe6i0u26yssquyht9',
                flowComponent: 'lbls390kmigi9rt57v35elod2gqirwbqdirrd4tf818kpb3wnzumtjhnntna6leka1mv5gidek458ue5v3qzv3hd05e2rsnowsosi88z7zrb9dpu1t9k80m12ystcs1ur0l9w61jtve8pkzeig8sacozakbikqac',
                flowInterfaceName: '4qboxml7cbczi6umpn86i7gfp4apive2639lb29077uai5l0yp1g1b3n0qhprdjjyy2tb6z04l6or8xmo48y2suftx0tk7s0cik9qu8iy7uuksyqgfgvefm1dguq33ztlmnup45n49jqkecogbf97uk5l046or0n',
                flowInterfaceNamespace: 'd7eye8euk9i8qx5zb8iy9tz0v51hhcksigdrliuy7asdgzl4krp7dkihfws8afp8ntw304f423fiewyc3v15jbg9ii8qahgf2ofauq5v50tz9qp90w3e1ik2m8t7hzxmwjxqsncwlcxide9j341wn4fr5xfigm1t',
                version: '8z23coua29hm3gqibuhm',
                parameterGroup: 'hdvstgwkewoq5hq0qelj13gxlywvl69fm037vdyuzq43jckbhnw8sbw0u3rqvo1n06hgs4waikvh34ewufaiajaiwtpwmw7vg5uldg1j0ufmqq7k6zpfhd02iyfcxrn6u1tetskm71b86ra78fjug4lhb58k9d1e5eokbzryo7rey6uxlhf9nhkm2ays8h5d04d3fkiwy5ec6z7y0ppe4dtk6octe7vkcry1wq8et6247akqhxql67v2mkih6d0',
                name: 'dgpns4yrg0lnsehtwcbrautoo47a5q7p4ced4dl76haapvfn3vhevf6wx3bxh9e9eb7hkc4ooagzkkz6k9ebfps90plhqm0yzp6ymjt5mfbtakv8lbxsmxqjudqd0j0qaekf2910mce11xnoyp47gmtk7ac256evr8820i9aifkb72yagtggwt2itpgdndt8idsqyyf5ome93otykqlcpdkhqueq0kfskpcb2b3zby46tmyv4tdv6g4ccb2lltwepp14ax5pklqdl3zrqyenb5ghqxrare7tagmarufwvawxlk6i3ocyzgfky6qd7hl0',
                parameterName: 'xa643wvojph244b9fagz45pb2s5k466zc7gsaxsgdc2ev6w9xcekn8pybmw7bfzerz642rhgclp3u5avd973aitwc4aj4yiuj24k4hdiyaqg83t0wz4863ns919cwqqiy2cewqbrciygy2d5wirr4xmvqgo6hfah1tyon6c5j141omv5j21xm4h9rxn3vq048d4pnmsfmo7hqrhcjyxhy3x6cngypf4oiisp5nbsj880enn7qzzi5xybku7n26cbvalsu8bhs83xv9zgtteoq0gvllsk0b9hyokixz2nplsw5ysj5jwfxxepzyf76c0j',
                parameterValue: 'ekb20ezfwxu2t9ikyrtatzpl62vac3lj7rhr0q6zblu4x5d2mvs5bvpgfrde2w9oh48falty20hyfdbwozbzjmxagt823lu7uatsee9o45cwmx9qzdtyuxc1hk05zgfuajrfs2k0i8fa2poorhv9tqwdc8kfrxp0kyazwnzm94s253895jdvc6gv1fc71m4f1km7m4meelhhje30x10roor5nur4le9m14krxf81yminm1duetzvs9rc1536xo3uvu1b98wt2h0m8rwkzk1mzfn6363twj59d62igkfv1vap26wv2a4skjlknb8rby35pa7ok7z40pqr6ftmj6jdr55u2busyanmvfrumx8e6wnbcbvfb3ldzq3b0zt3i2anuzuyw9kmhelmtlby3twvl379qjh24whvj3gtqoem939yqzggm2jrcj7v2zhjcovp8y259zy9wt7ji24zi1sk1y877kb4d42pmlnmqmurtxgzyvyce80mxhjt3pe65zov44odspokp86yju7sjio6wqzds4mr7euiye3sbmj0wulhyupzvawzqg9kny36ki8g5lxmmqeiszzfr7pwqi1v6oqq08yee2wlmhj4ofwr4979tvcsrh14kydic1r2klglw6g99oqi39cw9rhmb3lc1zcrc57uo7fai952bwetfhbynzzexxdzj9v5jj5gp58xhbhr8wowjs680lg3imq0217zezth6j5em8xjdbk9aus85w7im58sqkq88ac1nh20fcqitacezz3hp34bx51f6u2fm68no58j4lojkmisazkbbrm9gmww5vqsquof8aj3q8ds070r294aa8611bhmztd4h6uy560kmedq5la3h8t1echxvvfijws2dcbyvzgsaiazi91nhll46auggejf369rsgors7a1ook7w4wngv0zwatxfqujwyxjoqtk0n1ryfg5bggruivqrzp7y7cfyhs199nsi3v7jehyhsr2r4j7q0miksyf3aq4hw9u37j8',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'ez75ul5tzyh2d5ur2l5j',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: '9su4yiazds2g93ug52xlkjzq7sfhdoxb9tos2sa031qgeqe61vyuzsmqtghjdmol6csu7v9435rvxaom8mn50xkpjt1m7muefx5gxg6e1r9pkfzzm4yanlwwc97gtfvvxi14ohg94vzboicotxpmyr2ywjmrbdu5',
                channelComponent: '2mtj2bjxhtt359l29l3nt6z5po9e5m8p3l8m46x9qkpdf72krqbp75ranmsf4d4n3e99wnr76rwefv09jyeeqyajdl94q9g3tpf4qekuo7kqnroched4ho4x6s3b5x794csp1advcl5kzr09spe3seknly4hvjq8',
                channelName: '1ift6k6snde6gnfo2tx6kv2vmpezaglmqepx81g8vaa1dfnwml30m21xeucbo3lmc12hsewy8lukxrz6c86s8kx7zkovj4vc4uj30wjlzqd34ixad5r9355rtbbjk4l4wiobljrv5s5839trn3gfv3jxl9wnqo68',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'd9fo29uc18itxcw2wjn5udow0btamv3hzq4z0mdlhqgebx1inj9zdwxcd600wk2dxsvw5v20bvkha659fb0wpnx67x3mzizpvnr7g52sk4opd6c2g9i8agidpnb3wve3ofk5cqjg1mog43xqlghevklh3ug2z6ai',
                flowComponent: 'fuj2xs7j9mexhns7se0fzfekspal40rre70elcgkwop5nsiccd2gik1ly39l8wj9hnetykacor8t83e5dnb3vymgzril6vl9q7ou44uss6pqf5w2avlx9tku74axmtm4afx4cfrfsg3p8e75fg59jzatht5d5tak',
                flowInterfaceName: 'w6gec9s3tkv08x4e7mcx0fy4ni8wsh9kq55yprd63wxjmv1kretyy4eiepks51fvu56r3z1tema4505ltacfmak9ofc2psszx2oe8l2aembpjfagdn7n4w590k5zwppab21huqho9gty2zouyy1hjpaexcxk80az',
                flowInterfaceNamespace: 'gonnop0nboeau9q2bxfyjmjz5l043nxcikwatianewnfcz9i1vcmpsofvjj1jnv9prrteqao7abj4npcmr4bitu4yum88hkwmmy2mbug7dwvw894bo5vsb5knfafkkfbb3666dpr0t5l8lfdrnb5ae2za3m19lpx',
                version: 'rglklmwfxkwb9vcthm1e',
                parameterGroup: 'gkdm8xd9picvqecqvxlcf313n811f2yy4jfvr5kp2lbv41voostx6gnvp0cn8pq0fn5iae4lmh7x8np87321ivblvxtqd1agxx3z6gnm93yp0eu08d6wyvovipe4syu379fh4ms049lccu73jkw7ujtl6ougcb0qo221x0i2vidplq9rg3iq22sps8kc3h8un1t8nksidq1fqtjmvs6db5t6aaocxlbryw9jeoprdulf8baljc2fqs3bv6psq85',
                name: 'f2x1i7qnpm49k4gekj1owtu5zdeyt7v1zsmfeuq70nn9zsk67cxeworedus3hqzjestm0bgrp8cppibtuvik3fb9uwyheus3u7w2da3a56t80v1y0d3z152l3bfgac4fqqn91282aha5gc73wgl0k8nxflclg4vmc4x23dy1dc2ec768mi3lohorpmykekpuybewg74j7goqh7qhdu3m03ymb0snx1ofjjn0nx4c9e7oqjc73xulg2x31qi98iigzcr6pylfv8lbroslybqsjkf1quixrwioogy8rv0r306emrski1173mwbzc46m223',
                parameterName: '7ms4b4ujggdvt8e9chgf8arcokaeub7zyx38nclla2zw3au9kfyzmqo4j8ppzd4yiw1qlj87652dgxf2304g95fgmpi5vdjt9g7fllvavhmor0b0x2qpo9fuojoyp6gtmawz0l3kw9ur4mc8h5okijrpumnvth04orbx15zpi9l6e0t3x37bviwwz6ccsmj5b8tzfzejy3vp6kr8ryhrsta6e77aduksx2osb3g6uzy9qb3skxfx9dmqy7vhdp3wbkr95hm8vhb8y1j5166fe85jhc5wrxi1a2xidz4m220zqmunljbl6rfs175cab47',
                parameterValue: 'vgbebmmta2kut1y3mk06whda5d539b2sx5ht294ty75cezqqfw1upqhh769lhuqqnf9ofbkc12iz2xg3w6ag6vltanixgbwh5xi41x40v2o582wtle8em8n0mew4tjwh8p38ekvyxydm7d9v34cobpwymqblzyr2h22qh112ji2rp3tb8d59zpbxblnc098h0pip5jmviu0w3tgeexkcmclzc5eise5u8d7kif4zizxuifkjuhydazmk5ksnnpcfuf7qyrg66qt9j5e0r57rxn0coiaqamcbaru9ia74ef8plhddeibkewo1i765hnmungol4za1hora4qk07b7preg5jmz1qjeauwwdz2xpu0993bhif15fly9ok9cvao4rfrvo5ae6ooldx1v2f6j4npdg5cieaxr3d225emx287pvp5zm6czgp2w0zjrtwcmkdxazh7tlovlc9su2ikbpukloemsbsw5a3rymvr13227i30w3upn2m09mv7utfiib5bgg7oii9fq0sx4b3iecqn1fscq16kgynefpnloocbvh41r4t8m7jyxj82ggl2s9627m12nvgpi23kgz8rlui4wmi6acm5cind7r1shwpdu05qneobfiwy5wlwxznremgdt6yxuhs5l7d854qi1cp4bf1qae2inhxp8zqmlcsher78ujp1hgweon9mek1wtoe9xwew3f8cbnfj6ml3dd65af5e9m1q9s1u7m3srcisqkcdywg7nc6maitylhqx5reiqcz0nkwt1ffna1m9tzptt7ryrr99kiwggurmz6zwq1xgphbybyhsd0w9g9f1oavetxgu8sxasrhh8zja55n7qs80o76xg3bpuqpeyn13tu3ddfxwzasd3hambesxi2mls4bkl15auv9oobdzptoc0ny4176z4x4d559p9e3vlyw49mzjlibmal36sr7mgg33j084bomgcg2a28xmvyp2z2s1ry5nlw7tat9ok8l096wlo9zoxggvbjszz371w5',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'rgpfryxtsluseq9401cctqianp2op9uxtxavfr2jphr6nc1o4y',
                systemId: null,
                systemName: '7hmecwz8a89x7c0fsidi',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'yeyvkm0ua418wl4lijz84u5dnwcwyjyiila16tulhvk2qdnobdpqcahhxvztkocr3412xz4me69mh1fck2cike6x8yihrc0csbuup3crm645rp77urvp15czz19nnqoxo4fflz0hxsygh8uo9zmox3l8jkwqk3oq',
                channelComponent: '8h04idtmo0k82k079ohm0kofco06zql1fhwpj5z08tafkyb18ons07f4hi1bhjobnxrkfus5gr4a1j3yl5rjr0thn8tvowic4rmcg2gc30i3gppnjkgb1zoor5bjmd16tdedwjm3az2xf4qgs76ai6iyk6br3ij6',
                channelName: 'kdkm6c5bb4qqi3uq2c45ym7eo6sbbm8znjsn3mdj2fh8rlepyis37nhyyesog882yz02lwgtq4glzsv1d9cud59gfpcsnk3h76goyrydgbfubvhx91nsr77ufmvfuwuiiok0j2a73ax1l257fqjy86k43i0wxn7v',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: '2szlf7zr84bralmyzayhbwa4y15a5ogmmzgmmxw0wwbbl9xf078wv9x95w5vsmxlzphmhuc4k6qz91qiwuwoh33l7awmiimfm0m62zdtv8dwqerwpfz2c6ooz84hoq96dm5l926f0j6sb5rtfekomb39hgdidpd0',
                flowComponent: '83srh83onbveijfywohdm3tta3h77ts3f0lr3iffj6do1c5v4eell2sotuxqhf6hqnqvpoatwi539dmfzjbupbv5uisyncjghed1wi5y4ayzewnq62fq3gnykzfxjvmqcsf7wivjb4j140ts6dxvrzxmip8389bk',
                flowInterfaceName: 'trnj7utiyzgko7h48tpsy2yuly6p9bz9uxfg7j5whznp6f135fyvhozecet7qgfgzml84b2qe5rgfbayq1ro6n0ztec3f73o1k962bd1qr43yceeji1i5hw2bjyfht75gfk0f0y731ef1tysepfjcgs9fqglz674',
                flowInterfaceNamespace: 'v9wwwrwvnt6zeb4ob75fnah2x03yaj21eloswxsjt29r0mmaf3va2k5ya9i8oc3nmpiu78k04ilnql8pdthtfwds5rj228093qu9rzntjkyokapd1e34e7kh9km78re19p1kqmka2rdrs3d44tgwk8rnxorm8ekz',
                version: 'ysg6tzbtbv6c0m3sta8i',
                parameterGroup: '1o8i8hymy7kkfgavp9m4vb98v9opyeljbsrrrxy2s1e7gbfi1wj7y5sea7cus0vzw3tvhbd5123i5eiaoal1bs9sh7anpckrztkjd47j9m9v58gg51bbxd5vacphizwl4f4br9l4p6y2bvta6h1tdahys6zwnc3f1p7b35twvv5ecq5tga695o7n6nhsndpa7w8ijyf08j0oq1tz5fxu5ekrxefgyf0udu0saarat9ddnfjpj94f7yr28lhno2n',
                name: '72cssz0vu93r35xgpp0v9a5wpw0y0a7um07e1zwnjszlb3ft9rxannlc9p1ara4hm70c41yfihfxbc78kg4qulia9ttr8vd3q3z2ryols4e1r341iztp5ko4yn6kmaj0n2u51iasykfag14mls6ca67ttujrhhwy5oqy48x1c8g3wv10vy7lixx3hc09rxljfrsywk4bedh79km980kkyo3papaayudsxmopuyyidzp8owoarl3s1cku3g387au93j54h50mxyalpsmevcjra87vsq2xxtiwb7hwpykwww3xlr88livy7qvjlhn8zygw',
                parameterName: 'him593m27xbun03rram9l1csh00wo36xzur6sqwtfbwtgvwnnthpnaksz2hxg9qa767542aw2m2g1anj79hue16o6zuezy43by53b5skf555mq5u45vdcxks843690nbmqtsh0jjvntb2v8fedg8vhjkjerer0eedjfkee5cdg1drd9tonei43zri0v7cx3hu5pnhzkire2xoul2d5qeeyzkg8m7t7mg0mafxebjewdvrg16co53w2c5bontda0vwul1s0azbdyx0ctt3ebu02wkleq0ztf5rfam01xtuueihvfwrvykze1fa4xbjc4w',
                parameterValue: 'dtuvll66ffh05hdhbdymvio1qu33filw8q3oxzxlzgpy06fwdohfnga87ievqsnbn0pij2vrojcvlxky14um9x968chkp3w7s11vs9uv8fbyg0hsi0e4pmbgw60nfzx23nie7nf8ena3x87gij9ug6giua9dtdpwsymemb5qdzppppixjmag8yon1s3lsayf7j7e8fdyxwslb3jy57ymfij28wsko81bc9hrhonumtcdz6rp7req9dypumxq8opckrhwq7f1353eos0c7uwszw5ad617u5bp5xcy7iz53wz5rp58uu9ycsj66m1u1bfepj8rbecd3sarxqvng2qcpujaj2qjlr0jhlv4o8z6a8br9hemqm44xi4hxyzpmo0k002ze7xbl3wejuea9tlrdalxxudrle2deuqqefpuhn090dv5ly3qll4v6v9duuz0xzlti27t17mmwebceo4u7pnfi0xbjp9970dece0d2m1ykxjnoiouoge9eltjgruev5n6eotmp03izwogwaxa3xjgseyhzjmumgfnadxzoi7ytuv1wmfwnvn80gnsga5hormwwybcyhubuvr3uoy2zti0u77ki76w2f9539p5qggehwlgtjyq2sl12q4uwv3q7r5iuejap2dv650g6ww5lenbgqozrink6qmbxlj1q0j67lu1it9c0hm0txg0tze4rb94x78hppthnm91quhw860hzj7gsypd4rao4qtefkqsvaxzg6l0ai2f4r07xlwap4yx2a4mg3bb3ad7mb04t8u2qkevtgxq8meznqv2a1wbs4jh8ufv51g9ygtgv0zvdnolc769ejh7q9p5own3m8hnyi0k4ag2olrwa0sypsw6o6q9qo29mkc25xo3d23p1xcbtrpc4aaa37kg90yaclue6pmpa7e6mn7pwa6ytmi36q6stb2yh6c9vaneotay5osdoousj1u2tvjyj0809dia42xfvhgvo4cktdp0iv81q22vxhootp53z6jzt9xf',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'x1pw5cmt2btq2pqebltxkd4an2hf24wp2gzehfczfhq9b64qt0',
                
                systemName: 'j0bd9fec9fhu5jvwr7pz',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: '9qvp8wqhpmwxe4s8l2iyltn105to8lugvz0f9ihzcldvhexdv0cnzdoyvorwq0ryntzuqta4zehvmz0we0gyjnoy3plds8aksme1qhdm8i8l6ot4jpwbgkg1szjeaaoty9oj84968kip7mbin6yqly0a2luhf5i5',
                channelComponent: 'q6hqzuhna5f0wmxghoujgft2xclalvvt1iepcwbt2bg6vjrvop848vhxx6nroxdfkh582huxh22nam1f0p54kvdxcunknxz56ajhgbdi82dj49iwg25xupm4dkolfc0urd6uk4ir9i8o6myyboyecffwgk1yvayo',
                channelName: 'da4l9usfla7w8kcrz1c5l34fsnatbpbzr63hpo1ae57p9u48ppnuaf17254exsx9r7qkhqb0wgg4cxhetffvocjkwk3uerljny4cutc9gu481tlrc4ff7hra5wnf2hieevmb6i2h9qdfizffztl95ibj7bd4glfy',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'i0pzan2edod92ymour5tcthchoiiqty6xp6rt7uc5pzej8x5n9rco0zig3h3jswe84pa5oudh370y12kzojwy1juo6rxw3y061yd9djhqxwoxwbxgv78otn0djda43d43e4dqrk8tyvd1fs43jvaantlcacub3n2',
                flowComponent: 'dytrpe8of0lgrpw1pv634g28q696kalaahlpbnbg8qtz5960jl9nw3yem5eizzdr60d2yq76delyz1x4om8ar0ojqzo398izxf8cjcmejb0179g00f33o1poue2lux7gi9m4a1me9qkjmo7t7aetnhfffmyg7q0u',
                flowInterfaceName: 'jfb2pza045csg4etw927dowpferugabyqrd2lbalg8s3u2alnt51ngcst5pfujuajuyvkc9y2kpbxb5uskcj94mzn3q34rw54mr3ontqze8agyhej1zonxu81ccqz9o6k8lj5ku6oeiiv087xx87xtrxnm8lnv7f',
                flowInterfaceNamespace: 'l12z5b1h7shsp4cih81dqp5h7yy6o8qo92mpdol4qht7t2woahr1c172c3hldqukvldsqot8fiyg2qko9uttait1ug9loilbb02jr64707pkdbsj42c1kpjeafecpj67j0qpkz2hhg3bqlfg5xk9vfw79580xmnm',
                version: 'gy5knmtt4tmn7be47qn3',
                parameterGroup: '6idod6yf88qbwue37af72q58ner3rubtnvn1rgws2pk0071iggbon0jc1xlqtlnwk5dv4zy7cwweis8wit9xapdshtl7bkofkr31v6wds6fpguc73ib4ubrndb77t6ujxqacv0mege5smat74lpe1ki3s46zan2cgau00mjl3723ug6hfcab1zrtuuqu5ujqrs13zy0np8vv8kbdaph425rhhc8bjwex4pd4u9e2yyz7hc6m4knus50kj2kn41v',
                name: 'bhrqqnskr2lpjqa1cuv2yp13gaux0omit7kalzzt12btckm90zuy74ggjl5w6jjhrzjil15yg5r8w3s60mdi3l5d6wep8ndbyomn5679ia8odcnjm93kfldouupw54e3ga6ipm185mk2yhzmyadivkwwiefd1v74qyemm5r0yl80vuqybyjhpbyxs6gmfl4y39uu4bnuig3qrkepsi37h7bcwag230apbe2qjdv05pcbk5bcoe4di6xps9dkqo0xhk615rrqbgxvnyyn4tpg6wwmybfgytw8zvz2nkh1poc9edo7g4pz3ncm6of048qb',
                parameterName: '07dznx0xnvral1qx1qkb3zx2k4ry3lqvhyvopx9it0kbropqn8tjxp3ob1tngepo27b1qpk2902rm2wkvmqy66xlyy7ktrehdtt1nmy8ktmw3yst7lsofqfv8nikbfpuzlrdos03zbydqed0600zuvm318rt5skz1jw6rnj9u5ehdkluiyk4myi7j7t6jvv8dz3slcy96qhi27efdzp1gbe2rgep4wbzeqqoldjdo3vpx8fcxv9gh33cebsze4fr74jej9yu2l8jgghfcqur1axnyjv4anmj99tu69sn6zzhe2ypwchwu98wqm62qon5',
                parameterValue: '5vj8md9ttgiqweodqwdpzkjogjeavrvk3owbt2dkn72o1gr4qlwmxf6k04phwhderta244kuzke6zq7wq7c118yd4woay4goiqataue92e0dsmegm4nbddsi0ep6dggq55fcr5k5yufmgtkr41emtq6mqhluem3frqve654bvhzos2aqo73bmtqtz7r2s85itbsulj2tc3lyq9jiq96ybps2z9yo212ywxylwcbriaelkk8k09gs7tmakwfl1fvf3s97qc1ftwxoix3xq8p7o8tvadmd5h7675pldoqb9stb7r5xj98wjlo3v4tfl6mcfr0gkvc09dohkghhhm7ecem3podvffl8syvk571s985oyxmzn48ukl7j16jv72j3u6lfd1s7ueeyw4f5djhaoav98ueo15l2288n1i1zfzcx6uyhenjkyxz8qxxoyzlq2rsvz6fpdbfcs6h58z7sp8ra31xjvxtwpfwh9j6ovmioacoi0k38f4i77k762dbrr8kuevk26f4lazhmysv5ivrb560fegvxmx1613dkj1kbm1msd8sezq844kxnaef96jcwtzb7mj26wu3hsufky49dr5xljkbet1fwe80iauf08uffexqqp5r7l73islobhozpahmi21lzsayjs1wntmt3mq97pkz2r6mv505bxp16mmoebf0k373c8luz9jjp1tnjeeuqcz58linn6r0u35k9m3cuyx45bzu05tpcxc7hn4g3t3413tzjqhwp6ujgkc8wfi2vjuqhmh0d9g51kicbaomu1cg7nscxts2bxjtwzieank0igx3ep4qvzj6h6he51uzc5vjsksh5fgspx0lx992auogrh9x6o5cbwgm91ej6icxjusx02chrnyhl6huk3idow04lu6t1j1640nh17vhoeknrwwfm6dugvui6vsj3hm69uavooffb30jzp1q5bjlkdlzfnmgvluor3jogp84mi1s8nxb3lpzxujenv4kwc2fse5gnzrjg0aje',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: '99odtsyojaas9pj57b0d2zap16812t190dgm0gt2f4x8akpwsr',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: null,
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'l18elu1r0e2h0ae7utyj0obn0urd2dv7myow5b610rvaodsjnzg4fbb95piz69xlunwuvpl0wgtw3ty25xqhkfna1avjd3l7g9g80zlsep3lei6oedz5lzkdhqb57phxvesyc9qynlqi4ke3i0kh27mx5bgx0or8',
                channelComponent: 'st3kpc6jhaocactrxtydax4rh5jf6z0aye3r0mr4ymuc1qzyz0382oh0mw45legimlw4eojox71jyh1g9osxb65vwcbqrlv1qrj9by8i0swu6kyr54n95ivify2dd3lxax2xuh1houpp0eji27g22vaeqsm3krrd',
                channelName: 'rreu09wp84xmu7nntpryxployjqtoa2ehsr5vs3dlxs6el29yy6u30w4p3yx4o2xg2egf9tuh88nr5jobrxt1ggmz0irinfu63ewyf9t0epop3eb312mtz1mi5yhf13085a5o0s2cvez446wbhxwgw8j4dw1p763',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: '6icmyf8om21xp04blfsve2z7pee161nex0bp0xh46f8bv3geakha8ot3w8v8x5ss75miqtfzvwxcsej9pjynb20h701urqh00i44r278bymu3p41g84u3mvz2qy8cxfn5lysub734l7q1j38z2qhvcn05aeusrik',
                flowComponent: 'nw27dw4sdhvf6cbymf1yh8lald7xd95oyl217o9eqbeqlfi5zjh2xtwxz9roc9rwxltezq3wmfuizi99aroyiserzwzh8g3i7xxwd29ddrijxk6nadn1p2o41t1jjzb5p3gmxq2kuip8geop5juzvxgueum5i7ot',
                flowInterfaceName: '5c693i7b9rd16dldxsk20kpgd7mi67e553zqbogknufl6biz40ubmzx1gy612rkqfpz1zhvfgoin9kdubm0ki39wmqm6q0ltvcukg88axz5uluz4wc36texsuxa0xg5pspd2u8omlz1hjzhtdl374ig02inb5201',
                flowInterfaceNamespace: '3vhwdstrhnfzqg5phejmk79mo7z83v68y3z9ey9ndhgkw6r8sk4hxyut632fuya860zyot9qegt75hm450y585bi2z1jqwvfzdyu4bd2no4fhzyvhsyq4l9bpfgku6le5yny2hpzk8w3kymxil2gl75naj2gy759',
                version: 'ek9aooo4r6s750ykn6uh',
                parameterGroup: 'xc6ljpoyqxlfh9t5zy77h2q8ocvkw6lmwz2blhjfotb6sh7n0vw2cyen5xlvai33t2v6uj3k36vmbmhvvw5cpf8cej1fg0mtqp4xmbdb8la816qx8829chb630qy9ttycihiv9bjvmmp3esss7ls02f6r1867o9ailmedhn5c9pebahqdd6pwn66370z6n5cglll74psbsu81l4irel1ea24st1dxmi69jqgkxm50zx9nlht971bi4bmrooibih',
                name: 'xxvdaw1mwo0js7jcomx8mz7xt7danfnvdqruqhjb9613935w6jucfrt389qtqqgcecbltu9ps3lhcp09quh8mtkp73tsph4npph34zyfbheiv1rlwd34pofbfag0eq5zqaelrwqsxq7teh6p7cxdervy5ekfd80smvjamnpxahe94c6jzmamoyxpxgsoi4tfxh4i1vx87e2z1fifhhz7cp3tbfb5ao2y7xd4lgpnhkknjnaxwq4nh3kzcskmqysmm5kzoc92totgfhdarn3zyzxydbfvvcwicmucz4y37osavbfnygvi4o06ygbq5eku',
                parameterName: '35km9fgu88xmkhmt7o74tbpmpr2g1ygog3lsrspeo5lhvyq37c20uz1ddx8mchdur5icy5740dgz1smp4qpkkwa0enlmgnl6o6ig1rtgnf3n93ge9tdplrz6a9199iek56wj47qj5cducr1zrrj8sq7lu5z28oh9r5rg3mni39uw8evplt5mhyrz0weajml9iz25osbs4eblridu87w47dg51kwiwa6tlphcx720yhzza22gyocn96w8fcxvku6n0y9mk5ssmdixd9c0y4lmjnezbc0zhpu9c3lxliijc1e4q139mmm7la04vrj4wylo',
                parameterValue: 'k1ynb6634xlapl3qagg48fb3k5h4izarq2qgch8c98o5xkja60mqgy53768g92r4ioewjmdrpyrivgx5ha9f1y82sb25uu3f82me0td2k37ll3bzeibbzot04pf4a8wphswuzzbwvqq5ufby6asygdvq879lvv0nc0xcpgvdtr9fmtk0vzh4u16v39cynwcu2h4don2ty81pahj7ewh1x0zz4b7w0fkjl0mfmwjo0f1dcs1nihcr205ig94wnkxq0gr7z2nrcdxyn2wm9hzz4zpbfnr37hua80fs79ot587dii0k9bzvhrd5xihont0w3rcot2xo3uzh3gdq1q7m040xkp2mwe8ejdg0vx5n2cosuctaqmpz7886ewz7qrvw5k5hxe1tf0csbi057i1zx7jlojwy5mk5hmd4a6o3omho8u5yt1ul3f796xxfna8ikom4cfszdjyw4vwyokt8bg4e7x2rq5kuqdgujp28av7xdhyovkk0kgpj7lxe3muznjogte7idwn8y8sd5jwe42459b44fdel4c79pwqh49jmpk0wye9q2uj9emoe1ffvs7d736mon5ady9yj6geqjunog40eaxc1gbi1bxhien4l90eynjpgrgoisowm0zbjxp42v57dj922hmg6v7kr7sive6jl7kp1j0u7nf9km87h3wwheeg1tzhq10rl9ap7ud7k7upr9vzoivvws4g6rdei0y76yoytfupinhumc3ophxq5ahrjkkn6tsaecofjnh9nms9cjf9fdyzuql0584ybj6dc12h45f9r2wcnv651h70z3810so0z0xr21vwgs6g7tv1sjlqf98ua0njicsayzk707gg6otl4xqbuukrpeo2r7tkri1ka75pax54jw5zvjd7bbf4rssc79huotdbt918dbdmz9u43ohe8w7x60uzxaecm8sjj9faz0xqne129b1vchwtbevf3178f1mi9omhzkzirv4752leiw4kqa21gkw50ioyf06bwnzda',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: '4okxu8w7if8eutbugn82469s418u5irz0lekf4a6hd9m9zkrjz',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'vezu51n4i7qtomi4ern0qcs5230j9um5hsgk5no73grf3ffcurlbfz06g5pms1v0qsk3rjspfa2gmemuiv9n8wkwa1lehofkexyx7asqv4l76vi7rgmndmzbmrct00lpa2jcg2cibwtlfd6nei2c9paqyquly0ss',
                channelComponent: 'w5faadpencrqx1ms1gc2ra80p7zcvvnwrz311qydwcxrsqcx0qc4h9owyd9ug6ceg3wr2e9ufuw7d1yr0blnhmqk75l93pyiu3mtfbnlpdnjk90hltwcrch7ywu0q5d6ky36g47zxjobu844wnhkaen3kwef2qxv',
                channelName: 'u4442d6mbrc44vkt8fuuovq9iccwh1y2xhss8cc9k0dgq2kn6f4nguzli0b96uziq1k77ulbv8opsrn3valr17gknk36ulbqivp5ibpnt2zscczn98hdlg5tb0yjlzq1qfoufhbks51wg0cwqq9tg5gc4sxy1tqd',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'q8bafe42i55mqvwdx6ay6tzdbpj3solwaawob4pp1zuyqbhc9ehnqp2cn3nu5yvsrcipqk5dy09addochws5mpslyimt9vjmzy1583btdozv0e3tizm600h8mws3986bq1x9r8dl5o3h4331mtyc6pssg9w818nx',
                flowComponent: 'h5g8u03w2kcai3c318bi0rpce9fz8szufw7rqykuzf9fz9mrt5k6xmp7r1bp8u6be5ijz8schcvwj9yv0pkltvc53qbzrhr52fg8d5bviulp8141scy6cctmi8tlrutytbcjcxge8q9skv5mcm6k4kjdidtqxbt9',
                flowInterfaceName: '94ks27lb4bbhsm3oi4378vu6oh8sgkrui71rgrm4dyqptipaytdfgc65holb9xantwrepkc1ef5nj4cojiynkoiwr3szqwphszpebx3wgi5j2ec4h0l0tizmywux6px3z9pbtd4erfuwvmymlv65l2h1ljtcdf32',
                flowInterfaceNamespace: '7o3zyous4bt4u2e9ofw8y8jstuofeaa09i7tlzfz7p3aapdc836m6ov898jfqgv1if8m1za94tui0qy220oltc52dmqa71qhfdyf33y81ejle0ayztvw6up890slkzsoardg9z3yl1zznn1pump5g1k3j6ofjl18',
                version: 'n6ujghwuizsdzf4hpu8w',
                parameterGroup: '5rcul7k9tkgevh9q5mrm83a8i9tpp1r276gwc7qjjeflh46096j8kfoo8jmdc5a3kehww5cbma36skhdk1w4qamv8tgftpy0yldfxef6q1k3fg6js65dbak5frqnp1q030ponir187czleovy36np55pex6cfu0f46fy8ap05txpz3yphibcek4vbwgwt2vljiqkvxmhqbkia64fmj4xhk2gwy7i1ebcgh1pl0jmcjryzjzz7e38zf9as0roa91',
                name: 'es445w8a09wyrv6dfkphvawhwz325dm3r8867ovoqdo4dawhu6m5fqlcdrzpjd8dnubsgaag5g0ewrbplam0etnndttqeerp154080iofhkve2ltxygtxi3bqpdvmvlypody5pngd4vpqbecrpi3yfzcexfniisjqbfy22zanzm59wzwdmgc4niq7m0sxl43g9gp304tsnugl41sq6ylayy5jcd5gkhhul6b0ustnca418a5sfckd1xkcr0839bqpsuyhwzdy5dghd88i9noijbcn459njqv50w3hm3fc5gvo67et2ozrextwcarjzc0',
                parameterName: 'sj297ulj3sa9u9p23fgq7uwtkwenzddqetcstvrtzv6dafx9j85k06u7q13jsdnzguacsfp2k6w4jn2632dski47r4pn3hqmr6r935pb17x7cp7duvnj82dcoyh88j5yld23n1pzllozwnprgj9c1720z421xadmin4s4j5dhqrua562mewwaeplxu6wbipthfk626vi8qs06o6v529f7x66y0tj2zusb012tm7j81ael9p5nbvt28b7n8ecrf7xbt18mn13m2ljaobfbiz87235ywdr879rsgr0nz3p888zyg4yxonnq5j7o6yjszj6',
                parameterValue: 'tbwzvhago4t5ooemyz4riipdfrt7v1kpm8i5j2l5zu9wke3oxg8sebzdwmjwblu1232jqb90fbb6v2gl3ma7z4f6ya9ejgvnn13kxrg9nrieyk8t1z7ejtjr2jybbv0w7cygx3jaapoqe0jodc0e8cycv62hkbr3q8iou1myio99c60zduyqwp2qjy0wvi3zkmnxw5ife94x0w76c6mnbwa85iqfz0l8g4tzelx1lj5xgj2384yqocasvnnurdrexi9ux1p43a0y95bz5xkxj6vfs113kf9i4oegc04dvomyj9fxo2k7pkpz50poih46bm8ksuanyorggfk23tv6ky3bm7pzplyxvy9tdosc0pmeeo83cjj4w19v8j8zeq8hqwqavqdni47dowhzo3bk55pace5vbc8rxgv7s5089g5apophh9svbw1qwxx81awhz4pp5lfchmfwuo00hkwe31jza277wqilte8z568m4hyu0qi2q5rwitshlxbp7vp6rgcbnv7a9144vlq5o22p557327nxhe98531daz8ruddhpxkmmge03pk850rcdqrshjq17kc5ru6q18gwesgiodzvlv0uh0jovlm7y69g5wgn0ukanwowofj7yod4busf9ls7b8ya0b12gqpdrdbxcugugoochx9t6et8k47c2osqawu8il4hzx9jh46wqjud036nyng7kxji9p4lkzbhr52f8ob9u7abmepo2smtayzkwwccix848enjfw1ul0n5kpjqed3t5jiab2g90zanrtvdqy5yl6ni2loa1db6xxkud8g2g5x1at3xar29qfrq0109auc1bt6y7vf6hzemktiu0zhm7fmxdgu8hx3kcqzzjkbtzz9ge9mf45m6buliijt2oq9tlhnijb56sl53pfej6hrijf6zfbenytsxhqk53t85fem9h156zi5a5wefuirr795yluu6grjp5suod8c5rls6dpg7uyyuc9rxczfk0s08sn7ulllyeyar1n77',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'm7yshcagvkcsa3yspu9i3g22yzscwky6cr6zcjahpxab191iqz',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'ksjrr4xedbeco3z9hsq2',
                channelId: null,
                channelParty: '0veve3pk2fmid2uruda37ljaprg5oe2uy6xg30cryd44chgbsyt6d7ap6ddqjb3j0xy32wjzaqgd247x5gua910kspm145xk5icwennmtyydcwwcn714k8u72l5g8mud651emek6mhgu1ec74qc2fqki791b7l44',
                channelComponent: 'qji4vcavyxnams7yb0aa91lfeigxen3h8aefrmhz12yumaqfgx9psy5x16fxuxfnql0xmvqkinc0qlbjsr88vggpfffgmh6u3pu9776sz2m4k48zzh2r33dic82cgubxtk8y00yrg3ylwhh99s3xm9ku019d6e51',
                channelName: '07smoo4k617j10xo0005req91n0w0pkdn1sy9x2eh19qbthwiof0w44g2nykq2ktn4u4lh1cqmvz9cvt2krvjgfw7d9cnfl3ssuv3wwljkcz85kt40wq9b9r9vsu6wfbzn3h4tmazdzsafg778ddhr1uoobj0g9p',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: '1shspnsxwf2o3lp1c059rwz4z78wcdlc1zh18c23ws07blj2ctqf9elfyj4gzob4gogklvhvktayrmwcohws9tkd04h7gniqyx6cw7dr6eprf9xjrqp780chmo6d62n6jarxm8vu2x25a3v2ujkf5fnwqgtllt4m',
                flowComponent: '4ii38218r9ke2u6lwl2o81mkwurmheyfjiq89gazpgb5ejk12sbb78di9ter75xc4dunet3lzs4q54x9l7kzl80k64qfi40xd2lm2vh4961jx4gjl6pgxna4end77xg2hl2pbfv8n8feg6huktej7retchhf4g5q',
                flowInterfaceName: 'vi249u9ly3gmibnuquhz0zg9ltz7u2qa1rn1opg1hukbxdbmt2rt31d58cm9rowrayjll0pk38olqeg0f6gagpmacc87gpz4czyl34w4eh6f973cjti4o0gjd69hnu5f9ahrq8vke90begx5h94pwaprlbi6eglt',
                flowInterfaceNamespace: '6j3nbghcrygl33igcw80dxhak76scwbg136h7jgelrsybcpmzkzy5ij4ao5pzibyxqtrgeu3nqon41p8ip52wobiucg8t7sihi5y0zfintcwqt09f9wkkv4nci4p3bxvbbwh6jyd1x8u5h0gpthbaaiz7iapejrk',
                version: 'cu3lxdri207n8owtd8qx',
                parameterGroup: '8yzykportefhbfjg11sxx31h3oex6vb4i2s6anh8tonkjitqul2iaxjs9frzjo1nny1yshd6albqdbvj9av9x8au4dcf5c56g48eue7ok6azc338fsvmkrp7edhdxoib0nz3kfk65wtwq1b1i3u2mmymijh31hrccdfi2djpd2mwk7je0dzexi1futhmcupukjs71qe5hx0pvml580x9katbln2r7sv89uh7e1loaer5auub7avi4602cvepk3i',
                name: 'c7epb2c4zamqgi39x7v6hyn222jlkynbhbg6jb6uw54ieppoco3fuxdl537zr85zztjw653o531496ihs4g9ot55h24yhm6m9j5c0lfy2br2r9p42sora1o0k5s3zpvdrno1lfexk6vu8tzf6c6jeubowwpw5o2cerevryp31rfm21uk4c3gbem536krmeeqsun5srt5gko5ze0fr1ma7ocdl3kzi9hl25xmma0a2cyr702aux179msulmibrsoh7zx28jtrjzuruikpg72bppewuqujqbk1qw9j97tdi7j2tqdbi8nn21bw8lvtz7kx',
                parameterName: 'yny9hk9c0cx7kj26m7agxzpu5z1bkz85djnyr71q9tjcbka2jgoio3ysuwf8fbf57weck668gd6jsvo5ekm3mohi0hi3ckakqkvzg3prc5vup2troi5yr9k9i8dix9chybf3efr2wbrfg8ipho95w0zmtzldoz6hnco6vff0qx4acqhd0odnrm8m2wz69a9eeccuzq1anfz5egh06u6w5zvw5cjb6sz7sd9jq2e470347m5vlycrqqy0cfr7m8rky3tl1wdplkthure13t9a18w8p2s9eeuortdllks487u5jub0zmk1nci5pw2r8n0k',
                parameterValue: 'i8xm0bb2byi2jd1lfsh26zzrmahfrxuxrhvzhh3l38qpy7lfmow1byvdg15x8yf6j7ed1gvek78qrlyk0mg918j67c4bfdo9c28uux8g0f1pb0jhkt8blun1toffcka70zrb49cuyxvuyjhiqhhk9st316m94qp2qe33prt7zrkj112y4dtcy76cojqep03gq3rwgnn6j5j7dmuwp5ludfs0wci31fq94eewxvms1gwrjef7xplpiajgcgqpmoaomx8stzbxhlii507s1pvrt1isqizlbi0c0papxlpgrz05sm1idt6vewz6ldotoa3si9afmsmlo2vxw59wlmp4yn3uda7n98i3c2cmeonwnvrkveizvx79yxogvff2q9y2ltsfa26l430dezhy2q2wyawgn8f2cuvj6zbhf3ku67b9n51z54cku3nq2htndrjhiho8wlkuh50l2cbbbgy3lnj9wpkcy0cm7ef83ii9xz5rfj8gzshagtnzsap5757mkmdgd5tkmdnuswjpmkey07uck6gv5tlgyh99mvhjxsll7g3icdl9mnuwtnwht909sru1iww7rxrk68zw2y1bbgkilc67phndcy3odu3i36bkklacvxxmea4bhz5f89c4x37ent8ureppd5663dvvjerjntfnk2t5xr4ioc91czjmzui0akrpdpb8rttswuf6xc4f7zm6ir9egsdunhtjvmte6gu90b4i5q8j0q5or4cb1nus3dsagpbz6yr4b4lhlrwz2q9qmygjfus3mc80e401wpeu7tttc8v91ta664b7m5yaf9ol6aed83o1mj1oh3tw6bo3zgzq68djpr7y3yrqpneogwc1phbaa6vqk0raz2og7sjky1yypjwx1j79b142ye912slq9fl4led9u10udpdngnj2gvbal0pdpnb8rro4p8xy6z0y962wcynw3qcst1160n5yei1ahsv65y379tnaddm3cvlrtx9v8i4tmr3md0jw0yg553xi3111',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'u3kmkazje4rypoj9rpburdd2ktp9iqcwj7oysfyc5o7evdwtpc',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'ugup9yvowi8o3q24b8xz',
                
                channelParty: 'qxt3qjnsl8sr1xv4k0d55443zkxn3nvbqumns21kbpuubjjx2g1bxc9et3mvpzy23n3y7p66to9cm9zoixw4kcm0ysvpmudrfvp3bvitp2h4j5z27cd5vdgls0ftv6ncqyn7736yzwtelp1seacvx7rp2ybcmg2h',
                channelComponent: '6jisnrbwt9nlugyop6kyut8bxhrpupyrmc5qccaavul6oy74z0yffp535xyizl8i7u4upxwvi2uigx4wjk4cqy8pc5b2v5epw195cu5ki0cqm8tljrgbwo3i2h9u85xzgha9rba692bgnpfvaivt9hk5c50cescr',
                channelName: 'u36uogo7taydpmbtloen7ur0sombnbbfrdwmdu2buqrmo1ej0k59gb1ja7b8lbddailyanuc0d6su758supyp4lunfaqka10ulwrtu3ls62s7pus2tnjaknjfq1z1kivrg1prh37upc6c1jjp21vg02trab68yjp',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: '4h0piwzkl2zipoogcptecfqitafbbg1bwbup5dqqfyj7d168jxyi8afnhrgo8mcytalpe08658zntgftlf8gwi4ohoh2y87ta0c19ych1o37cry1xn71n3up812sb88gb8ob70u3gpixkihz7pqnbn5jyjn37jx6',
                flowComponent: 'kez514lzkmkqvoulq1fbw93aargqvncrw2xcgr9se644gzp6qv6fpcd59az8w7plj0ig5h5gf846xawyk0xjbi14p0l4d6nj6lbkr4dewfq7h9wbgix08kclc6vxnyk7xqi431ck3arf89hud75b1f3qu2u7bab7',
                flowInterfaceName: 'f4zedrmbdarg3bn4w0hc50mu928ixcustrw3bdv818ieakq5ashsbheh6pe9lb5z1l626cg0cf647xqj65v9ms4ynfq8a6iv9mxac7x0nq9yn5bzlcdl9j7tifeua6ig79tbrp47nlt66ulywxbhbcki85of91h7',
                flowInterfaceNamespace: '04sfg75q1bw1lo6padflfdc2x6ugxnfwjqv9tnwycjuvz3182d0xmi7w8nhczh9lp4cwiyv5awoboku750l3ztrdeax5h0bcp4lzgg6zr2za8eajq3ceh5bw93aaiipfc14ur6221ac61ei5su8b6uffctdybh4s',
                version: '1ufo4kius1ctllsoyjf7',
                parameterGroup: 'w71dkhtccino5sf71nxw2v9mekhijaag3sk2tf49hqzzpweadqpt49s42dn41b0zuyzsscckntfn50o0dtenc4hlukbmj88aah5oe56bwqvlk8myiehqx3j29jtkzp85vmc0hd2wr5kvtgqgfh8pjaymxuf08l2yswskthdhq5inng6ifskg7v12f4ozx2ivjev4693q1xof4gtzf66072gh5wbm8skci0olqnwotzachjhqjyjg6elhdybu38z',
                name: 'y592ceiiewugd5cnyphvthbvpxjarokglhi75wj90h90mqclq243cogwuzmxrgz3ceqk6q0dh3vq5ervjwyx8ci8nrg7u8zn66pvmst5tijeldftk0c4ui57chzvung2gsbt5dujevpry36fkkofc94d7vp9895gzoysx05dzwwpsno7iouhtqon7ivp11wtaiud7dygsz9e2dbgwgoivcxnbrk5aoipbgcf8a8b2bxt4xzf7c1or8vsfjknr6emn6aimp6ogrmom4yuxa6heql83wxb6fbn0lkm2bwcwf0pkidfr75c63rw3d092o21',
                parameterName: 'mxrptqtva5sxcfz803c83x5n6csavailgmmq9emjt57v9bg1onmcu99ba04x6ybubaj5zcluvrgodl39ictopl6h7k1t4zn9513l2mv9z3erpwfnsew2shi1n1payfhpm48skp40a42d8e0udkjnpwvr92pyubb7432y080cketr16g5jcvbfmr0x2buu4k2crldcyxedhazdtkscingd5tirlj2qxfb9ud92jjaoaztp655mgy7xk0yd9093c2gp3qzatx4g055u60ffqwal026b5wczjcm6zd0s64tqku7jdg80g8q1fig0be4oi3r',
                parameterValue: 'wsiwdr1g2ijd054px5e6rhjpj5tx16qrh3gh0afmrbilgln3g76s7bjt20kwz7ce69xrbvh7l63hgtez38r2pqscbq9hkvn6n99ih74kwafji89hhj75z3o2008vpji7jqvjabfhynovrgqacfnoavu1ma3sicswadrlzukrp1l4uek88njooph3r26je7wn3ku1wknkuhjk035fg8e5af00mlrj5809jcjd99i75xipgp7iz195ahiieo0smx2a7zhtvfxy3bvlabpg5sd65q5zvjxsy9xiqb15wdc8bnq2jwh833bx78lvcf621ye7s7s3ovyw0i4t8i2l1rwmelwi7sa5e9iksn182qjew870tu98ak3khnuy01p9pvr6s35dhz3t225qy2w5eh3pob3xod4xuc7rqpuuvqz6l7srvfsxbcri16ptg4u3lwtemeidrnwvuiefi2id7z09sb4znb9c8yvkuog08ohy8nx32xzbvvto4582atcvn5u81em3u2fs9k3djpltki2jzen2i08qgfzgorqlsg9gvwbbvohb827rqv2dv7c3s7iuypg0timf47pnpjptnpude0exll1a0idjr8h6cjgzvicmlue19rz425w16mdq5g46590p44fusa7zbqacdx03lvlq2i3r65p3a5pdaebwrbzuzm2hdkju4z34f4bm1afyoqr0zts1y3hkuochr2wppm639qo1fl2ph9u43o7j3xoe9ujg3xxlj9uxhav5hdhqfjxo17e2lcl466bi6av45c8fqujjyznxa90wympmevhg0ldi9adcq6yx2pb9wvrc93lpsd25flkkvczngtjlt0r272n1cx4sua4bw9jo95ndriaxjwfsm9cpz5gv62wzhrx9je8s8vwcqpt4h881qyhd9g3l8035qsudbugseael0zvhhe6wj9uzlo56bsr4fpwngphhyvlag22l6o5tx5mnj9jjz25hul3ybly8gvejh8hykenoehjdtj5f0fig',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: '3yzfttootl0da5jn4grimo882t2criaumwkwj6s9fwitdrw06t',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'hqgg1oaqcsy3zh0bx3e7',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'bp5txbwmrkmoq2gu4zyi58s13audw5mqgsfpdwmpeygivw86qqa6fhnkberczr4xz3vmv8puh2s9m39iod8fkdzgo10vaqmi21h3iku37u90wwskbk4h8178s0io0hgx1vsj22ik80bc26k51389ym87s304xl36',
                channelComponent: null,
                channelName: 'icg89104sn5b8sn2o3xjfenk2g7siwwrejmf62y3mhfy5xnvpr2t00ef1jaqwaredkg3t3wq8qxtn49cyy5nvwbxv1o3o6tc19dw18etw6vejxyzagrbkgl6zh7anill33tmh6h9ncj2lj8van076rfcg1cw0iy7',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'n6dn8afcnaaod6yzweopu8e1mqd6zbcst98rwkl3renq038sbdsiyaftngl41a8omgcrens5u3v7wnh85i8fz67lmd7c88kx3fqrgo6a7udgbfzudratquqj4zqtdnjjjsgzru0bff7l4nm2kyuw7twua7r543uo',
                flowComponent: 'zicwmkrsm8dfu4s6yk15vq10nfb709elna0qh8kh86rm4ly96e5hw2yeegfn8i1f68fhwfqjcom25hygpwwbqod0pyr3hb875f5ys0badjaqa91gynu6r4f6dk4jry8se3bxaapfere783g7c48sbtn0vc9klbzh',
                flowInterfaceName: 'vzqbvvf7i03x9bz1gnzwpqevn3mc89c04mnv2rp3yw6t6k70dys0vxihmkm9wfv49i89rxwgoa9xq7uodb8fn1yvpyew3u1133umnu7hiqvj57eo7zomt7v0t30gkymdbtx8fdjloauv1uoqzwr3h783895bmqcq',
                flowInterfaceNamespace: 'yx1dblvz4thwp0eci5gag3021106cy5fdo7v0k9bk0oqx3m041w9vmqv9txczx8v62d2lgdl4ukzx0ahfr8vl141ssjmp2kj1k24le0o0ct45yv1yicjyjn6fc31xh0y1ve41peqmhufgqmqs00r22dvpgc41sma',
                version: 'e2krc7kbzq51ua0tkv46',
                parameterGroup: 'qh09jy882pjf0qohrrpod42nouf55bk5lbgieqf3wfug2dq0oq7yijpcq2fgu5nynyx4h927abai83t8jloa5o2fcrey78zou5yitlo90caz71vczh8fo4hrcyoklhthgz3h813rh3z6lk95wqujpipaff3e0rsb8w1iic9i2o57eho8bmb78umyr6guc3mfs55sxq4tnmme83sna3cdv8wbd736p7365cgsq3ykrlxer5q4bjw3rs8knnon9se',
                name: 'gteeoxsz8diww3gkrrmativrrhkpf5wtdgsv22j2l98p7wxzyc30czrr4rhbiypd6f6g0pm8sspelvslepsi5s33t5xsxhttuzg3ugvvjk70ujyersgp4b2fdk3g8f0tptvqhna39fiqukt18lpuiqc215lg12oxvfjq14figoy5iwrub6cjupf1shxygn3s4y4xc2t3dqreq3kmel1a4z9evtfi2c6nvnf4ekm7kzmozpjx9juop93w8mbolh2x2r17k6zl0jcq2d25aeffr1s3k9j91agxtaxqm2a0kukw08t6a2k93or9zqxpiuun',
                parameterName: 'qvha8p4varfccoi8fli81zxpjh5c9wkima02s9hfzxhctwt7qpoml3oqw6d5bcnviuxpgtt4ubct971lr9qd7ieszkiu1pm1lvkg4b37l89yfjh6ws9441ofp4cp5jfjyregnp4y27f23v6tu8ty02p4166fgxvgqv5js62cyb9wxkewp04z1erpq46kcw5rq4bet4wptn2670g49z4n79viw0swlp18ctghfw0zbbdyss1xst4d90ev8xt72xsptp29ulrv609oj4xplwfbz1wd3qbejg9iomk65ysng219ugd49qwtn9y4oezgqux1',
                parameterValue: '91zk5np5iqsxtlaqkb9nztv9qsy42gk9a9lozy2klhz16blu6lmd08h4f222c529kjt30txuia3e7ehkixzc5m5k2cmkem5r6xfvc36ajksv3k3e5r4z9q3ob89c8zyywvewa1do37z8slh6wb9nx9xm0bt70h2q11f3zi4awla7xtbhw05q03a2nvrmbhiwjtaf59t882l1g7qbl4uwvn2d90nve4izw3eb8242qsqkurj8tqee5g68pzy4a8b0p1yhw8jahnfvnptb6rn5lwm3yx0qjwmkn7vlm9zrzm8u6tj8aswtlied7or9ymqzyau1040zntxe41hf9vxzl3otqumk266qzftvf6k1ismiwgy5eqh50rae9piezd3u4pb81n93vlpifb3u95eaxsb3aekctkfgvnw74j9ui74fhkqcav4cf1larfqi9dvdzbxnquc1vb2vp5q8p3ncogat4494r0dp0el6porkiccp77in2lvp7305qy4urj0pe4p1dybl80v3bbzydy089d52rz79ij9udamjv6qf7l8ms2f94inv7yc1bceq4bsxeptd1sc8pq44tu6kdcz8eh6xi9v34qz39cooqex3hj642ml7r7s514w6srvkudsviqvnmfs8p30moped2q20jm20ugn0txe8r3d5roxz0t41c72nb56box1rlwiljf421kesbgjevsbblrs58enqxcdwzopun0ycrksrxdeqwgrszg6i5erdete7v0lkg5uh1hdav0yod0tcjq265aouamom93u4f3tpwbzgt0t1npzjdz6ei903l9bik4a1vn6taqo4gvrn6l1wvyd1us3uwizr0enbsouxkxcmiernredh71q6rz4m26uk9y3m4sst1xrujdtbmqk2jd27nk5vhgmiiwbap7v345kxp4u4u6uvdm7cmekxdjml24sotepiswzqcn4sld4iymelveg2bb56f6w7ace4jqaoe03qftcfwtqqlsr6e1x3unzdgys9',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'pge1raf5anu245swtm4m65bn4s1x20knwwduwwrg88xwq2ub6w',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'dnw46i1y838rc11a9jm3',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: '9fzadk6d7hfvinfp7n4twuf8bm8a5ejotcfx9e2d1o7v1hyqqogeehdjqid7js1qf8ogo9sy3fjs5slmfv9jbjjciqwrocxifqrx08l5ej5hcs3wby4z8hvi3g6xzt2uap3mwo1jbhe8klg4ivyhtrbyabs05ekn',
                
                channelName: 'tp46accoy3aevc42r8skof6yr5ajqum6k1h0uvoey7lob7x2lnekg3565vcvsa76ndtmj5rcutjuw957fobn9p1fphn5zadoamx119yu7k2jc2vxishr79q1qqccg66mwz1z24z5ymxshmkgx3sjrnwz2kn6h1qq',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'bstk6mm8qpzenkdbzmmxwqnbb8anco6p447ozh8vf5kvqug8fhrg77qbn92deo60qywamh17heh18yzh7siob8s9b83r2bu162triip9wdiseacu32qkl4ppak4j8srwosh8e36vge9ejohqucik3zeqytwejlqj',
                flowComponent: '4cggm5ab36er5et448q7lcilqzitptyb3lahakra021elsa50mwyn7498xwhp39uzne1arl1h4k96jzcpf32zst42t4tesca577sd63da008jhi6plyynrw93mlsk5wjkbgsy0mx8id90clumzmawi5g5sxseapn',
                flowInterfaceName: 's8hgbdplqduf32384c647baizmjxgtkwqbvu2znq635fpqxf6f00h966cgs8k73bs81zoyyaw82n0boszlj6th9duccy91qhswzxd8m10c8l50liu04yptj6045qsdont5rry70xfa2luhrgt28pn8oylge76dfi',
                flowInterfaceNamespace: 'fdx85qg9gqx24uk5utsgav3k41tzqb4pslv2noj56w05jtrh70dqugznd2aond1tl9n7uja0ffvyd2go1jltbh3b2mhxzixa3txa1yiiorfjk8mzb0dkmn856kvjq3dhkpfvm9oqf27k3pag60li6mp89lo25q5n',
                version: 'coom62wiaon2aovu957c',
                parameterGroup: 'cxgpg06lls2h3w8f8d4a2gnqbw9j3ya7t96i20k4tj0xy535ei5erzcikl2n55ceh0qo3of8jo0qtdmo57qw440jmlnfdfw5pktnjk664ix9tafnksmnowxopftx9re7vodvswc1pkwtvl0zmktz0jtbnqhi3phqnubzpucj97inr1k9q7io25f1yt448p3dxr70hrz79j7ehlp53jj20wrfabojvsszhmzwtb4uz376196ycmhv99l5b9btezv',
                name: 'mx89ltctzb2gb9q19e0yiqwa26b0sn9wie748zak1f14j2szte0nel22qr7u0ya976veld0apubzox0f1dumr5i39rep5jefrt3jwbwgdrw4nacuc3jhm5ahyxupusqvrd7770ucmwyj2094pomweq7efviwafdf0konkc0goc1ut7o05uzyxj4eare6889abglimp3u5lcpw7os9vg2o838zooy4nhgkabl3gm3z087lx41avnqv7lrn8ojxnee4uy6a5tp2j8gwpx1lm3pqj8l0jzhryp164hnoj9bqi1r17tlyg5m0ix25wjaitx8',
                parameterName: 'thqn7p6ct36459h505s8gs4chp0i182w8155lppw46calnd3i864mrj4p2n0nq7kb6bc7nkqboxcbp2nk8ow0uy16jzo6km6j6gwo4lzcv1ug6smph9mog0ryjave993go35y48bxtj1w3t9681c90ibxbivaigyldw78s2udtlq16ynjdybhgwd7wm2x3ifk5q3r4qg308ef2qfwitiobkqbngq2pesh50pgfs0cmoqyxno5hyqooyvrpkqycblbos9xwj7ypqjdakua33kvc41ibuspstgmpcm5o8eq5y7fynkrbnbru4e0zt2rek4',
                parameterValue: 'p2u2c4evcs8wzc9a59t4yr8cbv8sjzz86527xbifm5qo8cev59j7wlejlouj22dzqpbnb7q91sdb7tcxxm4jwk1vuvglnbl2lksmykww0sv8s5i28hkujdxtsh9h6j97pt5iffqusxd75iu2l1ke1oe36rvfhyztubo51tg8jgi18td5xyv9owhphez78j64wszxzh6kpzx7guiq1glmkf0jod4rj0gj2owjwhm1x9mcac49xssu5izbrrwe2thn5y3e24j0nvog6vm116qdk9lmrdrt2ccopbtx45zqp3co7ms60gk87xz81v295xbh5e07op5c9cnmhshtia0r98tkji8wqcpc9mpwsfubyhf97p01e3kfoubssiwkpfh5aku2ze3z628ycg6ufmwbf3xqj8a5ycjmlvm8z60h9cwsgi4kksurfg01e7e1woyik06h9uer5mznxfcp6mekkyeomtq7e1wooxy4r8o33zh51ronb02i171ferhmgpqeas1kvcpfl68h0dxyom97ywjl2mbiy7a3udk6mdgqkd1znvq9f34tlgm3f91gd9nu6tlsaf0rb9u86lis6meia3db9jvk89e005kak7yf9ft34zq0ssgbsztm3ivr1iqfhpws2crgcgqsqmxklcla1xyajn5u3fq5c8exdp6qd0f6nvvs8mokaqw5h7bn2lg8dtpeqn5orqybcay3pbfu0jr6p197ifeq5uf4fh5g47o281lkf6zsf9959rofrz8vvvvfarqlfz2n7h3ci4zsfodwaxcjhwwdsivk10nqggsxepyi78n24o9rjzzn4mrgxnlk8ujtv3g6bwz3zac96cap7wtuur9hmq63qvj2rcqpet18uuuab5ano41yra9kxtngcp5785i84z4iz06a1g8se5s3by4341428uhic1jnqnvnra4w6t5qgeuj458gykk2qzoiva1hceuq6oauleih69lf83j9p6le0wy8nqm5kyybb6q7aijrxntqxliv',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'zafwzg9xb83xt87cheiiyvnft020gmnsifk4d2qcq4glg68lub',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: '8brtquqe6bp7k3om4649',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: '5gma67ecgzb3d1chj84w961yhkx8byj3uf55tqyiatyieoiqp37epbt3zoksirheg23xjcqfgi6fu2ncgq87getvv78zrscezqp4ktay2kowsjer5u3ck1ssumk1qnpfdsenlatlvx6riquoe8c2fz9p8zxdwsg8',
                channelComponent: 'i0rl369sqf5z3odib14eur96coo1w3ens7og1qs34hxkhrzx0ov5brprmozo96qc5eq53kd3vcy8o34bilu9ty0fcnfoaat7ht8ad8nu13we3dhyh4qgf2tg1etzk0h1djfnr0vqll327jyww5ho9el5p6q9tk8a',
                channelName: null,
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'wmqvx0abu5zban8c8oztebjan2ils8kb4hr4asda03bupz1s2t6625dzcmghubcsx9vcspgwco7iyor2771ddm5c0u5tapk2zvocjbkofbdsfnsiuudnk2ijc8d59j19ygjfsljbqyvwrkfewdswkbcfrhdu0xxs',
                flowComponent: 'xqrlyr55ij2f3y2gg2l0ld5r50eryz2lmfad1l5gpvh1spmzc6x6vp95eifjrjpte2eepz6mjaixb0k14cow0l92jw3mniu7nocn79ybbj99hjdpty85f6zmyo07bq1k8asqa98ny78ojjdu3bv4ljh6ecbsprwr',
                flowInterfaceName: 'n3djuzoctiwx4k0zpab8jfrqmj0mfp6ser8srqljdlsmng1rp4ozfil2rbuixh1w0cmjhmn9crh0kmwmzpl64ur14tm65pu9apmfcge2osazwzl32ufrtidnbbnn08wue5cmdna1lx6xstop6yawgwtnkjbmtqrx',
                flowInterfaceNamespace: '2ui0mrv4u1b2md80z3zeu6cp51w7buz0is6e20xitt3m48nfjtoznkxxvqpn2frpmajuqla9l200e334ua8kj169i5w8sovfxhfcte0tmmf7mizq04n0mcdfg8f76pcav9lwztl2afiz7iir16h6fj629rliumm8',
                version: 'x7nylhjzjb1uos88mwpx',
                parameterGroup: 'nium5r1kl4a46jsqscgjqh6c2lme6batultm3agx3pu1sv7ize04qcl2w73a5scdfxev4fw2kphzhc4tqyf8qcertectynd59ozdyazg6ixwoaaovudjp6lydlo3wa4z82r8iw7fe3h4effbe87c0ggngoo6uxusaub8owa0r7jwtaudrvsmg14aue2r7j4yfexw5o8d3eo79aq0l3xf8agcwck0bv9gv1yovbd7mdqgua5l7jrguyyk8j7sd53',
                name: 'c0jhulc1makr0lors91knjg1hnucltyd5lp089emudmkpro3u08y0rba4wenykp3wpwyhnowe4dvyqw5fe4rl1odjctnhulj6d734v8v7kdsqrrd8fthlj0snbupfzrrahbgiyjbb8s3zvxpb22uhkbnybnhg7udkt09udxezy3aox1c7deg62xn1zl5ouq681i4a0zqgd5043797p5qh5osgdyyxj4rx9z9zmjrqo8yvm7n2dfvu2m6rh6384atx8ugv3b8n5lxgtdbeco1ttiauf31426akk9km8s1srp5b3rje0rd1q5ntot4g2kr',
                parameterName: 'cm1so4ipvopsgj0qspb8n4d5ipqucuicrh08w9a5uf8rlnj2az2m6uwk8v3fwht5hekp53vto4czdsyofdz015b4p0ofei4vzqxqrxsteayt24vwl9l369alq2dzi7y3bgom9ybjykhueny3job9snpm4fn1da06mlyjkqlw3rw59t1d3zdftsqvgkc71lj3igmlma3zex7l8nsq638grkd69vy6mwkw30tyelwdalvpfwi6wuid3si8u47jgy98r6p8dxingy0b0cjnollib10n3h9c8273zinlkp9bp72ads1gj40dw873eqojau2u',
                parameterValue: '6eww93ykmqeddalg5nd5qgydw82cw4k0k30u7jgridmrarwcydlewxu1ohdmitrlprkn3bzzwk75plxk0e16koj3juq3e93l5li8lbco4av7xiunpsu65hidzyrz16h8cjdnoql3tfc4og07ott567m9y43vj5wp2if9kfer86g3hkt7bku9dewwver9auf85qbib1icurw7wr4etjlgba4bxnu6og5i5vc8t1wmjsn9vmgvwiig24sui41sa5vtml2osvlhw1rjh28p7d1ie818c1roog99xy753k4av2xhmrump3f8nsaml8a1j8sdaowjdknywyowc0gf6o94pj2funkm5e4vjyf6dm6iexb0rkz8muve5u6h2ugdbeit3bihc8yr7qn9waxb5gm0yi1gfk40ynq47olx1nrecj0lonrrkxj5dr9sxwhzf76n9b0mjm45nxwjjz90baqntyuckx7cfbxmvxg120iav2yu9u8tva1n0xml565yg8yy1fexrun935u7095x1yzrcvfrrjt94fj5q108sogsql51zimb5fro2lwwxl0ea29v98exn49qel63ov69uigoh8u10vqj20l6k3r05v081bvct2bgisinmi6n5fp9lgcwjefelvmpo0okv06s5z5fydgqqywxf489g4iil1zxxbk8qk3r9n2li586ol1mvvi1eybzlsppt418k0b7147q8m2r93m5d0vsbp505idfxidsanywib4xc4a4bqzgfq2i0ojj3m8e35wo87tzkmygew1l1jj78gldzk59qly3cmpa6w6p6iw5tbbji1uuacv29rsqgc84ogedcnh2uscgamfk4v8q1rzlhtfkzqeh7284hdx55v8nd479xb4e0phbetpckbaw39jfjz3156zl66sqw8yrnbha3zznprjeactds68eb3y34rgvvkquzre9jvmz16oa03hs7q6drw6616aknsllkwz0z49jqrbdiwb6cxhrxzciolez48epueaq',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: '81ix05fcgfymzji6j4cqoj1779zmo8i0naqp6ylv79x2d16j7r',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: '1mm2rquawr17mu31bd3q',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: '8cacjjlsiom556xc9uqqvtu302nl5ccd2if010617ue12tgx7f50555k2wqabfjvd0jcys8yawwropaoicmy95yjbi3xrpm5wb1acd75dbvf7nvyb0y6ysrab33hlthnqpmca85pua57tzcfayf4zo9i8j94nqlp',
                channelComponent: 'kugy3gt7ph8on5z93gk3wx4n10275h02gwnbgvkxtw07p7w1wyu36yt9r2n835vch2lfqtmns7qryjhvurupd7na73gbw27yllnfzgnnnw6rmqsy4tsvlsrqz3vo1py4y3ipbb7t0vc1fu8ijmv6e648i0n5p7p8',
                
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'nx6tgwbaohhtrjrjoo9z15qgvja9qr5359klpdxi2n6sgex2eei7blvl9cl1ad61ous6dn7medk82gk53vt3rpq1tx5cuchfixq1dhrr1vp7cxya3j7480f8yb5t8xhpiiu5jgk1hetr0saheneqqvs1vl5kx6mw',
                flowComponent: 'ub6wuv7x0fh1r3wb5zc6qmb5ye70tips7u1r51tfnac02i5wxbv2fkcid0h3nmp5d42bxol4jr5elnqn7uz595snatw2y6wyshu7yojmjytx4if442xdzb43031dmbjwxp35wyaiklux4g025zafbyau4rihhdpe',
                flowInterfaceName: 'dgoemj13ah8bj0vcdqvkrzxtj4rzbf8ak597lc89kzpz666ur2njint6seoo5l4hjm566rnstuujei50o1xh9qij3llfc5iae1bpj7evo407ci5k27up27edxx71rwnz0yhl1ijkwr37s4k5xy1c88agv98adfhp',
                flowInterfaceNamespace: '8o9xnw8hr97a4tga6iiwkrhqiiv6y7n7xdw12buq2tenqke5p7eq1cu4371qif9gs3i7opalcmmyww0ottqmpz1txc5jvxpmsfeek3hlkricidu0hz2i0phatkwuer9m2hsa1g5g7jop0sndxlsjsw74u0sct96f',
                version: 'dq1nzz2f05gpxax0eqho',
                parameterGroup: 'pnn9xpm92ol0lsqeocpouf62kpua7alamzyj4jag90v76aduyj9zq776vmqftp1b62qzp86e04s6zlc50u5c6iiaegy0p147nz81h1j2q9hv7fnktomnmta1l6oi78ux93fncsizk2zq2hlixjcbyktga87w0p9p2yfy2sflb7t4ojo2vr2tk9ifvtcjbh16ead5yxissnbfa6izapovglhgwoibh8mti5us1h2thnngv4xrl4a5u4lavvt0xhh',
                name: '9in20d8jjcq9365ncvbfiy33xvhswog5r7avoxx7vs9meer9ch10yn4jh9cmnr0aj18x2whor9dian9gx2wlmnnfei5r1m52yoy346lloiah42ccrtzx1inmdvnlxwlsul019cqf2l8m5j4yleblcfxbce0su6btvwmb918z1krgk6c7cb6czcubqb7whihwkozuwu3yk5tkg0ewre5pmxmfwu5lvroz2saph0gff625t9pawaw0evhtvseymxnsmq7tagtx7n7je0bla5ony50b5a6mslnzi2i6ow93we91aisxxukqdq44yvikhfnh',
                parameterName: 'okkfcsd6xmxz4togfpvqu933q91islypqbtf3h4jrhpp7fva0wdb7rm8bxun1o2mqlfninqxr1osi3zjkk107hmjrll7q8gd4ibxa8vp9ycq7y35jsntt66nechfuxos3m1y0k66383xseftczlm53nggvsuqqjgbi32r63xup6cwwf5t9g0uz0iacn2mnfxx2qtqp1ek7u2zwn9mg8a70gepaw1kpg6p99flu9rc5di6mtmg8tflfdix49pfjjolizn8fc1xht40o537a09wnbou4f8aq93xgw6i5np2fqkaaug3fkj1iud2ie6zz1c',
                parameterValue: 'oz5eelqgbah3il0pm74fu54i5cqcx8ev3el3eofyi8j3q21tj1reuenohsl23mrv49ka5e7982948pnquekfe17djc3haj074j25hsv1ppd84z2r7kft5m282r84s6t81v3jxvp98mptvcfk3ghucy7terleq58spy0m8goh1qli3038e8orue42p5vvpm9705pxjx5zw08ptxfezgo1plqp658pn2hdcsjglc1f3kurg5sjn7m2inhzq87fhxqacziyfo93mlz6g2058bjoqr2c7hwcyqupyq6vvxb7dy5m18serr3e6k5nv9ppg9ielq40pe6j76e8ps34tmedhmgbcyloovirow9cupktpvfn9ck7s5y16yd2zukgyst4soexrwppezqmkiyez5sc3f55zr6vemq0s9vxhm1w3vqmgir4tvzo0y1gyxls3z912lvwg1q1a9mhbbt62j6h2dxbnfsasa6ilrmtookb2a8pef582w1ft7zz0smfkn1mxiu9nygueu6msh0qerfyu6hrkx7gtgc2s3torks7v606f3yf3pa0h4a5v33veh6ww8m6v1kautxvifarrz8kqxppof96r0l69ky9y4uxs1uvdwno2h4bb1vnqxvc0cjqjkxtapqs6u9izxcn4heyc26zw73epwg14qmon22cy2fqs8dqs0u5uypq68lxd359pfbill2jp1pn980sug6mznai3080qnlwotlvb428z800exiz9d6alzfauinh0drdqzg6zml0ir3vr79iwc89os9f7f58ko4na3azkxp00fshijjjehmcm8f4dcszgkf2fu4ysdzhmau6htmbu4ooqc6yfo7t28p5j2wvvn4iba2fwmrpkjzs209u3dea4x5x2aql9m0tty1s6sno12qpy5iksiydfjkxvts2me9vcw30xq0ueremb5mgd896pqvecv248df3333ilss1pvs53iqh0reu47xfuc82fo6k1hi1me69t9v7cnlv7rbo93a8',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'fyibens3xjr3ljzupgzc92bx0cwozt5aeojlal68zrfuthgyov',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'mgkxdjz6jouz8w1eempq',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: '2zralnts7117x31r1p9312qaq32ekpf6s5d8sr00ydhxbrpcw6ekysilkmz7xp3qxt7z7sh6kh035ln7h1rlpkh46uisqh8aurt2wib86bmlkg3ewh7uy0nzx8qjba1uph46fzl2b9udelj5e9r908ktt3c677hw',
                channelComponent: 'fb9tgjio5e7jmr9dhhiug2j41l15dyuthrfjr1mqipcuoxigxedajt0vatm5i36boivqi3illqpixeunisoxirha1aoqphurddgv0eq7k04dcrellkizcgydrxlbwxzcvs2n9jy9ik7eui8h8gyx1wt8bgqhx9bo',
                channelName: '67gtk0kbr578ui0wmswm37iyxbkpeor9zkf0put1qr8q0shb4lf5ynr98pvpkuretq641r0zh6gh207ug5nn86kfyz3ew8gkrozavzlq2d4pn6w07wbsravyjeze3f77mal6hn5e024op39ot0pp906tf1f0tzf7',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'u7g4ndby6t6mrvr7ns9is69ego3vug2sm2iu0jd2q0spuhtewndvzzilmqh86b6n9nz29b8h6ifsyfh0li200t547x6vquaspbhijznvrne7dc6alfqr7xbkmgqlxw2w282ze6bq3eyuskhbq24o2ptselmqf9cp',
                flowComponent: null,
                flowInterfaceName: 'li5caxdcqpz01skbfsufvj7f6j3knl0d506q2evi1kezyiritybgbp57z0mxq1kqxzdsdzgd9v0jitegbr5c8lrhxlzgrowljw5kwunu5w7bapgvu9uwfz3fop5ygioh3enbpn6xvio2pj31iimxrmhhmg6axf8j',
                flowInterfaceNamespace: 'mwmen264gcimmq7z5qbnx8nxyphk845t5f2vczb317e892c7cztt96w14e0iatjgh05iht13j3jpvewim2tt6wuxu1c3sjqjggu9iqjgso6zgjkxfszcipi53qx9v566q2jwc491h7ks6k2kwv1nu76n4y2qkhsi',
                version: 'wzzeyke7c05f3jq15zs1',
                parameterGroup: 'yijk5qbnqqni2y777udvkn8aii3fgzak10zfrqgbkulmqtx9zpbmiquqnc02w8bz8rm72xowcbp8nki2mt8f3dauuuq7qu0w1414dp42nlk327rc74x9yrfxdp95sjf7i1dr64embdcrb136hm4nblk1wvto6snoue0h3k1lnsq462jnm4vvlhmminh34iave3s2ecfrmjt26mp9d0ci4tvh7yll7y8xrc4uxzz8okiynlsrdjjjxdg6sxa8o7v',
                name: 'mjit2h9b74871a44tpsei5666tx0p03ylwscfjsotinnndsawhbkvl11qy9tffw8r82sxcnatr18usyv5ro9dze98iuc2u3l6qj2n4kv2z48ml7kex1k98o33o3pec1ie7cicxf76b57iogy3g4yoc5pxzo4ib3r8m6exru46jz4qm98nvnio9mr6fso9ub5bsvi12de3a4152wxn70b5xjv9maoz870elcu620kag0yavhzm3gp79xvuk1xpukmix7r8przlcs7wg3jo8ios2ro631z8s8p3m16oczkzx5pk1hl7t7e6d4y49gpwiv2',
                parameterName: 'o3xf5kl4cfj8fm2i6thae11z29b1t8ps67vrdfjqtyin56wo0dcye50hjm0tfs11098iq4h89z7tmiqke6sv0udxuxlpgkex35ha069cpdddkdpkhtcl47fpmrwln8l8vkdctus8mor8p6fqz92fk6lukwls3q60tyfmco8d7u8h7r0lhtbkq1r0gezu32mk3x32tk88ucqae1x5vxveeny9946cwm9fjbvedzsvigmgv1uy4hoi5l5u1gagtxotz5w79kj8gp1pdsdvg2yrwrofqkmdrp5wd41arj6tnqzw32tez1ag2q98yc2jtzpz',
                parameterValue: 'mu0n01f4s2gl319suxmbz5ssbuuhus2ni4zoaasjg20dms8x730x0necc3334lmyom2zmyhlvj2jxmulsm58zn5m050r9l2z6zcoxb720yl0de8dl1icovm7oz5o3seob25mydsbcdo2dotyfi0abv2hrmm210reo0lir9bca14495ep09srv1zs2n13kovni1uto6y2rrdfgmgt684vmicn0busamftbstdwkpcdwy89mgg5abiy0tiejl8e85rb7pwkx0d2kprb56g3anegsc01m9uqpvngodnz5vs6clh2qt1bp9xkr3ru93q273nurog3nu6me707xl2qjauswye93vmhb03qm91iel811wooskw0mx88k2v0tvo73xe6j1l589w6wntuot823bfpr1980kua8cflh8o5fyk2r1coewrkpdyroz9ioofc7k5cmz1pkxp62nlvf412ttyj56z5d85r3x61n986otftk23m9f86p1ko6tirk6kv8gpejn38ozbjlobixx2cg4dqy4hfg5ndlcokby6l6elc4rp6iissty8jasbja2hw7z27jl7fpqk3z4p3bsonwkn6vg94v9bl3hn4y5ut2vz5z40g95y8zqsuxis83yu1fc43amc544qrb65cprz4tqh2lspr7pslhbspatsxbugaorgbxq04aese8ih9ohr5agamv6ysdldsf7c7fyqu1b4r8aal6mvnhhi4il2zo1xud9hjwjmyxpsqrh7q34k79zrbh1q00lfo7v5pjwzttl9cdchc0h2xr3zj5fiqcye5eenh95y4fmz9s2xl1uh7ydbqce8pax6w4yd5h8s94aeluetrvyou1684eyhi5lh4edeg8qlgf3m1ehynows157royq1cxhtm8ijupy7qcdp484qvn3dianhixg6l04zzhbf286huxvk23oe0elcp5v3hn01zr248japqmrk52hs8lfwff5iq2rtdlpubka83q9avggg2oyj24foim8scuc5',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: '28qh7ci97zt1fyirg1i7mzwglxw2werbuckl25bz2c9fwkvrku',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'kx13un6jxq9x4pnropg3',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'ym7doqc7jkf0nlx4395fzm1dmcyi9v04jo9c4y1zxa839b0nsjlzo1hmasxk36nvags3ri7685inlnuew9nggddjwjhtey78v61btk3oc0g8un6vvulw3evvaay6rrk5xaq96yyp1noywcohu19wv9obl9f9x0ue',
                channelComponent: '89x5lxrp2orcu7er72zj7o4qzj2zf59ckq5era3ntzaegmbgara3vldlhbm7cnawqstmord9ecjrzvb8ihd8web138soyosc93emkmcfwj9fhkt8lkrfwopp75sazpkx6pcvciywd3c6yg46v9wa6dznykru41aw',
                channelName: 'qgmybd8ntw99zd07ynp52h5gtgbl21i811tpol9pf5rwfaau0xs35z7xzchy8u8jm6i57fbwouqlduh9kelc8rxcmqmm508f5kk2ovaalsd9og6zafyq7iswk10q8a0ds366vpz8vblyzt4r1kmdg2ebq8uix3xp',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'ns2q2umufx4mt8tjmua28nqz8fss8zmftsbvbxuih2zq9caiykzit13hveooquc7tjjffyr5ekpbqeyxof2y2yss0fiday55hyelutl8pkxrxebobi5z9cydiyhj68ghya3vss72ju5dpgpzdcorga84b3m83dd7',
                
                flowInterfaceName: '7jvz5f9xd4ywko26xutn0v0oj9mgu9tepa9sq2n7m14mbin3n1nppnah64ulvin2e8glca70ewoi7pyf1ibtp6ck8cnued8lcmohqpggh4nkm69xluajezkt541ooovyqopy7fholfp88n9feozak7oer68zt59f',
                flowInterfaceNamespace: 'oigjnsv7bc80h9x6tawwusdbcufw4svr44urc3ga2q7d0yq17ighe716987k1qo7u1lbuu4y2kardna3zufl0yijpjqhj63kekur1fsa9s8xxr7nl9p1u3afe6kt6ytx6kldbd62zr75kvm1dpnynrmwbxp8vjym',
                version: 'b2e0em3nr8noc6qy9xck',
                parameterGroup: 'i7eoqs1t741982s7r8bra75cekxqwxf1b1t7yzxohirly91bcd6s6edujsp8hs012itaskbsojw1mlnxdhhml1r4gaj6rpuxuewd2rof9ksoug75l5k53ae0h678racmvpt1uu2y55urne0ad43igja72uqniw2jhechjz03udx36thaxex665zmzfhjmng60btl9p4auxetvrghb5gugnmsangcv7bcs3fjslcs1ume0ff80x3rngp2iworzg6',
                name: '7qekkz8k5kuhwlmvb6kxnhb5tbrwc9lalnx0leldsieke5qx2ua2cjjk4fcgvfoiom0bj7myxkb4py6kq20l221bfwbn4jdxfa9k8k6fhwim1s0ks13w5e6nfw8cth180yyi6p69gyduj160tdpsj2nzibco8y0lkaaupklbcux466s4wzbxn6vriearzzz8utd5v8fkewlxfg3vu82f6hyz11fuaar4gnlbws1onzzhe2f3h1mwnmp3ed07wwwkohs2ljno2ouh4rlotwbkoccte08xbsvk90mkzzv13fdncsnr568jlno195re76n3',
                parameterName: 'hrbic20v8hwhyps0jkhknz1p7m00wgwa7dw8by8bf9aypd4axakyp38gcr3dstmnb0xnejs7ayc3hypbvzc7v0nw1y62bc0dn57c25ss6nt22j2zq9hqo3cmusa860yr5nv115x1eba9x5s9m3mu8ejtfnogmw0937plpmijvoo9z28gvemhc1omtu0wivuhhrtxp28zfo1s3o05pv3nfgvu1t7arc7mqrfshc4k0sbt9b8mo7015d7ldol5s07oy673gerhhl8o3zv72sn40xrte3iqstrwip280ll8tlpmy4u4ohkl8w2urk2u96tw',
                parameterValue: '14z6i1wc0pi1mhobrkgv429aacjfptzp89se9ho6v6t7thx9d892pcef1sblkqwhgl80neiqfqtjxis5vs6mhhmli80zzt0voswlnbsdlheawn5d0haocl5v848ebrmtr2qjavzlx585v5zgkd5vv1q1e2e4mmqpnw3sw6t4tyzqb8lg95ythm5jhraza4dbkg7lwjcs5d5nikt3hh7i2jhn3r7972vcugxgtoovumsrpwquaapht14qv8iqicu6i9iaz0ms7gxfgiqipu49otrvsgbb3ljk2kaqiaic2lj6p4am4mxhbiayflzspvg8hp6r59k2vvefthckjplewytemnofvq3pl57awk3rvrtpz2ib0e4hrtym81ocp411rc4fip6anb67tyg8ay0xnyf8jed8mcz50pcxybe2ga4dr2rif3ni2pho70d2chlyltjoa0fgdscgd1tkk4z370o20wlvy5rgod6xgzwdfvnnbsl1jlzxmn5o4paie36wqwq47bx6u94hgl7u5lownc4zf2em8z5o3ttp3pc69sa0eaxg90x528v4hgtoqdej82u5l8p7105etpgnr71a9phwxln4y3tcthqbjt6j2bx68vxcynrmqdfsbwimyo4qbtu93xns5wnh9hv2u4bcrtbema0zonpojecnlfnrgq7x6uv5rxf8e8zlb0cubf11vja23xtw3q2paj6vuubvvgzt9kkz0efx4xrxyekm8l76qy3s44don1kap8axl0yktezez97c4n3m220dhvr4kghp2g6gpi994ofiyeqkqzl2482h1u8669xsjpm0oswprxyl4699sypwoowdksy45xze0q4e4ivz53eazq9ec40ho9138o2d24pptw3hrq8521oovrfzlo94d49g3n3pxfz2htn09n4kbqn78rgcht3tq689xucigaisatrbakmdjaoiy0m7wq8ubxrfalfpq6tev0ow6nja3hypcwacqbdgq64m0fx2l0fk1escfc6n',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: '6iumfwy2u3x5qfgqjym0pdsvfxggghl9w16slue2ooliwfz3h3',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'a7e7c8v0at61b3s0alcs',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'e3tq8rq3a0s6n5ndtfnfv5vwshejy8pnredetbnybqstxi3pqdmwwl2upknoua8hwahe8c35d6nlpzh3j7erj48o3jhqlony7z0wosrxadb0x52uth56imhwwq9s97y8kqv2iyj4npqtkp1bb5fjh3rph7pdpc98',
                channelComponent: 'jwb2bp1ye2szpnevpx3z28fxfqppenhttybw4sl52bim2d10j0v5ao4kl6jv4vjeycrpd0nmh8246hi1y34a0v8iudvw7htgy9b1pkz8hrpmx3q2w2h7bl96giuannfii5lzdr6zq8umjcjj9r770xesg3lxyv0p',
                channelName: '80p94u4f8x9zrmcbmvxf7vcnm5ygx85edexmsarg4za9xy05xkqu2rwci8dpxwfbgzc82pap5ndtr2b714jm4xahnz0hp73wh3874uwadkmu99ois5lgp3y7ha70tm5ug2gtr4gwisomdq7vfijkfmqaclgolxla',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'jvky0qulut0ewi9qtnws23nfs5uj5o7j0oy8am73djge4q91b7o6ruqcv80sian6wpymjfil72bp4ij4fjnggbyaghptq2431hndqqovi1hdqkgglamv0tm793w6o1amr69s9z1v7uo579rqtunkduzsm0muoe63',
                flowComponent: 'oh9ed12wg4zzo1b16syotoy62msg34i6dhjjy2zmxi288m1e9a688jkoeqce6oc34g0qnxhdc9xsq3drmzpith65tx90wpn2x6o824qic2jf8exz1m5gc1k8k7w275ll2llio4tyggrj2m7sa8tizcnq776ufba1',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'ndxtntq57h4x67btnmftk3k8z4wrmgmzqj1axobqn6ten0m75qrgl6l0yeu88u2vvoih9j4h8u2nvcq8gasv6edr40jfykcca17kuofam5549cz749xp67ndfsy1i4ok50kbzq205gwzkhhlm2aurdhn2b4u2ned',
                version: '67u9wfvvw5en25mirs6b',
                parameterGroup: 'skp55a6bjzlpc76c9b9z8a9o90earjql8j0iqixbxijpq3hicaezfm1zju8jbkwh9oyfvn7uffl7qnu46m7jqus9wx1pk87ysufgf39vnz83kfhvae3845lhra2cqfjy9icgfaygrpr06pbwvvl4s7ig6hfylh9hg1vw87zg5ebcdaje238z7u4fccuq2siuxvlsg91dxl2g5g7tbyxkt5to7u7hx9pcevwmolgvwb9ndnlwx6zf3glxa2i5lxm',
                name: 'ope2puabqpv5iyj5axw18e49u7nvfuwhthmkojodvm5hqsccy0tuwd48u75ltno6x78mgx04zlj16nyohri7gv50d192b1giggptd9gnm4dhxedkrnsvju2s0fvshsynhge1c5fueyyvcv3hskwo2cv25n6o7p8po8bnnob2tl47zf4029pb25xkki3u4hfkbe68d2dehrkiev7e0lwp0gxx9nbjptoo0vac6bod1nr979h7re5k8up0lfg5pzsi1j0ivezxk5jmhqu4zuekzqbp2wo77202a1x0wibrvqykste70mzgcp9u506qbgsi',
                parameterName: 'tprqzc4f8ytl6c5uk8odr3tbvvp83oe2m6lz8gxzcpc7c3l7fd32y3k5z6m7o5uda2kdw7mlbkk599v87itvfwkziygf4lnaeg1pdsk88hu7r2qa1aj50pg5zpwj0ejl2ihq9jmhpn9uxlf6o9yfj55pdaq8tcb2oybbpcd3kjfpptt71ybib4mfuku7r0dr9vb3rkphloadum2m96137k6zrhudi7yr7t4vpclv9m7xj5ietsjs2nq3n1re0u1jnuqd5qayt0sk7nxrsskrprnpzuv18nama45atpf1y9kxci63jfmport4sp5lv6ml',
                parameterValue: 'ntygulektd6j8noip81scvvmsy6mjscsixs68658w89zzanx7b0myimfp7uldt9f02gr1vedve3djv6uu9gihwkefonkiyroizoa9ej55y6wsx76jd4idzs8lpkkipofio8upbw28llecu8vlvm2kpu10suaiptil6hmrsh0mx8pyhlc1jqd67b2s8nepqpnkytqf4dvg4nwhczcv433opem4ppctot5x53u5w87392nq73dxgpccm48bihl01tkxjh3uy102r1zuzgs6pa8zqiqiz2l3qo65luqr6tncma8htf8xd95mulxkfb8t7qxmicj5idefolie2l8i1dxkfoqdgop2m7xcy8cn6aazmh60onc95nhcufhajku0ean65jl9yz2b0h58m147sz4ekj9z43g8yqh19wvwybrku1h11ur7wj7fhuq35ctl0fym7g3niemzde0d5vp5oar88gxmhqixhywjuofekhp8y9wg07t9j6fnn083gyif1nhco3dmvd2mef519uau5ewqte7w23tvssdqy0ygtx9sx8gp3rjtkdbk2pe1gj4v5ve907odjqlbx4914iujn1y6szxh4qmapulfr77190us59jcqoh35iizhmw4jc4uapnaayaepj9bqt7qw18nrmj34fo89xvolrab47l830ua46n35uewhqxrb07e0ewlpporil011x2ofjtjxgxutmbygcgs3thnijmdoztdgd5bhg6s9g9ky44i7a4f6t2nbgk12fvvfc9nptm1kpmzppkr06ssbg5nyouujbzqzixy7g031fkkt60yajfaybfxlico97kdm7ibu0ijlv2p4vjlari8qb7y4hmggf1clxdkaje0z0z2aategwxatmdn22r3wiizcwege59itqeo2eng94vzs2czmg8g1ym6m7edmpfzbfrd6bbk7bim2ph84lw0ipqvp7387c27e5dx5clowj993gr9dy8qd2r7qso1xffcqeuzidbq3p8c0ki8dti',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'ti2k5o13rntpxv1brqzt3ge4q6fmbzz88fgpztc0wojcr1rypk',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'hfsec6rtur5tyip4cbph',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'g7mrjc4lctykci7txfv8r7rvffkqgihlrm0l3bra5tk2peqi5b36yj82k7eq692ebwutmbljttnjkngfv944wdqkhkcgef6amp9411cjapzwknjswepdo8moxye82490egflotkf9tne0esbvmbsv6zyug6dmcvo',
                channelComponent: '2x97f1ws2rd9fb852kj9ff9y5hgb8r6n98x02lqaz3518q43pj08md8xkmcao2ile0lqq402ci0j5qndtmkgaav6i4ef9bpqqzb1ewmebnuu12ay1tj34owe65zg1ia23jjhennnni3lmrk6gfcxp6m1b2apcw4q',
                channelName: 'pda9esdzk4cgh8tcwdz21e6cc70ijwv6t7pfjw6eqocuabs6aeb8i4e0t4oevl877gibqaupfngsvv4603vrnr4fznkcexq6ge1a3tao6fsc0789ow5us4l9ipj0jibxmham0vjnpc9ym3iv0w7zu1t9ubtyk78v',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'hy6cj8duy6rzmxjatoweiovf3ipfh7qcgy1d7fgg1u1lxhbcy4ky528r2zuzalyja2qux6kzvfcsrn2u2a18dwka5stqqnvu8xxnai9x5lws015lq6hmdcd46sfoyoikuy5dz2xe5eglj8tlzex895d59ojzuzgh',
                flowComponent: 'kuhbb03otukkzxuxzmgpluhlj8jurzbwdpt713n1595pnxogjjbz8b2ybzddg2ofdoi6799hydpat6p4o2ia916y3339sk60zh51daaxzbc0f0iwbq78b660m19n8qq655i36l80mwlh0zoglqouhl24hnb051sb',
                
                flowInterfaceNamespace: 'hq6nd8b0o45homgk0l5ave9l4ud004uz14zo0rz7sz9uhe1ap757adk1wgzjed140qlvcqao9bhpvj5uv1w7lbciubulc3nc78jntz2xadj6pkb7e3i86dzp3nu2obrung68lsvnb65c3tmorctdtbs55rwybpre',
                version: '1tkfl18bw3gva93j3lg1',
                parameterGroup: 'r9i28jgk2fj3qswwjfmieb5uvaerse5l40gcnrpuzqazwvjzvpcux1sikn7hpztkzz4h4n3p49zyh6ka7583h9h38vb6k901px0m1wice96e8gqchzz0n6hfr0pkysveyv4qe1iaw9nip7dpbne0zk471y3lmxg7zrbwjkm4ovhhhkxi1uj0d6reobwr4i648oecvetpwmdgrqo9p2kse8etwvpfunogt52itfmdck462xozrci22izwlyhamg3',
                name: 'p2tx6prlt73p4pgdarvpqxi9w7f9k1ts98smw8vmr9ub5tbldsu0qgvau0lgri2o5xm0uobdpdui1zedhaibrczt52tk1fg94czvrcug88py3zaxky3vkd6uy8yznhm8mytjn4j5027tp3l9duxwc23b7dgxdbs7b59ezk0koeg8rb2slbrqst2k593mfuq0n15mnmiuqboq4ehxipkniaeoni2xexmy6fr697nl88z81r2irjkrs3dk41olci0vupqvtjle3tmkjh7p50whjouni794oylxo4qmotwizolwijxqs29d8zcbkop0zwz3',
                parameterName: '3fxdijlk17mfb6qi3cz5a33hsejiqkg2ui1mujnxibxjncc3sc4yl8ylbhc3wlo2o3u6r7oouymm1ti6pbzxxyfi4ye7tg1eszxqusr7mtvik3iukzmdm8aklzodxorfv828eq8k7b7rd20qvocseu9hvhzhn5n1abhp9p6wj0djfz7kau1vi1vuiueqtkluw9b6cu1dpd9yz2vbj073x4kpca43yqc8gjo1sh9gvs2rbl5wq2bida7eh1jo6hzmvxnytcuxqpaocbgmmbi38lrqyine2lmlx94j40p8hwpesgtfqyo47tx0loqh2v53',
                parameterValue: 'gjmcv4ope24ws862vdsap417czciag31dx0l36k3489gsfvf8q2yf27zb5jem8ste8jzct793f7a65e3kog1z4zu07hu5u6ufwcauzocfdk2jqi18mebj5m7chnewg8he618kqvlrnup9vsw95j4tqkvr021syp4es9aujvfamw92vk8839e8v7sewcwkf403px6rlm6bbpio8mo0a68hg6829pm6affcmt1my243eppiux2ku8ivkxlgaid9oz9cv7xqlboylsn5rkx53ta6xccyqs6elcpshbl7f5e5uhcrn3875lnt38y8p78wx7vb7zdgyqg8yzhz5qmzd7wywfhovq9asnwuhd8z5cy3650yin7vwvq7cbvw11fpqgu376ab79g5qvvb3r28ax8eye3f7a3vzqk0oz4pcgbvtf0uca1r8krkzh9tk1lg0i34u59bzndeqptfgd3xcteysnsi3wq2pzhbnzo676105db2nos179ypu4cb579lyfhtekrxnzfili3oiawyraapaqmpejn4om1zkjk2oi26trhz6wofvk5yi59jwq2vrv4a2h25lpncqkl2pw97vp4pejzfnd31gtrcuvbdv8qvnh9507lihp4x18upambfond5smlhe7zsvxsjty4vj1jfqozla957pcwmxwzgyyjzm9smt95mhvmucrczx44fju536v7b8q4ru2djrdy3bw8orbo18e96lns6jp3pcfy0w514y4sjvsnd2msj1ff7l5lv0r18m0qc1wuo0ai7r35km8aupveec3bk6cbhknqpd0ogbne11vro0o8dqzxo75qp4p2zw05s56myasp3gt2bkd22uljt14tsvl955bbn2fjjnwofojtdehn18i9l5i9nd824qs316anqkox1o0rnh2puusrrz8e9xh6ivklomtm38aamaqb8neg0j0iy4r07kv4hz9k5mlpog0zt2o58vgnxqwlnv9sxhk3drzd7j76p98ho33nshekghr5m7bl',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: '7928emmlcfe61veyd16bx61mnpqnbipuoy6hwtj3phecyy71xy',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'avc6u7opd8iyfgwb2n58',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'nfwbl8apv02gdiacrag9t2jha5rtqbgtdx0fclht8y95dww30l9ib6374cjqahs4xm3q1mttneo1rp8okv7tcn9zbbyns9zpl2g8mbdxrupzyw3enkcy0mstz92trthi80ybuerm24cygslqy5iofx79530oa3ng',
                channelComponent: 'twmm4rgz309ez7ncz0hw3y3mvraae9k4hnou87tspxqam33ab2xw045kdl78uppxoaghg6jb3m0hawth5068ynvh1g7ep6298v5hdixjoq0c442kg3tug4kw92o6sryy5yzmnbc3g77x5vnmapn91zk1le879rid',
                channelName: 'mwyf5nyr7l4mzux21lrw5etm13xvsdadfl66e17j4m26kcpvlkzp5wb8rcmob7agi5qq0lb8bebxbfj0qcki2os8xyqduwt7iw9u270x07vbmp1f2xwk1hyf3fzpvd5i7g3mu64b950cevzrrbvkubhx2i5eldgr',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'ede7p1fkoj60xl0uzj2ehns7ahsvlyrxnku5j0ol8e0amqkf6nfsz7esn3me2t9as1bdanv2pjkgdbpcljeqo0b2dz59kc4du95n5krsqtlwghko0kgkjci6ezqvrzyzuyx6utcr90ob4w8d7czglpkp0xhnbpi4',
                flowComponent: '2kgljarpyd8fqm2u95p5xf8s17lzaogpa78klsg5yojx4u0nntv8l9fx6zsnxe0zqxb30ltlltow04zc0p03cr0xy7vta9b5ypra4ggcj33qqelxq8qzanr8df23k7usn2jb5n09kx2ftcoqagn0z62fk10geexi',
                flowInterfaceName: '7jgyxlg2o9uau8q9rg2l9ox42zb0fukjcv47amlsukxcv9sdbinrzcdgufwawd9deinjp9nhh7zghtzigp7o9asbhga9z40q6kd1jmxqysi7au6lp94hl1g8tiphlkpwnqx9npt1qkqsgmvz7ekw0capk8ryaa9n',
                flowInterfaceNamespace: null,
                version: 'meqg1u183tspscctn61e',
                parameterGroup: 'y9l1jerazi82e1afgwzt5iy5u4cfsy7l438mu3paxgiq34iab3daam0pikj9uxmsygfk5gb84vwtn1z4ljgp3hft1sjgphck8nad55rxq6pzh1njeui49gz163o2hb5rfy6kkn6086bofbgjqqc2738f6mjjra3ynycgtsyz4f5dg8dbur967alf0pif5xrh7d6so8ys4ymqcdfjvq7rabw9xgt03z58oluule1ocvb3idejnnltuoux3l5wtx5',
                name: 'yspsomkg07yfhllkydprzecj6eyivjsadqtaz3cxmcsy7mq1midxuuhciazq4qwpofsq8tcfi3oktj2j4jxnr0eipiwo3juqr4y2nhkk4ziz7gbjbg6nko4yb289r5juvgq1hyvtj8f0par6vq1ljd1l00k67gj30e1yeanm9y2yojmgwpemamqktl8jmkl38ra1zsekbe2c3iu170j5wnowdos9gsg49hugsbvusdq7s4umn0g98vnq9ahmc7sxmskw1n8ej2mf75taa7au1dsc3331ff6s1f373vn03xmkoi2kd8hcseiyvjpk2scp',
                parameterName: 'dafn14o0gqbp2w7cdr550nnd27r6ebqhu203n4mjhtwehvpe4tst9pfzboyy2hxputg2owewqxi07j5uro2gugv8jwh5hz0dp37vh6kgek33d2yavdo0we4c3m3cw4l97rm52zfu9u1s9sutus0g0pp26hbocwg958vxrapo52q0cpa45pq2rbkxwdbwq4v63canbm9j25bgd23y1n8aiu6ce9cxcr7fodh1ffvv7e1o6n3db7d8vqrah6pc70ksk6mq6u4ih51zu6rmx31dsww1shfj5xsw35g6bofixs6m84uv5kixc2ieaxbyi4k7',
                parameterValue: 'a3jxdh3824ukvuyk8sqf75ozs7zobzz3a19kjcebiwlnct57dts9lm6lb55cx0zmbm3ze2xg3nd3p6bdnjaozebq6w8sry8x8vkokaoe1t3fv2qc9j05p4yk725zatjbxdgvu4pw15it829y06isu4ysvpilv6nwhaljqzqimlw77owmfgpybiojiqy0hgllx8l1eb3fspk06ombarfg6dx8cx88k4cdbvexg5kisuqc0ep67pwuj8du9b4lt6upq5jsw5jbl6fnqbpzvn7tj4qkvlg1ub5j24zonzvmqq6986itqg2hvy4sjpxf8qmgjtn9sm6oa545juw6kelbzj45gsilp7gorvibdotbt6s4tkyqrwi1k5swvp7qi8r183se4c5ipd3hfntt97gjk3z7tz57o83l8adfdc4gzb515jvrz3xzqtbrg1tm9yxff9l49x4f6iy3j94adxujenfw5nr3v5zjmalnqvrjyugjjbkmu49zg2ru1n16h9o4i8cmqv9ksor4zp50b6nuii1yg9zjy7er2db3q5q8xjjsoxkrkmaiahttj5uds2ees7m8gdwpvqrit70lbr71pdpmfzyysyktzkgba391uhxuezllde7y5mvwtbcg0wz87xbm2ulodfrrdqizbrassba03j4ap274u0vci4x9i48i3g7rskmni8my9cpvqxx93q7fk56cxphvv10n0jxufujjg0rkibx2gcfifloxpldvidey0thouonfle5k6s89w0yt9fpmptjtpk2mt1n8acf9287hlt4x3l7gf2duedxle5uwkp7vf5g2gxuqo6xn73k7aop226whl5qt4al4vx03ylh2jirgbmseuq60mx7coouvfvpm8f8pzmob7khi8g2435sf0w6mkilitw1xx0kvtbqjbakuex2svewsi50i46lcr5swrj1nb7a937zg2kpqsumgc7g13yxtyt8amotyjp0x91e3shv8idlgtkj6l1b2n9222rxjsogeun5e',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'oszmqt8jblx9wtpzys61nlppp2h328t7a27iwnrbp8vy3yebcx',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'hyi32p4wi31uit40yeru',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'vj8law4j5ajz7tla51wmvu0ch7sxjbyi04fgajdjbjdtg86l20eawi5uhrc3p7igsvz9b0t7wgzdr2ovjox1yehkodtarjvx9sn2k9ied649tqdkt9r2bhf6prf8gub3uor689oftzbl2ez86mq0i3ayob9oeq85',
                channelComponent: 'pwh6lc9u8os030i8c9mrncn2rjnad14cxcfi23e9fk90qyge1rdkjwptjhdwvtxtlqj872a4fkt8jakkwip1038usufl0nbppma9c9ortssiunixjnore3iyj5j2apde87ypefghpwgisegzyggtp91caj7ucprf',
                channelName: 'twu7i79s31mula9bna7vj8h784bgfizbof3g3vgokp4k5atwvk75zvqd1aqegjwsghdfi1mwr4yspej2jrn9gjfmaqnvlt6of5z75nnuqvsyt88ricpencgzp45xrljob7h2mq0kzv3b39re23nq75dewiiufysr',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'zjrveixmtctscf8ikkrhqro6mdqg2vdy2tvo7syxb4352dsinrj8p7tj7ash85c9yzy0jz8hjvr5tgiovb87ls7sa999dl42w802yr8wpjtbvte66h8qygoaf5ftat7uhhgreup92cvc6fqve7hy99v7n04h9q1m',
                flowComponent: 'h8nmfekdq5v5pujuaejvifvnajd0puta5hdbhhikx5kvpl3okrgpzlpo9myt654ss3xwa6xf5e8jk9pwchkft92zvnzr93jlai6pzpmzr2tt0onhcu6ka2kx7w26o21yr7v3tjd36opyw4q9qjgtklxt1iekjmmu',
                flowInterfaceName: 'r93qh8m0c615wjuahcts8hysosi1eloiso0hzz6y7jc06cfs2idy5sc740o9n4jitopid0hod3aq41vyv4zk7kgszfsvwqb0olmoce2l2utaw2iqwph9uk9et3fh7yyn2ymau0ok44bz3ba5wreyu22408vjn8da',
                
                version: 'b3ghn396yly7zyi2vrs4',
                parameterGroup: 'bzhabgjqc1goaxd30adv3zgas8nxsktxpq4nlzmtth2d4elft1n5al8bbqps9elanoxo1hxt8fjfqb1alvtkzcu3o6h9ohrkp5l15o6p6dixaex9m7ibtbqyn4vocjstjum388bz1b1w0wqwuj4heprrjmx5ixz9p6jv7vp3pjl2xfrdd4w0p8mqa9n1834x4sc3o98izka4umqvbsdycxhsn3nv6e55rxo5s7tfd1qmxky73ab0tyo238yoiky',
                name: 'm4j3k9vrq6hbr0jgtjvvxzo33qq1bwi5fx1h5r9ovvnz0m5pdzl6r23zw41vnxjyda5kkumgy3e1jdqcvd6arngjp4rtt2ktntx48hfai8nsakzuqdxmct6eto0gzuwcjkhc1dag42d4uogvyiqex9dz9kyb40ll545d853imek0y86d5kgbf5hze0vh8md5a179lhic2r90h22o5enhlgt8lgug87chx3dyodotjowf10yqibqmc8ven7rr80irlp3h31j4qmtra3umxsu5pt8mdjpl77xg1oscdcgy1oqesaw39485w7bqrn08jkr3',
                parameterName: 'kgi8knyfxvfpkyx8d3f86xd4uutx30zhpe8yoq69laf6061ce0euvihhm2tc2f1dpbdr7gp54rewh1xuergij1xkm8e4ix6rqfc6x8n8lakg5s4ekipsl7pp0i7hnppsj1rjis6q96jibxnb29dl6pajwiimqpa85hyhc5kxywdd6dn9wscub5ttnftzvjj6oq4s2pfvorjha5b5500dvlk9hrlxr808kmdeb5gkz63zwn8xi326puz3o2gqnkuj55p0y2izqtbqh6dfgo0i9bfmfjft68orgcakb80w2a8dx7ix5qh7o3wyk0kook1o',
                parameterValue: '5108ftlgn2peel9ubn66m3wc3pln88cp7ry18x1o2rs2jy1rn0uj507dqd97ujiwhp9726p3ybb2o2w1fctpklh5erwg5h5lql0wad33kvqy1fy80uzvd2oxno9suw5ve05g93697k3dlc0yhx4kp6m5tdjvd1bxaa7bb56gx78fbcnimk5l52notmbhjl50he9rz9tvnbr5wvg61k8slvffg9cswhrzf9cswp8ua2a9b83o5s9nvfnhfipj3ud3kzu7c7c52fddob80fufogib9ew7momlwx63j5mkx8p0ucgjgxvr4xjx49itfxkhptm1tq5zf6h551dbvixsnemmvqr17paz7ycilqymsqkk7mpmbyuze7uixrfth821p1owze63sq8k18v1g1ik4fjesfppy4dd3sfkutvhciw1qtmwc0rqxz7br9158uljuqn1gn8xypo79cm0vbdnk54w18sxggi78vnf15as8d7yoryweaf818exwii47tad11ori222z3ux2n1i8tpp2d1z6joa8k7q3hb407av43uhm1zp3p6msey9ucj97csabxh4i9cl5so7cwvpjmis282x1on69qpl9q7301563rvwlwjgvo3y6cuesywhsp86h9th2j11vjyv15jixvsnk8iwrldqyz26rklaa5o2gld6jvinpfeaxo9qgta64625d6yzd2labt0kwflwz5ruau5x81eced8lb8tntwyyi2hb9gjy2zv68u7pio9u5atxm3gtcmg79r5p140pj6we6wd08pho4tg5uf7ozlbxfiyk9z9mrtye0sn17dvom5a86dw3wf9yvp7m6empi40asipj8wlsl264t6i88k0edtmh7xhxupawpediguit2axw274wd8ip8z6psdrnd2q9potckhidmozkomt7qnyx31v9w80w3xsytd642ks37uu6jyhntdfc5ox0029i19ytp70opzocosen7bgc76smi3crqrv6v80mqgrgitt2kfa07',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'p9r9e166ihlfb4b21eq5kf0ocx3putoezgpwaferaq18olgl7r',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'svrv5ixpwjvch6u65xgt',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: '9pbf60nhzvsv1k1h4fx8yvqd6ajdcjsjdaxn185w6xgwp9roc8uh956jr6dsex1uosslesvy98qnfh74b45oshrzfeipi3h8zbbgt2sbycb5u7wfthum5r5g1c838kw1an1xbvvdymzmlwxo04hrhmi1c5isemie',
                channelComponent: '1ge4ay4n77k2470a030b3ampsn2acjgizajcsk5jsxxh3hxmts9j5jjbclibra4htski3qdjpejwkurtfg0k4paep4sya17q3k438kj7a4ajhgo3lb4e1soa45s5tmbolniuntpdwm626lz2qlpcgkj8q0stcz33',
                channelName: 'atzzcm9k099mvwoiow8297j7yy0q8w85iqig4m51clpkbiw8968azugorvb2wiim97umyr1asuhqwgg77s7af12f9g9xx5a44vdzs32lg7e2oa6u3vzewkrz2siodt2jhibvn9jp0fahgekiezpi71lwfmaw84sk',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'ey9bujm3sh8a9b800gl9adbmk90g20qxc8uw4o6q5z82iicm071w94dff3ra9vjwl13dj4kkbh92x2h1kahf2cpsbjgjnk8cey5ruk6kcxank5h2f6p0m77fy3lu17oxn721lvtewct21wmgklj3u35yfn6wbq2a',
                flowComponent: 'ivqrbddm5f54ttjap08z1vwc5lrurx2sa2yta9dhfwd3gm1rdx7d77bm0aapojv14fmbsjzfe6rcp00q4cvg1lg8lf7r3ih0e6c4g7tot79i5u7m9qn10iwqw8kg9ehwahqexj88z6h2te6bku8eb360119cna33',
                flowInterfaceName: '8xb8oz1u4j3fmtgzz8k33vr99ukwsyg9ty2gtrttohkorrz6s35xjppnan28ndgprnqbgwifo5vwgsg9wq95h5f8qve3y468ntnwhskn82gmktae1ypk9zpka3exkbvvm3bnts4owa4g8fbgovedmu7mjft2bx6v',
                flowInterfaceNamespace: 'fwjw6pg66b0bg42u0qvhjvmvtjoxfl5ak2kffp8ynwksxmgu4tfnwu0roc7o7yudmlliv7c0ck1lhya1jttn5n5c1vrudd9vajxal216j5riyr2nt0nqok42z4cgkplphpln414a31aizkyyk67srtwvavcvqwnf',
                version: null,
                parameterGroup: 'glk3mtg8jrz86ub5iky9ds5paecwwbtt5eeebem8wod1p5yx3ktm40up76f692ymbql729cfg312lz2aofrpu6atavotrcbzzr3m1zat1xrzr236f41y5ul0nep1ak97p4kozh9yeb08b1s3v0qyxqilpeg5apxbob22ioa1ehy151se2bwpl2tr52qbtzx8voph7fpjx12djhml42rep1d5a3ednxh0y7a8ushmwkxrs5rufsp9sm9uen61d77',
                name: 'anhx2rjnhgm7ojsz0lg9os96umom1i0vfca1laub2xhualpbe0pugwl0uvu0lb74efhbh8uyefcptde6nycwxxj6rv847r16dj8k5kbp1ngqucrljgvsgvd1dnbsncidzfwmnbm4ug2do7kth1bkv593ri5ul7yrjdgaypxzppnyhspj8lijbzzjx5e77lze04htx79ebexzb874z85kae7yq21z1jtsb01rnudcuqrz7xtnsg1lx6xtyxpn788mo2317p51etn3tq80r2pq8i57jfri9drezp40v37tzkzgpxv130ktfkot56298f4h',
                parameterName: 'zi6tshygbssnjvvlyah70sdnqqjfidmmxfss0l9jugscrg1nqn25mzj37ho0cfeaq7eapkp9pq7hya2tjmn5oiu5iyweqys2qshn88z8yu9vm3yx6bwl9pribo6bzsmfu6nq6n1b0xtkog5y4e9xrza7tc4rei8so1rsgy1jop9cu5wqm3wua1swmp1a0kaxb86ft18kziqpjnm76vroe49jm9fxrx71n15fpirpuuy72gz6svkp2om186nxgeqmu8pbv8ugcw57mr9a34d0q04tdpza3snbka2u3h0q4ngzxko49hp10f6eado1z9u0',
                parameterValue: '001jnrlt4u95xmxpud93zetjw8q8n2i8o8uvn4v8fn83fofp3z6xziego7jlss8s3p3izylnkvggzmw76fnjm63dnaar75gykv6dut2mlhf7lbs04feyb8u6wme2rd0phw31piilql5swvc3levbrf649dpha87tvnibyfqksnivr94n6acw5iv56clluao6n8cj3sd3owh3t2tt6snqjmipr948zke6ppls2twivf8k0c0o1orfct3zgadq5akb6bbetr3kvjpen0diq1bji3nbnqy6kpbdouyj9nixtmyfktdl8jbwr9me7l9lenlrhw4gpaxf0j5ya3cgwjf5fdpyf8negqr9mf9zo05fcsnotyludrqr4e3b7xc2yu5q80dwc255fbm4tkt03yqj4imxpy2e96t5elmw09qrq7yyn0isrcc497a3x49fdlu8xtghk9i715ev4yirubo9b9iqzch180526j3dz3kqstn5nk506pdhbg0h8yooxeqw6miibvi6mppyznfwa1hqlddewn5bmfpk46and9iqpaehq4gn45i75zc9lifw80x26oejlnml35aw32axdbw74fg6y0dwwhacpw0wiiw13c6o1jjb1b8yktz3wfayrvf1icitiwpbx48ymzd9brvl9rscfk6mw221hjqylyfomc107k6z41h7o3e57qg56s6ijs9fnrlldogxqk5m5r9qtpgdhv6cz71g8y9ywm5g4zt40z5qcdwnzkv66esvbg9zchrb3hl9q5y0m8y5ebl6e9z4jdulaywyff8yvw7ra456h45jlddkkwofr2q95l5yph4wg8qt38ky0i5zzu6pmjeokuwhur72rf7vjxc4sy5c15n39sn1owiyxlqve5e8kan2vj9yc74e6qj5xpqm3somjqty6f2z9kw07vf3dlf20nkohtf1bovkmb7tyymx8ezz3iy40pzyrkzsdzsreqxlxia9raum5vr5psor725re6bugtnytidmj3frppmz',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: '0rx3o6m5btroitgt72ylnvxffvs1gf8t8qj268oinmw312genv',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'qw4tgxixfm4wh9medqcn',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'qtz5j52uu2rlb5vzkne4m8w6zjz2ksiux14g1h5vfeqlbpj3kmgvoa8g4xf99humvez3a1m8lz7p5dxg1aqqao3m281khcgq2bpwfnig8lbiij8vqpxsrvza4276jpz4tivsfkrlsbahrt133n5kbzkhxtkuu3y2',
                channelComponent: '9iv7slmwcd02pv6oe0pyyf7rgzz6di0xikg2a4z0g7r12lyncjntrwgj7fz0iv16nrrl96f0twdahmyoz1smuwfutka2v6zgt8ldg8adtyvb5fi8exqq5cxi63chx82p2ecam0oqio6bsrd2c7uu9nc9tiia75zg',
                channelName: '7q9sz6k0vjn7u6xei0clrct403mrqqppzbdriuff31253e0js48hyl08m1637jya3kw1khw87vym5dtvy5xklijx20snjp8m8dvuk155jh2hlpkeu3cc3v23a4qnn7e9w24wngpwvw9xk964sy4c62e6pb2ehlrs',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: '8wipea4u9wnypxprrf0rvx5wjfwxs8rvdfygqj0nln1hqy8y14hu60fg38cumtjck9w42l1agxvtrqszne6mrhl4s6iihpw5thcofclxr28ct7zw6vzngdd9hbxzqpqiewzxp17qs0fbcnueerimasfy3px1k453',
                flowComponent: 'cpaag8e5dc97jps7h9alyf9hkea2vwkdxo2zmarw8tvi4pq9hpm0g90i2r531pqgb1bbyfdk1f8kokqbhc5kfxc214y885y8vtlyjngaipnxsaf10tddo8cd7vh77or1393bbsxt8lk5gs3r06hgvi6pt1mazjie',
                flowInterfaceName: 'dxcpgygu0di5ahkn9im6d0wlnej3ahuwlpnvpiem4d34j26foqt44bxgomih8d6e4tuzncho8pgakeu9q801ztwwhetwvoe8s2t9agktmdivhv8yjnqbl9oj13iifh07vfaatm9v291w0zf0gkqopms0acbdfxoh',
                flowInterfaceNamespace: 'ro6yedn0ilqlnesf1vezlo8vj6w182c4z33lt7infoh20b51sc86f4s4bv5ebnnc1100gr0f0qvvklxwua2fxh2nsyp6lbk1zoz4mhifv8dw2zq7hieq7jcfm7gfvfwgsqnn468axi9plykm2yr5j9awxb0awlup',
                
                parameterGroup: '5rr0jc49kyqdmaz2atgv5uiz1wifupv0wkr7xclfgz9mzqtte3egxadqe0x45mxx7umy98lhmupsw5aj2vihr8kjy514qnc1v1uylayrhqw6965j17bi67nljqcom7g10qz17scaks8weocdd0etttkp3mgjzwvbmv4exwnj55avh7bajvfusukqdcyd4dkzku1i7kjn8m7qz5pu4smm6xldjb45rp3p5iuygcmkupdotxnb7ryf8yixlggsii1',
                name: '6t7f0hgroun9avydml60k2hk6hxux5trutv9e70vsajtw1lvmm4v0u0hilm4pbvj7nmyeaamcri903tdv1wd4yjegr3qd8nnytscyfgira53d0pnhumimr9web2da02jomo90ehap383qshld0u32vxdwl9pw9qaopwkej5anatdcsogi7wrim7nzp7soc2irppclkyxknjonrkaddp4v4q0a62mzuezhumyc5ovdov39yot7gaz0sb6nnqcmlpofo8kg4zl005072gtiwjdsd4wmrb95nbbtdwzpyhewdn3g9tyyfhe7cezzepn1agc',
                parameterName: '061r7xoetnpzlstkziqibj2r769hog39eya2yh1tgjvki5sb2hg27h2crxbg6i36yeq4sjgdpemu2a6qffudixxj5nj6xygei9ma7lay2zcj6nqx74t5t4we47ttykix1apgiijpdekzhyut3399jaifn41gvz2q9flm52gxifml386f2paot3i9mpupiwcbw3rwbkzvjxl71jgcj5hjqjhcfo1jd13llon5q6rrkeg7pk3glcohqi0l8awaqavq7wm85iayc2dre6r0e70xorfsywhiqlk7m77gwmtwniy5pnhoeeko7ltk3i7gph6h',
                parameterValue: 'xb5g8mfgus1b92zd8brqxy6r8a66mftpk037578pccml8waxddslu9q7be8as6jggumhkv38l9ynsw6ipeulflfcip467uonn31ximv0vdmtgui3ladke6sasl0n3vu1s5e0ob5ghlomz3fd1nfepcapzcjz48plrs4r009lmbw7rw8m3rgt1464osmsc7v2ck2i6hnlb7w2ca0sptwcll40vpegqfdvdaoilu3a5xr5ljds6dokpjgzf9flpcpngz7ts7s0xdqwjajalc639k2ogsqxebzcbairmkz1hoq79stu8t0fihs179tkmvlpgmrqtumx138f7x0ovqu5oncid0rrrigh8swer0uhnrh1gpjlpndncxprphr3s5gck0bgko90z0f2p7a0odeuhw0h80u1x6r756qztk8dpobor38lkw2scppsb6qvbg9h7rzw7aml1uccoq0ks24ingjig1axk2m87mimvnnzafm9nqcc6p65wcg5dtjalostjsfwpkihr2i7x7ihsb1dw97by0mwz2ooln02tmhfhbjgi65zky8xdphdilm3ry46cjyoi09ari1w22oyzxayx0c58qwhdoatrszdb803d7m2j9m293qy2po44wiuoqnmxjhoz0ws1m8vnn22u0k2qldvfewg42ow1j6gmyx85yhwe1mpzytqut8u229di2lnmioo2kr3r9k00e8morumisadpx8yvv7fzwwb3k8mwm4sys9aqb5lz3bdposjaulo2dzpieuy2c9t1cz4s88iz8wxqcw28t681vyi4do1l24fnoyjxv9hh1etyexih6ay56sbuu9l3cc2gitdzjg8s722feu9ngsffh64mtb7sdbdj5y6uzu5bkjn9wpsb6b2ptfh4iv36bhbfcz1xg0sz2mmqk6n8wyujwl7orskzc9g6fab4gt8b6b988ncjolu3a62z0thvumjw2yd7hcpxkuqnqsbo7y69hef6o7here45dcpojigdh09mrslrs9n',
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
                id: 'g2z9e6xrncejryiyzw47sinmg8d4av86p30u3',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'a6lv4nxxawanihadhgfx57hft94q24y4trzalnkfelkkclhip6',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'wjq8n744peskoczuo85e',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'p7hhwyxq07mca67k91pzkjp8gr68bdp96swjixm357g7kw6jzniscyx9zhh43fnpqxdc4dcpxi8xuhhlexiylf22zvymjt4veifmtnuvx36aq0o52ph8qiyck3r6pu0j9qovzcvfddstms5mx6epudukcg52xlka',
                channelComponent: 'o0ob9cy2x5v1gyzq46i7gzrdsy21p428agl56n1fzrj3yb8npvlpkz2rnouna3wwdeizg7ryhprjqd72vlbp9qljx22go1eoz5gdhziuahlh35w75g13fw04ch49w6ovzk4r4zbfu7d6pinaoo0bi7bl0xzk0ii6',
                channelName: 'maunfutuvsvfkk3tvbgtyyv0gejg1d6cguz3tu86oil22ijjm5zx7ktro2e5uhtyhu604cgq3owdovgqlx138w4sog6wcz2zzndcrqb4d5dx8eh24bc859kt8maesp0fm3vs3u2qr85espalm56knhukejcyk5d7',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'wj7hkz609exe11p2dqt07wbos3db8x9zm05vdrpk30kv0cql1c1m0gq7zpbegik4q33jee9292npt08m1xrlsuvnrp52n2mvckemsgc2tn457ioej2ovx3d5swwcn1ax8teo5t7mmqq3kcurvg5nyt4klcv0y5iz',
                flowComponent: 'z71cfuz07g67w9umkfujvfylnw97lek7h6ltwuer6yane7klzcg1cwew8k0yp6axnv57gzwox22s50dkzdxidjd5vsi9ys9hq3688dn1pzcouqr6cnck3a6k4sddj3crgq8l87u3vomzaslcs4vu6kb3rdjmg56v',
                flowInterfaceName: '1wcy03jhxp9nst9v6m3a82lj6a9g9rp2cgzx0oc6q2fvmvh0vgs1voshpntuj0lado86888t2qjeq2zyn5tzj6hz6jgxsdmbt0tjeyalcvc0etvcom3p9r6gw2996nk040urvv6mrxlsbz4vc5o1wnhecjmkgph3',
                flowInterfaceNamespace: 'q9ncg62s1pe3vk5ip43tjndk88pjrpn07fnwulp8zblzcr7ajl88vgr4pe3ih5vvr2uphf0xt89493pie9ce90elzchpzebrsu79zbjw8lr10wamztcqh78znxdllayzisexs6ywzy5zwoxlvzelwiff3pj9jmyh',
                version: 'gybppma6mheflbeg58hq',
                parameterGroup: 'hr7bthifeie0q19nclc4sluhrb75bteas4rza760z38ux0ud7lzjduw7wwfnla3alzk4g3vx4oxxw318ve6k1rhptqhddej909npxqcuqmebkbd0arrxk2194c1yirixlqsfv96o53duo56r55hrbqcek7a0rc65q441pps6lecox3lkicbpbe0eg49l86lfksqzfrpw3amgdkbaxgpdzpoawqandfe0em0vhj9zh1t6t7ffayhixvyxdcyrjnf',
                name: 'hn8wksjp4ev93uidthn93dmk6dm1jr1c46xiolzaf6m2msm6vy5h5440hu2q9f8ri8uanjbsc6euq0cp1dg6d9hlq0u80lmny879u14gkkkwwxcl8saexcv6tzezhkw52cm10ypfcvmtzc8cq45zeuudjdcn23nc458fp9m8f9qrtnlgtn4hfwvvev3wf8ds3sj593s1s02uvxaueg85tcs4m8g42uxsx1nlbp1hcf11cuz8ge6sgxrxfowutcyk140amtduyv8n7gwtusmai2xchhptdl5t4mr1w7qoew486du5vuhi3i39allg1z9o',
                parameterName: 'h3hn2s1h5ujg0k9j1sr5mc2d7nbmk067xpk6sif4yx4g2uz054v7jxgc80421iwn67va8732fx5y20zedbd117jppw4zoqf0kg57ayozlx7irp0eyjpn46qcaclswfdax06vazbiznjjrxs4wiw7acdnd7nlye9k1i0oxmaw4ux2iw0bnrk32kiz9x982i1mxvxn80ayc7d6girt20m0ykqw86yyg3wnnncd67j6nryhvkak8iqd52tnno0mqininf27myy34mhkqp8h2w6l4aufeg1r43obmoe9ws65wy2zwxonu6nejwx1zzg19jlm',
                parameterValue: 'gczr9ajtwj57r1udqo9flgnm7iuhlqmx99bpirkmqazxc5r33uoec5x2ch3pyejjmfal7vwbjjnxu61slqtgb5f2s7lqdhkprve30x0cq9xqp417mh9husiudjc4u24g5solflp4mmxmtqr7ttt22ni2fcs7aexm2bgymdg80or6ygqcwgkhlkcxl76in8dkfpvexi45qhedge3t1c5l3jnidxbnda8jlbw33d2aoiatfa8e36bk0w0n8yrvcczk3gqg12vkjudl2222lk4xzmb45x251ck1zhvzuy6gnbtnla2zgoblzlaa4u8mn9cpxwnxr30rd3dxyuedmlykhayt3myo6i35qjrkchfphdji2j997vxc0gmeq3p42imwn9irxyu4q4tqzu9v9e5flwueprasukcm7qi4x8qy7ahzxqsuvjhyal2ggsh5hx1vr8x36sup842lhxqiu31zyvzzdn1o9s7erzys8swin29uoz1f6kenpb7o20e5q2yl85yqghyxvdnta3ug4kkf45zkspm7zg7g5jwp0bmcnj03muhimwonum2ytgg0ux55n2b37xlhwy8a90zvleg1rw3j1nd4m7goc2fnvqqdt43g9p7gjdba2ggef9702o13812i30e62q1i74dqfipa25gp9mx2mbemyuir7ia937zdzy9qqyg6rhj6swhmboxd5fol1th9hmzkya1qkfyt3x2tb2l8az42x9e80ajcr0w8vat1mnr3czn3opilxsfhn835mudh8ga04sxxq8b9mrul06fjf3d4l8m1s58bwxtj5a68bns8geo2pxgvulqh8ofj9iuozvgxjhnc6v7ahio6wnoexayuydymb6cwjnb4zlb6wjsdcheenykmh34pstm2jvtpp0ovj6i0oripzeqesl6am0gqi41cykogbww6p9nwr79n4seko2ih6ddhjmcahas1y0nl4zhpwd5voy4sbhogvhslhguls8cz8k681rnb1zr1jlwzk0s8338p',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: 'gjkm5b4edb7u9h8irzewwpb8aeugc3wpilhw4',
                tenantCode: 'ecz39wsirsjxcfdu8m7o7bgqsqt8q1m8p38r27anef2y5otdrg',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: '72c3it5zoo0f69pacfhw',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'jnsfjhz95awhjkc7bul3l9npbtuhds66w27b3oa74ee37f91u1p2nl6ywhxpp0bidh1lrq4u1hjtzvi4cc002m6vou554o66nz4wjdeyh0h8yd5sbcgku6o0gny6hlzou9hhtxcagf1hii43dfwzxynin30r3f7d',
                channelComponent: 'rbxqo4cu7rgk2m21kl9es4unicdab8lrwsjwf433vt6c34cy1tr7hfwxy9ttd0qe0nlmcxbfghik7zn5j7iwamsu6laehw1egsknyi3fl73ehgacp84l2gkjy637ggcdjl6z8tsvqr2u8ufd2f678vitu26e0d30',
                channelName: '0cd1mcs88gyr0ikuhr37td6wvk9phdfxtuu6hamnopiijhvwb8wr68r86mfm6jejjgv3vkochtxs8kkhbv7tm6nely1cqi2i4kj9lw154bubrra06ipng8sovsox5u0dm31f3kpthrwb2geh0x5ba3eewj0wd9bd',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'v8s80n3u1uhisr7tu8slatiep8xt7zsext9eptklh12qs7h0zt3e3r8n8t5ujc9xtkvrb9km3l0h9ae1j7uom5wz0ghvpkkm06d2azw3wuwf6ev1ci7mqppdhfkqri7za7hea03uxiusio9k3ujalleq99bq9cq9',
                flowComponent: 'klsx3r3wb8vj8o41ct7zm0nsa0llu57r8y0s1uhc3e6r5qnelhr0k618eop1xc5vj9h2179yx2wbf83a6pdzwyp3i51fl32anvje0lh6avlvsdz2rr94tsw4ec1moyo9k0f1l16f8lo4w739kbppbslj1ba9stdw',
                flowInterfaceName: 'x6tpra2mva0vjo8nurvinyvr50p6urwfhxovhfsyijjqbpo2zrkwfrypvbckb5tdmio5yztr7ta6m2o8lyj3gj4fplb2mbrvh69ddqi1njp1bix8z6nzau5jzu992hkptx1ufjzx57xr79ndma85rauhauavhhcw',
                flowInterfaceNamespace: 'o22ny6rkv2by491tbhlq3ylf9nsopdkwkd1qxee68e20i7eb4x6ph0rwke2mk98u0zjva1kusy9229hwvhfv6jzhob0a9jvxkpllzhhj7rk3p0m65oh6priycl90z8e5mpuxb66zmvn1hj1qpblq3nr25mmhcxe7',
                version: 'vbz45zq66zf5uzluch8p',
                parameterGroup: '3dnui7d1p2m8b6fle4fsotjlcnhcvncfo9hfteu016dvjwnjxlsf4qxkmxb23ougugot3ltt7bf0nwnxvkvjiocuohyyzsypw0v1dq51iaw3atxmskdnzadsieuodmhx7m8sgnjavpxd66wm9ds51y8cz268oe6n5nzfyk8y1co95yuwa3tp7hgt1w53f7m6ouqs3i8xq5glredfsfxuw9bonzd79hl4r5p7hoskfasfzhpjchvmqarg4pefe6c',
                name: 'gtn6ah07mqgkgk76srdf7ucewmmg83wfft1nj36pijwjks64tgib9oa79c22gqkuau8ran03mnu38qsceijr0w51yzzreddbnf2xz6wi3py5jv1nhh5xwnr9qghn69pkt51syxoirh7dfllk1h1ti99ie9329d4vquixh1qfsnxo5eg9phqnymn83ylzy01wodfpums6jg9brmwlmnhpbm4d87o37a06hekj9v467zvkzb6khivfe6pqmdtupa3k72gzveyp49oj2vj2tl6k8jv7vnsz0ciee1fnw4odv1xm3s481t6wcz8x8ud1jec1',
                parameterName: 'x5zasuuj48zh17ddyokr5xz1tnkjuwjsro9g4klsnp1pdvdk02hz2snzv79t4d5ardv0qxe0d9pucqokgs9a3xeat50q39nr172f54u3lwk8i99w76zxv0mdoi3jbaj3rj7z72y0fdfraw3y88u41xzg47fu9srlf5y4r5zu4ujjvh0jdcpq6kdz8v6qazrmpjzmntc7b9hnmpvjan8mncli9k5pr0fkhc2l9acmxc8g5657txi218o6xnoxj1t4c995aiupla55pt4849gbgfhbjtfdmeutm2uew8d2ez0dw8xbejavrgnojup1tp42',
                parameterValue: 'q2p3rdlh2j7oe847ta8b4gagw2rzl6ei1kpazaijavrelo23fgapuu179vst2avt4akr57edym1vftsockavuwqs22f3dwnddqsbvb6f7m04t8iabljvwqj3xtniwhjuegr6yri8cjqsycdcivavhk4yysfk0i5fieugc3c7nhmmxd8jvoo2rkpaqh722bjdhm75glz88t20556h5rj4tmrtmsuztl5xbx1bxg5oa78jenelu8g1zpb2qityyld84zknyptumela9sy94al5mpvd51fe3sujb284svwc6tbwn256rssc893voanw8ulqcwrhhtizbkpwgs2el8h30t561boayezsy6y8y0xdxtehly2p54djr9pm1nkyt8p8l7ne244gs2hwhj8qbwqv0mdozqa3dvq89fw8l6l0e6ehiua9n6ellqhx4qexqcidxgw8ypscgjr083spcg2zbsdy5t4bdff2l86t3eozxohe0ymmicltms6073lpj495gwy0y4q6lzi1fu7j5g7ixyr9une848oaeftur8vcpkidyza5b2jqhug3hqxh3hhe2ghy6xwgpo8hv4qkzyub3ywephmjf3y9ws970u8hb5o9oazgr4qx2wt44gclu9jz7thc7i3ref2ddhscq6i52lfq4ikonhnju643v5p5d1pb5re99xuamh4c81zih75h1rmdriteijec6q34i85aj4sgip3tkmx6is21of32gknu57kno6wvzpz9lpic9c55uy21029tsbegm0dv8yvf9pwronhdg4tjnw1463yy176kll2vx2qevpd5qxoxnlw10lj5p7awvh0wyprqjm9idbc3zhm9r6u3tddl5qce2088zox5wxsctxgtilvoygmg1za7n2x1us3fgp913ol0huj0popgzucuqhyjkm6witjr2ozh31u0dv61fz2g1jhvx84olgtgdiqr7mtgz2988ovnfcs1hjxfaxu1jjh7k0uxfpw39yjvjxisclumkesd',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: '1blcq5tmk8f9r7dzlsvkdp9olgtqgnmnqmv7akz1h8n3p812f6',
                systemId: 'g078pzen3xyjgg0k4mo4xwoc2v4ztwurp94hn',
                systemName: 'is9hrsjm8288hvb421j1',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'hffl96qskza4g0yn1ufdyo8eee6ediu0hf8f16psx53d5unmyhyy1vsdmrfnvupww5l56558konkdvifkwansc0lsblerw46ccprceqn5t9lcfy44df0vw6bj1ynxavb8dqpvtnjrpu0u0x4wcfs9ys07ryl3lni',
                channelComponent: '1rli38gnux1r0zp463wh43tw9z76186zsncs3hjob2o9z65sxcu0c2jgnjph97xghlj5cfsvms8ria8svit4cvhonwlzeccc0qzwt00iapva7brbz50j374s03kycpcizcacg86nt2rp2r1z899wmdxkoxu8au5r',
                channelName: 'vz6n1lg2h98hnrv4f98fbrqxtvuzstgb1cbbxojjpw70pknp86httyv3wse94i2s65x71ag6sjw3js1vhpy7k1pfs2ertc9qsijefcdxlanma69gizxt19030bxbnwl2gg4wyi4lnsftg4ihsb18my6bnf2xn8fq',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'pqz1q16e4wojzrrwlx50mpdqikwcv8p0f6ewzeookq81li2ghj8d74sceikeo1my5zq6b711nt73t2n30gsen52ro1x60vxu28glld0tvpmk6zkyq8vwxv2vuew1oipv4miq312zcektehircavp2gbsgcjvodby',
                flowComponent: 'sgrxm4g4kk31aevj93eda6ngj31p1lhq8sy7cano55o6w5wejod41khf2eofnbns757aeasihpwsqt3qfzqgxxzz3msltk3p4nbf8v4zgge2dh1rkoifk9llehenf7h6ix2h4j94glab97gj13xhbaoiubsijnuo',
                flowInterfaceName: 'z0p2z6o1qxiidpejicwdjlnvlw4g1hj60ciiqp6v8wr9jj49niz6eyf5ekhlnkcshd1zwvfg3tio1h67jrzctr6e4x0pz41kmz5rkrmcrxv9i9jgkexx7dqwzuiqsgfiif1powvlnozrd58xkcd2hrcysmedzynw',
                flowInterfaceNamespace: 'vs1oc8m4upz70qlpkyveujsyqu837u73gs3ltdi8p468l0h20icpumx90ct0d7htcu0y0evq7pdivlklw1acoab8zrwotkhdubqk03xqn0y2i9qfci9xzd1h1x41qwoqa01p4gykwzsszxmsdyfehupu8zxog2vt',
                version: 'lzxn6go3oxhxkpsullre',
                parameterGroup: '3bg713qv7453fg7a0xrsrep5sj3epzybztgwbnhug3833uyda71sucylffdxrfkp74vz3l6zwnofbx2kflm9hv5xprpdkbsgo3wxr1469bh1a15qu94um1k16s2kvxlze1h2wcw93v675vakqckvboa9uya7556fufi9elgpn7cszzrd9hmd7kx2yv2uu7n06ux100j6fvvrv1mb2bbzykytc7gq4d4sr2q1447ifqgva62f93x3zdpgqfmtwcl',
                name: '30hf7910tue490my6eyk8nlee0e3popcmexe1mxwp997mi1r9v06hs9bdkm9l2d4awa5m0p1lr9mp1tlgbwyj8t5b1zzs9qckej7lebqga0fdz3djkc6gfs8qp5hkpcuht496jlhbo5np35pqvu9vsoy062qc08hwdttnpb0o1sxdl5j3nj9zzwc3uwyarz4cnrpjc1dv7199qsrzhm29a6972zsirlczwkyyaalbkc24na1fenl7q2bwc14at0tc7ux708pmf6mo3tqxx20hq1lq3epiv8fizlya76bhdjx6ku66f61s09krh13sh1t',
                parameterName: 'jghhkv4h6l1fzs36cmf8m4fd3exxvvkvu4zkvi2wf56hc1sydmxfwkxwzf1b9d99qch4lqn4g2j16v3irm9hjfbupexql7xv6pbiwmajpx1006d3u3g07t5hewsqobuso09bt990jqg625sc88ipombdglu5fp6wq72xf0teqyqobith3aspv7omgyuepc45lxqs8xs4t2vms9vm72s52nghfn71maygnpz6lgk93s4wu4rpt5ho7fqvf33kyv4az2cnf5nzbjrb44gmspwarrwyzaj1nm8bif7hz4rn62un4etnmwijjz4k7bv6v3xc',
                parameterValue: 'h55cu8hc0llbiclt105pgo391a9d89g9jp2409fs85qsjx8p7wv00x1ed6qktg69ugdf5mhd0amd8zyaj1sfnbtbk8nf7nmxfcv2n9jt2bed9zs5hn3oas7055af22s4kc36uw8pcs4y8bi6fkcs0y7m8u4f65a4dv4ppuck1p4z7mbz8sckekbpj8ozxj2nkhvvoqbn8k51otxehhvbmw47i9x39zw5xq7psdy4k4y9vwyn9x39xxwigs4mmfety1zvlnuf8focrxte6jk05467dn91jkm2ebig0mm6tdetqaku89aq6yrwihu5zrp78zdn0vi22845c2y4b975evyegyrclsc0rsi31hsyc2j20s25vxaabrl95jo3jo3vas3oimcmq6xfto5ppwzx41mb1oid561d2olpdezof9ze0ya0854u3kgidxun63lsymvq539t1aokbx889ct3p8s87tequ9rmmj93t2f449dr0c741fh282rztzdp2qzmlmy5vpiww4o59mm5vai5aa3x79z7sns7tc9s1bbvq02is86jx6cv48xf3cmg8l1kd27ni5wwqko1f4oupucqp7s4zfbs28fowxomy7goe0j975gbyl2qf7sfcu0euiz3fnr134du0ru8n28a0tygwu6q7uh5z0rk31xgs3pz2ov9abs814pzsdplo91t8hh81hmriv8tmx4oddggm60dhfwz33gks9cr346ri4rw1sg8mvp60ll22n2nhy4a11dl7hwssg9jm7z5wt5z2aozvn8cdztzuxoe93zul8xeuk1wwu70q5ed0y6ukdowjtxlpjnexmi3st1e8eu1407qnz1rfpnumxki1dmsj7o4re70nbvw9di0thiiaesxa362zwu6b4w96ig2k1srrqwxp76i8g87vk7zta4wwqcz3kmn8p5t2reo5nx3w9wvigsl1mczr54jo1koj1bazfmskl8t4p0v8vbp4off42v1ox7hs6gbl4ubgh0mc0e85t3y',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'ibig8vyrwvp7at9qdqpyde6clyh6yofbz2g1iikqhsdwgz38ht',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'xau0erax7zh8n9sx08d2',
                channelId: '9krermp3p4fdc7t2p9xqoofdrlhhwbzryq40r',
                channelParty: 'ujbbvplbsv9d8vd59lbg3us3rvvmqso7zll9y9slct2z1knygkgzmrvauc7fblce8tneeif6xgleilc9fgkxmonowpjt3vw11at1hbsyuh98iz1hjbwngymksizjdclghuaiyak48ip070pvxz9qwnib2vv22f5t',
                channelComponent: 'v7gz6ekkqxa6uyezr5oh86yw3ynoysiqj147f1ukjuucf1b11mwmuttrtxffgxvokbxt12rgv4pde14qywn6kxfuwygtft8fl9b1sd4j83npglyqtyp0hf7thluqzo0hhrxb1cjgw9lkyu1o3zxkmcune5h45qnc',
                channelName: '2vw4ggay65mk2w62cerybmm4nhhq65cref7uf8xlcwwtz3xuubcg5lgjil3m6ihc86c3hdrpuxnj0krv72hu7btpdqdb5k3u7bnxoct7ox24djfz417swxawnpnmmetdttis567297d6rk28qslm6fk0ntha8hvi',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: '1taigjt0jw9e1uibnc7z6m0n629y4o7e6jmw7zp1x3kcu9aos0awiihsovksqp7bsu9jlfcy5b0mhfgb6ale8j4zzli6b6mows789chp7ttoxtp0ihhair5cb16f2z325lwq7p7savobtyranfve3h12mfqat6oo',
                flowComponent: 'ojdsqjk6y2kdo2678mzv69gy8263qbd4b46ocqyjbcqclfeicpe4fs4r21h4lloe2783s8exkmi0ls8n3auyvmpngpqqyklety7kwyams03eh7na678zd1vox77vi2twg5p8xpmjoumn6n2a30ko1qqqehzdbsvd',
                flowInterfaceName: 'fq0nh3iak3lful2rni6r66979jadkyp4ie99sjeq9ug3xd0ov7p6999ndzh7a9o9i624v1jzb9iuour8xlq9ko355kusao9s42aqv8cym55sfs7zy2tczk5rgy7eykynn4zssug26p5cnbiurayht5ka2nj0n2pn',
                flowInterfaceNamespace: 'rba2744hw1zxem3gg2i4u5d0hfu1b6ev54kzr119cfbgbxrkv45spb4mla148shb4knko9wfflid54ymlast2j7ywqdr7rddljx2yws9zkri0tcsj3cvla3ht2wrx6lvrrwkh0rfd2j2nmipetztcnzkmi8bzp5r',
                version: 'mnurkpjjaplpq8vujimh',
                parameterGroup: 'ncn9m6ptn1u7fs991sw84p896p8dy09qo5rjwahobymavau6elg4x5dre0pk5dh126jfp21q9jmw4ihfu1ua058ff6bramj4dusulcz3lnneodqat9os4z4llt9xf0d5x5gyyavabbo2dwx4o96ut5m3bc9gmjqufzr8l72osfwn0o24f54cit8haief2flvmcddro8tjc20vmzqoqczvfhyf7c3rt5k4pms2pvklg0kizgb15pn3fqogkbpyqa',
                name: 'ijj8ytmsn4v22m72nl5qcmq8syeaky3myan5gvjma8qsqv0hreu3ev0msp92n10e0c582y7225fjdzgg67xfo82i0thdm0hp3vjufzd70ocs0ybv9wrqhd7csadav90rpe3km66cp7wappkolg4uoyuyuc1xwnx1evz10yrpd9e3cocgki6723gqvlyl03shy94k5vwbkzrxh8094jd9i203madzwi95o0j0jin8xc6om6e4kf5zgtr65qvw6b53tu463uke21z7zctxk6juy1cx6eenaarlxi7leda56g96azi8utro3iho7px5v4he',
                parameterName: 'kf96qgsyln2fk5ewxndof5mcmhfxgmnwify98p6yij8frepxxx6wblk6iez8avwzbqzkjdv5a16k69t3b5vvzvene2g52k65e7vl52o3l2lhwtuo3ph93rj9r1tdp91ux2n7xf97f3ou0yo5lvrf81rj59h5pq9rj2lr8qsp0ygdp8tjexu84ajpgokwnkqgwey8xk550db6zpqj0umv0y4ktyroozxvyobzeoi6pachakbfhefvf7ndd6nkvvjlf88va1mnfxfdt9nms08ty1l8g2cf5k11yp819i4j8277e9kpno2hz0h9dsimerdq',
                parameterValue: 'yzzbsi2kggokbe6vljk0d3cpgknaz4hram8fssl7be1nu9h4s5koiadz6cmceltg1eu329p0jzvsla4rp4nfzqf7yzgsee0e631x1m8srh0l3mhijdm3ks51gdtm3jo078v8etie5k5bnaweba04864q0whts43fortrw9f5r0s5flvwy3viry2y6ne4qfcaems4zqje7lvn8dqw7qytegbowfi9ankd5qkcvgw085rm6tsmc4psx1zqn9iifcsyb779r4mk6kp7wp5v7byk9y6sx52p1bpwojs71k7cd560shs7iqji6iyurxo0jnqtfy5fu0lyfwtvp4465b31ulhpte9m79vf6ybmaw2rd5l2f5q9ytpfgngv2ex6oeitdlobiixzqm99ol9m8jrd6k3mvgrvohupllwckq7nez20mvqoz9a3e7oiypwla8js0i56vvqi01a95w8bx8h97rsia9nhfnfjawh39baz7of7hm7ck4lv8sd946qourqa9iyu2wqnhe2zywy2gdvvhtxd6sog333uwwfcdvqdzcmn9p063qmvb1safe7ovtfq4f6nx37mmplpp3z2yikbpr4mwy7letw3547vfd9ppt1x2zm9ubq5n5ymhftr3e1lyd1vb7qddborknrshgbr1pp1l84znkiimf74qqzdce55qx722mj4oawh5bntklm6twb076c5z6ty16x14g5kjlk9l7mi3u4fdsn1z9bfkytz7am1fpheyn1vxzfba50l66rb09oruhsetor85j0pm55ks60p2ebzzuuclt1n2svu48ekbq5s2zchynt5e7vpfvimz79hkt16gm2xpy0codo2bsawdi0kazo1336onfizqgab82h5gcun2lgsaaku7sp7gcv9zljneaujmcxz0ad6d4yy7cxum1m6dkmtmo59be8l18b9smrkq38n458s5wqsg7r9dle4zsph7tvkr8ae1j1l20677m4tp1ni51g984j2of84kx32zbvc0pj7',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'r3mp9bpzhmc8qd4mwn3i3j034l2yt1kbk6ztdwzxefzq57c3rj',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: '0mo4k038661wg0tl4itc',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: '6gsb2znu0sppw074y41w7ho177xsk2b1kdt542v72nmxqmqrd03idlsmkujtelfd3x9ey34gy3c0g458zdh90eodlxss6cskxnbj2v651zw74uo1utwaen2yaoc73vl30yxohomiekjyl7qltr48n2qkgz8z7nbs',
                channelComponent: '3se67cxwctybuj9o2kbbkq7rq1hr9oao37q9ddgor2quilxwrmrbv2sx01pzfaf7xr1ynx8oj3padufnl2edcbzndlfpv7y9kxfnsi6gcu1kcgfzafqoh88nba5tfy3wvfswvc1paxx891kwix4kii5qoylw8461',
                channelName: 'nvvc6tunc606pjtj6r0pk0zfpd2ow0pqc5pn060hg26hvqmlkras2oj9f98vk6dws9qgvvzqv9qh4zc8hlfmq4865u8zv14s5s2zl6s23ath8440psccy1lrpn5f8kdewzw9zu85mtpa3idv4rv68zwlmdyd6jeq',
                flowId: '1txxfz1z979n4pe6wcf3m41zkiipqypijasgt',
                flowParty: 'nevuy8uwyxjnnk61t702wbnr5t3tlghl1onijjzw6gddwevykslp8r5pa4in3yfwc2ohg9sbnmqagsgjzwj82tphnkseh2kqu35yd7d5r4ltkh279qp3oy82y969tzx7ws2ith86pjtkdpn93n6p1w8s46vyaidg',
                flowComponent: 'vfksm3uw4m0j1e94ybe9hayt7kk38dp1bdch8pzfoudzx48nm87vjg0iyhotfy0yvm7nw3i6d3vfc2oj73volx2xhtdtn53i36rvdo7f6notuntcmdrkb0tjbfyjpl4tmumhj5s562popc0znmy3p6zu44pqnx2s',
                flowInterfaceName: 'y6tmmgsr5im01trj77axp9nk927i2i25u8ym2ldojfqo1w7lj3lv22l8ndfk42rycemip9c7tfaic9bfycvkyrzr3m3o6zl0h4j10apv5rwmtoomfzbii1vjr6ljnpbf0tuwgw2pruejb19yxw3cge96gp2mqtpc',
                flowInterfaceNamespace: 'ec887qd77xf3ggvx8789ycufj32qeky4fees0m15os2lmnpbuk72wk22hodiez8p4wfsqhd1665uuecev4qd7vz8xhdq4vuieu99df1dfjdo2qq5ep4v13cgi958y4r9u835xy2983hh6ptbwhq5swuc79b5vsn3',
                version: '30x7y8jhpps8hcbxayz3',
                parameterGroup: 'ioghh9e3gp3o1pgha06dr2ner9l4ttnucv1wyk7vuq0uiltxdsrplmmofyrul7wawmz6m4eyrjzu2fkiq0v2985jeotdrkd9s9jvf6k47buok39s3unbkbudzmy1t1ljb0ccu2r3i1qco3j7svjy6zre2hv4qaia1imrjzmvuvkmk3lzgri906pu0bwtcfhqqigndrawumb4qww0b2bnu9w54eosd2l45hcblbv5q0j6ipscojvstz9eewtjy90',
                name: 'qfsw5jfl72l6uulydr5xc323yc44ahbu3mwqjm6cstcmiorp0oetizil5wkg7zl0a6uskz62k8oo4uod5r1wbogjfl6c1js4oysg6v1u71ujw2lm8ra7tu0tv2t04nz2acramb6l2kqcwnasvgwbjv6eoqnqwpo8dghvzsm6h9viihd3ahzdz17ebq87jhkq7oa2wz6znmk6cbs5fov33ppgsq5yl3x3qndu1g8s1wpe4jtj4tqyjjnzevg3fyvoz6mr6l4i7sqo8jaoq9b527acbfli17iylrlbhdn1o3cfgpm3m6thvazf5afng5q0',
                parameterName: 'qb2j8d9xr42r3vgz183ylgcyti8hq6r2z4nw1qyfvbozbgjvg9seevrskz74kur1vgpeymlp07731x1hxlcuqfrbsk6q0ptj4cv4crhqgh2g5jbyu7rjs755glo4ttrr576gne6y2v1jbykl990unapek45j35bngcbr9jghsad0stfpf0m45h4znyxfkwrmjubcglu40ntwz3utcu134thhkm829wkze74wgcppk94cji9iqyztedmxcw7x08512i3fr51iflge1mud8506kszahzdxgw06g96q4whai7o9rjqyvhvmzi0mrfk6uukc',
                parameterValue: 'rttqwhyfgcbqis5ffjc4in5nupbih37ixc2p4sa5vaxmomkv0wd1ffcs0457avy0ychzhvy247739j9gihc38l9c714ubc9dro733qzz69z7xcrc70r3d4zf1cl56fv4lohcb21sdq66frwvq6gzskkar5oukgcm77z860i2t4o0a89wblbdr3pzlxq93kncxuxkc48t3a9kg5iuhetekvtfrfj2akh74t4wr3qgw5mb1xqef4fo0qq1xklpcdnbupe3hesnlc26549ylabs1qfeqymb47a767lyfu962ugl9xh552psw32rdvnjy8m0tzmqusrxpzgoi5kxpc9zl7hv1sqq6z5qkya7f6w9wl8b5v2jwhkhpqs8pvwtm9qonniqsw96hz832d6ms6yumsxi5a4bqsaadfxkktl41ewgpbtw16g5agtskm7vlr3mmic4jydly4hsblc1bhjdtd0yn0khirvxkxh4pyr4gxvbdgnofxdhb42rs96lq1tfzstlaworkdk9d0uc8qwx96ae54dh5s2t53l4bqaihips02vozq7ydd7xewhfnes62vukcpf63ab1em5ci8oc6gvsil9wajy6oax18dkp1b6g3qk8d4zy70doqvlsjkt70a6ug1vo61stn4waisvrpnx4x8eepmu4mklhs21mbubfpgxg2w8ry68niq6e1rzijmir0rw2xm51v9rwl0k3fuogirmoo3ro787i9i6xprw5m7qz3sna815jrq2kfmsbb12brke00n3npbkap2b1dcl2id4tolin82p2hcn3xcmoue3l9bitibarpgsgt3p1bxrkpsn0bbx5t4tgjd4b0kxjz2rs0j4hxoq5go52qozx6262es4u2xs3kdpl1a8hui2gbanrejhqony71y745wvldemhg1slcf5xhqdj1revgj1cws7d7ep2252om5q69xcdujtt22s6h12vyjzkya33sfkalmw3ktsrbjlrs2e2c7pcejz1hv7wbulx0f70',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'so8iq1zjroiae2unymso836ju84etygwl3myre2t2lef2go5xm4',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'j2kdbn4nm9n9iu8v0cil',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: '0m2qmytjykq0twxc59ytmt4cgi9kgb9ukxnw97mko0blzcp1qfd0kqxdgofs4u8ak36kvxkxzchna384x6csas9hpmed9zx9vbpel8mjw7kli452ok3rg3hoy0w7woxnodheljtuoz21sk9qgmupvu5jkhnax4ob',
                channelComponent: 'jcnswb56otdurobu1935zrt78ikh1h3duw0sojp07by6hh599z75mfqditbd6lwg0cdxyjpgiv43ggk9dnlupajknvumffz513tv59z71vfqa0ao1qojrwg8syqjkm63pj31yg6zr0yrw3oj00zxwil1df9uix9m',
                channelName: '6f4edafoto2a4tszr15s56tdkhy1pbw0llzocd54tkrxaxk716wmb94ejttcktqjmow27wgm07a7nzmhjflcxku3mpzbl1a23y8xxsjukvrf83q8uu46wpppli6meeg4674d1cgzppotolsh9abe1yw7dx8acx21',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'kquflvvsydh1xt5g882258p61b1so8qnn6fgj8v0z0e95ptlb9xsubfjpysbqodrdfj2u3wqt1io8q9wgmisoerfe91k9vsqbplr6v257ucilhs3y7uhnlmacpi1a261us7yixrosvbdhik1ctpjkkn8my0or4e6',
                flowComponent: 'w1vwgs067b1ypkpgerwzig7qvelv3h9xc7fg77ayf0s129llpw9grm4grscz2crijzk2zpdmb3a6j97nlcm3f5vufc5pr1mtvin9m4zmv33jtvcvmmusgcull6rlrtmsy4gyza9700hrfaqz9sk6l331ic29t6np',
                flowInterfaceName: 'blkqje8kra0818zjram8p0afwrp1sc9pcluaejw06hmtlm8kv9wlayzy408dl68o7zm50gpweiutg379luebyswdnuevbhh7gd1urgkvbno7xh9y51uwcddlxojpbsth10y98eaxc823bqv7s2l1ojuh99cszpft',
                flowInterfaceNamespace: 'xfcmhcnltsb4i3q2rdroeap00tmo5lxhb4whzuwgbt0n1czs7jipmg09g3lqeg5aigfytlifrtzpz802prcitrc3etq5e9jeoy4an8cnnlq29sftgrr8xtp9k6yowjyyf9weox308kij50ea2zdyhbm3oxp9xrwb',
                version: 'f5dkgqvt385yuznh18au',
                parameterGroup: 'vt6ovvez62suhbgcik6kfntq3wrmsxat9z0l4zybzhu0ibn1vophxa7511rbrqvz0oyyybmavm3drc00mui1tttcpfadbdw3kzyftob6grym774kpmu9ionosra0m09sn9gurs3igu95rsrttt346kbg0yopp4rmhw8l5pghbzhmu8uei1dm2cxpnaribvjjw9kgr15gnyp75o267bpww2voxmferbklpy0fblva0vuajmdgkrwwcmh4uvnqyt7',
                name: '0ucf35u1bbyq1926xecyul87fsg4w4bxdw6us43os11slckrghbizx5omy7w10o4wy7wn750fig1lhfo7h5pf1yz2y4ndcikahg09xdlft7fmx0u2zbahv22cfqoagdbnrvjimydhd1f2boxe7tuvmj8iq3aluoia3ccu1vwwemhg7ragb1ri13ice8dlvixawy1q938bih58gill91k4vkmck9lf7kdhsfhdl3q26gjw51hutuup5j2r2zcb4b809c3fdemi1zkd83buyd3vltxwl9orh1da3gb7u5kjft8wx2byjskdf5hhkvz1eye',
                parameterName: 'niqdf480zrulzf998aut1zabfvyrwqnjvr54n5qt74yjuovoph3rd03g5jz5hguxck0wnyb98p0922b39goojhzmq2qaah7ufgtx5xrseserl0149xztt3iz9u6ola82rdxxvdosugbvky9gp8to38sz0t8ajq1ozzj1t2uadbk7w93lh4aty8h9tp42d3honz97n49cs162rvuckxxr2frypjd58xnttsbr7xkbd5v3qtevxbd55ht1o4mwghkranbkkse2jo2bd23ww5fddswofys0mk1c3oq2g86bhqkw2hpp9c1e2i7tjxyt6m7m',
                parameterValue: 'uyhifaw9iddlrjwivwj8vme8i24cly6cpb4c0a0il0v0b92vwn6nvbzfcebm6nt2fpk5o80e8azcfe5ti20fs7qfgsf6jiazo848zrket2xavfr88bxpnt0zy1yhtt0jljenxon7436qc8esyd6nljsy2joj7iqwh2gf3j0kna2wvqu6ik0u8fveob60emenbko0qdgoursahbxn84upaj7ythhhtvja94gdv8mmdw8h7moocb6hcdijr5p468v3qy706w2m5d7yb1o2klbzdhxzzqcq1fficbrybyfiy4uvi17zet2hv62sl726xmzsgige3b5kn3yevjusmt3l9nmkc55zvs4avanfayjbkjgbefx9my99g8s3nv14iolmui4y89i2n49egaqsrezzxdv71yk4iabp106x30hhs91737n7n1cgvxawuarvhqm0nemq6w821fcmsbef7slqjqy2oumxhs5isu8h33jwf4p9kakj8ickb7b8jgq7et9gj2orcs658nygdr13z30w4l333s6xflw89slvg294qbnaynxdywj0kw3q5249h0sfyopt9op7fig1lpn0kf3r3qtjn941nvf8lfzo6nuxppelpcxt0kdnkl0v6oj6xpu9rjeejxz001m7p2rw2obkxp3v1hcz5a4ghqplg5lo35nzb7j63winww6kogb3zuvpz0jrvaw30xj9dwvtkundawwl7gmfq5gmexxgudzshjdwmusnoyp57fvwj1epqec5a7qdsbqty2g8ivfbn8b8f6mg16kzu88pm9v3t83lb7h1ag3ch60392iz5uz3kt8akxj0hk4uc7cgno6011554ldl1zg0zwxv08ltu31gy9dyrw4cu1l0lfsxinxxw243iwsptfsvlhonbguh8itd2avoyzg0gzkfmtloazwi5rv62uvxqqugdopccyw5vjvwxj5z97s2svhci4ivxjjh84nmx8m6ydakv5e1ik6jk306ryl5rul84hdhf75chom2',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'bgn3w8t0wyz1mukxsb0r6f696ow4xgfb1sm1u7087rs8u3sj3v',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'p2hcx7ykubudg5mumt1op',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'g5losnnir7qhyq1h61mwn2gnz4vk3gq646e9430dqeblr5zzvpzsr8y39gcgga1kurjotdw5y11c44lv6qflfjpq8l7maaf4xscu9tqj0xqe3p9s3udgzo3hgoi5pjjsrvzxvbr6psjynx7ihn3zxp0uqxo8juiq',
                channelComponent: '97h12z7bszvtw5brz009dxxkr1xsqjllkouasrrdcv0oj0orgha5oohxv6sscpzjmabhdsy7gixuc60l5c58227wzoyc1sikmd2dvl8h9d5l4t9nsriv9qrm2nbu246tkwb7skn1mdz3yawfnobpqosgv9wo3bb6',
                channelName: 'juiq8o8g0ydikbqisf5encbgis3g6wbz2geyvwmz4bwsro2vbr3zswk55cabpfto40cotmyvnvr02pkesoyhce5undno6999tv0pi5zyylup4k4i1ctq7raqtd609z3qaj2gr7wqo7f1bugt8qlyhs1notqimq4x',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: '373gk33bzg8607jzffnw5j75mtichszi59m3ycb72h1i6rdmb5brfpm6we9ng9gxsh7gtr40hbgij3qgqslhktiqu4rqy3ildz912plrh40ebp7q191xatzume0f8k6ejnrsiooblkyt1l9s5snhw7gxht00yuxy',
                flowComponent: 'g00rnxa7f8rk4s2nxonrla358d2jf0mczgybob7ma5l6sx3hx7sukqvc9kqu183l7dvm0aqdvoy8kihgb7cygja0nw3w8u83s1zjbepk3m5i785j3ttaeffxwl8jue3ya6h6w2i5gtugkbg2i0u23xulhwuv8f5m',
                flowInterfaceName: 'xw0p4u4sbxhtipek26u95wb0g9aq20rzon9at88zmarn25f94hn2xlb4rv9ymv3smeioeiyy5zfs5sw7v11jzcdrdt4szb4abjj9fzy21zo3sfl8v6rwf02fptgz2qp5mde1dvn80vyddk5etxirrzgsbuaciood',
                flowInterfaceNamespace: '2jpuw85v7dw3e1xszcwt9bj30bxl42raprki0qs6klw58i6ttvaltugvsxg4mlk2qopd2or5511wl72y710cp4o2bm0v8wl37lmq6woylzglf8kb2s7c7qrjunrchav89fwcojatlj3upy82w4k3por047ciqhls',
                version: 'rw1d7m09auv6fuob9263',
                parameterGroup: 'fihzgpouqdp3ehv2cfbzqf8h3r7otn74ylcxuarcqodjd9idq3ndvb6pprc8xhn9xotd3e5vkx5symkz2605vl6ntolwgp6fpdyzu121lj83e4givj6ziq4t6hlyxhqlgctcoqlyvsfla0qx8dd5xqc1zbzrbqk56971fu4c83ky77v0j4kgx8jhlpxe2fy50kl7lgz8peqi0qzutx5v0i23mqoapse3a4ysogcc205ge7hwg4zmixa5slqd4cq',
                name: 'pu4pblhustr2oy8504z7phf3iuzk5mguclquv0uwm6j4hiw3t2t5d6nd96r6ys22j7ggytgzecoxyjt9h758lsz79juhw4w3htolvmjpm5be5vsp9zi6t6d5tciwyykl0zqor8tq4h5jwizrinekwgottd1ny7jht8wm0s2ehw2cgn08104v82fr6n7skesxihphlp9q8cacywlvjx5jq1snxzpu2hpqe2a5i8k0v16etoa5nlp41ys0vuepr01jy30kuw4zegmk9vky9ajbqg6kqe629rpbdy01gd2538nvmxkzybbmuw6e5xp4df8y',
                parameterName: 'a0mf4jqyx5wap8nk4zjl6oe060u8xn4piitd7xauocbncvjlfl21arxcco7tmu9o7vsawfjabrnsbbujx0l8ph5lntd6nmm4bvrn6ka3olkys66zroecxke44ocnwxdi3s06wut2iuysputfey8gqdk4u8w7slm0jrapu641oa5l0imubp7tzir4jawg11yu73htpinsmvsmo3g1g3p5eb7un3oaetlb4b5xhhr8myqqthrryto863n0qbuyaz68ss28dboftdgwrxjgl6ej2hq5emf08d41gq7b5p2cz30mbyu5xnzpbsz2cigruvza',
                parameterValue: 'joxq56puupc28evyjyxmzeik6fch9acw9r67fsrmclqqngqwb89rbbvbq2c7i2p9bc2zf5d258fijy2euhrl1wes1cwzs3j0ou7ajsd6nz2u2sgpjvbda3kcagtfo4etc2bsnkg9rgez8tzl853jpk1yo3uznt5x3zp7fne3rkusmes20u8bqjq3sbxnueaz0k4liihri3lr57zs1h7w656pgpoa49b3ql2tsotc360h989qq0phwj28siks4dz5wg1olhpx5aauspypd8ef79uahjzva397vsvg1p1zvzip0k0qiboiw6cczaja4ny8422p8ygi5crk7tb33gn4f2iqtc6ltlhy7iqrvnroet87hotd53rterk7bw96tdemmbq38pnxhwai6hc4kiit16o7mb3dqiyiw6rxc0reuv5hdqon075plh5nj12pyy4m0q2enj11qwkhpvjjoqirbh0aaoz774a1l5m5yzje91h2n5h7ahpwcvmnesdoeqvr7f8s5rezdduz4u3hrr7ob5k0ow346252odoq0k0n010vt45onqbax5lj62plyf3im7u9x2j32gvtwuy636h4mww6wystooelxht7wncxvhm8zj1ajmyilllq3rscy8kls2efyu8q3cdferanhswwh4ko1tvcpo330kk6ikzlkkgefejmi3cbhwjxhudtrjfna4i2jmkjgcm53cv5mzi3f2dd65mt2ejma4ay2zi77mppxd5pocaputhufqklf4hp4r8e9ed5xepji3h8j6gwclyopzw2utch4i3aes3vwyh3pm3hdtzp1luawdrd28075y4n2m81zv686elxc0iagt0v0x777t8ypimguik5kphu21ug1l7cbbgxhdfl0fivpr3r29yoj1qi59h8s9lq0hkrs2qi558m2cugc1usz14vrqwkmogf3mgi71307ktw49h30rw0t2nngyi927iox9hpc1rz9y8q6hbgsngi08axup02wyumhhm6v0qq22wh',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'fky6o2qazlj2qf6v4c4zb604anpekhre0qfgppp918tsj1wonv',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'e1yi6punp552pm4qhc5o',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'o24e02sfu2etsscwnqza5n8ucdymbk8j1flgfz3sd4348clyvmtydiejslt8opvlpfjx8y06k13qqim3vyhczennoi2wg5n8lks1g8bq5mjfai9he5d07zn468l4j786b3td2718jgvpk2oyul65skkwnvnood3rs',
                channelComponent: 'fhvchnpnbgu0bfn24ro46etmcvj8gzqd30uv2t584hvahb9mdgqashnbw7abb0j5vlpgyz5ugagqw6188ric2ny33b4y8ygp7f6p09o8f73fqcpj6mvw123n3za83nm8rx04fiy2ljfhmbmzfdsvbvelyr7eukgn',
                channelName: '6bwhc8xc5of23z4lgbth0w1ex843ba37wki9xnz3dkws4qe5qd0jglox1tua6i5kypk8uvkmnes67zu8pix1kbm3b1ijct0utmm84e3jjupqcqy2ej5jfp0qfbut03kiku3wl9c05g7ad549pfecz52i68ov0iav',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'arzef0zp2ld9xu9qtzc2525oqr09fmhbvicmayxe35pfra0um946m21xw0fuxkdhhrii89zigkt3lx03k4jn7f4120hiuiml61pu7c56mmu52c8xxt425ul7lct8t1fmrekhw0ui58mv47bd16dx09guwzzpbyre',
                flowComponent: '2vnp7mf11er5v67qoieizakqdnnsm9ka8tvavc78abyi4l46cewsc68sxgkg7kthrd9oue8tw58cpdwmtc6b6rih3nsewmwb89ch6qd1ws6p6h6iqzxllzpjtll2h2opjcj70bkjclzhon8tnlzzps2r5kq1rnda',
                flowInterfaceName: 'xzybetncmyh73qqkn0kdcqs9muu6h6vzxylt33q2x96bm0cvsfd2bek7vt8a2z274mpojz77wsh2vhb7ksy25tvwj6gb0n7razkvcylcv0qi2edeythyacd8cmhouzk2dyb83b61wioxbyg9kq5gy9ijzfbtfpfc',
                flowInterfaceNamespace: 'rovyrywdkjjwvlycw50moqbv5p2vmym30z5c3rk0mkyul9kcb5n894rli0u4mfvb4gk0qnviweigyeretypx5vh3qnxkk3nbwjjwkk0h9buadp7atazhq1vffm4ftx8lkdlskcu04ns3ngoan8emsqcucff7hgiv',
                version: '5vhy20395e557e15vocr',
                parameterGroup: 'qhljdztf2dqf63pcftzyberj7labn3xtw57zmvxgn872dv2vwkilwre4w1rjzvzz3ff8knk08iw5ipd0krawrman9k2m567a3ezj3zupkbf2klyqvsc0o9jxsro48x44azv3vt6s2m8kv00whd35srsb2tsrj2aroenrpjh3l87qyxnk2qs5znl1mkjfv1wmz4btfawwxd9ajw3clffnyy4dymoohy24rrpx6emc1mebho3km05h0ft4nn4tx4w',
                name: 'xuwvuv0fy9uq6rr32rhorxqw1ljeli5c62ly2anlmxkez9m2mswo7uc3fe6ap5i9q8y5h8t87hmhm26ytkf7hukybyj2in5llbzhzosa17edfawd8hvb5ghbvlyg77qd6e3qo2qqpm5m5jbc0our45xshuibse29n0cvf30pdw3oi1f03q63c4tgdsnkutc1s9p75kkppgvzrxv9bdscqnheanyc9mm2mdpm0tsggkyk0p0pp6s04myedu4qmlg4uq4s4m1zt2mixkygca23rcw8qt8zc7o9tyh3658thli884mvy258gm54vq2urq1w',
                parameterName: 'vdk0yhxx57v6doph2yo9mcw32kldrs42f74lcqbccri5062whvb52n5w6duqx73hp5c87kdpbj4k30mkz2gwel6ivk45opxkelje55vqjktrsxxjpp0126iwml8gwuqjr9870qq4y27bx3witbyqz9c1p8pqwwuzuwdrktxt4i4o2m6rm2md1902aa93r487lbkw851k3xcbtoozljdpu0e7tcbmzfslpecdbp20jy9jd5ttorr8g2ixe0ni78p2ea26mesn88ie70eiqs0vg93nnvyl24dww33j7oxz5nnekfd4de9zq45kgysmmtqh',
                parameterValue: 'fimzdn2i1keedy12qu86o8wlu8dhxpicuzuse8dys037lme9ds09om4hz8x2spqxekwhm4og52hnbb1g1p4ucz5bi1c8svuxwdvkv9ewcpzrbje4ve17dxd1iqcmpthcis33z4x4jxg0d87wmozkq9ygq6mh9s9fbz9u6l9wq6os3omu1ndrbl5d40ccue03lkn2uxjkoc6j9vg8dw3vixxhm7wrjpm6mohhtedvuz68aqhch1osys8nbqee8v6cbzsuomk0dx7enevdkr6bty38f1g8if7lb10fn9whd47460y8z4fx6qw0lmzszkl7dipf1wy9mhby5ag5bly80jo2gzh69stj97kj9zgxuoq8h2haq85s2yotgxmxjslcwybzyq4nluguo3m83ocaj05zcby7zb4wfoxrys8lunbk8zw6byfspaqn43vr8xuxx0twvkn0b1cva9pho3mhkvunz886w2ir8eizw62rtlenu1idi7ood2msthj554jvbrdj7olzcb8a5p4jrl5ud4wjugzvh2xw2p87bza087o9vf3iylo0xf56uf5r7wbu5lqcguyj7k4d2i1549akgobjuc4u6tsuyovm9e9j9hbrv40l0elmih347gyit4k2u13f6gnzsupc8fo89gqsbf1iqdpv6rty58sst3snppx11uah578ughwr14yiomgxww6dagbcgzwf0gjcqgs9u1vo0thlxu7exoiom3cfu2papv80xd95edn851oq4sq43qqx06dknuej0o2z8ug1n0gqjcy50acs7hn3deunyi42m5v4e06cp117xgm8ldbhmgss5vizniykfzbhomxt051af5mzw8gehw8w1hidhv7oj10poe800hyhg8kh1x6f3yjxdbfhqmnwkzdg32f1saokaiyi5k4uggus4tk3eg9oc2fwxfyii7zqg9wldh04qx232emvv7zv8vgka8i6aan37c4wli58ueg0ll6btv5nfuxth3qbd5qa7vykdcrl',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'oz1spwzgcdvy5m64pj39btw6219btzkhxsnrgnqnp2pui3zm1r',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'c6inz7qqbq61121vtttt',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: '18s5z97tvu3e7gd9l1ydiszig9nb66gzrz59qph6i3o2pg1z7jgqv5mhyfnfnle8eb3p1eso0n5pjc08bknbefwboyn6ud3rg5xbx5qqgaofycnzygibyxux3vns3pewxmh673lzzrms8411rf6ff3c4m1vjxpgv',
                channelComponent: 'y3zkpn26xd55eehnpvrts23by2a0dn9pd6llzj8clv75tss50g0uswifgm6wrb4too5go2460g7jxd4u0fxpelcfpq6m4174rtgxqwlylm4pno2aeri0n9c5e330yl9qkrricm7vxeguwrqerbw2qk3gwrjg6rzcq',
                channelName: 'r8dbcubtpzz2sak0bs395mk1l2uzxgfipq06cgezaupbo03en5b67f1rndiiu7u579moq6s6ukb0cirhasxptnpgwri4pp10xupbybjsaet5rsn4lujgz3o5tkhyhtqf7adayz0west61m6xnrvcluzf3842dmmg',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'madhp6vxojaarlc5jxd3qtm5wloqh182l7sdgqvfasjbi7k1ieptqvl3pjhgxeq1na9884yjgeb336u7bfkxos3k54ilsnbu402m16ibfuqb2gcfvd6z91cdhiio37phe0azrlf89kvhmlreg8jovh3qncpv5kj6',
                flowComponent: 'jsh40uqhro09lgtyfn72lixgd7llqy8y62orfqozmmmwd5x8hufwh3o6qkwjg1t2ii87im7m01a3cl71ghn25xe21l0nk6brzk4lm1y07kbq8q2b9cjforn7eda4fqduawedfb4qarwd9cntpjeeq2n56yuhjfv1',
                flowInterfaceName: 'rhffnh8bkmu93zsjgs4kez11o17p0v38pn7jz43qhhw5i4nkljdt3wknd2u6g7phq27s8a4wuykrgdkqf524v4o07uxtf0nyvk3x36p5odvziu7cjepik8ylyruw62c1l26re9u30acveu1zfc2t4xdc8alht2sj',
                flowInterfaceNamespace: '55y5pr5z6z00s6l9ibucaoqr908dl5yqbhmoouc2epc1zqvqeer9hdc50huflnr91huysftanf5e2pndmha7v5401zbyth6l7y3rhncyj40md1d603u1wxd1shnz49o5mclce0twhxuinkksx22t0qlb1h0ziij0',
                version: 'mgpyw6yqkshncjorntdx',
                parameterGroup: 'qbpdwvx49g2zwkie5mjnxc3kuzfs9om9upv55b59fr2iyfy9nbxseztm3owt3nb38pjkv5xgld50jwgvplbmn2strxbwemd5x4oejtveekpl9x9a114vdb93jejlkyii8sazkwexnt0begrvs5ir5jves3wf4v1y09206zxol5zru6o8g85z858bgscof5qfanilnkqu6w4vt2g41n3k1s1ggii8wzzj66j3bmldi17epcd23an8u4csgk1w7ka',
                name: '1dk8yd08kl0j9okdkwdlxf07okdmtcitsqqm16dd69zur50hqdoa4hsk7dytdx1s5yxh7163mqxij5mtxewq9eu8e8dbwzkkfqdfm7fmi2ewn2vzepbtm8uel683pr6b38sl0sqyynsb2l3w53d5q0brq0f0r53mvstbuxnt3tfaf5pgqbdpx98qqsgggq1biy3rv0lfswn6js5cb2seje586jdv9iia3s1umn6q01vtmvt0j566jpymws75l2x3enulnhliaw4l2mzq8nows3v7chlxg3ygkdq5r7v9kcucq832noztifjwz34fslok',
                parameterName: 'vapnpkiznew97tkr4smx2kcoihiza2buitdruc5bqy3gmbszr3rjxzpk9w3kqqk3yqtousdkvyxktvtcd7vy7ykaml1cbicj14hdpjaprhv1yv7ceae2ztsk73bj2nfvwrvexotkrw1pr9xtom81goakncmtw30inlbllteq3y7kscebvleg5784cu1gpdh2vc6jyiwiecgp1denkkn3xqqije134ayqi62l3l21u5379zplaesvdelpo154dwxlysz398xxskwjzkds6t164dafc1n0io0lmqcgi4rv706u7fdsnwwqmcb36j8e1s75',
                parameterValue: 'abudseojdtk4buuj4nycejhuavsxiz8wcrbk1oxtencxz1tqgw40xlo5lwsoijx6uhf0hstmx7mhk2l128e6wxd0nygd7ovuj0eoc4og6hew4cpqbzfisz0xubflk6xh7n2u1vp8ofenblamj7okixl05tm0yunh83gm73o35bzp23ha1a4dg3324nretepl2q6408ej9zm1bjeixgm524p4sn3wyzxfh30y9n9jvffnb5drq8s66mu4xtxd7urqbvfwmtg29nt3ov4c1a5d0pukz55ao1rv4dola7869nfhnzvpnp1z71zl49aq8myf8ooyh3u5dj8gq3n84ud7cfijyiqnt5vbxhch31u1g9qqko6eeeswvpvichgfa8j5abo1t1x1cry0taxla7wfwo4lfr9sotdjc26wv5c3y9p70t81kzmzlv8j53g92ydlu45ljf2nbzqqem7bdc3s0yaajnbybwhbae1gd0jl1dxpxx156n6ypzrgp2mh8a8z5cwn8k3tvvj69clb2s9balo5abybsr4afyhnl7fhwrv96ge8iz88esvuhj97bzxvk8az84vctkk6mn0lqsnjp90je90xdz6p213eur3z37r36vhevoedhoeqh9pqhne95jj9b6470cnoi770cq4izk15ff3kim5xypsuj63rwf8shc3fhv3yisvn1or1u6mofe34yagvpxx6ceurqxbpya89a3vuaaxjqcmrrhclviclcxci3ytql1pigo0fybh3gl1ads95rsxp3btj3p7iswnkdfxo0ybhur2ha3p9ibmq1340j9fsavv31fbpq42vpszkjj9x4yk6f6uzd1wpn70imp09ja1zkflsvfvp00zirt0od579clt8u5ow5e0stj4m8qyl0jaqberphoqktl1fm6y5bkqraaktuswerupkzbf26cfejzrsneyc6rgfv6w3g3czwn9avpyqfcxp8l504gvh4zvekzi0ch25xkw2uppmdjo5s9gorvscy8fl',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: '879yeqoa4tl01dm9xddwir2m0htfn9c41aduf9oelc4uxyaqce',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'c4tb2amkcqu6q1yk42mp',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'ak2ocy7mmha49yoik74u8rowwrq0ocw4go7yxxldg49bkzmmjnl4w04g9dow4nkrt2jjjpvbr3jn7j8urbqsum49251xa2g5dum03hyk5q42fnkr6vzlla5vv5mzkpc53dtlaiyi6vkcrvm2rrflveuzqo6lrllf',
                channelComponent: 'cagirhoqge5aw7z81uauy41qwryfnm0w9wh7mj462kcjir9j3zw6u2qwhftpgbzt6puadhokf7p5iqj8w1gxawtjuqlwoqvi0xbr5m2lvqya7x8suq3nhzid0gegz70uuur9wsmoj7t8obxcxqztt2hnkihnhlm3',
                channelName: '996argl8ooiahfx184q9hfy0byrmvxijpl56wex52dpyyxct52quvtk10mlkn4rzfnmslvp800q8yximjte0rawq43511y6xu9wewdxur6b3iji6is6fdia5iv52k3fjzmkzsrfz3a6nkv2fub7d76pwog5h27crn',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'u04go92tgw9n4psnf76jf6iimcua4jg1ww6xvaj87gu5pnf3w1xf01k3shhi55w5go5qlvn2k3yxy7ozdrq8ji849p0w3lzcdutrjfwtfiz8ithzz1egvvmj2osp4m0pgzndjcral8r4db21562i4ryvuuelsomu',
                flowComponent: 'uo2s044f9pjuv4aw8puqx8rpqd9ktgnsjcccx4wg19onr5qi63w1pia116kaoq6g9yiesqhjibvpbkc6osf8390pefbyks3nft2707rkmj9qaowoxv3wniu2m4g9adx0ht40lp65c1gh0uetkz7k7ggo59lhfq8y',
                flowInterfaceName: 'e842vnn9q57jnqazpd7qdgdmhvy2zr69rjqoazmu2sj2pmahehx3mmks2oisac2rrmude2tmmuklyggurdgz0bne7fkg8yp2m9rywrtixmauz4vtyfalbu2vgf5tcaghrg2r8gex9dcqurqqhasnwuzyoqqofqp6',
                flowInterfaceNamespace: 'y4jmnh3gt86rrne8oy34lt8a35ukikdm0ez4yo2d9pikn09mp8l241gcnpebrxziawrnl4z6lslh6s7ew9j3idqu8inl9bos8ux2fk9q1y2z7lt55as8hrj5jqhjk7c6urwmeou75jqnbit72la4ro0ohetcofyn',
                version: 'xzeegmqhdmhnw8umtn3n',
                parameterGroup: 'rc1xb1h2tqhf5duuitirgjtys2y0fugrnr14eemn2w6vea4cfevlll9xk5wtq7dw3h6qz1atfpr9jise6882m2axyvx143nz1fq5dss7pkmq6gdfi80kin9manl77q6e1x1rknjw23vwb70536j1eyxg7l9h1vx8pmq9q8gz496uhnoo2s54q6y49pi3fc1df828nuzlyxsk6sp3uxdheqw0xnq0y9r7y3yoeju14jpytnacd3460mafriy24ai',
                name: '51826knj4oiobpnsphzad72m7hmpzscc5qz1fdthdlz9ilgygb5wfbil8mx7giuf3lvp7hhq0rvu2l3o5t8zs22p1tikdfbxk2sxi08ckr3h8xpbzb851w5n8hiahi8a0bs453w5uf5u7bgtawl34o3xjfezlmvy1aji42qy9ov225koyuglewq5fvk2ft5690t8qzcgbxw7b2d06gw9nuhu07bdtr2svtwcrvwb0v6j29dfxrtv6vojppmva4rdjuyadamiurfjduesq3mw8t8d9utapmnpiupejjr1iyvjvfxjousmb843e9r6o3wc',
                parameterName: 'ucs5kslxxyfjd234ewzolo6kphuvmhywh8h6yhdjq53ouzvh1150tujyhqeo7v07lalhy0hujtwqq8312zocjwp8pj2w4ck5a13fu7pk25ft91yugeam0my9t0jtcm7othc32rfy3nx05dsly7q011l1dhbdbmyjbj7dfnxlir1k2bal4knar8bgvubj40rt4r033fyvhdbpj6pynkwrf9hhhg1sfs4p8f3urrusxjue6y0apoy9anbbt9713qg6cpyh775xnfg6v9skp8vu1rwaph97o8ukrjnru8t59avxt87fyvijm2ihif4b8dxg',
                parameterValue: 'x1euqnz8vnd4kpuo5y5plxnugr0r71b9i76pui6uzvl2dkxp3z80u02txig40sqqnp0eelsu3ngi0bjury7aqmzyy6ph6wimvl19rrr50ev33b8cfku0lyjhm1vbn83hg7ffhnob5223btrntxr4ewmbnhz8y9m0vqdy1cwdh4vuo18muuxig497cp155ha0kizm1uqzprbrdw1zmflwvrjmjpquvzztfpu3stvdsxorjxhpkya9jwqv018950qytdlcsfjrynpcrs328snjzwjpxadl2ro8hc00waf7cul13hfq87x4nwru55ftpishf77way0wda0wv9f6075v7996ogfonck2zhb8fbuzphdckcyjrj8a63xr3lfzsxa0vwsxjb6v5xd8yiubtiqn6cwc8fbsqya273363440kplbmm7xx33uptsvrmjjf0850z9z37gj6m2bw1m4056i7ubqyrwbjdr740klnfdrsngz5m1npzti32zew7rjccz4evas0htlm0wlv14odzjzgsecetiqhheelcxv6wid806443z3kpddg2cyowu6zn78r55msy3rd16slqxh0w9z1cp54cxtghrwl23p092dutwpo3g0kfxgqhcnlfeppf5yb74yuyzqyyh2mqyv7lxfkadf48orztkfgb4b8yvxtzkil8p0hfqbi080nz610rxokxq588k0d735ubx94rx0976s7wsz2xjymqg2q1mry7xp10u2gu6oc06c89wblrvu4fqsrtfy3o5x7s47cctz93upqdkf06qk38pbp6xa9gg5fv1k2p5jnvjapww0jn41ymzvukpo24icnqrcycv2lgx0y2yzqyirqtsfpyac1ebneb3a5hx467h21o2vq69h5rzt1bwxuuuaxlnf8rgsxhc1q0csga9n2ayvnxwqbav7d6d07w3rptnim23vmdpyl4wxhuj9i384yhg10ocgfvrhqg8pqldn45irpm84goza6wwp27hz69cooo8t74hp',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'hjfsgidjh9rm967g7cd08t4atdznddubb5idqvuj1x9x2bjdqx',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: '7hwbrrv4tsseqsb06m1b',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'ag0g213jpiyk9nhntzbadpndr6iyvnww7d4w2jtqsemcgln0nagccmzntjzpj6yugstpl1gsvt3znwmiwsdvbqp2watlzlk2nvqc968enm4uxpjxucckrowlh7oyhkwfizdthk4vgtmhqemopc990ptjsltssozs',
                channelComponent: '9h3lb0k0wfq4w87gm2fpsspzvryb8ndp597m4k7ll6vx2ml312k6gvckufnbq4lyzw1ns5azzsatwxr2rx38s2nif7mls3l37pseljer38xfw9rnaawcnyzzzn9d8pk8y6u79ebnsvw6ia4137lqn47aja9ehp6u',
                channelName: 'tet9hx5cnr7jphhvg2hf0bfklza4asic0plen70md6s80ogl6gi19u0qthsbup1b1jluuyfs8a302frthdb5ynogc7yz78bwuqkemg7ppu1l3azsgzsyz96mhsb64tbh5naqmx01cb9gjd6rub9vpgw2se1cz8xt',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'bjmf016dd4uhxu88t0wyg107xsaeck7rn4ip7aj2yzlbfh1jxsv5x6rto8u4rt41uzw9hh5dxbf2gns79oujowelq5sc1evhmiiyaovzxyfcka6ibbw93yftspzcl22hppbf2w8gqntr2lnfxl4m6oisw843mx9tf',
                flowComponent: 'uxa3b9b3nn5ou7vx2jbz86oy1wdbzy6p7wqyfwz4iru56cgugubt96vlm61cp6ig6vk8x2i6pfuecoch9rzexythvwyh5od5fqxcokl97m4qg64ke4vsbp8uud1si9hwtdpfzku8lp9pjl7w2pmm9o2ivx5ajvcy',
                flowInterfaceName: 'hiojaz673hzrervekvbizmj4jdnnik0cs3ocn3xydvt879la57cda6xs5lnu80enfv4a76u4mmu1aihno4s4ekeo4os401303md6rquajr49asl1uu8zr1rn1thdcge8kit0dv5wih942mqtakd0zi4v0z5ju3bl',
                flowInterfaceNamespace: 'zx4pnlzeb5wp1l96sj7vwic3vamnda8rpgzdfbpa3hpkd1qmtwy632bj9inc6be4b9oys2ybe8cdkxuqr6bhuj4rowo5xnqztqu4hgq6gwu2aefgb1gddtd7ohogf20wu60mpagjy99gd50d9465zngdozzcvlap',
                version: 'ptyvt5xi4yyuev2c6nke',
                parameterGroup: 'u4pq7jm0761yzk8d5t2fs5ik41djca7sdxaxcvbot7cqnydz5twjthm0wqqaosl6s1e5uhopt0tgnzhhcjp7uuakr35waubqownydfpfk1b7bf3118muoqty4nat3v1kdzpnvka8wxttlkth9e9ruydh8frz9z8ikrrnge8371dcke6nfloc4zpywtfx33c56zyohgflski43zn317oabixjg7wzgaptciqd57mrchl13l4ols70uf7td5q43h7',
                name: 'u35fosu5g62o4inb369vowvu334dyggkezbcxxuv20g2padljrn3e4b86491wjs1fo3buuntjb6f6qnlihqsvkppt3evai0eaefhmtzpzecyajptuvo2ixrlnrmm0pkwgnu6s17141066vy3tzevwiayjz9u9ctmvafuztc05gc6tgipnx1rimpuraoyz3xgyrzougdr5faldppf3n25f37js3qsrqj88541hfkioxbvk1pkf0r931xjoyzha6o77mplljms5c9f4gbg001jvi30994seg0g6w299nyuoc2opjyi60u65k598b92g5wg',
                parameterName: '4k0qfqd4zy2o43iq06h9oe7uq2x95taox18l4zp4ir94w2n1qm0s75erngr9ailz4hdp324rkofic1uc1bm8ib1pxyeqnkmlhjjcvsy8bzs3t9d3sqn9jac38jcr74otbthbu942422mnwfm1wz7wwzxzvdp0hx828vnyf7uex6nxe6f9j0edsb3ebtii36vpwjob8tqu3pmhj9r34ve35ehpk8nafa6p9whvefbqxs3pp5jmstkwdpgdepau67pm9fh6q1vzrvip45upkwfzy7ka07r3w03st115470nomiikwbqy4esafuld98q140',
                parameterValue: '9qwp2d1g2ihewuf7p5ciwwm753fyjffni785ekb7gwt88r637mu59btaweo6ghm0jxre93xjew0swjvg1dtqzgoilixmlzxiozu3lqv9442zrfgq5i59ishrriqbvz222s8r93b1x0ut2ahrisg42nfrmnzmr0a28eutazefatpes18m6naj9a6jmm6u25pil63qbf4u70cfhdmm2d51rztgycmutrjcl818y3jk605h5gbc0415mlnp883818dektsv5tx3aeoydduvealvkoq0lqnpejgtkbwd8s85j6417lhp6u0t9gl4edlg7xe4mq9j96q9mliqj627sp5pyaq2emtmq72m48xb49wgzieu7q3a0uw15nii0ms325sjn81jua59u7myibylotn47cxutdeal4hvjo1ubo678jpvmycv5d6phe641qr5ysyjnbi2pieo0a0scl9tzgqvragvnpghnw03fli4lspwtkgphytguvdgxq7l286t00ldxtgttw4zmcexay6aonawzwuyna5gn571tvgrq2mqvbv21pkytwyc2vu08fal4fujuya88xfkqz4l2bu8x2lklcf1jemlj5dzynrd26vt0plc40nv9qlnxtq9t00vfxugzv0zcychs2jw2qjil52u8shcht6vu6jk4zbz1bz1y1hqqhaamqinraxosjf7q6kyuiygbei2z613pmifkrtqr7y2c8zlmgbgj9mwhui1gqmjns4p3j4zt3g26r4kw7wf6vnrcsdks1ut6496qndzxvu65s5r0gf3svwk6bk7fsk6kirxihywzyf4tuzknp3628sp7x4v7i8zor0mctya0qyikwj904ytd4e85glizcwwxlgribfzptfd1o7bu05wzf2b2y9owj32j4rpmf5pdtitdxf2z2c3uifu61f3cibf9cc63dxhdarli9bxl0amnp13k2301e9o0bsfgp4lfxd0fr398wsioy0d07kla78ro1h3he9osnfrvqls2smi',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'u0h5i1yuuetezubej02ebtbdsb218va6abs2l7aw5weeij7dnj',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'z4qn6qnoum1xm75jbnnl',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'kthl05e329oe8qdjgt9t3stvj4gr3h15230bzl19lfy8j68mygcqx251tsmvu3fslwwzrfs6c8z0ttm8ya19plhvt60f7v41iwikwenwmxbuskgxvn0we93mgm52wm6m8yt0nnedq7xp1nsifhpzjky5o3w3oirp',
                channelComponent: '8dd2dtt0dcqgkevx0xf5pge1kino3h8t6hk8acdalvl2a1a49er5nbpz9lxsyn7jzcf47gf627m0u1jsmb0kbfjf2iyzyqus28scgx9efpnzk8by1f1y8pwkwxn0qnz69z6psqlygnwp0yz7ux6h5p0t4biexlq7',
                channelName: 'zm9vzjd8mmbj1pfru1ij4cia69kcyms34qkkkeepbaxa9fovr75vncfgli0qcb9kxe0rr65oe7a5g0na5v2oa8ycamd05i1vi9ox1ybeyv0iy0mi3kg10xg4mnwolplu15svym0qxhlwaldc0t5cszhm54wy9ak3',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'wpykwxri8r0i63o83sg39lzad1ux3c923heutjs2avn6a4q40c8r9z1a06om02y6gbxtubn37dkv7glvw0o7tv0lxcs8q1s7dnoxhhb9mfafzk05pie6tepwuvh2wwcpok0hep8nwl9mfs199vylpx151fn6nli5',
                flowComponent: '86umvqriqowr48njui52j5ny7ylr534p46ck3d3oxew5e1tsotxtnqnx63cwpjujberu9l89hkd62a5p190f947jqwcu7mpdlt8lrndd1efoouov136vrhct1u6blh4rsv57m54023hhqd6p2wjs1jvn1haprpekk',
                flowInterfaceName: '80dt5r3ig3lw9q8h9rxokwenj5qfwqxv9x5tcovhdghc8uqdgauevbofapaxqqvqnvifglc1b3nlc4tpuoqa9d10pkxj4k54rgrbvyvlwxur0eo25dhoia65vt1br7cmgiyiirq1esek1mwpo5knf2lyjx5wwdm1',
                flowInterfaceNamespace: 'ridi60qrecmw5cgncl9s0nmjgs86kbfzyyphittan25pkkd07a36gyig62c8d8hlcp2txqb4s7gl19ngehbyratrjlmsswivp0fb4gmmfske6qmyqkbixnz5gsvu310f1uawa346k01ndti6ha8ydh4a4hube9gb',
                version: '75u0jdgjkvpc5vzvzbtg',
                parameterGroup: 'ggamz6rt4yztsmsiiasrqcrm2ak5ht6zqur0lmbltfwnw7br0qfm1cw2cu8iwebyqfc4kauqfzqcjhoghq9ek25bjogp3zztyw5n9mfodrc3kesy00rx9uq26zf5csv3ums3j1zcfoqxdrp92xj5xoyc28azot7cuvf8ry1dlhkeq4usjermz4ttrjhymt9trjmi4sc78kmh6li75vpr82ex9ovyjaqo28vs7ox4itcxtgwwskg2c2r4090hm6k',
                name: 'tfzn83lzmn2ln75dcq05tgjx4vq318zz6k2opzdo1qxuqy3x13uondxaouja2t3v5aado9akkqq1lf633mtd81kbfiopy7c7ks57dil4tguvy1gp0vei68o64ytjr6lj7pgsq24sp01842y123uvavxlcnuj7rwf6u557zg5n8z7a5pa217rrogi4qxtipr5ck5luqx3fzevxfd2d0sl7lkqdri1uudo8ig632jrssfsu3bxvoaguu65xvb8tm8ue95u0r9chxu78vb3yr2480cpb7vtqmamejrz1mzfsnpohtihadsi21qacupd4fut',
                parameterName: '2hto8ch1eqldvtv6x9qs8t8vnv9zfgkax5dz1285h83i158bmcw4r0iwc23l4ey0qk0ndkwjonssxtzaiyvisbtaag6si7eckwdw25m5kkn43yr3fmosfd1cekyjvo9gsrrrqlt6kx24qeohweo7atrzzj47k3c4snx3cvp669cb3581uwko24nknxd6s0p2m740gn2d24d752wc7z84s0mc0do9qktzkvim24r2o61u0n2h96mgcqbk6298axprpkoq9wjfw0jx1bbv8wdqes2g18xrdlqf1zxz70850ya9gutv2eanbt8amjwrtwwg',
                parameterValue: 'gsx5njtxfqncy8y5xvzi2btryoj9uxobvt85ospzslbubvgwez1ilgpwcqat55vhinjq6ku1vu0dhxo80aggv9pysqeifysanq1x97vxclvtlqn3oosjiipr4i4bltrjwq50xerunwrki67gr1emrlvjhf2lh6trch751jmdbnfsa3x3rat5nwsc638rk7r8q20v5740qtribohnl05qqg1bssphmh6v9zh36ghv9nrqw3xm9i2r1p3z4mlofpkc7ahpzy4wtlzlwcizn42iuyhebhzghjic71x0ere2jn0rlkw91l0k8drc2pddgvjurtij0xtgugdu5clgucfgn53q8v8bpwdcumunnrqflavr5vveg6mkvqkn3fk1u05gs52ojksnkzmx442n4dkwvhdplb25i1ih9yy46b93oi0b9cdwao87ihwjfvz0mpl6jakx36mhjy64yh63sanqb7e3snlak7kzd2ukukesw44uuowjk6u8tkkvcd1tx7ffsbq3ll4c353iadi15rfm7kl20dkwye7bitpzodj9f98td12d4c0j1a7snfzd358zmgwttbeh4yh5i6ag7hak5k9itshxtq0829x9gqhd8l3ot61p7tzz0e5ka2tg4dywxjo2te0a9f6uk3buhdhh94jkefewak1z8yux8d51n696ru0erb4lh0e45mx90x3176p61cz5var74b9r0pm8rmlsravqexfs7ukz7kxkxq3jzvetomz33f4hn29t0tsjc8jx9eum2xai9675zlipehbjux9bzxsn4yw9w6i46s071uksrcvuoi3zxvchtwxl1ss74rdu9zxkajiiaonjtgcj4evkwo4cx5w44qqfbw15katniugojnecr7hdz938720oa6ous2yiz0hikcc3pds729r5c7lug96hslp7v9658wqfgov6bwzeds0fryt835n4s3o5feco6fz2zj38acbmw0wnr2y7n6uf5g5sjync06602awq8d5wyymcz8vp',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: '56e50q30il6gprn34s94nkxvm9zy3bvpl8tytd6yhymtqwcipx',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'kgdnqt7z1c5r3ti429zq',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'n9nqzn1f8edjbh1st619d3wu7i281qf7pj7qnh3ab8r1b8ro6bvt95v3d9hvbd71e3frgn9njckschnvl4whzaiiiu5cyg7qi9uo160zk8fwbuk2stf3652bvcnnkrdtl2iccjmmp9ig09y7bsei0as5q9nl9m3s',
                channelComponent: '2j3ed1q7ik79dleoc0qheup3ccb7mtr855ras069tziwsvs93a15zdofbq5zu8xxs9cv5fb03nt34tbws4ym9y7f51zmfcmg9zm80c1n8fv8rhowieof6vckty05lkv7gzgaxy1wh20rqtsbpckt4xu03tqqitht',
                channelName: 'yy4fwfzlvbqqgz2i4bvy26pgwntudqjmlfpa6uqc5bpuzzjcpga21s302filrg3rocs68r064e3hz2sqbvc0116g6o9u0s9tanz83iwnw0qjkxr592rthfyz79ozp9la4ye1fi7el7upvwpm27jdg7wx1p031ph3',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'zvzh6m7ewp93fzcqobuw2bo66li4atedst7hx796oqt7rg9f0qyzvbo9sk5n8moob5hdpb12mb05u5lx2w8ewfrccm14vghrli2wi5y4dkb62n3spy8pfkzio686taxndpggyy5qlwpw6m4kwk4cyezzsd0pygja',
                flowComponent: '24xln1myku1l890ew1azatvi3fyrhcj8dkpana4pmukfvo180cc232vx4vu9tmspp77xf29n9sem7pku39lrjrmi36a6l9gwynvbzz6jscqh5nca0ll6wv1g8649at3bh8y6zcuqcnkklrbpfidcfo6jet0fk3v8',
                flowInterfaceName: 'yi65ryoolchwot36m4hizwfem1rz6u5rdvryaft2g6dk1pgdflpoceb27hsndn8vqkknuavs6vw0uhykwnb00t75pjoyqt8yoaxn8dfw2eubc0g7jetsrj6lpk1n84vj2qgaoj5iwnkjpjcoui6p03auuh7yn63zp',
                flowInterfaceNamespace: 'z6vvhlhmdfrgk57387wn4pru7l6tk70od5t4tam3dxkah00mrx13koew2ckq5xjslptthrqsscbciciea9h513r5bbgs2xxdr1r4x319v9hyny0ekr8i6w9mxtfbv05pu8pe896485y9mjc3wbg7zx76ly9j1ro7',
                version: 'roycpqryevbn890ayoxh',
                parameterGroup: '7hi5w83iagaj8x4wnpgrhsgjfyctw2efzeme86tnccbuxkths0xs6obc8m4a92osqtoft5hrc5htp75shy0ifg4iritgza4pq4i9k664qvuzgg3du2fvdbnvatyhu4vvuzn0d0ikcjqtbqkiouienu5f0czyte3mahv8ujdt2dqgunfvrx1ukpfpdc1s27gtokzp3zut9rx3zejijf2w4fip8wvf74ymyqte6z69vd6w40ikcig13qy7tttxxi2',
                name: 'jozbyo297rpt97248fmvkodx9qdlhlort6wx1etdwon69y9wp1bo925636o1m9l5p2ku41hlqifiiwn2cp1fthbdgje697t3xyvqtilylt4qqr5vcnf3ma297a07vy1tno7b7tumeszlbyykhy3iyo71z6nrhfjhuusffx6ajc3g0lqgioi1qgamgeg42q0hiqh9cax80maxzjtfz4nvuyzm1t2s8n0ix54p7rm1fcbiq858gzepga62trhgh0v93dcx7zyt2b7omrejgx1n96jfxllkcjt5oc9nk2i0g8ojwon3mcq3iuughmxg01ch',
                parameterName: '9l9t2q8eu6nqboi6gmjbmzk8tads0xfk87rbb1m58aw9g39t92n76d4tajsu2272ippx6dgxferftzeq7nsqdastcgou0h63kxacmvyl5vzk9wu3rymkor9gpwpqk74l0e5on2tavozi0xd4b2iysxr7uyupr1mn6auzj5jz0w1k0co7eyq5ydht4cegoaltjci7cl3vgqqtfst29b7almctoj65n40i7p7xgcojje19zrxj596d6c2ttcfagsmgfx1r4e0nb1s14vs2b49hs18b0e4lf14bqcaol3jb3uo71fe0uibkzi1qssqga916',
                parameterValue: '3v9ym2qapc04ezv5co3oymno3axk4fa6tn15zgm8ie8adujli8rqe9xi52bmnrb1xy2ny6i5250gvxl0bwn7jwjz70a8eg7ucuvq3piqabo6ldu1nmdav7xeinwdcwkntvhsp1n0pmcoo3fxxznbfd0tqma3w1p26z6o0npy71n4enr814uz3xemnc3fs5bepz2qy7uuo791l5xazmbiduht3z8j5lbax5lh58azd19jwnq9u0zlgexl4grlgm8yy1yw5axspxjgedg9yzyhqmg5fyjsd991gjujjgmighqppsrwlou3o2pooggjcz6t8usmxd9zctyx15788mbur9u75wmxf0zlrch13detj2b9s9xupyywenqr95unv2701kax0ibm88iecavrgv8mrrowegtiujgpyqjy3fjto2iilzsi944e7f0xyl5adnb3my2l4ud9sgmkf2uakk4ci79tae3o0nazoe0oj7akzxpl2918lssbis9hh4khk56les5j06pakxrbubn5nx78h7c035lpnia8tkr8jgtx9jngt5ng9c2bj82hwv54tq4qoa58sb49trghzkq2kn7ifs68orzq17p6a6bexpzdjbf2pzudvt5pkfzkhzkzulxgyy8uy0gt0zdcw5j9pevgrlcy13mrirth39b8sjefa8tjzsxc9r05gaob0wo4si9n6b5pxxiqlxlkvvemj0pwbneteldkia3p7hk0r37p3tst9lv1absknvlx730l0ljp6z6kcknybx5hau4pk1vmeoxhri1894yzsb2lm6fn05ad7m49azcz2cl8ic7y7zpc8ncs4k2xnnd4ssnkb2ko79ksuvwhv4pfynaia7cvegcvsbloyq58exszlbn67uvxmnp8e3qyhbt4uy8dqp7yaznr19zks0n21e95ca18jrpkwp2vhxrtt7h0p9oteslvuzrqj0gc4etwq4a4wg2c00cgsilsnmugnug3cbb24w7rgx976jl3y2s77pszkvvt',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'xgqjqz0l6wf04y8bde3bkzjjjii84vbxfsoodurzu82wyyc8po',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'oqbcj1ulrp9wt2blz99s',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'rfajjs8hrafopad0rndxjd2r9hfe4j09fqwr4xq2ol49lahsgbzu1qtq66mtx7b70zxvuxi879bsg4801phmbcyhrqx5lhe32nqid72knjrgpqduuwbugyzg02wnt22p9tpsg1n21idbwr5c2qv08jniq46saoif',
                channelComponent: '8qegdz26an91vaooqj470cclcgncmzpnz8l55nw0omuyhe7xv1jm42vezomxhp0r1nqcjdfdbsw7kqzr7v9zs0mn6gqcusp67hhepol44rwp0le0psolclasgbve0cv205d6ygmuienhzkundgncf1nuqmpg5jgv',
                channelName: 'gncc5s179arw1679n46vi9yijgojk6039y5bu6n70dpgaam7bihict1nduqsar6tpq0kv23q7qsez1oikj2w03vxggzwrf2t9ciwbx1c5kbev6j8wl6c8y5sfv9z5xgv4ywyn0ho8lk7mhazgjjwnf4ynh6a1h5z',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'w3is6pyrwpf9b6c4u1dxcg9jdqne510q28nqtccrqgw51mm0ymcyp1huv8d6hnycs9jz5yjc2u2b0ir3cq8wa3jazo24xbo0fp7py9pw6dynhund5qi1y15t94uqw8oydbjyhyrsfo9na47pp67y1ertojpx3sh8',
                flowComponent: '6abqp53swwr7j34js7ss9r215wpiegrsa71mlkurbmthuajpp84sa6m20fnnw6m1robk58g80m9wst0gjqmt6f1gydf3sv3ax3gs27sr8r2ulv7ea9izud8xsvuu7c5wbawisznd7c0s8ukyat1bzp0vv01lre9d',
                flowInterfaceName: 'cxbhtulakpq1o86d0udedhxgt3hvapvbfomq4adppm6ub67id38tvxwsvlad1ek8m3fkksgqc5w88mqys06roiqqittkz15fzzom8veeepmplx619snw15df33cnbviq7y4341m3g7d70bmk6270p6v380q8gn0w',
                flowInterfaceNamespace: 'obtzvb85e5ewvx9fvetjpoupr4p0goch7dgeuypi744up8j236cthh2hnrngdjp3phzfyt5cn04v8ueqyknb7akd9b61fovj5yz8kscnm6e09ugl8n9bnwknogr59hg48eab4ieba0n79rkdca8rrgzcahw3xjz46',
                version: 'vpjznaotj9da32j2vk5m',
                parameterGroup: 'zbshk1vxlj8b0v09aio3ykw1xetw7f7sx1n3t8ws6neeby7ju22xb1yjebssqfkgntp6z542hjky8s99s5wjrsj6f0ceeffqhmd9v2ai220z3xafphofc33dswtcws6p07hojauzbow83a71bsux3inmx9b93lpwbxfkmrnpbv3uv26cc10k52qmb9ln8y0od8134wajzbr2z632o6zy1oahamlx3zlzqgduphsdwv8h5gvbxyekoiyflvkxox2',
                name: 'wfxwk77gxny3a0dkkg8y3s507j5ge83jwbewif1qelq3ue5arosqebt1a1c2ecwqpz9szp2n56g72xxy2lnxzvfkp7i5a8wmppal0c3o2ym35n16tanq5zultehae51nzwbry6m9n5r9on24s40yn11vjnb8mfjxtdhr6inhj1w4sz5yj2aopty0exmob1r90mx5eb1o4uf8tobgmnk8na716olwlfzkxojdmd6j3owvcbk5xjmazani28tkdqikl8abpbc2pk2hwfywnsvuekvzqhm0pg5u7ern0qyoe2b7vqy48uyniqhmcdhstjb0',
                parameterName: 'da4rh77hqzmowwiw094q3hlqlorukvkv2kkji06fnigj87nxumkgkq3vyik4omi9n0d2q3loe7vk6dwasi3zmg8vy49mlymbpjcw5pes6o7zl6pj36jj92yhf8mqfu2si61j4v2yw18jsleug9vjr0fbwdwukszn4npl916mvwan67ryo3kslyi0wql2460vc5hgxisf6jmwxsmik03cln0c5rw0hypu7wjckxhyc72p7q1h5bz342ewudfa7ttv1k30xj0xupilip7ytugqj51u7iursomnpqrsft0mm817qlilm9k0sav7rqz7appr',
                parameterValue: 'rhyo92fu1v7576koigps46oyfor0m48okl3rzknzc3530cdpyafl699sksc1i5jyrc78mpenawoqhlef7df946bbwqu63dv98hz7a1f4gzosyi8msr3t7sxxpcewv3ssfbyvpqd0t5zk0nvjoxfqmr8ufbfpsg3rmgsim6u32iw8xwl6jaieh3udkmto02aqgucmedg3o2c5ths9z74fu3j6hplg4eybeq8s2nvm85onhv70yl1uw6u3rdexkykvvk4ybft4ih4q3h8lrtl0x934f1afae3qa74ors3rlcxh7n5lmy00wpdch9qv18bjzfolf2iwjumvvmwfm6kwgavknb7yh41y5kckgaxzuov0ewljbj29f73u1j5lif59667raynyzejn0dm675wpxxa4l5cbcd9a8nakm4h5y0s51xcsmxyr38ahaye5pozb3s1o41bte5w18s2r7ffmmkgxydx33fqtgooe7n2djhnq1o1ehq2pu2kyy0gyfsyobbvwl98t34f7xyai6p5918d0avb4dx4jlf0sgla91agrskrx0gfhw54alo2dtynpew6li9c7op95x5uqmsdxyt59wgqfau5m77egc6qz83h9aet0bfr0kfvcpukn2hw43y5rn66bmzys03yn6g1riikqny4ddbwrunvywypuvoa4az5d8ob34vfu2mep621sh9dpkkr9t53sb8kgzmtakh1dy45u9d6gtxr2ncc3s5ddp8s2r2npu4th86onoy9o7t192k2amhua8ux8zc48ebu3inuk3y9b9bsh69ln0zilqrseo943byrbcnzpfioazrrx6upjge71u01nxhr23ftdreb5vprnhvs8bule93gtp9ngkzvclaypg3fjro6hppo9dpogi6633glywa7uhnvnxnmsz7tbq25we50pkwki2veievw5f15itohks9eup9bhobdooh9x8sh0gb3hjrwn4hz0eq5vn92zew1g6x2l8jkot6a9bs7f4en0wiml',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'qujnnmlmlrmf1b3xz3yc720y9qgma3vhx760dc65aev83689jz',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'ywj7i3oapdhtrs5rgf24',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'ybfvgu8ud97p7lt3e5fxg63rvptm75bqmyshrnyiho5jtquqd3h1w67qq0c30htqvcabpt8cs3f6ekcfa36wf1juculwnicjju4pj56yo4l35iwd3ncu721id394w8udmfwyyhk9sspy2u9a9kedacmxe4nkxlic',
                channelComponent: 'ro4t4ugmxbrej5rvc33tepotwtq6y82mto6ygb2knopnb2h42p3wlzvltvdrl86u6wakm4nh4om20d2w8j6m0ylsous7bp2pyzjs69pvo81bdpg7nvtrxg4q7wt12n62fm83brx5q2ytwzbejl3qby287i8e53lt',
                channelName: 'x9zlc8kql897nw8l8qsii4v89np8ltt0hlfp6zdruehztahw7cksyzc4gvjqttlrcwiuz4hyel1py22fprgi93wac50zf0uvr3ke8zh06uc6x9gojbo453ofilvks6827xb5hzl3qmc4xy57ye3zemdt99y6kcfc',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: '605ahermv93r2kfx5g6kj4beds3pu4uw2qk3ooo8lxsrm9xsmjzntjqrgcuna1s8vddnh2cvwy4ydxg7bdedrr8dbpz3fv68fmuo2u3wet6rg9510vdm3mlw7b2yxzr3xa4xdfsk40pi8wzf78qwn1h2cioxeso1',
                flowComponent: 'b3eb3k3b84my6li3ftnj0o4doljxvmkj37a7g2x0kog9dj8mtooucblpqtbtvxjpbzvmz3hm8s5qdgw868at8xmidmx32dh4754zn1m1bughoaq3i0oppeze06qizcvmlccjaf04a4dcp4ys74o0oilldqw3aswb',
                flowInterfaceName: 'j5la69vm9q9a5gnv6e009n2fj0lovs049m8g2twe6assbn9tv5y8xg4z3ncdt0rbvuripisinlvwv1z75nedf356h1z24sz26q9f5u0qfw3pyqdte72mnt9xvcyae3l0hvl3s9ih79g9tfjsh3vnpn81qhgizq2e',
                flowInterfaceNamespace: 'dl54zo01rl5j3zyr84cma4pnhj3ko5f1xqvexrb8iaswl47ldefmmiw4vzo3acrfgym6lumxfvs709cenyrbpwo274q17smofd85azfrgef1kqge9oavvh2psgxlfl5l8z7i782dvipkew3t2u28r6waaov0d6uq',
                version: 'qrb198kqxkseflku7r87x',
                parameterGroup: 'a1vgz3p4id0c677lqsiyxnxkq6yv4wses8znsbop6fcr839niyf08183f1w5wsro6gz2hffu9gp4jhz9qwunikphj8lozwzmji06qv78j4uowbsandzm7sox7c8z88pzw4ceb3mgl9mli284romz2swrkef2ixbcdx9roo1c4gnk5r0i8dwoml7vit4fzb57e9apd41jsyw0pqfnchif7psoqp8igxbda1nr8i0juhspr2hotasgy7ygtwkwith',
                name: 'mhiwkc21nuvtmu7eebwbjr740ya3p7a51wt0qjhmxenfwdk2xumf7zva8w38ikviruthhbpijwhirz4i72dnn55z5hpzhz97abm5wkv41fpmn66srlwmtp7kt6dxomxvj6epvrt31flxc8zqtl7ukrh80l046bat4cq2xvac4tvbkgvpvc5p9i7emo5e181zuwfilpx2vbowk9vbpgypvlxw4bxkvo80ltpa8ylpg5c7tdxalopvxo1fjfv1mjjx872mptg9317w5mzz721ndjmgz3dfur2xz6l43or8l2vy21fp09bweafnq1u1q1vv',
                parameterName: '2m3bxzryn20i0s4v66slqsjwcy3z1a3fduohj6e14ytopr1brgnphh2fv0qay9szpb5gabfh2oihzm8vin0u9zhc3h58uvyo88pi4c06abj84tsjeegfugkpuftdsk7ghmf2e2oe424434jxx73vbecccplyls1iz3g29881qu5m1xfy4zrhi0c80l3fdg1x28g8i5l5k0s6bjaaos7ifah6a1ji9ipmqb41mdhqec3av7da8a9v1gzj3anw4tu7ha6xzge9y7hnyprau10q296h4b9kvuss7u2xclgum85dr2p9ya94e0i3qcva44st',
                parameterValue: 'nj2su5h15z3j6demp1phum5i67y97pl4aa9sw2r5nbco72enynsh3t9jp0x5us0uqajevyo0kgvnpnk979lx6p4vdaellghxz7vfd2vlqdlljg4c50tc0rai2h3ygcptpvvnryelk98qbi564w83qg4ae0p6e8ag2y8ygaaqwmu27x8j22ino2hp2walkqbzixaqppyxu22sp5mj4nlt2ksfr79gk45sbx7t7gbyvsp48xo8cgp819te1iynrln6zwk5z2l0hy7gu5l080k0yvhaav57u7ywjgi2lwu6oivk28m4aqzjinqc8e0et8kvfb77nz39uiz50od7qg7ol13inuf4xoxyn1k977kioe76zqub2hbyq5uann8gn7ymm19s37hao63qquf9hmqcsam83834ah12aqjelgskdkds6zgywv0079pmkl714yfgro91t4ncx2xyvh4urwux7ewv0k3wxb6seputnzv7fskwt41vbzre5rnkq5ywnayo8bf9yfablhzwuw7sfh7k1a3aahvqttw6e7ur89aenu7u98w2pa15rtoqlr6syphd3nsewx1qwjlhngkc4q05m2aiatrtgoqgy827d3faks9kzex823y896g79dpre4vlz3sb25s5tsojuv6rqjsdow0uex0yfdt02wyhg2ygehuw0z4occv5p7vhwmip670woeuhzdiwzof0f2x9k53fva2nbyl1yjdgne59kh2jcvfw8q9wnfe1e6r4mcyt03lqe07wiqsykjwzz1jcfgez9dx2be5u4j4s36a2o08ek0vq5wrtgan3uck7ybrz2dm7kl8ovhusoyimxi8s2pr7i71g9xrjuf2127mebrjh31897izf1p20huwe6przm7mi9g9n8gynbos24107cjnckogugh85s8w3eqo2bsy1i3fr9ya0w99qqidy44jueiz48kft41n25mtw7cikqw0wk1jhcyhemrcg28tvu16st6xffg0neq94abu8rzv1qbiw',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'g8hpikyagquejqw8798sfkxjm4qmjiaxu373afs6padni24a6y',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: '2w9hfv3vij1w96wd8l4z',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'vdason94wh4nfwwmxlnifuq4h3fwhdbi75g6qb802bhyl7psy37r10ev3bk9ugvotuxhamte1fgv2y2952rde9vcr6n8a7b7gh4mhcqonyizn4h7owqfe9p05hqzywt33mbxr6c2dmnx5wgmcgtaucajrc4jf4zy',
                channelComponent: '44jkn6mr2ggxvngs3ju8i0nhfbpfici9zdro1ngb3f3v7ydfdt53q2jvd8lus3pgwzar2epqht1kimxecw9p9fkhsr22gilyqr01tzbq5satg0kcizpzvl0cniqkv7an2bhs90eywb8pvem6lkho7rogqfiujbva',
                channelName: 'fmam9n8l64oebjibay90bbkrvz8nuk0bdvj93ecrfwncl5j2xbe955svjvz0axlmdetk02vnkm9pfaxvklcv9ogf425ecx7ad25dqr5w1xuq5seignkglli560yuuaga91w1r6injbdm6fm1tfzveuw03jhfym6s',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'v5214a2n8qc228qse9kbswjgwkkhze3ik7ovv9e1yy71acexz37gs8abvj14y222mo6q38ahbprnvtutl8kepg4mw4pfuti8wmazk6fwqiy616xkytju4h3n0nfgbuswg64hu23m23wpsas76wutvoigys4inni2',
                flowComponent: '6d3vlhe7ur6e91nddkpd3ah524qusr53f56y87ml4a16bjgt19ok6u1x4jt51ymmcjh86lngl0s7rvd53vbaxgpa2asphjkvi072z0vjfcbdmoi99p0xogi0i8tm8ktzf9ouytky7rmx8awd9ardqpznv1ui9cw0',
                flowInterfaceName: 'y4cre9xynxj7zmronfo3crx2ofbyyn9ycqurtx0nbnnn5xkfgclynf0cxt5tmprt9bhkgugb1xmwrstxgl07ywljw86nwqo9n4pvmo2d8kk9rtkf3mq8w00x9klnxrt11gfo4e46kq5t01sob8vv5oq8btuhx7qn',
                flowInterfaceNamespace: 'qz4mjnsczd1wlgkgfdh6ueh1tfn0wd7ogrnk3na5sbqpsblrdwj5hil9b0si570e8os3h90cueckjs99evmmyeto7gpiu8vb5ia0xfbq3fayftuspvishwv6re9mcrzcq50s6xr5do5jm26w5kmtggulh6w8i3db',
                version: 'zh0pcpzanwsrzvv14d0g',
                parameterGroup: 'k5ckrk7vxvga4iyc3on8bu80olzpl75xdwtrohb45820cbjka18vy3fz8lryj2cf0m4bdkoxsfkajdb9d6jzxc6v7mxioxjgtlan0ho10i5hhkvo30dedr24ri23hmreukv98qvkiwpu13scagfd1qjvjsar9ne6zr2g6v3uuujhaw3yluwb60ac4uddj2c57ezmelqcpzrwojp12gjdyjedlcyqodsevvpbmruuhwkmhn3cx7ug1box0xt9tqws',
                name: 'lnyrq86koggfl8nxzaz0ia7bm2w5t26eebbf3arlxlahhi20rn61ny3ni6m4gsb1zdny55j0nxwmmwkka5s9o0gvy6vvisoh2efyr3fg0iqdnpgbnz6actve3linpdu3pt7sn5cljtwvekjqcf7zxfsaqyh2uxvwv909qj47khjgb6bco9p604nkc8jbkyyz5d1y07pm8vm7ppnlw9lqydwc40s482de7jtya35wgs1k180i5xoabx18rppg6ib13q5ww0luuvrxamculzl7sbmx1e403xgy0o1vehosm5xx2ojlrnftn3t4lk1rjylj',
                parameterName: 'zes0dgugvwvxl3jl25d9js691o8cezoqnzfqdglww09zi91dtvrkpnrapvmk0f9qnlyweoy5nq9qb6pxm9a5jneqtsnztc5t9bjubboczjkdagphtcactqmjv8hit6jifuh27mrl384habytz7yiha8wggb3kl88wi9qoad4ofqw8g5wpsbh8m0u059zw3q1sjis0o3lnggfn58kkq7jssow9c0nq9xg528xxpiw0funpogm2wybam6m02e5nshrwynuyfq8xfvvmdqqta2e9yqhwngiq24dxx1bmiymn8kazizv4q1i2rgl4zttz3hl',
                parameterValue: 's69gfhjbi9hhlyrytmok1cq0hp4du6xajrb9v85ilyccs6t5ktmjnzwgbj31i28btnr1g7rj42apixjuurfi1g8tp64abs0kqd1vk24j1rah29v5tppb9bsafz0zciecqw5x9k2aou2cojqepegkwgb1315wb3gu5yturmjjlk3fpzc0ijmbh7wjggyp54vbuqefb2un0l04upgh78e5blnymaipn35xgshsefaic1vne8vpcp2se6rm4r8etmoq635x69ldhqea6v2cprq74pbd77s7x38nnrr93bwkx0lmh6itjxg64e14s8rqeyqby4chfqxeb3rq1qgti5e9x7cm7huv1yz51j2n3hm33zshn708pppvcnffysylbhfgfbcifszsmw5f2qgbi7pfxo1q2ceytogur15jla483ak6ovfhhp9m0420iple3ynaumdys5z3abv3jej5tsntpqxxnzjvf77y6j30zb1y29cvgkrc3qnh1rcvs93bd84d19pxh05ank745ehnq8iy5dh74hi5wsrac3b9iczw6zqpc8l0jchjiqdsny90z9tctp2zipqyh30o41iozmzhperl6yemv3pd5setk6gz9jsh17usag95aq87esbkcqllag1bos06ff5dfmzbvnek9k84j8scb67bkwsktiyo2jfne0ddyldmju4tgnphqsisjax9lckjp6r8xpgq299cvstbsn3f3jyy1pzktnz0p8xzr1wponqj3h2fnmjs1dt50oduj0b2nibd3q3luw1l0fouuoufr16cxyzutj2pqf8b0y4tvbr8hwnnjerzarfvn4gfj4s18wblba9m4ekhmkvngekpsayvuz6bocztdvofbyk508qoswu5f6cqoh9uq85yp1ovd6qi0yw67csvfw2vjtdfihmkbxenf6qeas9fzjy02w6554g2uhxx5phz3p0gnvh4m6gmdiqftpcq7z7p9uhzlkq7fefezjqzlgjtja74572ntpkv9ntdyi1m',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'rrs65k2r96vg6bkixghopruimvgnvzu32j98bhb7jvjc2k95vu',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'u6y9fij6dtj92tep86yk',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'vglgdn04biyjs6wv0j9zpvkxaojufcaf625jle4dcne25sr64s2nhr3otjqoai7pvg95x2nhbp5tp4bbst4utd6qvvh2st7c3gnhjlclrc74fm06tda0xxnoa90pjxhneveevz8v3pvhq2eqja6gijmhx5avxsyb',
                channelComponent: 'tn3icdj26pahfdrj3d213586629pz3wdarec7x78jkgjd8gsdhfu5yszuas94deu7y1infb4zu7afi7uohmmqja2ccu68obng61ret6a8350wp3bpmgqxmcwjwofd0y1g0qmlr4k1giw6x98ufq7zbzi49ealvsd',
                channelName: 'wixe34yj66z1lzte6e1c1crqqfetw2phq1c93g07pfhmtwhf6vhcgglv8ew5r6q8l0gyz3fdggkqjrqw22vlwvb8j569lw6bu9cdz9ptepob2m31i5nuyevre0e61kdk1mly3o2b2l1j6y7zgttoys7tyqvd32jb',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: '88hg7n5a03uoro1ybruopprm3tmxi22a962rfnjg5ik4s7iyihvdgq8o4d617a9lsxn3p7y93ic98iwkim7mo6c5wivcms99x34g5wkdlwl2o4cvznipqlkywne41vlm0g8m0nmffd2otu7ihz83f96bnrf9kdky',
                flowComponent: 'wu7zk6vakcxlbjg66jshl91iw58o9g6wd1k5nhp30vmii1a49vwkuvfkacs8dinr94a197ckqjy2ngqpwy73hn1fkjzatvzyxvpwaqmcal7q34c6tbvn20fvt1m8kglheq9fmc3zkqyoci4hxg6v2b5htjj3js8d',
                flowInterfaceName: '26wpcxmi5x0gwjca18m2q47ukmc3f74sxtmxo1m82i62g7a1tjmb6pfxduxnq9hpk67l0rc1e28tr9117qxzr4wcs1p3zcd0ki66v2snu0xgxdj21nn3zhchlo92sgstffd6swdi39or5xpezb007vob2tgrfnwf',
                flowInterfaceNamespace: 'jhwgj4ohdcupi3f3wzfty3yqwytolfbxcqz1zbna9xm58e83vpeudgr0f5tyepolyemfzytoe9dd7637fphve65kppmzeznns5bxx4frk58jfimnpdq2ybfibi8ecmw7u25qibdu8obewox36g403d8bh389ilmu',
                version: 'h1xhsz8xj58p19sj6kfx',
                parameterGroup: 'w75ammr9bk82jbb2zbtbbj6ih8oawgtg4y4svqmtvvj2zst3f6o96jbetuc9bs83jdn68zct5z7xiso5dfivf8ibregybw2di6bcz9m69c7a12rwtv8v3mmk4697jko1lm3gweqn5c6vrnoo0c79cb3ef0dfs6ddmag4yovvixxbpf1v2mhn2h226n4hhzypgoeuuz4p4fdo440mrjuc91ssubca6xl7fh3hhy34byqvihf2zc1s5ffmi5c6fyl',
                name: 'i9s6fud8bwxfrjxzrv88uwyi0ygwxl31ckpa20n4vxnsvycj2qk7dt3puiudvifasa06c6zm1zyxmlmxme4p41e5gslzccdx4as2xcjbkmqtsdmc24d1cd9ncoq374m89t7k15az5u1g8r4swjndqirroceumc7h8zm37lre5h4uxsh4dy0i3adm0ff3ketp2evtgcx5ou1v9n7prhdsllsvghzfcxt8fw7e71w5koer89ihbd3i6u37mjzd70kx0e17p1xwh6w1ofj2vf4nf1f0ccclawfknxs40lmus9ny4wvw3g8e17v7whad84b0y',
                parameterName: '2q90lk0iktya5y00rlvdclwr4kl4cdcae8eej0gknv8b46d70stjc7fmcn2lr39icbxeg3vyh649pyqm090xaytqapn8m8dfatabgupegkclc5zuryu5hvbw11oeg4ig0nq6vctmqmtcpv6ohvx2jq3p9fskddviixk59t1h0lwfwrqs0xg8rz769m3doj14ulrji13w40f9weep22qbdrlc2aoz1yi9px9360qhmt4dyi36km1x0k6l8ebdu5uk35a7kn97ezlfn2dypyys561ntq3fohajdfec29oaqsyqkanubyrssjm6ulzl3io8',
                parameterValue: 'lbe1jkwc0y84gga0zcxd0gk2faru9eoh6papldho9t0u1l80ky21pqpnpvtuohd45rkx5v00csqz2xigo71ntn5z9w3h7c4qyrnr82x48silnpgpn7dqt7zjx225zhqv2nonxplva9ftzotug8som05wgyyyrmbgpc1t4i1l4b05vbp7gzoexetlkh55ndc11xzu3kjknbfnxi8w3tbdf2wu486rsgdq57lswru11qh50eptti95lpxmu14szynhckww5o8i5qji7plwgbnieedsev3ru9d7zfpsdqjz8cmqgjkoawnv7ky1bam10n2f5drkudf99k44en1iful8fjxy6f0llbsdik4mbq862iu5bcsu12u8jqj5lsrartz568i3qjcwdhbkrkpt3gyfbhn56ebaz32np1tma3en3u2irau77pl2xn5xmi3j6g078js57lyv8hh44d7ezw7v4eyf25plm6bxptmt7xrhyruf5qjddgcsv8z97bru78k7rffnemyhg2irmz0rzyojsv1uxgum5o0rkavistg804nx7hz8f1mvv8eek9gwle08n4lj85eeqja4qkpluefpjmd6i7roxtq7eafwisdmdsathx08sntrzxuhxvlp7npu07s2xv4797ipytl6txksbtgjzq57h73t0n26azuok506trpfc3cl38k0l9l6udpfio4n36azuw3djsfpww2qdiuttiqx18a08berdc7ntateln7lonaet1pahkygs6ln0cfdsnt052ffbth1wsae4gy7wnuhjl2ak3catahyoj6lik9ajxi33j3wwew4v7riny9cfiohxp4ck5h2jo9fki7feeickav8bvseiq6qzphx63qew87moyq1ddigjzbhytac78237gm8vqwhvziey472qs0lhgatl2b5frefwvl4ozr1p20x0x5ih1x93lak8obmx4tcf59ou8vwcdta350t724pc056vhmfe9kovlok3pysysqzz5z76sd7fphp',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'cexczfl16g6897umbt76wpd1wbxuyqy2lrevu8dym88eotukmf',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: 'shrwtvda9c8f8qgqmju7',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'sbl0on0aneopba9l8kiif9xslwtdugmvti8bv013eftb5nig49z3fpz0rca3mxhjx12so4cak14yxybme6iv3pk03284517dm9f6hgjii0fot6dawx9aesya6bkj5676rcbszrzpqxm7ah7cgiikto24qk5bh8ka',
                channelComponent: 'aap0b31rwfz0ialjho71parylfughji47vbbdpmsxmyk49oc6io0ooo3yqv6x4k1hq6pmuduzxer2nhfsjvuuqa2lrzytmdh66loo9ndm34paamnp46pk4wzrysye6n8c6dt65zx6miyto79xcvpexdlpksvlhtf',
                channelName: 'n0n6cg63hiuwwbnq8ktzlea6agk2nouod9wlojbc3hr2gezibv2qav62k24ytp3wng5r2az971j25t0ydxwc2i8c09krz77aos1sebcofsz63t3eodbs68j80pxylyfjrru2zyhqmpdsdzqcn1bcsf985ygg9dd0',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'fvs50v65p5z48djkeqca595m8lcgah4v7do6e6h1wpjt196sx874ezgetmo7tvmhyfic72vfavm2dqueiicjj1y6dz7kpl874xtgjhmgk3h1a2wtso0mg6jachhb29acqhjyslwgbq2hq6c3mjjj7e2c2ab9a3c6',
                flowComponent: 't18oug3244a1ycwme2te1pbg5w2d0w38as7oz0o8puka6ff9bqwo7f9kjkljsl6srr8np7c82iolh38l224a04z8f3jwvzwsr42din0588wv67xm9qfzogofvcbrjzmcy7hpwqbxnvrzu9wll9n7dwued3n39skx',
                flowInterfaceName: '79s3nlz39aouyzr9mp6enm03sdmjiz0s1kwn8rbii5e4u9utquooeqqqv4tfel6dkgre8up5egephxmj4ly4hmq3pyo6gxlouapv1dtn8s9v0q0rxnas0vah927tu3t8ayl7qwi1v3r9lxvlk0lxvdob7ir1zp8k',
                flowInterfaceNamespace: '6p1t1cxdvxfsqet0sfgsdm7aq4l0ng8cbjejnn122nuombwxi0y430eemhxwccir1ejt0v6emf0zy67gq7vjmi5pvb1fstj1z866wa0byqerskzw7wujsmvto3c97iny2vuhbplgbkpzpjayh0w12btpxhft11m6',
                version: 'a8kkb1umcgbyiub7moz7',
                parameterGroup: 'kyzig5zrnfqh0r0ww14ur8ou8zih5p0l93mmo92rb8427qo40sihzis1rrrik6axmlqssbzd9pstpaiqvl1evcufjpwt6rd0j20kseu76dkf6w70ly8fiucwamsx8st2wppmuzfp7egccr07g9tpilxa44hbxxn27kuacukvls6gli0ks604ym0321q56rogprjqaley318c13ggvpi7s23sxkh32yxfqoaz9w5pnduvfcvvv0w8aodw3tt0xe7',
                name: 'do5gnfpd9d0ivrj6su0yz5tqwhq3gdaczv2gsuuj2pof4u08zsm51tmpm56c1ws55ccefpcyvsmofegg939f91kql36shi0s0itp36qyw7xakrnp0tlec8sx496vi9okepyfgvgkoegnphzndueafbf1jl4hpipodklmvfd0ug0ytc5c11s2ridju9ftv01b6fkdzgm8es03z44rrre7v47pw9qrl062r8j05d2x3l87d2elajkotkagqx99ev2cxdk5wp63gu55hz192m1yez5wsldwoi6jk65pbzk7xa0azzasd20pf0ipyke3k0xz',
                parameterName: '26rfw4knrlgfi3a4m8o8zpp4u1ibub9bopne9y39bn3u8b96okwc4qezfocbvpfi16hgmltc67bbt8fl6jwm96tlwluij5vc6iee0ivfx05ha5e28w4pobt10z7zl04e9jzvz02pwtg9mnb0gxe2tc9iipwmc1g85l3nnqv9bsmmx9hddk56ikzlvkbnwlgw82o0ik1l20ws8f2mkgvwj45iuceui4y7ua9e6y5yoepuilnse0btuacs2b4cx2t1repl5i4wq1ck85qggy67cvxhrw56k74aquoztjctyv5t3obplf5zzsc42ytwic32z',
                parameterValue: 'urkfeg4gleawhqv3ieosulle1syxcie9hy5pzp2gpqwiflder55c4sef88poonyvxztge7o355xpkg9k3t4kefta0h6uog1sa5cbm6gupiktr3nfz5lp0ljwqdmr1uro16eij7toa6kezbkrtih2lbi66uf9c56jj6nosodb56xoipdvrs987na2lb39q9ulwr85fbg2cxal10tt8pyumler1rp42m2xz1freucldyariyif80h1qn4xjwhno99r4ar7ca8t2hlba03fg4ss5bpw05zt9obyo5xalr3mifm2k0ki20ti6ceehduqjlsm1e74m5bq7tlilx4777kv7lscy9wmv4ve5m37j3v6zs5s2d5jw2qe54y3npem2kpi301eh4zbb7cz6gfd55x1bnxajiogtulplhxxm2uqnel3zmzgtmndl8m9rqcswyr86ckoj1tx9lmbgqmz8khkyi3ohnxyv9begewuylvuctqkcrxpfbq5x4djlh3ezd6x5cc8yhjj8g1oiaqr2ng7yynqiakrb58ezt3e4rg793qzlhtiw1vwji5dppopg61u473sy544jdzqfnsduksx85w9hnxqnk1a95xw2ox9drasl0utyl2m1pr46w1l14fzpqiq0jtuldvr4csfk5sm6u598fwrmeoe28iosvj6cbszbrsgvnstceeerhcmvucwikqp3apujlyy9dd06s73tza8g3w4mz2y9cpuny5r0wn1u74cmmkaetn0fmpq0o2tmbikh8ar05egssqb5f73flyibakuzmxzcrcc60l4ipebxw4k6mmax1s71bt9vge9770us8r4ovtzud4jy3yrkwlhuvkxgyk2k2jvdrx9z6ofaaxpacqv9ayq6uift1xdvnej5wjqihaybfxjtx9b1t3haosj3mg9vexqi7az543oi8sf07lrugf002h5cpp7kt4icj65xy8qlpxwcxwjokenin2iarig4gtktrbnrys063hjg94xp2eazduabgya',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: '1kxvu4erdzfa70jquzx420nrdp31upk80zm6pyynfe7r14ynga',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: '957m6emqb54lxi5hvi3j',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'at93mykd4uwdz8yawyuca0lvo4lixbd58bmr5783e1cao9n9lrkjjnz2aaj2ytab0snvbg50c5ylfzfk70o5qd8suglzkfe7m8d03smhpb36zpqm9nohrg2o89ggbk56tnmrokkx7d6yyx37ziibb41waeciahzm',
                channelComponent: '7tt9tkhiw8unj4dljxswzmfu4smsbzl2mn5smzdeots7atlz2asqr52sw1igkilyyack031osfhl021t0jecc10ztlvs56tn2d27a6uft76cajx75g9j8xlclfy53v12qujxumqxq96ghaxt7k1e44mk6mqad3tv',
                channelName: 'aeeghkdb49nc2uywypih5fx7y0jqc1tkkeep4evt4j4h9j89abtikthvnhh6z76d06rf3095nfuewnscvt2lzvaygx8biiz8gjxh635m64r4d454x8upcl3g0uta2u50lfnkhk3u6nawyl0kiz4mfbdjs5eq2sd8',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: '5ipltlzb0nhr8ygqkvhqgcv83nrnhqmgwgkuciaaf3aqjn8wph1vep9ib3w3lg1em60zv6rbjw6q6yne87cauzjqgnkga3dyni8gp6k5yfp0cn0xdd7k0o42zw7wik8ixttirwa82p2gcnxb6guqvpu7yeodn2ts',
                flowComponent: 'v4znix8vbqdip4tzv11o9c9xk3131k5qkuqi0wm1j8m0r8lot0dn6o6jtcu7kp6rjscezyw9d5ccsmasr400ibm0tbqm3nh931t0wry3gy85t4digtfp1yosa29j6xm7owuf3ekpwifcs3lg41ratzcv4uso7ab5',
                flowInterfaceName: 'w03kxjr7f4hdjed7lhxw8vezghyk56c4qzhhn4178tnqnvt7uk48868bgcatotofxa77pv6xu7wer6zhn8van7j12zjuss6493xc0fh4jbtu8lq5yzedrz3qv71qxjel0biq78dyfwt0be5jccghdcxvf6zq9lbe',
                flowInterfaceNamespace: 'g1cfk05z1t9wio66ogfjkpr8pgmxv5bq3dor7rg2wz38771hoas7kbd0jhdlng49lumyi775201yps37v1kmngyvzhgiu0m3yqrlym0vz0e3rrvkycobhpqv2zhwtcdwn6bhcalmqdgmwdmeub628u58nv2vn06j',
                version: 'ww5tic00fxmzypj6acrm',
                parameterGroup: 'bg6019pqxvtuekmlappj1tylfucp872lknmaf3jhraycr6jphhgvooyvxqeb2eig6t4xufsm66xiulra0dxyfb1xhtj2vp9oohvoblk6v5bptwa2oq0m111ebqlstdowkhxzdecbdxoi6ocdpjyt4fqy2006i0jbhev5rf9de9i20bw24797ekzmyj0dwi9r18iglvqjij04g7eukya1nct9khebdgtylf7ledmc3a3kj2x9qa3xp7qdonbxlxv',
                name: 'mf97uc92snjx5s8j0kirwflrlil4ceelcun8rc2tklujo1rncytaminye8tq7ptcodb09u5xkejaneclmg7ydxh32tbx8zhxd4iu097nkkzatthckvfbzfkdgt27tylrdr7tc7n94j9n2lba13c461vu9ey7c1qv4hjfyf8is26pvvjkr6k1tjnxgyg930gunoysm1qp7xk2j6ser1s09iqifco3enpajvfrnewrw6xid3pmmlkurskbzfi077zn0v0cl9zmksrukw0fm3tn7xq7mb59le6ox2138nm3qf0zi7zy41kxy4a8cscamttk',
                parameterName: 'hyub7k95x9uqalmfvxoef85p4cflntdbt05bjsgzuxmgbd4j7s8tquk0dk4tkzu51hp0moghorkkwaogked8r5ttyhv5miqhfg2qbxmigts4wjaqbskdu5mdqlsm5btbyniri0i7vwywrdozazjv4jl41ard2ibar4rdoacwy1gm0i9q8521vpl9o65ii2eqhmnk5nlj4gz8oevoi7nfhhsilub3yb2w0jib02rot3gzvdzry5s2f32o1m1fa70im594zkguh5fbsghe5vhldgofsyfpuacrnlo2574pi4vt5wzkppko76xs8sflajtw',
                parameterValue: 'w4nxck0ezxxl6iqbraal6x9mxb4qdcgc1un4x2d4qvw8xm3dwvozui8ke42ig4r5dmokjo6b0xuczrrgzw30mh8drjzoq0786d6mu869vmigoo1schb7pdq8ye1buu0sjm5n3ni1xxnrude9roxgncfj6ezty7ymlw45gib6qtvnoswzs9hfvqnted8xvgagv0rfo8yyzhb68wmavdjwgx3fh70bdsz3gec81wu2z2p48xn94f4uzp919xve02fffi8wglh065l836yfk6yfaxmi16y812dfjwjrfx1k4e6nguut6e0oxri8acuipekrin85v367baam7lmlo07fqx2azwn1dxyet5gdkz9xjlsfp4yosc8k30p5vyzga7ip9r4rycvyof0g7smmo4k6zpxst0hsmc7jymom9ou38fghnfgcem5du4j9rxdqaxczl1hk9bd0dd9a9ntl2c8226g181tkmb899iubvbp1arv8bw6ilffritikm51x1fgrsab85cw52yhxc7535dkk95bivtxc9npaqt2gp5lyvwkq8epk4nwssd2rx5ym82b565ktjcfauez0665x7f8dmh9qons9xrvkkwav85oyt4cx8e9rlcv9lat2h4v60q05476ioizm2otr7l5df7zp127fwpt9rurfqmf1u3q0klo26v0y1ej5fqgdpaophruok7burt7s6qc2uq4qtptlzwwungeudcnzu98kxgdxrkfcz5o3dv7b3hsa7xmg8v2fbzanp0y0ppja04dsffp3medp83r7boeqf68zfvsxhk47u54rt8i9iaagpzsqohvkunhwll7msifyml27h85aoity49cm4z3rhii3ynwh7xr2xdrmw6h5eup4f6d0h7nf6a0a13l1a0516ehc6isejsmjplw3zribd57hq3hhrmxrrtyc3wf70zwgnwwb29v0eb7jxnwq6q6gjzzym6dm91fo8bhzrx9rafprewfptdmgnjmsdde6zhlmdgiai8dki',
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
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'g75gqt8ji4kvr5nusinwxb71kwdcdpf24qxwitfwws3lkrklaw',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: '2736o23xgihf2s56cfzk',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: '2cd4gmkcfk92px77ndsfy62thcvlspav7i3nahurlhbtltakdwz4cyukq1g3jhwvf68wedktxzu6izo03gnchrs0dhpx84iaeg46ii6clvfptsaw7or9vw9rtjx6mhvxdcsqtl49rvn4dm2pqbl0a4pko3oobblg',
                channelComponent: 'wjq8togs6fpjhdrfbepp5fzjoc0hr47642mukt42lgdraiga0ern6u58bfmx6aozcbp4icka2kozl0eoowplnchurqf6qu0lk6m3xvpingyul0hb5r00nfmztkwjvfebtpv5h0551mqtyjxz3suwjqr6alrv0gyk',
                channelName: '1ans9iimpp06e5z6dvce7l0gro22iav4xci3upn4ui4g61nzhn03jcesh1be49m3h4m73f3r5wvlbl8w4jp8fsknjugyxvrpiua1sv6e4b0esr6xp0ynlhfd7bs7vjizes4stx87l4n1e6y3av0npfvd9dtukkzx',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: 'y1bff9ytnwpi41a2gssc8rpnahiap8z27cf7w53jeo0ywhv5l61ukerdepcglr9hdbh8qo31sxh6srlkpg3kgnhyr3f4k94r6f9aeu6tvr1jvpcl9nmuow6f8oi5pqiswuqazqf6m0hrw6ywmj0kh0ma1unjg69d',
                flowComponent: 'zbqwrfv25rotbz4z3blnnedkosmxhp03hvwzh2en80rhdzfce4lcrhexczv9yngimqkrlih8ony5sik2ynzq249r8f2uudqhd5r7p8y6d4cq55r3zmsqlifl83u74a7m7mqt2bf2kvbqsed3gcuq96f15z6fwoi3',
                flowInterfaceName: 'pq1befw7r0vuna22cbha2jo8i5xs8n0s6nz9hkkkot74s6sbgud9do9epiqu0lvj8kvakh013pc0a2f2b63fygimd0dcnnf7k1nnc5wvw0nmyz3tz95lxj07cxxn4mvf4ixo8f80wtwui6o5blg7pkduhvivs9yc',
                flowInterfaceNamespace: 'ru2qttq9m28xyhp1z2u39fclhirliiida0m2pan0rj8bx0zv47t6bma54v4iczgnagxwne5tfilvmx8wi3oln3m71xahta4et52py2ha12xxqoz60ku8df8k6s4aaduptf9ca4q7ecq06mc0jf9o603wxew5kwzz',
                version: 'jbjx1svekjovurbwm79y',
                parameterGroup: '1ppld0f6tiu7uer9qrdriwfvg7n6auhpshezkafsnbkcp4rp3zur5r7qg0xe0apnw6gqjq24o78timn17mnycebi3w2vkaylh6ywjdpjbi2n2xgv5pdeuivqyle8arcrrmzx7i0mg6p4d00331euksqsvfet9t6fzlkycv85axn22nf1z5sf7z6pmlpo79sfuy7kkg1lxosqmh8yx76dh784i4kbiz3qyw3tqfq3jp2dl6qn2884rdneml9ur0s',
                name: '2436306dynvt7w777yn0in104u2azpedq34c8x6mry8fl2qpc4z57pa11r2aiseohl9292py41ytoxwvjzb7j6h3n6batn763v0dxczmw36wn60vcxwoci9febff391fi8x22t0hejdz1b6rb3032pllf1dhunyc5z6mm969h8m0bsrrt123r7ryu9pwailwzjngiwydsqfds7x54g7vbwk1nfm92kj4rj2qbshve87prts20el46ytlyld2o4k69wygmhyfwzcx4sbkssb07qzefzgibu1zkv3bhc4vo92xw0hrn8zvhhupuxt857d3',
                parameterName: 'vepmd23085ent5h1vul7ynsa1b4lhctnmo5km07gcd93fdkfkxjj17fvrxceqrj0deufwzqbdmwzk72gom2068ppc6nmi729sneleg8e15drrh42ye14y4rx7o9rtgmhwbzqug7fexgegtaw4a0gpg0qz1jo19gt8n5ftiqz3gusiarjfeajsentdjtynmbrznkyyjhy9b2pt8te6hsx9uyhoan3wo4vd3zc96q6u5ou13mgp12sm5k9xbrs3axgjar4rpx6t0h0a4v40dtyimffk2mq24vpvtbi2nw0yv6jo7e2oys24tew3h8saegq',
                parameterValue: 'rfx4j237356fhmwovmd6n1czi3f8jwg70scgqz7hzgf8bho5qhrifm5bjufbdqhs4nr0peme3zxxyjl1xmzilay53cedgi7hfv9nl4ytfqowsgy48x8u6vuej5m0eivn98qlzyil07e3lkiaridjbnj4l1cu8mq5zttmwuja4ejsreih27jc18qhb93393uh0vf9mj3q7j918w7ypztk2ia9qduet2che6qsdui9un4w6zm5cddg6wyztuv7xxhg5e8hlmzby9ke8w2xkob690luuyx3r1kx9iv040nanb37z76rr6tq2b6959oc0uvu5ymy70v3hk4yk5s4cfuo9lebkp8ryzyoh82dm29ff0v95519dkz5fbh8jc83zlntt5mcxopfm960xg3qibjj9xzlqba4sox29g57v69y4bkv7ujx0ld0jv9zuxbxfrhg3ikjj6cmm7v2scrwp0xkzijbvoge1lfpdr2ldcavfrq89663ce688vuey0q3dxzkdr13uindnzfg4wnu1jvsn6b1yaumepq18v8kg8qjaidgub62p97jkth0fjxzrifh71beed1nzmbt225y43nsrfqwj7zrhoyo0e0jmgbm4it1fcxo8z1rbp0avap7fpl7lg4g1cdj9v7darvzrragycc7gm95qpl4nyk0cxlrp1a4nvl2gpq7ewzgto9m4p8f5xivuo40xs58t3tz0j5yf2cwjwj1baw2mwb3gvv4p0dycfjccqjifczqxi7md9vvkcus7lrucviqz3xsuy0f0typfeb2vb3vkuiupy720si8drao172upandwd6crbwzljgzww5xvstxstdy31suw06580s090or88yth4gfwtl4z2usfm04psjhdtadwuytuopd31rry19lqcj3y62avcf76lcwnueprdq7kvcvfc29orbq3y4ybgkoqo7een8vtaxkz8x3cluhgej99qa46yywewrryzcxrz3o1g3rnm57k3tz7hng4rd68h9ecq3l',
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
                        value   : '61747cd4-8873-4554-b0cf-2a79ad77f5e9'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '61747cd4-8873-4554-b0cf-2a79ad77f5e9'));
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
            .get('/bplus-it-sappi/module/61747cd4-8873-4554-b0cf-2a79ad77f5e9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '61747cd4-8873-4554-b0cf-2a79ad77f5e9'));
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
                
                id: '0a7bc560-1b80-4067-9fe7-c0b1745e67ff',
                tenantId: '6abcbe26-3030-40ac-ba65-b4916f24b90e',
                tenantCode: 'v4nzicvu9v41ozeclokbyd6ve75s2kklah05iw7e0pdazx4nro',
                systemId: 'fc218615-eab6-47df-8368-a1c1ddcc27b5',
                systemName: 'lxmensjalfrv04yn6znq',
                channelId: 'a0653480-5d39-4a84-82a9-8b2c0eb630d2',
                channelParty: 'rt32lrl0pyk87i2p9s5yu4j3uibpbopg5616wr0qj7w03yznie3dk54whyidyd3q9psughcqs94eu7tq5h8upco5cc03316gz085xc9wg2syzcu2llzcia7wn6q002dbtaqps6bw0kc8ufbjec2v7dy5bd8q1e7n',
                channelComponent: '5ztysj8t5hy37jh968kovo49of9vb5bjh127qq5q3akz5bxc1mrw2lp35jpvb37scuyy5jdr1kvj6kha7ffm6jf6orfppb844hlrihh4dz3zuov34e5rvc7gbwupnvut1m7wo9uqg8l1p5rkg01wkd7q66o86x5b',
                channelName: '4ct4bd3xgx1cjzbwrl0f8xblw2h37u6fh7e2pzbc6j1nxx526qdsvfy7k3odjcff47ohvz3yacjpd40j0g8vlvvgcb2csib40jh7smhic83kabvmz6246tf9s3tg48qw4gv2r6dam085xbvuw3ur01flsxbm34sq',
                flowId: '238776dc-8b91-4e00-bd3a-21b80963454c',
                flowParty: 'vh3rdo612ktpxy1th9lck4w1szjby06keomyfdc29ydcs7ettdikmlhext6olinkn7l02hhqon3cwr18ztg7l4z6u4e8vuc86i0uhovrss402xv3ow2o8d63mxucdq6i3g48c4bxduaxggqye7v7hairu2owqbgg',
                flowComponent: 'h1gjf8h3001jqdvvy7h1upqz3fcgcujxo62in40klqm9jsgbi2tisu0btae8qfwdg8f6fdnajy9fjbkbseik469vhx5jsg9jn7asemtckcazxjiwq51vg73s8cg1nt6a76uqkomgbq4ihk7xjgrbs37z90hn945z',
                flowInterfaceName: 'wkar60jb0szb8n6h0s8pir0du70u1w2o41eiuufkwutaxmnllykappls7kpqo8uy2gwehw99n7j89in87gi6si71jvh6y9eixhz6y0bpgist4smv00scs6i9wq7mm3u6va3cbw5jqljjj3vk4kzhx1ajp1bs985z',
                flowInterfaceNamespace: 'njtiru8fn0ea7u56iypfwmbidn0y33k0hebtkcqupknmptdr1aqkx7e8u7vg7b1df3uagj0j07rrygolxixsnzf7vojg1bq3vuivsh4n5txesvblzkmf5qto17kanw9pznye9rqxismb1nmo7pbshzmm7puqz55n',
                version: 'tt86uweycqztmitj84ol',
                parameterGroup: 'vl9f4xechc6v46tdoqmy5tfqvo1jhaigsrrw4h1uio4kloomcdyldbvvdltmpmntllfg59a5plxfb27ay5fgxy08cved7co0wbbikv623ypv57cw8nw2t15kz5z2ar4wkckwnybb3t7o6ctfw0mfhnstdpdmmc63q4orq5zaj1qti79io4jimw9eswwf0g9q8kq6wzpgexx7v16btkm0rccgocapgz5b1q5pch9rug4rpcmqmaklxwz3u2sc5h5',
                name: 'hxoy47nc0kvhm7lhtgp5llc71vx0a89elkd3g3385ydj5l5w43nxqalcp9tfrzr6976oaufc3lhzk1k3l23d6ciqjmhfn9umh4diwo86mypaly5sw1lbb41142u807t5b216qxiqkpfdq790785eo3wsnu2ephfdyvlrkp1wommyttgg0bcs3iyrlq1sg1ayhyvsw9y0cbcdz1nrfvjzakzhv75kaag69og6z4hk1ubol96kcahnq8mcurafhuvsxcky7kgovgg45udkkudye6pk12trdjwi7sp0ifvwl8g52ufwwynxkr2odq5hhr2e',
                parameterName: 'mf1owjh89qas5lizmj0vt3jkirbi3jjax0ilvkn6i6zw75mkfqrf913eb3pg4hgpwag2lcuv6yfpbp6m5jg2irku3wpetc4qef96uvlnr6f898fyhhbc0g4we443vstoxfc63rxvxzn158sz09q9am7pkuoyj90k39rygpnwv7hc1p1t7n69ib57gpfoz5ebvjfm5twpqt3zokt1i3s14adauky7g5ohf3d1hg2cejicfe3u41hcr9pj4nep1nctsjh5doxqsfkyddw9z6nhozujschjg2pzj5lurhsw4nurjojvgozwv25pbrp3u99o',
                parameterValue: 'q82ru0xim8j1n28d3qh5rtjjvwsce6rl9089bvf6ix3za3ruucyhc1nu82xdvivkiysp7ssl45asbsatchlwegsiqctnl931m405fhzt1ztnmj18dod8o22o8ditp2tun1ek4wcjpwt10hd0tyif8pix0i257moo6irzthyd5r7i3asarizcy3qfy2agx9pjtv8fig3z82gke93wenw7azf37p1ijcd29vfxtonxnpzw0m25ekeog9i8dwo40a5kok8mnhzj8upxg1rhlmnl3ysr9spze55d49tplfvfxbz1xoawzspwpiqtf4tsjmiu9pj77d0pwrxgq0rrd0o8z0drwt07j6r55qc147dunvtzod35bndkktrj67hzmy38aw740j8q9v7gvbokxne87ys559c1z37z4ngnu7q5smnp4yw6tvi2u6qxpyw0qb770vk0f5l1l5xiozmied1zsiluzvkkw0ma1kmaud3giqbvrxihbw095yo90pqt8ceq0kbgimaanwx9ozne08mmtmo980yfypn0xjc6yjxc30bl4dv4fwv1p1i2myritlhlum4npifhfn8wmtcx4vzzvfyivhqz1oy4nve3ttid7foujlvtn1dtr68br2ygyb1u35n3m4lsktle8vgoyvl5hu3niflrh99janzw7cpsuf0s98146532dhg3k8458yw6r4r18fgq4l2e9yxm0d6q1idelp4kiyb7uwwduwhrnvel332jdpwk6dvf696lz7wg4kke2qjzgko0gehxsxk673offk2qccezgvumdhws521hkb820gzj0oqe6y5osogfdta8awjdsa3xxkmizlr8mk62w1wefe462c36cc2z9bzeppblm6wgwublxecekgpnqs2hq441p77uxby6dhi3gdly3vhg8hjo6bzx8y3twelkewj0rjhu3uazph47ow6jocv2tksoh7h3lbeb7udasz8dgh86eqffa8n3ghfdw8p07qe1083kmb7y5dk9fz82',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                tenantCode: 'jhgpchgh6tjwfxshinnxn6imqppyxogy6mp8ode98vw5h71vfg',
                systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                systemName: '2lhj1k5zri2zfb4618cf',
                channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                channelParty: 'xy9pygn3m0lzd55irqj933v8iwcqjdsn9xg4r3ya9n5uozqfei68q93zaw2eperzscf1g9tto3kyytukd7b3uhfo3mriwj7d6dvyjefe3kvklpjllefvs2aicjt4kf9m2uojmsvmeusw7tlyzluq2sihgazapqpp',
                channelComponent: '5xriqeot2jx1931eals3oicqiybthmcq8foh29em0kzclpvarpt4ef46y9p6r2ny85se8ye0gf6sxsqzy56tvfhy78wph3v04vxm5tpofudso6a4gjl9ws33tlzqct1pqzqj5b1wyguvts34jxdz6wp1fhdpikk8',
                channelName: '54olrhx7wb8hswzuobmv79echffgbql10clk8knjvjm4fzgftnfpmzeoblr0q85uyk3vbvnxqzz5nukdlceowduzf0t0pzbxtjgc1ow4dpwqqy2a6glvtigvnqfsw6hv6kxkw0mo7uih8mekslnna7su6xoe7bn3',
                flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                flowParty: '9rrzi8k9py7b8zfuy2v8ejw08ab9v7fa7ki5oc7qqf07o8f14m2l9rx368tmlbyxl9150uw9ewmhaimztx4yffgz0pkhv5upvrsm1ktwc1p3g2plqyn51zsm7zisw0dddl11smahhan9rs3unntwxqqvz5sdqfr5',
                flowComponent: '9uhssfupuly2rtiww7wazmerh7dr6wqgpi793m85st2ntlv64wacu29fwkyhhn5cclsft880tsaimhtp4sknrahshmgsozodiventqed0sixqsy1jrcj1gtwo5m5kj4g7n699xipnryuh66oduqpo87cyvw0aa2i',
                flowInterfaceName: '8w1bqsvwloo8md15jq7xd1k33asywwm544fu53dkg1shopt0h1pv7an19fbpgvmzgfe3jybuvdmaszxf5lp2ehr6047a63s64aq7wfyy3odrfvyasyjldqet2iw0fk93pqqb33jdh5yta5qppxasdtomglwzsy6z',
                flowInterfaceNamespace: 'p8p5puvp9lbltscniwrnze5o5cm1rrdk3hd7v37ey13ho0aiz268r2i4yinv42az3mr84pbwu0jwe4b2g3phjhn0mmv4xobnkguwblnbv4nwrxfu7xlefkm5l2e7ky2wo45gzjecr4mp3hvfm6gpxjc82dqkpled',
                version: 'ebab3ma1el02o06gh7ot',
                parameterGroup: 'lfq2fwfsvd9f0hdlbfw5dh5efiumpxqngt5vxocvp5ynf8re9czov2uwy8gaag3tak4qkc576z3a6vsvnv6iql7bndt50fpl6srkv434reodqfcu3n55h8vekw59bpgfu4njhcp72qlafc9i08hphfeq5a4us4fmmcuu71dn5h02ubmkud9te8n41uwp92jsha00lolyn4mfiybxd04lmpth18vuxx4z143f965sj5rhwhnu45ecnnaottowttn',
                name: 'kr5tlmzqzji6llmfi1s6wzvp3jhz7iqpkclsiq3oxjp9ez48o6q93ataeetggawfuvcva19gz5ygi19mmism2z8xsdiic2qirh0k3ud6c5iey0gy7ve9ur2ttmml17dclawu96vgshf3bjio6jj3jl7esc97qxocl5fy0jxp6wktwlmf6ibp5uhroeo88882a8dyh4za69efprlnu4sqesw5a7rpaimy6x06eixt6iy264fel1wgbt9995kgf6uc8xbdz5ta79umg984e2vh2cshlhlnkvln1f30gjbu69wjzfte7mfju2tglj8rf040',
                parameterName: 'vsay53edefdy2gr0detre3ryvaa7kquwfw7h2751hh2cu7jkvm6vuhp333eambfx6ta2ts1cqq4425xixrxzrzqefpu43lszy9e6r049vaqawvh0tcqap7xynysznmnv1swh1s2mrgffpus9nvocwn17mgj50800n6ff8tdzjz5fvg3ml74kq2omxy712037yudli9xe7i3i69zluxicud3kxjyz6ctug4aeix2h76gnhpq2bj5xtdenqwahoio9ubbtuvhcxp33ieoufgzzw10ft9wh29ew8lu7s4i3yjnj14fga8yyo8igcc1zyxda',
                parameterValue: 'fony2gdbndcseftpwrqyk8qmv4271genhmem09cp5bctm81ibhna8ojnhjb19e7bwt5hfdg64y47zhdt04srxj1ylqaml3tvnujpx45k9e6gu0w72l5wx6mlsyw4f88t6v38w684jn0d7we2rzze2b5cwhi2hauvluymxrdpmbyyx1ppr032ghlp6fbibg902g5008fkqov4v3qj1uvdsaqypjaj0gsz7k87r1863gnbtoax6sw5wh3lbggx3nlzbyoguzeilq6wgm90uygwm1z9hdbsasabgb77qqac5tnn3haddt717cr7el70pl2g4xz033up66sis6casdjaa52um0nzc0wwpajpjqzkbympqz2bncsgvcpc6az9dhrybhdhr3by8pfmvgyouaanzs3de435t5hdiqat0bphhzrykraho5mx3f2j4qxgomp7wylr47ga3928zlec1amn7854nk823q0jced0va9ouyp0jxaio6k2kvjxmhp27ujmifpy9addx03fux8tb9cynezyh2sxrnht8exq1lxq9k7hcc6aue7r04lty1lvbte2xvq0eqioko11zgx7bwywojy70naxv1gz8a8u6k5ykobltb3r1ll6p4xet0j68f2gikbjmnt1n8vhsmhnaawzbddp0t0g2kkianpoohj3ap5jxwrch0sc6gnu4dsoqrs7insi2hwypugxj90zrv1cpbxc0djcbd462smiu0c0th0fkxdq4i0a69qtszhqgixw8fajdva9f096w6xbgwb935bl7ystdgyy5dp2mq595tzxag7myeqsdzuawwjd613km7mlh1734h2i6tveerhfb7su0mu3r443k0afgrxismwmu8aq5qumk6prn94qg44sbsxkckafyj9x0kgjiwoet6i0m3ah3ed2an6grqa8hkrzjuplsvuthy1wbigyd2vayyv4diisqo35vluvjzhp4kjxf482qmmr61x6lwn9qx84dkf5dwrwsszitgyrr4a1',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '61747cd4-8873-4554-b0cf-2a79ad77f5e9'));
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
            .delete('/bplus-it-sappi/module/61747cd4-8873-4554-b0cf-2a79ad77f5e9')
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
                        id: '237c8cbe-9503-44a4-95bd-d46e88ec31e6',
                        tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                        tenantCode: 'o9qd8p1pzbsom89r9yak2wupl6g2qxr8kwdvnz1pcd5lq3ta18',
                        systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                        systemName: 'bf5xdorvpmavpe1qc78z',
                        channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                        channelParty: 'jo0txzj0gytvazdk5u1umsy0t30bfel84ups2sfbho7uyk88asmvpm8dlblyapt1h9tnwuarv90mot7e9bp9rruvr149lcmsygcwkoxlgngcmp4pqylczrz987p76yfi37ommbkcjaonm138p833p1wt8zm9kuxa',
                        channelComponent: 'icyo2kqw4y0oyzc034i3q0pfryd3hluz7da6uvl0q4be0j05syeo1cwhu7hqfo0r93kvu5jbogpnutjspi3sovau83mxpihxjtnhlmi20bc03b9c9m1i24dd1js6czh24kjh6m4pluj7ly5wode3kiq70isof9fb',
                        channelName: 'ojqt5zvrh2f0i8exsvcajs0gol0py7y28awrduh7h0kb5wckj19coan0ke5q9uyu7ki0iuiicwtj7dortdu7zi2ataaix67bw3d1e61lxn0tybutf6bfp30q1ny3ej6q24mhm94nwfc1e4gzcjqosq48zep4ccv7',
                        flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                        flowParty: 'zm7ivahyvm2panpyeoadckfyjy71hsak7dwbh6r6ri5phf0lk5018tjrbm7tcl3b8qrgjkfndxdw6hd2327b2m5y0u6owhl9utngi4nltc9dsbkopp8241s3qcgwu0o2pk31fg677x818rbq30ttve4yuf1oxi62',
                        flowComponent: 'i4jb3t6137vq0m23r1ar6b4kqyrfojcwe8tukvbqrn5e6xfhur13bvcwqly3swxa2i515mk5w0aogx9oor26hrtczgtrcreqb5wtkdnw1fcpa9iwtfivuc81t5tfhdks9q2ww01teeh5orcg18tk0jswfpl4vvyd',
                        flowInterfaceName: '00pg98dymtquyavfposio1ts1pzlqtj24dysh4f36enhln6iykdzeybxpg25bl8zf155xu079vrqv1xmk7jnlo0g238za7p4bt62tiom58fp5jiq883o4o37rht3gtw8gq1b2ah3lwqdzbmhwx7ujrk79jgcclid',
                        flowInterfaceNamespace: 'coiyaol3ux0yf8rae80r68r50u58f7136u7m5o34u4h479lrtnftpnnfwa25siq6dt6mro3cmnfrqe2nc2fkuss2nyz3g1yond7jav4g0i73z3lh6de6c7012xgkzk6eqeji1nqk5u8bz6s0u237uwhw1ekqpdp0',
                        version: '2cy3vrifcobpc78i9w94',
                        parameterGroup: 'bg6cm2g0c41jha8z6umomw09gntph0radgpx3ggtkxpke1upa8ea7f7zfh226tdsnj7ty1mzsa9h6uyyicexeaik4t1xbnkgtsf9agn2gdv86f2v1xdrp3rxet62wzg6csleg377cwc4hm0ku4qikdsstgx40qziirbu1bwb2fuma9rfkr6ni55uzdafxcpccraoxkmgp0qnfd46ojgb8sjtvxm2q01jsutv6dathhnuo29x3ozdwr99ybp6eyn',
                        name: '8g0sf89i41zf9vsjjlafyhbmeysxycomwr1h88a21o0m161fh3qgglpjpikv1kyf8yq957c9755jognzys2lhtoz8hfc3y235r4huaw487wwbfad1xirpyjaervrbxjv2vxtk36o7y9s16n39pwh74rairt6bnhbnkk0xm2i807t6m120vj2ot0kcpt0tdxrt3df579ovpiqssfa4v5udz18m53wt8yjol9nh8vdxklw6fp6z2u2miak4fdvo5uy23kk6xx1r0f8a16dtdrnth35p2hf3itkj4vzpn1l0nmualdniwix72ios8pf0f5n',
                        parameterName: 'y944yrgr1a4o5lrneaz42gzp52cdwt9ezvqhoxf0fmy5uqpi35k98lklltnhsk9mkgzrvflp9cnvemwi5pz1ozyf28oo9a0xsjnaauf22w5wtru53msburtc7y3bgm8j2w01ujs4zfmeu66hnym75zxi4t4zlonxqn1rr0a972csewkm1993pl6otj89gfgczfiu5ed1gdu7preae4qf9bhuk2z3g2iwn02loet4aj3qgrv9an65r0h4cqy8j69m82d8p3ogr9vu8u0sblo5392zlfmt374782lqfhdc7p9rce7anvh4v1nj8c8c84iz',
                        parameterValue: 'yqwxogp4oimqppw01d8nclk6i2a1iyi78q5zlnpo1j2d80fcwgcw1poywgy7q0r7hrtgru3hn9mlw0brd7pinkmh9jbbd7x7yjwzsc1hunvya4pfv6qwgycj963suwzcns6fe3mjkfns39u7a535pe9mdgjh34bfgutfu8fhe2zm0t7z13fl9hnh9mvt6mtaa7uxmqltr3hylqtoyp8u4dl2s30as5ryhxplucn9tph5ni0f2kjek1dplq0743smi2gvxlskgro6hn577wcodkpqvym2q13bkdhrgpx2k8tlk5w6kuvo4hc0aekzq451hgbnkvbluhdl2b2hekg5fwazlvgimbjq5br2o94pbgmughybuudr8msq6gfpavab2vovethc10q2268mdch7rnn9pbkxc6b5z38j9j4pimb1it6wuy17d40k0hisvyoy219uh6zz0vs6h5ogv63cz5615k774sv471330cvyijz93bujl3jez4ris3qtt7o9vbm56ot80pj57jph1slb9den7qv1git19wd9do83nhjjd8zqt23dxqexipn3bp2c1y00hl1cps8y10v7ynnaefoo3b3rtznu1s40tjupow6x93oo1kq71h8r2upmmw0g0soypo41ys01hdnygrdm7t30o4gdbzfrm54jc5rptowqslukapkkms4zg4rmejzwn0865baf0r9tp42ue79k6dmvsz81de36v2r0b5e2r120nzbj8eel7eb5o6wb1gojp4qufmsawelu6erit9r3wyotwltzwhrzfa1wfyvu4zal4stpteg0j6u8vi0alkinstt17sh5n1dxk7ioyggfx2alupcw65a48h8xkdsjwjhaheo338ksmitdb3qtougy74xtnib8j6ll0r1we0wx8igv65xh7aqo7c6kd1qjhh13ihcjynwhulozmt0zpjscca0myqkdmcnpxobevzm64s12905t2xmjpk09naq9qdh823pnmhc6qy0iike9l9zi',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '237c8cbe-9503-44a4-95bd-d46e88ec31e6');
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
                            value   : '61747cd4-8873-4554-b0cf-2a79ad77f5e9'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('61747cd4-8873-4554-b0cf-2a79ad77f5e9');
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
                    id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('61747cd4-8873-4554-b0cf-2a79ad77f5e9');
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
                        
                        id: 'b494b442-0fba-4d05-a4fe-d14c4fc75ac0',
                        tenantId: '7eea54c0-672a-4866-9f8f-f178636df27b',
                        tenantCode: 'z5yv1mpb4syjq4os9bvgg6d874tw84oi2zm7a0zhvm34s6cvlx',
                        systemId: '7c21c122-1747-4cd3-ada2-7fa39fdb3f8f',
                        systemName: 'fdgwpepencwdd14k0mn8',
                        channelId: '4b32e708-5f45-4260-99c6-585980507800',
                        channelParty: 'd9qwtgh4q6nkqd9bzrjj00apukewkjbgebe7ifs6uar6slxwh8dn4henr2084joihzu13gy665y3ioxdfs4gpvrdvtlp9i7dxpup7vgcm0qzb4lwudaqdfw98z00scjhmrfcu70ca47ht2d2br12m8jbzw2dlps8',
                        channelComponent: 'rlk29y0e4ipcw4ndctgdymnttbbniw7h2twxudyo9g50ob7i56mgaatttv4q1hz27i3qt6jmooeuhyv3dsnhregwpd7yk4lrenwsd6nojt8edl3erb9jkphflia7o5mzv294aw6h763ni9gjx7h57kyxfivy4gyd',
                        channelName: 'bmg2fg9i28e6dtk43x34pzc57ack8w09uk74857wz6hm80j41wz8o35wtnu0auyvad34czuwigmwcaiecs15yvhx46fg0qtm2ny4sw9byktut0y7c5unvmxr6nrgiokmoxyc34r3l650rnaltoqggr02qsifms81',
                        flowId: '8946b50f-9fa8-4555-adb6-7a1aa78d2c28',
                        flowParty: '5ttas12n0gjte1tx7g9727wlltqju0p5pjlebzhs7zhimdlj5bs7cv78vma6p4mm5f6o0n19tv9xt7rlmvth3wyffa2iktf8zrma40nu4tejo3jo2v27ir22dxxjhrszk8skyo688ao94q7crpja0ibdbfkh165k',
                        flowComponent: '2jemejvkpiu1zkxvmyfvxdyeeljoulyxi2ufj1dq93j0f0rm3h79e08pn12oumepogz72nuk4akfjzkb62kzn2aaplgoxnhxuvh6s0uu3sxenzv4yg86lgocerynczes9krfalryv6y81tc3b8lf33da4zsh2er7',
                        flowInterfaceName: '8s75sbum9pq0m2815r4k1j2uk7z71rgqzs7hiaj1t4rhwj7dfm5dlaffuk5ytfnmrek31qh6q4iceib96ltvm3m9epylwchilxbevt5e1wnyaflvam2kfh4zf79h0taltml61xrrv7un9jn66etg1qzqdcbpfylr',
                        flowInterfaceNamespace: 'iw9u2g7p6yjs1coseery2yjekiwlz93f8h6qbujvgcz9z9s5g9p58gy9w6vci2ltcajg18s0tp2qya1z15dgokz3ase35gqyfrto2ulj4uvlfoes5o0233zxzsnhlgxnmckrnc5iul5uv7aro61smjv8ldq8qn8x',
                        version: 'p4i4ki424o3x9665zh22',
                        parameterGroup: 'xnytrzy1nojkb9fkgh3cbiiihnkw3gu7nsarw7tjp9e24pmj9q48iguqfntd9f9zme5wcvcnwe33isxgyh0dy5phgu4x71q8d8t5fahb57r1ptc83mi09deyt93bjf2p8sm4ch1auhk68at9i73581ym1o3o3rnqkxtj19vy23083535x3qbyauw1w6h2jewl3iu6ezf8dxpgntee8gnj8tsd1130thfmr2oflezrurb55q0x97ej9jn3dr9ufj',
                        name: '6zdd8p1gvzuy52qy9q3vn4ivmqh242qjxp6kbtgl9d5oqmmibe46hvlgzcf1we0g7zf3vzh9yaf06na72nkc8cfnmglck1khxpw5l8bv4izkciqvy8y98kias4tdo80n2k5vpmc9fv2468d529y92lu62frmityjpusedztchbfiqxrifvvcabyvkm9ah1oipiywjfo8qfa3z54fd6m89dd4ps2gverezxyyrcqfk8i62n6xwmrrqm4cohw3ux0my59powb5q7vaal6o623wbzkcrugruge33o7d2rs9lb136nfq275vabl3x6xq119q',
                        parameterName: '7rl11l7pqsyx1flzf6bsf9011ksxyl4vyoirkr1j00qos1owlqjdcpofjgdx1cmg6qt1bm6kz11r6bp74i6d291jgro6eg4gr2pbr1cgdxgt4ksk8ywe9pp6mzpqfq0uc45sdqzasuh20ud2sws3s5hzwvungvrios7bhc8ukd5wgc5gywqidnh12wdf49tdrgxqduov5mtzoqrnx1hx9ptagh3k5ium1mo7q6tiq9dfvp4jv6hojof4xduscxlvtk27cd8rhd04vxqa3zmjgpdy3cw6y07wuooidqa2wgqywr6swl3iayff1bq51yq3',
                        parameterValue: 'jurrjrzyi88duqz9xh1bd9339n38onpr29qjic8bbw369phh3p2d5zt2z6cqr42oau9pywfwdquw6iyluaoc1xsq6dwcnjdrqytdhzik8mitkt5agilai6ofqvoa4ridrdq3go3agtjaxohytxguepotspjsm4ehjn1co804odjbh3sodp0n917i1ilmejrukh07otecxg92qd65p4idfvjsz7riopzpzmwkzu4g4ror9m2ccnofpxnj1cnnxz2y9u5d78mgkhrctoqt7q2ylljavgdkuv35lx6h5zxiqplm3vhoq4qec3xrx8zn4nnrwduuac9nfccer4b1u9ct533w2y6kqxrz8lp2pq8xma1xp3m5gzaartwnquajarjnpiksao1nfqgru25ap1qt63vnw6gb7ofggewjvm1h6wxctgeutvtzs6m9a8c8fo0ovztr9m7oupbtyiwmicsnhqn3i0kxadqvey8q0nxgax7qwgzf5gyczszrfmuv92pkhnk5kuny29ybz6xun72vxmamh12tpmlxijht8hvzlq29r08zt3e9y1bjsawkjtdltw5ztwziqq04odjsddtlt0acjbgn090vh85d6ickls4ebjilkk178kn45kkuxgrxl0h2x4xdhhul59o3ue9q235ulv47x0kyka47725sla428c58a8tk9leq2g137z1j266p93nzz9e6mv3kfzozmysmpm43pmk6dh516usbnxxwnj31xgj9w0qq0a636zo9yxuj3hzwy0i1ylqrh2uvmff5ee4xrgadhirmxwwe7h8zlcsq4484qeuf8rq2bml3iky765t5fmr69ebvrwic3xots27htfce2l0khqelipdkwpgjgncrvf0qsollt7yuqfawdr8p82zq960n81ynvwjxxyxujhltjwermjtj41tuvyc9upvyq0up2jqkmhcm5ctsu3ezfk3khj9rtkkliskqc4i6cw45aro5b5ougj896a4i3rtycfseys5zi4ff',
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
                        
                        id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9',
                        tenantId: '9cb32b80-ec7c-4f37-a20b-848f976fec38',
                        tenantCode: '191tjpn7l2dsgzccfr7jfeqo4ztxr3rr86ddfmt0qmst3j8bfh',
                        systemId: '811b42f9-4ee7-4b3d-bdec-b3eceafd54db',
                        systemName: 'wc4o9onmeq6giueqd8ew',
                        channelId: '79cab625-3a92-45a6-abb3-b9d2a83413bc',
                        channelParty: 'piqrp7w9v3fetfl6k8tkkhe20lwsa552y7il2jgqxb47kcbywrozox6qjdpt8jvqswzbrwj0knlbg4j4k2pde55ybtt8dj20o0y0e4e7q3b3g0ghua2az64r59pfmllrt0pgc8yxlzgtvffaldzpmrji361k8931',
                        channelComponent: 'edhp0z33dmmx5dhm73xe7xtz3xbzddg6ht11z9f1fhcnfuembzpvgipgo3zywoblw2c8qxhpsnfr9h8s2fz5hfeq0m1b26ow24zym4a6tlpen9u1eh1fa4u4dmnqqyhuzi11ujiqhvd1exy9jdj8wbheadxy2vmh',
                        channelName: '9yfafr0kb5gh89n8j95fbql2q5thz52akxehqhurljbmjd3lddln5atctbp7ltqv10grx4vlv1a0bq17t3nhham5qtqac9ad2b4f7hykariqcrvgjv77d8teckd10jhbetxehxvtco4u6q3sy1zhsdzey8na5eep',
                        flowId: '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe',
                        flowParty: '3ztquaza8d9wad7gykki07yk6ldxkgzy4bdoxy26q23tzi2lfhy23kl9xlz23df473kvylqdgk05ax1sluo8ntf6bgmijdbf7jc0kimgq3zvtmdkocx3fzxvwm9pfacip365qk7qgpz9cd0qyuz8xl0epf2jii3g',
                        flowComponent: 'tf1hw91ta1jgk9adtzuuyzyxxgalsble6i5g84bfhtgath7gdk1gbgbwz9nrils1q27rzv5pa4q521ddrdzl2u2otk0doxnry44wua06vf74os68k3smuvt50gwmmmykagpkipos8x1kbwkbbxozltrbm3yka2ko',
                        flowInterfaceName: 'lc4ne05e7vgf4wa4uhotjzrviv7ph0r43eeruiht4buwj8c7gspfwge6b6bxvkmdee59iw7tta9oe5b9xhlkioysh8jcqrja8gwva7pyy8wh0oxq0dvm6usvxvxelhcf3w0m4a1ao5ck2qqgkpcc3pbk7g4v3nog',
                        flowInterfaceNamespace: 'afj01880awd1o5ov97xb18uwkbbcweersrvip5lwpgiujkvm3u9yrf00hhe0al1huue0g3yoq70qt45a9jzodr93xe60aq1r15j904u52r2mskh069t9n8eo7pv8iloqbjvlrbpmxmwh3o1t2nz5j7jf5t8801h3',
                        version: '33ntgpug7mvkhgxbl11j',
                        parameterGroup: 'orz20mg66yiuahazlrxjxy7vtftnthpv934zgertai0t20txegighsegy7ns0y8gngmy60zzhl8nx6z8wtw79923yal93g62i4ce5u125f8iezdpv2c465f3toy7rcxcbusaxomrqnbsxewuo04eofvgjij1l7j1al8n6tnblgdvoc7fm21v52r6p3n2jchjwf61vur8uwhc5k81ftp88qcfd2378vw44wsiazz36qyhighjj67kuf6br3vnw4k',
                        name: 'v1k2ee7si92swwd9rb7gbqu7r7h30dnkljwuqikrdn9rbg2ul9e1ofvgmgjf6ejnp4f6j1lfjqsye3460xco23qzravqlcxhey974p7kd37v5dfj07pnvv4hb8aqr8xarf4t2qkz2zive77jd47wea4iuefwl2bzktbonnmqq2ugrbmoc7briyq7wn699ea8cbo4aq7owm9llow2g19gx3j85ouh0tvzycv4hjd4xtijfgovcs63px6xzwrrwbwrkqkugxlzww4krocn25si2t202bgqjpzpcdh8vtntyuvbeb30bdanvrectx4s8r0d',
                        parameterName: '9dq8fz7r50ndg7hn0cds3365z10vn57i5ua74lbk15xbdcym6tcibwy9ddiut2a9hpvod150fvbjy7rzbqnxehh0q44hvpzmlb3v7h7f29sv35qa849nbq22xvbn4ztrodbi98mms0sz5ic7vylyjnof1tqasrvtber1kj1pk1095sbvcj7x1aq3ldiksdpgtp9o15fx32d22ql4ttgme1i3lkp0r2xt47ci8glhlxaefjah2weoivl0iw35dtyjv4cbp02nq3bk8eedqz1ryx7g5io4lwki7eezh0xumd0lkfqthazli4d67o9ichfv',
                        parameterValue: 'udwkqp9tjh7mcpdm938r0xp73y87r0n6yvi9djsvmlwrmd9m0lvq4glks2td5mdxp5jm4b22zgm5zqoor6myuo8e1op9ifl8ifxe5849acx6tcfxykdlta5zs7nkqo7totpb0pobjancuepq8otaxqc3tzxlagk0qc7bpiryaie8f1f5ih5itmjm00jaki1luw277dthootaycctpy249v2jdzlm4yq5enkz8rtf4agjh9j1j4iduouw65u3iatt22956dwcoxnzq0c9wh17n44o2xacpd2nm1elddrwhlinfappl7rfh1t9h38bry5hywjqdmd79ie70xbdtlqa5okzpoxxrs464bc43pmxa29vasteuzznpxjb9kcgfl2xqvlfcjvp3pd7g0q89zk4wzlzrb3yk08fwidscejxofhlus3ogh4htknek878x2ku1gs3w2vpdrljpc1m8y7k7k7i2y7a3d68z5qjzfpmg8p4pt9qg9viirxlj3zxphwensge5yy8ioz32roe0toqs025v19q466nkoeh60i9ang03oh4ilkvfffr8j9itmd7uyg1nu3x0aa9mu6nguymafndj1i20anco6bcsdq95l37ajkeykhbid1oa1c0gnr0sjxc6c9xjakw66i6gl833h9nsc73znmiqssehgixny76emibtbx0svnp6i51p0t81j84yfft7tsdiax9blc9j4bnltxzfrtu92wb5psu2mpybm28qltjsradkdg3ux19k3lz24s9rufjsvx35q3uwfbksl979qm35m5u1553haxag3ej70atvlihqj504qpz30y7yxdx916xf58ojvkry2debewqsuec0cj0voligpp2b9vdv5yct8hyf3v49v4xo12cywczhvmk7xfhaw5zyqlj41qdz1l12rx7dl1nk7ol7lmoe6xyfeevwoyqu89n0b76u0iozsbmlq72w4b4vs8p9k6mc5pd2n4381y6zq2cz4fxc9832ksyd0c0sk9b',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('61747cd4-8873-4554-b0cf-2a79ad77f5e9');
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
                    id: '61747cd4-8873-4554-b0cf-2a79ad77f5e9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('61747cd4-8873-4554-b0cf-2a79ad77f5e9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});