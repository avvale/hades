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
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'qic6b6qi9cy4c48qpkppwmq4rdblzqh8ag1jflu1ul69m6405x',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: '6k4j6tdateq0ddenkmrd',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: '6u15ktbomrbsw2zlqrmquxnvn7fhv3gciia8y05jamhyauwmxtrqjvphhzni39b93k98dk331kiupxson5l4q5qqlwenqaqew5t4mgjwg5wulfqykh3pm0szyhjcdepphpft0opeoin5iooqmoj2p46yxqbqim4n',
                channelComponent: '4poqpvbcuet11aw5vz7ogokeowb0l14nu0kuivssjixgnzgxbirr7ejjsdqu2b7l2afkodiaiqlomp74t6fou249clbheczn6dz1ira165iel8kc8lavr05l9poye640o0d8896awenzh9gmsu5q4gmt2z18bovh',
                channelName: '322tci4cqyl29edb1r77d2v1e6psuo0wu3h9dwxbfmyx7a587cjtwc5fac5ct5pawtzwfsh811ltlkq4xui1i19keubqnvvtoszfqidv2pomz7hqcvgkica4pyo3ffpncadrhzw7z9xmbvxhmhte8ghgm6fa1jqd',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'kdb851adr6pt48fmn7mislhtn7gzboez0kv83uqemvkacbevin0ti3cy05y4jrqkjhluxe8udf5ahfmf1hoe69s4b2d1zy6zjy1nsjf5b8siytn8ce0ksz8mjp4rit9g71exqdhfvt4wspvvsob5j12dewswdcce',
                flowComponent: 'pnr075rdu0zek8966etqsxrkreqh6yo2paxwm7z4a1mli32tlnwjs3bc4clwj9fplnd7orcf9hu750opcl13nfbfcacb9800tizizwaplmjgfa8as2hgy2e4et7rdzi0b0dn2la61kilcgi9lfqsk5ktot1upkz8',
                flowInterfaceName: 'ylikow50vh41fpoc71z8et8fp9ktwyfsq3ftrktmf2oing059tkbn3985rn9k86ia89rfnz406iql332oypyorh6mjtokgfzexsvqa0242p6tdrlznqd6v5akynsj2p5s4gw571grwez6habsezvnxb0jpl94cjg',
                flowInterfaceNamespace: 'kkv714rl3j8abircbhnsrwcg8sd20e0ck7ud9qp98eyo6zq27grs5vbc5tz1j9xmp8jueikkjgqt6j38d5mfsusdu58j6oxm5cmm4nnpzdi0uf1nq9xsow5w79vn5kgqo4cyzdcysjg2scti4egxe47n2h3q2377',
                version: 'd9phcvmptblt39n0tn9f',
                parameterGroup: 'j9z0yy4mz5073kcjt2y4jotx7bbp4nnsll4z6xlf5pq2z8w9hr7xvt65rzolzq4j4hym79h0u4daq8643z3j6pef29jnxnmbmqvnqwjvwx15l0hdg9a79hrhhjks208j7lcfrau7d6uazgx8mzgfyw6ki1qxt1jf2e7ceq0l627niu18nn76tgvi86bvc6vv12rqtmhiwtsdqwewmlswwmgqe08l8qykgo7pn47ybc85z4rid3q8mw6yymgqqgt',
                name: 'b7cuc1ampgtqmezvjyrvx8a1ssd0r8pa82lyg31fmkstj4w3ldkwxil2drtcl21xb59sjl3ecqqh6ow3saslzj2alr834if32zzeug3uv6fltfim28dfh782zl9s23yr3iubdvb6mcvovzym62l7mtkcp65u7m213rlrhrie7ivxsj0btawkahfg6t42u75267xg86pbn6hcz8xaear81xjuwc3un7qi24hwvxag86mfmwtmaujh08q5mgv27x31g5yykmzqg9bufzdwfydtw1ijlizgst8tq22cb66ewqxjj3m80kd7ubcr5u8ccpwq',
                parameterName: 'kscjxn9z8lyw38zn5rulvtyb0clcl3ldjvqlzdoel4tr2fo07hvmgqi15oq1bsuv8za88uw3evnsggc8ybksrf1na8bp6mpx1r1h0z31c496j6qjarxgtxlorgttox03knr0peknbbd3d027v47418ix4tx49vqrzazfdibs7omztnn3hhcokv6lqq5u4aim9v8rvlmoi1amt89bwohn7ryrcytcfp6od96c9vro8lnyluc1v734zf1k8p5eya1wuboyptiwkaqyjwb75wqwak8ph0xnsy1dhfqa7k3hu9hlx90etr75vuxd5at8t5bn',
                parameterValue: 'goia96wi5mvvo2smlzu3hwxjcffi2vay4v8c1prklw696pzr9jpf0ughazx7cov39qluvfvsz8t9dm3upvnn1uqk7xnarumwuedxiwci3nhgj23eu1yrlsw5jfrzxdlc7byi0g08dw1t4xt0bmtttt7jsmlyh2aoba8qjbqurvqkwbjalg7dajmqgyas1npyxaeoi2k67m0aeww4phvmvr1wpp5jffivewg2wqtcdtblinh3b5cm8xy9b8boetguk80ih5e91dx93bt4ia7c16svfu28kis195zvs1z16iixwp2qwfgozkxcec0ta1ul2e41xy7dca37z00i1cu95mp6nuqgv9wkg3sr5lnd290ae94vhkogvlognwekakikcb2i00pwnhyhl6k8kwhfzih672re9up2p801u1mx6ovysif8lg7yr01t5d4o6vqvd1u2y5nslxsaulghd4ek3781vpaobw5otrlecdfbn2p4g80v08fetjre4c3zo270px7vvlrgkuas2p9xb40zhnna1nfli4vh0zx2sz0fsqq2lafygr75m28kgwhphtmnyyei5b3kyu4p79kps4pominfgpmye6ywlu01b8m4xtedvaw1iszwbdx9j3i22sy2xjhs22e92qtbzyt2csbaixjc2rh37z9kw4gp9erd4i3k3iqqi49coc3bwwrbim1fmh0wlz6ds6v8ktyd76jvlvgs1d757q934p9a3fwcmjpk52xwywpwlbvbrmwr7um8e5ky5yzpkzbfgssnb1g52f4od731imugn8b3dwp2pctt4zuy45jssoznr5wamhvkjttgpag06wfo9wqktj29oumfb2xkbicozfeaxqk6kemfyjpyl4avfp5h1r7775dacszo0ul1njb3y5sj5rkub78z3p2r5fa5llxtcc4sdcccxsi0n55qhnm8zjgk6z3digoumh2950gidehk4zbewqdh0azwde58l1pnr9vsyqt6k0dzsjlhvkpepbo06oqb',
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
                
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'bxou6xgr5ahl97bom61ptmtj3mocpwdx2u7jfza3lbi0qw3f5g',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'hw4smfa4hopp0dem4rrc',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: '6bbs1tbngsalwy6k9l19evauzs4qnxuf8trheszchbxem2rj8r7upn22cn44i37faalnujvwarxwhyzlvu8rh6le7mg20qc3ym3h0vxqep6zotwcm5vb1lk1r3z5lwj3jl3kyhi9fbglyynjyhe93z8cg8pwy059',
                channelComponent: '4w9p6qcu1ovhefd6nz7txpp4y69fom2jlr65f58d82qds7plpc6yyzvg0f8bfqj1tl0kqzjcfibz5146yfku2dnhxlr9q7w8jer8djc8krg6e1y4lkbqcf53hm3n2wcuk3czmaq9qnp1ukjyj2zpuimndhytykdu',
                channelName: '00qap87hnrxlpzdf3hw9a075e9wxelagmruqyuw21b2xoml8nwfoypi3of9fns53ek2b667nh371p4xbqv6y9xsrro36jzob58z2mnbwiqsudwxgl06dex7xgtv1r1x3vkiq3q1nzjlzijfohwvq8s91iu21zjca',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'xz0xnzmwoad5s43nkpmjsgukicfw205a3thlqhq777kk8i8l9kb23z0lxczw2zjeo2uw8pqaqbtqdbzqfrqbypof011rf19jt9m7uswfszbqe4uh6qddwd2m3jf649texa5axnwf1rgipzndbhe2e9xewhfwx83n',
                flowComponent: 'u20b6sv3xly6iwgcvbpznzz8aiqfb39x4xmz0k4481xntodcdm32smol28iep09gj6e6f7x2u4y8j777dqr5sh8gyh6fackz355hnlnb2mmj3co3hb5o2uujtipgo0290er0fn89b96fnleph0dseym7ce26vrgr',
                flowInterfaceName: 'x9uklln7a1pwpu5ltty4tx6rykybl34tekpoh8mwdrejl06hh5qzx4fip30e5o571gjegd9cndgskce5muut0omj414quj4njalvfnpp0yow2pflduhcvfaoqc4zjjcc1oex6r9kdjtg7rzer01365kh9ygcpq4t',
                flowInterfaceNamespace: 'na83uqsc8ydl1vtxsfvjhsupc1v85vcgcsoabbk9k5upr8yjbo07oyv55n3ni9gvuei5i6yg3pm6nsegausma1slkfsue1yhvfa7tcu11dbrjunwmwslz0kk8ucjitxdd43l27u0jsq4qzpdxfa7c0btky4eh3k7',
                version: 'a67vbr546n9g5i5a6h8s',
                parameterGroup: '0usbbx3fb8j7abj1o83e59zgeqnf3a64vxjk08d8as732wbd0abpc9efbn7h1t1lr7bkqfiz2i9n7jl6m5sqfel422l74r5y8nlb9ydfealatkbs29net5y4mxn9wwemib0lzx7okt5dqfrx0ar887jfvu1t8tcpe1l5s06knf2d4iwimfs280u2u28o63q7n25xa2u9xn8jquyurufw4l5he4art8p0c84ntx1wl0sgv53la3bnk4df0m19yxc',
                name: 'yj1y4x83opfohk2c6lrqxjx2zz7wvp0is8vntb3lpltf2i76ca53it0ow4z4ai574effhaplkd053e3llmb1a7yzyy711gc1newic2a87v4ba8vfzr6str05ydnnje2ljo3owxlhksdj3wcz75jv9eou948yk0r0qmdywkdprnvmtftfieh7kxisjpuowpwhtzkt5umto13d0jj8pu3t9bnwsch25ju865vclc15gzn372kttf84izkvhgqdtacrsb2137uehrk6an7mw16lrt5x3jtblq6xop1kulpwq2tvvwq64rexgexuh74nepum',
                parameterName: '7nuxmtxy9defhfg7w8a1btzvdftjog5f9ke7rdg9qondzqog5ake2au0n2ve8hculfedife0fvof3is15vyj9ya5c31kijiqt7jefsq7fx1fi5n3stnzgm2uylfm13ynxyf2bu7eh8ymw7z994umo5fxagug0kcph57164yeiu1wk1m94jpn9oqilgf62tuty88uxap1k5caehx3l8g5glk9zywqf4kg8rksbl0f4p5a9ttigsyva1o9wql7dii4a5lkv4zv9aoq427kcxn42htx1l65w968tdu4s2vthclxqh24su9cep7izbay9moe',
                parameterValue: 'zmhp18w23zubr79uqjqaqd7blv4oleu47lv9do0xf5v0qee5vasoo0fk1ifvoa33sd5jmh1ag8db1bj7k22lvrzn8qxf5miv78j9m6n1vodwp319df4okasvt6yfoe8b40e8armp17wbidiax4ry9cvyqv3yd2ueedf1n9wnyg1tp6vjn88dd61q6ic2gqunsqnjd5dlhikotj42sn6bypwv2l06teh0v2bkv2kfmnon7zh5g6fxtvvh7pzc1m9o1q0zfgzczozyej9xk69yejhedjwosx4m406i353zi0zkccsbrsyj0826wk9j3ylxrkmkkbz389q35x8nsg4uktsvxgeam4dpadsz8ak83wsa3suyx2eywe4xq7tw71onukcn3o8r9eqlo3mswpsz5mr8gpgamyx76qnc7jeozmaxd4iklgvjw5c28wsvkbw5mu7ik80j7b6msrgnnh724064g8p4382dlsi8tusk8f7hk81ziz5jr6jrmtvn2rl3zcyr4hzaiar55ctrg8h1g0cu0u0pvv0oxksn7pb8nsobjplk42nwi4vhmccw7zyrjrcheuj7o4pzxpx6m9tw696bz6jsbiv5wlf0om5lgkqvo6ososfs03nf359n4l83pwc0hbl0j3ok9td9hh9y5z0blo52tbk2k54o8su1gvcmdbf3s2uun4726voozqxade258pl5b7pvb0xaffukltjopwo0d476rc8398l51aly832uhxnsjxjrv6d9glz83nl3r2s9s3hv6ji0vfuxqtcfryq6ulsc6pan135axeoxyua4odv2h24tw88a1z8dm45m99uk6eog3t9dxsl0cz7lm5djfa2f3c0ozyn7cluilmlooqks6h8k0mlzoqvo2nfiheh245tmfup1fpref3u1z2wi5heknrvil4r0tyelf8ps28bks84u4d1a7yu6maoejap5nc3fl71gqdp69jqmxsokgvzevkn0r8h0w8rh7xg3ehufrskxzs3mbu75',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: null,
                tenantCode: 'tfgvnlinkuwpw1qen7z17da3uil9vml0rhfp914q9ilwff7yky',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'g2yz0h3tgqvyfgle1b1b',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'yvznoqj7sloz01ocqwbgry034dggcq9q4kquuhnuz0821v4o2kccyyb9tstlddwk3n8ucq7qbtgjxf5to884zgje5r95jc8n42n53zn44vayn3yrgl5a87hcpmig3epa8c82zsi8t7zj78r82hysau1ax99m5sg5',
                channelComponent: 'b1s7cdan7f1f9ncqy18unrbtfu45a7bxd28a1zw55j5knqz2cafsdfof3841wsubnm3jh07h2dft7oytsodgcutcyxcvhxvl36ql2mw5cpzne8fehuir5schx53uw2c2gqst3ffgjr8i60ja829oik5azqgyjcnh',
                channelName: '5rcrzjvfzei3z054tqj2uv09pzrctkcvbyu5cto53vz0rjf1x1pvekmf8g1mfo7igdjx3ij7lryvle9n5lmabxezfns4x2vdlo65x92qii21tuebadxhx8u6xx40gsrkejiyjb6cmskwfwi8ug3yectpk3ir7r0v',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'kerez4qwphwzsgninsl2rbt5sg9acpyzfu5tka7ajnoqiw3oxl95l1dncdr16qzlih73fux2xklx7xa010zpshp5muwg4wrcsgphgqoqugfczqnosxitntycnm5f8pseixsv9dwyklok81531kxfpeqbanqujxjy',
                flowComponent: 'z17o60db5pwu1vr5yq338ruqjuxp6l5ngej8trw06a0nc5vqcfypgmzw7l7mvc5o0sk503qxrtfh597tuv922znhf640autfj83uo8dn0zvp40iw38n37x59bjc9raho10t7zdsr1vlinm4hzuxai2ya8ckzy56e',
                flowInterfaceName: 'drpyi76yznzupvv32glbfa0tbdup33bsjwm746fpmhdf2kreu8lbsypaoytx0ler7m6w5wzlneuuudpdmpfpejbm5c93c38gq9gu3hdtm8wisou5b8e1hcd3z96z8m5spt7dkx7n96qunr14rl7wu5huu2b02iu3',
                flowInterfaceNamespace: '4krrisysvfcaujrmvh1h8janj9pnb4qrr69qic0cjv3bkgi2tij2ay17pbpp8fc7qwxhvpunrn7avpg9ywlzu4te1eujq7jlli9o1q1qzt8259b0figt254usmv7jbow7p1qcubwva6yrin381ut6dil1bfq6l7c',
                version: 'on67528fud3bqxj6wh3j',
                parameterGroup: '55q83plj3ruu38qxduj8vno8x8ob9mksddwjivkc30hc101z9fcfvtqfqzp1qptq28m9tza1ktrd220nseebrumzli37tt4cyjsqaokmu78o8bxpv7r1r7njt41zk0yjutjzftwste17jxrc5tudcjgq9z94chc4vczzsmsykx02dmz8qlux5jvqdk5t8hp0yoyvlju9m6ikdvghempnnzr6587r7p0bpq902i3h8rikfo22bl2lupjozy9bj02',
                name: 'ag07gck4ldr825qtus0m28i76fuzbuz5cs7ya169yeemr1dgkm6h96ce04lottcgdwwwdsnoesbdf9g6vgg2abtujfjbaul7swm5ihjc0yjax2nkmhm295ayoe0qvqiay9e6fj5r11g2g40v75e5ts0qqf9mj8sieiauv4h2fupodkg8peu82qujlwlyiye4m98cwpzg8z9ldcmbhstvl491zxjau4abjv03fd53l2144uksgr7kcmwwavlcga2yyhvjkj87n6ai3ovmeyce9hmdxl6xmcv2aijjpvhazfqpmzm4chw9kw4j2o6td3lr',
                parameterName: 'zpxrpxcoaodmz96vgo64wmydmkh431f2cy0otuy4dk3npv1xa9c1za8qm4q944umnm2t9fcsob5epi56s6woeznpq0ejop67lf80vi64b22r2z2gku10gs1hpasxy1cjg48jl772r6ktnkmz1mzgd8mofw8k2kvohqqmfqllwmifow4lub1wjiwi1w6vnhs32666684w8aq2vn8keef9deorweh72ua1lzdvon2hr5jae8earnqallomxrj23mjfz6rlufkgwfjvozm24ox55rh5aqxkkq8fdecyya7q138rr1memfgjnru28o6hdt4h',
                parameterValue: '2yz36ybnuhe0o6grhwbc59pjjccwh6jjk7ip8z7hortkohkck23mvrkkl603du45fczj7bvly5e7tognv58smaeebc8aqpsyarciyixfwm5eb9nwh3filaufals49v3jl8ix26acs5zzt02mhgu4vgdrmmwno5pdly247gvemze1qs32dvixseqx1lp94w6byd1t51d9syj6icpglutmo5u7v6sdt2hk5q1nzxsclum3h9n7x0puz4cs2t96hsq404jtfdxwtxsqbe659jj21cq3fxt2wnru8dyv9pb7hp0ek1j1ho4zf16cj2bxux3dpo7bdtqtf9hfjtq4w1hxjlw3utyqczg8fqyklst5tlvrmcobffaaxjncvrvuszqi7oick60r0457aijrdfvad6uzspxx572kde9z2ipu12kb2i10j5frwtvy3hfqvsvlq6ql1xwj1ycxomip4q56d90q09id3cd1emx5nggnaptoopvhtnxozny5ztd84o95njat50cw2yjv0q33jt10q15anwc5e4c9kv7ckbhwfnf0jev8qsdoevnfw6ac9jtssz1xnkw5upnevokmxqah2x53emsn6x3fzwzzc7a0whthede4gvrplpp7e3em8uyph930aa9l3vre5dhzfnp0wz2yo52m88163e2d8r6puvvhoxd428rl31tc1iffl650lxc5m5ttgnveuptsmrfxsrg3nq4m668wthua1c7zcgf1td7jdu1yzaxd0dvnq4cw5o8pknnqyrmzlipay155nqf3l4vji6xbaixk2vk2sq3x7m1jek8kqd1iadq9fhze2dz5fq801xwbk53z4obl5a2dal90mj3og11udqrgx9gvcukej0s9gwlvt5kwzuluwurcc0b1q5bv1vxq58unhm8e7qk2sqb97amantm49h91lgttyqjjofjhx04x6kwydvdevkhuf366u0357bhicx1xaytqfvd0i14zjh0su0pjoglu00s026rhgfe429ku',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                
                tenantCode: 'vm4jttyckyl54e34oecs6zo38eaolag3q3lof13tywuefwqwqh',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'vof7m9tdh44djiz8httw',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'j7x29kcqaxirhacl3e9fuvbb54w2p06aql17d8gailznuxb051hkqzr5tozma6f8vluhnxeczc12hdwiwj8i4sgjeuc5cuiewfze18sjnam8evwf92xqglekkcousq1cs55hkseeo8wuzvwi8rb3wy8jixdnyhtz',
                channelComponent: 'l8xzldbxli34dla83qbvuwr8udy3xvy5tecgxmvb9x15nn2qsy6hvcgr9345dubko580p0aon8n1zvnob4juv4dktantf8ane79os79abatc04x527c0odj384p5uvnjacoqllan3bqnansl7tq8cn9z2kj7jrin',
                channelName: 'hdcokistxz0hlo4hwsjx7q9xeiunkeaskgvs5zmse67yx4fng883k9w0a6daksiwrq425upqc6tm62bmb3ktfuhys0krfgs5h8lymuyclcom73ruq8dz4m7n92oi65yzbu69opzyo0mg6v9rkglb4dj0cbcpw0sz',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 's2n4ikr3tqwttliiw5ykyrbsiht5tfd3xpj78b4fz19q4ebscg0jborq07q23tjumvgns7kdbpea15bs00jvmhp8yw0yntjyvn3259spjviuk9a36ir9jciplx7zyelq7k16knpr0ftfqpy6otm94n5vrkbjkkcc',
                flowComponent: 'fkskt2dzgcr0wkg7j3s1a12prwog14upyxpr0g0o9bi3lo3r6rchkb8xq5ckek15k7mvrfze2kz5sdvmhwxbuy1ig6dib6b19rr6u7qwg8khvb1rlqv05d2rwlk9zp0aryhnmhke9lsoag8r8xfol41dvlx5hif9',
                flowInterfaceName: '1uib9keeliqx0v1mpnqve0w6x84um4x8m1ia7n1sbahxgc1ndatjr2eacvjjl9iaueu3bajfdykntzgw9oubvbhyl1hudk5o4nyuy3wljfgdusjakqel0ehfaxj5lgcsr86dkac67dxl1jpicnfl1vznji8ylmrh',
                flowInterfaceNamespace: 'numskxejzlsrafbz9ascp3itc0iocwdawa95ammv3p9soy2htkbnxg2rsa104fzqd9k3yfne3lez626hoahv6ld088es4evahdog6i87ob8mgx6pwf84l20k8mkih2d4djk012bbvi1od6nfcvc73cnayahxdsqi',
                version: '0uth0a9dwghbkn1ul4b2',
                parameterGroup: 'gaxy6slpv4sv3fjrs2lpbopmfxsi1wjl1o0m4vv8l71hq8th15cyw7prpeu8bbjw9ndg7sqkw5tm3q9iam55om74t2yr16gk85ljer34adn8rtp2vcxufekdl97vzdon3blt4yrt6r33u3l11huklpbg572lw5xdpk0xylifg42h7rwfmq27f7txazkieexag53dhvwh9suw12pitu03gpofv7ogf65fkkrgiq3hvg37hxfr2ramzslqu7m9uox',
                name: 'ylcennahw0r17c3rhb3kpqc67yh0o42tx59doc3ejqxlefofklhvd4zhalymsg1vbcxwhr9xx992xxvlz7xh7clmeilygt5woi9vfhsjm3pz21klyecbas31rbqwlcnylor520qpuifj7srl09v09jhncarwctmhbl1ys44ab07iryh9taxgr7nxzz3knhoc9vffg3e8vqfdfq7xgg2ppd1jc8xtw8sijoiesjsg0gind17gl2tp0pks7wbzkc354mfu8kyu1pgjx9ihydxxurt3b9wjuijapuwhfyr65xg1f5ypzz5l9kzb99y5o42q',
                parameterName: 'x35nn7tgmdhho4ig7op63junqrfq1tdjnpj1q4ft8wgf2yagj7k69lydvpqvkg1p2s5pyyc6knybx07p2br3szcb78i32n8b7zj9zgj5n5mw5166peqqvbuu3t6agf8y32zsaek4za648aet75v8rk81xlbm12saxz5almtjcb75qb64germ3rrmgfm8gjye748gttuab0mghvu5b9nopsr7qgwijtbkipql8fa797o4k9zykv3jcomoq1th6vggrhhkmsczrhpdhh8d0tt2gf2wxgsmueflsla1z2f8lwafotdxfhndbwzanfkqai33',
                parameterValue: 'limcsc6yjsrc5xhhtb5tgrge31yckbia1oao39lzlyfob0oatd5bfyjpccsatf4dhtwfhyef7inyr416qu1b8fmplgs03dotnv3r2urrpo26i3hnr63al2qyqjbo913psviezltsdpuzqfbfc79q96003aw7nb3e0c2kfyrjvixturyb3xc3gkfo62krvsm5ukhtywat1sr8gadomnpj3qzputfrhf04138k935fv2zdf3xuf30jytv21jecki9evlg6thp2y5w213dau8hlz1ruupm2zf19q2iiyvry8y8k26mg76rdvwrlqlmn4qbsohtpydcmkjbxje467br10ocd628wlsk6ch85h5blymi2ia0ag15iknznd8bmckq6m6wefj3q4yh6r4omgq7bzifjodx5bkkpr4zj7ks72o5cxc0ppxgg8644z4o0enxctx44tt1f1pemnapxk86tw6bhk57pnbn7zt2l01mnydi6kcx85piefd2im4tzj5q5kwdh8upkuzooma97dqk7p8pc3xetecbkr4p6ticm3s44iupfl7ycnkqhaqqo161myop5fd5kr9yv144o2bzu9u25hlf5ebqm5hfm9ze69axxtkxtd6myj2rx2pyjq34mdorhc2gphb7wh6jw74klzcxouxnkuedvs9f71n5fbhdfv171acos7xup9kp74wqrozwxcms641hcep0ltwrp4i1q1j6mf5kmwuyi1k2cl5uttmuntp3ip5muj28h60wjp7gqabuvaitjfqbon36phdamatq3z0fik4rzhudzcnnd5o5so5yswj7crp0ep03s6rk4z6k1f4hy1d3d76oysa3l1i7daprc7b0h3ce96zir27balwhl4y9mz5e79ainomedmcal620ewapde2za5jfdfdt6f5q74w2ovz1cabp7y0efjg8nscxlle1wpmcc5is8w2pima6cdsrdtiqm6peuih37t8pd48c1qcrf9pgjqwa2jfpin6gyqxogqwy5',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: null,
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: '4h5pplz2josgkygm1v6u',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'oxfa2zhkjgv2o1ruivwv8ncug1s15iobvmwo5cm4rpmyo3ysw3a8fr7d7j5c1zw45dkedi7jpkiro3fupi92pxtq3bp7bredmc7eqsibjuaap7vd9q6hbkaw3c3b1h2fom777jjnxhlub0j5cz2qrx7d8zyhxxvz',
                channelComponent: '3cortd82i8s26inp1i6q9v0zd5tire34pt6dtq2l8uipt7cjnnbz4lz3c6v22wfinh437canaz869ubx2edelwyr6kfe0rs3iajqh3c5srt30gyf0iw86yqt444qhfmmbilcmro1howtiac7si1jougj1i3brcs9',
                channelName: 'mahd6krgo6zfb5a0t6jedajp6lhbjux11zftjjw2pi1a4kqn5zrqga6tpw01z16fskbvwvmdmdbraooezr36i7i4wllc9wuvva59bdb6ornq5wbten3z7nnyc9teoarz5e8alw6pfzeocgzpfuoivgjjk0soa86b',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'o3fy2wmt364lzgkeocnntq1fo27vouh5rz5efpfjm75v7y9teijseb043s4r9m25k1t3f376mjpat4prfgi23jglnmgp9bc2yk4afq7vx1rum59ne7z3mppkgj8ifvsk515u5h2xvhoniesem50v3qkr8o0rmou2',
                flowComponent: 'tri0yh6eh3crng2zhia5w2bmjp0ap7atc3rd87fsc2g9yuv1luu7ciqrey915dr48grj8cxy5wuvpent6pr1dcp42h9ec6edzh9x08syloxibl3iyuoq6lbfyr62mm4dkrx3aiin4cw05j8e0h9bgoy8oq2yrgz8',
                flowInterfaceName: 'md52sma8xnjlb35oom9hmgl39d4ttimq5fez3jmyzks7jsksqcyqdk14b0bw98vurkved2o4vbzfff5zid7h1gml6akgvqr9t0xi73156b9o2pv9ixc309af7rzqg7r072y0jn5trm5jf6i3vx2t8oj13c6l1lds',
                flowInterfaceNamespace: '82rz9xyr9za8to3ek32hlzq9q9wsh5lei1d6j7k294ke8y37jrlajix27kadjq01gue7ykxzdicdw2snla42opsrvztceg8o6kzhnunyq3w3ywn8fonpi83ifaw4yff7q3jf9kun2qtkmc1hxshgvx6c5vm5yvtz',
                version: 'q5ewpvtp7ggwu8sn8p6o',
                parameterGroup: '8ctvk3jzvs9tzwk61z3yi4o1bovdstykqikcos1xv8apm4yl0e2g71mpn5wztlm2yigiq68g3p97t90o8ufbu7n9dgd4zq3idii2vsbwpuu2ktw9sbjymjz0d6a2zew0ic1waszlef1roo7bgzp2ykizxstcg15edvzh4120wmppoljhi4lemmzwu6t1n7fes2qrvm3v9iam7pg40180tyakhc22rhf0bhl2r61zkscz19zq0mme3njf5lrc84t',
                name: 'vbq3s7youlb3np6dzswngvfzn6ae2ssybuqmg8zayuuapauo1rae4oiqb9atbfga6k0i0hytsgoa80px1zs3yz3k0y6duu9phgu64t2156gr6a3yvqd76146cq0gkw3934u0l7j68aucgk5mchdwesuw4lxkfguto7si85yrwe4vlsyg57jzl8fs2f53sr2z78j4zio73b8usobybwpa5nwitbmu8x2lkcl0uabx3sapeu373cnmx94qwogpgp0nda94k6cwt7jw94k8jwptw4fhlkdhg8g4eixlql4cm8w5vm5q3cna83071rk6uzrj',
                parameterName: 'u6njepxsf38rkh0z7m3u5q8fw9al51z4bbq9fc459rqgjm5ogqebnz6s6edbddzs983hjzbucp60urufe3h05qnh42qwhguq5ik46rhwliw3v8ruevrdommlwnx1cww4ff0d7hndqlviwf1zwg071f39skvs11v0g9qvs61hp1fnpml073sffa6nhyynunj6m0zr3swua5iiuoytvfg0e9ynwnqlhr19aptfa5bn5x1kj0mvetb2ozcejcgmzszk479jjw5fdpsol9z3xorlj7doxsxxkew0p8ci2at087sh4gtmq01dqwtpx3c14n5w',
                parameterValue: 'nk7gq5rufapa6vbasti0dxtwfvop7rk3p7avg12pr40b85qjwovv2m82zkok1y8sy4xwyeniz03a3yvl357j1cnkerm8l3zrltu0jz4d13d2kiaws3oazcopuqru013a0duupvdsqv08w5xe070eq0skbor5ywjt1iwz70h40udi8zfv6fpm2407marccg9tqot2sbpd98z3ofxgjec9qg1r4j8gmfd8vymnc80ckahdij65qoad09iaxqmm96ia4znlep6fqku2z5vizy95vbzsyw2v1inxyyyqsrw8khmstbpo6urc4zn9pkvq3z13h52hw3k0mdlt3ja68zo6wsrihwjrsw5dlkhrrkvhfc60p5f7rlbwshejncyp5z0zqlq8rsuedjnog2gfikjanhqvfe0zua9oqdbspljy1jyn55lcdjt6txbpipgrvj5qsab82j7zh9rbnoagggqh6fde67s00fejzyq5orimedr57n71jxmy2mhsn31g5f9v1riiadskqhlj1ilpmm21cf3hbmmh2to9heooqaw7xm29lq6ukj6lhh31fxcv36nep6veuv4vw8umm7wymm3erad645vmv81igvlj6qx1b0vx9ckm7e40bbum8k8mwbktdcxd8or0uzxyxuc60epp0suwpp3rgm9un0qg072ehwjnn8y3ipj9kx5s68mhj82mhicq6ycuwheii37sq2u34l0s05ois6opi4be4t27es2kf4q17877bxrrah2z0qnq7zr3w6crlk8lq1rgey8ezklt7p5298zewp54n86leu5o76l59ejw2b5a3fdoatmgsbxuxjrm0rrxsigmnnqbwb2hmuhs23vb4qmoh3sgyupaqch6xnplfixexf0mbw67wf9hffdjqmob9wjqx1l7bxa8fyw1i9ucnce5ij6r7l7poq103lufivz2re9rudovq4arfzcz87f8l8pepuboza7l9y986ecq5wq3c9sp4s3c4lpk63j0m93bhlq12pip',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'e0evz1h9208w8qgzk8ti',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'bo1qqvmc9w72p8j7g9627yp70w7yzaosb901hbv9ehz727a2ifestcbyq1f1l8gx5xt0ap9maczip64jmtoroloizpbxe672xrj19s3klhj6yafsfltdg9jpk6timhlj7e2ths7s7l9akay8xc9b75rge7mjc68g',
                channelComponent: 'qwggdq0gxnf1o74wei4rmrhzb0o7ki42rm533ew9sgv0v5ebewjdjsbmf4t2w1u0wsqw2l1yfh17rcqp5orydm22wzpmj2savchfzf5x5gfj2xdddptcufmdc9calhohd89aj2yyv9neiax2erj59a56ai8ygtcz',
                channelName: 'nhbdc26k9x0ig78vuc9koimun2kev2g6ewv26ymqdh0evxpusxi5qsp9szuntabuwn9haeope4kobvd47twzujww8alchq6wl5cgawhpkbtkb2po4sg7o7gm31c9dy6lu386w0u8qjbi5p9wb5dls5rjd647rid5',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'c53o8u9qbrwgxa4ap0qtc1bbwxy6fk2sc4sjssgi0f6ztxk3l0mtkkkh179b3em8nxxo5mh5873my6gl5shhjq1pg7ge109sm7bahgdz8ypejvufgf8zpiyfiqbm17t0z7u5jbyajcxfm3uvehh4ly2b32ko3mlg',
                flowComponent: '18o7fv6rqi9c8vc1kt2yqj0m135iqcj97jjtqbw2ww913il143f3sxmrudp3qxk9qd7j58wkixu9n4n164l7odkls9mllfby4u1uiyiledxammt4ugdeslefmoh48g1o9n6wjzy4c6neyj3tjrzvtbm1myog2pr1',
                flowInterfaceName: 'h5qck5y9vljdxhpqeymnfmqvour7dor4j3gauq9eqoyc123b4sv46kgbej5hhzyx73o1lkeqod63zkozewffjkzt02k2a0nfkw3d8qop3qcdkrqg54tfwsbdv0dv2rdwfj5opx6k0dc16y9sn64ujx5m1rfl312r',
                flowInterfaceNamespace: 'zzw7q59q72cxvx00wdqd3gct53l722ns6267sbwr3tos77qhalo0knbe3u7aooy3fvzgkizxflqp8tx8u5lddrpvyzpjew25sdmiu1yk5b16wjha2fn9oxs2c4foanx2ppgcrw74bmj0zfu9gjjiog1mij6hbdgy',
                version: 'nefa21gak2ap70in801d',
                parameterGroup: 'a4g4hi3u1stll6wcba72hf3gu6wjredhk9756z4hbljfc406uivaoy6uraoetheprb8wupntwc2pdaa7038lhldodj9j9ovkoautg0s1bw5lt4xu4mal2f9pshiffm7dw163fy98xnfyj5nma4c730sj1kpr837vk84s96jee0q2xgctgbj191kwwzgrjyy09qkr89ksgrz8efz1kofscism68p9lmzpvuhz9pc3vabovsj3ylk16kcr4a1fe1a',
                name: 'gqkv80pr46ur7eiz7mu85cbizm2m6egmgq84ullrvn1huyjz4gkh73wovsb405xz805x3qw2alp08a2m16e3kkx9hnbvqrs1rkyfcttv7h8oinxvl90dgotj2tmust3snecg9591ogqxghnnshkl42rno4jkjklmzs90w2tx734vfd9wo4vp2fcxxv78txtjjrynefkun5nqlwdyabczhhwkbz352vf3xujs10140q42ypjlf6mkmyhltn18bwmvi7rtl8gwymlfgce5v83c2okh675cmnuv78qzzwavy25wl5p0jye3ejjlvlgzpbwt',
                parameterName: '7f7q7q80dq520bsry47c6wjlxd8ko61adxjy38297dvw62g43wrrh9uvvxc7kxdzppmg2c2nr8eye8bsqj7k19cgad7zmem3jvfpk4pz9tzybu9ny484vglevphmnhbi0nc7xcdgvf13g16pg607qf52tr04hqgfvy8jrpcphv4u2s2ez4v5r44njom4jf8gta1r4g62ndube6qn38e97nv3z4dz6he4cc3o7s0nqj7rk7tm8gq8hepmq7efmsfdpcyz7rym3psg0uogr58hbwwo20mdx3nd457l4r54szihbfzrimr83p7a497dn5pw',
                parameterValue: '2umy58mx8tgrbwwglw2gsykavkhrg5kscniu68ose46fhhh09xptgzvsy4ofcfebdky13k95kyzvhe47zfltptil8kdyp5q7kb94vc65oh90l6pie2lwzrasj1jayl6l9pnvw860jkbzpm6gwkg8juqofflyiis0t5un7yrpg3b757el1y6m9e0j5njn88oaucseccuztpef2vohz2s86k4alwpil74h7ri0myagtgqisfn810mo6nebauwaojuovt3zc3ims4ciwrpisx5km7h7t8bvsatatp447xs3ijyoyg7jy5kcs1ktz3fbuzjkmfc46l8dsz6k5t6bbjtmhdfwg4ov71qbn6d034mrigim8k4reszuoszzhhclvwjkvva57oso88up0cck7xjw2wyydmhizyfp7apczikpj7554hig1nt6440n4sr1a1wrrytd7kasbkrvmle2wqm1q7chiipm890rblzc54bf380af01augg8t33m1dnew8dfgsl7galzm4etmwmlnb76ahcbu0b7ij5ux21yj450qxe5xyp3ruh1joo36e1bquwetjfge8ux1u6jea0ddcbg0ryl2czlhgh9zs659cvod7mwcc63w4m26ofe7c3ff0p5hf93qzdbjt2sm16mfkrwfi6v6v15r9nqjwupnp5t3utk1sf6m7kuis3nazxtxw6lw3z5fwob04aml3bzqyl050qynnl71hyx8qys4axlz99zn0yesobiz3vi8m4zawunuvbl1kxaknuc4w7sms9wgggz4tbauxwza6hc2eo67d8on8fheq49dmr5i5jomcleaaireltwity3akvq2e8qboi0cet0rok110l0cyc0pvqyqhgi41c3p0n810wpfnbrhv3rmc013dr8d5sol9s3b3dscr0g4sua28y6rgxfpx8yxp4hya4gf28nbu8z5dums0xo8o89nexeetl0phb7rmm9sgtxwdvubnh2djqzs1kw4y9ynicnrcx9kmqhgome',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'k529wwqweaw6vqj8y05qsxnt60ov2xa8cyu2zytwy7gn7dp6qo',
                systemId: null,
                systemName: '0r3wgzni9bhsva6hvpce',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'mn2rucs7ok3e0zx9uty3iaino2hj7y1ngc7ivou4sa4iip5ykdquhibtslktcgx531c4wed8vfxrsdvvpz7s4gbzh52dp6656iwz2hzmwaqhyaw7wpbyjv4i15lpnii8vwejvll2z5jdqrbf6b9sgni2zselhryq',
                channelComponent: '2k6khd825a7q1d8hec9ffx3mvjbnamdqgm2k6uf5efke8ta8zgt4jxv7hgra87tp38e6vvpy57ee6gpbfoj478jsjpuyf2g7ovsf1xbegk03db3g8eiygb3pw3jekf4tr6vrtk4itc2faos7jy4uwdd1gtne76pe',
                channelName: '794wamhv1ydh3ekyrzd39d6lln3h8zvuu2vsa9kpv45bgwl1j0cpiro5lw1578nzpa988srydypsu7out6qrnol4dz3v0qocl00oyt82yu79krq76sg3vhbw4ektnphtv269f54d0ygkpqqbfcnnu6fb26avpowd',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'c3pnd64ori6nhd2e7myzgob0blao58gec2jnncgljmp6ushulli9ohbz9dhhj6htblrsbn8e1ey6q78ool352yxmovstk5b0w4ugnnmzb1c5nff3rk88zp2hftsr3prvq20b6kpc23crju1ues06s2dmczbu0r9e',
                flowComponent: '2ufvawlkkzlssgwh497bvaoxxm8w95uccqdp4mwiyhctqraolmdzkcqq0uxfzxce662lulf0bt5fcac2s0pi2o7k35vk4ujksssu2zlmcky6kqo77r8dze6vvetg28ictbu4noi7q6c8fbzlggf766shxdy44cvn',
                flowInterfaceName: '4ilk3sgcuwrx5l35bb5mtpexbkqj5a2sa7rrf6qxx8imzacwsnvo5dac9gafv93vgcazc2r07bes14wuhvk4574ibfr6lxbv2624y88tbq7uc7wxfq4ohuotxz21dzp0etxzgfzlztsxgsu0vpomsvsnp5aawj5j',
                flowInterfaceNamespace: '3lelsu167k33evdn5133e8tnv4rduvuo78srhlaovw4ialtskclbq6n2w8ezttbltsxcaabxtfggxom1vc606az0ur117zyxmdp92u18kdf3snsuxz38vmlbg4qcwljknxtg8iufosx0n8edn5v99c67jp43f0hk',
                version: 'tukcezmscijhf72tlixo',
                parameterGroup: 'li7gcexl81mpz5jcrtca6r9ssamp9qq6vpep17cvej89e9laxf0ymcw1g6wgki6nd2znpd50ofmet9zr9q74uoemkbhlmy6avcgenny3no49wzvhuqqrqij1uwqsxx5fugl3ots8a9kfbgj20w84w0lsng398cgcayotawxrq9peyb9pirvrnetmdhayh6we5viewu0ex7mmlfn1mh0tb7xjptjme6o2bn6ccazblisces6ibgenulfzoxfhklf',
                name: 'j34wmyn5ohe8fe8fpwmsoickuyli1do445a89euzotl281e9d7s8prnoo4meoxsyizg4g2otvs5cc15fm8fjqobn06og5h1h8uuo9wxftl93pidus81ao0nptyuu81wh0tvcbkm3dxph519gg21hk7hcntsj1mqa99i7h5p0ko9cbxo9u1ecn91xc5wh5p94flmsysyu7796y7mhzi5dax9q8u1zxfar260asukceflr0s14bo9x7vdyxttigourqgp0i5jdvzlcjlcdl5v1s9qp8y03w9vr9gni3dkwbqubfco8le8nprrc3adzujsc',
                parameterName: 'ss9dl0yiwta4e24kqkf69bw8z1p45o2x2juff6n0553hryozz9pld5y9awhr982frt5n4fb0u6gio8guz3cv6ry6nu37xaxl333f5dfdk517xk4vp42y4sol6f4nhqov4rw34bgmh3svcf9b86drk2l1jgsf11ra6nwkvceqohwrzhi9aj80dqt4q2gobejyrj4e3jh55fns92sc85g6t86ps406mwwc4rm9slq7551fhzgge1mvcnm1cz0snptrob89evcnqen44df22fcycktts5mpc0ogjzhqx10oeu9zcdik4vwjfosdt7un61uu',
                parameterValue: '3yr9xqhah35wb805yanfoxnemo5rheli56vsircpri2n6tz9p447akpjhppc5vjwqtb6ux44vaxeckqtwjwpn675dkozhka2h1gotzhfc16id6jnhadgcx46mdm2b5vted2tyvgaxmtek0oit744hnn277y8hgwvgjhyjrhjfcrtqfp2lc7kt11vnjvu34dpdnk0ngw737qcsc7gxk1pdarrhev53drk1hnpk7nqnazo2v8w44lygcczarr33web0byekvolg4pyhlzo2mafvsavahsucitqwmpuhaaz9ygekeeiql9mywss2yknpgfx89o17lqnhchn7cqvwlmiow0a8658b6xi62dvah4d3pve90pkm9xo4l14rbk9n7sgvc4k84000rxctbqxb9em2pzxu826yv9hhqnhp062ltu8iqj4opjje3z51c83x2n93br58bh7llbr4r8g24iky85233r9zm2xvq0tnow0v4yhluvaufxqvhn795f3y4x5sgvx9laab991ayruw8dox70plmz6o5euat9atbzqwa8zpgdri0j6kxa1n1jaxgeesvf37w51p3je9du85im91omaf6z03rni05xb0773vsj6ek6asgimi4zwmrrobu3t2609abfpzfpt29hlq04zqjldkr1l2hm6dxfl1v958hmo71m9opaed758jychjqy2wvc0nqw2wmq9z0noiq7vddkfz4o43dvfaxiwz7zq00emwhvh9tlw05ue3ex9aakt4ihw0tuxdahzs292js5nvibpoot1m939io3m5cuqby8qwnffrfx2qkuaa6nx8auh6sqtm7u7my51nxorcbk5ldkg7w7w9po50k5zae7v6cvwhpmp7t3jfv2o1kh6lk7epqdf6x00qhaxbn4zkvnvnqpaeyszn2sbmp0gxm9n0fmrx5aoegtsybwfclgg3srmqh6835lxl4kggoph97axo9zgbbw1wlqevzmw1adr3964ul4bu75st6rzjiypj3d5',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'pefn93b1y387wymdknxqb9fzuvy3pdv0a47wlgvvpkj5t9trbr',
                
                systemName: 'xpc74g8a6pt5dtc4y2nz',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'miy3qnzj6om5wcwi0a6t0yl7mjul82hhrns06cgzhvvtr85c805eomwk46ww6q98coelestk0vcwjvttgtjrnqm8jsc67ubgkbvddgs4u09lu7hzlnz476wune2jlrbuuioqnlvjwpzyf45mukdsfqq011agixvi',
                channelComponent: '3s7crq8ajh1dmdj5yi2724egki95ba7koeym3uxxjtf5317g0wtq6jug1a3maqwcxn0ly6bv2oeeghnb7fwrz7o8nse2e9cp34sikbket1y6sbtzy2arkx5wjnjjdui56koc2gock4i1f8cr7l52r2ge768pxawh',
                channelName: 'i919zvj4dufnb4pejaq4gt3hyv4l85wyio46ojzibr7hi6hr7nlv0y6zproc33xtkr130jbxgwk9ni5j57ppg6zyjn89p5wgd4523txj0us6phd2sl962t8xeliiaqzkufs9b2gcu3kweruvb6jgi01t5jektkmw',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'lhoom2l814nezbvww0cjdkeu6ml7h67n094m1s44cd762ehg2u6etb9ucwnu8yp3msf5oc8a11zuq5c52tygcolbk6qptl62closxykip1ounq1jmwzot9wun7z59ghzhu5mhav55d7so5645jtqo82pcumaawen',
                flowComponent: 'j0xuuv2yeq7cwzc3p2xroofu4nud2aoh9mclg6xg4mr734bx986zlgithebz40p1suq0ab8t6jw9vc4dc42ude8yjvvvcpx84f26qkkrv257tew4co4qzj1dbs9c6g3xoo8i8p6kck7in8o72hovavlpfd3vcbwd',
                flowInterfaceName: '041llhf7jbajrfwh24wy55wfgq810vkm062lr6zkvjugiz6mv8xevvwlb247brfkysfm71377iiw3vudx2sirvt89wyo9lebj9k81nsyx6gphyy5kihlyeuxbxxjdqfpejth5sq4uttdnlwovofnw9wrj7eca4md',
                flowInterfaceNamespace: '3tsie4eo8nwd4rbulljbbenku1siazpnpm9diqbdjow18l6nxsiu04ov4sxboh5z1yj3lg6w2ucftf9wq3t1ksa1a42gbz8pitq9ocmx66apqt59shy7yquc84du8rsm5prcqpicgd7fybxh2oyc3bfnmvetiu9r',
                version: 'oh9zuyvqlmyeu3di7vmo',
                parameterGroup: 't06yadjyp7k60ta7oua1ptt0o80mjzqw43mmkv7rfspmquaie6oxkhzc2qgi2o6k0zpjokgnofo22f6e33e2shqlb0n2sgdphs6omziqivr3hbiomibqq2uqbnb5vy9b7hgbu6yfsz2o40u4u5smggiy29718mt1bg67ilsuz3cx1v27nqucgwz0gyo2rd86q16llmvp9dvut9houaht8rk4gild09ygjryzxw9z4u76aukh0o4l2qpn7l2dz4r',
                name: 'at5r0nn7xe5dtju7wrgas2xn198i091wwm1wir9dae5aatkg44snwf4vlf58om8m0puw6z4r1r40rms0rcktq32ynxsru422dierftzziy5f2ylhijiqmtqzekc521ygvcubpzxv69hnfomk9iyjrujeoqt27kyln2swkcwmolefe63b1k21qx00q31l4o7g8r07nli8dhqwg7ww03ic2hfxfddelqpognuh1bg0d94lffwqmzrut85viawi9n5hqaifzeuoxi8jw6yanokk4s4qgldy0rs630ddd8fw4aus5svevzmn6857gdo3tx3i',
                parameterName: '7ptoumvgy8dd7xq6poph5i3h5oakif7djec9yz7lqj9d6zy1oiut85zsaq92z7wmf4ll8a1khqd4kuyyhyczo42i8ddwppqswwuyk601hcaa9127dz0wkel6w3jc9aqy2k8l45j4lxnb2zqky0ixfgph0qnlptu7bccnr9ivw4hm0hraipm5uc60ou0tdafolbcmgpgkxc6459opgi98arh2ats3js89xushui66rgzijzh4udreaxkso1wmous4bo47knskmpldxm69438a5impa3qhnld3p3inh2c6jx09rxmfp67g1ysoqb1z4g9i',
                parameterValue: 'yruj9f1oxrwlbufhmkk7r7q40y51jm2q4h9fb8wvtp4d74u5k1lfvu0uy626uxl8k8rfukqwtg1e9vzm6pr4m17bl8z4j16am91pju87y8dizg1po6yen1j2y5d4m3tlkbiuhh9mhxem2qag16jzj9vrwxmj9fgnmf916bz834jj4eqiebwtykwa509s8i1kf5702t6a3z5ujs6b6q2iiv1khopavq0u1h0m92izzaapu4pog9ko5t1yllbfd0idata69o789c7rgwlnxp97l7ng8a376735rl1p5q07tuvvy7p6384gg5ggx70vfktk5fwofws864t4kutmxhxi5ccoaav4w4lyptmrz4pp8n3i02pb2vnp0g34qa295wi4szm9x8p6mi6sixsa5gkd5xf66ibsc8myqsu6uicuodv7ul11kiwpaypm8p6r9u7q8bh2f968uskaugjzns7qrmr9r3tx136hv8ssf08oawndu20oz2wiz9rmihkgcqd6v9tku607nxzk4jwpv12f7v1dtn7qjf8txqxacg9immbalsuu3iy4293wlkmagiecvtcvst8melcntydb2i0w3xzpq6enck16ss60ua8i6ijinboqjj67j6y1mfb565rhh5ifmb1ooy2fclen1ivkqskmdwklvq8j2xjo96yne9qvrxod1l8v3wsy5svww5bop7zcvzj0mmd9qz4yx0kwufi6jt8kd05klhae03x2wwe3k2c30oqb9j6q2f40wq61u8sxkuq2h1ilitifmoj6fw4gmzmbkod4s3wlima5h4395153gn2dd7umi5ix81ek7dnd0u7kpdoq4x3373037b0fpgrmfh59yf9tktlbisp19r71fxh1ro1ka0mhk5v17kj6kmten1xfu3v8l0xb1ddwgsc9t6583uzcn1lhwin94vtctmt2vf9qo9zaofe8dye0f9y67pzckhjgur4n09xyjozt0bfqmwh7s2lu2tupk4rz098nayzuhg0ynz9o',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'yincj7hjhzdo3gx6br37et60jle8jrxb7zczzvcidcks9boo1l',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: null,
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: '0qbwyaftl50e6515xvsnd881iy4d13kk43l3q5fgxrq0zzpmtxzllxpv733el2mpcpt5o42tp19e3k9182ouhngw5h5w8qf2w5rgsjatxka6onpf56556yysoawtvgbrm77w1fjwpla2f38hevobzd187b8kuvvo',
                channelComponent: 'exx63kdzhbhyo81bclz5ooq3fkb2c9lwp10eirlm78mx3e8s9nctpmnpdm710h17nucq25dgus1c8qiplopui4tsau5711pxiyblvjmmf5tfyu6c6lr8n257icbcazswwdplyvrn34cvv94hlrc32iayegz2is0d',
                channelName: '1idwuvf0ef712foj6twpm3dif8d6s18un0spsd254qvkb22fvaj8r31lzd97qtfp31qvz3hk698g01a2jzivxbp4xg289s8nobmajx3yagngwnpaf5or1989oeua6f7q3a4ainh7rj8ikja4ycix6b6o9dpad9op',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'hxn0r9b1vjg1425rpufvj9fg9pdiftgcu1jwvwkhz3k76fvnmiwpthkmvdbb1cpgz4yv6g8dbk66815c69fcgro3oy9m14116k40vdn2ivv448d8cl7vr22tomwg3hfc9n8cnbffmzis85lzou17gh7mcehu3u9r',
                flowComponent: 'r362uypnqg5zwz6yim21ott6v1scdkfwjgvcw0i6qo0zigkju7hcnineio6bjs401pdgg0tto7sarezxnddoqzn8cfkzby8hde26w1qr3onyzzi2mia07ehsvsngiyzagj4yb6bt7es2g0haeloyzf0qos1bee4a',
                flowInterfaceName: 'u5uxwexqsj9zu4q88zpc6g5q7yn3xbnkdrfmd2kwplcdun9qu8mt12fcq60zql1a7d97n9lwo7wng0fjwofk484754amxyng8c2fb6h9f8ehckv0u11k0yco4xtjliptgzxzdu15qdpqi5i4o0optep849xtk2ad',
                flowInterfaceNamespace: '7uo9cik6un56bemao5g22tpnq6mv3s0xy1muxdn5kkzv114rgohzll8evaqwla0svr0gxxkwiqb4583n1a7cmtqs1n9jr1y0altdhwy2e1du1wcmxla00m5af04369jh1f712dla2irwq4ss6js0ekzfhhdycu9i',
                version: 'kilgnm8kh8n9shk16xhu',
                parameterGroup: 'nv4uujod2boayc866vhos86ytrup2pbrqq2nsa1m652pdejvbqjepis85ehirbsbstr0h2mgw4c8v48o5tlpbia35oavv6q30g5gsw0jv9u7sdbto0aeiug2xujk5hvao87pc4o69qn9rv71z4hnusl761is3wzielueygrydb2iajtvd8moycl2bt4vobs7eqem6lbrg0001d40r3as7ennnclmaf0iu9wvulyj7uyth6wpl44saoy8uk355fq',
                name: 'im86jhyrqzcautrd7hxatd9hgo0muq695o5c7jmg3teouicmio7fzept6ek4nrfw6sjhid4xfm9lqnvnu4wc0biotilctbcf4vag2c6nfw4nhwz19btc9yrlf3s7zm5u0syjbalqmfhw3bicatplm9adxqy1gbca9x3i5de8o64hl84i12m0js2mkzxdfx5falr7x6re99vzufqm72ccu9zb5ma0e6g4gwwc5oiztvdz8kla1gjc2hak4fop8ecyq7i1witvbpqy1am1vuw702w1ijs2wjcpfsv574xrv5shtbhs50aju0bu2fpbcxwc',
                parameterName: 'a56g16f7e0flzovzc532g62y6nrygnvr9e6sv9rzs4k7qxqpft6j61d15yd2q404aoo28usjgki29fgyo2w6nxrj2d8hfikfte1z5zdm3xrik70tkybb37dekuvk9q9o47fuusbqxxyt2y302xvklougv11zrvw0lawa2vsv4k5wrmk7hoovisubl3bt15ct13t8hmr9icacpywbbzwd9hgmtdg8e7ccn9wuxbvt1mullg47nqgttvicer8ps1d5q8fuhohazd4v9bg0bja3srlepx2d7nmbpwi8mp2ra2onfssk0526gdvjl7yo7sro',
                parameterValue: 'dyibwpimpjsq2kjrq8lr7qglgoii7cujhy8gq9lwt2nhym410633ov1aqug0kfhztnsw0x0gix2r3q2mddhzk3eqipdqul9wcquyn06q1hy9d1cux2qnvswo1ff08uetv0lxgq30hgpr6zjqgcnb98a48rlbi9unpfgyswqsf391vxffudivtvd22awggkkjxvymmyqtznue3xrvrnhh6vs33heme77y2wrpi1gx3gn9qbw6hi6ifbipujess29xh6i44f5kkevzhshpaaft0rtyrg5txiuw84k09qsddjuaucvun07bgx56km2awtnc6y44q96weq6tqs167no7c822psnzqvewflhgoh00zdgio0lczazn9nqj9rweu4ibrfxfivxd7u2btd7hpqxp3ahmmmmpsbyn8tqvn9s81paqk6htfcss3wv21i4zfi67hnqhlrebbrkc4kfvnaxpnigbaltfbiauu9qulgwcrfaop9u3t51f06dvj72wqvyxwcy1pq5vg6or8k6m5szc88qyndph2hwe3gs8vpy1tvo2il3xe78birkhqb0vammf3dvfvk2wqsfqrj3pnd641zi3v87mah8mgz8weyv5xm6fu71w3uhgke977nbfpyho725ilavtolpmq63vusdthlybkqk764xpkv8u4iebsnfwgqzqoyl8yw1z46djbn58b6b956zhe7a7m2hl88rqwlp5il6e5nv8u9stv17zm2b25k2xadydo178bfqm3tajkzxg6n6ka2h981s9ryuso66hmt1nuqqulrib7fwqbowz9gigvbjc4qbb755b4qa5s3rspyxkqmj1vjaio6dakpw0kbll0ojrxeqxjmfpqle8t0eie1db5gh2v1tdo09jd17imrqrusz5pdsvg9l8ywrfb7t5ut827j1x9xhppi3cz0aiogxv2jm84y4rb31cdviy0pvnh8ip6ky7jsk6lmbhgw36iru1as58aqz06br7fgahkjhi9lvk5w24cidc',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'tcv1vq6ivohkc2c5jt5oynig9ndmojofuiy27yq4z61x2eqwc7',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'qjo7eemn1q2lrauovp6gv0o0rkiu8300pf1kwlaybamj6wi5vdqpmkb80sebze2p7v45k5jk9sn8yws0e6qup4dki3grztljwxn6x3h0v82kgo9g3js7i29g8evedfqk0d6zly8d8dkplx8t7ofbsrsxonf03snt',
                channelComponent: 'z82781kqyteemmh49zcinszsjdu5o18dw9ebcuokmpgzn5ur8t33vu055xa82mg9oygr4r8oicn9vf07l96wroep8efjwxvcqspee1cwet85mmd2lfpuwt7p0vhua6kuey8asyxvsy4wi3a13ar9ql0xr5e3c0im',
                channelName: 'jr3w3vay1infnxb0952v17464yi5nzmnwd0n9f0hkp1qeuu3fsvtiytss0om91ppgtkyp17x1oa6343h13m896qh1y801f64da2w4koecbjtppjonszo1w5qz3gkep90j76jq9zy4omer93h4iwhhrk4qwbbr6ed',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: '0isgeu26o5lyo923p30ru6mqahrtzog5wq6o4vqlq75bls9q7qt4yx6wgf1j45udomlepq5xzx3y83tugekjquyeiftiyc5vgcb8cknei0gei1360m5lt4osro3q77zruik05lajjfvhy548za6eshw7awhiyuau',
                flowComponent: '4ywzs3b5avhxo4zg9jb7h4llx8fwqzfislv0a4a16op6cbcxofzgmzuj1dkd2cyiuwn8vcimoaj5ivk7k443v3ntk28qn6ypan8un3c7fom4fegud4s90s2xh9nne5zpfcige2d4aq2kvm0vcck8f6qsu3ca2w61',
                flowInterfaceName: 'dwhadsdohine08y3qvwjpmnabk3waarie3vo6wj36axl329yucl3vxxlgcgesljyi2v39qdggamp0134kf9pey1cm3rguqu99o6upfaqve7j09z7ddiqpluwir1rab59snd6hpsr9jf3o0tasoxevuvbfqka84zg',
                flowInterfaceNamespace: 'uqwt8kd42h6rf5uvie0sf96xkbh9fftpifd9tpsysfhd6h3az6vydm80ddlu5v8jkwk1jxecruz85jtapid1w2cckjtk3a1ob3c3hvi25521d1frchbjnyrrcrmshe2b4u81ubnxivr5jltdsg4x0ftilc2rsejf',
                version: '5l82lmq9ito6wx5279cv',
                parameterGroup: 'r24353af8q2h70jh1l7ul8bzbu9g56vdibkd15qa5xf821ukw5wy4ysrho3or57simb5vpj8zzhziwmnvjpeb97qc983xucr9za1twludke4tokvpv9hmcd61q235au7zcrbh3kgbvzp3wf4j3ibun61ltp57ktfgqd36xi6otj3tzeu25gtpa6ayjpplvutt47ypu9p6wj9hrknqfit0byibv4dg8i2exls6hx3auxfr2x9nh8y53av3uagevw',
                name: '05vm086aae4c2013yp0sflevy6uir1vvskfbelvh8vcd5uky6q05006phtuserzduwrubvyfyask8hnfzli8yzdhb9vk67v05h2xtyljt9h6qna5cnrkamccqzvss8fm5lt7ipxpte57mv66msl4r2ftg0ydz6gtcgbyjs83mtntniw26l9piifikpiklbfi3lq2175vhvd489l8lcp377jfnuhar6g3ejpfx449vrhmgc1x9bhpyyjplja1dtyt941b3y6699v34glm4j66th0z8gq1nk1e7nhsrivgtuu63dubnlh0yq6h5e7wb32y',
                parameterName: 'uois962qw83jlvo6rq4pbzkzmoqfvuemi6aqj6kwmp0p0vvgu9901qkz9dwo109mg5zxxyx0yilep6f6pxdhzkds4ghbpjb2toy06m7mzipzdjn3wleih3gor8qxdurr6sdx3gwfgo1j219emu4hual6qbfs6t1cia3smi30f2qpyyd9tysrwhaza0idqqdlqchduvhbl8k0tcw7vss6aq8w0s6r37mnekge48uahcggrt5381xpukug5c2fzz7uisvfzeiry73k3bv6irv6x26nmm3wkg84j16741mu4d67ebte60hfzzctmkjzfnwe',
                parameterValue: '0adtmx11x3xepzokqeli6xm5q8708b8yx27ocdjadpt4i251f3hwmrs6lxdfetae8hrwr4ajr6dyd1c689ncaruh7fkpgeyy1ybw6xhjtuog5pxhitwxwok5yrhd5mvepl812p672lrbubs9fwdz7fx1cttezhq7o077gnym9x9bj40ewq6dbztc49im6h46o2m5mven0zrhfz2mi8wu51zz4cxmp0u1x2rvkh65bm8ig52sjcizlsqwh8o49w34pjn9fuwc2n23chy3qjqqsqnnhmedtcgmik4l7ybcghvcm42q2qckpq2h5bl0rkwq5brghei9pl1hojpo96vprjfox775oi3jtq4cqc5rjna9lc8pxjqxdx3b5bw7ejjj4252pod2g5lh6komvd2yckydsg44fgxclpkdsdq6s052l82zbciblhx64a1eqc0swsgoqheg6nj34rq62a4a4rt46plafc422vhqjk3ry44cty8hxcxlslvx7c25hyhydp7fc99cddrkx02wvpf2fb0p4eexa4ne3ga4s6ydgppdu5o8run2ve2djmdz6vlwwumqhzf335li15hluulgn6ohggxqn32yg2vittcvr4fnc7gxt2343t2ergi7p75a4rhgma7when1erc0q3jzqa801lqdhziestxtkn0sdla70lddywtv8ktz1vuhzq1yvpfw6sd2ez0ly4q6oa68m4b731uxvg3mpogpw8t7wgqzs0tmbopdaegvn6afneue5j9pf821v02xmbq3e56p13lrwnv4jolvqooy0nmoojhbhoeci265i42hadhp5srheys29lx9y1tl9p4agw09puewefzxyi0efrved1tu9u3m4qsfq3fe8co8fedfoag3dtxwqnhgth2jyrv5n29ay5mq91rr1xv0l183e5bcnuttly177zehks88h1g25ey692h8wmnhejz85tnjqbpw6w12v5wgpcujyhjkn1gqxv6dypq0bythvjeqzy0ijhps',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'ae0hd4h0vm5hsn6yhscdbkpuufywy1bqocao759gpjfwzbwkbi',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'y2nmxebf9nnjewla2etl',
                channelId: null,
                channelParty: '0oplgcpqvg7iecn4fi5ucukqf8nqr7truen96t8k3kv2hem95bj2gesr5xjy6n1g4ah0kcu3o0x19v33y0699635pb9rgkhqcs24tdeo2jmxb5w8dybp18rm5hyul16vokp2s61d2uve2z860iogv4p1ouzww28j',
                channelComponent: 'xcp7t18365mweprvop2jegctictwlk1htohfc1iqwm90p8orlbz3xq4rhxyqibyn5vyvrntw8uvp82dg87p3xke2udplun3xe7t9bni8z5i8z5zbqvvs1w92dgl8joiplrn0ju4o0y49gv3hwag2utx4vtxvywb6',
                channelName: 'vu57edj2ylt9jzdtic8u6kdpmh9i27z38so2obmnvpypmsw7ao0ovjp7wi7bvz7mjfkshtc26pvij09kwzwertv99jhm8oo0lwmxo32evr8hguym0z7g3087qshnyya2nvclz291ndxgliwy6436zzlu6llsdvdq',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'ncy4ajp09q1pxm6r2ovj6553acrfqw584ayp2qtk5ua3psezqqkqsqx2b7l2e0xf2nhiasucyl7z93ren9c1j2lfk7fwrsjoh5yyljqb63l44mytp2wvacuq63n752b1flu69mqwznk7f6s2ocyyn1ccejrk8ab0',
                flowComponent: '3xptrqn5d376xxy0x7tb8bwi93p4map4wurhhfzai03cmh0jy3ifvvxw0o2ff6vyqh28x29up86ullkbujnwazz1yn5yy39gy1mrxhitdj1cfc007bopzsrfcc7bcldnu7yfnj1hqo1we7ooe1ha11s4zb8j0rmn',
                flowInterfaceName: '9j87di0vv4ex7smn14khbvfphd4gym458ll6nnw9uopmtojbbvj77vkl6ypoaz03xa248ln3wut62s9btx6jz4tmvs4xxop0yzcuuzidhkz3yz3e3cflrlc248jgayf9iw3o2kuj4lnooul22b3fi45fkl03vern',
                flowInterfaceNamespace: '52gcvf6qd61ew9vjz84nuun9l50ha2rk2jr7sqoikjqauoppfhz8xy65mp47vba6vi09h2m555mldj5zm79qezwkqblb1d7ftojnc55tvvmiwcgblcxyokb8x53x6hwk0t5tgij7yaux0f24tyee2sn27qw2y9c9',
                version: 'o1mmpmttjcrzqrtktonb',
                parameterGroup: '08ng9213005h6jyu338q2eu35fk4822aaycjx3j0y7ayuurvvlq5n9cop17nhiqrsu7t3dgd24r8kylv9m5gji5z1k09pz4f81ff0is4yttiziphhnkf34piq4x9rwmizuzjxgl3qcpl6xofqbxduy5fdstk705ngvbxfjc9nuisuhfz45jng7v8w8aut65qjgylu904tmukr2qq1w2beiwm975jgqcbdy2x2b58k3ke07tyvd79u56qrmn7zix',
                name: 'vswbo8mexaa34y9d0tq1stqj9iyog7su16c7p51pandt9o1ec4bb4lg5h8i55ziodpt0gane4gba5l9n52oqxakme6gz2ywsyjzzbq6tr87o7e8d58nz4vjam3mzaq81ehee0x8su16v07lhinhtkt3pe6d357hlqcmnxt0eajytzo2xs74ukeq0prue69pkvzpptpq79lp1jybt56yu89edjokcihfk5ochiqbzyk38otepworr6b1aoru16p7aveqbg6dmyhkth6psl5npi7v76ljmshtumzdykgcsl2clcvljkxdgvgtgkof1fe23',
                parameterName: 'blp9bjctfq54pjcvxtktnx0s6ghaaqfg2nbxq9iy7k8jc7pnefwd9o5elxs2kzytxihe5lhoadmviwq3oq9iq9qs8mq0sgoypx2vt8wknzt005j5z948zt3pcayu2et4u23wjst26u5pp3inasf2ubz8saqrc0ycnsa2vd4gaya61ctkgadkptr4tyhijhej4es5x99gyjeoej8mtqz7o4gqjlddrpw2o9vwkxfub5q99fivwkb41nrp9hhpahbxdh3op0kl1uxrnrb114sljr8rh5lkfut62gof0p2vqaovivsjbj7ju5mdq0n6d9nk',
                parameterValue: 'f6lveqxbsp4v7qxo61ww9ppuuhkop5xgoq1wnq61yeomrwui57dua68wim3b78vhlg7byi66wbtl8e4vl5xd93p6o6qb6fc9pueo4jn7lt1p0e2ubj1qbji8gchiccvijjzprflxm9m6jzeb98nkruzgmkrzqtx09duop0drjq7l6a9r522919svmg3otobutbf49cp2gh5sljlrasdtg99dbhw2qcfym4wpudppepvrz7qywmpp43e9gsis5s7tonqg1kg3enx5664w754a7scamn6u11xhpxtm813sazel80v45fqie8erhvt2arjob5bmdk29e8ekisme11uj5ba4hyx02owws7tdl734bckk2g0y4je8eheq7y37g7tbtnzxrykp7kipx0op1pzd2vnhbebobkvhmxej348vruhzqkcafva91qxdn8vils6p7pf7yo5rfx2riaj5nli6dr9w1fpeeeof15v1dbevpqeaf72l690lbuo5xd5xrz9n32tqsp0uixrckhjnyhubgwpx32f9akq5jbqhf7m52q5okrr5116sg2wa3ic0tb472xp0unqbal7ngx3qp6u7jdnma9yo2jk7yqpa88k6bikkdlvumonc5zwx9azm1lsk6o8b7rfbqq6pq8jkry3zoow29syph1snu9hn1u2r0fxy7e5lt5r64jov9j11egyr727qnit03nfvhkuoxmadkou2jg1hmc9mw08ojrmz1gglvt4g4h0nx1vifbbvegj9rm9cr8z0ugt9twmzx5dfsrpac3lnbgh34juastkx7542kest6r6j16dlabkwyvp2pxotej545zr17mve1xdfvup9lylhk30b8xw2viyl9e9yq78dj3i23bdadekzxg8gtcns0crf68pqs64u8h4yf5ev7t5mylya7g0r6wrbcimdf7cwintrj0aemrvant77y9mcm8t02caiku2d36x9hi65hixwevibift26txkl7hrsymb96etbg0rwcamq6oh',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'ucluxy67ggeukmzp8z65nvztbk7zlc3w4taja8k4vg3805g97v',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'ro4yqup71fz91mccdz21',
                
                channelParty: '9be83609v2f7fj7xzsfpkd5ex9t7kmpdw51kbua93monnza8u2ib7gx7epiofuwirsnrzk5fkdvh29g3i06gy8aa4hrmxzlxim54vtobc5zfe6cncllrdgcc0e5eroyzslpawp5fktxf95hbozav9wrtdc7wlgsm',
                channelComponent: 'chjqgesooybf0xa5ki67ln5ktu12zxctbmzijahfe62fkdsw87ki92byj0gxv90hzljqwc3cnxbbt4w7c4ue2tmnkptmsl3jceac7yrppo66ksw9xhrjiteprk2u16mlijtffnkx8e5ua2fv2ynx8zx5otlf46iw',
                channelName: '22nqdnlqusgdx2ir0opggi8atf3wfb5loyyh8uuvav31cnhl1s8gjaqoe311z0vka1whkydxd0hakcbrqy8z0aeqp8nchukz699rb48af20gu57l6zustgdii7t3xveq49od19ra84nu66ov2idhezlfj98qrw16',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'n315b4yvju9wla6hh2thzatm1uuup2jbf8evej5rjdjy2c3zse4jmy7ya66zkfsjbtjbudatlws15d2sf7zwpp1u3rk9y2fpq6v8mwpx2s7awqh460utz8bqgysq88hjgo0l02xvwbkb45l6b5544243dz7ay80r',
                flowComponent: '9y24c91kzyevu4rsr6r4yffzuv1vtnb7i7i0vj1jtw2xidr5t5o6wt5k8b4i1ehybb68mu9ehpf4kbs99v16yv6t5t6pbl0te7s8f0rx534gt31frqijr9owkj031rh0y3uhv68tvidbgp8467gngd6jsku8q7rt',
                flowInterfaceName: 'q2z8gbyithwwcn5zc6xn1bwrt2r2q8elmax2qeba4w3k00xmw6djohe32vtx73e2hip7ql5cmfahli37a2017jkxzb9hrfvlmnwlj52v6tl345axc8eglbbgoja1vkv6un4vxv8u3ej9a1i359mk5x7ccw9p74b9',
                flowInterfaceNamespace: '6v9j1nv0n8fnwb47q0jreco5albnxnx25vtj8ogb0ssoudf8jq7co0jdxm62rhfirv0561vnjs8pykk1fsqss9d0i13f8si0inki8uktsp7jvlmckql5pum49b9l5j8p9z92dug15fqlsw7yx39d7kt9paax077j',
                version: 'eqytwnavshrdsyi1858n',
                parameterGroup: '5u3ixb6fnxrw8lxq2tpihd1x1bl2xgo85ptacu8x4ixtc0a8l41j7yd4ieyfjnkoljuize0epl5fewefubvnz6nrfi5kny2t9f7bfybc8xnmilbisr9883zownrhnqt9ylu9uhzk9w0gws8gc2jo0dolipvmclelhqwmi3t0h4vr9bt1but4wshz7i9sxlt14m2liix3otiydksbncgoktupvpfsf53i3xk5kyeqbfkdcvdouvfg7461nlofm79',
                name: 'h6m9rcldeyfqu0iamoalkpahp9nvgf1ymau46g8zax36w8bicdccbfx00k41i9rixg0q95blu9qiuo0zee5e04dpjyrqwp4cn56q4l0dssxq2hq6kaa428001sopc0q8ze7qsji3fqvemo6aq9q1xpy17ra20zn2ccztuq7xt1c7i13nrsyfd5y0t03lwfg65zk0vq5tnooiwqgv9fv44zo5mwo7kwqqnlz2aytlv556yw7h5smqv3n7bqc67hv50yo646hvh7hqcr4q9ai2p2yak1nn6k1ddrcz21i08tauejq8cdtdqnkpwe705tha',
                parameterName: 'codkaxzgcb1th0y323amhn97mbdzapt6nc8jhb6bmoup03cxkirbtc2i1uszk3j5w1akvg1aublfegiv4xn2auqiackszjpok36fa283um1h37870fqq1dfgwp2sag4toz9bfbp647rqfns3dmvlxyukr18q9pxblkzqq2afel9z53tmytnysz3s565vlnf4mmi30hf6jaq8lv1i7li8olfztfrrli63yb8fupsvc54biuvlsphibekye3wk5stxclvidzf5krl6mqm4cofysgf5au6nhev6si9lpj279aqurtifrtq7hsh8q9324r1d',
                parameterValue: 'fqik33kvuqajb0iuhhxmgiie2khi5zqookz7o9vdsxdomfapiicd8lbi4kmcla3ln6x6wu8sef7t6f7ifg0u6hucge7ajrq1sy5fxneh4uabxi99t9petc9xib1nvpaxsryl2vgiagpi85g7tga4uoue5gjoy44y76f7hlig80hzazix2c76r8zluefe7u6gk3dwccf9s2b59ordmujybz5am516o12jir1g2fqqtijnh1g3qzb3od1x897fsxe93lyg1c5iz9vdsqmesnum8jnhwgp1qv9q5kqnx5v8heg4blubpudv57vm3qiyrue7h6stf5gev1dgs2lx1impzub228orjt2xvzv8gminofnyjq17w0y7du8ectnclq9w08cpxq5c5kytqkycbh98z8e779wzbmg79vzlcjo4dnxlo73suef8c5s5j0dj297cj4ozbhm1tu3ue7qx0jzh303027mi5ba3fbc4m341y87d9935laay10dqe6nb45yz6irgqkns84a6emhyy5gez9yr1wuco8a6f4e0h9krh2spij7n5hw8aq3rpinhn7st8h4dij84t5jvkurxg46q60m1lb4yk38gtrcvh4j4di20jknof5ivxu1peil89zfcoyac00zleucj3r0yu7e8k8ejrddy5ol7y1ggnhmaw307xgxxkba809fvhgjxecjbvsz14hx65i0cpk70cucxy6v8e6rb4qof55iousw2r8nwee7xl3ckgosc8w1tpmvv2ofmtyfzpry3hizfir8dw2qu0t0dqjjglkfna8zba6vewzctsaoddws2v8z6ucxo5tcqruiwge2p3dqfux9uq9ovhrm3x3rjbazdulm962wf2wian8a2c7cmanc8ob8w1uxsnu8ykf5fzfddsiyjntu4l1tqzz6si9g2kdmz2i9wkzht0sotri0re4ltuvd1pxaxrlb8ld29rir16wl2gdjg21l59pvx635mp2h2ur86yptk1pzvxzqtixnvti3r',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: '0asdgvmb5e5wzw64by1a7izz8yrwlsvxkzpmdet4jsh2nun7x4',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'hru8maacde7j2jp8gdh8',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'ux8y01swpqbrm0573mgh47cxyc72kd3ommn4c1rb65cvgujxb38uykfwe4qbns5nmauiw2wa5h3rwayfk30jd1col1yg8uwk7chte5w0svsdjc4bkyucvwemv5k65wedw9yz9xy4n3jkt0ot726dfeu8jeulazbg',
                channelComponent: null,
                channelName: '3lj03awydxrjtlosr6oetn39efbema6x764pvhuukcbxq9k0jo4508zof7hji3fgs14du45bdd4k8n1asv5o2rgn2jyk90ec15qeluasj3v9wawvbgc93w4inbr15sgufxba3nt12xt92ilc183mu9gnx8wjq369',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: '8qcja4fx4fi3r5mgf3brn63flwuf992zf7x5hfp47yacforovbi1ir098jyuf2sfzp53pkbj51nolczhu366fqab06m6rgwpn3sipxlejzpeo3mk1c864n83z14ywukrnr9se75sknmzf1hk8xanou3pmyihvbnd',
                flowComponent: 'r3baufck159hekzt96jmb1o5fqhaakr2ijikwdgtxla8vqmnhtwxgnuvsnv3kt633g09ypr0d91j8aamf2ifg9jl366nj9j8hnalvet0rno6qswlc9u15tskmh1fwh7v7hwt3dexkbvzi6hhh8wviadvjvpous3n',
                flowInterfaceName: 'jw96bynbhhxi0jeayscg65pkzl9s5dgk3qn9hinl312rnxf1w7llp8szuhf3i3q3jgkdbjq4tz287c3g1qexqi072aia114bxojpjfganutvignlfyugc3w5cnm2z1m9vptbql7ze91s4fe3dkvlz81olvv78f7g',
                flowInterfaceNamespace: '7to3e3og0hd0ptpd0w8pc63vvx87iuvm44ztfang8q2t4i10ljwvsyvz4xquxc52qpak3mf3lp8ia9vipvxka8kks6gw9m5xszj835blgmt6esatui9gj29x5ocuzpf27avx2v0kpaarq7ihuifd9m6fxb101d8v',
                version: 'fnyqsnkgdntl123k3e1f',
                parameterGroup: 'f685xctcu94imyrluo9tx84jog1lqit6s6lothbsqs5wfk97iij0utv9wdlav39pynjj4ezqvgztmox6e6v2w2g2pp819r5y1ow9a47d45873yvuqi80vw1b5eggm3qc2ikj0jjkffjx46lx3gqn7o2h4gyhqjekc8qur0elydr68g5w24ytkof6h3ooh657yi0nakcp4la5p1c18tw3vvfoj7jrv7rctwomr6hley3aq9vd2u41qpdz3mwd67w',
                name: 'i1bys3bgmr4sek3e1kojkdqfy52uptfytu33xpiwvfrjyjp6nl2wzfh35t5er2pq9joeanl3outk4vzk09kdgex3rr8yu9tirg8bs4h29jwkz6nfbmnbtjxbf7uufamh42jvnlyx6ez4lo3mfyx3yrlckihhyie4sj7dnxit5ce8ke2m5cxf2wikkh0b2uoonn9tux683ejdci0camu092dzvz6ei5fd65z9u6mpp098wihs0pwbucoaijeghkiv2xq8qjl77jyasq8tqf5fmgpp89w02xe307nyxf7ecmv8d8pkn6tzand93eoxp97f',
                parameterName: 'gvklwuw1fxr82kgm0vuztfvdu6yl7pdubmenzhzxfcft313viq93rg23n4slfcndfx5pk2vm7fok9dtxl34iqpf0vf94dk7teesqv4kqmcagmki17c7n9saorbpi4z8yyaei9jzs15x3l57ffwxdvgbds6ip5t9bgkq40yytdhvk8lhsd9hvrldeo3pvh6s3o3dd1iu2ne6vc1u8q025kb3ft6sfqm1fg85us93mf3su6r9r7hk4wtvzhtplre4u9wco809vjcb74ct07uhcv08gb2jait5qfe8f09ogpiptimzuepe9ejljp6xv1ttl',
                parameterValue: 'jkyl4wpp8nizkk1hfym4a2cm8ulxewn197247vej37zaw5asxh6x2o7easd1wygvfgdoiyh2oc2oe7np2k2g3p2fe2fe5ocs3m7fgbonhszdbf8qgbn4spioiu0rgh7lgtr58ms6no4z8gr43sh3kwt0vgcdaqfi4batka6zv0wyvjd7d28f6az3uw7ipa50pv7ty0h8n2hwa0b1fdm2yyyzb9qf4ce9q9giwjdftlwd276o4ov1rshi5m6599r2l5rtl8lggmv7akpbr2bmpmcgiihvz496wvmefst9155yz3rr1hzia2sbc0wzk5mt9l1g43issr8alz0s8qu0wtmcuoui6nj5fserjwlqzk05algl9wgf8stxsn6k8tj3yzhfysfq6v64cx1wt99x551p522ejkca7dr0zohurr0pgkfoa3vw0wraxkbjsnydmbf4am20slwbvd9jembhxh12s7vwkyedd7lb9s44a2p0s0arksf20389usnnsowqnrw5x1p9rdzx54d46kd8ydtehd0ldqyhgl8blid5826bq32p3671kv7vtwcfc9ogkj9mzkv11cqtsnjex4qmmkfwne3npexpzc89n285p2c0yewiq2lclyvo301iey6rtg9lqo4vptv6tz6jx5izlg9ufyygcqa4fgem0meyi1werc6wugji1l61uhqdp8vcxoh2hmldyo2ihs3n0akqv2rzs4i14yoa7gx1mi0c61f312pgur322wezt0cyc6qe22spdd0ll6u63fu50bz7k8tokn552qtmfko6ctbjulvgttdin7x33be7s6rgivienr21kgqi3j8vbn3xuafhklsiko78e61qsqi3i63wk5cur17r9s2ziv7p9e8n4kl41m9ejjejycta3zk13clg5x7ht2d4hwo2k2zv3bmkdyvrqbfpczindwlx87vnucr3oe3z25833wascczy6dvw8r4dx0dns6n56w2efgpk8w30e4snp5tgk38nnw52vel3',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'vahrja974qhmz448vtmcv0qije8m5yyg1q9ccqz4ea53fcvqbp',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'm9a9x4xyete5dezaudud',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'n5t6glf9a4mp873ofltsx1f4ziw0y7h69v9bjxvhsp70fpovoctw7k07jlach82uef2tejl8056x2yhug06fjyqh1606ajtiqpk1h4tnr0czz5wlyb719bxa2vc71pn7r6jc62ihhflz1d31ji38lcj237u1i9t3',
                
                channelName: 's127jd33xf66apsukqcmbryjc8rhsx1skpl7eneltdies5a6nnkixu1owfxhtiignyxokzism5t5ggw7trx17sfff82n6o1cwi1ur9hzs2jfd770sjly4fzn8h2gjkbkaai8dxxpjncvnwcp2i0q5utauy4zov90',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'o0ottnrzuf0b4y3i0x6m6yzispjzxjhb16msdyst940xpojhijuv18shz6tn643iojq53vp2qpacexa2vhsz14mv0mw8aeiz5twv70kczawp22lli80btsrd20sh9mu7g5xofo1mg0vgue3yxw6axslmvzl4z8q2',
                flowComponent: '3ab1pmp3po17qiz9szsaqmqmz6lwza3bgrjksaf18syxh3sw6wi70pzgxp6fz0isxwu7ebdqp85asgpu2iza407zlzy3bxefbopms42ps5fkyw9pgi6kovwwjyp1d76lysduudct5nltzomhnbbmqkdc4ez3moby',
                flowInterfaceName: 'jpfw5dld1sfzttjhusjfdbs2jxfkyx81i94zqc2kcptc00939wegxqsjx63tffv8vccsksskmw9lyhkmcf9pvuto1ipr5iu3i3q8urf18hx8bm5hd9w22ybtfyuefun38djzbmhdwf38pnvqboo0rv5i78jzohtx',
                flowInterfaceNamespace: 'idbcx12bfghlzhm3q2ig92dojppg2yw6znc97gtm8kigwpyhrfzezga3ckkie2iqrhgxf5s7uimlc362nigvxz0wlqga6ou8ay46j3duxxu2aiihzqp9u9xo8osn5k95kfpwaswe4xab4938cpl05s9837g6ry35',
                version: 'j05m2bfg5s5i44vtytrw',
                parameterGroup: 'rwath0fizmnrgavkbfjofq50eszjnk20klaqs2fk5z5o4x6twh49slt3wu2o9qh6iaupspa90m98shfvkz70ha8jj9ugcv4ud0pmcdadf2ixipbadjvh8s7jxy9nv0utjh28v4xe4efjaa2a8cx48vt8anb5y61fh62xjsg9kyai4cg87cjuj9bzv76g96u41r09p0thya64kcdhc96hq3xzbnr2vwj7gq3r2wc0te0fgpye3tetjtdoakivt1a',
                name: 'mvpw2okrzj1hx8z91h7vxtc1eddpy5b7b35tt45t5hddeb7cctj0sx2os0vtzk9zgcdqne5owy8s2ieigygs6mr3s80n5lz2x93hjvn1t4qkc4bb2xpka99p0e53d270rzc9gva91ce02f0lavugnwql27bhmh14qmgy6vtucb7sidi4sd1m1r8cxcajikg3mqjpf2kvehny282kxbg30sn5rwul02sd9rvk77gwjf6ntj9679ed7m59w7ajzk5o0e6lpt2gnh696alx5ygy98b6bkbjsxldgvocpib2xrqx2scik7zmgfk698lfipu5',
                parameterName: 'vhp7tv4x0p1hh5qt92jfk80eum5jp7zu64btiz3o8ebe7ymidjcp2to64r4dlgkoqgv74v95nqv90b6x2j3q8b2hd7u0bw3euh8y73hggdua5tz0ue7ivyuznvln13z482du9ze6el1iwywjbjxxib177a5uwg9h8z7aq5ec3sbyrl87b1frlkecwrscoxaxsq5wp992735170i17xx8pozm3ohxvvh95iidxbcm8pytfsua6mgk6b479hpij30qkxdwy5fvm1l19pq56533ojlt1sgkuincrg2ltd5ilgjmy5ty8wu0l3o08b6xxm1e',
                parameterValue: 'omyvmigndu722t92dkbi17zkuqt1l6g4wnv1d9wijv1g8r4tduqlhkobm7nwwcz9p9sdwr6st105vw71dwgnf6k4wlwnq6lcc9zhat8j1699xym593dn8t5hbt6njtep9l68qatqwv34kax0h2i5jlmzr58hefyc7wktoznvfk9v22aviecu5i7k0r8mr9a2wdacbr5abynp2fy9qk6uv0e5n1dhv2msw3vxxfbire31cjwixiu8n2431f5pm3a0ir6a39tiqq7j1cdob30dlqnno7s6x5rcgxowqk5hjc0zk3ajlullbt28e7grvvygm7vmbepshb297n9kl3tu121iwcs27wq0l51vmoba7eyb915okpza7dlznch4jmnhaaykdsk47rqdq6md5uqc3ov390tokzchj8vc130avmw4vpro1y8l1w2y9pm7j3o8hgk5okejk5rguuildnwqbbduzr1dwq7ic0auo92vz7qxtpng3qvqeu6xts61gizao4jzirgtzj6qm4hb54ohnexpz8cnxl7d0oiva6pfj2apqlaqv6jg7b4vfaa0goc6qvu0596lhmtryz60l7jkdrvjnfk628vv7ztl09wnmc459gj0i2cmhq5x25epsmgsnxi065oz2pod9sbq9mhp3fn25z3ve9bpdds0fn1hjpdaillwsrblqq8dsmt6wwt0618jrwogtehwzq3px7v87eiyw1gzevynun5bkv8r6wrs409dt46w984v0h4wl6p5c40dnzo3t92edzc0jb8u7hrhsecsn8jtm1q6mhslm92mc4rt7r3xirxb5mqv1rlufi88za29kf09kw7jkbtfh0v0odi4i4ft20rzzqqdowqxyzagepfvgvehnitd476x4ixd6kb327nk249vrwcv2sxe04ymqhe0h55d7v3eqbqnzuikkveemv5m7wbish32dgtu4hup4qpy9dstx1qnuj0u5nphykt8wt351f4ozauwsnhj1yvoniji4q3s3mxz',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'h7pco4ergmhfn9rxj0rzdhoev3f0bgn46u05lmkn32yanny1f6',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: '4325mnklaz7pv0isr4wt',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: '4j1mjuvny3ndg1732l5d5ayq9ahkg8bcxbblhidfjnw5adfiuhpmrc5xcdkhoj09gzwul1rhk1gzis86apvugzbtf1mqcoh2kz0ktto52kzreagk4q05vu8ytq34w7uqi6wl8p7urgyhdda2qi9gfrl2lbs1kv3g',
                channelComponent: 'ajgkjhrdeqepdc0ftm7wte2e8vnp96vsxd0be9slp57dw1orabbi14nkz0erp7zibzqak5qyawr9e5x3wrxchpeqwbudx8y912ydl9z6bgktdkr8k1zbx6votlomwpopbj1r29ht35wopxwc0d4mx7swej2czchz',
                channelName: null,
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: '6qrzrtt7kxlfz9j2kte93qmrb8me1c1a4da0p3w1jzo3w1tw05sltc3d301vhf0pqwdh2odzff457xoy0u337dcota5mech7g36wftkehi9h10ihwypvotv9u9aipg2kqdlb45qjrfodxoawmpypvvktiyufh2eo',
                flowComponent: 'lmez9kmtk7gv3021zah5lthxwjoxqioy1xouz9so0o644vrg4k2kwbc7773ib2nbngjav6rmr6f6v3va4641hpvoeqktuauresbp273l9p77ixw025xfntlnvm692lkes57o55akpyiizotizd4dv3as6mku6mqg',
                flowInterfaceName: '56zb72v6kbtsys7dzipkiwisijjck4uzpl3z8p16v99x2nk3t09sdo3ircj0zpb5irf72dskdz0fmcs9xuo3dzupxnn8ce8h9q4w4651sv9cvkvgw193af883c18bt8c57evz2st54l3lppzr5z0xuk0h0z7q0ib',
                flowInterfaceNamespace: 'wyrdx0stuy1jy93u7hjf9iqi0kzdtkuboqmtlwjjmkghohv0hf1amtao7nkq7shcxhzoje366ndiuzf63g500eblgo6hgats3lv3awc24ivilej6gs2o4lidovnrxgx8xd9tkh3dtrani9v71p5it118fb0bmtgp',
                version: 'a074h7lju3k3vcwuso3x',
                parameterGroup: 'h9ncw7imsgbz4rrtg8gmumzux2sb8uxcgh5prxcu940d9yku1gl2bcwjjxapvdjxeh7ksbiccunez6ejpgdsso1v505h0lwbksoeza1xmw3qviny7yeabkeinb8yk08uv4skttaybquwelbgvaf9iea94lrevcb8ll2rai4vsxrv5i34365fl4l9i1583h21hkz0k393igeqxhzan8j6d80ggashbgu518g5xncnb6smqgqirfc1y5pb9nonvxi',
                name: 'ibqutr3roz52fr111oprg7mby133u81a3amdjabm1hetiobcfdf1i5gtv2yvr51fl1aztma4p6rq16toww3gc6t4q212zjw1aoi97botrczh7pqvz18ovocqjfciu60tzbhlgui5a1n3ijr2x0yjn3m5cdglq80787s4n12cad0jwj6yygohofm8nf7xlf2dwj0iw6jyaduhq41sgbqz5bg205rm1dm31zgqf44xs1zl0eu1iz24vaniot5t6qdhj6nar4uw0gx491idwsr5xnrpg3j2u9w1aq76v96ienilc5324xg7jsb300up4ps0',
                parameterName: '5ltp7rv3b0jhytjzgd2x2hwr27vjg7c25xh0i5iyyckakj9xfuykb0q7hbpahbb3jzq9l83npwon7idklr87boj4dhj5u7l4p5j55m7rmr8njajmzo28yliaxfybph4mjed8o30jpxhfkwb0ifobsdq301mkzkdbr72fibu6pguxfkrkkgqcxty0mzz1gekj14bvfszscd6uqi4d9rq7v1vdve5m922bvafg6l7e2xxinzrqed5fy4gfnh7ndm9heur6gh3up9ni0sso1gd23204eqqmvti5jsp2j39snvn4dq701zhmmkzbyb8w2kzi',
                parameterValue: '1ba8p02w9v3p1n7uduigjcnsfkrl8birlykbtl98bzrhj3g20171g4xbxqpqswafspi5petjmufw2ayis82say5as1dpfijx3nxskpd6u9w01asq59hxsgpf99e3yhu351njqjt6rfdoy3anvf4vwq27cm1kle5709dn56txziz7v3y910aprp9nc1zyc7nzzo3wgg09g7dpfkjp4rizf8h8d9yz09tf9a7r753lnbo8q9554w4131whynpvvn6cgrnptxxz42ig8pdmcbojzqt6rxhzgla1stxunduid00ggclkq9fol4t2ktxd7a07lkrbjx0ds5lk2hjprol2lyblx7k1fkuhtbilfjjjkssx44w9kyugbae6jw8ueqkvr600hiaf2dck7mdzmnd1i8gu4n4xl6r80bea1vqosokqvcb4b280u3iu9enp6nfb8xz1u3ee4pxqjcwr28epfshoxv1vxy6yf48yttuz3m9z7mk6q4knxuklcrv661541cjo3g4ddcybu8cl5ua1ia42ikkqrze2framhy2alx6vao07sjwt2n05e4s1ipacm9k4t9vv9q9uyv6jf0iojcazlkq4khzn7c8ejbma5tnnlpl2ccraw0n1n6tx8stvs4dxtpuk6roruibpakuiea65g5lwz2doytne7ovta17be89xwi2c327cze2uc4oz4hu1613vo3wul1rc5u75uhttfd2qv5oz4lu6uorco4fqnlgqa6lo6llyc9k1n6xv46lzx6tt95e2acyh8z2vjzq5xgvzmz45pa2dzcu4d6rq5hycu5y72m1fyp6zjzcuhjrdiyfltodocg4sksk9u8bv9fd6d2q8w438n394e2j3rve459es5xqewopnf6aone3mx8zag0sylphn21oyyrxwql7z7uuuqm97efr1fm1hswhn9pjo6cb3fqkyop5foge054tmuxqvu3gze1e221y0v75rdzd6j7og0ym0dnuo80q90qd065d41am0hfkd',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'cb4or2ty5c4coocsgwebhcbb030uvyvcpvd98y52fvk7hjb5tw',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: '0jtdo4qpf3749tkf6p05',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'z97509njarsjeknq8irtbfohya0f3el7zwsaile8el9ajzwljfdfesvfo76r7pacfkenlsp1if0b4x38blng471hcf6498v2mi7vm9ldc5sb9xba638rv6hksxl0dpi40vrpcng9msi73whw3eufbp17xx7b73j1',
                channelComponent: 'lg1rbirjraeajk4s8c52pr1klewwuboo4s1dz7h32hr9t51x4eef2kuv8x8tqwfkck5qj4ehdbu1mrn0sa1ofuiweugywi7vq5gs4oxiig8jq0ctqnidcn1nrq4a7p37bt6e50mzr08b6ur8ibmctooofwybxh6g',
                
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'juoew3xuy7b5f2jjx5vf7f4ggij06q8pjfanj7q1frzuyq33bv43nmvstwum8d1re6syb4dbkc8soolvz7e02umwbh3qvtq2nwzwxdb6us81qu9t0qzuracsv77214qsylpyopgffudz30qvmjhe8m4lg0pajyoo',
                flowComponent: 'ahzwi058o0eb4mx76pn53dbbcn9l3b7ypt4cov5u9rvq67kou76pd9j9uc6ser798abrblzik7ilehxt4fq6j4urlbmwzpzy1x6aj61i339w3pjpzx5hza7sifhechbu5pup35h4hh8gm95fcws5ctbwf17jnrpy',
                flowInterfaceName: 'ws8y3l8ai4qh2guegbf0v88lfsp4sa2zb7zchn46ueqokjsgjzailinpfydn1jiupe6yxbnoh05tpis3c1k16t0pmrq6tv78623iv7y6eds9vhm7h9lhi2s5jacwovcwodq4g17rcwncqtiru1hd6ahzwg0ufet5',
                flowInterfaceNamespace: 'tt45m72pstpyt247ml9mhkqpeniycp557t0267rb6khta8qkana9fgrls5tl3uhw5rdbq9km6vim7qmrh4uld2gmrkamymbghkfrrqyaoiits1cg6tbkraof5fcbfyrg1igoephyl41tt22xu6fpfue396uv2nlt',
                version: 'uha8kl792m5l86nbpo3i',
                parameterGroup: 'nqi8d6ba9e1rx30ev01k8scu6fnbo27y8aga78qpkb0azr6d5netp2ydgpkr3zglorj90s8whwvnyvyf80fbqmizcwevvu1i1eebfkmde2dqahbd270x1sq1yvpogndmml2wlalavb5wovmo9kzn26obbp70p6yer1ng5xyrgrr64sfhu0i5jjgph6qjvxju2pqvrmorrh72kbbgiddvr9u6j8lp6zedrfg3liaa1b26uic3xxxuxczcv73moom',
                name: 'dsuzh9be4yiwzjk91dkzeeszal0ao1a5cqhzmylzw48w5tag86syvnox5s4hm46fpbqemzwmixiiikco3v00p3spsho5a6fbwwraqk5judef5h9cwbmm1fkdb307jkcu6neop0vxaaufh8ftq5im7mf40xaa956bt9qeeg0em70nkuptna2jx86t0o4r2ur724caxrrhcazjxt1bo9f4g2c59gtzuvtrpbf6d7w0t7ygit5ds5ovbn9vk3ueffaz10493nte61pnduhrg4nfdats6vs96m5rujh2v6e79xo9p5xrhiwxe7akxj2alklm',
                parameterName: 'ofm0btpsnfnyjdxcxnuxa198u6y78w3ck5oipzg02h5ig7iytnb530mvchllkm184m8nh4ac5sfq2bx87ucxa0guyxh83dy06tq0dtgb1g6r4v2rfrsd9b138khq8yufobv6aatxst5rdsghdqykq9o4tzflgyfs2xojmylzagyx3va034d3dhrw2t6ahlm0opk11gm0rdp7tqwatilfx1o7c44ghnud67ie7rvr2jyxfqz2ulz6jgv4ij4znrn9g6oqoze0jgxtsnvojo94cqbt26ltgsxy8axmhw793epw5pgn870ow63sc9n2rzlx',
                parameterValue: 'vodpm6ppmvm3ph2f6lmaz40szd3qo3i9yuo8o6q8b5gbi7t4mvwso4bu2fddzu3tyyy7cwnbq3zs334ucn2ko0dco7uqxo58uor66z59u1j3bk4shb3k1cbmh059zp6yjd9mrqilihsod4iov52yohbj2npbymgsfugk166xutl0j0e9d9sm8zzpaycwlffkzkl7gdsvsnf8k8zakl1gsokno0x25ls5mjofxzyq8nbmdc8g0wsu9zqvocuk3s8jk9me9sjybdjwoensf0dpv6vdglw8vkgjahpe82q1wgk790eysmm7lbzh1s76z9wx1vf30ax4pnesyz5fofuism6ebyhdhmbf3kvss9ccz5dvx84u44iewewbn44abmswnguf6d07ae68is9bc8n2s68002o3kilgikuhxghmwipixbu94wg0bav4rpsua5d9codwcohser8rf4lk5mo44vg396k3vyx2sy2yu58pgldgik4fhh84w72sk2n84aho5i5r2486rb58ae2cahg61ywjb03x95ecvjg362lgfyx9uwlstob1wt3c86erb212uvktnf3ajgiurjvst3kszijikpghr67x1yv4h9p7jvynrkxcrf1m3tmmg4vj0sg8n42o76xp8lgzj5xvcqh9fsmf8vgvdio6q0jloc7lta965kw2ftnza46ojvwinvx31v9dxce2p5egvvq4z5w8vc6sklczstiwfnzdavxn9wfa0xezon9k3v4vmq9d4gkh9sbg7wsygc3dtc4t48wyne2024hst2uupxqf60wa63w8uka9l7825lf7tw267jr9fmrqbeig7du47d2jjoyqho54pbzr4szc07iqzs1l1hsue9t849t32g0qxgrg9ove6nxadaanptuq9yrxa28c5sprdcr3fw9uoy2w2y6u2awzzup4y2nkmvuh6hpulrp83vg8b4dqak1kuq57scmyrmmaf62uz5j29og89rve15ortw40r6lqw3h9mrk10v48',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: '89azq9j8lsmb034eyr05stsgppjpz4vruj6t06eaxkj8r04x51',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: '7mwanbgspystjo9cyk80',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'pjv7kfkrfjkzhlmbvyv4p60atc67xndzzq3eief4p9sysfes83slgkd5rvhy05568ciu2fv7tmeobvpgrylt2fr9fol1lo6r3q1itetokhqunbdbpabcewubxd2oj4apr6c2ozghkmpe3j9050oorn56dqrb6be9',
                channelComponent: '3zmgv8kd1vwi3rqzg3tlg5v1a47jk6y8eztg4jkd3ma7r97j3rpn7olvnz0sv1c2mljdofbw18ojeugxfsemkvfle9u8lebm18p9la1wapkgzybnf98v6bw1mw2ozvdpwbjf9ku2fvaq05kc9djy0cgyagwqeh9t',
                channelName: 'idhsfcp7tz6dcsrko7sbi2cx3f6a5gop063aqxqogdzxhdvg5z2w1inwxt8gr84co2nbcf5y9zgrp9bkm5cy4ncd18k9xpl6xbgtkozko0cw7owasxbqdh24wbyo7bmdasl3xm92eo7p1zevhsx3xvmejb77j4he',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'sysid6rj70i7e2dg0n1yt3mj1oey2fnohw4gcokdw8xgh16raagje4sh5ohmpd9j3u81anle2w0oj0kndj5emmtomuhddl9gab5k5hlr08z60mc7z38q3o9sjdrsqjf0u9rpma8ly6wo5vbnydbe0nome1h5dzqh',
                flowComponent: null,
                flowInterfaceName: 'mivjutxptbzifci82uozbldnaa4fphff0jeg0d8oi6nrv96eulsqahdm9c6lcswz5x8gv684jtgxm7ndmiuvm8n877w7u03ovbob9qolnye1mcq91vbnx1bms5aoilkv1lel3nw06srmo8ha5uuxk5gq7kypz4ej',
                flowInterfaceNamespace: '2myupnkfrittwaa7xpoah2innxiifyrvyeg3tpvwinus6y84tw18dpwmpdgex7zkd8y17294p58cn9pmyecopqmydq232549onywzptw9xhowmgpwil2kjqqaslnmwrbe1b7zlgiv6s0d60efaxq8hca8pnp50l0',
                version: '0tzg2kva632769l337rc',
                parameterGroup: 'ditczbw8ydf9cefzmjowmc822yp7ub2k66kaobw4p68pc7sz7dkeky1lm2xwm1978ikmi1pzlwfvgc4p9amvytdsgc7da4prhfwclxqgz1cv543mi2sgmb03rf3ua66daztf2megoaexdj9yt167o59i61unb2z72pbmar8ylgjboqw8eidzyivyfd6ythao2x6h0z8i6walpl17yzm98n90utx1j3q4bz0n2an1vw0immq0i7of7j3onx35gkv',
                name: 'e5iuzy5lnivfrqltvmhrqhjglre0m74ckyp6k0sknrjbcdqejlz0nwrfdxfo42xvi71b76sbz365c9qcdqtc6da1wfzg3x9oavdh9ys500gfhjr3oqq4fqy6tja1yijj5unws1wfzgmbtjc0jdo9svgczi5wseq258wkzpo7v4wdopsvpbs5ux8oqtpwssfxdl7nm98tr9sbv6eg5k24j93v8cw3uicps9g0uw2eb7xurlgtx32o81bme904o5h8t7o3x3sjz5elo0jgfxf0591sf698e7ii9lfxnm6wnbc9uvj964y4pp62hdo7upgc',
                parameterName: 'k5adkjj621b2j4taeijypf2l2z6v0sw6u1u69v0m28uvff3qvqb66umtssqyac3eai9rr6cgc0v9c7xjz828pecqt03cvyh49h9vpjwxhy91uvvrwycs82sxyxnz3rhiurkifk07wdbqmpvwgid13shyv0txvezz3cvm3oonxf3ff26ezrptcuec1ks9i8j9dmnl23znq1ygs175vyrv2do7tyaldho9tozxht1dyz8if9yhcqhdfvzn6njb96zt8921pojrizpmc5nhvaft5e3zc92itk0tbly8lgqzbzhg6y1jec8rll27i6hb8iw2',
                parameterValue: 'd6x0qo1t3454hof16o3y7ipgne16k5k9f2kf96n79vldlwk1ir485455li9u5fh5lciyo7ilbdfle7lqarskq45pt2bdsjfmaq8eag97821sfg2ynbgllsizythfm98n1te996ikl2o594se3wcoxp8ou41jms63h84s8inwsfjjjgy5wuryctyf561rglelutdzoxt1ftt0vz2gkvoj000qgdq4ug8xpgkh3e3zpne7helwqvqp70oqpmg0u9hvu64m03kn2kfeeatn87rrb3u1rpm5zviubmtdlfcx6rt857275g8k4drnrxyyu5stdigkmo487pqpoemuoj5disaobkqpyf04zijsznyyhb1vjd7eaxozjlxdw06piyx1dcx2x0hrfum9wak4ik9xgxpyuknous4ib98hr1vs0k6at5ugzd1bw42749zf5sa860rvehwdwaz6fm1cudff5mpi36pts82ciaorhs16o07l0wvqek4b2hekviv5k9maqvy87g24ll2h1kj7rr0qiuq992dpubker6nrubb5pxz2vv692gyf971wi18gi6u1iyz2k42s8lgch9af8g0aobboowk7wi8vslqjblxb3m7k3ecglwgz1unssijwdgapmk7aq3hyzypo6e3bdz0wm10fw471gdsllu8t0fpg3ibcypy54l3epee3yi1zqm9npinjyzzz85gr5v6l6a5ibctn5a06ka31zevvd06kpu79s7w7ssxkpkpyivf28fe10eg5iyg8j2qlxf09cyxsmuh1qoeex9dzz67xo40mae93blonbnmn41076hr9s3yld2cgw09otcdngrwcgchtbs3qpbrcz3ckjidjd1bd81mifxxz1gnijaby55p0b2cwny77wyse5wbxoy8l8eha8pr3nsn0ucuggh2u47tfdn2ziz86a3vvbd9199gldgmy2r48y932zpjluai127v128si7tnx322o93fvt4of11da94hi05015cg4e1t538mq',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'cvhu3kdvoxc0d8sr16kv99q43x39f31eetrtwy1z9mbyz2k2i6',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 's051gm6ebuhbp7zrc8em',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: '8y3768bf7dgwuguwkvu25ljx179hsl76d9zn6ydquv01sgih4pvtiwrmb9ofohpj28jlco43ygne35ste3hzlwemd17l2nvppywofw3yqalytgm7c3baw7xhs93mfxoihnpuenae190wo7604o4t7qf3ezookipj',
                channelComponent: '9i06xlngfn6ucat5hhvqy0o2lba0vip3ap159t4xvm06bp5ime4a3cdte5k9wgza2yanlgo2su049sut03d0cumm8wc5h3eevkspgguj9jzy36c22hasf2y28mqpygwml8b0yktdk4bewjtckdlroiedi9rht5c5',
                channelName: 'z43213fu01z96mirbim4ognzn9uw25yksbdlivejtn1umuxnpzw1smfotwo29liq1c6zh5tlgm9vccto4xu069ckxqq8zxejyq06t5x89hhxsbdg6gkycbroa0r1m75dyaikkg8b5ecikobuivz3dndea6q1yxyb',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: '4z4hke02ycpnv69inpt8swj5luqxam2r16axh0h6ze1k952p5u28r8rsepb2d9nmlgoxh0wkdij0auqglg2szhc5gt9p7y87vdvhpvfzjv6jd924h24zzbrd0ss1h8veq570ju4nbdh261synywwt9wxzo7gp2nk',
                
                flowInterfaceName: 'pbx811iy3jt6fm6fa1cb35sdzdoykm6mkaavscrpgyc52tesxhmx365f0k60za6myhcj6hvh4ou4aiakpplzdckdxjgxcuwh2xy1fhkx7smrwbvkuekk9l3n5xfg20zv8o4y5iymeobov9oq71f7tqjxpwrwd4kv',
                flowInterfaceNamespace: 'uczh4supaozhfx0pc90uelfai1lhsu5lb1mm413mckfhoalmvfg2d7gjvcd6828mlubsa7scf0ndyl6kab3sodyqbx24ujjnxe6t5eburmo6wdmzh1ribumiee1cnthvwck2htz0eq7npxoa2wm61iv1wjrsltvj',
                version: 'q8pyf0byom8e4sg2sgcz',
                parameterGroup: 'fuzf5m58074x357lid1hiraeia0von5ogrenoanspj5vfojsff6zlpa4i4s21jbj7udc127qi3ujei1f6iejgmrm8cuzagvyn2vzap6oz9l6vmqntt9y2qh6t3qx53dsjcdl81ypc3hefhjvg1e2eipptq4rrtzrkbamk65i0xlj844qn4w0yvrjxh5uy1ut17mqyemaqqum8os3pl1lvkbh0306frnp1dtcienrrxl3x53vufkag4ps5xciooi',
                name: 'y0tsqz6cmgbed9p8vcy0dsqcv7zrajd5loxc4qvzsq6mtpmozfvfe6lhbyp083pfrjd315m1otfs45vpzfy99a2uc62i20bbprnnzkpakb340vvsva750es68yo8a872pm0717yk0bgpknxoq65uw1e4umiznukvwifdoxxkf8fvegz46ww73ktmhwlec8tkjr244qatgptt29ns7zbyuibigwxpsk45cb9ml3jwot6x5ubazly13whm5rjwajjr3xnvfz71gghiz9tdb7ppg0febb5l9cvpqdod1nwc2wo86tothybsn3vzh3axnkai',
                parameterName: 'mr9t5hlyhic3e7r9sym106tris40nrmjw1ym3fr6iszjz93feie4soa2j2or6jeg9ihonh8l87wk25m327i1nzvufdv5qbqtug638biev91ksxzn7ojwezujyuh75d1nugerr6gd4xavp7lqpzgvotxmaur06x1i9xsg7bhy2dxswgs8n6mwwuh72hjr9kpmj9j5hl69x62rd8dmhw7olfo4rfumr4c27h5jffvsp7905bjdgpqic2a21lfv9qg71bjmki2ho53c9mlxnqbxq41vrrc382rzw7koa7xrz9uh03kniesu3vh3rw6a6e7l',
                parameterValue: 'gbo0sa7nmo0ou45mr35eb8q5jbcqqhgama7fc8jv8rgqjrn640e3euadkbdk9w9hr702a0ny0kxqbbslacnaul6q67ov16s1fmclvl6jyjp1s595icxqju3pvkasprlsthjcb5k2yo5aobvd52v4ij6m0oe7537zh22x8kporeb88xpbxho1fvxff6omi8e1cdxlpru497sbk5ticxo7qfbkuvn5ixqae6dcqa9que2s3scatdq89263ym8djbfpmmxz6mcpbikmgizrl5f6533kzwja3i42ctctips041cy41x96a81hsxy8kxkz08hxjikydwwujamriu3ja4iqxngg8difzwcmkkb8r1b17t8yzj4hwhmtccmbtoymcy1yt4yegaqvyozzcvkifz7drdzlohrf8imefnjgicogfxj613y0gs43fpm51jyq49r7uh6p1dsltoz0m04a2w8pm42gc7s0rmasocz7eritrdabnoukx9g3681pgslwb0d1d3wj5eznn4501vikm79mxso8hnkdqo5mpsuw2n7ewf0llr3np84hknq1gc72xuhekxccky93d7buu10b5w9loguxqdy68bdamhmln1vcxj1840rrcqdvirwawcz5rboi5mnlp9pu77pmkjhqabvowltjon9n4enp5n2y5m1jlzgobvxxdcj0nylj688i9vhaqa28mh0wz08n3f2zccp0ztwt4psftcb9ztk9ejrqcg9ybi5pmlqydjlso8am9r0omk06arr42j3hzltj5prfu589c2wkbbqofc0t7qr68pl7eq1ve55oqr3ynr3k20ueqtlp8hm2uu7nhmw8wp296bfvu7ripdacf30u4gq0o57ktisldhocn2gbp4wr0fnozfbrtbtts306snjzex9rhvq1plznjlgh1oi9xav0a1foajyeq54v1z9gxmn1w3bolz0ti9dehuq27ptyw7k47i6lq5p114ubfu8qgseajui7b0p59rckel5nyccm93m',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'y43unvm8tx7uwjmvqkdonm7m9mljfl6279je1o2i80wt0oxnp8',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: '9whfq17qtbqyyfdn8fp2',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: '05q0y6klcxsw719o3bjvjxricha5ve70q4vvn414ojfpobfl4z18uwdl5z390x26lz8e4dwrzgy3x9l6b9vv4vk1mlnbib3hiw9wyz4y6w9z8lbzqptls5iow5fbpnfnr665gir85i63s0onkvoprk0md1jab7ao',
                channelComponent: 'fz3fymk7gdaqk23lkxioq5vb0m15n058ndijv5083pfxdajxj2u4bpghbjnquokeubeqffv4c149cephplrh1nez3is3wec7hsrit9m9gmp5k11iuw8hvywj4h7xsq6y4enuq41vt2tzud9np4c8nokrqc00liap',
                channelName: 'dpfxwghw59qdi26vsml07m97ok020m4mp3zeqqyuavaa9o7ap8nvk1x3mivhzdz203ehqkrnheezk2qe1nuap9p8hfds2py90nh32z5sc888tjoob8bw446upvcbbyaq9b1qqpbzc47f0a1wsycqym4qioi0516o',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'u3wio6bh6zqfhfn0pkhrovzwzijhwejb74zd870z3bpq8a99wktau7jied2ukdssuvj20ltapmw1un1fdo9d3j0bjwpui0itaqom5wucqg2zrf97nucmq5pybzpe2kw6bt7e0djin0dzuxabdwz8x3aar44e3pk2',
                flowComponent: 'yz2x5pm5g7a1ynasn5m89x308d00svds3dwtg99l0gmzmolotbc2kdom3bs085j4n3kodh5ci4tl2s0v4xmxa1kq1ut2l5ljxrbw0cynl6h04pkvfnv721y9tp165dej3ql09arjk4l6t2vkziwhubh4y4t9u2ec',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'bipqvv8kxdrqbfaft31p9fo0wodfh86dswt4bqy6mp9kmhvt5wuybiva0vdj3gsy3t7zn7xq4d4dwdq5bngikvj14j6nfwayhp00aw4496693jlobj30mwf6wa98b8owph172mx0m8p82f797t9oc2c55ammovo9',
                version: '3j7jn9yzs9kefl4zrh7s',
                parameterGroup: '7q49kc8h9xot6jdlnw97qo6l2kd5qhgngtr7y3ico1j40os7se2oqivpweuzehe5h7r04ll76vmohh9n6yui2ejzennjzzcupmne13yn34jn7ftb7vywx1fz22pspx7fnppoerjsj0b6eude2aiqdm0w6y3moi5i7mp61uasccjn4350ii9mizmnd7k0tgp1u89byfbpkatx9w4y9da0obynppats6syhhux5wcyhwgo0h1tzicrrbhayhe7vi9',
                name: 'nkm5m29v9o5zf0sz6a7mzu1bkmx2ose77ebtmmp2jcw8qudbv2s089levj503fma597wc8iwil8ti361hafrfz57l1hzmrhb0qtktfl5x6maxlogmmcr9f6xcabso1o6hnmikft10ix67otee7vjt52e5myyxr3x7dfawh710hrsnr5vg3yas5xgwkgq2iddh451aco8jfp4fpqkz0gflrb234yy8ehdv5va23hsnpuy57pkayftcnpwc1y2f1f0zz2l3dr7ozrv2rj8ot4giqn3u18rp3xl1d07njxhg98hchd25sdb7wcsfzi9c1d7',
                parameterName: 'n1lcy7z4vn89nqbwzynbgvnc02v6jkzgbkd9u65ljbby89yq05pmd8in9d63qihm40xg4xdr28cxnlbb9ee24a8q8iuedn9z75jm5ehvx04iu2zsqdt88l0213g8zdsjsqwmox0sjcitga3hr3gnta7sgpj8othszzxewfi4p9b4uy3mk8svgpkz6vzztgnqn91m8xg0dlkgysqa3nk31qd7kwqtgm6zhmrp8c074r6xqy8toyo6mfsc1xngqlu89it87m5osk8oltra7tf0operponk2qthz1fqtb73h37iokxvujgma71bztan9rhz',
                parameterValue: '8vwpbwr1ufbyazfc05j13tileqfcmjt21jyww1o2l56xe260ms3rgbof0l6q2rd2fyawthmj4w9yogba9mcm1bgc6d80ti4pj1oy3k4sh6mgzoim8tdqks682bgdh4f16hvqis2v8od9hwvxv51f42ob2bjljpk97tjd39uixpp8hmkgkr9xxvixvi6wqg7kvr87gzugy2ybwdhoxjwl8p23tv0exyui296d5yrzgaogysk3bng1u6ozrkvhtgaafygpoo880b87hei2efmvs4zpu4ixdhl0ig1mdqz7gbker2plocv06c0v19qv31phpxenvvjyjyl9t23g66o1lm42j8yq1bneq695ljakhug9md62y2bxdxqkev5j26qv2ac7bsjnwdqdh1nuihaa3x8zogvj1jj2x29yvy3pkzao6o5fxk56b2kvnitvyrjcfxojjj2nnjpik9yp3htmyp9t7grif56i75v7fsj3tb61e2an9g4cfasl6jw7dewajodtwctydrp53e64lekxd02p8bylcfjnwy5qiqim50ir2s8y00rndbwjglf8vv53t8ylulju0vdju9013wf5vveo0n9mkkazgvl98ywjlj9jxsnaykf9ay6bs7b14cd6vi4wn54x38lcig5bcrgj6lzacq31lm4ajv93uq1e92e60ehderglziqugg1jfnf24jwfxjen2v5chim7kfvmvt9nonr4vopvw87dzjd508w7jsweqnbv8k62xsliva6l67iddofsl260gsxaellp9nxzqmqxukmie9i2mv4cglfvot7xloxm5plb9z2gr5jtr72j6yclohv1ugnlzu8noajg24wdwcklsyn9ge5y5fzrt24a0xz7vj749hixuzdybqev494oy7nac7m5pr9jnewf5lwq66j1jxd8rh82wtve5mgtlp7jr3xru0ffs6sqgkoxk10y7iie1ve4yoztzjo86na3okuwksaksk5e9mkk9h2k04gebgxjbv6d3mub',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'r281sbcj3zfi7bpwbo9th84i56o8s03zhxnlshsllycadq98tf',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'psv3jvmm9v82j7nehfrj',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'd0hm72a2p8et9uqz8sjtgu6bdzepliyijb2iyfry9ax0daqk3tf8gkyazkdp4ygznksj1608tmp66o5pfo6yln45drpdoy6z4nfi16tmed3gmi2lfc7somfp1kn4vaiolqpbwat0cggxfgzy2cdd12f4wxi0f4zw',
                channelComponent: 'khag2e8d0vvx24srajkvbh8d7a4vyqm4fh84u1m1okqzn78nbgavyix1zjfeoy5uolwhc7iqbjtzgeum5o5tg4lorwsg3va4kpn31xwjz8ozwktqmlh3pwhn99rcafwu8b0mk3wr33ozh2cnw3eo4j1cfo5sq8kr',
                channelName: 'wtw1tfbzyh9i6vjd45uoqc9h426kizdq32ru9pqtu7p3ceh1n6938q7i2kki6n64rsovhrx6vj3zqui81aw94pd22xk02febr6f28axq56oy9y7z2j9uhmiwfb1pobr3ttpq63nhdpfdgcomk9q0tyx95pk4pel9',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'k2f0i3051q50gaxevoar4zop1fwdfg9fkimrl2ngjhm1ppqu2nel1xzf2v7tn3k918ofwxjc15n01amfpg8w26jtubzk4bskd1bugy37edm8y8ggofn26ip5p2lvykorgkf8le7hwqmneur48b9e940ofe53vwc9',
                flowComponent: 'rir0h42fhfbc6ww7pb0icb7td61ixp0vclyyk0tnxd36i8a73l9vn7n2bwompvaeu8e3zgat8igguf365lmbd5kvcsyq9j0z21l34lhvr1kpa9nyp9swbnxmej74ofi4ur0e7vm32qfpw1o5geu79hqgbvq8ixu5',
                
                flowInterfaceNamespace: 'vhjp8e454f3bzr3t18hgq25b1n0k2oxwoksvrfkk4arabk155vc8der6sfj7me8w9rs6vvodf1ry2ga8xn1ymjysyu8c62wbqzou5b289mld0jlshc56erugod7kpqoxpbe3xh0foo9uo6c1xba8sbwm34et96vn',
                version: '40hpfongmnbgitgiw2t8',
                parameterGroup: 'u2yj8u9vi4g6u2eszaqjgt2igi22ddmm474tnd3nex5emhp2p7ldvnfc9qhmq8ruda5altj3o5v8x6iiiiojcfsqxqux16xlh6muis7n97gsfk68ut3p9fi16n9la4ikf24xisyszv63xt88x06fafz67pn5jh8gvgvlqvyf2vt45fzk18hrs5ke9mcggtxncde22l8hxp1qcmuxyzjy411376pv2j3h6bs3vagiklj6wx6nqdbklk1k2jrfu5l',
                name: 'txewvtseajmoevypwiqkdb9e2rwwxigtwxhrq4zaf9h37a2w2dp87ah02ru43ffvz5nde2pznq5wzag7uep705szj2at4f1ml8vpaw6if98odo0k8ku1c76tsxyjtba8wc5qzwjqsq1q7svcfa0yq5282gpghhliykf83qo51n9w2ota958cqsicb108rsplvspo4futhf5dv9083zffwblscm4l6ns4a8yq16fy4w81s7ax755zkcbp20byzbvblre4ejv6ru4jc26m25x04xbgqnt1wuc3v2kqrdaw3wotop95xhf7s3l6rl1kw5ki',
                parameterName: 'cqiyk85zqxijvhs7a1zyu267xx41gvumu7r1amuk0x0nm0gf8gkl64j5rk6e3zs48behx82z2xfrz4zqfauq6vnhsu9pnogwe6145swb81r3a70kjl9ki4lvsvul67jyqu7a0qbzgptksazzhkop0vo91ir7h0nzjotolat5eneu0h296ybazbw7bt9cvwc8487c3fzsyiqv518eywinchlp5j4qa2dph7o490pgvwkzi36ayt37c8e400lgws7bep8nok71clhvf8evcx9ixhxwqt0byojt6h7diqtla515owasz23bg1r8xytmfwpg',
                parameterValue: '4dfpojoh8f3oy9iywjwr7qtf7m182ufpqz5b82i5wn43x9qptaqs4thl558v5v7xswhg5pbkpa03yi8gpbjukm068tdefuzwzuw33tet1bub185l5tcis7dgpd2gab1an4r1aj6ld7mxocnbl7z1ibp32isj4l03eotpt8nhc3r8cb8lvn1e53a0lb05why4c6nbimi0bx6owhq3ilyi3d46cv5v6ghta1k2kg5gyv8qo3mb843rgd5bvwr7jfiollzgaghit5vpvc36cuavvs3jz92h470pj27rc0j6omnyok1045gx4r3d5f34lt6vy87up4al8z0j6cap2llojrev58dkajd3xx4zn68qygb3a7bq9o6hgrqg8dd429j2v2szn6hgn6s5ctopm7nl7jvefvwavzsorhgp4afk8o9vnj9zkb44m2a8gg3tgvlu9iueinftovc94pqmp4gzjqk72n0oqi993doloupam4czm3qs4sp5vgbdcww1vr7owab0xnmpvy6ruknm95zdzalx3dfx2cqcjr5kvfviju28joefo8ikftb7nohpzz7gcmacb4e37tgu9nv9rb1wv0hiqlc6x35qnosh8xu3hj8jfwua6dwopr5f5r1evd27nndx14nx57itm3b0ngvmxhhtj0t38xdp729b28h27d1l2iuj8hwtm926q4eelnws9pru7txmxnl192bufb5rqfflp860f8jqyh530f1dq8itqe6qx28trynn8w3n5acw14a59p4s0dmyxz822um4nfx64swmrb4gfximop3axdtwkqqzq3fpzb5o4jwx6sqnqez9886kdofbig8pij96u37ifnurrnbpkwpq4qkt49k09lf8uvul8ivsw1csh9gxuz9l0ba40ukvf8n6gf0ea9ghp0gmom9007ya25m7ug5bl2doua3kx3jn2pm3s5ponqhvbngbvrldxcyi2o9fbxgfyd37nz7aiv3ytmzo6ozdudxeul81npov3jaq2s0u',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'fb8qa1lfgzbjys1nib32vk7eyua3aomvjh16lzm0xcke3wnd79',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'b7ykfsuuo9slguvuao5e',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'kw7e3u63aczvpqufur1ar16916blvoaj56vlm1qyucsfutom90dsl53okhwehtesz2r9q2fjjt1gedhbhyke7opxn09fo5c16cgpsq39bgetnvz56ygpabyrjzp0bjkxewydg41qacag1y710gtfb7brxmqzokku',
                channelComponent: 'fzim8vsxgywpt5ekqjnoibdlwmcm9uogesyf7xcigu3h7pk61kyg6eb925pg9poe43jzvtgqj2xrom46mgt5lkvap7poqkurftmjya2v8d4a2u518gtyuozm1si65sn9utxu9y3oyf7krar4dm08dglo653hphbs',
                channelName: '3kmpzrnkmhj4ptvcpmgm347gvdohvyhdsds226yv5kwzmeuq8kkzjv3ox7b0mpqurkbzh6ss5plaisb9lg2ic3jsylglo69k5a1rworb1lgp1frtj5t4oom9tw64owherf8chx5sudpxhkxsbw3swv7cx0m3koaj',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'zd8zr6isapmwysffpg8nsxusx5e0fafzqpujoyob4qtafi8a96ispvpvc1t16mqpo6zllo8s1zg9y1vn6bk8atlw0nu0okdhtbhz04v5v0l6st5ffztfgr6zf0mkuhmfopc9fxexiuuugvhgh2qhv5mrghsin94b',
                flowComponent: 'wxfi436lhffvghqlosvtl2ubtqvkkektq58e7lye8dgdi7fiohrbdp07af1q5kzrk9hgy48q7j99plzif910cla53g6okoecbc9v8yfvpotwofik8mmh3ivucy5jo8705sita53l19nxiunu1n01j4nb4vf3jom7',
                flowInterfaceName: 'f1km5xo3212u0cqn5uj3g553czjugd38df3ih42r6fpv13usb7vigud8fu86nq4b8h03dwp39pg27lfdb32gvwkypem8agvlbcxv9dy7qy07a9hvbpcls8js9uax08biyievt7prpitgpvbrtpnsutxmucazgo3j',
                flowInterfaceNamespace: null,
                version: '1d8ppjoiv95s2tw0hqhy',
                parameterGroup: '1oio2ju620w8bz6bj4fxq9fg2e3vpbr8f3kkvy3by5hgywh5d7ye2i79e2evtcq99b7v5udvw80ucmvrg3wb21hwce5bg8bn1gmt68je1lhev23hqop2hje1z4jxsojfhvzi1n6v2nfzfbhpvli3cppjxfran9b1y5fbp3sbpkgvh1kn185yp3quqs74vsjyqo1enc4w3qyvfp7sfkbjx9vasl4kj8va65m6rcdmvtwu5883fjqi27mtdph3vto',
                name: '6nsw2o1gdchn630ph76iffr3147eqfg491tlms5ut4ew7su7r9r3ost4qfgh7v8182go0dfueui3951rgi58df582pbwrrs127cy170hgd3ny2fxy4bchpnflvk5dd4nx04z4o8469rubuk5rm47no7opm3uuf2o7ahrjx8dgl8c6kgsll28c1ilygu03xk87ulnr5sedwve7z39ygaosvu2ixq4ofqsilprtjuiqo2vke98zn9ulmys9emzbxgtf3bmiia27uxp10iyqvk2tzp9e64exy83ojpb554j16jkz9uj9jo4nnxxllc2q5n8',
                parameterName: 'rggop657ysdtr0p7tmipejugttx8jkn0yuxy7ry1kupefsytyxxw9ydj5jl95h7yo0ktmw45pc73nhbnoyohj2men0oroymfi39ukcxup9thq7f6ue7p43epzi845fcq85o4vmgp0z68rf7lu5c2z1hl01la1mn7s3ffhvqj1bkqj8rhx8yfju9f2v4u8g7j0gyeanh5izvqwywnesyeztjis2pdesqltrn76kyrek781rr5df0pwwaho19wm2op8u7q208d9c138fzkz388a15bi6wz9q1qt5dt6llsm3ke4exj35vk5vttzknmzsxp',
                parameterValue: 'pmf4ih9n9qtqu8otxh28nfynxf7cza0wknt9drjfyf0lhhvau2rwgsq8rtnbgjzuc8s0u034wjqt0zwlnzgzzkbcjmvj2o23aptflto38iyhy7u347cmwnk7c1bvw1j4ny5k0f08yeo97er6d3ng75ex2hd1tph77xyee905ts5notv7xppcdsoemjrzk6f0imof3zph9035oh4xbiprez62ganof77or9nk73d4xv2njpvmxmyrym9f8tlivk7f4s3igrzwaiqisf99mk1pm141qkom7kwtygxvv4a310vjuihfmzod53jmhheck7w87zasy5hr0qvqq3nzqopog4uym42qw41sf1pg7cikk3o5bjfkkpcrts1wb1mq17dgw0b25irelcsuqk4145fa97mt8ei4q3bdhvayvbfzqqax70b60upggazonkw23l39yv6p5hepgz5ycfk9h9kfqpnevxsqxergwdmjj73n65gzbo5s1sirovbcptu41ey0kvn19ufhno563s8tgffiirlxvqw5wwpwbdox5ky2le0yjyk5zi90j69eo5yktbop8epts9g23hwbeajmbs6942kw2iafyjjqonfykcse2fplddqm1blz9upm6alnsum65lu3dzueq7wejhb3vntmsd2aoo1a69tlbukbsck5r0llrk1tp5j2qd0ydz4gs2qgjtzm2uqvd7yaqidzugbd0qwrqz1zccix0ge5ob6zcl9or2puf5j3q3uuppvkylb3fgww0wqpcv56ow4g1q6x4uhqr1kfbid8nqjgn0yslh5ilfldmmszi3dmczl75hcf28ciq10fcf3wz4aqgveky375rt5f8gmkmjnx3oy4bor9kbp9osnze9zvuixnka9k71dy9jz7yeumio11byfrjc595zizadaudqbygwxbzwrlahhrcnobolqpr6bgs2qhqc1mxc2y01e0kuf8yv1l5ok9m69rcbgldk44dshvn744kyha2pctnhzhqpj2dnxa',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'vr3kfwodby3l88gq15imgcijf13g7l2qht86y9mcdyzpy48djo',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'fqn1cp1wqlq6h92a460p',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: '8fnlqnd30w4walc6jotxq3nxdm0d5p065twsd8ugphn91a1667gejzuyr4ouwuo2ju8haftghbqmydwxipxh8t3qxzs6e8ovgzr46m49w78sc72uoyy6eruuuiw20slayppdudjy00bev4527r52yqcjdsp4gsf2',
                channelComponent: 'kd72iqtia6uzfzj8tnfyd5kkcpl4ro8ya142z4lrdgfti36ie41zia0mylxt9s24aea7ua37941ltaq5a1pva9327jfzvwxhrkkdx4qb8ykncujzafbnb0yxvyl7ffvi67epyb8v6evsudiqm1362ggwz9rgt4az',
                channelName: '4q2p4ifkldnaijaaritu30myb5mz5di0ilq2rklhmgm8dcx4us03am8qgurfjshnsnslaisa9wpms5vsakh18hqzq0cdw8swh7ssm7u5mqraptklux0ohykwr5gs3u7otshg9n55z5i51cg67bd9l0tdluu1car9',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'ckcyfput7u6u6jram4c4reblapvmapfwk700dvlorc8bjzpgf2boax4xlq3vdxgg80kyo1vyvodyg7l8x717o4oxl177y92u9izpirmq612oqspsc1o90j02nlq0xba56xb9rhgyogqm6rjlc3tu3ufit7a7v85y',
                flowComponent: 'vcwh4o03t1vxxcbfhy73i9198datvtrxjucw4tdokhmg17iax5116jk6sp3ctyzp7jtolgf2rl98wgndzye1ic54ifruwxzhqokgumhl0njk6dkfwa2qibldlbj2keujb2akbmxe9xrifnx2tasxcmew8o2e9qxt',
                flowInterfaceName: '914efkpbbm6m2i983abetr5zc13olaq0t5q6tinjbdp6obgknxr0sblgvsvlzbm87c34v36119yf8ztay99348is7z493bh62fzb5vwom7was3gip6oangv2z5mgo54xwiqq4yffshttyi9tuj9833fytr6ne5c5',
                
                version: 'a7tbi3kxyz3ul0hx2gtq',
                parameterGroup: 'y2mq0eygf7wa0qc2qv39r9aav4kddx5jdppf6tlajpq8smwdix95sblqmp2eqzg8fx1hsn3d5257wml0xhi1z2ph3qwpm1bzs6qo7k51teytvjwzcw54zgflm7m2n2jh37f36klpusxr4b6vgrs2t31oipsg54jj07l5d1o3e3nhawwno7cka4a8bfje04yrkeym7tvsixmrczysklp3j61xz4obnt2cgo7b55s4gkd7osa4fj5n8kpoq77w19d',
                name: 'ooc2wfujfz5hje4z1pt08du84j56wt1g9eglyurioej3r5o2ygsc4c91786ema3t5tjnlhf59shcyg0a9769ve4aru67s3ohqj1yz32mz6c9h14jji4oq8d6pnnscfnh9ran7ta438k4qwaj7wc5yd0cc83tezbhtapwbd9204zwwqg8fpj47ljb40jc8e5rougdjjac22iyejw6gx8cut8kt40w4sfxvek74tr3v1kauxb51f19dvicr6pc7uvnam431qdat405a51fw0xii6s86w6pl0utpp0p3gdfijck7p6z2b9a878jqzc084uq',
                parameterName: '08aq9ex8y18204sxuoqttyqnsy0z7xhxbpluuqmxctrrhqztq0dxc9g9y17ydux0l9c4rhgcmv5x610ky1w3v54ri3q31scnlkgw7kosh5zrho4zyetbfb00fpir2nuoswtp11o03e1cgjvbskeq9zvzz7wgwqhci9oguc5ajp1dlhk3jtjwix79i1xhd0lwiu9nok7pvp8ra8xzkfjzlyj9y3lbsyk2axmfwyvo9ti3uhbwljet3qlekqxr2dvsg2zfpc2dtpvmsj50nptuk6ve3i7qqbrip5wof2z7qczr3tdlxroljuol25ku1473',
                parameterValue: 'lj1y4t1sfjwn2soaz9gw9vp5odn34zrscpikevk960gajqtuiuhwcs92z074svultv7qohbn1xshjje7o3c5zhcy9ultlrxsod0vjeljkk9iddd8wm5ij3jmej8d79ztovwhct902fbxoz2lsvv0ce06rtcihfsym7je8iveqgvpe6wlazw2hjxxiz04hk49uwxuxfkag53blig67muvj2bpvx8n18mzaoj9iairq4o9211icihk0h19ctbt3pw91vq93n8y5fv4uz1ki33vxhm5vzgjzki3ocgsomhg9y0floirbiktda5tyllfeqmib4206h2b6z7zg6myso1vl5heacufgm02qmv1u9sbjzkqsqtpzdm7u2l9577jxqa9443b1587fw6xa2y8ejtywzeakbestjfol2u11kdrkco9ywfy9kmk5p3176n79829p09qb2degpngr0upr0vmw66irerfw451ggjvyk3q3pr7020ki4yrtw7ifn62lcn2cx2l9xr29bg6i09y362ovw095bxluu50fli4blirdy4xurpquooxk0l17yy6tkxuf2n19krpzbxy0ah0j1ursbkh1i0x50aii0xtfdao2vj9q53pjuadg45bt8mcogwo4w1l7lah30rsbxqko83nqg04xgsp4fjgz6sg6jhuse0gz9s51mwk4jb8wvo0rg7vovvy684bh6f7nxcx64a9l5mcl6irr81n8e1d675jwue9sbgtrx4spcz9hsa2awmejum3f9rgz5wgxmf3rnad90s3i6tpt4eq8dpaa16wyvkk98ee2ef0fg6snkr4jab6n9y2fkl8zoqatae5cua8l4f77shbr29fql3zyvbftjjk9g400hnyxst94pjmob6k9mjwulakwo33wehrxpqisv1hbzhpwetmak0x3xsp7wb35pw3jd03zzyk09q3bnambk1uon362qe4cuiou6nkyv9s6jkw53o430fjqx4wjcp563jk2suv8bev4l1zbcba',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: '5reert6poza5b1aja9940zo2p3x0zecxwz0s8bgrbts3jx1kkb',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'yr846mdb3vuzozwkdzbs',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: '3x7cu2kaxfzitogsys6f8dxba68ixv288tr7zag6e4z9ege0mqhj3yx3mgkyoryf5wkqvp5fyfmtqiklco2ekzn35gpr9r8ydfxur69o5mnrujud8h11zamafapb69g78b4bb2xbdllg2n90fu85vm8smqylbqu1',
                channelComponent: 'nav6nxg6ehydjatiepw7gx34q9jichncz1pixfg7r2iy01orlaqj61m48grjqrr2ltklz2euzu6kknnu6yutp8qcgyxwj3odc1330zj0077xbdu7zjmngefnbui1dg45znsez7stdqocl0buwi0ry9mp7bp8z6zx',
                channelName: '1x91hcf82mkth87cqv46sl76wbg3zlh5i2o168ybx3l9hrl5qx71dlrkkmsx27m9aoecz1ns1s18rysuii045hybl71dfelc227y6nkiotik9c3dthznxltem4qdru0t0qhs6kzaq3tnsfnbh3yte81exlkukbmj',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'dgzu1ldlkxzt9qizikroz0tjyjngwfb68faaape51c756mz9miky76ckqlmjdmr856y9c64194v99d8pdfvvlsuktqksouc5jz9dirdc76u6t5pk53pwkvlj6ov5vkpt8vkjfp4qfc8shkorlpwghs6wtdkxlppg',
                flowComponent: '5t612dseq8rlqso3xmwn84d0jg0cmp5dpg4vzmq58b5hivkzqq9upk12bzl71sn174ctaggaoxve58yg0gwdx38wktk5a1sh6glmfkhxdim36aeyztkqcrit5daktaaemxpgj41cidt5m2lmu9alw2do9s0bl311',
                flowInterfaceName: 'khgimqntzm4xcual4szz4rf2eguh1aspqqzaceurg10rngc97v0jurt3x5hfi4kv0nvlfjwq0ftg10s1rzp2ensglc54izew3ekhr7toh3loeyzv6m9hpiwli6rp2yrqoji48gm0tawyxlsej5cq4aj63p8mns8u',
                flowInterfaceNamespace: 'ukl476b029bhhtx0yxpbks0qwycqu6lc3tnpz14pwy6kotva3h6bikozbwldxi4uqqhjwiljsnoxqok47vj4omqp6skpo2qws7c2eysbneq3lbssypazmmmmw6jehsq8ysjh3ed4gg7oxa1anr364m2uf99esi70',
                version: null,
                parameterGroup: 'bj9u4vfav3b1sfbuq62gkevdvhnyff2mncgo7rdjnb8u41jfckj5qaq7zuld3rdefk9g8ak7gvbyyxe58faibyt7u0jmptu0o9fxcex45qnujpbfiahlakidi5prm0erey95fuswchbbzg7n7hy4t457r2hqft3uu01ud3ga0hjktbxk33963t27of63152sg7jiw4grjlgnto1gv784tr6dugftqb2fc8yczub7f91xev7zv0py2xe26k3wrsr',
                name: 'kp2f0ni11mwpu984mjg1jixd4v3un2d8lo0vbny4hukxi4gixupyvtn1vi30xz9e8lotnw1plv9aotzeezjbgtqyo5w11qreyg0259j4modir64ya814zz1vn3q0w3fohbstqoobmgf8u3sees6iikvc09fi4zw4g568yl6k4y7t9v7p5v2ggkfk7ep2xhcqwzl2fibms583bj1xflp9epesg27fjnk0s8n9ok94l1n5hpcg686kt0vmqz0ec303o3nlp6q0034uapxde01im15g4hu379ooiw0i2t0m6vff33cjeexauvuku6vsk5wc',
                parameterName: 'mg745ihak7h0dnch2rvvrlxufit26c9fii9zcvf4bdkw7b1x8e4vvzzi80vsvfgd3wftnexb9xdu6013yhnaa58ckqu496exlk2p8j5ssh8mc819okxyoe75w6j5t4mx02ht3wh46pud6c2ksuokhbsek77h0h02wvb35vphpndkb8yvxapxp2ybc6p24t5eksr62airfrf96hw3xmqo9kny5n1cr34tr42zih1i8zq6rvr86ky3ecwygsdf0fnlmq7oeer311mpk0rkag74gxb5a2mjt44b131afnlk8omwwj9yc2ovcttcqg0vg71k',
                parameterValue: 'mu4v4f5rn000pcjsw939nwuvbszyiwojx6yd1c5tmah0tofbarizm5ggdi0aa5wuni3d7oifuz43hw8t7wfsk941awzwecuec7v6mpmty93hr1k67wbhwdt2ten2gcnv9m4052230mv90kgm7sixu3tj83gnx5yvebp9cihik47lksmkdjfaf7hftf66qqkrg11hkvb0wpw01jm6n8g79v7vp7w6b30ctgvupwunkz8brgrll2nu7evifujex7vy09fcizbfo9v57ibmm2i6de22xcu2buk37iy5lct6an2v6gh1ais9maa5tcglz7yfnn3k5y0wfxqx2nstizaiy1tajiqdhq8tgtj63jdbjuy6zpzujm956twr9o86jbjc2zaqjfjlft4i2g61007abghl66w5frcwf2ndsok6pcx21b43i6k38hf1pcyabhe67zqrexkrgkgbxedzp0jhhjwqvs4yothig64crjaya46db7csjd3itdf5ow1a62t45hdfqsupiq3y6ehlvjp5b1mtyszyz2odu3mcuhsq8st8n2kv5ioyah7j0ndz1l3lz6zku19bkr808wjn71518xt6hgmbgo76x88934p9hh12kc6r0mu70f6bz5c50kpumjy86sbfixivsvaum6glbr8w9a27xsmu8kannhvqwb0flix61ihtk48k6ur4sy57ys7dd9y3u5z6utih02x3671e31j63awdanls6yaxltf2ubskf7zlxdkfx2nn0ze1ymf1yrmj0oy0mzy4r2vmkh9qv95jz96sbikhjfxw40i8i5rjlhwn5csduee8vp6dmlaf5u2em88lxoyb7kzxtger6j702z4ldnyr1fwdxc2djz2s5rztvqesxjdw20s3ri2nm9q4krqxodyr5jiknn1mohketezkruixsvqnkz0kikvjcvgz6zajzzczuoka67ednk8hi883pizvyapgyfya3zjcxpwxnqgq7vibbakms89wnihhbynksx5gohn2',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: '1td5pm88x66ua2v1tihnes6w783x4wbiahqb8utl418da95yc6',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'hj4u8fjd8rrpxpf0guzl',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'swxt8qhmky5sapfw496625ywp3gtjv5a69ci58d4xx55383n8wmyfsnyjqaeguz05gokwaif7glhhvfaidojkaq76tgd2d0w6wvxnrnng2vkqaswky33fv0wc5izvdd62cdyf4p6pf6lje87446gtcr3ie7wtynu',
                channelComponent: 'xoh11400q3tpwu6sv3h7i6s2o2jly2hsw98pu78grcn9vfva54tfyjq4ykw9ohqawgc0du8smy6y26eci0sw8wnnql8s09yn7pf7edlady7nab2lyy0ow6p6yycz2swy2td4m7au7fyk1jwq5zvv48z3c3x94xjx',
                channelName: 'hdp81tw2a6lfe5tqxorv5kysgg53hnunqr4aaqsdbytd255spnwh3f6gn2sxu4gjst9iwodxh2kyomslbth88mp9ptm52bfttp3l5r0anm9h6ppm3x0q4636axw43ekhasy6zgpchpdevibs9wef62dkta8qtk3e',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: '5hn2gfo7cypoycjqxlar6xuki3kuwhckfh5ztibsm0vmztf0xwbshcufw2dkt3ax3ifbg0rqhqw8gvzxl4i3lbdotpx6diot1waz3k45khwe8g78phd4gqgmih1820hjtcqwru61gqrfdas266v3bz9izqh7ogl7',
                flowComponent: 'llfb8nvhcb1diderqbwlz75e9w7lx5auw4w5hygihxuapea8j06q621vy2akughmj94lh341ehvuh6mx7pbitfjbwm3s7yfe84gm1dwf6ism1wuf24irsc4yfr1rbu87wvnetiyo2lopz88ycpxa7dd1c5bujrx5',
                flowInterfaceName: 'zoj2914o5nhn74isuz9nw3stcqwm0k54qqdvyqofaj0o0vmrieexgm2yrvjbmmdju6rzj4tt8apc4y3611zolpvi9xb5j78xsehcf6tbykkl1fs5uq9bolixf6udolh27ek19267p6z2t8ynwdirtv05ku3oz1f4',
                flowInterfaceNamespace: 'c3z0jsds0h9go4y5lwc9ac0axo99tay7rgbcrzlyberonmbhj490qtjbfib1trekjcckuluh61v4cmu62xnbc332ntwrj1uzdt6kwd84r1lrxdtoloqkbplco8xcoi8xhsl6x2k9xce6gb9cyj6tlap8n3hi1fea',
                
                parameterGroup: 'zos4ath341jk51oj18yrr0nitto8078265vja3s3ehxeyec676wcqpma4ob9fumhw3apezf4wf2pzk39ndo8khuswfh6fw412ae7wxd782m12o2gvywg1899gjc1hgpkg8gwhr2f1qchrg6cuh5zx65niuhari8lmwnc9nb2nm4nyscpu98eqvv8gkl963yad19ht7ppy07x1lgzblajx8mkdpe6mh35qftpru23011iujjmeof8g4yr2czd0o1',
                name: 'oo2y6y8tvtc58mxx4koh5829suukml3bls8dqm22ymc9vsxbu4jolwztojyhosgb6sydzzmkrm1akdrcrrtnvyrn7e9ys56o0ku5o2xpkvq8p4np34qwz2gbrqjpdfafbnd6v9fl78c5j5n9uvjnn3vzbwiijjm650n6jq8vr0rjaqbnqjc2wapr6q5a97otv9emtgmy8bhfdau5pqwjkbrbabfy08zo99jq4ildd3u99hz5qo9wztmsuu7892c5qpwekemfd0oy7c8kthhzn61dq3uvf2vfhinkh0k2e4f0i08mpr37ybld85bxzh4h',
                parameterName: 'jiesmsurj23ts66v9ue36elnxf2v9f7qmfur91nm7owm54knbkojlidbgr0wbmg1rslhikl9wh9m57vizkvxzu5lodvke3ehw9mc2oi1y8tqxoazft76tv570y4btrlus62tld9bs63wyvxs1mu9r5pwhytlfb07ydhctujqtj4mu03r890r9mo8g8bjl4v1hle0fskk9dbo3s9w4cu1ehmb7vldu8u7m53ls2skuc8ig8cw5f8evxy9kbpngk8qef5db53vujtqpwy759rtd89umh79mi0lwunfgv64u4duqs0hoyr81q5x17k1dml3',
                parameterValue: 's4ovvpuumn2y8xtodct236suozbstyvtgujcgq1y67adyud2fwo608fe35goocym1lxwxigt6ralmyvcfpwhvp4sld3qu1llfnswabf69i3xtfg67ntfx8ccx7c8lwupaowtfxazsankpzq9hs36u5lmxrbpj2qmi7li0rrpgsfe5huoo0r70kp7y28lf6ko4hed6nih8m2x3mnb0cdqhn3h8q8hite4i2h995qiin2s0c1psenghezekzvrcukktfi0c6wukoetl1zrhv4f1bevl24oa5bjc34wsk6yf7gkgynv8fspn8zdwexak262vzpwv9r3vm4hpomc5pd9d01caom0iuh16jszq8tef996hdeplicerip3n614mtrlsg7kxd5x8mpsh5m7a4gidw6jgc0043tsqb30888ivkg9jrohozpy7bap82prnn01zdodxoilcpdps7qsjiddhqg81uhw8pjmhlx9qmuye7ymfx8vrklcri23pllnwznfcnklxdj46a8u2gts49zax17g2crdszrpj9kagdg6txhohne7w6zv39ozpbpxaa1s0oyovl99g3otxw32hpi9geh1a6qwppdu4oqzzqodx0iyivzhcw0rbtxx3kx603ldm7wkkw483ux6o86z1rzhf85aykm15z6kv08yckoyi3q66nyxdpezk9alaglux6p07zkeolnac2uqvk1nee0gezkeut62wgoh7b4oucpuh2qczw48gjkoe84buqr7kc3vghhxlylh05x4avbhi656qxokbats96qfs77opwqtp4cjv24mw80et9033ycy8qiivwql2wztb7p47nnjc6nkbwzkdff05rwq9bttkksgo772fixtobqe7f9t8m1s0n35ukxer6v39nh54k156dc7rxn2wbbkhu3j9qu2k8zs6kvn4xjcapkeb9h6u270zaxsbwhb021sxl3u1zxoniw7dnx2v3f5w3gpe2gzu5gy1xbjjcb6jsh5x8w68zuxfc0m',
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
                id: '1yj8qdgi2tw1aubrggu0act1f5deidkt2eglq',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'gax72yo0vhmdpe9fs7mypp4p3u242q2bj3j1dbnv916x57lrvw',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: '6vzkyu5u2c37lzpd9kq9',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'n8amn9tazccip88xsnjebsmg6ep1h04j0em9matw4wamlw1e4r03wlxxr00gtltabzvo0m84bl531zaex0rdeetqedrptaao4jbb7r1qwsmimtbi5wkiupfjyzm8n6qp8ttidcb04vuimdmi9a28dfvh0wmxww0c',
                channelComponent: 'ejwgbzfsg1lmahuy06k2s08uv6zx4vi1xm7ehzd06m54wsdc296ao0449lvhx4hp0l982lw99mbpga270r8hndavju15eopy0t0m1yiz5ekhpi0mwiqi231ftdhvjlo57pklyyk6ca1pz3juvkjb1s4iql242nkw',
                channelName: '8o1745p1u9slqn94uqq3flettp98xbjlbkc4mwuk8ravteeutuzgtoo4o25t4kx7orac6losymh6ch0kttjqzokemvp2r95o0jknhtdqlvdutrppjaiaa48woemnor63q9uz5tj3udl36fm18hpdc7d2fuajtdj8',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'dtbjy6m4lnqaq9vo5tpf80ahie3cvj08pxfdyzhzsw45woo0vwcu644ebwxb6egiyywhccfc1144ylw9y6awe2pnu7cjrlpdg1vu3xc0ny3937u27imksynz2squdb3lwemf0t160dqzq1z3f07n8wozgcztsxht',
                flowComponent: 'i59ab0l2xrltnsawk6rzih705l3ix13whdufhdhmmy4x1xw6xey3b1tqrvuo9wsto76y8midf1g6kbyth5y2zd4xifoodlwkl3jm36nc9rbnf9a37kxrjwni0bjccr2z5ugqzeprcnlazjc9htxfr4l9vij2m65t',
                flowInterfaceName: 'js2wtcal76fnstuet0cfkfjc38uywdt3oujwlktcojb5sgeq8qifiuabz5uhwq905iaftt6ansnlu1h2sj1tgyur86bta34zj5795g1honu9bo02tq31e2c7z1tjabfiy4f9ao77veb5cxgt1h55a3krev008ukx',
                flowInterfaceNamespace: 'k0jeg7ti2wbf13m9ziwg9qtx82640of8p8rvx82wcedirgc6btkgcmkplsfu97aljq7sixj463g6vjucgpzzf3kqj83x1bs2kwlj3xr9jyckhfup68qnd2f3d4ex4as7o2r8a7x54ddk4qo2i9yn35mwt7sckaqi',
                version: '5jnbo404duv9ajwf65ou',
                parameterGroup: 'ewxntkbpounzdtyzt03onr0fp8moo8xyr0eop6murl96w5ytsva2hcxn020qecxdl1vrklpvcwxi63h6mg7zss27pmaps5vvc0gszgynlpy6lxg0r4qotf6mm4j2qdojt6eiz06w3h26c4tg6a7jsj28ckw58caecck0uj72iz8dm89rm5xuw77gwta1l0lf5zuvdzl5rfnkoebc0f4yr4z6jyo2t7nidh81eh5fyz1h8qdrojgyk1i3uzplqk5',
                name: 'o2ysfxhtqbyrqi7els4kuxa7yfzvpqqw4rp0sb8kwyk1whir3rsoospnmk1y2pp5wtb42f9e84qip40yf4gxds028xce407yu7c1yircz5a981hcrkzua41gc7xm6f4i9j4flp1huutennlz4550l54iftixgobphqalay1sq4bgyqnrroqwh0c8e6nx4h4ylvoe7g96oy7pzjt8by5f7oucqxi8gl64gwvknte2vv7bj69f2u30yhi4o2p34i3h3al8pyq0zsphzj42kxr5e0fqr38lavxyco3q1afncub146wdro1pfrdyooztwlsf',
                parameterName: '47zzn5q35hkc3j8j8e6h7sk4i00915c9l2pxu925trmbmub36d4yow8xfkzlyfr1lkvg54lcniufw1di32ujluj80c40whvtc2uxq8quix1t2ldo279ms9mx12qv8x2uctwzx7hvyq6h1wm76d0v25ri47epa96z5d37ola913wg7ns3zom9c6ef4sha7xm2d1wvictxb2i5wjirc49dp0tarzgnsmgycgehnjdxy3ytbngx7p1o31pjb2fwfbxkp0r670g4ekjyftwxoebj0ypnpemz3fy1fv39hu2x2sdv1latbfevz4921qurla99',
                parameterValue: '26x4n0kfr744yvmray8pyz8qftqq45lrgerhb5kur2eey6i1c4k981lsn5q23stutbgop3k52z9m8rxsvj73puagm3yc7vqnz784pe8zevlzmg8qcz080ihphgcs9oesbekqqnd044eswyze7gy4998oixp7rc4bw02nly741qfvpeu135g3svnghiyta4jcg0ajnqmx5wgzqau06sznaaka4v46ltm9j29h8gcj65vt3wlicnopke4l5fumfs90bz2vt2xiz7x301xixys1um4tdf5vc1dd4zjlhonumxv5bqhax7itqe8mga38c9shg7ktfkbgqwatxr2z8wx702w6iso23z5jv4oxzj724s8oqba4vb40n3ojwqyumjsubyyyyd69nig7ks7nmtwfa1w8v4yhdjxc65ndcdislxeta52qhd3pezdln5hgmkxh5v9w6s3gtgvkurm449z8oe1dk8ep19gzowj4o26bzdz9s3ioyrtvvs3epyn09l9v4bzfrpjppw35c67wbjp07ueliigel8np4cn02nkdntuehzx5nuce2r2131uldmjjfohz77dd2ioimxbt5jufvd48g9xhhk9yb5p65y8e3r4wb2kjc7e94z2czkiwzju5y9ohdify433tw8odejtoyre1vtq4cxuapsyqoevxn2w87hwr1kzsojijln5d4w43kx6d2pv1kahniqk7sfuid839wy9p2za19bdiqmdedxjrvjkslqy00htvbadhw6plz65cxwsnzgeyfbo2wug1zzjzntgmlt2ii9j2uxuvnh3r1yabqgdpfvqu4kehqbosg85zmejms48bvyhj9gyfhxfh9ik432xfwtk8y9btt8dj67mq7kx9xlnthxlbnnr5cnne9xldvvx3prys0pyg9n8h0gjc0hls7qf6s23od09j11qvyi28jre1trnnj4unsos6l5nfz720rrh4x6pcat1khjsv664l5ujbu6gqgw0hp38t74fdzeo3gx9u0d4f',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: 'shcy5gq17lzwg6fd85vgrhs1gsf7uax54flsy',
                tenantCode: '1zsxxjadq3y4h3abq1w8l6jceo38gtq4emdq4xhdpfq7dg0tqk',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: '43o0cw1kolot3a5jpih1',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'pc1bopat8zbfb5zra3i6pf05uaiusrccn5ksok0cz3acv1iovmnoxm5qqy3gumb7gbevjon4ckvge189pbpizs6sj6p7b3vh8hi9zeeh5itqri5q1p7rrepl8nri12cemhl1pukenwlur0cy9uldhadds3btauts',
                channelComponent: 'vayoofunzowia4qni3wrsfgauz9mhvytxlcctj6znjj227mhu29j5yv5hz8snk69wg945pf80wlhfj9at3dlyeiouu0yjrehe8iua3115p3qtf6i059yf9siaaj8lubsx47a6t6hbek1e5kh7xb923unzv64f8oh',
                channelName: 'w7zvw6yi1wqvnpba07zi15id8wj4cc7xvb8wbiu3w6ycwi30ynwt88ik6efrdeb2w3tbe3rnobu6p43atuybhk97y31xl2ii5rs04jz4nx1kujepr7kupgmszt1gfosw10i7rlqe0yu2j9oga634p1sqy3asl2i7',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'wq014ttrp7f7jea0bslrw8qd71n9so8z7n3n3w6o8ttebo16ewzwds6y6zbdcei07le91nfxn49fu1pocm4io5jku8ymym71tpidnr23wv2wh1foat6vny2inzklgq2grgzlt8yxvpabsbkozwapx2x403s4wcok',
                flowComponent: 'dgesovb0vsqod4fbxn1yo91ijjyv91zvjrrlosutosetskocofvfb9n36xezxk0iycofrg6um7tlsabl9tqkdxq9940v040sg67papjvqfo43oryztruk404tneckyu05l4gzdokwl1knf6u3xtxpqqtv5rrytjk',
                flowInterfaceName: 'x9vv920357igsmfoppbpo9fioraccseutep9ungx39r5dfx27h789k93tmp7b18u53yzhkvda3pcsty9c007yzpa7mvoqnxlc5cjabax0c4mauz19adfxrecd4qk43yn3u6mcq2bt92nb3hjc45w8yj3m2sllf6n',
                flowInterfaceNamespace: 'nmoy2sy7ufvd04dvee2niojzj61zl76z5fzp4jcgurwp43gbwkfdf3hzbchtpdozgcz1xrkmzcpnhwoz7zd0pt1g88nhya5xxro2z1xxkt75mof9j1j9k4s3l2hmf4m84abah3rfjy69q4u8lma4nyszuk8oj64o',
                version: 'pjzwhvuvnok26tjtiwaq',
                parameterGroup: '41gw150s7i7o9nqsiy26a2tut8h4n862o9p0tjiopz39eu7kb1aruljtha4y5mkk0vxhm4cwi767z7fjkvaaxvmp9fi4c6gtwy6emimrx9etuzzjc8n1jummml2yerzr8fhvt4atwemab206f1e7ijrv25csqqsextrbdfh0jagc2w1trnrb2u8m0zl9v1jjac8m95wpimhlas6lm2pqgc72czeaoomhfit59cqfbap076um4jgo0uk3thqq61p',
                name: 'omrct5gqg163d29fc4k4dkeb0mwsorafnjqqzc09ggp21f93uhn2rr03d60ocb4pjtd24stgw04n5g3rd8x3dtlu875kbtn2wxb4j5dndqgdeqdr8vwfupmoi18z8k7mprger2fdiw6844q4jev9md634f7xd1hnf2lxq9m9ytynihoigdm56kl1iy3yfst9bglohvgp2scjdwtejm95dschwc1ru657xyfkvftnuyhkxk741p14fopm31lmyokcy2a5seebva3x2itd7egfeav3g0wuatygznmuurygw4lyxe6pqy84s06wsu7tde3j',
                parameterName: 'r65it5ttzc1k6gf167hmsj4h2ogg3f9rffwa3ghorave9dvycwbftsy8ayo6my15vwylnh45yu22nyvi0wjt88p8ypa2sc7b3vcposr4vqguy2a3d2o8hbbcezhg7yvnjt7y0wyhqnczpl63s9vwo0h5octteiwlt5k2bhvorygqcnxywphdljwewp5uz0d2n96hcwur2rnvxziikiy6kx0apj18jfqhikrot0ngg9a9g4uzb8xvyetxd6sypjkqjp79vohrkbz1wbedk5n1a4gpris2023y1ijo9mdsw5jbc4dq86q5lcwgx1peam6c',
                parameterValue: '3i39mlkvyywxu8mkwqapfdqnutlo38b2cl8xok9376x42mnk50ewxxf8nhnmpmpv9px3t6gh49yz8c14ehpzff1w16mnwqhpqpdu1od4lxo0q03o72hkt4od10mz8h7sndqk96zzp9bwkuztjim07p28yjnhxcdktmzoycxbablyw0n7fvtghle5ip7wek0cuknyx55tcupw7aem9ebk6a9kceqdljom9wtyq761j92fvxhsvq7jgcp7wmhqxgtwxm7v7n0bidf3bl2ilvfz4u1f12f4fgoxne4y06flm7448qzg1lfyul507c4v2euo879d2ntcn7q5v52svdn98w2miszecm4xg94x9xtjj6u4f58voz7gknwhgv46siovjzay878v4kero1gq3ba9w6chj2n0q7qct5j9upj3cos7t6tdkmivneudkxe4v4z4ep6kf8x6exoo748pt3ffaswpht596df76gz85bjauw4zn3j9wzec6mdm3bcu653toyorkikyqrm8czw3wplrmhto17et9vjh4a7xev0a27uef6k6s990jjfpm5ty3um2k926efvo664ncydr6ubf4zagdy7bejeqz9zzj5znxkyuxjoksdnqu4mbxt5t8bnrf5nl0nqp3w1vbc06ub4m3rs4iqsnmdv4pn2e7ir7r18cqi3cdxpk2ch45algc0q43j4nne700i5mrdm3snh6nfv1xlhuil9yckmgz2tz3m1p7av872m13wz2svvcj0fbxqpwx475wvzfiohrkrh8qpx26x16iexigt8cmwpve4yzcuw88h4winoeb62aidwbn8ahumu5phgi23m1fsbd596tjncci6lcsysrrnfamyt7p926j7ll3qgh22qfavc6gao8towhowtb0pqk8kh4no8q5g816w78olaufx2sm0ylwskzen52elwq5ebm28i8q4kh0dpdxk4e7hjqwj3k92toffllev36r79zhk67kdvguldv4qjnw1axwo3yagmx',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'm86iib54ju5a0chu7oriprb6qrcoilasyi58v29kgaazndgdos',
                systemId: 'tayucwqrjn7z7v5xbfhdbn6e0z1w4trrjha2q',
                systemName: 'kdodx2uch3b2se3fzkdj',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: '5ngpqav5mgxg1rsk1t65wawhoxfl7aaktxvc7agme3zjrz7gh77tnd0zipmwb1q9mjp1sy2z9a4889s4w98hrx8lf5bxjh2crj6icsbxu4hqqnmpu57qta9fjr9f0rfkx5k9drv0sqlidxibuddb1lf3zf8wlkzz',
                channelComponent: 'byenvmadux2gybfpcq0454j5opigd9xwrnvcv6j2i1ojl93oqv9dw293jduqa4rum4r810fz6wu16t2v47hz1brh0a4dbus3re50ivoisq9mqufm7ijhfjrcst7dfk47yevpcb2ij1rip97z3wputs4tzq4yhw7z',
                channelName: 'okv4lm7re0ah2n7ohs7j6p2bdo1t2r1v0k0z17li8jq0q7kr9bkah5o7ftzbtqsywmy64z6jhtr2uhd2wefn3kprg3xjz4oe3c0ubej1iwm8ho3uv5cv1mpxgzao7k9y4hn69dx1j75ke5ywwtv1mlq4o9gt3cfb',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: '2pdh0rmqi434vqo8gga294bwybickjnpdsty69dqcy539gj0j037482ytrslof0ch9mu91luzp5274ftphv5b3tv479vqqrcl5eu471u673i613dzdbyb8mp87t9z4ft1pf8h2it40dhxpp92mqaoezocdk16mqe',
                flowComponent: 'n9ovz4f1p9yedcmsl4euzqxiu00m2hfd0idc6hu0vacozj5r7674jdv9lvmurr05095lc4gflkbiiohmgltxi1toggu6d808bbhkp4fgtoezmjfrhxr5c9lfeps7bg1gfrsfswn27sdl96xgg6hv4kmkvpbv2usq',
                flowInterfaceName: 'ynibinckttrm3isnueo3bwkqqqhchzi9a0vswrlnopj8qlqg60witeoqh79i33og3p960nxk2yz5y89q1uoyrbkize9opbb6ed3h242tn54knexv1r1v6lt1dcc45yeebhmh6843lc7hs0y9vt8ahbhfr9kxxtlr',
                flowInterfaceNamespace: '96fgo0idjx7s3lctq4fldhjxrdz5xro7u0q0jiq04sfuygf9pftv172yqtz8uc1qsjpdkial0hqqi8luc9oz3syx5mehfbmh2bs5pwnbo6tjl8ycac273xfg9vo16m5h88v242dzfd83n35zhux0w8ecphkfykwz',
                version: 'curj4rwhyn01yuwa866v',
                parameterGroup: 'wfab19s5yklgeuky1nv1p89k7g1pl137oir73qbydrwo1eg61e30gjr4z6nluosdwrspdvp7xr4y8ia5z3yqtn9xs53130x1ysz7kscm83en7tauq0hgr9x0x2g1z6b1rmkyoomlxzjd16bl1s0n66l4y094ftvp3nk25t57pjihh2mwptv9szn3m8fan5ifzscvbk0v8qpfgbbdwvnp5bynj50yuhzn10sj2kpzla9xgusps0jbuhg79er2wr2',
                name: 'idyo9y2u765f44gsfbcot3mm3hso667z2ggacyffw3ssvn1k71kb5rzplmesd851fapkpmj9zb1ke9ygzxnoz2vl35pzi89oa7hmdc6zcnqkw5ueh7l9aif3get473x4c9z2ocjinco1zv5tzs1zuvpc02y3dsp8gmvihmlubx8ag33gdzol5s0c4tr3wdznbsotiy09zikaoeyse6k7gghyyzgv5pyvw46lpfpxnubefgcbwuau3hwfymv6ol25kmtyq4jy2zlek0tn8x5bcnjf8y31y2sxxd1bb8cms17kym7mk6pvphudopeyngl8',
                parameterName: '1nwrpmmo8yihuc6bd0oxo6kjmpcf37rprx77cq89dunrzlfv4uc8vxj24gekcp80h2xcl30a44y38yv673x65hov18ypu8grpykxdnb5b77fj1ig7480f0c9v5zfa2rzaobv7mkxra83a46m3vrgn9deww4kelnigmz35h2tz4fytvv0o0sido0yhwll5z5yznr1fqpdbogb27dtdolrehpncbpa8liusp4c4qew38ugropls5wz5d3i120886o1pwbnrnzl0m3lwed066yf7prhft3iqr5c2gsyh0pf7r77c93qbr7px5octy14i2aw',
                parameterValue: '5fohifkbac8rbwc5xd9xvbx2brdgyvbp0eutggnyj8pyxo8ej9giehp9wdvon24b06zvxto6xnho9f3oz2pehlwqhzozbdnrsv44dhtskf7c1qyn52bjrwocv6n9oi9mupc86308nqlltz17p3lkywgt2j84q9ylbatf702bhzvuzrs5adi1m7kidp8xt3vxob6hhbl36i86nqdzoki3glgqu4p9vhun5p9qlth9m1etl1p96yswv5q6hxcf5cx043ondy6g4c57ym14heeu0o84x78v4ezdg1bu0tzjwpwqqq9ehuncgn34m08avw2dfc3wyi72jd8ezl3luri0fib7i0o7b3tdezv7j7r825czll2oeye8fpj019q29bxwjzeisi7eor5n8pypg6nsjinnip7gnrre7zcjb475zk3t3o9nmd5tladcgug2cccsi0eubde4gmt2kx603ld2bpvkndlvyv41mzke2eby0f2pljq4p64zk74yyr3mba7p1fh5xg6rzv2gvjs2ycce62rkl5902xekpswfjyo1fn0hpqivx8n0g3f4eqrdtfvkb50ifuyh8iwmu4fqghytmhwrykp2qshlnlflfjwq6cdrtikj3pwlijzrxqzkazjicivir8oh1r3dajvm1kp80gz8gvndgpgate0v9mp066kr0dn83bikbfs7zyspquw0eucfdc6a27is8y96f0x34fckcrt1vlyr40ys5g1f9smbthhmzvi5qn2hghl8pa77bn2pxylcofc2aks42zfrfk0rrjt9uf996fvs2wac2pdnzng3idq8q46hsn10ylj3zidyhorh6emiv8l7g4vizmfpiivx6fboowetdva3z257l6ok6xo9hnum6fkokzgat2fv0s90i0ubr45g5446dh6opzxe4e3s910xysq54agih03130wpvlcqaknhn5laaewqrskqneousy7rye3hui2mvyml64snl4y02gq00inai20wo0fchjommxg5sdyo',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'rg0ebt6f23umbifiky1bupbtb6eicdurkx38tbtn3emb1ex8uv',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'up7yo8jf3jq8x2uwg0gv',
                channelId: 'd8ca8xmjdyfkcrn9kft2jo4wqnf7bqbwulrgy',
                channelParty: '7u68gjcjx1tqzvcgmh6r8sp6xjfwgdjpg36zyc0iap7hp76261kplo62fnsk5pc8ng3u293t9fhwxsi4t1fu22anoe9vtii0eghuc0bkujatblnbu0btfz2hewqqxri1ancp0ch1r6u3dqz0tgh7777ghjguasm6',
                channelComponent: 'aj5573q7yw73bhokt9iab68l291jlbgljs1fzy6ko6nkj7r9p8utvcstwt7r7wqu7znfa97cdwbxf1aumxwya9cb64lb520tulfu4vyc8dsvwzbfq6k33pg2749qsj75x06baonxz5oz2xuwo6gzjmm9h4dvnkll',
                channelName: 'qu81no8dnk1zpfraa9exibbchrvn7gqh880nt1qoq88osmwff4z0yl08ngb6uf3bis0x9utvalju209je0f4wy4nqzwcbv5vd69mys6evgj3y7xvos832vdmetj9w3dr8dbgq28vfqtamgr6lbdovokxn2543826',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: '5r517ocnomt3flkr11qfo2e79v6llc64n9oqisjczev28wwmrp991eojec6ablza31pz7oe9lrqjyblp4t9dvrl103bfcj92i32woe3usrdsxx2ltu2r1e6jbuw1wvqf47gme2ye90q8u0lu0b76mfsd33wiks0p',
                flowComponent: '9eigv9meauq8nbiv51wtf4yyzq6x8qs28a76sruge2bsonh7ipp0rx2ocsnas5hn9fidudm2z4teprz5ueoddkdtdmn858zyull896eckxk3dbvu4kc3nx3cne3yo2984smve7gruduxhctqpe23qfcwd2cjdrjz',
                flowInterfaceName: 'd59jb29d0iwkovhrck3dkjj39h2gk08u0pgx7lrw9z7iu2e1t2pj52dl7g7y6ef5uhbnn8ypgck17cfe0659ssqwmekz7g82kxh6e7p641lwkofu6rmxv1tvxuy0fu4z0wzxvm6odi7lliddtlk73t956bu4jcn5',
                flowInterfaceNamespace: 'hjf4ulgblo58reko6uzghiztmroqsrubxutepwhly1qd0d0xorqzq6mu7mvfxn0hfbxtbqopakyfyehmtvpaxyk7371508k2mcr8vaoosnrwxb6og2jj0lgagt2zruqmzhzpp0alhy0ndk151v4dow2mz9sja7en',
                version: 'ijgzqp3qfkj3hqi1aer4',
                parameterGroup: 'ou1d1veo2vhdezv18l7w40ghn0tma6ywe6o8f836kakb5f08izrbbv53rk4v6kxj55dbxhvtpolefjg81rh6faed25snhf7m3pqbdqderxiz55r0vn90q0kyws4dkq1sy6053ud1wcvaiwq44482stulgvdsa7sp6hfyv40o1qbes3ujwoylwqyrfwu6u34hnn81kd985tiqh3heswbxw18kcqxsyki5twq1svhfdjujjxip00pvhvaknir641c',
                name: 'sym41v94fwsrfp097o7q36nyn1zlso45bgzkvxoxxhgon9lr71q7qqnf24r1rex89pcpjtxnq10t0vxvp5qwwe8uwlu49zoqiubkwqjl0nooo29y0zudulcm3jwufazic6lt437lt2uie9y6w4jj0jo7yg9rxgcpssqwm0xfobtxuvp3zmrewx7yfy8ch3140no9azncj1wvfe4dootp97vhs8zzfegr0brml3cbx3mi0kmfg8cwx5onz1hzsg0el8yqd9e9w0nkzu5x3p27jdhxk3jn9blp2ovn12tqsweb4oxozcgv3cou6bnn0x2s',
                parameterName: 'yxoz4dutnflwavc7q4lg7819vl3zhuqg3tcsoph5e5c7zgxd2l8a6a4z3x32j0o6f8dcn3obwnaafumlfatqu62bmxq0igb4241my31pw60xrd2soxlidabdzmpy22uwd5e50crk9v3gl035610msde42lhau2hjtuvrhxx36wjmax3kzze50dsat6uu77tdfqx9figyrlsn79yowgclo5cnznt8d0qxzp598yd88s0jrihuwizywadowj8azuw32509fs6a24ifa7u5wwh042mfo9n3n8vm16nel4s2fyxalf4mzrzlftjl4n2mg7hx',
                parameterValue: '7789i4iavxg0vrgefn0gz7q21q3uk4xr5cez4bwvzx4xmdhf5g7amlhfgzcjownlkulm0cro05wt2of0p4akctsqssl26lim5tdi29l177d2hmxskygdb9yow4hgg32jok381ee91fq601tx1sb6x7bg0nnjsaqaz06pedbgpnt7e60br7067m0vh79a0rb6cpok8kxs2pio9hucr0pvxq0q8p0k51ejsqlqbq5vh0n6p15skzbsj6llq4qyi5829mhq46qgjtz7tjqg7eg8vamgl0iai1hm34grpv98lijzy1cvia4u9or99ft11jjn1v4vac9fwctg6xs17vjkbxpc2xrtjdekbtzynzagtshgv8qzc6ejed2rwtiopsrl7p9chkdw2r316a6zwf4oyzjpgpukhg77hyose1hdjavag9ttlyt3sj9imq1smc2r0p89ffh5u2upeiw8pye8u1s5v8cj5vs4cn2cioidm9gleyaada3b8e0hj6qktoxripupr80sdkqofm1arr2nc4by5d3c4tw0tbsgpnmlqbl7565jzh1hqzsll1w6slvtmtktckqws3hs0jdc1kzupwaxzkd9zd5ojptbk7jvi83837ai54tikgps8dbyqsj1eqki74uv836h9l1550efv8pmtaacfbblkr2epj4j7354ty1wxd0cszlo7ity1blnww4m0q4a1900o80oc1nngyfpg35l4o5grh1bjqrv5u51njp25tcyflkhprjwncl8pjxxubtgw7t4ipingfqq5lg2og67i9aylt7yn5xxtdq3qm9xqaf8ca0j5auz8mve34fouctjhj129lztw5p2jcmu6bacjfllp84ryuawrzhsy5zbqsk3xs7jphqyu0uol8rii2ya75f5u2y6cj3v30fiicjxodkjg017pymp83nv2bexgngc1er5hipw60xvuwitpylnwo3wjgmpog9dt7zgyuvwprb1bwhzi5g3d5869hmbqcyms1bzy74g6mki',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: '1h4iqtlur4zkne2aeuj6v3k6np19lkbuuyl21ou16i7dgld21x',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'hpqof6x53dyp5a40jlmw',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'siayrcgn938oqae634kwml96fqmvl50vcsqtbtwhuh44zmambxqmapw1ldtr4b3jc6b9n7nd16ib2dej994qfv5sjtftvxd8f2fayzpl1pbrlmg0g02tsi9m6ud8s2qnldhk94av2gkjwzjlsm8uwmwo83y0ef4s',
                channelComponent: 'tiepf6bsiz43r6h06ng49jppcmgfw23vp8dkgh5uya4hhe7rsich2ox0f4b3osp8msj8pcmljc9o91c66lf7mtygszdh8isl86sxljlipt0bs53wnm3vklar03j14jzqdga1netcz3qncszvvtj6g2gxuzw9zfk1',
                channelName: 'jzgmaqyj9vddsk45sj9gxikayj5vsen173eh61709t0c3fmat3jbghlcq438akwrpptpuykxvh59nuzchcrjzgwetw8mppmnl5ce6lhim3oublw65rmo32nd2s8bbh48wsxva6bkmn37ys3ytv3709yf9rla1aog',
                flowId: 'zkkf7n6a29rk15pt2ccdmoje7w1zt75wocesd',
                flowParty: 'b4htbxo30i4fpkt65ob4jx0t1cadwa5x3lq3ru2oxee0v6zp2gko4q7z0y9msgga87s3sigfnmv2505vnn2i4fgz47uymmy6jdzzbgp7qoah60n31ffigr10o4clkgwpfwcfmqunjfbkc0fn8jd3r45t3h19cv8l',
                flowComponent: 'gikk6edgy6y6jpvxu0es301hh0gt3b9tc6go56npum9bs46g8ms73xx6uxzeer1imcjl1verfefcm2gukmdydvphbav7zosn06bwxsmiom947685t35vtm9r5h7hhkfu3sxb29k636zirp85rvm9tfdmipfc8v22',
                flowInterfaceName: '1r04w5tha1x4ddekhswncc5r4qb51rwocfpy3q0va2qmfrays8atddf9yydaivj89g2yh8xco1bfoiof3lg82ufsj1jbkxpwy6eegxh3kahqdw9xusaqg1nume292bxzhpjluwf4cj9elx6dsxwvfc2cvx0kweyx',
                flowInterfaceNamespace: 'a2vkudmu2pnhckmn1mmmi1xp4zampew9sbsrol9uf3m9ad7lk3duevfdarhz11mg64di7j5vb1bxuj1gwt8gsb3dmuvvlld9rrwegdflc6p7uih8jqsk35u57x07r37y7hb25mrww5tp77hhx3tuh8pokw8alkwb',
                version: '7x9fw5isgi9z42n9jisn',
                parameterGroup: 'qqluetxdeung8wyxw1v9rjedrjope31609jex3fv6lhwzdulypzaiqr7htgaiul2p8fjucaarv88nvrcjpgbpd8qj5s70apxzrvyt2wslo13qf1rsqtzyubovk0coblbftww9ftpi1qqgep3v27l7943hn6hdtxe2lizruafhqdh9cab76ju9mvcy0nmpo61f2j0fmvudfze4ujpio1fvz56tg51gscv5buxjk09sw7hx0q23ouad6073tbsduy',
                name: 'vc9u7atad7c959ldsnjc2olemrhdlekauixj4ma44vy8mhjf25rs8ff6i58k2ld9tmfrxlxppb9naa94fkhveicl3zqu3mh0g03y4ndcy74dx0fsla3eto4q7dzwv5dvbnx07rvswnpb6i8xmyz94b6vugf20buvtlo7r52c5or1jigl1q6hpayd73uqs9wtmur2pl0vqlp49963oedy143jjvat12puzm9ksvzkzsaj7s8czctmx8ucl4geehuz3i44o139szldpovt0oaio9eizh2m8p92o2hlb0qds7ucb72z0d8g30o3ux92vxb3',
                parameterName: '3vnedemusaq9g5yqyrirzaqkv9bdb4sepkj05ljy638g64nkij0y22tnhnicgq1blmlhfx1cqjy1bqtr31mohxbod42t0twj7cs7iyueqdu3d99k9aogx754apd10txbbg1rrovhlte9rz9mu7afd3d4qpe66at96vgv85mfsu9ry0nkxj6ptu9yxp17xta6qzk0rcwjs40yarv700vaqx5jb09tkf6c2ty1oj457u37e49ppm52fewub1hiq7f7ug5pifp76d4lgttwobq7f56qz6ni0f18r36ec0qiavcyxmj79ztdxhtzo6nagl3d',
                parameterValue: 'fqjenkwidiuwbr7nsdyj7sdfyp9cvrjheigpynpq8m8zp4kdg8za3la37i86x9qfzqpfl282tizuow3d8eeo9ls3tkk439pwhmiu1zp431cuao6hgk2h2ev6i4ncuwci0mpvh2xhj7xxbzwc267le3mjm8253w6zuhdtg4ns8wzkaun4iartx9ngtcw61g50c88qs85wd5lo6rh0egru12ic2z25enlrmgvzsl4widowzw468l37n35le8obqva4tf556obckkcfcatrhszfyispcdesihpdo0pvj9ozpnwy4vd6lnay11cpdwodlnl6p8f3x2bxsnuc6uyla9nusb99fsc6pyabf05t7wwmm6yvpw2stdxx3gpf8u5o0j5asqaaeku3b511pzske9usaxx4o3g9yoq2y1kh8lbgxa73kkm9lfirjwbit8oav4xz0txbg7qxzv3aieaic685rii2yhcwwzpmy1nrmoww5kik1yag0xdykavtv3s3q64mzdrcb35jjm0t11yncy9t8kzf7tg1dl3ebpssxdpxv74wjn9rlmjmi0trex4x5zkpeba4l4l837ae27nmun605f9b3r8fp6cxi9li1dl5pjkky5fibihsdz7ccwphfqj0ed8i706m5dlr0y4ll0jjn3y8820rtuh5cccqt6cqt7x288lc8s8gmisk9bkwejqehv8zu95d5e3zbdsj6nvyju437oktw7bhrk56ke1d06vtfl1jdflhxov2tldafnz7x9zhcldf75z0l7y32ppw9dtjs37l8fsjg94u1m8o0kvkf4cw2mk63c0okyj8ufb8vgx3bt4uqneq1iy8dgpxt7adoluab8wxstvm55w10ml4p4pa80mlcd5ayf8l5ajih7nb40u7wngnxoyjgce7p8lnzd2xg4k2ial477pkob66e32vqq8yrwwy65xknlb9madzs67uuod4o2a88i42juxx43q7e28z3wb3vbvphok474ijl3lxvm6anh9umi35',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'kvyokqaene0x0oultpbhueqmo8qgq2rtaq1abbd7c7caswsxqwq',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'qo1sxp7igkke59s2tptl',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'mkqr1zu4byocsdt2lcoldyu1z2mnagjhmhkegts0o182odi7ekl2xe9enahe0eb1ifu2kzzcx7viidwv5015ncllni9skmy9jbphef8mewf58cu4vkyu2rs8q339h7d4npsbkir0qksv85shq87h6f06h12qyf0j',
                channelComponent: '4tnyp2eh139jtj72mp8cv0czvuueatmbalcaksau6eucu9fp48zq2qp28dk71w640stzu0w0g2ysdw63cnmw35v97rql0k06tukyr6qwrp7g6jxur4ektdsxqekd3ra5fdqt2nji8bjrrgekqe9gc0gm4gjaw8zi',
                channelName: 'er2ezgdp9uoct49aczdt3sskekj71paanw4ej2i9r8klz95vnpuly6irnfjj0jg1js2zn4vclutnnsagwjiafu6zn51sbh7u3mj84z1atpibamu003al0f54otx488czms5g38cy06xxa5dr2s8x0ae1lhzuxner',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'rwbsk25wdkh57ohgg8s18gz530ix6139n43i7mdidfw8pc81w1eiqhf9p3w6z810q38tuylnvtpskdyt6gimczub2jxuonuu12kh30kjiquj0ynv9dpk6f7cq9k8froxc88jjhuwk6sdtumyvtd00dztdn3ypoln',
                flowComponent: 'u78d9i09uzj31o7xvrpas9lj6kvx59zpsxfvlerr3ljedl2jy2tbwdsaamopf1hhd9zbwcyrg0hd2we0xvt1cijubiq8sdag90el8g7qepw7dpzl3okghvoefgdd5zi37qz9nuntmgn08kui89v7zy3c6k7dg0bw',
                flowInterfaceName: 'uwzgc1134xhpibr8rjyzwlymuonolo8w6p4zmzoyl2oboictgl9mbggwj242iwpl8fpz4e56wr5sj5werl1bcielwyxuwj2vcpadcccxdcqreof8hyaj2iiwodrzha0ggldm3ntcidw06jl4h4lz5ekiiegg6gpu',
                flowInterfaceNamespace: '5i0sgn3bx1w2mux249qjxvubl5ya0evign05cinibk80dfc1dwu6akxyqyuhxo0kwjs56dblub2ggh6rerje8i545lmswcynzvqmwxrn4x9scvi9xzsr071885qsihzjy6hpb1myxl3536bffe6ifgsvrqeezm8r',
                version: 'afdteu330l2kdxsuzjkq',
                parameterGroup: 's8dtnwitk2azkyeqbua9lfr79pzrm4msebv1uluj8pk5cmvs4c3n7n41wh6dxpy65huy34bcbwhhlrej1uz6uklkgkdjuu1uz1imrhzbslwd134l2jl5vnf9mzuvfufik6cpuf977gcx0x2r2my9bsdvpp1srvft2rbc5mo2yglotnw4ks5grhl4w6chirz52t8fvg3az3hlib6g4awrpy1dj0ke6o5kp8hpgbx6b0uu8z67uop8atjbxgd1xrk',
                name: 'qhtn9xgi3xv8cwxtd10aa2i96zfrmxsutr50y73d9436qw35q4fwft6zuetmoqoepswdes9awcbvzhp52sls89mqe6xh4otc2yswx0r08ok0fhsz0rewb2u7rydsql6tmqgx9g6qwycsk0aej0v90tecfhe6odk438lczgqkjj6p7f7abz9irqmm5lpyqrtgknfzl5w6b7mkl9i3pfwow6kabbo1ih0llbx4naby47vp4q432mq54135zcudjbdgvdboogvwnnv4uoxrphob4i3oq9c06gkrxho32suweal1cwp6fnz4gupeyf8vilrz',
                parameterName: 'r3b9mm8r44g5rg87c620nurq7khawyuk3p1je05046gw03d7269u2hb9rhzwh6vhkhitgp7dnmbycqz9d849qmwagfvqen4ba1w2wxs7y7cr19bjqj713qwg3rtbcr7v373rs9l83800we1xs7nlyj13ru4tam451aujydjpo8vbp4ea860x5k13yxauwm5y4ayalrvum9sf708c6waq4uinx2k1lybq7md9iekfcwfi6ivc692ih1mgngm07yc8lvdyzdombsfbsc05caypvfy73pa400zrup021g6dg3iu44wrvsdij2nowv0y6g8t',
                parameterValue: '5m9mg49lqj3hxbub5q0a6zii717h6tm372xw903dvd6h2nui9e1ae210fgcsgwcfwnbp1cqsjszegmc6aa54d5skk07sxr1fhw5x893kbt1odopt99hv6vbn04d2y2zaojzamjd2zymjco68kjizw9hmhrsvtoes75zbgauvrfslpvnrnj2jpmx8zai2bxawdcbi4fuopq5sb36nvznlxkesg6jtz1wxbszfy4h61882ax27j0badx6uvbh1yz3mjlfkwqwhdopjuhougo6merjxdulrdby0l3szrhk2ixci0qvr3um7wj2l9f9ylbu9xn4ll3oad7wdyv95ufkzesfefgqazhryk51nytgk43sklb0jkqiottl7b9aqlypm3ukzrfmdpv1w9rrrpvpmylyrl39lcpbiffy3xyog4ws9fyiwxouifh9hhxok5rf9zxq4vsqsnhuq953rydj7mwogd5n6tz166vbtzoirrahj7kgnkgsmfq2jssu9335gawzhhi40u6ah5erpe6x3wjv2vq983shzdsv3c60dt7687m87ffcjl3qbgzvoocpugusumnhjm67wv357v6g87sxjfsntq4qdc08v0gezxdbrsfpfvy93lqew5yki9mdqhmm3dzuxw66fv64d2i035gi3hmv9rv3icfvdqyn4wjhbyhitexo1t021iedmx76t91ih1d28yia942iua7dgg3bgo09z7dcqxqrx29mdlj76einj5kg3e0qfvnxqqnlbws8te93zokeblzmk1y0y5bqdegsaiyayusgqb03hmfzmmnhuaylszuc7ipbbtqb6nzgidj6sys44xh9nzmq9zpcxt8pni1di7t5hc9ivttkro8a9thb3ycj2gxcasrwizfu0dkovulan05ae9kzqk6rmn1rghf7jfjo0dd1tyk82dxoyxw3oga5yob2t3ui97comonnw6br9n0cm9n7rfe8i299swgt6b8q5kyyvhav28fy522gnje94ew1l5wu6',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'ujgbkmbb6h05pbdnd1v5t85dphgl1vel9cgoa40ld5qkcw97uu',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'rrw6qgeiojf45mqyyg3jm',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'kffub5btb2xqhooi0864y4dwoom4ogsfhladpbeim3hwo7gmw7d96i58k7ho93ujh9qegwekxcc6z6n2sr39joxphee62t49wngnwb18wbx38i0twsvq9bexncqlvcbqd08k0h9gpxu3b7cfhbxys4v3p2ewwnt6',
                channelComponent: 'q444cts1buwibhb77gyp17cpnlaoxbh8lpdz0v1tx7k6jrn8ma4m6bh9khi9mraugjpax7rub1chvm3t61cemq7bx7l8h14dztygb2w2elisn4hewuekw1qjer6pqkb7j8hiptw3doy1xy146qptls1iruabpw7o',
                channelName: 'zkh91uxndfy60slc08w6wnjtr7z61odrqo0o51dywafzop5tluaad6m64sho7pvhdqp5k83v5y1iku0qy4rptbzk3icyvipzqk9935tqk4bgv2sqrwmqq7o5fb2r51j8f68wy1y3zgxzs36sdqlwz18npdfpij0o',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: '6hgbs9vjfgig9an49cdmfx2d0uerzat8fo5k1lqgwnouyr91pntqwnt31t6rxmo9kvtbmb2qyfklhwgussknag6gmvb4t6m7i0yqdnjpc7s05i1714rfd6w23qq8crxmf4aknfr7hle7utjhoqpzhuihn4kqt8ce',
                flowComponent: 'zbgetvjb5lhpzwic6ksp9pjiitgsypin2pwccfxisxmvnmugcbcyon968xtubh7wnjuf2qnk8u7ms7v5xxul447v3lw2wv8f6b8bnweosg625y04fyxf0g85b2okc99qtpsq4pkyy1nzkqxavl1srxj7a8igxb2o',
                flowInterfaceName: 't7owaxk8rn24w6dhu6hv6bpacjlzcda2bvonw1dlubsc5wsv9f8ssmffl8e7qws1pjg0j5gxajvyrtah8e30miysc7q321f7ed9e3lnxbfj5b109hb6hmhrs8oppng7xkj6evqsotzy077ghw7dkmn5thgt3l0s3',
                flowInterfaceNamespace: 'fn7ixr4gwkob1ju8vqa4cyr0rnwnz52ktdcvx6fbeqeubc17svu7xlrf03p10iy2m3l4rusmlasqwscuzhpg05jx1fvvgguog6ku20fo0r16jiy5zo1wsjqphmlt7872se35os2adbg0xqvnj9gyygeqmquulvgj',
                version: '6a2aztvkucmx9mk9pa8h',
                parameterGroup: 'q7la53zlk7k8hcx6hjr63tp2cw6q7horus2o8t8rkzas5pq8y7492nm3rsvzu7bo0iicr75gz4etakos91eei69afbxb77074843bp99bd2n167jcupuffcxt9lk4fzb6c7zzcrpn43n2zgiwu73h9oyg85ag0j6byvc82orc2vwd4lfcizyn04gvezd2fwff8hkt01n3n7jfmt3slquc4rmkqudp6saxgmme60hm5hjhawinssjj2n9jqwwagl',
                name: 'truruzw6de02ryk9aiqz5j7d1powfw830v4wi2u57td3d0e50poavwyl4divdllanp0y6j0j732fm8rjnuapt7kweanjr68dixjrjzeqhgrlobq10b07s76gjdddpql9bzdugdphun78k69uqs156at5nsk8jfsp4fgy1db9pikvix46mfaxdx6ww5z5iswesc6ifb15gpahunk41gossms0yn77bkvewys4s87xsxvrnjrsfkb99dx6n07uebbz95q3zbu18g7g3uejqf2cddtnp21b8x27q4pzzyz9gfh4t7a1ezlccv0adt5e105e',
                parameterName: '5jo5hvtk0hs8xla1d9d9v19po00wln2nut243f1tnlpezl26cbjg4wop803ojm2zdo4a6bxlsd7viz01klhyziepspkdp41scvhqgrqtl2ea3kjrjl6m05b4ok0nmeykl1fs2a52i6trmei9l8irwwy6lnsmdcc9it08108em4d7geyuw3qwygtycik7b4mgjh7trsjlivkl4jqtqlc361p2eod6x1pmwi25iyxfelc7gi8wnssf61zicc55wfttu6rdfvyq949989d31a9u94500uli57yout1z3lzxgiycnv2y5q2go3qn7jc2c0po',
                parameterValue: 'n13amkh3590spb4hiqihvvzg8bds7vpjnwvgqhk09zgeiyao7iwot4zh0c8nxlft8xujwk1mt1zv1kjrj4hrdvll4n4l3oum8bw3jc4udrirxx84tiyqws8i7bd9ubus0ej5i04p8ylge0ni26w1xtclxobn5tnsgxxksrj38h7tnvfu6ppfvhdxqssxe1jzb6vd0mj0slafra8d9y5tryipagbsb8rt2r2rd3u556pxj1ruvs2urr82llfguxy48cc1wr6sj0waaxdq67uuxmwukro7b06crmnz6cji3l128x1l13qchp6y9o98rqqjwvl1hue27b6gpcjy2ca4ffag2n4lmotxlxjjfsbklor7fpxvg48b3gjnoo4uqav21igr15fi0msp8b9u66wk22jzfxe3n6pvtygz1isr6phki3uo4si13t02zgpdzu9phtfiq26xxbjb7w3jgenc0z0nuwgc94kypa5iko6t99yuzkwpmntyt3mrnetca8yju1g1fxl2qffscdcvjs1w0xorn4zb7c9wt38ltoqo98ykqurnaa1ddxsc2f8d5jiykh4rxp1vptaqjnrq3rgkqpndqlq7wjli3h8008kzxfnxybmutae3azb6mlvkvhoe47ob5vag60owgm3bv4635aqfq1sxgsjkr1ejue96rgqeq29g701x4btdvcsw1m66i8qhwhk5wyl79xgqkghm6xnr6jqbghyzu022wupdpb7li5pw7zs82l26chygu1cq82com77q8watzptaue7zlu225ms8c67m3td0k4h28a7kwtcmw81pdegglraipcg6ol2se2yfgc9w54uzvb9qakids64ecjqn5liijiigsmv56movmserknv3y04o8qk3h0h9ij43rsm2bmwxmwikuhx1i91c59od0dmgj1qkdiuttqfb9erpvwz6kb8fewt4lqk7k1iichgyc0c5hodqzcssfqhdz0tb7xcuhnblmm8uc5axnvxq3aky9vs2sevx',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'nxa8tem72y5pyv2o35ucpt96i79372deyc2ow09pni2fqzyaxy',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'tapuz215duoq033v9dhj',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'eggar6ilcv1c0eqsus4fk707fbaw0x700j1pjc1w72x0vdk9wxgm0fpg31u6gau4baq4vhp16psfh18hfw80js9q9dqdayibl6oxjz24ugvhw19xh25s7g3t2nbl1s4fz62h8zwlocbrl14xpy9cj9hgs51p2300v',
                channelComponent: '6wdhxfbhe1i5udlx1crh2qxozqfh69fkhly7f09e6uc6sxnn2fom3tvbidgieytrxaif8blxtapz2l3jpokcj1a2csoyt0vmw3rp3w5ei9epmhjrcmgzigt0hdfhzjvfju7dpig40je970h3de10zo5lvjiyycz1',
                channelName: 'jtr2ai18ox85c70o7icutgeuwz1jeqfvrnm2eabce3a3h6etri7cspbxeny65s4cyjf3juzf84yw1n3fs9uo34rce937tf383bi7yousiedkqpw5c1tyt1pp33fypzcejmz1kblz417wu7979h7ds6eaiaojuiqf',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: '5gsdb4ymz0f3j05q3ouxes7mvbogaancyhiabr3ohxxf7070z41j0hi0pb3rz7xclqzo9t0pys47n2v6wqk2i7sf4dwerq36nf9p8uxpj1h9t0e5ivvz3fukmtbycvkvan3izphtkzqqee6wmb6dk0eenn2u3yfe',
                flowComponent: 'hxpe5d047nuk0tzmv33s9qegu3vcze7ttjlt1wczriowce0p3q1vtprbohyq8utv5lpi3h471i8s4p70usggr0w8tcp7zyyy1kxs3l3u8klihee140vaamykw026ehmdtky5fgifxjrfwl93k49ym3onwp40niym',
                flowInterfaceName: '1e97r87ki9gy8y7kfoukj3wsugzhlsalzb0erv5ppcfpq4vycn7kn3ny3fhrbvmvseng6l408c9kfw3crhy458cz4145mqkho9nmnnh5i0ucvksvr00xlekzulb4fvx9i1m6bzv41a0ixqs2uge07s9bfh3ykezi',
                flowInterfaceNamespace: 'opk81n5j2tjf14hzim0uvwp9ntnufzba2mxo2ik4fspwzunaa0gdni6si0zar98likdyteu2w0yj7zdjx5m7c60wo1u3nvgpw58colvb2s6necl6jolezvxysizgdp84a4p2jvl05vs5uez4bnjdjl4e9f5o74qh',
                version: 'h5xuzkjm9wg13d2a2lxq',
                parameterGroup: 'bin5uphfuokhelz3i3l9niecxvwz0k3eknc7w5mdl3anb2q2agnizs4hov6t386cbgse73meffj92304axrt2o36elfxczf847qbeob8fd845qqknh73d9liafetgihcecb9niqsmvfod0it1mag6i4dft0sf305i9lzsoolk2psac54ohhq1d92i1yto1imfyan6em2zzca0u9jnk1q8ryko6fx5o10z5dswf7huz7y0awtuea0nddwt6ty75e',
                name: 'kbv5x3cwsfilgbtyp5fpit0noxrew9nxokgu83gdqzqrvuuu9pf6zc3kt9owgxakrwwjad47f03pay10o8aozx7nhtxk81l9islo8tth40n9pttapp1rdo3ac3tp05i7fij60x5119786vkokcma1lf7eiu2znaquamcr8el1fo9n6sl9hghwolov7q2z4wuvv3tkol134wozg1ldz89wj4v21v36mf1akbnkx67cqe69ccvaj1n9k1h7u7womkf3ye5wuv6i1amggn4c2b8jwv6l3dlokzi88zs0koztgil8f4esv1n12n7x64sti9n',
                parameterName: 'tz6hzu61ft3n9asktsicsau1pif54u0wej3dc5l1xahwk4ol4g42t2h58wdqs70n2612y1k5mlhnksj02r33iq567ewxdhj9pm85f181mter2yurpq04u3cwrpyrkxa3cvfz8jdobgtqr21fmxh1yqcpikld6wwo8vh6e9swfpmlbuwcfvaupw2ymheb1beiutglpxqnsw8g5g9p8kl2ysr36zbeuo2n2ymiatz92hz2x10wujf7i0imrw6r30bxfakmvk6ddgm9gohdsjrk91y1di6p9ktuls95fipcs06wkez9hcr18gjdbfxo4wpu',
                parameterValue: '0a3quwbhwadkej68ceo8ctlot5afn0uqyma5hf7vtbu8xqhpm5fpz3w43198tszltiob4oqrg3oajk6wiianogwimbwao85vcmij1dhhqlofd74rv82i1l3nsm9nnra95ws0kge17wh8346opmljtnp03ntylrqtx572z2hyw1p5ym3zdk70jzq7t1eul44jx0lfa982uam9lrax5n8zqfz9xl0hq1awnvf0vz3y4ipygu139ohwfh462ld0i8156n1sxl2ox5oucoh298bms9x5tn48xn9yzke0nttsu8xf0nshb8o9j8ci6zb0avqqk4x9avc7o1guba5jgzemm7qgquxh1wz3jwj1tcai7h5b7hek3txbnu2l8rsc9s613p8ig4058944dhojdnytmuqkmw5ti261lbqkhmybh8zv88yu0jcb2gkpugrtlw05exuvkpj9h5nb4zs58a460mdyfco3jpckq0lv7hfq8lkotl47975qgyydo9mj2huxqwr6q509nxe3tx4hgrythifizpw3pfoacnkurls0dri8idrbi0aj1q4tw83k3jhpbre104p1cfpmbv1nfkf69zl3uoovr6m1jk2rbmbdl98xl3kbo9prs7ubrbrhe1fn3szttgll5zlzgrw3zkp268428qe24dq9x578e1lssyouyun01dhpyz95cdasbjybn4kkqb8e6fptozprvsr5m9qx2osxfiz5ydat06mypz0sicwtf6hncsz8j7u6wzt029wbhxc1ej6qjjb9qgfmc1q1xl5xpvm6df8o5joasso34huxwfuuqoer8654313zwlh0f6gx35j7wmcc6v4no5v79yxnuc1x3917nf1l7b12csznqu6bmv5ab1czqgmvbweundvs3ee7xs7ezblxe5x4yxlru8kl34wqzxr4bcb8qrd05qsw3etsuksaowskwvtxo9tnjjx7e3t6juder4h64r3oxnsh1elszrc4chnrb9m5lmfoyauyjtzz8scm',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'be2xtruye0uzq8pkdqorhdqyr2gyw3whbp0sskmxbsb6hhxtow',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: '58w7efz54mkwd8luej3h',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: '9uf4z4a06zp2fjc52v7dumdtswkej7c8o8wtxdn0a8zyz1lb5z31y5uqxcqrri9ck3cfi7615cfzo39otejbu44wc53biac7ibieknpaebsg5ppsiyoodrz5vxgizzkq3sq3tpfgah786fj3igj2ye9de7fq4gf8',
                channelComponent: 'd7seuxxw95u35cup1v6l4deszmlsbs2cdjoipuxkiztogkdvzo9j0m8km5kl5rlwmkjk85ijq09hq7gixq6dwn4llwnpskvzqfog7bate534yusd1wub314ffz6vznatv40927rrothojwulnpq986s7oedk4ew2b',
                channelName: 'oz27980d3zma05ex534h6p92v8czyo9mew3nrazk92o3gi3hz01ntai8idmgg1nsq34im5669d3d6bxldqkmbzk2yyzu9tsf1xgm45ty86j0imxirk8mdyp6ruytd7e5e9y0szkmoadhzmxlq63x6kz1pasikmfb',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'snfnbrmg8buao4ngv6wfoqza13d2qnfppvrkl3g04ua83losthibn0jrrphjysbx10dpoi1dap3gz2gnl39xxpw717ur6vn73la89gxsr2b0wdkmdgve8da8hdfimowh1ryvv7yyvoirfsh77r42rhdum8ntlg5t',
                flowComponent: 'aqy6o1hq20t9r29fg6ffhlqtwplehxqsh0jgvabf7ggeq0pwu37fgyxvj4ui8fk29phlqjjsov4761ytz8suqegaeobzi4qgqjg31tgionqngs5c7qov1w5nzjccsv28665o141b7fwfsuvxfvqdzalcmy7benrj',
                flowInterfaceName: 'almxhzckmxhfd8pkayl6v7jets5e8r7zksygqiagozpqsyy9df2werxstnm0f09kz9u4r0whwn9szydrw1da9kjfw9n9tv2a0hq8wpjkee1v806t0d5gphb0unqjjhv3d768swcwpg9iof4umv45kwkibvdyijhz',
                flowInterfaceNamespace: '129hmygzmvf2ex8csc8ll0qxeoocckcd8azp502t67a8bv007y22n1sfsaoqjncvc827ophhdafkt0ndzerd5y967h28rz0gfjmzxohrlzuxaqmun1rsxb0icau6911o0m2femkftcm3v9mv9yfn9lvqheolfsny',
                version: 'n5r2s33ewxvbpi2tpwyr',
                parameterGroup: 'attrropgbasceb49oy3ghcw5tx4rgloc68ft0i9lnmkcht1qy3v0dvwpij368d675d4ijpsf55bj9ylent0rpphwdxvrpbfhtlv7c96sqj8jyn63eqrcfq5nqk53jallmh3jvvkkf86mq55somvg56frpe6gzqmahic5lin63038bb4ihkfu43ymjp76c0qbkfc63luohwh2zxdupwl7mlfukdzljwww7n4j0grx6a7pby2v8ntq0235aup7yu9',
                name: 'hxnk0j6setzxu6nbfcgql9ytn1ie2brktkzqwb9fzufp78zglhr0i8s3kzjcs2ztu3erz8kisbh1yy2bx2xohaxtf438rs7wy2gku2glju0v12cqo9nuci30jsxow21ejf0yyxd8omsyanyss41ph0h71rgq5ml0txf7r2p0bw91vu8fizossqyrognag8rjx5w991p21tfbz5x30eo9xedzbvk6o9ayshquu5ptteidndzjqymx9qgofzd4oe2q9ly4dp5ymegqswvzk13qjduxzxd3jm45j15pvmv8i0ifq0eae95wlkpt88cz9rjd',
                parameterName: 'tjo57afxxx6xrg0xmr2id52w53j01jbohyf79x1objutuvwoejqelkhavyk9id26sr30ah5rqj4ky0ykt6jhu0h43luzcz5zj1ndpo73fqy3440ddhgr19twee50egc6zah10am3lv9elr5hcr3ti5tn039crpu9isagvilar85vgl295z0ew5wlcl175i868f7i3p5rc0pbbxondlvh4d0olnzbkjhkpet0xjbmza26zd5y7ui1zfhggy1tk3njh7jsrgdu4udhir54ov0ym37bq5uik8bllkzwjh0gb8ykkmulxtyhpop36unhqbyc',
                parameterValue: 'yeb2t85yrqy4pkst8i3gfvb3z92oz5wgz1jcccgp4ok1iicdwr85vlkks699cdhzc9eyidgpsvu2k938nrbhd9dhc11aayce0m9azueisj59g34txhwds9gc2yiazjc3kg6xobxiauhb50a1tpemfcqpi1dbea6m8dczocss89kkihmgdq24ac9vudshbe7vwk8ald0m9uiu48qi6wbm3g4vpkei6dwqzmmqaw2s2bxebynox6m42e03fkz5nvyjl5e2g9par4zet9wzheo0mjr5lyxyk7unff9gkw00it21rfjqlua87ebya25qufef885ouo78edptm6llne5an56oczmwdn0huz4xwl8twqdrkeessfdtl67s35e49vadnduid226f7qh5ktczz7wladbrr42fnffhogf9p90yamhx86k9xc3oo8cvoa4wgyhb7x068mynct7w6yaf0ucvytu7ikcz8txp0nn1luqz890hggi0vio4imq87ff4y42nkxmfq2jaex5qp1skrbc6wrv631wbltag7vuqyp2eglrjynjsm7env7jzis5dttupboey4qs6exzsehr72f6wk282w8ll4atcgt819ycwjajiyuj49yqbya53gsw23iovskkq3spu77p3xusa4dpvb55f0nqimilhnp7t58zlsyom2ds0lf27h94x6ppoju3dopwbag3yg93z03s1tfop13vlbn9n624uywevjc09kl60u3381acrl7tiq0cl8vmuv7n5d0dpuw90qbbze1hezshdfun61scinn2nojt71uol2mkbjshr5m2nch8agusfvmoeaonitqojcqqxenz7hkens544x7a9vyrzkus33a6x0hm7jbwxd96cfsjphz5kqse8pc77n8jno887hc6tyfp0n9d05o6ttf3nhz8ai5gkx98i4k7hipl7a80rt4b0ncfspjumdero9kugxmvxot5j7rlxtu5eyt3z13q2mw0977j6fgrefik0tldol23',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'pic6lg8b5o3s3gepg23uy38eqze732o8vg6rjafq1msztxi9ug',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'npoeetbg9rw9cwgmhu09',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: '7raozg8plp6ofw4kwy13c17l23c6dqpldedx12r9mtg2a3mbdgyq1wcjvykvwoq32ss96k0k66i618k25q5z1255etbgp7i4y3zi0c7bl0zcplr7m0o7i5gou08e1qhcp1y9duh2krxk1abas85qwm4iov2x6txh',
                channelComponent: 'v5wf50r3t901olmitqwq7ifz585g50d1l1vav6h97uhv6yai55t1o3sdjgosx917k4e7si9ybl9a5o8meqyx7eujvyq4iu8h2m2eibdkncgrponvpj235pb5llir9ee4kh51cv8mbtlgpu1n3r35t3447lwgyqmm',
                channelName: 'i1ly4oldu25bf6bf69vqwkx1q2lcz5uruuo24d3gikqm6ew5j5p1w9w1yh62ep3uvvzfec99ipg7ncv3x1taag6vvuyaysuunbyzcge55gmavmi34r0e5fw4ok1a2xmvtrjlgvgz4g13vjkocds4g30smjcyzzf0i',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'jdk43r9r8cg5v8teb167ohrtiq8un9cjxflb5byysfc901okede4btkdj62628dpb2hzb459dy6lmmj3cqrzyjjkelw5tcp5ijcldeuncruxexfbitcxzsu30h34cdowez4xm9ebnuz3th4dqrhyd2s1ojoobmiz',
                flowComponent: '36f0909rj2i91d45xpxv9x0msd89ql0osu5h0780huxf31c72qn4fy1ocve25wptgkfcrmtk3oon04z77r518mbpvkijz5xbyq7wszsmogxztemiubzlzar77a5cpiwlg63t0zplhdk6le7sb4umhd03hqbl18yk',
                flowInterfaceName: '2k9qrmz4sjos6uezdkgqxhf8xvcfy7lkq607i4eu5ag301peoyrzftiabb26c0t7x3wekt5cti31v912di7xsg5ssizzx9k623mpsxe8xahl3z09bt2bqrsxh2mcl56kl8citdaqhyakztwgiexf9o5v4gmw8s6g',
                flowInterfaceNamespace: 'kma2g5rr5m1g5jkyemlieyph6x64kq9w4qu5nytxcice4xouvdq2567r2po27lecxnvmkhwwrp2bgsgcebyx6svsn59dtw7opv715wtvu9puynxv1ljj3fqvsl29zivlop7h59cvvzatr0fav9jdeenag6i9my8u',
                version: 'c3cc2tyht3uzgvj4nomi',
                parameterGroup: 'h9iow2ac8l02uts0tfud6gcqo8ysdy3hfalh6wiiyp8btctfr4yl5po479w601iafsvfioxn05kftacias6rovqyvciru53rg4hk71000x592rzjdurpdrq8dqvmymrplhf4orcyu3r95sv049pilkbpk4cti6un3lxuti4g6n7wjtosz3scic6nblpnq0clgnjxydc3hiqja80ybkaw438bsqfzf24kzmsmfxb35xx87ze0y3az6p5apzk6ih3',
                name: '7ine45f8fagzn31yfowlaew8gvwbw1zaydlvcvn4bsw640z7usxtk84db6vvjfj9fvsbbcsdgxzoed21v7d2ztq4ytdlr6ytemkn6cem9zv8fmxt6xfn8itsgzk3s0evqc3zufm52d8mi0j39wtu2inaryum56sli2rt9z0jx1ztcek3xarezb2lztkn8zd55irklv2utq5huboachm8niv72r9856b2ec19knw5ckwvf8y3jr7n1fisfxryspgpjdewi3ohtxbsruwnranh5b149z9ygb1f4qnah70dpn0lq189r56m79hdmhh8fcla',
                parameterName: '8je5dfjq3o4dyfrggumkcdnnw71fra9tesl96a2w0tfug61xjjq9jc2x4hj7yer5j4wvb4s7rhxs1bwfv8e6xk83ou4kv2tujpgvx7daa4kphb46rmlmr4but9i9zp89upyh57eke63kqannrti67ra8gdrnss4x23u7dfj3g3gn8nszfa027coa75auqpbmv33i1mty8mhmfd1a5kmvz0v551tnclo46aar87rmbja60y7oxlg531r3ld6zabsblbpnecn6gkolrr6afenmij82ett8kphke3iopt04jzn5dzze7v3rckmd7fm7zv5d',
                parameterValue: 'vrswpcwzlqcpq5qprs0y8rst9nyl35mu0du14yb8qjzz0i85p38s0t7m6z82he7mlgf0tgjmuvovuxd788rxddw77115emsc2nwfslqzindx3dtq2bkbft3mzk9oi500miq2akyxf1fzqpgd7swj8fttzcfa91fhibvkjhm7ieg7frc82ugk8drxyt7mk37c4w0veqw05hbcoyclmfbjznmmev1s5jjxzchjicmel1axsg82prg1vsuw3px4ij6psp96w9mz4r7hx3pvmbs22ttpfp336999vaptkzf29lthhdm8s30o0temw11c0czwyxl27e76lqxrk0vnxoi041iqenrik245exyylm3chccafq6s6pi9xdnbookq3s715s0lolhivsmichdnpf6peexh538wfn94njlcm2dlth40nx2118qa2eyo4dtk4mqlu09kl258fq6zj0ec9b22qfb4ixn2ozhdmv7zjaklrza7p8ush2m0x4uk15jaedcx6tlidtu1wbdeztp8k3qjokcifjs2dtvmbvu9wzdyfa8pr5l5i49jj5obcq8cnjswnvbe7iwmio27u0ixs0q5ipuojoiblcajqpo1on941uxjtkz6p2jpyh69w6f3hqts2v7vqwecc3ml709frlfs9rjtnkcgvjnr7w464xpelu3h8c5ltrtx6cy8t57kw7sjviooprwv7nwgz1jja15lffzd9ihxs9gykj2b7t5ojjmh3rb2rblrlv3m5fwghn4q20nxfkvxpshml7xtkqia1cmvdjyvrjn4gfgcd167xi2fol713osw0unrpemm1bpwheqdddestb1l8wjnggv3pdbxi7y0mvghcxmrczxsh4gs3n7x3taen14dz1bz70ljqrbwhiigq2uqx2yw5oh1a0l1p7cih3lm6ocdlge9k5p3f467kc562irgfzwwz9wn214qoenyghx4fal9jh9c5z4txgqdxkl0esmzp1vcowkminjba6gu2nxu0djd692h',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'q08tqs740vzn4lljrv2m2sxkk0la12c3dxtzsf2f90537gkzvy',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'yejx2bnoezg6l4nc4ldy',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'cknm9jnrfo3rknbs4f3ivkx6cuwz5o90pnchan9ityb2hwpvbu0txk1pdzfnueispoluud8az60wbsrlm96zl4f29v16n028i29mlqxijdy1q84gj5w0brbrqm4q4kdy5lpuv1xakvhu8rsbptpvplz266zl5dir',
                channelComponent: '2iz7fbu0bqjtv8iwsbrrg8236452qf9d56897li0jtz9ga5hng6r2kwo6q98rshov3or0edao1yih7wixj1ks7nyyaffs8abffe4t5nom6n88q9mo956tc5vnv5ztdk6rv18q1l432q8tgoxfvbsm2v4uxzak5m5',
                channelName: 'bx54n5sph9j888tthjgneejz258qqtgs3arqkbgzrfr0cir5cpx8bj2ktirktm3c577imv9axcvm08anoc0zyhxyg7ux0ov1l1704g7sawtbe92umvifhou6y114d1bp5piprx3da9r5flie39yw02kwmf05mgnt',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'w42ady87hmplawq84ng7r0u787tkrbx2kpjh8q1rfyt230wto5nmytqy1u5tao80u5w03ei5b6vinx1347gci5xkanjdcgm8aql1rd9p2w0tvjyal6uojy2nefumz7pqaezvw2yxhd3mekgjcl1hwhe7mhac1yavg',
                flowComponent: 'h44v7jgq57fbl5pyq2zxvxf1agf72bqz8hr363tdiyds2lyx6r7y6mvb5644ranjc5z3w7ae1t8oe2vq5pl28e6uzs135j9ba3ghdlvg5bkgcvwdhct3ma6snubwi0neahol6momlbeayxtrbcpalpdy8zcuextc',
                flowInterfaceName: 'brynnb5c7v4w8kzsu0s9o12jhm7dem3v7ng6fhle96og5b50t6ylva2zjv9oeyw961kp9ah12mtja4sqymyh60a9i3uxvu4726npr9dl9ya0ccstwedgk5btbz9p78vm6zbn8bwrlv3rkqkij6trcptcmkl0tbok',
                flowInterfaceNamespace: 'j3b28jeccyuika85rw4vh9fk2k42qqo7runt37l4ox6pll12rjt9ihlb6ywosxte92zriflmfzda5vfj4joglwx6nid16ckahbpkpz50p2r9hjarfcnlemhhvx2bdcizjvxuk4vy2tu6anhvqzn5yt6flp6ay4ca',
                version: 'cvm7yi6jeodwh3zl3ly8',
                parameterGroup: 'h1xu8j2wdbuhnzam0xc9ymfdzpuuqrkyry35s8cwxlftn2g1hqo7z5sigz0v4umj6dj4wkyr1g9rpzxk5b7egfn0gsxii2y8o7dviibh4ufp8o3vowai2u4ua5xcq6cqrvq7wp99pils6gsboyib53wz1ieksbyadrouh14kqyips38o554no8jpabgfmvbqmapd5r91rj8q36lcvn5ks6d0tteleyh3bkkwwpo4v7d0kib6nnge6jt9zrl2d8b',
                name: 'n05824lu8e9i0yf9nwau6wg4zgixqw15vbocpv3xadabqjc2nhjq2mt6753f59unk4kg0z4zqfg4e4savdpiifjxi1j3of7ldj3287q5b4kpujty1mfgxtp4k5k5asm843jwbxfft0ti8yj6kxotx1x01qmhu0qx12r2bni1g3wjfus0kdgsz1lwbyox1weotkstq7zwc6l7iqnl01fs9jaqjwzebqmwx46ev6pms2dqcks8cvujzmnw3u5wxsa0jzb8c0zwz4j50qf2o8kebytp07al684jgfzmxwory1yrzg0otp3fw0lxnwbwwhg7',
                parameterName: 'eppxfvm5jl3lb5fppextjmtpfmu67q5gqg08h2sumu6n9vdnrk2oijbjhud8irr2kkt6i5ue4rxcepc0ygszr7nx5mcff7ztsglga0hponkafwhpdp7l5l3r2isptxrfc3s43swrw0numsvh461xbgycdknydg0ldwde4dm8lobqn5m2dggazjfapgslnh9b9fy9do9v8f9cq0oiqmngzcnoio72gjp5j38rt4a0crovixs70oxc83cczur55bcrnzlgt8js083qrqh74yrvq486j6robgt78680nhl41wcgdfuekunrygqi7r9vrlxb',
                parameterValue: 'oxw4r5qzh4xp07mflszdshufd5k5xpywtai6yoqck2osy595e2342w8m87az6fuiipdgxdo87hj82aatlllw6skrgxwyh11452lsqj9p5hco19l2oemi4zsmbpjcx5brnn95y13j92laa5w0al1dylyf45f2yadppa67qjwdjnbfqsu8l4n1iss3k5yok14medapnnckn0o9fx00zrvaea35uhwcc23z454mx6u2591iwnj4wsppt77637peeh7qfuud0cqx6dorlw45jx3jidt2nmucuhul8xt8s2cudss1f9haoxu1qkhh6nkis945y2k1eeyj4efq3gzxn0f5izd9ukddnps16ffzr8dhy7rt7qb5n54up691azb1khks462zkf98uvill59smpgjal6tiawez7o9qznza5itg9h45quryycualaip7pt9uhrh90pxx5qnosyhxrcg59ivq8y6v2rimng7cmopm6cks9oqfulkbc2lskevt6daejd248w5xslkqv02n89k922zpjqw16vhv1pq697byoei9m99igabg88yy7bzuvwoxpiwcymx1ghoucjqdjrdjyhpfca3lg31k0gf9lrmjj0efrtmcsiyi8ekmhrr2suaub3v57d7ldahhg6asjez5n7mt7x3vjxl557mzg3gt69k2bu7zvjw4hoi7y5zz83iazbd1h4fbmrpfffum7swr6092aldv07fwa1xrc3nh5ennb8x92a7lyfeybwomv4eiu360w3hnm4ckedy34yf3uw26kbwn2qc7c2717u6j4b8l9cs7bah2itdmncmjjzefwuhlu0vo95owkbr8ynuxswz4s222xt379wtsjlaou5ducv9l0zh5ugn7ir273lsu7yfhabqe70s3607pa8h8q1jcde4xr0wje0mk0m1mjw1xc2l1tu4xk5t4701g5lrg9da8oet9ewx91h9ty25ke7ecnmn7xfzbo2m7ais3pwzusyrn2lvmrsdnaehme1p5i7',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'k8wvnnkswb9r285ficjd79r17w4ytvz9zfb7jz2vksq577mpag',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: '5vryenr8br5p3hwbn3ky',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'cmhnogjlbd9t8dlwgzgfb5fcji4aetnc46ibmgizhisxnj2bilu4uw7rcfxui0to3knnmhohkg4hvbptlf2xz83ofduvi3ty6ag7pak3d5f0rz6p9qe5xv1gvbsyx84is5masu8g52emtgzg0s7074tsio18taek',
                channelComponent: 'ew62fna4jto90v987vk5m3d0nwddhztyse27k6tcnb38rg2kxmorcu5j8g44w3zrgjmbe4lflu4m1g2wdsykeg2xewntn90zmwz77cgonfp0pqlt0vvy18nhz8cafv4f58wcumploj2f9489au8m043eaf146qsd',
                channelName: 'tzl0erltxggvcqi14kijw5n8e5gz08qa6ug95mme310c6lwo6pudwrefc3av99cqorkdktp11q0kkxvwudgalbg3v2tmkosueindmjcs19ge85ogc88mkvig3r088ivmnqf2xain3ryw6o65dx8z5h3kq9ew9ch3',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'zylnnrfgrvkxpm67u9ly80mdp6h67zsp1duxdeerpr9q3m4lkv7jquq3x0vfrdcg0fzw8hvax4wflkd50do53yz2gmexvhz45qo4nagoycu74g5edcpjd6zemyky6rw432z3vmwfivbgcgw38c259ivwrljufr2i',
                flowComponent: 's5awu85kyy8nsbf2xm6odno0ajk3xsfmcrl9oo68yk33wqt4m0np28g61mntbi03fnnh4a0flxfb3ss66s7g0x7ogfmvxlgo7qjmbedx57srbb2ekey2nwka77g6seyaa9p3yjcoz5icgb7dwzpw7gkv18t3idt41',
                flowInterfaceName: 'cg0nmwhbqqm7jbkrvtn8ahi768c6or8llj1panaenicqts16ecx24l5eorzeoo8qzsi5fz9li1msu4px3pdaphs8o59ydaoo0by9mr17iou5xcq3eyn6eh7691m98edbt8pfqrm8hhd6tylq2mdbwlk0dvs1jwa7',
                flowInterfaceNamespace: 'wd9adkafmz4hofxssgktu6elhyf23rw18fnjf3897looio3dbmu8l94wdem4f8aa8km7fgjftnluf2mj1ebds6a6nexhitdqcntub9nwbyk5rzfpz7biqp26s07y27j4jyi16n4i6vkdfgwux8zlgp4b2ip974j2',
                version: 'dej7tt4n31z4bfds6bvt',
                parameterGroup: 'uh22amu1jkb4sf8ghi2x4tu4qzvhn789jcjrd1tb5m63n83o0irsnyzha67tdzj4r3846bgxtg5kqau30w2yat0iq15xwvfnjw2p6sbyhebjtecdn5csgmierozisrsujk9gdlyhl2y6t9o0cz5vf33gsi7hx6rteyteych1iuttsgr5nugio42p4pru3frardpk0u3c1ffxlst3wbwfytme1y4kvwdafrwfb67wrxpsk51lktqec3j2vil8dyn',
                name: 'm4ljkjrp6ycgydnxlbs4i4gxkrybpt1600bk3udhzq83tzepltsxagpeqc3sx0s70bxag22p5zxipfavmxoss5h1f6p2duhpyn51wwlpam3upyjn7us3kxjxw28fsbnuh9dzwqrpi30svtz92co6w2wkkr75uxzbzaz325bynh580t6yriu4gccbk879l2ithkpsckxsnddzc51vr4jxozmylzrxao6sb3h4u9naxtyjoyetr4w9iffpf3qruwrieqx7mz8w8bhi5rc5m6j2bh1vxeze4dyikqhusazheulyjkoshscxmc2m6i4870ft',
                parameterName: 'h7njpihq22obgvk1o7l0zzw6dcgas54mmnj3sf423of9twbpk29jgzcgkps0bacw2xj1yf269ud3bzvt1ogeu4i05mlydg3mm7jhtd5crveoefukq2q7s34c1ol4vpt49wumds5i9ukw45ccbbkpvyngnhcl8rnfzzukgwjgq6jxqe94sic1p4cb0fwkaemidis6rbsm455xyrsi08o8o0sdkndzofqqubi9qf48nzw323ac624kpll8anph3cqhldk5x07a8fy11ynm2zfsnaxij0a6vz17136fnvtwxixk9ki915xgnm7xiartmdku',
                parameterValue: 'cqbt0eqd5j5p1corj2lhhfbirm9l04tczsapz37oe8pup90r581m3ce76uam0o0ealfpgypfjbnq63n51orfjcxzdjyb4arh5k6xqyhgpgmu3c8gnsk75t15bo72kmbebcxjf2sy7sfu15l4mymv9mbj85sy3ct1jjzuz0z7mjs8vwvyace5742n9gej31zvutwr98mode8upabet8k8x2y6slzq55kt2pvz1cmtjfdxeoszdqu99qbtsc7knqwyhouid3ytq9f56yund3pehcfowsxgc5bxjfx32tuv30oz8qjwr23vlvvwpbbejjhvj3910kvn2glfdvjewy1um5d4wdiwmv8qmqdtxms8p34skuuqd5vk0p4xopj77kmtwjsbwo8m3bpsnu9f32bk42up05ndxp1021c89drk3xy2vzmi5l6yiz6ncx1dar97xi33bzx9l01q8j2nyyep5tkhf0mqwm4wmgepl8rj5o1g0ful287lxbnht1dlsiiei4bdcxyfztrt3bvwq79vullqvr4m286u2up358wk7eshov8eqn3ap39x3dnmiu0g42s7r6xdvjqbb1f9xj5cdsjwes8qouakyfyjyntao859u09k873wld5bafifn6uhq2sfjao8tynpflgspxxhzozm3amjohhfnwltjf64rkomokr80vowgx8p0m62ahnhtye3q1gzq2fbpjmphjlzos0e30mbh304gc8zdwoiryz5btia1fxe1vdsb5uv5v3v93dpdt1pfvxmtpqfqav7ljaz4oa8l89vak3pbtprh9jetn4mgq01va2a1oijixvl2mrwynp14bhk8o020gihjx9c4nnbykxp72g308jb0cim2jlvjoom75oseftsrlvmjtjmu64gk6gyh9qjpmalah5zmsl9wocr6lkdm42oj4psrlj6xd2czaooclz63ee2ztxv83jt0rzq4hzw1h0rmw06xu69ttgpn8pytn0kk68w9tvk516jls9knahee8xs',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'ohiji6tvnum5ovp5o28idgpqkdcb5btrfxfvc3wqax1ulg5tjx',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'pu30ybj6pbsnxh0p9y2z',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'x9f92w7o5jhqtihwdqt23y2pvln4q44wluepcndldsrwrcg4jd51klwjg58efeb2acabal2oh1g5r63wzze3uba7tcfwlugkqoc4adloznp84pg96n08biw9qnc5ik3q213bkstmt7cj58c3f1iuwbna50q5aqrv',
                channelComponent: 'fecpyqlle85bq3knqb4n9fwk8h527wkvyb5hbzjwzk1kjqxsu9ys229qe81fieqfzw8b8aptxcv40vipexhjdrhc3zbyj8dt7mw9oxqgor3340xgskywl1b71zmx9sr11j88hk02zgz0insebav47ma38rlddcpx',
                channelName: 'dr0n12nwh0h84r3khwjcesfzsbcrt7zgeict3dcbahfgqrwrqougp7hl9ubn02bk80ivvqe22fiourg2xlp1j4yjygoxt2gb25uhyi3ql1u2922alta5nh71ieols3pchwokxbfho8e5j2ph85107uz63b9p1apj',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: '4odr2liwqxcs9ttrolu0stm9q6ubjvu84sgel4s0zpm76f05ixmal9llmwlt6y6n6ki4us9hxy507bn75il8puaswj6u0qavzyexvdcqmmlylvmown2zt7jw2qnw8jsw4e97xek511x3ch7pi4vnxeho069nm6ak',
                flowComponent: 'a5j6r6sz9z944m8fszolfmij6s2vhhijg418ob53454zqcgjdc2i96if0u79nergx3v213j1t0icrfzf1n969szeb7k0u6qxgyrmos67jn6rc1plr5721rw71zce4u20bfi8oinp1ne5zp3njw376ij8pvz5k4h6',
                flowInterfaceName: 'cg19kuve14rtadflkcn7clhgnt5uuqwlkd3w4q3nb9v9gn9v4yr7s0uvfhb0zy7bvudca9curji3xlq5e5zfg28y2666wp899dk3xaa4kzazbm2ksxhhswhyfk7t0tp0coqacrget3b5x9g7xuo1i6v884qgzurfo',
                flowInterfaceNamespace: 'qpfijn329mjf1hfgegdz6xoy6vbnizakpfft3dnwazk1scerfe2dyeyln6r012yzx77eacm6d6jnvbzg5ap1x9y6gw4yinus04qhd7m413xpt9lueqwtpcpk35k7ofi1wci1gs4jnpt5azwo0f6h4veyjy7rlgo7',
                version: '2hlyjm3qofcmz18jrld9',
                parameterGroup: '993s6xi53dookivexqj0sg6r4g88kwujm3f3thfajxe5o057gxb8cxxp67ip41ptco4ql2fqllswvmjhajsnbvor12cr96pa11065ab805dugl5c84ay3dkmiakyx3uktbm1vjp0ta4ytozd3zrg1g50gszvy2yj77q66ilx68g9ezdxiits8ncps4ecemxebq5l60auccy7f8yj4u66hrfos4zbxj7nbt3b4w1xexry6rw8s0jmeijyx7n7uj7',
                name: '2lcyjchl7dc261q6mxjmqomv1h1mu0v9pla16sqefjttyxhktbmp8d9a5bkh862t6s04xaosnplhbx26k9b49yx9cyn7myy24igh5o87w3vub95mfe2jupzr3vbwvdf0q16zk19oq81u2nvtgzsfr89ozfkyvguf8so08dqwas1ws6f7ykhkp0x48fo5vpmr5utnsw6psb93xg4731qkhlqitnn8fo6vlg605fcms1qbe9x9ut9yfurbcqu6386yq5e8r81vrp41pfuwkivwuj92si8hlpdmmns4vuo37ca3wqpbbv0p94cjtcdx3kcj',
                parameterName: 'ory6a5ofglxbnr9hj28cm6ffc8efbxpt7sdhfblvwl0qaqobyszc4wus2uhpgv9ufom1hejok25zr1rn3apau9bt87kf9eew14hoblze3bufbxen2g15v65ee9qidyyu1u8kahd963ia0pfy3e7e95nzol42lf05mj46mqb7cv6deamoofdr6pguhx44a52npwc2fz8bwvw7oaa3np3828cr8csmtzyhals37xqyux00p2ayrb2cg3x30d1oodg98btlezbn277fkweq7sw8ecess6rb1atpmpnrxhbawi4m4ie196h59wxtrb1zgtqz',
                parameterValue: '3jety557058c3tptkjwn1keatuic5ffvv076g6a2r1vzouye1ls22294o90twiq6xhpto5nv0aydzg99ehd9uf99lzgq1c5vhrh2huv9e81huf62vq6z8wb8empxsfhi5zmas7a0zwmucm67veyb8l36vbd93sfi36rao0f3l49e6j1ci2zhl0b93xtomzamy0sf7xakx87dlit107b54810tu8wavykkcvk1y15i38y8h8vtl5rk5xqqj5ui0nyvvo5ei4s6e4w4go4han42yx6nbb2wftwy9sb97zw7l5d8cp00pp7n0ls85tt2f7ztzdxl1ve396ghmfx2fv1ovpcmyhm7r5l8f0qwkju8qrjxjs018bqi0wlgxdxa2qkoenpmyulexado524irlr05thc28312uy0n1c8af2yjdp7ltnsnuwhwbd4a52p2als0f4l68vvv7u8teezwo5athl3aqtasjyolzr4p4ned6daowg1cfqi39vdzptsq2ugjp8mcynzfd85hhvx19qpiw74vequlrerhhev0vcf7wkktpgwv3aeu0rxv6sykg49csc6zpeziwa252po4fytf1e61yeotrpvbwzleupdxu5fvqw03gozt5s1bkf6i35w9tixtebbh8ud9umrb5ggmb9h3lpzk4wtbh3gjzuy1cwkedr68pm1ggipc0fjhoqmc54boa0qr0vknufd9uf28mwf1r79mzorqed2rvtaow2p35ukq3acroll2c5ccdx3i8rnjdf0q3mys0teojbby1erhb2s7ljs0cwo0d6qo4utoeb0jab7qohesypyx2oeh4ijzg2xnjk0zn4gp0gqfcv5ypjbutkvynp2a02wdlufyzco95e5uldljbsgnqpkcb4dv0nvfhtd6pzksvo48zwubu6petui4fcq0jk280fzsw9hxx3bnkz4t3lcey0e051bto9lxuciirp0cner8kxswpq96njjwctlhtd54ihyqigx4xv6mvkoj8qeqbe',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'l0f7m18fw2clhv7w89xoyo5p5842x2eilwypot8aomvfqxis8d',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'fobnadgqajc0jh4h4mrp',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: '1ed72nhlmm3t333n476em447fvljip2r5482jb035lkpj1a1kj1cgyfzf4spjsuqj10o39l0xooeamiiz5mqzvtmqxh8i9x1gdfcmjal6og8h4h92ofn3lopg5e8xl5l7ab7iurmbqzj0y4vhtv70wk9yzfuxkvr',
                channelComponent: 'k8rqc0j2dn8zuujcu6i1p0cm158kdwdmczr3qcbop2eyp87mqmnr4jcncv0u8hitb1jrcxgcxhqcowf903b2s4ymay6mz03l5iwtgn8gbnkswkoawk58gtbom3zy9u9opl472tuvi89b75baua1r9i2l0came7aq',
                channelName: 'd9usd5r0mwmwn31ae455c19ozmeu2kjtog41cc7j9nhzd8mh5exutn6vg1dnagtymai1ixus2o5rfjkb43jxk0zf7nz89c69sdq6vgcecg6mvuabop8svqvbjbbl9gyi0vgkwqb0u3yhpc386ly1x5xwunjqu0qb',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: '6h9dwa5oqc5djzljf3bqgafw8x9y8g030ors1emx4y6kngownhegj78fc3bfy51jboy1t196y47uj2jxz0j2ag614fy0rm87y6ede14ki1tmu5jfsgb6ylh1p0pcmf49ulhb798oyfupp430pnbg859wjqz6np2o',
                flowComponent: 'k3i8whwqzbwxaa7bb45p3zl0wehh373z3v2ggslh2qjn9aths8s82lar8082g7dw1l06pwmsnqf2qr40vl662uwmgjndo55oa54mojmgnoxxas2dd2znijvx3939xhmh5fg5gofzxbovnxlkoi4azoy9pun9othq',
                flowInterfaceName: '6yybkouk8o9w2kk9xqeckswhbx4xvgw58txomixy9fr9kcho6d3jidqe8327sikv8kjkp39nhdolcss1k9bid98z6yt78n2dmffirw2xnkllypicdsbp5wuctzzmhdbj570o1zx77su1ioxowhi57im4ifgjqpj8',
                flowInterfaceNamespace: 'no81iwoa5iv8bxtr7qyhlivpu4qxy6v2n0iuhfcondo3h55ip815yeqv3chs7rdrzjrf0k7k9vkpyfuezc6itx7bf8w929mzsyia9dhjwlbkc7g7vac1co2l4un2up5d06kc39whordfaoy0pa1bepao6idso1emx',
                version: 'iupiry61zsiusb76zvbz',
                parameterGroup: '7pvms36dji9ffpo3lqbg3o5vm3m93rty24d813v3dl2wqylm07sn1gy1v6o3n2olg11gc2tjsqf41so6k4ytb8yp0z9k6uudn4dzgmxtxbxur6db13uvf41f4i4c7t8wl2q0jmg73qcrxpitv8ws0751lnfd71p1oid9gnxs3h5o66ixeailr5x017hxx8t0rj7gxv76ob7o8ri83hd66xm6gttxxvxfxk5g4pc189vgy3kzncwabz49zmzahu2',
                name: 'yxu3827zri5nmki6ryppw59hbqdv2dsk1fvavjlnsy0hw1ode6sovowe2s2ii2y5xqi8cgguqmctltfoqq63bq0ge1mw4vr1yp3yjozln99y9eh46tzc0z164flclp4iweqy4d77se0ysephu19qobt85s9ftdplkh3hc8vqni1xfxo4zo91yleifrhu0tnns724ikdzsgsj8tmrc5gjyv7lw3jt69zi9h0f43fprgxy5og1bhi90dcrjquexi65e0suw4n3s978un80qtfs7in2kdyanpsq7t5e1sqn7lp7d1a11prstay1cp4hrlcn',
                parameterName: 'nmc2mwp189uyuumo5ziwnnfq0iev5k8n5h7p39dsy0bi4ztlxf6g98scspv5p7cft32gq9c204obcsz8glhxw9uj7ropgfg0w6zbmgoebkpmn1s042dwoxsiz9i7uinva0t6qgfltl2k7etgg36wbg9qknhqnubqimiaeftyr1pbnbk8df17p19i4no1hy88tbebra5s0vzr6c4jsxu1g7v4jert1p3cf9128arx7zs3ckyjwucppfpind2q65jsl798f75xewgh4cigdniy6ymotwhugh0f1dml8sy8snil8qa2xf2k6ned3cqurjqa',
                parameterValue: '81t7b5kjwhvmyqvg71i0ewdtrvrmqa7dr8l8eqjpw2aosj5soxg3rf7rgeb2rxoau48dqqad6iqru1upzze4aapf2ixtlwptvuds0h0cn2nuh9jz5ms2tmn2sfu6mjv57o8pjute6iwddxs5gmbyvm28zfz3krwyf0p3dgv267bp2xtna544lgvp8gbqc22ic7oabve25tib7t7vsorxb6dto8dhpnibt20hy4x93j28rvw3d2ugoo7tce6greyyvymuhzue0b7wx3b388rvvgieyax7ulgic3tnqyc46ebc58wdyx8my4ky2k5b6p19dne1mxi0g2ew7o011638l0d7xgyjxarhpq8rtv1zweykmrf0noqks60qj2bchujh9zh1f7cpuwgx820e1ahttww3kjp0up3v98e3mm9h9vj2oh4sno52j629ig4rhqcywxye3zb0rb7aha5b086m2shsaswlkp1tazkqov7mbvaz6os3av506rhc84rlqhvps1wsx75sfxy579s61caqwjsnyysm9p9shint6ndt7qbi5p27hxv6p4lqc0w6inf3o3qhur2wdlvro7ye4ot4wn9wtx1qkeb5okp1w2660qsqwazq8lgi29xisbobh14iby1uyag6chpe5gtcdv6jn0qgwpmc59x8uiqookdc3s1okd4k8aiyuooin17j0dcmm106qdsupxsbatmjf10zzbngkd3sskl0adunac7749lpp4jfcxk4x2y7wfxeejdz1cbov7xk1gpjep8xd1x84zfqfbhtnksc27vu4cubazuw4qvbgyngwktsjwknyog1bmxuqk2j3qnuunaazwwef2iqz8xqekpykas1ytcvolpfyosyilhz2v2ii1hvr4f0v2a6nym0bvsmglwpd421rxqm4piug3xq8e3zk45pd84r8wv8ea6wu3o3rjn479bvv83p1f0cew6nngu0w8eex74llvjk3ynu77aqeyfif73q36vwzlkhuu16xvw7kp30',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'lk4kb7z6dmjmw8d17xne7xdii3rcopd4wptsb10mljorep9n6l',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'x1hw05r2x6lcque17g1l',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'k82v4u8nnuspjmu3kphfdo35qay2ykwry4ia8ttao1y3jladgltib1n3d3m3f0yi9t3zlgcg30lefcx90xz3gy0tz3ugk38j14x0jawt9zbsf52fsf96py8eghbnx0jkh0dtuvs7s3lfwdwrrfmknk3901isd055',
                channelComponent: 'j92g5jfk3s3n8541q1lipdx2ggx0jdgid4i70jwn8w1jp23j04t7ox9q2ymwgse9h666iav6v5cyqdgb3qhcegwxka432ib0iin400h9as925ylhrl9jkvav5uhyhq28jxg44m4dds0w7v33s5x9zz095o0pwcsb',
                channelName: 'onu7hboft7e3ei7gdrefn2jmybyq482d7bcs1o42x0lnqwl33v9ordu0b8dzaybjou6236bdpf6wjhmxwcr6dzckh5vzuue8z1mi7itlgd9bdnu5d0a97uq4to9r97axoiu6t67cdtqlx00vyo8cbrxsbd4ffq74',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: '0e61x62tn6oa3diuci0yxzw5kxmaqddwcmyt3gubko97p3h4ad3oe6l6rdt4bpz4wk61ad0prod8dpd59163y7cwz10kbzcxzoa3gzd23oqk1b9k0u4nhsl485rk3ss4ha9kqkuwir3d69jls8x707waocgzdk5h',
                flowComponent: 'eu8ele0vn3cjnaycd5wjqltdji1jhpdvz3qpi2qh56xf92ap8r8mqsa1pblybw308ntvgrdnqqhtw4zexj78rntxv0hjkatmsx76z83wtcq2uaq0exaymvzeu707jtrsg1tafeqbj9zlw5tpzut0m74rnpc1u055',
                flowInterfaceName: 'wyp2y0ocob461cyxwfcmiknqj2j3qobopy6govgo602udm0vslnxuispk49a1mu798lsfcvh1ucwxfdle2psgeegou397kdq1my49te6ikcex1i3gtcfw9oqf6r4ozxfa1y8ljh2q51zy4ko3lf4c7hlprqmcopn',
                flowInterfaceNamespace: 'l7rvvlctd0qc1x2lflwi5r7bg6ejbzvuz0vwve9zyomxps0e7ne4msq9x2712bjkq9f74kuav1naytv3vl3kmrgmwh17mvv2qklv16zfypy1htxpawefbqqm5i1zbgvhlnxao8xwhk7zgki99d471pxvqgkmm9r0',
                version: 'xzm7lh4xa9y5yer63z1er',
                parameterGroup: '1820s2zth0ljwpn7wapf9lshysejtsjy55xb5qfafegfqnkb2ril36as5pfgh0yc04rvgx4ox1zn1lxfd19d1wk1o0mn76zbs6hvkiktdxah8w02xjlq7cjnrdbsv6gexjti388zajlgd2554jt1g2v7gz2uucp2iedc2iutndkqtkw2drg7sia5fcd19shuiuflzo3t5cn0qmcyv3vxeo2rcdnblov4hd3kupmar4j878s2n69xy4jmouemmns',
                name: 'rou7yvvzzmrt4kj6hly4jq0mio1jji8x0qzxuja0ep8j791zgrfr7i2ezlc5plig8z107ez92xwjjwunfppocx7s34ewma6eims1xf0wj48tfg3dp8o6nphwifjalcgo56ert0y9bezhety8sd6g3k3g1at6j1vdvz5qbp92lvfzln6jtpjec3i8acez8nyx05cktpk3t8iqzqsevmr8wxf1i9tz89zz9fv2cq3ih3yejba4ak0xqj5b7yawnqgk854nibldaaj9hj7wqe1fns0v7h66judh9jxehwf3xdt6lq3utyo5en9tvdy2lzay',
                parameterName: 'gu16bctwduv7u49636v0d17nf0h3apg3wsg081ikvkm7egznia817wzgiwi41vmkgsuwgyejwwcy3n5ilka2m6vet4vbamj61zwh9qdy2ymwvg1s345vilcinmtu1sjfsyd3xi4vcnw4lzeskoiwnijarlsgcpcf0gsskhx2nitzytrecav603ndq0s5k36smkwic3uhpwlbwgm65297jz1l47km270u2w2tumyntaa4iywyhlh5r0zxk8aqnmirfb8f9sz1v43uxiv4hwmtmlrmz0bxyh92s91dbqpb31y9f9vdgtsx8dvdxt3xei8e',
                parameterValue: 'iwg3oveweeohp9qgbawwbeikspxx5ujow4yoaggdps3m2n66v6mcgz204rkx9bbhgfwgvfuapdtd0dik14znr97jnmqxs3w0j3bx65bbbhptghrsf7yriz5ptfwm9lxmhgm4apo67mx5a31w3qc2thc8z70qwnv7k34udhom0kszpeqm80nfqmhf3rd6xjyx9fwsemxsut3zchn6musua53zp6uvmuuojmmzhp5f8trzo7lp4zwj9wlvvcmd3339lxlc4rcably402mhz5xuq4asgbl9nfwo8rvbtqq4rdw85lts20gwudf7gdku15z0jgbyzex6u81tq3r9hpa77k5pg97y1xdnowiwdefuoabvrgxvvdmqo3ukbaou7ya4svztn6eg985vhdx7pqbczaadoht53utja3rg37207nelqtftu2pper6sqa7xu94v6hf4e0o3cl0sj3fmnzzarv567qrpj44q4rim2atcwvxmb29vaa5t7ltavrd7idd991lapyed7emyqw5oieil1wfvd7o8uyr202xvskaztswou92zldjlzz98ghhu5tjj6jy53gt2ijdd8rdmwr8bljd53v7pfa9qgxpmqyahieuphyiea7mwt2ezujqzuto8vslhxlk425s4vi247urfbghfb3qxhiikjvuozyy2h8e6yzqnaqqdnafyqwc2eqcej4mygei9g55m80zgr9y6h5sleeugx0yxxeir0lpsjcf3edscyzfpn89rj8euzkl66ahmkts3ktgjh66aukexl7uy6mhm2btxxdeyk0opymiou7c4zqdr1egy1qqog004ce8xs63k5217bwgk8qdwly2ai3mb392ymq16y3c842d39kxwp94r0v29646c52ng3ol1z1yix5n1xj2wx8ymz6lyxh3xlx8v78u117zseodxme1d9laglc7uvsu69lj407oe0m1er077rv6rwkbt8n27qiggtnlnxwr0winivb5p0ilczj9lwia8c8hooseu',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: '3l6zn8mw458urygxtln4vg3awdrhsznwavvljujcfpyvsj0aa2',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: '7v2jd5j39ru4r32spu7i',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'r8d543ef10e556wl9nw6csb702obtmr1c2vi0sdh50ugasr3zv9bzei2z8mdj4xka2dgi437jnshgforpf5hjri15y4uvnk7q3up1vdle1a7mthhjhdq847j9p07glcf98gi2xbleltpa1995gr9hxijna9b00k2',
                channelComponent: 'tm96ysbqwan2uhrg6tbym90nybxfpg7per5awk4jwu214hc7fde83tjp17eud9vicays1kcmazpuentv78kr7fltijh30nfwppqd8ef3ijkpdmk0gc59zr9q0v7buwyl69t0q8xsyzn5pxtdv5dojdggfsiw0zsh',
                channelName: 'ltof0xbsj1cgtk15mv8g9ukxmc8vgbp40d7ovfcve1az9xhhqycyp6ycj6mlmmnqcd0oq2s400j8xroxiu9v9o6muuelnlt754tchpxvmno2i2de4ac00sfkq195j1wuiyhi3znzuv0n50cmg5jyr21cue6rvlqb',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'y4v7n50psi7rlz9z65w4nghfzmwoulczkqk6k94hpv8iajkpcxry2eax75ib1vwjozi4l692cg76wq743f97z2m4iwzqmu0jlr0s9jq6n53y2oayu93g2j4pm8czpums17hfzr44ezv5u1roiaw25nwup5gny8rg',
                flowComponent: '61skt1d0t84t8lklvd0jj5kxdhkaddwyp9u6jrik8j9cjo8bhkcodi35cxgixi5knjcnrmn4jhej6d56deodf1cpun7fdmvd5lembwxdv375gha5si9wq2n1fwvworoqjluzxon227koeazqcovuwiv5r92u8ew8',
                flowInterfaceName: 'ls725elfapnf27inen5hzw4jkc8jec4yk7itzc4t428izwjm7hstwxbsgeuqsc40u0npgjrn5wkok0w4zqlzzgeucdcnv1bi4y86lwb2km1jrs0u0idekujo9ef08rbnvun21c4il2ui4rbfid2dhkcuobv4kpee',
                flowInterfaceNamespace: 'k7btmqt11tqcnsot70cpgf6xlvqqnwb5oxefq7ez5vq8g5cm49wbhep6gr89oidreg614wo9bu0cxrnixm7f15ib63u5g1xbsw51nuc4wgv2ep2suktwsfy5k97167l1a45vetxn95zxknyw7bziubhgxx697wpz',
                version: 'tza20a0v0g3eq0nafiza',
                parameterGroup: 'tza0pk2ujyhko9d09bxe58ssxjqw1etecw4qxxmlwp96d2cz8mlkt93hb7r4ppxt1opr1150gczvtaxos1hb0vne19uelmmgu61whm8x5lee5cnwlnwdesu4wkz67oxc4tjmam7lz8t079lf6m8z8fc3rbnp02fep5ytwb8nvhdr2423ab68ngpwv2k3w3a5qmti8fjwtfqsqibteustvfg30bjwx11u747zj8dj3r0ov9r9qlqzvmd5yquc2z6x',
                name: '3ddsp77v6u08r2yl6l8j4j1tm47gg7h36jxm9b4kxzs2ops9k69l6kceeuxnpb0uu6d8ubrovwzjf5yeccwp0g1atd9lvfrp2ptt3byyspbixsy0jug0s8boyj0yyoq3j35qacdc2406tr92yy281jqo6n7k9dtwjudpipwpd9om7oq54q6c5f77y74khoywkwphx0njpfxyx43m1n6nz29zdth0jqcuxrr2cyjxfgpsoee8bmr71504ctc57c45wx6gcnrlqu67jxvw6nxf27xpxwhbhcccinssvb6gbhee2gai4tza997gmzauiq4o',
                parameterName: 'gn5xw1d5ll8mphbzynfz1ocwt4axptv3zc6uhlyyvn3eppdwe0lpc0zi4uxz5l2joaxrjjxzrf1lpr9octn6rtbllip3pu1idno8bf8pvzl5hc9qo5p8yzdkla5vqxeh65936x355mft4lkemo56ufpvjoqzcwyw59jnk3tvk6357xqjaby1c1wk0lutmmaw8hk8y0tqdyfto55et9u7p2gs21srgz3re8syrqlbiz1x4vxiu8a1czyk3ql9l8h54imiq8pg405o03hfn1kquw9whv9lg4vhj5ki9edrxnvagholpu1tytceq9d7uk6z',
                parameterValue: 'hql24hlwxiwmkmas9iit95bde460tx4710yx68ur3vl6zxbhfpv96bihe27lp3npm2gs62vupna1owngmov9qvbr06nszi1lcmyikj90otzegxegsz9em2iotxjfhs5l0nr8319xd5fbdjeuz66j3yd1uls6qwrexhxpyk2k26eqm6wvhbajf6zg0fry2v2x1jszx9643e2t4a4osqkw1cilgaa21a4o5m1w99kpjelnfr8xby2z5whj9ynums1s7a62kj51skw9mahr573ey3p7rf6v2d9snp9ow85x87q73gbihclg1gvbb7bg9r6ul8arfp5ykj5xrta8o5nw9h1x4vkz3nlxpzhkdiyyzcr3tto7kqmo1ke6l03spws6a3sqemopm8lyye33qwy64d40z2b10zwizzcf2tc59e1w3to0v596ag2drgfg1spogrkgbco5ql8drvm95n58stxy5qx0yjv2ogm7x5g5294joywjud2nk1os88z7kqy4a812zb5e8lt3ipnpg1x339o76vpngmu40lmghrzdiq4nklho3vepqvui2fnwf8786pg3xvig2e9yhz8a2wdi8ij601y2am7x4mfrofgsj2cwl2z8zlwvl7r8a51r83wvnuo66pyiengf9b48autuoqs598zrewre2pjm43q7xd6e6sul2tcohwpqffb29b31m2lj26tedjn3zgi3cmeir6mqych8wwn9frrfahdaryrh2qj6hy8e9ru1197weluetna247t1xf728kdjunjxspksjfd3ufw1sw46azwft7ddehnvxo10uscjqr8aphexr7ps2epag1419gb8vzh0fdfb4kiohyo8v5p2epp6vwaahykl3au32t5l0q51bgy55if355upcapkq32ihvk4cgow4y2ysebpjrlbp64m1xfxl0wdzzpbnbrzf6ji085hnwmz8modgn7oc65cw5uoul89vtvz8ulz1zmircd9urkry0mfwzqc6wrv2x9h7kyg',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'nskdtmr8xpr632kla900nkky8atuestwumyywi1rqivp2njtg8',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'w3g2lmsw6mm3av9xsekx',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'evlwoka7x7734k57on28qhzi9cf98stiesvn1w9tih7cv5ovqt0xhrz4p0yv8ypapi7n2xo6x0a13e41018f9zse63epu7twxahyficiwqt7uc1teegrryltqtbik1vnotnvxxib44kvz1ic82kg7yf4yutglvbx',
                channelComponent: 'j9vlh081skhedvgk1qyi8uiqretze8708zvi6snd6x3dibabaga0eatacgj25g65d7xb1gm5sh5my7mw3ljbk6scjnz8vtog6ar0nzznqz1855k808a2vngspbpc0akfycv5eas31f8z28ykqirwupmftnhmg31a',
                channelName: 'hkd6ea9abcm9epz1m59d8bydojp1p9040ftncu87olxx0zr7nh495ct8ltntgp89sx7naross7zcbh3rdin8fk86q2ss1btq8ftxnppx8923juhsec5g0wsleqttf2boxfyloryan95y28gc1csmix3hgbsds99b',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'uv8127wxwhlqx9eha94zuasb5k8lup468736v9k1shr7d7ftuu0ohzut0uols9q7zex8908afd8wjshqi3dsfrayxhrmujlzlbzoc1dskg0mggsgdasxl29bv4tvt6gswn76spayam3zzz5yoxgu9bmcc7fd21zr',
                flowComponent: '3uixf3b0o0d76h4b7rkmkdbtihkuofmvro2532o81e1b56yuawa5kg2eommfjwt649qq0dzqvflpsuiva3ysiwougo73907edrovzrl12xvv60njuswi47aiehq5f4nxpnv5crko1ncyt31g6zd51zhwsnfshu8v',
                flowInterfaceName: '6786ik2cxy39xljg68t9wpb0ivfii0tw6plmguzbf94ov04es0k76ebuvvtvubzzt1q1mvtfijfydhp6izdz3osbdtgltgf4933bdeoszsg1vevfpxjkjui83lz2sta2kmcjmouo30wg4ys2jd3l6jky64ipjjbl',
                flowInterfaceNamespace: 'xtvbmhwn1j0fj3dtgokplpdykprk3evmndmspwwvjfqfxrt5v1g6k6a439yzm3c4q6p9y3ksc3ajegh0o8d1ypklvumvyjsq92au1dyiboz1e6gtms6fmz6eswuzio3rec3abr2y0ugekpzdizf30hc3b7cdl4p9',
                version: 'qjge572ci9k3nxshdth4',
                parameterGroup: '18rvsxx46c2m7fqzwokpxwszglxm8mgz92a0zj5ep8g4grtw6uf0v6mwginfjkbz21vfa4sdga8b3asuuj9khpg09ktr7kv4lqo1rc57882t8d0cshijlh1y398rpk7xx1qkvkcg11nagzrhzybotxclo4ai72orw1ulc624gle799c7sghlszr9s4zr1xkdavbp48ujgt7bzh5nbqryp9jlrj7r21lvhrqrxap0mxl4041a9mbc18s5u7z6k6e',
                name: 'eqphdg1owzj3fmj7bg3tcuvktj1x5abyoexzkq1g59t3zph2m0qvfdpag3nidtwg35hxnkilxbuqey6vls1ycjk82pnmva1208i5s930k3b3ywmjegjqx5ufkeg5bctn2ebelaoyas2k83v0rmmhqibor2szt2alsrdqjeapjkqpnavd2zws0memfrfadjf0mp91bk4828inhl49m9jywkgl5bc8l6lbthuwha2vsodv3rzvi0783cftrteovb9foqcosh836cshd07tf9jp5lj8no7lsyrvpb5m2dknswznjdi2g84b9xwg1t5iw7do1',
                parameterName: 'hw4g3d2yxqi5dpyme88tenq5wf0jetl5ozndf3y0565vk1ufk8og7jsvnitft012upndvyalxt9k00aatml6wxgx2xx8zyvmf2z02wp5ky8cz1wz894upfnt054fub71ssdduahvzxhxi5bviwcfyxkdwviy50dbl43rqy9cfx9l162h9kjmm8k1pm3xopr3vxcgescy1ucrqnj5ak9olmqu0fo3rid17n7kwn4j1iixumuxkeyv676c7p64acf00p98prg7659wm63wkarrs8g9r4nlnrc8673fq0xuvl47mojshuqagku7a6czimwt',
                parameterValue: 'o5kcf7nbmq56db63xxikvd7tmw8gjjkx5k4pgjfmvk65yhkwmmy98i46ivo6yxweqyea3u7588fyzywq4d9r1wjs4c94myvdqwhsa4awo2s79on2w7y5ggdksmagn48bpu2lhke7m0czwbup1pyvwkk5y3ydzlkpwp2e1o13t6db4f4y4lxexwbpmh3iqizkd2g32q7kahn3bngwtky0uf1225ns8oc8fz1rpfbi09j31iiv80xauxp1758f7ti26g4xn3o410pttddz8kk71lwtziyf2zqsp9k07jmt03oliy3kltlcjb66mn3wfpkvw7k1hqgwib3td0j3wovufr63ou3wdzlypk9g1fpm3a0a9wspz1kmgh8m0r7muhy34uxc62obz9qdcotib8o2j5tfed2q9wbyghoc1fpeq8lnbgwz1zanqfy9s63a8nph52fmut0w6frdymdzzwpcr9yb59vry11rw2sze4rbpn6ar54b3c5vle9kwtbx38uo3ziejuju3xwvx3sqx8octp8z3fjgw39fahcbz4sj3wrakde0x5g8wpby2slbub6xyxb0d2r9xzo1g8877pyjqm875o6e6thn9m8rgt3dzkkia4auo31ux9hb9lcwkmwo6heeufqqre8gba91n1ip9uumdqbhiod9tk5liaxb1giv3khyef6nw1myw59i3uo0tpqp4x385gqdvqwcrz0ip7tz4cdexfz9jity0rtm5hy3mxq24wiufueqofe0u9k5kon9u5cy0fk5vi988jsc8jzq9n064tgyifz65128f92x1liud4n1vb8n18c9qkmv1mnazc2k8aboju46qwcb033n4ufnx7ft0lmktv0mb10jyehzys1w0wzkvcy8xk0rvgur5060dx7iy54dxryxezh6cmmolwh0qps61myknvdowfuzvhpetvl4rdafhrmcyta7dt8totr4y7of79l9i7sf23gu37kbwt4pos9wpwsruarer9pqgqumancb0bvi',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'hw8a38atsxn0qhngsge86e9az1nrruwp4uru0e4pzlhlaz0b83',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: '8bn1qpezd5gr3q95ly37',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'xeki981h31fet2kvsbu3p7tw400ovrkqj8268h8lpbumdzhctqnojcyotjuj4biutnp5j4x5wbavxs2g2e4umc0tboe0prbiu010cz6scpymchu4k8devl6ekb13jg5e4zg8x3i4wclujo7alb97o1y4bzj4scj7',
                channelComponent: '391w99fjswu6r99689e0kwoypneeidfmuv209nmf1j18mq12su6va4r0m3rgsouu4n5zyunrr4pq0smup9hd09knd8ko6wtq46dyftjpomxoj4apec25f42g70xd1ij28hhydz88t01q37jry2h1jksf1lb9nedf',
                channelName: '7sx79owzs710iwd9ysxcd7zzd535zgaitwei44alvuqf5iaklli3qoxkkht7pfsod1gxcnupz6g16bygmvfmjxeoc518uqevsxmbzne4fqh3iulpcsg6swodepkcls9lwakchjcyxbtyprfylt4hi6q9wgm8vwkm',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'istwswt82701f5sv0vnl258esx4erq1bu3ugm9q2ciinduummqt58q0ti8mbd5vy47gf9h2bpmrj35ktxxjpmpdoc4wuk9migz7ka18wm5br0q7iwjy0bsf6muz2l6spc2v69sjxq898ztm23lefio2h0hrh69ut',
                flowComponent: 'm63vitqkv0srqnxp8guza7z3rt2qhjqsal8sfdlbbgmmnrezyeejgdqaz9h86vq0q4kzstnxv4ras4bxo1mqslybfv7m73j6snwwlssabv5qfvw71jp0e7rar56uy51pu823wabvny64trj1e9ngv6ixmgpo1v13',
                flowInterfaceName: 'vcmgl87bh2pztbg57n2qctx0z3vaj3vg5namqjwf4oxvpcte4um1nz9p3ye35e748r2ixhvcp0ha1b8yq7ogdgxnbvx17hyq3y9fmg2tafht3pts58kt1gafo3d1p1mks4p0c3lbkx40cnmjvz3wruwbkiezeak6',
                flowInterfaceNamespace: 'ynpvbr2ubztv61uir367psid8edswwtpyqsp4scpl5g7o9yb8u4nms1n9j1vb4skqjw8nnsj9yyxuhsfp4xvuzui4opgvj2oxprhkousjp6yr7sp5biw5ch4zzg24oh8qkjay29pxe31upl4uytz3o48ic5y4qt1',
                version: '4d680d6pe4a4zfm6myo0',
                parameterGroup: 'xfl1fposn9ru3wgvsg7vrw7n8posm00d84ax1v5fwur05w4fzwcxvw49yi5cvs78807133nztgcxw5q2y4wzuyz6w9ycq8n4fne6us4e1rs7chrhc5dlzox02bsze9hu9gr1qzxp6cfninf8hmp31uoumq102yvri5rj1nds748hvvly12zf89n417qzfn0hb4kmt2v81pzy0zpwnmj79fqjhozws90oep5zs6m3w186tqc3iig6ll94rlhcsx8',
                name: 's22m59mn4rm2csztnyb2zv7uyclsdf748ib35eq8rpbt4ouz89zo8etc0a0ql5a36zvyr19gnbop2nj82vwyw2y979gnce84x7fisz3c79haz19p8qy7faox1y4qx7xgy5szdpcqzld1y8nozzdaf7hgazjrwvtlr0uf5s4ijlzojpivjbr8ohhp0echoq9bgxgspmwfzgxnlnzst7jz4v1qwke83ekdm196r0rxf8zimf6twroasg6nbl48ztm87w1ctjio8gebuiudzsg6awnqk1t49s0ga8dudz03c1dg682piq4i14ra5z40tdp6',
                parameterName: 'yd1hlagvsr5di78d1faeu7mkhsp4yta7eb7omuavpkyryzsrut8lhy1povh70pxj0lmhqqikyuvotrfjv1a8qyd9wpzrvcxjbfkhq0zid1yz95oivnpz1ba4sromf7jiukjezpmc7e2nacamjp5ufo0ledrdqabftmoi1mn6g33ki6sh9rpu8qjapftm8qn363gtbphqttfi1s3a0dzza2pyomkl6b1pdubj21ue5aliyw6qcnpvuxuhki864blspvap1vbb9e4y4a1q107tgt9avyzy83va4c8f3lmshfohw7rhxqok1kjwt7krej79y',
                parameterValue: 'rdj7mgd0qgc42pqundzn83l9hngqvi4q8mp8dp3hcpk83f09yr9toyuao725fa0heaj2vzcbsnzgsa820ig413qe4p8eosh7cv3a09h6np2sblfu7p6j8d1o7xopy9k3acisvr6g7ao56wf78xg38knd6yoc9g1dqw998timu4bh7mx1fzqj32px7yc1z366rgrxh8mz31kdugrngccffilqx74j0dzjorgt6ozz5zzalo4vf491m3wob0jttvehswqx8vmudiuasbtxp44o0n6rmnzvijuvbru2lcic1f90epci7j66rvm5ye38h158gud2djvzemmcwxm9cey1mz68xuuzt7ce4disxrqmx480pp9nk5c8lsau7jqbz3hrkp0kee4f5prg88kt8b199q14w4thslql5xtr8y1xhp0h8qgwhmvl3jlbtg76tpwdnnm2d241biq7sybbmhbag0u0rybf03knbocmahfkqkg6am4kx32omrak0ughy3v47g2b5w1xwxakn30mv89j3b4txlz71iwtdoiw7u6xkk9ou9vesxwww0pkb093li78q8ami43k6bv48jinlk6jf911n0jvq9cu4gh52yvi7k7vu4tbw0oly8b5ofi8u3y8xwhz7v2d3hxidc0ifceev98tyul5cs8qhfoaol7xfdt4qpmu8dtyqckfnad4a7blyx5zyba77sjc8ay5tsg1mpng7p92o3ui49twdz1jbh0v50io1zi46f051hgm36wnr4avuic03c0h5ll8ijzmu6xis91ajoz5c45rcxyk28o7hrgwhjb4oia7j0ntidn6yb5k07tnemuf4owp9j31eugyokl8fokjvu0xstrldet0qnw4mw91gby11izsw17xk18na3fqgxdu1d7ih19dq147qjd19tlzti49981sytx4fvliujf83i9wbrrgkxhw8wbn55yb7zdf5blpzj6qx7bk2lw4wreqfl6ewmv5cfy3c7c8w30dydcj4d6xcvbz',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'fy15knnsnaxwa5lzihnf2rnyiysxl5rnxsus0oql22gkcfr9rx',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'wj6rehnlzemwgmz8klii',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: 'lqo9kb1tbl0uf5vhdju1m2ufvx3yh7o1r8a3f6irstt1astaj104h9vcrihg02s5efwf59ehmzwwlr615gzuvf7pauavn5yrio93tkaqbw3bzsnfk7kug3hhlbpa1enx2x6xfev89mz9167p74qe4i5iwklnkjhy',
                channelComponent: 'ucdphtag7wyq74lxxygxzqde0jucafnc9df5apft4zsp5rfb16q66a070x8yzxis46e6bdkruygx8jkqv14crswjb7qn047rt52qxxj0bx6mm1gcpp94o4dl2y06hxqtw2teok4rt215vqefuuhrwgs8ddntay6r',
                channelName: 'rzwxdeu5amz8aov8418y301wq6wkz7twp1rk3q1xlpk72uz02gmi0axu24yhlpvu3vxk2y5xph38tba81wk3rzknm5qfig2scheqb51rjs526rurosnflqplngzwfw8y0qp437ret9khpxtlhosswu6e6818ukri',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'rxef3teqvi71nf9wegmt2u1aav15bc5kdkjv4owuyzjmhmahvpmw8j6untg8tg8qrmpbgdutxjr4t1xwvqo28ut9eirfspoybwblizgxgp0z30yzqha455mhebc5kcomcinq8n4om4qkugwll1lsztpt5ad7s70w',
                flowComponent: '619qqg0u1u2zxhq27w3gl70b7ok2symmtqkp64qwiwer9d9i1eiho6r4fdgh3rno2zqwsbz6d5gxvpl7unu0bhof0mdomoyw5hl3ibyld0bk5s8wy36gysefsbw0m6bza9ttl5ufj4vafarbzg8jup6dr67plz52',
                flowInterfaceName: 'rmbdw0ytefdn041cdxhdmxnob24yb9f1mompuli34lles9dfybotui0rpxnj1vrrims1v32ktc30k6ffzn72v0ebirr705hqwzq6pkak5kk7w8llbdrr8y8xu030kln4xyiy04h3k08zavbhqir22ycmdfvzqnyq',
                flowInterfaceNamespace: 'wuw1pa5d6lq5g0x7kvolidbt7npaxqq01ias5ouqjuuvubhdbcezex6146phwt0su3637ctt8zv7ctmacce01v5qnepryl6djox8sy0tr4nipjnvrl0jy5uxk8c1fyufgutot2yw9s91thyjxqvikqfs19yafe92',
                version: '4b33922jwzqowl9grs13',
                parameterGroup: 'sdqwxtt6rn5jzxuh2drmnzi74pzqvm64vgll0101aljnnz2btawk634d3g8xd2ozxtbuun5lldwh762eer63fxz4662226iy60fxzh2nampz3pyy7od2r07lh20gcsimpqytbbp004efyiw8poo7tf4gfmedp2onwa7b0pr7uxu9iaesc6xvoa8uq2cfmhox12s7ebvxwm5rjq3w69rz9f4sa0p8i7jon0qbpwkv9b0i1153nfq0w6n4evlkhak',
                name: 'v3i4994cp1y9yxmlda7xps04k87htuo7iuehqugxw06ylq04u0yyvstt375a6k395iko0evrjaf5k36m9chvwjys6smmyoy3c9b0qcm4dqmgq8q9y9m75valxbpz4ynf8cfq4crvvzk3divlucgcq7kuphvh3narqq7ezg76870ggw4xxixofx01l076d7ygubxkhf24a0b3uwdx5ut1armie4htz4nokdegpd41yi3yl8149hfbqdrc6bjq6q4re4hqtd4soq4lhd01gzzhih24wgiaavvq51dpnhaj6zd4dgv26clt348kklmo48pd',
                parameterName: 'k7nrhni0jofs585a9gdaufm4z9feypldubf0ap4vuyhheu5ew0nyci08ull5ndbbokf094pgjgf1npgeav2g6abw19y7up5cygp86kwl2739wvnznutp33dpmdmi1gjwovgrs4rv0u582ftbjl62q8uspu0zasjw8yc5mwui2o8qolw44pbu3gq2wuoawhro5idlb230gce42w98t30ppwwibbg3yy7vcai2baajn0u9gh46bpnkm5vtpb7asq9atyxwx99usmgy3cvrkp3agi68luouc8t6opmlo1qqz1bo6ni0upm1qs7lh8dkvyuw',
                parameterValue: '5hqsrqivkcnlo4d6gpix6kgksiqhk4lubjfahzkfjgknsashpy20fwxo2f101sepu03ltsb5ggcjchyoltdd9ctfv6yvog0t668qxhhukn9k6ukte7q9pk3kzfujkf6g8ks5t5lsowbqzeatoadi2ae1mxf7hh58aprr9oqqv3hs93su3km4pj6w7j8mrxeezbc4bcmrfqyux7undy4jo0fdpjx8bbpjvqk88m1ztokpsbui2uf8824zosg9nssa5rvomzcmro0zs9k0tvg2ancyeexeit72xyud0kgqtj1rm9o64bw7bidkwutgg46jblu0o2sh3w8ln5jgrmx8dc8342aveqadqo434srabk9re6tsmnvktsgngfe5z7uszwu6f8vj7j73j608n1fozaery2c0mta8olm659fdy1bvoxba8nhf1k6gyil7lxxf8orjrilbl9s0xiim70csomdkcqnrkk4c3bj6ov6qsctxmk45tab4rpndn5ussjdwxljpsfdwpuxlyv6ydy9ehb6c196mjc77qvvdpf1xrd3qjhw7bgutdsh5p0ehz1hcv9rg6w4sqe8d1mheyj7dtbizw2dafogvhwnfixcbj3cf2y2ugd6xeiihelvk1l5a6ervqei49tc59tz2u8dlidw1pe425cipsn5gr6sagfngegv281uvclkt4oa1vjhlf8c3jr7li8r350i5op0qz8gky8tjks8rd4tb19xbfzvs2643uulsflrc1pya3bgqmy16iycef7cobujmzjqsifjv66v1tm22ket1h9rmv7ljnin4pukkw2go8tcub74c51qd1myzqlw5wc06uebs8k0gbh1do6uwg71xl5mtj96wu06sog9ekri95rg82ytj0esbuq3lk10pwhqjgujyn7ime8bokg2f6nsyhp73fgblm0alub9evzg7237205looc4b3zg7yog42k9vj7fbz7xm4ws4tvnvtjpbqlmp1am3iscdikacsuvuqhegjqp4h',
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
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'ee2qjpq0n0hzu5atpmlg05ue7ussjntdtywupc1mzt3kct7do8',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'ud11wi4erjqub4zxj8ue',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: '7tjlo9iekqibhwmmeesx0zcyqy7iygj9435cl0cg7jk63gxa45rasl5ynj6sngxbrp6b99hcmbjm5z1i6j20pyhc27x9yybabikntivx12sa0osa2kc73vo3oskuqe965ijfupskj0br2jhi0xv6p0cfnm18v02j',
                channelComponent: '80r6ubkbssmx0ejraexe91jhkos7ta5gvi8uo2kr28y1gear2wo3u6stbh9snkc0pw4bp1fbzaap17gj5szyf37buru8l4ibm7gl6ug1oj31cysmc37gy0ny8adavbnka93q5l79rr4pidbrvoirj9csg3eafehf',
                channelName: 'zpkrs69vwvzl4fag2uz3egvkslqkxehmv5q87grg7qt8l5n58s723z5xmz8rhz56o2elgs1sk7ek3ns62kp1t5yrm9gw0g9k8ctr5ysksdtzw4li56oqlq8enyhpbcrsi1dccdgxk0y6lgsyhqw5mdctzps5b65t',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'zzhf23er6c0muf6lr8rpnzvqh8bghi04svij61qaliqgd7cbkq432ug2bynkqlkbq3fgwn3ts771e2umxwgeijub31e2u8q7umpsinf0wv5umkv8fc3030ja5hfzn00ofgn31aun19ryw5z8hf48nxxvi04u1t9m',
                flowComponent: 'mhf0psy8f0qfjp0a2gxef1u3i406r91g3br93vn4534t0as19uzkws1ry5pgk7y6e17w6m2uhyr56yqvtowv2id31w27s1i65v6yz5vrxsks5gtk0v9yeuhsfgc8arze2apu4sp0lhdx5ifsl01aksuf4bt4uh1c',
                flowInterfaceName: 'h8xijyeepydfgpy1b4t1itj3l7ixkba16p7xhibmpjavv50pgxae0o3yzd3lf0qei7emsdkzmp30yerys1lncp9firm3ef61t52weljtzcvif7cagghlo9d3vq5azb3hlysgk5kthieavzgwfdt8dtobzqhzyj08',
                flowInterfaceNamespace: '5yrkugrdc0o584nceodx55nc5fyfh02ys6x26dqc0o7664jns9mhy3wpp2vvnyoj29ibzmwshji3jnnmbptw9g5tskikuz7pjq1ohcebqa9b9q49tsorgki3162nhf851xvx28tw9gsmoksnc7r5z6ntnu5k50gz',
                version: '9mliqxdhvouhabehsiup',
                parameterGroup: 's8tuo72l6ajtzo4rcbsrdru5pqe3kkq89g1fo59zaex3wkll94mpkaq3236eceg6kafjjphn91wcy3fqh7bk9fm6zvm2h5ppos7bqpogfto3fjf4i6zr08yvz67r4nfprqfiqry8cl3mb98hnulrwyiidllovlkzscqzzmawsqhbnkzhek8gr4hkxvk2rheb16dc69ze4hkxsszj9lccb6bfas87nareaj04km0tgopb7edkhdezj9hi77d1e7n',
                name: '8dsjjnb79v2je53hyrbciack6nqlrldwk40jj498y51u6mmv8vw9dxk5270pc2kpeoegreajb18chgu3j9qvev82t284upfks4vmznilgj8w9q8fve1f698uvd5h3cnc8qipwavmncz7eijusqba6ajioibpf4i8qd7t8yt4eugr5lx2u9e481kwdsru5hp3grqgv69wuf8ytzqva8jf2d7aspzm7psknwk0hmzaz940c4kjqp45gja7ignlw5fs6fvgt1ry9atb2z3m4nb8gmknkblycrulzm4nvi94zlfnkieoos4zubos6tjvpvze',
                parameterName: 'yntgsegjtlwwv4uh0sv18nnk4l2khqqp7q47abviuu0jnw2p0d4y11jym04ktu3wk7u7srbqqt52jbsuo1qwi5om0cndlm9tyi72isgxfgkudu8ld7ozk1ibcosykc98q63ie9ntg01arjjiq1sxwrl3fuvtiejtlembkd25k5sw7tvena7h2r9rnma7lmy16semzjnsbocmr79nilxrmw60fjdss67vegya18rpn5wnbob2dda29y9t17mm1pyg39rf66n5hfpm7ti8akrbwp0qwva1hiftp0bgehdrmr0qcb0rdvyns5724f51wsyz',
                parameterValue: 'k2e8enkh8boyz9jqa84do5uf3f1oaz3ra3iw0ifxgqjf46xohn1mt3yl03yyi15m5b49xe3r4cwig2zgo8pjyzo5znabn1r7ykzw6jv9lmqjwprnd2b4i4k2afakz4m6bulntmtr47iawttf0qkf7umhti5l3uv5cv1q0ory1jdggas27ntgr6qmpzpdknccr0oa6yzr6xd1hc9mhjx757kylzqygh1sjfo94trs3pgloa1ypqc2uizu51pylh40db62qolz566lw16d3ssrtmxgsvxgc8t3mecfuj7f2w0o3bumk2243ci5j1mjmgjbgbri7ng80fl0yn0jtx7xht1dsvrnjsyy76gssldi9onvtd07rf368dr11rgz5dyelx9cjbc5nhbbwf6rf36uf6wmqmxwxiod7nzzqqcz8asv47xnin3krz9kjzoiiuk5h1u5sa4s6f2skbtf46dme0c03kb0twcfbjuul7a113r4jwmc41ooiktgsjdi281r0ludesgvbayckfpec2x755mdj6pjwl372qsczvj44vt1chb2vz3cv2pn9vqsn0faz39ywg070rwnvlf8ya9h9q2hkiuswy50vp48wcb5njh3gulmcbj9crzls8wjag4cjhq1hmqbmsz0gnd09x08582chbgbal1omg5f08o9cql9a50wi7waxrokykf0m0wmanv8j43kc00agmot4v619f6ibsao2ol0oebhb5j36eb6usg498r7s00y9zmyw8hwu416km54fd7vuemmp6rj0dkpc46naqwjdyvvuj1dgcbw6u5gex6238k1ysinvcheh666l2l2vflkiurgb4vitijq0iqjii5m0cg4xbav7mwe3lmdywsg06rjonkgfa54t36xuamgokt1j9ch93axomn0hmsdjgidg48hmvjhr7n5sq2wbw7m37i4oqcgyprbfuoogrbzucu58bp1jq6l30jj4ucmb4alpednrmo4gjxq7prbaligs4rj75ypza6j',
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
                        value   : '590e0567-c73d-4327-9273-c0af70c8127d'
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
                        value   : 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/ac077d43-7183-431a-90a6-125387545214')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/f42ffe35-f841-4d1b-ba05-f3a08b77a47c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c'));
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
                
                id: '807ee193-dfc4-4d00-b73e-814aa3f122b1',
                tenantId: '32b428dd-1db9-486b-abc7-ecdb0e2d9c54',
                tenantCode: 'arxl6vjenke9tn0nh9loxepsdurdd7o2u1v0vko24jxroie1fq',
                systemId: '8957fba1-091c-4868-a0d7-f2d6f7c7714c',
                systemName: 'ag818168j7akkxklnw12',
                channelId: '034fb9aa-566a-4d67-872d-28c98d645176',
                channelParty: 'i1cu6rsepg6yn3kiev017v81xrfss870kfu8d9983rlrlqv4c2lwh07v86vv6782d1saoznxqn72v9mka1x91hryfnnq5e15pu6ah4vr46qzrimvnsqtdy2exm735ttp0jjpn1xxgmszysqxzlfe1343rduxz7rh',
                channelComponent: '4olbh98vbsvupmm6hn6q6w6too4jxyfyy86klnqwyphvozicu2spuinf62ds6s59erz1n0s01kfd0yfxknjvjr1w4ggizfmihjilrgd1a5h52oyrpendz36brc0wevbgrugo635ak9817jurytxeetujpi393i5k',
                channelName: '5j4rnu5qw05veli91srqfgnt7z3n45cp39faahb31zpwsecm61tyl0ui6ijgmtoh7s2je8hd3w084d9ripycqzhvqga3e6yw3zjfv2w8jffdmzw6354hwx5cj8csbdoux2cb9v6gypeajxdx7uxj7nsce4mhcs0g',
                flowId: '275ed602-e26d-44cc-8681-27d4a2e3b0cf',
                flowParty: '7vyola73ait2utz0n80qj0mxe7vclqus8g6intxvykbtgl208l4mqn3fln1z9y7quceljs7ixzcj8z65ykvuun3hef9gy867dqb8yr6oilnm5ybh5da2qm5rr336fs3epln1imd7evedt37swdo8996mwhs8sss8',
                flowComponent: '8gwko8uj8xtij6xjer9y6qxrstdx08km6mvl3fjyvtsqi4mrtw6s73rk1njkip7jzvxeskemsbqylc9k3oofsnlpxvzkz4vt7fu60ol5gbura24h4wd99sz1pw3sd6dwjhxb8tdkcpxj24q8533yqhqw4y49f5j1',
                flowInterfaceName: '4g269dih0pnz9hyijui6j7yrg63u2ghe8khi6ewuf20h4gx5g4n4azk3nrde15tot7fkqtgc2yjlrgyp3c027y4258j7yjqqduk5v423s1sfbcbjhcvaten2z0doy746rcsmfzgd7ty10wiugi6c7l9ulerngyyp',
                flowInterfaceNamespace: '1sfh2cjnw0sfuts9797ddyi85ni70iy0t8gde47m1mv5dgckh5s91sx4qrlwae0b376mzsoixg2fk3od0g42tnrebx6z9v9fd595kh4oaeb0jqvxa84ux3hmxxl07fo4tgpwxg1xn1n8bdparyyo3g9s4t2ukhjb',
                version: 'znv7fkthzhxla1ppcahd',
                parameterGroup: 'bl0uunw6oihfypp9ay19pjv3pp1guqd5vq5bb95tsvaeiu9idl7bzh38aqtzuazordz0gt8fef1blh8o4ll2ujnsd0i9k48n97m78cv40yq67c0zsrk3h5jh21pyqkktjzhzkuo6mlyf96gs48fbee9xq769fvx5y3ohgl3ldwc6r8nl9vg7a6n4ktvvs26s0z4rxhfwt6opechl9s8xxz4ieyv8bsy01rdih1vl4j6dqe32j03pipxqwnzrdja',
                name: 'g09m34wiksyxjly87vtx15k1ybvnl9cf9o7f0ggrrlga1he1td5xl8vmc9nmgdt1pbf99jmfnrtq6jlc4cu6v1ganjxo8cu32dh17chiqdzvelci4j5pkjt3yhhlvsaq2gg6mcp9ssg0nv38qcxnzh5d2ka92f0yvtntibdw3d2ytcml6kk46y5ry73a7unacl1tgzyngnrv6s588mduqm7vn3gddw7ru0ibaxtrcsmcecmeimzygwwuwcxlwp3d7tqlenj0dgjgzpcqxt0v52l1gamc23193n91htdj1jzu4xrn1ezyxs5cuvc9s6fa',
                parameterName: 'ovndvb0smnkl8bjpcnbyqwboifk1n5p2a3hx1lu7riaad45khkbgejw8yda2pgemfplsuroqp6yj2t7fvyhvzo48yyk9kj91flr3xnq4nalez2zt0bngb9nlywprhubykv4mzqo3amsulwj4azmmkpwx10puojs41prmky7zssmog38nq6us8mbxieiebhn28ohdii426hvlrzaqc9j5ua10q2gcq2nfgfumzl1rpt4dvkckp0ni56l1rezr3s7hgdwb17zv1jmrb2g1k4ga59ukfhdkis4rh8mao9mfm27lzcdsunyuaof75j8pt141',
                parameterValue: '40bxrc4zwjse5s58gz2uddy42quck1zd4i3t6z7bk0xchgd3v8ce0hw4zbdj6lkwjef2c7cowkr1hmekahjkx68m5of5ih4khihihgsl7b4247y3k6zihg6e4mlgvvywqbuhltob8b9r5yhek0hyciw6buqx4dy0pyy5awi7it1s3wou9ontam8jhib32us1gb9uf6lneqexoryhj7tiq9abjnl54u8hndoi6wtw0yisj5y0xiz6jyduzmtxu5t9wnwtwi0jycfd9tudpiba616kpknloyb6c9e0rnvzwl8xx0k32ol0p8y5lizo2ak6q6fgjk9xbdbpwoy1capv78uvmnrp7tgimzas9zag7nw7o1ooxh08u2ycgpnan2473729mbrhmz6klqv7aqn61k191ga1r5zw63cqsz6uqhehxclim04jd6ushx9q63q9y837hrand8ryq1uyuuth3347xm43aiyy7800prpbbvm77mrdssdynflhepyehx0183qcat391h243gxaf0r5388bqr8cwyb13igg9c7jfsf7gagl9a28s7nqeycx68qh68lu37bw65637bfev9tj7ajd96guczg1vrqd4duhazfuzy8366az6lyp3ovveo7om1jv12t8eo3luu3u2x7im9fz2bg00z4ah1bnt8ywewrqb6t2z483cjiw5zf84w54rrdmhttzy240mic8clq57f8tkoxrf44cd2fi44zv228x0z9abrjfeqfzmh2pxv7yi3fvc12pan1bt34qceh4hnx586tsb8ay6375gafgwobkrvqc9oog73lz9n32cl3qrwx8t0y6dj7vut0no15xvlef5p4dqahgh9d2bj52irhde1prc9lbge42lofdozteosolrlsf7bejizu5rqcv0ozw0vhx4aheufj6bein1hfoghj6h6po2ucohv56eevgwu9yej3deiveadycejc2sef3m1araboq1m7j9g6hggstmw2u8giv8kmznl5am3qw',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                tenantCode: 'fvqn224e5bjmoue9vqv2s9gusxddc024o8hqm89u3xva1t4n6c',
                systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                systemName: 'tfr9bqyw25jheb89ua6d',
                channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                channelParty: '7jhkmxpw9k0enjc0pdttylxfqzoguw4mekal0dfkoxbfpuzgwspjpxzr7qd52hn19mwezb62w6b0mpihr2koelpgji9utuhb7ilo6wj4sniri34kttkledvd8sgei55b2m3v7yi3xhhlscaxff48hflovp3na8s7',
                channelComponent: 'yx64dgps5dlluxistd5hrfefvgny4ry44u6etmm9fj036sar93iijol5tvwm55jvfijblhe1pigxiieyhrqcbqdfsskock4pajtbn43y4sa8ixlo98fh1h3t4jdit3d19c1lpqd2yieslnbo4866pvrekoodf7hf',
                channelName: '281dkdisujc85yz8qsacrow5utu7ijflori9skluxs6pw9l2bpq13v1bag7vwcrf0fluod4v5yrwv16ezedg62u52y9kuzg23b7qoy8rh6vyjp083wbccfzmlidm9prh5tykkfj51jp0dn1jqfb8m4qi5fp99omt',
                flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                flowParty: 'k0kkuk8augveg9gbll2ba3mbji5j7ucfgwwboqrzbhy03f88nwo1fkdv5wk9f16hod5x8dv8s2igexad9dm21yrnwin7aoddtzesm5g6mgt7f1yt7p0rbg0x3x0nokvggv2bvamezrhwd2ocgs7870xj5n3kb62i',
                flowComponent: 'n4m3o5a18qh7wdxc00pco1my0x362hvea225v0kfuzk6b2vvbatv3pnur039cnhhril4owj9f095jki3xyip9ttcd4vbmkxih3srwwjcpceui8vgyik8oscpqyqimo5hsjhio7d9ut23l3eld7nyjrivlsf6gyam',
                flowInterfaceName: '2ql8t82uxixfwfmfszjijqws07frdtre6hnb6pd7vlq8kys84vxb9h5w0r4pvaghhaxr2ph871sgg5mikmvdbdzfzgx1h7vnfl510v4dko212dveww8wkqe0pqydm087elf54qm1eybg7hqftnv4truk4gh4ckpl',
                flowInterfaceNamespace: 'gzvplp41ue9bjr0334nen6tydw2u5ak4cv9be44iqeaqh03ly49zb8zpb4vlcyi5927j59dtalxitspsfj5d5w7kkpk2rhcn89ctmko4tbc48rcgmfghofge926jqtcb6py0xrtdumdn94d2gecgqqzntsoxyish',
                version: 'f4zjbx616hjk5uuqixfd',
                parameterGroup: 'h0xv0sl99qay08bbu3uvhc71ph8947nl1ovs5c1o0vbtwqjebu8l80ytbu45zy90e5d9iod5afs3g0tvg8piwmxnijocahc1f48otku4wj1akdxpm4qfageizt6y79cbn9i86255vwve33bhsgfh2xdoztm6wgafoufnxnuxhgspimnacdygr7rwci3zg97xm32gqjxd95j4m0uevq3shpyzpvtglun850a3usytc6d74jdu0lu7a21uol1q6lf',
                name: 'ugqflwa99d4ayvsiuqxm02upkrazotl3caobt4g0y1j1aub6n5sfi3lua2jxpn3bvxob0p6lkw8sbln0f6fsuf4sd6gcl2d9atfzqwuq192cduhkke6g0ehyvhuzofyb8ichzxsa0yo3d0l4sehx9e1ickrsibv6g4l8b3ekn9tmo4x5b94oypb29v795ry9vhrz5hba4ur2hmv0ks07j87vsid24kyyxnj0m9a9sc8ulj3bac360rc0cv4wwj05m09zecpzxrf7375y92vfsqpsg8b28jrf1p8mkjyfpqm183f2edy5lfnk1qi0dr36',
                parameterName: 'rlmjzlypfj5rourgsatjkxjpm4hfnvg5bou6000e2p2007v079ukh4l4eiwgtqoyclvh28372024jhajagcut0s1440plin3zd4f7cevdiz3ajj1c9renza0k1d2ckb6ikeamhrzcyd4t07y26n4qdmd25b70k3dzaoavz7txc9zprlrjimb942xeaimz3eyb62g6rs9jvwflchcly22nzi7d4rkrycepdekmaffdegn3hrl1e8d58bymqgnjhxb64hzemwjz9qm1wyzvz3865rppgeq4cb90zkks15kayar35dtljs4aid191xsqp3i',
                parameterValue: 'l2di8v9b7qsqh4l7oyon8yjl6g7tnvkkxkom0lzssukaiurk8etu5vwl2xqewfykllmgub2kf0zksmv5oj3saq8i8uy7mwckytu2felj22i5l9bq5vjvybnsart7se2oqiczh9uvl4gm340kvv1fq1b8yw9ggzrqugavr1m708rmdzzug0bohbdgo94qjaq0y8avr0qfzxc0yrltx6bg312fzvqogww8wudwov7enz40akl5zn126s7ctt9ol8phsqfneabhfr9lcwbkm38zq14fw7xur3bk5qlnh4ax4i50niom4u4ozhg4ap4nhu0rlsa71ftz4mftwamg4ewy9c1evuhbjf8idenq22w33vixptdnn9t6mk7bi97u1ntt6v0pgq3p37eqgruss0xqx88pc4ysc6yq3389efp9u5ifg148uy67zp4srn4r2z4hkiezq449nw80cmey0kna1hxnrx9lmzulnloe44imp8be05528ojhgymfv6aaerhh1vb98hnddgn92rl51zs7vxk8wr20rxx7x047npuvtn61jclx1wc4o79ldfs7gls6plji7bbnbgvwuq1tbmxoh1f7o1z0vqugcbeyqc59pnizqjiqmxlq4lf79xpmdc07qpkxssbq58ecm3rmls9ydxrrwutwa2wlm0vqhejwriwvcuh1220doq30syxbtmoixzsls7dcfrrhngwf3bj5xczijlk2v6uazrrqs4nsmxpel8sebxg63gja7mvkprvj46sish2pq06ev2aqmyw1pe2vr97ktasjsuz1pizo0rkvgpeamik6gez876jyi4v0pwuyegbnrgg8nhrku2z26sw6whsp43mx7uqd6hshswozlt1dljh3rb7x30ie15ujwtjt9h8319ms9k7rda5xzlvoevelo5bz3kngofeaj553v9pbkp2doplh6iqgtn6t2fzrergk26udgeqhg5clkpzp6yg4mm0yjan82fnu5syt109j43eftr6bu36cwm6y',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/5df5113f-bcd4-4b8a-8a05-75800887400b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/f42ffe35-f841-4d1b-ba05-f3a08b77a47c')
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
                        id: '0a2e6d97-be0d-4d47-8be7-9cbaa4301fe2',
                        tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                        tenantCode: 'l3u44pzo4iwdbrnb2z96n3gfuznddicusbeyjbwuhhywpdvlto',
                        systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                        systemName: 'gsl55mc2gav811runbzr',
                        channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                        channelParty: '5ut05m00i1iz1tqwo4p7cdx0attj07hpcn03wow2doo56dr574aaa370b7nkbhr8s420v0kicn1vvfc0jw6ylvvpy611tl0cgk5vao19277225nzzej2urlty2mlpoliu7rouhhwp5fesjjqqatg9i8orr35p0xi',
                        channelComponent: 'vn5szl3kvolkb2blvq8ktrikw8r36mkxn6pkcj7qwauc2m6nlpnc5d0kmhv046n01p4ftxs8gulfysdedxgnmbyu9q4t75nkk72m0l20mhq0lh383j3mev037sf1hxbnmtyhtjx5k9wop3w2qzwhoagt06zi408c',
                        channelName: 'caexiavzo3vk7vw1nr7l80akdsrqaun3ispxu0lzchmnuch57qawxkv3wg7faru83twducs21kleht7fj47ut2u0ctbajch9obu9h17u8rqhrf4b330rpbzapcgfehnghp8i6hlq0lmw855cn6qyjl9pq88p2du4',
                        flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                        flowParty: 'hc4h9umougeq4rxd47n7tfmvhyagwf3gjrlk9ansox7rp2pls5gcm0f2ddzlspau488kt29uztcche4b35vu4rwtq1xbb2yc5lmh8fhz2wouq347t8weviqyi9jm137961st408q52kgy5c028fzvqoz72ot1asd',
                        flowComponent: 'd5vprs2qleil0mg40hw2s5bqucr7rgtg47g2texlwhe5ikf2z6siphc4rx3lm5pzpgbk75h2np4mr942bep39x3pc61nphrlwa6gsangd844ft9h93c4cx1au1jy06lajcr4167w8cciic2imddtq33qbjejqb2z',
                        flowInterfaceName: 'mc6l19hekh2ftqt9duxv6hqfscj07z0gt87w23bswvr4fvq9g9cub2pdwkds2i53t20unlybzfyuj6iv2fmtnh58moxpi7s68d031zup0mul0drneq5631r31x8q5b3r8di70l6t912ex65jnsbkkijnolwyajkh',
                        flowInterfaceNamespace: '6rcl9jdvjjlkkncygzwnw03q9jv4zosiacqcc24y021w9tx8mxxv99ry0ezf84xqy6nsnsjws71nm07f7f06nhl3z9068d8a1gjxhtl13j05bdo09qks3e45x5gwtnva65o5jt4sgb66mrqvppvlhmoocpfj60kc',
                        version: 'hhufceo3pc4ekp5uwxhd',
                        parameterGroup: '40o2frk47aq48nfx9db7tq4cqxelok4zlaqv7tktrrqlcs76ut6v0ial1kp5umn98bm8ukuwblz5bhrliifa5y22abd0yoa38y5yxx6zm71v7ur8nyemgu125xkpkevwnmqibgk9dkithubvj1oz7dm29oacf2rla1viyu3517zgsd0r0ogcbqat81p7ztqgs1te9magui4yhm8mp2edzaamnwjwe23m6pyjvctoqm7j54pgpoe279ws66dmv1w',
                        name: 'vsbu73gbzp6wucabaf7xuzmoi2770g06rcfks1029j9oau4wyytc0bg1apr41lclr2h1qmoco71pzko8k2w4bstd2z0y21uq5zm3tgxdo52xqckrhljvz592liwe7roxgd51ipsodls07i3z66in5gd0151cjp0wns7ibimdoazvtequ0luglbex6e3zrr59wao7dojawnwgwdcdnppw2i2w7hkcdr50fq44n258fra2dp5v0s31fa6i1opa6wvgqtubayp7bfgkga0nswpwwvr3ej9zqgzpmcs0x2d1alnocsvjlu7cer0tfx8n2y18',
                        parameterName: '7o54msi38wzobhwy0h0y995m2mevv7r2el1suxv6z30sl3hmjz4gf6rl9u2xmf6csjjsz2vb6paf0322tqlkaz3ifi3922ki81s5t5wtd8cszgdg8pfj7w761kdtzdkwxjr4tnd2g4hym9j7qs80bpmtllue941semb4b7l9w3y0c725visrb4mxyehq4trjryjsks2rejy3rwt2nnr5h31bqrfqvj3xnqkwd0rkzdt1upsd5k5vuvhhy881aggbuyt9u3mct87iyz75ururw3ds4rkbspq51970byp4sq0c1uazt3xbp13uweuh4bhj',
                        parameterValue: 'njc5hlt2ino0xuing697uic9ci0p0nb3l9qzr2xf5psqzk1v8y151p8gbttwsdqreurknnqgu1y68riizfp7tqdzgmrj14oq2lzojohofntz9ygx8a5qpmd645gsdv6xetm2qmwz0ssm1dk29h1m2utlajx4xdqyxvta3s9rrjagswcmw434ul5gcs45151u6idh0yjzizdeimo2fqrresazn28cvehdciz7pisj8oknw817vv5ekh1t8y6rt9xqypwj3fbpz9qyoc6qw7664xb8c7gajt0z5sic512tby9zlbin8gsjniwjibkcx6rvx7dmvtn5yrnm1ehig0nj883stmyn9q1izbjtpojmosrgvpbkpchjs4d1dt5d3eax6z2gtnziy9schegxx1zgm1lxyuu0r10bwvwfeix47lw9x690hrlohe3k3rp2t42qqchvzoyv8fpyeupmtv37mg3fqccoeu4skx01py7cpksf6hvpy1e3dgnjaor63zp144pewfbehfhdokhm74zbtuymxxpp0bgcd9it0v1do3vqrzvqdb2zekpavltbt44az99usrrsjvpa87s1vrzg7b7jx901dacjj5q55la3uri5az2gnf85hzw7cyv1pdwjl7q6ayy2wc0b3wxlnr6myha3g7b8pyjspzikl1myd3gyviuabxyzdd861cp448o0m65u2aq8vtu5vzymfyrpn16elmukilm9jknfegis0sy2kkf7aeg8v9qlz0oz5vxxy5221ep2449ce9wvwq6vdh9x5q51cicwvx5sj8wlscxng8evohmbqa9ibdatnudxxt6zp67qrujnqanzm99ldb3y0jlwqeh2x6ycbcsln6kzu7r1w87vh0ft9n1uq8jzcqvpsveq22ar8apkiox9nqr1t21mqpedh2xkzh5zw7msk5vdnb9trdsjov0n3l2ki8074svknyjb29gvufu1olwm1qm8kl6bi77wrmzk0zfltr1xe12af3ax67kj2raq',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '0a2e6d97-be0d-4d47-8be7-9cbaa4301fe2');
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
                            value   : 'c28bec7a-d6d9-4559-8824-27b63ddf38b3'
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
                            value   : 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('f42ffe35-f841-4d1b-ba05-f3a08b77a47c');
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
                    id: '43080373-3ac1-4051-b001-b7a304938d69'
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
                    id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('f42ffe35-f841-4d1b-ba05-f3a08b77a47c');
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
                        
                        id: 'd59d8046-1c02-41aa-bba0-2c83994f1952',
                        tenantId: '5d75d27d-41a7-4cb2-a209-6adf5ad63abb',
                        tenantCode: 'a21u1fvkeexdlnmnsizmkqe87y6nl8whbzx9iz74lp14jfrklx',
                        systemId: '5d9d049e-4782-4019-8fca-5ef736c6d256',
                        systemName: 'x5gxomqn5vqery7kcuop',
                        channelId: 'c7779c7e-433b-4406-bc15-45a607bda44d',
                        channelParty: 'on2m9c4c1pv0mtu5ox01m2mx8rz3eepnr5c0b76b3o53gi9mgyhulx34norjf5icmmhtxvnk97k5kn1iui6aurwj029m3cw9bev7s4cl0pw68rl4xxskz3adcqovrob01jsxtaj6m0qsefokbev3gaxsi2vecped',
                        channelComponent: 'yl79eheeura9fibtuyxxdx6to14rt58hrnay6m970abm6ldp3olphriivmphq6lwvtla44hl3f73eo2jb1ljs3eskji9v4y1510w0qfz0lq1ymt6qrquvpemy7tdd418ixc0x8nw0mrxv2q3kr5iwune71loc9yc',
                        channelName: 'k3k7vyneeiw1dpwcl2kieo7c82r7qdxqzlfwennhrb0oughukebsbrj6qcq65aolmigfc7kbu2atnfbvtugulo312q3bb75qyu38my2o8yxavn1o7pkuvcyibbnar5ff8908k4l022zpm4c4c0dmyp6ipvn4t8c0',
                        flowId: 'f98fcd48-90db-4c37-8f21-8b6f373e6c5d',
                        flowParty: 'mm3ykx9b7xr1fkna5cx2m6jlkwp8z8ci2t6ybwkcerna15gxkkuochkfbyyasj1nnsrjkf1b0v2uxuhnypr0l19tbwz4fn353xyf7rbdaus0kzrc6muok0nla79lm1r19o4p1rkh0tdax9tma297gqy12o26i1sj',
                        flowComponent: 'agqzutdzbxuwvi6at674yptq5y7cxh523dq4oizoi959zeafhrr330aq0bp7uenemht3fb3vy7nkckqqpns6utwyl7n5ixkjc742est0w5c3719ywaz7ce5hx9xrof3jg01bwgnek2vslt7j3w271bkd95odb9ej',
                        flowInterfaceName: 'dovp5mv7f2rp1a0g8s4wferkpt65iv7gorp71n4w35m2hz29gzscj1emhd49hbrhvwyelsz6wf5pdtmsb8h9a8giacdwqo1pkrtvqggtx2fpclvdxgbtzv5obrvh458qftbg7lyd7q5oek7hz83bqjlwau7wprws',
                        flowInterfaceNamespace: '04lmuupk7sadgzvbg31iikbudu4znbiwii1zaxz9q4y36zoy7evuuek4f30696en4z27hgh85o4afabslku0eeou8r2up8aicgrco7rv8zshb1klo3btgn8oe02ieqzhnvb1t64cvkwkuqzi4o8d6kkc3u2nxsae',
                        version: 'vag1jeta67fy00qj4e7w',
                        parameterGroup: '9kd2vcsyit0bd222zzdq8n7r638veq8m4ushmywnxb13njw4un7j216u0rwqbv6cim0ss6fmzdg7cj52jcxp3wtk24exb3a4x3fy5ok30uk2op6ijalgst07sbd0zdkbgpndkkeular6eg7ih54c7ea09skiomfzfgjral1inruwvkd2ybra720kh8mey9hjjqb1ao7qsaiokkhbzcgexwuj019var20btk6tevn62h62eqesffl1lruy2lfjpa',
                        name: 'ycu07y3fm7iyfmyjnp010yeube6mcmmdkuvnf5j6sj8ms6p3jmlinoexrl3iocrsu3dzogbr2ru92leye8jtpf1u5taz25o8vwb5j6x3fmipw4jiq2izrzqbd4b7l9ort53evvq40qcmotu0v0ii7xj6l8e65bbeysys3cn1ynw3otcziwzco4tfcnavk0i0s9i0u615btex40zcfuil3h0juqd5nz6nqhi4y5zo5a6a1n2bs6locdusq8vvua848fvle9kfdu167ttdtfzrevgrvnspiqyd5d8kkdd34v5wextpkhldzx4sz12qi262',
                        parameterName: 't7yum4j7pswxzfaopt5eqdt69qtb1t076fmun398slnbtmfe7g0j64742lbgmjsi4312wb2nyjm03114frucu79kkas719ptydcjdcwy821rgsy9up4ns5efqplknbtz9lcub2fzkjjx5l0els4n2n4kx3yf8kt83y8g8etxlgz31iezaxgtbk8pwhzst787e5wjbjpf4knz6h6re61egh38cknf0trxzdlrw7utdj2xt6lkcadegrab0pqaev3v7gh93xyvdb82j9wpowmpdo6dffyfl9mvx4ecf3wqvqtvpfp83i9ydnd8xxo9xc6q',
                        parameterValue: 'wdecnazzav3rmw4nc7lbnbm3c1nwgs71zaltmpn5egtoaovtaavckyblinw0jjm9t96omk9qiyprhes7urbo1265rfdzcoh7ca2z9ublsfljnk9h9cutq1gcyuc63ltnfqyqlbn4hyiqirroe86sh3wg6c7j5avievw3p6dyahem6h16uih3knkh95r3z3yattg30rknzgqfikhvpnpg1lr4bnnz4dt824ku880317604oc3yd0tqxotgqlc8f6k1ksoeyhf93wl3f40ghhl3hwpavnqhrv6yewl09a4q1dpj3vpautmr60zh0r8x19x38uxc22ko96n8hi3l2e9gl889dch8clji9817miu8r285w71ud7vnvhegzpex3sm4qa8zrbvfyfckvsa5yscqlkjzfu7ysmdtntr037ttz6y2kj4r0ac3iqfsgl80jbxtjczromtp6l1uytg1fz9g2lwq748yrg401ily0p7cjl4vuaes5pp43qv489lorcplr231v6lsij63d32yxtn90qm7mcttt06f8c4gixffzzqje7s2cdkmgiw8wfzu2swt2dxhfoo7rupm227ebxn36bgnhu7c39jj1zynuztkdhf1740b0wlghe8buhonex3p2jog7lo4q6q05xw6c8se34ldzhsvsm3ocg0e7jik47iq5i0gld38m3lqosuu71y87f4m9elvee64p8594vf9fl4bxongpklwwdahl0u1x4tj426hf9ghie7v8mcqqdhdde3zlo5xo523gqqvr3az7pi1zitqk07fq8t7g1a27bctp6255k92s8wa308ccon5nxar8agiz1v7qx0zobycz6fjutfs4ytyeaiyy3rf9b9r7zpf6zgtfeiey2vquw0wvqjj000o8pphfkfmub2tl0lfghah3r6khdjjg8fg61ewggamvfbypxyg0oy8c7qz6jxjsj9hh6p9nkj8sdbvrv2832udpbccdvy297a6efw6qspk420m0ndt8mircvm',
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
                        
                        id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c',
                        tenantId: '48b60d77-1552-4b86-866b-3ecf0ae50150',
                        tenantCode: 'gmvg4n03sfbgeqdlcnhr1ae9tbycmwyj5y0znls15beawqdwtb',
                        systemId: '68f61958-4463-4c61-b7de-54cc773f8024',
                        systemName: 'nlnd79fck3y00pi2d3kx',
                        channelId: 'f40125ee-8415-45fc-b829-51f5671351ce',
                        channelParty: '83tlf5eyj7ze5it9f483624mz08mutaixvjcf7lxyfk2mbp2i86v5wq2x8o9hq0zbznhho6onb2jpvdaq8hculi603ye9yksvq7jilbgckgk4ynrdyeusi0a498f2473kp9o4kxzwxni1hp6czo7b9qg5ajp2zl6',
                        channelComponent: 'giiq0enjndrh69x7zvldwj9ku5l54ejllu7ece4xdykggocmn688eduw759ssc8atjzqulo14mq7i3q5l1zumz9hhbvndd6uhnmlo42rpvw7eo29h7hm07wtqejntui9xex2h30rr5m2kwjwg98cs1qraqpl4zjj',
                        channelName: 'tlr0vwwur045gn3mxev0ui6d9gdeuxg0t8w9g8lyr8ns1hcj6x6jcl3r2ecca49off7fmkf3z7299ez07phjlwey1xztomw8al5xa1ostlrywkkrkillhuarril2g8wmarxw4ce493k6qko7lfs6gx9zbneo0sa5',
                        flowId: 'f2e6ca50-4789-430b-ab04-e9372a312d72',
                        flowParty: 't591lukmr16fnhlrtszqxiauvat7ckymht2pu2tpr4pqoqageidybjxk2c5gw17ag1w9xiiim7w9q6e5tnh3codz9w5djy5a2af8iym3dy6ggt9izgjtx88nbpdcgqjf473hfc8p3ucffj2dlefyyuo0sa49xyhy',
                        flowComponent: 'pacor2a9kegrx9rkn5rnlsxb376mjyht7yck43dc9u6z904dbuiji1ks7hgj8dfczj9ec1xlxoao44pzgm7awn3nu6oyu7d75evgkruj19njezkmmfdjvj5p2ffo6g5as5uaugopo3c5qexuz8i5ylswnht47qm9',
                        flowInterfaceName: 'f111oa5dski45suke651b875la893k3sysp5be83cn25nnd82qljzelpj5nk67cjp9ts1h54r3tiv0brulxo7qp4wfq430oxe5e5bp1dnksrca0axp108hieobpejzqzwnfrs1cntq8qnw91oy6whwq70qlb7vzr',
                        flowInterfaceNamespace: 'frc322rkdodu9z2f600g5vmhn956t67m5oqxneym630zmjo47jfxn41gbnhwtvpzfd7fhguldtuo1fxn4k5gwyojlzqsaj6894x6xr3ni0plks2x6dvnul3w4ymti5jr2j2q9sr69f45n1jmin5hgj892xredd9h',
                        version: 'pvc5bzq7yxbqipzqhxix',
                        parameterGroup: 'b1adot8t34uv7g1r6s6unah5o2qpa184vlxgszkix43f5b86r6nj1mb13tv1k6ezlfs7b9j9vvvabahyyp6coi1z55g6y9ydbfce09vy2jdtjt7gnm96m8rn6ecqlnowb1rgonu6r6ha4g94rxg230czbiclvsvlb91svshxq13m53rucpi3x5xytdrnhmfiugsi35nkoc0e05dyklib88eyxzkint1a94n160nn0jv3jkgte834989k4lgq6x6',
                        name: 'csprpr0f74gk13vz2f54rzd19atvirp6kxmlb5rgv5sgkqen2vqt0pemik3faphqeyaheh1tqrb4llyuzd59ep7zeayh2512vwx92x7lycd34lvkr7rsjjwuamvhjs4smqr2zeit59a7y0ulab3b1nxj03663koaxmpnfd8nd7nheo5sch5kkf8ere0lgyy076c527dg5dxiily23negrkkf26urpa4pq6ljxhgu3eblsrxla5e92krhhuhzxuasvarauxr44d9kgc5zxohzqg9eng723516z5u932cmst47r8b9rrtoy9mputm1dtkp',
                        parameterName: '143w333pv1g0z5uvwpk8ia6b6oxbt82e0c41zxou970t1vkot8bj652unr8mpjhlmi0ydygmorfk2d8wzz2hbh0bshtsap5f3di64b54nolun1fzzjx61kq1h10zn4m05e6d0979c0chc682oxlnlyzvwrfme2vxdkbyej2vmxxvx3g7k9o8cfcx0syv2o04pelron7xilisee898zjxqdpnied6r1lntdtcx2lzcod155pa2qgb0gcq54d9qx8vh34ujt8oz3w0tdrpu8hsrpdpds65fm6twkcvvhsa4ofupb0u32h667xebsdql801',
                        parameterValue: 'iytlhool624umla2z8mbchny4ilhds9nzbs6te7lgp298g2ksoye76vv7ybg6yrab43ifgxghpksuf55m9j7wp5s2ay2ycetycznk9macoepzt0ajueac5on7kc8zlyk5b2s5eakj9pgknl9qqmkf6j2gu5bjo9lcex1p5vpq904d4sxy8dq823fkf1ufuku7kk3tcxh51llni843yt6ydmihiy2np4c2z3wnau4lvlxn1nrf8ctvv17a26rzww0zs1p512j2rzc33ek59hs6v8w25fyo0dk2om7txvu4y1j91ih0rijf5973cz9uh0ox1h2bsjzq2akvyitk89to0rzu7ndoivz6nbpre9sudhqvguiss5cb9b3nfx53z7km9fwyknyunv0yi2z202v8th2sr4avq85jqtwsxknebe4uhkmnq212m17q7sc1efvh8vrstavjwzvb4yfoe3xth002iiq0k6dyfa6impxdgotbzymb50dc19xn9l1lrw2x861vqx8qt4nsv18bmff5z3kpz7kkte5pzfjsyuxt2mvu60u4ornkvh0etddv7cs7puyespe8puramxel6c2y2bkma562vgrauexij04qzkyqaauyxi0pp5jgh9fbd98liu6c0w8b96q53442007ose477thbtt8rrmcvq7h80prwotqgbpqa166gjlvvj5o9uknu03syzb6si9bt78cl8tyssoworox6hhnp9hyajlgpr7j6ecn9o60i5ngh362ewkbg4gd0qnmmvwnbow6b10vnhg41o85yr760jzz2a1dshv7ch2632a1pge5bcgn1z8c9vq6rz9z7pk2nka5js26a7c3moeenfoxnra81dogz1f8sauy6n5cpx1wp7puxd1xb8c4ilnrtoroy1xcmecaj23pv8wwg24m5uom70ljvygncu1u56qm1k0sthlmgnbj3sbrvcoo2zexqynkz3m5f39eqkkfmeuo41xld9hm2mx4a6n33xtwk9509re3',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('f42ffe35-f841-4d1b-ba05-f3a08b77a47c');
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
                    id: '3691cdc2-f7dd-42ab-9ae0-1a81146c3746'
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
                    id: 'f42ffe35-f841-4d1b-ba05-f3a08b77a47c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('f42ffe35-f841-4d1b-ba05-f3a08b77a47c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});