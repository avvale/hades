import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '@hades/admin/country/domain/country.repository';
import { MockCountryRepository } from '@hades/admin/country/infrastructure/mock/mock-country.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('country', () =>
{
    let app: INestApplication;
    let repository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(ICountryRepository)
            .useClass(MockCountryRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockCountryRepository>module.get<ICountryRepository>(ICountryRepository);

        await app.init();
    });

    test(`/REST:POST admin/country - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: null,
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'ku',
                iso3166Alpha3: 'kkn',
                iso3166Numeric: 'i3e',
                customCode: 'nsx7d1bzon',
                prefix: 'x8qj6',
                name: 'l618ohb5umily4gamde6nsmchqwopni47lr21o3jx2pcg549xzl63ybdzjiipgi6qwulcu8vf8t14mwiamiqvneojwsi4mrnrh211vf81ad8q1qn7waojutls0dmiu44omzr6b5jci0qr30zhyxwhy80h3ytajpbv54644n3rhpksw44y8ao5grajb9kwffi4r7sckshi8dag321t77jfytbiztpf2p4x92v3dle8rsld1m3u57wkj9bur5fo3s',
                slug: '18ayaopl418iku6lo4fo0m05uekt7s6vraq4muhsc5vvdx6dx3b3gmxmm28uuybd3orzuu6hdbahk9bu7rj5pq7jundy1ot84fh950yew6kk4pvl198jxlyg5k4zrgkt28swyaeco6ty17veugorwdrgzgw68t6f5ps40adbvjxfvel8fpwws96q6ljwudg9x2eyez78rmdpenercgzssu8epicflban2xnr2as5v7rdvkwgq5ymy78c9urgbed6wryxvqf0hcx3b67bnimoz425o690fghl9osqjxw8apjmy1zpca54b7qx8g49zbr431nnvfjifj34f2y3myccfd25o1ks3ow0ldbm036h1kvuib563slkeil2xakpauflvm38pzubas459nl7ix0wr29o1xstyzh7ftgcmqc92fjpk52gemaz00niqma4n6emx3ipimwo86yp02on24pgsg630kjei92haomw2c7j96pwsks51b1vjnzyw0pwc2ebcna924g222wi3whl6wd8bznm92g4ws7g0e8e9lm4o6kqzplxsoe16pqi8f2eba478qe1f5w8bbq19sjwipwiawyn05ik52xjkl82qop4ku1s1fqh4v8loo4ejjib7dlogrtqniu56cpkwx0eklo8fmmcf1xl53vy7b551s27l94ozy49fjvp5bt6jxjw9rp0sucx1zvfu9xfjl2m1ym5oq7irokzwtyu4gw9yj650f3qbn2q2qi6rqegoyb62fs8bjv0nzbmqh66jxxyk281vwid7k60xr9yioojpclu6v3zus729j0x1x3zhq9v31m4rw7xh3sm7s5br0xkzyu5o7idhjg10jjh1hzd5rqovipbjlqm15oymj0vmdnh36uqqso0s23h7cs5muhmjggbkmfuz8uyhg1l8sd1haahs1qgr86b8dqjwiveuzqwqlsk81zd482sj0d29bj1ih8gjqhms8houitvx7d3siyja0rwv91jt0cidj06aoxb3qcq',
                image: 'wrj2hq5wnw60eh499pqhyi9ocwnzz4n4e8wdtczwrshtbm2vos7d3n0lc9iouj6yisv935ul63a73uvrk4yvl80x85iyxkgdtyzkmarmol2q2kpfg99ux0zln8v4nilrgkghl97818e1nlq9j881ggl8qt2z32erzuojjrpmdwdbvwezofg4wjw5d1wq0ekev06elobyrtn9443ys62ckh83srlcqgrr0ehoqbqk3s8a48pqt6xy8x5oc3z1xgozmlzrp7yn8k04ouq1wu5kzxjypneodu3yt3ls1n613jodqqt39bkf49be9fbku6zwkgr1lj1gr2744znqx6kem3odlgqxsrhw32rwxd24topo975iamd8pl9hg9jhxvtbhw2sb51d5s8l9ypys2562s0kt2yxuqzd2m9illml0mg1rn87dfvo8gn2gr14z7myyyxibf784ofdjlc529o4pc2lgsuqx57b8puhiob8pctyu6vogkb4wg9tfqz6en82x4pkg79hu405yjeh97xafwlolcr92fsc0b2xxsllg9ueqidj3msrqqteqwmhdavynwfhdxcosrjqeo3jxif5byenub31mx54l8qhfx74v1afnwbs4m95vqmh4aaedehj89zfnfec7ozi32n3rriw652ff5rb0ltyvy1sdhdxp3lchxcipwu6g73vqurvmdbugbn339viewupntxs1yrmlaxcx6ykj3jqdm2o3c5o2ly9goyyiivcygg4qgpl7e0qe8mfpuxy47mzse8pyc90r6ldkm4koterukhazwk36vhgvglel3m8kq3acs5zp4x216py6ekjeiohe4ucj4ferlr28lztc8hoz32xc9za9dj03wmnbe99ftm6nowou2a20ulscnvvt4zyjgch65v4ra23vcl9tnjyjk1ni311mp1c95gxmqzd705jtdaiqnkuwd7trwknug3szpqrpqxfjz5gg49h3859hh89umsm8mp3l708loo6kubfyk9gwjo5',
                sort: 109905,
                administrativeAreaLevel1: '6n4s4pq2x65kutnkk9e558zhwiuf48bmyradc607anllm77dub',
                administrativeAreaLevel2: 'ld3g7488d2qvvz3c1j600w5fu1bz0psztuwblw2ks8hjhl9a32',
                administrativeAreaLevel3: 'zjrrzecv99so9w3wf1wkhrb29tl33ily4peu3a2pte90c6pqm1',
                administrativeAreas: { "foo" : "bar" },
                latitude: 614.66,
                longitude: 670.59,
                zoom: 25,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: '6j',
                iso3166Alpha3: 'ri0',
                iso3166Numeric: '2w8',
                customCode: '9ejzwc2chh',
                prefix: '8lwic',
                name: 'mno2vg2pjabacge1nqmk7g5f2wun9fdqsuzpdxi221jf1qtccg24bym87cjig3whts8hmvaamwl6qp2fmw8mmyalq251umoj5oi4ezmyzsx25mw2ss9e8c3hf3rmpcu9bor24jysz3tomg8mkwnq7wagaucxg4z429oovvayrm4vk66valuev0bblpt9vwx4r8l4gt6ky64mreq8e82esfhufiu88jcgvd4m9vgjz1j4fkfmome25nwo42mtxud',
                slug: 'wv9mkilaoio3vy9b50kgqc31iqiy7oeol03iw9fnjcoapdgfuzq4lbh4lzqd6jhwgdhz06bwm2b1zxxsrb9u0rl531eagtyiqqz0mdl0awk2g8in4owuc2xtm50nqrw73um4yr2tr9gyr00rne2phtwnkey2u2vyuzii5b9tsppxxyt1ic6ce257imvir0t47yai1pg5j88hqoppa9hvblpb63lv394lzoqmdttfohyacih63bzc810047s6p2wqfmj5zqxbqs29rv3fv56p9uxkdz3t7ozag208geibj48r21c2w2quugi68mswnsick6xj18hkfzyaosdlzhlydh4w8yz0s8nw8j6hx8k55s3i1ahlwgzvso68e09ww5h6dyr1kerdic97qj943pdrf7gh6bxnvxkecepln4cjncrufyj7imxr2zpxiexxj3s78heamlmz82xuq7gxukt9cxytkrma2lrp4an2zg3wcebeyzzk0mog754bl9ebmb36ix9167l9sc0g79oy1xtf8kt4lifc15auzvjugvow7b9eavw732ksvl9r4dieyjz224cs84jcuzurtgjgqxh961x5mtbdzup9vjpqn9hd53myu98u2dah3y5jlgcg25b8wi6nrodxv2132hz26wa7515zzilnvygcclu467t2mhh64mzzlx6gek15es44hd16qlap6eonk2009b9yfmj040su06tvp0n050fwszxwfoa4xpcoip15kah457tea2o45gljdlytq1g8x4fe3p0lvrew22zyys22kwyjvdazucsrfbkco2qzwm0kg8c1zq014lj545qioywihpmgf7mbjacnt1s3uzbc93eu54s00tpa2rbtpkeucn3v9i1h527beq9tbmbjaj15oocbmp9kjgilzlxq5m3aqqkkivdqu1cd7ap46nqqypg28cuzttdidzociyorpz32r5ugm0c2iewt5157f92f9baati7hd71ivqzifpmkr5ir5mzrvq2t',
                image: 'j7ehz1tcwmas7ez24j4q8keualn8gny8apep11nel9e51i7w7j9uw4921oyrd8lf8vprzcmqicxbcma40gvd8dhkkv0h8a88zrdij1rivxixmrb603cp2jfoakac0187iyiqyr7b84o3sjopl5agzjnmsrsm1x2mtgk467xij17zzt1m6wg3a0ncim1xgvylafxxvvntlcm38fgcuk8y7uahzbekwhmfis31mo5esdldcq9q750wqndjn2qko0q2k3ia5d5no8d04764pi6fpkwhplsj510kc080u4pci2blo5wwvv6bowiwo8wfjx1gv611513nw8rpg3cxuam4zdmnmgqfgli09x2vm6dxj9276ezfhm65v1vknfty4o3xpjo4k7iuaf8lgbic3nkvay7swqijewrqe41b3l3vvhyn7jiscb16h6a4kznde6ou4ndr41ic9yxrx2dsb9cgd6sjy0yslcu7u816m8u3xshbt2oerx3swem32sjqfz2zoo5kmi9hb8mh5c0f08ss8jrpomt0zq1glhkwl88x7av7cur540i4yevuzx89rfded7zwq1k5yln8b7fxsdqytzivo0hex2pn6wc86l7ton82b2q82l5vs1n4xk8waaaht1kn4uynfjl7ne1f7ta2v0hbg9j7mt762s00m9e4p4t3gu1k6zdwyia3kxoot7mwexeab9pnm3iw1jz2kjp09kwyydpnhfn8xzf67g4qtcyc2bm63s93quytmdax0vwzn8kowjygmqdrt72omhuundkdmvdh4pai987g53zqat10lumud2o9zdo5wm1ddrhocc0ic3llr0j6r2zcgu0vqn8olkwd5a83q5hsdyhcwbwm05s3howokdog1bg0tywgwpxl7d3i0ulfvcpkbdnkgjuseghfuzxby4xzgyiovfqa5ykud0u85rd1p24pvvewiyt03j14ezrnbcwdjzg8k3i2umwxdckc89wj1gkbn5o7zwpmc3aiba1xp0bvo7uh',
                sort: 834555,
                administrativeAreaLevel1: '51smgodt26pif6mry0sbvm8aewt71rv1vnsgoh85g3j8tp3qdw',
                administrativeAreaLevel2: '77j9upiz6c2ck0q5y42i5419f9zbjikjcd03jbx4hyzj5ehh6r',
                administrativeAreaLevel3: 'o03pbi87uo8hg4i8iraxo1nhwmbt85uryl1cq6mxgpmq7g4szq',
                administrativeAreas: { "foo" : "bar" },
                latitude: 590.64,
                longitude: 479.02,
                zoom: 13,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: null,
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: '6p',
                iso3166Alpha3: '6j1',
                iso3166Numeric: 'l23',
                customCode: 'uqg6kvgyq3',
                prefix: '6bljb',
                name: '9xuwaqyku0dur2ko8jym4bpksijptxjz128anp5msa6oebustt7nkk3p0q5k5aoxrf5mvsu0at4ddoi933hwwga214w2wk2att6ku7yz3hopatbzv3pc9wcc6n91j560r3j518isdw8tu4mwcfpyqq6gppqrcf87lq860t2r339h898wzavu328fxknypmhlil62pf08kkuyhwjxb305ktfjb8w2yhiq79qnb683v7mkboyu2xzkiak4q0pa6x2',
                slug: 'phi0sl7e7f9lluruvuy1rw4iiib0vyo7ghljhot7vw7gw44mtcyt1jc0h8ma7lcbg1lhedgnbw20kg0ebprotl1tiv01uxsva6ja1bpw0c2nfi2y7p1cr99pprlr2od08iqwggt5sg7uajehynoxm0dv9oxnh0vk2a4eh09niun6yorlw65jcpwvz9ht0xcpkq70wipfiriyqdk9wm33rgrq0s035ytwqfmqviyq8hhubzb779axquzyavxfhaifdw4yp4oxet92cn7qzfnqr62a6mq8m5zncpnskmil3mbcpy16n5yvs5eptskzpmiqmaxllrc3ocfder965oaeugdwml8vx18rg2leers4ssu6r98aixphsebwt5sjirlqjv50tzrr2xouxpzprfda2i55t7odyex1bl4yfgfp4oycowsvp1gepjwv4500qvbwrcg6466bwfyjh0gz62zvx88x3zavjz5lgh8zl0gln8mo4252yzgljjle53x9llmv6y6iuef4zedqq0s5e3yqnddfbwd1y5fxtfb2q6yzngbj0vdy55z6wg9t74maxvlgls4fbz7rg67u742xhe2ptg97desvrzre8cx6qui6990qi6c64fpl37okw66fab3wwsn95magiokso6ax22nvc43u2v26cr8lprsr4ivshd1gdxnz863rxrp671ta00b9qlfkwd22nsszi3fu6r7ppkfg87ta939fb79fvsmedt7um1ucgksxb06po1nuu8srgklctu4ysnoabx7arz38gumd6ivd6dyurcdszb5q29ykb5hy6z5tnmn9k3nx69ztr65804tyqrmw99q4lyozb1gvpzqx6rug2vlwlc6594kj2tkev4h4f8jzzhi08mt686bivtrutrdzwkm1umjcn25o74jgxf8wkl9kj5nb46hlm1cph75yu5mviwcodxrrfm0yxt9b83nn5vcsp4k9mcmh6jkvki105rcqzj5j0s53xrtp3rfn8h6bi60570t3',
                image: 'l6xn7e8xnmrd2y5c5bwmzhkfb0a52sy273vkwcw20xtnmpcwgklppvmcg9d4ik60fwkl8n6ebotviczrfzssfinqdd7gmfy9hsn8uz9jkopol9uswn28eoyx5mpn8n1icilhjpd3hla5ja0kqxotw0gy534byl8d88vst8fy4truf1p85g3k43m9pt163euro1slthy3mj8l4we2fuhxtq9b9jifm7a1vxbsz2hvwtj15o4x9qrl5od1ezayoffddoxrir5q5pwd40e4acytbuv1nnqjke65kl5rsvfbpkqs8nbxy7cvkv0r8k6l6p1bjbb5sdhjjf7it0tyt9oq53ohkzuj0xqr2p4uvzcibvvqoajy6mss9bjuas78fc9qkon23vbgfz900l2zaa6q6u89uopgxe52rh1cyvbikhraf6kjbjqlny2gq7qsu7nxoptkgb0yqtf4r55dx4pzo8p416xxjjzsbdubyn0wpydj5dnkssoox1d2pgs2i9cv4avdp031vt3zhcb2h7k5zv6mygl9mg5j6z85m94ifse9bha51hhsq99npeo3atwgenebzajo394iwrdp2goi2qvreldtx649e15vg97qc4tu47792xqvct35ska63fs89xvak1llykghxqkn0p9mjloc9f77cefmd6a5thf78c8kw62sbs9h38fa1f0vyhzcxohfi8xnhybv0crvv59yy67s85tkg82zu2i9hzbwi0krirylwtsfimxj5s7l52ram2l9hrp7zorv9pi0e6q8n7nvl6gi5yoi0kcj9enccb9kdzuzqt4zaaie7dgq2wjb7165s11ukl2jfnhn5kbn0b1aam7mgfhqv8sz1mvga4x4tgizcv5negvpmqto90g9hlmlbs1llmlwzhj74up6zy4xwrnfdujh868u9gmydxu4rie9e7dk9mpz2dmsphbwpmmp50wkdj31z093oacfq6ikvb9fmmoro0cfvs7ngevvlsgvtg2czoqw0ekk0ca0',
                sort: 441463,
                administrativeAreaLevel1: 'b6nk5aplw6bauwszsqztmi3539vi31dqterw1wqp0ywvnkyn8o',
                administrativeAreaLevel2: 'd1a33v7hybhjr8r6327942jhk5ivgr5aj77e0b6pmnbcn1j29w',
                administrativeAreaLevel3: 'bgxiqolfehqygiikc5ipimgsfwid4tm6ldcis5bi36xad7ici1',
                administrativeAreas: { "foo" : "bar" },
                latitude: 971.26,
                longitude: 279.28,
                zoom: 76,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'i4',
                iso3166Alpha3: '4z0',
                iso3166Numeric: 'njt',
                customCode: 'g9zr9cnw98',
                prefix: 'l8o7a',
                name: '11m1s7phdts19drkvn6wjia5e2c4wgkv9j9qbtrdmczi007o9rmhzbexf71hwjkj5nxtlhzwrtb7bd7p0y6isqvx9xi024a1tr2hjw2as1n6ikocbpkfl4dryzxorxl5vvynbvek3ljlcsvmybmrixff7uortwqcr4rrk9wo6flvopn826n05a0rfkekvl1muztnym4nrj1x2twzkw1wv7dsa5y0bvhe6sxxmb6gbpphx3529tvtohlpe1cs806',
                slug: 'e1w7re06mmvclwbgm1cxatniuxp58kkao6k19ewxi0o5b1z3c6ns47rtxwrwfr9m2gfkloi6fvwv81cxtwx08150183pml42mcupo3cg9j0c64opq504jw5h54u8ipej00r9c75ljxnm8a4qqnpdvtxemp6l1m32asjgsvvd5043n9pw7nnhb0yxub9colmve8y6ciybc25zmk4ppfligqwq3v3zvqrnztx5ijd6u0bkdklv1yzqqh4mhyv4qcurjpzflrt81lbl7nb48jf1da4agnky9hcw4ebg1h971r604zc4r2ve65smuuo088zz75ruauoy24pwkiaynfajyiqm038wxw6dt1de5hs3egmhq3fzmvbadbon1el2w94qtizym36qfgy2gcaqnt8eqwiagbu34ko93611zwuu1yxtje4elxe1glfjuuyskhuqk7k841fsz2unlxzczn2iz65k92sg7n0j4nagckw26fziol4bhbc2isg22m72bouo7s1cql8exn8xtyyvtvt02my8rlfojb6epm5idh0ca059mxw8utwwnr8o8fb08zmbqs0cvg8bb2fvenymkii8jjtr3wavr691mtquenbybmma7n5aml2x96vwqz9q5smqdhypw58yoq45hut6ubkhlra2cd46cqv56n2cw2tqaijllwsosnv222wpctyiy7s752j6j4n7ipki8aqb3agbbgzenkr99ffj820ipwvc6wzhl8d6ogm5pbfabn0ah6dsl9w3avh6p38uzvrrp48bjou6r8ao3sxfd6pm3fbbz7k1xokj65tvccy2sm10qfi3px7l9rhb2amxew52vepa5moubn7gxkra05qm6zpggt8fe69vcv8npkzcio2fizivn591e3q1umsp8o8d4cnb03skk1lrjly6kpo4m4lpm6ahqg0p25go5mpxyxknlvqrcdh3rnyfghas8qbwkl1x6csrx9icwd93ad0amdhz120h9rcdui0ygbrwmwuffrt2',
                image: '6vjelwlxtnlrgi8xf2xo640607dzhftgk9j8w0eiimfasjwgrd4xie2au2t0dyeed1u41yji0413uqc8bly5zzo2a6ovet4zahaf77t9004pfmcf9uc5enf0i3nro9gfd1ps10dgddh2rjfht6yubq8sbf5cvj8htxkz9u1lyre3dowp76t49x1idg5f33ydnf8roqtwvqfufevak4gvb5emmdfno3tntpli1xget4iybgbwuuns3idgh67chkwqdan893oj7ct9bwi7qw2u6emlarjj8h8mzjd8kt8kagczptnd7g28zevzk7p0xsbhzyhiwdjt5o8pwk6n48b9ui87t9clpv30dfdz5g8rlhgr7e3wp2ihs9izao6lv1taj2nrw70cnmf7ue4pvtm7nlbe8flqiumjdisqd8znw2f054hjbbxn9xjd059izwdjkt5fk2r87eswc1e9pbg1k423o4o16f0xc353181iuigubbzo2on5haxx4xah8gdh3opk3bey4vzvz4bl0axg9v1i7gka2z44ikieqnhmckkhve6coqttfhyanh1cuk58sj7r5g6uo5e6negx98s2xsj24ruzwov14af7zmgsdatawratbiy9licwy23gl1ajaiw0enz1didxxpkwcfs5v30n27c7xxfy68hkhk3lwlpahn8h6utkyzw8bqnibrlheohylgpm8knqtrxts101fozq5risis536p56uwxyvy7nso8dhae9jajqru6sfsp3u3ehebvi0w4de2j2iqt3mr7135z7qdzpmzmk3eboxwtyxqauro5ixs1rcicb8bpoirbfgh4pipohm0cz00ljyx73d7um5d5tumoqnfrxpmtos7w4no8efx683aykxc0f63qa5lh8azfcc39q4ernued7w362riruejd2vrem749e49v2dag20grf47b232gbz7h2s0ttacwvq6xnajf62p1vcmrmy0di17g6qzu88b1hqec8uul9o1e6pmdg3ihv',
                sort: 836034,
                administrativeAreaLevel1: 'cgu51z6f6kqu5i57oasj9bnuytbowmvn3unw88lkw122ao65y5',
                administrativeAreaLevel2: '5ebi50sci5pdwjhmzrblindpgw0bmp4o7udqr57d4i4tl3gvou',
                administrativeAreaLevel3: 'hdky5lhtk51pct0z389fxuy8zua4l6ti1wxdtj4xfyztsh98tf',
                administrativeAreas: { "foo" : "bar" },
                latitude: 296.41,
                longitude: 910.83,
                zoom: 76,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: null,
                iso3166Alpha2: 'mp',
                iso3166Alpha3: 'xtf',
                iso3166Numeric: 'hrv',
                customCode: 'qa0qbmn9c1',
                prefix: '6nkvb',
                name: 'pjgdt3rqgepu50bj2h901f36omocs3cocs7mb5lc70jultm00q2j2srl50get9vu747q279rc1p7hp2x1hvil64gkrtwvzf7qxasd8ptxu7ojdzbp2vr4fj9oyonpnzm3l68ai9tc6mjjfmj6af2c73l40xuxbmpc0ykhc7bnn9kec6xoo8ysd28d0ygf3bj80ga10me3tpqwr67r3ehqoh2dj0vc40x4ihxhw2n3p9fct26r4g3vvv9jdeca6i',
                slug: 'mugnbqs2i3fidy9xatx2885aes88ew6caqnsm7vakw19j2picmw3k8gdn4whqey5t8ehaiu6jucoigubpncftz3l528ctvkpt72rrfix48d3ywdyw1h1ndczhyewwoal26j90qwpopjns8gy9of8s67w9kk8xelqsdw7ae4p1mgzjo0tcfb0wtgbvfnx9rjgknxpm46b61pcwb2mj20udg3m81pvglbnwet7q5b1aya4nkrso2rgmtmi12xxk4qdvffubzjkxya4qawwl5cpmbfokauc63xrpb67p87f1k3y24wytnpw9ud2bmpx8itgz5wh5kedxjiwqruuw7lgxwd7m1lu8pylgasvz1ij1nn31r628filgz908lv20vsdnasurda5fboov6xn5xfqyig38247vrdpulxi3vmudiay4yc45edf0beoykx9ar20kejg5yr0pa5ep6nc7d48rh4nhq5p7733liyz6fta8wmr1usjn9e1ize7nzf324su6yjkseo3xh9gd0eliqx1qw8e4xuvc0iws9yoyai1ry6i1v9sonmxozcmgs03hk2c77l16qetcgf9xw2827bvs85rmnbvc36vwirs5prfxgyvm2jmiehvg9vpismvlosl2g9qxw512lura7s05nd1c70d2qjk2v5luiffgaitutn91k0biidik731c037k9fddb3i81yw1qkuyftd2wkhrplxzqye644r6r0uhbkkdgi21228nxuj03t9h2nq6orvnxya7q7ahkdtm6wntfxncns5pzhou32pgubrwn6no90nasgobonl5mpdvkla6gr7k2lb9ol5fk5m7z0pegrrzig021j4iu7hmlgz2lugizlkjtdnobijy48fu2mzfaesf9dtsa9ql3s2khbazagf6p6gddzvaauhsday5vn6j2yhtdrb4t8tua8fbc4q8cqc0h80smhjlmdqf7aewbw3hzwv6gwlvgddh3xgmpc79wgr6ppsmxa7bh19tp7f3f4r',
                image: 'inaerxm61ojcrgp2677dyazde2ajzrb7xx32xoavjinuk87b3sw8fmp161e7zqaixqi7eyw5f4gi38rovkp65qcxabwro1uajjyfe7hcz5fq5dlilh7fgglwtlw9y48vce2rpxn0rdnrqp5wuyulsp9x6yrb89gqkr1o63j3gnkd90gafyph51c6wpazrhbrfw443tch6q0pjrpu2s3kn8evrvpgxw9xclbxm9zurldaxkv83dspuq4q6cbk6ipxdsydzcz3ggjcsevpw1fu7fzjvc8w9jwvjgx9swf8ihmtsiprssv1pc15t6gmv2ob1ogdqgelet4ongh08fxmo62qz7s2mbptj0og9d2va48k3xvuvtfqk3va41wdfjnc6iiozu05y229mhoabd031buwb4o4ofw6cypl8fypmqlzkp9bw2crtgb1pmkvxry4b7n16uzfpwa8xvv2baq7fb2izg27zky9awobsxnwfcicxkgzeaqs80sme2cy0onftjmpjw1gaummko9cb2o1fcr3chm0hfyi83pmbnry16iwukzw7iep5vchmj70ej6no57ujwg99b7m3jbs0xwywli4gkpgdnimky9nczowf2yl5wqrdgsy2hx5s04uaykn6wevc8l3n5nbf4rqcjmh758l8xqaandpf3t7c7009rtdcx64n3d9nqvr2q2tnk0xpti5721vwiinoa74fg2wx74gmmj3sb49dhr9wn2q1av4jesgzsvenzxsyl09w60f3ptfamrq2bnl261akb9px91e5dn2rsuuhowxabw4w4cz3am9mb6vyinyu6lfqjeqcvlds82woh37r8bshldi6oqm4ybus2afhvksnl69xdyg7au1raq0t32193ygs7vo4oizapclyq6q17l0zk7yllnkknnyaili9wbr1ezna6gobxxqovor8l22po1t3tevvo7q5kn123tjah4afx3zd979qxlgymjy2mt93594efntbr6z8thz8zh3pz2qkxfe',
                sort: 991808,
                administrativeAreaLevel1: 'ls2bef3zh8qappx2s1k6n2hp4oktjut1e8vezp00rsnvzrhvwb',
                administrativeAreaLevel2: '6h7tvudj9bp6joipx9omx8ad0036qfxoped6ccsf43mtjo5alv',
                administrativeAreaLevel3: 'ndlsp92gkaulh2oijmrk2egnbgu7q7fuogq1i3g6ezz2lxbwny',
                administrativeAreas: { "foo" : "bar" },
                latitude: 237.20,
                longitude: 847.90,
                zoom: 72,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                
                iso3166Alpha2: 'ca',
                iso3166Alpha3: '7wd',
                iso3166Numeric: 'wq1',
                customCode: 'ed15ti5jxa',
                prefix: 'ma2nj',
                name: 'pblimqqmedk484hfkipg31j8l50tpm3thcv3hfe654rnl6rnrgdqrue15tzys20rx2x58lj43mbxtnalt5r10punuukgs31k90yeshisneai4uebmbystf6tv74nnmdg3k96sy17g9yvk2k7mkk8apbw0k6y0m91pp1ux3jzphsblns048txorwhg74rjof76ve1y263un865u85m9a9uygldm33xbd3yncco6rdx288cpztq7hueib8cmh61vi',
                slug: 'xpepl45s2rx7zsxywhwqhlcl5yxv20v627qqlks1s87wg9u39nkeiauhlciayqvlfql0bmkzscpuc74129et12eo8qm8dg21zj4uxqgn8404c92u8q90ntarwn9uc580fv3ljiivtd1ueqy1spvqejxg9nsgjychnddg9xmv812ao2d0rgglty1p0y4nidc95uy8pe97jk8vd6sg1dqs9lsdf912wrd73njj2fbt6alhi2y32qscp3duzptqpnuy8jm2xe7d3bg439q06m1dnsy81oolcmh5vo6pl797w9fqgn20jyia1xp2cvaj1so7fz4g03gg2nwajc0n1fucgpuzzmanetydkerd13mpbytzjbg2kc8ececfd15rxi9bfk4iloj561p0twm419ozarjt19bcs79xp0a7ijf4mugup0hogm6w9d7rqric25wordl8zzx7curthgcrmc9ohzghjaxbqeon17cpphgidw3jthn5rjq8l6baw9wsitzoa6d2twefc9tv87sdh7pjkv1xo2ehh0fw8u67g5n0uj9aomnsrzgcx371oug9wtjw0lq9y2dr63j1mdkyiyniman3k7mz8ih6km8tha8ls53srqt7pywqctcc83oyrtte9fg5xlq0iwod9tffjfoduxem38pdwlzrzty6na18qfeywcjiq0x7tefc7ta7o591do1srohoux6dkpy1u5winh6m4t8dzhiaw4a92qfikuj1ic9r2j50niaqyq2c87gjc811bo2y6uj3muji1gp7kkptk2layr0javl63a1cz23rds8mra04j4nn9x6cqec3uhdnfd1wk4fwaocqvl0al3j4lbt6aocojk5jdaowitlm28i2k9enbr79it9jb66zqm8f5q4d6j9xem9g1p93995jz15qgfjiwofwbc59y44lf06qj2ax0eh240ohk6xihq81zxvf2utfeci06s95w3o8qu3oc77nwdware3ic5w7pf4ckpjkopj7lyrwwja1',
                image: 'de8bab7159ueae0rm5jq2twcy4uds8n7f5t08xtnz5tk9upsfeo2wjip29slsa2gj2culirsw3x49jpptsc7napx9ujil4enjl3x9lnfj1d36tx2zcpwhdmr59orq0gwy83jkuq98dwoh6fioef798snbzxx70dm3gaoxdm87dzeje142fxusmz3rck7geu1joz93r0vijy36ckkuib785g414j11xseiddckjoloe0hkgihffvat72ys3f0xoxduy0nhtiq1j48s70g69mg9wwe5qnsj9ebuze684f1kbdb46vce22u8iov8081gfeapbtfxgcultpjhbip2cwirx0nqlzpsne7j7ek6plovur1uhf6gteea8ge4kjbhkbd1ljs7fj3s69awhioypur4dnvd36ie0549x10r7ravkttmcvltsz9xczowkz7xrj3mm4nift8jw4s3d6cigmt5z006gvozaguabdafu656po6cuivauwr3d5x8y9y4zjjt67fb4iu06ug53lxojt0kue3m9t7rn8yat1ko7m46z7b9kt78ry02ly225m57ip0zt7c0lauerw49fm91v3ajfvhlfexx8xxnoutlxiueg044ssah4315t3jzvhr6028ay3tr2n9q60xj336e67jdl0muihzf5hbyphc1n1cvmlqnsa3g6qyeli8ecoif0aq6d2qpofgmvo4m09p8s32xpdh40f4o56rm1vt194uh7n5tsdb7fhpv50um70rq2agy9w8gdy2pgemnxo01cf5sehxrwlw5jyie2li91bsnnk61l01m1ozwj8r5wv7nlprevomjkj53mrdnpvdcixpqbpepy7273736r1xa2y2g9wz78gcyyniggnfx3wd8hltxcuwhi060rs0i22kc3rgqgr47vierzblxympby3bsfvreimg7hqikpgsc8j7cpqzdxdcy7gcclw9jt0vsl86rl9wozzwt4od53doo8pjuxdh2f6ap77d1q0nvi8y6sdh',
                sort: 647784,
                administrativeAreaLevel1: '9hlfq58a9gj1vu3hj75uife7p3zzqxl9dh6pobuube6qsarh03',
                administrativeAreaLevel2: 'pvsja2ig6di2nl6a3g91dom2lrsumm9r8lj3ynnss6ojme7luv',
                administrativeAreaLevel3: '30e4qru7v9m815zzynpzir68hxgk3568extbavut9bsaigljff',
                administrativeAreas: { "foo" : "bar" },
                latitude: 902.79,
                longitude: 739.25,
                zoom: 92,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: null,
                iso3166Alpha3: 'q3a',
                iso3166Numeric: 'kts',
                customCode: 'bqbce18jsf',
                prefix: 'xualz',
                name: 'wki0hgll8hcvc76udylj18gik3gauip6wy9zthqvbibg2to5orccg4fwceoak33d5bs64hhxtgtr5ftgk0qrnw3s59n2yr7y7fvaquuen06s6wsy2g3bu3cp1xn7rwidjgr9ckjdh8xgiygc4benkp08vvurhu4trv1lx8jjefpdgnk4e4ij2nsetcggqo0r12m4r67163snk4jh6lpn1dkyak6nwdu2q85s505fgcu4ao276ghzv6w33bkkv9r',
                slug: 'jrmn2mj4j0rh4tfavte9vqys7pdhp73wvvfwvyhbovi98ytebmgggsjpanuynjsql4hbnlpsc5ungae2n1c3myfrj48oi6gwylph1x6oae5q89d6j6ovbmtmkh50m8pv04bzahxslpa2oden5prrkqbmqpjvfchpvw3w0diipy3o38e9grwiokhcejwx6bo6zgx8iqufoty3toiup2g4hfh26dl75c7pxdyctf5ent0v2agmh660hj5rrll11g4mrfylujn7y6mp21zpompmzs2p6p18c11rirj9xrwnxdpi3bdyjx6mquufio6gti76gxb0083ni0umq02fd6ss5ewapvbfbyiutewbbujduzbqnybslq8wd2h88vufhiafasem762g5tzkvfeq1v5pn0m3kkq7lvmxqda3wvcfjdy2ufrezvzh5zcsk38cu8ktmsbn1jygnrf5vxzk1asz0pf4zppscutjpr533w5626lwru97ujybv6bbyo0iq9zkm49ua4edrfgh3dz24bkgngpjt7cnxox9egk12xwqxfg8eshnkzxa5ieg11gpadkt1zo2mw7rfngmaieyctkz88617i94v8zysabuucs6ahba0er0kopzgreg1doj8wexnjsh5woah2uw0v99s5pqhevb5tpw26ws66fv13055787ew6q8hgp28nizk9mwum0nctjdv689my1rwyywk7pfeu7afwf42mfp81818345soiwf8nwu3cckcb2j7qqk2etxcjlcmfqpw9tijdsx62jywthhcyju6btwamneaonav449zznfawwcg2tkuop3e3i4o6766xm5t9444cb1oc6blditep7jd7cxqf1i8lh3j5p09ltfx5jb73p7xsg735sjtej2hh0jrx368u1unzpi7ylvdrdohmb0m44k5beb1n1gz1ef6gg2omo97j5m17lytihu01k10kr5x2xghvylpbxs90x1vf98ym87t6lz0d42z75dyo0fc4xqq7fm95',
                image: 'hnot645m1tksc9rlql5elhym7fnucwvfjdr56175pjt434f7rzo58pwsndqnr3th830lpu20xe9oxqj4huhma801kg0excnx0f79kjyadfgrbvc1i7dw4j2afftv54hoovwqqgx67pa9hlic7carje624sx07njp5vilz3l6les352fedr2sc8birpecoala7e6v4iukgenpcdt41cur3mrt9p8d2kqfou657lmamh9ecqtd4rxoamgk1j7473vn5eyijz3xct50x8sz565fgjlisnpxa15hwjfdjqytlddjavfh8cusljtcjfj1f7humou2cvh80zsv2qxvwaedutte0xmqotczatyzdwvscof5ojh3mgxqo9ki69a7ua8ulrkqjhub856lzkiy34tl8bqbyzpw0suzkgebb91g211genyt8psgr5x9myzi966qd4ljh88g18443bfsiaherpmds47o8b71lpcxb6trl6tsypuftxig1bn7lcyuxfxc63xapbnjvy05rw0buphklybd5ecx8kujkdfmw7c68jzdc5r5udktkv0p8w6e9psjtnjd1v9z90abimgqx599ma3c9njef3hil1mmiblgun2eug4sat9iutgqb0wnztjs4txnsks31ifbce48qc9ctt110u9lzch5fp4uni3025ggftybbu4j2ejac09oqu7yjhl5m2tnptirwowzfvcobgt9lmsns6c2xayfgiq05y7c28y6ylizodz76q8ya3f5pfcm25ocloi24viw1vznmqyzs7uui3d1lbk46d01pkcdz361vn8zxjh4hkfw4oisw4u0k8y451i0bjs0l0365hgmg4zedwmxhhhxclvb2qs0kz4nf6bb8ypy2928z4m6mmse5fgricb3youmoftath9m0scrv1ifdiya4m864s3h0rj53xwwhjk3ag4e6e7suvxaqjg10wsjsm5oba2o6l9wy7mh8eukjjtpjd5i82i592n7rhy7hrihqf1mna2f',
                sort: 681506,
                administrativeAreaLevel1: '5yu4btlrtq0hvrnq433nprll6f1hzyeprlkabeapckyiiidkyv',
                administrativeAreaLevel2: '9o7hyenk57ojjn4h0i0rvq5ozmvy9h82l37z6tu7n96ltuyhl3',
                administrativeAreaLevel3: 'qp2n3sc5s33f72dt2irs4w1i9t94sug3g2mgf2itrfq6u2vbhg',
                administrativeAreas: { "foo" : "bar" },
                latitude: 978.45,
                longitude: 282.74,
                zoom: 94,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                
                iso3166Alpha3: 'a4n',
                iso3166Numeric: '9o7',
                customCode: 'i0n7rm9t6v',
                prefix: '5bpyz',
                name: 'cc7kh1fr1v1yc0xkmzotose9ns75j2jtbvpfnl7quhlqtr1fb1m2xas28dkdko96v77wlkam7vrovhsxezal5fomcjn6o592uai66qijk8ec4imthh60pnm130m3vqdmnogbr00712xlo8dx2iwqd7ew3h7tnt25kltazmyzcxlzpjgywpfygtgppmp5wauhz5pf4h8zxe30llwzlw079lhnq0730p4f6h146g2b2k28usyidcxrxwncvrogori',
                slug: 'qrr0aclw7cx5o31fycte3xecj0sqthem1p23m9k7mk09jk348ukcqzv12dlaf56hziy7nf9w3rx7tt82wjgulxohpoukbgp1pbypg9ghikro4gehxuv1vv3oisqamjfxzeilsebriybulh1e7283gsrylt1jbmo6vsymn8a1ikqe20zjwxz9d7z6n2g45gfew1m3ta5vw8juzkuo0e7n64yy8hbuupfqua9p140xwcky10h6b3z3m6fejvtimyc1lo4i40xvm8jbk1gxpckc8mn80f07aylp942vv51fq5g9144866vvftyfysgl7ogpcn2ysuxedl7ynwdm8eyao829erv4w9kmhpzwaccqb0fup84oa0qwz0zyil35zaggmi4nm1ywds1izd2997qp3cyb5loo9tpq568twhvcuil2422ytcomnbpbz9nbvqs3ki2svhs9au186qkskyjb5upod220b00l1o9qg5f5r1s75as7u11b2aw6pk84bobqs5dt8nes2f97u8rjkmstwxq3jceobziz0pwt3ti2qyv2f9l8umj0xqthayrn0c9qv1pvn1m1qbh53msb3dq6uo0q24csuhejelqdja0d9b6xiwgelcgt3fv37ko3lj85e4qanyr7dshfgu555v2xmwmp4tooraap1flxc0ydvsddyru29qey47tgtlt5tuouhjbabtqelfct5uxn1ardqbhkrghv7fzglpn32k6ime1bgkg1mowebxyu46843sjd460e8poujuqkol76dz9sd8sjseswkdbul2pm2bhv7dyelmvaankifnxokucj9ha0nd8at0hrmujurpztzugzcc0u8thjeahr8wx9si6cqngpx0m80z74tbdsuxpbfc941v2gwim5f6s8xnh4fd1chjpahsinigbxd04oawpldw2du3t6k9fdytf03fosh70x2wcf7yr4i7rttjejszsh6frzbamvtnpxrsmnx4idv4xctgcudrs0bbbeqkhpiax6',
                image: 'e1r8vaykesq2epcy8dh9njgj64wu8amgt5wicvq290wgcp6g6m6nmpu919ngsu6fviz74tiu6m4d9wv0ca3665b7yhdkbh41banwdhvyp30yxpyqvrmkh8dk1kupi43urxzc0286qhizy0ao6sbnl79un7glq5s3xqlp5pcmbytfpbnza9nmx5gfreqfbtr6uktaz1vg14nlnu3kdqhmp72ew8137h71x23id3gvsjqpnthe6r1h7ev6xe80kgbxvpz9c0aethwlsqzyw4dr4irv8jpp419ggppaccvcbkch8vhwubcz2t6eq2gbxvfi1lkpt54pva563qev1t26rofx0cwopa9pvhrx23qwciat1eoqksnmvtfyiq44fhndng5mwijk8w8ax6r1tu49kklk5i6qghw9avo3n3k8kn0lufozxnptwiibqw0u0odz0gy51f16k10wav0ypejxb8sza3qvi2ejulryu2h11q7zgqvbi4nfo5v5gy6jfel7wdanm15a074v77l4lk62hhzwtyqi9egwg3c8rse81rpu6t0qofq7dmhgv3kfs9nhhqhyd2re0kls8kxx5zq5hac4huwysmxcw5dld8k7e6d4ipmffrglddwqi263cl13zgbb7ud1z5vaub3b5ozyedb543vfd8sz4489bnk9bdp1etnap5mo94qtgz4zqsdtj252dnz2mme7z91spmeu32e0ekv1btzskxy2kv0p2nski81xpp0l4gg87mewkv2ro9zyogogfficfngzk5wvekultg1g7vonf7wtfmoxx4oegcilingfl94nir3y2fffosf92e0n83qtmj8u4u39daeig7ar1gdb5b520hewhaeqz1z2umw84pp08e075uzku29afkpwxbeewc6i3uzs6loozier3jikumfvdwka87758a55qere7clqd0hujym2mbt1e4wf7l1jhp9ypb0532whf0d2mqh7ikmttiq1c0py1pxtppe30trumnsylsju',
                sort: 563350,
                administrativeAreaLevel1: 'fdbmvs5ka5dm9mblapxct9rqvpeob9xdum9bri0c5q01f12pwh',
                administrativeAreaLevel2: 'hte672eo5zgm6x6fin1ueq7kle66q0onxg1wqwkw5z8vj812wb',
                administrativeAreaLevel3: 'x6plwa5352f79d81jr379ff8c2malq94llquw1qt6uax856w8p',
                administrativeAreas: { "foo" : "bar" },
                latitude: 337.88,
                longitude: 946.29,
                zoom: 39,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: '96',
                iso3166Alpha3: null,
                iso3166Numeric: 'vvc',
                customCode: 'c5xgx8gxt2',
                prefix: '6fa25',
                name: '7nwho8wrspd7u0od1tg6zkwn5aigezbmk9tma934x9qs3gxjdzli8gmek0rp48kc5643ja40mkdsm9hvsw045w85enqocherc3l7374xt4n8nytczuj3uh92rjo4uud280i2snqhmgeyztl6krf01bqyy33sxdh7ioxkofvt7bqr21a1i9id0wnah8zy9e4pyfnyifsp5nmvpam1n91oiw1bafhe1v65tog2yu9hymitzdqcx0i90sqmv6pnj5l',
                slug: '0cfr3pkq4vp45m5s1ocplk7sv6vbcf38q00rmot6zes3g29t8w2wdoqo33u2dxnx4rxcveg0pyr8nrqceyv7d0qum7bmzt8p2mcnmw74wwk3zjupworedhz7d2mc4cj16gap0hgzfj53vm0n5c67jbqqt21abud158bo0rqu4d6wis8qz7nvrdxpjqjw5dwgharc4xap90bdfa6tfqyjzu52clw0n7lt3t78blc32zdpz3t99bqw9biw4uwmkwl4kdjgq0s38e85s72g5utd11oba2dmijm8u523dozeqvrdkp4kdr4npwxig7ugtxez0ovsmqdogppovmikeok31buiqyeg69qpd1ibzt7q2vq7vz3xri05zcvbtvyainf0uxdkhibzvch4c9auvup4k44gg9lsexm948nfowu25dfyw2i1girivd4tmy4e9kyax6r8lhct0zppicr0tawq0w7szpzs74rfx746tyycmw2y8k4rvory9gpgsm6u2prlz2bbu1slhpknfqwnxv7y94h2b5nwlhb6p3qvqtgmucuj0ozyhhu0hcb29to5w821woyxpv5tjdyv4g66e95wilmvgoze62iqocogow2z7bzdzcb6facmkgl43of5duw6npsn8aex1k6fnhvdem65c9xaxfanaxh0pqchwil1m9gmezca83yhjdb3fh8oooozdziom05d09mxb2awndlfuxv8kvn3upu626r7i59s395c0ouytjhkgds98ljab5e0z2onx1m9ro9qoilztf84uji5kh999onn10udb8c8oh1i6959lz29xnairyn1wa1yjsrwpb66zk34g3zvld3si7my2k8h5p7humfw879h63ch25p4k0vt1l3rbypx0cczyhho34kjzr1ox1zo6oygyys1w429woau5ssiq1rl5nvpse2r5se5gaut8fqdvl5hv4fjyqn1ybkmwzf36rgvmgdg9adnmohmt7m681m2id79ukjvffgzquzlpthnn5bk',
                image: 'mvmiso290ruz0k14ysdazv6ra9mrjex9h20ia5buiw263pvh68gdugry47j3lq0o4umxwvib5zor5175dzaar1c5pszm25mtlmy276xv59bow9gh0ohjye3irhh1zm8exghk2ifua6yu1i7z86hducqom6so045sm6s756udk2i03v51jcx6spjutxzj6nz97yoml9z186kzotlvsvroh2cfbye8qgi4uu23ffpyjnoez24dzoi3kllvaacbd0ciozw783nos5mgrddyjcecfqnpw21ro30cbnvsd9f1ygaw5givc6jy6c2roar5nhwu4zahxwmqlagqu98br1iatk50f84ukp550wufxnahpy1pxwu1r6x9odzrh5y76amudkg1ap1yma109f1vfmdkaolcky4xay5zblh1jpr2pasvwc3ii2niif07z58c3ungwdvf0644ozcyysvo6p8wjqeq7t7s8ytjxsn7j5r6gq5a293lslcup88zvgzqwpsq437kr7na8f2f3nkko3l2ygajsw4u6jxy31wn4xc8r3gfsco4hjk5mr3qjibwlhae38j17osjmjg8qtoyti8zj6k3uke3l8nrsnf9g2r8kj5306f93fuphk25xm88750j1tt9x4s12gw7oesrhpj94d3byfhuk40lfciry2yx5k0cb1dap0u51qnjuqzcs2zxevd9ehxmv7zd1k85951s3b7x68q245nc9p0ok0todt4e1f89rhroc7p6jm5zy0kbwzmm7x8fwklrtrqmf7fzh35j8patdcjijuj9glsthndz7815crkmt2mv06t88z9gp5tgprdcch2jx6qbk2ygccgi5y1cegdhhgumjhf8vojgqbifypwj4mjq3ly3pawqcbv8o25s2jcz7eglcu8ewga9bcxvh9xcxt3s0xlkw6jano8qhzrholejzasmv8ypzagc640dmjioquhikkgt3phaxjilhuujit11an3okmttyli8xp6zn8bxtnvogu96',
                sort: 597431,
                administrativeAreaLevel1: 'y8oqhvekfe2roenkw0u6y2y34hh4bfm7ojjccz9g65t7h6tqh7',
                administrativeAreaLevel2: '6n2t2z7mqsgg0us0l5dfopch5rzwp5bhoz24e6ive1e7jpceio',
                administrativeAreaLevel3: 'vri6emsu2kr2mp5qiz0pvjmu78miaoq7gmo4ph1kcu2v9wqnfh',
                administrativeAreas: { "foo" : "bar" },
                latitude: 129.96,
                longitude: 268.24,
                zoom: 48,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'op',
                
                iso3166Numeric: 'oz4',
                customCode: '3l2pn1fx41',
                prefix: '4cddo',
                name: 'cxp4flq25yhvfqg4qvcym4anq2zapr87zwepks5dki7e9qyuypyum41jspp4ls0mazstytqraj4ft32cklohu6klxofronk967k9lwx4a0fyr3g5a2jmxprqoozstxza2744abhx0154r0j70qn8tatod6mn264pfp5pytrgfgfvznf58yehqrepsc3827lfax7jjmcpn9essg3yvc7952x0e8bb40toxnactkyhwr4gfeco12eo0vee4b3ng90',
                slug: 'opv3zdqgjvxexb8b364su77k6dmdavnh4o12aysyp6jaj0pxblztd5x74gja6qyr107f446umxdg64y6mrlsjj0p14irc7gigta8djf8ivacffyyj50qmo968s2wb2cvziuy5btlljlqxwq6pjtiq08e4xytxr31dxnsehadvudzpa38xyg25tjfvb1utm9m0ck5p2rlz8rpvfqxpirkagf796xd0zvu70923tc970wcyvo9pxoiopu7qxuxmz1tobj6zso4k25w8pjk19ik7qfsoly7o6anmw3joibp7u0diwaxqsj29cw4ex9tgb14jsx5evs99v0rtrgfhsh8of4yy9rs955qkyf95aj36hpmjfy5e6h019cvfjct2cns8xn47hlbbcacgdtcpb5qdv3pzj01ur7qbv9zoxzk6g8gfej7js8crjhzqjjtfmvuvm6xfo5gcgslfc09iety1zfwqbr4jyonwd9tikh6r9mwn8krmgcm6yqu5njcoq6tiv84mrtgg04a7bre317ukce2yommg4cuxshr6e180509xerlhc8ptbipvghojzfa38tkwjg7dmeh7c4z2w4l3zqpdiwths346zfb7p2a0xqiklenluit2wr3myqzcgrvqfteelf6cg53tgceb27n17zq0j6v1eifzv81nj7ojzbxlf4ds72eq941lveju1pgflf5pctkmmk2u4j1fvl95v6wfyyj0a8km673zm2numd615w29feex3vyw5c6gs70ycuz26zl00pdcae0nf0mg7r9b2onwxnaqto6wa1fp2p387kutl4kjot1htnddbjmhfl7063z1ctj80kphowcc8onafk6b9j1pbjnwjldr3zq34zu30r284rba7khldwwovu5d3gylrgecjc28r4bnk8of9tmmy0ice452a2n7pxj2caph4td2vyw3y8sx5p3k6rvvb7cj94ygt0nhhkml0ovm8nqywsw5q59d9wc0dy0s0tfhveg6soztc5mkczs',
                image: 'katmxjcsfvd1sssim9jgwmg481ywm7rw7nr5nw0raeopkcnwlbqm79ecclulnytu88ttio85mppm9nio0u3jw6rrx1xcn4ku4hboqwajswjm9zx9kcfzy8azou4bhs5a8lxfz35vpohu7w4p32jvg73n61tg101owky76qsctbfn0itk19egmp8i4hdhtjtz4daafk5a4z4595371lnhfe6gllthlqd4kud189dgxwj9yvgtl7ihk8k82ze6o0l32kr1iu94kykrpjz7utrbxtauyk4tx1n19c9zotcbiel5kyktkvbtl51g9uzowayoo0nyqp6z2yo2k08n45551o2sbwaow2747h19wdwts2gt4e6o9g0njymf0pwu195cm3rrl2if2t165zrxgvc0pqtngqx5fmg7j4vwrduwqb3ydrxsfdvgz978gj792v32nknkz7jgn3cul9nmvwyve50mxrflqee7rccrsjewvax41eve1gcleo3aauzd3oqrey3jtrqpem07uipp458m77ef1hnvvzg60hmip2b6g1f18wyzo65w707rhqlhdctrf30tqunm0df8mzuyygexsz1gz89iepvruxcukudqcuctsg7nnjqhvnbla8njz8q3l9ik9ntolae29wjtz41taxopq00pgpim83pdffuhw9sjxjuw2gflk6pbd6nnu2krczie9sdk4q6o5272ul96hwvb746rcztsvjlcjm0iujuy56oea1xoybvaeq5qw1iccun7tx2h02rthn2nbbl4w22ze0bon4azn8tixdrg0k8akcwys3i3knkgugav5cj7of2dvf8w9cx6rdrveje6cbegajrm2hqw2a273rgnuxbr3bc0b32190z6t2jpsb18bsnmj5gnp7x5rkf6y4cy08jg1505e41wja9bge66b6xs6upn2tx6wnhugc4b4ztpwisc8f7epf3sciap9dfo6sunua6l0n15sl0rwh747qym3xesqk2hp2lkugyk7hwi',
                sort: 901110,
                administrativeAreaLevel1: 'jdrp11whhrl1azyug1h65nbkaj2781gw56zkweleu6jftnc0qr',
                administrativeAreaLevel2: '6ltqcg8imjlbnjy5psrpu9ng07ascs4w815xzzh2v2hveiloxr',
                administrativeAreaLevel3: 'januxcitbv9nm9mc8qfj7a9kifvymf8ihtkcqw84ar4f14lo5h',
                administrativeAreas: { "foo" : "bar" },
                latitude: 267.91,
                longitude: 108.37,
                zoom: 79,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: '4w',
                iso3166Alpha3: 'mma',
                iso3166Numeric: null,
                customCode: 'aslc6fivoi',
                prefix: 'pd3x5',
                name: 'j8wlrgh1vi82adh8jwbo3c307s0bn9zy9470y3c5xii2dgiu7ockwvp97cpfbayvgdoe20zrh1vdopmbwekhikvzh6t8rwkyrtsl2s0u39ddx7iu57vtojgfom9g52zm5kffb5sfebp5ngud2bwqw2eua2w221fx0q82fdhmsqtiofnql9agcsy1ftjfx4rwi6ndccrssexhzxon6ivgivvxjdmjffkg13zrpg6zps8qq0vu7x5gulgyeg15guk',
                slug: '3zh7ebpl2vi15gcn98ay9k6htxiv5ax28ew2nbvm5ncfspwu7oglamvbpq4mx5713dp12ybkzopgyy9a01zvux93v7uzxwo9j3glpxpdlm8oil3xql2dhd8qdutve23z4iex4afe5g8z2hhxgb39v1qwclv8ikfoq9rs2sbm01g83yql8pgsnen71a6av8pucldrtcz39p8zpfmkxt2qosojzos0dzckzwi06vp9p63qcqhijt05xefufom9hdhec04jr3rydc1un1karpgbxkmeibw4egyerl0jhh5pvis0frhmcl7mm7623fo0rshut1y19i6t6j7bpir8pisv5eyg2ap92oiyp35iijg1mtuh2c8o44brq8phch0ogzlaxxunrxjjtgs1ckruyj5purnqai3qp908mt1x003yq713iuop6zczsh9oel9icwmtnlzzvir5zqnm37akdoizuhur6xbftoqah46jjwvfdhxutgkvw57bxc5xsyi2zr9yt69hlgb7yjdblttgv4io5171ryi1e85l7mrmkmmycg03u0gr9dx9qmezbtaltdq9r6hbxrb5lddczzxqvfrgltpdvd8436ick09sidst9g3mphxsp57u99bz5t3o4ct9ifikjmp716nfw069jjpyy4uwvgvv8czlbhcpmuipjqqnzlm6x76tach11ziak0shwsbj08pt3v35x19o8x6if0gofj0uha2kfnpt4mq2ejnxghxsl2prhwh5nz2psndxh5gskagaq0mrv8r0wfkvkvd7oe0ek06p59ikgqvq58fdicfx7svp4bidmnt9zqmuj2x6ndlv7ng0emf2lceskujx91cm4n4p1ej070ahwkevu0hw9nfygeh3uch9y0hlkcokw1gpb6d30vp2ay12qgec7bzf498gp1tgzbz0w9z0yoqymowxgxfzgqc18njvrjgtq6sykkyzwepf3ine9j0oi5l73tujfy3hkrwv8hzeoxck29gkm7o0q9oprzcz',
                image: 'hjcog4pgl82pk6sxaq62dghjcuwnrd0bfj9bvnz75q0hmf01au4w0g5pn4yomg2rnt91pd01n7blot6xc3wa7fly2xcy7rd2svgpmidokpkqw8gshlr1r9wsobpw2ydck17qnqkxlabqgaz23hybelokvm31iw272cc6j96a03u88rvrepynjhnbhgv2awsisdrl649cp3qutm39740q3nup6fs4klv228otuogln4c9axv079ph42qbvsx3ffqin7sepgtvqigpmdppwxl1c3wlbm4elmals9pa4f3a8leuzpoedqzna9eo053ka6xmg5p7mbh3e1jdn32xer1vbg2ijfgh7e7mahs04ngzr59m1scxyod3ko8x7vcihtjt2o440yrft5d8863af2771dkytbsoxtgs07afy9asm35ziyszakst5u4ztwh1ankroouoz9dbdgvajldwkc886asnuie2fqmh7sxhzwukb6ogev4nkdkwzzhtwk2jki41jjyl9ix8r8q891e4zsxz22bqtyk833y3y0sbmnumm7i6b6hmh32mkpaicmm0cvj7p95c0leqadkjtxlt5dere0l9bk7ldgl6maqrjxfflr9cxqa7eg3jubyvqy02hdn0izyfjc0e3734n3g65s313b1rd2h6tm3ht99635qxiuiptjgeizri1mehbcmfcod402fdb9dvqffmgysv50sb3r807d3yfjwtnmb8yhwqhp3vwo9x96zymug93sqpo0pqwhekdcdnwdq4rqpz8tcm6ujb6x4pgso3stwi8ve7ziwdum73f9thz7jdzaz34le5bfhmo72ro5mpj67l4qk51gugrbuha9gi3ja4d4xnd5sqx2vnkbxqyl6f2a1euo7vy8uix2suvr9js39x0ytyjgzdpeb05ntzkzikmfn8ewby3xhmck346pkqul4mqf605b40wff288l79gqj4l1gezxpoh9je3djuqmo6lxvtw19tovtjb0bmcz1i2axhuuw',
                sort: 770443,
                administrativeAreaLevel1: '8j4gw8lmpbgipzr1q411dzkfwb668cunrmexgpwmj7m12h0tcv',
                administrativeAreaLevel2: 't05fabg02ymiyr1m3euoz75xrg5huuqb6jh0mo9so8tiic00ia',
                administrativeAreaLevel3: 'tqe8q3g4mw0dkr0w95235vksassh0cio5pu3j2q23h9uvnyyr0',
                administrativeAreas: { "foo" : "bar" },
                latitude: 245.68,
                longitude: 152.41,
                zoom: 26,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'a7',
                iso3166Alpha3: 'cru',
                
                customCode: 'lzciw24ko6',
                prefix: '7121w',
                name: 'z75u6t10uoiwca0i4v8ex9ncaa17jpuwbh2j90b67vuu7bf0c845q7e6t0x167y3y1e4hgtc3idjx310zspiegftc7ggckalpo8djbfp5mhzxnoppdjoubbr35knw6t5qzz30x0i5f4q0960s2c0srta32ghloo3jsryat9cx9f1g0lzrjdqt1hi3yiiee9osyhpq7ix2zwbqug9gp5utwmzi3gam36pxv5zbupjrweum6x6iaf9h76x7tmj6l3',
                slug: 'od4dkj0vlos1xf7kyv4j1sychlbvg2jkgtqzd2oawgn6ft7ddji3yzgrrjdwsk19i52gbqy458szmdw0gdpcwcvpwumwqjl8px0l0ww7hdziw38ka84skt3a52gbss5ix0dhas3p4mkvllmrgyyuxpb4txr4cpxnpt1axqvs1z6xr12wy5v3959erjfazzmxbq0wkzhe2lp9dmzxhbqlng9xc49bgx6wslvn026vyf3acfb4586rplea3to2tk217b4dekcsfgu1cqspdy9sefljmcdxl50jiwypbilhz1z00eqk2dp9t1rx4ts7cyrbs8shi4x95sujdkrjccse4664i59emqfp4tuyg1fadnlbvo0pw1dly1k6an10p9hdzwelw33e3yyb541qwdu5c55fc0d30mdygm14wn95zg138934pc4s6t2v8wycpc07u5vejkbf5hznbxp5aa5s8y7rwu5hujm2x4k3ui4tb5781ivibvka3wfs22kkc34z03a3mbbp6s09yc2q6jtz33u8q1nsy3mupgbcek6kn8anl0qv87umtpgj9st196m80zqcmqd37v6x5wtuh2e4350mr1ovi3g491ijgc9ri2y4xf938ff34icrvhfv5w85kpt864h8aj90p2sie6ukkqbayrdvefcq6wvuici4jki0qj1o76eqeml5jb5qmlnvy0y9tng8my6ck6wno937s2vlpu291nwut352vzlahcprtxamkov2esvpocykchiel6hfsiiacbix9z2yprbsny24ycqefcbogsz5gqueba9yjah5c7uxfe3f11e880bfxa2e34cs9teqtm0rdyt937wguvasouu4pm8ne76come92rfrw2chu4isujl2reb00dsfh6e5410rnvbihgs2xecg74i0w1konjpr5gonrlp9q71zq99fok00z7684egvcwmgk1fdjytm84petxls8pafe88uva05ooov1m8162rsknd6i8v6rxpt9jcaum7z',
                image: 'so6e9icc4nyjqsbhwhcftj13fttk3jqfi9edns863zs02rtclfuk8abiny35b1lxw4ee4rj8rpwwcqgqy16x1i03v4dbmbjyfv8q8u8z8pkyhs8p3u3voo41ob35p3ltve2jd1ca7hico6le9z7m297wxhf9t63oobl2166909eze4z8e5mjs90j9ywnnivrj2l07uassmk01s536lxp63cm250gdqhuwytmxqor1bwkb8xp3ttnyyql2uysua2uro1jqjdzf2oahb9nqqbr2mceh1iiddwebuk3f9cuxrrk5lm7auaqlv3lu1rzvzf2vesm51ylf7j4ek7636llkx95x4azo8sgx4t6zbgrbonc5okuz43lwifag2cmgz9l7dmqa2h2ykm5onqnvmd3d8igqcj07n06mi0y0m9e8yoapxv1kjjn1g4dcncjz6o4f81slzqj576f14dzv8k0egsf5vw3rxq41d41v7loq2wolq086ig9xd91krqi28yxrtsl0wnfnlzwcg6hczbj8d3v1kiuywvvb4d3vugsmey1kam5txtfsf3xj2bmawnf6oqp44hlfjqemt8y6mfk77kgivvx09xcoqg3qjo0ije3a3jvnggiue3tcvtgqst12t3r4qohav5hwz37ngvvlvrorlg7ej74muwxv6us5hub0la5m93yz5ibcchmg3ws4j7sh7m86ss2z6r84qhep35f5vji7ctqw67tc3h1kzrx0r29oyum1dmwwj1amg977u87pklblbhwdctdnb3fq3b84ubmjqm84qej8y7xqwcnruvh6s00x57swtw1yf3yehnivhfx3qmln05jxhuoh0gj1exhp9lkrwn7p88fijpck2t7bz2urwi4dq4fi1t53bet7jk8lkznpimifp2p51c2ldshy9pfhj7nu6finwrnnakj42xpviggcj3672lvy4dvgumzy21bqqmg3eti5gcypeeb31nitqgq3pht39roo13g600o0k0gqsllzx6q',
                sort: 192941,
                administrativeAreaLevel1: 'g6mkonw4hx1tztu8aq8vr523op4xh3ko4xwowswgmt0wcdxysg',
                administrativeAreaLevel2: 'fif2pv9dbyzry2e0ebtz2no784b2k7ch5dc0o2e6ks3czy9wwf',
                administrativeAreaLevel3: '33dkydvubl1ikys2esj6o2xn8bvuknv9jq7f33rvxdsfcurx1a',
                administrativeAreas: { "foo" : "bar" },
                latitude: 121.44,
                longitude: 654.10,
                zoom: 92,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: '5m',
                iso3166Alpha3: 'oou',
                iso3166Numeric: 'whu',
                customCode: 'kvwx74ljyj',
                prefix: 'vzuzh',
                name: null,
                slug: 'tku4cnmgopniepbfzol5tj4kjt059aqyjqdk2z22zy1mtv8bpvff0hhmvagh3sjyz07htdc5j4ai7jwfbfm0owl8x0af43dskr8557tz49bbq5me4h6q3u75jvg8sric4eih62dh5whjrffk7xjlxc92s6ofj0kpc4vwwrw744lhtdvbof6c4o1tc0lg3q18unnp5cy59whlvrqrvr6ornxvaytkpacfxwolm0g0iep75sw6fwgskcmwqn4dm4vr8tnd1xk8wb12hxwsvbwy0vg1k2vnjve8vm2ycavx3vd6ihzoekv72nca9say7oi6e5d88ug06yns2x66fq1i0kz1i5vkxt9d0e0fdxm9gkfgb0syab3u8e6jpczgwvn0wf0n5655108xakrya4kuco4fuwo4lcok023fs7hunhwrc3aartcrushhhaqktpq9d30amo5ti2eilln23fi3euqaecs0fev1351dalskaiy9tjgp2x3omcxvbwk3k6ak1u36tb8tch982xkb3k644ad5qadvt1582fa2qpafjsbknm7a01ltrjk5iz3bkhnndax4rni7iafbauxobxir6l8nq27gtgby5g6dzkxx0a8bu6zev8bv3i3sv9vscadsk435h0tqatx2z0pnwnwmtm2czkebhlpxpuzxv20vc3z9yxcv71apiig7vxxyeose6gzmr5dcsqzt0feq43zbqta532nofgjr52k3l1xe8mj8401wodox4emuo8mr0zyw7wcr97xjnmvx0lw5xe90zn4d7qdu69x8v3l08acqn7h12kab1o0ty3obs49ldtvxf3ac88v388la73tuzgzx75d94l2r831gbzv72mx3hqvgg3axywylbcyf2aesglyl5kdtqa05zs1ql235ah3qwixv0t9v5sb21q4p9isk1oo6rsvgii41bti3aw29m2vt6vl4jv4oiwo1y00tvrqcqgvbolbcavrxouu8bcx2dlq6sv8gvwhyvjmz5yzu5uoi',
                image: '12b4fgrdg62336hqrjade8ga18oyzggdtkvaqcy3kl364p2mgoqs43a7kv63v1r528gkqfbslftjgmf6scau47n7f696o2p7tapi42fp4grvcz807sy63e26e5xvc22e776n8526b2f08b0ymbc16ts3k0b5b742jshpmt466cz048vr5uh2jr5wuksxbk9rdvct0rzcxvvdmrijmxs8uuj2n1nv1zv03mes614id9y724s1g9npm0i42x1j4g1sfqws1lkk8r3ffg9wrsfe9ucf3v87pee1rs12kry7rmfmlin9pu0s5yls2sadz3byydbcqk867a2kjueotfoka09cwvpit2d1swq1upfmj8k71jaxep3varc1udhmf18f28vqj8xton4mbb75ntqu0el1rjzsx1kck4rl2vaolhv58mghg4y5tswmhn4irehmdiq2aurr7krts9hhegm3olphbxohnyio1ddnrvzgpk98zgw4zp83xmywgqh8hwm6ompfoutoui1mezoux9jberg7ru61t4y690ywb7fq9mx8yz4peewzcl94qfamrvzgky9dbfycb28h87u06y2gqrkklv4wr08u8wei2kpq4vyal7c6e1jtoors4ywclz0xp6yp837h3w3gdlzjnz9eekl1zj2kwwc52jexl8kpd7l2wilo4kdm0q22r7ix0goy465atkwodaurkohtorubocvofiqlldulrk5iwkfk2ym78zn0aamxk1a6bxkrp8t8w9n4g0vsumv4j2hxh2yowuolohgbyotts4l1bojvw5xmhi1w67ih1bo2ni3w5c0yiw27rx056v72fwh9usviezi5v87cp2sf14d81e366logrp8nkz2cfuq66zejnafw88t6f70zx6xce22aoo5kkhc7enygpll1isq4m5y4gqh7ne43b9c3rwnz6941uoampsygoeadwjbxonr4rtfpzld0wg3zgmse1974eihr9kykt0yng95gbn8te686o7s7',
                sort: 577784,
                administrativeAreaLevel1: 't32n5bjuyjrbkvk6eqr0hjb5xquj8c885b9vtd8rzt14vq1lx6',
                administrativeAreaLevel2: 'qqoixwp11v212qp6iyiirn4w6wjv419hr2unxr20fs3kn0wv5n',
                administrativeAreaLevel3: 'km57a61f3snrp52x3t70eot6nrkw25hu2a9mrx7yyk50g6tvq7',
                administrativeAreas: { "foo" : "bar" },
                latitude: 531.54,
                longitude: 391.55,
                zoom: 44,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'lm',
                iso3166Alpha3: 'nji',
                iso3166Numeric: 'phe',
                customCode: 'c53eqq6y2o',
                prefix: 'h1223',
                
                slug: 'yiydbvars9wtkceszxjdrc0t8i5bn0qo1tgefrzpmvvd3w89m8h3nmwjsghhujctgdaxzi0gk1ueytexef5fdwvan92i4o3xktr3dcmdp3fls44m9o2smgexpmy37rkg2xiyf1ws0856k9g9y406vl91oftfop7s9ph6tx0dase8dw3ntsv9euo5afff2yhopawxkjgdg1pae7o95xwsbqkky3whbk93682mvpusm1vmc6tenn6ueis0owv04k1vt4sk186nz44jxhg1hz3b4ori1kiyepo0vtabprsz8ep2jglbgodxa1bsx2k5vfh28bylxzqeymv3fccs25w6y46q1qory4tvo9knkzvwlgl003cdr06krxtwcq2s8xl2nrambs5cfk2h4j0a52j8i85tzz3db29cwfkgjg4q4w8q27qsomdk7e180vt7j4fi6su9lpwhzyddrrt77htf6nkp5l5q519bvguoz3hevyes8gbk57xj4v417q1e9y4ivm619bk5ou1eoodw8ohn7krumdvr7jxu0646ec2vs373t8yoyh5q5qs5qkwa3njqdq0v0phy9raj2moloi671yqdgu6zk1n94bcidntguneto3s4py3y16x5oavmpn2lg4ub3r49yy86kc67bsynx93qjts31mmz5fq35t5kkprz0pujoch0ud5qzs94t4axymjeqzjnhpak46b9q3shw3dacondmtiwl43gthkpye2ywvi4tfbr86to8m0y8e2ilp7wmxsnn6xdd63cib43jiid971245rxan5pavkywnx2pllpq2vp5mi2f47ycdo8hnj9iiwn4w4ucqb1z6ni03453o8gzkvgekn35ui0z53pan28j323vwoen5suaohf76da8bzz68bxm9jea2lq94kmm16xvjz07f0ypzq7o93iqrtea6rkuelqfbvfl1mjeazlxp4dmzz6j3fh8pytbbxh5x7ekpxb7zxn5y89udy7934hkx5z8f0benj7er34',
                image: '46mxgnyqfw9an7xu7kjjjdzi38hvewoo3jz9j6w4die9bfogbza2kcxevww5p88ysux4ojng650t20xowohc5t7w33pylb5waybfr0kzr2ow0781btighrkz43pqwmbap552xgtfsg4p72kv2abgtrk94rref6ap935f9xklom75jshoch8xa7mj6fn44hlshkawppy4s7v7fqc4d5gy6a0e6ufo3lkurjjehrgvxs4z2szkoethfvo1jlb2017mhye7tmyje0dfyb2hcbrte5olpmm83nvo9mehwhf7uafl7f9rjq6vfa5ea1f70pszjk3hp2chhycb0mqgpa8ur04ba3lqh9ki1o9ynkf8bwmq3i87hua50ecnplnockkenu36q8awm3fvj9le1euuwh3ma4aqa00mur153vu3ic8t8xmtkj5h7p8w4qqll000g1h1rk0ksltzsvktgduihzylffb9lff8xg9ch52t6wd7thi1k6htq1q1o5kx9d0l871o28rudpsayq9wn6fee9ma5nm9cs0j21l7pfpssamod2fsddjnnnnkz68fajdtd06xvx75eo28smzr5wrjazokq6jrmcjs8d5xg2mmogk41pc7p3h4gcvglzhde6dx9zjjt1hx9gy21hsnrei7897h1jyeordadt5rr18ui21w0tbqiuv19qlu4k2jy8171at55j7my53h6xhoq9xtwj96hfiwmrts6p2hkhakoyysp563ewj1hiu4rhykgglskkv3vleu0ml4u4uv8wgh96ms5i58nn4aivvtoljxbkjslqg3lxq2ce5vx4w0lguxdp29itgqmjr60nlom4ddwvq1x0xrt9koaxg1a88qh1lc018227qu7z9t5qgm9db3dcs5rxdi4nh1e8w18haeq9fzhndz09qfaex2m9pvdc82r3zuopk2yt61xwrs3bc5ruas3l0wsd5s3m7imuxa8t9n1bkdbpbgu2i6skacjip32e6fcxtvpsmixnj2c1jb',
                sort: 819105,
                administrativeAreaLevel1: 'xrm1p9nb9ap4dlpw3vjrojxebpx5cmaw5wzduimokvi9itq9g5',
                administrativeAreaLevel2: 'i28yzjppeh182ccefk6io4elgvf7z0v5xtv06s6at6frbuogix',
                administrativeAreaLevel3: 'rlbqicvpg4au5vp9owsxye43hhqct8reziysb8weuo54hyqezo',
                administrativeAreas: { "foo" : "bar" },
                latitude: 55.79,
                longitude: 661.52,
                zoom: 24,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'do',
                iso3166Alpha3: 'toj',
                iso3166Numeric: 'xd7',
                customCode: 'pesos4fzlb',
                prefix: 'wzlh6',
                name: 'vwqfqujvyua1vflxxar0926t744yc4jnwg8g5gm1lacoi19s29p81s9dp5knkaipp87hmakoi7uvbiq8avae9yhm13hm297ojbxoao6ud7uncn2ae24ixv8pj58mg39qarljiad2qwz48gxybeqbjqqx6c2ey979pqnmiycxhy853hwvdstiws1r0jx4knufs0j7f0ndmrywnngf766l63oilhvxth6rh3cxt9zrfslh5vv00wc1n6cxa4bvdpb',
                slug: null,
                image: 'r01fhupg75ignnents9ma7z7ubv3r42yo77lqwq05vrx3eo9l66p37huuqb0kgclxbfbsp2syc1bxbzl40ily393illfh6wth9hr4zy2scl0t1k1iy5vgvjy7vmx58l8t921hk1tsb0qn8220ir1f6eav57d6e5o6kmomg2mflgmv0i881reqbl2lchi07knkalmf37s52llfiok3v5iftbop6kkhcale7ju8sfcagtpauzx0d9p1o4v5xcui1tei7xwxcsqf0bh21yiwgsenxebst1ajrt298jo9fiujlbt4xuvlm4zgpgz9tjirqsceibladb0k3fjjoi1axtjinmoaapcvbf98m3xbp4ndistn2obcci63lc5foqimezprspalhq3mujx1qvw1vn5t3xvjs77686f7cmlc10de5oc42q9nyuwkzwqx99xbhv6efo86g2s9q6rnf4xaasti77rl6bw8jo3dg5jqy471pfrst5bu32d9s9my5vwbhex2rabjtwuu8266uta9elhrr4nmk8azkrqa90qnil0phknmkc0i47gdqav9ye029z6s1tv9up2cnitucou0cebd3ybe64zv3phui9xq8iw81qw6qmaqjdzjbptfgiypbduwi3qicjjfeje5mqdvb56kxge91naji09xz5yx9srv0s57hv4fv8tumj80woc5ep3ce3lj40ofu1aliqik0twi8ha69xmgg174mamtoq2hhgzuifbshltzff20fhiec1ej8vudrvowrfnjy1bfmslvsuyz35tqscaoo2bpxdbrz6u661r05w2h5zu1iv1iq58vrwg05bzqx62sxcdax5vb4q12066yl1670fc1gdb71cfinvjc90gmfssbivd817ddj2ro4ek4k8ntbha80fury9zkdkbcohz859rl543qlgszbhfumhp06pz8blm431ov8gfu5k5js7juospwgartokedhmkyf5wumvlxymhlps4xttwa6woljg4j8jvktfx',
                sort: 118778,
                administrativeAreaLevel1: 'ctnzmnwjiqazpwchekpzhzejlw6c9xk6bkq2kaby7fsyllhez8',
                administrativeAreaLevel2: 'ygxsr8r0d8dsm850se8uoyatcd9kmtpcykdsx7h0dl02kh3u78',
                administrativeAreaLevel3: '2vn0wa0c6ddmbf1f9iqwxtv74j1j9a9wqtr032c2xccp6jneqc',
                administrativeAreas: { "foo" : "bar" },
                latitude: 490.68,
                longitude: 601.78,
                zoom: 36,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: '5w',
                iso3166Alpha3: 'xdc',
                iso3166Numeric: 'xd9',
                customCode: '4iez4lurd9',
                prefix: '4rjav',
                name: 'wbgcsz46yhf28mfuh6hwmqgiowfwiv5hbyvii1jqsreclq0l762frysj02xlarhibt5lo8ius91sfa99c6v9dzc0lh3dspuhtzm5zosel4wuwnurt3q6znrxvh9r23rpvi691ou50godsypkmed8h8s7dqjhe2luueatmspzncbzbb7g2xgl0cygpz2l0sy6n9s63w0s1d6p9reb5imq4z9xuldq1ig40gwxvsdvse7ou1iiacusvuwchij07d0',
                
                image: '3xtg49mqm86dyvh40aqog1wpr5w20td7h9dtjq3dptdigpcmke3r8hvj3a1krc53s7so9dbya8n0m2wb1irqciwv7qd62kkckrvh1e8vpg1bv6r1q40oe0h00lagndg6vnuiysya4z3e2xqizw4bjpu3noy4nw6jh69d6op2ypjhp6igsmlls8pn3tckvuwdb9fgyilitv6uho3d3xdx2ik5v5brjlwpr6tr15dw8lbiow0r4z2l4z0uhrojykv6fvmq8pba99irk3rhgousyje36218jacn4jexfqkcnscsr37e4qahzvc5bj5bjin9kmrwm3r6a1oacnz5k2blzzlz5a601q9104ry4bpqtmisr98qq6tvsgitgnpuabf2q80tmmnftb368039r2exqgx8e4dnp52eavq97un3vvogx86p44f5wx3gtq4xrf6lhnslz7vso0te6en8cu4yanplk8wt483j9wtwx93nug8gm8ro17jd4m0l8w24gjugsu5w9zg6goofuxm20kee0lei47ebc58kgd2v74en2hn7gbcdtilpsgkpy5xqmnfgcwjc3mk5n2qjvy0i93ov8iz920acr0sf6a0zk5bi2bafczbhc47ftq1zifkzklrumincuadu70j6o65p8u667cnelcrkueeevlt0rmu0ig5kc5l8gs66ebx9uyo078y2yy2gi2mvl6txfmu5t6k9lfk651rr7qce377hfah0or3d1ga15fh7zuuf4irrv40v9z72j602yf7altfb0tkwf3jvljxoswnrqcltkwlg6a0hq4iibqch04oihg2jdtt60fw7ag8dzdxyjesfgqwiskg4ge073con0vg3vaab9kneafi5eke38b4l8kqoibtmxhjv0kvq8rsocpbnlgqb6nkbrmjl6lvm7z16st8r4e07joyftd1edyhjid56nukib6u4ujj4l07ob3yspszi1m7qti9sf0sbjv4vj8ialqh5mfx4mmsnzutc6melsgjz',
                sort: 567815,
                administrativeAreaLevel1: '6uhqplx7gr7gw8m9eoc3btcifygisx11cbnhu2nz6i3p7vqjtp',
                administrativeAreaLevel2: 'owzdu5p0tila3nw9k8ojxsj343efop5nrlss99y7euzofhayaj',
                administrativeAreaLevel3: 'qp4giqs2gyfa3doc12humutah36j7757m5seyl9l8vm41zk2dn',
                administrativeAreas: { "foo" : "bar" },
                latitude: 941.61,
                longitude: 135.15,
                zoom: 88,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'qvtc3wevridvol8m6kjdk2tvum7ifqlz4hc0f',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'm4',
                iso3166Alpha3: 'r5b',
                iso3166Numeric: 'esl',
                customCode: '3nl20c3i3f',
                prefix: 'hwfan',
                name: '9j4lzasll6ie5h1goefddlhx421xlyim8kzrrzt6c5ln75cu5svuoch2n37zf4rph9ddnyjleq6jor8vmknjgs6exdv6i8vypjbnsrwpjz2jmwjluzay43yo5rccgmf0dkxid047c0dm7yovvgn9vm54gn5jna8e985t5wa722j9ja0hzryb0g7nec4gzy8bofsoruedutisyok6hsx11z841jdy9bcxfpp6kzkyhdw2aop9lf7z3wi13j9aefn',
                slug: 'tjmdjgfezjs3fozgi3h944u8gnyn8a765bquu57va7ny1qr1s9yodal4geymc89433be7ozvll0qyzf8ai4v69s6may19j9huani7mu97zghksyi1enctfcuhje1l3mzre2htttdffbnkbfk89vbe3jlsxjc0vja1pjs6xrhq4f19wtheqhikikrhs616w8xmqgh7f5watzsfkmar936u91mbum4sk909xmdvmmwsosi4yrbc2xtry42gupq20rr488vzvxk9owvhpe0hzkbr7wefx6ieyeyfxv9qwng2c354sg9i5m1r66d9as7bf30han0399oul9x9nns4t6a5m15r4l6mthmuly3c08lk7emx7jo6nmmeeto7vx9e4c1a1z2qcnhhlcwoszhq32xmiwsdwk8tyoczne6wt7f34aocf7jclbhis5xs25jdlii9uuqwgkt2z55wq1eadk2w438jqswjwncgna2blcfc896460jcygctqf7sej7max6ea4sqq0i318ybkmk41fknnaoj8mva8kf4pjosc7380336n76qedoa78im521nxib7s63bhz47830hm9xm4xeea447r302c0ztfmtbnwid3ipcopm88hodlniy4g200qciw7ryqh4064xwq6ochrw0aytxbq399hqvbks724f5ubfmo533ae8tzzijh7r24ymy7gvu97tqegswpiuukwn191f0si0btkiqi9gobqycvz5crc2v1chlpaib980gc2gqs9yjfei1fq05dr1m2boin5y28rtrfd820uakrv49ftr6yo5onknfwcnwhcsb7rk4r65xoncixp9ostghmcf5bo02i6xsu8jur3ssz72s72kstc4s9zvdhnb6puc0n5iyab7rjn8ckzlh4tsimd1615logz9szlhrg3793fsrp7i1ryx40qcyu7ez1oa8athshgswasyv947vapqbzzk365apnsrhkyj47mqvlr3w35myl6ie9b3zm5qktr71yb5',
                image: '0irm00v06u0z7jsq2lgp8omdb69692vxar3mjgkwn4u08f5rgo3dzutn5fp7trt2ass1k3fmg6uj0v82qoa7n0bh2n45bvwloyzd60rpvj284sfen9156qp0m164yg041fm63krh5g695wpi5hy5b1oybovbhei0obfvuzczryxjjg8gmqjbrjdodsk21wonplzas13knvfb8hwvvt41dtrjrexlw0qrypmlb541wh6i8rs00qldyd743lailim5wnwqtokckxan1ew96fib5636y4alks1hnxdt0eu3f7eams9o4y1y9tbfoozoujcpr9sbaz5a9yx1aexhti7rq9u1bk2xieqpvo077ke8zes3xj03wgsvh6yqhnsiztueqv7e4puy0mtnz77pqftnxdjj3j2olydqqe2emgah46ivp4b2f7w86wcyh8lfudpflyr7hmtega2nrcywp1tmb52i6kqxlxtdfkvhcqb7qabnxl0fx7ervdeq5cztiv4txu8o825pz9hypy6hxt39xe9kzf1pg7hp2ljtotgiqddwmemkmefr0227ux10fqk1n1aftnmtscbz14n907d57rhiz15qywpn88k0gzc6y7c85p8w01x2f3nev34fd5icocb01z8z75cu2bee3dygyznhzffdhi9kg4mujbk72asr3516dyuoz60ym4za7pq9q95v3c7ih6b6tcuf169ut6to5jlpu2miu3yh8nrp9rrq2ukwwky4nus2n8xawmp1ozpjjjzrk1pmliqjxeafb1uxpnebw2bmjzulvdwx4jcfzyqshfpshsvffgqvo0xohbchr8qnzk1cfm6rbpp5kofael8pnh3bkzua5ibibm2uwa7pj3mb8t8f0wdyjatvfxe79c39u7nszsvxph7qb8pbi9lzi0pvl66z3tb1pya1rntmu31u9rnrr6b3yf2git3un1txpllpxf6yio2qe31vo5x7002z8q5bsqdzu9wfdwkun26k6vgp68ncehh5',
                sort: 207313,
                administrativeAreaLevel1: '3eaityg3boeu51mpw83o9zywjw2enlc5mj3n619j9qntrvucgw',
                administrativeAreaLevel2: '827x5unnqchgk07qfefnx6beuodsf57ouvdlzkodfg4sn3cpcm',
                administrativeAreaLevel3: 'qojondajq07ql88yr8gjtmzvgmki5f0he2qgwxjrd3dfho697n',
                administrativeAreas: { "foo" : "bar" },
                latitude: 666.79,
                longitude: 254.32,
                zoom: 47,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: 'myu4q3odk1dbyf8nnx95sx32vuprmblw8niee',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'pv',
                iso3166Alpha3: 'lua',
                iso3166Numeric: 'zvi',
                customCode: '6tk7yib249',
                prefix: 'cw8ve',
                name: 'r5kzdzvr2h4q2eujg27jyxtmcek65u3scj32r8s96w69oym0bqiyaqfxcgt4sk4x2v7odrne4ptb8l5g2uhd76b7zkgz4zwjqm09zbqdoqsodppuvy0ap1twoyyo33w9yoe7w4nelt1we2gq6e6s3jsp8fm70tam2vlsgven9lv2rxvh818jn1dzxuwmb59mt3rbd2ktyu94ir0hcbbbtzhuoz4n5edrvua13m0axnrvrwx2von10wyyibxn2hy',
                slug: 'g4t00lurjza6jt74ek9whjb0wflzir318620v7098rxn7kvaj3vsb1wk9rhfp2om6glpy3hd4afhpbv5bkz6ebxrhxdk994qneyrrl65mncr9xwqzhytuwbc3d716ijp10379xoltbu9o91ru6mind41f34o9sgjuagtj8812925iu61fj4h0y0mgtiutyllkuzzrm4vncty0clyngch5z6twbivcwzzcblc3593g759k8p3d918kgicponay07vgk4jdnfsbiqjpde1rhy2tdaly6qh4mzmbgv241eawag2oa5kchtp1ho7qf447ucnb9pszgtmazg3rjnxe5keb7vogax9h8bexhjzts5zbk79rtl59c3w6t156x2yc9xj58zuilwiwex245iusfn9xwfuuw1m7lhcoj2qed6nuawt0djv4w3k232yfm74fek8merx0noqfgdse57oh9yrncsr2a6uz8p8z0avy848n15kus8bd919bpr38v8mrzhwkc79cs8rimwwqrklfidhu4aaeto0xaxxlf373n4buq61i0s5chvcacnqvzze7wkukup4c2k47mwog93yqbqphx9h7iwlo2bbn54ir3b4op3jbdgjk3c8jl1mxu71eg0zocquvp92ok3ehcoh65qusi4p8676v3nzwlcy2mawb9lrdin47wlzev73z1982wjgmm30zsyvxtmnrqojr5d21ssu350j1pdckfk158t6bjco0tvs2ledbbtotd2ersbznw92qqgwzdv2kuwzljahj3zpaqq9oyzfk6f9thfyyl41qmo5f4146y0czq67ypjnfsj70v4y0m0mwi8g61pdx56z25o4fig259bbbh4jfpabsjovh7wpgecv6tq1b3kpww1b1dtdmceew9jpo3q3sl61ui2rany094kjjrq32d4s3z9qwlp42imodstq58stizmzovceih8heqci10eglwqe9dlljoj4a0ep9s632l0j1ygo5cae01wli766p2nk',
                image: 'ftguu6r488qc4f8u8npx15ijfxg61bjt9wkhvojbn3ykwwdeuzr75ns966st91vf6ysvnbc13heyc1v8izb0zbz1zvz2g77b0jy7bfofyus12cp6ls7394r89o6f9nhl1tpmuc3w7hbgj3jr0ucmlc902h6j8rgshv1l787j2w3j38fm1vlxzli78i9rnhwdbrokbxlvttdiepl1zq9klrdfr0zdqq0hoknc7d67tgnj68w0famenenqjhv4wl85auzouphhyhyiuy2e62nocekvv1uuw044cyp1v2kecaknp439z00puk0mykljvzyie7bq8of7uue2qp4xf8nbbmazdp02c33k6gfj2ffkmkd1my9yd8ivfrkexlt5wyd801t2ha2cehcm4be2c5zq3mhsm7cngpuj6nivn0he24lm356vg4pjse7rqwqo1td7p90tqkv890dwtuvwe873uzal3is4wcinevun9b47e0msd3gj4re5yjhztp7xz477bdvpdouezi3vqpottz3020ue8cwirfd3okzidc0rfaziqctkmirnxem9emxrylos0pk610ye1zkv61ejm0hhl7g0tc3bnx06y59zkli194lq5tv5uj6d5hqvlnd6e4nsxy0zs0b9fzzxvhgrx62xhvdup6mrqyedyoz974150f86gyvv2w3csp5ac28g6v25tb61g56mpwbjsguqhu97yfxpf6gsq5dbpg6w35x1o4qj3ifyb029xwd6953kxiqbzw1eqdoedvzbukk5lrzra65v467l1eddpk1e5wp32wfii3r0bc72biaa6ndi63e3g6dmhrdtx9ue28402sz713qon246cjnecxj8bb3o8jvs7ytrkr5ig45rbo6hse8i2pyqjjjw22jakbcknhqd9avhi1rdiar9wc7duw05srmwvsurmg1k9f69n3ycpxmslo7pc84kcfwyi8cykfeev4pultsmjl09nhj0lt1sew68fk6snc8k9ncwamqgz2yx',
                sort: 457274,
                administrativeAreaLevel1: 'z7r4jq1vxclwiv6oaxpp0nxtaq3eahfbrqsttxhpslj5ciza42',
                administrativeAreaLevel2: 'x5jvq65jx2az5qoe1ibmf488vyhb40j208hko72k7iw2dpdods',
                administrativeAreaLevel3: '3ueppu9glv887x99900rbqf93fk22ycimvjxp68h1nv6v2zov1',
                administrativeAreas: { "foo" : "bar" },
                latitude: 194.85,
                longitude: 431.09,
                zoom: 91,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'zdzwjk0k3l2etlu8cv410et0gb127fzpcwxet',
                iso3166Alpha2: 'ga',
                iso3166Alpha3: 'l14',
                iso3166Numeric: 'dfz',
                customCode: 'jnjoaphmu0',
                prefix: 'fx8qw',
                name: 'dta3zy88hkvpztybt0t1muz0wgpq1pr4d9a31imjfhb6objyef06kk15hpqbin6alsoy9h3uqobvorgxktplgk60oo2m0cbzsexws2trnhe0qed1esllar1qxcp6kz4emckvrtmjofmk6peirogwg65l9gj5rrhfgqwve5af0zivjgba0dboy1dlmmvxgpwjgwmnwjt4d4ddlb1tt9e62j0hepcmi4brtvummj8yvvnlvojg9xfenxrk64w9efv',
                slug: 'zz4oggbhq7okdurop8ym5eqj8gbji74eeg9udniog0pwb1ep3lcgcyazabd9ngw71o245780kvpwa8vzlhmkc2mre67s5s6jggsvpz0dl95u3dr5g3p9rx5ngwjkbcfhgln3vwzzpv9a6b34qlsjmwm1vxcn587x7t6307t7dlicya8dv72coedw5997z0peqkssafeznxm2w50egv3cxc3abgbvnko4xlsjgvy32vg1i0zm178xqt259e1v5i6ymnwtl74fy90lmrgiu8awwg5eymfq7oxo9v7ckaw8yg5hx1cyhenw5nmum8h5c2mmbqzafprpdwkym9qb28hjb60xuo179g646smsbkgasr3q8md3656g9raf2yzn40vhvs81uormzsg277piy7ryplon1bt6gdwz5a7jc6stym67udgr4l58n1q5l4h6szf4jfvm5px0o734pftjqnavk35q336pa722gvpsdyhwf4jy4an3m3sdgp8363w3uq5gq7099gwhykvvw8of6vnqwwujmagz3dvtph0srub1ms15vv8yw3lrguunosxwrk5wkgmebvvolymax4f1grawr9dslqh363khz3282y1uwq62pcii2zbna3t6af47yi563hqse7ckrn2vsgj4ec0mktbu3e0fd4a19zp587a119yp6204oxvkhzksofacdrb1x73uqodlkd1hhoa6xw0tv7hdc0ezy3c22uey052pwko0rn75c3lewrznqqs4e19n95ep4dr10xa79dbm2o2jdq64pnx52a7dyjn18s5vt9mj8wes22b1xgpqfe96byifh1ksq25d2060t4u5hq1k117met5ksjinfhumdjm6xuv4ahd1wml6hjju9b6h28283np82pxl6xub06uafhuh567u3t7szvtyfl5ph7ov9hiqruomtnkbovii7u344dm7e24wkd7m040rbqk27woe50w2y3pdzqe8ea7lapvz6ndsq68wduogai2f7ru7a6ei',
                image: '1vvhu9bjpcxt8l5kr1hh1p79kd5ok9czu5536er4lcqke2ukp6d4edmm07o9k7uhaeuciejtzbwiyibm0kt1w43v22wdh4686gp6xvk942qn8szjkmptwbexpd7hhk48ra7xk8cygv5a9az8wjhvzuhr3vht3qy6jnd8xajm99vcue15ngitauftst1u4fs32kuizxrc5qt9lil59uxt55fabhc25ph0hg1pajmu2mc6lqs436ejyova39kusi0bzjnhztef4ma61jyu7ycl78rccujrxelan2garwgsjy4onv84bb4ny0sm28flvgi9mre6y174ckoq4giaarfwhssg298fx1lm6rxdo0i6lqnukdgwrygsnvfgidpf9jy7ylseujtcup7xau7lr9jgdjb7a14onbkunl94uj9eftcb3vqkakrpg8wrgnznpkssgp2xisx3hr08lanyzsewztz989fyhfp4nlf94uf0bt02kr28obfnrd49y538v9rrp2a9y4nrw2d1q9tvzpq5888vpnjw5c26nu917lz9zmafmdc4xsc8oisjz0rqyf95gdh8wlk5q4h30cvwurok6vad100guzjex2jpy2mqjpnm6v4mucnjlw03le276lbzuveu2xqx8516j1c6zq82bg1183ppljqf8fpv82swzfpzcw2m51a6npfng5tz7l3411npnhks13pjqsoeossfhd9867lur7iglvym7tclul1shchv86iic86lbyplz2mgn13i5q399tdcmynn2awg1sddpj51saeqvsaznv0wmexhg53q0g5e55b8nbms6nl5u3pmiwiqrmscftk1jpos41h1lq2htbkf40yn483hnsi5hhsr9w367tbgx8susdg4xwdb0fppffpok037nbmcaybtifohbrfxbpp0pk6kvmb4obm4c636xzdcb8o3e4pivcs43fz0ooyg9bs5l57htde78kw8ojjl4vet6ryxof0bb2fpv74etmyx230nqpj5',
                sort: 640948,
                administrativeAreaLevel1: '3h7ymiukoc9l30k3eb3wof418aiwwe3q5ztqxxz8xr94zwt6in',
                administrativeAreaLevel2: 'wr6c0a8vlsjsrpf6dd7k90p9opo4j6hhu3u0aeuagbs85ozl3n',
                administrativeAreaLevel3: 'u4fvi2xwxgeilgtaz3erbzjvt0cl9xvpfp4lu538q9al7iamfs',
                administrativeAreas: { "foo" : "bar" },
                latitude: 658.54,
                longitude: 745.00,
                zoom: 39,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 is not allowed, must be a length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: '1x7',
                iso3166Alpha3: 'yy3',
                iso3166Numeric: '54p',
                customCode: 'gfvlkehtet',
                prefix: '985aa',
                name: 'c3it6882k94fs2qo2v0xtgotzcdcxy5okdffnw0178fv1jxteehxk194cn8oplpr381qt3ybowqhlfmb5ndjrdatrpwpac81q8ujy0szayu0no3erj2ucg8rvfw0hfedyhkdiqfxlqhae7u95hqd84xdhjy2tmsannd0frucmwfd0fmrnqwqb148gbdjsuhv1bvkpqyxfi7n38t6skjlhop3d1p3u90xmiags8nkgau5mm82xlspr9mm4qfa4dq',
                slug: 'vuy2gojk7f3v5tydaf47fpdkdu57scxt2z55orszjr75behqwmxvlehryxb1sz8r2w0gox5i8r9ntbkn9prnxjammyvhzg5o0wo2ji577iw2dd5z4ig3zbe9sk46laj1q3oef0x9caogb80tf0kp83ye05gw4aj493yi8w6jtgpnt8ykruiqz51ptd9tlvhmagl9v5ycm33e6ottrhm5q0ceccdtusx9711aezp02mthevub8fsgeih50njv7ysl6ikipwdz4b7dz402ieo6juwy8c1ciqw2q0zyhcx8ozjpphazttwymt1lhyazbk28q6m01gp23c0a2esi1q9ymawvvmrl6nsdbvk6idxjisxcrbzjgehn936yoqwafvf5vdmzmqd2s6n2434d1ahtd6nlybh7de4mn8ew1rmkg356tck8pylwbf5ewo2yo6f9n5kjsla0ty5lt8ynh7w2bsoqzdxcppcs1zwx2k9qj2d27mrbdrhzxwave3yqga7jwq7vuffnl7l73spagd17f64qpatb01tdfr871vmtjf575xz5znwyvno0gl49t7jg9c76zzzdoqiyh94pa3on5unv8245frdzjr1rs1tt223x204jxoysfeajejjq29oqy3t2fxy1ey70l4lsw43mr6snqcdgwbgv21u5xht042n222dv53mhvk3pykgjk9xsor37077ohkrsmi8oorwm28s1hfp2ku078vyjk3iyeyl5xf3vfuswq2wqrwx0xyfhvr9ghfwfs7drfuv8fgn1ga9ifhuepr8d9hvkjlcf7l71yrcihlxvf0gws49qamz6r5kaojru4oq44548gffdkc9w65lt2xiycnvrsm4m0v4hkqlf0zl5e2692thcqucqjbg12lovlhr8stink91sxlug00t9gn0lac4uimedn2ecal24ckkn4vrmcehia687s63x50e9kqxms91z7riad7sv3ch8q3wy6bzhyxnmq20pch8b3xw1rzaqmocqkyl2',
                image: 'mkekmlkr01khejuv57a5774xe1hks8fwx64buhmva03gbfi7l27khch3s7vxg2r3yjkehixg64e0b5fowcv45y8pnc2flp69ik6w0sbuv2774az94hq5iwezwgclnm0fpsn5ipyphinonidqr5u9byimzk2pf0ya7ha694gcxokompsu3ffkw5bhe2eijo52vco6c1pjpm2axnut2eg2kd011ac6h62laqpmmd5fqc6ss4ugh4oz1ofdo0l13r9a6c3nrujnv3vyv5k1sqjim8bi7wjlz7w01sjbp7lk6jbjyeq6i8wkns4r3az58zdxpwj4ltbzvso7ixdr57ai6y8vo41wi1soik4ssnhi5gmonenftjqadrbuiflzecrx9m98uhbjg789lp2td0no5kmuteuf94t44rwpltin779dgdfdjkr1hw2jqyehfp1swp5zqqgwoceg7guxaqah47kwkeg9lq2xwpfe51xbxplsfeairi0dh8ob1vs6l4j6zvjz1iuhko9skdd9rf1pqc6q9lkrtn40j2d9fiw1j0we6prubtepcq2n2f4z1228r8mwpf67ybch8sha1y7sue1g8akaoberihv2eh4jioqsv6v0owyvlb0hv1russzd35y5y7inay2zsfbyshpmntxwt80fyzzjs3izqr58g5qv2qqygithm2deiid1tiari91rg95twsibrxe0x8xs4rt0ho7nmx4t2rj6mad7m6n6pqbyyy82jj90t52324x2recdsekq9cpsb21k9ro2ad3tzhoylokydknxobwqluu9kbe71emlru15u0ex5ajm0kpgjrg7ua390kglrhhx21vcn12to4figtstbkn5pd5u9hx1s1cxlk471wm310ib54yzsbmh3ptrurnumy6c01zzvgd3mr0btow2bcxrnckqfgftmyg924n1g9g4m32nzeyc3wrcviwt40f9pcvg4wqvladl3bqqsrzr9211rtwf5jptfp0c1707gm4psvu2',
                sort: 292447,
                administrativeAreaLevel1: '24ou8wxta04cb4lb51i2ht4r55r6ltzum7rf7byln874ieq03b',
                administrativeAreaLevel2: 'yyz2cd4k7y99lik9suc6ecb1ky82q2btbp90lm09x9nh3b9qpe',
                administrativeAreaLevel3: 'ox7gex6hr9hecuwi7icrhb3c09vleh7ahjlo53o76yuja146vz',
                administrativeAreas: { "foo" : "bar" },
                latitude: 634.23,
                longitude: 905.33,
                zoom: 72,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 is not allowed, must be a length of 2');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 is not allowed, must be a length of 3`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: '13',
                iso3166Alpha3: 'rsxb',
                iso3166Numeric: 'hh1',
                customCode: 'vjhulpkeiq',
                prefix: 'q4qqw',
                name: 'kj1ujizwfnbw4o4naa0bb730dvyy9ox1gpp5y27za1iv5xusts0ved824h3xw4sexvqq6cu11u1hfny3few37ge7g32g7oxl6fhqqcgl96iquykzatbujquct93o27cjr5gu5z3cknr6r890u8noveqn1dl5ldm6gyiefmljc7o2osmo9ljnkgx64txzh15undphq4cv4g1m8uhxmkso12vrg5ndrsa24vyrmufrnlddvwashq5icg1ecv8vko3',
                slug: '8h6vtpk9wm3glmwjcp3if0fq5bmqy72d9w9olil3zb3eoy1sk8ckie3vy4hn9rozn27aohgk2yqpx9v9ypzhvw0od4rghaekj4xewq3bghf3d20qpakz94okcfo8h7n611dekexdpo7lzropl2zhiuz38rhve8bth04ylds91s55qd2d8sea9orjtfxz6ovije1k78x5460qbpukm285k8j6g5f6ylne6cadaf1iiekoyn8l0xsqwyy8w2knt54nu3tm517zroa4gnozbxkx2mulsxtbahtrp5scj555mc1sl3a257t9qhwh7kkfu1xa2landep12gdv72qw1pp6v1p8920lzxhfb6tfdozkt0zp6xyv7n76vynq233hyi4xflq12p2i9m8tv0mip4f3z0d3cj6wmt1mggt0yuyyexl6m59pifxojzyi2k69hordf3hm27xngf1otoxf5r2m4yb6i6l055quljj040zg8rq5ooy9e50b4aincyamt7edjc9coth686aae77s3hvcjnibow3slb30dcwq2ti75ihwnlgg8fmvg18j9d8dt46076f8solrgohely2jeieik27kt1ci9zsxabp1xdstex27zuce88xgea58f53wsg9atpv1j81sfcofv58y6l8x5wlnmiebh62c1bkhanh2v7xsy6jbi95zf4rneaysnhbcktqy8wmkvs001h8c95d71yxelcvntfc9mk17olzzgbphbfr1yx6qx7lhijggto8mpv16n9cg5nrj2e1r8hv6jev6cdiunakifcmmwiuxbnyfiyjoyz3y470ell3gk7sspmjyfxl2jezv6hi0adstq50woad3vbdnym7m2r7fmhshlj5g18x5um28k4dqyjvrwgczo6sb07op93uo6rcp1w2osof8liyf6cx37grrlq84rbrvaq9y10novghxdgqgnobw3ba1jq4ujiqp181mh04xtty36yx53l0dndnxlvezf1szzq887xtb9b061ozz',
                image: 'o2y69helg1mluvp9edtpx5w31hjwh0zvdvtuw3ghrnuqsb4g4qyzweh1h2bvjp0gsj0i7s2pgiz02yno4ubivl71sh63n7w8h8chkuhphbvlxq4q1zkhunxqsymnlydba6t0uz54xs9sbgdwe3xyne8hqfa6ryni6wgo2p8a8u3sc9ru8el4vuqbq8ydfh3czu80l2ono4a3pom34zvub79k35gg00zks8wxv7mvx2uc6e41nxk2sqizaf5l31vgm8r88nhqyvi5r6sikqc7282e8s8m3h8a07qnxn0td6ku4lon46zim2284w57qmy4nrvgl7wtfz0ainm1wajlfap0redxthxznri4soemayb85cqgwe5gbm7vmu2e2xpmc8jxulix8ie1lp81tzkqs9ale31btnxgool0ndrjz2xj8cdipxwf8icn0x4h4d1xgn3qjtir8qqgf6k9wh5vhjjsjx9wudbvfy5ip0f5qyxzrj5mhxuqtarmybfuyutjqpa52god6k68yt2w4kidw9c0v1fq48pivqtt8t5n8jg9zojyja7hw7tq6xgkrrpjeoormc8h5qmd4vyqh9el20md483alyj4djd5m4wqpoucuj9myhubqochbv0zbo9nu0fha7x8orombbb3399664rkwt8a47uz1zy2skgkjx5h7q1bjb0lysx1zetyvn32x39tb4ch3yemfgr4jmf55yc7yvj98kve5c5m8g3x43y7n10xhhg568dprl0rksxf8fc1n3z397s35zpbqg24ayimn4v4ektl7xkd5i8pvt49460dlcdzc18hxzs04oioolwyhl9z3uatquqw777n6cos5rjy8drhmzxl7a1xgdni6jjh99bzpqj23scf101dllighoy0j364sjxcmz57a738sy0fcpz443hbzzfmmkzbeaq029ddodt50i5saku298chk3bmw69dgscbxbk929e44416gr7jw5lc83wse1ty8tb8no12km9guprk3hk7',
                sort: 969144,
                administrativeAreaLevel1: 'h6s3sxazave2kqu7u85jfvbomkwfeinkusr1loa5bqriuldypc',
                administrativeAreaLevel2: 'qsooksd96nhdocz6lue8d95s7oqjcgtv9w1r8nlxjh5tcr0pv1',
                administrativeAreaLevel3: 'mx2jmangg7xbm6fill59hwkj8uh64hkk3sjy7zqug6lxo9fn9u',
                administrativeAreas: { "foo" : "bar" },
                latitude: 727.27,
                longitude: 892.22,
                zoom: 99,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 is not allowed, must be a length of 3');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric is not allowed, must be a length of 3`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'if',
                iso3166Alpha3: 'g4g',
                iso3166Numeric: 'k4tk',
                customCode: 'gkc8jutstf',
                prefix: 'dvkgb',
                name: 'jq2cae7mubgi97gqrkz3eef1jh6puh8l9tninh54m0xglvjvkgyb9ir7r8309j8ptj0zzlvz7w37wybo2wcysa64c32dugi31be5mve56acdl0f6v7f42w2p2se0n05zn5h4vjj0o0jvoqwqkh0cqaaiyenvvl8q952n1qr61xh4lzb90f5gfyo4iay61t5jxgisqa2pr0kh9ufyvm3a3be7wi2yy53dlif3ovwo0n2c2us88d9gshaj6r8born',
                slug: 'iglon4olvyjfo37exblssbinfcd89e01etpc21799z89dxgqaemn10etwv5gfegn0flu2oco3cgvj1qtvtr6y3mb0k374ioqr23btryhjqg0mj8huo8cmjgyqkte4jgqrn7ypbcd15kc12jx4m2gjnqlkuyjgnrmxinw7smdvqsu8rwo551epyjzf24rl3r3gc2cbewx64vysao5kqhgw55wq8bbcx9ohgtj6wk8zjvi5dewe7panelim62zqf9jgx7dy8subm5zfkw051yihqwjsfjveeeimaznvrg966z0gt04q99ld06c1rik97bs9tf961gxmclmb08iax8s5xtdfjvnd8t31iae2tlz9upywghihb825ulaxsv94u2tv57l0phj0whcm9z47qxsk93hf9d463fm5gag5hksrsefzo9msuo5v12hu0brqct8ki2e8758579zxmqge8srkf4zywq5od75b1ys94ntmytzf84havajj87qp0sxupn1enqwqwyks6a076xvlwt5o8vtnjhxpef84i1mtkjucla67oppilhog6z14zvpv4mxllwlv0p1sz33a8qns7u4sbfmdvf18mlx9xgtc42ysql8g4jz5dxc72i28j7rc4xgajphthdixt51roke9sndlndjjdcp7goo1fwakq75babul950e9cifzs0k9xzsjnj6qe7clkldm5u4ol0lbgvhn3ixhqmpdfmuku1v3ic91ydm4xpb0dshju65z9bahdvuv5pydabccv72ejk04v1mfdtuos2agml76avt3g3cz53jn9tx3qjxzblkudlun5f3hckdy35bwrxauninodtyxiemfcwf7geqc0nx4xerb7w9ywjfjd8my5ms5f9qkrwdbe3fhwltw0h57e3pcchcpq31ou1agrirx1dnr5es6xigeex882wwfnnzgdaamozl25lg5ntpy4bmdaqs06i5z0cz5rwj81j5yooujamc9nx89algqs96eiftdxkswky',
                image: '4qia2hqefro6glnc5wu15njcf32d0kymfplhhrvbgpkaw15x8wo6zze3ldj6fwz7o006cpn3k3fvqk4fz9kh9r8jqxcjlxv0v3cr39gdzim0snrpjy4wq8u7053qlab0ytqqsn6a07qwxl283hbpbbxcjkvoki1mi1x3u1x2pmoe9d9q0vt5csdvnff3tfmp6afqqe895z6xavba21jbh5umyzlpusgi302koyvb7026orknu7wczlqq27tpiwlxzobmsgymo3dylr9csmufxnfuwpofsrmulhfmelp7533f2ahxhx05jx13djg7dplcz1b2voigglzh7ky4uzsywmkrexqdhrt5e1rv8v6wik59cz6tvgjt0kbck9oi2w1clnutl8nmg5wg1sscpu8bwpqifcbyid9hghq824sz9wqtcs6fwfw0xaoxc5ixu4ace0eyuqx8jfhbt9jpdexr30c846uedpfbqf6ef2maq69r2u9tyidi9zv4sqothy8zkjuo1yc5erm1rya2cmelq4s835drbg0afoc4iglwo5y2x4wxx4e5e80zfih5gl9qw7v8t3xcnjp8bfr73wn2p5dk5hcejp7znop5l9vscd06p6pmlmqf8vroxbjn885lj6i4ggug1pyu8ooerc0pxb0yt858hjrvfjtb9bw7ri6t61gasjzypvw3ee14k198q3ksh2hxx4e712b4sw7j881nze4wt5helsfh32zyqxghqdkr3qobp8ry13lvxhn56bz3anqifpeom7t8k5mjgw7yh9v4v801aqdlqumgrffpj8bdwaqmir0nl4kimpsbo9b2p8vutqz7d3gifl7egkohdohapcz5pihye93f6j0t0mkfyjx0jda9c7lfzq4cc3vtrhabdtctecav05iebqlypaieh4bfp981yhjyqk96pxyopheyh7v7b1wnjukjav60ajfjsx84qofplf0mkkxmtiif4jk38pvcga0kdlfiuc1plwl0tr6ekfubkh8s',
                sort: 592737,
                administrativeAreaLevel1: 'vl1twwpa4ssg89o1ubu6skfknfujnhblkastt7yka6zpjndhxx',
                administrativeAreaLevel2: '585n7fyro2g2uulm8asa02gvlnjgyueu6c5yp5e9tmbbgkr36m',
                administrativeAreaLevel3: 'pbot6g9o6zoq6sl1j3x0r05j3tdzrfxeewg0965wghs2p36ftj',
                administrativeAreas: { "foo" : "bar" },
                latitude: 731.19,
                longitude: 625.54,
                zoom: 15,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric is not allowed, must be a length of 3');
            });
    });
    

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryCustomCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'ad',
                iso3166Alpha3: '0wb',
                iso3166Numeric: 'new',
                customCode: 'k8mk2mvpa47',
                prefix: 'i9xoc',
                name: 'iuk0614p5j879tw4icz90mhwrv0gf9l8w8gopua2s77vw5bvh3f1e7neb2op89bvbj8qee6q6u23dr625v6mzez2vskw0rs1dzd40c7ck7et7ucpycx8nhr6tgr7vhoo642mm3t3j0r3w983vyika7gwll4ip4ievtgw40xhxcuetr9q229y8elecusyewifexaxuo9ag0pv8c8glhb3z7rtv0wco1mxs8jn4ayh1u69ul2vzpda56tsjl1nrcx',
                slug: '4hp63k8sqh5lir2smw768k931mwrfbeda7a6xcbtcg9hx8wj5xlat4krzhgfkrm0u1zwmjvxv3ny9mew3ukgt7vbj77025n0v7sqro2tp1hukj0wh91w2pjvl5y0y280x1s220grs2qyjdwr9ks44vxhi1uvngtryrb500o7votjvrc4c1tm1umntosezuztu6cdrwg37wr94plsw38ba3f3nfr8pxg25a2bk4t82lkt5f0h111mlv6y7vkpgtgmnev90xnd4bn90fqyef14px3ibtgd5neh87vlc61keqlisrj0xdj53em4xhb1zz64dcuctyhjf8not0ep3938dzf4gui02kx4gx5clmtw6g89k8az1ezdbtd2pz8pxw7mtuo06zpfjxx5h2d6etxobk2rpv4wshuuwyqmshe419ynqx3h0w38lnv4af09a3dxr004q5o4u67nea0drjcbrs7xxvf5tsjumbfc50r1izneqjjb97o35gubmfedrglyneippzimmo0qb9u6p46iv4doiiv45pl1gapc3ocnkgcud8lr14m0ie5ke1rmx7sac6y7xz8w5pdd6y3ft1hxmt1054vllzm86rqwi95eymywipbfk0c52316ttimo0zld67a910mmx2x71syyksgh67ln3g22x17zvf6dad6mcuzjsvgkdlfggcno4y9xjfbu38h3yrbb0qauxcw9ymjjtw44wf4aecx2xjvozyurhc3f93wkiucetvjzw3lzwmtif9dcvu1pub4jm18sgjyxqb5jvoc6cei3yqozu55ht2w98zcufllt635n1tltmwlwr55gr57pwbxmv1wtkouzlafldyuw2qbuwyni1m183ihuvp0hyfwyw66epk7886g97pp2jimhqxgnhmafri3c0mh9lnc6jzco94p1nqssqjc0yz8g8ccpuhf91qxhp5wpcbveobmdc5bnv7osf801c951snavktn1mvkrlgyftx35hyo38cvn4h4mg154pcm',
                image: 'hak7it1rzsinj5a0oc8vt3biu9r64l9dbj0teg8nznl7s2q3zjm0jy7uc43ep8xbtelicko1y6kj35f0t7p798uzut7aakko0rwesa3zfoyxoqnzamlwntdpeibzduhun8unlt550pvgry9xr9fw4pu3jtmwolcqu1d952eo5ham4xp2xgd5kr6li2shxmf69rk52owof84mgzd84sai4313tfwny8e8ext8lgtavt5vv01bl2wlf19isjrzigptvbo0sm6r34lg8c277ndkzk6llgdgk4ty6arvytuo749dtwnn9utunj4yp4wp6x5e7n8hixajhx4j2o61fadrf1avcrvug11b750dxs7cpyz7bwh6g0682y257pwdq9qmv0kjhlugukatcmx9e1lyrvsahmgya2pdxjd6chapmsxuqqiyth9qt9ucxkjqz4pnjx28z5upu9xkmgu8xp9617rm7718s2e81znibmam0ei8ayrh42x4a28tu2cbso7341v8521x3k4l34mxuhjjeca366wdrj0nfet3gqerm2l66x3yo52df39y8x8kejwql7xn36nt7zmutr627z69329kwmyritbic2jczm8aybuc64bw3y68mtq2rx35u0drjsevueszomebvedq3l3yhnl5s9rxkbuwqinku0po9xppug96brwrz7ecbql451pgjgvqgwb29lbn7hnugyqa3xqxz1nlarkod5foii9r3ljr90kpy3afm9a3qlebiojzmfs9qy738qnn0vtl0ycv885jz0xe1kvb25fvtuaeng0undtix3s8o6es6f64uem5rgbco6nnrezr2shd7yy5s17x42exvpjnv65h2nlqvbh7c5tu36nky37fsfd821k9rjbowi6ltfczlqhbjtv0asf3xi0nh9v6933mqibvkyov5fd86hd9byz32ja0nw7vgqnk29wem5r7mnfvw8zks2gguo0hbae59tremmqr8qoxzyas3tb8cgha36xs5nq0',
                sort: 972335,
                administrativeAreaLevel1: 'rxpeslea8aadkedeeqivrtvpxa62shrbtzwt43vst2f9hvexbl',
                administrativeAreaLevel2: '5uj0vymvzi4nggqr9mkpz3x89gb1gwuav3s7mez8iyu7f3rgsb',
                administrativeAreaLevel3: 'wm6wmbink9pbdy29khy8rqry9en4q0s6bo3bcuuxo2fhunmvoy',
                administrativeAreas: { "foo" : "bar" },
                latitude: 925.01,
                longitude: 601.19,
                zoom: 27,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCustomCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryPrefix is too large, has a maximum length of 5`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: '3z',
                iso3166Alpha3: 'hh6',
                iso3166Numeric: '4ga',
                customCode: '3mcrywr1aa',
                prefix: '5fuzfb',
                name: '4s8mh8mq0h58qhzzuebfz5rsh08u5jv11ul9zaphfehcppgk413g8iwafu1vke1wj0zkfjpq6mjhu767ndbeel1vfp3zt5mhjckh176hua9vxpy04af4rlwrap3s0uc70nbyku7ngz5rc1f0jxgbn10n9py78zi29ye6lwc8zuhl4tqhn6hrmyne0kkywpx7paio874bf3kvva0qz7ifcoo5rj2bkuy4vo2n025i9g3goggcowfwtjz9lqodxjd',
                slug: '9w6yiylg5dmi8y2bf2hb0mrvhbnpi1u1jn088bt91zle1mmf7fdsec505hl6g0owzli90zjab15hwn72i9tbi6qryzy9ki1r4uiqwy22wqu3vx5x9j0utqkbovgdcv0g5p8o71b70iqwt4th6ukcb6z2owvo5pqkya04cs2p68agsqei00ngz3vq98zr0z1eemsfdzi8g8tua8mt2g5j75k4f6c5l3d8injh2zb8qgoduw0r1ce0vjr3vyh0i0hncbi2eutkpw4bfdi620pyjtg00sacvk54z0zdy7ocz7zkgb1u987bzoroqx7fq8zmv25z3hbmy2iltvzdfzv6rqfj90aapxp1dm8u16ay3m6f5cc5thtip6q5ipohtxwuqodzht9k9io8ydv9fdjttxarsvg5q8z39xytjllmmsvatit56tvtgusqntlxjroqjzsdsv3oions9h6al6r2c2ex1tq16ev0y5j7ntg7j5xhdxk3hb8zz0byynex7ekqyy30yyv2iy272bzpgt33on4a4xjngs5k2m2pqqd26pirh1aeapfgp484k51x944trb6tolxo5guvujt20s3fe2etwz3y6lmolyc8p6hr5r3nanjwkujgcaageg149rs4mp61yd6mgsjjwn9iu3oiyo5zmcvd74aph9sc84wnuwsn6zdxqgnepa2w2n1sjijonj1snfzg954zzcqssaeq225orwt6xgkllda76vcs65tnp710lwjrrc3an65matw4g5syynhu0xxencgogr1fezz7iikaj10fvrxhw216g8kuw40di1zsemwxszdleg7f5ldlechpa0ai29nb0gsgtdyjqoepts2uuiwq2zwigpt3hfjl5lam975f4npomkhtuqem6wzqjq1948a1gdkj1jfae49l37n1ink1dz46cp6jxtgnblit4mi0zsw3bxqs8i5p8d5j3q1tokszwz40myte6kxm0w21esgrmdganfutwhd6uehxty5mvpem3bjl',
                image: '7s8jxdujwi3wz5uqj84kpq72sp50fo83tr3h2na8v49vueigi5cm2psqlug7oq3cbtwjgg5ure0nmzdgctb6ja87smbi1ymzceo3onzp4424x2vtlt6mbou3140ni0prflwut9p6tts1rk55d8v1n8fa10tcfpefycoezciyibuxyagl3fltz1gko2fec9td57lrgn4rv74pk8tdsenr5wco2t7m6l54ecf1qryug25755escweqc9i59hn2fgkkdqifzehj1z13dafeir1gcjbjtu6hdi6navog75ab4nnmizkc5kq05bdl4rgn12f49exrjgof4c6uwnh1z8xcwm4y65obq2rcnc04t0ksivf90akuheqhmxo7cjgjyynd64l4xrlmlxwyg57g2ak553bdlq48wxa8sfbeci5gz5afj93n5ucfnnrgpv1q8svbl7uyja2f4p8xpqwcus0e24wxwyde7vd8vomqrrmso91lofw01fn09i2ix8wj7kubb8m68n8t6y8wjyez72s9lr335aeftx1r81z1ctwyz44qhfekzrmmw530wo1oagy2h8d9jcqwnc64qj6bm0r63x2o4p37p5aqdhphw09apjkrg08fflo7u5wsthfk5w00mv5647t3qkg5kh1st7idvuvfgi9o2xtnz4ch35ydcdrt8m3dtrva1rou72ryigeex48o76z53s3mygzppxj4ewqn0sfghr8itf7fss8obc0xm1nkmsgzez6s2vh6bmbku7maajz0tl260p1o11jrsprxsir93mezakpun5udajtt7iezop7px08aj869y8pe1ox0l9iia4kydrd0gictnm1fvf53gld2yyyo2p2xsynqhok1ndtc63iu62w6rrq1k46ckcy63hrfz3au03rcpcnv0uft4q0knhfukw0wm9m7f0zp6co03vbvwhqsd6ktmm4sgatr3kfug9hzxpjc2zbjx4zu5abw2966eza4ir834uezr60vuyz925cixyql',
                sort: 827960,
                administrativeAreaLevel1: '6gxg3a0ps3wrsa7e3ag9xjvez0dugrnrq8ud7qfuyogbo6ilpe',
                administrativeAreaLevel2: 'yt7fuv285r0474mak83c8mim4cmf7nwvne2a58ible5gtexjt7',
                administrativeAreaLevel3: 'lwqp3dtgpr8h0c2oo23ceihv69ypki6las91h8ez9fqgl3muc5',
                administrativeAreas: { "foo" : "bar" },
                latitude: 311.11,
                longitude: 706.65,
                zoom: 28,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryPrefix is too large, has a maximum length of 5');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'n0',
                iso3166Alpha3: 'x4o',
                iso3166Numeric: 'br0',
                customCode: 'toejjvw85b',
                prefix: 'e5j7w',
                name: '3fza03p4zqggfg80wh8g2ypzbf73wgm2dx9ifar0uyqpnwsf8h5nue8va1zes71nkrdklhdd342oasygnsv5ucuripf5cycj3txylel0o7yzh2hzrv9pkoaejhp6jp7l1zjag4qz8436jf8ajj1x2m7lj3wi02ehliiyv600czuq8yg9scazfvzriv7kt3wcfjagzu0pl2fu31hj6hip53d2fz6y5rwc8cq8rfi1lxgmr1siwqlnn7u2obgh18is',
                slug: 'goo7d13nygu11vffzuysw7rc6u0ew47gsvhc6ikh54wahtwjf6edvrxo1t2ds6gvcc01bl3n1317dnw0i3xsnpxrl0i961lbgfeqoxk3zy2iitgfukexraew8zbc6tlttj4gljwrmgee3cucklwb6vh2djoulaxs63z0owpz43z30jtuil9sk477cw53z1ejuu25570jo6lxqsh8nbq4tdos9orm24e8ezzskhf97g0z2xyqtyoiq6yskmid0hfiakfw08yxuqstf43odaez3jt66uyf0sbs55fl9tcbyk4hb6w4hefodkdyha1lopqrpfbuhtripyq7uyldqnza9car667s3yl0gezzr8c5hkm0lff1k0dkdhmp1svd9zxltwb5wle54k7n7q9jl6oepogjjiynayoii1grir4ct5v0zg2rrd99el9oni0gjfk241psnkmodf06eeambd5wx1wjhz5vhyl0gduqkrnebkpt6skfiwqi75b1vcsxx9rjc378waoh1f44sdren9kbwa4tr87j4v4p0bba18pq1cuwdfxni162pnnn028ofeese8l075q0rp204yx7h3lfuiesjnbjerspx1gdz0ef40nqcvmby0k9y2nn1zr3f95xuwr1skrk7ia9my0ufu2pxz68o29w677olcnxi4fefrfmg4ln1ek66vsbgu2biw6e1nzpexh47egk6nlbg60tdvcox0bynq5tq31iqxte96ne9txn7porpjjjd39pt04iyk990xvd84yym2lpoefk5z77m0zmg5lwp0drzxmnl9e9hjrut0g4ex6pjjiepvn9c25jrgmndysi68674uvzaantolxk3wkkixaddzz7k8l1om0xqxjfp6wmiyu75z2eghx4537v2cuvqmvlidti5ctarzip0tp3abxsih7oweaovkmd6qeycsm94k42ofgihc8dn9kefipuj0onkd20jw9dfs2lsnfzhwztdofoxmro46dnrmlaep7skt2veooh',
                image: '4ken1zj2oobmpsjqq6fyvf8ks09p4mesrjrqnax7w17f5iq9c6a82v57oq1irwy8p5gcqa62ffvivlbhvvy8foape35sp09pqm10girh3m7z4e16ytertjam5hdba11usmchr00x8qz6p4cre7enyto7hyofsgrab172p3sytynbnryh5mljl6io5c826at6c21zrxm0fjtl9xy1kpzzcr49qs75gpjlye4o98brarzne60apwwoeonc3rdk1tepo8y68d2gud05fjeu1qdqf2chf236qay0gvho4080qxra7zhaiwkbdg0sv5ul2bt2nqj9nhf66skm7fcna0e6et87uxks596m8n79mjl3572bxtj06wjwh2imqh2rrgjtb48a9n5nntr5783wdbgycuki3wk5gl71xsxnpyj6dxjmwafc59obtpavevfj0ccjtlix9ygel12sbhr014ipsr48piscuq6m3nfkyhbh10eq6ysbbvji6etnglx2xjzl63blkzx7lqbmxx9pfw9u68x70nx91t5tude91dzg833lmrcxgec2xfx9yssjq9nnmwys2lrhfdrtmpitim2q465oqviomihj29om0jplj9ubzq9bgbntkuzqnzh6s65qxpvp4wroitfvn77pqw6fbd81i9i4b55i2yzd7tds769vrhfr65ho8w2hkd16dx6qqiuq5rjvl5hroliraanjmc03n83p24nrq3w2ajsic91lu489zl76zpyffgs2xnij9wpwf8ywgwagt80wvcdxlgirj2f6rddfpyk5y71q9sm8bvzni6zb5l19oo8hsxy5l8hnzwfkjamuy8qt53qdyhkbb0nau5m68f2ri1quvcnao31q7llu4g6vtriig37sr5hk8r3fquq94ubrlfdfxgn1puz94atckd0saemc1xj0tze8u0vz9kyr9x2o7uhnqgjn58yxfi2wegj8xgo2mcf6sxmccle8gbbng7t0tfvmk8gy8i5w6uj0vg0p0p0f',
                sort: 675059,
                administrativeAreaLevel1: '8t9iedutmnim6bq69r8un2lkjn3vu7lnd8mwnr194nrhrdprdz',
                administrativeAreaLevel2: 'tsybwzzhb978ftsy4s5c112hhcxc1dvckhd0ai1yrsv8ktnuds',
                administrativeAreaLevel3: 'ef6wpkwiior4v6ewbxf8ayfgl3k8wf333b9tggx7a44srth906',
                administrativeAreas: { "foo" : "bar" },
                latitude: 300.13,
                longitude: 303.26,
                zoom: 48,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: '5h',
                iso3166Alpha3: '7q3',
                iso3166Numeric: '2ah',
                customCode: '52fs7159r9',
                prefix: 'b6b8w',
                name: 'tuh51fg7xr65evodf3xacsqb4snxhvekjru8l7ko58re8ht7x6sqm3laytjv2blo6g2ciltuxcpbjqw60iro5rjfxvcnut11k94p5ixl6cbvyc9ds8ni8hl09lbmqhhrudvnf10rnh331u1epnf22eddye2kvfu6b7vq0767vtq89cx8i2modwbua82xh4tbtmem4gvh6nnkyi1pijl4dgqe4pp9qo4cmrzhv69yi86bbpweqz9y2cgv03027ml',
                slug: 'dr41fivkl3r46hsm2slxtbuygsjfy28o6joe174ic5kzvg05wripi46gllhi24cagstozal16px62cya0eps4rnm7kuvbpmnvs87c0pbwyri2hp0qr2igj4eg33csa6tiw08oau1c5rz6h68mt53ydxon00hufbyqjg42a6bs64hekj0d0e8zf56tplx5z8c166rpic7a2fhex8wk8yv8ib1n5u8sls5c15u3168mbsf3ubq3jqjmhapt177clydwoo4hd4pi47c97qaofs718ua8nyhx2g8396jw1hu69m0141g7zlhq9njmusc09fx7uky4xz27wmdp881r743nyvxforvz31nen1ujbjicviksqsp4j331h5cuozcp79z2hwxaihyuahew5iqkbauaq944lvdh2scxgl5hpj7jnupev0w6lqk547206monxtistauju8ou8py8yihzn4pxvvv7psno8yim9vb0fkcrarwm7anflerhrulqt92zhkdini74lh6a90li9xtfugp1v3d7k1nmtq7dofewqadynjfy44g0ae61vnuc3jxneb8qdqckcadfu4z87o9g5qcuxhh2zm8zajhtagoxs0iekxhwe78fl2cfuo9vbhvb1eex9ghlnabwwjk0i5n77392eowdis8yviha3qz9e889yk456y2pqu706ckcxk8mf75ztb0k3vlz5yy5w47efs71lmbg6a1vm7e4bmwc2vqprxgkgigpolb9kpskaw6hfqifu6tluh82vrw314vp3b6a5mrcoguj6zg87b1d5ly0fjvr0bdrva6rtzkwoc3wd5v3b8dqtert22gug43lo9ndzylmyzlffk5zmirg9iuunp698pj6gozdvwwu0hyu14unkyyzb4c9xwjkme89qxjwazdq8o1u4gkteif8rachxwwql2htqvn4z1np8yijl7r4nvkcokckquvnkgh1z2quv8sronkhx9lft1svlwr2tzo88ww3ke1hixob6tg9qo8t',
                image: 'xvpjpbh2ch9r0ta5ufpco7p1gjmjlbeu0l28p1rucc217eto8fhqun2waybfpiivuy1zt9pk9f2gcg5nutp89xf2tg9152b2rpwkey68tzty89a4euuxzyz92ne3jqtt3u8bnrvf91q9riivmvia736v8rxlzc6ngcywsjd9t8lhh3lp067zyzki73cpytr25xf52jkqygkav5yrsw9qkxt8rkygfcztl4ju8cagj1nrum2gip1bfjo762kj5zay5fvt5owj0bt3b54yy2dfp08elvxa98o7peqacexojcr1axw4o9exdbws4kfnmqqswylirnhu5hzppboywwjzxc2gsymdd87g3mhvo58vpjwyre9ujhivxmki3qe0e3sbwyyyitm032iwhhnnt1vgzsm9971tmib108hqv88jn54rrylxccbwxwyzvhid7ijq31qug4yb3cpk9xt2bwr3nze08mpqpstz217yf5c42frv628t1t0b17adftjbvyk2w1tnqxuf29v5his8ywlixf1nx7o2enfkcz4wy7epgxuq7rcp0kt0mkh5g2ix4da90euuef07n02jaw4lc7pa5w3t4hd33wg5x9apikpiktnq3zmyodlf344i7ib9xnjx4loz29vc3lenssl3xo3sdpxrdyto57jqtslb9vd8d5ktni7v806dqzuooasuohtu18xtjwmn952q9chc9oem7qvij0vw6crkfab80vh7el0mocsg4j1j7yz67ibn0eakagobeejvqy7kxhajfmuhg6gbyyk9ki5k41gob599aq23ak6qssekfngdjf1oj0c3seq4o93rlq4gg52orxij7g8h651qz13zl5tlxfm5rzkdf7124z185jkebsxustez7yf3fwawz7q16xjukzsck9t39nd656xeijxvb60rspss8wtagke2ponx4djbw90c62137zkuvdg6t8fqd04h5ow4n0gnivwyqbp98gkx4hdkhyj87rvxbuhjwtc07cja',
                sort: 884369,
                administrativeAreaLevel1: 'fgojo44sl2hf267t9ll7op3f3k8nk8pkdngbb6lg4itumkqz4l',
                administrativeAreaLevel2: '7myz44627sl0fe3ifsmx6436209kj4rlxd0krl4hplh2d2l62x',
                administrativeAreaLevel3: 'f7cg7pf88kaytmkoixm0kkti1qai0du9l6rdxwi6r5vmyblree',
                administrativeAreas: { "foo" : "bar" },
                latitude: 677.13,
                longitude: 602.35,
                zoom: 31,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryImage is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: '1g',
                iso3166Alpha3: 'fh1',
                iso3166Numeric: '154',
                customCode: 'xox97ff3rx',
                prefix: 'mcfbn',
                name: '2p09a4t5th6edrd94i5wksgj831q35ox34ob62ksx1kcdl07rxcchs1zojm91ejow3y3lwonyvpol0gsrnk9rdzb2iuh5clhh1oiznu3rm6nykjg29shk3d4eqe59zorenrle52ounnr9fsgm4zd0nt1r79oymcda08po8j8flijlpjbr21505r1y6ph57qx61pnum9m8uer3x3xq0bb6kkccw1mq37i6px8kqevir1frte52oymn7h6ofuqbal',
                slug: 'aha01gh06usadbupixljndx366d128d5t3r73hobqmeg8xamuo42ccnvt4tginutape6e73i2032tqr5l0ieoq4k516md1hz5xf6tepxvju7lmdf58vzq1ribrlq57afthqnoada7pmh7uktyqaa8vm7x9zl71f2jrey6g7n07ahvth2rjm5bkwqovnh0g68plx0rnkym8hodbcebkdxsdhzzvydf6c6elzp2pahduz79rvcylh6wjqr02t38vf1oupyfkdidox5yzaitax35ylbylmmfrua7zgt27cl62ydokzf3dnn0i55ys9byxwgh0o5tgt4jejviymrwleo2ubpd3cn7ryjpvs432qdex9vrktorrja4989p0wjkqcyrznsq7xx9gy4bq666807aqe4s2l18mzi2l9ge06rxxitkl2gxn3z1unm6mg5zdl2sdtg32abq35jlzmleggioppyksvmhobdcd3pvzix6spzmqa27frs24593d0edxtdeug23d9ymvxuf306d6smkqka5fycqzgudav67wud6kbb486jhvbvy67k7a15aascsoptb4viue8hhwykisq4umxcsclyue0a1sdtt31ir912aton4orqeh5o90q0fkdfqfd53hwqqly7lf4zxxrdwqr1lkkmnsi65uyp5tac54mxteek7900llia4s36vmuchpf3pn7p3igeqfn9uycizo81qwr8ax0t04fob19y6hdne1g5tw1n7r42c5e8d8o9v1ykdvrbk55ylwwdsd3iom20sfh5g57jwd5ngq3j6hw5hg2uy9izaz9lwis8hce1vovba1hglosaq5xaq8isona2hlpgs3t1juy7t39hbgcasx8xtk2poxd474frvt80t8mv0h59wdd36vem8i455s4epa2iz2dgarddpis3k19dztfpkcqqbbqwihiyfc8t9wtxp61w8nlbuwvbs59i2s866vfvh9gqkjkwyb2acfd6spf61vzwgf4i63sxujqo',
                image: 'i8e0kdts340end1mo1g1bgh3mj77u3wuln6y693nekk8t9gi7toouv5mztnfr6i6a9yb2nglnahx342gqvxrxwu54hpb3itsfzs94x7jhjrutkbqtffpwcvd1vsxzd6z6n4tcr87bdrg8iubqo1jsn3qblco7dkj1sfi00sfsshci6rp86x41pn5ciegahdz4fhe9jkw9d2tuh0hlv17vcd876qzw0mj39yyjnb4gkzdl39rudihdkp1it6qk7htezx125zi1fclfy2su948jq54u64ik7tak0sap1kihkrrguwpf7905bk8k5a1jcoyjwzo5gohz2h38axhgdyhsj05azftzmb9qlpm5aij1c36xlfqw3thjxdpu0url084r639cs4sao9t6mdjzsntcrej0hj01hs6tygm1tknnmsitapxaljadqbz0khvavp1n275c8y5b3ss92uk2d80pte4gavmiash1rg9y4o335i0x4qr7voz74i1q16wucbns8cmsjlouv29i375d6xzjejf0uf0qu0a951nlfcja6pb09ln2ep0o9qejxm4jfzk6p5c0r00i7n1eiyditrqw3hgtozropgyeu9wupjy4ezp94hwqb3exqy3bl4bf6kzp1wtjc53h7sfks01f8pnz748f7p41kdd5saamxavc7ni1859gkieyz3twa8xerfo0zsijhx7555sr1fjbrxc1bren5ofwhnmeh0rw4iswq3pory7mj0s3fdj8cbgjxr8tb7w87mw02nyr69zgc6bssgrssttv5qav9iil5dp9dqcfqh9cedegi8rs9jypeak1s5zdb4lv8zypy1a4izon7iunpq364lfxsqodpv8uhal6so8it9i5xcbjsliyeg18st7vw9huyiv4stre4cm97ee83k24oetgdkzyxwcbqatcbkrsxgp0efjl3iqbmnyf75ifr6cpahc29po9nm62nr8w76tnx3ka8xtw78breh9vbj1tw53z37hrq11xzf9e',
                sort: 462258,
                administrativeAreaLevel1: '0ctrm2vzespisv4fgsm4r3h0s2ykdhgqoovtowia9rwpcgmua0',
                administrativeAreaLevel2: 'ialb468b0ik0lpsoq9snvywiy3midmrjj9e1mbqhsanq7s4pwx',
                administrativeAreaLevel3: 'tpjgdd2qdit1v880jgm4zoe98h0vv7v8v4rgwwi2esv5g9v3dw',
                administrativeAreas: { "foo" : "bar" },
                latitude: 168.70,
                longitude: 515.72,
                zoom: 20,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryImage is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountrySort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'z6',
                iso3166Alpha3: 'ho7',
                iso3166Numeric: 'qa5',
                customCode: 'm6dp7g2x72',
                prefix: 'xc2u6',
                name: 'nu3kunp4oi9b8k2ynge1xuk3k88e6l1mg7bnsgsmh4mnn6v6d07c6t6xqlutkloqd5fugtyos0pl9784l1aadl4ahzq1i0dn02vwk6nhc4zxfn6bnkze3ultvcm90eva0h14koix1gegg6j02nc10h1hp95nygrmkg4qexdz6cxnte36dyge55wv6xa2iup8unzjx7fqb8ka87j3kqcbxvnp6aiddj05lu8e4t2zqprd3r6uggn8it0xii43j0e',
                slug: 'yq9jhn95iwonb633tog4ixqgeeqip8y6lurcb194cm0mt3u8jsgfeofaymzjzid5grt0198fu5s1qsqgvvcononhmx0x4k3260z4khi4ourap00kc5lygiiz1tey0b8z01wyne6ppo5oq0gmtkeu5y5gt9gyipuadp7wodd6xdwuub4t8uctvm8qezkbon7b947otq6zb5zxtwlv7rmzuaaqv8vjvmgu09gjxgrrrdz3wn7dp6njti5rxxh2ge0zhm9rlm50dcjgtrjrrri4cd45l8y78iv34hsqibb1kqz21wravkl7pn2f7dhn4ewqcjzo6ebsuaaexpknw84ros257z9kpoffcapomqjxvab9ipqghm4xe7pzc2n78hqkvizyuujh1ot57hz7k0i1fzior9rk3t7a55avjqskyctierd6pyb89h7x1yblgzr0imwhoj9roo6io7fovzzi7q2kelpftowdkpce1hfkppqxpjfm2ozqsksvvv79z19q64a8oz729oiitu7wi0q7xwrssfkmzi3l9rl5kppj6xguop4gaklzty9yrx3tva54wosfu04185azj7ckfmvflm69012a9wkd2xwn9l5q8s8epzq2326gwzuyur3r18y14jac6i1oobkd7roytf9zjukinzmwmte6mq8l5jltcdf6lzdusvh823qnjp17h5l142mqcreaopcrk4dhwhbg5fmca6hdztdt75ulh84gr5t4jzehr1cn445ie7vrrujcul1fn4tkqcml6tfoytos588nlfsmhun57d4w0so7hgyduedkfbrkf1rs90esx79dkw4vgv1ppxk6nieu5jdoe7hfmezfjo6rmaoyah3ztuh14usybhrwdjkoucdfilzqpnkbrsf7i0zi0jsck82lgp1l41qvlmpkg5qn149qevb9t4rxwhfa6ktt18ks1za1vqeoknh8uawasyothhih2enno4yuxnjw8tyqg6rgqksd79u4wigqznc2cxu0sfbn',
                image: 'ol45mrvhppdocte8umeg2xbszvhff4m9nzupp874yn9gwbirsdie2ylym9f64k7yyqsyh2hzfluvcr3v9gplewb8nz2npj114v0xshzs42od9g8bea4zuhjn2pzbyf6b7ism0pzi3sqm01i4tpbqd0npmraa1hc2jmx37w05gfwcb5xosc82tixaxizq41a871mjm25w57nhmqm8ffie70poyupd0zazy2mvn3yvqrphqirfptq4ohhtyrzev5p7eewp5xs41c2t3d3t49atk5fb3rpqn3jgh68t8p59skubd9h2dxc3rkfs76nv9ucgwovcqr8101hhsaz4bnqiwxkp9djsk9x18qbp530bpnoibnj3y0xgj8xzjq776e89dylluv23aov3zu8f0ariz17as1o0137uenv0anft1locrdgw3at1qykvf2l22wznz05apo1f7h206b10ky5vpsd3gmlti5a8mlgr5hcqanc9dut3hgynsm651z0l0x77mqupuf7ozirc2ya92lgdvosjm18uaa9jrny0o1ijchr1ifq7diiqcnn228vc57imn2352wa37luvsigoz0513y2uj2ghuw81hfldx6vlkiiwn4gba51vf8wd7ajz5swx3tg38gfv93ej80pza3okn8t5w3dqcjwzc98m198so24qa5xpumwk61oekrghxcrkabuv25vcp106gf5zs6uwdp942wdcxigkj3hfhzvdvsbphaquaz0wykzngeuh4vnru8cln0fgnbixpgjdem33zdgc8bcbdb2zlfz3gqyy82kozfczw7ik8znhcuw917cswvo2ky1pjjldo72i90f1bqom84bd94ycn8wh05j9c4mjivv5dgbmvr7o16lgrlhanhfx003u1j6f4p7r8rz4ezmzdcehvq858vfbi63dzh3884ckzpyqzj50rlbkwg5tlgpv7yrga8bhpxu3tv6h6lpa3w4airxmwvfiy4tw5ilsmli00f2k1pgfaicpszza',
                sort: 4455557,
                administrativeAreaLevel1: 'cg4xn4xup60x9j7va04ant6pdt3j837t175w9bcazsfb1jgeca',
                administrativeAreaLevel2: 'tmwd2tr1m917mnecpnhmh1amjd6iatv3zxetl1rk0tl00ezc6f',
                administrativeAreaLevel3: 'yp7d1tfjl7kjzb106fimvji3ru1e1ha8npjku3h5539u2maclf',
                administrativeAreas: { "foo" : "bar" },
                latitude: 727.57,
                longitude: 839.69,
                zoom: 88,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySort is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel1 is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'pk',
                iso3166Alpha3: 'p7n',
                iso3166Numeric: 'a1f',
                customCode: 'k1elfqzt0t',
                prefix: '4zlz4',
                name: 'aqgmcykut6uzjvvdnoiyag70g62zyb8f9yxj9rblbvdhz3q138zb776zbvcfa8m0ddn2krxjuc1ub6krxvf05pklcy90s5cd80mi9we1njrl9h07cqv6ldj5y8zsjznwgvph5c4lxhwbhpa9n8e0k9xcajttwaa0nz443xclt89ljv57v7jx3fif15nyka6dbjuzjuhid9xdof6v27svdg5wyywkshbrrukicdpp90gkdkr7ge1zbjldropuomc',
                slug: 'uzli8opb4gru5lkv2kmo345kytjn6g1w2aep2lrfkhmolzkfishqxz3plm8plsmsgq0drhupl6ayxiwz4azafwur8a57la2am8z3u8wc8fibxwnyd93a0rc9b0dpk6apjphyle6k70ozftpsyz5b2bs71k3az3ecotjsa0o3s5mv9as498s2tbp00cq6klajuzus6dnlwm6abk1t5muznshsv0c49ki8wruv5ity5u2n3mba1lguviaihw45voxex72m89od02cy7hczpjl4p829rxgt0ph2f9l1x1o1xwp4uxmo04jxcvw538qalj2cdzurmqh38k3g42tsn83o8xjgi0bc88awy7mxzmc0ze0j9y2608en16by1nvy25qxkxz7slc9cm80ypef90x0izfuiyrm31ze84bbjy1xbnko1lo7mbto20absp5954ghu9gyidi9qkthxu9unm8qlpr3zoak3bwfqh7h9rjw7dbtvzhfm98lrb9mge4odj6davk9tw409nwnz8ffiuxa8jk3wwc69elb0fm0ygpm1tfw6964njzs2qjjbvp4s3psxcazzykux1t1zcyjhasih4amclxalnyjl784r8arkkv30cmwisdyk0welcj1zhmybeatuyfeasrf2eyj1vkc27hc94d3vle8zku0e9ri2cd4rw437djb6uowi0bp9iqpzg0nwkkrtmkeglzind0hz99qx2canogmt2mv4xwwidnu6vkks9dg4oi0096fa8clkjecbmoferqtfa0mkzjferxlk7v9wgtrn3obauq2h1lu2z0jhw43cmft456jfrh6m0dfqk7qy2fjt2minu9udfjcitz2jav0wwjou4bv3th4o8noad7bqp2b2asf61i00ax5ypwigtu2cpcuia6spbm7i23j87gba9q5x5am1g8tag5hnq91xiyg09cjny407cknaj7vwt1fh7us3snafu9xfwucdsudilk4sewfr7baadi3y74105vt533j2br7',
                image: 'uc0wry9w7xwqpi106chmpz3lj9xdz35jrufoceiapmewkua06xg63wdiwlijmz050n1f3tlmmzgqlx1y62wocmawu9pkiv9n67y5bqr3h4gfmwa9bf8o5v2ruc0o4ste2vo6fvnurmgb1kxmbygztyjtnnzxxcsw83fo2ev4jhz3hljfg868s2k44caqvg346xz0mqde1udyyxbr6ajitqd30w87ulfqox53olabyiaknrpl610ogmv64p7675b3ljc7l07bpsgv3g6l967b1v0egs070aur2jvo9q2n8tri030xroehyms6wzcgmzfps21n5ucc251l6zwxydm8vj2idw137p3pcc7nae9ybybj0fw95wf3do4klmohsgvbqgug8fkngit05y88xbdofz5inybtx2ugvtncecylqcddwoohlhyqaull7ywqdye2ba88ek8fssbf79a6b09pfkcr8zdudy9tcqmfutk2id1i64lg4qzijdiejye0nigzgx0sumjwyf4dilolicl9rdy5tuojwm6nh09inkphg6fo3zv0uryezbm83d111k0qw1e412lf4way4xuzff7e83f5qiou1u30le785qm7arg7u1d585qrjxo1ftx8jnmx1xkhw0orm4hz22h19vulac7lpqpcaavwh4l0eq5pew9qma5f7emqpzy4tcxxh0jtt3aaur4iuhen3jwmfcprnodebd9cu2nzmbycdi7ugjefoqblg6seo7q1jc3csjwo6in8zgr9s8nobnkral3oq98ng6s5bvg6t7sf6rw0wtl309kg9by375msiww6y5qloj3f7ouwn2aq399uxl5li7ajxts1kbk8i5nkfnh7hodfcwnfr4tcx0jxzok41kyli3saay0ld77hxttqr565gt6738y3chftormoxaabl92w7oi3vk0wol8w9alscftn4iz98clrcvn336qiucsqera32ee5rcdbwlgh2d0p7zqptan1s3wim065cgh6f190',
                sort: 594878,
                administrativeAreaLevel1: 'txszew0kq4nbcs3a3257quhtxjdjyysbtd4lgr1rmhzs0vb0h8y',
                administrativeAreaLevel2: 'kcle9z8i01fcaw7njdvfqnbafnrrsv3cvxy0c8ymdvn7yj6uya',
                administrativeAreaLevel3: '3k50ccg44u2fgjsf4hw0jqs8pvkhe8bhp1o3f85r2yq69ezv42',
                administrativeAreas: { "foo" : "bar" },
                latitude: 514.46,
                longitude: 110.50,
                zoom: 41,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel1 is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel2 is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'nw',
                iso3166Alpha3: '725',
                iso3166Numeric: '8n3',
                customCode: 'bmqp8fc415',
                prefix: 'n1jp3',
                name: 'dr3i792ejy1wxblj0mpkr5ddr5g6ydz8iajp612ja4ox6wovidhup6uhia7gtv4kbmlx6gjinwg0we97ceoivdedui491tquwqr273kp3615abu3dh7ulyf8jrl29zw6dyl2wc6s67cww0ujfj1kkf9l0iipdjgmvdr9wlma536fsuzqwvlpzlbpwxo4ju3kzu85o7torckdu7c3ulj0jtkcl1nx6i2cs8vxalmi9ts65ihe6mee9i5pmjcaaql',
                slug: 'lby21mjrhqz7k33ewgvhocm77qqjua3r6vqzkmm4vbcs3oo2wbxwo0v7f0k20vntngde07bsqnmpold0rbs687hnkxcupyd08wn5w7lmyhk8ag4pj0mr4bofjgnpp0kys9jd6arl5h0yo90bhnhpudzi48xpebzbwk1a2dodoemdclz69ywp2vjnl4f7502crtyhqpfko7uv4dokfuaibm9eifrlm19hpwfvt5ld4gzfk2rcbzcbpvlx3pyeoonp4f4m2j62qttggy1380iujwb85rlkxzmugtclptezgo5djcambkciehrmsrm34bv6c8wvwibpl1p7yq1dqw2g8ixucjn96bxx9a70ebp34l05qnwdmh6fxnb4dkogsibkul209d8n1i1yli6cdu6ugjyf7sar7s6ntqrrwo2irpjmrjrvz9a6dl6hcic7b28ytn1lhdds8qwlnym7saa9zxqjvybkj06oqb1lnllw79kd0zjdu7otav7yefvg37qtc4743uygfrayvsy0yrdrr81bx6ji00otgeny1w11of7b6vhu2uxql3dx0int7jb1x7uu1fn6l1bxot3ii24cawjnlw2iqax9dqnz7wrc040q9a1x0p38yapixpcq7z5nzfjt194c3qegeclptmj3hpihw2p0tqp7n9cgqwe1i0os22g22odnwygdwndww5zxq0zbmhtwlnbcmojtreg2fosa3o36nelbme5ns0r5ovah7u4neqrasfqcke4ubudv7ske55icb4e5sgzpy7bng0suacyk6bl7gzk300wxytufsba7mnbce26onlxpcpddglsz8lpoxxnn91xpgafv8shj0j2l0yrt08rr4may58vb1strsnln8e3enrtcan9567x4z3uyoyqckk7i69qfv1kbjuex2ng6qyasrn2ldq6q51cxe5b17xw7tee8ob2eed7k8qgazpiredq2p996v72tnzcfmfgqedj3g27k1j2w2ud52oykgh02z71equ7n',
                image: 'kxuqaqugam0bt7rucab4xvs1m0byfrdu5ixspji9gk390rmp6qkmlr0xumy6mc7uy5bngs47aw9v4ntdw6ypb54uejta2j7n2x4zxkstamxhtca7wnagzx5w478s5wtu26t1bm7a1ts96gn52mr4j9svf2lllehtzmphrcdroxer9psrz837e8i7jhoxkmsromh1nrs4hzd7zljnc5otg45xb2t82b61nw3adztzocpimwo0embtiinx05kiaw7rdg4i3kavj3ihzmfsincascqwa086g5yq5m1vkv7ktxtzenobkkvckifx25nnuvpp49x15q19f5jqoh8grfzar1x9z2o7wbf0s2up9ksdzzj6gz253xatt3rp5dxxxx0u2r4ni8mqgusk9m0zt6tr20lhzv7s6y44bjs0uwu2su0x1mjjj95gamuexf4odg8wumspeomituxs21trnoxj1f2lgx1qkqacdlm4fff0ty8ink1hryet4qaoyz0wx7dkrclyaa7w051anmbg6afo9j071ohrui9qdfwxcl3dzbyg6c45xxir6al87aar2e5y6zl2b12rssfyfmok9cn5a5z6n1lovq554l6gbom4gy8bmfoyo48zcj7n0ssva5szlb8bd8zxv7hk49hotq8ou2c5ssgjqfp4seujvbewqwjc9py98idmhat8bcel2q1u8rd8hx65757hr9hccnqzkjr5nb5sd436fi93p26jwrdh7yop6j0ygzkw08cs6i9g6yxiusyzzx0npt1l4qdovi78qa4m4nysgcul7kh52gxfh1ar1jgd4yg2jyrpdt2f31i1mni6xz7v7ymctr7g8v2x14jiwoag5a434anm7h2p7qnmn9kykx822jenlq7unnrs1gw3q8js3s8t2g4no6qtiq9wrrsf7eb7crudeanlhbo0fp48oxhcn60l7syvv4wnodiqycdnf1xvdvi995tx92wp2o1413j1fasee7g0mfzqmnt5u09lspsmtwj4',
                sort: 973404,
                administrativeAreaLevel1: 'pb1aok29ml9xud6v19uhmt71w0xe2svrjlv7xzghgwdty549ze',
                administrativeAreaLevel2: 'z2a67h91ckki1qha9xfattt61s7l8v3sx64hms9673lq4kthggv',
                administrativeAreaLevel3: '4f6hxjnfuygeypz3ebpu3hwy206hnluo2mptodc7w55m4gebls',
                administrativeAreas: { "foo" : "bar" },
                latitude: 534.09,
                longitude: 975.44,
                zoom: 44,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel2 is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel3 is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'nf',
                iso3166Alpha3: 'y49',
                iso3166Numeric: 's0t',
                customCode: 'ibhlx192zq',
                prefix: 'ui5uz',
                name: 'ls2xmrggc03wn941j00l3w77e12d7zql4s5mafcs0ffvd81lflzkhrgaqnjdte86ebkt9khkhfdebtua4r6sxj6us4dampzs6g4h7557deaxxfjf4031pcqnp4qct0kd04cej4kvziyvilnx7tszjopd8j3dx5iog09gy7fn4y7maixghz2y45mw18y5d5ufc3ngguqstczxkdk157m4smi3cvcayjd3wxg6b7hu0owbpf8zn2x3jg2b8j79me4',
                slug: '9c6u54t7dxd48hoqlv9cehwuehd5yyshx7mx6whz4n38o130gdwh9710sxrbz7l8pabobu086c4rfpp2sta08mvd8bx2ajga4kayleou8k51t6vyr6wxv11v7plxcmhrevjzddhdm43w9vjzsgm18q66f7wv2jb9y8b0ez47y75h55h4bwbtd7z641zr5md09kggmg3rqtaed10mkomq1052jz9iti8zwqrs6bkrekoe0nxh4616h0mev7lg0eqh5amlkrgb9eqqltjfdx3bz4qmqkz1zw09fprz50fyd2kksls2nny2md7ixp3n0t5t60jnta57g5u6yphjr27vi51r8bha7nlxp21akgak5z93mgcz1l62zd2vlh136d0tj4pyppagnfi38wb5i5l3y6s0m9628fk91gdho07bql47yqii33km1f08rvpiycf2eocr1vh5vu40ibqk2280z4cnlm7y2it89aqebd9ognzqmhlswchqrdu0838fc8ah94un9g9ybbr07o0kf9xjpg0fzkjgngb2rm08h4eecloh7yf7fvhfd05qskspsdcqk05dqpbi1lx15yqx8ct9y4j74d8iyoslslyy5av32hi6803126sxwuhw7ve8ii519q3aksop5rmnne3ulkqvplcj3qv4m1b84f4xf8coat3dohejte1rx7fdr0ub0ii57flbuiro60k7oml1qcv5mdzo5otbygrw4zuk62wxijtetq01r5msucbput0kfsd9lm6mkq0yjbxpdrjuudx75kf1rojzmmreuw3aogfb4vd7rqiwy7a2t5ychfi73r5ru6ao4v8ntcf0r9xrro3n30amlh2e16wo5ork45dg154gj8rll3nm0srm78slubql7nq3wb0u7m2otbvjk56ch9x3l80n4z20a3ad4rdnyguxjzp5aemvbi4h3w3pbd05axpirdrc9n8m1v13c8ragovi6wwrk65kynbockzsgo92h0gpbzcd84vnib64wrqi',
                image: 'd1lwu80d2njgmxhf5ru2l78ijrjfrff462tgieqypsf02k10rozy1m1i65wpkgx2quuiklqkq9iwzdp0yaydbwcqcawo39hai5nsttz27yyfpwx2crnyol1ghr6809knixe4t4g4ek7ochp0qjhipqo8btzcr5fhacg7ykkruiaceup4m9pqkjp20mrdxt6r21zr7srlspvqui5758vf3tqcew2abba8plnvpc5foa9vouboqpfln6z6bzb1bxu9292dh8ldfdidrlw2l29i836ion25f2fzp57c4lm3hvtoa025liyj498uv64t5tlgx2gyzvp4fazc9to1nhtwvt1hxcwd8ef8eujjpv002v0d1jxwkcojakgtsxgd1flkc9m8r2fit4hfg3r5hahf68rvufsve0c8zu13mm0mbev4rt5kxtu9ny6rdrmvqs9pkxc75iuhnu2gbsacc0vwtpqy2kxu1g6w7b92n9a8we2csrpwej4d7gpmnqru3nhjcj83dbp6o4ese78uqjxgoim9z9o3yfx43086srz1efit0w2v83rhim1eqbt2x04184o7zciwzvlaulk96cf9eof9ktf6q2cfvb185aoyykp1lqkkaumo164gwu5u1362k5883lxr7q8afpepw13hjx72x7b56c3ld0xv21sgnszfini1egmi6q9uwcjrssf2mfi8q2roimqxdbdvq62p9f5lsvbekik2dw8p5kv0levyq2w470hoh7ewdma8etenmo4ftg3nlt606kc1i13uvokx4g90kadliyr7cpcywgohkykt9fn1iwe44jgk5eqm32f3ln15uault0qp3b7aygiicjzm0zze09pvwloehnr7ue90aumgstz2089w4mzvusb8iz9i6pupkz5tm9jr624tmplwg92sr7eckae05fzs61h1n4mp6tjd64hidbnw6imiwcohmeavy5fv0cy2j4usppb7i5xhiunw7e1o4zvkkw64r9mvcvrqbrw79vuy',
                sort: 772694,
                administrativeAreaLevel1: '88fc8374mg800xr24zq7gi4emobmaz3gdplokcq6e6yo9s73n3',
                administrativeAreaLevel2: 'xap91v0e5ptlctjf8c1mu3yaxbernf1rid7ripl3jqw43b9e53',
                administrativeAreaLevel3: 'zoqge1czvvbudwlygn2djtnfahxiprwa40y4wf8def5tnyzzbi9',
                administrativeAreas: { "foo" : "bar" },
                latitude: 616.45,
                longitude: 585.86,
                zoom: 64,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel3 is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLatitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'o6',
                iso3166Alpha3: '1qt',
                iso3166Numeric: '1rl',
                customCode: '0oi8apecm8',
                prefix: 'nrmpn',
                name: 'k3w0kulj4ti52k4qkfpd59mt4fvbkkwymkmpcvp5rsbs739bcaet6vnr3iqudlehy88c6x747r6r7t7xps8i8fxl2kodfe8wce2s8ui5keyq66wwu3pza6jfq4oaue7dknwhp6abmd2dcagkff82590tjby8trqmpfn58iir5ss8vtnrr1277ugm3kyjr62jykykiigfqwhuqs9s0m9c66mti86jowqt590k7d2ewqnnpk9awoogrd9em1ooec1',
                slug: '254t936chrgof6y1dymgoiazqtni3y9bg7tpighdrclfxsx6dkvqtd23m48cv4l6cizb511ovdmai0elmvp23d4gew7xw19d767utmzdn8rkawe2dvvsxn73llwnwi44g8t0afltz71qia3y2me7khs5c6lx0gsaceqb3ewuelrz8w15akdruc8pqdurviejeuah5thknlewak4d4tlfmokj7ul10w6ez5hh49u721hhtc0tmn7cil3v6uxp0p5iknpze8mol4a5mdq9nvq9oolbe2qbv8j1vgzxntoflhpb7xz3ueqecej33wncpkhki075n3z0pny3hst0qkqcemz9fgw3q9fqghaw922nrl5bmjfoqun893j0zhqdtkrbxaw4w0si4kkk0sql54o54acmq8d3qn9bx6arxswypmyijlx2l3xs0g4m61hlynh8zfvzly1v7cbesx2cajke3scld2eawvmc4d24qah3cpnq56evgahwo0mlwqy9lv6k0sdrnd8p0xjld4vcim1q0mm9mrwsjw4izajjag95iyk6d140htp87g3c8llwizptijzfh35wy5hmpyz3h3dvb2hld0geokukb12ebfn9s34v59b2sj7xo89bx7gofyrhukjf9l1c0chl18ofh7hd2mycavb6yxovy5ah05q6okrlxwhq4ldzdh34iy7ip78xa1x124wyamevgax72cpjihs2qvsje2pv7vk82gwy95pwk99qsidra7mhnw126pw79urc4u1vf70qwvgkpq0fb4shg8cyqjna2gquw3kw04fqfctfxgjly57rfgundk8ytz0ctgwm8htq3lx3ngkbqtysyijy5wu8oczxgkrqt4nhwasxjnq6xz7hmt6jz12jvhnvzl7ypial19on9vkefl2pqcv11yayosbq6a4f77scup1lko5cpwpziggutog53zfv05xpo8pckz1gs6mg6tpudyrc54z6gp781jl0zf374j7quoc2kzmiucz7dz4x',
                image: 'hcuontx8a8gzzwcyh3yi6rof2hloxr7um234d7ymigejao1ooy2w6hsixn413gead5okjdwvm639xmugdgh86gjz4fal54uctvnkp3yrfj2rjyks0tbvn5z6ob58rm780li8huz5o37auplev46my3ge0mc2vk1xuvwjx4bfnrse3avcjgmkml69jh2vvz0fp5yw4k9sccbmghwj0o2obpyvzmigvnwvxn3b36uh56taeaz1a1sjt4eru9r39in7ke0lieu1grzib0oh65voh4zlczu11dvoaediliwtwt96dbxpko66mf277r37s2jdx1h2zmnv1ohtw2zgszlgydskypk9ntpuysyph6vczp1smdbz066r1fv2lrqv9yn3civ1vhbi9o979arcz7y0wt5byoo5maga99at0s2pg5jcg2s3u6ixgw2idjt1imx3fav6v1f9xz822ramwahmm92oezyl6ungpl183na5x6co2g7uxffaznp2s2npwg5i29g5t45glv17j36ae6jimxqailr7o1k1kt6g6g3j6kjjqgm6oe4rkcri7oof5fx9z5j6z8qjztag4bf87w4fnr59v07nzfhili9pztc3sy3w55a2m1ysr9mr39qzbb5qrq44f9zfpt2dhfomff87d1ri9zh8724mr6gasc0os9y48n287r8srmxkvwcoasbqiyffkwg8nzmtit7kjgrf1sb8ljnnrhcf39dng1jiwj9hy8cxwcnb3393f085nx15zyijfcnc67xjgt0duj7ch0uwyt4vldls2nmsp8y7toddicevwpnfobam1c4wdg3arxp6fihfvghtf95wlwxm3gqyht4h438m5g3bz6uh6icdz0xzh0tf06dzcc2mrh0bx4mql1u0gdlphrdwc03fxdqs3is8dk68uhn5ypruaqih3ffzlnm5em6zy2otn6pg21jsy837j3o57zppumgjdr0tlaagmlf46yhp0du7fuxzvbnoa6xvz7xc6vo4q3s5',
                sort: 639259,
                administrativeAreaLevel1: '7wpmbjzixh7ibt37z3jge9p0n3e29m5j8i16m5xwl3g5mvr9lt',
                administrativeAreaLevel2: '61kj7l20aqc62xrxplw1uz2ee1a39qi15nusse6u8eanqqc7iq',
                administrativeAreaLevel3: 'bq4bcms2e2hhdxt2u8wllh7yzoao4529rna0z0d3kpt0nhfjru',
                administrativeAreas: { "foo" : "bar" },
                latitude: 255.58,
                longitude: 206.93,
                zoom: 30,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLatitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLongitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'sa',
                iso3166Alpha3: '9m0',
                iso3166Numeric: 'r89',
                customCode: 'i1fvsnxr0z',
                prefix: 'v5ad8',
                name: 'm3t6oi46is18s1d727u1x602mvr9y52a2fw1tn8hfwsf66qapq4inpkncy5v211ccek6orhbwbep1ky3hn5laaxb8mnv1r02fpfkd2ubygcw2cl6qrcguqxgzfwzkgjjcms8gitar3ukhmxv1r0oj36l3amig9jhftij35ocheesdpqkhe2b5z5c4627e46m6z7mvxzsa3rlndd4ll8zub0nvdu9b1wdpz04by7zkchuccygu01gmaj6o999svz',
                slug: 'q1iw1koug6nz4w0ueiccpufccbcvpvkfh4gcfaateyyytz3ejhs25frmomvp1klpc14y8mcihfw3oz9u0qbspizs0xfcn4g4vlpjr81rbllslya5mhvdps3m4k1d01dxwrsq1jp1igbxxzk3amq8triyg6vvcezgclwndeciw7vmu0yo03gcdx4lyg5d7ya5914wgp6pigs18a0rwivg6xa8fij20ud8tdtvkwyf6fvthiimso0cpq56qr4q1bupkl4zsbvwrb9q7bssa3m0r3edd054k9onuag9d1j0e0i1xrf51n88sunz7ox2b0il090jihs04wcjgrmja9f60kqi784o1it4lsmeyen9cmdzga72i590lj9gslfq32uryh098vzxz2yxeavqeroaq5euffjwj1uxzko7nmslwuk93d1urse5dpn7pspjw7dwbjkzz4zdvqwftcqcr5z917a93bl6gi16t3yy1yng8xawzlfbb3lh3b7ik3nu6b5opm7zpez200vluvo1mx88parvgu0xvuakm39m7zmfoaegajmoeg072gtcc99s6vbtkuex57jw9aqk2rqzi343sinav0cmv50irn980swssg415ppotp35ms201hfqjsx0tux6hvnotft1fczmh1dbr48h6tsrptjd29gotbhfqijbv3ork2l7fefd674oaa8x86s5bvgmw64xvawu05uolivr8u3k9dz77w5xqmkcjf67hli2bvox5gt2okixuu4hxu18baqntqip9484k49hpmwcd4613hvoq1m8z3lgmmmworg49jql69prqpft05jg02jsgghumqs604slq6uwa3on81ecrw4halntaasgz1gbombfxsqzirtfnlglog1bps6ogela81pg0aclqqgtznb8kcxhh3jjcp73n53u8grkcaklgb2sj9r5fxws9nah1ovyrr5vnmi6zi2ui8v98i5g9bi7hy2wtj93c615crv8812abpougolxhyjc6ihw',
                image: 'ecxt1rtdfsz9uu4v3jd3vmxre0thjv7qyari7w5drz29119jyg933k1nlcwbh78oa3h4shx58ocfcb6ehq8p1grvh2v7gzrvcnydey1iqkki9sfsf7klvrto1oirhvpqixlyehv1ec92n3kgo2xqnitvcunov2ufhcrglgaa5583ysigucs3ogcviqc6oai7zo4ryfg38w6i1fxpkvkb5g2m59bpv4jq0folknygnze9fl2ylqg8dj2cjwegrxlhnfdg6yyfobd9b13e27b3ax8bb6nphd2arn4c1g77nbslby36nd7nck79qjbiat69eaclsffuubkjp6jsuc9drukrkaqcfyu2o5p0byiqxc9nu7i3l2kfb3o106xmq5tlr1v6jloges7dx9pkh6oyd2fk3ovz4llv3l2uo42ju59gl31k7uuo7zkufzooutvdnhjcsil37rfg66n0w6qsrr0vxji7os4ltwlrgycl1nbkemldjl3g5uzznz2xezugliuk7wxe2jq4bigm31gme4f6cfhwqsjiczg93skyd1ykiuxxo646voae3stitm5g4h9jnoee2pc714qe4qjxylqhrgllwyagh99r837fqd5z65ikogvgtp89x8nfp42qcaju7acno1k9nhqitj4ldmow3kwxwljo3n1w6u9vno1gy7m285d216sn33y0ntigkgcfyw561cfn22detpcwqeohlsadrzrg4fkkkhq14cjczcyx059qlqw7lvtvyruadcl0nn03njisbstf4dm4o68asueed0fmc8v4bqczdh78hiek8vv44962fpy6awmb193ecy12nunlf398l0r32l3ab68dq5h4hjriobodbotd501kui6zokgkr455genlwpqdey849we9d6e4c77n1jas9r9666fv9q02335mfd0wq0cjq21ln23p12bb9zasdh8cldzrmnvocqmzp3lnvcybc0on0zexgqy2mnng92etov47p3a9xixwlcejpm5z',
                sort: 996285,
                administrativeAreaLevel1: 'v2k34fa56bxxn18467tohb70ndjk2iug97y1t71j9ysoe94xux',
                administrativeAreaLevel2: 'c0xejt3x3e1jc0pj2v3anw47n9hdetu4ogduhw9a651mg07nwd',
                administrativeAreaLevel3: '7p7makpf1ns3cihhjte4h6pfxv1i8kjbrmc7f2a58wlj9z5a6j',
                administrativeAreas: { "foo" : "bar" },
                latitude: 33.06,
                longitude: 236.81,
                zoom: 61,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLongitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryZoom is too large, has a maximum length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'wd',
                iso3166Alpha3: 'bw8',
                iso3166Numeric: 'zpg',
                customCode: 'mgdkv4o58m',
                prefix: 'w6hbg',
                name: '2us2k16wxlquw08yegnqmo1vwldx2vceuuxp3a2uks0tckxmsyeemytccxd6tp25nczrdlznis4mnac7xti3n0gtu8fjzgqv9nai487c4pgxxiwvo1kvvg4lshsqdxmsemizvwsttkq7q9v04mi900kyda98rb7nu1j6aeaoc8ko7qdw317svy3a27os4evj73j6z92zomwz84ax2mpsivsokyzma9267zyiu6ksz0opnvqraek2pfsx2qfxpa2',
                slug: 'h70j1h08llbq13gk19v8thtkodvn1bkiqn4l1js1r6rtavybaavc6zgh2dgo1svjardwab6oslsztsmqnndy3bdz4dgfbq6ga6dnw5azkomcwyeco1sth36ovmd15q3bt902o9xk9wb2haq8p9ecb5e2j4p34d3jni7fqukodcxs1wwn4l3fxvm3v3xbbdqj578127e2v8rzsd6lozr5bbpgherx0nbbr1pfnm75uxhs7gpclr5mr6bh8xlqzmeo0djos85fsitr1zcwnzrc0pa2egizvmpzgtvx6eqsdqwp6xtadqg7sv1830ykcyzne8u7hjtd2j2er6idvt9ch6z7t4b6380lmkg55zllmn3pwfd1jg1iy6hib8i0x34pr8p4iuod28n0axg11jp7xz7wrobsz0v910fbcmhehliz2aoadscne08flmmj20b1z3cv1bsrwuf7k6w1e6zoi8grcmj6cyr545bmrmpnbepc3uviw4aozk7rod2ahx5ujy6u4fxioy9bch1se65705xkutelwy1tx1ravq45ggmplupch7bndkcyfdgnjutzftm2vkaqcjiq6ii029rlf0aay0h3e1nhmlja0otjum1b31e3fus22zsqstwf7fdewhnixjzsof0618a9m35czk9iwcqb8gal5knyqjltovqv146pc8mnhnojhm5g1rw0pax8jmtv38ce3rbsxv2g02nmxma6iysu5yglvjzg54jzek3i9etv8srvv2djduw7hiuogjo5xgxy383oglbz78r5tyqhbcy24aelvicpzs1gj3ju2mrcx4i2xufpa51wykke277rkex74qoi9gi5g0ibv4ih6fifdsb0j9zfo8v3vvsmpivjq34jdsm19nvjbsfnet2fx7ozldqc4tmxtuhkwsmxxoe2d7jgytktdnv1w98ackvpef480fczn7cesmywgpkho44yv41t000k8qiz3qcqwpt29t3cewuye3dk4vm5ihay5i877o0fhc4e',
                image: '2471aj40vhgxvvoyjg9a5hxm32r0jvjdl0xh8ytx5lznxc4ydt49ugl8ybf4y7jaxo8sqc4w52m6kti3yd4m3z4ivxnppf21y4x0pq4mpf4qymem03fasviia4hvuy7bl2r9rh7ankjg9crj2y7qohvopyig8x553cf30omq8ks52oqut9pb9gdzyjtt26fhth3lz66me7dgst9430olnjzrhp9crhgx4m09le490jkjhzsjozdegummu1k7cio5tv85ytevay4l0fy6rrtsubd434666o2tylkdfml0jkk3otb9iwnw56sy7vd5letm12q8fzgkjc8e8atdg9p1pk47vxbcx17pgc8v3b9enople6z11gcu0rxgjiun5fuulqs4dhk0fsnbnuxkdjxq96gmhc067zz1ucq9e7eqry1w6l55tkqxyv693jejdunycjskh47jult3eg9aq0qhdecqkydao5uewoq00bvv1z52mjh9b0w0k409zisio8lvrusdym4fvo0ob0dkb8hdf2suwxpdau51ipujq9elvr305ufngtaxinwv39b5aqh5mjsi37f3mb0nrmg7zqjlmxeyjmjwg2kk058uacfrc5lrfjvayzhbogl4hg8n52sjy2ks1w00tdyuvutplzsjpxcj9wfzyd6eoiiebd18oud4mh9fniwq41l9ws4fgm9xabj0ib7ciyjk0pfxpoaqw9bchbt8be1u31ysgfnuqio7culz1el3hz47s1465aljqj15prmjg1b084dware54me1v6j0il63sdjxk7c1i62idae32cdjykin7qcjhjkcevyzr8j5648pf34j712gcsnmuo2eak4gqewojqycbfozj8r84mhu9rierkuvt48h9ika73v3pgvurjed2ps804d9rndpf5wn4ual0blk864tbep7d9xj3g0s8vhbsklxd7whe7196qjef2xg1uib9jz6p7tavpnc0ckfv4vvjb864clgeb02hiqspeois0y0',
                sort: 844424,
                administrativeAreaLevel1: '97yk73sxu7s4r33qn3fc35ip2zn5hxnu4q24u2zm37xb6f75ec',
                administrativeAreaLevel2: 'y5yp420kdn1c1n2sfeonzz7sahsttnffjqb4m2x3n3em613ql2',
                administrativeAreaLevel3: 'palr48ieokrjzuv06olih0i634d8s7eu1hvm2jdzjyy9ium5rz',
                administrativeAreas: { "foo" : "bar" },
                latitude: 337.53,
                longitude: 511.67,
                zoom: 827,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryZoom is too large, has a maximum length of 2');
            });
    });
    

    

    

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryZoom must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'ff',
                iso3166Alpha3: 'ig4',
                iso3166Numeric: 'ax4',
                customCode: 'vk74n0mndk',
                prefix: 'pa0pc',
                name: 'lw5vrxc2qcala9yiq9nczwxlty4p2648wdzha8sglqrdnxqxij4wfgwuxfex8f42ivshkodksh3dj7pkbqdjhdvyusr11zprg4kq5hd0363rnc3gbimybayep3tqxvtuc10t54nyc2shmrcjrgito4ara2bfegktolujrb81k3971b17ya43iwqczg9s7wdvl487ztw0itbt5tvspsgrm6zt01aivu00utfvzk2ttt612eap1d7urpndi4n8mxu',
                slug: 'e747twpywoftsckahik81x8ei9g8o4ikv210klcm88p9ex19qncciaganu0xa65wkqi4l28psfplcvlclidwweh0cie2or4l48ch8qvhw2qfu3pdhkd5h6h8wzrmt7inbxq20xmphruk4yybl70upy9dx4o4mqi9vuwh56vdgmqhcwexng0tigrhvfema1gi3annxvaf65llai85ms8wm2kp6hnjwfuv20ir4dduu9hkify79n6unzf09m3cgzz79tmhiohmlmm937a8bv8o40uoipdb631721nbyisz9eje00ozq922ruymkeyt66aomp9ogua8586xf7vhc9icrgl45km6l2f2efqe56wl4cqkpam7uuwiki06e9ayih5jy0fs2pyp25huo0hoj0akqva4krwkn24l1augbotdakshmjrbuzub26kwcb1u2c6ovarx6jq8evtmfwttjqm7p50srvifwbvqrun1jh2hv6slqkxdx10dagf09kbz7qczx9692a2wyf048sew8zorvy0y3w8bs47vib72r6da4wc3otlp60injnkv5et06cao5yuwmrrgam7qdve2ca0pkfkv8d6b21s2ss2jjkzsibqesz7j1t69mzighizbgisu9svkwbwjmpwa7btzhx31p5ubpsobgxs1eu4lidj2nc0vnshhbay4dn4bl62vnc78mvwh01717o271ki9qzzmogfo2gjqpcb1qb8vqw50kfs5hgrenxc0ya0ounhhe3es017jdzdel6heurhhx7wacwjjj4y8ta5k7ww9d6ge5a936eq3zqzhk9otkg5rgi7imi8dmrez40812v8t101aotak99t2y7bos84dn3zndhg1evdxgfvlv9l992y24cijdwx65z6b5koa8esjueamieyf87aloltxvnu8tves2mk0fz2gjts6s3svt5boxvqeqontf2gxzxl5g57763kripy5ujirg8vmpf700ioupkq1m7cp38diqexg3x6tmal1',
                image: 'xsbyk29rqj1oqbhcabub035srrxwx9hlp0l9tnv71djce66tdvf7w2awpwgqhac17f8eip38ztojhxqxifn3vohmvfgegokt9syrfffkbky861ekpr1b17ob492h3z6nwxlsz2qran2b0euqsogtflzhxhtpf5dawam1jj8diji440l75aqhg2rkhu3sx040egvae8xlk0p7wgzekhbfj1wlppz2a1g4qxkz80ojehqqvfop429sr1wb0d1azoxtmv7vtl1zo1sf4voslfaujrhfbt95xcxhxe9r5ad2ok5o9qr8lcjqktbgmumgg8oy702zwwrfkzjz6grrt9lce7iqwo945j0jbtiu2fnfnbk52id1dcmh6z3ze1va325iir3sy3d4jp8b5loah4l3iaabkhrl8lvvorptspxoa27r4gw5m8p5piqzz748rwgopcdqisxgxlk18d8qn7xh0bb952y98cjvt8rq70br5nwf7secc2v4ntytjvcpkyc133towp6vq0g33p3bbkskcje1rpmtvc3irom5ob64tfo0ufixn5wxwrdc5wvq8xu5f0vtinvedn7yqs0xr716tp36pcqucl6flq9kud1t1u1y836by1lyyb7etznc6p3128ajm80q5o4motg9dq8ofssosvemvzv6lc98vpops3l29ltzzcfqwmq5nqlx86wj3c8zxv1ln5l5foj6tv4waem2knzaqjp040s5c6pvrszn66yaa7modch66hxn6qok7awb29jp05c5njdn92nks3waquzekcs0p5lctu8mdn9zhdxzz6psmhhkkycxrsc39kidm63x9cbnwqa65honx4jfjr8hu26kxi490br0gh5izn74fuv61hr33d2kt1dx1ic14g2ev4fp4klqqw51vul2g1uiomadjbq49efnkuv49b0w8jrd7bkbjb0oa186n2nmhcr1ze8b5h3c1tg7jcv0vu34dav1ldh0k7vajeyhz5ys0rksnl3vb8gcoldl',
                sort: 581236,
                administrativeAreaLevel1: 'rt3qyzxrn04svsk7vurd2rs4qlbg1xjehdc4vlnfewknrwviws',
                administrativeAreaLevel2: '0944bpfzwicymo5zc4zgv5rc3yl7ikv2b4b9vglrysene2igda',
                administrativeAreaLevel3: 'lw2b5xsrdnhpyivb3fzdvdzxprjmic0sz15d9m5q1bo998qc60',
                administrativeAreas: { "foo" : "bar" },
                latitude: 96.09,
                longitude: 997.25,
                zoom: -9,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for CountryZoom must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/country`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: 'os',
                iso3166Alpha3: 'x7i',
                iso3166Numeric: 'pxo',
                customCode: 'di0augavuj',
                prefix: '0ww18',
                name: 'rs92zfz1xhu3k3fp2bfrgcqhv33p2trdcdqc9jim4hh4jmat069ourj3soyobzkbu4qzclorh37238t3ga9673mk382hwuwa4528e826jl0vwkehz1aw7s7xrs2twqkv1nejs74zfn7646kpf61b424sclp75jj18j1dthee2sndtxck0z0m0iazq1nw9v0kd0t63sj8yyvtll2g07hvvo1gp7pe6k84ao5jofcfh9bmj1awdrdrigxn8ym65og',
                slug: 'xs8e8abc2x0kxkveqpfqfnnp0bay2y63pa1a936cuxmgawudr0wt3paviqefgzlh743s582mcfjsjsagf7vx3v62g5plwi5v0u6qr1alwkutv7ayg9u3si173t633jhaf8lx4mxlf31knh81dzd0pq1xrttt2vk2s58da5tlpiltonht6x6k48oxpm5hz5uxlqjc7460oaopby4mnfpxmxkei38ifg4foixx2w1fl9cflzrvz5myvbt8w2cby4guf404mgi5uxpi5hvr9dyycy5ukvqizpzxb794tzp3s3n7sz62wqmmeivk5qke1riyiv3jvhji1rffg5c2qdpxi34dgfvvtza2u1jvz7x4la8w3hlicrfc1ao7ymk7oosbep43n6ohkg5xqq3titbb8oc0rzwn3f7c8h7cqq6vj7psqfsfohklwzjf6yf3heth1hyw8k7lc33f7en83qihht7ah68jysriywx6rfepap7wy5stb28q6pmo5df02pg8q4t0ktxo43klj2w9xjatimpm6rn5jalazfywv96upc1olaqaccfk40sftzu3e41hjglcnt44bwcyrsfxzmgb90yytmvvfe6tis24sqow2kzn3f9mgbtg5sppwm6sid5a3jnrfz5guszd5o33k37brcn9s0qqq0vq13p3d1vb2g4cec4jm5590363wmyk8z989dai8p90lc2gssybqlpwfw118ggh7s6hnqg4q5vrzbj6bklqamjhtqei5u5w2yrt7x9xl95yj5iie8ntldw1mi5ev35fkai36l5d8mbu5bzktfhp7bb2w3gxcbzzj81800liyl66nh83fkt3rg8fbmxumtt2zrfuxcmgcuije40ovemfl10jy3bp8p0saa2a3bqs9m3gb7z1nbww4xp7rx148ozbrv9cazuszg6jxkishpouvv3iepxxewc8tzs3iue2j5lk09vrdrgymkax53irjeu1uowwl5sx71vsvovjjshblhwmkemskoeh89w8',
                image: 'x072cdzyzj5ecuf3bslvm8ci1d7bkqcq95bcrsywfx1ndnosszqg2bo68yc0cl8g9mzljgp13qfex9omdo8wkug799zg942evxehornc2eftkzmp0tq220a11qcrxf19otxghc0jyrpy3ql5c34yi7helnrmsc2ah40gqsgdnoho11387qd1ru9j3ydu84ob0nqh1z70qzqr2u08ytfpfugblzpj33j429b76nswgfqmchb365xgxzrzu16ehonnt9z3lqnigbqxrm66gqrag43t08zhlwtvlrf1015nieszf8kguu3jtvtfs43csi6ub7caz94s24dkzh4ols2fbipd5d2c8t417gbdywma52408qror8kecsgbi2gakzoopqvie6rwegrkn08z7557vu9225ujjv41358ianxo45xi451zk4bcujw6zs5ru43ntv8297w80e00ha33i2s0do8y04nx9z6eff2x3xf751u5zeuebyxxewgtw37emmg6fj1pc536nyevbyope8wl921f1hl3pfj3s7ucvplwi8denkcry3uuicxnh3f3i5h2jfti8u3dp4k4vuox15xkr4p45lehll64b5md40cka16c0zpq326fl2jsaqszackwqxirhsadjhqczwk46r5q6syba3f4o19vci159x77kpcrjigh1s8v1qxkumeyln97jr75bc88wft23c5s10ddcgq2ozc2neoh9z8ssdy4q6dz9l03oxjgd4q4zgbm4ed77t7x7j9uirmsdd3jgfl7my3rf5o0m4smhqpa506vsd6onjd9p6rp0ek8an9rgmtq9rhvsclcte0uu3jjeks521idc5e6ld3vajb3jjb68qzx9lxs8xm8tm3afwiltcx8z5s9aebw8nqbngge9pjiqcclysn47puu3murhgfscgd76js6d569rvonbii4jp86q00jn88e9hoi6qcq8cihz89mqaeprlo2dzuhhs45ejtx4a812awrr5zttdql33ri',
                sort: 116678,
                administrativeAreaLevel1: 'cnolg1tm2pocbptr5udjobw24yyttevvx24do714uosnhndp8z',
                administrativeAreaLevel2: 'wieo45yfrnguv3kq2vwjkkhuezkwkhm3xzf9vdgygrwrrzhbkk',
                administrativeAreaLevel3: 'xmwev0eeemtp9owgwgxcmmw5ghxe4r5qez2ol7rgmwjgaezlfc',
                administrativeAreas: { "foo" : "bar" },
                latitude: 626.97,
                longitude: 897.16,
                zoom: 23,
                dataLang: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/countries/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/countries/paginate')
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

    test(`/REST:GET admin/country - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a0cf26a4-6185-443a-a79c-fb2c8e8c7fbe'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/country`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '84c3b362-c796-4d8e-aa75-a9a7a8067cb8'));
    });

    test(`/REST:GET admin/country/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country/296f42e8-89bd-4db3-bbd0-9f75bbf2ba4a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/country/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country/84c3b362-c796-4d8e-aa75-a9a7a8067cb8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '84c3b362-c796-4d8e-aa75-a9a7a8067cb8'));
    });

    test(`/REST:GET admin/countries`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/countries')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/country - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b33a852d-a5ce-4171-a532-6902a2edb2a8',
                commonId: 'ef96f4df-c476-4e1c-a445-dbe57bfdf549',
                langId: 'd1c498ae-e8e6-4061-a2c4-1acaa8305f86',
                iso3166Alpha2: 'ey',
                iso3166Alpha3: '3kn',
                iso3166Numeric: 'vih',
                customCode: '9tovi9gg8d',
                prefix: 'l14mm',
                name: '48019w49ex7n196hnlrighi8glve4mrybl1y7hkbwqf9k99yox5tef4pn9chg2wxf0nm3o6c90gam8yns62wmzd55d0lffo7xiajvden49e091k8apls7sd79iw5s6kbnk6algomngie4q65ugm4c4uxp7h90m95da71r9cmclus1pl83u2qrmwexj0gotx4pkpdcq57nvuntrfzzm7rejhd4c1sunxbfzwmqie7ymz45lypjyqr3st67te9hr9',
                slug: '8teo7a03wnpdp4drf0qc2su3jy2eoi0xset5g1uman0h7yn255fd2e7wlgnkf8oomjs22sisn88pqwnrvhfsl70vbcnwiqv8p72a03ornmztae5ci3xeqcb9j85la5gz5cvpozxlh226ov238or0gx8vcnwrv7f9gqvfgkxbd6fjoyxupnt26kz5vpau2y327a9pwy59ril5irqv1hpeg3i5m6nu0xx8v76fzjqzb5biywsxdwzv6k1t2um5ho84zcwzp80ar32peq0mni7wbjiaahdrhjuqanojy4cbjs186nl4zai4ujhgyjywe0bjpqeaa5pvzgnet5mt4srpucn2w8vmi0lux3izaw9a0qbs29sdac16klwfsh52mdyeiq57tn9axsqjohwmec1tmuwjltowb4o57y6sv3bgeo6k900b6tycpu8fhmicvi2z77n4t9137w6ffj6cb52091jrt60ws7p1qgsfqjzt60l2z5iy6i2gsl3v2uotaobb8fc43hs7k6120hv65yjnstinn7t9ri29t2pu0brpacu4n0wkplxbh4obzau85geq9baqh1pjad30djymtow4r94euija21mqwsh9417r79dbs5c7v69kaqkme9of7fgmlakbk3o9m3z5aiou7zdqetwy4inzf49nakef7g98vi2apd9012ry0avk5rqvf00trqs6pjco54n14k6z9t5gfskf3bygyby5xp1jl3zjcduknacrpnvfujdpoo6wryozkkg2vqynzp1wnwbv0trlzi1fy74uq1vlqn42sigttoq0hrbnhfve7zqmoxebomx2axa22pc1wm5ezg0m8doq1134uzgze2f8qhzaygdhxiyv42ham6p690u3n5tghuolimh2kw646mhwilw1nmgdzxlnuihnrpg6eqm9rn06ttnhwjo4780rzvx9xnnwaitkvconei4u97mvy9xjxw2oy7nbpxh921qwvpgq8c648dduivlix9sa13h65ucfuh17',
                image: '2uw6h6pxx6exam1wfumm4185mwn6borw568dyuuzyr4q6xaw78bfb0r229zyhz4rfcgij8bsrylig8qudzgkkiwyk8vc74hg9chc7nalea1vaoo18dqpmcjg33l02pqqre88j1mu6ck9m1e43btxwbdz28gb9x58g4xq1cvsg0nj8vpyhd04rvpnr7vssolpytltd2hmhrp3maeaxxhpxmc1jjhs2f0k1rko1tnyw5ytamr450vyltvmchcjmapzxh33ev1b80fx7udw29b4fde2dxjyt4me4ni4819zlhgiykst5bbgr4m24x4skzv4pmt7jftarlp7i21k6plyporszt3f16quw4syc8goxjxjp444935ffgv91oetiwk11gx7nyhwpgtk935l23cfkdeyngtcqpxjcswsqr0r9f0p5gupk3rb3i0m49z7rwewl1lwjblj361104cfmhdca376az0y2sxs1p5t3kkptlscuxwc2op768tm95hyqeb7cgpf916uysupw9h1qu4otehme509ou1745w1q8zcqxpgiwmq9t1nnupt9qwqkeffat4p0zuy0dd82f3fniiw5w5ywr7vph9fdfy71n6tgdb5bexdiew16hdqmn5f03xlwyhk6xg9hnrekmup1z29e2xxilpm9k8qnznypphy3tl5fbl6lkzwh9qiejgst0yuk50czgck4e0vvp3eovpc3eyu5a902a287suxivebjlrblayblzx9uvduqxw6td5vvswr4mc82zmzlqe9pol8zqa1pe3pfjzlbn6ncjotxqs0btilzx5nn07q2zj9qunm3rtf4i7eyjbfe4jgts40mecx6wzpsdr3thepcj4cq496f8ijiy99o93bw2hvx0s193pc4v2qsyqkqd3n18rd2xb6liffr0724l5u5u68xhjv678u7edsmqu5odwtf2hzpzimhf4rxz7v0cogv6olipyjep35zuhrnm7mr8wv7deidjda6xtc54zftu8kxwgt',
                sort: 872066,
                administrativeAreaLevel1: '7tcs08we4kjv93w3vocajeazfl8sp6pyrhr2em0idn2aqxa24b',
                administrativeAreaLevel2: 'izued8bs2iipijwr1ucx967ynmf0frf3kwt2i6s6r5zdrlwou1',
                administrativeAreaLevel3: 'a64yps7d4avmn22eqtg035mi8pil4j0w9d1m0l54v5b4bvwvb8',
                administrativeAreas: { "foo" : "bar" },
                latitude: 203.43,
                longitude: 932.07,
                zoom: 13,
                dataLang: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/country`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                iso3166Alpha2: '1t',
                iso3166Alpha3: 'bl3',
                iso3166Numeric: 'zfi',
                customCode: 'wjoyowsv5u',
                prefix: 'w9xap',
                name: 'odll1b9cwpnzwmz91xjky3wxyq54ap4k84eblcfml9ota271rzykcpyym0chzjdqdahlq1fpdumzzsim1oc4x93b0dhwwo8uqxz056iuepr3v84e4slog28t33v1386dfgmy7798mvfhib7q9j48m40xhmiizg2px7zsr59e4435befe0pwcdwq4fbbcje0lld8oqutxseazvxwmi7am4mrodw2oxb2rsz9miluci5jnr7q3rud8sqizfq6bate',
                slug: '24bqe6e0oqgh2xq2jh257zei3vpndolnh1s6se4qnrk9s6wx4ui4ps6m9d41o1174hf7lb0t5cduw0feyuunffub9v7sjuiqt0wghujmredmamv1u0ewnczyxrc6sbpj92x5wopz0v9kjsle4v8vhx0sovvxraz6qjjz7u70lb1pqfzaihcy1p7w559rlzoftr836za601z7bi0ocnn4kxmfpawte7gchle7zy1z2a4ufy03lbay1r91tereldu0sf8o53y0u0zkf6syb83pxqyw67mx5s3mz5dy5yho9bzmoavoolrfkcy2y6eaxg86kp6aoa6birfgu87pgicp1mm086anwsb4660rjkjg5migkyk0ebeet1ecg5qw41etcr6zmvfzy31b2hdwrmhilnepnurpg4qhczbge2e7pkwnzf9t3lst1oj3ofnlqgem4vxb7roy76pdnm0uyc59xnqd5ae3gmrd9ne8n528lrtbv8ocv0clscxwx6a81durjq4z8yxmsbag4faxitxl9jjd3a0owq8c9vnuyl2gasa1yekao4js4m2jw4n0ukmzc64g8q11ijfgwbqjk6id19xhk6ya1409i4drw3ppgs21i2j8loc1hb931hew3e5ypt6qmk9xzqt7ho4q3w4c9tzlqrd29aau0w3fst7yu6udky7blzgq1i5avkcgm37ih8clzupftkckk78w8puje8gusu848qspf5080nujtc71bejjcb3p6g90s7bljxzh82brsigb9pa3yt3co5mj4c7jjce1nrseoranwgx4x4l54pjclt2ybfgwllntnbndmfb6oarmesaabtu6h4bojbahbdenfo4xp4ne5uhjbwo4btfx8764prfad7slo8l2w0gkm0u6rgajaid4vohelygkzcph6xrnxhbq6o8f0d7swkz8z15jdbrwenh1o7pv20qt95jhrzofek6hdo8ew4ozr8s7f6lqsvh6y4074bu3t3mhr5pa7fqxlumjv0ko',
                image: 'j0o6neauetxeal0jltm57qzyyoxpbbmawb5wq4y9y4d4o2veu06oocs0083psr6gny90mvxasypt1dkcswzsr2wgkqe1mz5fea8sinpcn5knmr1qb4zkl1gmoi2q4tiuz2m19vcmbcp3q38jve1t6r54fjjvin4ngq0pvv45d3e4pyymc95m3mx2w394xm3fybahkh20gizel9to4q0biqm4fbhpv4rife39nj2lwkwi7gi8t4yc6groef0mip1n9m3za3jgz5aj7lo9wu9z4kr5v459tcsxcr9tvq1uzt2oh26i9pcxvdr44oll3tvrblkbm35qz06kpbkampou14h3ywg40fqz8x6b106a99zbfelburbp13ofdh4a1pob8v1e3c6r2r4yg16co53wi3vt74ob7uew7xcjw7n7i27e1e85tm10116yx4pevuohshic3unmnhh03fafbytvqat801yfe83sxip6kgn1fxc9l25qmy50563es7xv0co1j34ck569q8qmg8xxdi8z3eij8swfpt96wm5i310ikhhv87hjgsk5dqfp077cj15re0sjjqte4ida4a88j94f9cqd4cajwh16xopt3jw8fulfllqmjglllt9ui1qr4k66ekkhf6xzp0dpyd3e0egmpan65jdcxste775aczreptvgnlkwri7w42n9hrvca7sbfvaoprr4nu48faohsnr9r3b0naacj39br23c40a2dy9j1lt83cuiuivvgdc9pcyxz6ruhhxtbjloicdfbn8tx4zi37p049g4azcftd31slj8tvbdmdo7zzk5cyw1j6mf3omw9ooh8lvube7aoq6wou6vlc0liisehssezobmy2ouw8rf7816fb6501swairtp7nd1pkt006y7rfu0h3he6b4p4wrnvfmh360mzum9kyg2xrf70ufoes0ky0afi8dsa2ze5tsyhch9upr5v02slcbi0hzkg5wnoecjmbn1y1t36x8sfselz8pa6lars3h',
                sort: 701827,
                administrativeAreaLevel1: 'lg0my3ze7zcfit69l6xy1l43uvnxcoa6i5pzlq19a3yqb1lwb2',
                administrativeAreaLevel2: 'b51h4y05e1e46xus9k63jynr2eokly5ovw6for8crni09k36iq',
                administrativeAreaLevel3: 'to3komxrhtt8pjagezs53tljkn8d2khmaf1hbfmcs80w62mmd1',
                administrativeAreas: { "foo" : "bar" },
                latitude: 964.75,
                longitude: 748.56,
                zoom: 35,
                dataLang: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '84c3b362-c796-4d8e-aa75-a9a7a8067cb8'));
    });

    test(`/REST:DELETE admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/6c48b00d-0303-4993-ac68-5c703de3eadd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/84c3b362-c796-4d8e-aa75-a9a7a8067cb8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateCountry - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateCountryInput!)
                    {
                        adminCreateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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

    test(`/GraphQL adminCreateCountry`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateCountryInput!)
                    {
                        adminCreateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'c2b2e244-a387-428b-a682-1edc395744c7',
                        commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                        langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                        iso3166Alpha2: 'jo',
                        iso3166Alpha3: '2cq',
                        iso3166Numeric: '9bk',
                        customCode: 'hnk5gkwpaf',
                        prefix: 'vaaes',
                        name: '5zu7r4xx03nn4n0ydva52fqaw6unbe71r3g6s3f13fr5pxemng3bzoatbgwcnmvy7bs6vfy3zzurakeu4m6diy97ky5ng6lxvukmqfmww8k2eey6kgjsyw963h9oa69wk2xsjxewey68e6lzir3jjluqsbnr5hio5h299io57m3ighijmyna56gik2kfl8z6yk4p96i2jqjs7cg01uvf1u4x7uhdq75jae7jngsr1owhexgbh2f4vvqh66yapym',
                        slug: 'v4kkkmyljrfrr7r27z3yxeic7rerpcj2ixnpwdiempq3jrpy0podrymgjzg8svaw5bodj1h6yuj7n8scd7aizvyuyzxaippix2uw4ftmsp6rtbv9bwvsmt8azhct3tx6mklymvl96m89g8yw8mlgoki7wqfmbwaf8fyfqvpqdij0zkcub00bw93wuxm4p0nn5y5kwxe964i4wux7qr4hrqqf4awaz926vjx1nbo8gov00b1r8eyhs6o3i7jjzuhcclnoj7k5cxmc5fvtku9v01l0unugxdery8c381n46ywh4j43d8qwrurc7e7ksr6qzefyumti4mbqf02urg776nb3iig8xyyrs7jzhofi0y8yul2ujk62ejs8o2pp11i1duiz8hs3fh2l67t7c21omuf4t6v2750ylctvmyvx026tboa6a45iwdfzvbd2hg1qgi6vq234n9h6tuq7afc74ux3o9soi3iqvt8a1v77ncciy15qkdeviii6yshrg4gscum9j6v5loeu7ew7g2761yho6zujbqmjqgu2kyio5g20ijkd9kft006qpg6qce94ljdg93ry8zbzyx1d1r5tc0rgqzj58ura169gjs3h453uxk5irbtf2enboj12elbzmcqvowcl8ou5rh7tfky7j05f157lmo2rye91uz0qubaqlqmh1lydd53jri3maue021b7o8snewhe973eieaobmjeblweayqvt6vm2ocgvzm2xruvzks8kc99y5umfcfh8z40mjmn2adm688docp3vwkbch5b9o3ktx9cle50x6u31ux4zj0on4rzbq2fgv2l99pomtxg0abb8sgf4wemn5k8a7sqfcrn3sc1hmpxmijr6qexgcaubdfjsil5to1j4av4dilp996glb8tsii0j3k6bqp08vdhm0e2xsmxizi1qw8bjs7pvi3vycskgrxmc8v2ib3rey35rxyi674y7584q6n1u0dso9ec2d7gacoy2b3tzb6wrvwn11ogkjxv',
                        image: 'ypjbwyvichq2w5jiyw929pudsa9ccgt2idw7vpks73a5ms98j5l8i1kzsn1srcjpb51p8gk2i1kbg8rgvy385il7mfabrcbjavnate0d62o9xoxrezmba6cfs0urf3mi30ovpnwfeyoyt7808j73hycr6z7hx9lnk0ej5bb0p9j8mza3qlocan4ghba7s3v58d21zuceho0weckeoic7qc8487y4u8yj7pwkk38irok9unxxgfyvmj7h0ccpdr5rvxu13wzi8zl0yg3hcisks64zl981mgvtp6e2x8zwinpabonqco2u1fo84lu7eykuhv0k7pcdj82jso1tgntre8lp84gja33y2een0cpiet1b61cn4lmt16462pzq2m9ecoqkn396qx2n09earytckyopx23jbz6gpyzhhtwu4ika9i5wjjsxe5h6bjtykfzs2cx4yd59krz63266svdgh9j0aeja52s3k09h8jnwgcyad3508m32sx3sj98qy6lzqb0rqwolp8g8nux4i0hdtosxe5y0frntv7k1c5j63umwscfotbmngox5qr3dpms6hozr360e8trtabrgnrv87jyhgyrhnhnjgydmckv8mpk3qaf8s5wwq6ga8q5hooa4f2ngig2njuyp51x7y92c50b6k5aw1rzx3n0j63lghsgkwtsbx1ohjglfjl2t2jhx1y83krp2poggpwnzbj5noikaflm5eqmeacfymwjpbu8u6vg3lxlc5h8h8ek6dqfifdyhqw90n20830m65m6wttmhnj7ev4xut6k8e4bsh2jgsrrdf8e54aojgi7fuxopakfotpwf1qljqmyyveglbjaqzuea484qo3vlm7oobuujh6zu6nlwf8w25yh8esvxy2bimwshgk0ogyitzkuj52s9m67ldvv2irsso2ov05y2idmeq556lh99zzxofobes4h1pcfoyc1k9npoyv5skuf0dfcoahbh3k2cmo6misodwuz7wo68fwsig0i58g0k',
                        sort: 414113,
                        administrativeAreaLevel1: '0hxd48la2rgbfycshnknm59p4a33xl68w9m3g870hce8ag6hnr',
                        administrativeAreaLevel2: 'v1rwm5qoa0zulpqx6zczds1iec8ax5w4ljtld70ij1xdbcyz2u',
                        administrativeAreaLevel3: 'zf4zx2hzbheayrc7bisaqrb9cbbpz32pwuw4fz8eqovj9uytn7',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 575.53,
                        longitude: 340.00,
                        zoom: 52,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateCountry).toHaveProperty('id', 'c2b2e244-a387-428b-a682-1edc395744c7');
            });
    });

    test(`/GraphQL adminPaginateCountries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateCountries (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateCountries.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindCountry - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindCountry (query:$query)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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
                            id: '2491f492-24bb-40ee-99a0-56638200b18d'
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

    test(`/GraphQL adminFindCountry`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindCountry (query:$query)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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
                            id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountry.id).toStrictEqual('84c3b362-c796-4d8e-aa75-a9a7a8067cb8');
            });
    });

    test(`/GraphQL adminFindCountryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ddda07f6-adf7-4007-90b1-37f18471c302'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindCountryById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountryById.id).toStrictEqual('84c3b362-c796-4d8e-aa75-a9a7a8067cb8');
            });
    });

    test(`/GraphQL adminGetCountries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetCountries (query:$query)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetCountries.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateCountry - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateCountryInput!)
                    {
                        adminUpdateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'da7028b7-e20c-4bd8-965f-3b350fc6eed5',
                        commonId: '47af1c08-d0af-420f-b747-ea2021118e4b',
                        langId: 'adcc35cf-153f-40da-a198-5f4ffa163456',
                        iso3166Alpha2: '4t',
                        iso3166Alpha3: 'vh1',
                        iso3166Numeric: 'x8n',
                        customCode: 'ergrhtlklj',
                        prefix: '4a83m',
                        name: 'jiw3ywu6hpx2rlontzf83ozb4mfqww5h0v0flihs8a72j8tauylir4ulcyl4k5voi5obgdhf62mcdfzezp1yh5m2k2iqec57ei5m18k8i4m2qhh3omqqdl7q376ni59l5th4rxc7t9lx90f6j093umzwkuflt915p8z368zcp0g4j4nbr4wdxt7ucg2pma3qwkniw5nkcap2oeov1ch2pe00cbwr4v8w9qlvemv2zvpq3fdhtqwmmxz2fj4chna',
                        slug: '6idofa8glf9xkdioyh8ai6ef8tvfeu6qqmipppkzx9aldw6s8b6c94vs7493j9tatmjhlz83y2arsct51qed320syq7ap04bsdxyoqmmwx18itiurhuxq8cwscyyrjya64qnnkrdciszchiyjuldwwtjvpbob1j04zzjmhgqa9axk9m6rsfplwuping15rt34k21bl1730uj4qx9jwqf1x0uvrv6xzwoxmgo0xw7rtsrwk9sx2p6bwjlsw6e0r4j7gibc7e9ji1adhjt78t2n3az3gbld639gql6q2re8f7corqsjzydrz2rlsn74z8g4ai56vhmcr2dnyt8eyoo9e3hyxk6dyb4safayiveipr48ryq4vht1ou1d5e329eeinzmzyf0k3s0k0gqzjhscvxv8osyncn1mphtymjf539g3j6jsgkjt3jxyb2jpm39k4unh0z2e1j6j7e67v3ulapinpecv0c04remty6i7po7bgul7tn287l0qx2il00zs0hf21mvkj0wyg1f40jzq44l66tacvaqv4n8sy589j7ygkyzgtkenpblw1tiice3jbcf5cltgkxn5f53h4dz1vc6izbum1b9gwsfepiqthnp74bwttkweacfonjcqm7j7t5aadmafdgec7k4rbj52oyaq3uykkhoqvrj8lkoglc0e7nvo34qy6fobu9h7y5nx403oa0zjc8wpbw3pgtzcwdct79t5ecx443ooki16nqo3m9kc0tiu20oifp8tr3vletku0jvw4j9fdruc4aml9yx8egxd1q487rqe55pdqig3rngn4qgqjmcyxf6fj2h65uuy1fq3dluts41dmbw8fuc5e792jhson6yrd4pexroa2ddfpudfxige7ntbu3mbi7p4qk2vnyp2ngkzqiztljvqbgfvmnr8yc78zihb0oivj4tpyg0grpxayzem9c48g8wowa98kp8tytn41befepg1nju2pstdjcetl5oybphuuuf3his5m4iq62mtfui',
                        image: '4ut10p1ci7ncaxsgny5nvn987w92oiaxdbmecpdwre236ql1lqgp2s6ok7s7o3562ihpbiiy0bwno82wlhxjd70n5ws4i755cf84ltr11u3qrnebrbai7vgvbud4486lc3m7ocw74luxlfcg0z7mxof5en8byulhapbp8srgoxgaqjk93ol47egac52jmjdww80bn796ehhfdkkoguzrhdhuejfo9phi9bsqhbfa8xzm7mk3s2377evtnv83u5r5mjne6pl2r1eih6y6kccj024ub2wgtu9e7p6ifjq381jkmtmokz2xhv8gqoimn7bv42zpfpo2mwhpkzpgn6iqvnb681qpftzygk3d1x17u347smpy3ka0o9lsbsxw10yh6mb3jprwuhvrxcd9kn3a075eokviidotv992vp575k40pz4pdyfsbb8lokwhdnkimh62f0apz7k4bj4qr42hnxiiy1eeiszdp4q1jm90hzq3np04sqx9ssoek9ei3jxz71dj39lc60o0cpqjqv9fkqkklt26hzc2s7d2eoo0wkongjcll6u7h52jzoo11j440zu5awy2ktv5duzgkybow7eeobfymb97j8t8bf06n2swkswldcpbbfyamcc71i32al4zrz08gg0csranrm99m18g5leh6yv55re8aniib2zk3b5n4xptl7zcocmvr7l2w2vyqrk9bx5p2d9xv5yglse5ujyces4o6fb0ooemvj8bdfr1d5sxati5qjkhstqhzhp455gpa8grgkos8tnfoa7lq7hmdmpavlm9vap302og5owi60a39uzzrme77fpq4byzghfyq8vbs8gcnu1uh1w753yvjmbivnogzwl94ajokirjkyf73yggvxwfd33cjwkdt72vna9qe61desm95qjt7lmt31ova4myklf2khv86i51yx139gi9pghhhnq9mh7a1zxh5yfxdvvby5q0lwqv3hpfnc4sxnm3xabiw5pdk3vyq6qytltyl88j67fs',
                        sort: 604872,
                        administrativeAreaLevel1: 'ch87e4dys06uyiag5g8xne8xck6w58wbk65k3ouvy5dekt6vb3',
                        administrativeAreaLevel2: 'p0rjup0lkpmlqhd4d6ayajc6uqqtpbbq08jzznblrjuaao19f3',
                        administrativeAreaLevel3: 'h0peqp4653g6p502nreu6fxmmrguqoqe1ivq6eqvzf6o3q9fyj',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 886.69,
                        longitude: 65.00,
                        zoom: 40,
                        dataLang: { "foo" : "bar" },
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

    test(`/GraphQL adminUpdateCountry`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateCountryInput!)
                    {
                        adminUpdateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8',
                        commonId: '1d2770d2-e55e-49c4-b99e-a51978df4470',
                        langId: 'eba5625e-8598-4141-bfea-047996af65ee',
                        iso3166Alpha2: 'bz',
                        iso3166Alpha3: 'rw5',
                        iso3166Numeric: 'vm5',
                        customCode: 'iqr7pdqeux',
                        prefix: 'l7d1p',
                        name: 'fdrt429gfa6mg6x1fq48g6apy6btnuyz581vh0414l5xweqv8hfsmvd8fgb2uirjd5pq36aqhb8yi4tre67fh10zc1d9j3sdsgz3mvmkb2nq2kg5p1ifbt4vcpqai03sxn2bglzvvem40l4bijzer7dgahlwcxto06jglpeb2gt8bx4mvf57530uhl3h6ui67923pmpkmkyiq6e6c3xjx76p5qombt5qco1tophxpobijgeik538d6tthw1s0vx',
                        slug: '4fkhg7mxwelscqqxwtovbl0t32vs8nnvauw7ger1zg1v1xtxajjkm99l92qd3i08ajhbjot622wmx4ktgyta0qh50rp55ey0kwp4qs7pmq341mmd4y57txczgfpk4b01etzvqectg3cr3m73ilvjpsb2ypb6g6io23nf3zgp0hu82za0pz09fn7g8kvlpntpy3cvrcnaeaun6wcy6hlvvhy3cwlop45sf7plxlble9wq7mowdu3kmu3vxcl9rp5uz2qk0gucko4uklwkizywubwi902p1hq920y3qtc7bzk233fzp4yhwadd2dwpfyp91zjk4o1avs0rkt267hlmuo0xgnv81tduhoukqjtl1o4t0v1r74hip1jw41gpfof2jdaqkkdyz55va1of45dc4e6g9h1totmvi8xmg2ikdhah40zhiu5cvd5z1tme76x3ubw1mw054ythc200twnn32o5ikahbuq16cppgsahxb472qf5ljjv49d8kol1l6t3axmty1th0u5jgtwwdi3jzmx45yu78sha9v1qdfwd93gtqvv6rb9bwbp41mj7mmgr0mexrz1y0rfhyrml7perf5r1s44tw861atdtcrqlarg52fv314up2dhmxt1crwk173hrogroldxso9pj29tn7ko4ms8qcdi47ubgjiyg3fn2jq52xnzknee88sgvd7947o83fgfmy58orggy71chc0kqijgopjxupvbd7f2v4fc82bco0wmrgts0z5zb7ufhcm4w9cgcf2qeh4cukj4vmu9ksyb3aku8ui5njfqkudkzeapuwc62hor4fjo4k4pzugnj9ukeegn9d5ajn0iaj13bdzaf2ivdle1gdbtpj2emw20c4cfbsoay8daomipqcd17cqhzpnoouvo8kmzi2ksx8eku43u8j2c2b4jjxphtajhm7sxj1j0vtkvzhu68qgsuvx86ps9uv1b09x6m2wprjf48s0q1akj03dsfdtvgboqaguoi7rm79y2hpfvd',
                        image: 'nidgfjv61wernsbu7y4gt82m664ijedcb1oeu8h5315v8kj8juc6kcoktdc99v19xvw08f5fek7amtveycg49umke3sefk9e5wvx77ua3aas9tyik96iapev3airdnxp2g7wrm1n2qvlgndai07ytjyo1m817hnfyqpiikjrb6tx82246zmzogrrx45dv8ohsymhs46d5uv1u9x1gfoo9zxmb8v1rwbse2w0x70rwagkab2nzbk04v264mma0uipksgmhy8gzt0zhzi8vu5xazahvcljxbsvuobg0nqepagzptwt3k55lngsbkpz726nafzcoa1m309jtr6k5o600e9oe2f8drv8xaszoyunn4rd82u9u1eyw6n5m7q8s2tlaj1stdowb310uxf5vfm85tpjy45n1a78ocy2zkcnrtwskkmrdp0jtpur1vjfgb0cx8gx0gyri973hgonw9r5ebtqgpyrthdxief7obaz25fk2smteadkb9mn57xmt58wpcsyc9c6awq63lumi3c212e00xbjfi9ae7wre8vlq7m7fah6ox31yxcprlk2vldzpnjmxiiapn0hmz6g2p6cemt0ui1hm36yuly9pvwr61ts5zsd51j2zoirw9t347c5icn0jhopmv02d1uj7clcp4rx69prud7i7elxadfw1puucs2kshlzlse9cqscrejny32uvw4ufrqwctkwc0nqit1e55qpjbsp28qq0s27tg91lgg1hpogirx6tes9yas1sge0dfe51v9so1wjmxs3ohjg3w43d13uwsvszsm7i2zcssow3q78vhv6p9vnkkzvqhn6hujck6h8jo1ilu7znn2ag8bd3dozhkkooa10iqn9zyfsdkwag7hnhbkmoz605fyjap8v4tf9e2zs98jm6j6cdz4dx686hv9azqrtjr2i0vp4qkes14ti7f6x51vy8nl93n8rwfj0xew1wa4g0y02obmes5h2chp5twpo3s0z4c3y5l3uso1fw2nhq466',
                        sort: 972321,
                        administrativeAreaLevel1: 'o9tplzkdfaaz1ripnrogrvvcxck9jmasz65mnl56abgxlh20an',
                        administrativeAreaLevel2: 'yo56acmgmiovclu4o5bvjqkamxcac0zge0evn66s5hpup2tvdj',
                        administrativeAreaLevel3: 'jxqjvo3fb4q09g85wq4k24xzhbqx3cc9dyfq02v6bx292fqnuk',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 32.20,
                        longitude: 931.18,
                        zoom: 87,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateCountry.id).toStrictEqual('84c3b362-c796-4d8e-aa75-a9a7a8067cb8');
            });
    });

    test(`/GraphQL adminDeleteCountryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cd264bf3-26a3-40e9-9507-1c812422626c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteCountryById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '84c3b362-c796-4d8e-aa75-a9a7a8067cb8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteCountryById.id).toStrictEqual('84c3b362-c796-4d8e-aa75-a9a7a8067cb8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});