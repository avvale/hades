import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IClientRepository } from '@hades/o-auth/client/domain/client.repository';
import { MockClientRepository } from '@hades/o-auth/client/infrastructure/mock/mock-client.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('client', () =>
{
    let app: INestApplication;
    let repository: MockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IClientRepository)
            .useClass(MockClientRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockClientRepository>module.get<IClientRepository>(IClientRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/client - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: null,
                grantType: 'PASSWORD',
                name: 'mctqjeh4vss8d9pzd0ili69ktq5fdtbi0gpjwkdqrybvweryqshk5wi2ewiw7xbeeaexg7ohwn4igh3vciegqcpdph2elp7xeqnjcqcu871kmuk85p5h1yly0q3lxthjm8nemujuee37o1maudsqdqkylh5u85dw8xgj7cq4hh90zq17l27c1zywnegfdtlaov6lv0iadqn8isqf932ek867m5okrbkd393604ia3voaud9y7j6ll4krx84gaz7',
                secret: 'fcj6tyakc6pnh25j9kg29590ys07w3118sqo1jr2itgyrn2tbwn0lxft8lj022048v3gln9tl9mi9sbgmlonwbgxl5',
                authUrl: '3msqdab6ccdsl6oplz5gswnj75wvxk3afkwetuj5189mddppbnb2b07v07ysmi2dzyc11b4n17ay7vo30w3fmb1bwv2b45ejz8uy2peg82dez76c9mzhx7fxax7typ1tcf0eukv9mfky3jnmk594sqfxscsuq7dtgv1t7d6x0tw48dskiwg6b5sqsuspvq6v4aeg0cx17rxtlqhwrdi54s5xtox5tpgabrafi4rg7jf3ifc3zqi6dj1vbjqwsvdppafj8l472cptk7xm1diauy4ogunmhd1ekd66ouej3s8glueyew890dqgcjb9husw91ea2qbjv7w9902wt4hserwpj26khbponw75q4r817iqtgh54i08xjyb95km3hqds2slya13usvobpj3ypzo7owoy2m5qu4rdwyjixfm79hgh4hf6tkscb3apz1ecmnnd7k4sorid7oenvk2n1trex1p1jp97kdrqtyuhiu41wu7cf5cxmeffzglzcttdehrt1t4uqrl694fp6m04qvmnycsxmjipefpfegwybx6ua8jta6ddaym1cpqwy1er4emne0fwhydm5k43o3xhxqoolzi2ka9uurtpiowdkt8jpzyr71vgat9k3fggfy91xzdqih6wr9cww5gnaza90n6bp7o93r7kqvc9tj22w2nfp6hj5zzn9fgoar3yb7ej5n3s0s7tyd23exsp52i9qyk91nicrj9xl02af3oc1fy6wocokrjmmfhwgwabievenhnrugqvu3ni1dmhjyehrzg7vgfhm6dmivx27bryhmxuk7ie5bggd68g0buxodomfu9f25lbrdoneyah0epnsrlzva5ixkfzjakmwrv0rqx4khe0703bjnblr9vcc398vuvulnv23pi9ku49kabgwmcyljlhkyqj42dq65k48r528qhnu37ex1rmq1rzkj8nazllnuve7kyd7b6lxxa4rfh0lrxwa56gvei0kyoycagxm077wo6k0xy5g9ogz5f86y2257d8orzsbfbp89s2kimd10o8dg3qvfjx9jk0m1j5w54p95npg5t7xda1rs1ztbqimgw2bxwlhtniuvf4r93fuocwuyd05hqapi6tc2um3bozc23l30itfre10x0zxlou518naldoxgbiimzaheo9z2je6ccre610lrwhhxrmaq7kdcjaghh02meywe1lgw12fusvupol42snjhq0fg2tl9uc9xu1aywuw3qv35s4du2hms001p6bgusdqdtuc89tkh4b40bg7hycxvxt4puycr0uvtxgi5sxdzw42ss60hfbhjy2yire20vqehwmc2qjfz4j4017axrq577u6chpvkesconoi1ackvpammszr47w55szytnqrv0tea7yszr1vq6cuy4gibtcseaiwo1bwpifmd9fiw15i0vc93x1zzx0zkdlur8b5hh8k8tcnh65jqjnhdallbp0u7dmaoyx5t0lzaziph0gu4ae0qleczuuqr9rlr86ld810fofunthaw923c2s1vmlhma5gikkx2k2a470nd2t1mvd5joie7stcqvz1xcq1e1galakm7bgnh5ul8sexvr5rlwfbjkqhe95884ppfz2uzkaegzakdznc5oi5gmoyxxnx386w12m5ivgfaeuil2iq72pz5cm0aj02wzgkcahg29uxffg85oqpl6kaqwyae4s87rx9227vi6894lwwkx66opxykwp7s84h5gytpjkd9vwfyd1z1lw7mogvaqy9gmrpy685321vzxwexg14p2y57fympxgo65ghjnb2z074xlxrfp1ll3yhkgpa8x2v35gw0gs2j2ej05lfe3eagsg3z9a79971quvlfv7c9ep369wkkt3fo8ir9th44zfbti0sih9qqkwblrnhk7zonooq3pllus31xo3cs9ngfnl2ijusmgva1ebgp89ifbf7plr7hlxax04zpufn6skktrwu8vwcprrwhhein874cfdqkbr7tih8l5jbaa3ql4c9wxjbq5fb16',
                redirect: 'yb3vut4fhqh5agm85nfeodevql0n0ajzrm3w9qtarkrpa8ido9jjw121xium694o8l7l02xzowjldnvo3g7ud337p2vjlpzxygyl2e8n9v3rsaaemwet1modne2l25agh9vhae2idc32pbegm0vpu36bc2ipetdg52k646i8l1wvgp0p6pmc72txp4uy7a2wdcf66411mz6bksjzvt6keomo7ncf18mel4reyb8ehe63e2z777jtnmx0opwpprm95a1gxg0a8g23098ji0b13w7vg8y8svchqrueuityw0kzpx85x7jsargg5p2knsalyfzgenhclto70is1emxi6lg34khzykxty41matl0tnctmo9zz6vmhdpkymmarp7lxwbbto6cpqg1w27zl185ev0eq4nz8j83ybt8hadfklm5sdzj5ncz6cp9u1bkhvrrs5dy9r9hi7gm3mgprmomlk2bfh9m5ksx1hfugiysaan5s607j00ar62a60qcwqnoix2p9jd8mc4t5x5e867n4ntc9y53nirzn2oo3d4fo8zke5pn905gkrxaxkgfbixhv128pfkw9g5yxiwgl7yiy5pzuxcgjyo4oq4ftfcll9mkbxkqpel63m59mzuny9j5thtci5zbpbgs7lnp3mnszpzdjf7acq2j4bdl5kpb2iw78a44tbff0v6wxvjaxwqh1qhfxrxt3w8ljpm35rtgxtyfrz5ztcu5jr88isd0aw8miqlj4m1qwu0100ctt8dcdnk9vnu1t2gr4f1lyc3qvw2x21i2j95d2fbykfy6s63otslcip0x3mgt5kps2vvkyhw4kz6ds9dkf00ozvypfwq824pb086krcvvdxyhw2bozflwo6boo4dr5f5cz684v3p0ozuddp2noyi3lerk3lx8anqq2rjyr59gjrq4mz6yyyv41ajkzdoklko7h8gsz3rqcofuoana8nxpy1shpw13k3xt8mxtclo6e6l44orhql7zm1h5d17ea8zkp7dpg0rqwj7n5fzrpp10uk87bocrl7rzp53y9ahh3tlkzjhkeaz9txgbmj1br68y8v3fdffnfrltk87wgapqyyh5x3kzygl0oma5y8qr24dchpw11vk6swjxgwawn5n6j03ttgphomg48oyvxwkrenvww1ul7bdbf2cscempmzrlktdry11yqaqcug107tn8l12wc2bl2jkyrw3j3a40wofx5wo3g3aro4nvj87t9s79v4nmszauijmlwy2iil2jimj8ue7kh3xax8bt2yym2su9mg540ruysj3hg8p9cw180mvs8y1orzhuro5w53sf67psdj2rod1w28hl6lk4xdfywdtvi0q13n8a848jhdcj0bx289d9pha1jcyvqrtjwo4iye9yhalb62ge55dugkzvhql0fdf0m3gmt9v3xjimjxu6x3jkjztjksk39ghrxcw1omyok0vsxfgi9chlix1xe2lki8dhp043firx3z0htnglmfvgcfku48sl89h3dq1ysps15qxp9gq1m899i08cvgrp65wpsjpzft533axyxvi4z2qp6ozvxkbuhp5zwejvlv0q54u1kw0h3mrmlyj75sk989cvmb219ozamwucc9ej9i92yy8idvglvbsek1mrl2aeygy4b2s9i7buvsf71kw9vlgaw0lbj2hxjb79zmtb88bz7z5ebcowt16yu5emblskt6cht5cr235o6bsoff5uxqqtalmoins38qz5fnzyo5n2wdk2l4xetm3ql455iqu9q09u7yr87qpohrd6cmkytckzjgvaupzytx2xlmbg5nvhle3mlxup361699koizt30fn8zvfm5u3h35di5q1v4wnmaoyao2gpwxm323684a2f4lp3iofjpr583etg9cef7lf7g3bfel1btypj52wk2r1g1xm66kaw7qp5kjkuay5t28wshqkgbiviwirz9b4jsvjv0owzysnidgflb4frx11o10y6aue4uih5guft9thqdwjjic15gpisxd3r',
                expiredAccessToken: 7853993694,
                expiredRefreshToken: 7325683693,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                grantType: 'CLIENT_CREDENTIALS',
                name: 'g8tqcejhr4uuokrm4dijne4jmhqva3k70n9iy2xeq8g5814rctmi8jwy5rzg6tk7tliqfmhrtpfjea4ne8by3symmpdbufl3uvl5x996n8x1x4t4luwxhdbmxjrgbqt1dw9j69n428djzj4c3h2lbim678s3f2phk281dqwt8snuvdcaetui2yfrki6mz5p2xj1be1kz1wj0dphg2zewz0bbxuq9efwfg65gi17pjdpvlzt0xmp6lznvnhxbt2v',
                secret: '7pdmzhqn8pfsi3vj82w0dveq0fly1h02nmvl8n2y8nd99op7jlstdcja8pdlr49pjnidf966pu6rb4romy3yapbdur',
                authUrl: 'u8uv23ufwk9qq1jy54qvv5ppts49679d00jzqp3z1fw5ozbtf55u2xp259v2h44fu6dg837fgq1mmf0j8pcwusebv6vhuusm9jesszolc63bpdpk5dsy0cp4quvkvtrujoblns67b17w4mhtseca4yxlz5ya0don8l59wd7v094stvpk66qxg2ftrih5ern7uofkvzgtwznodcg7iho24dhenvamgw20kcp010aotn7jcd1tw0h0louksfvvzty1acflka0cd5dm9bb0oj2cov2pbm7yljcok4qf21td6703gi5yo6cm7zlwfp2t70aqf786lfu55uzx3mn7ghv4r8gphm61avrng1dti59ivzaw5cdxcju0tiafceah9qgrvzy4zolkdibrdfvhq5x8c514pm692dcqdvlmgzwxympxa66zosccauezgsd4vz571jibs1bmke8jicwl2uh5140t9hkjmki7b8xzbmh0uslol5pfizovpvfhsxo2qm8zylsni34sbrtl5oz0knen0wy9i6olalyyptagm0ob1h10nur2u5pwx4zxl0wzfy9ki0q9yu8gb306mmpf2c57ktxo9f9gm0t4fjtzdjljtvymahmtuyo6vvhx074sqkft0o91337fkeaa5wk009qspo1080pwkok96vui82nu1cap43943d4mgj6b3x4mkbss50z2aktx3c2saqlzp524uzbug0ujmhct5opifs34fc6rzp3uy3h27uay7tj1txdayiawc2toxazr16ejs14t7o1qxstnm9ypvdi9iplksp5uvlnjxhjauxk43ujm7wk2klwx5n73b63fa8p46eo079jf64ee6l639ylk3uam25m92mq73nltrxi3vvhufkkr30f97r3jgnnw80zjejmcjwacxp31ak7j65fd72m4rjcdx3s96u88rp8u257n1r2rbyv4jevy8oqmvrto5aqk5iengv13ry45ppasxyapsxmsfoctmfny8zyfrtvdj72nqsdok8mlcqvk1448py9774q2xtupnoproyd314cavelxa9l4614rc6melge2xxeuwswc2p69p25ulkhufic9dmm1el8edtbsc9o9yhd0umblu2mafbfw00ox6kpm4gr8ji67bswlbmpdpl5b93ol05l1pfsrs27ln6wezdytv2ck6762a1sq2jh7krzriv0fuoaqmjfw9e73j7ff2qchxtnf660e3a6bin608gda0kune87za9y6g5ytpo7pikius1ga1ykgry7d85atkgqyyeozmi21acg9hf11arunvfenj837qpmun7srmpejwmz0yvyydcdhak0j12hf2k4umn3bqax05kkgosf54mjht7r5hlm6mjk71wblzxkotn0eb189w8v7bofo65czxw1s9jstigmsypcdfqwl1leuhje0jebqi1hadni8hp8ryhxutxaom917m63aqexkyfnxvb1p5d0v2hm366ww33ihrbhoazul2isbstva57fuso92deuk7r9kwaf0ha4zopukdsfzum8fiydwb6d6wyi67yw1jacwgtxruxt8yu90ggmga0zow852x9unlwnf6615anin8crxs17v71vkoz0bakwm7wc8vx6olr7bnrtnpxv2j32komsyn40c2vvx9bhuis8bwv78guwsall0ejlligh3s7ikn3qlrkgoaapo93c6qoxjd18gksjetmyypi0b8zc9hok802xc6ext5bphp298ca8nwy2ltr6ncayv0u9c7ch4iphf72gtlxi938axl1mg8b9ok9yyqov4frc2kfla3zo8vx22axu90y3kexgeofty6yaumkde42f2mo078scupikj6fp3l5eud8tmlz5xbjurwdao2r9ymeyo09gglm2y2n7eg4hldy1suf51qr8ugepf7og8f3vxl9gunrbv9jmau8ga92u4ue6vu5p6j9yqplz9l5d5c7n30tgk835rxrvl1cvswvbof9up5ixdl2ce5rc0lil22bog5n5d',
                redirect: 'l657a54icxwb31kbnhs20mzmdi2kggqhb5gw1ojp7a2987qltw5qaeoz7urxky3c88lkfebdl13emj97i00tdr90zl5683d7xy37ftr2j2y7u3yboyqoyq1fat3fzrudake18khl8678myiwvvcvwsoy7pnatsgr9wloh420ijymm3n4vywgiorb3zutrcls5g5ppwl6dh7dg4dje68t0pb9ia7kpxkhxi9y1hsej2mx1wpkhkv6nqbc0deqoows45pid6fzvqnc1qygg61dv3m6hfamzuiau8k5gbait65xeqmvkhbroxpy5g0lh4om5hi61f7rvk1r8mb0wnmrj1rf6sn0c9nysv66ico9td06ssx0xy2wt9nbntz1l5s2n8itrnd5pn7rrzot6ttik8wk86qtapds869cm2xx428p7stxermepu6y7xgf8f2pm034rfjhilffywah9wsmeepnhemzuacb8cray2rp8lec57qcrn4yxgm0qxhvmyfd1uyd0agsd73d5rez61qapme4yeb3c0lcqlbopapbiakjpd1u3xrydffqwz5bzowr7d0glydq3p1woy4iuwr611xn70ap0bg04f8cx66qy9vpe5r9gh42zyd412xw46kcv6kl4apnpzm9enurc5w7pjb8r3gwi6xjdkpm7ymfobfo691w1i5nwd2yy9x0aak60x906ye2eaj6z9xvvj44l6c7xt3zt1bfz5cgwdckv53rb8i5bmfx19urr0jojtld4429n3ytosei2fvbsm7oueloerxzv90zy4acfo40qoftqtme6kn0c8gz6le571ulwy3q50unxn8vu4tikyubfej7lcng6ygx3g91v2a7soto9tnn4vy6xr0dr0kua5iyk3pkimwpy43q9cyiwx6yj1teq7cpa83u9peaqi8ul0wmmkqpfof9i8xyrvv6k6glm9pihg4j17d6ex48i28356y3naqv6b7quqfqbc5dtbrj838tye8yhgnmrev2xkuo2cuxwltbbg57d2rxlle945cjm750onfguzbnk1yrzgj3ydf3159n0m0rn5rg4q3el1j73z8ysctxhaoczxny8ugemcdt9rl3yfn7il8xoxdxb4o6vizc5v73f5ssvmye78qy6zv6ts53rcou8nyuwyna8kbkb794madjf07lageiq3gggmtov40z799myt2ef5lpmvu05q333e0tgv79k5ulcrdd7im3qw42sch5eqk2zv88u3lh7et40ysix23kma6u019dr7bpgpz3m91x1rc90pbrgyxa2bh43h1qa6l4fgkejjagfu3n76wb0zgms1d131s5mhfxucb0p2dzv67hyjsihpdt2kqh0tjomtuli7jmzdh5ri18ldlule083f001q6jw9tksvtw2yc8uhg0pizbdg11mtzg6d8j8bspoyyzxou7y1jdgjbuzw06sn036wqep4fmddre4taucyna84nhy7we69sbckz3xeqwzk3u4mame9p767c61xb2r2hg8j5uksql6gf4zga9z8fvvvr9bwt1d08onf9t1zwxtk2k64vja8xmoah4l9u04gsmt1lrbc53ue0qx4uqbnv6lurszssq90aq7nwonra8aghs2vk78rsbjoo1mvsj8ab0n3hfe4o4v7y3qzswz21nfvswiht58ea3ryis2qzyp1bwx3ypzdntcal3j0n9b8b08jg006sxng7oq466a3wqrwbuur59bvgezl5qeszmb5hsh0huca48vrkb7nxk76sh8jbf0i37d50emz8zlbwhwmc6wv7b0nt78mu7pdzgg5jcizz4t2uigf0trjmi5py0j7g8f1n0wya2gaonv4lne61244657744y83iggtxb6npfl51yaeqvt6h64t0hi2zqlzibmdow0tf4cpyq4xcwbs9kfbwnk6o0qqe434l6xneccnwe0v4ge5s8r16zpavmhw2fzwf00bnx3mlj586fvs8vbmkplfda9qwt3hrlen7myornxmi9abx3hra',
                expiredAccessToken: 4332206776,
                expiredRefreshToken: 3770124924,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: null,
                name: 'ietsomlk7gsha4zr0e8q17gvny2tp5ajje4210lzdindyhau4yszbn4ufp7lmxpikhnrn4iijbmo0e87q0k507pzka1a7xe5n9gheknyxtpqqbf3wb7v43i754v4tu62zc4rqkbeq99ylgcgmgwe9ak9d9db3jssdcrfjqin5pqtvcpbo4o1fj4gi2dyrwo2lgo16vj5vz3ht84xgrcs53e9wbyg1xomu5x3mfvdq1ogjbzlf2fcbgw8qpcge93',
                secret: 'znuclsk78a1su57jc3r48r4apba566u8r6ggedyfk3c0twpl4fx8ply3vw7ywmw2s59fer0u63bcnrg7xj1u728min',
                authUrl: 'zpfkj3jkqho7pljmmjlj9cum4mpfpp82z5hib8c0of3plodv5x3nmhq3hd8q41xg5h8hf5gc71ev5l6sl08bxvo36zgbk0lt9dlgh6dfa2mvth6ambr4s50npjxwvo1dzv4hm512c8bwlwvxcg4ak1xyw4msynyt7nzbndmz8ned0fd7u9o8nxbhcx7yuu3nctqs0x7xg0ris4cfjqbt4wj253mt1iw9vik38oj4rczll29tdtd3iymhyg94qd492odswbc0up58tdoldvaa25lt166vql5t89fp59idxwq40pgbnim2vosbcgyojfdrv6kv4v3zqfslfth3lpvsz7ttoojm8yj0tpkmw4ji0gd42w8bo6nowznmpp8jf5qnr23xm6uh093jvlea8x63xc919tpvxun06h5z1du5jbp9ekgdnuuvigpvv4j0jxn6dkuxggmd7qt3e6uymi373q2j4sz2mx0hn93vw57ud20v1a5hn6fpjdbu207h6m3z3ytx45ztp7an63lw15b4q6j61z8pmfpzwd1n2pvi0zjvt2kjol2g2n6c413t8qanegqkqukjzyqbyrmcn1qlse8ekejy7g0jldv3b8qgqib5759k96nz8e8aw4mwnlhd4h7ovq45y3ram1i0m5v7l5qv1uygrvs7ccu6901dq2of2il2hq0d8yi6p2f6n82wlscabw0e5y7vqtfsqax229fz49ptref5dgfpmqj2lwieiaksp553otzs5xdwyawn74g2dr5k8ds4741cyx6harz547cokh4vyqq8rlijm3v1sqhlpdiy3hd9dinbsafu5vg3un62j0wm037hu73dazwfb4awrj9ibvqmi8ecjgg798ttqhc27ed6b32sz9zz1ouwhmhnoi31eh1min6vzaruryd6ubu7e8emh48wmdie67o2290vh74kztxex143pinc3jj6dk7j34cqtrakb3wnx1u53b51cxzbfx3czr0n09zuyfswpljvh2h42ihzuobie9nbta3fe4decalrndv4hlraihdkunp0oo8osw50dsg60lf9han9sm6pqxzgvku2z0ovz2othpmysf4j0ywp02nqi1542862wdzmuyn1zpu4d1gs6zubfci0h98mzf8l030lxyj8doz2mh08b9yzjhmoawwtp7o6iv3c18ct0s7axwo7caoiw7cqrrjmjqibqk0rirpwydjtz0mkui7t9mw10t0k0ima3cs2s6xgr5y7lj37uejmb1w88wmgsxpzvybgfock0v1dlf91p1tdcmqc862vbuwvje288id6ziqdj2uu5b3kgvtkn25vjq8prjyc0iixtyi0ltq64x8ynqls5tek5fe1q0xa3qwwf1wtrdcvgjcnki4bo6bamfmoakl77dj9gxsevizfudc2pn32p85238cag3qo4112n60e0tswfstk2smmp7vmuijj3lurp3wastvsxvi1jv1t18ik41z9i4ionylkbmqu7gr1kbgkabr8p9ymz8c7blm906pypeuseagv7pndd58vmvrq6wzygkxsorazo25c3zkkty7dvak977oxwaaia3ythtm1s36yh0h6b9ls286twcy6ip0xhy4gscr0d5pha76ot5htshsxay4qxvkja0ghmikfg3ohsf69izm5rckuulelxx9u69wi28ewp75z6wlqvfoecnm98omz62kh0xta5zlvvcbibzoinoncj0omggj4wfc6ondrxo24buuhmyjgdudkaalkvyvanuunv3oemjfycvgscn3gtzf601ux8nhwqm10x5kz8fvpwoz2q6q4wbwtj2w85wrl0zjdh9etuwi74xwbk33412iwcoc8t6pd4ctp478t2wputk6xfbs4904dqz8wze3fjvbhnta169kzi6jzej8g7kvekyi9z1gqrseb4qqkb2nt9ca91iylavm3yvh96bftqlzwduefgk0vfkkyx8usxegr1pychfzsnozqn2650qr4jg4p60w65yi537c5i11iknqt',
                redirect: '65zfk6qnslpgofa78mznflwi0ddh0v8ptc2yk18kjhquwddlaapse3vdv1kr6cwcrqdldkklfaaffopuaut9903cxhiuq9n0ade5cv1h3aysl9bg3v0wm9lxb67m1cmxnn2jwfspr72f51zsgd1w5rj6dn1t9i9vqm0k9cxlg8tdao2npluz20d3rtv21u222zv8cca12nyvx26e90ej2yquvk7qv60s5wuo9unhsyg8rxnjlzcozw9vf47xvg29xqjwiod5qcl4bo8ihfuptrnyq1z3w2m0obki7kya42xo31ph25tgjsx5dp8hy0mv8fsc8revbh86i0pfvvbwpi6ozlsk7i07vh9fzf6ok83tr644sdeepmwn5rmm3was3yvn0ubojch0q2429tx3qsnkq91kga3gaoevw1cjmhey4njjgy7o6byvsuyc6cx4lzgfc96z1mgnp31mahyq78xfzcbv7ngdfu8hblw8crqjl6upty1dhuu6f8qr1q0swhy2e25sgzb8ezh1dvld0pt9sfm135ady40e7ie099ytsd4ukbol8dlo3yubzw59gs6k4rule0ru9iy50q6hh10cldi9f5u44vvgide4ynd7ow3ces2i6ioyezbbaaf92du70qttxmbcnbij4bkvyi4khi65k9t2n44z74wq1vpzdqmzhazoswr5ycuai0f6bhi23g9xs9xtewgqj4qq0sc0d9wp4ynhddosji5coeua2nmbzyy79ncimf8f9gf8g5zj2h1be8dsumlsocrp20895jofjiplpykdvigiog40tqvx34z9eniu6j7qkyakq18njs0cr050a4gxbsm2qpzn39sqzacaq33vki1dhu9eal6ac1ju70a5d229l1rthucqgifcuhprv3qs1cvdjr4xii0bcku067bq1q9kpjlis5khmscwcu1gg0k94rayesmzifotak15ks3pakyl5x7d46b9f9ukjqg5szp76vxhnxq07pw8pzf3emnxqapymdy4tr7dt46hswfuavm6p2cw1sy3v4gh4shuu1ygdaaa1ip1d6pv99dwptxqopqcu1qm996dlni1gedmkh2dyvnhka3s29wn17c58sjii83hh6s9tb603ohgwr1us3ny5qpuo8dobw9diu4ngqgbicue13a9cfsp2oc509sif30f5nf2or6ucqyt03rq8uofci7ekfjw0nu6pmv0t00i337wy18aobcesopo4uluzadmqixypjkgndv1pkkdpubzdtu1tywppngrjn9r8sihtcx4opjd4hhczbod2nuwfav1khp0nf1yt4a0qql7hfw91y2nh3ztv9gles6adto76uuwlugi7vjlfl66qnwdiuf3uloha8w60kpv8imrj3bao51n05rrccywyznlin4avazikxq6u89z2ciaek4mjrs00kfxfjoz5epwkbphnkhabpy1slhlj57azi4ig7l3jm0h7o2ltti67n0rx09qb8n9hoexei9jzqca0a0nn646svthz85uovtm8e0dgn02r17w0s2v8lffbhc4aspnnvhwkh2ew2f4uw2p5txzt1w07ve9tfoiyaqqw2xkl46hsmfa7cwgex863vae76pyw3vlhscsu38vo3t8umv273wp4a88t4s7y8f469o2b1poqebomtbnr2cwuqwb6jkgwiufkj5fgbykceysduhwlt7k5td1ynnbkk42l0bgwjhdtm0fq8nd05z54gz3l0owxgwca59gfk0xheavl5n81c59j462gn3wyw2zgo0m1bz5wtpbg2phvihltj508rgaflcgvc2xzekhs9zgsqk3bk1vu30oqi2qww9hnvev6oj4syidrsaqtuqp4dzuq2uuz3d4g6qeyhkvyi9zqsnbjqgljuphxi24wxuo3466ffr4t6rqmrw4trp6nrchj2h2ody8031ksajx8i29q1pyp45qprcwctma2npp00bud8f0poad8exsre3dgc6j4l2pi6mo0suxuuxgbywsmz7z8xgw',
                expiredAccessToken: 4080954017,
                expiredRefreshToken: 5996092358,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                
                name: 'ol8ku01rpeutybr75cd7uchd8j0emxtzgv70r347vuub7itinvmofk328hriucecep1s5st08z61w0d4gzu4hjiespdfjdx4wo1ivrjszpjn75vfnsvk1xx4myw02s4yywfhhya0d7lahat4lz9v44u351a9r0qjcika8dnl7tgiiavypslu1ikfs3d16zat3lmwu3ytuyj9lot9jv98l5xm38pa4wwpxwkoaksxueneasqdzqfk4p1uyhrx6jg',
                secret: '8wopwmedgoq3a3dbythferduy0bnnql78jf0azpmxc03r4xikftavby411l20bvb9lp72crzatmrn85r3kclhy740i',
                authUrl: 'yfv6na8cu6buz9k83oltaafg993ee550r4966fqj4kg9hn8gtv23rcw1otuix1s1t6zcunj4q2fxkl2pek1s8yo2lctb6nvcrhp9g6uwgic3x7b4ay5rzx771y3h1wajdxn3ecgp705rigkhogxf83r3i1fj969mxekj2hpp6cxbrl9nom7kb5n0psh2vo1mj0v9y1x30qgxcby0qqyzoyho2gvzz9tzorusf4kjmuihx5ea0kytgm7mmfjt7eh81u6kr2ioy1faasaqt4yfn7g9xfub35kjvlpe59guyj9k3a9cb5n351qc3d47ysjjmlcn43syc5jibhmf0fbkte82pl3om3p5asvp8zcgd8uojk0joht7hr7727r1hfljoaczruqyhzn6nnwi943gkc6m1pj0mcppc9oa4m2ftp1n6s22ty04998a5lc4ssawqnigu00mora2f2a7vljyypa2dn53a1bmev4jw0m6510vjjv6g5g4o20f8e0l797108a7cbdxb9vkbs4gif2iipo5bc26h5d7srwzenr6ttk5roc110sxpvxdioybfjlyfim9vjeh5kaz2xkp4v2blhi2e4xajvu1clx4xy45glgnorv9bg9n8nha9q2ev5z6y6t18io475riqsa5w8ymfaj604j48tnj44wlfpuybolrvmv9er5a5tqvm28zz7np6ked1w5xdg6tnj7lpgn9migma5tiet9hsf5bq684jvatvzot21cuiqh4oakdu7k8w7imdrvw3t8kax9mfyo9zggb7ryd7uaqu4jmycry29j571l7ww8da597d11nwva6owuiupsubrgrkwanq9rpjityml2gql10rgg3w6coc3y2boak9lmof8s7sm1krbvz37tfvkjoy8q1nies374ffyc1gcc502lxh2oq9r5fyx6xkn4jro72w8809iz5uy7fcky16aasu4z28kbitkskn9tafo06gb2uwn0o3xwazud349212i5sagfilw6x1j3x2ny6rrs1063tiu6rh5efxdgysd8108te8wflb7ougy6wbah2erk9z1dr53bqnjhkq03hxsul69cdjy45yurs5y49n3he9audbu5zgzruo0s4vcw07gruvg5p91vhtw0timxje90jopwg17h1c30rht52pt8xr9uujsnvwycek93dtiwkmfo6wb25dvd60b4pgqfruseytvtelnxy3ugi4l1iyddd5rhk6k1ufu3c1odu0anpue4i52f0xnm8p6dsftvujb7791do729h7gwaoldue20ak175n8g5y93lr0g4oa85w0uvw2azml4ubr932uea1oa3qvaitepphc6h0133wcdktr8cbmk7i49mjcqztbsr8cig078h6qplow6qig4etix0pucsqfcsow584h1kavuieflq8o4jk11ngq3a35zlgw3n4427zikalkd01w1bkivmkfh2fpypuk1bpk08hkoa8igkgknd9zw1vmzag3fkc6uic8v1rmp9jcxl0ri7f06xfl2tno1era7enann0t4r2vrhf9repfwbsy6nvltu37t53297hjwde05njtwxapsullejz4dn46lli9kuzg0p4cifjr994mpllb9f6mq6j8t6u3wzbalgad2ycat7dnmkjwfwtaovqs986w4smzl9kwjkksif77aoqd4kia4zr31qjgvc3tq7t8qvywbar4twyqeho2t38ptgcgcoe7t6woq5u6odihpsluquwllqt4h3iltqnwamdvja0ts8dfd1m9v1k85fkg2dfzrfcdz1hcvhaavftueyr6fkr3duazvdpd448v71gjwkrhingxig8ecb69uqy1e6707n02jaw51yvaw7a4ajmfvel0dnyjzxdtj2s1ad9qpww5hc056vzeqpts4svk8nu0fzihq5hq2epvy62rtsw4nbkuq8fogjogaldkmkqlp11lwf6bou9kgn4dea0uolt2wsq76wvugrykw7gzgct2ugnyzd78gt00nffvr5nv2o',
                redirect: 'yzse7cbyifnxllx2qw4tusvhkmsbnhdm7evmqdi7hmwoctiv4zxyiye9aaedtyxshx8hctl9kpc8sylgkx40x4l0by0srtdzq0zmkdpdbhs3msnj7rtpcualcanawq8ttzi8lu71s8wr4mc2q69rffwbenxk68zsrtndd08mhp2elo8sbeurxe5nybnuhizdnedpmryv8q0cknazyjxpf1azthjdihq5zawlq5fmg0pjg84st2esfjiuodfpye6e9nbb42mqbge0xz6n3o22pypb30ik4a8xekjaf6haccen779d1b3amexn6lkm94jg72i0efmpmpb1e5zycw2i0hf41gr41tlkcbq8x3s4bnbh76f1s9n7zpwojrmwmd5eoybyk56mpp2v3sq1xq9ys56jwd8w7x4sw1glhkrwi7eiu50fzvk0b7ag84izeydr3dcjn5z6s8x34xij4jhfv67srg4flb73gr9iqegt9pdxmhll9giyehw51oj5yw7d55th3g0nd544ravtuxgd1ff10qlxvchuzhf02omjycif0ojqak0dmh6y7otbwaibez003iesg3d74glxcu2eq9h0pnpyjx3uhq8pisdvvlvjvhs7c69vgucfwybgb526siq4zovben23d0ytl0u5v27qe41pjwdcmnbw91szyrillbnzdopbuzbbawlkxvvhsufb9h0docac7ssuzgsys90ggtqnv8yqy2yktq1k9msf0zazm4dw6d86tjlrndf3ittcm8gb7k4r63nokpq7qpfq0di999y9fmpr8pcvqwvf6e0ka8js2cyya8oa749kzpdo6j3nutx0iotg9g8ggx1eg4hsqacwm3o6qq680jdbfz17xnbytkb0heqpj6i9kggxqlmxqvi1va1l6v7tculnr5wo7jushdalnvb039a63cngk2ny50ki876mh9thzxcdrx15ju1i2z9qpcv34fihs2v7zmwsxk9yxfkskeqiaw8hsxpvd2ocotn2ik215yiwlq2rbnwfux055wolc4syixowpndbb79jzvmfx1xrv3yql215xznrc9cl5s1c8j5evh2pafeufyjhowihqh2q0lff7uq02q10cepfwo9dqpxmm6t9ezugrcj9kb5hb7dnul9epnjsnamf1t2zf2d5jb4wl5q2iig0j9zwm1qk18ofkwhwlq0pc9loftyc23cgf2o8h9l1r2ur9mvq9rceztjz0k38aaz99e4yedfbkknk7h668s48oujhut03q05wxilmemh9g519mew6mtb04dxfstwu9b00hryb71lpvqor771g4cjteyt1qn1dz0pnwih93qikugbe7yf6kd4m43lbcvij5bez4ifu6qp55zun56p02pk5h5r59uqrnph3r8akbxqu095xec4172tzagqq5d4yoage30m57js3a0c8r6iyrvybxptfr5xnsyhafcgo5i8n57o0iznebxxk45djfniq91jzcokd55prwdbamtwqau9jz8xm88zul4cnb1ld58l1ypnu2wp295v7gitvv7yoebp8410o8pkjv9gewmr15h4vcd2pnjtyn1eetxls2b49i5sv0cqxvc0jc60246d5sc9k66wcgm4miz52k7vpyloje3g3c9n5itcnxao4uh8dt6h6n07xed2iq9hit5gkg48w7shmy4jkhdt78o89gbxi5f6f2dfj8gxuqh77cc8q885l2m65dkdoyxw9re3b7bzn01pajidofea5wdbqm00x5bl3fqenfv2z58v4e2usg960maapge9xr6aw2p71dows8hxbqnxt5unhbl3ya1bv4hi10i0kkvpuo02pqxeo159eykjiyt5xs8rvbhsafg8e8hvb1tmozwpdxvgnbeq12r4pj2xr8ssxwmrhlnkgvb6qlvm6ob8ehd7jrp9tlyq90x6djx9z4jx832hr4y93n0i8xo1gacol2b9w6e2g96do6on70d1c7ciko3sz3h6g3gkvhwx0ciacgijyvi2niztejoeg',
                expiredAccessToken: 2718092108,
                expiredRefreshToken: 2729112393,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'AUTHORIZATION_CODE',
                name: null,
                secret: 'h62yv8ugj0stefwu83eu7fy6iu2p8dj4pl1apwc6jag5zj06rvh37t9ujw86qptdoe1kli4v3vb7tvkctrrj74aot9',
                authUrl: 'z41jon50e2022yxf1mz975prq6kmnr1eiskhk07srqtembtjp57fflf0kuu15qscsf5brop32mtut86gqfgksiwwzdtmbes4jwivaan6tsx1ksihmbejb2jna0kdzj0pbi8g5d2s5ljx69blv15bpnnplsfhgu92h4d3b4k4cc5ciermelqwg3aalun5biddwzuguc8ab2q9eev3t69z5k0juh39wzqy5kp1l0cfw8grceom5ogzhozhfugwbse4ts5qaz3rw9oq3q91e7sglydozzm9dmpug71hb8zdttw8eeszurkf30vzg85ckgwa6ozq5r7cor2fhfyea65dye2ksrvm7ghxdx6x4jo0nku77t4jwslqrgrmh36h1cb351ohmkc0ml2reww5gik5mlpwdzfv7zlriuvwjcoy6nq5w9bfe4w0t6wfa0j6h19rangxlj9dcctov9c45em773yv7mg4t527g3e8y1kuo3y7hdgxj8p8byrh68gwsb6tcl54j3lsx8ex2nmwhdv068dmr8gcut176afhvqjaygirexqthnfi00mojbn759uargkls2snumgq3941xyc8rkghoawc2vt2m6taakuzzrghradc5rd0gmuduz94kgdmu6tyce2x8z306jxeiqdl6xgqi75d95w5hkm609p7ia9684kgz9wbld9q9hfpmow5oa4ep44fnr3alrkr7c9rrrtlp7ceni4k6n2p8c4vl2pu7wazzfay2kpuphfl18h6633usg2os48agk9q362hih10utadqqm3frufor00uj9lztrkcbl8h0rpeq5qwope1d1ujvwezrpwm75791ok3nsykyh5mow04wkcn28d4ujln3ucahf4i26h6ihl4yii6x96viemviglve7f7k4rcowb35kjml33il7oq8ukw6jmcakho1is0tlmw3o4j0t8ln1bcsrk37blblg8pxelb5bfceo7mdv7oielix3pvvjka6mt8oh6b4oo3aft9k7ft2uvhvvf0lhezuamljlglt7gnutmxbl96fkz23njpt5vve7r8znsajmh4b31ajyeyz438i1l29alim4fnuxc0xkppeaz7b5z2fztxdw89pq2kof0jnci99jkm9ii85fkor4nfofgw2mshgd3sgufz1e2m5etfe7qa6vijmx4uhgk9f5xc5c067iepktuitv36yv9zact4lo9a38fmyhtaztu0vpsw9ll4oglmtf2jdvd4ytgdfb2y2i7vnd1sojko858tycefuvkqmbesr845xgbonfztxun212ccg2mli4f738ogfxk6rwpz1ymhbhj9j170m8xnhkba4m9gd369e8rjl7w8uql681ijr95leajsz6k2zvw427fnxuz5mpez3pvjyksr5jajh1y6fqc8c6fgtoyhe63qnwjhxog719wtr1kr39j52ywj3k5k8jd9jq7ppmgeuimmo57158qyacs4cf3r5vyc1vjnh2q15cnar28lqj0fmjgl584ttjbm3u86y3hb7hq1xe538kte69x4fx713lxd63ybkodggkw836u958l4eiccmbq4d0n21b0mjdp73mdz18c1f1qv1o6wlih11t5yjefwjbr7l8im04hpk9t4rwc42lnuml94iuofdp52tr1cy5d47y00xwra0vq3k8h2ms5oa4tfmd8321upxs6cuccm8frwe1pxyl97aj8ol0eubvl2velg2r0rzzwujglvc3hkvnv3410r6yr2zbkm79bkfgak79n6e3904qcw90l35rf5anipin9wiykldn7ojx7j407iialo1gtilg5twrdtdqip5tnf0gk9l5yb3r4v9mqkzskjftfm9tgegiinla7v74dfesgt0146pbnenvticq7mug5zoo9gkkjz62a5es644wzwebyykvswjb63zqtpkpytw6on31yl3hhdggz8wgdrvz6m1bc8vmzgiefwchkfti18fqef0fjw2r5dtsoq9p2jsj9e8ngnl2e1idhuf6ps74q',
                redirect: 'dczdu59spw191ux9n4m6hzmre30txkqkhqqb9h2nsetmvgsh6dhzoczhxg0lhwf2zdzodkbtn3sa88v0cwqcuyj3h3urtumqe9lrgvmsi89f48juct3pnf0w4io7vckr2qn0u5iz82n4s5ouxwjlvk4hw909nqdx0uzngcxpzo48tp41su2z1va5hv6kpcu7b3mghsd4nxz6o004xksr1gjezth8l5p072z78yrjjkzelrcjmfqz631xngw407jw606kbbmry58yabms9vi7arolgnq7y23xr9fwclicol5b2yqsjqae8ort66dwa13ijio9jfuo5cick1rh7667wwerjuklw9b3xcyhegmsh4tr0sm1d0pnnn5z9mfrhjdtmoukbe7s7h9nm9mo0hrf8bk91du22bfdbedjj50gl83abrv6cltscokz9dx8kky4y8fxbqr9cj59wree0hj8z4orpm6j4olvwp722jw7rleubx0cpmjvrcgrmb9su4mdrhlpnftzpaji9drbhkqnke8lczx2k70keow8gjzzbnye6v8peyg35eqcjeqhij26y7qnktnrjexy8zxns9ee3a8qxbufov5rn8cbwa8gkj3i1ejljuzo6kxzu0puergio382ygulgjz8cw5h3zbfvqpjq7rgonp7j0ofppdnmbziicz7hdac52ycb73upfyyz3sm7n4qtswygxscpig8z4u4vauiqh4u93qqzkfsxz704kzjem66dsy3up5z5ttatdllifidyp4225w5w17rypgfgwcwxb6s409fth7ev13ec8d846k8pdxzwtn62cl6wjaiqbiwdlrwmwv37lpee3768dhggvf3ewk88fjio1vx09fsor85w8zh8aqg333j3td808mc7aesdmaimv3zpnk03m7whe7c27igwpdqkdu3jn0f1f5e7yx4f2tb35da7nnuqdfh8ov9wqhnuohsn4u5rbsnca69ir7cmqw49ldigxg8xrlsxcgt5tjn16odrx029hfbgechqmrnjv9jjomesovrfnwxukwfy0fc60c318b8vmrnn82ca7na663t1ika3knxdtdmqntsbtng2uupg67t3ofvr17p7dyvhfdte1fzyhvlhjlrea839o48cedy3x8q1ite8x3mr50xgqmfb2idejw3j58dscjsyt2mu836bublgq6q32kgrmkrb3cj8u8phoavrxbm5o3lak6prquj27wlsdx2fbs60c9sx535y27t26ijbcp4sjyne5haxzbpcx1f62d6kmdpve2hfocphljvogxxddz3sthw09yg4v1vr2tv5bbljhjjjxd7hitb3lfpbptmoq3woz0mxktfioea8garryrofnhneis2npulqzypnlhf9b4yzhujeb0af4vl1v65ais0ncxpruiktbr8uj5cn0em76r7y7is2k9qk0eowkojdrq0dwresmhgjfppfujw6nvjpr0b77ugf0fkmiaxpb3ynix6wnywl4idrti62fytz0sokp5bu8xt0d3sshvj1tkp0suck732sq8v7fls6fq7dyj5sa9b1618pd2po2aho9mf1vme56kkntwnhkdaiu87v503uhtj7p08e5l4x4ho6ovwgvlxdo622umn27zlr6r96j7cix0798v8rqolq0pq7v922tpdd7bgkpekpfgdm147c4uvc93ls1sbmq6nl8vqylo983j7kls0gfxkjuue20rtg8wy12607f5drny9zurg3ds0r4chbl8olpe63f3fkc5eyl2rikdsc8xe4nplskhf94uvpvyxvpwujdbujwfgvhb8cwt8nqnk189uvreizpe2ch36wk70fligtyfc4hdtpwtjr9mtq80cslxg2bstkcfk56l5lanmu57nlmlvettfldctrs5bdh9lvi9zb3eyhkqbpy2ipiaytxfxvahszt30yvme1ueima39rocqzfx5ssgvl1tknk8qtf4earqfaxgvzszw146q62uhsxienb6bvrzn227yfgqomu65',
                expiredAccessToken: 3818467934,
                expiredRefreshToken: 7903358153,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'CLIENT_CREDENTIALS',
                
                secret: 'uubxxy5j6ni1ncwk5mccvd9zkcnnwdt0z2smk5ixy0ov8qp3gb17tvod633dgzf5pe4xkyb85uefj44qsbzyopiegw',
                authUrl: 'a4kmh6bsauac99dtfy6lnre30e4dsrj9xf2d75gh6cn3q7yqrhottxohk8h8x25219aj102uyswz8vll6fd5oodu58bssyxzvju2viwq713705nuy9mul1f3wb1d44y0nse36rj9y0iawsj4881boptzfu49xk2i3bt3cy7sabl446a4snlgwlez0s6ruje2hcouu49d67mr04m5m34y6st88e0j5p64k37o3iovvbgnt379x16ff9gvhie9y38xqtqcg3txmeu13se8m3a030hdqizj6y0tz9e70lu4dkzczak1iz186yaxk5n6sktqeltn7tsyobzh1by790xdx0ix3mzeudnryb97yhje4kkn6wrzryd0mb7xukovyyq0advo1u03mbo7kyqn7a9jcu98ozz498w4vmf4esx5pa51yrn1nrgspy9mcqgmf8k1uxdwzvy2d6sht8s00p9eix8iknejkm56tjgi9rvm4djms2y95sfe4pcpcfoatb2m176hqzd5it6ixc4xgnu7c713805vxxrk1w9k1ik97brz4430iu926oc9697c3fne9e7fz4kvnsezq5zzxm2n2wtox2g8ixj7fugkhqszuu7u6uu25d6ofzo2aea5jbjz0dbzib25ha6rzw45qoortrm2t7n75zhx6atv19cvtud75d5r725dj98174t2ii9iv7ubsh2jsgkf760qgpttkw80mull353q78uk8s5uxjlyip5qdhl8lo78euhvcnfu4o9l67ptdro22btg5wuduqepfte15azn5i63au6ibsc6a5oee6hmg9vmpuhojtkf891zothhrxporql4ewqj2phkoaly7a4zupg4mm0laf9l1iz7bhokdw9glak66ot1t5u7ren9zi9lzyolo3dzd3mmvmgo27f1fmuzmzrszah0sdpg9ixkixa5gv2tozf4u6zmbto2wn9i6n1120q2kro5s3e7l4yk8h65769zjfrov9f8o8wzy94uvs776gkxsb2qpvuh15yfl9eob3rnl7aidazttcyt9w2bl1xfr9s383ehe9ovyqqr9em8ncbrn8520dnw2l0ou3wdpit5n2chfltvtukmzhtuno85vbi6vel4crorjng7utouvdxdkpvk2y3wvmamgcy2cnamb3xuxfgyq4hvd4trlyjter8kqdbki8kyg891kuk2mejmw7uafp9zjiljwdil5l3g4aodwggry4wqxkgwdm0bi6q5i4xo49skwmvbatjbyd8ivdzd58m4shpzi1rft1in166tldna8nkkhqgsl17ncv4ouj8vub1whtop2u16iufl7kkvutdqgrroxradtukm4zyxfwmxsdqxznxlmzn1lbbtyxuffqasdehp5kfieffwiwhr8tdz9wxhtolf9iipln1uwilvulurhtxspdnkwkmh9crmoygi55gtsw9ui0oyyl7kol87h3f56e9ffm6lsfdjk8sa3xcvuegvkub5g82s1fq0n32slswwwunalijbix6ojtxe0t07x65yrin6ciwe8iv7trxn4zlhtc22vtc1vgzu0vgfklquzattosxah3k2170hfq033dxax3jpb3x2nloeowxww6s3peat9ow4fmtb41m0hua7d9r7n3bbe4yu1q2tpg82oowgjlzt3kpzam5qbj8dypy7v7t3e8gghhp41pjilxw9ddrwq0bjo14vbztb6xb97i0bzjb8h235gwdwfzq03cm57xfdy81l3eu6zvq2tlp3fpm8l8zfsnesucbc46ohjvik12197c4moqz801hjzfrabirqzqiy4kv3h9gjhd9l1saib5v9nb0z9wtd8v6zswduqcl9gq2jffojwy6ohtasb3sb2bo8hbs85lmcme92ggpga6sp8yh7tgxy3u7zo2ze655r5cx7n5t2e02dcx4ewyugtuuldy5oz2kkk5q4d556fa2b9i679nxayeizv97muub8027306dnw8tuoez59hveaysd4jtd7h66tqt98ffjmhne',
                redirect: 'nvvayz86zpu9zt7cub72a7exc3ac9cwvu5xs10hy5ct2ib79umnxcycddxv21xgrowo1r8uxe9bjgaq8xhk0czby842anhidc5ruki3zqv5yljswu8lmgjmomsdw0iequfzhsete0o4vlo2di18cay5o5w2gawjkwnu5u4o1aq36ur7t26ybhgd6rv2vni7t6eylrtsi3il0gaja0td4rcjs3tx8xhkdvgus55abttn61hwzzxupreeqachc3rw2t0k6rx2ui65recrio8b4m99jmnjb549ahxqum5935696v9dso93nlc0os5cfvonpjn47439st98he1l6av5s7j9ry8pejdfhd7r65npcl8y81zrf6nwcdq1eb0idi72t62vdz31gvcs2ddm2zq2ej28a3tth9kut9xw9pyfmyk99jecdszc5b1hntjsoztuv15zid2p58o7rr0auksht17lftdo02l7q3o1yil1y8bjjzbelb83x02ddqj4np1gb2xt471qlbvqgvnod4uudpf13hishoeca779acke7jf6twhxwm8c23wb0zaasnkrtc4j1ypzd3t0mgvljmcjdeaokfdcdmnbdtm2jxx7acxw9mkylxrg9t6k7d72ui9pip1fnqokvo79tdt2ocxt2weh6rka27epofq9skw9zl6opfhl7qmeu9jtrwlwvmgg35y4x9eajrh9mzgaut76mzcovdqj4ofxti6jgwhgco22hp0wrcqx1wj8buvog22iprmbrh79zwk5j0v1ut83o7g8451dtqhtydk6j645rk7jti012sa9nbo4mcsknlxsfh0va4mo4nygw0e6yx64z0lc1x1jygycx4i9eew0832d7w5uav01gknfqkv56fr88vurjz6p9dr7dy2t42s51818mzbnvs02ooj0n3u16q5sz5gjtf054flogt6r0kz4qfex0y42425fyr52i6w13hb8e03ey6udxsozgupbxxhkp4i2pgea60pb6vkzem6e18hr22b8rrsepv4lek4esohk6ipfddutjm5na739x468733gf5p25tsng4o0pvr78sacm2yne3j0hxincmao0xtkdxq4k9rqvl6ph5aid4ueob49ecvf2a2g2v67sqaztgx6y6xvq89thhtflp2v7hz513zwfu4s7ako98fo8j9rfdbaq1td7jwzg9fqtfzp7cply4hpxswmgfpq97n5qdhwxyxjsm9on50iiehte75ilax6uy7irugfitk03x2j7ny057hp89wouwhzdiqbz9f6kgdpjbyfhn8h6ne5luzw5dl5mjkdushbacv83lqpprwz9935mbiikfefrnj1uzqa2ekwazx28vzgqsyhowumh7f014i77orrscqn9eji0gpfuqq60pf19ce9hikd4d0c7jm8ls3nfy2a7vgharsnf84q9hsxkiqn7diym8iac5nq443ahyf04xm3hhdo6ddhmcyoryersqtqwekeutp59sux2wa7gtz3oeq9qvsau9hjqfkmfpv0uy0wyh78y34cm9op1ptaol6v1tlz3160yhxm3yge1yv50nfeef2renym82110jx1ep30v8yyuwl8w1p31hmids9jd0qrjyjlm439gd8fubv7it61zbnrvdgw9wo4eiycrnk033nffcppywhm7tgnq9xu5rfoaagpa1tle4yib2z9tty69pxon5ogkr8tk9f1s4gknsmxa96qo7l1dxw2g5odqaj7s3wwdg8n0yscnltwl1qxgj7hqws94pwggbpirlhmcflxd9ujovubilq0hr5gbx3yf4twg5a5ktpcx82sen2ecfs284kta7wxacwglfx4tcquc4oky3ubfzb8929447q5pmxmpp6s3qkzwtfdljwlkpkaq4389rzi7vfwtyaelb1z0qqp347kslo6onj7qy1qv70cwiere7o4fcogdt5fe1yacda5j6os3m360w2t4pub4u6ijsmw0k8uo07zk30eskb3ryw0cqgvz8foqhcbi0qi7',
                expiredAccessToken: 7302482071,
                expiredRefreshToken: 7029245002,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'AUTHORIZATION_CODE',
                name: '5elfvir3aoxl9chpi6s5pqgkfi57notx1i67t48sgxcqn20icj39482xekbqej6ypa4f1una0fhycolbr5roewbb7glxqj8tec08whmbc7tpuyepnnq58m8u2k0q5o2ni1nk73e5srpph6foo4pgf9jal1dkyxr061c7ywihmoi91jgsna3520fwb7rdorcai08nfkzgqvu5smwx58teilhenmdoeiz7bk01zvp6orolzmodgst3xf8wdw81i08',
                secret: null,
                authUrl: 'l6hc7dak4hyg72r3bg58ws3v3o7un336huyyznnvs0nsiav5to4n3j4ab82e275czhh2rb15uzm999hna7ke92znawz5a7xk9kevcyfrexdzegcn8ya2yh41j20yd1to0pcuompm4h5bpismegtiwq95c9gwgiii7moxfl75g2qkdqdj0e04dhbxmr2x5a2mwrfqb3v7ac3i7esurk7l4csq3vz0f25bsgon17tw6j3x6k92dzc488qwq8ei97nbbp01hvhfqt3uqift0fcawirky9sp6hnhv1gj9fdhsf1pck9qma602mke9pb1ikd5f2j5tkz53xhi4x4ccl2949v8luvixratobs7nsn2xry14vpqe616d7fsqj715n6dadvkp49mcj10tptkn8xjzvpwmmfhtpolscxa665ysnapy7gsp24fy6i7osf0mmqmui2cmv1q6olb128wbz2eiae2iva40myujj337sgnhjoxzgx4c9npotgp287sr68jgu6n7djaaor88t7f7y9plkujptdlolmeaand45037zbj3vgvdp5v3epxed324k2t2v23528o2515qufb4q567l56fo56gcvcc4y7hprjing3zi1qy5sqsa9opi4ippe52gp8sxjgys9lnaupafycu839sgx4tmvn88iygv1xmbaixfwfd944c6fus88w16ax8trmbek4gspt42wzrtwgzvmx3gdb73whub28a7j2jchyfa33ce8y57kz1dyk4t8frdkmlvzpq4ijks3df4bj7i4w4afikiznek8tuprtm3vufzqv858d6a24ks91t0zhrfmyduqj1tv67uj713qmd42sr8m5m77obw29gt35yvtvo2sfos1t177wm6u2e3lsseln59ihjeiln4zcx44e915ibilq7vmtszksb2bjhw5zmfg1h5na04v3x6mie8qi1tsxvx8k04qpezg889ijdgq8ug56potpp7wymnlq8d3d30h0ux3kc8wxbfyab8j90rld038klx0fyjkihfsbsh39h22nxyr11vneubjkxlfo4y9zk8mcv6qdsbcjrtcehsz46n1q1i40p1jgukso9vk825buk594xi0r26fb5fs3hb66y4h6rn7va9sgpsdfdth4y4eb626vn4mplynqtamsy4p1rrdu6l1ophv8nzmf5aaezwmixc6w9isvafhcuvklnqv2pwu5ltukt5ytynq6uvmol63hy1tzjlvn6xlk3m46pxa02sgiboubomr7af7zc35jzo4h9fdji1xgikjlu9n16mmfw6sm8hc58svnjgf66t2lhn50bfd1oorp4lfj7418xdk299owyax5rqfnxo63ydah827lj0w7c8e9xhcjtrcaqn267hsiuwgktsryf5zgbrnm8az7mbt3jfplbjwg8iasn50k6tj2i1li5tcrhp9jkbzhzxtn30ktm2svriz9c8agp3cgyzk6gc34rjlwfe2boe7teodrl68fhofkzf2b1ypx8h5bs4btjpmjuum5waos5xy6knldxidejsenf8p0igotk3glkmf0w93a89jpuddehmctz9sxm8gevyqlo3890g5pxn780qs4f09s1r6yqjsuddm2y08bp13si1whgk60hfif2bqe1i19xjlmzrip825a20avohq0z9km4dmzgv7n4u3w0uxko4hmabuxvjeojecb0giahfq681idcws5nl5m9rs96votyh124306sqc7oyagmvqv1dvs3zewh18yemhnlg0zt6hjt5l3bg36zffc8q9evf6eur4kkuy6wp0p3voxyt1rykscq0k3g0bcwzefvsmvya2fxp5wgmyxnj03fkiovfupzy796lbmj876ahfsfi9vou0mn68iadlgg3b4fqrgmtw8atd3xoriloj9wjkukhhn5snh3t505nac16mkio1sstme6huas5ro91j3m4ot1vdz2r0evwgxc63gxz9kjlenvcc5gt7psygfsmzpviqhwv2blma4htk66mk97nco',
                redirect: '764yhvzqkr4vfdsa7cag6ha9rlt16l6y9bhixb9rq35azp54giemjts10a3tkrlwnoha8wqd5tjb5o2k1agnlmx46zbntrissya2drzosg69uawg0cfu7pv18722qkgt3zz0nv8lxv1aj09cn9ki2j5k8grikv2sxguycycbemr1fckcf3yll8t3o7khtckc7jy4o7207ome4tndpkw3ifjof0r65kttyo2aidbxwzg4703x5h48he1ky7c62cjra5gjs5l9i05ptf6n9rczrh9efscs1wqm0a7502ybb874qi9tjzg5xf8b35w44q9n82xtbepjf9wthly51tf36l4e9z95vwvjt6iwb70245tvcnvk42077a6io979lax24q7il9gwh838nmkn84ew2akxhmf2m4p5aow9ikevfvvo1iho4hgplzu3ijl8zc7vdwztr9a722fxqixcr4uul18pbtxlwd1guohe0jgkg3008o8rsby3vb15u4n0ixssix9xtzf3mkhwds9nltab6ae5skyuwcg5jbnjig0jnrq8dyk94qc4it96qpwoys2wuv5j3o4famste3mmfloapi0mns49uj0vuo9jexmsnetv5p458eq7ey4k7dq0x7cm2k9qenv9xbol9zoeyos7z4vkevjjryggkyms3p5atgw3yh7y8ntd8fqi5ffhfzumgr0x2mn5iykaixnx9xyhubreamzxrmbfc38cci6cpvaaoegzga7muho7nctnjw7bq1mes4zueuxeqac0212rko6217jdkkyc1edqgftlrztujo2cy1qtos3kt3kmh35g6602zwhl2ael96tv18gmwepjep240ffqiw5d1gkoeuaxtbcy4rajjrrckgi7mvd4ypcy1tk1hqzqft6tyj994ocfzlqmi1zesbrifouuukdn92hsibkeu6sfgeinth7z0k4ilsqy5gvt0j78vda0i646mg32u8nqsfdp024m1sgvr4hnachw1bwak3o43461plr9hgcoca6hy59tyf5h22amamxvb9cbsy5ebyrbh48zrknlxkdktmzuwqhtwlb8u1vvu7d1n50ww90kh9a0txue9b9o2yod3vakx96pcffv1urc7v3wxrg5tlvaoa1wj1gekaz37ek7vchvwe8c4vf0tktg3luuvs170uybrh4h2tcyj90cnb4sq8p6z975qkpufgaazb8ln4j3gec5ld5whx5xucl470oo0sg2zqe4ocps7q875cw4xv7rd6apibw3vgzi5od0yu93t9wocila32yuruxxpt6q1svctxm7mhm98kjyvtjon66j5z57tyvv5fgrck6cqylb3kmz18zdtete98g6ejsu3mrvha2f1tc2izdnvnqsx364uz8f3epo5870862foif1sxn0y26ouyzwmm54eaznpnu0k3pm6mrrmqqxg0y0lb2t52z0b2w9mxebefbz253w23gc5hsctqryz4emrigq6o9alsli2np2ia3r6mf28ai11o7qd2s1yels4undliew7zxsqchtkevf142aujxvkfm3q9irbqvuakb6o2a58rtyn32mcgbvtsvnctuaa0gq1nyq7yhv6j52bcech5j5gx5d6agajl8beahep9qaowlmkllx62ojvlo35eptj2a6bjghttef1tc2bnbld2dul1i77q57iu8otg1hesjherud3z89yjjrzwe68tfdq3c0f7ahj3byserrwyyz1d3nsriwq9md7tyhes51gvmk4gc7i3lexwfnjxztejgff6m4npwiywl1o4lx9aj73ro8yljexkazwfxain5a13bqwicscjb1nqf44vny7vd4to7xk2cmr905vnqriy0rq50a6wdb677lffalyl4vbrug0x7ag62e016uq5fvzo83eint6hxnj3b6wasurt3gnlmwxqci28c7rw76wzcjip4zgxuxqpaosoxaxjawwznvwfpqtjmv9xu4sb70dpk1xd8qr5krbkgkduysh40kk7sxyj50w1r8',
                expiredAccessToken: 1784898241,
                expiredRefreshToken: 7919113771,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'AUTHORIZATION_CODE',
                name: 'krzuygrm0erhqzds5krreoyh5f42h1gwj07srzpgli9s27hyttq1cbvbw6dzxjag1pl9ndt39twbqv0y5v45c4f3v7tidigmvxa52hz33lmf9eldet3wmgk2lsla91hhffiq4ufn2f57kwnhnos7c1n0osf54xp7lsau4lpv47cfrb65ywlkdry4ku8clnmctfleqhoytcdv2tu0amntoh7brtp0np6ahpt6gqwbtv2z8n2qfk0jg6qpo76lpuj',
                
                authUrl: 'hqilq1nkg9tamodnnwsda8pad3dkntu40rnr3tm33igmfq229rfj9phblr513sg24ikmt84y3kjuh5j08r2azad9wkptbdlky4tg34mpv4wq083xud575iz0wg8tmxqsfwanb074l7q6ecqms00figwqfd20yrb4opg4pu5tzg4pe431zpe7tjbfwe4veo7htrlvo8jyft5sgp4nx7ki3v5wlb38vukqz75y38f77j4htwrs8pf812hu7fey0wk0yx9y8qqj69nzm4idpa42cc5tgpzz2ugz4unjyjayweqhxcz4jpqhc6pu5ur6gxjhaufv8n8az6z9db6dpnw20a1302wlsv9e7pugkgq8ckr4yhm2jrqifa0eqb6ro4vgl4rsflasbxzxig3bt7d6j3lgd0eaxcdwdw33tyf3zatg8qu2271j6biq2vdguvh2fcbr5tqqwwqvk35tqin1e4nbtpb7qnuszztuzgq1c5t0j2g65tv4id60415c8sydw7kevhrn1q58i737s2vhjc1sykk7ll9ltqjyxzudrk5tev7bnjzu5hvdjbz84umucpz01rh7eotkthf73s41on91h2r4q0nbwz4yipk6ebih7frjdpjwcxikhka5y3u5g46mb5ot28nk75itlgs7rpvr8isuhw9ojarltsm57esi5g93r87zydj2g3ta282yz0zof5eagihj1oq838jrhn5dzf1be23hjl5ejyhfyjeyh85fshlzusrirazj9pxxyvrye4ff0nwc226bfhokjp6zjqiev0dtqcpmkdqbmiwkdso352vrhknpywcui7y164s4ezjb2357gixkcso0ge5p2uovpyd5gyhce9u2agjm04htovppfnbsljgz4q594ofqkdvmnk69jfm80yu5n6t4wui3qjbii4fn7eb7fksgqis72ubvyel31sly7bpfhq1yn2otsm4og3grsnws6bepk7g27gmifhvutrw3lb7nisk89kwwdialb05llk6bzls7x9485sscv314nbjaq8vi2tffbs4uuzhzfa950vvym25qnn5t7svgs9nrbeiht10wkdix51j44r8ueiy7ol8esufowp7o2fqrqoryq6hfa2vbjul8kx3nu14kacw54jbfhb8p3qium588r8ylly3nfftm9hdwb4ajxgvony6x5ulswgsavzux1abjv79c2n60r3gkr2bjgext5el5xx49hnyssbamolmpa4n6thffu78potfbb8zg6ho9chhub4h1205fca0g7ea8ds09h5kd3kngzfs7x3xa7czmdsjf5yte97dmlk5un574wmj2r861lr77f6fnmliiu6q13vu2r5sm3csqdldl72vkaagksgpyrzcboi2n79qn0coq2jqg4kmhlwrwo6vkyp66yzpurqyouk99vn4750abynkk4y53ndtbuno5iwcl2m20dyqsuw203g9y2zbzr0ucvkdfphd2zzh7jhpy2lxs6zd9ol7ykevdofuy8g8jowt42vabvdqghn2chlau97j2ynewhqm9mamsad8mj846f0y165t1w5iu9rekv3ablir3ieg63ubrmcgj3m0eu56elqrjfjvdrxugs1mt2iov6z13zcv3l4n6hx7jaup32x4klrd0drwr5irs9dlcj4j9egwzd7gtlq896nqeem8onfcy5zgez1pobvth2n6aaeecza9easgvlqv16tb46dw7ezvdary6njqt32kkhfxqrcw9ppj6matrei609vk3xlqetdq2fhgv8e14j9hdfnmud44tvzglqf46evnxv2f1pebovubkg6l1xjwzal98mxtan8y2wbmj7iqwxngetxxvgotrk8mz33l9oxiotpihgqfai5nroxlwfvkz95t28qimz2zt8yxcm8e6ubq0gfy46q87emwgg213f3boy2f3gbrtidgfqys6s77mzx8jo2luhzlzrii6625ie3yui07il8cct8xkmouc8papsecwtubfgpq4r5ipbej93gj2byol',
                redirect: 'xgfzm56e1vxgn7fx6aywvhrvmsy0myoq1pr7n6jy29hhbhrlqtzd8065fybb8238v56yi16brhy44z2vi5ju74eq5tyc10n6olidss0bhk484d3o1nrezn39ul8h52iifvogl45sx9xt64mq922nm0falc1j2gzwxjhokk2wbgl1rjhgbgh6l4l1qetgbb9e32fme66drwvi2f0jek0ggekqj68jzpy78lhutlwd6zul7bztsgs5wwmi93g4vyh62fgnwhqkvoxltusoxi7v3l9e797n04xy11a0j44u4h5ku34qh8bcb82qkg9oohp2zvkxk1scmjmr123zofjlei8vabbpmshhfnxry6zad037ka3arlcro66cflvh59va36acnpn60odnko0gze70b44g02eyivfj9mtkng9ay7zayl463esmon33qz8w3j5l0b9tvz4graou816mp881vt5bestuiuy7preryya3zfgdovp65gkcuuvf66e6qyo301eccduo1jbau780hdo7wwk9cxpvztnnxxx9ejr2uyanm12egx0feips4tky0a8awwdtlxs6w1538knrrp9570ewblbijulmiitr7fn3atev0vr5pa83sgotfiilw1h2v37hi72o9k62t9dlr6cqea9rqhr40chns40wo0xn2jj55egl9xz5vgvk5r4ihetvaivrqtiboqc3t06nibtpjcbfufqqadr250uae0s93s9pmwakzrio8r2ziuodu5ucab0gqc4gppdas2e7vqp7dbyqtj8uc9ilztoilt19ju09o8vxae4ktfyivq1hlcljz2qe8yvq2xa9o47ennralvs9ot8nr0flcq7fqko27kojz9fypwuryjtsz4795266309rhgifedhj15t31hkkd4zusnkhcsp3eur8r28jfbp3i7fd973y9x5dt02cnlkn67vhzl6ttn3rud8zqc1hizg4wrgs6pug8jx62egm8r5eu14glc1e7i51yz5o12m1801nav4j2h1okw5wfztfj8yppb7o9fq9ok1sspxfy4g0he5briack2mmjeuc80v21x4h4c93vg6b9tnpx1kcqvexgr0ogeribvm3rrx3w86bqbut2z30otexusi0vkai9q60oxgdyzvk1mr8lnwybnt6uouz9udwljgb2dveg16pexyybaf5eg684s6da6cw41jac8snmek8sijjhy8uzfoyly41xfjjmq97ixux4b4x23y9br6uebxs1rwjw8jf2fnat1kienwkow0b3mguqg1zq07btniy1yd517e2vpssmeftiphlp3tqil8fypk258ol01ja41ng08zhdhqydhvodea8tlpfg910txgylz9hhwhvi9uwo611zawddsskthprrdr386ai50ksxn0j1opy8yj086cdwqqfwtwka0ywu0ay4u9uolssuayfbsuiacrfyqwn68dr2s6n3vto1hcbmwansw240dpkplmbxhilslrlea1vj2nk1wydxc1qtcuvswn8bbh21g5oehx553soqivbllnysehrtv2vu9l7psb53csingfab6n9x8wkcxuzd3ry3fglrhef98voz6jjsdnjiszv4i9krm3u2nf52kpi32em4658tcaykwote1gn1pqa09zcc7wkk1nz6twzchp21olj1kghlqmuf2oyvafb2y6rhv9yfcm8yt9nwcx09t34iijly1pt815wylao5jzhc38hsou0dz6batluoz2vog6pgocj965k6tv9dqdjs4dzvih3hh9va7pptzvoojk8jvp9flaqrpqk7mxasqi5h3fxlvsbydjzgu09jido3joi200ed2gz4uo3sgmlpnljxqtnsjci6vy39zj60odwkyjac1yzz9okl39c1yyfdhkh37ejv8zdnlzqyig5yjuf3bgecr40zzbdj8xijxpxzzu1radxwvvqmw5rygy3ucr0459zjky2cnsfzaxpdqpe9g5dxbs8jqimnw1imyliowqyehhvfwaw34py',
                expiredAccessToken: 5071011010,
                expiredRefreshToken: 4942469670,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'PASSWORD',
                name: '7o0asoodvcvlovsjnyxre67d6wd52ypvttgav4s8gptqbi8xi6s5h0d4c31hj4oel38khwxqns8wn0cp4i33xhrn01vofn6bdofzsn2572adnjol21ssfijq385dfmcm4skr3a0ggzlm1of37pq1p8hlme9vgya7qnhxpuxq4frojjecttz15e7vz7weq0t6qlrmjyz3vom3hbp47nyzc1bxu8ossiyifamxa9yz7mkvexlniah5go0qisifn1v',
                secret: '1xvxfdjxu5qo4z6u1z30a5t8fu4jk321j04r8mz4eo24d5b1k46sioteydlgn4ayyhpnw123nm74awcgeeag9g1cql',
                authUrl: 'gtfisrjrbvnn49al6reo6w3oqd579b9p7agztrbnwzbrajn4l56xawmcy8x9uq00kv9m5h988i26cg70lxah3q7cc6zmvee65n6ivs3s2bh7bisddqyhes7h0m6m9zt6c9dr2r3q5usrkb5ke53tgfc8hn2xf3aho6yrddsqnnj48nuxydeayo92m3qokarsjsll194ahizmjtcopd5kdpwix9vipjqqj2uuskl2iexrvh8gztw48kabp5rz57rmadpgstrcc7adw7ehrtt6bay9g2l21aqwjjjjizygofdea88d1btt1hbm3wr0535kt1uz0zjp18a63woqwgajpnanic0urkp58qn7kat9ypz2ne34lksxbzqy6lgg68gxos8zgb4rdz859p2k0wzp78tuh2u59w5fokwb5iobvdwbe26xjmamhfy9xyjvjj1kxfjq2cxrhbe5socas68srg21ti7hxfo8ymqhlalksc50r21itcwt2y0g07lrrervvxrl6ahxnio2ds0i8q58swh6vsxe7nw5o30u4t3h611tk5ffns62kdsnr6p84su1m98qapbvnke5fbqybrercigv5ewd2du4d21wpp8xm8o0v7mqyg1agfdlf59d2na8sfox80zymhj9ygyfu0y7xj8wokxb2ogx0slrs4foycj32v609o7x337j6azb9wtw3ru3mt0xht0lkp5ecv5v2lntgsl67gw8z98goy3uct0p9yrk6ank1rnv8wuhqdgidqfe2u4mkx9ail3cmvkpgf9g6rhkwkyotxg70c7nsav9blp0lsq86zdh6io9e59a5gmp1i2zk746inr8jebata2uxgmy737wfpypuihmgsr0xui6gv8z9mcubzku45jth9dw7flw2ybbdm1tdezyc4jhk1zuiri75mweaox796zpc1syx3mj8ktudcmsr85umvftrr48onq7ya9lt5civhpq1njp7pke7qbsrzk8nn4evvcxit91dpor579axpqom3x9kwe4a2nz2ujae1r3ph5wt880bcq8qkpzblvvro5263hgyko8mlh0eg9fzro3t16bzrvyj5xvzj07kkrokbo799y3m0bn6imzfr5wc2k0q1y1hbw0kyc4sqyz6s2nl8nzoyij1b8pxbco8riv4t5slxj8gtm5kmo4tw4ja5uz8k6l3dlq28b4fsvxuc1n2859pcgepo2us83cmwertotnyq5rlphezgpn1qfxswc1x4mv1rzhbn9zenqxbqk9jzc5700xbtmdawfgla3qawlpgh0t5j86sq8ysid8zf5qdf3j29sxwnwe5vlg7kjslt3i2kwrshawkzfsks1pi41wezkm42tcsl6douhb0z3pbkxwzy18257bghaql5w5drcd2n5gyabgvss53gq7ewwvp10wdld6a2611d35zcjeg5r1ls66oumyus1qheiwgnpq9125rnyx1yhqc20puxxizr6padm3f5jr16vmn0acs36nlc22yqxyuhlf5vzmg44u6w03zptogo3ys1it7jsviofdk53vxjv94lk3wk0t0b0vf4uifw2455v7p6g0hagp6hr8if9ieg9tu0264wcag1cypnx0cosi7dth1wd55eqfmah4pez2fla63xx6emaw28iam4wubvm2qanw4i20pgbfhq7ftm2u31nm6838vhqjtj8pkiwexg7j0emxn4v9vjxf0ao07txoavzbeh9xeduploexvmsqd3pv2k3zymy48nkunbes4wcyzjwcn1hn8dsymjqnuaiksk1jg6iyp3wxolpx958mb5kggj5elbsnqc01dm6o949jh5em1h78gshsho9hbrzekim2u7m93chyzq6b3poqe843zn7hhlqflx2gjaw4z3f5z24xctnd3162qk9yslufbcfvg9h8up1e0d41q67ipf001ak54wksds3k4ycl0o606rtbatp3bwibn3vfzmql6dgtwgvz04rke7gcyo2vrodbcfiioqxgmvl63hupl2su26d4',
                redirect: 'g4rog5fhjz1mmlt8qqzbbuntvhyr9nxe0k86z2lurdtm9uiqqroxno11eorqwcr3p8450db1bwudmmitwipxrerfv6zoc3eeitzzqnii58ix71z24aa0fkx4yjp7it33xttu7sx0rzckzjqvg9h91h15pe3y8xiqm5du7z39gl9ds7u6wx07x4exvdlbs1yt0iofsmhyr0ajf2qnp8bleqbay4h6ven7rjy8614fexdky4slvn9z17l6smdkym92s6hlwrvugq475ps35ip5d60fnp71f7mefr23t7ifk5se6z6p25ipii1kcc48427qn5scedqxxrlox8p9otfita8aunxwiqqa0n7kc9amwavcb4xvcv24fvccci993kcljp1nqutnjb22f216jx7zozgcpomwfd4qr9augu9cv05o1mns6dg9hmr7z072wcw395v41y3edybpjmjolypdyuh4rhnhrjawovuczzificcnquc9ubyy7rit6wgztq5z2ea06txrfuu4pnhjuswht36tzynrnpfntzlqegwd6srfsne55bhrjw1ikvffhgdvo5h7agtiie0jkt7ofhb9uioom3qw886sgqwjmsb5hagkq56ysruxncf2sydqf4grbtsx8d09jucix00djkdwrgl38fylowv0k1pk3s8ct8aqrq83jcwvubvlg18m9vvslcp75c4t9x5m4mn43nkcpltrw4hth4nicu0wdegkyeridvv1t799cbo0dfkmoctbkdeorlho7i5qpa6co95hiumlc7vrsqqo7yjdw7bjg4i5y6e8w6u97i4m4u9i8niqy9tju5hgvnqkmd1e5yzd4f1km6xh68jpzkatok6y4zq80w7turoo6gon3hlvt0wiciuxlf1tlbyfwrsiy34zf86d1ljsnhbww9oi8s77xdkmhpbozy5xs85rlsrvphk9qlqm19sztj3bo7jkfobe7f2652ebzqj7vyqvm0oev315z1gy6ga7ubxvwzti0l1eznbhfie6bct6hr9cz1804h3bityers15545ycz54127lwkq5si418h49opio481sz3kfw2rdb62p8of6zwmt12pvipli6eio83n9kh72acmu52x6tf3fssx2oqom0dbxzhen036p90yvv8190qfnthns4qmcl6dfbgebg6vmg9suwvcr6xbrksyw2a8esamcd2nb3a62rc6yeikkwzpzxupyueczurm9us9vpjjftlvyvx71uzn74jx8udcf9gf62vtilg7xulkb2634kf52ofw4jl947lidbq410gi2lir7826vrut2dpez5pp42n7gcs4402h877vjlyro8ovszpscm07ejdx0ohbcqiejn5j2k0ihma1ut8bf4h67u4ipgm1mw5xv1xunpvkjyhamwbyn5zdwawir7ordbmk5mg7621mffhm2c7a8j9u4zzloz39cdk51m3v8ji2mdgqp33ibuqfyvldaylnfumfju9497rmsrdexuj7a86utgi0gm5wa9km3cec4yx9n3vtbm6skbn3pwrbsml3dvjl0s6aith86sv001h76zeqzw49ya4f3mrd7n4c20nvz05yv3ftw8f266ne4fpg35a5qnrqv6cewa13wkgo5rfjkqo1shcfsy0by2bzp2ip94g8kwvust0vehl04hnx8ar5y68h6env0orp2cg339ogcg7fvq067vv1hh2beph1rqhseomqjcsnui1busa1i3vribzuplxssnj2lw9s36u78egsde68uq2vmfgqkwb1gj0799zz4e6bfe81v5x96m04eoz2kcmg4wjwtw91ofyq8xyonwn9dtrr182qx4o1onjv3vh9n5m3ciwfyns37sb8lcqhcvc6gqn9z2aohmgx8q3q8ask70rvbgdznsk6j9joildp159y6efelhbapibho9rb0xl0ki5nwn7qtnbuel6ddxvoegsjx06pslhzxh02lehqtahi2142xfutyrnso5k616fvl81zffh6842uiv00a',
                expiredAccessToken: 1335766364,
                expiredRefreshToken: 1082512669,
                isActive: null,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'PASSWORD',
                name: 'yy018pb0bf7nuble1kbmgn1447zkuekusexqny3llug3rfr20nhv0pijlmthdyhe6zjgjs0daheys3us2fpo3b4roqxvlrv1ix5sbbwsd0l76onp6xy6denvix5eim6aahuoifvyzlgxzqtbe40ph4movtom3x7jbnj3lxl4m945p55or11fdmp7ie7iefvn4goyws4v1itsny6jtkl12wom8ph27ph1qb4z4439q14fwfzip9rxn5y2yg6278s',
                secret: 'zzp5qud8rq50puakxkyfed3cmnakg5soej8hq5x9nv02uioj43ha8x3oroeufvjn7y9v575xa3114u91jrngg3px8c',
                authUrl: 's3yie3pbf6udnw1lfrp38ptcobc2tgzkd9r5pwfmgri4senfx36q30eozsmvgmff8fd3r8lwqiwfiigj4vz4tbvlklhmo1r4jkp795yl0o1zup2azxqzhdg7zwzn6hx7del7ypkdro1yw1xcton1y6idavt3mrxnanpobbohoef18kse1f6qroouqu58wv0urmsapbj8tdrogbe16dasnegvqwehbadnawgmo5mb6x642dcdjghwaxlycoz7xce0i5scwrh2p0eyhg8g4z960tw60g1mifi9rs9odhz8qsmuf0di94gna6zyg9w32zripys1ihkvry5fowzry13va6eccpnukzlb8i45n6wvdb4h7uqugicygcgqjgx7dxgcyo4oj9hpe860qofh3p1y5tpdm4cy5itusjul55ye57ttwsgyf5moco33mgbjjmjxjyouvedcqhlztt47n74md5s8t7n2sqf03lol4hk98z7swni0z2i3wualdmp1h28i90yroa73kctevm10tj9l16rp5thfjp9y96ivya5e4e102u79w765wjkedkoqk2q03nah092sgzuzinu577t9krt9y45c5xjzltpqtd729k3gt3lepsxpfx4xbew6h2ws5oqnor1yx8p37i1568jlvhhx4d1p14029blsf20w6slm63k565umzlb5q7tktfb9jxofzxnhqy84piankjla5b78nfmk0gxhrhal1c771wcxm9fy6z3acliaciw4lym4sn15oohd1h76pun391f4ub5lruyzg6oo4pzyfmsjp18vkltd8usumgl2ujxan9zzckbzbjltguyrzh3907v5mwvf6wno9fawjx1zlqy0w87y5n1odu0wo6xdra2s0jsnjkp8g0u1ariyciqvbg63ouu0ekz817o11ru880w8zp9clo79cv78gqqvczj7oc7vygs95telc6n2za98vhml5iubdmk3ud2xrt6b12d76almx6evpe8l8n5vdboop43o7zltsrgwod3gesrcdwmjarbjdfdmuavbp8kzf1433425nh47ed6ldvqhltm0209kynfoxgdy4in967o2btvxqo9lpq0mdc9k5lv3xljfy3odq9hb6xqj1nld27a97bulknf3vwxry6g7dhj65d917dq6hytvzsyzb054ye7sitxd59a421zmhhvavhjiz48tea8jl64dcn5j8hyi9nv8i9xlog5a1rp3hoh7kedbqb744dhyjlnpj60umq00vqmehi8809jnhbhmtzzolj9uge9onna8cctht6ql66dutk39n8fj1d6se5smv6t0d0yfzsbsfb220ahhmutttj05a680zeumd47utpkg1lu9icsc9h8la4cmjp5u9dmky671a983iamzha412172ltjio1i0krg67awjyeem1izu7a6lrpbvwixccqxwh2cexqz3tk7z8e4bjfw1yl3s394ustdztnt0eikx03etokgczfrbd19fnhvqv132ofnqxxktrpqjvju0v7zwi024lj2pkeucj4s1qdh9rudthauue6y3qm787o85nlnvzvod69qjtgmklmd7ajpp8bhq28cargsmku9sgk8194gt5w4gig8c0k6vhaku7zkspzg1dofo8iifdxzc7qjx0a9uit3psoj60c4y33335w8y7g50udrd1et96vv18jsfckok7nqfl00q2em1g1x1kzods5qwenpovxu8aij4oztitjgpa7vbeb4sbgv2u9u8900iuukbcztyh4suge64odgzz663q5wrc51kqtudt2ayd27iq81m1tw5an01crfhr3flfxgttlqlxjvomdg85p1nzolcrgkuzp1hb81lyypl66jtbq0wrsbqfj6ygo1b5bt8610wi109q8r26qimiven7ml5ost842rg4uzff92lz6ejhi7cd7z5usrm127cpnccc5zz63gyomfp2micv22g8nejo4z4hw02kdh9eco4q6gfwv1ev8fiqk2lx0gfa92d3yrh',
                redirect: 'j2phgppwgmv04d7v8xt81sbwwswd5atsjabdhamw6ut0hvz97v567xhawjct53sskrz17whjtlckfd9eq9emvosix7zy8leu6k4nepxgrtow12skfomxm3m8eqky0xhebb71fih0n2cgjlg3c6jbg43c1eu4k1baasmsmljveuoxtt582yfm0cnuw2lit3veil0f3mbr3jn31mrdzh6qm9ortlxmcgl91mjjyfttj2hf6jzsa9aetsyrht6gmlfkmcydimgxx41i8okf4htpcwr0dhsc45whyb1bezbtfsv1pp6ab250cvv5etmpzscy37yjgrfc89pbc92wo4rm1vk2tk13eb7zkud76x94sgrxzwy3km79t5kmcz3qbtzgrlfaicb8ozo4msfhdgxeunetuhwmlp7iq1tp20sbz54tf9ow275y6nrqvrzysi1ozwm0dalca8v0jydlsnmuoxmu4kpn9s2x26fb42wjzul0mah0cieckao1rz8b93kc2qcd68jbfszf7fop1mzw8hv8c39k478jfiocebv9dt064b416kauis9y61mf0rw2wd47hnvfjkxsuhmqrxojea7gm8eahooah5782bq8gixz9yxf1beqy9nwmrgkpb2eqt949v31ojxr9ruhttf4w7f7n4oug7jh2kz7mlroeqq5wdkjqou4vw7dwg9vpwi8qwlat5fzridw7m1yblvj4sdpvr9rl08fs40omv3udv07cf0ma7ix41txpewe5gh3vqzet96d2f3v3157wcz6wenl0gpkyqkvme3o8gn3xackxq8s3a9rnmc48mbp26l1jsfiqfrbqipdbi3g2d5x3g39l1pw8atlcupgyq0qinor19hb4t1bnggxojvy0lqrugkql30vnofoyq56mrjr7r2cpq4jm1t4xbt0wrelh55qk56lp11oah8afu0q25apnm98p8g2ugbi9pbo4yirnb7ybnz54v8yufk80eh2kds5cd83at7jf408f08rrpdlr1yiw6i8uziifse3yexcyniuv1ginx8jaj9b3nkulous1bfztm6zeuf9apfumkvnfirofcocrmpuwt510a30fg4jdxz4q4nxe9sj5pi3w3gh4h36uly7d4jpncqgy0ayaidz3wdw8lbdrn3wthg1d3ctvyku6qrkwi0rofg1eca12ul33m32vkohx0bz0drisrstntj0dr6hltk7vdg7pcuqxgtubo0qmf7chewtq4jcszsfis8x0nr2c2k083o2koo2yal96l4ubmnv9gyphxzj5er9l14eq96k3u252vn84ghvs1616x289fk7rxmc22o6dnixpepvyzmwq3j9pkuj7eewamn36kyjvfg8pund6q4jkebpm5nl7ck1uujw62x2nwg8dl7h5jh6vvwyz419izkolh4r2k53tgpbyc83lz2w0cg37u9hik5322dkfvi08je19uuzfht2m8sd8zs0ga2ljdfgrh9ugv4w7ortblmr4qhgn9ilvtj4a8t1muvptudtzobk2mn8vgsvv3ixifx1bzfx720262e24dggyj96ci72rvz0nw759vyh35raygrt81ku079kalrshcqhfvh0u9hdw7isd15cky60ttue8qogwk6f6uohdrpyay2szaq4ajisthw65axn0uydjz2njp4wcim8hazx1zhw7g47pc8hc8j3asnkbdhzcby3itjg98fftbf52bvqsus9tar095jcpioo1n9n3eg8v165555zcmhgrkdav7xenpg2zn0lq10z70nyht63o4a5xy9vfp9wu0kc11himotq6m9ls0lsorelx5ktiahds02qi6hza0i405fk4wklbas2yhf27zcmrq0r9zmaurvlch3e68xr38nfjq65tyz74v6o3x6b0petcvif7mwqlm8s8ktq5gvi0cknit1ccoc58iq3q3n0r529a5qw1b0zxxulr2y9ja1xp811ufbx712to7n5qfzy6c814wjjcnbgrq6rb3otmimyd5c6d5v6',
                expiredAccessToken: 9825862544,
                expiredRefreshToken: 9139874935,
                
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'AUTHORIZATION_CODE',
                name: 'vmu70j6e3e8hs8k1pi8dlsrmutzx2hiaoo3fbkrhazgbopw6pnir9diuwtl198m48uhllbe67hujvol2mijc3vwa701soplk048hkmpd040kewalu3m1ddv2z98fi5l57t0siwgfeo7pc0qz9sx5cj7lvn7uvrbki00o5iud877lqwo1itrsky2ueajn1m7z2vzyxtnyrdqzxqnhqusajd0xgbz1sqsls5ayoeb4xr4d65zrl093u8bksop5ni4',
                secret: 'sih5onljcjki0dudmahso7pthphmiiqwlercvy1e7vmmgxy1engh6u7gfpohpzw2p3up4r5elrp9koktnfw5q91lv9',
                authUrl: 'pa6nesmcstqp2j8718z9phzlrrp3w9g4bs65bqxa8axw0dppt5f96g0nu8n8t2s1cxxai7hm7jsiil6sb9uc5vn7w11c07hevml1k6i33zhtwwco3jp0bczwyuns81ftpg07wc9hosn9xju0pxdftpd8kjksit6xu2kyzfsktfm3qczhv3vpur7dyjy56j38h299i09eva4dpnxictc4qftxw2gmpu345qidvvojhjmxrqji3xw1ql06kor0rlmv1bl18ayt5i4rklz7dj200wu52147bzzb4yuggr6hmnak84pw7dm56xl1zf6714831vmf184lnth0t3hfsnnw61zkat5idoafftzf6mi2zpl1g00ccm03bvwmp84ou1vsrswuxx15gvq3ma22namd1yx4dpmvr1rsqtcl89zoqpyhg1wkok4hvgfvz8h04y308dhy7aiycnyb12u9cfg2j2uncqmr53aoa5kurkhb5rmqfu2wf3ervnej93e011pzwt8dfix45b7mpl5i0fbcd0hndb30bpe348abl5c8fs017pu5wbnw4niyhhvm9b6p459f1doihfthijqgu2kikwoa77y1ko3ivg0jovvnl8puyftizaw4qhckro8y4akgzrxcfecpegcs0m4dhadxrghxi8dqa5sl90x6g9gt0feaug2hkm5dr8zgr341jb6rpzda16au5v3njm2er8irtq5krpkn67rycvbwbjy0r1vl9j4og9g180loaboruqfjy1vzgia7yd336fe5463t645gtjzees3er9lhmwr1h3e5bkemqx88x9f9dwkkq8gxvu3panc3042ffb013zxzorww2f4kdtpih3qj6vu8ut7xxnfzz0p5xa8vicebmmmiglxhty57iy01c6q6kr0wq0gxq1yddbgm05b41df5nea769tc4up3q5k49gl5lbunztr52shyqasfmvmvmxbfi15icy0o4w5arx2w6hv2oy0dw7nftcy3qxxlxxa3t1nd17thcw9ou38fipih4g9qqdenae5clibvyevyxppx41bxcektsz229k6bn6vibu5mizt33tkfhtw6ym08i859fawkndxj5eesivnqku4hqalmv1w70ajl1rpn1hgeyoirc2mjiu05njozglyl617096i8qhtc95dtcotb4fw3zs77267phl8o75ytfmkpngtcvn23oofqkkteahd874j6prx7ufhajte4lzg01n0hkpyr6t0q7qlhcfd45atsz47v5f1w1u4kj1vaj7ycil9vu4f64ep7920is4phhucjsjqvg803tm2sof0e7h998yoj6i99moulp9ds5atprjuqblf115kvmgy132r23pt04fgu37rncydd99sl3exbe527sqx2jscrs1trk5jhnj1kkisotq2419xrhncgn97q8tdb2ejc9c2dzukx139b9b3kh9pvvhhofee2crloyvkufds2zrdi5xci7a0u1lr0obgfdqkdnkv802fvymn9bh8f2wipwzb0tycmd1q8mmzp1fha8f2a96jwbpvvewg655lqz2lad51z1wchwued0liyjtzt3ib63w966xgtohn1cvq316kobmxh0df7ouluuy0t7jig5l9zlcop5pcgaaxhvtfyrnbidemqg1nyioza1mnirczkt06ai3uz53g7qemaxbkskfhh3qeyi2c3jt22r0i390vlr7xpf0yeafrsd3avh8kz8cwezib6ixmvrlpdp3dh98cpenz9ecj50rebwxetxovkiwxd04tn0f6oqpi971ix64l6dq5pgwbpq6kgdijfl629312hvi5gvshc53h5c5spd16sq6zdv6tm5m0rzahczd1t9lygq0bb6k33nlrlww4mtyc7bc9enlakf8uzoffy0zwx24f0xz5oqd8kekzho30266k43ymxwszeh3ns45z5vek8c3t2omnghm0fkj8pcawd6shqt2oro2iyonfxcl6r6nhh7tgmsrn0aair3flzyvtpdn7wtb70',
                redirect: 'jldg5hu638bmmxu0iw86m0ofnarqtxdxumsnynqzpupzz4zr5pvs7et18axb1iln5ab5unndujxngz18a4g7zoe196879wlj9sjk023jbvmf5kun8tzu3dhrg5qr1nz0pjj81kh3protob3kdu9ziu4s5817hhzve2ngo4p85hez6gw0hpvohlwbkjrhzeorec8fqyawr76pdfqu497vec78echw3mckaqwsmhtr1ql2i845dlhry0nyofbkzp69lt34mtncaqr52c0yl9oyhthxzff55uk6g91b4za5uuxiphwwam4goptwebtvnab63ams75h1przej0wp6wajzgoxfmqpzgp0zh9ymu1dfa5rk2bbc9vrulo7jc7jnfpbi9fknj954g27lu3q8x5r65qr9ssmevipu7vb8r4sojoxheuvmsz890fxrprjmbrg00i5pyzs5zxxm1iyheiues6m1h1c4an99vwmvm997mdgqs8d221mgxk44vkp8mmy7yipfk1kcn3n4owbhqvzqrb2q8fog8lb0xiphhv562z6zx5zx20vh1215j4e9b03xi7owy4z1wmesvq9cvw9t0p3obfcxjmvg46iwn7shivzl02xqlmew4gxn5ysjv0m2biv4ab1asbpei97mgzxioo8fl47z3qwcxrw32w1l3dvfx2ewif8g4wg3xvwpbl75m6cwwn8kkwmt4bdzoebiz2dx0rt84ocvjmclnaoiqwmdimei9bf42067h1ij0ml5q6q6stys67di5vx1z4abkdmmvnzqz6g0qchnd2f1lubcmh0izd20jtkv73bo4bh45rf25itm5wcu1npalvonsxdcoeyjcnswuc251hsm7czaceylvab8odctwfevxbo0yox61lc37gvyzrpwc71q6hdoixgq4m46cgkmyes34ovc8mkt36ehu8u4hhb94muwnlrqfa5tu2o33be3sq633a2on6jlyrdyrcuyxtrlk8shqufj3tlwpqj72k4v2bz9cvndj4vczn6j2es1izuu9gu0uwg9ztvxhylujp1tpe4onehqk5ghg3h5w85sf6txyn2d84yfe5q9eh5q3v8of39vmw99rdq2upb41p2svwbz5rqx5kiwixafojc0798odivmrpn8z7ggq38v4xucdlcxeuvg5shfeli6xyn1jj9yug4fci6u6u9maodhih21f14txpukcxubucd630r4tmma300ymdfbmgjbvgvc8s2rm9evz8gxksumjz40796siqisog1c4a1rld5u5wceu4abis1wpv5kswusi2ynjmt71lfsiohq3a9lvn5l9riodoyf53rsmxzt5sp99v27zr023yigybrt830jf6ssauflyutebkjo2x2uxzmul9aypf8holble1maizcix9zzxhwlp0llxxpdsf4pm7no2n2l4l1wyzwsk2n1a7bj6sop73ad7gg4z2lrwdnjf2hgw8d61f1qudwurcd2e4wzxxsrsx6wwgmz6gfbtihgkmu7radzsqx489nfottfw12nzecynp77g0k9kp76erfhljo7lhhqsadarbceg518p81prt5ttt3bfqcl07bsvh3mf4ldp4spukfe495c1nkac0kggsxjl9wlc0oibp2s1y3ometvi7svs5o5suznr4mdgs3oj88r8obucjzh8623hopsm2455okt6fb1pwj1z9dx6rt2hpi04hyeo8hx23sfv27q0pfeitt1ho6bbirblakdqvrtiko6ahzn58s8s2h9febym0b73684qocwvtto5wvbzy47pppm18avfl2lx5atjfl58mpwwsetbbiyus2cld9vc1adz46c475wnanjd5npdkrx586sr008xnjq6bcw2fl0rjhf2q6jhxfo90botz5q6bnolsi47662ol93schehrkd1dgvuv87olctd4g3hijx6j2y1twp8vssweeujsb2vmlrr9qztq10rdb0qda2zfb2fpcypt42y4nr503ajrud01u0hgpwv21fcjv',
                expiredAccessToken: 3804339162,
                expiredRefreshToken: 6813457697,
                isActive: true,
                isMaster: null,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'PASSWORD',
                name: 'u5n5gt02sj6hid8efy1vo9ejihoukd9h9cnk18k0xk6c8frizgh3ydkfhogepyre4amo8arlf5vjxxep8o0y00i9b2kvhilru8gqa96s11m5dmswtp187w6rk2hu2xo68zuv7q6ntoc0v0faljvf1jxjbxw6rkjnmsd3e377y71hkwtzuyle250q71u0n75a9x22doj3d9qx9fd0kvgybsdxulnitsl7km2a04yj9jq79wdbq72gglq7zhmvxia',
                secret: 'xe0t5surhnzorqdeobswu6zyp80eknf0qrev7bn1u7ktc5ghr9zj9owbz81hhxfr2dfoa5p9x2k4ubzhaiv0hksrgm',
                authUrl: '8maxm0a6yuos73w1f8gbtd74xipbh9b79l7j5z5rex4fco564y91645d5vh4dxm5uwilp034v9so3gsujwbytsr9ojo2frev08sv1ywnc5ixd6jqckhotl5grx2tw7wwh6bh0d73gav9c41jpyxj4x29ct0rflti4mr5sssyzb0cuiialstmfznomlh381ijey901lxi1cxd841e5jl34bx0qrgbwgrq2c3vol51ml929ro283z467qhicn6cv0xivq9bhxxs1fzpayssgkklhrn5pe3e2ug5ajqaj6aalm46mo0e6pe2c42zyimxwu23ou1akghc7m5tk584mj1188re7j7dzv17hs935t2oq9wz9qpahfde1swltvboj4mtr07utg4cynjgr3e5ldyrce3af4ibvxwmncvx0gk2pvryh7d4caulua5yt6q2yk5q2d1vtsmvcab7h72gj4gkp4mlih35zkaveuok5eqwgtr081jq8a76sr76lzw6yeyauaqn13fqqo0mj35o3d8jloewo0xqgqqxnim2gfk3etax1mnlcsjlyuniupszovg5qh4nkz3dcb6vh8lz4aplo02ec849amkbocep95ak29m18x6kwg0rd32r6aapud5js6291c6xwh8q595m61xwt2aiuiuym4b5mfo505khqftmxq68dqkkajwoj1rny7chchs32my0ojjcyuq2lpgxfmschs93gim3h9lzi3h780mre1uehaj9cqgs686fffucp6wzqwfr2f2asji8viss0ox6zi7ly6ga02ufonjwla6os0maig4yjyuvyah5g7an1i3tqmcoctt6t1fec6xyac2ubz8wq2q0xtbass9o991ob1wjp6zkjsuc721dwzlki8jv2ag5yi94lf004vt6eqixht1b8vu1bg50875khsxp1jg27oz741sqzyavri3f93sr11xj3brao9jls62x01pwl6b5jsrsmrawyepeaf8wsoy4hy4o98dibhr0fhjgd5ov33pdbdj32j32jxhcnxakfikroperuem44rqtdyfpa01xvnpaqgaf8kbdut0nfc6znql8r0ijopvmar8aolgr0qwit4w0grmyz0dvnajowm6zz3ud78nb0uo284anuhly6u4ljcwsa6lo0iig8jtfhqgsq352kv1c960bwtj3d657sgf6z0u1gclqggn3jseasxg7k70vyzfijtli5uqai6skjm8ftqhe6zlricaphqnf54diwolt3ll3w2oq4regvgmyvjr5bmd1ui6ar6kzscpjre0lc2g5z67ddptsalqtzey00asphzk9yb1woo2hrfakl852j9wo48u32mbjyhegpv7ckjhxyfy6k96fswhcbj47gd4day3e966n8khtgj347r4jga1hucy51lovbsd5unr75v5t3rblvhk71j6o8neexr7luq19meydxtkq8uh4ykgby7x50gm6exkp040f11vmgvcrakbz3z4t2bzb2n04wvf4hvpx6y9g4eznz6c3wmxles8a14r8ney4duuzbckkztvr4ggonjtrvedd0rk9xo00mdl3mwcnpjw6uwlp4qglshv7d7e59t2z5cpodyur8ucuig7f5itlwpinjellnbga6f1grhdrmqsqhhgmkxqvb8eff5misofq1f9i2obp5vmqcqj8s5vskv08jj3vy8mrrjfpx9yu2ezx1qazewn0d1mrsj1gh30y6iws6a85l7rdadq7wnpqdm27ze8yneqt8psnpfkihc6rqvkc4g3w5besth9t7zir34oi27heg5ngjmi2vjf58sr03451i6n3w3788ljsiilg3cnz6pqhg8lh6idwbgn6dhkuf0tfrf8eqxkiw9zol8705wtdo5hfh1biq18dg0ejcrszbnelo6yza0emh69qq5itjo34syw34kgkdg13qpuzbi8do0gz32cxosbuivq4s9lmbt6t964cikq5uv9e6yu1mmceg1oa62s05yb2z6bd62w7oeqn8q8hzfj',
                redirect: '9a01wjypwdx2x4l1c6w4xdfnzyswfvpg56ws85sic9fwim38lo782citzzr8i1c5jeup7tnz25j1f3kwbrmo5f7lliv1x33y3uy3bpe79lm3dlbrr8jpl6ydrlkubexhh2x8hae729rc6jd6m8ui9f85cv880rsz3b19eeaq8z1ym2jyronrqv697jffgj3mceq7mmm32vxolvwalvj9z3qzkwhddyutf1y7p6o8po6v772ptb85jz9734p5jo4087lcpis6ab8hbatxf1im8o97mggo16x7q75fqylp8vnrj72wco6ufevx732mmuea4c1sxo6keaw1ju4go3l21kpoxmxe3ebfbztsabht7ojh93wuxzhcgcsnsrfku9ydj3fcmgb5yp9bxrsvpsscu8jwgil3w0itpo43vvhl1gdyxw79prfeyszatmniksvfivqg30uy30dikf813zsthrqaxlymb5s27acxzost5u1aiuhshin5591rxnhoodq0wwnaxirmkd1bdwb279tzh3pxxdywvo4yjd53njvud32d6wsd0nvxnih04eutrva30pzdcytnrii1ts70ckfme9iza05l902icmlt9oassaepe3rwib8d8o5qbagku9baknmfny9bdew7uoz9y5hc323kimewiagzfim5m1m6rb98y79mqvzun50fw8qxole3sy9xrfjn3p6w93gd9h5grllhbjk0ox8f8ddjcf8irfz5rpdbvgety6i8i30arip84y5puh02jh4e6guwswf537bhvkts2syeedsuop4mincvl9l9srotxuf5tlqahvvhiamawr1kjziwho2dfu0t2afc7x9kx3b7a4ayvir3vy2kl7humdgm9k9ttjaw0e5y19d3lpl54oeo9bug5yq26fguspy4dhnsy8ocka2j767hpte2ua1tctdhorzqpwyao5osgkgy0orpv31boqgu7fsyqzj3r11midemanip4shfitkrrlk2ki062t8tn42blom76j53v7tz4outycqa4sp1sypjdayjpwfuhik7amv79qc3fp9rpdsd613a6w54wtjwwehuza3venu0zpbc8qmcgtfjtjrlu2lbqxsj95yxz6m7tig39dwzaer1k882k9i7crxnuoa3gixlviszobgpqey0qivq32zusig67je2ahtaiyom9va30z0pc55jg7sqpq5pq1ganh33si61p0np732jjivft3cs0gx89mxff6gqgr7g6cqtbipfmsm2aainh7x4pw2s9rsc9z3avq4zkdjumv7ypin63j07q9f47n7n7cfxnvin3851jbv1w12alpkcyrfs0f2c1l041h13hr91gmbgu694zhm3ih8177358kabrjetcidzv4npqnftfc0qjcqdwh94xh5z2avg53brw2u3l9yms60xagdsy9f9fbze0rgngovv9kpo1g9zpgmhxib8w0w4iqw6rnfu17q9zmw0dcls3q68tt7y7jpj98gen4jwiusz66fvcactcaznbx4v29pmgnjvryi9lygsamxhf46t3n0q3g6gr45dqvoviinon256altx4teiie5luhrnva0ly8563y9i25mdl8maghg8yiwv950nlknvz4ey1xrync9tn4rurbxj6j15htmcoh65d5ut3t9qybj7t6zsx3sdncbmzf3t82caw8fyyuee1g9mg17dkslc3bqnnv8oylwh49kk3vfjusdzsqjejv6v0e5r1dz4t35fm65uzqb70673hje59ix4giv8x54v0o7mhbg98n4yq6ah4c995flf4xore9j6jbp5fqbcoa8dm0cpahsix64ji6wcs8drygxf9nvrnna3w1fi2w5jw0jxwg1kmj2wyc0fguwzj9kloitg3ep3m5bt6v43apggsr2frrejma3gu2mmkra4oq09wbxjda1es6rvpnp3vl7qiw5wbo0ftlb5qwzv37r8xme1h193v60nlfx02qu6f0bcubr8fk7y0flf4o3uny1kzvoytbav',
                expiredAccessToken: 5587634747,
                expiredRefreshToken: 1319334333,
                isActive: false,
                
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'fggkhtyndk2j3q68c2z3prex4zwbkcy5odoin',
                grantType: 'AUTHORIZATION_CODE',
                name: 'zbhq570avm5uwb8371btaqvqb333efzo6u5k1fh0i03p2iyo0gx8i7huh69qhwicp4vqeam014l8kpbv3k8n3v9mnkwk3qxty6808ob045bv0zuqk2o6zuwoth7qxud07cqjet5gyz4c7u97d5g6b5e1of3x3cris3er289rxxxt1u4u1vo3zjpsdlih4kfii6lruvzuksag1mxtsg8vjq6bmelg9vydtk2syi7rnid4r5lluy0noj6vn6c2rvb',
                secret: '3g5x7cswfdr6eph4wfy7e1ala72xipam6h0lbbmrjpymnre9o7j2x0y3kekryt1v5cyto8rlm97dqzev6a3hpmwlxu',
                authUrl: 'igszgxsoo716n96mqoja5h349yyenfoqzjq6uia5bq6emp02pq050oex1ply6e1ybdr16qpvlm03hxcld3g7xznoy60j028ebm2lytrnwn2dha6tvu59z2smr6pknaupp0g58rxams2hogrhlgw4wpa5ggnvrx3wi0e1d6np3o369kkd90xta7s8inqbi3tfrh8yhn0i5ip7ehpwowuu1vy1as9tkkxx6razpsprevlrubd4jv1zavn0fs39dh0b41bbkg4bf3von2m2x5ucyv2qgjuwu62gncn56e0s63xhoe0xj0wty65yi8j6aoq45ubibqs4h5jc98l0gqv5zb5x765sk5smt540a3ob99hboxb0gudaf5agtaujr7ntt2lmkoptwz9tntcvuv6jxtnixhcolsp76be034l7qg9wmnty1rn41q63jfbnpubr8i7sw8zwuf7t9943jw3fc0etd4hg28eqou11xzpp7p3hjrxfqidyftsa1ph3cwz0vqy4ni65u5prqppsxsdxln98vxcjh2jdu6k33rrqn6iz8l2vf1t9j4kgs0thpbrkagbdo91r77vidr4szx9zkevt97boqvm06filaofojlgphc619ro8757j3b0pf3rbf9itjt9mknfoc4ohbo8ctcbl66jrdzim1vjg6ez6v067jbdqqjdq2y8osu3418p5rel631ezkum72rn3jcfgpoye8iv72b5iosacw4wt4e9i2li0u4b6b767ajvjbr9r0iua50tjl053159brnz8q8xgbi8wwi60xl44r0ruzfljau1w9sqgp68t4rl999xgvuu2ld9id3mg1v21bs9i4ecvd6u9rab3bjhnoi4h76gxw84n1jtknijnk7w1397p0c1h5n5oawv312on2nst26q5t0q48u6dfirmnno88r72fvffwn8fo73uow3jgtkfxk7j6nx0jztsto7d71myzlff9zfjndfrucfs6xxj4b69qfixhd058kdbgos06il2ejs917jin9of8pfxblh5ab057d6tijeipetqezg2cm5c4yq7quu4fd49jycck6yqacgqzlxkm8ap2mzryz9pwyddy6x6kzkmairt3c7gv52hmxiz52m4jyxz66v8n9n2hez4inm243b35yd92ujgx5vizw672k07wzvx28250ayhdhoke6entqy8knw6sis6cty91o1po2et7kstlh6vcw2rf4zzy14o14unhxtdy2t70exsh03scp6o9cyw5t97feylswm5d6uxub4fmlnn3ke8wr9mwm0b5qeeoqtgut52cf28pvu8oitf9a5n9k9ay6p0wx2nodwb0vt15s5i71nn86phdosjsf7s9bamwysx7vha0mtlhhre11h197bl3d4mun0tpthqijsm388zsh95rmiets2ef0cz7v0a5vxsar09mwqc9vnw49gkmn4fiov6a22wjnk28eio0in89u2v0yy16lp57vsuroe9l8lsf63k21bmgsjsziq2u84ydpe8vfr9y887ldj03a2m4bldng4eafmghzqpreskzd5osd7qibm25gce9hn0shoddwqw7532f4myi75xelwxucql2o3l3640by77kijegmsyok8vfsyfayjrzuwyx92rphtzen5urmmtxn0x4371jf5voeui6bi99jgizhz1l38b8qo1574mfyvut9gtcp95lilc54z82sm7amjoowib53j52i32y4vf18syngqd82m8wdc3ajmy6o7uhjcfok3k399f39o7dfw7vy62ix5rc11fgrbn4x4rfdl9n9nukaookwf0oulorqyjr18ahfq6ek3ev2qgl5wtcsq928ivdkp71joo63r2vyoeh8adjwy0muffcgdi02v50xeacx9eeb54lgvtpw7mus54o66b4nqjy159dz4ydw6u98m3xl8nircarrkj9geejb3fp64lyaep5k7y6jy61wou0cigcuwsgpbegwisqkxvaa07l8aes2et2mkd0rp1x29cyk5j',
                redirect: 'xpg3uwf37f320qa2mh85gth48vv6ftgst8cd58kwlkfzs63e61new4jwran928ssi894pq9049nzxgylsli0gigtg5nxzea8i5wo7o85jo5y3tbp34farf2l7w9pf3lwpedyxnel6usdkzydwxuolgk9h774fhm9st6ott2mpzx2j8va92nozpfximscp98g1nera8ajrdx02b2u4emmkwyku5x7ta6q992jvcfu2n87nqs0hay3c9zk2vbosouwm31r4mom4vtbzkoo82svf0zdxeqhvdr92qvrw8ny0i20jfptbfbecu4lccn9j1fg4zgkrd6crtbo6yoy2eiv419xzw9xkfp8mftf6tb8uijzhvbzb7b7249z4t776uljk6ciz4tktbxhh9gfdwitgvg6xv3r08p7s6sxff2yxdpvoveyillww6zihakuifppapy75328wyvo15s81sijdolwp3r8aez1bbhwdj83mnx0vkk9sxmsvlt33t304j0v1vgg2xbvhitw89u3ttm6f22kvbce6b7rxcrlr3c7smlmlwd6oi4uuohehvms2amxb4mfke91nwdc3y4ucpeuo4qs4bhs0iwgvr2uojrr19k222q3q7sqn2azl3si3cbs9mv18eoin73n7bs56r392h5lp3ud3rfygik7hu8mmb4mx6dnxmjh9tug7rwxlruzv3stbpojwohvxi7fn6m9pm6bzqfy9ja6ugzv5ij3pyq8v4kauy3hg54qmpc91uw9lk9uy568pbkwb1s5yp1i9rer6cp7qegbpflkzknfdch7ulsgu6dyjfe3ua9wyyn9gktdxtugiwuecwk0mfyw00mbjq68d68zp8zwv0b0281uwzjz37zravjjjquwp1lu996sdhd8t19eyhplzrpzqgdvudpzran28eo8c0zktu305s9yn9fpgvl0x979kquantcr4t3lt3g1iz2nv79dteiwh18datqmcjfo53srorj31sk9i2mib1c7xke9y6a4ddle9ix6aiz2vysiglw918p6xico3ulyohlar6aui1rb0ug9vjzokr9af0i8r1krhmx0zb7mj42kffz4mhlhqbgj7le4ovw2inh6hyj3y5znrwzu63zqgfaos39dk1bl867zr0gq1eethjnop1ed3zyele1z0uzj5hgpax5vt7bg3i9vl7b60s0iiykmapfuimbplghr3htzuny6j17ccn7gtaqxg6szvdgpixzrw4fs4ohnd2y6lc8h6eyko1n4qrndc0rg3domxby81knemmbxvh70vk98w38suxe482y2yste4scumow0asyy6abpw9flm25q2vr376nfawj7egps8fgmid9hgnhp2xyrb6ybrqllrm0mvhxn7tc4pl88ly8m0ktnq6yhd7fhy4n2o9dmfjiavoj5ri3ai78h1acbxgkn0ef9omj23tk892yqzqrhqnx41x65ukvm99kpvxyxfon51qom5hl0pcr3zgsf7cainvp5gx93yjge971s23rq2eqya252373wtj7ris3i1tbrrbq5lmwt2kbkn2lwt00sd2wvnz23l4knvp58zjd2i1opwh30cek2w4bbceqwk4hrwpxd8uc36wp73afioj27mhsx2qg4skf4gsh2dlree1jz2c7g1diu59b04r0d1dxgh83v00tdi6eq094rrvti77kwffx24fbp89x2j55yuan9gvavj4vwwjdjh4tuoxzp5o4uhw3mndw2das8bqgcar2bs5u6iill2k67d01isf15soyfw8jiqajnz9wd0yk8ggdukyt73g3wglni3gndoe9t1fterc53d8sw9omedpmbz7xv1f8j2onla79kbpaabezlzgsbewj9nnha9xklmsztxlibd83s648x2m4dy7hccow4nk8dxcoqobhthe8h47mf2641d2yr0jwf89fohciw3kddm31ar3aioau8e0zcbac9xgo2l1386o083e3mdxyc03c2fm3a05yywyihatgmh3bl9rginr92',
                expiredAccessToken: 7623916547,
                expiredRefreshToken: 9474046903,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'AUTHORIZATION_CODE',
                name: 'b7p8oaa25s8vk2fgo74uq49srnrszy0buhd4tfjehluo5wlsixjq2nm0pl9n9to9szdqlve29525b319by61ze93y9sc7zdsg6oabbu6vo6zk265q4tpmyb4kf8jv5ihwvpqfmntowfubifu92thzdatd6w8z5moif6n7zbv6ihb9b7btou7blotegyhnhxpqlchy02o2um8gytdn1ah4dwi3vhnczgb8rxum7eu42erxosyi8vmlrtluavgnfpj',
                secret: '2rnsmdvnp8bckawmlid85rf52awefh9rcsf0m4k7stq2kc0pnrgkr5t290v9r5gud575gbgh4fum1sxgit03mfz2r0',
                authUrl: 'r7gvdcitzxhkce6506st80onbj1grdm0eeq7slacw6ddwb3hc0j6t6rart399bcxkuuk7zdo0hirhxdco2zsvw5xu1fqjdndb7cz3qwk2tcglkl2w773zldw5d78zwq1sb988692dlfn5uxe2mvdeulbswxr7vbmhgxwpj0272f1qc67u4anxcbegifssxqxmyhsl0lhawxiipdfef89funwqfdkc21yhz17rddgu92xt9y3atium39g233m9639sesr689k95oo9k3bwc2lr761fzwwqhduayqt3nizwmeobiu6cn762fh8q8bd6t972oup93bwanb6jraa05su6bw2vrows22qqaydgn83e2g5vwnyaqn78nngagxy9ia75u9rvzlpd92pas70a1poik3cieev02v16erms0ee7vdtatamhjmmk5b5rjjpa4p43uhlx22qipy6m0g8es0kn4pnzhz14rhxro03xvlxidan32mbllrb9nosaob9j0ysuxr4i0tnbea7yoozg84l8v9qgx2xjslz3y0y3ruwtjq6n8ym030eq1elsuhyn5eewn8je83d7nh9jroqenur5lmjn4un67jsulb1n055wfccwp6gtly7994mqu7l3a4xdq1z2wm4o8q7cfbihzl2twrbdbomdi9igomupnk1t8xx1s71h2otlffh40ttruzc6v8hr8km2srh636j40akcvo2t7eu62m36p8b2j5mqat5ub9eu4zdblp4gnsftyq30r6gvc2ovteorhnbpx54oi6ht3g6jy4480vezcxvek7d3jm1jwcpgww8gaky064tap9uur6fxt62r755rbuwqorttmo69zk8jamkermel8w17kn7ufsj01kxgclmotrvhx5vk8pezv3hzbpsbmv1j01qa0vdupmvs614h3jqzltsbfi23blfbben89bwijy9xlygghncr83gtjmyafr85nb8zojefmgxfkaxga3zmj3f5al9rs4w5n9tl3hh0olfavsww48xte6wyh8feei0t63x5i3e1urwsess135crw2ebm8nn2a622v9ce6csojp69t71exfohxldy8bg5t4hbxy5j8m6zqu5v4j7yx4e4dxfjzgtzmzqu4cgj5xg7nj4x8qh7s0m95c1gulk92liwh01m8hvx1m9yrbl4cq86vmr8uvhkzc915nnmaephliakmaybman1bwq8db0svh9hbw2pq6xyj606jdwe1292n5u30foazm10qavuzf15rnv3kqd3kz3921febmeq7t045arp2hfdgses9yh9ubuijmqt4cjb9yfs6i5ldyiis84tuqcfgzfc0nk4e6rai64x2xnfl83xmoavo1a300wc9davevzznte5xqfkomdw1jsopugj0l486tziuklo70i6v0z9wtyyz9b8t5q6v89per5y6jf5k8jj1mdgkr1o5z2vi7azbf6bnoeko1yxbvte5m0xlbhtyyauh3pw48zoyq4tihvs10n28q1m9wfvnbbuxgsam90xkokpjmh4q05l63oopcl8axtz452du8t70a0t6fx4vkxoohr9h3x6a9ylj90vt490drdp527qkzy9irty2uwllp8wmlky9t07jhll6uwcc61jvigk0bmsd1olp6eoo4mfqhnpv75vb0sq4a1whejv5hi37jz7qlpuzxz1jthsqlornjswv98c3oec0kphr8bnrg9ydalkoqfyk1ghrry9p9ftjbflzv82qgcfm3lxmwz4vrlos26cpcrk6vfuzk76fb3hotgxhkafkk5tc310keqxgzq14kf5mnhvrzmkgzxkj9yad92teu5aseuhocq0c1vl6gu14u1zho8ywrepmqrm2vct2ler3kshth62qbfg2xtilxvhpdnm84p1km9o5wyjgorh00iv94tvltch9mq01z0c7t718zmq6t7iwz3soi4bj7rsgi196c2grq5mmiwxc2jals7kuzryfawgozbkp5za7l5r6g2mj5fwu08eoulg7n9oa7',
                redirect: 'fghubo7slshmelh9f7oxrmysnmc4xdx5cyf21y84ixh3vfcwf3nyikcvbxee6yhqfpqi6dgonv7rt4gmodnt3nvvh33bj8b1ew9ek9kmenvyx1pmgy2pwcf5xatwbzrwy49zwadcguidaymppaihkxaei7u6qhjqkjhedhwaefmfmd4axq1xzfwqwiob8cemimj7i2ut2zmx8q5sjop3sq3tu2cp3j22jmwiel6l6v5ecgimaqbp0m7a715ez1d4gh2jij28606e642a828xp5tmbw6121rqljibc17m7phd1zfo4l2wzrv6boinf7ero09cn9hkkrswgq53dv448bqugjd8b0yi2qxkaq9lua1njpo050di3pn77dgr3quei8whkkg5loqd745yxvzvx7d24xin20jyw5pxkfqweiqg8g3rhche8b80s3z6yklyw3amgb0iee8vf22xrn5xauel73yqxwimvuyk9gx5kpuhkcwqk2f9c8chpjxbrlzebso1wy0a6s63zy5ub6gnji68fylgj2l9hg8ydoqrzzstu38oo3u7yjjsfre9vutvd10ujm54r8jjfxfz5j1vprje54oe0s1bue9nz53b2jqr2wpf6puu81bj1clc9x40cdw6ft3ol3754eg2ctft1xo0lukbayt8mdcy7ktcyhr697m8746ehvv98aic034nww5hyuu7msj05eqt9srkwmqe30qsz8r94nclnw1iwk1wljaiz4qbw1qrn5lkl4p36p5kzcr90o93z10ycwp7zdthe08v7gm75thfgxx22oog864e07nczltnfyvoxxzjcp9myh9mgazipeyk2vaiwfli170agqmlomi5081psbca4sii8s6vxf3zirz9yo322cknx74jpad41bl4kvfw3vuefax51f73c2r5puz7u7lcjte2ybfk7sy2pw0ib42yxx4wze1yxpllbodp0jeo5hoqo7gv6bcog2gr3jbrd6le756vq28ay6oany52945mwv0ufo9d4gd292rkni5sngebfupbmouot6bursxbc0ya565vineqvmuwpv44u43bmzklhn545tdije4bl6yupo3ymhu84ov9h2hagsxi97enyxhzccunuzj8q17llbr58yhu1r3msbpuxd7wuebvjyvrhj46rfekg6fr3m1dzlc7hfq50j3xh2z0dn55433wy0ihplnot3ohkw01cwfue83x0t8ynhoe2hdfjxeuk8pxfmfzy0l67lfxpcb4c2cdxmkzvquam5blhscxeabsabsarq7skmyc1q2t36m8ph46vphg4taoslrdkbmvhgwc632qbkqdtk0m7r7w0ly9jtke8x53bhrn6j495aa4aw3pkfw3e6ogppdlk6jbblwzq6fspmbzqvfgli4lm1qv0dbz3bagqsl9uh53hz1s6nt4ro81q5ezpl9say61rbg4xqoidq5worp6eace022yv2of7lchjlhxua6hgwpf93dfhp539ut6dzspbcp1bc1qivpipl5ciw33euu2ag5a6i9lzh2b0q3e3nty0260r723l07ppx0vggvbziivw89puuaujvynvo5fcmcjen6qdlhuktefo162ems9w0z1sx4v63ncdmb3n8c4alar2lx3w59px3oxlfrj6jz8u378912suepa3xvwqz00zk3ci5h92zoghmsfe2xjzcqwi4bye97zdf97c26onlsanw7fk0x9nlf1hia6yrfxhvd2gyjv7oqr96jfu21ndvbl6cjvw6ntpcznr2t55xf1i6j79ye2wpenxk7vtin8242s0tv2ubzyieqn8oeg3b7r1c258c0le9imbio4ody6ge6ka3fcza0egilx0svu3hjin57n4ehvtzrwx0z8rtuwuwm2aaoiwlxnd3tkm5k9lc37k3g3ry311ixyoe7hu3dapcvpok9x51t2qboxb1fvrwlvo4onsm9ep327lym4x4wflkyzdcrqkoruzxmlaejxszu85c94etpqo6la54iwqzx1',
                expiredAccessToken: 7025084717,
                expiredRefreshToken: 6931343627,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'eig29htzkaz80umant8ux9g1ba0o74ikvrpax5tgachorvpxfa82s2qao6lkry8757325wmclq1dpwxb4pxggwb4usqx5gi9k0glvouc76tmqf8x4h5bnp8vnmjgqt9xa73bu3rbpqnyzjztewjv47hfrd83y0u4dtxfrpb8dvhdf4r23mw4w882fh2831nwzkpt7s2ibfqlv6gp6eo5n83uad0192fa4rbl785gbdedu7fzapytnelorfq57be',
                secret: 'h4282ootducwdollpscq88n1smyqzacyoy7xt4oo0300nq7thg0gtw0jszbtafbpsbofb9ns43ud2l6qhougo58wuup',
                authUrl: 'ga6o8n96w6zik6a12qw07xba3wwza70ab1assnd1sly1cce03s3zxp2yu6uv3to9srowtcxot14ag1uahld4n0s3boidw1yh184uv40ipwyn3grkppf69wvi3yt7a7euil2lpogdyxjecvsuitfoq3vcyn235xkcyj5waj7ipgz6qokfhtop59bgi4p1gi2ic0818cw4p6guqsfq322uwhv0g0cmpghflvxtuzvz5hgdb0m1ppc2wp0tzxtl1rg9b5p5bui0tbaxbv15r7tr2yefftd2k7xub5rjb07hra575ptjkp4fztki2yen9zh2puf0i2u4en31inww75a4n2x375g1jxg2h6semwx50wtj6fr15co5s0sfx44uo4cjjvm74xkm8nnzabijkwphxgz1hf78p1h4kvv5z03931btsx2tqrmq5jbvboap74lrfli8t75xscgi4kosscdpsk80qxm4w7xwitn8dsffnjvw1zpr1tsujlurifcvx6llq9eeyjtp0x4hvoifajk0xklygk7su4cvraab3guwibvo9md7fbb8uc204iuoi0wnlbpw5wghxbegx1rw5kyhpfkdhp6gvbqaugmd6eb5e0i8m14ve9elfwmckwvv3dn9pmdghj710htaotvz01ejvinhxht691bw7gu1i7mukhqcwh15rhcbkpwf8f6q7z5o7qxsh7kzci5ys3ydpcd29w71zxsturmo5pr2sqhdmcvmrkl9y5h8r2fgemr9rwkbdq055h4sjzbi401z3zgk7r660ifchoc9sw56uoj5hnnbqtoa7qnt860vkzyavjyhbn6ct7ttqxsp0zndwmydrojjawcw4m5noon8f40rv3vqd5is3b1gs4fu1ugfq8gkewu8b9kmlahihz8kg2c0304lcsgiphsgad5shxxpbgyzfilkgyopv31n5vw4e8htbsbjcrbylffg5l9zenzu7qlvkf7lprub2umtngvnunao1595egejrslhbc735514qgtcox0kmzuo2zmk0osqpay8in4mz51h9rnw7r03ymcmmd8impnw4fla8u43kf13zl5oahdi8fqu8lekwjt6l7wzmf6ftlztlhcbcj5kw64gmi0lalj0sqxahk5gzhvv61n28v9r4fmlti8ys24mv530wzhyw762kygfto9uf4cy1t4vibzavgx8rnkxl1hl0wty1k63sckjggxm2lwup307t53hcekvi6g43644cadykn98bt9iyt4uiqd7cx7kqxitc7upg9i0qqtkit0be0jl7jat7zcrvr5nx5vvyymf50exleye15stt6kur3ajwl9czbvj7gbwoe9j43psnwtdorcsldny68tkzr5od4g6v7xlq6zkd2cwpht6bddpvs68vrw287k7c36v78dd5btxczsfjb4u6nhvnwuewi3rr3syk8hs3cansejedtgqcika3bqmxk1pszvfonsdxmgp0yox0f6na153n5ldahvgs65uvfla1nq0nq9p11il1quaeu987bu4otzu18wi5m8g0345zy2q3na3shdgfxef0lfk5ay4jhk5v5yu2ythvmiehr08ug54re42u3olbsrytrzlvw6dor71grkrg46x23ujf9utd8cjljde1xkc0fj4u8m5c81jof38eklghk23m829innrip0gpag6w2x6wbj7ga363cluulngdkpi3hb1ro13ugzfih2sczx9stoubclw251zmjssxtn8dy2l9vn746x6m9wcke8oast9e49ygmj95im6wsdy7aclc16ccsxk1bhcl7ff28uxh6ypiob9guq3h6wals23tfw6k83raud8185lnc5yo8o2j1nurzliixkda8wnjjb0hjx5ba7sfdfrtdl65q6m3c27378fr2oyswohmoveinw36izdt1w3nwg5y6c9jyqfmsgepgcs233elwowfo4xdjv3friir23seldhcaewaow7hrx5qu89nqpe5ou7yzo7vi5d5qv9ivogo0286z2zd1i3',
                redirect: 'qxh76u1fuyx6tcvuygygp0oosop3a2wt4uthgapksmb5xb0f712a60o3jt9cdhb3raxypnn43wfri3dcmy71p29rpf3j9ztpzskgjqzctpp4zpxkuoj5dj4qtomjnr3ayj8ae20a6dj6zo3txzcchppkhotdrd2cxtpx0930n1ya41puqrdtgkyqg44holnlosd9h9dkskk7o2tuwuilhjg97nue9mieynoz9jp2lpmowp425pxwz539ngpwhsw0ce4iw7tc6c7sl954ojx2mvut978wa5mao3wbc0x385jqalkbuasq1rjw1rsp9vb1fgj8cw7scnmqmmygnr0qq1h14jlwn2r6rbc75gyutshl730i00ddk1bgev5s7hkc3t8o88qx0r2ac3zc1hnact5ji7laui56ka0ouh2u5uix1myzxhdj1xom7fruxdpuxknuyle7ciy1ds3wws0qv25dzs7hizf87g8095baagu16y6jlmoorm0dhrfxkqd34i2a7ug2ptqng2lgmtdocaeb6wk54khqodf19sw0ec5nqq79bskwjw15vgppsqsuwg98dudw57ukbtdjoxkfli09kbou9rnvm1cgs9jf0bnw1gabltck5o0cee2b6ehn240v0a0brueh8foambl8ifvuthf2m04u03ivth2wkhbpwem41si9j632ytr2rrwb8nrs1llv62yyckky8fq065pcexnslxd48us7fz8rq8akveuq14buyafxyejxl0hpbowpif8wubcvgqqmzlr3aj84aab0ahzquleelvj56nl3dyo1uj81zjudvkj99xe4ck7fyku4jvs8xcl7b8m7sm9c31b2sxqna3yqlwil8zwc8gu1ed0rnulpk2ganpmnjy8qu569z980u7zct75d1m8wlit878pwpa4kla86krl1820p7ftucw8c3tvfglbebufav0dccbpe0jz00oagqvnmaox0u8d3tak4cvm5lim8eumk4huoxkgkm6tnbnqyamzgcy38gdit60pwk1txsumic2kfn3qql8y058hsjt1nauqsnw214v0dslmeeng31n6wlqw2ssekyymn31gfh7gsm6vnkj0t0w41vo13a2ewbkx4but7baiurj6d2iy15up9hsr1nm855mk2oh8n4cgs53ocpxgij8g74z83ekm37ko3req5ux4lo7jleg0o4ovqtk940oizpr8m2hm3g6c3mmunw4cvp487f5pisfgjxhl277zcpcd8egq6675mjhfe3fntoiocvb153134ghami0vkwit40a9c5mfdde8cuowlbjy4uus8nm7iht2nylo8b1x5e9byabpjtl6f9wcjvbridnl06m2ws7t4rhjjnm6jlr7zwmfe2mavaq06filyask4oy78pmndhijf67t9kpnesm6t67162altoun383idmc8m0kcm2bvz42wv4p22b1h7vzjizabfeuy58mhl36nvg6rclb5f8jpq1ldq9wfs5ovei8h6b8g2gd8osjn843s302rpbjk8prsxmupnxxw5yodm5giyb707ugaytpr8sspjswuk5c0uqsxxh5s56hwpky6kteht55uhi20t51tvj1ok4pft21059kfz2am9j3kt7x9llxf5xbu8td90zk5zcb5e6tb3hk9l1agnsu3jk93ahzbxt5jtd9tmsy0ker79t35sjpx77fdkrsgas7iwoh9luo7ela6yikb1wqiq49f93aw465evdn3innadpe1gqwozeuwiqx4iuivqf0rh12uo31s6sw43d4e69syn8esvg0lugw9r3z1m2hddmrarcjlx9ho02ku5qj7k73jeie3k5yc7ge40u5xgc5urjmqb8w95n08nt7tjdjypat6xcl33h1md19pkkucye6cpk0mcafrqetbtqh5t1vzq0dil0oe4cfmkz4b0pjext6bsk2bnd6ye544gy939iui4iw6xmuxvt1myj2sys0awmyv2wscgd7ir437teumj2pufssog43kujh7i',
                expiredAccessToken: 1691586452,
                expiredRefreshToken: 9703410535,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret is too large, has a maximum length of 90');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientAuthUrl is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'CLIENT_CREDENTIALS',
                name: '3ndjex48u9v3mddob9f1r0rslj2795tpy6nbs4gcbj0klajg6q3gl0mgpatl15mskx45hyoxnan6mpbj7utinea6nuptz6ciaz1ywfyi2szwl4ktqv4d9yd8x71k16cs84fsf4l46t0bpc1cyzo5i6pqjjcfn3cfbq29bo0zohz64omf8w18xd43muwvrpzt2166se4o75a2j05up3d8lzyje8514s2nd8w9mou9zf8zsqnuks6bxnq99xsmsuf',
                secret: 'lipekvrn87mwj0467le7x4a9bsr60occidqobal2zof7d7dhps1vu6pb3wg953ypmn4adzw62m4blsbugon7i10szv',
                authUrl: '11l40al3qzuz7paavxeah8n6r8rbh76pbrcmaj8qek11e8j4xy0mkhvndkpmwvqniqzoiu8nhsabo9ivhi5qch09p0if0x1uwkwpry27wqvzcasbd9wci3n8hrtfjdx3n2do1340zxx3krhnkadl6hndeeqqb2ehc5idhhv3aknoy0ksmzonweho5cnpgvfhyp9xhtalwt888k4p3sz6u5h7uzdfktp2o7ifejj3wtclrfk3pvl2725g3ano2rdopny6jgecsin57lr11ifp70fuj78fwz4xmrm0plod233l6d6ol1jerbeazyc9snqgslerl4qj04v50ajefumh8l7ysdkhnu43560r6utqy76a9xue6em0qybeyah4a7hrzo2omhu5l8xzv43rxubfk5khqlhxgg71z3prq8skmgpfhvv4t3740gprsrmrzxil7h7vybr5s49120n0i9yftmt9mx3hbexnxr8plhzuhr7o8e7bhq69d4s64rh0iu6sb7cpqd1nouwkanu6k5my447s70o3ngiiujl0g4eslpyc6a7q932pk93biuifu36uqmkbnvv3cdcv6e44d6j6zwg4urkf4tob4tg2a9fp4t2e2thhy4m2nji76k7294iiyy9wsap1gkpej36ghodrlpi617k3813ixvzz32ctlyp4hxkf3mtbtyr9z9icyxnee9kvs968tots4b0kaotj8lkx0qhmlrmf1fuerfv7yqa2sdacgrpda0v3vvm4gvi9vsahudur1g9931lcvbua6rkt6rlaasawvlaznmxb6m8z4tc8xrcuz8pghgbpvr51nmnezt77c51ixk1szds4mkgsxtp73mutnnuecvkaumi0nuy6sjj3gkqrg96q7otvkl1ruww3q2b238c28a2pu02rdm0qvjfmy532mdatpb6r019ny7pa4naab5cs14awfk0bfo27srv2s09jgqkx8k37dyqfs098z3n0t5wk2zqsebxg800ei53s9bnorbqm7cyey2fbdsp7tf93ssan7sn2ciiufuxlstkwudejhif7y4hx3p55jkzxa041aras0qr2on7ca70r75mqw6thby2ta6tg18jipbw1du3wgszp72uizubuh0maqlxvqp7fsakvs8t0nsy5xoqmlectn8dyk3boc7eg8nhr9qyjts4rhc5l8hhgim57qevazfd9vjemu7ntpgrwk5j8b2blk99ngjr1ur8juynv0yj39txit0322sdothidypqw14lvdic6mlgfwrum3cve90bxwan050ur8mo3i2fqjbzqtqqza88mstdsyh55tds2jiloppu7q4h1shng13ppkzz3laubxk6cegf9uml441729od5wvia27a1e1i866nut6q0roe9mjodrpo376kpaly5lzuq9tjaxpwzqdpvxyjkp1c0izod3pf1w87fns25bhl8524z4jlhan0fjjolfgupz7lgct8golb9rlex48wa1wjnyr6m7uwv0v61fyr1iauv7w9xh47bp9hislq6t0khq3rkoqa8hsqd0v3vssooocfh37ctcng3h08qiybbzw9t80m3j04mp2g9qqnldeqmwo0n1pe8w4gy1mrk6vdibs66kjg4pw4ddf6h1w7q85bzjo9xt1pnr0zslh925kr3dpqnjdcbhg7wdu290aqy6i4wr7sjfdioxtomw7mjq17o3j4jeszpfchh1bq5jq333628z97owrpa47t38clzan9dnspgp46l2ut75fx39h1do7qlrtgoa8nf9ll16ied4fdk3o2lotosexlj1w6qcm3ebz3gqu4ajb8p8gb2ycuin2g0fps0jj6dov9jrkcfs21dh6ywvjn7lp2z3wnp5ifur0cf56m31h1lyrkwkjzibgbijt28b0j80ahso9vnaod84pf5n3kmngc8xoalhwv3jhohmohs5zedgd140mccvlwlq2oeyrj9tleh5mxrz9s2f8y4qtjnwx9853u9kav2tg3gxw4sl8wnwfj5pdrhn',
                redirect: '8j4r7jlvoj1e0muzyyawup25kholsel540nr9hhv8h0jqce3icpuyg63m05pbckli856n8u7b0y6atd2xrktpb76xmr79111noiiwwwe4jgjvjhlbgaff5cd1cc5rh9gxnki9n4ppa1m82jvbke1rj5r5jkbbd2hmoqwqu3a2fwbb1vfgodxbnl4ziuw4z490q7ps9yz5klp8ltdv62ws520okwmrv0eo27opmzxuc5w1b3w6v7t1sc7mo4vndj4t6ny6t54q3t613tu2i5w90am7kryml8zgvtkaf3ajhicl6soanmx698imc9q3g8jb4k0zm8mvyovg8w2npjoist03f8yptjtaq18rzes7avtm6xjekaghccpqg71knhnd3mherp18ak8e8q5eiu8hgqk0tqam18ownune4vaatx3wchzrmio7owsqdrdkzoce03m0vlcehtczmeizesafibx7menx48k2vghgzl3gfdl1r5snu96i4cg1zp3sr7bmpdr7i51w1fzzcuagei2doc27nijcggby0d0vsnvgloz8qs0akmte0idm0h35aqy3420gam0cbbhruz8kl7x1wks9wsyny31x4zfprzj4soef6zwi89mn0737eb024dm0ga23vsnbpf88j1i1c36v4k87zdj3iovwleninhbuxuefirs3z5100x8giw2qp3ufl2et7xfif289ris659zw9y34goyavc0ftcbkbiuwiklwm0yt6igzyjp8g0zvo99eq0jwjqpexku6z640awlkyqw3gkgb5ft5kmm9u0kg3iargewra5delfpdcyo4rovwryvey58pfhfqpynj6lbfmg1irvypo0j0k0pwjhqjedpxu54dgso85r19a6yrdvgx3d1iusm139kbwsqo51x65gvgaxe6b2rzjfo1fs3jg82eun6a648d6nr3ikfii2miycizh9e2sjx62nc813zm0oz4t4623o3h2fblxnfd11gcc0lszq70tyr1807jil30clpu55kkxhant24ury4tm5myjro9e8ibd6dqndi22c4tu07mxb4jho74k9swyc10znkenql4u1wo4meo1yhe635e6hmy06um6p579hwpywk59yged4z4njkjj1zhgkvtc5egat4skasnwpp74p9t15byffpxkfs898ga4qxwg67076ergdrkxbyj06tpkyl0b8icxmz22frb4r09ckvhesbd67hv6w1mdo43jb7l1n276aqeoib3r6dag1zi3mwnv1e7n2zdx75se0mjyh1r9dsx3ne9c8e0zpu82lxyf37nh1fj20i03g7ex6m0x98wg7agnym3ujsmt5l0xdl6f9jvl3usvc33swvi20yp958vgni3f9hep4xhzyou6c2cmz8je85l3wunwcef89v3lw41fvcu5bpdds1udmkqfncv6cotb4hsow4mhju218zgcewte8bq2qiw3hijk1mmltq2dxdcbgv7rui2fawl16plzrvf31qj9aaqhnce4usujj5eid5z71rwxhvtn4ptaqh6wuav23xmse974jo499c5aiwe6toeo4fzcjjwr6a8ctwghv7iyujb84lsu10kuhwreohdbbwjbm0ffa7nu5kcdjv8iyf29cuy0zk214nzglkcelldli4dfvurhnqhza9mgp7ns9vw6e1ufphnpr2qd25p3qzyzhz56dkpu7l0ge38vymn48j9xmntbxs8tgh2kzw55s7a4j5d8zln805gss7200agvaenjmbhb8zfcfxk42v7buiuuk92s67fgco0643br33hnkry3daaj35zv5jo3zbcb3nsdjkaj20cogod9d5dqfvuuu90hytzxgbgqf0robakbh3sum8kkbc9778o539zk0o1cmq4vri4ii6bivwz5xx90iqpoppcprzcoa5idxpfqayd4qxc8zizpccx7ky90d4bot0er7omrgaufbqe0y9g75199spj52epe2vfb481i3z9cd5ya8j37bvs4y4l81yqnohdfha',
                expiredAccessToken: 6805644344,
                expiredRefreshToken: 2574524173,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientAuthUrl is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientRedirect is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'AUTHORIZATION_CODE',
                name: 'ylpl48i8yygit5bjlhmesqedtlv43wxfymtliy8nt5yrtnoq9gqo83t8h95lrvvpnohmb19r60y45n8f3rvjypf9rrmip03ve503qcx6t4oyvu2lgavaji6yisxt1zyflpdft781z2k39igni34tlgkklpwfdlb1zsswgnmtfhmly4iktkcn0h2ikmnt6hsjc7t3a6zy2ueo1a5y6gnljfgv3wv3b2eseivujmsbhf9b58qnuo6a8ttdot67nqf',
                secret: 'gvb3przyazlzzbp9se6xcl882agc073bnh2vx6gd8i7ep8vu0e2ijgf5jb30g178du27pif2c476ngswr99a6nqwvt',
                authUrl: 'esx7jra451m5uvnm6qmsbyy99zbkquif9dp3y5i4lj0b13970ihwhfv3wb3rwp7w4s8aszbdrofddp353os3rv0uru0fmh7i73wc54aplx2mikddd92ui3mxokbi8a5ltreibx5r54y4vy9bhcbqiu9l91xikmkzocan5tcahdtsf1bjkghs2laceabf03xebt7o9d3iqvhjvvawfx4iwqecs524x1561prv9wsf5b4gd9ga0i2q4goc38hibck92l2c7bc5rwp5cz5xaiznuocc6h0a3mqinnfay9zukawoqbq0pyaqmuegfokmlp8wgf3xbbi7cq3h1f4j9v64xf2ybzl77em8jj6jszzj3h947pft204qmuogz2qe3mkul17gb2dbzafhkb931gfmuj8k8gbbwqc3y27ugk8bb3n23fcvdndhkfr1ffc185j8tagj8u1w3cclkiqlbydsumlne265ftcp27r6uuiyb35bej6s7tv2xafxvehrsgbq6qjez1m1f3g2cw44ax9t5fq7vojfqr8eq4fpgkrc5xoplf73iq1cwzg4zbody3p7jdkz3nuqiynwl96f7ireq0fbnxoqsju2fhmfi1z9s5zvqwyn1e26w5jfu3qp7ylfntrojs5ri0ydntdwyp20ntaa9yeo56j1i1sq2yvx4nasphjmsuj5bzb3u3jfkj7tnw4shtjyzupzgs53rpes4p5vtrgbwgcw64v19syl1be2ss1defjv1asfo3uscs21oje936gtovi2thciiahnl7to7pyxj0y6rdvvgsl1aq3kyq3juri28l22smd90zc91clpxqqux13gfq0kg1i15pcbazz45zflflw5g2o758iq2gspr6er7gtfh8zqjhe31b1nogpc29z83z5h6uwfikc9z40ukpum9ppht3xmy9xek77cdh0oazclfs3pjc3j224fielk0u8j9ma0f4kdcfkf2do2m8z5srbg71v47nctn26q5c78ahtn5f24ehwtwm4h5qety7zrwmu27w0tbggp4ndzrtc6xbx1jybf2f0mzufx3qvzzxtio2w85alz6x6y74ihc93ennt1ja32lvyahh55dvpoolmvfogcb5ydqs9xxvhc8kvkqauun72ar24vrwd6inn41t86sa0x4dns7y58xl6o8mloku7o9pkvcg5mhop381cdjvbfj90o3z9tjvhctn6o5wmn3w0h1jc0a7qpepocf2e9jbvqsb6fbnxhyk9e9rbeav9ibyd17der9ekb3qz1e066zps4ixetr6oefng9toxm9ommwpookqewxefgikky1t1czcm2r6851vrcdu5nv6r93lqgbi2qw6mr1sgpjgfq0wxkhcifsuax9ylxtjpomw2vx7sbtck0sfgw9pwwduui45twg96e5asv9j6r5528dzi42lzly0qepe0ub23g9wx3247ny97pzdqsnxnf8auo0t4hb2yc5harbuvsdt1b56emtq07wgathz1ocmqfrgdcoi9m0qxo3kylu3pwknk0tzgfzu14jdm8n5p850oq0myfphev7zo1bli8nen94cazh2ftzfvxgtzyb08r7h1qy5fv18hkec7mld48wjfsv24b7cfx3odry2jy68kfn1d6eedfbgmwp7mvrt25g5orywvwh6krr01fdrfdvoyxkqpdam45chutyunpwqf2hcui9zcs9mx26n0rumjala66zizufmt9deyphcp5h6wk39a2asb77tmio5z8ehcbuzthrzw80dhx59ysjbeynmoi01b1ykg0qd1vb4mi4is88bjcoj43xb7qpxj6xp0yw6dh5nd02z2zlvzsbzijayi4i0l33xzb2jctifb2mw3bbvb2v0kq16q8xw36l4cpk43g7r7a8aza9mgyzhgmo7h0r6oz87biejy2mpg88hv311q4hijh79utig1lzfoax99xuyda7ymp770kgmu3yqrri63mtg6qtsybcum10w6wbzy87ziz4pmbutjysxhjentk1umo',
                redirect: 'ja7jj33kr3kv1qgzr2nk40oldc69poygn6jcngscsbo55lgrn99z9a0hpk6n5fw6w16rnef4ts33w55rj9v8ptq15e8515pnhigxevcukp2genc3oe4q2mrfdjfxi6stygdfvts01zn0vlpdmi5edymwvxo05lxa3gi2goza13icli8s620xas1ssz9ln3phs0993f2cyi4vj84fu1z6xiohevgn9naoequmf7ptw5n7fmqktcbpmjugxtcuerx7kkl9595166pa2hoa0d1dstomn5he5959zm53kmidmlzj12lqfbhws6yrdduzj06u49bruhslqrpvayqdrsy8xobunid13td0fv81l0flv5twzevgubf2v196w0ckvqcwjtazxeowo1lyt9zwm52vpn456yoqv3zoohqk79nhno1d9qe1pe9paryk5zlsad01glafiod89fvmsdc0p2spdigk3uvyiiqjxocqwhfbmd2x6nlwv9drmr59945j20ec8d9ws9929hcsmmm4w02frsisqnbpdx6986fy67m43uphikz7d0ytpblce5r50csgq97lb3wxuz5s6qcpnhzhurgvrz7c2jg44fcy4hzai22gvqclcrpb4z82g4sbhai725woh1vhdr86s0l73t3nod8z9sqr2gnun7anda4ipdggbqgdv2hhhohe2xwp6t437gktcrkn2zx92mqk3fy9le0eziewictkvwwidph5a8aq49mle0lpt4z07qc0vpdi7dwejj0f0fftp4065ykwyapveu5o51cdg2qweks5snn5cgv8w1dut4ixd4h78bbqi4el1tkg54v66pkjbr4b9ur5c1o559tfgv7yeilv64q5dx6nozgdb62esikdzeacouf2vk9ox3th87iwqhotftqx48avkg87rvaioiij31esij1hhqtcf9o7hw5lizieqcml0126esrntuvxxzhmdqq1gns03zzs9xq13wo6tmrifr9jdiwk1ebr3rsptg72wdxqs3tzokdggaebvggvzgiaj3dzbr58ez15x50x33befzgse4nqf3bqd6xbwbyue1w26cq7f8iwkse8plc0j5lj5l92imadkggozucmm3i8ffg2dya2g5u0vtsca3t4egrke223shf0kqvxx3i3sua84o5q702ct30tygvlo5tnvunvyskj965ago4blbwkuilmfphp0qgxzdb7ijj2a97xbnvtu00h0lumb7pof7grac5f2a778b5yp5sgd7fmt03ur1ce4noaw5j503gtdyagvoa2yq9o520fh5zq4cut681y33crqp6r1hxl0b0t6jgz1lqv725hx7r4shmjh7rx2nwn5x0qsph5783s964d6vd6pxtvz0xplm0b0e8mbe1jp64vt1ogh8v4wbce6ciszmewebs2ckvkcvhkgtkgdy11xlapwn7jts5s2s7ma1yi96geqskil5017iq02id9h92w28riigg9ppwd4awl1r9474bssvqnu25yciitar7n35eobr8a30w145xq1408uknzrcgi0hhko9s8bvsozke1wm81p39gpw86n6dcyxeu7ol0qfmthhwy1lgmemvm65x0fy45zas59ezeyfthyxs6cyatsls7ffisqsvvhj493yd786waelbj0ao4sbuctkcln37dbu4wy00st83fzdjkn7tyjtlogsks966wl6teh1tkqlruee9vpf6nwfiqps3nr5av08ueqbz06hq8mfe76o9z22dwv2gujb0brct4yk2l0m4axfaiwrpjybs0wnlhvxs6pr4vlg3a9aev5t5ar2gmval0mvd70qvydq8ba1rw1rtuqn1rda7s07f12jojnr5b7udsi4ubkb91p9tw6cq8owvuhxy5bizo9lzf65o7dgqhw8jaxr9nmvxttuel931pu0w8oeae3p4e408vl9v3glnwolx25elzdlwjsjkibp5s4u28qxa7olck0w149idxhn9mfz7578uqiu4b5be62p4tzsu90l5cb',
                expiredAccessToken: 2111668953,
                expiredRefreshToken: 4729132271,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientRedirect is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'CLIENT_CREDENTIALS',
                name: '0ut2xfroulc64ypsiapkoac9xqs9g0pdetyhukhpdjjy1yy132k441gd5t5garoiq7foho33ea4nq8pnd5kgmyxl6znfuhwp4xw452zk8ejh2ty5xpzve491h4vj0e8sulnrtvtjlvwt0agj4okkqa6pbir5h4zn4h9xr9jbf6bfm7t9nv20txoctxj3qyezu9k7cdskfzn5tuz8c0vzu44y3y6pcns75klvn4bxvlux6l2qix24ouroxejzxwz',
                secret: 'p2o2oezwtoqz4yk5v01a7t5vkg8pa4a543y0kufsbuok96wtrwmodq0ow19bczw2h1255b0bjeffzdtwg267vf8hu0',
                authUrl: 'ch4hccfow18zq7vhst5mo804qc3yxi965nc451wtj37vw0r28qdsihos3he0t4eu9wuqkdfwtg2acofyspnk1q75ncjk56m623onox63upa5at8xm5dkj18w5rby2pl3ug22lwupdtsy6xwb99musiydrtprwhsxp4g6nusgnrl25ip0xglta4zn3ezwzil37jav5e7vg66czjamjp2tdpvrczx70v7k2x6q5hlf3qz4tdmsy50psu6i80zaw2cn3b8x78vgw3r8to8yi5kh5d20jqcqv7mtmcbcshsxrtsvd26lr0p9h5g0kr93ajs9xbk2dselrfs6v6m73q0r51s0szf2yslhr0dk04bjhbhsddw4kjqn49zxbobgp0lxxtva1welpb3buqjby3ttg6j9fw60t063fwpzeydyw0j4rkuwjyqw4969arv4jo632tesr5rsa59ha3kq02cfmyw0nu72b9zeg5uip2e95omv1ysrbj5negjajnpjv7kn8ffgtfa3rwu11my7qd3mig9avnlc8lirx2jax37g4dtr1svu78ot3cl8ugbhty66za965tjl5pmerg4qmtmi5n3bi9ejksh87v4tdhci042n7c95eagmlfjbnxgydxr6fs44pfr9c7pmlelm1iaon8pabbuwq8q9zlf7vb6xrn51heg0u5m99vtu19b9ylws3iap30w5fkpq9j97lxt4u9plzs9ayp3snkt9m89u4rq341w8bj8b57rwc1vkx11o46n1zymtcp7lo6vjjqbue203ua3h662je1e3eevej0y3t8r08aha4e91nqtpbcqngwotbtdpdsxjeqiz7po65qgm59v743wf566lcumoz7rtf8yt1xy1zhtn1rusdqoty71mnmye3npwwvuife1msonu0p1jd8l5rsley2u1aug13ilyluactzvejhouxw2h2suji196ky6emfqiui8jmo7kwfyesfbxaq4iwfq8i74qab85randj4sp8ossypagle93d3kwk4w0mgwkrgezhlv2gpckv7l46ivh64omst1d1hjbpsgspcz60eefc8yvhqyhbjh0wy64eaxovr5gq812sz2rgw2gs4e1bsmqq54z4pmsw48i7ldopt48l8lbsx45rgy71v1at7earv8jpx11bo1w85akq5bzx7s7embe0ud5u3qnzt1dwglt7vqs3vxbxnyjbwa9upj2cje67298l48tuk8exdqparmncqzzeldhxzveqlcrvq9px98ui3smvd3cvpu17k2w83dyg8uev4aupa485cvfkdf7atdbk366zbjrks99vojel34jm100kchaenuwml5v4r4llktuk0xbmpleqfpgfilq6yho3xp6odd416tbp8d87068zmbvma87475opmvnhjr4vo25jc4wj3p4tvuxin7yd6poaxju26vew5k37hbva4hctvh39s2c8a83x99v8w83vm3oddpxc7rplfw7ddy0xr5oj36ngf01tef58w4yh74acgd7esa1f1glairrr55k906te8knos0qn0zb8d8kir4ozcbmgkp1wr1eaa2jfgvagjnwdok7pasumqdmr51a8b5855f2x27muwo36jb4y83ewy7428lg77ge08581fpcf4dl3j4gqdkdg6t7bvy8z2tejpjpo8r3ykixtowkbpzjmycn8oyfjusgouridkg45m0r4dzf2k0ztxavoec210nhy6l3n6nfp812lal4qy3n0byy46c4is8eq85p93oswx8h29qpxhe3a2qe5f6n78qsqdoi0a9lb6hq79a9r510wr77bayd5cpjusywzygjpwhe14si25a07nzfbxonc6gu8qbo5nnqy1q11voky72wkm6rqe0ycwpmcl4xf5n3xd73g8hzblf9fpnrrv8wei4b8zj2gaqjnj374pb9v6duko9h37e4n3y43kjpo3334pzp2gfm6t55deb3qrjwesubyrrw49xxe9pjx7tin6y404imdet4l4gicm7j8o2j',
                redirect: 'vsssispz2mpbqwfwlckza4u3m6i1nt5doqrrrr2l3c0gwkkqx63sdab4kus5me6d1tfj928mee2xc0lm93b5d8aai08f3mb5g5yilmf6aijtpy32r2znsvxz7cgbdcphkvjfjrqjcz809zwfvzecyllr67unuzsx37h3i3pjhwifxeue68h0y4qbk8jmdp57d8hnf1jhgmv1u83y1sh1n2o9u1bncz8jae63sggu2rco2izm2al7awlzlconllibxjhnrkka9s0sh8lpnyhojp4naj1blg4fa54ff75a19vpl4efmthpdvjc27atpoidrkgq2xrr64blppo7w2p4fcmdjepd4yuly0lljl93nd45frumyw0blup69ccptjxacymstlu5p7ljx2x8cwtwkbya4zmk8uawdit57okxn9vsvq0xbk1it8o7nq681achy80qx3uywzzaxah2p1c9wa33hia6e1o7h8o5ggz43qoq2jb7dgg5rw6zx44mfl0zpigoctdrn1s6xrp3u2l3r7o08iixkjbd0krt4i4guzucxh2504lz5t9q8yqsu133j2v89i9xpmyv706xh59gqv17kbct2v0l88kqe2775522f2x19mx46wu2wcv409wi8vdx0050wwr0bi8j7qklx170xing5ptcsec9sxjvxfe21nchs9xerol9leb1p4eeoaajgqkqwka2w7wykf81djv5t8u3os3eh5wd14vafl3334in257wx9mzgj4h4vcmvm5svl0lc2dh8lro3g2cm73svh64vjqzm6yz1ec1e66vh40co5x2c42v8z0tnlzncmyysruhiuelfkil1uqmpkfxb4upnvynuyx6d5ujb50ikoyw7j0iu6wr4ozkucz1xy54y0g4vqud7idrywgs8utdxa24t2tja3kv4i27r715108g09ecbf3cxoo4wijeme1qchofhvxse9qfwo7bu5j5cdg1yvc6f3sakl6f8j37jyhq727wev7axwr3d0q1kvefkl95o2v3x8vx9xwthl42ocs0lsinpbpnkj8sebrjwtsjo03yeg67z1s3euuafjg8fcvu0ejo10oo2zvgriek0oxg2nbu16ju7zhpxqk22uen8ogfta2w7rdto13hvqugqwna02u9m9chzp2hvi3s4yrk9rrjgsdrs4jn0ek8nv4ytm4wra6e77ku7f3cs4lvf8xr8gfw1hyhw9f16tcxutdynvt5m4spo9pe90ph5dz88hyzjl6b0jp44mn9x2t3pe167hxp9oyv9kl61xao3m0u8gy0zajmcuqe5sdoz6jyah69fhd0sl2qzua5k8q7v7wtc3fbtn7iils47csodifmfjminz77kbyq9bd5w3wlxe01qfv0hs66zbcqrlt24istdv9h90p9vxflo19e5ibcaiucqjstvmuny0ckfm31bt2bx6a9b24pa2wsh1r4qz2881f3mro8ikyd838s0jg7nnkbthh232cc93irl0ncjaxi60jw2hpo4fi7s5w3kw8lzoa6asjmhfw1gwtev6ms8cmwairo76a38614dbgwzyhalsorr3k0mydmfn591ov196966uybj2770m63m16382i9brww0q3khpi10qmupbpgnh77h0iexil86d63xirl2ddbxw63fphhgraltbwrjdf6rabwvbda6hhr1vpzzylmmk6bb4t5sujeeoi7mq6wwqecqmkhmtfk0bweuy4uhnekciq0074waju70ao4wpfkkl4gsnnet3wyjna5h8lca5zlt9woenm4pps6iur9yzn0u6dehjxnnwh4tza6ve136mktbsc9feqcrfhsc9adeox9tf5fv0z2fk0l9gp1cqlfvsod0b42jjp5s71d5tttgngfcqtxnycel17jlog3v5f6sjs4pm12l2x1bedz2d29tdvsvr4xw9wixcm6dz9fk4bcx14c9udsub6i0l6bxeiimgnr5u9stvetk4dtialu6uqq3n4peg26y89a5ytpcp3l1axhdzwb',
                expiredAccessToken: 25019857404,
                expiredRefreshToken: 6666482500,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredAccessToken is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'PASSWORD',
                name: 'eqqlrrh0nzjf3swof7u4c7q8b8y2nyuwxld1xh99zuvrgq8fu07g7ngx9qioocpcfdboj68is9ncbwz2xhewfouhc6bcs08ywq2ypy7lm5cv6ssu6qqer53d7z6c6fgxgks2sqsxbbp6lx2pytu3lyuuqtrdir14hc2niipqha62wc6i18wvo0xmkrqav0u3srr3zf93gxa0iq816bmmxnzua45a2x2i149tp8dai35j85h3iuxpj5abqhwdhqa',
                secret: '5gj8k70lxu82gfsx8cc71htpsyrdvyhqxqgsmu8vcbbdg0x9re87z1apfs96s5swo2rt7pcswnv09iav1lfqdn6zf0',
                authUrl: '0jj8y3bfxa0ii13rp0xgzfaa46nz1np0ntcjje4ltu71bi0u3iertlejx93c3fzp64yw4h2cgf5iea5771x8105g2c11pijj154hspcu6s6emazmlt9fei8cd31nn72jta5er4oso7ngc8wmrc992xchv46dmodt5wobt4pz3sqbt1gu5qlm789gojps3zd4fh6hjgvrojryrs1erpnymensbipm41u4ay8r909tobuamzu5yenakzmmqw2w9jqjveo9qjsu6x0um19pdtyhnaypu4w64gw4u6dfpjpzpbftp5fy7d287ld120ftbahmltafm6v58ryyeyiplsgy8qr7ygssit5wrjczcf1zl96p8yazz4d6zyl6co8pkkzr7f03uqk9i88p5cvidyr2u889kg8znc8opupr1vyts2u629y2mrlxdkyjy2hw6x3f9hx41ayooxy3v0kloj1zr30t02iz738k8en5mlkuxpeu3wldbgg8eav8qwz4m7zcbwhw86tb3bsibq1zblb1xhtz94vcz9k5de8izvujzbkqrl2ow3w8gyw8kx0nhtyjivbpaxep1g58esnq9fs94g72di10w2aqeisg81irxncwziz7g140wqucmo0869p40pjn1ol6lax0h9toezo28cuib0v7v2t5tr8856kw2nym81qp76rou3ss94mh1kf02iha7zygvkdiqf7t7bai26dujga4gh84ga4qkjha78gb5egc4p2olo0dv057ooy9w2hna2gtrerwf1hrf47kvvyken5flpf33x3i9pf8xy7p65w2gaykhxw6098wo22po4u6b0lzleiokyc2xlt61lkj3047e204tzs13imhh7qj21ozg3enh95jqsmtko7k4991cjbqmmrrsut6kcart4t9m14p9jkg0t38u4s7hl9yb18jqzogpbvaitx77t87eui2b36l260xhx0gto3756c8t8p1on2fq3hb9q8lfon3i02k4npghgcjoj80tuuntiykrvpk0h153tfbg19xcbdits6q9t2q7tqilpzwyadr6qs8hhqqjniyici4wovx977gt5wq3km93c19orbosphnt0c2gtm8jl5g6jwy595vd433r8masvdt1t8kvyu4ttm7u1e8o3aq02o5gf47z04d4l3ala1wrozqbxjq653vajhqlssh4xu079l3oeudst91fyk1xwpmjnn4133m283bxf7if7pgz7p0t2h3s601fmalwzdxl9o3hg131trxdtb1mu5dvhkamyknjyiozbmkz36qgrqu7y3z9lwyrzfb60o3nwg7r6ywi7prsn9l05bjmxfkuqrht0a2pkubhmh41dimo81s6tbtecflokde3v052w8ypxh0w12o5eueds5hdih950x8lmfgzbgmki7j8gqtdxjxdsk6xcf9whzu0al36ej4p0qcoq79212ocygpmhh6p9t8axzesjuhg14cv3k372n9e0nuz0iowvsqmgeei9b0v9unmofjsbc7e0a97q3w98bvvvx75nlwbako8lko4mhclzeeiv3vof940g7asbpyejramadaehwv9uqp4iwfyjl36hwqxf3g32v777kweuotqw0syu1o9mit3l3e61fwej0jg7x3mv3olrqqo08hws92grytus4yutv4frbgxlgz90kbbdgr7gp1cvb30hls9cas68ypjc1zvd3r2xxg2ijtbzn5tz1um0gp8z8h3teloe11rwji34qe0m7bxfok3lonjcjrzrjelhv64b9d83nel1k49100dwcsgi9gky448tjl4dt9uthz438wik5xqd2hfuc3hgsqcyxuf8s23et0dzlzzh4229oipr0eab14xe66suk374vrujkwgvwyt0jkod1o3uwct6htlp7trraylzzai84het83xpxfnkdvkfkzpt0wrkj0lyz68kkdg1ec5t45w6ratq8j4z026xfo2oum6tri8jj8kryq2pasy7428lnv3sl2dip7865iia298pycl1gi',
                redirect: 'go8oz18icmr5fmkuddjsm3m0a50mdvd14bw880hna6gxed5zy24laxad6ktaqnlwi258mv6ke9eziw4exwdudmzaw3rtr1q28y1rbq783id3a7qb2l5ker73h0my0o2bm9p90den4m4j5x54hhts6r5nw8fklu0dgcinfnljow9dasa9ih9bdq873scs60ep36c8zz83lm77cuo44xku83yvsity7qn2mz22dx0d1n65jimpj0duvq572v09vioy5it9ugn0trmhzorkwrtmffe2u96r6wh295bit3x1697qk3cpe3ww2hxi2k9x3e62k7ss0a9l6qbmwemt2zu7gmzwc8ti49n6gpcxiqehlxr32per74t7w7lur8gztm2260utklyadcrqzk6jyyzb3spgubd5hwj74smwrplme4pjme64rt70de0vidg61jer1inviby09fbsv7uzfgg2uohm1fq9s8bjg27wx2lgsretgwiwba7kh2oa1vwtd2l311tbbrn669hhnziacrth38dq7clgiymwr7teugxjz8lvkntq7oysqr88ig2zlmw35sz8iw7kh5d0fogedtk973k3won5oo9m55ucrj9ckz2swozsd1j58yy4ikodxp2xh7w4rjtpxx68cbup275bk88427yo1v8huos5qi0pq7eelastqpktocwciaycqde0td54ymdf9vr20pq1jjny87uhu3ep29f5ooxi1oz6kt242khrgz6hwm1qvgjacjlb97nnxetao2v53trjc5ogpzv3eg0r91w1zds6vwoswcrjj53vskygei6rk2gkx7k6f10j96fhqyntba5rr8di6vtdttjkvxb4qh9p6f2we9gts3syrxoppy9r45hncgzmx3c1ewo7nw4omgtxzenagm1vaqfmw70rihlpnyexyyxnu8zot950d24uvgf3ta2edjmgzzaij8se8l42drq0rsfhgn21keg42yj6b2nxrmcm47i8hb9gzy4if8kyie4lu3aaw6gqm7og90h91pr1emc6plwbd3a3ky1vpdicyfwk5wgflhj4jkfodvbkidr7wdg4syecw5nacps5y2y72cgowhsncxe1iwu5ocbe8vrht4tdbx21ka55i1rdnhkcokruclh31d3sku3aiu9vpv4tezgwvs07nkfoof1psecb6u3xbhcqyu754fli27j3rggb5c8rpah77zbltnikxlo3l3ux8cwpv08mn2zca7hlmbj7qvqurd1p4gp6ufo4sfspxu1dlxcojgc93nniws01ri7aelobjloq26vcuswhe6illxt20qaawz0bfnsmqmi8uawpn0t2mqhb2n6c1ksg7je6hd591yoxkc1imr7h51o89ra8pjjlbcbnmxbl0arf95bwokcish3jq44o32xfaymgh2yvnawt922k6q239dlab39ebltd8cpy45pnjxx9o4kirr6hhrt80o8ubdb32mjtebuwhcvml3s2czoq4dwczfeq8h0d79ryrsj0lb4fasp979fc2cg8vs7qad0yvmhr5f72853kag9e6w5mimi54zcia1tfmo1dw5hpitb81e80gx4rfxno2j5a14wifho5zcco0w7ec0uwlc43mxzb4md6xvrrc5a4zyzmx2y4rn383qaxangum8xjpwmffkmlsm7q0yqnuu0rymxp6dr7s754mn04wvdqd2pjdyts9g1j7xwm2tyyj84pkj2fjb6sl0i63av8dll9v2m3uq46tqmte0b53w0rk14ok6uctbu5ox9phu4kjnzml4sx5paz43vwm44ojn7cmedelrd7k3ww3csqgqpamnz1biw85840xn1ekqpbbiqozuux7e70keh7al7vcp4rbzl3zh2ou2c8raehj472v689mbc7yuvwkto99mj85le2r7gdumedn5yhoxcqiy1wnongss7mjrw4ulx7h16f5ra3jxh4uyubwqdoyr6287gw0thp6aduzzug2n9gm34l2s0p8tc1l24r7m6gjd5h6to4',
                expiredAccessToken: 1715548440,
                expiredRefreshToken: 42078983467,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredRefreshToken is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'AUTHORIZATION_CODE',
                name: '331ka8tdpp7vey874gr2q0x1a7lrs12dkaij6byj6mlr1f7t4xphwn5wciebjyeum91s7o3tcajm6yuak1e0ewmn41x268iqyx48e4prfhnt87y42oho2isehyv29brf4ejl4x9b2ewp8uh66r3w8hvv5ms79zu2q4uz4etijx5c2g10sequuq50iutrksejx617ugl1hh00gkj4plccznv1lddxlx0vsuc4sqc67arw78o0vc44h15m13nx8yv',
                secret: 'y9xukqg6u558sl7tx7du3p77ug9s1aj26j6gslr8ab751snz0i2e5fm7lcv7izqqj45dz09m16u3q9qg02jqbq0uez',
                authUrl: '3ts4pmxn4xqmq9gq5gztqqbg8whtsell2rxtfxjf81tv978ut3hvjjzevij4iyr37osfgk87xt5d21kcqzxk4t5poavmfth3bb6v2b62ntt62kuujtsabkgvylq4v7ghcuf9lsphyxm36uawn2ll7t2cqyp5e8kfb1vivczl2e4iuy6b07i92gbpdopmm9md8fnsiu529lkz9yj4doxvlkcythqqrdhoxk3n6hbp7f9f0kx0erlv6vogfr4kuxkg9a3qinfit4iowg5lskrqe3vwuwgva42fz2l27k3ztztgxkf15x7zqi6k51dlk5t9cj1pzb93qb2rpbtqyzqocgpq5vy4da0yhp3atve4ypidahnhf617wb8wvoy30yeytj9sbr6h4zh9qhijlzsfrly14x1mjcyen0611qdtlpcyy27qmob6rit5o0cbsqreuxcm7q8t5jym24ku5pgtlum60zqe591uggq9vgcyt2k15i2iveo1vmxl7yc6g7i0dudk3l8kviblbs8pxsf4vrgxyn1t2y0zv1je9mkotpwngjip1i5ci1qs2t2ezfzj6tu8z39fa122oufttaj9722w92h5sckfrbqn5kl9xzhbmmpx8wzqjfkn5tsvwdmt22g890524dfmca9muwu9birxd6glcblml1nuqbqixmro1jvjvkqyh16xu9k1q3gaqok2ka1vu4027sxeejy8b7cfwx7qg2ynz62gfnh2bqu4xb4zwupvhqj0crdvqaj25bxdgpt3ef8afqge5zguegho3c578pvnp651wpmob97mlwo7m595wh22o5o9jgkvtwf356bpbxjrijlf14coll2qksc7tu9arp8f9apmvmfmlf80h833aciasb4hnr2rsmtgheynfi1w09k3dtt71pj588g4uxii997e827v00a3cz37b328bhjlo32nsiyrcix0pov73mdj9b7m64jsnc782gxrp90k8wtofim40jfy7doehxntw31qqht5ic8sgata5pxfy07fg7iz8c4u75hpan5w6msf08mye8qarngxo4p81fmj8wsw1rlr2bldep8ucdxrkar7gtx70ck9gztd4wpv9ktr6kmizkmsdt8wvvewjffye9v79z4gd7sr66xefb889n2lv7tat2ch28qj2144qxyogq2afp5qkkp0hl8zls6zuul85p4xrqfnhy23rjxj44g7s6eufaexw5hdjm29qsh64kafosd25ymawpkny2bioc6u6d6hbvfcsz0ylgreq3hacks6i6ey6qj0ndog8q6lgib4hw0o76fhx2a1qskv8irhmau9gg473qcxp3pn15n9a5pvaf9j05oy2s3ex96fjefjfdxjsomqay34vea6kb9i62b0sb5hk3tdibijokiztgm28nxrfg3wksbmngxgoi5wcjfbpy1giy5s3on00xlsy88nscb1lr7t86zt9lmp8wvpx31ij8bpm63xqpjs9kwv1d9r79egbw6axleqa0d92ynq0qbpqy7bkrafmn5sro1gx089p9gmy3smj27n2v55298m4la607i5kxkyzbcedhbw8jdxe5lafkk3ndbmcjah05pwly5xuydeqf1astz71lhg61j7ogxn2rl0bsj1bigffuqly06sj91wimeq83c9jc9vl9x5j4aa2gz1ihvwvyamzgjzy004xpr68n0hskku3dy5m9470g7h99pyio37fpcb7v4gv01t551seey95mz01duj9vpvk0uu983k5fell38it7mp3ugfcmx9zh1w2326ul1otwhryjb589nq3cafdcstromu0ylct3y0k3n3p3lq1x4a6rnhoi5uibg9wzt0je4rhuchs0lmvi7y69nej6dxbq4nvqf8obgb9sdla7v7umvt1w0cru6fi2y8tm5hivhpmquo8lkxskd7lhtkn597u6oh91bxdb0yuce82q43bmpd14v0p4y0i3f5fxcawp6sgn2olj1loz0kqhdyurxz68t5tckkxdux0ea94ufg',
                redirect: 'p66i0uraj0arso4wnh33pxe6q4tiringfwn1uivkt2c5hqfyh075ho8x54o2y6e0rfqffwhtm9xvmibzzgykj8qux8xxxx2pntuv0njupyl61krfi8zahip2g37i87bqktywd4dynhg8v3mlwtixmynfn903xuatlj1vgtwr175uwucrbnclce64uy4nf7c4ho1lcrffw11j5wlwf0t1v3auheylxsn6zu4poebr4l1adj35ftbzcpeb6swlhymomqoxgafgy1ymbebxmi68pe9uin7bmvan28rd2lvsounz3pn2fx6loud6er80j805hrbg21yj6qifcd0527v4gc7azkc1ajntciaddr1lbjnn0jaxx65uckemk7ya02keu8bw8qfypt1i7jv84lqfs3njyrg19s6vj1yzpnt3gf71gw800nu7hkl00p8mzxk5jf3t1a101w1cy8xz17ne6odsp7xrkx5phf7faqz7ir501loddy71ngdno6n6z2d16b2bkervvj1cv9rkc6skofjyk3w5rybi9t7j8ynm9nq7p6c0mrld3kr65r6luoeqvu2ad6p1j54duvdtq74g7cutpl12ygl1kak6lkdiwu6n0wwwohz8lryx2bucly6wqxljwt055vtygtm3ikct6hmxx5toccnh4j40ahbjraaf5bviblkbv0n251wqlbb1r0fu00jh4ter433hox11asapxxq58kmu7vjxt2k5yw4l6l4o1hge0mlhhxr0ke46azxkizcw41vs3dlwdxyxdystxjkn92kt14hhp8mezrh9opu3xgulv47ji6tzd84ro8q5di6wzix1h87a8r812air1y9pizc67hj3pfwq2ffnzo57v7yc9qrjgois242nzqu6crcs3v9pp1bc99p72zhipoj5isf8n7m3wtw3tmg41yeuh6zq14a4g4a3m5zjt5tdl6ailkaqeny7d7yswvi8hbu15o03h1ctymbc6a4jwyp2ozyatnl8j9gujxdk67sjh2heq58jgbqdfelhtoqodruhg97inz3nt2oxbnx9epnju900sgx9zcs12n4x7trqgazt2gvlhlqsi6pkcmaxzex6p7lq7e4bgymzzjhdzkq0fy4w6xswjuvog2amhk1fw74pnjkxufjehnpuiq3d445df3528vgck52na0poh3zfu0byk297amb9rt3sl2x1xmtgxyaz0k48gbu8hg8f75600d0gxst1mquvkrhmjz4zmr9wnqx003ptxashhndniq22dohfw04v9r53g7fx2y2t4663g9sn811np7ghx7iz6eke1yzecgyzp0b3x9vx6xcq93fi7u50fnddf5mnqcwakw9sfmt8dnnfds33f8gx1fcjm9voptflye7a3wna86pxsrlgp2eesjmmtjgpzmjm3woqy0bv1n7pwvk9upmtkdsbvkqvds8wkn6626y5qvwr96kajaa1qe6cepzrs68rj86rugs1igyab7an51mqls2nezxtgqzdd4pyk6ykt7q6tmqxus5t0m4v20iks87v8wg77tedi7ibxhs4a0w073x7kkfispbxriphmhkg04vykayr21mexahbxtdi0c3lujlmdj53r6apql4a7uy6jgjw9ypl4w87zfx7807dl2qng3c4wctf2rqz3m4y3tyh0587dhgbtaqaotr2s7riijs2q2sqwokt7t60z8ypxb6j3ljccjr7hmjlmxe563a40uhueg2ne3ytq71ot4e9zram61eymhj3n0650les16q19jo0e285ncl5ihqmg2x99wo1n34ya0odwjj47anqp7msv21zje25xc40bxnhwoygwl8ax74a07d5wcdybl3ru523q2a579n8jlztkeyg8ty2k5amh4414n9mfc8mlzfi23yi4jecyvgwoa39yo2m0f552itmy6ed01p2duqkb3rqm2ssm24gbeeclnhp19htchhpf3uncmbey6krebm6t0b00mxgixi8dn9fhyxnahxvf9s5bre0956z',
                expiredAccessToken: -9,
                expiredRefreshToken: 6213144524,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredAccessToken must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'mspz3kjur5p4j86xnndqz8jguq1g8ydixvbx15ujug4o1aylgd9azwxxazmsw256u0yoydl5xmtr0q7wd8efvouq3pjau62mtd8iom0z522xf40r23z7og3c3p349v1lyf9rmtql5b2f9y4tg1lw3aaz713pdra5s8jkf1ud6oztgnzsd5h6hheaxoxhn9kzlz7gfqhpe4zgkarvy0puax1t0efrs6fnzwrnhqt73n01cb7494opauhfnd23cz6',
                secret: 'g6cbz536o2cjpz9pyfnsn1p6cul8xla84l5937o6ikgql3jmedeta5apqbnn5fsfeen21aef4tu48y4v3rrt2x4dv1',
                authUrl: 'h540a3loxv1vddo3h41q09tp27iesau7vfkuc3vzjabw260pv2g9w11h44m3kiw25ds4lhk4108pfcwsxe1hjzgv1y7hmlyn03p0ilxc5wj7tb2ojye9e680yw4rl0ejenc29nxkj4srvd5ob0fj2l189ww4hg53dqd2i9xd73u00osdj349akdgpd53spxym77q1319l3n3yshxjf9y30nnscuzfewsjm0idd7qh65y8nudjt1rrslez1z9ii8d00eh3fb19vl8adeni1294lklggbjc3jhnufnfv5w1his1e2orgbf00d643cgil1kucpshvwe294m3jzczdgzfkpbmiln0e0r8oda0obbcc01ssfg7i7skvr0aolsetwvoh87hkf6lg7rzpbxcmgvqcyid6apouowxn0oncntei6rbmo14qzoi6lfv1ii9g3fb2i75ye0aubxldicfkqgr27lbgbop53xkh7h0wviwo9t4e8tpbkrckhh7a6gs6oko1a94u9wgfxstwgj62snw60ew5gipk3jxwv4logy3joznfnh5hqb7mmu7wydx7bdrq4x4fcvx7s0ky3277nd3fmterk63njvftn0raw928x1bpjjlc1f670pbtssu0lrdr8yllaq926dcgcr22vwimnueazbb4o8d29c2b5anleywodj2dfav99erg9vnoj3ci29pbcgincfezqe16k6luty9ilr1ozgenydlul36n8xxyq77elimmwtp6sxby2mvoc69y6ok9b07vlewrd9u52ph1p3j3x8z4ov31guvvssx0403r6g2hvn6v3te8aqcs8x7lkdoavup0ovl2vwyilccs9e7fbbttm4jhctwx30iudfbtrhua4lyxagfcbf5vtpaf88ysf2rd3t7frx5a4vm4yaf7yht8wu86dsrontz5m5sz8zizwotz97nuhoiva0l7wympdv77a6a7m4h8tr0ib3fcv2r4v5kh9lzy04tqv1k8vb11cla6ktuwa47zimc16f6n8g1q1kpccmsgac986fx7zpn0eki63ufeysm6qa4i1s7182hu84lp8xp6v3x57wxsx4xlvcpluk2x7p54zprzbou0u1l1goy6wnlmdsfpmr08k880h18poa8aqv4ot2dlp1ajr61sj98kd6dpy6avdz03omhcsti2ybyg5ipx57ml2tip1nb3o03e80ma6o0dzetrqcpzgvelg5le0ez28wt3jl899h628lckyur5p5nb2zdbdwh3ddlolj49t3z8wevibvn6rwonindjyke9eix0lycqx9besrmk8xdlwr1pu6txpjjppggb66udrtlwd4cn0o2diotyu1qqjv66ow3pr8vc6g9r11bxtineevz4r3vnlojv8abrdi9x0wx4xvabrqirb8olzarlpl54s5j4bmno9a5dyilhpisg8xm336cb6i5ktkhs7ssa26noi3fq62b98xkhzx5tjk9f72wznblc9q0pnbubxqcgs8qakncx9woa74z6godzn5mxwffh2tv7ubu0b9msaa09d38vysrcu9v2ce40z388gm4ae2uica7lhxrf8a27c8ieadf8kn7yo4ryfdronbhtj4nguncwk5t116m8jqjv8lylifkn6b06c8znkugsushgy9pu9qkx0jsh4uh4kuzoqd00b0bx7gu0tq07bnjzbtidcvdw5sxvsw6hf56hu47wx5am4a37co837rzdue098z0dbmzy6rpbyc26hwr1cnna6yu023gs9sllcu05eu2dzsr9iaajdlcji7lk1bjzjjkosfghn0sbqp4v3qrtugjio5klj8qd0oof6okde51z0qlc1fa7gl6o5m9knqzs55gsacd9tpklb7akkwaeryl78psfwfg586li2f73kpwcd309y414em7gdtyk8ugx62wx23i0laivhbc41a5w9qewsisuegdzb1lm0lme3mrd0ic142c7ir2vb5g7ien2zm8zhcj1jofsru3zb5v6z7myqp8xw9uks5',
                redirect: 'axi0nj5vlppq1fsaa8zws0phw6zl7uva235vo98dbm0q9edazwsxi3mngny0zw1v6mckbnl5tj9fyk1v3ekaffs753d5yvjyb9ahtq5sgef4ixjifwhlt8mgs2r8jjcp4oavi6xhf8to444i7uxwtsc3028yt6817qpznixob4al8cg7l4wg822n8haucc08diositim4qtpizi6rgod3n1ehvft9tul4s91g7q6vbg7moa73p7phikbrreffw1fdhnr9q41bagfkezw39k5bai5d0j6zs0oaavd6swoay27yobib1lp8gtf9du9ut9bh3mofjbecssbfr8ppot4uct9tzzf4lg4h3zyunh88n338fnob19ka38mhuzgwrot00nbd6hyre4uj023i0w8y9pv1ltt64owzwou2mml25sf0wqs8q2tzrpr87i7wix3jw4sw0omznjpt2j0mqfqnniht263pd1a5syi0jsm7ht4ehqcnz7fy751j6r7mqndmxi7rkjefipxa6nfb61ez6vrw63tmwfj39usq26avrlffrkap5zplrtibb174ahyv9s9rjm5bi9had3kn4zq2hwv7stewepj1gramy4i32xjtbykrkveuia75cvl039lns8yxxwls0oewvr5cgx0vz8f9rsljsngda7kz7rhnjvlyftnpdypzz12fn17nibd7vn4mmf2nfl2t2c1hw72dyzowi8wxdvtse1s3rim1yxstwccvhd3un20xiwjg7mbna9kdsdhdo2bi9l8u6jc49czfi1u7740e34si532gzn7rjcr44537a9jfp96kljbxjduhfk06iubwjbc6wi0j3qpdzsifjzh99lmkmdwt3ksdd5uc8g2vpfqkau6snfv3zhg0hg71l3ecv0rzu4qi7iaun339daof4cpach147kx2pxv0i9vq3k3q8f512ao4td62uhvdyefurhrw86co9f1gytsszti4cft8rrxogcx8c4ck3gewg02zaqwgswy9833j1rb2r7qh6zzwzrn0uudze5lffie6zyv70h4xbvwdq7cmvrnruozwppxtuhfoxo0iduuemry1ibsxog0u7jcbkcsxw3rjet8c3gni9mxv44ljv5pycjp3lr9f2wrp9jaqb5sk8lq3awx5nppi0hqwg7u6b656flws5tj1t1smmhh416dconc20mvc8dp9evpxo308nnwsqndzpt3sfwft2k0dri9rfyp53p1jpll4433gdvbwzps2q39kub05rmbc1sdpznktjfh4li124707fom2udrakqvwiu6r4450021oc58sn5fvua6w41ts2h5vueff8mg11t52hn7wyctu7n1ekehcuaz8zvrftid6rdub4gan60js6lcc5d172eaz67vwxj7gqf691x7nz0zh1w6hh7qhz8rzqro9f1wxyqz0jobdxdf7l5cyvfozervq271ecuogz7bqvha2v6r3b4cuqutacowuaoz7x09xujm5nkub31hazg9aiftxd5vjc199b5vm6uuijpx1e91b6d2r94r98i8rmv9p0g7c3cnevjs8svsijuaw0pqj49r8maeog4qab4bvs7h4xawobdkpjahvtosjc8f2ch5qrzung42i8lx9f2tl8s5if9e612r184vybmoqgei3oz1yyu5235hkqi020kdjz12repocrvqihyb304cifwwsm4j69753xxen29pvqubiko802bpsleh321cul9qbvovqgjbn4mju2ffnyqxgcmad0wzwp18tqjy0c7eoz08lamdkdon88nzw2bko0b9k83xzck1gu6wijdmm8p4lxabs4yjl30qdanj2z349fkh28ju08lwn5js5nhxk39sucaf1tqg18419tacghpfx1tpcl68xwk3pxpjbnukn28tcrfuikklq5orcvedu41zgkkwovq0oet43zi4k9ph0cr5bu41mc04oxv4yi9v3l0wg4d342j69b7gu4w88j22foqn2km2m1yy46g3elsq7dk1',
                expiredAccessToken: 7585164522,
                expiredRefreshToken: -9,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'PASSWORD',
                name: '1zwbn5lary03g35bnwdlwb6e8hshdj96z87xql1fia23km0ah3uw6skour9vxdyr606l8s70inhd6hcl9sdkv6rbtiyaoylbgnxzj5bwloh91dris76z217d8z9c3zqj2riymzfbonl9lwcgmvtf0yuomcnom47kkqk4nd1hc5y2o8t9lj7yxxa1ph8qxak6884je9l13o9oku8x91aj4ugoreodx0oi7dultjaw1iliiz1bdek5lj6xa3h3z5u',
                secret: 'cy4kv7rbgim87u47uodztxhaaehtaanne5p37i2qhbnoi15yro8ly6h3h5j4yux7ns0y2vfoysl90vzftgcm23fa68',
                authUrl: 'a057uoteq34d35nvq2h8it6cugexeidtjctfvu16pv7fdl8vkctv7puiri2o9osq7jl48pa1dfucr3jy5tzq1f22y4x0vi2aidiad65fxwmit5zseq1mtua8z3hu1fumv9ozrnr3lvj229c71wlx5zno4zl5h4a9ydr714b4fvh0kgevji20zpa3dyri0tywfuy1a0rh5g1rfkdhegkyyxz0kgdr8frnqzmtekhw1l7hocrj0h0jax2ju6y78xwf7q3x2mmi5h7g7vlu7v2vyumdzu3o8bcvlvr6k1d9jqcphctveow0l6wksmbt0lpzblg8tn8c91colii1t64lm29w2tmmbl0e47qb8593e459uxef9ttfutm313o9722qel0lral7b1tst2z7naa7judi262swbjyhfnkkhgufn9lyz3su8st37hkz13gvetm89h8r5g31r7jm4k0f4mw2vabd9daonfc2nrl9c1htpa8kqdx6bs63wpgxpcx6kpcv9ubmk808iffucjpy0k7010o1vapwp90lp4xlg2pwxiudm94blgmu25amsg5ih89eecizhy31phgwk2njumzvdxqpc7pup4bbjv4k42xi877vzdgftxcuej0w95axepy1kgnfm8yo9apzauhlhgs105cfasfh0j4zycckbmg4kjyv8h293t268s7bvqq23b0ptpq9qkfxu9yqihz2ura5w8zn0jqxz0vm71tsf8zc5ti93z1xzx5u5n8fvhnsq7p6ybfo5db1miyk43dajotr6m3qt98y2occg92u0ybd4641nd7jf4c6t8ooxa1v0mc3yo9xcm9zjeaokpfs9678iqdube89yo8xlxsvkx9yauopv9gddhaw1mhm0iusvf6sdgg14vq7jr3yvpcsx0otdi683oxgnwgbkfp4vagj83buerxqwl0l95q4v64vqvuq830kogd44r9r99netpcbn41aihofih2gjn08qwhk3brkb8e6z6pkltw1rhopgm0tuol0yg9v3cvhvw9ftknf1rbon9wapqzszruruc8zie342zmwr189j9cqxsjq7lu3ikw8xtek66z5itmb9eh4mvz5br0xncz671l7h76xllobtre6wpnow7nlh77pllvnksruteedqm4v6cny8ao81qyshii7jcqxbqnoq3hpbi6owb6bdpbh2qam99ednesokxcpjw59xtlq5jta68b9maxlydtb4saau2o1149ceynnw22rj2b8igy7ne1xsh395l7ygxrmhzjxz7qsk0ld6bbttdrhdl14kbq3akt3c6vj1ibntk14jidvpt0tx6m0sfvhaj03kqpf97vqt4gf9a81j1kjw5wa73azgzkb3ar8skrksa4afi4283q3of87nhoyuuyyfa6psb7a6r25phzpplmcnknta9jz5rrlmjxyktq76iqbx2woj1kes8y26np6wrd2wx1mwnncddvgwl3v2te0xunjlyoebfoan7aqjco0rvgj89vse5vibllp0bn625hb08ur1sy9px26g8yotr6tq8fb5e76fdjwhm2nhbxmwhl5x1v2zcwtgrj5ayjpsvd5ye0cn9skcyreq6dr6u29faykesbbl7wpqg5vyrpu2sjowkso4cz92luu35fi7ql2lc7y119d7nu04yuzldzpaceequtb8pftkh62iu3j2uqidht4h50ep120tnm9u8dgf3gx5xn5ufo022zp8xi1g2ype248a4oxv6wy53v2hgjkeqg6y01z5fyekvb5g2fr7zv0zl3yfkpera2skj9w1c96n3ax239fyfsdqh27ja0endzy06rvtddjedi7pj8bdzo5wvzioi37afny0md6wo46gspgu5iuuyv799uu8c1cdq8foa8lore19oo1g3dwv51bs1jpqtfwsqpzx38kltis8kf7mgpbevog03at5w16j6igznrd8zlobbzd40brdz0b74bmh48ueyjz2ts53olrzocvmnghgic37g06m6x5n4y4lmotpc4',
                redirect: 'gqdj3p9guekbozc4e29u42lf1ottfru92cvz7fd0if5p5fui4hamph4e4pu5re7ar3465kmqvglvkijpehemladdnz54zdhqwgoc9vyup1mi93ueelk5rpz0o1fp4qekmi2qttqr6krrnhfk05tt3ecqpbhfpwke5moctpwz64gvv9y49j4u44vpjlchwm8fm9pvds39hmhlhvmazi5307mj43qwf2jka8iay89t1sc81anhzmpym118go2zaph6fzypf8b1nioe8vq28px3hno16lpc48caxpbjmve938j8hq1g2vc6vh6nvq3d5yoyo4j4pwkobvtgexjf12b7htnvl0qw0vz4mdwe3m08v5th0r5n9slk5eg5x70fy00qassliwlyy1epgvky1jozh5pfxf4b40jgf3yd9shf2ecgyy48ezi4inyfkpkbneigatcklxp7p2nf7uv02glw5f7l1rehm60n6bd9mrmdzkwns641emahmazq4q1obvcow66eo1aa4pyto83li1gt66z9mfy6ppbmbl67102dd2fbx1sv8cla838k1rbubbfh4w8w78aq8kaghb9wi6elybcw8skufowm3umet1t0e8wy8duuviqtt0p1920ory16zagbs2i8xcs481aol0wr9sihg4ppkuynkw5ctihjfwbx0dgn38yg4rj4ztlosv2u816r3vziipm8vhtfkiuohf0jv8b26l6mg75hov3fzu4hr5unqexejptml1zrjvtet644v14862mkg9rwu5izo0904un20qer5o1bkxe3bu63hn8el2qond7sltgx7uys1bq2zj0xslase3m15q9az02fgveszhkpiw2ne3lgzew7crj307vvhvlrpa2yxlop0qmfoadd4tspt1u9v7zlfa42ekbds28qbkzq96ee5xmaych12o0865inhtjkqz3p1139mubsurv73yp9a86udabedaoc2igbmjyc6gbjn4kb78dpzziqq7up1h40u3ovwvnv77u0v53oz8toyrlt874hu3v4kyppc3y3m7h7taw2jd22gkt8sjrxj51g2y73gp8lolacexxar4vog3dh0j4ln440s0zmb6iea3vjonlf3omauvin5yk21r6g1wfkt6hk3evi8ekareh8w6bn99lgjf0g5f4iulw87aaw7xu5f2lfsfw2r31q1tjzoxb8zuh6gnj8ud7blxpaysfuladuzwbiw2ro2tf0c1cokvcokvvu9z7miuvzlnxenf3d1smthpn1iocmyybksg5yh9c9w7g6ojommvghsdmqmzjumj5lsbc0cdiadh0ql9hpm47gnqx21leiei0ahgd0kiyn30cc1ahrlgiljozik3d19sz8klnhav913vxg2tl5604gejii3x3c8ul9s3sl0xzlfyya9uzxqu8x8i26wi9qpkdqur0r2e7jkuwz7zv1mbxsppvmohrmgheclvyd5gnypuf86fnqu91mz50oqubt3p6lyfmj89jkqt3hb0pucrqjnkdazmv8hzho5quv8crojcnhdu0vpkfkqzls31atql5rkuqxkdosj5mr38p0cx8fdatypl175lw6oi21wqna3gf91a1lq7xoeszzvshrsutv2jxg6f0j2u87lr5zx302l87ccklw4flt869vp8anhu6c9xafshfrl8gjhk432id4ozja23cao9jspazlzakevcqoaes28qtf9jp18rtxsuaj0loto6apu9rgn2l56673x3keixlq9jb2ak89gwhp042wa82b1qjjicfq6cemu8b2rpizdu4z9saofhhn6m2u257tdbti7n6h535tr525j2qeuaiffh6gqk66lk616cf479fy8xftll2p3shu2y4n6rs324vl79syz02l6pf0lct67u7fx862dtemp5wy0qwjgsw1w5tx405ya2hbzqdopqrxkwnf3pcpoh2cl37hymuj7438rhjbrdm2x97t8q79m08j0ubrvk3ptf7ouzxmfc6zqbbl8oh406kw',
                expiredAccessToken: 3707892327,
                expiredRefreshToken: 4396151641,
                isActive: 'true',
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive has to be a boolean value');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'l7xjgb7ho9cyrsmob4mmm4u1d09p33q4klcxlh3b41g1hfq4palvzvwc5dfkia1l9gly7npxh6nc64nzmosfslwsymso02adfzzxnluvdcj1ck8f21ix6xq27l3n2j0m7br6hy8du9v1ur05m8uraqusg030u2kx4nz4ouoe2mdh8cwt99mht8inw6wx565x5zh1xaws6ls86qddgrrsob08ic2e13f6xiwlq6jvglvxlk1cagzf4v5m4u9giet',
                secret: '3md4z64k0hg345099xfrn5csy1rkpw1mg0yt27hx7urkqe4l71yxlranx2yhsdzdvpkbxpqqj1lqz9nx5wf4dzmbfx',
                authUrl: '0qpvvlxp1m8myfb2kn0vpqw504d55sa94vj6w5fo4x4cpav89czx84rc67smyxcq31cm4qyvmz4cr8at897vnajgyzco8vmxl9bremxou93tpmwff9y1bb0326nufvte03r43h5d8feun7f8xjcz17x6vm8lnbtwnqdgh7xazg9w7ets4edooc64tvakgfkh34nrkfd5uz9wnsczldl6vp7w7su4omrbmxqdv7iybtmxq3sbsg7nh1pa6dy4a7awjic6xk68ggf1hctdsdkv73spphyk4zn0p3ghpnl9nwxgl9cilb31kf8x412hwh298snw8mo70525cn2dokempjkm7k0ynlkxhkaex599ieyrdker1gh8z3umxs1k1s5s8kfzxa8awh66jg3oxodmtg3qgwimktkcy7wz7gn9t473yrnqqcq5osu147098af4kqkj8sk7iv846lvooujbzs9kc2e1pnv347nyv38iu04rxw4g3aiwalnsd3dwoool26vfn5e2dkj7vx7asm6qqw2mksd9gic8mah11fu887zjm2ekplwom0lb1ycdwbovckej74q5rianibvm0xwxpb47sx10kzrra0zkr1efxb5h242njyqzz7iu9odr9s40gt1d3soe1hutpoqabk4ieszpg26rnfplooc8i7t5wsszifz6zz76m14mduzrz7k4snfisgdmvmvlme6wusv5853zhhww3o4tqnnxrg3rhv5k82obawzhlqevchsdxws6bbyc4dcwnc1sdclg4fcg8duxkltkd9zkxxwymfkiffm50lp8s5l8yrijim9v32o7yev388999gq86wyu1lnntgue1a8mo5pbzw2q2p9t7z4xgm1644optikxix36tpqcbv1j5zx3t7oheutnyrwhnoqqnkki2ncc5qgpk0drcm4ksexbvnp3qhpmrco6uyd70he6c5t0rpp1ew1beysximu4gk3x63z62i7aoa3y4hmqk53wgji6jwo34tn036l0bpg3m746s4o2abqqke115bie8m9otulrz2guwv8t9wu21ksl4hnsmuqjq6tplg2bbdup4vcglvwg66kjwjj36uiq6gbxrwupobj94kbjpfo06i9lyunsq3bv49qqn09ss7rwxqj7o7vzn1dd6br27da0wwj58vpkrhilxp4hlj7kb0z79kf5sfuqwa39is2xe4z1cn4n8hkqy7luoriojtbgy1usw4gaqzdux0bhuebndkk17ph0mt596gcl4esxu3vsc0hok9bdane5vobv7x25634yot5y1rlbc2o03izg23tsu9vto2ofwgnn531ukndua4os8xis9gwirr01n6wjupj2satjl9lbimty09w1n20os69uzkeott7hkf4je6ityotg9rpx38zwdxuyzl7ohkqdosp8h9dbiext0astrqid4qslxtiy3fw8q67l5c7ji2m6ofzs6y9boxk5nuwp0wtzwl11ae7h2j74coxeabw3qxhwpa1zpbw4uyr1kq0zy5xmq0cu5skzxjt86fs6r6lxzqjonyob3r3ovjqiutydcx1zleiqbqwgtdsvxr5l2zq3w4w6okwj6h20bh9opcu3iz5sg3tgb8j8akb51jqi52ca5tuw7v43q6e9d63fj35ua1nsaqfs4e3qumatkc4c9hkfpfue54owszc4os1fopjffejwpumxigsbe8p2b7a8wi49hqgqlbzps3ls5yufamq0pdla90eccxtaegm76au44zsvlw1gzcx9w7q3ngqqf6kz53x6o8iozrna18kvtpmdy3pbhpcy5ohtoj2kd8rifkizc5pb8tbx5xw0djxct3lvououejpx7m1a0ef3l78b6sqierabypnog0pm4ah0mzrb8u07ejephzrmiwttx7omdj07kzd2fi2urg8giq1ia4ywn0i1x72pczb5acyfghtap87y22q6u8fxfryd9gbrmlbpwbicckhsb85gf6tpwomavr4gv0hwd4vwkoi1url4whnnqgf0',
                redirect: 'wgg0kasuycow0svidzzlwpagnh5rpqzyhjvftq3eeachmz09y75gpu6q18kbyktk3llhwacpqefboh9cyk9hhtpso7gy1mnp3fac6a9w6ll0rym4qy7pdmpnjj0haq13cwtjpqcoc9shros4o80o7f8mogyv29z4d00nqzxsea6zrltz0l0e6nzw4e37o10nfuqykriznnqcwk8my4r6z8gcbfd6k04rvo40fj5acscoedekkkig0z87nroi9rza85gkbjnfztuhkozhkhjyhyg28vvut6plro6b9xj1gkd8p6nbcre841pn0jndil1ndjp3rc5bsuq6yjo3myd8dt9i6zso29b2enj3xghqtq0l7ldeg6r5n01cs4abrk9knivct7o6t81fg8lupgp6vlnfgro7wbtgahak4vmjkod3jrnryn1pt6bofvn5uv4p6a3m2vdlxdbs921tqz9sqnmo7bbfm85ahrcf3sb7jgu9m1yl5e08bw5h1eagz5u6bemwm9qno55incwac4701qtfc2d6fk9bisp9nv833878bkuxjdnueyuyura605urc83b281i315aqfjusbb37nnf26vkw0hpj9rogr5o2q7yot7h60znqxdgd3r9877qdeprlro7krygzwmtragjw73wrxn03ugecvwd1762vnjpbjsdu298ftkro8qpbc6q7khx55yejqztz3oh7e3x97ebemdl165pwzmgu6q7iw8vxwg2xpjtkj4lm7hhkbs1gwb1qqir3n9xy114ex4t8jlt6812i8yujs1jegb1u88gizbb2m2s72uqyposm8vykgsri2slogphqyv7hxaji0bo1r4pxx5vi3t21921znrxbpcovb0l0zz3bdewj40mqc5onkvt1marjjt0u0bxywv97jso1zuv8jmd3z74us4vglmhcwvqvo6vq4aoqjjg2wfa8qxtx6mfuhf105usjrnfnfb4pz81wuuirxfhi5btv9wcj7bcke419kb9v245mi0zjdfsx5lfknyoebfhylawe9e92ghsthczbwuxv2z8qd81prkv79yong5ouvk2o9384bxh0tatc3h1zq6zapzroz46y6hz1spfsw8ymeq6t51ts89s73m6tebzd0j8ywprajp72h5o1vk8dme24m8vck1akkhm58g9mgs20jbtja35elo95yp0bvnmidhxru4in60mh5axyrx39q07yyhe8asz6do5gq9hzex3qwg9z8dcr0rk5lz7vrk1cp9s2d8kybua3ffxxytd6t7kz463od10rw2curdp9qhicelz9cfzf77uibdayzpvecl1vkynl6cecmpvqeoro3hkuoqdm6l1hvhg5nqxjmljq8rbow1klgs7mev0p20yk1xc8o9ieyss0htu3i48v930zzlzcum410lhuelosu05ss76utsnxk48scuzj83fav156gy6bjluwho6j2txpamnnylo88csh8k7urtguvygbwlpfmpkrlntx824wcrctpmjyywv85r9hvygw865uoz11i9nw0i7le57f8irs5lyak3lc1ua6n1jqqi4f4a7bpkfzczxd463cec3xhnnnzjm1v050ykhw71bhtggrzwk0mm4n5rs7m1d8imdawi0syre6gpa4qbzo1rvq9blkq6mnoada7s900cmnivzws58w85ilq51vgxpbqsx9szn8063imiyggcyfub4apcr6wjch4op5p5jqhtbz04oe0hvkfhhxarr37m1hvcgsfnlklfs377423unwx16l7s64wfsrn13nzf8a00bjoukkgbousk1zd59qxnpd9iau761p7xc2mesegwlmxgl4qvpv3ao30ot33kdl0f7xk2po3xh1s755hvscynk669fg05z7vq0yo4du5slnpcm31h4z8gnhm2oy7byu9c9x09498ex9jxbsu79jy5cdo3nfdbrnbhrg7jkmn56osoqajo4si7b7iey3b5sdrgub2gq13d0s92tmfyqnarfoln812a53a1j',
                expiredAccessToken: 7169646965,
                expiredRefreshToken: 3749893789,
                isActive: false,
                isMaster: 'true',
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'XXXX',
                name: 'ze2gnfqmh76huxoknegrnfftr7wno5z0lnv0fak9viz4puj9muwgcr49jm3sasg66u4pnxosgx4crpj14h1mzj7ghz4scyqbhc235gtwj9tx4wg5q3nl7348td9amh87lmfw15ioij8qy267w9lseyph3fw8oxwbklsjd1s5d5iddoebsuun4uhv6fers8qz0udkchmx1nymvmd7nu3pzyosmsg1j5l5falcznahlkr7rss3msqkfghqa17jmyg',
                secret: 'b5pl24sa418i1h0vvrzf0wb2jg6z4f2tkmm437wstby46e6i3obqezbspw6g94lznp2ugdat5ki8og66hycbvifva3',
                authUrl: 'w8n2ejxqkpygrnkro0x8oco7zcztmyemo2gh158663dnmc7w6ijovi8qo7w0xqqzcba8wui22r70cb00nrr98hqlb7ylpjktoqesees2r8ftshie9d3mjp39gstu2kdn4ijt6y04a76h1jkqigtaxbokuqnm0yrjs8p4vf0p97nsi7yc8wzfcoosb6p1slqm2dfcfhvu0ciieaawy1bawdl0lbjn2hnvehc9m9adpwo6q1m8lhyl6spvzzo8mjg25v6iva78agq4sp4s2lwc4bcovcf8hm4m0n1kt96gvyfbpi6e6zk7wkdvhzzo98i2cznjmkyd2wu8gni9d7suk2fprduetsj99che49j2lzaynu32vaeb2218ftmofyzt0p3g8b7vz4btofylxvps1n6lfflsf7t89l8fhkm3lpze3xvq38n4u0ocvwa84mpg1nwhumbqv4rtah0g1odch4p7uw03dkrirdqb0aqcld0wfp2ju1j8ix6ujbeb6cdopxs93hdcy2xg666t4mffnqiar469imsyvvshxn0gya5x65gx2q7d2ayzzb7lvmxx653jt8heiidg94hxu8sjrfe2i5nymejxvh6ff24djo331xppnsn38tq8sbplyrkf5dcz026dp1244cr8jhpt3ncf6188tkbm9j0iv3d5p4a4kbm6ej79dx018l7krmbpgo9rtv7m3kjgix233o9vjz95wvselk15bcguwhlr7d2pohnrh7brhcd2cc88v49dlvqj7nhdht1zl6uoezn08bapa3bvt0fofzkn7f3rhch8kf2rba67rqkfwgrhoc3ajiq6fwcva0c3pkqcwlw77pahb6eyihfyn0lefcpq11f266pe66891b02yw9ydtu1opxa2v5a3sxz2ibko8w5xghx2hykglcy81mmw84ldlj793goj1twfmt06edfa629h7z771z0kw6j92qwh9xkbhot551gptbtobtr3j4p023xu7n5swtx6lzukrldw3nqfu1p0gbyaqf6rtvevosx4kweo9toawemtoiyssjz48ou08n555pdbw9i5qns3zar3dqsw9jduw36vo27yqxtric3p3237xf5u7g05uvocnomh8kkr74iojofj6xwdzcyzobtg9d3xswn2pf2nn36x03tycsh2st0xocy6qy6qcqpjoi6sc6q488a9qhcr3ac3jn2yc9f9gh4fac4qr0jy4pyidcfa7tm9ysi4fy7jzf46gx636ti1dns88tsmhc1wz1vg56xwt8lm8bzob9sr0p0tziatsil3zjrqht646btmmk7kzwlzgfotgdtlvbyr7u5kvozdlzc8z7hblr1fqucnym4ywlkbip5fo0hsgon8l7dp8vw9vrrn0uadshhjfi0e7nqd2in8ljpy57xnhvrmwz53567f82vibe1hxrfr5we61jkx2qlmbnoykmlapi8q0g6ubk1erbkq9c48hdoj9a4xoq0y8r1k4fetwnzroqg0tal7qabz3iuvixn9wuzw7tnqomf9ls1otkmtxulg5mu3c5qwmurldeo0w0i0clne9xcz86zbfj6r9ut15z2z4c89tghneunqahtcy65jfy1xxk62w6ickiq8gh1q19z5wlomyltq2ixxgmtlvz1x54mpoes672f6qzmopw657sfijr9s41j0jrar7kfbahwjx9hmkl56fji8q284gns0lg72oh8l4n11ahkzvfjiejbtwax9xg7ud8bhrkgqosg0l935bm9hgemp69a9felzsk2fbcjrfh2ti4o9nd4xdz2yxcnrapqf03yicdmrn71ngu131g3qyv58m3wscxgdko1fkrdsuyma4lazu8qxxunq6lhrfjm313k3jm8futc09qdtbw8yuhohnf2a8o1qpz60binud6z9n8b4t8ke3t05r93acqy8rgvq5r3qzowqef0c03nh9tnvsyinc393h0ui6vxiy0i9wjrcpwv9azdi1adhbv32j3m8sv28pqhlitdidj60h343ctf',
                redirect: '8jd0i04vw3zkvbh94bttpqjxl2nlbpmjqm2v5wgnppexuhtinsz5w3znasv129116g54nkyco84646lucnfb1jy9cxq6e7lsr8o2dqwbmh59e5v65y6f4b7a7h8j3iutz473el5zapcer53h1jubvtlt4jr58gce89pj773kgottyvo8grjkfwwxvblspbim6ou6bgvbdymi9typqi55ssn7peo79cea3cfob27u8nxt8vxqk6yg4yyo9vj32cnwwvgwijsq8hcv4owtz0zbbsrw7cr65jkjcem06vqy3yf25ff1gzrik6u0ndjfh4z9su9n0m249ah0kucpshn0yje98alls6gzurvyotv48oo81l4uhwa8jmmq1an9un2k49dpbtz6tz38byevjsoiw4u3n8rjkj0rrlu0gd3p6tqmfi44lkl3yggm6dj89i9jpe59mbdoeoyyrn12igpo11lpg0pkiyt18kpao909570wu9939dymrq4daq29hobirwstyof24sc9h89vtk74cbuufz1yi2mhkic5jvtgvc9b4xc02vz4291lt3k18eyrewn1on18xyp9622nseur9uxs5yrs2ljsucnb3r1mbq71robdcevwcjomu0qs0s20y93zp9vcwvt7p31wl0wjjv21q1eqhu45u8106s97wvrx65kkwqxj4tr96f2mvdi7f6hvifq8glxx4y3v6msm5txz7d3jqx7qpfv1bg693iyjnv1qjhfxqlu4rbdh9jo5zfgzt7j7edxrld2ms8jjzpe3qmt43bm0l47hnucyh3rtzzgweo39emjt5ekeq3slpui9qu0itz2apu2lhxg60j66y9hfxok5jtm3y9qg3ou5w6o0ykzm53mtd1tjijyhn0z2br6kjjevvvpvqb75lbg4ae51lfgxttky2038et2po11wvno6xu13swhljh94lwa6rr90kcm5z9kqw0h9gfm46nrzxaccfnrrz20bflifx3c6q03akwskafnn1kwdgamek59jicybp67790rwx8l0x7gil32zeox1s8uunbglz0fkbjozxwk6190etk0oyhobtnaqqjcjkkj41uwg96vqh2hrk68sx2i5e4r91rphkzp3wo6kkcef1nf1t59gxgk1a0t9eefyv5tu3rmsizm9b2xnq7wp2jtd5w9kjvzgjxl1o5q3oirsx00is7g1f7wwqxzs6nbufpylspelfxyu3x3cqurn5ey91ylfys5sw97z00tbvy92t6uy26zwioy0jaauhlqboybbhnz70s5rgdzike8fmsnjsspuicz7u83ilevo9saxp7katckxj5j9uqd7028rc6ubole3az2spuwbqx1rn9m633ycdex1u3elz532jcys2snojvedpgq4wbirhhf2vqjbjrimdw0seu2ersh79we5vszij39eya5vzu4cnyshnovvcy4idvqgn0tvpgvxu03tx8ljfziyblktyjtygd1vzwumcral4ufydh2unvutlmwubjj5nwf4wwzb0f0hs0emw1anbgh114wyufn5x2d89vseytj1g8izhl7t4vwqphmtbgpoxr00oz1ji4a4t9txa4qt0tkki4c5gcfewwg08f42pkc9ue6cyu0v3qa5kkf82i9be7lfm2c59v8nm5ho6li6v6twsgyvnx2lgcakfec9npk87ngbdvq3ion73zxatp7feeirvs6ab8y3vs8czs4ru2bydkd81s70h74saiw75j2dy9m6yeuv5qoe88nglw5207aqkrhlzf9em9qmufd1vk9ujtpag4c6kvar04qufcnka2f9hd8vdryt9jxqsbwbq63m4sjeyg7ci2okewhgkgjnhck9x0yf30trmyox1hazzhaoew0mtmdbybbxxtd9r7gmkji18yo82408rikqlms80mashg3au9zdd829sqgo11ypwgeya8f1xx2nx4jsm1yflogfcv8o682h5l7gyu993ev96m6fhdqjvmuvj1vj1q6va3tjj83hj3y66ioz',
                expiredAccessToken: 7269405355,
                expiredRefreshToken: 9701446583,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD');
            });
    });
    

    

    test(`/REST:POST o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'AUTHORIZATION_CODE',
                name: '3n1eii2ubv6bud6f2zgczpv6cverz1uhyyyv2k94kqwpw2jijc3vil7kovz4lm5xtynrwbbm5jwpj6897g5346buwr213p241beq56fkt1m8fv5y8kuhrrdwy6i9jhorlgzjmkq63hm2h0on6s57dipxb9k73zkv0ct0d17br8m6imxjy8e9xgtvj8obh2046thcumsumouk81m2mydjtoa8krwjjf66qjei1rzwoxzvsf1ll2umtcgy7hk7xee',
                secret: 'uy7b5ojjufhbjagyurh76g4h2ltylfr3brpyod3y0xfsyzxvihvlf5lbqxwe07ermdarlvjrmlo2ucvp5fokt1orcr',
                authUrl: '4zz0scksm8yovhkegsvl3wg589m7vlvtb7zaw5my6554vi3p75ahqnfdbdzl70nxocrrikbcsa4hff1xkwlaaolzffso3e50uj4yrr3wub2ej6uzz14uwhf25augjn7wpw432t5z4xikxc5yaxqhi7c34fquzn6by1xqrtsutc1s2rgwns3gi3q8w1j5n2eqbw0ib50n9ofc4az7ehtorpxf9od9l9yvujxoth1yesbprf0970bwmcb52rbtzds07dskfwkg9njgvfjl0at48rs8eg9wmr3fspwmz9xlw26vc6zag151l6zwmvvpcuaj6n5k6ewcmuthg144g7rzst2ntvztfjhmqeoksnz1sf3sokyll2sdbe5yn9bb06ei9jtcvucrvzsi1avgrc6ptjor05zjbwfmypvdzejdtfnsdmdzdemm64dmxji6y4fk5r1hbqcvtmkagw6vitcf3lf7xqkzbgkosfpa3x1rsz4ld1d12ag4ajiklj32eaooc4neje8v70ne6z0btju4xfu2nj09wmyrh3t9ltcu31oc38i02whkafxcmyk9ukfg2pzvl84w56cmy9tepu8ktro3iswckj5509aqn4rt3osqq5wrxso5zsdhkdycx4yazqxnum720k2rlk3b1vtnq0ve22b1zo4j8o58hz3vuyjjk7w0szb63pa5c11vid8efyiksnkdct3hq2f1aqxzcz30kd8xsxtq72fzsjonw03ors5cr7i4e6zxho064xy95986adyokvk55p0svnuzo1n9cp9aqbist85b9468bex5fdnxdon2bpv3x13zo4p5bd4i5szo2oh80pdue6u05aimrxasx4q7ni1iovw4tmlw6vze6zy9dvsd6parm77xpph8lh5df2lztx6q7rlbuyk8ccyf9ryrvncv6mmbebpbo0hbcxq2d4zpr4keyckly53oxlez5jt4swwmxumb2xhwxenhltj342ili0gucinqlvzochysdahmdjreupmvkhc7xkd6q3pcpw0l7a9s4e79mkfrgj2tftmx8oq5xxqtyf46j9e26tw5rxeofpm69tk7rzav54oqsgj2cv0y7s2cvh33yik4gsln4xfx5wy0pszemuqvox7ja72ik64s5wbuj5bypcipmwwn2jfmwmsvhgi33gckc75ukm4ruztx1chsgysm0foso1ia6sx9j8ohr31frbxs3jfovt7eiya30fdkpuzdg00f4z5fm3b02m4y0dt7nim4zbi9ine4b8z2buxcnel7h0zxyps14g7i608ro4ey2rbinvswjas3ngs1farunqt8gqj8jgxwxgahmbbtqjmmglbwk3fuv8esme9kawb5gjxdt81bhajzuuye3x5fbodcbf8y9zb7pgakadqy0xur3wwr6jjprywskn9sbmfudbulmlbw7x2e5s3cjrdle9yk5aj2uktieal5rvdf6tr9dwrbe62ur1cfmdh3aicpaqoeac0yr2e9rm4yks5wg7imrecx8kc9praqeqrf9lbjqo32739qynuh40oqs86q1d3qgo4bbgxcvuqpijdvwl0ceh60r3plpjysjqopy2iw5jx1lra3del668ecb908pvz6hy8ld92i5rct0v281ur5k84ys77cwsa5yz2yjzfj5uh0kf3yzow0bxr3cxnnr6ff7j55o3g0bqooiu6rfcvq3pfbjrabkg5jn9imy7deq03hjzwx4zw2upjx7iwjx5f7ki07gaz8zcorpuutaaaulacl6et9nsdx13hei31zp1wxy9pugu17ia4iy8vauyupsbge9qlyv5pvjdj5bukslrbo0elw4h0lxajslx7fy2tc4hux0bn1tu66oo5ljtb387xsnz75n5wegmnxlt1o4rlct6vw36m0x2zazzw6ul0ah2svck3yegybth8zgfrvi78lpqyphq09xxha4n3vi0j3zud22a2kor6uay6y81z46hvp4lc94ufixaymkki5siwehgr6plu2twasva00y995sovv',
                redirect: 'bp45vo2ptjwi7df7hdn02uiqb6cu2y6c5fvjqyl8bjhdougyqmfdrl25k3uty33fvdbhw05necjb9do46s8gmztuzx7zogyiy22lwdoj25dc806smupqfj9az29lwvytawzn4la4oybyd5h952aeyyt1h1cj6rajcr1ti4h22bhwstbx7abldt2rsioqw0qjpe36diu1nmr0dgq17pt5t6a6qcorq0n4qoad5k2nyp04bgbboixtw7pt5gvkme20xiwpxoe5slybqfo3zk6mna6joue53sun42wiysdny8zrjdxd83op4xmxd7x28edrtpl4zt97s8cbatgr2hiyup9cpit9mrvdbsgc6da1bh0l9u7okyfkxkt2nnrvtfzr448b82doxg1eeti1q8mshkno1xbid4312hhqwb33m9rs241a6wln9havxbh0pjs2i84809d2d9kkf4cb9pzcuqcw9g7hco3gtfudz41st02za01nkdl9v3fmf58bkm2jtzd6ujqdme7sznmvxrrtmpawd4elp9shyp36jhqd6fhrx0uau1ifz71x2vdxe3piblg06bq8u2giez5o1yk9ntj6bewa1tv4t7ogxz3otf5javkq39dn49ls62dwgej2g9c584dysz5xytb0y5xva6q5vz684e73bgmrg1fkqi5tmzsgfxzg9okoalfjjoqd8uvs78wv0m0c2h2dkqjml2gkk9912efllxi9c2x4bkisazwh43ufvr5vcdhrqb3zhwq138rytiqvmt2wxv0j0uw26oq1hfreyokittbsco4777tiq7tzaxe5wlde9iyrdps9v8j4q8b9ddtl5brpbl2ks55iy8ve2p6bx3dgnj8ybptqvio5mlcqhs6ae6e9cgt2qb30jrwefgeyo4e3vfkiflifejqzldflsx8i4ahnox1mpfunftayq2umtqw32ih6pyczj6a1wtluzve2nolfof2q0icqh4pry032y4sr7rrb0xbe1t8omdoxgup8fqjdiy5jdpblfvtbuzsedc8odyd4x484nfs8k2u7lvwvo533u7jcduc8o6r6ctldku2u9avfjdic62al68bthvya4w6tt06oxqb30701dybxjlzs81hvwidud1d68gfxxivb03oxqwj0wl1encmwo856l0ai0vgi5l01b45bs69dw207y18luhfbq9332jxstzbzfz1zeedmjmekjfxq60ouxgv3mupf0p7r1k7j7jdrxpufkdnscd8d65a6dp8kjlqdyozihf1qtv7jr6e2k5noe228m4db9q054fv1l1ybj4mfuh3vl0jw4umw4rleqqrwhnjn43tjsw0tbhc3uobl89ukeujjiwckfozjv4s1uy8mrtzls6rm0pvkx4a145h63rxgha3tbdgpyg3ooo5ukvccbmncmvb6dte4n9jfa1bukmywc8njshopmfdq2f9lnz0aqf2vzamzq06dlax67wiivsro892ufbfmp5j8s7ygttwuv8q08ik7gq3ks372caoqj244ppffi9vi6redhzwnm2yp90iievifkjjzs7o6a9mz1xdhilor9anxy3kljfdm504k3s01bavtwud6loe2uxjvafod4vdovkt5zgx0ozqwjpt9258gp89jyyyb7isnpzf3k78g4xggnmdinc6yncdulaqpfbn9ejkk7vlvd8umpytia2otz7qb1n4nawvk6bjioybbmilz95e4cme6pxrzn8iwspfy6wprtn037vti7e9rq6tz66vfrghrvas5479rdzrxn5j5hyzpkqpeqcv4zyjaxizs44v5hftxd4gl0b8ol9us00zdnr9bal1zqyhd0pcruxkflk373yhhq983hd5008kyr8tpxc5f9ckszif7jpng0iuxor001ipo8dih6c6ke46sup3lhp2ey7d3qyw3cx5sppg3ajltk6rpuhn7u3e830nhzoisdqtomhqkn4q5ixsfbsrf11qnnju1tobsrvt0cu0pjg6kyfcwyfvcurtmzj6y',
                expiredAccessToken: 2553913483,
                expiredRefreshToken: 2898729358,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/clients/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients/paginate')
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

    test(`/REST:GET o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '992dd5eb-8488-4e6b-b48f-e52f45ca557d'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '08b6dc75-b393-4619-a22d-4988b306d83c'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '08b6dc75-b393-4619-a22d-4988b306d83c'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/fc4af7bc-c64b-4e2b-bdcd-3f9622e584a6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/08b6dc75-b393-4619-a22d-4988b306d83c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '08b6dc75-b393-4619-a22d-4988b306d83c'));
    });

    test(`/REST:GET o-auth/clients`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e0afd96d-3057-4c02-a709-83cf68e22131',
                grantType: 'CLIENT_CREDENTIALS',
                name: '1g0yzsw0wxwj2rn86rq5s1f9t5uudgzt9cv7npo7khcv1qk2mf9ldc3bcoxrsaepj541e2ueoigrghygfj44mv7nb5098svya2lxrovgr0p7v01xiicze8civpjwy7t99q97x8l407o6qphz5wxvvq03ry6v1cv36790bwyej27emakz9lf6lkgn2ijf6rbroodysdu09ugkv9jjaos77v6o1loizbtn99drwtxn4haegonry11n67akgxjd7k9',
                secret: '0zk8x9jxjo0irfob6psmvkbm22u7pnyloliz5hl3o0znvzuxep5chboh2051bmq8djr2nlop04nsmqm1wmpsbhlmbv',
                authUrl: 'mufycrcbcvg8684ymjusn03qose2lk566ffjmlucf5pq55a8tmyzd44wzign9d6w0f8h0anlt8rmygp9tgariz0hi41hmdz9xeuw8aj01rx69nyz1glyymytc8klryouousvkvx2ssw9f7iykmdrysmh2nn884q0tzpdk8scay0l5xneb0r1j26yq4yb4sfjsrdefbjk6k5q2lf96702x2o8r0mh98czxjkqzcmsssu1vtpdwu2bcvv1jenynwwh7eud5wogiya09tohdbne3oec33jpfgoczfv46snc4mdz7pa166w8efuhy8b1xl0bf04ifibaqlmxre7ovpqnoxy6id200tjutudt9hoa27n3kujnmcsaax0b0uj602z6yq94nqit4qcnwtqonxy4wku9lq6wk17x52o5biwrdgad9gpmb5d5iwvaz0pcrf4qermlwce9u2lfwb3oubwb4l7fbo8zz3g8oq2agf6mdqx5i0jqc8mz3pkx2a19oe12judof0hfwo7j8apqivx5it5phi1hzg2lbizqrrdzdqjdp10wzqq550lopktd47olj9ofbroxvhv2lmrk9zd9mdcxllosmqhxlu6h1va9nvcejbdpfvef63ks96ccl1uclyla1fzbg3dgokzdztbaujbo4xkq9vfb1tnmi43s5wnwy9u289qjcwjavgta28it276ci0m7i4dsskk50tdxsv94p1bpl9wo5mpa3vbwwnu9av46doawuqmpjoj6n356mjqo7nevnoc0bq7mxkwe6ce467wmu7cgj0k1ol3b0a1pjmu8av7919nsqk9gtqp6sqhpx3q6sy56qbpy8fu7zblib3h8dupclfaozi6em41o5cj4gfoclkmnx53x867lfxqzi527al6o3ns3eph2fi8cdp8mghv2e9psxkd3awbl0ukz995z4rt0xv4girojrvjtt9pno5ykvji183p95g6ezk2f0jv2sgolxv3dovhwi05hesg99o213gqy4rbovu5kqojs8u2mafugxezwegffxz0a6tefa7lrby7hge3bq7sjj2g8yqemn279ketxwl0bqspku86ehg3klduwbz5c3fb602kt30wzgw8a79ev92qcunbavl8ygak46r17jcsjv5ef1jwo45ue9ew004p4pb9l5bbcl64ekvraw8xy2d7dbsjjliqzuqnwkpnfy0tnyscgqggagmtunhim3uzsxqe8p7rgkly435zw8avc2npklgg8m1l4r6v1pxibdq9d6dvvvm56eec0g2jk99jo56kc3qojhoqn9kpohip6cij0dhz688clwe78i3luaed1sshz2wvqy7eeyx93gijuw4jfczh3lxayu3xf4i0w6dqbuh9ctoq30d53s80j7i8vo0quylxjvlfevkcu7zxclr77q9chchki5e358q2hyfvm3zglvls8s86rwtzofh4ueue2gru2olrc5cptt4n18nm95993bug04bexeojdltuzexb3f7de6pv3aezezmbzb9j83vvyfhpbzbz9s5lislyf02qzwslk3k0cm9nupsjv3an6tmlcrhpv9kwa3c3vrv4ex1dpjjq2shbhimd7gbcpz7v7qrsa561rkjvz5jcdb49dulbuotzqpm6qk15tke4q9a3f7gwqhyaoozdceuhgbg128krlkjdmdqujcxolftqfwkanor3d0e10wyr2aj4ho4g4vqfius4a10vow8jgzrxf72m8wea3faaarbcytsizu5olnogstl2oj4saso2bnghsxn0003i6ogxb5o0vmls0ov6r52dchstyj2qwororq9ucitsu8m7pzztc3l1l1nyzwwmp6migvvgx3uhcopw7yrrzlbwmte6jjbe5pd0ctjxh61tqdpd9snwbqn9li0cisn229496pargrojnmh806sagt5ssp0tem5gnlu6ttydx7xp7kd78etiayh16n5ojlzvot6kki3mem6p73y1pjgfoumdafzjb3wc8l8xthqxyr8m2cxev',
                redirect: 'c45k2tck1c9xnn29vmfbupb13kblfvyry56tlydv5y59bzpa2u74n86tx1kcsy7vipmqrsa7tearbpbkjvrts5g3x5nnse7rwbfgpjpg2pdvm281ociz6zltkgurmj0yjtlxkiolzltrej10ip7c2n1xxpzp8kpv7vaoon79lu5hoqlh390ms4b060z4lon2lngl64s6y0mmc8vcgqjeqw3zewiw72ari4a17ipj7qcssv89d3p4akr6wv4ny0tum56mcxbq2emncxk4kfmnhevcaazsc1bi5ywgkqkumob1y6g7vpd4eno2ktv6dw4rb0kczix5n0gttxo939zi7epegqhfkd2bb3ke9xiwvvvmtcqhvnhz073gj2kdo4vt588b311j3n2mwfha17nwumlrxz8a3raf28r678tr1k2bz2yijv62bzgz1rlhnatwzel6djeg0ehn65wgaf0b1d2vav9sull5dagci79mp6ggyto7p0hs4juqks91ol74hjhe4hwrgap0wsp6cjrpes22u2t4v01rx8cqcmi9rxt545ebs3gmbtbva76yzlv2l47a7ysu7wg974st3u1tdjv29aim34q12guprhqutop289krgh7wnfelrckloeistlcnv4vp2wcvk3vztosbw9tjzsk0f2hscu29prfdwjkhffbl2vs806ndeamw368uw8l1zr7pk586fnbt1i46lccx3f48rbt2rpxkr1huvq5c1wvifh37spop3zizcxw0sprzzpmf9hqol817x5lea2993aywydwtc8k66w7vwlskznbzrjehpuwr1407bugkrj12uogttxhojfxl4dlidwy0cqd0iv6ebxb6pr0zlu9173ilvxdpsljkvnb90y0b4it4rp1m84ua59q50uaw10a294ed2kc5tma835i8njgrg1kn3o85jxcz3nn9jhh9xkkx1s454xb83m8fw2lqpc3tknjm63o01o1f15kcae94nnt8dh5xbr2rqyu7mru0c0imuiabat5e74fzpd3045zwgwignyncp1n5n7x1ets0i9ehb3rgrui6gt9kwaa7s2aynx1i49gjuaki6hyd16g4ltzon049kni2as4xd2335c97halloabwnl7yb1nlsacp9sxe205ouzz05grki03tbv46p43u20nvwse7cxgmd7q945tlmh9zk9suoy444c2l2ytpalltqxz34xml1p2vv8oi13jrofnbxqhlvaj9tehwknokqpm67qvegiar2pmhx0xcuf7r0l5djzjor9t5suj4435abeqg1l1nieuhnikhdbfwzez9tf4n7jqfw7jtqi609sx26rf0qxbovkjo20qfz35lhdqgljey8kif172o99hdzevuimzzttn8yod0zotfg96ir4v1gwqv169kz98qudf22ugidlwtwbyf2v0rir82n3sx1db5byngm7ngdm2zfwmy3rmqvwdf0wu0m49x6h15t5ak07fpfr8usn7jlwqfq4qc6u8vnj7dtjnujc4dfcfs346e6x152qg7xubi1817uqf7mfngv0lfw5kvgucgb0vcyz47smzv2dl4vvtga6jt3hom5p6rig4u9ltbm5n201d6m9rylnaf5lep7q12f6rmhm7fs3gmevjun1ffapp1nsodpg0ki7d1rt4wiegx9cto8b0rzkm08xzj4m36aa6iz9m2tm8c8ol28mlbtf3nypxkck5dw76varol31xub3lpzycqpc2del6sralteqi8x78nrs90az4a8xshv7t9r5pabncmavj5bivkqc5j49v0ak4orhw7msqg5gfozd2x2j2a5cn4juga520lu0xjyzuyhe1j3m7ug61by48d0anu1tffaybl350ufc8hif15c8zjn314exzij66wzwdyyrnpuq86ia1izegqg4sz2hli98vt8pdxj4iplh4lewrp89p0j48vmzhls6nkrelehadsyutiy66aznnunxrloc9zj1uf6w0vtlytmvq0fau2gkipjnnx',
                expiredAccessToken: 3658787329,
                expiredRefreshToken: 3560524455,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                grantType: 'CLIENT_CREDENTIALS',
                name: '62pt9z7eju8rnlt808yzc906yz84t2nonaz5cu2op8y1bdrquybb7z8mr5fhearziddl18ixzwmw0xpndd4jkto8v67o4z8oas541mwqdxw0i9vjwxvme0xgpmy92tuqxctyn2t092uviqje3iojr0tdpf7ibyf1nnjjt0q7tfb63dl6ljmn53xwiw93ktzafyw58ei05zuanwc795zgy78zzc89t56fjizshdsdzkuz0t00y21yze6dq42cdve',
                secret: '2x95gu5cmmzy53lfkn6drjj57nhlhwatmwzz5q7d8hjp3ij3ra20lhm415pxky0ib3yxohp5dh8cs1k7c60licjnua',
                authUrl: 'yhvfy9k3ddfl1n98qk3peig0j1ht4qqe6ewwp0xqtzls2btbki5wvd4wrxuwfs5795sxfiyf9xtzlmkjbuxk18axmbc0k7xsea1jmeews6ae404tyf2f2o7anxyfopwosuf9hm3pukg7bswmhaeq80nj6yr3ay5ppow15vjuswn9l06rdltscl1s7g4ldnh6ddfat3g1zu4rv1ufyy6yv6bb2bnm1ggdcvhqkrutmdhb876ssi9vi4nhnhp8joz9sqvho2bfwtrmdxr38x9i4j9cnqmd0xjejfsaqha71jwl2eymejfnondj6jl82vgfr9049rqf5nrm7tu9o03y93f7d5pz1vakzadm5gr3i91wl6o9zpqmadxffk3y17z1m2ccu3orju6tggf0tm07fbulzu9coql3gmmn1gclc3g57g3ywy9yhumseyeaxmb8d9cnbi0tmphk83ok7kx15yokr19g7y1hrx8hqg77h0hv31h6z1zkk96kp9hrowvazdrkfvcwglvkax73bp1vdwzl0sqifwbtz6d088ljx97q3lmr1cukb5dszw9f0x0ijoxu3v4ggdr0zl159m5r74y5mu0vj9p2ssz5uxrj62texlxe0yfereuyhq2uoyqfzdnt710n6yzrit524r3mymo6sho043ek19fmrnckhr9a5jkq5qh0f5qco1srzm2xqqaagsf9pgh7csr1ndh5uciqh4hyyxj2ty9c588e7f8uv6zc6zg242r6j1ogom1c9xcjzoarxlcz0lzl0gwdtlupcm4hvfv7e38ajkk4kcts0qsd0vrhkney1puhe64dpg9i5q9iz1wpj0jlpfggt7096p3571w24esw5rp89laluujwvn2iubgevit1fb00lnsspql65kkbpvcggoppw5kd771stq7j9la9di3nuxbhxfucp8dd1syjz2xvlkxt6j2x1j7mp063a9o9yryms4rvo1ehzomdt3ep70x1caagl85ehybwzqp4xra8bmdaghi84vxm3j6tk5rxx7ubifkbddcfw36046f5berkurmd15ufk2c0h5jusa8l5t84w0yzq2t69f2t62lrdhpirxtzvjcnyrzhbfnefnuibpynr84bdstogy08mbc34tzcxn8co55912pwnp11jo36021nk5sk7awl6a9s572jdat57rfkj1w89y3ndjhu3x6v27mblnjhd4tws74q2hp35pa0vxapwjksguceec0cajxsjj3p72usp369o8mvbxdh0vygh0kj6msy6meft04xfnr4nb1zpvs4lkmwij3potinee8f1iu95x98gh35719h8bibfhizcho22mzznrjnfqetvhfcry7zgbxfbh13jkz2dmsds9zfuqxhr93b0h28h5s7rp6g48w0im4dkm7yyyuv63448h22xn5j41nlxdw057lqr9hl0jawuxn17m4jz32vexvkp5xrlt14mkr8sx0ozw1xsc66qq0wmhhs1drrmuzy2mpfrjq91ujc6xpq3nqa2codzb1lfqoi9ul36f7yktfdun4etvszov7l195oyfgticw7xv3qaeaclnir3lrnlp5qq783tcu53igqvecakjiw2bsve2l7wvhvydas6yqraxldn3mxah450o90pdto2jkelghfp9aa32nj6e7bgillecv7bg3rqwatdic7cmlrxtci1jvetmv2sqrx6wa1xbdxh2bnk80r4l50qwl80jpnqnt28npc5glg774acotuoiproiscn714s5i2hj0alb1928qvpnx6pf1zlue1kgv6qyr1nih3hcwqm3np0mncnmi9gjge9pwzoc3zij2cin2bmh8k0tikt34ahtu3gs1ogjttis4hz1j6qyzsaszd1jz0kj1glnvde2kavjrs9oarfwmj46as7t4ize6oscsop5edghs8wqgne5l4it70nit8y2jk7ogbcxshde3yuj50wv4zp2pa47wfjk58ex8rrfqowxh0e2j62mae9hjhujl7v047thwkdjde',
                redirect: 'oc5km1l6lfe934apfamw4lq7dwbc89oceduj3tez17o3up79w76qiq2lwyeu64siwh7v8wvs7hu769pr80g6v8z0mxudg83figax7mz7f5co00cwoz8so450q6zd94go7arj4y9vz71j8kg6ft8b8t5q1zahvqq03y5zujuuxhkz8nzwfyno4dmt4cevvxo2ljfby02m46b4t1f3fvzeic3sigjdm7al1lednv558l756aq1fimxf6m5lzdgv61066fcqpk7birwh7qa32w35bbtbizbzmvvz3k0rlxcy16lcs91sxmeycym9bbm0qxfenefxns3lm0tpyc024ndronzg0rpkmqixhzxs65dx5i2tqe3v8sdi431lcjxbooqrxz9znean9rnw6sn95o3g15uju116r6250r6jx9t0c3fcmjz2ygiadrqbtque6o9y5iqlkjsf1md0zjt2m5fuqdudjym6rfmfozaayswlgk80con8rp57jtldmepjkoyvlmtw5kx9vus38v3jlsfxr13g6e0r9j2hn5w83deu1n8xyf2dnm0fytekk44lmtwetq733x19y2sazsozzwylagfllb9i8kfev0uhbo3didzkd24f7uz9gek1a61esnpqp8j6sf0m5k3olbc55fd63wuc4rwr4mctfrpxtjbmn6jx0vjje6tw4m8pg2yqmum3i1wssbcdar80en8pa0hwo3l8zy0ayzmpzdouoot45cuqp6suxnuoggqcg3ruyo9etqzjnmwvcpu1wc2nj87eumwxd5fkkmgds9eay4cdi65awz9qykhwkxclkqo06i7zsgmmg82vpsubk96jbx43srmd16effu5ri0psn4ey9oezo22rdcetb7wlu4qbqveg4z5cco21thb88yibwpj5rihjil17kytr2xrzxnm5hc3gdn9aw4zro475scd3gguxfd9bnqzsc7g455zf4p55gou6ephg0nbtu6csgye7ccbefjpqghpgck60oip8v7op60wtfb2ls984ep091jwdkeo9ro8q76o9e8fze8jsiehlhn63bcgxyqedbmwg42hn5w7ty1hpwr33wcgdznxi45c7ruwzihnt5elyjgobn1xmd40le4d1u6zye2fmwjqx07npzmvxd23nnegd5myyl9ecg352cpp3sq76iwiofrgmwxpahu629ysi6gdom3er25j24tcpmc89nx8299114brr1g3is5kl9ddwrlp6t275097xjrn1x68jk3ug66cepvw7pjhtjhqk03vn2fk7y9l5yy8x1khwocb7uxu70mxxx4pot3318vvyh99z95vxd9snog1aeqf3jyqc10qjvf3lm5qf0cb1zps9hcrq895b4a8h3gdu3w37h9tk4nik7bku3xuiydzxt2o4fw1e7wzfabqeng05gy8zytulkyoraboiyd7sz7rnzrw5ah8nqalga9zxvnwssv0po6hwk8lr2q78dfjqpw0i9c9l76jwbzus86zdj0mkj6912utqccu9imrx0qq22pebo96bc9o0kmk6s71o2eoxhgw56lyxi0s7aevyt6sc834yo1pk947jumfut57h7vjrsfvej0okirb9c13fcxqxy2mioh4vj1i4v1lekln0n7rjyr40tsvp1ngo00hqnpwroulrpc4jhvxvps5sdjejf4z7gpg47lymk6r6bjuust7j094hznr3rqdlz0ellor3cnlhs5nv3rp9msliyfne3lq5y8y19vsp9d2e3ifz1flphfkiawldhl2g0q6h5zezc4in57o12fv7d2qn0bugjwrruudixhau9r5e0d0wc4jpndg27kacmiqnnmy9q50i2sg1bp1l1mnschcdlhwn5jc6gp89hrtmmbf1iypd5zcz3uz8kkx34msh1s6aamozu21jjb6uebuem89ssg6nwhdu9zp7jmelpgwh8subz8jmhlegvyisl2c0b9ahoelwdpvsj60bpikyeca8p9pyyb624cq0j0uviufmtvq8ltfzmxu',
                expiredAccessToken: 2779017123,
                expiredRefreshToken: 5065268478,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '08b6dc75-b393-4619-a22d-4988b306d83c'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/1a39da7c-e063-481a-841e-f4db0ba8b6dd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/08b6dc75-b393-4619-a22d-4988b306d83c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateClient - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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

    test(`/GraphQL oAuthCreateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '7360fa30-6c9b-490d-a221-cb09953f6f3e',
                        grantType: 'PASSWORD',
                        name: 'ca3c0mykjy6dpjcnw17jxvf7ds88xczdmrzryh599pw19w6v4lpa55r018pgcsnlqbpiqorlsiqanlz0t731jm9hk0czae0mntphyutokwbx5nbia0jp87awyh8m2dkrjeqwfnzgkenbpbwb6tqgs9n49yeidmgp93baueiyfxm5eeb4obnw1w5kn99hba62mfwdb1d6e4pzeqhykjok7th1jp3ljsokqfe1yxi8nyu19udu7la20vb0us1v7xm',
                        secret: 'knnd8c3bi86bt740hrlr65i4l8sxk27rr6yn32ygsm4jqu8nm1d6l5l7ilg50al3ob860cct37n8juaclw9c6gjzby',
                        authUrl: 'ia5tanq97w491w06jqia1b4c2k8ubufj9c689r3fbh8k6flrwd0ez8ooxpzu3xz405rs00929g6ejkl9i1vt184yfyf97d2xeq4g25pxvqr1cqi63lx8hkiqbn8f55nve58pewl98zcalt4hbg83jgmnzow8zpx11ji95bc89jl8no7hjcaa9k348uooz7eyx0e2bvm2g1z5bdaw0i1ubz9gsdizn76sdq6p1x81e4b7tsv4dy50qlgegga3rrbg3jlfi0kjgfjujk1zhclgcb54ibihlnlog6aun6pe6objstmf5cby0jjdgcalv3ahhu8cqgweqpt1ei5k59tzvn0s4e58qhxruvd9xo7sot6o5ivch0oyv7m1i5tw2h972505c28w41hrg4r82qu2ijpi9mwxdgz7ey9v89srwe7emrtmxgk34yrgxovmrmo0t7revoi5rxok1hdle7589dsoe5edzvr8c5ozykq5ft5vlao79cutf18pyp7od43tmj8suucswsggt1tk4x7vulmuyv21k0vkz1t0lddq49vjpjbk9m88rh58gicy87971r8xjc5sww6w24e0hvml7pnphjodb3t1j9wkbeohlug58xcquaclj1ooykr0rxybqj18iqma3hwj9f20zissa5n7n67tmnwtwecim7mw26qif90olma6s4k9lld9kr1fn95mo9yuo5lyg2ax5nxfg75wdk4bn36u5ab446zik7n3jz3atmyw7s7hmsywce0fjkl142ixj25m7l81a9vpeg2stn477jhcs7nvfq73a0w2wmrirznkv9w0mq5hvcucltmgmtk1bv5zhcjpu2z7gw1emzza4uxynl5swym116sl50elx1q67x7ewzncuwe19vp8ujyqqi12i1g9twymn6r40i3feusb8bf4vrevvvcatay9hr5amul8n6vb126uxhvscpe6g5uodtx13nnoe6qkmmll8k1i0i3kdvt6o08ph7ohbpkgy3j3twhruj5wp7l2oeg4gcylgn8prkj9t7jk937mv10yl7nscd3dqhl52rr5yoc7gvt9fwaj1g53stw3iaiwtv0rjhujcgakil5dz2kj7ylvaywx0zpzxapk2muftatb98ykrzvcklsxfwj3szgn2jd3meqcf65jplkrsxndlsjzkjm1ph6a6tcewqyt65f3z1lknvfm4jfg23ozf33y64wqapseo8sfxiba65uiyrq14stjvcz32ykqtljt2962v03v7j5srdnz9wh9921fg9ztj59z1nfovufc4tb7vk1xn9iy8hfuyo9e5mzbzg4v2xheo7titwtnj9sojzw1ijgnmr0oz31fzsukjzsjk0vz4qvf6sitsjrimrlfkq5841qg7lzy4upt2jm8hhyect62e1bw4dg0ckfiwlcxilomoyfamkougovybknfeetpfmjs95t4mitxm03ntkz15rzx8ftxpvkz53s17ex2uqyllmwg61oeevpexqpyph38yltdxq78pfqc81tcl2e3hd6j9t3vy8wvfbymhgf5cy9r93plg1b3azphd4qg6byr3kruyna32v02je78x28klm19hlhirw7obbete14dipf82r6dwipag1062juh1ihy99hyysrgk6v59qho62ict4hw3y3y5a5ohnkygymwwz38b0ipnaijnr83igbemaw77suzqd79f66nhay20pbfsunz2pmliybu5ojg64zq8eydxp6xw2ovpgr9oklt989cvagabwhiv9g8mekowzrcui92v73ujglkxxeq82emz9pzexb7x4t8s57v62lcc1kba3vhha1mfb0r0fh05lkaqyf2xjezbxu5uscx9ir3nr2evi28tnxx0z9h16d4phtixalimzw7h11pwu8lwf4z8dd18thq5zc6fthtxbv96k8llovttyejaba1nw5v3hu84z6lqjg6t6vou0kg3eox5uea2dvdqenogz1odjwed3g92jrt48xj3y8cmt0nidj32y28dtsbm3xu',
                        redirect: 'oz86a8nkukxtniuvea1pofr7dupf4gpo4zqoaijapwgjogptuyq2y0i7bj7cvmuioz8bf45thwm1rghgc8cmhr4vsqxygi2rbc1crop7947663g67zmmitdg25rhfu6jzu16vfua8uh6i0l9zstntihe496x5rs3ca01arznlajo2wx26uaizso88s9enbikuftbrbn8xmgefem7jlqrlapwcux2lo1mk3p7rwjg91o1l97xdowak3zznrmqhjgukdonihs1784u96cnbx83aledl0zicg3ixdm3gh2q7ob5kg4eb10wrf52sz7di4ae8bojfueoo81ca8fiazlxsdlyaeap2djinjq0qt6f59tbd76seshvraswbqv68ma3sip5wb9pym6wam6obf7bxyd0lttl4jsqfqh54muifysy0pxz9osxr2620rwoqx5kdjkpuy836r1fao240q1su0nrzcb1cmynqpr4a2az5gxjue42o0lc5dwivm1aqa588k83geaeaf67omns9lp29cp95o594awdblvap3mxtsfabmeo1jegum73j64sva12ig4ddi8vhx0lz1u8zv9vefqtraigg5byx4iiunngk82nwpxxg3xxukw1qppppl48964ln1heuzo7kdccry4pxrk6rmjl5c48n3bu1s4izg43sq3zhox5vqbcdk9rkc21jvgz7xouh7sbzujx9b9wiyrm47c25cn3748sw61sm4llv28lkihhs80c1weasf4iif4qyg17aijsr2m0zvj5fkquob64d64565dh2nzffdsbi46s04jqskt3p7087drc63k9uotyhydnxpilgeu5i9stks1k2i3741qcdrbbem3izni6tojsxjkjuz6hkmh5xzyc38x6w9zo9mhgbkwe5j1dofca60mwxc3ynbz01bt56g1sz9s3x4qnfi3ug8zf0ilwwpvz1ancam9bjwkhl9bc33to8zp1dejpalnwfg4741fhqzio1jz6hyag7zvwpo2r4l26ku8kvrrokh2x6cwpa0q6sypwwhu4pfi3idoec1p7dmzyie0hw7bmwej6akyrn1rryn9odszy4n8ilg3eprwo23rjuuni3cyyumb7x89s5cd7a0v6f6sfr2ck7rif1dacvvgye94799gmue6mja8ry2rzl2olp7iv3wjx1k8g7dq8wqejeaafzeq1cfrk5c2waei8ijuziy651sqmhaqnwujabbh7nmhqvgvpe3hcnye3u7t84hbgyi3rsijh1bfit7lxqnqu971w1uey23sgkqft8w4ds27cgbkcb14ebe3me5k538pdks1a6uzhcem0jl2y5gcfx0x22tpjm9pabax66ut9gojcq1lyzz1rvl2kvtlyccal8th713bk6lfzc5bamas913aon7roznz1j2g6vxlbcnhmswzj2bno0rs1ged6ypt90hln1dbbmfpmwpoj05a1zew2n9ryblm2gd9bj786bxv8fm9xpsnlbqeqoad8svbnsomgoc59dday35u6g981qoeinrvr9doa9soacvcg070jwoe73amwpem7ou6eq3tblnvv523yvi2yge040qn9spk3z4hejyen19nviceqgt4glm2k9i0zst9ktasc467k2yp7g437s0lt1oclvn6g8md8taaal5yqd033gixouyc8sy5w62obbzkbalfio8jakk6mf6u9yaxvxof56ykel2kh63ks0h4soydviryq75mrcxelmw8uz12fjt16aoyaqwbwii8mfsodst58tlmjxtfroh71t4f6ebk8m18sc9mpcx2xrmq393m0ywl1wokd206z8f9jb2ckrnfvr1zsx8g6z2t5vb5b4y3hy1p0ysnzig6tj5zwo7tsme9y1vwl7rgwt5b0ei7eixxru93njsm75yobotj38k3vzp2c2ai8k271xe37lpps3zq7hnxl20g34mcfnwspfb6mzja558a6ocp6g49obqcgs7vzeepgj23lpr52zju34vo6pg6yo3ja',
                        expiredAccessToken: 4251027580,
                        expiredRefreshToken: 2177233630,
                        isActive: true,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '7360fa30-6c9b-490d-a221-cb09953f6f3e');
            });
    });

    test(`/GraphQL oAuthPaginateClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateClients (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateClients.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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
                            id: '9cf38fd3-9d2a-4ce4-8b15-946743463903'
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

    test(`/GraphQL oAuthFindClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
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
                            id: '08b6dc75-b393-4619-a22d-4988b306d83c'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('08b6dc75-b393-4619-a22d-4988b306d83c');
            });
    });

    test(`/GraphQL oAuthFindClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '690a1998-c16d-4533-9568-70138dbcd271'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '08b6dc75-b393-4619-a22d-4988b306d83c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('08b6dc75-b393-4619-a22d-4988b306d83c');
            });
    });

    test(`/GraphQL oAuthGetClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetClients (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetClients.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd7b7a8b8-9214-4d28-bb8f-7310df395e9b',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'fl8oej0k1zx9rfv2hvdmej1thl5lu51eruxpau79fylr6pqqurswlfnsr5843vg1vnz240129qdcmraxlfxuu56d4olofqqoggm719qs78b0pi8t4uou4rvacszgte0106c0fmkuv8flwgftg2wtabxnlc6c6666j8rew0rv61m8unjqzorhrnxtvs2ibnabouqsttprx7gfy8p1x5bdasqfkuwknlyanngmj1k58jyf1tiigp8nsbaj2med851',
                        secret: 'gpewnd0ihltupb6f3uhdimab1lgen8c9tlovgzp9spu7m6fpb3qxlz7rwbh7g8i5mir3xvhlwyrmo84dmss523zeie',
                        authUrl: 'ogsl9gcgx693y8s0jho6dd7ahn8s3neojhle3xb54ogmi30ssmc4ttzt612jrusm9vjx5ahnblpnicrppsk9q6hd7xpo2p2v5yl042gfy2j7q8wiqzg52s3g17g57kzy4p8e71j8ox6zjn6wvhrz7bd4xo8h4lp9050swi6dimujruhydkjf3t2elvwpgbcmltt4azs01u4tm4ml6cexikdt7ymuqadqrt2vc5ksn3krezyf6vjpd3s5ied5uvr1wq9eqj3p9dn399md8rqxiq2jr8j3e2sk0hb62sv8f7bas85t88u8uq1v8iw08rqwat5sj9unbxkojqy4kmex6xu5lo6k3bcc245mjl5yrm036solh9ufktg7q45gzz2iec1gqfhp1b6dnqutev5mqg5qpfp1b44s1to2t9fqii5b8lx6kvsox1v1t9ufoo2lt315jgvau2is3zm61edt0x6p2h3tab2ikdopnpi7zyv9wq2php5y94esl8u6f1976mirmz4jujmq49kvisk877rf314olfmh1oc36ors6c2grvhwyhggt0thloso852cb0r54ekc54fnswum3spi8rb907ntptwvp5fyddtsr2q9k5xdd2h39yt99r5sjmk2kqb72gs3w6lgdc7q9hxx9i82cfd517zzsa1zjrh4m62eq9o0ksw8ius1wjwynsene1bs9du5pq3n9s0xne1mw8pu9nkqsb1m8jnd59atxmy4jp2a1q8sfomzbprvfhavibadv5pwe5bqcdmbarli11dt3z3t8hhycer68ab5j4eepybox24b2d5cj83ayk1opxxgw404bzshsfe4fdn5dm9nqrga1taqpqdkwrn1re0eh8j4oowpp4airg55xhyvc9ot7uw0u2fej3gov76l916oc3ju1qdzom7i9jhccu2q6k3qd2wpm1wcf9hmz098itp89aln8ax4h0muzfrubarc309niq2ny3qnrqho8uvtuilvm5ua3kr3ts77ety7hzd5b2hfpgaf5dw4w7eryevdh8pn0te3x2wk8jm14zfyevakjlrgozxfgtl49c3cvwx7m8qso7wwuemio33rd5rlvhxe4cydzl32iovr9l1xie0m1bdiib4twgx2a3xmpqj7i9u7pryxmjtpjh7u7337zizjutg8t8a8kprjo389k83czcz4bmqw8re5qany6fplveukeq0yaj3ed5fwdzk0t3j1nqtoyt6mub0t6mmuupy6w026tb1lpozbq2vhjguwss7sv0iv3r9sjmiaqdv65a0gz847046xerxqov073irt6fv42k5cpsfgutvi4shnni2gad61giy0xle7lsr4717ypflrjlbzei50fs717ofxs4pliv6dh7nurli6vcaze1kpz1yhqn9xbevinmjhf61q4szjbqeclxvora9tkud6udru8n8rcu5gpk36hnpydh6ejtho8lr5ukhzvyyf7zy40jbv6qiprvmigsg95h86ze3m9prnf1hovg1ryaa28hdch8hpmdyd65o5hb9kl4x659y9bw46cq6z5lw4jg2205aa0cixvx5fdqwk8ejmkjx9h0jb2ai2solgudlq5jogine34vqejdwwcob0xd7od9t0f5iliz7gtduk2fb0fxdtombkoahlxjumvt4q7gtiv2ofkmh31rvch6fdskgexjhjyutmyg5iulzikv3z322pdsub377dxhv32fzb4dou9oepzz3xe8nssufrw6e8uvm8mftug4iahu8z3exjgt26qkc0hwx5k0qunyfixeas89byvavx5x36eaoaxcsoq1bg6tnp6ic10wvesgfv1te1c45fs52aa7fei0gciv8jr3kt39sypy5qmtb8apxkrrgwulzramvtuxg47dqjg2sgted93yge3frd2ls2ukml21em2j2tdt7bw1bwjeucot4q6vskgn9wx1x7jsgls5pztg4w2c7lfoi3i6p5s3rfzaxadl0dwjpozj7pu9iwf0hy3y9j369vt729',
                        redirect: 'va6lj6b5j0e9i22ktg5nho0clusu6qsgz67esipseiknahsz5m9zanolatwqc4ffxqd6tz56vqzpgcew60mfry0b0pxnbmgkrh8npymr2fykkbj4b2fnmqmziq2m03yuyppbyah486c7ss765qx5zmw7vg270h6kg65wsnckhrde83xwcyisnibq27nrjo35l2s9j33zd31hiflgpwnln291f0nvwnudm97bk29l1qrlixf6rivq5tdsaodtefch1blwdjyrb2ril325ucs66xun0fu3h4zsqqnl78vv4qeonze0sreg6st6np93unfs0yk9h3vdbfni4zp5xt77zayutxd9dp3h5by63jukwosl4o3xnffzf27s8ajjc0v7r8twj5iplvfj7dlovo61ya2oddn9e3lbxnimeyu33omuwquj38o39pgaddbbj058k1aus84b1ol6di15rif0aowgf527m2es8feb447olyrlz8srxnhq4x3may18zdt8qnt1wyfmyjn0e1i8dpw3wdpksra270b7e8mbz10tx85k1fbyu75ggljppkaskbx99zfungxytfmxze4th6msrr7qokgipat8ie6fr3w1bfc0edzgq51fc1hwezdl2nl9whbp7fglzd300vxizunezaxhdjpuu7cyyejajrm9qnsdt0r8v7ku6a6xif98flq1t8ufdj39bxd763gejpx9g92x607u7lt8gxo5axm6yu6zbu26o4qayh1c70my33r3mvseh71hwthvqzfgh86407hir2w6uhitzbxsmlmfr1kre0q0t2ajqqwd4wf89xs1uy2qyrgtmgnnckztkqjxngg5drlk2kiy5ydvdxcaphatt208kghwyncimqw5i1tupxkzix92qornfbxb6rq5ydfsgk0h5nsa83qre6mvprz1omyy0ook2spnstuwmxbvnw14j8xqh3oomxsvyip8d6o9w2fjo3rn4ekoul0zlo9uhbsq2f1toricsroi2qtcikwa8q17jjq32jpmbn72g960yy9a5yy8q43o9uzyp7s54kxie66k4j9a4bk0ol8oxwr2elo1cfxlh954s195ux3wzhhq9i6i52nhx0xiayzt7557lqhpkfwms6qn4nsg6mce7s7p0xmstl9469u3kpg5kixkrde6o1ue6o3vbldjlcqp1vzmkaodntnnwpd4kj3hok4rzncsdg93efb1qxf23za2af5rel39c7rfsov3obq0trmp14epkoied9wzg4lfxqteu7x4haiqhoc23ke8so3k06a3jz8x0a3aw9qb7t02pgozd8ml126enojqype0pub42fr3hnm5s0xpkfwgls6x4up08letgqtf82gedav7hfszsuytz9lwaddtvh4u6c65tmupu93zpnf2dccur4wqunbrvm0gkvq5he4p16molarj7uf4loreq9jrigekwg2gp7px3dbamqhxfmpjui2zvve0r2kxrlyxrw9vtwvb0tluorw5vgesrpoft2v1v35c0dpvjllvz98gh7qq3ynkkbtlzd8izzwzonwigz3vu5cb746s9qy3cf6hzu5f9745tuodkm98upxhmcv17z3mz4n1dz78rimbrtbhphxzrdhk7hsgy5wuoxrgg2glszawlx9zp6ti5wo01m4fayiv2qpg1dolp81c57jgybdiwoxijnnmwux67oaljtkwlb6ziljs7xtqrutrmfozhbbpj10qnq0p7y08o5j547vmczvnj3uscanuy51psvaowntzw7g6w2oolrwg4aj180oubb0wvcg7lcshj2cucvwnk95pr0dynnzqxxv96zzku5tbh73fa0qzxh2byur9b94mjfplds5cl4j0mq48vu4q9oljlckkyvmibmbk7rmymxou1eon3rbbubxoha98ula4tmnqvkmmho5p1fpge5nf02fegz3ejatftnxyf5h5rylzrwlsm5c5fhgficdahcdm5kt59smg9ynechxe6gty1k6wza7oe5q09tur',
                        expiredAccessToken: 7063907286,
                        expiredRefreshToken: 3555253988,
                        isActive: true,
                        isMaster: true,
                        applicationIds: [],
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

    test(`/GraphQL oAuthUpdateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '08b6dc75-b393-4619-a22d-4988b306d83c',
                        grantType: 'AUTHORIZATION_CODE',
                        name: 'luqbq5flw49kwtvp7ets2yoktkobcf59bdklwox92655wpp60egntv1ru9zm5yafxilxgxw5k4uzwbkh5semcp485x321k32335nu6dpti5f4880nun05zw2vzd6sqeb5vr0mutwwfm54bonhpqtfjh59czvnqd8m104gshef405uiqbg8z1dytxdcwjcgz50os2ob9e1v15ax6vthe9mqgm89ea6t2xu4qh6pxx6m1145t75l1omh35l8i9evs',
                        secret: 'negrngcb07h7fezs4zqfkp7dl7bbb6jemvlwt0gowdigjyvi6te0n49wv90leyc9tppr364wwwulh47i4m7qzrwfof',
                        authUrl: 'tjfkzi84387xa0l3l5b2butmqfmhzxa9bdg4qiwbcqrgofjvys5kc2f6qyby05h5nglqihkty1ha936h3rq0t0ahvvbnupije1269rnzyarobyrfnky2zhwdpt5w57yg81j36vq4n5m97bljz1b5llwhzxiqmc6aee455kxaipjsp07r2tugfdrmhfzt8cagdx1jw2t8lhbs3byylk2zuw3hy4ok69u1xkpiuv69branzfurgpjzhdg980hbj83wjdgu1at7wnsd3n6enaxt4m90rr35yl1urzp4fx5gro7993kw67qi234efmodov51822300h11gjddt5t30ojxwq8bkuyrdh35bgbj57fkdexx6g0ri5ks4q1dq7iankmkx08y51dgsio75qiphw2dhr0dtl8x8h4qwdtyn6tb2s82vnjcaybt5xe82kfh1bn4d82us7w3jan63ueo8gtb91n3mkw70vgzmfr0yu0jb529k2usaod29uhuficy9sa4nhyn4p5nuuf8elvyoh82qv0m84wqt3qvgnieu3r327ug6v3vctcvl1cuig3gsctzfwv09lq1vixo1spncs8nkah984ren3e6mh28ungsvpvyh1q6pxrxmv8z06ac5a4qvd79l7p87kzq42drmeygjykdpx93op6wpfcns1yhvcj52sitk6vf04qmjabbvkzgc4sjsodfiqdbhi12mc0n58gbga834vjo67wbld9awymzehaietnne6g0eyye8fa1vx7i2jlevaehhn4td3t8dwu5pu2uwulm1n6wlue3r0zbvrq1710zg3dhqes0d7pbubpbmvdl72jdwwcuddy47ul00c9eb7ut7svmwa3n320etrx0ies5zxxwytrsxkdtv7hrtltqoc8gmis0vz7y88sszt3444gj3z2mpi622oas7k9zkqfzbqgorny7luqyzh1xhstrpdv7d0ihvoy0amn5f0dmnbnp65sk62swvf5jy6qttvxmzlcr235z6tbuge43t7ev4m1uz4mu8602fvri4i33kaykcn5906o3bag9u61g5yg01fgupph02hqzu8z7wulhbd4mseptoyuxl3ldajozo8ksb142of5xbm70m27li4lcbs6m8of56al3lmn3qyqfcfvsiyyfe9b78rt6ev8lypakq75r6py3vcvfstuftszpzg2g331padg6syhdqc4nmhwfdh6f2jmjmwd1baoc22qmtx61mqwzx0i472djbtgh390wswxm9udllpiw04obm5czfp1k1nxhcspt4a2jnjrz43tp77fb516eic8v9aarirojit6opifzfi5u1tsr9djzyxzf71n3gsbe2iovsueq8hnzuqzr1jtppf9n4lgah2up1fuze81jnpyz22viso4rjpg1z3dvs0rvp6uvrpclpsmtjfn11a1c2e00v5b2kroe46sgol70lzmghbs48gu304x6adaqni8ksi2lxj34pilfze7vv2nlwi8wxlg4bylw43vtuskiq56a9jsj4id696r915inw6vm7ovwha2ejzuvf6rph8510mdu4i5rcqotpq3f7tckexuljz3shb0zhhtctom7pjvgn92rftfy8lt11qbp18ge38p25v207rrerml1e4i8vrz1r99frpcvu79oageokm3d6mwjh84fl4w2nf0em86xzqejxgf9wiycuwgo50gr81awyj2kl9z3deil3s3pmv6djk8pnsis5d7794edzcfyvzd5zw4d8vx2la589plw8l5u7ob11gyxbekx64l1xz84j4e48makpd06m52jnufj758khf1xpab2sgsy54gve3ezg3e2cjy0clbxn9e1uye9kt7rhr1gvdfovrvaddc1isditgaq5203h0vvusr50ahnhdqbg3e3z0666hp4qhe7j4l5b5gnaillp0v3kt3sq4efslsi4t73s569harjv6ulho0kg82vryaa26tyllmyx7voaux39kbchiiq4b1hlo25wqz41y1zwj0bih0',
                        redirect: 'pgwf8vp1pj9cwdyihk8fptcipl74z7k9fih26lp614xa7ly61g231lo8y2ovpfalwtlnaax2zm5ny39tobf29rb21ojtz5d7umwic7211mxlqkj5q0pc2k1xcul3xukxya4cr5ts6oexzuenbwl3rlmkk3l57f1orlriuq24zz0703ufec9zba8837bgjhlymj2mw01s7k4omvs8v1d6bkr2paaf3evrb7vqgxk3d8f8310eshe3ycexzu98m2uoz4es1ya87etinqo7bfen7d29o7e070vj7yw9lbcfmtm801lvrf5b64xg8yy7gbvevuzmzj7463wlu3dp7xajcmn09te9bzrer002smem2ev1le3m5g95jb8nyjuqd5agamz0p88inadrb0egm3qb04obljvs2u9duqcolz70yzwswtrm70km5is4n2j0mz3fz3lupp9jeccb227s12ysn5q36j8gqgtfo35bq62patx6cwi8lsq2241p1ebngmj3it21vaovanfh9std1zplugklkk4qvfljz4xeciehpq4tncmf5s1ugt9nmnz8t1mhcmg8lhgu3yxcbnhl1mdvndbbgazg4rfrsjjs1i58a95yra3n8hw938ah7d3bvd5o0o51w6nfn8xiq04b0nj7sicbi7f17icqtsk6p4q2pqdbc2mz6v0kjcu2ncu6rnp9cfoqy2tgvpvsq6m14zo7z7gfoba0g09lnmcezhknpgn5sdt4xy5rrkdwux28f3do01frggoyk63bgp04a2w5z9rz8n7hvfnqbave97cam78ksaepqe9v9sraq8ju87iix1utl06g23b37mnww6yd27ccb5c35vblo7kl8bykr085i8cnqja8fadvtrnklrz7p3s2m6dadnekaduxwv41x2pjplwi4ify3jizvbkyri8h4xpg0u57vfrv5vlc3s0ckrsc30qwzuu2u5ej9icqj0kqumy47hgxj4t1mn858n4kap2mxbfej7m3ok17qmqgdunuyozc3sj8ya2lj0bfwje2t50fc6gqndgisxb1srdo0wqw92ystqiognjn7kg77i5t419nkcvnhmvqw801c5d6svn6707hwpwbfhwqw9xqv1tlk48836zvbn7hj98bsei2omdu4hzluatb72asblt1534rkw3kd9ok1gi6eksuh9qxpfcp9mk6s1qsbztgb1mh3r009h89nmqbx06seadshq22q4oixo1dmhozxuueykk9edr6rqsxjvd79oo7xpqft246a8c27ca1jvpsny3tmfvr8bufewdufzoip3ognroht0eymid2r8hdtm0ny74troafyp3dkzswkicvgehbyzk72m28ye5kvjmi3j1hlc7jsurtef4urmhbpt7onul38n9aqfxzl5midhydsd8qkl92lzmppjs44ltkjpvietv583da79ng4nfp5o7jtt6r925aje23l2trqztsz625ac4qpy37a0slrzqkvzpks2r8cl5nhx72lu8extwmdugvfxhgnkiu7s2163i3hsd7blxcrfhsndh2abl4viqqnhroq3ytzl4k7ebvpmpbz96ka5riet24bhiqon49tnu7ixk10x5a4bazacf9w82lab4rx7ao0cr1vp1x8cj6z01sr91np8vxf2sp1rxe6uom9ao0ykqcs37qygkwv2d2t1tt2c92hu4i1n6hrims4nv6x6oo0rvv8xirtil4du3jp2gkrjut2w8qm9oidtrtoxkszqhrcy4afewuaj3w5qxmtyofuihj25i32moasvheep2icboizxk6b5h6wi29i52zh1yxbo9yiibou0ak04q6ajflwoso69eupy5ctrqx6e6t1394kc1py5lnj5mkmat0rse771htafu025f93ad9qdikphimrtdk4eyrvyuwxj9uquedh8xombwbik8ep9at3h3mucgym5xhmlbjytfkinm5lz88qvsq8ew8y4ziulmpr0z5843d3ia09boo83tuho5svg4rlwazkprk',
                        expiredAccessToken: 8972239725,
                        expiredRefreshToken: 2190548565,
                        isActive: true,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('08b6dc75-b393-4619-a22d-4988b306d83c');
            });
    });

    test(`/GraphQL oAuthDeleteClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '33ec140e-f26e-4b76-a0e0-de34c051ba98'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '08b6dc75-b393-4619-a22d-4988b306d83c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('08b6dc75-b393-4619-a22d-4988b306d83c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});