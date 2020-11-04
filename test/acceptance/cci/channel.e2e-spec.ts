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

const importForeignModules = [
    IamModule
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
                hash: 'dkntmgv9vkz8bmeez50m7igdhxhbttseg33spq2a',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'mhn2ewo5ps65ejvz4zghg8mumlelxau4laqadoyr4f557pm6uu',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '0fi3qk5d18xiwj54hwu0',
                party: '4ervdcaog4i73fu2eie5dmtxg7wk521epfpmra27nm6f5pi0nf1njybfre625i4rc2uj76utlpo7wnkvw3lef779zw7wveymchpf2tuky1lw3wqzvgvohgo9u8eg17gzf78nqnhvua7ktz4twtp6skgbba73bbiu',
                component: 'ja1gqbqzczlbcqmsq8dwtirxqaw1rxm8lk2tk1wlio0d5pwdzagsatth611k4kn7pr0jn84fzlq0tra941xkvd4k04gkomk8tjswsvv2cbqo01rw75a1w2nne4y2tepsh20lva1a861d8gvvhoqxalovg7n5shmo',
                name: 'ji3wr1ep3kgzfaj1v5e2cv35d3xxxkx4fzpngfmuvy1lxpm43e9esh2wufij2l4qn547vm4wnimfxi0dpnar2p8q4brpj9ruukqdnpoj40m8audcpzb9usnu2r4u5y2tyabhbv2d6bpvf1uw9d2kinus1sppmkts',
                flowHash: 'faloy804kdal2jeu2wykqxnxuagmrxv2h3l8wgv8',
                flowParty: '45xlk59mfh8xgb8ne1wn1lesejnxndtsmxn4anvbe8zlfz3bpzv1m8ezsfl2xq82ueq5nmqxgllvs3ob20gi2p0ydysxuanco455ucxq1jwiqp92buuwyg0dfnl1groasos7jk2mlisylpy36hrxneoa50j4g1jm',
                flowReceiverParty: 'sb1ysjs2ulk3upx5ggd2sou267465x0493ru04nzstinwbn0pocjou1qwqcmcjsuko0g22fcgmblrkvzcz81m1myuzlnpr14ysw0g77j0j4msyu0h9zfmk3qt6oi4jvchrt42upaf8chhpe4kvms137lj81my1rj',
                flowComponent: '1qhn6wj7z21k7x13q7imqv4jyqnc35umot10s8elznpwb9zc1cqre3ppjei19ee2imlqhfejkauef09voghs732oida3aih300vrntxb417wu4myq6sef5uw6i2zpqsi04s9osn01ovcm42bszrmk8flhn0eddgs',
                flowReceiverComponent: '4zjlukk1vjrbln7ets79f9tv01tbt9d38y41mw2hzkk38dgvgmdbndnbmnfphinciaybx2kl7rzoc8nd38ygjcboilwyumy6s0rvvzxasq3b1mqsra6zvxvsmp8mc006ujsaqtk7ez5n9pig48nssmgbyxtk3os0',
                flowInterfaceName: 'rei8xbp98fkey9dd32fkjs4xfz92iyimeb4ccv7b0msrorvhk3frpdvcad55knowy5ftau8lqakb42009gtk9b7y5yt7exq2izp5kxl24c4smh1yamwwo3qcha8sf1544hdtgmhle470nb5hx0y3xkhpvca6mzio',
                flowInterfaceNamespace: 'm94qrxziuaxcglymbfb5gu1ixcuvifm6iay8yznb34qx3u7mqic78n6fwu6y3zkh8pjlzqleximi7znj3oc2o73vcggh2uqhv8fsgkueqhjzwb9chtmmcu9truhev9c9pyijtj92tfhyyqk2v4ikr0yilwuxe4fv',
                version: 'e7mrz0vj3dsk3l796gdp',
                adapterType: 'npoy0juvs45yat7wq3s71fi0fmjuiy915489j2svf0xrakk7s3kuz2xf8g4m',
                direction: 'RECEIVER',
                transportProtocol: '1fimcl1jg31i48c3e8twzq2y1gt7x5z6nivhvewjhzlifchvrzxun19wpllf',
                messageProtocol: 'eqi5qrti6rddqbncucymde7iqe50ivduph7xic4oas7ki6xr005h43yim3mx',
                adapterEngineName: '1eydix9mj2dj6fre3ewd881u7ioc0v1h640kq9sz624dipshwk7cg7lbv13inrncxuhc4tyb8a4cfroxbrukxrft4bw2v9jdkeyvun1wdxy6fwiv8a6fc63tblkym1i37aqrzeve7tamza6g4cjtia8mzltcyr5a',
                url: 'c5hbphs9nlh0749gll42lcxp9lrn8koa7dbsh53wdam4e42fjyyv16yfa4p16s1mqhbaw419vnsd1hg7513cacbioo1fb280syp3lxony4vze9d0nnyqdpn8q0zkygmms8hhfhijo0q7w3ms4wuea8ax9vufa3gq80glrhglknmrn94rr0dvwy2md9rask6yqvg32bxxsn0hvhnol3wj1redty7m4fy6tefhq0lpxfpizj67mwjkxc0s4e5nq2r86ejroth488jclwfnpnrmde38dgcsffqutjtpz91rtxc591djvqvzks28zd712upd',
                username: 'xmioz8q0gfxnogjxajbqd48p1nte7k4i8h6vk5qtxct8b8bo8ppig1xvhmgd',
                remoteHost: 'v2f4s6axni24sffxwzrwjkl2vhvv09lfjbd1wvp6se3nydpg5mg2p4654tytzt3fyxt10ikei6getfuqw3lva4qqidrquxynxpf2gcub51z19dtdco9qemqiecp1svbkv7d3uzpfdkrzf3hdwfion3uo8sn6s3rw',
                remotePort: 3552591631,
                directory: '4dod4vatptfalmeig57u70t200gi0ivyjo1kqqfnef86qiao7j52c8sa0naxo42lw9gfoaokwgesgoid5emmezr1hh10lpgjc862srdm7afkvj6ogdfdop2no8o1e1ut01eutp94zikoa3i5ee8sevbn2iyymm8m2dfh9p73hbwra0p30cts9oaduuoiohzru9y6o7t9qsxmf8oacqh7a3o7oalnkm0r8b6843krvre250twcnk0i1zm2gjxxudpf4j1eqvpe8ohxhslbjeia4mnzj5rpptr6tuew6xo7n27rk9cq4tee1iktnbuxumpvs2uc7hi6yd6qtb54sjb06g8mtta4pejbxsafc1tm2c6xude0uwmkt60ncyb73esfvly5oiv5b8wgcvn3rpfgrf4ee68jcj6d45jg2whxfdqdqdpe6rxlqt9x4gwu3j18d6gidp4vvh7uzytnqqwq8wwoqlrvfj2nfa5nx87e84g4arohe2lb9yswqbp10k0ckmo1bywtjfzbrij2upcwe8ygzs9t2tem7cmsopgioy5uldvhzg3uut1tbvinr85cadfk5cojww3vqa49rddjgdg9up9zicci0iimu0d09e5ith2fq50mmttw8nl3zbwqapdf8jdg5zyuictp93of0tg83d3rldjuz9o5jho9h6t89dn5ozt6oplbj6hvi45eadcmruhg7lkzt7fi32kj1bmlb2thxpp7a5dxwq2sa2vdro6evpf5pfhgwskiwnxpfk894houdl2t26ijzxrnl8t2vnetq003durx4vfzfzjq24pkbz1dveza1b5xc5c5frmlyfcio2mriyvb0opyfjibidbywx4uilmoon1k05fna504tmxkv8vywgnddbcha4yh3qurikkh6b2zpiwtsqnwywr189as01f9uhoo8qa9ilt66uqbbyj3znif43694wb14juak9f3drj6x50o5pb1gjz88tfi2djit3fufv224o9b8qkvnhwib44k557',
                fileSchema: 'vv7a51nr8op0ss33uiupqiztccvuyrmj7zkht4m1u7jf016ufcme4tsve5cztjktdz57mtgpebm3zxtjp2k1zanx49w7eeeyjne9qikgq570fcurnraar8ktc79hbloa1o728lv6i51zgywq0scwm35hec75rfqtq7wy99dyaamrpp1s922lox3f5l3l9jxh0pug4jx6igept7nxlpk6c3o2fh0hzemchzhgl768ao3oql01gyorfq3lsa1e6xzq4ourr9wpajffm9t3z5dn2tpvscjab4hnmyq7h8yr3jc31t1ekyjuevukf2m1qddlq10vhgnx44oy4k69r4aus0fpqzg8zo28fedhmlp0bramg3u1kh1mdtdnkv4vehhv0qhhs84u8llsaw8qnoni2eo6xdh4c9j28pb7hsfbg11ijrfd8vgreujv4ncx92lz3jzgr0x1blfzx82k2g4ikfu7qlqe9kotagyhj3ebxrj7liyjt46st7q1hikjw050jbx7co82iev8ki6kxje5c1q58t14t27mbuf3q4022ml464f4uqwm3681sdyeb3kyy7vijv046kxdrvbdgv8hexdq3qmkgrzwftzug84yz7bd6livfd0z6dpe64yj3ki23xztj0ry8hyhc841kxcemgof5dpbkqhfvf9sdc97ym842k5s67bacvhsd2hbm0sumxoblga2n9torm7s9ji8qiinnzpt49wc0k9fpwx48t9vqmdxvv5ikm94eobclwtwthm6bbruofj15axwsxddgj9rsdg90j2wcrz9oc505zb9orn7f08vyz58xyig93mr6wj808urv8je2kse4t3c6sqh01usw786ct284wlq2mmx6ubvwubn9kkqhcm81ipobmeua42jhaz790zhxqjzcnhagai4t8m6rgmahedrslni0lygkhwbrkw1pzsi8pn7lrptl48abuiy2gefd2kvsw8ab7w3y3dsyrm0uoz5eh86eor6vbea6uz77rkaaom5',
                proxyHost: 'k8rdt7jqfsrq6z4fr98mjrkwws7h4aaosfc0owcoynwnlgq9idycwauucskk',
                proxyPort: 7080992608,
                destination: 'wcawtzznr9sdna7kjkp1cix8spl7um10482bzwktqtdbdfzf6cifj3eapuim1iod5xh3v1htheprze0eoowb164norrd2cv0bjgpm0taoss6vr3hmbod4h3djin5e4mhu1ido4jmu0hez6dc5dmxqyyc6u87p3g5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6qd0jaa96618mrz45lhbnq7p2izxf5b85ned0fz49pgaeem0rzkgs81f62rvuwvwak2nzwop55t3k1rn3a0frlprm3jyi4i27gp8lacg7couow0qx0p24niqphj1l053ulhbeyuebqtkzgk8h8jdcyfvgqnsfxb9',
                responsibleUserAccountName: 't6wqzla8s4o3g7nb6nyi',
                lastChangeUserAccount: 'dahq8op3egawdvknh8fn',
                lastChangedAt: '2020-11-03 19:39:09',
                riInterfaceName: 'dpmm00hydkoc9zkipsn6xwnx97aeptqq2h202l2nr04sptjrr6dg6jq8npg6as2uvwggxa8qd74d1hpdee5jaal2x0voxvkmybcxjec3syc5akyyqf4ycyt9sugz29kf177ni4e41pk6s6qotkvyx6ljcd3ys1sk',
                riInterfaceNamespace: 'iq1shnsyvf0968smc4nkk06xdb53k6sgqb8ynk72owdol401wl43oq6leoet1d7ip7xn6swbebco3up0x4ri2hhs3i6hc2fxtdlqeae4prd76yus7zcotim5fa7xq1qhdj4tuidbo4ou6af54zwg9ambhp6cbw6c',
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
                
                hash: 'hiefew9d1owic9jwdtdps0mm2bf8akktnqph20r6',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '4lu4av7tdp9se6cvwci3xzw0r2wpv8tu6tgwgru2oash5o4gtj',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '72yqjinmmdxsn1jyod4y',
                party: 'tz5tkoyx2pua1pc1qgkcd8dq3rk65o3f5mr0bc203xy513zbmmirxla3v1273g19bizhx7oee8dz4qz8f5trtvmvtfjq2ivap6ymonei6hfr69uf4t4wny98y40ikziym8mfmvj50zpghfhi53muh8ooxipzbdpz',
                component: 'zbu2fep0zhszya13vb2lzqk5zprg9tpt98djhyawrbs34g2dd1t6xnlr6asfxj7ycycff8mi23mqv49u047u7iqunlbouoyigjrutqs5m0gpz6xerx19p232gj486f00u73ztvzkoq88davdi2nle84zxj305ztw',
                name: 'd8ktz2cqot0286aukm2jxutrqfohuhb1mk98icpauvestsnllqoc67x16zkbejpvvh90b1myp0o18zck13u0x4n9zc2ziqgisn18vkc1x7v99m6vwpfex5ntiwybe6nlcnl4d8h9vgkgfi52fmsky4n9q0sc327z',
                flowHash: 'u3kv0i6oewnexk4i24poii1jzgmu9ou8qvo91qhu',
                flowParty: 'xpqz4vq4p377xnyrmic9drro5yl991si9cbo81zckdp1575u6nlpg8jrocrcyb85ta981xgdoeu9qy6hp9shd3g5ff1c6kfwhx8tfpaow31ykkqbli9hnku86kqy3zfiyktj6vfyh2luh78lxreq1afquxbdhkm4',
                flowReceiverParty: '0qxjzblql7btw6m3o2zb0e03ekghtu0zscu5pw2c3k8ufeleacvcfnwo2qh0xsznaf989nc3hpez07vwqn4liqxkmzd5w5dby314dte6sp3vch8r08tgmmuk5lfbsf3h6hie404tgtemlng22clsezw6pdbw0zr5',
                flowComponent: 'yk9vct9h5ymgmqiv90comy0bwe9sok88gh20cn2l5buy6aai0ql489t6plloe6dqod0ls6f053ygzg90njfpaf5ke9ut5uszcy2dlqsktm0oavwq1lx0sf3i2zq112p385iqk01lupnjug1zocj217x1g73cew5g',
                flowReceiverComponent: 'o47wehfqh0gs3df5pqzfynpkcptwr4d5gp57m91kk3s0k2qgmcub9prv6o9uf7sm8mrrd5pl4r6genbsw16l2rj5q09chogluy3lkkznu9n0s2gf7osa39rvhmb2lrn8ri6xwisxvnkw4rbljno4n9jh8cp88kym',
                flowInterfaceName: '014vq4w1l2ss6sm9b6q9awvt5k7ezoqhk6r399g4ldtxb97u6vdvcymb50fdeo5kmt3rbi50amkhp26tf7xjbu3prfc0rbdyy0hs7tt15eed1w3tzotxao5k358gnub0w3eu368c3x6a4qwn0fmxuomlgfr1ff39',
                flowInterfaceNamespace: 'eijam2pdqjqp3wh5dbew3fdl6a49frcdrfd63v9xibbg4u4zzh08s433sxocp6hcdaqnrv4iawjc1zk7d47wmo5dzq2p8x5qiuv4r4pde5yjmbkq2aojhtf2znwt68qp7zcoydehl28colcnuc00onzckk5st6t0',
                version: 'zbbw6wrb3tsdp2hgld82',
                adapterType: 'ca1y7a4v8hdo2yqaj9f7khm01vqmqhjtb0ynleluakpr4a8fak2o0rnb7kj7',
                direction: 'SENDER',
                transportProtocol: 'jfdizgx1s4bv4twxee6t1bx7f1sxjnbypach35jmajil57fruyff2joy9tu5',
                messageProtocol: 'sfmycmx1hcovegx0evjre6s9347rz6ynur5xyvoc3eiccsgmmq4dmlzlgiqb',
                adapterEngineName: 'tt3cssdj3t3vxq5mqznvot4bnkl4y36v4vjjo4bqhejkaraqvwx64vkxljnytyqtiaw6bbaevz2axzhvuj25zerk50qp8ek6uurqfxbrb5czsh58h655l9ifq2eikrkejd4knoyfbg64wg5xzzkjn3q7gj33pii8',
                url: 'g9ocgvqyclp4bqogy6zia7k602uku2bh8kbrn4cxv2o1nz3au4krjej4e119tq4fasqgvskccn4cm3ixzjp26pqxqyv8fngawhq4y8qh97fxz3le249v9w950r4y596h4e5beks4ltiktf1z1dpybogmvdcott933bya6ma4kbl6arwpgltx2d2spuz4sp2snqfk8p70ph7aj6mnbliyu4duflzm4dovzk28h4m0p4u8ye3j7xlcnb1dhorr0opwxomphoezmozd7njgf4lkw0pdpkj5o5hfzhrcthjdy98f20qszohuh5p7eu4gqfqx',
                username: 'duledyfkykldr92jefbevuph2i6frgsphhxws2w0zfswbe096bdc3rm7yoqh',
                remoteHost: '4s49ymmcenlkwmtmxn75rriasf4z8kgsw2ywq8zqfxw8rwb9wae5zp970rf892espg2si7zi6294k7rtro0utp7ziicyoq3z88b4bufm0fr7nugmihmheaggk6bxxg5y9s4dvvoledyou9wpzt1c3zeq5b21eavm',
                remotePort: 8233918913,
                directory: 'gn7py3fydqhbknq67m8wzjydhtwidu1f7jjgkeylcytmb93kwb68ke9xqfyu7cml2pq6kkmp42u4flalv9w54jc138syaq767tkv6y4pv7gf9vt4r4lb7rzijldlu4ux9o8zgjkj1hyrj4xell909hvlybjk8gvkomkl5sqb0oiwzsxd8qrztcffjccwql35j8i6mo2jsjjyiz27becbkzs234rnfwotm5wj285vqxrjpocn6nt5nkd93uush8xonv8v73zwko5dr1mftzoqsi81befnfg6darfjcnd7q8yrlyyeyxc6e7e9madnr2o731mp398hy1lhzc3tjfez7qzswuas9r0zeunxk2e3u9m5w2qs7h8yi4yrpm7mpxpj3q7ratfgnhteism48vfmrtb64c7yf16fbio4dm1eyfyv2i89mvyrfr8vi3g6hhdgmepvwfei2alqtlw6sopeawj4ppqjwxvxgvxahs1ohgxm8xk24eyq8rretz1fpmcdmmz7sjdw2w2pe08vc53ihowyrr23x993t52gb2189eqz20ptyxhjf4ks7wvv5dmhztpg50aed7xij43pypjpqbkknex6j4toow2umgi05kpip4mhn2zg6b03dehmkijcyku6ynd3lo27wvgprjoksf4e1kfx2bkoi4vdwchdjg2qsifv44f3a0yk6qzmcl3wemruodq084ifdnvggtd321nu210lvqbz8o8t6cyvdrht297l344uedumnumgykk18rxqeuuus5s09x9r6foanpqr1q5rt6o5bdb6x69ys6bsmses7ifjmw1kfwq40d513j0mr6otovdzl9bqfs01nrthizqv3koe3ifrk8ibnhilgs5w6zmgsr9bspszu0pnrt5298n48j25w1rrvdx02q6paz0xis44dxj70yv3k1utr7j89nhb5py39n3tky0fvsgu5e6g6p1zbso2kv8axw1ostngm6xgjrkcyy866qhurd6cpbqcjr3ylnth26l3',
                fileSchema: '3ye5dhrtib69jyw51rrs9q0wuiti4hyuuii3uexwzl47m0lo6jmyp1yxmxcz4tetq55oe6hw5kdjeb5356iqi2qtolu9jecvm1q4n4w4781lvurfpbg3bj3ldvy9o5nautqialm1zsoj2rg5dig2b5g8g5oosqxrqw3gus7bq1huc1i659pvudpmgucjxt1ldvckf6fo7mzfkd9d2yyo4nr8kbn0jfrvfoben875qixwib6kmxa5ne0bo6gc7skielf8epnpw3tbzfx6rqzk2gu116zi5hi3twfbw1h1x5nnkvhyiycvrmptjxyisvvtb3tm17t55tzajm0q9epyc37cvyocfbbgyhl9wf2k6y9yvbz755fkrufpethwgnls7q002hx3i3hxpamu47rqphy8h1jmxg45o210hqd6dvpgdfdophhmfxtb5syyfpssfrgqjbhy025s99lgfm0rmcu3362lzpxanfmvpc9juxd8sfg9rn79q81lp1wzgm7q335qusdyaojyqr934r41f8ds2229lvasc1why9ypwbk08sn8b481kllsvlel6vu9cbygv7gv9pdqiq2h1ptmxqcjqr1oq1tk35v2fgliqnmrp2wn29vwka13pwy3azx6o6qhe8tq7ub7vi88e1mneasssylxx5oe6mrmcl1wtuhktiglhcbxti0ftyq2m7zvvo4yud28ngdq3wm8rk4r89h85nqqdlj858s4uii1bjpddjd3i6bt8cfq01j0ak3d3asqa9hisyjzyolp4v6psgs8bbgce5vlib7z9ad0ahzddqknap9hew3z4zpfynlfkrap5w0s6qg26a91jr57kmfxk8h0emdxsrkclrzsisrqxf4oy4xkr8kedbzjov1htt90xi1zadviwp32461myqyv009d5rsns7105n4jgmrp5xng6n822py8jlhiftomx86cnzegn5v2m0upsjd9bhznp7iyhk5dy3hrgqcy2fjlfxq58xpwwsznd0ysbk7o',
                proxyHost: 'kihakf8th23s93h3sya4f10cx226bq7tqx1cj3u5zijyn0hutgqmnl76jg57',
                proxyPort: 5224487849,
                destination: 'h7udiwdsnaw1bdgfs2qu2wfupjctj08w042ddfthyfj3nnf8m55szvi60mt2upzpor3ixk8y714m1a9p229k59ocwsejxir84xdr00c7la5qajd824wyzrb1rh9pervh6oz2u1ue5hlrxvcdrtaccodgy41wxu9f',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'w7vtm5vbdnpyqlh7sq3ooip3hhkvlfusamti4boglayqgu8amiy4gicmv0t5ovwg1gqkssra60yrlb5kd8xmv0f6coltnju8pj18874xtkz07nxld4wvkj0gtkddvo0accxb0jakv3f3jwynxv84qdse6103yl4a',
                responsibleUserAccountName: '8zahq14eu4eeximtwoow',
                lastChangeUserAccount: 'xdj95i7tmq1rbjdp2c9a',
                lastChangedAt: '2020-11-03 18:46:04',
                riInterfaceName: 'wtb964cb58cvpd6879z3f82xojnllbiekbp9p5tmtha16h7cyuxlfdu5etr6wh0d8bastxebraozfhhjs5bee3n1s6vkkt17rqffn41ify8x4o2fnltq95s5f88uzndlf65qgbaezsao6gj75edns5xtm0gsnkqz',
                riInterfaceNamespace: 'f97msxcrh2q4fxygvk6g9k6qmagai70uek6bafjqqdm3exejggo7jp8mp9ejzq51wo2mgnqs76291kforoscay3wgj4mm3mxb05oqzxlwa40w35h9fw26iypv1si5s1b41zq06yhtxiku7qctnk2a8z33la8vgqv',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: null,
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'wwhacnjy22a12684vi1d76anrzia9q5ifke0e9xwnp3k5gmi0o',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '9rovncm8wui4dqpzxh8p',
                party: '2g0t0q448qieaapfdb4rx4yasf6efjmlx9290pfkytbrh01qi2lc3oalp3cuz2oiekfe62yvz426a2q2bgfwsjf5oc2hbpu8zz6slqmj83ssz573i2tafqmtcag5lmgiz55u6w3r6u08kdu6vfczy25akxs2juk1',
                component: '6d6t9ozbrmi7jrzgrk7sy9960issd3me0i8zttfwdgrg3u77nr2naghjkuhjfq5h4ff1n0zvilgslctygrzkk70qtuw5arrk7g5r29oqgnpd4mh69nv1n0c3i2cd8m72ase7s5n2z9no9bx3do9mw61evx74erj2',
                name: 'a4jljgw0ugcad3pxmshgkj2fg6o1rrf0ns2g0cywkm72wvrg5jncqkjjoy7yqrkd417w43r6bdiy6btd8wj6y8atix5doppd4einy94dpp82ud1lk84fp3nkqayvy3utf9gvsh2y2muwsjomdykxd3mvfsxu29w0',
                flowHash: '25dsr8lngkpmbiuow02wx3m865z9v4mtr1kdpodg',
                flowParty: '7e5ppw6yvke9rpembo1l9lny4cq67a7t9o4r1hih9loaodlhlqkscanv732v9bl3ub91gsve0ftqvpdyhlbtebayvsaol5ae8gc6w5d633zzfu1yr2o70py1slgoyie1nhf6f3e4riekorki11lk2u1e5q6ly68d',
                flowReceiverParty: 'nwp3d90afewxyvb74mmoc5tue881gu33sjsow3fmd7ddl5tg5jbfudc72qn70vetqb8taipmas1m92u9ut4z976zoq4optg81ipbalhmxo1qwpvhv77t12ezyjgjxd3dfndci3h9nywv3jnqt2zh8ldlxapg4unf',
                flowComponent: 'q44jlxaxwx9b96ftp98af3vse82rv8m58pgvzocianmkb1uk87yh34b2fo8wwjb1w8ybqw80lh9b008zga9jobdf44x9cxpkqit1kufmn26i2xwujqoszrpfps9l4xypgefv25u8iqhf3b5ke7rnjk09e16c7w3n',
                flowReceiverComponent: 'h56gn9tgnv6b21pdym8mp14dr1u68d7fq0w0b6s9pxlp1z3bm5ufrz0atv09ipptfhk29trdjwot26dty5lbeav07bi0kmjfebmbgoagve57uzy2y1oxsy4wphhafw79thygi1v98cq3zwqgqws0omm2rjfy1o3n',
                flowInterfaceName: 'jd7cq4dlt6k89ka2y2osrtwspexbkxe0kdttsrhwbqzwe6vhvq9nxxyuvg8t5amoog9hvcqupdv1jwtjdhlaliep9r5dk8zs6fsdiwnevhqmfi2z1391z40lqr8r9ltoua6w2xj83apokgqki97y22ejm4j1w7ku',
                flowInterfaceNamespace: 't1lz0go0ew5zladwb624z75is5pxgca4tp4dlhkhzxpm5k2c5o9z6fwjiielzesnhypqzewruhctr4gs7rnkdmfonzqoy1oak7ar1l45avcufksdqkvfk22w512t27yxax11s5zc5uow2z2blxchfu973el8eve8',
                version: '40q3oyenrqaydwmc052a',
                adapterType: 'ekc9b958nvce82vktjdy2suw913y6p9cfz9ayepqca3sfatg2u7nfw16ejg1',
                direction: 'SENDER',
                transportProtocol: '8f9jnbn8bdlpf6ahptc7uijqg9h4fkmya27q8ocqycfmei95ejheyg69zj68',
                messageProtocol: '6x8xbr0wi6mwvuqnkjygq7h8ndx1b5520k6tsfq5sadwufhyre081m54a4x0',
                adapterEngineName: '73yn17kmhcys0ask8cisxfposgl6fm4cxw2cbnf307vaqngv2yl0dkwjj4z3e6hornam0iyqizs0y6d5tog1omvxf04opdes08opr68x78rkyxw5q9xpw4r9lr8vq0l4qtxi12f6a3m703pspcdw42sz8imvbp21',
                url: '7c7us3icw6hslq32vpksp4g24pxphhvczept0b68exavqv24l87m0daxg5sax67qywqz21149hzvmy4kvi1781p9tosysqfd7v5asf1l18cis5k2m1i1y88gwdqmu3dx4sti5wclphp9ldpspnai4is962y6eoaw2y5r3wi5q655yyq9jgudqje2w0imxdvmp1f10bwycfmtq92bo5zju5oh8nq25ct0oruej8ex9cdc6ahwoyc2ieqtpj9e60qf376bacs0511bmqwtsdxp0sovkk63enpg84u0rbj1wzw0ooi7tasnkermb275yy7u',
                username: 'x3oqrjx1mnmjcp9l4aigk8x9vva6b0j0f6dq353hxwge2o0du9rwlp2ybrkv',
                remoteHost: '6cyag56kwiqnaye34loicxwgeqgkr6asmcdi66s1a5one365esfbutl6ymw73lvt619x4v2fmqfimcbviau6ob46b83zm861q5ll4xrnt32zsj9o5wj2n1ss2vtyk4nyis5mm7xj4ybgk2bwpd0fg3wpjd236iqb',
                remotePort: 2933349723,
                directory: 'ddk5ewyrvzyjoocvluidilrsenhxlo0m865f1vg6kou7manrkdxiw8o5udmjyasccwadw7k8em8blipfi6u2p3h7jnq0vyv9ab2dbx39y3egz7bno9769mkqxfzoqykfjhv9sy5cvwptz1995z8kvbat37yeyzpkt9vismarmi2e9znynl4i8xy94xmybjz8mw637vaysrns91bkjvferdy8w0eaq256rgm2ys56xzavk1atm6t15h2udi518hobcthor6xvzrr5af4vt8clddoog1ldeh9nkabx0v4po2ale74blqgxzmi3r8ecs5z5tojwopp9t7dk38bw5yyespul3wf5uuy7ssrswjbv8feyvfm2mfq2sxu9nda0poads03z857i1jy3dp38zntz2kri5926azm3nx1z98upv2zk95w7my7fehenf5fto43k77r4t2lgddb4b9eldott7svpxheye8xhv6xvfirtwbuwj7kv2rasu55l0c81puic9fmie594odewo5iw7rrqqcdfi5fpfqt4l3vkk4n6cmb9tzsyyfkb0cyyg0xoe7m3zjh3xwluptqkm9p1ixpjbjo5qersag1bvdz1genmyw09fqgx67fwca9d6krwet9zr5yn8wa87tt5r5wpk48rkz3q8hdu0ifd88eedkhtarltkub9p5of8ts3xfh8kb3wxdf23trmrfaw6na902qtwsunk078g6i3f3kkpf42murrjlwdl8f6gv4jwt8kyc0gystcp60xykjrnffqvn3ua4paaprl229tdkkb609ivlurqtjxmoeu7wrpcuz1x110dy3th962mupd0ygnkh5loglgrkev1q4nzbc0i6vjm1txlxs5tr7jmmd4huvfrw6k802v3j6t3zgrft32rdkhwr2352bfazknkgss849g1le5ll9702g19425w9uuqsc57hia7piq2yx6ajztlcmh2frb379ssmu7vv89g9za40s82694bkimrio8iop3fm6z',
                fileSchema: '6f23zuuvckq8l3fp1xs1b4pfykt5y6s7jgzdibqounas8mr7xqmkwr1k3lz9v4awciftnus73p82ot2ck9a5gdkt582wkps87615l2ceqb6bvxjhb6facp01x6nm8eumfqncv6ex2psgrx068zsa3hxtkxeyls62knk4l15odevbu90leudzwnvyd5gev5sacinfoitu4lmbakxwzpy58ik8d9ddbwvmh4z2rltegvfu3hh7ggyxnxrjcecxz0v07sobxo1ebufzq88fj7ztqrv0g85ufn2twinqfjc97xlyux73pa1z2ova12vowc6l79d63izuxqgyod2dw759wf9gpsx2ahg3oezym80gw9cm55vwxgfmi6h6a8c1czw682pr90tr8mjne5dhlpei3gkzmigj5av69x59t2urouy872736xoaa7ng5brcimz7cmyoynuplq2vez93e7xxotp5bnp203sk6zzpux1zti3161udg3isafmpzlponlaz6ibkfw9wjo8i3ml4ash1ap96r630u2qp5ubskok9w5601mkfmai9wmzw5n1dvraqv57eak8yfg0c3mmofwozoo3v3i47d3s8og5kvbsp8mar4cz4tg1ivi3gqsf6dsqwhor7yh5avlduro3a9oizxbtlrlmjfzpmfzu61taoxn2gyn95ljmj1wf5r3f88dqn3ffneril5s9akm7u7ufma8iujf9419s0eq5s5i8e2687hlnx7spnx3hj6tbexnw2kk7mll8qxjuxl4t1eu1yc6q82467lpuhgg56pztddox12b2m2tqhtkinuytp88xvo3efmtekrljlok1g67kwdhukmypsb1qykmfrio2od62rv563q17gwtw4mzg2kk7oyf5ifbplnmhhrcuww3et124w668ninpuahy9etc7wze3sp4my22eb3vpd4bcfbg1q1vy8m3t35ggg7vj4wjwrnw7z9k5pf8nmsgllk6kxw6sy76oqvdzg18w3xsgovjo',
                proxyHost: 'w5merdqoihvicc6tvkztdr7beexwfpv5ffzow609ldmxbd897zh03lffody2',
                proxyPort: 2424297794,
                destination: 'znynqa85auatjfdjbugvqts80q7hy86r297b8w0avyi36n0dw6uqebbkdsr6xg2k4zsg36wmhq7cyrp2pvgfotsw1qvg6qb8gz4bdugr71pq4lq8026bm7ftcic2kfqthns2w1q4zapk3hk86xzi1fntv4rt7q1r',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yhuqrxqhv5m1bcbdv8dmbqm4x9vtgg0tf10fvb9vngya2mt6nl8ec3dmgop3ftfjwu1tojrfniiz0a2nainc3x9ombgpblvwsz2ohv67aiwlej938vlvqqd23elbvk0no4vnacma39ufu524j05pbbjt1ne8en6r',
                responsibleUserAccountName: 'ed6ceqpny9yqf4plgkju',
                lastChangeUserAccount: '0auac2b5qansshze2m9d',
                lastChangedAt: '2020-11-04 10:02:41',
                riInterfaceName: 'tzqs95n54alp0xvg6zzhyieeiipdnnx2r1qy2p91kdnw35fiu01wdymxucs31kq4l147owqhzuhbxcj7exb47hkdcunrl30ivuu8b78auwigm66vgbp60t4fjz5vl47s0vfhyqpwf2zedbun7r4ha3sgwteny4r4',
                riInterfaceNamespace: '8d580cuwcs3p5eu3v6dd7eo7bgdpc9l0xrw3pphfiahgcv98yd8qou3ew1krdmwg5pjth49loala9dya3uird170f04nki408wyzg0lo37evy03m3656pwmw0soob3lzjuo7t1v13vweqm4kgqeu3s3xami3l41x',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '0xcuqw1n816exavqv1sjmf5iftq9c4d6ftj3b7yhj0ux8m016v',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'vfe04dqaddfb1pxjomfn',
                party: 'kdbjuu3p7p8a36sm74ubujuyhf7wizadhvw792za2i8yivyz2eohpmfou6wjua2top8dd85jsx9s4up3d2tvxehx0691jgzhpz0s19yrhk33mlil7behmw8qreu1f7nhdj6mgtdesecmbzzotarwam33mdmp1xto',
                component: 's0m1nb44ymxph28v00zyrf1nr6qelz8uww6eylmrl2czbxhcecp1yxv7h21trt2rip4i3qfduwexz4cuo4zu3zqomfhg6xi6pv6u6w05l0f6ea2rhu91tggtatwx4j2azwzasmrqxxewb5ets6dm1uwtn52wote2',
                name: 'anrgye3bfyas23rb6cki9z66wh7xuf809v6ir43b8hflszw7bme5wniwx89oro7hsvwhyzqmeo920mflxmgewygj5wl9738v8xdonwfbtbtp0aui160c4c24xek0xhl9s7fyzgrnjsyutjwv7oe4lxevdqn1hfbw',
                flowHash: 'vlh5sa43msggblny4vwukderekouzag7y03sv2qj',
                flowParty: 'rn1ji3qg8s21ut0rvgg5hjurnpk8lexdqazkzllbmeipbb2sqh64evo7zrpngcjjy87bh8eh2gtxm4d4l7z99o59p40jwjw28x1yp93l2oepsyjgx8rz5a6rw9kz3dti1a44lau7ywhe7m7lqock6q42x6mkc7gp',
                flowReceiverParty: 'mamxsfj7dtmkkvxz0xxb08bsr7sdvjm24rz1ing36dojs38c7epi4r818akxy30rpzo76i8nzahtodg9ns9v9v06tdsaod596b5kqh00oyezwd4dgfiizqa6ofaghcspbj266pvplyc8cq7k157l596cwv43gpu8',
                flowComponent: 'b252fw3g8xc8r3lvivnymtgm4fxm6ujjxpvy86hen18du0qrazk48ujpofxcitqhnfjehiuz7m9txaywfoasl40v7b88h2egav9xb4q25ntjbclb8mosfor1q6bs9iqeuff7e86lccwzbq3w8xz4k4nkdmxmgyov',
                flowReceiverComponent: 'dpi0ueokh5hog2hn1mvi1n9be0pkseo9ambg3y61dfh9xpp5bu9yvmaxph0parsn9zd6upus2wsw9c63ac06jnwr2mw6ueyr9vji4rsg8v4f1dwu9mlxub06ll17r6h61bps815qjjr18lwb1hcfp1dyqv3nd2vd',
                flowInterfaceName: 'm9p11vt99c9cvspdr3ezhe1hgd6mhlwdb2tjaybqnka5931bbmk37cqmfw318viu7q4p4gve88j56pxuysgu4282zb4gjmgainew4t9l788sbzs64hx32o0yzh1nhownpw1hsvq26vt3ykxtxf9i73z8hcd5xu2v',
                flowInterfaceNamespace: '2s6sd76sc01q3abg8purbqlsm4vamw7yrgbjhb03cquzcjw86rypv609lrj6vqyhagzoqk2h67v9swze50w0hsiq7eyygzsuslv1z5yesvox0evj4baahgzsiju3inp0c3kzeqbv5q1kunvanw1vrsjf4wr61wc5',
                version: '7ir1boyhe80c8vny5ipk',
                adapterType: '92wjfdeexvq819piq1b68okbwe5j4denqozolqmyflrhbo9avpdic8xm3auu',
                direction: 'SENDER',
                transportProtocol: 'tnd8pxiqlbjtbkzazx2j9fnt8dfae01w49b3knyna0qfmuy1lq7b69m5gvn1',
                messageProtocol: 'e72x19qk0j6t8jq7zv48sz15itregmtmvreum8zjn66arscd0vxnf7gl10mr',
                adapterEngineName: 's0dgei17e2f3fv0m25whj4s5q9wsty33ubtmpqthg1hyrwyepp4dki4y7b22v5kn3fqev1zex5pdkatdmx31r9mrgmlmu3f4j5j32bzzjon4qarb3kn9elzghome5kjyu4vxbjw08wmgao65mg8v1jbh3w8m6pky',
                url: 's36ov5ybhmwtjf0zyiwvee5qed5ogtuji5flzedh012f1mqv7m008pskwree27j74mqyfv831whrwnia3h3v1qh0avsp03ycaxhvsxa6jmzxsb3gfr2q21376pb5zn27bym3cv9tcuilpw1l6kvlkoorib5puwptlsdcsqnxe56r1btaxsrc5k5q7y19m10yah1v22zpezr39q6kn52uw2u0ph7miz6lbfvtfhxqa13k4mz96f9brni8dznqfedphba0cpll4l45xah0dg8d04th455pnhjwryrbcdra6ev7wb4scbi7vc64s6cbhdf7',
                username: '5gdbpfbhb7t3wgr9yeztvu5j35jrlved0gu0a1zeg252wm79k8t4udnhwrof',
                remoteHost: 'khtntw4nxocbuqh0yk1xl6u5kaxhrczijqyx5f8n5gxi5xztwz7x7kk3cphqyidq17ovfr8h6rqnxhznf0ksijsoqtx31ww7k3atuq2vfxoo38ocvsbsp8gr2xnkh7tbkyyrl7gyx2o3xwld1vatliz1zsj7i5zd',
                remotePort: 3827486569,
                directory: 'm4m212fwj669aft3ua0nsza027v3zdhtyh1xtc4zm4q5effohrl5a3khylj1h2wexo8wopzyrmeqmwjm6onvfuai137zoa96jqmblwt5jl0naqi3ipmrs229jwxh8qjecxp1y6shh07wyjcn8agdgasq8oom2vikhmb9t1fqmcn53gsxdqcaay6vndqc5alqqzlmqw8rybvj1uyz9na9yiogc852k16xbkspiq335gqv2xz80v5rk68opv2fbnecdvm8nwra3sm123svl4vc2x7wrwzwy1nvlgp51d89472ddmxc6x6llnpi8u78lnjyr66zgrg1pmw909bvuvyujtb5ydqtsw5zk63pgbskbvc539d081ma99u3nihdiluzuc2o6mc7dy8f68vtr9fg7q2kfo7smty54uysj0vyp2p4wyulj9udb5h53wjiptyfhsvow2at6igt4hqenyhe992lx91tkn53rkh8zm0u4exgsxr59xk84vbog2adh647wawv8y7fan9vtf145456la7xdj53aj0qcvrilp0thdtv0raxg59rth6h7uv105p7ww5ii4ulq0427vee9kswdgaxuibtnt2n08xh63qhow28w4cjg1h6ucc2i4khsgb37wob4lbxl369egs0d5io9g3paa763w5n54kp020wfheqq5q25gidazbdw7c3ghwbs1zrl6vk1moiawc3pciy1oxj1rkmixwqr1htsla221bk3rg939plx927kgmbia6ykq5r4a7ty3zn6mvk5j2erqz2aqmsa3oubi4bzeaokzhaok9hriea2p3a9pg97ddx8hle10r689ymemfx8lvun8xmvgemghqi1vrg9wh6xi5505z2uz73jhl3vvvh4lkdsudf76laaxuixa4gh7mvnfmi0t8vxe682f81313z00xsfb9vqzek6c36z8abxe7qczd2wbdk207ha52wban9y0qpkqdemw6u6qiyxnlbujw7ylj3t3siwwaabzosc3lh',
                fileSchema: 'rriyvl2931dk88seb4qig7cvc1k3lcds3ikcp3b1v9xx1wmmvqgn2th05ubihlg0unzt7o9epmjxdbm8wcsiku678ok4yikel5wjk1a0v7md1wisrb2ws2hxp47lpkij8hat99v7fd7kc8a5swnyw698b91ucfzxo2v9ubz37q0grnnawjfiesg8jvptsk0av5x29dxcvkngfne5llyv0ct6u6w8xolncv2ie75zz4ffaibvad2pxd74emyfacdzrc9wwu4x7oe3quhj6u1z8chylc4h2eb0bh7f6clorzdbzkyqavlskrgaxl3kmv923i9qci7ttfx9mk7yg8jk0uv4sa2fxkvgk8ukc1qxjgc2sov3q6t8b5jvgw6ou0bw8lrjbtqzlttsiu1ob0agrfro3u33afr9mrt4g0mieunse1gwspx41c5m6g526km1hq2u4q6d1ayoptrqteeg5ztz0iql4zdd0j6vhivhlvssf4ussymtrgobpd9fo44l0zois4gys4rdnhw4l1od659zx5dygkhqecwyh95o0a4kpdfejxcrt2ncqtcdwi38cwlooeca37l3u30il6iqtywnot2trvn0poyd6entfo67uzhwvwk5p98c7y0537vq9a0iqddzmttii0wnsp52lhk29d95apvo0r9mo0s5edh9z172i6bmhrpjm9enzw6dy34far8utre5k5igdl67qdqiscojcu9p2noa774ljgv6zicybmqicfg5t6fe65ibb85cpl6pgz2xq301zohbitfyyqagwybq2lf9y964com7xp4l7vb63sj5o38yfqzn7lik0b4bzblwzlex1n46dp9c85igwpf37p3r21n0x1o9bomk9pp8x6xe3d0601aj6fwkc75ajfgbxk1zvp848yc4lotuhi0oih6ab01j5c14j3lmfy2gosf4419q0y9ca92hr1y0wbdquusrmf0ko6ni8nnvqhmsd1upvta4dreff662dvzgtqj6qmv3r0xx',
                proxyHost: '3yffu6gt1sek3t3t1pb0j8olceirmhezv7vv9a2zoyygi27c24xw1ktgf8iv',
                proxyPort: 1150343495,
                destination: 'lh5ye05xa8xk3rwnj963tua12dwqn8pfri9lp2ixwsnc1di386s1d62g9ma80y482kvda0oahgtfpb766rjkja7k2ldigkzgqgoheukolkuxd9a0ilynqetsoyr07odzt4lxgcsujr7c699dk3wrxdgy166jwlw4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2g0ynygn7z8z0rgojb41b4a9e9jumm7rtxzandibui1jw753vfbhk2n1zr6gsodvvz2pssjiq48lcxytztwiukspcy8l1ztqigc04zq8hn878nyscqe5k5un2wku8cpbg31ta1fcl2rigd5p36bg4dpcmqnelzhi',
                responsibleUserAccountName: 'imhrwz4a1lsq28b9un1n',
                lastChangeUserAccount: 'ba24so9ahr7kqx9clav0',
                lastChangedAt: '2020-11-04 15:25:16',
                riInterfaceName: 'p9f8wjvo1ijoteh91tzxpgr5m5j13xzehrcdsdprh85ken3u31xbo23ymvkwv8swi8d1hfs6rufep3wz49nye7qg84h6dqaayaq7ts5p6ttjer1yft87mwuu32efsmy0eo5r0pzgivk5ag1va2o6wor1x08qf66f',
                riInterfaceNamespace: '6eqe8v1qgnpfoukr09fjeud7e8zqwwe8tkkgo4rztgmwl1qk866u530xdl0vhzrwk9ml2r0kqkymm0q8727kx8wuobe6yxvjgdlpqtewr76prt8q10e4pvj3qmx84f7z7fqw6dmn7uwjcg5ip5rcl2k8f8yfzct0',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'zl2ehh9mmi2jbkzvnrn6m19tpg6whbvm7z55uju9',
                tenantId: null,
                tenantCode: '5hz89e08ccme0soh0fr74qzfhi0rdqmisjmkuf25ja6e1q1ler',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'hfehfet1m4civym6tmgz',
                party: '7qhx9p95kox538yoe80bfjbuppgtp2ee671hq4jwbyjnxcqxsnkm9j3gokk6eflux2gnv71952oi66xwvyz8zbvwiyeamxgcxv0e1k8209pgigkvfidyju1rfgdzl6n6l6lxq04tsalt4zile4pk7cqg95q1ewqt',
                component: '2xucqtnj13bgl4knmh745w3xctutdlmcdnc4wvy4j2e7p7jfig0ccv1a096v0lebtigysj869eernasevhnlvfn0q3614wsj25bb7xonwp9nffv57lmv54wabyuzvspvrlz27l75dnyjk5tkpi0fofeun7b8v3ng',
                name: '1r1o1wfo30dn7a51zcjnfajh48tqyffzcx5i7yxurz6794fookd5fwzq7njdquk0hu6fsqo5n8dif8y9uqx943t5ramad3h4lutjwqcnqrve7ea58d9s51rk74dwdr3h0skvznio8wue6lgrbioazqwkirb9ofsx',
                flowHash: 'vbldcvy0bpdyimv2btx6w8a7bgry8ccmcc5hetzq',
                flowParty: 'sszsmx8cgrnzp9a19odstcjkw08wqjzuphqqlc2xfy5l8cotetqi1ijhdqs3kp27rwn74zosigubbtt3fdfew4leqmnetuijihun1tjy1omauz5x614gomqdpamy9yl4mnrxp1hmd26tpilvx84mntek3bbjgw6d',
                flowReceiverParty: '7u568kbdi5k8jds69notzuiprhg9il3sni5mqfjpow39308y5dslxkxr390mz0o3rli0y6p4jguinasi66peksh3jqvn1pqdxwtyh932gxw6kpt6r93cruhye0b6nduxr4stey375x2ifpmyvc4296pigph6fnzs',
                flowComponent: 'h1pj3olmjdskxngemvjcpnjmeuxer4qi46fwwg5j3bqusv5d1wtk79avnxn0mwlq2jg9aqd78h1up7sxt5dy6j4hr5pztg1xezx0xafnn2yoidxf2g5guyxndwc3qkp1u93adn41pzplwohrkzsu4sblqehm06mc',
                flowReceiverComponent: 'rrh1mu4jppc1h2qe86xzowdom3z8e7hav2i160938szuhvej5usg9su7q94jblf9wy0iqy0sfm6hev5wskg8gcadpqxuzndmg5qu0qc7j6ssqa330ugsokeuyhw8ddxsviqesur7xqswz4gst2sz2xtuhd7ecjo7',
                flowInterfaceName: 'dqrvfy4gjabv4r3yvs35top5k5c0dut4j2y65eaawxnmmfzebf2sam5pu0bnvyvoms0wjnt9dxgcfkllzf4edtc7xt4xtfqsmkx0v25a747itveb6l7ftwuqck9qj13wlpf61ksyy7ow1b6j1yex7tm6c69lsbs3',
                flowInterfaceNamespace: '85bbrtd31v9u6ol6q0tnencfef8es002yfptyncas9bho41qxzpcbyojfu3qqnnzh5lym6aakcqiy8u3nhdv1gjb55o2wf86ifkoi3pne1p51b72vz6kdmxb5ysj36nnbvskcdmh4g929uoq56n18d4m78ial3wl',
                version: 'kz44580en87q1qv6o2l5',
                adapterType: 'nw6bg3bind7xn6h8xzlaabpt864jew4fdhdg9mb6t0kx1iyyd3gm7t13no4h',
                direction: 'RECEIVER',
                transportProtocol: 'ya5y8h1q1oulppa8nbmzck779pt5z1nw1jqa9pvfhej9wezk45fwihc1q8mk',
                messageProtocol: '0yskphvb4q0g4xcc3ispz53t5yh3kwc8hf30fn8qw1597cy393gaczco3fs5',
                adapterEngineName: 'v0axjq0yqxm8bls7cnhyjy9otocjucwtvx9j4dm9k1jq6mocd26epkeh6n6nxw3ys4g4yaiu9q9vpeb1dfjwrupgijn3y0n9b75y2e58s0f66eygz8wz5j7y4bib2g2zjgzk3kn312s87oseuqo7ttaw513xljuv',
                url: 't81rtswhyqfnfpqgz74lw1u6j6mwnxxsi43eh5zq8yzuke1372djvmwxiylupvq6jd9e8yypbefrwsyf94r3grb1u0utxbmzio56i71b1z8o14q01vgxq34zhmsvpc9z74hb5unpyos0caoasou7dxd9nr9r2kcqk4ihhkqb7e7hhahzcq5szpqs92112ccpwxvxi3u5lqz2rg28jm084ern79sxtc7x1nyn9n6u1ilm9k4rz7b8gusfzx5tmdb80qqhozhzyggsdtrubyy6ywpv3gejfnesdw2u0p6b8jvm8cy4y4humhbcpwt5u2tx',
                username: 'q7s9f1zwz1ogropyo04ee9zbptwe5tuwzzwzet92vumcmh1xs2o9c7v172r1',
                remoteHost: 'nzuha9uex8shc1gsp8chcotkoi4f00kzd2q42mhy6ylpukhqa16ecmngrk9lnm9pfmwfj2mq3nh2ixxy1clzcj8alhe8lyabie4s7ebdqnzfttrul6l6obt4mct6tdk3anneee9g9iogfty7e5l1mlb7a1f1gfvz',
                remotePort: 1745469428,
                directory: 'gvhxpyzno7i16ef96yok11xbxdyskxkiqu6i5hw18okjvcgr5vxk88t7gi8bno14dxsf7n6j21ixryjfqmk46skycylh8bsqr3fn4y5m5r3ptbnx4c7kl4zyruujvfiq2ttwsqdejnmuntu5ofhz1j7qksxwb4facp8mrwuntpu3htvxp7wom2hg2o3pcl2lqp8u85k9ms5lvg2ye7kt37wxkwqtz655ip6bf3ca79dw608teuqdkho6fnu8i50mliajune4cg1g5uwzqof3v4wmm4ckij0bth7tzi1780mycf7d62w9gm5jj136o71wbly55lk3j8s2qz0b10ugj3nxzgiqfz5ljs7nf4fy44t47fyh2r94hypueqjt3tseqq1lzskg8sqzo2m8r3lmvk0uu3vf46sfstgo2h6lc86nftq46v96c0kdpgb9xi9b97zeyc1dv38m3af1zygcbubkpkl1h16hkzdry1hdvdh7zpkeyakc457hzp7asrlepb23ixgsjx7vxuttuhkck19kc8mchgr2bp2qb8c7xlliby74qxkydjol35vpe1f3sr9f1d1nq2odbpgdzbjwme24y8qiog7fk0nmsckaoi6q5v2o96rf2xgo3av9gmysvcvzdoroprsetiuesewaiwxrv3s1zf7pth2xob80ez0cnq8s96kp2f9ymfxsjz1n7na2akqgoes0bh3u29nh7ngesfwwznyyddc1jw053nn7bmg8qoj25oqcgh7zfqyhd3f8sdisg4mcnozks4jilr24mcayo61df9iy3xoh7vg656jwfwbifbnjztllkv8yyif5lt80fixqxjv93d5zphayvfmmb2jjn8539zzuga5lbvrnnguk587jn5r6uiv6x0cmqe4gen5a8r9su1pknll4f7f55dw9u1cnuth3nr0orjury155kfog1pz55q68mx1ocqoe2gdypz88c1h6h27xhc4yw9d8swbglcq46ou0ep0igklh4cp4688t855z',
                fileSchema: '62f2fp0nlhigcpq8zvz48xhj3y1t65ifzgoddh7p9rv2v22lxsonaltbc9ju95qworihm0quuhcugss1bzj3647d9bmbzweevkikqtuigzk3p2ku3gs96dt4yijlvnu1ge7nr4ewmj8l04b8ztanno3il28a39niybewbk02jy27ymqks1knexkqe9j22aznlqej5nyq2146r9y7rot50wu6hf48emn6o8jyvfb27gp52jfqauqwewz0luknxvuhf6339edzrx7i9aceb7gq0vht0exfpuk1tn8kg5j8gzo6c5kdj2l76g556ba18lwbdj6byowddblp6i4zvy8p4tj2x99j1m06ekfg6iwhthkw50nvqlvxy1w2pvmex8c00zl7g9ysrikdjfpmn011dhdnsgv4ztum56cqtheq1yrewbd4iv66jfxqf7pfreskzj153fyk97uqhzappu71mmjsfijuycctcv054ijfyo1ik435t83mt7h9zdyfht1wc237g2riwxot59sp97d6kw8z1gtrft1q15lcurlr52s99912ixrnuzjwjvusp37er14oaeqdjrw5cxn6ob3cfzxu804jff7gcmd0vxjb15zet8umewlcpz9j1sgnccjj83ug6uwayhbri6abve7a1tpv3lfkkesttunlzlgnb3xxnvv7xw46g91hs6j1r3w5xavzb483pieimr132xgpq6g2ddj63b28wzrs4635yhwv7pp7849zsyha0yciwmbmv3wvnj1pp3bbfqvfzpaak0b9z6bb0d5fjoenyq5qq6rw24ghmatyjp7ga15oxn9fnfd6gnd2m5f3u5cs0u0jzmcgsyq88pqmfe68pfet7pskss09n6gmwo5to6cry2aqeokuotqepu1urbbmp6ohn723m5083ah37qie5ik4tbxbsua0jedyvza7r5aywu4hesdakh686qkkcup1m52ubul28ua8fuvpf6ibdoiwq8r9rkt7e7dvcsh8uozv62kr',
                proxyHost: 'zcbqmcp3f3f4jx0wqo0x1i0xqpm8t82fysgaatvyc8bunfl868ia6be2uyfk',
                proxyPort: 6529939010,
                destination: '1q3pc3lz5to25h83ysiv38gxlf4sfa29hordkuggdb708u46chm8igorhofqbif6m4z0f1id1b9y1h9o9tnxke5o2spf8wgufbl8b4owxr1amb4ql781ylqajyohxaw95mylwnbw049czckt7jf304q9qrt1jby3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'lx57827imfrvmg7jvszoxhvjidpjfe9hptk6hpdys7g2tdf2mfl31fmh1dliljyr3dqon99osj3n5bcfxm0kq5c34xpo3vh0hsn3b1t7emqp6m7zc0ll0k2frb5ct1zpywqbqzdk0h4bvp32jussp7jcrrxrk47w',
                responsibleUserAccountName: 'vvjmgvl10qcueigh4sif',
                lastChangeUserAccount: '9wq9m92n6mc97aueyo5y',
                lastChangedAt: '2020-11-04 03:01:47',
                riInterfaceName: '1mvffkxxlckykyrab4k1pyx82tifctj45efumsfst0npy2rw20ye5ibsqa0flsnjfvw916qi93xfupx7jeew9o6qqihaujcjxz7rrqwjkqij2vnebd47r3sj6myzk9lrjppf393zvvuhesxxeddbxvyjr5vahf0h',
                riInterfaceNamespace: '4w8zl93l4al508u66akhl65irrd58vvh0x1jjg9iifiy53k9sy8wq9168elsdke1bd3zznp5xdz9u1voop2bik9ksg2opdodv91lizxw00wg9o924m8or2i6poaplheruxoxe4iifloh0ry3d5pq0fcp52nb4do2',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'oyysrz277559niln864u9a5mrstewawjmiqyhh3e',
                
                tenantCode: 'mby8e5y46gyptmrus20j8uv16j4sizt52nify4bw99c0vxsljr',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '4g9vs2k5e0a7xd63x41d',
                party: 'xiq01fwbx12f6o46zb3dizkvui6fdwez58v8yny3fgbiy3obnw8gnt2lpx1sfs0z9wler7rr46iwr2ehhkcuhvfbypq0n1yp5c7niagacioyh9zm7gnqkicfbssnlui4zol08s9rkvc7gj8l2yv18el7blbarnv4',
                component: 'dcv09h92hemnyu31wbewi9libcksvjeorhsw44wh98e71oetukgomuwjhja3p0wstb0vv3cvmiaqjf7l3ehwqyhk3irsrng85f0j1cxqinqpqzsgjtcah4fju729msrt190l969hsfc7lrfa47w45mj22o5g1yo5',
                name: 'qlcthvih0td4xhl1eiqa1onay2vsqrce42on6gwdub38er65wxa81cq1xcuq2boubvc1djleid9h2ke2kf94lb2abotmfksrmx93qzi2zgz6xtjpiampwfdenwy2cd1ernmcfa5ml1o8782za2ir1jxsqv7djg0j',
                flowHash: 'dstlyugf8am7nsn54l8zc34e5rg2vgchqjhllfd0',
                flowParty: '6ce883wzy7jn6302dyyooh0mff24z9lth0kusif31g83rxdw5shxdljo4fmax5f2vx0nut2xy2x2ummfy23hs7rjq41yevxjfsckgic6stmr9kmd72mcx7yp3jpdbvck7vsiwsju1bgedrfxwxuez6bnwczr3ls9',
                flowReceiverParty: '5dfg8oqo6vaaxtfyvt4hruj1moo3fx0iyqieivtm494o8c0qy0yrfvkdkfi40pzpcav4j089lrmzqxra54pfs3dv91tt27llhy9y0zo3aagmvec28l6237d8i1ybr9d9w6ce6g7m9mj825nm9k56c3plrtck0ecq',
                flowComponent: 'jccrgei8a7k7asxlp804y9a1jb4wnipuio5x8q88vv819h1pypgqockui8c4mkht4ozqf3u0ezhxazn4ypknda40j3prc90tm6jyz6219i4qqc47nkb000czjpxfnm7r8te0xp7fqiiaeaeg09inc1ci3bmwcm6x',
                flowReceiverComponent: 'dt1njyhemva4o5iuubr1uzthltec1p766izx654x6xms26pdxko85ffxwrergmyyo2miu9k1glfv8ept2rgtjahlepjt6lwdah14rsq6xjljp0bqhfoxy1hyr54rltc3ajedxeqijt0id3xsdjjwhv0kmh07qmv7',
                flowInterfaceName: 'e2kgewlyki9j4v17g19z9e6bryhjc67287pdxxeqq7wpis5xseu8c869ypgve94eufovpu3jheaoaj970qsuxkfpxwocnkqql56x3jm3a3lxu25wlucoxxu4t6jbbx65u66mnankcecehv05w5fa6rvhf9tobe7w',
                flowInterfaceNamespace: 'wbj71n3oppd9zbwhzr3ghkqzmt3tuftph4zin1k3o72qkcex9lsi8helenrglv9twf3y1u9flud9s54cipt9ghqk9wro8wvx49gehexyeda7q4a52l8abpufp1un3rsgb5pmhz3se0zgkd7kn2akz8iuekzoyuph',
                version: 'w8pe716emgbst7kn3mps',
                adapterType: 'beat05ivj6mznc2c30ui3kr2dgm04tnr028180xnnj61yj1no6x0ur0gslb8',
                direction: 'RECEIVER',
                transportProtocol: 'hcstvbsp8gqp5n7ymnuvxs5muwco78i7fyokyfcxi34z0z8qzmf212b9jm0x',
                messageProtocol: 'gwgdas6w63u4pwv85nj6rvqoq6o2pbjty95csqssjk6rqpvlsjh63j80qx6m',
                adapterEngineName: 'vvey51ycv1lc0emvh4rvgxsdjfzus6m1ee3hw0ulhwmv6jksfsh98cqo0nd47obqjf6a5cg2fi9je0lxj6wzss0lm4t6szgbtqx0mzn1hcdeke03jtwyr3v1bzum083lgrq74ouzo32kqf9oyt5edlil3m6r1ycx',
                url: 'ml4ceiv7kd4fgftai2j6xx6oyh93twsjjueg5kw9efrnt23k05k9sr0x2c98tvc5fhcaqn58g539ayjczofqvq7f6rhdg1fgogx6pk0tq7ajg2n74c83nyw4gh133atfkl1rctbsogmkz5bo1npw1pchs73pwxqfwqsb3mlznzldb5eue97s99c37e9m4mj2s6v2y4dv8jxky2pdylqzgvpjubuc73d9svoinf7vqvl6v1cyr5lkgj9gy2fv31ocfbn0nak9jwyxkuufojd5xrwxiox606qyx0g01oj1d9c4dhatwll9t4h3dmncu893',
                username: 'ledeyyd7titjdm9li1dqhprozmw05qxr2yq9llofo5hck0hey0iyiytqv41x',
                remoteHost: 'xuzi3o6wt5lg3f8wkzlob0latr6uopfcnekdqhjactk0p9cienamtke7amcka9x6808w39ablog3rtsgt7n2zokkr8cpvpae82l6n7kgr4unokcf7lhuhcvuex6m2spvald8g343utgxtjo1kbflc4rtuladp10v',
                remotePort: 2988193301,
                directory: '8jzn3lag7qamzvuvh4bcep3jx1q9y9l5yk918ks1jl33nbnzpu79w1eltp1pz4oxthrvohbal1oqzh4rgsixzs5ianvowxe5i15csg8ks32791amnqyinttysu025y4nxbexa50lw2l6dav9him2qjat3t7ryhmmpz3f0orfurxsaicb47z95wuhr17obs7pj60904wacfbih4dvu9nrq661cnqxvmg4dwwy6mupb9wnq70yi2rdbj2w9syhurse0rd8g5lr79dn7xlb1iqfwld6n58bqfp736zu4m3d7c5e8iyp4sfehmta8ftw3ufghkf2fe16sevzg37qeckeehrt6x7zi36p4276k8hted84ub1j9x06qk9p7nm1o9qzzsjetpufwd5qbybtwj6vi6q16q8qqm7yaiqhbd0eghkj8df1nhoqdddxz7z6077gt28v29pnmarsfwq9pxxc04tdi3vp61ak8l9pxq059bvrz6vb3x0708a55x7sstbnbtc0kblf7nmoeff1b1l9uu1z7pkfkfy2p9l6qrnhl0271447pmpqhbfjttyxrsilupetvdltu68q7hwmj5m4110wi8p7qa3129rdyt2hwx31lg1vaatx9klatt92v11y4o6r4a3uj7f38uegj3xiji7tggdfz2g8gfknl0o5va5nphh7r33ph646vbqc26ha0djqvjvg2k86o7y2jvxq1c918typmqv5hf7uopxh963c3cal85z915vn1ezkc4s9o5lekhe3x1g8lcbldqotvvxf0c4ttw3akudxrpwjzqcdzk56937bssabgidmau6j9bg3nwafps4t1s3292vnlk4pkr2rrg84occ3aiqq1430e46khmblq7ptb0hx573k8box5k293obi0m0tvrzkmk8kqhib1r11j08a1pzysmgbehjwurvh7lqgae6ewvsof0qaqcivjnyqkc0v5ekpk9uiz2gv1kihch8w90loz6bdayawmbsx9rmphlzw94dp',
                fileSchema: 't4904fi0ekty7t8plp0fkex0rm1iqu60ekfe32pcz9qberm34zt3rcmlginysqozb207pvzs745ptv555rcg8vvmns57gbzxg1jnqlirwr9pil91vjsbpbk9qz6gxftau9iog6e1uneg07q06pih6jnvpro0yl1q23charnaekf4r7akxi1bvgov7i56savonoegicm6r3dcrwb1x4voup8bv64s6xo6utv425nkl5kjzjm3w5btahig8sus6hb677vqb7j6a3aisxbofr6q3mokh788739z91vvy6rv5a7kqfm3oigxh60zf18ejozpkru8x7ccjb8zqz3k9z9n7ygu5jvxy1gs0g2ggm8enbp2apx0n2snbmehmf1d0f3suh5omjxot2npven8f41qqch706rtfs2etosl5cyeb1kih4f8p9ybaoda4s92t76n0egqves2qlvh5c1u8ipxc63uukndqg3ol5598yzsxqasujzvhz0vgg9rceagc1i7ouv1ih4yvw4dm8f6hkq263z2mys2l1qwqobd55dzfn9sbbqw8o6hh4mncr9ru43f0g3pp8zypa5kf6o7282n6ywls9sijiqf14brls7hd0k8ytpegmlv9mc1qnvlmmag5hc365356a7uwo592n4shxtxjvu4b2l0odzvyp022k7yvjx6v7iimbidcs6kdw357qajqus2hslam1jvzle3cdpajst1romqvo828lnt98ht146teagh6kn8zc3b6ics2qzim3h6sdgrfcyev4y9giqi0tfqclu4d6hvjgkf2soavb581os748lfv9gqkek7obgm10pz0i7r7fq68mz5xvrfsl38tuqi5h3sa2sw1hmibymxwxw193jb6utg37kumqqcs6cd4op3133lwh5shwllcmvsn8sn890o0ztarr0d2geny5y4zo0sgxgqjsmcbe102hg7itnvxh2qcybwgcxtc90mup3nz1vmc7pf1xze3sxv2cj6g29wxmgvuqv6',
                proxyHost: 'ndy0s7zvv7tfqbljb0merqfoy7veadfki5wlk3sj49czvmmvcxe1eezthnwk',
                proxyPort: 2348283929,
                destination: 'p2ytf7ify7kg4ztch3mgo4oc9y1ms6jbkk0f5ydsr75jl36fy4gfbs0x3vvq4m6bspqjlmb622p2rftrsjc5wlbtp9530errvar9g9e7h9d31msb57su2ijs7e52aombi1xiky9mfbglbc29by2naf8qj8f2uefa',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'kplvtokkkrhr3l4phxl2vhu9upxrkcl84tm73m1akq5dbu3xntylg3yfolckhcjkvzt32c21w0ebg1p6anzbz9upzydsm4gj0ojmimjfvar7y1o7l96aa8zt638nhtscjxg0kthx484eandqppv43x6gntcwm72a',
                responsibleUserAccountName: 'wenxdzqjbl9j31kwiaga',
                lastChangeUserAccount: 'hvbiaw2ew7dcc9terso6',
                lastChangedAt: '2020-11-03 19:35:06',
                riInterfaceName: 'ykrcgx8xp37raw3eih3ul24x6ucx46g1xpvnym5evle3ahxnoj2cpu2k1wzeahy1qits2kewcl93obk04abwlmf9efpg0weci9d4bstjikvi36cteq65s3dvkxh6i0gyjmlo0nikqtq36ecvngn7x8avsin2e10d',
                riInterfaceNamespace: 'wbpsghte8dqrq5bjj41ipbundmdtpkkjp7hmkpiflr7g9i6dolwqknkewegfoqx3h51nbcigzk3glrwr5hdi5n32vdrkigwhxk7qzwn6b5w13oyc4jqb8xbh9fj7jkpzjj1k0pf17chpacafyu6gp7t79hjj81b9',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'jl0ioo64pq4xxvoe4d6m3yv0lmntic4jvg6irhf1',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: null,
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'dy1loj3a2drvb1jxkhcz',
                party: 'hysfidgd0w484x0l4ztzouz9zbyudti7zqjvxmge9cewtief3w7i7q2y6l6g2ux31jmk65ac7gqz92xowrxba8eixaxhai05pf7cp3v6e4via0rhivq9tthig86d159i0k560jp91uyqt5n83ai3lxe16v652gfp',
                component: 'c8do70atmn6vkw4a4p24ohnqep143hmmukwjl6rzcw817ebbgl3fowkrbhslk6eewkoti0e6zwxvvcxoxor613bs1gpw3vqwewrmdm2k0eolf6v003h15nwksapmqnschj9jod6ddcrgo525qka43e2ml0p0b85a',
                name: 'a2tjab3ipchk75fg3w9znflmjztcbkapvbb04xrd573zi6c6f6erffhnm8tqt6ldq3r3lbr777evxmxm7fvmc6fdzpx0m6ff93im57uf0x8wyn0dv13nu00xhd9bpuojicwnz9lfehjl19i49f60qaty6tl1e775',
                flowHash: '3fpa8fjf0iepq3c5z3vlbp6vgqgy4iifq95h70dz',
                flowParty: '8obby52mcaaa67x9g619nc4ykkuoavb9p3cidlhlzx478lalyvzst91yk2pj6kzhudajjdhj6tdxnigc8vnj6onwas1z324nm5igzbk7qia2zl99i4gqiptbbnf2bfzw6o2f4ip1t4unabp9gyqo6tmd8o1i61rj',
                flowReceiverParty: 'd9jtwn6quwxkfnzi6n8f27hyufw8cjhqlg5wccrpulai00j76k50l92gxt37f509yzd7he8m2fqnkahmdxros01kou4tndfy4gm2op7q2w7khb5ffmy7pj3p3qwjqf28z43r7q0ndczzsix65hkfwpm77gh79z9i',
                flowComponent: '7qdddby2wyyzilqbuai6wks0c3q02b29omf6kkqfoipu8326uz33fwmdiky34v4xht86bsghi6q1cvbev3arfph5mx22umhljdpfs611af3e7pt6pt3565z1lcf6o7qroy8trz14zpae8wy1q89brv7ptsphx55b',
                flowReceiverComponent: 'mnwv3kf35xupm99xbj8vru18osdvdefolonv5gzmv9nutwjreovnaqvh9u3lb1f2kdfwuymravgmrsj95mm5fn32fgewgzy6rc6yb00bkd55ev9zijuqyhu1gxn9f14ja7mjvaaa8tdxsydbfov1cr324jbvpz0v',
                flowInterfaceName: 'zxajveaqnxilk9afuhzivdqm7ppefnoj6h5nl98p39tv237y0sdzeako7sh7pp82skojfxyuw200wflcfq1rrw0usngykm2ophkhc4eedkrbihdd0iaw74diwsgupz3pmhf4m80xm4mfd73jjq92nfc09phakw9f',
                flowInterfaceNamespace: 'fr0qw2xlewdiefhe2johcafrp35evyp45r3dfimqp8uyb5aralnl7pjc78m11635lqe6i42juk9pv34iszc3e02sjpp82mdzihxczxs79pbmzzuncly66n9lc5f2fyghqs33333a8usawyg02derrshky4bdpiho',
                version: 'o2iif6yteqrl60jx7m7k',
                adapterType: '563q19mmuo0nyd08ji1vlp0qxwgnjz8wk850kb8wxlm83bkb7oejhu3tf2kk',
                direction: 'SENDER',
                transportProtocol: 'rs6e53mmv9sytc89zj76w28oh7n42cemwoaqx8hfky19equ6yty04v92adgn',
                messageProtocol: 'd0lk9fidhoq8anvpi6t8mbdd44cnphnyzmverivi3dxkxkuig9drb5va3uij',
                adapterEngineName: 'kebb7y72bbej725gud5mzopnh6beu5c51iqabgaqk0gsmtr0inrccbj9oeemmcghx43iyahza6qb1kg0qz90u2z5feshjgd9lwyur05o3bza4yxy52ajof8chnccuvw9sl8lb64q46esao3az7p13rcvph22kuup',
                url: '7x27lvhxw0xtnauixb86tdvah5ij05rwgdfdzekxaptqfu6wckx352nywxe5qzb4fvp7lqdfw5e72rd2ewaffccxlcpzcrf8wxmf4xa3fdm7uzf9wss0j7ij4nvmc3u24lr289c4e1if3o3mz03l0pog3n0vwoy97fnz6njg9hwhmdal55sd33n9xnspakax2usfrz4gb5m3cnz5hhdubu4oh08d9gufq2fyk01e7l4jnfxvz037ewu8g4hk3ufdjhi2eg59ymd27rb60alkpk55x3zfvmg8fex5599m7ur12rydzujwfdy3lzz5f6ij',
                username: '9zzx70iibv2zkqt0sk1brwkqpj12xj2h28kz8rnf146vv8uiapa9oy5xlkvt',
                remoteHost: 't0cykg17c5rj4hty969a72i2j3y858t0cm8na8zr8o6gerphbrs1yfwwx1kukm5kmu8ww1r0nu933zu2benfuth07ljzf2szyl7x3ydfmyrm67saf3esnpno1wzdxk1hr3cpsn9uqb9c461990zlzimmtrl9if3q',
                remotePort: 6636964908,
                directory: '0j8x7kznnvs5r9k4pd6jpejp7o03cdbd4qcugr33m97vm34720wnrwh72nxpfn4h50toanouk6ufltysma9hg8dzul32h3ilwagy3ni5cesvt9wyx7n4z2zusxggwyzlx3noutvb0fq87cmc34zpbhvmk9rnp85ncxfwo3yvovr82jsbim7fhhegn47lh7993cuw3uosod75rgm5vg1guv16xuk42kxymmvn5w0dt8dkf4n83bad7riyh893v2y9ebmljncnuqdbxbs1v7r8rdiyu37luctc62llcfa6dipaisvbb1bo6c77ftoq0jjpn0y4i3h19q4j7gafjugmeu5ldoxjnnjtg6d7vel4njvh0xmc753ssvct9lj8rdcnh4kmhrs1a6v6rpu7egd7qd3q065l451mobkty5zm5nzy2mg4upphrdv0ts4tts5pb0927bqwgq1h86abkqpctmo3y43wg5rpz9zqo4i90uqadnlfthkdtj0acwd0gj30ona576ln65df8owb7vu21dcd3dqcpwbmo5xh46zgrz8k7jspxpke90jp6h9vfnopzloyqygciblk9s2fv59omz9xpzntrolej0d8d1ej09n8lh6k2qrg8e8p46di2al836mttepryvkpcs8xuo06kms2m6hzlmje0fd5pshgyit9lnwesnviteymgzztci7chy5j7lx0x5gk8defst3my8po0adrgzhqxhch2uix2kq0gtbue2rzwaltebj7twpekg0ootekr1ie3d7mqbus5bt9bxpvp5y94edyopwmqllzbu6qxppzk1a9ra8a9lnyhc24z8j0y6hhalmlyg1kl0k7bv59go1olasfbw3fiealk8yp54nom281pkmn4z4ds7nzlxgp8gycdz8infa8to5cpzm0vqhebl7ppn7pqq75028mfftrjjdeqyj1afypgcyzjx9gk60xvmp2tans2rwbybu07mr6jg60dj97o0xse1ddqopa3avm63jmeybv',
                fileSchema: '280cnx5xm7y73wegd7vq1vp2z9ecquah7ywz9nkk89ffchrmxxk9wqjahw1wiazr9ikdfz1udhyfquf5n9llpa7457s6r188g2ln2in7kes9ultglcyap7v0z8v7oq75u8f7zplfj5fiyydiu93me9fd250kwcw9ulw5xfzc2jwcd4623ugkfailuf9iwugfrj7bz75bzf9f13rnflyw4ah7v40w1e5mgriuymixrqgkpxcgth3xketpj6l9ufeplqemtvsop988547rh4xpx4konx4q9tdsc0wki4v7a6aths419myoeym2patzx4bxek68pxp7z5jcpvbgpi7d54d2utbh7vpt7kpcgh26rfjp3riurttlzyhyiz9l37mgaim708r0j8xkw1vhzmuoojopsericgyzxzv9j9l4c3qkqie0mcmf7i0l3ldw3f7i9zikg4ndj0ak4vwbingxz610azrv62youluz3ueq6m3mfo3ha3eryjke24tim5oixo0wcpuosa9dj5qnc3050mtt4x2muczepjnme0xwo27icdoybf3xh3che4zgt8qngbkwy0k0csg3wc18jpjq75r8gbqypd7eje8ptyiswkkmayjyed2l6vcmunlt3b1400f62ah7q0ge2u7c883v4blgc0irba868qs298r7vbarg9tytlsyco8o8j2btt140ebralg5caiudtj1t9x5mcdgyys7z372gtb8igfjpa7koj95bkt8w0euj6f98iyxycj2l6j5k90zb58eqq17fecs8r7zigj6nd7m211lxce9yvsi9swn7f7tqoh0jpc9no6fai668dq7qlne5eeidq0e0amfev0es5u6r63z2mt19w4swdr7cniuvonoqbinbkjgck4pbgx2mp2dwzeriyixt05ern8sx1dgfb3kwxbz7kwf1z2dsn7zo0tpktfim65v5e13o6ndehpg816jveperlk61usyd26mrhhm8s5l338mtl80575w8u12rmmo',
                proxyHost: 'yoxsqvys8jz54o4nja20eyewqr4bnlsycgakaqw1a83szowbm7qlawiuiw5c',
                proxyPort: 2878239927,
                destination: '721xguu64fn493tcnh90ons8zid72kma8ugr6x2wrylxmz5w1y2eavl9j5xzepe7x3oyq4ebky7dzh4rfmc2501s2xykcycwp317ds0jk6zu39fpn1f2jmp4l9po1m21hffhjpmciyio7otwt2wbkne24hoq54mi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5zs0fg1q9m5hsfujh23pxba0q7lkrgw46u27j0oxpndvikojxakun0tj2hjdh5lr9telktdywx06ohai9zqkfpwtejeuusj82otzpylraqmebi8mayz9x6j2y41ylecljuqlm5w9izhhm0ecaki2atwh2q8wmd0r',
                responsibleUserAccountName: 't5a74upf36ylfxjmj78x',
                lastChangeUserAccount: 'usfdui1glpykgi538ogy',
                lastChangedAt: '2020-11-04 01:03:15',
                riInterfaceName: 'y3wlxvil0777z3i86w1c2ym5l3gytn07ly40z4pzpa10xp3cu3r9qeqjict11sggpu6wmojqlhkbxwv243lzgquohtvvpsn9pxnwk9ayxejh7g62afc1lgdgateo49vvh6qdm9e3foobjm3tjfvpb40j65db686e',
                riInterfaceNamespace: '9lyar0qhho6yoaervf45z9uqm428rb3uy0wykbgbgtzlxcyf3pgh5f093osovomknh9ak2e5p9p0qv4hgxcnmgbqse64xon7grs4ve6x4enj9f8nl4j7eme28d249cbp01i3cazst10m9069awoqnfuz5374qtsa',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'ri3f5ettfgpqer0sn2xt7anb5fn1v4hpjtpm765a',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'uz5okeytavoo8pu4r9bb',
                party: 'r5cr10muqktokkuwk09pfxta1il9ap9su6v1pd4u9o97rt6ofguaf3l96pdofsm9cj2c2ymgshpyhxev19znica6sdb2wa1xwtjr32725f8fczx57htvrrptin4gn9hrpyy7zkg82hycuvrxn38rlbvfg57trozv',
                component: 'bdp5su8805t6t3l4mp34tp82zio4o75wyafvp3ia2w5x2o71o86ft2u2xv8gwty3lf43pf31pn77dpwl5ctr8criugsgsg1gdyyvyaiormakqkr96p2fayabp3pmq7pacoxvcox6tu6smsnj8wfu3azvif3jctyp',
                name: 's0dxnvws16ukfyqr6fxe28rx25sszktfqgw2ewkbzw2xdnqpz03gdup3scwtg0win7mmcmo38gygyot05jtx5fo0xnwg3k05xaerv1ns0awzahi62l9d24nqywtf2k6xevy3t5g36stayueb04khkvn7e9x7ivb7',
                flowHash: 'o82s4gxcytt68ft2i6la4dcdtddkne02srpl2qd5',
                flowParty: 'xhfi668qp2tsn2qsp5olw94nfbju6uzxvghyiul7v2bsn4pckd6zy2v5qwj7r5j6bb3ehxbb19ngp8at6s9oytu5b1hc9cg5srpik07v4snl1ehwa3t49vhx7mqi6qub381whhmn98hazute2h0c34vqm3gbssi7',
                flowReceiverParty: 'tbhl2hu05c3kt0mzpjg4hx3gtll2g9egc5bhr89et1o3k3ka75b9515rd68hqzrooixibj3wdutlbqdg7siea6hgclsxxzrox20t0dpjkiducjfmtdsr2l2z8ry0u4t25vwhwd14pid3dasoewrov4yzshtw6yoq',
                flowComponent: 'j0yidctlul4rozhr03ffftr629lukf7fzlix7g3yfu8pfw1pkejyl3fmyw56lri0bv1dltun59cgfayihctsa8msitkvv7g7ds9vwayn360cqj2rjmrw02yb8q26ge8j6qyjvwhggyai5uucd5bt89j1bd6jjau5',
                flowReceiverComponent: 'dgaflydhddihtq9nr091fla67izo9xrqcord467p8f4i28uku3waazx117gw6mnnyp4pxhry8yj1abymvj2n2bulfpu44jxbxchd9d2qwga5kmlwwu7heqcanzqlu0ipx2tv5vegxh2922ezyyzsf1syw99zzwhm',
                flowInterfaceName: 'mafu7bn7dq5ru8cduv6gmgvgfpgjjmyfnx2uuonwsoruxkgbjxq0j5m0swmh884ags7luehx3ahxxjzdzczm7ulsg0xcam7ra5nhayyb51my0kta32rprychh233p8bhpbpjnadgr49jh5mmm8mejmn904zgu39s',
                flowInterfaceNamespace: 'g3iqk2rqggocowz0rdy4zak7dlm4e407vkfe9909ic6eij99fgdrnpe8hfxranol2yw3m6xili0wli3wezvllf7i08rqxvtjmrd52cjwwlj0igjftzumvvrlfk6he5ar37cqc9aqy4bvjb08ycjlo5t8zhtwli6u',
                version: 'w2ka5ksg1zogsy7glr2i',
                adapterType: '48u29w7jp264k5d21k1psal7njh66fgkb0azwa0ui3qqjiing61ch182j936',
                direction: 'RECEIVER',
                transportProtocol: 'c1mec7ah5aro07rrz3tt7scmzkj7zhteddtwv097x77rg1xbunh110q192ft',
                messageProtocol: 'sbedlwlyqfwchmp8fp1ogdax1eo6ptcpjgypuoyi319ke8d28kqqsoo689cx',
                adapterEngineName: 'h6dvdp0zzut5wwijbp0t6dsni1xqw0wjppt61d7b3jtgmvrz9nkm190wqk9kvjju8xpq6kf01aihq77x4xpyblzca6ozoq7xkkye8h7qm5tvwq5tcw02i7midubb492h02m17gqvk01ll7qikshrttjh7uzgkmmi',
                url: 'c5jb0ua0b35pufe1xfwlf63rchjj109t7fafbiva28lz8hp9fxp4vqrwh7u67c3b4it1ydyi6wna84pferxfehgroqc2vsb6ati7tyyblh6qxlzloymkymh8pwtl2enfrue5iwepflo7fc3kiasuq0bhju05gihgqcpj0opheht9xg46bkwwt1h5lx9qg4zgbpf59o6dwa176wugmroe19m9n0gbh2m74aj5uamqbhwzlion4fiof3kxxqv8cc7ho3698bxf2anq53b1s0g50f40cej1kkuzrisdpgipx847m41919xpln5zdnhoc2xu',
                username: 'r3sijcx9krvbxapmtoramarysnmh7frv560fjmxpy0i717m09fpanwkjij2e',
                remoteHost: 't74u0fda2nhh9q5v1vjet90gub49sqcyjoe4n4w4ipb7wojqannb5eey62p6zrs5snsf6rkmugib25s5w07fz0prv4m4umd3mo7y5xbtvn6j6xufap5tza7cu0cfve56qhrr3tae7bs8qyq7mtrrakf2c8oh2d3k',
                remotePort: 8570232634,
                directory: '34unlbbsv958lshjt1i612iiicuhh3dczj007r9z3ndi5wn9s60x644y037tiwa77bhipnay826w7ajanzw0vjeaqo60z5lmz15vdscvbvvoaet2sa3vrep5vkgamph7fhxf4z3bph9klw1savkizcylvqhddnrb3hton2ir2vzev6wtcd4aw6i2isvuanmre5l6ncypbxaxg6zjq1l4y9qglsr7etb0vru05x0ombn9r2nnyypy0hd5hfsxnt0ga5i4wimc0b49w3owxaimmrr25soaxgomi24g6izemhmfjr8suanpkhs9cv56iwp3wyhq4bdp7a3k645omcbxd8ac6stqzyzk7dmzk0f2exwaem2yj225ed6xa6nwhwkrbetj0g6q48sogbzfxby5nnh5m2qjrnl6nsy0xqx5spmo2vm0063iludjqk1ab0pipgluuqhxkuvfeyp675zowqvuz56lovd5638snqx9xulzdnwygf91je1csoy5uk27rhlvecge80yd83g1p25rwo1lvt9pjm8kpq7905nguxrguppuar0618h2obc9owx828qjewt3e7yivegiuw163t8qstgoh63twqgyx5mn99jgqb8rx7p374eyx0um0n8la2lm6rofzbk3vms164l9lucdyyb3pioj1xruox5aj3r41zd9kp0995fzp6f71plpjrlyeerb3j4ympeyyfwbyz8ov715ofa84t6g6zee95t4bpdhluwfq1whwy0cekw5cuxkigzvy327w2lwtu4ul4ermksptwfxa0yqhbiky4z8cb2w1oyei8lauj86pxl04ks9yrothuv72eus8r22ehetpg21713g34kd4jcx39wggpp69rglue0hyi2oo1vx4obmesq0ze5psn1er97mrbj9pyvfd1hx4fjiwkmbevrc25d0lthkky45v5vmkw0v4x6jg9zgkznyrqfhy3gii1kvz8c7s46ael0oqisxyix0ygt1k66gfdaaadoehh36',
                fileSchema: 'bp9bcti8232t7dfdbiqeo2jg8bea07ng2yypgy0bii4m102oj9iazbcxuhjr0ixmwciern7rbbhl8f6yszwe9u9wx2xrhco34ukkhenfm1mm7epfzb1xw34nydrwqlli0moo49umq9n317l11z7oe0j7y8m4061sfl3uuppsfczrt92cr3xqxdj15ftr1fngr70czm39x6v3dgctltl6vk39wjgr0b0fc8br8mdqcqy5qwfl7gzg8n91xm5d3tkxwv3aie9zt9hsj4bklh84rc17ahmqkppz1og7349cvmeed8dhdzkvwdhys5lw7jdgpyoxkat2fa7ue8by4eyjlgwn8sbn1z7gn3c7hx5bqgwum0qsg0v64v2xd1nef70m9zdr8k56dy9rmrfibrbkadewdyoez5ykdatr3cot74toz2l9w96vaqv7crffqagdhzncm28epk0fggkrn14t9mzfonu1wds2ciwaiqmepe9mr9qw53xxhq388umv9fu6870gy9y39h8pisvzd71yoh3k99iiauva2rnqvdic2p7i756ktpqm0j736yq7fm8h35h34m3o7m6isbvouzs5dcoplo29um8kpwe2xptff1ozsmbz6w3hpcjdvoncxjg88ll899swvyhyki4j4iwe31cgouf3vlmgo1mhgfksetzsu6aqur94zpxs6iwa2je3x6iswmbpykqh1eo8357h2pavir4ty0q37zcz6mss551miu6bua5gjoinvtgpqi74241qnz3o1gwh28ayg9b5hmr833budik6lngx8n1uu7ajznrqi78w9x46raxt2m8nbsk1p5qks5bru2eufcm9xyjiqagxpp5d8kxfnb8w6k9lozsm09j7x4ajqvj8hrem3x28nd5g8jsdlhwhl7umx75uw9lzh3hc2ucquy58iyogla0m4xt1dmt1q8i3lsdta1slnlgunv7likju5vydsmrnna6mknrvzocyu2q33ohkcqtj6l02pm3wco73odse',
                proxyHost: 'mmdvwxij340zikz5x50h3k1fxeuljr1hew6xh78g3rmhatzf143cmfidkbd3',
                proxyPort: 8847146056,
                destination: 'q6kzinrqfatpx1dsb5ssrrmpyv91a8i7wdayd00pmhnk10cpk91se461w04ypwey8loufx5sa76tnzjx61mrw60qhcaq69p034o6nb90m415qwxkpynqwbn0mz83rfnpukkzimoxm5im4izhc22l55osf08dt9z8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5aipbahft406wdzft3a9g7lqepw2q7tp8n1mtlslokyb4ftuyy1xgiz0fq6eaw9i7rdyyazq3kptmb4or55fus7fdskzsvutwlijagzejebmm7hmfx8fxz8k41ysvje4eooul7vgo92rv24eraceni7hdu1q8ec5',
                responsibleUserAccountName: '6fn6ljelx1uqp7iwsa15',
                lastChangeUserAccount: '116nu7f77bgebmf87u0x',
                lastChangedAt: '2020-11-03 21:26:05',
                riInterfaceName: '692ueno22lkzsge193tj9bt1eioqx8umt6kob1w8426y7ol5r0ot6dg253l215ok9rgt9snnbcs9teu0ouj1y5b2og5fmbphsyy039dvmf49pkqa56c5kapro55r2mnmovnqarjl0w3a9v9x68d0uymp6uo3zcza',
                riInterfaceNamespace: 'eplf6jup4r7fa0k9l3e0hhy3axbx5ryyoe0odo0qom7usms7dbc1tzz6nvm5vgfjyyec1stb8nak70ghvwjvfzlqlzrujew53m7w134w58pn5l361pyowappfl97a9o91n86w5qnvusdg39ipzxg3tvoufm86tox',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'oj8r5l5fdbk6xmwv6m4xsli7e57jhmahembwqqkn',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'asjamlkybet05fgox694cah8qbfp07a732wydn8vbo7j4mbkl6',
                systemId: null,
                systemName: '0auyms1dmz0864o1rnyp',
                party: '9jflqu0s35g0myh7vep9a1r8cmx33kbcguwy24m0709cm713hzvqlrcp1r2vcnyelu2956e447sal0pyzjeykkr027xf95g12ipampeuqcozfeabl0qj6rgeri9omks512bjmeygr60axooth27zdnsrh0qqomjl',
                component: 'j36bv0o159r991zdta516y5xyv1srmahf09v6dunllwq81o6mitxohl8ws0gsxcaju5drp5yizkulr2c3dxm76p8w59e5zgurd4rd3l5n9odczvhu4i2i1eqkqwv9f92fi7whj722d5pmmwx31q8p0b1sp802s1a',
                name: 'yl8fhmwyeqnt466npp8upuhqymiqgsywko8hi23dh50lk2pnbhwu27c711e281hmo3uom2zqgck5bld9bx338xbva2jvm4tiuxr40daf90b0svbelchipkithezcs2cvrpnkwc3rn25ka3gt2okgwi6nfdeq41cq',
                flowHash: 'riuhgrpbh6xh0nwjaqslnwha2i2czjkjwzwmfp2h',
                flowParty: 'rfhiwm04o3lsx1q5m0wx9kaklw0plqri8hr1wtao7hr1nwevlsnn5lcvzimar291b7pwrbh4fgno6drwv1a90p74wvopfzfj8t34jdikhv0qo3xpv7p8hiw4k93scsw1tmz01vlexc74bh3neohg3qi0n709h1d9',
                flowReceiverParty: '0mrwgk4zctoahic2m3gwxbt2we82t5k1x4i4w1od4bd7gvs351fg3ngfw4kkkp31s6hz6rxhvwtfizifedfxuvvdlk1l69pdioyqlc9wd6qxssmbgw60gkrkbgq11ck7oux15alng1m9mirwshasx7ycb0qokbbo',
                flowComponent: 'n0qief77uitgl4p6ugb9xeripxsm0p5w2487rivia6pq87vnfqjl842pd9brnif2qmx9z8doumppekkdh2vx684mf1cpc47vd1aijvtzo1jsg5qg3oe0njrwaeuiuk55vtapzysnmpaq7ceh9rpxl61il4sgc58r',
                flowReceiverComponent: '1c1p2xpk1v48d91i9e74rcrl13tybhbh1244ly7k76i0vo9ad97ynwx175l7fa6a1ygrg4k5ulejgstnojvhof00oqag3iycgij6sobrzemzxdd62ibzk2kem5b1kx4jpoj60kcvmgt3lg59reica8acmhuweamt',
                flowInterfaceName: '31c1v0fw0hooo6bapz5qcnv8bz82pep4oveenzvrp1vxeylgzxyvynr3kd0kvy64be10bbwiaby9owmuad3gvaaw60yf9hwm992u077k9mcjh2q0knn42sto4xpumg9dj4wcc1zafdc5tgsnmnyeer1cizb0x25w',
                flowInterfaceNamespace: 'b7sti3cegx1sgs5c26ar98qwa993uzcg9yyj9lqlorbueqfkomo4n09x6aa92bqtcnqjme45gm3amiifwaf6nlcvr9x29w4x95ubpwrff3ayt0uhfmwumjphgamwrhw0v9wlc5tb2rgl17ualz6rxo3uuhkb57ps',
                version: 'kjkhvpycyckmiz848n3l',
                adapterType: 'aa5el941ur9ij27ka3qab70fmwcohtx1kl8kri1g5mgyykq8gc0w1qhpizka',
                direction: 'SENDER',
                transportProtocol: 'kchgj5dnlawpcddx5sc5jegjbbdjve71b0c1df54wt2bvbkrqmckzggd1k5t',
                messageProtocol: 'lqurd0jx0pb8t0unv2c8dsl6fm1sbalk3cc3se6wtp9kzcspzgpn9zjg68lj',
                adapterEngineName: '4yku55f649ugl1sc2pjjqdrewsyem4wb6tez1t8vu55t2yjlmiy4jgsmk6dydeu490gxyyp12oycudjrx6f1zj5fd21hvmo71d0ibd0ukj9htie76n6v7xmz1kvbqs2xe1sqgdc6dyjfdl3q54oo55sp3prnlxqz',
                url: 'zcjhqvtjepmdvsp2k8zmqcldblycmbg7rzskcaf2kebjxqtb4t5l22htdzu78cw6rtfeqayjzvd578xjqurlga9aj55pbne00lp1trbqtaladb48s09ytvzlvd4byr0iz6kuvo19bqfese5imw9hhrvjz48pzt0oqdzqh6bf9880mj7etblvunk9d0lc9msiiwo8jzbgqxhmyu3rlsau1ingo44xb0iqt5c5mian6mhufdipz0j1l8azl2vmp92uf135yttq9zlfp8wpmtk5b2todgkgceban131l6cdls5myaskeqbe2k9sy8omyuhi',
                username: 'iykvwfxlvmgd06w3mr9rrfxfntenr3jwwt63s4bqzh4l9wwlxr8urmne372a',
                remoteHost: '44iy0lsg65uwzad2xksqnhww5iw18uffp3xo4k95bsubfcu5ulj8hiszn71r1vvtoqnnz4tme8rc5b6q88dvsx03n8hrxqbrdwp5gxjm5pxf1uxww46j91vo31f48kqi3z6x3f4ep02h3s5d93x419pqidftt4op',
                remotePort: 1935326200,
                directory: 'xwdo95t0to403mjpr1lxahvzgx9tulctkr1yx6k8fhkyha13ikoltogo3srduwxwi0qfww1h58oauwqmdi86iynbwwbe7k08fqpboguih0etaqi5rhj4r7ujj55jwnyesducku3ds7ovcmmzht273zwfn9d7o2m6r1cfnonl34j5bev2z1a0fpql3l2hzn8cqveyig3pjbtpdbykzm9c6kmx3v4h5pbrhlfsa3riwpxkilnj1kb1do4ru99agf4k4gfoof82lliv08syomcrwyvh53mzet749q8skwt5p6ty6a2b0m34vcpkttsv3cr1km9dq1tj1799tqk0t39jied89usid5fwf768ua3lmr6swsd61fyv3hqzdx97zvzzsn1wosjbepurl1qt3d77gq1ggf669unuxuy03cykqf4vxunuiuqw9p1a6r7grtqs1mpkvwnipmmvchhmbqwy45rnvw88j64yuju86s61mwc8xbi3k3h8mgadb8tskpk5k9lyhqmwj8ybysdv8uw9emgub7u1ajornv78phhkcrrb2tcdqo32lmug2a357rndcc3kf6reym34wjvr5yqh18pc6yefoz7y52ejvj4hwfdddiqhdow65ny5hf3bs6u0wz3o26w035dnusay0u2vdr38z6sx1ffvvt2dknfnt1k3h3618qkbklliuqjuv02v2bdkkb4fieaabtvwf60chghedes1jnqvs10gsp8kjxld1064harzrp9fy29c6s4ct0ty48ay0zgwwrkbtyqexl8cs0bb25avq8m1lt41dqld7u1b73rq5pa4kzg5mpdsuj8qa98m8on0najgpfvdznen2csfhp1a2n4mzxkdharty1316dlctnqef4w8dsvpyzaxywkqxvmrc1j69yn98qucg5wl5l6uebd7vnmy09hytjp8g0ysdmil0iyfftvyvc4qcx7nwrmqrvzpykg1cdz5v0ij0mddvnlyt08w4s6h7chp365cfbag3iwejmna',
                fileSchema: 'pdtb02atbmm6tkemwsjstfbdnezffvtwqbq1n783fdik5274istqhg6cgfjhjo7kenu9qebt46hhufo4x7a6ywajp6gnp7llxcb601z7xvgs1gcofb77plmrxq159xi1muiohydb06ojqiyntpry9mwffhza2csaqv9b4e0okpwmnx9y94zzh0zw1f0efoz8k72royaugxhdzfe896klkxbyy1ax2zr3s84vu7aq1puzl26fmhpisb38zcjlrz7ptxj17lzoig29xyqyiycmmeha537qwvsjmcgbhqunrzofjl7sjykuio7k1qqhflpqmbj4i5golc3eu0bfp5lnzjqnfwq35a0pgbdw1ti00eyryph3xmrma2bc0ayj6t566pfbv2r8s6bnn4dakmymbsl0xfp8va7q0n7vuq8g2ghr2kak8yfpgh9e0638j3bix0tyaqjeyyy6u64dosi1bx3k5ri7nlj6ed7avkf1ipiw3re55lp05j89bk2ce9d3hqnyijtwbzbiooqk7p1hnvksslm4kqrlxhke8b8jq4ln1uy410sdk9a2q1d7248cxfz7ycqo69zps4djbz46xg4jy28qy5nuo58w3jrft7jh8rny9zj9z2f88lsufyi37msn0pcni4d38b8f6p7qai6l00qdhgasl3hnfu577yzwr7aa2a92ofyp4s9unthrd0i6m1o6b82h1kpgii8dlpu05wv2czejybuujavgecctto5dgmc7nporqq71awxqj3rzht46ahjnyck814thilhdvxjegjs1uqhlpo4m67vb14d2dle61bo3cgxroywwmtkb1ran2o6zvmmbhugpihrlieykavjvisl7nr0mqdchoeg48skm05am0dode0r4qz170buuinevztlh5t2923vu74oln807myyk9a4wvw04lm8xcq7qh2kwuenhkh3rfa1xfpkep6ii3wjd9hhvlfv3dou5vzkxdsb3hyjg67hlpyry0cunmeiixfqjut7m',
                proxyHost: 'z8se93lyfg7zr17fhkx2kx5c7linbrzjhm4dbau60yf2z9s0ohnlz4rte4rv',
                proxyPort: 2683915704,
                destination: 'fcqmsmzl392eth1unpstop102qhi3d038mcy1vyiax8vhp2ey7gux001bi5efjndvotw390uylpyulobv1pijit6xkmlegousmhlqxifx7qx15v8lrl6tvvjddgl70js6ipkzt4iz169eqf55u98ixnmhv0uqdle',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'y5qins8tqjuwled3mel0yx5c7ve9mu2n1jzggqc1aetuuq61ut6hlv8r3msml156z4hu20nryeim0td2r2z12l3gtlwmyzn5h7jb1r9l7c3va2w7hflbsy67juzk7yq23wvaz6ub0t4dm76m2rzh0ai5tzrp9kn8',
                responsibleUserAccountName: '31u5ukl72tjodav1tk7d',
                lastChangeUserAccount: 's8t985it1bkrsotftj8c',
                lastChangedAt: '2020-11-04 04:17:39',
                riInterfaceName: 'yo42mf6dd77xb41vt15ox16e4wymcmb25wheup1jtmx9h8p6w7gyeojthkrh0qmeuev12q40vxgqjo7ext3lgcetbjed642m07p4jkrdxnnxfr625wbdoh8ns3tgby399lllasxz4zfb7jals8ihizbaud5tzpmr',
                riInterfaceNamespace: '91npxuw9mersupbrrxh6j9rokr0cc9wspbr155gb8jxf7dpnffvm1ijsb6z1qpmqvbk7l6izhf6bmdi4srxvu7jpasp9o8hgdziig1cmjv8x3gnd0uz80l314kxm3y6i81jo4ww8i5fgov0og1wirr3k2eda7f6b',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '9qxnvrhogg3jmcoafwbcemrg4402xohd9r9hzwyv',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'wimcusm1biv48ftpp6ketk8wfndqwq3cbaz3kh1eo6ak94pp3u',
                
                systemName: 'oxrbqd40be5r1zfl7i4t',
                party: '6wrx6vgqgtv6ax1hbw9rj62s4ggonm96wqvjmym56kzfg9rr6jgdhu6vd3rh9dbsmaoslj6mwjo2mxgxsjqgublftpmmwohpjj3usdlgujpa8zr3drd6idkayvxg78a2qlumd8l5p9v8hm4ll2doaa7cp7vk8lz1',
                component: 'o7hwcid59sv622vpz1yktf9xq2sldr2ybzfjw39b2jafwtcq3zdqz32sw6g8u1qe0eg3lwymbteesm19lvlard77tq1p0yq5eb0hum7jjl7ftnt0m2wn9fj19u1v9joa9syrfue6xomk8ww1nb578rqucn4sf2n9',
                name: '8u1plb6y18bmf53ju0klcb5fll6pmdgyv0c32d0ddzs1ymlxqzujiys4c5vu9uyfpk3mg2nv5elfn65wvqguqh1a43i0ifr6gln0a36dy0huq4gor352nqpcjh8arnlvzl5fi5l1cyrz78ymg0swc9g83t7ajzm9',
                flowHash: 'b2hnqo7jy5bgeud935j4jykcl0joo7zj3j0mn545',
                flowParty: '8dl3tx7ylpmes9f1xh0h9ifolkdfks0f22nhvhvvg9bt294wcf7u0f7yv0jxrj8xzkdf0wb109febgm5v6o6ij6rpup4u8ub7zxdtw2b505a8ytseekcy2quy7q2f2dz5rc09goitp48aqyhgrfmpr0h66zt250y',
                flowReceiverParty: '0e1k8376soy3b0fu4uuegv7diraazd6rylhph615vjyo60ehqlbblaujbhu9x4qrr5vedcnd0oh9datlkj4g6v6960w54idsk2tj43329ein97p160whx9tarz24iozzk1025t6fhwnrfzahb3qmlhwleupiuh4r',
                flowComponent: 'rmjp2brvvzqpq3rs3zd4vpdjcidoi4xdwor23nweo0hanpurlgv66mfu8edpc9goa076m4vcjf7w9qkn4f8xnpel6ljzdlcl59ebt6qfr2heiyr5ozroi2f93sfr7k3v2wochnnhgifjmanhyhrvyln29s1f20bx',
                flowReceiverComponent: 'bfaubf4qbi7tqfdvgfus14ibv277o9tsu1fa523gaf7zdnojjjyeq00p0156i01n2twa5p36cjlpo478lvv0tdd9z23fvl1idhwig4cjbo58hmfksld4wnki8vdpxxeyyszpml0m9dk1kz4h3smtuxvtulk0lf4y',
                flowInterfaceName: '3kej77k5pm7d99tzikg77xw9coa7bzwzbjjzts9x2a17iktbuwsncglquctr0w3a1zlcck9af0waoyvbsahvshdub9qdvj3ijvlym1gslceqsuscgszaocd3kbkiwg27iqewucy88ong04q5jq5gd2ymfxwbv1uv',
                flowInterfaceNamespace: 'l5pp4b3q37q328l5nwtbf1i8mx7b62zhfs8uy94ywcdnuiotmv2xtvbbn39loq6gvduj4xy16n4zvyjk1m6mtyywb07y253309x8yjqtbfjwummzhqs9t5i5edyo8dm1yiko19as12t6aun7ms02bnuw9tizuifw',
                version: 'kearxqzncjqr0ejqdjk1',
                adapterType: 'fpfvhrvgyzj56z9p0955f534pc9g6x4g5oghl7hadl259o8jok8toaozp24i',
                direction: 'SENDER',
                transportProtocol: 'raloeyi9r72rpr9gdgd2xuaiistpgq54os91dmj4xy25idi6lfhk3mwlfwrh',
                messageProtocol: 'kdtd168nshyjcsxf7ucmcdxi250pfb0bk9ehzngae70q02yct2lthau9myyy',
                adapterEngineName: 'uwx788ft9q9qj0hr6pqwwmyscqok7ih417fdlouw140krfvf0tc1yg2rge9fe52sfyn2z9jcze5ratnuxf3xmzcwyij1e15cdbdaaty07ej27c6rx1j5airv4eza8c09jdtd0rzzqu2nmxiagej9eqxfrhsd1yt2',
                url: 'camsk06pc6z3oanxwaqwxtsroate56pqpv01qpglxkj9drby4hqbtf2h7p9ogprp0vbxxzpevmilrngbn0cizviei75j7lo0q70zvl41kggievdsc4wyx0zmzschfst9avj2fpuodlkurs9se62qsruj76t3stn4gbuwafxwrknviqrcrqu5f96cdkug528xnjn9mgxpzm3tdv96r24ooza65jbi4fs23d0smezkegyuklatrgn42gztog0er7dy9cerv32rz2loqfz32n4puxav0fjd49796pxufg7dqv9rxt8qwzg1wvkdjy9sizcw',
                username: 'myxjfr788qxpzxtlemx3aw4wgokxf02z0udg8m5l0dsd3rw7f2187k36dwiy',
                remoteHost: '00gdss675wwri88rzobkg1jyd64ulff6fg9cs9zh4b4yanw8r2pp1bi8fy5pm18arizc93h7xbfylurcb53joc38ojhrfobewsfootelzlavjt01jk3y3v5dd4l3ok5im460ii3l8gwyz5n3ad50370i3tliykd8',
                remotePort: 9335117344,
                directory: 'vanf5481j0rjsytmgsfag2h9wbva241k5ew9it683e46w0wm3yiw4d4tpq4afcad2rvvlszggu4shqkjj2edq6aalfdd6n3oq0mp4nhwz1xu3ux6sz8e3z04ievin28y0k9xndoxz5md2whtqxbfvqk4mfe568iody6c6tsbommieijl7mik0lz8gm4borpztipn7pg07bulg8tcru2s6zgn5jdck8hueh8peczije0f0re7e6alydu5l55s4yb91b46e09x7ng72cx1obviemw8cv2orpevyksu4x5j0xbfgripepcw4ivuh9fmr8r8o4qws2o1f7hb6e68ulg6p559pecooatfgs3m4tlpk261g971bgqs5x0n1lwoxysfz2w06e9zptf7cvw60at9s0zqzb7j23vvluvq813l62c85djqdw7nzjsfahu0ej2j8jer9wrnjn3nkioqo4dj0gorf0us1xxnnywmpytteunl7mp6cwyr7tnj9z586t20ls024vn361i7u8m9few6v15cyj16kvt3d3pe3e8bdsviikkcfvkaeg2fcv2ch1gafn7x415cfzhw6e0hyj9umwr1cm5bu31yb3rriow3wwzw0th3vgndm9rntit5t1alxae4173fx05calc3qva8z64p36npukocsigv2n9aa8c0ahpccr1egwu6beniuwx4nznzv1sdwuhl1m4z6dw5a4lg45oee8jw8rxh6wmdvfissv6oyvh42ov5wdhj913hvyyd9sndrwaolgbd3sxlzqod2yczmei5zqxyp1bsjuzpo0mjhq4f3xj23ar79yt07yfbpz70mstarflr8tkk3sb2h1acpvwc2cjzag9ovamyy02gzkx2u8t6pf4148l34e83dgg3gb9dpt35rwmyq5o6uvnv6ydyo07bq2iom67cont6r63a211moeoxyx84vy0vcekrx2fwcp8xpq2j0suwlx2gfsoqalaut3go62jmwcbszc8rwmm2xx94m2fo',
                fileSchema: 'jss2e0gsdsob01judy10ajgjuds2zr8zwtc3yewsz9bsj35z5ilj4eiq5c6565fazzd2ktr83e4fxr1i1c5fckjinj8kdwqvn9f7zbucyv4ixlp46nuieexrsdrgou4sg8l3zd1bva5mv21aza9mc3ge8c7y9fvh513xr3591d3xx3vicqdcb8aw05u2wuuzcp1wiksqg61bnhausqqlceus466f4uhojyjsod8wydk8aibyk43suakp96lytommqs4gen72crm635ql1hxagoj2cvhnnexbldpuwiogxns7ag758u6obart6ryhpuvydumfg24719azpmxf20nnwlmhczc74ribzyfnib3t29avz5f449gqn8xrjibhq3zn8y2zzzlnl4e5mo38r0znetn3cbku30gx8z5z6ix4yda97ivnqfgqmw8soar6oqddin024n3rqx5etmkxrtp58xezts6ktr55rucrdgwakkzi2y6y3v9srlb6s5aiysee6sltogj7o3ypttdc86sv2gxsimv4nt9kv76c6w1su1q9yjwdrzfzxfz2kol7xfjdstj1s60o45bhu7of3nlndqenrbgbwe1i2nlgc7yu7zyf8bta2haioq6t4u6g3obby9vrwso9ifvi887d1gk34p25a2sa5q5npqv5fkzkv7g0rzu0s3n0r7j3rtrpth8nv48y9q3wxfy21g0lmjfiif1nzv8smexzevcmlic9djtdfetcpcvr8oe7zww9ppvqoy20tl6f2e009ooj8jgun9450gd5la3k3c8wd6oynyty95l9v59nsnuo3w7ucczhq92198otty3vmsmddlq5bq1mo34x7v6ktucfs843qxdxwpvex1vcoah488cxlbmiouumjqqygjwk0id1760p1e4yhdgfz9ppu9o98jboj24tuc1heawrqtsqenhota5caqfi7k6o9e4u3dtp6f3wwij7z7kiy9d88honup4mzcenmma4n4bmgrtyguvvmlf4',
                proxyHost: 'usu7b7qpszbtxb7skyhm37ayzdrd79qcbacwqms7rvn5ketjys16yiea7eix',
                proxyPort: 1903545147,
                destination: 'ajf6r6bgw73i3ix7szfc4p3g4ve5gasjbkgrqs68j1290shvnoe6703grce5ena3ot08wilmm0wlpk3y92rbyf6jpharsw3w5fetqszlit09t1polfz46n3hjj5rym4sdpd1hlfwwavodlh41p0g02pyifq3d8hn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1r7lwbfvjo2gligix6oh9rkjk12tasyybzp72t4wma8twevzni7ilg13p94vvqm0njmv70tzu1jkjz7gyd0k0o26911xo77aykdf7p86fz8o64982lxbh6qjqvtusgi5cr1brggn21enktbm233l0xk5a8ip7awo',
                responsibleUserAccountName: 'b5wovswg7rpre75m40el',
                lastChangeUserAccount: 'gn813zkrvrae92fdqkr1',
                lastChangedAt: '2020-11-04 04:02:28',
                riInterfaceName: 'zvjtjzporbszmnta1fu7vurdd8j64scjizu3w77szmv6wptsb1w1go1y5ecqzijj1q5jivavx469fyuqdf6n2jiiw700d1q9m2i3cnhcj0kdqd0dmnwrp4x56n0ps9nno1uges428oq5zn1n6lp5e6xh4h3cwxep',
                riInterfaceNamespace: '4g3hv71ebi7d3y17npt2vctdg9qsspcoqxihko5pej7f9m0sjlz955uyak92wcko641rz50w6dxo70xrw90gkkr2pl7y3zzobl2ujfp4gq4kus0rvdczrnk7hc83gkt4uzp5nz7c21cnu8srfhfmdlhdeu8p33po',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'z4v6dpzmq2moiba8imwgvr76ps8ogngzwzhehjdg',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'z2c53bbwc0gufz808w8yncaly498659cm1l34v53bfk4aa26z4',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: null,
                party: '4ky5mqryxdh0qgbugf6nu4nnz96j1i2t9zkqnydye1il14yme4rgxvtawmvjngu205907xotyk7gdhrg3i7upyuhjj70nt3udnc6pwsdorl0kc9eeu6m0jgiuirqhfr1x1737m81s5nqe7fsc2nsrhz6sxs5qsg0',
                component: '5zd3rf46e0hyqn5xye3u8g1lt3x2ldz3s9viv1fgs83g9cyedykygftz3x7omise6kgmdg965wolgjcgkbptbaa68n92huzhsgxx46nybpa9wwnipoipr6rqn5agvmmqhtphcwbj4uek9sbtl3xwfedw5hbkn3is',
                name: '8f414ht05kwjdnstm00p1e2ga440sic1i1kr8qxbi2bspajhvg6qsyfltkruiza8cjppigo69gvvbkuku7rors6bo644gvgmqzr24keft4qyn1rmn569m43hf08qcc9srgjtefagelnv93o1og5adih0dtndgb7k',
                flowHash: 'jutd56vr43rcrz8eigixy8levw278pzadwslnds3',
                flowParty: '1i18emwrkw5pj06bed7rjd54dk9gu01ddmhnf5ct3sujjj1f8nbuv75zi6l2kt2jj50plfb875v2hed1yhkb4nnvpf8hv55n5b5sgfemncbsyg8n4qujs4mxujf2xp4e779w6a4c05wubc0xcat3uhmrk98wfv8m',
                flowReceiverParty: '5q54li7yp8czshn5qiht7cgly2i9nx44bu1rjpd7h1t5eq7w6cby2oxc902k7o7vi2w88sqb9z8iabgrdztvex0l9uv48ai7sgmoitapyleeycn93khkexma4lqusm3ic2ubn4oils7ez2v1hf5gcyub3htruk5x',
                flowComponent: 'p94ig72a78j39x1njqsz1svh9km9m9nelskchmq0ywkny4gjh0ob8fo7b1v00q0gim6ktqa6kn0511b843utphl117lzkn18kkfdx3te68038jf9n9kzdh7gze5o4zx2lz5jwri6ltwfqqesstrmz6fja29us7x1',
                flowReceiverComponent: 'l9ony34wuyus9jmjy50i3denxlc7sbly85l0x422frnaoj3zweoerkgsc6jx454pivrg5h0zgjy3ut2p6psrbzx5jaaejvn80qkm6nv8cwsrw23y5r58vp9l2q34dpcqbh745u7jj80uqq5mwsyvcw1r0ytdjduj',
                flowInterfaceName: 'oxbrgit8gc3w154ntw299evktqw9asv1iawj8xv4lwqqqfukyt26bdjwr08y4vmvmqdp1tonevdu338ntedfcu1yviajtc8bcf6cqxdfmd457vgj2k0drs5c96agb72tgdlhn5143vl0hgls99n6kuj8ejc3ebp8',
                flowInterfaceNamespace: 'qwj7etz3x8i9ha3lko8x5t3uq6ts2q95n9on2vnkpnbj454w86dpzx31g27ennj2ioc5v56m2gixy3ywhib4d7dmvxupcrh1bmdiewcjf0lw7r7rsuybbzp53l5foxtyxwq9xnz12v7zqkukd60tdftkgkn10pp0',
                version: 'ykqzx6j2il0eke2h89w0',
                adapterType: 'xx712lsu820z8hwuqygtqqufepwm2es9prnp6l094uwivdxy1pubq9090sfs',
                direction: 'SENDER',
                transportProtocol: '36vwad7960h109pfwel2sq20hobtf7k4uj59jf0zxm54ln685rcv1xg33070',
                messageProtocol: 'o7j270g4yr921mzasbmqv60772iekft4bxkrsgtr9vwnvx1mdptscvp74j7f',
                adapterEngineName: 'i75vleupwcxudn8fesp9prsdoz1cq2tuzxnd0kp7i32r6ac5ior35gysgmm6zi8n89w0qap02f3op5s9ce5fllibj195ba6bowgovf0zkghee2ymdfbyvjh6a20zqhlii7nlaf2wy2ax04seqtu7rs1nk6lrlu00',
                url: '5boljncee4uf7hdo1jdfiistkzvp1keg31ufx4rfhcm3dfh4ooo9adhpz8cq48ohawhe6sz3o1rijuvhraclmzhjc4lynfdikds22mo7r68jwhmo6hbg6o521wknxe7e9fguqa05op98oj4nzg4qx7wmd3n8l7qd398yidvnlrc90bcw6lnw3swsqg3xmzg58trza1qa82a7yti83c4774gxbzd22pu3l0366wrnlwpbhg9249mrfhcf9k47ybc7nust3th0d3b6r4lind1v8jst1jsyqldk59d7fwqo0zvlchzse11n0g2bm0iv9myb',
                username: '3w2i7gmgr0srk6zb36g4m4ropttk7jofdus21ajo98t7zrxxv92uyqwvq5qr',
                remoteHost: 'kuz2681jzufmyohlecyes4w4i58kw12x7cxnozqv6zq4ycxcnqp6i9afjoc4vvmlylicz30l37b0drtgi0ukt0rvf2wnm6memwv7l1cw9sk6l3qvloz50yi6v372ec2wzbc8bbvlhew4vokv9no68aqp3vi0plq8',
                remotePort: 7479378198,
                directory: 'cr5t0nqmt1yolzkv4snlj7o4z68ekupx2pv1hroimgw47d4bba2br7k245xywoq987s88zmnxvm3qznm3f1lha9r1vtvcs8cco962vn4itsarp2e49quaz0t7ylvp12p7puqvk8byhyiuommxis9en5i4i5wmdfb3ntbgf2hfbwnn87ncat1rrdaxfw376q1vqv7xei9eoc71k7zodgikjv3jur4flaf3azxh7fqscc9u1ajk104ob1xlrqkjs1p5u60uqqlmvky92ewrhe4xgwp0gfbpfiw8wbipmdb1geozhbst646wcq7t7svu0v50d4qvmpe35wnq3ux6vuhkisa14e1nwyrlua6vrpa5nrlrpfeb57z8w2o14ohvhvaeyai4rg8un6qu64p1k6fbnm38b92z0maim5oi26gg4jn7dirumkxslm0hs2xr67nfyvgesw8ae7djabrpz89xdhsax21suaxw4fa85vdwbi9y2nxfdm9dwrtyw7vn0gtmqxsbgadrwzkl27mqcykj1by4aiirtl7as09h7y3pmnuif27lzcoy0tijl4ly27z8bfzip14qp6ze1byeazalecz76vuzw7uzzj1346w8f0kdhd6ntn0dunynq040nyvoyggde19sve6tydnovx2w2i2ogprfzrc3sv2v5n0qwed33g4dpef0w8igz9178bjm07ufeu9c8crmbl0gm99a23mpv80vk5slclzw3smedhss34h4ko6ywuzat6xtf8435bjuhvazq3xvi8h7bz1a6bzc80vds8ejt47haknmzad0r84ks4k0vfqzax5lhl6a3y2gs571hh8szf5k1vmc6hr0habj3le6apqapywgoy3g7y2kmmkk7403ybntn9xgw8iw6zcdrgtyf2zhzysf99gyb1b6ij6ysie9my58tn3f977a03746yyjlz4y3mf8v6ms361qy3f6jh0cgnsvc19n1e04f2wg3wl5wa6s3s5bj8clteh0rt2lzcpwquc',
                fileSchema: 'k63cbyl31w77uyjen7756vdjaxkdw345jdzkcxfmpi80gjd9hgjbrukpoiqz2qvp5hkj7v0hgc3eetmtjb63tp23uc82puwclkbzeb3r3gqwfpv0ddce2q1p5mi37rsazcw1n8gkmocmj208wjr3q2fhit17k24xdtotgw1gwriwlm5vll0qbphvi8glvgybhfj71gzz6ycfvdmih7qard9mo6mvks5rkau3rkgthy57mvtt3m59zchgzub88cvjx9aawiiwu0wgtghqjqqszv1kuoyz76qdx8pvn9o5lpzo8a2hp33f5g0lww687aiol8pp79ff7ohnqecz8o3b757tsbmyejw0ep37crnbw695bwtyw9z4vdh5wjwiicsyi7jiorkymeeeftyj3chiwdlphp5qzy7ogz0u32dvrmad7myypuzkw5f061cdnmbece8niv0ev6meranntqpn4xulhfou76vyxeubfg5lku4np4057zcvt3qq5q7oapddhb7xvv1y3tpzjaccxsssom0kyz9j2xuht2zb2fglzg3lo86hmmit07cmbfenz5ezsrp1tzurce63wpytz261kqocayiwhatctjyvlrts39gaz1ay2epgdfp31m6pqubovfvxkc95huon89jkabmlcba80yztek7w4crtg922qea352wjqvrnzxdeemo089j01v8y7zo5xfzqlm5gffq2joiujt7mzfdqqnkofcqcu23m32ybok5ipvi1a7gwkdqbdtq0myt61t1u78m3guxpt8x1hi55u8ft3zugyt49via4bsvuelwos4k3nq0xddmcqk3lpwoxs1x6k73a4lwn638qpg7aypvho4yxet2jozwrl9isnwealgk15vspxd0tjb4i4gvktvcwtonnx9ok55m750ncx64kvq8eef406hf4jdo5jvpsgl0b5nw9f4goazad79pl4sldk1l30tfsxzyc3zj9x5psnzdr8dernvfdgs680ihpsse2y22jo200',
                proxyHost: '0km5igdkv0ajf7ms6cnepjza7k7phwyqezyq2w1ufym32zgunfnzmjdvzyhu',
                proxyPort: 5663658394,
                destination: '25a4gijcor0pklgnr0f0yghilnyrno2bh1y6w2bx67hldsbpj7wyt89gtr35dkp76fcgyooje126jijde2493i64886l1lu2x51zyl9wlz7gi4kyxexiyu3619euyqfj8vof5eyqijgt9zdrkef1v98q36gegztx',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'i03idl7zt8cqyy6uq9vkcgcnsba24ugrcv979v6g26p9ccsxvn7wdo0ik54mjpnkep753i9gv3sz27qx24nyza813kjuqoky1wknmo1h08z99fhqhxxtapef3bkyonzu0mjy1guvq4as4pjgrreublq7ztjbe4gc',
                responsibleUserAccountName: 'e4f2go58nrax7c7iezg0',
                lastChangeUserAccount: 'aqedav3ausgbi5xbdqeq',
                lastChangedAt: '2020-11-03 18:23:59',
                riInterfaceName: '3t9rlrxktu9txoyk0pjuujjkehwcbudimfx09xa9gakw1dmyaep33cajzao54q967smjszgk1al4yf9vbzbyy55vdanzjs8oyce7t4gebgks5gjpqgnj7tl9qgf1cji2v0elbjnoarg3z182oi3vl7vilqh9ytfx',
                riInterfaceNamespace: 'jhlkt4mtcqe08xtnf9ls3wwxieje3vboyc10glovz8gmps317oesu9hl5yyiztrbj6jdxlxtc9ypaepgydi2xjqcqbegmjhbz044wrjbtup0q4h5dj53x77qcuw38i76p67pyums8brmaiota54lx2p5e0sq3v3v',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '8bhq89vd6hgfwnid38c4g19si3y1qrfytvyyii1i',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'a5mk8pl3wh88spi523zixdxjv0ylyxvx15pvzsumec7zeaghux',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                
                party: 'm0wegjsjeqmm6ctvbyb41wolybl23uzzaqqurkkxkmxw05fta8wa4x1v321je71lft6xwuwb2xn75shdw7yht9a7wa30tl5nbai7dw1inozy1g7l58dfc4464fgkx8jsmdgkgs2stv5jp8el6z2l5v8y29ykw5sv',
                component: 'cm3uc7mi74lnjqbqfo4zcfnj9thwyhiyjnuksbln5vh2krc4a1ny4z4nwara8zgoe2pheqntkpv5cp9gyixdfqem5sog0v6bb1ys70tta415hnbgeldz09w9fabm34091aq3snz7t8lggdl6fpwq85or8w5vlop7',
                name: 'dhwsq5a0jhwgodkg0h4h8h5b638fextdloqlx9ekc7nv3vw2ekhkcuyldd376uaop496lf7cotfxf54z5wmne0usi8baaanb1g03yu7s1jfamwg6svil1r1xkssvb4gyadx51hpnev7g7192wkh9uj2dg7bd0y9q',
                flowHash: 'azj09rl5pn1vhush3zpk02br7i785bunl2f8nwkj',
                flowParty: '56m5c2ka1dv6snnwrfg65dbe2svkuxivbvctlyrsb9ninoya4vxzpwvp9pki8e57vencrp1s63k0elbdbjdnlydce998j0bc214y6ljc1mho837g3fpjhw0gsv4s4vsw1g1cxdu1zv2o2mbdmj1h5oceygc148le',
                flowReceiverParty: 'nkdw5pynd8a1kgmteadd1ys7nham4xavytle8v2y1exw6l301wf7u85bylpdak7e5bie8cl21fhjo8ogov9f83n07djiizepgbpaciqt8se8t47za4vv65ji4h721v11q62febhlpp5nmgy8a28jbojnlzvl2d6p',
                flowComponent: 'fv8wak55mauadrfi3wre524m473iv74bil1uzrrmw3zk3xdxirtkxxwf8x9nblxc0pqulozn1uujz8i79cz6xii08e7rdhmih4l4ux82dt5zx51ws4z5cjoteeaqetgcx6txygwwbgz4ytx45c3nr2az3qsbf6v4',
                flowReceiverComponent: 'ql3edqhzyj6r3ds84qlep2epsiiirgaxt4gs07trt7b1aozbg6ng9a08xet7lmlo0mdmjq00ksqn1r3e2ufebbyfbyqxfdbuear7xv2fzwoz5if0wa466vjleu99mca3wotrpazpo5k8w4jyxi8m3wuthfvgistx',
                flowInterfaceName: '0w0fysze4c554j18901a1uzf2c5jwj4p2t1wlvoea0cwm7x94xt5fhp5j35wxjsbf54r4v73hjsvqb81jz5kzoozhrd78tlo4hpg8yqveakf7lg0u92jggh0hb3ac140w0385xtwit00uq77no119afxltia5hfl',
                flowInterfaceNamespace: 'cjpdlz7mo2s3aeybiuzw121wve36i072psfpc6w4jzg4u9jw5k3cl591hlxxdejjsea7u6ahlvrb4rtqrgebeox2wrm5v54ot37aa2rhmju5ymo504t533jpn4s8gdx22k6zjahi8iakq19b1csd8iqhrs4enie8',
                version: '4xygdwnlyv1jfxdw719m',
                adapterType: '60lcq0lxyqksx0tlpntft1h3h8frnutz9dzuv4t1v52vu2qon4beundyvwnx',
                direction: 'RECEIVER',
                transportProtocol: '4lie6rbu0jdbzzg5j0fqf6zd1y7jno542mf155yn6oveiaoxjdm29tbfl9y9',
                messageProtocol: 'shy2b1lkydv7yk98nfszcrgr0t4rjjyjxo4d1zos6pd5z8poebk9p1pitp7m',
                adapterEngineName: 'tk690xv9zxa0r9jei89gw30ri8403mdd6yxvh3sone3spoedw2ko496qbbte79geqf5dfztxl0plvz97x12j1pw7p3t7ci0y56y842mkoplgh5dh0jfxuyfabiuqkj6t449ripcwzefd1aq6voyjrm2v329u63mt',
                url: 'q1965n3eafsoxhejn54j8f17t6i7dq56wzv83ttuiv78r7xx8lp0w8suk0rfzsh9595ntjw1rzz9du53jlqckx296tg2yldncpcv92n0k8xwi0u5avgkplry3q1ivjwzlaj4w58hyacix55dr19wiw8ak2rxumvy74tqx8qonoz903kjaas6gfe05qllbc2dhsa96vuj2k3d1ueve7j1tj0fddm4aug76tld29oaq1uug776hdox6sas9zao2eq86d26il6a4hgyv4h1m6e0fe2adl2bvseet2z1fgu0snxlcw0i3x3i5k8qoihh3wt2',
                username: 'aqdf2m6t8uihxs2lsfhhfe6nbvye3azh2j3po4klajkc6qt90iw5g57sqx1t',
                remoteHost: 'do4objmd4kwylrgunjkqll247k5u3v6azw4doihmf66l3p6s8inm8o3kmro8yd85yklqjx98pgx908crlvvb293q42q68bl2rvavq0h130i26ivf6v3g6twvish7igm6pt6p46povymb3so86w9pt06d9ne3nxbg',
                remotePort: 2175863028,
                directory: 'yaoalv092752qjfa93octajayr4pskodsayw30i423m684oosf5xzqpbv5mvnzy3hamxgpearxowdw6w1iz8x13e75pad8sgrul3c4n82wk8of40y0vycckr9mx9u65z89h5lwud03scbml8o6tp9ji4mvm1514owc1wkpl6gu3mf3xkeh7z9apmux30b3i6a5fmzte5l2pf2ducbl3avgdp8hh6uty54twj06lwfwvdnbdsb863850okkk7nl13up4rwmibdhrm89z25dshh0t1s8r4s6i6go97ljpusb59j1u4ai76wmyu0lxb7hpg6b82465xerhfubtmt2xd8ntxwex22li4331t6az2pqm5y1c7njtnwa0rvl7iebol63gmg1zr2cpgk2cp5evdefs45qsz3sv5akxprbzjvq7nd3iio36svod66sf1t764vjw0rho22yjeh3cxgt4fy9m0z9hcbrds7vu9ln72y1ivq9208jgcr2z3ahw0687syxuxi7620aeh8wiyyp476vdqy2ab8h9nx5k96hruddlmcgk59wx43vreb8ffrqqzwnrn53zd0u1bpukfhdmlri78dt22bz0agevync1pyntmkb42qlavarm1fii23vgkc2lbn9vofbbijt5dbxlfwh5gh3w5eia1qzvqcxg5qokfsdwvt54x6gt6nrd9wydii8oub7v56u6kmgu2vh5r89te4qeoax4qsdiy7b16j8puhvmhr1xng5le4vjaiw3fnwgbisb43bse2rwu7onz8zew019sl3ephcl3n91j1qkho961xwiramu6ku8h00xbnxoukx5jyqlqvluxceafd5ahg0e6vf9d7s8bkm3dwkxgjr0hui5vcetv7jpadvp1fkt5q8ufr36o7f75wbds1lgaklqw0drrtcs96y2yfkrb5lqbvh2ul17h287a6653f68e98cxpovhfa3091tiqkvl7fvhvlkzzq8hgqzwrmjt0o67d2p1qs6cr3x8m4z7',
                fileSchema: 'i0gclun2t99cajpxlu3v2xwgkspima0owaislt0pntaune0gu2sz1e5f5ak8keyy0fseyddmipwojcyydwvp2uq2jdx2lphhiakv5yt0jhwypcyokn0kn1ydyon2v942ty2ywwmnwjjlgzqk5x07ebx3xdb1dhssc75pn1v8yx2trz96s1v0xvv0p3dd6cj4zywpam52at5s8a4acee11na7oi759nvupcextmsqv12g22ink45yeq8b2otd6ld5qa9xbhpsc9sgauovvyss7vgss8f2os4vklbdlx2q0aijanozmrqvjptbt23saiaqryws95e3dj5xqddwd1sm4d4vzhfl5mqc5gbcj1jod9mf56gbwjv8ajczil7xy9g1ijaeb9zsi51s433f2vc2ie9qd4dpuweq7zzgf32ja8k270bd5ue0csy4ues617yylmw64ppcwx2ihra84nfkhun0d8ssghmtwt8ch2uizbelishvyjw902kfyg81tnaml7d5tg7zmjhvndqshy7etpkwqu6baerijwocprcyfr7k247qpaaf5sy0v5qsjzd7m1ucw1smm4w52gmdopqui9ojrrb87zljo4q34t39cobtf34i97czfd8vpe4qzlrhg9qjm3lvjivae1gquufv0sat1lrmoeup6ml24g5goko5bn25gslsqo7f05u902y362ke5wuxixsi1juzmnx44vh9yro2j5237slmol3nm19zb7rlqhtgdzqplx1xhzh9iiszz4rkpdum43u7nwknqs0ymmivwf887jgbosbf8q7l2qnhgaq1l34gi8aq3texkvpamvzsp9eizk6b42g88zmku2ytr3chdi219uwelvwvi7z2e6szgooq3rnbxd2s3r0xiwbbjal5wwxaxwbso665tsekzw3u3vo17ysnyl5z7exdsfi1qe6vu2to1cdjhluka110hj477jz7pyb4tlt6krwhs32s4b4hqakc584mdsp4nbl45zstkwwq3ne7',
                proxyHost: 'qhefhg54aszvlb8slkj4u5ixrcpgudrxcdebn4ptanf3bwdclyx2px19xtst',
                proxyPort: 9863152396,
                destination: 'etd294ajh4qm7iuaep5kyw5jy2ir3t62t97w8awolwsnharv7nyi8lzcsuzom65ka3p5zrs0favlewmk7h1mjcyj2vlg1jw36khwvexsetm0j6eok887dbph5ygjgl9rqneace1h7ibq09z9zirz88ugyyb4k0j1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zopma1gc9544vayzs7w1hq6djook10au9lq3azbzqva1wvxd51y9iref49kmurn3ytnmw2s85e2lz6n8isiv3iy1qqlf4g48t87eycjb0z9b0gx4xubwphrx72attny7vqahmh3ioyikymkpo5rdr2q0f7irkgjg',
                responsibleUserAccountName: 'gqyiuqaflud9o1dp4d9r',
                lastChangeUserAccount: '9y9ouj80k4jrx7h7lzsl',
                lastChangedAt: '2020-11-04 01:51:00',
                riInterfaceName: 'ljggea1cyin9o6hibfefp9e8isqi8mc72hp0mr5m6lwr1i0pufzxb4dd38ss25xlfeo7zh7jcnmswkbrl9qbsk4m1p25v0nrag0eujmb62n9pgwvgmh6kgco8px1hp9vmtlxwph6pktgnxegza1j9w3sfeah6kym',
                riInterfaceNamespace: 'nuaw1tjql5hpv6lgozz4xy98otqdza7kpc6he4o2mhbagkqm3kuoa045nz9c6hvdmr72icrvxdkcd9lz2v4n0p1kbpa0pk1p9g1vknse6k5y8dj9sj8tkna2j44hggihxdxjptibt6j1ymi69ulczoihm4dzqyti',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'afrf37ph9ho0audlmnbi1k3qhoxal80ht8pe05jw',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'qy5q1ss3aam5x8yrcrklivjfe35iajh80nqh1dyhvhvr5c0df1',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'omo6kluwgvrconyq1kbw',
                party: '35zzf97oowu5vh8eanldsqkfcrztb4ihtoj4hop6lrexuga38jgdvwwvteiftt3tl2nta3wqgbb9wpgnan86dw58fxoc6y5kenvvyq979e0mh1gywle4w1jp56dr8lv0s0ufrum5u3vx9dj3pyh1egjfsxlgg9ug',
                component: null,
                name: 'ahmgz9f05wu35okasoiugsh33s27fcn1vze5wtqcwtpr26ohsnyact8qrlixn08n7yzvh0eo9i6mdsim3aeekc00iehsc8avygzyq5xcf6eqmc9owlzdk19vumt5wy1yph2tuoxzx61781zre49fmkb7bjylmct1',
                flowHash: 'en0kasduwgd61mbjo2z3s1q8xvbdk9mdr75j8iv1',
                flowParty: 'w08vhxgwz1v47rgp0biu19n12aw3edvslfwio3yeqojrxc8vhlkmw8gc98fqm7vk4k8o7juoj5nb8syagr8t48wdzfbzxicpfrsijiqugli2jstlhwze00cozr8s4wb6xnr0bm1g6vv9j13cg6t92c66d5ymikgp',
                flowReceiverParty: 'l0wg9qg6vywq46hsud6esia79tqhj5pt8eqij18cpgriwyh6t3fcv42gay3m4m9624iwdx39oje773vtnqcq93m4hak1n7gwenokkdt5bw3yypnc650vno8yxe2ppns63pfutzzc1c3xhbz72ezteczyum200f34',
                flowComponent: 'ukb6ooubop2r5j8a1vzwf7c76w0fv3ia2uss1rzhal7sfpd8ff812f2xi744i7jywupi50aaafceqaoyu35w5n28r33at6ge8rhry0qwcqxo37p4vzrsxhrkae023kcjr5hc4fw3g8ua2guza0pplaj23fw0nnco',
                flowReceiverComponent: 'xunk9gvth1p48dsruuoaa02zulpmul8ryltc3i29cpp1odxaaze8usvctzfd74bn0ucfkbmur2pdlsb9tniio8o4ehwzox1p3c3ja6bj611771lz22tgthsznrm75lwaw9jnji3ynwjivksbxvtsobaj831ddktr',
                flowInterfaceName: '08zq5djekbrvx2ixfo9uz53c79k9t9o573lcd3i33sii42tt7l77hk3cjzjvd4w7ipj2l8u09chhkkv27is4q8j41g3bey3out0ytd869gnpv99rn69e5cuk3kymahduogxt0aip97xb25sty999lqmhokc74ovu',
                flowInterfaceNamespace: 'fmx4050h88mgwek5mcq312wk2gxihm83gqajkmc7owajentxfw49yie22vn110ghz28cxrl3o1e7i602hcuaxikrgnzdsqc8u341tcytii68n8obtpsgolggccrecruziwkczdatpyyamvutomp1oatm4rwdse8z',
                version: '9urfy41057j2j3t0w1n1',
                adapterType: '9zduiqorw6dg0a2ni9137c74k9dlfq6ctxlton297g0kjy9hkkzn87fconb5',
                direction: 'RECEIVER',
                transportProtocol: 'jn3uqxaod3hwv975lgwcsntfqvvu9r9rk46slw6cxdw5ztu93ua2cjfld3dd',
                messageProtocol: 'qb5xm0lu7m2b1m7hky9h67h0puc0dpdy7hsq68oorr77yl6pmsy25o6zy3dy',
                adapterEngineName: 's6gwoie76d8ejmwf842x96zjenuflxcixwtm72kdz6ovu8kyxc0qjvly0ak0t3aqlp7q6ehpibff0gy0w1o6t7dntiry29lvmwjggkjmluuut3gze9blzumrdxacdljs0s180vjo2oku6js0u28lid20mxn2vb7n',
                url: '6t5fykry6499c2m5695nlpk9dbwbeay5ghdmohf9pp15svznpgceanpt5h4oa9breldig732swnsivwy7sukcm4535rm72nf3eaklw9a5r4vuuh8kamwkxgwmtpedz9pyg5d3663bduizeae4pdfcp9cfe7fgszija7cl8ake9apy73jevvxirc58h684dj46x8oac2rj543cl9cxwgyij4h12jctj761bsjaxsxwaates5c1k8liwzbb5pcmaiqp04kqbarp5w78oy74a8lkvrjhqncwl8ijuk5vke4rlizri12ydpiog7f9bgh554h',
                username: '3zx9aw7kwaazxam0kie4q4tvetor5vpqpzm3e3nmxsvig4axto84gh2uq72t',
                remoteHost: '1vk0s2xui0z35x1j7qrgnjmbs8m0n37ozo9by9wv8pfc0wo6szlfm2lg49q7yed1o7svs7qbgasbu1a79usrxbplpxxm1htsoghwlasijhemoswb43zwu9p54t2xpd49a61a45asv6y9fu6zm3k2jisr4tmfvd9h',
                remotePort: 2065338424,
                directory: 'mjjiwa9ab09me08hpumm13tmwnabfral98vi8n77jaujazogfp725nunkveo306mh6xqqz1oaed4qidzev51qvieofvbal22jndr0kas92eaeytb7w19e3x53ul8rlqb68kxgdslatj3ciujsief1cau227l3th1v1rj6jjsnro1kfqlgczkxaeh50ujk02ptx7jlsvjcd7ystz7ncmun963hklhc3pz1qad7q6c2ezwe8kfuh4irz4nr6315o9zbmx8tbzowtrbdeak09adbp3mxrrlq2e3a41v6f55pejx53vsqiz3nzqew3e3ckgyijiirg2o0agt2dyrjehizi4p3mwld3ec4vu9sc2ui13m4d1xdvlvzfyxnh59nfw8cm7txr4axqs9gcnqku41q6c7zc52hn378zjw70pd22t96u9qwyzqffj2f7sbxz0llvqvhxlvp1sktdto5lp8omyxjz2ltzx30y9s6nx70li6kc5xmml9xjgkh3xpyhq2t5d1onyvr3evu0aoat49rgboo8ne913u2kz3mwexa4w9i5eqkhqebut8a40r6gvxdgghp9pxelz03in9bcn5fnav2bzcnfvm9aevu9m3g37h6n5snnkjsrubh3s5x5ui8nfxdnaca4961o5toe291d1j181ia8i45mzltpkkqk8o0e5m0vrorm5qjbjsedfdslsja9sfc4fftw2v8vd6igadnaorgmgaib6ascp020avuygpshqlfjp0k0shdjduoddmj5w0zmxtqw27ceoto4kn9tx80m8f9db8gicktto35w13b2mwtfkt5s5bipqm520a5k5p6szdu85rsz9xwtpwpb48vhgdg23nqx3eq11h3gfgtk9ys4a61zg6u9tguxpoor7b482n9bq22i553ku11hg9bt45kz9544cldn92lgrgds3f5qjs4gzrqn4enp1fmosidewsdcsxmaz6bvzg65czovbx2rlf795b9z7ijhkpiaqcfko21zd16gkg',
                fileSchema: 'rp6p2m6ieufmm8xv94y7w0b3y07vc9yo0tp19hz4uug5wl0o1tgb5j28dui6cs8zdn9hj6gc8bjsvj79dibegkz2jo3seup2z3dij2534jmvgxzm0w96pzn1oe7m9uib8xznm1uefyqg1hll1mzs8t3x0s8pjiqge65wgjs66yuf8fip183yjs7u6d81lcdy5i5rbt0z5afk7c62g4r0esjvr801xrogfiysq5c6sr62l17hyfgwkruayd9k17bmbxymg3zprbd9ozer5ce6217dh2veben6sxty8s6pr1kcs35j4yqbb8umjar7l69hfnrfzuv3jcjqkirje8j1hud8qifw7bgm6zvenm0anc4vfhgp1rlytkives12qpduhhr6wnncsrolfa9kugr0czbgzuitmrxgul6lfm7zk1dpn00jqy8oejs1gm8r2q0tjnkc9xuhr8vom1ttjm3u35kea9ehzp59nwrgaitgomui6htubryjan8wstes6zach7pb38uze2velayemo546xmqo6ixazb26yts3gkxb3iiqydrsym9ozph6qbjawlcs9fipitm8j7tmphgicz03e9xwschx7uv23mp3ohdp5wle38auk4a26ps9mlxlv2jnonjsftzf9de6umjq9qwv0tqc5iu2eldirg3ct1jhi63l8p61vcoagbvxlg8reut9ht3rpzuscrdvyjnsnj5ns9rboqg9qcr7jznoqd5esi8d5nhjxkk8t8tniwylrzfol9eb9aiy1s3fw3ak6dd0n7t1oi1i5zczffsted0gocngnjxiursfgt37c58d1878cts1utorg05dssxyzexom47hdlcabdlontwj7trbwdnhex41nxjxwdlxi56xjf6ml35dyugjprferptj1z5d5akc448vff8b6me46q3jz6wc4erpm9sl6a15wd7ka7xompwafmgdswll6j2paimyo6ic4n7unn1eruikgc04ipvdi0i517ev1zqd8irzfk1',
                proxyHost: '6lfv3dfmq7pug3m3gh71zypj7f8l6bbgitbjm9czmo3mdydzrr64at5glyyd',
                proxyPort: 6849405827,
                destination: 'ribx5f09b9wzvqax9mkz4shhji7necxf8m97o81x4mjgnt5yl3ya2z0a27e8dm56m6qwunixbrln3t3spndylrf6q7l5ztotwx2cavnuejnn4tu1wr4al8te3a3nci6e68o3k6neue1lagbdgkr97z6fiq52spm2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '867vf71fpiznbe49a5cacyppm6h9wh874h3fhnuonx207ggwiertd9bf00w1zuok5evozlcvggi42uu3fq57qs9da55nkp68crfo4pcvuog6pd0wmitmx9822ej4kl0if0f3gq2dshwbrv5pf5demwqn6kc0bs1f',
                responsibleUserAccountName: 't3eavmm46holqo35dlb8',
                lastChangeUserAccount: '5sqno1n6t5ont59flxmc',
                lastChangedAt: '2020-11-04 16:29:46',
                riInterfaceName: '4lvoyjxz8wf10hn0xmuqac88sola9fugrlachzsqd8w2h0ow397uamwgn3e6o2wxpi9m2w5ldw2o1ghtcrwnei2mvol3dvkrc42kbidq0ow57m7hl9uwdtx6rj9qw11vxod3legn7uao9guackaytxwrd07v96yu',
                riInterfaceNamespace: 'qv3bqaf0p3sx8fgjxtu0hjsl1o2s4vyp83shgap8728d60mvdo9k3xmvixkfmx9hoxkttoiah0puskbkz8apfdk5l351bdl5k42yro2qxxrmtfr5314ptrl4l113u07h8t8f4tty012gjtr70q3dy8zm5i3e20c4',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'x0j4bqfucmf6f54ujlyzizxzw7oucoolddblu8iz',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'fap4p3qxy4t16v3dhzzkcqtq90vc5hg8jbx34zcdwf7ll95w5u',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'qj1d5cprtylc77l4zidm',
                party: '629n9pnckigd5op2tsrqwjj6kd81bilq9tuw1chgdsx5965odcghz208t5t32lfrkwim9kt3btcvogojgyhi1m2zylla9pteex49nmwm585t8vx7dfyuqprarkzk3tcvytavvhi5nkkf44xyndmvuz5bryrg6bfu',
                
                name: 'fg6zti82pnqzmucdzrtn3e34h2ir96lud8457v0axcp972lfu2veptwa6kmxk3m83lhxqtvsu2txizc2wmtc76e0ytq93ohvrfmdvnja9lodyyuza0ymvsjx33nu44xgzi0wpje0iw4fhbwzuq9lzugfllo5k50u',
                flowHash: 'gfobapvo49zowuo0y0cip9kbldcv3yit57duo9k8',
                flowParty: 'vx48hu2iv563ka78yeoprq09kqiuzhfl20u89jzydz959mbgs3wsgnc5bfa3aqmip4bkvcq2a8hs9axp7zfvb5mkj6ykc0fenz7r0fnuyqku5mtlqpkog6ypl48paf5c90n7khlca9groinmwpf2qau8qe7h8mfm',
                flowReceiverParty: 'd86xvkpwaxomfmzsto0kmuqm9cg2fx64fta4xe4zjjm0fnd6hum6m8vk6w1kd49hh6njpplgksoribq0grbmagws0ob2iwjsdo5q0tgq80mdgwieyua2xxuv9muqzst4ogjzcqx03cbdf4cdajyoxvy0673kd2pg',
                flowComponent: 'puyjs4audo7wa5310j36el7w4ea63zqnlh5l3ik6tbtawws4l9eusro5nlhalrb0kidhdetdi5yeo4h4pchtiuqbo2k9osnq80z7rxxuz0z11rkcg7ulc7hhgc1itx03b0deyn6qyuqre9k50q1wxvb3leb9rze8',
                flowReceiverComponent: 't5y45aiymbu8p1wy9mg4n4nb1p0vf8vjiu66ckfwuu6gfph1y6iw2br3p3hnd2kvwpa1l8nicqrwdr0nx9s9v7ugyk77ek8jheugwok68qpawqlqe28zrr1gml4lihymol9b58fj5x5tbvk66op7lk59esv1xzm1',
                flowInterfaceName: 'svk13cd5vd2twc5vq64knnlzpgnye9s8s5iow2dkd0xyxvldo8o71v4srtc43f8bujdwsxcnn69v373qhh1ruvlv5bmouq6g323mn36ho85ugmvciylcgpbi30k81sku6wyxtem083i71jxe63rwyxvlukbdy4a2',
                flowInterfaceNamespace: 'j0b9zilsr96svimdjz9yhbwn01uc3h3gkref0y9qmc6g815c78eyu4c138tgjgy5o8bv9cn70s6fdvu71fs6z8zafs8w9n0gn9mkqi8580kj5txx76ofwthww22nk7wctklnxrwaa6me3zllywvq4350ssmpiwvc',
                version: 'xfk4ihfdmoeoaur73ky4',
                adapterType: 'yyssslq6bu5l5k8wp3by9zlgb0x4q77c9git7gh1cdorfrtr8vypm2l7lhpl',
                direction: 'RECEIVER',
                transportProtocol: '2cl3dw6c4lcyra6mqcbqw1opc9hscg71auf1m3k1anjkscb43uyndi9rq4dr',
                messageProtocol: 'ttdo2fzne7t5qwd8l0waiabv8ha7d8s5dd947f8r9co3q8j4cpzrh9f2i035',
                adapterEngineName: 'rgv73e7dx01njyo0pyc085j0qyx24dery9t7cf1paljklvvqvrey8r27upemukawxrje5daudsif2zxbv7fbail2mm9sofviqdpi1fx7k6ycmtu30d78clxkar3gujt4g66pdgnjkbt7b4zw088hfxc1m7hkf78x',
                url: 'ueuzm1rqwuuev803aalmoj7jt3y0vd0938xsdq5mkyp58vx9ycr6lw98zvmgvkuo7pl1tlib64mi6hsuc356abuwq5h1ftvl5rkzweud7b5hxsgvlw8k0t5nrjagi55s9t00hwlx9j2quomlitz4r05ed77rkx6rkguq1pkynlq0s7pqaeyf70qmo1uwi2uuriamppw635a9umo16jdmv4mr7zlz9ihc1eicsi0kcddhhvcls6y9706b83nhazs35tu9r9sdbip25w18r8nd98s6tu8l5855nrn7k16mb07ze6ij6j8ac68imz9zxash',
                username: 'tgy3ijfkg6gy07g0cjdqlrdmdmwqte2uc1mt7ggqbd9pfesgxphoxkjhmbfw',
                remoteHost: 'dzj1pwnxq8f58j5h6m5jhllurbzig08y9q2lzjrphb5p0r87wyq84jx4m0zzamzw2ql4y0inevpnve0xbrh81h0f35zhmac12618szxvc9nzi9vlvcvtiwyjz4erumzarfguta7t7yzv06q2oekvl3yt0zv7ziff',
                remotePort: 1589099424,
                directory: '0l1gg7tc7dp0nm47gv3sp7iqlvzl2v6gnseqc0lfkq433e35hms9u9b7kdc9c768ty03hh16gm0f4kgx0z4yxf8yq3w701b3ihfo9v6sbun4gesqmrigeokauozbuizb6rn2ysgaj0i1dx8prnq0ooa1phg0wz2ljq8i9a03lt7tw23sg59l08ckpzglx1yip5od6437p39ih1ps57cmayc7fbhqet1cqpjsywpcwyi5ac187z9rvxzjuu4zuq0j1pgdvstj3wxy6mw7s0rckerk9vlzkpwlrfx30vbeg7dffbbksels99rimcgve0g9u6h0tb4727kkl81q0mtaz1qlcd5tjw2gui8gbjcpw4u756d3g5enp5apeu3tfxykyzyzwcbj2c93aog52hmd5ckmpcz88pia7meyqhpdant54hccr81bibppfs5lypv7al1pvfslzgb3vbkhd4kpclr2qax8el5q26srvmt0v2wmzsd2o0nz2qzpus38uenv077kzzr0r7x8aggq46oqp9ti0s5geo2hhoyhk7cxe02cnvjklv132s6ftzbkgrhksngomfm9bmlwlw9swjkuodo1is0i2oyh5z7ckdxgicpmd2365iug2m8fjamtdrop6z7ocsr6sza9fqxfwcg967bv458lr7lc2nqjwhtkgd20l665gx5rgjv7dtoguwa5lfsuz65pbp7ofy6wp8v3d9t9nkt7mqdgn88lm959c2kinj0dp0sgiio3od0trjn47xziegftu9lbug1sikj1659ouviikjkvcx8sib4vjl23dt1o1td7vl2gfwnrgnl9aiqtjlen3pf3h2jnupm8vh88j1jxztdxtu5zjnz49h1dpw9o6g7xckjph9jtdkuu6wsz0qa02wvgxakoamzu0hg672orjssyzlg4wkj60k9u0fnw1gu03qxfj7tctgdbndyn5v22upf3bofbl7dqhmvhmngq9pbys1m51pe9pzc2y8lmcvbg6492n1csfta6',
                fileSchema: '1fspr9k6i0mwm9l3gi5a67irlst2mql436pga3g1l0qg0nij8p5iah2oz5qdd3v381r4v96zyorrwxo5gbj2i4e456m6kh1uc8sihmxttfrsuj474tt1p916tfzfv0ysa5s4hcf885wyz5rlx1znut50xsmxpl6fyjclpfvmaom93ah73i20sz0w2ztq7972qs2qqht2sh95jc2sc2qc0a14da1lwz8w4f27j0d06qbqymm5t6dzcwyiysb0uit68pej1bxyozmbhwf997z8vil9l2jc6uq16ddwe3iuvz9w6vnggawffs6gao1hq8qrs3s2y308hdko5ev9bdibsh8vk103e0y0h8xnbfr8udkuja5kc2ssqiijf3tfpf1ws0oal463bqxj7is4vs8hvojkff4uls123fvz3wdxa7x73a3kltefpqms0ib2qk5vjec0meishlzk4puu6n1dojcb2hk62tvbvzr8dl5gdctfvwgmpa8m0f9eyo1b15lcor92hu95w3hmeavw3ctrhpis5mto6rtimrhbhol58c9ep293usope0ao4119euy3jx988p2h49wfd6y4ojuzt41th2g0v2oipz5mhjhfvdo1w1kk1du6ubfit8k3cwe91uxaow4qvechyo9r1p54y56jalr5x5c078naskw3z2h4gfxt4e21yal7as97uogzzfyxsrjfkw8zkdr55wraqnpbex1x6sb40iq7jkc58ogwrakj0ur9ub3gs02xkqk0mq7a1eydpt59pfvhtt65im1tjz3q6jehsdotao6cgc68rqlrhrsppxvv7nalqo486pzpgdladg2y2bs4syf4776p0y1p7v3qbohd400schxk31lkyhovknla5belg2avhfzipggy6rc9j4zdt609mr21bcpms2e3t8wonjyjgxx4qsgkrpi0f6ecdpaqmywq38usmokw9fxqmhexklqkg07td8adcm6puyv8lzhc8wvo9jzr93qks6crs40s4k63',
                proxyHost: '98l2twyizwofkt6p2mndcdwq60f1w50rj7kke86gyx8yauqljmeo4u6ao1b0',
                proxyPort: 6471371872,
                destination: 'c582vlzvtgl6p8s30y6a9gqt2fo7wrse0wcxe83qnxjk72opr5zrl3zz11fbmulfntxmjbpqce1f9njlylijxf6duvlg84twifh5lisus2b0euazyauu4w2wezmoy3mm0ktv4rrotorrwiip226mq1i05lsjqp4r',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bcj38hwe3mwckhfc1y30li0ybp21qft28igv29kyg7bxtqhjdme2j90gpk8j6ukrtm1xdfiplxksx0cb222wvy1xu2iwjxka0g6qfbe34rkfb1bj0cyhcg11d9hbj33z5fmmxvas69pgvcaqluxnc0m9m9tvwvbz',
                responsibleUserAccountName: 'rzhj2e5rich7ctiyop95',
                lastChangeUserAccount: '5zoicf26328fn92iu7tg',
                lastChangedAt: '2020-11-04 08:06:02',
                riInterfaceName: 'y0c8fk256doz023xm96pyb0enbcglc3qoi5y1evihkjtweya1ecoxtwudrtglfb9j854tnwtfdazdkrb7lenh5f0n7jk66qkv5znqrnstl2u4dsu6676aoq4o0htkvvj47fdppio2ilwyh737ya2e0i8w7l60ox2',
                riInterfaceNamespace: 'c7de5a0p42bajx6i0f21njexqj4p88uqzp8ytqtyar35ikbpwu6ff4gpxueh0z01nu07wpwrsmjt2pi6qf8ygoj17riug514r48h0kdz3avqg8cvqksio79usbc97f6ghryxzejtpnt2v75y6iyhetx10s3fj8yq',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '3s1wyh1126aiqzov1ywkmi2cvkvc8rqxpecuvc9c',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'zypls0kowc80brjaw853mh6ib8bofbcu7z8lasvyhtcvuxiaq0',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'rqif3dpkhrcbmcjh3tv1',
                party: 't88nw9ddzroy9fh5rndt8qpkuylgxxr5wr4hc99eg9k5jljrbdyyugk9kcpf7f2bt3ccn47e8ntmrbrn59ixtqwab8bcixpwqia2r47pxylwyo0ndkamx34oebadddg4qxk7ipirbvy3s4kn0dbntkd7dost30pj',
                component: 'pv6mijfyhbuyjq5hrg4yg0bgtr1sosejhlbo2bdfphfn7hfg13mdzgik27nq1v6gy7xxc2dsfo552gybyz57wybnexi96bdywebne2wmt5809n5fnl4t5jfs69j0rellovr79te03srvenvf2nnoyhec1p6j8uj5',
                name: null,
                flowHash: 'uzzpacz0zz3sor92goa9k2zgungbvqbu4u3wg4j2',
                flowParty: 'iv1ydbtoqa1dtlhvxtfv7q6pje4878mow94emqt4e7uem1k64soh578shjjryuc2yug8iam86uog4q991n75nple3k7ly5l6m8au2mby66kfi8axc7kvmu5uhmv51489a05c1y59z1vskugr0f31abh91x0b9plf',
                flowReceiverParty: '94fp4a4f9m1bpwx3aeu1xc70i7i4bq5q3g4cyzw9shua9y7cqukwl1v4z48o5q8ccktufk1bfpxuem72trrs9958kmd4kc2gactnleybncdrijihv42xrw3fkmq6yljq4svbu60t3258j1zk7ewvhe2n2h6f5mo8',
                flowComponent: 'fjqer2bzxhpdf43j4vuen77rsk130crsobsvdor2m6shg9psa3jgv6q7b1a6bi9aqo32fe7c50vli8h83mvsp8xmabnrrblh1z3pj05yzi0gwldfinvpi4ecovgtyo2wqmi5p5mqogygh2td9epjyzk3gfytbl3i',
                flowReceiverComponent: 'k1dzz7v79w2uwroqwnfvwu68yq5vdjfijwa0y4q75zeilbkw6j97oj8lib75ekfv4c0kurti9xe9kdiohgeyd5yd8pfhn6cahiyfk4zy83mvyroxz6i0y0a8nhnnm2h1wqpw34o368eparnrnv1a4oef61ff0zmi',
                flowInterfaceName: 'iv53jeau0ssikvmsq0b4yd2pe5dugscxr3jza18q5denowkfb97k3tz5ii33yk9pcsbtvyfaa9r7558x9tvmc1cwxfyisgm08zs9ld3myokv0xdfz2r19rl95jfitgv91cpp4mcioylcovb9uwvkrv3f5aklt1zj',
                flowInterfaceNamespace: 'p61fzd4rrlvqwva42yd36n969s0qpnkgnibf9mgu899cego6wsjntp2ea5frwh4pt1biqnwo6i9xkshxidm86cmy3c9pa1kkgnnoo9g3jsyi6gfjodi1o4kcwjiua9nghzosxbmf5pi8v7792l4aa8fuy5d88fl8',
                version: 'lblqsj07ysjwhnwd0o93',
                adapterType: 'somynrr3x3r8rk8d4c8r91tedux59k9ntkby6ebmor1nytwz5jjp6cwpmt70',
                direction: 'SENDER',
                transportProtocol: 'wiktqqgwcxa7k2we285qb53xbilh6aqd2xe8vr6ob2tzmqwlgosfpf5m4sxq',
                messageProtocol: 'fjhtehgf7g6va2jv44zjrkop83cl98dbob4u47yrod5pwzepp5qhl97zmpor',
                adapterEngineName: 'f073hjriq4t962nci37kcha3hdfjgajcbeutr6jjzoukeqyk5e4k59xs3ysenlio8ag63ad7t9nuo7ido8r0k4nq88lnp6qddii2jcnacttoqxxl49x40wj01ek4edw0enk517wwcp0xrh1pol3cryvmyu10z00k',
                url: 'zx1pnu3o1f26m9ug1k2aqycvh6qgnf1su5weuar68xnv63ewot2m2vun1v07o95g7558qgi3ej8iottgojhg5xwg3eiksmhw5x4xhwv8eteo2z832w0ja6vbu7p4geseoxe3u4k9tgxidpdsiqseb4fn0r4ijncf84wsbqew8jvq35l9bqdj22yc6vk7y17xit299r6tmyw9qzsq0roo52na51q3wiiih4m9y6z0ow33m2aec3gh087p8xrdtxl5vv6pw4kaae6bibc4fga3p0x57qamwkyrgbmc842k5au17wt1dy400r0rjoi6mpeu',
                username: 'mpdruzj41zsvidwvrlxk7i9eul49jwu9bpriedlhykugsedi6si4rj202yli',
                remoteHost: '34m0uxoz9pfszjkigpzdvs4a570fiestx1fepr7vn0x84mvmz5tp0xkdegzwmsyvivja74z9geuklvppfv1w2n6rol49tfjjgybh2zwo0m9qsjiit4144149qsyhkaomrbnim9f2vuc3psbfs27kvhk3xa721d23',
                remotePort: 2270526837,
                directory: 'q8t7pe8vg0i9fti94f2w2j7bvu9duebgsb7h0gjbczmk4y5p0e0s21d4hk8i46hmqnh32s5iyqhj1o82who2d0fpity9aikggw4umnmwygkkc1938x6hxmwvo798nvj1qxnghp264bcjl9qgyn5ir2oszbbwq90gzs0tmuzb9o9xz9v3yyjx5lfjzn2ms1at0yrojb00e5fjoybg4zdc6bthfkecxvtvmqph3n7ueii7jsuoymiiel8qhod7u9ri7awi9a4epyj3uwgl5r85nknipvsxsv8ewm0m66zx4iaoyf2wis0p9pd148w0emndiow81g9vks73x5f2ldnq4ejqsuf40pz7px3c2o12y5xamqlrdvzp74a991kv66myglavbb8658l5fl3dyx57wi9k40d6hliyq3dv9y4gdzz6ru0ji6u3hwupnejc235jaqlm52spwfmejfbm3ut3hqb8ppprk3hbwqmfmglzrskrg775ryfekfhxeuycbqx7a211yeeeeix9xotjt4yoonbk53bw9kj2vatflsh60yl7avzp8lvf2pl8fnurj8pp9tg8xwp8gb7xwnw9o3ak47dac2p0bqjrwt3jaopvqtub2red9rtzxe8961rqo3ijuxej94esxh0rk0fmp5t5zl9wfphpyxxwih1c4zb82hae9lat7etp8qy198ffgumn8d22ntri1zs49o0ij8l140c6a0h5hfvw0n9xgunw68vfuf57ta2gtarg9y2ctxvgpo1ipyuq6fgbd46l9sie1sd58qfar603nnladg8h1kp68wfxny8zauzles9y4zseanpg398ry7q4ikaomu0p4cn58ovppmlurmlkvit7p14gelsztp1gdvz3l97j01rcqde55wfj8d47nsl7hykplvs3aehdqg101m6h0mj0deml8dchjq78b5lsrw0547abzvur4gdu1bwfemdqjeeqql3v77rgervha6izsbegx9p6lxqbr9j4qdnn7ey6c5yd',
                fileSchema: 'mew950s286nn1eyolndjg5rhs0777exqzet326ziapqjqj8y8ir9cjjp4hfnd1037eidpts9qci29gs11v4l47m5k4alaxa45j1ds5tmyt8yn3gjtp6z9sj9q9wbbioldctquwkci4lipy3za6u9a4ex4snt57s9ftmvc2jrcknia82rx69f5cp2hckmqin8jam6dohz1wucdm0t4z2po2di6ln04j84fc4l3kwuv34a53cw8kxcyvm2tk6pwwk5z7jh1yf9vezj9bjs9cbm9gwp2vbir3l1gihjuqca37a0riw2xw4wtv4oe1ukak95ex93ffp9oub9tqmz4s3mlxsep4tu9psemjsblgarbtwricnab4r5z540bs7xribqcntq3716454rn4wzitpmv4rd0khi3l67gutufcb78dv7a9oyp0kpz1xnw3kj12zdxps96adpr2tctst1r1zyolgr40wzt6f33bdxvdqxhwuh9ix81hjwxisopasmsnu57r6xr9z65wl5ukyva1438xth2un0cd57o69zurjlcos4ghz7g2olv8ehys01l1gax9sh647igrtehfhrerrdpdo2z4taqcb7k7zfaz547zxwitg0wkeuxfo9cvpqaxx0abpbyb40x4rhrgqk0540zlqzvaarvygt0n9y3xkew9z0hbtvr1jvwq9rqa937m7fq2wa9bldk5ejfmcag4doetmfrh8uxk1feyrttxba4l6jpw6b1tv2qlbm2az4wu124o26iqh8i34e8baohsnb41tjr3wsevpaasefhvpgtpu7xllch34xn8p7i37dtm32245m7olkkm02sx6lndfchcwx6ahc9ywvtso4lcyiowx2k6ciaka4pnpuqrxj9l3qdaocn0xmmxvstvlqul9ifiz3b64upplaypo31po2r8vxcekhy1bcsnoqwkrnk94ic4xwuvjdjv20k2z40wcionxbeeqnvprbglwtfnm2h24g57drjf23zsx0yynvw11r',
                proxyHost: 'iy0goia2ssj5j2ioaujbk4r5eocm38giuf3ci01bea7xdo1ec87ptpctvct2',
                proxyPort: 5484538635,
                destination: 'rkjuobuziecosalbz9eld3jtkufx64gn3ctu3tag81jy2illxvyzabsj21d4o14a6v6axxpim0jjkp7ybvpi70s5syv6wyru3p2oheqkslu92t54pvh9w9k4c6j3w91r0phier7riovc287v4hm4c5glsvrgs1vv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ithzrz4719n1f3zjupvtt4js4kjqepjlv9el8i53sutka8wcdli0cnbldjz04mp268rjr7hm6jubpkdkfzeizd4b3p2nhucs2qgdxb6sio4pev7jakshpl77n65j3rcafgldulq6fyu3mfi9qw3ibxdwn7gyg1jx',
                responsibleUserAccountName: '2d675harhrmhi00yaeqx',
                lastChangeUserAccount: '70uq60hbjydpotumvfu2',
                lastChangedAt: '2020-11-04 13:23:03',
                riInterfaceName: 'tz6q0hf327pcng96oz1w5nx3xxg56x6xbvql97sv2xdhtcsxrvwoqld5xm3om94ul14ryosdlmxf8313hod3bb0x5zu107z0x54aflwvzvnz0wxok35nl1vj0lxbjrzjkotiv3mkee1ww4a4jgtaya9w65hu2zzx',
                riInterfaceNamespace: 'nc1tevabejt40qlscd3bv6mk0sb7r9ei0uv3694fa5o0jx0qzxbq2u4ybhbqt4qk20cpxmz1wc4orn5yisbsreiabgmdu71l12qmec4iiypno9t9xe80o2nv22bg4fr92nd3hksykdacj07t84vs6qdoq49byg3a',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'p6k3e6h1m9br5tv095kwap4o10096s9qloy0cbj5',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'lnnhpobwmfmutbgztngecgfdr5vhw9z6gl7vh256ynwug1fm9r',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'g0zxszx8477ms39n8s7a',
                party: '2gvt71tt2tv8f71z8lpzvhjsbotilckmhsftlsfnmn76hyhfd6ft9h600yd88xbu5xb70rt2o1qneq65hewooq4opptm5fpjohg1ktv1p897macnxil5ccov1tykvjaydrc2wz7b294sjjxfwlj4qwiaslx43qaz',
                component: '87cisvpzowi0zwk3tba1vfi46bia2wjtn9fjk9lej1y6953bqy2x945rbtresuup4fn49s5bbf2sj7x6ll7wv15mkgek5e7dc0sftvozsa0g7c4n0dmycq767xmctz2c2jrhgnkluv1zsey8sp6pgzr4keqb7a1q',
                
                flowHash: 'x9tozph0nsbz05bju39p9exnss0213o3pfi713t3',
                flowParty: '9df7subrtg5vgh4ky8cn74gnvh9oi8ab0a0pdni1010aoc8gd6fkla2q7btx1eio3ub6ggzexamwjzdcc92tmdnomoq6lioxmz3ei42yx7x4sooqzy2syi65do67cwflh1n5jmowrtmybdrhx10h6zu99wh2qli7',
                flowReceiverParty: '93pmhhooc77zfxgnuaeu2zpzaeyetmnx9zjxj75evgetndzp2la5ftjj0dmijk5huhwh74hwrmarj6w39hwrnziu4ruifazt1j0eayvbzxlbi2gps6rw25gmbrrmcdc9p9n55egk3u2pe36gunwtt1lom5tny266',
                flowComponent: 'r6j4beixuj2mjkpf8evguxr99fb7oyxrqucb0xdle4rkbgkxeoha129zrsoqv4f6bsdbti1raw2umxvz4i6w3zvvew1p367motxti7qztxnenk0s8lj11evxp8h87ughmqgn64q0l59mepoem5ug0f6ujfoow8jn',
                flowReceiverComponent: '6lclglyy1ltjic2apas7cwp5mrf4h4tuuhzaz54egj2w75wonyuqwhb2e7yp05m610b4ga2zfly9s7urnj54o191pej4mnva5mt5xyg1772giggxlnbx923kk7kxqsad9z21zy5bgcnmbnq6twaraxa1a0507hch',
                flowInterfaceName: 'gsd8jpz3htrclst8s6vomllspfh0ov3w1fmbvrperd7a87cmx2ap7kxfdlphfrisxfjmnwjecnpkj2wuc4gtqnr5r2vt9j57ovmvrpdptpg4fqtkhsnt6x4u81dw9ujj2fy3xdu8j0ohvps080x77zol5gas7j5z',
                flowInterfaceNamespace: 'yu51g1nu8hxsirzrpll0iup566602j57g9a0w7s3yso1x4twsdvbl0k39zkxg3j4u9q3cfxtc7r8b2ur5qunqa351hgtt00dev8qytuxq7wh0kd9tiv8g9x0o6vn2ollgqildfyyfyf0u4azfemu53ienfg50vp1',
                version: '654e0zbixdirgp8us844',
                adapterType: 'h200zr1xnwn6fhfqd403bd9cgut5vglc1vhy3chovtr5kn3i99vhx96k8gem',
                direction: 'RECEIVER',
                transportProtocol: 'lasd5igjy6ubumswdc26e7kxn8wuwc6ut93ltaz7n9ap614akbnlz7a337d8',
                messageProtocol: '67cmskywjvc0brnlwu96f5svlx3isqs8yryqmabvzmize3rbd34ng3zpdjbp',
                adapterEngineName: 'i4rq4oog0ej349mqcxi8qh59pz3hj57c542vezkrjj7zw4h5fmozkccm2meqy0skiaq0z4rbv90a6yxi7ezy3vy8zl2lll32xuu3fojdd6xbt8qe9j42x6xfoejt5dj0ldktfpxq9f7s8o4duqu7qye6e8t6b21c',
                url: 'yu3pj67fd3eqorlr51pex83zoc3j6x0wyjz8k5yj61ct5n90z4jv9c4lozryygn2dmru3xin49okhhoumlzpql4nvkc1bafeujohwdnrmfv9slniayd0wuhgaq79ocga7kvm5zfn3tera9vusfet12h6g67055pksc3olbm5t2biw5y9rvbv0zsk3vu8dq4vgovg2dpxibc1r2ntfs0ringpenun6c17yg7dn6p590tnmmxridb8d0qjduaxippjh2b5elpcvc7stnupxjcfrklv7p9p74491vtqvvsxyndmtlkuh02hze3j6px0ew09',
                username: 'urabm2snkdbr5xd0igxo7n1630gg9wpnrb2b6j9eqmuxovt5phr7yok2n9q8',
                remoteHost: 'gnleovo4phhu90iqpp1xppl3i920eqaxqryoijfh39ks0simxi32wubqpq0e1j6kt6uqt3ia9bzqciwwfi22wwnuig9ctd1jw3xvqzcoxvqovja7bzlsbr44rv1y0b9qe80dq4heo9rbho2g55s55v70c5e9igz0',
                remotePort: 2854049247,
                directory: '1ake6t5383aqmgptmz106zvgklv20d5mnrfezt0yw9w8o1s7brqyd03wnf98u3kqobyspnhzxuo76dqhbkg27afxmx8nf7rbom5t0kosyczg7dmbobs70hekjk7fl1m6stroxixy3teitzl6ukutxgteyzgw9xwj8s94u1uu91pl3ix7ci76mwpq0h4kwehoiienmbtyvafdz1r774dwsax6ppwpg4tusgr8jqt0ik26fc9robz7g2wh8cmckjj4y91s59g76p2q0ymajl2jrvss4i8rtj22dq1ymjwsbrriimjqnbc50j3dldh6io6q7gc41b3ghusgznrrooud0tmmqul6c9tfo1leu752lvwju0bc5etwjmvqfcv879zko0aw6b5ttvdxefur584rmbzqjnp2gcnzlre7v5xpmkujrtvbcylu5ryoczo8ptha5v0nk480zfushejanh50ks2dcf60oxxsgsufk87wn8yziqrdflksgg65mr448bbug805e1f5hlpzlfm03qh5sx4b7tzfimx9cjvdu33tpqtn7f3cvp2rmibweboftbpot8vcbor99kqri5uuv94wjn0sje2e888yohrnkwktyzbx9yf20qw6kjezbwg3s8trwhdw2irhy1854myqt9v24iahsx4kd7fq0k2zj78c27x857bbkwu1lmmpsgo9zy40ab9rureuoielpdy9e0zdcq4hffmgqp7nzzx1994e8yktd71u3n2aerdftjv60blmvb85py2d5rb7u2z0yrvc1s97yhz10dof87achu00wiv0cqrh00iqy8v4xdfqrd9szzd26nh9ttqa3n22q69sn8oksg8fvadyak330s91fosd1l12evjmdd8qq18sc64gap7ool537hppqi9lys3k1w7g5wirozpc0qss8r25rf9s1yc637kw8w4sajvaemv2pyjrgynszr8cghcmhuj3ny1aylty8z4c4clyu315itbshsscn5554bb5ndegh4wk',
                fileSchema: 'ho92xj9lw0gqmcbf8b46mfns01ua8pclhn9wsi1q8tdpr4dttgb5upc3nqptyx0qul48gnxcqpsejqqldm1uas1tws2c5r4tyxqabrruc8r503nv4n0fnnno6c31t9g695wcjbd5b9zepv1jwwlqzjrbdmhxfwlf25oohswp8i4wcb9m8x4a5k5tc9obryxp25qflhuw2j9q7wqz8aodivtp0raz4ziw5msr1kgt3yb9gwtcm32i4z8myop33xogzop0u46t8xj606xo2xpbsai7ie8178esk2xpgc6jvz7luj161qhd85knlbjb9ubn9mffw2db0ppo1bdo770vfr2h1ver9ic8dmp4tjgt9nhy38h6afqiznxxruxgoozfz3xaxwrx394f34ktw2qn2szemcbkpggrl80lbzs50tkdfyfdn0gsidslrapezghr1ksqzcu3h6nbr3q3wdqgq0b115lgb7uv83ltvdxag6t6tubpzcybzn9posb633xtyen9q5ea7bi18cj1utu34vqy2k7kwzvpgjp6ibz78qiiw97gdsnbr3tudmq44sw7q3r7oggbp5llkf5yd69ckmfc1yyc4rrgspjrf6ua4c9zbbmlfani60zv7nsose8q2kegnlyzi5jx542hjg6sm2v25lkvtnkuzxy56uz8anig7fgf47bsip9hi33nxvom4pejwa0eo2ig9t72gtfwh9lkya3uqij9x3kfbyphk0utew50c4r4uylc58syakird3a327pr02ka2h7qxbtagvf3msvweu6sx9fkqed2uybdoghjzakqvf5tcdb935r1j8xuhcp2i25aulis5hor6fxr03n0x5prxzx7xkhgzjn7wjv39x151ynzkazmzewftad6o817dptvjqq9fnsbn3f5je9fwq33r207mnqaw1tz3lkz619hudju23k434a1e5k7v7snpw2mxyi498vnrzlrpfh2b269yjzpidc4j0q8ndi485nvh6xklkonhbr2',
                proxyHost: 's5ojwo50ore7dy28l3expbdupxloo6vx52du0lqfl86dg2zq9c742ydd39jd',
                proxyPort: 9266708131,
                destination: 'c949d4e6q2gsjqe6qeqzss7cr5us15fyf1domtrl5pzky0k5a9zwaj903wz5c948twyrk763y4ssproqdp9zh2mkv4j2z3lkruaiam7jaelrw19h0sb6ecdns97lb75otzf0dhm0bqwdefjfiao2k5uue4zgt7vx',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4j9yn2op1sskx3pcb93f76z7og9z9cbuqqmflsqhqly928cm1fbz1c5ydjy1mbd04mmh1ea7efumkit6ayds8p5q1g8vbs4pmul842200enp8xczt588r2h2kydyl0e9eux6ovefycm1e0yc88ob82y98ix1536y',
                responsibleUserAccountName: 'g64ec3ndsmvpkh7cmhej',
                lastChangeUserAccount: '9hr93x38voe4t43yp8oe',
                lastChangedAt: '2020-11-04 07:31:01',
                riInterfaceName: 'wbqjzo6gmnwnl9oy06kh2x37ckaa5ykoq8tqwnjtjxpmxdvvv219rsyatw5wtvd1k98iw2yglfikcovh5amoixgmon8nra7820rygk87g286ss2syezvz3thqg9sla1bilc3ru1ck2w5v5kz35f3hits3t30hp93',
                riInterfaceNamespace: 'ubpaw93mk80ngorbacjkpsvge5rudtx8ucerpjwgwth16q6fg4px0ep3spqmk4ke533zhs13s8iuripsknjgchps2rfk23b6jjnjy5zv6jwx8nmtnz1wdhbvysy1in480u1gc5h82gy7rvja6gju5kv8rqqjiw6d',
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
                id: 'sgbn2rwjbcuh5pxladgvft34ayhknkqp4sf2p',
                hash: 'oed5zf20olbjotry0guz5f0zmphij17ikl790r8m',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'qk6pr8cvqryysdqxfo4uvip9egkrn1c2zcw5iyhezz714ekknx',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'qy76guixlzorhuk6vrsy',
                party: 'dx4zjkpmsb6x2gvdkbt1hxz0i4olbl9b5f8fljlq5iwh0v5tb74kpcdrol4p2md62lxnqekbid81drrqknb1elyql84nz56cp52albc7747rszybx4az2vpwzj2w37d4535dx9t811h5odhfiwgy7uezuvlqcsym',
                component: 'luo0svbyr5hli4j5q73nnci07s6vbt4s7g0xsv61t8finohgoqyzlv2x1oi3fm9f9djlupzv30a9q50do4v31rivuxzj4d23i5d9zncs7ztipr6jg8n7v7mdq9vbg6nxe3blxmr88ptnzvjeog1f2ub1aa7g9k9v',
                name: 'b07yx3ndx431nwyzxuc93w2ayeld6tsod6htbbmrcjtv88dnxk1dkhsy9ypceuuv1dptglowc31t62rx1dyoyfv9kufz3x0lf9ej0kb8roj8lngskwavyqerdy7g06bnqt6wffsx2dfqhpth11geo3v7kpsr8urg',
                flowHash: 'hagqw4smgsthgzmyw0j95b6ynozzlooo0k77sxfa',
                flowParty: 'qd5n2mcypczjmyffymjp9xx7q1b3p3t71vbwbdy2gqqrbxp9yh7uij1y7eqnpv15dvui3g7obtbfal6p8vv3qyp0d0d0ffxl1nmp8ytmcea8ry8xbuq6dhc5mzu3456vgqwkr4172vpr5sz76tggx46e37u622lm',
                flowReceiverParty: 'yyrkn13crmnauladsqycp602nfcs62byej90pfjs9age0sct1uvjpicq0o61dcutly75aq3chjbyu6693m9da5triaa23cvpvmh6dojulkjhrhrtz3eza78l57as9lss6tzc2cujxgb4xbxgiopg5rj356muz44p',
                flowComponent: '1xug7ziypoisswzab6ozzu02o999ea7lgzp5vw1b51exl8q8inilxmqi0ntgf4abj5ajnhv0jgsg2syzi020qwfw6wjswqzwrmu0scfyu8927gtw6nymgk2nokq5jatg6y1en2vsb8a1ucxx0nfoqvcizbcgd6l6',
                flowReceiverComponent: '6uuirmw2jllwwxp5gwsf5amonisynab85w250cvyk5eoklej9ot3ev4od2hmg6lsc5zhoz1hj67dh8a147z5lttw7qbk8kf96lrjds9pnb4ui6af2zrd7zern7nc3c1vxsjmxa4ygquiacv0np1ozlbb553ejz56',
                flowInterfaceName: 'qu08f1y9dftf4zkbl8ht12xxujfuza3r6jujdyy9i9rggh6c8c0i0p98fvetrj3yxxs7u916458yl728poxmfoy9gdvlxwv1vns8xo3tzk5f26pgtgkk4labqx25iuijdmzrwxcxx8e4hpgt5w5vxfizrcfch4k1',
                flowInterfaceNamespace: 'vfplu90n0fb15tl3398mrih8yavq1nwin22ttms521y8vvfczft170ozv7qonv80l90xumcpswu5l817cf1mugi7q8qmhjl0wvpkw5nhuai2npr4uqfy0jrpt0fahtsfk72ju8acul49il1ddpi3o640sohrbfi0',
                version: 'dg1qg9qnsttxnm6n4xhv',
                adapterType: 'pn8v4ihesd3t6r67bsjj4hrao4ojqe593hf94g2frlpebe85ryh63vzbou4z',
                direction: 'SENDER',
                transportProtocol: '5hnt7pvbyonkqceg8hs7075ytegfziigec7k23t7zlctrcxa1x0q8vxkae7m',
                messageProtocol: '7uypdxxb38dw6j6askjxlgl0sy3ku490hju2o1kz8eu9opjudwoednh1dnpw',
                adapterEngineName: 'mvu14h1v2rl399vr2ut4ifqlu2uogrskn2bh2uyb20jleci8c6cb01pk0lmpptmf5amtw0yi31tjmqfo66d4xdqsj74tyv1nimpty7n7ttzdinxnp5wodrptl4dajlqkyy1w45jmj3aa5pgbix2pqr5ae2adqva0',
                url: 'cm26sfknahkf95notb5stl0i11dfnpopw5ut4n6tpfb5vdgpnpohzeur9j3ztw2969awdvwpuau26n2y3n45i0se12rpmsvnpo6giscvvgtb6npor6ksc642yzy593pf3qeh0cdsqta77m0oz21g2h5stzzpn02vxq7smi7tvrnzgsx91x9hwdxc4rfcvn4rrgymtwyx01wnoldtmvhxetbhkn7llpz62ihkpl39mgzohmul4p39wvswixy0604rpc2prwte2ruevkrvwt0gg0p48hbe13gg0do5ko5i1rysm6x417q783bu7mi55alk',
                username: '8s73phw4jzpy4hhl7m9o4ht96jzspmx6qg0mtqouu5npgascf310rvf1fs4w',
                remoteHost: '3u2vftpcpej51e8e2eclw179pv47nyz9qyp29jb8p6n2sojv8z9e1bbo1bxsdm69kenkcesom0st4jqqhzwaack0n93n4umc4cx94u4lbtkav7gqanxpwalmwviueiyvyxf0pfdin2tkfljvkqz2r3j30zppg179',
                remotePort: 1971836566,
                directory: 'lxglf40uoun6r3xx91hfbj1gplgakbqv9szxvuzkmlm6qzv643xn2gu4s0oaks2i5ptk343n6kpk1ewd3feoyixf2qa8evzce1zomul64w1i5s54fib7j5m7bk16rykduwyl0lsmq0ovke6t01h3vrrtl2ik5q37jxku1b5q23mmt2uqr55a64flwywbwvo8fk9qv4kuxwty8t0mseaxosx2suwz4jxz8q2bvcgeppd8fykt56wf5tozykek539y14sowa0uhwboum0tvv25s13yqkmsd95j1y0a1b7l7b80bt313d3oxxkue5vcvbt0qkmqcbzcwmscc0tyctpphxrquclj6twdmru3mybckbpyic6arz1musc856oih0murga8rxfbj3nnua4xgaxdaqdtqgy200a9gstc6ol4fjf4ynfwl6verq3ddamc2gguu01kx5hh5g9ph7nb7622eq3i771p3ej988zim2vw5dxbp3jpuq411k7xj41ypt5nk6pti5rl6jyhvr15xtqgao66hgg615r09e4rnp4e4lg8jvklhgu3pkaoa7zffjm5b6c18wd7tqgqzi5mh91h2bm0fb3gpaw37pj8a36zlw3xfjezbutlukf18poctugoka1ddxvv5493wcebqopjwj2uuke4kgeal36f5ugxa1cblq06yl55wjwcgu10mzund8aqdcvx7l21kgf3s39do0leqdyi8nj4mrj3x0qdyo35yn25l7bgfvh268b813nubuh2idr9hu46yoq5296rd63ljk08v6wb3o81tgdcvpzom3hpabyhwtz8zvqi85f0jw6mvdcouahpr43np7dcb7q8slxkharwderhd3c4jvzrcxioti5xeuc01mi67jqgqss1q9udki3ctoj2w7a49d784g11wb8oxtg4u558vhlygy4pwfsmncv2s2ql876q999ybj76p49ifbl6vzyd0echef4dm3m13wkatqe1b1ih4ynopo37uv380044od0q',
                fileSchema: 'dfcge7w21ndyso1nv756r083x2grsbcwoeb5868q5ltytltkw1232pnqxl0nrfb64qrk84rplhpld4aosvcelcil73d62q9p8izwdbzoamsgg1cv0mbdyxat5dank3e1gdjlnryouf6emmhyhi05jsndwjcxj0r86mt1oe36w9bl5asq826opv6enmecbnbuszvucbv98reye5zby4vxiwkoft4uya05mxmo23yr721a7v7qvcxp2cjkruutiwrsrzpjbtisf2at1lmjn1ktoqfqk1c3vlkymkhpjg8eis2rcmmrp87s25dbtxzrpe8vopkmzh8ojthowe8dbl7ck2ildmqkkot4td95mutl24buzk0comljvjuh6deken40i18hoxtzkren8xpira4jf7yvfh1ova19cs0pknkvsgl8kzlf7ilg617x4lpvbzdvy0jc3q4ear4d2117clsxcb79hov871dbkeeci6w28itvdzahobg1z4gr7znqyi9m0r9uj3w1vyipnm001rtfkznof51blw7z73jbj580x1n4o8q6sd8fcrnecypbjp3d6zuynhupmtphq5z9wpojavo4p6rxfwphun48ad563mx83iq0l96kpgsepa299zzyhjm3905vckfif1v96jaqbcq03wyq61tyyiv89002wq5k2xbpj3cwmlnr7k4c1qygab7brxk4qekuy55vljmy5x4nt0hsmnomcajpu3knz921mttzj4bysx0z7jg4zizyh7gcoopmv7hvtnqm2w0npxcai3lx79xhck7kgksd3s2pszxipikffx0sqauf14gd3y646o18k1hemr1abd0co2wrup9nze97uy0bjdfq1yrn5g5vcqqj4svm4bbj5r0mnhgal0y3rl08v9xzc3vuobf9xx54ywadu8lzcnl82xmofoql0eilo08f9e2pz0zidhlhubnorp4uxs3wmm4r023awc0fr3565njr8zdkxniuf4r4n5r4iexas9n1zs87',
                proxyHost: 'v230fpqrfr8290p9vmzid2uqx9p2ll2wd6vxssdubpswg741l9nx2dsdwed5',
                proxyPort: 3984152251,
                destination: '3s9vhbqy9m5fvushkdi5bpwjan1vl8qr0r1agihbwodd6tkul3ehtug6r6jsdyaat1h3m9hzj9pl9b4ci64kh5a16qcsa0zse3p3lz39zsavicqtipz0e1tvpen8q0eoerp7zssefpjtq9vy3q8kfe3goyiigfdd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'v6zamapjfgejhajy7jvfroyezft3mre4oz6x1m0nydfl5ke3i95xlvu3rwsbcu1vzggde7y13mrk69itclqqrvnmqzn069mrez3hurq4h8wskkc7gk1y6vfmpag151p913gdkopikz4s3vty8crjern389qo3xps',
                responsibleUserAccountName: 's0m1u485890n3evt6zio',
                lastChangeUserAccount: 'il47fnb7r032ihr88mxc',
                lastChangedAt: '2020-11-04 13:25:15',
                riInterfaceName: 'y5avgvxfqah0sjo3588dux58zh9u93zw2ehmr8zahb1lsk2isdrw12z1p3j00mfeldzn18h29pd9mwhvpy3x2s43sok1g26lcsoyk412bk5zuqwduq9z18inv08wv7nxjkkwspah1hnsfv3qnugrbqae9bsbv6ci',
                riInterfaceNamespace: 'j16dcb961kbtvdygzg8m4uvx0b586h55laz3ywqs375tnre95i9s92h0s7hsnznx5td1vb4lubmpt4ojzdpbyw8rt6kbd4gxjtiadc4n638yqxds2gwl3pqiu47i3snfwx83f1spaequ41bli3yg6hoyo2kjiois',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '0dauaugg24rxqc6sqrbjinrjabfcsjulzcb4fgs9b',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'kneddn1p5mb1rakiy72xei7gwudpmi9lu8mrusieiv8l0a5ktc',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'lfgzt2rfhkhfjj99ueuv',
                party: 'gzez06h9rr83nw4icjv3xks8t5fx5viafzpjwmou4so2rauxpa5mh2fuzbz0k2asvv2h7fq9hk65j29mfep2sq174lpmxbntexc8xstwh5c78mua6g7ze6nxtm3fohyojdm6hzcl7fq3zrouwcfoxgc2vxljy2dd',
                component: 'abq4g08i3h225tfflmwr82b0safj1s03jdoxfibxg0x0kjjwuogsuj6t0rl1okz0g0bke95wsaaz5uz2k1r7bmtef5be4zntl8onmidw80bylfpk7rp0uumwb8drri5sl35lij969c2zfaysafch42co42vnma5x',
                name: 'r3b0fg9urvzhi3fjo8jgzt57k6xpl8g7blll2fli84njmcvedf8teu39fylvsdj738am99gwmcptzwzfw3jsh9pdr6yvu23htm14y3rshr8k0zpcsg0bqotyodz0kvxjrnecibrv73t4q8q2dqqoj133kzx1w8ox',
                flowHash: 'v99cwbw1ytbam9954zbqjlheple5kiijs2vff952',
                flowParty: 'zyrq6tqvgk8vlj4gdvt7dm6gf3rgdm1s3kcfx11kmoyh6frtashqq25bb6aiqd7x4d6cl4a33giq076dafvzchs4q1klqpiurq6zhgzrcurr9dgjm1yoxhuh5dqr9rra57o4z5s2znblf28n4r35423gfodkqhqs',
                flowReceiverParty: 'tg5ds54ohc4xcb7b3e7n8hr7l91dw44b17bh090t1kihq2qos0unojif2ev98ocjwmz7wfj4g09nqm6kx1ricufo9ckmzfixle2xc1ib9713ifk9xuysfgytpsm1bu1vtdec6c29kjbegiueq9v07w90mmek1578',
                flowComponent: 'nsw369koewnmkg5tcb2pzi334185kabtgdkic04krxuqq2zalihuj9mn36yxi21sxmxcz372x4ckdaiq6jdm5efaes5zgwe28hdghqahfkkty6kq765zo19io12g0ukq3xm864l5tqjmysevhc897k6cywtqcxqf',
                flowReceiverComponent: '72r7em52ibpc1hmp840fcs32ekt98ineure29zunij4agy61l5z6k6mi4hqgukkr1de9fvgcyzeexnrtgwvgb6iuy5dwtv11rp72lqi8zjsg95cz2xheno8wqj3ycr9lljdoz8lrcyuhk00okn0vyn7kzszmi6s5',
                flowInterfaceName: 'j5tzwkxj52japh4jp9ck8xach3kwamx69fa2ikw39tkffqwtg048v0pqyt6145eiqo575qg0yevq7vfgg7dw7br3c864soeloz31co2t3sufbt9jrla10cvhu9bg7c3gfd91bqw58ujrdfxoha8nsw38r0nxp31a',
                flowInterfaceNamespace: 'vjd66qznlqu82px76qxmx8zq6lf6emh0ssjlhr1t783t6ixg435pta8q87yybroac81vy5xvyhzvu55stasl76zp55n9ogdlo3f9etcey6rua1w4k7f493ibt1vqgf1o9cgqf2a4pdybu5a99a54x1jaa7bcwz8r',
                version: '9tcl4zq3aoggl40o4mka',
                adapterType: '5adgp1l6upezsfll0r5r3s1t7d4qobk9algal1j0ak0fau2vkukd9cy1e4d0',
                direction: 'RECEIVER',
                transportProtocol: 'ofpf3i8sht2x150eqxv7zsu0il9288kbcw5a5dvodewhke6i96wbu6wlvu32',
                messageProtocol: '0j5ir16vfrutymgam2qwik8888fo9iihtvtkjs30o4z0u74c7i257mffx29k',
                adapterEngineName: 'eaq5r03265nx1hmgm4uuhb5y97zunkjpck9unp4d2jz0qf7cbu0szv0n9m450dd8flro9taj268wr4nwe8jzehlnyfbgfrip6mp2gzk3xu87yt6bo5xdhmade6pe44mhkmpjn8qu1617qmz6j1knnr26peerbjg5',
                url: 'b27s7ymxu5g1whuswmqw1f88btm7btqevhvxcvo3vkcpmlvajs72tomytp7lq5ik4p9dicbh4hil747h9ks6oi84f4c5a3d8sh11zpmyxby7jbw3ltunv4viym0pcor713m538q4cipbnwjvejc4ex2mfiuh1w084y0nrfkafdsesly57cevcbi0ndff08ekxl1ig7enfh2z1dr4xu6xxhv0erlujmrjk2xgskyf9ix0vtpkxolarr3ytrb8b4qdl9mitkdljet3lu7ljrf27u8s3ihvbatc0sctzj9llyb5ynjscpjtark5xb8bjcag',
                username: 'vx1e5wa4wk5yp3j23qg52qeyomamwfvfa7bpfd7e2t8sy7a07m1rlwwl3qc8',
                remoteHost: 'elnyirndwnp86nqvbxbklqterr6d6ex7srft9lymr87odvtwzjf5aunckuc5mywcdi6kid3ophju0i5w20td2vt4winx0ifid0kz5man0p5yhlp80ybqs0ha401ek8xbr55gpm5xkmfel88o9cju767dpr7cy31p',
                remotePort: 5159765744,
                directory: 'ljwqegg98swvf0c1syuujy6i6cjnvh9s1ad3s3t815o2qkhw9hd835wu20z8fflj94e9tdhs6w3rfgeo7ic321tp1yle0ahvxb8k1pmjsfljx3zyxq9ixi9qyzm1xi4bdgi3kdk66msrp0aomrv8f86aogevanpph3q3shqy0zvmmipw7ejgqye1fvwn7thq1k5g44940xwynyb1ggsfw5mae8tf79drj8hsbp9fcv6kdwlghnoenjxozj1fq1i3cxt2dgj0y2hsg6f7vf7hhjhyuqphgps4ilzi6lh222ojcpt3d11bp1v9sey69bscd8vuq1j5ysz8sz4zmjk8ie32l6xcs391b8gw5525zz60kcjj7fupqk3brje23s5cuurjr9ymllw8qwpssruzfvw6rpntykh44c6onzg2mj7tui4xi4jcxoov5o9g4o3djep3njtj9gab67i8pvjpqg1x2nkowl0u1tcvhk4wp5bhkvhmxtgme3cqw23c93ofs64akqefzm4kzb09hxo5bwudodlx05u574adnr5ixj9yyicz1kg6kdnqdrvb353oe3ddnpanczv0poy7fu0rm73ze5mk9nbrdx1rn9ojkrv91v2zp7xv57vtpzo4yxwi6hqr9hk3tzgsm80ky9ssj8l96mc284jpfm7lza0zrfe36k7pmfp0can81gtspqktvy9fhjcreuwvhb5ym73pp05bq3531xfudhcizv3usw6gpgfizvqyljsdxaqutkmi3b8oia4azb79t01gugyicljkcjf38bgcfwwcovbhzzegl678ej3k4utevb651iyrr4i8ke7087ynb0sxfxixpu8jsxcx9oasn8u3dxn4osv91yf5sfguj9yp01plhdy2afm4w2a21q8aky5kmx58mpfawo5kib8zqz8dvfwpisivwx5z8a8idda5a0onwoxob5647wa7kfu1vn685fg4nq1qxpdn2k7auz018d601oxepzwguhrhau88h0hkkbh0',
                fileSchema: 'kzg9da5tmxlqzgs6lyyfpxsgjticorc8n5s2xb7uj66h6sotajsioiit8efhbndud3m9wsvr6uu7k7tnzrysb75s94o3o8ncmpuk1ofkbtquf7cpz2e0lgr4x3woyg3lnzs8cwc80p6y7mn4woc33b5m48f44neq6iyx6analmwok7z1fafqsm3vul49x5qx70l32qx8v3yk9oupxk9ibp67zewwi2elqkwdlmmgwzdh8a7xpxf5gip9iiocppuu1sj1pwi8ll4owexcq06xl6alas4zu66kr0v6hl2a433xunvdpswqdrrpm98runytzn1x5r5h3klkeq0x61cbelg12kzmtobvzjvsxhyjhamhdfydnakydtzcyu42z47qs4588b6n6earnuj5drz7103f88glu9dqy5s6wndm27uf7oi8cec2gyutub2mh1ca38v6l3bvlhcrtx9b4kurio0exh3pnj6gi5f3oz8g5vqorxbwkmlf5jqqrx3kve9h5p2kd86vyf98dwwj3n6jrmlxswk88xen42ixwb5dpaf0wenpsa8fuknenu86mhz8p6rk884oc43joez1g50sut7j2wf1rt33txwialx5kbtfi0zx0i6ahhbxatt8m61whobl7pdivmhtoemb2ewwqxhch5ctrt1ojol0atkw9xoazc4hedyzdxf9rrqecobo05yyg51l0j0wjewjeaiq6w1nechczcxfmt6epnnwvmsyfkmu7ivjh5p51geooue6c8fxzsdbe15eb9fz9wskvj6spz5qdi9v6po3zp9rgigp03niis8rd9yb5gfk45dlrii1phm60w55zxdam9tpx8rm8syp6sjk3sxueydjqgim1krx6f9agqhfzqjxzb5gog0stcial91do2qsb9s8np427nqnct85tdp1ngcsrm1hhohnht7fksnplsvohifxsq37ccl3y32ncbtyqojfba88nv8b73pasa8hdkiatfs0uq31874g2lsxsgcewes7',
                proxyHost: '8vuezhp3exbf23ov11zgt0yb5rqv2gp7fqta5us3cu8xyauymdot72kn3wsd',
                proxyPort: 3836165026,
                destination: 'lm204ztiwfg80racd1o1bwcn46wm50um1fyx9z0zkozzkzbuevwl696ed8mw21onfns4v8qawss24lbwdh39pg0br8dzqlh6181dgjpbeqrige6hff36qg77q3o6h4ir7lh9hdu2n98eej96tteu3tc95wutw2yb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'h6atwxdwhwjokokbd7w25g86qtru43bfpbb7z6o9r7cp26r7euf57l3tfbfbd70194tz9w6udxunr74d34xs7q49xv64bi3ymlcpn15u7zsu7eo8zcp8nw7tuzg0p0p5k96dsktxu881iycfw6778of7zfkqrja6',
                responsibleUserAccountName: 'fduxvmx0m25v9kfbu1x0',
                lastChangeUserAccount: 'syig5smdwx9uaf576swc',
                lastChangedAt: '2020-11-04 08:27:13',
                riInterfaceName: 'cv10pgctmoze7us9ik2xr5j6wskzidjiqfedjn9bwjbqp4ax5s80g63wnqtljs80g3o1rj0lochcg1y3mwqp48w4jke4rlfbtvvowx1goqqw75txaaln6o1r2rdwnb6fq97w23s1pqjgj6fc9z09a6mxw2wpz8uw',
                riInterfaceNamespace: '7ojbyjdoz1y9m08g65pv36rhez7eu04a020ppe1ss5cc2xlf2f6eyehkwgw2ladoaokfa6fd6j2o1bsdju9vqiq3fb1gqzgkocfezbi6xoy7189ont9635m6gv4q0xg5dtdwg48yhh8zo5cw11ou8ahiriwgh2wm',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'bkx48ccbmgxq8c46fzdi0koqtp9f6r9o1tczax55',
                tenantId: 'hhew46ldd71o59c8k4wmgpqrtwhmh6ibwkakn',
                tenantCode: 'nrra0ghnkjxo81l6g8kdgu1plkbvqzk3vdxs05i4ksuo34bjd3',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'll9lbog0brn9mz40ru80',
                party: 'ft0a12vhtxrm8hqijkqxphsc33wyrl87mt86iwei12kgos4oosbgrv99aiao0w2oh7t4dak18ml7cbfxqq82jirsfhu0wkobxet7i0b6t4hfgumap2botg55hut0qdmtj2j8nbty6lltkraqx6nfrbub2hxoujf0',
                component: 'vxgxcbeqyc4bnb8s7knsf9uzoz03xcksa0z0qo55p36pu3crhi6fzzugo0ohxdfikzzqev8wpfw08l1lw31d4lhisg5vfp7qp5yagwoe942z9d51sgujvg7q2mbin2i1qdol0q700qk5d90f0lcnvv1djug50rlk',
                name: '6rbf74m1eexr4dm8c14rx19shk11ak93dya733fbsxk6icet6h3odwe57fwztcefnquqqh6oi0ujpclf3iz8bzp17wtz1cksqk1o5st08n0t85o0rxdk7v7b9aafvtugt4a38hg0mz4ot4v9h8mqx7d25cnsj00v',
                flowHash: 'la4i1i77vexxq3yj56ubrgo02yuq9mevwm9ycmq6',
                flowParty: '92dkw5ydekfgqr43ts6alv0tusmjnweoku7xibo8c0fyvtlgscay2axcd3nbnq8y7ffwixj7gvhitenj9qn8exx1scow4xjah9ydoy61rkpd7u2yv1n4dy5301hozseez6wuftmii1u0lug2iavq1k229vuesr25',
                flowReceiverParty: 'r7k5xmk5xda5lr53xohzo9zp23yxqu9z3wkl5q1fxmh8n0nqsqsqlkkm204pegbobemu2x455fcns3pgz1njzzevhfxr30fh2lbbpp7mdlucjhtag2j3qgq39v0nbgdgh000hlevka35e3tkadur2i7qzqtq6f7q',
                flowComponent: '5cuxmgg61wyrhl3qvsgta25uaajo2ywxn8kto0y8cgrpbybasukj20i5zexv3z3x55rklvye0fua0v6mhwavmv8031ahjiqnwebdjvnn3uikmpfoiwy8b3wkrhmcmdmpguy1gd5ltslbvil6m827v9uvki88unp7',
                flowReceiverComponent: 'mnz07qowjqchkkbl6m112ok1kqa2tchnkl3dly7kono5n07tgfdxfcmcjruliqm1kszn6bolihmdmfy3mbmax7njfbw02sajp99tnsauysc41y0nn3qyhon4lltt8wzyb752dj5xdkguotwb0j9el54cd9mwrogj',
                flowInterfaceName: '73ro2s2i803n3m7trl8ys06102mgpe1zpnbmrc9ryvk6xhmc7qi5tfkc5w3janlepdllmbixsoi8i1xmuk98qjfqnf30tu7jdbb8uog5210ijggr3cim3mii7o8vtsu2ock5xhnd90ke08zl4eiz8bzjnftv4t8n',
                flowInterfaceNamespace: 'nh7pgswfwl1ug6pod779u50p55e56bd5c4yzixc88ynvu8rlipd1j85e0nsxmeap0fvmm513tegmgdzx79wnv9vc2vfpkul1ol6enyvhn9ueq2i7oab5oavwy5d21hg37teqon4tuh49j05nfelbsyxd0ipk6f85',
                version: 'i3xho5jemnc1wkl52d9a',
                adapterType: '5ybu7r1fxruvlsmcfs6yo32wfqaqzkxk0ozd2oo2w46a06hoplt4otjnx1li',
                direction: 'SENDER',
                transportProtocol: 'kb89zw1uh37iev61vqd7egpkwgi0jhy2rgsz7bwklo0nj23s4ndaoar5fy6a',
                messageProtocol: 'uleqahqt8705y9dugjn5o5icm3c5ue4u3n3o4877nct2e88lcuwf3rnbakqj',
                adapterEngineName: 'xus1k3e86sgxnywhh0sgbph6gc716b7nni6loxtwlnwdnf324qsgvx55cj98a1uubju3zmwrotagfiqkb7byz40cuqr1xli9lcacggrlcb2zz74x4mn3jjcsnazxczj4cjr69h4t2g5a93u5yxwxdboff286d4us',
                url: 'k6yfi1en4nen04msph5si3x9jtvfzuhgja27t0knifrkj1dwfohpdkvqetpmpukbswuyypzg9w23on4sdd67kbykz591jt9so223ym06iygqyyitkex4wclo9k0naxxpfh0pqqqq0wplb4bazxefjj7nfua6ia72uscct6o2w02oxbhah81hzs2nws4rlnv5n1bl77bsu51sd8yfq30ltbdgdxcoo2jivnaf9g6myu5naz67ro1zqqn54y0x6dd5x2rsjyaba9o1euin21ox817a5h631vsbglpciba8t6abz6ftkpy4hr5v48bw4yoh',
                username: 'aaaa7hte005lec76madohlif8xaj5j17wgm1dg213opurasjq7ogp4g30ipg',
                remoteHost: 'crbxm26hwvv08b69d9ncvkiruffvo8zftqepytr9tsat9n4yakym69526h30fm1z8z1zu6wzrm2xbbg7jo03yom70btmwv5i2d4j7o2gwygqo7ey2si2vks6h64c0h961d5gb97b868776z8eusg2j1nn2n64hdo',
                remotePort: 6512081164,
                directory: 'jlj5phq3rtd1qyfrt7bcujwatwdgtjne1shg8u86x9up45oeuo7ij9b3dxgh380bnpvv11nhx22mqsk1vxpw97h2v400mrjnmw7xipcgptt0h0xddbcujmktl4y343nipf1fswv7r84xnm2hngbh0bd5eecnolehbwyhjxtvuo406uaoge11bo302wm9e2vmlwrc82y45ux0oyift0k2c00r8izem3ww471qgybl17wpz10oa5jhdnevjy4zu38izafgu1j3itxh018ujo7dohxrevdvs2pjxywjvu0mtv6knfoit9ag8n4ndic2qryoqeal4prgknfrlnmwvn436pgxilz8nnbfkp2hiesjnru4rdjaldmy3d5qfnc2ocbltg56wtj4rlq81zev2iqkyoret90evbp1i63huhla7f6uvf0lzxjopf8f5r28nd5m0tf6j7pr14n95bwdbzm2galw5lvm7ym6qjinhlx6ch16xfr2q8hzsgkbkhajv722nc9s8k8sxfmh8enj0o4tosgm9rypn2zl6aqqd76i2gjd7hhqe1fqg1y72gakssedrp2mh7zy8u5mocyrvttbakia7ly1961jkg2dv7upg6kz7ay03wtqy93as681rrfvv06vgdd9ke9j74hnwsx6xxbvwoac8bax099owl182ketq8rexbfy2si63ra4barij7ad5ll0m253owtmpbtd1edkfust12oyjjwx0u6644ydj4ditzrk25r4bfwz0lr91fsilthblfsx6xlae50cvio113sy8s6l8xo9rhy0e0vdwnzrqik2fnzw3evxcvhfwr28xn9ui7pvxtfv5duf21jukki6bs9gm6dqpfto8zvt4xx52j80svdu922wa0cg9032ztga8o7ezknufgxeod9r9n7zvfcu7w420f6namtusykagyhv8r9wtdm6clgfzyv0qwt4hcikr2cuvu05u8fk8kndxbz5g97zw58xjexrtq3d40xzrn5is48r2ype',
                fileSchema: 'es4j3gtjt841olidv5y3zx59i0ce5wogci1ebpkae2z6sx7jlq18di3c6elyiexz804vtfnwf8uclhxvqgmw0ehmhzl8cjazs7yye7fd0x8jjmpb8wl1scd2top9ql65ell074hh4gwwf991ttwkpr1iabb9o8g4txoz20q3fydagmo973xx2dhglkkh9g85afv3fwfabfphuwo5bfyjtx3ikqqfceuhrg82l9ycen64ycyl5fxdnvorap6oeowosrz69aes1h13demgmhkuw3x6x8e4aaw0sfojf52oh8afoazob9cheaatjnj19otnznn8xsoi5i8twgiqj4yxkwlgqxcdkz1sotgh2x6y7ine6ja8g39wtc46jvrfq95793d5d3i26l3nv3h339afdg5vapke4994347f58rd1y3se5auavxrrwd5g0i7ee62sen5dda1t6qyu2p5ehb8r1emkkmc7nim92zax9lzaj7frsopkf889k8qvolo0o2lcbbwotx2vf68r23l9frjq163muwfp93pojpxjri7wi8q0uzdk32y4rnh6zd4w9b02if4da5o05vgmv9og3cqjxa0vkfcw3ef2ayslyinq4akcwwrygv1cbw7j8cuxc3xe6wv8w67uhkteozqcx19symi2jvgaer5h0htpq47ypxzxc49bfgylnsgxg2yqt1fw3i1qqc8o9ort5r92z92jzh3ceog2njxl5a9xbt0jy9q8hmv3m9hut7oqc59zkpzryi07dutv9fw64z29vagoblh2xm182u3kzy95811snrwvmy4mxx8aqyti4dxzj5c0bmei7bck4p4jpe01iq0ruphnwxrj6etv7b3n6cscgn3fvalcuh4supue2fkxnuwy6gjlw76d1kpfz5j9zg0yt4b9shzvl5ru1hipisd1qn6oi4xs0bp97pky57uuzdwzotkdhtij1ajepk931dgtiwozwayoeerocopxydfhsefy0tl9pawygzlexsn5dcs',
                proxyHost: '7rfjiq85oppgb6s3gzl8b9bej2k4t7921i7u9170kn4wti5f0emh6g8e4o7l',
                proxyPort: 2090674255,
                destination: 'ywk728xipvshmyzfzra4a3dhlnla7773knjn5rnbknv2kuvlk1nv1dj8wccvm7m92nfisl35wpg82fukfm6uuzdjyplqc6esydk09rjnj1pilc0qcrv3pro4iemmu6sy67cdz662vx7lii6oz7jw9nmfmjs5vpkm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'c62mj7ut2xgpev7idevwjj94isvwicoyf3tpnhh8kgz0pl5y4w03cvsre8j00iuiqeyq9bv7j9v7lso3le0ggw6rbmeziqhxopa2r204nuo76i7ymp0dangwew56pxzt0kh5e9ayvufrzfn8n07e2v640y9n308s',
                responsibleUserAccountName: '293fui8a0xu41nte44m2',
                lastChangeUserAccount: 'qhzc7pnvlt4jt9gimwpw',
                lastChangedAt: '2020-11-04 12:04:42',
                riInterfaceName: 'aacrd4m5bny7005ybhhfn1z6fw9zr2vi8imhywbkdf742s6lbf4lu6ojr5o9f819cuncy41qj52w0xaaqcx7u079jwd6xocbgaz5vkw1phhjtdnn5s9eu1gyiab2ojm7k2mmypiwkwzcobboz7psu1pc9ziwus5e',
                riInterfaceNamespace: 'e2z9y2fhav3acotp6hqjysgfkufoa794npemlqjh0kzjlwwkrf6girsr283jkdftu9xyw3qkwxd9tgazokhc3540nznm3123i4yzn0m5utwfb8lj4ku3g6zdu8qvnzq5hu8gv9v1fir9p8acd9p9a0vz8zc22f32',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'g9r39e75p10mdh9dk48ycdzgd8rp4cusovuwf5ww',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'n4s4foz0f8x2pcsrxcp5rn723auys276rue438x508xzcvkofe',
                systemId: '2imsicrdb3c1qmi07obtzy5exzv4ggc3v1xlv',
                systemName: 'npohxqsxd7wfqekskdpa',
                party: 'kemdabn9d1rqccyh66hzemmrnrps2o6u7ufx2hd3b91lzwmcistrhy5qo3lze6q42if0jn6rpm6rgkw26fxglg524v8phhich8gsj1eieen7b3w1ioczoa8eg8flnp2vwv9gx131rbm6vagjlon519g9ol8wkrnq',
                component: '56tlt9h0wrt6zwyiwj91njahhemk0fds80bywakn2jo0eo9d0r35qi2g2kuqiscpf2farhgjcwnsyz7kudwm3o3xg6iupgqjtktoj243dpsz77phnx7vsaimyt3bqu6waqnin7v83zzo0aem0do1z26upp2r7zzy',
                name: '8t5u4nlwsu6ux3x1fde6r81naeklcajsz7jvulwvild4eeq0tsfg1i3jnzth1ektpkvasi8129fitm104e0hzzigg8p0g8zcmwopmvoi2dd7cal4aiejoh6w96746yzkwkr4r314sscmmiy7um6celbybvj8q99d',
                flowHash: '6nlfvkq8sz26mncsorw8941dp670dcoqd25l2ylg',
                flowParty: 'ht7ty29hxac9quljk8y4vz4zro8aoh7stpy342r8ojv5j78nzp0vpkjl1cmbx7dx7h2ue2ovjge1h0o4jvk58hepdlssh6iyqlnyyllz1j4ngps533yrso9e1n6dms0l12x6arc0idv68t5i11yn117a7mj7gh02',
                flowReceiverParty: '9xjyr0ivtvmw57n079ycv409scogtwlam2cxm12hdhk8cn6k2jft9idgyzfpmyxke474iku4owhhi9z26tcfhazxr8rkuy1tqj1hjoppqxmf6b571gv8qcc80qy0cttolfie15o7vmse0msd6iw23nwv88ufdkrw',
                flowComponent: '5xc6qvga00cusuye1v8ckf2bi2rxzsfwocxgixijz65nd4bu557ioywij35y8eqrirn6w9ceipa5a65c8lufw8ipsfz0hsu9zvwjt0uor6agrlf67ks4o64v0w0pqfzbtmifr9aff1dw3krgjobuafvkw1ckzs43',
                flowReceiverComponent: 'm8huiv0oyjfoa22ne032egxj66ebwegeem6kj4y05eujmrozwcb9if7vqode29163hjwhrzfy0rslkivhyp1clvz1q33mpdtkayrln8rga7ypt7wvmsvl2lvbztcqtxbij492muefn3wz5rgfm3ckoocalxgx6hu',
                flowInterfaceName: 'fo3re6esdjha4e7h797cbzoxjwpube6tqvee42qvw4enwxtc0cg7247oo027fj928yqtdh4oxud6ias69gmconn63zsehwj4hfaws7m0rz5i1fgqbo5yq42o0z9v9qyqfzs3rvffj51s4iqwxk6d6bxe3tg3qo9h',
                flowInterfaceNamespace: '8jfs9e29r7f1slx3arznqp6avnqgq4r9khoyo5ojde66ig4x582udedhnzocxk4dlrrj4k36htn5qyltrzmsbkbv24r96a6v2fp3tc2jyb4603kevse3ub7kwlcgba7x8vhnfuo1uvwzj5u0sc92q2ig9578h5yn',
                version: 'qu6m8whxuv5jvl5aurx0',
                adapterType: '6qdnump9bkstwyp00lozker74pw9zs4mettug3ij07gc26mg8og3q6tp59li',
                direction: 'SENDER',
                transportProtocol: '274jx9dur2s853ks1x7kl156povg6mhw9fzo8fmfxpeaoa02e45gjmlbigzg',
                messageProtocol: 'xx6w7fkeg0m96mwad3oobylemw30obey3hzwl2kydh45yfuzu64732zmef5t',
                adapterEngineName: 'a6zcnyaylr0nr1s2i4v2qqrrtf1zue2ljblijia33qmkcp8h87rvrxgxy3xyrnncci3lq53ubaiq56p2mswgl8sdlgngpmc9ukf6wpob30ziazsfeyc09o7a65g1w25zonf9bihapik7meaqgvawu6kkpogbybiw',
                url: '3a3zh0ymoxhxnvwggaxbsqfgrhpid32acau1vf4ff992tji3b24rn43df6416l3i1negb4cr9udx37mek0u9nx9fol85h2j4uezvd80kk2hamtqwxrwr5j3yddw01vusm6sl4r69zv7qt592bitjpj9sip2ecpr41879g0z229js1rdcrixsfjsux1j2idse11j6wxerlucx1jyfdffhp4ezhk0b8p8ckedsuh5s2z399k3piidwzqxva2qtduuph54yxaa60k7f0ux78z3n4m7ue1dxn8ft9hrcu2247kg1h5uviolyc7ws1kmrw3dg',
                username: 'g2gx316o334woxiu78ae8c2dui5uoudbdotl0pa90kwezzwmt24bb25pg1f4',
                remoteHost: 'e5zngy04t2bs40wamay6y6a6qcrarexoydl4ostcffmwtcrb5wt8r9mwwhz8u7xke0fl97h5aww3blqohqwqx5px3uf013dn5iplg0avoqa6c4zcjiqy87ns3vars4vv6lrbv49ej7uyn0qrl20boi5ivkcjyizl',
                remotePort: 3763130421,
                directory: 'r8h7htap6obtf49k11ym1jw7vbzpbfy0axdpxkv6tm4es2epg6ho0kbybwajhbwljv22ldhfxar6aruue91hgzrr3o82k8ty8ywwmyk9cht4t2gtb88mkc44qf2hqb1clf5hncsflelc2hiddgfmfhe74chsgrp7nqx6nuu6nksm8nm8hocwavcxj96l0zx5z9binmgya4boh575lucozkvwkkrhoscfpvzumnqbjhj7bmr7s7pdmj3dfgr5xp5s5az4kzofg8yz3q2vin801zvdnk6vvjtzgd2e86etwxa3gxxyckvcft4l5qp3nl3yscpmnfxml8f6wcr14pdfjym0fe6w8kcyxb21dz3cqenu95v0gjcy4xh4edcs7a772ktrwqlet2m9mbmb3by7w53ta42h0rs7l0ezbf5qpt2q4vevzw5x1yyxanmpewy3ciaolqwt4xlr99aahg0mlv67axpkdz9dhsvd3tmskrahqrqoljwk00riu9c2nxlwhvyq2un56xaq354r18bj0ggz1tn2qruv1ahroo8mwa97jig385l0u6tpwu35e7rxodw35k7l71hpszl17213ec6e0us2v9c1abua15c2ynnul6hdgsy1unxki6yttsz52qkxb6qaeym573e4qy2my5qptc028vm530wf2qijv7vx42ly0ojabd9hfgfk9f3tccu4lgqvsforg7irlxsj2k9tafohs8m5d83as488k8f5d74fz7a52ja7pg98f3z6fs50t5sd520uunadvac19b95rvl349u7suy4y3lsbtvwukr7ybr3boavi3tmxj4g9b5tbydvxujq784u6mbgf9w28dcb3dscpznw5ih5ldvvn3en5bygfyq9c5vgkar1oaejxd6n0xh81aifg0mtvjq4sqp6df1s3scjuurmuiwjjhlens5czqkw5v1g72j5mdmhge0v6put21nbimxanav83shdrflyzmctgolhqttb7ek4ku9stuczihnup1dh',
                fileSchema: 'a9joa5z0s03ijqesqx1aqjh4sj8x18st832qpkdd4pdktm83skwj63kf4azznlgmh6445f0l1xqk9gggf010np6mtvp96dq83ks003qn9d2eta4xgjvmere1wggldabh1t0rqpbms845rtlabeuf1y2mdvjyqjpt802xakr0il7jh5vwp5cbv94fv7m1mtybq0tvy53er55krjpxo6hb42g529i35r8ennq25075t3osfgdoucuq5rpoctglmpaacg1n810y5yxdypsxiz1g9tppqhet2n32kg9fwukrys00x1dprfpluqm827k6kev52mw16oogt2c4uq40o62mfr1pkttb0b13waptd1tmphfjiykyuxxz15saq1veby15f797u6ce5dcbiqxurvgroad1tblkm8hc3pn57zpc79d8m551s0qa0fhxbjnjra78sgnjuopzzw2se2wwdej79uuojc06i7darnrbd2cfxs5u7x4v5t1cozqkdh72ub36qkossfl7d5rojujdezyzsas3hmwkhynvr8ts8rvwyvcldw420izxd8sbl0f79nbqp02zmv5gefudn8d66ogyt065wapjmpwk1axlionxfx6pnaq8ufe2pufjgq49885q9upty5f2fzakbnu4apu0lz482r4d4fsnlx09gvykaujt8p68d0nm2wznm4p4mke3aqxfqhqhntk226d7ey9164bws4aphcsxq7lzu9vjq11ajimatb4yz8efstzledogtq5zgmwvah4pi0uhf819jhv8yrq5hfw1bq15ivu28v1o0txexu1q4lq6xjg0u7rlme07nmsmwflidtiteb747f1ayhponotqaprjerwey006kw56sibsq0sbqckn806ja9heyq54ifu3t8fh8pmeswzimxqrtz0smz0l3hnjgjxg8rkuz26ohm8mvpedbsxiy4y359u277khyg25td1xkjpbh15htisono034iwm8yh22k7he6dhrar07obkwaag',
                proxyHost: 'kn1zxi4qm3acqj51n2b33imp5uuuibf7n5a5wg98cg98psaub1501qud3if7',
                proxyPort: 8472831264,
                destination: 'g3bo3tdzc5bw6svv00tbhvcrac5225nswupz7grajknwzcbca9rc33kepkb7poyt3hrzm9j44t0dvseypggvcy6ir4rhaq3wvf9zkwzjda77fzsw3gccsih9sk7sw3qmbn9r35c0a9qxj7qbzf5rf1qvujykzimq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3867j99pmocpc61cs6yh2ikh1kvukdzqc4yr80qm7iuu6iwib4ylybsq2z5wt82g3rpeoxljv850hxywd8df4of0qmmv48c64yd646hu9qunuq70ob7bsqsjem1ebcmprgdocsfzaq5c2ngwm422uhupuetvky98',
                responsibleUserAccountName: 'fo4r7tbhnjp78n2mjzki',
                lastChangeUserAccount: '85t6erdby06q7zs2v7so',
                lastChangedAt: '2020-11-03 17:57:20',
                riInterfaceName: 'dmhtffln1635b2jrhh2zk89ok7qtkvpb24uaumf46f7e96d59a6ylnwsvh6qp583bm5bvm7g29ycez16ap7hgqrza23z9nfekfhydu8n5msoo4o68asylmu2zc7c0o87zm6uobs0pgufiio7irse2ox7ouvgzmcc',
                riInterfaceNamespace: '8jjrlar4nkz93vnztx3xq8485x8qvcg4nh9wqq24awd1hh9nismscpmdgesqhxdwpn6cl8tsb0dzmhgfd3xsq4q8qd3w28nl0cgb3s3hqfn91u73mi7luvqmb1wncvc81nbdur8fhyu0c851klysvayoj6kvap63',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '9mh6xs4px1c4389t2ac6dxq21q25nj8bhn6g2eim',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'ihkhzjpwn6zr5ga0kjwb641ghjekskudut9bs9a8uex11o3ltk',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'x8nskjyut5y0ombc15za',
                party: '22l7vy4v43zso88q0mwah5c8aew7un6xdq5spv6zj24fxnjhbcz0vajompyo35y3rkbnv542lssevv6ybx0b3pkqegcfn27yd2drubmjxndk7ld3xcjsclwbqc8pygz1o8uyx23xw4u2ti9gsmzwtjjiag9gq1no',
                component: 'kidq0dp13tboojokl4dvf0ngl63nly2cml51ao68vlhln6xz0558261mef63h075o5k8foxz2yvnhvujips70u0jury7qsot30ui3edcyvym52v7lgmqwenb5do6h563hqvdc55x7x41qu741tbuuo2w76s1ybbi',
                name: '9qe7mqlerf9f8c09woo518vjsxua4vx0y6tbtmia7tllq9gx2vx0xec21v6z3kvsu8uhk4agdrxurwa0gzm30ow84zu7kxyackfrhpcxr8p12bkkspz6rtwvw8egvhdsb2naajjv9wzmih03rzwlp0daasuhnn64',
                flowHash: 'xcl573cm67k7ufh7v3httgja1htak6wwcop8gj3uj',
                flowParty: '6b2hyo0u9kmohtz0n8ga5071ove9s127fx5gcxg2k5sxbf7xsv8l72yahxieol7vfytanfkx4y2ws57vumk6gggdqdwfgedi7mqv26n494ev59vha8puuaxwr6v4mht2lyf086qvld3laqxs5mzr91eqv6vk39i2',
                flowReceiverParty: 'n3z0nd4v838v28bdgrjcvv74gl4qck6m5ld38p71ql50kvra1tsqfi45ou0cfl3gyptb8mouet83jdk5njgsbtldh20kzzw71cyf2btjzviz49oz4n5y2taepoubxjzhre2wqjxsrxkwbv57u9n6pxnm7h63tm8e',
                flowComponent: 'jf81x63lr9gowcui9qu0lictnm944qr47wrc4f28zd1bl41x2kemhg4lmfe2s7kkwr90xj35bsjrx6ik0n7hwg7c04qxwaxjqrpdsmr5b6v20mmz8g41nzy6q6ztvn2i42xmj74zcazktkj51mh1ecravh1fyt7m',
                flowReceiverComponent: '6sy1moidll81metll9yc0coaufuc9nb25wtvz2n094pxoet0zv875ubt3t1klcwrizji6lord5h08opj9kqc58dlmfzh7ceuypcb1amj84wgk2jp2g6oxubuk1x7q3jx9i2wjfvy0sdb2ij5csinzfz7cnrh9tnr',
                flowInterfaceName: 'dso4rwfjo1aa2pxa6wj9mauj3i1j2q2dy6fyfnzf0sqkh5kvbkfqcwx2wbfs9l2ob1ve1lc8zv15uh5xkyv51pv3yfkdf5rg1jqan881ndk2sdq8bskc4qvuz6s90o2yuiaiss7xo2db5j9qnkd974dry9gvxlg9',
                flowInterfaceNamespace: '9oiz3nr6hsu6uj2ko7l6gcf0k1h69kxe3xcjrnad12wlly89bghrwsqzkpoc4nfcjpy89zmje9vksymvau92kj8y1uohx6u2xodszg860ad10i4jsbc9nvoixqqkwbyrdhn47u29cbbna45gs81qio8j45r1l3bm',
                version: 'u3f6ldj6zkbrul45z8k6',
                adapterType: 'dpf9dj35d4glvsbwrzdfe4y67ul5ewkm7ao6wku3wjs2kq817mgb9mzj3j42',
                direction: 'SENDER',
                transportProtocol: 'lo32c5ia2xkcydcn4o2cyo79fl9orah2wiafcg4kodcou4k8y7vc3sr1mjw8',
                messageProtocol: 'zacn6zqlmagcoo4kd614b5v1dyp4zo9maudtb54nfo5o48f0hi0gp03vp5n0',
                adapterEngineName: 'z4i6ukprfzq8437yw3e1b2g0tx2p4h7q28r2nxhl4v4pms62sser51fhca294i1uoup5jm5jup0sadyw48iesvc5t967qg1fo6u4xi9ef4x0o1cv6d62rt9mz2nz20k3l58piu30nhiq7ssdn67mgp8hwr7r08nf',
                url: '1ztjqikawjarsqpbjl8ngnynnv6xk9fyem71s0iydjzhoei1wtll52iry1dlwcal1vip865c0i5f0p4ufztxwqjwj5zslec7svvocc8fylnaicbsr81n9err54ttqtmd9y0ql6wxg3vr7s369b53war8qiat9yati894rztcxjrelcosuouogo3q81oswmpupgutz4jmrsolbpzluf1zaoa8wmqrdy7osjj5i0oag2ly3isr6ntrhdxhdknkm0zvdqvhg7hhfac21lb3xnh7qeap7ap3z7ntk0k2dllgcly8z8gmoaw1grwgwkq2ifpc',
                username: 'xvuzll2jmm3vjvh3ihl1fbdpqbqkbulo1x3t5fpn20qw36v4oso44edwc518',
                remoteHost: '7it5ag0r6xdhmfjxm4uidx7lfcx69qctnqjkoahywh62o7o8czk6omp8yhh8t30plle3252nzh4qhfla8rhkfxaz6xny11cm1m7lvmgp1najtvr1biek5bm5h9dikav4kpefk0z62i011ymhm38qv37pjsq6p71m',
                remotePort: 2541019085,
                directory: 'fhxdml2w11vbsrc540kbazqkhxbuct7tgl8cpgs3dr79ti832gq889txa5anxnz1gafppiu5qxtm8roz0usbn9e6ypqcqx6y02k6kymqd03ewcazma3gq7uvqqftcz5zgrp5byj25jpc4uec6001b0hp99yqrnwe1cmk3wz3vogx3zxqp3cmig263uoitgszt93i39wlbeq2xd86cbptz5z9tg87o1xv5hwc77t1ml180pttcd1yl8dptniv91rer9t4765bkw1a9bkhezfrdbdp3ycz9l3ca2b4vhcfvu8ust3z2oud9gcstq9r2jnrwra9hncfsw3jo1inqwh8rvcdc2pr00yl4nby248ytmf9q4wqs1r0lhnhqu2ys6aqgf0w2855rjpn1s0e7ttqmlynaiopxmcggo5j2fjx7dhqxf7vc1bwqsh0qscph6r5qqmiuq5d27qgi12gwampifroj3xb9mrmm4v06g3yobhzp5bszw7eijts1x5qujbzs7ukocg1qnsbl4bl8si8sy0nktpsg254ci6u88uov4enevhszdo1mpcemh7s260l6gaat47i4qg6xqet9x92ugimzkuzexa08vl4efvlj9tsl42esqovrwdvuzpg3lbcskc8my1psihuxv3o9br95vfn9qdr0xvyv3465rku4oymnatxrzu2oy1ivrpxp6vm7sd9mw243gfaelxvfm3zizp30nc1arkzvyg4pia8f14yi20cfvu3rsw1h64hpe461idvppqtye8f55vcahfk9rknnam02tis5aecpin1sf0pagyv2h92a4w2bkt8hxpc9ro4iiau64ecq0o3546q4fijrx3v5ndqn27hvetkjya1lr0znqkubdbfw3qarals1cru8tmftdx1c7f8tddvt4b5sd0tk1umt6i6av8jg7o7i2w95ac5mfitor4ohc6vo78tn486r5grz6th05tvfubjwt0kc71x3a5sl57tsz0sc32gf98kl1kw3tvfpp0q',
                fileSchema: '8byxeck8evk7zyztynqer5aehs7n5yaosxnv0crv3600jvpf3lvgsdi4gf5tjfzwyhuupqvna8lq6uo6kbdut3vh4lnj1oqkei1bhamxcl3yglhepia3l7no376ez2kx1kguq7gcixbtbhwvtmpamh52y14fq4ayj6gvt21aemngnoq5yt59987wyjdbc4f1l943urc3k0wh4hhcksnzeu12slnue2hyv2the1u62rwa7r3cmff4bfi4s2bc6rlgmuqjdl7xwy62wt3insd94jyf773aal496x90xjnyec77qqw5rxbmvuu90nut0mywof6dy45aie33zyik5idsuufgwnl49ak09wth3yd1wvc0vychldp0rcclqz6krnv0ohr98747scylbpgsucozogvy0b1yy2wmdmlg8l740gjjw485u5cpbcr5ur2wvrauexkty1w00fq2niw5ewmyu8pdw1951988zmodsjwxkdtuz78t7b1bmyrsmg9q5vr1xo7ofhcfarvu53cv49tonck8wq4y06t3hhf6mlep54cshmjgqtxf3gqym0hl5tixsxlc75f0epo3onxtoczta9jzmai9401k6yqm36y26292n3e4w2zk251ueqpsifzwkxf84bxvgla19901fet0wdwowxkp3gk2psiuzmnmtmx5zczrdunk9a123iwdd16owgyyvqnneuobb7u14s3rpu3bwi3m4dwxlvczewy8dgfdq2w1bxvug9modkmb7p20s7gv4jspyp79fbx7ovs709s3h1oip75260y8omi7z7pkwtjn0po9mkd1v4ok43cawfb3fu7kvp8fq9ixrravfk8193gkzl5ccxk4bdfihs01e8ujijdv9p0jq1v629i3y8o7vqmfn6x0jn1c7ebdteyy72stotstpkm0bfb94s024wg9731bhpq5vn80xsuikxs9uk2t2e0gk96v4a2pc9cxquuy2sum9phvavy0zteptrus0ha2jku1fpc8zowv',
                proxyHost: 'qcbqtjwu00kn6b2q21a5kps336f3yvoa299sn9xjy8l685scm7ga1rvu6rq6',
                proxyPort: 9576901221,
                destination: 'jaq4fqrtsgkrk1wc18262t1yqw9x1o7ec1j26h21mx8onr6a0fkcrbzxbpibmj90rrba9in3cjzr3z1axo7gno96jbpky6kbgb5zl0mf2rah133uy18o0kvffx0rr0k8a8l2zjncc2b64kxr38bd79eaxa158jz5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'aj6olyxp8uepk8f8fmhd49pt7hczucaxkozxikedttofj1rl4s9sq04s7wk3qofxf5twe2y3hzfft0p68iwf0mi82bda3ssgyu5hmpl6w3smqyj5kpfpmud5czw7azuhzwzxwupw345n4jk1c026mkrcgh9m1mds',
                responsibleUserAccountName: 'qr36wtopgujogak1pozr',
                lastChangeUserAccount: 'qk58wdtblwsh4hc0f59h',
                lastChangedAt: '2020-11-04 17:37:19',
                riInterfaceName: '970d9lhxgjlfoh1dazhwprlp30ohe2dfv1kcmwb6dx9lz9aqur3y0db8glye33jw59tp6epjiv1stsh7tmdsx6tis4lomlf6bfi0gdom1fl9sar3yv7w9blfrxx2us3wcqwg9inkn02jw4vx4pknpurvgsqeynpu',
                riInterfaceNamespace: 'bnkwk62xkvm00y94tc1jzwvwjethw6xl3u4l8e9t5km66gizck2ll0zwu06v0j4k8malfspri3a9pgd60v10yvtaz0w4e6xx6s5a58mrz9gzyrnhl52vj5uhb1pqzwzhsvt47nfdtoznvxl7uoap57td9yhcq4rl',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'cda4b4vsby0wqyg1h9rxc4kng10y5vm99d6cbxqu',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '0musxaht65gpn3lf9i0gpj53jb1dtr1ijma1ghcgu8ew7a0cg4f',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'hr9k9xzzmugqrhte8gys',
                party: 'aidghnv63uroapn3b36qoy3wtulzy95d37m6z576efoq03sja8v2akdwn71b5ti7ksmzspdwog3jj05i78yz53vdfzntc1ualhu696us2c4rty7y0j4kt9cp81nwcdsadqg9rpvoy2su1mg4fksezf0433fbqcdm',
                component: 'ohjfotipqypt1te5zh58quklu6ebdzijsdufwdda6drtn2w64ttwn51l7ct2dq2e5f3qjx31moi8pmjyibyqui5bmoj55fwb6f9lla32mnea8fpvx2df0f8pzysdp6iff7mzvyc8hqsk8ptrant2p67s625drjrg',
                name: 'flqd953ljylai94eg5wg615q9i5ogdpdsd87p0fcizkr4v3byx8kowks71wlfcswiynj0rdlhf09ec5xzasb4a8tykfyivoheaob5j459eoih939bnz8gvkxkvoyanobc1dgf56zsdjboy9eenxgu30pmg9mwvzs',
                flowHash: 'sbc828etmhxh1mqrkv5i4xftdsju3joydh0qck8h',
                flowParty: '4yraia0jnh2q2psm5jlg2ljmns1no2y0fi8cwvoc5hdwtxs00npzietvf6xpe1xo31lowp5xiewpszdr07eafp6v9o823kiyrjp4kzennineuyv0zacnt30ob5jcolyqjq0r98v8cduoubv4c5o8txcwsubs3pr1',
                flowReceiverParty: 'nco2rj97i209defltwjehpvppc2y663tzojava8rwzr84ccnfcytyk5dswf03tz1lm3y67zxaiymzbt1jazdx4ft6hu9mx9jh5owz3mhsxr083b0yc98gkppyj6ay49ygy1bm49n1myxs6w464s5s2xe4es6waxz',
                flowComponent: 'byxek44x0l8nidjhfuy8t0pcljeg8re00zbtijwhqw1elxtpda8ljdk5470nfehky662hlggfhiblt14lfuundfg911inqdta2k2kqvmo70i42l80ufiht0av0xt4953nns3xvvhue68d2tzqq9l8esg2m2f8q5m',
                flowReceiverComponent: 'omkltdchrrx7bltvifj5yo4d7f67upjhkzvfzt5y0m4ba77cmzrpktzqa0oycxlm0crj79y874r86uz0v0wpe5xiv16l2dr6z69q8o0yyc6oasqd9i335qticre640vxairadx02dpgedkhm584r76hv4wjmzu17',
                flowInterfaceName: 'nto54zsdrz4m4idu67lhdfjn6nmp7rk7owkly88mxm1a2jmt2d5sqyz6qqrt19iee09ubhiouho81k7bpe6yha1wbe05ab0jyu3ojh29gyiu3w96dluz0lp47us2ce74w5ju1zw3whn3y09448hh8iaetisqwfdi',
                flowInterfaceNamespace: 'se0oapdqlvq9z5sxf683daurxrii70ygifcrg5ogdzchtwhyy9zae5f8c5swvtm76wchomuoa3y1i3icarsnm6atv2nljh7z5t2u91ena43pqlnr6p6lno36x5s0jymgft0370n6vhumlz2ud7dc6c3yuxo5npqq',
                version: 'ys3a698oa3f6f9t1uigj',
                adapterType: 'caywxnkspyiylpmbs1gtrf2q54zzob1w2fl1se5woydhxq7uab4lrlptvnpz',
                direction: 'RECEIVER',
                transportProtocol: 'dlon8ut5cw5s2rme0bldly8an269gmkrtedhshhee67d5iv2wwsutjoulkz3',
                messageProtocol: '0dfjb5iun8k0mi2a1o24yjin4lgw1049dwf179iemzzqfdz73kc0wlk6q052',
                adapterEngineName: 'f2tfae9ap7i9qrklcltucst93zweaepumk7wrvfznzr3ucdobg1p3a2py7duovba2dcn7tw627k8y24br4fkl042axjwc6rua202scd6z1feri4unysu0rx7rtnxn8l9h4q2xqme3k0p1orun10y9ne51urvv4jk',
                url: '5zssy48hvflgelpfbvzhh2egjqlpnx9mzjo81om3yc7y2xo2t9scjz7jlw9c1cy6tizjhjiturkhknsgx9px1een5or4a8tqf2435jekai78g6lqs7fe9ulq964ucrspik9c0lhvy4gzoarcsghtbm7aw16wosqkndndyh9rv82iyjrl8sa8qvwqgbs71lw2n06hw383170bk3cfpxey26fsg6ylsd93o9148pd1459k1uosut84zqsy8sabdfu6vid8ex0692ai0fdlx4dnd9yfi1u8u2g8l1iezt87aoc8kwr7fkyll3xvhm9l6dtk',
                username: 'uddm31wjgkbytfu045josdjyqhhir2vi1a0cnviweqiorcmzl8lcevux78iv',
                remoteHost: 'zqyuql2jiflo0xmfo6k981k22ycb7fhmi3zehpbm543o1u4j4eyjhrnc3wbbefuczu9slnbixwgx9uj8rtra5isdcunf7gdhrkxfkh9ft82ls8okvwct23oa43xyvnb53365o4vrau6tqnalgbd1p8upxddncm0m',
                remotePort: 2028556250,
                directory: 'k81obslxyvd3rewxquy615dzlxj42h7skyyo31ykqv8n27nwkqa5v6yzz04ngo14zsw5l4d0u0pxz0mug240m2qwk1kwnsc6vrbe1awn851gs5zt4fby5cbrm3v6ikh03f248q94pn3k4mk9qc5gorae76mnb1rr6riq0e2zoe8wyqzuw73fnqclormvinokve26gs0suozckobbynbbzpqdtp5raism9py8pksffrs9zn94jkrth2u56dkw02qyfppkmljiml3ti1575tdkfmam4vjjttz6n7dd2bgdvv5nv95fupfukug0ir9pw7aji9srwgfxn3it3hp6bjjbhoxo8uoc8i377obx96okksg39fs7wivg3w1r6h9bbpui8xgbdjgaidmenn1qy64kzdjj7sq3ex5z8iapjtyarnruw6elfraz9qcpz8vg0zmuo54l2ry9bmiqhilvoa1p3v3xll8zhdq13skpopraalgdf99tnq90aqy5dw22785uvhfnzusqcyajgcbzlcn3j6klnae81jn4y9tkkuy1hjjaq4whc1kcilvkd1t9i72ddoi2h2zaock30jj780gtjhmbg9napb8ecxexeyxmkp6nl8rdb66av8xt6eirjkvjsfw11t9qilxosx8xqtwmdza9mui6b15lqext4bhthtx2yvfy4n48ih5b8lmb09aq77lc00bn3peyxkbznrdjulpjem3skzkfcds2jox1ijnauv3k8bkil2ll0sgxm4ji2us1ort6hm64fv9xrytbgvsm5hta4b78uewsl340oz4zzpm8u4pgj2k2w9sxx0xn5v6hor8ltoz60u8s0pwoy62fm8iv88c2r11ndgzaz7c74eetgs2ne3955hh70c3vt3f0ylhe25p4svia7zr3ix6nk8axgeh2yyqkv5kwyf48nfrkks9vs3dy7xgq1yxlqpa9x81al5bjvvjb9jy4aoegytmr5d28khtmbr4r13do7496h5554sq4ols189hf',
                fileSchema: 'mgji85sw9qrdiol39r2o89gh1l01l34hbygajpjipzddb9o541hnv1c2wxavtq0ipghfv8glez8btdbp17yckjwt1h71n1or2bx59drmt78u7gdj796y8pyfx00jctenzn7hjy3j6czbycz7hzvmy7hsfb4nqnckbps5akk1yco0d9spus0wq3cqsfipmbq4cnkpedxtx3tv5tk1924maql5fm16qvl0un89aaq3b6385f8wvi8e8g9i31mkica2wah89fx0km0i771dzxab0mmdfluwdq0ehsc63euxtkhff6d1pwq1vs5ytwi1hh4c8b90p6gp27khmr44ymxdfsnlw9f0fdos7ka6ii4rx7t0ydvsjck27fckiexb0fy3d63fdhcx3f47z3cu8u2tpt5n7gztzlqnymk9i4kbb0srmu93itpqqwqu2zk6v68apabhp88apykg1i2v38yx2in5s4f2fc32lb24srr7j4tfwc30e3vbptjnriiwsbrhl2lfb2d8ts7n02d0111y40ciloy84z6s790nor3slkqz0nb2fopala3lpzw9uowf6s6a5dpxguyt0c26qcscjqp6qra5wyl7xgjhlpy4n5w9fcz1rwx6hi4l4t3pg6tgujitouonyv94sj2ga7miw2tjlilum4dtj0r4ast2gwlxknfd9pc6i7m1ta9sacl74an5jh1ptqd9dcueueubpg89uvhckkph27jd7p2ps4lu78x7i7n3wt4cpxjnyudr7slw86i60v5zwxqp3a9hxoo1kx2jgs53ox6ymhmeiy84ecd2rkinmskdrrf9z9de8hi5mngaui7elpmdfw7rgsdey62bdak7han8zmdqccjcfpdoni5mm1o7qpmls3ruyxci6izi28no3oq3krjxmjhc2kxptaez2u0r6i0ns52wmafu0e4267lpzv8x8qnxyy6u34u2jjx0ksdkvmn396f2tqh4isa3hps7qstchjhbjqtmlgh5ojdvkqvdimn8',
                proxyHost: 'lpwvb7v8yg033gnuvcwuyxyxnwr05w9ocytmtpsuk1ucd1w3z9lz51pecnyn',
                proxyPort: 3916189109,
                destination: 'i5qz7pdjkg8qd3v9o1b2fs4p7gox2nkg0tbum38s69f2w1sasbhkgt09cguybq4t0uqtxfyifahkn05oy9rt4hk025z42l8936xxtmg01kktz5apbd6u60shxjdhsxflyab5wce3p953r2cx67fvqiro42271h3b',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vvczdnty0xhn1qv6h6sxz4xffw029ot59vace4gr2wctm7jj73ud89khq6wmfqzydt7debbtfm5qq38krf7uozjdc5dkr5rq21civnq44vgsqmjkll18w9i4di7cmeabhqgnpnp6zkv9hk4pq3w3ok7h2647lfyu',
                responsibleUserAccountName: 'ye5zg7cg6hveovrtpb8m',
                lastChangeUserAccount: '9fucg4u83n8sl5oply8j',
                lastChangedAt: '2020-11-04 15:27:48',
                riInterfaceName: 'x217gp63jy6qxwr86c26e0x427150pyroow6yar0sf22b8pe3ck13adcx1j2etzt4unqkr8rhbigs9f2bzcp98b6lizg35j4z3jebnfgmm2xqintmkmjrnjugtm4dzoaobqqxksv2iodqf2ftqlzufo9biqbenmc',
                riInterfaceNamespace: 'kc14ha30s4tllw7gspijad1sunr5dg99372mtrkjllqc5d5ig74p1d9kl9u10426k1mu5ajs4tzypz70az56p7ecbrwsdlv6be3le6k3p6lpmcxqgooneeowhs8uk3igi9u45qgt291u89z9i19w9u2cwylhtxtz',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'rtie39n0j8gha1lz25fv8o7chr1bde30sphwdrby',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'h63qkuz6a5f4tvrx3o445kb03s6891mujj83wqg1kz94u9cc9c',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '4nffg857u503k17deb698',
                party: 'mkr5nwpi6ze9059on5f229odwz40om9gvitenv6d7nze3gcrnsubjhpp76cqb0npapdtr2cxsaeylqsg0j07cbppr3hyc0qs79zrsg5o04674cd2c21yjw7zqjk12sv9xptooqhslmvy16revwrufxz8gkwh84b1',
                component: '750scqbm9m3f89ceafuzt1f3ld0kasfb8cum0lv9rua4q1co3i902v1oqsyr5f6hvfsjq0vbz2cwzqkfaizjym9op20uw8babmxps2l1dv5obj9xq51hlr4abytc80usl7tfeusizbvw3sbs9pou0wxop82tjekc',
                name: 'xkkxekrkmwpyd8k3m971j3o3ha5yuptbxcdkfeamxtt4cgcvgzedhyag42q07i1bq1hyrm7ex9wijn6urb0a466y92db73jc6yfj0ovp50jvrtccqykxx3ysz8c1qp9t3vf9vokih928f1ffvel1e4vefljc9nfi',
                flowHash: '5jhqxa4pe212uflj6zvccookeh5iqo7qknibte96',
                flowParty: 'mtew7u9n0zbuqm70fpatc13u5nr5t7eqmjs340xh5kgj99t4b00lhs8f4qudghks5bfhoya3pu0sc8pw82b2h8rhzluk2adiibphrmcsm5mbfgyw2r996g9knf7wolfosiwn9gq9zo5cf9czukqgcrvqbfjzfng9',
                flowReceiverParty: '4pq91c92kwa867u247gtdzkzt0wuifq1h7uaqm63ticy5p60aaje1yfu9hzvww089imlfex77lnxp069y14p4muw5bmmwpl9r6e3ijkcpl3yp5rhhadccx1pr3h3db0r2c238o9gt56mvdhszxkka0xrrfx6h5a5',
                flowComponent: 'vyt2k38p09xwjlv1q4a7w38latqrywwln9sx8qqgkmsakcfor2igkxcxxw944u7ah5pwijnid2ndihfz5eb029txlakp0rrq0dq5oekb4vexm4a83cxnbn0p03kidwlr3szg59cf47ghzs6bxmvwno4okmuruanf',
                flowReceiverComponent: '2bmdbmvf8qo07h9ofw8qqniq5ga20ji5qil8eiu8zeg4uk9y6cylqebenx8f4toqegruva3o60wezz9d7ffwp825b21cdw7uq7tsv5xr62scdwxanp8jem06ikjrqi66a6cwdrtgdskrwcrepoee29qwhsy87dp0',
                flowInterfaceName: 'zc132l7ubafznchcotows8se429kdnk3tjhegjq10k4ebcmrgstx8kzgpwzegmyyrudejkbn1lpmv4jf28dm3dqaqwzmfi4imqgnoqag3r3dmm5cofffak5ef2s7qyye8t078fhbyrwzxtjk9xrzv27q2hirnw03',
                flowInterfaceNamespace: '7dzrx889rckcw5b11ovguiaygic5x06nf6aqu0pp8f5jbcxrkdx4e5l9ydhn7f7ek65gj2na1ey2x9zzyk7bv5h8pt4zoai6p4dadpfujqd6ezgw6bklr4nu8dnuq1ebhxurt4m593v44ue8t8m5w98ujollc0o0',
                version: '80rgbi5gxa6zomgmz0tw',
                adapterType: 'pa1e6g2fuh158mrmu2zu7hpwhv4o9bnlv5codqokospcnlcwi1f4opymh8i3',
                direction: 'RECEIVER',
                transportProtocol: 'w5zubbv3c5cj88lj2d9ccqzpbrcqe31tphqw2dn1ku7pl5i48rd7s5w09g5b',
                messageProtocol: 'fdpytqkjztbw8stiyc7wowb1yddzvriijjf2jv7xpbqlzvy4k86aym58pz8x',
                adapterEngineName: 'f7j7xnra65c27usz18fwryxrvwqtad4zrwdqzsad107gqxez9hr3ezpjkb5kv6mbcmzek8w0gi02fqysud91dyy45zfx2k0jkh34x8qq8hj6z0k2ukqkc9l9zju33k13uqqascgb5ko4cffehjxpyb3lrrixo1zw',
                url: '3bjs8qahwc7ai31k261rn2he5ohgu5v26sxkx33jcz1k3nuvjlblb0m46pn0sgydmxhf82g7fnu13dxn3fosfv1w3wsy6njw4q3nsz1r1oylvyr2xuqz0b1y5ijzu8u9myg7zzab4zqjnhrhru81a778hcx77jhrt5a588ctf9srrvw8hqro8idsezus4hm1ax0yqi8m7yw50q8x9qyxpi2brmnb1gwkfg2q7yrgu7nv5j9h82rf451lqyuoll7zrfgiy3lkevdjk6mmxwwmqd3sgeekp8kfsx36t149mbw27yoyhalbwvx552uzgo6u',
                username: 'x9datj74d4m0vl9o6ztkj6zfjothz2x0i9jk3514nymn7fnos77d9cg9fc2q',
                remoteHost: '3sstufc01waks6yukbgchamxmmy9tl5139wr7z6s5rh6une5zaph8810efrgoc2v68qxtlm2dvlmkfbqpvuatpuo9x7hrx5grag75dib0apf1n32r38fndf2qrjj8v828qrpix7bcjgd3iq7vx34rtllx5cozzar',
                remotePort: 6882926014,
                directory: 'j65mlpk8qcjvbj078i5izrdw3mczeww8j7gngttuuqn4n5xkkw95eujonofumwg0ra4yrigmql5f6ni715djfwgj5udlqr0sis3mxrmsnb23j1ddhg5ygoyhgaekmpqu4ux75cqgo7xlkzy402u5wcldz1vd16igtrrwqavbi0bgmhcpr1tc9784hix749alkxhqf6yxy6tskf11we5tnu95yw52briyjpulok24xsit6cy9vmbahwgpaak6r01vyfgba48l6ffzr0exv8idvwm912vvjp5ud84bprki01lhrzmh5wri8s77s0d226lkwk9mt4a1k5x4sfyz0vkm3xc1bj97gaanjm0js5hchf0etmx8fe5ito51hzkczi12vhmxwesnksdu2frxr3qtmp9lnx9qfe9xpicriuroz06wzeg87f4cja50tda91creudu9lnukn2k2jgh4yy9ecb9sewbypkl5e77v6zs8v1jyxrdsuobnz8lumlca2e3rvnkpw4t9qsc29n7h1lph2apwjdm3euuwm1v2dokvmr3vmew0r16wptlny7y8768jtjk0uq19ihlgpsxm5p34omwr3ddyzfwq2oarz4e8bdp66js83pp3xc7bk59fsrpl0l84ildejxx76j1hfuwav271zxo6a7d8b2c1rf0wkbtg0ml5ucdb0kikoc8rtzrao2mahu0a4zd6e2slkx4713smna36g5qtxbgmlst3va9ddjwbhucwuz0j70cqr0d86755bw5f2g7u6gat0rkxjqq27p2jzw7lifpf9xis0xw3sf4j9zrsmy5gvnxdohr4lnhb6muusm8ljtub3j0oy3t5mubllbjkg6cbnboprzv3ichh14h0fk911gxyv547nbuff6u0r38wpnujgvdbtyn9u9f01393p18dk61b5fqhykwqkziqm16hexscp1mh0uxe8vr09v7xn87eoz85ts3n3v19h26fj8znekt2voo6wq9d3cdwjwil9zg5rp6z',
                fileSchema: 'bxyy4ngz9dk1jm8oo23mrg7wdcb7i31qtse4x0ctgpbog9zimxx16pe0ue0oprwtqfa3l9o5jzzmlg3e0dczp1t4fy6viietwhql6i62jkp1lucmrtgfh5g346xncw7sjrydccupdj9voamdzn1arpt6od813rsjg7143n51f2jx9m6irz57a66h4e1scvmtbk4xbafgu4obny41d9f45d64vf3902nmiwryemmuz3yfrdc4v3wk1d4h6o77e7sswutdpv1p2ka1v8fhvpe35cvc7p8jqi7tgip1lxnm86xf0vjh96kjq16dwxq29anbn4kmm53csp6uwsmnow3hm13wea6hrf8kzg7dgrzulm0u6rhujhgwlwxi1mswdx5evtxbubwgaogiumzxejyhb98csiephmhoweu5sulnauwz0nt48tkoruz6rn9vl7wm3fgnc6i0ntyat04hs7wckyxqnbeyd3g09kwwkracpcapcnt6fn6cwstg25by9vt63y5g1aoowjn3oz1ot486yu0ipev62zipw219toqyngg6xvvk3gqcwj94zozhovazdc1ngyffns7dox5k9iismb5wkmrtrm8ylnvn5lh4awnca3hsrt0ea2o59wedj7kg8lc497a6vr6nwzlp6hko2endprnudoqxt50wmbrph4n3329hjpmc4bhqltusrqbktilw7gjcukq0yf4l48sk1vlkjm0s9zivahkueeh1ccpf7ja9wmkpp1f3gw04tjomuwy3jwmpqbkgzu27jytpwsanounwk0224c7rbsgjw6oe4acwiz5h1927donyo8hlilmmv3k0piyy416rgdavzuphkqs8mm2hvuo5xdz8lp078nhuw4zcp2vdi08c6aft0nqm3xnmxqs4aey44nh4wjofri09bbjyu8zx6ysoci7e8iigoga2rgfbcgmtq8yehpsocfdmhp0vn2qyo0i3zqqeeswz8zbhh9vm8dy0xj8mxjlqaoxx6oeq5s3z3pva',
                proxyHost: 'wwcyr4rde8m0cl58grr4cm6oncalcmgzdnelq9ujs8iguwkby36e4nbjbiw9',
                proxyPort: 5977636237,
                destination: 'aqnfwz1sl1u8jbi6uk4yjufxebnpdcuzy5tp2oqxaxnjf5o0fqn1pi15g94ymzavj30gg63luegw71rsejlslkk03oetibnqnz286wis7ew4ykfli61htxyp6a8xjao449i7a91vxluvz3l20urf4m5cpc69bdr1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'e6yykywp5abj3qb2t9nl8y9wopxi0xf25woysph9agur6p6pti296pl5np5o5dgdwqa6tuksfrr8y6gzptpyiuvgpfcoi8c9a6620fw35hss69fy7pb6z2za4f9yflqpew0v49nrmiouu6fmvvj8uh5g2sjk0jr0',
                responsibleUserAccountName: 'ks8ofo3q7a4mgthq6q14',
                lastChangeUserAccount: '8woc52xfxkbbuyk7n8v8',
                lastChangedAt: '2020-11-03 20:34:33',
                riInterfaceName: 'eiduao8b9e3rjexndgxvzpmtzzd3w6x163n0pm3lvyjd4fevq5inuluwnv4uo9yn2x6znadmeh4rp5oo99wo8bru4nchbsfcfm7hh2r1h1g093u8mse63aglc72iq1skdpdvr6xe6v1im2g84f55ha4fdpj2n7qg',
                riInterfaceNamespace: '1heav4de5tkz5c76z58uzhggtgjtt628fhc5ncjd5zm0aniaephuxznx63wvlwvpfde7f6j10z0z7ta7ko8igzjfvoimi4ooi2wx591eudodtu0pu208iuj8jcsqpgx17nufna7wkuuppmh83xxiah0n2x5mbyvt',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'be8emqflrbqbvv5p57otw83ls2pejxu5pqxv83bp',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '2ab57ppvc0cdd9klx53s2ywfhct1b42bw1jeiokbf5h8v03usi',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'rsqsuifrclxbfa8aiqu7',
                party: '9t05cjn45dvv5velur9160dcmxcaxv6x3zd4iasj1w3iq351xj801pgllf2utb3xxqnfvhc624kj8u4fylhhh2xgg9afjmq27hr749xl4b5cb9bdbzfwk9jymyfvfvt72to1fe7igro2h6d4upes5ojh56ab49owi',
                component: '6szux3wrgrvsejsiu45co13ntqdlsg7fjuvb80q8lw2742jkjfq0wsvlf4d1ydoffmplt7bxe6nakf7jlnt51lic9f7oruqn3hmwqprdc89p9xe2n5uzzwpca0ding8pltrxjmmp8kibx0lt0nrmgud2v58a98d1',
                name: 'bq47wpbtjyjfp6jj9iduh8ipxgn1t9o8bi49exsadyz6hxyholua1zxa4lb64z4yq8kfm5kq1yxr37fmkkf86jsdgwj2z0tlg9xjwtpgivsxvuvm88gee2oy8kihe9h0xoed7rc3ocwaog85n00fjwjp7jexc4zx',
                flowHash: 'jj3smtlb4pc6nrgpx7t7xy6zrilzc8q5en3n8gw1',
                flowParty: 'eioq8cd91rnu2i4soakuq71skn9732bw33eq1ufhl5y1a06cpu5g7wemnv7gn9cj2mqzno93g2vev4w2n6pq9r88azp77cmhqd128wb50tyr9mvm2y3u1vkm6rdywq11jf432pik2vai5wr13huo7n0dtig9wrbm',
                flowReceiverParty: '36inib3mcv6oz3oj1iyveaurlbfm8al8v68pyq4zm2q2bolh1dh7f29hnih4ec2ngec2yhbh008ip8tdccp2ju2npt86u8ujox46s8ieg4u9h07pgxas33eo5ompuhr9wn2wfb0kczeovv0wf606gnk0rh3ante7',
                flowComponent: 'uwlxc455c99jp1wwaogpgqdqq8uxygh3ek8hzpdo8id1d9vac5m1wsocwlwn3g5nq72gmzdoplc90y2vcykhds3b2469cn9ztbivnif5av8x9b3ozukjp419i5842fwjxnciru0y7do45guzlg1n3di78u7bhfos',
                flowReceiverComponent: 'osvcjj8r5w5ohsl8xrng1zqv80yp7bjos5cnih60btlog3ikybs3lctzhnjp13rxjqxunixwb6z8ufufzco5n1x8v8zcdu6mzfm0ozt9nj05fvryvylabt38bglsinu7212lwzw46eljlo92v8xtoswjm4tcmxot',
                flowInterfaceName: '4xd41oqdef9nagau893cicoq9heeoavohv5ohl558ffmjr0wt7ehfq5nrwtarhlwplv2q0cztpf00momzs0kr7za4kln819x2jp5kbnm2idbvae2h2ijxde25pxu0m2x8m59bmmk9zwnrl6eytlxzr5f31wqqpvp',
                flowInterfaceNamespace: 'zt9kw8r280jen4hw207ciqwa5y6ozaxxbysil8d8nlucbm52xyz99iea60d4qdcyc8fojdvkv9sik56q0js5s4nvtw40ik6sut3zsleu5udcave82obxue45gb56gh7pyjc3oqvzuofz93g1zh1f6cxzg96lukj9',
                version: 'gblcxpjg3mnkpxstjoil',
                adapterType: '52ba28miu1urtzvae8dzl97ifrs7crsxdkz3cgpagn7vfak4009mo4jtzuyi',
                direction: 'RECEIVER',
                transportProtocol: 'lyk1kuomk13qdat84x8kc5zo8p3nprppfvv36jf0vxy7mgrz1iw5y5e65qdi',
                messageProtocol: 'yeclicdtwenzi240c9l686n79hdnitqvfanf6lmrkfp6dw9w9xoec41zr8x9',
                adapterEngineName: 'jkrm7qc0il9wtmsh8qqped5858fbhb5dialrsg4y6m1jj8o5q91cwyzlriyk4pm8ozvwz35kzxpz4s7hulru4o19vp6djwbhyxvgtcl8zm4khhzxq1n4epox2c3l0qu5f3ozp38ecrjs7dix8ek3zymkdq8dullk',
                url: 'oc0xp0czohl2s1dja0xiv1z3lus4yc1oudvha6bmucibnpxp37nyut3gqzd19bpjyed0s9g41d65e15ysje21w1q5q8nrn3vy42sb3yrreb3h5kqff7p989chquaexw0m0as5idurp60wovoth0eo5odo3zg2kc86lxvq64q51ze47ixwsem94bs586ojjkckh3ifwzoscubb6nbj1qitb8xtzsrs83mxaritd082ok28dt5p7gtcnv2d3p4fosqk4jn2cqqpncuzrtmipre44plx6yz7ne291hu2hr7xbzvm7st83bqg0sybua78fcj',
                username: 'zav9pwlcexz1fho6ocb07wxi4vtg455xl1sfh8850epadjvfp61ecptrt5f5',
                remoteHost: 'ozq6s4i50yx1ql3tduxiwvmp92tbpu1bjs4gdk68koa2dkaovm9kt8fxqthx4ymy7ptztfvjhd9n4v99wfokn5x9i5giycl1vwt8n4ap0evnfoa0a6j433bs36c626lj03wu2f8hv3n3510z2pagsd4odca3d9h5',
                remotePort: 9246494416,
                directory: 'wj25sppw0bvw6lzouc4qzqetqqjl3xcjjl8fhlmwff9qw7qu2gyus1fki1dj1wt7tm9dmv2jqsvjuk4n468n995ceafim9nxx1ooqvmw6x26n37k97flslsqs362ssqqnwhh31a18ixszsgaqqjk6cvzr4o1rf8tuxujp6o9hhje69hd0w4cvbzbngl3al8ykhuen44jz9rjkvqy0yauhe8fu0gpmx1smorq1y92nb2jeaevt6b4secrgsn8ba6bnw3qm8eg9dbivydm5zffimuxw319xxovmlbdk8cipj9he729lhl2b453cajicaljy8nnwpvdrrisvhmo0lnh233dg65jplzw7fjb8x0rf4q6fx8ewflq5ufpmn4rorfuem49bkn3b9izdbrh63l8ussowaahjely7z8cgi8f6h8v56opcklfunm657h77qci946y3tsrnkireo1ficcgiqd4pan3y32zemy98mvxxh691j21ki6erpydkhk7nt3p4ggsnlwmtpztd1z025sjr0yqmoxjunt5itadu71dlix7cjfozanp4ufgogf5xqehy0hx49srh78b1lft2svwy4inq9u88ftptswxmy4e4w8hanjqn1aw2rthhhilqxy0u58pfp3gf4myybnxk725iipwgu38udvtloisrm7hvbhl9i8rehtyol75akfpdle57zk1nhvqv4llolpim1e2fbffy83285jjwsiv95v6e032i7r66zwar4rsofldf7i66anm2gsv3rfn05u05h2zfftdegla5i6cdseg1jh0kmgqf1n4bfvsf1hi4chlazaqg3zkgqr9pmpd3hrk6xn3sf1tayin0w4eof2xwe79oikjr6jdm25s5uv1vpc5rz5svrbqhvx5foidlvpoutsd5s8ga1g2r9wosxjevmzkbusb2jqc38ifp8nf1guohorhm7fjmv4bzq7wi92uvsrvtbojcb2g9b9h83cg0z14fiq6n2txvjrm6rkp2aq4ueh6',
                fileSchema: '3uepdeaago9vkdvexfopbym8961tgqh2cq8p7x2yfdh8o29jfkt8ve66xsgu7on92n9qeqh4a5dpkc7regkr2erzyiapo7ot1mns1ma01ww6xo6x4bwnaylvho0t93b5r9mej7y6xzttkamq5fxaj4i5lvi7g9xk0ppq752fjzbv812dbrbqnxnwtb5eams2s5c2iwl2x5cwbaxr8ijshhkusy4t2ib1dohe2bbq3twq91zxvhx5zh1j7oatavewib1r8msm8q9moiiyyt3vkm9bebzbw2sfxkos3c3tw4t8u3fntn2ji68j00eqj9pi9stjs39tpzpuukdv479sbjvn0k2jhbdz9rlqllmwaktvp1ujdbqvswj6zl9njghie5j48omf3ntsdkgspl6qph0ypm5ole5zh5sucnhyqe9t2nb41fc8csgnrpb9wupeupwmpsy96phf1y147h3t2jut93d8u8rmifsw4n2fgc4gpmg6em3wvquio0c4defu783xq62u963c27era3hci50saz4y8hkbpjwvo99pspo2k9ruw7fx28f3dmreeojjjsvt4q75xt1ehdajkphpvuh4xd8lgvi53uzz1mopjmic4i03ippyboqsgb6cfe7gjujj0qwj0j61zbggpj58fijfvczir2wlxrajzui5g0fp15lx9nr0oud0yzmc76bzcjnvrh4grppwa4xx6shsygdktnrdgr7tnt5qiz06ghw75j9chxz5ndrp535jyou42qxedvh4sttzjkrju1m0wce7dagi4clp6gn07999pamtdol89n4pnoo7vab56zlbxp5d23dbmtc1x9adylcnzcywssjj9j8zrd4aahdmslqi686tsr12n1so5ytwcoqdp9jm8vdjmplkv26adiki0cx3n3qbiobjitm3osowqn23j05cdn6t0eoflouiyju4pp70cerbwvewygt9pj726t8lu9frfi218uki7sz0cdg0kvv0kcq3dtcyiy7kptg7',
                proxyHost: 'k0re4b9bejrsviw64xq3r46zz9pm0cej2dmr81zfqmk5kangp3dft5zzgx5f',
                proxyPort: 5910011688,
                destination: 'hfg3cjnm628rjlm12rdakd8s4txhn3qqvistsyz6uwy0xy8oeb3fn363gfydvyn0kn983qhvku6ll6t5ucx14zuk8mv3akfe7rfz3jhdyfag9cehz99qr09nueucxm2gqfpecr1wa4dvn1h6tvxtxcggtdc38fa9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'd789v0e6b6wjb1g2g6ox495erb7ky9o19b475ce7u9ckdapg7at4hvh54l2wmt0cgt40jeeppyp46o7v10wvyefeg5n3tcdoscxs9k8ek8mwzm6z4c9x1z2dp43v5elct23uaqq9oe7heuwe29ue9sxo5vx6plju',
                responsibleUserAccountName: 'n6j59kqf3fou06imz65z',
                lastChangeUserAccount: 'dm927976n36y6gtsn8l0',
                lastChangedAt: '2020-11-04 08:26:12',
                riInterfaceName: 'h6r9nuudg9dceci3q7nwpglcmkwnvth6pboi3kuvup71jbiqvml2nhzsw7cdzcvvge36tinu9vtfg697i4jopnwk4gttgrojr35dedeqet0qlbvwn9duwm9ltr6jc7nfijirtop1svvqyao8nka69m0t25yxovmj',
                riInterfaceNamespace: 'q9jn1fzlh6ht61xisszf43gwvyaa731kysrnx5l1j57d82qmih26eq4v6jbnnocsgjpxajbvo8guh9bp2r3l6eph0rbifwqsgo0yqma53cvgmvn8fx9wsg8i3u3cfxdawtdrpuowzbqrcko906s48ljbgbvvatik',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '48wmdv8hai87nn6vyebkywvs3qcr5npzcdi8amhf',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '3hyyiixqr3pgm82p97ifqmnpr1dttcs23kdy1jfu25upll33sf',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'pqq76llnoxhukd5zrlhg',
                party: '67x12bku2s58ssjsylx48lm0olo56zxuexu9rx566k2uvjfq5ktq9km13cobt9375p89l79xx7zl3rb9v3edej5f2aksyzohyioo8422r0r9dga64znumbnbynlr9cvmy6lmu0fp92puxnjmmv60098p75eoheal',
                component: '4fmz9mtvet1c0dofx6q31yv0mie90ddqc4k65qgcm8pirfnlvqllfwiu73veq6gydgzl5o0uo14g2lqxf3c0epq1pqqv6wl51q6nqpx5ksx371ma7m63wogips6nssvmfgj5elo7pedo4n17igroodfdb9r04pezr',
                name: 'zjbpxg29gf1k421hs9dibz1z5odjh859r07pp7afv9q3onka2tewf41mvt1xl894frq9cc56fp0aoqe8rs91byx7dfkum07m9f8emwjb0fexjoc7uhud0p9wxuffwn7e6l77tqydw18383zpi66ep6e8joot8yb0',
                flowHash: 'o9x6d0fgi0jh7gsf4g5t6aledz1chb4cw81kgts2',
                flowParty: '2szlpi7kq1378w1u8wcl230ia7dufh9ybaq7m0hn5nzdw4c588w9pdyrjrsg7l7t97q7xiwo7u3s0l4fujvco3agm1g9t1r34u5kqh4h1snts781fre2elbezt9mcgqarmejvn2vlwdjke3olrk57fqamdaem9u3',
                flowReceiverParty: 'ga5qdf2nswna3je0j2yxaaiyz2c68gielemwl3qb8ejsw3wxcmlurulzu8pjy94hr1rp1mrph38am2whj2ldatjf2v53x6vumjcpbym5kceni8tcazviqicl2jltvf17zux4h28iiuce8to6ceimjxgf45xuyf4g',
                flowComponent: '4hirpsw1co3qf6oooe0cdqn9dgv67fjxncwwu6oueo8uv90sotgwr6hxq3w8o6wmkpaxgvpdlhvb23s4rlcnryukzjk67qepn50x7f78mp44o9urqzjvgjhce3uvft3wym9ze0fb7cfvg4rxls26eevhly4fp6ho',
                flowReceiverComponent: '8lz6m37s7xdq9fx4zsa0ybo8ilnu030t36aoudyelhmq279qpcfqwzh42nw0jm3g7omh6931ju9y2o9zyoqzswr80j1dmx71fajl0knu46oz203vfy4jtyl91bnpvas5sfombxf3hjnywtiberzy7qhqs5pd8gfa',
                flowInterfaceName: 'e94n4pkydja1t1esmqzru40btkt902c4lvkpdftswk5bjh195wmzcgz5edncmqlu8o3wu6tljdk8o31603p4gmxlz4xf7qxru86e2fk9su7v0gg7p4662myxrq2jb44et17cxxwvtdu2q2m26uyy421bzdwp2p4r',
                flowInterfaceNamespace: 'f7gmg4l8loja8lrqz3c0xqx8fz616msr6tn48j4v32p9iy46bk29mk3nukag0nglixlvdil2o5g2m39b1hj559g3hazh3f7ou9nd5qu12t3imreyeighlcwtmv5k33oislco8ijch342qaipdhw1ufn22as6katr',
                version: 'rm11q24zbm4gxnx1gv3r',
                adapterType: 'b1tx2lblzhqz6myswzerrhrj9thmysac1f33ktqrj296e2bc9lbmquwqx0ho',
                direction: 'SENDER',
                transportProtocol: 'le2tx7yjuuiu9evvqrudsfn2bref2v631dx8g926ryyi5vawxv6h4mzpuemg',
                messageProtocol: 'fjgyci86w840n7wkg1u4wnxwoj2tb7obzbseysh5w3skjrp2fus1u45dvnvf',
                adapterEngineName: '39vn1fnfp6917qqb0krwx8ikxv7gzxublp0t20cfytdjpecj3z04hs88enhfvdrvslwqktm12v12lpm47xrh5alkxfd916uuobygjywq3qtv1qdnhuko6vz7qvry7e4h89ezizd1eaasrzuz5cgoet3ccc01p8m7',
                url: 'ujyk325n5jgrfgy4zhro3nyw9zxh18ulutvbn1r3xidmson7kbyegexdxenfvkhvz0yzf0tucw4815jjsvesfxa6718sjyni08g92h2hwagvm4cr2hgrbhuddighndzjl1rpnsvb9vbz6834m85a498qq2uz9x8uzti2wv61y9lu8grb9t72wswu524oca1ydupfcgw195bkq64fxnbois0gs301e2hmt3j4xex4apweyt85tn4z6uktjvlkkn5sva1jpu5xot3gs1jeeoprz3mog6it6rn8gsrjx4jh8aco8rznq86plj6lhb6438y3',
                username: 'ab77csy9o9dpdwrilstmo0payxpsd915mfho576alkzxh1083bvogae4fqbd',
                remoteHost: '1d3cyta6tn92ojdatw4tyafvtby2x3ul3nw4oa88pix6zay7ftz9b8fsiwff3ygmtsr8472h32z50gmu1go3zx8sfuxz073wpqdlqtmbg6i4gld4f5v3paqurvsn9j9u6vqdbl7s9nkkjw3kkw17mw7oeajopamu',
                remotePort: 5401459021,
                directory: 'k31wu7ema9k5urr3vfju6c9cd03w7zgo3puuz5r6qhrxq5wfpdvdo8covrd7svz3u74qn4e1tcor40sru7wdeochir77yj8grrvh1v7ik4yid9ype40r1l8ehelqkxpnx2nfc2h5j5ckmk8nh8nev74bjf7nqws3hp4cgpc8ywqqrurxk1ucuxocqryowy0va8lza0215lunsirhkbxtgaqmes8ix1a6lldmwlymf4i2omy4bcypu43sg6u028ms8yegyp4pcsem599uicjbt58hoce8f4sp6duyg90ugx8fz1cjd5rclizw3qt3bck2ob932tcoaovm58euytyww5riufz6hzpgm4gfwzahzr334mki7rr5s4oyj6x4fdk8c3rkkog9tgfntmjflki86abqadnd9dyc749qrli3m957ge4u0i3b8c7thhkc5wgpr78yyr03nohay4a7showvhm2ravs78zes7t9qxhhjneds3se6lxv339vhx9g6rf3p6x8bkasfwl3cl5m7qf7xdn46tild8s2ysdpecudb0pajr4k5vxk3nvgtvlpyt9uj1htntp4iqoi54trmilx98z3uihsshihe1ibq8dq9h43js5lvm325y520qliucbb0ndxnlt8j32ho6tmyb4umt0h6fhdoje05brdnsxr0lokz7o6rp7u5rf39i3o6ldoljtc2yqzhyyba47r4faz6pmts81h7mgypnvv798xezt55uwputq8wjjrsx80tpcfy1ngb1j9fmzozm7eihis9obv38tp8iu565ye2cknfehp572shi417besf78aezyj5hfbr8g8inlgolgf6wqti2hsk352ohrqgrzuutzrrz1jcykz9yxbqqs63b756k7ga83r0rlyz5iazjwkhozvfng013whw3e8pww7syfabsduolx93r4supvgocs4l840u7jo2cv7avqxugemn44jok1ydebvp0tsfmiybdv0ghlo53ruteg3jrxtfsr7mm6c',
                fileSchema: 'z2wu7rqjvcibvgkcmo723vmfr8nwaxgjgdtrbeebb8gargq0req8evh1ztq9lw0cc3o37ckuywl6zvszy4cl5r5ryii6m9usgfrk16icbfn7olwr41hj26looert2j3301bd61w3cecll7aiz4gel8hzqxuc73fd05q5rnx6x63apt8eaqyse2z3m6vy76eqwx24d5mapla9qaoxvt2qdybcm19o5rkctkibr58x8rob6176as0uvqaeg3jpalzb7curh3yf677nx6jkiwjsf8bor493qb1ordawruuvrmd7qtkn6rrle0fas2dqli0gqd85011x5vatk01cdnzprw2xvnya4l35ejdxi42s6oawrj8lrf4ds9wyoeo36gya3z1rxxighdzsgrdvk7pmf87ontqnyuuqyuvhh44odtesdl42rnopwrvrrgcy1xt8j5wy92lodzqq4b9c9l7zdwexr99oog23vw6q5dauagyhjnnuhrnkhnkt799z6uhm6vng0fb2ru2db3ln2mnm2dwsvz5pxcs4es3ywgptjttxvbdir7apk4od2nq6r6x86gy6fhfvi4sr9gf75i4mexqvjmfpm8h05awab4uddigk24n3fvl4hox2i97lpymfsb3cyjiiifq7pcjrnwp0g0lw3mak38mq4dyllmcxox89ejj81lv9sfxzs9vs9bit7h4s4cijcrgvp1udluy4ieixc17c0y29q64ihxyffguzw4se342hn8sg6situk9voia9mwuwtslsw0ojln5kxtkyk7i8v1rarauhsw2tnmy1zixd5uvk2ibotno46ajvbx3hfgf206rvabn9rkcq8s9y1kdwm7py32ym5m8qqwnia9116xwobp9pgpx469b6wfd2xerydp74lhljb7ayqyvklw2xk1kjjltm1sew587i7px9pepb1tk33n7d6ndp3c7dp78763nnnn9162iuamuz57pelyad1i1krhbo6dlk6xm7rz3jnirer26zexzd',
                proxyHost: '1lwv3p0enm7ereld3k18rztzyjf24ewmaj9c0a5f3pt8dk9w8knpplteshwi',
                proxyPort: 6625381698,
                destination: '17sgjumn45mib4cv8zwwk94injv1cpn9hdi7q556byk4rzlp37bxpguttnewybqxc0cqbd11v1csrl4at73v23xo0v8nn7gyznb6gdocqn0vf3u8okhmjb587sirz09tg9ey11jdfqyrgkjzyfitc9bm6r8lgvt0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'u4wy5rhg21is5ydeqoqtaknura4ngqtlbyjouarw5rmm5aiiez1o0yrthccyprts57mpwyby53ep2ol98hzr728rmuuip6mnfl2ayqngirsja81s13qor89b5xbkzveijji0w0vkojz473nntpi7opvig68jbba0',
                responsibleUserAccountName: 'wm5vv2t0apfxz7r89xug',
                lastChangeUserAccount: 'gvt06d9zoe495ytk648k',
                lastChangedAt: '2020-11-03 20:14:29',
                riInterfaceName: 'watoymdfb8z2wehv8defhodstynfzn4vbch77r9ij66bqizwj91k42vq55ekbww3dxn9lvlavo6on9y47c0v3u5zvlcu527fxh73ylmkpkexu7x92x9orh4aou1amx4j5mr8bh5tb55hevppkeckspsxq3nify84',
                riInterfaceNamespace: 'd83w8i3k26ng5eatxb185a5zpld7my4vl2ksk9iwesks80a5w2cyx531tombe9kgd2y8f1iozfqus789qjmp1s7myjns7ynx50pv7c11qmsmxkkodbxzb9n5m67ioewv5biiuzd8nlafsb2sjg1uvlvoglqnrxaw',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'oqg3kmwasoi1jxuq1adjpewenvrul535ie9hiohr',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'x0z7d32yikwyg76fm5lgfvuoo4p69uz9bs6ylz042ba63b2645',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'vw9uvqr7wugrxvjbvtsk',
                party: 'xi8ib0fxa7pvokfns22mnimp2jk03ee8a4n0n7jm7qyjpc1l29j8occsfm3z8scfitib0vf8bt2piyyvgnw1pb239dq9gkp0hftnvkkmdq81hxetswh39epjz6pz1x0srzmvgoy36rzmjl016xjliiya7ugt1a04',
                component: 'ytl0wfu1drd0sl8xp3k4h9tpm6ao3jqswq6r3egerfi9mkfnrmlrj8nzu3grue8gphsydd3rejvgjgs7qs009idpuxqug6ghel4z7j1k6ptw4bnz0ejmp07xr4tq7l9gs780o2o2foo088m58qocmiam8sxg8nea',
                name: '2lskq9n80k5up3zob4nm084xbrgp93wjpe10s1ydqc1ru8m76am7ibd09ou0wf28bcs5rays9mo4mzag36xycd0mtm0k7o2xk8h4okjt5nb0hm3nbi7whl7yhaqp7hgaqjb866ztgh9ezasiajfsww7owu35awbz8',
                flowHash: 'hsjzjugi1br8d6pf7xyk6slbs522s6e40iit05by',
                flowParty: '7o17uwgnpwn1k2cyor64wskpgc2k1uwxbbe2cxwxokgjlifxf92kv2p0egmgemd70x0q2820ncshd9wznmatp2pzytud29vjk54hur6kyvh3stbvggay0ptylf9q5kfouaby3qn3dh28n3qxtu2gom2iuny2yvh2',
                flowReceiverParty: '3y0zsygvkvnkc2l07c9r5llnz864yrmwfem5pvmvshhg2dnnggydt9iobdtyvx5n28euzgsm4w0iyv63u9x8bz7w8j1kx2uc7ncy4b32qn4it49jlljqcacry3xh6gf257ofge2ok6ik6ezstmetrekcfofc7zvk',
                flowComponent: 'itbxt5h5tmf84vlkd4mtdbi4r2qtfwih8nib4rk9tlfsz0r9yd5fq1owsf5owh7l54t7ydldfx9zoifsu56olma5iu6byflnzg317druxwbfju5nii415glawev9os13ln69bes999ows4xaer39mq4avpajq6iz',
                flowReceiverComponent: 'r6vynflnli2d8p3vjurzhj9wsq3oltoru71qh1zi4yr03lkf40igias1us15f00l7rya0nwqc79cgn8nzjmzdeggs154w8u32421odsrllh5xazmryt2ok8201fljg6iye3x2ykdvnkudpsjg7fv0vpxdkypfymc',
                flowInterfaceName: '8kbcjtv6dbw1tm28dd8262itytwcgmmrcspg5ise0y03s0lzjdd6es768davo92hr2qwv7wgibd7v7pac9389ibl06daux20thljvt15lkr5wzo810laov0rrjma4qius5bnzglcyphrrmcqcgo8bk1c7mmqdxz2',
                flowInterfaceNamespace: 'atwlppw8atf4xkfnito2baz56gfrt70u6csezqxu1drr618hj4x7v7ze6w9n42mgjrk1ijbkcgi13gj93h91qhqlvcd5edvs2ld5lwkynl539tfqnezigm5kkln9nau9q9ty6v0unav3v7zhv8jr7fstg2zx5bqz',
                version: 'monmysn2ox80g18yg9zq',
                adapterType: 'd6uctjqrogv1zt2c2uk7sqk2cb0p7929uw6e7yn4u8famaz40h4w4lwxkm66',
                direction: 'RECEIVER',
                transportProtocol: 'afra9zi0jlccairz5mlewy3larup6q9qkc02nixt0lbmxa3avuwn6o4101l2',
                messageProtocol: '6ragwouhn0951iv8haihfoqc90ucldloi77ko7i75ly23py91wg77fu95pcd',
                adapterEngineName: 'eylosulfs79833ukbr3j6mncmundocx0qnox17jthyzmcb198skfks4avi001ezi6ztaohhpm6ti73gpyfuewrn19rn520rfoplra6id9s1n7xoft1hrslvfk9r450xnxbasyxodn7n0765qb8m151bebird1bev',
                url: 'ahwer8icmei6jtyekcyco6u4h8hm3p475vel88qv6v1pjwco57p302smu73q158kikjvmyg65iu2epv0hglm2adc0pcquh3nl0udkxl3l87ivkmeyh1gij19sr1wmpl4t8etwa1zckmyissekteaxfkhuwvc70c8h7tms8mjnzfm117hsu8aexq1zhchf7off3libn2zsuidy1ahim3ikehxm35unvpbke0jaq7oe5963t6hjsty4cy95yq9sash02ud2777n3a1yauzxj2ay0msgjw0gc85wocac9lkakf0lvi9qsl9cfqqour1k4kw',
                username: 'lh0hngvmbm8l1j6kviig6rd5wje4xxgaow8huntzy5qc7yqdv1ct06e53z45',
                remoteHost: 'e2gr461toynkovadb7nfbgf8t1xtmozxgvlpmumq69x441iiowemqqehjbbam3cw4z36l5ouq00c9wjh36vmxwxg38csxhjb3kk48oadhmpz4tmqyjr5k83953964lte3yjxnc3f56d5mpvoo4p9fatzt6y5v43p',
                remotePort: 6060825963,
                directory: '6s9ocojxy5iytpl358lc5nt4rqr192jerlmcdoa874npuoprw3oxshufmznqqgzl5sqanv5kfq0nqv8scyourmf0cs1r0vesihuay6a7g29dvklbq86sdog0u17l7bmw2b8tnpa2l27u0okt19cw38claxx1u67hk8hghtrkuynll1on1dlnboe6yquuyq6sb3qrrx5gnt3rbiwbpv0vlw4f22twupa3e6xufotfn1tkhdf4lnuaoxjgjslcp9anrf9cg5uz1wjliyv20uonc4r26a0z5i143wgy1dockep5ln666zvoz30u5bdtw63kxhipg8a5hfdnmcupip37mmz4a0xxhc6o3urgj59kc4krd8mva4b4yl3g91bus195n7ii9pfyliwkuf0e2agt3sdyafhwukzgmh77bspgl3kf25eptlk92m575o5g8ntxupwzw0fwmjwbaakf17x1vssu3amaztkjhtpym7cgqvktdi65vakahra1n1qkkccyjcpywxr5dcrmb5nn4vuilmpczwf7dlr3z43z5n4lbnipfs2sv4940i0didaodwyfur0in7i23o68q88zogbkbxurieg6981vr7t9vjrlzrnt50uv6ogr008kfoeiglhrmui12vev7th2s4wvqkpok7kby8aozuljohl42jyu3u17qq9l8dyl5cbpygnnev7ln935vrvtpaxuro3nw48vzwdqdgvar0g0ffqqjxxdvd0cqppi4a8xblfbdr9gipfposjcxcvuxs6jr1t4wbakx19t0dqlknzjkp5g9zc9tzsip83l8b2jnpy2ox67cfvjdjvugcx4c0qz2mb0lmmny67f3m7yv6q0ep555129a7o6enoyie2cnk5yq5anmri16v2ccj6gc9m2rgfenmniyn395wuza1zktla7q5911uax1vwpsbxrh0tizqdidc5147kh5gf8lh9ipcbqyndf439ocvpsc7ieybjgvf20uy7psmplrdgptiymer4f95a6',
                fileSchema: 'aku4edg1uw2z4e2jj89ebej3wed5n78pgg3tba7fvqi9fv7hodqp6jik459mzc54tft8vd30fifmcuezxo7k5480b8wtn5mnnjhtu6it1y6cqxmtd7ous4muz0149gf65uqvlcopvfa1jlw2b16mff2thxnnyr9dabl85uhf1ouijffex3rjtkmr9h207vtjir3mblgo98upm6mmvnoou8wv9shgr1ztj0al2r61bctjb5iawqvmvskrge7x7jg1rtf8ji6sjhnjvpnjbx9fo23c0rzlgz6z50kd5adkwzqh5v5zb2w7t8tl8pku656inhomgbz9idg4db0lcanrsz0tn3klj5jjo75b00wh2c244p4rqpkahqvo608gbd4c5i7ux9737145sj93o6cwhnoyhsshdln3mdorlim9rloj6veesokok740lf0soqh7tx4yanzlnz2uahl0cr8y69tcsscuqc1q3rbwpahr9z3rdemh2rvyc9xv6s0yxrz9rmayguo7avq1k1dglf2ckgtsudnl85y3dnvuangdpltaz5pf0xrfkz9m879bpgrcsa5h3kq8dtyr82mb7ov92vd2vudharba5m8mru0fyd8pv7xzf8klbgg5rowle1w9wjsuwk1ma74pm1uy6b1807fymeovaadg4ayj2yh7w9ccoc2xdt7wvhp29t3ijxachcyulwvy68hxb2u94kkoag0hjfktbdeo0k9yqdcvshclqcsiu0artgyau6c93hn9faeriacvpo7an61cdy4crkf3mp8w1k5v9suicvla78yt704y6gthcc6wbtzwr0pq09k4d2vdqbilogitov6av7bddncqsqs2o1wyikvmc42qvbrt8cyk0g2a1e4sb351w31wsrb7966ckmk125nog1ktlwlgqjkl8c69gztu4ij42qvgc13yu6ds6s0v72dyp8caf2e0ivyco3xyluqe9edfjex10expr6qujv2h43nvj5wxi9nr0gwy2rfkq3gw',
                proxyHost: 'u2bkt1vxrd9oju6hj79yuijc492g5cxdcd2m1b5b1333srpmiztgxdyrj0z4',
                proxyPort: 6001506367,
                destination: 'kcehyg4026kmpfpcpt84yjxksuar2gss9cq7bd0dt4y6guflram1ndw5q16d8mdiatt5629ccv1llqo2is4q1z9fg3a869kaivfjl1sxs5m4cg6umdg6oivv0wsmq6bawrnb2lyxb0xubqzi4odq8kxsms8cwovn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qt4exkn81oivi9acyqf0r0walparr3oj9pbmif9p3w22dm9u8l7yxw4y1br9ii66acd499xhkc94adhr5opgtorknkkwez6voqf7wv8b2u5wu6117tarjf6if6n7si9ia9j7ianiqkkr6et56k498dxbdczw9dnd',
                responsibleUserAccountName: '86hmv0t3gtdsqrzg24d1',
                lastChangeUserAccount: 'cx9zjvpjgfpbw8vkq8bd',
                lastChangedAt: '2020-11-04 08:02:25',
                riInterfaceName: '5k2ikt5ahvyawu3j6geuzve4a68ofxegvbfo0vtfgmrvyj6dzw7iisklb3cm2eog7zq73xsfjbesnfh02692au4o8trea318gsgjx8h799gei15bj0y1xzvc489cehggbmx3db2eexm8ym1pl9acj8bysmw918yg',
                riInterfaceNamespace: 'vc5a8d1d3e9la6wnhkngm89zm1he87v3pwdg1qm9qd1z6fvjij3j6azn0ucqcxp2qt4lkzb77rxm0opp6qo3r9nr6ir6kxcyq2ucwevmd3e8y65mhfiw08ipi6gl1ovsyao9rb3tpjt1nw7fscnz0215mec1z7ra',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 't8xnyc2cf32ikhweriqeg2z1pwfxi5zne37x1ys4',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'e3vc5e9c4yam9bw5qzjydq8qw27oew6hqui1i2qedtz7vfe5a9',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'fsgmvubpszq5z0opzx8v',
                party: 'jsyx1rcge6gwyjm8zu4d1i1nq9d5yro9a30t7oqbh2sr0pucd95cs3n19ib8zsp2y1um6lf2tqbjkbzv1898qqb0qf03eg0x4k770wj37pj5uh8lipffdq00rlwklygr7f8xh33q094tacsjdezk3q5z9qpuxqyr',
                component: '7lroxddu7bs2i8rzbd91k4dhmvfn6m5u080uic5mprslbqk1vinvuh8e6fwwpq80vcyjvc2mw52zomo34fj84wm9uxbh75y5vnk5ng7rw0fqfnozcxnybndjpf4fn0yuh54nw51u7sqghz9d9gkzqg4v5ithxwp6',
                name: '1jzpbdw4aooz3erz89b7wg26juru3ewsf6gvzj2r4bltdqpbkl1pw0j4b39rilvkfj0ofko2hjkq3ypeenp5qsh7ygydwdw0r4qxx9t28u5lay172zf4o1qb5lebxw337sb1euvxyusu7ikimqnx54hdmkmt4zgf',
                flowHash: 'mtyrbc0ckvpc1hmjnbd8izsu9q9imjszk84qhbx8',
                flowParty: '9u3puirrrvoxts41ez8u27r6qi3cidn3wfxe08trgf2e4i22rn6v0djlz3z60u8yha7ns3nkf6hu4lgr3ryknxu7og92hp41d7lvzncyczamk1kwdh6ggrgl95el12v8x0i5uqr8q5ojnzhrm0nhzcj1nzvgdh6lz',
                flowReceiverParty: 'f4rtjopwow8roehz6e96ko0j9ekpy4b1u9fcfarre2xpg6vl49m882i0ia72cntg8pkwopycwuo3nntdk5znfadocmti9mdnnrd26z6l8895eiv5glyyq0ibbwzalf953o0tyzigytcfywnurxyzo9yoh72go34e',
                flowComponent: '5a44b3b9dg732fzujlm159ld2wy553002ihuj792b51088wzinmhwqasur4j2opzhfjl23lvnw6we0651vvo3u1phqe02cxvs0q837c6ccg0t586qrqy8771ibz0xb4q5f6yyebn19docn3gbauizjueht2xvqz3',
                flowReceiverComponent: '1i8ii69uropsym0u9fy6p6hvk6v3fdpeare5o3wrt1l5zfeg7pqc85cmczxw91d8dnpuc8fgpt0q16xqz3s96tofdisykn1ua7bxea2uo02p282v5fms847tlp8qbatwdqpwxlqbtslai01jy34lft0boykuvnm3',
                flowInterfaceName: 'pmhyb9zb6j3d5lc2vb0dwo3wxi7ysi3yrhplri5zj8cd8zbq0mmffpprb83z2toy5yd1hzks1je43gkuzr4w2rno57ornkhqdxaod31kjr83se0yyhud6nfuxz0xqerblbmvv5y14zsz1fqvpzr5mr9e87ca1mgs',
                flowInterfaceNamespace: '18cuwxs1ne5ufv99f2dfdn4wkl7ka9h60ef1zz690wsqedb9abyesulv60dpk5iheweu5b75w8k8imrokykjbiamyxwkyjw2fy0p1i3xqtek69f3yzr8ch0sz6xhdj5syuilrjdad82xi4o7f7l1v0ns41ij8bf0',
                version: 'svxse7qsvpfhvaimppbc',
                adapterType: '0w4wrz1sdguv7bp8vwrazc3k99tsyqsuyj1nw9xlcpdr1ff3872kpwejoh2j',
                direction: 'SENDER',
                transportProtocol: 'gc341dpmmyfrcjag41h3r1sdlvnu57sldu015eafr186bh0knqtdgbdslwpv',
                messageProtocol: 'chp1w3yr8s50v2q4wnj0ift9g03je88r55l5fz15h1ir7jle6kqrj7wyefdi',
                adapterEngineName: '2eseo6tj8dyztvib5pn0stqgin9cb8qxg8wqpz9rk2d1bwdvl05vtcvfjbmb29yd0hmey0c1fwucoyo2r7y3ycwjwk29tfjuw6cpendochy0tpuiacsup9qw88n8o2aipn5b2tjtcw7x4qpe05d5dzjvsxienqof',
                url: 'js9lftfuixpje9sqbfq0vr3uqplxnren8wvxd97qo9bmjrix7itdvxwec3kl4n4abrb741mxos6qi9kj37674jxk3iuoi04an13uqxa13y5t2z1v7odzgf8x18v3gca36l1o7g8ec5t19o95e67lsbnu6e29vt0psqv8zc7ckd33enw2trekpiyjja73nbkogiec1zxvwfoiura37bvs02f0cdgurfoau0zxdmya9rrmntlkra24o0yytnss71emfvyfkl34a6coes8804xdjnrtvqvfssg0iib8fb256g8lvepr2i7jhog97j9v5w61',
                username: 'ic7324k3dyv0l4fi8j8iwdeamm2651cqc89j35bg13he2avd1v2vgazow8e5',
                remoteHost: 'dx70xllbuondon59tq3l4pa013dwb59cm6epphkxzijst06n1i5noqjb94bmeumxwwu16r145fwlm6tsy25jjbzlwamzaluha7yfxtpfr0u48zn55xx07spstcnc0qws0gagct05i88c8mcs5vvqrd3yv0uamj16',
                remotePort: 4657985048,
                directory: '9m1fqz22nchv1kxiqhml07zi010xvspjvf2teizv1v8vvot1cyltqgxvliqhojfuzr6kt6do7px3l1l5e6od1neg30ruq6akcenh2mudvwy7xk4pu4wfx9d5anlbu43plh9dq0m7d5ono3kffhby9amo00ay8s9sq6y9vxli29omhil4dysaxg4fh25p7g85w4sx42tbsy3ux9pco3kxx3ykl9h2csyj89o7me37nw07p1lh431mbfz8wf6h1mnw30x8q43a3jfb46bnub3n0srhbnpt3diys57yx929lmw0gbfmnfan3wmzm4igvevclkrbaqr0cl6ikyvyz0pfcne1b6d4rbmb2bovtz294b29rj5lwus8mw4yfz62sgc7y76f5qsubbvlfxzjsmavjkj1r8ltyonkalg6wgip6ncoapov1hrpbdkoktxnicdxgs1i0ohmicparnky6v4y4devvzdlibrwvpvvd7mgfory8u9harpg870e4zcaegjf1238hh0y0860b8p0ofy5j01q43jg2m4bedim8je4nykdpt9fd8ezf7itugd41ltmdhg3gn2han6wqcbt839xsqsvae0be3npatao0odoox451nrqo4eahjfterzeoyh3034xueolvc55yy9e55yg9n2bgbcxki506y4isn5nqd2cpksh4dx6thirkwpjqz10h3wy4fjosuetq9h8rav2mkkbyo3oh7hxkfbpngxblu2gum7hpn7paxrwqh76seqj42izoa10tyvhvb1nvcn3lo1pcwvzk8lqn99c7sfthckbgarpmwhvx8s9bypfqviln2twrjo7qoiw5kolnr1u7jisgp5h84gmve9pe0zwxobxyv00epf60p1c77yedf99ljtdo73dyeqok2hpz5gbisg9potcb8vziigajt5pr1rejxr44lwb11lsoohmp82bv6d8hngo6jdan73gc0zxrcczpjgd3z3q3g7mtemkj21cx2mwq6qr9m34ctclqw48',
                fileSchema: 'r95u0hl8r95eih2fedodcqyy1ao34d4lezgd8olna1rlg6v04avna4ckamyh3fqq8wcfhk0zvrsc0pamh2q3xtj6e7ahrogye7lup5e5njt0dbe7mbdgvtl77irh1lsctfyenqetos9y19dhc3pnmqb5vfhj5tf8w8wugdhnjng6c2bt5et421btk0jjfeh8t0hsql7eyjipqqgm0oxvqlcxbw9owicwmv95irs7jbogikh7ppqf5vppc1xqbhbck1byblpvkqkasrg3lwaumlxbpfmld23fz5f2nnp1xgupqzuk4pz1rp2iu59bsm8bo25rj28yyq57gwae6dfdp4tgkxfc4eo8wnwgh0w96q4siliziaml3qmivd6nim5x0vmmfoj86l22yh0vqrg4qak3cadac6gy37dmdvzorhrhlwwzf5173ajhtyicwc2dvps0h8ognr0qryhrpivwb7b00wwnvsh594sei1d16tf4ba1xwekd2izs9zjfjh0oxu5x25nb6delkdok2obolxj8fxijrndke5pnwuh0wfh9m6kb4vl250qvjsmnazdgrts0wp91kznukxeie3jx1kao4t2s30zcwqd7qe00g9a6h0cryygqr2xuv3siptwucmgiadeq52l5gbsv3ie12lzid7gjtnwb765a2x7sh7hz7m720k535qe021w8k5l6o9i91ws7w3vg8wt2ymtk37pydkuc78owhydnfe0hz945dnmi3mwyispmddn8pwyhhzex20dusrx620vt3aupmd74bkc6k7r70i71u6nvfmuiqup5m8ky6o42pbiyhndr8fx6o2z465kbpf40h6ar43lfsztat8712kn8zod3q1f8qq5f47zx3hxfb8rbo64ajctaz0e8pih7zuus0659o527lvtwld75nzs1k0te44rmlo3fj2xkpb81p086qrut6ajs9igl1nfphp8i6el54kudkwzlpbpf5bxcritjjfquh2cyapnzw9qcbwq42ixq',
                proxyHost: '2o072yp1jv7aktm4szuyp0lgfjnjmcpkesjd0fev9y9h0wqayo6h23u7mqrf',
                proxyPort: 4483131911,
                destination: '2s9ymqdorcvrzi6v3dnznyyghib3ogy2djcu9i8kcytob83xbshe4k90459x24oakqyoj7ooz0uf576v6qvkbz0gnae7vddmdbfqfg3laqx574y1948f8gxfi8qdy8lcukrgp4uenlflsl4r8vki3j1kvati1e92',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '97ihv1ohqw6rcuivd5a1v67eehuxalbmc226020u0j5iy650c6w9thpytrgst7dy190wmeubkmdd25kajspqt0stif5hezv14yyhdmb14op1bhy5revvp8hv2pnjyew42g2k02gu1p81io0df0nn9kbwn891rhyr',
                responsibleUserAccountName: 'faklapfct0fbo12uuljn',
                lastChangeUserAccount: 'ohvko57pigmbtmrl5px8',
                lastChangedAt: '2020-11-04 10:38:43',
                riInterfaceName: 'bipkvz5i4zv0g9r2bhutrz1snyylw1no1qbur1scn3fru71xhvs4cb2kzlcff4e7tx0ea6b0j0o0bpuoye4boem34l3a8yexv4hhlq6unj0uif0gt4r8p455q2dsiouwydun674p9cz1cy8d7xdysbfi2oa63dtb',
                riInterfaceNamespace: 'wdflo5oi6kizfe31993zt2myxnv8gvcrtppv8wyngxaie17cvnk0l37mx3of2tig1samn8gurp0ia76m7t1511rd4c02mg8eebkvxi7jqr0ywpvdsdsvjwyv8poi95wthti7t883kuw406j5pwkh9ldyphvle0jg',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '1jypor1bgxb143ye75lpcpmx2yg22wy2tyi16l87',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'e28vn77jcp49cd1v5swlpda4rloq0hesvh5m1jnrwvunnefuwr',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'tyn9950atnapwtpcsexr',
                party: '0rk3g3xf8b8nm8tcdj5uxol5lxmp0qz1lf0mvrnsz3dm6r6ewxjfndbgip3ehz0gcgb2xt7ai7fr4rpjb1yp3dkvvi0ogw8nhjcnmxo4nr9xa220bw2hv8zprme78p0yq8w4y33lyny0pxt8881vtb6hz3f133rw',
                component: 'xbcp86xd8c7bh4t1aajfash3gmlzye0vw0rp55i99nl49cxczcmx2sit0bq8vb18rpfwbx63grn038ighn2pwdqk37ofbg9wyu0eh1lgxcqlbifs9j7djfem03ef56uymom8qea34cyoovc8vojntu3v5n6zly0y',
                name: 'soxmrotu770uif5fwuqknvehg8r3jyz7rbhxc9joly9i2zefg8lafo2y11uvq3ozwuwns8i5ayf4s3wnm0loawkhifltkjvzrzqw1x0929lwiwgmqsr89oc9wipplrwzcnqzxrbdh954v6t5ztcy3hvpvak889xq',
                flowHash: '5uy5locn2r7ipo6mr48zc69dkiutu8q2n9wdkz09',
                flowParty: 'ib6yvylwcgeiqaibuq1rwx23pwgq269cw13r1lbjja9pz4064cymqt913l6zvr6ub5u34332r2u8lwu2yzy0fmfe9r6ivw6mv0bqglrfl2iee2y8sj8egzcdnys3lc0ayv155kpfzl9ccn48si7lvgjoyqkfcodi',
                flowReceiverParty: 'eqo7jfm2yn0j7ojoepwagbcj37urlypcjmcqujmex1dbwb1bhix9dl0j46ai88ivr4evjlmcl4pqk2n3sw8mw9ko7tueyuvee7nrzdzz44s1o42kaz24rqyir6r2lvb6yshcqmfm0do4vzmm5fgwbf2aj4xmnduuv',
                flowComponent: 'nujtisidah0tdd8j01zy92ic1tilqz8v7wi78j3v205weneiatwcyjnk0ol4sgtzf38wnh339irhyx1rkqvx46udqrjezjsc7dz5oauexb7wo6nrxh3e2kjmbz30eu5gvt11fkntm21oafs4vr1a62k8w1i9r2zp',
                flowReceiverComponent: '9q829kea26c9f2qmh2kkj66dq0xjtnqawoaarc9lopj5lk3rkamse8g6rmxf4rg23gk35duo24w89q7uqbqsbgg17sozisd0gyjk1175okrh0el94ql74ye6yq8kzac7o7vs1ikr7bxb4cey7wfyxq2uq99l0c0d',
                flowInterfaceName: 'c81aj4c1vzpv7rleblhhctgcf5zejw4bkqpf64o7ym94ki8656xvv1cn9p6aak8slu2wf1rzsy35fpn8g3oj819sclbe1bm5o9e8ax8mf2hmjmkc76ovj1xwxzz9x09ucbzbpwhh1bo61e7sre4mqlrg5zp8dyh5',
                flowInterfaceNamespace: 'jmqztxjunej8nwhd2gv53cg1k1xjyrhzq5xyb78f4hy6fpilwc1knh4rw34gt7k68vq44d0gbew31vvutpxw5z009whxawkzdy5gtyjfas16m8ypntgj0ehb1ztbtgrn7a2sf98pquk1a29wcv0fjklzki9k7fhk',
                version: 'kalydystux37nlx7ui8f',
                adapterType: 'l1w4ido2y4slmfft7e746uh875uauxlfyh90dzb3gg50gpossdcbblh3tyij',
                direction: 'RECEIVER',
                transportProtocol: 's94cuj7iiwvgwvhzkiu0x3xhzzopggtuvypxdyetguq4hdus5xqs8qmznznd',
                messageProtocol: 'elr8iimj492uagl70w5y1oscwegyb7jc5ytz9hjem459lgirooex99k0oi2v',
                adapterEngineName: 'mprhynbtaremco848dsnhbsr76opwbhhprg24sl07h1z1tstw459tzjakrkcpb320upn50uct8g11o65jr4huna55ftrcezrf87j1by8m42ztskt5v7x6ruqpoaash4a5qt5n8d928qw7i8zai0xpewmysq8hrj3',
                url: 'ljc1tbpz6zpfkqv06x5uneglkdsvhc845zuy427elsiypi5oy3vehlmxj4r7fuhg1bo210w7piwof48032a6jzxtah8gktk1xfysy7icmsqh94tlkpvwxyt3f6pzk2u7d9k9njtm7xn31hlg97yqkkvcgl7htcz1sqrylk40mrz4yaslenwv0a0x7xs4jpujl87s3rahkhtb81c8o4v0yt7hyr1vpbsq1cdgnsv1sxthi14q4uh88vrh1qzk03ujw4hcuf1tecvzx3mrhlvb9thhoeo7ic79lusptmg2zswkvqobe39014w7onhrz12j',
                username: 'hnla9h99379g00n81a6yisxqylfihmb1gdhafiwq6d7cjxqa7atjhith4rg4',
                remoteHost: 'paonh3nu650syrw1ryrt7lztlgyfwiv1108fy4egxv5q33sfl3robi8fdwfzc3u86aftkd08745ov75y19csnrgw3ysyvrxbnph2fxg7g3svbl3fom760j5yd80pvr7f36cs3riasv9gsf3u7mx6gefnp04b5ovh',
                remotePort: 3829930594,
                directory: 'rzz4x58d7skn6drryv6atdwdhcybq4iw1t67omiej96f581vzvfjlqicdhspg9vaidjlehi77psuyh89c8zllokdaglk1anpezu0ycznw30si9zo9e15pig9yyb01iovayw9mw3m8ympe4rkenejlnhhfetx80xdcc1np3vqzs8l298xtjzdo0l395n7dsftupu6z6ubfn8wd6k9bm2gmzkrhgenkhfjf5z5rzig13o302sb2larqtzoodgjlzcrtb8pt1ldntwik02mget3krftasm3r3nze7q7b3foeqfw77c7j23cxjgq4uqpytc8knr5vmrx86qkozv8xvrcei23uvmyck1d6l2i1r2q3r29qaz2srq5n9o5f9xqf148v0273md17qsbx4ebevdh833nprdillqfd3w0g07nbtcjmdh0qy2nofypqpezz1luamef8ff96xhutj0bdr2zfixuf6bh6wa1diyt2t4z9b03dpqhu7chj3opv7tsojis5yi3o9tzokyc5p0mbp5i6wwvpwqu88tj421ln9q0zz6wewiblxl4fwuuwpw65ibjajogbwvdlprb9ze1wwyoqjjxvg8ybnglxtaonm1ylxw8imbjgmhdlxrrbfrckf7c6ccgqfm6d0faqilka18gxycw27iy2pynlb05t4cgcrmdk7ri9u2glzepdwp3cg2tq439lczak74y2caw1rtwgga1wls7orumufhqc3bmdsm9ora9fgaoe4afcou8ghr9igxstt79x7c4bxr7igjoyeinldx0xnf0zidavs5cb163nx63yflpyg5m79zu6qbbhztevggiqwvlu5bn8qc4h3z1cmrz10d5rqv7pflban57dtzqqqo8wy72vydzjwqjj89zvta6d5axi5gfiena5xlfe1baqvagdygzw5dlzv0hi9ptatawzizixorjrao7qfs0d6udmign6mx4s2obt40ozrwauftyyu6ijglv2076clnsw2f6yirzyk703srl',
                fileSchema: '45k5yqt7ai6f8yfg22pe3ruspgcs6xukanqcn8nbpsc9zs7wrfuzzeete9hb3o183jfmy3jwvrnc7xt491b9pm9jz2q2afpobbaogjyjh9bxd2l4bycccjra2pquw7w1bhtycr10am3tfcge42jxfm5y7x7g5aqcjw2c0yvnjnvb2yjnn304dxxluht9ssidirxp5svv4parmhvf4ssgrdjy4uozau96dc0z6ujr9onymdk9stz98gmbcv5mzh7kfcwup7ly4ei61o83xnoglrknp9ubbg4ic3afagf4oa3c7bggvudqxl5dva1k5fz21qkvil4sc8y91trr0u77kfvydt2q7p3mknkmv6bqhrb3evrsk1jb257ogtxd52emo2m8rzkzljioiv5mvks6vqw2fzjrx1jh9akkl7apkkxa2asl3xc3tjf1sx7nl3vadllagrkqppcuf371p32ks0jjstakx4yqgqmemqm58gjn5o3n1ox6p2xaiurx6l77tva5pb9kreh1pr4jgq9zkjk0rit2i7zwv7xxa65gnf6fp6a67h5ag73h0ic7gtc41dolcbx1izpx5njf0nifczzcaulmom3q4s7c0iquf25epl80nrlfgbrndibscr71v3r8ke1lhwq4y7lfcmbx958ltxba5xw10i3qh362keovej8gca52y515roz8i6f8pnsoprm3cyxgmu8ral9hmqxkm5cm5zx9hqumngvpjly1cbcesvjs9ilu1jice4gmuhknittgzu4pbwfqxbiaz1jk1ijgfy1bad7kopt8n6gt64dwtkhghmb863qus3bryws7b1hm9jdv7m8mbrtcss9hzxnvu3xj7ef6uiwv284182ktowi50nt7qx5rok38v0v9e3ccvjohugrhr9zsectek8wcnsncxl7idgtwr9dq70uvscprs2wz5q5gjsamn7qxixx7m9lfojs4yk7fbuh7bbf8nj2u9vdsbeyc92zwvcu24enbpr1c799s6w37',
                proxyHost: 'x2ov7zes97vncpx39vmy17p3z41vdjdxg38trgrbnm9ozx385q36xk71gmry',
                proxyPort: 5994109715,
                destination: 'fzasb4zqk0dtorh0bwcibncviez6zh6o58nry0r38jyf0m1kwlg58fse37p15suwmp9iv12h3vr01b1wd2ppov7kipp0vtd6ttgt5rkpylnr04xm41t05qyya49ua92kphsp1elwr456s94wh487ebh9bbe8jj23',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bmx6s4do083x6d7948mke7bijxjfjhd1vj1txv5j6l7o0he84cjy16xri9bd6mwgfdd040a1540dv4xjbnmfor1jxfb1th3fc34v0ngrceoj43gafoaxpif9eygxbiunh8ea2usn576l5lfcpryrclw3wwribrlr',
                responsibleUserAccountName: 'm4tdecq6sdawbziii324',
                lastChangeUserAccount: 'kgwjz58neozrbdxqgcme',
                lastChangedAt: '2020-11-03 18:27:36',
                riInterfaceName: 's6m7iskokjcja0laucw7tgowx0lprkabsmn1gun647d4gdeq9pbcyjgbgc13v6n008h45csuf0ptxqx8yoedxnmda8qwctplasgc90ady9eq8za0mxro67dlsyajm949bk414g62bctz9ml1gj3l1x3f8aqnet9t',
                riInterfaceNamespace: 'ef4b04us0t8c7rrkpagvj18fcq16q4e0bqg2lzfjt7li1xtoglb6a582sg3rbjnxzj79s5cky3a0sqcd8ulgy8d6s8ob5ivgj6t32ft74iqjcgv9yqeqxqx70svdkoeglk9yp1kg5sx2uuo4ggb04dyyyhvioora',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'wh1zsu5ehp88fwlnaqipeih8jgtix86sx8wr3kig',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'pp1be5zln1ps137ind7g2jye9e5bwxqbpjy836mf84gm8wi8b9',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '8ie0s93k8zfkz5mjqu8p',
                party: 'fhlov607jtfm5vh6fv7wz4prlrtcarmknonria0wupq1bao6a5zqmnm1f4oon05k8vaymckxz2bfj0r8znhqov5ev6sjo30hkn8qznkogzodbqt89xocpqhmrvnrs80t7hcdrppinbth42n0oll86k05wpnbsduk',
                component: '4v6iue2tpafd463n7p4839pgkavbsay1qzud4azy6k5oe2l7hkfu1q07kgk7h28hcmk4aah9tcrlab742gb7hguhxnlbpy3ah9ss4rwenrcigif30zcgf55o4dd1zgyahbxia82s1rb93g44qilpn9vwc6ov4t70',
                name: '1e1ju77yhcjjzopwunaxqrpi8o4dn6p6gzwtx1i3hguxxivcohess82btzi9lzqpwwcpz9247bg9r8oi35f5wdwifkottqkhypco6b6tnunukii9h9w1e6gu5nzkp41sp17cv7ipvw6kltxdsli0r5pcpvd5foyp',
                flowHash: '8he18nvvxdvo4tnni59etkjb07viwgvbdtetkhoz',
                flowParty: 'gkwf7hdqsfs0sk2s6s4imxeefofzqexonrkche8vxlcglxxjpx9ebwbhj3zcy99z3lmrym88mzn2m427zgz22mmzns50tst23xei8vcn5a1yn69eden801fmomtnkr8ehgurnnxyhy9b8eic8irrlgq4ctp3ug9n',
                flowReceiverParty: 'ovk82w9hkww2j0mhjq3kt10o1waklue0wryftzedt3mltmtzxtcbi6dsmlopnta17c9jkek3uj0zu495zu5ez9yurfb4iy5nk7tdgdc65i9yi9yja6d086s0fkm65gr4c7md10hueft8rabclqk7lk6v8379cjn3',
                flowComponent: 'bjgmjo0354ga2hfy5wmpfiib5lcsaviat0kq32k35r802zj8pa33cabs4i8hvu9qo63hsbzvpn5be9ltj7yls4ykznwexs1treh7csp0sz4463ykfx68ihdgr8u2q1tl2g48m156a1t58bai1jm5drv0mgspgf0fu',
                flowReceiverComponent: '0kio45b4r7ri08kqcx960h78zos9t4xbsjuy0am2lxeqf1kd79bcpo64dp82mmttnuidmeiitqtulg9h0fwxy2msuzklcuq01w7g1abluheqlbs9xc1xsrybrpnwzw78bn6d1loh6c900mx2kkcx5r8krvi47ehb',
                flowInterfaceName: '8rx64j9fdgb837dr3gykrcf515fdn3jc8nuwro0gez99b7nujbfeokdudufd6r4dy1r7dl0pci2tm7yuau96dt1bjwbx025ucq3xtok9d15kqw3dbnjdthlvfeu6nh4qj4xlvq0yrpzo2y5wd21yzi9b2boak5wm',
                flowInterfaceNamespace: 'l2i2fjzynkuacreiz27n1145ljr83nzmxy0pl1lrdanba9tsd76qtnszr697vje2t3dhbryjhg94bv3k6lj26xelorecsuxj2t6jn65tif6teaxbwkpe5qvzex834hom7iaed2kghr0ipi8xucapc1ljs6gfj4sm',
                version: 'uvs8pn99l45407orrnwx',
                adapterType: 'fu1ryif5qltfniwtp7h4ua6c038ps3u3qhl85q94f7eu0ossll8mo6wvgmqh',
                direction: 'RECEIVER',
                transportProtocol: 'ip1b5uqj34eqsgefxxbg57on5ieosh30i9ctv0s8cmav9h8izw4m6rnyg1vg',
                messageProtocol: 'tu5fp7iobh39yehw5gdqlft6uia95hmd1x2yc845u0zeri48tbace2ekiooc',
                adapterEngineName: '33ax197ful5wbmsmngcl38s915xghf9itqjy30f4q620ox7uvvnylrhcclcnax4w74as4jxvfstrvbz85y42peqcc56b9qyjr1w6sbgvwtxn7u3gtxvghfjzg1c4yv1fl7rff8ab7q2dpmz1zjij3uelhbibuthm',
                url: 'uymh8pahfcpgfi6sul8z6yu4apitne9u4u2oteemraovn4j19amdbci23t55iw31e4iw03q84eskg08fu65hltyiv1kbi66hmmxznhttfxe6pm8w2zcjb8694thwb4jphez0sbe3b89zc7jnd2u6klnmadbfeyhuctg2ljf5inv1t43fvcjfxwxp65v46dwg5072c4bd5m1a3qo7nkwklkjyzxvgt6ovmf3wrgd0gf7pnsbbwy5bcoxcpiq7yitw0nezkh681zaqcm6946l9vt8yzd3pzoc2jef96m4ivy7ru7cqoy26nfyhvr8kune6',
                username: 'ch1dl5m15jfzccxlxlfk1wlf8u37t40gnu2mq9jbwodlzdyaykv59105hvaa',
                remoteHost: 'yo7ltsp9amrv19h711525ou1d41nqkiwqdq9uv5dudwdmgeein8920enu82vb0znj7hbcczosmy5nj83ehp45x3gu0geyfao89j9rgsy1aqrpu4dd6v097qfn367qamvwemlxts4nmgnxfrl0xb8rkfp203wfgpg',
                remotePort: 4547308102,
                directory: '20nxkdrzityefw3gvycvd3ye03f25k51l7kqame2d4vsuyn97p1uxzgf2fw03rvjboxfqmpb10s6yaadtnccp60snnzq2l6r61f0wk3zax18skuf0cfjkpepntwjgytxnx30kb72znircct0q4471xvsf45mz1gpgx0a6gk9cnbxe9epaenef2ry9v5w8nxqzos402fon2cuz1q93c4crsl8x2giikhc6gwbz8ux1z4csg139xefx292cdy340p0y5r1wa72hiswppurnc99w0n0ta56jl8w6m71vcn0qrxfcn9a656dsfbkxepqzxwoal6ez9i410xtxns4mf5kmyj211wl6usgyff9gptwn6jo8ifpol52bp80wtzlhk8dr0qzyitm0qwiy70m9h6tqhr2cv7fos6umzw0pkfgxf62s0vkiz342ygajojhk1ctwc4x1siueu49r2smrin233psz7t0kttmlrd1du538950k16x5c4ynmhhy5z2jh6vxde4owqso907rxlrfo35y3d014fx20c66p7hbgg2xw4ydpdrzbivfw9x0fqhkefhcycbwfyhzm0xt1gadit3bwcq2bi3s08iq2qrg6ksg2kegkalbexnb813ucl70vmu5vsoin2kf2kv5uswzxas7s8isqpmptye4l1vtcjy1hewn3stg02g6qmw05czyewiv3ww87ub1wgm2x4y0qexpn5brsatp8e8hsmc9w67bgw37xluva8b4zoav15pc49nzpzvamfseoiawhoxc9ugpfa0a5tqu37fdt41vjzo3s64df612shnhkgtmv0lxebd9ly9ssplk5jjmhtgy11g30glxfgfmqyuir7n4rzjr7rs6v1yorkzaev4t9l3u98zom4wb9bpwtjv8eylpaogqwghlobxpfishbn00cz1ep6x4ewqulluoi53d66mww88s0pzvspbybk8q8u49d9kre2p56sr273ze6nhgyiqpz92d74y5il322tzzeuonn2w',
                fileSchema: '7m11l82szepgtqhwmeujurrchu9ulioga8pgkhe0rh5ef867wziq77gu9616liejgl80tvboeh7g0cecwu40lruya0cox4corqdpnpg2wvge25yzlzxygecorm0qj0ejq1tvzaicp3gppiivk3rrshipwdmzhg8dues6u5d5pcde8hujxr7dezocgudeo4ky995xa04n4ahrilhtkm10vkswxmeuhksme0rlyxht2p86vxhciz95ayl88b4q6w2rexdmct23dax11ndbn8evi70ig3edec710rhsn7emgtwaik4enbpc5yyrmroqat0efcqwqc7rzuansjj9mlwub8xvjhb5d12dkjbs4jk3g56cm5adaue2mo2w2235ek3geb51hae6othzotl6rj2wrnw3vt98xlwdram18tbmyp94wfwnrilv9l3osdp0f8qpli9x0xpjsom59rbovf6mjvgfl0f7hvym605mfojmiridhwdhbcsvxe2etfm8542efd5wttslmuuk6g0ezsr3f1ff3oobz3fvu2bov4ttkmw1ydin5axep7x1dxk95r05oqqjjz9ljmlnlexz1gylq0mdqta4luqqhz1fqzqmfv4o5i81ywomgw2kx6d5m8rxh443z2ghgbhek08fkyja6at2lbon13dsk7fs8sbslg3mpwcv63yvrxoealm9ijryug2zy0elic0fyx8qcwlgk0eearqfq7x1nvvsnw29t4wh9ut2j2w4ufbayk3tac4l737va28r9zwkljuxn0uxdqu0b8higkv2ku8azooca0d5bkl8b3mjnvr8cmvagj861ibgn4z151hy7fxtc7lis09v66wk7i0a6xf3pmxdpi6wlytlpv36uzelmnwds6hwiv4bgtygwejs08fu0x8yuocu22gd55rdxd7lwf4wv257izfwc5i2qxrm230c0g9ph8gaydj5zoyphfsbo7rolc36u1eh7vo7jhezlfen5iqofvmabx0dwlwnkp19rzw9',
                proxyHost: '5iyzc2ofn9dr5y0srm87uzpv5qk3qajnpg80bfwlrntvc3lwuet8cngk65ml',
                proxyPort: 9096941609,
                destination: '27dfaypanzkmhd26qxll2utfht7ht2art4k9yqfirxm2l1j5ygyt4kej02j4kcdliye1vfr35oo59hiigkwx7zd6qirwnrxj0nl08j8j0nthcc836pg2x954fix221l38lqngbnsytp4a9lftpuc1dee7yz59hbr',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zea1d1ewqyorfel2fdw8nojpyj784gcc4s3zvftnzbrsd0g50qlzktnu13s5sl2smtyaojbanhe1xi9d7wazsqdi8sewhslvu5hbjpp4zgskpv2ojxf3k69tw2k30lj3tl8i68dqa6tim45hvrgt00sthwlavr8o',
                responsibleUserAccountName: 'tpamutdpzqvl0xl4xkhc',
                lastChangeUserAccount: '5pi5iq8pysm7nde3ju1q',
                lastChangedAt: '2020-11-04 05:20:41',
                riInterfaceName: 'lch64kzq1fir1qu8xwoxo9ie7k6sok4ealprmqg5d8n8tukrq6nq6oj8c4wt832snr3vg5ciynzpxleoyvl6dk8hsqp44dh0ta8ffda3ty903s56vkqocmtv1bdjqzm86o8d2k5prydtk1ac2l415hn6etj7m3wm',
                riInterfaceNamespace: '5xolo1cu3tu61yg7s9138rpxmbp08ttsqqedlim3yfycvm4pnp9sfwlpgwsac44a6xshtorti4maegntsgoironpxm3tjhg52y5xuzoe0z4lz0oqkguhvny70tiemo61c3e9pselep7t9xz1ppudx3tzdl7rfx4s',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'hrq7u2p29goxuzc3or486ey1yn450skxo26wmmq2',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'ngwm49ydl9wgwyxo1k8ijpbz2tw70itkcnn0kzuv1feqwwb8zw',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'xx5u0c7xw1xn2jr7zd5t',
                party: 'bjmbnk3snu51dtb1xsswasd6z6l6itooby4c4i4iyzla8ga3um4b80y29lpwhass8l4n7um82jors04z9dsbmj6a8uexbo0kq4uyt0e5b6cvbgs7dfk4ev2qc64fnb9dqk7nynl3eg5u1gew7tf72481v433r47t',
                component: 'ph1hdggpv2e16gtklruto16ooe0lltit7g37stugotduka0tfb99rn8yipmsp9m0oy1rj5d10blziy9xrxcg1pmmmurbn02wt2j257es0a3v9i2f4kqnk4twkjerffxpi2j9t01tc5ii46notm060d0plyn6qh85',
                name: '07glg6lkp2eyd89ug0ybg8bndxnxcgeexwu8y79o5ajbh8nrentgnj9l8gxurcss7jpd5xj9hyp7r8yrrrat41deao0ycwbb3oyoa9k4lf7v4tfz0nj1ogw0h1vs1j8t0nqonvx6zqiu1oiac3duchtldtpy9qmd',
                flowHash: 'kh68zmotb3wgecdvhffdk68josa2i2qj6t0ql6cg',
                flowParty: '6kgzrkxwgyskp3yzgtn5npvk6375rky9fc5at18di96muj4azmdrlyrwjv3qnlijgj26tnw1rvixvkg3ej05tp685jhtk927ova3k25xwlrv0tgxq5fxek0nap4a5vurm47w5e821rruty0d1ftx5uf5gtylc3jy',
                flowReceiverParty: 'm7kqv9c0fonlxwg4uz8lnw1gxzos7zydi9rmuvswqzh7ssaj4igllvtpnh5tui7qf4gmj4r88izrb1rrnty1vtbwdarrrwh6dob89m37ksy6kbm9u9pb21gczayspr4lerfyf943o9rv2ciwgi0xmh6adbuvxfoo',
                flowComponent: 'dt4hwxll9ey7dt0t4hqpqwg6mvqawp6gk01u9smqv3czpysny97wpb5y6q8i8gxz1bmgd5e2ga0rh2nf3bphxtc5we5dk2a9m2ua2vggdkli0jap20v4ktjcuy8a1oxpgab62kxnunzqrv4458szzlif6hzp46bn',
                flowReceiverComponent: 'oxemfip7f6hsde77ymiwdhpnaq4ueyyj5n7rgsr3va4sffuuh12fkzjkfkflauj6jwrdnyobhwfjhl334h46zxzzmfpjlr2xh9f03q1x8rqjy3gihz41ygaeuqqem6lz6dufqdtt2xa72493go6q17eijmk0btuyn',
                flowInterfaceName: 'o4aiehdjnsnhlmb595kohqvnglx5huzul3wopsilt2z0cu7n09wl1lo6p93m2nfjhuyxpgxt1dxxf6ibijphzpfyd2pepqrgwkxfzg6rwdrrp8k6lqzu9ovvjxl2qa56t8ahsvjhgqpqcs8mog817sagbga6ah31',
                flowInterfaceNamespace: 'txc0ovoe5pw2kl8k2liyg9k5awjn6j1wxeb59wudandrxku0jdrg7grfkfapounj4o18dm620v162ywghe1d24d2t7wfxxhwco5mfmvlevellbs5arrpja4ginf48zdw9skorq3bqngr4gc5q982c26i4qrhf2y5',
                version: 'vthd65ny2u81hdzmwqxx',
                adapterType: '06rgwvsshyrfory38uhfl9nkn3uov0d8vugxas1jv6k1hcv2hy13iavlszku',
                direction: 'RECEIVER',
                transportProtocol: '3d0n1ufh0ry89dnkatlyxoyk2hp5agl95bowbq0agq789kwrj4659xqyj5d1',
                messageProtocol: 'zdiswz3noeudon6f9xwrdvy01jk04cjx76jr54aclidyzm6efd2gqhl36tw2',
                adapterEngineName: '26fd39khfve28qx727dclcxeb8ocwr7eqg20pw41dlfat8nvmedk6hkqup3l4w8v5e7k49me3mk7ghanupj4ek29awi1dqvhno36lxr2ho5q1exupfid9w2c3by1ac4lthzyter50o7bxafaad68gfvaalg292gs',
                url: '9p1yv3x9wa36wacfe0vvwg85tcxwkkshpb34gw5j9diaukpty708v518w6qt1ia9xws1j8ba0zhh3wk5k9ydgnc9ujeqk6f8g4u72k2jn4qrc3cbtwcvrdfc8v1w826qfliaw4z9tainc7usbjyy68b942uib57yb43kcqaqhxqidldg00lu81tvwiuuwalacjkwarjtxrt6szsm0aaysvu6y2j1e4otdavjdkqtn769gicp8uzu2scyd7ygu4xkczdayo1zuzcmi1w8pgrcxqj3mfmgff30bxtjfr1h8r8liqrn77ih2gs8f51kjq6g',
                username: 'a8ka8wdew50yu9jbwld7xmq8bxvj46k4okgppcli2v6u9pbz890zd0fq23v7',
                remoteHost: 'khkcc5z95eor4bnl7dy3g27vm2obwyf6ymjy8v0re6a4qom68kefxizf81ep0exetbbflxmu1otc2eafuohdrm2hpgkteplj6baxe93tdonj71wxm4klb3piwwsno4dtg6yb43x83s8umhswm27ieb3gn4l5iojl',
                remotePort: 6722936529,
                directory: 'kk7inx815wy3bi223xd0zz59zcl3h58sxr7tqhjh0cicsha38acsxzpkxvr0ngi1fdt1ee624wuowlxevpfefx7wmp229m7lsd8jokv3gtq8wfyev7ll10wzusegnaejnlmk43ct1kr8wca3by9q14qapo15a94bo29hpesm7wfld555s9p8pzytbw4xb7pdczm1yi2w373xsnf5h2jkm3f9gmnh8c1aze9tubxyiddzunb9ivzn6snkm1lf6oh1qtqxwl9bp2gttyxmweuqi1oyijedl44226t2rjdmewnv3o90hgqtlq46txh2qdx2v1u1kz4j4lx19s1tadqhawjt7slst4mybmvi3dhsnoqkqlesh4qqeckxyttgatxja7y4eqfo2643gq2gv3s1rx5yeo0fyb0aum4q4pc2qomoviiea98w63up2w5ebil0dza3wer8jmdj6kskawgxjj20xaufeie8jqymkubfhumss8mqtoxaekwj8pf28fwhyvtvj6s27ntqp0ksprq2nkl8yfhzanyov6ek0e9niq6mb80g7z8ass5h14uuce5xydaq3g8pr49o3v39ltusz3m2csiv0iz0xagtjkkeeo1z8w92pb30rferemxo9t0xf0jnegf7jasw181wfzjtqpd8ni1y0t635xais9hgqcrlg1d73xgglf8p8y3avl0f8ksvwcral8n21krouy309vhw62i6abcrcm4mm3y0t2work6bd8f71uxc3kr2i9js7m91n6qp3mh1e5yktvvitnohtcfyvhqctcsnnwq5yveduowlxmya5uxoc1dhpr0dbhctx75j7619j746keqpohx9rk7beadek1rjyxjg73mybs3gxpz5qh5rd42kih8dn7eovb6ykwgb82qrrb3fnddntat2x4duagq4g9n90qou92n12107joqms44yzpdinc3nk0ysl4565lwykwshet428ynmmzajeydcuvczp0afi9si8wjl0nqbes5trc3j',
                fileSchema: '8y3crww6h2ph7dg8rxd3g08r2zxeb382o84fm8rf53d38huoag7xiswyvejkck25cb8jzg6x79rxdwgryhnh5x5c24wnyc56ggk89z4an62id5757ke7svbcgwiutisdndo535yeq37n5gwsjyf8uv0kqel71m3blovzsf3lnk1pldxu4kv8y8vk0a17h0dwchrliypyjiq3kpn03b8a7ux853r22arezbj8mk756bjv9tgfgr18thd2ampxfgbw8mw8u628vghsn8eeiqfovbeywz8sfthlpc3lchvgo2s9ei8gujc6o6tj6avowda7op0o3jqcabcizbpoakrnkha9gkapuhzb7tczvh2tg988s68s2d5cy0i6kxtvnh3u1v4kaaaoosdli406stym8xev5vzm8evew9pr0islq0rukyw979ca0qmwx1m4q2rrjczm5pz1zpkd1ohzltam903osdok39hgl32a3qaod1hvj00q2ypmtg5d70o8r1dysp4nngrgp1310ch7wevsvjyjm5cu9jfxrjdu3sl95mv92eoi25vnmlkdq58nemd5w3ns9fnk8stby1n34euecig25l227nf8lo44jtqdjaw5ipx0r1qoq4cm3b147mbigegwcbxjo3zs5gzr3zwbdt9s56z1pcs96rtw38w5nnwszmqyaqy5wmie4bjfucckgxv11jwpid46mt9e2vj9wcls7l7d6lr2kpedf49apdv79n9jpm8dtcund4xma80bu9lziyy1ne7eq0uoaj2jowy2vjomuhg68guqu2wthbbp7maq8elpuqriraygqdn9uzl04es5qtkxq4rn8vw0ygk9l62sxnegpid3d0c2bmwq02hmq3clgrekhtcbtuf2vr5b7ivn7kw1am738a2p0w5vhm0xovmpr9ve2rl22gfpik6ghh8d19fim7ae24s156m549el571ol2uryht1qsj5i9fkakxz9at4v0j1efpxnyxi6tr96kgnje6ntbin',
                proxyHost: '4i0lay7l7iyup9krrd1pl7xld1oa12i0irkuetvevgaofsyeanw9egxtbl4b',
                proxyPort: 5481437614,
                destination: '8vx4mi5ifymihhbhob1mae62rs95tlqygy1hee2a0mh9qj333n9ut5oofzia1q0t4q1imoe8d1cyh3g23rnpuj1pgvlaaxs529t3cm0hfy89vwoexiz4bish7kuvqgvlzpg3jywfn0aox0ck59qawr6945zvb5fd',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nhkmozwddl5i3q1pi5lix3eq4zvlxzmg0inj7zqf5mchiw0jg9y3ponxjfxg67vyzvpd3wurjsgf63d1jgd8p1fhd21500ju4jxpuntjshyms4dtk60dhycy7vn35gd63kef84zm1p8wejm9hw3msrh2id7jo74c',
                responsibleUserAccountName: 'o1fmb1tpyzyonkp5ghhn',
                lastChangeUserAccount: 'ccf8ara6n0iv1xp3u1hs',
                lastChangedAt: '2020-11-04 17:24:35',
                riInterfaceName: 'fp5lzip7xztsgw63hdvwwz0avrvslry7vakuq395jbjmmwpst3h520q217bksy7otarrmp55f4w7f3vk4kwa0sciuhsdu856fzfqwr3kkc5wndt2z46sm9rcrbv4gq3ctv61qpp5ye2f5xhz2cv29uwhveszhy2i',
                riInterfaceNamespace: 'twl7sgdbmn9dehewu3bxxy1wr7q5708megnae639sfofmfhbgf0gq6p5u8mwhr95z55zermudepor7p4upjs5szt82tmlstsl200wf98dzxtfxd3cxwcl344rp7m49usefu6hw2siv35sp7b6aos9iuo5euo6322',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '3dleykclak2q48ms9e5sbchlmgnh006jei6e20n7',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'vic3lqxl4vcsdp7szh7upy7l0w6usyo9u9jeres9nf993aexxq',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'bkxuvyck765vo3g2jepl',
                party: 'fnlcp78t9sgai7m30fiyx30r8bxg3efk99o0fmqc1xek4sdh2cyy1dq1mrx6qaopohj19kgto9brx2xlnrnyc3za105l32c5oblpcm23mncvzpgoem6mtwtlnseuwaz3xq37f8298jz3g1v6udcppe4kw97eroku',
                component: '8rbty9pkveddy46cw7c94kd09iocye39tlstbw9n7pkqx0n1a11pa3icl5ebey0stzdpl336u56iwerse2md77n3f8jmxqtpffu2mbtnv676xcgoap6iygefk29hs8fojl6y1uk39b8uohpeqqpmoejruvypolb4',
                name: 'iizean2m9cel2jt6dnam7e1vfeccvl6pmfl022icexu1hshbg6s6g517xqe3j4wz3idhy23cmerwm704lvighu9ig0vf8g6u9r92sujs6jcmx54jgox11w3odykxxd084s1er4ixkykdf73mcsm9j7nv5tkfekkn',
                flowHash: '8xe5ef611yie2ytai15ai07dfnaalr2l2ibrxyu8',
                flowParty: 'tyuw4rj3kerw77okodoon5xvkgrajoi0aepwhjppwv1mvbzfgd80qjxkndz3433avz10n100ypvku847ilqtg1mh5mnve3ymn9gqrqozpix9wmvi5yqry8ckagzdhmrnv0x3i0i5fou6js1cq5f7oxud9zmnbruw',
                flowReceiverParty: 'o7nht6j5ygj9m7ejvj4doz3yn4cei31uls3m81lga9t89yspl8e6x1kvr4jpt3eoxrhjguh0yy8dv02lkdv1axezcjjtwx3tsfao9emtb4f6pxzhqwdb0w6iytie03cjkx3pu8ex6i0xqcqpy8bczgx5bup590zc',
                flowComponent: 'i7zi1il72ubc3f7tu1z769jmzag15j5w368a3rs5t7trkl6xw7lrqpbm61wgss837puwfxmjnhnwsfnukz46p5bpejpgcltpp046yky9vdr4kxb3bmdmh1qwsmvc7h1605va9kkleexvgwfm17s50us8snwoea21',
                flowReceiverComponent: 'e3ef5o5h2gd0lvrpjmgtgk9spai8n98arwb2a07mswgm22odntk5m2ktrp8slbr6194k634qij888kf7ba860840otase5yzylep5x8vl3t4ousmb803y7hk7sce65xl2qfe7fvuthije7ozjgmmk6hkgzma8jyt',
                flowInterfaceName: 'f6hgf8xqqz70zwdk6szet7eokbjxhhiomdsqp47loy5unrzpdo0vw1tr6x19z4h6bcyok3quko35iff6hac0i1epgx6lft5kwqd5tse9e5uj1asz6bydnqqlzbjgnzskbq23t5xjxs1wljdpi12sd6fiailwdgf20',
                flowInterfaceNamespace: 'ltnqxvjcq7pfpqeg9rs8vv6vafycwuo3fjymrbwg8okzmq8q81o17y9gnrevvdujq73t7cdva551kogr02plebro2ke7k948bf3ru7uh5a4p8u0deonps8x8a4fbgdoshxig97bj5udo7sg5etbzf33l5qp5q20p',
                version: '5x61ne7jv4rab4osimq1',
                adapterType: '9v01cvbc7cn5imikff9c2am5vi92n6guhabk6hivbfuzj1jye996bovk0pib',
                direction: 'SENDER',
                transportProtocol: 'p0p350wc10dejsnw0xja3vwgioyt969cuys0efwe6kj2d1t3y4m0xdyr3r8l',
                messageProtocol: 'e87ddm8n1sv89ezhlrsxzgto765xtg1kjbx4wv0zmjl0egaog9o0st5pt5mg',
                adapterEngineName: 'ckbjh5a66z872hw3vlbldvhat50ht8fkuuvsx7p52t6dtzz2gx6hufaz6ovl5lvd7v9fn0kwtfo72izcr34mkoroc82fvym8lg5vlqpm384sq52m6e6ml7k5h55yu45190lw73v51b5m3t18z730anjyrd3435w8',
                url: 'k7e3ije3x31hglgqrplpvmnlrv6u6kxndjh2jj1o4gnoi5k5u0k55ckmtlq2a7dm3u46c8oemm1bery05ofsmn59crrvhs2d87a7fw016alsieszd3k74z6oudnmiwh8ic0gemwel8ikto9du1mfvkpei3kq3iksfz8dl96idxqpmw3kvfh4f3hz8c2g2bjmfcqejuz30y7smb6a41txlgblojtivzqvj3olwiw76iu5t01mstrdsnapd2xzsi48sinxdvnrzmxfcsmddlo9kvkbmyru1as9i0j2cr6qjx2cm7z57opt0eyezmmqc6kq',
                username: 'jmv8iyxzlln5db3vx9l2e1l1cs0e95ni5c8bszym6s91tlr5wvpejwlvzjcf',
                remoteHost: '727l8o5p477l92dobnc8xtqpdgk2cdeb0cq718rxhhtdrrw5ozfzwrgplbb1bka7n4pwkl2f6kax5bsa8tnjjibuhcu3g61pvgm1con0a9mnvsuhquvvru85ljsa5sgqrv27yix75lgnq0rns61uojg8dpmplma4',
                remotePort: 5960691251,
                directory: 'iv21f4lwhdhdoaz86wvm1ry77tj4t7th07mvyw3442ino9zigmpdb4xc055ke9361d50tjputm7vcvas96lgh1us7cdoinzeh4fzobb0e523atnuujc6jk6ebbwytxeis1xqss8xtiv2cbnxk38puy7qv2a2n3fs91k1c408kqie9jtscc3t08f8tt524qa1rtknop3h4o36322jwt0zqalohjtew5478wshozidtw10xo3s9hs0rzv20cgrttm98t92alahl8lajltnaqrpkujz7neba2d842hoyb7un2sdgrpzwvvesg9p488ltcxi1ism6yagdr7j6th6wxmoepur20bsnmmfiqvbi10xjrmn2monlmig8ng8q5oh6v9rehwa4kugp6r4r5hfqgamsebnlnwp9bbt0ryld8231h63zw15pgo5ys9pizsgxaxgio1gufte6lehhe6daq2i1cwr6frset7irea1ahlidak15ia5pws5owzoueckuq6dlbh7ox2oe3x1dr7fmtyodbdl9zd48wct3hc5132w0746agkvyeibqrlkift86fxub9660ekqg4igievscp48k90tzvflhmw1snpgz5o1y2eneezuss46hemz1h0gq6vl6cxrxro0ez7vmob2yzpgksuhpxqcshoi2wxpbf3vdbxhvwehdlst9l7rnjvre15euvyicldbmfn08a9v2skyzzgjtzz9zjfy4zmn47bp2xb3vclgppe1x1r7lvj3cjavluayei3f110hgeopl2bo6ug9gejuwbcmggg28fx9pjqxmdq6rd4jzly4ny8zhyvl172llgphlrl7n4rutiwk0y1glnz9aulsdrqsym7ny4qqmskj60va61jezq2xh1225molcxoqpqi9vt004cor1ipvr8tf3b6msxzq0vrczz6q30g23mq4wzy0w57w6izcvin2n77ruxl1byd78pti3ru4xf449pw7xmmo2vo9ug7qxaef977504pfbfkb3emj',
                fileSchema: 'cr73obgkfhxgu09teea0fv2pp9r5nlkk4uwa0bmwrxmpjfq639gi4vqmra585a1809yoh0pmq42hepmmcasd2mfv6ihphl55xey2pzk6pr7fdrtczl28e9ztgqjboz1px1cryrps9d6m8w3ksij5gu0n1m11g1990iwijodk19m6mr68ieovj6rn95fd8w2195j90lrwu9aj7f146zqzf38cwy3heur5yvik2829adxc5sb08ngk85eaakps72gv46bnbm3ha9c65z4fdkxaexnmykov5age0941jihb4znvz2nf0b0kz6w05bumgxrxu12d7frshmgm90xzopyud3nt1guo5306uov6fxajpy4aet31ma8gzwvfii7436dhnpmsyflykuvj07nej5wxbfksq3xstkoj8zbjt2a48hiff4b1w3f6ojyay7nvnar5d7ndtj8k3ltpdciom9zt30b671afqt3cgjr9kj13zsglmlr9z9trwfwqd1oief27ur1w7ngle8amxjrpprygtv4nrffz4txft783yksu7eix5djs6neicwm1mdsixwx8w9qqo5h6kysdbzvxisj2212uv283v2c5pwlmykpzplr3mk2epcz5h2ivvwh0haac9c2u86tsndfelqgndz5gavy0i06w1laarkgscuiibbgnio36ybsi808o7h97w88ry7n3r8isctfzcndppzi5ez9llu3n19po7n2m8fyu6i4o4fyynktpvztus0fyv89a3cxcfgvwl2xdezq2ca4xx4ofcgqnj0syado0r6i9b8flla5cmrpi133mh2hvghpk1pouu38js7ze9fkxngquib0y3j7hqg9o7q64lzpxf13uiemrc4dkepm36mp3kdd8tcbwprbktfj5pu34gh2ef37o5o94k8ant7wpyu1kxamiyhh34fvnun90s22ph7by4oh28nwhmgxnnocgfiagrl3kpzjbi8l4x0a16h0db2me51dmgd4hlrctbp3vwlfo',
                proxyHost: 'segwb3mxli4i8jegr1ikrfo0c5funivksqek7v8y19b677yczt6kcjlguhcp',
                proxyPort: 6897508710,
                destination: 'mwv81le25jxht495tg0ekvwgx1llb9u1dhkd5alwkty1pnnbbzsvgf1moh896woldh1u0si510pc8fn7dtp1z4nyy6ig2d66sxu3qyck45tz7nuatbszgy1oesrl4x7rhhsxd0cadeihdgtk8o1il969gx73oz9z',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '31src26sou69k5jyfewttw1d4gyq9z8y5pth86qpmol6loddm9h6oaqvyhyb75rndpn05w8vgfg54xskaccumdslinuiqbzfl87iy5fgbc8g0arrbny1e22nkd5kmzkbzmh916ijc5ecnxjrmu12jev6vrf0a6q2',
                responsibleUserAccountName: '958j42pcmo55dwx5l0w2',
                lastChangeUserAccount: '1vqda0nq4i7mmcilioll',
                lastChangedAt: '2020-11-03 23:29:35',
                riInterfaceName: 'nlap4sieozfq1sawave087eunc1fyr69sh70edxavm3i9y35vek457mt2uzjolf0eameb8mqd9921e2l33ygtxqug1tqfryml8stocreaii9btozw6dolf2ygb82y7a946qnudsa2ae9kex7nv2hqkhvjx7n5vzd',
                riInterfaceNamespace: 'e4mk7cnmza457nqdxwmeem69iklrpisym9ud5j9x9b98mstifnqvgnwlhf0yfbrjkrp97mft7io3lc0zmm3buqdugy0k4376h380uh8ahfj8d23gb6acg7gbgj2nxvz2ue8lkvp0ry1gf1gf9sb8b8to2tbya2rk',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'yuw8dca0715pc1fgay9896i9h6sz4l3x3oscwyp4',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'rdl87qg08ke0e4li3vvpr2kxl3u0smefhzrsbiok4gg3t3lyyc',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'i2f703gobr8gqla586cd',
                party: 'tofyttno996e6z36q0yd209x1n0tmtxp1meyhkyh5j9d3w13vvqtymt46nhic46z1uzei9cdx4w6a0n95ik9p5dn6oonzayctroh63ei1x04ub71wegvtux65bewmy747igedk4wbduo7j3erzx1my7j2ihgwlze',
                component: 'g5l5q6g6qcutux86cqlc1dgm02y242s146i76teax3yhqkijwnwn4vgxk8peo91hi2dso743sboa32fopcb9bc4d18efiza10kwjxl80c28e6ifuwbkwz4o1r7vd7v4ve7gmpt5redaoxl8xf1j24s1th0d6gvf9',
                name: 'sfl8w6744boxkoqqr2zsjtlcunny35sbjlfuzy82hfy8ncvprebnuti8dvb53cclhjyeobjb6lmuyppqaxyeuf48xm7izl297rvuu1qtj46fgkr901qece8yd2fb6upypya8cihr00rx6o991u5n2ffidw64flms',
                flowHash: 'ohbi3v5x72mg0ulus2ou8yqli41dgglzp6bab2q7',
                flowParty: '3n2ahbj3t25v5x5c6f2ikadr5f4yky1o1ybt7hx3ukwd9oeybkit5q99zn4y65cua6ohzeay39la8m38pqa2kxx4ssjl91v0g3w9wg78mxmnc5a9ct2nrjmewlzynqouybim4xg22nv9aw5fcx41jeicw4lhmbuu',
                flowReceiverParty: '3bo6bpoo4vz6xzmoa5dksofa2mtowhybfhbif0v9v1rafsyehzsfcoz020anbd8lokxrd1q0x5a00n0hza6n4f0idsemcpzk0q4qwwy82vk4tqb1bnp61fmq976g26ntyszpor6ffah9auc5047x8azpn5j7uko7',
                flowComponent: 'xgdx7s8v6aahwfx3lsq1f6luirxda1tdsal45harwcek7nph972do11cbn535fcsj8tr98utcdltxctirp0z2i3qd8pavfptb78f76qxxof8ymjs9e15rh56ecsel7q2pllntb0lixfmhi2w6dyfcz4vzgyfwpa4',
                flowReceiverComponent: 'dvldciamxpetanm0k8xtrx1e86wi4lylonmujphu2if4ty8hulpvgj719h15kcq71uft11cdwnwmq886sp7pw5qvqkitmvekh17dpy0dawnx2g1d3ghrea3zbcsuxt9p7jg0zd78hw0t2871gw0jxi27hogugp6w',
                flowInterfaceName: '158u74c6l22fig43c87bmi1nmo35r9lo7m2wb9b0bgkasebrug800i9vj23sckff0x2h9bo5ttzdyeefn5ly5hxt23p9m5cyc4ucrcksrk16u1wwnuqwr51ft9gkj9zdch654pnq91orucvxi5e2x3g1ra845j2c',
                flowInterfaceNamespace: 'q45gnhz8zndw4t7y650w0lfpftpzhw8dy632v9658tw2m9fvhi8vnctb4fj1q8reug8dfuxtbvh8myp7jyu7cr4h9khbiowvzih31o8ovarvlofzvh76k30yq79jkcxfyoktrzm3d0hql3s8bic00jv2797qprtk5',
                version: 'clz36rjd9m2tzb49099y',
                adapterType: 'f001sdrhu6o9gzk8yodtfy51xh4kqylr2i8nzldqne0phzrwz4au0aa44pkd',
                direction: 'SENDER',
                transportProtocol: '8aqel23snbkxa1hni014eteekw8hmi0kv1fdlc2orjcz24pvll3wprx6sctv',
                messageProtocol: 'cc38dya85kifvtww5pti1i574d2suc5vvoaa9khsvubdvdp5psq4xypke2ku',
                adapterEngineName: '2yr16pcooxe7vt62bcsrgeaqvg8407vm480n91su5f5y6p2oxq58vkjk7tnvgw7tdsli1cowibzka2s2hz9ramwyfkg7212eijyyomg48qv9y1s9qicuyxn3rt5sx4vu3t201om6h33jlaz0m8td24hehuxgaw3v',
                url: 'ty5fp0hue3y7ut0yorb3uhzgptda8ejeuyn6bmfs5lri7j89rd2koba0qv4t7atzhs076tzu03rek3q7ryq147yznq4pcov5bxq36t40r9dc1sw61j07lf611o8tyhnr6h3s1o2us9c5odarr0eu5bu97jnxeh4i5kav7mryaipsmaz9ga0iag7yfjj8mmpopd7uo0i2v76bro90463zdn0ifoba23sv68oeicns1mt59h1q2lqtujldq4rdyfdeo1kex0vr2gao7n56z7k01ru2oa46iz1b7a1nat9p5yxd23grbswumxg4gmplwlr9',
                username: 'f7xmntdg4ie5ajwy4c1kjpw4j5iott6p5sq3z5ypgg3jpbhym8hp0ub8fe5d',
                remoteHost: '7c9pljehket9ljzvcsdd94hxm6ka2b893lh7z3dvbefcyqxk1gz0pojzqbci25246l81oqnr5mnhhstcvk0kdu1pidt04i9abc31gi1j7tazyxs5zj9ijkmytw3zf1zldxkadsfy316bvyhc4hl7xsbkog9dydzn',
                remotePort: 2048912438,
                directory: '64kagf1t9rh80m7hub7vza55t7xnqtzji0p3432reyjwlczadbvtpfx6m5og7fs9kjtusn10g9bn02l723a62eu0ftruldlq7x5kr3ailh5zz5d9cwkamh05ac2ql2e8qa8gee05myeh4va6hitjq1z3e92z052sql6zxpar0g1qbeju0oh16vp0jtqbrrrcjq6wkakjzxmuvd1fd7na467ou6r8501hacf6uj5qqfqy5cl3c92k53d4n5ol4t7nnrxb23z1ddg3kohthbcbfzmy2sc0ldlffyfyqttf0ja6ovhpjjyzafrd4tsprm0yh547kz0j88qcgqxwfjkboieesd9jlz89q9l5lriqukwhbl4luo3ox2jk9m75n5q4aqbzzxxuoneoak8n34lrgtcp52svtkvvnnlagzahzp86gr9vziqcbyu0xhat3j12cpiszypq7tlcmcjsk88cicgmvi8k53sesxkg9qbsee2khgzck1f10e0s6jh4h03v7mznspy5eiv8epzgjginhsb1spxr5gqlp28c48llththf5e5hjjdwbykgwx10lf2ec5tptfp1imhbgd9f10t3iqy04gozz97h8dzak6792bajjudctvz2vs9i23356mk6tsu22tlz7qjzyq6aqtqgfvcmv0zq81okqjy5vjvsfs3rhev3tui0ee9vv05t1u6keoc2ieen5rv956b09wv6xctm695cjbukay6r6j0ytptt8vjx8o8h94t36sdzh68fnakkiaa0ob1pdow0ltl3pwzj5kwdybnvk1y5gghp1redplqw107c05yiwp38kbq7qkihxtjofpwco621kuiwqgxuzosry43z5fh91b3ggi9is2nc05vnu4jlhkhbct48mpt5ffw1n05r1jufx7x8acgxt78ototgizxw5eqhrt33ek3y5iccbz52v58zn500klpw79khylqcbjrdyxzswpjlenoovdszehcwwh4dtd5ogroaizdl9jwtyjhv524',
                fileSchema: 'crz70jv4dudwicyc8j5avq4geb2n42e8xzet5y041seaapn6vqkznz9b5mw345p6w4b1cxx1nxxmo9vi5ceoezuf8ygn43u49d3ubpvit1teudwtdycnfkhmzjl55nqv50a8gafwajecw7xjn4i6fg8m3tugwpjtkjzgjj9zq0khj255xbv8f2cjtbg3woz5vgkhz1l42v1b8011q88n3j0geb1xraynrvz0u8zw3o3ay1zg6v2hux67jmuz1gdo6u3cqhd1vp7eyqmu1ruxsala0mvdd5a3ahwcga4cb0z4lv0edefdmus0d0vca5sb8ge2agomcbd2qlpu1fa5i7r1jhd8twzo9uskalr4m1e2skuv8x63y4b6dmuhnwbnsg4zidmbxhxsiqc40f1qzewtm5ljm4krrykx1gldovdrspk5hcijaobb9i2uu2vj7d6dh1pbpqbb1bt7o0qq4tt1cyty0m2i1zg4yxp4pkg54w5v5bl2j6t7bocs1sckhl6m1dbedg84fbbc7rjxcwhdvcwsqtokj2z2z0yq07gdxbq713t20bwu9z3th44074vmnmlcn9z9ydzeuz5eadil6jn8npnwcw20grjduaf0vz514xiuqturlb8kcgjzubvgoq4bvot8b2uaeaae4e54ut88pn6gihoeo7rv7ltmpw2xiowu175l2i99nmeo1twddi56f4bogs4z74qmxcsgxgbgwgvvkh8esf6o2hwzz2cgk89tcgbossd3cnmrd59dumft1rcdbkrtlvfqgjor7fa7o69vdqgy1ws7otfpih1xiy89bzx92pmnbk5h18qnx8oa9spov6uqa42a1jp2ka34l03i5h74r5ocvuynuovp629fvjsqis1xzubq994r41dpq0twelpsv8gdfma7zcg0yyox4wdop0nqshp6uefsy76yn2z8u1do94hjep7ucof3py6rgd1qra710pfyc0x12fo9zl21y7efov1vnzqa5a6og9l4wfcw6jmz',
                proxyHost: 'vs1h4y2yyke5keanunmpx6p0ai62e4xj3d5e2zrx7fss3q0sebnq3yru828y',
                proxyPort: 1009066170,
                destination: 'wev92z0cpzllhxqr0p1ex7g3xoqedxbr72m644askvhp6t9pkse1g2wz4iwkoma0phuqqpf6qs6hpuc4qqbg551peqo6ceomb1qf5s9l3039um6rgsfygvr7k6fn7mq107fymthpe96ah1gfs6if7esfh739fxf3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'sbrjueuujma5ghuc1n0eqvwwr5oj2gms4uuq9rc8iejm0356ape9j1x8gk43bvxge1gmsvf2389jcz288426pszhc9unjdl5shqm9jl6hicj8n6jyi0kt1qgxnz9fk3cmq3rmabupkt90rp0oh0waj3yi4ggd6gl',
                responsibleUserAccountName: 'lvg8pngnaqwvfcnezb7c',
                lastChangeUserAccount: 'npk3bkil27syr9vurra7',
                lastChangedAt: '2020-11-04 16:59:55',
                riInterfaceName: 'nihvnomi6755b2ygcck6vgtv8cpbzec0ac7xdnbxr0t5xnjex9g0h5a5edrkdci4okp0znxv6v1qwtq061if5mb5apimgh8uru83p67zu8meee022haib2xyqi7ptf4j5bgccxsq4ueysjxb3nz3pk8b1b08dcqh',
                riInterfaceNamespace: '8w9262w6i7fq51ymos9eu9iap7rydcq6buk1lro79m8gj0ntlpllw4lonhnnzhykm5fqqyc53xhxtpf7szduug18klqt85dcyqc5ferxc14vqhpfnd50ivq5ptik80r4bb5maisd4o0wjm82qll6lp8vr06hqndt',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'qezzl9463tusn6zuov9adlqbvhturu269rtyzs2p',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'wn2ox79bjqkm70dg66o4qree77b2ikos9ygig5uifpez8w1dgi',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'ky0kgvtfo9j7z01yfeuj',
                party: 'fkpryirrebvu885vda4985jggnz73tsg64pvbu0g0hljnldampzz4ftntu36qzmtus57766mo5l12neutx0qhnfbibxo0t2kxbwmdg0nk7213hqzww4z8bnpea35itr852mpbxyiw5qj9s7jl7rtuhf58lmw1cu7',
                component: 'lswqenne35z61cyv42ceo3xno3g6tr9vy39zjk16926wls4rh39ctmy7yjcxkkylthm5wmbp3lwok2ofslh5pg78sk14gjrg3kqqegl6k1g4ye7mp7lutnyhfkmnmrcqi958rb97em02y07k7rdurk5j9pl9roku',
                name: '4lvfnvyzse9plgtvnsm0y94n8coonf82kylw8trqhuwq7i61n7sj84fnmspwgpfargt2hg19dh15akm6j1avphx9vjgjdg702rb5ysfvc3oocs38n6pmf5l4451r3typkjr6wcl7hkd9qo16t2lnlz0wzrdic26z',
                flowHash: '24qj54drxusp5jfchke77war2p45xstghk4id76n',
                flowParty: 'sqyl970domjdaj5bln4u196k4353yz2d28p26k72uzm5uglyzufg3vqhhoukn80kjumx5cqcjfvj4vggg2xl7joaogdb6yqzx38pnms441d6k9aq2en183uxsu45qlrxuav5o93nil9unhskqgxoe0uqmgqd3loe',
                flowReceiverParty: '3giky7b37rn07dh3ih1audlppcq94sn5yzvax8mq3e6w1m6d8j4d6xjllbuks4yx5b8ey5s35mo2ttmu8pdj8u3c6tknn49v80hmjrk2hzzhf5axc06cp88wz8ycf6qwxvpz1b81ls2yq78dc5g7pr0ozmhw6r2j',
                flowComponent: 'fxjb34h2g8ykrh5ptm64rnq5x9drc2fn1p2b76fzn0w99efg2u2u3khbr9nz8pq36rve1of0hvcabhhlnulkm1axw5k1owekw9fphzpqv9wd49ftujglpjcy4fpbs8zpiknugqfxqbppxeby2o8z84x0eo13tzge',
                flowReceiverComponent: 't8r86m6kguq9wzz8kqxbmydjluy5630ie5yaoyo31zkvilynymljtzznl8cm7pjr1zqyzjsztsdlojw510s3uznu13so4emfame5vwq45dpa8cn0eefs5prkanjorehd7gy22p2as4iwz8l8kziy5820i6os0fag',
                flowInterfaceName: '9hkpgx2o2u110fg83kmrv70t8tvp92gh90yzhhtvvnv7eedqwta37zw391tsrcz8p1nopxffxurte3ejyzcgyo6mjt6rangamdevx7o2xdk0xnooruz1fq46kvh4rvxjaj3c5yl47uhyryuq6miloep17agv8ebe',
                flowInterfaceNamespace: 'hoe7ehflg66u771la2jtslm2qr1nkz4lr6uiq2lt3agufjwr778elcvw1upy3oxi6zdwi9h584llvpq6buoi198kw9mae5m1610vtuxzp81ekc5p76xtmi96lyr41gm3snvp4y74omrztnizcsfjienorf1fwvi5',
                version: 'dfv7iwtw5z7dilfwr80nm',
                adapterType: '3lpth2dwesttixde52892jalxmt9o8m2grkhn657k75sw03t8u658goyl6d4',
                direction: 'RECEIVER',
                transportProtocol: 'f6hbd2sv57kfzk20lr5l1o2i9697zcqj9qqx3lu0hhcgwefspxtbwkpo5i30',
                messageProtocol: 't9fvs7dhp7s6oulonfpej4q4l3fojjqw4sd98l4blftic17gzlkm81dkxb26',
                adapterEngineName: 'hgtsjcyuvwgriypl4v79hg1s3qys5hkg02gwn66ii37zcqxldj9wj7zx8d499fzvcn2a6c8tqz92nkrggqcgi15qj4xru3yoyc3s03c8at6x1eak353fuvaoecetmdhdplcdsaxob79jwrfjtqn4l3qrstwgcw7s',
                url: 'fb1itd1mrbcgbgpo9hi2fvxriay2s6mhbwshjxcq64n456dv9itog1ykmpz5evm0kd2skvz9iiwcws89qkutr3vt9er38gj9lhfmztyr5jnmgfk3wegj9ybmb3mqfgflr0minqoydnwsiwifghb4i2by3ekttc1wbeactck0btgh1u4h5iyi6umql14xqlsxz97w18c3x951jfsa5mu6uysx2k88iq89n958n81ph2mcqh6ddzbptgxbzyu4puowtrr5sn4jxcdhal571mcq07h4y00e6rxkvcmgpnhx7vfyi7cr9thovm2yrh7rr7sv',
                username: '7pkxna9qwoqd5vm55dlkhxayvfbz9n0usquzfqz9tiqq3eeseteuer1540hl',
                remoteHost: '603d1deym2vhlimdf7h0f88xxfq3exhyadiq0156zdlrharm4j5682s4pge5yx0ugi0zjydhcbel6k3d70g50tpl2vkgwhfq56albxsahzicnfplqsks6ixhurz9qh94wby5ybqnd9vxrf8ii0q85aizks9r7ja6',
                remotePort: 1679124119,
                directory: 'uwbfmv7lnlwvny3yiikn1lyh4bvuf0r7tffjxdzmjxn2kesitfknkqcuophhf45odiy6mm7rbcz7gmzpew3nfugztjvl5fgin9b5o9hq5pazt9xbz2if3wkolp6had0sp41hnxrc1n39g20il5wcvif3bozqd4hswyqactvrlitij7hs9k0btpk9oit6lbj83ipa8hbg38pvz8zfqykx6x0jhldm1itic4lrydil0u206dzs2dv04a70w53fjp8cqdpctpdk8u9i3vuebutnjcr1r693wvxamcszug32yc46p9fjgdqt2rn7fre275w9oq0d4pdmmjvm86cy9t2lop8zyyngx7hl9tmqtvsalpae5jy9zf8brcqmyq812n1cp5m4exklssbv6bzdaxcho2ffytckho3zgs97xy87j6wty9kngzuhicreet6a36umjm2ifhia25rt3bmb9kn6zn99sg6r3liica5e1o9cp2b02o23lhws2avxnar555xb5cpoaoongdhgmy8326nbnebsux95bvvp89j97rezy7qt8cwn6he9wkzdlzo36c7kju9w3yn29dnltvvhui305vemrt1dqq5al8pa1yt81hl41wv9kw5pj5o9pz76a8rw6hbe1ymro25iu0zymrbi3c90jiy4oj56pucsdnjg1vzqvab6671otvz361w8sf14xkokv25c0har82dd5mztrl96s6t3gpji6ry02l9kd60d58omzqpc46n4ly3g76oyz7pygxa7abmyi9ipju0hu45on6qeo9tl5a1mpxjlkp69hg4yrxt5vrzebcwqhlmiflnsmea8par0jq2bt03moqyny0338fqtq1fmlzm6kv4vzrh5q8kafl8m9l4ceuoohr4ww8py255sfmhku94ew6r2iy0llqcpv7by0o40i31medrlc3zuuxl4ym9070tjg5lybf286h6y66p1o6vz2amcrtiml92fq8j7dlvg7n5ahmekzyh1zuw0lta35n6m',
                fileSchema: '4b4r1qp3divo3bxmnqpohoih7c1ffh1tpdic2a89a33qyik5h62bzfe798r84s61m77vetcbyr8aeio5u18wtcl0jgwigwg9pj4xjk9m9k7htgb099bjgbcc87y06lv079m0qztakr164bzdqmbb4meicvi6h5q3c55e9ploe74x9tmg7i5nisrrquvt7k2r6nic0swnbu5x6albut7r1k9o6fhp3cwb8qpc37ep2ens15a0c5eqtkfh097hgyjc8cio72ng0cnoi47wq4e6lh1v55nz6kz9pw6ep04nuehsel43jq7fsjgsixc1ggia12m5es7bo83rmyf4y7hxg8uo00t2ttv42big7gunrop6wv5t62v37w8vldw0rem2qfhvo65q88s8an2ra6qpsmfdrji0yue356zod618308ugqragjid3lilpw5q037e85dzhboa2iwyl606cfc4qjyk35y082cg9sqttd02hwxobwia8yepeq24zaaodyvdzzwh3k3418433kluncq2r40xe17ccoalxl2ytir95wj7x0v85vkhiqiezlyjeug42p5kcltveu80i75vc356dhrkpdbz5cf2h5l9mnl3z1v8n5vn3c3m82n2zcku69vlxmah5tf611xcyk8q55k5375r2rlmbrd091be9ett9oghzfl5y040qeoqv09i9uaj9md9agufx7swkbt6d8ehtrnhiy55zsyohpvynrm06s6o2lofnzuf2enkou5vz65x1hi3i9ifp4olv1fugfpo1xslr3wph6m0xzpq0jdwg7nnjolmy54e9ok400e0491zbszzr11yzuvol0f5ciw45unbe2hey4jig6re3gffeppdg0tagt2tk3921tg4drgoy3a30pe5wfetxgzcil1iwyst3jlgs77t6jjuputey5zrc4aifdbyv64npmtybsrnu70u9vzobgcpk9oko8hyybd0tvzzuluf97o0eleoh7oi5rmmoujbyqnbhp36nayd',
                proxyHost: '1qfh6m1b8r6y2ndjl73zg5wvdr9d1zj0t6bv4ej9j8fn3ky3rz8z6mnr189p',
                proxyPort: 9225776906,
                destination: 'mktjzlqxykm53f6b2a2oihqb0an7ohx353hr7ir33bwxrx9xwhxsycjnm9kmw250vugplfgt6itxhgpmrpyd6on00pbf3yfqtycks831cp9i9rl0rdhw38w4aecpowpn429s23dc8epgll4xsowdli0i9tudl5n5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '11tdcfabxtdvzuzcs711hiv6h7fkgsogo18v1bq61ypbyvlekttlqtv66b86scdw5wusfobmkntfb1dtbk9oz254g99yr6ji8cfoed5jaylekdezizkof4qfweymnco7hlvkacwogyqra2jik6kpz7o56mi59160',
                responsibleUserAccountName: 'tpls3au15kkhz1n91eky',
                lastChangeUserAccount: 'r2ao8oapvic4ms3r1pvl',
                lastChangedAt: '2020-11-04 14:31:13',
                riInterfaceName: 'v37pg6owe59cbe0i26vi66v8r0vtdbqii2d9fqrydov5g3ubys4vwlo4yom5z150puwdms68flnevjbogxocufvztki60nszq8t6bwzgcm0kesxmdc1twr6zsrsza2ahekmf54rrn0vzq1cwfgwa6ouzmdp2egtf',
                riInterfaceNamespace: 'p9cmq8up2n43kv0vo2ldg2nxyscndg9qmt00smc8u9dlzl7993pji318dukk06ksm99du6tcvpiut58dnqsrzaruftmwd3ml8vhi7tbeeqmt87vccs2aajt7itszje44jhjskdnq5owb42vv17m9bfzq2qf7lk9v',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'dn9o7zw9gt1mb9dsyqu3cmuc8quj2hwflk18ykem',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'og1tssqhymv5ikjw9soio1s97t5ggcwcpji5otx6026dy9y0ex',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '2zmiab0r8m29l09ss4k4',
                party: 'bltzx7ommpvc5c5tdqwwn6d7vdowqh2t269kqmpv16sdhxsudret5ldz4ss83k143fu0411w7qryql5l0lf3098xdlc587b2la1rj836i5wcnhtia8l0nbl87z71w4gos145p322nx99yrisajkoai4ac79danc5',
                component: 'j263xgaxve207z3v5nxcxmevavrcyceoc4qyby17ms80nh19zds81ckldx07bswkfwlett5cw00puufa0svu81jhei5qrmji8wk8a20exc2z3imurysz2sascvjj6fu27ii93dsx57628y6rmlia05fcvq79g6x8',
                name: 'jhxzqshlbcmeb62nnms049pe5rv10v4gitww23c4wkm375r335daqf0gtww4dvhq4a76466tmxjzy5s70z6panfnhrli65qz7v57fr6tp9y8f2q30t24jzzg9yb7kker4rrzoprxlwf404f6hy484wl9cck9owxm',
                flowHash: '3ugh4uzvakh3vfz6ngfl2gjtbogn6dlx97f2mtzt',
                flowParty: '1nvctggfwzq6xu7lu0bonhcdy4v1i6g4q931m0dapuybi0nmdv18ltgwfldf2823rfqu3bod9yn9uo2ugy58brb7p8prjbn468jlibfln8sroj1ane31sfo1pryw9k5zudmnex9kicufhskgxvy9icqtbo37dzhj',
                flowReceiverParty: 'c94fjfesjr32xjdj78wi844ji65ui91bmxtxxxolmigf3lavaiextee6vzm9vv7l290n11y0sqqhanyimoch35r97mz9bk72sbowqnkypxffhi2qrzw0e72guszi002f3lolpzkjqb8gfwt1pmuf5p3bzbdg8cmm',
                flowComponent: '01biftwrf16ijwrm3iv6f4q1g7j2uahya18i9ox45k1biylcc7it6jv01aq5vv5dfqeet85rhodoelqvw27xj9vvtvv5qhxdy79ydai20izbsd7ugqnbjirfj9ij2ufs67hbel937322oeq6qwsg3ftwberphknp',
                flowReceiverComponent: 'ijm39mg9r2y1zjigmqlznw8qgh1t8prsnvur4c48t1cxpfh1cd8zc9bceydeh05gy5rh9pnnhbsrfk3lfj4ccjauoe4qsgrv33zp3s3bei5gl010prrtnb8iomvm2xhpe39jl9l7mex98lqr79eqlrtjc50xqz3z',
                flowInterfaceName: 'e1lj8lltcoomladw5aoqscaddldmd7w0za4276kqoqisqjr17qahezk1s0jsbovhtwsxqb1bn8flev9fymvblym785mwswiq96cevqbkns324obdmsstxm231kup27cj47cxown6cnybjq28k3grwe1c1iw3ljtw',
                flowInterfaceNamespace: '1hk1dz7fbtle1kcxtjsngsn6abk6zl9gnts74q9a3rajwbir0zprxctg1kqnk7ezvclpdd3xmk94xhl16al8vigvifvw8uatogjyipahg7fzdq1jghlfzrw0jqrm5vuknez7m1bowkfngnouuysfy30eojje95a7',
                version: 'wjrw90s8vpikum8ffcyj',
                adapterType: '11n8h4a6l45sqcphvm57738775cundmg4jgfzguwrsdk62ioyobyzpuk0vp5o',
                direction: 'RECEIVER',
                transportProtocol: '3klm05no44e6xftf192eqzztc1r4lnyhzz7ut9lk9yzrp70p7tq851eixi7m',
                messageProtocol: '13wyk8vevwvp97w7zmxahpzpd4jklq6jnd5tzf3t6lg0uaplt9lp58hsy7j6',
                adapterEngineName: 'd1cp2jbbxheln3yajnmi848g071v8qxhvqfc0t7zahs75dxd75dsb4mzl0j8bmvey5b23bjswwjnjrobwqxc4o2sclc0g69tbl5xs6i9viqvs4hr8soouen45q1njhfhiqckeuuanys5qtwheao2l3ol0jskknge',
                url: '3xb3gkvd1wt830mcggu95z5creed1f2e6kopk17w18k0p6kin4gvzir59rxwlenoc3449joebrdevm2oc8eo1zondee9cw085t6dyfcfz2dsqyhbhi8xjipwan4symhve1fjw1af648lupiokleg91vd5qujd1n21ycpa8wbnm6rcmzw3sn1i9v2i82j7drophy5f6slh5aerk1jhu7uyrgcuqlj8eswk66tpdcqk7jq08go0woffc51mnsqopaxfbtx2mxo0i30m0robei1j12k91k9b3bdv6bey8skx63fd0mt87cdpowvqdnl1txh',
                username: 'wq4xbz377n6dugddmjbkul3579xlui7hm3h83v2gqeo8l5mbka94y0p78ckv',
                remoteHost: 'w4shmszbcvfgmcuprcre6r9muxqqhjqfd250vf12s90jsc9w4n5y9hicfkhkun1nfrv6s5k8zroq7u13y6wiy0esy81l3ycblrr32v20s4tuskq4zuy29w1ipradhceptiqg6uha4a60n0x9czzsjf84mgufw8df',
                remotePort: 1469072252,
                directory: '73gapqgney3ry2tsy9vm90b8lfpu9dt73342rrtt75ww0j8vzqwd62vjikjnz7pk622s9h8bmvxwyzvh234rwyzu09fwjb62r6f9kv6qs5cwpj3lo9z3jlu2xp73i30ju3u9jairrpyic83gdcnmx97dfetxvjs81ktxv5dl4fh05pj38kj0ssde6lqx5ax5fiqm59xxhz8m8nlvdkumns8xte5e8p6kjvd1yiemjmz1z8l208be2574ubwsgl8bk9ejqbi0zr7knal6auvut8njxt8ruti3upwxyu414bl5u98vk0qxlb615y6qzer9drhssnr7bg619tusf6q3k3l5g25jk9p8q8i1m2f5ypiqq7fm2dc7kkc5b83313i916hatxk63qk18k5r0nywnnib3axbeu4hrr5s54ecqyclarrxzmhsipxypeehej7fm40kr2iqcxdnbrles9b0781x7wlmvdocnbiooulaxs6e3dgmjugympaitfivpkxcxt3k8cawpykleuj6wrrb5gc9vptadlvx9w5e1dl6xzc3nd1d6xpu2i4nzu57iyu0l00u61xq97744lgqz2hs6nblmxrsejzcjdzuo2tug0g6ltnyas7ssde4us0w4vred96wvfr9ko8lp6dkulcgsmnpsd16fi6ri7xoa5ughhof9lb4y9y3jpgswqdparb9ctee8hzcnkg61sfeifwm5smqam2v3lk6wndv2v1jg9hw79oqbcg92naqc9q58nfurqtc84o8pm16ee7x5jcmalk1eppkyyxeqhlm2t6zb1ffs0avh1a5fm4xj13eos1thrzmw2j5l15rj37rekgmxprz7nhdwyugdzi3kom5uxx1o1mlzvx2wp728d2tmldr05z3w131nupwzut308j7c56mpmuhiyfh1dby6aqh0xeqn5razwoo1fsp5r6q4ibesihqdtl02lr7gkknqjbhntt3xflerz01n41ph7r6tvrjxc5lq4yk774gw4jdzsq8',
                fileSchema: '8mypztljgl9qkmr5mlp0ypiz94kt7azya3ivwwtf8to5pr8gtx98f14ckufbqogm9gsj2uq04ltmpq7dc7yh35uf21xz2kitrr8fgwfialnk2vuqi6i3nmlxzk612jng11gn72klz70uby1ebw2xky2hr2fm6hh6vjm0gqtixtqm1jnbuit0iv3am0kavbdsjzsrt92rm7b5vryxiwnhhvnd9m5g67vc5nw675d7aht3zoy0hak4x9zoo2bzf37ebz8fvfrdmr8t2d2eqf0f1kw91kaeztmdv5hx1v6wib8ivb8m54w2xydulmubcm6nukiy91os9jjvorgea6ngxpb2udohwzj9t3plpfabov90dihgzsnhud3nx80e1ce5l6jmlkdf9m18s2c05e4fga3zhm7vikhwpdqymx4tbx2y3ak16bv6mrywjty8pdzzt7pn2j0fhc33ovcz32whe1mx5gha5baxrbvvro2ch0yc1pmjp39ea80f8h9m892ie2emz25hmjts70lq8jk7l2ietxnf54af0ll3s7ca85rsxq7rwod613q9btnh3g0qni0j5mecilsa89efwyahq507vk3itm0lgfzmygfa2do2a5wefnbg8tfq6b41ul99y38if09gazvpyz5jq7bw0cl675asdcb9dah7i45pk4bv3p08kiwg5zz8olm6lf92u7alsjz1uksdrh0qdgr5r2xwk99ubuphqeqgetyhf2palehmh4efxf230rf6eqtdh0w2stddkd3m43wnjw1111fnkylw1qlkeqvn3ep14lur33668z4yot2w8la5dboapon06x964qx6789lp5mtegkl8vfbsltvddfsoom7h6amqp66evbencd5zbbxer8m6s12kh6yet0h8jjqo7vitfsfg0lio60yb1m006bzrw57sbbiprrvjpi5xff7ccnw41ke5wt60xw8mpugoy84di5nu6kujw78zuvt5my6ojqz3sfrfmh9wbs1nt7bf40x',
                proxyHost: 'cq3d8iuz82fcsnc1fan6fpv2t82xbo2i71rbctt6zs7pdxzcknlxotob753n',
                proxyPort: 8774262985,
                destination: 'fxiwwc4jcc2bjdt6v766ythaodhu6unvk0uns0no33c1a88kt7ya04xlp5pp7zlv1up9y1gz0nrezmsxwj1v6gltbamzpy1hisqa1clyyqjds3ve9v55coo48t6d7yjeaw5ucvorr4843104w0uwvfvyckx9r4jy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4743irykjk8a05u2q7ci0jhjryyxwrtzhyac4v0q9rent9qluj68gn0sz15nddtrfnrb4jq2lk0ohmarvadbax0lqeclr2ipl2bd9tpna8liln2cyu9dkmqkd79z2z9jqj9uo54voxlgse0wscny1onssg6u79qt',
                responsibleUserAccountName: 'tq46r4lbuf4kspm1p4ab',
                lastChangeUserAccount: 'ncapdct17a1jew2mdft6',
                lastChangedAt: '2020-11-03 17:48:36',
                riInterfaceName: '4pvkpsevazx2zvup1tc59woxi2jtx3c57y399d1egh8k62pqmsky1bnvpm9tzo1zd9l8pfmvyy5exn6t64hxq1b4id9jqlwh6i2b8wfel55l8y0ptfptrixnjqph7qfwzev8b1zl55e4c8r8a8xvyhb8cadx7fnp',
                riInterfaceNamespace: 'pruxh5qobulhlr37rhci8jalmqwc38tb20sdtl3d9i7e1ayep9f3geub9duhadhdwldgay4dpglrcdfsa4pdpkuwdn10ycchgwh6jiyfz925j2e25b7b1usq6ycz8b9n4k9ahxz35gqfyg982kdgj4wtnvw8rabm',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '6qw4bw2r1ij65zyiya0qxybsh7h6di6nlvh9yhsy',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'ubkhib6o0fbscbw0kf391if3a9q7xswn9abykq2o4eysn5iu9d',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'ctg1znodefe6o724q691',
                party: 'yfnmdhiwn21wtronzjjor4fpabwijl2vwguutx0g6q3f3tjntcg1271xl1aaq4y0bfl0l4gjl8nhozgbnw21qylg3ad52pms15izscqhplrfpaa9zf4voa7sv9vu0yni69ebhdu224bbspzdwasuezzsy0g8r8cb',
                component: '5oxvzdudws44qg7vlgy1eydacdyjucnbwwus0s7a1o7zdmldceq8cacesje22aq0nsnwl3ejscww6u5e7tws0roaugiqkafweeuhwneplb0wpww82i5mr6eoljgt7lpd95vc47l7vk6mg8fezuwjrqdbewqaadon',
                name: 'iiasu4fl93l6nc2dgpgrgsihy9bsmqjdz8gtzgk7somwi8f4qo98q6qf9hnnjxcxtlyqdaq3pme52ds4sh8ihxfhoic2clj83dlj10fr42xl60yumgfcfhnit6n8ypny5m2379fcpjnewy5ku9cb57tcx2f0eqsq',
                flowHash: 'dinbce7wt1sm657g80z1x982j87h56g0ht26468b',
                flowParty: '2z70yk7f3twytudl6evyaushx32v1qep2ci8w4rwtt6ge2th619bsrpkvxei513kfiajdld7au30d2n5idp0rbk8jno6jkq6d1x920xw3wrzietq2o4dtqbesaokx78jstv1ihlw6603sviat1eaqk5orfheochl',
                flowReceiverParty: '1zw6owjsar7phl0jdxmcf6g0gak7t2nz59h3yahbhsxeajonq4cn46heuvqizo6dtbtjds867720kkr37qg0s9k9fd1oh539c3qdup1hin2fjywtv8ez800dszvw8wqvo3fjd31ezu7a2320p6jvzd67nmaf7ln3',
                flowComponent: 'ik09d5be0zylgjg4v9n1f5p8fn2wnjj944imyzlppjshmkzjk11dyrk8vydmor4ppmnozborl82cf47ov5o9ybmcfx4skfhjd363olqh7v0ii5qvlg0t0983hobn1chuc89mfcmzm6bfi1zfje18alo4m9vxmkia',
                flowReceiverComponent: '78exo8i1u79qydiy5fqnorzywhidz579seel04x2k4xuoqtjjeil31r1ub86v2eti7qz4b9eeweepjbny5ialyn05abas6gbj0lz5dt4jb7ogt8o1ibbxi0zomlu4sa9g2ter94i2gdqqnluuufn9vm7ugynlvt9',
                flowInterfaceName: 'frrdq1hebl1fywks0fjinsj5wqgtu3tg8ac52p76hyexmjqogo8u7rdfsfervvz2pwg1se4w79pgjtdfr845aeutz3vdpl223hy2wbluo83k1chmpoe9yuho9d8ybqmtvwn3nkke659077cghufjdtkmjl6oivey',
                flowInterfaceNamespace: 'muyx7yuhubt0i7gezkkvm4ulvhldiuc3650w51bl22z4p0axk01sz9oazbt8gtsmdzgovfk4vhq2eh50zq3yiebdrn62lvs94mb9wn6s9s91rscnm2fwzlzck6p65jstvu0rk5r4q8oipz7j14rh2h42mp1m5rro',
                version: 'usg5ru886pqnywa1g37h',
                adapterType: '33iyf5h4zw80cjlvi8zpdgpkwzgybi87wg22ip3uimpvxco4n595py9bjf35',
                direction: 'SENDER',
                transportProtocol: 'kk3zt8zlhhlfb2kwas0bjv7gfoceuxl5itvz73btq8xizm04ne51hg0ogz80o',
                messageProtocol: 'cldrfkahftzi8gehibgrvw18dmxpq58hkvw5jdox6zgndjvdigexz1cvmu6z',
                adapterEngineName: 'rksuuwh5d02qv0myu2k2xh5rhpklkfylqrwfvuacn8g489ynwb9knqm1a58i7s9hpglumykzrdm98m8idcuy9szssr94snfomdqhlher5rf6e6k88n8wj26rn5h9q2kwqklonqs75vqsswjluh11l063ipmsrh61',
                url: 'hnknh7qxy7yylc22xieqwzhmmivmqka892n2jg1arceba6q1hj0wpufaydq457ifvuzuem8yjgb08v2c7kwz24putq29hw4yy4nqrthstv2yvpr64scl991os6h146zxpw5bamwi32fgpa37xg6kjvkcg7u9sxgh50jkj87lykrmnuw99z5xm6ewkmg964dwfyo3fcfnkq0say7rjh2gcdlgorcny5fmaa7xwv6qm8v8ofwqbybsee873gpcea97m28v427aqwrgyn0e7s80ggczceqsxdq19xv8q6bgthx4d5ryb9burqb8u7kq1ear',
                username: 'onjs2yl5bnmf1gavle6qvxem0n4vuxj8lhhhbpe3q4tozw7ijkvicwhmgsqg',
                remoteHost: 'e93e2wqhgqarbgob70ugltxvib09njxl44nbwewiwj5spghdjhfchprrzatzh2pxtm72y89jj9wg57k7sigd6gjoy4o0y13beyhl9vsjce4vi3j0dwmbajik56slc8qtdqj3df8kzkno377qlnpawhui5z83kw36',
                remotePort: 7805249020,
                directory: 'zbety7wbi1flrlttj76me0ty007idadfhfyo1ucbbo7k6cboqnq57s5npei2cpagx1hm8d1lm2xw3coc8aia63ag9gi4v185mzs8obqewrqm4gu6qnog5x8g6sg52115icpaae8kgps5a4y60mnxr4v52aikit11ttop9ziw9a7wblvm62u0dqirp1y2uyx9hvfhsf5a987ms831doh6bjodcb15ofvoijryb8bhwhpzsxkav20wuk2cymxk69abkr93uye2minrkpo5wt3zsw647die1zg6l1pmd7cs1zqtp6meqjq4nkvj25xrqv5rye7whydnvj41ydtujzgc9m4xkp9kpy3fbt6jqdu5r3qphmrkq2l3suk5swp8b9q0qkblx0v5t5xehp5dtuc6o1m3axc0axgikwgcl1a73mwwbvimqu2er6psj3syggtahuzsu6znc9gvxnqmgxfhjvxzdutsikx3uw8p4p5cutp77q06lcu0bcbwwvglby1unxvekshxa8gouwc4665cmj8qj80wwaddy7c0vi4uigziwtejfcgu0h8j47j8ppy3l2hg8ga677djxjwwfc7ew9v6h9isen2f71tld5yicuc6dqm96pfojtlvipprrmd4bf83u1wfcgadrbogjh3k0gnu2lzl8v4zgsn5eqcosxftwpeu3aojg0xi3xzn3jd685yyt7w1tasvystk80rkpkwlwlzky8wobctcwnv8nsjvivkd6h19yhxkvmyu5elt87fs0c88kd8ajghtxap83jn30h3fja78y3d5ie7a4xsmju4xg4c7yevyfc214l8zi1vg0ikhk2cx7kw6059anmuqjavczu64vgi8bfy3bun4rpcmg9l1eojhb6fhykjjahntmvc6yd1imn92sdinw93w892s74jcaftt1rt7spvt25b52h456cgor5pw2g0rp0x5t0tcje0ci0ujtmjepnxj016c9y9d6hhddmoy0vvllbkwg4oxjmaq6ow2onl5',
                fileSchema: 'jo7mkjmy78xrb1wg70ke8osrjvrnuib9n93dlim3srbzcik6x2rgb5ll2tf0x13c26pe10kzo8v1qzk6bt9r8187kq9it1razxcukdj7wzom5cbfbteqkotamwkouyo0926u9iy1m7895nyg21qrhbfoln7ypf3ctukso531l333qezkzdi5npc0jnpxf3cel9fe3gz8cvmv5jgsj3jxrloy1c1quntgfusrjbuq3pn41d700p54768zw4gfwkhgaw7fm4tjofjof9u66gwrzf1kny3o1na9vxzphuhzgbuurrhstwuw8df2ozkgb4qptotz33lcqykz90if1q8uljz2zqi2ev1grk3p3wy57ofjhf8kks438de57oots5ch6dpl1pvcb6y2pvavz985oxyeyl7ogmuy200yv7k76tjqbu65tjzd3tsi3r8kk1fc7ksan26yen4cgslpin6rm3j9zfrh8hfp0atgpkwu6f1qtbgqbchv5leyoyjpwumosqmet10jxni5b40uymv71dq3ctow5qgdga5n6c6nljdzz02n1tqo6iiu2brnlu5vc8dafm89rcnx1w1xan2jd8ttdgty0lnjziyra551acyd9tmh31awgpny1y73535b35st3t2jczkejtec5qh5szx8qog7j33fuklapt8fnohxlduorrz3a67w8froxbajv6ldn1keb23sv7gdaratpgl5o9nu5pbm7adaikbj9l802eieuutp1qutkyxnsfnkfcyfqujhluwzwg62i0pn23yshjthrwrhzbnqxz3rrt7jwic50e94fxh2ixxwk0ctzbrnohviq52i39mw2hujrnnh56gb4gqwyazsgf67ylj9qbgsgco7ot91xpt1ss1vzf4n14mkzb43yahrtf35qakqmk4vu3qhsi9jin5zd1vhmvrkv39iuegh28n423lase9exdav13e7pg02xjicvno7xhoeg65k5sucvpoegqlsrqnw58awqtrzb89vaxs8',
                proxyHost: 't7as06bvortfg0anjesht6486d55v1xoc0lbgjszicbq21i502lyh6ajew4w',
                proxyPort: 5211065509,
                destination: '3nm4chfgxxlvqovfoqittv6n96z4pubsfgt00da9o1txz9iz83gytt2vdlmufd3aartygxcndvn25sjk5sw6361u4gztu9lrs60su01fp46y338m1kpu7wvxu3l3jw8d0v27h90e7r0s1zkzrahm2pois6ytrwg6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xdccw0v30jp3iqq5nukwf9lt22fwvkoea3zzdl67thvpft94m4ncsqy1tyem2w82lmigg73us3jxb5mh3c0old9w6gg6vejbvrrss9spcly60neiobeuee4a40y65azi0886m20hmulb7ocyypxwklbt8k6jr1dx',
                responsibleUserAccountName: '9ti0fjmzgw8ph91l2zu5',
                lastChangeUserAccount: '8kyyvz4j1anfdvaerhy7',
                lastChangedAt: '2020-11-03 23:31:39',
                riInterfaceName: 'sqislf3phj6ac9chvyn310hcffjbhdpzouo85doda5jl537falsr9wqahnki5dqgc6obbujgcuemu0q1af0ltpf598s5q4u8vhcvq23sggtxo73uindyesoucxerzvkcbssibgk22k0jspkg9xolsjhdibyugw2w',
                riInterfaceNamespace: '69xyr08cllczl8266a9vrd1zhj51jwzrnh7wsr0lghx5noq3szrochgxslqg92cbyptoratzyeg98qthkccuoci2dnnti8oejfz9zu0ngrfdlww0x9oqzml21cdf4z0m7lamvvv05so6p4j0vsa7ep1e4hxmp1gw',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '2is5bfat860fs91ni6dmmzqf4crn09069v6b008j',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'jucca93klaxo1y0eiu1ckrhz5gjpo61kbyc8h694so6xlgr939',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '53xfvk07nhjj9kfzhmde',
                party: '1k8kr8zkfcv8ov51hj84in5h9zmvvfj2mfcciygedgr1cp1ilbw2v6u19ryb30t8ygoxdupup70mqpwflcrn5xg4dwk31tdqcbdhfz7if41xhcfszs4h4sjmk37a6n2az3guw3kwujwxuv9jqilu0mhnv89jlluy',
                component: 'onnodbvpmffsbbxpoduo5veoykiz0vhkdsmkxwv67kyunjudk4yjqj8douadj5nhycbj6hkr8vjnu5push5bs0d2y3zw7orv0qqi2fxuf5kjqsqlw3dp0mi86c23gtwbkxxwd5pctkkynenvu5r52b1hh0v4wt3k',
                name: 'xp2tog9wlnp6725g2fe0osapttrhltrf3u2210nihhwaagvq878fv8xnqonjtzzchg1b7hvpe4uvcpumji0ks1f1p98g26ii737knmzwgl4u12nn8lg14y4n0c4vob6bgddf978dkelxelnfx8uotg4miv7z395z',
                flowHash: 'hrasw64o28hvwg2ganri37w217kd6r5umerq44hh',
                flowParty: 'x0n3cx410h7rhnngh2yel5q6zoe4s4qtjcbzknt0m3nmm9ovs14r7hiyl3abbuq9iqvzo4peumrzom7zl3b74rw4jv00amnfw5msariiblzo2eo2pf6a4ncazits7tx293ipe1rgyy4yxhbs0a9v4cq3s3nxtd7x',
                flowReceiverParty: 'zhkoo50aq2ia8z5fqw80nuq7zz4q6i0ru5jlflbi6ahpuqmy232phw612s5dx9hhth8cu582gq7f0psqrbx52z4yu5cxiqx6s8v0gqr5d9k9nfcj1w6h9phdtt37qqpdd7ubi9iqjq8r7nc9p2r03zwy51q3ma4o',
                flowComponent: '7w6cuupm1f17h5fps6e7saxrdhpmur7shbwzmfj3f9bq1i1en4fb3xivd0l0gquo6ib0zc6a1ezmw5hk5xwvipxplgl2r7tulmk897k22umn6cbwqu84pu0vdxndec0iy9rb15un34zzwvcwwpl9iusdqx6550b4',
                flowReceiverComponent: 'abffls9oe1um64qfsu8xcpyz98ci0d8bk0vkn8kc4nbk96hsolb6pkz8r5ypw4wbny4sqyhe7hmw1n3f3m3i7n4kzq186lbfikwqumppaxxw0kxv11wpkudc8eeztdadjo1g4fkjjlldulowbttb2dpo9v5lym3y',
                flowInterfaceName: 'qcov6aep3o2pa9ugcsbvxh0bhsh8xw8mueaplc7hft3fo6grrn5bik5559tmd7yrsity5ffo3e1aqoqef8sd4qheajn4hfihjprvh3lzhq9lo7e2202eytwnti9600nitbdsih60mqw9sv44wkn18n81htdi4cks',
                flowInterfaceNamespace: 'y78148vthxcb7yh5bue7y1xjek9wqmrm9297r05edsyz6qwwm74hkgwybj66z995sld3e5fzx78mx1ntzffrttz6cp1u5aphwjc94jmx5f747bz76pawdty5loon98iyngw972o9lkh1lvip2ke7oqatp218mhc4',
                version: 'x6c40amrezrxx5317bya',
                adapterType: '5ydtt92z7lep4rdz9pyq4rr6w2tsq07i7bcma12zfq661loqn6026d2m2c9x',
                direction: 'SENDER',
                transportProtocol: 'vwq4dvfafctx6jmp2c1g9qhb7nuob46zi9tcbpvsegq2iisgji4mio7xrvrg',
                messageProtocol: 'nz1qu2dk3r0xvz3rv7n51z4blvogmuwro44miorb38ws2e9jgmbfibijqjfg7',
                adapterEngineName: 'oeb2fly38yyketpkeu2wqwtc6ow8agkohx5egdu9x6gvj02ujgsxjsv2niknorur5ce01aw7betfna82xgvnin3i10jasx5c16pspxof44qqtpgghvrdsnpujqc0nqywc6p3lh84nh0yzrm5kc2wveuses0ue4um',
                url: 'cyf517s3bqjybmzoangvq8t8iqymawavwul4c7yvog05ry8w88siy556gred5e7habmg3ztm1lpsva8fmwv4ge3c66xp5hhtn9i4l3cyeu5g08ti9wfc4dfc8ci661qf4rx2i60yd82k6q0n7g3nmk0qjkt29yb0x6wjwt4xf4jmfw1lz1btu0c96ooq9sasg1eet21e4cgx2rgd28r01pm9nttowl4xqq2ljyhdoti730a2wfkx3ay3835deph3ry2soi8kkyx06zdh0tiu30d3vvi0gejpskbuyvh8ealpecqewrriuwsi0tnsv82x',
                username: 'trvuzf575jy9itefcpp5r6ovibgfsvvdzgjf8p8zx2kfrgz5u4azp45po00o',
                remoteHost: 'mmh51gh155cca050k23jf9eg6986v9ynzhfpsehjqrmr4oth4ppngqp1lfb48gyr2rd4kalqqszjjwgu007i6yv8vjxb1iukneirgy877x8kv2nefavchrxd6qxquiuj04gej20oo5x83qp5wl46tvbg350gnqoz',
                remotePort: 9211937684,
                directory: 'w75qrhks0xc213c8maqbsclpkexss6r550d4uzkqbsix3wfx68yzzerwxf8wsu4mo5esru8kfrykdsuhq9zno8ztnplkd6n65zo9jjjc5p1ifjz34nwgpvuyp5sm5muyy1ip094rqp5ztyatfyj1p40mm122i9knfr38c8a2pgo3qdcwdznesnpz3e4rnhe4hgjvp11ork13q13s4wt15ohb1t57py16rfb0a53bt1lv2o0825zr5tka253ho5tpo4st91e7zdxhne50djzw4d77uxulfaihmxmjnqhlk61ip6mpplkrqa4gys9rgr84g5fa057zc52r2yqp8hq188zgi3x09i0atz9tdpvsar5etkqzf73qk23nbbh6yalrqxj42cmiiikzd77ay99lc0x14pb40u0wozipz40hkkgcfk9mcmpg53tr8kslbfmn27yaysf3rdciwvii5ulldoqpiq1ijcsozqm1a648fom0nlobqtkb9p685zi1cftqfs7876br989duq51rtjoij4i9h46bl1l96t3jrq0htjqw668q38rw44lu2u0hhxdov7levob5anzk7mzfgn533ff6kny96qxdhv2gnk1vska5wppejgf2512mguoxdhax28g7lf7quhn5mx1rm2r9fd9rq9cfev62rmmidy4kiymglnqcl8ea2wq4xjbmkgdan9glyfii482zpkk05a4sauefc3gxm2kxvsm9hdo9j5zveohn57glxvl2hlbdzyab4ynewiqgs5ajiay9il76zeszp4kbk8ra9gh4aykep2qhsx6lyn1syvim8hpzp53jnh90hqn0f3bdatqni6lhwpokox5yqu67y9oz3n8rbu6ceqvfw4xsy0xkpvorsavza0df2jt4d6zxlxtnw3w7ni3o2cxg5bfzqwgx83lqhtxikk3jk9pbugw8ixm67d7p7un22g72mlylvemzxcafq716a4pnn9ja4dblezdvokdcayw7h3kmbb9qpvowpvh',
                fileSchema: '6jmefnqgfrcl64sn3rd0i319gqifsa27wg92qyz5yfkdchn5iqhwesbesylwb727e89ufi5oxp5ew1lnquhkuukt0xgeo2y1bxjcpr6xjq0ui9xaxcu0hh8cx0ptwg7x333agfmrx04m56x5091jmpseatgqvknhdysq9vunytkswlpobacj6i9i6z21nawl5zu7e11scdos5zn9v6o4sl1a982rqj23ayb96ivv9dss2d3t8uwahjlobdyhd8gfq96eao2eal6vzr9fkjb0kpss0mk273bs0kzmwbt30i91i4s94opn0nvavg07s7yhcg5tcyvlfdc018lc70ldirp1fbe7ca2s1lxyy33ascndylgeoa501yjfjb6f73k007tm16y5z6874jw5xaoelcn8sg3ofq4xif4815m0idhhls755tzxog65uk3x583mwi6mov8gmiy5c1vv04l1fd873cslh4k6zpdmep7gf05acu47hywtp0egkxs59ac46qa55bwnba538gxn7g3ubn9p9dx94itf34zyj3kzao0pmwbybeaquygfxsl795krsz76d9plnkic2s8lcax1e30sic9l5tsdrfjq49ldqv5atexogwna1paz8grnk34i4uqmqkdoxzp1vbmjryc39w99hzix9jfd7jtyci3t7v5pu8xzaxfd0htrryx8mc6oy19t9mnj11edri3gk5cb99e11m4ez5bklh5voe1s37tm0ztb6x92puiaoaqbrhasbg5ow8t0zsf41x3hhsk3lwdckakr63t9db9lsre733nh5ib2jxrifcs2x1p7nob0ur1pn05vs69bbtiblhl69n6epqoqhodq1lo3b4af7ofwj2itmhthwhyfjcep0g1on0yllrjzfk7goexq9swfukwaj5uhm2vx43aaiavxkhwjbbl0yalq3eu8cza13viywsojminp5wyidzh4524ah30yubalxf3yssl0mdwz8xzleg5qpnk3fv70ofyu7cpn',
                proxyHost: 'myue4rwrkmsdqjw5jvz45bikdwilduu563sfystnpu92areqixdt2tjqfu82',
                proxyPort: 5109869266,
                destination: '26ac4cfi6ciw1fkp3y1woldtvrzxvtgidlj9i2qy3njpgf0b93ygd9s6gjzpcxamm7erfo9jw4xz0klq3puer9syknqm92tixaauwhmtidm48us7s68qyinyk0faaieursv5f1v6j0izuogaqi2gixzmisa4fbvc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'lni4lqjhpm4f39wbucg5sdtvfwj2bhist84qtfcpsd7nxvity314bo2qekdzifntow68twr0k7uygn4xbztrusnb5aj0ecl4ox4zetuftu5v59jfsoajrxmny8ck7chf0gm54czlwk5hzjld570i6jkccfqdw4yb',
                responsibleUserAccountName: 'j71kreuyecqc0h8o71p3',
                lastChangeUserAccount: 're2tfjenh94leythzujt',
                lastChangedAt: '2020-11-03 19:13:04',
                riInterfaceName: '61t5gk835sbazf9iaghkqn3by1apjmo4jg6br6hkl18s7w5wdcivevvo46ghpv67mrd9ez8axlqnyxmidux0dmoym8ikw835bel80vnh0jadvfnpsoc94m3y1zkndkx27vn3mty7ya45sgf0wjxeeaf98muz2dlx',
                riInterfaceNamespace: 'k03ou1dn3lmjdk714rj3mq8fltnmoyqrwbm8mlvtker1vt6odyplcq1ekbgilef0ohkxzeoxxvi5n1339c9igf2a4rs895mvvjgb5tqm91xcmk7s89v9m379yhozd2eu7oz8dk8u9wni89mtp4taqyduyt0gcmxr',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'kevcp80ui1sa1jdiqlldwhyjd40v930iwdrrnqjh',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '95nqmlpp0hzpd8vinpkmdo87h8px3xe329i2a5ulwt7ncnluvy',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'bk399n5233eifzdvs3nk',
                party: '2qhpp3rngbijfmnelqft462gmh7it2884age9qlem8vr2bm6baum98rqj2li5o8qp8d103v210lrksxwoo9epjmdgqft0yq41ahy51i2fq9k9emgbg7mykyrgh0oxq6y0jpy8rliu7pr37ky8e89dqs2drq13no5',
                component: 'd1tf0nyg7pj45hna6uerkh8y90pked8zi6l5smiymm0lbcm4m6h6gpquf80akqc1lptr4et5rhxtujov1vkaf06zmjy0tc2o97djenbaanwx9fhis3z1jhp97d46mggokfbnackrle0bodwr0st5eqkic1lo2vrn',
                name: '385nr0o9yv1p1g6l4el8jg92psj6dcqaqd2cjnw8zgvzrfpwumh8gras7nppkwxrba4um90qshi6svgaqfitwi69xnz3wt4pch1tiiosd3fgdm07ueo87kz53pi9pw6xiceqs66mwn8ikn6krmxva3z9p24btrhs',
                flowHash: 'yjhvc9hjrxfhkhrrn6lnr4krf8fzlk2kx9szlosm',
                flowParty: 'wtr7mkerhe5jgjpgx9ciyi3p6qnuetybrfwk4vf3rlzjfe3fyljxk80vdv1aaqea9s97k0oupq37wvb3ch7szxvp3po3l8g46hd8dhz9z1l9nkrg5owqihrkll4l7wpdnvam4922pwzshjglz0p09k5ro90dks39',
                flowReceiverParty: 'ibfbv87mw3ebbtje0553xng15or4kutr3zq2g97gqx6cx0tlouzjja375nlejzo4rya9jz2l25vk7pwkxvrmy1urtq5pr8h0wyu6tlq27r1z6tulezhqpcwbjpq1a5w8n2aze1io02l907gyqets59qlinx0ejpe',
                flowComponent: 'ycfkdny9czjcdsjrzezj27bd8ztlhmqn57uds06yk11c49w5oovgapre5oyuij0elnhiiv6p1ztq5r6izo64glpcjqop73f72t5hkak7h51xq4tx0cd996vfi2s0vkhfaxrvcky7axql8cru3yc1ywcxyg0vzwvw',
                flowReceiverComponent: '4tgwfz174bs40ox7hgus5vxdbg8a0u0f7fhm05hzeuuwp26mys89fb8izndo47blk0wiblczy38tqlovsfpwgil2ybdvfhqjlkk4eyz2satb6pixyn5u6zjvxw5i6fwjqn9h45yl5hcr8umxo7ghrsrpbnky3qip',
                flowInterfaceName: 'xhzcdr10ir9timghbmgs4i4ij68veepfifaqbqeq7g8r4cltoyiwrxqg1b3my1mq9z84r4hbxla1zcn6snep5dk7oem6xjpg7re6nh136ttm8y5ni49nyap4usyra3dkd3ok20i7phymzr3cesoxifmzjafk17nn',
                flowInterfaceNamespace: 'o09o614y7o7i3qlpl42591f9ltd3l08sg7ct7h51po2859mlkmo05hvb6w39bj9bmu1duzgjj7ywc4malczwusidtmex8c8zjli6140d1t80qehigjl6b7fsvp5muo7dig9p5c6lc1qyfvfetjqjvgur183y8dpj',
                version: 'y0qovp8q7jmcc6fpv70g',
                adapterType: 'zsl8q1ve75sshiuooiv2jrbbe2zlz5zc1l856ole3vaqpytivrngcdjukd9n',
                direction: 'SENDER',
                transportProtocol: '996tp1wuggxo81srsppwbkltq4qv4ullf5qnorbu7rn0d4h1w62pkhw0zsnh',
                messageProtocol: 'zodqru95fhjht65srylby21be87fr3j7y05cx8cwxheg5ubwinubsjsfpa2z',
                adapterEngineName: 'mr2mhmbu2ie6dvksjnt6fhb948sistkjx43e90hg8o374ikexiem05ynha4ola0tlwbk1lrm4i4xr4ga3xywl49mqs0nlrsjh24wvz78bccu5um4kfpuc6vqfttsgiclwcj9amxl4j5mfmtfob1rfsqug4a83mydr',
                url: 'gnxzbsys28v8t1gpx6djb4ai34arhu6jqkuf3cl16d0rfz88ccp61yfp0w3cifn0hd6novje3qumoo9imxtwq3oa8qkoszjic8qscs5p3htt76bsda7ywmbgtef6e8u85v5paw6csy7w8uxpuy9ul46cenayfqd1fdsb55bozwruyanrzjmgjvk9c8xy3gkptjmsvdl5hzew62ut8fzsfuagg858vd7hgjbkgyu4ockuendvuglvicyvf9av8ock4aw4jude44j58gz9ohury64f031jkjvti8bsztt3nul8lk2219vr84kbt7ryfrcc',
                username: '6gkc141m0bjtmhqd9xzyu5ssxctq95m2upjc3b35nzkmqoeyfkf6ki9lmo01',
                remoteHost: 'iov7un8ekwzdifbk5w8o5gohk2hsdksh7nkb5h1ci10tpeuewwryisvnyca89r6wa96cmtg9jc5mc28lrqts6cg9syx9y4aa7qku9uyqq78pqugk8vban9jpcjh90hs1bky3r2evuy6z031d9v0ik2nfyzztlqy2',
                remotePort: 9504175518,
                directory: '9jowlxwzqm3kxtdo76yi44phhtxbuwpi5xix0bmxfb1e37s5yubvke02tcbdl424blq7r5u9sykqmndplthm1wafm3wsxt1g7cy30b6n48h9pemmzo71rt0b7dnaawo2zka8jsaf5t4l8bxl30cti36x4lddxhp709v8qvghhx4vnwoqz1rm8r6ay5rj2ns4zyo49m49fb27kov7zn3nmlfv16hz7mvrnzv6gi1pixclfex4210u05wypi933xh63kz4hu998i5mrehbkjdx1gz9nszpwb208cpnv0g715dx0ivn0jd2u003g00voswz40k2jc1p2ih098gucqzp9qhq67wxyvpviucv91miqwcgmg5jf8u8srmcz5vauf7wrd2m0t2up8fi11x32uu1wvomldaajvkwddbqsb4bfoweoe09jv8uu95x3m12hnbgwg3vz9xzhsvojjop1818n9l5gkhjdybgn52v162a6p8argssf2n7a8nvma4ag5qar7fj5ko4wydokabq891pfzb6jtmby65v1t0tmxc4gq9gh04a5wyrcxvtw4mszgk58kcnmjonlkniljssiqlhsqvmemxyavpmlz4rpvsf1o5clxgqqt49abcjaim2gcm749zj76hpptmj9ykkydjlxafqaaiez7eg6duyvm05du5co8qtueoq912eo1vddd37gfbum2h17jt6nw55xwjgh5afsdk1rc50wfq647ax64l9072f8lp086kn13rexoe0i7rka6aa2kcjk3ixiidnwnzz52w8utm6j1axowxj8a990sm7wiidq1a9pedjucqyr5q8v871j2g8foqbiqgzinsbwl5g9d7ljnbjyobueg98f2o2lvv0sjbui3vq9vrvz5l0s73jgv7pvff3ma0glg41i2qlu6goxlv1l1d2v1pvxlpydk2bjezawit1w85xxsdojb3wez2l0w3fzcrcvc8n4ng2bbfz400a6f5554nbwzv9v570cjbl0954k2hw',
                fileSchema: 'dac89yajgf3pdukn3zzy2hb2pcftyvfhks6pcibtw66k02jto93bzvl29fcgmqp4arpqkqpdpmcb9lhhsn4np4814fg9egpcllsij9vfoo0kgpexmho6tomkbnz9uudujmd3jy354w6nvhy5yf3mrbmz162c5mlnu3p41n40vew0to2hy39ljdqypy34ab3er2mbyvnvy2xfqmv6cok7vmql3a2v6cx1629v84nxv4sak7aqgazma19sh538h12hc7k1d26qvh7n3aztc16uhxl652q9l0nhpykcnf7ulcerieiz4mngl5oq06d3oegh1o3uxvv1uby9s17295cltplsx59vqay4u92585gmz48f8v1ijqgh60wrnn23iz9t8fckdftsf7qlgs7bk1p3hg5x9i7ytzbpw1pbmlyek2mqcs3vqaxk5zwzonq3xheicf5rnmrm0o07jzm2e5bbh9218elqhygydrksfb6dmhlx7dlmlf7893zhnyz457vzm9w26207fn6eedt33gnxyir20kr38999hg0xhvgz4knteoratljo6m49ex8hfkjymlo7786frh8q5zdbc7btnkirlnww13ycioj0cvagiwxyh8wju91ykfohej5hf1aj2p6jhc56sunzty1u3wdv97lxtjzfarvh1zbrs651fu371cic69jk9oloy2u7lyfd5w8eu7l0v1eh41mz7rfxsaciix1yr079ywle4ect63bgnzxn9qzw9ir5ufnd5wqd25v0036d6f2jnl3luabajczu9rz4crf4ojr2a1ilac3uz41w0529tb53r0junrk5tg0ssmuo7ym81qgbrv19crp1iqe1ewn2g024okehiujfakhzu4xhr6vye2zj4h10om985mpzyv6f1m0dvwo9hmzm9r31g1h2adrujp89hdflzro6x7ddvrp33z6ky0zdt0o3nhd5ffo7gp21uglmplfmxm78b8ok6bn9m0gx8akyg7zw5nkixk68z27pp26r',
                proxyHost: 'qxrcrm3drkjqn4rrh5wypygrk6nwn42a72kgegc5a1fm8sjsh6b1ncetwq92',
                proxyPort: 3427525024,
                destination: 'dqh8lvxqa8ouz4hnrh0npt6fd9mhqj7hlmqt9tmnxo15cj005ow210pcq4g6228rw3x657q6b0q88gy1jugep25sj0e9iozvx0z9d2t0jkv1003ngddq2yzfb1rdb5za7n9ybchflsz1f9cqsboyv30li2krw26a',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qmln995p0qxxgacsc5njglo9eol80rwqj9kow2fvhbojvmpu4tau4pfapsze5kkz3q573545unjyels3n5zmlea2w14s41kl2n9vxe7evwpmwl60f626v1ujpzostb9rnhovv4d39qowcp17dlp74zusnpf345ai',
                responsibleUserAccountName: 'ifqzeflaz5181k8w9ud3',
                lastChangeUserAccount: 'lxezzwej635w5z3mdnd1',
                lastChangedAt: '2020-11-04 00:22:50',
                riInterfaceName: 'ez1bhvpqac995og78zt2gj324es0dwfyf0p61eouaxxw0l74gnt4hbfsbkt60r34su9j6ra4e1x6dwdz552xq2xkkwvmng71y597qezcxmnh66csgoawpoygk55xf5qu7v1bf8by4f2w3l2pfwqd92yvkv4ub0jr',
                riInterfaceNamespace: '15f2hjemzcrylydh0bvtt1wkdbmsuf10a58x6dtpro2gvus3jzu2p5sngqztt4enws2tm3ndkt4jfpdfw1rmjgh6c80wi5qdisn40rdkwsy6guelan2hi46jqop5fzaxhawdcfkd22dzj9806tcw47nybsenhy9o',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'o6plyci6v2jzr6y1glq4gtdv4ha9k3b74r4rrmq2',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'xkgbng218vtx6xjk70w4cdp6zl6kj7a3diroj0fudm05s2pjtw',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'bfsicn3c4kbn7w9zyb7i',
                party: '2z4kvgpwzacpsp5zajdh8ieux5gb1uyxikahdxvn2jisyehl2pm0frt9cdi0h0arsd31uiedztbp43bhnw22baq9gpo060xho2jj39ew53lzw8f2uusgj34cy88op5hyf6l90ro10rfo6qms89hega0iktkxlbxm',
                component: 'alg524f8wtu12uefu18ksuyvcoz0pfwm7je23ycrlr37llqbms76id51bvq1bwia3onkzk2lw795zzr9sdzy28mlhrmb7vqfyfjovujxdijx7zlaz5lqjgwt1sbqmh7myvge9uu7mp5ax07fmprqx6r9b5kjstn3',
                name: '5hwszk907g2yajlzoko197eefvtwsmtn9uqnfsolaeeuh7w14jghjpg09cbvnsf6cwr7l2cskggvz1rctzzjmu1zszja5kqradxuxmuqkbzu2op8imhxitywxegcz0b6m12f444hiiv7jasx1i8l573n58sgvgp3',
                flowHash: 'itckgafbd1o8i76bayysq8v3m7pmt9tc30g4q99f',
                flowParty: '9tzbgqorh6x63285o6vrhg8ftkj417xlmidarc8b8tow83a7syiwrnzsco3inaid20eq5n5wejs55ug3bmqezz4hc40fgxg06jkmfa2d53trkydmswsdrc4yjoxwj8hndo06hf01uyw3drg4kkdp3jn2ncq1ybe7',
                flowReceiverParty: 'tp3cxq9e09390nin5zz7xt9vblyrlug2vq1hxvlg8owc5zvzrf4ld5t9e4mbtbvk8j7y5vcj10d1g956xkekpwowc65435ko84itosjv9ercay7sjo6gz0tpu0jxh9h4iv8ioyt8mw9r5tdvh3abvasrhk9w3dnl',
                flowComponent: 'hh4t1wstw7rs4jf7ptbbnlkmwz9givgw70x13ns8t4vrn4dc1pr7whgtpqldrpbrlmy01v2wtobiqtniwwqmju7mk48hbca1rkipgj4bdbolercas750oekug36f5z6er0yyjvznzmjrxtfp2xwne09te4wtja3v',
                flowReceiverComponent: 'wa7ch97va7yxtcjqdwgdr48d4c5y9o5trbophq6zbfgzw12zttvnlvn7vek23wlbjebx0aijetdyy7no9qnylp94fv0a1uszjqfyruf6516mddowobnx8m81rgrgj4y8megpj1wdfkjhnu2k931uvmxymxxoci3u',
                flowInterfaceName: 'wkyb21eobnh49s3jg9gpqttuf4x92r33cewxftiw37jt0ezlp58yjhgusvnqgkt8h1vbjr0k9bh8qcs92amo34wocm04gk34158wfrzehh0djrygg092i8r36lrnpl0psl0cgkyx0viv0r96j01f9bkzprdodxhg',
                flowInterfaceNamespace: 'vckbsd1lzypgy68xxl24n8rh6lrgjjaj1g5x5ijqc3xa5fifzqgvhb6cez6nt3iawh9teydh5ynvra6qs14pjr4nod8htvmp3noacuvafgoa2y815wzg16wvo8sdq6nx28nqg5dhqej73ozhw15aliv41ei66pw0',
                version: 'em434qzfzbbi4z0jdzvw',
                adapterType: 'z038snxtps0vovny697ljyc6q7u33s8zcme9mjcduz7s651v6fqo94leom2m',
                direction: 'SENDER',
                transportProtocol: '8tinow0tavbd5kk4ghy7izhuwih3j1lgwfhys9ycuaj5xcjecj5r81a93qxv',
                messageProtocol: 'vpfnclbczgf1wzolrrpnqg7m4k4fmvuqxqxgfh7gf8q0ohrsp01v9lb4c13g',
                adapterEngineName: '8qqsfev8slc3do3y7f2oug3u2blsc1fsplamdpr8btthcy359zg0h68y0fagzxp9ts2kg2mqujdtxi2ukup8plu4n4bhh7485vuzj8i1ykz79wtc3k2ms3bpf61fe4e7t3lc42fxcaxu70hwkmciqks7vsrl9m2d',
                url: 'kofjtkjgpgvqg7obdzb0nphcb81egfjin52q811stz103qssbiyfwk4zx1z01dpbygo75ytgqc0rpn8xkuu6xwggaktyagjkzp3kaq3syhbzzruy2bhzt00sg89b6sdatgqxgez5ed0n8mnfhvo6u88sc09dlj30f81eml7cetuuwh8drwyk8j7bljw6wrkaiizbab3okqs0hxyle1p6kgge44dedj99cqquzuhvh5231gna5g30hg9lna84n8g2urkdozadjxhi3z5wjbsplt19sujdluvx6mvtlg81xk36mc4i3p3pkrcctbsbtlwme',
                username: 'eu51jlmg1o9xju6r1uhzmck3ondovo9bn9bb110gohd7vkob9zmnqmt59gb6',
                remoteHost: 'pr0keztk81mop4x0t421l8s5zoyauk6k50ftr8mxdf644qxqljsjs0lp4m4v3km81qyl24onhl4wu1n7tsbgrwniwsnyr2k1zpixcg4k8ii1tssu1e4sbg8r658zkf8nomwg8d8szw05v2gkl1bc8rprgey75av5',
                remotePort: 9698561935,
                directory: '18oqbr37pthoqntzhr9687n826lu58vu7toc1r3f1ybnuo63rcebfi6qpsoy16nd2a3d0khrm2fiic53tha68gas0v554mrqbedkfoguzjkdcx4rd83uxz1em1znsqz4g8hltjpbwmfqbdf5lvr8reyu5lf2sqdjt92c256ngdpg6aas1q1gfbme0sybsb47tpitie3kgjx8ap4pb3ug90132uya3y9lzvuyzzn7ymk0305nrjazo3v3n3jkhwnvtmakv5b6vp3abn47jkakjnu9a0ezy3nwig5brf9fc1by0ndfwkhd9xj232uoomfseqmgucrtxzf0lx1un1ah3q253t1ox9sktlbzhgmk0ywgs4s4yv6qvbig0x0b1oju5j9k5qlcdw6ypsnmj3m7rarmv665zxr74oaj7qzmz3vwqk4p7wo2cu68btjll5zis1r791atb8c4sur79b1kl0hv8p3ilfu60ydf7clm4mfpxtoi7262ihw6c6a42occyld6431x0j8mcjdwmpfsil72mleygdeq0b68fqd23vyu2zm2qdpmeu01kkf979rwlu74s6gd9cu1wcr0o5q5m7st8ubbk4uhrjlwa3i0qif4gbghcfdkoug144h83z93rzdwh02isg1mbmb099je1jl56mpxfrf34xplsxxcurw5ryazu2xcu3umbi0bko0lym0h4qr522kxlxmh5xvozs66ac02yerv4x4fnvp50acqetoysorqx49au52ox7jp4inwjjmj9aka9wl7oqrevw7yfhenjw0pfa2j6a7o0t5p4mv57hlfpaxekwvlxst8iunji4ity1y3hmz0o9yjibo251qy0weg9ns5wky219g99t7juqso9sgyqnuouahuz5oxpmf7lsmhiepuklffgmru659we5eftgodblkklw367z50eam9l3iks5bg0maapu8zdolqti9mio4bwoktrxlsnqs0h9ff0swiew0h4ac2qlf87rk2uzf0565wp2sz',
                fileSchema: '4dvksxrrpc5yc9qw51gur5cfxpr0spkruhwvgejc6p8jnw0ofli4np3dgtlr7knuxlskbk9pif07gq6enecrznwkqmb9swp1m28r8g8mq8pgk8r9ma8d8343fg2u787sca8xu0c9zp6c6dxbo39oot9tdw41w37bo57zfqvu1tk0wl8v2tiv8su5zdwl4tuciphnk454y3ivea4a2g6nlq4015xifi2msgc7uzwv2dnwrqig91m0r33l53pbswllupecjq37n386gfsj98iohtg1zj8c4fu17z0zppswyfa4xqlk69x5hoosj8fntzsttdkheizf84m034q2mvttm97kcq60m7lzcqws9cdgktnk3gpqu7v6mk0o3rru54xo292c6uuzuctueqow9r55aewi7anwastl6wczbj03qek1osrxettf3s3edvbhhksk5b5y4wq5x341cyoegssutskxn35p7931a7pe0xoza0rfg7190h0iqkbektgja05es7v0rfm0rorylg3zbsg5qqlytl1amphs7m79o48298hn4a05fjvk5283ifmfmdg2lx65v0m8g9ffszutsdgjrpvphntlwxg0wiopwoiypnu6brznfcv7lpmp3d1fvtarwnodu5gj33lrulq2syuzpd8mxzfpealwfl2zycnjqevdxw3ijmfwtl84606p29fcn34ubjsyz4pn81mefvwj73ix5eiru4ew7jo4tb5wmdm78cgm98lne3mu75iq44ntptk07i038wcolbgoprl619qh79dwdobcjhpi8yph22wz5xcqkq2c4iwy74umwa1y6xrukbeuhgpuonmie3kcygvh32gt0s1jjyq3c4dde8zrclwqcazrk1wcesln4lfaba5cjo2w8vaxyqln53cwtb78s9ph367bhn9hqh6kk9cqnmpa9x2q9j15wdmvj8ud8wd73rvwgucvpf3oqj7uxxuv4r77yp6raf1fn7cjc0flw5keuwu1yg78b5x2ed4c',
                proxyHost: 'e7ttjp8nyrr5mi4k03f3c7n6uh9idz6j86s4vba3iykmoy1olkub4chzam0c',
                proxyPort: 8127072280,
                destination: 'gul5y6ami3re9xv6nk85ncrvaw0uw5w3vss9iurn6jxmjjqqdn4lcc1040fygd0xuwrzbsly0rgzaqeecmwa6q047bwzfm4xru0ywpirrwrdafk0r6ldn6qy3d2p6tcprr847e1d63xee0r61agq0d62x1d4w28q',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'mke444r9qid0qywavgc6zndbujcyq8ac4o8ycazq45w4qefjohrnt8gz3hc8vz5aboktqtzmbelg66fanw9kvsbkdt89fs4flcxmg3x2qr0r4sb6238q54p7wzlh5p2cunazw90ybv5tste9u9z0ovpxt4cerwhp',
                responsibleUserAccountName: 'b7azei38tupawrw8kogo',
                lastChangeUserAccount: '9vvgcmakjrzo8xwufj6d',
                lastChangedAt: '2020-11-04 00:10:59',
                riInterfaceName: '2j04wqulfgqskrakz6d5ys0vay54n605tzqz93dtr9ypzisxjkye3zpear3kfoikccg1vaiuv88axi4q1ria7pi0qrmpvcjjklzqoyf3yqiwxpaoxlo3z3exy5x739hqufz15u1g4kh2t7mnhaknx8y9vttyreda',
                riInterfaceNamespace: '2m6c6u7syjtii5om0vvngaeu4z8orun4252c1x9wy16x3urrppksoocn6w9874gp4toa6kqnwrj4p2mszkc9hhjgmucalmo3g2k4bpfoe8medjgcz74s9iiaih90t1bofeh2j02ftu102h1kijotnvpiewtupbn8',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'mlql0erq9aey91d4j6epzijxvexrvuq428i6cnvq',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'jcx43rpgihy3bm0h0kr1wsfrqwrcmxjpum599bjwou5hgcjg85',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'az8wmldn1jrxe7a3dom6',
                party: '62uwu6viynyfqtg6vcgesf8v0ljquf1us5yuqby2x1ca0yc0866k2iyzip0emxomogax2qt72fxfds5yh9zrmta9ggj3wczwj9vmr5gpaqnjihke2tbrg8q4fingzxa4wqbwj7ta6qj2ulzgnvmhumizg1paecb3',
                component: 'zllbg5e3khy2pmzmoxevutxlnwph9twzz7k6ea2e5ijvq6c4w4m7tpqi1z96gtswosleksequ9265wzi3u3cxtst0dy85ljg0gijel7iytphz5t60ljn5je4o23xpm6ryxx8d9shimrozr5j2g5w06gnirb26gc6',
                name: 'vdjhyv06jpbv020zq9jb2lw9c11n50wh3ct795xvg15i3vgjwwww2t4i635iwbbwdsoqjbar8sxdp7oa7vcxq9t2fucz0ae3pj89fnl0xhgxd83obowbaqsfqvcf85iga90fcbdpi6k13wju9c6lgh9773ynb65g',
                flowHash: 'c4vbdvnui600y13h91xzlbkb3qu2q4agy1wrbqia',
                flowParty: 'pbo2zpsp4ot8jhpscr6jovosagxqkdi0jmr382ubyybv3ypvp9qiho7e814v8eevaqim3a4dz5s2qmgsxt9e6ibfuckk4ivscea3hiamv2s2gyd4q8e26bcascckj2pmkzneu7oa9usn97zcubzfdxas7a076ihk',
                flowReceiverParty: '7jbnxm72sp5jse2fwchnm7i54z0jtwfx6blkzcrcc0sy7e8ube27w4elx0dzb81gqd0wsea1pbocay2fkku28e3l5v73bya2admpyf0wonl4y9jz0r0gok9ikixvoivkjxidevyhy0rj8h3thhinvlt3efglh8zp',
                flowComponent: '8qdjk1w2623qelppqqgc5b7sul0pd06arqjwzcm1fdx0kyrsecbf0hfzyla4xe25nhrytreqpiybh0a7892tobpjfue4o5gl6ai6s38980bcymzs4snzf5sq59qxkm0n8j6vszhrta9vqo6c6lhkefhomcl9ht0o',
                flowReceiverComponent: '0cg147435576mdzalwd1m6d5co2updeij65x2gcfkqhb8vu7i2dv79n2xe6cwg0e6ylkv8mznsp3u6py6da6joa5c1q3a5oxwu3uf96t7wg6t087zlfgwlbofdvtk36585uu68ro6o13bi8819r1afj8t8qj2d07',
                flowInterfaceName: 'ms3lbsmmmeu3b8qis5awwfzypzo02wae5l6qohiqmg33humwrxx96of7lozf34phx0cxipc5edo4pavwz5ghayz8t3050ucicjnk5uw5hq3pwpdwg3j3yofyigtxi5sr57bd0tnig3eztomm3gpj5jzz2sifqaux',
                flowInterfaceNamespace: 'jx99uc68c0ymigbh1jaqt4vxglbdcq8bphcrm5b8313i2a2z1e9b7iw6p7rmjmynyasmawopstq3gbf08cw2cqheicw8mlv00xgrjqnsaboyzvaprwlj77omvzvo5occ9u8um9yw6w6w6rhl1gbwqxzhwan8gbcf',
                version: 'w6ubpqjkmj1hs87j470o',
                adapterType: 'tqguk9bvfltk68yt7gb5ho74k72hjqmnke5c22d52o0oybmk6uek9djhkxjm',
                direction: 'RECEIVER',
                transportProtocol: 'wkrg6jbbwtjc490hwpxv3bobg1cgqiod9wme3qqb1ip8mnrwew38p8rzegl8',
                messageProtocol: 'euy3baa82wvz8d3atff9ge9h3j6mni0saaq17w12wa5r2gmgeysqj56zqcj1',
                adapterEngineName: 'qj13qxgwr6hdshkveqbys3ib4wgyk59kb12w8od83jbzh7obsijvcjcituzpp8tmuo8r0itbfoh30as3pb0bzezkqhwp0brsohhvmb9wud17jz3kdzcw3nl7f00iu9746v9h7zce1wgbx0eltckxacbcuwbahivn',
                url: '78drs9z8a30af3flai7ex9qzyl9nqkdam3xmqyo6r8iexqqvy5oshut0vvj2zwelexp57ih8jgt1mp62shfqn219nu177p6z5bk2wreqymyyjkwsctm48mpf3xfv8d1byg5m5m5gr7iqto65kd7dttfigh4jfmcmmkd7qxd4r8nkihmz0py6ftldmkzqx11hem1pc63c1phc0wl2q0obfi4b1xxarwttxm1ls1skgdm4ay0mzmund05mw0nkulsnstbtkr2iwygjvc8poj6f2qmyr6lwu5w48ehi8h1uce6yjbym8fa8bq58z3x6mmgx',
                username: '6fjgbzx8uphmu9tiw9cechmg9zwudm2h7k22t256vh337libdnv62xeejtl8q',
                remoteHost: 'eqdr7ejqc755ap6yk2yn47ifef3ekypz16hvgw3mxk5qn687xmw5jerlw6607d33l3qfe9bh4lbf0zx7ye2y2ln5o360lfam6gdvq27od8n9o3vao2ajojl8ygicpij2xhc2yf6b7sbhun57lnbu0oqtcdopncyq',
                remotePort: 5328838008,
                directory: 'zx9piw75389ubhkkw5zggg5fqofijquy15zwcgtnsm0hm5g0u09gb25lb9uu5ouq5xa2zgi6i93szj7v3n6zahehudeh2nh3z478x94jjw44mi21x873k9xt4iy45imbqscj55lc32892jjga188v7ug0ucdig30m90h19iuxv2sfip75646x7r0i79j0qy5i0586oxb2imivo2x4fcir6io9sa29y6phwvd0eve1zjt3t09mt5slr68rjvpkm0jt6u5sibq2wy24ul2uy2cyzkothxiniiyb11u7z9po0h56wbvwgtpp0jmiunalcwsf669dm2eueg51dx7cf8a9v0xkzszpchc2dsyqk34cw1tb2sd1bmm9mul97wx0j6g28yg6m7zsrnejguvgvxy60ykk41mq4727pplbttl513p42322bcddeo5n403t6ap4uvqrns1x5q5qlgwfkb266zkke6ks5omo25dg6hxsbgf6uwg0of5vaef5ads7u6w4se6zxazohb1lde3936qnvmyajc8lsau7yphgfgbadlhs7v29gcmlhjbtz04625ara3s9iyu6rf0lz7oggk2ha5xha88lsjz3b6zkz5i147klr43d25owczpc7r4napdwuvkno9dcg7ncqobg4wcvooc9h10qg0fvlrxdeznnfimsg99kigan4hixgof0dpfp4926i55f3py3xrwbmznojiilizuije5hcz9vjkw528fzsvji4ill40vf953kca78k0i6a0hmx9xjb194jv1kviwumvr2mt0snbhj38ie9aflwoqnjqlrdcwtl1f44fazpkzvbo0vglefaekshyemb5nqrg7nuy63e5uuxb5xi9hemxm14txvf6zloiil9xjxs8zvw0hybufg5xpcg5lpvmirr1kpbzq6dme6ento6k9b4uh1hp27c3ufy2fpansa1n06wlx9n2onuxwt01iqjww8betrym73cnbzw32nj2vlipbg3wbach8z5g1vbp9',
                fileSchema: 'c7vdsrsu6zezfr1u8hloie9zbe37gaqjha7g44vmkbyj0muil1spa4374owymd0dwh49uw7v69996hgypx3rxajjenyxgj6aive0vj5e02ker5j5bt0sr9heefxl4lukp02r6slhhoonfak85a3oitv7jssjjoyaxsjwf2t1f5tw7cwpqw0yu560eljy0ddupjdrdj9ogt86cyjx95b4m8thynnuuryn0strsc12j3qtdx3ohcq7t4zigv0ictonhuw0ey7kyrwppqbsva23rl7nl116agbjaomwiap7szg6a7wuee4sti506ggl0wt0irawhyyuw0b3t71wgsalhylaqepqut9489gwx1mf3ssn9q94zuacayxil1h9pccektdhvretil7r8c5x74l85jd5u6frt5zzs06loihcyxa6mbgfuks7h79h7xnc9e9in6uikf0wuxj815ve1m6k3uvg6rznibpfsn9ds0z1i38vx5t7pci6oas040wg0lxrnhy96uxh97fjltcxir8u4hot4lbi7qq9fdiuag98l53ukjyktfvprjaopgzh2k41e3leomlg9uhk5koiyep32rmnzg9xpvpply0h9kyyp5gf7b0zuo3i8xha2xjuz3cwrz005wdpt2717qmdbzhmrsa8gkoofxwdu0elll1vgye42t0gmeimb4lwax252zxlsho871e25dv8tolk1px1ewnjodmg95zs1c0eb9snrh0nhbuf4s5hda0vzyc1j255z8dtvhh09889wsrbizrja20bfj6pqmro74eovupjbvimp9slb39dyomnyg6qm23ockigbwv72md04lb0y3mqef8x9mztjrbdgutvcsaqt8s6fye9pu67w5hspgalz123oc38dxymxcdlixc043hzo4e8frf75yz8lipd7sxf00ysz84bk8lu9qm2k9x08311znq08fu7si4oknpg9xiurz61fc42utyi35q3vs4wd4cck12jdgd5y3ryq6exlv01',
                proxyHost: 'esare87nfpgzomgj55kqwkl0l4o9vt45r1v6hvvg0cbcfa3ol5tob9yrpnbb',
                proxyPort: 3994607158,
                destination: 'fnk4hupslx5dd4mjy8tkr9ousa3elhre5hewym8lpwxazybre9f64wd1qpr3zy16955r9t6r0pisgpsfl64vo4ieor9hve8wvm44cmkx24dxlujb7fnb99mlw2ttkj1yrphwjlav8cdo36egp8eqxo1ddataigjc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jdg09fr0jodhfz4q2cgpfu0yp05zksxe4b0lr4w62a71gnmwy3m3roy0n0um1y2h0ax1mple22j3w8liz8amdollu59gg68u4k6r7svl7nhjlpt3j7g6z7wvwgy0kynqhswgm0u2pwaea972taa0ij78uo3kf172',
                responsibleUserAccountName: 'pljx9182j35jwxa5acgr',
                lastChangeUserAccount: 'ws2vd359uaqi76f9srwt',
                lastChangedAt: '2020-11-04 12:29:43',
                riInterfaceName: 's06jj2fuuksj0d6vgxsx9hk3txhp3fwjak1dgqjfuh7ia8rt4cby9cy2cid31rmo5vgnxs253nwltdk99y4nqvvcz612ovygoc8er1bbzf55j70lrcrl8gwe6gm8csp3l7u4qlifoiz3bbxhodsbhodgldengwfx',
                riInterfaceNamespace: 'eqi9n12grmk2wy4bbnqm7qhhjc0q2cf0r1z6l4djfmu7qmaiwfh7ptmope1kvkc3z075urhwhnvv4fkxkbdu3jxsvep51oxt6v2n3tcz8dzc9zf3xquzu4ig8lle9d17saga0dhhlf7eu89ssik1ln8rxshc68ts',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'x7omdnmic1therg485n6ohrl149qhziywfydpvx6',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '9p2fw3ucy8e4ttztom3wowqvr1a0z0gw5qgsa2djx4qhf7grxn',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'm6a230tr52qcghigucv0',
                party: 'bfou5prbo70aqni95manpgnosds456bjjybhtmco8x3zvohx10cqwuczy5w516fg462yfb4qhkcm67nw98vhtsblhxigs9zr09ds98458yme2175kiwidgwpjdhwq61xkf4k93y881hlr2dpo3dlx114r2r8kz9x',
                component: 'ypvbkwxx8bn7as9s0hejl9a77qwzv15shmh7oknbj0ipbvgr6c43a8ruj9gwflcmtsyq1qycvlpb1hvx0luld3r63g2urybib5186zczfok919cqnjm9ay8g9d9wtw59kmhw2l3v42kilc8zzhal8vhjbuezd8wf',
                name: 'pkq56x6zu3xjkkgoqujvy7hwqtpr7kynesj3aq3znzsenrus9qneo7k0xcqpjupfzl9u4zlr2482sxceg0nzsdhxljxauyof9x6wcepejx9m96j5b0swmr7pamau4hgse2sd619mpexgm03ljiudz9dfwow1amkq',
                flowHash: 'rf5032ddknw58xtrz5j5qux226e5519krmgxrdet',
                flowParty: 'pm5304t4ntuy48n7fxpz6cw1msxj5wfxfi7rwptymdim1eyfvhwhrg8d1w4iloqzun6bn3g0c5tuvlri843pfpnchwemnla7zc1h87lep1kg2fnxc3yug1e18l0jsekhwsbtm9livlliomda1209xuku4n0u4ru6',
                flowReceiverParty: 'qmo0djlr5tekb1h1dsdnxkamrtkl429bj4vghe364it41zgvtchwqp07s8us2qc0dhsv1fd9833rwrae4yvebdup4re8qvkm1uzftcl6c1bjjlzqb4pz072331aest42514fom4obfcxnzy0cfcxs1k58bp8atgq',
                flowComponent: 'cj4ccu1fdebvrcmc5ykhfcuxpts23dd0nod53e8mzu13skj8knrhgb4e7x8bp0b610rpl9pehvrmrhysdt6vhydf2wzmxxowuo3yr1b8ab0i3y53qqmxpq1t91yn1bpl6z3smev3i4mrkgrra1mpxw0ulgo8962s',
                flowReceiverComponent: '81aze42j4hgf2jd88z2788p41653cj0n9hw7pjxm4os8g3ide6o5wky1yqkbzukruy4y6xmux6iqcf87io7yda4sgr6qcz2fl51tf09bz7ejd6od9iyai1x62oddo4qgd6nij1kj4wxmnnf59ebdzo1der26iiib',
                flowInterfaceName: '40ae3q8xi5bvzggdklyuj41xqwuekpq8t0fh7fs3cogrl2jwg6ubnk2h796zx9kq29onjcu5qpox1fjh8gtk9ec9okbzs5ey06irtrng3xmb1jf1ffxua1m7xsqp61wjr5ijp8syuo6sk5l1vm2brkpx09i87ygx',
                flowInterfaceNamespace: '9blrj3v5tssaw3iojryrqz7z9x5jw9isxjcwwd5266snila8dn9dx2xyq7wa97h2yqscu51gqanvh95iji8who927gsc5xv9tiyz9dkspx4eusdw73jf8owbw6zjrmrbp9ruwmkt08bok4z1gt2bf5mdnmi3w1tj',
                version: 'knthtu8ip0idi1i8ims1',
                adapterType: 'jxmz6n7ke0ch8dycjp1gtnly5aqmrkwghocro3e47wd4fmexvi6q45tu7wmc',
                direction: 'SENDER',
                transportProtocol: 'qlgqttm4rvsv43jad25tfl5b8ek5j0un0xvvad0g3q30znfqoy0aldu9vwh5',
                messageProtocol: 'c4vreotvcbswrurjt6zxgg70inhyqwcvfnohajgu4dasd4om8p5wx4dqwxh6',
                adapterEngineName: 'l8banwszod4tfyk4xtpv8s1cdqnhutj66fyq937zgmnejrfzgond1roci2iop6lbukyg7ymp9hup5lbwxw79srwwvxec3or23tf8wcluf15kkirdygxs1zgak4fco4dcerghgr3nary7xlftr4egww0rozhq0pmb',
                url: 'r97houzrw7io5du3lf6dsww6ku05h6kzphazacx33l28p5s664afqmpuy6dlzci6ivwm7n6qlom748f19abwg5dvtjrn5r5g7uul6ofza4js3ewibabz4moszf43i02erbbpk7zt2fdh73wt70wf8iawqk9eemukx0fhfpc6swjaj3oez0lvn1aolr163lhrvcg7ochjyo578bwpumlmwxb9hxmwtdwy3igzhjeak86aul51cb5477zz2mqgb5y2nitff4o6rp46oxgp56prpboknuz2td8swf4exxyrcge09lbb1ru5rovu3k3fak66',
                username: '6le7vu9z75q8lurmzxsn8ollw32dvozmeqczhp0onv4qvle7wuz2kz4u8kw1',
                remoteHost: 'oylflkhxxof6a2kbzi33jls12r9brrixbx9nqhhxioqqq4opa42c9vbokpsa9p13uqg41ldldg8rtiq0sg66fqqxlne396t0nx6cbx6dsre6sg693po98q1wjub3bjdq5sk0vokcrqhbtxr0m87caedp4oj1hrzai',
                remotePort: 1722154767,
                directory: '48go8k1tctfzrn9bqdjhvqnlxl4v7u58flv02035a4t563s960muxyz0jdlfmjowe5eqk5fdgfwzv8hgsnpr9eq51bm95ozh1en07630ej6c09q5bx6e0cykel0a3gkgrtxxdlsvrrdizq6tyhbnlr5ujh4gc80uhnub69r1aasdrp5asaw11yk4s3t8scic1hs5uzwkixkfylbyqch2sw9d2q9mdscd2o1cvq2kyo5si9dz6f9jp56o4fgp5pjsllmez6tms4qhbt8jlul10xzckqsb8fpt4guywvyklnvt9oylgudl85qa9tgfh4v8nc11uzxerb92sxy6jgsu0q6zat4iei3iw9vc7petwierkx3ab4k5xo4wdu18p80p9zck0fuy6sselz33os6gv1vzaxea913sw2wz2jz72lfxub40nzcy8ngdnwlir0kka4a251nxflfoq7fhgyf2q57ruauxrjk3e0jn3n4nq07qjjw8vud16ffif8r16mt7j8hlr046id2ur77zpf5l7z5cgt7r0kkaa6dzzlcjlnf0sk6jbr85m40e9iwifgju986cdu4glnl59qlslbvzrulhglrjewovwhur7koqifqc720qu8uxb1kgzlvc9q6br53z9k4xt5pwxsll75y3iifs4hpvsur0wvvikhk3cmq3vy3xzn4g17nkdibwry9otqg26z3yifraviy7k7d5lc1m6wk8yjp8r843qwol3fh1n7a8a33dct6wgckwgdp7ek9p01zhc0cdoqkd21eye4krsovhg1q31lcf5dtyhg58hxna3v3zdw5iebw9tgz0xpdr1ocepvyonx3tql9i9rv16ugqdcajskx3ltejwvv0mfn1a5vltmqilw5vm82yocg9p4iskb59qftqqnw32by80eh2har600zj4q8p25kicnymvinvn5wb9h7bwvgmwxzju3g95i5je6jo22rkki87w31c54qi97ywcjtazzzeuk0btm6xqj4zi4210jbh',
                fileSchema: 'sc0782i7df9rce1bk44qwoi9flye8x5fqsgc7y6gfg268pchhys8yuur9ke8j2ga2vam0xejt446n40fztdrc2tmpl1fclr3dzifiubkosnbhfc91o7zcp3plds965gbvi5ogodh2cm2u8u3nvm5al7ph2242o7j4qu5i1qbhm0hzybfwmvx4vepyzfczsejsdo1lajwu128dq6ok718hrqwzljql7ilykfdqckrfc5zg1odkki1dntloprups7rw3fnihqsgi80oa8xj99f4q76dcoa07epr62sd45rahx13q07ky8sowdpk1doywd79wrvh656bo9w0la7643dlaqkyrpfxxrqj5yqtidoiyjd4fhrc1xr13gz7hvjphpvbjyts5aubsasw1ecdbznosorzqmtld9wpq94wl49epgi1jyq8s9wbjf021gyn74t7toit80m9m9l6ow27yryl8h237fg9z3aahiyjhw0f7ex8gjazlth457843typkrcm6kgh28qvt6pswm11l5hw33fmy3tqxpgusl4ecvvc8dr20fczcb9mdrt6b4l7symwhjx5mvgf3eckn9jr28jn7huexoyxvzr38wj079vtamq6l2v9jqz82hkxj39c9lehwpw7vh1aahopzcqgvx2aulhtnvtm6uhgrsopuc9og0tvdrxsg2r0oxyw6fqcvjulgjo6y9k7j6n892bjsltrnzylt8c7qykgwjltes56glz19ifo5ch9luuvwop3eekz0v7w2xjs7l0v7a26ubx0ojuchxf83uafb5ozsl7g2k889fodsf3uof64cxstlzpur9wjjtrzv6yhusam8jkfhkpw5imxwx865mqi636r76nvzailp14p34jge4pw32t7pfqgwx0y781nbnr5duzefxsxrdiitpony7kpv33zwfpblflhmgr7u771r5uvg2ywuztwfeqc02tu56qmvngrk5tyqteg3by7qaccll6aqdp5wocwb5iqlf8mds7t30l',
                proxyHost: 'wp0gdzsv7ro3dz958pupm9nz14wuy9qd696v1iaabdzp4s49wueh9kyfe5qa',
                proxyPort: 2251159665,
                destination: 'f2vgdd9s5skxm7lbowlkenvwuzqhoczvxm96guw3xy568slbrzu71b2e30yzninzotiq37yp1gqamtq6slqzwhfzyzr7pffxb8pobhq7gbot12qrfvoyzy73xmdtaib5f1f1qawmuiavagi91abymo929ic3q80z',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7seypm3sjgjzalgd4g008rnbi1lsg7nh8paskuuz5blqhy81zn7czlozg4xr2tu1kghwh78qrl78vr8fw7g2bxnhn5i51yo7vxgayccvv43xggj0w51x7rxs08mlf6fx4r14wi97v7gwxyouiww3tc8abjfuwc3c',
                responsibleUserAccountName: 'n6yrs76qevlptwefk84v',
                lastChangeUserAccount: 'egeriw5n4m1j5pg99nja',
                lastChangedAt: '2020-11-03 21:26:22',
                riInterfaceName: 'n7xmigi0z2or5b43rlqnwhdn5k8gjhzc8hcpjl9lgmvtzyodhx92krupikjmg6fbcxf14r5bybv8fpq9nb8x5klcsnipnb5dxn23ma3sgzntqdlwqy0sbjeijp5q4veoafrbr1ae99d9wrxq8wafi1m7qbreu5xy',
                riInterfaceNamespace: '138fnoef4m9niiunt5ss0j7tvhqs9b50h5zz5iijqfr76vtmrb11uwrlia3xye5mcd9dotvatp13597wex02evtxt07pe3c87fuirud8e0bq8mdf6i37z4rcaiyh3adr0vgw5gxwglumynjug5zgs2t885v1fbci',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 't9huofbw11u3tru3wqpmsb4aoghxijdb99v94od6',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'kco632tqc1jc0585m4behaqaog3uey9bmbubbo0r6voc15pk31',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '6ywfn76adn856tgys56e',
                party: 'slz4xxdnt2iojsy7rb8cveykg5trnj2n451e0dfwqtz0v8x68wjb2iq6ij95zymhpc66b5xghtrbes3azh1xu6n79crm6rd9ywscglolxj1p5ocowf4iixldqm8oi3l1esw43o68jn3a4rb1aa0z0sbp1zn8xbqw',
                component: '48e17wwzn4izmihme3t4zsoa13tljn24km2euhprrw8hfrc8cbxd93gadtwir9t8gzvchdecms4muci6au49c2y65oc598x3clcwpb8faajn2oaztt75nor94herpi648am6mi6lpa2t25csd5zqn82gn6rlsfch',
                name: '93rg1klr0n13rshaaij0guwdqiip8mf3s69gbqll08k56d6p8w723d5ihik05zgfwcir6fsp1tf4snadm9mspnk0n46994t3n53jlwho12yatszct7hjypulcb0e8n0nrjhvr14qzqb0rrxfkd2c2rn84s7xw9t4',
                flowHash: 'b5v7qiumja6hd2ud67vxjubls32x62ohhoe1jmpw',
                flowParty: 'ep2g92jhhl5c1tdtiojm7fkhfa12lxz7x8qgo54y7oblsx3qjg3f3pykbi67h33l263z220yhpsfr2tdhqhlff8qght4h44o5m8o97jxpr785ceikxtdwcd75st8vl9qkp9a7nsrwuvd3bpcmfw2i21wx9bs739n',
                flowReceiverParty: 'rowkh244mprd5lniz00bkunfu13gxwi8pmz49q0bjplr0xwh9i096fopjbsie7e6npzmxwxzc95l36621wy3cy7xcrmlqg48hwnse1ffskxs45fttj85oaxuxaaqr90xchdn5x0akxm1e7viu7552mug23ma5cyq',
                flowComponent: 'bzfdw2rs08d1qz00p0ismg0gvbhul0rt7oqoz43ckhpkk9x16ngbncqyk8h2id9egbik09tu5trnkngrvohvq4ajg72h81m3nbu0d14ed98jm4pyjrzuhxiloz6tyfkbgqdu1zo4pjjminje3014lz10mouujz14',
                flowReceiverComponent: 'et26ybtr1sfkzh0qj7yoznx4ut43eaiwvrm5vw4c21hail8psypburmk7uwrmijndr8eqbdqtygez3tqocnh41op197yaeee8n35nbokmjrogo8v36za11ocaxhdr7oyixrl2lvizot11riihohvfwzjw521224n',
                flowInterfaceName: '8r1diuclwbulycbd76im4dv5p5fdjd4d9udy3keg1k9xgbtcjt36veefa5cltt7plyov8h44shbjfqqh9w1qmml47dwl87fs57hr6lzc0zoa48gfzhfjxi1bbkwsq25avxr2ciib3242p3jz0wohstkvje2ucjtl',
                flowInterfaceNamespace: '53mtdg3uny3f4yw2wui9vff529eh2o9tww8zsl75ayx0aaaydtwci4vk1ayrn4dqvmnpb9eqaxa7o7cu8clpw1723wcw87l9wsyp0y1a4mhfrmmfkxxqyhajpv18qeoeq2ycgn63oep1s8gxbw6xogrpgu0hr2bv',
                version: 'fzxsbr31u8rx1vobpbsx',
                adapterType: 'j8efg7vdpd09zxca2bn31s8itsdkiw3j59ya7nbhferkjrw6wd67w4nis9pk',
                direction: 'SENDER',
                transportProtocol: 'fi5fo0ubiu05xmktgk2dtp4qpj5ji7b1409oe9pe5jsmkkazflgqk4frn4iz',
                messageProtocol: '464jtez47cohl238olw4bdk6xp72g2l3oyiep60sdjfal4oha423vhsidc52',
                adapterEngineName: '7mtxj3fpm247l0eveuejhejifmvpviarj8s9k1zp3pnpeh5bpodyd3i3obk5u17wjthrf5113u7u41zfcizoups9lyawxachw41le904e2wdw5yultdspg7cj8eusaojiycij9pf5q1qizz0l47ldeui0j3rroia',
                url: 'vspondf6f2q3bezz8bypemriisba1d1m60652cd56va99m9z1hn3omjmklvd6228yzofxa7sjr6bnv07wjjgl3jr46qp9rudrwsw8s0hug4ef1z4j1421k0u0rtn9eywb4gpoknchm9cc4at959tknd4sd4ui3clfhhwy5g1s90qh0cruot8e0wekdqpdzg3y1mrnwwrkqls638gvrqykqfsx8padv0lfqrgmy9j1fmedm65dt78txr4izgaav46mpnhdne24svcwtir0jv00ixetk3aizafj3ttufks8zpovti6atenh8r4tuq14bx7',
                username: 'h3qhclovft2cgk2y2gjahc664ubed1722bpu9mqy3bpto8lgarrpth6k5w9e',
                remoteHost: '143gdr625l8kth4y4getusfx7mvj25qfbfwuwq4ivng3y87jkz8xsbx6byy6awv7ndiambuukfqg1gw9n4cxjwxcdxkyrpmctgvwc0gf8hevt79nhtcwz02mla4benrtmj427043q0smlz2huyvh10nii13718fa',
                remotePort: 85847341758,
                directory: 'znya1tjsejbysgv7w0sjwgqw3uljpzikyaedldwu80hoicpd12q3e8pmc3btssoyc6ysm2epodksppywo690fmm7y4dq12tqrcqq5zg7vl98tfbp6l7ch8tg0wrbpp62vj6a9wajs91ijoqrpbjbkhe7hzmkysmdhyqqoyi3rg6na9ii2o7edn6to09jytfqh82aquciydt4yhyq1p2gwlvpt1ed4ow84ma46v3f3ajfrc6j9gu05wkqufxa81zaflan9b531ev3k6f83h3xw3526pa7lpp88xng0x2n58ql4155x5knkvkdtdfp0b921z01tpqqmnqarlb7y929dk2fc0jgw72ok2ieiz6lcjy66zuy08omz10s5e3m4m1ipx5kfhyj6z53yiequ469k37l3wnn8w5pmyb65e3rlywqns5zprm92drrzlw1y8toprgo3xsqx4m0i7yrg5skvpxzr27sa7to8kfakgblpy5wrkw4epsj1s94vwzprpa1x30xb4dizsak8o8z9yuy6rp34rzze2pfji04zs441e74pefu944lz1zliesszm8xe8gacssot8ozvcg3d17ymhwt8e9i5b3vgu5x22ddagsh9gfso1qgt27al4dgqz09jj5wwlcd15cz3mef888zltr50ar0qtybe41vtn50fjny3xu4inydt00dl6iz4r6jgfa6r3tgfb2kbuxd0sz4m9s1o2jp5ee3rknsoguyqipgbv1aabzkibsuqpv5yrmi1b6qhsczufw5q95bwn2i156zflysal0ni3k76nhxmlhufnbddwtkfhm4abvesugdhup6jo1azmzc3bllvgcdmtj6j0omeuwornxw7gectspw919909q1cxa01q8i24fjdmhamtqgwlt9wn4q24jg66zj4nwajcbp1lpx6l5jlurcinxux48351jqig1yue2rsu53q9fijtap60oumsckjla5e03byq1c0aiwe0185vv20dlhfj2kqsf6sw3wj4bt',
                fileSchema: 'j6iq7u1qsz47zqmzsknbmwss85ukgzjku261jvncy408ttobxyzjacpabe8pblelfixhc8mo5yp6lmjgbfy5cw77ql2b334gwtpu49v1du4uk6mx32mezj6k2rbpld3fzk8cydfgtxqeefmzfkrrf064kc89uxex20isdd7d4iororlllilwuim0qk8jcw9cisqdst5z21cuftm3v7grpnx4hx6g1adi678s0dfpxtt2vwz2noc7hybck2kywf1zh5544q8ieudb5jg8pi3icszuz0674kgz8rlka89vwsxc3tyh34bpuze8hx1dxkjphqxcz7x87eka8aw0qipzo0p3mxic836e3xmxqxiimcz385ob7n3jyubjf4b0jwizwt4nchu1h1t85sr9h2ngr738yvmvhnbt7m0exhkqyxzkgwgermlq7n5o512rwhtt170sgfi89dfnial5ct1sb1zr0knn5jqjz5zjy089aioff2mq5youmu0do1un8dijw499v93q77uxgprlzbi9xlchfti6296rghcs1fhv4ney0a6m7ha8mt9mqub9tv9iv3yeqp7uq1k0kn6nxyap0e3mf2r0lqnn2ngz6ss50z5mul86r06ivzdkcp2h7u3vqxuxq7fuhumwnrafj10054qa6ztqvzl9yr9ntyrqda2ayg7h2y2bl7y31g99nhwqo7bhgryuwjvwk1juzmruhrn7nrxgat3mb0x02wlqmzkamr3uucwdbozout2tknypnyctq0dwpgniiz252isah2lfjeqfw8ezdungumbwxvvdukcr29qnzt1wnj4lpniusdvwkvb1bu0wy83o2eukse2wiiro4845e4f0bhyj41plp9rsskm2nnd1okdmc8i3t7vu71qa09i53dfh5pr76x1gcyfxb1571vf4n9w6jlpea0ltp1mdac7s4lesuudtxi7264rlt2zusd420la9e5kz91qa2sppbdrp67e9ltds2g727i4r7b5r6k0mhkxz',
                proxyHost: 'j0wxclz78ugl1pnma7cjjgy2pmij343zz7zfo7dch75snux16y55mq7i2c5p',
                proxyPort: 3003263195,
                destination: '6cco4p2b52gh3q6gdyjf4v3idfgkj6n3nja8fo3fln8cpkupdld81akikmjjgr5kyp8ycmixpyvn2ufcne3a4wvdwsk15jz8r5d3nggn398g8skbbo6azqdp1olr0i5jyiu7wiqvm5j78hh667oa9h6ugvjc4su9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'aqiy1nih589jha6cupg8n2vfw3vazavakuavpugt5217n5xobtpqto5o687nnrxbtk5yq5f0femlesfa2co3va3fvr8a61vpkda33174q0gs5orgaynwc7yifa7n94t26a2qo5urf2b5gi917kubeaz8j4vdordd',
                responsibleUserAccountName: 'hg4o4aeysy2blsc9w0yz',
                lastChangeUserAccount: '0yak2h1qfkbaqb42tu05',
                lastChangedAt: '2020-11-04 07:51:32',
                riInterfaceName: 'bz25ss4cp0svcbb67murbw6an9rtftz8ijxzfxh7wdzxc9ypso8cudsfee1741985561pfg9hpyq2y3rx9z2ell9w8xor0iuvfkhc1xt7r5ubw8gcwsybv8zbd00027t14iydi131xi11hyybdfq74kqfcemzmlr',
                riInterfaceNamespace: 'hn49lijim1sv4yovp6how2wryyznu0mv8xksb4z2gkvj181k2fk5f388qfdqgs55c4luxrl00c1trcqdk4ytm4r9nyt4ph7xjy9d5i2gshg2xqvmryydt9yauxglxiqiywyghyxuaq71va3dsnesqapftjowngvl',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'yje80zpsmziqyvdtoh2qs7fi7sx5xsh7g0e57u7d',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 's96y6c5bvq2ccm13sdcp31wosy2nlh5atkm84waubq2pctscvm',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'wwyz3wrj1puk97v6wd2n',
                party: '3tzldha833t56ugf75wr4t2dmdvqh7gheogd0sxbatp7wv7ttl4oy1s9p2wh77ba9vx2s7yxxqqus86394mbvrl75vato2nneexer690faabxfzgfh0wj7lux4buwnweskkd4zfn8uujyebjhjsioueqr7p66e47',
                component: 'utz5i10h4iqxh5nuy9lh4zvcd3rar0uxw6rnhwms2c0hkh7e56tp46709798h1xw4g8o3xg4a42rb8bwk8g6yhdlrdyqsyqbtqm6sfzm9ee4e75kfe7h63dq9ot7g8t8lkxia68rhysh3cdnnjtmze8anpfpohtw',
                name: '4bmku3dxwy3m9b92myjpva5m2jnk3l5w6x5l7n4adefblpcslf8wy58tkni2u1mauty3rsuyhb145xodtxpk6dumzrgn754w65ngva44kz4oq13mfswa5hyt7csdwhbvdyjkno5wgccfo6nkhu6jvmesv94g0nk2',
                flowHash: '1o2b8kcdl3x5n9yxdo9i2g7o1c0va4jwbbjfxamc',
                flowParty: '17a9zbwd17gwvhwphned6l01lyotyqy4e957uznd6el59mnlvswfaqqh1jnt2xhkoqx16eo3pza33zy0f7uozr91w02njf3cal1iuaoathglxrwf1ycb1tu3xiu39ciqun5kw7wp0c8uj48vrp0sdg9lk0nrk6ru',
                flowReceiverParty: '9cpzkwsmdn5jo6qd3b0in6f7lat8abvpktoea3ci5gdpfuk2m6mwm7kyw2zfa1hxh089k8q84wwdmfzq2rd6nmjc5u3z77pnhyk0iw6bmut8l12spahkx5vmoxbds3a3lhaga0vho6p4en34lp83lw9zygfkulrv',
                flowComponent: 'vr8rx0rooubz9f1y518hww8t0hok6cwi3mdrcv4ct94qxr855tr8rabelisfqdypd68h4wm7bi26i0r4emx2qpecdbfef7pmgthga5d3q0v8wzyvk3u0o1i07wsw8l3hac6y5ntm58y73jngq67xh7m9cdl3jnk7',
                flowReceiverComponent: 'fpk23tdm6vbrmvn6bdzrdbg18r2jxkr4nhc7v372fp0mk7366lxafe5kxou9bktn21jb7b1yvqr8c457vfcwxvo6rce43ez0orrtfkutqx1uj6g71nkcstcsjnlefsoaecovuoa384pqu1uunzqxn74s7hf18ce1',
                flowInterfaceName: 'h7z6ry8guu3tc3yubzhinqtvipykgl27lqv1glpbk94m55s6vg4ihommuywpqfsil4634rlpvr9nbk95740nqt4l2lbqgl0xznbalhhi94wynqrnb47m6kkttecqcprl5lwxoumqzrebm6wzyh2h0e75pfrp0dzq',
                flowInterfaceNamespace: '3lajjvogyz7ipiskwpj3lcb2wsd8g8i8ft8mwu2axivh2njzn5y6ajj4zl5ylvwpiko6ag9z0quvm7qnuz0ght4zy1cip4d373m401gt5wgedcv90xqdhlmcvyjwzqte9r4yl05qwwcvdjtuutxipxwrjfjyyvv0',
                version: 'op0oksp8gwx0vtwv5te7',
                adapterType: 'rx2b85dj4dtxds4ub6etn0uqkechyrtwxcf3eebk9gqjqmqnegdj8321w17p',
                direction: 'RECEIVER',
                transportProtocol: 'z1rtibm8hafzcuqz8tdhpeb45ef5azdmo0kejw8ddeaw4fqlgzjfro38ih2p',
                messageProtocol: 'rimsfo0nvuea9cydhfqv5e4z624g1zz2prnoud1avigpjzu2dn5rott23hpu',
                adapterEngineName: '1u1r84k4cnxdr1on7ot20zvxy977dffpan8bjar4k6xvduf4hrum5gsqqxl91jcdi9diqw8dsslt0zxpcu6quyvibq5br1hcgpg0v78rb28axtywz1etc55exzsvzatg1ls7ql4a811gbxf9x9vmgbrkau4vfma7',
                url: 'l3mss7gi7nu5lw94zqtaz35fj1zyvae3zjhlg7ah1we5s3yzhzb9okfuift9tn2zqb483hftefe0kza3bpkjrwqb6cdhatxppgld5seggeko546qc11uinuc4spd4aap8eulw2bdzbosvr0o5vqgta2rqlehr9a2rvdy9t8qy69nuevk3uq9c2det94kelbrthwxuomxx5cg7tk28l2qmrlzi97eac7t89etg9vm7bt07xk25k3fdomgrnyt8xwcmhh7zg2jlv5m8b0h84ettlueevtt2anjeips55ml5fb8sdqqapo1efn3iiqy22zo',
                username: 'sy2tt76g1s4aukq2l2z6h7bdsfifryt5xwxtxcog7rvvdel3vz0llqdc8liq',
                remoteHost: 'rhyqao7cb6tl7qgc6cg1b4qr9g4283rye1z999kqyv0zar6eiwd36wnfnohk0aosyg5rq23k4wpfdjv22kzem6p750mgcn27dtys5o4oxkvp66iyticvpgo1fiv4fbs1axupe4wsxajwibu53sl5gmaowv9mbzlv',
                remotePort: 1200713553,
                directory: 'tdahs69lnk1fxnpb0i5zagcevz1zhfmlaxq6pxemso6to4mcrwy6z6cn0r8yv9zdsrmcu27att9y8em0n7x2kcuu8r2fk0flug9a41l4nijl9yzxb8er8adcqbb4lb51k3ouacb53niwndxvbsgftnoda4vo6ybvimw0tur4dz861jdxxyscylla4q5rtvffigv5kuol7xdyrdwx83j3ncpak1kxc5fiavfw0x93d2ie46lsiec2890lv589w23uvwouxd3xdkpbe2tof9ba0nf867tf9h0n4rwanotrztw4eyi2bf5zwisz0hr5zh8fm2mlwr70j8wz6l5z665m5lc59pqtpd53l5i0sohfj5wjmukn9m9w0fatn96nzayyja0opwlxtxk5h47qa8re1iih990tg1xrm60thvjnmuunoji09juzd22daq2htr4uajzgvut3x9m9jnin7dosk2rahu8mepkig40rlft3fyluzz85jx8x8fpiwqvlw1lmhqnn0f5972cymlh40sw2h5fxy3c4pxqgav2pj5308nxmrld3dc2z23uuv5ful1wnf736b69y95uuwmimahjcn8rr9um5i3aylf10w1s6upw8menub67t0qm1n54ybvbuixesb18vv8s7dc362s0qwlb0rlcmsoovuthoiuc9mc59x719s5ntvkasy1xu1fvrb1h8kwcej12qmsu3340oy8pvy4tjhksxsp8941f6az6b9tuf84l0e6vipj4uawgam7axtbt7zdmwunsyyevrn3vbx7hc354legivlt81bl5dz7inohxn67sxtyjb2a9e04crygi5b948fc5ywjwssbyuri6mlroi46ajc6c26ty8ngl3iavj0onuw4puuux1aantz0x1t967ajr7jsemu7zndfc1q9slj0iykxk24grok72wawsv7alt1z6ce6c84dw6juhp5hjeipe54lm7hhvtyggxa9o4kq465meapnws0ig9qz140ldb7zfopkkox',
                fileSchema: 'p66xpdzf1wt2e7ule3zama7rcolk28n5s45rqfunlrgip1jjmc8e7bcc5f74zchwtyb03sypdyl1ye9dc3zhduphhtyffp6806ez04ts5xtyqudmjnwn2ygup6uz2z5pfgss8jgenr1yti0noj57w9dfamlinh3rcefr6k0xboolhgh64g4x34yn6vq0lswfuaa825m0gkvek7iqc7aep1etsy6jeu5cq9dd4quv0qymvx81k0crf7r9e76zft12fy8r0ks7welp6jmbu6br66idxlq4vx2z5w8itpiv5asdenkxezuc5xuw4bpdn3fs7bchnmfqhd3hwyeqsqz7z9x4tq7tdv4bfzw7pl2nk393lov9t3heunx2i2muek20k3afkecie2w8hk0owlnrbju5wjwzv78de00l6hn2w8zltqy2kuia4sdgu701pb4y83qwlhndykepmk9wvos6rw0ydxtr5ugachxgnj54by3f84102aitw21w9jex7eqm2ag5oqc7glwvif3mxws1eh4h40xkskwry5gcuhi1uc7h2qsrsgjrij514kbh1aps4leg84a69q5wym0yey8cogk8eps64udqbkbu7hjtbnxwscdlwtxni8b09l3asblwlias8ktm6y36m1eycwhtirkdtt932ic9k1t0umzxors96pwt5ui5983o5v4grhpnmfa3v330mcpj1uqrlt6swak2id26u5bw3cxkczwp4epfbbt53nrj3qmgdo76wzpqq4slhxqut28qxuu1dgu86mh7okn72ondp12s6g9vbu4mhhjrl4ewi6mcp7d7ejxyql75n9jdoyb4zj6i60w9tf90g231hxdi4cvp2d8q3s7x621y8l9tegtdhnab9hmfa5lpt1ax3ky7b75guxpk9t6e7rjx39ljo1xdrdv8uaa1280vlbl45njylfd6zgnp4bh2gdk2ovclq24ns03mcl41zm15wfnwxlllt77rjhaktcpu29uude57kic7n19p',
                proxyHost: 't6aaw0r7utmjzh648547nwp6w67bs6ve2ulz9o4xewiuzwatfp25fztxvz3t',
                proxyPort: 7119730002,
                destination: 'npq6wqs8pohol5e191zgcddon3cnor7aufh1gdnhpq5wiyfqegv2fyfpuz3ci2803mtiezznuh68wen2axyjkjmbc5v45c4d4zetpua1ses8hu8rays2zi6rokmq1v0or7om1nyrtwzwdhqqduxgcz59anrsz487',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xibpf2rd4rvy8mg96l6bual56yy8gj15tr4x5byuv14yy12il62o91comfm1pnj0a2mjrxcdvvvabsy6z8iib37syhr57rq1ewnlnxuvzjefh87rotupwwykh3t871jobf16a7lfl9hfp62b9q0d4gj3zblpao9d',
                responsibleUserAccountName: 'yd3cr1aix1nubxpuhsqd',
                lastChangeUserAccount: '3sveyzoqau3rict2za2j',
                lastChangedAt: '2020-11-04 09:23:01',
                riInterfaceName: 'vlubajni0ilrbblpj6i26qxo8aa3l87qit1oyha1odzdkx2lrw176zwalewy6tgeclpm7z4jkoxvadohnhgc4pcpk79elyl673i8lm74v154utzs08xuzf6v58fqengyrnlcjtapakmhnoj916dlkv1qoauvafty',
                riInterfaceNamespace: 'k224dy7q4vdgco2jkbkwmpimrqmvjl87jxc24qoifvavjf0q49f7iyud0fpb7m89p35rj059xal0huave6bvodwjbd1kcv6hvys7dgb4f1n5n550c9l6wn5i9w9y6lmzt3w6zravl0sdh07iy3enoon332g10tz3',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'wc5y5f42novodqhjp39kros1kycpzrnpddjodqw4',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'ny85iqsqetle01dwcaupgahvdhzy0oamfttuv0gk86y7o5ocwi',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'nh4d9xeupd1ejk5hos6i',
                party: 'd7zqn7bxayk7re9ogvy9hu4ov8dsp6sootnr9iaon43aq3qqy5czga7vwvqty1h4f7v5xmxaobpvfq47px64fv05pcs75nm03u31zm36vb3m3cbws92h0qli9s312kw9xkh7hr4xgp6vxc8jrbj9v3bekhu4s9dd',
                component: 'kyikpsfj97xqpfo5wbsc4alzvx8nla470bsmwzwdm2s06ntgtkklkthoe9wjdhvufqp00ocqjrr8hg1sstt08hpr53vsdqq85i435z9rdl5sz2cu4wtu9xidxf5deixpxt6084h4lv8rwfn8oc4py6nr8de7wp4y',
                name: 'bmsyqkrjbwgovh1afjket4g6bpxebzw8ynwc1f27q3i7og5ttrbxvlv0jenbxs4emdfxhzgccfn4m8rfnjtdce1tyzfbusyykzhnx86a3q7m3ks3l8i846xm5dmtd6awjhfmt4qcscxmqez04af7hjdwzt8f102f',
                flowHash: 'i989bxu02ewxj7hqkdaj5udh0demdn3h76jgb4k3',
                flowParty: 'di61jyaropnz7m2e9qpjezw9l9z9q7yp1la1cxaeyoyrfzdd1ew10ddoid2hih9yojhq1s1gxzdf6dhkr4eza8fil349b04xj2vi9c2qqqxek4hfzwgx3in9bku2skzpkb0mcocg7pjxe2htpbjn795w1zn8dweg',
                flowReceiverParty: 'cs169jpm9k7gkatk6d8v76y83z4s9w1vpqjr8m8u8g8i9tn90h4qm55qgh15psqty3z7nxr627w2i8j18x6a5u7kalhjepk3d93kd13q0s9oakueu9mypjnf2tovmz5bfzk6tssbvhm7geu1wwg1n0w7q797latm',
                flowComponent: 'sp3j8uvlclrz38fuzrq27iemd4v0xykgblzt98ikl39954ienech53cgrbw9ckn3msid225fwbiqtqarucax9fm4z5rk4jb5578tmx69k06ojmzpanf3tpppdw5z8ztitbrvig8o68acy9rhlztbzcisxey9r03z',
                flowReceiverComponent: 'pzv6xcqfww5fx354f3t4c26yckl4tl3uolaniqm52tx0cso07jwrsf2e7xkr0ozikrc8xrevz85kx2cgqhm5uncu0saa3wy9cyp3ggyzg9prj71x8rxmpix579fpgx16o9c8hc59sqe0s4wdffptr1womhc1wpjm',
                flowInterfaceName: 'jtq7cpu36uh6hifhlw2sfq9flerx50dyd45jwxglldbidq315vub4lyzegqisca4otr9ee82z4zvgn4c43l6zihe3j9yex6ppydqs5r7ue4qyn99ojdxl81hlbqn4nm4nc75us0c0fomsvyl6i83f7px6o4u0u34',
                flowInterfaceNamespace: 'yaioaqp39sjshz95jf6owc2rjtnn5avm5ndsjib0aqfhq75mlc845r4rnot9owx887n5mc29db0xq6q0tkvpjh511rtjkyj09gesjf8dybh4tv0f3hxhwibyyhcjrcxvdrzcb9c150k6p1vlv2j3u2yvxhu3xwy7',
                version: 'zgen4kdsnrymmic4zdct',
                adapterType: 'h1auk6nu7oaq3jgwcr8y8px986dbkeln5pqtxusnojp99zke8i2agb5sn7xi',
                direction: 'SENDER',
                transportProtocol: 'etc7697e6wi3d15vfi9ezsapur2x9st4la9b907g033a9upwoqn63xn4sr9a',
                messageProtocol: 'tv962677u6nzifxb7pb1aonr5y65i1bfgnb9kkc5mxbow5tp20p4b0wohuam',
                adapterEngineName: 'guo65hlval1wqz3szzbpjb4sdbwax5qsc3atohalamhh3i9t261e4mz3510sp6j0fmctmw66mnn7hrzc5y8w9i5voqnuicg84l4nmntiql4x0vqeaxfyyjqgpy8rgch1r6ej2od9w0dkd92zpkt3z5bafqctfgaw',
                url: 'xr7bmmwlbye35exhx6mvemdghwi7ydevoqjpczhvdt3ib12j49zfq3rrn3k4ret06jt86qu9iyrgpxmc4vp3c4e0hhx7coq7z1ad6d7dhjbct07qagfq0krty2krrdqtwzdd60blc1ekemuq0c036kvus5s9a1mdlwmatuj4l84u7aei0uygmktp0uwfz5abjjhbopa4shwx8ffk9inoy9cpfn9ypk59tsvby1mr93dnsnalmb0c7oev4hsgtyihkmj1egjvl0xidvviix0sgh1idubmhix1eb37co51x40f0ozyakxmrtf7pxjl05q2',
                username: 'muoiz8c95j4l347xssrpwcdgw6hunhxuvy29dbytq5m4kyd1lmmg82yym0y7',
                remoteHost: 'e682gtjghjscodhgklurg6suxcxsn7fg6hktgmlullmm1780rsir2swh3yq4d522wmh9idcepsikerlh8hmtzjd113tsa7wxty9zpfrbe4zblf5thc6u1l0lzgwpr3vc2yelov55ebltval8p2prh8nzcepcuxna',
                remotePort: 3059628395,
                directory: '9qtdqsv0rzu6dccd64715fv0j14zg3jkn4zuuwrc12at8clfrqoutajhum2wf5zulzaw3h6pcej3ankaheyq1f8cqvdjviitnpwmsufi9kgr4o4a3cx3jwcvwz1qwqx68hzwn6i2wa0ley220r135omaatj1t4348xk6k9xyjlop6odu584cu6x14lbt2paqip0m58hbox8hgz1m0a1bnx1lwa0to84ak54d9g4v8c0fyv9vqzn088msf779sv248g841o21vs9ae7lkveonqxkc57mcbwyecqjef3odobxtr45dvhs07462djv0fn8ms8p53cqq0fhdbqxj1iulmu9fwaej5052ddyic1b8n5fc9xuq6yfatwe2617vnknh3xsr8kbpq235o4ju8mmv1lrm1bnuefegzog27i07yt35hi2jyyx1t58t9jp4k9n6u3t0skw2r48pg6ahv5bqy8pk0rn1zexkvrhbv4j1nbt22614my4e5qknmgwwgz5jslp3a69mp6wji3bmt845twlw0jrxn76qqkqhw34mis4c9zx5tqe5v8h1om36evdnk053vjz1g8jobyfxm2xec9v3dr18ynd3lpup9c1nuvm7p8kpoaazlrs3a1042ikahtwpandr5bd53y7uwpvjav9nbnfa37dgfpntfw7n99l5dnf3oyh08yhwmswtefr7ku290msmzlzqn9k093a1he83mr9mezmxcxsuuk0vduaipxv7zy4vc8z1nx21mji4tcdbq3vb5yicwwpmevgu0p2o9kbl15ium1pbvgofoqif3llu6c4eyda6aqj7xg8bc5g2yg2h139wfqovviitia5puh1m9pg6o04964gqvtyqzfxe4rvwjizgihvw2zmzdobruyk5bx2zf5ougi5jrldrgwfmmuugns7dt6apqtn6zeyk6ccnvprs9os9vdzpa9svdo593mkrylfsfy6u4nmle93cfknktn3wxpxfipjwz3eg6jh9o73492juz7ad',
                fileSchema: 'x8bb57yqruktofstihphqsc5tcvwj7vu0gqbyf6oaa8129y3civvkmj85zw5rr7ruloe20d7k6p9eecnz1k5c7wvolemjdwm4uj2cztdksn5zb2usp0tp5lsz4xu5jdv235iddbyi8kosn7akqnpnlj9cs7stldh82a6p93lt4avswunzta4xjsd3zhaczq0elvk1uf05fqcvz17dcrzodmsnnzsy8xfba8yj63odv4b17jvzhg8y6w3e6b15wtv3pveyk26opyly5ctuf7xvzj29a9kven35n5ipkcn4sehbskstzwoqccvoxv2k3l734z1lpbrhc6iab2qz0cbdidaltry6bxups4dj6foy52s6g69h0m50tx2sypoa8y4q8tkwicp5qatldko53xm4cw5onufdodyh72vgpweemq6oawb7x82nk512uwtld9dyrs2nyqpar1ettrhy1o761kyjerehsfo4dy50twpvnqsecotseo74qmz6ruthm9l861e0g7ztsupxz6y9ysgurih3t9uweqp22khciiclmkgocaan92ei6ts9y8yehjfvwdjg7df8fhdan53ghz7ou4ty8yaurpiu0bs8qwmuzdq6m7dpmr08vz617nclluvcqn4ykn4briz0r4dtsp3zzialed9o5vl2zj4ktl0c77vpgrcuk26ly52taobe58ynszrcv1fajb2s992yblyy6giuyhaskp77bu335ypdn02cvam40my84aivkv4hth66bimgwapx5qpd6j0u550hiigtok5htplhxtvu8oqs5fb9lug5pfncokpbjv2z587bt85eh3d88t2rdfdqmc3sr5gizrgw05urd7fk7aauicvtvn474um2sxc4f6hlkjh3c2jub9g45h8gbq1b05tr5t1j06a7b6d43on33rdf3uixuh0zlrm53k56jp0yo92p49dll0hqfl0qm6jv4hbdi7flmvq69laevfcbh2ngkbsjit72qgl29y0u1wxb8y9f',
                proxyHost: 'lf78bos4paay1op75p35yfjtils7jacctp4cjhw4udd55hjx9vqkc3rjsjfk',
                proxyPort: 1355540644,
                destination: '41ryf79d2v92ra8b26tu5zkgdsrni5auocs083ldm01mcufy9wb7aa2bjimelsp6j04de7yxcv17fpsdkj31zc3cl8d80imdlokp4inmysfij4v2qope5dod8svq99vv5hrv1w3glohg4kpudagptehainnxvg24',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'sz5w5wzatt4zqm8wydxpx11afcu5o55w3b8c0kadq57us8yp1m7n42ltbz837fk6gagzohp7pym3qsaq87js0pnjig8nfdsar78g4zm0s4zveyeulqpzs5wswnmmihh9m8pjx3dw6w7x6jsa92bw2mhw0589roo7',
                responsibleUserAccountName: '5go7rmgpm1h4l9axda4q',
                lastChangeUserAccount: '7a31c2i8e1q5dcniq2iv',
                lastChangedAt: '2020-11-03 22:21:24',
                riInterfaceName: 'jp1vo2wbwxjzfo01w07xex6j40z928fdqo3hbiitl6r84fa5wbb6c60cggyi5907aumkx5arhieqiovucnprhkgxnzaz4v9liwb97zony7safqcyett1y06643xu2sugfogvipaujdz634tha4slxraflpce6htr',
                riInterfaceNamespace: '68xll342somdpaucjzm0rhxca3yc5j6o499hnm5r57lt1vt60xqz0gebr2w1na78mdiaklis0buithy7tuiwmxrl3rdxmk1iwtspmndih6m4lhfafmdt67t6b1nejejr8yfskt3gtzl4dtiiz31p30zjjyyqvzkp',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'amm56k3zug3dejd5puk40g4lj2l3py1ebo9prp1h',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '9g358lllqhdi5ntv2987zc8vgzs0eit7hbng44bwqwmt8pfvwb',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '8q3ttg049ct898dpfop4',
                party: '9il3q8y4n7rdhahkvo72ad9ujp9g2noywt6bub8g4kb10faojxc7til5l2ap6u9k2zd27flrsm6u4woflbwf12rsa1xkc2y3699a1lqjpky5qircmgjlu56ikpe02r38vr2tuh6a9oohkvu0dh811lm7e0prq5p8',
                component: 'vnu2zs9why6ga8jkpq1ihsq1tt47lhr9ex17f72jwb0qa3tpcmdeddz040blvpqsxiese8uhcdrelc7by6vfkybycvf90cn048ywwlrminevwnhtgoihngtlbhtq6jq7htpaojyp4y70us4bkqhcbsn1lcy3bk1t',
                name: '30t2atzsew5jyw9rzrx0316xkrpth53e3mxkspqecwt0ig7kww0f6vlkvamjfsdyk57x8ych3m91owrzzbjuovl6v6gia8v3o16f7mzu1j1uimze6w2ab9nnw165aluoyb16fyezsoefnh9tdi7org0dyhg6vash',
                flowHash: 'fn86cuktv6tm85dy1sjrb560nkutw6mp4ul004ol',
                flowParty: 'catijyaz2bzd3id1hyqkxx7l4e6xxiqf0r4mxe3rz1meiulll8g6sd4w3oh61dbhhfdj0pb84grpobmcgrculgc7ctj2aigb64ihtswq1gy6s0ep7n6w33wkbvvlvk2jvqg37mbdjke3nvnwwjmfuoc2zgnd5y0o',
                flowReceiverParty: '73j5qcrzdn8i5wkbyyk1px7ucd7rdlmilil9zb6phpzlle4ei1q2pavb28z03sjhduutgxnlnteiewccfnrpf7txjjym7lxj2xl2n4ojy3qfgnjekhwwv9n67bb58zg3pkgx1rqo3vcqk5dtptn07k7b62w4waq8',
                flowComponent: 's3f51shab6hyfux24sm155yuf7dw68matw1g0roc14n0mvrhii34fhpugl0ty2wq1hler8wwcfh08uadqw6q185mtpwkp6dbcaldaoo5hlqh87qdi6bfe0clvwuy94r4hmnyifclzng9a9wvheczeoxxpfu61oan',
                flowReceiverComponent: '79k7q3r9649ji7npcfcbqfyegcoyq7ivxcr5u69mbyut6lcsr6xlqcb9uayy1tbwvm2j294untqa0gk60maiorzg6f97nfjwd5ergdxeprqpwtten96zmsnub2patapp2735n5wfw1wjp3g6euftb77i0kl5l731',
                flowInterfaceName: 'n8ex22xdxcn175pbaxxvt626ptya7rlqbfz5tkzn01de3ehfv4ni9hxy9vhuxg5dmb1ciqzxzgjeorq7bolp2aqdvvsrz9ry9t6i77j5r6mdbbwspf71mt37f58rblh0nr5b7ucho7hl1fmsdfcqd28whfdu4wcx',
                flowInterfaceNamespace: '0jydxgsjy6cc3tdzl7c1yxb9hhsgbhki7c50akaxr9waq3djn7jwqg2928a8svl925u49ot0dfh9f14owkcdixdjhhb2z803stcmdl2m5g40l16f7egb01u7jozut5bsit3m94yudrr3j7cnqramkp0to932jwsn',
                version: '321miijsl2t8mq7emap1',
                adapterType: '5255ue587mm1qp84s5gifrhpdsaewcj4wxsfrv82zvqam9jk0x8uz244ttyl',
                direction: 'RECEIVER',
                transportProtocol: 'lihzfxj88fiqp7nf7zscx03qt2ogoyjl0cx3ubeg62jfn5wl33iqr0t7yhkk',
                messageProtocol: 'xoxphvw1gduazuhgxs20av2sngict40mmu4m9ylwxp08bxbvtansjfvgmfn5',
                adapterEngineName: 'br7na843yxjyw1fzgo0gu9eksy873v3zgbjp73mjtr38sj7al80kj0mxsnfridqy8lxh021dsl359lwzabdc8wggpzte5p7uosle37e6kgpxjuafka0wivm203m4edx4j1o7er8l7y6223po9ewbo4i5k23wij9n',
                url: 'f6bbnq0g9czcqmnq36paexdezy9wrsa3xehjerf2p82jbdrqijiaxeboih4alcgekcq38nfkx4ob7e0n7tazoe4xzso4upgkdjhyh4jb6g4ebxyr9s7ak9fnvyh26r20lf9r59frz1p5ujnq3eugs0hr8oxe0q8kc884yun4aopwsy24sfarwj4opgmlem6zkpmk3m2pi4947v3zb132pp44vawwjac5nmjknmjdroznnsgfx9zkryibbfib84qxec9z153novzyymr7vptmri3nfy4vvd7zgsg3nkzwlnfqchwrx2sbumctnqbe5mxz',
                username: 'ywtfu502kkhikpn0zivrgtfunl6r0thmdezi4ehbjui764hxmsquaivje4t6',
                remoteHost: 'cld74ka1q9g553frj1qlnejkx7bv3g4vrokjuu5euoc2fihr2fiy53yrwf7l63gmwanxkfq7jzvsyve4lczrzqk86mw6cqr3lq2nupdmr2e44d4m4cs4uyqpy98ueul0o6lvrixbcym4h0hrc8zxtzn3wxnc227z',
                remotePort: 1270576891,
                directory: 'vdtl5fbsv4bmndhia74nf75pzj854bydrvfolruebuaz32uhhp7j53daeilvbqgphne9xfzcu59mlhssm18yx9f51d6e5xs0fa4nfok7e76a81zqeb5g55ox1kervl5c830ckzfk0q9bvyqus5pyol5f8hdehpmo43grz7xozbw9q8pyil379k8uorxuqzljdpbtd3gcocmru3rorx5jjpolyee86cl2unqrf4yramf4hunpykossyyu31se9eowgiclractw5mjyjxwt3l73osqzri4hsjfieog8hbq4oc7o9ftdzhwhrgdgrao3y73bynwp0wton7jz0atj6qbwlqyxgh2b8kw1rjlo9f5ujums9io9pttw8m2uy16f2hfmxyq5xypyvtsq8z8yb1vdq92add1pbhgdzlnkq68y40w989zaa5uoanwstk97uo6jfz7fkl1194hnvehwxitf8idjt9nd2pdqz91c4n0efg6g15lmkffgr9dq69krk25m0g07wpuvxgzknjmq5yzzd25akhhucucnzolcl9fl3v56z3tugfr4i7xpraqqjh4ca6qr41c4zg8njpa8clofth2m5swrwpg5seuv0q0n263ap6j03x18jbsqru2dt43zdxrdujzuggx9vi69d4ghw2zljypmajkpz7jzjw0vybg2wdz7a8y2unkwaavrpw49ka792oxism6uv8gs01se84oa24yt86tm8dzbkhihnzggnkl2lg4ol139fiaw0zh94kmmsfmrcmhixejnamaf52cpjoot6g997mrgx8f4nngsk4s7gqrby5qjm25emlvwh2693vlam46yvvr9o85flhmzo1v2hn60n4aw07ze9gd2qqe2mzry09vjkqlswyhv3tcxtx2y7zqbq4c2he0vjynf0kcr4lxbkm8dnrac9yxv8ascfosf58y4rest1utnb9h6p2wdmw6h22gyu60on5yj2e8qjk3xfkv4yncyqdxa6ki8676v8cww4pszq5r',
                fileSchema: 'y1q97l22edmrymnii9o3gymd47ppsvhswp7x0mjpju47s97yg7t390apknbar447hi8pfam46e81k6p2rfkur0c7t1pb0skjfzulqru7wltxec759nw000d2zw5t8crtfnyunh8xi4tfi2l4kpj31vs5czj06sgzvie2pc4du7lmcnq6b4bkz58tkolmy44f3uemj9yq4l6l9tdx4hi4bp47svpzzi7qrun104ujxqfark0do83xs12k4gvdb2x6jghax1sd3bh3q120bm7ht0fb5zvpwb7d1p412gspzd592p6ujr75228xboarg3zrw6c683jn0nl4wqh85z1qw0g9k74upinxemb5dwrag33yceqgpqvhtwy73qp2igd2l1ryv3pvbtgx6woo8p8yrtutdwhqq4bjzs37h4b2w0bno7sxahdn9kp52f81pf592eyjrkuavrmo61gg0kukl8mzxyf6f7rdubnal2sgz1c959uztplduen0ib1crgnr929ibpu1u8i0zbvdtof2cwvngv6tptakwaidbgfh3n83bu06a8wu8urvo46qyt9129cn5ne1cy0ps897prpmvwtbww2aniglkaabfa8yys7ccps4xjhk7w7om1yx4t1pu846cxnes4kw5mj4r5poga3welu0846mq77bqdxpxzf3kvtyoq5wndxzgf153vxkok5pn8ffdn9j098lb7qb7tpqvcc01aogo3v5zswq0apyjngpndi1uklg4mpqht4homcuiu9yfz437ird08be0z66sk9a55fgfpz0ew4diqbuth366n11e9t8xi17sp33lbexnynwaw4ogh24it6pbyt2wz606klwfqtv2ktdcnutel9ingho6bu3dhaahk0ftrbb4bcq86p4ntb4u9zuo743kqpb1e6onrgqqzdte94h75dphuzu2js8wlrknbvawxnjyn9gf8tw4ayq2fd8wa1vkuen6cxezakfqqab8tpz122xumv18ct9nkehy4gf',
                proxyHost: '5orbj63km23i1ci2ddygclkyy9j98tef19x75g6b252hno0vmh0jh5tzs5nfl',
                proxyPort: 9832095743,
                destination: 'q2lnxifwtls99p5pmf8go9b6cpu3q6l43hb6ooc8ciuh3nn3brm4nrd4ses2xef10wedwu6n9n2lh7w9449s6f6hwvog08tlnw3qwftlhas3sqkm95rvclfdtx9s7swut43uy7ptrtc45ztsfm8357vx8nm9sunj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qmsezsvszlm2d0p85ujyil0zpwdp788ovljlb71vhoe2z8b2t2etp1r16gpu484p2ytxdi2xnrbu2jcal5v7ca569ugpys5h21li7nm95yoakq3gx0ogh244qrbt7yfdocgikfr00oht1dmyw69ncyllhkcicfw9',
                responsibleUserAccountName: 'qll0a23q2gib58flohs4',
                lastChangeUserAccount: 't690dwweokkskqldvjt2',
                lastChangedAt: '2020-11-04 04:26:02',
                riInterfaceName: 'fngjmge5ojnku5dzds1huo21xphkptyfqc5q8adp98b7wv717ewfjrknb3220z36fx4wi98lt41oyoulv6tj85v9q7njtygua6ruhzxg3jn443rzgayxjv19lrwryqwvk1dvz2r0acb940gh0g8wxmoiuuf2lbdn',
                riInterfaceNamespace: '4l0944gdryvb7maxw0x69ayjuf644pmj69zzscfkquhhhq3en95qmspalwhtdpnhqy3v2re9x316qjs6ca8xeoc9r3xjdzx3as80imofj6ujl3s5ltanhk4as1byxebw0wff7dlutqo7p7hv3i5arxi48beph3eg',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'jl0zgye7jov6uakl87w8sxq8prozcjbr7dfub9lv',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '1z8v1vs3hdy6o9b2jvx9a55elz813q9m4l9ozj25731thu7xb8',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'bpqueywyqtd0hgwy8fhm',
                party: 'x6ecdqtwbiw7ol8jjsavhyaobwv5xth6acg7hjzw5rnqsuxsf8nrcqlfhlrmlfo2q7jum19jcb2k8rn1786slge8v0dbyzx5rv50t8j4hh5t1gewl2895r9lqde4lp1crrjg762aqz4w8bmb7regx8vg6ahbtpfj',
                component: '742zcr34l5viumshdr0usfr9gbc2g237e6l5k5k93tqqntnvwdf36mf7nezu30ek303ecgy6924lpc22onec07jn7k5dusgtcigh8shr6rsrd468ip57yg47g7zzrybo3x2vx19o5jm3djxgmiyqoatag2y23xd5',
                name: 'upt9h43xn6tu0l9uccb6uaf4xw9l24bgcbzelidoz9aayc9t1adm25jeowoxzczd9jd64va5pjaa5w0xwbc2l5d0qln8y8wbh6iessyl2uhjx6ecakcs2j9jotcx034vo7dmpej2t5ta3y41pptjda1imz3hpmon',
                flowHash: '8psznnuj1yvi2hhcqwd0a9ls393t1wzcgi5nvav7',
                flowParty: 'glcwohzuacmxowx5j46w55vnk4vxy3z6oo1jowap8mtnlbk4bq9lccfhxomvfojwbb3734uwt3etaa87euk5x3xhie63w79nqqr5pyerlrj6t5xuj5xr2wrh4sho4ahqkbsq5m7vexiylsm44xxo8criakg0ho9r',
                flowReceiverParty: 'bh8favnwkmx8mtwem7ir7wwk7f35lsm4n08ljcv2lfryh5xfsxi66e3fdd2etwrdv144mk6558fukfyret6cl6exgt90zu3infe1uozjcpq9nsy2zi3s1cqgnb1gffr7iep1lwgl8qonpno4vadd1urbw7r78mah',
                flowComponent: '2lio49robsiu5yybaqakgy2ufvtvg3axgowdioj7g49do2a576bql00mpe0ln0yz8njgvxiwix7ep33of628nyca4omrw9ijyea5uwu440gy8hwjkx3n4rdvhs8pjn2exo8yoqrww0b2yqddm4031yj52cgey6ug',
                flowReceiverComponent: '83fhszckzeb3datg1wy6eo7mp8k0nmge0l3qxctessxyexwq9ft9f8pb9ivvup2xcb06ll7fxd0ny4gu7u6rykms3dee2i179i78c6k2mnsk2z1te9rxk254m2f1w87zxa2a3xeolg0g93dz0g3907i6prted79m',
                flowInterfaceName: 'zfsye4nadyy2uswcyhu7xyfeph95dxylpnxjgl3tasbhtjxq3sz226ci59ip5rzj604rtg0tbt9tq7z1dld2cyikwslzmfx8e7eq3ylsm462gktsbt0i34ehrufi2gbgvek7vhf9xz0n3ys11lkiajia2ixkrh5u',
                flowInterfaceNamespace: '7eudgev9r6vhy76bhfipfgzrh2hgbjlrvorgpu283t6v9hglowxnaofjnta14cthko30olgf5tngg0osx0xap1y9xbggfenl02jtvix3wngkr074fzrgwr920q4atjpsgasis7mtfl79c4xttuaxmlonk91olb9k',
                version: 'obggwov53zyg9bmbr6s5',
                adapterType: 'aa0ig9ip6jpd1ur4vd2mjs3s0mcpff6i5qfwm2obvzib7zvdqn4c2801qg2g',
                direction: 'RECEIVER',
                transportProtocol: '37ft18g33u64g0wafj2xqckchi75qs0vd4fo9im4h3l7h58yt7jxmcgavxmc',
                messageProtocol: '94pu8p50ozmecch3m33emjxhx0zbsm4sxotbqct90dedpha6b53sz984bvwg',
                adapterEngineName: 'in725evwic9jc5ub1riwqd726zhbys3oqb0s8h2nvq8e95gjb42b4izhlzvz5sqogxen83zgsra81373zf7xv70pkdhxsg3dji8x0j81ugr89e6r6j0s6jr0s254fpviq079ep5cdsputgyhze28tq1yepf9dqsm',
                url: 'ezzhk0vil4i0iej66bzgey8p0rsz75fmrvh8h73rawnd04ou9enmejv9a4ggd8baqcw2oc92ahpv7pci4vr97kqbpt3laot10m5zr5mglc33rf00ytpedf8q34ucro5s4bt9of7ycplpriel9wce6akltyq789aqwzo0peg6hs27rzvm0363n3plv6fal6pfwz2wp45sfr5jtscxpxjf56mfflgwxeahnb8hvktb7euhnt2gowr29iixk8s45zxud8qx7fb0jb94257brcan93qtdreegquf0themqcvkcd0vgw89sb3fo1z20ldc27m',
                username: '21e5u44ywhp8ojprcud0db1rpuelwe3kvd9kbwmr1x82vn28ooc23h4sthw3',
                remoteHost: 'u0uqss2vf42iagote8mvyginr1bwsmsi7uv9j7o1ol311xo1dmlwqxjxft9h9dujrjosja2dysn8hnv311ekefwlussdelsng6c7c84yqi9fizv5u4odad8qs8edunruwj0ibc2eyq9b6gtw8y7db35c62ymungy',
                remotePort: 1204653480,
                directory: '5l9ywh1uc6h8p9ibnh0bgggfszjmjhc531zmpqj7bbh9s662nb29suupsyjxk8sj8nogat0d9fgpw6kiiiftnfbksmznn2lafxe6ecgp8w2qizo2aos3ahja9x0yt03uq7m828ykzrjxicglz8tfjwyt0bpjrzwlevvugpj54ka5lfx8l1inp3tpv8dltmze5lrdohcxxp167y3mkipvv1z6j6rq3re8ulh13yi5py4qtqmffdsn9f0wfb9x6re8ydz82hpy9ykir7pcouyeqt5tmhiu4xzt7t1i0fnel0ztuqoatl1c5s4y3czx85lv1nju3n7hznqbohb5xybcp2xd7wcqimwzkvm6pjja6d6dwnptg5jvmem6elf3kbieb3ce6p7j4r4fqsf9e76dq741y5bjo6heszxspenlc2fg9hp0i2a11gl10a3uvvf3i9cziox24n7x6pift8iw0ccer1i10zphlf15w2kei7ee5hhjnhzq1suh4klnz13tzkvbf9thanqvie6p53iltw28bbh0zuqd2l4njoc3jkg2c4yucjj222aa75u19j8uc3sdis4sb2m23lgfol8ka2ykfr25868evxhtjoovaw80y27svvo2kpbawmhdhgoew37jlzheungbn7k30uobrrgr0hgm1x0qeihmx6v3wukw90463lcdltkidm4i0fd9x6gn9h9fafkuel6fh3bmfblfqr4sjyzgcricxv4jrpy4q9u46jw8rpx6kfp7qmmnhtt81zs13y1mk35fl1dvn2ofcmavtybabpuahmsw5qatvryeisdkc4cx3z74elv7a4xsqmtd7lpi5af8z5zthahdxo1o74fvq9kndigp7esq9gewy332k426sef6c6cskbe00blv2588mw6hgab0rylyzdb5fkqx7v0o0e9yllaf1ed9rq2d7nlnsbcz7thsk3tsvzkw264oot4ymauovo2vqt4kwe2jz97t1cfckf4z24kmca9tyl5zv7cp65hd',
                fileSchema: 's0uubzuxobdepbylwqbpqnfuiht79rjbij08y23xct3wx8bituws21rsfmn9pfggfkyjtbss6mjgfi0dr1vtvk59g8dv3pjebw0cvr1k588xqwskkeevwg014pw4anb05dwxop3sn62amo2f0goay5d4dy05m85f9xyx4o0fwczlzzp9vim5n1qbgnr92yiuzyso8ydj9soklmcxkeo5mowpavx0jav3frula2m0wzn9xzj6pj39nqypkfnfp09bzy1dff7686ni6fnmpbljpg2hoofxlmo04wysknc38401q4sbih6k01jaj7qkc8lui59286niq8dpm3gaqpsbj6kdeg9rzp5wk9tunt8w81iotpwohmzk4m16vlij83xekl1fl01p1ogbkwf26b1joodjkuuj07ftfnb6dmtymlu08wdncrm68th1qcpdqzsiyejthdank2qilf9bzrd6sobenj5ytvwj2sl0bgfvucwbml26a3yx3bvngo2cv7h2tmdaq2c8n5q2r2nj6obd13n59udr27ral28vg6hyf8q89opht14rfnqyi5hiplw26vof37hqgk66s5rtnuk8ftdz3r13fk0yn0bepxujnx18npcw0b2tzkugtofydxhgxy1tcrhjlhu9gp52x75j5k55xo360z5bjzpena562ms0pletnzow9f1jq0ey95jdj7pdrmx9vsj9jiclirrboe3uauuw13t6g78rmyz14jxw73nlktlfkhynq45eewsm6kg5e4urd6jjgcmemv7ct429nlileem7hypfdc28htiab3bxtfm0gyk8zgbo1yi6lkwomlbqbl6cr9ebyahtp8p1ha139qtfrlntv3aleuycaq5ik2fgna0rvhj5hitukxb7ubvgf6kche8na4gzi6k9wdkjg299v10p4fdr5sg117ugztjsy2kvq6js16wnessb7170dopuw3g78ll6f9e9wohu625yrf3q46h4diuludva88swat2zu87e6agh',
                proxyHost: '3mnmica64qy2h41dz9xnm5680qf4gcwh0p2v5b6i9spm4mf19z52sj74u7pj',
                proxyPort: 21277402364,
                destination: 'wuy6fiwgosng5ef8ui61qhrliri9r6580ndsbx85dra5bkw55qzjqxe9gko6knqp7tgg8lqhfkwvqkf02q4q99h3ubqamdeeblor98v6qp9iy5l08zc73cqz1a062xd69f9dle8baijsfsbkihg6zvcswp45qn85',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '41ui0lv0vzpc40luh2gq6t87asab9ejzzeiqn96112l7atn6p99bt4kpb4l9vx9lqq0o8tgyc29ht89nq1kvz62dl363ahsw3crlw0ofweth7e7cptb4hlg8tv8hlmsbgn2e0fvzoqprk5ozpsltuas2at1058pe',
                responsibleUserAccountName: 'z04utc1tfsd7up0apl37',
                lastChangeUserAccount: 'rm1gfqgzco4lok4j87uq',
                lastChangedAt: '2020-11-04 06:33:46',
                riInterfaceName: 't8dqbow8jpbpex06y8qukohakkr6sugo0ch71dhtinb19306akb3jrdlr5s6b1s4wmjf5yi43dj9e9nsil22bygsc7a7x6nb9x25mdcbz60qb3oar1eq7ggr0gtl90wyw9xmiqjrwi3obg9a1gcd6eluc7seo7ty',
                riInterfaceNamespace: '7inwidtyjja45bta0n0fj7408sil03vib5swwgo9oeouofwa9w2tmgch63qjyvwmgbirbnw8t2s109xy2ffs5lmx9l1akum3yf853adxl98alt9ssqvtlqcozv3z8ut5qid2icx15unxwsz5gywo9ckgg0pr6vmy',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '6b6bu9856zfddy5en2ikn0pg5fqxu0gnvs16oamc',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '7tpnm8cs4jkmq82hxohclmu1e8l736sf7iqzqsw2i4ldvsttzd',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '6wqz0haqescg5y2jvrsx',
                party: 'f2ahh90p91h1jwxq9bw5fx0pwqqn0bna7on14hl809x0fly1nj3e0nu49ft76wbwwelanos2flus60vg35i8gmi1shbmuguyx6c61mca4j9pnwm3v29bnywasbx7q4llpc4rq13e38lomoix2bubx20e5hi0gyvo',
                component: 'evjue4e6v4i6ioz0mvfj54jgu8kz8ig5rf4d17naoowmxirnpkz5q2dute3uvd3eygr75jk1l5m7rflx04c2h5j3rtqoez95hwkig5it0ogsp8mc5b6eyiag8dq13gdkzzaxotm6ua4x1vsara0nrh2g1rcjiiny',
                name: 'q4aw5xjeoto1oz47tcptzjh1qi9dj93rhi63srxf62hjjgkqr33m0up3plzkvz4qlnt7fgvcur3ivvgolli420omv9rqybdavmqstefzo288zyuquhlcbcn09dd5469kme699a9ca45j0265uryud3vs8gdt85vk',
                flowHash: 'ypw8y24yonvaa6ghoibxdlopj7yqwado18smusbx',
                flowParty: 'p5ooaa2598gxpesu0ttq88ivbdttn3euf1cfs6qbatkj97xa1f8ror4tvnfxs17pos7qgfe0dnjq6e339a37wrvok8y8nb3aw5pu7537ruflp093d0bwlkis1paexva49luzb6f6yyacv0437e7c2fp5qaby1ui8',
                flowReceiverParty: 'z9uc5n7savjvmd0t8mzz0auv1unsj93hkz21pktq9c119m50sfbty6kqycnr5f97sh2r6rssa2tqp0itwkn3g5ico8eo4ck7t7gcgzf8uf71z6b4c882aoqz2ddw78imypjkxcwbgns0rzbqo5hda21h7njdqbja',
                flowComponent: 'w653azcltxohu07v7f57oxx6m83p9n3h9oz1e0svsf9t7wzksoyj9gmnem42w24wm5309n0wwe2l4en75w31yxxs4bq9fvqclcnftyx1ashvzxlppy4fprsdrwf47zr6jpgcjam7vpxdaz5g2ilvdwn9n7ebsjv2',
                flowReceiverComponent: '248561abnfskr4u8yeni38wc1ti0xrc11s5en72dd50dcivg01tn8eva96e6m77tp176zca92m8r1fmd8xfccu4twnmxwgeb0ui7gmkq6rkgm9emyyp5xyj62zc823owgit32qre3yw3gdg0dbirnwm9oq3k8hxb',
                flowInterfaceName: 'h3uapbvt4u8qw22jizqddbcgi8awlvx0j9beg5j1zfdajq2a5e4brk45837ad9eodf96u3yi2csactv6hg0cbs7x6ln2xrncq93j9h4dl9179cd2u0j3fwjajzun5g12ygp1eprl06h5ecx8lg4mkmjw92bvvg55',
                flowInterfaceNamespace: '2pma4btmgnrnicy16odi7ysoucj57f23cyxkea59cg15ho9tfgnkeqy58yj1ejga086zf62gl7qguns5n4ua4a7trjkse9v72k4m4o5xuopcspfa35nyp5etakiy4gvvy1k3a56aw30fmjqp1ietbxv7mnlaxl4m',
                version: '1ota8gf1vyq2ziurpmay',
                adapterType: 'yv59x6so2pi5v8u4nw08lz9hf47xpo2fq5zur7fl5v2rwvjg0lpuj5e8ai1g',
                direction: 'SENDER',
                transportProtocol: 'f6d6tkgjmytf3ovd5w0d48znqhiylmujjhgv4845mjvraorhmul6dgi2oi2z',
                messageProtocol: 'nqyq8j6gj0g6dgtm9912jy57679e67wh80vd8yhai9naa5rwwmzz5chj3edm',
                adapterEngineName: '65tqvaiymfyw3arus3bps6fm177c37z0d3onfwaiqk9vrutkbh7bwtmznnv8fy6paht0b6i149bvs2xcyf90at6nb91jpbp3gaee0ei74pgxy13qfithon5oo1y6p2px1h6hswhbzhabepmp86j1y633prke23q5',
                url: '01p6u2nqucxjvdqcgor7nekj4s35m7fx3chghkv3x50cztuzsnup99tyf7vjjq28v12pxhlgh8gc14crnjygg5wi5w2vp1l0mq592m742tosa8mzpppqxcb5b74j1csmtjfig196gdmjd137z0fu8d3qma75k4kfibcgaots7ss680k6yc1ki9srwh38yj6nah4e44yn6uookpil7ql0p585v42doyttvxhfht1i51oa6sqxq3dsr0vpyamesc24eocj6ib81l79mu10eqqezql3kw891kmwq1lopbe1d72kmw89jqes8wgx7tp0iavt',
                username: '2c3wtmuddo9uilrc0sbl64dobivindn12549do4plst1b05f3lvrr07kxx0o',
                remoteHost: 'kcnbbwfzlg6ahja31cdr6f1hc95c8vrlj3tuwfjydwqvz7nj6dcycxiasqgiqvnkubx96roolchs4tms2vjtvnpi5rpja4zs7hjk4sdy1fka1k2vir43fp2kp7am65dvovkyp11vkzv7ghrk5lvdjt9kfgzn4f5m',
                remotePort: 6347276833,
                directory: 'wc8fo9sma81kodz24gtboyq0zalh0pxtzqxnzsrt9zabu2dhyf9b2sbp774mush700zaadzwau7rxwanw91afe5w9sqljtgf3ty6fb28f2cqcn8fu5gz6362m5exfqn72ywenby1emhru6ei0etcd2s7zmoun31dy3qacd3fvqp78t95xpqv93a1jgkt9oclf10m8hgl6p7jzclvwdq3eg7x9f8zywm3kdeb6ojijoc8wyc1u3t314gtxse9tscj6gwb3d77brbht1i26a09zogb0sdanlngs3pzhzti44b0lrdr8vxfbx5ux3kqxrwtod2h8ehot7auix0ldj4hwcr9qgaesg9ds7cfd2z658a0drf7daeyuga6jww5h7yrry257r94zjcv61vtan4adtcmcktzmrfw2s1vs67w4jko9atenqx0q0iw74283r9vgeznql6q2ma1418vdq64tnjm6e2pz5vz2uvqulhv17x3z68jgplhvdrzpvr73p12rohqq0ss7ews86027uliqxvwsscgw473n564t5i5wdhhxi6i055dgdxwfryt3z5ct594v9wy8xvjyyyuoxa5vvpukliynw0wg5yoh06wke6u7d3i7cga94w6fyinopl1gw72nrfkynw7ck7qu3tx60zxccdjo6uwutjup43wuqif0o95n37r018775ixj5mxdfti88kpfhfhuoh5e35hk16uogd1o3c5k4cjfit0kvexss7zp59jysk2k8cllwfvr9q1nkzh561llxeodadlu9j9bvrxu1b9ujd4ct964unto0zm0wo86zg0vb6cfb95sytf0dlxmjy0k1hhlsmo0gsu226yhldccw1rkqnea4kwlxukj4vj4jhr6lm5os5vq97cl0qzaeed5irl443876bshmfyp66fkuuol60a76pqynwxbq278y8sqgzd0zkrx3boz6lm99p18s5pa46b4gig4nfoxwnrgub20y457uru3qrgv2dgb9yh4g8zgbog',
                fileSchema: '13y2wmh63hes0e1dvg3vkmtcoz5byvs2qofuxn0im4o2o3eaxzxhmuhusvgezoal6ewuxlng0y9h11gzpfrbx3l582d177ab79a1wlep1jr4w11qallln1qbcwfnd0umb0vd9vs16hgjo7cdp4su39c42qbmq80mlgdzckv4repfqw4lkcr2y20syri478iqp1yus5bjmzrh7wz8lplb0qoxq5m7k9lanlc6yyma26gx4059ppzixnjq6vl5sbn3arkc93myqavzh79i4cpy3jjaekpy3zchcl1bldhsz5qbndd718jfk3gftom3mf0p2owpdttd6et2bploaspgme9bwzixr0mdps93fuzixipkgs2qgj0h842yv17808znoo94e3b8lxdl1qa72ojm76thhaze8liwfv7f65bclrjhs1kfsqwyi151li5yh9b9a8rvr1aytvftnje12nwh0xhl2eriilfof4rw8uv5kcjmqz9cyy7qo4h5yeva7eutmgx3f7hztkauoax4ws60tftdci78nvd2k2ookybbm19jqouikhga6dfhf5flntbgxkemtg0bg0kqrgas3vga73j1yzh95z1d1veqh29xcmbob516gb7nt4qfkt7s7fex63upf9idyome9q5mb02xzegerjvjk8axsva0rsed9qllgk9obrp716nv0bp5dmotmuku8rh4jm5fch6duaw239namb75ef6h2yl0xg3t7lmxql4kzs9lh3wnla9koifn82f5pijusybqsgmqxrx1ioir3y1idqh2vo6nrxjhb7niys7q19cs34bicwf68h0rp0lrac3plpq88is8mb1aoj2o4vhxx73fmbi1ep2f8jgn9bov85eswchmz28vd37omff51hf93ae9jp1du9v8epp0jqoaoje37wz17bljwuvs2maq1r1hagpltjufbyox5qa8q0013pd63qu5eajskbi5risk2xun50t1a7fpk44i14z28cfnbodusgedy9hg',
                proxyHost: 't7f6oy4jep33jtincfvyczh7nwzvc5up30mofmx9d709xd6fh3fem0dvcsw8',
                proxyPort: 7719596329,
                destination: 'pvzpz1f6t3kmfhcxwkb5431anii0d9rfxdanlgcvffxpq6k3u4uygb2ckua1kqkpta5ihoi4tk42brzwyhe22gtc14933leb1s6cgefrb5cylvnph0cz18ewayulqzgmpyi91zyymc0hwqcg8qrlbkf93psijk6k5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'd0cttjjzcbc7mbmj59sk0vji3xiygl0fcuxsw096tp018nn7qv69qqi0nkdd4tlapwnmgxlcmgdfvlfsbif7zwa0z53tcp76m6fajnlte1ewvetms29v7fi4yiidjima4qnhexvaznk0e245zz4t8nb1h5bbc3w5',
                responsibleUserAccountName: '53ukt7srpfpclq0rl3to',
                lastChangeUserAccount: '69opqrc8k4c9ttrkxp1n',
                lastChangedAt: '2020-11-04 11:56:34',
                riInterfaceName: '9zxzqjegg6777c7afddbmq5lwjsfhns3ao21yw0gqj8bm8en0ewnskvckmav7m4aeezbjms964oip3zzqm71575enkwogfwkkry9flf5k5xb4ginxd2sz3p3nn7us9ze919jzk3svd2hawvev85u7cjzedt1z9il',
                riInterfaceNamespace: 'i8zoodt6jurvj8jm1rv55wr448qgzqda8i8ymgrzfbviynu1fv5eus03equr0sksvaylqspxaxtn71pe1m8yf2u4arj0s0oh2nd5m5evq1o01lrnaznxqyknsy4z8bly28b07e5odas8434ecfopyvc37kdysrp0',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '7nbtqd405dptkymkisajysjrzaknlgftd07bw0g8',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'n567mfywe4803ff9ko1meh7g533f76fm3kh3u0u84kdfz4gkp5',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'umst9e9jlredzwuyuqpn',
                party: 'tr4zr77gtluh0fl2cvahg1wkv3scels2gpzgmrnebaw5fbx2zm35c6o6eyknlqk7iqdw11i9bfq0rhyddg82ivgobd1bvh8s8a35m66os6boegacaig317fswudrvyt1ipt73ropoftznibavb6gvgahf1wlgmxa',
                component: 'ufo20nvxxtyrikey441cmb987cqjwp3qs612wrn3dhzrr8rclkrx0fqxopiap64cpw6210g3n8h1ds0byjqysnylfvi2b1kjk84ejatj9l27yad0myw3j57c5b5xvp6ysiwv7q3xqyc24s7i1j3p4tpl11tio2gb',
                name: 'xeifmsr5hbwc14i7cnbriy7h106lshqlikcsg8igj39a0hluhehlrgw96pspocn7ykq8i6eg1dgiz27jb7nejioywg1t59ei6mjhayaoaceqlqx0tbidnhrlnex5scvup67zfp3ucpqctgvm6mcjh3fn26o5tqb2',
                flowHash: '4eovzr3eevzd3w39ihrkvud3va3yj4t1twfe1ysc',
                flowParty: 'e7oww1jexezo6p3ty2az1xkcw5i8i26yb95w5ux2vpadmrxrq0iezt4tpaujbujtl6qky1osnyn1k2fmvmslp80doz2bq3fs5jbdd3woz0v76lst2awylvpidmkgsfwjuowv6t9wsvj50rpp5ml9wljhg745oosp',
                flowReceiverParty: '07ff33etwggebb0zsx4ziu86sr1a0jzb9z19nmi0bqhv9mt6n17e12a4m1gtgeqwojyfvyajxe4jotrkv67vpr56t1pmwx722cuz5wb2g4wngtfufvwqkin6uyn0hg13cykr74a1ghqywam9o3ccvbkz5j299ow8',
                flowComponent: 'tzcye710p89jub1jl170qtytdfxu44jt5hyapf0fdkvb8sqjmhk3vdjp4a9dmaaq50f4u064et8ubrqxytha5lrja44sbgz3mb995x0fj18przaocpch8rvosev4elp7mhmafplbvjeoy6ylup5bkmy6h30bktni',
                flowReceiverComponent: '4j4x4stc785e1l0kd71hdkap4hmoio1ats1svv1pucw6osooe0nduiuliqi6gncw3cfevzf11soyl1khzv1dnhhedbp3hh6ur62imn8oddhgymha4bh28thc77hzgassud1tzfo9slql5apf5ls2sy6zuhpm2o26',
                flowInterfaceName: '3vbs0xpkvj3lmhniqqo36qxyu9eqdcwbuz6y1mtlc1oypoa3b7f5jzk5l85inha3w8xmzjqyhwa4p08fg4id607pfbxwxtdzpuuwsnta5y30ibwdabki2hobpxzk98opj2thdem4zy6ieucdor4m4mp06y90p04i',
                flowInterfaceNamespace: 'kd3pub9mctnu6bcbafg3vf2v1ukyd8lkrq1kf207v8ojtnbs5ecm8ouytk78dm0ma1klffzpb9w3tsmr3nldiyhzhzo20zu9mhwfxv7mgvyrh8bi44zkkg9639y8pq6mrw17phgn6s6bgk0lui3lelfwtc57ksg2',
                version: 'xwi495ry8f5vgi8qbl4g',
                adapterType: 'ino90rnj67akt8h08e06zcdlm3hv65ykqhdmbc488vpg7pmrlwpntr6ljxl7',
                direction: 'RECEIVER',
                transportProtocol: 'viqbaild5afto2y7ilqxf0tfxrl2lzy1bdirfmpqtpv8pj0k7stsw8vd6pj8',
                messageProtocol: '1b6ra8c0z6a55247xyl22x0r9ux4tzhw95succ67xihxnwnywm2q741lb283',
                adapterEngineName: 'egylemojlxlkv6cnav77k41yz3w6a7yu8tjdcpixgihjiqea8bfg6u54j8kuak9y5tn9zq7830gosip7vkiduhcaxsqtx5yx79wv3r1mh2d71bflr4f1iy6g25fu8mnavpx3o72vrhj26ih3vfz8m76sajgkc4ec',
                url: 'igjpqhnv2mkqjw163kz3rmr09zemsqm8uidvfu74hw961iijqn4zp08tc9qe6e2t6u7w6w3kmrupvk94edjikxpywqb92ewi5gq0jz65abbuj34j56z1oj6t4h9yihzujeu3np16lz7w7w644eklztznzf370vwme96taueyccxypf4mhy1ms950ool47zz1gculvjmwipacosd9kqmt7s3pyj4ddxr4jffqz673h0h8kwrziu98qkn7fc26raxr5l71xrdggem2p7rk9roep3c5rbqaweid0tbgt001v5n5x9v85ku1umfa62cvfdmq',
                username: 'sjvryi58e4t4qhifipy1gbqz3q6dltnilb430iqeo917pdygkg1aio9gm9j3',
                remoteHost: 'frea11hthrhyvoy55kjot50zdn96vtvajr3xaffrv16aowp6uvidarv0g9d4rggg1ypdytxgvxlmuj572u0e4gf4fc3uyu4jzmbi6l8kmd6p84b05kmxnmly8x8emnk4ypw5xx406w7k78noee9avl32n1a266h2',
                remotePort: 5851533469,
                directory: 'yhygnjc1wop1iv5jpa45cf8yjkt6ozdngkp37m5zav3zj91i98bdmr3xx33aam2knwotuso9tz0tbqbic837iud4f1yjkttx446mui1k7q50bk1alhg9f6y5oy01wxiri966kz2b8lqju616l6ma3of4lafh39s0bzcgotfj66rf5xoec9n6lpu9is8jc8ekmf05ru6rwve9dxlwhi9qq64zrh34j3amec8f1prqwznjjp9y39tv58nb5y5ylxnv7l0nyrv6zcak2vp4ha8gbhoudcd01hf7yxf0s6347q01zuxopml8i3wz5a1q6xnh8pm2ih25ypllhr3f3ccwifx99anfp2rsn211xpb01v5mhh2l7ijbvmc5w3tl6r6bjtixj5f81ya1c4fhxui0irsthjs21irpcylzzwjlsumcf7bdf52e0dsvbs43hm5vxw1xp2101dy11otpkugxa51t0xxpo53qlrbp76mhvq7zmcc9xylg1gcho7lkizzrhqo61sm0x4plhfotp1m9bp8fk265kg93b1jo5pzcrb5139pjsm08cnyvphq6ctycq1vo9v2nayrceebi6d8u84xg6acda5ub21ybm73mlpzjbjbuaj10gtrfoaharl10imttcgisz1ev8pw8j3q68khycwb2w71tbhx57gxo5t5za4bvf5drh4d66sv9l47sji89cydl4vidyojv5nd16izs6wrkiu2dx4ap1zuwp9ue1fpr64zy4ptyr35kqfzok3cmj2t085cmrqkfblb37cs0z65c34gq5b7g5o74r811ca00d8tw1wl9mq9cb3wz744ybzx9em4r0e52xa4y5he3044gl8f0vnoeaqbl4tmlqld4fjlc2w8fn4amgp7ynfq9ribx7mwfulsuih88egzb4j7kuc5xkgkn2d8d4b6ay5sfbn8l2v6gyogvd0zcdnhdz1huotvcuc6j8ao0tlgzovyjhebqilsqcf90gvo0eafp3uxazjhr0gc9xghg',
                fileSchema: 'xfli9om3xaqry0rqywue5wwkul4uu48i8fpuf9fc5q7o2pznlapszitd0z3r7z0ln8c0b67uhvdxc8wcxnimr8gvucxq1w5jgsd8q4kmihdtublz7blazmqvz7eyx5mg61bwo42d8si136pv5nnijg4uik7tbirfp1pcuejszjvjgf0gpnsh8g540rzivvw41eub0vrzhh8vxwqtl7vygtclpfkmu0twvsh07u2r11sbz38urgjd6020xz37tib8anqhsogm1diyxouro11vfwfyrt3tgcz9sch2uzvcjkcc2ystmcmdb2k8htmr6alu7x6yryiamty9dgu41czbuyp9e3vpz6hwfbkuvrqjgm8779d0ygymrz90d70orpftsj925yyy3rrhg9ni1ceq1wjq02bfcoslbhn9jdjp13mntdd9snvpg11u11l67cf5e9eag9iabvc167c49jtd2pxr3bvqdji3u38hhd3ewx3hgbtz3r7cbkfdbmczdbf6x21p2s37kxdfk4jdubwzyz0z466p6mrq2p2s2y69hih8uhxdom70m6oalj4uod3i9kbwful0rl79bnemcuiqf4l6c286wumycmn0nw5jpjd65d1ni9m913pa5jf2i01g18unqnkxw8odxffsnjjz6ueogd0glu6a2j9qik02354a60o400z67z4uvl77uusxia6h8rsd2vr09jvm3lmsd33ovya0gtikvk04xwbgg9uug38z3jprko70k8b89ncd9wujsqpstkec5aifbvc6oyydermbljxwxm7s803pafmghr8qcvj6j4bp8uvf1ru1yo731j9ygrv0kkc67p9bpl5qn5s64p9okmfzor8k0olb92mkgqp16e3ilxkp5g1s1ex099o9lx46hkly2yd27wki6nb9gkrpqwi1garhc3ucb2l5ed32vmw018jlwihri1jxpa6zjtcg83tlp86wyupmgiakv9zw9065jo5kpjpojh2934j0p156geguh0z3',
                proxyHost: 'xa8imcerq4rof5jdot7u8slhtxtetuyogaz8qrzb08phaaml9y7qjbldxnkg',
                proxyPort: 1193377708,
                destination: 'tsw27zb35hqqpnfoh946979lf6u64h88vizmtkvmupggd1kx4m2o3rnotrz8nganxz4qhhq52npny6smzbwj0fqkdna9cw0faqpmn5h8zjuf9yuuri668t23kvwfh1883emqwt5geeipg93s1qrnw39h1eddwj0y',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'q7d6eku7082zhwswmzt94gm0leoe5pau7lubbp854yyad98m3brfu8bj6e7j7cv0z64kxo9gwksqg94w14q098oqakp8ry5l9fn2r1fifwas2tcy58p1y0j1mdhol3celmyiccb0cjht0k1a4qo69is47kgz18lrz',
                responsibleUserAccountName: 'xxhw5lqxwnuadkjduciw',
                lastChangeUserAccount: 'w23b5ryuqj66wtlh6kt7',
                lastChangedAt: '2020-11-04 17:13:13',
                riInterfaceName: 'uq1yiaajv0zrmbbe1l7ppwwfjwjftgn997d2rggfo02kmynnlsq7k3s474xl0piai2ou3g4z7vloon3qhxjurn4qy8yntec9gsodkv489lgq2oad68s0glcy92y18l61hws4tkkv9gdme3z8mhppvk5vxdn5manv',
                riInterfaceNamespace: 'cfvg2txmq2tg86b4wme78ddr6j5nr1bdgsh5fmssf62xr4ig7anl0i25nqg65u7pyn7uln1kdcrfjjiqebi5l48pphk8bvpm1pnc6wdpkv945l4k0xpeba7rbe05ty4p1nn2zffex07pe7hez1nwvpx11my2kmzs',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '03lo0j384f9z9twbt52rtfj9zdidr8aq9aspywf2',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'k52du36efj62ja96tkprgyxe9x2s0vbhx7hc1no5ax28yh9boa',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '9kvz0b31g67sddy43mld',
                party: 'c7dxgpkqqnr7tlewivit5sel0epxlgrj4zaclq51za6qejh0jl5l4zr8vsfjfx1nhn7nr3b8cyza3dokhqplfrd8z7qj4ha3xc79ujdkuqsomzdvw6wdr1vziwmwzyx5gy2itmk7m2squwobdpst7rsdlnpzab87',
                component: '8vshv9j9b9xanv5becfkiunh45ax7um5ybn8ha9ikbfimo6yf4hwrfudy0mfi1g5nccki1f4s6byc1dwczzji74m2xpa5oa3k1wv8jizhdo5zqxzm219o8es3af8jc4nkc6bz4soskhfm6r8xopbumt8cr6n8xwg',
                name: 'o8k7rjskqe6esc01404fbtpb1me3k29fzr8ku0dls13jr0rdi20v9ivpk1fdszpo924n4d378dam7xv99v6xwuh2vs1ceqn283qvh4u04l3m8c7d4z5c7eyl8itlfx0cwovo0m8kq4jq97spmxbut9lsbhguhi7u',
                flowHash: '3zbdhec5cenpy9iomhb9k0savh7wtavxc36igekn',
                flowParty: 'ckos8z4rfza7pb93pem7i2hhyn2mciyboc0y78cfuaindwubjqid7ymtiuux3ccfv8ubfegs0ixve76jbut026ytjwdvuibq3w4d1lmqo2xoani10n9j0hz8o3zynuloudjnwgmu1a8r2zl55obivu9j48cra7m4',
                flowReceiverParty: 'wgbncotb7u1t6g2gevfxgcmuoeybmk8p5tbi6ol4s3gczne91alxj2p8e6e55bljdp9cowcboes0k5jcq4byvxstv5rzb979kv0t26sffjpqnh91o62yskvz0r9bhgfg5a69eml1fvffhwfz3r56vljgr02w0xwo',
                flowComponent: 'mkeofg3a2xk981qofqlainjoleq3xuiolrb452qpkfpo5jxl5gs1dpwjwrwxqpj71hfdrv2pazikmhi0m9yry81t68rupzpu2s8595foh3m954i8has92pggklusg2gwkwkklsy3fv4n8xq49zqq3pza2i69lutl',
                flowReceiverComponent: 'f5kybz3vyqnn91cl6bvewuqfyt8vgb7tvyxbwt24gn4gjnk67isyq54ofxct5q386k6gjg97mf6p8nlpg3pdp54el2z8w8p5ihtjzg87cntvlv1kaovs78mhvpmyodoh2w826z5tjbonn5c6u6b8xp7c8qoaym1x',
                flowInterfaceName: 'jwqn7htphyq5eoze7svrmo4vvnlrn2sl8xzxca78o2166hen1o1eook8femx0kdab009i8c7jeeywb2r1q665e1j3jeo450jg1zrygk8mq2yrl1pdir3roc1b2s0i5tumqjnrngqw35aoa9q4f151revp3khgt47',
                flowInterfaceNamespace: 'g37nk8x7haeor9etw0u6jrcanuti8l6bvbr81vlwoimtp6yltugv058ln3bcyj4mnbiib2xxps1a6s6hdufbaqrzj28lugydpkpfx33vyzzkffauoeu3qdjebf5kdf3nj0wmz5ayod8unpo2clfxgm4z2s443k2n',
                version: 'yezba8ysqsla7e3p29k1',
                adapterType: '8waa6pk4fgsh35c2jzt8j193l5bfcf8tvlsa2q6ijuwunupygzwbtdqw4rqv',
                direction: 'SENDER',
                transportProtocol: 'j3q37yxdkx3tce429u2mwx0tyij13eajlw5f7djz3oqdl0q7upntznqfrrb9',
                messageProtocol: 'gqfux0owd1r3htdnjl93guz2vj27nd9dud5j556wdu3ymzvnv4kz23a97bfp',
                adapterEngineName: 'xbrojpggzk1708cmo53djkm3z5bq8fwzbvckuw33d1hc8haf2o6f217kqp586xq11hdo5b9ibbfti5opalqxoco3f7ofi5tkwwjqwaw8qxzejf31qljhypfjnem7sfu2pjfmxhleincye0kd08evm1a3vvgro4ce',
                url: 'uqttoptly5tgf102xveftphf93z8ls4fdjlg170fjy000sfxyubibf2jtgzxt23lldn4y5igmq2ptgfh84eti5trgpn02r6mnabpgy2ybnlnwzgrj5e41sz601epwz2t26es2pdi99t5zro5aygz8wg21zuztetdew6j6so423lepmqwbdbry0aw0gizs7ecd8kmqgjk59g36j4eaytfbmig802nfs2j1kgiyrzze1psmmpz7sq8l7bjowfoodzt349piqbsf5qbc7hx9i6t4weobzxl1w0nsupcwv4pe8e6xrys80gny88m0n0x1gr6',
                username: 'v3rz66hf65rkoht07clih6dtf1qb0mwun5v16tlwgawcbp3090ub9emlddx1',
                remoteHost: 'qy7e704iu1g6gn3mmw54lhm3j0k3r33h6b3y9wgcra6wzoermwcjk95uxlaiio1e9n47hp3nsypngfu3o4nyw6evop018o6y6e32v24sx42y84x4afknoi3i7hvahei9pi78lvtrblp87af3ktobjyct19vudy7w',
                remotePort: 7973290518,
                directory: 'og3utrnjptzayvd2eelyl6crn87bhpn587dj33xkqs6ugn5t384iyxdd4vigfa4yybkogfx5pnrwu42qwcozvwqm9eepd8cokzy7610uvqx6yc026b1iwe93wabw0ihj70rpu0zfsljay49qvel8ht8gfxuplotnhowhoqled42nxl8yfd23uw04o4z5yvn7m28af8rrkxx7ctv7cgik6z4smqbxdke3i2nw645ouqysgxx0twfb2z8egfnmax7jvx8wbcjwtcmcs08skmedkjmfpjt8291hz0gtoxawqdmdjxmy88gajarwfqs2q9g8qxms8fubhont2ixi5po9z9y94x3f1m4subzepehwlux3rsqultn6y3lqra2721pnevpb5vhkyuuy30tc7h3fxn2b78uhw9fob1exse207wplf4gcgrhofl43osnz0lxeqw20v4rqjo0wg1lmkhdekylujihixpm13wvmreipa256kut58thzfej0oido85pyk1c1cghz8mams8c67csxufy6c7i9mixbrgxpe72xhawp238w70iypm6zeelr7gpg9qyb6180csp2n1bubzhfyizlq1ndrmyajaicd1v2mtviolt5k67a32dgou0gs5l1mdd1ge2pu3v93fp0jf9gl0ehnpzpyqd0e40ir2ry1wib1tyq1rquhfqjxvo0h3uh3o0zcsvqan4ka3s1wosr59j5zx5dr44dh0nyoy53uuqu2qbqm5uwoxgwxbz6d9wubnszzigk6uo9xa0x3j1ogx1b3a3y2top2qovusolls3ej5bpfnseokxkev0fjdmig30i8pezo88ss7b25f6k5a06b74u3lpwli28hjf136i1r9hnz4ndj7gxcd51v6rtek5aonjt7jo74aoeof6tphujpfhlvlzx6rqrw3767mu9j3l87bvqdyv6xji1m1w7yw179g4y9um7e3niijxvkeylo240l4om14k75jqwebaeh2h2bb0st0lmzhvgjypv',
                fileSchema: '5ot62tyfrf4wlrbxtbz2raxstiwx49d23b2zw6lzgh4ulv0a06p098uwk11iys3gjoew6kusmzba7vkbey93l24erg6islhja40z5a5kv1n1utgto6ka77e1ovl3ppczfg5q56wzy7u53b0luog2n2xnh8b49biewiugf6yxamgwyiny4hcsc0azdkjxdkr8dqicjeffgty6cv4jcuweos5tk4ycxacmiqdwchy40twp8hbsrnqufqy4wbfo3ysoqzyp8u8h8wdg9s953uix8bghxjohullzsfi3kg2duha2ksyxx9fpsix2z5ddki6pcnibholmhquiuxxpxitgjrk8pwedfhjkzhn3qyylf2br2jh5bx72lsd7jhlsp1vfdleobtwxto733accx1gjr5yk8imlytja3toczs3cvrvu5u4ima3rt0kgci40yo7ajbs52ljguuz9d1wtjtipohr0pk2q3qqoo8cyhr2burrn00x92fhpg7va9oe5fkonba6qbejsg0dhsy5ifdkhrpbea54uhgrzx2ifcb6qcnlotagrjvl4zjzfe5lr8so1lrvnd3jktioje09q3lvh5ijbpb9waqbkwtubf9mbxwvv20psgwu9erxcb751lbr4lreb7h5sp59tn70ayikd52sy5euz8x1ge3btp7mhzltowvc42c2ina5zdlu5fiq1tunjxs14zb8hbk8pdtzk7f4ap7a6p5636cw1e4zxcgtepre4sonlvjwpwt50ewayv6h8eikezhqrew1eizsh2cvjb84w07gd0y1k0wsi1wx83ez5cvr3mvh8jsg7elr29xa8bzuhxu3tuktfmv3xjp4mbr6n1994jetb79tegglkntsls5btfu461k35dasrdcz4vmfysy9ocf6g765si5zfcdz2roo5n1kpebljik3fxim8m0xbrul52nyv1gfof1d05inmtoppaaxwajmwagp82l2sp27vnrvj8yhfij1eze1a18392occ8p2yat28',
                proxyHost: '8eyjimewu0hbfxotcpcs2lh8ix64x2uyvaltthkrafvbj64w92u5jgem7i6i',
                proxyPort: 6232351931,
                destination: '2oiqsskaj5gza4a4kxqe5em36a4gc5cy5g4cti07jrhqp1ec1a66deik8oo4tyrg20t15iyqawjh5dzoayftnvsief9hqvglssq317ddj365hn6tzg09nyyiam0q703netpz3xh6xd20balu1za23copxehtaj6a',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1yyqvs9m0jc5lwz9xplgzafds7xcmll0kkchw5440g9i65o6fy4j12r5ri1jlhq0hw6c6qjaoj4xy6gh7u758r7r8zi18le61d65qqu3gybwt7k6j4ipkg6ew01n9nwtqphsrr241dv43v7b7twj3p2jcx22ifa1',
                responsibleUserAccountName: 'fkegkncq4gb95ns63ll8d',
                lastChangeUserAccount: 'sr2re791d10up5e3hldy',
                lastChangedAt: '2020-11-04 14:06:26',
                riInterfaceName: 'efkejpjh7d4s7ouiadsw81dencka3oiyfeuifin3ost60fwh4zecibooi2483yq0lokq9rr9gsml38bq9f8lgue3eea8rijlit8idqbpl5k27adlzq5z0pf5d4kmljutsa5lbkh16j6usj6yoeiwd0rhdrh3rs71',
                riInterfaceNamespace: 'wfvyinu2pagv628qzerlokvrp71xm41u7txts6foxutn9hvz64k1zum93esw8wjlua1vljcpq5dover4qqam33fuy0o9eh31dqggcmc9qx5aehngb915z6tjeuizseesd01pmj4qfaurpi337ur5by75h8gdqmqv',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'zyon9jvkd1f9sisz7p8l48o714bz38yl9xccaic3',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '93u4r234zlmbatdi9owzpw9wa8ozlrmq82j4inwuom8pb9vk5f',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '7m8v49xcgoo49y0ppaun',
                party: 'ps2zgufk17aavj2jd4jstc7xroj1l6hzobwq5qh3vi95vitgvn4x75qxr51331flufxhe3zi1kqy20cefkn5xlji8ysrvqn7ng2heny4r8d1utkvflaokny5bilyx7w8a4xd1u8ht9v8w38yohg8nzju47e4gdy9',
                component: 'zksl7iz9j0dcu3nq0xj2fjt0gadk10s1ea7km4705ls1crd8t7velrx5a8jutqzbhqyxqg2kp5c37e0ohhntxrzy5ojicdh112pixq2r1rjb0vtht76ysv2ygmr2daib32c5vsjdpprqf5mw3bohi3lcxyjdukck',
                name: 'y9ezo9at3tuzfouvfhgx2fhelly4x2418tq7s4ywh521rexogu9wklczco0falqzwxjmww4izzf34toutrlpfiue18z9p5lkjdv8w3f7qytehgsc6cc3tdn0w1m62dtr9kk8t1sy34e0hnctlgox53geak7mjm4v',
                flowHash: 'f367a9rokcfevf6ctqp3xcc4fezffzktijus80s9',
                flowParty: '9lt7efhwhf3mszh35k265pp73cluprixkfsszw3cg7klem845w9itv3h0ntlwdebknact2uy8bkyh255jgqw27tusihjtpjg3a089s3de30adur7cv091ezwsx739bpvfuysyjua5v3di87ro24elbtg3itox6rb',
                flowReceiverParty: 'wfye0xer2d6a6ozbe1436xdvdlx3oth1965b8utml8zf6ow9mru4e7vm1mv482ar5ruotzfd4vxrl4hz6smudp5sixn5r2d1wmxjrzm0bob20535k8zw0u0r8co4s4049yf8m9auwzwymxmx6o6731mfjq3gdphb',
                flowComponent: '5426pjzhlh6yf739kvkogmrj3meu9wu09s923rz2mf5mj4jjr3qbmbi98wgm5rp2lggopj16lchordur5t2uhuxsyhmtz2cuhptq34f1dhayp9yqiksxpdkw5wt2r0770drnozfhwkk2vc0wuds4022yj7rv27uo',
                flowReceiverComponent: 'az633548ijgu2szeq1a9gr1w75ufpuc4jv7sxxoxfu4ozr4vnx1e8mgo6ljrc215imhtxxq1jkgyc9dynqeabzjy2y99qt6gl04mmgvzor51smmuljg65nxeoz9bdrup1hf10dq25mmkwo2e3ih8tz976zylhr1m',
                flowInterfaceName: 's9txtqazz6y9zz66l9j7mqk6wugwgs6e3xhpmb8r22ul6wxwd2rbz8xx2zv2uilqv30wxo1t4g6p9ilr0193rexb6d1zqnl394d6bo8zsmkb5la6ife54bqof2s48nnomn98z9rd9gdab46ouercb6hkrbsrj9ct',
                flowInterfaceNamespace: 'a6jfp9ihl4xtktbykyzqjq59gxx66tyyccqiucncojsim3hogyzqod1hdbihkhc9thpfihw5rcff7y9yws58hc7koagopua0re5lq387hoe8crn7dniucb76k9jpb06n6ffz44l0imrpd5g1fxprir3d1gasyhw4',
                version: 'x2yjhl5nd5wwz5550773',
                adapterType: 'vjgw7ftdlwvl0kv0f3y05xo1y7d0ibmj88qscz3x50ro2doyrqusn8i8puqx',
                direction: 'SENDER',
                transportProtocol: 'pyx7b3av7hbya8o2efgwuk3fzxvw001ebwsmeey82y78s36kc97bdebva4cc',
                messageProtocol: 'agh5ffzj0fdmh5kjnmgl9c0a9iichuuq9tcvg7msuqnv276kh7y8ydfv0ghm',
                adapterEngineName: 'x8ivv5kl0mvx7v2hil9kyeko1nt5odnwa0yta50ios8wcg8afqetdin6d6x3e29uazowmuy2wkqz92jlsqyohs3woj33qdpggcifq8puvm1sttvaq3p94a0ffmks0lf0ab9n1bc1znwjpdqfku5ve7ipzhhgn9xj',
                url: '79qhw11lqoa5laleew5vqoh8fghhlvql1whyzcnv4h2rtp0du2r8c7ra2lk9cciq53aqky1sjeka2vqir7gg5dbhmf78kud22x5guwpwm7rshajx8ynfdb128fjqd1b06zbs9l2gxzmciipwni4afd5zcblf3vccaarsidhg6vfftrky7f8j99nz89pg3hgroyyq8imiu227b4to218uzn3638vxbgc0opa5ciyzms9fw59u1epttvsfzig18n5tef033ge859fnv6c1t115mj3orxa18qyl43gxrplr2yx25usjz2u8zoo8icnzednm',
                username: '14kj90bwsuvt7uc93e4rmrmftq09ms3t8aajaof6rw27gpwrvc7m7vf6e9xy',
                remoteHost: '0lo6zaw2ar1vywmf0al55kqhlfkf9c9sdypj3dljcqiupz1mc8vfh46yf88dbrrycp5ggpjy1hrnohjtwal3p72a89xu8me4f6nj4bkuqwixp5gqmg33175l6cafm10drh5c7mvqu6hllanmy4azf61587ah2l7v',
                remotePort: 3552165320,
                directory: 'vxe4hmxpdha737ob19h1iyr1ppx2y3uvhsi8i2prch3mwe8j80ongnj2ep3sj3vnhbnh4i9b8c2980u4lcdco09o8353ulzbpr32390jpwlx10jkyklvuz5miow8eey1x5wy97jd6wufepqaro2rtqju6pf0o2vmlhh0rlrfemesampqd8hxmi652tsz6pk86jt2nwb8k9mvsefl2th3ddhs0k4rj9zhcjxk7ufd20q5v2nfisdfnqbv61utl9e4fe5r0o5cs7uxkee6hxif2s97xykvt1rz1rxh6vxrway908ybs0e9ouqwgrfc4rckcjo4qouk5y9c0ktzld3fnuxeygea4bshzkkrcafv0aox2v3q2rm7akwf35h9frf48aa031it7l9m5h50l75rh59ga1mzd3cl7g5jlkt1sl9bf3oy01torlr2njwnuxjii47qz1pzjhok1hh08ia556u7ya1pv5tg9iorv4vixjbic1u1but54a3hc5rpmprgkf3lp4h5qhq5p4dh1929wrd06sf25eqg5vdoa5ykru28x70oakqwg0zc8piy3byvf53fpa967rqpiictv67vj6rkz35dymdovy0g5uk4c9uem9zkrkus8kopnd5ccvgncy5gtkwgd79arlurh76w0d0rhl4m8e7d3cn7lxpocqeqxkfyjcbhokechyxi6hux79s9erysltgtjjld10jl91jm00uz400kjhatw8mwtb0aefkraxgvju0ok6oft9zecyhdyvubceyxdym4a5dau71471gnobg9kikkpndamgwgaivc46mzume61wtdtfcdxntjt58x9i7hnixhit62whlucrqkeep4t7xtylq4r221gi719ol6xjstfqztixcjdudis4aat16ra4k5qiekcj5c95n58dqc4dgu0anmadpww62aonmj8as5ejz3ph3wtoz4o3xtsnb3oo2x2rdmaa8rr8lw1i1bfyixgkxrerq3ibaa0ys3jckrr0i6xfwf',
                fileSchema: 'qyg897o13wbk85xumgelwtmjpjapmwkgasbz3bk7wuao54n5rnrbxszopaiz592dy32w0ej7c1p73s3ban0ziwrnkcyf9z8r0010hpnf08ed1od0my2khd7amb9v31u8w879nckz74mvn3rgowk3f22o30on0kkrrxq3wpedastu6wkrpl557e2n00qkkkkjnrql4q5mmb7l6rhupzz5ehf5tiz03al011cimljhnnnoza4lt4ppw7i1tiwbkgws2vajh02wy74w7eotgniycg8fpxw9c3vb0gj1et33zub4l06jfyr9ojsvj7bl3lkew05skm60ff67yrh729bsqev48sxau6rql6bhgwn61pigmsbpndg7bxkryc9bdjg1ucfxfwll5dd8wb60x4zsysdsqmzwphmieizn6htvg8om95eqw6vbgd1zizatv2sm1g83qpspzhgmvsdqj4ipswvgnmhvb7369knivjh9900lihwz8sdv4cev9c6p80w9ufspdrjmclsl89xbztow9i51mjgw0yjn2041b6m4djv09j0wpxvkc5qvh2ttuma3gyv4bl34i1pptp7rfpc182z6kpkp5x5ab60gsml9som3slw0kwudlb86xjzj27t3391stjq79rhoelrx2wv5ltblrezltx7tw6o9ym0z0s3fdgovfivic8z9943y16icw00c4t4shrpzbbuvm59untkoieizxx5odlmsy1p6uajpzagt2i08kdup33103y8dmfyvx81tlk9m560vu2enbvj1kt58a574gcn64f64afbcmd7e2snihxp7pcckd15iejh7i6exxpd4vgtkxt2t4t4ei6d62n3tzmswdv4hz5jzoz8jswsgz3ug0gxrlflqerxpwqvz5u8xwhigvytqy6edb88jiq3m8kdbxkhjh7oro42jn6pgksiv651q8vu6j8p9vmrof0vz77sb8ukzhpm55eazzq32p2giqafohkf043i9te72z0i59ttxkxy4',
                proxyHost: '7c6xooomg73guegges8fucdpof7pv8k7pyef8xlbg33irw9g0oks94527t95',
                proxyPort: 2723887087,
                destination: 'v005792tsmjfp7gfuyrzld0mlytgugt163ma5r1ss3c0mmfao8iuyr2tezgwkh7gy4qcpfbpncjwa2fu7i01e70dwlvc44jjiazrls6glmzof8001oai0y2jrnhgsvt4i8dhgnkd0uqkjrw5v2123x613m7nrchu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5l2umatug26u8uigpa4te04n2w7go5if9jcsncx5eaj3d86dqmfykg4dihhfconaek0ftp2cqe78znvx96yho9qn35i9qdgoyv25w3s43q3i6tou50yr7yhh4fzbh1my3fxsx4hcfn04qf3ta5se517bqmall6k3',
                responsibleUserAccountName: 'owa7jc752i9xdodsr044',
                lastChangeUserAccount: 'rsbw7n4oc7mqhjhknhzoc',
                lastChangedAt: '2020-11-04 01:49:28',
                riInterfaceName: 'zzhqc2e00vslzz5mz8l842g8lf2qtby01zopg0i3wwkijgi44scrr272kqopwaqf7vqu6ddzkmdlb9tsclb7fhil0null7wzfsr7oxsxpdzq1s79uayw8axeysb35zasvypfsvo270p6d31zperx84ra181jelam',
                riInterfaceNamespace: 'bv5zv8bzqz16zvvdi88pqcwmmudqkozvw4xhqnf6nsa9w2nbsd2804vpzw08uei5tfkk8l53gnfmzsw5r2qrogv25q8w7gynwefwe1ugonp1zmzwo01r7nuakcgu5wd0yqy9q2esv5w4ruaza02so5p0z8eiinja',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'p9oy1it09mwqq0lkumd6t7rlzkvc3wn61ucdszrg',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'nd9u8l31qkrmebda949dr4qqhsldwu7bd0ob4gdmu5qd10oprs',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '9qqjca7696wtnzfrbrch',
                party: 'zm3ydde5gkk6uthpr926r139x3ro2rvt9mgio32g6e17r0y8d15ado7p9jy6jy4ol2ysjzv7u25z2ymklaq201nipni576njaj9fi1x0mcuh5b4okv6518mlzuj7g52cfqqet8lj80lkwgrr03mcfh0jpgq3ov95',
                component: 'vco3t1jxyrdz4etksv2qryagm3y7xh7yus3xjnnvm894kehvhifc8e1nt5kze6mg4tov9s07e9eeb135nw0emm9nfy0dtg93vhk6m5f38lf1cya2x2iwcmybk1o4xer1eztash2de9vxtg5ju322q2eujobniw2u',
                name: '3xhyimhp8ohahs62xhyquxxxlxc5x9pumo9uy3xu8c7zah05nqybu5lwe7u0szk7syazpbgoxg41b7338sn19z6llye501fciiu9yf03sibx4c03injuomdhat7wumg0877im4c2nj5yrwctl1m90ekt2jhem6wt',
                flowHash: 'e55zoaur0j8bzt7xqw46q7tau8z200lwnx910i55',
                flowParty: 'c0pc7ea3tsuyad4jtplv313dlz0sbxwk9do3owmc3x5n5mvunjz5n5jormm7zlj1q0o8eawj62agfi1zf5qi20y274zwxtmzposn0w5yiqh94lasevtirlzo4463muuprz2b7s8dr5120qki7n10u9gyioelj5gv',
                flowReceiverParty: 'si0rn975233r4gzve5g8h7qd6yyegrelylihmxynfqxwv9rmebeydega6lrj64xyq0mctvtbfidoackw6lo5swz0x7bbdmc34vett6cayuv1i63aqxdtfbd1ridnr4b7pihlw1lt5oi1nshjb8w9ppqyao76cr56',
                flowComponent: 'qxawk3wrws61u9ysz8z9c81iozah74w5jt7x6dsl4qxsfmynip2itses15c9oya4kjo47qred117nmywnhs2l9kcbl9bmp3b7b91bjgvkknoxlt8a5bpnmu8v3vwgnubghnkou3hvjsj4uo104p75dfdlqbg98sb',
                flowReceiverComponent: 'qcinc0qtfhcc3k6yyjv4flvti2pomxso7yhmsf92xyy3idqbg1ztwen08yvdagk8fd5mrcfluhsg986mqr04mbspziupb1lem3czf201vss6hxz5dt4mtwmz0ua8y1f0nif8p84dhcw9dv0xkgux7mh1j3w1elnc',
                flowInterfaceName: 'kdb6xlexrkdh9bn4982q78l47hsseeatw4j21c87rvq4lyd8xqkgwr4fcs9q7a1scwdpag9f6sa6sb0dvad6oop1olb0tfwkcsapg00k49liinqb1g8npcs67ds1eqs2sws9z5teod41dvub2s37gne5puecns8q',
                flowInterfaceNamespace: 'u17ll70ho3gpkrpppc6rr7jsb2h5mzcn8zd2t0ond4hytae8p8ywdvkl1qp2uf2xm5zorbbmfk6h2vg8p3bl5clezl7hfi63snrh49inbyshtd7pqzhpfqzhsygmfsxcawcricffaq0hhqwjn0jt3nkkcri6u596',
                version: '3kbuors1szwtujuvksav',
                adapterType: 'sz3uvv5y2z9hz078ao54a46qw8219py943jizuj608uzwsf2nebs6hf7uhkt',
                direction: 'RECEIVER',
                transportProtocol: 'chep71tq39ia2ysu53ybm0k8q55caa1hmg7e88gywf2mt4oryk67kcl18k98',
                messageProtocol: 'bw4t9eqr7fm2r5ffvl0z5158zz603aeyop8aeamqxukvo1ahtocofsxg6rpz',
                adapterEngineName: 'ej4t71i3vdflispiqwy5cr4dtzoxgozrsbb18wyo54x9g5n8uzz69l87yq7b84kgpi8c2xqg30eoe16l8bxgy7ng4und1qig3f21db1x3ekro7pust95srsayadwrn7erdw5sf7irsd84lfofuda3n6o6jnvmdai',
                url: 'doc8vvdyueb6oe7w5aa4pd34kn0ucrtir09cwflwzx0y53i3f45dhd6cha0ovm22y55iwzzadlwopt14qe2yr8opv8llgggzc75ptlxd8smob6c4axjop12r49yd6scl8tetkti2n46zkvsz1j1z8p26c1e2bhns4jjxarllsaduelf9cxsvl9gsxif8t8ada0v2e061s0lm3svof4tkq2pj1c2jxarydf2ybve41xcs9z5noc4phoq7fv1yn7tjhs83bdhz3r9a3g1oyqei3f96aqm00p45vj376td6cztuxci27n9fvm3882zw89mn',
                username: 'bg5wmbj63zsdoeknxgon9jfxv4uqddm4dz3a5fvwz3xkqnopotpwvkasl78n',
                remoteHost: 'jbjq8r9k3uyeav0f30t41ks171zualytngd2qkm34a1huh0yt3rqoytcprabsadowvpe7acv5hc3o6n4s1hac1j5h8cqfqdyruz5mgy1wdopfohgt61ql134afat0q0p56qxvpaxpp6wg3mlxtrjb0do72rp6g0u',
                remotePort: 6633346673,
                directory: 'b7p5co8ogeisc8p7quh1ej009g4vgultt3r3ijgki1kuv5ybhj9g3wmeacpwo207xv244la2kntmusn6tkjh6anuio2fsg5epkfrf09af828hp1i6iph0ubabfojvy1urczbgndwbkwgzxkq9kgv4cuexpd1uerwdmysn31dm2xfkwrx41tvdtihg0f6z8l24h54ykeigf8qxl8zc61yncv4ms2994mn3kcbfbgsayv06dexpn71pbx258dzxk0xrvt2csegbubwi10kh834ut8i96777w1ee6p1191sa6bxjl3jg803k623ibvpzl440s52swi25hsr33d76dbfg3jnzvlmcvwmhcr39agsvv09ttg8wpjzw7n4yd3yvmwdd9lfpg4mcpphqdubhg1tlqwjm31ir9oc1fgun9hjlpjk4yas7jinjrivpuzpjarhogo7tq72wwlkjsutetdqnfyszizwht37frapstz0af84wgd9uht6tv27s7kwcsxlucmfy0jih65n5zgmnl180b7d0ymr4i8pclkd50oo2jq8yhbv5goxhrtdn0gglm2tdzu6t5zhrvb48flfnr8hq2ys17amrnoohif8altucji3ocnedl2ksymq23wger3ms7xn5iudpiivhwhaopvxonuyefec82fko4n37l166otd2td2tv2zjkbv75trbinskt10qrvm1w9zmihgzpz52p7hfpv1ouhkp09edzxqkujjpssgjmd5ssutlrir1r40qex1psjr0302kr6lxm7g8t4qe99z3pry2gp4tzy1yqyqvaag9lnsev4dc30s4imwucsvrcxv3ziax5wu4bbbizpm05hqazpvwbo106ippn0cni3ehkfobvbtte0jv452im7g0q8hhnfunpcs30yxhm206mvncqwmexhwejr75hoetaf05bsfgt1su7w1cjc66edaqvpcbbghlk9sx9u7ljiqoxlzubmyqn8ltcbx214utbxmww68kz8l4uvj180k',
                fileSchema: 'kqa4r4ypez62xs9yl0zxt9h2f86ktaa2h5iditr6x36zzecncap26hzpba7klc9spvghyyt00cul8jamzuf294ra6lmxdg0g7opf5q19mpwvd5qxvg0wu62kjpycqhpmnuis4zvaus03h7u7zucqwygu52xmzlg0m0hk7g319hhsmmo104d8wqvn53pcihz4qjl8k2eujd7tkl19zlhm4vjskovx4qbfc7w84k0bwb0grmddgyfz3pv884mxixtz607ulfm6b836se7yp1maimuczmcvl4mn2brydhntbmfn4mkcqhzx3axvyjnqjlh50j366th592bkavim2msp00ax50as99u1un2ncdjiq6grkhakvg1r2v7e612lgqwzdmpjwivel0s21d92akqar94ypayqmp49j9kfihjdjsx6k2zvvhwtjn2rihk3jiw0svvx2h6mtnm3g5m9g4gwf3mz0qlnvvznzqda9w34805lgtzyewwg378dw9v6g30z1sw1bf3ovbu4zv2ahl3uor3ti324tlm1dd915k48stdvnq4o5e6813wpvahdhctqt3n2k6uyrxlixw7q5hii82ank3zy89kud8c8ddmjonz68y8t9fm9fmpywz4qkyonvmvbk6yed7f1laa65isb9k31xuz03elsfhk0jsog41y4tqt0l5qugr01kkhwiep4ltva01k7dbpq32tlfhq9xlh0e0sqvj2lruqdjtmwoq74o9t1eayen8bkt0c91p3jhuks9t9qu11u17rmcaw8a7x6v2ng23uj7awtbtics16qnbw6q5ayjlrswrt5gk4m0jr1feeswludzes4j8qht29nxensmx1os5gxwvebikpysqm9dnjcwhyiobadc60kuj0dhms1fzne96lnyysfv1xh4aasomq1729v033v63nsfpc15jx60iixl8gi98ov74loketcq59e2oyilrnlwe7idz2mlhzeu97sj3jowycnrefdm0al6zrbv7tdfr2c',
                proxyHost: 'zhh9481aywksy96bk5fk1iln3th6olzy3pam26pa41md330knebfwjao5818',
                proxyPort: 7332525873,
                destination: 'iimnefgdjtkjgn9n2cidk50j07oyohwgbcqeumqqxa5jehl05mvd6eo4y5ozml71x8l9hhlgqmgns79ppxz00of92oxmqfw2738sj9i8df1y8vh0ou5qk7y1579gdb4nvw7vq78xbd1af01ijix8ux036on59052',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8r6wlxynh4v5g6u78oxskzs4r5xwvia4nbie5te5a0kirbzuxx3fhu24rop3068035i8ahzdz7ap640lfce3sn1t5q74ki7vyitk97f6x2p26rbztv49bf24igyygvhzjd66ez6hqzyv0ervfal6lmioh59w9pl2',
                responsibleUserAccountName: 'roqufonkatpmau93fas9',
                lastChangeUserAccount: 'qukn2ulwmkfbtzuqfkow',
                lastChangedAt: '2020-11-04 14:09:13',
                riInterfaceName: '1wv8617jumo56es3mogx2l8spgerxyhdo6gn338x49t782s2cignj44qpomi5agyipfnauya0qzicjytj282f0oe9alu1nc5a53hugqezax4nf90wfums913sfygxg7dt5yl0bl6nyxbl5jixlybghkeutiouqwrs',
                riInterfaceNamespace: 'hly0685puih79bkifnrqkzvs77qtqxlxxsgdiu4g2qcj4oplvz4t4fmqaofuz0ay34xmbfki2w1mjhxrn7pbd1i52upj6oe88k6kgtcwirl69dsh9xxgl0hsbxi9er56s48mmhgjwii9sbchf3i1ai8twg9r73f1',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'b8d09ufvx380l34aptpea267k4j6a6o02prszch4',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'ypu2o99sz2l99vlp3aeqx1brx6yqs0dn2q9sm4fuvm5zghfycw',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '0jnd0xn5qh25rg0u1jue',
                party: 'ltuu0k5j4hg5xg4snrd7ygk302kdhsu296izg9w7mo9z5teg8kwt1vx5d6145xrxb1fwtru76djgsop1zg2pktwjdq05d2cy7mwnkqk7ynxwl2lq456scee2vuwf9m7kd2vvhl0y64l9i7uo75kjis8lt9ntzstn',
                component: 'esbivp60n5iwlq270l16ptl4lvi6wohafxtjr6ecfirb6s2veiok5us9pfglqa4f4qoetvjrw2hzw08pzo5tp36glpvmgayuig9lw9emz3golq9wd9xu8bbeoj2qftjrzlpkqtxqc1yo4z454rpoewt5hunl6r6z',
                name: '0zx9pt5tyht80pghqj7j4ou20t70r11rodxtnfy5qxgeo9a81a0n3lf2dfw8dzfmsi68mr66rpchswxxana208ligvi5w140i8brkwhi6mqcnk2nkqu0cocs8a5sn8whky2waxusa5elybc07ec1g2qcnk3mr15u',
                flowHash: '4e4q8j5biyblwrbyrjhelyuthwbxybryk63xwe5s',
                flowParty: '7rju1j7a92t90if4ukdkxc863dxfi346i8csl6ne748hf0m2inv1asrdddvenp4tftgwmvo56kjoyojc9ls1d7uj1wjcoqm1r3eygffg9tne893vi2k7oeat8n8aekr3gsr1dyt4i7btxyu3luo73d361bau0r80',
                flowReceiverParty: 'qbvz2mq824q8f8j1ozr3vr7ta6dyvaj6yms3ikyyze1912vg5gf99cuhq6qs5dcqdzpqkv2lgdb447n9s15nqo7wwu0wwsp2ulkx3ain1w96x0yuyy3t0kv3kpll9diorh2j9qqezn9ww9ml77ysgcr8hklxv9ig',
                flowComponent: 'kw0n5648aggtuovvkjwvj2p6lyven91182audl1px1m8paz85ijz7m41rz3x7e1zij7n6kl67qvbzj1uzg2wqjwj7u4wqcslwsv57mwif4p7j93rhe3pbi74wx2ia8036gogg5kcuqv6cby4e0i7pyr1j3gzqleg',
                flowReceiverComponent: 'zyjkrrh4hhu3mrefby5llznunlzf3thvibieg2vmshfhtq3q80g579z3qzx7w7y431ooxo2xqhsd1b977isz2rcpng6pq0e8hdjzwomzcz9kx0banf5ejroapat20r6449e5mqrpglu6odp6hapf12ts338lg0jc',
                flowInterfaceName: 'hedbdouqw6yuczemvngchhko4vvxgy2odq2w7cw0p9wnzywqztjv03azxskrgbaziercslhb3x80xl8vnrbur8ctqlkea73mu8gxa582tenkhikz7qunkevq45zb7lo6hdql91cu8ooxch3sz60do92fszgnv6ft',
                flowInterfaceNamespace: 'a6xy3mzgv920akjigxnhhessd4gvl87935fg0udrydmquu70vwnru7mcsf786ft43orh12ytcz09epv2q75mtrj46yc9rl8gighywmesivricdlwiriw1jm3qxots0725090ekbasfkb35tbt8efuqtwyqoh3hd2',
                version: '20k4hi3sc2aefgwiwsvh',
                adapterType: 'aahujifji762pn9hpzj3q69heah0gn2quxsuzhpal09bp7asn0n8hiwix8fd',
                direction: 'RECEIVER',
                transportProtocol: 'c2kcmahqnn6tutmv517vkh3qi1z89bfnkodtctoh52m0skfz6vo5szbe72t1',
                messageProtocol: 'i5mmxkhcgwv79swyn9isr60cyquvn8yh8sv8gxgwlhzjs9ngxkxwsg6f46ip',
                adapterEngineName: 'rcge1gf9w84tjp08pbndr9y358m03krnz055bd8lbz6tfhu5lbzl9v6s1j26cnj253o5gitln622wbzdo76vqt6yde9lalw6wzd6pqn73c5kdplpshrqo110c7wnuaf04il1s2uaurcbs4u83kt4z58qv7gvnisi',
                url: '4m8j3ynl4qbx2lnyp9rcvx6rt5y1fnzhy9yuvwj949sc7xmx4gtjxci42dwo53sm7gi7matt938uf3vqlflk2x250zql9hg3fni4km98r5eyappi6wofwz63ccl2rzo32ssusl6odwmwiz3n1ngy4o3pyxus4wziimjm5udw442tgm8etchno2pdztxecm5fsmm0hvlzkoif4wn8055e6ygqb2lgy2v3pm948r2pik5rebma6rff8q1p3yirjfhq4npg6jnh2qb76j3lgg2m72rz70utflhby9sic5lrp5jv7rlbbmv7blp77gl9ab27',
                username: 'j55xe1reeyrs5k886wm5m6zqczob4bwocugjfynpzxr8fsj4ktjmyg8nvrw8',
                remoteHost: '63x7cnp9ww1vbv4vh3nwm4wr9613wjp9mpymp5gy9qqtkpndkxd5bha6s8f512s6el3hoyung2lfptxdxkp6nczyhkvpi6bu5hmlss5qtq2xub4kibg2g8mqjdn4nftuq3bsxcvlw5o33q26waqn9dfmigftkb56',
                remotePort: 2988165047,
                directory: '92sjgycxp84kmzpdvsbi4gns47f3552fy7tye82ajoy3kpwszcyuqibh41hg0ididrpmjv8772ubo1u8wihnikkk6fbqfrrrl8b93pz65s5017fg6pzaldrk9hkicusesaauhwhqxm36z04q083d6q7dpzbmzrdonml099z9tsmhu8h1dquamelpdb6bzc8d42zmxm34hs7w5tpl25wkpdnez75a11nu7dvwq1x357vh7l0apd0rneakt8ul69kfhpy651lbu2678t5ftdpxvc9apl0pzpo1ylmide7o0e2sqn7v8p6hz5bpopw7s0z7cjp78kna2b3tgdz5ikv3zjcc3o7ls7kol6ymauscdyzgdrs2njkv08g8kx0s2vf23b77e15lb338p96e3xt2e7btut0wm6uogy9lphbocoodh1pvtkh66zbrgbptkpus5nwx17ql7glqhmh7fq92o0zd9v529tn76bkmmh1r504r5plvcd763tpfoutkh656hewc89yfx0mn7a9au5v606wycryc353v95teg348aaij2css9n019rxkac5x9ei2zes7ygvpgksnstwdg32a1dj9gb8fcl23zks0ziu5gwjm7ntnytar5okh9wzh9i5oinsjnfsh8t0ofv8dt8pbi5lxrh7ho31sn8atv5qsdhazk1pn20khqz8eqolbzz6r8zjx95ukg6ae724furfifgm87l9ouqkbrtz58uvsc66l1acjo6ilr6qq5v26wlnvsyci08wjec2w20ar5v75l0y3o3wa8dspv1v1gtb60smmkc5rbcnm1cktgfnoqoicgk7j62fhsr6phla8ufcef3kyhvel3dz0qv0ii3tjrmikgesdbm33qe8ku3m4y2ez7bo5knmfllsjtb8t4pqt5qvdxuk6kx1tugsi08bfbboa19opl0uerqgqimdk5t01n7rh8jzd27mfudt7e23kck1yamwu8d2p5hp2kdkrwbmycydoib82bfvfzgayed39',
                fileSchema: 'alsvif7do2todfolxe610s37zzp48cm4ybtphyt3j4r80x45fomrgcbyxhkopmj5apzn86m9zyavzvw8f4q3m0ndxtxk38j2prbnvolw1ahmlfbg50gm3vmdqqbevp6srny5ho7ibt1fdr6zk496576ww2hf1zbe7my3ok7h9rvz0eq4a5duqxyiw7hz0khbcadil2oir7a7t3dlp64ey8zpr2waawprmy1tnm1mzs56q1og036ea82xztloptvbnienb6jzzvkr6egxy49z3wty4qx0w6zjwewoaurp9y96crgk37s4ru061or5hkk5etagldobu1f2dipqv5keqok6rtd839933xcc2pjdh90y1fnynhvzkv7tpl7te0wf16w1clsf8hu03h15yt424uq1hofd277n5cg81diq0tlgwvjxfhn0gvo195p1exnih6gpa6sp42oxpxrb3hc1tv4l0s56yf9kh896msygtfh5o9eisp35qkff5ihvmxm08ogmmjxra7r5zzm0id1lpivqnvk9ux2bu5dauh78416xtbfv568cpiyn8zm5hcq6182utlc2ok0ogp11yq8xwzh8x37ti03tr4wt8qz05iygz2fpy7unav6ob76hiamw3x45sz0c87irugfdolh7tr8hhge024insuofbioqgpafpgnflew4amznhwl51kbcu5txc16kizux85tehdknwb6w2ns80nad9i230yut79pzradsr9qfzrv87gaqf8g3giw4kmx8v4hrn027bhi043xiynrx9pa0z923nw3hgqqoo661fczp2t4iddoide559jmznyklroeet4bj702l0qxktaduqzkejhtys0ca976nmykcl6lxyn0wqfjmbnkn6tl7dv3d4oq8uk0btpgipih3iym5log15uh3o7w0t8z5p691it2d5a6xzt56cihijf68f3aa8nef6ft5b26hw8ukj3bh5w9pxdhdax0qddozi2pf37l30tefskoont4f',
                proxyHost: 'tm2bami77b1u2ngvbw3i9bq0wf95m4v4x6f1pb88rydawk558nnsw9w8571a',
                proxyPort: 2381856469,
                destination: 'pb586uue6tmppluw2sky18o63x1x3u773hoqyn0ef344xzpcb824p3he7p9g74vem0nb78kated9yc1l8gtjyvsz2ru4x09dh1d2j783u5dklx67y6xz92y81jecgw2cxx3ftninze0hyg2elmqe0x585t6gnefk',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qrenumxaoaw74spglgjaj6sary18xjae639j5mp00buwymtp54tmh8xrgcal1hgkc5fcj8foerejau3h1jzz3e004n7qnv8ma9bev7cqu06kkbhwhm7wuh0qj74ykbywetkm91t9tk9372ppwtwcn7ki8jqvmg04',
                responsibleUserAccountName: 'ubioosh3jdmv2961fcfl',
                lastChangeUserAccount: '7fb8v33t90h7ozpcnxd1',
                lastChangedAt: '2020-11-04 17:39:39',
                riInterfaceName: '1tas30l7kn63ygws0tcfv6679puydqmq3pm5cfzyzus6moaulvvgptruljatvyg89hmavwc0hlkxtfkjdxe5v3p80vdttn53zggexqxhaxvfb0mis7rdbmvvorg3z3a1sgcvcf7y75styoizoxmfm4i58jurtwh1',
                riInterfaceNamespace: 'wy42bmvqtmqknytywsqhyctuavxzpdvh7q33w8eqsltnyeohvhdhn78zeltkj9qly9qsw7wd0vg1bhgt4dbjd3ogi03t8713d30oqgx1gglkuuk3qcfg72eahsgqsd6d7eud93c0hytf8jh040rlpg1qe8jcpau1s',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '3c8uitsj5siog4k4vs7fzfyt5aqxxwn3ckwupahn',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '7lk3njd2wceiisy7plrukbhqwt06gfy3s4qk6zndpoz5q3g0bx',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'p3vip6wg61g93ss2neml',
                party: 'c7pvupgcc356xcpjompnzp2etuqe5daped4n6z2d934u13c2erkdomdm1bsxv76ef1bs7zysjuoskgo1n5nw6cvtxgam3m5gkzkqxf5te3qy5iqn74kgr6tu8svalbx4wh1jy784iol46xaut8fdpzmt0djub9h8',
                component: 'l2xy84l3w3pefnjb962c5jkly7ho0efcj5qmjg1vs4c43cx7g7kxyyn4tlu04rj7qlysrlakm7yv7vlmtchcgdb4cmb1ij28rv0sn1fhm5mqgzyz5t8mbe8i6wdi64qmx68tax4reldaxs4wpg5yfz5stnqxugey',
                name: 'yix1nz1fxcv5cni6hd3d11zni64miio7utpj3uejls97kij9fzbek4vq7hq0jikzwcn63rdw01a4k2dht9eoyv4ocbxjo0vgiu401kokdgmto8avuppnrotld9yghxvjrkg2dga96uhxa30bjfw87nk2jqlqad5r',
                flowHash: '48qo82j0je239tykmcrc3j0teq141j6afagcr5sy',
                flowParty: 'c5gmyvn7d6t4h2xnobdobi6jm82omt1f6jq4glvmdfubzcimh911q3qsadwn6xvnf2yk6sfl8schfoq9fx66q18zs2guw5bb8b18ns6jig65uh0du09596u3law9f167r04tigcjmrvclf4wxzeqmha3h24ebpcl',
                flowReceiverParty: '298jdo8r0m6s1ttsz0b0mmw53n09ksz5z96jk6vnnmgoraynh2e4d3ajxo7h4fvigspvlhkvdtnzlhi1zctowq29za5xwh926nxxc8h994f54o1mqh8ovvrn4yjgk8ab244x2urxugo5kx3d24b9t4m9n2wh7plw',
                flowComponent: 'u47wfq8nmwci6jy538bxsdc9bgodc2w72cpz4mohkxj6gjzfro3gonxl44wr7i18pp1v1yee73ex4ifthjf1kl0k9kowa43niqmg4d0mv6l0xhclboepuirfg5mpc2ep0zeot2dxff94e4w0y1okrh34ohg80d9d',
                flowReceiverComponent: 'dx3fx44opffmusfdp5a8ed02xiwqpphll48ycllf43scy1tk0e9tzgdzgtdrdjm3ye8s5xq94ow7dwfc9d9b88s7xkxur7ob0rn0s5omk598d00aol1adbnh7va6epdi9tawx4iqz7apijjepn88vcbf9564sbka',
                flowInterfaceName: '12914m1fpvd9638nocotv9gqprqmikkcc5wl1dsps3so2wl2jhf68i1yzjky1rb5gy5oka688args0z40jekxkh15k1uvgy6q6lsp4ykh9u1lmlljpjeilmdi1a1x85ihcjxz5197zr06908982dopvtee36ggpl',
                flowInterfaceNamespace: 'kvuel62cjkhay07pwr057yf64qp6vqh4etzx5yiqiux49g3gr13nzzx8d23pubz5we00s3mssqxy27bk2ncp6b9cma4yejg6jklatx5sevc7584dhyst0jidukku1e6iwqh3ojj286mkwf77slp1ty9ikpnudkhz',
                version: '0ppfw7iriywrlsy99qjj',
                adapterType: 'wm7kik7lgsvyzp3ax83txnriuvivpa9eu47uci0iwgvja8ljawd4q57r4dy0',
                direction: 'RECEIVER',
                transportProtocol: 'fzp95tbpyk6ut6jjg200rcf6ibrhk3lre1bay6m9254zzwgdbviy19vjtrad',
                messageProtocol: 'hd8bznxb0jqubm569u4g9vebp43kl0z2brqt2yidx2ud5tckoj9aa11pxq5p',
                adapterEngineName: 'tj8trmxf2g2grqa0evb7q6oqpaxtt05t6qyj7zyz2klpmvj4zzfg27tt65w8ld04kan5ti57m1dz2r6jqfe2g17gp6tazy6jljjvgks4v3cipaole4tegtt7ou7jdlqvsifeoinkmrer2mzvffqz9mcahcpmojjr',
                url: 'gww4w5opgq5ar4lwyu0u8cula9ys8t56ac6vx99jhdflelnd9j7birufvdry8oojew7rt0oepfp8mp630kja990r8oz7nhzjcu8t426vzdfvhr5rdxfedbxayagkt49dndmg5oxsy4h4twccrd6askrcajkxcra9yfrdaqn03zgwuxo3ulvq7dds59mhmmp5oaodzn6mf5rzw7maz9aedqt1ek4qlmplhy63vdqbl5kdfdrvb3va0z24b41jb5cqna4nzaz7o7dgbf39vyygvwiwbm663tgdqozleoawjjz7uh1vf4uo0biqd74p207o',
                username: 'rkmj0l6l5la54u500u2iv8idffbn1zmvpo2k53ohulslglnyzdxi9wicgnkk',
                remoteHost: 'bjrkf9wlsxp7lyaarktmlbooi7oauf8wrg7dt4p0sxfc4vvya4ya6347d31ojzqwpab8nb18mlgk2czxxv9j2ilyv380zittoa6tuogs3bv5qc25merrsfexp5czdmzxnd6vict79z1gk0596uwfxjjoavh3sqdj',
                remotePort: -9,
                directory: '4xfwh45ky15xgtg71t28q209hoy22sxks8gl97ji8pavrhsu0j5bnpmxjuau1fzrkw9dlu447pqapjqou2lbbhnozoe19jaj616871ufqyipvc4sr3u2ya5zd0fbi6e1204a7gloj8xqdk2epjy1olzoe4lcvanvckdbwl8pez0te4v8fzx6y3w0knrehcblcd1q3baavvtgfvl84s6oyzm73ydczwdmbkcfcnp0ds6ju7r2ehsf7o5rzyda207h69z4nhep8aeg6wzo1x7ud8dqf536czw4tai7qj9nabn24ygtr2dqkimes15tsg0uohzgb7tqc6zjb0llt6bwinrbddka6oumxzsq5g7tr7x0vavggihta7g4pmsteiwwuv252rae7kta2s1pjel5qjmf10fshia1btxhcwptju38naogahpm8e8pwa4akkj4ffayps1xdxgs0naze5akzho6wmdda2sq5qn65wwm8plpq6kms5dhy2kwn0bt3whkija0yq8t0xqhv912mtfpq3yh5g890ypy2fj3tkj39e1yqsy690ki7zt7mogov8phg1yag2bp9o1vhc9pr58yyj3av2ho5q9mv6319yd8g3547h0trv1bip8e3ibtvqdnrnni2t3cmm3bnzm3e0hl1nv51oqikdk020yajimmq2g7b3kcfgxgb8pmn6ibdiknhtbdffvsyupyrthcgyqgge30t7xwv2zuhwzfykd39mabp7xsfm2zg3lnxmqz3co80gkakmksdu4oqa5gyq4me6d8qyuk0amt3vxe89z8wixlubzsi9wfwgha4b0d6ljham5gfgc870bam9vn607dpb5v68154dr3edi9723a4jdetx1dx7a9riw7mkythdoi4isrzow3vl3ejn3dnh4qoq620wdwq4wvn0wjpnado2v7qod4u0ivc7cvzkn05ix0ui8wao3r7cyhj4dorb55oppsgf1y4elld7ky5qxk5d5w63wx26xujmgc5yd04vby',
                fileSchema: 'xzfti40uqscll3s2n6e3jyr361fh6gwbz8qtsjux2098azh8cmeewgtary79rt5odenfmb877edjkflx7r4gqn2bjyk2tlpivcqc7c7a3em68h4getj0qvoksmf7dii1872ygfe6wxcxydifc4axluabujlcd8f4svczhhetr9x7htfw8zq1khrpk1wpvzvw2zpztycp2jecfiv7umbk2ipj72bpxur6chcxu6389v53dcqwymjhz8a1yml9enr3e1wuovpeisisx2scwol329mbrrzby55sytarcgiufuvt3djvd1isvqpp0eey8uh90l232xxyrybbv8w0dmbtskr61jxb8j0nwwecvxymh5ljbvf52hlpsk5czhf3802w9os8ksmtj4zn7avr2abo3cju5keqi6k1w15sv5ndatnt4m5vaba8vydierhyfg83qik2j92s2tx3p9g6d8sz8dkm9z6g2i647jnbuopiv4so4svuiq8j1fe6tcpa78at1z1gwpmnlcymvvlbn2d94ybir5kgddevdlm478weaof1uwxbbky01hh9maekenelyej161f99pgazdtone8svdyhsrjm0c2rnove7lcnlbmk2kbu4mivtp73jfhrr07djyprugpzn95wdf0fyjerxo8g8ywiaevhylejhcukks8ipue465bval43hkn2lcxkv42xtumipzbmtrf75do6ox6yxt36w3n2n8u0fak4xgmlnlvgu2invkf7kavum922x7fx0z4mvi6a2f06loim97opy0tq8qhzt3hdriqxjdc7d2w6epg1xy9h0veq5dtqvnaztuqn6fx2m23pvqqt61gm1p0ltz1dykywe6uxh81ympw3um0ky8abl22d4cr3qnlwlllmtdu1dk35lsp2in7wdn952bulowavyrp27078b4x0mnig2va5ptct9jo6r23yu6da5xguf41tzsjrhzl4i5nzz9c8h1u2k8i6l44ukuo0778j55gjdfnvyu1p',
                proxyHost: 'w5m97aeuevb0lxd092kzl6rty19shg4dtv9xgv0cgt2sxn5l7xeev58ihv85',
                proxyPort: 8585205174,
                destination: 'w7utuxqiog19zib46ycvt0zzmawg6r24ioabsr199tpg4r71xjxqzfa19mvy628kuhwyjzcukrvkl9676zzlwsa9zooctatywhi470i76z95pbrn0lmc7j9tqbgw1rk8rc3hdjhkuawz3fxc6xpm6j95w4v36ece',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'p1gedrlzgsyapoah951avoycy378lq976ab7q7v6hzcos1jqhsj24ylsc59y6w8t1p7qpo2vr48ny5qn3phlq2tkxk68uiz1ptzpkta2ambr8w0a168qzbndzsymxijbqcmnxd2giff93tl92lyhaagm8k45y2ik',
                responsibleUserAccountName: 'jvc0skxlwzhjyy4or9bq',
                lastChangeUserAccount: '6fgezmnw3xc8ii5l1ou2',
                lastChangedAt: '2020-11-04 07:36:23',
                riInterfaceName: 'quuvctxelavoompcpic1eup04i3ptllrs33gb7atrnmwapr6s9td9k3kkjy95s9hpxouf676j9jqylat1ex8hu8yqgwfuz06oepc7ijf0lomksprhsp10vko9nfio1pnq08ghm65c9i0pckk0qw5245o3jhb3pfr',
                riInterfaceNamespace: 'xv5d3i59uzi210kr16szz6gwqtrpjjrxwrhglx2u1tdbvp7u6eorpopxqn58m8cvyuw1y0a7k0s72exp5mjr3ms4ecr2thvl1ravlgnw2wzm2ia67edr3t1d1vhm9uxhemln758wliq0occ0r169irmoaty10aw3',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'rlhudt1xyvjpd4wnpo08w6d05zchp65tkotib50q',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 't1nqcf3w781tzkr7bw4icpk1xhdfijhtwyqau2x86lidry5b9u',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '21bdd2596gnpvz96zbg7',
                party: '60sdq5r4voebl1m00omxxzomu7r2lchic9r3id9t9mfmawasn05u2n59g2zd2e5ge5aes7o8tdwzcobn0ry3hlaa0rtyk7p5gx6bb8s8roq4m6gp4jnii4vl6wkfr5vqueeyjvw1l8w4bihxec6r281vfg0pla6s',
                component: 'lieuz5ctfrcnis0zwpd5ff9valzjgoc1dx2q4s2q8dxyg0now1aq2jdxfdurri0ao82uyrzgyrx4giuhssbeyvl88wv168e44q6xhqnewfdpg87pyamsw1jbr2o7qm2n4t6znav5f2z89zaubh9i6byr1cei2gm2',
                name: 'fnh3upn5hzaj8r2vsf4ushjofu9sjlutpeqswlkm80aq05ufdsoon8c5vzch9gt5x952ad8y2rb5jcqnp5oug0ss4eumyissg6qvsfxtnhvoq0kt4xjj5wo8x70rngs5b7ximfae1licz30k5fuwlqtxc7x21qa6',
                flowHash: 'ppn1n7gltypj4icejt4ilmwh7cqrb0d5ts0mjnlm',
                flowParty: '2v60xj3azyf6nexur11kso3ddsht5livyqxpf6h4cktjcwfle31ojdthx14m6i15mfs05ye348jmefu30m53az9wysmkd4uaah1zhae7aiztw22rn8zxzcgggw83tn8m5tsot72spn8s7auab0rvrfkbwt1sjaem',
                flowReceiverParty: '5x19k8cqnjz6qxvyoueymxl0mm20s03gljmtmedhwysdv7l3iech8d1pf2gvsvhdrjcnx3h5dkxt3rhkv9hy0i41nkzf1hjkznm6f2b2ruw25k0zhh2lhj3mmr2ku4ohem9fsm76e85mhl08gocdhwsmv80p00jm',
                flowComponent: '3289wpro4t74s0tyvbiqq8q19pm4nwt6ildt21to5hwq16ixywbmvdtyux8xihuiwwydl4pdh26zlhpai5lcom955l35uf5iaj4rt1i6l052nz7o5ybmwfg3owbeo96pg7haapu9hu5hq7jbynno49hutq2avs6l',
                flowReceiverComponent: 'orf22fo1tkuejrjvsqxou2oj8ah7x156m1268cbn0rwpdn413uxlm0n33cum9821xgx9bpkrgfmjc5etwjzpmo9u4jrbr4gm66gbbyznf4hhhdqdey13vuw5bwgdk2m55v1v38imh43b2wf7ncd8r0b9ydv5yj7q',
                flowInterfaceName: 'iznn8ic8n0bvtcb6z6vrx2xur5oy7dx5ba6v69uwlnohtfd0frkuvrsak9qb6dj7w3tgbxwqclx0vcsmjtc2d8zq0gbjruegbxldzguojc6fykje23h5a29kpilsr0pxqsuhsu37pwc5kond7int0f428bp91k8o',
                flowInterfaceNamespace: '0ohnw3cyvpexan1jx3fjuz56dm4p4nlggfjxz9t1xdf4dpmy85r8ojyd1fdcukcu33i7m3rc5enlkgq9po14l74o3k2ivj14ya5ot5bj1c2uw3nm7b8yzqcrsxybza6689twv7npm29luf9ni6dbxc18dh5z6ysi',
                version: 'e6nzqq2jt4nxuglbgd60',
                adapterType: 'e98d6z2ae9mi99yovisaqvkjq4ah8mc4fs66wsertzhs5tskwma0v4zh4a5e',
                direction: 'SENDER',
                transportProtocol: 'h9x37j3qiwggvdt0kfsh4bpp2bw9tm6qe7jfiis5jc14a65qxsvn9x83useo',
                messageProtocol: 'aiy242i1lb5cm2o03wcnd8vh90lrgsgaes3eaowk7c05ix7i370vqxvd50fb',
                adapterEngineName: '1q486a6dr7581mtgf7qs8yby5mouzk7eognx7y4okvrp156r96s5eyle3svl8mxjfid59d03cewuz4tmh0m52al42fveyvdslj46ddjs26fawrvphka5mo3rlhxsatjk8lrerp1x2phy94f7722bcxui151av0k0',
                url: 'v4v9210zzt1uszjyfnwjm6uid61h87ir4w8u05zsezaakaizms32ctf9kt6l1uk1xiu2s7261edz9d0975je409l9kvt3ch2b6c3sna88s57jyfzvtmz7c62363byblncbe5hiy3sjpokt9ld28cf75ep3pxai5ziclfqkwi85eu6tzc4w1ob34ru35piepbq96sy8tgk5k847p8vtmyupam58xhmgw4b6s01kqyjud2rv6x39ymw7sexmzl0u14icj7x0pevgra7ni9osilr6kt7ptp34qtyzr0u1dmq7ogr1cdyylbgnj0gc9s0rqf',
                username: '5tto7e0r2su5w09mhl0rg3dfsoj3j64g3qwfqepa4lqk0c3it7h0pz8or2j2',
                remoteHost: 'h3jx6b1yqslcty8g3yusgod06u4dq7sm6uei0llq2o8lmlzrfkdabktsi3o7v1vad0j5ck68xntoukxnp15pan8dosjgad4jwqkgxk2vw3goqfblmsdbaicl2dzm6041ky82tlv27o68j39a1h81u3egal9pd8zj',
                remotePort: 8551244424,
                directory: '3k34jsqtnlidifdxwc0bjjiqbotbmqr8px91le10pwf98aman44092ajy9ltp4y039hep2x9upczmeacdavvii8z9qqab2c2pv4004alltsn37wz9fwhrt283bk7yydnqhjvzojjuk2643k8lig5yzdpwerbdrsypqkqvc9zs1tshsj9e7taf8mgwpk25jka47b1gr3vd9c55m5pdayy9p483sunt35ica04p7h9qg4u7h68yxo50zas1wnq6kb4vhvft7kniu04mvnaskwpc2pb06pvgyrbb1je2b3aiel5pjadif2qmknkssiah1fce88j4g9s6ubpbt9gxjfbwamx4g48jkrto46zu43ifq388u07f336lqg496kdbqx476nc423doswos9zpel975gysyrsuep8dtgfpq3rdubj73vdu3az7dznqd9dmbko3rzg2okn2vv84nafbw4bcb5qscdbvntckd3b2k803zfzj3mo3hz1kga6l4fyse2sdou5kuj2g53d7xj6mhd9p9ea7ppgxe5jaxaj4dp7nqtiicq7uyj135ev24kzgm0e84hatvx2t3eokjhthhplstsh9bnk6akj3pf3z3qabo240kj26jiq62s4r1zjuknux69iov0kdex8w3x4du7hy6vrrx3kp2uj2oy18m90m6rtyrnkdxsx9dpzxx6rej3hy0v6tp5b80dh9ussqn7pr7hbdcbvwhffk4kttw0qrz4olz8lrd688a3scpoea888srljqgk3russstitikf20h7uubli7hvh7prxzjf9ipsnc5nvfg0pq326tx7bvc15tsblk59lrix6ln0b3ch5bot60wb0ifv4dq0vdqbwanxomay1505xy2gwl5kxwkvogd9xfsb684xno6ndycqjwlmm395boo6kknus1yse74vxlk77zq1q8fnkd4ipim7lai633g7xdnca1jzr9t8foviyk13y7lw71ckho6qjjzdy2ws5k2hr2nw3nzopjnxac',
                fileSchema: 'v8lj6lut0r9x2ka2whoi5m95loeu3xtsw3g0juazxrkj0d4c1ppkyhc2c9i29yghjiw4uml4n5y9v9xjj0re1r3es0iz7haajny2ly57xpfo9fdazbfpdpv0kuxyivpkwr0g4gz3f5o1eccyjtucpjd8fmk3s6ispunmn6fqykrmohdinovr1xj8ez9utfjrb600zzce71i3ppjcwcydcejc02dfi5mjco2l43k7o86sbi3k8k10s9qlqte4d8d6vshguqh4e3e7ef6eduk2xnb2qwip365j7qtxtg0hnz5sir8wcm3rre67li7855mjkfqdmlab4mv2eis4naeeg93ly9np9cyi5gf00qy0l8c13ht41jihh0dzia5y06q4bejqf0zh3aeysl7bm77n1bny600ie7dy86hdxlihnmpzkv2a2ujhp6efpsb9fh7x850jfiyx0xlkx2exn58l7r7qt2aprbhn88mzuv39odis63xmrw5tvujd4w0sljuuna4gc0ozbp8c14dwv5dvpc0fmt5b5y5un6dlzfxdswui8k7ewx7tunw4mzrxvm0xdo0t5qbhuhll1f575pvzsbsam5gzaxwmxoty7vxn2v2avcrwsr0j92g94ba0dd6731rzkef0n4e0v3oxxcs2cpi89ek68hm4mmv711ep10m09oj9iw5dljke5aqhoaco0xef0mz6u6rm8xk6f7grf3wedgzxmgm0rg9y1qq9l03mwx1pt1k2gthputxyjc1ebdq0evfaaajdrcz6qoaa6494ctnrx9afkynw7vf0ala7a7gwwwns8rvhxo6arlzvkjuumnb6dj41ujhz5enu40xr2wurq1dybn383pcnbx5ccr0rqkr7z5d5pouiurhimj0zut7q2xz4srhgdnher1b1qyqst2xqfn39wcvywny63r00qi6cf06trww4eagk9vwwug39u5av34nixz7wrdq965ah5smylhrdi4tj8sfjg3s7jzsl5dj3z6gx3sza',
                proxyHost: 'l8fgf68q9o2w8dyb5zv6v9o8otejo97pkbkvjiemkc8dvwf4wyv256b7gl18',
                proxyPort: -9,
                destination: 'lza7bwrzej09yhch10cjbg4wdmf75dsah6l4zspk219521wvo8pnp8sze60dp21ye4b1ka58h5depn8vvsllme3jzhd8wt91mezd96mirl2ld474emzh9uyyyxx5lcwwn8hfecy4yf7k1jsr4btgerlkar6s5286',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'y5lj7b1qtu6qcty9usftjthnzkw3sezc6x6ge8md0aeyd4o5mwen4bs6jxrm5nl9q4yi3yqlud8759rhed6zz9ozscdl9tljpmch4ghzyos5ngh4hzly459fyw0dmkcayefm0of94v0kzgtkr0rmw6z55p53x5o5',
                responsibleUserAccountName: '2uqo786gpq4idsam3qjf',
                lastChangeUserAccount: 'offr1zh7idsyqv22v3z8',
                lastChangedAt: '2020-11-04 05:39:19',
                riInterfaceName: '17f6gb3qz3uipmk91l0oc1dt89a6qm1ygi857sf8m2ri7br3cp7fzoxy9rwo30izlvrrxq5xmeu3bsr0sn8a48547xio4we5tcw5pmq2arw68qlfvzvmwvk9ayb63k0126tvaqeskeygb8z71s7s1no1keke7xw3',
                riInterfaceNamespace: '04r4crg87x1ev2kif67jkz8deaz4zl8b28rrmg2ig0dk8ouuhn5avifvtb3g20908oy2vlhg20uh37k3g1o3mg98t05ydc44t21pm0n8gl21bynfzl3wdq0wz6rs07jlb4df1zwpium1acffcer7zjxekmomhlmi',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'y22qxjsebw6zdzqq3b0y0kmfj87vtlb65x0tz76w',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'tafhv69jqsdp9v5ed5ikqz2sll4wg6ihgf1zv29u9y6ff4n6cw',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '10qlyusgh0u9i89z7hrn',
                party: 'a5z3m4mom8nf9dcxpiw6xrff2hoeok5a76lfghlk0cbmsaphl8c0qy8r0buiyq8vka4josp6v2l4kybkvve2j2lznttkyc0kyvbgcgdd9ux0bhktp18x5zdz4yv7oz8nyswazvz727h5z6eda3w4dyiv274k2qqi',
                component: 'jtcy6q5d7qnd6n26ss9edd469edhpx0n4ynakyvl7iev9pnqjj4n2mzgu2so6l5xs9x23x1x7za7vp991l44m8yqumxtthxlxfogti0c4klfq3ony3enunseguvu9578j5s5ti1cttgm7hjihls6gm4ail4mh0ak',
                name: 'p11eo167ldhm7ljl0vdc3xxhc588ybiq1h8lmqc55eggmc4tl7fhegz2iem0ewqm4qdxrm94k3sau83mcl5fabj3fdqnbdg10yqi1tlig2q0q4skq55cabjb1pnqusvaa7pjxylufy8dwmyjs783erhoy2cz7l87',
                flowHash: '9cxa5s27xdyw87k43s9rrnofxbz8lp4jbq7wsog9',
                flowParty: 'x76zhwvapj8szzik5akxd4zm0v7v2slchon42rge4gfvx9s5hxmy7g1ktfpabhd2lgo5npv0o8ix3rewyy6skjw89k39ziz8ckdz91jq7lo97mylkc3mi01h21v0l41ck7wrdzyjplnmmu4ynh2andmscuhe4one',
                flowReceiverParty: '52fjxy4b8oj7q84cvg5pjsadvdvijp8yjvx2rc5z8usyf5yrhb3iuck0gtt0rgd3k56acfru49e1n9juhcqjepac1f085q001tj7h7xaguqya1k0fepd5z4csxxmvhm9190otl40cclzxb8gkqx6vf5da1wpkmpg',
                flowComponent: 'i0jt647gx0q3ezwkqgbbshk69fzd5pc7xa12ild5q4i501si5a0nv313bytnwer8p0487cpovpnjwhuk1airy29ntfps41o4cftwvy4ii1u67oiebdp58hx5ddovcwlg5kvaeaqtnzmultoxeyjhr5asv3v81dc4',
                flowReceiverComponent: 'pqzv5o14d2o0s4f6vi8fxbsp9l90xyn3y1b6kcthk1wpxw6r4ndgfxbvcaiufrqlt22bbbyjvq22ig6v9mx84wdo2afjtejptfbqzk22gbuu9hqlvz3h44dwqrdpraf0mnlcnty7gt8t98h0gv1723qdfm5jrbgp',
                flowInterfaceName: '5cl9k5mkl5j6d4eatyajos7c98wfb3u6zzar3y7nzkzhfv0r8xtwnbtinub9t5mn87ghlykj13abo8za0ehogtxf2xznljeun518pb35pjr8xt2mvjgg8w6biazv010rj14uj14rjupxmh9m0b7w7i21k9w8abu2',
                flowInterfaceNamespace: '4ut8g86suesmnobin147zo0hlhy07n8ai21cuz2600xshxg70ipuwicpp9xy72ohc0z7964kmg5geityv0js71rbm4whdjlxcpeqp5dzjr5dyevsopmbftob4yfnkuuscsi6otkkum9k4b57ssgfu0qtiuduoqid',
                version: 'g7v6mgiedu58i36b2acw',
                adapterType: 'b4y08ff1bvv3nydba2bwavchcvfgdsyamxnxgrggbmwb7iu2n0olamt6avwu',
                direction: 'XXXX',
                transportProtocol: 'lapv4g3rc5fkjb19e221grbi071zat4zjoouicp1a8ccu8m9uzsj27k2rrcb',
                messageProtocol: '2oeuy9vh1pxoxvt64sdy3o8z440f68qidoe2kjp2db5g95pm47uk2r7r5ipe',
                adapterEngineName: '8yc0kod62z9wwz8fwa0ph9sxt2jldxgteio44c10h3rf92ghcktzb1qodlj56teh7a52j9k8hlyujc1y4hdjzqjhcp86qll7rtbo6yvkwaxtfmcwugnddh4vkc5krfl0fu62ieg5fkke8v385ty368fl1mm1z0k2',
                url: 'dtw7mk5g7sdw4o4mknnimc1x7zar55lr8b2x4e9gibo74y2ztajxx5dsf620oz9ly7ac97cxcfobsd5a4to43h5fu3cv9y7ulpjyiychbo3uma17oxk9jxczk0igxgmpk7z5kzb9gzdmg3m732v02qm4irpf32827ttv99yppe8ehnbm4l2fgwlvewdsqufqkbwrj2jajq4bi4kxbatrzapsu42twour39rmet8qfel0herqvxpqtvgt58hixn8ztn8jsl0qesl2o4m0qvhs1li5tkxinc6mjoo0jssfqyxr5m3fqi06n0d0glpuc50y',
                username: 'jrrz2u1xutg7ced1zhdqxo29h3kctn0nxx1uy1juvx31384dvk33ks5glzhn',
                remoteHost: 'ldkt1xue1w5n1g9qxu17ec77ba9mpn70llj6e7j9rylloobvkpjhh7ot86mz2p719us3iuw7kpsa450bxfgt8ap0z052hqwpy52csv0yybq5s5o3tfi2hwje44nefjlv566ii36jh18xrhuwxxm2ks5ll5n6fsk3',
                remotePort: 7812749609,
                directory: '5n01hmzgx9pyy4hveymg67shyd2wfywq74iuwczi8knzqojkcqnxwpbrfa9xsqd2myoz7mcbd7ng8y3whvf5vo6wmyhjv5dnfobxqa5btm3jubhaniy1t8e22j8a8cyzrxykw0td5311oxin7gpae0fb77t09q01jk9j7klyoxg0l59erb448zbo7yk2v3yhci61o70jzx7s4wvoah5v6989z3bknzv7gkqraz1mhe22d4ne5p8pd0htkcs10y1t4g3tfqux47d12b5gd8yul6b24b3b7wzifd8uzzi21uvnwssdnqiwxppsfscszb71szpn5tlb5zh0ncbmgwpxghps1gpg4gv30lcr15nspfei8vsrsycc91fa447a3f695ykyx35enj4819hbczw4kml6vabgnqaxhs58854z6nvgay4ybl81vdgjqdnou0iyz8la2w5jfvnaxgz5i3js4gnchat86iramhjgljqgkjxgjcam20rl3i0y0mf94unaccb9u58gylbecvhrc3ztte7tg0k5759zrneabfrvwuu2jn44v8tk7ptyo1599h6gzn2tdatr3t1mt0zmqbqphkj23wztpp4qsg15lnjrlumxsgdu1m7ilmpyztq93l8xq4slzlb3hms21kpx02by6q582wfti5yj3c6cc7g99buaxm8dn3t1yoqpt4h2i0mgriit1gc9d9yn3tcso4kh441o2x7zr9wkkclduj46ef81valydqgbt4witw92zubam99i5bgxpd158etjqfauxqp9hexjwywl5kzz1z43bbzws2o9u3cfmw6u6qm8snoyt29eue8cljofwrixmlwntqehax85ns332r36k4rk2gdgakwymzacvtgq447ynnd7skegew1yv8kzgr6v0k39fxfrwzv252nwhmqbe6ckri0i2nft8e9djnqbtkpw7frudnn022z7oesfwu0ewz9z2pd677jq9oigybqp6ff95qe9ihxnas61laysnq4981t5',
                fileSchema: 'fluchh9his8ddqdz4mbqu58ndnsrf9vh8wpw9rkfwildp8vfjheac9qauasdzt86li1qvp3lrhtssje4fu47p211kjxkeaiegzdqddvkalv2dhfvcxoxb5rcl6ow7rknppkcr6enhe42v4ox8roujzf4v3jptjh8vtox4jxs7ty5byjzs46vvu4kw0rnewasklj1aniyf2rgjcohyw9cupxjzqbj8oken1jt0kxftoxj41ic6z5t8hg1cv8394xxfmrou4xifewmb6c750ykm49dc4zlas870431n0wxn93jtog5702bndhhvlveb1oqfatuciazr6cfhurlv1e4d0rd1r7hxh2h90kao8ubbi2zbeor77op753ugi086ukzhxixxtmdb1t5j7qi5ebcitn05kgj0gkfj0u7exjs5jhbgnl9jx10ef2y58pmggb0lm4u0k9osoxxktteilx8vl9filncaesxeay6btft3c1ecrw6zol9vtl7gojp3vc0iy1sfc4ia0evsak9r46qiqvma5hg5ynmiv4gdt08jbve4rfcstxsulxhgf3yogoscdwg6zn782pvyy8c02lgbzwpsz52hg0p9f8rhc4922s5i5vrou6ksl26w5pojec3rybznuzt38rgigo2f3vob69x4s7bm4rfo76xz7y2v269crc6cnvjjewcw060mqa6mih9qcw84nm1c1vqvqyveipj6a7ve9bohmunqh6chtupet8p7xld1ijb6ed4283dqbq36mjd4u0udx03wfmumyuk7d0bglyttj3xx46b5i06tg1rx9d6ga3hwgbn0agcqtm71l13jjb1mzfglubekhn5d9dqscoxqsh93gdnm83zbrkrs1cf6mqa72bkl7y9t300garpagou3hz0wyhnat4g62evk2h11qims5iz6ibzxnf150kp2dt2zppd38ksgg7dc7mfkbe4xb0veuj8mptkrq82owvekk464jjx13nyat359xnogjrw9dg5qvic',
                proxyHost: 'w7hb7uig1mnbzc7zy4409i2lvjpzas3iy72r2zlq3u4e05veoc2ooogendqj',
                proxyPort: 1513972693,
                destination: 'hrk0kv5xtoc5mm68ea4hjnlkb1cpmtvnlkfh1486oot8miym7c16j352bnnl8rkhlkre71q9inp5m1osc16r0yr0qe26xejpg14rpv7hrhgihdmr9jnqjs6hrvr1m7zya5pqifqvnckp62jxo1xff2eufctgbj5w',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'rgqv11ry04y30tgv1bfyn0i1z3rd5j57mx5u0bez6cldktyqoy6impjdvtqxafk122zpdouyqqkigbc5inw4pfp8benaaeyn50f3n3xfn852diwaggc2ybgugwc3b2fh172xqd1oupyw97oow6mutpq3swgvpmia',
                responsibleUserAccountName: 'l2p13ftjr5xm6bg3e3jn',
                lastChangeUserAccount: '92nb3dhvr9yt17khqmdf',
                lastChangedAt: '2020-11-04 01:29:50',
                riInterfaceName: 'rykx7mf4s66supk9kggxtzx894tk9mr524lqsw0trg3ok49lht85w1u774un39j84ezes3uuqsjxkzqjevy5idao06v7ax39h0uqnb5md5zurbm8r49uw5edud0g7m7ad6ou8uoljrm2tzgg7ojigg1d2mjxmjab',
                riInterfaceNamespace: 'nr8nz0n7t8ctg1ygmb5pfk8kxj6hutond1xbo3bs4ggvz1psjcsd960azgws6y7vgzmprqo1pujiqh7cfs3ai5eco8ir8wxwo8611ayt7lxtgkr2j2x9x2cglvsbwd0n1ycrg6rycw2o4lvvl31l53fwxvk6a93k',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '3a95z4wdmy8094idvip4ea4vhtzmkoppvt9us1ea',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '7gsgxz5ilzp1i1pqfz32t3vdpach5w9d2cnnr4lles87eby1ry',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'e98yvu00auz6fycix0ug',
                party: 'v1t8uk5xj6b7rrfxf4xf6umb1jz0dem7tvk76byvtf5qmgf71of5a7ttyecpfnbvzu65gx6f82e5ma5bb0yr4uh46bimzp2qkd04cp6upv3xyowparpt6sb0xax5im4qb0yxwo04fuj5kffyz01qa2j8xkwyiyie',
                component: 'xcdmkvrnr9szkoj1wf54t4pxjd0dxxrnnz7b8zfym43ia7znug5q1bt07iq7o7e99zitzdww9p6zlejbw43kcjf123ldq9lplp57jm2linzfrsaxf0hinmnr81qzoiekqimhpbgca33jjhwux07u19fxv9c79e03',
                name: 't64qm30dxbniq2ko7occ9873l4n1whafnsyp886pzrb08hm0yq6zdrjlzmoo20v0bve8llh5ld52nmzmzsflxje88yo7i0betkxxpnaim4g6sxjzj42h4elgzeh38egrb0s89kh347al5osun36yamvt10x8iy3b',
                flowHash: '6eo1nkbd2x5yjgr1kaosnrjja5v6pdzu9xeqw2si',
                flowParty: 'ufmqy3vjwzq8rujwf5wvhdkm7135cj34xxj3ggzo25zrx5waf4v4ixu3pgrd06v601u2vud21f01oaqxzad9m9rdqmbaer9gksuormzhdnu04x3p8i9asfkt5clo2b6rg1772vqlx9q0t4sjtdonm2vmfhqhasro',
                flowReceiverParty: '6wfjsrbnye12hz4f2va5yvw5j6k7oexj07bs2stq92n4zj982e1mwxdvj8rlrd9dkvps1t2fg6xaox3gkz1vcjh23gwswhy5wu2neadz7phqmgn8exqqvp6ng37j9w8txhbbqlee86xguekeaq3aplhl2bm2c1jx',
                flowComponent: '0kg9668j78c1aurkwq7lt5qyafclr4deg1du3ejq5uj8pseaamu6a79u4w8wozseffnlsn33t0t4s9lxvz9qr4woebqh93xwtu3us9bb2u5pz4dd0qfhfrudw38nf89qeuxf3ltxo81szpd142qcxp7149s8dvmk',
                flowReceiverComponent: 'u66hdywar2rqhctpateyxa713pvtp2fksyk3p3kffspdpyv3ibywuixzudgdyrett7fxe48m7ytfft77x5q1l2e8v0e40iwnthl4bzpnfk35j7d1e7m5xhqik5xqnvcb2hjsi0t50ouk633lsp3fe7u8fumn6kfk',
                flowInterfaceName: '5wupwfjfivrc4n29julzfj0e6rkyjgfo6kpdxf20mjp0b37nczcp2jcjyvq6fpjbf2m2wqs2jc6r7k67gt51vh6yxnu6g7d8hq7oih5ev1kauu1g4gwr7xuf8u07exjn1slbokg7hlkrbevsserhxlmeskb0a1m4',
                flowInterfaceNamespace: 'dyljrs7kzojgtcbxetqbjduggtg24gzjwdiozmy7lsxmkdss64gg9nfdkk5gahzsdh1tovehxunjggpzy1etf6aimytk0xwa64xxhb1p1pjk6e7drh3x7ufelydbj3kxtzh6mspl88qmk9hazvvdwib4418wtzu4',
                version: 'ppvxb5oobzu72mpoo1hv',
                adapterType: 'vskvxjhgix21ix38uto5zlhuj7wfdgqi21ggg87tnlmp8mx9oiyiaxkqvton',
                direction: 'RECEIVER',
                transportProtocol: '9fgr2ohbnxq9x8w9tqd3rmwylnsz9xulp4hnmy8fmdcmfm3kj4fsj866xczy',
                messageProtocol: 'gdk0aeq1tnyikteksh3y66viqsu4bv4m5kettaa5g4p0h6pgt5xmha7uzplf',
                adapterEngineName: 'xl0ra0iwrtnnyob5l1n5yt0rk1nzphqtxodnz4vfx6p6ntglw9pqw3o60op80ye0ifcvd3r5oo2qgfswkbqu6pq9r8vogzyhxbon1tbofm1r7vvx5p5qyqoy9apywk428uwvh1f20l7vrzla8n8vlx60rfikyf39',
                url: 'yfp7g8ody028vs3ubg1lspd9hu8mdhffd7bjy4dn813qxn5whs1dllr686aofy1rh3ib8dp8tp487h348f3vxs7ftdrer48uthrzlf1ucn6nspyob9v0wdq6x8mnp0v3d6wmpd7ojwc8j5zk9e23p1568cjovxngjtocx7ucj0mkhjmcmzrpeb5mtv6551tcqo75898vl4uxnds9b3e43wo0mqlcmpie46clb8fqp2m0zyfzsxy9mxdl4z3o848qocdocy7hew3gzqqmxqewd2s2dho7lcmaj4cp2qgkcbhqdj7w0l9unzqpxf2am2ij',
                username: 'ic1vyfv6khu4jyr7n2xc8ditmpvc0bhvo97pngaa3sz8az6m23muppi4mg79',
                remoteHost: '4fn4h9v492u3luunx4quovott288o4zltl1b0k8gt9h2kzxzrh9lvgg0dhgoxbqvfweb19k8tzk0xn702xwsasg9v24z2k6zel56oxgo0ogv7ema8goy71m5rduwkhejc1tsv5pc6cmv1cgrba4irf55dyd9azsj',
                remotePort: 4000877574,
                directory: '756tq8px3ih8ezoc9m6a2xr2122e8b2kubwpru2xi0x634jq0vhoamdfigj4drpgyvhqggmsr1qc7g6p8rz4gf5g8phvs8vchistcinipyti3kd4logdh9vr8odtyi4k9dw2ywurhv6d9diom6cxo0x0qsqe29l3749ukksnenidr80yuola050u94a5al9emu5i90gmkj5olivvoqr5c5p2k2b0njgao980kj56sch29dwjh6roenbddkiqxj3irskpn10tv0v4rblnqiblegmjdmc0zagu0owv6bfhhpyopqle0ja7kl3frem08yygjj0id13uew433b60fbt67h7rvgltsur7r2xrmubndlys60ua1w52n7ei1aliqc7fd3el7uz0doiwir9sficu90g8dj6dhr5pmmumk2zg6ogm5et3bux3kvves6dajmjm19qlvoot1whvcom46r78a81b3vyhr4ibcik7ecz90sc4cf2yv8e5mu8nvflj8gekz1mh2sflgef0nxcwg4en3b0mqxsop378s8ev535kli2fm1nxzsqza9sibf26vjmmbtt6qb43bbwr9kq2sihoh4swag3otpkr6vpmj18jgef7ycwpmkyh4zxtvl1ynmzj2wzucuhzqdtczg5iz3sqmqetd86vy2xkk2t7oeruc9uhvimyiwdkptkb63sj1rbrtn5isjbws7wkfrci3c1yhvz2vk5m2jkdc4e7elaph9ezsqtvc0ptgsgirzj7tj87ltvyjeh5yedg5wzto0wklo1a73cdjactl25kr4gtjfjoypiqgp1yp7s4rf3use9recuh8jhiqfz6k157e8brmv4pl0lalr4515x7ubytwsxlvj2vq96lg74on4nn6zbmdubw3qlzqtwkdxb2bg3wefp78eiir1j2n4u0e7163p9ihc4j1aflfi6ry53tv4tbjjhf0tlqshg6hxm5ymddpyju5hgemdf2xoyieakst1oew3z868nhu4cznzqirpqy',
                fileSchema: 'e1q3euxmqnsgd4xiq6xsx4vx8ekn6imzc038gf4qn70bqh6ylchgd6v0c9px3zty217f4f9n28cok994f5otk8ue8afu4zqi3kolpuw0lbplfks7g62bxo2ckwfy5udgtsxkw2kn2p7znf95areywkpra4asswxt72whpuqnfogu7lylljf88cb5thvop0ivct65n7cbmt2g6f699l683akobv92avly0t05astbh97nvt5myjt5ca8tj9c1qofel63kjt3ltwrdleoh14v9g13dy2l9894lphnux9y1xl2ne4m6c8usbshysw4wx4ajvsrwnzah4gx51hrjciqsqn0h4pb8782gaop0kfav8t4kesr4wfruegvl44ulw5usa20o3za9dzd7jh6ead57nv611baj2proaeweo0fudvps0s9k3y0h2sl57pltd1lv28vgxqlq2g13yn5vkx5l9glz7ydviimo0r5zkyzkk2zemdwg0iikgrp816oyc9ezkh67py8dp1kqopx7sxbe9g53ovrknw8ffhskhb9cgr3h4x3ekevcx0gph6iz8nsiwyb9pd7r3oc6tve974j8cd71ckk65ltttpdujsx2iwkyhmsqyulwkpo37yw7b3nmcyr7tkyhs8ihpw5oqzg5bh44p6iac0fypq469t99cn6e9jkeac3r37w77go90s8te5ip6lt15lahab2nom8vehhbpsuaoo4715m3rj9ec9cg08whtbljnrcomxafjgkbqvjoadcb4kpqidcggcwosj3h3tcumazn781mo4x7jfkwr59ocs6d6ofjjjk0kynsbosjd4rezrglystqyjjpslb5bh7hyyo9xt7lcltwddjisr3hc7qiqckc2pcwsnqoeiyxahgv9r1asau528mhtuqc7m8hjmncpiymi4zdp6vqmcgo89jk2diz2e321l921e8b52hv8le340mji6qgmvl3gtl3erqu8h0neqkl8bitfrepp1d40c651x4liz00',
                proxyHost: '7192m9qahrm3htszyiw5zolq4ukxngvzmlkm59gz9n45zvr1l0daoi5cu24d',
                proxyPort: 4697514362,
                destination: 'rxlvwyqhid6x37a7apa8lg4ee2rptgap1qckqmpupx3zy29adjly69lhc1xywlgsxdkk4yhz51t0210gqu1o6sj7pug6qpjmjq0gt9nyun050brcz1nyx4ock32tibtm2b2ic5f6l7gxt3mf36it9vjq6d175i4i',
                adapterStatus: 'XXXX',
                softwareComponentName: 'm4l8itihjr9a3k2o8yejqdbrfxihn3r4l8n641vdmiey2fhp5q6cxiwpbxftqpuo9okm0xj9uu7cevtbdveq9mul17mmtj1icozyuy72xf7o9k7bgfsezjzc8yb41skuc81iylnknbqe278f1ozcr79fs3bbezng',
                responsibleUserAccountName: 'wtllvgdb6vnvjhecsn4a',
                lastChangeUserAccount: 'iy1v9qcf0zhoiijyb8bu',
                lastChangedAt: '2020-11-04 01:02:36',
                riInterfaceName: '4r8bo6awlc3eb00cfks913te7626kchtw6o58scdaw0frg1w41dkj3n9o1ly1x2qle1xcpd86lhe2thtie2raii42m5vhla3pwgq0wk6vlv2o4ow3v953kcxmq1dtd95jase1jh4y9j3nb1rq03hx1i6lzedym0d',
                riInterfaceNamespace: 'xblkntlx6c3a10lyzwwj6fan2rct99k97w2ikrwzqlewee70p1y8f108ql7igupomif14fcbl57ostqshfqrecx2a1vq1g4uhde3zkznzp7jci22kts6ac0gthornpenrkz2sb8ed3z65m2j6my3vowbaakhl84e',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '6yk6khrbwv8vl1f0qxd5h7qaeyyr9wipqy85bxfc',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '3qk2dgwspjkylboucxiyfdgyask0xm8pnefj43nlyx8apr5svw',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: '2rjg7gf5c4hc5o025fo0',
                party: '1jzx6qia4bb7okwaysmti2sa5smpzs5fvoet85c0h5g12n0fa9celcti0lugl50lgir3j2ipj3qeruhwuir0jmjltthn6sd68r39tbgr4u1rk9o74g9srhep54n0etya4f01iykcsigqorv2lpc0gg618r36eewh',
                component: '50n1brvx8ib1ipi8e5s0bjub9d7k2ew86k0bbsbt9kpahl61ime1ajmj8eb2qatm79flt9f0vgockan8b1cvhgy04b31pewcmmjgvnu5zlpzc8ajzjq85apmwtuskjkz6jrczltg5xt6011c452vki8wm2mx3549',
                name: '0onagx6ghvcyvioh75wfe0wynmmauxvx37e1ybk7utl0qsf7neiafv5jynkhzm7cgxnykrwj7gdvh8fcqttne0lbah23hi34pl3u4u0ks0wolzoso9hxsb5bxbsbvzbuq745drfw7ldd6tt8i77oby5mndyxbcdr',
                flowHash: 'pb9msrgvbdtmgrgkg3is4put7n3g6bnaprte5m20',
                flowParty: '3qqkif1qs5ho5qaux2y7db0hoscrbd177ccnsuoh1tmayx27heydxjvsppwven37mk5e9jm9s186zogni66gbbt9bcufrnvwpwfeh0hyvdnyr7nhej82jqv3twxbzs72kzt6k9rkdn501f2usp8k0qwudagmgh1b',
                flowReceiverParty: 'zcgg5ms70a5wq79k4hidnnqlukxe68hov59c41hisgwz2tl9z2k8u7ti3aqnuptdh2tmas5d48miv6vbho0p6kjxvqsqf8vs3k33qbdjqwf3dk7hokhepvmkngzkt8tfmsxd9j264r6azop3lkglr4rxt6wvql6d',
                flowComponent: 'yamy3m622vfbzoawvav75yt11xoih8womwgta2d2m8h6az2n6grwttvtoci8xdz0lhgqg06sd7hq7jsbsdxruei81785irkhhyf1rorom5zbf3p14g5hq00doepisi4fkeaqx6uuaqf1ixr2zy8mkjn02c270d3r',
                flowReceiverComponent: 'm1cz2ua8sbvpwzic2a88r8zi1o8kd7nppcw26s8sm01wf29lt9xq42pitevzmwtmuwlqq2yfrm0ckg5mrjbix04d7m5xc7ec5i59sf7hdtb24bcvz8w4v12hgnolmu4zzgtarabtub5m70yvyhc7mqus8w4xxgd3',
                flowInterfaceName: 'ijydofaz4h8s0wznicmw6awc0z2tmc2trv35o9v9ucslsw22bexrdu82oadf1cppdob0ooddkj3reitkoy1waj1r4zc4u1aj6ldvcs4lu59ci4bkjh6xm6jn2to7b8mub4wu5fyftw2hs92axszbukgx0ubpheb3',
                flowInterfaceNamespace: 'j5tte0g6aw5yug9d67lszbap2ym5qq89nwgpdplt3qnzj6aovdjlotdlln5wk4k7mj5wbaiui1q7j5zf854mxqdfngjno8xbapg8oc479kt0pgpva0issdcqhq16egujll27ryt8qbgw13jrsugu0gawwwd6y7sq',
                version: 'qeui4vp8md0r55j30h1b',
                adapterType: '3tuitqi41mk4n43mublpmivkk32nx6iu1g5terzo4th85qnhya4juggog3rl',
                direction: 'RECEIVER',
                transportProtocol: 'pthc8mk6417xcxjo4wxqnsftxr0mnzbc9v1liql8bwjg8gwoz7qkz7k521gj',
                messageProtocol: 'c27ji4a20o4qo1akcbxwyk2nsa0nc1s1msiv5dsl7tna2l16o92aih8tc35p',
                adapterEngineName: '5g7kp2l42eo8lv34yumglyqv8e6hlpmr2yzikr6cektfw0bobo2s6zz5dwxq6699d538rzj5s6nkd77a1y83zfv66lw25vj6d41s9gsljwjpmsrdcjbut5c6pw7cmoh2azmeo03c0bbt9mmbmtn5sxvvw1rngys2',
                url: 'iq60aa3b4vh59vcxs4sbo40olin9t7h2bf2p546vs0jjyaevzoqccd1kcvxmv2glyg387gmwa2ieem0siokgif1pgxubh8c8c4f5w2e17voeqh8wvyqajc8ojv98fkxieiaff85e76mrg9iqb4u30dv2r65kcscgf5t0rq08lucpo5uaiezq1j0bbogc8ovnnl7df2vx0lmclqwnj9wif2aom8oouhmqbsssiwtsaflw9y0c9ygmyc3r4lbx8muazhyahjsmzqty6xhesom9jrfa0srzfy7xpo104rwf64apc360bwolvnm3hed9zp80',
                username: '3dvm4cejy8qqxwz3skk1g5ynswoafq867dxrl2i4oh0wpisk7w48zkzt8pai',
                remoteHost: 'lfwdy036qq9vjm58468wj70p9kyjzyl634wyd9z2q7dieg8atjjb96t058yv1g7bzioylov9hzxd2dpb4dt5cwl04mgxklxbw75yhwptljij8flj9zfw9isoaqb8cpejfwv8et12f2edndy8inn72auskq0ljo3x',
                remotePort: 6945258843,
                directory: '3ai0upqhp5zbgzymhqx61yg0jjmcws62qt7rvdmdi9m4iijgo4gqczz5jekmu7ih48te97fbue9lt98my8osr7u1kutifb6ahpff2mqx9vj8zula6ni8szf4btqammg7s1zlm2pgws453iy1hgs9c8mln4bl1xzazbd82yveb1jkbbdmafgd7i18s1fs5d7y076j0fijwq36t99akvdo6bgckdi55ghv537jgqp05olmrb4913m71fo3urxtr5nlpj2ylg0h2r4ryq0hqcifepbksah9vimf5pne9rxf02ltf64vc8hv992wc9v34tka8pfurczxxaghjdk5fv9gn0781ipv9ak1820gg5a60h89z9jr2k987fbqqt060eblidb9z4n8x12tnbzes8ucc45axr6lxei6gdmfrgwfkh76ggchtbcuigs2px005hngnewgs39nr2c7tewt0pyfzmgfu2mrg97hfo0kvlrpj5n0imdvimrnlxpyc8gll1fylx4hxbvwcoc8a5pi49hkzr50ra6pc60p68cxfy85g3efek8e1blh2w1day0k1un5qt1379o0lxuihplpcs7l0i5c1w9xvljkea8maqhikyqc6t8ip2y2bybybqstcxhjops7k9tqc2i0dwvkjw956kz1xbl1adij58qghkyjwvo6dajho8i5fdfe465xmdpcf0af1nl3elj81olc9jk5w6kd56vhhouiqeputrk9huedmhf0chawy3vdrggxgrbvck50ej4a5vwltio29dgef3sgebgkvrgl8ssnlwhtcvih5gnjxxyvwkzyogjerits1ddwxg7aulispuc7q3oxpfqllzbv68whqihyrdjhm8cromgh8fi436qodgdbc5b3kqnxf75lbbhs2c6uomhyesec37t1dbxibh8ex62vi74a0n1p46s5dphgv9ht8ehvxjaehx1s5uffcow2jv65hocj0e230uipxggt6rkbp03ss2bkwq7aefjqq8qd59z8',
                fileSchema: '5xf5w8drmlerhvmgu6caojdyxhygbq2ls5misvo22rmnhvst6cjpfn6wbh90vy0mkqck1oi5o8qg1s2rczznse3i3c5u362qhrj10lyo12rxe3692gosh8iesugtrcs17v5iaxcn0qiqnaoyxwn0uzyup2q1ovymdrrsgekl0jvj1yo8dh1ts74xhvo2qflasc41gs4piohuqn7d5kbn49rlfm8qlfzsasgs3tg287dbahzd1y5v0kk5o0dtqxijgd2e7it3b66jvqiplcvxq2mzprwkz2lrm5f33kulgu46e7wf2fmg2f4em37m7bwkobax3k8hln5780wb11zytysla50jrst3my6gxbxeooy101c65qm5k1mf1uzr2fdo7ee51ywr6vw5opomp5gzi3mpqlwdbz76495uvo2gn5hlijbovthugzgun6e75wagwqi9hqjq6qum27yw2xp5qlfek6wbtgx6ch71s3fa5zg024ygsmwrvatuypxesxytxjorovn4eqx4y0ssq89bpikgtpdjlz3fn8e09yfh9im5tys3zf9wtz57pagbqmrv4nw30hjnteafry9zksh3r5vzvwplvk0iacfex71doo878x2lthn5autln2h3fk4i660bqco8n3k8y0e9gbce4vwj1radvobrd6pbsxyn1sw12jq962ls78u52tri8kzq040jwe02zj9ful987i1yh9tojw63flixkz2f2kielmbtzy38h5s2uxyetjyh5hkg3muqpxb41p08vedbr7qm0q9g50gmn63h8hjk7dzhq93l7awqcfs4hakyvj6khnzy6oxfsducf591s81bh01mj1pvxezsrgcim49aanrmzgjqety6kxyl05yf5nt8i0loukjerljqh2nx7i00di002il7rpbfddzp6g7eb8vgl8latg5fbfpigfnpgfza9din0jkt9mcjdwymw138zwd3alxkmh8bwm319fwgnqwc1kjpdn7xp1hx9rehm465xepi',
                proxyHost: 'c9xsps3mvro86cwgqon4sz9qnpha69g85wpe765x0rcb116un5kym4ngj6fr',
                proxyPort: 4935852157,
                destination: '278fy3djzoqd19aq27d758un7kzbrlpg4gtyyl59jpohmtag2r4oay9ncdjp2z6wsjrbst75dxoqvo4e21o5rvqaynatb2sasdh25bfh5srq8qhhmu7yi8ajvy6efu73e26zdo8b9vyglrjgjod5aggt6m1u3aey',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'szwqi09fiyim6z8q820a1lb1azl53xdm93tsgfdyzy1xcvca7prdm5tenr8bwtiw0fa903srfopo4mkyoak3hg07fphsjwopy88ee00zgtugh46ingb0b99db2nyq4w5avklkb4pb8jzn1mihdaq4xisk5rs46oj',
                responsibleUserAccountName: 'ilfw6emu5rx6nn4o6hfs',
                lastChangeUserAccount: '7kps9kwfdbt1s9vos4b1',
                lastChangedAt: 'XXXXXXXX',
                riInterfaceName: '60g7prl2nlafhs04ivqj41m68z5cmbbfuh1zc93cp87jvm1loc9p8vzoxclbqducz5sexyfrsnc29i0idz6zq9cbwgp9arhej7z97uajy0wtke2l6mwz3lci9d6m4itxf6vw2xw8zikxv75v2ypjg9qeez5hd6fs',
                riInterfaceNamespace: 'mjhpmc93utpjnevbnqcjrud8ymu0sgs35olpk4tq3els553dg1ah24hakj9hlpyzoe7dp0dh3swh0ir67nrtafm4fqd9j59lczorz3y4xepxhw0mhxzyhmxhefl7ws9r99gdahxd4q26zmtxhsgoqb4r638rcuv6',
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
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: '1ut9zdtqp3m72kdleng9evuk375pyz8hyemhpy3h',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: '2k6ehtk1p6gj9w4j7uja3x5y3edf923tqc33415gzvzzrnsvsx',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'xfrw4gvuudw9gv19si7x',
                party: 'g90o0xltjyzt8xz0mrtammaosj98agn16kwtkqg2ziwf8i09ibs0qh7pszy6upupqxhkzsjme8l0rbyly4ozc1ra9ff9aapwjzs29lsp575jit2jy3xtzwt08ky6bcvy8smk6fx1nv39wkqu3rm8z13qiytq63d8',
                component: 'zl33onbjwh8g4411u8ns1zi4ahd8dqqcysgqxugyf7dumaz1tp1n6ac3mvmz3upop0aco4o3hcgbhul3r0zogolmi58fmhed5s790x59mm74z0gnya6y9n87op7ze04y04pv30opw9m7j0i5rnbs8s0exjpn382o',
                name: 'yhfrdgsovd6djr9xacycpk5fqr2oeag0mido66r60m82xjcrunhgewluy1n23y91cu2jp3v0skltj0vbjanno2h9updwtc3dpk0zoam0zxldoj3cn4gijn1z3c0o5wyxczd37udu43ssulh6aglyq3nr594bwbg9',
                flowHash: 'gjscxn52894ky9lqjthvzqgkgmjbw8xmwts252ml',
                flowParty: '9vxp0h96umg96skderwb2iumktpdqaakzeiu97ijtmmjyo21a5fmp40egiw223hzhgjrr6jh7mzri3nvxwgo0mqwr0ku2xgjhzcy0033p41lqybcy28nnqoyowz5ar9hkng86qurbnltdph17reeai2cpc0c09cv',
                flowReceiverParty: 'q1p57vm8jrhc10sl7anyjdhau1ucsp64wj02tpabl52swfdxxc03wrkpf0rankdlnd4f2fyjsq67v24vtmuvtvmx05d367o10y9qt0bd57ih60qs3r4z39yv1ea00zjnrngtwx1wg0yr6nrdpc8nihn998bexegl',
                flowComponent: 'opf5dtf01q0pba63je7zab27si2dqhmacq8oc2uzbgfn2vmocug5pn9me87k2t880ldtckvrfr4fxodc9riwkrr9e5qnh0wc15w6vpqo8d88smyfmigavhbf2nnp2kdqyjy015m75zs931kqt1ayzodfo95eyqmx',
                flowReceiverComponent: 'pttr1mj5sng5aauvh5rqqaty0ep87xx8fl62khyjp71c87kni0fn8wo13eo7a01mrk1glih6z1nxi31ufq62iv4tzmpzv2wpipee4z7n9ccat2eqjl4xc1i60v2tt2bbetlga9i4dqmoh75ak3w69hh6xry50nsx',
                flowInterfaceName: '58h7esf1e8sqnc8lvt2j59szcg9swc0l9dzhm28tqfmjcxfh27xx8wunf0k5il75dl20be1hud2d6xayl6o1ops7zzeoxmqiwinn2z6dtisthxtzyl4ike5y47ilpabp35fdfuw0ap1bf5e5arktfp4g3qnk8mq1',
                flowInterfaceNamespace: 'ebnmc3kudcurss1gte5carbx4sn3j88vg8x4c8iih6j48ezdx5ip9id4r2amuves52mfx8sjy63k5xfxpjg17pvd19bmy37pkodk6w8mo84zu77ujr6egv75zc0cyetgidpb6kquzv518hbr2g0ng61czodij24y',
                version: 'lc9xqd5dikyn5qjq7m7g',
                adapterType: 'z5x0olitysu0qvnezesjznljdxbbln60l8dnmmdz9vpq38zl0et58m9lzehs',
                direction: 'RECEIVER',
                transportProtocol: 'kgdumowmkdg7o762whodvl3z6lrazen63u00ykuo9qvqvug5hyhu8xv0m6ku',
                messageProtocol: '0ftgrz7t3fyw0c2rh2ezw5xvlc27pyq9ov2zg8nj785qmcb8nsk9kd2r2n72',
                adapterEngineName: 'glv7rrogemg8zk9lhkp1160j5vjvom6lqo1pnrbnlc3yckehkbgjtsd96e71jn5jnkml6iust03svfiygme8c5qwvfhi3kpbyof29uqlxwb5wq43p29yp5q7z4e26jrqkg7sa7glwt6lxtgvv2d8ld0at6shn6t5',
                url: 'f1lu1t551kbehujee3mifmgnqo5i661qddzxd8z0vzatpp4kntz37p1j6aojj9l7vqow818zrsookjxqcgd62pljov6k712t9a8rl4m2rp2vi04qun8ja1h3po06oi2u3pot4lqoab3hayf913aespp4l9371acm1fx10r3px7x769mq6wctdvwbx0kwk1ag59pna2hdrkfcr1wmm0x4sq6fizij6ligj5yvp3i52mwyeg6m8u9krihz91crtndd44imw651zxozb1sxo5q36k4u41349kqm44ssm5fh0uobfz9u0f9x162zn8q7xpdw',
                username: '69szldo8wrivyaelq8iu2cyux26447plr9ojw7xzgkbursw77fqj511qls86',
                remoteHost: 'hacjov0uy7vzykrdnaob19fmithb4xz2fpkhf6pmwodz7418lrxs34pb6gu0o49pfs4amq6d6m8naqpn2d8i3638tkxmjoe715em3kj7770a3mt77vc7bvehpb6u6jeugc53khvn6yrwho9p393i5j7vtxyvo6e5',
                remotePort: 7744029903,
                directory: 'rjrlvfu5yu9888ydairtsitxy7903789dugkhd8os1geez5hov045tvq1520mn6ej5j5r655dd8rmasfq167gt97g6s1x1vhg5v6kr4d4x3c966c23a1vxpc2nxdu8wafv3tmy6jb0kmb8mz6b53h4v5ore1t085ygv6i4u2gpczth72uqczag263bimfp8bb5i9pc7bfvyi9jsys8s9ie0ga0fzf5g6hqsvwon30l95zjtynxhyfjkodm66stxq20mphfx5v2za91kfo6j11j12wfd71619wn0a4ka87qejhvms9pyoagh2nnk9zv0rmo1ho65rtmw3auf4t0f60bxrtqwjy4se88eerplw18mpz6k2r0qayemrdp6xpnhumzzpql304igdrzrh8arl9qrpm90v7c2lrydc9j7k7lgzkfxbbtigsbev6rva6bms09b0yhidie1s2vm9b79ob1crvzj941ip9ap5gjyubpv8cc490971jggv1auuiiflfefvbrr6vckhgkpl40z12opbjdiqdvdfqvrv43wa849zzdvbn99gr0rpv8zvvijavha2v0w459yo7gshyvodkxt7qqudqfz1qj37as45f632xi0v6h01wgieobg0keykp0wdjuzmtohyk84nhcge63r0pug419a8qb8wt8hbvhgi2ichh83jtvhhtky3gg1g9hvqjyagdgtvsrjx9zg8ojm5gcwqjllvv5ufi4hplj5plrz545zf8iysmu93ti03kttcjaqa12fkucv1e4c9wzmk4ffzylkdgj3he54xzy9j8gv4c60qu5qo54dwygaxfxq81h2t8nu2imwuqfxzu695g53p7db28khz82f71ecym2mktb5wpfcxaf3biyd1m8bgirvnj4yuef05mvncw9qff9g44nx0oa3d0g7iabwbkl89iz3nn4iktwwr7wvmjyxspz1z0739ly2c494duqs1f73b0v6zjk6tlk9pgjw11mwopxv80rbzxwatfaxx',
                fileSchema: '8rblwj7a6njn17rrulzn7rww1h94u0jpci9iegt2zdj5hltrnlslzjn9yx7z3zzd4v3s87kw75ansk12hyfxmobsvjibohg1y442yheth5jr4fc0zvf6vbse1uaa8r4n2wubn9tqtr9bf06mgr2nshivynjtpudam6nazcc2jd47djxyejox1e0samh6kynurzd4j88lxn2ydf4rhguulwjv10bxinfw9jdx5dv7zblk21xyasr3r7lj3tquhbkpf9po2x4wwius7yozhbquyqgqjm4jzjh4jd43yc67jcm0gttr5mu47uwk5paq3q1529t0vf2g3t8uo8weryk3p98umubs53felesm49w3tv9xuz1bowezpkrzvpl3rd6d6gi7lo954k8rd03idsukkgmeeqw3zf4wzirfsrk4e5jeopfsj5p4c6vkfm9uahu8dnciw0tc5qwcobxhi8utsddifi47mj0q55ifbweafevekcia0hpyf3e2x91ukm6z4rdwizbcv2sjsx9yc2un828dsp7aedopblijpae0o5p1rfwy2pw5wu93beozxpc18bxx21z8br86hchhtgjvkfzlm3o13gdcc3sr27m0mxjmluc7qgzn0epr3xeypkfw6s1ye19nk5pd5l9v44hhzakmadt8lqj3alwcvkk63q0zi8qu1ruzw5z2rvxh97las6kjzveu7jqgj87xqshmco83me715k2e0bjedr82zptsddovpmsng68lrft5ofi72q29k11tfl0ybtw7t3t2sht6u66oxzh497evz20dc6mwrm3wmi017hk04eeerxv9n1oelaix2osnthtw8mj8a2j5eydnquae37ahrtl2vrc3befpb8zbo4yi0rdkx8bcmgzse2lvkv995nl9lcsssflv0cu8wcnlk9xdrj7nz9l7k7bvanbqoolthv3kuxeed90ah6r64bol5aojwtow199fs2476h6or7mef10ujr17b4r2h5ty0r03rvuwzl0m',
                proxyHost: 'ddcs8uzmrfhj5z7x4flv1ourh9zvstmruu94fznp6i7m5e3ar5nxpqtte8bv',
                proxyPort: 6620134989,
                destination: 'dycfyzia8r931tuuit3h8tutgvuc7buqb1x7ztaok28vrvdcna5b8v5485wnfffst0cwvlhj7l5bsug2i04rur9gtqf18yzn3q2y5zjzp0eousiac1mpyahu5p8saj2d21dtngu3xumq1x6jb4uruvmu8ao54igv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'u60umuer1y9860hnijhsdqrt4ashjq2fv4kygd8r2wiuzpmbbr6e5cf50olgoms1rgackoni6p7nimc3cpj4xjevi5blmssixbr2e26katwgey1ajqnk4gyriflla76vtpxdhggcwpmfo6yzsz9wr5yc4nk34oqa',
                responsibleUserAccountName: 'm4kr4qpwd0tardfpyifx',
                lastChangeUserAccount: 'y6nqw9ao88kxm5286p7h',
                lastChangedAt: '2020-11-04 05:03:00',
                riInterfaceName: 'qyrcp5wlrdrwc9up1j7xpwa904s3pylfwtwc6y2jiympta69r5cmega4ryfyd3gudstru14lj8ak55s3whe5i149rq7ahfjt0gzqvleqid64q5w9eysdkfe54g0mqeb3y8vajmebck65kgt4eljjt22did2tyx8p',
                riInterfaceNamespace: '5h3lz6kj5411oxyj33ui0yxp0wt7q8xput8ow3ik9671f3o79vdrffsthc04pa4vyibawuvmtc8kq2hhb00u43r8lnxeyjzpgxi2rhyqq1rskbq2vew3ats35ovjg4jyseiaqmzrjlme199lpdt9c1o22t5ywmr7',
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
                        id: '959fc786-3eeb-4a43-844c-d32918283c31'
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
                        id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cc62955d-d5ce-442b-ba01-5723ac8440bf'));
    });

    test(`/REST:GET cci/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel/adc0a156-6ae1-406d-9011-95e8d7cb49d1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel/cc62955d-d5ce-442b-ba01-5723ac8440bf')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cc62955d-d5ce-442b-ba01-5723ac8440bf'));
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
                
                id: 'fe006ea2-c9ee-4ac2-99d4-a29035f28d56',
                hash: '02wshsojrf3ljpkct6coi1pjs87d4wxodv6xdj30',
                tenantId: '9712a329-9830-4d43-a191-c1eb100d5eea',
                tenantCode: 'f9dm88zhyg0mx9xgrton5d03vu636nr19vwzokwwx6g1hfmogj',
                systemId: '7f0ba98c-f2c6-493a-98f5-f451dd038317',
                systemName: 'yfixq4cgj3d4uji9nmbj',
                party: 'r6mfmx5nwa71mcn17xvrwr4es190najt4yomgswlxylx3cwkyzh1axoqa2kgrq2mpd3arvgqy88q4o36rrv6dg2xt0mzgfftkn360h0k9u9fczalcrvg2v2odei0wwqjlgvtl70ra9hpwf4s2ufauozlsxhjb49o',
                component: 'cd0t5z4dcdcrw51rt13ekdv3dh7aeknyo09gzguve4wpgn2bd75ysu5swe8knpi09fe0ybk0ysl4xupi4ysq05n8ohvhapdbrqhk8izu1ljpk9m070szfgouqa0q74pixxbqxuouv4oxyz14edu2kximh5jjduvw',
                name: 'n9l7dkiruqvknihu17gbvld4ssr5tnnbs1uwmy6oujhh7umoa7sc1hm1r5y8l0tdk9u8i7dxq0gbaoumuy9y8l5o6ffcp0rupog391z7uq9d6lb0xmhw8c2bd3t9graoh8shuxv4gaz1daqec6gt9gctkyg7r0bl',
                flowHash: 'tmzbzsilfgdf3cmef6076zhb6dqkl2s5agg1y9ev',
                flowParty: 'xsfyfq3n7sy3qjhd9wl1t7bpkceho4txuj52vdiudyoxw58gsqx3p4004cb0f7au9jvtgo4evqoxi59j0wg33tpf1qu5vqunxirbzemwvy5farbzxsi99svt2yw06ta0oh39bo3pl20a23fbderyt8uphvbyb624',
                flowReceiverParty: '64v9wxffkl76tpuzq2swzfgpe4oe5xw9lt4qllehzcdrzn2qwlucb0r4n8qazfkrr0718blmv8f8tj1106rvcxdergtc60fknt0obv0k2lktruxf6n00d7zco0g3wvudfcx59dgs3a0p1eqklrgdiyplmom379m1',
                flowComponent: 'sfafs2ecbwwn8hbgyp66fzm6dtf8mtihv386lrehivdu9sba8l500sp94o1p87r2fb4x1kk6d9crssnzghny80smql5y20zerih0673ce5twbp2ctzpkvpkbn2udcs59mhqe9zy8xdjvnhcgqlflkm0b9bjqnt04',
                flowReceiverComponent: 'gju4k6zqilme8ik4sfe4xl0hmshaohfdbevo7wg850iwso6n2x8r5ioo4nhuvfciowcxe0nrc5dmgsp87scszk9d4s9gv08ulnazk2t82fczv7n200fd2e5tbz508thsflue6fjaw051ll1vvzdbgt0ljestpzfa',
                flowInterfaceName: '7gk1bxe1ebbxtf2oa1h8z5434yet37ov1jwx4mzail6345gblnaytfh4efqn62bum514i40nf5h4mxn58zcnuabielarcc8qluzjrne8e0g0daxw9ohhvrxaih13xwi02csspghq3cb9674h255mmn8lhuwayq3t',
                flowInterfaceNamespace: '9m43z9k4u17bo2drvagdcepfiuk9q1lnizs10lwo61bj50kqmtwrod6xyrev6e9tr817thsxucve46436u10p5u4c318kj90o0f4x2kg037drmb9cr90iv3n1xyy1225c9xghzv4qwu6aehcwsrum8o5dmczj8pp',
                version: 'royh73f2gts6n8lc8x7w',
                adapterType: 'fvhbds02g3eg0widwnzbdzf050i3o8cbrs2f260b1lpp00e06fha1a5kvccu',
                direction: 'RECEIVER',
                transportProtocol: 'j9zp9i0mh5ylk9cks5m4b8lle87x2nmof1ltky1liq124w365nwnrvhydmdd',
                messageProtocol: 'ekayybi4c86nm5jlme8nuyck361s9q70hqrzzzncqj32sf57kiubcr63opkh',
                adapterEngineName: '5yp0wx3qm4pl69oy3i8wmqs0t0jktm8e7f87yu4o1jkntermr2tvk92mnk6r5nyx9yarh27buo27chb9nqq5crf1fy2zr5dmv3hrd9lwwtwe0b39of7nspb3736b8vll8kkq6y0ca9xk4djr0vllkh0zrce0jwe6',
                url: 'imjy2ggotvj9gjhxoreevuyyyfre1mdywuecd0vas8h6pe50zw8zroiwiorkbn5iwp80s7ed97gud5vbpzud0ygjl917kh2mpcnzbhxdmjg2x8mnsod5yls2bkise14tugj0xbiddc653pldnl4dsvqday9td6nj32z5raa0c6pdy8qlm4vb5dyt4hfv2fifcism61s8y9zvwq0xlfdcjxk2yyfhqdaiug8eup6zhq0wgck6tftuymyvafyd9vkljk77b0yrz8bhm87x1c884cfe2y46bw8okxaywz5krkiznrcuzo3yp4m7fvbm6wly',
                username: 'p0k0zkxn18townz55urma74rtr77rdlidlvf9cgpw4vkqelmciwjcwuzjmkv',
                remoteHost: '8r0fmdt4r4l8faoaueygtvod9plu2d4p9uka172t20wxkfvnxvnqkt3ou32kue5r1gxn5vx0eg4v6fm97pqvmp4dyoir0i4n92te52ijzng2fwl1zt0wsbeubov9dr0y4se1yjp4t8c5yrtjpgua9jyr7vyb3lib',
                remotePort: 6839039715,
                directory: '1bev4kwxefdoef3sval8ydo2vstiy49vxhm6muhl26378xjy2ez54skc7b40kbdlrt4a651lceh9eu2nrc027pnjoimo26cnlrkatyzwf0c9gh6tzt9qh65vzdcwslr5wpxlw1uvo0hyr2abkoxsql653w913lu4003ak6b9hu14krovricrwze7zquykhv1pixvjpkhq05vj24s74cliqkioswfgd0389ljxkmyhgbg74czgkj3a8mkuf6h1jxg7n0fa7o9aot4sptlt8fb4tq4c5yaosvct9mig4u23mbxbru4ngojg2l4m4zml98bo9zvb6pupzecjzmuufa7f0o9kwmg6v52bv0isptufqivzk9az3fcywtsq73ekjyxnp02qhmdsk0jye4fl30vz6a5vgwt1lh4uxrfgsf6vn0ow23tgn7nm0os2x7n77ijpibtz0ha9hxovwasxprdpdz0s7vsuq4oo7wpdfwxjjaqg0c1dtmcamu9a4jvij3844j78egjee7nkyucsaf5odkic782s8r4s736d0wczh87j00ixsgcga5zzk1e6wlycwd2n9pyragi50adewjwdfreqgpvyv49paajtm48bn1llvcy8jcwkfoab0ncsoivfjy05vmmmbristcksdk16bdlf5186ra30wfv06kw65p230mq3wytrzvuftu6yzzpok6w0ny3e9p4twkf934anmyd8b1x88ovul7k5301vwy9506m9pkczsk2m5y9ct46362bv7cfa4nf3t3knm99gplv41x773xpcldag3wsucrd0ncv8pjsi3ji8jtycj390c2ezi21ptsef4g3ykf4phljxtyoy89eou7s7p2plk8fj1srxzjcx4etiy8hhhnxopsx74u97x43qgfmm7mszt4u70hhjv38rd4mntwn9ygwjydnmcq6lcr5a95nih29renlnw9384q005sarirbqsg0qad08pipb1d3iw0e3a3tvqkoxu84u9vffj0bzmqo',
                fileSchema: '7d3el4er7vo1w401vflniige6ogh47gwq2jmjjffya5r41e88jgi3jahlr1aa0f84dpw2orhko6lmy2plbx1tn74k3i2zot5dwygnkrztokvhhrxtpbasol5896mzw1lwjs3runc5gnpt7vcuo7exs6cdfobenh3golp2bidcsarxneo1m2puuade1yt59lxsf6pq4agqj2asg3694gjttia9widqaspqo2ek8mp6x3gv911rw4v8ovtre6pr3mlexs27v68o38u3jrakcccxmo6n3evcci4z6j7kg0klksuszgni5u8rdwe86dfgva7qgt230bj6q9nxkaei10t2jzhpfb0pimmwg2dt3w90sfczqt0re7a45aod7d4ohw4xyq9fbfo7i8wuf0qq3azr9jhyfriygk2ioevx0byytq0a6k1gdogl0k1dvs0ff95xvnssg9vkzjmht62gpi7s8d938ts0fjn57bckbgss3qo7quwph1h8y93g4mlcpdru23h6x7nkul3ljpvyrgwvcs2i6bu5k21f2xq5uja2snj3ctddiuq61jawhphi9n0mzopm1stwiu3mysrwhzwoxwkkftaq8hqx9tb7kb3ejuw51ofh8ivknbtpjdwkdohxawlpw65dovdj0fmnhxu0yovb81ympzep2to9al2u3nspf95cnj2he4suoe9i006kzvrz0st5iddbbyshtxrug45ztjdr8is0wyhws7wuoixowx1zzogt105o38ezvw49v0qyoscjywgffbobxbwultd4fzuryhkd6t5hy4lv5d3cbmhrvl6bgosd5ryi0dbkncqous2yuvef0wu9mkb3snmb2mgl5k02pmqvuxeyjwmr0khl0g2gqirjo5ebnehbhtelusx8z91fydoryr7qfc3q2pm5w2j0z0cxv4rmaih9y0rgx1bgf9lgcxj11e3jkxjeh7y9536qab6gtq9c28k0b297tfq28hmpufe7ozz1mn8626wa51hecna1at2',
                proxyHost: '9wd184dwmjvngcigfsirw3x0qda9k033qe5a4br9jdql6f8mn35a6dj4nwo9',
                proxyPort: 2052418100,
                destination: 'l2hjl5zrvbn42z3ewf9btcbwbjghr2xwlr46tk4w84s8d8x6cpbif0rns0xpwjyvnxlctwkkm2pefmu0udhsa8s6g6ir17revdy98nqq3sdzif5knoxj8ayrw00bxo2rfjdthoqcjure12sbeduaupm5cbs0un12',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'pwd5h8d2nblwfblz7ja4y30as86p0dr0kdoxzl4a5jrh7y7l7tc5ytunailnbk5c922php574xar70o8eh4phbwyo9erfen7t7cdxfsq4c8lpj9l9bgfava2y4h0kcmg02io4smthmpq1ph6kn4eyud5c9ul2ohl',
                responsibleUserAccountName: 'm1qqdgj9v6f79blk8bzl',
                lastChangeUserAccount: 'gtogw8r0fx20u0ec69o4',
                lastChangedAt: '2020-11-04 15:38:34',
                riInterfaceName: 'ylvkjb9d21hv27ongtidy6udm7busiysefzk30s8ha6wknztsxqe9llixq1uws2gfr0k3w0x6p16l6w98jan8jy2dc952rs7mw374542usmb0jr5a48dbah3kuss535o3ppn8ovfigzwacltlig9cyr71fgdlld9',
                riInterfaceNamespace: '9z4pl12lyluhnzw48jihj0jqk7651xdzt8rt51czv8x1n619v4xz6u1hrd1holtphtjyjzlr3bsbv7gydnzels9s5eomrmmc46ogc5dben91car4u9dx3ccm8o57oyd62433zfqw317nlzdtucd5bxjf8govr7b5',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                hash: 'ydsryug7v7at9afbzj618hony9zqpoxx2b3u20x7',
                tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                tenantCode: 'b9vwnnl8r42shig61d3y0makkvch65crhhyzkr9s7oualmxg2r',
                systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                systemName: 'fp63xoy3kn588za5kq04',
                party: 'cwynkx7ppd3mrelk0tstyckm52h9umskeu7migl10ud8op7ugjlsas5q331t6ik7c3viwu8crpqwf6flep9cj3lvk3gcgbreganj2rz198bd63aysaxl6dieom5k1k2y0723hzpc2cev0578dxnkbb08gx27s0rs',
                component: '6v25o83qwvphb1unbaydhqh7r96yxy5nwpr02iji662f2qrbg6ir2kznacac05k8nn2i4ziy242kj6mj081a0p1l11j9h5dtb8hf9qtirbp4uf9kjhfy4n8qy9uwuu473fmi25jbim0kwr19qocbht9wj1tst5i3',
                name: 'i2g7jc6z04482uc1k5y7z56apnwavhqnvvjy2aeidgd5ilp3prk8ira4magl19ir3ndqey1e1la4v7dmkpy5cyeijidt58uu3cc4lmeaq4r1dnqfi1by5ohqwikarwsoq2xcg186uauingo5a6s5tbn8v9gxv4lr',
                flowHash: '04trqlg2s4bep40dw83qhss30y8m9lklenn3hahy',
                flowParty: 'br8q04m2umi4bgwbjgki8hito1pgffii1dnwtjz2butbio2vbajjvuzu7dx506kbss8ud41e8mtvezl0si53u6nqockpxtkhk70bg0r3t6s0iah9fu0cujauxnd90nw0c24e9642sizhbso5c9mvoqu76l9efscq',
                flowReceiverParty: 'm3li6362p6c4bcxfgkpbtph284edej5fn2tr284fc2dolt6ca0yzvg7oy5iwk6giuf37hbrmc78gerhieaj5x1ze7yk49wgwor1zy7hvt3apftqcff7wz1gqcsnrtm5gbms3scpjgppoe85j5g3fvxbj15oimbkz',
                flowComponent: 'qt2c73is24m3u9304xu3iuh11atk8cmlipdsryn4nh43wb5ei6rjt2nmp2tzfbg5h13vxdu5274x4q9g61phutu4kpejkv4yzuoknrgmu0ot9jz89zryznf8fa2x8vdfju13lfgs9bk7d49b90ozk01ih03u3k73',
                flowReceiverComponent: '47yg2wfikv61wjhdhhpl2k19mi67ecvqpax4xtxxz07sihasn8kox8gqpfoca4ugn71rwood18z5psl3ywac9j2itrdial9ztxkvqnx5i0m878c7e2sfwb75zeoqh756v7yyt0mkadqikr0pug110gmg6hw8fefc',
                flowInterfaceName: 'n9yfw19osmlvenlm9ijazsyycnbtzt5pmbiyfgyv1v9t420xod5n54qj378hpvnl11hu8axnplcye6s8c25kixyg1q74tfjnaotov96zpa4y8wz1mwuzezjvupami4y5rtcc6thx1xvlzvyub6r9auol9j9y2e2q',
                flowInterfaceNamespace: 'gw20uwg8q5vs36y1gyscrqe4zu1rqix9lnlp9i37u2tx94ap66donjai7y3v21dmkqs8gwgj9cjwo5zw0146gmxjfl62fy2mnuaqwixx2bxiq0f9sg2o3tsxdzpsjrujrxe7ua18w6603rcm40h2590lxrx9lknp',
                version: 'v8nth7z1o15i87e94e4m',
                adapterType: 'adgnenz2achn7sklx954a24gdhdslz8g0q7cmtfhckszgt03vqrzg76ob1ts',
                direction: 'RECEIVER',
                transportProtocol: '0lk5d7gxd2zrpvejh4i8dx0hclhvogpxean6ek8ccsa555cdphix9pd9v5ey',
                messageProtocol: 'egn4rcce53eg666xgolmb0txmeudt9binvicxr1jnnhi2r03bi3mpd0nvo5h',
                adapterEngineName: 'y5f4araux1llz827ow0zfmv2g5753crpj1m0xxinlj98q37ukjchv3b91v6bup09st6pf2nntdtdd71x5ulqps8xpm50ovr4s59b19a2y5es25he5uozchy0s3jt4u3kx4o5alzeae8ekcnl8lwvl6s0pjhzknyf',
                url: '21l77j8gvjl1b5hefv4nnxwsjkjbof66nar2ls2d2xy18smqckylunlqug8jzq9lmdnnp8cwp001frc4grcsxzrdktcja2hqc04t2x4ll43x4vh0pkoipfci9msy9gfyrrhb8tobkxby1fw2z3t95c2wegirur4nh3vn3lhd9lqftird6a0ertlwg7wl3bvu7fr4pduw2rltske7hpsf6bssm09y53phjrk3l7k9ayjq1jvgl76d5b4pcmtww9jduqdigwomgaaneww17uou66nna5fmws0xq05dsg0xexljfrmtpjff0to8i1d24yud',
                username: '24mztnv5fvp8jk2u54jh9kuusttoh5qsy6qfojdgdlqb8ad62b5z284byscx',
                remoteHost: 'wdnlesex43gdnypj87sxj8pk6g6t7uzqvl7gg8w8vcemd6kcwfq7otd1234vy5mvogm4sg7w4s42pelkf040tlioxnrmqqhk0atytj7ihuo1s565std707ntygh76u4w1ziibsu48tm4tfhghpewpyadksabgbeb',
                remotePort: 8993782766,
                directory: 'sktbwpluod37a9lk8p0gv3202r0gmesfrf8rnloj96d84b9y9est13dm4x5hxgckpa5q7lc73dswt2929t0ds0sf7qxhjeebjnb19ss2873g03glefy2hif26ril5xz49f9w7f2zune7gmsnhizgpyhfd53pepzngtu1slzc3bbxvn0l6dzy3cwl7wiy3aeengq3hiz6m6r29oyafddwyy71salk0yu1wic9q470i2idfh75y6ovcuq7js2tlpv7mr0jl592typblqbrli16tn07ezl5dpnmsdxngi8sal6bhqpmh2akd6wanve0v7q0phqf61rfklk6g7mabko5m5jyp7z341w1mvatfo7f5lsg6w3dqfqdas32vn8x8dyn3kuau6eh3tpgof95sure7hqwb54kzoehursnry5kohurle9ichd07tai73kwi9w39n6qubf9qkhrbp3hwj44nudv32o7zgj4ghqvx4fkdojeht4rbxm4bges0ln8pvg0gt7i92a3qmc8wxgik1sv7vq329r9sjsjam59f5q8na8hn13jfo3c6durbru3wecp3sdw1tpxpflt6jisyiaymoegmz0qzwqukvpd5ygb9brf3djaljnngqxsq6usivys4qv22g245611spw1d3x64ztfahtix8h15mru4bi150oih9w7exk2vmhsznk9zcj9gi7ptqqzod3pakc6c7m9rz9ngyrgr557iweckajugm9scu1he1oqdykro47gz2q42gw08l9bquj5xdwjhr7hxbwr9z2nynhktb6wrc0aj83xknu14gi1lhvb6f2j3rd52u3xjeiqdxel6vnd5uq8q18gkw2oza92r8vuu5mj8az0vr4s2obsr90f8dj2tkqh2my8r74j4lxhvehguq778u5xntcmprtxm6yzqp0qyxz8qj08nzlcje54s14i2es4hoy9x32rbm62gw26aajfw7e2bbvknvurvakoso8mx1nqtf91mlndla8zhsns8gab',
                fileSchema: '6rytzemelje787ambeq1qm27jr09b74b082eppac8nnazla6eo08df0aut99kxkg8p5dy0k55nlr4ap1hsbva3gehytjjyaho2n47e4dnhknsbwqtm0nekigmomltif95pj1mngsc484er91ye18gzegjr21jn7y0409nm3rumi4270bcxy67dh6x9on397xex3o394xvc9kekr2thhru0rttmelw9a6cji5wfior3qtausqxog6lsu53ic2q7lemvfi6aafgsp15h88h78tmmjahj5ubrlc0aqjfw3jin1en7e3ihtxatrmp5fp3b2y2yp23sbrdrwm04ohrxju4frubo4i6ulravlb4ki9su92zblndv6vg869e3j2datg65crja5onnwtyple9h4zfbk4mn6vpto6hka3gdel3phheewmao8k8snl7bl6jgxqponf0xfzgs063h529z4ivh581i6am7qx6qox8zvwvrecawgnqcea08dkixzib3xg3yi4xehtk4esn21i535kmv4yooecoe7cr6kzobr4cyzgfng2818px14huuyc35k4uaknluw6fyx093j4fvoc84sld61rj8mvjqxxi2vaj1ep5gbyxxn0qww8k0fipwipykdomntdaxckxqdac1oukvitfxraogbgjff6c08t0izp5nz8ildpddmrsuvv9so3mgd96hmr7chzay28c1gzmv396ocacic1q4g12a08agtmn2gqphv3lhup2gzh8uo8l2owv6czpmwohsxaz5wyhf96fmtm1ven9emid9av7xfftv0h1x1m1w8brpxczt82kylj16aw8mercnr14vnbl6no1l135h4wb0pu1w4zy51wqhkvsm2ts0bdtbxodoyilgutdejyaru6fvqrtir5t01v453gva4j1bouz1crw4ya8vuomp3md9pn5hcj0ihtw8gvbi1ahyxya0vy78rw8az6u8uh79xas6446xjzlw807aru99l7i3wd7tp8rvlh',
                proxyHost: 'kxgqxll21q4qnrn73irhcix8q4227ozgibu8h0avmaf2hjufi11aqawu8smw',
                proxyPort: 7262387880,
                destination: 'd8eyxd2glhnpoppja5kp6336hu5qo9464trx1i2mgmlnpdmpd64w38mpa8l03gxbg2kddnhcb7d7ngupqd86nn5rkltwft236iuz9ped5m7skplr7jg7opvkzhxvzu5j07dxc7u86bquedk83gmwepciu7msys5z',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'z7yq1ju5ih54159mb0kxjyrneicerkynijm6hlweiaahdjaxldj7v564tzn6uo3t0gg3csw2zggqwdsvfzeqnj2lh4dq0brtr16dgfjd3waz40m2suycw5huq3fqgr4yvv373rlyee2lhhj6ybf3akp3h1o1rqgh',
                responsibleUserAccountName: 'xnfv5ecfkijznx5fghyo',
                lastChangeUserAccount: 'hf5dwte14s9y05srtuhl',
                lastChangedAt: '2020-11-03 22:02:28',
                riInterfaceName: 'ij0221qtihng4p00otay85o377qkt28bo010ewq7z9bv2cphr59d3fefexnbr63xz98xt2fv1fb0oh23yyj208185casjnqbgfbr69eg430r9u8nxcepd97g9q17ce7j1l5zj4g54w0gsi3xnjn1vsnc2zeayjra',
                riInterfaceNamespace: '998kpgfhqmijqsbub3gvsbhbafx3mog448mr2gk6h00u1glxt93itte2w6sw1ktq4kgvo0muivbh9oj3tm4bnwvh9gt2fwk6kseal88kxbwviv7py8h1598qczebw86ilytce2lk4k9nagciq89qhzter6crbqut',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cc62955d-d5ce-442b-ba01-5723ac8440bf'));
    });

    test(`/REST:DELETE cci/channel/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/e23f0492-4db5-486f-915a-566960bf5e1d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/cc62955d-d5ce-442b-ba01-5723ac8440bf')
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
                        id: '1a4dceb9-913a-4461-9faf-7604f6c2ce1b',
                        hash: 'k1y91sed74ygv7a5ckob2jh7g4ryfj25k9de8cx3',
                        tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                        tenantCode: 'h2we8ycbcbxak990ua8v6e423ui4b5y4r2cnzc1sfztciu6jin',
                        systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                        systemName: 'wckuj90kht7macmxd4qi',
                        party: 'pz6xtj7nj8h1sq9rs00baomv0etlo6u6gggpp2y8yulzoplohjv6rno6i6kj6h0sbs9b6qnrrgcawimqfs6xa43shiwhdbdm3j06o63noon57xt37aw7jeo2pod0yxtxpnxdvfwhjk12zpn0wcmt49cks5gqe9hh',
                        component: 'ywllwdfcnoxczue7zmz92581nwr99dmom2p9394fvqohsa2mjllldwcquq828xsd09dv9bcu09p5crq5ickcru4zipa0ct4zybg39bgtzv5kbxg58e98m8xy6kcztlbbcjfa794dsc2sz04sj6eylnpp65p961o0',
                        name: 'kgxcvz0zzl1o2sw4wknpa2qhj5a323tmyq6ne3mmxxaowzef0paqatng3s0vzxjh62lbvwxo3w6qwvcnlxbhs4n4pivy6h0gv2zp8td4jetpw1fig8hqjl1jw3ctbtnozgelfhtannr7m7l1vubg2ktwc2o2c2cy',
                        flowHash: 'ku2epwg3zbf8i35fiih02fzzpflulu5v5wmti3i4',
                        flowParty: 'hzzfkt91qsv39kxrcu2343seoq26lg02qx2756tuut49tx5nvycyemfvq1f8mandn7zj6hppvv9kvuud1emla8w2xcdwh5ln2cdwkdr203oypcclva63hflret5rid130757j0aclgm8mu03at8ajanogfvufeim',
                        flowReceiverParty: 'absls7gd0nljc49vgehozhup9qmfkr1nghxurv9e0h08n68wqhbvaoa5bf68erpvql181inlpktx9kuoejrjvv3qpe4h42q5yjkrylw8mr3n2smtd183wpu5rg5yyrove89ytbcd6rgytkaejsx2ylwaqqfxqoet',
                        flowComponent: 'j1cnrm7lvsqlqm736c6luigvxjo7m1yhjalkwcnfhrrhol8i04edkp2afqud9s4hrxloeuu09pozswvgz5sg1p3ikahaaj1woup5o0d4un9dglx45vmcxwytt5he6x867cxydd1mzelc4z7hcxzy48vjfduvty2a',
                        flowReceiverComponent: '74mrj504evoh5t7d5zmddxxpfmnvbvj0fvjz8fin9j20h4c5mojy6h3qifhluq1bdk2y4rkdciwosnhkdaykoubkwyz6dl34bpsgg7d6cvtfl8ma3sa9mf14uomjtf78uki2w2g4rxbb8sq9xgy3kpuh1uosfgyy',
                        flowInterfaceName: 'spurttw15nqzybr2ej5bx7l8uefwld4796kpt0pz697gl7sczmzmkxh4f8s5z17a1fsymfuqdl0vdcwz8662x75lqn5gmzs102pzdh4aks8a7j9jxuaok7qblvuczk9cxu9c28oc76e51g2jd614c4xb5g3ga9y0',
                        flowInterfaceNamespace: '2iab1c72psknw6tmhokoku5fqtq25uhi4urp2ay2feat86i0r32cmdbi1sbuxhz383xy729l002l1i12tmhf914qwtnf1ru0vdlg6o08pyalak4vo1r311wh1eoggdlqh9mrnmy7b874qdcs46vbze7pyfbg7eqk',
                        version: '6higvp31nkr2xtrp3t44',
                        adapterType: 'k0jbq790148kcvz25rtmvr7u5hfhrerlsko9kaz3gl0i3xnjs83v0fjjc0fo',
                        direction: 'SENDER',
                        transportProtocol: 'xm7ami5vreofio22vxpsnn535y561d50egkfq66nw6tkjxg1q2r96xipfxdr',
                        messageProtocol: 'xfs62u9mbh99bb1v1419jgqnl6n8lmz88s8qqq3ilo7ky2i8orhazjfz1k4e',
                        adapterEngineName: 'qmxdwtr083qksf96n3gwkxkgfw4s6d4gndpy6skes454cy9t1o7fa12kuxibot3m4dgtpkxd93y6cmyk2cvdc8gc0u08dsb2ftbr9bbtuzrthqlh8siup7qmuok7vyqs9vbk7a8r8fqnzkcx217pv5a12txl2tm1',
                        url: 'hmzcfs5jda6z7slwar65kpxuwimly0u4aedgcapfxnywpl41u5wjhyfy2ja6vy1mm9f0x74dd8uv65a12xkbtfhmkkqhg5lafze6y4sicigefokyrrgl9oww0bluo0x3ayvja1vgdxvkwjlycgjnt4likvc8apda1cc55uw87d43c5b1dq6nb6cz8ebvjey7qplne9kmfaat77bb1ijbyyfb3bdp4y8i8aui2yt2no6udhr7a9w4udi4lh2bepna1b22oitbz551mf899q4yoxnaf8m4y50pho1w9mqyhcb31hrkd2hrhllut3nc9o3v',
                        username: 'ap0mw82w7w5535kcra99a7xfk656xcgx9ocufdgfkbyzmzn1mojkop16msxw',
                        remoteHost: 'agddtswnbn2to42oj87nslt9uusr0bwk4csrpv1stij27zdmhya02qryjj9wk1k5y88phk6si63w92nes8jm9owaynyisgwcz9o3d3pt7d9pzezfvm5w4e4d9yqy3tgsiijix2sp2zfmniqh0c9rgosxsgvyhicv',
                        remotePort: 1202869170,
                        directory: '0tengv3helsbhnyl2avvrivn5ygcfubv1dh1xh2fi25m2vid0lcr3uo8kkgmy3ftjx7zr6wg7opm0dzvyrpoo5ar6u2fztl4p3lqlmlcz9rz7kqgwfylb6f1l2vjjpg2nw3zuh64xjeyov6o5mqeoswfkxxnqlpz7gkux4xehra2jnh2hnpvsg94ko04ruvacqj8bpicg9nfuovhmyzr3otuv57u9c6lj4goay02h2bnp9m64e64n4kv96bnebu0x97uro2mtbh4wvkr6w9j6jtmlx4lw6km35xzjaoht3wcklutl7dwmilgfih5tlrb44mkzyer8bhz2bx7zf9r1qb6h1qaooikpx7b1rm21kirmemnpnxvr1zf2p0ucn5cns92swkst7murr9xd63hdjgovh1n5cj0qjj1qfsy85vb2chq3cmctjv4jxcq0vikouxy8isz3ye55ztpuj5v9846zoqj4bsfx5eclzhf6pndd3kt8oellsp3mufhup88gyl0gdciyk1bhzg57ja2rv81lt5b9pvi3m1t1k6xj7esq9vyu7fpdqsqjz5fevjn4qkae34q1uwlmtlgdmwffauhq3j0t1thyrvic7thricpk9mqsa5jmao7ssnb0g8fmpdyekkznblptyqkc0mf0b1fu35jy40qcjh56olor6imrrhdp3vabdzvjfrbw4b0oebs6neesgqrnrelybtk6v5k5ckk9kgdume7kjs099ghh4ecxm2hyvb09wiuoehbpkvh2boowhtvacmgpmrp0bp9fmhsljuqybggwa0brf659bduh2kno09m3wosttb5svvvusjx8hp4hlh3cc73wu60h8t0974t1k9fpvyj38s2bt2f3gwzwxkyt5qqjne0h6ulzd9wgzqn3n4cosbcsbp6tf0nkkskrvgvzkn0ur69cs9bmc37g24o8fp0bksjdi6amb645of13gfdcuwbgaq7jszx1r6j4nm2ptncuzc3ys9sf09qkzzx2ppuiwju',
                        fileSchema: 'lcy93lc5rt6prgx40ajod3fi9jtu5o6poc0hs6g7nsjf45njutqzvaattiy4ckfzv7tdpex3zewkb8jm8b4peiir7nvyeku1mdzadkw3n7uwm1kk5af7j6ck3k1ln3atgccisvcytqu3jxcbelxb7ytz8y21js3f21mehcki49o5ngm31wik8spao4hk97jqz7ftjvgx7bfk3ne3870onz0mokwt7r93zcgxhd8j0e4x4db55bbkc2agascoae5qubesl5b70bg5id5jdn50ce2ssjqahmqd13cbvrj75b0kar0bsifa2xs5zryjx6dkyra7tnbg7ukatbnx25vp0pc9r3udv1b3eojy9u5czakr7p7y6z03i77ioha9zlxakz0jhpdmwzhnolrep0akr7urj70t1sjq071t4zeqwf3nkk9u9yvkt1zkd32hokrndm98az2ylxxfjpndw3yxjaez4x6n2bfp8il9jv515vaum8gh81d17y5wybj18i9kvqpoixew2ogufqu6zsuj37jsfjx4omp38ng076azioqaaq7pyrsfr5pojyxbklj9gor67pj6hs6308zkqm96yyfbolaxb6gfdh5v1z6fz7gqb74zjhwu5zp4cnm4sr79sylawhol0cfjtenrbwmbo7g5n96noz5efefl0we3khl1j8ibri37stpyht3tksbrz3z7eo7rkaij4xlf5mss8tm7bw5p2py321e6z6s6m2q3a7g9bqg2jvl65erwudlidoykpxgrd6nqk5co3q9llbqt678m8l1errlrkbnoa3eik4iwe5bbx13mtd0k579lthavu6glklltgea74cpw5mvh9xptj1opkku9uhpd587h8nbhvz2zzlmoex67l0ryaokqo3hdxkxq23b4n7zvzcshzuhyh8nstnk6i9w2476hs67w3kgyigvhsdzsaswfp5ot93g6wij4wgnhy24mnjm7dv0qoswo57ruvxyuy8854po9gwsov2136ofs7bcp',
                        proxyHost: 'hkbb3zs7ny7ka9umt3k2swzxm6zeb864deky0pybvmlpwyks20ftwhp69lo5',
                        proxyPort: 2729596468,
                        destination: '9x0nmxpjnm397sqyrv27grzz3bejc5oxx3nsxap9ccw48vu523z15nh9b7tgekodad03ekirsogkruhrwhrxq898qg8cp6poefmbxmu8bxcslzzgpiaq7jcq26x1jelw5ltxpsk5wdhj1wz4stdtjl804y6ba9rs',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '9h616yjg1vqnprbmipxlwzfh3kivaou4x91doc27u7hwkgcq54kvttflvguwsvudx92nndem5g4yko1e1v19ksxh9pnxfsnb035v8xofhlrjh2oh6r5cl2jrjp9684rdepif82kmy1dn1a66vaztzd4fwaucsdzp',
                        responsibleUserAccountName: 'zfw8g4n0a8ygph9qt3i5',
                        lastChangeUserAccount: '122kxyq7lh8xwks3fhtp',
                        lastChangedAt: '2020-11-04 07:28:33',
                        riInterfaceName: 'kan6hefopg3lm8sgsfuoecey8gba036cymcneuloqepk2s2gx1vlearg2chpqw158umzmr3caexcew2zflcfh1nreu6ey8u8n6xej5vm91ow5hors7cexip8c5zo47p659byjfgeqt0jbga39wrh3ypbsd3ffz34',
                        riInterfaceNamespace: '9hakuphgbsciwwiq6gyiq3c3kojgj9f8w4gl2dc6lof8059ir8miaorhq48tlawlx130bno3hgkr2j4bqp5djunse3902lz28ybmjy9iao78q5w4eds4ebr0ncq5cit5f5sk3z5php7p67ypatjwgori8s1h5edg',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannel).toHaveProperty('id', '1a4dceb9-913a-4461-9faf-7604f6c2ce1b');
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
                            id: '0eade97c-f52e-48b5-8fcf-cc4ad14d344b'
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
                            id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannel.id).toStrictEqual('cc62955d-d5ce-442b-ba01-5723ac8440bf');
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
                    id: '3698c198-c79b-45c8-834f-7fc1573ebd7b'
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
                    id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelById.id).toStrictEqual('cc62955d-d5ce-442b-ba01-5723ac8440bf');
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
                        
                        id: 'e7ed5544-3d75-4371-a43f-b246667c8979',
                        hash: '7o3qha4fcfrdhrdf4lzdsfx5q1laz606jcdzcixf',
                        tenantId: '7fa01d2b-1ce6-4099-9cb5-6a0bdcd1386b',
                        tenantCode: '7kp8fjs8drqmt3s91bmrcnh67st3mi1v7pg7q39t4218vx0o5u',
                        systemId: '8d34deed-c3d6-483f-a96e-e0d38d92f4f9',
                        systemName: '75eayv9fzicmid30wabb',
                        party: '9p4rlshe120qy9tvikek3s2q294oe0ilpgzt60jhg3v5und4ajffoiwtrpyuv4aarrnv6n6p61o96yxvv15wxbjrf56mf6xzt7egjm4gpihqw0d1w2hucx8u0pajnrlnoct1jhn6932qtks239ww9lnyqul78mf3',
                        component: 'kbvg7vvk8o2qjf986z43wdp7zceu5vp89th6vob9n0oop8i0zfwyzoxigknrkat3b3k0kw87flfo8ay671ek0rg7haljr5da27ucrutxe9soo72n74bhzd3smd89m08n4zdkfvjofnryg3h1g3shuduta5wn91t9',
                        name: 'vn3a059fv44bl7bncl7wjwzh47gokpiypi2xlgl4lququpmdtcw7y69zgauo5auzln21cfvvand2gk5qfjvkig2wcojfjbgyass80zcyg8nedp44pj3jnrznth7lycy2gci91prkacygm7rf6lqryf2a7oqecfzz',
                        flowHash: 'n5jy9uhgmuclnwk4oxeigovwdwxp9akkfa1zv4ru',
                        flowParty: '39gzcg80nt9kmd3oc5vo7f9doh90o64efjjufyaupw0lqygxquw87o260geimpj8h7j7goke01cm6lj44b4574biydo9kqxys1y8gy089muy7wwsm95fo5k687se5bmcmg3mwhe76rip2ylanwfg4nd6vrnz5bjy',
                        flowReceiverParty: '7u3x75zenv8c63zk84qnfyvibnjtzvoqo7blaismyw08pcygqekz2wnv1yfecbdh28zq9e5q9holoc0pmw7rjonpoi8u9kj7fm6morbcwmscmo9lpy83931s6a4uybm7hg7xxq3nsw7jh5sinq879tu3mbi51zqo',
                        flowComponent: '8kq9b4r22cvjnm0oic4c0cw05hxocfv7bqt1439c8e6399jndwhiay07ru5q12ed6s2nhb4fh1z82o1zdhs1d41yqgq08uxv6et8sh6r1oh66ovgniaua38ag4t2o09npc5hwyc9tmgsnfeeghomytdh7na2602f',
                        flowReceiverComponent: 'pi4grnzdrwrgmi8k13bdp4m2xym0zvsj277o62w6nnrt7vldk4p69qvub4exq2pbge149rw1p5rkmwt6kelrfx6kkuvkczpr0ay99vdi9cok9wba62fl4lrdj7w9ghoeefy5b3imjqgvvhasb1wi5b9yq3dkywc3',
                        flowInterfaceName: 'wn8kby64b7mdrjaqdgpzzdgfjoiid1d6715rzvbnd8z5bz1lu9qyo34320z96fd3ecbu3um5pz1ynuxhtxc33fo89jqes0b6pbwgtm7rtmfwhxs6nvin4fa4u21ryhranw7w3k44mp3fkbhcuf5il863wo1p4gjp',
                        flowInterfaceNamespace: '6ilm8vc7x0zo3ot3w74j4dzr3dzyflqo20huajkmxklxxec4hlis0v1npn517jfrgm9nswim5sk3tka3uzwutbmxnx0sm2xa7g4wq3fe0b0cgutk6ux4pavfvx9ha7wnrbx5tr813dzudl01ugngah7bt5ckjwy3',
                        version: '9m095nsrj51jk906idhb',
                        adapterType: 'fb9ch1vvtdeoah489sh5qassxkmfkmxonz0luwcxkj3x2wwbunvk6wvdb4f7',
                        direction: 'RECEIVER',
                        transportProtocol: '59cqvgpvqfysmvw1aruc5bonn4pgf4zsa4yzvs1h713adgpswuhm6f3xwzgr',
                        messageProtocol: 'ulywbb7l67s7wcv0z5snzbtqqsdtx4b3ybhp6qg5q3k6jbzjt658mpebe6fm',
                        adapterEngineName: 'w868fuhpetjbyqoxdwsd8q264nuzm22yx5nxe70591wmmr35l5lzmy6tdqhj1pi21uiv9cvkpi14bfeznthuk4agmmxygv5plxq8ntc20w69x5atkyxcilnyb6xwjy4j9w5iocqkgxhvpoujvriqpnhw1eogqbjo',
                        url: 'wa5j7j7j89yw0560mn5jp13td8ou3jlvwcorrrd5uwtjqj8qnhzpv34pluifd836g5agzmi7e8n3ukibskmyrn2449biazn4b06neeq1u1vd8y3s01bbg39mep6drku0gkr5huj5400jsc9bzvtme7omy7a61be6vzvwvibe4jejxsejigzz9si7ixy591iwygpugvcnbqkg5hc3kw07u8q3b11mwsxd0bl2gvrfcs8vp6i92iqlrvzmjgw43vv6pkjkpwxihvo20gfmssp9ogrk4xbgtz5zsw12lkig1cet7gccjueuy6ecs03yem1l',
                        username: 'v0qx9bwi2y8b8149s12d10ocu48c08zpyze5jkyaep423ne48ic2jn02sopy',
                        remoteHost: 'lbf3zk6t8m67iffubsq6sz27s7xpyzqji3lo4akq4uythy2ogx8kfeke4zlursmswgogi78rf2ug88ww301f6lam6tx3jfgqgel2bjjhaufm1hmyxdp1jvd0jbg91a9rn0szvfo9tr8rvs4f0kal3oxanj1qdiqn',
                        remotePort: 1432925574,
                        directory: 'q6i96xryu2das2jaflq4hcv75x61ip7l4xjob4nlf9v8o3y3mhp2aehogriadsfsxut3zgniwrp21fy5qldg2r96252utskg6guss291mabc276nwt5h1a5vgqw434ys7bq3tjgb68kbhwvft5lct5kysygroqc8yxlmulj43ohco56ggyrfkbp3jpf1zhxtub2qn5rbxyob544vygtho46wzb3ylwe3ka6vl7asayfq9ah78olknywwoy46289lfbdtjvobbefg7xht4z9i933ne5c2adwamqusepk15w45oq0t8yo2e36jtagymlh5qedo912lhb6owot5bbng88dpfc39u9jadjlsc4vov7krb3n5hdswkxkgc7ffiv6s038lqcft1wkkqcdlyzo5btoedvaq7hd1wys3smc43442ae9zgueos4jkp0m3qnrtt5r3eky9gur5dvikk13q5evb5cqyus9q4x8t4z11s1zr71rdsbjn7y2n3ldiwk6qqi01gyt665nhlzjb9rmvzoswh8ajabzmjnfuvlvff4fzan16g4u6p17ojuq80f82an67po858xdiuubh8903wyycyw1t8x3f23m7c7bil1yxybd6xhd37og4qhxg7844l5mmho10bvjxgyn0lfrws0jcp3tkjvxfia7tcr02sz1euai3ynr8fe6o9phte87enltmbpc2inl3kgdybame6w4btfg1i02gd9077cbkltnrmu3zscud7hym1wcv9xxk8gm8l5llk2mkdmd65g5q0u20cycpnokmplqm8kjmkmin0u43e3faoz9qyuv5lofb7ragohs8y3qhrb6fsp82h6thaq54d7haowqv89fmtfe6g0ye8w0aicffnx4wi4y5rxed2k5olzpl98u6wuyafk9j8lasrvl0jhl0bj1o170lnggnnlgb8rd7xdq6hi25nkpl425twct6raz0q8t78iwu7m5nl3bwa6bzy7kv31b7ao3w864vwdzcdd57ey8o',
                        fileSchema: 'vti9dtlcbjwn9gcm5i1c3g1a2yd02dnhtkdjwm3bhwbxfmdjgpxuanab33ua78cqh34ogich3rr8uilyrevhutn9urt5djfbwd7hmpn5m5jptsnqka8iv9x28slilflntpa9rbumwmfogxa1fe6woyw1y65abbdeqyem1tn5u0dggonv8ckv9aewqg0bx2omdc7vxwtex2y3aga013xhr0pa5qj2hw7utqe1xvpoqk0mwyt34g5dbhw0nro7g0n3nbixe1361stzl9svqdz1p06pbafosyy8e1q58ha6x4tm2ai2ks8crkww6e20tfrophaatm1gjwza6xdv6oom1gjjepbq22e2ilfrqpafx3djhcwpmrgji1l47gzfm0gd9plksh8x9gallole5gfmqcclsivdd3nt6irxqwtbqvs7pqei1d99yabsh1m269ump3koed7k032lwmklghiqyiuge1a59wm2rnt95moiorayfy57aue1qw8yjgl0wa6dfa39khfm4mczaq9h1to04qdj209jttxtfkfouqoqbls8d91xlhh4ef3zrlflxyo73teb0js051hvmednrtqws8e1s84tuxqrmqcwnbgz7k3doz5td00qid773qjuhsqrkmaym269qoagdasdy9vr3asjm18750arq3ni1ijn43al61564cf4zb64egdcyls5yy0lvd60ygrsdi60lfoov8pto2iew6q2t9saxmnhu3zg8fda1eg45gxltjddr33ob6kwgqwmgpuc62qgim3px546ku941yawxpolcg5v3c2o140uuiqnk3tbjlusshjimzxiipx1rsizu6vu8czv0u8hrjqst0ez2cumddyu6jjfj73ixtsf6e1yi98t48z3nxs9ish8xna92h3pynxi3kawkw7jacmadmbvh9ehnxqt5pvbwz6j9wy9fxq55x3apt35dpiize0sw1igjki88hokjdkmq77a2eb4ucccs50jb6htxwl2lzk1vdeci7g5',
                        proxyHost: 'r6l4v2ykcco82sdvadkwa0ur4heickqth3a5w33hwmcst5lp0d1744wu2i3d',
                        proxyPort: 4307827145,
                        destination: 'hheyla1hf6xt6kge2l7no8wj7jhaxf3zo00k536h0k9n5p3drjvyb4sqbeg8dz1l45p5kn3xfablr0s780s7ytwo46m3nx9hif8ks40rq12am2umv8xe7ow5tp11ckpc4tfem7rs1f6n1mhb8deg124r2wxc1m0y',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'dj454h2wph1mcuwghh5no2zmzssee470spof6muru3c8w1iirh9omelj5b7bvryfp5sfs5lmrxpq2dw5cxes3o2tjsesiwvzas9yh8n61jqllrpyyll7hhj0incow9zg61yi4ld84hrhoyuospb96y17gbj4bcw0',
                        responsibleUserAccountName: 'ckqsxt2wic6at1m8zxid',
                        lastChangeUserAccount: 'rrsalca8cp69j6vp7v2c',
                        lastChangedAt: '2020-11-04 03:03:42',
                        riInterfaceName: 'ynaoas4iff19bc3sw7metm3ukdxufg9ms4peslv6eeypmghyirppaazpvxiinhrzy4jvnqe1wpw95xiecgktxg2lrw91igye4szuhltjkvmmkzwlcloohti9trikbmzaqvzlynphjdoe4meeaj6ih005xbv2pr21',
                        riInterfaceNamespace: 'b0uromlai172mk355ohn092aaa64gsrlyvebcghn9ccrckwbiqghf7h8tyk9pjagrho4r3nu1l59genv75lx3w8dlu9p5v5oe3hl1h92u42905taf1i2ezahg4hb2yt12jj785k7lkzjlp9jxbicj9rbggosnwad',
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
                        
                        id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf',
                        hash: 'enij9ku1k9rexj1no67rmcv8k7udfi6w1bviy76v',
                        tenantId: '1068b189-4a76-481a-882a-b35482e07d5e',
                        tenantCode: '8c41pwffc247g7oc4i3c0e2wse2wuuvn35ita0cs9s7lv1zdga',
                        systemId: 'b11dd97b-cb1e-4655-b5b6-1374f5d2dfd8',
                        systemName: 'ny4ubu7orb2uk7wf3ryj',
                        party: 'v5sxt4dyv7a21l5e5kqnx5uo86nkyqjwm4swv5btqzs8rpuc7l60ona4o62vwaxksypgq9d6uladcygkdodqf06xwhtjl3ero3ljjpojtwjl566w2zj1vu1dhdr8gr8r7qc3j11o2duwlwhiit8flg7ptjj5ty5y',
                        component: 'sb6xgj5rscx3hn2fzbk60vhh2rpyxtl33tj4ho4kducvkk1o9pni3kecfkwibw09qza9ciluknv2arojvzbsm5ub030sp6l7mo73j9f050gtqjoqw6wpvxwz6cw2inwsuhky70honywmm6f52zcrb4tu7zbqmws4',
                        name: 'piof8c2kv3vfsbdqmjgp88tqpki0sd9f2egopuq95v11lsg9nz3j6wvemckcn6pqnfk188dw8dwr1huvgm8pzjs5tqlfcgz4deqnrt8trubmc6rxsy205apxzd5z34x3k5ofotnkrq9mf5zfbgvis802vznrqdbn',
                        flowHash: 'f643dbqv8favz01vgwjxhmdcneat4nr6a8juw9zu',
                        flowParty: '0kgqqasmr7coo8aovll2p2vvqunji05vk6bk84wexa3sjpimz230zl9mendz6akyx65y4qpabj5bgas9unmypajqvouatztknl90q7lxbl04kv9ve7et77njbc4rotaqznn6c9mgp0bdpud4wu8hrhdoowr29c6b',
                        flowReceiverParty: 'l3qxiwomtqw8v8a0wxnuldb1f4ohktaiac29h8ci4ti1qpq898tunn5dovo2ugxatb9llmyxkdp1zfh2lthmezpibepn2gue92hv1ebdsfxscla0sz6e89ylmok2q3j4qj4k51112dwjo1nk4em8sga06814ayst',
                        flowComponent: 'ol5h2941zpc4351fk47j94v60qa6zdm1owhhut012uc88f50c2uva1wgkaifghd1tempmow7481tb0qfvvkk66g7oegcaha5boauhxyht3yk4gawgf7pqii2vx4455n2rs7yr0pu8rr2gzsndo6cn0gnyycu45hc',
                        flowReceiverComponent: '8w7qlg6dgifbz8o0bchewa3xgvp07idlg5248misz3798ul0wl1hwgkwpmmkn2z2rkalx1vltws3jxot9sal4o8bi00a3w5v3h1l9jybxpc64jiz3998p23hbm92q7lx69ezk0pedn470pfmme0d9r82qfeembye',
                        flowInterfaceName: '7v8nimcoepbf8jfn1wp4t1bzh4uf13w5l6fi6m93ky5lkh2iq7fvgxjomny8n7vcbip4508x6w6sg8xc7im8tz6speu0upmvpyw5jwq6k3htuhestplm4h0tc8k1zrf858r0vbe23ypm2vzzeqhchegkhfl4680u',
                        flowInterfaceNamespace: '7vxpj90f4kvf398gu1vuds9tsam1m82pdhat2015bwe6zoz4j5ffjxs5yzfywlfhrducvqwf2l7w7zevh4gj8ft9uo5vuphueyuyij2fr8gkyr5sh88wvnqka1uorc4xrjt7ppc89lslpxd037faegflb1fd2rv2',
                        version: '6rvpx3c9w0id5vk0li6f',
                        adapterType: 'loah3ffokxx1oqhhjwhn3p2ak2q9lpav1ybuityo4snf6ym8zjtrn6lbyj7x',
                        direction: 'RECEIVER',
                        transportProtocol: 'lh0s6emdpmrh85yze5to82edawqa2kzuiu06vnhtkq4nrxtnk2xqn0jdcg8q',
                        messageProtocol: '8lxkhr7xbtezqblxojlkn1o8f0hte41wkia1xf6nnh9iarpel5t6v7ni12sh',
                        adapterEngineName: 'nj4jzpnorwosqb94pwd2nal6rdggjgn7wrhnlrvxz0f0a665q67z5byg12g5edpozkktzj3ny7xuapdzzri304pndmz3j9tgnp5vedj81t8rcu23swq8fx0b3cuxzvk4mdxvetbbikwtc5yf7zus1c0w1pzt0756',
                        url: '0g2bwxot7h14bv7tnpyir9zs1mwiycvnvp4s4khea2jnifesp3wzqosyhyg4gtky6ms3qtpavsaxikp19gr4o3qxi1qo2x65ucnpf32ur8c56znrtct80f32wzqbo4nsv1hfm54hzq6hsdggh7r29m845pwq6pxcfiqjjv7ls6g56v5gxkhz008ul677c66g37h2z6k76ozkx7e2zhgwlh11zfj88n78r05tajikfgvgl822ybcmqmexpwpdglda6rhbzh59pd9ptggs57aixw0bw9vk1y3usfbc78db41sulakxr6vehxnnq83bk709',
                        username: 'xcf8soe4e94hz8dx4zzxitelzljhwd3dxp6jinj6ans568q8p51psobs0m0d',
                        remoteHost: 'c6m0ldygy7v5u4g088rbfzfk4uevsplvxjklix7d2uhhuxy8xxkg20hc5mvahfcwem6n6m430y6lypyx5wjxdvcsb1t1awehbf86l8j5b1wvv2mcs16zia6m1mb99bcmj3p4pxyyg5fhghjd63a1022tcr75pgf5',
                        remotePort: 5241856419,
                        directory: 'fxalwmajdhfkl6enfy526u845xjdgw04vpb2e11k0s36x4rdegkeglzgfn3vavmrxlnl7ctjtmr50j8rmy4glttwoli67vptagnl3byalcmojy2zkqesoo2hdp5dxem0oto68fg13nrmlbzgw3xg7qggovy2xjvhdagjsvhbmn2ipg8pwwzyrr7mt3ajepf7id0r3brghh4kplaxzii9ujalswi9w14efgp0e5fhofjkq20iembdl7z8u44fgrim5t4qppqg3lol302h7841jho0j44a9arsiom9u50lrk3beyv2z0xjnm54oigeno4v043xo1ohhh9620ci336pq1qu3pecnj8tu944j9w57943e6zgrx2a7vnmf6cyus4fua7qvi9mxdnhzoo9s9sdduzf3fq5hkzsyemdnwi1mpufh8ictknm69fx9wb9a69sorgoh01649dpfb53b01e32azj8wmk1ygulvyr19ns58ybylpt1mxmgb0c71kqvaucaw0p3ntfek7vvqic3rnk10rkw9xjnwr0pj866wvk6vo8urik2doxbbciaq47p5917xkh4dchcci3n6x9x4dvkis7ju8dc29dcuggvu614uuub9aur0q5cuiebvuf3dbwhraa0ku4tvigivn4enjukk0878nmhxn2am8bh9cf9s5mqsmqvhvcuwdyq41zezxzcd2ccizbo8fnovbrsi440miu2gjkg1l14binliu9kc97lo949ls4nz54x60n65qxqrp8ewyufdgfr61ut6yytdrlsmimnyboylijb5vfzkfha41h6vgovkenokyafvnlrqluvs5hbkg7o543vhsmze68t1mgymf0kmmf4t6kqo5qpl7jfeuatsxv1w9qew382n21forqlrainqfym7a8jr9juq5c1zp8d2wc0qucnx379b6a6tkko9qrag3l6blex9q0bmsucskbm3eyubagk1rmj7ywyfvz5f31hqinagtu9876u05jobz7q0s70fh',
                        fileSchema: 'qmu2t5lc5ptjjkn4qiiz891leynsqqmxeib4wc7b2hlaei3es537bye0f49dapokgyo69auc4o7xxxng87ob68fizxx94bb07vg6nm7atwanje675li3xxuraagjtuvpdn982yv591is3arf39jmjc6f38pg1b9mjrruvtvn7zz33lc4cp5mbscob268ol0zido070evw8qr13dn6wtwzk93m3s29h3h5dztkg6dzi89bkapjbcnv4y8ekrwp7zlpc0t2bz45wnrl0f24zo53pvhsmqqm0jx1jsujw90yfkvmdavf1jknybwqj0n85z677mzuuw2yhzubgoe17n18u60yvyegv179mha0xtnm48mb4vf3bnne45u53invy3i4tjirh7tdw5m19ywjuhie0xc653vz71nq2tqox37q8i6np2mh7ps8vg7etk3oeh69hxh48dbtb8efjddrbvhj5fewyjtnhq0xp7s280tqcv2yyshp4cl4nqdc9dgcc4rrh2l3ojg4uulug75liiimel20wuxgb64fgtnwvl4rpmxetmhjimtiqj2f20thi47qj31dtr00o7eye20nmb6ugrymda1xpk8il47kj7wih6jj83wlg7dbm3iwvzpccc99maqy9ra31fae42xyt5u8rncfvubfgk89q9gsyz0qrrfccx63lt74dbuqkkq9pdsa3demdhvzi9gra1fap9p7bgjbluqiivj6wthsxtrv3i4afo9d2lrlib2p4dp7uy7fnt2l9aj2uy8cmh68f9qeh6ptvze9v65qt7nyvpijh02gwhexl8azgjepxog1hlxaclqtybhpiulrjzyuqjijcmmexxl0sbx81glfjfe1rhq28je4p8aqs2jbr6v1sy9alnvh6af98q2rdewwf9vy4su491kyui5b05ve12m34669rfoxjqx92hui4g24tzsd7ul377i5enkxlzf9r2hx6y85eekrislmhg8qwcs3u4wu0kpli7h9vdeun4zzvqc',
                        proxyHost: '8fcc8b5f3liz0trzlj0r5b6jfdxncdpjmplrvd09jwoqgdv5nv7ho49hraul',
                        proxyPort: 6531865816,
                        destination: 'yjg9lx2um45ufrt7sboumv2n649ih5aub6fywa8h7hz8nphy0blopzuuj0m82kff4kiay7y1vueowxtawyf3uiculb8ayh59304fbrh065ne7da63ozm4cl6wdmest8vj0qx29e49ojl4y58d1l4cgksbi6gt27h',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'mojdu7dwb1qu4jtd2sosigiwp0qjhj58s7mqvm7l7i4rwpq5f34axwng9s40tjo0h5q0qjvq1318sw9u62kduatibfs04k1iqggw8ojdp4s2wxwmljrf15j52fh49nwj3vjotd37uelw0pfddiefy0is2le1zr2j',
                        responsibleUserAccountName: 'i2cyxfd2t3s81kzcj4gf',
                        lastChangeUserAccount: 'z1bzws5t3k7svraai55u',
                        lastChangedAt: '2020-11-03 22:10:21',
                        riInterfaceName: '9wyczvmc9fmsvlk0bzqtyv4ctr7fbxgiy7n22nu5nyq6z9vd36omwow3pjrzc04ea8biseu4m41n0vsi1sypo8ewufpo0cpbd9atwctsj66dzfeddel67w1l1lex0q6732d5xrfmec8jx1snfkzjdj15u3ew970g',
                        riInterfaceNamespace: 'dsj1t75ti0560b00jbi3hdhz3rdggycm5bydf99lcqjogxem9pko99kvb18omubv6y7zjvv9szddqxofcmgqadai5rzl4vkt0zu4ms7ucyl2ijeulsv88b32ze44jypm5bqq6q7lw4v9p5ibwrjvjmc4s4p75b10',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannel.id).toStrictEqual('cc62955d-d5ce-442b-ba01-5723ac8440bf');
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
                    id: '4ffaebcf-6eba-4ba9-aab3-ed61a0c71cfa'
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
                    id: 'cc62955d-d5ce-442b-ba01-5723ac8440bf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelById.id).toStrictEqual('cc62955d-d5ce-442b-ba01-5723ac8440bf');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});