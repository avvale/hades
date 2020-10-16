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
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: 'eyjs15xb33722bttaesowotdgf5dlz2ot6lni4u6j27f6h552g5zot54eac1782kqetdf5es4p4fvqyyr2uheyr7jk1ffpev8isbtosr0uha7acrosdata7wrk7vethy6fvy5camfujozjutajl66904uam92o0gy5ylrwp444m813dstk8upujq8xcd9e7qm2r97ao9954kmik6qcropg95wirak7qf7i4ek3q1h3rpgk4fyh58l06nd5wvlhe',
                surname: 'zfu8s37el19uwk82pnt0c17eyuzc04ruqo4urkrpnd3d0m65x9km9018nptttruqcha7kwd0szxt8kek9i3qjbjc17bmud5vv2ffm86aqp4e3cnsx0a2ivcu194ifnodf7z6lnzwhb2qr2y3ygzg461ldipc1i9dgt0uqe6xki4ugceb0z053puhl6wu710oadirbl3pgpn6rs61tn70og14fuqw7bsgvcv8gxjlcrymfj4nmybn7n5zlltrc8h',
                avatar: 'c1njvru5csumlq1e143xbd3ynhbmmbb9axipmfeynmgmqt80t3oyb6o7cun3p9jix2shdpma1akgp07fy6om98lndr8jrfo1ibhne8k2a13m8zapjrxlslsjhjqdmlkytd59efhltvgsfba5vwze570fmw2gvu0zgpp77l1bjmj9qhm7lfbj4mmdis6ci2vp79anh0k2bqiv5nkvadhb67nwccp9sezjox01q7mgmps5og3301297rmz74pagij',
                mobile: 'aztuofpfdv7bczuvxxazh7303lxljeikhv57itt5de5x92xvccz58ewaj597',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: 'e8sr5t33uf8br7dhd92ekyph2ca22r0lnjfu0bqnjnah7vplipacfjmu8dd7b94uq36yieylubg4d7ervmepcyqn4dq29rwxrn31637dncnyrokoyaqdfh7x',
                password: 'twaa5hk1hneql9vq3yhc20e1f8p2eruvzn8esnosvvcn0o2m1thgwy9eo842lmdtk9oaki77h44l38mmum4imqib1u9ysore72hpd4x6pk4wrw4hq81wau89fw4ec4tk0a0hqbmetwm8l3ta80174rqwn7mmli5be7b5rj1v5ca55ghup2u5id8k5ztamhnyezr6y0b81n9t23ow5neo54q7jhl36yg989uttir8f39k2pamn72pkt59cfhzcm8',
                rememberToken: 'ol2vh5mwrbk4i1zlcl1fg2gwe6pi8xnw3wawvdnfw2t86xz8y1j18lpvbmjhy1d8299u1w5n5cmiq85mg8vuq7d0ouesmqn9thrrsvghkomukwqy7xvbm5r7gd7vpfpxpb77zvc5mt2tv0h9qheghw4at3dvxb3hg2jsj9bad2y3fckwh74qk4mporg1x6pkovf05hghyageyveepe4msbozmi873zudjecas4pw1guny849k7y5zwtlaw92pzo',
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
                
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: 'nnb55qtwnu3vrzuhs66t79ejg6xh2mv6w4zfuk7h2mdwyy5z7uxsmb7maeqndj8gm9vgipj9d60ekglmzrql93f0f7gkghopoun3ayuo0vo8aznm6w41fk8wpdkd59knfy8jew1eqvtd3o3gpxmrlkf6n06urhiix4ny6hojy96tvlyrfesiog9zs5l97t1ws133pomevf3t0piu0dntms40xh8twcr1d606d8f3pataore7lgdgyp3fdvh5jtc',
                surname: 'p9dplpaoywiss0wse502ldxdi6h6naaakpc836aim8wzb8bdcyfpgnsfau0qlwb78kw8du831s0z5fru2kl1q4w8j90j4icmt4u3sa0donsmsoqwa30kyv6mkjaa71y3b8k0mr6ywhh1c91rtcw5874e4es7rec8l12a1yjr7vyl3kb0vhv1hdkf511rog3kr3c37nm29jt1vgj49fg3d2eo7yfo1scqml607plj2tgw1k77vrk7iu0l4n98lqf',
                avatar: 'z51whbc2l8edlrovldpvetr8p03ngx4tz9cl3kqt66aa4r9r8c8xs51uymod5iriwj9qn2xh2t5k606qqbio83rmotlusu7wupa73370rdmhx2eak8euhkglcriattha7kpvzmrpajedn210tu9aysap1xoyecw6yspb2mj4bx41mzubhyvhbtxquh3uttf8b7z9l8zhsexr695y3zbe96ooxg69iqltkgofpcfgeubeljv288ggp9qt91invc7',
                mobile: 'i7noiqrwro53j8qmf7vnqajh6ihzx9060g920hq1k7edyw62k10309qoe85t',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: '3oh8vco38qqxkigj7ccn26uektj2157fqy58i52dykh3jc0npm7i40d1gxhy7ewgmys0q40v591v5b7n149bzcgtamlqxehqzwq25dtjkw9h5sq39e9uu3tp',
                password: '865skikl3py1mnuv3fgpfxa5pl5zadcjpr54qkyslg4d6zvxrgmupgzl8txm71o0o4j4dv1vj2fm4b6cwcxtk1pkhderb14tua9tuzjvpwazjctl6iwvr31qlm708k1io0delzw3s2pwekmlgm76xjf3bxhui6hozyhgjeocbew2jdmviwal8s0wpmw7fgze6e3kd8nvmd9o3q7olxrnbx2w66t5n2v9ftcqlalo6vuzgxhf198g7zvfzvguv0l',
                rememberToken: 'xatlzyduqqn9drutjhoryxn59fer3y32wai63pdb4423ap937u8vaaedjbb6y8e1nn2976kgfsppu4frsv86cl6ms2obb5x0iqnpredri36fldg5d51xjohb0xwdpgwfc5c9s7ni0t93p84n7qtumijbblaj3rt2ei9rlo4zpfsh72hqlego96sv8r9z1efsa7a49yoe49yldclhs61jo0j6gatzqa6n81ap2icm7p4s7p9b9mywu6fk0g8yi4b',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: null,
                name: 'j5mt0iyv30zbhaxth23nkyuztn4xszhvd2z172u4ywnnk7n5v00yq1np2a9oflrr7prhkirpwh5vtng2nf39clc9tpsbrkanrl0gipzes82rici6unw36psxbhtspg4znjszs47nuprjocwvdfvoroy7ch1hu0fb3z446041ojp96flmd21x782fry9p633gfihef2hg29os4d6db51vtdawgmd3sq7alsgxtsp52qnhkn2n2nsusewdkow69k5',
                surname: 'axreb0lf41shtdegeing2tu0daqjtkzyswsyp60iizeicnqdrgpp2vwqcncm9e3jc7l86fu62zbtacu8lhr2ljprhjx4rp04q1gsb5dp694c5keecmaqfb4m6cgpyb42u8v6818161uu133hcil148115gl7ptlz8mxncn43f34yvec5ar1wizbw8f0r8kaaocv55obbmoiydiwgggqde55w8z21jfprkwt1gar3h1snc2h24dg9iixi54es9rh',
                avatar: '948105lka0sxm2vt8avhdy97yp4xju4o9bp2ytgxb9wsv92fcxicuwafvhe8hltnosxz51yuv212pwd36yela1c2o6uholrhldwkjjkiq5xjyz1kmfndaybx10i13qyx5yz30fr2dm09q3r1rotmfhs3j3anofg9b9uchaudithwsewabds6ze2h2l4k0099qj713h7z4man0r9mgi10oeixpxtjdlew9sr6yfhlvcvx2f0ojh09jnj9rjpbc48',
                mobile: 'lfxgtqey006agciuxux9gtnbu4af670guao8fgy0qc0a6hwqotaf7j65u95o',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: 'bub3rbp2739fr1ie3ptrh796v7zuji8ql92sofb7wgs775ygjniv7b7ca8xp6hy9o786ufrxi25ylqqhxboiv9az22v38dvklj7ycewnt62me8uzhj5ywhai',
                password: '1d5mhy9uik4waum3vep73nt91fovvpnp6qhpov2yao5vfwukkyvjqbwgdercj4xr2ispxtgsolg8ygn6x6tv1bs9l1qa2uzzi247i3n7aalxmhmaotya1my6epho6hlp0y9g94390zvrmxjbxtwv8np82twnvtbcqn8re2aw3l61awrtfxpo4630l8oxp9fk0b3lnsmrsmlo1zgo5w1hcuk7g11u0sro37z4wfh1es3w5a3flx0qd25fk91bcke',
                rememberToken: 'vjwl0f9u5qgipgnkhz0k1qhx4ixgrkoy43xkoemglped0uy0vc8n655fbcxxb314ssm4amy5esg7jw9kgpnh5y1wd9c5d9q1l8xof7zzmr63urxsba1xn9oq2lh0k0iq8oryjwodk9yrju2lakhzv8vq5639tc2v8hx0fbt3wgvfokacrjv5nmbq91hunahw5vkjnvs4k4jexwklsxgnonp4l2lo19zj66rntti2umqny1x48xal998wrydmsiz',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                
                name: 'xcgx9ef7tl4jm7edxejhbwsym9aiuu3gvoyqs7djm1zkl9uh6s7tmc6yydd90m1l2twrteq2j1pt7jhhx4ksk0z8kpjla6edpn29bfyoforyszc03pofuq19rvhaoafqdz83zv3pksskygjeoczy1i07g7k5g1feyxu6yxnisxi587mthokud7sv1ml7pklb0nzg0u3nawgkh1nv7fnww1c6ku4l2hm2w7t6iwpel8p5ljikmw6jler2nwaexx8',
                surname: '1v8d7b7gcli5nqhofh3ta76m54eilyfioe3zhtruees9itzbzmc6nn0i9df88oh3e4l7iv2kxd52axwik944p6fqekaz495hox710529oxfyb26w0eep64po4axch7j21w4oriorsuknx7j84h7ppmycdwidoneqepszr6p20owuwq2nc3be0xuorhxfixpnutx0gcc6fn50b3gubwh2kii6narmhszqot4f9rqkdyfyuv4jb0cnipqdpgvzhoy',
                avatar: 'ltboy0ly2t8f7oetzbmstnh984z8mkf849f6jlyywne1d6r74o6vgf8lw6y5i0n5ol1ylt0en3a531zx1knm9v6q8xeu3p9hqitbthj4p0xfqna5nvymces2i8czvaygl6ac8v77nrbkuemin8zeqks55kg46jbixeephet2gdjondybrhylt6gysdmnfqn68egxlw3qwvhif6uq64pe97olc8utgsp030n6zsho592pg3xt8x4r0rnlvkv1kwq',
                mobile: 'd43bigzzx1psyqvi3bbj3qppkllefoezbdn6rw5jzy2638nhbv2t3dhala8i',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: 'jgssarplcpkazmj1btjx8pil10q0gvx5tmdqdds4lyhiemtaq4wixshk0evijmt7xibempeb0o244f61e9cw3sb5dgffsw43c2jdttocargvq604o0fkv583',
                password: 'ql3xthmswsyx0r7qsotqect0224drcddjrmf16fyra0wjq9aer09u3nuc5npl6mc74p9t6ehdi0xle8tbeen7a2f4ff2rtpptskccf3ljohbrzommfvval7erhgbft11d75sjvilgbx0f5k9t9gygmfgf54cr39j0l9ml8fhoaj0uxku87lk3d8x0m8f26hr0opdj838c253zg0x1k92hfhmnccnf258nhk65u34fbwkjo8citt4iuz3039bidn',
                rememberToken: 'ace5mrb4a71dhoyywhb27taujeuro61nrn6hdncfyaaazljz7dlg2tfygjvinvef4hmnfjvit7q2vaf78j1054np7rq0o66z0m3wxrll0awst2dlols6ed84rbwovezgmtjtlkxr2qx0dte1ade546gxy5qeso60myjq8ywsbttdctnxz1146decquxmtddsb4d9j9lzpvnvwunng2bqk4l4b78cfzlvcs0sqsq986abpycg24lii55r7gmgvml',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: null,
                surname: '1ox4nuu0gt3xla5c38kuc18cnoxi73bbr9h4g6ver0fdsayb5xn7on6csz9k5kwkyfld6tcn04iwpr84qh4ob3ehqlap7gqtu8shyf727jkgnht2x19z2rp05alcutgw1kwq74h1zp1xiztf0imq14k1j2ht673wmfny087n1thw97tif0yqvgciywak1ony7b0xqeexmeikio63yqw8mvrkl2nzb7un5hjp2fedhaaobx2glp416vgvlehqki4',
                avatar: 'agu82jtwnfpe0rj23vopcwf6nve0t4w5k3j4bkfm9m605bzjpwu9ejlftjwko2xp57nqn9nd6wx6yyc7gv9jrygbfrow3m6da93zif5oxiv16tpmj36d8xnj56f4dnrxzwyeq1zk31vdn34nbolmfjyyijl554c6kxaqi982136y4f1n3so4pxypi3av4mrljdi5umiypqf8jwd1o8m8j8nnr59npcrrnw39ur93rlc6ojxpd45ffuuokg5zx94',
                mobile: 'cnek334ekx93kzaaaiap0se2vew8z9pq1s9rq61emefswwf0dzos692h3xi2',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: 'a9wjjddj2qm17mwxwbvde8va0s8l734uix38hrr9bi7mknb611rn0mxbjew79b5dq4mfgu32buv3p8yq0zny8a1z5bguefdpxwg5670i5usq1r1xeso6h0fw',
                password: '9fzafjgbauf7u6odt8eq8s90yonnyatoy8b0hm0zfdoxdjjrqwp6brvwl2etrqyh0w7eb6yxudz4qbbyi4bm2vup2qwf35r5h9ygjf5zoi2fx4ewvmv1m9p65z73nycqxvmf9zi7jceg90r4go41nzjlihb6lyxk5bx87l9fogc57y01ofmcszvkkfwq6tyl725fzqwl053iav8o0sff1hm0zcym4rubw048u7aos8r63ptffnbs0qefg4rzj56',
                rememberToken: '9jf8x8ya9kixmpv113zmwnadiqx3kbhwezfjnb8c1ho6iocrciaeirlgxuzcn1nxrndwuzlvoxctybwpclmlxf9tw2nmo2hyzkxmvffik1er80zcahfn10iazt2u6bkto9676zie142sy9ti7dghs47vb2engtzkts94nvvxda6et6v866shvymcsmliump9djfbx12iyoc9gcivms2v5sx40dzre4m1qcekwvk91g9w13fctzwv8kpn9iqgzld',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                
                surname: 'c2h6sg8szmqsnguzb3fwevkfuci40559d4e2grz1fkywynv5kwmyguc750pd0k35qp2h6kwtycvdz6z9a8wx47okglxpwcjs6kljkn5uby16wj5vzlf1t629iocjrg31i5x9v8ebyslaiq20qb8qy2yod0t1vcn30xibj3yjpc0hv9t2g8ihu7jwars9rn1wv8qmpfjx27psnaa7xog71t8ikuiaui9zp0s0wqc9jyemex189ms0x5ee3b31akd',
                avatar: 'uxq3lnw135dhk3p57kchdc2s304qzqppg260kxsgovvj4tj0lufbcr0lfniiceesl4afdmvhd750mg63ymwftqizpzt3cescvhkocga4pxv7oqpo72iyvaz3bi77xc7m68kvq0yxvnt9zsfr5og5t7vavpebbp30uqsq7mywzdftlmnm77yziryiqlgfwtqd3zl5kp00vlrh5j8m7ln5km2gu8hza6y5vuifuu8b7669tnlrf0werlvs2u87fzn',
                mobile: 'sa77pu2xgetvaeqbfnivgma2g5umph9aiictskbg7vaox5zsubhhtnjhdd8b',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: 'sgyuqhfiif0ff6j4yqfzg940ra4zpon8tfhlub4wpe2l9fh1m54o01lus8vedktoc2ybfgse4bjsib92xyrgn3gkn1csqsn1asquq96713esigdl1f1kuyzx',
                password: '4hls5ybahhxhkk8oeclsjta1cvaskjq3csihpu5acus8gnj1y9smh3bue10khl7y2g522donenbdkbw2yxj311xf0bllija2qq4z3zdg80c96tj6fd362uj9vteoksw6bp3qeu3zome1yunw4txth18upmrkh3or0aufhvxx6lnisxzn4fi5202dlz8azonwqu92n9fsecftcj2z2m68867lpiouk4dp8pnkhy51tp50si39p4sjw3zuphknr54',
                rememberToken: '9mluzxolz2rf5mxu3hmp9lxcwzrcc5pkxqqjsref2zgh2ytjp5j38zccw7rguq2wdv7vj808kbe7aptuz48vhcymcv81voatwo35oc4j84nzzbda6uzz1xnhrntfa4kb4j6xw0rlsuvb28c5tnyf2zwhlwus21050g0pcmunes9zsd4wyfcc6zc4ekupnamum2gqo6nulwzxrogrerennb6lifyq557hb8cemz32dqwvca1c379oheh3620cen3',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: 'a7bz192kb5zul8osdaj4r6aqfryuclspz9qwrserqf70rciey8ufarbgr2h2sl7q49hwdeuibwkozhepptyri98kbwejk33min9ifhvkpi9y7h5af2meabhsyspsdl39p72psghespr5rt35cryvpeydatg8yimmcdiltjb91sjqlzofxo8m3sda2wkpuprxmkk98af2ig0msxq0tg7kiyajmrl2bjofda7emhsfr2qjxzy2ava5u55feu7xl07',
                surname: 'b7unf7g1vvamsn70mw27ehruvm2bt8kxs9hjiag7ze9bo2gp3w4uewq22e6edb6qt2gswodkmx1je0rj4mtshbqih6feq537kuwb8s9ag0aptm09i2wv0sv6k2vfrmaksgigug6m5rigkj8unrjn7eydmyxyf6pl392urnjyubne9j93q5l0ha7gb285gc56yy571hsy0d8bbwxhlbultr5ezi7dyff5o6krggjl70mfdxror9lfvrw7j43g0ys',
                avatar: 'u0k2uqhb1ufgd5rto7bhizjx94zm6500q2ti4wz0xkjv9k64il4l8ir35o6kssyhpxfr9oerwa8k4zlsmaba7981hrh7ceijx7fug8ztb4j5nqupkkp533fir2hm012bms6et8dd7c3vnxnmxoemvfzg9gf08qtf2hg4klkhmxnmyz8qtf070fcmyum2w78dwyupkadwzrdaaxw8x1gkwcwuu7pfvpwhftqmhiefas0hj1gk6bqpqw00ync2ezk',
                mobile: '7t2g1bpyce6lpl7z834dui3q6ryhc38mehii0o1mc51j65jkg1pnt5kiiez8',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: null,
                password: 'oo22wt9nz3f1hbn1fs1gs69i21b66cdw5w1wqq88uqfgsi1r6bspqxfugustesyfjofjcn634zafrc97o8vz3t3uxuypazw1611dl3sryu42tpv4nci6eu8mbhzlpxfyazqavrd9n8a3momgm832iwf6tsh4fwp1pio0wxz1kx1a7cirw302lt1oijqjwvmdtvxsrtidelgk38jody6wkwikxlikec2za16hiknqxshzpj0tg87urxva2qpk9iv',
                rememberToken: 'k5ssom7n16zxay4pmlhjl7ye0p0ahug7jkgt3s00ifqkamn51mag6kgcxmpchveuf4b6c04ua4m69f750xv2q55kvuv17ul1hpmszc712vy24dx90z3lim0wohw810qb3urftunbde2f8hgrybqs1luqhjb0kpxhit8v5vauiii4nwq0dj8ep7zbtzfizh17nodh38t77up2nr9xiuo69nulsac36713o0x8rz6qlvg6rtrpzm246qvfpx6pwf4',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: 'd3b2xjj4vsdvn1sxqthycdalmk17441qeyucee58x4ituftf5bvnkkl4ns98pqgctnk0253w1398vrfo5qtgbiyofsszqecop5ercyjnoxnfk9ympyv2k4e2kb6y0atr8mds6sviec1eoycth0j6w66h7zt2p1ydqsztimywxnkhash3dzqvrh4qe67etyqefh6w1uwrmshmcq7kuxhlz5uzxrft8gui69r9qyzmr3l7ndnaf54v5qh79mcxsn3',
                surname: 'fufzf93rebycltl9u7si6408ytjbwlmohbsk92nvgikk6td1vzlacwnrtvfitcp5o6f6evdg9goigtsihd8tzv7q5jqq8q9v4xao8pxzvm7c1459pde93g9svoq51my1pkv1chyglo5pq3mtw5izzw6igkzrki450ey2200lrbxy1t18aiwb25agt5gss58k7cijskgot8wqe0w3g5k8xc5ri5wnbnuow1rl2ddgyigfkphxc452gfd3nrfaprq',
                avatar: 'it7s6gmmmi6lm4xspthl0u9ng46u4ky7pubkmcmyudb7m1synwfrydjwcseoyvtf1gkziiaff6946ssc9prt7oke07e35wyubpe3lbmsizjv9gr9p3n0r1dcygw2hktws7rslv7iidvfm2lekitvc4afj4cfl660a5k3j20basst4g3ezp44si5oddnj8tr99coryrvp6ytcrqfxyfxxd5q2rbw35xtn6r6nu1tcpmbbutvl1vw10ce0w6hw0fs',
                mobile: 'yjz3p84fnsbanz5pu17rr8dcl9mknu8xn6qmlvf0v5zgbs206kqj2t5cwvja',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                
                password: 'rj9krnxnm1er0imq6h5aulof1qosidfynxkt2ddq00t0olxghh1iuf3usk2gvnskxcdhzly4unpwgjk4ws4kn0rkem9icy5n94htnuqyelgcxgb3qftszlcioyh76lv7up3tpixdp08jmtsepspzkqwf5emcsakw81o4uqn2mqbcqkhcj8knnttd4j7rnzq01cj3ykdxznio10rsul4rp3p3asgcgs20cdsczewlmgejsbgy9uqmzqm7ezwyg8p',
                rememberToken: '4s2ptxk3v73ol24fuxrgi4nj730chcuwdlrrk7ac5g9douzt8k0gsr6f0zm1n9vtfbwb5a1qnnxr1y1jq1scrwx9fyj1u1byft8eznf8a8yi36ozl3u0809u1cs86zcbyfudanvxrgh6oxhbqlj3yjn6m9lybo6sup5yllg6efqdan5nirun30ca2l204ekemj19pcluluv83uo3wr6auj63x0vvnlhb01umbiyv5lnzfcjh7y3zngqlwa7ifta',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: 'g5uzlpq9rbvwcq4wpubhxqbera96c46dnlik26ydd3owjv1by7p173wwoc10w7qoirpdjjcpj1zzqjp8tim6siivmh2zfy1wgxhdse6alig9dqvu1ba7cjopq5gkh8ykm8cjml4qcqk6a16cqaepuec57vx9nh6nm6unbtjq12j6czq5gyt5c8eo31m7y1mfuc0ww1aeucj66rv5bybwxqfevkjvpr88bss1c7kxkbvhqcb187q65qtkjxgoj02',
                surname: '5zzi6h7vytslb9yde82xmgd7k47cu6clpfj8ifq8y31n0xeuefrq9l6fiiqo53lzk714rr8renk3qrrmrr4xgnpryth1os410hz8dsw52z10rxr5uo28cvw4d9rku7uv7z284d9sqv9nh1inhjbso24ufk2fukobuvuprioj6z5gwpylgn21ey6tjnm8cqmjdneihqr37pl0m8csorvb5w34sxlbqerzxns4jniwcnvo4ma9wg3ul6xd37s4v0o',
                avatar: '1koijehfuf45dpn7sptym5w8ew40dx07jqcy0ln8gcnn5dk4j51ygt7q7gtmju51ryl6ef9mylqqjdrzcizobdln0guxtbyy0pje036v62qf017iyf71hyr7q3cvwxhgqlwzvzuel0vacqn5f4994te9ow1w7ur520chvq9t1cupptm2a4is2yq710cmnrqxnxtkxam31w5ku1gnh61bgila55ng6ji05h23a2jwae2arfykrifay86bfal8fe1',
                mobile: 'zh4hc0n0l5wlgp0y5lmol83o9y7z61lrnh5jcy1xj3h140ecn32ap1are7a3',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: 'jiw0ixx29vchsk548lnchfo4yt7ib73soi4vqlg3j4f3b5rodttjrmdfq0wb5x9wyn9zzw2ni4535pu7q3tpa3oljbgezb5j525cb03de75u9tk6h8923zy9',
                password: null,
                rememberToken: 'yg5vqwsuku7gzzh20ai8ot5dm561v20fav248jw71ln7xyzsrylilbitt8tij1cv2imlli5mctiotdegdf42gf14kr6a3o2fznzk7azciv0t93nmit9aaumgl79lffz04ui1kvxdccduhxh7jkb5xln2w7d6ipfyq9q4jwl6usru2r39uzh6hv62man5g0o7cplxaehdnzokno9e1pytirbkw7d7z7x6adnki29kjx5lmph8whrunft6erzahvx',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: '2ombf79l5zfm3qx6f4yjtshlxigbyn0s2r76mgqvr2dxcquxghaly20cuw07o9s17fynv4ieic8jmk91yy6gas0sq8v6fbt1cixa8o4yro5qyzj2syzkxhyxcfvs7bhlz63fjne1m8x87vfs9y5wwpwoaq8a7rzhb7lbftv4jbip4l83ndke5lcphzfpoawglfccay9o8nzvziz8uwra7fgsekvjgsbsn1thtyf6gujevl3fvgh39qxhsqzm9kj',
                surname: '5wpgn46294xe13v2ip63qf8btppd8tlcwmdm2vg0jjja28sap5wa5luyef7xlj5c7kgp4f2c791k33stx9z9oskcvy1eevw3d54g0auq9qycrdz7xyd3ymdrz5dq4le38g7krtkkta4igtc88lkrgufgejhgmc97b3ohbb2yy4qikytg9t2uaifb83g2xdxq2xfhcy0jocpjztaeyr2ybvbpwb2wny0jnalrueecfasfd69q6d2p6po4quy0iq9',
                avatar: 'njzjuqe5o7dnncbsqthkcml4bqxj4qs50k1nx2yqexxmktynhukfc7u1fkmmmrjp5s6v25c095z3xnh2xwwz27vw7cm4sm5xv7onl5sfqmz4e9a6qr4rjm24p1if2k8ndsjd4d1vvomy8imeglqrhnjvjei1g8nemv7mp8qtqkdczrtwu6emd71xicibtzx4mad3n2tlg6n6gag21kgv5ar150i8lyw4pijacokuh5yo6ar5gp0p80ypznvowyf',
                mobile: 'lkfi87wi9tsy06aflvd3dojl35ram9chlhbm0jf9xctm4wrx4c1lfq49e83a',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: 'qcjo1m06cu9h0d40l8ih0mrzmiay5ua3np6aeh5v2sxa4rxuiut8o0xw5zcp179ytahxbazbslr3eic0727jzkj7kzjv00hoec7wb3xw6zklxy779jdhtg8l',
                
                rememberToken: 'i89m8dyl4hn0vwepf857njk2olsh33kvkhf5ierkoz93q4yhg1kamp60yag6qdo4y6488670wetjn5vzf7oqdxti2yxvhlep9dcjzdrwod5zbfy3nmknlz3vtzxoyrkxfv3yu2g0m9pdylmiuj4domzyls8y8p4o80w9tfzwt1kqz3o9s1vp669s5kdpyw81c6sclisul6ei8ena275n2urp05rithcayyg7p9asvcoqadz6q8dvz2ra59wvcu3',
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
                id: 'hrpm4fw4zcxk1juewnqxymqjq13aovfrxm2ub',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: 'dc9rr4x5hunxsvdfwo0mkms8spzxvdgx6tnr8fosaxjlyhh6lu422bnzjptohkt3u7ojvnmj5aibwc5srlwc7005cdjnjkzcd40b2s1iguu5akt9wlvcbnfiv97ptsozgrpwyr11taubu2469aqnik8tff2cmqbbwpshzh6hjpjcqklsyl2nyv6fbfky5x8f6uzjy7sfpu1604cq1s4av2bhpgstlj01dimnbnfy7bkk43xvjniybgf8sakacou',
                surname: 'c45wybs906o20g909w1efgqcphjy042hodveippm71adk0vycck2ymcvp432uu1zfofhpbmora5iaaew4vfvy3yu51nuj4vxueg33g9n836gncjjkgktwkzun1r3d3jea86n6pi5q0mxxhvt5yru9wci2x60h2f0iqvfp04s6unp6yxi3si8rd7j6y5xclje3znfwdjpkgvhezxg9befdbkvns3i5wjjmw7asc5s01u06x5ikk710p8m07urn3m',
                avatar: 'g4qhsf6fkc6qv1p6vjbbskxt72a5dd1ysbggyvpzgfry46al2by1velsj2t9qi62skx3vtfvkck5kw9q2z1wmdjaqpdsyv4rnxtjycsw3jmup6st4l9cv7z8653qr7eeyx5sfvbxo086589hluv4zagg46f50csi9f6ski0joarxw99ur662eydsy4v9pdyvl9com5m3mu1mg2oi0uqcf4jlnflyh0rfypomibqeep0rrfzvezwlq2rakvbot7x',
                mobile: 's80qpmzni947hvrkjv5pyabrx7fmi2gujgwd69o2yik4c0c1hwx7z1r69vlm',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: 'r3b89rrn54qu8wq1xxzr54l9lsn1qrkzebqg05ak1nyaw6krcaeg8u36e6e8f4u1blwyxp574x96zmaeoi8vauaa6ja9jid6g4btrprw8tqig5zqoe3orfsy',
                password: 'h12rkt96c087hyq2sxrwmooxr9lkzd058mhkjn8erpc7woohe43qbdg7hi843bpp105c5ps3guqc8e2oyruvjj9ih12l78i2wvxny3zfszly0b5c75iw5r2acvc9a0vc82hut91yhcticcbb3r0shi327tnnwd1p3qkxb7dcvj6v18xksb10ni6l1n6kntybuhjmia2edfyxybtt344hghq2sirt0fccl6l2hv4b77bphh4vpx6nqaw7cvbn2oe',
                rememberToken: 'ujdh5fyayxrjpxkl2co5jc52loyvagik93bvcyfs2oxnvet7ajsmu5n63z3m6fzogirlbklrftgu34le288qul781hxp856151tib2w0ur5yvobvuxmppqeenekkg338sslcult7ko3gldjemnx798b0dvoi8m59vmtuqpfduzjzhtxxr8uuwj1hna6qfe77d59omsemghibdge7mcu7lq4l0rqcx1z8zxsdd8mwkc4v4hsib9qgh51g0a7y97u',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'lfv9w905w33h3u7by5mr1qq30gwd475okqrfx',
                name: 'wc6qfzb2gas9ab7kksiybiw865a4sq5x1n38invz1l3gjmpewpnhatzzj4i3fk727vmplvk9e5x7qb253hsjj0ngcerbfphv02bgqkqv1uev4yvajrk66udbgqwnpcwaxhv1fncp3z4g3n04ynht0c876vlwd8f2jr0mottievi6qlckttgpozcl53k0h0qvz11pk52fk82kb71ajgq5h8dz1f8z99blue68r4a4f2v3m3mhnelnau7bzwlc4ws',
                surname: 'gsez3ci29cctmtxaykaxmxm1avx6hs2jlq7sekt4tmi33l6g1jfzpe4k7ug91e8qapqjaswjkery8czspvhyhdg6hguq4e2wne7cfa2mt6irus2d38ruufu45paiftwm841uv5smsk1k4cb299cylbxhuq3bh2dedtm1gt1lzyt7m1cdak1fqwrn1e66m1bydngo6viluhtrwlfy5t85gara2z25ju07951900ryfoj0kju9sm3xc3ig1btgidi',
                avatar: 'okvoculal98m7w9wcyg0q0kuu3f34d9tt4h4ut8oajvoizvsvdc3emkmfo3m1blf1ytr2rdsjrnnb6bzgtzmqeos7pc99ijxmuh9blqinm9rekdpy4gyj4fe785y89ghd222l38guj21qthtxlrgm41du0kjajephw5xzs4gkoww7305c7tmddsnvvo5112umvhlhh67gsdbi1nxa2g483y8qkysaris251rfni3a09oedf6lu7r75quz2qsxj8',
                mobile: 'aj5fe9cuq8xlyyiqtei3832i6n9a9ikvohk1paf72y88m7g84co2hyb3s4hj',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: 'vtj2wfsio0nbmj2amkog1cvhxxhz2scr5tz7pzug0gosvj1vo0a2maacezjlbgfjeo96k30smh7abl36a9s4u5xmbmzdlks583fy35e88uiieum755n2ohl4',
                password: 'mw9dxonceudju1fqmunqrqtvfejr36d5jxg6as2fdg553m64lxax62yt55s0m8h6w2x4ny4bk2ror8svizakn94fe7u2v8c9bplwzk6fvtvmkhqsnfm60vlyw4qe6vey62hgk7ogygat5wna3o14de4r3xotrspqajh9rbblf701crld9elkdjda7k3b7mqqgaipyv09s4viqew80csnbi95vdp6i0jp7zkajp69brx72tv1yw8jdw5odqxoion',
                rememberToken: 'lar4ux0xmftzi49bcapt5pqfywduuvrz6i4rg23qx50d2xeqitf5g1f6bdoxbrbwb89czgxwojo2qfstpmu77z67i2hk3rhlh2scw70ntcz481n3enpa1l0ayy6a1u3aoui3xlca6sn9q62fo0jyskrahz0h1absar96ulwxpo24sq16nhllv6m8tdzpmplxhkr6um1a48tochhoa0qcmqedtgq23lzansm3z1vxmu344ummwmu4zqn7efs0zfp',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: 'vmbo4kf5k4s4yf7lcycpxuj75uh58fvnrjc0ndiqmnod2q8x1qtqj5tyd6dxtg1713c5xb4a338wk8wya8gd9v3g3kojot09ni51cae6nidrscoe0t8dfgh6mvn23s7cf6592xzf6h0csjfkj5oxjogykcuyutlycandyg70yar6pxx597gkpe8lbl2btrdevglv5h7c2fbt243au299yis4xwj86zu574k00xk5nh2o9co5bndrwxdlqf1r17d',
                surname: 'zo2mv2m6ungii3jcn9ophe9ebvl97759m99l4dy2q9oq9o9ec85h9mg3es5ukwd4d9ueigl8ygamm0f5ntmkmkjkhni1k812z8opb8h6q8pl4kyixyio58awtqixeqgit7i8fhnn1uu7zyx1dlgwdx7j6dbtibf8mr6dwbfmww1ho91zsftx81ko5mpjjisnq3woonipw7slc6cozsuc31mkzljrb2svddxvzm23y3964ikzx38pysaashlnb1q',
                avatar: '18kws0t1luou7ocx5o2h1fekmhlwyw61pa5dvl3omhy47nep93l8iy3hv4qtmqhbrll3my6mc2o77d26koxk80861mj6y96j7sv3q73uogswk5joeao9j79yzzpntq8k08tqcwe1mw4vvwwzpeluvpsoha8qvcr2vf9tbu7jra4v3kujetvfo3gwjbsk9xe53fk2ng84tulzwbek36xem06lf2iqo94zfrzgumu4sw96xd8x5x33txx9r7yxl7t',
                mobile: 'kiy46w69zm0k8fgwbq0phhmifm9krnxza5oqdmxx0no0t9ie1b8e9sif7zjp',
                langId: 'mnkyvkph60e02jwoya9cyr0imjg3mt2sly1pp',
                username: 's55q0a0qprt4t9iclv4r1vq4n98lgntf48dsvdw12vk8h0sua9pzlqgmb1tpn2vbv4ottkt4mx2lokmcz5u3aowh18egohyn3k451sepooetyattp41jexmp',
                password: 'u8azcegv17llrkz9b07kvcfvydc6d09vfngo06mi5716yjtun9c6jdmaorg10nlwqugt9p7spadgex2lr033kja7oo5kgj1730udip68bf63ji14etbgdkivynyg38szom29k6v5itaf4oq5ofkd14koxwh53h7lqh022xsiynntn4luwn030sgumw0bkpqff55q2126rws9j3bywqzh3tpa84m4fnxbfykrn63d3yivdog9xutj605gn1tey3u',
                rememberToken: 'b7harme92czmotec5h2kzi7ls7kj38pkss6wm3m068bhrvu5py2wj0tcjs85cavcnlzxqi0l5vb42tf1yuj4jnlbd4gz0dykesmep7mvsdp2keabwfjzyhk9y7omkr78l2h1jwuds79k94zbgiqq1jyu8dy8mo9vcy61upp61aawsm5804v9o6t86lc9wpa2yhgsp78syw3btnxdmf7kej9ws4ltxnvirbl9b65mflsu5o9jorxxvm8aftev04e',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: 'pv5q8915urue7xu5p56fbld1uq6gk0ovn1v5ey3tn64qxo7mh04cxwgqixxivl4y3tnpq96oowic8h9745rwpgov21tse1fenpwe6illxmjdbc1c2sy1wstswlrbj2zp058400jkaz3jh4549nwudm1zmtzakptsjg1yq1zo5opnfag4vpdabxz15e7k0izsotfhgo0ddhv9gb88oy0dgvl8qe42wrngeb3mpvlrnd5ralek2s8da5fsmdfnf9n8',
                surname: '16ditku5ci0fzlpeudz3a8jfid2rxw2w5l9hd5br15lmnebk0y4j7wnnlrkruv10opp7jfkcgrk1df7ruk6c6orxjwivntnllr6u8f14uuhtm0c27lmxhxl80wgrlcpirr4k7beofaeglfeyvaae8j54zsab2zt385gixutdvyvdzvtzqmbmjbao86pl3bboi29ptj75jrq145p8x3620fywcg592kfhp7isl9l8glpo0mh2h9775lm25tge897',
                avatar: 'yz8isvqq3vj2gygvzsqwn5fhpbtt2meqstj5kpkqohhys144cilo558u0dl9w6t69l5imwjbadhwwa2hsuksif1mww7wya1lpa2yi4xni0dyld957crtt28xmzeazxxi6m6txbvnwnbf5965yszho44hg8zew5fxuqni23e72prp48eri4cka4teozabv3szaqco0hgatcc36cha0urw0z4ooz4g5tu4ruxgloxptine79s643ocl2an65lnxld',
                mobile: 'hehczp31ikcjbiw6dykfbmm7v2jgbj9i5l7ounn9xri6nwvs5tcqwpwqw9hg',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: 'ss0upwc54ogt35jkmsfba7w9x9w93p8c6vrcqsf9odcb2x29wul3a1qvdz3mx09wr5x9khbxm2ne9prt6hppqj0pcn5jje0kvia1c0lnilqj4ih5fyvv0uu3',
                password: '6x4x713kbxylxh2ciaeqryvp60w9ohwdtk9ar8qq5vfnmz9p7o1s2iltig49u13gmcdt1w1lmrcxfyfkdbb02s4aezy1f1ivcrwsoicgqi07m4im8top9eavxkd8148sziboi1vg6d0tk3edkaknkqddimxn7u37ywwbkt59s7wtas12vjww8is60us3rjyx5rpr8zw70287kutg5ld9ndygh1n6t4lycyu54daiudsf7gzpucmnzvn45t7ktgx',
                rememberToken: '3z1qsrsghi4unbgm9lytblmmlejh7xrss1t1jbem9j57t2rng3waas35wffchbr63bwj6b15gbmd0rya0sxdbz0rokz5nj3ciizquwfnphz8960k741031bb4ptrgw6cxtu6sqs3c2is4g5lss0ccmmiecq865a9d1kcti2cbyeduvkmg9bp4ao4udpt0itop4cbyc4ti8odde3kjmel29x6eqfyia1o60bfx999zo2yb27t6lrd9fzrg2dl56j',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: 'gek4n2lq751bi28rh8v9zr0wc9mxljrr95vqbvak9xirju5arubgwbizwmi8wa50nn6s762k85wgei6pmctf9v2shjbyq3ozd9c6v110wrxwkzrhr76r6fdglvm2s6y89m5jzxeltblnxkvdih427ho7j6hzrfemcbwly3c5pe14yxzmlpc0lrzdr0s2j861kr4o5vmq2x097y4iwhustq4ofsvi2ihm292xb2972ecmqunlde82xai9pazdv5u',
                surname: '19nt9cv787ef9oed6dx5k5zo3m0ef57v265752bxlg9pjbpwf2sd82bj7jfpe8pgko8gkyvv23x92mbe459kkqhaxsc6v7oebkagibt1eg9ffcww0m0t67nzm8tqchir2l9livlxm70q4hb3u2uhqgi5m57n23c9ss2hugwl4igiw64qhwdofcpfvskcjqway0udcgohseapfaiw7j5g98j2ktt6w8x7ocesyke89lrd26n9iok6ewd0oswrpf0e',
                avatar: 'pjmog5fprg57r7rvwx45tccffxyz7cezkabr5xjmguuef9p4prhbvi7vupo97q6tqgjvkq6mepozkrom7vh2re86b3umcxzbi7509rcej1j8qbe7qggj839enec0v08sr3kkngb8og6eayx0qd94smn5tmvg49sf6lpcj1dfjs1rnlf0ffmi2mi07mxd81wvtaxvhscbfyrkgvbeoxlpczlvyht386sdpppsyr16hvzxhmtxiqdcz0b875vsewd',
                mobile: 'vzrbny55uxs0vfxcjh67ujwpcteghn8ajbt1ljj64s0d07f6z57nc645z3j9',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: '2hno7vaua2fb3t7dogszgv1z5ds4skmt9kbqzidchlh0og63unkcjc52o2cc1aeeuvhn373dpcgasqit8h355g78jlnk4m5yairtxhvhm6b4u1nlydj9dxcx',
                password: 'rjxnzonbgwr74in5xltb1d3qlzw2iaedpptgoupcurfdyptuzzok4umzgcdp91h0j5y33fh3wsvqsw8ha4a44s2y4fj48le291yuio0blnh6vg396bqqz94mjnyu4q6l1k80l6y0md96b2c2frw9nzh7rocd43orcd6my39wq86tf32wuj3bbgsalg0uj5ala7qbokdk9ydo6tiqvbgjzezbw9r02goebxmee5jlbv440r9uiksqgvsp3oge33f',
                rememberToken: 'lxfzl3ivj6ik65vmvg5rcu9t3jri0yl17vqwdhgn2nm86e6wyxu69c6to25uajv89sjfnd0we7jijsidfj37kz92pqzc38s6xd6bzxt1pkqe07pzzkz3nf3708kq8ma7ahf5i70zk8ej8hw4o93z8mccgw4x8nqulic2k7l0mwgxabsoodx87gs76p18bnp1xrnvhyoy475ddk9hgsvsn3htp0dztpbwr51de8427etp8hg71zsqibmhwjjtdj8',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: '3bwnd8niv85ex6q9e2gu9a92mkp26v4a635waozbpt0qkvc3242yov9jqq36tvn0vll8zm2s0azw9kqj3w9zxfqkr9umyjbfz4bqshnmtgyen9sam6jbccx7f5t6dx5u3j651qiklcseks1lvfizmfv96675vhb9wumokvsdekuw73otb01ca52ukyd2sxjq0vk48s56wvaoesjfbhgqdn44rjn09b0teivowp9nc6zzitb57d4gxdvdu6zev1v',
                surname: '1w4utbx4teonqxlky52k6wvkj10gbyyjnxqfkxjzrxls7x2yuldoxtkyl13oj15fj6mk4dcuhggra7tbh1mmdbmhv3gg789pae6nncauod47acbrxissz70q3178c8jqx7b0tlnzzhq5h8kpftxgbx42pz167q4iyf8v346a2gcbzrdg9m89mofj2rdra3h5r5xtc6zte66lw442031gm8vvk75jzsfshekncjp1yut6roo71yibl2r4xuksfot',
                avatar: 'l92o087vyxqb5q0gim7lioezxx1uogawxu769xp5gd1aikmwzy0ffwqg7rc045v2lku9q44jk8udlp7ko6kti3y7yaa3icru7s66ynwvfh1g5to2sqaimd0vi1j3tmnoi90k7r4ssb3zumhy9kgasvipdwg9datc1yzzxtuebel5gp2z6ily68my7w82cjvua4y80ltvpbz7jw11eoho44x7sueukswsmabkg1c6nj0dbz3l1txyhcggwnaxf5wy',
                mobile: '8o3q5kfclwvaywodu2ve4f4pkeo469jtz1n5g2ozvknv3iletf2gyqt5miep',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: 'b2m17p6wui30djlb3xqd8vdkt8qxs2zwy89kcv1uc8canjgxiya5bqw0nhvc6h40xhsgy8iro4m54ambyu8fh7dn5fv8jna0dw6i0u2snrlfbga21o2eprpj',
                password: 'kv49c7o8e4td8184xh2bqiop6mxoeegt7qrob5gmanjahp78amau7284k71ml5dvf77iu72xne9fnuapxkmlqzxt667tthtaor6mv07znpa3fg1rjk3eeyrq23trvgpzgho4lmhfl5q2dpm9pzbdcquy8xhpx94kvj00nkpwi3kyxt0znxrvmflptko0rf412og1ygbg6726om2pyucsq525whobnfbrtcyhnhvfj2fko0cr9rvyf9omucgebq7',
                rememberToken: 'jgsgd90j3ul7b7eksh6xllw4f0ef2ekjndp550711rnsgszv9c5ydu3wdgqm11qsb3byvw603bnrqq9xyt3hfdxzab2sjjw4w8fixdg5hita7q3acdztjps2ujal1r4qnhn3tp41k8qztc2xp8pzs2j5p4442rs3ig351dkfwkyfz21qsf4c110wbcqsqe597pttokofeokcp48hoq5pt70bvnk92u93fajmvubr20j3ml4udqs82q7wvrfvm1y',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: '4kymiqh92h5vdk169fym8cqc2o7ul3223jy6wjbx95t4lz26nuakruxpy5b2n9b7o1ke4016h5lullftkaoggflxyt2ftgbvpoq170u07r67a9yyn4cbr1z119n09hbkny350swh488jmjqna9cx63l841u7n50zd3z0iufdfs2wf19unxr7fcjicv7ipab8rfdlyjbtwmiamuisvgwh74xusib06d6qo1coxljyl7h0r63b3v0qts8ben1cgsr',
                surname: 'mvepvyrnv12884i1u73caljkalmh1jdpy7iyh8yksuu0ybi0k43q3qrxn8jvtmcbakq5egn72unqihekyy7mfatn1972uljinr2zgmwy0j66t7nkcwhsfb3wq1lykk75ol23moidslyfnsxhedsddwibwyp8ak647y4pc2izjh259c0tyrqjauhr9ruq06nc4n4t3dtepf4na3ffj77tgj8de45i54s1e5idxpa1v61nqzey1pboyppav7gr5do',
                avatar: '4sy211se5fn5sr0zzfk6nskt39pp7xl63tvwgnfjjwzxwg4trnfqou9tjubmhbwoytpd0qxw3onxy5kjwm88bgp623s96b8fff8fftq7jmzzdhd7vcx0vq5lfb05kvnnkoegr4mgsio943umwxivcbc6uia7ac7fwa2gum9lols9iucfjztpaxfpxn5dj27ys1kadruymwa2gsi39s6cxuizcnn9pleb3i5prrvql4j9z9yptauar01pb7sbooe',
                mobile: 'vxofr1ydlkxkp8kxrapnl8u1gxfpfo7ia33q5rbe4tt8kfwwr4jxaujs40j6i',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: 'ak6vkhkci9bwr063yonihxqj8k5xu0wl7drrzwwvxobcp1xgg37il19o613u1948yj9bql430pve4h592hu89uenunlc1025zml4962eqov3dvan8sdlj81b',
                password: '55rlr52qnvstoe2x5cvx069io2oogvysh6x7mxn748jn7t1hzrov6ht3yitajioetr5eyhkxllylaquf8ouyndr3y80wxr8ptzvu1t2dwdhr7sh5l0iugbu68axt84xqd23x43kou5w8lod3f1ofixfrd8qixpvf6noz2fjdi7dhhtzazjzyayhmf4k53kclrq461v42v01y1ils0d6lvod4b12h6n95hv52vjrsbsqgtbe7kervu7z9rrt1d6v',
                rememberToken: '9vcbbizs3k3trg82iu3afyi1v5uher1fwhmj5ry9yvzh7rxl5xaf4gl303xo7hw8aq70rpt6iw48c9nhx77sm8fpnu8bqssz66kfrang67evsjn98mgdlnj3nyk9fvhja8tgwejyl8a2qcs5wlzgh85rks8chvfjniofpm0h5e23i2kqtz2r65cjvtp2serj332pj01orxqwa5xxc5l38seomx3zh4ldnjkxm56wai0csl7a8ma4e2kpisio7sl',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: '07rmp6l2y6e0amvaa1qqleifq56kgk564shobr81n6cw3ula7a9ky7botjhdc8ecjxz6k91b456m1nge424xknpnmckvie3xz770txk0jk30gsrxnf85evfmf0hshvwir9jbbqsysz2q3zcw6vhlok6jifcn6gjc1p6cpv0a1sq6g3gf3errthfea7f2cwa2wo59b37rlwir5xu1pfeu3tsvd1gcb99jfypffuxhxdpryvwq4nu2e2dc2m46w8s',
                surname: '6z2eqe2vck6ooilny12dalz8sijggsludyo0a1p7xgnc8bfz3p38apn0ss9n0n5dq8790g5h731e7x6v833reqrtan7fm6wob6n2hi286eiegfn6rm58axynarls4natax29wqsk3dtks2414s9ql8m01rvh6zr9izkpo9c14x4dpkbbnsyzpe4vva806247wfoya1qccm1fey0gzseiye785x9smd1jkrpk33gmuw8j1hwo2e1q3e323bk86qi',
                avatar: 'i731gub1ty02h7ax08jubm9gbluyoaq6qtinnf1i3dwocu9n9vwlleh94ruvyqcijqa1xlzzb1kg9vbhalgladla3e4wufy2ohoqseb5iqhxy2anerhdkboyc41cej5z9t3lpeaeexx0l4c3uxwg0oc5cm5cooyfwq8mutab50npnmb6pbihmzgcc0me8a5osc5yubt3uu8ci0sefrwt1t73r5n6rjdv215iat8gaodevnyhcjfe07fun4w3nhz',
                mobile: 'wjyj6bkkin0phlhg2ig8pwv0gase9wo85g3v238rl0p8npr8ydrmptk6dkxp',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: '5pxfgshsd5atrnjykexr4h99mc78uli6k88khv209hxik5rx5068oemberpqrvwnajtmfhlooqu3s9mhk4x9373orgte900a1tgfg4swvohugd4oyf8jmrj3f',
                password: 'fc2ctyripixxdrbrzzae5d3gsvrb4k3vh0bll2005b3qcqpwwhlxndmcqv08bknltjzze5dvmmg8prgf8pd7reg4fx8eisyplibvgo5w1bbhj20mkt1fdvtvhg3eukc68vjqlvjewkr63vryfxtqyp4mcllt00xd497tqn638i1pzhqlevqqwk22a2j51p1mosw0slwbx43xzqwv2bbu56zwoyfb23yj8xrtai54eylcbsx6ml5fxggsr5cozd7',
                rememberToken: 'nwsl4jge1bp3pnqn9lrhr0anzpznttdl0936m9xkk8xytcj2m4ebcbse0fbp7393qmxdsupc9njwlx91478wi2kch1u3epqf6j82a0wev47cuhwy5rvsikro5g8zq6mtr07i1pbts5s89lp2jmhofgas60hz5uoi3bhmyjj5gai3no4nn56dzw1xqqdc7o4gdh11w3akucvtfw8uw0ea94r0sck1fvzm9rzx09qhzxfqdaf9nutsy7krmqf1xyd',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: 'f9xp8y1i89ffgc1womo2mri99929bz41rl5kn93rxvssjm0u7ox6xj1s0ylpv77nhhdm1rchcbzwsh23hjwrgmlgmqzcua9jxgoumk26e4r3cjt2ky1pr7fydy8rtclc9fr2i9iwb0a37s07ze50yf94mrojoi43ywjne2tpkbpej8zqcpgtmugn0ensndvd113unqt74mv3c2ghiyqlhpewb7jvlw9egasw34nzh55vnv50d56ulwzwdo21wls',
                surname: 'xlqb2hdes6vsv0e7zn05k5zd1lvvcemr7ynbuto2kypb451ih0vvzli0sblmo4gabyig39pfdso6g1cuxvsirgv3qqby73xfwtxipr9osbxuxhthe26mq6acfbdynknuzpgqiyh7nlb5zwn54njbuja8dxp51hwzy7pb8rklbsiiw16pcs5x86s2k7qughenptel51ism2stm9fdtrnjp4esf7l4bsl5m0jmfy5tkfow02rl84g7xk8y7tbhs4d',
                avatar: 'no69ex8up82qfw0teqcsn8q99ebdj9j5r055gc27e2rjsmz34z3zr0c487dy4bmjxf1ubv73l206h9teb75gje3mz4snwtdbvem6obimk1ko1iw6p4vstocuccnrhef05s710tp3850nwx48957ewjqb0f13t5tzqpxz6ita1stonnp70pvn8a7dmkrafroqy9pjgfmrmggli5abm5mump3i149r4q1lqrpw3hiz8i6wssrf3e1xjk9pm99nrbm',
                mobile: 's9qozrj6w8436auh4dshxt59jb06bovkfxmfwrzp0592937wb3wngxq0aap2',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: 'b8qoea8b7si0ejdhzgkapey68pzdlo2ruj7dgwp3ta9jxk96zxvin227f8t0gjh4p82hgtnvvh407sy6n3grg6eor3mfp2jfgb3nsn3tx2h0gf209p3uivpl',
                password: 'gg5mqebs01rw7vk13jvaqpzcgdumwy0vpjyh2aq6vfhnfghi3z52hj5zecn52dqxfu48ul86tv73l0buyltqckiohted3kh4xgkz9lcgtxhoazf2hgcrg80gakn0792jmlqo6owzol1806sj6iainfp468iqkqlo9jdw27yme1f3g9mrv4c8njtcf30jy8861b718z7f33v5mpjzsy077szlp518tt5eoci03fifk3x47e23xdppvqj7vq2ytdgv',
                rememberToken: 'p5bsd7wkr62qwxgv0w0uq4qz0n96z2qp7mc13sqh3jvxjxxuzj0lydf3jgs9gznkhjda0oijw6b75mik00d46kz169ktvt5zf2bn2rnrp5pzib0165j14x12o3j4kqrmsc8yzdz1anahku0612gcxhz2c913cvspic8fntga15bf600e2s9l2osqhtk9v4cilmaihbb31nc5i6yixpjuh7claq1z149e3robi4mdqu85i00ayd6ovmwdb3sfbuu',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: '4x6urdsvdtd7lwbc7e0df4cs017aq44fbm05xh69awrpda47uk1qafx6yms0sapu1wob7p879a5wwa7phbfrkt7v2m2pwrk176k5j4h9rmi7ljyb9oqfb0kzkbzu31vo2q3au4stqheqxfl7u4t6vf9kp3chx54svz5dzx198dayzsfr0vcb788bxh69grlzd4888pxvlc9qtt3wwcc5p2mpgen6im99ovjjrfv39554fcxe80nzojbvjh7amip',
                surname: 'bk7qcdvi9z1qdtd0ebi10tpk080a57bfat0lu4bh3u2tco2vwg15n9x3v3zandzxz6a0e5aqt2ppqf6xqp0363hzkp05bj1a89kvww0vhuvsita58ibq80k7jkys9c92aact6b0oibdvzbqftjdwi4n6zjc47w8tk6ho7spa8uyjs5lt11uy83wswlc8alf6grloikaus1an14jse6emud6wmzwv0ghxcc3bumox2baoegwxaa7pz6ct0mrhbbe',
                avatar: 'io4uae1r7nl1kqy7pjdqj8v7qu9h1v3njm08oglzyuicycibpoyj48582ybjdnvfrm63kiuei59z1bq8g5thojv6b778t26h2ydqdgyvalz2ld303o9er7hpcj38sp9qzougcx26i4gxdhkhg973jw8qk81lzcfa4y0oirrz8sknlu3c1ylngwfkmblzrltzwkscw0q8qwkrfe6pbtc1tamulxif3ku90zu4fu1qnfp9c19nz23m6du6atav4dk',
                mobile: 'e1565uunx3z0u6lei025dt5wgv354nzbaobe5e912p0i7sqr246m2pptd1kv',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: '61zbhatzfw8a2dgbdcoulz4i1tpewok0uvrhfauxu8i5fy9zpj7cs4nuln0y22harx186vpxvbaqgp0deogvar5oirw4fl2o1tcynefuoqszdy1wccpkcczc',
                password: 's8yezaa9e98wfwf5kvlmdf4z1a5i2rokchpuz7ro76l1lxvlm05q3io1u4ihga4gyhpkjrkc02if0jlm3pkvjklmph6gh2cbqcw95tvia0vps6qdk6tw5pvon2u2f033u4ajcp9wjws3aaj4dw52d4t8prof10i4d12p7sw2sm2pvzhnspha1wwdl99oh1lxn7hk8w0aih5q994ium0s7mffqf0iz3g9a6b9mnnvo2vlqbpmtya4fhhjcxk4qp3',
                rememberToken: 'b1gvjqk5wzgrg29i8d241t163s48oc752inldp7eul1r7dp6jy9r4q82wawu49wbu32fv7c1efuxg49z38tyrg3s4j9dgrqa5b9lta2juxegvuckoslsawprpgd65qexd6kit5u738eau7wgow5g84wax4xl8abf5y3ez5cuhlai7w26rfsgh1jepohfz2hs7t1onz11oow1sjx95fvqc96lrh18d83gh57ao7t3ii5umkaijfdsbyz830ti4tie',
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
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: 'lhd7tzwhpvxqvtvd563nm2z62t4a5w7cw83qosobpj5mnl1gt21vs3xgmicd7uwwqaq4aeyo0za5xa3x382bmceqjmuzgomvalcocyqml57fw2epbuxya2826z1xdrpcul4l2xenn9fi4583h5f99j2ai4vwqxch4evvufxlov35gil7830tb7a3c1cv5opc10wbb1rhbmchqueaf65dzhjnvafjtuenn0f7dvfrrq3n5etsxqd9hs0ngxkreli',
                surname: 'yj147gpy94jwjgzkwdig6w19jdqj3vsb51gfva840fonpr19ft0smof68alsmi398sgmkm6kw94mqcakgk3ipl6jpijcrxczcyyvohgqh278teh89u8oqg5em1ms2enth19l8zpdhv0m8x6r43cv2wvb8v828ulmuqnmxjydql0ys0zd8ivmbz33f193wuvy21o8746qhvx4dyh99yf9oox716k19nx8ab2dz1b3it5mv1if7214uar5eybcmoj',
                avatar: '0hsinsnqz6lqdpyfdy2w9bjzoddueg9uw5q6nhampghkng565debrjvy2fg2ix00pfzgd1jfx08t26fwldqzv08z9hrbahkr02errxsx6v4qc3138q83ttsusk1nrcu3xcg1h0ncu4n63h3o5bm97w987w9ynid5zj1ue6l0y4ukhstmvv6ks5ogw3kkral31bv1g0r99fe76kue0kqt558zuw73jwk7o119xwhcsdkpoz382eawqb2xkbg72qd',
                mobile: 'ukvvfob3b8qqtx0bwnv7mi1aux7n7x2wu57sj02qn67khcmc939i0x1pron4',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: 'hnuzz713e3boy4rj0sd3tw1499ml5rmm91vjlc8lkcxkmwc83t1wqqebusulyys640ksj6u8wiguajt0biuhewum7216ccwqvepa34si437s489tpp4zds40',
                password: 'lduhpjp7eyws4ymj81iqr99s04uiqek7duli7cc166za126pnscmfh0nmrdl3mvxwln19j6xge0xt5r0icdam83m7vg10vo0y9q7igxqses779ectq6goo1jft8lbicwi4m5ekpuxfh56wk15p3fq8qmxnmsltokmt01nse9m3rfs6f24z4v2ce3lua3h24ei0kx4zydnnax0idy2ok9r6yar46dbnjkzzmv01bgtzaeluo81vvdpv7dnijau42',
                rememberToken: '4ki7iydx2ew4zkumsknn268q12t0an3p7iyowm40tfjf3d1tkwdg2qfky8wj23xsg8fuous6hq5r6s13z1h2bekt13eyr38jpnicl2wdiim4yys25h7isfmcq5zbefo3or3pua63ef96ldp72bn5xp2d7p6qbxqldpgr1qm9edq82jv1gdkvtywh9pdcdi4d4jqbpurmlfakkl6jcspvlww2tv7qy60bambvlbqwy776h1gmsoygd2iz1m67ibi',
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
                        id: '8bd33c4b-5121-4481-9c17-2e213a6a622a'
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
                        id: '78782da7-e8aa-4668-84b5-0232a2a9039c'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '78782da7-e8aa-4668-84b5-0232a2a9039c'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/29e57756-25a1-46ee-bc45-f1a031a67b02')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/78782da7-e8aa-4668-84b5-0232a2a9039c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '78782da7-e8aa-4668-84b5-0232a2a9039c'));
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
                
                id: '284dcaf1-4cb0-4ef0-9402-95586d95b452',
                accountId: 'b9ac0625-ca9f-42cd-901e-20d1557a367e',
                name: 'v28vhuslrhr8jarikoawgxdwa51a6kf8v2jp727lq31d0v9zfwwfav08d7q310kh55o8x4acrqsloss9j0z6sithlrz7ba1c6ior6y04qox09tmhgc5qsj17fpvrh7p6abm0phxl16t7igalfuhvrfffmhyclpfi8nuyo2y4hswd41n11yvxzqo3xubbyaxc58at97t2af8mf529vatnt8xoqtu2n026dz18ica3mv33z2wldbuvdkb4bf8cxzo',
                surname: 'z4pfki6zqcgd002rm2mtu2qsihq79blx3qto6gnuzeoy1n3gtareq5fy4psxk63fxd7jlvci1andqiew8isiihgzcommm6lp5xufzhoz5pms62gzomv54i5itd7t8l9aeg7eusju4yddboq7z89v4krjep0pee0h6pinab15oxtofd9c48a4krx5zu9al9su19b565567bqa98vi5wsgscuqjwypqgnkuqk195qr98p0g1fjv43rld4hwcnohif',
                avatar: 'en1igbs8v4rbtkocl2117ibrfjjtqir76ms28yikmmzf798oz64kcx6wx1od3mpzc1bbgzv6t4gy0o9cqwb9d2qlqsfq25wxa90zo3zrexn2tvk2d0x06mghizlq87eb280dawbstmdfy6kolkhw7af8c7r92pzmx8olrlmf4bfgs5eqsokkhsv68eine1r6tic5zfd2fhjixrlufarvi9eq55nfz7trzok1cxmxiyeozo9xg8068zyofobtw4m',
                mobile: 'gb40z5sn8h8pqgn8znu4kr4795tb38nuo63jmdlboze4o3quofkg4dlv3bu5',
                langId: '75c7f71b-bba0-4d5b-81b1-5a3de0b5457f',
                username: '8rislyoro1s3bzx45k28uvg2x6l60gswe4dks5p4wdjh2uuupffw7gf8xm8j768rw8m7xj2tg6bi1v7dvo6vrytg48ojbwjtmexextllnggkwc7pr73184or',
                password: '2mehvh3wv30fe54lda49o97kdo791eb5f5w688gcyetjydb52r85abtsefyc8m7l9duoa1yrhb1lw29tbp1kiwss4sg85zwssu3nktadzfwmuw2ugsdfwwfpxa5oipkfo1uw12ph7mgppmwxdyscj3jabrjixkdizh9bc7kfeu597qdrnsf7kajw90c3nfmaws6f7wq8sfd7szuqfv35q0k24u7y419qxxu04if3jdsi7e0xqvfoelr87rljzoz',
                rememberToken: '8xs6aqpb4v3pcscsp8if5o3gj4uysopnctkkhl2j96c5m3gkxks3kwe24ctzqfkgz4xxea110p4l0vtwkhr37dhwlcqpdc22icuoopujug7w18z1q2urwy4sisx5zfsyb3kayhoc32fkb3cj6q9a61804vn6w4j16ihwg2k3wa8n6dojknbnnfoic6g2v421zfnsrutfjyu6rrsipaq0k7ysf21fj80stpfiylq6hv72gt11sjn2hvl5qrkadmm',
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
                
                id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                name: 'x3fwyy0xubdx64a3rnizqgav7d0f45nyt1664rclh2vd66av55ucbyzrdudzcdce2n8yetushrqq0ngekw1shiffkhjvai9o5x8ajgzncildzdkdkwna5dtkv3z4qb0c07g2001fn4f76iz1z75wsg3u7atwkk3r6skca75lwu6f3rozb50jz9hpmtif9hsa6aws58b78k08v3eei96yega7w24t22szn0mhgswxvlh2w7yg9hd3ej7yjbeby84',
                surname: 'wmpbtxf9arm2flh0u66ck2py3ne3bmii8nyrmtfkh0q4cjt6mhj4l5km4htf85exrfrgdi7k4252v7v9hzglme3dg6tsucjgmtdbv6zz93kqwbzjq203kdgai1rk2mfb1up0dun3dh55bn0lug89wbpo501rbyvqb74kgkog8kigyjapcs7eldakx11w4krqas7qwft90ra59y630tlyefbvukyb5ouex5tcl7nwjh8v5gnqdw5ydpktgkyzsx8',
                avatar: 'zkj3kvwk8kra6si3jlujzd3ebucm11t4n74ypwlcmvcu9yb6qep3vt8fd0cpcu8777k0mqf4w80logcuou14nbpr08x278j6gmn9u4sdjkle2cnaap9wt3qbhyuaqi8l8hr2vgwj3weszbe86tadqoinvv76wiax8llj54o0yk93bgs2sfs1wjds9z6gzglv3wwc56jklxwchdn1vgtqicvip9nbwu24gj40uc97iqlcaz8liksmmnqejaeh0tk',
                mobile: 'b2grhxcxh8zzch7j0885339bo7ldkoxtxfa02zowj11tgbm1hepokenwxo5h',
                langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                username: '1pl9wpw5ms8pot87w6nyh7uacfxche5tnxuzyq0tv4qzwc15ryevibj4sqngndo1u3d8kau9lb1komxpnfgk4gd3obz94pos7ubecxhiqeolx375vyb2mw4h',
                password: 'kb9em8agmo5awku9auihyi2ahwt4hi7oufypwuiisw4b5bvzd4pv0k538nra77ombdydprfajuz38ktlrsem9ieiw8bmprzcasiyc66yf55dows1bxjty311iu5ftx401miu5f9uj1he2jqanxd878epxnb3ub9yybg0vn9ycwmnaoxrqo3r3i5o8gl042nf0sq7uy6kwr7jw8s62kr51gtztloc8yws6ashpe8fwng9op06l3d72mg6js93dej',
                rememberToken: 'cwol5z2okxq7hjxozevonz2brt992lklgxy9hwab1qa36xrryzd3xketk6l18sr0icroxrd0hrcb0k0yx4mz2oz9h7q9gzpezujm58aebpcnh32lgigs0txie1j0rrh7d1h1t8wrux8wsz462is6x8amxr03qxw0oa4j8fce4azm41e3856bs4hm6l68dl4yybu2rich4hs4k4l5vxjbhrzarja9grxartntjgq74hqc6lbd37085wmd5uvq52o',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '78782da7-e8aa-4668-84b5-0232a2a9039c'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/user/0d777a91-0757-4570-9369-24a72c41f7c4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/user/78782da7-e8aa-4668-84b5-0232a2a9039c')
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
                        id: '0f2d5fbd-dd7b-4444-8340-6e591ca89853',
                        accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                        name: 'bsltc4n31th1v64ooik1dxz5op9djopi3zkfieu625confj6wj2zlab5lzgz7vrm4160noejqr3otl1j1hf84okp2och4u1htqr6ztqmzi0xrolpanz7qs3m6i1czumk8fj4x676manty3xfqj7akmwmoofnz82qi0hxrpurup5dmekf9xdiqy65rjuksytef5xkaj1qgyhtpqn6ieo86zihbvy8ukhq6wwhlmuf9q8lf9ddbn5z9echbi24ox0',
                        surname: 'w6snvvmahmxjq5p47w4rq6gpcndqo1rnn2fos7mzp21l4wv250ks6j2utive6mvarr2boz47u1mp92gif0cu5b6m4en80orqzdvqitc9ck12c35jla32b7n5d2n0o968lm5lndg2ycmib2xtqkp6wdwroow4p1lfmzpbspej51ei69yd3y9e49vlwikrefej4ufurl0j3n6go72hpju93wae43s560xmbrjyolc0saicdcvhhjtrassx89tpmh8',
                        avatar: 'ejjmefbu05yue85s4xqz0271q5m7n5rnnos54wcane78oryol5svc4tbb7ospibdy5my6ogqv2a3by4mdqzmh8fczsd7l669s2ecs6ku39fd9xa21bwv6hblys1ixijgkbp2vwhpqcrbawty7zlotyw3crecnpjnc3bwbbgrhpiyzfc58uyx3nzqyucn0ez9caos0ewefp6xp8bd45qb04vqdxgel34ca7t3wworhv4y82guk6xh0zcjrmb7kja',
                        mobile: 'fr3hbkj0r2t1far7f5lwmcbqxp4xu43i7zwph95g24gfns7ph28xtn3js8ua',
                        langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                        username: 'kirgg805hm1yl18u75v1sdfn62f1a3j2xznz6ceg3u4ms2v5cmwzust3psqnbpm8qnh1m5g3i21qlxlfalwrdslheku9rzwfvko3nz52mkjweby7prsyregt',
                        password: 'afgxm7ub9kruf4j1mxf5mu8navyntj3hc8uenly87ao3r7ros2q67yyenefyqktu3c4vmm4hr78n2hxplsnqtmer2gbkdtshxjhoho6guu1dp3iskw7sijarmajaay1paveytke7fud15pdjpklidastiegv79db78qfw2cylyr36wwp2j5zrcpi16qv2trj96o457mqiki3nnh0ze8z0fjdxsojicuntpehjwbqk7lseqmqev2qzdhep20acdv',
                        rememberToken: 'twumd2j1791h2c4h7ljwvm5p9zt4zh669fticj1txvn5uba6lieydwwdpp74ohbz79nrnyvsrks4gad6pp0n06leilfiqd54gnetc96869q8qtol6xjsjfohpc46xbclee8wpejq6ogntizengv1rx56wgiua6ilunxhuv95nr65w3zw3prcvpen6bav18ta3h6nokrgyf322vxirx9qur2ykqih1oe9ioz07x5ujdlf4bnkvohb4qqdxalrhbl',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', '0f2d5fbd-dd7b-4444-8340-6e591ca89853');
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
                            id: 'dcc4bc27-1805-4a0f-8b72-a567296297d8'
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
                            id: '78782da7-e8aa-4668-84b5-0232a2a9039c'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('78782da7-e8aa-4668-84b5-0232a2a9039c');
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
                    id: '8f4e790f-0b33-44ae-ac2a-46a38e830b41'
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
                    id: '78782da7-e8aa-4668-84b5-0232a2a9039c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('78782da7-e8aa-4668-84b5-0232a2a9039c');
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
                        
                        id: '790f63f3-f04b-47c5-b0c5-9511e1a5ea9a',
                        accountId: '2ffdac28-1726-46f2-a54b-3ee05fc158cc',
                        name: 'n6udd12lp24hgqgtfljj8bk7oo80ukoj1nqyl7ad1dzo9aslukpwpjfpdgr0rfk3knlb0w94h0ot8v9w5p77x39ytw6zfi1j0ltp9ww87mw1b2j1g5buo3i6b0z8da0qtpdu8vr5c34yaz3qnnv4l2l0nanyaf9ldib4yusugagente6i9kome2ht8avgqr8lgytpdm2nup5ak6sofyvu1k98i4vbmi98r2ono4rv9qhxcpgfbchlrij1d4szoo',
                        surname: '5nabti95sdpae6oymy7icdnpmz8wiq10225066v5qj8ivu2k51i3ot7bmqf86vdke0wcryujqkvnvhrh9efcp3v0f9jt9ksohlzru5w5h6mhzub4ssd4j9q5b9gw4h2tb2fz7p44xfs4lcti7fc42is84ly84njfoaxh15iurmgan0tsquln1rbkcf10h8f5dgcg0r3thqs522q85wjxpxiue95gs9inu5lvtsixbsyyzhe5ubslj8xhhf51zj9',
                        avatar: '9ixsm5lk0bsyy4856l73103zk0gq5giqegcpo4mz38qomjdu73hq55woa5m6sq04tby5dofozeyc5vu4luysgnyfiqpf5neq4thrdhnsomaopf1cpd6uhdbgaayzhocrccz50hzspogiglgipzeqgq6romsk19b52sbukjz8zhv6ryhc3djgy25kvs2b4sjs71xk8hztn9x7nv09rncls6f9o8t7qsd1mrz3t3qqajaad6q23r60ebreo3ao284',
                        mobile: 'uxwravxqhe2tyl6kh5n7tf21irpe5nykdi2nhcwgoscos5sa96i6kuq7j1ar',
                        langId: 'da0f5015-cc11-45ff-bb3f-18e7de62bb4f',
                        username: 'vf524llzmbrhq2732jqi0180y272jlu94bb871ai0xg857bl9y11t2gwpohsv5pgw5woppbdgvbnfeeszjwl7t4da9vkiso0jrksrl5bb6mk15zmya10r2q2',
                        password: '4morn8zygzbh2swsj1gt8wy1dkbutb8qmbvt7t1sx4f0ua4ddc2pp9cxsmu2bj6wpjb1735x4jm0e33fxe3ctbw4uxl0w8yxrozouwq2hhl5tftgs5naz7i6r9su6xx2tmwwpjs3tn1e2cqi5sp1idxviu05981otxeg2mymydsg2wak2540gdgha01qwh1kk3lc44kpow7mcsjz00kud2ess20mvphbdhyutvrzxghs4wr3xugrs9y6ih5zgua',
                        rememberToken: 'lfveun12gtcp63n76cag1tydj8437p8z4utbilltd6io1ks8b6aolq6pigvw0d7r9mmsq47u65hg943i7xyxycwgdum9fufrfhihf2zuwngzpfzrz6np3e9ewz93ir385gwmw3svmrz1hg1zrhfx2znoqgajby5v7epo325sacmwmnya7dhkpb54l4xbdn86cleu7m5qiyh7qqhjbwhbxeay7zb2dvy0oe0dtv0m2r3g668a1je9ld68riub6p2',
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
                        
                        id: '78782da7-e8aa-4668-84b5-0232a2a9039c',
                        accountId: 'a19e48fd-b959-46ae-ad76-ebf13d1701fa',
                        name: 'ybgw63dx4z78vxs3hrqs24smmislf2em4ju5o53sbe03mbsjd0iyrxsc1nl9o2t93gy5pgc02cfe9njnufs15075s2j8nebnoh9dd3odngksrcsuvmbihu7z7c0hmijw7zd7g2n30c15wzzkluflhun2rmjmx19vk9hqn892yawwihgr51pfqnqoc0p2bv6yth2ozg6bwvydcvcwigw2ntkdvicpphv83hygu0hl1r1aup04d0rzn5d2l5ht1n1',
                        surname: 'ib5vxloakzyb8xxlo4a25nolpcq1t90tffc6m49oow3mwlympd8t1n59ndqxq9xqdedfmfd5zar827xifab3pjkpsrj0hqpzzbhr1o9w2smrml6wy69dtrfqekt5tkfficdxirej2zvf5145urkb8bc46zlo2273ymsfeesc7ir8tfjcfmeor0kh6pim6ty8vn049efvnvj2fv7d1wj631bmg7hpmiqj4oaqzasna3y357s8c67hc5dr81myuko',
                        avatar: 'rfzys8bko7o38e9keumy636axysifaywhrhjvut0g4nvift8un9d09ylwdj8bgram8y6ek3fgwjnhh8upz8dzl3yz3f8ak8fwhenqkq13tbexxxilkhr8kdcrtfnek2twyi7e27wwr36gqt1o2pt1n5vssuel3qpe8t8tffryeeam1a65msjox2axp5f404l49bf1r0ja5kll7h1oz42tns2cglgyidqmohfx650080cud9d05uk4gnsjv6pbls',
                        mobile: 'a8fzwoewo7q2tg8gwik8otbf5ejxyfmbj5scnk1hvkxh0qyph8iix1yulirq',
                        langId: '4026894e-51dd-4542-9699-f2f32a5a6c8d',
                        username: 't6hsfz8c4qpzcfv3qe5bwcu99hsyipkyuyaihu9ffbn4oz4afw2wav9k9deebndchhi3ps9h7hon5o10f85ml7vyebggu49bcv921u63t8gzpxiytu4y7b3l',
                        password: 'a8wpjbvpnfj2ew8fmpue90sa1hwd9gq5cnjzodbba1z0qwovik9rgjg7o3f8b2okfeisenxd31wpyslwnb1oz14l7tr855omrbjb1ci505khqdj0km9lejabiirg4ak3w08knzgjilo5xl2cdwc8rh6d0zfhqnc4j38chv76odgeugi5uf0dusv5l7wqv6mxbnc1owxo1jxthgix78e0xov8uiwnsmb6ey3bku31uciwx5h48aq0xo1o6lahr98',
                        rememberToken: '94rynrjj6nboa88dnoo9tl03nbzhd2a9esshq2irgmm9wgp16e5d8pigefhsyiu3dwr5l98zxvq5diysg9qnx99dh2i7oq8yajfziv9f8lemvxwi6weu6bk1y328k6ovml0dokr5eebcwrs84s9plnnson8l0q7z9nyorp0g7kx9zyfecq6qlbbkqpt4wx7dt6hllpwig9bhfm70ifkancpxhoji51dpmo9d1hk4zkxdgxjbepvtjz8aoiiazlj',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('78782da7-e8aa-4668-84b5-0232a2a9039c');
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
                    id: '4a7ec989-dfac-466b-b9b4-8b7d374f3920'
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
                    id: '78782da7-e8aa-4668-84b5-0232a2a9039c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('78782da7-e8aa-4668-84b5-0232a2a9039c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});