import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IUserRepository } from '@hades/iam/user/domain/user.repository';
import { MockUserRepository } from '@hades/iam/user/infrastructure/mock/mock-user.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('user', () =>
{
    let app: INestApplication;
    let repository: MockUserRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IUserRepository)
            .useClass(MockUserRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockUserRepository>module.get<IUserRepository>(IUserRepository);

        await app.init();
    });

    test(`/REST:POST iam/user - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: null,
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: '4d04eo0gx816bkqsehecg9kwqack93bgq9awsgcerdq8atvqnmmg79cwl4ptewa7z21gzdcfs5mqp07mrqi6nl5zbeuydgwrbutsxj8f6i8pt82x19wagl6j1hju7xs0upd2cwfyqmmyiga63e5kjp92zf2vgtb0h8b5jroyx6kmp1mnlcrb1ia6yodrye258tzx31134t0h5zz3naqs3uusm9h2250kwoez9iyejnbij07iqtcn45g929rkj7v',
                surname: 'ejyli3ibo9p21c9gh27nk0c2g0xdg8a2qd32h2pkt6yx3xh1b4h9ndo4d97odbw2qfqwiu6sitpv5gur51sbgpqz3x40t38sziok9jv2gnp1coeishrd5zbzt7hv0gwanzhj37wimctvusuufmhtmhqjrclhru147xmeg2xba3c1sbn5slj845l6vwu3t3r5rbubpjcpwdl6jww588yldknv4htwy2zam2wgazjtylwzqceo9chbw5ov8vzybgq',
                avatar: 'jta9u6y89pqki2dgbqbu7rtb8ti4de9n561hx2mjoiasge1muhnefpm2iwmqij5mdbrq3lxnlm7ks6vvrkp9co2js1h9v8d4n67q0urbc8db86xnfzyrmt4ojgc5o9h5q31ft5zfdm7p13xxid3hwxdbvavmq8qqw7y9z21st3ey2gbhap3jvwpdk8676r3u2krfe9owf16e1ozf10sx9vg4u6dkfgqyvvqy2bykxi2zyv747npt0i88zd1ji24',
                mobile: '3w47szy6hsed3jp80t316rum3plgdvolj612vc5oodlkpunhojolfvsb2lx8',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: '3bhfzxuvzxj2u4nowpg1i4hffkfbgjzbre5h98as9n2aq6c5wldqda3282ktw25ciz24mx8hmc8dq5ctgeq6zedp2wbsz5q9bdjd94rxs023b5tfxaezy0ud',
                password: '4rky225jgmqp4huvb5pykgm5h8er9hn30lneetau39xjflq87gui5ee4ykuxnk9uc9m9sfozepb1uyfcz2cibeqrejo7v5on1gvag4oifjxlmx3ayjyjgj7guer0mv5mznznrzb4bmxy5t1hrj31wod5u9l2k12a8svfd7fsh8v98ltyrhc3nydlxyhahal7velvqxiw2q23zrju8mnbhdnargi3dutsu0wgll2eumix29pgjyuvwmmokpj0vli',
                rememberToken: 'c82s2vlmfc59w8log8rmqlxefx5skor966od57xvpcrn2ni7vdhabal8ckdylcq5ghri75kb6224xc0m6261qau9t9od3ml0acnk0d09has18n1ky6yyl14vbn9ntq2trlmsxv34djacdkk1zjaloqgsv1c83v6wslygwkgx3suy32eq2cmid6uqv2gzn24ark0intu9m1ra1r6c71jxuqbhxjzxyrpc5x17ese71gbselu7am30tqgdvgwk5ov',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: '84127tkal7jzim4x0qsx6zzyuj9s1ohdei49tsfu8jrwj6icoshxuwiomxlerckbt6fd1h6imgcn1tqe9j2hueepyzplsopodcowtg06udjx2bofrae7u338wp6qjr3ya16k47u2lh9am1howtti7pzd046fxrhh4vi270d2o9r3h7df1sk5znc6l4boivdwqmfyk6716x5pgjqtjedpo2am9pnrox05mylo3y7uorxd17dc3jva4zcv3l10pns',
                surname: '6mievolybx6xb02xaj6tjxoikrjx9lo28clj9js0jfpohzau28o4iei1oq5vul7zy50y1tcsdv59gfcs4tro4ktmf7bqug9d427itjtnnczx2p8xuslxlz8dsv489axj4jsdy2afpsndfel14othww07nmrhaykacc4a4deldvq9v2y169qt44j3pe1iyuk88606a3mfn1mxahg7w2mpd9vgyyguzkbmgcevrqkcaha7j27jdqpmjd48hbbdh72',
                avatar: 'e02f8snyiwdftajkvjxgiq91ihbjheo7dx19pju1vvvoo1zoqaz5fss5nbtoqmbuldcveglgvlbpcpuolctss49y053r7a7sorsgzzqqz036v3kjbrbaws6q7trsf1jcy2ptypedwkh8k5zov8bywelpe75vv6q0znt54x1q9h8frlcf5mbk51jsh6e56fd4xd07jvtlx54gghlw54qypm8n7n23v6j96ljzjcvf8n06vi076iool403alq7i4m',
                mobile: 'jy8y8usfxwx5jssxy2f00eyv6ep9vzv1m56cwxjzpetsfritknzbxwtyif84',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: 's3zsbcs4466vnsnco9z5mludvn4jz8d7bdyrfofkjz5a2ve31v4vrvzqtlshe7f41tr5puqj9x3eyxismt7uyijcanlz4e0ny6w1e3sinvk46gxz4gt5u5rw',
                password: 'q26jot79hf6xe3hxi955pnusl2i24uvgaihyz6gnummfw5enqrpx9gd97zgvztbm2kz8antsmcxc5uxma8tmejt7sobb2ngtrispjhwjhi0e8lceo4wgjcyhkpletr4f5hmr8rbrhpnxl571vh9burboxyftdn0juksnhd47ubvkr0sktxujxfo87hq6vctiqi1kaa886my9ig43wsaegeofdychofdx62vq5jgq50bwz7bndtyrda82ieur1qj',
                rememberToken: 'vcv2xp97q1m4crfl39wigkd1l3ll53l37lvxkjl3d2499377pjfoig89xcy5uv3uzlsbgvyrir3hzw7evl7ntplhdnmzqs1yofsefi2jkztlkqprh5egu5b8573o7ykhvscuwj7y8ur8k7vbmu7mh9jwl9mt9h2iw9irwqzuxp93kwthwkzhq17lpxabmtuzh60lsibvakojzg21lbgct8s4oc04uyl2m0ebmxvklsb8didvnw6c6jo0nlj486o',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: null,
                name: 'tcstdrqj9ino4xmvf4wpapljdhaaqsmxm3ibdd4sbkogmgqg59wuixzct8edmff6h7cgyzpogwip299fj63jz4pifbuuwl6y5kay9uqy3smlxdks2xf0pe67xqjjhbv16fx1bz9g5hkffl8xppxl5z6bocoargdfbxspma5swp1kgo90vy63if6d6p0e0ua44q1jtuid5gpnkv6olpdu28qz20g8oxfw7e5txbkqloylb3t84f3vz14g2s0sijd',
                surname: '0iwu3svjl4xtlnini563ntn3svkx93cymusn179473ch2dy68qvah6qh9dnznn0j8jray4n09hi9y4pmye3bgzhv5n7q8wk8fffwbf8bzee775ykit5f7i08on3tx0k7h6dfp4qbjhi8vbrwjm7338u6ysici5vub2hylvseizlsrtuc1cijxhsk9xjyoxanglfk6z5m885h8ba39071komhja7suv2dgl21bibft3kq18helb5f34fjw7qcftf',
                avatar: 'xbrkyoi0usee7b4q51adfzoee847h1t7zzjlyz0oz9og2r0t76gzzbx44mkau4ej5lqp9uhk14fsvx1v8now1gw6xvpio1h01pk2kiva9radocp7mxy9n1nb02pp5xtwzte5jm3xe0tdx0a8nnqw0gleom859ho9p3t21nastugehy6rw3cbc0usr3hvggnrzvgxnpz9pd0vzqdk7s5llwb9v33fvd8oxhog0tqnxo7c5ngxdmz50koq5nla9jv',
                mobile: '51cju6k6uqt2zr6w3vvy9p9ax4pqqgyqkcqtj9ulddpybb8gc6ukmdkthjf5',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: '440agvbvvzgisempckwe60nzorb1ylhangpobsjwafxf9ohm81isdn79hz7offr12jvdh5fslzyvjpv8cfbu7keeovprzfjyb8hx8u8p0qhwlrwuyym4izr7',
                password: '97wzmj0u3d9alubz3cywv9ftbb5iy98kdryohaj7j5k0guvwy3gapqiau7iv7f8ctdxo5t1qba3m7xn00cj51nlsrvgl9ye6mjmxuhdoo8xscc40bicflzxv9eoi6fvr89dkf1zsidkjqyuv38pnf8m97bz4s19zv09e42z1hsibyljfu1nxqqayb0ks103p431zjntkgv5lpv0ygymchwepdb2zuknfwu626pwl5r75wwfcwgr9ww08h5m07wk',
                rememberToken: 'hdzek74bmbi1tae9fjtdy36rs9z3uh1djyewgjqjr9c8jzwzj2802dk7i8i3p75sesb7hgdqbe1luetih3p246a9ol3bcfzlqypsu0tvjtyc1xsdhotir1ha3vphkcaslbhciaqxpari3tphy6pbxoifj04zxbtpftdsvr091vbrs21cijp87ce3vgidqo2v325zn3cdasb0iwv66ppzicr2054bojj8sppckdccqexmoa9ui30jyyo2w3947v7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                
                name: '5sfsuk73cb9wtkah5dophb82jwhdtxqbbzaw0qoldbst3dhx50durtmtzsbowu40wtejwpus1aa5kivb4n5n7iw0489ufr3tqg7ev18t3oba2sjy30f48wei1h1qqs7weaqbb59u3qnnpa8bgys3zi29v6ozpys1oa16l4c1euuimkqnyo5xt5k1izshswa4guujnm0r67ypvp13cpqglpbf9vyzs4fo971bugzum2dl8gwuogixelu5hv06wuz',
                surname: 'c04r5wuk4hkfiklnavliub2zf0n0l00dsqbbwpibf2d1jtv8szrd0r45who7zathq0ieuqa9qm1bi59s90daihda1ss4irp9ye6jtse5hb1ezbj7e69bo09687rmz2xr6mb57ptxdew5unvaaex2k41pustkco5tdofnpq588sp1lh2z6jo2c1b7cx5p34lorn21kpvegk98agto8too2sjhfvldgywpq813ik7eznf6t33ydrllzs5ow66vsdd',
                avatar: 'rlcksdszyxflcuwi8nrom03blp0sxn11twxuio12e6uyakxg497ppqf2virxzfie693wjil5omyk3rfg07kcytc756fzgk4hszmxwnu2pciwqkczajxj8dqj10t9wvasqunzkuasna9p6oze7c4jxam112hs0c9yg6m1tgnzn8422o0w6k0aheu038r94p79p6s3caxvj9q5ptf3vs8htocpf3ns41hw91ch6f5rndybldcd5tes8x89hlnk5tl',
                mobile: 'neqssbyxurpam7foxtr184wpvvabbr7zxb66qfrfitqn7ry0kdvyscnk6ij3',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: 'tlwb0kirafjrax9tnpio72gevtqg6w0do7zxa9tullo47c13csj9mphjy38vx2d9383c9rgn798jox422d5pleiw37o4rvzvjia3c4bllurghitfbeu2bcvt',
                password: 'e2cysn2c2wm174dv3lmfnd1lykkx0ma5uhdew842y865w5xyrgwxgl9ahdjhsohf8ds0gpiohs1oo6fk00oi7otgwojymqwehkuysmkvgdka40fvb07eiith0mjl3zodx8e8swlj200mycwyyxjq3ybcidqk1bnv97eewogx37czvqeho52up4kcpnpf7po6tvaciiyfxtztp3ksa12oi4nh8jmgt7rc6bjo3us9rilmjguc3pjjdzoc02nue65',
                rememberToken: '5rhxq9ayzgelik30a1e2qfj0iwmszsn1yshsxk3hxepc7d4x555xqsjbmngva7dgwp1flqaeneklzv8fky1aar1uud27j0er2gt0nab7pwws3i2p0r4mnia950yg1umsi6521f67uznsdm38qpzisqomwn9v6tly91f074sp1gkoah6srv590jhjh4vfps3pwemg9nywasratz7q9zvbap3bon7whs04pyvuvrw5rm8q669leud3swruktwxdpm',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: null,
                surname: 'a8w239k77ki4tdvu7p0n8voexe20mg1s4sqkzkj993l1gixc9l9a6hdbcoflq92fu9jfr25v6xh4evf961jjqmfm4k65fij3irtpil6lmczr26ttoqxtnnkq8u7tl8v8zvvpe5u0rfu7svp3asxxf9xumhym976o1xs8a1ujuksfv54becktvzi2xg96g6qa47n8vgb31a7ofuzjo0cxhkgz0ojcsral842lky74lknl3yyz6pxi76h91djg5ct',
                avatar: '118h95kojekj2at0dqi5cg4u2ktesif03yei2p44m6dx49doxef0oiv459yamtuufkvxjrd2q5rlo77kw9px1mbigr274ieyqslv3raabd2q9sel6gg2ye9lq5kdjsh6hru4yyuef5vy8u3gv2zq8ti5u9zaliakd8mp4sdqfz32iibxk5sur7xq5u0sawzof0dqmdwc070i3peczchvxacecgby8q9cid67873t4fwvrjdu0cbt1sl7d7w6gnj',
                mobile: '1v8chubv82k08xe5vtowhldl2c9fjqyoegbwhx55i7ef9ibuvvq71v83d1lo',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: 'qg63ncfoh95vy3m00xnqk1fhfzr3uwj9kzib5g20bktznuzzsm8r7pkmpegcxhmpsbebdw22eiah70nmd4wydxt3zo5ifdv06viysthye4qg2uy9u6kgixj8',
                password: 'jx4vnx7y06alep5px3eb8uha1igc8u5dia2cnf7ag0826skqruyydd72zb528becbkyr63gm104sa78i8mkqo6lpj0w9kecbja98m7f1k4bc434epf2x3mmu1gylvjyd0bvmzta0u57vj9ip5jpmmkz7zyuvyh01a1okczf4b4b056b0q1m2oooeeuz74v54eo8ke08bdliw3am1eu9wkas8y9xtu9zidxoz4vq3dzywgg1greca17qqwkzcvey',
                rememberToken: 'dj7t27mrjsillkbakvfl9b3bw6v3s30kmpulcea71gdw4l9wu3qbwcogftjqt6pqu0j27eacmqlvifel08drwaespacn8lavfnly9mnibo06kvhmn4shf679lwoi2f85t9h5onfb70futfzf3e8i7tsm8zt0exz53bs0ime3z7u6qd9ltokmt87qz6zp9p4w0jef9kytgiz3afzcci8212vub5l4m3r45mmmtwtvccbb6j2ikj6k5cb8c5ruqee',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                
                surname: 'i52g5o8u69t2gp7tpbwsbby1zy0avlx0ao9b062mkfb4zzyn1pxvbyx4zop5qgsn9aq2b9108t21z6vqh0xwd9yxun729esyzsw1758anxt96dpgmo4v6ur0wn3q6334uo8cq1wl5d6eqkvau6db1ls0os27qnjk552fknvc9o0n1ipd16rexn8mwji450u0bhrvx2rqnnro7lz7va2mbsvp1gimf88ei0sc38hi76uuz4lzmggwjtijtvvtrn4',
                avatar: '7tapw4f6q935k1ok17r2sqxwcavfywl54k0i6x2cgjm71iqqqa7dfcjshynvsc62z5rtf3wmkyckswtwsib49ui2sv9aplhgwe4fxhzwvd1ua4moapud5x9o9scoq5og3dhuu9sais9c5e3634fmrgzxfhingu3o6d9m2rk7ph0ow4q66lr1y3nkpzkoof9y10xnet0sgpcb7jkn2o9oij2jrcnrzx57y57ef69fmult5mnsndgp6uhuvjp52s6',
                mobile: '0ioxm0zixxab14npxrbqxwakcvdokkon5cask9g8egupo93snwebvl33v7p0',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: 'txgbp5nhykixt8qlz5nqew3p5z1gmm9tpek04d9l4iaqkvxnwlpf3lbh84onnhrn41ifmuzjzq6874soayox7xxw200v21t87ccv60rsag8lplaf42ryickt',
                password: 'ms0wziii6horp1fcv390v0hhiqice2yncxkrv1ys6rv1cnbrty0yjidc9klsk2jdvs5an5pd2c27r82jogjr61ao9me62b4qi8siptbfk214b9jjgf9j0t49mkjsxao9c20d69zqswkir0ig3u2p8xtn5o4fx860lu0130obveig1pk29d2eyv6akjndua5a1xopoeh1ahodrbny7or0r2u2mac3fsubgg6kxxcbs6bqww0mgw4wa33p0d4lmc1',
                rememberToken: '936ypa26zq9a9aqkv9yg3vqho2r7fmepjqroyo2tuidftyusp80jqnu50hlmlbvfo8mcxeedgl76rq36rx6s094poq22puc29yzc9mkbzvb4rjm98xtjna59dn62c3bc29lg89kf507bnjm51jd7cp1phy85v85r09jk75b21pwu2pl2yka3xnk0h8oeb6y78pkmp8a4if52r8k2zgwlykqdsttyb5qcctn14p6qlmkakr068mqg90hpeo87ywj',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: 'qm21pkgg1tzwmdm3aonmpih3thxdk9vw3c7uot1kb1m0gch4dydz4lfl3g3vqa4qat120edw0wtkj9rfjabl22fkkghzkxwlsog8urrjfosnde5qych2efytzce7e7ry27hyj77vunruztkk7mwegkmzs0sth6exqx7elbj0w4ks9wwsra4txpsg87ag0bw022olsl2iaqdhivnliie60mew0oe0psotwqsdaaabgmfpezwxzdlca3sc6xg4wzj',
                surname: 'dnzofihdkbftd8blk5qq5gcdq0nhmlrokfs6xt4pl9wuf62ga65ns3ojyp2p8bofuh37w059y62944cu9z95ptt4ytas6szta4otk3tu2lj4yz8qjr5bm91xfsvig8ru776u2novsm55hgin3kklwx23if37l9p7vuh4yuzwbyup5ijnamrycwl7s5q5msrpe1ivzg54519y3j068kwf12ta7bahk6br1gfblw7gkoj9iuu8y6ng3qqvr32we67',
                avatar: 'vvof3lcxzc3niev1zqj8123e43cnbqzu2g1sof1khfvgnegapf2piwhar0ri555utmacrjhxpuw1stn55pg113pux8bak5e3nxr0fxg4fm8xhjhvuhl0qferf1ommlw01wmgdjj2qg5owf7lqpx3yuo0jmn37y8z90jwydhktowhm8pb9ca9ameolafy1ilzk2jqia7bl07x2o699vidf6r6aq5axa1hvwtfwfxw1m51pphequpjbogchah15rx',
                mobile: 'rk22enpowz7nvmil9y1o6ylj1hjgabsuzitl2teej2nj0r7rdg238tux766b',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: null,
                password: 'pxx9422qqcn7nj3bywd964bl8ws0qn53r6rtn6jeu6elbgb4h02nohy1840208glh5p71vxsmxdom8ndc0txav5xin9n3iy740iv8a9ndg2qmf0plgplh1q6o5pejv5oa5rmhk1qk46a78mxqzduhmjkm5vvafihe5ynw7bork03jr2d4rfyfd2o2n326ptg21arw6pinggllgrqz9hvi4lfaf0nu71hymcyqg1g4ulvpu6jhped0ps6vcpad0o',
                rememberToken: 'qjulnbx0cw0362qgk45idkxct7oczuruxzn9983zfc5yobll9dw0yzg7wffquotbrszbcw627tyq1u85qg3mewsmipdr7w9hfcdsiq5dsot9pv6efddo74fx2c624s2g7ipnckhn2nwolwt8hfyziw37j0gh3fkb25b4u2v3x24f7a4damc92f1m5wjl3kq6re1rwr0713hp7ft75o19dfrg8pfmdka395gh3cktkoe56zigjvua4wh9xnfxlny',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: 'rmttatwawq5dezm1rpw2hy53zxnflqthsvk6lrvqqzsjzwch7qhrca4m9x9zird9i1l84pc83ykbggyc3s3wwv253skqph8brakb7qnem6a41nkmsgthqtrmr3kqqy63a2is00cxiifvdzy8v3minfcuv0buzd5mdpn79ip32nnpuek3ibjhzviwrcj4c721j0tonm2g9l200vdfyf7erdi65rj6pjkq89tk3fik8tj6g35hgbfmezy6ry6jg47',
                surname: 'lc0qj0wkqmjdrnfgfxfbnjowg570k2kamqgbchmoplxmrvi80jh09sdo1qa6dx9ape49hn50ajac9g175dluo6eayq90xtu578ksebbr0jz16whafqpf8q26idpkq7rlmd2p7kv30npbgejygs88ff8sdtc96b9ddqq5piduyezru9txfvuwikr3srjdwcyg04iwymp9nhw7euah6uq74b547jtb70bvgvpx5q91iupu03gidt0wh0nvtejsi96',
                avatar: 'g1rfbm5ds6vd9yqlkfqi1sairh1hmrjxchq8ejcs6psmb6q517d2fz88gb8469js9rz0c781gsvrywytfbhlnw4jks8s2zl5l0o17el1a2l0qqjdt5dx8ot7dzsh7j7z0gy4ohqs6wd4unvuzy1wrrrwa6qqu77egykrl34w9v6xdgy30990zh1lmmm3m7i4u72k0vsc65agsrh8ny6v5dr6w5eaczge9xksap24p6gojylyeehjja581ww38ot',
                mobile: 'g821htni6o127q27ceojjdwh2eeemf94p0k2z7lrzyh9fvssozu9vk0kg1x5',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                
                password: 'h7j5z9ulhv7eip4587twtnej8d414pj4g9imdcpb62s3q03zmh3itmsnwsuyimc68yrwv8b4kovoumrwe1f7cnfwy8nofxf8o7qxfpaqqtel4e3c5y9mn52tgqcakf14or35onb06312habjho4t9tn5edn3c3u6e1ajnuqstl6yjg8e9p87a6xibfcorgrw28fxbcfsib7v6ui5mnut1ilv1sncrrq9vu2wabb9vpcx1kao8wfjq5xa9xk7q7v',
                rememberToken: 'jyfvkte7zu4f6nmodeghtubjcrdsxsndh1meex12n9zev4flgyts8teky4jve9oocnk2p3pq2sf9cwfidlgfpgb6whyxkn41j28til8zydgdxmkk1978n4ui4z3ifgudaamusgz793wrdbgrdy5x2nasxogtxmgulgcdqw6pb9c0m2tofkvidf042tygdiew454zi8lq8fomgctciku4ptt19m1hf2rjh474tuz5ph7pitraqmopih84r10xa5i',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: 'v0kx5um8ctccsh95uc6c6vxbly92wo3c7icay5c65wdbpy06t5jjx341lasatdlbaeez8e6r94zrm8kzp4yfbv695fhzi41xz8wb4btrd6n4sir63u6eoubw3zbvnxkyn46bkk6k5nvjksrpj1h0rhayh3kscktrkwlbyqvgxoinl98xqw6f53hictcpn5c4t4azzko8lw8cuw0ht2x21stjtn3tg58p5l3kgliisgiq1ajir2x4ftu66n01imn',
                surname: 'b9k2sngtqxtpgnx2mzxljjm2y8guek7z78qqcoqr9xfdtu42d2dqzt1wuijfvi2o8yoib3m45f332w5oiyednnryg51ctin2hxoa1i2h5v7r4zxylrlopyw0bxww5xcjpehlwdjq8jbt7ob6zy8ief6ygrgia86n1iavdiwlyrkimhomt8kdgdvwjg60b832jq1lcpypdl6w6qcaw09bv4cxv56csm3ypx4f21aut1svn6udc37flqtlwye4u7c',
                avatar: 'ivzqwbizmlvwnxdtoomxxo4g1ea290rfgyq1mdyadox26d5eflm8uqqkmpsozatg3130ky78o9ev0q1qoymc9wcfr0fsle52ziv0cxdts37a61ngeotbdybvvb4on1arsohbj4bpyat62mhbrih0b26y9orup05te4mzbn9jn15jz3h14l3g26xzk7torly5n4jxqpxtrt17pbkuvsho2rm57opmhrforp2h2xyy5rhc2c74py9xp6nw3zofg3f',
                mobile: 'ayhsfvizlck2konju8necvcg6he76hkhrmg4sa2lpcwyc7xtc968312w89gp',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: 'lsy324ye92ajhu9tygiqirzejh480764gs59iooszlulyupyvh9j9x2937wlx2ohye4w5g7d46adklasro29ds6hq86w31ackg4kmz4865lbn99ys2ln2pnf',
                password: null,
                rememberToken: 'kettjs71b73c8lyfvkarxi0lczq9t909lm94gkvxs40f2vcs5lznta56uctrnw4nq7jm8k7lhflvefqu0alpoh4orll36qu4inway8fqnrvhyouscdl5ajs7smvu6mf456vig71nn1yc56z4pkyh2ybswpgweoz4ek59lvwp1tx9199ogdtfmsi3ey7qes3rtx4phnv7pdtl391nhe3tahfutmajbd50onpm5yyr393sp5r73j0y13h729lizvk',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: 'p4mjz7sp1ye5jpwzt8fqeob06p74w39elr9p195hh91lg5rfhfs4pnjekmtx8q86wrjocma574l9wrux8qb70axkojewe7hvwnwk1acjjugvdqgnbiqw8hozh93vzsmmh30kr4s78vbq8f1ww2pk0ocbaxyqypf283gruz3en9nd2npmv4kmq6v53zwcb1449ryfesq4ipqxud6jgctf4ct816vdxl5ranw9dwkmyvn461zjf6jhuket90863tj',
                surname: '274ka9vv7dnnile3tvybv3ttejxx5p2l03tm6dol5hcm76zt0rg1ffyisfq90yyhxq1njir5y5ulmhozjhlfif0thwsoeppxna70lc1hp7et4ows8cefzj4mt1ffnk0e0uqldvyk2radyf5jqe93qidyayds2o8cmim35a7igezzdvgecgegxmv5dcmxtyde3usjrx2g9bva8bp71ry55ttxqchdmr9fnbp1tgcpr27cjm4ya89bjfzoxj3t7gk',
                avatar: 'asg7saf3h49g9bckgvibb0ipupv69eyr81ke0utyvs139z33auq2z1wmppl40ztnpcat3l91q6r4fc2aiov9t4udosqz625k6wqaz2dp8sp477jo60yb5yfztee1laqc54tr5dez43qsrd853kqm2ruhs6cpqnn9pzq0sqqmlrgdvnxaln9zscrx31tqns9dzt7tbo25brd5kim0iz4k38vi7x8nnpa21ko5217avv307rqvc02143m3n26fvyg',
                mobile: '0hxydxkqqd0h7z2f7oeaa61s7dq613t11de5u6r9v5d1tta9823iy9u02dbt',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: 'rx5p7pajwe2y2rt3ybyyqvvu0ztesbjvxy63wxaxybthtwxji4xlrsvwtlqfpaqcpbxvg4bcf55xqnsfal3kj1dv85106rxdlib8aaq3e9qh6kgz1nzptmxe',
                
                rememberToken: 'wc3tx6bjubzfz3btjmp2uolz6h1lhmo5tx1uw8b2ka7g80sddzxt2f1y9jkg5gxfjvu03h2cv5xrnsovi2ot6o7pjouehwcdklnfcypkuup02l9m7xarsp2nsmcrc2kunmenciq7wow3icpxoauixpbewkj369n7z3j2998sjuagrsjeesv4nf4jhj39f2phg3cn1gn5tmamg0frf8iactkn4v0li7mw1otpzjvv63mlarx5idcuq7fl2my7wph',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'wzpcwcxq2dyhcwkwznap21yk7zm2vlg3fifvi',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: 'brufwwojmohy6142lm7qe287xfdkdv6smnsb01koei5q2yvqn3gcwpvzy8ugxqq8tdyx1i02upsflcp2j8erc973szvsoea5c9qbo9v7i5ewkxqsic9f6vixrrvq6gvou4htu36etohioxfls2wwarg7ptq1zf4frr40onlss6s11h2v9oy70pg0sgqd4o2hq93x10f34p6fw0jx1czqdpp0cb4wbv1htf1eahb010di44w15ymck83al56ll0e',
                surname: 'mc6kzj3ja7mwx846zeu4hvdr96w4w7x6umfxz3pol3gqkwffa9arsryt7mb3sga10ighzeszsr53uklmu79uja5sidymq10lerel0a4jzxy81ibgaxwcxqkkwswt1wolbzsv8fbk2qfjh03n08rg5efxgli3y4pvw8k4etruq0zrf59mvnt7ffqcy1zlq1h2f5jmxpz5ew368u4y5jfbb8sqz26mf9z4ui651avenpkco0t142g8o801o22j7s4',
                avatar: 'yqy0opdobd9ujh7oyprsmjg7qxdevtvyfdlmrtwzvptj30kb7tj637vxk9ququyrhlvf5vdmiodrgwhcm2jgt0fbyd7okvaplt2d99y86h9is5298y0mnsj23ucrwq8e5hnfowzpv2schhvg9a5m4zmqeeropeft2r5tckclf9v6o089eqnmd2l9jxc4v1j0z6tcgz291ru2ma7kossvx0x0909l0xqh0m7uhn9zgby97hv7j1ex7mo37jx9itu',
                mobile: '23k4con6c2f9zffqu0kx36w38aixmwqa7nxeackb7gj4p9jegq0adhwtqgte',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: 'dytg6zhejx1m0910xudci35pnc8c531w1zd1s5f0by20s6xkwrvljnog116stfiuvv7df0p621wi11rp8mlszkl4w7z2r34zyuuzi7a1v32vm21oxy6mz26p',
                password: 'mthckg5uc5rbdrm3wno005fwh5gmmjvl6oxvzr4t8oz5d69devljevfarckv8tw4epnftqko237mt4xx0ls0gpcit5hckr2ofjdm6j7uni4ymvzbnmpj8u2w6i3m02ab48op446op1oavmw0op2nr4v39tg3lsps56p4yza0shneu8s655pe9veh6v96vrkxqvzw8sgbnuq4xp7r4pis6iz0aukyyitgmnwqkw0xiy5ojq4emgckn5r72am6ql3',
                rememberToken: 'ey4ofzepdhp76p55l2ofdzu2fnprm8fvv836y63bnq4h26zgu3iqby65r112tpqm5fo58gw2hcu4rs0ysh2xfyk7dua2ek63j33c6r7hiwunof2tz9p55jqahblveuo7qkjaduh98fi6nq9w9vmnebtzngvtih69n9p8pvkzo0cpvsamg6ml6h460767um7hn3hgkm8ouyy4r0crhzye00jyhdsurbcrilj57b2md0ypvhn5lj0bmmr4t7dripj',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: 'e60mzhwhmvq82mndthudeu5knoux6v34t99rg',
                name: 'f05azdhwg6m1s6f1g0sjog7pi9wwv0aa4fkdhf57g9csrj8sz7nlfram9qkaiz2bg7kbmupfs8tdz6nxy9yayk7yzs657ihx3gxyy4bstgbpmgdi66eiklcji7wn89zkwzvt66mj4i69pknkr47vwnw4h1npb7t6itliwfmlujvguad7rsxwlqyarbspnjdfsyxqu7iu9u4zqxwgp07105242syveh8w9lvhjlrnzp08b9kdar4rl43zf83dzuh',
                surname: '42hz2qgirgfrc4bi59pcnnnycguazlr04nplil26ef3hawaie4fzzpaw0gymplnnoiwm74muhzznjoitn75ocdv8v407acqh79cmblg0a223kls8gz0y4yktuzgq5iwfoenvlgv8hkeksha9g76ug5gjodzreh74saocc9qhsg76tp0eebhq1corr5m93ejqhdvtk7777841v0oge4k1iooeihayb7fjrxxqb37hil338aex3ig7c9m8vyi7q7h',
                avatar: 'uu2kmcqj4wn764a612mvh2c6ktvcsqm5e9wtcqhg232zq24agu3bnb1esu8073kbbh8nupl2xttm3fc0d4dnz1227na3uo72xbzpk18qlgu4p9cumj1x02pzwoor2zhiuchodozszkrbae4unzfq3fhm7p37leklsecd9kl4gw9br4agl9ggg4rlt19t6drfarqkpu119sddece5yz2684owis4ttbuiusr08g29qesa9woz5pdvr1krmg1zrbm',
                mobile: 'oh369tq6z9bjtzhwult2ygfaxv7moz19860nmeq6rqvl2mmw0d7w5ppypcii',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: '0gx8dqu2168avagqv43nd4ivn08hjww117pokfku0xdqacwlp5k1egcjho4cnn7ek67xd0k36n9iaedwjx44owpjfevxlqrc4tkbplmpovc3rerqvo14b3kn',
                password: 'kgc0liajq46o3wixac4hsii00mz45xd3ehzlh90x6vmp9rz6et0b2iawpqkd6upzy69riyyzp6z9ddty5atokos4bila76fvt8d7awwmj52twlks786wshjwl20quxoea0d9zefs24c2jp63qiurd6hcnovgullt9813t7263j1wfa1kzcip6q71lfigtzlox4ddv73cclc5d39scftqrct7hpw5rqz38dx2w8wtrxumazec4q7jzi1by4me63y',
                rememberToken: 's9cwkrmtsehi4s7h5jsk2j9tn6z8m1bjf1c985kvt4onxlzyjv5q7l0p29xeo2lhbz029q2wse4kc82zlgpgs64gpryucc1zesdxsowv5gznjc0x11h7rcr9qwgwhik4ctq8gsp1xfo4j458243febxvq9z5qjfd5f6v6jkpcnwcf2v4oflbky6bxk57p9ngvy56bv1527rmrmawp7bv26ykv2p54lkqa89e44v7av4m8bgue8isfh6ig37354g',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserLangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: 'ii86gzoxgfluamcyfoe1emux6dpg64uhmfrgo3jp9xunvu5clxhf4r3qrl7sgn6g08eadyr5na7wjz9ndiya1ucwsew2iydgognt7taqvftffs6wbfyvvpaokt91x8lfg7jhkf44mo5vvl30vcnc8pv1ep15ytjmpjy8w7ase4q9ilj8f1mh64zr4jwyp9770ehftyt8rvfr9anh67xvuu07pwcztljnnym9lw0uok63pqh4g9b4lh0dlznsasc',
                surname: 'ohn387u9ktnsg9a6xejr697z3fdrr5cr3zpj30uj4may7u2hii862gg504x9d9fzfjp7domtcv6p9p3riov3n02v4ic02o5j9yqb4e10k48x74lfckix5o3acfv5w357oboa4yz0vypeohuf7fgegbp6o4m3fknacmqfqvndjbhpisbmkcnjs08lz0mh82pa2ar8tm33enk18senrkhbu64odex558fgs76hso3kc4fthted72alte2usialn5s',
                avatar: 'e94s5pde93avk5xrxeyaok5lu3qo15fyu86phcc6wiw7yu8gz9140b3l3cfm3jimci1nntbgjbiigzmeb69wuzp428av1a6gl93ruwyichzzxtj1dpu9cgx7kwlgkb1wal90yv8tbvmjq7kee07xfh8jk4rip07jllm7hvehgzm5236orvs3swftve7cyblkshuv76its5h06uslepx2n2k268vfpv4piu33mzyppfdw0z08jzz7muli7rgtcq2',
                mobile: 'ukaej7hgll5b4t8olhomk79zysefwjj0jyln82tt71ltnu8ax2kzopu8b1k6',
                langId: '9m8kv23efktkhkpun6z3mqisduika23f19j60',
                username: 'ls7ys9ys0p1z4wcepko8e8sze3mgdajai0pidert4j1ub0id1v0qljmo7lkix6k7jo0gk88bicxv8srlh5xr91silwy0emzats7piuep45uup7i5l4ei6o98',
                password: 'los01d8lfducvgmbkmeoj1n7fwt3c26800jfotkazw41hbrk4y8s6k654xc9f3au99ypjafbdbul61rjlpu839v9x2kwmyafdhtxitrsk0ce4w0ytuf1k9wmya4tqqphsv3pinp83cegv7xe5y3l75qqcwag55taq1klr0ble85h3duedky4l7aq5ehr3wciza9p4h2mehf0zocaal9rojex79xpuc195e6ydo548ihnh1bw17lnywhbzsgh19v',
                rememberToken: '176491djafirfx4jku9wsbt6wdu5ew1ug3s0gb91crlvna8r9cj4vkikk3o8bp3oclnjn5xtihfjy5w02t830psnlnfdajwajqw2125unbol58bej4yjlbkkmd3nfpsyu3j4vi996nlvu4mwmw2ve1xkt99det9p5rcmk9c2njihriy3zxdqde4go0hdnzotceoy42nakq8n61j152ldbgabifguz9ft92ss3y8xxzlcp2049yyp6rp66vpijae',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserLangId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: 'qokwljgkq2wljnonc27wi795416sk7t92tb5yxuthwdxvqox92e8h4ih2azgvt4397lghubp4wifhm9xvp5c5f0b7dx0ryit99750hfoa66kor5eo59khz47o1vzxvouch8glf6e2268uhssk1cgc3l4huvgwd9lnxyjhkjgp0k2i0tha8odp6vuyb59t2ul97il6gjyh7rwogtrjh27y6vo18azaiv4a5qx4992fmnmsdx3xits4tgl8xjbmajb',
                surname: 'znreoztj64gx4lekosk7s5fpvjhvmqpnjk26d158dq6q1rbydgzzj8p016w6hey6a0wbafrextngee46ax16nacetyr141a2s7irgu86xfq5jlvpur4dnf81b0vw2fe71c2zzrsrpz95gt9onxb7euewodl4k3jozp66xvzpj8h87mbp7oxwxxscea5bqte1ux1rtu5cfvkakvrf60vimyp53tqb7k64ljia2eu9hhi1i9jxj6ajvfurq7thhlj',
                avatar: '3rqbcn9is6pbyhmhtabfz9xvca8823t9rrifbqg3nsh8loh8kgu6qfxvxvzrvn4vs6l4s7tz6juh8eek1d7int7xcyd0882of8jf7fsq26ai9tqu4o94uxlieey2647dc7ugwi2fe8ebyl3lhft84zhtqgwttmj7kkxba9suyrkr26chynty3jafrqlx07jj1dnldu29fzrybr96xh7jxe3fcv86hcryfj15aokaflc0j4f6dlz3mqn30jnlzrn',
                mobile: 'owk15twgeb7yhd78mwh1ud9l7y76hmz6wddkkvzq5v20wanwfen6rxcd5qhu',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: 'o2lh8d9k9bcn4p9sjyt383iwx5shnk7cultt3m5s08ck4c3gwfnixfrzmvt3lbojxeb5iu85nm2g0nhj3omoyhq7yti751sc8b2k9x9o3epfmgp6tv8e978y',
                password: '1glzqxkblqqaciage3g8ecgozmruws7hle7pbc5ytxmv2aw28mjmkfiln1ek2tx7t4wyacqwyx8ru2zwbfuyvy88dy8f3x2loc9vuwaut47b2vgtlf6d4414l4ezxem23607shfpzr35dzx1tbp1vsry69qkcnjleije8hot98d0nkgibrr95j73g4ssdf8u6nj6sdliv9axqmfi52hs2cxlhdh7uvdykuz6gh1g2i8fpf600ytgfmcsbn70j7t',
                rememberToken: 'vvh1lbmiin4byybhdm1yssaq7242din8cn7sitxeld4i64ekvgld4yt6tdpb6ivck07q6r4l3vn1p7m7vje0v5t3ulxbrf7r0ll5m97t2t56h93hraanttl124wb9kmi9k5s327evyecadkzs8yxn1bczhe3k9rxeyizgktg4pkfv53y5bj5znvvn8f7kb76luhgezjn9ig50qwimetc1cdsgkqbmn7kd2dhbdyhp7lv0ct3rcs8nhxzwjgnq81',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: 'r1r5ad4l1fca2lrkoik4mqfw8civ79dueis925vxdv1bjrfzvfr6z7k3c803y8su6hjt8px3qxtqfqp0sq2mawvabu510opwcvrz17q47fj590fzhqv9jyaqmx4amjusg1em2ekp3z4ifmxb9tsm51lxztey0huisnm4jwdtdttzi6j3jms7cr7175zrv0d835v8o582d2d0b1gr5s17u1b4ksof7ytm2sfyoeri336151vd5r4qmfynm5nbdnc',
                surname: 'z2uvo5m1hysi7vfca8dor64xfs7mysdzzmjfq091z33sunt03ry7ppsivvz7jebg5w29o28bo8vnk3u0bctn3a20mw983jfmzhrakc9c5w75l9t5r4ujtiysyutok4lsjkxm0aw6y28ckytzrjtfeydykzeflp7nv8z95ub0x3hsqgqria75xs1r5z73mp763cnluwif8gqz969t2hdpq1uv4zrd1gu4whgw9d7cwvkwy7oh4ekm84i4omqaft5t',
                avatar: '1k8bx676m4wedm182qmirltva1hdvuyh4s8cd2tl4craei2lt3xycpx3e0tnbdxdiy2m73gae8upyqfpwga424xo566ezdpulfttvb8p8io8rs4dn866mr0dzf4b47bgzjsrtwmt501woyq6by1483jcabz7819nsq5lwkjyemxdclbwo58ripxlih186eh97gw06bzskjp301xjvogubii18oj6kroclmkjmlki2dxy7gmfdrlgveaccpqopti',
                mobile: 'fihydeb8sjwlf0m9eg3b681zb0voffyiwdeynu5gxe0at26auqvn5ucjr474',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: 'iw0pxm9zqofr7q8eh54z7egjq9k3w9tcj00jwfogw7e91osc1u9knq0uwiec9sz0uu5dswn3vokgy5i99p2qbmn67kgv9wmq6xi1j7klypj964ufh5t45jba',
                password: '0pwh2urvl5di5bgzn7ypfkxp0nvlyop7h61jnyvo7ukrljwcv82a460pszd2z0uzp2z34x5k4o5ecxp3r4iimd4shn6i2t2ukvk85n1zfpint4xj7fsuenk3id1fpzn06bb4b5w34vkgu5p48okaphaniz0sw8y78mwkwlwsx7a1wczilu4dlubzlezky31pkehdh1eg8y6l0tr5lay2zs2k66yi9zpvg6p8rljdi8phk2a0d7ybvxfyd7ao6jd',
                rememberToken: 'lp2d0ptjbud5lg2xde6pircgxbmppzf1q2xddvoxsvt5chb0v5cpsn17nbdq9seqyv3m9xwf51zthd5lt6k6ypw8z68c5m4yupuxv8r6o0crzhnwsbrcaj3k0n9o3utbt6y96rtj7fqygeml0il152lpi8duhzbktw2i4zmhg1hd23qgca3ewmddc6ku9i6zq3qv4wxi2tbi6s2njn5u1f3xgou6prn700jlgmk5aqd4xile9w2r569c7iq6sg4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAvatar is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: 'tyrt46mb6v1dh47kslxvw9rhgo2idoc8d184mbta1b1m885dfvbzz1mvbdf17ga9onjul5lope931sdl4j8ddf3srcj88rd4dzrfzqhgb3rknd3r7qj7967k3th8s9ti8o8de0jfudi8fxlsweqeiiffm1udbmdkjoem6vgywnyz2g0hj2ld1vzc0bpsjawlr0gxpj18u9bdbj41kepkjkish371m0h2q6qbbaffw9ihs4130n09edccgwp4gjw',
                surname: 'olpn2pkllw19f064x1yssmdo9zkcnmy0d9thpdjffcfflrltidmfb1rp8q6ot5u43xgoik6s456ww5vujzi130mavkinilurge5l3mvn4tlxpffygdozo7k7sgu9j528fduhqzxa61vwfz7rzl9i7pujifqptzq0sfz0uxorqilgogbrkx4ok3szqvc95ho0odxzg6dhtvajxwvrplsa6diab2z98gagljr2olhpykg5s88h1py05g9j4dfampi',
                avatar: 'mo5pu70v0ckx9nj2d1e3to0pntxdfuavakps7nr324ctd6qc44euq61r918yi0ldh3uqnz1tfltjwnx33px37b0o60vnzo658beyvnfthv0y2bmy1ak1qog5zkcsv6rym2qr5fkmgkk035ifqp1eeo8l4439zc7bwvsknhvipir8wvbcjjbfigifpkuvq6qrvjxux24f6u4doix4uora03bgu7xvlhzrn1564o2ceg7u2m070nmv7opct740zsqm',
                mobile: 'fsbcsmq26t594moo2dy26vvh0sx6kh7lgaeov63zgw198ah5ahsfexojcvf5',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: '4cypwei90muxrwdt8zmqhkd9hz8ztdj9wi3y514jmfgcq2j5h3yfls78e85p9vdtdwxi6fjupugsw887uiukvzfauvlpwdbbl92edaj3lyowthi4syx14gtw',
                password: '70bhgy4fd733vtl10c3quekjms5vzxyhtrr6ta13nf6plcvt4chz9y20vbyzzekdrfmpcj176rmw0oud9pshuoe5aefv9xleepy9uifcuc6w4x9aglg09qr1iyzlsxnhfocsosj4rivjfoaqoh74ht4g3t3fh929uwvflaicir1f292ebvsb8dc6nmrczdzif77jqqo0z18hpji9cowx7f7zmi70kooxh7j9a91tj4odn7bbrgtnocwllzwtyvm',
                rememberToken: 'm14spjy0ujvpyjtjat8qidwkqgzt6tvfed6ujjntid4hxixe3w5rm3asda87ke54lc6ei05ar1a3jk3k9ayeskzjqlzm7htfe9pczwi3eoexunf0zyfeuhw48silf5lwica0aj4z78l7ndr2wsnchhgojkeju6a09bm5amn3bdkfhu4o2iud7v1uesxyvkfcqbbu2ni81mkxwu2vtjepbk2ez78c5jzc5fivxuid7nseoqbzkngs3g1jg5t4xl3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAvatar is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: '809sasbgo3uocg3ifdstmzi4jva8gxstjvn6i3f4mn8b7zrzkvgyxt8f324rs8a7ozjgdkcchfaas18t3bwnvdt5qe3yk1d6ji9t19ub25djfh8tg5vdsh2v6s5ausqdgllocrzw0zbs0kkyc5p6l4ryb8i8nz4zqfsgm31nljkjj8k70g23z2wqvdtr7oc0jko0dr4un6yireefdneezamrr5r9o09sl908ada9vfvnod04ubybkk4b7ymee7n',
                surname: '8i4op5p9dqk81e0k8m1z747hkltp5mc1yho8wkz0y9nbpu5mlg88gj8wonvb32i1lmrk0epjxmbcw7uii6pbz9htsep47dktgmy5zwhd39sd2zfgfw3ls1pwwj5oz7u451zvnq28ubrl79b3cp99e9s00ljr3p6kwfnidpq0tpzadi9c9t6gx466qhjhiarvrpi3eofxrbdg15rgoyhyvu1j1d5fuouy2m35k2sa1jjoqepsbxqaj81obzlmfzs',
                avatar: 'nzumc2bmydbc51k5yowvip3ucxspttri5so3gcbf04n9do9ds90eoqgp30zof07q2d0yf1zxav5l5hv9thvy9dzv7ecncnxbq44zw8qxq12x05cqy5fs6f8f3ubl7kzeody42h6o5ckf5gh4xg39jxhhs2qv7ew8tj52nsku2gu3qlqu0cmrgef4o5px7ctxecbgaow1065mi0639s8mjruunl6sleladsaha8qi13tg9ancckn4y57ulbiuqdz',
                mobile: 'qb3099pxl28f7wyd4br6o5j34a9eirefe38ys6lnd67b1zfjfym6a2ieey6my',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: '3dhf6lk9yrvoehsg6zg9ep517o9lmagpy3ln3a5omyx0ujfb6f8dym82annboiaqqhqbg3kzoikw2iz76mj1bnfshkh0pw11lnquk7tgy3i419ttjak6prnw',
                password: 'w6ttx14xoktil11tf8f4ky2skc4sydro1v2z41ge4vbxaohn8csqzcukbgocasygstjxi77cw49tmv2gy7kh6h4defdoo5vmcqk3nf096hdmpa3d2dg1ai6gt2o51xaa67bf6wmp13zk0jv1bvkpfotcld95ehf297zjtbhdl5ptsvbznj4idtpsny7tfz1k92ehsx37943ff9dxbpbawzv9elvkmzm3iatj8vw9pbc76oetk6j3ceeqvc2yo9s',
                rememberToken: 'ibhafchy4m5g6xcd1es8ffqucj8w08vpkn5i94w76454m6d39ch43svizlqnu47yghb7n0ayji3yzmxtqxiai096sxurc4n84tjloj93jwyd4465sbp6e1rmwv6ifgknexgpfcl4m6ymfbmskvijw6avrnniep58oi1eohtwyfkjjtgukmaazmts9u9016trnfipug9xpygb20aph0efghn031vfvcsb70crsj7pf706mijvpjdif8tiwfy3fg8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: 'tpewurv1bcrkanq545gbrhtj9erkdy0t91yei89zwda0552z1f0orsd208ya55vwqgc1pyq2svwn2ozx3bkscq9zu18onskjpo0v1t4vpu0ayyhgpxmr88tackjmh61uftd1zhpuimsmsxz7uohw8f7lmxqpxexmqw5vvgk7h7tbfo4lk3kt38s9mq5gls465w60tpnmtwv27eunvhwgsjdkqu32wygbosz37uu24av2k3i5kdp99lmrz1ovcld',
                surname: '5pkrlaw1775wppvepsds4ta1axbnk4bs6ebi090k15mqzbed4oej7aha3nqehdk9ymdskzvl49gv0inxvfvus10abwkzq2my7o5bi1gtuiqzpf9ontqth84im9qqgb6pfgv9uhwxzdpyuoa5vw69bui2kgyhio9boclba47726j0y0o0tvrkhoh21jafc9upq87j2aghl0tb5zjypwx0ullauxr8av2ec80ckwd3iff2nwc53tknr9rog3jcqr1',
                avatar: 'dq4ekfgwnx95zojsaee57ucdfreol03k6lo4tag4hrl5fxz0v1hzg4uda84qk0p50x7vt6br4emwus3uto4tn57cpmnkwxqfsdszfxjoxjbzewixueigsc70km959bw8cjl50d9db3cnw7jowa0lv6xhscnx98sduwr9oqgtm58hb9lmr33zjalpph9lt3w6o72ul2ek61yr3e2j0k225mj1ma9nqqech6j39492u3j4j94b58tl8nk3cabbal6',
                mobile: '9tmcvods3oqe6ndlbo15cucxhe1rl1z31p69oajmtc8dfkc672jlufmerqik',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: 'zprov70m4whtnqbdtkqks4m73eggmh7pnad9wmbxv3914qznnvcvxyrz6yl8emqlmnf2tjjwb5xdl3omvz3n7yjh24s1ds6ciocbuw7pxx55pi3o6t4czgrat',
                password: 'hmjbugud21v3ivru3uxek275r68etjo8kkozkznhe45obmoeze2la55l2qd9bvn4lzq27zwoqzg7dqt6oi70i8mxleyxmjk7wrs9mg3ub55iayxg9fpgbzmh8ha6gbxtzyho54wbfcgbj86mws5mz1sm1zj1h26zi9k27x32ygjnnwtdot0dzabhx1f9xn6gebgq9pnq04yhk789u7nq7u0rmylyyq9af7b7t44t4shwms0trn53gyb7qs3g3ks',
                rememberToken: 'lhqj0msk8rjdyhsyavxcfypgxgzf9toy7ez3ep2ksq647j3m7hn1392xd0n70uf13r6i0ji8k2wi8fby3u2k8cj26dxvvcdazg9lyezdi3eiv235qeeu9g0w73p9j2e9a5q79lz7axncgv1fz5shwdazxwrw4zgfndgozuwtslttm71eq8ahww80b3eg83hw8q17f5woba4li67i5vy8327png7vlxkvnmvdb8lyk3190f785x0c6u25xspf1ps',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: 'vd44jaydjcozf1w9ngqw6ck6qixvugbz2i6nlbkqiqeamooceq0u69wzmz8pbcyy8ww53tdjswsxtlcy6hmcf518z5c10l9cmn90a2uiwm3n88bxg1vjvfidrf3t6eufohvcu7eqiccbxwcg83mbvmmioxt60n6lil8gecr6gft059ib25g00hzb4x5kaz18zq59swj0iei4kolfammulsdkuskrtyv80gzymwbu1ygcfl2n9utfekxfimwlfzy',
                surname: 'ld7qo1q2f5m9ukeesn4glyvb8yq7y41g7rlx39t56e1f8ncm13x4g3jgdn0esfas3fy67xggaisx7wd81mwlrdgikqwwo9lk1eyzyyvqd2vaeg3qnmt2hy56hexirgqjv8m02o4uaih3fcrsp94hmpfufra6ujrte1melbfmko4le98yfnqd9h09wje4poenwucuh08eeyti57854f1j25vpxnandxfqb3au0bztphdw8btu2nghlz2ccec70bb',
                avatar: 'wmsxdfabzpfbjl00m8ufeornq36tl81micvrg8z6hlel96ua93e71hsbeh6e6r5muv19ymnt5xy9fbh51ukkznv0ioltjjlywhwg9yrjo0tutnnu0l9gd3422wr67c47mo7js91j4yzkgeln6oxd0jd3l77cymth21z8w8fa1kaxojzksbfnwyv851w69qaf0r3lhvoomc2xcr9ylbgkk794nnqwrqrg4m00b70olg02pgs3puu0ocpqf3rl392',
                mobile: 'md185sdu85z0wxqm0v7goksehprpil444att2zrywijbq4337drmml1zt2lf',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: 'b303wkdzqiudrzy0eq6i2jv9dl0la26j61w1nxzc3sux3pjzadsn6e67nzeeorot2rco2xoa4b3nuscfpslo98ibm7q5b17pcn7n7jwsf48w1qbzjo8ymiy4',
                password: 'jxmkhpxfct6ilctbjpar48zyny4zvzunkphy8ffr0j85t9191x9xphte16ojzxw1wd02dfsajzzcikfjvzwwjr0zhql79nfu9661ki0gkmddqyn56qw1qvnb0dkzd53dqfrwmdw91t7v7kvb4ydazorxrzok2wal61t8fxs9u9ibiyhcsmbznosmcg6qm0hfnct9svptl2lyig3usnrjx15u5vn1r782oes4z6dwv17r2t7r13jfpdavpv8bq7cd',
                rememberToken: 'oocthtjncu0vkr2juffk37bu4083vyal6e7dw9vhgvy2rjthj94iyjmkjh8koeqf70st4aa1bcwk87xun4pxmgqcasn2zzvrgxgzklip8v0y6ilkoqkp33vmfo4zdifzs6lm2fiiiuyvpehzjqi1sqvaobgsjlvxfb36wth6p116y3on5hgmhri7vhbrnuwrkiyf87voax74xxu1l1erprtojoq1rgad38y2uco1zhqeme9j9k9wwn500z64yl8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserRememberToken is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: '7el7bfeo2hjsvetnybeirqk1get9hvgpnaj8cdhtixv0rlodwp7jl8cou5ae1caz38beq0vw9c70xa0lpmyzmzwwtkgkmpgsgel9qqrg1gh44kprsslo9hc8rl0je6hsl3lkc43idcmslbmocsigvjcz6jl318avdk398hr646iw75yk84s5lgkz4iltqwxzvfqnc6iatih5y7knt004elkzrfhrp4oyvdv154dz6e0q9bf6dfn1hh8su40lzwp',
                surname: 'cd1k96867nz53w52e22nxs666lffks25d257s76rnu431lfajp4fj81z6ml777u1bu6yl84k3spdlx35h19sb51i2gukxvgk119nwcaq0v3yg15hgup9629m0s7rwza5fu8mna7v7x2628o9es3j28cxjhjsifwkr8y0473s18ke564f952o9nnlyjf852otqje4nq965wvvkcpvm3fzsqn8lrnqtnz15mt8x3uqpjackk2s929cqtq4eghqc5e',
                avatar: 'ygon1io0spd9e49gkxzvyxm1ey78xsopo6auid4mq3x3uojv22lt8bbj9pu48yawb148ibm1oosw3z4byb1or4jdnhsaw2irggtkkgtejs4g7lv1j4qdzzudvdksy85mzqo3y613tolipu8ovtjadradve0kdknl7n3hui56fqsq0eo3zp214up0enk7gneh2iglcs2p34rgrqzl8thteaxae2btj8lp8ptj2db6vkyjcph2x2jkdp4cerpsi7y',
                mobile: 'ul4p5eyyvh3m9hpr82axx5kslmba9qhi4q2zpmki5g52wokslmsxvatm2ksy',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: 'mtudtxujchzzub00d8tm1qhkg15rl5rb8mwwl4vzbiydbxw9beiann6rgbq6q8ii55g1ssj99bzdi67z1ix54g6xt2uw71y92k8en4tn32r0hdcnk9z9nyel',
                password: 'b0ejgl2h1v3k8sgbvcyr18lueyehtlkfe4lokm3gxkqzow9icfmj283mwwm1mroc8andxfsxrlggrvdmbln3uv1f9va5rzxkrb04v6sl9mz3e84cbign4a8argxwsd5p40d2lvcf3mv9qz2i0kud6rn1kav96pquusx15xwjutmgl6m3pji48d25te66y4jwwvp9aj43uliekh3v6w4a6xbqelpbovwzedcabd6mhjeb75vfcpiojo9i0rzjara',
                rememberToken: 'i9y0vh689414aq6qw0cxzlzpltvqfq6lea69dnhe0i72lsxcr9xf872ejzvk2bf59vwq1o6q8y6dk1wouw3bvuqin9dwztk2cr2yh7d0w1an82da8pn534bf7rgdd1j25iubgw8jawtuf0p9qvl5nn58apty32uhc4x89pcdnchc2s44rg2d0zwudkwu0wv9fjl9w911qnxt1n9eaumzpho604o3snwcdhp2pqa96et91m4tt2wszhuph01s9ujm',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserRememberToken is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST iam/user`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: '1xai4emh2vjivm3xv64s98nzgn29h5uld23knsual75d4yw18t97697ahju1hs608oh2j0y57qi4mynmni4rbyxebde30hs47vcv8q8fgczj7qk7rh0xq78arlx28glnh2nit5c5shtj29v44g9n4jljakzk0krkgl0qf58vlgy848kb7q8smkibaa718xht0mt62ijqsdcb4cbf0eby82o9i5soh7ed53zh40a7jc92a12wxtw98lqa8da4jip',
                surname: 'k7q4e2n3006rmyjbaheo9jmnaceu6jwtxkevito3nvsmm1kiw76snrikb2pddqye2fhmjqj1r3wyf4zeazxu8x2i9kcwgx7z9a9h3yu0rlxwy548gtcds59v0mqtmc9prdqd9fbdgo22uzt6vpydcdy3uo9dwk0byuloyglojsezhlz9m8mtwi0681p5tm4go69kvaeo9c4bynu67c1hfr8n85q08qb1p7budsy0irsra4vlhls0plwph9y0ei5',
                avatar: '1qbwolmit43oa6utz25xyy3u3674zyd3cgr8m4u0nw8umdykeyyeituvxv45hk8y1fde89n91rte1dvi0c2q9htan3xmj5bn8llfi78m36bjg9fqs1x7desx4tuo0ikh3umi3vnzaampkmcj5xywfb23igyh9bno8dxgq0jhd9q5sut9xx8mhbzg7bmvupogmw18hpeny2tq2p0805khag8txzsfect8p13jnojphr4ycxhs8g819u4xcp383er',
                mobile: 's90eudb6z6cp9vgwxy2xc1yvmct2vgphmvt6nyb208omuzurbrcq0td4tw50',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: '8ubhqu31ouqo6xxdg540w51tycf0s3oygykwz9jiwihq2nhgwceajcyq5t05js0f3x79nntxmi8s7ebprgwfodo0vl9rv1prrl4nzr437ha48zwhxeade77j',
                password: 'o7onxsk5v9zt0wj6wftzhza97rn9th80df6htyd0lg143eq5ii8wjdcl1yek9beoh0es3tk5v47c0cchm8enufazlgtc91t8timnbszp1g6oo406hq71r38r14ci46h6b78d28iugsuqb6llsda3hyfj1a3pm19zvhiimdxb3h95v12nau64ldfunupx5hl6c0ivuksoxlpajwqb9l6byyovkn4b8hevwye0c3foay3wz0olf7h33u0evmau8le',
                rememberToken: 'qro6by08a96cv428m2cuupdosafn3dr1q5wis7lxf0m9hbkj80wn6uvbq1ojik9n93tf4poeh89pu7etlia4sv3upxvdoluihbt3kdtjoz6f8ssdgegfswhe6hrp09r0h2cy829xe4g3aclxes2bjfb1k2ee4stph0qrg9osbya42808rz2cewf652ygq135or1zbxlb0t9epab9hqyqiyeb3xyy601fzkh7joznornrigvzd1hj2qnmwejadt1',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET iam/users/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/users/paginate')
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

    test(`/REST:GET iam/user - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '6c19c764-bf06-4b8e-b68b-aa27d55397d3'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/user`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5b70ddbb-d674-49ca-9069-f3cb6cfab48c'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/7db422d5-38ec-4efb-b8cc-b561c0fbb7e6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/5b70ddbb-d674-49ca-9069-f3cb6cfab48c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5b70ddbb-d674-49ca-9069-f3cb6cfab48c'));
    });

    test(`/REST:GET iam/users`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/users')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/user - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                id: '7d9b80f0-48dc-497e-91ba-7dd90972af64',
                accountId: 'f814ce5c-616b-41a7-a8f6-d74fa0e0539c',
                name: 'ynqcjrx2j2p9nyvjvliudsi420mcmqmbd8co5urnwyfa1st35pzpwwoxn3zox1241317h3hakt3f3mxu83dqso46j9219pq67ig1lyrn5xr68k8ybldnu18imajci0d8ehime5jcev7hx1ltdhebec4c6hnslui3uymwxr1pt4356eozw9jmcthrcgba1ktifg3mg66wj0eif578n533lma5wndch3mosuggqac0r2nmtcjfufnf4t2h1fzendf',
                surname: '12hkq4idqa2yh5i784umh4hrsu6lbk7p6qbr22n2zkastxpt8xrbtudhlgh1pm00s8k070ag0wxkefldhllxn3if3ltmf8k3j63zo7a7kwn45oaa7kbh1e1z71dvngf0erq8ak4l7w2rlprpqp7wrmjzw5duqilobb8jfgxzhp5qnpd0bqyoffxzur8he2aguhiki9k8tvwvbty7r7p8nd0yiibpicimspvf0o14eacgyguve6xavmjxqv5kdll',
                avatar: '85770neg5a5t1ux32h5t6pdnr0nqrv97fp12yfxxfqyrb79b1rt3okki50lvpbyyt7itfwlzxqpbm3vrgqyibv06l4fb7ajjzmu7y1nxtf9c5n53eplbq9iqglaklx0nqz4rejpbclxv9sblibofsawe9bmoycsz7bmqponav4ehjc9z8a6qd8hwxnn9rbphcnlprymiuaqlyegy2l2efmh756sg33zkrj22uamypc1w2b34vvtgwyu4la3a8kl',
                mobile: '7prpqo9xbywbiha613j0f7e2oppodm9rrxue40lkhue5k4za9uj7he3v321j',
                langId: 'b1eb8250-7683-41e9-a7eb-a8b5a31907ae',
                username: 'ueqgczejtx8wh3wy4dxr5tl6y3t60o6z69phkpalu5o5ajhsv7q27rds8w4zrajvdt6l2a6q95qgjbbeq5m56pvltsaje0arh1p5gln34w1hg82rubcyiqdw',
                password: 'czarkwgc949dfp5gouxgzgm21bwv7lnrwg0mebk0z1795lnrqbuofa1cp6lzlsfwrdxw73r8uy0mvgy39g48c1ntj7trsekd8jrr0zhbp4loodwghqvqmoa0m4uxtjclrd3hx80yy0tgi9iefyxf35am07yu7tzm02y1iyhwfisi2yfawr8gq1zu0dc5n5otcd1ii0y8qw2slq4pxurcsesarzd6eudjf9zeq3ssanxy75suf785it6crhvaywx',
                rememberToken: 'nj0tezp9prc66d319ng1pebr5v8end1wdf5vp14yy1yrn2n3v4ls2brk5saes2mvc1tbel5z5e2l3d4dqp8p2gatadqrsvpm32c06kt09ci3rsudb2xo5xsxxeyh62t92riv8m4smg0gy9hvd6r3swy0blpthb314vedtbx50qedxhi52gspvmhcwpurrl66avepzimve9z9x6vp33eugqbgsc2bqfhkh9wvzqtyqt61hv423c9tq1d6s60kvvt',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT iam/user`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                name: '7lzgc9pq95c2p78y5mb8xd63hvrhjoz0qjpufh7lsgwt6m5sgzim3jlb3l98y05wowppc4x6827ugphclm3qj056cloku6qy9rpsroh8pz4wqwbpp4reiln8x3ihrwvvsdg3pm08q59ybne686wzt11uy69zu3assufwdknwt4xupoiucuo2l0kg2vppb8pvblrzqt96fkpoqs6m47mo5tl6leyn84ff3am33y5dnu4xpa3c3lr6n7sxd1mfigu',
                surname: 'x30dcoz68d7gjir7vgq0v9sbhhzoho43cf0vpo2ljj58893ok9uc7kdvkn5vjtx0gyvcwoacn3tp95jat4zu6ql942j4vlqvo0vgbfu6l5l6sngumlv5cwwjfgojwqvrlkh02bpcqmk5hs0le1dt3tzauzci5xngsxw3gej3q1x0st49cfjlu438utuc4iz2j4wnmkw1ko1qisedrsvpcj2bajr48ymyoi1azx4z1igu1wmudcmp1bcdb8flh1i',
                avatar: 'tyib46y0fvtymm8hqul6footnws0lgr18l2cwq7xuu4u48l3wv2jze0ya3a6my8pnyfehbaqv0n9kxtubep9z28o92k5ieihnddyfckxmebny9frscabcy98uxbi2x3wd9qr5lb7hbmyz51hpdo6wws8vmi5gc2pdp7j5sgy7z6kklb9mxyf5rc7pj1p82ws91dyksd3lwe8atiji61e6u2mg59rjitueiwlpsft0rwhkatadu230kc0kjr587l',
                mobile: '28t31l7ige6s7q7go5ukxf673uhh9zgmw1rurnphl7md6nvc118unmms00p3',
                langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                username: 'kemygko3g4nzs9u0nwd8wgpg3pj54gk5pzwvl81sz8a2cjgnuxf7h7gwsdhko0da9lphdewptzjjpj59xygkqr3n9djp6x0svy4wlfervuw15eg90bo5ah4o',
                password: 'kr9o6vc7b5akx2qfn4x1wmcjksly8exjjbfq1dt3kobrcm6ltuo4rj4zc7kyoavrq1wnmgr75zkuo3ee8e66d16d5b6pc0bsba1zbi124idugekxecnjci9ydgbgmj9fbxtfqabasw33em8rryq8jsutxdi76tuintrm1bjqjegsq0efyigap7y5n7iwsd3pzsdevkc9t67so9pufvnfr53i9ycykffd6vwgstgmq1dnymduo3br0oqqb2vo8av',
                rememberToken: 'gr85owtzn2s4rhmeup5yjxh91kb12azay8xcambnogsuejs630b6mmbvl8fn7yo9lpffg77f0dm2s6qgelttgij6st4e9psma1iqkn6jdx80wd000snvptskuhkrg5jb8pce3tzkqwih2b4ro550zeocglhrfky6qu2izrjy4yp3lyunqjg2j6mf4tyviaga6ijui13wbfywkrqtpktn5jyj5i796e7abjcbeklu89v1g1vgf6zz9f9klsse9h3',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5b70ddbb-d674-49ca-9069-f3cb6cfab48c'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/c8864b22-47aa-495c-90d4-0e3bf65c25f1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/5b70ddbb-d674-49ca-9069-f3cb6cfab48c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateUser - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
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

    test(`/GraphQL iamCreateUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '2c76a4b4-506f-4d98-8418-9831422c48e8',
                        accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                        name: 'y22h9yv2llvom77yiukjzr4fepxndyl2hjh76llomqiyxedpwgyj5qxg7u5d0tsp50ot15wqrntf0ffybwcanvkx519fs6v1ny697dgqk8kd6za3hhkrztyp6npioa9d3l29b9b41ujwrfb8ujzeelmkuwj1frw9in6mv8931gnsc475ocaet8lowho86pvks6swjc937rbx64jkxo0fnrf3clffnrj5pvr0cb5fgkcjr8gynag9t0f9abso7g3',
                        surname: 'b83g6jtoumspwiznyelx1che9ltslqztffhuu7ufcuomj43y29v8treytndf4k4a6gfu8uubvykm39gfqm5lchwv8mymkphg3wsbiec2cicga33w95mmzcrlweblg830xkgpv7wyf3bifphocqk4zxb26xw8pjbvqlhlte9n2ijyyi85on0am65b9q1m5lfc4r2kt38wvfqkhmeaapr8o8viu9h60q0nddb80dqgwnihpovot9m6jtixq9u4m2t',
                        avatar: '4igftf0ujqtsl3dwc2uismovrcgvpowc9mj7hnfuxga7y3alquc5wxu2k5fn2e7gbx9lzd7abc84q5ot1f65rruk8922t5t06sf7mf8z55cmffofiwi2k6giun1yy2n18aarc53ub2ksm4tz190xom0e5axej6kxdjgu6t3arllu4la83o5q5ymjh6dyanb3mx3253r0zpdyc8edqyutm7k22ucxyoxmzsrdunxfuvlmup6iarwamr56itqzsrv',
                        mobile: 'rqk94ujghx9ckxz6uxd8v0c45q7fxticjm0p79czarhijt4meahcvouuds5x',
                        langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                        username: '7zpwqhl4b97dcqe6n97qyhd66rmhk6aymm3cxl2ngifkj6mwy4pb1oaacprbba7e5xv5oytypawf3u8l7u0jyy2t42yvm5ul0w5s1pp2j8j3v6i4x6fwe4df',
                        password: '01wc1egoxl02602ihg88as404ulyn74xc2t7inpg1ld76dqmz46smhwnsui5fqybf5yv5f4et6vl530aokiso5xn0gnl60z17wtlg4nwcituzd6475ocks7zdifjm7u7szzfuac06u4o0eddr975s9enox2bll3ax3njeigfiqjcr58k8oxselbvi4xobyte5lsl2n0vgviawz17knh7sshewbmtirl0h4shc7hl8ptubxm5u1pjamaocl9rbx0',
                        rememberToken: 'xt6sgkc6pzokltj5w3g3wxh0vp9gncczeiubx8cba91vod0vrln7ymsptoh79g72c2g4644yeunphg5mz9enxfwplqjr66g8st9xg1uljq8mwk3giff5vk8vuy0p1tlm763208lxe7cblybcbcd9czam3zqpec5hxxrfz8o9xyhkg2iy0orlooo9a2wrki1lvi8clxwzsahzj4bc1r2tgwy1d2nprbh9nogu4jfy4ocg0n30b59w3txa8s8bd6j',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', '2c76a4b4-506f-4d98-8418-9831422c48e8');
            });
    });

    test(`/GraphQL iamPaginateUsers`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateUsers (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateUsers.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindUser - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
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
                            id: 'ef0d31a9-6527-4ed6-ab5d-8e7f3ed3337e'
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

    test(`/GraphQL iamFindUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
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
                            id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('5b70ddbb-d674-49ca-9069-f3cb6cfab48c');
            });
    });

    test(`/GraphQL iamFindUserById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c8b97f8f-868f-4a7a-ad41-e87620b65fa5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindUserById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('5b70ddbb-d674-49ca-9069-f3cb6cfab48c');
            });
    });

    test(`/GraphQL iamGetUsers`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetUsers (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetUsers.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateUser - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '7f3632cb-75fb-4728-bcd2-38ac7d886a4e',
                        accountId: 'e07259ea-14b7-45ea-b390-656fdaa15819',
                        name: '0nmlm2ma14434a4c9zgv69cli0enqgiciqcl5vda4cxts27j3hvir82nlhtn9jttncc0ogx6k82x1hgl5n8volt3gvf2woty6lss633eq9jxx9jln3uxzwa4c8slpc7j16zmmwdt5m2fzgax6ls6i2ityz13rgr9q4x2bkhp1xi6okwm7f2olg4i2j7eukwcytnw11i1izho840gdaofore8zdqkl6brkx12oibvc403zilw3zgsh8ijbq72bi8',
                        surname: '5aydrcrdiv0opxufk1b94r661qjauq45f8uzxiem4k32u1wkbmxvvpahfef6vislm0je1jhxt7gqu5tonewv8quu0xtw21cxjkpnjyb6qz3up6frx2j073faqtofes7ljn9hz00cywhfxxbui3eewfn3a1u4bcez8kvh2g39yia8vd13i6s1ihsvl1qzyo9ubnmara9j4zyb5psckyizbwqao0b8zspckdsc9e9emrguq82cwf9daayisbu635f',
                        avatar: 'w3oymv1mffbs52p0zd278ufd4mrj5mw3tsm182p7jlms4aboakjqtaujfy84pljo5iqzo30ri9d67tvm7ftkqrjnispbfqpo299esc5fyopg9h5fgh73wniybpnjjkcikxr7ii9yzkxh4aq2h31utpj3qlk61t2pbi2r48965kfglsihp7gq1amw6ldizr3kkaqrxtmccb2cafs477pnneb689bjfwib0jkb19ci7f96auo5v5fpti8s5j8756r',
                        mobile: 'r4sav4315db8jz4u9x44lr885dyst81cmvatnj8buzxj4p719ae5senvxbzi',
                        langId: '17263ee1-9d7c-49a1-bbd4-3163f030df4f',
                        username: 'tie2mz0tqxmk28fl4qil8etes5qc238epo8ksozevtznqn7golvfzyq1h9mr8pkw7eixniuyc6ibhtlzg3zdeo7a12hxd5jueuqucifvhyvp0ysw0mlew8lr',
                        password: 'ghf7df749tkthivwikhdmcn0fekoqgi9cbyhfsvvxejq5v9lsq3tfalm6gyoj0774jj0xm4ogt181z96eze33kpxagk51vz2cc524azkrhianmv74paifo04pnu6g5rm2uohb5lg7xan9chon99ln13bfim37ckd1kf05ug2qn4y1c2ptltnrtm5fw353xblygx0b32t1a7eiatztp1m2mi4sa8opxdevnhulc8w38aouzvm150ezx23bk6rl5u',
                        rememberToken: 'wpz9h2e8g4hvkat5w62irr30a1bb9oa6ze3ycb1x6a9otl0nfpmwq2gaqdo9s8purbr96qbov0mseujs9kueg2w7ko62nghkdo8ftbv2kcwqr4xskk7ear95332s58c13t9mwrbpugimxdvwqe2ki8nzt5enujna5t6tui2hhv636ozcz26jrgpc8uwhcul2tjr53uhud0n10j5c5hscuwss0ejj6ud0qy9d6noddc0nri4itoq0fmst6neqsnt',
                        data: { "foo" : "bar" },
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

    test(`/GraphQL iamUpdateUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c',
                        accountId: '8403c292-1f14-4908-9e80-f9a448eb9c69',
                        name: '4idxyrf64bc4iuskfnh2xmov216wvrkf3mpinn20blii2eqv027cdcjygq5wqh1c1293rgom18c9kcx2nq0ezhvxqg6d1mona0dacfffyywhondftpzufm404gxb12uj0qhmg0pg0himnyrpphg4retv8a9pgyw0d3np8uuf4wsjkgqmpn08pbbkyeoe8bvtcm1xupntop7080olq8r49b3jscd3zb1ozodn06eqberxqlni8ilmhk1p28aazzg',
                        surname: 'gvjpwh4uuhrbdzfwpk69ocsotzlc2dtwor52gvk2jnurx8rfmi0bawik8q3e2h94h5egr796ra89bfusy7yy4z6d97p91y2i6x5gs37t330a0qqeenoix8yua5bjoaeeay4aehaxkb0fovxxkl7bmzcuajm2d8ec8avswptq4v1xubzh769jyip29rqvjxsv2zxn00symhjk6xtds0kvi9xaak6x4173tpl414cverr9q6d9dae1xyjytbiafbs',
                        avatar: 'wxtuf5in87vccj08m0gfyi8en9gapn5wnoy8jw8pj7hamspn0536hpg195i2bjqj3kd7au3kpoktpedg5lwjo0zbvon7puqv0k958gd5el840thx5x9qrfq99ru6h025ag6w5b9lg4n7it5o97gom0slbazrrdazk94wuxnywj17ws5bvb9whvfox3q32gi797u1ato9dgrrb2irqaemrjwt5a209a57z0a9ire9faz79fw0bgqu6oyjpv831vz',
                        mobile: '4kkzjazdugurchkf3sy18jczebjqp5d9iv99x4pg338oawzdqurmc7yof8vu',
                        langId: 'a654c6f6-aac8-486d-93b1-fa5048bef610',
                        username: 'u81sw7i68cxcrc3itpnyhiyye9d257i57yqk1pg9255ac7ka2ybrsdxtqjuxrzbpm3cgii0ab8pvtabfl0pbzwhzs6uub1ldukrsu3k8rck2cpszd7hh0t41',
                        password: 'be6n26thz4ebdzc4qqjokhga453wzkmpsuzbcbqnz8cef7yhnz4bu6iuut5bav2fvr73tzl910qtuyjzcw4rvwul67zwpk1oa3s5lo9ebgijrp7jnk5qpo4ad90gcdvzy4ztfgqxb5yoshbc6nd2o1jwh70tstgryeoi4ivp8wopug3yisbbduy5npc8edgp00rjrmgfa4mrwmpw26yli7t7j6smt7zkdfgtnjuezldihsora9cdoxcd13ny2ux',
                        rememberToken: 'bkxswxwq94csfj467xqqcpddbahdr3nzdut7wzt1jegcidezu47mf2kjm71zoftr20ps6kuqhby3h3pspyxb5c2gtvqvzw9phnf1oq53m51lyf77ssuvk082k1nke09gll095e4v1zom2vgl67zkynsi3cpwkzh68zbiafhs203ao9crnfdo8tr583svymninwjj6v0gyk47grwji7x6e6otlg280eqcb2693ollb142h1dltk8i2k34peq41ms',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('5b70ddbb-d674-49ca-9069-f3cb6cfab48c');
            });
    });

    test(`/GraphQL iamDeleteUserById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7bf43668-0893-480b-aca4-af9804018423'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteUserById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b70ddbb-d674-49ca-9069-f3cb6cfab48c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('5b70ddbb-d674-49ca-9069-f3cb6cfab48c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});