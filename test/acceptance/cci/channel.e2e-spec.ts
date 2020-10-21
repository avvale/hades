import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/cci/channel/domain/channel.repository';
import { MockChannelRepository } from '@hades/cci/channel/infrastructure/mock/mock-channel.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    IamModule,
    AdminModule
];

describe('channel', () => 
{
    let app: INestApplication;
    let repository: MockChannelRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IChannelRepository)
            .useClass(MockChannelRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);

        await app.init();
    });

    test(`/REST:POST cci/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: 'dw2tzr4x8ixg12trgl0u52dzea3ae4vvjt5xk36k',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'emia8a6gmqz48n7jpwpufxd4ck06u6s60fums8dq8n4kfb5ept',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '5zt01l7tyk9xq56nqsvc',
                party: 'it1f6ds4rpgz4ixl240cvfcsduxnvj1ku9ne2up1ohfwxtxznoo8ophxeys761w1j7gcwvc9ega9h7we56br0muaru08onr5ot8670ep76yodes9dea1a9lup1eqlf5j9m5400e4zmgq0ohao9sbk5w4v819turz',
                component: 's2lxgfot5kbp5z4xpocvud9gtpichz4k5zbrf5wuni7o8vgq3z000cm9ksa7l83wep5d3htt05v1w0ilqi63qtldzg5yc9dab1wbspapaf0evlum2wl1zsv51fe4ruatzh78qb0qmx01672pdngrr8iqivtmo9dk',
                name: 'e734w27cdwvaw99gw7j30gx1aqmptoqkls3bft7q4jkv4624v9x367purcawkkk3fcy061m4i8ertsoxbx3u2vzu2vtx70ri22r7ts2vjnyt99jjxcqhoox1oijv14vnr39zyehkjqpxem3k8n1e4l2e9dndq5l0',
                flowHash: '38ppbn1w9t6m4ngjrs7zerg6cnunsb74xeitb0hc',
                flowParty: 'b8rxvqjw7i7ewezlo7tlhv098m7zxfg1tq79vlgb9gm4gdq0dvss3y5uprfmgy0v49ssfoxqe5hl4496zotjw9msufy81b8d0uiueq7q6cfzu8d23lxwz3o5lxgm5by56vk3goge7yqydam03s9akdrslwopoyfd',
                flowReceiverParty: 'uxr2p8cu0wf0mx3u6690lu2evcom7bqemnukxo54s1ynh3906pdnwkuvf8sbh77b9maf02b41u83tq4mksx0arpu3dnv9rnr3hgkl6hgm9vu4mb8v3vgzj52bhng7e52wyukhnapzgnvn7n8ub8kyla0jd36iza3',
                flowComponent: '348d6ia4nf96dzg8w3o128rsmvo5knd4i6yilomgv6cvuiqc4x2yu8bnqj64br1oroyqxxs6uatjbbwido9vhyhn9skkopr2mst4yenl6oopuk1dbj5g59l4irczkm7a6gdklfg2ezf3m6ngu4qaae6fiyhudgv1',
                flowReceiverComponent: 'ukwoxgfqptrglgwoh9h6ogp8u124z2gs6dirzdtvd5buy4vmf86laxyeha9inrsd9woanux7yvj6c8u7zosw3qi9npbrvyekhiqto49fu7qmdr38pxy82vjoffa9a57r23cgdq87tva66qpd1gzqx7epqjmo6vge',
                flowInterfaceName: 'v6ypty8yxkic88zvou39tmr8as4uavd2xxhhiyk3tq0hcwxujq7s7s0b1xi8ffm1kw2x4927z8t7adw7o1wr8pvgh5pgglyd8cf2shq55f31i9yljkb0an67npbl64zatt7sxw110gtnejbkwnt2v7qbas59z3qz',
                flowInterfaceNamespace: 'ylkb9kerasbtm911h1qjcenl5tboqytnbvmw0pk23dplylhc5on6jsq4k8h8gmje9kukyuv67ilvgo3ioxht08n36805svuag1umoxbxjyc1sc3hzyk312re7jhyu09347wcmmm2psd5leoe5urlyllob7pzc1nx',
                version: 'c1qjrte2j7e7ku0fw5il',
                adapterType: 'yfzp2sn507vj3f1il24mbcdy5rw593qffsmhh97w4iczo5ywbugv7lhad8jt',
                direction: 'RECEIVER',
                transportProtocol: 'bi108skywyx01qq0445ermvw2m60qf02w6ttp1eeiozvk2ookuf7c3xnrbre',
                messageProtocol: 'lklerb6mqtsfbztm9znfw1tu132g1q6sz2ivitsdmln6fs5pm9xr52h87kga',
                adapterEngineName: '270lh1ufug3d1kw2mr5yj3f44rltetopyyj3fvo71s8iqsawy1s0lglwharts4zktad4j63d69z4nl4n3291jjuhvhdcorcgcam5vqvtxl57ia3mayd7pmojyg0ixqxu7zqk5393fz5mutvxruvhwkjaodvuyh9e',
                url: 'kadsrd4i6m91mzg6y9ru2gqc8r3w22ys7oeltnlae5y9k0ia3kbibvap4iq9q4go51ab8u2d1vyjz0d4s7aqb7wnlmp3x12jsiouwrlxu0og5elku94jb0zler98c40cd9awfakey5ccgj4hs4eq4500yhnduj8aaaxdj99zgyfjwlij2c2e87va6xdjqe7x57k8euccbbhxalpp8fq7ivj60zjmay5da2fkfsnxoobhkzx9o2cm47mxjmuws4x3j2eo0l213cjmsysrogsoyrr2dz46qjcht97rn1nua85n29efc3i2cxv7unrs4bzh',
                username: '4kxl8e6ny75skzsdcvc2foh3mmza4ahpatc9o6m74w5fo4xwvtvi8fxhpygh',
                remoteHost: '6kv46l82mm2xmu2pbxqc3qybx25qk6x3ogsux1p9xs98vs1jaib3l71u05c1fzejomt4y6sq6ohbuwdbdg1xzjagqlxtny94kh87q6bc357dpnnonxrvp09kx4sbgyu6kltavd5inrtlglbhkgg22iau3bj9tc1s',
                remotePort: 6133314827,
                directory: '2pmkgutbdc8ayhw7yyuq8tb6g9ts0ok3imr6tsyu4hpgjj1fk4jby5wymbw34ry8q4wk0jras99g5wtpunxfcuxh4h718bqxonyr1q8s83uzsmhqe0hs6ca3lbv5ogefxfnj9ey3hq3tkynyjprv34s0vlmgqitoignj0vhuy0mv9a1p1opiiuq743m66czuhzarqg4hm3y9wf2i1p0z2206oso13n5r07ra3hdt4n9p72x2acpib4ua8upb4x6unvzdiiuurdtozqzmtewzyhpwc5o6v9peudqpe4oelp1d931d6ylh5qi5x9zrkafdbhulvdnko2ugg3gsjf07d9wie3hr4f1gr317jku6x004t5gcklxir8xdz237ptinroiga7seoh15k4p7bftmam6zc6c7fk9suwwenme5ycz0dd3w0ladi3wmzvis0fs4naxt9kjdivx4ldj9eywqfwq841axa4pg9cs1ercbrjcwe0s35b1dvo9q6k4wcco3qfe8ids0vs4b3v1uezyhhthv6fuiykqn0i0r5vvluvpdp802nfmg2p3r45oynf132w309ipf1cuqe32ggsgw0xahqi77l2xi2lq5e0a18oqg7n96z2hkclsr5gt2y0ibkyqqu4mzcg5txbas158s26v8gj01pnfam6tslue3x5njhvtdos35wwii4etzsbdbxv9c8r1ukyc01p2v27dkoivjbprbd6etdikb6afdx5sgimxuig0b02qpq2kmloetozqlkep7w78zpvp6p55si5tspzfpr68eqtijbr8wlyxljkeaypryybqqboaomvtk1pmpeqo7nd2zi1ag0no8mtrhqad1z7rcllwwoxai2hpo9rse7ak2y7ovlnhwzvcq4ra7h96s3u1dwf86i2st9ra5mx4yj6q1f5ekc7cpbdd7fbtroj2v679bp716zj41hggqxrbn0ch9hij7lt1pbx6qjksgexiz7l62xntf7srfzo2idd6d9rj50x40gt1g',
                fileSchema: '55umz0scdq7yuz3co4hg5zkjoo58z98t2c1aovdv95er1dvb0pl48f7k9n18qp7v9dspueejscyq4t0po6sn7udi1sxgovr5gzcuzgi1pzwtx9k3xpcacqw38tahuefrtrin1wp0ufu6aq6ui5hivsqipiadwryfqmq3b44qaq4kvtk8a1zq17h1sd00o62bl9g3is1u84gi36rietbb9zgprkur9no01kmhqlqn02rc77xudfhnpbhjt7hhidx2cs3e955cprbhs2oj11909dp0ba3gqsvi9ttbvgsdh00gkyybf1n7hbboez53u1sunevz2t0i5lgquufocogkdbue3k65vwauxa2235i0jd5xjbdcnapmm2iouo4nbqo2xcae66c1c35m2odtswp6oovwz53urjdehobiwxejzxggt1ld8k70e7qn3b9558lrn85536qgw1wf1py6tcw300jb9lh4e5ef3jeld2fh637gclds6lhla5yv5udid872zm739lf89emz40r766ie1lpw8f4a9a8gi4hkl7qweqjhgxf5pajoezjca311ll4kvzqw8d55l21wi48qtphqeul5yb3enfiaemmy5ursgnqpinyklgeb4ee7uw301mp9h617ol3aoremm6gjq66byp5rzee5v2er1br0dhou8cki9bev18sdggnz6luwevc0bfzmaxheleri0sjbaun6fdb3nudwfnddw9ifp2ux1owa3k0n2k494byyfeyll43c0c6i5se1lyc01e7dx24yc2rfvyar9ia8euim38gfpad8gwg1x75ioyxd6s9lyi5jrdj3w8mgvc74o9h93wspbjqqipp9yec1g93b3d3qvo7ggf05cxchpanmro2jq0wwlwnf9vw3wnn1npyggq9ajve01zbjkflxtl3f6eapiz67yvhu97wnnjlewf07ha56rlbs5u44ho6e6751t5x368p0pt3jbotcj6rx7tp5yuqozi5pr0z4wns0pmw9ghto',
                proxyHost: 'f83ojojiwhtwp8lr84hbwqe5a7zhfqs30x5qbhdcq3xjmv46wa8jzkdkt5rw',
                proxyPort: 5461002643,
                destination: '0vhhvxtslj9hreom29q2vmp57c601aaidk6tqb4vqbpqmafzhjd5gnie3nickluandscoehu0579lc68zg2f1ro3qc1tsxxp9k5vgqqrhylbwhhzdy6rj8smqiutaohb8q5muf58lenufccbf14nta4yntj7f2ko',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vatcmrhc0q4zog0eqexf4fd1xls12ki5f69xidfbt0b8obhekub75v458c7fxemrcukhn4cj31ey95p47zjwn8nkk18znim8a28pbhxkf0kdlsf1mfvukn6pniwx6sbuy3f8ikgmfcofbcgy40dpe6gt6gld62h1',
                responsibleUserAccountName: 'plnnslb3qmwz1jcuygow',
                lastChangeUserAccount: 'wqtc6r7nuf0it8gsg0po',
                lastChangedAt: '2020-10-16 06:23:41',
                riInterfaceName: '2xry8nix25atw567avi9bk1tklcp7r3bj33suuv5rmkcg8fyufrs97cci840grblpmcayl5m8uhfrm6xkpbf2fhf62y8rd6zg91fuhzcusx4woc75t24yceulp5ji4w207eyt224veu2neg9tyzdxka8cajrmla0',
                riInterfaceNamespace: 'ngiasi3gcgpwoja2r6fqfu53qo2wmv2y1emqbm9whuabhteebyupg5nolth2ctgjxpvsu4mf5owx3tvmyzveuk611j1l885050sqchkv3zn5o2q8ez1968dit00scf47s49wa331zpb6xq0z15j1f0fka8rnqo9g',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                hash: 'azxf43dc362wv0jr2m9p8s3mzx4457ade7b9zqsh',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'ofaq0pgu4ncxqbs1s3juhrhsfiyd56dmbvgt15nl8fcfjksp6n',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '93jnf3rygrhjw7rghjim',
                party: 'nikserdx71pkhzqmbl339yldafgzu2wtjwjckmx87czcdk9bf39i51q7wvrf5ofzubl8ig5nc7dizw5s1xjlallb4ffwcwmrfv7h2iuo02sfuxuprfe92l45lrvdqw1lnupdocaxrtd4amw3n60x6glld04aqom5',
                component: 'qwpj1gdevk0flm6erj95gmqdz2w54uc3naug24fgkfkng1swgo702oi5ak5bdspt3xkffs2zfamtsijo01dpbe09u8eu53i9iwlpjms5vhqea3vvbwxvu798ts28m9pqmnznaphqderr0rlasqe1ki4p2d1x9byv',
                name: 'i1c6ttmte09qkwnf8j25xbqccrji9dsa987o3ziw8v07oj86ed2xtv64x3f213dje32pzawtlkkktpewr4g3nihwd7zscrmvc189s8aqh8bhj9ah6fxudxu8a572vg7v1pauxtmo4cfe4ltij9z7fhkioiuyhvah',
                flowHash: 'yiu13ks52lctu961z3yszkoyla5r870y40qfxy6t',
                flowParty: 'irzjq6555kz4c1zry4jk1xedk276juzlnhe4kh7rz18x45g4l4vn8xem9vwnw4l7hf5totyt61y7jjj6a6i6jilhlix7yo846yamld1l6pjfmuao84qnnyd6pka3iyk4lmcsw617mhuy8uh814yx119vnqq4zg5z',
                flowReceiverParty: 'yezqjctac020amcr8i4t4npjos6g6zqtq5en54lj4nkp13mmuk53mwoqf38ppclbwiefbupu5blftbcxgrgfr5a76ozglqv9u7n2h9ktywf22wy5174zj0qzk53yzt7pt83vvk9v5ntyb1m76wukih9g2wd9l7bt',
                flowComponent: 'd9wawsamn5ndnzofg6eu39rxjv4jze1l5o6it5xw1ukvn5fwk7t7pk8y2sdo0ptrf5uji5pt51gunj5jm898t50pxcpikvpij838s7zcs7a7aswc97m93g5jrk1djdzs4s2e1yxeia18s3ts6z2eq3vcj74fnbkt',
                flowReceiverComponent: '0ve5pczs2u1o6yavlrh23phijwgfm3k6jk7maccccdapdqyn53n2m28b82qsjxqz73bgxnqv922laojkx61jdqp4l56cqv7okmb4k8558iq2m8jnlzypmg2konb0ruw3gycne5tmad3kcw1jzqjlgauy9iirjaxe',
                flowInterfaceName: 'jfsjn2hw36w0kvtwoojsvcftzgoth8s67ace7b801tk1yecq6mzbhmeg7k59sr7hiqsqv0votudghwp8d9xu1prsnbak98tu2nybmvmaqs85yb6g2bqi3uqzoyg7hd3h796ktni4r48ollopkeguct1628n3hmqi',
                flowInterfaceNamespace: '5b2u7xiah7wmobbm9nnjhmqky4s81nzhvgugr8qtx74lxd3u1uudyjg8z7soj31p73qf0aij6is1r5y74lolp9endqx8fkn9188xleyj3q0ivl1pw1s81ucmeeiccpvtbzv8k0imyipuc9x73z4h3ah1l0vrbddi',
                version: 'ssxq1qg9c2hkxwtc73lb',
                adapterType: 'j8tmyykkhcbc0693lgw9elia2nhnkvkn4xd3ll26q0obvzj295o3oyfyup15',
                direction: 'SENDER',
                transportProtocol: '2mnxmbmaddga5eyfbkmjw4x7tmgp9eu69ylkskg6ql6jcgsy8uh8f8wpztbw',
                messageProtocol: 'a8ebvyyhbkdj2ef5yoia1yunar20xag7wnyombe1dadj57gn498tgvgparjo',
                adapterEngineName: 'eahslnotqxe9rzago2n1w7jlwb5jyz4gpoq0xb58ehue08ykv1nrdj54v49xbjdont4dmsvcxycq3iij3ciyy51a4efhwnc3u358y4umob1n1of4v5u5arrg2db7uiwx9nal8iy1egs17y0rzzqk7yfqd8v2gmw3',
                url: '8vk1uf797834t25mmhsrunw0v1d8ncky5c8gq13cka1z69knk5zf1xp0czlbp337cv08fm883d3rr6ol4n71e20y0yx3kdo7fxffh04ps8yj1wvmsbo3cfln3wqzsb6lto7plaec8q0wu2gl6o0j3vcptxwxaumyph3v7tthn8800xhojiaro8iy1ayyy4fq1dbkakx4auo9vo35gp2mnwu2g8oqyn5eq3u4ec3wwgpxlvjppyfnvap8jc1kix8wrysh1gefg0rvkr88p4w7ixdgjvdhbw7go2nnc8n1eevxl6r34vg92zvrkteu52hh',
                username: 'yxnh8hyubekhn6iqjtgx5o4d1a576qf0nfs98svw5plwfd8cl1irhsc3lbc8',
                remoteHost: '3cbz6u5f2doyfnmvbgh68d6j0qhzv7bo5o3f3owejk65gucvc627o9aqv2uc3j436pq10zdk7ukrhwibsyeor2fi0ou5kxitw533e4xpk83wmh0ur33us861bo4y5lst8ros9xtwaw4q09v9hc49jy94tq1re32k',
                remotePort: 1892582212,
                directory: 'xi96hxdvhasw1c8ebahnid7m91gc1v0shrfoddhiv6njx6h3odlcgilkjkxjz8v5up9kqh4ziyikvnmhfej9dgngir7b3f28vjpfdin2zlywu99rskcns4qkaogxouq4r0mz3xpw3a3zx4tayw5c4hzelbf2lee9m2c9yjxaiex5qzx98m9z18v90c307wnb6exhxmk4cz1cb2kg9qcj57roc2dlr3d9gryl33kqzyuev349i8qgh8cfqq2xxstvunt2q3j02h2ja13kiby796uj6ump581rjor0wd0o94af58b8353uzpu7auc9cy9r08vo2kkjdtzgmnyrlkqrhtk2vhp4ud0gv136m1egee9r5nctby848wtdjbh9k6sqjmpd0b1xseltl4nm83wepyqkbjvu16ctqs8v5wmldlxydbhtxzc4eibt41kdm68c1rtol7uhspzglffeg1xxacttkvddqglip9s7n85duap8l45j19p9jab70lqp002idc0efpnlanoyu2gub1iob30rny3t1vuqgygsfc2t9ozv90tsssb4awtzthwzzpkggocd9cf7xul9laf8pe3ctkuwg60om9b8ojz1lm1jv6yw54z4382nck8rn3ximk1z3nqylh6cevm6tomqteqh4wzr7ohmibibxopvjdj99fuv15t6fnnh714ftskjk3xmn87gbbr0baxu9waeni6wkp99mh2uogbfh6gfwy9aa473g427njpzm1j6pvs4dwvwqrfw09kd9x8577gam13h6p0ovo4d882l9aspmhiwintghdawpbrjuou6uyyb0dsb6tr2n8w2zer9reyiwv827e6aoc4w2kdd9i82078zz0dv5mshpt1jjkafbyns4r7smnkmu0u85qbmc2argzci30wscxrwy3s7qt01fc0lz35fs69ultpb3ay4lkrfvflbh4436u3v3r4m56fin4sk9af2yn5jx6etmbfiucr85ogdx8unefwxdaml9xdojluw',
                fileSchema: '5c4j0ooez3yftfpqrmrdc22bulv07k71o4tokcc2c9p77guosm0ro4p8vcw5iqnzc7c82szyj6047ddzqq7zjk1pkdjlsgot9qc3tlgwd3gnrlcbnrsqcz2abm5epq3oler3h7njtwpptgl6wyxjeecvxcjd2ti772inbfz6mocwiu930whia4o6s4gfu4qn24l9ek3yx2upgkkdxsmiwi0lrlga31mkg0ulujwal3dbv3bdr2aw4y69tzsgg0owrz1dj21z2vtb4xckm8qpfmqtpcywu4vrxdr1x6qyoe3nalj4kzrp5h0lqxml6ck4p6dfuy4k0kxweqgze9h8d06q75qfxnqs6xbs91rq9p5lmue86q4z8oyyfv674q10i1qa0fh25hjqku50usopgvyf8b69oihxvpquvxffp32rqqvs9btz9fvcx5d6o9pf0cq4edowgt8jsabd5w0gb2i0o38kthsnb0rrbahcymuuupv49ceozv4w38dhe4lzlnid9m15u1i9uxh0h9u8h33isqqnr7v7bw0c523ycyhgqdu940qjlv5bjdwzadsntgpxohlg13rg7avn3fl467q12ib1rh9631yjhqe41pe5fuy2xt0zbgfb8wenf3lods8tmtgeuizwf0mwiynh4lbqg1dvq5j21uu0m59edsijm4j0lpxknhdkrjptb3coby41kumcsae8990rgx6o9d5om5ux7vx8l7icx672p4b6lmqd2l1290agatvq6azv64f6h14uopqsjfz7rltb6eb7zcosa4mpzny9ec0zbv817k7ektj5xktz3baegp1bvk0gx43tk5m5n805auwi0tbq1d5dat6we69449s88t1bvzlvgdj6mbveoqzpnx3n26yu7v93airc3hp49hxkq2zqxpl1t6a4oopcig22p5ymlus6fo57ds7rsv32100a7ttmvgkwgsuh32sqsq0ssc4ub4oc2izcgnzcvvlfccwhml3088zp5s99v3uvlqc5',
                proxyHost: 'd36jm6eo73rqdvgaifb6iw7qxk2k9hszrhyvb62ol4y4896w5qdsormiqskc',
                proxyPort: 7858111726,
                destination: 'x2aev61xxs5uvsg3yc0u3medwe55b7b6i9vjjj0b9lljuhxxp51pp1cii18iu19kvhc3ztf5ah8ubn9c5yanun2uvxvow7khgcz11kjv9qstk5uwi2we3uadum5piwjhgqruneru18tw64bduezluj2tbp7sqyfs',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'b6qzf3diiflx3hgcxfd7vqz3r9021twdeu0707l1aec3wwsypdxofadoawzip0g2hy2lr0ucqsbymavmakhoc9p2w1lvb09v9w68ocxjj8wko0mmrxw297c0uh30qrl1k5al18ex6vg1crpwksn45cu7les9hxqm',
                responsibleUserAccountName: 'jmt614t2zqab8bshy8bp',
                lastChangeUserAccount: 'h66kpiufs7o9jy27yx6v',
                lastChangedAt: '2020-10-16 09:37:54',
                riInterfaceName: '9wh7wic1ng6zmhl2y2dg4gv4e99lwk71na6vxtjrgbdgmhux9t4wdv701ecqqaiy2o5poc2myx5v88r2dk7e7843l5s2xpsla4p3b75xg1pmn02gylld3cpsep9mm3mu0rt539mqhaauybrt4l766ababbx4tns5',
                riInterfaceNamespace: '0a83ai103hd2lp05652d1bapn3vtmwivmhiw30wcfp3mvx5kkum42tae2rxzuh9t21ho0sf4ixox3f2cvqi4n7bx1rkmbewgv2kyk8ehgbyenbe1zo13mtvl9t2dkus8r06qdp6ccojvpol0w3gjiduzoda5znes',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: null,
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'torkj8fnuvpbcp0jmtctjlxm8sjngu2bpkylw86g425ytv3014',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'ejhwukjv1udwzz7jj4i8',
                party: 'bqasr2bu43klo7m3osl0zf83e0ycfeyxcz9u0s75cj5fqpntrbj0wvi8udilbb8vg6fd6o3azez62eyp3b5xfs7xn4sswbzwt13hvuq925xscoqvlu7alaeecvj4gj9saldxsuge4zi446my72zj4igltkydnc5l',
                component: 'piq5pzyriu7fdoy3s841uyahjkqglox23uoi99w54u7s3gkpxpxqyre7h7719wconeji99r4jyb4y1btifcavz5yepbfs1bpg3e8wxvx4pufoobqyzfeo6cxzskc7tfp70wynjfstt4ukbvjlvyqx6w5wzduvbw5',
                name: 'zfb8jgnujr3q7hooj29lfrnowceg422sh8tgm3eoiqrbtewa7v8no9n5fwb4ysoflvvo7iunidaa9jyhexy4wuqhu2bzo7yrnzbg48smhun7jk59vsiukijpnhxqxenbpmb3iusok7nzez0dnga5sd8kf2kygh7m',
                flowHash: 'vc5i8pjxvyb1ibk3v39vylltb7aea03ehj2qxey2',
                flowParty: 'ho134qrh2bg2q5ip0ienxzsmf2g6oa69qz9esgl3kvmvbce8iyfs96zi9bslhcmqrytbgswvs4o1mbr6y8kiwwx0vlmbbkccifnn4sny9dkgup59zyib4i02p52tcltygeonn3c6ozpniizfxk23uj2ik6qoh5zb',
                flowReceiverParty: '925suk158mzgft4ft8e6k5led54dsmhybcjemdgh8p6fclpokjvdk62cxp37nij2xv4po9afl33h06d5oa69xgkbtknqzqzb5gnvi3ffvk60o8pv35c1kntglrn1y02vckt37q7vekgx9nbjef0a5txtku3nz38e',
                flowComponent: 'zhhbdfjzj8s7g6uhury1cxuyyin9kal4k6zgbg9f8j8aa2syp42ymk2q2fycyu8046kw06u1kc5egpge84mj0z1cofrl7puhmmdi31g3hllt9ryjqy1svkonuaoi0ulqku7zmzc6bnx5vnxnm4n5mjse7s2jdnu5',
                flowReceiverComponent: 'a69jvs9w0pr8u32bcb08kn65tlt5xksiiuvp2tsb7nr1wcsnzjm4b3csnwmrpbcduw09boooh90zu9lwyaip3qjcppcxlinu5rzqtj6uk7ylg0q90zab5w9pbte4sl1odpm9s9v8w1kr2msvsoqvlnmevqnt3tld',
                flowInterfaceName: '660za4517ststq24n56drpsptekqy5zjd4qhovnxvwodd3ohhqti8wfpmmo57cvbdlwynz59orxippfzh7mzaahgl90i0s7s2098oafex8rjh84urv4vtta00pme0k0vawfr20ncu5jwu24b1s7jcufom6hsd3fm',
                flowInterfaceNamespace: 'lvvwx61plha2ln9e2j4i39p5c6o7xpzdd6h4g2bgica5wls95niw05juwa9j5ow273v0uo42b0afl8jsli6q3ssp4ysdmg17935iofdk5176ro6qldu6gaf2j9w0qzusq3mwum8is39xiepyxk96xjaasrk9wilt',
                version: 'awlh2d9ij2kulz48isw9',
                adapterType: '81qh2cfdvyj5wm7c11pjrddty2gbak3u31i2sk67k5eejypkg9356x3ai9ps',
                direction: 'RECEIVER',
                transportProtocol: 'ffs9bpg3jqzwvt3gphpdjcldr16bhrhqx7rolg0aeozbp124an6k3tpr462x',
                messageProtocol: 'msu1tieqdj2qe1pk80b2ggbjtbda5j34wfwqza6pkjv75j2pxgir0574ch2c',
                adapterEngineName: 'orse63wxngq87cvr0yctnwh6ohnj6ezelcgnmny4nj2jbcec8g99fakfuco3swohs0k0wj6pdnfm0nhak3caprcsnil8g40vumlp8ecdsz2zofb4yog9xr61bw3x8mzm2km21uanjkq0ho17iajf6upka4mmw1en',
                url: 'jfdwmtdyovjw5r9tnaji38p7ihoq65anciokpzg0rih2o4vbonur7qwp7y0j886snvju2g3wvkyom2hjc0np4vos7rwogopv9zjp7th3b2bdpbczfc0o44j4g1dt49zn8684w1es1mb46j3skn6my33zesgers2z4sct84exgucwzf566ff0xgffxj59kmx4lvj8aiuigm7ntb8oxmjow6k3stn9bw08k8b4tbv02v5ubmiq4hav5dy9oqyexnro44qz5y4bdis2a3ih9oghq3bagjpa4cdxb7h90u0mtzppca6994sde3x8ww698mfd',
                username: 'gy5twjq9s2g3f8a3kvelpzsawpwnyy87r7tlmp7n9ljs9kvpw61olfg7jrv8',
                remoteHost: '91ol3rz2msc68ry98mw3u8i1p3mgkxbnx7e73587tehtkk1758uup55reaz4xc0wjaf5a8xhreouhi76sx1rllu4suxf8guusyzaucxovwqppilao3vu0tu31ou4w7qb3lgor188uytvvxo4csmkygu0hg6ha6xz',
                remotePort: 1749378310,
                directory: '1gvp4zuov4oai7q2qr8no6m7h2e1jaku5vpsdbjy16brho9rldv92z5qb1o0oor6ny7lcttf15ewquyrlt413z5hoitt17hd28jdpzhj9zug7cffumcxkoer9zgwnsfyv2sizm7wc5zy2f5s47zlp1sxzfwjrq7in6uucgx3fqe4uu4z7zbyh040ybzdzswcuis0gqdpy1i80byolp9dpagfv5aampz7uw3tyc9ol3cvnr9oh6pg4zou1uxw89o9efqvo49wux1dafg3usnr4ls9z1ra45b4ehs3wmxboy3bt8paxxiitxyw94eon3csdmlnw716lwbd9g7pae1xivp7ibzqjoh2qm9f0hdxptrsuh36sdtrdjnla8lkmo2yemg8gltwetojjwirlva16hg5qjs0pguqswx4w6t6i15femyzvueeaduo85x5tsyoobilxps369z5luncqaanku7vi1keboyyp00mnb9utdca6ka70vs1omenbms2riwp30suhestewcdb5xy94hcws63n6oetqmr0zcwynsy5kloc7uodyz2loakxaggglph9seohrief5oowi65npjbmfw6749tmhc45fkhbennchcmru90va0ksi8ejf61s6hhgqqdixqkcrvk8vrj5b1b4n9ce26glwtxhww6t3ddxbtv16vust8t8gheka2vuew1hu2smv4wjo2o28zcbemv00wysibhhktz1eez3xqwcaad4okkq6q7etpxp2emso7m86axiolitscl4bflfylisntgm7jjzmt1m5cnxslqtm2b6mnr9bcpgxdjb5jiy7v276odabizujlj7qs8uzp70a5jnr6586cmi8cql0k8hvp3qs096i30a2y62h5iexppndlgvgysqu3b01jirva7y15jrjlvb3mqxaiy8ybyhpt5f4oadxi0x55mk4yko7jxhkjyvszx0gz6y868sxqbrz5qs61tce9x6v07lhik85tni45w85bp52ao6wr9xp1e',
                fileSchema: 'b5mxnu641620wiiroih3b1dfn4ywunjxijdhw3gjh3wlekxalp6mc9ekyu25uvnfi62ifnji63j1u0ova1zdcdygj4jt9l8o6lzo6wdbb2i3z6pq4qsqx8tw8h3mcv6woxd290gjrl5zza0fz6niuf6xwa5dhdki8lnvaynvyrmtkvceav6x0kddweymkv9gc9h9z4j45sonxxlagt9pepk4neqid4c4kmyd73fkqhvaagb2yjwjtz534gbxmp0b7kbnkzigvedei4r1dmmi62th0vtmv94o8tpcn52owzyo88pww4q94efgr99l14cf90q9v8ynx2uspuv3fynfqvckwtfhu1veinoml8yvbyihb96y14673tf5qg529xg7z8woug7oqq8d2taif678zwanc59vnortsjamefs4d1rwxt790gx0ow0jhv6rht39n1tgayxzshqo7552p5bfqr9jnavdi6y8ioudx30ls3rlux4renyafy0yy4vwtde6aoq7w1jpwxlag5ynls1p3hh0v7lgvoxtomsc4w8c86ayw217gwh3kb2ng77nf6klim2vaikaqvdgy69idnutocrt4iao9wl5tbov00dl1rozaotpenyz5b0pg20kw7ivm5ieq03iwm28zceady4sqfq0cn3hsqihr1a36v2qbth6p75udolovpfg8vjqj6z9x0vyjtdhrqseiicgh6ih9v71vb21se7tw95ri5fm081zrdi419ap15va92jvl65m8z2nc3fqrl93k2enrojvycwb3siuulyjn7bl4tixfy76ng3cu9e5b16o2yz58u5zmo3czfbgqwcd62hoflbhqle3dfwgvemwktgribwa57w7bzv477b7bpmx111yoj105jism5j09nj7tsynln9y33p3aokj7siegxg67bkr443dvzzt9v41455ogjiah7fhowopfp1url71n2ha3pr9r0so9r2pjfqvlnrar5e42l3fqvbb77od5ihp56fek3fm',
                proxyHost: 'vajgoqtpa3uketseoqbj5s1wdjwhzywnrrlv1eg4hbfo3ygiqb7pkxxxlppb',
                proxyPort: 6426172524,
                destination: '7916ypewjhphrlln6yx05tvbvbwop67hjw200ton70jo0ga7z4npp9o9ut6e6lyixqq7gunzl7xd9w7yo00xzw6zjm63teoqv1f1tkdhhe5jlgxcpoq63oawqk28zzjxfa00a2mo1curkde4d1invktk6nmij5k8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'oir7ipiyb9rxgrlfqjzger8l678bva5ebl506ir72s696ob773sulf2hzjv6gw99hcwdy0hpxw9g2zdl4oke074fnjxftg1j6yxe52scqbog5a4k4dfnbetykcqqx9b2rvqljln3sr3aqrkzvq7c6b80zmjbay8z',
                responsibleUserAccountName: 'gxmssmuri4iowi33hrcx',
                lastChangeUserAccount: '7q2romqaqtwbpibkc2id',
                lastChangedAt: '2020-10-16 12:42:09',
                riInterfaceName: 'xe9n7rm5hpf1jhtja6et01m9juqwlh2ut7fdl4m1e2h0l87nizmlxy0sk1ovecgywczltw3o7e5lfi9czpd0rytn4s5j9jnnc5cvjs2wf5dipcyjab995jnrathm3yzxmmcf9ormkh87nrh87mhlpkdesbcm2smm',
                riInterfaceNamespace: 'elwcq6oczq9zxfnrkcmsdowpsb7qpwljsz8ufklns91kmqdqc15aoi066c6cjiianewzifurgix2bnntx6c6wael5gkj8epx985fmh9xtx21vst936rumlm46oemjmhdnvz5t116w2972o3dkvkdiyyw75vyl2h7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'joxppremymhdezy91eirjqaawayycihym3q64jyf0q2y9qvak7',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'g91bpqnehu44nzma6d5q',
                party: 'c33nmltuqax63tn6jhlas18bsu2e85e906b2ldtbot4jwzwfaag9omijz25fot7o9k56334km6bzd0mgcjlitnm6b5gqlmvoich4ntwqih9fkgw1phu8d69zgjx1pc13brghpzryrmcnqoc06dqh4jqviifjapid',
                component: 'kcku92bb16w9s8ulu5ltvi4k4qys2wwm7tfd4fhl6elkkhnzsb2ganihmzr77ai4fi918xngri0jjq1bm86668r05i73o1eu3tew1853bwpto752wddrrgfgxhajzg90b88qy084g7v3p0lbzvg3cj2a3lnds8qh',
                name: 'vslp3zxzrnsx1luvkmoplozi3r8wtdhjykhegs284rkf3ddkrnmzfvni69tc835qdadul9e0zvv60t32cgxc5quwlg4qkvcffvx4pdtfs7skiolri8hv7isqwk512ff8itdx73fkirryueg8w618flsjokcit66r',
                flowHash: '0b550rl0bnxjod2tr5ihs8d31ajzv5zrqlgb38di',
                flowParty: 'bfpjig58w4j5ix3xi8sekyvkacttg46znf30menugbb4fsihmymi4vv57knls7uu9jxkflqkkobiesehw6ei6xavcm77dlgk04hvvkd5020fzlq181i1wh7c8mkl0xqcflu020h0dgbkq66yuiwr8y0oi8od01p5',
                flowReceiverParty: '4jjja6vuxj7mc7bkk3t1hazwiclmaq969z831w82p9kf8xnt5qlly5gk6vzzlfogbt3e7e4xyofr64ztybjw9nqlvnuzjpfdlqbo5i6i5p1x81vaiuqrlh6iwg90gtztb3u4rqfqpc6y1zdg29h830103vu501vg',
                flowComponent: 'eniwhzc4vpycvduqrdho2fwd7q9y9f3hkizrc1obx5d4qawyx2izhcrxc3ap31jy6rzzvxklq6d1jd4rjlunrqfva0h19ptcjmy876pba604fth10b750i41w3gto77nrhgopzf9uji86kdna7wps7otmfq3vxfm',
                flowReceiverComponent: 'u7bd8s03d6hco2jtoj287yftbv6wrtjbdjahzog3md6rpkjooegm44ko03gx2tlkbo5dz8qobkea4o1rssohvwj7jqxnn5z0owsqjn7jo6s1ncap45usk6btl2cknntd4jm5zstkv2bl7048nrb172emljj4uf2x',
                flowInterfaceName: '8ic3gd1z1nz3o2lpygi0mrfoqiv78t6y4g12ulvsuy99h3m1db1rw1czexj2svk5paxs6vb6ijx2cigioguxqj683n9q5d437dx3cdn85jkxsnf9usno9w8tfrunfz1ih39hfaq4l0dpxlqez7nndmd3stkp0p1r',
                flowInterfaceNamespace: '7aufhlnv6j9ifi1i1frltxf940e5let7le1eqa8m5issavewss6b93ib82exorf5s10jmwj4gta40giyblc4jhyvnx0emgjnmp72ckcskx70eshlttfn42z0bqsr6qyhbtb0rrovpdhsbmx90krorvtb89ruej9x',
                version: 'akwmi3wndurgrq8fcv2m',
                adapterType: '1a4wprmje93ta5dk4vy9lo8pgr6fjo1enm9leec2hu5my07xh6364navq34e',
                direction: 'SENDER',
                transportProtocol: 'weqzockhkaut52r9m39avztd0iu1bkxy0m7xzv1twmdvqckfj9j4mo9dr8na',
                messageProtocol: '6jzvvjr5vgpa7sw0xvydcexazibdy7q1a6lfkwaowxsfyygs31giqm3i0hsf',
                adapterEngineName: '3br5au53lzbzaf9bhc3km4ys0twvcqroudpt2nxj7tdqff6wicfkt06e66orihc6qnlaa90lfybfnleo8f55y8hyrddvgucyf53loccxt6md42vdxfazfbwp16u5i20hieidesjolq96a1a3p4aoas4ky8d6ah0s',
                url: 'ei67tdu6vv0urqgnxxcayfkawlkowy6mj8uw4a7rdl8b39srt7gjull9gze0d95ofexur6i1xfypfewsoimaw288ya5qecwkn3j6g7yt85truuyuqyo2gicgk3jl9l4ir29o7k30rcnaxe3kxnljt3n85iq7kc27x1hj67ip1k0l0wdu12emdd87oxidjqfluo6eaymq1eu80zd0cvs7t8our247pn0twnsl8mk2hu96up2mj5csulx7cdx4nfmuk5gy3arfsmn4ugw1xvn46sludpj61atzdr042uyut58vmc18px5ug0rgy5ewix47',
                username: 'dgpiji3e1kp604gc26myuir2cqap2ubzie6sax4tk7wz73a1doqjq31w6o5z',
                remoteHost: '9ohluz7rxlv2vsx9pko9x4l4j64jz1efebiivb62p3901hfxnjtuiiilvak6tgy2ycdhi6oda205yasaa2cxxu99rhnkmde9ip702rs8quqf67xq6vv4r43q95mlmc99czbyzxv88823wbk9ku16xnm07apywmlb',
                remotePort: 2435026225,
                directory: 'zw9xo2vu9ls44grmfkvqjyey6bwkm4h9yv73jjd4gkm0xpybeov9eh49uj0nk0xdvw9gub46m06bw2rgco4d32gpj1sdknxnj22c2xiuwz072csdig1sw6crg7djefjbk0i4ii2cqckl58eb0ybmzzsz9laxkypu37vf2945oesk91eq98rll1ddmz5g392n82fd98gm36sa63d35cckgxy9n6mrb6q7umtmel4visvnrpik979c7p7dhlq658o0oirjuzqdk2oqk9ftosvoxypp8nf0yy5m9f6qt8bk4xm20rpqlhuqvjldep1wsyiyzxe5ghupzz4z18ud51hhcjr2nogb7ps995q1vt89ssclzf2v1erba7g3g9k9ldgj3s4ufz01ek0c40ie4vgteuuzm2cxdttirzt9dqkm4ryul4j578bh8a5a3ihq5c1spczibugl467pg7i0jpiydpgvcpcclurguaj1oexgprpq34b5ikcud3zkpiltdi6mfmg1hvlocx7r0xjl6bw1lswibe9dsyfkfn7m20zj9qoyh9wf2yphlmvnpwqo4vy2koqwfvnldmmp8wdoe3rgbt8emtin6u6nu164k5e34ozvpbl6crvt0oy3zm66qh61mlg8412hdvwgumy54xhcmkdybdipc6o4w088wlgrvwqxsgtn8kxpjlvvcpufjl3shf1agdm53epi29j3d0tqov0l5n3kgnkki8zc93gp9kqgw5o8dzdneksw7jqm8qgwrdjrczsrqooy06z7b9kz0ziydxuy9b70z64qy5pjt053docgen8ja4p7f0nkfa0yt313cqrofyzniugbjlomcptzghvs5br7jk7wzei41emwffe3p2gbij62vkjpt89ibprg8i6fzql3krdp2c01khafc6wpqbgmzccd5jo3sjy9sl0yvfqo71n99aby4x7j1avsywwrjva1746v16lqyh3gti1znvry3uz6ggrf8bchmfpjtcqowz8o7wurtorv',
                fileSchema: 'npv8nft09898jqe8fv9oh9k1lh6y9gf7k80o104db99jazwer8nvo3eur9nxtiaa22i34t9pu9av5w6ivenyeple0znpxud7jvci47bgcswz52p5t6bpl48636iwg13o4w0bbh5s66fajhm7pfhet7tdb8qu6y1lrfs21p7vvm9y9i9vknxsxo3tl7c90epza1s22srrifuzd2uh2udvdhsxglmzgnr7i6qmnkntxaz8n49nwzgtanjoxr81o1mxtfxcbzmjjv9l4q5ssf9w1i37uvr1dcj5hn2kl0asqu6n2gmfwdbpok7x5leqk9mlqmezgylfb0hv38y4ve0e9cx7ifhqj0h580u17c8y8zeznrtwd1ovno5g6224qggilewz4r0qvfvbrpki9t2e0mbr81exvcjneu35fvzqhuu96t1ty3yu61qm6qkhl2o6xfzrubnyotb89m3cbf2hs2d927tcbvmdgpwlv0oi0iwnw98xm09f6vc0ptf5z199vfgcb52497tex9usquetv0xy4xbq4po8siy46ac6rs1n8ol8j6r5dl65irmqk9rk47rs40rneyent9abeur0mwp2fpfsr3rocmw9kz56ory1zacjvl30et8e3b7xlrzk981yu075sqe9pf7u2kh3612igk3hccyulfveneovrywzc98z1jlp1jqmwgju5yffb1pdj45rb6w8gvr5cp65e8laekimmew63q6m6s0fqu6jh4ccuk330w1wt6r67vhertanrqo2doduqjfwdhzawotpwbuxyqgeuntj7dm9k9pd5f5l8jt5ju92s8b4pt8ofsymqagv4pco555hxbnajr0s0xm3ciaw9y31qoc65eoou48eiha94k7zwbt0c3j5zppr3hmj1mhsddu0lm6vhknpo3e158r8klg23wfufudia72e0il1r33yhuxho5tya4z9crc3n1pp2s9ls1wh197arkxq0gawd6g18fdzyzippygepdgrbxdtienhowwv',
                proxyHost: 'lhjmo4ii8uu6lwkdesjgi0yu9eol5r7nbs2a5es763nk8d0t0ya0cdoa23i1',
                proxyPort: 1704170329,
                destination: 'gsq89kxowhkla1olydtjlyu53mhly4d8u0xnu4wpw171qkmwc4uaaplke4cw25u9xyuqu51yic10w83dgtmwhvrikmnqa7xb94qn4qlmjl7u2knauqui4xvhmtz5yk4om0jo2kispt6pc851tq5bi9uo01deqwr9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'g3vj9feau3bexp657rjudqqdjhe7ww948k3dhv5t5a1y69lj7onzkph66qz3aqriivey6ys94zd5095zm7pj7aqveke9fup5nyfuyf2fmplqtkfrhzbswninzrqzih228owsmftz1ygos82xgylge620r1hqsrt1',
                responsibleUserAccountName: '61ref4292cfztdrtr3qq',
                lastChangeUserAccount: 'c9rxqbfb3zjno76qyxxv',
                lastChangedAt: '2020-10-16 22:39:17',
                riInterfaceName: 'pfummwlmis07bjaylzhcsvc90q9y478sdl5yvjzbxkvif12jqmtzh87hlyplaxdgodfuyd12s01b3mca47k02k75v4rk9wp2ydtr3evpsoe3cwz6ppj2ah1ysepr1hgyc6ifzum1a77ccntjx0zxg6u436cwlm85',
                riInterfaceNamespace: '7pvwgdtkr039721a80evr7298672ce9j165tivh3is8bjbstkajlv6jxqu1sb6omr07b1b13dqixtwbfccxz5fbly22opm159gkpu2to4wozm0yi0sh4isawod7rr71noxhcq6l0w8zltlbnbkthiz17vp0ulchw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'ojq7ikjvnwj8xqurptli1aug3kzxnewkx6v67bdr',
                tenantId: null,
                tenantCode: 'p6i1d026bf1pki40pyzqwbdkpkrt6cznyq8f9x0glv2l83czmm',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'u0l5ql6g1z0a5jnv2srk',
                party: '4lgulyu8y1tajg3prxx328m25r28vr3r0twliu9hvy2dj5ogz9867qudk1pn4a085ln7czmg4llnzzyw96gr3m0uz5em44mkqpg1odr5hy902nsx5lbmkyt5rd3nhifwt4ty9pss1zcd0snnoe77f18c5nmjca2r',
                component: 'fublmh3w45zc81i4sm6uwzbty67e9n0ioytd852n0w7xvvwcchoz7dfr6jerpar1dw0nwsy61gjdgdr6uhxuq68s7dyb2t4h6fkt72n5mtld92myjqe1ghussiu35f3zh3grdhzkohe27wg5tibu37vh7i1bgim5',
                name: 'rjjw9g5gw46elawp3jg80yxxszd4bfqvz864dwhipcn46bh87rugirxazgmupkx63sgvy8obx2ecpux52aeao5buvq8hubutyi1782ij7to94y6g22m0axbjtf6wlbuxi17gm0svwy6klnt55d87f8qeo2uoy212',
                flowHash: 'tpzl7gyiqc8ya0taau5ht9pyhlj7dkw22st17m9y',
                flowParty: 'l1gzq832pbe7ibp7yrbowni879sgp002s2b401ou5hhb2uw76grpvstw120rg7jxyd5dtjlidgd49qffzzc1i1jtkrl8ejku9vxgcw8cfx6jgzathpal7pa01431c0z15s7bdo0l8q1q0fm1ve2u9725n2n88qyd',
                flowReceiverParty: '0iqjln2eq93muqabx3johmtts5ujjxkqrc0gb1k0p00du4dhjlw8alstsvfgh0q1pti8bj4tlxtsrlu1zgg8atxtznr4cn7x4v3uzjskxebrkd15go22oov5v2w1fys34wcpfl3r8dkywd423qliqmedmag1e7ly',
                flowComponent: 'hh6g886z39gx6zjsyx2m4i691km8x9uh6yr8p7bn1kljoffen5tnkqdwdhvwqw5ri686p00lmbd1l7fty60r6ih9r2x6omjbxu7p6gotg3faw0ag17gtj96qjjs0fg2goxojuxj79i0v1zziq14djz0pyi4uucig',
                flowReceiverComponent: '8ydlqyc37p661h9jnsj2ntn3ir1zpczgv7s8leaznor9m0cesousuwz04ij3jclqvvntp36n135i93ppgfqw9unia6jpp8kxfeqhefn7htoddm9bssnhuskuyfp1i09dxacum0h5e2bngon9ai9o7ulpe0gchbxv',
                flowInterfaceName: '2gucrx43xcw9hokdh7ybar7kn3d5339tb8ug2w6q69nfu7jtiwaqkbmeb6qtezj173vkqffkqz15kqbhc9xyma0fjn996fhyqa6uulehmpoox3o7l5plx90gvts52j9bkj9cjguh04ps76oy9a0pqos2p63lbrer',
                flowInterfaceNamespace: 'wwpyb9iw4n7s8mkv5hn7ndpclpgibrc0l4uvddcet8rq8vsudd70cnz789gphbbvx9n2az0p5y53v7r9nrsrg6qubwgpqvr9u27b85871cib83bk161uroryg1mbhgfmizp3podx15qz19bd2408b1izg738jrhz',
                version: 'qqufm20h2tctxo4itd7p',
                adapterType: 'tisy4cmz744wgj0kj6lnneo9utbn45hl8o8hb4tv1onzox0572q9lhi0yaup',
                direction: 'SENDER',
                transportProtocol: 'hl2navjvlr0by6bplyu9nyt99dp6qjghwsifx0nxp23t2szn0x3s0wvugje9',
                messageProtocol: 'z868a4uwuzpqbo78qvbbqk5s01o523c95kjtb80r0a60z6d73s3msb41j220',
                adapterEngineName: '8n7qkuilmkuwf66dbwqd59rlp3p4rmn4qd9yf16gr9z54qweok0p24gxr20qdv0022tajoj3zvan7d35r3dch8n8uqcy08vj7i6o19ikz9e40mb1rmxq3xuwp11ukuwq2u5fei45ean5zpbdzcyjaiprjzxdrrv7',
                url: '1k3pyke2f9z3eqm97saf17zk9j9vpexmgutcm5ym03xu1nxr0c3pq21j3vtbdcve2h99puxfxsdlvwq6krdhmn625ugzkqjuxgwg4xwalplp6867bzah4niex8msb7lrcq0k60e6jkx761mum0w0sjcoddyfcn1lkqwhtnx9zbz83e90jav6zv7gkgnipmt7eof4wh37r4y57uupsddhv9ua1pp109xed1p8d2rngdvjd6x4vipzpehb9t58xfkge7g055qnzi0jt8bwpccnqd3sfts1vecg6meoj3d70w98ix6iykonp8gdc8citpyl',
                username: 'ctual2xtf2tmqqijerxjoyfwj00zb86709sbnvf58ne8x63lvhl7dp0qbtfs',
                remoteHost: 'r6c8absr4wtyqdrhp1zu1wd4rjoj1qb4bz223t0skez1m6cv9iqh8mpsvdzfxaz51wroq874l5qnazzdctna2av43t0rf61fh51xg18dre3v4tjeq7wtyhdzotfwouas3atrnt5nzgo895xvmcfe4pn9jfczrlxi',
                remotePort: 2660105569,
                directory: '0yn9sqxzlcdgmtax0gfy7icihtxk8k05jyhtvqx1jxteh1wrz3xwc3sen96thsphzs0u47svy03vl613hcfefar1n2t0qt6asr02nuiei1t2zthhxse738v0l46rcjnaf2gzgdw529gthbz1xukvrt7m53ab0t3z8eq6r9rcowed2kn0c0wpcr8176crwklter643qt6e58wmnn1g5e67mfbcscdzz9s27ik5wkiajesurs7yqzb0n98uyyewwh77a4jzvee8mglrl4qmw4joifplt2gy5igrafn6de3i86kxo6c369kg4sdsy6gnfyi46s6vlc0nvgvdxq8omiviqpccgczpu6t58mqpd0hlupg68bib85ca3j2pet3nakhu30jlau2egv592g97oyr8n5hkah0kh4dhrpom28ziqwfnm38x1ohlmh3p6cfvxxa2flgn0dtn3cms1n6ba2kxt1v5n49v5wj0ocw7092h83mkgqppvdeodyjt4udlbmu3c45ess77pkgf0aocghvzw0hiwj3hgvfqj5r6smpktzh1vrrm5zdyp0npg79ugt8jezxo1uefywrkji1aq0782mp2u4o9kxgb97duwfhaotucq0oml4i5bk3tq688sv9jth483wyh61xd1h2a1hc9uffohs2s541qfjwzae76yfzxpuc55tmg3afbcaom85wrjpem78zsf0skl5kotpp8lh4v25qabulwqliqkwpnrntycrhl2meg36w98i6qcvsczayobovbaokcv48v1cu0voufp5f6l79erjolvxg4bjhvtmnznr6ea9dj0370sdyb1ntd3fco25j40l5pr51hv0zmmyjybngb24wwbxqqejix113h9rf7j3yigb5ndre2w5ba11z9c2a21yschv1zp3flshbdah861afphct3qhvuf6m28c2d49ddputiislku5iwhps3je7jzo51o9dyh4thuc4i69ewlv4hfdry4azciopylm2u7525vsj0g7q',
                fileSchema: 'ywfpb43ix0vp6z0ywmji9wdc2yuunjr34s236qto212k55uzbwnv8ii6ljcn102dn9fmw8jjtswc6kpcn2ieq134y41hmfhbdzkgszyluonwch6twbjq8dx520iismvgss2oxuvde4abp672a4rbk7xvlnsvk47ayyxtnzvhiey3m6ot302kasq11x3hxunggdgup14yacdk47fr03pu4httwqt4d2ysn8k89rjhevbqjxentgc1er5b1fafsaou28nqv3ouooanhax86lwqhdz8o2640ajnu1x3bmfrw4sy29ndehgugr4o1mhd4yvwdhv5hgzdgrvsv9mjh2sc6hue68d0p4mb62szhoc8mc3gxtwj72k6s7rs1f4cz0vvt9fyuwtj5md1jk5yr4uvflm6np9ydrgbjg22fxzxy4vbrk11c6qa3ao7a3funnmy6swlk0diagk678vk2pwis5gltgllb6t0gval2a2rzg76jjsojyty9nw9edgirowocxl6z2zjbcsh103w6gisv2vdyxfwome6maxb570ccovfzv7p00srdwuqoie4czhxm5q5vb9ti31psuvd2bfcba91u4of4wrhfpz1o08oj06ln1404nvds60s2dfqe1co927i49hwhmk31o8qgyfhox3cz5ohmxzndsjd8vay9pyz46e6l1w7u918xwzuiaz8xydro0w6hcpkch6v0h83rc32twdk31grlnf2c5uoblwhs2q8l6rahgnvj4s98dorbqcp19mb66hlnq393wj8tke1fn6skhk89m6qzu4mtl4b8htkk0o6nbz9e51j8ha154sr4vaof7lg86rwtxpt5hno3g6enjizutkpbhzgw57jz60tvzdjn3i3538xswv0l4d80afb6g7rej3yoej000gtbkjrp2dygx7rlgaxxrjbiod2as26hfld2fg0vj9ekcv7gjqrddx2boz3qfa3ub4dmetg7mnc0uctchp5b2m26ixki83b0rxwhuppv1by',
                proxyHost: 'cjis1vpfrih575q3koixcn714pybe9tewhwfyzfhjqa5tehdvimh0m7a5ii1',
                proxyPort: 1435666714,
                destination: 'okhd95eojhuflbxtb4lty8tr3gurt2qpm9kc5bvvbcqht8yfyoi782cddwa2csgu6qqd5kyjr3riz7df4nzg88tv65rtebvbokbewql5twmhdwyzd9u69krkyuafalrpfqptzvr2idjap8duunr44bld3ofb9yad',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'f3plcbcteqbw9krr82yj3j7e6hesfm0h0859vcln1l9syereq2yqlioupuaogvp68jqzz6nbo9exw5zjipfyqdpi50uvuvoo5qu70s1n6qk1fzihb6svtq5d0lz73qvi9qlavd4ohev5o5vkchva3jqdkpnmzyiw',
                responsibleUserAccountName: 'mq1xng60eqq8066pzhgk',
                lastChangeUserAccount: '3tze1zk7ll2oenteui2q',
                lastChangedAt: '2020-10-16 03:14:12',
                riInterfaceName: 'd4jgom1z9nbmqaoxd8uyl1lhbdv3gg0o867poyxhebj3m9kl8jyyfnubngit7bt7lcbndhwzhkxzijhexwjv97dj70o3gwl1vz8ltqqi4bxt8p66r96p21u2v57uuu2zoedvhn9qgifv4kc9bwbfjemmvsf5tavn',
                riInterfaceNamespace: 'irosxdtixoqspmi1q9569r5u6mml9lmm06a5yk5lodmtpbsruc9c454amchp40ae9lpoir0jrkvcm2537l4gj98xf3ov46t35cgi93odyxrkpesp9p3l6hegle4zocvsn4pplk6x6fe6ks3ifwsuy8ow84f17vhf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'uala457parfk7yr10dx1p23k4woc1y6npk5yume7',
                
                tenantCode: '4099hvins7bybjeqy2n0ks92at33x0ltny1s0024bre6ys68o4',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'zk6vz575ebrmiipjnbd9',
                party: 'lpfvt1yj6rig8vae6258c3n8e535n5b8nfb1es4yikpsl9oadcq31dbeic9t7zbtkauplht891a1337kio7efhch4ullhu526p4wpbhw9hk3aeitx2pso6iyjgerfoygmrldm1612un2mpp2puws1i2rpudyp9vi',
                component: 't6x3jyzd58gjij1guneodgmk34vnqz1zqkrhzosp922nzozqo10kit1ef0l5ru9xkdrcqeg6n2uxgyff4tqs16i9gxhtty7oa3fs5hwf4535f8frlbzlu6chxhk432sglxdowg6kj0vbqpwhwas6iylhlgwy2pca',
                name: 'l514vy8jbhurb0f60u7n6notqfmlaxjhy6331s8k1yki1w6kp3cce9jparr87ik4s0i0ppddugqy59n9lkk1amkhum5n3hu8rzw9yi63gbv3g2dxyfxdavz2yyxj9nuq7nk9roy3556ri6sz26qi8qb8x8z85jne',
                flowHash: '9nfqogskbzf2701cexl3ljs9i8lgnsmm3hmpn6v7',
                flowParty: 'q8gjdz1ft740nqftvm5hzszeau036zvx0s5qhsv5xd2j1b1qavrod4ktkqffgoc632y0y99c0nep3aprv9kjwdjax7js37iqnb4s6w5c3n3rrp17idcpxn01rcqi5ppfdq3zpjlr69400zhoekvm0uybb74d559z',
                flowReceiverParty: 'siu1k5fjou24bwiggjjz57clx9adbtk2ffp4h3r1u8if0mzis7mqs5ee8ivr4hfokulyedf2ic4l9kozews4byy2cn1d527v9my6kpexbk76op0js03ub6tpj9thg0j07h0owwt2koafy2o09wz9tfy9b094j35p',
                flowComponent: 'a7ps3umtv57nc5uw19i5rzvorq8hpq0f9tfggzz416go4w77gpqtt60fr7f5vftgwde67kmmbbr4sjz7ft5sfbfn5zp3v6b4cfa75kof0orvsorq0xui5nhexx7vzrxc9hpyqgol4jg654l89hif5ytdanbkn1gs',
                flowReceiverComponent: '5rbr7a29i79bvbq2mzq4181t1hjr5l80l3083npk3g5gy8gnezlvhc9n6sb9jbncp7kxzk4jcszve4n7eo9qusfv2j5j0y83g4qlxqr2v6k64q0oub5o88h8efhp0xqf85gkegc2ekrou2i0f1ad2rvexljrc833',
                flowInterfaceName: 'uo6ocv0lwom05lxgxs226t5cczwvcl8s72plup9n42wqrnm2pitcxgm4spd53ev129ta3fxiul9yl1kg0s7a3f4oz949c95ypm9akxpqclf132r5qzchdqxuoc91evo3t3ttqj55cz23f34kupztsnsfs5o1cg2z',
                flowInterfaceNamespace: 's9ff2lqqyos05yy9tgbulyvlg3wrcuwrx38fbw4tey4k9u1imc1dibgg4h82r7w9v6f57xuqf1u83wxkwb717mjkb7txpf58dkc8df0lqi0uh63bwvlnaf3ci493bwc0s7ujp1oykahs5cuwhy1l8ybtmz26bymr',
                version: 'qkw0tfyvr9u9y56gemzb',
                adapterType: 'db86wt58z9sd0xt14ezeryct4d7f7jf8opg5b295j0kvcrq7n8h3l6kuxbf1',
                direction: 'RECEIVER',
                transportProtocol: 'r54cd0l0p4db4a0nrm7pmt7s4ow6rnu4hsgzajrmazfspplp0bovxq69mhna',
                messageProtocol: 'ws8jaey6t282rvutp7svethqshfjrg88tplz3wacy4vt54it23wca53rb6cv',
                adapterEngineName: '9dsf7pmf1akikr1emp7c33ttzh7l6of02hns1y9398ft7n5pn4rqx3oxi54nc60rplfu9susb0vcd9b7u6qj7qn60remy6hhdj1enlzaexdj7vnb4yvgu123z8li8gey8p4ye9f9zoxvt40s6lv2rnzz1wrpqoz2',
                url: '10q5tyhwgnfy3xenq6jof3lwkrupqygiysm3ft5or1oxqnzt7ynn4cb4o8rhnhr0t7wmxwrm929mwmh4143fze5bl0jw5ntanxuxx68nn9dheypwb3b0lplos7fy6sxvmhz3v0zh1l428pjspox7uxio6xwba79x1myuh5jjm87upfya005ms7ffflg65eqo15xxbmc1976q8wjytdks3slzv0gw2oth5azva45bxye1h8y7jttp6tf1fn9prouj1j4i456kv43naccr49zhqxakuvbm6i6rp9kwyjoihak57o2uxjzf6xu6l0jifsqn',
                username: '5e0skxuh6tyyhkxljc5jvzps72ssn1eri8r1kl1n7hpemi5nshpzg5aedpkj',
                remoteHost: 'rtqng0b47w0ni62u44xzkglobsvmrla4b3msigxqgr8agg2fr5kjkm42s21dew0nhlbrl90eedqiwxz1upokbvwnp6m7y45fnd9lbs6kl5on4anv3n2ahx03i1y4s7exaqh95gxesyb3ijedknqpevstly5yy7ft',
                remotePort: 6065066031,
                directory: 'hv28a99w80opm0htcinzmz24sfipiw4hxtz3fb5kkj94puhrz6gfflz5h0ujfcx34dwr7hc0ww7wirrx75k1xn8obl2y1uh3hgllnku9gsp6ofiwuowqrjujb0nxh0wtrg6enc9u7k5neut6a2qkzaf1axbjaj0447jqnb2r2llbw2svkddyebktcbnud5df2zydyob6zv8ydw65t6tu0iyek5cjdaeggozeiknwoc1h9k9rn8iej1r1qt2vhhv5fs0ja1dl87t6vq1jyeam4wo4crh3kxjppe5rt8knse2lcndf6j6fzkg5dbemtwbt4eogbktxb851zyros74xyhk1ny4qpq1mykdzfop0b1lb7ovrcc8xcth0j6i2vefaubt1th1wxjvdx8cny1hrhtbit6bhqljif5n58x5ercojllv68jhr8sgegxt7tik75jtondyxsqlret2zt8m7fc5iy58jcy2jj25hxpremw3hidy643dxzfrhjyx95z10clcarl70nl971lyjnf87nbg9up5p5eshzp2g6xq22wnxthqyro7w4dq5yuohkcidbrfvrc0ff45y0dqgtu6ga9foxz2ruc2pqaodtgffm0gvjkub6yfwtopo8zzuop3avzbbbp8y2rs9ew5tge2rzlvw0in2pha4pyhd0ct6m2gqacw9n3yw983fi5vd2f4jwykwky5dxpzkxgmabgsc4hku8ng214s1cjsiuhz209djzrkkth157avqi9q54sqs6223mdq1ysm88p7afghmayri1d1ezdifv0ermxalw3pkuiiwmj5r523t4z7azy5zipdhkhi47uw5x8y5dsp4ccvdmplvbsb86bv0v8dyu49tc68muhlsklk4wr9e8glozcvdmjn9fpwnttyv5atxo2a8ir6onjld9r33pu8ut09badg82rzmyd7xtye6qfprttjcciuw8zz21g1ml99yi495apf30arix9fg9wu4yzdwk76zfy56tvhstc3xn0fy',
                fileSchema: 'lmtm8x9cj36mtcrznc9ur54uou1b4dlbtkq2nfhvpa2njvhjtmvbyqva271sa5my8sl8444ans3hh0mvdb6kzmf6qkwufo1croj5pmjwi0spxyqvdrsr7zi0oy5u3aroffzs2gmk1jzbolp1z4c4xokw9gfkrzz89ahzrk3a022vr89ws1tenw7z9a9v4jph2yro8lqqlm7kt58a8i3o5a73bqj0u9cwfx2w5mgjxe4vpyx8d8ru4sd577ezysy8zrp8bdg79ff05e27np0x74rsex56aw9xxe4kx8wfx5fk067ubqd6g92s7y6p6pcs0gxcn5l93i5bwjm52cnwjj1j1gyz3beebvcey6xh6zx5yrmkvh2uiw6smwpxmq0yh6dtjyyawvtl6w9ne7td9eict60l9dwnls8g4i2y2exn32eitfvbq1nfsntpcnxtkpebset2t00xl4bksrtmppoesb9ecrymxwtn4iupd9ju69lpmsb97m5nsi77pz5j3z77di8tb9l7k7zhqw1k0tpr354azn5sh10oid0osigiun15z78usrp48b30vj3adayxu99euwyjp02owcdtv11yrdi95wevp1te1g223n9az4ijtyg6yel5dt1zxt6fk3wojgm5dr60c8dr840g0r6vzgn3glmw7r549tsj5zg9goefve3xhqzuln7pfvqnpfnee1iqrk5fc6z74i7bsduu1vg82ok0e2r24vo1abvr2b1t4kc4rm4zeobfbor13ugqxhx12ybx6ubtvhec8trswqj9jopux3n1smkcytds42l4rfeavcvgeald76blkrrpni37q6gqb0g2kklgnmu8gpnkbfuzqxz4b7kwsm43ot6klu9rhxm6olgwurp3vg24324f8lmqflcby33cnqs6rlntl0wqaeivvucoh319kuwyenmhpwak95f54qk9v8frpk0w3kdtucnsdqz7k7p9ehfx4ren7hiul9s2l0qivd5wg8qzd3kc3a7xzp3f',
                proxyHost: '5asy2iz2n84qlweuaie5sxn7ry2d1pjoh8hrhkgq679171nmw5tx2r359s1h',
                proxyPort: 1369106454,
                destination: 'bm6ie6uyp5cj7wpjv571msmxxt5wosgq6ryp78rhxg14seebcy2hfctcf1jmrwb31t29ovkg11s3m1vabs0x5ekzwp6nb9ru1jdi4js31rkxpwnfj742bur5bvbk605ivhw9yeyaelkjdxf8qqdvdz6pvkkvctve',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ecft5erhdvowkd2l172pwz3p82qksqmg8bwqp0lcokzz2idexghdd9g5hx1in0qqvvazy4tz8y3g3brlg822fc59o4n34nbxzyoktfo7c849zkgue724dakiwm4wpcvwvhtxbbzinl6lwlkw7uyendq2lmvtew4l',
                responsibleUserAccountName: 'borl7h1v3r1p7pg479wo',
                lastChangeUserAccount: 'pb80p7r21wm49iv98ogh',
                lastChangedAt: '2020-10-16 18:42:04',
                riInterfaceName: 'dvl6vg7jwu7xd8s1qrv8gy09o7hjkoka810h8w7uqi4oalcbl6vr97uzi9r2u1p23pchj4ipwlcdao4tin9civzdbkhidip8es9k1aqopa7l5osid4ype6inckyyntxbualwip3z3h6j8l5sps4xw8uwuwtjzc2i',
                riInterfaceNamespace: 'g05wsye60fujrly8w9b33vlnfm8qypky3h9l12hn4v22sfll5sgej6q0t722n06zlkfhqnjs4eiofqxqzym1dqpixo1o708zhvqs305uwqgy22grbtcm7pgeo4z4fbxd8hz3ym3kqghcvjgv56qxqwf1goz2som7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'zk1upt4eva0dvqp595o4ctwx80417q4lhis6b4as',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: null,
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'u1c8mt5g8edyq93dxiji',
                party: '6s9wal8lvm0qwggtsp6f34paakd8v0g0us5cudq9tt9jesvy23ml9v2k695r0vf0bv1efv8q4dxpq02wdkt4uiawwnis2qptm05dmi78wpnctpsxb6ka2gm1mc3zyagpcqfo0pzha2a93reu6qpkka8mwmc5p5u3',
                component: 'at3yeucpyof9g7b4zwrmzmeynm955cdq7bjmnae1l54p97ybkbtg961fkkua83la9fjrqhz42sgmf9rphn0c13e72lnzq7p5p3yersp7jbz9whts9xr46t3sxv3cajjbqsvbdryizr2i6d91mwzxhv44nvk5k2u8',
                name: 'y3nab8zlo4j4wp3dfpfkir3da41huwdfuez64n64cntvhzm13e8xfhgbahcs4piwq0fqukbux6mr4mb02rx0mxb35zhwn4ufza6a6uk9gifq2ze6u82wbxgamy4mqzktfv2j2y6fsygj3ab9oxcob4bb1ynrmlfp',
                flowHash: 'b1k5gjupdk3jbk5x7ttzndp4n35xrm4qpelpf5u8',
                flowParty: 'aek6cx9moc988rmc11wrxfu0hpgo58q0rkds4gnt0444r56rul1qha8x6twokraauus8ar3lv2s2oblwpqn3q2fi7pebstnejv6x1ms7cwrh3frq008qqalbsjbuuvnb8vt24b6n8d7kgl411lie1nod1o9dt2pc',
                flowReceiverParty: 'skq7r2q8uo37bd0l792d9vnokhvxav5jrplj09cyhuxoprtmbfrgrarlag1h5lhvziu2an3vpevfmvi5eqq9luapvfi3xr5286y2cb9fp532geh91bzwqxcus3chiqeyyfejnan4c58fjbjklbhka0loqeoe82dj',
                flowComponent: 'bmjivxnh3on8its63p9v88fu1bgw8jwes9wf2mqmy7w3vg7v4zjx62yd4qbwwmn126y45i780i7iil2b7uqjy2gc7q8mo611sjt8t2t8jd9nfsxtwxzghppo0s1a7wcs6tnd16erexmmkkbdlkdbri3x6r7137qp',
                flowReceiverComponent: 'ml7i8gl0c21c42jxwi98x2g940brh2xv9gxs848avd5avyd1bv7gpqhyxpyyx1nw3ztjxzqh9686wi3krxeweq3uidls9gp4ph6qbgnsh7a1pm0vs9z7dp9itnm7blclxxefxjsrn3nx9k16ejlqiwvfeatjuqv2',
                flowInterfaceName: '9lczoemakiu5cyvun01v28eh7ylg1ddlqber82y7161ye751m4bf9mx7le5fkah0601kziwp4llf3nm2oiouk3loszz7hzvyhh2xinpu5e1h7sbd15mjaogh0s6n26f24j5lvu4uexol9mdbcoipamxkcrz3vn55',
                flowInterfaceNamespace: 's4vt47cohykprigyx5e27zscvmjdeiks33rwlm08anu16gy4v4en2vy9oqk2tbb2n334iyswnrhyl0c44xih8vzqcrq886h2binjo5n2yzxq2x64ok245f0mislsu7p8n7z297xdjgeezq4w43fu3tfoy8junyk8',
                version: 'xqydgv9x2m9yak7eho08',
                adapterType: '21q7pdnpjsanzv9tyii6bqicjtdr57yik7bxgt03qvrs1qo7l2fghg7ewa8z',
                direction: 'SENDER',
                transportProtocol: '3b46tr4e0ntliu56iftp3bzu01jc5baw0r2uparr6ltg4h11cz1q4qxy1li0',
                messageProtocol: 'ahihkq77svjqxerp4ghh9vay3xbt28jmo1gn7gqkzqdgdkt0b8w36rha9fwg',
                adapterEngineName: 'msz35vbrn96zeqmb301uuqfyj0zxvj8wj3cjlao2ng2p0nhrjpmks94i6aa1tkk2znlhyrntg730o7ggrdbn36vmz9hw5eo8x13f4r273cban5gjc893cmqztq0trrmoz7uwr6ekkpilj0ir0jp6sc4uijir4cm7',
                url: '9wd86kte5922maujuggotn2kpuf8x1wr0q85270e5pieu1qpf9s7q0y946cjgvlnk8jfnoi25qimvxjup7228mk6jyfruq5qrk127feslyb2q9pn4ifiooqngf0abcv0r2rzy6dpmdlpnw383kecdpewih072c8oc3r5gf5z9jf8vtdzypcodptvt69pn3dds10y0xirgyu92yr795p4tzww5whsbj7pbbsoo8bcggo58z0b2jdd9770a1c9jnfq3iivyna4heapwkh4urdol4acpcrwjlppha3pt3l37e7r8ik66bsg6hmtp8kh6mpz',
                username: 't7lsmu5xxisieps2ogu7an4q302nhqw2be7vp55coo7j0pho5h3uvdtz006d',
                remoteHost: '0g5wijh7nhtnpw2zwuapdgql3d55grkultty4omexq610cf4hz15md1k1ums454rfrcgih6fk41kv428h06vn93mqw7qdtryofs79nd7l6sxh9uw5pz8qwob0dcq3o4pa40j9kqdzvj1ux6hmda16c436hcjrgna',
                remotePort: 3239487892,
                directory: 'u4hp1arylaspp9a7tqvz98nqx7zvd1cm3vj2pl6em6mh91fh5yy06jo6oyohe2dtajdx8brxdslqkx3fv97ykd0qj9fsrffb13ok4yo2mbqzdalma0slv5fufc4ww3mddk6jewbnm6qsa712p27dglpui7njvkwu9s4t06f1qyunnvn6opy7nj8kxvsudd5ifxsut1yp8xy261wueez4qhboz84docf0ggsp33do0wv9g78wesqu0ndhf4qt2s1zk3wuopeyt70mled6hrnwjieaak9q83mcms7ozpw16xv36x4l0xx8w2ksva2epf8imbpsxc9rq83x7a5kfrmi2475ka2qs8nfi46qt6kw2hrx7zu1k49ou22ms4w1dhs0b3ncrqb5dhehcueofgvwt0ppbh8sgin3hi7ubokka9kvb0jtuh7sv9tx8es4lnayl5hxw40ejs7o3qw7l0ycdrjshf4uk1i5fpwcz6erjghgio463xgzlbx1zrg0fhw7ygot8xnkeks9zmxca5pc3qt2sf7c3nkl78d0omczayt55nz4z3tx4k0kuuopdh8lu0bjtlui0f9haqaheypkqm6cnwqmigtf1ty5cruym0gv4dj7johqh8mcu97bhq7wc3h0p15y0oc5jzmutj9997piqpimrbkygxan7x24c37pmxj09c1ylqo1bfjkc62q2ipnbf0tlgcbmd0hfli6tmr0wbjl8vfl70bvju9etzc6q7q7sdixuqrfx9v8qriu9knxzqp541ykapxj9p7xatjdh26o1uqcxrnlmxq21vwt9yztb776f153f1amxjn9w8eb6zlade4lwigiofus731g2c9noat7i1fq2x14vgtya4nz0a2q02z4lt7ciysb73yx0t9tr15gt5iv1uo0r9mfjq3jjxwd2w7sicd4918mqj5esa9s8vywzu456mwfmgz5m3chizse0pncxcgl9ziyyvsnvinbk5jk7jdfngk7bpk665ohhac4zz2h1wpl',
                fileSchema: 'vjb4a4d55y7vhs73g8tk96merl4qrfyqv7t6mqypsvud4nun1ty10uv0um1n1g8wspdgsq8r383f9k7x4qhaii81g3nbyq8ckkv9ul13ye2a1gdjdqiovrss203kfrxxrbhd3ahvw9n2ca835hejzgd0tvmojrmdhxpb2dor97kshoffsp4ntf38xhhxjqyrdhv6zceya0yyzq29qq48smpx9p76d8i4w3628sg3q6ewk6wz8kp6t03hwq1eyf9m0zjspxd8l2wq2iazl32h1y2odt6y114ad0brvg0amuskkpn1usnnarmrc07yuijzrizeufwjklgopjfbfqc3qggq60y888b8a65tbpofe12v3h9a2iv5d4gd5yemqhkp2yygpkei3la5ligx53itv2zonfbtjh9im8rmvomwkl3ah6oh42czhhdaiunlm6czb28uz2197kffdn90k9kn3dikkdfhd7p5ciffvfxlaadxtstruhzjegd7ldvxjqe44xx1luciec7rojbs7p193yeufzogtv55q8ogaag7dvuaejn0reo9q7c5fwfh9sk55ufhwhzc9x0uoz7urqt8vwgowhqv1kb3gzmxsgsqor9gy5zc55cnyors350g6m1ha8joujz24rb2kw2xmz7ortz3j45d2qgg87g85jzse5wbhv6z9sz2sc5qjrd5rp7ctoqnyb9jkcykjr5bqgpdsgtug4c5tpw53gmj3xr02uu3eys7ok1o9o38wfvnhhf9soeip6drxpdootchg1y983ovnioc5egk2zyng78w2rihdzicjv9d84g8wivh2tthjh0fdnwywsm2zv2r1pc6ly2h7p5tonf17qjfzo8d27mkj5dw2r1zu2uu1oc03dj60cbkougdonqmiqkt5wxk2jmbgtmtxvsgs94am7duuev1rg81uc7s1atpr3esknthhdn37ij733iq3iq2vdpax5m0pynkit9vswkmf9t7ykuz2l68u0kjy129qp59dbgf',
                proxyHost: 'd603s99qztwb84bjqkd2h0vy0f695g91fz5q9u33k59ck46kesb73uzritgu',
                proxyPort: 6980991167,
                destination: '1v2c78as6zfzxcu84w0ez3o0i91zogas0ppi5q5tgvr3sfsarhgac1y3qspaxxmjuxayv5cx9gdm7aryu64xltvjrn5m8w016ahx2hyii4z14wdht5i3pwkugewpa9w4y5ax9869m9z09svw64he7g541qa6h71f',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'g6wzak2otwnta7cvtafrib8313j9mu0vd1ahvgbjui9j2jtacy14kjd8fon9eanri07ero1wplizm29wacwlm9x1eafuxraj7yruheuv3hj6btpl5fm8ooafswkhq3r1ej0rvvxxsyxx1mcck4ocbzaj2oupkup2',
                responsibleUserAccountName: '2rou7x4gpn7qknva7g3o',
                lastChangeUserAccount: 'dvg0qh7g2fnbjozqhuvh',
                lastChangedAt: '2020-10-16 11:16:08',
                riInterfaceName: 'zulyn2wuz9fmc22idnjtvkoon0sa8ee8zwxkibuhg6sgbu3mivjn6ei132pyirvss84jm6ts9wzc5bszn48gzhy6nvbfdwf0i1xmyp08fie354tlcueiek5v67cdoaoxyswxkwk7gy2632xp3reakqd6jskn7vcy',
                riInterfaceNamespace: 'tpzzzte9mw0w45di54w061mcv7e0knn2s4fxec95vg3gt4whg3gndiw3uhl9mc65s4z6ujhqen3rvnlfw3n3y79etimmbsodp6t641sfrmhrus0oknbactxse13gtij5bj7jf92sliwojqoxtcoykmmg2bzc4a2n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '5pkd5z9qczy593t62406cyqmoyypzh3hft672i38',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '9semstj4wm9z3wij9evd',
                party: 'qhdol4ua1a0hy6psdehi6vj82105vkha8nbyknns7lvq9y0x6i6bplq2zqwwkbdmk9u3wjpye05itza7inl93k2xo6ows6mjw6gdt29b6xaac1cift5brx7oijc8hqe1d2areyxbegz08glt9nrjlyoy6uzbj6h7',
                component: '6d5huujpps86vbdfj4mrpos9x8cflj9rlzs2g8sj45nak13tbaiqdvmuvn4n7sh6plh8r5162ft3s5an7uegil93pn6t8wss7q37eblsyarczu0gst9are12i6ewoue4do86yiwhow22i1pk1f6gtwfbzdtpccid',
                name: '9sw0bajz6n8k87fo8idheiuf3jtd5xl72ns7ny280n0aafgulc3057a4ondfd5rgbedjmsz3go3jab9erpqiha9mihbwkbp6m8fqr4zg32r9vxtxbidm9jo9726qy8fbjoek9qs2r64pe39kh0h1wzixap76k62e',
                flowHash: 'm00l9nqnbxcn3j72ndtxknff1ttt5y5m26uh0wb2',
                flowParty: '1j98rxoli79xwzcosznakyw8k0e0g49okfxqlhztybsf9zgcf5nhso4dfz9vtftl1htcx743qczarsorfhxxl5ymfz35njw0mwr8u4cmtewwh4l8yot73dx9agp22h346z2wyjvdbhjgf05xoabvsx5kodh234jt',
                flowReceiverParty: 'xbendjn672llyf0nl25q1wd367ivka5thujhs57ofhsygi9qcfooj4tk12ae5dn0feis3aloz544wonvs6854u9wsrn0qklfrzifhh0y457njz5fnwxhp21u5jb0gm7vuljaiuc42ip4qjqq6kq6q36j4ka9ylu4',
                flowComponent: '4dypwdd2zuldq4fqhetps02u178jjk0wvpwcsnytipzhdevs1k23yr35uvjvemn6p6p2qfk3ib5cxhj6d3mlavszbetpbzntk2wvu3zanmt4qrp3ql1yljfppqmbw9yfjezpkfcu4f4x06wty91fgulsr57a6o6m',
                flowReceiverComponent: 'o9cxu1d2tuaujm6hq9hpy5r1q81ba3nd7mv2xz3vcf6epk15xconf0owimbm0rcll7bj9p2w5iyijjia5871tox0nbz2i14vkh81s5d47na1qz2xa0bu7go6iw5sq1s8ahwelpk1qsxdxlp0rm15cmssb5r6vyea',
                flowInterfaceName: 'y0vfux5rpt8ogqbzcigzlrtk6o5m67bvzqphj4ko0mveej1np12ogiu5oz6e3t18tzzr67ttj5bl1lcty99yrx5hc0rz991npvkgfphlafnso0lp6jjpss4es0zcbnnvdm1jcrtcxzan518w7xv2e2holje8fsl8',
                flowInterfaceNamespace: 'pvtxw09p4v9xr7y93z2ymsym9tuhv3zlspegkietjmogxrngtirj0ujkyuhjjclhu0vihqu2qtp75be1vcms3z4f5bx9ootav21ihozxpjsahqcn091fjmmqu34p0gi7kp4mn59kuch4tubltibqig12250p9fpr',
                version: 'kgi92wrncjij75cqr4fe',
                adapterType: '02ya3q9wr7efytcp2phg0xw13xxgtrcpdi6ognkvxr136ij7x42nq7vb0u21',
                direction: 'SENDER',
                transportProtocol: 'c796pg2xzpzcbzfgmrr6d8hf898ihyoflvapcm6xnzuxdj3u2lv801lke1kg',
                messageProtocol: '8pkqg8qe4lxdkx2fu3cbbehltipomy3v4db7l0upyd7zykhqamfieemjhlb8',
                adapterEngineName: '102e24ro81j3rhd0vxl871zvuarimurjldkjrt22zd8am3jilhs3mkdee4nh3vbrq4c70sdj4anlob3l8yo86fs58evwdm5idpvurv4bbr6fkotnjieaxd6hvvht7p1h1m5i8ut0l8ucxf07lx4loq43xeai2t98',
                url: 'kd1nwtlf4hzwgw374n4isfshie4hnw69zc0anl3nh9qddco4p16cixh2x6fjg3e1fcr4olsgvc2ektzf9vqswu8s3dh7pj8bx8mk1e7d8wufics1n7g4byz5vt828l65r6ysgy0ikyw9uylyctt3l2vm49ld5ncsnnhaad7bu129blvash649p65d9dfqa18ti2tekkab4qj93ygtq69nhcx64nu4wg4x6qd1vlmz0jbsoms8urm1zigm0mwpnk1x3opk24qtymypbsrsr1cmvq0o3xj0pujb8o1707mjog695wq8ik9yhy1rz0fecx6',
                username: 'abexusd5b3rqodgdjsfesi6kodni6es6cs8saqta1c5pzmjes6osycsc2ewv',
                remoteHost: 'f5nmmwkgxflv8owaympain1q305e909jzsn4wwwhsgna06ltgmavyzo0k93pi63982cx5jpvjorpxviykultxlci5pzmyhaqe7s9trbmln0f1e4hqmjywreo9iv0xnsc3tbcvo0um7im3e1b36yad1dxlcx2wr8v',
                remotePort: 3928911420,
                directory: 'efy7tqyp3frrkpq1em8n6w47f5iw2pcytpw0s2670i7plcfw6hsnr97qvpt2tmvyvi1d53wi4u0pa28wj8g3ci5iuf5c5bquclrv6i8zhgdfpctsq6dfuraoj1dn3x7pmp3sz44kvlwef3x20uf3mlfijqvo8r73x3nrv3vvm8vqmn6dgujp0hpo08n5g3avktziswsxj7qhtuye2jusxafznwnc19kzd5pnvydhl1wzdlkkdi2lozc1ojii092j170yz91pybciiq96znboswuinw0o83o8r3foxhm7xz7fxkn796qh1qcev2akmb06pixyb9bn8uujenypujs67lxyosxplf9ndozq01y4u2z5jmxrmvunwuvnbajcjf1lyipmkx8w4m5cd7w3d1xzty1kwc1anesnfx946m9vdrzyb3pl46dekiwo407t6ufxee4af83s2ko7gqe9u2f3t39pkj2yycgdvk8ajaz442rv8vz5xiglk7c9jeewnj06j9m02a1cx0rvy6ef21s58wk2k9chrbx52zlv1irm5b5ff0lnkrbs1qkntx0gn513b81qsug46a1v3ux9d2q661ocmhs58jon68i8149fzgeawxib4ufprposqb0b4kbgc4kkvan16ufx06xkbtywyncl4q3fcy763mcdza1v8kz7gvhc8wuhdptlfrxsipdyydd76i0kinw4q58rz8b45w24rts4n2wdp6ep5r57mu9e5n4rhrhmgnqqn2zndevwy2rw7zhdb5lo041zvo6t1y3gn6fq102jbi7k07lo4kbw6koeutqzzk676de8eulxv5xurmz9o8iluri5wulh3zjitfcwkrkkc1jc3yyto7qf1wf3rqcbouiqncm57x9whpt35havxtvuclhgppi4z24zjasusd7g9krhygsiu4o9m5e3tfspn6wbxi8cb4eeznpsvzqa0wbl9qk9iw9nk4g1vm7xfv7hjs5l3nzol72fmmm3fqti2fy58xckh7mc',
                fileSchema: 'x1zqrcy91tfvfrpsap3dv89yi2ozxzn4nk7neaqpyq7bqxlutn7ft3ytkuuxw6w59x9l0po0aoea5ya0ue93s5d0wn5q5lyvfzhdtaiknfwoyjw7gqy6le3oko5ykvdwybbvuepqals0y5q7quc3jny8e2lskh9tmk5709v0ij5l6cx7bnsejxtkm70qigoeaomohfz8zhpqorgbxp6mikfhsyz2j62zk0pt0t3lku88ab3087xr15u9q8w0e7lppu65gvrz821b39e3zp38h1qp86w3329ix8punpu390epentkmdovctmjrcdhz5105lkekr6dwn67rc6j9uhzhf3vbsik9vter6irdsim7vs9csizdpc0k6fw74wvsm1g336vzave42c1jyyd6n7c0hn97v2ldcn2pn3bk0oop2ql248ue79yci8cf1kk9ykjjaj43gd910qyqb0gyv9tr9cl8gmhm8k11wtrlf35t59gmpcroto2swcbii2710hcra3qi6ngbtxxkhfhv5ldqxn5p1qqs1wu2jyo4a9zqdavutadfyeg0ujqnowegiu4fprv7tf67y9r7ubcp27jjheuiga7zzc3oxewtcp18m25huarsufktvy76cwqx39el4wg1ytpnr3eh3dqnupywj47gre9li72k6oycjeo8tfjw09sjrh2nolghf4me1qua9ahordvbc5r98tovmewdtg861eh5asfqj7i2hc2qjgbu2ndgi4tbyzhwjmmhge96566anyne3jqbj03kub1arxdc20xkl7c9xmprjg0cmio2g4b8dz92g996e5ydw0decd2fd5o8y6gya9ipgoxwi3fi15jyekymopct7wcyp2hue7p8eb98jl6je2bhis9rgp9uwncwcbn6cyrr9mgxrht3roeaab3zrtytvwb9lovl95zitbz68nx368ivik196yq41kz1sgtyg76dzm8p9bhddvbnp4k7gxjrkkrhguls82ps4lwzjj1dawm1h2a',
                proxyHost: '7wxgn7d3e725e6domjvqfmiiy66e8ppxf13b0njrt75idhn3qaj6bdm5leo3',
                proxyPort: 2070720745,
                destination: 'zpfvyurhohotuloodctjrengfp67shdvbtwbpms9srqtoqezcayeva55hk3qdwf50bw88bw9ghtwd3aaj8091k0euo2jihdmzy2n3gzw0pr8v4d696let0jgcq5iqqkwt0v2yhgcamr8fq9o0ial5omqx9a0esqa',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qc7l8decktsw4rk85jocfv0lqzjg7rv7rdio7ll4qek2oouhrlkpftzm3xmg6l2d3yfz9eje6cpp63rav4yrsff6hfx42wej2x0pu2qdav5wjkjirdbhtuf1bli0xw7bclgf21iymb3gjpiar7nbkzcx4t4tfjxk',
                responsibleUserAccountName: '8ewzlnh44g3809unu7dw',
                lastChangeUserAccount: '2x3a1pebe5c9lc0scvm4',
                lastChangedAt: '2020-10-16 17:49:50',
                riInterfaceName: 'a4f6rs1ue448w6ako6g03affiz4fx0t1gyhq9lihnr1zdqqik20554dr78bmpoctoanov7k7js9r5gzzdmlcc1hmuglmq3oi9okvsrbm6u49a5ts4zrqis3rc8qgce4asdqamkcbmse4ll87ou4v6kswnmgqg88a',
                riInterfaceNamespace: 'm1fb095z9rzprv179bq6dm7shkm5pskjy9sm4z3x1865omqyq3cfg1xxulkbrw2worljekkhtdb0lrndtj2393egw9o4rwdx30gt37q33diy7xixrjsh9x9xrneevhu832vohpbonk9tu3s6gm65dgb088bly0kg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'i6u4maq3uc5n0hhrlfjutb38el4ee46ty1ryux4b',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'ua9vmwshxx68el6vd1optzx5sim1q6wnwpgavk5ym9utkr0j00',
                systemId: null,
                systemName: 'jw1y12kpr9hs22plecnx',
                party: 'beau2dyjd02gxhmxvafpkhfijw40x1y1inmik0g2jpc2fhbnccmnpn0c4kpnlih9iy74u8bi7z7gylkabd2hzzd3dbnscmivez980tj93aawrhtjg5v7u8ij3avtucw0zu5uc22avhffcll4s8wznta99k6vnsyv',
                component: 'jr8ah9462eyetdklpe9oskjz7eot1lfv9rhfte7lcuqkm5fiu0x2x6xm964ky61emkexwl9z0xuw8dvvd4ocxhud0ts0ipxwte4plqocygiko8lwp90vsmz9alncrqiicw89stem4jogzioadyn9zmhehuec3pgo',
                name: 'xu8ec9dldk9bkdlmvdpybadrmb7bmo2hs2a4etgew87o1pjii3gcf4gnh521o9po8cv5f5iqlxca2hrwo7rp23rbiu2qr00prhyi0kub2jwgtrgvdjhx5l04hfrvksp9z4oeg8xjab9tbdtiod30hik5uxymyci5',
                flowHash: 'flyc75an0v0em65wqio09c1r84acygpgpjp8kd8o',
                flowParty: 'r1n6l1g8ohjhl9wgmld787vc74gr77tni8i8581sh3m0mv8xm41ly5z129mvtiedttro4v40wejypkw9uh6jpcdrh20w18u7fykzu4uui9d6j6ev4a93rtjxfj8hujmx6fzzzflhz8i6yk1rhf5o3uz3xatx1t7e',
                flowReceiverParty: 'ypaqopmxh5v4j4h6ayjartc6ccbp46ejsm5l4ipcba5l7gf1we5z4xh9wcyxgzz95px0bxsxxg1vjja0s0vgymixg254oyi22823zcgvnthxf76esnzi3ubfolmfcha2ne7hagwovppnome9tddy6l2cmbi039iv',
                flowComponent: '9uursytlob2orln5ra15tvv30b10cb63k7faq8280zjxczbldy6le0u2w7d51f5f9l3yle4yhnzyg94zb8bamg5o7yr00aqm73kbwcgytvvwnl346or2c4nzhiqv80cp6r9zufcrs6njpx1xmpfc5j6jzfgbm4gy',
                flowReceiverComponent: 'jowlm6dxdgf3kp6i5p87l1kn8t4jii7uusrqv2jht6vj0zpwjyxd2axc0sc90cl96ydcrblwkd4nnyovfv598e4k8nv1zc4nel4ddhzmncazc559nsz2a31a6lgvssk61ym7qtyadhoisfuese5xxk0km71m3ist',
                flowInterfaceName: 'ixg0cehzi2v0yrwie9xon4kweex830j9klkqibq0buuy5uqf9e935w9qurzhigld3anngjusvrv54277t8q5z7cebbvjr648iw0u0htmwq1257f130d9v9j987cg7nzgzzgt5kyq798r9v49y60tqsf7ti6hu5af',
                flowInterfaceNamespace: '94oegogjgvursqjemq42vxtkzhfar6dkyezr4gm40fgwibd0hbuy7kj9r7cf8zasc1dvkjq2vgqqn4s05dnkrz2jrtlxu9vg9cb7f0mdam5txjf70qj34yh7esf3wmis8sbnberq9xz7s7224hn0age98s0tv92w',
                version: '8o6ihvbclp00hysvufe2',
                adapterType: '5xmid4dlzfavxinusn93v6nchuts925ii8k7f2f8rqs92fbq8rgmm22yln8j',
                direction: 'SENDER',
                transportProtocol: 'ais82vu65dmgmsgquw4z43sycy1ia81elk21ocda3e8mzuc7bg7vp4cr4ywk',
                messageProtocol: 'qwl5qa8m6lve49n62qohjnsug81q6tddx5i1ki5vn1eg5j2fn5ec909a0e9x',
                adapterEngineName: '2q16nqa4tjmxjvvnnve7ev99j9f8v0w4hy6nhdwfdk509t5qtgs02aksfb5vxd9ikwqsl008huqart2exbbzyon9gyn0vjyo17y73d4hzdo9acksp6gjkhsipj7da8kp6zv4btkljuiwd5b7679hdh0falgxlx1i',
                url: 'hybgybiew7gds5p9mncpnvzqhydvmu91p2pqfcmwiu8knzel6s8skjqv8rjkjagl5acdjx4oj1ay7zj7ue6giyt8hbp2slz0utnrar5gg0i5vxkd2z8hg1a5q1n600twgkovmafi903lr9rkpumc8wmh4bl4cexe2gugp8zrn3a5yyrp2va35oe3bu9vjppco0jr4eqahgy61a24mryipj4wnn9tahzb635k7zp5gfbibj4ci9mgb1awnrk7n75qn1fbkpx4rw8w1mmyj8wzq73zdcjsj9iygvkapmwrsqvjmh8xsghwunaupjg5828x',
                username: 'xmpwnydlb18gxt8se10owgjqgwh0grft6n4h4967ifg476499sqrsed01uxg',
                remoteHost: '8ydhy51qd2b6iypjnt88x1tlb4sxnsrtn8sxxbut2a9sgf6om43fmhi9l4652ofru9zaiutqrtihnasky61znz9ag6qk4k0l12a8jkna33swwzcexrmuqx7kfk1hff27qa4qdmrlyxntl84cjjjhtnr3osf5bu40',
                remotePort: 5115452783,
                directory: 'cfkz9el78nqxthnzlx352ufhb8962h4heeqrvypgbidmdaidqfg975s2mvrhay6bjfhy2p8t5ug7l5bal3rwjo947rxq655g37q2mxetc46jvhac7brgoj1s23hbkr97y9gnjpm21koedyf46tbnmwk7viuowaw8bhmde5yshn64iu7mi05a17cb32u9ed1abisoyjim1qkojasfrjewzfhrdc5gl16bowa6rrf2nlhl946a1dljpe1415ftqcq2yl5zrvcopirb0vaqmtg6i5hfckaae7u8de2tkke9rj62fg9394xg21wf6u0m58qjky1dd7xfuafea64en5dray61h7hfssbisn4wbq6p07yhonhn6i3szxd8d7xrwrrpenaek2bqm02wrpoo3k0g4muk1h9upoiatpl0k65zbnagni5uexi32k19l0wl1526od2smumgycg63lkv1fs2b9gyalpfkyaxlpl61obyiwolbneolmldmhyh88wcfj0q2p9ywhh0jils81c4dfn0pkhnvulu52r3o8lbqy7q7quwxkcgnzn9nadyhz4zkez9n62f1kz45xuygcpc0hmftwhs9ydwf4r9b1dethunjrk3t8o8zc7dhfp2kt1mwkeff4t7ui5aid7z7zkeyxl7pl3iyzoba257707lt7cmeyj7ehrvh3orjtwiny2r0d79v40kh19gb2906kuy8nefbdmmqkxx8w5wcl7cn651tq1ptd2shibj708p9tmb4x6x5qeceo7qj2ipsoblx1ukvw9eqc80zebhflgwset4y2t9yyn51r3zxnkn6nhfklyndc4te8wc0zslj4ql6gqdvx2x0qekxhhdffq61b0uu9i6sh0jgabhn5csys4was6hhm4i86o8pjr9u2mtobj04qv9xffjvys3w09xdfm22z6honwjshuhus9xzvmf8pmqlczzlnq2p3i3wmxeufx5jb67np1u5rkwxuq6nuojyoa4khk5tiaixmypv85ptpvr',
                fileSchema: '0nmt6e1g5nqur4osl8tz1wp6oq1gchvrmfofy7vz7v1yj1enoctxdkvp4vd21phj4gtpzevkv2dcbssx2zzz6stzla8c93yy5tpb8wa4o6deisf847z2jk5dkjgqajxl7tvnkd131o4h1b6k7262v5ai4cr01cz236r7l626abjmxkrn6vxzzlw7ethbea3w7aell177woc2u1hn1iny9sg1ltfchvfvdq6k4i1igkfjtw9v0xwq66dwnkmmsw6pbj0sagiqlxe19ds3l4wu97fyjed1k6od9px11w5sdhq0j3hpbkkgz7tvwvug1zym98n3y9dx6sl0iczrhyviql0xssdt91lax5wunbe63dqy2tzzvb52613r4gp41ycj34w3z722pbupat6bwkmf3rfcu4bd5zmz2dom84d3jis00kx9edkvdkzc1poloifzxxttnvci7top0chm1ozfji3eusr454ttdpx44j9wcf2xu24qqrsqhwevvalh2aguuaiuxay876psmermo6vz1ql0q8h6zbeo007z9oa3fdwbokdtgmhcz30k8oclbdp3diaqst1siu97vvq3e00sr1rfq2sz65k0hz1v0yi88ulwoj3gh3e9a6g179abpdy2lh8ejvowjim4dsskruz1eu49cl7528byohusfupyjafejh6m9zeyd5ky6bo7ad6t23bclx3y53i6vq2iqzv7v5u30yolz5c8qzfjwm5e2g919i90x5ukxd5q0a0oor9ybv5ny8g9gzmghm9pxe10vkb5rdkzptx5qtk3nf2qmyn0wlk6hdzfupll8010wt51jlylvpkos2jvsi9wim8rf2hnhgb67h8stet4ben38bce1cl88ocwo1pbt1dh4h7gd3cej0cj3alysjvgtqyfxtbtbgr1xju0x3y6e4qp4gsd5qo4ogbxuhfp827jeq0bq35byywrsjihinxis30lhw289b1cmrugqqcqms9n6tc8qjl5c0hv8oa26y0bb8iq',
                proxyHost: 'rrw8ozrlkyn4u907gu26g979fb58ocd3mao2014tkhf8dop9c7nah77t11mw',
                proxyPort: 9821163761,
                destination: 'guabbtrsd1jetamigk79ryf80bmnnx25knx0utzipmem8507jx4ddi2g5ufi3g14nob9kqyshdy1m9gi9t40vux4tfkc01bjs800u8plrh1e8nwb6c8j9xiujbhm4rb7c5ix0cmcbjafqh9y8vw8k2yymtlzq4a5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'g1cj57fekzfry5foi5vn7hxyn87a59udagtp0pp4orfi5xwxbucdmbz4hqgyz8hhjszcofedwvseqw7piuh8kavhykdg2wtvami1fof876u2qgai525dkv8bf2dji3ggdz668sbo3id80ap5zl5tiq0b1c6fukgp',
                responsibleUserAccountName: '0qejk1pxm9mvdis6m7b3',
                lastChangeUserAccount: '6t4mrq0i71bwa6yl6hoq',
                lastChangedAt: '2020-10-16 07:23:55',
                riInterfaceName: '9r5wc0iuxcefh7hdzbbvnohimmz2dsb2vmwb4o2846fug64lf708jb2d4i1iz4zgu6oejnu7dhm2dumi6bud05fzf7lqnns1g054p00u97q4vvyjmtngqndxt9llt4otjpy5ev7x0ufax9vjsy4fz7ot5z8iz4t2',
                riInterfaceNamespace: 'f32ssrd787ddf28ogpa6fobrl004kbztum5lxha1ay37k84uc4g5ch1wdhwgwwehryz1l1ed9lesly08vsxuq7ee8vk2akhjw1uxu0y8lf4qgl2wbdigik3nqf61we0na3a5h7ywhpbsta0t5v7qn03lisalmqql',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '7t8ctp87zn7mhcy0qypp1qweio7znbc4cbcvgibu',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'oxhon09y6vgldht9nlcrtrc4059zya6gxpnyzty61y9vixr3gc',
                
                systemName: '9h56ktva82b96xketohw',
                party: 'k12ipyg3bjen6f1kf0f4uvni49hs3k1v59pqfgd2hfond50b4kjn8gowz0v8viyw4l7n2818xn0j0t4io6s3r4gjmxwzv4ziid1y2f9dnryp443cnjy3ytbmh5rvvbj6codkpryv0vls4xx7wsd4nj333104aqfl',
                component: 'vy7xoc789ejh1lswepe1lbcgjw5kh6zv9lir24lq583qm3p4ifhfx8pcjx5hqplmzb646qhxd4kc7jic48fh2q3tyfyiyd8wwpqreipab94k2igybm11qbrcv8ax3qth2cnq2wufipfjvv5uwnakpo50g1y70ixs',
                name: 'y8uc6fgnp9tn0x3wmrt3iwh5u0ifgh81ovsm70pyo3g4ssjrilx9atuj5vgu6hl8on6uqnfn50lahh66nte9uhsfij0whiqxey1hy0yzl20trn2ezi5o9q5kj0oxcil9h7gyp53h1y7tlrmkcwa5fcbybslhw0sa',
                flowHash: 'avzg6h5t4sv2ub3kxszg2b13sk77a48uqg32tisy',
                flowParty: 'fu8dijjjko7nwv03l15apj6xfcabbifbu2roip6390qfmux0cuxepwm6z9rprpd28yepwdr7co3a3n2uyqhuqjh6qa2l2c3y78wgnhtm8j3ur4gvekicqp1ott0bfqrbfl4hmeiu1cem73a2vyo8pg7qzxerp618',
                flowReceiverParty: 'i224dkx8svv8m4wztowz149o8k7vm2ipnkrscm3bkofcpocerl0mlwryrsqqvu5cmk7gk0l2znn2vsjuthx8x57u69epmtd948wd3zdwo5xiqrt7n9unrxe9r0g9em2dds6oz78r5tgg1atpr1hungmhs8sp821t',
                flowComponent: 'ru9rt8ub62mvs53ck3pzyb0zyqdjr1grceepfq8qvjnjcl8z2kg2tgt9fjfa8jdgtynuc90ehkd80ms1mw0phqwlq7f7duk5ih7kb6xjlvs7pg4ogbpgla3ua2q9ptjmcaenpskb087yok3nq13w2ypk89tgr9yx',
                flowReceiverComponent: 'ar1rgp3dl0pujb3gulnnnao9nczgkc9wuddyvb1q46lycgi6e71yz0nisugt4kdjaeub826x00ciwmq2kl14avia1l5zf4qzj754u6fkdkifx8ptpeq1lv6ess6xb7izdpktly0gsiwg4eer6te313wfdv5vjaj2',
                flowInterfaceName: '7j5thvfpc46vvk3y4gpvceadwjf2lup9cdafprbmfwai8ghbzik232ekllmzrjfi1hal6hwpayqg53mflwc0zu6accota33bkdvxbk08o7end5ze4m31jt2bljzy4be34dpx1qecsfzaw7oaaf849lspujqm09fn',
                flowInterfaceNamespace: 'yy2z0b5xy5pn0jaob8ia0utoi787s5fm8eg0xwhujxo14sat0wlvgqi03zb4d5ln3z6cudzofr23oq1hy5au36irkyfbi3gy2qs59xiab1pnac6m5f8aegav2iyft2ohx23jevc6gqv83lllzg0f1iw9thhlce3h',
                version: '0kq7yzorin0z0qruc5tg',
                adapterType: 'kfxyo5eghpthhmt4yogxfo70n1udw8eec7h7tbvl2jkutza3ekzdj0yb94op',
                direction: 'RECEIVER',
                transportProtocol: 'tad3k4gdl7kjgvnyqmvsd6dego0tw6zqfl0i2fufjgk28t07b1cp9xdnh78f',
                messageProtocol: 'rnyq5diepbywwwrle44j84k2t3t0jjd8eon69vc7ve4ia2iksfhntvtwjbeq',
                adapterEngineName: '5z5xyl9fgn4b3fl0y9bovq71jdujj6qdm95q431odtfsq1etg2kr4y24vq4eyn5ll60g5lxzk2h9fah4aar2kv46ea26xa0bj87b7awrmvozs2d79vbo07xa5mhzt8xzl01eoy4hgc0n71mqf6n5mz1gefa5bgq6',
                url: 'ka61zs2uqhqtj6xnxqoxo3jt3iyyhrig45ry82kkmkyy840rjdemolwx7pv1fng2tmcsp8edlxcmpq5no2m0ctlsmrx2a4iia7b3zd5kc1yjga5sky0eyh7wf6mahmjvqt4j687irrqwc0ncrhf5itlyobadz50fokhnxmuiwhw6pmi8icqr9d2w3cxq47nucwxj0zniut56tf405vk86687cie2u13qfx2ssb2y1sa6jarhvuly86za9rz27ngdraky9aowo71kw24vwjkzrqcow1o9p56yptwypf0b7k16s8glkl4curheyks8eauo',
                username: '7fqbwsolj9orp20hhluevllhhuz99whx1qspwmnwf4irv6sbc47oeck3v0u7',
                remoteHost: '31yq1wkk76gcw4w469bxeib2iferkygsmtboksjrtzbpxfez5i14ax08up01vdbl27gll1wiabeig71mm6aofptlb2xg5c6skl4rxujiygaq7lmx55i4x979ew7n93sdbbaruliubiquv0znoei4rtru1u7su73h',
                remotePort: 4027861455,
                directory: 'qxwecy9axskt5b7frhyd5x45jgg9gdcppz7ab1vx2ezbwizpewzfkcn9pojk7zcfud7uk5v3ip5xig7ar86quynzcruzb88w10911q1eilojhmniiyrdwb24bg5putoifgd5hx2i1ad1tnvhhsrhy6o9saxvh4jr8jnm85gs4ej4s4172aep10q5pngzvxn8ozz4zy7uu5bkco7a2tsenc8uxdkoebd5t4i5mo54btoudpqpt41w84uhjfo8fd5evxkzki460fsxz24y3182s5up7v8vd49zr2z6mco0sykvfz95051aji7q5gr8xjhnt11vp6ftcwd176svj7wrl391sgylv08nw27s4dxl08hqqtjrfbf4ojerlsl95f97sizowitmzdvrhtjab5novpnlk8dezw3dhkix6zrl6d299hcyb1hy67ia2nrict1hsdecxswi6xr62jgrue8kei0t7e7dptej6ac1ecxngi68ro9zgjz6rtba23ywn1mhs84vx336afdyo5hozazzpifs4dbywmevhgiybi7gv3861jj72h93pcflf50fbb0rxtu6zn3o9d15p263i04zy7e8yslwhlggd49nl7fcjtv1nys88cslo8i1fszq4y6ty57n30ntm6mmtrj7ji4all48pvxwcupvccfcgw49n78x4s8lfxi92nbgh4btxjtyjtgedc9fztuqmfbsnbfc2w30os0skkrl3v16cthv9d8ie9jad4iqqfzqel1r4aj20piutohpdcplwcasvbbca5q3pqx674u77plsrvhmi9cbihtsopyftisqzxrzyy7z06vpjg4n0dsr9a75cdtsfa93rweknehhqt4i1dzjepn63gp3lhptbv29yto44207oj0rdyst0ukle21p34rufhckot6sj2enz1icihbrnq1xip33yjhx806j37vr3fhciya52p04xu8pgy4qjx2nmq7g9hgj33i7mrxz3p1df348gvdeug1eut0r4b1x7u3c',
                fileSchema: '15mdxsf5e79m5by52qqxk29enkoas1kmpfkhv35s6k809p0qaanhy8q7hjptob3kgrfw0n0il4yo2rrshxrtkolczn7sa3mm526akcij4wimayfpsgh2xbi81u5u4v1ma7e84zlpxhbj5td2rvjxecw5a4tsqozlal2nhbhvpteitddvwesvz1iuf6cxumdtq46efblrxb8s8hba59opcijl52jdih5t8g52hodoulglda9cvxbizzo8lvn08hfbpibdl2ejdwmvymdzsqxkox86ncyojynkgizso1gzj90e37v4vlq8dy0f3yuppotvo2zn9dj9kxs1u4jq40gruw43b5jo5lxv6nwjxk1gww12pmvrl46biy7cgtd3sqm2x4i1jn8b6eusu6d74xpnh4zwsm1cwn2m1mfb7yvjrs04dsnes8ugi22l55qw2qeezyv252xptp4bijqxr5zomhrabq4a0wkmj4qwyeskmqvj7rsibkw8n4rqnb22y7ca5b22qytjmu6lpydt4lfssi90uudnt6hgywrtxcxyb06joalschfbghpxvq6zierh2mrqw8navc99t1svqxx0xdqqp98nl8txcomno8glllo8j74xti2vlj607jy8sxfvi267ktlqziwlq412pgr84h9ds9u8lhexsmdxbizhfh933pr0haf761wnn9vxa020vgm8lkhta1dszhyh1x8x0tnjofuico92tjd13hn81xysuirom2xg790e5kkus6hjyj5x0ultpuez3dsgzb0k721xe22kxn3skseq68zcnv8zmro9klt4og3g3030mllfmbkj6aem62dc5m00ijqr2650and43h2c82bzlifssnepvf5f7faqxh0rf9p2lva147j5mm2one5tev7k68d6zdjkgtl7k4t2xdugh9flsmboli828dn7z84dr4um1be2yd3v25wh54mj33v7dp62ychm1gqbt8ofm50o3opjp40vtw0fbftvg98t0u5ylzgw',
                proxyHost: 'd0lcmrrphgxear8bssafnshxfsvq0btmfabhc6ar2vg467gm3dm19b13ctza',
                proxyPort: 1594421197,
                destination: 'bufo00sr1swhuo9qbwddmjkkvw4gk7ue9bub0sjqhl4qdyya1c3rlmph007e7d9pq6vwr8n25hh9t6fdi27v679gwmj2r537fm6qvp09v9rk9t9r57cx16c41o1l2nz2qxx6zzxeg606ze9r7cz2l3q4duzrknl2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'dn0qvtqd09x5ilqhoc34wb8rsu0pnllqmxxz39netzthl13cx83yhe0fs69sjgg5a87do52sqwur2qj6c4prcm435nqgqzdf1lw8y93f6sl1hs2z894bzryjdqvcv9n29o8vumy6ixpcoc1ujyeu3buzxrfowbvk',
                responsibleUserAccountName: '9yiadngqzf41nb60vumj',
                lastChangeUserAccount: 'wc20idujuk9vukxz8exe',
                lastChangedAt: '2020-10-16 08:43:44',
                riInterfaceName: 'j81uk043fawgdm2rt2bb44r5zyxuldirygtjrc9vtpbxmy6grs6ur1dxrw1qkfjyi7b1ile3d579m5ln4zp6tzu26la04uei1c2qkjh5r75time38uurlxw99rmjc2u4x61a5dg8nm530lu04m7jbt01wdqiprv1',
                riInterfaceNamespace: 'a13eyp41hdoywgga4tvh77h1cz0o9jxtq0rzjgl67y7s1n6r4n8g9zku6ua5rgnxwvr79b2fxvmcw7lfj3mvmeqkte1j9soopn7wv05729wkz2vdt90jmu45ooi3dsc2sceheaghkvenh8mpv9l2xomol57thn2q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'xc4rc08l1l1zpb1wipb7egkcwolwp6bjucqa19jh',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'bwemox20vefqapp8ysz3szcl50odw7t8wkewh0nx2w0mbge8ak',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: null,
                party: 't2nrdmpdbcp9971v53gundxuvntth7d8wy5pm6t0l3az5do51edshhl8wts4suw9ymqs51hntykjx3tuh4nqdk6auyag50nhsl6inepykdkn4161jp8gigcki0syj3t4vn2rjy4p91515l30h2jqswb1g7zvxblg',
                component: 'y2aaba901amnb0h9xnzzm5vkeid5mv338vyw80j1e6ei46buzddpp72rq1zll38h7nf2iyghqsrkwiwkntp1xsiweetgme9wxu2guafw7zkrn3iyxe1h73jg844694n8kg4iqkk9lb3wm7qsax90ym71t2snmkwm',
                name: 'utx0h0benkf74l3gyhyhlr5wvrpt2vjo5zt1z0zo6po1n5vxgronkauzl69fs13z3zkhyr2lmyr307ob60a169ev19r6v9yv3xln4xmeq9igsmjf271k9dcymn0ffi4bxomzcr5z19cy7gfryybhgped2vpbujm6',
                flowHash: 'lsb9oytgd9craqrcoozxkcwcsbemw18hh6qgum26',
                flowParty: 'ocdpr5k8onn7wpeq4hefpyw6cbbuqq4bd7rnidly14gkopxfi3eehl5kxsv1dyg298uk23jkrlss6d5tygpcxf9372qgrpr1mrcxl22p42t0b2d0gv1y1fhkljceh5waltoh4agd3ckluzih8kzyoliz7fgprp75',
                flowReceiverParty: 'vfv2i3p6mlif9i2dlukwgb6rl2gd44hn2ejx8rg14ogn5bfsjwslqyjrthdq82rtpesfbvwmnfi1nspnt5zh1qdsdl0v28ve0vr9evakkh5t1w61ayd1e4q2vvxs7oyhx8xtzc33gc8aukslj0wol0qty4r0e4oy',
                flowComponent: '14a2sem414ir4ffd4bfmua4vie6gy0rdpb3tfjb006am8fplvu3wgkb6tr3qmh75eijazjo2cvrec3nlw0qftoom8lz0pv64np5sx9ih8n4iqrdp8ele5f61s4gmzz2ogugq42eslr78sjbut3oczg7bqswzziut',
                flowReceiverComponent: 'eb19c9efntnncpgc339bvzg1zxe49flst2l6lnuay71vpzwbw4mnmulhyvwgf47n0mps7xzdf6wd8f7pzu4ghmwzx4hvqau8phjocuex4bs3lggfiik2uq6ntwbdqqjcnec4gzluo2t5l6rwcd1wjw7r6hgnqnfe',
                flowInterfaceName: 'epvtie6eb4ddx3icy2oc2rulloap6mc2lgbg96tv2mweext4c3ccujetykoe4s9gcennz5ehgs1kdmrbxqts6t2wczh81o7zl8r3vgnzy74w0g41aspevhnagjuqmstws1goent3uxi5l4hr6pjxxo20b42rk9xx',
                flowInterfaceNamespace: '2uz4okoh5n6hugzmn8h57wj0xsgzv75f5mbd6flcobx307ld7x4tv0xk01liorei4u3j8zhxg7ot655vaws9np676wzgtutuss9wiy3e282oz9l9mn3wbuyduw6koolyhzdzpznlmcpi4073vecruavg1f83fu8t',
                version: 'q81v87vuho1buwq6pxrh',
                adapterType: 'q9cz03vh3v1v48d3d17xekj3u6hlg4rqvv30l5orwck2w9vaclwh2lfvb9nu',
                direction: 'RECEIVER',
                transportProtocol: 'asjo826bqs17yyouacfhb7qis5wemww7y88i4g880qze303885jrqa5qir30',
                messageProtocol: 'qh46f091vrga54m1k9ndivse4fg2a6rrw56o0lplb1t9aobxl0zzctt44fiz',
                adapterEngineName: 'h0kp3ctbq0j4d9si4cjtalgm9s6flm3mllyqy8ldqvjwho3fqjlfml8u3o4u6scjjcjq4ir116xvqsjpxuupslu1z2ijda9u4t40p7ka4hzmwhvmg2y0mmy9yc0f1qive8br8j31ovgpuau0tlt9nxj1iv87naci',
                url: 'u4tzm2i73m6qpby8tnirab88fllk5zws6il8w2u9vy4ox5eojtkh9etw1jrfznrxnkubvcsbywyvgetqrpcwhe2bcuzw2re3zkwvy3i3lgw4fr7h2oa05uwfb19203sjgcl6hrcc83nc3lsd6td25k0kmivrsx67rqnp5ryzbevmfd648h18kil9kud7wboneji6pf6bjpxen8938wp7pinkb6ouqumwpd1d2jvjzpc2mz8og5ctdlduz3p1pxucanmprvumf2v764gj9rqal2hjk36egby4udx43y4kra4yy5l8oyqwtdor76ya54jm',
                username: 'fqjzi1phlvl2yfekv3xp571uyjuzpe775hlmn9mz9h17ifn6wwxdub4a61oi',
                remoteHost: '69e4qmiy3onw5akyg5vrvsl83hqrg00gq4f2u82ioi65ohzr97m0nvbty89cv0tyay0i6322xbwk7nm4bcb974dz5nuubh2g0jqdzqq2tph431wamhtg052nu3dxi94ngg9k0bvf67y1m41crte7p9emj7mibbzy',
                remotePort: 3552188065,
                directory: 'lc0mfai8qi0uvnhb7k72wh2770n8bvzu4d173qqxsh1qh5sf69qacfucje4pvc7ymsxqljze87h3jyr9cyeovieih1xhcwnpgabp3bdzpyfjq0dixk8h7u4pu70aacotstopwnlvool2rt8cfon88bvzqvlxeytxsq5n7eqefw2junqejfo9977d4h3vdwsgpoccap1qfc60nkbi8k0oh305jfrwppl06605kiquaucb5gfezab5be8krq4zs5nck3p9tsog95563y8q00b10ksh9i5icd12wje4tukwjysp2rcibgemd6aly4fgub1eoefi8pmqwafhpd4g1p10ubamyedga06ag8sae6jp5u1zxzsfzqpl1ykrnug1l08eicmu5rr31cfang78t2tbzoewtnms3sppr3isn6f35ktth9zq91erfvhxfddomrado915r8rrc68zwx7l6tfncakxehg6rnpmxwkg3d3ucrqvc6x9csknt25iccy7r98rrxh8mie5kbuoboxfdi04zrp3kr1z4mqlt9zld5tzjs55tlgt53xy0fj42q9agi9os6qdsm8245dc651clo559jc5e048kd60s8r2hwcu8ck2wbjqb5w30k1j8hkgir54i9wvqzhrmapkp9gdcy1uwl2mil6jhgooma4sf2gbnn8dqdm2hwddyhiyf829q1m4hahxcrvpyqhzdodwoy2vem36lkfgascsktqwkptqp6hft9eo1d14fitc9r6d77fwjrfm56ygoao7n8p309wtotemsoflje56fphgegjixwboej15wvbmg4z7sopyc5wyy0ptcek9oov4orrm6mp6ibosgyfbaggzfbnc6ggph1k4gipjwsbow9xfcmmrzznyabdh19i1pixolopbtcnbchp65hs5re3kyntmlx2l6gbtssnzdxgp57ftqudm1v1qbffzu8otii91bkkci3fhlzjmukg2bas7sljo659t4a63uhrqbt8vhuddjat8aeez',
                fileSchema: 'ykoc0gkx8z98712rlij52ervi8jl2ot1vw86pogvdjdx8lsc3318t6hl7ojkjal1techcm4wwxi6b90rcahtple9zipr5vakrzz81bgiwtrk1nilifa3m1wkjcmrcunuv818wdcz1b112vshdie0wifyhp7w5i4fs11baxezq98kekodr0l5gykm6otpuqd9spjh552v61feps7q4o81pgip6u89zwuys1io6rhbg5mtn6guul0i8ycmytdx8jp2lujygbhyhglbmflvvzyw6zegkix6kdx84tp858i8y2i4nfq49eh20noedgtk28ougf5fx9mtz7p052rrdfpwvmg6c3k375yss62w5sozsyl6hiq9bmp0b21elzllrhuhen07tsq8m8ff0od8y1c2ppvk922fjqeo0bxp8fc6mz1q5ne8t4aflz9w7hhpz1ny4442qwvc2lkkvvkl6z13nf2zeii7xi5kjui3ulvktu4s6fbrhdg2goeblqpsp3nbo2n75nm2p47xipodw8aizbqp1mpce8g2ai6ae3u7s0yziny9bvese0b89g1xi86bsv0liw0f9esjt0he052inl3qepetynzyf2bi249ffecydsjcih75w8z2auge4arrjqtdpenjwqsr8jreaomy42fhg1w5g810y81rpqnxh2ermkb9wx858y6yzoee3di2aka5p61t89r9mg5qzvguow4rpbtti4z80hcyhwv6r1f1xlkwxwenqqummjsc9kuhsfpnlu8e614l3rscbe15wln1rv0re1n6zzhsbea8tc7m2rwh0kazvw4btgn8cli2vfwt5k5jzjc179auy2xvutzv46u9ha6e9wahi6zu9hpyf90zg897w0dbzgfjjax1e2dvahi6jzjy88kf51rvb4sfhywj2hk8k6knugjnj8f6fr9j77qsqf7al48vt7vchl2lvdcwkrcri8l2c0wc45l0ow8o9pn3wi3opf1aw5deekpqa9s8xnpw7ba3an6p',
                proxyHost: 'nzrz9bxdb7wfu1nxvf70x7k0dg3dcpulb23selv6x2wbpc6u3antofewmttd',
                proxyPort: 7313547472,
                destination: 'ya9rkyq9cwx9khp4712555iyp3jvkk80ybbf7k8f004l766u1ocs1ajsmhohlj21512zyrfe88zihmvgbcc4koig7z0rhjrsp3dobop07zpc9wck7pc3974cujnp8j0w50d9uv6nweots5o5eh47r1tvjvnfgv02',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qchaetdvqytmc3dqeg8xdojeskrrzpdimtdjxg4g2j70xhwx0du16ych9yqtl3pawf5z8ciga0hbopvtndth47j085hqrrgja792qrre92pmd5u85fmssb6hhmdqnkm50o9t3xf2q2ixhebzialw78d39e5mp30c',
                responsibleUserAccountName: 'bjkdh03os3ieudy3r17e',
                lastChangeUserAccount: '1yvlp206vl5wt0z42aev',
                lastChangedAt: '2020-10-16 04:55:56',
                riInterfaceName: '56jtmocqryfc494miieehr466l4xzbui7aifeo8awivnc4q98ycfa4pibcncc846yx5pdgsfh9iqekdy64x7v24php47g3yxs5jq8gs1xl9pz47rwsinajwyfdnkgeiszyfsneaj1b39x35v1nu5dhgs69pl7n01',
                riInterfaceNamespace: 'vyffrnc01e0qol4pt9i0ez1vqxv4ndhrkgs8bz6i8nd4z1mx2aw2b23yg7uc567qegm7buyk3cma2ssj63xx96uc5xfub5jqhfqk73a5yfhdksi7g3d64w489asb98ngnj6yn9c2xzxjzu68kgu4pfnkl1frs5xz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '1hlgbmh8n6scgkdy0lhy81psbora90pqht7wk3y2',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'ttbfkd8iqnxrgbeio3hqspmqyiow6ry7woh6atjo5a2qg5remq',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                
                party: '56cd7qm9871q8hyqbc5x8sw3gw0m3wn7thhxyzahpwyjzw98m3rzaf7c12azpa8umrdwskfy4kkqclxnk9pw0e1gitalckk99vz4vqrc1l5rl7hr422i1xl6ko8m983c5rp29wgbpqhke10ohpwbo55rmt2vly8o',
                component: 'jktoche4zsqixhkh72rg7t7nw8fdtcg5q7jwd8hceazvb7xcm7xg2l0lq9elntkfzjbubpqs70lzn8pq6joxravmz57jxuqcv154x4dnzwxuewc0khzw3nc6qazenbwpywles4e0e06jqhn27823qwg4qygyz5bw',
                name: 'z83z3xf15wamdmpi3ci9cfa4ks94xfizyqbh5s9gh5jjplpj9rttog707yc08d7cizglf60fj57l6i9qwo37rtfsntoggbj17xxydwh9d5y8ziqkbo2n1oxmeihv32u3w2dcb6k6ksipi1bv1trsznbroica1oi4',
                flowHash: 'zhcloef6mupnlbmk519n4m4h13xz97dfsz1kbkgq',
                flowParty: '7r2pv55032giqr9pjsedaay21bwapf7cbkur9v2fppz0jg73z2qgt88zicw458gt18bts0iy9h9nufsvszvx3860qlqgwzenesi8dyab7y1kiu7kr5e9efjvi21cs40rgsjnpumaeukfx5zh90hr5ejohl54jy51',
                flowReceiverParty: 'j8o7t2n40h3i882l9ci83vu21qnk61zagruu1xy9kjrwwzebuvorzvk0pybcti2e6sb5hqqcjbqyll80ypgsp252kzxurydivo06wy37embaeq13hgrbww8x5waovaradt05c293ldaak2c7he763az47siortkk',
                flowComponent: '4wnivlt87380jvo5rr2c2ge2i90pw3in0ca4di3rlpcy72gftrlyp7m9iy9qimyfa5bbbop8lf7ls9at4gewsctc560pby0vpydi7i6mk7zqw7q1hb2g4e7gz3gjp3j4e3te7ed1rhn6v3vl734xqdjkoqso3poc',
                flowReceiverComponent: 'b3qlyb7jrpwa5te6rhzcstfj9ovr19ncm1xfb5taerbbrenwuhvjsj1s3bljcjv8fkvnt6b5tfm5pvri51fobp6yop69teoml358a4bl0ps8h0sml6pgm6kw2vbdai953s7m6s7xp61ycjokdib3dbcfvrm919vz',
                flowInterfaceName: 'rnkonllq2e1lcxfgq5n3poakyyhdqeao6m4xno4n5sqxsaomxvx93ayxexvgi97kmjs32ygj7twpzr4mpijhmu7oaqq369ydvn5lpq5rsyqiljjm42wr1tpfzf7tf9o3muycfhpmv6ta2zd41hv1hvj3aopx3ni1',
                flowInterfaceNamespace: 'f9o9y2y73a09ncgtyfuqp2x3j3g6xi6at4e7ldgbbbpspwfgk49yqwdyixr5dbmpxvu7tutwgr68l4oyahz8lhhqaf7jlcwqk4mtyf6tjcpc4vasio7r5gm63b6akevi0po9scu39x9ts6s09zzllubo2ela7uat',
                version: 'wgtwc7he9emok6s99jub',
                adapterType: '0ay4vje58sufhkhdi4c8bh6wliu50swdgdvtqf8o2ym6pmg87h10kvyb79jg',
                direction: 'SENDER',
                transportProtocol: 'dyv8oc8rfdcanb1dcmvot2m0mflu474qrwn7w988dm2a38s2mrgl09chauge',
                messageProtocol: '6qj80x8149dy6bth8pqjzuxudtvid956dtthlsohhj0rvbi9gyac4pw2sa51',
                adapterEngineName: '9hvxwhbtuamfljcatpnsquwktk9ew6q608oosew9tiaxbxm485is7q5kup82t242vhgpd7ucqh9685sp7ly986fcl49d1f6y5vkmtkqzyass7xz8bmuq72opp4j6gvdmhqujtcfdkpwfialo157m5nqk6mjjsz2j',
                url: '4u2yi9u9eph2wbe3qntyu2ees21by93z75yucsr30dse7rgdebx3ffggajf4bgrpuv5gecrb77uzj8nma14gqx1jcoxv8p315m1f8z79e1l97ie33ncfzb8yolxzcq593jycuscguvxa0o4q4ctful2t35kg8o6ei8co0um4loais2eizx2aov3iqtfwygu1ek09au6gl1wz4fl8gird5fyiuri25smt4fe9lh1405oil5g1po28qxda5x8xll62f41fznwro8l75h7uaeczbvsltovjhofw8fhni62p8b5gas7qdnyc6rj1v7xacs30',
                username: 'vu4ob3eyqeu6oy2w582yf4r3b9nqis8ni1tudr3vv38w9j3zpo2znum0m8d2',
                remoteHost: '4mt07vf4sofw11m0k4f4d9qu0o2su0je0gxh2j43p0wgmyegy6czbooptsaonh3s75j0xghdja7u8trujxr775uq1bzk4ytnwnlktccf453jut002t1fp0k1d9sqhh3afynasz9xpbdp2xdojg0ssed3gthydyat',
                remotePort: 9059331170,
                directory: '0jcvqls46b1jnbczfa0n3el7q9993d180g0lq3hii8o2dtv5qdpzqakv6p6tqef0g9kc03b10lkqb1nzhzdx92sbneqqzilcdzblvh9iyq5bsuot0rjkie4jvxwcow97o2m1f4if39hhlg10zwhhwv4l1r392arrksgcb0khtgvfev6xucl17xtt1bfz5j9z2ug0q6xu05m8uja70exsp09xw97ukp9v29ixometzckaalvjxney7v8q1gft9qdj5byyk3z10to8str1mlqe30epc1afvsk2ezi6sngbac34z09b4v2zz98s9z18fbrkkm290eippivachkbphm5ciw8sh90vo9s193j6cz60azt8ktksckc9z35wo8qvp16784iou22z5546xtwtkztcay8rrp050w1rjq913y57ncsznkeqgmjqvi57gqe78cyv71c23itmo9oy5omy8tvuifip2l14myrpep95mp948bul63n3yvktut1bnxxjve6m7uy59uejh7b5wqsdmnhidcrc86az0ezrvmg6486xp4wdujfhizwvtz51ef7wci307ev2pt43yrn4itmminjdpbfqfwvywak32xzchtmfvspvgrgu2am0efidfdt64q9c15gzmo3hrmdc5qufiogul58ynccj5j7hl7tju0manmar52e4yy7sxq7e4ezsl0ejyxtqnd1b94618grjii1nch0s8syb4hld90m88669b6k67km6eontpdnvv766fh87enhqewaj9xvrc2kdnzjnhipl16g1ojcb56cyhv2mkkpe8er631po69f4488f3jcnlz2ebor0thhoy8t9lj5g9js1r2tqkpt19pqx61wxvvps4fm4j3tiaga6iyt8rlv6yckm7fygny0pj381e2n8qm08t83w1buv19kk7gulu7g7p8hohc9qc5sxhqa4t5f2540v7d926ccj1528d54rbg9wpqhzzzmqbz25rs6y9j18ezoh0mhhlkxg3corvt0',
                fileSchema: 'f8fqx98m0i8dys68ntgrtr22cfav8dhz2dvqfx97lunk3q85ckv65cm5eqdosuol09n2fvn6pbjhqvqwdhiriswj5sl4fcopq88e03hst6fdbuz09w53q52umia4179a24owmkzp1prdbz6r1z3uc7ebl3tcx0hkneibevl0wv6k61rkdlqs5ighulx18cz8ec8fwaue7kxh1xy1z033z4sd2gs19842jxdsta55fdq10zmfag2b4g08dyr3wlnc5h5ixcjey7dywky95ybq95gu1tc8li68svoplfz25p315g1ulm28xat3ai8saktvyt4x33cmzl4074cmrihgeu0o13zjx7f38c21vh8udweg4s03hk016f6nyunzrwu308vbc5mtllzwaljc3pp85dxjpcucf4b6jm584z5nosl8rjs8e7exl0s6xsju1pu87jg9cebl9q0lk9jvmfscr7r3636v19cl16np4c1f1b3srtu7rwx2i78y21297frcntbmx7r0zuuov3bp7oj47uyoadcye7x7obfduvlhtc4jouivifbacmbmdzflt4eeh59z6rodpbph3k0pmg2acz2p04bwty7s3dnh8mvignkipusd4t05cmybqjkfd2d7x42wr52i6eqczpswzr2tx321fn1hhyccz4kfrj3spw3782szkhpvw4p4z2he5u55ys20x5l46cvq2xkle3fji1c0iardy33glki1sl07z8s1d9f2f5h3fb63p6pq8gj6kntlkhjth55736z65u8rve6ht019wmonghfl28dp6ke1elakq0gfeseml3jw7q8cmuc43vg6m6e64c4xrbk17e76kach5o5ykaifoni3gett4xbbdl5tr561gw2ym57h3xg3a6ayhoxet4925z20o6h9shd6ctl93m80183nl746s4k00ctd5zawxypz9q1z05h76wgxahifpuvpquul4gciz0ur6h5gcsfvcij064sd6t25lyp7cmzuwlqohjws',
                proxyHost: 'kezx97wctdq3xj13zfwar1i4prdt0s5wlmixedsvguow6pf6uoq7ejx5j2jn',
                proxyPort: 2439378853,
                destination: '69zh4bfy5eydcwi0ti4f3slxkww4wcxdjfqo3cum38eztqm84wu91f2wqqv9mf2l30pngcushsbqq822rr5tmr5y4rzbmgienvnfg2294tbfit17xfsryyxjz8cbfk4y30zbbs77creq6487my62d4imxbnj1sft',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'pv3n5vkez086ahxbp5bao4ocpv95gb0dyba9pf5d3d075tqx46nuj3ze7vf4vkjq5c6vk1u8j7b416xwr8v83cyh5g8oq2dv6eu4zngq8t2qs4w80r07uvm5crdj7ou2xepj089uqz0sge9x5vxm11qp67a8c7dy',
                responsibleUserAccountName: 'ka6zr6pyldiun38cmva0',
                lastChangeUserAccount: 'u9ax5btsqjm4hvmnxl03',
                lastChangedAt: '2020-10-16 14:47:15',
                riInterfaceName: 'fw1zril5g0q64kydx0ooozn1gs2ba5p4ducuim91y2by5wkx73sm81kab0k1eaqd1v03gqvyl87mgnx2otr2sn7wdxibzo0hky28j88eevhimpremaw70hrd8h2qubgxhzuw5gjupb27wgarohte2ng35obc0ng4',
                riInterfaceNamespace: '8nts74hegt7w84lsifv0ks0dslccjfk0wfgvltxwafz4sa4c4vj4b6ul20fiy2ggc4trby2aenrg0ujo2kjkap9g931yezxfmt3a5j6gnsihxv03rmxxes4ptgqfc0cj16tfruu3oopbqfbomoc9usqwys48kc9y',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'e9sbf5kyffja2av529lj3k2qzek9yfe3ek80mfk0',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'exietqfrqocxjtech6s2kaxeuxu9cfxmiv75oyt2l852pbgcdw',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'ovmztwsqfz93xtqyk5rb',
                party: '51ugeqa6xcuh4ji9boj5nv19jucclddj9u16c19qvgl73d3wknmh3usb8pbka6g3cmeclznwzs7273h60qfs4u9ifeq089p4jy32hbfqance0njk8b57m9ninqyk4ucoqdmtpvcoxdms0n9l22w50a6cj0w3txun',
                component: null,
                name: 'o6zm7ocrdl6cwp57pwigeni52erw18i4rwlsfaxzwxp1t7uzw53c9wr6xtni84zims1962tu4z7d1q1bschz2ymup7giz3izhzl53f51z1np2sky7od5ujjyxp5jhd86kjxp7cz1x8kexa7tcnhbwkxtxkjdia33',
                flowHash: 'zm1odfgpmxz9toplz11tdjg2a27n3yh3vvliibxz',
                flowParty: 'uvn3m81sd2paic6nwhj8xdg6dhhtc98ititkly4ga7to3hv6pbqns91tgs2i8pjkcpk6ydmve0yew1660ttgwbrn5duyk8me063tgrvqp834uqwbo5pphrzxsx48ybzykogc8juv4jta06950u1j29xsu07u9xxt',
                flowReceiverParty: '3zq0ip0w2fx11wjenr5qtx93w3b3vrbcjdohtagf4ezvnvkk7jnw5rwwd8g3iu369ykt1y3xdfel860cxvskwbv5jm47czoschaej8oil1i8xfp3w8nujfeg6hc52q60q88hdp34lw7x2uytu4t5yg1ig0awq0kl',
                flowComponent: 'etrrx2w1xr6ukqeqsb814tckjw3uogt3unnpfo2wsqv3m1i29zh3ih9mmxpxl9y627tn8uwu2mm0cvx2operev4cqn2v2yjsoion09515yaqpbwd8vn1hpg76i1zhwuk5mdh84drtpul866yiq12fi56nz1p11jh',
                flowReceiverComponent: 'kxyz8fkj0hkcr2si201n2lr8pvnh5yrx94vakvlqf67tf8nr0lpw0ab05ooe3jv3p3h9lic1q8dhtknbs1gvtpr9n4kqvd5v4motgf5sd9limlx8qvz1qmfexje1surdlxkas0sz4uucjkw7c3d2spfpsbvkdatx',
                flowInterfaceName: 'ses0pcdcyzd8jsd3f16u3bpyk2fsfc44fl79mydco0ckxtzvdhqxervl5ytvwjba264v9f0v8kyojbfml6too1cqwoi9pj12p99v4xybwjp0xc1du1eythq5olr0xanjv3h2yfc3lxzqnp8vxv72ns9e5xehexuk',
                flowInterfaceNamespace: 'a86p1c2ipdj1xctsniahdmlnj85o6s2u20lex665kbmz4t52l75vkyxk7uu8ylezxumg9nq49ozlq6azrqa2txqlksrqz307qul4k4oid3dwgspqstjybqbo9n1e2qvceqrez7nl04yiqysn57d5lmixupz9rskc',
                version: 'ceosphfwjlj2oyn4gpuc',
                adapterType: '5ivrky9way6jfur9y7del9cgoyeevl9tlkgpimkhu4tymm00n9v5vu4jwar2',
                direction: 'SENDER',
                transportProtocol: 'dw7eo66wzfr38n1ju1ultz1zbxlmg6h4cj17ealb9vn3nxtt3bbabbzwrr9n',
                messageProtocol: '74z6vetpo9w0tq8le1lw7yx59u2ptm1qw2pyzkxifv50wkzq97i7jt752l5b',
                adapterEngineName: 'vqjbk2pjkbiz8p8oix7u95ifuqmbdha85tsnebw3wva4ysfk718xh9v5i4hhh9n0n1vhb1vzp9ti2385iu13jt6q46zepxbhr35kb1afjmiz896gw02t29pqyeiknvf8g2vbaccy7d7lvxvazb4m0v167m67omo5',
                url: 'ht0ffi38avlrqv1r5oo91g0gsdoa8fuyc1g9ixlveexf7gz0w4eszk5uwyoodqzn8npghl651kaxo68g5nupcz0ft9ai587e16vgas4sua56384gwq1lxrfrsbcjmwx3saoy1y93xsewcxukvo8i1okmbw7djrvf25to1vafmeifko1wh9thhoceh1l5srj7owt2af4h1nz8n4w8gz91qli1ta1bptajbjol76ypn2hbg1uhpm44vcegbje0w481njbicyx802w2m3hn9npcc3e3b236rhib2j25fthzvk6x5ydrfkht4niv79rbzpyk',
                username: '8aglgzhmpclvr3wo9cwow9ygeghihspvi48rjzo4xagjxirectx3sf1twm53',
                remoteHost: '96m3s8uf30zq9z9pcupei4ylgepbi00e1lcdaaw4iog83bl7jpkrd1nwqxnlutu7flxbeynri45hrwoo0k2co3lq10ggbr7oqnsf8737dwtl9k4j1ob6nfarfux7rqmh2oxjijp9nmz0p8ipsplkypx5hhbc8ulc',
                remotePort: 9835041607,
                directory: 'hbj7ep9sybbeyztb6hgmbq4xk0ce3nl9j2ylpvuh9jk8tbuw0bcmzlgj3q5bw51h3pkbgt83hvbln6rq747iw9icmak7i61fy8vbcc3eesoybgaic5cdxe49zx49yevx0tmtoqil1p3fseozpjk451z3laar56we4ib26nfim9skcwypewszqnde2n66jr4k7ohdct4151thhsjtw0k9fz7pb50fvz9y8d40g4i3mu9ug9ksr5nym3g4oimhrh1k75ursxdnj1b31kangz1z8ppmkss2jmim802f08b47fj5lpk26kjxbrvwlvp94bom9dif4f6i3fhyn0wufnkud9koc6i1w88tu6s9gy31wwc3i7xt26wcb4cwkyfx659fwuommpctx335xclwunytm3miikd7e8kb4vc8p3u3my1m72rmmcxoiv332rlp14kx6na7iets9gkmiy90tejs1zgw61w5dbzl44u98h2w4wt01u9gzwrdsts3in1unut3653k595b19f2loiuidkarfgw9j941k7ny6zu6k4mi2rbcsyxxfm0tcprdqaexhs3h9gyq5yxsb10pvyz6mz210q2pzdtlt2o7djry8l5yydzngcsfdf51s9ud64itvdzvq3temmsr9pc3pw3d9zcehkfbkrgu8kryoply9z9dle3lngj1188y6zqldxgzrsogfq1dterfafr7x1evsabpc5ky0bo7uvb0ud89i0jrf7pfh7x95e4ono3bpt6ibj3lrx2g70lgr6l9x41upelse52u6f42bx3jwnl5jnx0133jgvl0wl9wrpduj8l75mn7t0irsjp7ztl6cl1cnvx170s96c5lkav3f3sre75afgpo1ok0k2czug86sr0zknyvaoreq475cv93t84y9katl18z5o10gz86jlf6k5xgpo6g8qe2vr9fiagtuptkqjbqcg1b4tq8wn6a7xu98zczra2hw94aiw626ausu2tekd2fnndhtdvorkricn7p8yk',
                fileSchema: 'q8jizg1liof2t306bgi3kxr9et1roa8d4v6te8pddif6cvfh5gl2c7x28tig91dq31czc3xdrskjux5abm0saq7hpp1t7c3y23rq3p92qfkolqjirxwz6o1c24ml1gjowweu6bioox5dtly3g2gnr8zyumr7o53yty0bwy506tjyq7nw9bw85h7k1f2qliok5nbkbus97b2hjeo372xiv4kj2tb5n2oherqizeu2mr94ewumxt4pnbwhrvt3pue0qdsdl7p2pon75kolma0ymsnq4djf9tacbma8i6y4g50vg3mmcskry5kf4z3yt1gq3auzmqekjjtnpbyb1kbjva927g48dbuwpjyru6sj51mfrlrd4wwj3l5637l5cx16rlrwqafs0t4747wzrjwx6rzzwdjknot1jt347fljuj4apwmcx0ljqiv0c60eec75bbfzf921jdxr0qnwvpn9jqazk91s70sqnagzkosdg32la2xdjt39nxsrhnosyzcoxq0urkrf4twms52qxrfc2qyu4p5n0pqzowshrwducgzhmbh026k49hvclmljkfccjt7keaog8hytq927b4l138e4bfmsm9pn3ap2eqtv8ry5pmeuqdeiu83u8nzbiq24g15k31sm2ea6sobgwxr9fchdandqgympi4g8sr9bq8b10ed1n5u1q4oep777vedctn9nr8xkov38fcg0dwlbsrz6uox3ooaslr6p9acly5nodz6ruskzz8hen7g431qlg3lcwwnb88rodwi4ani43j3u6wbqvtlfogc2kx35nwjablu5ma224fx2wf370ypcltnv74d1tuh0cdo8fguhw0ttmhyl65znkosv298d9vkeahp7ci76r2832ngbcormkcch49k4kjqr6q8yrs0db5iyf94rsfa9o8kxi020lwas0z16q405a5hp3p2lh6qp3n4zge2p3snuhpr6yfzi7mu6dd8mes1bwi6nxfdn3jqxehnecphusr8fma3dawos',
                proxyHost: 'qv979abu56fqd7kqqmhn3xrbpq5iahmnr9evys8c2uxnit55osswvern56du',
                proxyPort: 8030143157,
                destination: 'z41xkmr5igsqyxn1rr1o618wdof83c8co6nasebvc8iptgi31bnwsf95a4q32v01bazmjn3zm623dhm8o2eezbo7u6yhloe1ipofuvt6o6o5nnp3u8m2flce3ke7zdg0liy5q2ve5m52irtkdo1amvxsvkwc4j0v',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ge3l93l58b7i7krupvmplq47b8k5m5u6ifkwhiiosgti0psljq1dxhbwdvkpi0rv5zm5wjzjha671auqf59orqzpmlp8okgtzb4x0gnxobfqy4f6vzrkmvxty13w8c43iu8qevs6f44yryoyggjnq9gd9l7sc08k',
                responsibleUserAccountName: '86syqi29k0yae958e4z5',
                lastChangeUserAccount: 'got0b5gj3z539hyp30r0',
                lastChangedAt: '2020-10-16 05:37:23',
                riInterfaceName: '5sh4njvgo2dz0ts1hv99tx3kx5xi3wiyqjew4waugurx73mcx17rnplg8678w70lnnh5q9zsab7au0cnzwvpcqo6hxba9pc3m2lswsl1o86qpq20a2xkf07pggntilof9y3towvwsrkh7sjzznbt4r3whhyhcej8',
                riInterfaceNamespace: 'gcz3fxuwmfwzzfebitz0jypb12fck9l1c7vyez035v4ax6pt5bwptziwrwaa0ic4e0c8ki1v4ufcncx76oyecnsxhnwquxe9mpdwavslsyfy51omochi4mtn0722bo4kjybm5h509tving93cdouf8q0xefr9759',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '38hrcq1wk28mx94a48o824a3t2b8sxnp1amxu20o',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'cdzyu9mg6gh3b0iol4y0nixu2fokq62legtgnik6mfsqqxafol',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '3fzc5y2xqyacsluvhkod',
                party: 'a5iblmr6xzgls93wkhwh4uk76xv13wo5ilzs2cam29asgkzn9gtclm7xylmikq74w5z2k0rw6rxmkferr0300bqy34pq713xa35elcbctx9ixlifrj6xh07wa424irha6nd6xmheyzpohneyda8rvvymi038056b',
                
                name: '4g0trkcny5ilnvch4l1m1o4face90vr6jdnzxz10epj2b1uqhhstaovkz04d29ur5dq62ki1pyle9upl3ssym8k25303qlb57vjdh8nd96x62thbix5npq5xo9u4zmbhmup8ionxayuwvgiohq805w68rzvstk42',
                flowHash: 'zyor3o2g7dipvizeqw7zduisf13uaymo1ovih9qn',
                flowParty: 'xrrejmx41zps34guq633zwdouj85q2n76ayppmmfzzglvdutylqlbmeru8llfb8ui37mo92k9gjliox3s5vml4cis51yyy4furu4ufznr4wjmzh5r7qzv0n0etlr8w4r2itkxdtbl8jhbf5zruw116n1itk8m9rh',
                flowReceiverParty: 'd5qfv7it7yutg9i9aw4qvzkwb8771l5nsvfqyz9nkivnn652goo55l7ss5eo2d4ib535jroin5gvm7td532mrvfnadk096id0rncel82sq08mvly0e0mcyfrfg58fgbkkwgu7xdh5c96eeg6pbmkzxbtlo7iln02',
                flowComponent: '0tecolqoqbxfsplo6z3zjtmp8bx1vkwolii6oxkpvfru7qtbth0k2hq2hf1uxd2yd9o1w8l6hnr2jo8ka3cypbgp1gxv953m4yyz2sb79r0egpiz78cbkmlvc42wbj17d8gaj2cyb5rpro7rm4o8afg210dil5hd',
                flowReceiverComponent: 'rnzif7r57ykrqci80mkewce0k9v5lc8yk62in5r48u5t5nn1cvo205ogxf0jf9bz9e2rimynin5i12ysz62jj93w6y5432axgv206yh11ab8u3o0mwn9wfvm7jn0s2u478rw27zysch9t8jar8alwqk6rh5w8grm',
                flowInterfaceName: 'q87pzbwjb82349s8ytn26xr0y0mxo3zbwbjfzz7fbgl98i2hnu4uedy3ufoe1kvs3zjvtyq851yyzohrizm94k8afajab2c8fnhtq1oodqouhzizig6id998nb64naj5p8957rj79zhh7lwws40sqpljersz6neo',
                flowInterfaceNamespace: '731qvipy8ki99lduze4ddc427bklkp0n685absewxqivoaczkj2yjpvotkllgyy3zcx9u4zxp8j0dg5sjfdt9p4os3ezj9bz9w1gbxchd3cnoz0fw5ftb7dhtsrshuubylzb5zj5yanddpy9x2gq99t574t4yldw',
                version: 'kq2ft9kmq51vus5m4qax',
                adapterType: 'wy061bo4mi3p1mcxvy23s0wn9vi3l1azr9mlutw99y6y0l5totv6nuxdkze2',
                direction: 'RECEIVER',
                transportProtocol: 'i08zibloahecmwrecr5rpgj360rvbqaku2vsem0rdxc3k4unuvx6ldjnd5hg',
                messageProtocol: '920i4u0boeu4meeelbstx7qric8ga2x6a5fm8qsu0b3cub7r5lwscfhauqq5',
                adapterEngineName: 's0bnmv0te9ibbms4bfcsazffg73spjsi82g8t2mn4ukxvuxhoe329afyop3yykys36u44eox818be4gxam6278fas2xz2rni7jn48iqe2qlg1mkl0dbm7tykeej3lbflg8hac8jkextkvi62e0w33cozk1nfhnjb',
                url: 'ie4jzq1o28dn6bt136258wx3665y5hslzq0d2at7h3zkmgohib5rhbwggw5785vynsyc35fld46v7zfmh6pmmx679zxl5g6wlubkvxxvydo3xpnyerh1xhebtu4c8h5gzpflspdjhr5987u455c42h1fjjkeccy2s9psfk9ae8rhup8t4e5kzfh7vyph4i5zz5mbr3u65ycugdtc965un03msc46e25hxdjz904l6svnzjrdteti40f1ls0kem38l10yhbznd9gbar9ju6grj6ke56km396o7ad393156bj4qg9kiyvgla1zsdewgkad',
                username: 'kc7cr9izyxztbipdvy7cnbgb5ybn6k2wp0wigap72gfk1ipyjg8tqx8mftfp',
                remoteHost: 'ygawl8wig1497qnmugk6d5nynq53ubwgbdgthiiif5y07rlssxp9fvrd2zzr5xkbrw90vo233z4srjoukpfagizxfrycrqejlxx127tapjkkwk26jvbikgvqr8zqyz8f2692h3cgufqqmxyrfhlx2xo62ljnhac5',
                remotePort: 5998072606,
                directory: 's9473tn1upj34fzn6wu5pavbh6nkcv52rztorc46fvjznsv2kfuqjfxlxfam4qjpyw6svsacko7h4cy17t24ylm9jci0qif2c2iitmguepli0e97tyc821v6gt7yro63kipd02qdpld4txx6vn4iygh5wzt2xqrf6g61lbscg0gsb8vwhxwbhisfguww73kj1b1sa70b8n646kjrkayuvki7hzg0aggsoou382deb8vbzlw2vlrzzrbocs0tzvp37c3btq7pkrox2ua7169b1imbawcm543zhxzvnyknuha2o1r8cmf7h744u221m34w4p2cpamsyq1zfjdpvwtwxzgylp5xukx6ek67n2b1i847ko8lvih0qmvuds92jddwxc3lp20ul537q86qqwrfophpv4xuykvpdbqtsyiyq7u2blf4hspay2df03dmz1qty0mvkrurb2puz50omo8etd335d8jxuvd2z9ajum9or9dkripfvsytd0pztf2rbu1wr2xhjv8gj9xlnqtlv2u0x713qlbax12zord3lhh0idfkibuhpdf4ilzx1et020b4wv7z4m1n3f6y61z9ba4a2ikyyan9h19r2znicx8gf93d1rgyrrov92nbgv0l0hr0eoj10vz9w29vyxehsgqq1ge53gunuqhnvchqh70pkt6f0wr1grnz12ssuhv9t424fjmjb32yp9ttvenj7ff9z8conrshfuttd5bv7gwc0kisrswr7jgewuvffazrv2yn8mx4yidaapymfn0si4d1iafqh1sqjfcrb00y9j78aa36z85e71jir3lkksjrhkcjunqu23h0fdiy6ftcnx84p91mi5o6hkfjberoqkkstonio87k837u1abkbm2dwug07t3clvw2fq4hkevzmrp638evu6d0rwfffg57ck8jbqn6fcf5suny518q5t40mdarpw4gzdgbd7ahuewadf5nqncdoz6baxu0a1omd2mwg5jyeludd9gl9xfmjzh82jm',
                fileSchema: 'kmurpgzkb7h3cxy77h51zznadxpjyztkzocc2swtgnsjbjvjjh4kju20kejeua1etye652s20yuki94a0mpj2oqzm01d5pdd8mxpu55d7rxm7drn3auljx3pwik44qax2t4o9oa5qqhzxucp9ob53sfhzqs9j30n4gh7nba3a08vv7z1d0zzxp5lo49zsaz311e30sp5uxo3r4ygu7hfhclgmj65o0y1wya4kwkt1gx7hw9v31yj4m1wxlqaelhvqwhkn5909e0oh7hcoj6k72nt2xjcc85fvawkc4xdu7x2w7kms6b8qinsffjs2wpsi88cuwlproagxwpe97exjoflwgohf3v5isd2ijva2lviyt43v7gaap86ttd6i81nrgfr5bdycmcng558hlv2atmobo5ng27ab0mvk5grwadfb0ouh3fibmc1zyx1yd3mr93e5w9v31qrxxugx5i4n9q124hqyornz6bek5r5fu3km6unm0yfajekvi14neq7oumxtv3y6gysaoeo216v4n8yr6ghohd4knshat6g5yp26e5nwpxourp9qh8cym3vkkyvbtbkw3ryrunlnwqnv7m65xn2qliby1zbgm07mm09n2j1idzmzjba8bqoiq949nkx1h290ezwybueqp1s3qmjpn58cm6w3p6ldxk38cltr8glv7ey4qiev913m9al0w9ksf1dg41wdtr31vbn0bvfxy822th6awh3jbnu6mo01mehljj88w1pqqz72pqeqll9fi8bf3t7400d7gdbz2zcwbmxrppbbaa708erxh1rm9wsw7i5au1l1g1gck6x7zav32wltp601xa5n586us6apyw3qo8gu4ucsszv4r0az0i4cpa1zdcpe0jo4w804r51tmemvez4s07dd3hgmwxhpmrkd3vq5bhbgxmazqzbpw7s3b46acfq2zy06m9h7zrecfsg3jh0mhfo4tobc9lsge6d3noa459nuetovrc7166x80z1vdeznsu5eaco',
                proxyHost: 'xeqcyut1me7sbpbpurtf2pexk5233uefy8hp5dqpnwoc9skkzil5i6kv7ys1',
                proxyPort: 2181778916,
                destination: 'ar489303kr2qx370v7r3f2azi7kawaaica4r17xf91vtt77vgjingx1u1zaoe0lfvezll5awfz5m5vxuleyq8cvxrwpgx6z8qmu93cj7eiuut3psnem97ryyaopw4pm4vbibhmsqqkhglz68esog6iq95da8kz8m',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'cos3rzbq3q7q3oz3ulpyo65wupr48ip64ngu48jjnklgjg29bv4ttycmzw5jb3utyc03o1z8abconrzt620cfr781c3dr814y62zahczw9q4dqc9kbi3aqmafz24srdf9mj53you2unvpedmvxln7ssgj3my49cy',
                responsibleUserAccountName: 'rlat3t7twp86i5huo33i',
                lastChangeUserAccount: '9imyo58j0fqe2ffe7l8k',
                lastChangedAt: '2020-10-16 06:57:15',
                riInterfaceName: 'csdrh7xr1erq1u8x5zwm61h8tevveqfz604jeo43762jqqslqsydrh2qf0xdiwikmzvvp1inr7xswax2p8mjtt0yl90qc5citikk215ekzo7zip1tinmysavy7p6lm9g1gg9306kgo6cot5stftrm6oa1b835ivr',
                riInterfaceNamespace: '9bz5gk5qn3hnvwoxikrd8uufjwuu8kl2ffaobs1xiuyfhkphdxk83t84h7ac3xgu3urba9bhi031o8o9uqn67zazm6eugghruihyv9onv3ou5p6qw9313huid1rcjwcfeatrvkpqbghm1v3grlwzx05l2aur83fd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'adm04ltbckjn5mbk42w9vjdety70w3o3gp6fki0i',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: '6te2s2ko7n97wesxupsly1ezwrvejctesu6wruk7aottapp6v1',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'la3sen5r1r24ibke9lkz',
                party: 'qjzgz6am8wtb6s0mccp0h8s8wbd9bbqd7vkxxktn3wrhtjb0703m8715rvx357jx6ns1nno4ayvltbwvmo15s9jhivcfjmqr7fiuxc16d3l59c9kktdqemqx7lg1agq5hxi0nnrnf7jp1bg97cowiga64cbagnla',
                component: 'zzfm2lrcl3bgxwaklrfjxuq3ry5jwhyncocpeaouwv3m6fi5gtofanu8nwqufsupbm5coj36l09ybpp0g7h6519hgbk7957auwu2cximuo42aku9liybi9zc7cih6tyqgf447z3i5dko1wjpb8443k5h5ehoe8eb',
                name: null,
                flowHash: 'ua35b2vx3z53qho0486mslysztcsmpmv5h3fbl3e',
                flowParty: 'jpssw84cehcdgn7eyu4nakw9h5r9mjxyn302al2bz7iqxucstctc4kaf596bimzas03amwqftk5j46th2p3oc7p88mqovktl9yohmgumx18gphqel0edc8a2l29u9hev2bed7mef4xm61zkz98uqsr6glewwxzlo',
                flowReceiverParty: 'x3p0u131f062p0i7f6cih3zsw7079wl92kbub1ld1ny7wudtx8fa26o26q1tna11wlkgaxl3ymaa5p177cylpr9jzj9l81n58r880vyywko6p968i2hzbifpvifr4nm3659qnba2a67vi3c2inugvjb8y5sxdzbw',
                flowComponent: 'mr7xt3fa3ru5686n47n3c9wc7ronnc4zgkxurzm3lrqvdp7cxeuzkwvjxskngjlkczrv3gx7funy58730y2xb1dsno2u4yoyemm0k5x78t21wtuvsqsjidtla0v4l8jex1dudh4mmk8ccaenfy70676yzvu9i6pi',
                flowReceiverComponent: 'k1vynqqrcd1g9p53uyq3eg1h3x8ahviftuscg6xm6gbgqyqxsd0buy1gy1asvcd6qafc01w33y3006sueyjs8eendl2dz1in6uaeflv2ce7l0cdc1s8z1s0gnmpsmaj4d8i10vcx48rijlcdjpassix35hj4uuum',
                flowInterfaceName: 'z9b6mwv7i7e58retvx8gzzs6dtlzvyqv1mh9exhk2ihc29a10oc3hip3hijgtmmba0yvbub3m0xpwf1vmayaqhiu4g5kveshk8c01ag04n1ah3wr1q4p7cm5ju9blvbh272zhw44wadbcn60qu1yss7tfiiaosmf',
                flowInterfaceNamespace: '19wpsucphkzyfyxvdh5ybd2m9bhhw0crqors1rg0en27batjlu4fjbogowpe15k3zy8srj6aepdkzu4xqprz6imosre3xjie1emh04vtlnqct90wtkc6v6ci8rfeoa6rfp26z6galottduo72gtj8azk928141mv',
                version: 'zob3qfsz91g66dksa33q',
                adapterType: 'i6d0f3829ytwdkqdy5m4qyf27sf5bv3aur1eprdrcg6hohuis1z7k0ek6kmn',
                direction: 'SENDER',
                transportProtocol: '6mfm5bpqgfg9pu9wv272hrnabq90cstqglxlhxhnt0titx4lef7utwz7n60y',
                messageProtocol: 'vi135eug9r1ubjhdrcpxiniwsanyx3wdcusy9he8cxvipfe53tt2b3x41wlv',
                adapterEngineName: 'w6sma9a956t6j3rze24jzmkxhbw0h3uz3bkb16vx5pprerzetj3wb1nynss0w305h3vp9jd5is7xmsppbzlb7qyr6e1xvgi76r5jpaxm51wds2vsuqp3r2q8wq0tzqf3mydshm8kfg1g680kbvqg3hsdap9pm24p',
                url: 'bdmlz5vaxzmi8kyb4or6ujlmddispspmq5i6iuw8lox8s1gpf4xgrppf80xxkww6ixveoh7piehyjoczocrzxkccvk7dzmqdcztm3e1bdkzj0hwoaiwk9mea8itwhz9h7xkalc45ykyv0kfz9z80wbb26pvpi1k0mhh2wqwqiig0di779ex1j1nxhpvoo8kto846oadfiezwockjryyef66qc49cthz2k2vyp9d0kgb2r7w8kq1jhr96uhn68t7m6wqbz1hfj79fncqwzjurq0280qiq8ee3fs9xt10dnzwttwtnzwa2l7604jkbwxt1',
                username: 'ybiadj5wd8dv3q73zmuh4hobpw2n04dzk27tsv89hy3czd51rhpu6e5wdo78',
                remoteHost: 'qhqs4f6w6h4fc1cfhs7e4vih61fzngwt1m5x38kmyrnggu1ubm2jzzwpz5jeg1rfbuu293w8tvhuu2h41imggh1vtmkzf7sq4s8ka988lqod2f92b177htog7maoc00dzruk2ah9a828ryz0w10boe4oohi7ct9r',
                remotePort: 5592510468,
                directory: 'lvsp68js2tmbn5h3zz887vyjw8a0iyujnidv6cdgqbsd12vp47gbcyaw3mtenq7yxez8rolze22swtbigcqjjoy0mhnn88wparsowzyh1o6b6zefwlbr7m74rdcxrmodmn1f4cohmdk8nry1hjnc56yax2zg0pjpww51fhzp8fn1eu44ws0jsrhfhc7etfh4hyqvx0ox48mue6fyhvawdu73kp1e1t5j19gx31xhj0ua8ansjcgto6pxdgfoio4q08cr9rnc9dm19kigeqzo2mjhvzpiv02mmtdcugrrpzb2709vkj4sfmczavq5c1s0fy02fdl5axjq94aw75edt5colblyk91stjahcue9tsnjn6x3gi0pybtdxavpuw9bcsvdy7ubpuyy0j32yss7oz9xmp7pbllh8mde8rure1bl9g1mvqei27qyk3fqex5c88ff9h24si2e0uyset71848knqwut69r6onyqs9ngtx7j6iujgeovve66pjno14jeh8q1dr4ti7aiedietynq9dln4a0bpcm3b0eibses9sgu74xipovwgze16ull79826ag3kwfs4iaaehe2vkxz0f89xz9ep9v80l0hn4e8kib8fxx41whummv0vc1rlparumc74khyqur9jc1hp1b848soivn8m8a6a1tbnm55ur7w8l242s865nhr9s9uheasqmcrqozp5oq73bjl46gvlqrlzudqaylyvqktt7a3czq37jnjpiwzat1vj6apvsw5td9lfuqkluqchqu3weydkseez9gw4r9h63uivj8atds7707x94s6k18gdjl3gcbir6ikvkdj0bk2ao6644hmclzwktutxcvj4sxmh69yxy91jqsmiar216ppopwqj9654gr4e2z8zhcibpys5otzm9748kwacmvukhcvnjzftsd26pad0vchqce36u0ne74ibafioaijqio0pu1z1886gesqiknrk2x18ztp79cf7bze5q8fvigp4sltcfr3xal',
                fileSchema: 'm7b36wbejenmudgtb88pf1xe1l8gkrctn3e6pnccaqwamg5m42knl1t6wfhslfwphlhb34xxskze5xs680vwtebm5e7yaojbis795vmxiizivrw1j2k72l1rdm8ugtm25jqg7wyqdci6ogdi67hov6jiqz4s4u1vf62qi2ek9gdlu5jq16bgig5g0kfs78mgzh4xrsbyygdc9uwrwaj1wdr8rl5ykg4ijnkk38btn3qvwq9agxjkxatoq1va43n54xlwf56bt6osfdoyyj8zuim7bf0i66dltwkaqn4dl0r3bn9fbdcdbj216mgurp8zjbtcyr3rgnpqz6pl2oh1ibfawo61yswlfbsea5lvqgp44dxpsllj9ger6iimcb9ljjw5v8buw0nmnu16di0zqfz8o3zwn0nhu5hp2zrdhvg8vm4fsao3w7ty70uv6cpa4449pwlemup40iibkp39svsf4yn0zc4s727g3diao9g63xqsz9vkge6w629g34riw0tlo84u0885p33l2n08a1sjgzewxwu5ka86lwgs8a2s3l9pz9mz6pjwtqo4y38kjk8gha3temcysbwy6bofzjdxv4fk8z60zqb4qhsecgwq4bpl53qloo7bzmn3xe9dso9i110nq20wchn5qic6cvdr4z9kw6ghptam8n1jsjawv3w801rknq65sylffqj4lwm9djqvv73opy7d5lph6h49tznlgmy761ek7v7j4tbyi3xwtdvo3awvn7s86iuxpu3h9gqem6dt1vvhixmvsq25xgsx5o1iuijcilrx9z1ydqe8kjv9wx728ila0x21ucp6phze2t8tsdhausrn5fe75m7mm8ehflrg00yphy1q989ju3b3r1wvojqrd7zxhylthnplpcsh2y17kn4f1ezl5e4v8jm2iftvoqvo00jvp3dtcfojsycird9snm7zyh44x2y7j4oogr6gm6srswal9vdgkmhfo05azjohltonkcfu4ylcg3niiw7wdzhc',
                proxyHost: 'stnqpc6ft6wu58k7p1j9hidfsny7viji2syurz7gf9kts5bnqih2rgsbjzsl',
                proxyPort: 5903662420,
                destination: 'f251pzvc7dayoqii6yqehq3bkrhedpj7zsid4of6zth80zsd9stnes9j57o0wgq967tumaz150xppbdwcki0mmxecgsyi884ldv2mgbudsfbs0q5yszcar1b8vs9rvuba178a44rh45ja64bt2cl9ivuwtbu4tvi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'x9b0qxwqz13d19owbd75easi5xira88um9il0rmsdmteox4kpmly4b9yfpyiakbe56sj0vradt3p7g7970dbb7vi13m1mcnof1kiqyhlsv8euw3c9gj34sn0oiicxps2c4k7xgndr1r998fbpp4qnwl5jq05sxku',
                responsibleUserAccountName: 'am5bbq8zoru4iw26d9oh',
                lastChangeUserAccount: 'haij75udkzafx7kxerof',
                lastChangedAt: '2020-10-16 05:20:27',
                riInterfaceName: '30xt75c2bi341pvqyl7nbyfbdfh6id5qwyumriayvse3ltn927tlzrtt0r6e6y908r7728x2zh0meayr1a0nopjnki9v9cfjcplaz6fkr3cxi90j1o0ofbvc1cvl0vz5mp8v0d8sweg3l6u338gx9fhkp196w9v1',
                riInterfaceNamespace: 'mgenbljneg10ebhro78kt0o1vu0rtk949ogwhangc8ntom9j28xqep4w3ph28uxdstu0b08ba4gqlexj0ojzubn69opdaxzl4m42gb50sderc7xvd5wgj1xdniabnbbswq5nc41usmsvzh44gacwmmf6uohouq8d',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '1xisejcjlfgm9rrgjxgxjh9xyrb3rip0w34xszeh',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'srspd1sd5a70m4b57g7ws4uuakr2qu9njzptyilbd8gr4lrbjp',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'kbnp2016d5i3umvh3zuv',
                party: '8i1e0d8f54q54zn4sdkfnoc81usteqqg81zahztdehb1omj13gcqx0w57be9swgg39n8b712tj2v54779a96z6umzcbefpuis4hfaonp9dro5trnb8xsirb6vpjwh7dsyv3nl9u7tfrlafguonfheziljc6cqkvm',
                component: 'ev8iqn4802qkdlx7xqjp7jslf7ht9mmw8iif3ay1oq9hnmuoqgjmltetxh4xw43acy9bmmtrevlhjjss439q9a599tcsibg9t15nrnel1221rct209wfu1ffx46mfoygb9dc36u5raltwpu67x6wlbikmmaw1z85',
                
                flowHash: 'p6zc8akgqltk4aau5xqcg85peydmiybrmi4dz77g',
                flowParty: 'so5jf0d0kwx7wybz9znyzgxgj5gfxso69ujgu8zhcg8ncqj4lz9bk4qrmlu2ys1oq92qmws92f6zn6hijjlfdxx77yyya2emf64yudt9oimb9aayigz9qjfdsk3tfkyrivhe6lkvymyaz1folq53t31833s666ej',
                flowReceiverParty: 'd0fayr8ezbp2ngad0peftppos32waus05gahp7ly9d0x71shr0ml5wn458rr19wlvxvtyu7vydg0utv4n7jykyxuz76gadjrsqxi11hzr86193wzbyu52jxytxfkl53czaej28v9h9siz753n9pqm2chnl0cpjj8',
                flowComponent: 'f8thwhsbtt0sda8ydlhpwvuztu5vod3oj6fum5gyxxi0o2b2kvqoya5d0qvy8zwzyfs4s8v9xsblm4cx79wu6uqqnv4kkn4ptt8jbcnsl6vshevqyqqseex2fm7g8ahegtfdf9d66u4ywo1wr73qer7ad9b5hxnd',
                flowReceiverComponent: '71rlh8ezgzplddecbwbgu79e4a9ab9dvs6lffuspanrr74lb4qh5z9t13ou9t2xisq8gq3m6pczer43slsf7er6s4gulzlni3rhujhwj9vpwjah2fi4veog2de8g83fgagzulw9wjgkq1zrugasdfp3sedre3d61',
                flowInterfaceName: '1avcag581vf25jsx5g2ix1hz1hrb50f46ol6hkziopu0b4gz5a271xn542ulc7d2v2ju5t6pgipdj1274on7sn4bak6hr1u0z7nvrnbs1uiuv8ppp0pody1i49cehzgemdjnzga4emkdr9581vofiy44nrx0s863',
                flowInterfaceNamespace: 'ufro7w7mtso9kce8yy7j837k12nw1ebe81b38avt24upws6qdqe2kvec498d1hhowiwvawmtxgqrn54ziuptt1f4aoeqp8y7239snxbm4di13mbzou5xfhadwx3rdytb5lfzfaexyofg8bfuv5og9ocyq3gqpk43',
                version: 'duswoeyliwb0e6ho1vey',
                adapterType: 'ne8mm21a9skfphzrajm2ocx7n2ygsqlxatnfq613hxki4lgn73sx3vekgn7l',
                direction: 'SENDER',
                transportProtocol: '4w2hkx01jlut0lpsmzbk35khvxpj5vt7g69c4xaniiy6xggqxgs31m6clnw4',
                messageProtocol: '5m098k9kyit59nlvt52m2y04p71frstwsqrvyzvhgnx1sxqj0ggk6zonx65i',
                adapterEngineName: 'sbjpkma3pqqmu39kl143n089fkiiuo2r0kbyx3avh1w89bpfi05ef6y6t1px8jldpav2tyuzsslu87fnpd6kzr3e64agv5889iasdhovjsy41giic8b8iwq9xm621vx2m42a0h962qbtx04gkppx5n97z3owqj0x',
                url: '2wko5jjtpnm428olg5ypf5x3tedfueqxnxtsgs3kbf0sg2r0f1xfeqjjcjo9fulf7627rn9ebf441ygngke6gdix61p01avx284ksdblqqkba6b2nni2aaic04skac28plilepy3gtml88704opl3vbzoq12d7xcpie8fm17z5dkooai4iqfvyzr6w6wqrgi315q3ucx814ksmabqhdjxzsve1h5x89kuss9kqwiueq6lvic3xi4ax3zjfyx1x2glg875rf5ywrx1z4jgqgjwrcmeo94gfq4r6dnfj0tcgv4ar865cxn0sfkwgd6hi4d',
                username: 'onxvl7p951zhcteyfz1o7g2xmpwyqzxcr68d474wt7pxc3bbcgi43msm2fa1',
                remoteHost: '32grfzmpgpai5svog0fur9kbx14gr7rrkvmy26iq30jwx7n6kbehvvri0wenfzjditnft3cvjyldye8cta3e1290mgzfl9jfaw9c4id5uu9or3obu0q3z3tolw73a1p7weho2fwc9pevyhwld20s0r5igyw2v0rw',
                remotePort: 2301311277,
                directory: 'um5h9nitqnlspaboixepsr6bhueo8uvk86l41934i5rjkl637ence61h98ywzgz50n89ki3txhbmpa4gn7kf6bx8p3rs5wd8ajne82zdccdkkl9b63a2hptaedispz3bsvsyp01bxgo2tbhbmqasdqat66bzigdceoaewkfresqrdqgcvq9oza7oyz2lb5hclmxdwkcr9fqtq1qvbkklyaxt1gukr2v22p14z1jlsenk5z95ar37pa9hauu49khzt4sjtibgzg1mfwfntc84blzpek1u3of16uz3n7mwmdakhfq8r4sdpbbvtodljgry9ek0tlpcjojec9jftplfgwo0ze82qiq3npn8etsayj0hux78ogoz39gsqolqino27vcf46oau8ln929eaca6e88bftlq5dbpuyegyh1szt4348b4sccvzlas7w10skb7eopon9uy93jdgs2n860tl9h28fik4f9oj9c3biqd6uz1tjazr8ccy0z1ownx0s8qtzbtvlkmtuulvkmjx72hnp2p0gwq6519bbb1hep7acgbolwbrwbssfhzmj5kz7hc9gxu1xwd9tdimoe31fqfzacgidj0tsj8b1rwf7id9k40mnc08er28rzlepzhav6j3uo3mf0ob6ivt7qagbgy6uda0gnok2h4ufkow01f0oiyqhr1ti1fu465rctm1te60buczenn4oxlx47bt1q64in05t46b7zvijpc5td87azz47ulqsln8vv8unrvr04payvlnq3kiwxlzz8yz6fximp9tbhify5iniyrvjj20dnpv69g0hxicmcp85wq5kahd47ax2glea6zpnralueyk9zztbu3ubxknsdd6hi1tr7toso3gfeqnud7wlxf7bvdxzdp2mlo3ualaclpudjhvbza749bkypsy4uj3t4e68go4bgbgc21bchzozpi1ki81ecurdpl2k4t5n3oobbh5glu38n5rb1im017mxor3nkruzs99yoivhhiuswxwe5l',
                fileSchema: 'e66vu2rly3nj21o5e60tbsohwh0ycglairvsfq1jw5akf9fywco8ienegedudvgxcsrx5uuxsk3ndyxs7xtgv6duz0keaee24bi9qrcw4ozrze3t2m5td5pz8uiqc8i1ysljzygc3z4b02r4lcq6i26cojotpbjn9xu4y1rmiwbcz79u7uqmi9nav3ijfv47gqn5af2293ghxqn8enuugxq4ymj7en9xz564xav43gh7pl1hizyz973v6ovg6uehljh7s90cx3oeqtrbztf0q7pm6beos9gwrfgjvw8ql42mmx3l6ovtydoyve4aa4dqhj9ojpn6flalntymf3vialeucxcduq2ozv43na4qxdaaih9vkficdsshfd9y4vgi3vj4d97068gvn7cynv8h2rct5amn4ppp6th7sn0i19q0cbjxvtt4l22dpz45r01dhyy3yq5b7l8m0pdtnxp9p6im0xe3f7iyig0qbl39seq8kfjmg0l2t8av39odwjb7a4k8c4m3vi5m4m1425b9ry0u1dzmfz2opwnp0mejim1xbbpeyapny26vfa7g7pvwp35gtbwwtzom2ou6pq9dv16tki37rwc4edf3dc5pukzrkdhmezh8liiefp7xyduht4fy1yu6cguc41orgd6oa82v48ormy1ew6kbhrofu3ujaopd2lqvuqowtkz6dkdxnqd7310vcxgwk9l1p0uue6qulfwsp85iqfnfuqgytllcuqgyk835vqwxmzjl7wimotsjrc4n0mcg3df1bc84129cbbz5j4rhd1en956nkac2b0kspeeevk3bkr8qy3xlammy35lkfzilxh2rr282gwcviqq4k3yupl69bqb2hktxuss2ntro4920wroox0zu01zkhmie568fulq0vhxtmqarqyc2jotajsah17lzrozduqt0vi0jjyz5azo4cfmnm2m2n7jec43xe4jvlr6c3xqsr6x12r21a7vieoewduxepsfrs4d361yh1vll0cla',
                proxyHost: 'ex7rcvn5irmaz9ilchh4r05f9d11adtagewh6uimsf13h61r8gnxnjjrx77f',
                proxyPort: 3044511137,
                destination: 'hc973qy8nkyi86r136ov16mim0mmldu8ubr5ysmqphq7g7z6octm51rqt2mzoqmv3l1dwyo01iuwpejt8h3mityjymywzkje9s180htwhdq4eqvpgqpy9qa9felxgiykkg8ybyi3ck4otlxpfkyvwnzbpahlyzwm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6y7ifnnsxd6uf1zc6z09rqugtz871svwjthtg89uah485ng7ou2t61oz6w8djl7x0ru1h4ce4ijqw7r9mhzcie3ms44kuki2pmvmdpsoh97cjz0rdbk7j0bedvsa7ygka3s6p7msotfz5qydmp7rqsjpguv5ctam',
                responsibleUserAccountName: 'byilgj0kb22h7sz2ubo3',
                lastChangeUserAccount: 'tefhr3eeh9g3u93kn0t4',
                lastChangedAt: '2020-10-16 06:42:05',
                riInterfaceName: 'f8gohz55au7tfoplg7i5kcbk9eq2mxrt5g9lpl9qp0d8cxltz79voxidu2pwcsdu60ont8iv2070y9jhmmssawhsyaxvovzm4bzu4xjbnzjj2wwaqa10gntka8ndnlwekyj8m3cn4acgdmx7wkrxn2wbak4flgjy',
                riInterfaceNamespace: '1j9pcei5695v7jz5ba4fqjbhw51i6stt0v16z4ora4f1ql438m1wt4bc5ug9ie1u3mmamaj9bnp1cp5pvbbahq7u9z4sdaf87obdjeyesgaphv31ksu5452vywiraj9p92f01f15jpdplsm4ygaaomkujwb1jovx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'm4s1wvk3ldv1h2j4ffp9yfsxdts9e9ayhls2e',
                hash: '2tz51w6akqb0zg3pfdcpk4k5dcqnwswtgog7686e',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'xzax16x3o53edb0ge1e0h7j7isotcnotr6ei13iiepvhjc6wh6',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '0wz4fdckag0afu03e8jg',
                party: '6p43gp14ihh317um62rse92jb3zwsx3hn6h48jofnrdppy65m1pceyz6qmnxslmap3k6st1nbza5t582p5hjai1utnfr7u8j4mq4tzbfevnjj4nm8duhfrqa3ewtouvm9v9j1wuovn47wo14gdo1lwczgfir9ljw',
                component: '5avmvmvfg551xtewdjj5yng6upr8rxls97tu0xxfs1xkxkr0ehg8xdkjn85t6g8zequmylj69sng4lgftfrwj6lfxw8klvq2oik5ia9i7l8b2c3uhwnqplq9o5fz5lke9csuvf2cqgaswbhz78fmvvmk7xs8l9ry',
                name: '6rui1reb8gj5fnwe0sl19oy15u0fh3fkkq8cl05yqtedv9avq3znw88n5g0z9i1eqhx87qsubnqeicmm2vr7mte3c22vwbu34l4trw9ixnjorttajzd9fpmfxguv1sf9wwiyg2bk18qkgvjq8701wu8sffooqflf',
                flowHash: '2iul34ypuwp1aty0gqeed62nh1dwn0crphxmaqyr',
                flowParty: 'sq3ga36cq63po1ge6m9plpey462ss6vvlkx5mh97soezohcvpbdvlngyt6mn0l9l6imyzpspa4wl43c31ozzrr9yroj4y80uo56oljpdno09ogizb115kcscrpwsc8gk2ww31xc410lwsbnr2vguekldjgk3juxq',
                flowReceiverParty: '4xvstfxvdbiyymhw2ixaqcg7umftpc6lifaso5g36sk44hrco1tb4f66n6l9qnh8rr9384ed4c7tt7g0yvn7soz3ww1tgqaa513ngmsfuhuexv6x85bjcij2idcposkbpjq88upirxamqczhfqhcriwk3u2em3cg',
                flowComponent: '3d00v7k5nwix7h4wf3x2xxxg8w1x4u35f707x1fy2q6tizfhhg2ob3ivwzk1xdangvmoyd3mdkndll411mc3uv0m7upicf9zduhi1w0bca6y3olzy5g0y19kvpq1jyx0iyklk8um8rvo3yesd3cbpwciaxpuvsx3',
                flowReceiverComponent: 'xxfb9463uv7cxsb15vedhks6bwzkqpxzmuwfznp3aqk0ojbsm18zrtadujarxckc84sjyswaqo65ypcg8yhyzauw4bwhrvcsgxvpwk0yq3owbj24hv60zkwffaz0r17hqpr2in9l69hqvzvthfmlchivdxbzbh2v',
                flowInterfaceName: 'ol7tvytox54bbgcdbfphlfby4mmnpq4xs0a0jso9vqj74n2xco4g21mxt2mdru6rjtksvf63phg9wev555imw3yykbsnatqjxoe1zj6u97a22i5ozzvye8ihrd6mb6vfm6c19qdanqfgtqut3vjwicxjgqqfodz2',
                flowInterfaceNamespace: 'r8fbyacrrtik1lnq3sjbycm4hejumuye4pjfaztdsa3p1unf3fvysk74na8flqg014qz6fvfp2lyyvrg6vrjrqzutnjt1olib2s2kg8ok8881jg2fs5pbwwvp010gq4wxadpyty4hbbbn02s9ym5ezwdply5rmor',
                version: '393wam8yshwg2tmnsctt',
                adapterType: '0xvbw1n1rclhxlq65kfjgzkr9j1utsykc3va80ovz67ywor4l64pjkeryxsu',
                direction: 'SENDER',
                transportProtocol: 'e1cah813vatpn4up7foa58iwsgbfjglxvtbqe244qqd09335acpj52a4r4k6',
                messageProtocol: 'g4xxnq9erye8gvpzchlkr5ywofvsyh9qrtsqgqwegp2l9dlkj58spsk2xif3',
                adapterEngineName: 'foes81o9pwxpyxq9m8mz3cn6ez60q3cv84i7oi96wvxoy6gwloqk1rqwwquok4f3xlb9xx7yu2q9errecj67oum22v7dspl1yhnj8ek78011mastq0k6vyi03e7a1zme7ax0q3ojqw67w13j9avtwruj2titmxlu',
                url: 'ezsz2k19go9vuwkzgws7lk9uod49irx4mci71ms5rombh4slxxbesh6gkz71go6rf4er9sqwnvhpuap3pvjm48yr7bdqwl49mys979hqag0wytef49bp21u653j3en2iwfyew7jvdoxskzrqafdpshlzl2w2y9h12j327mig8rxea41awd6q06j8brajabl5osvhuztjfdxsgslzmme8rgsda9kp5c9q2xzx476309rkmrmw5ovf43sbqbi4wvgbpbpp6psycz760qs8a22ohibapvg2ma6gky00fbuu4a7d28z0te1l8xwpxs5bqlaf',
                username: 'a2skymmkvysshznwc5430hb9j26x16rmhe6ch6k7x9mzn6w0actphr5y2bv4',
                remoteHost: 'kxjev0uswwld0meh18qiy8n4blhyk6iqe0cpb9vx1wdfstgz71zvfuplmz18hb2dr3fjxzllvplwb5a3y9e9p0qnou0qii01dvk94vy3lh45zy2hxsgum7b593m8y7p2ak7pdx6txts88pzwhysew45futuxeiqt',
                remotePort: 8935518022,
                directory: 'lkaytkp0jxi4ed6811g4z5n5djgc8rfgbp801tq70go62zpmtu45c1d0j8gzfrf7o36c4f6rvw00r8wszqviyapgd2p9q1t2wr5whl28vku7lxotd701k8ws6d1gsoi83gu734nge2szy5t0ypa2b3x6m4xf5qdtuq8idatzmfahpcsb8h8r6yldpi2hcwo1blx4lxh8u6m0ri7yes02rmgbgpj1nzf4i3ad529b7l3lf5xebnkxmqtveeo9gmr6kgy745htvuonepmtpsywp23eipmxk5hjhb8xk26dkclkcxcwzphmu0fpsawotfweoo7t6jcn4h4wcvqn39nmlbdqd3c0zj1jwx2d1hjfivdmsa9lrzeur5zk6or3nrkx8t0vihcjml3xl5j7r6n87yqekst65mu54378lmbs5hzllgoayyzqvfh6f8c3vdt00q9k7kxarre5k8wke5fhwqwevy0xd0wg9fojwnub6m2awwy118wjekna4ye4k6bg5hucu3mn6y73fj29bh0b6c4ll8p1dxfc0ptbcnpaq6kk7sj36vfwlnd3sce1bce0o7tnnztjkt82fi1ryc9k6afwdno1mu8ft25786arwrwwkhjtuykps1v9neolrk1h5aakhtwff0ptne0285h33t1ly9iym01tsz2hgvjjxigql0twttwuq1e00eqdjxvc97k5xqc3x06ajfwxe60t7kywavkgz3pb9982rr4u9x0sef4zjbdxeze8bglzz7nkpyjgf4ndahm5jl36ssjhtn6by8eu0ngg0we01j6o4zothy7ovgspjnsnri09mtq5mp4jlplk5zdh70n8pm4rlbtb5zi6zco8vhhds9ojac3w0ruvckf8psmkyv6h9phyyjvglqiwolw3vzl7gnxp9e8imtw0t7aoh4ka42yiujbmp7x3nqvrsd11d3vlkfacszuovg1gr358l9x7ym4b9jj2e4ac8dun4oxj4v5d7p3dpeayu47r3ofyis2wkjzr',
                fileSchema: 'mhlx377xn3tbapywki7xko2ar0qdj75myvvyb99hx8i30od10cvpuvbj2ehaqygmw12wv5xgb64faxhgixwmg9gppv5ogz3vfysmbxmo3m4kpe8oihio3ruj264kvok72em16ws4aiji3wj2b0xznag2vt8t5ip3hy9zqxlqqur8d3krg7srwgaxy3651r9d4u9ivu7y1u1u7bc6dz2fof4opwpvgbr9l1rbsvzfg5wxmrlx9r6qo89nqjfss0ufusxcbovvxp8v3eehy57tkrtrwjknpd93zn5qokucgkey41ed47x849u8lsxbdohy1t8ifbvgb9ljfokfdh7q5j8secyr1m93n6gedtf6z24pxjwxlvdx22f74fezpn56hg7wucnbc9h2donosskpvilcjzi6pprzqffqjf8ztbwcphczh2gx3v4dixwwyy28klfxcrjfslacjqof2rjq83eupkjh0yrz5r3m78faw7pwa5htu4cw81k6wncchnul3noli2tgvxhuh2mrjco680o7h72eptyki8gx85lht7nek59ollvmk4kzocgvayp2vm1xy6kxy28xynzoanq4o7d33ltokhl1o6xrvgtm6zy2io37w0eygfe4fua6wnyz5sgis6yxnvx62nx3aj78556i55azj40v03qnioehihfe0ttqxe3o29c6fzsbcvs2x5e5bt7jl71y9lzycalkzdjr76tr08fgl4ns3erpjdw1kfcbue2ual5u0tns4feey6lemry5ha4d0y2k1sdkhe9hufy8zgadnbozy4mgskqdrd99a2oh7jalfifrykv0efguuu4a35bqijzhp6666pili7dhfbjtkt906debo8skk9elqu2umf2ly890ksi1ee4mdetc61z0x4hplqoxfdipb5kgxwgwobk31zojfvlc7xn8ba672v1p93tscdwwcfp9d3pv7bmhoeg1emfpgtsvrax6op0bwjr7sxeo7ya4r2v8lgvsxowubogfbo8b',
                proxyHost: 'dlh2ycczfz8lgetorwtkru6oe8ahimqu3yrdsrnqwytzxkgvxqtcqq2m2ssi',
                proxyPort: 4227854623,
                destination: 'k3pqfujg38ujn9pmedha4b7ynsondqpl2os6sv21whnpwdac8vs1cfbsr96xzth7zwupy4y7g30nex9x0dyp8tg7citc63d3o7ey6zurzvu2cu7acq26zpndppfhum8o8gwputyxoht616f3v094yc39uy2gw7ob',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7a091zpl82yjan4pievw9x8a66xd3olrhlq6ygl9ludu5x9nqbkjvwurr0gee2sxpy66qwjo1sefdbystt0un02alxnqa8q9b6j4jrijev73evitita8wn9tsow0nr9vno4lgg9cc5sfulrhsvhg7f8s2t1gctm0',
                responsibleUserAccountName: 'b0ibqonp7toauzr7cr2v',
                lastChangeUserAccount: 'rosu2giacma51vrndu09',
                lastChangedAt: '2020-10-16 17:52:13',
                riInterfaceName: 'extzfv3qes0dvzssepm0w9f3fxttb9ni31endccno3kq4phwp5k0kkdhlzs2zp3ab8go3oa16c2upb855edst7trc5ze82da81py59hb7dmevobywechbgkc2m03o4lwd3fp3qgagff6bm12e2b3wqq59yb583g1',
                riInterfaceNamespace: 'aqe54elwq06ubm22qh08bsd6sp1cck1u884h3khdkqjdht486mk4kzqayf0l6vqzyl0wo3jab5dossh4w5h9gtyz7ghgsslseyox6ufkbnz7qtx62cgio45vhg705yivhfeubyo7tkzky51a9tsxj7blqx27fi4z',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '6iojwxzv86vuz4sgv4j669p3mbsb5xg6jqyrpum54',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'dmx70fnz7bvezc21dp5mjkulca3ctbi4sv988rm6ppkxscnwh5',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'j1cqap5qmwd30wbs87zc',
                party: '53khb34b3iw9n1r2vbr1ixzrgvkynz80qd47lyy1gkb4koy86g8f3gt0tehyhczy95loebxpxxtds4wy5ss9t1tj7hjdl44vmvgcsib3jdgtmkmz9hnxu5rzmy45m50twmb4l4nu8wshr60455wrq0co8lrjy8rf',
                component: '6n6ki198ke4jy5kow5h4ku3e3mlzd64zz2ytm7ktrwmmhlfd7x4neq2925j77zx2sakg2c8jnm1obpbuv1vuv5iyj428jzv1ewwjhv5pvvwvallkghjeyq2pbiizsc5qbuimrkdey7f0p1m0vpemdqt7kbnx7i8e',
                name: '8anv46w912t3mpcldgrs08pt1hq6vef7pcbve8qmlfpj5t93f54wl6cf64lh7ag5synrgct9k9d1t3cx6v690kkuya1kl2881il9ow8jzp724kapyi1z0ucpdvef9qu1onu8jnrf43mwe85iepuwrca816dj3t2e',
                flowHash: 'maen5ghwo2ot84uhk3k4zef6qjbepuuvhebt0jtx',
                flowParty: 'n2ppxmvo5vcsp4qkmheydvno69l4chip69d9n91acgau86562z9gftz4cdxitekgiugo20q5qj3bs2wjl1jm6jrw620z8hpoapehjdtgbrquwoma3lpo9goyck3qug5atjh10ncy2n6t9a3s1pxhy35w69c3hi5p',
                flowReceiverParty: 'mn3p57rzxytefgv71qllw5zbn7yzgtizt16cthyh9zw6pro7wli0k6z5p187vuhobisyuvie7ehjpvx21nj25v52ic1wkq4oihaaehwrclw9wmx6p0rvvsindileum1ai61vpccmrt9d4az2d23xk5ob2d0vd913',
                flowComponent: 'wndxlk58lwhyw4uy6ofmji0skzkr6a90cs9c0t4otqxyuop949bmntgwsnyoxwth5a1oogs57kwabqoy5atjxk89eclp4p0xcrl82jxnxqmsqjw7ks5v77cxaxps1nzl4d1j7t9ahah54dmvs48dhpn7sk2bbvrk',
                flowReceiverComponent: '4dzquqee3s4ikmogzg51jveuyuyjwp3sh050oe0lbgujyoerh07n9np5qpu6bsqx8sipa4zdyec6cuy24afmqxhurwax7rdlhvmqdq8dp5bz5r0gsarcsykn61fu0wbpa6bnu868x06yr1t223apdgqnh2i8d8xr',
                flowInterfaceName: 'uf0vchsbriuu6g3xoyq9qpaqy36n1ebz6llsmdh5po8awcfwbjgkwyq8n3cupvqh6qzmsiq83xn07kj0zpt5pjxqbtt2jqlaii0basr8rig7yg6yuomdidmkblkw7yhr35gy2yyginsorltccfv2yiq0itjv2lwd',
                flowInterfaceNamespace: 'to69ftkzau7o703fye33ugowzgdv5r4i04j036tjaathav9taxzzhxo3ids035atljqmjcji2v9dmasb6dtfnpku676l69mzlvybel70656meyljghvlv39f99jzc92x74hmf47fnafbyr3xk2zg4g62m6slcaww',
                version: '95tvswbirszociyn2bsg',
                adapterType: '1q1o4gplke3uhr9arvxsvn0ypadvv1itm2mqswqex2zz5018ilmag5c9xhu3',
                direction: 'RECEIVER',
                transportProtocol: '4x1n4x1rsdnjx0godsceb3sfkjxnw28yhoy3uoeoaw2kxkyqezicp4s508r0',
                messageProtocol: 'te5c1wem8fhwmxfo5jrf6o99maeqklohshukd51rmirrhloxozlivuq5ejlp',
                adapterEngineName: 'ygnzh92j60c8nldb21q9bxklcgk17zux867ft5lfttfbas4tq1385du5l43mlijuhe40ksym43jdbb63ddcmz36f0hry4pbo2ugfjrcnity1y3fopeqqvi2z9qo9zdbyzn8mso48o0mqxd2stjdr7w6dzucs9pi7',
                url: 'sg7mw0omwtaaznnxx2ce73lgzft1291aqdurt3rjsltdg2r1u4zc6xaxaqzhr35yhsn1q5mjxj12nsmohonh99dzrie4mrltm6kd77lghm1g2xcfmmpsj77admzw7gsqh47gqeu702ka7xtz83fcovy7g2lz8b4m6o29latkyjg65rdc3nb50bvcpk23e49j3lfswbgmdlbrw1n6ipj988ez1w66nx6fhor8le9lbcm2k63rq20yjj4z6dtpcbcjjv0x4eiuxhx7jn9f6x3qi95mk89tkd751rb9qmdmefp9a87ewconw648ns8gn94l',
                username: 'q01ytgqjegmidexz0y2qyu2cl6m3ru62rvfyelqrnghfu9vii270u5plb534',
                remoteHost: 'rnpvuk8107b8hn9bdsa3uhf7531p4zzlfo4vp1ls2t7lzs27rhd2ddfsv7q4l6f6y6vuujjog9apscy6uyg9msybpk27290o31xbjxqzvj6wbimtu1mxj2y92chcmh3vcea49j9kl17jy2xpm8exs3ge56pm5qap',
                remotePort: 7139898362,
                directory: 'fen8ki2wn2kddqq2aes4i0qvnnuwaancvd14x42xfitt16hpcbw68oamkg59kg1gvmr1c9fl8x5jrby53k4pmhfn37ypnj7lu9qawapxrthpmluo9lb7umfeeuieyg2qm7c0pmcwryafs3debt8pfa0dxrutjxs5rvy4s4zn8iec54mcug81j3hpl3w97qutyc5e5l4ajumyul3xebrum6j4y59tbe3cflgu569a51fxojz5w64oe6dmsjv0h2ke1kybxy0gql09tjxciw6zu9r39e0ot1iujjfa5qkrbo5u28ijxh858ywa6kbjgc20tnekn7dj3wx4w02pibf0gan6eisms3z1m254pfqav306yqhxfov42k45ctbmnyhxxvflfb8f4wbov73b11lxsjptzpmpufm62wuv50xuqtqv3m4iy0r7e9f9977bdi7i0pt9e1w2bvtc984en3mdkjsyavm4bz70tukcmsjznprxs65vqwdzqazcdk7xu0z0nbs4efbzb40p7sa2vkzdunomta6bzwtwcl6otlyo6rhqjowat2xotdiym7ng0ly941i5rej9zkxb0pebsx35j6lxu9xdpymtj58w3xd2xca73l46t1go192b5fnp5o5kth8oqo29huogonuu62gjwr1lqciap7xq7wgj6nt7eht7he8zg9gji7nj225ylj2zqn3j23f8g22n8iamsmjylz3zwju2xe8k111dvbzamk8znbnc2kkfp38haw9tljpejl8lwvwn9msdt3rhrhw745n8kisao06bswulpa2v6qnuijojj3kbq7et2kwu9inr7q5vlcuyc5jupgo1b2dxcc7wa774ilesf7q6h9xtiw1bgncfcorukt4hfh8f9w5xjvt7m5ltwd0cl8ejh3wvsn2abjr4rzbq9s105jjeyxqdhvnzlqhrxr4xa4wmfhyvbhat02kz16ab0xqkagdrr9itp0hpixw9pstjke4qsdnzlqcvrs63uss8pmamgslo',
                fileSchema: 'uxwk6i0qt9zej7vfif2dptv87fqsp7tifynjl4c79ozovavhdsjbr1xre2x580eebjlvhp4y1o2d6j5unb45y2ht97oh8y8mwkrgqjae3o0mh8w3yklodgz0k8eezjeg0o8kqjxd1qtwqp8ptwj9z3yl8xfw4ak5omk7auqz7mfs7pu95pm8yns3pyw8ci7y803gaxargj3r9t3014k58d8rqj5s6jn2qupyfzobbz0azfecvgwl8vp5hbr9hmgzfmajtj7st1ckx4lnb2d8e1wfc507prpd69dml8iw82tfal72wkbicdm7ljqzqsyo6jy6a3mqktseh3iedxsf0y1krckw89g2sap3mu8x6xipgeh9lvfxsoyrn8zbtvyu9t6jghmdvg24c0harcxie517nu8khcn7wps155290goatk4gwxdwifi1vkgi5nzq1nldar9tbwwtnv31bkqux72q205aglzidolkksgfibnx6bmg89ltu28vjp39kxehhljgtln1sgiww5su31e2a6icnevz0h0akyr73d360rtqfkc94xkn7ter7ygsh2mzofny3c8s587kvpe0pidpj61qlsjhryhevv56j9tsfycxqkns02va5oj7ai4z1g0lsjr8cao053e5wvq4avp7w4xxlea48g7m2kk5uke4vr0lmg6uscs5gpxfivgf40vserxhm4ee4z3gt3iz6ytindm3zctxaieq0fxjyjy9lvxhfkfn9fmjwapvltdcyl35fvg9ywct7ameymtsfqig00dje2fa0kity84pvai6k3gldyel3rqngan4e8u82fh99xwlggplik32y1692rsan537j6992kqahz939t7le2unguni0dkslb946qqk8wgsu7w9ms73kbb3kn6tbp9s5abetemrl0u6v04c7zkb7v5ylkfznd5wpfkdzj5orlvbbuvm9zrz4pcj0eq129h3hhabsopnqhnjtr1o21m969t4fh6neyivgeb5ngw38m42',
                proxyHost: '0yjzxxj4b6ycjxwsv8r7mde911243sabfeia0ezpkbln5vb0vaukoq91fiv7',
                proxyPort: 1378438909,
                destination: 'o0fgdg9sjgotj2nfgk4aympsr6ou864vq186b3kypg1ghlwkjw6e8ihr62em36da8ybo6u9n4ji2vl26ssrm702yx3nn20qewps84r5wmdjkemeaj7rz7yezhs1oknqz2hr9arew44u11celp0cy68qvu8srvovn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4jhauzol14dgni70r5py5mit3mgz4ogo6r6cel47m6gzltn3cittoek0h1993apneeyp75zp6zy69gbkdjgyyxlmyv7rsarwqlik7sivhzcnz2ti7ue5vt42px6wnipeqxwpyiyiuuif5v2rdvjnyp1gsko4iud9',
                responsibleUserAccountName: 'wcrmwhvsh5zu9ins2kxw',
                lastChangeUserAccount: '4ximz8jr21jf655am5hh',
                lastChangedAt: '2020-10-16 06:40:58',
                riInterfaceName: '0qd163uash6knl1cptg426scvda4sl5c2vcjj7zqk0s8pyq8hn4xt1jrkf6whlya7o5z4t4gu4dlw66xxlspbhfhw6u2lizyu0vlrp64d8zghi217l6dvb3qihscb31ese8l5v4gkpkz56detzd6r29lwyhifbuy',
                riInterfaceNamespace: 'q9x1nzafvwkqpm003eyzfv93h6dadxc4bnyz7osmoeb1p8n1l9pqh815n9oy6vtogw2mryzgnsclkzo7qtk903ttvkxmkt4eyhwp1dpswak1k1l8go97slcboqa7xbtfg7q6vr48rmgsh617x4buwavimzw63ya6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'zgcauny09jkqsshxhm258cm193gj3scp9mky213n',
                tenantId: 'ja1cy3jr8z5xclhv26jqv1i8grfqx3p4dp2e7',
                tenantCode: 'et3vd1ptr92hupeaps454to36px8vkyct100av96qi0hnwqwkw',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'akapit82xiq3b1jv0f73',
                party: '298943do272ebnin8pgm2s0g6e3tkmugoa6o8stivysroswjtbyflhycochvpb2146uvpk1hgbcct9i0hte0909ghc5cxeqcooiy0irnaaw0hzvc44wo8h5z8nsyz1689a63d8bujpnpjr9yyfbsylejbw4dius8',
                component: 'czqpdotyf93xkta98uy6mksxb00xnwytt6c18m5bcs9rna4q5ixfrxz4y4174nlbrw4lif42i9vqwv6ykypdgigpg8cwbowshd4oh3h74b1xigoitny76ucgiw809a0bztz7jagks0wymf8ui7iskbikmyv51zkc',
                name: 'nsw2czd3irbjl7ijpb3pg0yqma1eh98n4ys3ewvyjpcktznsj87rtqs0078vvg8lmxznqcvtshvkpet7daiekjs1408vyhdi8cvoqebvlsqt1jytpuis318q9ns3kjz6a837ue9wq9rhunszz9rcb0m0ncd3f5q9',
                flowHash: 'svfud16suk2sxrrqlhkuw8h4i3g4wqfs1cprln63',
                flowParty: 'wzybayg3yclw1bvauw4puqoorfhidc9qxo2mo8caoc4t74cz9fu1pl1orc46iflp5jf9lvbe86ecuuolxj7gxud0t54ylu33epin2900ckpo2nqwfrfbylq0qjxmik2v3439ksvyqnmsek8d563r6t9i0ezzoyn4',
                flowReceiverParty: '78n2tartd8iaqyhlsm2ozv8lnpko4qitbgodzmpn9bd3blutq0tgh4d6x8eul8hqcpid2udt734tkvejccrf5haldithg2hsauo7qrq473kaajxdo3hwvd5ffab6tgvg6c58jrkogt7hhqj3pnysxygo1s0mqs05',
                flowComponent: '4e1zecrq4jt1dlkff9viccayqt74m2n3m5g8q8tpe1m4dv8tu0lblgq1rvfrslhmn1lw58ow6gkhpb0cqufrjuaolultw4g4h8z2wrbdjadsnyax02mernpedexnrvmbmiw4qpjt4fn22rc5wt6m0ooapvimwzxh',
                flowReceiverComponent: 'nkbqoi0n6d5t9yccwwot69vnezc37z427afclsk9fpzca018bl4y66rqsl49tvktoow7zgno7d2kpznlqbj3ui6pqmhq25vmmxjjmzpbh6rq7jcg807aohawff99klnnr8s2fd9x1mk426sort7o06076ezkiw6f',
                flowInterfaceName: '3iw038ar0dd5dnvrhct7dgfj9olpiczm2pmptpgv9g7bnq3qavsvso3brbdzqc8d2cpwa0vuqv5i7j8pyd4iivy4w8uecn61bcpl16t6nr3ww2tl34rwzuvt2z3e7hqkcmfarvusmjxm4rak393wid5ve63gmqbv',
                flowInterfaceNamespace: 'l0xvps7bziv8yoslidxpeiqlrwmrijwy0tm87uvh25mkmdzrs0inkergivap9kvxl1xyrpkyi5xh3wymyh75rqtex7kfn42d0magslrv6wtl15nhdk11yzu9e0w9sbclpj22vuc3rzwdanmfgm7chtny67fcdp0a',
                version: '23b1br1176gl1ghydu3r',
                adapterType: 'y67jy1ai7ze7zlsggsyif9je1hc6syuq3470tyl5ezuwlqn46nf26mfswdts',
                direction: 'SENDER',
                transportProtocol: 'kq8gti7q4the8rc97drvmjcxqiyiv9wuvw02bamjw2t1463rsoqq7kb6ie7g',
                messageProtocol: '09fzz9ilyytxa34b20ys6hrfwl9kji86dv079v9vcap23l6rajv75foizaog',
                adapterEngineName: 'rnj1n0x8x209jod6jayg5gqw0thg1mbm7feka7pigch78d9ygjanoqz88l9z4tl2lo1j5u2o4e1qpz3clfyapor91kxmwochum2a4lxqiyi8398tepbwobpru3ek2igti8ksp3bsfapo0q2hmjpth67lnz7hjcsr',
                url: 'rio75lz8dy0nc1dw8av2f95z717gzhxjea419yjbfhk7u8g8fh0ouqcdulj7awx7jg4jw48rvkg1vogzdii59l1j0ob40gkk953m6kagl891jvbthm1qjw3dboignv0cpv05tf2hcxtfmoe49ma7eipe4qm8fewr6hq2lg998elh2etl3v5guixc7rddq0m4yqhu5alltf4vp1iooctzat3xuulbb8y2bq6jkgs2brapgh7mj16nn6d5s2ars3ow95inqhg48uo7h45qspz2wx07yh45ihd4t2xkgi4ut9sdevczlifm3babbpizi4li',
                username: 'zbakc5pbdce6fznmhsq1niaw2211d80dsv2y755x1lx8ph7dhauj67x99dsw',
                remoteHost: '9rsiupt64vh6nyhzjbzd6arrd3ewcgegeuc7rtqhnrwn7khkm2h7x6kc4p7kxqgmf6fbmk0u3d3cnr1xitzwt1qdezdkwrhtgmyswq2iydkshp52yje31knircufgv7qglrh7f1iptmi9o2i39l14khm8bkaqy83',
                remotePort: 2681716387,
                directory: 'tw24t16bmusb61pkpe95rg5wpvu1auab958nclo313kfn60oqmufh4qea36g3g8samc8xw9j3izjszr76eawtjin9btabv2gb827kfzpl7bkxzvnvgf248e5xop4wprx7k0ckd73tqospvqvzkxex6sgw6b2ns4cx7tr0hh89u1oaso23nwjkh9xtshdg2kkia5tbm46x3nxeo3mqhvrlkq2n76tdkf3zk03ks3khym112vtb65eug9t7a2my120zisphx7bejane6h1cucqlmtk8l8x09faslx2xceqhiiyfk1airu7p4s36dyk5f2ulw1z68p6jk2zbvuag0bzzqj6dbp5ssi0vich570xp2ye3qqop7ghj52k4cy1r4v25wh8pw4y7239n01pr9626xv0e7r7wilbatbbq3wdos8kqgyk6jfdwed65bhg7wel7zu36kvd0dakcsweanyh9frmaiqkdej6byc1dfa1w247jyxpov7hr62hx108almax009npx7ltbcbo93t1pyd4yruzrn6uj3gzm73ym42dlbq11ve8bp2q7xd26hiw3xkijh0btnbfqm5ampa7mqhhoxy8nljopazzyn1fidydl469fv4jt3fbtejhmol4dn0kmussj9ncslz1dkcj7zpbzg87veeglkan3zvv16sure0nmmjm7uaxieak0niu2kkqm0a3x6hpwagc2ovqqtsrjs7kxzuyumtmy609y0rvlmp52f77aata15cmoc0g4web6ab9zu69e2tea5wqce85ksspod9y1aqcfc79165p6epxfror0555jagpxqlmw37f28pqoch4gj6w18bn94opd6rrtqp9250k4cgpoqmih0v3oa27j4kzqeg1e2x8vbpzixhoonjkgm1s28lfwx0ihssep6oxsefl7lnefdwk1qauzlnwurvtptmg2lizpbzrxxdxtr7rd5k0xowu6xqr2sye3fd08oe0ar98e0ot3oetv5erfluxtmrm9qpbki',
                fileSchema: '0l7etf7vcsvnr39wlv856b1ovdh90e52m99xom971qx28qf9xnmiz9lzd1d1a1ndqbqhcctziuj19emiksqtbkww2mb97dm5c7fqh3bd3v2g71er7ap167kmala6lpjrm2smqp2vabm1p77nf33fym9dswpa1qa37vi31p7ebpkv5db1oc2fer2ypltbi63933apoa9qfojmwmlsb19ttrhtib6j2cvv76dy9gu8hbvgawxk3izmjcs3e98gkyzldmjbmdxyo3xu0m2ez1hx1kkf6ljqsl7172a7h6pdw2bucrf65k1dx3rr5c44qw1na9xscjsl4wtb4oh75ohx3oycqwxxv1ib0l5d08ooeruslevr6ksgnguj0jn8dtm9v3x8pj1iqquh9eaytnmps1vps5pxb01yfwfomccmbrldgf4r74bmclgeo77j1lgw1buulmp0lf6v7z0g24v0tzuop7idjd83b8m701pgt8dxpuwoxaraq649ge9crcx2irkjn38i6cwc89c2uvp1y3qh8sa09oicgupzm2lnkx25iud2ssheyps03sewmstsho7ssdqbjvmozzhxq0e9nbft67ygqieu133sof3jukho6zgo5et5tnueo2bvg2h8ao8dd6l7pf9g5c97yg2cpcc8xcy8h3rr5z7krcz6n7ww6424wpzcw7lyv04y3hofaxykczp37h5dq3euxun582gom22v0z2pwrm6z7xoxrgkuz5eilcfp89w6am64ljf6k7bfdzqoff3pvvum3jx3zxs1d7oxawg3jvy6ghl5598uda2qfcg0k9vp1ybxncmgew8wipd0432uroiutofcrqm8n1gw8i4qjgi37vy29bzfj31t36mkd96d79r8ym4yapk2s8esfkvap6w45gc1nc07s9qshp7uz1ngubfb4pac7ogmt3bkz46l8qoz1k7hk3tn2nt5z97y7jmj9zt38ochzb0igpthp13awjcnx7xbj291qyi1mk5uh3ct8qe',
                proxyHost: 'r0zizcd8k1rewwv5jwdj0usn0jhbu1jbil26x7k3ckvp5to18qmzcoj9zpzd',
                proxyPort: 4408306664,
                destination: 'xo8o00wcg6lckqbqb0cktjega8zmxo4wb3lskd41g37jzw0bvuuhgcs1ej98wzqh2w6lm53z7lh98wfmhi8h7irj1jo2azw13di6e8h970bqls60qz9o9bz2ii2wngntc0f45ob14lkh3nk5u3v10d77kv698m02',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'topmszgrii2dwg2zbaex79071b84s32pworalkl4omzgiwscl177i9u2n2j8qgdzcs7127vok5m9rj2rn3kf8vo74u8e8e4vtnn41t9itnt7pnfrwnsmkvvp56dsmiuz5di2ya1l0sfg4y47fzjnuwjdbdtnxpx3',
                responsibleUserAccountName: '8doazbslx7sm8tegqi44',
                lastChangeUserAccount: 'lhw10h8jo2g0uknlt797',
                lastChangedAt: '2020-10-16 06:42:57',
                riInterfaceName: 'jb26znbx3ybhrd2z38qt9g1muu5yiz2vhhwq7y8uuf39i41cgrb2dtkfoeffsjgzaggn2goltggxt8jlubm60tlwstsoadhbn20328a23k14ojj2ezdlx6hmpwvqd3jb3kfyn4ld1dr4y8zql40u8p9hbqgiehrq',
                riInterfaceNamespace: 't6vsg62jd9z1row39as37lnwkm6wqhejfa4fn1ojssqcfw4jij0zsr21efyy5kcfoqo5mmj0py0ik1rhceti39ws7s27mglhgzeq2hj63ln0lv7md8dk77zo2foukr73qp8hoidh2y2a8mmeo94u1i87sef41wms',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'yck6k9hqircmkukp40q4umuebsmfa4ir17uzpmgx',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'z8hlx6pc9yxo46yjll6u9kwl1oc9iuv4e2vfo2e5ds4yu68gfo',
                systemId: 'qdokz6mqnkuz6f1o19d8fjjb440xfkalygyk1',
                systemName: 'f1iyqsx7u8sqnqzi4tb3',
                party: 'j2zjpd7roxiu6kiwzpesuzeg1h1lfdgxlt9osjeib7wmi2og1xa8t9gvgpzlet0h6z4x9db9hvc78be6ldxw60qeur4ldb82nonrih910o6lojmradi0l8hjhcv987tq007zo96qum1hhwta1adc0bgbx07x6son',
                component: '3qkiwc9hwgwa26w0rjnto0l7bcr78x678bczksiskwryftyk570umks6hlmy8t28nt00xe8ox8y8e47n32xm7t1mfaaqidi6azyixb85fuep3tibwilz88dhkedsqahfefnr3m6szfldncbldi92jpxp91bz793h',
                name: 'tki0hs8dceys9wzbjjko1dd5by8sus1888evfjinwh80a4q4jfhnznirktawahbhm9i6a4qswfncqjqyac3mqdtwlp8mr44ykoyr84wcmvi8sqeazf7t16irdhj7sa7qk48gchnyd8keg3lmj164yaclftbcvwgr',
                flowHash: 'hs6klt0kqfcpge8cwxfxrcxtan11z1u4n99zv4ji',
                flowParty: 'v6y87cf4c7qbqmnxeozcxbgw3ndddp86l7e1dz5xo64bzerqnvugksebj3c7nzexodt4v9fboiay1ohyq8cyda1laudj0qk86cvzbxut8hx55nsajn9vb38toemyeafkpta8oc4pynfcsplbjlkn24niner3n5b1',
                flowReceiverParty: 'y7jn0u84tmaxw5j96el4z534quigzsxw6ybw6miunwmhjaolq0fy1uekscjfv2kmle5hjggtge6msock6ep9xb2twjcegejk8u4q4b0a3ny4933tgeo011ib5vt7o25apq2s9s4rmtfgup9oj3xe4zhbr6ss14aj',
                flowComponent: '5qiv43d5tv3g66ee88lgzl7n4cfaklhe79ly6fplulxm5dsgqg4yipr9rkev2cfb59zv4sov7orc1y4489lhsznredwigfdsx5zk6oueys6250fwy3rfp7zitydtt3g248fbrvt8sndmg4ti3y68o04sn9mr3z4a',
                flowReceiverComponent: 'zcw58x63x71jsvnhr9dst6mck1sumpuvi6lqf90484xomgzcz5agqlcvmyfm0qf3uin96g95ydavve7minrtzvd2dy6nt29p4baftb1q1w42ldoxq226e3vpufwnyb11ryrxtldetd17m64bm4ke8ay5ee04co7a',
                flowInterfaceName: 'wfy8pdj1dyta6eehzel624pf1515w9dt5x0ze4qqhb8t0bkw39ckmy97czwfcyxzug5j1vfhf3q4ob9iqt3tvv40iocu4cfg52rvodng3xadyihce4sw4ju1hjgj1kzobhx4onntgojoj830delel4kplf0zr1vw',
                flowInterfaceNamespace: 'itikqhe36zpwrbiwp4ocp6iyx790mvtp8t35s2icx5z0s45cuf49thcr5ljmeax73rxtx826zi4tziu8bw8tzs44czg0o82ckzgeywbh68pbb530p1h4ldfumu81nr0jkcfg5dg2m683j8ve6nve7hp3lefnhjww',
                version: '5iaymngqtg3o4etupxf5',
                adapterType: 'j6k6w7o492815wlxwgxgmgmcsbfiaz4xhc7jzdajy7c2avghe3bk5rfvzvf8',
                direction: 'RECEIVER',
                transportProtocol: 'cfdtgho1qncb2zw39o1116l52zzavkuvfv5gtxfhi9wcmbic93sal34ihk9x',
                messageProtocol: 'qz2fuihwfz0yksb3iie9ui7vb70ungx8xcmhpoxgsrqk31ltjqvp2w68pswo',
                adapterEngineName: 'ub6p1nhhm44yzek2964cp5cnabk69nix3720iwdst2cs5tmsjbzw2smbilb5g2spogit6gbsn97q2g4owr6hfz41eci1l9mqhww62hwaevb44mo0fn1whm3t0sbt14o3nanhehbz8ym6txhxxzbwljjfkfsp7202',
                url: 'r4gxrs5300m3lcogq01qpz942fdkhpbijd9q2v41cy74aph13cx5codq63pv51k95q7tbamhpc26wntngvz7a7s3l230uesj0rwr8synw1hcweis6fsnlaozxljh3it7q4vjf0dfp8l1vwyg9dcib86hidwe2ubdgen9eoqri8dcogy29kx8nktp03vs2rcxeff599fpjfx1uv45d5tv7uzt6ruo8oddxhipuj8rxaz8q4o7ee36y1df6rtxhem1q4hf901y8giy475zf7ryas73rx3u0a1uivhsohb2a95j2xvl89a7tjpmbmv4o3qa',
                username: 'iozp71o12vmnsdxz932zd9n5wrxp4kbe7ivxlwpvljeebr3yd4qj37ks2deo',
                remoteHost: 'vuc2e9y2374ksecniicif2njvolr2nzhyu2zs3h6mb1rbeb1mjri3tcoychlmdo9herntezw0ih60tzzz0druo1g4zbsw98jloyqbpxp87aa0mbd0n0nu8qwglylwrdpq647o5e6ni3obn0kpfi4f75xgwqy0a2b',
                remotePort: 6005971765,
                directory: 'no05kea0ai33emlf2wf8z7h2x5rxuyqpcyj6npbzxd1l4db775vptkunq0po8mnbrqh951bxqc4r7jezf4qzfpg154htji32f3eni4h0ilefb3y81sc1rkaaduvxym70u78iiedbfq0le6xlnbulj0qn59qr1xd8t4idhurw4muf2e0kae8bvgapeughn7uhzl99lziyhb85w0mqjbbrsc7r467ah3wj1d3nbjnjr7nt3649yh7snkoajfz013pgl8jccw9ozs4njguh0eqvqjfwv749rgfcc9wv623crcgdk38tzwx93ykhx8sd6wdckogh8tmzx88if93rd2fcn3mv6hwyih7ri6hikgheozn3pbgfo8n0fd9xiigjjq4qsujhhzbcgjx8v0hs1yafursf9hnc23g2n475xeha3zx328lpgjbxkbg6hbknpik7n5k255iz5rodxjfv4msjj9ba40lnxxc1ir57krp5yq4ra6kts97wvefldgp9yy7836v3pv4obeh0t6gjzu7kp45odggdl2q7e7v9t6z6vxbgyqkmhboffp9pw77bg3jr1y7mpmh1sx1hhxzygfwebiq4nwsa088xn41lusmi5st4e7gn55oxwz2214w4jgn7rp048pp1zmvy3yxr8dh9b8hz34eb4kxexqw2ao8fsbdn1w3i9lm2psrqdh5qfzp726nbgnrzn07diyd5680b2safz5op297heafhqbqed61rc2ip7zow358m3gf2n5rwze7ccd3299n6fgx0cphprvolaj8cjd80q1vm4rt6ofvrf0x16hye5bcejmbrjbfyg5ix3lie8fjszco8ut361w0qkf7o4uytst7n0muup14bou4orriwir4a42fr0a2m3e53cvkvsbdqhw9h7833sp8bhj4iqmh18yeezb02n1428xmotj5lvmuoyu4fx15csnuh7x9kycjijpde6gvf7gavn2qtf3rqecrmilovll8q94zepa6rhpicew0gr8no',
                fileSchema: 'ilz8htqrk1o796s22yez7aviwmkyl0p55hchy31d1r0if1oxykbn43srm9fpmt1t9fxeighonz8dtyh39f2pl9qbsmbs3o4byc0aj5igvjj1b8pg3utej6yq5hmfs51czzseixwqc48z9mnhapjwv1ayntvght40gx84da2kzr4hepumeqvv6ktx0nggh27s2mz0ol1sh5rxfztka1elc6gvmq37pqghsyk1c6lwr871ckjcv3z15uls4lajqcx4yzqegmwds1l5xz0wol97xvjt6a7yy0werilo74wvo8ozoj9aitiijnjxrb0ct80efhinqt2d92vq551x6lwdrks76pfcjsmg2wl4np152tsuvmevqghsozu6kxb39d8ix74fyj87qgu3xepgmjqisugjv1v3sjn6slpgnb8alamu32a2fqssmnvygf4le2ebx6hn7y64iusaj3vz6ouvgnmpj9tiv6ndljg56la81tn85g1hph6gxxim4oyx1lz9sc1xqzet970z7ctxuk6pxl3vonc237y5uird9vyjqunlnf8yivfikktnmn12kn7qabmedd48whmtfxo96ej6d4jjchx4mrvk1zlnx409gpp7yaoqt65o2n5vyt05tc6jgj8sos9d61igk42y7u68tk5t0q090tc6zginf1yu8h91mucg46nqzg3uggaqlhfjo14orlh9obs351fgsovt2nw9a127hfzesbw70gbfqp7gyewyqjr7x5tjzm4lzix16iterbmcon8mcjc5lgjwohpsfpvnm71p9xruzerejk1s4czyw0urcz9x7103sl5olhl8uqipi9dsxdqse36ulmlga6dektssl6r6jjfm0i4hjarynaysqdv1eiip6zdnet17wxbqujx2d1lwr3ovsdz37ehrndtwr40lpj7qv5kwts2snwznboqlba96dacgzdrki1rpnpv6pf8xmlt8kvlzdoa8ylhl8vb2wnuw5y5xk384l4ocszllohk6phqv',
                proxyHost: 'ntv9c9ndher3w5lbwyeac4cfzbseljsvm5dhpf41ul4fno58gdv8e2v3pxxj',
                proxyPort: 5630974051,
                destination: 'yhpzoq8n2fftj1619t63vxf1h8e140w88vnmn5gj5v75qg77mvzuugpip7a9blxywjtnpdfxv4996w08sum0qf7ko8fzz8s8sjfdiu8wvmxnqo6y5mmnv2t6vwzsob2be9uxb4xctbh9otnccog07y1a7usagxc6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'f3856imrvc5bfo7y7zbrc6a2nfu2kqjtbaxac0skj7jgepumly0kygm2ac9y3x8x5ru1c4c8ld9f1wz7tp24r2yjunt3cd27c9230akn9zno0zpv463vuzbh5nex0yra12bq0g7qgqzfsrnmce1fjsn70i8gxi4g',
                responsibleUserAccountName: '4atck3q7r3ts8c3844oc',
                lastChangeUserAccount: '1wsl2lh5kvs78h6sd16c',
                lastChangedAt: '2020-10-16 14:26:20',
                riInterfaceName: 'poli4wbdh9f8djbxurmqkoq25shyklmhaa59uw74erxzjyj82u3jq38d3iseupxo0selcbnw9kx39kvvnvgg2tq381rkxw7kc2imligy75kc2jr7x0muo3zamgm725j29gjrubkc0qvq39k2k735xw0ybvfqs9xa',
                riInterfaceNamespace: '5flma6uycx4l5oresgn4ck9ley4dyx4aum2yuovgn4arccnipg4sz33y20t5pdchs7uxdcb8za768a0zap9vyym6wmylhd65aw4rd0ztf2ntachht7yvtbsr0w7hx0jzfgnn85mg5qpeyf9cbzuf8xito1wfpw8d',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '8xiqaecdf952c2vk6al7rtpmen45zkm234evfl6j',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'ahwt8r5nwexstomoex68klugdo4uk8toh401rk1d0n5pxxcio9',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'kes8vodw4p3o3dj786vd',
                party: 'vns7ko8l4tldruxl4bpy35q402vmhchphdcfgc6q5297vp029nluap1k6c42cw1f1tma6hxit0yw1zty2oc2ee8ezeujkwixxm08ud74y4z3ejia757fxns5pp08ssfrl5k3plsaz3t3qi7wxloctu1v86iindbp',
                component: 'vnc2y0jdps715gs8djp5ymrzmxjizmt6kf38pj8twixigeygb8kz6aehtkecqfdz1m7fi1wbqf681f1cvix6loyr0e6wzla3nw8cxivs49mvuxix5hwl7b0wrap00by4618b1x1ldptx0zxovq3346pvrtwoz41e',
                name: '1bceor693m2hi3c98i83h113mfgv0osx1x7syfoalquvgo1me8c88koi6352qpjnlkmstkleel1b37s08s2j6fycnci3ggvjl7ekmu5mwnk5mo9ziswu1ju0tarxw17zn8mj13jcnnoh2toyp1h3h0canmw46hc7',
                flowHash: 'fl8fs6dk21m8inthuozy9s0gsdxzfydn5w2fjg0w4',
                flowParty: 'fqcgkom29jngru6w8po4ldvrab4qi8qy0zwla92hv6v21fozp0zpmo142wx3czu76f29pqs26p462h0kpjva6l7cchtt8xh2oyesj1baueaaf6vm0ho0xg2fldyxwrjgx2c95piyyik081m2z46h477vl88fbctq',
                flowReceiverParty: 'r8bc8p0l54cgwzbd38zp7jas8vutdva3pepxjeecx3oonrys3pcv7qvhxkfx2i5jtozfzdgrda8dap6rmgo6nmofqattpi81x8fej1sn508q4lzl9iz0t3hta2qt00duxqhne1ezgd79d3zryhmhamuk1mi72r0n',
                flowComponent: '8iso14wft0wwu1e9m2rp2q5fcyh1xgiwdb6gjhbf89rdwdheb8nnbm6ndy0em6mejono50bpmbo1eqizp9jqt1fq4efxrswn6agkq8d2vza4j17dmxmzha8y3ldl0w7jbejsg5sywt94iqv79rv5ol2wrv446d18',
                flowReceiverComponent: 'djv191qgmp1zbosgzqwjldl6pvvm1iokpfj93gpdtfg188b6bnyuw4uz8qaw2dnat59ncr0x761ya8jop368gg3o3pd0mh75ucavcdi3oij6td8ubl9lqa4k85cafxt68jr15ji1jjdcxrbt7ed8grb3ixn5tejb',
                flowInterfaceName: '620lzqt73rxva2la7d8rmku6y346xcb8585zuycf2yexbx1i5ier5rqm31bjg3p5kcp1owhm3tyi3m5dg1ii7h583vc9mmfg68x7lb7sh9uh5cr0ecrs0lq47tl8tln4goq2sqgxvi361gynhrwq9m0lxe4xn7ja',
                flowInterfaceNamespace: 'kgc31zxf5nzldxig5fmth4i78ugukk3su85cbc1mp0xv8tpl80by21a1rgewxcmkikbozhpfwwbtihkrqpr4ngk7zrqxq7mfujyj230cdpm3fkr9vdswvxs5n18vnpg78v1xxbopgizmceb5gs90nn78jr2c3apu',
                version: 'penro4a1kssb8ra9y0mm',
                adapterType: 'l23fe9t7gde85nyzm3xjem6dycptq7d3c4wyuqa8g5tjx345lcsjycpu50ey',
                direction: 'SENDER',
                transportProtocol: 'b5oles507qpz2q7r9vbrp2cd6i2l0v3jc4kqqayv8xdtwfwmjo0bw8c33qlf',
                messageProtocol: '1b2q84f62dkc9egy9ja0zle6npgwa1vfgt9v708h20b32tb3wc6spd5xurgz',
                adapterEngineName: 'p8352fse6cpziflh0dvfh3ql9xi8enyp6y48tpgg2alonu092a9xx7twk2kfd1l4kko1ro9q9sv9gst8tuje143gy47arpthadq2anyfibl6v2a2w8c6ym591rzdkd4fs7e3b7q8hyifgo9k6s3fysrnztatirrh',
                url: 'k949xev34phaz372t6s2p06xul9a3jc6rfms0jdiq67lr9kuv9akwft5t328bchdo9yczoaacj03473xpb8jg6gv7fk3gd89e3l7rw7a0nh7xy8pd0d0cld2mpaaqgc1s6495wurxqn2e3kr0u24k64qh0iwt0kt1d77a7q1txwhw9yb17wf2t278ndw88p29uyf159jteci6zbx30aeyq41woqlzs26ilhhgs16w3lpr4y9xm6jktxkjtvqsw1xd6l6rhwxe3n91f9tdi37tprut3o44g05a13f5yuluyvoujdjlm2hcjy9k6m02vcc',
                username: 'vf7s885xd1897e5a1510hp7sx1xew3zh1q7zuvu7zxn371wcyuqb98662qdd',
                remoteHost: 'q10ps806t9qjf8v2m3vxl6jvsr5f4eyfv2c74m0fr4d83v986t1j3htzmjbzu7pruatnce4uxd5jw97r3he7yq20sg5fqw7ss7it0c1ae14q7qtpu6rf60xsdyya7ayeeeueugaww6h1mgu078d7s3xwxuuq86ju',
                remotePort: 3606501099,
                directory: 'yx24an16tr5onpo9s3y8usz982lggeb4f3chqyew5tf5tlbr4o580i33s1w7z5g2h17ene47s1conufnyrpnvhq5t6bx6okusjxtzy3q3u53n3016x6f6r5ki8v8f4ue39wma00url96rbz1kfv0jyyxmoylztrjcnzsveiv5804q5y9cqo4gmbedybnfokj0jcqkm7aj1eria06k9odvtudkvbb6uktkyrf8hgdupr33kfdbaydrkw8ymf0xeg128m9isuee0xosua4ihw61cpe8eazhcbc6udmzt8oeuugmjoxfd3ymxxx5i5pyoo76cuyqm8pcne5mvh516dgpfc5xanx7elkhw11hqnx3yptii5k29khrzamo9ubfgxi4aum57mhuu4zuhgpddcxf5rnlld9qj04x1lc2l3ood1v931o3sd0iffavxoatoibxoz81aazrqw3frltquutzo9cz6j9xzom3c7e8anu6kj29ag37x78i8sthnrc12rxya7ylxyney0y35u3zbatnpik9z8x6lww65b5fmebvcy8wjj4sllr8627ns8xpkn085g03pif9cd7u3dgdeihzxwqb5du83t9efpwqv7csnf3dgyzk15s6z8ryl9u1yw6p40ty5rdwuhfyfc3vnbwpr13up21ldonv4xwih518zoojndo8r33sow89kr0lwcru3wic5dhm6ic4h168e1mj4qhlfptxr4yk4uvlbwaibwn7r3djon81fgamfkn8ky7ta7mmviq4ctjiwnkvlcarjkczstm9lpfyt44wu4xqwz2pvzlbcrrukew0ipd3nlumt1r8t0dioj3ugg8i61bmfcrr8yjmzg12ot96wb0e6s0pp5yhwn7d8tsvuuwpnbz6li6nq4x027etr2tr4vua2mpbvygoxl2wv3drw24kp6rorkwg998gov5hjh2dx94cyl8oeoxklubr4vqfyi3idttcbnakyoy1w8xxvy9ey7knpyhsw93h58lbhrcc2a6',
                fileSchema: 'b2d3stsc0rq48apk66fqrz9jf5i8gqp5zr9gofhg4ncpxvo5ixje54ugwqrg122nn209qxu8q1nuruu07m25t744es74k71k0bzxsju2i0gx6yycc3ky1jmhr0q0g9ns2zvo48wnut9k7bt6jkn45j4u999lj0r737ml75ln4h3qcdxu4iyw0ow8bbuw8kir5qrikhm4wxdb3lsnlezgfd9cafppdwhqqp20gaaiac8o6i0zlnnh3822mrxnno5odtbnwre42gisdoebz3bezzilvloa7z12qt58kv6tlnbwgfvao6y65w9c4rmq7m98ccin4xi7kf346zgwp5oymfx4c0h2twlyo6zf3zhessi9urxifguyhyjlxlyfnyihsq9a4wvc4yspa4il06oc8agm35i1lfvn7mk4xbv9mwhe9gs6szikmnfkw8w68ueeprasz4co2264w57j4okeoarmekpkg2zq6q2dducnw7fitoybm39fi8skhikzez0vhyzq0uy03953x9cks9drzrbyfn6co0ll3dbos6egbrkgvia4pn4rixeh3bv53brfmue1syvefmehr22rswnd0rqh88ncvo65qk0ju6sccwhthwsgdjg86egd2t559q6kk30jmbcc29aiwrja0r18fs75dwn1p7329xqqflnmzmfg4uaduzx4nbhwv70b2a68z7vm4ssclid68dhan98wm7xja2uhg6oux0z6bhvsz1sqb45qbjmw2zr8w7baq3iy343u374qi3ng1ivak4pt7onwe8lv67jm73710mh3belb8eqc6wss2qou1zato0jlzkve0kbgjlf2nowmpre1ip2k79tdudoo2cc8bfwp1cm4r39qkil3eduyhjvbkhd0c73wn5m97c8jb0b7o80s1xtysfpcy9bq7n0wcqb5xw0cd05pqn239809e55t5cgek2hyxayco60l82uayzksh7lp2rcmhsaek3wk8gmkd0wb986wh6m1z1ukny6c454i',
                proxyHost: 'ezv06yypv1yzb44l6frkc3jk9v5fktn9k7af6xff665tqs620nxpvqrmiyu6',
                proxyPort: 8686765761,
                destination: 'gf0am7zywyrxj5256zjpggvup0hmjvd7ndf1g0cpj9ytyb27fz4itwkqp936m4ft10yjpykwf0w6epa7dnk56gc5cxr2uetoqytl2df4mp6ltitkl0lyy1y0x1q0wl6sackcy88sjfpp8p7xd2am43fockqgn9g2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9z13c1tui8h4axdba6yebe3y70evm218macl78zv5j9wh33b8aq5r9ss68joeouuk66e322ivzt7ynq8j1pa7l3vfit4509ykzk3ji4qirs76p0w05hazde276plt1cgwn87kbdtebpojhrqx2ncuayqe7z15mtp',
                responsibleUserAccountName: 'a8j1wi8sh9hkmxrqn3cr',
                lastChangeUserAccount: 'x0qd0t3imfrifk3qzh5j',
                lastChangedAt: '2020-10-16 17:32:15',
                riInterfaceName: 'v6s5rnv9c6sopxm1dxeo147ghinsrt30xx2af0ljtmlfzjr50ewvh4wtklrllm7uv9jeup3wgwxvkvft4ia41g5ynm1m1pwd3iuaarmmo0kdvovj69o3thhyi0aqihku8wbwpnsaerao5wugbk9rj6ymtxhtohap',
                riInterfaceNamespace: 'f1643icyewdifgj35spafiqvxhbl34guhesl78y61il8ykbw1y4v7swemwokqknl38qj5pbqm0kh6mao99yv7t2xwxhd8b100gryvyk8jvly32rhf1l7lrk7vdfcg42gk5bd245qf8ymiq3caepeinkh064nh3rq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'c15h56jihib1oitywgfvhlnl860eduhd21ekej6c',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'ftu3lmd561vhfnp30nvd5mb56pb2wdeaqii6k842cmkkasn3rte',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '90lsbj9zhw1zcoh40wx5',
                party: 'lemm6zafe17ymxd0tuaycaatkdirb53x451yuku9t59lyn6ecu6ey6ii8cpyqk4qst338qi1en7y0fcggmx9e6fw1dt6tgjz2vr9ypwvstm0bewnnw0nx8nk22zaceytu3npvhdoqlsfw75ajditar568ivqp9f9',
                component: 'zjkv2dbmv328osmessgok320w7vkt4a3zctivx5cm833bkf3komdecxljise6dis42pixxc2d4257hoca94itkd6zgplhvtuwdfh6no36d4yovt9fpxdd00uq9onxlcz0yu8zzl29lnczbrkf7oaclkyt1cg2q8c',
                name: '7fyckbi634bwnq0ht1827pkf072z5j06o7kwcaf9key2wlgt8sca0k90b138dunt2xd3slbynhmp4kn2btuuoeai0bfhl59hcgdth10ygeoedih1py9l9sodsftv5hmvwoj7qx2xx4j78yvs9pag5hl8ufhu88sg',
                flowHash: '986y4duakb8fh1rsdv2ybxns1tdj6sk45top3bex',
                flowParty: 'j1acd5p6576ikvpvmhv623u6cm93nefhkp51ud2jl06rho1c1h0r2pw28ndtamdhbxjqyhxvm3h273k5dbfv0pud7qjewqrrhmnhizn09mhyzcgcoihb0gpl6ip4l3i9zrt4i49jsonshix9q2vn3bmiitnvvx8a',
                flowReceiverParty: 'h90a41uy9a0598kgalj4wz1l5kmqct8wio40ljfnyu37czrutsj3m6szixu74zdiw2bwy1rdfxbez6nghd31duotbcffc9th6uyom40w5oyqj1sdvg4xoa4g54zzlqva1xgz2dvg86qgznnfm5ldpd1i0ubqvlgc',
                flowComponent: 'b7gu3vcpg586ouefci3dp5xovu41ka8p35sm1t0bmduy5e9ax37ucusgm2oinsl63pzvplg06de7ksl8f3hxsqj56yz1vyflx58basmaemz1w5x7larxhu1v35ovvi1y0td20krz1qheic0ngp7b1832wwhdytnm',
                flowReceiverComponent: '78eu4hpiktz6gc42jgo5i3ies4jd3ltr7zkloquzvqexdgc46tz82atfegt3yn1obmhclmi0hryan2dvk7866garnz0hdl55no5445nypdi2bfnsrwtptth5xwzdprytkj8g9qhj0oihukglzk1n9cvasqw8hgca',
                flowInterfaceName: '29n100fix952j0017ttjr38qr2pmdhf2a2l6rondt1wq56w4ztn9i88uqe202fq3jrru7gkf7fkzzvut75yw99ii748oseqreszehwwpaqsroyn67h27f0kxcaxxf1n6wiyseuqmgxj3qdbt3zx3we3rq3s7wqw5',
                flowInterfaceNamespace: 'km9eewbx83hxlpazqm7derehh3l4yggb3c52vlbd43e5ywoylkfpnyb8yqv86m6yuyr0yra0to0y763cs97lh8tmts6ksz9gcgsdsqdi8gbtrj0auwf98h91cbe36lgsc9wqi4topp3j7x26l1ozggckkc8ejsi7',
                version: 'p4m593pxflyqvhb8ssmq',
                adapterType: 'lm71qdnh27xuocelv6t8du9c4s9ddtp2tds3fc32frw46vhlj8p28ar01lvj',
                direction: 'SENDER',
                transportProtocol: 'gd8ez0wl34a2zhd8iqvnw5gm4sboclz8dihu6crsmlw68fdh29uqf8sjbf5e',
                messageProtocol: '5asfshhw9ztobvyihvo84gdv0fgh1j3r3xy5xk3kl3j47w0xr8tnsp8qjd2z',
                adapterEngineName: 'kbml483b3o8e4lc34olqn6r8oy623mmu0ys377j985ky7dn2eze0eb0ejtzl51imr8yl2qa9anocyjwr1651ocrvr2lnbh4qs5iaftsditlkt4k71gfffx34ctim22qfhagfh2g29jluw036qq9slx8quwovb76i',
                url: 'o6g1ogo6gaf2zmar9ymlk87sb0o5zqgh4n9qzpvmha6ev511ihfovhigahx03urc7wyn7yix4vrvdw7a79qxygm2nipoke5jqundz7cluehvmtdapkigcj5nmv8jf8iiuiy5wijhi5yrlvyk4hgleu79wdmyfq2e81o5ckynp0wdvm4011nkmrva1jzyfwxu8tmxlclm0y7v0rci390xtxnnos5jhwn6ykuk9hj22toe2rln6f202kfq4nq9s3ksdh158h8f30boz4lwbw37ey81fj51pus4se3eczk00o7n4gdsj6pk209ehlufj893',
                username: 'a93ir9u0vnqwowmmtwib7f4z2pn08y87e5hkdjri1u1hl4mrgee7icor2lmn',
                remoteHost: 'c6nxbrufg0nuajli7dzus9bm9tewlmroqqgwhvxfe4he8o571zpkzbj8ku33hkt2ntxgoepn1quvfol967m3xas02ywzymu5mr2i6lctoncf1rrhh671rireyrf6uxoedujymrw85nq4iapsf6n8f3orgjj2u3nz',
                remotePort: 8432179960,
                directory: 'qvl5c4se1p0wu7gdnovmne2ic92rd39gihhd0ne6qkk6t3axgyu8g61xq2dwlfq0rzzyl6hrozuhhlsvnztc0zkt1xrmtdkx2bv1s4n8mj034a066ou8t8fwh59emikpqsvvalmqfb32nrpjm92vyafeubfo6777srftl7cjz7g0oxse34u8k7t6xbihm9uw7vi23alkw8fwh5bd3lzhpu56jgvru8853jbjoxy4udtmhogrpt0zmmtowvf8sf2jzc29aggwq2ajhdws1hafrygsvijpjih4a229zrlos12jatfwjnrsfv6yvfgpwju5xnko51jwyejlc2u8sawlsxdhof5pydb0uinwjw3pvq0pxse7qgg48rs1bpungrdc7jtj4cdhfsatwa0f08akvvb76tgbvt7f5ga5h7u18c5qna08d3nwro9uh8nd39mdctjz1f7qlrt00jhtynlx79f171fdeqbwi3g5np7jjs1akgwn4sy7vrlv4g2r23asx61tzsrzocxsq6ihdvj5gew3tuzgdxmzcvswjt0edx4njabdtgyw27f0k9spo2wsmv7mv545436enz7cj034i2uzikwwk23149xuuvynqy6kznm53wg3r5qoxll9smbkmpjlzmtqdw2p7fd9a3rj10kk7muxmqy2fnkcnfm3irbw2dlkktc4p0kvxvzj1n3vinqoqh46rapa2zeengyt75khu7upo5d8j98d97uydyo7h36zvrqjru3rfrlkfxcd1ki0bg9ym4r44zbjgvb3sycymu1oa2rd8jhd694zv4dqw2qswduhkfj6377mzlkhklx6pe0c8rqnpu9c8ywf4omab23hf4it5zpik30xyeke1r6bum2ogr6hcpat7s1vpteasw2f7w0e8m2sjaowaagedi6jjy5xfc57hib4cov5unl6107wicajhheuxu853e3bt2gg7u9bji20xupd06moc9uslssyr28mvfsey5pn98r3dgv6vythvpuspw5k',
                fileSchema: '23ufzyq8d20797sj5bm1nfjk82x7q7zvfebolv30f2s6qlrrun27iztfyqwk5pr9im3q7o8i4n0b9tccx8vgjcfcb3qlzq0y3icd3zyphbed7hz4ad7s035ngb2f9d2enf1nvm37jbtl8rqk7tkkcp2olup8h5bz90ebsr725ftjejqz3jadexk9fug0gu8pd8lcpek64rkftf8ufsh65kn67gttzcsp6asuk5tk4cn9h7l8vrdg11pxcdl8cqekjjepd5fafqi244jfl8r43sofq2eqo13lvj6swrnyy11skikyys9kovf1zqfsgeg1s33y7mtry9i7jip4z64a528tzq41d1ao7mbqk34n3csx8zx013qu1qss0xrbrfpl0meexale1xsapeki0x3lybhx38bwxupr0c47qhp2z1ct1g9ti7c8ttg3076p2d69h1t14iyj9r7w5b4bnb4pekpav6rrjt6k1afhiehcmjfc7b27asi5qsyja6h905umsunvqc4glbse7gclbk6tdx0jj6bij01hop3hmiogttyrepoh9fxs1ejpsczd1he53e35iwrbkoogtw0g94c3ys6pg8kicjoqoak0ew1ndido3pp94afwyhpzv9ryc2f96mr5hlfpua8lw13l6jm8wxg892u6ps1xd0bwcg1w60rrd9mo70lk82z31nys6ijtzgnnypyo4sz7kxgl97mxidd3lrdybfeo2hg2qhts4bpups8vebwqtdxf3z8m9nqgeqpvldtmmxiu9tq9yg5ixocmeac7vd3igi02k7giq03lp3fkdlkun08zos4qey9lt4mnl468q7wv267kilyf8mu1ygt5by0se25pf050tncpefhaa5gfumvj7gqq3bfakt3ss651x3mrjp6ghnmw7ic6c9n3p42mqymiwqa2t2u6ty5fvwqm7ycowo6e7ulcmro3dq8pzdtpp71vmnba3iue518ib9n20s4g4j6g4x346z1aof3s2wu3n3mmcg4f',
                proxyHost: 't0rmjnox0eszzvm2374pcc3bdohxl8ukudcsfffcxdaq1y71tjdak2o796kg',
                proxyPort: 2096441972,
                destination: 'w4j16hm3ampsv9ob7zklhqcqtpqxi4y219805abipjtupl8fcfoxkfhxispnv1lejze198la8cc7ep5qer8cfms3qi3jj4llyowp7futbl78dciy09ejtygylq9h7eulh0nnij1uybw1paq57mpz3eqatrj621k0',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xbqy7vxgpv1su6wrp2e3rwcu2re2d4ja2bsb58s2hhyzjm2w8pbbtx1gea0lwskjz4fq8q7cfalohd2ut2bsuy3409nxd1sn9m835y0xof4gft1hs7eai1ctm3mo3bdea4beq5oqir9vbkntw3t31837m1wj1sli',
                responsibleUserAccountName: 'twq410dzio6mjwon8wyq',
                lastChangeUserAccount: 'nphcm83ssfq6dj63hyqk',
                lastChangedAt: '2020-10-16 06:20:26',
                riInterfaceName: '5vkn1w1npqaxhsb5gk828arx3yypfo6zw1zrqzpe0zlh351brncezhdoido8j40ihttraai40h6d25xvvx09rq2925htxsclwyjy6pij2uxtwu8fpp0fr3kjtfccc382w550rj80czaa8s9g98xkx8xc9gns6pcu',
                riInterfaceNamespace: '8u4zcj7hhpkjit3tswr3o8kgzpx6jkt9dua0slut4ians22fxtaikmd3m76siv25r795nrjazodb8w2dxhh1qcx6uq0a0chr8lt6chd5hl4z1bi9vm1b5gada8kxnmzcgbskr4frjcfmyld0vuvdlhm6dj18l42h',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'qx8z3r9b2yxbi1970gj367fhxgi7flp57nywwi6q',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'gfwcvlp9awl977guecn8ziji0k6khof2ak4c4wh0nnbouvvgx0',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'ugdmzz5mmmnkcwc83ota5',
                party: 'ip9rh7bka2epqtqynyl5jklbtvvpbtu8b8jp0wazpkzg9lh8p3o7c1vrzwtpt5f744jrk0budr3yctvsesgy4x1pq01gqy90fo364dkyp07ctdy643i2o0t2gcowkbxigct92ssttytejjxq9kfph2p1ay9kxyn8',
                component: 'y03nsjlmcnmzhf4upalkg9dzgvwo8z9ijvv9cl2iqheacz2v5vmcrgn8geb224qvne76914ak1bt45qfhvmwzdyq21i6x91tdhb7c5jq9ckrihz8pmtq6f84esrt7qztdfiiwrvoy3poqgntrnlojqjgqd4jybap',
                name: 'djsgvjh9uwlumryjj8dso1dvrq4gt9vxk7u7ezau22enog2ji1ireqg46k4yuym2kdg11f96xqq324i6ma7nh9hws7lx3cna423n6xwuzmb9u9ikzl7d1qvrmeqj8k5jq3lexo66i2fzky0a5roi6c1ge98ywh6j',
                flowHash: 'oheljdzvyyiwny4hnrfbsup74zrpm9zf523iz1yl',
                flowParty: '8w7lietphfasf4wiy83qmndx2hnr0n1dtu5y6h8hxyc8dxprfzvoki2zsnj9ocvycggb6jop7fbld15f82xq37tppkxrjmp6wz08zjt2vlnf6znrhz67o9mkz8ix3rmzbz6ua0y8uf18grhnkx3oco4pe2ubyu5u',
                flowReceiverParty: 'gr7nn8vdembmmgcuahei41rydnnfui4sicwga7nx1t6lfbxcycgaaph2m2jwh27bvw3acfqenaq354qoivag7p4pmilbwf4olug5xe7osdonyq5uwr28168j8m286lhya7ckaeb0ub1b0mbfsgd7ycghmxw9kpp9',
                flowComponent: '0j2g7tsxpavubqfr0p9sn8vi4ollnprhzsrnlx64runrbi24ur9tkgrwp52ybvqu5f9kqbv351oif6c5ud5cx82u92szlrmeekkh4fbrm6x1n9tgmlo8gyjal6ysq9079wk7yar0tged5e7otpy00x69i65jma96',
                flowReceiverComponent: '37amv7nywc1zylcxwqxpo7vqw0ivmzmp21gewor9uib62kyljdwisxkul5r94on74drhj7g3v6zvef0j4vhuv625w5m5ksdemk9m1bjw3u7obow68nzt2eatg83g2bvwojhclmi5i4l8vtxz1cjrsnaalsrc1lkk',
                flowInterfaceName: 'daskwtgzn6twsq8395jtuorg6wjx1xn4jx3bui33r0b2tifdwhtbu0qvs45yhh161wgpma9uzl110slnhp8393ybbuoo5wnjxqssllnjrnodyg3h29ldzsrz2tx0i0k5hsb54byii5p40hhu1vmxjndz6k97vmra',
                flowInterfaceNamespace: '91prb9hz8ns5ein2djt0t7uoavil4ccyqfdl9klj1jb21u50mwd9kufajy0sj9ldwh3gfg4fu83vp0stzioorpjailj9485nkwwv61531wszxhncpze7xhw9wskcffxx1v7zyziryv30d6uw16y0ku1gw3ubbigl',
                version: 'y8of9ki7kpws6kwgeyn0',
                adapterType: '9rtlub5tekpj51rh23fy32qaqfae29jdxnu1tepig81b0na2ukpr0af5xse1',
                direction: 'SENDER',
                transportProtocol: 'a5ptnues57oi7eym9bb75oto6fbtagzm974tf038wqx56vmt3tw8gn25obvz',
                messageProtocol: 'pk6igl03b3yi8fgtqgr2nwstncd3sj79rv4w2nkz90iqup431xtahhucic35',
                adapterEngineName: '2erv6522xtai5h4k19guxmkrgufz41g28ntid5fufkq048mqguj5plce2htrefqgjzh9atd5yoio9o1cbmgu512bwqnbcyn3t1612u8zun0bv7ou6on8eq1tf7t1xpvxxctgmyim3a58l8zqutcapw0kis6daztj',
                url: 'f8csnibkzz9prk8v51mdlvjdn5c7l9714p5e18kqc5rlrr6alwtn6smnfkbwp9tghiw2n7agqjnz515xsmbi2teo0cy7pdtm5y54ltjigt6ieommscvl4iq4axcv35bx9ltblpljiniau3sb8hgz57p3ph5gq1z4msfsiixhm4qdmuqgd0htuf51k448jtbejoc29g2ljd2mj3pdxdivf1yl6f2v0gbt3qj4kete7tldkq503rin7gmlqisw7qzx5a55qo2tp7cyp9l82x3uhhlsrzvd0avwz0g03dayho4b6rbpnb6zd9nb836tau8p',
                username: 'tfughwyggfor2wdzcdsyvuo4qls3zv5qa4rdcsmojszokxv6evocarhmy47t',
                remoteHost: '9zgpjhiggdz8awo2fthn9sq8xj81o1kmf3l2v7oprouuuj235x94hkm3oxrp16envk4whne50pianulqik6m4yxssqo7brj91z1p6twqymso94okdj937lbmoyw1tx4rverdo2urwtm42z6pach2wchi6mga9xpu',
                remotePort: 5850849741,
                directory: 'p2u8eqq7otetpomue8wtmz4rpclbicbydlt6l8ghqh2me4u955igor31bxn7q0w6pa1tltco7swti9yxwosrw69rhgul8hiosryp6365ivv9rp01dryf30b1i2khl5kwil14z31vg9szcboe0wu1bt41o6ttkten6shrdbgfk2hmthmecxohjgdjbvbqaiy2xuo74kdxqj4qq23mdvj6rb6r3tjani3v6gf2t0vgq7js35qmgxdrkpds63s84xyqoi6zc4113isfu0ox1kxhkyp07fmwifv0p72n5hhva7ezl9j0ka9fevkbxp8im69z4g329cei3qf4uswueyktc3gsh2ceztr3xj7hzporlomo74694lu25bjw9ne6br1w1efx5aexlvqpy9xr7xn1u0m269jkvx0bv1bme3zjwi19o62glk32p64etb7vbaalpczxbcfmz16cfuygxtmyhnhc5rmnvyjxb6y6fu82elnt65i6oo9tpd209nzrqrhgqoomm05ybm0wrt4xasuaf1ngyohexnwvmn9fyvmt4f8wim1g67sos2fj3usj30mtw4agna4cb21ytplj8hgrv0ye8enim66hp4o1x77g8if63tjfun7szymo15uolbi2d29prp1iqi4if1qmy582w2pgu5dm4gx6tzmj6ydex2xds1hd3cvjwmf8ll9bojt4a5sj9fsg80i8hxh4zqfarpr8rnz35d10pgwxvdwb43asym0ddfkgep8qd0e7rjbq7ualck70jydsierni2pb3ft95n2b1a7uv4hosqgxdvaa42spy7i65rkmbni0xfeg5n0utivr4etfl35c56n9bzi6ico6efem743q2gxpdtv8xzp24yxf11qf0vs3f4eovpmfdal8mbyyxj6pjv4se0dryo0piw9gemi19kblr2p21zw03iuwnzpvt75etjb5io5crzzqx78mjy7z3z5pdho07aj9mb8381kww578kvuwv5v8aqt6uwbu7jk1lsee',
                fileSchema: 'wf7fkue55ijbdal15n1juk582ao0caztayoz281x1kpu8l4smv43n33vbg1pk2ddy33tm594xdcm8hgzy5pgyaf3n7aysc6vd4k9c07xi8f4ud0ifv35al9r5zxyws264dqroluocj3nbls9kwvfalg1ou1fo0s5eul8ska8i41rh0tojczp0f15qxka0w0pqjytc51ivrx087bwoxt6nthocuyp71r0r3iwe85445hucjhuh8mf910t28kece2ih57d7d0mzvafy7o7i98kdag63w7a6v8tvkk37zupsv6hig225l7a8rgo92grriysrf5eqptj88j6f5o72qygss83kiafkore2dypj1kfdrluz36c660ishqanli3wxkjo1zgwnhme84doxt8laao1bcr2cpkmjqty55fikmmf46acpj9pevkqe4hty1wc8uag7dacs1sfj3uahzkmhwpc5bj5ib20453x3ypnhia7oz7x69xnhzlppjiae8n1ujnfs1tk4t030tt4qp6io5tu9r23z9igyo4rsgax8ypdtli2sh5cx6lv4mn3tbg6gl63qzp859nty2g5z82abvs6u3fvz82qxub44nwroebgsvemqvz0ad2nidjs1swsckwmhjdz56jgfx9tbgjxh7uowtiizodrwfpj8lqflyhngk4vay6t4804m3sapdit4ablxdcmner3nujgwkysva1luro7t7rjft9emjfvjweve6t6tg2cbcfcvp0y0dr98ijtqsb1uvxf5yj2j69u90h31kacebtaobabhrkpzmm37nc15tigv4m04hpzip66eb9p8nmhqixrvsufnkaknnai80gzgp0ce5pt5eh7a6glvd4iyth8i2nij9hpxpl6v576o1i8nejn24b4wf87n1fjp2ypp2tqnkpelzimpsvhqfj0hlb8u2fartswh3ptsxzgt3pxpja9pkvfg80wckvjoml3oa7xjoef5udyvuxot9sl37qpjpyg7yx263mcyao',
                proxyHost: 'c0wvue4pxnmv0ahe9vfz6pio8p5z6ccd1aiu5hontqj1wjxrphq9gyon0qgj',
                proxyPort: 4227411478,
                destination: 'yljlevfrjitzf8ej5o5hp8xoaofg4ekqx2bah0lg7nkvdjb9e9o1lp86cv9vq06612czmuuuruw8x4vc77lgtuo9nec2zewziks9up4nktbu9m2epwrmeywl5c5yku0q79h1z9eu1enpmkafhuugxtt7gbigzgsq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'aey54elkr9gc7a06w6na8qxfje6caqwg313nq9b77jyt96pqsmq838dyvf5is81etw6cg2o3c4a5gub2roalgiuvg33i93dotmedhes1h1jidnewun3rh6puvdh3yz1w0prnxtaro7msbc2qas4zfs3nuketsb0p',
                responsibleUserAccountName: 'cky7v5m8qcz281sbyl2i',
                lastChangeUserAccount: '1r0fltk3yxt8ecocdnbc',
                lastChangedAt: '2020-10-16 12:08:55',
                riInterfaceName: 'nbzkt0jrd4yof9ao1flm3w4idgvcjvf7fdfayo638vb7dvz7477x05no5aug1fv0kz6xgbqj4ah254dishg0fnz36kt3e251nwevr17nxgakw87sxekb0pog073lnx81lny9afm72z5mr9g7412j36uaju5045f4',
                riInterfaceNamespace: 'oq8nefpj0s20c59kr0x5ek47r9oj9hnf8ejgo7833nr3alkxak3orkarqzjstanslflwu7mstz8hypa1aeerlkrynqiiuke0n8irkn9gqx090znp53uevngynpsswiqa631ytgwabgwdpd44zr2oekrp9pjkxb5b',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'zao06imkhsswqkw0paumrzn41jybnfb3qo7pk170',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: '9qdcy29ueu14kr5wodw3x846x8uss8gw4n9yhf1fbgxtdvpea6',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'd5q9l0j3b2mhdqhu7t2g',
                party: 'sj2jb57vdlahx9hbcnpmm400vxcsuae6pqx99bhcazdhp5vwp1uqzfcwhlkiojvx3evj0l9dsvcmax89ccf4igcpgsr5cpein4dl6446a3b87jpd8j5heuuxe3wvyr1g4fch9apt2jg0kzvxki15ne8m4qc5s3xbu',
                component: 'qwgy1jncdhempk522ikdy2urhuig6du22mr31ewjcia6qj4v9yahg0pi3lc0p9dp59balr8f2c81c26d8hjqcqjbgsnmrbmgg8g1bahsi56itiry4nnrmwcxv643hab40wy7ip5ounuku5pvw3efldb22ipg3d4h',
                name: 't188yipjbiovq9wsfknbc47qe9zrm59jluh85fhryl6f61mxvmun3czeb2uzawco6ur8jazutyk0bz08sex34r81yo1hit2ne5u6en1jnabowvzx4xozg2kmgbyy1djnyudg9yysnzgiup2s3vu2vsbsnvnq16mr',
                flowHash: 'rhhtbu9xogyypcnrft4irhsytwws6q9n938wlxyb',
                flowParty: 'wwxcvancqk39npt4wt0bxgusbyiz3hjy7ipnoi9cuhcdhtlmo78wytg4wfj39tpajrj3xd8qjvmc1y4yi17g11o0gjoo678i6qcw56k12sh5zlaegoybqq4x37n2biq6v12b4jl42ceolfcd06fcsaeq34onuq5g',
                flowReceiverParty: '6irfothmbohvg9bb1xb26ej5kqzyumkirminosgqrv6lubmho51shjn6z1l8vpnii4kgi0tvm19qpg02nisv9y0jxhllwxtgcqknipsr7h7yk4su6pzfy5wrqsk4mnf2xen4q2y2sqrsb5zchoip580s7yq4varq',
                flowComponent: '9uexk2lxo7vds0eusbbzpudz52x312wyy99krsdcobxxg3kylpehjyah91w1hii4kzzjw9lqe1iju2niruuj8kegf287ou0f211qnba239ipfmhqo842newel6t2x0bzyaciva7gumnu9rd4piitv5054sn97vmr',
                flowReceiverComponent: 'pidoat9ubbx9xmfma1ng49beelgdie1ejecrwwk23g373jhffmz5imd1oklq2l4fizpo18sjwkdocbebrwr4cc3hb4f9qf2ew2qv46u4onye3o42glih5oie80d3jbt2132p564dlxn1oq3dyk1afzte774crlof',
                flowInterfaceName: 'a0aqtk1jot4drhsmcmwvqyfb3tymobdwgrqnhcgw4of040a9zaedzapuckoad7uu3jb3yd1t6brx5wifff9nwxyxh2ludphr6hj8wou7z7biklvgsw6s740mm74j3lsqz643wtux1u9nv3uaqy74getv2cbtkhlk',
                flowInterfaceNamespace: 'iklz6cxnhzoofhv2o13fhpqj75qz21w4esj46xagpzirg168trnrxljc5nhisd5unguhm1ocxv8xbu5l777grqsyl4ub52qo9yklm93vcrj7wht2mljszcv8nyfcstfl0ft6z3xobtir0yfhsu8xuh1cssboijg6',
                version: 'lirghgu2p5959nlhtxjx',
                adapterType: '8r4ao6o1nttcd9anuykq3gbwf11q7c299l2ff299qwcslcxfcje0y3uepbnn',
                direction: 'SENDER',
                transportProtocol: 'x4a5kq32worp030ygwbjqlif0ere7u1g9gmqcmnmvaptvmmqv5wb8y90ucod',
                messageProtocol: 'ih7prokn1s34sx5hddee15j52s6fox25kyln9uulg5xfbor8tyfwiipvj7uq',
                adapterEngineName: 'gkl2w8neo1vwlcvofmf7ptpmss53377rtnhujuvpi58uq1kbgw51wj0x5nbzlxwwyv7csc2aatuoacyzawab5ncmhw257swj8bpo0hs4yseulxsdiymp79xaczl36aghkjq7a8qa7tispy9mcztlhfa1gls37pst',
                url: 'zuxvh5hy7y8twlvuzrl7mqa0zqo7jpwwz6zahp51sw1thuikgznvvq9r7b4gxo2ex3xhgscykcyn1uhkkx5vpbuudo37yhjzmruky2nark0upt7rp4avjmj054ea8igvcb4rpndre9cdcn5ko7tgsbgikrxssrgdqxm6rvxknwmrovm2zb3ofkaifb0trdtxzyg9qbrlsg7yg3b3j77luqie7q0dv19pypl7sxl10hqgspesuq75fyt7lv8we7qhmzalqp4nd3mgpp8gmv6ziwt569enqlnr61zcirujs23bb7yzio8fbadmk0xj42ls',
                username: '70823spozyhcmpnxto46c8wt0jfgs8ynbktb6nsd9ofanfb9iujtcudkaz92',
                remoteHost: 'qa17d92qqncha7rvmceisgmm7x3vam0j9bgeir3fkgdofr308zklki5hpfddkb3u2j7ufv4gzloro0ihlfveydvci4i4a22cj5rt3qzu2qdyqi2z4zikohn76dp8l4wwqze1kf1u8885gpj7xt6n4ytzcn2bzprj',
                remotePort: 4278295396,
                directory: '20gz8138gjlwdcqoqn4k0zrv6hc4oapvpmg1huk8e8ti6wtjk099bgd3h1vi1b4i3y6zi6p0rhaflt8utdam2gko3kqjxfk0n724z1t4kur7vy8xme902wweseiibet7gp8r4dkoidl5y5twux2iel6wx0daj9ncak4sq42pu20xl8sch6znx21eqzl27sxo57s8upewwl672uugj5xw5ny9vvxrep8eo4b6rzjf9vcy1d97v3arwvq5i75jnaxwqsn9nec8c3wn30cn9q7ljzmlqv2a1rvrdltj097ielcfxtys4fb6vtw5dkrfxij01i95cuexugn89zxuu7gql9ksdlw5k2epr2sfqiaotxfg0aoa0cma3xm2s8dzgzgwfpmbk2iwuratmwuqyf3rgu434pvlmfly2oi99woa1a0wv9qykke4lc3u8872dmi4ht7kcmew9v9giuncxf73ulsyogz2ebkm92xgkjkycrn2ggqw67hyf7n3if5qf7xyk14h2bjlw4qbvvbh6lur4xxob3npaootk4li44uw450sqmi18hzi98v8wzs6f8otmrczf3lmjlmk3jpe0n48dmqt1vcmyvskbqydn2dihl2n5ducs1cnprrb8wueoa47jfizzgi4vw3g25i9xvvp4popwkk3i1iskv2iqbumcyocive5j505lzbivz84x2y6wm30jkj9wbuhqp0kmdav4jh03wyrlfmepbnwczxum5hxqtmgudcjw1ucii2zvl6u17voo5ls58whjs4ti0z52tfhvqyjk752skl0lzqbqutkaq0dpdlp6s18wsy7913lbf56wftba0y96bmhxda0jyk0gwohmv0s4gae0lukieslorhln70qczv78jlaye9gxgdd048l8uh0lbsgrpnxc1qun95i8kbgorgevt2mkt1kz0bgh1rv6bhsjvijjxxel6ov9et1clmp9vih1n0mo37lq7v7ip5ycahpb7yunpmruqkex4m0tp4kat3qtti5',
                fileSchema: 'b1fac6tc7b1v9e11eew5yq7qxvrriqo19yr9t93satm9wcw640tlkvemsjb9kezerea04bd91qsi6a1vyw79lx39okvuunykytzmbqb0lw9x251iaxxwdmh4gh2zrmc6swmosyacq4euc9twjpwsyowoc5ykxo4cph40c0lxey92efpv2znqjxw897cx3rep3w0j3hlgy9w9jrcub6vgp0ki7b7bo868a277ei8fvgngwhfn5bub9ouz2n88a0ywl6m3fs3ms8jz2zeisbut73ooklc58lqptagj8x9rmtq6o4qc5r960oagnp7bkff2y92pd8ssyctbrgckhxvk52plbmmoi3k3qwtojmll15wersya1nbcsoiedgi8jzn7e4gzsrlo5sttelkdfmgp173qxch6m58qgmfvpr85g3gtpjb7a4b66nkg65dzhlhfefmqk7sb1c4g68huubmw4u7onve9fl02a3wn02fs3wt5nz88z5v964xa23zhi2tcndtaqgfsat7r7q7tyq5w0zzg8oo5u0017lbcmjqqft8dbthgk55pr30d0zrlxbgux3u6h9w26o3ejg38zcvnfcyo5aj3fr4qvbdldvl3lbzdyfznt48cxgs8he77s9idd0cwo52818yvqxxc8zrfjtnujcdxp69mfyyhis392d3lf6q6136nxmd6hzapos2i5w9dhgcknerky8qnfaz2vjcfkqsq0o2zhw7ov0phz44kgtdelbhjoe9fov30b4nhedfp80wu8klkbil2ex5mrvwda8fdgz7j6ipu7euk6merq0anus591wglxifl3dop461cjqecosz4d7hnrm8y2wn69dxfaytc8zen0lfhz5dflc4mmixgt6r5vdt2n0on7zqxjcf1v336ndqfaj32gxlybz8zfft1zxlimj67vy1bzmzr37j712y4e66dwl1c5vsbpe6snclcgntf8doju3uocr9k2l5zwyh8y1d8lz9iq8js86tu3msbykhgj5n6',
                proxyHost: 'ifdahwvu40qkwus3isrjt9smndqe4t6us4az4muizwxhhhsr6my5r87u8z70',
                proxyPort: 9786148944,
                destination: '83r5qld8d4mwjpfeukmpeejlfm07h0hafv75ryfhhh3axjppgaucikq7uxk0c4aup6ceixjmu35bcwz4uyngg7zhi7gu5846zo88mw6pwe2unu94idvllbwdwx3at6fah95hdbdjd2ob5k0vzi9vaeylr702ai5c',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xmftkqdpako87u9kt5wobsw7z8ucp2vzum3h7taj9465bgxfysb8c4e8kvzdg8ohsxxjar6g3m3xzifn7o9auzbq8ipez47uoqa4u5ptksel1n96awjoeomk031tgbolxeuexeliu7o94g1vekv9fyoo13anv9c9',
                responsibleUserAccountName: 'ktfvtjaepr9hcjvrsu0c',
                lastChangeUserAccount: 'h4op1oleepfb531e9q07',
                lastChangedAt: '2020-10-16 22:25:32',
                riInterfaceName: '5yst0x03c2z1gts8mo1h9p4f42v02jnqo9pl5r2h2hj1gz4e8rformflxjdfqh9z3xqeu6dgd0jyl2njflkdw3h0mfioeynqqjc0b4341ra9yqpppthnkrpsuumi9zbhwa4znpji2lc7id3gwncknccgjim2fdcc',
                riInterfaceNamespace: 'p9loguhj9kx1tbqch6ik962zlq1znbssxg5m6flh300w23tj84adkk87vp3ogd7th6wbiy07yaq1inw3veex8dmvaln6ge4u7tprp0h66i0mappworw7m6y3kqess9puc8lgqreu9bti3fdsgkfqbytt99w279fw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'sa9lsbv5wzy9mnvgrpbi96bqs3v0rk7bcdu2s5mg',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: '87cxcf279rlw8bmtdu0evd7vaczwfgvfdm6ovrjbjkou0vmudw',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'd1f6pikpowy5mmn3cumm',
                party: 'fta9564vhlsocg1oyqinyj6hybg84pmpi0saytv2vg3jreq43585y9ok7zcdelm1j2g8uf3mlnnrnp6e3jhbupc79jw0h22y9xwepr2dq6hbjzgat2eaiwpsff289fzp94i94mwfrmytwacfidi3kts3dmhshdmk',
                component: 'mdhfkn67ggoa36t308n675jx32kua3ob7aep28bgnfqnsaq3rbjh2b5k82e79h35khpcd5vnon8y2ioipyyxczdc8euzomu12ro6dxfr267wo5ky01xconqbz8ihbivopyu4r888498j9ccuw2twt3rwnsobg0dr5',
                name: '0hbv5mticmdjuufs8n05bm6ntobwz05yycvvj2h3tlz9vgpsx0fiewrwoytupnoetkdnh3ar5rpfnvnscob2h55t3eo0sssew6pe29qhbtxkhlzt9jbgpoarjz2knt6jwp7z2n42gteo0m27cae5eou5qdbn5djp',
                flowHash: 'tiar0i3b1pi5ntgnwst0xmcmlmo8p6qbgzvv9sh8',
                flowParty: 'rliwpdtcnaw7lpqa6ft9nfglpypguazjooyf5a2rj4f9pua8w8sko157ogpjx1wbxvtxpnc5pj760ve6ecelx25m4jkc0bj2rq8rjiaauy7mdukmgqu1gukbu3aauggdht99bdhor2youvkpcbu7p2rqyy8pmiq4',
                flowReceiverParty: 'r2lbekbdhyuvhepup4kau0fxaobsajo2cqmpe9qnxnehpbkpiymgdtt17dc0iita0cg95ya4cfs18fy7knzwk7jzhdqsgmob0gmuf7fp9v0zrke1vs9d6eukasnn853sxar01e2zp2h4ks0k9pzfaxd6hal1usys',
                flowComponent: '55d1zi4n4cq89ov2kqxc49uvkzfbo81ia6iw0vapthd0s9uljwi38exi543ldixvim8bmu7shycl046x0f8rd00d2gbea5icsntbwwnf64zj0pieanil17mzg75y8pt08gl24d8g59rf14065h0atu4cqap4hnq7',
                flowReceiverComponent: 'inrej9jvxtzlimygawrvhspmbbebwp87wkc4dzm4h5iq083e7mowdygdp7i3h45nomrkw27fr1p3aa2up57lz978dvfky8envi0nt03ps9k96pyj0jyxwzr248a6nzjp7o7umul876wvseo55j2j4gypcyx607hf',
                flowInterfaceName: 'vsmzhywyi37kqaf53nenqco429wzmje6yfupwrpm9yj7598tdznxz0pv7mkco0359rvif8w1t5ecpmjandpjger59hpjztkmzy7x6cctgu2m054zcvfr66ewdu6z3l7l60kbo336c0ihdrxruk0yc3wtr5e5g1a4',
                flowInterfaceNamespace: '92dzq8q3h4idasizt8f23pya28imx16ztpobys7rkham2idysxkb0w782kukhuznjd8r660ovaefu98deqohwbkcv9l0r4qssu89aazadfahdie1vwkcfrjnwfypi5l4jnmxc22c3lbhtmt3x7uwthi8douumwbt',
                version: '9luzyo19zs6ck0itby6u',
                adapterType: 'g139ntra4u45utouh7f49iznzqdb5r2pr86jg0o57vpcdk6se0bqp6h0qusq',
                direction: 'SENDER',
                transportProtocol: '2cbgumel31670csaiotjeqclvmoqd2qmz9raelspnn0ull1f7o0y79rvxkjf',
                messageProtocol: 'twjl7whvbk5jsyabh2i3e950qxxr1t3mfcqp469ocai4yvjqjmffqdv6gyrc',
                adapterEngineName: 'yng4zcs7pnl8oqwnkxid5qjegiwdw7tbkfkmhrovgh11c9ffz9nrup9k2wvyo0ghztxef0h55t5mblk7p17s77iw3x81j9g7qfxyzti67tcslbhzlj1z50lfhs0jiik5jrxojckc9oy6wpp6v7rpe6qfsomfl8ol',
                url: 'eb5s8bqn0if4i95fwpw5psyb1mhavopdqbj2vp5y3mjyjxw11ggua5osc1dgiv8it8rnlkrslkwkkost03o3sg8t6xbjet1u9fpzhy0g5607kj3b6dy8hp72dy2wwclwppth3t7fupggj8mtsb3wp441abuzwfc4modpyi78buk9oemxh16qivt7yadi64xup5wtvmpmpn5a0tkd4l5xo9hrgvs9vry7rpuy96339ehtwjmyufyw55oqkl0em5ceba6do2osaezvn32n0dfln7e1osidela7yux0u62ttg1jv0kbb9y3hmal3li8a0im',
                username: '82oeadgvtfywf7xr03vv3dlgwtu29tva2kd5d2cu57pvqzqo3avajlpk82lh',
                remoteHost: 'mjs1gf1ux8oiqmnc6tvg5r6uomap51xk1hle18a6mvzl7mrz8yxmsdteti98t5hf33gn4l131xsubrkqm8sqnrhz4y6bbhrevwjkt86bhdnzl5r78nszv1pzvkwgd8k8zo6m5lh1bb6xnr5pq1eyzjxr5wsp28qn',
                remotePort: 2395424339,
                directory: 'xh3zvzbldr3cfl54e1lfxtz7rpxa6nytm00tvryb499ohhldr5uy498ise5zwr6uxzuawy8nptt94z2p0hm0iqxb1p0c581pv8oq0apej50yzvsr3cv8isw30hslektr5eogannfk4a25yj5ysy7jmjins24hoxy46q9syy5a29d48t1lnkbz5t7detpetzmpdoj4a50pnc872d6f2r7psnj91azmtxs7qe9mbkca1z3dblrpsw6h2pl58wrlq32uz9fprezdh8xfwbt6yyuva7fv15ehr5xr5bixejesmswpkw02lrb55ej9acsfd5ck1o511oshsb2gia1p9uks4au821x9z3m01k8b702deryx7ydtqgbkkyrx0omkqitvh6vcq7cwquk98rswqfawwjzroweuql9b37bgnqrs63x05n3fetk2fm7bhk67tjsk4wx7mua2y4xuez12h1up10iwl4hmqgqhfs4vz5q3kadmnghvtlitqts0w4n7vd78gh0q0ud3f3lsn4jk0o1bx7xzx7f53obtikddaob75sqr5t9qjylfb7rtlhhmij7qnkubr5a2v72h9y2zzcxl4w4w9gngg0gjyfm7jeepyqrmjtavvtsjmna27t3p5n2fnx3n9d0fhxuls2rj4xroepk3geg3ars4hg8jex793elce1yam25s2ypl6j3vv17vilpaumyztjveem8u6jyos1z1hbnkj6gh6csiohh57s624y6jqnrc2fkh85sn351vwjdk6dawvme85cwz1htg03jde1kvctxbq2fwn1fsz54sz19kv0hfu7ta4qx5f2bxfazai0kej64xu6d9a2zsxwvdbonoovskuzctg8f8w7x04tbciscfpfwdgatvzg4vjf6xa3zi0a0s9q2htbqkr47ea4zoul6ybzl3oj8bgm3zckwpgihwrz3h9h8gqdricckm0cairvxk8lq1ddjyb14m6itzdk3d1kbuvbti9uutk7saa4f7mprtxyhxxfr',
                fileSchema: 'q7lrri4mu2e0vs69jkpl5xperpt2hwi7nayhitq1vactl5p70nijvkbm1zuksx0md9dvjo21j26ifi48qtbtsy24eiiozufsge5fn6ud0ejy0y90ikwrnw9oe1n9l1y948462o91kdcdmi38nw40owavdjwf5mapilobvpo75b17gre5h0xb1m16989e6iv6yrt2creh97a9xux1vi2gnqlzp3x2b3sfx95mm47wn8yansapav5wgq70w3wy35ys3cb93uq5jtaooinnitba18jlv1hp5lt7f6uznndzbuoxtfdfg5r6qlaqfhtffp4xa7v9nlwn221rx02yf8j34urrb0g7nj1ihp9211kzq0hh3xde62csl8z635xg2yqtb00q4pg9b3ju5otw22z4uarqbo32n9gvuv1yfg9dlgqtkei7ufmpz46o79evrk6wv21uwhzkqangykrwmqui8kocl2ev81q4dlsxoklglsqdj1wh214jczrcmk09m8iiryuyp74mfaxdv8gkevydd5w6m12w7jodz40c8l9lpyi613whr4zqktbfh82dy3qd7cnrhpjy5a4jee2qkvaxwl3ndn2zqlxmvycyurfwzu7r0moj4ho9b00pkck0zewejgmuxbc782tia3j2a04m2woz0ujdtntwuncg41vfzi2q4virrel692dcabpnax6xv1bk1kx26tcqhkuv0dps6ao22a9mgnpcyg9b7e0frs30i8d968hkl1eanotj1kg1z4rzxmyikmkvob5ojsnl5u2i3p94xngyeybiao8ecjz5hz809hfea5u4o9ptpzh05cfw8pgiozxklpqd62vlbir6v0obab2kys36td6byvgy10ctr2jhnbbd2snj1dgd5nelhxovtu4b6ygytzulv214tt9444wka0f5vqw1ajqdulnacmf40mgacyihoddf1gtk0vabyl5n7rqcjuv5rwjxcwutd0jm47jnaxcxd2ppnmuv5cqewh0aobgswfha',
                proxyHost: 'oduvwin721wahpvpqrw4gnm4sqmz5ptsudthlixfblmaj20vys4seimg966p',
                proxyPort: 2340233643,
                destination: '0ugsq5h55qz0p9u65byyuji28cwuuddxemyfd4hj6ny3xdk9mnj8848ysuopgmmdxx5mcjkpj7gjsuh4gwnov9boqbecb6o8k7azybezy2dwtbtbzw84k1d91n1e9hsq8chr7wim4iwftwepnzkaovhfzxsahc3w',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7l8gpz5aowcx9c0hfgzipvkeozqard16kc50gtjt74vfpm51ucfthvmhdftfrlz80emeg8d6q0f5rllxqslhft1mpjh4pfwevrcexhafkyb8jcznvy2a5lc12512lwnj0chkuyram9zlzezcab0gr5w35fc2tg02',
                responsibleUserAccountName: '7ip628tsn9jy4tvhc8ms',
                lastChangeUserAccount: '36r0ay23l3n0hzd5r7zu',
                lastChangedAt: '2020-10-16 14:25:45',
                riInterfaceName: '41c044e28789rjf7xfd5c43d2s6zeldroy4vqpf5vdidk1j1ix1nvn8e4jwwchdvayyalb4m0p01k05remvra0fz00cvap1asg6fhga8kd03mto1stljnmxltgku00el28xhmffp50ep1qqrlwlce1134ugskfts',
                riInterfaceNamespace: '7zt0w5164j1e5jsev2duootvgg050wtm9i1h3953no80znfdcc6mnfnwgga8o8sarjldgempdvvv1be13w4xit0mbeq06r5iacrzhejscmwlqofsadbmppyo8mbivfh4gc4xfs5ne8irncbikf1id5r25dc0kjv2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'wmtp3xt9j58zsjegn3wn8ah4isqeyru8p29n93vi',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'eqdpylhk3o0pczdvguwd9gaob49krp1nfvefcdkp6a72dg4b7s',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'h9vfoy68grw0ih8m4b9c',
                party: 'o7dmfd433o6unjb5lyfwllotx8jssi4536zrlgi703dz0xrkzy2odh1q3l0l8pcnwsrti0y06rg9urxyyjd1vnar0m7ie48io84pegiehf8s92lt0bt8visc607wrph3a7lbyfyuz7dvfcqvaaxnuiqp0kwpx1hf',
                component: '9s9w7m54ew46avcx1ikzoyz969sw50oz4cwqwkh7wjhje6ow4ocqtkksdo32j3v7wtyg25bqlyr0u9b9mbqpu17vswxh6hbkgqlnzo67zmfxmxajbnnezcg3b36ox8zzza0rm9dwidlz2q4tugctmx7nc5886v2y',
                name: '43a9dtd3i3hq906cwwqsjtqapjs4vply6srdp4d5h1sw56p8dmo3n72vbrtfylqqqymqtbior2cikh2szm2kxp4c9jf0bgr72rnk55c4en2t7raf8dedwmhhuzmr855gi3s19c9ua8txaznwky33tk6xfbu1jr1dt',
                flowHash: 'keg2pncr71iyetj60i2h7omsyohhqcrwoijtdkg5',
                flowParty: 'kxgmet9nopgx0okhitg4gjk7ekloyorl1wbx1n367ouwntia5ddl1rrusuoa1gwhqexaltqpjj3cm72obit6828ferwxw605lve5wp6ggu40uzq0wk8s9li8g756pealvpr4i8fltmqtl7m5995b7xqb97ycptnw',
                flowReceiverParty: 'bef7tekpt99y3h5b7alo5v2n31ulhxcae8z9xbb021ic338a9gud0kzzjw3c00jgrm25gcsaus7lodizmtautsb283wh75v0gh3j4t5n5booiw7j03h5wgnm2rgghlpuop4lcodlq10otrl0untl2ykqdh5bziin',
                flowComponent: 'fmdb20w50iafkavuc6jwqmarkryoz7buoopvn5vjyq7udbbg8qrg0bhxrqsu65527kvaz3vthkk29lnaxyx8nhe2bdd86410xy0mkpkofndk5g5qirwsqml98shibllfydmc8tb6z0tltu4rdv8lluj0pduspc83',
                flowReceiverComponent: 'vi84pn8bnwmgjfni6y3apcqxm66mjssw2y3broxx4gt3lomjr4bkr9uex23faolvp3lgklaptflzah88t1txtqkryfmd35v900251pk9c1hwnox9h0vggjbejpm0atmaiuoq5nsvfcrckiqmrz152u2t5umm17dt',
                flowInterfaceName: 'zn89edk62qrlf42ew8rkis0wzy1vtvh5hrltkaw85jusev7cgtbsrrmvlhjgevtlmqwtfuq3xmm7z6kc3je2s57hd4en84b6pvyjp3e60jnmc883ofu9bt87kkjhj4gofl6jcnxzif94satsl6ihm0wvz2wziytx',
                flowInterfaceNamespace: 'n06w61d2cy58inat760sa4rw68mitzv1dtf34u884hsjrp9bzpfdjpoj1tgwa4wl01gsuwtnf9lbvhxix4q015ly68q11pxkujux9pr5xz9q706bjitos5bkd5pskvz74hle126e20w5li2amuy1mqbrbmsesc16',
                version: 'x8wn5ez4h9jdzoy1tqgt',
                adapterType: 'qrmnn0cuqjjtxm00hj39i19ewb5am014vugzibzt1hf9uhaexswk4ro3tiro',
                direction: 'RECEIVER',
                transportProtocol: 'h4ipyi7rjhm0dvwese9tvgfgxtacw0iioz6iqajtlkqinaz3t5cofvq789zf',
                messageProtocol: 'fo87j5ts9mbu5ksnug3wsewj2tvomepd3t7j0w72xi33v2mehn7pycytmg1k',
                adapterEngineName: 'r94vpkhztxo5nxl612x62y1839qjah4cxmogh8obx9hu9jtkhmgit4wmhmwfewj3zwu5xjokutmqbbz7ccqxps9v20y61ellko97sdkeetxapv7up5jdqm3lsvdbzjep4zllkxbbpp7ocxejqlq2h3ucy0g96y5h',
                url: 'm4hsg7othurpu23n74n6z6q7aqvp7t96j6d44bbli6f0g5qrc9imgcfux0x1k466gnae6rgywtjja43dwrwfihwsh03ni2armisylpw333qkat8ew9rsb8l2vm2e3spf4ehoktq4gv90ma2dtb99whqtwreg6m2o9il7sp8gpctnsuuaou2xbeqb80s6dkz8hxxr1ozhqc9oasjo12catnhoxk97mz0iv51hwdoz9mtz4omr3uktcfo2j94ys5dr8qxjashbb9n6n25aj5dqzpw0md7w6axp0xa2u0vrvlquwapnncs7c5ycvmox9o5s',
                username: 'pdi8ui9d86nus8yqug4479rwz7948x88ydb52scytbw00u2lpx8r18dseex8',
                remoteHost: 'dkrdo2schtfw6xu746enfrez870zp982ft8kx6wvxrobt2a53kjw20wvchc7yqkof2i9n0llphgxd3mf6j3jy2kuoof8syl7ryd8zkj9o4p1hr3eeilkqkk1s96faaxo1u0x3saq4ofw87o2ahpbt4a2k5q81et1',
                remotePort: 6459336856,
                directory: '7gdgnvt84h314ahwan6qsls1df5213t69kge5qg9stilai7rc315sj1d658tlkalh40uzrqb28twz1rtpm6wr64zoqj0mxldkqkumw8g0vkdi8omzmxwos0ahn5tz3b3p04nmds4n3fkvvt0qt6ub3t4jyknei9bu66dm7hkkni60kdhptsyje3sdacy7v4msn2azbedufkvqlud4af3xsdz3idctu9zp8v3psf87jadgd1o7v1356yhbzgjj6853cjggz45ej7x1i8n8tp5yvbxn0fqi6qwtyo5fnr9i9vgir0imehwi5rj1wijseulw14knnx4ij7a5rqjfa8mg0dnpr6ir6vzl1rusic8qdzuq2bl87odfpjh9imrbavc0jvnsmrdrb9msehy94q57n5dd22fyrmky9y9h8q8dq4w1glotgzyp5ve5lrhtnfcg4ojn4sfmr5akvc4xsoew92m11uavc10vapatxmtv33777f94tq994jd2j8jugklo5yy2pnpwuk6tvk6n0cepa4cciw8y2xambwwyk8xgqc02q72zloh0h3e6zdg5jcauf5aggnvr7txmq25l9yf5i4g1niu9144znk32qrqh17xmbn1dqbh8ht0jabo4v2q9tbl0eoeki8jxnt1y45s1gajve8awajdqynhnr5cc1rui9k8p5okscjtzd5q2uydxyzc5h3kaoj5pn1lm182wgwy2u1n357o1tpwrdrvhnoe5prklrb8audrlezzo6h6rdveh3xkn28hudlwv32hkd9dathvspig1p4vm4d4f0psz97jaihafi8c6evwjnt0g3q1n9fdo95d3180ggw8w0qcc59b1z4984bl3p3jhsq0fuetyispbxjyz7j1iahzj3emygr10aq3e6106ud41i3klgar1yqrtte6uzpqu3kbvw8vh8oy35u8f4iez79bb64vvo69a1gafzoqpxu577wpniq0s7ggwyhwxccrq4lgiqyazm40moa0024wc2xg',
                fileSchema: 'rmsi474r687ayqrcxbzqmo60emsknwtahjsyjbkd5x4dwzag3v2ornn693ntft30xx840vkggqm1ulk4fgfplmxql8pe7uax91jmxj163gfktgrz6bdbk7pryvtwdjiokuvu59h46016y656eltuxxe1lky44tzjt8yvdxbplob13k85n5586hxxylyolkt0zydzd77m8qdtsmx3gtn8lmeufkppqb0x3c8wyr7fucwydfd9eee59q3pnbwixfku5ne7di2ou7jqxf8k2vl0931cdrbtru3owtkocaoxgexavsxcuy0ajqn2loz62hvhuxg0fzply4u866n2c8g7dp1dfgfcg237xzhylhvyqlpbvwel2ydnnounj6bjp4ev4rvlbrkbdl0la6r6avdawoqs99hldzcv1max1i7nzqc7l8hwm29kh3hvhp1ygnyfn4o5xha1o5j4gh51caxjxfafyfzcb7qsjzoehclq0zit88gouh08pu8d7b0jb0ks6fitqatujt90lefzv90klgfkm95unmcpg8eo1jjak2ms8sgev22smb6ll2dhfv7nu91l0lujtzwd8jzhvd3e7nv96xzcco871r62xk0mwcfiztjyrwpndvaxeru9y9qb5a5g8vo6p4aoumxl7ovo13yc7uzvm4m7ta22sjab09fgbmuclnjoco7y3xw7y2q9qznjg766ykr1jyulf0elucvavi69igwp4sjha7tidvde7b67een5sjnifzjreruuj7ofqc23v572nfv31xpeneqvwkv4z4bbafq5zrwhwlxm0ryqd26w6wrrlerr2cbt8jv4myj0hn40xwsugif2x9qecd1b9jo9iygebt55mmt7ins048tt7ugny5wh6vibzxk9c9r52jlyt06dlvvhbjvuu7ertfzhp6qswzhjc8l60glp9s7de3j9ocs9ycb6tos0cxjrw16lm9iftlnv643w8g89xe90ol6utvtsg1nfb5dhoxtypkyeceytpd08',
                proxyHost: 'e3aah9a15oj1kk3xoawuagpz37ohqemrwh3npr99or34j7v9pzmaedex49hg',
                proxyPort: 5706924432,
                destination: '7ox51ikxb2fl3phby4evwhno4rmfk7aac8ri7qvry0y8rhwr6z66pevshk06zubnq2qgofmnnp5lo80g0rikkjxkkmcufh5167y9mzyel7gmiwcyteshc7hmga8oo6525w9neow3jwxr41zet2uotrv68103dw19',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'iz4mlj2rlcb8e49okcoxn85dhweq4sk7atud6vfwzqfjlsf88l7ruhvb8ynxccxkjl8oostjs8qa2yp6tv7m0a0s9ncwt1by8pstutifa3s8fvpuudkcnajuf2ulmpld8gnyhm4eqcoy8gierfhjhfvg8lm1q72p',
                responsibleUserAccountName: 'shzgmapq2x0qp5czr6t2',
                lastChangeUserAccount: 'dwisfjkgf0ka4gmfkvzb',
                lastChangedAt: '2020-10-16 20:00:53',
                riInterfaceName: 'tfgu4w12dd61apoeuh58xqole2n4sam5rlbw2akq9g3eo7tx2tq5e42fv7sc56fe7i6dxvrg53llk0rkdw75x9wzy59ypxtwk8p7w156d7modg0j5s8yyeajkykxur0u0jgiwhqj1zchfjeyxlrbqt4mcii6bt32',
                riInterfaceNamespace: 'v1wq159kq8743ysf2nkpbb90xdtt4w8zq1a8flzxdkexkosh469sckemofqq392sn5wv8mk0q7zc5vhuqf2175hkzqxp2mk9puvh077ytpumfdq6vg87l6xvx14hf66yqpbulhknyoh23se4z8h8wyd4qxtc9uha',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'p8vsov470o7ykktbqkxeu1e4fakwxoiv4cxyyxka',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'pwmcj5agr2ahzt1ke8epuvgbvq5ydyib91m6xpbeaamija97u4',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'nnl8i11bjruq16dzh0o9',
                party: 'ngx6k0swlwpcskb5rckqyd74gi4uolesoehxv3yrynj1gti270n6kbln6410mwy721dhuw691z13swdccq7ltcldg9oz837fges1rpqxfks42gg3yt8jdo1722x5t4pk4lel9gav900gvzxda7bqekwajhi620gz',
                component: '70db7hiu363w9y6ugcb31o3zcwoa1j9rtgxrhbsfevgihi4o2nv62tb43454j4pohu7bwwwpuirx26rnct5ukny8lqus3ifmrmxlm7lr4lbgiw7vz87of8l5jxvno6rtfydvxnxe4794tb6y4ktcheb8u9gakz68',
                name: 'c4euqqbtvyc9xrksbaqlnertxa1weh856y96zab2xxs8w2n7wy53jkn485dki5ru5c80ay4eyjppz47ijou9vvuvt7vlv3f0hjfsu55zkj214rw3j1ht7uz0c5z31z517dlx6t7ebi3f22wgyetdpxngaarmdl73',
                flowHash: '1jibv2teezcd4ka1jooloh2juz8usk3jde4ybh71',
                flowParty: '0lhuhbo1k8jadzngqmtwkt8jdo0pqsh2czsvqw515x8fwly0qunqrz8elmneutcd0vu127ov4539bppecnl5ylkckz9h4sg6u4u5122e4glhgufda2tyml88xp3l74ejzrzfkjdyj9g3pg40c8bnzxm8whciu00aw',
                flowReceiverParty: 'eosrwdtw3dbpholxra33o4gllfo3bis3yo1rsk5hrw1424970ybprs88sn4ojmvn02kcvfmh9jtdt7uzmbcp9wh7dg8o7e5dxd42oza8kljfyhw5xhpyiikwuyegsi9spe62t2zwhfkfg8ujock3vgd6yzib9fj5',
                flowComponent: 'klmp382euzhhhs7yyu7gnuii4k5kc87z3uk6xtwpftxqjawtnln98s0ryv2pmabdsfzn416h7acr6t236p3ro5ltf3egkgx9ntmq2t0yxa1t2wqzc1w90qj6e7aamnlmpzac3ayv0dggqlhy548d4beoy01z5740',
                flowReceiverComponent: 'l0zwxrnruqwec7ivzfyvyl8lsfv2gn6xocndjahm1489bp53hcnv4ro0f64wu9qryegdpuv8nsu49beru0e8j0t0ppgikfj263ciho88nlteuylwasmaa94ojkro63pkjp1wwfrkqsxu9au838idfiaivglh9qut',
                flowInterfaceName: '48amrxyvh5lgubvepfo7k3r5b43znz2m3bzxhng0gxrj9jfkrhrlquw9jwfdf7qt3009khzli62m3xyyjsdd4fi2dog4bs4acfxm0m6ftg5wp79tcrgwa5nf7c5xs6rrxe3227dedc62yvwoz6pckwpnwd3xyptl',
                flowInterfaceNamespace: '27jrdjjnsru8dl081r1l66o91poxtg6rjg89tebemszl91n6fdl83bpsh5whxmktadsmitq67apjsvvq9jkh7a7bs6ia34cc99qevhpgiwf6hnuapik3zcpd46stgrayfz53rqvgmdnyv9u9w7l2jqh5tofnfug4',
                version: 'cyrmcbwja7q73qbm6fcl',
                adapterType: '9pbq1qpro245b8wzgnyqb85alzrl3nqiwev1vwr601flmwgd1wo1h7rq8dji',
                direction: 'SENDER',
                transportProtocol: 'u0b98ckikbq48ai47wd23u5kj8cwolp8qiawslr2sakkrvjvc34uvxg1s3ch',
                messageProtocol: '0yzpfq3z3sj1dswt5rubelymiost58wlylp452b7malvgrw86tzlr76v4re5',
                adapterEngineName: 'vxykqeycwceh6jyprem7v9soty3i6kdzn4ep31bff4qn33y0108bz3w72wdreri7pxepma8kj3mkvgwmm5tu9g240dyccs462f6zddpyvfzht123scjqr33noc3xsxmxhp2dhczhx7yrpmxwatle0ac97ongmujx',
                url: 'sngd7usuw14lidw0fhx5ferlixmopxjj6w5bls0v2k974nghhyvyra7jz1gwgnplvoioyleih8atmss8nnxuw6t2qsflu7c8k1rx5msp1qlcnyl0vfj8xpgp894ndw8cgu8qap9hiljg1s2bw2y3l5a1kc8jlbu8x9lg19rtn0ic9wvqjirvpyrzi9bqu4q0yx82k0ohpf02uz04sfhjzgcku8ru5qk2tes4f9cn0mwozf0qnrojg320570m9lixx0x0ozkuqcben8yu806by14skbsw36f6fy4les8kvveivzr05no0umnxc9fvygzt',
                username: 'tthkl5ivkv8tetb1dkytbp28trmv7kh0ylzjfoyn91iae5op7pvxerazbted',
                remoteHost: 'wnc15k8j9ablhi9thedcxwrmc8vc8lmtmv4re0wmo7appf015gy9ubymsrlkwa0kxgg0ibkl9m1omvo97f27ojfdaaxo1f928g8lqx7uy79erlfthiud7x7nwksyx3ey3t2vr49oa4qs0sd3yw1xzfnry1bd2biu',
                remotePort: 7526573100,
                directory: 'rq4uukcdv2bzyyjwxzr8yl5gqki4jyrrtdcwapawu34qgcw2lujv5myxstymq4vmh0wkvjxv99i8g7urm97ot8iw9igl7bw4muj025z47kad8igbl7knysfxpfjzlis2a9rau2d2c3hhz0u65fvoe44sozpdiwtsaedety9ec9omcreq5ven2oqz4fl01kxvr7qp15nyezebt4rtdaclhhsrxr1uz9xueoevov9qvvv56zrdw4uekavbph4pqtpfzt2uoc1leba0a9t0z1zeh3qucc55rvqfgkh07wk5anxtu92yxzrovv1njtfl9pzxysw4ncssbdkphquoa1u5zyoh89s4uo656stmc3irfapoowfet47ahngi8xs8wbe86en8ed4gtqrf1xjj7ijqvlezn0da760rd9k7ntms2jyz4g1h9lt1c7htd5ryfmcukg804z19og4vbbxeomb6befqro9te0582klipvs6g57fcni3ww64lfr931md28j13748ej1814ah42r5a077etrpfvx424v657lhe631mdmcly160gfdde74j3keuhl47bslkzpg48002op7gz9kkmoym4qudhqxb6xfw9x5ra8ym34zugaaxswlbeu0id4q5gpyyzh5dggn0tqqx82a9yfjhxzddd8o560y6iw9awu51krvhp767ptsxxsewflz2r1axt9qixktwdfrfcz70tp7htz8sa6oaipko3js9zfmwivkaa3t1xpq38rv12y56vf9s6whfp8djbmidw5snc1y2z7rx253j8n7nx8qqhkuwq353iyvkpvj7wl9iriztz20536y45kk4pigpkzfoeo0gl571qqvhwj5x6weawrprc74081sbejwlamnhlileq4dokkzi3bsnx170yqo1c3mtxmvpmntvxia0hxensh3ya6iag9i5tu6sw00sejzq1bceragfm06sfvddnvveh2btchxq66ibcjfh3l523n2bn9ax3yx3dx89wts0rvb',
                fileSchema: 'ngearytzjxptxp3cphou24et6sjjjv9gsatmroz1vny32zlkou72l4d4bhdzveme93b54m5lu0ij53a38bn99fykceixchsm40mj6353a41qn8dpf81q76u1cdwjab8gv16hjcyb0gog3t6jyaafbabb4ky558q9mzl1402cecv7zfz3q2wvxxi2utl7n6e2nlv5196johnlnt6mw3vtqpdlzfwmacv98nz0kkl5wg6cm9o97o7v6vczcvy99g7032g5b9yrrvu1xrucf3e6n0jzkwzh3rv7f43i5d96nrbj3qj8zilrxilabnhwxabo34fzk9cngxkmm3xvdgu0pktq0xl5kmvrmnn7prydacxqzacju22mshjy0eqxty8051fq3jnr1oelv6jy25gztexb6ubqwvwmks4xwndyfwrmtl5plaqryv94e5ifdxtv0fsl98t84396kwaa25g1pwosvctuilg9hktj6510gyxtjv271fzcc7bw30mpia5vrfwrkyczb3ynfsoech3a9kx727glmr5zc6706cm2foncdvd90ilkk0u1itbpf9sybn1m5ulpptre4bkg7a1ozkoj50t5ydbuipcjfw5gc26aukz85fcu01lauxe6r28417xdz0ungshnwjbwmptmc24hxri98a5es1tt53txnqno363ycs6sagk4d1drgcfcnrgpa4w7eicyvaibr9mt5gcnam25xa5gomln9svmdhv6x9fat7kpaathgumgajz22cdgejc4ta2chzv82t3zi5aynco518gqi9hrhq3d2lmkip3icsybi6h2cn5oqy9deznwb3wubu4dqlbxl8d5t3qxj8vqn2y3p4xq3l49x7wpny2asdi1n4r89z3rep3u8o9k5m6n9ie9kbr9b5d1dxwpo8kk190j0skp5karznqmfu9ij9jvhy0uvtwyqr0ae7zopla2mtd30ayphqpum3zm7y1o7lee0afo7pmtolskpl855d4q87og4owm40ne',
                proxyHost: '0xgfri5wbf2uf0a7c3rp80nqppszntorn161dt3ysrahx54lmq7gydvq51ax',
                proxyPort: 1733499645,
                destination: 'hykt8j8wcg5p7gwehogf4m33si8k5ghbry9wbf0q6i0szdyr576nv6mg1s3isoy59d5mup46b81awpfx6jmzvrubx7aotlkh4qwcmqwgamlhvbsl2hlur4pkdxitcxsj2a3g3j2n2hzycujlpqcw16xezgwj7z4t',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'sh7b1u3a9ny4l68vz1kuoynqr4gqnkdd4k1ksp11n0jmhlu4t1gu7i2rycwc6r0unas9twwt3nznc1a37x0xevmi6s3miwj0w22w7q0yi8q8b64th16tujkca5tlqhhkz8o96uthx18lsjhumz2h2mr5mxu9uhe7',
                responsibleUserAccountName: '58wt8e3p9uny9xbetu61',
                lastChangeUserAccount: 'nxwhfxrc7gvzb575ydy4',
                lastChangedAt: '2020-10-16 11:22:55',
                riInterfaceName: '1wp8g26ngwya3bgzlquppkrlk8e3fqe88t1qqfahzgthla893qkwh7ge4u4tlgodz31h2isdarwqoe0l1uy7akn9owe7bdtptxbih0d5ri36g7ezbf2rbbeqlr7w20legllct04jcntjmsvozjeldw5b8263ldvc',
                riInterfaceNamespace: '2osguq1n4sezzjw4tf5kwf4ncwmfthjb5r95mtodc4finq5o7dnlkzsl55gmdvndr6b2lzxx2rgpv3sw7bg879y2f0917ofkcdg0q4xncc9ix5q62hwgzbck09zhlmhxiauthja2edss9awd86owcaf3i3mee6bx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '2vv4vo4gkns2qkeonjlhwgaztlr2hk2vqv9chu1u',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'z6jm4714oblwhrt76qro9i1potphtyuaoofjtpi0od7u4kbzih',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'mexlmb5kje8k8gq2rqkt',
                party: '9upvqmrgmou4cimxbezui4xjvdqwjghrb70ne03ny72g4pq57ov66gj07p1clivjgrwh6doi57jfakg6ffpubvpqzy9bpanvroa8chcqnr6imjq66b6dbswv0bnpprvis52wzstcqcj6yg2yw0egjaahk4k4dmyp',
                component: 'nb77rknijc5ettgmj5kbn5niheu91a2plkxaso2uocclmrltoqi0jw1nj10oqmtpvy7ccj2u6fegsftfnq2orsdln7wtpm2xxbsni39ykm7mi1rtqrorzsrkyeqtzf99hfy5na6dpcx06ibmftffz7r61w2dpkvp',
                name: 'zia7lf0n8mtaehv7qu5nhfxdkccjm5iq3w5tlqkca7dh8x9tcj06jv1vtcuvp8ysj668f58u5amdtkyg0efdyux0c9ljxe93av1xfu1v03exbovzxsyaio403dld5fuln4zdvzfjjhjoag8tguf5vjpoh6rq3y94',
                flowHash: 'gzm0qpp7g3rqvxh6mcrfjmb4yl1jygzdvq20i1fm',
                flowParty: 'k0kzdgt0082w0hmciv9qtw2ypz3okhpuxjtoupexybn14b2ef0gr0pbllwtjw743h8mdwyjc8kkf98wrtplk2e3jp86hojkqbp4z9ojv24hi2eyvg9ctdv1skliftynza3a7oj46eklpzbuutw9h1ingeau3anth',
                flowReceiverParty: 'ncyoxlj1lyopxiwtj9z88ozgi44x6c2rhy0nez22rlyo2d4mmy6m6qrs5r8uf5v7ty5yzbo15bilhd7s3mwg9dkgpdyydwtns9g0c9yhprnrxvhq3myy0dt084so9h1xt1mfodxcm0sv1wmmqs944h44w0va73zdl',
                flowComponent: 'dtwlijux375iujvjqxn82qck0se6xlzftdem07j0m5ddrdq3sqkogpsnzhnogkvoe2k1x6fzpcbnpa2ioyefotdsvigavz8w4qhwxfgqfbaa2jefssgrflfh29lcil0jg2rxcguxmwm9oyxxc8tl2fv2xyb9nux0',
                flowReceiverComponent: 'w8c4mk5hei3hk1bbzjbdjr35an86p3tr28nk1787yq2w9s9u3pqyntiw9zecvei5b59cd40nrzi9tjmxh34oa0hg3kv382i4khzscuygedrroum0yziir8fg4cfn8jhjj5f0j01o9d31srkplalrv5t8h5q8xba7',
                flowInterfaceName: '51s22ttldrs5comts80bxaqpwvhco7cqtvwoqxfrr2ubd264521vhho77st8d6v0myq55vt9y69qeuyrwfbw07u1u442w5gzkgq7r3bo91mgn98tmd2lybf0wh3n4wmbt1d5181t85xkeueu1xnhvzfnima7zqwc',
                flowInterfaceNamespace: 'pckcdta3hdaf5oo9mbdaroheaypoy03hc9zdt796m3wlpfg191ass9zaldhn5voskvpvtgrhboasgv93km0c974bssbeoh93xbvk3ud21fcbpui5zwjtyljrzczuy7kam1wijhz6n0krt6kma62jprrph07ku8lg',
                version: '4feb5kh0cu9watsnmgu5',
                adapterType: 'ubf08mvoph1pb983w865x16psxdteghfzumyy0vkdar7sazlx9cyb62wcim4',
                direction: 'SENDER',
                transportProtocol: 'd7qg91um79gnjofb4vftewcoyl3eueglpbij21h1g8363seb2zc4bu4c9et5',
                messageProtocol: 'yv7p27rwa6tla9syjnm9co1scg1z43c4q41a48to8r1er61j22pfdzpu8qnb',
                adapterEngineName: '2mgpuvp2vp85efscc5xzheh2xsut9njf59qhly2zje0rwl451r9wnkgobsvbsprouyyn6w1p92k7jp6v2238rw22go7q9obb16nyjzulf3p2e9stkepmduw5b171q3rb1hofefa4us41ktr810qiffih14vpqgqx',
                url: 'kya218nk4qxgqu4fuwa0zi50eh8il2sl8drwdnxdzvw2nu7ws0twnpydu9g0sw45rsno17keilae23yim5b0sg3l26pdffxv2nv63dc3uo5vuxrwiodsas64h06647f66xaec62nm0plmt5963dtch0xz3j2wox4ikvu6w6ns32xzg9w3smnq3tm5k9j1a1y7sgn130f7fmn33i3vty3riyygomhw2u2ffkvqcfx1o0ttuikjjly84anesz49e9pd5eas37bs2rpg3rxh4lzelxzn5el9wqpccjg5ryd4d6eiykblwrbqxdqjvg9y77s',
                username: '9fx09mendfqxrs7jv6rb7ufx09f86k5mpdgldpxupvlmvygw6wicr6fpuo7f',
                remoteHost: 'ewxdhtqf7q5u6bgujg36ji785wrxwthc1neqniebhl5yr9zybbjx3lbzxmcqljdojq5gayyz7a4ca9dt19fcu52897q58qlcvdj2sb5x8chp7iw7pep78vqm5tpivqjl1wgpg3vvqlkpc8n4osje1tw9d5bx2ukg',
                remotePort: 8911115070,
                directory: 'd8h2ngymb71fxudadwxxd15twh7egd5g50eck5q3i8v3vhci0jp6b8z9vpjbhbowqasomdmgbec0v1qysmjyfzghots01bwnlhmxksbicwosokq4awtnbyzc9ex5fyqn4xakwtbph8qxrkq86bjo5609dlae0reh3m0kw6oq5ixa3apxwrv4am4413phvssaj5aqe9s3mz3opo2tsndjsrshkzyag5i51x9h6z5g4x2wt6mt1m9bg0pkrkffs00t0pkwkp07tklf6ad3thy4kk5s32keibae6uhvltfymc5s14lp3un64c73pkvoh0dkgazxlgj65r534fv3xd5j2vi8i079sktryfjjt9x2aqbsfv0jbzxhlwa03dfj86c8ugaqqspihf6znuh047e8m9fik58w9tsexuiy8gobx3qld1lbkn1q7y5ipjjsq8suh0b22xi1fo09so6ql8323178usot7gfkucpu0zxbc4v6agc6whpo6obzr8h6gh3y11y21l6ulczc05k2feab4uxti2g5n60qrr088rhgs3ti9qhx68x9mw4moefaizf1t0iz68t0rjcktqsidx9wnpy6gycp2taskikr2r0kizwdl5avwv4nb5gism6t82kxgcfndocy1laxsr3q3srrhv1y7h5ow8oz5fs96rzs2dyy4p0nnce9w8kefultc0xcward04sz7e4ziyzbg20tizw7wuu95s6drguqhxdz2dj4rzi7wpvphgwxtwuoz33p1c339so5ohd6pqbw1ipt6rub5ekdumqnkp0nm2rhxdiy4s3wmmxsm1fzgjtchh44mrkmgdjs4c7v3nkgwvdb4yybpzmhqbwojxy78oyxmd135y80suay24xu041clpae4uxiubsjk738g5rxxpfi58c4yh3v9uuzbfccshz5qcaibr33cvbzvdrq1jrjpue68r38ek5gluip52goicswa55zpxhsldg8efz5f9iu8yh82krthi6v32rjw8cm783y',
                fileSchema: '5npnxdcibbcb4f5zitsimb8cbp4jtgdlqzof5jakf3y2io7oilz04anyxc56mhgn42shru5sfsr6r5naue6ct3w6j0z03uwgfreng3nib7iuwq89kpcdee5rrk0t0s8u88zy7e385xtvztpedruhl4zst5oyy2fgu79pf8t7wi23eh3huzbekgxsbof4lwyeyotkr8knqa4azjynfoqv9w6uck3oxfomjuf64nhti5qmapyb6vmpo8gg089cvif8d9q6ufpza1lmoawapjqurp5de977imnb09caablo0l9j9eddr5u3o5h02azqdah3yicqyxdch2c2rjvh5l2y3g8bt1mra6fji1o7bus4paxkyd1owy89pk6k0tye2t5k3vhebuna136jtqkrw428jn2hqrda952abw69uzdvdq6mj9ebzj8hvtqlpk24u703dv6fusilzhiad2r1nyn4vr6rlm27z8e4dqgwsffeczixdlt4pdr60mavq5b6s1qefrnlly0yjmggngx7dnzadjd9av07rh6q6qpzvjfz8ild0a2v10qfvyyvcat07kcjwn2m8pgd2vassxzcrf2yfp034oq6jyk3f0te56fboep964fdhbua7k4h5jjslyj6eon0thimfjr9opxwqafx6ejyttee8rsgxofx80iqj6h4vwgzmrwgbss5rkzo22rlwcflhef802s4gd8jkl35k4r0yaeqzqecxp0odkco1zceyo1r3nvm2mhltkiu2zi9vb4pcbt7kvhn17mpddijuitcd0iaulfwq92hcp44mxzz3wnqrnhv9t1ag5zn7gnqc2ot6mn3gt5nbkeg3tgpeiea7u1iab288kkw9673jdaew75c7cdkgpg2ndme9fa0ozl5yvp5jievwnfkofmjy0x5boixx8z4p8qix4b61x2dc6k6uhmhosvzfzwuertfz9bnddxqgrhfrg9zwiu3xb9sxx7lax2wyrv7aw8ykzy9i2974mlrv2fh7zrbv1e2',
                proxyHost: 'kyx0lp9vi9n9hswektvoxuqt84szm4c4zw0zaalcttb519bj3mk488rkp2y1',
                proxyPort: 7215175490,
                destination: 'hxslwt8mx00f3r2uknr421u2hg4xqevojzq4ab9it4b55ldgte90nkshmtkf4hj67s8rjx2aa735j97stlsdmr9pzzrc7w6aeznf04pi4nthfql83q9mcs42tfrbst3aqlciun65o7zuqvcgkvuoyojpe2hne9au',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bzxrlc37zcibahthxggxctypicj2lgsymookc9di7vp0jv18tjl1n8tfgwby7sjr1xa0g6vedbi75dmmn0m31ucqebuceuiakpbajith7fe3yv7e6lvtkk0e5pci4w88tt47xk21djlj383kpx17268jfftpz69q',
                responsibleUserAccountName: '61y0b7f0gwqenr9etgxg',
                lastChangeUserAccount: 'vhrghu1ntyuo8q1ukpxs',
                lastChangedAt: '2020-10-16 08:37:25',
                riInterfaceName: '36nlp627amd6t8sncwmevnhbedms2wh43mfreypf8547sboaic2d6mcql17ol6w7svtq8fzisewvfb3zta09o7l7dealaba4lwucm0i4l122uf6wflc6dj0hoeqls0iqr3xultprhh7uw1eoqjgcgrqvdouw90pp',
                riInterfaceNamespace: '98du7xb9b61wvpcrdlq4hxlebfsymkwp6taukzbqkandej0txfjzh7p7cmerlhym2lwm3yi4u700mifzqhno52wfo2kts3eregy0e9oauh00mnlvpwglkx9j6zlfe088wgh40b31ydxb7e0uatbivc2qwghedndg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '53nmbxpng5rj7jsapcspzqgktep7e3zolqpjn5b4',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'sind0ynhvf55suxo8emuurssmo7y0yrzgmelzow7k93v4wn5yq',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '55tps1ll74qpv97y0829',
                party: 'x6duzwrstrlkgjjbb8pyhoy4nrpwvry0prv9iaak5elf9yagkywfzdhvuya6y5hjb8mer6s89nv0y08dedwg5rl7o6wt6lfbe3gya37jkjf9qkkyeitxaubpnflsq91zndt6rjj9ju6bziju0loa385lhin89uf1',
                component: '3c14lpk8ldxh7qc1p9qkun5belqh1dgud38vggfoq98mr2rmw33ije55fi301q04erzj2tt631x7rs0hqc51v7743632zlu3znzwj3ki17x5f73nxg6jw0jf1rysktvojafqpnksuqzji8xojlrxbj6ufx4rikjh',
                name: 'm52nfwqims8fs3ji30vjnrn49h7fqrh4b6p78qa1hcsi2nybdj4n17c251oz9glf7sp39ju8zgyyxujlql2aokqk9gbr6k2uqw5ysfoi8gnagvhs2l93tb5qvfrog9vb0jn708fvuwxyp1mv34olmnf5kslzbkqe',
                flowHash: 'yxe3kxuzfp1dxfyv26nvl5cuqpwkvvg484hjtxxk',
                flowParty: 'j5pmuwe89gvw02n4zl8xciybtgi094iv1au8pnw7mfyz6isy0w88ii29c1obfoevapypocs2ntekj0gnhwx7z7rjl3dp3jpz3rro7vpudcix7jaf5eftiva2qvukhxd7hh4w5zoc9ssnunue2k0zq937tnbq4gyk',
                flowReceiverParty: '5unf15ko1dqfgqia2moqgbdazn76gdcqssbvnyvwitn4qr7sboja4u4aya4ogb3t4dnc5c7983r27xz8wb0d8d893csgmsl0o1mkvukywatviglhcby1i160l7urfagx1aq4w0ymey4a8dcw4oml1wz0c8uppabg',
                flowComponent: '3k7kulh1lamrfavxrl23d2j5jjf76htszh1o6zsuexbkp3cfh57t6i1lf6g3byq86v1bo25p33f8atk6686n0ncj3sdo08zkbczcibqzstljj88qypb6i6p7yfjajsy76nbrewpxoi38933579hy75nf0s2vsc0ce',
                flowReceiverComponent: '7fii5peax8eb0cz087a4pqm3p71p5wmoyj9bg0e7maqec6wdss8n35su60sxbx7hhj1mknjem65j8edwzusjudgv6wc9bruvy42ij24jgrpzcyn72ozwzrzpojwcv4gz0olnaq3lp2kv1hz840dw06pg54n7ws27',
                flowInterfaceName: 'dj2ynw6lesbzcvdari3k7jnkrs3do7xtem5gi6vwfbgws2xc5f1tfz61jxkxac14rtsjvavy7gr727ykcohymmmgnv5b4unm7sq4zryevggnil1ca9nekt7wn1zb6guojaplv0nbd4p44sqwgla77st5tvo91o6k',
                flowInterfaceNamespace: 'dhiftlsp51os8fleexk87izacqw8oq1seywryq5qwyb7gdhtd1op82tl9aukq6tqwyw1gh7obdn79og5bts9726agnjuh1dre4du05v6gy8e71va8ixn307l0o3x0bbdeyjgasvtr7incwexpvisrg35rcegrxxu',
                version: 'fh69gymyn5nejc243g04',
                adapterType: 'ansbxivopd7su9i6fbjza5rg5muwb52shdnvjlxg4bomaka5wkcp9flm1s22',
                direction: 'RECEIVER',
                transportProtocol: 'qrzdgq38gz5vzd8s0439wgknyrrabhzg8dov50r51klo40s7ondbivlf8tqa',
                messageProtocol: 'vkxd5y6mi6s0b7xerkw9ftf5un9d96wfwwpnunkojwd05rwv6hh38knkpdpy',
                adapterEngineName: 'i5p6jvhecty3hrp8yfb8x4de81fks661vkdnqnb64sl33fd530ydfnlnn59xeut2tth8ykmu2reatqnftaftt7bfpg0gv1av0c06i3uulenn7yl51buactkv9doihduu5xtiffjo0ndaw60tz1hs0jqg8d5e9sfv',
                url: '3r6zw6q51n7z8u90oopilgowm5mxe9vtkjt4syv1hy6v2ehd4gpz1ttkjqh3w4m450nmwn3p6522jjm5gmsp4h3t0z92ntghqayehm3qhg1f7kibr6yamrl5kx88hvhecmgmns7qw5q0mflogrb7z2fonzhy2tphzxe4hu299zn0sb35ql22z23ux0kmyic5s4k738e38o9hlgusxozk3qajvx69lq8y0vyf1wwh8sxwhnehk34601nfzrssnalzrnq03210krd83kzxe0jiqh16lj51e09g6pzt206jlqde7awnu4mws34xec4m4qc5',
                username: '24djuffee3h5xf55eelbw0npoqovb6nrletqq589uwld03pnpf3qss8oa72o',
                remoteHost: 'lj8emehze88swdsyq5r7r0yv7zgjga97awcyxmoqhmbfr0xipdk50hsntm2umleq3zrrudqujqvdsx12d0qwpd77bwvf3ebij78s7awr90yma6ydumjbwb5dhe1hgbspwjr2b6qc8oi8jr5y3jfbo6u0i08e4rx2',
                remotePort: 4655166930,
                directory: 'ji9ly5mnhwaludkhxgc0q8xz5gbbelsae18texhmx55kglqq2pl5prorcya6j1ben447gmi2kjwksy06byem03yajol08bb8nad06dkpi7zg8awa4et6i893iepag60yid31zdwsj963yed49kiw1fvisy4j0skmka072co309c5ewd3335y82fu83yp7lsdfop5szj8k5kpgeeu3062w3lxavskl5vgs8oxfnibkphe7f6l6pvmyhgia2idi7re7lqib7x9lgx33634n3jp50t484isv7d0mm8252t1n4otvg5v5yud1xgg2gpngowtcec8rqvmi7dhcr9f1o1mob0zvjde0a0etpirft98q8qgbtb7mwfx57089yhtoc2kxoxjc8rinf5qqj3bsjnxl7jw0gdj4t92f4g8mez71g6v6dad1ywb9fngtx0zzlf90b0y34j15gskghn0lkiy4t91q953rj9e6so2krdosehsg371d6b1p5hs3loh44bq3oapkyg4tp8a8q900lsi60sfzc7c61u9gi98zk46o6hhx2n7c0hkuq4fdayrtgcwadxssabd1uuuuzzf96rlh0nbn5914i66sqj81dwaatj031mbfk1ymmwwxcnh3n98blbus3gz1q54y6ca5hy954xcedbvgsbc49h5kan9k8wb4dtaygfnprehl2ec3f4akdymsvtjohq2wfg1qzv54dtjwjrbacg0yrkbb23dj9s0ju27gzpxbj5f0mamwdc6gzet4tb8eoo5slmo1vj9gp53kjcq4x3ol2r4na32ru92akiimdllhfi1e6lv846m03z0yzkh6o087usqfmhujziejbmor8epaax19j9a831ok6whjo55072nyx1n1thb0yuj2zmr5t9x11ij5ckjlawalmaxrsopw2a45k2o0ju85w5bc6vema96d1usqpnz3dh5fd4zr2qt3mx9oivosdhing693qnru0zp89w01666lg5s0dygd479i1kur3m5',
                fileSchema: 'd20n2rk7b6jmp5lc3zti3xy2ziou9zo2s9a8exg48rgeir5ljm0hiwlawb297hw4piwgbgiyv89poh0bqnmvo9co17okbbzesyku9cvka1ek1dqxaaao5rr9oslyomy728e2hzwua9h0bpnk339mt5tc98jbcy529thgel0n956fpm9ehogwpd8hp5bsgjcgjaoqmcvtvh1ub2dpdvdd1y4w3u7umukzlk9b38n6ketnigsqrzpcaujnjltny4no4mpbzlz0bdwhpb6ebxqfzk7rsbx12nagwc2kepr258bkmxwg9ebimsanpqient5bccquip51bn1vu10o6boxvub8ggzumtdxs8vzbdp3fxk3czzqchcx9qma08bhpyra3arnw0miopd11d2tjvtampy73ge1r8jtl9t92gfeeuqius5pyw7ma10461cvazhxdmpv32rtgn6w9mnacqlj3781iusd81jtfs2nh61nil6gmcozavpf8syee1kk9806nve26q64e7oknevaf5xp32dpxv1rswjnm1d4b6b81t4zedlv0f2s3q15xyts3e9wpme5oa7gf8ohrpb6mqlo00pwkw8xcpf0z0gb2v3bt54k09n3z8p29vz2y7l36m7r9b1fkfbs0rejf9bjehvvtjjnpxha5bze6zuxx9v3ugrly0y0s23ltmooudv4shdnj7jesys65e8qccw5swcwli6x3sl63palgh3ik9itanrha6n9hprgt6tmuw75oldwbddtvbrjlnwtdt8x2qo4fif1bab252jh9347ucqyv90p4jh53ujz2tpfr8ij5zu0ks5yfu7ccqpfc9v60x2xavcqv9fxl5353io97lzr76u5f9nawh284xvh7n098mf73eexyfmqmsfbo66q9gjaaon32ejp9o7dy1dqzf2bted88p6rpkeeex7gu8wei35078bzuo7j7jkz96atdgm2nrlfyuvzxsoywlfxftpaf4la6nr9lbg4myya4ihu4sf0',
                proxyHost: 'c4amd8clq7jj6eogh7z9a7y3wh4vxk8fne3yvwi3o4kf9u0kvvvv8refft2n',
                proxyPort: 7507566598,
                destination: 'lapzbl2y2258ljibg0zf4z8le1z51xds94fqnddq2yjjsu3i95gclbeybod035s2xihweadsyw3fhowsy9flccttgdztcfn7vtezge9syd829j2jg9qckncz90wzyfb8httxy28e0jm8q5jgrhom2e3nzmo2ise4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6hdrwzkf3o6fymiw6zwcq2b7fh62a3nqr9pvy5xe1hra8iuok8wexwdqmv30738s5aoi59t94ty5i2rkyes3svhcfi3zu8vvqvqd1mn4zjbd9usxu6ttumawmtq7evwb4rbo9rcqh3ssg3rp587413e51n8lfeen',
                responsibleUserAccountName: '3ybutyduygkxewrriziw',
                lastChangeUserAccount: 'tg4vcwzga010qb0onvzy',
                lastChangedAt: '2020-10-16 20:18:39',
                riInterfaceName: '5x6xz0bng0epn9rr16uwdu7l1icy0dxqh3ck8v7945c1wsipamlhzkz2g1thy6kmdg0tqfgvv39qhp6q2hfs2b3hr1u4md448y88n1b4geabl3krs1csi28go9p4ad9z04pp1a0zmred0paghkpswgahnw0m5cxw',
                riInterfaceNamespace: 'u95vb0hukxmuzmjir0j546oxcl371v6j521hfkebehssrqlqdbhjo8lahikl9w9qz51m0stnjrw3cn1joosswefy0r7d4whkkh4ki408jwj2jztiqxdo2dwh1z9ug5qiavoe8c9q0aehpv92mla9p1h9q1zret8g',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'ld9qirtaizxvap50csfs36jjwwad8vjkx0zrgqfg',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'ee6q357s0zu8wd9nrujlwo4zghvrsf5z56qv4bniq12hu0ohfs',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '6tz89e06bkm4qnarlbaa',
                party: 'px6slia8sm18hze8g22jsmthkvx8o5tu4focq1rzevg0i5mybjgcndcauzuhv2fkkn75e9wy1qrc3ptnuwmo6s5jpz0o807n93dyvz31agyx3xpv6xm5uln4n13uugksqasav6l8dw1wc8lwl0pp3atux67eah77',
                component: 'osig0t39vmlmahc31pwujb5uac3z1ayqbdjbfen9bvpcqs8p0xmdvcyhd5hd3ie4cznt7a7i22mcslo2fba33q7m4d5bn08lq8491g28c50xnb18gzig4c8f9rspjpdh152u6twvz8usockjsp8e89u7qyq9d6t7',
                name: 'zn5d1q5xf8opvn4cj5zzi4hgrslzwysrht8e4c8mneutmecum3xmfnxncsa3ow8699aw1c8kjizcybd2ys4brcf77kjl64bhqys4vw5n0tsifuwyfg5pqop9pbg5wm8zhrvc1aell97cuij2707bkp9k7h371sol',
                flowHash: 'vgokparnn00ogctijuxn9d0bdnp0b05pwzaycn75',
                flowParty: 'x2wu84jvyfb326v85cthwi2ym870mo9n06nufmhkypjkez8d6tkw8wuq8hy60sfao01lic9zw3xb44nenbqvepv6bm9amqitkeg39zhylfuof0ck6cbi87u4lpumswmpbtaarnsswddnroa7h9379sd8q0af0huu',
                flowReceiverParty: 's3jl2e1347mne15nodg91t4y9ez5zsucoyk7e8a66w2ysyy7erj6m1wyeu9gwzwcxs8p0hcclnttukq1nr47edl2cijxr9rbpw0fh6orc1wq0r7kr7lkk1ukyos884rij4cau0cfz236kba2od2zje2zjno3029f',
                flowComponent: '6v6a3ngrlhadrdxmvppbkou0wjl8qrze071orbzo8zo4ydbk6118nls7n3gd5ulv7ba66p55x3ncdsvkz4xqh9ic2niwzo58nhqie9w9atvo2ferhu91he5mbf6mw7k0yf118wieua9kahd9rbe43oxygf0lqt55',
                flowReceiverComponent: '7on7a31qlxmwl5j9a7dbbfb40wi8jik3qa1xf9qcflqzmf6w6ocobqqzgpu8kqxzgtbhfnmqmpfydy4f5fy0dyuoj705nhchyxyj45qdqs98iy9f1pr8ec05f4g01l42t6xe76ndesass5jmi5cqr4jngkxzfga3j',
                flowInterfaceName: 'ugjw6ka4hm6v58hxo5hb57zdeomz0lag27s76ud1c0en8i8z6gknf0smhcvb1ncfvhfftehrgklamv6p00atzlfmqzu1h4c4x9kyzqxunscdvu8uaaqodyfdewgubn9j0f2gcte4foxznku6ajzm6qzx7n0a7xn1',
                flowInterfaceNamespace: '1bv1zrl7op6h222qobkkryq9pkrzuii6ik121wmulv8r2nikt6zje7dl4h4tscxenodlhvznjvr03pxohkht6hw7q7vo31jx00owr8nmn1ad10qyavb3n49n3oxepyrywakhc63uschpiyr4hl6wqjkmhww32bvx',
                version: '5zt1zdajrnv3ye65l5q3',
                adapterType: 'vrwx4jsowdc76gd3monrl6wb2r4xd659f7m4lt1u2fuovz0ns7bcvzven7r0',
                direction: 'RECEIVER',
                transportProtocol: '5pb318oifaxsv68gj08av5st56wglchgo2wbw63alvz5e0cw9ixwwnkdkkl6',
                messageProtocol: 'kmjzh9b960lyhuvajtzvn8p3o6peugt78cz90z4ztba280po847veoxt66z6',
                adapterEngineName: 'nvti7rzywg70z94yvj64h2kmwh7j2y2sus4f32iw8ccaxjrvtr1jfkeymotx5delu9iref8rbkjiey11e7zjkjkek7xax5zzc7bevdp6zz8ry2fa67qoi7gvze4z5rayzxituanbut45eyclctrlxqsdbveecucw',
                url: 'ss0zvpsaz6yn1ztgi7cv66k2yo4590egcd3sfsoejif4yq0g6k2xajk96q1349nb874sy36khtgd74snjebh88rtjcxx36v38gl0l0zoyn6o848ohi2urzmmeib4cxkl0cz67vnhucyffsjwb056f2jwbkxj8t7yr3cgsro89olgk8vkbh7rogdirqet13aemg0j8gg74p7z4gwvkvqmfv30t60kho09ujny3uf2b6xwosg27axnatyhvrwqkqq6mj09erefdyuygug80ibcxpb1oc68wkhk4i11x9m6ecm4cxk7l6w0xpn8xrdal5ff',
                username: 's0hw6djt3hdf12og4grop5jjruj274fuvavbhqqx8j0vb6jnkx3626e53spv',
                remoteHost: 'a0ma65flg5erq77jyhu13g1ytujh57a5y7lnnjg9p2lvdwrd8ee7j3wn4l0mt44tdj21k73l92e6xvn2lw89ig8ql7hanz34jsi026hxyypcoj7a6o3qz6hxqm00bsg9wgdg5a45u4e3klm8kx8rxgsvq8gpktny',
                remotePort: 2733170354,
                directory: 'vborwjg6xwnzgv5vgvbhokel8p6w1afpf2bn6gudqdpjdczohue5ktz62vy51nla91ug1hqxr00qv4cjbslfa523d9ih1cw5mcxyews3f158rpzmivuduyl3eq89hugpirtexvstzv122m9esial6nf7a41oaubrvxpqw38d6fpsew1y4cep3rks3bhjwbn6afnlj70pa8yw2t1obqcsk9dwxommar7z36g25izqnxe3wocss1e5tqs4317cjkoi92sqd6plf3yi1x0221oka5jtutbpw20pnabo38d0ky88474l37wot9l5vie4otvv5suwy8yjra29adv2tqtgbt1qddcns3j875cav3bxejrdn9937uv3bj5owlgtlzhwz8w45k8710nepm8q2qpqeh1hxrxftqtv74muuter9qa3tn1o9z0eayb6xj20dk9znzbozq1d1hyzo5ocquk188ysxomhc3ouokq3hs5282ediym2ib8n1q6t85pga2gdwcqpx4py3w2q0djujeak54drqmpsr4kx4mum9yo40scvzgkxv1ydytlmobq91g14s08i5nma77mhgo9aom96o1xohv3iydvf8gtegm3clug9suwk17npcfn1l39wgj2065iqkvaavf49thr79o2zeczxofahtlwdd9m6ojrdfl8cvy58iz7yuxk01np1wcks6vy5bdfbljus42wje123q5n3azy2csbw26o91gt75zi3xbia7btjfutnsje28gfk0xg8ix626gu5r0zz13b5n7krwvmjn133unzlgr7flt5ybvfejip3zwt5nd2067xhe0dcw5emodkziiqxnhws44gdjmrgdzrd1zgawdiadsgm0uf3z3g6mnb9p80c0mzjn2yzf0wpfc4m9bmmillrkd0v7duch2o1gw7wy4wbbtqfgd2lsvzqm84742c80wxbuv9gbf5mfppn5c7tukh0m6d2kd4k1efs61efog52dwpzwtcgt8r9uvfi86kgjy3p',
                fileSchema: '9fblf4w3p853uwpsurppv4kywe4eo3n1fu2i9raeuinewd5m6mkrod06id6b5lpmvqo9df3fsjmrn8nkn4ymu70kh22n8ywtbnvskylikcw718kyfy4qcx6jx90xe4mkvy2rk6183fdauecqg7qtiq0toj8srvnsujcqboy1yu2bf1fpebf73puyh0infcokvgguorr0ezxv09uq8kstfze8bcuogzzu1znu0axq6fhoedsk2wa5i22y25ovofoyv38nr4iwqfpb6biwz5i4ykzo18udhn1svoanje0in6adh70ebd28qgnws2lthqvd0et3627ovqyd7xl3kswwohrhgt13yssbh8f1fkf0a9685hettsih95wu0ow32g38cw8u6xb3ykvjj94eyardeu6z80ifik9tbhtniib3lsx5lge0uhhpwbkxo19fafvcmozkwwitxsg7owfm3d54npsx0m89rn9wew0xz34dqvkm1ny1rnrmb43ooi8tgwwg6xfyuzg58lps33tvb5mnw9iwfb3bw8g8rhyt4y38o8yelqaojlqqglmm3cailconv0d0q9ghqzlb8z4b0byn8cu71w6r647t35ywujh830fem6cgpx8xfaeztslo8oasa9o7v3xmluevr871cny3e3drryb93lcnw28b4ruz3f3jbb0rnfvih02cm97p4dufq2gj6lu3b03of2wn19xrb38k2428uaiqer7fxxmrdf1qtjray12e7mv22q73etyhl1r8qg1h4brsez25cuh3fnwo3a5yunhhl6qomlcum8p87n20fxejn63p7fatqqlq2lyng3go861d001lysk4grqte7d9vtinxqze45dr4541k3miltv80kpk5ezu8wuirfktalohslup53ctocg8iwy2tisayxaeeeodb9pwxxixh91bl1xxx08p3m35d5llpd6hl10i2hp7z6uv3km3zx1uj57g2nbpzuytr8ds4kuldhl2ggrpqryepwi6292m',
                proxyHost: '5wytfxtqle622z0gmqo5b4gilkwuvs7pr1e8478hwyqiolavzdqu8lqiwu3f',
                proxyPort: 1047218101,
                destination: 'et241x0rbffpjsgms1kaand6bbs3rz111wbqq3i73i6171f5jh52mw2mo52zeq9y7dl42xs6wz9maic8useb10rnk6x5bw0w0jhko7fksnypz72yfqoy932xiztfezyg6fs09qmt86fu79rv98zy6lv1by770sv5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ljajc6h3x7et8pjdx70b6atdl865fmfrjxqs3ftf2b6uuezwi6l862actciq2k47r5c08rzx95jzphorcn70tjj7lq0pkcrle1uozfziv5jvjeoeosyf0abaezsn4i0pia6wa0nxlxkdh0x07t6l3kpmyaywx17h',
                responsibleUserAccountName: 'lolsxfdsxatr3vj03w8e',
                lastChangeUserAccount: '584x1dyobghrqnaz8uvo',
                lastChangedAt: '2020-10-16 05:17:58',
                riInterfaceName: '3b372ivifgojztlddllezk5sardwp65j37fa2oifi3mt5fkxh53v606z9crjd2bj2mhv4kf4osx8q9sxmfrpbuhuvgpvp4617n1afbr4jyikdoguuqz2yzfc704pm9o0rppoz5woths609r2qnoz0fot35m7heex',
                riInterfaceNamespace: '2afc3l3nysjvnn2e2bn6focotq1ks77btu1zy8ys9xoi8jbph5gf95vulk955ohh5wjrjrle9r1usm32eg16vpcog3k13gp31w7nhw0j0jjpx63sbqfxtshndn4uvgjvrdsxq3sb1b4cvl44z6kt44bciflyyh8n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '2o2yfasqva060ki9ogvfua5t7wm3frtky73e68ep',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: '108aq3zy7cjqnqinefqbeq5xzuw7kj1w05omxavw85ua7xi25a',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '7c2wrxg0ksepdvq73p7a',
                party: '4k3a722b5lnd1suis8u5t89prjd9u6599ob2ewlfdm3h10alvkvwdmr1keif05fwy83d8pwxk2lsktbm3h1sttnfdbooejflok7w1ewtdtbk2syzqi6i0xypcur2si54dea7fxmh1j3cls41syw9bit3f8ui45zv',
                component: 'l90mld2omntyq573wj09dzo02t3l8ez4snirswkbmxa04kdjfe6t1g5z7b8v1qiqal2k08zdzpmx92b4rwnkmrkd7cl7xv9v8ke1z4kc74to3dn5te6sppxrkt6plbr5rb6j9lmrdfp5efxb54dzx7t5134h7o06',
                name: 'f2ptls5p7nz0ti2zvlv560qflngmmoyip8frob087cihgd8cf3u5kvcf4v14mooayx391xiiotia9asscrmq05k8cz4hbbcvepk49cge0dda4yzgihrg97g2e2wwyxapp7u5n9abyr2mg7cvzfzc84l7m70px5ta',
                flowHash: '39roe9ectml67jmpl7pezv37f3lxt2hsb1b9dmvp',
                flowParty: 'xikjpi9v5dln2hxt8n5ip3y1tbef81w15jqmtwvt5lrkb3k6qo6p5xwmht9gyhhjcg2a3a0enb1t43p76xtvj546yp93y9784a0o5uq7fp1r3o2q4c5fac9s2lm0y2uh6efyeo2mwxvqdyvjcg92bdmsqxo2cve6',
                flowReceiverParty: 'p3upgn090xn8nik0t1v6upwhv73sc5phgd132a8kph6r4phhuv4hnor8b0m45x8yt6bxpi0jds5byrjjqhmmixgg06zx3iq5fz7ftm1fg9xrsff8z14pyck4qq2bk3yswbggxvytkcos2wql75iw21pcx6h8s86p',
                flowComponent: 'npbxg90doqhivaeyd573ofggjuxhcvmqmlnd6rcxkz5iq1r422vt4xq2bnzbn9kdetcz8zyjdhv3b42yw4klytzgeqjr55t82imq77vvbxmba7ay2na8xj6wi5tpxwa613kf8xnvddeh9fr42f6vpdg2agjlk8os',
                flowReceiverComponent: 'ym1lkgvrf9b9z3fc8m1c19vucf1gwbsava0v9f2g4ejze7dh0mw2k30cz0c0mmb7w2p3jxteny4b082gfo2n21yff1w0q5j11hn36plahqlnpf62ijgwuirb99o4bwmfci85yxjhc4rm46cc5l9fu3ceidt6i93h',
                flowInterfaceName: '7ktg9s83wfzqogt926zhfs2cdwf6r7z0646imy1k5bltsjih72a36je319bvggk4xryfb35mgg2vqkyl5zhomutn023lkiatkewefc5qh4ft0w7xqw2bn4xdsg58knvciy3hjlyqlebnzzajbv6bah60t3f7ug13t',
                flowInterfaceNamespace: 'wfumkdatmtjylkrsom1shggtv82m4y6djnoa9yn5d536ynik89keuyicvjd3tyrhi6zgto2ukz0f7wulf5mmvdbdw2o3oynn2c3nv86apuzwc1p4sjxv968187p4updih3p8amunm8k52lpfainrkgzitok3vhmh',
                version: 'zncmhmloar8uh8wqlkvk',
                adapterType: 'a1a77f72oaozgnrfofk3ulusejlkb6oir7lhm1aua8zmben4y4v5ogqy93e1',
                direction: 'SENDER',
                transportProtocol: '4dhgyeb0p8p6xlcbbo50plakfkzidktt9qjfa8cxp965n0cnnfj5xo58njfh',
                messageProtocol: '7w5345l0asqwu3i8zig5xvf7q0jrgo6nmi8cqb4045nxv8nhre5v12h0ril4',
                adapterEngineName: 'dr90hcjfyvmcukjs8uqm07iqrdiuszbzc4y2c3bqstspyv81fqlc1qouw2sy88ag1hkgyhypmv7kg2f0pxsoxpuuyj7y33vgda8nymocrhbbya6m9uakdns3pdz1pflh6np5vmdsbekxdntthph74oqzwi164e97',
                url: '18dmb7p0nrqcf5f0gf9zry554tvjid4cedx8bb6zcypblw1ynwtgvjrkkzzqpelrny2tu22skw0b54o7wxvvlzjnh8p9gpmtx5d2niq4kpbk743cto0vzt6mwqr1ms042fas241x80gx39ysivonh0ikm5stosl0vquz4sfl8b1fipj96l6rsbt3yqtia94yrh903jgj3u3ghmejosyht46bva8o08utt561nfg7i5c2w5mhszbaqhlihqhve3fv57vh6avr8kj6ekbumdj84z1dubc3sgciushc3c43okp1le63y3d8ppqz0gtw69ch',
                username: 'q36tykq7jzog0e1nb9djh605ciu4pggt3iit10avhjcuu9lph1grkig8kbvg',
                remoteHost: 'sw1kb837ovaxzxodx57dg7iw1a0zl9aftcrnwsa5awyecgea0sbp6duelc08s8gadjbp7z12qpw6wf8hpu5d6pug560xsd6txmh5kq9sc609xyz3gy54ioz2z35l05fult3cyppdtzbtqqtxnoim9m7qbi7k2spj',
                remotePort: 4598904331,
                directory: 'xxect1vbjbiaj49f7pg0mzknnu2cx5cedbtwdb3wsqtdqqu7zvy7oe6ei7l5o9ladkjkghu8gau2ezrnkif5wbuipnf6s4fxnzpyei4v1ocl81nqtc03fk4f1etmw31lo9hdv8iag7gnghoxqyvincivb7rc61motqml40ehsouuk8iratksn6hxdfvi8ayxgz01ntbg6pijt32jdkifek8zggf0m82qikp6w44vwno39hsgunw5nfhcj6xwb005jqn8zecpieuapepc4nvhjvks7eog22iuhsltwa4xfmrl6qxgs8kquyb5elz1t91dqtqq2s7liw9erlt2i8no5fy742qg8rqfflr8luso42o8k8cu7d5h8cbva1u2xmkgakep4o3nbsb43lpqmqb4uzurqs2a3l2pa0ic7edx6b00qk85of6aozfe53ip4k9soroxlsrrqb02kdg2b92wo7l1o6ggdz9iphuubzpy9ogune0tqzjebfp7j4551s7xwtb3ou8fzihjrhu1cs6wci28lz1tqz8w1tgxilz15dqfys4prtllb35e7n109wafj982119l517lysvhtgkzcah7qgx6odbeh1lsri5vrx40d7a3437omjlu52p9fapuf8a001z8lrnas5jt5fvammqc9w3nse65sfk3y7anf27due0re6u7nmikqbj1kz0pwe51qq7cje3zk34jv6nqemz891c4xbg5tvvinnjdannbtrr2ijwkpdzti304puqbuo8kdz26tby37ijfcyh9x8etafnnn3ziq38vge5vgefwe9u4w42zdfbovnnl01528rfyj7dz9beafcd3dj5vho34ecvxoeqopkatzlautykzwhiphusnanl4fb92whby11adjvm1zjjao5zg1kwrkpo7i246nfj49s2sf7ah8bt1iomdhs8v4xxx2w21dlxn5637d828e8cypcrmvaff19nwnheutjq0qjumnlj463clmbhlssn9blwcaihv1pgi',
                fileSchema: '7haz1djnk1d4pau32n4fl7d9cmlce8z1t6cqu75cc312i3b7bsfx3lgfco8hjl45v8yyywr1gxd8pczytcwbxzwbx3qxcbxocvhvkhquruo1puupe1ndwanc4cskj3ekdkjgdpwpkas1pzv93sgi0oadwer74nv0xniuuvjxk1o8e2y51qnxyt90i8ebr2mubpmrzpqt1kdql2aknjdqs1hqefw93mri3rqxk6w5jk2284sbpkho8kogysi9y2aqy7co3jpbjk3jy6l79gq8c8k5uyk0vczqwtxe2cgdw22xoejh77wjvbj4a2ixrztaahot0w3diqzllmunxju6llicvhqpkz8n7vpfrpqyhu7vqfkfxhze0bs4e8a2ygynk05o2lnlx52x3ahq4qtdy87y0llt0dcos5nzzyfl8r9dhfxvlg12agmvg5umwzjjbspaudwb59w7kzhihb2jjyre4jq335bi7u4i971xt663zzrcv5tgu7gq5ptn4cyb9zpf4mp3vc5djkkux2au8i2c89brxzkcvd11bhprio73oylt326b8bcn6c3iy8yztwpqcgk1w4690h0strjs140fjsv6d7kdievqpgi4js1g0bxja5dn0x0j2je4qxopzj6xyathcorhitqqyyuzhaahozufm0qtnuu9gcuyw5upad6wbezqwb5yo84hirb4iarzectm7qmzppfm9sbkrgurodxq4nn5pc26y1vyrrjz1cnc1bf1hmy196yytc2lhneap9b4dtlyyejyw61v3haooewl1isjsw01gv5fbyozfghr525cfuwkwh9civ8i11jwbnmfp7crh6l8l5ov8tl5c3mjsrszsspuchbos2sb1c9ugzrq7fo8agcskjj4cnpkagup6m04wack32r8s2bqqk5d02louh2q46m56dg198rj2652ng6c2phm24zpg5r8uq3h6lfvbfc1fdmxdlyc2qqn047fdvup1j9lvt59icltkhn4ae39gm47j8q2',
                proxyHost: 'mtkh7am0awe8iwxbg1vf11di58x3wl4smykrxim1btnusjy825eix5xi0lcz',
                proxyPort: 4313538732,
                destination: 'bb2jyota4gcpcrg8f47bnb139jt3qatqo3cykx2z8xxg0jyysb6xaccq4xwm05g62p413pzz22ia22ouy6g1g45ifma4t68ogy8ejnxrdq6ibncjlsf638jencjm3lzrywbczepgrbtt948ox6mzp1r321hw48y6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'owyzbxq3vekdydkb77bvjv8qn3fx3lt8vtymca4z4k28je2al89ehx50yapdmnk4r3hev4zaqhd6bk6ceyz9mkmnbwmc3rg1hm1l68v5eatglt6lun2952atdbtr3knf6sjj44sc0x1qlhb0ot64uoq44k7mtztx',
                responsibleUserAccountName: 'r8e0grouubrbslosui66',
                lastChangeUserAccount: '3rlb6sg9zzn8bxf7m7jp',
                lastChangedAt: '2020-10-16 15:04:24',
                riInterfaceName: '35ud7ttebu1nl86aldkricu7d1hg40j7rurpicbtt6jf6je9zvxgwgm5j699ixxpvuf3hbjd3oxbnp2cbulh74e0u8ypo3v90mityu821ckzjpbvlyst6z6j9k62m8g59djg2jetjgt5fbt7r5r2as8w15r64rn1',
                riInterfaceNamespace: 'agci2kinr34jfld7g5o8t2n47h3fbewqdw3olsjzu8wkiex0e8v0m14gs5kjgqj2ixyn66lpotocypelktljq3rxvg33vg8ah0r1qagdpdk842vjshn48og6349qbygx9tv8rlfxe88plvqmtijknl30o2i60nb7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '37kmjevnean5j8gfbaty84b6iyucw0ecfkusgghd',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'wflfp7a4ze2y7yrw1dej3sy9ivyvf1jtjg07eo5hj2pv6vgr74',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'kip4iigaiq0syux48zc1',
                party: 'i46lls2ix11dh6ak6dld3er3nm3wgml5yg98qp09jkvif3u8ugpv1z0o7houl1frf6djq64q13msnmfurjls3bbmwvtcjsgb3ix7odq56rzdggh6su5p39dhw8ehc2lfoafwdiztlk8zwly521pj56y2qi21jo7t',
                component: '4jv4xlx7kz3pwvdud5ac4obm87vplspkc1yqk7hs8jhlst8ku7ns03vkgd4hryngxuc85k2kmh4wdbnyh3zecxbohj9k78twah28k0rofyvlwa3jb7dv6pgqdgcqj1bhhraj5hu8crp3w62v3ixl4atspms3323n',
                name: '8k4n60c3qa99w31htfralcebgjvmrjo44bo4ra40ynlo37r25ncyinehpjs3l62sntnwz72sjus2e6bdo66nmtzz6o9qarsatnu9lf21clniszxfvxt99m0fdftbw690y7m0etbpvke88vksvv9p7fzks82hp00b',
                flowHash: '1kx9kpwbbmcx1higptap15o8bkfk1pyew4fwsgtc',
                flowParty: 'x9yd9x9mngqfpp1odlb6aqnivji47ealghwfroiujj7u7303m3ftd87yab16gqhlujkhioonaf9hk0yyxwkyqql8b5jxai3bp5dw47vdgi77av6sntxmrp2xlrn79b5564nojcr34gpgv34av1sciymwvcd09gpj',
                flowReceiverParty: 'lw1nweh13vkfxuyj5vm83b1v9bma6l1redv31bvapwvkzsumud5vg8h8ze3isqpt1exinmrjpf0wzivw0wvle6jvok1tk9lykekdexjtwh5gk0zst0fwz8wwtowm0kkqdqoiicz5qktmnlkkkdqv25t1q1ystnnt',
                flowComponent: 'ow5uig97b2axg7lg41yioegss204r8gcl6aj1ur9ex9v8opa75i8ta4nvg2a6v3hpbc8pblp2p87grg79knkycn2wnxwnloca2499m2qev57mx5xjyyp2oqd5r5n1t6afo4u3o495poa1codofcm0iylt27mm2hq',
                flowReceiverComponent: 'in65jci4xyy52ytp1uf28q9vsr2ylttpco6wu1hfho7nyy1zbupfxc9qupfnco452dtld2e6xdjg3lzd8i1il2yt5pg71ml3ikdbg8ilp1dobd237m78jkek35pm1c9wopk9jvgj34ytuhr7qpur3fwikvmbyboh',
                flowInterfaceName: 'n9myjhbg5zasylanfstqrha0339l5187be3n5qvyz4x01rz0vs47czmkghxbyrhtcuvhnbs6ffqid6lk5mtbs9o4jce0spkn0wy5gex81yo13z5bir167x9iljt02tpnn6xfh4iqg3or29qi6r9z9q7imph32eq4',
                flowInterfaceNamespace: 'p6n7tw3r1fb40ofha517njjonsgwfvkkns2jpkac93z5hwqcoiyw080razkiz20fc0t2s5lpq6dgadwlawqpz7hlbya7l255wod1dzapo9mxq5e6klfrsgvqfqyriiaskf6ygtlh7r3mbxtuor1hc9410wmcg2orh',
                version: 'p1timwwdc5gkrtwda2hq',
                adapterType: 'r4klbc6csgrrkd2k8lx4mpzu785j58pix6azzpxzwhvm4ruii0c8bx4v1k2j',
                direction: 'SENDER',
                transportProtocol: 'vmmk34pmbizjqxq1lbz2bfzwmgqx2zt8jy02at0006as78a6x2zrp956s6jw',
                messageProtocol: '8qfzptar42yta6buk8k7xhiuiy1kdoyq27v9q07dqotsvvtetaacz74xfl02',
                adapterEngineName: 'o89zvg1fvu7ffzy3q57epyror781efiyra66pbjq4qq1npkos3ldfpgr914g2vzvp9w0z1v2htjael7gyx3fwe9lb9tbx4oiwmtxlteo0r5tdswdlogu70sadtwb77lee99sgfpyp4v3esnqsfszbx4set2dppnx',
                url: 'q081jff8ynm2opl01lj9pqlati8syf901t1jckfhe2ofju6hlcudsx1m8rhb7r0ogc8lljnhyidvvqhgu2cnpm0nsjbz3sx9cpxiuqahiysh355qsik75tflk94uve53k5jymxxiffrew870pcxmiaukly73woscwro9ya1fsyxgq0rpexnacsii2uke1vxuflpveyl84d3fyddi8ihs79u83wnz8c4khdcwljvc0mkf8t0dep01in2qy3i2kca4cvu1cn93mw2wata7muv8l8e33o649qkovyxpzspjuzvlfjrblgz3gtoopjedrbgn',
                username: 'xosm4htc579xqsx6b0i10nqc94is6r9sk9717vzc1fnzpkshgwfen95imbjh',
                remoteHost: '40efxggsdhbcm3y8rox4cf93ul3cpv9f5iuzf84f944sbqibppykz1cgleqtnfw4xniy2pehjojdgc8jd4tncchpll7ni1sirk4139ov28gcgl3yhpb0e501apn4jy5iaka9mdkrscip8nefhi6u89ewxykyap9b',
                remotePort: 1539990565,
                directory: 'do1okb3tdqfm1fn82y9r4yfl92rbt9h9gomjr035isjpdoahh7bh4a6b5fpt79vhh8ubqn0hx4d5lh63nuunc02fi5ce21kjlafxwa6oumgxsbyszqe7l22yar1zmx2txxhnfamzasvzd11n1cazza41y1claxr4j70aimqmecrp5yyokhylyuiuvqup8dnp543pdcyqhsz61dga1av3v0bwdtytzn7zuvf4i695keyanhn8smuvljjqk8mti6lqhy6aeok0gv59e2xgn73an08rqpydtaptgo5dtjjxncp0bsqyhz2x4xqke9gfkitwma7wryckka0tdsz1plwqpoba58zeluwa6mge6uompfyia4n17sv52d8evczbdl1z4kfebjc1g5kssxfp7o8aqjgw779o2jr6e1ot0kigpt8smkgiracocx4runnu2ipmst4n8qih92guxyd41ryddo0dtiouo4v69s0tctc7h8a1kzsywx1m5htqld9yzgxps9wlq2we73wbglfxp4307wm1x5jymqpggg37bdz8eh4muwpzdssl8fjqcte4emneja27swxwi2dfqljiplqnxyqnxcv8hw5i3fk4769a8brb4q5hc2smtrljs3clr7gytf1m26a20tqyv4nsggo0hj4td8v0e61tkj7qqe9fnk0lazus0ejzoh4t50tczdsemyno4pnp9hntgnsv7k5p24kajklh8sajz12k4me9y111mzg0zdi329etjtl2fz7j7cfv46lrstb1d05jy9uq09m6b4b1va1i7jivtju5p1vkjcv35zxd61tanwy9xyn8pqaxdh7j9hqiq0el55ykz9toggk9pyff7ki8isibtrng7u2tu34e1wcyi8b1gqnme0kr9yuwvn56tmr93wjtda6mwdygxsduvippszkczhyahh4aq4dpixajdoldg7l7om25fxv2syqxkl99orylbo30hz3jykfni27bzw1k0krjztyhj5x1uhnp2emxlzxy',
                fileSchema: '8f1ydlwu0fw9sme4yosufm0nx7ltoek6y49dl3i5b1k82rstk9k6zugt4w3o35e6pvud7qr98o7wyuapt7bckbulftmn9pn4hpmf4hdfuqdw7fipt6goacb1nqqgx7glxhidqhrbk3n80urv9octx064nh7vxbnul4p24eigrr1r90x2f7t4hbx4s1fc9wzyc5jrcy5p0cx1z8z3g790o5i1e3yvduxlly8584ih85s7wtun3896axh7nha1clw2aecu1wbx36tlt32yzvjloxlk8o40941ag8xjx2q38opkyix3k9phhovrnr2bgyzbzyjoap65zxmbkz1vurn4zg41q5pjkif0oiy8717expu08dx0ks57wxow6w6xi6dx5xefzd16kkjjaz67cbh4gxisq897w557rx2neql9lzi50ue3ggo8r6dw8oh85urkju2x74z4nwjyklydtrevcbhgbx6wiz7nsox76fvit3x0u57ms7ihnp7cs5ecijjkq9hgfdwkq62jffmpwwju0vn53xa3q0bsabcjcz53nt3zpppw9x1d4j890z0i9d992dzbo0byv723zecoopo3zqfhe0bto5x9mqcpk8ic9k2x5cxhnewy1nvzyu7vqh2mrp15c8fjcw18fuyly5urrt4g000fe4sb7vi7dz8fi4eyh85km7fvtnxg8y7coc54p9yqoqjrnidkszxpe5rlo9hr1j8td4e26aztk4ucpm7ummcu2thvgw7j1btixbgv4kjl145a2766rsdutq8y9wo8a8ikeem9jhtdzmeicw4x7k3gtyqtyibpkqql6imlggmec2u4shwqsf0h6ufmnutobjcunzvnl0681r963qjypswrqutl64rlclp2zo0aebg7llm13fet6it7fehtmfrq855atvbji4ts6rc7l1jqy374x684jv575u1x4w5nfr71uv56x84em7n5638lw6p2epcaln7kms5dxw8olrwper0lrwoh56ot21gvn8ox',
                proxyHost: 'm2z11hbcedwhic7hidbpse4sn79aa4qg8nk2osn7v21wal0q2w1q7dueerb8',
                proxyPort: 4122434102,
                destination: 'ojv7rpbjc1bints98xzkomuo8bunpq90dtyn2lwo2ekdqmucaw5cuvtjnrdymcuycs5udy6br4m6i7wxg4zy8xzsbikqou0uboofgl5oyu3ewip7xigq3o16fr7r2a5253uys86fi5davn8ycs40pdp31j8fa1ao',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'mp4ds4rkqx3la6bumvrap55tbjmbrmdwtoeu6oy69g89s3v9026wd5tr0mqe9z898mlwyu7poq59c03voxpvmt0eb28ewuc6rxzpl0zkuucftzzob3r4b7wkxc9bp9dobgfxarifcubjvg664ot6rvy9b13umbhb',
                responsibleUserAccountName: '7vcfl9pxzoz3rmctxfyy',
                lastChangeUserAccount: 'mtl9s3awuouzaj5aozsl',
                lastChangedAt: '2020-10-16 10:40:37',
                riInterfaceName: 'yutp0wf3132o898uomj0g4sluu7kyfh3n0vzaz7l3d7fwki6c8gb5rm7wlp6l8o31ilnens67bkw2ejt0lck1d1vqz4iaz9gok27tmyabhbv2czc55uu4r7lyu7oamd3qyq7m2ay5grquf1fdklsaourdfsnzgyi',
                riInterfaceNamespace: 'w70lv2z5xnownwtl9ljmkbxwevpfkjm15enm2ybftxes10d63f6gc242qi1x4qjqxkbqfcyhu08dae3tdpgpa2l9er3n6cd23icdjy54x6f0rkpq309idpsabmfyocvdejlzqu91jevqzbgl5wigdox6mxnrk18h',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'bjx5hmdjvtza7w1t4ntx96u301ejfh5obsr2kfu3',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'x0xrq3fpnhgrdhvjkx69odlmmyvmx8rjxnu7hd4tih6nhap34b',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'xgwe2w8hh2oq3dcvzus4',
                party: 'mp1nu7b0qdjv3gt5pxq3xi179gytx1006a3cz2ycfj8nrom8o0gf5we1wl1mr02y91nbwhmmxhmqt4id2cbkm9pkhp18dx9a47dzz9i3a6jhib2fbsjhst1whbmftivad07vfwgies16cgaju8his342hxmhm2qm',
                component: '0lofk8pfpds7jof9rbo90rj2xp2s97sffkz7knydlnoi54rn32qqtw0ydzh7upebk4u84tgi9khm9871i1cng8lyxz15vmo5k17alffnvma2s6t02r5zz7c1tvni3wiz7w34iyl8if6isbl1ocrvzh5k2vd8tlve',
                name: 'nseeoz2190dar22r292rql7zr5zizzkp4w857wyohn51ykdhmrmijs25v0vlhgsspgkhs8c7om1zzvpcx6ttwb1e2w1lainq7rc55n782rfo039bio4xyqkus1xig1r0sbqh3f0c5xpmsx2ga1hvd62j45733a3i',
                flowHash: 'efc9a25yt8qc6l3odg6nzwso7phjfisio7yqwlxn',
                flowParty: 'gg7vnl2fur2z0rmj7afnnmgp3sxntirewciuad4ozniz023qhhspeft2hpkjqjr68lsnjyas3yjbau9fbj2fvdhxo0hvk2votx4vbzirnagz881tmfwbe0pdigdomddbdkbc0oibbx0l9yzbhfu1d84b2fl8mttk',
                flowReceiverParty: 'd21wxbwkmlpa37hwlxzqysoonnrilc6nayjnnq8wpast28ykk0wlf18qvuyi5jy2reergr9z1h1jri5mfkc2q7cmt0gm4z5tmctb3532ogf3wvs83tznbzub481scobtvwlkfgcajyrn85qw7nm3rvla9bt1djvh',
                flowComponent: 'mmb82p5csj7ytfqmrdnv765zrec8pddzx2y4u9zatbytdfqe1ss2oa3hl4agrnzexlfrwd04utcxmkewaomng6z3hkhmv3h2t5u8f4hmoscmgb3mcxmpa0mg2vebb9blxrnqix8on6e55plma99rl3p6vv3ijqio',
                flowReceiverComponent: 'xmdy0x4d6lbp3pulebzovegu7bdy3psob1ruddf0mkn2zflo8dr1yqh684ssxofhacdjde7gcx15m326jozt198eei5n4935mvrf4m52ef7xa30bcqm14pb28bn2wwuvxyl7ms143o7y2imkplllpbuu59asg1q3',
                flowInterfaceName: '2ptijxe0ahrw0vvls9rooglggvojvnq5ksmqo12ssr5lld78jk2jutqpj75uay1u0aa6l7dldpj3lx7iqb7fd4xre3ngyvlaxnfkvkcv9154mtn5b891xwjhfazlo1lxzvwavrggodflp9q61qv1u4kmomzkn802',
                flowInterfaceNamespace: '7seapjeskwyvhcehb4jlmyt7aoa2hck866hoipewxy4wmwv3fd72y44csc6zefw8whwt4onmpljtb2o7kgcqobsgxmkj5dd7vvnoeqpln2iftvdx1akzg8b3yciqr1ot0s072rs4h5dc6dpfbj91ahd1iraud7j6',
                version: 'dpg4zyx25995c03h0kjat',
                adapterType: 'ba07qx2hc7zxdmo9jazymacspgkjm1g4jt5zysbiatp36jfay87yzerh0u7p',
                direction: 'RECEIVER',
                transportProtocol: 'n6sxgaan8xh5f98lt331a3dfzgucbfe0g3qesa5bzhyv4cbgxmes0i2xh7ix',
                messageProtocol: 'cldvh4p40sn1ayn9i163lj6o8x1elsthe43vqnf49a4kor1dukinbmylp2go',
                adapterEngineName: 'rxgaj6cxgqi0goy8r70v2ghfgvgog9cy6isyvjeyikz16v8bcc0piatvdqzb89bep4slg716w6drbkikwjtaziitsbwnfaqmuc21trkmz4pgj4h2x0m1x4ujegrr4wg4aq7bp08t1h75nuzmru2qchrcdbyebkn0',
                url: 'agcbhneljktbp9s6b3ygk7jvw6xkoub0789eli5zu2k2y8w2olm7nj9j2rfq2bhzz4avzcf6lxv8rb2s86ebo5gwazwr5rbu17sqdiy2ppx5h9x24r09bsg3ejylubuolpi80ms2vt8phznlzzdlsv9btsbaw8813stbi9dm9j6ivzao6vims0bbtzf44fiklhdi4qruknty55n97q2ihaasoh5ti2k5xk3qxls1sha1sguborymvrn1u1imupi8qps07zs2k58vede1pcf7q7d4zdgzcomlkhnnvna3shleyl97bm5vlf2e4jhghyzy',
                username: 'jsv0pm50q6o3yckbmm7ao72koeaikphej03dh8fmtvqwljm7e2evt6er93dj',
                remoteHost: 'htdjll5dy7199ls9atx74pxicpf67oef7gfs8sx6w4y0a13o0n74giuqz95yborsbph2aoybivcc6zrzlqzvmq6j12anf6u7snyn5vq0uxdhdtkm8jng08cxollkm21f985z7n4zdf9oikadg9tchcsitnezowlf',
                remotePort: 5734656493,
                directory: '6009212m4frkfnhx56es38hplzkl7ltph0w5p6sofytelj3ih1gz5nq3ksbw8f735eunxjvgoknhh3djqqaka8p92w0qcgxgg097zz0x451xmtot0ai9z67ok459ur4zdashjvv6f2tf354w8bihzo1upxfk1mdsob5855s9kijbxnx3lvvhaz76vw0ahoa42xp8afj4r3rdzwknfe72tr3lpmv67eeknx1nnze9ziiv4gemcy4zksb9452ndyu5z60s0l9hu92tudncho7fd4cjr5b33urleaqiq4pd2p4hx7km0lo4w6mgvmkw87a0drrj6gn4yoihe67ug69o71h71l1iuv2d7ct8g3sa2fuqzsvigr12auxrk6v4dxt0ufmpmgm37ce3e9262h0ynh9brhgsqq46cu31d2h6mi1imvbxv7b6i7nnbwtqk0nfh42m783xfqo7ooiesdw5cbw28p6avv41pt4xn88ceyb8le75tgcwmd663kte7bm7cd3u7cz8yhnnok284u7chi8eacwh7bpc3dyah0z3lnw6zrzvyo9v8nkdjn7sp0fz95wf1l40o3dqrq48dxrlirel9q8botzsykvphjbhbraceqeffd6axfgo09q3fulx4ug6kcqkag1v7pllxoss3x4pjc0qzs1stsdo3aa2lofpmrb4yi6qj9mbs2f5xp3fa06x22qjfou0eoqlak6a16y180ukug7p2kr9ovs67angnc0lzemz3hpgmruur782o2n7lh1ua53nqvulyrm612jg2j0aiwbfkmolrpjxewq4bxvajm5h7mi586xwypl052zpbsbifnihwjjuxzly3629e2r8a3bry6hn60vvx1x1z6ssmkmams2l8ssmzhavqoefk2c2hxxnbk6xu1d3yq8fptgacy5weqtc0v7z7m0rqn58hrdp855u1502ja7hht814ec1z8uqk075as9d963e7r0hlbu21b57jwnls79r7u28n8vzw7m6kiuly4k1',
                fileSchema: 'hnf52n1p98sjy39thxs3wuxtkb0nz8ukfq1edccposmafd24fown9ek1woxx5m2vu03oi36mgz6k0wakm1tfgmoc2f2gn3577fm67kv56jd07se7mdimhdusefiwi3lq8vwtajh8xlukqvk0o465jsjsrlb6uoy6cnw6ymweebao8j0tublkgfkah6z5cg0cj5xv6epwnmwc2ophnyufep5finc4qw5ujzat828t6zlpt6bwoxwf7tokkv590hr71lqr6adlutmlmm3s7o64r6v7xg2tv2ro06y5wuc4gfj5jn0y48qhbkbgl272v9ze18c14c61wh0c52fb9cktc3f9bbsn9p764fes7aqtsfhxn0zunsji0lkhnpww2c9iddeo0n2ic67vig78bcsmlcm1vcut1ehldm0iqi5zpzvyu5czjmx620myy6zdal00yglgpg6n5w33lqz9ms166ugtt12xtbho26018qutzn5zv17nwdfosqu8c2p55tyzjaldeqb9q19kuah8tgmdw3ao16gf2y5xeej5vs65c2upism761bajwougzxgg8mhiyosjhzi858b3r44pq2bs4cl9e8fbnwaed0uug9er7wb9zybqkw55zioqdj18xju0acoxhb6aam5mzdc0lka04ysq1o9yle1y3a3sdc6dv7o3601u8p1xi53bsca0teydmxmuge8l60ygl3h217bwrgvlttkzb99z4asf4b9ied3hdorsea5jyedqwkicu1lq611qt92x4s289a1i2vt5ep84npnilqw4kzzk69hsivokifuypa1yt0jhj7nvdynccx26t9z8nngnp6syi1j36nzb7u2n9nfz0vxwcdxxjiyudjf0mwyds51aynnxp00jidoc5ggkgo88494loadqe2ot0eszq1gb47bb8yzo9dvp3cngj02j3jbpey4n6qutsxmq2e8g8h5hugf4gzci5qojg4l2igi9gr9bjwycptvb1o4tkudltyqd44e5r0q',
                proxyHost: 'dw8ta1pvtzb9cslld86kls8l37smi0mv89qgk9asxb0yj24j2xelew45o2ka',
                proxyPort: 3459494596,
                destination: 'qc44hbfr7ywdb4imjpc8cb2vf1aq86tek6zwnd5l6qe7qzs5ynmed5p25y7pnq6t9jqsehns9ig9q4dz6miwlq6gwhqylrjzqb9wzl7pyc1kup2v8by52lmq27jqlwov0edwj0je75m4k2ex76sgt25vqybzvyxc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3dxt1z17gdjuy654m5lj66dqys9g21apqn4ken0nnvs5dp80fi9cbdnjt1na3tysp3trq8uudoezu43apru0d0bovegjjtkbc51k8b692zysb1c27k1ybeglhw5b1vhg2lz9itaaif6jxq12axahu6r9nbl43xr5',
                responsibleUserAccountName: 'bk4sprdk13cxa3ajulby',
                lastChangeUserAccount: 'wosqeim4h1ge8fhi7vv1',
                lastChangedAt: '2020-10-16 06:45:55',
                riInterfaceName: 'ttc0dllhvnwkdjggn8u6gtm09d4quzmk8t3on4kt08wdipipaqsma0krfmer8rk8lqi8d4p98pei1zur5nno7fqhtgupqh1pn4wzveyzmstguuq7klp421611mnbtn1ynt4zi6ev11oznhbo21qfgoh5rwiyzd1k',
                riInterfaceNamespace: 'ovxl0eho0kwqnt6mj0weelr9lqdnkbno8cy1mwa3vd57vtyhet8yssb9b2azc3t6b1xivaj5gd52q66t07hpvugsc93jthyt0modn5cvg171ecgl6zkjlct6cqzcwfbst4sv54h8hqne8drxlfxf9wvbhm1lmpc5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'zifqav9tc1cmnpi00oasm9aimf0ousa4xxj16dke',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'r41um2376100rbqs13nx1v0wgzkz5uidzy5gppwa4tbej90x61',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '4qxeucxmi7gfz4b09lui',
                party: 'cncpung98tua2f8w6p3gmtoc385i53qbxlbloygupq9sgnaytcixpcmdid8f2dq9nu2a4p4tniewunfmtorixf6cppvjnkht0rwyovr6ca3fy5lsuvy22nyq8m9gv8bv1hkl7vcsc73hdckudh3gdobm2pxel9yu',
                component: 'jfjbydxdqdqrqwn6m2scmqapjrrqd86uwb1arvnrasuxcr1s057fp1a1ydnja77kmmj4orwvszdyt5j0u193o8vnwxbkkufqsltdbeuxmqqaz8szvgrds4jb9lhu1vtwnfowieox2phb2kt1en2phmiv10rluq8g',
                name: 'zc3w2da76n0q1779bucn7qm1qtg6rgfk0pfx7r4yb4t62y7bbrg88rugwybrmhihwgt8zaco9hbu459194xsdai48d4b033wtvi947tbfd7ecbsd4djh57jtp2r1bpk1fwlryxz4xgvmiire4kfh7dhgovdz0jof',
                flowHash: 'q2dvdnayq3nhjipagqqqt2ui2ooqxheegbetnufs',
                flowParty: 'typ3d45wswmuqrqbiixdgqltl5qv9e4fl0ooamrurwtfi8x8k8ocvryrr1etp0zy6jsrfb8n1mokielz1zo0gfmgdbg8zgr62xzicizloxy3kg99s1892d9zakcsngs100hi4v0cjhe502lu1l71t36c5zr7n6jz',
                flowReceiverParty: 'oug89ubqbpw22xirv4ibwcc9hfdvn5p1xf1xsaawa7ippg5ms50jjslkb4sf2mcofhni919bt0e2p4r967kp0wgx1v8aj7je4vray67fn8mpq2r9vtqznit29atsnetzg7nylkr9zegbll194i8k82fofhli1wiy',
                flowComponent: '1fii8md4r65cqdohe20os3jqaqrth4k64oji05ox66bn2hhhukmwxymmh5omrprin0vy6a0urdmixe08c38395zx87h32l4ipsvo40huxf4bab1e7b59ztgpgdn7e3fopjbv6ijgax41md67ju4kmkgule74g78l',
                flowReceiverComponent: 'rufjn5hjbhgi5dadx72g97mo4riismkueq4x3b5uxawsegsuof96cqumwl43t1uqfimvkx1bszfikvsce4n5169gk6wexflzk1ne982o6b1c82tli28j7d1r4s89rj91n2x5k06y2xjk84mrxjvggwjivdtmye0t',
                flowInterfaceName: '05112q04nfg3ist5nf41lpd5m68cffj31axg7l3b4cdqpvbhyc0kt4lidfnob0300rghbpuzjr6xn0nqf4r80a9onnleo8f2iycimmg6zcebxesjw7s23s3regci3zremc6ejnc8thxg964daficb6vg38qvjn6j',
                flowInterfaceNamespace: 'd83i92jzgygeg2tukyyl86p3cg6tmck3tagmca7oudyjh8zp60vbpkuhgmbfzc1ohlztfyy1z8w5pgr4ph410yglhd7hdm50a132o6w2tha8uc8kwrpvuzkt18u29lla5baschpv7nv1ynyst5di92a26xm0fjsz',
                version: 'dnfm3zny0wqx4cdxydn1',
                adapterType: 'woord776y0y46dfdohbb82sxolmf66kvhhl9wl2gahun4nax3r4xk240q0r82',
                direction: 'SENDER',
                transportProtocol: 'vwxkccwoa94xg12a3pcd4dmaqvtu3rb5zk7tum6owwesuoqdkomj0v70ak4x',
                messageProtocol: 't8popn4u9h83ujzvc1sspe3z3esz118xxeb8dfkx7axi3pzdvisg0csx7q3i',
                adapterEngineName: 'j3qp1dlq2kx67se68fbhnl5lvbg56pg6een6qvnmx263j3ayyj2248a2b9hwtb7d1chh1t59rmvjjxzzwuwauff8tvefyhr7czmtamyawqug2ri2yoaj0vct2yz7w7pzod984kv98bxjxynzadytpfbulycb1ej6',
                url: '3jlgryqqwcawy1alxxc00pypl17qgeuz7npkylgud56mrdj7i20k78ysodhy027u72gx13h2fuv2s364dn22fkt2yjkeg6f0jwdgqvz9o18nq6yr8rmyk83yd7tb99qvs1uizleufmm02w0g4hbahyd8517aeerhi2zbkogyt3lychw12u2wwnxnetlxznfdtn1ok5tywi8pxxr824hmw2wuinw9yqkab0tl6hqno5xwymim425lkvuwhlhp76bafbzxbbf2n2a98n8b1j15fo61s9l3nrqe1kj6hazjsm129shu33mo91zgdm4irtmk',
                username: 'pq7ldcjh1rrpbmyyyxtkblha5cba672mk5lvr1ivwmtqe1ek2j3s87rvd677',
                remoteHost: 'sf25o2ldjzksufyt2a8b20p18am6xs2azwmezwcgsyy0g1q8acfiv5vxxin2n9pa8uni9b1qdv99drrsdkfsdyy9xj47kao5ietsbuji7fs6d38ho4dvnbwyvcug3evs6ush5q3mwhc06a49i45wpr4zi2dig6xa',
                remotePort: 7060859811,
                directory: 'rpctg47ecjj980ntnsbh261kk3y2f2u9ayv438zih5mjq38fbnezctx81xz9vrdcglop4amlwcx5k34zgw8jqafue5bsky5mvim5s9t3hv3yg4rbkhxzl7i2klpml5ggx0f9zxxumib6w0w1aqrc1xrl6jbz3i2reosm93upuwfd1wqv6rzzoue1p8fzdctc60r4je5hmhn0ayz4jnbseon9j6lum0q8m415j3zft18h7yh7a8tchsvy8sssarpnq62sm3qnefk45v3qg9vyqu6p5euhj7muypbivtdev2uvjje96bp5r4jca0284wd6i4kwitmg959mwq19jn5xlxv7j4nocoeh0sg8sa33102tc2vk5vz7927frq94tgj45ghpvrqa9z61o8bquyz0kq0pdb5xjrdiga6d9xgfbc2q4lja8fi7f7i4o8oo8on0ti04zu2ossmpfg93307apue0dtze2x6qf1vepvsjl8pxsn3gs8q8cebsmxu9qtoldgq4v7bhkhpgo6mypy4kcqyw0sq73nnyq4q6q4rtob3vhq7dnw98j7vriux1f4bnfqzvj2xtv1qdprp74jgtnsual7oia1m6ljxr0k2gree177nvxwwzmstjxaf5nku6e2v0ojdftcv7czziozku23al8g1yujcd6n3fni84sfxjkqe3cint5dp4l6nafydumzu7e9v8xzxt0vmi1u6fu6z9m7b5a18f0eqhwquhebimk1a0ysap6seb29p0qtnauhqa89l26g3hrcbuvc8t8p0ydz2eoh7glnkmpdseyefea22o0oujmmqvuffrjyukzt8e9jr3j671murt3wqskvaxb4bbzf9fa3ioyszxvurxkjg8ctgo0dvgudzg469ogn0p51vezck6r03u0p8zlejnd9kdpkmnnvkmf13p3s8fjckssoa51xm109g651pjkwm7zsoci58xe6p44x4sdie1wfiaybpbatuu7ojcpvldjhmtylt3oe5fdfdjjrky',
                fileSchema: 'k1agmo26ko4h8qwsuo5ol0axggk0shw634hokqdda6iiujxm8cgos1d8njp8567ih3qh58houp2nphqulp8h8ipb177d6qb32dip2uo0pvprccajfpi8vsbk24kz5hf2idzsg4opnggnigv4rm6z6331kmywil8wvh4vryy32bln8fvdwa1356ltbe66cs0wadpot1mf8njqlyx5yhjr6c8aysyzc1d56lm1w778rdl3zaqpy9nvhp07dgwtwp1ua5jl96f4kmlfqtpxxel33zjo7v2b5mewa293ufmbwi0nqpmkj13xlr2te5y9o45v455szq60nf74c58bzci7sdlqufmhps870qlz0qov4pc0t6c6olz6tgkt2kjy09kyjrs0tq6ya0xg5oyvh16lo0dbe544sta6ovbjcdysmajwle6rxsk8uovw9qpxyqlvnydevt5si7krjlt6faxsup86ef2qy92haze764w7ce9l4yr70yy1o5e9oaa6qf62pyklv60j39ctfusyr8qgd7rz9cwquwu7pnxc5heihgwdzl006wl77hn519bnevagoweihvfheqaokuv956blrggrj1n53mthr4lp1o4yhcwrvuzw83ajoh71yuu1nqeahqtknaj472v4bze0v95dbb4czo7exghvnd69sjznyej162ni0yqcig5r9jay0v4jrc4hejmmy6vupcyqtnuao85x7fjkem5g87514yjfhe4huv1gec0djiohi3dunml9afszb6u41l6x5nsdfn33ma3q8l0vwut3s8j3dh79cyk3oky9jj45w91c8g8kw8lmd3fnvm4j13bjdk6d25cdx6q6lqglbi1qscdx68j9vatsnxadldby4kkdlfe8fcr9yzba4mig3cnbwk7c1en72p6eftssdsbg571lxli6zm0bdbzbzkq4ge8m7pmihtuacmrrhkxjec0wgzq3hvz2qyj7xjm4ip5ymxh42ra3woz60zywmzslx2v2yu542hdn',
                proxyHost: 'ox408v6dfw7l8dra1hh651wpaprpqesfwziqfgoyca0q37dtna5xir68ssjk',
                proxyPort: 4631690452,
                destination: 'twfxyblb3rmbncxtiw0yu92etllmgb9tykyd0lb0vyggtc010m1qmsg93wbjxi31q0utg1ghk4rj52quwvtfza0491wxfnp3vafj1pokxg3jvqq4d7qv0bg8yjak58uc1l3k3cfnslx2bi5sodflzol9hh8jx4is',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'pgw4ez285volxz1rz1cbgeiqpoa0iyw9ojo68f9i0suo74oryab75cfeat6oceavov84yewzrerdrazjcdfkk4f4myy80xiipijkgxczqhk0vuhtmj6avxwftw5iih9ohg4osacb1ei5mdas9hoyovfsxwjuo1pn',
                responsibleUserAccountName: 'aw26dj5e38h0fnzog3u1',
                lastChangeUserAccount: 's65nvtnmkbopjrtzac5f',
                lastChangedAt: '2020-10-16 05:50:29',
                riInterfaceName: 'ejsaadzdqzj9ayyeksaobciysl5lvohg3ism36otyghc4azflh5jqlruffh8uxxosh5ndleo6cj9tq960j91gzpzvzeglfwukqtmz8z6jqndxzod13xziuc15rkli82dlrivmf1hhvfzekvmtly1523qyfc21a7r',
                riInterfaceNamespace: 'ewqalgo484irvnw02au9vm5jndztp49vq0roo9zt7r94ixd29f0bjns1t6ruvrv9fszdw9yefcs9yrbaud20gjggjo46wvc9e35yjx5u3rs3bl1969sxtr23ephueyssl0t11248oc6kx747p41kzi8ro33js0u0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '2oartlmeq3qsbr8kpol9uf0xjdzo6irnu176l1zi',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: '5b1h8splbwm06lroncd2ds6s0mi59791brf9v31ny92wyiy429',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'tb1h1t6w1jpr7szjjaai',
                party: 'qlclwjlpm4yeufsb0wdky8oiix3fjrcf3w6vpj98eqa8flbweehjqjckocb2fwrk8eza5saiw7enkjoxes73d7iobl8kb1npxq4qxywuk2jdisciknufr7q4l6rzzy2w5ukhpcezjz6xt46w5j348l5s4235j5zu',
                component: '9mjbrt25zwta7ffnv97wifvenlqohfmshso7lzoq747irkojnk81rnsissq1gm4s5jslk7zdyukbc6ly0yjlcrog42agkbqi6esdzqwz1jv0cbhz9u29c7lx3e0cml3ppuz7adod5kvkuzk7j21wmkw3nmr7be8o',
                name: 'xkkftbv29xr26tpmthceft1sej7q85qldmq5xj81ruivxg9w8m2csc9yj0e9t0oo6p9ahuk2cx7mbfuyc4mn341zyv0hvhm1lwig9b03panmk9griw5hgs131ss49wqzega31gnek7rgwv1bjl3iqnp0ccje6c23',
                flowHash: 'kpl2eu4kx7ik7eb2wn3eol74cyzniarjlubmrevl',
                flowParty: '9sfke7lncb6dqfb7kirrmlf0k7i7hgqwq8n4jj5w7lp5wppjokiqutcw73avl0ns4owjwnz7j6g3ynrqi0e2jenbri3t3uxs6xpk17nmhn6p8q6ojkkftrme1m9eyabxce865uz2q19nzg9ypg12fee0z817ovgn',
                flowReceiverParty: '5n5cs9zlumeen0fkdubxae3okez79190b8lnf712z7c9kyaiapr5xlb1d644k7citidapdggkif3i68apx86yhfexzs8tejjgnfmnknsil54smv79gg71qdyroz00nb31lbpj99wqr16ibg2t3j5j9qlyg2kpsc9',
                flowComponent: 'a3je76y0o5nepynhn1hlz018g7p6j1li474xv3hkei8un5bkh1tw6u6vn2sfa06et752p4aafc1d4bj334npcld6924f6jh1ihri9ei7wgfku9r8exb8mg11f3n9ugznhzmrj9jlasl2jwemnzs9jpuw1s5clei9',
                flowReceiverComponent: '3bxz2whlw0v09n0rubjl8t93kitd1enwhyhwwqmzgynrnlwmk0trofumg62k2eb85cgu58rlkkpbd82iyk0b3z5arlgn0572hnn1d8okwz8x1wld2qo80coipc2tr9r0os7vrxk70fg6imo5tpizvtpwd7oeauwg',
                flowInterfaceName: 'qaklhn0apvog2v1wuhezp9k32q761m7e91anuhs1kqdcdw7v48b6uzbi6ltlyqwo6v68fyla7vdunum4sqi7zq4uz47jtljffk7heymsinng8e19z001vh746ko1al3c4wkpy7vhx80bme8702njiq4hset3qnew',
                flowInterfaceNamespace: '52mvtdqyy4hq2474gv2po7jlmli4t0ojv2j2ah1dhn1mcwsfyrqqqr9eydvd23a1u43ffv4xc45vz0roma1chqwqbkf5lusecfdq1abkbt90r53sp9pc2e3e4r91bf08o13upiraqosq4x98s8mxlg88ny7rex8j',
                version: 'zl5pf114hmjshv989xc0',
                adapterType: 'nv01j2aqkpukz1jptbxck5rr4opwtk8gl6lt0sdpglt337r0qhieqquocx9s',
                direction: 'RECEIVER',
                transportProtocol: 'hkg0dz6600ypctamv2xr6o86fouebfpr1vgyvdj4b1kcwxma0quse3e847vk7',
                messageProtocol: 'xpqcxxg0muju0eqbml5j7m3g2mx5583f9hutw8m7240h0y67wnqismzwrqd5',
                adapterEngineName: 'vd8rgxd3czbb7xpad4y0wlx0owlwel86dhlo5t7rtnuxpjqso6uqir1mndv24tgotbxubz8k9bwkcovw41vih880yij6s6bqlmvtb125gv0s6gqax5q8triyfliasxtc1a3bhc2utcyz0ndc5af0oxvays5e5ohr',
                url: 'sous63c3i78vl95ibtqb3uzqv354hcvs1hutts64pj56vo7mt3bumyqdgnvt5y7xh72rwxjr4abluok36vdpckjpppnc6z29u800k7z4ckmvau07uanidetdjmfwlj55hls1hmrnnm6a2law1w7on1ft6qwg9jar1tlu4zi8i6xek6vbfqdw4x1xm9e1db0amke4175m6jf3yifa2qg02dcwf2phv5tbb3tek41jaaw6zmx9mwfov7ivfxodjvvy167y52ycnspvia23o6jon6g623si4bz7ryg2xg2qmx4c6w8amlo669b4lt6xj4io',
                username: 'wjpfwp01kmcxgosrazt3wq3bg1nhnbfwsne4i976fsar97k7akkr2mqd3ba2',
                remoteHost: '2xh0b7syv4ja33kxp0l7p4i0wjqgntrs7o0w7h0iwsbctaxwgk64mn5zn87v2cxli9t250ymfqstl3u8irxr46hlpu6658b3je4dvfebl7ma7nonqoae9aik3opahintr1fusxodp67oo4gxarlrofqyqwmsr0sj',
                remotePort: 9956267945,
                directory: 'lgp2xql32epqz81eyt82f0vhzynv5fsfka1l5div7k9w0yydhao213jwcnev4llewcnkkfnynh8wq1lww5ri59qpk6bhv9v9ugbrutvhdszfqthnsr8wgac0nqr33q2e7kfe4tld8fy2vewzmxhzkxu3ty53fh3a0rm9c3e136kgljwjrhuh1rti68lvbxy501q3dx9aj5j9903x3jj29pz4ehrbxyc8w2ocznsrp2fr6a6ywdqfuf16h0bysi3cnf3j6z2ajurehlreoqwlq8m62vldkzm8eyhf3i1vqog7fxke0ssjhz1bkzmigtxvkuruadyo9incscbwenb836xkdqwx60bkvqhr6npzaqwseemjuc0f3d0ohpyemenak7bl02k3wc9ipjd3a4gdgwb9g9mk5vwyh09kosbwhkjtlo8zvso5mvrwthica4wjgmcvd1hxev7tlrapu50qy2feu2veuul0l9stybdjv8d9tmhx1k6ykcqzcoroirm8dcfyly634xb4fzi9lo15s921yvulc3v2ce7cn39u0d4g0vrkk65owwr2psfqir48yp3sfixa4lw880jtx20o2im0oya7t6852q42tcz5hvhrscny06vfuk6x8zou5cve0sqnwr3nzj54yo41riv4ybo8q5l2p7446lqai7nc8mb6gx68jgkx1zxx5pnuyntdk2h6ax3qbv9pt4nnlwzrx2xc6hj72r5hstg1ogwdrbcn20cpca4hcecdfshtndrxdc62dqdcalo177c2e1ei01rzcyi90euhfokg4a73xwjrvuf85yhcqu03z87wrajyq3t0qnw13jpge2rb76gzyxfobbncvywjomsctgym79dy6es3wx7m8tn3av47ve2isvyd5h7ytpx1d2qe07aih8qx21x4nln3cd5s89qtmikw74ditz6e1kvrging2gc1s9110vi278knb7f4k21xbhkz25k3antakn72q3foexlu3ej7yonhzhl8qphxob8l',
                fileSchema: 'twcm27v9jrznfm4faihx1iu67yva70vcx743zloap9zz4m4j1a9y0w8vthkbrgtu474q006ju68idxwmwwkur1czzfy9t5tgcth5wl3bxok7av0enf4uobnp1q52z2k994w74viipb9lv56zkm97gk72965jtra9v92u6vhdzxtg1odlzicl18nziycbcrcy9690uwr7xommgjj8g4rlitmtul0yhyz9az7vtae8b55ww7jelwlguzzi2t7b89vtt7mkxmdi5gkf2j4d8qbtl390inkj2bu345xybr4odfoy8lyh2lfm66wzgz1nm84n55jmznmawihraai5jthb5nd92woen7e0qix1iyz3xznq5ei7mq84fp3ued73xbk4vn7ytetpe88a45v5yfsqko1tdn0e9mwip7wj3wle4clij5g098bxgzdw9xkog7ahmpwsnsjttotxw4ixces0yikrk6vtsno4q072l49fbpb6ru3u4lth0kqzwprz4r14o7yp0jmur8wy08v86x0eas3ga1qojr5fyf4ou5w3qbbwe0l3i5hfpipmj2ri9z37stom4gbc0xljgnp2asilvkgo5yrxm2p7xurusqvwvmpkqpx7b476jy4qtktoyexjgeawszd7auxlriq0rswgdqe8cttvsvkhzuavjc00ukpg3tl1q6ipxoo91bikvvli4gcxumeg5cry4pbk50u369q9wno8abi9hatvc1v3jsav1dkdz5ooy4zueo2u3fqcm2r8r1eq6i85zi9xyb62ttfa3fd2pi4161t7z9hox7cut6l9i9sxkylzo28pcrc5olwzhc7dom49g0p0q57bnf6bxw2q4jfio428yrtwhy4uak9bxk0rhamg5cy9l949ifmo2mdp0uv6xmylxh3j54axqb6m033psny1v7jhz1pook120f5u2f71zlknqacexs2h4h5igcye2fpnxngh0l01kciby083uwsze7samga02w6qk3xnguidlrcqoaqd',
                proxyHost: '0gt6sypfwevogd53dbcni2qi54bjlcplukhnqi3wc6hb3czdma2naewa7no9',
                proxyPort: 2070516049,
                destination: 'oq2ex4nvze7kullesegcs5sxxf9qkr2pxictusfl5hgvapssxnnf94z846729pvnosm25g26dlrwjyalwx2dt0ob080rwomvquo2o4s8rsxe64brb40zqdifys028cm85rqmo592y40axwa8dps7hy0oz69vrpqw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7c4kfvivbe056kh98jne5cfzi89gp0t74ctrv89vjpvvprwu3dtorkg7htf0vlt6pv80p07nbzejc6jlrykaswucjujw1tmdiqwp6spxep2gshn3vyahp5z19j2wkryp2c8hcaja31hls8hebxi0an0ijd4htn8k',
                responsibleUserAccountName: 'kesmawywyb13eke1a7m0',
                lastChangeUserAccount: '0fmp140mnh3w15muwbvm',
                lastChangedAt: '2020-10-16 17:47:03',
                riInterfaceName: '4rlymiagn5z4937svcf8f3jr91u28j1p6ffbpl9tu97bkwt73wcd4tqgcg3h0685ch92lroi0hx21mbjm8lhldqliuebtr0hby5224ngchapj9mz8mz29mdtza3hwjiui82uuzu59dd56y5ou1gy8n3p2jy5eww7',
                riInterfaceNamespace: 'b72jcm6ntv99gih7ew0346d58mn1yu7iu1epa1qn8o9suvfzhy8kc9g76qd1wrmnu48xi0hpcktqbsjntorwmyupybl58kmtmcme9ux4hqm87npednptfo6jdrxlx9yx2fgrtcqfrybu5rw1vu8d1gsmbi405pxq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'mj2vidleq110eioiv1mmlki1to1mb7xi5pybz6n7',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'ogq5wr07makcf0yeil9x8urwwhi7v4k5bglu3mvhuen92ewdxu',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'y7dtho8lmg7z5wa2kuvg',
                party: 'n70ki37ro8utckkk76cgi5dygh04q9mggskldenjz3ps9frk6vuk619du01isuwmx757ezms4ydar3s11zul0205ntgrihuc44lu4hdm9ysg3gm7pw3hhohcxxw49bxjgm5h2x08femwz9x51usyejbth82kbjns',
                component: 'rameou3vvlau5dzid96c9tleqhvc5q91aczrv2yf14d6ya4rodhjz01qjl2ksk49hs9x99hn6yqd05gvqokinah3tv47vwe3tryev90emgez7veclw58zfaqj3j18xrhk8vry0kzlw6lh1cuea8otpplz42hrwwm',
                name: 'krnoeuhwfw5i5k4ue1k694xenlmk3rebm39wbw9yjuthaal187y890xhitpcfdou8ks7xykb9k7ceh62denlb87dalwfrbp4g9m1zl9gpyhll3z4d87zu2ovroav0d1ivwd7rqnxlnsqzal686s4oo1jkzzu2cwy',
                flowHash: 'bj5o0rdxwghjyoij281y1l7do94cbo0vmni2ay82',
                flowParty: 'zlw7smxm8c028cyem0grk8phwgeyurv3lp2ih1grnk0mb1bwj9t6ma21pn4ygsdaej8anbc45hkv3u82m02xi2jw9jbl7y957hi2fovk2mqflrowtkrwiyn3mw7pgiexxgycu0pt2fi8z59j2nftgxangsplbjuo',
                flowReceiverParty: 'yv6sc5b5ivukd502mvo919dri7m494p65czp1d9i1mxot97yz1o28apb6r5a49qpmsakywh8jj6ab8hbqw5twdhg5n5f1vip0hvnprccif17m6knbufpqqyck5fjge1z7jn0z18nj7j9t2i6gpjuwcwjsuef9x60',
                flowComponent: 'tzu2l4ptmmxbo117nk6an0prnay56hcyjiob67kexfhd1cleno7uf2r1ok8q3spbar91ddnke6bcckwhrno2cb1wfdpctqc89qk7o9rfu4r6p3c01crwgxkt8f0ckcff6g98hkhjhtfglwx10hihwmcgaj1zg9v1',
                flowReceiverComponent: 'vtmgebnxfj70yzsmcft73bom28cdpoy83vfdxc3rjpmxdc8aaj83qx2xqjnph249xokdzqmnvsshqr5af9hotcbxo3xke4m15wwvokz6fd9kr8a5ykjeoybk1wr464z9e5692oq0zcx4zrqooajlyk071mtcq39z',
                flowInterfaceName: 'fs2q3cueqha9r4tu9iwfo83uu40djwczmeq6nzdi0r2b3brxvb8qz0ekry41w2x4s0ud8hx2udtf5d2ttk4jyga4e1g9md31rd4fl3xmtjp7tr22ccbo5e7cnmm5t3sl4ixb20uw4zyppwgiuinpjvzpvqxk0tm4',
                flowInterfaceNamespace: 'pcnv9nje2uirh5g6gb32nr1d2u9fxh17xmxrffecl7zree22w06zlybxfcnqf0zd1v78ufrydzv7yv6pwsdhxcntwprs0uk8wsy3l0tp7ve1k96hjq70sjrovog9z91lusiq0s36z8izlifbn87rx4fn5psrzefn',
                version: 'lcz3d0f1uox2z3cyom0h',
                adapterType: 'jmockzwf48xdbgnrdarg46c5jkr64e1grcmq599j69mcoebl9l5xf2a5j26m',
                direction: 'SENDER',
                transportProtocol: '3kkb92tncnjfeyuwt9oa7rrel66hf6xcn5rtxnu0apznkwadxy6bkclsoer1',
                messageProtocol: 'esz44n9j2ws5y8p1kqhcnqqt9hithkbak69rzu019o9t3w2llmu40nf7qc753',
                adapterEngineName: '3numfr1admqynoepw7cjbdzesvxsjzzyer2bdli8r8suvzt9419dct0at1mjzc7w1cth61f7vem0u8108js8gf2ojgl1d0j51idr0fe73qxflhr1ozo36okbik7jp9eix6k2dfay7ksfvvfvzmxua8w9tb89lb2g',
                url: 'zwmu4rw51sq5fsnzp1pbr0otjiyyo2u9paakp20hki5rptb6o8i2f0qqbp1m0swihiqwwrkhy96h73803x6hvr8k8djkv68uj6fq9su0fljlgh8qrfjbqbdjc3hz2ty53cypb7t09lzty466a8ykoiqqfx0fugcz19v580t2p0989zr805plvrjophoque38hd6h6k4x8ndc6hud0v08yyihpxv17tpgopw1f80jc40mmg86ve0k4zas29sy3ya7rsh9ym36hg00bm6q4p0ii0nsjojwln1pie7eywvpg3fq5w8lzr7kbwmp6sbdjjua',
                username: 'kqn6y85nrfkdrhg7qncy3195p9xxcwddca2qufjazhhii36r0eolbplj0v5a',
                remoteHost: '5j9w42n5vorwmce4dyrl3xf24kfmhh8b297qj7z9i25gm63ruzweafgjd1skwa1epwfvzrec6fh7i3qfdjvkp4mhu72w1plj7jc4c97vwrbu3f4778vi8w9e0qu6rdf55lac7yfn5d3ok9lz66bwu5n5vcwkg726',
                remotePort: 4621622917,
                directory: 'ou21jkkjdn4dmbj6rdav5imvb6d5nconqgt1hh3d5w0ytup7j9yxawhts5qf9k34ydb1db8lpz28zkowvzxsfr2yn6qutm1labyxtfovzk21odjwb16ckllsv0aagh7dlhdnd0dk5au2igw8t93vjgk4bw2f12qtxdjewp8w8o0zxn7l4vqf176kxuh50vvy8xaen5vnyqu0tjz1etcne05hu450el8ztb1famczqtrqvybmuf6jzy7cbcakj38w1lhuykwjqs46j0jjwz7x4hz4n8guk3oyx3unu5pqheubqu21ghbyqg7ab7cxcsnu79hezco93rr12owi1j66djwhld6wxn7yf97vta9ix8w583m9hky5nlca8frny49eafahlsq77clcaukhh90hjjexy03ki3odfnbb3o3yb6wdgusob0sahfjxlci80qn2mb7dhsbavzrmtb7fj2h1fdj0o8d2lreknbzemsbsqwyk731v769t69o1g7dnjk6e0du6en6zsjn1u0ddn555pn5yxouhrlvb3qksape9n0hqazeqtjjkmintd5h5g3vsj4ormg1wco81ix11lseac6nai0mh6mfhb1huspqppu70h9vksv2wn19mnbythvzjzjoq48v2ed8748f9bjn6zctv05ibc4bh0f8glsvsvkqlkce6p9rb3ebhd8hdumwhcsopaszukpau06x7zct0ug1fdwp2t4ww2hb7850r432qjsqa334zo91pver03mzs4vrihwjm71ze2xlwsdjosy1tppa2tz95tpod2wy5ari6p3jkzxrp2eny91k5yw4ulwgtj1i3tlpchdio1infi806c3cj5rqqtuxj0cajpkkvhr6vicxl6qvjxqacw412bic96jnsicdnxf9toducfgzva2lpsu8hudt0lo82iic0kwwbshy8z53ccpqwwtepv774u1qsgbjw6h7be9b2fgyxxhuk6fgwa9yvlxd6fcyodhbb5n8bwcfr9j6u3eul',
                fileSchema: '4kji44vkah2hsdtevwg03s0zpgx940crmu863w6ycrrgk5766ms0vyc28q85o1w097wwonr9t4rqtbd8ulkg5n1bxl7tq0s6xplthpdlyobbbu0dt68qzvo2c3haved2pxfidkbpzpwpt87k44setpfgzainc44axultpd5bcp2mfy4v9edtq1p4gd1tdksfe14p4hl9wd9q7tgpbmtsjij6xorxu16jyoxabnnnn6pk6pk640ri8jxbs4rclc65wuhot3bwbproc3bezu4ffsdqdzghybvztm0owz54t45oi8m80iohsbs6o2cbh4qavhpd4h0sab88is5as10g7e7yaz6wipe8dge804865xyu30g2purgy234smjej0wwurq8h6ps5hydkh1264c998fawqs1hxxsam0pimem2t15fgweanzq0ympo1r1d146iv6jk2fo0u8ethlvq6uriqadwr4oypfq320xd3r0vi2d0p770pecqkouu17kcsjjznwdt05lryy79v6pkomqcmwymrr1jqn1srbg2x8jezzkwdfawx2kj05i17kt8g3lhe6h4tqpzcr48i6fzatcyuiyhz94nuh8ytgzq5lq407t5r4fpbozc6bfluiwpddqoqp2l33v9r7wg6ltpckyu2dawyzxmxupcbzkjubmag4x85b4quzneoyq8j68061nqja5z2q4ry23aouezdvyed8mxy2oder0n7rwkdhi7r9bo7x176hk48d5ek5mxoldt66h42gph4b50qp8i19j8p6jnqffcn68kz4zce7e73ayfpxrqqtpguf3d5v08t0eynjsmsst6k160qgtqn1lwsobabeq0q0m02l4c91u38wt4ausd99pulv7eu3o50dpdgr7mgxnfm6h89qll8hrjcn6y8r4oifgsu0mmigmfdeb5iwlhq53ujb3449p0x32b0sne93tqfz6v3shbiw36lit9ql38bckh9wq6nh0ay8bu3f3mxc2s9jwihzbpe61',
                proxyHost: '3en403do5ax0kogb1web5omok8wkz6pw8nojbot6jsu6rbbc1j69prtctz1q',
                proxyPort: 6588428321,
                destination: '7vhopop2rx4t1snomup82vxcdompfhgzhni0zhbt8em5ttujjdbhmpfo73x8lncfbka8h2z32r00hpwt9naal09ni9hqzv4pt81kumb9e9q9t45r3p5wjc42t2itrffq92ia63wmbqi9kljfgus9b1n297j13mtk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'bquj3fauznbt0ab1ns9m3d8yghyv4je6dm33sx6y9d4j7dv4muw05591csibp0qmymgzf7b8o6oc3u2f2wunzac5my2j8rlou5iy09vm032blbpj61pdd55y900qbefcze9s4tb1yyj73s1x5l5sjsqfd1i40480',
                responsibleUserAccountName: 'pcn30vr5yt2maqt6vaze',
                lastChangeUserAccount: 'xl3pycbdy3xwx8qenrul',
                lastChangedAt: '2020-10-16 02:45:35',
                riInterfaceName: 'xenvqmpxk9k6wa6hk3u5xszpwvtryfaxzi8l5nn40djcklydwxlndgsatymw6bk17uc0nuaqt7p6evn4ohfm7thq1j8rm830n4znormvsgp56c9e8rloqio66mtprlrvri26r3dd4ufbausrhm5jc0u5r3fcvovl',
                riInterfaceNamespace: 'olu25oiv6iff787yjh8zuavuod4xyvrxbxcfvbm0g8r7xn4o8umme6uacmh8l122p20ohf5rx9slbrdk2hmu1vds7u5zegs3d0tdxc9s26gy0kzif060h2fyq1v767mho40h0tn64xul52b8z6d2h5i94lu69o9w',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'xts0y7qga185gdhcnqkiy7etl1ww37yveocqrumw',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'bh3oijmrxgupui4t86lot3pooe1wqmn2jygcu2m4vyzv33ntd0',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'tv93x3cv0lj3usclye5c',
                party: 't8lxu3dx8nk3aqzmrgo4m3kgkx8m97sqbe3d7m6fl8kajqsbwwrvo755p1pt8xhya9gqd2jf0me3flekjjopa7oidvak0v2r1l4i44uihqo1xs0j4t3idnco6gashp9xye6s8re4xdfefsamdn86wepl36u634zv',
                component: '6n02q7sfssfmybjvc12gnylfdn2wvsxsiugaesg7yg5jk54ciibm5ycoks4iuc3zxn38zobegjyl6ucoz1ezfl3pzdfrxsk67ia6ucmw857cdvs3g22hdqhswjcxni3ljpw4du55rox0euz10beoomwtvxxwq2r4',
                name: 'yu1lbx6144v89ptoz67mz1oom0nnopv8ithougkil7kqitwqroixqaai5w4rei190qnjcr5q27gb27ptv0nm6im5myqkv0p77sk568tvo7p9zvp7b6gwc8cpsf57h5aealm1xc8edf97gjgqhfqbab5u2knto47m',
                flowHash: 'gdqfhw1f6ejk8xsy1gtznnjbwbdd8o8aedx4dztl',
                flowParty: 'a3brya8roupxb3pcaze67wtsagwalkskprv679khi00simr2syyes3mb59v29cpexakwe6besugextcr8ikfapmr14s4sb9gp6cagg2ar9jlmsay9jlzl8ig1470nvz74gtawbyikb3dji9450rtkpidp1h5avs5',
                flowReceiverParty: 'ltou2bksiqbtdqacfu3zsgv847itb11rtdfl4t87yxckveg96hn6yoms8j1kd85irpbqwrdnawlr54y3sb0tvjutobg5mnmax1tuzrsa12y8pswk830a9krkt7xdwdhgyke3hhcss8qraq8mbtojbrw80vzhw4sn',
                flowComponent: '5d86g12tmqrwfeupn4drzna2j8izaa2z887d4lvo39eap944c9hdbd50gp2hbbvubssncjna2ototmj61m7fnr8rlsmw8kkw7z2ewnnxshwmrhu4yapb10shcdq212lpsa8lf97i1psxnzlcftned1n6pktoe3gf',
                flowReceiverComponent: 'adg1zyd6lsvhq0f40hxngs3glhv8cmgkfjdediawh3qw2m0k7vack5cuj3c91nfyoelruyj6vbv5alnfp7a21kx1n52fhancmr9oeynccmdchmnifb8x220pe4x1rqayrf1nq5ffcjquhx74zjtsk716jc9ap74a',
                flowInterfaceName: '8s7159xci8e12xu2dwlus98o12x8dznwxbayvvnvyj7vmw3uvqdllnbl1z2qoykk13l7qsk9uocznimhe6wqqmbcl9ax0w9la9eip9uf1w39xe27gtgh5etyjwp34v1tzfwr76zq5yy0i0bk88nxn9e37bwj8jcv',
                flowInterfaceNamespace: 'fyhtt3g8foftycm0ml7khv5iydhnyu2yis1bkr83d8hbp0uux85wfsi248g9k3edoj3bz11knqyqcojbsipx93d0j0nulqch8rtyiy0ei2y6mafa7mn8uw9g0tqjtzihaovk3b7f64f2he86672nawrvu0isnhuk',
                version: '84xhbexknyrnk50p0hzt',
                adapterType: '8amn4q7vj2hiqwlggu2raahsv9slykonouo38fjad6cgbfcx7wuxco7q2zp1',
                direction: 'RECEIVER',
                transportProtocol: '2ppi3t3rwwdjwu8kbpgp5skeh8zf94t2q3b3rs6t7dbv66tii9gw1m78ekj7',
                messageProtocol: '2v88v4ehvlles0181588o5g1yyswowbyhwxpjkclmtn4wsrravkhi39dk2c8',
                adapterEngineName: 'm0sk8vsdif192hefiamnxco6eoewfmidykfp3causiub5aom54yrh49qi5anbysgpi8difkm8efe22z198xucd2z1m6h8dh3ncxm6hdauc18f3tggm4hs2tp2c363x65vnzx3hxvv564xgfneae22lyu47179cofp',
                url: 'gz7irmlhcock8vd3s5vu3hb3eqhn7678p23qlnf56e6pvpvz7j8a2mjzr8chk3qpeihj8kvjshdy3xgbpvomrsj9y0uxauo0yysctt115dz61505kb76u7g5hd8sfovmaabw9j7tsalexz9732ek7fixmgvo22bzb2zx0na1kb14lrd4sx24gjla5s6wqjpa5i1v37dfz6ta0z17h1tcfrw0fh7ascuh7y1t1sqyo81xo98dxn76d5cjstu5kd66yutfw86umfx32kcv06v219i9rmsv6ws8rjk9g7y5bxvph3in3w2buvmacb2o3ys8',
                username: '0dz3u1m06qlt68xiq2gylxrjmaqlo93h1u3m6kdlj1j0kx3ufgwg5x2ubzif',
                remoteHost: 'hkpf9drscq3y91h9g771by0jfwwdop5btno1onoafv5y0h9ri5dccdztxuoyl2dh94rqlulan1zbvhu63wf3km2oa3n5u6zwmnyu6jwoyzsq9j97bzbzyahmqghglyoztv270n9wucm0zmvr1153fbl6v74k84ja',
                remotePort: 5080371531,
                directory: 'dqltyyf3024ldzfkrchxut1y1aqkda5wm7ykuoescs3q21min9p826w2sv2f4ijbjchc2haxshu7mf9y5ep7qcicz7c9ulmu1nuyarwrjsw22v5sm4zopo1ew0j7951b9zjl2v34y9flvvps72pgow1mkc84n7a8nrnlvg75ys2c7tqiowy0r2zcdc945jzttjld63proweayn9b1qav8tm0awvzcagvobv1lt4to7qud49zu67yomxgptc2ub9c4vj4a995sfvnjf2e0sf2csranbr8fq476jzhfy9a5qepfuhl26iu5wi95866pnqpimsmwmeobysf3x1shj3wmqvxdx4v8lqeaezy3xmmh5514zwto350c9m8dvv78wcl4wk9wds835nivhcu63zyinprz8ylsha0ht7fey3im7wgzp6jih8jav9c6dxata02qah4ech5ah6ya65pnxg8a4575com8eaisq186ir9r12afgiz44c6ojiwyod4miz2xljrius0qzfkug5izcwymveidi4fwlg0qodj3m5n3w3y01hfoqvmz5w02i88c0ojt5c6y6np0ba8gcgsdbaxoznyd7ub360xeem1mevxajqnlofvtxx4lom4wde5rtbjbz019myq4aezzbwcxx37x1iv3iezmzn2i6nfkn5co67w6zbo2abys4xujlpwq0h4gccfo2emnivddlyt5c77bxgjw359wn23rkdqwaab2wpsu10ftft78ixiscjwy43tz11eynxt4tarm3fqz0bo8e4ure4zz7e4q7r7i3abr18g2po20pmozi8x0ry6a93nik8laq5twrfiet1a81ffig181g8t2hfuokygncuwan2ccdts7f907rngnvw9vrl2awgfswlqip06y443lnze4lokpjkf0guueiswr82v27l32dps74h3y0pecex5kb35bqw0sp3vk35qg1brraf5pfn43n2ezhswhnlyjy5ek8vhm7ga759vpwq3c6xag6kq',
                fileSchema: 'a4qlg42svem05ug3woppbo7e2yfih5o7aw044xoor9tdoh4kgtfavt7y4shw8ekjx2ppxkvviyttnlb7h2bcf2sq8fdtclmr01gwnsru424qjenku6nde579qurcso67p6l8jxrckkhf36uzf6r6fuckx682y1xjh3fdrvi0lt53q90vwi0gqld387vaem4he3q407hfu0ugf2nlcfes37v1r8lfca8fo1b57bzlo3os02swzqfyt9giy64jakj94b7374wrvjkcvlp4drcw80okkuw9ohoe0sg6xy40h7rs7fqnh318qpw57s5tuttc588wfjlh7plnmcxf4tpbs36qj2zx5p7ofgc8wjo06aok41nbn130wweqvc79ekctkez6xmm6mpnfjd9n628r0j4bakm36hgoudqsojibiso20tjaeejtih4eksj9x32bfjqa6rh7mu9tup5cgvotce4f9shnetonig7cafvbgb2nvs1mb0xp4dz49uwz39nvewwitgivggj8ub14v1nazv6kln3q72a6pk43mvxn87fzdabfry3wgmlotpzffatdnad63oekvcyjl1xd084k3v82zv1ogphmzqyy1fjcbcooaog9o0on8u0ocx80n5ckgxhgkfj3chul4tyevcwqpq1crmrxst0cje3tlqmmfgyai16uk14ewfiyqsdk2zfgrqb8umxij1qj88xpo8tc7rmv48kk27e88zmnpibnn04qaykys9qdqs5thqbo7lw3k8c418uffp7fdkekysq8x86odqcvnjsqrbp8x5cwlg3vjj0rhm6vuivirtdmtbj2upjp9p36wsw98icn78e8weh4hckqr5eovu278wc024dp184qpm12ykxwh10xdf01d67y5akg6rm35wn1gtdzm9oz3quk4yagghuq39r7piop8sudnwq7yfglhsa9lnawvxi4q0g5pmcglmvq2pe0w9fq4fz1sh5qmi10k536q6668ndhbxk4qc899z0k758j',
                proxyHost: 'd5gxs00lg687bx6lb7ihh074py2a9pfdx9ch4tey48spdwy0vxiyr9wvhyw3',
                proxyPort: 9201486593,
                destination: '25dw6fixisfsgq3jztlc0qckxjcmo983312g557bxo0ymv3oq13d2ima1fb5x0gws5r4ori9giscinr7xdtmacxsbqocr0k2pzxdk48sut4emfwttce45ojdwtkf55tydvazimkix4537afpei0utyg4o65e74np',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ayxt6cgjir7jb2ouoms29h4m3w6k1oitwdtcywacqkwe2wiyy1ydjox52oeby2r8jn7x274pk1eru298epb7vyhjmq6wes45piks4wlridc7iqhplqyge11l06jh7cd7i9ns3gg35jv34ugkpnu0d6a12qonlg8d',
                responsibleUserAccountName: '4ovie9bcjwuv22gui1yf',
                lastChangeUserAccount: 'zgnk0em32jnmyo23iueu',
                lastChangedAt: '2020-10-16 07:53:36',
                riInterfaceName: 'chrr5prw3bfziwj8ms3a54q0yt2r2vk0alfwayibyjs5i84bdmz4yf9ysa2phl26x6d1kpv2oaqlghlsm606m0ez91ku38uqmosfbdlngfs6lifz10lc4auk9idqoi3dulla2y5ehufmislhv6a5e7ftce7jgs60',
                riInterfaceNamespace: 'zota6r364nmh9ndmykf64yfbbnoyqw1tog8x9mxqvxhz4pizag988n4cqgi5zd81jh4064r62bs153a61262t2334w2fwba58r44u41ooxwp18ywpra7suu6e03c947ll46h0misc4ei6f9kdaicfkqghp1so2bk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'byeskwxi2dfu6592ps2gz4zujr94im2ozsk32vze',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'jj5uum5uiu8yg0clml29zaicd9txp6s3szxbu68qbews516l3y',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'rcpgs5tedel5yxc0k7gh',
                party: 'zbvtspsuogja2jo5s23yfxut4zvsptqleegup49v7puqvdg5wfqz9sy4yjhesrsgafafm6qzzm5bkp4wzag7n4vzu308mbp18s8rlkillpoqcf6tmtkifvd56q3v5vbpl9gtxy1bwoa7pr0fbn6gaiptcsbqdtfc',
                component: 'queke1qej06rarwq1ybm5vty4g70dy1o9jjdm1dfza83kmxjygvgmz2ux6e705qql5ah7riggphe0o2truefldqe5nvpy17qdig1ay16sjgox9017v7wpa6cajp58l7nddnvaxq3hrok4yudx2j9iwx03k96yvbn',
                name: 'qz8phlryhu0gbwoi5l4ox98b6tlbipx5gv88lbm8mugswcxoaisfo2jzlpyapc8fu7i94hi6qkpz6bp4rsd3u9ify1nbdawckz4mlrjvckkvza484os1io70cdx0fogp508640fwo55s1ecla09g96u2hfvut0p8',
                flowHash: '7gzdyp1wq1zsjk9688nx5ftqo1yg63eo000e9bpe',
                flowParty: '5x0bp1tgjr5fw7awy3g7v47ja0a0i2bzsswyhjem8dh6h9aacpjtw6xzoypsszzgms30j86f5bdg3hrlw7t23iu0ksu3bw92ph6z7epxjanq5sue07ly5gss4rv0v3q1gobnqcbvyyesoiafuiyyy9b6now443j1',
                flowReceiverParty: 'r5m8fakik4x9xgg5vju52iy2xxeou5z2hq5grh3chunfg406zp0spfgckc4lat96qfvn9hgipt27ywekr7x28mec502i6gi7iuz9axsumkey8d3aamdocs8hwqg35sh0i294qye2axu3syracoiof40dfxbdc6zv',
                flowComponent: 't1hckvpt8fr55xxfcu3trb5f76gohy3zac67by0tv4jrztmzqk5jqihgx1fyb9gr8k9nr2ly0p2nc06znwrsl7ws44k6zwsofz7c75yuwfgfefgiymy93xsuattpce51dv1l46o8ehfafxaqhpl8x6oec3j88whi',
                flowReceiverComponent: 'h6tj087ed8hklm33yy6ryfr5nh4ai2iep1b0b7m2n5qt4eitrpf19i95konaco457bh8angpbbwknzolhzfm3k9wqxj7dxbj54cw07ww1d1yxeb4tv2f431v56z6i0hfu8j6ofyqfvzeqxry1mb10a76pcx4l2e7',
                flowInterfaceName: 'ewf0qgik0mw8xd8l4g893d4ufqq6smz4ynbdqbm87zqtcl540tj6iipiazsiod607031hl2ruyuc5tok0a4eivtmbzmb0nofgrdqoeeekio3bzd664m1y1tv7h1967hb15oqef61umbffo7bsfelbthk9vwxcbsf',
                flowInterfaceNamespace: 't4esc0hq36y95xnnpe97jrlmygec6i40j9vvysu4s3vv4f89v5xf9aqtv4dr9vmodo3009ckmmdt651q8eis8ci6yckwgea0akvu0vf0zqgke91pjnm3zqkjy485mnoti36egnopamf5zip2tv4y0bz7w3a3mywy',
                version: 'uaw2nneiy2axmg9hco9j',
                adapterType: '5bv8ukbg3l23v15la5tc1kh34bo5qj6qadtikt7qx1ffth506g5gnxokibmr',
                direction: 'RECEIVER',
                transportProtocol: 'k1aki6pzv8hgzlo5innzgdbar9pw0f6b5oogyixwwnot5st9c7wv832prlu5',
                messageProtocol: 'oylokm1gu5o4fgmjh76yvn3tiswa3wa87werq4rdgx5o16jbm83t0a4wrtwf',
                adapterEngineName: '74bg8kxuajgj3yedzarsycztai8nelrwxuxcglfcgrhujvngr6eckrbgwi3lvp1v1cye9mj2ayaoy335btphbh6i3qn0tsdos3ozlto2dd1bcoqaethvuf5gafgxs9neuim9xy3sxw97i0dk4tt8i5nvau11lve1',
                url: 'ceat8x3j1qpc8gho4ju1j12zmkthyxafhojssfos0342ty4u384nd16fgca0lkrdk7o5micjhqhw3h61zg0fby3oj2ii8pczx88cfdr0ba2cx376bxoyqbzz2iykjk38oo2uczapzk23wuuna3sm5xiglv2cwvb5exch8ws5yka7t3lf7whodyyiyo1nz3v5f3m4ebblgdvl6lfcnyas1euvzcws9yxamlochzlzyx0df139otlpsvyv914dabrb0pwdmgrvn33z8sl4yrptcd4k7xsbqi0e3tuaujbc3z6wq2d309iutstbb4i0jpnnc',
                username: 'su3ci4gbt1edx6cfpoi19b5s54qifdy101fdt8k079hq38f0qf1m5mqx6tsf',
                remoteHost: 'masrehvmi66y5d520qpg1ogrwm42by6chv3kziskzioafc9y8dmlx540ljkpgp06hwh5abqvs9cn0jt4l69c4y8igehx4rdasmcajkhaiuhbqxo2yy65doje71yyd5z688iwq18cs1e3zawdjspk8d5j0g8xkexw',
                remotePort: 2804518229,
                directory: 'lr1mno74u8vjswxzu6i9x5ejlr0nyaffdlzajm863cvof2zxzgzvz6wyy6sevfb5ho78fc3m5e9hw710m49fyo8cf0rxuw5jzvuzvmvk26quph81u3tyj8bygh58ypz2kjmjm0dn2xb7xwxftzi868qfrwmoujflaruv1caxkj3peb0vh1u7j6zj256d0elxdx6tnuwhc3zrvz97j356nutvj1alnanzhqnpi2ngn65v355m7imnrau3vvb7z2atpio7od5llze9dz60iai2csya7hr4s9erjcz8fkp65s7bhxnb7a9yhuhdtnf6nxfdp0p0kaheaz1m8sb8lw539t9459p2obkuugpss9sv910baphfru16i3wc5tqabas2ipmxlwziqzup483euli4tx6ocrvwcrviiq5x5unq0hhiz26ikck254wfbf6eudse5mwqgr2j3dfa5q6vq9jpvcbelitqfrjuo565f5me0ogewg1tfdzki17nwgc89xj0gmglee948288t0zucnwou2unseg6zdyo41dte4z2zooti5mn89tfawovp9vl66gw10auttx8vqlx1uekq3mm35g8k6u6p1bj2kownh7mc3cpe1dpvxgllmpbj5otpg6cerboc6g47qac4xrbvr6xjnqqfofcbxki17ef1td3bjjkjvqk9ol40d3qb3byuj38u4p6gb8tumhhnih3p1xevzlsqkjvh76hk5cog3d3q2bpotvug3ekecrttzf06d6hqq7ocfo6he22ye0l9txnqdt9k1ihr60nm94scvrgz261yvto88xly0mcuju6afhi5z3phog8go6xzo8j0rkvlq8p7bsg636qr5zlvycwei3tiu7sfvir5rkwvs5eq41azh2sshp1r6kanrxe3m0jqmqzhl42foo7h8xqlpiun2hu0jd451yry1oq8qke23vuan4ar1gb32hqxduyq7qlhvv680htz9es1fvx19dhdow33lrn7mar6kfzl0aki7vz',
                fileSchema: 'u6dhx936mnmr8fvr01yqdfq0af0kwbt659a0tsrtqoo4npfzaxyj4q5iutom7rob392nmw4tf78kbsfrbwo97hrj9ujo81pu4uw1ssungi0dhrwz0fjge6xe1mvdgevmunl6fczozi7dphlsodrvlbk5m7ryd0ynyayn8cyxeyr8npvpokdnhgyyqavidt63ru2ikrtdta584v97wts3x11ron0jmi9gwg0pdzv2w7er0ujqm80iiyl1nfxq2rqk1dcs571d20uos1tbc8a0k1fqdquiy4f8y296482jl66kde1fmdrto3rfafztxddhpaek4dyydz9us0792pnf41ggri4lzb0yn3aspbhhyjovsokab98gyeuxg510dysyq9hmsfw3a951bdvw2tck2taqzjozrd8ypmc1yw7yo070667js2642ucl1dhtizg87h7pucjjaa5ktcuq9hhnnrwn2mg453v4ro4zl0rs0t3wzt040e81462pqhz5z3rjcxnl2xum3lbwwtibu9uaunf6d8vonq8ync1fx6ted8a1jzackbxmpcaz74oiuat9jqz3lvdeh9go34try7h2wjnil2kkroemk2crezfqjd4iz9bwbvdwv7359j2yxx8gdtoejre8x20w95rugbvygqex2zesp9ig3erzm5p3v31d3ymbu10qgbg8vp0wm9slrugi5xux9l6pgwktkwv59w812po9t704w5a7lz9oniewabzuolhcx44s56v97kyx0mhs16l09cprc05nyvd3wyreg2pvjglmmrf3ali68ejy2kuigc4po07sdju3288hpnljkasielyf7nhbx8b5ea4nqru6hxy75v26axta5rvxjlrx4gx07p1muqbg1wdo20d1eofi1whdjn1w3od9fl05vk2yw7pd3ofinr0inqgtf85sodo1a7ddi8561beecxzdoqpgi6thhrrwjnf8hnfx2fvrvehkz2nos06gxpdmg07f4s0lg7qagu3z8zz2',
                proxyHost: 'y6ej1ajmuwbqo0igkmyaflve1ug2008q20mkuew1vrjhx027e5ygc323so2g',
                proxyPort: 8355771032,
                destination: 'xg9zl4y4waretln2ay2z6kqmtwetfruqfqu8jn35ap4t31z401tzyjgnhiv6j17tubyh3y8t4j07iz6aeynlqhlcmwd84jueqyr4aicr59nuq9s3tcajs35rjxdmkzf024k0fgdz9svpxlbx56igduaievl22h6g',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '719k9q05tsq9161kaxgbn2uv9k9bibj0bhb74xbsr2yboyhklzz7lizbjrx8enc00c2mxx3eg6nr8co9lbv6xvs8kn9y19nyytnlho3awb6ajx61p6y0uvaqbmdelrrr046r5tk85gvmtd9eog319d87nygecen8',
                responsibleUserAccountName: '30a0oqmov8ips26jn0qc',
                lastChangeUserAccount: '8geictvfg6b1fc4cf81h',
                lastChangedAt: '2020-10-16 19:23:48',
                riInterfaceName: '5hmgko3iv1du5pfrzgwgkxhwocgxunaacropceyyozbhq94rzmbfla3ax8p7vephtrmdb3fsoecdbjgayghfawif1ipjewj5jnp39ja2u9psquzxnic3kxt10v93hxun110x5o80ugt3xz0kcfb28x2g13cgrli5',
                riInterfaceNamespace: '7569grir5smdfxugenwm5aryqbgwa3upbgynewavadudj26bbybb5jqsdxebxyse5gvnix0s2si1cif23rgj6fa96e59nmcu7kwm2f5cbzq68c3vpek4ilry1lpwr1x0h4a7wj0e0j8bupcw9kcrjht1hl9b2xhl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'zxv0x5u6n3bigwzcnj3jvdlb8kirbl671lket6fv',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'ta96yu189zcxevstqljf76zexdfj7uz0con1zv68m69k4r4bdu',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'y9dh79yyd8nlyckcn1q7',
                party: 'ymiz9ttv1zum89k92qmmgx8a6zd9yhn1v80dfn06c9p3usgw1x1fvbodsu7su6ojil546h6p223ugfc9l842sozo45qzfd0pakhbhv7h124vo3dopwongmkz7d6d6zsvw8fm8b92uykshyjj469vri6nn9jw9wih',
                component: 'ca2v5566yf4c9uv1lkovzo4h4oua2h17gcwm101ycjz917ythvyvqv798iywyuy0oatx0k49lqez14ge0j8ndx6mnug662wfini8agvmqo8dwsqmkbuw926r0b2xxfp2i0fvasjop9xmmc2hxo1xg3aglojvj723',
                name: 'gpgyvs7hes8goue6x4zdtapjllvec073zdnvrsoi5g1sm6n94h3o55elwcbb4f2jemtnyrqfy1amnsjokc9be9htlxw62gauutd5102hn2ewdtiff4rmdfi089uv49fuqlouw7l4rkc20zh2mxlgz5oe7q33x1bo',
                flowHash: '7t0h2q06dav2s3obixls43arqb8frivf9wpnoqve',
                flowParty: '5g3a781dz3qjil0rbfy72d7n3iv5epmmrja17163s6ixr8i89iiq59r86m8ds6mguo10jgnf1eiomilxe1f60fevt9xwafye0skkrerfwqvfp6j8w9pnltiyetnyjsyl1dnz33k4ovx86mh1bufhchb35qii41j1',
                flowReceiverParty: 'vfpql1wolhbrwc97spu2cmyaff7neqm7v44b71rgwyi2om0c2d87caza99e83wu9ticcglqzyfpdp450gc8iezdn5qmlp5lnmhop5sa73ycb9tux96rlmpjss0kb1d3t84xolp8ykbuweiv0ltk06osrt8nfdfsw',
                flowComponent: 'x54fpgu6bqc322ck25f7zbwz8ahbps8jz8vbq4eufs42erjehs6usimokbmgfw26wh1ob1lliwhrc6ja8r6grln6nin3owopqvvc7era08pb42bu0z73sc5c6ajwie92b1iorg4c83rcavju8an9jzqit8b162x8',
                flowReceiverComponent: 'n4f62xi1c8jnqlog6436lsuye3hvqrud1hmhr4o3yhts1gxci41rwzdyfzuspya4c4jsywczvzvkltdt1c1pk5cq8p7f68wcegfpphy43w3uxr5kujbioyksh2hdb4o7x7yu0wv0eth6hincuq1dcab28tbez9sw',
                flowInterfaceName: 'lswn4z8yk59iz0uahs00uv82myywdo0csg4lhcjbdrtmy64xa7n37zrrizpwzqfm3okv3v3i0hxczwh7tn66lzuww6m18rapi6a8tbubwfr73nvu7wwie80icn26kjqty1cuop5zofjoscyc3fe7gany62wcufao',
                flowInterfaceNamespace: '7o6kutvmx56k2akey9mpubwt55lhh91t5rgw0hy66jcn5c1gl2sygnwl8gqz6n26yb95j3lan4lg4k31s3170j41wpl3d85ta56y87103h87uukw93x1cie7qbx5051v3bc2hvrbl1vnkt7gfm0du0l8114he7dd',
                version: 'istuc1cy9il8errzjlv8',
                adapterType: 'v48hibeqz1pt1tfvsk7f6zjxifsx9r9shc12rm8tzvkhq5bezv8yvebq0rw4',
                direction: 'RECEIVER',
                transportProtocol: 'l7ig6u9bkjl0n5e1zuieqm4s3vg622n2wy6dzpodxwwisfir7f44ju9s4vi4',
                messageProtocol: '2p69ouv5o8wfkszzubbb4shxn4mnz9lpznis1fuo9gpcf3zz64nz8poas6g0',
                adapterEngineName: 'zy0hlphckl0qrtr1xxpv5lhncqvwbonnuoco9wdr9dq8ca72ttsea8alp0v4bguk1zsz9yh4nhk2qw4pxbc416iohozv0a1xl7iicagnm5woqgh1qjitjmcsqk43rd9wm7u7ssr0r71qs41f1b1wl4o5a1mq5njv',
                url: 'l4ngomxgvz8u1g8ccyuxev1tnpofe3jtk9457rmwztgvk7gy77ftq3q0duy3wv6k1esodqk4hjjl7ws4s6l7msjzkiinb2czptxoclsx17u6k3hnst009vp1omo3jok3odvexrxme3f0t0l002gbiz6nzute99a0ulxp1en0v7i3gm3fy0mn64520va07jlkd0qp5042a40qr4rsnr2xkm54gbamozecpmebv6bz64wksku0qo850tgd6hjizy4lsdmj375w7tu2yrlfz1i6lhtnzvk1kwi43w8a5iokf524zwzrjp17p1d2ui702hmh',
                username: '7owival9n87m7ngrqpzphb6gfezthkgn1llqyowm8qbixbkm45ldqfdywl9rx',
                remoteHost: 'y68l88hy6pwuo2z73qnohth22nfpb3qb2rcj1ha4m4bkvx9rwhhtxuodge5ycrn10hvahj4kn2pu03fc2fdwz4coahnbvign92blb932kil4fzx98h5c6zdxfhjjwmmhgv3umrnggkyjxso8b009gw72da1nlatz',
                remotePort: 8205826908,
                directory: 'vj0mz8zaiea4wdtrditg319uo6ii0f6bl7gopcwpx8of9712ylnhnw0n5fv10axfxzoxo7emryu2owi6pfnhmvynnv6iiwz0u4eqcejesl2bz7j3xtxty08d1e4zlh7ux7g8djy7v01wqzomw2hskmkj7ii3dxe7zecpw7rhody9e6hah7c5f7hb56tr84jnnhjd0d4axvtgeo259t1tzkdzxpnhsodfau58z6rscyu0asicy0z4gieqsk24nvj9c3dor3wupmmlwr3jedzfva8mk9hcf86gnyzn1mrqm8uxtdszqtb56u81lob6t4g5trksxh224h0h10cg26q65mo5w62vk7myfcbg0v2p3tcmoxmt1oru1zus89q7w8f6ct7dbjr6fvhqokvq3w23urshvpbhhrtfkpl2mmyb4x6ww3py3oh0nli8x0ej95ud19jh5vi65okzls3u9xfm1nry22tk153k0twpph58k5oi7i4qt9bpmhds4nclyy5vni0433ibhyos25kacy7ethjadp7m6e0s6m972wga9u7bxq8bjft4t5ag9mn3i8w3g7iphh4qvzqbhwn6vg7xzrmyhgnxms17empt3qvuokzga80wffrbo05dsxpd8jwxrjqt5y2m0y36o44x82928phqir466zgo0b8ag6s2nu78wgfw8bus0l85ewblqlmrivq9aqs2ev8n5t8rtiwml24uqn0v776to62s19sr5mvsyu6a13ot0ikxqrycc2eft3fr1zx7ygjzm9nmz49jr08nrdmpfjg08nbfilxkm9s2ys2dv5w9qv78nxrf5iypb4d3uj53b7rqo1wue7xdy3rcug4bw626rxzrofnw4ywnk91fogatp4ub951zftrfk0d85iolmbiwet2ghw47y55z0495hekajzce0bjxz84ehm8qeg9dw0vv47wppzexihymrbtv3gldvr338v6m2hgqvhnc66qk1nt4i211306u7rkoodhm2bzmnui0tfnj',
                fileSchema: 'j5ibdwf7lo9hzf6o3cy8i25rq9m5axqaacxyibpbfh5b16dzzgmf907po5khdylm4ekfzq3k6g8baqa5dako0jx32mjixvqpiuhmoczhjprrc00fcdedz9ohir2dejkk7wzrpl9rfl2bk7env8fz0a68wbqztul6lsyog6jhjhjeh5u2flgc6nc7i6sbkv44rzeqjxzg8a1rve6indgb0esbzwjqx0iskgp84mlia23b5p9ph1ae8vm9q11g35cqmd5abgr5bcz3pmgs9nbzbgel6vqeh4rbqwuzykgnnh25nsspblui46e76fypbch5nup0k1ezn7kh8kr89wvoci2ckcvaxp8ldemq8gk5ozozdsvus8l5k39z0xcteyza80nt4lfcj6piyu0zkn7jy641e8mtt9rbjzko13q9ncgrqdh7jj9030p481hqn2wp751c6o419a585kbvs2359k6tk1o33r2unm2yae9qx66r18x2nz8idu6n6mbg24q0twmpswsfbs136q4hojnw1uet2zu26rbcw38ou6jkdluvho0p502foem566rha3yxmcnz4hl7xyp4j4uwelujhovaynu4j39n633ecob97m04m26jcakfucasb02j3eao5m59bsg4ydmmwuqdpypgnk1ljlvgdp4lm19qsba9znsdznsyxzz61tnpqd7km3crkr38pq5aepsmpsidjr1xdcf27vcxouobr2lqr3ns3wuiszthxav8my9u3krtuh2t6qeubqq9mf02bendbiirytq722bf192mym31zf91lbco60jekuxcgzh7ymjak3pkrh1q5fx286sq0trzvypq3r1re1mxkbtnrmi96ksihkxozjjrrh5xvr81r2u7yjncszgma1f6s9t6mdhi7ootjbrrxtefbuvnvy1d16gy2e2n2zwvwey1slri2xwjtynjtmmh0s60zye76v3i6a9ydntlm6ji53v0lw2wi36mlg6hmtb1gj88qu3709fxm7ga',
                proxyHost: '4y0flfe25p2sbzck1grv1cj4tqbk6xg1mr0mj1cadxub3v2wx5o26t3qh4qd',
                proxyPort: 7957668802,
                destination: '8uuay06qp5iza52a5ropuetri581em470rjyphqiglqk7g0puh1l4cbmqw2knw9fhk74h2csz40umuj27t2zyeosvq6jbqi091szwtsillmwzq9wxh7kpypvw5qhgmjuhoizwo07m4tetyiu151chpww57o6rjfl',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7vmamevp5yhek4rdn01029scwauwvfkeo7oncmgmkg3nyj8x1bfd6tvwz72oochnk9by8qj2yff8g5zvpokl7kmhibjjg5mz9ahjondsm5o4vj98rhsdb4oxyt78cbbrb9j01xprtn0v6djslv9wv1ymxnspyx6q',
                responsibleUserAccountName: 'mt0t1r3zcwb6rmm88n0s',
                lastChangeUserAccount: 'svtw6y8f1ntkn5m1c34p',
                lastChangedAt: '2020-10-16 17:29:49',
                riInterfaceName: 'zpthsdf26kre9zgohnej63ay812v21qjuq30p0cwztj8fhckvzpfj3sibmeaem75zraz004vxw60w5d0txcvkhgaiu31hb2gfwp4p739123m6k5yhjoi7tuku0wql151tnjw0fprs3codpdcl5xcc4djpd5f11hz',
                riInterfaceNamespace: 'ahb9pklv3011lnk9lx3sai8k50tr6v2nepu781fhffm8lcldnqlcxf4c78nlzfwk7cliuczzitps218mhw2b8au09wex0vmodhjhyw3v7cipxxxci2h30xi7i0g9bt1bc4bw7qioe2rg7ru7c8qnloqe6bjot3q6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'jkgnsm9p3nfc1e6c2u3jss2p03mg6o97q6fee1ff',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'hbvwbnzn73hnr872k8186fiu92s48aoy39b53hzke4dmmtzgpi',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'tknudj3e2yeovdtbgl4j',
                party: 'h4pcc9d84gvi8m9zzu551r8bp38gvua2kl07edlh2s9z35o77q6zy91aokrgnwfdi3bduwyvt0fx9zdx6m3rlf167eyyz9vra96sy1w8nmudnzfy6iyy462uri01x3qu0d6gz4xp3iuble7d0pb0x1pamkekzo5a',
                component: '5bab0lls04jy4yx4neot270ix6yrli81a7uloyd6rt65xdhz3uqoevx3392tn4s5kyczhuue7oywbwxeq2qngc8kg7cnkrm9wrkwyck3ry7p59qfvmdy4lvacfqv6gtbd05xyx6zio6vv7cxqb981w0bm8drk128',
                name: '362gah8uqahy8tjmgrgongu64cuytr2rnthgdu0cx8sgfifnxbsgg437sjrdrgjwg4pdus6vglts8u8sndv7nnj16fm26ctqsv3sr1n1hskxqooy7i1shsfo7nggjvsxmrnaviv0ldi7icahl2nvsjegl5h9m83e',
                flowHash: 'ipbirsau03b39qbe4s2330edzgwlmmd3dinchmlb',
                flowParty: '5zbsa02gd9nu82ls997tlc4o4sa45e3ucxlort1q0kigmpzlw1yef8ibwmjq1gky8ovxmt9em3uzma40ax1wqa7g62p9b9qh07tq2dw2qcmj2k25mmh3u0c5kx9f8e3svenag2mqagjdb58caox3zufi4r4rj55b',
                flowReceiverParty: 'esmxw10rozirt5v5668n0urq3xtjy6cqvbnh5h2wclwsymtv9w67rr0emnohjdpr9zaxylhqv6vo8qfx2w2jw3om6ggcxplrce5tbkahdxlxoaduj48zimp3vf7y1izos5clz7gqqbpalzp2c69f17x2vn9h3zd5',
                flowComponent: 'hbw186ljx8gzypo67tyhw35xinn9i9ruut8fun60yziawbxr3wjmlmy4vmx5o54yjet45dw54v65psbfdnq4eoj8cbjwdasbyga1a7agu7myvqrnzjeqpo3kku5hgub1r8gsav7qg4sdqwspy5xriz00u2io9qka',
                flowReceiverComponent: 'abcaplzeib1asr598iredn99zqd46ech5t9r4dnljore065s32xb04ahf0n7m8v1oiap5psp273bx4rnwi2iot8dfxr00u243do4frd06z8jo4u2l48dcyjf731xy55otksrhbcnujncus5269l8nhf8parudtwm',
                flowInterfaceName: 'qtbp94iep2hix9g8uwwu22yluh70zncqei1z3kk4c5id27zx5lm8l9m0m00uryv0javr4692h0sagut2oq0v9einvumu7ozjs2835k0aycxezo617ozwtnjbaozkd6ztjrelcp1wccdirwkvr6wcsfzo09d9tr6d',
                flowInterfaceNamespace: '49hzk6pg9hrxodfpytj9o87v79a2jgtgn97uuzmed4ojoc36uh2qy3j6umil5r1il3d0i8relf49jy0v80nbzorpwtb44mafawgcry6w6lhze66k4y3q5w62985htcbszvz4ifti2sjthg79knqm1kw25g2kijw5',
                version: 'g1b0wmlkv102rhimn4u9',
                adapterType: 'i4g8gpos5qw3hp7iqi9juz3zr0knmqmurn78h7f5fhzr1i03p8y2jhoh1snk',
                direction: 'RECEIVER',
                transportProtocol: 'q32lmkh3vilnqncckh5thwg26v45h8de20m0zknn8rwzwcp9qwelajekbvxz',
                messageProtocol: 'pyism1v0kd0f4ookkm8wj3znwugqqxn34njcjq0dhuu7jcvcph3e2kisyu84',
                adapterEngineName: 'gmzx7mtwmv60tj85tvhjd5rzhlgea001vlzkgamkf9bp3jqshlsxlyg4cvsouf25gxj4qcrmz3nvx0h1q6i0d8x249yyfjh4dob0l191o20oytbzc3c7m17rzdvh6y3s4duduav7kive6n74sbwztdy48c1hueue',
                url: 'dqg2t973vkzy6yhot3qzuo4ma330ziktjr4rehdk9wyc8g0r63ly4677y195hhycym8uwfz9w5h0t6egntecsdambgg3vrkz80h9uaw949ul78amtkqi6sz6q9484a61y67gbvoekgxny68f4l6ses86nt6bg8ldvcliwxmuxm2klm9gf948g0kt062pai91t7h29dq36my9g95rqy3dyiuin4j5zmyr0os6wyd4bnmbtv1j8kccgbu4d6cpa9i7zootojczd6agjp1atc113hw72rxgxp3020hcknz0ojbau5ql3cg8mo2zluohkeo3',
                username: 'ed4vzlxpczt7acioac9gqfj45ytt5q5nzt6f4tpddjm39h5acmny9z061xw5',
                remoteHost: 'vit6j7bok82xbhg3nkp9ymfowakizj03tbri9w5fgsqa3e0342xclrvgpy56muatucqxcmpisaonhzhjc8ul1km86rng8ca1ilf046kf2ebrrr3c926as15o3yizbzsr0u9gij90hahnzfqeige8t2lgphi67x9lv',
                remotePort: 7774017878,
                directory: 'hi2nywt7yy6an7tq73qwtrwckyf6vq3kpojwkg6wrmyxaiaaamfxs3jtf2vr0gh9l001mwfz0goaevej940u74i6t1scwmrhs0p6g88hykgs9elje4p7iy1nld2yynhlujunzhvninv2bvvk8rjlhd7u71oaakq79q0wwwynnxyauczkisxa7cv810y3ntede8khe5r2w3f5216tib2q09trh7hsjaizaafy2xnghtcbcos7u6c3t8hcrud33vmr5nlhwp7v1u0ohx4zpurrfe4ogfx8f3dcrwublw4925bydoxqdopxkjff36hv6bzumgcroiggli1o7c5j4exjt61jk8slg09woz54n7tsi41xedpa9gslkmeqatdskzvg0blvw3atss6hlqmur82fm634cxf4y39477ogtjkptafp8w5rcmxdjdz6qeszk4shhpk4iv3fnj9qc6fqspkdzz481dsiiru45myvqz8tk4rr8grs4t3bm76j02x1k00mv38b164ja1t3xney5kqjskpvj3qwi4eexnr69jbi04qvmt2mqm6lpdtwsc54jo7thz6wro11oeqc2h1ndff2wlglzio46hcf111bf9w2drmaxj9vtevqcvofjm8lwr4gjgjp2q3fqqbn92z7ip0cqaqvg87qrckij6be5bmgr6s8dadk381kgkmq6g595zlztm9hytck5bd6b06o2vm728ej1l09e1boxmu9a5r7lf8c0lhj2nn7x8nlzk42plkteqvhubhi6g4spztbzlmfe2rl7e9lyz83vnkep35r0ycpwset4zhkwmpuw2tienco86fq9cokv8kfhpmtqdz4np5grw1c2gs493ri0xhrqi8qd9ngdilsxplvdp9e7x4fjhg3z2ju4gglvztghlxiopjsut3v1jrbeln349dbefd845gnht6r06wpmiqj7tsqxi8fmwhtnu8qrcsmkbmsig902hy5xwp499wod3chg8fwc38lc1o6k4lfk9o8fy1p',
                fileSchema: '2llfa8xsp4aoh328xc54by64mmmambg4rzia6yjh5lwy65v3y1zor6va648qcxygkco1acw2az9fwrvteyipj0o0zluokl04uew1xxe4j7aeoei034a056vmzh8f30qezqta51mmpr13qetcch0cjy35wv32qyc1p5v0242xs37eslnnl6gcu7i0eb4eht2r7x6i2b1tvc1rdy56l7012s4279mqw6zl2oq98ajltv8uaxb2exs5d3gunmxlwjrtm6xqglspo9ka00a9jr1xfumn0hzu40bxf10f8394ntm82dgoqhx51d7p4cxyjfsyhdu8dngg10f7f0mo8nl07u81huzev0dkmhsolwqglbi2hmkcsb9lq815hh3eajsyxtjbixt8bfox0z21mkag4tk4w60b233ua59rmjlq2xunxq6sl5358946o2ra9wojuxms94c0sbdiwjskg4tosdq18b09ojpjz44hekdpkahddatoasvpzmag36ekh4qkp15ou43755g3dytq5t1n0p9meq17srdm05bunb23qibeof7xeycss3yxrgyepfp5ygb1e3yjvg2djhg0nk56rlhykqalhlg9znmhwwn22pcd87dkpmnurdt6znu6cdj9a7cmelbli0i2n2ydocsf7cbzxh2m4flskmlrtzwyc8ocfdd7pwpw5ddvw4tr6cj86jlz1ef5mzmenltu6wn65sndzqb5pezu0zcrlkbv3fgp2t7h90kjtlzssnhf3e1bxgb7rnz5hs94l1pgqtx85bm8eog8aak48agvo2svs5uqa4st640m3o79q7m0kdl1579y9lzwvy3owe807lbt87ks0k9ku4hdee1jf2zdlh52kugdxehecnxp08mwp02n914q0ze2ssbxxire4dinth8diz7ye1z6kraisrs6k1vqnt6rrwppa0qt6bqgin5i7bzd3hkzzyq4weme1u5t07kaet5j9kifh9mld9k9zcezu277km6tfrhumflvftim',
                proxyHost: '05nxopaoyo0atsw7evfy322cqtrnljotjujcu5smqjtzeqobb92xqzlksoep',
                proxyPort: 1066506796,
                destination: 'uxt8kbbe4zlehequ2y1phrdtrwc4xspdhbpc3bsq60st1r5po87k5td0fqygl8thgis3ggwvr9ylyvk3wkfn99ccgsir56d4x5f5iabxjbxif63tjknet1yj6x1ovg6n956vb29jhny1q3cgsiflia3m8mzoqth4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0qmdkop5btqsbq8o4ndn7ro7vjmf9tg5hws1petd5y8um3wntbimxodl6o23hp5v0472r2jpmiiawvkh87fvhak8dqtt1xg93a0zltqjxwbgcz72r09dfh52jy71coxyxlbpf53vn26ltsnyw2rarwhyl80fhxa1',
                responsibleUserAccountName: '3sz50nya62zyc1ojk3i0',
                lastChangeUserAccount: '135ncmrdmigxaa820ncv',
                lastChangedAt: '2020-10-16 01:24:55',
                riInterfaceName: 'exro92hsffqxs3r5ygd1a2tu1z80dojyamkwbk1i3p11h3wj0r2a0ybb437j7kzqin5auki41lezmwfvvunhjgxln0twpcqyukq2b4kg8ut7jp80j4n5ew97dal3w44s13i7sd7lcw10uay1g7i2h1j79cn2cxpv',
                riInterfaceNamespace: '089kdcvtue916naomvitci5k68tsza6j4kxwbvcr8j3ytavigcrew4t4sl9trkzbb04nt3txd5nwkckfe4dja7wd3gaj0nbdc1ba7iqtm713iyn36tp3n2tos79999pk93yixgn3rkpzynlh05x0kvxsajs9wqiu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'r6ggk9deda8o7d6lz9d44wrrql1scmkdr6mucx77',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: '5iajdetao2jiz6rxqz896jfh0o9fixtvsarxopnij9f124rpxl',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '0koai2in0gz5r8poelk7',
                party: 'jiyux9q83px6zh3s3jfoq40oc2lw4ylwwcxq1sz551be5xcmbpug3br1dzuhqwqcogs3sogt6svsntml14scqv76kgisb5cabqplid9y3193chg7irvtqinh5y96616jlje4znzcg3tc8g1idwmi5nu8rbu5r2dw',
                component: '4v4tmfndsvekjqs9w5ippfinuyl259nxy6yg459qhg6hg0cx8wncycn7tw0ktsghmqwi3rfegxh206ihu38m9gv2cbgrn1x4kv4lu53aylf2rxkedu1p0wsm4t0jvp2krzi7lxjfe8l99bu54j450lhvfaog2wku',
                name: 'mrrfo9vcbsmetmfbsamgatzs05tbw83wzxt5mnqcnnco1xl30pqfwb4pg9dq57e2jnm83de0j6laa9kv3roe251dgpu31f0559qy8igfk00lppkd1u6knco52ae8wqt4loleznbh3f95p306ya084628e1ps02zm',
                flowHash: 'uebdsd4gbtec3kfbhdhkt01n153qtcnuw7052e28',
                flowParty: 'eho5e2v9x39mbpzz1o0whvsyip0hf6eep1aq4cex636a6t2xjydoqux4iykz1dsmk1wrm0j9ra1jgl6401tjv629u3bgl8nmj9nrfgbgkz5ilqgac3kqmb7fldvhu844aklgrtutk7qfw9mhzx2nitoze20ix7z7',
                flowReceiverParty: '24uofhyy9hdc617bfrm3q80bur4g0wnmeb1nqjh0bzom45lcbmb6s6in5wods3md0sh8a5elfziyf12awtesamkuqkouwidi9y7do2wdlpbliwaavmro3p1rc470o6wbdq2pnfwuzrwzfjpomy92y5cn51iad433',
                flowComponent: 'bifnvp6enviakqjmwmw2uwnggv7cmrblwou96rg9yg4h84xi6kx3vpbdjkqqvd94rc3el08ni3wbq1ey1igbp2uqjmr7cnihnn7zhjpdue1sgsmbbsuauohcfg0ie2aozw86ellrjsw2r0ixwdc3vn89im2o3nn9',
                flowReceiverComponent: '5ikqpnosblugfycwiz8hj3o36n2g9d8t8wmts12egncmtmaf4hwo6zapx0lfl4j15ifl96k3lfyteyovx96oh2ulgpwvlqjqw9yllvzngnxkp5vx70myanpfpxacws6op4r8pajteqyr6lnukzeetomzhrj3esy9',
                flowInterfaceName: 'pyt56u559ja1r6b1hfjp2lup43trpbffmhcphcqgw7fjba8qdwwduzcn3hc4obqt2d7l6fgd20uoaijg6fkgzrs90g76bsi5qqqu3eyvh92dll37bkj8j8i59c2n4p47xteqglh27y054dt79yeyzbi7lxsrckzz',
                flowInterfaceNamespace: 'snmkxe46noxmmv9bkd3ielp43e9o95251x9e61prwgd1jp4m8a2ymkcr0gubgl8xabrcyqeury1cptuj2t035hsb2c2ihgfntd3t5zyrplpa7vdnbqy2svmxp3kziafu4wnkf88qy4qvramll2ghao6hlcwptguo',
                version: 'sacc40lgwvyxmju9z2c0',
                adapterType: 'c9o99vqddp0s004r0uxgxl1gvilocmyb1nclr3r7zozzvpscoqmw4y0egttd',
                direction: 'SENDER',
                transportProtocol: 'xq4i0zvv6jl8miy8x28q1vddd4ax1uf8hi7gatkiud6gyznxtsmco9gam7nl',
                messageProtocol: 'bb9uxt7ubzpujq35m4iihlkquw7bf8urav4hzjgf7cr2tw5l7shqaa9xffde',
                adapterEngineName: 'u6xxbkoi6jgtys093yl39tvnem3eb8lxu8lguw3w3q793q520lt7v3ely5xj1mq15zqhfng96im30kjmg3q13akp3bsxca6x35uaci7003q5tm9zc94j4jz2pi0kqbzd19uoyj5pgygivg2el7e2nw9lzyxcyose',
                url: 'gwqrq124d39o05ntdnrunruxg653fbglocyjz4ewyb2chlbvj15ydq9nlm0mr1k3tqlu2e1pvm61sjbjlqz96sbc9dlohzhsm5dcbnetsxlmkutwyfqyyw1djxvlngyaq69n8yylpqcqssq3racc0883qhuogdxxezi8yv1k35m1tduyezni85uo9socb7mmy62o2jluhpxv7l4zpkhe23ccic4zgg3dal3ylqyn47jwvc7e41up73l8ria2xg1tpzqqvjtcxps82zbwa8aoc9vyb5w1m0ymaoq4lr45egxdgb38fgjyc75l7seuzcln',
                username: 't0r21gkt0wpxqcr6z5e4opgqznu3riw42pf9cg06z3n25x0w6nkwbkxwhh56',
                remoteHost: '2cxf6k325rk2l1bg677z7mw325ymaxpfdctw8hqrr8tshtisgk70t2jd9ltt79dbtqokhcshrqkbf68oqrqohw85r2a25yjabhb8aosxkcvqebz3ktkqnou5508ikgorjc76ogfptyz0bxmonxhdolxvcfst141x',
                remotePort: 62012284520,
                directory: 'lspdmwu9et1o88uyk4pi1xm6759917vkzhl81k3mjicv2t64hjdqngdunoz86wbgh746buo5wzl526k8hcy5du8irot0d4f0bmzixono2ykcwhml9hha7247by8obs5is18xlqsh8yt5t9c3nhcgbawxtl7msvs1r6optocgtwogcz2y5nhhc2t8azv8acrs8gew49tu1zpmlbih8alhm01uz1zukngchvjsemxre4ejufkddl2r365wtzh030mzsc11p2iwb8o3uwinzd6i6bi33ea72veakopre67rlefo2w8rls0wfhiua1uqasghqkv4jrvclirma5h5yc942gsw6wnsdwr312etgenqsfev2aguhga65zttg1uslqiz0j2np6w6mmm4w0b1q1shw1u2y86pz8wzm1hga00v9hek9docs0g3kaqddrcxaapypwjhgwealbpnzfsqi01zwel516q8bz7qcpysef8epx0137kob0rfov6l68ih81ox9tkpcv9av3kffpiq7wcadjvj7xubtqh87dmkqip6zh4ibaejit4vtrmx0bszva2uayg1u76div6o1l9wh733s3t5srne9ajz4qccm46q99583rtwr2wf3bwi9f62564i4hjj21oceq4pads32yrhlsabpu0jqmiwg6206t20z11s93ctjczny7sfepnuy2qb0ch5mpeu62gs1e96min0ky5bitwndffuma6ezfd0sooe36neqnajiwqa9xrqb68nx6nlvknzmqqgcr66j9zzcus7lqj30cmxydx49rz9x6nd8vdyf1gzj8fai991ch3zccdifpis1o9ekug7tvx03y9dxwd4esfp2bnl90ofes0vmw8rrkhqox4zs3pk2ypgz5isklttyj9tmsymji6gvinwwwpd7wb6xrhe362m4dd5sldelooc4of2tp4tbsi4rz2mpj5xm247q2ishyoxk719mu6cvf130zcyr9aev82qir9q2kunlb5gkmot90f7',
                fileSchema: 'ke2ww3op1xl9qc7gqix15hpasq5zg2v6yeltrojywmxn4v873vctf90j7wase5pf329lelyfv78aouxjxcljfv7pw70fjblacmzt3f29tzpmpqupzkeu39mi20ca0j006n2at4clctq9mqz8db10isfzgbuo6hcrfptww8ifa1vaawudb7ihkc828apq27bm3657cajp112dv47vpu94xyq7m8femmj0xy4ekq2s41a5b8qetg2lc42tmi22rwcoaycpqgbvw6db07n6tjk55lgk7tt9whwba65m6uj17dq7taavlci72skzrrxuoklarqewty9p1g4mf6dcopxs6mgim0trg8ozfp2bqau1l9bytpx940ait2i8cum16yg69nhf6z07wzygoefpnv69aowuoq3i7hwjmxin8kshb2hxy537i51674gtmb3sfabd3uqyjcbkyb4ni8siqwo4ry36d1ubcj8xmzh1f0r2tjog6fo5a5alfecgo4u6nemra8ev89zeezr4hfznfcwtt5079bntc0yfk70dzovpv6puh9bnin9360mhjrn5lxxy9mykdg0tt4b3ml2pf1kgy1325xkxi1cwakucb2ilf69wrf2nrpbjaswra6verl0a12j362spsh0xd0xey43iul8r9e7b5s8b2zpdy7h8ua84vpku38dgxlh822hh7zobzn4eoiewcgt37gp7c5s5axmlh2yqam4bnqwl8ukkk8dn57gsqhmgf9scrsfp372q3uakmjh64wz684trl03q8y03xa0hpdgmfqor28pn4d25m14pzrwc1o9jy1ehdtz6y23fjtjg0nmowxoria3jy7i9n7hvuhatwvrgmggya0hnfok4t1z5moap7bg8ainofhh56c2l6fz8t2iwc13dbmqmallvzp5p3fyqir5mcd51j08sl4jpj135ok6gmtw76x1ywxiemer6cajiuo9908io8cvt1hvxb9euu3ulu50ntbkufikslwb8g2utq3b1',
                proxyHost: 'oy85bp5iaprodj4ynn1fzk14aggjplvy1aigdaj08bvvb23cmzeuwuenpqn6',
                proxyPort: 4523726784,
                destination: 'y6vc5oqnc88yk4vqy3u9fe3va9tn2ysinson1nac7mt07n9c1xata89exbb5tpy0ngwqgxeu299t6yzsxrbr884fon49wtrt7piu2r7h3wvjz4jaebvh448ptu12z5jfsi9d20fnjdih91czhichmv695qd3q65n',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'khisypcdmwhkgryjqht65h9lf3cf617djfue6kacmr80rx55t9z2kjylxvsq071a8ui6yka643aruxvbxfmbw1cu03h41mmcw91059y0t8f4kj5fntpk34c7u124ux9trh074tft2k41q8mmbvl945cex8i94kug',
                responsibleUserAccountName: 'h8lqym10wa01mptq5hya',
                lastChangeUserAccount: 'oebuxy7gs9ca9r2xapps',
                lastChangedAt: '2020-10-16 09:46:37',
                riInterfaceName: '79dq2aekzct3hq8slg3x09no7e59fxfzmn0hmxs1eev17omvotbtfow5z5lky7kfl1ta8me5geeyvabn479bv8hrvg1f6bm1hf9mahywwrefsg542ewp1dopfp7yfu7a06mo2vb8hlhmucnlolvzxp5jku78vl58',
                riInterfaceNamespace: 'yxs1v78useryttlksw8qlo291u3poldfait78t1kmmiapw4klvm2bfkqgrjql40h04g7585f1t4xiv5ss0hzg8o13c8botsdi2l853t0afb8gy8nc3rr4mnq7cjcb05ts0hhvqrqvdyvsz75nb3mdyjnsysgtu6e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'u1rp2huiohtz8ipr9l6rodaccatung8bcbvjhic8',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'js0jk5iirlskm2phfjvru123a7gppc3xaht4bki7283yaxshff',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'q7vl213tquo1ilnubjlx',
                party: 'onmluahv349z5aij2cff4ye6k1zqbgm79ray6en7i86fm6g5ux2n7f6ak8kog7fo9cedxeetrwm5gybkbcoblhz1981l50k2vuygy25km0ce7xcuafepkw9zfsoosjcxfl3w0mgucxnwb55oxeews8xpidpvlpxw',
                component: 'd2b0a0skxt97gh04gpss177s8k92q8y3tje7krwsotq99o4hgqtq9jiawg730i42kno7gaemac8oymbht867zmcuym3f8cdvdvvfcukl4p2w4x5hocxyebgghiusl3cig9jv017z2tr2ov8a5plmtl6ka3bljzyr',
                name: 'faxadz7dsdszukvmvp3e7x31yyv1plrrhh1k4auahnaa3fz3tiroi1l4ixo64ak7t58zf9pc6aa2h66296fjkk4x2nksxwj0f0d2k7pr0jx9nzjx9jvkb3kfwpu5ld4hbgw5m5q5m79blmh6b2ge2e4p41tpvzel',
                flowHash: '3jn1bdiys5tmdq5g6h2p4puxc65r4uctv64vhmtl',
                flowParty: 'g343zu9rertirmyq1lohno1yzmiilybnlqhj5t9gyk70h39neb8z7871s07r4zl31wqyx3wz6o49ysyzku4uskjcow5bboaak5qh9pik1pp2rvfqu8ihihenj146jdms5bzyx0d3jbf8yqjve8104kal7d0t6fuo',
                flowReceiverParty: '725jy7575n11eno82xlfn14dczidci8evr8zucbm3oqmizir67yx38m3ydv8kujx1emrnq4y00lgle35z1josylewkxpaftmd3dfcytnqpuvgw9hqfdrhxhqy0p6rudhj551lh9va4fybyu7d5oe277mnmhk5mgx',
                flowComponent: 'v9kn4vpjppese1e54licndwhj0a97iiwtq1izxaruwydaj4p31m5ks1ybxlz3jjxb56badcliz4cx9bndgiwdkqhptzubsos99n5kyc1aueyiabtihx2m5rwcny9g6b1r28hlx9lmx0cy4hluon8bomtbcwdze1s',
                flowReceiverComponent: 'vm5zslfbsmqv64beepx6dey1hqsheoe8nnzb7vj0nnahhoyjylrnjo1lnpky338v9b5arlizo7gpwl2z16xnnd1g3docn49tcb57nuhk9fr92kd9guu72e5oiywqeta2fqnjoz71stqk3r4zk62jzaoc2lihe5l9',
                flowInterfaceName: 'djyu55rau3va59tjd9v55x1jh0x8brx98qvjbi7378txe1gyvdn7zqvnqxc7o62ag632nse7g0ymw0u0al1o29vffwx6sthofu9y24v7gtf57vqmxs0a4ic30gd8maemt4u4mwek0nf422i5i6q6hc78g0ncwjrl',
                flowInterfaceNamespace: 'ygrzhjhtrehm4wmo3e5jx6hi83c86tor6cfomlarvt1rifdictvhbyi1r6i9enhycid4y9ihddgc4kl5v18v23tyc6x7xmt98qoxwkfbcmqbfryo6bait4r5non7cgazs4e5ct92ivhdko3vsmesrjaybbzwase3',
                version: 'm2qtj14bidrnkrbjc8z5',
                adapterType: 'ay3zhs72gv0kldv5xennhloxrhqv9wh5ewex11i61d4csm7jhrmf913p45hv',
                direction: 'SENDER',
                transportProtocol: 'c15bpylrzv3tehuujddkodik48rf1q2rjou4h5pxfmvkvjilpjv9v3g22uqr',
                messageProtocol: 'p7ht5cncgnfupsrrodfhcwn3jhfmqc9ahh058x2roohszqr5yz511hcud6o0',
                adapterEngineName: '1ixckqobl6c5huikuhduveahi2blkchdethegpp4802bek7vkf71qkamoonj98h7xsi2iszdrx6c0yugsj1al48nfy971yg93m7xn9nuc25h4k6ie8r3vkxyvvntju3ywp1xmcs8thwqkxhetqwyic2mcolhbiqq',
                url: '885s7u3r0j5dok2st0qi52knhmuq2lglx8yno5yq6c9an4cm6lxn7z8vyjjh795avqfubq3smkczq9650e5lsfb9wymurffy79nnczbnhv0atdjhu9alyxntcigqf8dux91ig9q6jf6jzo7j3cv8o1tsikderwxrrd6uu2ijvmjt1gfv79me5bh10aroqhvo4gyyuolwjci6cb8qzvmml8r6e43ttvrd9syj7ae9ixqt6cabpqapwpfd7yzfn5amjeqm2cq5pnspkb3kl6mfxoaa2fus5bi8zfmm4ol3jrt7qx3wvy3n093512xz7cr3',
                username: '7qrtpyihxpqycpmjpw4kvka7xy7ipvr4o74gu61c398efv6e6lkpbuj38o50',
                remoteHost: '3zxu6moflut4oeyxepoe0ylo8zlqinz4rl7uq7tucn6vbbyc1e3ssokat3gbdjo6n8lfw89ljxj06h25zqg5g50tftzq8la5s8av7muppee8zhk0ar0turktbq0sjycxgl9derypbvq9ou40vsa68nuyjmk4sdds',
                remotePort: 6756466478,
                directory: 'o0ob2yh52vmzao2dkft178ms6owxuv7l0sekt2c36ddou4j4bzrxukimu1rq0sw16hf672aczspzsihg8kecpbebfxsm33159r42fc2rgbzwikigu7qdn9clr1m8bkq9170zhfu3qak5x0z1nqvvj6teu9j06ejm73bly9pvaelbwp3qodnrv9ejcewjaw8abuuerl3h9zw1laj5ekliqks08dah20o2ykcp04pm5xbbesmrfssvlgsm9jq6p3wjhg7p8lh3eo6v2thsi1zyz8zky4k7zx262eycwzgttnayjhny0oyzdvkn819e6f6ibzo0bi3b1rj2v6j9hnfpddqer6xe73vqbp6pkmx5t89yj8q0cqppgpwodovsej4sn845zlzlb73mqcx22awgxd9um2u3qks3mqhxzrzxl0g2unswv7e7tgl80x5fiadygrewgy601zukv9btbzxqlyvfxgehajmecel2ejyu10v9hjt1gezxiu2ds7fuofwui8dfpgfa602tsxlvwzo6hf1t4l4cr852tz2kc69lmgct5uckdmoarcyppjqchpm54eb6uzbc7td93f0pap5a7v4dx3fh19o1c5nahc9opnk746ucgvgnuz9lifb2b3yrw57dfukk6z2nupec5mwgs9cba54rex3qoh9kc890sczde5rr4e2aytlt2zp0jnuh3j5c6a71exnqfs8a76hieba1l99loszbgi50ovc2pr1tguaq9jk8syiw8jelafsyqzrv0yd6p1s540xsylpmhulpsypey0nat8tnvaiovrsantx2w3a98ro2mxk9bef5s12j7hdwbqhpi4m307hbr2vat02510auikqk5d17jvgcuuzlee6ahytsd63e4yx4o82q6fz67x6vwp09ryc0ufojvzedvtumjt0uzwo1s2qgsbe5eop9hs4j4o6zlz8cqndzp77sypqd3gf3baj0sl50kdnuqfaeq8468lw9hleju1jc87tj7ubfcsnc0982f',
                fileSchema: 's8w5row1h7hlx9xo5iy6z4mrq4ubi2odyzzbbbtnhmn64xd3kkellb11mvw0hn3u40k90unbxmpcnd5b6efjmw9imqvammx8fm5pjs6hjgawohipc4kcd5g9cyakmqq9e9vkui5x6ss4zfqa007ujutzsj90qdku2okben30gz9dsudticvbysrxendj8m3a0zg2w4v9w1ss7lxg3ct65u9uo1iox7s0gdnb0j05f0u6hjidzf5w2c1vds7il85hqr4hi29weo07ykom1tp2d2gqnrwee15jrhbstsh7xlsq6m9uu7thwqe5dtlcqokrwrn8os7q37xrubgqwfcctmsmcpzy24uev70yocf91pzl2jkeikqkka5oykp9ymsjmh0ab2m2wfk5zm7h79h6ewotuoi9lc24jyfgvt1299kpuprb86pkxu58j6g0ipcg7mn8brye4zl5u47h2isgtdnnqm9qxbggy15uh2mtu4ofhrlbv62wmz367wrflu3iugwjyuyg0ucdkoralo8mdp91fk0homdnpv8jqst6yxbo155jg8mky4sqvcxar2d6te95w54ezsds1fvbose4rfbh56my4hd2bee0c0c43nki7qu6v3vjbpg7seqeehewdrikstlagjcdco1hmhg61rg29mr6i0xr3ru51ex8y4k5tokwawep3unbjzx0aiw7nbk0we8b065qq7lkhycjs1aam99nqu54svtp190lrvx6gc7saqhnv8zq46bjqi6irzr5ak2y9c8qsuftfa5npvs85o5yfvn2s3qx5nas2o0q8f14kesthaekkiroihmfvagh27858vrqfmbtabz0mt6byjr9yozjzf8wpv46s1b35qa21sfu9oadedl1l4fk9eb2g2wd9fc5v5s6q1vywi5nrh5o24kfyoumhc7m204xyx1rbfln1vuvkhcxm0eca3r2bbwhvq5r64kgngo59bb9krqu4zbso5906dikmbnmpboz0i4ua2breen7lxc9',
                proxyHost: 't61hzvdnukufiy2nrrc47sa9twgs30liv3u2j2eg1iu0sye5yd1fq8oda0fo',
                proxyPort: 1488925592,
                destination: 'l3u99lmjg3a6o2rd34zi4ajfv32mkfh9go51fxgagc6bax7il0n8rge714e451bz0nzo435cuccptac1fm1s39rq6izigow8o28allq1o0g30ta4gji46f8d1qxga6me95iqpywe6xb3ff421f55rid2su87c502',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3gs740rs1vln29712a68zlmnbr3bbhfp14q2fz2j6y9ej1sgt7gfez0zi21m4m80mzs3890tvr4i5pwui3pz1mcg6fhydqjp6ob3doq5vsdprhopl6si1tr93ykt7mnkwlfu4i9ll6eizhuotdu3yoq6x6yemfv9',
                responsibleUserAccountName: 'c90qjdwaksycih5ar18u',
                lastChangeUserAccount: 'gxcoa4cmb60eqv8vpj1q',
                lastChangedAt: '2020-10-16 03:51:43',
                riInterfaceName: 'd51erxtnx69uhxj13eph66shkfcephv3063ym3flf230pt7vcx9qonrmi53zemsgdekku4qazk26e18rp2dbv13ug1ddnxq2umihl9rc0o744m8oa2tnt9fnkl5wgupq46pqqpy1zucogrhtlxrtyss47u631xho',
                riInterfaceNamespace: '6f5jhqkmw90p6ib9rcnjfujhfn0g8eclbxh6anbhke91tdy0cltejsugamsj2ptoprma5wij7mbonga6yyiwxho7ixl2krbphqnxbjh7f44bcb4zuowfkviuhwgqvcwkj4bc9aaju6xn4abcamvqsqgl7e4rgdno',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '1a44bah1qb6ye4fud0qh8f1fvab8w7k0nrmltktf',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: '0ypk99986t3zc1efapxcz2f416278le8rly8zsmz13rg2domhp',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'my44i720sgwgwqlww3fw',
                party: 'zlzv2gl6u4qvtmtbzgt9dqapkfylagznixugf80bsda8jii38or3qeha18sq3s3m6evcyxykjjjjzdkl5oxiugigjt95brqn7gks2cfj6a7ysi2bqvxyneki9xln2nc5wp4l4ds6yihcuysqktu3xpby84lgc0kx',
                component: 'z3pqady2ic278jpggj63ujazwede3wvpsqoxxormqt2tadts5pb58chxkoxmz39x1joji2cwk4dpxhysk8pinwss5h4j1147npv8p2dkmkri35nzjc11cpv2gbuo7inf3x1mkezubvj48f9s5w74dgx65rz3hz0o',
                name: '2e69d7pq41h7w5rx061nai29uly0xj7jsshfi679pzqa4jbydjmgww1a1t1w9t3c46xkv5lsm94o7emabx02zkshhfk3oeqqrw6cfzbkqnwkxqxh5igotbva3u9z8a3sk7x71at0d83cvk6opapmsikjg140w946',
                flowHash: 'rhvxbugsgy58cmcbbshnovxh79ycq69z991rsdml',
                flowParty: 'cdlz8va8humzralnn3jq8oizbdgt3aqcrru5lgwej43a5a3dvd8uessjy6vg2yjqfx203kmyoqt32lo31ax5hb2wvwt7fk7tm6dlnkoicd6pwm8ep4tyyqdizg0tf3duwtxf1nzg1wi2dd0j2vjh7la18tozq70x',
                flowReceiverParty: 'fz2cbe3pi9kx6qiwbfuuj4q5z79a9p38zrka7vmqu74hdnfmkxfy3azcr5s03fjuoa1oadervh3yidtrcytuoaj0h2vcd2m7vyefpdo8jjozyi6vpzlyu1eq8rjgk0emreaw8uu023jx1yeyprl8vgjf7h60ebxe',
                flowComponent: 'ne8stw8k3737z27ek0a3bz0rjs0xge2i23nn4r4ehzfm1cj6jmhxd4w2jyy9pxt0gt7da8kbmvfzsim0q5fxq57rvya6oa65pb8zc21a7t94hi0obr1lnaslsvtn440ndxqhzl9ur71ayiudm1bceulcs2ecbgkc',
                flowReceiverComponent: 'z91tooxhzt7j5v7k3dbzo8k3pzdhp0efg464afwjoicu9ad0kbptoy4v9cme3mapp0wmf5q6eyt2n7vg4m7g48cx21qxsblyot6plbn0rkg4yjod2jd6v3cc884yly03mxn289iurwxduh6nathwnjs0zs7wcphj',
                flowInterfaceName: 'h116v3du7pfkjouiqvz9c4j3g66vqzj20cdab85wr1alsjub3pis6cbihc3dxrzbgdear5bfq6srb9sb78a28wnfku1dt8x4rx9gqidkptp5db38jjd55teewmzjtep99e0z9smslhvut12d3wxxv87fmhoejk2n',
                flowInterfaceNamespace: 'bhwa4v55i5k6o71mnxgr6x6p9s58qtr6jceeu29navzg4en3ponh1clhn7erwspc024vcquzsnwq5lomvx0t2yvki4wxvag3rgulqolqji9dlflthf43u1wniir1m0h3emxf8u64gk2ohhbac8jmvtbasdd9pjpi',
                version: '198962eb618vg3r6eqn2',
                adapterType: '8oyjo9yq2na0v6i71rvm2qnv8utjcy7hj90qtchgwa0zbova4o9d1onqtm8i',
                direction: 'SENDER',
                transportProtocol: 'ae75v0qhmxw70c8odzkgs6ajtsz535ohkpxhd27v1orubh352ighmq7buab3',
                messageProtocol: 'uiv1273hb0cz932gb9bd9rz2tn9e4z2lnd91ypp1nqd87mgp8593tvc81rko',
                adapterEngineName: 'ml2v0v22h93gyffzzw3hscdh92kwsxeb4zulkqmimx9xn9dr1tg123ff3h8vjwfcm8uflsw3oxqyw9vs28z0gnq94v5p2oi0us5l5zsmbl1dnpwv18zimn5zt7g7535v29vuv5a0rudtnrfgczyfov5agna16run',
                url: '0zw63kjg1kwuvmk28f8pq2qrcju9hko2zbol03mcjkdncqws9w3hvp58qkdfzr86mu822ur7cpe4kngouvs13d65o2fg7jk19rx2889o4yrfi4rjvd3djuf1eb1s44s9fuexthpxypbls74inkpzzifk2zxrpxxfgsvox2ni4pjhewbnqau0pavvuvbe42hafph5wotjp0zrci3mmnq0sborecohgvc91ete6eq2b167ebfkf0anokxq7ryu4cffbofqr4azckef0d3xhngbiq7ufauptgdlbiqqlp1k3wb1206kpwpion262895g904',
                username: 'pvvnfkpgz7mx4to3jdof5txkzl39c968n6tj558kv79qa7ny8fri95ftpckw',
                remoteHost: 'jxm6y9jrferiwnnw17yrago201rww3uzlamy6he4hljyy87v0ipx3iw28p3ecy3uwyc2jd88m6hdvtdc1yh8rf887vcijs6jlewdhmxmzm0d8fy29dae5ymfwwgvu6hwnloa2h6a3iy132or2knv0wsajv1j4ea2',
                remotePort: 2624373450,
                directory: 'zfvuwlx1r8jd2gx4frq8szwl2gywytudepiu6bnj3lrhivt2hi5jkqoon1ez942u7ubwe217clty10mr9ccam6aobebz39zankaqggp96d5y6264xw6g535uf19th1641v6pt99n6qzqntsbepk6ylrzc2vbhjtkdd5awlj6yzbf7tgzad4worh3zf7advq63lkfz8ufsd8a5oys6nu7dzmg5bmjrpiknsj12lzeezazwkvj5p68wa5mok8eyqrgttcvwmiy6e66q2923wxb5yuqmgvixayiu8fgic5lmrfyaa80rqt3pdxlebs6smucllfqm59e581pam06c1mgkqarf9hox9tp4k2jjtgniqiy0gzv8nhi4eup5odz9es673h5qg0bbdcsyj14kt5l7mvz378mrvew40jdnlqmdajge09v6vdvpjrwcw2d8d4q0urhqxhfrzr9xpv4md9oceb2ji7tf5n71mn00d39gv1t2soaz8u8rb52f52aq166ri9mzlvykn1zubc95wszwcydrh72ycq16els6nki10a910mf92oq9lb3xye75ym0zkuw3if8bcgoahmrgei0phmflw1w2jsh2uknq88s2cuqo4zjwxfr3u0kean2mqtelz1s05ynmqh3bv41p948y0mjoqxf4nireinfpwgq3ai8ydexqyn5fzhobsnqmzwyhmy0duvzlcbqsndn1xb6l15xtpu4cnrnohj91rjohipe5iw0iezoyromrwqntqd8vqi4ux8gvcl8a2wfhnmrlkp9hdrb7obh8m8bz4i0bxbv9rvuxw6h6dh03nx5nx3qsus9xpl3fpsew652sd25t91keuz63nibmbnww9rs9liahlhs6xuvjbsf4whthy1x6833eh6h0z6j5uht8d7hvcjgs0et2i0bof0yyp2re5x7usmhq1o9j4whkd40x2cxw9y2agc332zoiqrcouaqihjvic5z89ifri78an3gwbr4e1eljb8s66atxpewvs27',
                fileSchema: 'hjbyp9kuj1qsuzdsrcsfgotw4m9xokh01a9368q8aejdtja6u7ildcebv8431cgd2xdn8hxo09kidmoggaun2hjaw6bvvz7r371awxlc29lrw45z4gkvhb5mo9hggq9sifboygmgvhoc6m3obn19mxf724la7c4uu93i92cu44zgl4cfkf3obdxo21zpc73l1pd0ctbha3fsb7b66qfcuxj5gr37fn0kxe6cq8xxe5v2r9jnv1may5qz3nla3pba3q9rr6v2ssok7xxrgdzx9ecxobka4tt2d8aj3yyzb5iy3s1de9v76oyjnm3glrqv226n036w9qt9opdacvlz2svnqsrx1lruu59h3n5hhsou54nbhdkehzq9rmcd31t3c90t8xofpdmfpcyten320zn5lrdz9l1cj6em2u2yow7vemjrswgd90b8p2at0jeonwpwl76suchmpr3if9j0tmo2jb08srt6dpm8c4ilbmc63q07r1mamcwhjomqljc904898h1oru8bclb73v1kum9m42os5tgvhueurob6r5h8n2w2x9lzlnu2s6tipz8m30sjaif3jg6otygaod6c9zjv1s9vibbuq39jh819in0ucas3mkzku72x44v0r5c3bfv1u92o2ug0gfii672pdgzl29epjfmsk1e7oce1wg4iyrzy2lxojf2p33t0xovx0chctvb4q8qrjc8ad3ob61m8gch42yz8b4ohl4znbjbo4r5fbq8vld1hb9mmwuwqakwbp7s76l1h0y0v4cniufytkpz46wbc2ho8928rgog08s8uz815qahypv7r288lxi3llt5i1egpqnp6lio96bif3q6a1jt4z11dnvsadf94ql2nei5fs7v1cyyhgr2p68nm1pccfsld0f5afta8na1qtk5xmu7a1ehkohp9o7nehm1w3tslt1t2pgeynhbaa76gpsf5m7u2bviq5jjdq5jcc45non4kt5o1np4lgjcealbgth8ev9il116dc68g5',
                proxyHost: 'o6bpzzdtedn78rveyx8k42g2ajl34lmkhfl3lwe8nohpv6sxoj5kbnb975u9',
                proxyPort: 5469955641,
                destination: '0qwpbk0w3yj260o9t9w3e0ktg5cxtohsd2nruhe1640pg845st69otx3m79ojqq7gwkku50jwwc59to6im2p02xahm8xrt9it1iceyrajhrc0chkuczjpjybsihsd83d1wgur5osk58m7ekefieo1f11qxtj4msr',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ud7uvddt3hat7im3zj5aaxs1qe63sc9160zhpr3bltj8ibyly3kwq5mwla6qz79zf2fck6u5t64dst0b7z4qiil1duhrjgfa9t4s96q5hchzlq71yqbu0jq11znv07g0hhn5adygbhs5m8vff9zjw0sagqoyvnhd',
                responsibleUserAccountName: 'sr02vrh5o1jxs30pnfk3',
                lastChangeUserAccount: 'xc9nhbt3nf63wfcub7ra',
                lastChangedAt: '2020-10-16 00:43:20',
                riInterfaceName: '48dylqyglo9jxo3xpah97dng9aoeg39zjo80ezi1ehlkdgfjjxra74jtasdwj2n5m09tl01hpl5u188isl6ff6ubvxt8h0no23wqcp056i7yn23kscen4z8h1acs0h16nppo5bujl6pxekhjlqplsrglamkl1trw',
                riInterfaceNamespace: 'u4xjmpgp9mkxqqr3y940y09n56ck3iwo3czfb85up09m1sekh4zyrxpgqlmngcno54uyj36jwpu30e9ik9m3t43w8a1n9fy8lj6m5agf6ko6ymgspl318vtu7zig0i05loua071chob0b73o52imfhjdby6tvx47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '7l5d2k56jroyvdcq2savu76n3f2m63a2vq98ui94',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: '96qq1gotc062nnjq0nj0b6rtd0djg0fzckmrmcectvpf7qt5n2',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'vfe5yacl68o39w2k4rg7',
                party: 'yyej8apgslb1rv0x3j3grfys2t6zql2jja3kimz7x0nl8dr58z580oibg3t4h7ce84ambsagvbw07dcdeip84ywnuzgbuqy54h8bigyq018xnpt5jyq8pljnb4gbclywycgqll5vpv9oor4z08uthr4zbyut6914',
                component: 'wqir3nzh494xh11qlde60duh6npkt1i5dcn0mt9y04cp523wjl1wl8x758gfdlvnwn2vsoohvdlx328xy2at6byq8s6zpq7uffusvm2v5e1fttzsy4f73o3lt1h44oeesndvlkbh9f3k530m11ab4sui1hf393p5',
                name: 'c835txnlxwhao68zdildf9r46wi8wou7o1ttyob85lb135sa5tv7prsjydmpt8d54trx3ggvcxkx983772latb1vjmxl8lzefiu5umpbbpkfqu10w3d0mmdn7za2t7u49jky53hhuzwuc73975kkgu2uubihka0m',
                flowHash: '7fwfao9q6xtaus99clwuv40ygn7o8lkr6kn1f7xe',
                flowParty: 'f2izxgnm24dztw4oka2kjgla0c7ft4ixpkaejxzz778pf891yvz25amzguxxq0zfh5c4h0l0c4hnndxhjth1yfpow4j8640jc2zxa37g89u7zktkcmm9zflcg1u2a3vkw1oveg6spo13qbfuohdqyj8dbh5lzw7y',
                flowReceiverParty: 'kr3rre620guknxub9g4njvyrioa0lnaahhxyj6kfn319tqaghlcf0pe86mrompjmq9jgflwt582oypgtp91s03o4f4em14sg2ihjbq0dkbcdlt9chlfb2s5dkifddfm0b248mls32x7o7d8khgv9sajvamh5b0gu',
                flowComponent: 'qzhpbp1x3xtkma172ockqmp835867riip11y6hnf8rs9l6evg89mli6yhlagsw98z6bz3ayxqdkan0kj1gh1bnq87pjevlq9850d5eff79map3lj63an2otw6ilq8jer6rdmk2kko4h6efx48t9c2ibeq4gmmhen',
                flowReceiverComponent: 'vcuc48en3goe5er0h1ue1clrsp7ggf4hq11txy3xh2eax6jqoe2og7dtizy5pzp4m2jskdou4yvzjw55mw2ajqvq8ke3twjpqbrdk1xbobh6l8e2gmde2fwscjymgeud06ut8v67grytqclrx2yegfb626rtp73z',
                flowInterfaceName: 'ivlye0e3owxrfmng4trp9riup33pdcuk0bk00b995qena4cgbl6p6qiuuim4uifx4m1c4jgsb6mn00bywic9qzcqs5f5bo1aon1rymggus1i4ndcvwt336nvvvfeovvk9lnb1nkqpfz9si0nd22drif94783ob0t',
                flowInterfaceNamespace: 'tmm3rlru8rj898ocjba8qr3uml4phd8l128fedp8jl9u182fj25j171mkv4vbsykf9nb6r28bzheyzkg9bsnc42e0a0re573k4zf1776cp5scr4rmhxnjhpvwmsc2j5dy78ukui0w1xgwqw5qoppiggz79o4a4f5',
                version: '9owhdb8olqciuyxtnlw5',
                adapterType: '1fv46ldhy02i9b257uggvg73uf9t6x9k7hvuuji9zsksln2zqotc2x4b3295',
                direction: 'SENDER',
                transportProtocol: 'gz1afzkd68pzifc9qgk845f5mzlmlble51fs3dfjfjuc1bdjutm415f9tgbl',
                messageProtocol: 's14sxu37d14a7t481oelt20q8qcn92teca7m9h9refq7yoiwubc1m5km33ni',
                adapterEngineName: 'wufe810i9vbfe5a0etqimk8d5swq91e57ey9x4udghhdywv1x5emujfkoxh2cao1kcdtmnfjfsn0mec2d7uxew2ljh49wgrwipk7imxpty2ig6bjog1d3ayqwtopsvlc2k7r6xbr1e0v1wkcxu3664ucygzfztoa',
                url: 'o4k8a40iukyteiqk0ji8rpuebqr9vcrz0r505kvpgtvoj5pqyp8dvpzl9pc339q3coa99wp5pg3h5z0mhvrsc0o7qk5osj0kilan0ob2x4fz9v9ev72k9nfvjd7a9ku8w3yl40b41z4x5ag9v53vy9vhrsbviafuip6kr5zr4bf7xg94uw3dj33l6xrkda7o8hb3gowwaahxkgt83uzdyd9b4npbs8vzw1tn3tp21zrfcxc8oh1m2qcaef9zf8oq6pr42v6qrx0e4ryhommi17ow2akyniup46ayj6prlx4ooptmpz82b9cd2bt92p5m',
                username: 'ggr7n4qn1zwos77i2hj9y9zfrnbm3fcigoxd4pqj8l353kh7dlyfw3fx79qh',
                remoteHost: '6cizyupwjmfa3b4799g10mjby5ance0l5028mbcf1x49011xr2khjn3860scnzeg8vm8qcrqx4o4paeisv5061kzgpjm9gvsoemsuzp6j6fc1fsfqifqg89e5vamc2dx7t44j0bgq26a0wrhtwpg0t248msufkur',
                remotePort: 5019945377,
                directory: 'hq7dt2rfmqjedm5a2ctarki0vhzzdm9v1r9ckszri777nwy9w87563kv3d6d3ydo7kpozqbi0q9230tcau6fnu4ypvmuk74woi1l3fytthkflt5rwzy6nl5473rj5frv0pz07a6vofu0751bqdo94btfglq3p85z72roikalh9adfml9fjitruosn14qxxkoposausno77wfwoltsjfztxkbwqklqiuig5iko2ruj4byp9aylio5air2tluyawksx1k4p68x9euorr3hzvi7ltske9d4hk72zkq4l0xb6p3ackcvzj8l31rc6db3ctnpxwafw31qxprcq2dmuwxjpmnbpw72hrc7qdqwiktyz1e99f84lzcu2cohqkg9kl605dasr5y9dhcgjt5x8r2q40vtfjntd4m5am5ka4x5f7qsg9u07hi79rmvjlnt1v1x3vomfzns6i275yyzfqwg6j3iplnvu0ey7k6cf5vawur7gnyq1jj2y6kycdyabeje7j8gg5uewhg0sj3l3mvc7x1tpkn9qbe8qukvg7jf7du7b02vtxw7zgw99mm5l630v7zcgplan4cxabte4uhfqi1whvjt16d8jqksz22cfwyi9godg4uw5yjtsufn99qrlvipya0ncha9x26rcov2aveitj9gslp7aeooryfy27ii1hd4kmb2txzasm4ctq53y2soea3diaka1rhybw9r31stekf4gw74oqzv0sxpu71o6gnsquro0w0obhg1hn9tpc1cl0nercw0d04pbambkq74m4aryjf32krka1ds5fe03k3fgthbf2xsi6utxnlsbrmnyzeomrivxbxnzmcsq57xe7grwybtey31g1qax1ns5hxublg6rxjaol4tao7dpdj046dvrocrptiqle23cpmkfz9wrcoi3hxvu0y42u4ie7em2hjl5xcq4vd523nucm2dl57zl92llv2j07vjmxl7i84jln656nm61pfa3hek0yn7gpgibaq9g1jp4vbk',
                fileSchema: 'kh7sd2fwmc08gal2edf1s19xbuoc727mayu7ly0q42jzhieges7vglvbnxgta92amz3tu8cugf4cv4alf35r3dprslc1zu258gsvglzxysj6wb27f5py0ncfgbj0e226yeku4t06nkvvnwxesipu10tqlh0guoodfc4el1sqr4g0ntzb8tudxdmx84oaulcw4gdreyp1sau6sp9h3ph3antw7ms1e919v3ztod2zi9lh1i3nguuyfb8in9s0qaxw4ivjz9j0wqoyadylrk3o4fcnxkc70lp9nihcmqeox5c3w9goxwrdu75bzpik2t7oqdl887l1k1cvj76eb3vy3ph0a0sblq24vf8wx3ke8beqj8ot03bimebh3gnwvt521l73edyvefz47l1m3dvqv3tk0960zm7egz67sbhlb3lgdoxox46cma6s2kg5if7jr038t5jtwlaohsduynzzqxdoxalhvkgyisl2tprociz1hn19lt2xqt2mvzdrif9gvqmmn0ke0o0leda8a11vp80u06j6aojgbsnxlcrz56mjkdkh6qy8zhkl7fm24wxum6hosmwewhu50y34aepnkdaluk8bysdik5wpvchx3ul8v4s1w2k70mgabce08hnorz82cyeb0n08o8f1gdynjn2o2hnlajest66oiph05cot6c84192qqyepzg4hzjramecgaxky9az53ko8n06dkz4tq7r2tu5y40l8z1rwkepffix9n00j42ovvp5zk0zxqsv2fm54cnkt6fbcju4ro9u1j1j1kqfiahgpx6rz7xtm0qbqorvxejr53nyxukr76k6gpo29gnka9qqn9or4i2tcv3tpbhyj9xdwzw3oaj7sbol56nlcvskvc7tpqgzsj54kfnbe65wiotltusjryj8hx2n2nca6gnsujnj4pdp0sbl28p0n9cstkowimxrpg1gwc6s0a9lxwu0fygjr0irgxk6thcc6idw6c3f6eegqyxstdn8n7l943hv3efrv',
                proxyHost: 'm21atba394q3v4itw4mijqco8zpd62dh2el2tj8t0sbb4zmz562zo4i9v8rqg',
                proxyPort: 8310827762,
                destination: 'fwvfp28ftobqyk3xwbnnddo55y5ttuq6v5nbb7ru6ojc9mlhvbr0oh5gtwsvagkzumyp08dmcjdainoktdrm1ca5ld88hjl4mea38culi9qziecob52j3mg9b5ixvhohybrg03ope2fog128i5ih3p95bcbr5p93',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0irfri4086jqxui6u5wd0tlrbq0kn5do4ruvevnaewavbkbx5raa2y4yeni93dvudb1gtse4khb88db1eq8mj5n11lcx5wvvsl3mutjktclfu2r6h6ggphlvrxgw0chmcxeim4m5nkwxj90opxll0q10lz9j1mc9',
                responsibleUserAccountName: 'n3ewn90df9131ro9nl8a',
                lastChangeUserAccount: 'wbgpxqez86oy9b6oiswq',
                lastChangedAt: '2020-10-16 21:35:43',
                riInterfaceName: 'awxf7ecgj8pclk7o7zm33892a8v0zdet0o3zbku3hlf5jcf7ghn11f6s35chare57pcyualcssz3ny6jvj7etawpvbryhfbqnl2ax8y0qj4idffnffjf5nkx8hpc9e4tw46o8k1qkrlwl9w9ncd107buqd5c3tuz',
                riInterfaceNamespace: '5ah4m5ucooosipcd5e76wfgnonqinz0xbwnp8ecuayx5zx38j7qxfmh4y6em6p4migpy2pqfzeh2c528duswk6tseqe8k3va6f7qsc7tbt92ed5swtujkkxebwxqdnrpi30if21yqhr6ntop85hzi6g9agcg23y0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'h4op6jbmdxdmhmipmixb76kjy2afzoh60buyhx8q',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'bdlaazwr4q97r5ncjq3avd5eq9im48sp7b3k1yqsdoqsnvtrhf',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'grfxldoujqgze680nwuq',
                party: 'nn375yri1atkem0013bkcdkrn7pua3z9j43za4opfbcqbaeqqxs40m6x1ywteaz42isd39vjmqb4sqv9silw69phecek4zpu4dakm2144nb9zqpzd8tcmj5uwyd3auzzv36mhjce14u0jid0lioo9az2ctca9i8n',
                component: 'hnmla07hygl1yrvvgrahhcvtpm7rsjy1lm2mrpgqbck91m5vnuc2kacobrctphexcb0ms12ozie8uhh36r3gvnehde36jc7dqp5fjn72vumkbqrfs3cnac841ymrqe7dpufqsutbxd9e2rfec5cobksl2yap8eyv',
                name: 'isc5tbxggasirq5u2dmve2o5qthz08r4tor2i00dzm7ce6bir34b2zhieqekw5clt08ouswj8ucjm06n80wk3kuivclr4apqi04q4s8t4ft5efe5zcrws8m4lk7nkpsbkkzb9zbimtps1c8d1f3tggjvqnw8ckd3',
                flowHash: 'tieerqbra2vgm2li4youv8x6rhh1f9udmqmjke5o',
                flowParty: '5t7tn5q203ywi826aifb11mr4vsdarcyqo3285q6a0ug8nkyodb980znmeicybo4m015vjfeweqzewe4rcbqzpewqq5kvnxfkrhesdami5vuibg0e0lez0b7xxpnuc6in9dybznkeso586dwb02ghuqkly3ek853',
                flowReceiverParty: 'cdtsrep5lh6q82hh0yvxhn9q4fm2kcm99kh751gaqtbe5im67jtzhjdb7pbby5p9v8nsmxtax9hdk6dmtacqaylufqd1m6pihnjfvsgyf623wpk3x2x7mhd1u94besh4y8gypyxk274j2eauqkdoct8ht9hztibd',
                flowComponent: 'lxswvizeembazxyx6r8vatl2a6vlaqcvhuuev7yn9xvuy828jjcnb0roxypd0ywp0ubgb6bqpxql0rav8a40ls11cr7o2f7dbxes74gavq21ovjnqqe9x3dpqszjbekfyv2hidr48lromi05f7xldlqcsi0pth71',
                flowReceiverComponent: '68vbi11ub7wdslxb6ib7dn4e8c358s4knw6cnmmadii4ybqdb3g49s9finlfldc85i7hp9mnl8rez53bdwosyi72e0kk4hj0ic1whrsj24t6l9jw2ve8ddre0v6rqirm6xpvwu2qgii6kc1z9wqioojynlt7t6zc',
                flowInterfaceName: 'b0pi01c9tk90mb6bpvald7cz46uqnubm89laxs0javl9b6kaltlgxsutgjunr847x607onzbphrzqtdkmfv73gywte0fahp8dbj9zhd0mb1lv5b4ekr1msy3ev9cfh4svcfzw4kulc9yk8vs6sz4car2ebtrn4bg',
                flowInterfaceNamespace: 'wcnlfdxienxu2dlpk1bkb9xypfo6wus5bb4n7aq2gpxajnny4yk5mem5j57dnk22w1xie5e57a83aylos0u74pz401ydcjis63g5nsenu681nqg12plrofxcrlesh1hy7yilzvh7uorsx0nqvctxx7127uaqan4y',
                version: '3isgohokdpyw43xqgnh2',
                adapterType: 'l2l5oxmsdq498i7f7naplkjprkhckceodgag87y82evz4bp2jojnz42fc0ef',
                direction: 'SENDER',
                transportProtocol: '1f1fsdundacox7nhqoaum186d27uthq5dnyg7pv01qju385bk8ykpng1jmvf',
                messageProtocol: '0a1m5u0qft81q38nys4c4etn6orhbhapao827qpjrzxxv3gspliqg5szu482',
                adapterEngineName: '1y4sc47ss2f04hsawoe7dw6tedd2g6c1mh1yfsqom0nhmpy7hcw0xhnbimppt3wllt4gutc8ghcmqla9ahr4k77ska8kgfgouprtrnxm285q1bcgordtjzlh3k27cju6ulenk0bnh4ibxepaz8gzde2zbrattb4k',
                url: 'cu8wwpvqu24ql3owg3naoe9iiejq5pn36q6lmijt8fuczuk1o62fzm0gcaabi851963ql8858t2dcpbhu6ij9d2n4mnlz3numrg6crcvuqh5w9lk1pjf5fagxzb54rt18y9fgo0rakv17rabbgsiydo0whab5r6p9wz4fe2oyxalxvr8xf6hfegdnmaotxf4ypki8g145f2d6tj75rfpx4j1eeitz4gm7o3a6irrgjg1pqh6z2tt458ia2j3kndcdaecvin191fusqsrci2qdaskz7pwa7ua8grktre1sbu4z3z5zqjy3py9hazvfwlx',
                username: '2qu8rzpn5hcte8jnxg33xicii9go3pd8pkc7iq1it3acvu37rfjyjxng4iw6',
                remoteHost: 'cpnk8s8kfj6ysnyj1v5agw3pvh1n78pe7ds2cws1i4lt7uiyg6504om3iawwdm82ocbkzv9lbqy4c634phv0nzmvbe0haq459z83s5oo5g7r3lv1xvcl15ds4zi7ij9i2c8wzilmkp5u6hc8zo0pugja9s0xjmoe',
                remotePort: 2556025474,
                directory: 'pzrfw3791zi4ce1zhuilc3c9rv2wkki6lgmf8rusrrpweyl51fnqpqnqssc240qid802y5joqq6859mk2ag55gluku4dkka2ss8yb4pri6aht6epk0xsyju9xbqg4bo27n3tu3c8mdaakgn1n968kksft4mq7cg8hz6vvjqzu8jozv05vc6hnsuktextglhjwjflica0wiqse5hrt4ln4q3xd4gz9w75dg5sxlo40jcp9tl3kk4xmzqm77u3uiw15w27v3ve9i2opoqymqakjuhrzchvt07d76ngmlycrnqp1g6vl8e30jnngxsd3hb2pt9wgjr70ylxqlnzg4g7iqojr10q4o246z7v2xrwux9vubwq8x4l9met4ejbyqc42b0zbs7a1x4t11zi4i5352nxem1yevjbvzhiehrfe5knmv2dmfxq7n3izyfa6vclyqa1dto9lesej23l6nrcbazlpia4dbcyx30cxo6isiox3cqlzcrj3zgeo6f3khq40va56vaeai34r25fhpjxhybrozctatc5o98lzza7fd2azr6es1v40ltiafbc1kmj57ymoxcsxmcai3mssda6r9jg1h03j0guqkw47uzwrfrdefuc1yoxa853sfyawhip43yloyizq67s3i64oc66lw1cirm1oz6wzlxfdmq62tf88hgn03ulg7bkhr2wuk2ao8qx7c448k5hoidzquktrl7ffnuwyami7wv7cxydsgb0o0by3xrs9m7fdv6zzb85u9crw3l5nv85xzfqjdfvmflkvxt231281voy3l2v84j5v3i7hw4hnjcxtm3iuse0wi4pkhxd5u6aiauvilv6qs0hef8v0h1ksdrvw1b459hbpx8gdn5eri7kv1mhfwnhnki2znq7835zppjmcxgeaxvw4i2eja360s3c8ahzyzrrxxmxjzq0psw51h1e2hk9qq7mq2c3n4h0mikm24267bi5gddxmd82hcid6gault2ifoin52mrxtnjkzs2u8dx',
                fileSchema: 'v9km9reu9fllhnb21i3q9ywihqvwfqo6sqv24jz94l434cnu5awuhr22w3cfj0lddjsgwtk2oxreozd8p7zoznxwv33odob545vxto60j29sflqh44e9kkzcbshj5yf0non5rzqy2mpe4ihr1efw1yruapj4ac3kefleg2rhydpfzeaf2f83z1sg6w9c6kqw3apjop4klimm19aqhmtdqf16xm0kpg3rht86kxhved0p75f91u406lggm94hyhwt5ej78crdnl3qksr0n9vv8ql039k1yuexbvyjjla1okeeo8b986fg0tqhoemsz1xif4z0socc0u768xwco341mjutxo1lklgn6pwdxe8kpxq2cu9shj4cq5nvileo2srw2af3kehslz3h3y06lp8fngvlzkj27va5rgu0mjjg36rceffc6zfij9tazvt6sfqvfjud8bvlkebtl89c5gdstg93grz0x7yyszy62wz06rwrlg0e56ybif20hkyw4j9mvczze7xulvz0ztqu6xxoq1rnx6lop0hgc195yh3hf4dxba61rax1r4bkxzr1849q0129sk8d255miofpe3gsrcq5o0d78jnnxo837pjgcqh4bqrdp5pkyi74jv8plqw723sqgy0kwsol4czii8kktu98dkwnr8073305qe65s5tdcttqgu0coug5f6thn3m52ezhi2j8qyafhevtbiyphbipq0ngit447ljbqln00thpl6tvv0l2pkbaqorwq1bobhrwgelc8x41z4w6r2you8zcmszfmmeo9hxdnkv8ml9c9wj0tu8patdnc3gaj0u4qiso1lqk3s2zet1vox1innisyj5p5222klx1bgaubeg4u5v4ng5hxmvtbhj348ptt0i1tyfthpxqav35h7lawqgxafn2v0z0n2u2lgejujojhitfbn0kw3oid544hxp9okm05iqhj90r093bo7m1v5p6ga5hkwegeyyu6l3zwzoopc6il18oy9ml61m8li02',
                proxyHost: '2o0z88cyourl35j9hyi8b84f5rhy44h7k785n9x0y7u29tbk622g1p2p5joa',
                proxyPort: 59504180541,
                destination: '22xho204rf437z5wf9nufycqv0t78rqiw86quh3n6ni8v8t5l3dcw1fxtuh72hqexc0pcknx5vx8fpuywwxvce8pmo8kc2o4ak3ae8fmslv2eiy10ux62rq91523rgcnybdepgu4dbs2ia2359u01ink9ck4dpif',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hhcsonpcv47sy3pl9d8hegn7bil7crq6esl9k9bzfq1dk3ltfvx89dp0ofjlgt5svzwzsbyqdnzw9wo3r0y3j0pmaqwv6qduvsyi1120j9iaatyrzx8cv052oe7sctweon8j3higtsigbfw5k95kxy2jxr8th0l1',
                responsibleUserAccountName: 's2qzr5s9et0helpdhm3e',
                lastChangeUserAccount: 'yrmbehvit933ilo4kzha',
                lastChangedAt: '2020-10-16 12:18:04',
                riInterfaceName: '6o56xaicv17aco0fywht4vfj7t1zkmgy4nfmk6359kub39sdrmpot81e2fq5hm3nx8gxptep0gvg3h0904e0oge7g6ixktb7qhtsxl7wtaoxna1jupyd7uue42oefpywly1l9ft994pigxlrlbzmoqc4m3hbd8ux',
                riInterfaceNamespace: 'zept3fi3g56r0fhuxwlz7zmzushtfp159u8zk0eawyjz1yq39dbkfxo3qgt7m3cv89z4n5cn03i1gycwx0lm46c8e2iligi4ajl9mss8m9a8kqrdcv48oc85ep5m8fj98t7l1aemaxtx12z8kc3z1g4d8m9cvq87',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '8yirpbwx8ivzy4s3uac89y7sbl352sg3z168d96m',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'e4x3o99m6n9qu49l0rz3f1rxfoo2i3ln59yaedd8x1b5vgqtva',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'zjrqbbment9zguuneirk',
                party: '73y2d35dmrs5w2i4nlmrsi440f1cgldvfjp7ndzsj6xcjmqylcgmr39e681zvdrau7e36kas00idue0doj0kqg1bx17ijec4ro1mn34q0r4qwlsa47wcpge6i5ofhl4e8xd38r8dqzkgu6y5evvicmrjaojcbrkq',
                component: '5ioq04zvbesrt8cx8z08kfubw26fyqjm1mni3iq83xetu5lw7c3ykwiuq37lqin6dhnth7d0t2u3ob2x6baviocbatgrtz7ubl99zyzxrd5ha832r1wn1urlnlbhml5tv4spsvgph3qs89ztd5vsgty920ckd9uj',
                name: 'idw63dazufi8hkhyey7spqjtvo7lgoo7v5b3655a7sxlw3ztx2xo9luxvukraqwlq893xxmkmuqmygzyap0ydh1rn1djmruxw4oqm1ujvm7fyal6yko69gq1j9dbv91oqdv63ttzljblhnhi9e4s7p6hb3lh4jqx',
                flowHash: 'h63848454tx3k3h3r16nkpvbepsztfow3zopb847',
                flowParty: 'wxa96cvfo2yc0djc1km5oqbbhhsv8zducsh5lg1oxzgp96dk3na6gacy804omt34lew52651oqmkikxq2a9ma1k4avt2ipv97nzkdivttditule6fpdtct5nn71x9lurecct1zzuddokdmfene2na4tx6698mkfe',
                flowReceiverParty: 'uvvjo2bo4jwu6s1g8cthvu7g6gc7d5mwjaj131m0ctx2awepfmdg9y2y5t6ykhflgoov906g5apoa0me8fh4qzi9tmikqcsc9wapa1noe0e3g0qifk8z1fwsqgn6j3ue9rhxxh251o2tf0jav6n23qqo6zihlz2g',
                flowComponent: 'gst6s04fto7xvgernhd2he53f8itsllektgywm0agd813q8pkuaechbfc5akye8get47knrcdzj4wnnhq8jiyyql5d1ig8tgpcqpbvab1vad7zk7u64xuop2mf0ixq17z73rzrruybchgzukbq30fv4izz221ttm',
                flowReceiverComponent: 'k59ar3n2xerolnvdezmb4cfnrn5hj6jucawc4y6pcz3rtds0ga3jekwmpax9mah3t3whkxxbf9jwngkvrm5ho36np9kkl50pvslekep8jr4ufa6dvpgtn6y34xrr6llsiis2dv6g4mpvcfgjnedl04s8mk2oqsz3',
                flowInterfaceName: 'b30kxi9jt5a3cdosldezh119q3fnk83ejddtwryvu07qmdp6ubeftbleasrzdjmzln7i1l0ewu5auyffylqxx2d9f9ygu08va6s5ig87f5b13xlpdpw40lqbhj5s6f9dtivbrbjpkvdj03d56i9j780s6vusfc2y',
                flowInterfaceNamespace: 'uz4jzz6vewli4y0bqqcyb9ggvngc9w6b7l46o8rl3kqstqs1juidhyhomg6jlnvsno70m0brctt1ujmyyo7mzuk6c6ctf1uwcnhkq84m81m10c7d97ifyal12kom8mcxz3g3nh38d36m3ara0cswk0d4wfpxc8k1',
                version: 'g0fniidg746ihae9h81w',
                adapterType: '1a5s0gc3kcnlfcflhljxx8g2bbef3knqaszivkwi2ifeo4zrc0gotervxo2k',
                direction: 'RECEIVER',
                transportProtocol: 'zarjyz5vl7xap7uzllb3f2kxhs98zxlfsfsbo6b9qdh1ol6e8ev2dxfc9j9n',
                messageProtocol: 'xl2nf1j8ldq8yx2x5gplev7swn6z6vmajuvx746lixwtqspag5z09w40nc25',
                adapterEngineName: 'q0ex2amtoz151intqky9e10qctw8h037on1llflshl8plssejgp68kilkwwf9j0g9bmkdy3yshsy8cl0k9wm2t85sg6dtsgsf7r8hlmhwxaukjnc8a6wv45c5dxog8nevdton8br76m6hvvottiufkb4vh2le54o',
                url: 'f2kqa9ga4g8zdwtl435cqk8n62c8tdua8utejidsp8zl5bo80vlxks60ht1c7h61oshwhefbuodspspmtolcx1793m5qwyn453v4wn7vhwsfkdfie5mzkkfvknjtac5hh29x1hutln2kfmdjyuxxk2xk40k3ohpqi35q3nthw02taklhi6yge0qiprrlhkt1o24jcvnjk52iaexbthsnksg8q0jx7t6c0ts15t3dulg6nu58i5evwkjjyb8dlk6pl5vaqz0ssb6s0acrlrwjjax49l8idqrv15sdsmtfx06smzg2uksl5gu83g4n2ors',
                username: 'z9tgz2iqkxlqtdemmkhrjl9x1fdbdv0226afsbipnhv0we4p3fienw5ukbrp',
                remoteHost: 'bwbp5si2u1dp4yuhlnxs0t7fobhs1edm758pzobkmbomjjhif8n68tux8x3cl8cpn9hthf6spx90zo36xf3h5mdprbrh2bq2n5l9vzr7hqelevssunyt5o6bdimjbc6zespsgil8yenvkvhn7ivwx45p24xqf4gs',
                remotePort: 7733839439,
                directory: '7c5z66cnxoxej17au3dxrqrzmvykiepsa0ja48rho1aeaqpi6w3oji2hyq4m0d9psqn6fqwoc35wq5secykttya3rxcjepmlmvbho4x5sc1znltxwx0bpg5dzrnsjm89p7ddylbjhs0clvrn3xl0hw88wo3scm6zjw5ieeo89wgrjyatslh2cuebs8oxidif7lt2b66p3ek9pye1efy1p6bpzajekilj2a8uvng6aiv5b6zwx85i1z7wgfq4g59d798mc9k2jk6jojzbnk57ltarfrtxw178wrsch8kfebyqp7jhbqa1wsc70t04acqh66s5wnp4xtuzuc0x8ksm2pno2wj6qp9tbi9x1zczwwt1e4ljuxf1q73v9f4ua9e632h5ouj43b24jewblcr9zx9yfwmc69hatudwwwf62aq40unkyfgd3gqyvr9fqypgwgtgcpiudnhyozgs37rkdv602m5iv1qtvhutipgw3aes0clc4qcxu65kp6nl0t1wbgywkg49hfizgwb5lhby800wy9xiofdgi76p3p1dai73g5t4ua8k5ewof3adtcqh2bzht3xz5kb05c5ikp56ro1wh6c6pbuy0t6vdotm7mmxc3nrkw6rqx2vq8ngkiqrkdbvcmx6voc4w07m10zxo24h4atuulgy5gh3rel5yqec9t3okjf3bc54auhiha705upiny8e6lto9bfc86ce554hml869mtv5fplu1bg39ohbij9f5c2quh80q9bbtcy4lr3ylweabzxbe4uvxa5pgbyr7jl4rhn00c0p83jb0yvzxgjrw1gwpyippyv9qskmz0yfzh9l1kj4uc2mnswk1agkniudtojqxxp695pzllef423wai42o5dbmr1zt8l5iwe08trbcst521fv8uedaahkkqpy2hy418ndd7mhvb8k05iux5y6u6pmz7tmmoojpvmk71td1mwmot4gen5jtnp4919zbqxw7ncju1a7t2xe0posi5cuz2ult38xknp',
                fileSchema: '2zl3qnv3fqn10kkkf9j61jxm99q6pj6cuag8sdz68840wy13aw1fecrowduhug8vaxmz1mrh65b8xb90sut8on9a5ohq5r5wonew4r9w2tav35ojut72agktwuyp311jcyqyozt8mpxhfwwa6ni97y346m0sgwsoxj6utajjskfrm3iab6in6m1sjwc6fcmp1if7k5kj0vm91bwqhchgtilkwuo21nohoh71bg2akuayj2p2hrsu263jvvzsf05x6xs2o7n6m044fk7tm98v1us4kfl7n6jy3ye2i97iuez2ewl17q70178fo645vijrz1vlxgn5jgvzjpiakygrd236e9d5p5sg6ft4p3i3dykvzevv0dqucqx6qkzri7i7k1e0257r43whjsp6hcayvo3pjzg6koo7wh7usqvdjwmmfi04v9ww73kqsxemmnw2npe6wqy9xzurre5lz6jld3utp8uojen9wf1yttvc70jgnbioro6xmocoboi1iyqrmlrqjwijcvea5upbo6hoo9jp85559vavibh9o79a9rp3o4ujoww4y2n6yhhlw4d3ro3ifgc4vb8113woofx3vz6kx7dqk52ab8ts5adwibud3kpaqi0s3iaf6lgpn0gv5lcnyuluzlzcxi24cjs8f6gfedpon5t05ab4izpcwf7i0iw0y09yccqa16oz0t2dmqyzp8otlp666a8ry1hghuov3do5vg1eorloww6jwj54b0if9t1v92hdcy9l49d7xba9gm9mc2p9yu1zqn0he6sufb9ths0zuho14ygyjkfsw3zgyn6u1n0r94iy9h1vetvdh397pxmrv4wgtrps1021h1jhy8xzdewl0z3c0pe88cenbvlfg8oifp0yt1m785t3ybvlf2a8ac12il6hclncrswxfkdgjwphirtwn0y41aw0yt3buuannbdjxue9wv7s2c1855vcpkxtgbwvn5gro00jq2it5mppxxnqcbtszvq7e0bkm4d0jttbypus',
                proxyHost: '0be7lbqx40bozt0czpp3e0k0kok6ji1ldtpdkye2m1o8gsgbipv4blco5ifd',
                proxyPort: 7082784430,
                destination: 'iiw93vx25zui6kwreso9rq7qiy16jh4x8xwe1e6zfjftta4jpf5yvvlm9aqdp0mbgt2iubsl9if76d7xfrb16upsvjcrf6p56fl4xpjjzs0fw1b5aydtwrios1omn5tnc8khczx6tj0ltile3ttvhtzu6i21mr8kv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yed4swc5j7yg2072aynkqopaxv56kr7h9pz5vl6x1os20zo5kxq2ailh6j10cgjwppe0ap3qy4vqr7ig1gr73rpmgjs0xd3n20t0lrhxhrw9zvs4vnqtdggbryiu00bsr7ruxe5pcgeqhk9bebsorbeku4cezrbg',
                responsibleUserAccountName: '8xvvbyqk4ynhgxiyru8l',
                lastChangeUserAccount: 'p3kvob8gzx6lmecg3614',
                lastChangedAt: '2020-10-16 03:23:48',
                riInterfaceName: 'bcem1vvemxma0qhp9mgj0cndsh40c7o4f63xt7nx6l7b2q0s781d7urd6hbc91qfrg8kltd9ra7bv4vty06u60juxkn6vu8opjhlzlm2strkwrc3f99b6tuidjzg83v7tmozp817khj4tdhad9znyks9lqf35ifr',
                riInterfaceNamespace: 'syvpypfpm2dbce0u5uqj8lcvio6dxvwli7qyknedg6glb26rbnji0rktndqi8muemcltx96dbv9dlmgml0nptyfrm6cjql73veqamn73cqcwdpbz7rob2sr39pgv1asrgjc4c4lmdb9yru0hd1mn1g3d1cn1zus7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'ck2wuppj6mks174qcduqrq3h8k83mxir7h54cnhk',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: '9i8qvdxcb7ovfdfkoq9hgsg0skxj4dae0fjr0ds7fntapayh2p',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'd01bxsm7gzs2d6vrx9at',
                party: 'ruhy8wkmvomdgzzyhpnptz3dwl8yt6u6l37yrsn7dugqt3udlg34rl50kem5x4zb789xrryv265bl86j3jyv9077xednbrzvdp45yox03jra53v7apal8197brdudcnxab8qs42589wkbd36j59ip7f5xm0ttns4',
                component: 'qgtvcqt6iz5vsyfqiurnlipp4ic9oy42ti2yzvf52v04915eo5alng9l76drhuw2uq4b76ir4y0n4ti61brrajmgg4ahdd7zlo5o87xnyu1myzmbobe7zmu0kmst67cxcwcyl0pnm1yo2ib3twyitu3nkd2lr2f2',
                name: '43fltal3uwknlha0uht2teqzr8xrn0gv8t3pqn9doshbf9dgekk48rch2ajy0682hig2cqx0djbq6w2jq0oqbjdpvbiopxkjr8t7kwe5k3pu5hna66ck9wpdfuya33q8f7ycx0g79eln1nvc7qk1afm32hwtz2hq',
                flowHash: 'q504itswfyaq0whbie584gcgojrnjsnu11jouahn',
                flowParty: '36en9rydpbpatbf7v064sw67vtb39p1xrf8603ans9pzzh3dimv0o5mps3bo3nnuzy6x56xyqanohoe0a6l3k2k3dopqsipr8iztrubbo4tt4483qajdklnl8q11pdsdqnsj8ivm79kl4pw6512irz732s60dj61',
                flowReceiverParty: 's2f6wntngntguoatdlyip8x2dlkhvu9gl2lc7fpneretqu80jktqjtifd992v5nfxxlay36xq1ea3pzmvoi7658v6s8801ph0rxv3bdw4jzu17gmdtyedh0g9rdeb0qedxq8t329x1z79x0bp9rqpogfbohdmyl6',
                flowComponent: 'mu7x78aeyh3nbwssu9p53kajchkeharangsfldrq11jvm4ll72mynyfu44t62nv2e5jvybqfk0chx04e4ndtu3k3n63af1inlszkll5iicx5dvujwmn6b5apoyi2xh1bjzvnpnbmkyfm5gknd48n95c9kj0zeu2g',
                flowReceiverComponent: '7bukmcfr9guhmpnkvw3i6b9zb2awoznkeqfymokfstkbw1iuflowp1ji7rwtzhihzupaqqci78yrua1w2gknpw24x2qwb45uuix8htvwuvq4w2afq7cy5okv5rqdlamisfn12skyaznbowqdxaq2cepmldq5cnlm',
                flowInterfaceName: '5jyct56irn24tcgfttsbjk8z6yblb056z68o9k3oz0u7pgl5exauoprg2c02chbb7cycczc3918g40eufbl8m5qdpwte3pxn5p5dxjtg9ei4k8kydyixoiuggo163vvime931wvw2laaeebyu2fjw25hbq8rwo34',
                flowInterfaceNamespace: 'h093axi427i6rlh5oiywztztvdpgf7ssb9xskar3csaxdl35klxnx6pe7lzaa0oy4ng73hwf59b81ykqnbbsgl30z0z8a4vjrc5dryas3qp1xzuu80ewap6y6apgqf538h6jahit425vrfztpv207ol61wv8gaiu',
                version: 'qlhqr16somtvninhq5w2',
                adapterType: 'xs7p12toev8mweesiueqgdvdut74eig9goj3q6qy2nr6oocbrhyo78cjrbh9',
                direction: 'SENDER',
                transportProtocol: 'i03w3mucol5r2cylpp65a686inr1aw9hj1f42m861md7o23m32qm1y2y49z6',
                messageProtocol: 'iqlcgnqs8qgxuc59lxth3z2sijeu6bukuw2385gi1o79c5x3mgxoiae2hk9l',
                adapterEngineName: '9w9k0tcgw8y129cy80axhr6aqn9ydwwyj1wv5v1d6nq6qkzgobwc04imgg8y60m71sxq7gg6dks37wiaoew8197trd2zaokrmrxmzsmrcfa9aglv5vgqqm6b1bad6u5hypm4g0b6xzt5etpxorwzd9yd8h3f5gjy',
                url: 'xllel64xevu1vt4kroqx53loo5qzn22fvl6gam6po2kocluaik3xdo1uc7f9b6uolcv18xhpn6tiif82l8nyv9q3lur22avfm2q13vpistt52e2j1sjthdh2algtitw6ntn4bu5p46n87uzlc6a43v1f9sx1oeml7h0ojngkxqwggrq8eg6r42gpd5wc8r8aqmy9j5iq0zsec55b7cpg3b5dionqqgkspten3byz2wgacg1vsdbowhb4603i4x4lmtlwk6jhrc7op5ai6deisqtifa9grdxjkgvwbfop4buibsenmdfu6plpitbn534k',
                username: 'gxj3hmqj5648c75oriad5ss795c9c3qkdogfmfuenb42v4evy0z6a7egvbw4',
                remoteHost: 'ev8gpbcelie8rx8tlyyscpi5lvru44snlbqsljmgs425sk7hjyta9t3ru5qwxztdntdec27urr8wpl0de3cpigirods6tfu8z5czpkcfncp0ypb5479qnurjuj5wk7tdvmjfjdaltd4afj8ozdbtntbsvmwu9fi8',
                remotePort: 4519006732,
                directory: '1b97wpmzu024r7jzonmm1px08iw4iervgh4t15nriaxjg6i90bod5qmh0qzudqjefiic7l6o6vou6sk21lm50iu3smnt99cuv9igopml0p43rlozks740uiw10c2e7acqew5g1xm5xsi7tb55ph80oaoeq4d5t1sogh0rwdcjhjc1ms18sbomgu0h3610vz172mviaodz7fuyssb3lmkxbw62epu9wsauh522uric1bclffseb7s7rukot3ud9qbp1v7bmrg52c5vzbosnq1qylntrd1jblpv7nu8go4n5v1t5cepzqgimvcquadnx2yruek4urb7ugbz86zpg2jjygztm1hl8wek5rxsjfm70yxf12oy9053si0r5r4baejkgxwf9v8oc6ee534mm8sf8gps0xv8s0f5kn9ss1cwy84i0bslohu6ckj5rr0k3ub1u11djux2204owfnwt4b2zjpfpzkopdswod52ysam2dnxtj2pm77b7fupda4jl4d0fta298y3jm32clgamtisxmr86xg0f7a3m2oxy0eac55nyj6kcl0s3g9holhch72whwwqchj03pwimawahviu0r107pnkyq8t18qldzzmcvke5y1kcoaj6usxygtyfzrwifsx26ph3qn69qtkwvrlmnzcde6qego6he5qtqkwc4lekko92r3zh5q2frn8oc4rcu8t16ox9gliscgpe9i2zkq50lz7mh63os4rwpucht37490w1f4ofmzgbemwysxiguxo07khv3i61zpge04gyb6p6oahe6b7yblnnuxv3or3ilqiqa1dzy678k3liqjz724cddh60vak1rm5fw109d5bi8goi4r5k20s83w8ltwvh0os7yh1d4ab94evul0ihpci9vrza8sjj5q1z65zyj9868orog3tmie7uh2f665jqpzr5tfw3txs25m81nrd288z7xq1ti1sa7q2vipx2jegmiszkz6imbomb71kga56d9zd8gx5frab0y3hoac',
                fileSchema: '855qijldgg5c0unmo22qxyqbq4ces3186l5v4h61o35rpyi7nyvzb3pjlenajqlg75947qfgu5dxzmy342kjus57d6hlzxuqxfncjs1q6ca2qc6wy7syt0nsn3t2s18xli6rz5ew4tdjvul7nxwzzugubfie0da3e1qbywedtdfpvxbn3jw3oc8do9n3idjdcs4su0rp7asjom60rr3roycmcnd54iyj9ibuop537hvv9x5dk0ttphi7c0i5buyjhi3c2qck06qsmsewhn9ldmrkpawhqbwfmmwlxidh615p78fedgwm4byj5i5uwk802b59ct016drrm6seuji3t6igcrruk8yhm5bvzjy1jrnsw9lilpopun9gkyyo2609wg9qx1azpl503t6p3fk8w0h087rv26ggr2t0uwoaz4lrjo0s5zetr9rak99tzld5xemfvsom8q0bzbinp6zzj1nvni02tf04dthub1ogw0zwmhffd5ozbjvld7sok5h323pt7ytnrs2jxaf5s5f4oaip9thh622ofov26bmg74xgwz7xlt9u1mmoufna5d8wkveqlqlm3h1hbx0akq1soxmjuqbq9f9ubaeiod4dn3whz9ezea69qd2l62o3vlylztceb1a0u3mztsvgmnzh6u3oh34491m9i9kyipsl84c3fy0z3uub4c7pljstoy0uq5x6y0lb6iykhi14w18bdn93a3ndni10fzp9hugwk536hvzuxsaefwb8ufmyufoq24tyopx24k4ihad81ked89b6x6583gnulm7isvxnlkwjretkkjx3l4rhh76s6pzhjq57b2224wezbr6q73z7qn5kvcbxqzsl59vx0mh3hx2os4w9qtegp1bqa59ceng6kt9aqs2bx1c03kna3pwjze8bquf7rhnm2f5e0dwufadryitm5o1mcmu08wofifxn6m4fv5dphsvo2kcwdstpxd1hva79s8ivp6pwa903pmxurl8aw64h223vz6w83ndw',
                proxyHost: 'p0xpojvrgbu2eau2cglbhi1hszxfugufx3ci31gity30rjuhtpgd2zp6qvla',
                proxyPort: 4241429570,
                destination: 'okhf66ua9xfx7dt1iluuv6d8l19d0ndh1z9zcsq0qy3sp7wur1u50aurzu3s8zoa65mqtgxiro42enunmij03no46876ug5w6zbyua3nk5j58ner61dr5agkni6whitdbn5gajgpkzbs2tk0hbc4894zwpmzpn3f',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'd6w95ynodwaok1x58jyu3pfpiazmwzpy3ymb5cb7j1vcynqewiz2z4br4uiz17s5mkoh3bfwyp5ofa280zh7ecdtqopq30ij6y3gs5epfp25yb1vhnxosigqvyir21lew2non10t62tjgghgzhihbn9zjcqut6oe2',
                responsibleUserAccountName: 'tcvsq70srkmpdyf4x30e',
                lastChangeUserAccount: 'lh5c6d6t90vnek8r7y4c',
                lastChangedAt: '2020-10-16 14:50:36',
                riInterfaceName: 'tvtxef6tkw8rzw2wn14byodn2uk6828fzsghfz4zfj80clz5941jmgynzbgwgii8wh0k2cn1n3c1c5aq2j1jl82e6laajbssi31opw3r4wrgjx4qm308ykslip0yjiqgog5pn4rs7muje1jzgdtq08y2k75pzcl6',
                riInterfaceNamespace: 'x00q7srpy72jaaevxjhhvhwttme8icic64y4r2zgyv1c6vyut6n4cd982i5w240tvgbdhj7kj97i2cr07ln3ws4kr2sh1zkapitmxi8eiqhuqdspz5clkdu918loxyjiny0ts2695bc887nhkl7zkxm0sbi1b89b',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'fdr3bjsnv01d21v5lm51ysmt1tpwujlbovg8ghl5',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'af6vihz8u61azrd3fx7cjpunstbbmnnamcqwvqhpdczzezehw6',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'zitc2uckfqt7c8joy0sp',
                party: 'zrj7cgilxr3vufc4xywma4orvreea5a4tsx6sprd4pt8jbl29bmba9zqvbrfavxh9l8eu1ukqzeinczzuya50poglo7brveul7pdzstxwwhxirllr22f0ivf8injrj6x8poyh4zyqtycli7smgdv2a6g8szgr0j5',
                component: 'gqe19e90i91ninfaz05pniy24ar07t4lxhbjfsjr4d36ybwsjbcmc4vgzblabllip1whiqieovmd1mwrxps5lupzjedkysv72tugeve2fyin8gj5aopschhctg3p4tfv9hhxhwsmubh1u2ucv3fmqenh7u92tn99',
                name: 'v1zcrkivq84hir71ryeq426200h9qtpelz24o7ek2q8oc70ru0p2g4g8wlaib2emdxqin16ypzg5aqa5inx0do9i8v4t7wgde2z550l22815kpnkt4dm8uu59sz2nigctxndi0sx12lym2biycbshl2gbfoj9vxd',
                flowHash: 'q5dnvkmf1lvg95g8nlsw87w6xg5koa8wz2lnqcr3',
                flowParty: 'y6hzkejj5tvrn66eq31c7t297tu6i6xfedw6hxv89qnw8fzcbz51a3gr0kvizdkzksjw051tqilcf5seg3hyp2b95f98ex3h1xdoirhf832mh16h041f9kg60nrn8h1qsqtgbkq1pnx9jyaf4uadq0cr1j4ptqpt',
                flowReceiverParty: 'gwciep31iavcfuh7clb9yjhyuaqutopdd31cmk4h1iakyl3ncrtt8p9yvuglacbwq2olq6moqhqraodrihb65oyk7aieo68omhbxpwf6firqprixdq54w1btdxtpckxxv64z620sdnu4h6ni4lr8drz49xsiap7m',
                flowComponent: '3ozgc6t93lv30ta9ayxuq9mez1o36bardbufnvhfou15dzl34nm786s7x0gjpx72y643cygz9dc4w5x4f40tl9zvmg93368rjhdxqzly08sljoabthhnwlkszrfcxsqqhtdk5p5jp57ksey9k6vqidt3lg7xyrpl',
                flowReceiverComponent: 'f3gx4d6avkysp50lczqbt3xwsrou2n73cmwmboru0xih0xipxblzk4flkpqp6sxc3f6dldx4lpr153fzguthzltawtgm5oamrt015bhh1if7nru1ucbwd0e8xumb3ddfmgd8uau1af53q1u35ugjlhm2vwn0etdy',
                flowInterfaceName: '3vcmdiok3ie1muci95im9yvejzzxkqydjc2sic828wd2luzzf5sykdpmbp5q582ruv9okixynspju3qaoswguazl01uokjzsg2qtzj7sbz69k6h46xrgv5zweq0njzzz3o3s38f5wiz1p4g2hi66e0f4vine8ux1',
                flowInterfaceNamespace: 'a2syi06a75huhmpgv0gsmokbjih4byx08jxi679w6t02h92pugcb1z3y5ftw6woskhfltz53l9lps2ra6b09sfl5qzcznjh1z7b6g10ghfqb9dlqf3t6ykncbfd6183wq8u73lqvhbdjy4vayxd2g71bxhjoiq2f',
                version: 'n67kk2tz6g3v3ccbd4ab',
                adapterType: 'l96rjapa42nazcp905l7dncfuezqqynusdnivgdpmq2183cclmw457l5wnqw',
                direction: 'RECEIVER',
                transportProtocol: 'sbmp2hf90ql91wwyfw7886l8gxk9me282pgwiwzv34cji5k71ymqri2n6anr',
                messageProtocol: 'u2f6lm9xkhf73os30s3w5yuzv8jph2fgfew3fnh86fklg6smwbar6wx5ucpb',
                adapterEngineName: 'whjiyqx014xuqdx4fd7uo1ye8xo2edl3yg6nj7tir04fafe2sum72epzs0ycgwguq318t31jamtfi7vt4t7sj70ozyxwy6g3dcxobycb8u7zjs1gd5rixgqear59jj65af1c2b7zwtq53xcoqfn5gecn4rddcrqy',
                url: 'bqpx438ohmsm8wl4q03agxa2ohysrq2augs4fh4p052k6r1pnqaad2c4g1jn8z3t9kurggzm9c831febaoylb79oscrs280n5ktjsdg1rtadu9za6o3tw93m468797r5foqowayat95m0y0l50ppq0trot5vcz069lwmiq96bw0vvhtu96wy3tnla545o2fylnxxc2r1e0ufo1rxjthzc0692m15nyyrdx31zr30yheexl3tw0kt81lqqzihuv7p4and8mqodpo2ugomtwl99ncilhubvpe4cqlj0c0tsst1wjrq0klvna4ctg7tt7an',
                username: 'g1bl1xenmcxz2h9sfo5fgdx59l73u2kraq7zprx2fbhbrixnh63k9s8ody2u',
                remoteHost: 'obaie2rpmyr695tryet5fpe64fmzo0fha2chtduc3sl3561h4asx26ab9fy7ao03p3q4zsettduea0mw23wqk9w147jcu95dd6c4glcb5uim0va68r7z0w8usxb9zg5czfcb9zfndl0wuh0zuqlclesrob8s7hlx',
                remotePort: 8752471262,
                directory: '8trdkl48wswnkyc8g5j50xbiyf47c4hedyjic2khwipi357kg3kxv9gqhxsssrz3fu08wp9w6kt85uxu7t3oy7n6z09n9y9d3tufbi01t3fcyn5ojhktkp1bxdppoy2amn0vbdgwrdzgpp6kyfrudgyc988hc8l2qjw8f0u1dq7s461gz09rbvw7rzf6r5ql9jxxq0b63rvostigiwd7nu2rvdmkaznxdb8qm0psfd606o4nnd75h6o0tf66euby36iokepyq36q1rrfvpt5e1q70z91d7wmbktcsadwt8nr6sg8r3sme1nmzhz2u13bblqr081j7pbhztzlam095qxrv7w8kk4dy7666sphz15x6vdh0sn0heeku31qafdjax1qo2vyo6ytfcqsga6ichdyasrz1ae71ic6yhnxqd0atutrtswktlsbsw5gvih31bwyaeadbc4occ2dn03cpctn6lnibut9felob8t7c03kix43w19jgf83uxucnfukexdarollrzhmkbvsuocr9my7uc3v6hmzskagnix59gnsy5r3nyeyeoo5r18liz06m9b36kzo2u2q2jy8hgu4iu91fjb49cwzqpvfjr6uaang13x5oy4lp75wje0s00nfqm38lkd1vrdne3f060al5xoe79e8tnt4hwe5q894539jkq3vzaxm5m8zb1ar9s3suuuho82zavcoajjkzansihhswe1rrsv7o6bb5pm9ptw2jfigpllbziy26qzq9p4q8bpldi3duqjy1rgqlnj8xc3dmo2hmh8tfft8fmma2lkqwdh6l6xqzh3nzget999wdl5rfwf6twn59yml1x1192xhuho8prawpqvnae5k2bhmmbcqy04o6whb8ts7uy1diyw6p0fbwaefk7w622myyo8in7ze8cbillku7uvi3e1ok2ohzq1brd135kzessmzlonfu0fkq1ivxxrzpr5zxq1mbt2euo2zqq702jzzz78ztqkfsermzxcjl6hz4hmq',
                fileSchema: 'fo97wfqanfcsrac9pypi9l8v7lksk7mphv166k4upmix62pmd3u9df81ux2mvie1huqhr33qowrziaod18mbswrk1uaues5fnx4gwh8ayg8l4dnijpcw9vnkvc64eltih4zcmzs2i00xoennsj9sx3luq7pi3f9m5r5hq1te143memt4857mhbveg0aq165shymkhf1ogwcv4btzumqat7no4kogrdzmi36o16bm5dpgli0k62g2uj2x8azula8g1tffofxhy6gxitmf6s87za9qx55vx145y642yf4ue91a0log6a26t9vyydpyylg8ywbkzs83zlw9l0bxhj42kpyuj4z52fyb9kkfnu0trimjm34cpnui96r0f026rc11dj855v8pih2gbn1rdng5ejsmqkle6vh657cmvvd3nh5lizkclbjlqmy09lgxvh2y5wfzeb4bzhcqlu3iuzg14lv5150ziwo9f30pw7jg0hfg2u4mnvb2eikz3rbgylxuv5f722v7avv0mu7l4s6he1g9sinvshndma8y6qbz0b4cn40r2lxm1dlfedcwct4ciltpjc157r5o5ui6sku4l5khhssgdbefhduqrfc954jhkwr48fv2ca54x3oiyrse7ysg1xt9j4t7hcsrtb37z9obibj3bxbv3h383n6rrimgj4jgsj8o2grrnpq7htse7ow4m4jfmsy39s8scat0bbjofyzvh52r1dibr6rp5redozd5vea5760y4fl9axj1vijghfqs7avlt0lvadsibr694le0e3yuvhm2pjb76pbhki3t1uwm5y7ff8vvevp2koydp98xk6yu6dog8n6kxjhft6c5q1cfku5tqkojux54h630sn7s7db1buzw7npmcqrou76d1da7owcfh3hbu4lvvuwcvardaa0ibp89lhw6rwtpmaiygq890y42z65zjp4x54zgd4m9aeu8dwpk0zidwaswt0laqjh6nkh1p6akpowdzhjvm9q6ni7sv0vn',
                proxyHost: '83iq8gjgkm26nczir1rhwttebikb1htvzkc4rxb7d4mjdbyr5dwf4h8orifu',
                proxyPort: 5586053704,
                destination: 'yi0cp8j5btc4fnumoh3sxtltt1ib8ja7aleoy4ecv70hlpusrwco1jht2y2f3uxixe57stl0q3q04i579v09obgamnrwwtj5s7afp0l5kexo7iegq5shpeyvxoo6x9f9ub2cfyf23fh3eq240ylvp54qn5vrlzfk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ac8gyuc0k0ezq0r0f99oqvctmwbgsh4y294eo2nruzpu8h18tex46koubr3de8u8konlj3w6hfxgdf54oki0ls7l1uqmwr89tht7050pxxko87numnuw7vh9y8jeh3o7x4icpng8dc4cnnmnrnk1n6y19iu3yfyo',
                responsibleUserAccountName: 'iu59e8qne7p8rif8j8u3r',
                lastChangeUserAccount: 'hvbpkdjmzi8iyq738q29',
                lastChangedAt: '2020-10-16 08:15:54',
                riInterfaceName: 'ja7aontrteykix59wf4xdham6qpfe17jac4b3g517yknwgbhqwr5fqcto5nekb6et83t28ksdi5jbhb1iqxxhtu2jnnzs4n5lk7s8mddnris5fc5dv8ns0cb9qqz203oocd7obn82imndah2uf74tq7uqlcs9r5d',
                riInterfaceNamespace: 'ztftjqkjqjr8xi6o8an7igx7o7y2k1qiar3aw8vz01wisdw34nv6tauhc8yv9eo9kds81nyff7q656eqn1j1e8ss0mavkyhg0hn9ul3i7arczt5b3voyrzckei086ktpj87q06tvjmh0g5s1ql2w4dtfimtgv0rd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'r2azpb5mn2b5z1i6pguvqb2gsgrkpawocaqrse7g',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'weetu0c925so3z3e8ourift3z5lyn4mdeqlqdj8m2a5j85wnb2',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'cl0wmzecycpetd48oqdy',
                party: '1t1tss0tupui77wvz8trcp4gyotbd2wgbdqeuadecntshkhtripyswnk0jw7j315w7t50ig68q42rf3yu30nounvy5zbah60iigxdw8g9pukq5rmzj83ctdjk1xascuu2a8upgn10v3yasr6qbb16o1hhkcluz2b',
                component: 'ua754lvpy7fw1eu1bwb1zwzu03jo8e0za8i81g6q96lhl7l6v9r1hbcmgi8f4ozn7ug1w3iop94gsu8p9rjio10545ixj7v1n2zgxnrvx03uq8vy3m7onkhu3678fww4oywsnse3ozk0todd8nmodcocf4llarxm',
                name: 'wngpptlzn4ehm14jyzij2fce6ibloay7gpbmzc7r6ut43dj2yts0vpfzktu6a609wdg4fdfvxrh92uvyl1jmn2amc7940cow9v7lvmz8zbg9yzsbfsh4llfc6f0ex0rzoo642566p9iltkstku5twgkp7qhcapk5',
                flowHash: 'h8p8qycanpb0ez7mxngymbgjjrs6zlnv36karj31',
                flowParty: 'ekmfapt3im66zces3a737dnfcs68svkgozks8g3egl7wa9h1q91nl7sfmnob0hwo39dt7e5aelp9g8n2shigan69ucgqmrq2cftlm21tpmkavh83279ydh6pe42tpp35nujrl0no3xrszwu02q0exfqtgjhfjnmo',
                flowReceiverParty: 'syd4qdytnm44eim1d5m5xw86fi9ybqomevyrsqc1xunxt3jjv0t04qlcw378tbgx37ithw729qmlqbh58hufbf9919ipeyvbqx5ghoubcvp1d16ew9spsvgaiqgvpdaprokg41dcjddt06u5pk1k54f64igpxu8b',
                flowComponent: 't6w2ogskb1nli4itysrj252y6swj5zq5ftwiuus5ocfva6hjudn37dh15vxs9vskpvfkw3avyfbnquc750uyyxt1vaqdd9880f8mz3ki9o3hbaleeevm9ujz4kxw3n2rw2j1fa5x8fal3xn0dh7396o8lgt6rqki',
                flowReceiverComponent: 'p8s2q3icorzf759u2vyo67ttndl55jzdt0435e3qfhuufxft3y7h66w30a42y9cfht7bejgoa3z1904dlgtrogiw24lqsf245hvh46p9br94nuxtdylqjjliz4rux3fthagzzf7mzb7yjwmut4e62haoomoofzgz',
                flowInterfaceName: 'bm4pofta3047w76nfex9am8zfvsw8bt4mseuk8gepjb8i1sf1yv61m5f3rtxodbw2af6tpvojhv8hyu5fzzg9gp49db9ggut6uvc57771ltew2yciwrao1dhh66jf294cj05i9rconfpwj3zkvigolj3y1uno6a5',
                flowInterfaceNamespace: 'ujllv0vs3gdhxjzchik57hnp3vhxanodtvmyspgf40qytm71b1getju9nhwr6x9rar9duizp6k4o07hnhjbkaymgmr7orkf27lpota9s3ys97ws23lm57f4ksvf8afnr42vnmz1c1br3zblfm6s5z11jeqc5owir',
                version: 'ncco5lh017532y7a34uw',
                adapterType: 'glhtb801qtnu2m91uizgbvw1w7m180m0zyws2abs2cbjcpbhu5ea67zc3yov',
                direction: 'SENDER',
                transportProtocol: 'erwotp6qv2xv1fwfb9xf3ngfaym59fhv2tqwmnm4naj5okms1hf94mif5f6x',
                messageProtocol: 'yretqz8zrd47cwwj5krshsut6x7ni9zlhy8ph4118674z5b63ybj6xcqwiqp',
                adapterEngineName: 'jknp58x6te90tyag9bhc34qqykujgyrefom4qt5osnj5qsdpujlkf4x5a4an7ofx00khldlyqb5ipocewx2iykzbqubkrslo4rdznef2kt8xcbuq9qn2awiojn8jup40wyhtepwld7pspm6grca13sdr0yb0z4w1',
                url: 'wnidimtg9l4chtx2a7k1adhencu6wz6n2e0oci7amsolo72qmnd4ncwaf4764nb0ez449wsyumv713o8dldoxkvyj55bn27wlfkteogdxbuz453r1droemx1akolchnr8xm7950fwqbotn8ilvq47ladh2u1rghc10mubv51kjef6wh7pnndkyv5o32y4r2e0ln056i496iwpwtikljn3kqgro355odfbl3xlcrdnvslow60svb976vnom4tjh5o89hc4xg71b6vqnfihw3ijfwc8dxgvjzrcfp8xk5e2bp9xn3vui2q2h2d4q8zm7ch',
                username: 'i1vs3pkbq5c51ebj2vau0cgryuilyintuyrjkt38n6y6fmf5zblk0lan1cb7',
                remoteHost: 'gpnz6ou63qt02l52ou50igef6l2zy027blvl4lr3s02xvmeb6esebled9go1gwgubtkfimapg7cgzgd839kbokzgqodjbsmixvnc36ijw0bztoedudgmhvcqjxc438yo06zoxm743unxqydu0wfz9bo0js7sfndy',
                remotePort: 6988480260,
                directory: 'x55batdwcghmxlzz874uuly402xy8ora98pyx1cwllqq6kd58nf6bf3m4srbh7ab5putzwc0sc3d1833wm5a4pgf6lb65bn73p7sxi4b9etsgpm3ejs6qjdmdn7ydxecmyi0095psipabupswwg2mmom8fog1zjfa0yzt4ja37pyre2bne5vo76kop5m618om046gcjnfygmbo37dh3873sn40efzcnfpqi0ny4p9f2vorjrsjtpqgos8bcr8n4urp3gmcaiytf9qhkcv8b4kbqqsuyyvnn5khltiqpygfhdqzuupirqcf59t5dsic5glq6uaxni6kadsecay2vwcrt8yy6tp1ys317t9aim19ibkuxzx36i2iga3fmk2hg8mrazcg9muoyexdiag0xswqdv28eos36ydd3jsict3hjck8xd8z03ocaxx82e6tl3y1v2p07cfuji0jcksq7kql8vfxlzm2kstk0ssfjsy22ey8nucn9qv2dn9mswxn8erpuhdwr5j9urhmgtnx7zvjshjhk3wcz5ns0lkpbsrrdyxl6nnujuvk4l10fzszajkst0xtpuomkbadbpky99oa2sk9qofdygof0kyng7n8kuzwuehqb9wwb6htvw9mwg7lbt8k9ms487968lovjwm3o7tgxps5jvevl9tafwwfo0p5wrcu7y0q1g8zsq0kyim29skkzpc2i2irx9vjj5eyx70d2fyq232kh55h3uz3sgcl08qadtdoj88qn64wvav50lefngn37yrbp6dex8bpdbxdjj0cb7m0w0ky06w83yya9hng811z9mn3k4r75kzllmzqb6szdd0ke3tlvnlyfkwnjbtmowy7liep061hbw00pho5hjetii872bxy91cryirqf3po3up0b048f07vx0vni6utwvfow7ns48mxadjgz5wosat9i9f7hl0k9kb1o21bt3rsc4ma2hxc3fnqsc350z9zl8jdi78wkb39ln04q7w5i4k2n0s1wefxeg',
                fileSchema: 'fw6ost0wnb6oofeojqpe1oh0wshe571aplkd0ef0cbqiu81oy1blsbppwvpb2wcm2g7m9oegwenluv1ac8nrtjgshtfhe49u17ah25p2vsgn3rmuobwysgr798hye15hfkbk22ilap6oaxyz9j8mh1zuofsv316h5mzsq8jmwqgmk4v76kdfc8sh05eyc0unyu4pzv56wvks4uee4dxlix4hu2eqw1nklki913lwpy4dacqovvtoasu2eek9992svr8tkqih3sf9ro49iyywuao9n4jrszeq6ku6wd27h61fm2iohnt2xszy1s9pbmhoc79na2w6pr8zu3pqokt2qjo04kdr2z6tdz78rfgdu2uxuv1moulhluyg38113gw8bo91hb3hlcyw78g8nga6m7l1nvegrjmlcwxd4z3hmja3tntbbmdmhoiwcc40vqmd8n392kqmoyqyie3g2xto1pz8fvlbbg3h9bi0t15cs3nbf1sbmole76psirazdj6nxv8zjfy409ec82vu5muw8i9g7ohsd6a9k78qznhbboklsoqp3cb7enzm2vnvmb5po2xvw6hk3o9qpda6chbwxg40my3pj5wosafqwahkwat8teb6dqjdt8gp5qtolqbnv4ldlt0aslgpigl5silylh078dfp001bpjoba4i8nlyrasz6m6ru9u0h1phu4uufnaz765e1jt9c1agzirqwibrzv4oaqx27gggixe85o1f3qmhycvxpwo373am7rwy63ffkqytuqr717u71bzp5jc3h3c1cbgy8ox5o9rvtu04nb98kvaai4pmcsclfqiwrzt6thxcp003c2j2ua0i08gfjjhmkhgq0b94iaz81gws15lxqhkdsmz2jcvb39uza89b3zmcxktt25r2dabvu8d5rt35mbcpjsbmqvnrbm8qap3gp8lqugv0tkdijl7m31nhxe7oq67g4vnb29edww7exp5t7w3axx4uf0gz4ezzgxa8jqktxgwfe30zeipj0',
                proxyHost: 'vcjxkf5ctvax0ecbh0p4mnki0linc308b6g6cc33faaxoc13k79t23bxwb8m',
                proxyPort: 5034716323,
                destination: 'x4uitznbflsbxoqh1r0ib9l5qy0o9alp8z0cjvgcbax4pw1095knodk85ey6aec03aj959sgx01ndo5jw6z6xe59ffe7ppfw7g5zf17tltsjriilmenj6u1wz3gtjgae4h91sbzgkseposlotnz46f0v1efbt2x6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0bssgy4l4otbyyao48gxt82bdx4nfjcxqwh2hfdsm5z9c952lobnrjmguy72ej1knfhj7zoadhq70qa1hht19o5al5e9590hvn4swnscfgwzb8stozors6bmodlwp7unwshg5n869t1kr4cwffcxfpolxd963280',
                responsibleUserAccountName: 'mma9dgwva8a1s73e9alv',
                lastChangeUserAccount: 'xkjuwm9mntdn9rgctfc0e',
                lastChangedAt: '2020-10-16 02:38:23',
                riInterfaceName: 'demlw9n9xec0y0o3htekailshadwcfv7bmq7cpe04hwmmou4t3dv3cij4x5cz4zcgoccacyuh4r0dbpss5upx5s9cs0s5t8mpcqb93cfjxqt248cu2qzeycest5ho9q3v66gon55phflolrd230uw3xcjgeo82pa',
                riInterfaceNamespace: 'u8xzz4ek11bkbom76e1aepf8s6d12txdz1cvdt3fi0lt9cy5xz67a9nld8p2d9gi2ixagygywv6btomaiga997e047xvwnx417v90vy9mz4v4y0b5b70mtaxr5rehv45kmb2w12hhub5amleo4l50lq9lzpjar90',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRiInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '8axx6ukfwrcf5buv3ojwgi21fqa2ozagk0dh5cep',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'y6hh9js2vy6r9xyq56lh7g49j8pe3w8a1uwc8qpns8k4elalzj',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'qxsxa72l571r412rbnup',
                party: 'mz1qb0pjhjnkd8a4pnzkdevdwuuznoqijb6ob5pclhzbewwvp8a76dqtg8qz8d3evkln3nglz58eyzruqck7snccyi4kbdcox0x3jbtsvwey4x28yijb0f70iovbb2zergjhybvla3xzgbcjoaq2voycy5440os5',
                component: '6fv0rst93u3f5rt141ths9ot2hzrslu08cahxqwsxh0izvstpklaqvit0osj72902azysng2xihsrs0uoi1vu2nn7cecrxsbfttabcyn6s0cguvoauxhv06kozdzessn1s2mpe3r2dh7wa7wu3zfqqxa8597jjop',
                name: 'ar47s6hzcotckojy7vuvtaelocgn112w3d1qr1miqlrso9rnbmkze59d6nlq2jplh98e8nphucsqtzddw4l481k6ywrzrnyoj1r2ebtq4fy4nf929pl5gaghgnkcd8fuiyccszgewg5dwhlv00tgk6buwlqwrh3m',
                flowHash: '5wuim8hbmbk01iyubtpf38dsk2vytb6gn1q694nj',
                flowParty: '7cjxox4m16ois8gj0ah3ms2k96gbrpf0havf6ux4jq7wnghhiuxjtre67lwu0d6u41736es9eyg8p242sxtr74e8xv46skrydss12gm6g91v0y3jini7j8nje75cwz3n7ldupi9lk3ntymw0shkrci3czmejmtar',
                flowReceiverParty: 'vbh9uitb1kevn0g0up4ge2vkt54irq9bg5lhf29notdnlp2snhbr69lmvum1b4aqospkiir1d2k1unksmwlmd1zmlx1slkmql2pa4eoh6fhr9nnw479x2emumwqaib60qirc69m7yf1i0jtm1tgfymyp4gca09sq',
                flowComponent: 'tgds549n9piyb0ljvc40558edhs9efptyp33g464kvm665trdbcepz6lowuc98ihfaplbvd5ym6aluqu8obehm7wipdizsvk4tsxfkr9bg0cwawftqt3adzprqhn3soucr181ige7a29lf7e5mzsvllm58vjrmlb',
                flowReceiverComponent: '5zzl9zvbpk1cdk7iywtx6itbdboa771z9euzwukm0acw48zwq3ahbo46xslrdn0lc5jqm9kmmn4l7hicxiy86k06su6g1kpjyz0ml797jslvzxyaqz306tiddrstrgwd9zqpbp4alsd3098g2g2dhrfosjm7wc9i',
                flowInterfaceName: 'tjrpb2boniswa0zr2nf07oc6aierd2csb6ptkwflwvqr45034b3eba0klge5nyc7dirdf6ftu3ycx5vfspy6twb2zgue9ren8sk0ftqmfcluunyls5cbtxd0airayge3x5oxqqmuwyt2r7e1hqftos08e0isi144',
                flowInterfaceNamespace: 'am5rtefivvrq4gzmm6pntxgkmif2uwxj177yzrdk53o4sq2ked79pjw1thbsm35k212yygfl9dcfr0qhpufy495wk9glitsb288ig7x3qgxs5x9tde1lg7faql6mqzju8ntapayo5lb148bs0pz2yxrulcsah95t',
                version: 'pqlllz7tp7cam63vj131',
                adapterType: '3601y16m356zetp91kx46wvkypa4vnm6j2wvwyo7gsg4dd7hvb4dpw522m2k',
                direction: 'RECEIVER',
                transportProtocol: 'u47hdr8f81j4q26ksgfjd1yzbp7pollyu45hw7zbi88b17fc0aetpde00o0m',
                messageProtocol: 'bxjzrm0xqk6npmm2mgzlyibenkwth0bkcasdtkugfs6lgx8fcyewz2qtk4eo',
                adapterEngineName: '9gjk85mjhhkdrwsw1declqg9pjlfw250ojk1a86udrqu3018lfw17apypw8ezfdj5fl1aqy4k0k2jqarjiuo94is2955udiyefamdyr7ha1jsd94k93xfgg4s6ikukyrsfjzva8jnt097ss91cm3zv9uestvbs03',
                url: 'wvg6xoozs2kxw2ldq2td9sb2fdcfjwloib2q2tcksijs8qxk5ki0m9fgn690qpprev6cycfttzysvmenxjzrorz6w2xolylzu6fwsjvuva1hmhmpzfbo3rjwq5y5idk4l1kd2pr69knsjgkrteg984ug79bs4e6fw69rg6ewmu0rbyuw31t88f9k6jhsk1lodtyi6ctd8ub1waq6606bmvyxyoiof3k97sgzg56t2b6tc715zdmo163sc2l0minhxxomtlud9c22v1g9gq7n98k2zf5kycpf4qtm5iu8ysgko228xcc1rwzdi8y8s76i',
                username: 'ivai8wxramn73g9lmvcscgvatbxczf8qaprqi5xck08m0tcngaiib6yep9fp',
                remoteHost: 'i3y3ei2cn42bwinqtr3w6upjfr0jdewro4t3tblfl8v46fpr1wv9uo1t6u314f2pi4ky73uobc3kxxirf66jnqfc3l7y77b5niqckrk01xi7tsrns7233v66xut2dm1mtiit3gsdxodk9j5ce5xtwr25mlhdido7',
                remotePort: 4364624121,
                directory: 'jmjjbgln4qgpptxwxl45cu7chd80wvssl2sm1ra6l05eupkwtp2b01agvnhs3n3uux8y1ku0lg478fxlc30t3x3q63o1cmrvsq6qrrao8qhbvq0l2cmjw9nj5x99tdiygcn7i98epsljezdcoet0wpi6pe982w1bjsczuhmfd21czvdfbmru69ccdeh9blevzcoqyjyjc3jhpiaqqsflvpbdi9a8fjvj6k11j9xqztpe8kg4yjhrdyz5xia3jf9n0pirhwakt2kwosfj6y5euuyl30bde48q994tg0btwdkiwaw8ucazrdy6ajvoh8cywpkgbbgwlp0du3qix6pgb3qtz755l4k142qhkohqzm91bzdzcjae8ly0iwuamvez5cjx2dlx9accwvfm2vi30n1fziezj549eprxpfzl0dalp1sh9mchvtcvufbdkqb1e4ray5e5kiqa4llb6efwl374n70cpn3w833blpzjstu5kxft5jpf12f5yrchu7nfrezffac2rla4cym404j0p2vcffhmcogfztqz1l4iov9bcn45e4s0rqnocb6iz62dimq8o1py5sss6e62dpustakaijb4qner08ojxmpg9osdperqajoeg1kue518fdfubw4ck4bys3r1cdbpwwyprw4yvkf62f8ycnpsqgzg78b0c0sg1r4my8k1jilnxoxzpa2gcsj54g5hkw34j62z3m997qf6zxq6vw7ep93666p5v0tsxp9yhfq2aobmawynd1uvm424mjp8jgvjoiebz6e1vxs42wn8t4unxnaqf0jg937iolr16e7zwtmlxojozzojvx7k9tz5k2cqv0tt6f4m9ahakswf5heqc74t4p7cbku2rk9klxmwrw99gnktdnek6fsp29c7vl9vdy2uxa2p469otwek5r4w1h4wyqv4mekzo2xcdr0fpy983tqxsy1o31q7xfg258qapbiwmj2btdm9lh242knkjpwb554v9irvc3lvdyccgvvznwew',
                fileSchema: 'pwis7zzo1k5zkgexv5xslzz1mnt8abac5mge8mdw9k4hsv0tcqsv04rrd3ej4s61v5t80ph2gis7iqknc3vf8lllx1f9yxg1248gbafk633xcejdybhj6mgbsxl6suy6ydy57yuwz0zpb95lnk0d0wbo6lf0ofgft0n9jgirmncy7n3k5e5fngijyaiazoy0le7vqixtvq6kaibv8a9a0d4b8pky8pabkqksiptc3vb6zc9t20lqduha914pi0y82i4t0g56brygl9hygs6lwytrz7qbduybo0o01yw7h955pbi03wfzr190q6s7mblmobtfhyfccjp3tbhu0tsr9haq1sm9e2xbdex7itt78wamenjgrvt2v65jdq4dpl5xptq3isah7l7e58aec0kt9vjoboxohs8ajs28vuedqs1vr6qny1k4m8w176tv8hz3ajcmgf7cpacoi11mxcb4vqhqsigpg7hinn7pdj5dbnwj3v1qsetvizptgjxizjt1u8rvmhcnctk8acbk2urjkokk4vjbb5c4dokrb9jvjx67kreraraytxtn8s6m9wne6rlyk294tqc9y587y6wiqtrpv2ffm9d8fy6xczm3l9flf8iffiw30gmdviq8hadxa42e5ks1i9ya1navd96kt5y7na9tqld07ucetu43apkpl102tgqllbpkb5k101gl5bnhz5pf0a6ac8ohf5qzrr21wpz034dh47eymgw6jsb2evi2owzq8ylfxzf6r30uftjrbr4j4jqk8scdtv2rhv4wlhf6rvx8i9e9zxsp2qf8mue3bcw1k9skfvwbyt05n135rrkt7xb0v1imcu7k8g8wyg5hr4lmy8jixsxbf8a7ml5kkbb1savo1pejgao9n4pfg4qcda4jqaewctv5kaea4jjuu3e2q7j2b7m2esecj8ecg8bzippvca14th1b10d35qhmz38bmf14ixs5fzh4d41f1awpsqn2ndrk4ieij9a9zhoflddv39nd3mmb',
                proxyHost: 'zo7x9242gy7n21fs2nz59qsn6n72a5d433yghrgk88hneen6nzrk8bist7ap',
                proxyPort: 5884080003,
                destination: 'keqdy40dosp85gvsani6wc3p99cmys9rypvh4jdj1u9gksjv1fju5yq6n1sdaf9pqe1tfobh2pt1gp3ntuzgfopezkoo3c0crm3i5u9a0mm3owhxc4912dl2x0mft4nimh29k1eehbnl6ktx7rqa0p0nvy1bzpke',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ra4o601c8f1p90pejwszi4ozvvfzjj7ewu41nr5xrv3il6gr6zu30e4ka8zv073gqzimzwj8pd6zmz5qkyx9hemfqmh8zcjbmjtulht1lyc45607zd45y6ggaqt86418bwauf42m4hvkqorkovve50fzoh2m16o0',
                responsibleUserAccountName: 'vazt2779yx5u2aa323yu',
                lastChangeUserAccount: 'ffy34g3u33khm0mtb7cn',
                lastChangedAt: '2020-10-16 21:52:11',
                riInterfaceName: 'gcf8oupfa0i78v5jd8vlk76hexlcp4ghf0fpo8k7hcjoo590xy1qxmrn2n83eovxkyd8kfnva99dxpabzzj7uuq24fix79qhki0tyq3soztom1igafbr4ps7npux7cjh89q89uf4zjzydyf2ejv3fh66g8a6zt1h6',
                riInterfaceNamespace: 'hzhgmex62xy44xvp5e2nnm00vn53g7nsabz2ok8e2j7gw4dmxvhuevwd7sdr0cecffcs90gpt46buznlatx7asc5nfix72sk713yheo2xjugvr4n47bo9k761pzb9p01r06rszgggw6chatt2fqg45t4uaefm6p7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRiInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRiInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'rpish7obg8xtslenpcdm6uen7nc1kf9h4thls2b8',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: '6vhfkmuftd26gzmazsm9xqzcsuuv7kcjo92keds3ldejtj5vwm',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '352mfdb97z4h04pmmlcd',
                party: 'u3osjhfl99it9qnb10z7nqmqwwt3u6gai25lwpllx3cd9b79te1cbimoj2d7oemwmnrjbfvb67wisowcn427twkecq72tw5ha908ur5jshpm9czshjbqw9d5t0qesve4fqrla5py44wzwkemc8bvpipvi6x6r7wq',
                component: 'scw38oqhghqnphifm1v1clsfdzobi01bpuvb6tq6d56fia29f7ib6snn4svtkbg5jzxyukjtheea0te1z9z81ewye15kdjjl7hvue0li5wahuyl3yi9te7rcwxu05hzerpr0w32c7oh1kd659ztp3rxs4vilzrzv',
                name: 'x9wpmjmi7igh5wh4ett0k0q0br1o3vqykcpgfuwtfmmjzjry6ovungidwyte47x9qquoyd93p3obxm9vuimxq8ndduijcjrkpd25mfo13bzo7tpqqqvn19ns2zpb1tij9779j6jjye5adehsjzkmc0nrye9cv7wb',
                flowHash: 'qpqhgc62yeycmtw4ju3bigy6sgy6pef6ou1a7xoa',
                flowParty: '8wfvaggy278vfcy0xol6uoes28hk8wvz4zc3un3low0nqrxo108rboqerokuf5raf4zn3cfzoqg5pj3xr23w9iip9sruh3p1ms5wzi6a9nyunqwb0axs3k7fxjynb34qh32i79w1myx7ba51vmffhxu3tcpyck21',
                flowReceiverParty: '0585f6rdpnjkrljlqqgai85ozpn8xde9io77b9nbpn8ioh1dkymr1d0ns997c4vzgal2j42e31stxlkq81v2bqukzw2f2upq0noh7a5w95feo93zjojne9gg7f97c2w9vxrtinka4ko50ibo7la5972zayouwwlb',
                flowComponent: 'jh6lh69fj5xyn8c0mprr8udm0aa4iesglhydxsmaonqijfhhian2tgy8j6ckf9newco0y1fpm0jdr6ozyjs0t6spdpx53qpsya1dagflywj2k9ywsi736bq11zi285dulrs26t7aip03pw1fx8yrw6fwuvqm4zjn',
                flowReceiverComponent: 'px5y9wbofxu59c2ljmj2cgp4k1ixtw5dnb5a93orxuhffiooqgrvj1e7rz9aoyhfwj3pyum30pkwg03eluit8r2l6qebk504ntwwjwua2rnekx7kysscv7x6dmq1w9uqddbbuc5xxwf94ky75odfjmg47logt38h',
                flowInterfaceName: 'afaw1a6uvv3fnahulp2497wjvsrgtcd6s2rqj3vh8j7feuv9eycgg54wzxhf0j9b5xwqseky3gi24rte927fnymtwlcuc2uu2tjspfwzzvjrdvi4feb6zruuwmzz1j8eevmhr80n0a4j1soisqkuc5fcia2pjs47',
                flowInterfaceNamespace: 'otea08ko27oqz6xmnp9tvoqw9terl8uqr2ujury19ob4zn7txqhqmq90epo969i9sikrtghuo806hm38n8ig42ityyy6mh5mk0t6ozmi3byaouaj4p7kiy85da5uoz3ykd5ccot55vj34g40vg63yqgt2dudzws1',
                version: 't09eum95j9omky1uk4rx',
                adapterType: 'ph4hj2ca8f7az3yrxbf83yrd3os9bumlairav011oe64ly632s39n5y3r7ly',
                direction: 'RECEIVER',
                transportProtocol: 'ojg19w7k4w0f7x6y3fxarvnpcabbrrv1v6k2ox6p601lj1wwxskr9xs4yets',
                messageProtocol: 'fsvg0uhcdmuskdifitorg9dp3ea2adik5qbzewyjzp0y3x3qu4oi65xg32s7',
                adapterEngineName: 'kasmbgy4v0c84fphjq0m7oi9ls52prtcngoqkk3cevf59yx3mgn4kxorhybu5pjrh5qu3nr6vv5mbpfnb1cu60y09xp14l0cahscvms1kereyfcpv3g6nnazqjc6yo7rlekdpuou18lcgzce827qeb3904p0l5na',
                url: 'kzec53bh5qe4ao0is1btmhpo6fxtt2tcog0eekzuujfd9svqakmu75u9zkd6v3llr2qt1vzuo1a8qbvr8k73w40rx2kffxskslt924xiddwec9229abp041myoewhegaw6bdyw4tt4yorf338ptu7tmei67o53r42d7pokbhqu25wtupda8w5z7sma7rwc650iq81xd9mq6z2qns2e5apeku8azn79n3u65f90z8dsxx9s8m59y548fn2zhoo39wcltin7h5bix1sl7d0zusumo29jygn8vzn87dyi9iw53p6rt2bdvshhldszm7t5sm',
                username: '3c3xkrp05akhcwjqig1dlx4oepez69hw1i4ohao0mt95zvb8iyixybvbpk89',
                remoteHost: '63rba6itlxjc8vmx3nd69bf23ctp7y9i0bii8cupirsrnqe178t4qpkl1ddzkje6gr7it35pmivf2hlg7w7o214enyejowz1qyc69uhi9vhrqd25hiqfbz0tg9jlcwe3xkopsb99j3nlr5psrwhhqkuh0t014jqq',
                remotePort: 6980937773,
                directory: '72lkenxbm9ibw3pychczgssqxz2d67a3q0m8uhczg0m37l9sqto1jck9alow7kzs5ka5keromnyf0j56kmvqpkn0rnj63ttve8hsvn2ti9q9jtsnuozh5zezrtxo2dqo0kxcumv2m6yvjyix9c8wcvcfhgcgosd5f5vq34znza8m3eognt5fcm795xlw16r2soa4oeonqiy7hdqk3a2dlt5iocngrc03lykqz7vw2835mvq2g7p3oejm4a9j8qjpw8nz4yniw6gem7a1egg42xb7oaiq2tmjsevj5opzvocam54ek9wwxlaehnvkyku3zsd32yx56i163x1o9ddg0utfj6096ulsaqwat7t2rquj2poqydrb1ntg0b0mk2zlw9mg9l7z7tqlyyqe931jj3m1vq4zrnowznqsf3hxwmegf2u7xmaeec35xctox8a0p7tenxrriqhc3uf4cbfsjal1x350pg1f29q9ng59zy84juw9w5s7fuj2yswx0o2n72lx9i5qyl5c8tr1bl5ogqzxeuo110hk1ovyka8ancldoww9zfpdo34opbfdj57lbzey7rybw7e762x76w49yyz20pbojd80vs08378f1hs6dgnrckaf334dij1plbamij5yqe2b790ij09nbmmw9grh1a39xdfxcfitp82qdgn8p3juym4sce0jouhnm6vy9ma2io2rm0btbz00xj4bjub8opykofcd61podr4fpxhy97xl5acg9irqw5llosjm63kfnodcz0ba6672jxge6rk4tuhce8vavtivy89cuf2ke1aujyhjqjnicp4alga7b2mhyrj5mxbvsfrxwsp5naki9wxwapy4agt90rxekjlq5qf3iw1tks629ime8lhigkzoz4qx3fsouugs9yfcwgur77z2y35r6o19515en6m242pck75q6byewlfkagd5imy4hks8qj5emurveszmwsrqhb79rmsqyrfl3ksovanrl173dl6pgzxgf7gxhwvo',
                fileSchema: 'sldzj68bstnh5jet6vf339vx2lmxvrvcl8rco4xzce9w02o56q2gcy28veyjoepabng412fx51f9x5zeiftqlzhgc7jbbwfs37n1vwfdxcanoos4gvdfzw4snjrta8u0yru3okd8zvfe4t1dbtkqgb4marb9r6c0ikvksby8nvu7qn26u5003ptqz2t6lmdm3paim19n207qkue2hz9009wodyzrnrv9lxkrkp7euld8dyix0d8js0p97eyizfimby1uvuumq44k31nc9infzl3jxbsovlv9a5xnwsphim83tvbiiofyd89ucvlvlorrwute9vkqcymtmcnnt0t3iy858vg6s50uq56s1cgcw72rnl8x6nvp15f6zzoxy0dvzetlj1nns5hwom7zes34iveeecpkesfq8yre2uukyi4tq8zm946eajblvqnspvfszh86tubcw8kpmtkkg8ov7nhmg0x9qpzurnhrh3v1cl2q320108buviqp353q02hamx2skqtgu6fj1eitzumlukutpf8pr1t88xwuotr4080h22neg14sdo96cm3mrd0u7fy99io9bfhagqax3wdwkxxaxnvgkdbof74px6wfdfshu61mz2c8e3n2o626khyj07v1ny3wskoweia2x6l1075f89q1sxa9t803maxibpe6xhzgnzot7gqymjzrx5xkxnxe2gml5qyp0fmsx672ynah35px3qqr4xe2h3xonsabadzugtezfwvdzuolbbg4o2a539zz5fpr1dxlc2udmd5wlaomjikp8oekuxpg7z3ep3zc0v0rt9pg0myg8ndwtzp6cpp7zs95wt03cjtp89gibdaaotvznf5j7shg1nwjmpm75d7pyrm1i1uyfk7bzsunbhvdardmdjj6q43pc4nhm5qcjr0ot0tub1vqdjem352yc1ep188ophtfzaw1qz46lvkxo8c4honf7i4i70nxbvd3pa9cvppi64as4pntiip320u4dtlwvesuz57e',
                proxyHost: 'vp93xxgxm37jwmqly4g4qmlvxmozmkbt32lgj9n2uco2v8p1zopri4pfrmjq',
                proxyPort: 8687066672,
                destination: 'zog644g6qk1j0fwplxxyis7xtk3qrjcsmfyz7qpnzuzhnmqtac7pxjt9zafwjzzdea2v2pfse7tdlx3vyvh8awphzmmq2qukr034s28y6ovaxpsg64jfk1i9bwjdhcfbg147pok2iyv75sdlv1su4fxrd8ug2t74',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9lf943ugyjaevs0uph9vra9w8vjny4uub64zlpn1u6etj4tfoyf4252nwfvhni9w3cc9w5p2ffa1d9am7h0smfrfd60fa1zjoz3gw3cqlpo9m07cy75hvxu3nld3cxjptn83gegikot8ux9szo1wkki0f6w79t6w',
                responsibleUserAccountName: 'oa06czmiqnf1kg0w5kam',
                lastChangeUserAccount: 's6191ceqq04est6ego99',
                lastChangedAt: '2020-10-16 15:51:37',
                riInterfaceName: '3gir5mtwiqz0ucadwudmrj39dpv1hedu7r6zkqgxp9wh7h3c6ipdotzeysw78pr1gfj38q4z8cc2ot39lb9jbpeqvllyu2uq5ycjlejsinhkofc99xn2j0p7bzjiq4ip3cjjizlbwmb6xl4r98gbzn0p2zr1mirz',
                riInterfaceNamespace: '1f9od9w181tw1elub45rn7ou9nlcr82hpanu2cv5l4n185cm9t880uz883j4jyjidlh7pqyrcejfexy7ldw9c8jvximfglwbxxg5r0mkes44y92qf6qsgt1pki80opv2dj7y105rzw91cz4cbf8x5jfh98j80us94',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRiInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    

    

    
    
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '9qzk17zfvyfydjeg54hoecux6mfdefny4ljtkkge',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: '03vxqxqp2gglalp1nxnytxiz4szqdi3xq0c3njjwnicl2rtrrm',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '6h9dxbohedygt51hx8l1',
                party: '33pocdfm0kwtzssrdnblupmg517w81mtgdckaohk10n2gmjeb9gee15349sss24q1hr5obwrw7nkvhc7illv75vwp7ndm5h377q9edtsserct3r9xzx2w6accfq1p7dy1aj90pmcgt2dm7j30v57bm8xo493126q',
                component: 'nkqv7ua6f3r4c2imty6q7hllqw7o3juta0r8rjw4a0yo2dd6c9y7jabbpi4ckloyhgcumak4mfy2zn3fj1trfu6vlcziy3t0dp3vgtiez3j9bbzeg8uovt6e26zyzmrc9gopytenbwxvhhi2e7ezf498syodcj0q',
                name: 'g7yig5g0e9cxughh78vuxljchdxmy5hj6oc5hpxncgcp64lr2hb9db5bkpf1axpjaziqlklfopjs2abguzvojxanre396pgvyp6q4qocvj4rj5qm4m907463770f9fu9w2lvk1mwo1ee35vmpe6bxqteousa7pyq',
                flowHash: '841c14lke7u1ugw41aurjv8wktx5rmn7ixg6boy8',
                flowParty: 'x9ox9887zxri96vh3k5xjv28i6006wvo2rncrdge4fk29h85v4wk0izw5xnz8xhtepb0nzphy9qpzkumeoo10q2at0sxlk0ros72tx18oebx70t91iclelhpub3fa4s970uyse03kn9e9qdiytk2pux7lsc21ud0',
                flowReceiverParty: '9z9q5lzc6jswcf423jo5uvv441ixwqeqtev0vxr1q41lk463xwk4dtzgvhoyh90oyp27357y4vlhl3ls5nvny8hchn2rfzrpp6gtrwzmokmmuaylfb77fezxdzo23g4glxe234t9z4b7tiisnryhm0rrozwa8shh',
                flowComponent: 'lqk5ltnaxrn7j1rkgek6mxnzynszba5wiodg71tg9bhq358ockrzw752ylf03163r56tkjcn6wt1cw8lym4hq7jyw7cfkdp8vtwcuhvff5wwacymb2zjqyk9r25ajn6f6xoyhdsz1mg9ca3xmsr9o42er8z413w1',
                flowReceiverComponent: '9zqpvhdfse0abnieoe27duo633iyi3vxl47nmzyjpka0if5v95m0dplg90p5cq7wns59svx09x9frzldi3a2xj67gjvp6kltm6akir4rmg4lj8ndgwx0lyyyluj7cpi4nkhpax503ycm9eyms7b8cz5xzheqmdb3',
                flowInterfaceName: 'bl1ef06u725v8j4ai1q1xuti3r55op2ct84coshswyurzv4seonouzzq9l6dj8q9ucwz9kz81kcwwzx0lwlv4lhqpfdxntkfu6le99e2wrtgqr68134fvl7tnw3f60xdv4yj0wa6rhmyrqit1p5ahxayfp56xsvk',
                flowInterfaceNamespace: '62ahpba1vuuqwdn1yz452q2kxol28xhg9cmg64vqkil35y2emzkkai1y4rla046snr758trj01hd7gak453bhcm4bbwe2fdmya5hkubgj0yq2c6elq0yr32hmh2lir0c8qmvlzip2n9fosbroa6dz1k8v338bkva',
                version: 'p31hwbd81g5hfehvriiu',
                adapterType: 'wvo5gszse9dpwa17vr00za0ty8qz9v08st8f4qf9usyrrlb0nxpxb1ubfts6',
                direction: 'SENDER',
                transportProtocol: 'sgg8l3pcsfdsli16f62uw3hxea0yjiwi089wourorwgxe4mj0izina9ifovo',
                messageProtocol: 'f1y5ur1yjjf0szqp693tgq3n9suy871bx03eid3jgt9zx0937k52d391kd8s',
                adapterEngineName: '8ut4s6xlq8nnshfvan4nko1xwpxg1lv8mr7yyqux3iwegdrgexyb9ghde15tkwpu640zrcjsd1wdwk7qzrnbs9133ifez88902lqchofaz5q9b2899rp2uvtuegumbhs9jogubaghclbnjdli8zadehgz8ozhehd',
                url: 'os9hrz486h97oow6wwxc002tw2lfhxkz0x0abjd1frtel4pqoscrz4p3dvmydh7ja94yvmbzn339nwsr4my87m74d01obw0jtktuwnr0psu6alhmieogw7ahubnfx8qu2xkq17fmc4fnpwv6bkgousdue2qwzmzaqjhi3wdubuukc3hd1f0q0jytkxea8mm5a5mlt4uvewhm2ndks4jupt5zxnpd5n0yuzj9aboqfzsuss4a1zbitxv1rvxkyjc9rmxk85n1hbuyyft1s32fuq7h6ob6rzkmjijkpkwhk61neorkd9gjqwkqijdzqqvc',
                username: 'yhdbrm1l3x7n4qtbsmhos4hh7vthpgrpxn8dlyh4s967lpxaogs02c55emkp',
                remoteHost: 'y5mnyx4da9krun68wlsymt57e7abu27o2fx19utvdusfy75rj1yig5fgo1r2r1lhhklyglzkzaqzfvltc41xvxzbdkw0p1brxp761zqucpljzlgskoveew6r1fxb13gu1oai9jjdo88ep2jddlnd2fr281x6bs09',
                remotePort: -9,
                directory: '7odz5s7ihmguz1p7xgfypzukws7aa7f9oudixrnjzzq98uqixjnr77nreul08tgx71igqja8nudss5afm911tl5bt7yqifpnr26uyfmz0g8iois1ybwzvljjbwcpt7cbvoo6g8om9aa38vv9mb6ws00jvrpkw7jcnbevhvtk1pd4bf1ir4mou3dqtg263f3y4g9qfpx66n589jr4gx9e47uhgmuykeepc914zk58e2f39xjklexa9244udzmu5vhdji1sxkeusibqmbs4apgvegnq93o0wz9l2devdt799ozxiw7cma3ya9pr01jdann6obkupu3dp2u0d7cw6eeh8mcpht41ytdhuc98evrdpy4a0093b135xeikcyni3aiv76757hityfmp71byx47kbyxuh1azdvwelebxjg996luira6lgo7npzi9hn5qdq5p14g9j726rukf6kgil42dfar8dhiuf3p4ken8zs6gp8zwz0ogkbtnh1wwrz1d1ckp1bhdy3png3sf90rsliy91t6nsqeiuewyglhba9vwxntf55ns1lona0y2trhyzrhlt14x3rhdahv1ryoe0rbvcmip6qcodiem18vrgi2uran447rm2d4w2bhbe7dzmszlq1j4wqzgu19inf2l0fewg48sfuncs5ug6x76sm8bfdk9lyt0tkwl1lmxhfz13c6xno7gz8bzujbzrqwxt4axdmyqzxf3mnjmre5pt4gt1204ngv1ds30lfkfpa5u4vo2dm4z8vopuwr7yq0vs2ocm550ml60za11kaqxvp6yllvwrzuskxz3q4ukktk2vxf1mg53p0t5ogcnsm11hbnyoqkaruy8vvaez96swfap3memp7pep7hx2sk6q87iigd67nq04e905oq2yc0r0sn47v4pkijcfm0empjiw0y7zpstfongbrqvswlh0gztujrce2wkovf5y4xp5gqwq0tmge7183ezfdydou2kj71kuj2c04kq2eqvj3f8gqnkwga',
                fileSchema: '5qjfidrkble8bw3zscr8ytlmnxn4oaun13975f5gi9w6diye0a76z9busdzxujfdeuwixcrbpzwsxyigo6b2athdrvinc87kxifb7m0dikv37v60zqlb3y3v5rvpfptam6nlwcx1vssxnc0qmgrz5gvy4evridv2dpl4qscnao08rk88uvtj3906erkm7lzpzizpss4xn00xnpab0i7qzuta6gjw6gzi8kq42anotakfnam8pkkp3aorlm21ehbhrc4j07obizn7q3lzicp1m4zn7hjjy21e8e4swwyktat5ckqdzj03bxlimcj407u0hbv8msv2bdonypprzdegbr7rycsyvnkxg0eukji9qh3fp5d79mkzivw7mo0vuank7n3odr56frn23liv4kxbalibsmxfel4h3px5rqkty9odgxy4okl37obh1cynl4pnocq1y7cnjyqaziowgm08y0ywphdborljulvni57qb6z3mxn0v9d5gatkb8dyqe33mmwnopf9l6gqzffkdjvh298vg70iaf0sq29thoxrecuwfbdh71ddnk5vu1tqiaxxlsaee8187va21xgf5jsf1ixbn8vmrhb7f1emzm2a1nll0ua5gzg1vsucs3k5egafcla3m3qepku176kyetxjssd5dwkntt7qd8xrlcyc1v5j3nhnl79c5x882fcu3kjr1x95bbds4nvd5f21mmec4kszvr97pyun6jnkr88wsw0b3znetzojfkg8zvap57990ht6d2h1p8gewt9xn4hec9c8z4ss5ip6yvnvh2a7nzko3bu6yghzdom6k3eb01zsp8j4nhlsw50oeivh1vrbzgqh880raprpa4cu1io0tcbmun67eusjm4szm9ehqib9djgx92ywnoy8w43vynkhn4z1ufj8wv45z6ii7m9ejvf8fv0no6xmmnpc39xar1ansc5vgz314zw0zrjl5a44k4iyoj91crakj6utc027dvniugefz8chgmrz88aof839',
                proxyHost: 'muroopn3vecr1v3zbh4gd377n0x3se5g9vw5b4ldtij4cl4y9zjc09pxvepr',
                proxyPort: 8482587521,
                destination: '82blt1445vtzlrj1llt5tgxrz9mkrhu2rep89z17rtwiv67q478sz7fkawhmizehdw0cdqxl1yb4cmit6jt1xq1zdemh5108n4wck9iv1hza3ffqrs9qgf14x7w98vcte21lsh2phu9ueh12y27xlcuwcel9dwc0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'w3n7ahsc9mp23kcd1nq3uadnmgbmonap1uo3svvzx5xx2jgroa3dz7xjjiwrk03ry6ivy1i2v4oq7r5o81s75bt2z7xhwp09su8f6yfsf39qyi6br2kfvs48wqajjtrzephevoicdgu42wfoxaa7llgh8wbf1fkl',
                responsibleUserAccountName: 'wrqlzt50olr29b3lq1z9',
                lastChangeUserAccount: '43gw0pzx7spr1piratgb',
                lastChangedAt: '2020-10-16 23:13:49',
                riInterfaceName: 'gvth53q7cwtpxykoqrj2lego70mzgup6d9ao16eh7mbp4kpf3tln145vu85gem99xaiv5ekltls2zvlx98daku5zifnt36tnjdvtnbarpvhh7such63elxd0p0slh2mtku2he5ep6yuv6idrejv77kjupyjmrsnk',
                riInterfaceNamespace: '6wrrjzxthr5ndknfpzn07rfy4yfd1803i1fw07egfdpu3c86y22fl7shb4kqkxafd1ge46yas7dpa3v5itv42hznq7lfyz61p4q8no06asrv0q6mtmfk6z26pszooovm9mggj5b59bn2mbriv0y8fkabhi53v6me',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'lf8ayrilpshl3g1n4u6re0hacn7m88hauyp79k2b',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'ur5lenzyfcx9f5pixl4rxhas0ptc4oeluem4240ixmx1ex4jg9',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'qc35mj5mqtwhwppw1ctd',
                party: 'izi5w0m0qnl2oc1i03ojtmkbmg50qtmm7sy1g3m0kxbddyb3491bb5lsohxajljq1tvj0hw1zzv6m5s9ehrnz62wqjd3rtk3vg5tjrhl5m0xybb0v0zwca9ar3eu8rgqrmj0h9tacvcnhrll9ac7gul8n6h7dbpq',
                component: 'awm60ohxypn4hevmcs5mkubv9wpzv9aw9t8ffvyyj7igg3rvyt8xv44gwcilhlsobc95ybd1l2cmk24tvuf6b37lwio9dwt9pt332u66mgj1aarxdqecvhs4parnlvdz7iphnimzfhetirvhifwlczqw69vkqml7',
                name: 'noojxvkpkq2q30m1daodjomj57tho7cxz5reg733w658qyhx7vnu1zhg24tjfi1rshr8gj5n074ydsq8ore5y51804d6e4yuo5q9zkydluw5otjjar1ya11p7rij2wfvvyxr68fjntrbadr673dbjd809rywybti',
                flowHash: 'itn6j994l14w37tj3inu724zml8borq5flnhhx9r',
                flowParty: 'e4lxtcum109siunvbrj8jycl1zq9b5rt5z2bv77h30nzrl3enaoroj1hg44pujwtng664sf4n61whrtxdmhq7grl2t6ou8n4kpu5p0fgptdrjq933c54kj6uz6nfyzdg4e7jyjkbq75lgn3o7qvhif6pmk5y8f3v',
                flowReceiverParty: 'ffh3moqgohmz1ygmajaemmcx2qtup2sxyzmnlb58iosofcrw5qggqqqmtf595x61j6xh61ug1vi3kby1ajps617sy83cgv8tmfzugi9axdl3p1urwxa3p9w4lslt47jp4e16envl2yd2a915yeepx2pjbn6hhqxf',
                flowComponent: 'li68mljf6w5d7504v659x4o2pklaem812kejjeocuv3nno3lfsa51ddkm2sfu1gwtaosjamv4db910vrvf1x4sxnucwycjrppwasisiwuze5mdjtu307d7h5jxxhyp1f9655vcrkqrfer4156mp8hq7eueqzbomy',
                flowReceiverComponent: 'jcpv2d7nqfzlidxouzt8mb0ogyobr6qf4vxiqaxgpo6rz4c4zu7ayqwc2tnbzg122adicfl6rcsf24bix3tvrwlcrcvbgx5pucg1tzrytdl076z939brecxcknzmk8s9aktut3xvquq4dordhuop3nhqoac1xtvd',
                flowInterfaceName: 'o08bitcxlbhad72w5onjvblmad25y4077a16auj1vlkgbgxd07om8gcfnmjv4yaw2nhblqrs2i6z320k27imlshdncxt6zuo7xsvetrq02ktftki3lr1cp33cyanxyhehe26zmvo0txascjpofyjxxatlhxfr3z0',
                flowInterfaceNamespace: 'u5iel3l98hk8uix168ix694f85j1o1fgqh6lnwinvnim238sk9rtnllh99de5wdt8knjpd37q84tb4px1v9n1fyst8jn17t7983s9ur3a57y11f1mzg4r5rxbau6nbekytxbzb0lopkkym7m0emc1axox8z1yxfv',
                version: 'r29pr9zzls6f08kkrog2',
                adapterType: 'h38aq4sybczw3sdbrv9jdi88xxp19cevflycix53ad79605x80z94zk8y50s',
                direction: 'RECEIVER',
                transportProtocol: 'ba6wz1o9ejzrhp43eus4fmwcnb1ndvqmpjrp0jyqwni8swa5inkpqw4hqjia',
                messageProtocol: '4b5vxyxdp5wl7qs9l1rl7i93bc3avclab0cnz85742091pnpmr8578w5pvr0',
                adapterEngineName: 'lm8y4kpmljn0wsdoebhx00d7porylmt9xowt0awllq2auydtossy28m75ctcytt1406xoexz9n4vqg2bsnfchvrj1k3z8clv1fh76rzfuhi45p6ul3oatm6smuzq18cpiobga2env8dc972r77h3g02upal7uxpx',
                url: 'sl7q1jnt9hh67ldjqjnymv6rd4th8d771s75grj80wo6opnfvjcm33hp3u809ftqnfewk2aturjx8n2t2lrr83lw2cky6psn3bg5r7sjbpm6xijf32hearjnzzxwl48c6e06zsq5j3szrxf30qg0h63iic83o3duvxm98knsdmwbjfxzajz9cthzmz0zcmh5eqoevum1k1velest432ot05xne1h52puvduysnq53l506egqvt2aqa7yhh6hodky09aeo8kj42xgt4jdqc84z4aqjh57qrvvptc4gc4fdec4xjjj0cb46v6ibfrrxq04',
                username: 'xza0llbk06npawm2egls4a40pwrqa89kf97b0uo2ijsa2fngpn90zyfyl4tb',
                remoteHost: '017g1elnsg0mltynhqtexfqob5py5nrj6j0pafpsnhu97ws86suc5gruvmauc5notf6q460kf1b6m8verlvl9d6cz604ap6hh1wndzuqc2i0oz0njvfy9ba8pb35jxy087fgush4ljz06lqyh4g36jm78jwltca9',
                remotePort: 4170223280,
                directory: 'jc5jeze9wosd4am25k0rlfndmwzj23js0757ksghdej1uy68p7oga5zhvomluip0vnl0luvy9y0fbsq5wki2vzobyqmxpwunuh3pa4nnrb0jagqdpua5baxfc0p7rt8oj6lswie0g6ua4s4k1ce891v0xa9cf2ebk9v7loiyiey0odvs7rw6149g9fybpwdmhj0cu40ik2t5ii58yhj8yv5nl321x6wd4mq5fdpauj6w8nf54aiudplawdulnveh9sqsln74k1fhybhlo0fsyga300u825j73b5r0xnca1q6v5o7bcg42n8oz2s6fiorkf5l1kn3q99dpdupn5jd6gutj2etm7488khq0bcurpkpsvggqxjz7avotk6tuqxyrx268ac1ryv5p4h6kfmfjp06z7xj524nympq1q5s422g07exl83ezn77xepathfz871padljrdmf5be0th9xojkb6pm4qtwtylajb4cql5opgc0e11sn8ebnrk9ms7v46q1pilk6xbp2qz2j4zj6yv6rc7di4fep7zq1qjztrjplpg9cmap4s006gag41ljn3jvbbepls6ugat1yp6sscuwxy90lswr701z84gtd4p3edr2xyiojj8vavz6opokp2bpofwz8vwqx1fevj3jdzktzazraagsf5fzyt77loc29pdpa5v3tjq1zeusrqo1vgeura26v56gqwlxxza75rm6hqy2730ad1ikmyynlelchel1cj70a2bu15gmy62jatkym7rer9hag203donvr6bphw3bsgvk01h23btqh061y5jz0ioe1vizc97gzz0ay5yfacvh2w62d1bmzkmthghxu1wl03u9yen84xzoa7ax38dxm079srd6g4aotyeeqsmqiqt6mu2zmbaal0y9q11lg7vzn9jjc75igrkh05ldwpmsvqerefyp0tvpwlihq4w9harhob3ps68wumhm0xui6eh0itei7teg9k4kr0ahzejdkgo38kt7oipnvb3qy',
                fileSchema: '6yh0s1f57ot0xwuloa1t06yqzfwy1iczf551kyx6jgtaml1qyzn7m87a1xsu4ncx2f5muo9k6dwgj2k624lirtxh2t8kzj4m9d2oe428i6lucls8pddwbw27xwh0pgehkkq2l6n97c8c0ljvzu9c7dta040wblaqqgqx1k3qm6nx2s2ug9fet7gccfw7qdwlgkgldx406zb12ek90zbgovepxxuw4e9vhmri9n57kzfm0v5cnx2bdboikq3ydjlnulyzdv4gktoscdji17aoywue824mtvvcyykop36n49dhdktvh0ahpv3zz01k5086gjhz78k4pa0o9rxq9anmy3vor0w4r0o91f8cl9pp9vxzwcijntt7t5zrd8a76hj2mylskz5l7xcwl43egs7f4oiailwlzu8ju1lgmlbra7skay3uu8ogzv6vxj821nuxo7rw8vc85ud17ozzjnmntkwt4bbm611kibeees7uqjuksnyyq2piwtjzkueywhzxxjl8f4siqnh9vgrcr4x8pltyh2qr5yx3tjuontg5r7flwm8ypssfeo46mhl0crr92mwl037zgp4depdhmu0pbw61po92njue4n54yhsoh63qh8g9skgpftuyykti49pg9g4tsvu1qxhs1mrvtu41d8ti4uc0o6hsyoequyyxynmpayak05eupew81xns1dfgc0k6fyjcqqfps2kntft7ew0sih0rrj4nj0iw70z7mzutopwbjy1k2hm9tfm2p7sy2m2obylltue2mj36qfj4oopj585mcx55rn8arsoo4fo08o9kyvcezqwizsuutnfn5hs60eq9ixwhi8nffy622ln2pz36ysy37ml2f7zl5y2h0zbloj1wbrewkjmhx82yjvywfi4rkm8kh2eecy4au8tivw3dg3riamqcpuc2t99vx6zr53y3tm9r1qiomuhdkbr4se4d3ubpogne8je4ybue4gdsrukze7kt0g3trszvvtxm69lzqop8vwjgtquq',
                proxyHost: 'l77sifazg7q23vdc2tkobqd40ntp01kmk208xp6575rha6v42ejkn35zh5jw',
                proxyPort: -9,
                destination: 'y9qonz1rxqgr8snxa4swgq4lyyb4re91iygn31nzbwr8rcpwp68o5gd6snsm38al4wmrs8rpxp5ed75sbk027xsodo8k4jldsxscbl9vnzzz33kaez622yd7ft5lah5f1zrmwa3yh0k3zpuyb4qjoalaiu6b0vkt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'g9ckxlscoj6kfb4elawa25keputncgr37n1wtzyy6ww5b3uf6if37qftgnq3nhhiw3nt5akdfv144edan5c2sih9e0qhmxupcm7uro8qal39btlczdvz52ufte0m90m05ofj2tw4jq7beix7ryusdk2cq9xbyf5u',
                responsibleUserAccountName: '1el9xfnsqxiklw159lls',
                lastChangeUserAccount: 'ozustpga7j7utcoal67v',
                lastChangedAt: '2020-10-16 01:39:01',
                riInterfaceName: '8u2516fljwh4802tlkqtddqzfhgkwmbzduzv1tdiijzrqvug8caccj6s39r2yvsvlt0a1htpcg0pkotg0zjt46kyhmq1dyskwhcsroo3dgdjwzbcljuashksej325wyk99kz65nm31ztpzk1sxaat9hcuedc8o76',
                riInterfaceNamespace: 'n6hbmw1ih6i9xj0if8o3m93e0l736wpcw5reaeb62r7fqoizspdvykafq0rjg43qntaqryumwpwuc9iemj8ll278cd0twrhv36okdimip05pvpl8lj61it5djvklu3e87pgfwisb2r6w4l4c9tgyx5g5y8dwmbaj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'rl5i5clm2ako3mytg8xbl01gfszwoxkmeyp4nl1k',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: '4tmykmgb0i7d350heimedkhvczzwiai51v92wzsur1uk82la72',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '0nwi49yaggrksunptbqw',
                party: 'xet95eont7ggviz2irhfjsl8hl95lgc5cns5v2r4abywbmcexbcj7ib49kkuuwip8zuu362lqqb0gonwkasxdyvt9ee22sqo9csk32navlsg2ijx02cdz8cnvzm31lbbjs11o7myu0iw021kvi8qdk5t56fgat30',
                component: 'e6mk21hybxwwyiubkfpi3m97r27w9fky9pc9f8j0rhxua2us39eckc6w8cmglo6vj5etr0ptu0hw7c1v48isdfjhrekp7m4vt7nqfvlnjkd41nyfuhakxbry156csjo065kdbf6fyf7gt5jwp3fqqqhe6szpsskr',
                name: 'yw008i4jsh2b3omcrjhql1ggsih805ue8kvgi3xamw8ascyjg7qbtliqv4timqgssiuefqhkp078yaf9yo5s7keu9nla080si09azxy1endzw3vnqcuvswmoau71mwbgtll23i1x7rn59c56boyuzgzyekk40qra',
                flowHash: '8xe74kljt8r7d70zno7jpjpie6rn6nif5di13r32',
                flowParty: 'd3kwzb73zf3oi5x1y3a2dk1xngji4ju1i0pp0440cpxp9d1ujetl1dhfqsfbx0xn1purz86n0pg80ksd54heee5rehskr22z1j9eojnjmqbp1e91p6fflt0ndcpedppzl616mea6t1qj0l4vwyscaedh6p0ap85f',
                flowReceiverParty: 'u7fsch9h83pl64hldos3gai80dnw3brx9m2qjappcgdbc6g3j7uw3jrnkcppfmt7mtr9zvkdch5ltfws3no5e0p9b0myio55bd97nv2d8rz45lcl0svjdqu6l7lugo4rt5ssm7x08vnxjl29boe7lasg4ujo8683',
                flowComponent: 'szdllnrmgpwrhwyu9m5qqdu3t7chczr30dpkc3d23rsf8wjpikugdmgp4qw5hi6tishq5xihpttlj9ovtmaza2kz6kh00ip7lj6hxpq7p57vohry12cyoglwkvb8wjoa89lvug3gtirvvgrnqct8ml8gboyxrro3',
                flowReceiverComponent: '2cl27ejfaxi9pui2sity7amcfpva3q9m5oe9n3b1iogz1vxafeoe1ojcscvz1fxa5cd7gfoop4wg83tviucy7v5dvpy0z7ihhm2ezatywmis8n6zn4skrxfbqm0tyam1fwy8fgfpbmtlalrbho5qhyg2lvq9gxbe',
                flowInterfaceName: 'bqzz0kfxp1gjcdjuem085z6gl1u9w4cnphgoov8xqzdrwck2qnhky2wio2uxc33a5qk5nuvgr0kvrdui4jm54gwra4vvqqiphsoxruuivt11572e46edl7i7067eufxl91zybyuiyd1sve49i42ygrnq1v4yac2g',
                flowInterfaceNamespace: '3v3gsojyztuhab7l2nfk2jr3r3mq9lbnqnkcupr57f1jn2mtosisdnl9mlu18z38vtt9hbj8oxbrweogw1fvy242a8xxgaztmao3834tvmko4vzfy5glyv9l1ou9u7fglahdjumipkydtx563gfk4yt8hx2n9z10',
                version: 'q2z0em02n8y64ivsl1kp',
                adapterType: '74ars1eu72g4u4x2flmzpbm40f13gu4lzgj3b5faxmpw6w6ifgyuasqeqrq9',
                direction: 'XXXX',
                transportProtocol: 'wqsj0c20pqr6b9c222zwq1eo7rh084fa8smkf5qlnkdu6etvg0ess892ca5u',
                messageProtocol: 'x5ds8pqb5lkx3a1gfyc248uzgqh34c04ci80959qa2tors8qn6duzlbd4r98',
                adapterEngineName: 'o801yp6rk1zyyork8l9iarglcoum3lb3u1kdaco5aaefi814d1yceet2qjm2xcebq0ci6bdub1r03ozj3pym868wgh5s03t8c2lnavb1spr3an5f2trb1s0ji97ucwgv7f05o1gcisfzdx423swsbebmsdg8jy2i',
                url: 'xpyxzcktgp437zpwurmpb3xycdoewmrgd1s3rd5iuf2bp7ajs0ljwek9hv3wavh5glpugrwun9hd6xvg1z18yohtcq5hsjnc7fvdaibqzsw0o6fxf8h3g1oug6wk6psdjnrzcz4fjt4ozj8sko8knp4df9okzg5s0jwuud9pepm7qc2anr1hyvyrwjeag3c98yep1s2kcc5gmmmklfy1kfh9ydp3ppth3hrl7xrimmbi0izqulwonghmjr6eudtlt8j9cljzompmidntdp6whm9i658pop8obi3m4copj2qzebo798v1c50bmlm3x8le',
                username: 'z6mduow7fukfgtqeic2bb7fpfa8kz0hx8ll4pp2giqsute5is2wca23jly9t',
                remoteHost: 'krxd7kbvkxg0z1060ba749ekzafyt9sun3hq26sqb8jsbbr6ezem9gd97qv2kt0qpyj77awjecmqu3rvomkomtjhoqb18k7m5yikwmqndbqs3xsbdng290rn0k8mffdo0fkpdmagcc9ehpmh6o56p515k0ne8phr',
                remotePort: 3274234350,
                directory: 'op7di469b5paa0x1uyu9nsctvx5ojwdllvgie82o3wav6uxez85mgadwneeqzg9dviykqyac8j4bm1idklkbtjemh85wckjex2ppheexupzl9v906te3bn9bsuwxgnrq2bryp9x0u9ppcfq6sq5p2qeds97t11d23hatuk805id5muze539w8v89t28hy5cr0ve1bakqlbklt396bltz8xme7c15fplv8wh59pg49ryz3v5vrj2fnpwc4ulya83vlkcd20nix86s45n4cv44vomvo1hqhjopjgr1rfd8ulz2g2t5fwx14e7qq61vxqwl1oad4eo1mem7527ricmc3qv5n9ff29pd5dwdtlfs2ogzi7fdlmpjxueecnqykb0o93bfe01m95duiwjoafaef60hdlgq6f4a7ngzvi4tny1tycdwkaofhqkpfwtsd9xnpgq6wxf7x52f7xs9b39rsms3jlkahuilj7briqx6fz2byh9vck2uk9tpf8x57roe5x7dvzcwcefuswhbiyu1fch6g7yjza356bxznnloogejqot37igxyg8414ycassucykw5h6xxz73e4qxa438r77od1vmzpcuf3q1euz21yfdgmkwkjxktq2mwnydtrft7743fhdjvxe222c6101ee4ddiywb28phofnwnuedqqhdxokwrmsaqjy3lnst33c5mhy8umj6eirqtfxvfbabd54wzc5zw2bq9fejz1i8nvykqs26nw7jr4g3pq4t1qavdrp1dm2pqys28wnj1k3ux3i3946v7f78apywp6l9xuf7zaf1d0uccyxwkffgca0o8a9mgp79cbwn2qz8jwiequvwr85o146cg1b3ij7qryjzsz89bic98qvbvfszgyez40wei2bgontuq2hp7u4z2xsi7j5i5unmaotq84leh9o4atuj96qi30njp0gktetrqy12ucmctiz1h7fhceqjudhrg496xh6iea1x04hlsqmedf46f835a0oxxslzfmz5',
                fileSchema: 'dsggdwqf6bn7sxhq2b8bkbb6l4m4ryi4iqc1c5441a35j0huf8qq1cshvjoh6h1wsyvno354hiyozkcrhgewprry3hv6bh0vvaqskgty4y84hnuf4yat3e3fit3rjx85kb5bxdx9hzcur510st26i0g3bw4oywerjgwpj9v56zs1qh57rrtiud4amg7o0xdv1i9eno2vo953oq8jc5fzs0vtil7opw51u3b5oezccwn7q23abed7p9bjdyqbcr9aujy15bumcj20uqzvcu5urfhfdzqjlkc5d6wh4h9bf9l72lev83y2gqtx818kwns6c5hivysmyv126i938ea48jh5x53utxyrtciad24kb06ejfyhu4hmwgarp3nynff788rrjyq56d8pwzy70sj76bykhnh8rje6kua58hwc15kktbtm2gg32o9azzgeqd0rqzi579lrt4p22ojx73s9gb117mmubjl8ytatawshdva59h9br0s0cgyhwcbqwleegs5gya0xgo6bqxfxwfg88d61pfv934cacyhi3rr6yjglqf499ikm0juqf8syyf8ls3udcl46ep79sivwq64th51klrzu8ow2v8km378lbbkkk2elgy7y4m1gk4se6osyf8zxu8j0ce1h1g606oidaoh1p724ocu1wz17x6u63xhx68l6eb9spk8oeundckg3ucnidebzadjco29b9rcs6ksfh6b676aq5s0haz5vha5qdek6oxl0oxwsfijb4a2c0gs4qczbg1n09eeevuoecggj4wc2mzqh77t718fc63ia2aqq7wc2kd0b413jod62v4aabois0v6bf0nca9mmwpiton4kvuqy4djiq368vu4uylq4qoi83dm9q9z5d7x148y100sapzadflj50uulzj7i4eeu6kw9xnow75wbgqyxlwh3oqqtou41k2xlkg3pq28uhq0e7fx11u9nnuma0c5twjfdy01mk0ydpj725hdz1uzxu2kj9zvl3r9g2h61',
                proxyHost: '97zzc7i5b4oap0f3o23s46045eenzzzx7ww5wu0fxwn812wgk7gbra3w2q63',
                proxyPort: 5156346392,
                destination: 'xpuzx19vdyvdiyn1fe0dvllut66of489ah7r4d3kvepqgx1722uz7snpjdwto8pyorwlx652rhogsyzumdx0st8vf9gv74ctxc9iv0efseqwywck145z1f5l9p46ay0yee8wtzjd8uhcgdduihfrs7a48ywhuyyo',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9tjr2lne6m33y73kw6ck6xcyd7ha2d2xoy9klrymokoaq0gnx079tcleds4e1231rlvpnp493upyd3nfddzx0jgvj3ndzv05tb3dwhs4b219iyjpgcrx3wpuxo4jk9xggv7kfhysnkdpmuufj1hj37jl1aw0p658',
                responsibleUserAccountName: 'lqvgbc2wlcsr7ct0qnno',
                lastChangeUserAccount: '012csn2ebn68mq59k90j',
                lastChangedAt: '2020-10-16 10:12:41',
                riInterfaceName: 'bxbpihptm3nh058gk2fvlsxg55iggbo3u0eyfzhf5uofcaph1j7bbgz1kus65w6g48mjkl58gaytyrdgggld6u5c51wbkvhuysil6p5g1lbrd9edarlzflymvwsxywpfpx9zhkv3qk7gwcy2go10xt0csq0mqpoz',
                riInterfaceNamespace: 'kteyuo5mtfb4evtsfkaiamy48qqrc45qm23grxifr58tlj3b9omjwtjb5yisihmixaymuyzh540novgk3yh7rqjkd18dkawmkuv5x9w58cwgq0q9m7sj6klcm8k99am3wepmn3dtgigwszwrlwc33c2znrsoiu75',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '0598mdpe8g0m9lqepeulkw1cw7kfdf3m2f1maw98',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'l0s4r5arq0p2cqp3si8licqrzflkeptybxwzep3aurbvbamk4w',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'amr4g2n73teowj2eckcm',
                party: '8alh6y14uymbbygg1um61yb6oogw9glw2qtgm0l63s6w4okl0ej420d9av98ugropx8yuvzfxhvtqua6ixxn4l0xg0ipo7gds81tqy4nqbmz5651u7dm5qqgtnjjb7fq15w42j5ir2n4albeqpx1tn073xc4pi1h',
                component: 'xcxmqvu1gtjhcr64bj21zwwsxvwvshxkondci3xltnfx1nvb968mcnqelyklvwfpx3ka6pfya2ekkw3pkvj9na5gvekg63nji1ujaxoxvslg8nscjepbe9u1b1kq3x5zfxfzby3sue0wua82lb7sj05n91t6sa61',
                name: 's6z2a2t4cebhlf6553ewuhpeq3ms3r299orlgkty58da3w7yhh9v1aimv8pex49ixqxnhmhcz4790mxb6zc00syhp79rsj5kpdeafe5yjm6ss7dv0i8zolif0mt89ekpdyoklnoab0nvgn8nalli7gilc3burpfa',
                flowHash: 'qd99oxwhvbn3xqyztwjuhv4ocaneseixge7piiau',
                flowParty: 'bnalspa41jv44yis6n30c09ncrxaeoih7ifm4lzrgtveabi3694to4oxii4wu2xzf15y3hmua94h8pxodbjbatwx9qns9g4wpj2ymwqe73r3g2qzkmi1sr71bqljkdup31wujqzwzbouk8084vrkhfbi0el45nid',
                flowReceiverParty: 'vbgclwe9wa7n8w6okukab42tbvxdeoyvnjno1tcy1afs2fscsp68xu7a74509cdb9p3vf317v82p62dt0wa9ce2iazytwuujn1q6sgmrk1sm37rqbd67pr6p33al8ime1swlf7tlo0gtd3ddp4z62h6s6d71y5lr',
                flowComponent: 'gpbgffoaqu1amp77h5pnr059kjalvug8b7g2xevjdvrfo283oxjd5r37321sg2eqks6ak6ncuaa7kb3apmlsp56x4gd8p51iqovqijj0brglqz09xlpvr18fb7ty2gna45z6jeqs5odatkuu9es85ppcnl12lvnz',
                flowReceiverComponent: '6l9wshzpck8go07sgu497s9fc6h0fey3owyml2oc8wb4jiv7xlj72zsutm3s3w0sss5fe78319fec71rti7ng7cnskiq6ayrwiu8v2vq2lklns247aykqm5imf1dagjln4pdmpfsbk0zqhmdbfga176u1y53ta7c',
                flowInterfaceName: 'vthxgrijbpmcrew3nfo5wq6114ozr8ovhwtl1wtvgxrenaf68w3q2742dxru75j3ocsc74ee20yf8tv5wz2xa1zjnbiqpj9e30ksrf9tzy09vmh978whiury270l68vs8m8x6217klnb7ad9m4b0zlkpgb9s6t8g',
                flowInterfaceNamespace: '9ev3panefupunt9wznfrfcsuty7u72zhp01lbihsedm85b4n6bwvs8g7v5kodld30zipcakf788c1ff94nwgocjjh9llcroqtbnthfu5jpof9qquss1gb5zw8cn61dri7o8ygm9ugjuai7rghq2o7eaej6teykua',
                version: '6hw62nb2etzbaqz1se95',
                adapterType: 'ei2bhqkpwdbj6rned50m64rk4amej6pkpx2fi99k66370mcw5m8rnt221sld',
                direction: 'SENDER',
                transportProtocol: 'iqzyo6i4onhtzhgkp7y85548unfmkg0ifipiiwclbt1u3ykldpom0753gwcw',
                messageProtocol: 'acn4mluw3t4wdo6030318zbcaza7wvf0gi8phtmajho3ja78axqxt6l2691u',
                adapterEngineName: 'yx1idu0512mhbgafwrgkqw55kmm33bcgzkf3mljl47k9isj0vk4h5pi0be59tk47giuu7g1rlask591z2i6iq2lubna1s9f6sfd5y6mob25flhtv23eabam9lqonvxp13l5syyca8m7w36hdha4xnr8l7re57o02',
                url: 'jj3q4fz4ilg54gc9ouxclp6zj4i1ucd08vuhh09lqrbgs2poaamgnd5o4oz51j6brqt72yk54562szr5zlgo63wu3dngctezveiavg6gcpb197uclk1hnqg237qdg99so75w373wqidgh3w2tctr3k8j2kfzkce91ug1hkgxayxyc4rjreri6o2ixgvy8up4nzmqbc8foxtquf6upnm1t6h3zpvwkg37l99dvpd3o0ckl52eirfnqh4s5n9n52u695ssirj174x1ow25kfhzspg8d4co37yes2t0g9yzhe31epdkunp5fox7p8jtx2ok',
                username: 'a4uqz0lgoa7lxlpxfin48snr36ngka5s4ug6ty8sngf8v8p7mrmj8rxkyjsd',
                remoteHost: '4msgdam5hrkzf5g3abbc9yrc9o7p48f0mnj7479mxnsiscrvltvh6e47tcvm9niwmyonefq4aizubg88u1t24btdkl4ak9scesemux5bpjtj4jj7nrjd88llu3uqmgyj3jiewv4pwypnoxlhx7sythk02twka845',
                remotePort: 1340595816,
                directory: '08di4dtmcnob9kjrleu1u5224f1dovc9v7p21qrpnrwrj0csslj3z4so2m1cl499xiznulw4k143qtp9psdbrrza1uymziscowah6uo22nqcukpqtjufuk0z367xfkrp8mgu6zn2m512av3fdh29fqytgszoyevn99px7iane4n7nskj9y96vco0au59vih1kf2l6vts5s9qi49qxer51t938petrruh4oo8qbe23i7ix8migotnsrblxmljhlzn4bscrwnfojp7z2j510193aqqog4ofvd82kxxsd6rofu7dy45olvg875gyige9j9ct36df6ndwolg59uzsbqw1idnlgn6j9nvw02l3y4tykgxjd9a6xt1bqqu597djuddsjwwldjsvhwgdc7msc8cyxczyxn269s4bh7d5fp79gyjbwqs7km5enqbbkuqjlqpgfo63e26pp4vhp5jtciv3ql2n0ve3fz4vkmzj9ws31pa35i8zd3ayql1ja25q2w1inowcmm9xtn5fu2185hr2dg0cx4rxh9uo6ok8mc93093wswl0cv11711necawxt8ruz3brhi2hnxdexoifjbjp8yof1ypzccpmaq1o7zacd7a3drk94hx2ris4khivog7p2fec2hwhu9bi5odwwjmbmw8cr7v3dca2ng23hdu10hozlwn68bk7l666d950hdgn2a6qmo7e5p7rxi9h6no9eqtixzeymvzcejiqd8rlcge85d9ym8hhpoh8fkh44c9ffx7nl8yr9ubqbc2geq9zlq15vip5bpjx1uin5ly7irw7mu6l62l2l1x41ygepc0r1jkfrkc5h0ce6bbrwmosjv56tro037f9mu94525isnrq9jqbbney4d8tx7oggnx9poofqml1n3dzlbtyvrddeilhspu3ndaz3zrxsstr4vmuzxfmkmvhoz61tb0hrbbnd5xt99cmtl7rwaq5lvnmxikjl5930bep4rqboqoyv2hqeutck9lpfl5xzl775q',
                fileSchema: 'pl8t9jq4yh1ro2reyi3ha3f1qnlttb34q0t3bx09infh4g0kss3k8yacn612boyq28qzw9bm3nfxm15ktl20v2iqth4ro1x41vehoh1p4zpp4jc2mbt4pj8ecdbmcazniv8ho4zsdx6wjebggvn106pms8gh6lbh3mk2ts441zdx49pcail7i2m9h4upupehsp1fjazlclzbl18iy3cn522essaqsook50s1yksmjzst7reg913bshlofsldaf5yetqtn3k0j05qfrutpp73stitwk1kv13o6c1kdogtdeatux373u08ikx17m0ihx9z38g74dbn2iqrtf64bw2b64r3u8xyli5enasc0a4qtstv42q3ryu1iy0pptyq2599qe975rgnrx3cx966hhpddmr443r29jqwfaq9lyqukpbr5wgu59vl1p45vsw3svuwisjk8bttvgxh7mcw58xjpgzbtisysmiw2969a7mi52ggu94dzkqkdbix54v867853fq13yuqomft3smy4cvk76mx47y2fjnz1k6d8mndw8qzjk8yuhuhkq4nah78dg98iedy1v277yf0f27t006v0lx9ddxywf6268d030nym4zl1y6b7d51xckhbvbqp4rn6gvwtm3mprdxgmvysbuwplmjrijfp3o97jcd2til0396rh7svk2h03ejsrxbi9gr2w1ovafhsdx9hlqrk9z879gcptcl5d2qmbxqzlg0ucst8jpbbp5exxbnf1v47uds4ku62ud4olgfrj4i9vqbptdfat1m90xiuppbe9l6gt88zkl4nnnz4exwkqygrrl4llfu8hj95b5frpnsdgq0sgh3gptm012fjb4xbf1qtsi96pdny15m2jge9iaeqmaooqnf3yhbmd6zhujps7d7c62ql00p5tle2yx66wiwnk2yo9gmz9uz9zmfl4rdkbc0g9q4039wjhjddudh427st2qvrni4t7gl624x9tj04crw932k7hzd0ab6ykguhnh6',
                proxyHost: 'br6yli4wkeql3jcpizrg31z4v0fy24fagzc5tlz25rfpub4zespl7ujvwwhw',
                proxyPort: 6276821192,
                destination: '61opb8aewy2fgt5t5t3imu7koiq9wyvq5szrg2fqnecwwick4ygf7qgwg9r1gvq0f63al44qvbv5xemhpxpkyoo128h62iyvbmn7ldka3jhqmalif2zsnvuv8whnq4qzj2ax0tmtn4hqysm89xt70tq1vx5ku41p',
                adapterStatus: 'XXXX',
                softwareComponentName: 'oicnhomenj9vpuf13p0jtugauv7pczc2th116zzqelvrjv5gu4x0ifg584e08rcuv9gq17papctwmtq0sd78qwg52xygbjp84vsvs0hj9yewltv3jdi5euzcigaagbnk1ik8a2jkdwek29hrrtweehh4q8mss0sp',
                responsibleUserAccountName: 'br75ougznyts7r4u0ww4',
                lastChangeUserAccount: '7kvfl2umki326odh3wu8',
                lastChangedAt: '2020-10-16 09:35:00',
                riInterfaceName: 'eo1w8bsdow7km79ozbico96cobde2bryfb0qir3r4gu8up921tnbtfyk8use6pxd9uo73rov0tcvr3vn9gassmxjsv6s1eervtl4mjspququfsrit7dlu24og41ve4foph7hsziv1ok5dv1weans80wn45z28bvk',
                riInterfaceNamespace: 'pqrhazzsh5k4i28ddwb5egqrg4yqq05e2aecfq457z77e0q81l8q5fv1hddz8myig7tsdr374o0w8vae8ckwvk3kv0p3d0hcfpmuxfule0eqly7nrh7rcoc4tktiqu44df8swy3z44sit2g7z5a6wckdr0s7cm7j',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: '1thz5s616jetpjxkij9keqrjy4sm7ix5u8223hba',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'ty96llh2doezs4va8k58qc4uf8vysdwt6ih7jovw0jncts4h9n',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '45fblgzsdtijdydf9lef',
                party: 'y0sucacdzyzadbf4s3ay435st31g2ekvk6hu26e3y9t1e9m2hj2l430xucboore8iuaz79d8ri6aagbjoqb1ysuy43hrj5rqc7n9y9cvwwvzmlevn6xulygjjciprfog15tkdgts93n9loakqvsi4zj0r3rll62o',
                component: 'adjdanihylqlfh8dnveyhxg5hp49be053v3paxmx3cgf4cs7z6nq31tzlkqblm4mzsoqepcjrvgwsl0j868ba4ob4226pchhrzvv7y6gixon7qik54fdwokuw703unizcpnr0j2ltrdklfkpk665cami39yzr3fh',
                name: 'qqs3ttjfsns3qb6rs1472yphx1cnisys4rncjgra4brfvf127yy0td7tw5uyqrdktx8ct1yucrvm6t71899j7z4a10lhkaqsdl5w76vh9ho30k0n9y4j64g3j91jo8wu3r7d4z7k2aq0kjq59j6omsrf3z35mv13',
                flowHash: 'h4lfrm5we4nry66xk7820jl9g2j9zb9ihib5fipv',
                flowParty: 'n3a7k2a1xq3n01x2rtprrrxxka8k20umi68jqg9so8il8l1jcabalqu30zh6jnmgtunrc5akq1rthpk7lqrtx0gp9mbj03x0jewod8ke1jjdf3rlrlg2s2tlw2crc2l8ictvdpphzg6onrh8kdq23wp2oh8lltjd',
                flowReceiverParty: 'j0qpc18gum8zzycdsvx13g40w4egoptr3m3dbnd8g4qu1yglva8p1m60gskxk8sa2nezlek2gw48sgzy0p8hg72xevwlpjd6yos9ec7ezvpirnkpqldym27tbi3ep826k2gpd4ggi56z159q0etdht3nr5l363la',
                flowComponent: 'dvcfo8j879n5wg9jcwet3ket4qh491rbdefe3de2j348ldtz9b2jw3grre64zwx67l5kkt9ep8q8mhe1oiqmfkg3dsa20o2lg05sfpb9pquvfzs88etohmtdkq16ae0hxdvf9pqtq9gluhc2yapfcoh8p59hk14l',
                flowReceiverComponent: 'lbla9fvg5olwr5pjfde3webo6wvdvfrufuntra31rj28ymlsv9k2nr6xeduz8fm6ag2ehnzv85w8sn039vmg2t5a8mwdvzvozdfxozxyl70yicjwrgs094e97skqii4nc20uiic9t1keyzuxvx9gytd4szzaoyvh',
                flowInterfaceName: 'n8b65wtk91da0x1646wg09slnnty12va8lj8drgbg235r5cooa5we37jabvojvm82rxe8sc6kps1yluauvbmd59sn7v104843ttjqm5wnvwcc9ypskdz9v7bu6rjezk9hp0md4vsae2a4221fyznd8mujg2uruit',
                flowInterfaceNamespace: 'hz1jgrdwk7rd7io67kudsvcme5frbqnzlnycv9qjbe60mk032cdtyc7fx6y9a99g7g82htv7rih3tctioqce1ghghlko1fwme5axytwu26snw8zmzjkbgcr7y8s1myuj3lz8iixk1zlq3tu96nc7ewn9kfvepww9',
                version: '6kh8ea0v6bge28g20ll6',
                adapterType: 'b4jw51na80deki2wf4qyxue7xcxwmyjxz0v0x2qheng3wfgqqf3iq4u1344g',
                direction: 'SENDER',
                transportProtocol: '8oaa4j16bx0i3pl20mhg5qfzb58j51mgb7ybjs2nobwe5hjtlun3riy35xmw',
                messageProtocol: 'a4dj9ghaxrv6kz31i8pzi3lvdcefx2mhxk41laxsmj7khxxnymrlj35sr6z4',
                adapterEngineName: 'kubpgz2hxhp20grntl5xgz9m7yjwwxqphi7xphn9maupnovlw50wu1vge2g1x144ipk4l0qa1mlnfvzio6bo7tn3w6teu0ekbj42j2crtbf49bxs94bcmsog0iinpqpy4ovtbr3nvkkyrzmaa9fh8xpvh71yewos',
                url: 'asf2zgzqxt4p9emcf2rrhw6jc07ve5gekob5c4us4ispm3rrfd59g5kcjonhty5oekcibnzo1rpjf9grbde45kf4jjiqvysial9a9g0q0ruzo1rtwp0yfrwobl5xn4hz1opjlg9xvmtrf7hu3sitychs6yikwbnvr0d1uo3yt43hwg982gc8mus1bi2v0mxf4ws9m8ah0kwicojd93xjuf94o9od5fifpdlwm61qbrrjuy2dr0d83l9epewafinknsys9wm9kg03mm1r6i4igwr50uh65s9dkr4lvfmp8crdkv37itdu7cr17v97nadq',
                username: 'mghxaqw05yb7ypxicyeog979v2zsjnn3l6fikp41laa7kn7ilnb17uz2an9q',
                remoteHost: '90am23hn43w5wqv4vwnw20v3pmo3p3oh4fggfsqn4bagfizt80o5gf3091nd0523ejffi0z5uhfa1ef0x9wu6b7z3fx8xaqms2nq49t6kdrw7vp1pzb0pehq7ngkbtc3lrmwij89e50idyw48gngc3uu3qcdnq3z',
                remotePort: 6802618259,
                directory: 'pyo5ayq44vbg530ye4vc5u0abqja9c17oz860yykt64lpxme7zsr5ckpcmujkq4r69nfr1bqw39vwvokbe6g7fyb25ck2w7j20a4iuutnjl4oj6cchoy38j8p9aypwoy0cskis7laz3dhqplmr9ox5n27bk5q92znwi2qtlxws79f38udnd03l8u7doenadrt22s5vwjp4gopon44alljqdovalw4dd5xrzo2hpqyb3qxh94uydvea9bp0q1w9fahc2ox2pxl4mmc1xlximc2f3zr0hi3l7bmsu1c3ssr6gzp721xlhhj5wpr9680ggymgwrqf9lsvmi81jqj0hfilflu97aolk6ttjvcwe9oobtg1coznl6rgfqv2u96pkw84cfyjnxuhofwgrvzp30f9dy7lf5ys12jr4s4hf03hxqxufx5pkm0d47abvm43nishmjx9jbshlq4gjcsf6k6sxwduk99nmq4a7p05bj4x057lc3q5mtnv4ucgjlqihk9l05ta9bplbcn04raiqdydvqjejlet8zvenaqh4183uiqu2ftzx3ina2p844bsrom1jxx269fbe34dr6aijmhvryot90rv324ye4cs6rr0l95kf9wr62xq5og5ex318rfw4o0d36edthfr5bwa78ms98odlhfq6gilkcn5e85xawvdxy8wu9gbvwsjkvfy4p9je2a95ks7xj1erhxbpbj8dc6t2ppfs2sf75fl185a3bm36370vocxx47pm0yvewst0ty19194yee9bm2w4btsk6827grmzrrhpd6tai7gd9lmrogjyoeler75koqms63b8o76liijzlpnr24bi7tyct0edp5ipdqqudqkx9m78hmf8v47i594bk1do4ydv7qw9u6fm2v6ad8l4fd2grbs57u6ohsmn6k4zibf2o42494bu5lbzx3noi199uy7dqssv0hqbupq2kx2wbjw71v4bromazim407an4r2xa5a6v8zbyds3xbedid4r49t9k',
                fileSchema: 'y7mu9cfilt8tpuue9huckxqc07g2cmtuep9jlpsjp55ydaetc10dzuu5wnjwimf900tua7kppawh6vza65rc5dsbekq95d0q2nfzcp3zp8qnvtblrjsscva7kt0cjegbw68zm0rvx77n5f0bn7lwcqok1jxqgpvel862xz21n20zj4rvf6zrbpxlb95a90wrtd79xeuekzw792p3rbh8y5a71t1j0xfkxauo63dckheqbh8ryogw59iumfzct404l542wjk7n7m807c7w2acd5uybt39ud6d1f5zqv4hfkw1dgmu8to3ylllh1hoedln0ehaceugderhm4w0vhkx9m8v4950xgdjhjiomh8zu3r8kcss6i62junw6gka86nwx93tt12b12tx55rwp9uzxin9ztfv4ia1pvxqya0369yqvzbk4x78etv5y7r907mfdxa6dvc9aom0yvqgg2uk000su7jl9zngvbkdl85ogngmrvykwqsxpa8tf8188hgi1kmvs4pdy5fza5h21w5p8nf47l9l92ksw1piia9vnak32lizjgem6l190x6dhmsqvw7o59amydv810n9vdvjms56pqezhgpb2lzvzoab8i9nnnpd52j7cc4checul9t18wg7z1ocy1emez2n95capkpiruvb7fdmtprb59qj5w2txxsq1j2v6h6zs3mndbwlsaf4qih7n15vfbdjd89xpg2hatd3s0pcowkh92leu1bh7rj7xj5dcmi5qidspxgbxe9bafyre0a7ybok0hj8dcc5skacm3oegez916wi35qdowp70nq87s0gjffqttofhuxaz9xkn3rdlsyr5wcvz69z9gk2b46iucsscj0vtfvonqbx0j02z2vo15n85r0t1dpswww8himwlf5hvjj2j4icdloo6y6bzda35x85zu61unje0pwn1sdx07dfq5p89waxpj9fb4dtj3mxxfs6bkoqrl1eh8od1h6aegq4hg4k5etcq1ntouzzbeqbbwad',
                proxyHost: 'jujiegyqwa4kwu0zls2vmhgabql5ckt1bos8ux72j8q5z9lew24z3pl35g9q',
                proxyPort: 2535836231,
                destination: 'wrikgiacmlf27n3l6vw3vz60eviob7kuciisathqu876xggpk5ankgkhlk9mwpoh67lhv7cx7inga5mzy5x9m3vcc4sn5sx2z5oqzl24py1bimdbrvb9t25kz0ayl9d5747kh0lalifr701gac0g3gq4ck6xl8gn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hyxzkl2prmskadtjnc2mwkbegx81a5tztj71sqwrsg8xv6r3sgbjegldk0pigprc7azrkeg6ry7uamq287amnh4jwey9p1vzgst30zco2l61psyvpa6vwnp4d45lve9ziorrui74z3ako843f5zcl8fmcrfqfckp',
                responsibleUserAccountName: '8m4ev325xsyrx8nzg9n5',
                lastChangeUserAccount: '1jrx5pduv7s033bfb0zz',
                lastChangedAt: 'XXXXXXXX',
                riInterfaceName: '043wyollbk8gyarq6rgbr9jtffvvspo0rev7s0hsz40phcox8067uwkn0m6bcpvrlw8bxqmar2fk0p1k2a6fxed9nsu78xink9gjj0ix8gtk12llkua35wl8qwggkd5qp5mduw8j1gh27x2jttjhgb6j47vfwqsh',
                riInterfaceNamespace: 'pbqrd49se0ryj4wj85bfwt7kkvkr9lsm1tymxpta3hv23n6gsu4t7crsxg3jpscemkhil5ywz8dr293rvha7bko2k0zebeqj52w0t5yna7sybjasxzc50i7yqdxbbx1skwld6rp7mz9bhp3dp2k071k76c9bxha0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'b5ds83t4q8mbmj7zu36djn10khbxwhyj24l34wnc',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'glyk00r7sw918yr43s2t6p7pf4m1zg7d8xru44hkowgpadi9ca',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: 'j8n6j97rc4weddzr19l9',
                party: 'uedt444vv5f6m4mg0agehagnksup083lgdse4nl6hsy7o6jy38uwkjc732ei9ce847zozzgbkvl27fwvdnjiujwhyh3762hhh96w2rua642gxvrrawbmqurkq628pjdtybhq240sk2sko1b13s3bh2n4y40stwh6',
                component: 'cczmc47usakr5hvsd3wo8z6tyxh17br3dvkhw9ealpbn0pot49qxzfz4qys6n7dvk6nto1hrpiqa3s80cfhps5yo1i76cqj9xo1cdhxm84m1douxn41qthfovvm64vksmu97fqk1ze2ex1zkpwhu9ry7zyo56w3w',
                name: '9rzzu0ytmcegzor49cwufzpz423fpsh7forvy544f00gjefcby5zq61qugagdw0cn6z9xmhnk4bdy413ak7djg59ismmjwbpamlgepez347c0ox64mw0pg56iowpbiz6d3t9p8jxs6gxiv0728yd9ir0r72nsccy',
                flowHash: '6xorg1ukye3xv369fktk6o2v0a8l14b703q1gqey',
                flowParty: 'tq4abt0a6x5c50pqc5ihw07s7rg9x81uzxikwgean6a4yotwy6oiwn7fy1bce08q6euasuypfm9dtrfhrj6xy6bk7frylmvlr6ao2owwjamjod6r484mary3gq1j1e1zprdylt0619j1t1jnd9ofoawajcq868gl',
                flowReceiverParty: 'pv0eh235y78l81d0t0tf1jkmmqdei03iemqifgs5eiv79x59eea8b6ws9bt1e5dzicftt6qmgvauu8yzbl0iyi3q25smuy2153texrm719uq6pcwf3g8fccif8wk361dz5ugt1sduurwqd46dtnb98jog9hii09y',
                flowComponent: 'qgpbqgkejvdv2zykkjiplcdsj4td7zbkc02s1fcig33tkdoexsfodpoi0ptyjq2f7ft8evcljlm2yelf0kyb2l6tam9mc70oa8c5vvk3q9r1bgxhf81c27edd87usreundyexxqm31o5k91a60ezbnhipt4dco8h',
                flowReceiverComponent: 'q44r16wut7p567rvwy9l0as1vfzwa6s1xixjbts3t3ykzlv4wywude1nsphpqmnbqz67lhq5o3lkp50top92a4cvarqmyna18k0dvwt0cezvosd493in02m30n71osc0ai6txn86vj5d1szi41szwyru9mcax4ob',
                flowInterfaceName: 'zeo149e57yksk64p0uukh2dwuxtt8j4m0320mi08h2so4efm8wvcat3n3teg6apq7icetzehebgmxcutphtt6hfdlq7glpjwvvsvtc8440n3huu3i77e2rh83oiiwrm24tuvoqllvaasw1owtza1tosm8or6s3bf',
                flowInterfaceNamespace: 'pcs6jcsv1djyxiog736z0tu3gk7kx2nmo1ordhceakmxdab64oovwps25gsdzy16xc3fqb9xko7qa91fzs55o7mb21uua6gxu9qhel7wbxjurhzybmtqc8jtohbejukpy3o9t5mpjwslho4ivojb1i1ftnmn1qrf',
                version: 'sxeq6spwmsnffcdyg6pm',
                adapterType: '46o8yxw3c1o8kg6plenm2bb26mzf7kyg2967o1m4esj7cjlqmmqu7f8cy37a',
                direction: 'RECEIVER',
                transportProtocol: 'lse25ql0flpqetvrdb0a1cyq1z9qle5bz7pwdkshsc1pu4q03x0ucr8k844p',
                messageProtocol: 'llrd996nk4r4o9102e1rfg5u7zu3oiq17nxv0p34rjo3gcnecys5djvfonwm',
                adapterEngineName: '5ovvlnju00n0z288ycvj48763xbhivmvt4yd4eddi4ximv8wvjvymgle8yo69y051d98ojp7m6u6ctrfd96zhh2ksm47m1zmjqmmrbpmsgn27a8thsn3j52g9hmnkc3yg38e5fgmtt4aqzy31oxtmd1k88wfssvu',
                url: 'z7i8v61dvwv5thff47pjfmjbbng2onc1kuoyhipo1o3j5onxbs5aiszsw8eq9lwcy6qk40hx788c6ujzizht1napjp9euy57u5k9l71abpm9q18tcsbvkt9h4zyyoo1412rnhzlfkdxnu3hn3cblwaakgxiuesu1ounw9b2jp6stz8f8xahl7sw91wamtqlt3u3xw12w4qsq0pg25nhslzcpg0t19lrvro5b9uw9po8my782nowjgv2ymkl9pxgy5190qzwocbxxaqswsmyjw9eoj555jsys3wytl1g8h2mmb9digebdbbw6xir1xa4y',
                username: '9zmbzlzhr871ckrwthrbtka5myb7mt9bp2qr7goij4a1mvpbwhvaiy0dcyrg',
                remoteHost: '5w8alev8p7cqg3x0tdzmkgkjs074igp4jswj8x5t4nukxdw3t0msayc64j50f28saxeyby2bzjebvrh9m9gos1d7qpurx85qj0q6jtvnmlti7tgt90hn1elcyr03z6ka2p5m1dlglbda8erjquujgeb09s08fbru',
                remotePort: 7983159599,
                directory: 'm3nssemspjl8p86m3qkr99bq46hsoft6vpqfb5u77nxe0q8h82z7idfbxicjlbzhop9y1dl1vox419hhrno4xaanqjwz7ctlp05nme6ziov2xqdiboqc5yo8vi7oepsy7h0jri5yi0h8oi0noxplefw7i6p8ymuudxel6uokfp4gv5asxqctoxncixbdbj1yte7o5cagjhqoat6phxdp0fwcshnryxa0nukj7u9b9ioq3vyhlw1u1aw9f05gazwq8b5xxa1nvfxeqw88b3sfcphi6vd6p9jcp20m3sgmptln8qrpmc14im5bghfx2iad517rykmog227yhp6j31j6lhrp7m9013erffu5zl1wb3o9xjtw4jvtoelm39j38yjy67bb96sl7e4cv0siev3gg403x5zj3eldk9m48xmqodijtspbf093zbad6wou9319ac8bmnoojaktudjdctr81sv56pr6eohcqva2ts0durynj6bxlpjrl2g10c67cda0k7qix08yralgwllbk6mqrs88nq9lfgf0i8idcc81httymqulce0iz9neeqf5j9229y2tht493dwfklkecv086t9zz1enbnchkz8603pt2h988p4fsmckafnhfqahx4w6j0e542c80wvc7gjggd5f5hzpmfvphryt9fpok5zxtghw7hr5hbdos4xq1qc853967nciayuuv3o877jddafkpbvu30q4lm8z19b167luxu3j3ggq1kjqsa8cz6pqo9ed51dk4c2ktaiikpkhv2v1unamawi8ij5dsouurm75u48wnxm3k9bjta8q5r9lqi1y780wub72wan75xg0w17dvnw4drlpqx0201uuo5jesndwqmc0h30v2dgd57nza4x5hpm4xs0nk0qlctzuw4jogb59hurvm5t7rhscg2l9cnk0km2byrrc80p2r8dfzkd6uqmw9lsjzli35mdrrrbw6mbfavm8tttc7b1k9drnnj8j3jj41zyro1dli9y9um1',
                fileSchema: 'ip4cwamjxfba1z7vv585v9qwdwp6rnpbiih628foya1p6y4t4vaw11qiacwryb686bu8gornys23qjz8651vfiug6vg6x4yp2723swb3qw75wn38yh71b917ftzldzus06x56w5fiy23txcmgn6xanfs108vhwn1qgcxa1s7afuvl14z3koyqovl0eqja3ypxad8osafijp2u3pxt0z4lodbv24nb4dzmed0o9u3h0y852qkwc4honmdcheacm0n3rs1dr6ydrpsap32cpb4u09oncfeae87c7alpow0vmy81a97k4ljvt9eal5mqjuw7fwxrraxjlxqb03otu1141kugbjfuv642fvm7zksuexgmu18g033mnr3w3qgpaobctbr9l7z141dxwoazm0ee4pw9bikwpz0x4qb98mg0j8o2knuycx9w39nmytfkevu3rq2f4hei3qwbs2n1ufvgdkrr2livx94194q2mp51w9p33777un4wkt4jlxc46v7lf0on3a93lyt0vmlvrkhhdevtpkzu80kdwt60ieoaj7l33pr17xkg9iarr9ox0ygvinemn7rufvirf05x6xfzycncootsm2461ipowt5dhp5glpi7qmcm7gs79tsnm02kvv8kiu5xloavk7mrsq18e1a0kjzmr35faq9dt4kkive1wafd0oxtekr8043ycz2k53ppjfjzru8hugpi7ikmt3iwdqvkeovavpvtv4mdr4wm016ev8y88wh3rw6je4lu8v5g4h20f9i729teyiwgiy8slazpy37v3j4dgfqm3f2wsyjunpclrz45bgkqv2iogc3fue4r4roku3sbb766ypr11mutil0zkqeiwvi8iqc9eeseb4os8yjffwoqorxtsxi7kf2fiv2p86w3mtfegy7r2lnog5yh1nnsg8lfqx8626jnzp7497ltv8cmha4tcxv4smpbtcdbtkj9mseosmulfuumsfookjnieqbc9rhys9kgrn08usw0v9dy1sn',
                proxyHost: '8uuvnc9dlgd4vmvwdktxfq2l2a7v5ou8r5b2il7yzxqgcrm7arh3fh0czaoc',
                proxyPort: 4749144032,
                destination: '8gcwiuoki6cjmaaqmlzcwltev4dk6p215j0x23v0jkab1q5cimfx8m40ido8yfjbfggm0i37rngbl6stkjcuivwlz4yys8c7wqs2ll2q7iobe4pi06u0fg7s17jncvotluw8vpzoyrlz8411j9t5vvmrn4bpvtyn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ii8octtem1doxnkgw59fzsah7ktj70xmc7fr8tssetz89cnzl6ya3tpv47z7n3ylg52la5k54466axi3ywbneww5lmebtmcclvh58h6qt1f9uewiblpaxxarhkswnwol3ht8c3zelgle91nfx7x81zey2x0oe6iw',
                responsibleUserAccountName: 'il85s4qmwyx6kyrq32xq',
                lastChangeUserAccount: 'v2siymvlyfngd5xfltu7',
                lastChangedAt: '2020-10-16 12:25:23',
                riInterfaceName: 'cesh6jqmo7jj8ekkgjcshz2ycsjsl27g795muiucqh3h0jhrgzeo45m8lq7ownknzrl5zpf6bs9qoa1i8uvwbdgs50z6cb48em4l3y3aatrj9079d85qqadfcobq2n5161a0buude8mlzlq3d8l6cqv1fb466ei5',
                riInterfaceNamespace: 'gxxrh6ktpkrw1gm2fhougstswos78vlz01zm3e8llonjpj8rkiz6oo832plti0gvzhfahubp0nvwknnpiqxsmech5svs63lq3q2pecmw65u4w410mz7vb2ag7gasc1b95vq5227bug46sljybjwvbqmrclslv6q2',
            })
            .expect(201);
    });

    test(`/REST:GET cci/channels/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels/paginate')
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

    test(`/REST:GET cci/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'eba1f66a-127e-4d36-b798-e30ed2fae515'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'eeaccdeb-d348-4c26-840c-3ec824b712ef'));
    });

    test(`/REST:GET cci/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel/0448c6b0-370e-4bc0-94ba-705cd6e7f64d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel/eeaccdeb-d348-4c26-840c-3ec824b712ef')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'eeaccdeb-d348-4c26-840c-3ec824b712ef'));
    });

    test(`/REST:GET cci/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '7bc08871-77a2-4e0d-a73e-ea9d62e59064',
                hash: '7hppayrzr6n3p66l0y77twh0dlf33jo1om2jlx4l',
                tenantId: 'a5816955-1321-4c3f-9312-88c322357293',
                tenantCode: 'zu4euozitobz0f9x2m2qyperig8anon72j0zkx1ax0ek9x0jhs',
                systemId: '990efee3-2f86-41ff-bcd5-8cbdd70ffae5',
                systemName: 'dxw0gw5gbb82adm782is',
                party: '1sofqw7avaemumhh1ru4eve1pky5zg0sf2a5czitoi2vbdem8oukzavvc0cue9ui40w4o9l3hezh5xhlm026j5zrazprbygkc17h2uq6jsqqauowoa8v29ssziewbrlw7r5m1y16xpsomjb4nat1vy849s1ntkbm',
                component: 'kq6wv8s0rvxz0u1zpdrh00cvqllnfc6pqwrya3acytrh5fmlr549gu0gh3hguinqlp9omhtb2sy337xekcy5dimt91auizpj4nnriiahsccfqx5ki7nna9rf6z9a8uvlefshyyvp0n44bt72lc9pow800bvtr4ev',
                name: '50irdkyvq17x8hqrztgggbo0jf9wthzn0u4rpnhqub86vbq5ag953efppy3kuhyvfl3u5gzrgsncqdmib5amwq2yg0ikdj0wmuuuh9yzss6dmxzykqg7p1uyrh54zt4ofr8tqcyejuy49aw6ehymfkokko43mt05',
                flowHash: 'wvfd6wzelsmvpdu5wnq1ceb7z6sfh9i1w6zr16q5',
                flowParty: 'dfqf02t8ddovlxgsi0sv3f0ghr45jkh54bovryxkap697r9sphp8ks0elgm47lksivmn7fc3dk3lcmd0mrrpch6tlez4t3z7ywuppl3913anyz7dc4c190riqq7h1gn9ogi3deee5ha5qcdyec2sdaux100evo6q',
                flowReceiverParty: 'k5i7epv9774xzexy4jj0xx9to1olh3zrflotc1i49nwdo1v0rgqkyz9dhyfcytnb4mf87qkgm29xvbw6hx6v2rrr3hqrl3vdv5hor9sarzd6d5ig2eix292m5pl727szlo8awu2yo1lw0ztptmo1n66iupl9anru',
                flowComponent: '0e9pefs5clfxrxw8usx32yr2fkke2i3b5hb4z0tounw9sj699onr5yfydujc2gye3t2j8qja47mbs5zzqwsm9pl0dti8bkh7ko9eatz9itoexo71yk5lkhq9uxbwtapzj2ms5ymv770cllyl6ln0h1507gekayb0',
                flowReceiverComponent: 'fmqju0qs7yvifnk1js0j5hterdl78lyghj1iaqikr5em83i6dgsiat2t1th5cpuuxoh30jyoy1wkrtgdim6rzxtl3omi72nrt6r8vwhfu6g855vxlm5c8exd76dapwd3fcl6h5jih39clfbbmw20evk3qev2vjyn',
                flowInterfaceName: 'itm4qxr579wg6lh5qwdbrqs8ilsh7rohfu7q6m1notteosttn3640fxkmy4838t21ebegok7wceskjypmnlo8n2ekvpge7fyu5rglgvhjaanpu9meimm2d1ad0mnxy6emd94vcahu8w9er1epizke9puvnxj1cvh',
                flowInterfaceNamespace: 'hq153cfajpk3tx4pfrqe7p7hr7vho9o74udoq2qy2h3ezcsdwcfovpit6qi88ivnetie80vip0bu67494lf1rsm0t9sor1f1d59kdm2su9u8bfx0hjgrdtebf8g23wph4oygp8vn30l6fmxw075aosn5swaxfomz',
                version: '16clqjgbrqz8qlm6mpga',
                adapterType: 'inzuge0oxzsg749bpdzebxzitxmjfpf7w1o6nju3pd3gsm4om5d5yf90v34b',
                direction: 'RECEIVER',
                transportProtocol: 'suw1w1qrfpmz88pka5vudg69vakc1odkp0htqy4l72r3rvzi62qkgmymfxcb',
                messageProtocol: 'pk7qjvd75984pg7c12d85qzbu168ywf0ab32qi3s3t637ugp28m64q1rsxg8',
                adapterEngineName: 'k9gobl12tmdi1fsi6q93guwayect8rhrd9jc6773b58y8cpmyne22ok8h1ezseim0w33q7yayt8f7op9j8lo7gufhs7d42gi85iy9sv16dsdlfxikb737ul92vav3d4qrhly13cn31wz6w40utg6r5pwpja5k87l',
                url: '7znhcm8tgmkuz8w5swvtag86lh3onwwo6b5ewqnxs1krpv89g7smpjba83gopy0h43mtlnanz62jwl7vjgyvjbrbuovm60v5zyvwjsoshg2n0imka59gfznqnth9bsd4i8wvrad7ggjmn13o2d9cs1qsyw3zn0zd3cmdsxpou1nikx0vucyqpgj7t8lk1827wza5eceq4kvn1vejxld0p5icnvn5io6t4gggtpfwtmsa063ciwasg1jc3nn56qiox9uty3fu0t8d37qzu3br5jla7o5uev3fgdgx8rjktfmh4vrdfpykipoagy7ho01g',
                username: 'rqd0kjmzxycna7w628en85qx4sbhlsqzeskeig4068ng5sdmais8ags7u3rf',
                remoteHost: '5j6efitj331wrcs6210jdwn3gen92v7wrr1ikjiz9hen09xfal8w4250ku8hlx7zjdiso3p3pbo8qga59hqbl4huqwzws4wkq0pvfzcvg6wxoy9w4obil559xunbj11fvjnccj4j5l596k8nko602cpcsnzxikax',
                remotePort: 2100722572,
                directory: 'l0q3vxqup8vpbhxsd8t1ndwrplle8rvbk74710423v8cjjk1a2o4auk321b2h4vxqgputoqwizqe2xfctojom1a38qfzlznqrh9dbr422md81fkfb7kbrfl6z86o9ko5lw7urpklc43b0fksx5npuvdj48kc9n0w42inmmaudy6xxfgn7mqs3hbfhrj691o4djsbxa46ava0ubwb6y57obsjehyip2f6vp6wgj7c5f623v9x5en4lp28k9x2km8absbplguss1xpfih05yzh174n8h56yhhwigrpp2kichbn6c4kkzbffksh5f81fsk8cpwzeeanb2i9cmh9kcfrcifqsca25jjkvay0t3hbeodp4s2t8qhygb1bqaazv5k22ji4dzmctwmc00sjdg140cypvvyzwy65331opll2wvkpndig34gy3sjtb6zjmvtulaktprcarfy0vnitgft42yycm0pll16ju6ipyqq7dl2zmr534bn18hy2qu2d1tz7irvgekjz49q0ngysr8gzyapyglnph52scw447qgj52ng7zybet9hr9l495ltd6a0ifmn3z62azwp6efotrly48z4nfxdnsgji9jo58bpkddqqm52d30pgvfgrfmkzpxo65li3mmmboxbg1tv7x3hxpfjhz9o5geccgv0yrimgosqmsqvwmfql0g449hxqgiyvosgrcepf1pqkj6tgaz0jayvugdy5k4721shoaq5o8ej7iiv7keacy5yygg1a65wujrm04ed1xhglk4xwnqokvmayxv2qtnfk583gt185hi6k2h2kjdf4kca8onsiit35j4w0701p6fgvmyorh9q3x2lckb5jg8pmr4yticl9t8rh2euzxvs1yarfg4iftme7or08wlj8xee9zz3v3zx4qaoxwe3o0ihfuri0j9jfhzpobudqvs73sz2p0e22hbviuoe1dfpbl62vhob94nqgsl950nvcvlwsnyw23zjj4j40eh9t7iroprmfpi5s4iq',
                fileSchema: 'myhouibp4crz0ccht9we2q64f47spynqr73eu364pq1qcszagcos2q10hvo9vekaom7nppcv19zn66wtuk3iqobshqaar4heh1sfopqc5z86rhwkr9p9xf8zxkfsy58i5h4e2ib2p2nvbqa8qu06ybpzv3kk0l6u3zimbggyxjpf36ybhn99simcmx24p79w3s5leel30dosmtro4jai4nsv3cavkkykw7d3baxiel8y02b3l8ohb3tmmdw9uy2z8007xlsynru00fhfpb9n3tf8ovlq7j1iqsijrthmbn3gbs3ymic62jd5yvlzi4dt02ejyz6ty5qlp4efzs2x4v2gg204rj4d20ne7f6o77sc04j620ziy3pee55be8q2kj5w02zpz0wsk7w1sl4rvp7gi9t9yskzjzqj1tx940kichds6eiled2di96qttc03fvgoaecvacof5543uv7w338ctxvu9d1zx08dolkh48pjgv02zd8e2o6rey9s3z645gqrtti3j9fo1gp2m1y280h00nmi5vyk5pyrw6yyh1mh29zyxrs34ortq12a74t8rqjoi5iotlhfdche6n74z6mm3t9u1jrva99eqzcjgu0bxrkg33tcduehhu0o83dukp044o2hpfo79skju74qgos3k805nxbr1thbh78ief8q9wevdk20tb62owcx9h6sncsoazxhl2b0222j7uizuwmhs31qvj9r0z1meguq48pqv6wwcxt9r6zt6nfetky0wnorb4cdsxt50gr2rxxc3vi3kne82o9ary5pzblbwrovdo35yrz5i3b9lo4p01hhlvw0qphfqhi8jqtnz48wgpi43rc194k4u59g7lnbpgqw5ku76gk4as969amr6ok1yuwft5f2ij00jvre820lqtnaymmjmk978qrmye5f84inum6w6ovykkzjgucfgwbvc5098f88mcvu8loijglyov0ii0z8e43gzof0clzyes7m03cf8ejbngmurixcdcv',
                proxyHost: 'c674s5t8fjw3ktcoij2zd0txunezjcqtpodmdgja33unnm222w2jvgy4nkd8',
                proxyPort: 2180963745,
                destination: 'g2f6mphhix6e9gkfyfwdbkicp7sqrjab8b8lkr7i86xnsh5y1w9tnnso2xqi25yvysapxow6rmyjwwd4jxg72o44i39w0cvysb5k90uqgl5amxpquw8gsx1d5724fgp5rxlv9xske4l1msjshog8qlfadmq1ztky',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wn3uphpp4uue5ct0shfml9lilx5lhxoghqkk5noq9m8zztbn45s5piq610t6hdv6r62cg1mca73stq3p8z3omxuq4cl3t565zb0znl2jx8yjsl22xrbnj8rjq7tcygxbm26v1j7t00l51tfx9fvl0x0f1k0eov9e',
                responsibleUserAccountName: 'iraobqzn9ki19k0xy2bv',
                lastChangeUserAccount: 'xgrlusb4030m8mxf4mzn',
                lastChangedAt: '2020-10-16 00:23:46',
                riInterfaceName: 'fayyiry2zq7hfqv1dt83nev2hz18hutvcprhubdmce5d8z72wsuggsclnhz3kklnmqfvu4o85oom4fp1cvra974ufc72kwtknxwcgi1snrp9quwx2whni5wecuua7mczgdol2gc8dzufd4yy0j25emgghezqoh64',
                riInterfaceNamespace: 'nda5yzdejlgbau8arwo333hu8u4i64hl6ctddlk4z5u0zttombv1cd7ys01nl8827q32cgpuqidyz93usowtl6l575pfd3wdfynqejp7yh69l5fk39n3qq1qwi1xn45b7pmmkdxptfx54pvjfitop4weldgh3knh',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                hash: 'o22n3yjdhdxdpi3zilpnrenh205rizxb7r7r5t9u',
                tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                tenantCode: 'zjy5mxajzyah3kwqrwl0pnji1so9msehlk2bncdj8rt86mmpb4',
                systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                systemName: '8p02wvn84aoin3tc2gs5',
                party: 'kydfoyfudavnqbzndoym1c45bpwryvaiaaluta3x491apb6owhj40rdslydv73cauotybe9kzldb9jxgsrtjxrbtqk1xc2ztz89wf5lg55i66gfquerw3u3vdic867jo40ugetjrozqy1m3rbcxinesxawg136ne',
                component: 'v0qfwa8j83gomgq5w27f9ubdozvl1cus95p3cm7pzv39cafg4f0emmrqns2mxr9x1vt0guxiik1aczd8o8wc3mud3flnph1mhuhcdjzgycdb74wygq7j0jxbms4giqzpiwjxy7n3lxeu1p0kjynvclj4gro63gei',
                name: 'ro50laqzll8d0owcsoyjvtkzvtgolshn3z5bqjp8i3eag6gz8e6vninvp8o8001vwobd3yyxsqqy4bzwtgzcc9vc3j4hxnbkkhnapo4gxdrzyiaevazfhrmc3zfvqjwd40j5r9hxk5l4yjnrnpbi7e0yohgit26w',
                flowHash: 'e8q42q7l1126nv31q87sfpm2ipftnikj9trokhjb',
                flowParty: 'sh2jvihtp2k4feakzcpte7la0mruj9niuk8c8884y8tuxb46crr8clkmk84bl74scq0we54id3hvakqfu2qc7akmwnh8xbw4gogi4zpbnermpd9vowgwt7iwp6ux90wf2z2el4ip141ajowqfxu9u6ru66vbmqdo',
                flowReceiverParty: 'oab4a33jywdlcah4vkme193n3hbpaka1z6wbelvn0xubbrt6xwrm3clcyqcxo0bc2z6ibsmaouaioet9eb5g64j77pq03cdswe77df80etf900p2c1qtj13i4k0cycmpknbapw7726ktdhf6grd850e0we9y0n2s',
                flowComponent: '6qu2k5h00bqa9o7601jjhbv4hzwg0kmg3ucny91z71i9rmzv9sh3ordxcvaatvulckj500e6lvjjxw1b8zeh2jxoi857bzt3l7uajyp3lsjv4hlhs6w8vgudj1qc6juuuazs5mjju4lm4glfbyja10b0dhl2ft80',
                flowReceiverComponent: 'qfomr0dekb8290stn94p5ol5q5925d1z2vhwi0lrukpkwdqi47ou473xjyyhaxc6ars1h18dz3j2ciyagmcj345nevwm1wxoqrqggaql8eox8mr2yik1r94s9hu38hetqfwv5cad3zixk8uzzc2vt59wf9qk2e62',
                flowInterfaceName: 'hfgm77kjfk8d87y30jqfq0p7ko29eyvwwwv15rje8iyxlsz944mcodayzt0d9oybe03ktd4dawd6jruhd12ve3fuoq1kysbdufnov31p8bn3oyhno6tyd06pm9yugthto3mblay6exuz4sqprv849ufk94x2po6t',
                flowInterfaceNamespace: 'aoubzt4fe2zxuh7tpkaoexiq835o3pbdi82j2sgmhsxqvw302fz86fv9pvvax4b7zundx2svcbfp4cqhakhhbtwubkdpkp23zznf00e7a5zttrealw44p17db9jxf1vyis31ildu87e9chet4t9adk3qb9833dml',
                version: 'b4vfchhtjq5q5f64isko',
                adapterType: 'bs1op76ey2czk2uo5bcrseq6a81c22sfzlu8basnb89enan2yymxp2tgsjr5',
                direction: 'RECEIVER',
                transportProtocol: 'y4nelmft1m0o6joep61o6auk2xv99joj4e0ijyxs22oydxumnrsa1kqddg6m',
                messageProtocol: '8jh1yxgk8igpzgbxkeqkry65gyq75cbfi3135sxz725p69003h29498qbmdb',
                adapterEngineName: 'idzqc2d4rxyzvfwyr6hri02ud5f7d81bds1tqehzq0seyg4n400nwydq4wsl8l8qna7taone52rjsrggei084eqwchqm7n2nyz8whxrnedunboxhksifxvo6tntn4otwwdvduzus6ri5pwq76w5ekjq0blg2gb41',
                url: '0yo15d3zjh8uq7zd0p6jxgyfx9hccts0zrugrym4mhr1io9gtt9e9pn57n3psedoe03tv9larnrwz0xneznl53bs60vu0pi9rfqo5na67csbuiydlr6b3hpu7waqoxhrrqxty00ft7rfx9tcg2t051zyf8pfmtcryghyofstmpka5onr4cixoe13rcmktpavt12tobdc26pskak8w5hqb578apxfk1w0aeugfhlnplznz0tljm2zj6d5wzaqbisxfvxwy7di2oir173h6jo2k23mgmrqp0ohv5g09hfojlk1whzixuyc7gdo52r4trsu',
                username: 'l6hdt74hj773055bh48rr5z5d85w8lsblm1grmizv31itke1fowrtuh1pxct',
                remoteHost: 'u7ar8h24xy0jgnaq4z1oct8wgaa2qivery34p54p5mi8gw4djg7gv82w4o1u5lv1fgsoqt1dk6ocusqzlgofl02657ygdh1eyiwhc7tmuedc9pwkbh6zdmjvyfp8yy9tx6d4tasnuj99qv2lvgri1ejnzf1vi047',
                remotePort: 9241788775,
                directory: '1iesutzcf7iyirmtmh3kus10rly3cgyr9upv9c9xrpr1fs11u0dlxodvll2a0mrefllllgmi019e78gtmvldtyqfqzhcg4fm4p6a2hyvd3wz9gwrv82y7az060pcu88ls6gpf9fwfcvvvgemiww1ci79yfjreb4fhzekz4pt70n4odfz4kjbqnj3dnmf84ivdu5qe8zxua425k7puw6g3g0x3rifv848zzes20lpu7wizjjw3ku5v45aib3q5h356z25p7i0cyrnjsqnnta2sk48kpmjokuowre207bob33vujw09lmqm3kh7e6upxpgh1phxw0vby47aoz4qi77kya2hdcqzr55xxqkjp11wg752r5le5m1hht2levajoci5b8t24ed9tu1akngt38vs132wzq86oqtet1i11lwrvknijpxbj5xtrg19pamhsnttbgrm07ob2az9jb0mdf9jnbhtsg40v9eyfj0wolfva19ctn5sy4u1rt1cuwx3k7s0l9c62j2i81uat7r0xvj5vp6bjhrqjxj5132rhv5pk4tdl4uv689jqcwjisrjiedbrn5j3ur6hr4wkzv87jrjjxpbkfq80j29zr6l614ao1wwbus40vlr8wzyq0ip138hh3u4sz4ijtmsq0o156wz35m605spv34fdtt6ltmoqhrua5iaj16ctepvhkqv8j2edlury37j5x2jk307oa6lr8mhevyjsbe2uw7vp59pvfjv55bre58xpmrttd9w1o4m7ogtzwug5tusr1yrdbcktu98gjg6s3wg42ez25cvrz7bbud2g7pnq06511lbtgp8xhxyn0abmb8novtk2uhh8fc0uoxm2vbbfbu8o4nsxa9bv6hv98dbdc7sk0r4cmmnrlv685kiywes2y8voozrc0nxzyxzk68wwmq0nabmkujleqnhwk0tkwo9ysgtl8ula0bhar6x767o3l1onnt4fn5kge840nvwfhf333ewa3xlgfarrd1k42yf5jkte9z',
                fileSchema: 'qmqp54a6w5ymb8wyda89yztkeqtlpe6o9do2szpsppflsx7mc9ynpmgz2fuj906gdki8umekmu15pu08zv8d531dekd2gh3ji84zegjtsfrsh5j72qu8zdtwlrbjd9k626l8ud47645zjz5utj5cgkp8t98b8j0xgw5iv99xn5bj3wqbigmbx7d1ak0oy7qwm0rfjruiibgfv2l6pyg2iohnsqe7u3o02bt4rb51ez0wxkrl0oggsyisd2cttgl7711fbqdk651cmsufjyj4xw04ug1pcold5t3jy67jzebd86j1d7q66wf63hwmfljdlfupqpybmmgz522a4unig1wyqyjcljjbfxpmziw6dzc6as5l2a579d04c9gvx32ue2kms9dxnox9qlqwoiny7letsees43xfc499drvds0p1xdu86anatsftl1hgaw5b40j2wnxkwum0qzhykdpylvv2nfhhpobu4wkkfajwlsd9lwkhgduo1i0odxfe6ocqr55ib6bsqi6yaskny09kyndpy25kb1sjet7idubeypwax0b355clpanfv0mbfddv93wdyntkatwty250n508rjf0j2tinprszd7v6jepyyelb7z0jytbk6516zznbk3ndxaomosidgt6fn6uepamd5lfxkpnar171oi0cmv5pwnlsp6r7eq1kl6t2bsa0wz6njwnktiizv8kb18af1kv5h46v7j2fyzbnys5xkumjezew6zifr1orzgp9pklxdcp50kyvku3qp5qibl1i87f8bchrna9eqttxz4k3fir863tlfvuw4b5umswil8zf5z92mp6081gqtuq9rnw0344jbuw0ibejw17u3mjtbfxu8mrb71ke3lmgxdgvqdl04etkdwy77qkb5i80l17i355pamfhr5zi1p4h5wvzyzmgxc089rl4hw4b1un2a6136npcpqxz3vw7l3kv32gbu3sc68qjo6mvpl8z9mumd01fq733nn3kuomqzrcyu58n7rx',
                proxyHost: 'c2mdj562pxrndomcjjm9zkt2ee5foyruddwj5ip0fqzkodglb3ilwu1vm2ya',
                proxyPort: 4188287333,
                destination: 'dlvl6nmkw65mja5jkn5poy1e4yhi0i4kv2l2ddmtydo8g8svzvihwj3zyuq6oqyepr72gj9ukyjkjfad46gm6bkw6tsieb1i3nz7euhvnmnzecd5ml2dyz1to4om734bqyrkcpjsbfxk1vkyydqsozyx40q9ruoe',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '10159jreum9qhtaa5bf3pe5nopigeqjnhsu7n3l5gay88vxxja8bes6uvucymzmlre8sqkhaadatf907fnfqf7mf9a8reb4ik7z5fp9c2c9gzzt33h06h980fahyhze0ib4p9wyx4sacouenqaukxr31xt0p0voc',
                responsibleUserAccountName: 'lvr3i7paxjvhrd8or2h2',
                lastChangeUserAccount: '0gbjeb9vzfqyy82f7kap',
                lastChangedAt: '2020-10-16 23:23:08',
                riInterfaceName: '6lsnz2yfe32pxkcsou0lwkd7753mb8yh0i56bofkrh99pwqqhgobeoolyzddsgern45q8l0dklyio0fly69uuninzbut7yxu6hlxh78ahp7ecs7r5duy7l5q4wejynz31hghr66d18lu1hogw5i56dlnxezpoo17',
                riInterfaceNamespace: 'hmv0ja12by83fg0s1prg19nx3ra3afb5hdf9p08cz16agqefcwino8wyvjt5v63icpxr3m0qjbjdyuwhpluk5l406lgqq1gbf3r9asrlgr5m8headj4m9eo1qtz306xm9gng6vlcoshdlq1bc9q09jym1ti1lquy',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'eeaccdeb-d348-4c26-840c-3ec824b712ef'));
    });

    test(`/REST:DELETE cci/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/36dfda50-a309-4699-b077-b32cb0518163')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/eeaccdeb-d348-4c26-840c-3ec824b712ef')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateChannel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelInput!)
                    {
                        cciCreateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
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

    test(`/GraphQL cciCreateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelInput!)
                    {
                        cciCreateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '4ed0a814-b140-4617-b92a-85d2772325b1',
                        hash: '94zm53tmhqtcmgktmn6h9sjkx4dp2praynzmz6vi',
                        tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                        tenantCode: 'qs3e40lkugpays1z6h1iub3jdgh0uooaonjhygiq0dw9k5p74h',
                        systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                        systemName: '2l976c0pzjorvsi9c6co',
                        party: 'dskxa0geufoxm79gp3xm0mpbxqnx4z81y8q7vdlazhiz67qanbyjdlqi65l8vmzdzz67tta4lzt0g4iujfu58475enyb0dx8t11gvy1lvzxpbynqzlyhln7zi2neag13dbfs1zs5p0s8g81t41ykn6c8gub57eth',
                        component: 'qhcgzvjb4zg7td0o8tht605t7yzf7o3x6gg54i64t0slapda868q5546ipq34mi4htdglrgxkzet6nza5jyicu52vaykrtf0b4gcle606szwourppccfvbspuix7e64sdrv94lxleb45il5fcbfd4o6j0f5fgrq4',
                        name: 'lgmg1q8y26etxopuoatlcc1h6bgfdxwvgdps3bledj5v5e0bdmgf0tp61s4kyork0nu00z9u30r6n4i25dcgnuh5gjc2qsc2u6nt1mb0c92smuywnvnxyjtnpmekb37nvwt4w6ocvihqv4s8kigfsikvc86387od',
                        flowHash: '47pkjbxeotip6i7zqwpcwwkh2j2ujmhywh1umsyr',
                        flowParty: '4fesar3n70zjxsntf27lbe0b8b1si2gycgu9l1gabtq5tpe77a78itwirdns0hejy49iy8ohzxk5o32h984jpuegm0micr2mpm8wtxzxriuue0wfjd7ife2qug4yb1rhbk44vm4au95f52hn97eysf0mvlaldkec',
                        flowReceiverParty: 'eemo1estb8lzdo175jrcnno7joksd4z7t5c0prg889iyjqj9q0e09ejbxtdkmdradyeqbdhhukh0daaeu6bqq0bj61rqq48kj41djv5ltlhc7dxjgt7y66jstwae2lw9tcucp4wgpg6wjfyl9500xt0ytxj4ufwo',
                        flowComponent: '8itxdyc6filzm8htvj2474n7ur5n3bvxulnyf5r98sxfpt9r46plu7nz3eayetjb9wcy6tb8kg1px2e7s86vqposzpvoqjyj4dgr325yey7zlctcihmdatx9ilefte3lzjndhkcgdlv2m1p14ngpqkrs87yatc3h',
                        flowReceiverComponent: 'kmj3m8vy9ug9k2xzajzkdzarkm1mzbgp51mtjau8ynog4x1l6er3kz3al9ekub0be7oz2lfyopcdmhxiqyy8a1fsyld0fyovce1stw1j8jc0vzglq4983mr566cakydeisem9mwctntal1cdia279ifc21j3lo35',
                        flowInterfaceName: 'yq793x55hnz553eaoyuo774nj0crtzx9hijcfctwrrh4d5lblpadxfagopctc3lk9qvmfrsmh635xt47x4a7cgvda29prbugzvp1mlbuqb438cjm58fd1eh521kuzt464dg5qgl54s8oud4z5lhsry30iaovdy44',
                        flowInterfaceNamespace: 'g6lfvckhlikxk40c9f7b8x0tgzw044rqj7mis5wz9yaxzx4q9u5z0jwe3oqeb665h8ea9ydwbensm84ob92k7f9u4alyguvpwe6x8p7vwnqj3a9pgxunzl73hdas8r0o3uramaf87g7klqtncyu9pqevhd01jntz',
                        version: 'tjzkdlr80k8211jd6gec',
                        adapterType: '4k3nvu6a7whmyph0z43hxw5o4b39qxvndmoasjmzbu1agid4x6k952gstu24',
                        direction: 'SENDER',
                        transportProtocol: 'f80mzhoav7vuc25oh7xlmhoe90fujodxfsmeu6vxqxlvsx26ylqqe5oy52mf',
                        messageProtocol: '5zashcnk4joosgh1wfywsv9pml4n05eufyanf73u0kptjawbfue8y1uou14j',
                        adapterEngineName: 'r3qvusajizoldkrb9pf5vi69ip25c14u404hwwdb7115xcyjoc9w39xjo1qxtlo82posyt9fivnp8xjtjwn9c375w5o4mzzgk0tqozzjzof1ak017cqsjs3xeztaz9k0or2wy190114bwlwahchj4qcj0m0sdps6',
                        url: 'o3meg3dwozlnbe3gh4vabhd9pq729kprijlkjsln8qdtptkggsl7o7varg17nm4zstxxov43wyslym8cjka7bl1xynvjuvt69ithwu9lwvski086spn0zjthk19pp8cy7s7vmtwmovb9ewga3d7qugw8xyp028bgmc82dle0vf3w4ay285nory1wpkeauisibhbanb27w3ajaran327m4fi31iu22l88ha9odj5zxnqxehnjnaod7m3ypx32o3v4h9defb3by6k3b9876u7qv63iwx2hl5tutby4s4z334rzi3fqb7y37tszka5kkhty',
                        username: 'u4j1wvbpft1t8gwu52ce1lnpn7dpgk71jezt8zlmh2ta568k7rygb2dqf8ry',
                        remoteHost: '6rufcbcnho0yvbl32rhp9wkfe1enjo2w6f5iokplv74szu5wawaug6fd2u28cpwnsw00eiv3e3n3g4ejh0puqv1xsymxhdd0t88dovum64hrh73ef166yr2v960s1dtdv2sa5l2uvkkyku0s4hlqgk71tuo04pjm',
                        remotePort: 8761985752,
                        directory: 'jfgfawrr0fszyiep549f0354onvr4wvydpiqv8uo4wkkwi5gaft8jnont8igsiyw76rgflnh1idis9ej1nu6uqsx2onvlxvbzy63272slrdcpb78k1dp0cd8ybn7h5y95vm0b8lj67s4f2l100b52fc7wvghp6ys5odmb8pu087vyx2bkwpeqicf82fjh1yh2c568tr4t7mgy60v58zmyecpv3aycrm3n9dvrt4v8w9nwrj1o9j6sii1pkzwxtv3v6wbpyj33ch6pjpqngweui48i4g6p1dafl5f6w33lfsdnuvcpt4hzspovzx9j889s4jx0tw7vvu7mx2or0b4pph9lhscnmpl0cibdqidk1dlkhh2o3bmx56l8sjq8t6ohk8qybyw7hbhcoeyphxp1e2xskptff1vzbun3aug3j6krog7ns229xywafrwxwy7v0kv8lnhsd3woexuimcczs6s6b4wgigq04wj5v4oxu17dcur0i20bmd0rld52jjgj6g4hyzzq3yy1ii7h67bah7yzpdd8fckfxdjjw6gou3ocwq8c0swip3zjay8t0m7huiv03tuy39pyuv4ewp4lf0jupon483d8yupsavs2xjiva20d7bwmthjs19kefqzprk743z89v39ri8p1m678pamsih3agy0rupiv97u2udm736h6dtqg1eiuby3em6ch2hd3mkogyyabp85ukgbl4ki85uojgnye99mg5m414y3533io7dupck976fneab09jyuqvsga45jfzhwghz8sg6x7uqab0kl81pvqv42k90l4gm9mvx5ruburzx5o5xs8jpajz5itc546s1apxpvef4l68cc4vhin93hzkxijj2dq3aag38t3k5tfj0anxhyq80vbwp42et2k1phj3aisqhhoxycn47gmyw2itlk7vlrkk77ea9hxk34vkajv0mehzt4tqyfpff1xa92r45cedgxn28jrrdyyg68408ppl02vwvrc5m6jg1qocbnktc9',
                        fileSchema: '6xwl4m6eet03qusaj7o8xrgx1qbs9vsvdocvts4x2lvffolww5lbxvrxch7hqphkewjni5ro076fd9ewszmebwhau716cfwzd1dv1rajhoixythx6sfcewbfsczyu55j4pgqw3ixow18r7ctypuk9gbcv47bwav9b0k6wcshf2wxbng19inm0l6wf0g1ew110gn3pz0hbewfsn5xo55nlz5zmldqzpkz2q02bejakuhl08uvcuhvywgsfkndhrbepobsef6w2it2yex7xxxmlau0n34jg4993ojozliz699u1rxg0srhqq9sj0lmx56qgn4p7l2o7x0z9kax5lavzt565wv2q86met3e4acmt9p67auwy2ykx616ykipcwh5hyu1cw63h3d45zh4vayjo7u8xip6ric1co8vh254l77ee0mhv8oczbv5xmsbr1jg2j7d007lhs4gj5bkgbj1k3lhtj0praewp4begdipqja5pgsrwacnd05p8h1iy488uu3349gn0auku4a5phf3ohqtusq21jhgn14a06o0r5q3nzu0s1l3tqflf142tfa68k1ulosx6oflt2rceq1wp328knyhs8yog6183db2r5lva8aoty7qpmaqgz4dc3mflibmqwqcxf4by64rnbti842bl7r9t9pcd438nur4vk9ohjlybpa4zx9xigb0wrxz0ae9isedvklso9ro5qop8cc6cusq2jw7dvcryzpcwcaqn6k4pi0gpmsww7je80h1main81i77b9hmoktz0tdoi3grh3oxpgn0j14orl518lvhijo6zc7g3gu22wydsvgg4w42oa9x0b2ul1jpll3i6l2ykh4znkipowe4jdrgcmw7yj6ldvch2xmo67dqx2a3osx4fbg4put5481vyvctgohvma2z8ly4ucd8i3ermgb80ava9whmd4lb1j8tqj3i7t2tyn18rd19wwkwtajeti84l1vrrtimmcizcvs3hvqc0fgfv00wxx58gugfqy1',
                        proxyHost: '67fxzkf4601pgkcns901fudequzswgrcjd09ea4ajez5mr7byznjiff1susg',
                        proxyPort: 5154918051,
                        destination: 'ciimf0rzlok5xtnhn44a8qxw1j07zxrjjnzn6p9t8bsmjx7q6pfls7o96e6m0ciz5rqeh71s4todkvphps9vguotsvlitpdbge5ex0rvvykwz7zaumlptv4e09pn1ec1azdl5mbsq74k4wdi8rbfjlvfj781nqm8',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'q8m2jsc5213wu4j03vy48a87m4nrqjm27ammg2cpyv3hqev8womzjzq4q0xvpn5ir2csg1o4f5brhe9n2tdgiktvoogn3sd2z1906a9q8kkjmnhppygxzs8kgrh37b999yu05fomsqx8tymhpwlg0b7ccyu9r4sf',
                        responsibleUserAccountName: '8svid5vl82eeghrtwd7q',
                        lastChangeUserAccount: '0b98ealt0lb99ybhhl50',
                        lastChangedAt: '2020-10-16 22:12:53',
                        riInterfaceName: 'vzxh7q2blb9bk8onjl3dwwyyc86hdktgi6v2q4355nel22kl1ogvpxbgwfiapn04innwtln8odwekoxazhqjtml08nslbbl9954d11pwsob5o3zr01z7tcbum9c1vlrzl4sevnb77rqw6jxrgaie78k02alug4j1',
                        riInterfaceNamespace: 'sbovp8l7spxd122vn46q4yelw12badpqyiqv6krgke97x44saxp0ct8kzbioprb0dbpr6ie37561mlg6k9e99aezwlw5ev4r6kx7t3693jkkhkusu9sxiww5e3u92gdf21m9b1mhcc5zska0o3avs6vv3pngpbcu',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannel).toHaveProperty('id', '4ed0a814-b140-4617-b92a-85d2772325b1');
            });
    });

    test(`/GraphQL cciPaginateChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateChannels (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateChannels.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannels.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannels.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannel (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
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
                            id: 'c2f009f3-acab-481e-9844-dcfb6f058594'
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

    test(`/GraphQL cciFindChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannel (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
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
                            id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannel.id).toStrictEqual('eeaccdeb-d348-4c26-840c-3ec824b712ef');
            });
    });

    test(`/GraphQL cciFindChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '39a72041-9c76-4148-989e-c6122d48691d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelById.id).toStrictEqual('eeaccdeb-d348-4c26-840c-3ec824b712ef');
            });
    });

    test(`/GraphQL cciGetChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetChannels (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetChannels.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelInput!)
                    {
                        cciUpdateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4146c747-c5b3-4883-ba58-b5243fd60dca',
                        hash: 'mvimyia2yvozv9vqu8oewc98ryz0nypgqsveb39c',
                        tenantId: 'ae452b2b-c816-4ab2-b542-f677954c24b2',
                        tenantCode: 'cl9iyxssn38w1bdcvk9p2mbnzpfcxj4wn3ns48vyy5ilppj8mk',
                        systemId: '98e7cffb-8fdb-4686-9f39-df83243f0ce8',
                        systemName: '8hp6o89owes962usby4j',
                        party: '26oijbdf7t9bonaezprvqglqlfprdzcm23ilsnt76n491n654bhexxzpzp6ga7ooow25384rqqlq83146h1v1bn8w7q4mrqoc7q3z1kt4kpk9y9ig9qsh4bs9p2odqfmhdz9q61rkr4ayng6oba7bnj0ewn0692i',
                        component: 'pc71f7m204r8vefqyzuc6oaspaltodr6l2do29qh5hq3fna6gmvg5gfhbnmiothi45vliluoozt4w16gid0dsn1u4r79q18kgk18sc6ioo9jiodggeqt3si1ginjdg9sr3qwwdags960thhrtuuafhx9c9aenm1a',
                        name: 'izrq0mcmbk9wvvtj13x0i2a2e0sofw7cdxv0hfalvfl0pp5in14d2tv319echhx7tyrf6hqpd8bvjis8m2z6rxlxllogegaluf5o8qbvmdy6vd11s3wq62bpxno4i7qjrwmqy19hu072a08zaid7jof0qidi4y42',
                        flowHash: 'qso6unb7fz7ddo1v3m68yb9bxwsrj0v5thznqapx',
                        flowParty: '8805vj2xdqqa9gf9gykhlz5mzvn0o0fj5ryfs1a600ijtjjfy1v348hrvzixm2uf7d4o7tyc7c1c88rax0glcuw3fo3vbpui5giruytlrr50g6k0yqppxc6yoxldkdagx8c6c0ni68ss4em7sjlmona3nk62q2aq',
                        flowReceiverParty: 'xx3n6m7zyp06ad8uwlbnxw8ct4r5ac1pyvnpx0sfphmfvmthaunvn728ur58ocwyc11wziezvo0t4gjxg62mwi7zl9d1nir787x3crc9ho8dqxitn0aggq9z4ibd8j1gs4q8lysmq0jzn8o3jqnx26bcl4i3bo3y',
                        flowComponent: 'wq40z65122u4qh9gr6sl47aqo1aeh6oe0ccsuocts5p5f0wkiifzny7m8x8fptr65dfc32xd23qze4f9fr25xoluwnq0cxy2x25eq077cn8jpgp6fqdu0rqlfwjl9o5njopv4x6c5146bvpbrmsduz1ano0hlg1r',
                        flowReceiverComponent: 'c07ahpzdnlykaeyj6zim73mtzls1p55870ds8b6bgbhimbrsmk8m4mym57n9e4v329pdpzlq3rm8keoa6qaauenpfg748ay714h8cudwzrlbl6mi8s2gnpz3cc9r0r4gyo78xwk8o70nqz3a6rf94sx06cw216uq',
                        flowInterfaceName: 'lcnlqaljtb8x869r12kl5iwkle62mposu41fet7m198pzp2isgl7h4tzl58c3o454wyelaebfchivqjwyyqlqqxht2vkdl0ahn8k6nwuwd1o76cx6kg85agclagza18of00ae2nkezue501d5xwa4bm8velq3ok9',
                        flowInterfaceNamespace: 'lldt5h2gilrp3o8ygak21y6hsw9zeb67b96rh11ycvpb516nwaanon7olrjenl0hfwkje21nyah8yc62mafayj8keurv8tijyr9oz3mklh9dnrgzf51zzzoo9gd8joihmqwe8xofk1ycirqjskzpkmb7r8dznfvx',
                        version: 'empv3pdfbkvot9jh63hh',
                        adapterType: '8ehfyocfvakagd25l9eb7iw8mbkzva5sdu0zmgw6608l3d8r67is00gk1xev',
                        direction: 'SENDER',
                        transportProtocol: 'vgq6pjv9zc6sjuoig0um7ulxy6yi1jryb8wafe1a7cr0ibjvkqn1brr2idzb',
                        messageProtocol: '8y66gikmzbfxgy2lsommco38tb9b3h4380a71omun3k1pn1x4filtb15zm8o',
                        adapterEngineName: '8uqywg3gwcv5lf1z353q0eeswjn7km8vyjtgkrqcgef6k2lvt5x3sf8hgdtb3zwls75rca9ij6v76sw9wfm50xclpqhxkj1x1axwvg9ufg30214d1xkmikupjdxdtg4w9tlmr0shlc08vvxsw2vatqym23fncgae',
                        url: 'm1z6xqd8vabpm0b766lowdhljdnxev12js8j7lm0aqyg8d9jwwa06jw8mx3i2nxmdd2ylksjok3eq96lrmmk28mcjdtuyi5pk8zq415v6uuzp9k3jk5ayw3aoyp0vlepnuk1f6txkwlkwe9xkm51p7llnjzvgsyw24tgik7yitdmw0nz7sybaoxiiwa72axccle115w85f3bojm1rwp11ps3klpm20vreqwqa8z6et8c8ofetkmhple7htaoq66kltoea1lvgmfnj5trquh1ozzino1mpq550g12esgn2vlkq7qqtzrxv75r2ls5swo3',
                        username: '66n7cwswwfhenr5lp0rrekdihrdoaa1h5y5oqzgsj6vbq4u7l0lonpj6o1ml',
                        remoteHost: 'xp1vg860c6hewgj3evqcom0cqx866loczbqw0d8bfhsv5t7ku3vxymbrcawt1s8ex9hq9sir9w9q69o71drutbc1dmbydpqjqcibo8n9s0o6cx8t6r1h4agz478xwjs0lb3ky26rvwcc88t0dg0aulh95zflacgv',
                        remotePort: 6499548798,
                        directory: '7fetgrhq9y9l02i3tcipzm58239335f8ksxiusebeyfwiclk0pv3z0u9gnt1nmitc8420bmasvhzue664ar8qqr6c105lfqz6o2qjd95uipqcokhk4kpo7u0wna41gzf53ttkoyhjjrhra62z1uz6yantaln3qds1u4j45eup8u29tb77gm0mvj6uhh398aj4vub886g1k48pq89sk9evo1f3287jhu333px7699eic24nkkbeve7nucbyszvjvmvmjuctbyxzxztqr2fpfjwv7yuoq9kyqauowyud4zx5559smhgkb7r14z6reig2afxzz9tqdjtzlx8e4rwsukr85w70j7jnnyyqzjlw8c14oospx8w2r05b3tigg8gliuii8ccdy5f8r9d4x3qtn01dgoavreydte60ctjwxgqfdaz1vk894caawk7ecxiyclox1rnyp906exmvbyp27nphltvlthrqwslyx1u2ttggfyhavtsy32lcczoc5bttzo4off5crwov0x1r2qhmh265omzaug1bne5f1yod4k3pg91xwbnndvmgvalhc4m4mcecj4jw2wrxgl0gl3f552wy2nbl85i5n6nnkw0pefcnikijw5l6lm9s5mxgusq795pe4awsqztt3h9lwud57p5kplsndfow5auyixxla8bdoxh2vro0foe6rzyct15wxgru6b95nt6xvqjksn5cz3vlzh67hvvq098l4xj63fz5e1kd59jw7oqk8ou5045wffa4z5k8brh6ko67lfd3nxuyx9sm99dev6td8uhaeossqtj6wv6qae49y76ubrxixzayaq6v1lk7gkrlfsl5naqtqlsjqk5sawfib01j96zkqf1q1klqsev2w7vzth57e8y8aj0eqouy6p2qjzam2adtgvk0c9eh0l6i1qecmp8m2gpgdu32q5wuxzfzey6f7r2uupwy8cskqbavjzsaehoxorueao1y5x476beuk9srsr8c249v50onka4v3vegfn',
                        fileSchema: 'gvaw7lal3f7u8dketjsvftg6b29kfptral8ryte26eputdy6yhyw5ufak2qoie9k3cn247i8jups6xaoaeqhn7w3kho9qnk78srrmmwu4yfz5viqtjdljnh9sb9lk6nh4jvom1hfx3rbv2ssw7hzlfinivq488x2tl78xeaaa76b240xt848orhnfna2ol47d52qjyxob4t1t5lz6r7s09e5qrawbsyua4eomjqjtgh2veasr82dwb9n4fnr78zbcllx007s55rwadsm7qk36x1cbnaaetny8ka3b1zjnnw4z9acje211tqrnnvn2wbr0ingxv2w449w1fzlzzjdcfdsqkuyxehgongax8p30nj6d7eur33qgaaeqj203phcoshadvnzcf0mum8qj5so2lln2ahrsw5luwd9tdtzkakrnam91rc4hzuift3uz6c3drmca08b7ybv5xg9hgag94ow68ea6n2r4zdw08avlsqqeoxglbe1k3cjskhbefmuxwiwboz583q049qkr7zt3iaslo2jkab79xggleqp0fnl8qiuylgkj2275trm1m6dyv2bwcm7oyroe233xipl8p6fzpavue0p7ojl8jmuxx6w7hyorak800dodfu8tv68g3cj2nsar9ox5emzpuphqtr1wh85dxtukkjyo4ydfjp8bcs2360060u7w7nc41u2w8011y16ha4pxkzehfrvn30rb8cbb2ntl5tfls9tu623s6n4qk9bujgjaa1jm1qbovw9eao7tvbvx6m0pw4pa96vpgbaqd7j0fzkdwdwcw7b029h15ukq8uiva8y5st9zs24f6l5rfm2na4yooc681fe6iqsmip7a2onvl8f9arqbwt6gu58xy8990zyvx8pvhlu655v7j6bt66xwvbozoqwu4fde1wsnyaljtuyujvpy06iui2e3jiim5peu8nnse953ujbzq9p9w1z417fcbb78fzoqzldr55ldd6rtcfx9bsf8zkle0syw1d7sis7',
                        proxyHost: 'al98wdtidr7aajx5l1xja5gxlyg5bpqnoyfxn3w42mu1vdswpd9zocuc5aei',
                        proxyPort: 1918317706,
                        destination: 'xse3jpr0jufovriguywpncrr1uh52rwhtg68m8f7oagyx5klmza8l2v1f1s2yia8e0yh6nzo820jtjb8z7av3wltkn178bbixvy8ksnvso5szwzji42c543pmo8kbxq7fckktx1069u54bltt6j79qi1b240wcex',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'mkkaux6qg69zof8dsukknh3wn56b2w5urpaksmwkai522pkolcqi0dpjv3t0i15c2xieidug1hxtz3ona69bas17mhi7zouxdeadzmsiw5nuxowpmnqru6d1e5ybmunhjyvrnl4p2z9t4jkdtf8ffrohanepn0ho',
                        responsibleUserAccountName: 'jmoo4jfjj978qh0413js',
                        lastChangeUserAccount: 'tyxv6w1j9dh36cp51afh',
                        lastChangedAt: '2020-10-16 17:33:24',
                        riInterfaceName: 'gnc87nmfvantl9nhfwxjjs5f8gymbcsqgwsgc661co8eznihsbv3j8lafn9oxhvhdrzjsm16mx144nduklk57zgxn39l9kymmq69cmytcdy2hahi915vi1f13sm2icaae4d288qqikuqsrc8cl17hd3nz5vivbj0',
                        riInterfaceNamespace: 'n57htkkz0xicatddqwcx149ygbb3awner5il4wbiww310btlvf04h0c241vpnfj5agszeayzchut7ogxghikgld6ds7ml4oc5thz76aly5qpaftia3uvd76n0r43se9vmz41kmd5vkmz2oxpec0ywtuds4cgg1or',
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

    test(`/GraphQL cciUpdateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelInput!)
                    {
                        cciUpdateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef',
                        hash: 'koaohvz7qd934svg0rkqqfqtstq4jo3u3ih1fkt2',
                        tenantId: 'c2e96b90-3bae-4c59-baf5-751d4363afc9',
                        tenantCode: 'qjexfx0d7p83fsxfuutlax0ourdxgsis3t61g56f5ktpyhykdp',
                        systemId: '36785ee1-b5b0-4748-9062-91654b880438',
                        systemName: '1xcl090du5i9oso9to4b',
                        party: 'sj54xvv9gdfn202evhxyiw6d4hbh25lzczvj7sxh6gfkvz4gnuc2gnzw3c5hbef804dhzpkxhyfne4wy6bq7thsmms66zyu4t5kx07zvd2lkdie1rqsxqwvr3smdme4uei66lse4n6i7386ps4bqrnbe2g2r120n',
                        component: 'ivy7wym31653gaza7k3najw8ltbzy81d75tdz1bmb13sec3raye50aeiwt69ncigoipzbyfq1l860yj1qyxayac2529b966wysytnmzdskfmdnx7jyx80u3ahgw3dp2arer7agimkt884mpvb4g931xz83jz3inz',
                        name: 'pea0l461ffzb4sn6c92zy0d6dc0d603xczxyya1eohttofq7elssd044rl939div0l4svne8cdz1yup5vuw6ojrapgjknkzjutx6yfguzp2u04lzxv4xjenbzeom1foyiycrfic8sw86nv04jqkztfhl5abazyar',
                        flowHash: '9iztpfaa8qc3p2wclc38qbk5lssgy65ggdfu0l8b',
                        flowParty: 'famr5vkh22ebszw9ww8oo8vtvrs34ik8f8kkkexusr25ngahhl8jko7k1sqcoakbkukr3uq9fsq3ntt52evmyidwjt70rfaflrfdbitwngdk524u3mktufb1ejnwx7pzp6y8064f57nppubqrbiouk1j9cnzau8u',
                        flowReceiverParty: 'p1h2dt2g2xzf5alhppml85i7bgx61ydftdn2fshcay0nju3mfwjtey12j35vbkbf14v0f7asupklqyyfokesam9ptayo10hyj1ewtdocjhjitzmhmyy0u0h1ja2ew69jzmqjh44271n6butmgc8xd3fita9l8yua',
                        flowComponent: 'ztqvp55c5f39qv7ovuv32r3lb4e50qglw35cv9d2gacsnpzn5z2wny4unicp6tijpmx0wf7uqiyte92jx39jcare0lmfiotqpgpaknsbr2rcpcdb0ms6p5h72i2uvwffa0jrhftm991rqic9b0air3bzodb5zrd2',
                        flowReceiverComponent: 'tjls2ngflmbtxauhvu1atbtgnxb0gxuzy3tbhggtwg44u6nbw6omqz3bw6y3qxiubfkjsudiwdxiw5qvoi5x1nzxaafx8fuv51zvtslj2vi4jozlxddm1c5xztwyx5vyeivkss042js730jl36w342j4xthb8du7',
                        flowInterfaceName: 'vqyyxubx1sbmzbbyawuo2u08jsn0cx5c0eigoidjmu50p550v1jhl6kysagmlfp9h18jz0tfz8pk8be9v7apufqk27b963he2qoide4mpcmwngo968wshou5zidv581iw926mq1em4dovztipt99m0n5nh55cns5',
                        flowInterfaceNamespace: 'ad5qe98fsa8k6t796gk90n5dhllo49gmbwsd30h791wrrbz3bkj6p7qnz5x84z9w26d2ob4du91um0bq8zefi8yviiuw64a5vz57ojp7viaq4cxpyripzucsx1prznb5oc728c5xy981bcbvbhsl9l2eh517d5fc',
                        version: 'zywa6qm1jbukcxlw4mne',
                        adapterType: 'sgrykn7jzle0uyzhtfau1skvdt08wwz2i1ye4ufv440pdut0llnvfh3nr62v',
                        direction: 'SENDER',
                        transportProtocol: 'o18hm29d5nm93xu29j86rxa98fmh6kyedj16whaapfn73czgzs149embbffg',
                        messageProtocol: 'c7wvb85yp6wbm5vmx4c6a0qt9bn7ypz1x9dz5azc75bzyi9o1y4y9ih4d2ht',
                        adapterEngineName: 'fm88zjejm241u4qh6nlo3vg243ny95o0kzqy5wb5s0f53rhwtvd7uor2mhhwb2f1rk2hqc9buv5xwlbefyharg5t3rjc4ntb0o9mgbkac6jdxanorp818u1oabbzd1fmgtyqkcrkz3u1ihbw49r5nco975lfnua9',
                        url: '5gvrt4sb2917towptebdrifuy2u4gd94v9xwfopftlktr9719t6cj4v8f3awyyerl83r3ga6d23po58lkfktlfams064rvjqld4bf6qn86lpkg7d029kqo7pbmcgpdu1flwp7c9ijl2qpt7yn2zbdiappdedjhzpugi4dgr6y2ei5crw3zyq8bx6zwqqzb023psemb21wlxqwl0aoteb8zm2ifd7zhljy4cm4a5exe8wc8rq4ucplga5kw9jex2ifbuob3eypevlb76tr0r3pxwz75uxuzxhylkvgbu36z9359y5cxc4r9nxtplk3kvl',
                        username: 'g2pc8d5palurwrc4287hdo59vpy1upqouvtmd4849m2aoygnzhr1z1vbhkhl',
                        remoteHost: 'bwk2et0npm9d4xeegftui2hlo5lxq891ic8t8p007dk7mxgrlghi1p945ed2tssk1429lopi20llasicznot6965eaiynq1urkadd9lg8zfxzei7czxkttf3t7jh4hgpwfknvg3qxhei679himkfoc1fxwnzcggj',
                        remotePort: 6614488160,
                        directory: 'hcjlnvxnrn298xoy4oz80drif40lp9iamijlrs6h54q6b2ae8h9kn2levdmx8thhh0twmk2k7l396hns84ir00mnysbfl0bmg1d2578fpbj0nx7o4wbd7n67mhl373rey5zkb88vjl3eyi9t2i55y1lhnb1yazx1dohf226zknfo6au69skatvfcxyv4gtqnndjglv334g08lqhrs0om77sdasvx7iuf0ve1wlkgdx7ofzmi1p60hgundfsgtz1r0yclxsypdhaw6t8m0eckspb9fthpgp4hm2z78nnnsv2gnuk24k8122dvy9y53db8qjsfjfu78niz6b56knq1mxgzkcxlju1qlyfq1hjqt6kanm7lcckttf9jdhxl98rrjr6yjulwe951ous4lbv4lc7psmkzudc3z4nmcd8c40lw5egjk0t4gjf9fcyntqsigj7xs0lwk4gfe1sxywtiigrgyv5yqyxq7ulk0w87u0flw17avpf0cq808kx9j1zr8z5yswpi0id9a6fdqxradjz9g82xa8mvzppoyqmugy155hov2yc1fw06wek41w1dgqff3j4ju7lcojnhr84383kt8ai6azomdc93sp24nymq4flqz5uq71hgrm77ophbiuct3mqmrji1f3fzf8ixwmtpk43r60mqujri609wettlchbmb39444cn42nzu63y55qmvvgo8zr0lfeih8nbmw33deo4j5es2myyqms2xp6o7ecor6yjipflp2ypbdigxvjk3zkiqbeyhhk85pdpinft8bdtv38zhm7xbzpe13rtmqbe6xmzmgnjo5ixhj8yu1q0g080wa3r803ut1l5w6jko6uzezr2bgsrin6kadmxq6bd1l8d5mpmzy12rkddd4btfzcs6k2ivthy1odyvhct1qp67ocfmhprzcnxxitleor9oudwwk3su06d4bjc5zvd8c29hzjavw81in2pi57gsl3cqj2jafims4x7dba0f2j99qi39edrzviwcb6y',
                        fileSchema: 'o9fz37w7zx03vu2jo88j77plg5oc23542yebly3f85tvczulm0dzpcuvrck6cls7byx812hsqjfpv3xdj4kzawofhjmfb3hfxx8svvsazevv7dmygjpoc286k0f5wucocnutdw1cq4vpi6l84bzrvp9fu2uc6oqzmr6ir36oxiby5d3s676h7nwjcudm7ev5eaydgbmr59o85ivs1cydrkwyhohou5bgj11hu5k66wcclywhf9fzcq9h4acmrb78u8xnpkk958m2oxfflu1kplqpmp9lw76sjns5ygzx5c175iyvt1wv8pd9wwhcdou78p0n4yl68q9lxadut0f5ckrtplf22uughmedh5myi1lrl776oc6gswh7w77c68s43rlvyvstl2u7skygd6vmqmd7oc7fzb804427ut7ujnok5vu98wq8rykop3xhjyfke8oqsho7b27ooy594xdrmjzgkm44pua6swtsto7ol8swpl3kfwd3c9bucj7qsluh1d42qsue6ifaa1kwl0akd2hyug4wdthyqko7vawtorwj53ieuqy1qsbla1x17pceeuvortu8inaypo73ueetr66xh83z413ta5k01xk366k98hdqozsys1jaagdreof1mqphohkkq5uq6cmrz7db9xtx11b8tisl2wue1fpy7dn3yfmuhu3wncy5fh0b8c0wyizu00e7x9na3q3u67aay7q79ztwvn35htvw7l2texw01uwlpa3mpzs5n1mydb03qvvbkl82dig77x9jpxfos5yw6218jn1d3g2hzprfa72ltr3uof1wdeufennizk4l38qlcocr0r498bxbyp9k80glw3yyyuhipl6te8dxs8x0ze4hrzlv10mmlpmtduvvrgpbf5ou3fc34rgiuq8p0hcxgzcvyghjkx9qck1vxrk19zskmttbe8gdosd72t4drapfcpg9u82ka52zwd8afed23sed3d51f4ujltgkexhrsbcc6j0s4p9itq0zrlem',
                        proxyHost: 'zbi630wkzou8ctcx98ephl9r3lqqjbl10xxmd3mkxv94nkwhxgra1v5mkg8a',
                        proxyPort: 7799881460,
                        destination: 'k84vrqs624kego0e916hybnkd5tc4ined0rg51qipzveklyeoacwb6nx0y72p1uwph5intmpx6zy7qp0e5lgpwpz9clu9xyrt40tfrxomgnqlx762tf5bjbhoofatilnsi031y6wv7gb9m04eghbxby6e32xffow',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'b29gyd5gu2kjt6dhmvrlebs4rh3r94vw2ca30e6ts07017n2i5cnw6t9wjweuxce2rocxhvp87bgelnxfwkyol68qg4alsrli69svuszszibb00s2avwu9p2dcwghc0jbkwxtndrf2xde8mww37q9linhbxc9l0b',
                        responsibleUserAccountName: 'jjgt9sp1tl2yk07samys',
                        lastChangeUserAccount: '0jkkqmagl1mvlsmamk00',
                        lastChangedAt: '2020-10-16 02:52:31',
                        riInterfaceName: 'xx48uwwlpy92g0jglcl1bizl9c6zw1trybfvi0bm6fjhjn89l02m91fq0i22b5610bezecawjxbs5tmpgtjdtwfv3b1p3i783zkjwxbjniyhvat1bsgtdz5abgqzgjl21smtxnawlq33lrk5ihujj1l7fxm59ict',
                        riInterfaceNamespace: 'qmr206ttn5qo4vbhzrwjy6msd28kxna7k24uzfw1mqpyldqmwz2rakm698mmet6qr7rf0pmqd3kk9pbq1xq5b4gxu4ry5xawahxo53o6zuf0wjgwd3lmv1c4bkswohd7y58zvqmfnf1y0q5x55eyn1gjqpu4yz0j',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannel.id).toStrictEqual('eeaccdeb-d348-4c26-840c-3ec824b712ef');
            });
    });

    test(`/GraphQL cciDeleteChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'dd589707-29ea-42fb-b8fd-0c8bed924af0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'eeaccdeb-d348-4c26-840c-3ec824b712ef'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelById.id).toStrictEqual('eeaccdeb-d348-4c26-840c-3ec824b712ef');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});