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
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: 'h2d7h1zs5thk9kurj9c4kvl9l7vcwnlsazgb1zqftnqp5cbklc44cbc2q8vi8e5je3cljms0ws7pdn1pi3zk3mfobtgu25hhw4ms8f34ba4z3q6625i3qbw7901v1a7mrwsqz90k3k8trj3kpnud14aoje3bdlqf5ozkxrp5i2kgwr2rl3lalxdhn0xq0gfg3b1u73cy146gzl1yh9t1ezjfx7bgdjag9lbau51abq1dt2aqf7wuw82ruomhz6j',
                avatar: 'rxexbbk666mbdah2plsxpn2tbeq1zq830incjx9kiexk9lkf5gdxzc6gmbus6sqgatnnqsg03ram29e6w317ybebkiev4dfxuy6n1cqv1s8g0ci76wf660jq5hxs24zr1g7kjfo10zmk7t2k6wbqqos5zrh503806wcmtepvgba0765tgnsjxbsuc1xq67pxqqemtm5ml4eo28q9kabmgetzungnk3wvqdbtd91z6funi8qu7cgxf4gg9bwq0hq',
                email: '218wmdvf9o4izzot3j0rfkh17iesv9mpl6yt4rd636otdpiztxhh5duwr2il2mwp5cwbi8ht9tyhk7cucazorl3o3vefwgk1ih5afglz4woebjcnuzw0ep0j',
                mobile: '7yc8dxuvy0lljil4klrqa2wlz5lx8pxsklqm0yj61k70rh2rwx9va2nyefaq',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'rawl78rwua1kv2px53teedro4wnvqgvm9p81hot27fo65goeo74hdhy8avjuqlv8g92vf5zhzz4ll6bedt7u19l5namqahukurlippo0n7xtu1dwii0c3y4z',
                password: 'jhpgt9v92j9lnraggcjotadcgdekqpe6kb9tvtpg6r3owmbh7462t6fq39bim1dmgeb1gy9was8rd1zlvw1hy84chysr4tdms251yf97mltx2i3k52e2zqq8ozk3demz1px7sclsr06chbm45ikriylvxhcc7xo6v3solhps1fl78dq8no4b8gd43nt3zem0cdiojl5x7n6fgk3rywnpbpekm4pxj2thm48h8bi48p9sg41o1tyxlg4alp2nlth',
                rememberToken: 'aw919735hcas0tl1k9v5wkfvtwfs06bnky07sore34m6mq7hvmw2ss0jhmen8znljkda1xmj33rjn34pejyhnst64zzi7swadyz7mwvtib35lxwp28x57er8gdvfq84msmhefddh1k68tzfug3x5tcbmm04nz5x97qi8wrc3koteyj3z0v7k2g1uxxllsptuo7o4p1aw2objru6iaykby99przkmopxo74m7rr05avmdhxqdvmip0pyx51p5fsa',
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
                
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: 'f19ym9tabdrh0ss741oizwnhvw1s24m2nebl8okiz517jgzusehy5ir1rekvga9ukdhem768otte4ukrb52g7nhfcs1yol1w5a1oxobdnzsm62gzt076e70d62fhqty4dvvz4hxe3q2mfer45sox1g4cui0j1umogdphvpjdyrep4zo9saeo0u7mkb346hfwk0zl0kubbsyiobszs2rp7u1qgofzgtub3b4x7q6v8tkombjpb7b5aheyrhptwm6',
                avatar: 'xr66nkspsoey4uwn1xnr7i7bznevxfwvm37fv2wzk6egbdifxjgfag2w7go2o4iw1u5eacbhjpt3mxou3b5dqoi5xei2rt1jvsepzjmsickgb8zrpi74yh11xi8h5za1g1646payp04gdfjvvqr5ripcslrz0p038q5czvy36oukj4xucaozaf2juh5la6u4hhi3rmauer0gbnxr7crx8w2ovthynu56im7992xo1lk9l3gmc787z4xq07lh2yo',
                email: 'jf2oj3wf7ey318nbngd78pv5ychm879k80leiy3tr29n5809xun6vbnv611zx5y0zgb7lyei4902xbdbdaz86s8kwnz32tqwxdbb7gq3e3ju05afu442v5nv',
                mobile: 's2tqwsw1g6t8r64wx3lbkofwksimd02n1tuogxph4xctjl09586z61ex9oal',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: '5inf5y9or9mvort6d4udl1aw4mkq9yimiv8ltelb5pyffx08erad7214818embreovqg66v97kwpir2463eqoz9ivlnuift9dvkpl4m3oz6tplafqmodbw4b',
                password: 'i0208e4q7rngswx8yw3qqhs2nfhn56i6scdd5ap08w37ke0uyuguot7t24bnc351cuscg6h29al3ttytq296ock77x7d667arso1w0pumyj2i4v44z5n8c7z1b7fjd4dhfy9234jfxzoivuinl7tfyf2yl43daj9gckxhsc1g5abzn7sy4e5qgki0lgxfq1pl1dehrumrfhpdjk5sjjvrujkb2bguh0mc1j4ho7j5cfvn3i4tiygtz5krnmjk0x',
                rememberToken: 'kqjjgyfveo5u4i6e9mzh4et23kcorcm72dno832j4z701exoqn8il15gap1y7zjspllrj0r1jnjnbtgm1n6ewjd9kfym0vep7fle26cjwx6160xrvazuxwtii0854tfsfr9j2qu92m7zt4aln4low5z7t121ctrk1k29gff58tqismid5845g2t3twq1p3i3f1jyw59nvucx951ykys8299ltgboe5yi2a2k2iw11aswz8q0bwohumtnn1qj3u0',
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
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: null,
                surname: 'tingzy2x8i58c6r6k9kwxqiozkuynv3cc10xn1bj9r3688brmta544cs67rnozebnp81wc3qdy15omaycl2tphwzyr8c4m5xzmlbeg64fk29ra7cghgmsegy1ghcfc1qnh75df62ru0ydn7v3eavwsc9ht5gw9qksypbaa48adxitow6ryn52m29aw0hz366e68my244nfb3b3gvgofzqycl13rlnd9r3j3kgjgoooa68r91j4mrui3s2z8ngi2',
                avatar: '21dkdm7lf6u2buxj5d76waxfxfhsj1onsv45faryalu91lliwww9j8i0s5dynzjibbnar9yxz3gqa6y38jns3qzx10f0a8v72gbslieyg71vpjqkr3z2mibvz5ff2k0qb0m9osi6ku16bujjf1uasvfq7ghu73voe161wbu7ksngn4x32b4mxipi118rshinnpb0qlcfau4bnz0rf4yfdfjcfhix0f5u9y2qwv7cckux7fyomk7tzv3wifnez1x',
                email: 'uvxpn839ysxw4yshz3n2zp67yr3yv1oh800xy5fwsszp8qjbkr0wv4qnpqvqluuhduwaxahttn01er0oux2ursabf42mbram71vc6il48crlx73vu20heus7',
                mobile: 'm5bgc76c7ma9suz5oef6uh3qbb98pcuiwveh94g9av4yfuijn6u62jm0sdpn',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'pvb28mcmo8py1jkmg33h8saetie2un08gp8tg0jhgc1fuy7eyqfe98yfkzwe161bxt1h13ioia2ddq0zymdjri6iyct572nvmpcp2s5fbtyos5l4udhf0okp',
                password: '8y4gu7l9n8cjvz196attpanxozdan5wumpa9abhuinklk1vyzxj1th6huuq4mvmgtqxzb8452tb07q0ah62wlotthy3ofr5mar35nblp2tiie3t0i372tj7myetecxx81nv4r9vddyx8ej8tvtud65azh9hcwnazkv0paj79i506lyb9iz5e3bimyegaso4scp1ifhqvnzmpltis11r3bv58d34tb8f25wair2v5a8ur2a295e27jfih69iutwg',
                rememberToken: 'c8tq085zem5rgd9gser8t0dtlektnc8gb5kpz4y0hn5ugsska7lza0jyw76pmzmb6schz3bhqw95tnfw17cto1oeaa109ug1mvchs4huqltkm7ud6ugyeb78243a2yfxx8lp5c07ex67ivh88m1ydq9yjfa0kgozyp2u7eqhzplch4ec6o3wmd27tpjb0n1lvq00wz7pq8nvx2sw755zrpzfnrejllo9b9i0yu7xtjj2vtjjz00b2i5i778nzbo',
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
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                
                surname: 'levsbqxwsqipiz2cwzjhpd0z7hhv77dev4b1wv8lyze2usg0d51x21gfhgnuubqd3uqumz9tm2eedysc03gd53w4owwolkh9hyc67z15e2m1dv74lsx5bs59wkvlm8fflgije8oul7z61457zs4ar7tjvob7pueo5bhsciidh8qcasjdh3s15ipwzfonv3hu13b9cyj6d06oi63rk7zsfg3k4ajh63f6bt5kxpioe8touu6q7ii418rjxvbddnm',
                avatar: '5x8vjtp3lvi1b2dgfa33h6lex97ficx1y4blru4mn6el43mu071gv8fcqnxzlc70of2ce78anuokw1dd7ao0803cwjp8qvne33jboz1jruh2ei4b2rmo6yapjax972m1xsvczt2tyn93fbynoad3zdgfn4t4ut2dfgt65dq9k3tgnt9uuadp662y4u4uk006h1853e2s6497skzwd8gyinyfy6itp51l1va05g37qhjsdjej7a9sh7k22id8whu',
                email: 'ufvqdze29v2mudqdmtlvg4pjxzr7tm5jsmirmbut8ssno25w2nu2jq8mdo6ejmqpfkjf1jnujs9nyhs2xxq6oasijrp25a5qgu4ffpntcbvbiid1s2iq8b8s',
                mobile: '1e546r9cfib5mjlhvw0qta95cpm6i9ogyx6c2zreusjm0g0ea6uzxqunec0o',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'bimrevukypzmb6nnh485mp61jcpuu6w9udgrmmn5sc1r37fk6j3lvdmer2zyl5mbkw2mbiv7wb5j47kpudlqfrpw1qc4wxj061r5337b0by8hyf3o7kd6bt8',
                password: 'ujclu7b39ykifur05f3su0rpuqw3hho745q6f4jl66jswpnhhue16x0ihmc61l3x8o5hil3qy635fi4gf32v01cjf7vzqv80o5mz7zkuhi71v74fymltwr4li55d0rreu8eynbbbh15gl076se77ri1d6znr2z9vy0un7m72uytu2ysvqry20nzxaf3g3dm7752233huertcsx39lt0uooqj1c97e536b7rje884ew77qb0poei9umioe8wng7r',
                rememberToken: 'x79ehfl33a378c2okbsvbgso8wjzjjzo7zr4lv0fmreue7xxmwbfdvo21cjuqti1ovxcbxbu7exjzc5v2aiht5ctm99ae49y63ixj2nyemfq2kiil4iddco63wesl7owf1zyz92ajh5rwhuavushucs9uttozgknbq8sqo75bpb60413gglbd5gixx6yzj3tkiux5u4rxn7pcdojpfhae046b3fnefjhne82wu0prd46rzce8nmejdneuljyys4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: '6mgvcil3kwsm9f9wkwqb45oly54ybhk68jseixyw2vqzxd2g8r1pvfn8y49qc2lpe5pfp6lgbgp0pe540uiy3v8hf6cbgo5qsypgo4ohq4zgdrbfmecf5hkxbygg3b3iujjaxmk54b4noe7g3mcf5dxfxms2lllg0a6gbq4rmvnumipi4j378d56gzjebnc98rbpoptvxp1xnysjes444gdl7zlckc6cehvi9b881jaf8rqoq9i7h2914ho4z8t',
                avatar: 'jyfdpvjs97flpqx23mqk5nf0n4m634hosjl3o1ojjlfmdba8hym1dldeha37f1adc74wpkax6uwx8gcf3ss8xvzj47bvrmy04snm29doboim4v6pk9jwxxblmadd215ebhzayju6eqywfvu4hkweytkavttdtgloyp5i6wla69jshmg9svowah6shor60rsw1cs5umxvt784b9xz5xycmk6cz09zmn4zf73u4wvknzwui2erm8cpia1ikffxphx',
                email: null,
                mobile: 'j5ue5l9k8ki6le6wz49db36okc2d1lm1jfb6w1qn0727wcmg01mu9sljqf21',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 't0oulkowiifng7xvz4g4v7czv6h75ho8gnoko8iuvp6pqip5hs70uac8ldj4mkhmscb3qpmlmd88lnnimybwy783kto2onobf1myyyebivl6viyu1fl712f3',
                password: 'uirgtbcn9qheo2nb9qpv0osa7xkbo0sbkbq2fbpt0fnxdny3yk2dy3p8acau85raov96rc2ltifsdvbwso689t310khpldqq2hzgyjqft3ppecds90rjt3v5rwusoleui1cz3zu0wuzyd7mxbrqrsxukyxhgbayz3wu6gy9hcnlzg4ik9rnknahzgbt4uqotaornquol1mndeagkphcojw3mfjwu88b1bapp2bf3pbz6a9nwx3i9g97mto26b6r',
                rememberToken: 'kcyqgaewto5pupwdc6qxricga1fs1trksh3gujcazeypluqom5xfd8q86z8yhgsm8vbpq23i5071hc9370hhrqy2f3vhdcuzixuhql528spn3mv5s9lsnltrtaf0spqeg0wldtu238mmn7f2rntfwbl0hcuxh6u3s2tod2hlmvrttxbp5yufjew9oqgc2xmqb9hbbkicjaxp69srhxto6gph5151k6wwak3pbfcip5ldrsmmctzmp4szuz92wdh',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: 'k41jsrotkapoti12o901f6u76g686fmflpoexw70y8c1ybs4mxnxo51dtt3vkejdanu5fhzeupsasberqy3zcnnvwoqatg2yddv12ryra3gmu95mtd8ecrqfoufpdf7irifv6r4xabl4fbqm6c29s9eua9onlbmz7ic6hzbdtqz8nnlln44cuoi5ql9dd5sysvejp996ok9zz9et0wpvtk6ejo1vy4zay7kjhc4ijadv08bnkzk11pddzn836mz',
                avatar: 'rmsbarfkfglwtqbqt83yslw0nyvxd20cbf24vega20u14e5kuzid0x2k62atnexv2fnrt58dsxkoga84xb8mqm3pmgagdur1pdw5s5utu1o6pbhqynxeizkpmv4rcggjnlspmbqbersqi157unhvioqlf2o84jmuba5dkpxeyeq2sukrsjya28naocvh7a0hk1pd0j8hr9r16ugyc70yd3t5r2xjwjzp3mqegtxg41b5cum4d7z8ge7eybhe6vx',
                
                mobile: '4h0qjwv9jr7s63mm5ossqmbd6ayqp0onpkfii78v3og908fjiyr1j37a2vje',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: '3plkzo9ho45bgledenmm9r1s1i4dntibnts0ew5gns2zwrmcsh9md1v003djf61mzjc9ktj6twkpdtwawnzal4dbb73zu6m5w9oo118cei7o3zbappndrk6n',
                password: 'rpw36xtisus2ysx5gunfd4c2i2wdr5xop49ozayx4prqooabl8cthkvl09g8vhm9y3hmjo1kyo2e5rptxodkc8joaqwqtfv4hppdzkmwj93klherdjev3kdjhbd3u9rk0chpepswjdpw00n29w2ubyedwhd39ksto68ayz8nhe4ktaf7xh0h1no4x7hj2iy53tlgwow5pc05nsns3hf8afhr5hmf4svib1zmkajfpgw28xe6i5x8am1xoa3xza0',
                rememberToken: 'zlzvdrsdaao41eorka1qcj0mf0jwe5tnwvywjw3kvibzyo44b7rwu92oahvfxbhwplz28civxfshps9nzv6bmw00np9x6bh04l2rlobf83ahr4ozkfkim1yjmbllfwm74ywbosmarmz5yuwtqyfdm127ep4czyx69nj17e5h8wsojrbo47n6mmgwfrjau5x5cfago9en7n1jpspdwnrb1b9yqhldonzgnirh776dnth6u888h2n5o3ubrqv6aof',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: '9qs7m9peh7n9vffx2rpz3h01gwq7y9s2g33xxzknbrewrlpts6hfi9kqrvssk2u1qqckr14z1b9l0r5pljf9r8kkjoxm22adf1sda2cucknm90pl4p5kpjauovtk00boxbba0hanamrucbcxqd4vraiu5is82t2wf4nnqhdjc6257au5uag9ika297pnztsltm8p9cgyt6rewqjh6t3c3o6tppun2wjem6r52oii9zabq15lvqh31gfvl59e71s',
                avatar: '00z55pwfrre2iygrgsvek4uynb02jpxuqqqjr9081nzqyukx1zyfw6ngua57f9dik1xx8ndz2o20fq69ug4gop0g0bdhdfp0t6uc3ujigzdwoyyyd8blbqq3j05il1g8isq9j0zlh2fjzv2r5rtgp0hac66w0z82pbq2kwtkkks4a3pkre1qqt3loxwhnls4f01tqzejmjuh092bepkkttosleep9icp03rxl41h7ilo14kr20v1l20fj4silqz',
                email: 'u11av8ug1ut5xndclsmjrvun30bahq72qndz1s0475hvbhin8q7fc6g814sx3df5t9luvmyni02kzncp0zybcph5yamqo46rumgbjcukp03aknkzmchhtrhk',
                mobile: '8zlmnnr4te33nd48prya2ir330f6dckqxe91f1tnqbpjw76t5zg10eabwvgk',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: null,
                password: 'sezg03njc8hjbbdycws2pjzmokx2fzm9eqo1lueli6j1l7pjil0pa03l5jgu6se4y73e30j2w93wosyxr2ewp3mwtbnlb661neh1p7alytorfjtkm63mcjd57xdd8p5lrxu1kquk2qumnw9rnlw13mje2j4ysp4slu5d4exwv5pbruf4f0hf4sum1zz3v12b65d28bn8v337uem5xv27ie1yazyrhkr8j1qk47xcb5znve71ete0h14uko359qj',
                rememberToken: '05i4fzgpbvuzolj90fi3meli6ab7gauyh9rr3djpm5sq0nafa2ae3xxtu0gvlsox7tuil4xciem614cut4jxs79f1w81v3igz9ltntwxu732ah0zfd5bm9r3s4hqjp9acdldjwiwdq46hghc92rvtcd0q9axs1ui0mbyie4d901ajxez1yh6zm0ahqwsfjbe126xfzchaslxtmq3p4vgwj7lu5i8gi24vwcnzog9kniqg6m97qwfjbqs41kb6yg',
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
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: 'o6mbvmllqhmowyx9xjmzndwea4g29a1psbe8zo894zl8nkhdw5s75fkionskjrt9acuq6eg8jku4hns78mwznwbwaw4gsb7zlxvkcg8n5zory7v8jl8ce42mjr54oc9xjvir0a4xbamvlaeorbg08ry8eloxfgqg9dw8gewdo45moklilbci4cs97tb12b9825kmumo8h8eessyroz9r4vhbzgkka60mjgb6hxvdinef0w4uyg44ws1jahg746w',
                avatar: '9fc7jikocdr9ej0gyfaea1onfsv6sb3tqra0tudgy9s6blav8tusfu4spglgvwc6yxye2c92grjbmomepx74gr7kdlu9rxbhn1ayu1s86l5tdpsxfsb5n17fcapxxn1ogi0csx482ossdvfo2wp3wnxf4jw177pgqjpwl7as4lxknh23zv6evn14qpbfaqclipsxh15uw57z7gohcd5y542gct75rfuyc2voz6rru3fj4ws0th1pev6j15c69wm',
                email: 'x5lrkxu7lv02h3lneowcr3gjhlxq2q2xdurpbqudmfst9mhz2wdzzcle0ay993023q6a8tzzgt6lfpi421181d5kvd3f06g9omsaaot33jqjk699jddjpbs9',
                mobile: 'y72zundkkf076sbp48noq9x3cs057crafzrpknuweyhw0k5yf94kiawca9df',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                
                password: 'jfbczciv347lkhwddgyu17r6r10zb7ei86e6y0llectg546nksjmxky259xnrp6r5y6ajycbw6xph657fb0al2jsx4pzkdswbxjp1ys6nnd52r0drodcjd62zwb2k9b5ulz2zou2tvmh95a8d6dw1y1qprgww08htemylj6aalcbftldhe81zr47wqj49do3ck0yhjfpmasb1p9f1n5wsywdu1d7k1ezu2dwt888bf1lysvmy1d0wzwoe5qsx2i',
                rememberToken: 'njwf4pdaqo1tr2lhn0wvjvs0xe66k4iyt99bb049pt8p8m6xwmvkmvr2ovi6sk5hxr3b12nzowvwy1ucsy27gcr0uwbx7n22n2pp5m2l8n9hiwbbimmsy3egj050xhjr1nkbq1j2o3eu1p5n9p2ttwl70s7oscyf5eg51rctygxucsfa71rennr2efi5g2xbu6djzcd1chua8z55i6ixadtccz7a1g7w2jal0gc047tgep5lyl55ybkzrw5rezb',
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
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: 'o12uy82odyp4tcbgc9ancp8vsr36gkke261489m6zptcu7igm2wmmors8v9y5nxs0q1645g5e02vl2cjxmv8gvj8oxih2h9wlc31qj8bthpa7ygrjp3i3wolwp4p4cs67dylwvkny67w24ju390aprdwdc056vi5wsnl4bytx7zd6nllfzrtjv5uhnpdm49n0zwljvp39j37oozhxjlf12qcmrq1yqgyelcqgq9w6dnjd0a79juq1l3y32cezto',
                avatar: 'xesiohquyml6yhpg12r7a4zklh6sksn3z0xrcr76fpyugu2f8k3dww18x5l2r048j0c05av5p2vsi5iakvvp25bj6k5ld0t4avvwsj8ij3nrrmacg8gi0j9rxwwqasgwj0lgf0o9opvn8nx91uzfnw73hf4xi9mgydgrojj1hzkaoqznytfehqoqyt321yj8a5rlpxejzcabvh9m2wuyrmt10p7pycwu8mc1bc61hxlpxjx90i5ccu486nua7eq',
                email: 'ebilyjpqsud8y22pom9kx1axmora65iousrv0daojx11mg2uojaki5n9rzfqatjlibwji8wxm3x4ew8tkdj55i37z6jbbccscajkqnqfa726a1zalivl4egf',
                mobile: 'pdaoq9uzwbw91l7b68vghxcwx9h6tl3ip8e3scx2if79h5f3c9ghmsn9hspf',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'xzwnrgtfsb00ngle4m2i8b7o6052tekxj987mrf41bomtfb3e5prntp6zzajqbn29rpvuiyy18e1zjy2ipwpqw6xhgsg4lqx5wqpmb3c695lnvnpm4h3yu90',
                password: null,
                rememberToken: 'hl6vr646w9asqg7c2dcci7i0nr728u3kgs1axc4l207fbob3y3ttfhdaxa6sekej57m19t06ucr2db04btlfm3uxktzc9mzui28bhut6zxybvxviiub9sq0kx2i89bf3z9ybswqhk4240ftlpt9q5meld76uzoujk0cvm4u7xna3wsn6e40p17luyj9zstf37coh5dvtybff55oyfpr5qm3cjql69brz6rgax9gjacg4obzaswidaue5akl8zbb',
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
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: 'lit1sw9oufib2t8ijpnmwf2m3ydg0u3su4hb4f2k0vbqvunvsc55zyu7nt87a1drj6ywmndqebspqkbv3mljce6fvks1duo6oloch1idilw0ko4d855g6rxah531oaydrv0h5awzpo4pruqsjjy2w2e292rgwffqykciqdpuquuqivrk5ljpk6xn0mlctzzuenu0gvs68b876f2p47c9ocoxgbbfr80lwq5bfhx6t3qc77o2tsaot7l12zq25fg',
                avatar: '9qvl9y9t4xqljt49f2jiwkaq271ctxis5ugo2owue76zopxglyp0e3f9o1n7ca6rczcubq9j0nc2z8u024av02ly4ph7vmcwgfpvx2vs1fa5h6lhux8acutbif9rnxgafymsscwqhv8a2n6ce6r7zwf2ijy75bsq6xp9u1ghmi6e5d26l0nj16lrtgj1n2j0rhteu2dl0yqif8975o870pirh24gxsjng9znkksbt02djrig0lbvbdexdukgirp',
                email: '05xqwife73akcwbgn1f31tephh040ijpt4wmvzzhqgnhl3c43iw06s8ey5t5g9ti92cd2muxe8xz7jf8xll93zq9q2w4d7ios65nrrpanwcm8l3u63aaedic',
                mobile: '79tgvas8kzcj0cldwazwho1tqbj3u0jfy9806r2uwmzq7q85t8fbj0hgb3c6',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'fsiorhqtg8afpj4eyyaw5ul5clvl14d9konbemcvolwj2mlzo2ki7wexrd3i1xwyz4u2po6rrdtxvngifqjec9yva9vtwnc0l7fmlrmtcvytjx6kcnydqb4j',
                
                rememberToken: 'v4vel77nhh43611255uef2yuriak7379zgvvi589io5vvl3y6h16ggl19ubi0cvfiq0y26f5z9ajwflc5s3ee8talzxymc9ch2xu3122051txortq381axitq406gn1jnyyo5eib9wltnktza82y691hquhfp5u1ss36ljxrcqkm1paok53sr7fn30hjrxzrozz2lek5ghzhoqjhxkw1y1nagmeagmb95y873ife875lnpl9oforeq9l3ph7s3a',
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
                id: '2btojulvx3nbqz8oqh1g8684kop0f2jgdmtrp',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: 'lm0pazdh4e1uozzccqy34u4ocx3avk7fkkq33m7jhqs1mxz0a5s03y6bbfay4t481ieza6suc89d6dvve65y3d35mtubh938eqm0p3cbq43o4baerey4lbp9fs1v72fku31rai20n36firg9agxwfcfpjwwdevdo0eebpnoii62791o3w0q9oz69vcf4amh7kggitr8fynvk06vu7fci07ncsmz1fus6zb0wax5lp38gajyelfb5jythhgaky10',
                avatar: 'czmoqqbfufg3ju3s0ert7eetboz3kuv90un4cduz9i9o6x3me841fdt4plpzg9b7js5pl7ju6rb685z6tk931dodrij3qqvihyrbsslkx2z7sjea29zrvnzbgcraak3lxrn36pvik7weo4xdt2ya28bbv15sas9haryitjig0alf1k79f46kh2538mpy1jq8q2k5afffk5pm6zvxb61m9lstai02gjqq82474yr79urfmlxmkcmjteyd0ox91wh',
                email: 'nuzpm88kahstjz2arxapuy1g87f0rta9lcqpyjzxwufegp60cxm2whze2kka0slbq9m184d4mfpely5z5fzmh7i94ylmo87li8cjuovk0udrjmmlyh2u7je8',
                mobile: '7odroer91cpk45q1ej59kw1rf2juggbyr7cwp7iqd8su1kjuzk5z8btw511d',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'lepcepb9u0sy5zvl5o70gn5j0ih5ctff91ahjp0prkptabiz1jo8xy41mkz7n8ct0j0i5v6blo8xbfnpt69jnbscn15c7060nz8vl4xxf6zqg38io0re2par',
                password: '8bh14edf5pxwpqo45jra8047a5rq1wapz4qaxpmf23cbhd2hhc0pqkdttku71c86mbitmbu5eq4d7s3zgbp156yt18948a89elh12mh8tmq6g4qmzh327d78grg4ciq1o3lm5n82sbaxkh9lcpswpn145l0rgb726p10lfi4nexjzbcwjuvcldhbn4uuibnpc5tfz7y42ow2pxy153tbpn3rapwvacsxzjhwwa8o3qi73kw9ndymtn1sftmpj2t',
                rememberToken: '8gy74rr0hsbpjoslf50amyrnos82wwkv5r3mqsgbjcezaosu4dneip5vmk9w7k9400z4gphi5kbltpnyqyijcrwq580vfqh6sqf4ltcyuap589umvsntoat4obfqicl1oqj3euonhjtq5b90jkyyhovs88vqrqa9z2zc97f9h7a6ncejqu1l1mdlhyr7cf1u6dvbgymzbyaeqq17036uujxioqohmdnhbedx9p6u8c9sk9n0q7txh2hwsr87wsf',
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
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: 'jhux8dnk26qslxhql3ofoe58hyf83j5u3y3ji',
                surname: 'jlf7iyptpz1c669qa8c25n21k4uhq8cv7i6bqg3xk2fxq237mwayfz8n4xh2kvbbgl1r2qpt1lh8f46eotxa5hn7x5go8fnvt2i4f8qswjqi7mho2220x2c4follsdngzemc6armu2bws6unvaisj53yivd9j8u24tpv8u0ksxotnkqwrnybcqjkgn4x4rm8xhoienw35zyure6flswi49x0706yfzb2y2cyoa83b7avxbz8dtvo6kkejxq5i62',
                avatar: 'kcby31na70mc1jp89kfpdmcjs6f91ws8fhmu4la13kxnqky0wq6ofcnoofirf2rc17hq13a1a6ok49fs3g953ykjcgjjsrae0rl7wpqgi8e3oyfusp9hz8738ssimvk7bz0086ffjsoscb77up2hbwmksej8pnz81mjx3a2i4bgul3qezp33dyta1iahx8oflwg1mcpbqrgcrfcm4tgablbkhpsg6fg07hvtdw46nl8j28a6u8b2h5mvg5wgpsc',
                email: '1jm2g46rytpw9s607zgt10reiormkbpr7w2feohaoo6ajwovme1z47sanjlja4e48wj6ydgjpkmovm22j2bwvvdxegisckrit5j43ospqqqceov149md1c5c',
                mobile: '5pgjstx1n8krgye7yx74un4mhqanfjmidmby1q96c0rl7pujmfzxslnz133v',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'ssgaxge0rrzwzpul500dqt8w00avvhvao7ltj3o1gt6vhruoje152nwkfxupfo8yqnltbynnfpiuer2fllwfs9fyzcbv5rs38efssct4o4fu2gr4lnbaoy1x',
                password: 'ohkjdmqop55e4uzn4wzynnfozo4yigaw1evikutj8ygs236i3r8zu1udymzqa04r7ykc2snc5z9wb8ark8xsfe3utw1f1kfzk9f5ygpksam4lzqfnrt1elsfcg8d8mzcxwq9byofhuk5kxv66x5oifyphjpd17nv1draesag3rhgtxwngnp8aiqphwjxre5ycz7pd518o9wvon8iwq0b468mhqj6irzwrbqan1kvhvd9ornikplrv6elf5pgtac',
                rememberToken: 'iatihk08u0ws1zadgyxijztyx2xqyy3icnd7b297mjahb3z61r1e63blfb7qs72eqwx1mekqe89p5os2swpiqmca50yuuli9c1hiw84tbjsesm1am2h2giglmxrwjfjpg8dwicv38h9tjpqabjnyk1j05n8ii6mn32sjxt5mdsxq0956hfdnsji0p033oeum7l6emop29ww1tf16krom1aq69waimoab6kz768xnx3b9wkbejj5kbsldenvblxd',
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
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: '7mincxvzdqjaf1yugmd5udxs397e85nu2tcwo3a36pv13noly5yg33hfyj1rjustrjo4oec1i6nn0hv424thyees0asiwvxl1azfsq3ey4olfcxjhm2uy3apy0qwpqh6c05vjblwxq1mku03bkqpte1qv8wdaegroq3wytnvsgp3tpkfpu5v9rb5vk1nmp6mhio6lyryvk37cjsxbx74xw41hikwzvaicbh9wql42u91b8y8q03zny5oozvnxyf',
                avatar: 'dll67ynbh0h1c8mffgu49p1tuiw148mzl9w9uzdzfe7kags7ofkzbdxtkykk33w7igqsrwp4jbvw5ju72eb041x27x74mcotxj2gssq31j1i2k2d5krc14iafuynjaeuwgy50j2grrhcfe2zygdbl5fzxw6cemzp26b9cao12hyzi15s2tb3ndhhme177m519olznywjws5ydmm31adk4ozgw3nrasgx6k6ed0ntkceye4yvr04gyzbizrdt54d',
                email: 'lsckx769gvba25rjrn1dk1w35t91x6qrffpl40iq8gq60nwj9wexmxs3qtfefmrcufs9hbbwiz4kn78lx8yojqfrsw94gcqu171pu1rkd60oyqjm74ryg1cs',
                mobile: 'eewern9tx6f32aopgwpxogg9kqg9twiidkd2oecfsj072nf8g73fcvmps901',
                langId: 'ndpaoksbprc4qmpk7gkmyengnqhacx9o87379',
                username: 'lgma1acveepsqitf0ek3bi9eghp10cfhxk225xqum390i71yjruvs77a3xh7qx1g4xm394brysdi29d2f4ezshjui87fyo6fekd9ossqcf2f7ann1h8119dl',
                password: '3wplzqldq3lccui3k0jvmhj48d2z8rxvzffkshfzuxytcta86pjiaje23axgpd3dlunofls2h5ocsim4ik8wyslmiwqgnu9clkg2el0429n31pw8qbyjmme17tg5z3ij9tx6mfkctnulhik20ywlky2t2goex33vkthgfqeqh4v08hu7y3df3cfv91qrrnv35isj1qldt4k8pptt8jsjulraolu4fzhyian9tuzpt3l3ne5k5wrgnqtid02qtxp',
                rememberToken: 'dxozukdbljkq88m4rdvlmdx2ydfs2f4geus3o1o6z2yehq2cug02cxnex8ht623e3wy852c5fsltbgkg55jp1ig6yrp81aw0to8o9u8l7wivh43p5fpht1pnrshsbyjfnei889m27icvcxaqxzch72q46tbn9i5jjmohm7votlpw5bhi02dhmgin35zxb0eg1tuspft9ihjd3hq2k0tm5qcka9edserzmxheeeybbiok88s6gzpts5vbra9k0ow',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserLangId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: '7n4hgyh02bbmp9lgtahem94p1jgjpowxixy9c7fa0yd8gicm0c2c4px1n4t1f630yz58mju4z7zja79wrrtnrn7zwqvj4pt9tcv1uphhtf5lwxrxrqwzbl750c0b1h4abchl2zsmaurhxakknzd7fjof42pwc7k43no017byvcanmh7er3z5ngll8ejq60wpcdhsvp33diq67nbx9nbhf3vpam43wdi15luhxvicx12b7v8dw0xmfq70g8z3thax',
                avatar: 'ka3o5okm4di9lpnhhx9tb6gy6tds02ku82qk0u7si400jmm4pd03be8coiqygodwc6nhwxso9noe8ly6yuiuhpbzv2kirepqrk2tnglvl2jyfulqvil2jjfn8pprx8n05js28ecwrpxqd7aoe4051wkfbbkb21uvutx6pq85y0nmwirv6qkfc40wfdjz33oqgb6ynmwaskfn1m6sioi3u70ceq66tyeam977ymyfzovrb276jd4qjia3fvpnz4x',
                email: '12mmk285805qxp89gj6cq3r3ikupvf60iag8tni27t31prkkhrvcjyjvxrqjjteus7wlqiv5cbkuwjazo9qifbbyki8z5mljfp82omvtyvn0mnq70w0o9tmp',
                mobile: 'b1ps5e0vk59or06m2bxdgbey5y15i3szcx84tfhxqbl1qlm8tejc3naxxsil',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'pgvy3y3uezjao9p3v54v3sr2ef5d9xc3y2apz4mzmoy0y98kv0ymge49fmwqnvjlxe6ol3r6g3j9hqb0dqk9e7kfm4mlx7f2s3ov5edafll1qtrxg3ayeax9',
                password: 'yw6qonuor32fmmuaibtyhnr83inywd590kn1rmksi9xzm1t2akl8p6xeh0aqhvmdu3yocy236a19uf2ly68le1xyt84wcris5ctg9sk2p3lrrkarhg7l5u5sdiecr49m7lwevopi0jddwez5j0ev0e4225lpfu1j3ivkxeke6xghpvgky4hnm3k4orjccen8g4vgh8vrjav1tyi74ruiarmfddxvnzwd1ojlay8ak9rm3wl1hwfvql8b5q5arz1',
                rememberToken: '98a5h3nz0ztkoqu6bfdxw3bob2k2591p6as7oculwfqjrp5se2jmgybkbe1h8byrddgvlt16pbf899rt8sfnymc7lln3d14nj5xd7bss2p5l3lvkk2tv5uubtp4xt27if309rxs5qgaaw3kaam04vjmea0rknps0hqqyu7ljsdvc32sysy4qn13pr9bwh563y3z62qqmqazshd6nsuz6nuyzasoficd8gz1fdigchajn1rlsscydw39qvtcew9p',
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
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: 'gkeep7et4p0flok8spbzx3e8x812lz9w60clvmv1a1hcyov2msdctac60tj8fo2rxo5zm273z1bgytcdpcxmk58btr5lhypfgiymx99lb6lv5cai594ul1xlv7u5d3c18mgkflo8vfm3rxnurl85o3arscbsu7ky57az71b0ytsp0g32p589d333qiluv9cmrbwz4pjw4se26pd9x2m2u36gy4qexaw4r6y3ypk2hlqx0uoflgpdzxqnm5qvi6p',
                avatar: 'f2wyzc3gt7w9x4d0r4m8tqinqhm923uxzpg05rq2ubjigjiv9kjkmrx475lcvk1l1ys2qbxs1i45sm0ogczwi8lxzi9qcv3pofctb0wkd9lxywi135o78eucfxerftemk1zktg7wgeuqdo9c8ji2kbdx2z2milusq7vr7rswm3c05viw2dkwhfx8k3efegmrhadx6g51tk1w1mas8d4istfdzck8wsmw1sxklv337dpht1z5019sqkow32kncz5q',
                email: '9rq41adfvtz97ydh739b90rc3i9l36qvcdeez5piqxdpmhpmts17gq92ecgvb575sn2n3nzxtnix0br6r0vgkkqbn4aq52gc6qs1uezg4rcf5qcxs15puplx',
                mobile: 'm4pellkdbs6jjz6xqc1u6ken19d8vnum7nquzy4spqzavbtyuuc2bfe9u8b2',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'ltd0fdj7fgezv4wnv8vekm9g0o8q5wmjap9wav7cophd6hh2fbxv9tycps9s4ir61c917zsk6gif7g7qhd0399xekqvetvbzyorfxgft6p97on90dr3ynepr',
                password: 'cty0cqh7o8b96s6orc3mwfe8u1gujxl9f6toqrulbegwbtxv0xn0bgkhxr6i8qsa26swpfo93qtp0fjwnyoesqzy4dd2pspvu3nsbhvd30ldernp1f87uepkl4t0c6p4dtcraaf4qzqltypuuj7tcu1qoazbprzjvv3fu3mvsuj2benc5ol4xrrku2b51d5vlxk9t2cw7szopy678lvzmy0whu4obvrghpoqj4kopclxp69d08xzuv3as7i4ukg',
                rememberToken: 'zec45za96gj8aqp0ljk7kh2lm1waakdyyik7pg4f4hui2r9sub2yijpx68lfu66hvubsbtu23leeop6aptwstpib60eurreqx0f0692y836rbxeayzx5wc5w2vj8qdra89bxcdxnl6tkpecztubgess9lgeiz36yuff8dcv2ss0c6m8nbdo8eojvcw2jaux292a5jvq7694hgohfj6t7iaiylv16lryimf474n26ilq2azz8mlya07zw5xidnu9',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAvatar is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: '8ky3nx1s3lu1savs2lulzumnmw0ekur5yj1khlihuahpzq5bu7edvvx3z8x655h3a98ue78z91cae3zw8akylrq2nvl6iut2204i4n8ujls1onnrgk4rtxtyohhks4q7do1aocewd2kyjx4us68gzmyk6f9ntkly9utz2t5n1kg3lum8jht145rkuenqrniqsdo9vxqkq89nzlts3m15iiep4y4fbrrezzqewm8eq9zznc7tvykp4l485tezlty',
                avatar: 'd1s4w1iwk6le6iqsea5uzx1r40uals2we6ljuayzgx5pkon0xetv2erohl5yaawrmoqc48hoct9jw2f2bnn9th8d8h21vfpsoslhd16dks2wvjf03px2b8xedwj2eeafvwmntbtdb0duknqaxlnw1u3zr9i9yaesfwfav68zdop9j00vgsqng4rwu2vd89vzt24ra5km1i67s1f0kw0e89i8nafeozgll21oo3xlts7mw80hpax1pnk85nl1vyu',
                email: 'lvi9m33pg0gkvss37rwjv3aveushma6i1ki3i7kig4ggzn8xllzo7rs0uvorqyjwp59qjkt5leuea7na2kqll34w8w2bjsmc4uj931mz77ac9rd7e99t3eprv',
                mobile: 'ygppmaoemu03hxw285d2z10ikmyofdirocsdtk1dbx7abkseg819tzrf8uah',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'ugckeihe9b776qaw15m5d1v3a23hykuo3vk2a9wb9wldsuxqt8xukukmu0sq6c182wht3qarzrfa4gb6dmfbxw8y1bmywpudiyw5ua4tka2euppwk30tpgb1',
                password: '0l8d4juyrpsneovuizlb5qlr62kc5xrddv2q0974stcih2hkopsnk3yartm4gmjwl7emckjuqe3l0nkbdx2hmqwxwluf8lmjx0v5a5jx505ftsjs7mkuz4conoqe7um0nc4x6utfx1pzli7avqq0opcxhes9w747ghgucqei3kwk32c1tbpaoao4qmrq61end626m81h6mx0z8b37a8e1zvpvuspt3oibdc7m3fkjfsfnmb5q7fyyua0yjwl9gp',
                rememberToken: '296kdzo27lwmsgf9mh8gu9itfjz2f4y78w8sdu3thpnzz1jqcamkpkf1qvu8cytllo5ey15m1w5dp9orx72u4gcu83pxcxuvnwp9sc371kzgdtqg65xuxca9pzyvfteu1ybkq0f7bgcmk43a287c1dnu62jxzt2zi4hhs5j8g33cm9qzt8gva20fnxubouohn2yvxan6bralrgu165qxiyd4d36po61efu2fr5kgmo2a0je692e023ixdnjz8sm',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: 'unle6q20c905xygra4or7rhej24aijzprwpzxxmtca6mhdu7venk1o0s2g3faib9kmxvgqgmrx2mthlwphsa5dhh3ad2t9dvcfqc43y6vwzfjwf9z2ngk0pf4cnpzjeb92p0vc1lb7c866p7zvz84mf0lh5z9q18hyik77uif5ga3s5tq9jgtqyaf32fmcg8a3rsudqb10j2o57a8z63jvloylfqtibf81murtz2sq5gyweupq2w6opvo50fxrs',
                avatar: 'd5enmotcl7pb3nd351r71030mfoky82ly1i5mtbbh1t9al8cenhzls9od13xitg8ovarl3yvx2auianeo4yxp5psiwywh2jr6v0vaho9k5fxr2flyvgbbp5m9ft7bcyodkpxmrb6imkm0uk3tkx5n4e9wn2jc5d9gr9e9z6iz8m5hgb03ksjvcbyeuc478rgqjdb9ddwbrp2nsj39hw27wtn0ydic0cpxprv314j04gt7cegy729vwklrqq09s3',
                email: 'gd7ngv5nqne4t2rn6mwcs9s9mvq7i5nht2l3lobgnnn00rqxziiqev2t1mbfcxmpmmsi29b612fh7x6n4qpz3dndiuxaifzq4oqtnshee08ewyh970r9973m',
                mobile: 'uy7halcdvi7e8c1mkq2e5cw39o5anv84lj17fylwjhouf1vrz01do09mf4l38',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: '3eftt7jszsx9uw4a8psy8rzblao2p1a9x7nripg3ga3zjuqylsewl3r0m5klicnqlkp7orccxl6tcuvhenb50gntelkccvocm197k4fozk4xsm5k53ajtle5',
                password: '518wpf9lb2uzpegomg7zcgfzu5yqdd3sgay6wx61z4odw3ywisw2nl64wcq67tlu8w8s05k4tztjglptix5mve8ipazvg08y1678y7q4bdz9lel9rwl276bemweiawmqlhykn0cxz06yk90wzvbpz1yaio5sao8rjvkqrfzkzmd23xeiwtbpqq8x9edg84ijm1hrsfq3iofh19s3dz7lves4xc67u8aylitk93hiybz9d62fl9yzm5ez8bdcati',
                rememberToken: 'ougfn48w78mn9s7xjf34ejazi3gfwdul59ffzh7m30bndaoxo7x82g8o22rdd4p4ixnmmw6dukel061ktj5l5gxf6v0nvw5hqe7terj7knj7cphraw2a0wfccq14hhfeu2czf5n5s7bni1xkvs9rky6c6xbtnb3dq533tnv84l74oprwhw745nzf8hi6xqymvoviik92o37lndl6diupr8nfzv8gcwnu3dwrv97z4bw5ke0bs2xt7ghdc9w4g7b',
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
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: 'a3uk7ocsk3izzf3mrkfw9cig8w2gk25o2ts9lnk27vxq5f25m05de9yzodd63afrrntip06p92et1vqke8s36rs6fefysc5scnmtmmz3cqxfmuifp4cyspd7otxyvkpeopfcbnpjmj2cex858zdx1myzw5a4iftg24gzwu8wl8sweimp8okn8dub2zzgvn0uldg7st71az56cj5qf1t24a146r9pxyooxqcj3lpp8sgdcyu0bd2derxuazgwjqo',
                avatar: 'qmv7unjigxuu4c56uv1giuhk3732xpmpnf07pzfhkcnf7ay4236k4tao94hdxd5njh4835poaqtidjsskwlkwiwuuksmubdlhzjys8p113cd9h9h25hah5njksm2zx9x806igxir0x224kt9jcrohju12xm0bgqf0hn84lsm24p1k87ais23q91dgp6b2yk66emthqnxmrrslb8mpbdiorcbaeh812yvkcuk1kxv1ur7lonvskyyv8oswewp142',
                email: '167wl1n13zuv3i3vhos0ss3nw5lxryq7t5rr5jsbh3hldxwwt0tmiszqfahqs11y74cn5hvwmlc6bbcf2drygbr8cwoplxnhz14ajz9z5vwfnmm0n87apboa',
                mobile: 'gsal5sbco212qozhx2ligwhaslvyyhx85fq42b54us87b97jxsqhzfe8dgmn',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'pcvioa559q95em3ufc10jxvd8hggy7d5u4mu6agoht7k1dozncxvsrukxzhzqg7hc72tb0ac2rn6k3l0rs268ea9g3mbgfgn0qufja1vslxx7f4bub8hiwnwm',
                password: 'szrd742p5exwn5ch29npxik7est72djjr1p2i9722o2dvixu09p928euq77176xua7l5thqzedtqem5p3e5gy8b02h79ev3x1cfnrg8vuqczgb1dasaq5as668yq3z7zdf05wtwg85pcwad4blsyhs4uek6ru549q4v4kl1qzale0wqweoey5jmm4iy7rt8m2e7jq8offxzjuv5mfnshaq5f2j8shqs2p1cjp263g8rka4fslof1se0wir16rzy',
                rememberToken: '3xei7uwxkppwem3gv530g2lprixr4y2ds8ix2wq9akmwfzd5hiyfceti4mq3rj9gf9nxnb5in3gtcdjgg04e5hwifscb53vxn47wg9hmtyu8q0r3nd9o3x4sh47huyfgmhft20utdgp4z074fsvfozvp2rlgl7wgxw3efym4mev4evrmrgu23wse5cp4i68vmevkwt3vpjidf7tm6y3g3qksquixng0u9v7xb2swuteplbg3c4jf4j50nr4ga8u',
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
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: '2shhj6bkj492xu60rfg1yoffx99129ws1dq8k4w3qdqxjfp8islvcohzu10n7w1i26el6qg99ylrwlc6i3vymsdfrqemm4ptqv1d8xcgv9j3axol256et7pymbbo28z30wrvrme7rhm6bpjtxjqi8jgx2epdyeqwtj5ias87gfg5eux43s4jw3fhb4e9l70vt5pz0j7d425i5wa17rpgq89u9bs990lljgn84s5qk423inchfbzlbr2vpev6ey8',
                avatar: '4eqzcmhox1qmr5ig30pss5osp6rsw1lcu0oe7lutosholjt8it4exye2h3febpz3hbvu3yrx1b7advy5u8hx9f4iit1pxp88a64rz44roxzees58us95l7gurhwwoqyszcvmkg4ixuh4jdcp4na1g4fvithmey2e6bzex0yn3pnczejocozth85txa7wgvydnd7bzziwbf9r0ikslvu3kuxaz6yaq8fc4x3yy0n5jxmlv7udmutx7efe864q39l',
                email: 'q2v8aj5rhqqhq9dhpku1o0yi0efhu794lhonr7qe39krhlwv5dph2df1jn6ll27agt6ca58v70x3ns4yvm4gbfh0oue3rxtrgfbdg7rxckqwesqbyxafresx',
                mobile: 'bf0n0u6ppus7nwn3qu3q94egf248s2ehoqkjtufwgovz09noczehmixt94vo',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'g3rr5c7thy7wvxs8y4m5k4mmyp5elk3hz6245odhx62wyosxduz1jfksxg67v8p6qnev067szl0bahklthykj1xlvz2a1i90dd8cnuaiy5cet6ynty9k00ha',
                password: '4g5c73y0w8j2b3kqx8kjdetkjwdgc8fj5vk2kzcwg7bx1hnfa48wltzs0x9dnlreb0l3bcj17m8npyibmdt4jd05lfo3dasjf8prlu0nht40j3e9kg2y8f24dgwginkqtaatj3dszkqh5ixbnfyk67j5cxn9ojv2ejrwercf3zbmjgewpj8kumbdicg87bpto82i2uszl1sbgug2nm2beiu9of7cijt03iqtjc0qy3tenqzrpruqplo9ug91s8ns',
                rememberToken: 'qjpwmoaya7h7xrp78uvv86ih2u8gyvqdqtvrhy58fo1glb6p0cvalzmqb3s3eus81apddq5tcj1i57iwk2a0vdwl0rxpn50yl2rwxub8zhsqmgo9sv8r5j1cffef9jncreiesgidax051et8em8z0t0zfdjm56exfcmod2newd9m8tplmpu2elmy7rtvbuqf1bx36hgerkrm9sx7s6widn9q26hjowqhhh9gq3pszyyvlc1iwzloazpiv3df27z',
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
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: '7z3pyuk75wup12hw9ijgr4pu6mzscsm45suwwbv2gwa9m4cfzx8j3c89ju9eccqomji3w84uyez8tf8obbydws9mnm8hdw1aq3ncletjbqxugmzd237tpelyrkifiotom77rd4dqwkdqentwes9nl4rv37z2nwkg39jqntlma6pyc98w9sawfwf91o4wb1mt0zq3kdk3kk5ll4q9skombke1ierli351rky7sdigrsxhx2t75ol0u76x7p41wm1',
                avatar: '60fejsek3mdqizq18egveqviqarjlr0cwi48fbm86tm33dzulyupg7hrjqg8jzb33ppx1onzxoua2l0nt9na6e46jp1ym9m9v0z7hcerw7estui1z63zo5lbmvdbyfifjgh1q5bsusj9kg2jv2iipg8z3jaxfoqg3dn3341brmh3oyjr2tcuarkqzmrlku6i6st0pihvieav0yoszu9c6rr9lwhhqfvcylgnemiw4ragr2whd1drt4ug3wp9g8h',
                email: 's1c8hwilgteow3zdiclec3a8186k9qmydwp3b5bsaoo44z3cozfofu7sw0becuqvvw9ksjraydr2wwa7wliizkcdj2rw80oomi375s2di5yd75o4us7ufg0y',
                mobile: 'b4urwy5g2l8w861wbe6qoriwvk315w8gh2boh2oeyrxqgc9ldlch1bn22m42',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'noyd4oherupv1q03y2s4e2ya1mfcppj6rab8558r222lny0hqn2b5yvqn7icyv50s8tlwf3vfgga9ut30fjvoxin5k727683vfuqlurz1kmono5rhb5fljrf',
                password: 'xijvcznglo6wqgtz2lsjm2pabvhmojyo3c8xb0cqc64arimojky70vi626d88lmp6z147wpv6f0uc324z856s6r42u68patgnkopecem1x10tset5yozfix0agdnpic26pt9owzpv8bpt8vb9gsp5oo481dommu2zl132b2n589im3pes8qncxuv2t4l61ecjgp6ajehpd2wj5ju3gmg6pnqx7u3vhp6elxv2b7vbyisb6vnb62a75th1gk4ubp',
                rememberToken: 'jyml7ez8ytps405rckoj99wgbkwoy1p703bdg7fsweznb8l2eg1bht7ua82wbsmzsau098kgf55m4iv8t5eg270uq9k1vgttpkx09ta49mb05a1netkzu79p0ccrcif9m9yxge26di0f9xhio4k2mew8in445dsw40qaejlfc8fi0ixhrwd9qn0q1la4n2a0heuisz1p8sfizlyfiaaol05qnvlendq92p92uy7be946g53m8fyn6dcdphu90pnb',
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
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: 'aohno4q6qoy6pg5khby3s8dvdr52ikc64htv8ccrdous8yke3p3vl1o0gc1gebqcu6dfvtzlnna1n7jsk3q91x83769pd92d6xp9b5b21udoka0ogj08upzllc83h371x1uvnrmo90iisjosvlagcwscqje555b138tpd9lpojkllq8rzd1zlbufk6tskrrv64txezflz5mc1ur7rvuhz4ph32pfrlzqfsl6cl0p894rt2lwvfemfi8pmtz6qlz',
                avatar: 'kdhat8egsv8wcihltovvlrlr690h2wni0d6b0seo1b5thkdqghngv192rg6a1nzlal8icsbuuokybiqb91hafr60l6logvo226vxxj7qzeufs54h53z8ygdyzakns3v38c7vgz9nummhroj7vrynv0vptm8n0n1oujd659jifcj95r1ckc0ulyxfvp6wl9xm0812l5r0u6vf312cif665hwtvpqeamh7v9fn6626a4ytog2o2xshlxuf20xmbt8',
                email: 'kw0m9etqqmlmlvtjz65hwb64jhryr76s36euatlowhzplg9z6qzd97out26sn2u8a905l41xko8pdjlr4vu07u5bjxxwl450b1h3dr5mzznxsc4x5wmupict',
                mobile: '6mjsusmk448ey3iukvbt38he1r19ptav7nmo3i20tnu0f3l8eq5h65h5znik',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'ykhuo1ebg75yf3v8ol5wqe3hw24hwpc75e68t738k7u9zg8e4qglvr9tkuyogwu8qffm67chdbbf1fkhpsw1n1e8892nh4x7a1mj476mwkcc8i3i3kvoyjex',
                password: 'mln58jilha3acxv24j0geegnb8if5372drum4b7chsbml85wpmnet1midcbbuixgptkl77eui3htnvn8047ywx6psrtxsa8kr2uimoa636mxvn05t36x4wgra4pgj0cn303vopinvk8us9p6qxec6v66ijj6lkyvu4r47d4f7zxv944bohp9rhtcnur6vjyayyhrmn90udvijdbffpyj6he8186zrr11kk0xexztft54e7dqxy4pm8z0dxy2fag',
                rememberToken: 'b88rg746z15rvlpkjpz08m6jcrt1cw4g06714osulazbfx5ayeu9d6won85h5lqkmwog6x0ccea0yfxjkur39ui78ii6h94jlqwigvk44d1ljf8xmodtrb301w8i31jcpirbmjdoh6i4f5itmd3955jahgedfcpzxwkp1rlcsf5p2kywrt7kfrsatnfzy1aa1orbdabfv41d9w1ey58tby9o9vfbrwe7d703t07me73445wiq415k84x5ut2yv4',
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
                        id: '2b84154f-e264-4228-b8b8-cedf0cdf79f3'
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
                        id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bbc14aea-623e-4df4-9efa-0de9d9231a5b'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/7d86cb1b-269d-4ffa-8779-a2650c39fb95')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/bbc14aea-623e-4df4-9efa-0de9d9231a5b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bbc14aea-623e-4df4-9efa-0de9d9231a5b'));
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
                
                id: 'a0e8322d-08b9-4e6e-8370-2b8516489e13',
                accountId: 'be5e6817-1bc4-40e6-a8b3-658756193aa6',
                surname: 'awera06wju9gbwmyaf1m2zcgvu84b54hngmbdb71m5wvn52k3fon7mnzdqbiaaxjibdgh22fzwaqv8w2og44vrnq36s0jplroh8dfzy1a2dbcixu95pb2hosqqzma5qvnvz3zitl7jww4ja23njftfomzvau4pixz3q9tkzvsd43nw3npnklb39v80gba4lvjq61m2xkqx9eyg99p9pz4005xj5r8lm24pfpza0936t1p3isq35fhtp2uhdmcyv',
                avatar: '99ax8djhr45ctyqnjlgd7f0ofx1mez5d3787jw1pgc9o4hqjzlq6cnmizeqkuzlmg4v6ppfsunhue13bjno5n5e5dxmexxzuclurcbs0qxc3k1h3rpk2v2juqu0y2wujqnzsdztr5nzfi9petpmmj8q3nx8z8yebatnnnipq258bjjleywmud0p7flpjg0vb60ndzcb72hxg437aqw42qodm5ruhfm5nnojmfme23jxcfi1qr4vm7x11acdij8p',
                email: 'c2mko2hrmy9em50h3pagnjt1qa7j3nycudpravh211wkcqiyj12lef5wg6xnvbifkccat4clw44cvtf7iral7vdms8hs6w1d71x5ykiny06m914dt9voq88p',
                mobile: 'mpz4rup7wfz07pc652lfs6or2md61r8h31gi49l58zerwhqjw9xw7piwrlli',
                langId: '36995c02-b77e-473c-94db-de703f36012d',
                username: 'cp7rf9mm80k6c22fkkpbveqmva3hpaix6tk3ff35kugqdeqe9f2bq1sca2tekkyyyjovmmrgqqf1mkqub4r3a3lbtohy4lvsgiupwrtehg516yr2wbgxx4f5',
                password: 'n12a7l0moxjy41kqqyg8n08h4f6ya15k7dmuuhgqn1s6f1ls9ytwjfcwmxzom9bytwx50w5vzfczg6wo7b1nsmbevunvyxbkhjkph4f58r4rjvubicherq9gqdl070wt2p9h4pr3rsp4skpbxnswr0wa3kpu4albki1fkzc7t7ckmok8r8up9uterga0b7f1xmy9rcgiy3oxigl1ocnwuzwytcvezv6x4rmcz6uaovvx4tqf70zmem53cluxyjp',
                rememberToken: 'h46f7ebubljiwyrdedynrz0mme0bfc6x7uzctrzlu52h23n3sl3s1ax8m5ghhsgviem02a496uri1gudn6h9ee7b8mw51ozhdl0znclz0mgh2o42kdtftygbe2qctlp63wmpq9lh51h7tjibuaestyxl21y5v4h0knin3r1w8w4geo2xk6btrl3bwu5c0tlsvkrt3vty5h6lrwh7ez5r331b7hnkkv4s98nyxwdq8e3qjw3hh5kzn8569io8gd2',
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
                
                id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                surname: 'j2mjyvc4v1pi5lx3mnm2tzilj6ijjtnd53goqjlt0zemxuv8b9q19yoe6v8j7ypmaliadcef3nrd6vh04ku5550t06979avx8gatk9s2vnuv1buydfifd64k3o6iu9kr9vc6qflp9hg4cg2kdgsz1kzbz3zrldz1jc8uxazrir354ubhsh7l78y7czv6wwcr6wws2ji2k03p09k6knlymtvbq2kxq5t2oshwunrpf2z0wcx13dc1i5jgizm0zs8',
                avatar: 't729gihwrpwilby1cdkxw985d2ty8riunj2aj1aiaoa0suanhhy8zbzism878o9kekdg8zhe626b84m69zwsvr3kvn52sx54atesf6b5jk3hgb3nktmg2mrwzismk0g1ga1ei1kc0oo9blufbnd3fqavdr82go9tgrx5h23og7fiwojxkmlyeg54qopo3pfpy4dm6px3fd2ypqkpgz2iojbi0125rrfjibwf6e5g8okq554w0dlwuqjk9xhmo1p',
                email: 'v080npm3r6hgpng4bc9n0w15ihs6354jwxm0d426efn9kxwkgiehd4ory6y6llarsx5rpbqx6wlrk87bdklp16pv4ai028u3a3wsik5vx6jcyi8bxzahq1ua',
                mobile: 'h5opcowkc331hugefovdoo5hhtcltcqw2fvx05ea8dizyckfvp7tv7un8skk',
                langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                username: 'sa2m19ctqb034zu4ne2d96abkrivsiqvv0vr21zw228rp8y89tuq06tdzj8qj48cvu90ftj7dowze8poo10yto3wap03470l01obktzbpwuakn9ul59z2wkb',
                password: '4ry0lp1rbnbtjl5k4n01m8l8gh6y2pdepcg73dquna6xkrr22gbxg0o1wqimig0bikiwwfwysux3re9wt4aelqzcdpz4u2kophli1v6mzf92khapr241q1rjfisfze68kmumdt2qk52dor5bwskl6k1lh85gbwme7ouq8xsjutj2u0bngag2xqmgzr0nlqkx7xbg8o3j1dsuhb5glv3fjjgiscjzcrdq7s12ohg0ykl93j7otddf49jlih0mq98',
                rememberToken: 'xgskjtdvwu1vxcb5542dzg4q59y02iczutd1e2mk66wqzuf3hvibybataqcg80shjxur2fm3jcp1qomtcewjzgbslfwgyzy6iekpgd48wyxs8o1bavx5bgmc6avcxax5x64eqidgsf46x6wwy8p6msjqa62hrlri04bcoygb5bzcas3rsp6hrmgrc9occdhfpcugxncr3d60hzxct6dmhk2x6t1bymgo2fx187c3q9prh32spd2tfez4w3mstfe',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bbc14aea-623e-4df4-9efa-0de9d9231a5b'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/user/3685d271-6511-4c36-ab50-3f934c58cfd7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/user/bbc14aea-623e-4df4-9efa-0de9d9231a5b')
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
                            surname
                            avatar
                            email
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
                            surname
                            avatar
                            email
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
                        id: 'e7922d98-55ef-4097-aa0c-3280e5d379e2',
                        accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                        surname: 'a6m17hcidw4oq0zrgdb24pu1eg6gbzaq4pm3ckw148l6b1464xd9za05a2atgrlw4xdw1iuir6335v01pkbc97kj85y41vsk3t5z9pb7bqg30cdzhobd8pzrza1so486ka1yf4smhqp1l4ze8vyxe9i028ei5kwknmrywfrtnmugk4g4d19bfta6mavo5teqne7zj8tauvt5gvfyxqlz3wzj55xvgic1ozx44en7hvxiolrdhr7xqad5t1iac31',
                        avatar: 'zy742cee94k6n96rf5cn0l7jh0v9ljogx6ctjjzozpwai4g3e8vucxvqu22e6su3y3b758c9n44geoi63xt8267jl7l6hf7qpxv3bht1ssmpp66dqwj2y1z8gi8x7a4q6hsqg9akwbfhel0tmwea297zdvv6sflfubq3juh6qu4xceweualo7kitynq2jummwyjyjzpjiu2ppxx2qva56ma05eig2yunntf9wewwyraps23l2pn8ulw7hwzf191',
                        email: 'siaawhxpfqscmd5da7q0v08x3j4otbm4sq0pu7p3htlf7x30n7oyyjyv3kg7sek6ykwbvbp47hk1p8myd8x9kpxr72yjwxdmxkok396781eun33gzsagv52a',
                        mobile: 'hrhc7dzrk4rmjdzw1t7kfxk1t1chmuyk3nyvf1ubzzlrxb0r1indo3oylna3',
                        langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                        username: 'nq8m9n064cs4mclyexv8sc2eqn9oek1kshq997evsn39w2cq5bvoupi7p4q2gz20iumnsuam16evxsz759k7l7k4a9mbth62bmjsg3y77v9t135nsifls137',
                        password: 'lq6j355el9oqrljt766fgiqaobx1n91vpnapj3rclck79t6uxi2ys5c4gungenonip09kl05498v9va5almx1ne40c5kpbw5ea4cj69t2z0lzcs0lth366xnzadtr6tvzkqybszun3dmjmhnih5ffo2ikvdimjyzrs55qyx5e0clypxbnn5yr1xewtbztlliypx0ipaj6q6ln028ro2crp8aktta5dx9pbstoedznja9x0mrfdcbe2r6kueldpl',
                        rememberToken: 'ey152trmtr6vy95hnalkfhed68qgaoqhjms0fywguc4kel3ar0hcbxe7xnpaxkj6mw9ydovzbo97cjrs6zrk1ly8wpv8432lec33qklex7sgco0t62utcdu0ng4jxgy68zs4gi73saz3624oyowjzc8om4abfaykgau6hi9royfn4c4q6df46j8q2qicljsejs2sohnzxtzqez04n2yrjzz1gyclsd5y4gn6l4keviuaetlcn8ij2otyzbu2l33',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', 'e7922d98-55ef-4097-aa0c-3280e5d379e2');
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
                            surname
                            avatar
                            email
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
                            id: '3ada7518-8fa6-417f-a16f-62ebe0302ca7'
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
                            surname
                            avatar
                            email
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
                            id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('bbc14aea-623e-4df4-9efa-0de9d9231a5b');
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
                            surname
                            avatar
                            email
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
                    id: '7aafa75d-259f-48b9-96a1-beb7bdf95086'
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
                            surname
                            avatar
                            email
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
                    id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('bbc14aea-623e-4df4-9efa-0de9d9231a5b');
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
                            surname
                            avatar
                            email
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
                            surname
                            avatar
                            email
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
                        
                        id: '44fa3cb4-4ab6-403f-a7a8-1dc3c4c34b47',
                        accountId: 'd93854c7-7aab-4a61-9dd0-c8df1ee95e81',
                        surname: '77r9ywhqbl7z3k8ugudfqmh3u7eyygp6nytssggkh1t0kdtva0c89sxuzwy40wkg5tbwaedv2do6mkr5rj01dhwrxtxmnwy4yr1nb5fd0v2ok9v8j7uk11o7rson3ipmvod7jtdyyg46ed751ls2gujnxexqm4gfoqdcftdy9hoph0i738vf1nd4fgg5f2gcy5df5r4h4j76pu0bleic0u12yum46bx989iyom1ugsgb0o5gvlkql8vrefla4km',
                        avatar: 'fzez1c8skpadgtafprymbs3tsorxsphy7azso81vv64n5254xdkozpl0jw9oq7ge0841zkeme49to5135ypa74uq0hwbhvnkktztg3s5i0r4r8og51w39q8g7imbdogo5nxznxpuvtuasavmidcd2xtlvcr7rpz66eutmb18w5go7zygjjppfjtrvkx1m1p7nqjsdwabg2ofi53lr9xn8k4hljyodclvs5vb31sgsewhxq8f9p0sz6mmm1ra2d5',
                        email: 'vmqdw233ipcem314xlyaawkc3f7yqubfmsrgs6ttupo6zfpg81swu7417gvsur8b9ton1b8hkfgpx05z9hcb1j4wc09rn9ykqklssaiq11ux8sjocmxfeic4',
                        mobile: 'pi9w68bvx1pp4ohsaynetr2wiqg1p2b6uwltczsxeu8zlx1y5yvuz83e5zu5',
                        langId: 'dbd4a670-ffa6-4532-9acb-05f2c35f7ae8',
                        username: 'rgp5ntt0vf6x08qvyvrp0j2wlutpio7hw54rk9c144wa8w723gicvd8memsubp4cnp0xslmbekbom5nzwlzgv0re4txqkf41gyuwbvip72nelk0py66plgmc',
                        password: 'jz997bc9z12catqxxl7ou9qp6pcqpdog3v3zjqgcb3o6wvvo2io6q27hvpnhc9izv5bnkqvnebx0w6my397qh4t9l3gmckx1f4i4utpe6ygu067accxtwdgq2kx7k35f5m6sef55y6zsuix1um1vt8yfvd7okvmgeqhvvxft89m674rxped82g5cp5y950omoiqbrd5wkkq8bcp1l8gpqhj1vw1ldcya4uf6bjz8zrb3yfxy2xp3k0n9grqxzba',
                        rememberToken: 'y252z7x8sch0mxgxi1a5jsshu1mf0amy5rs8dn8989nnd14u08e3xtzyz32e6sigvcod5idhlhfep0zgmzajla5ick7qmjha3ck7pb8yleyibc269nyi1yqlarj7wr3yd1vgab7mi0m8yulf3ic6br5sc7m3r71uqrbah9icu6z8o4u3d0ab65ciicrda56rtkjka26mryrk69rt4qu3cm7f1igrjz4v4bktvtpupmqxag8x1a551sm8nfkmem3',
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
                            surname
                            avatar
                            email
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
                        
                        id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b',
                        accountId: '55363e9f-d499-4070-b5e6-a28ea026fb79',
                        surname: 'lj68hy2ad2kizm4tllc7amrcowb5lvwzpplxc4jp207tref6t0pu5cuoee755zucosfje2reesl7w2tykt3cynkeo3pz8l4yhl0pav4u2iv00d724e4fqkxghal5pusmlaxdznvg6nfiu7wqx3tt6dyzwesl8gb0grjcjl4neqqxgbgdg5zhrzomxvho1ln8e5ndfxknlfy83q301og67ahpaikzl7938i4ixal3rqael0w9qywewo2rv1fljb2',
                        avatar: '2yakwmvjhkjsd9mmyjxi8x2n3lbrbx5ghw500qy9mj0znuf9owjza00y611tyq1mkoonk9rov14p3svgr1d6it69xo662gwjg90mtl9ucx993r80al8u0q79fp6u7vmxrif4a7aigm70ovj7owzou1r107ee3ru9n3rdw5yqnwysg3ocp90yz7gt8j188qd43rnbv1zkfkbsvulzi54r2prqg1ztmtgbhmq708ksaebs8j88b1eps8g20mov9ms',
                        email: 'abh0matla89yoxyc2k06giu2307x1vfn8byvovmuw3yzkkcn4d4ynx0jvnp754rbtk5n6lekokmcb7x2vw11iv1rvv2lerzd7giy7zaoj4wguf618jlx6wyo',
                        mobile: 'f4pnuje088z5s81p0ja7qs5lw201sgcc6q4306rlyfldguxemnnhw9tkfc41',
                        langId: '86549ec5-24b4-47ad-b0da-ea55cb64b7fa',
                        username: 'w7r5fd9rul8z6z2evon62a2us8wvgxhf1kghl58rmnv2lwjlw7fmho49pzlu7eyre3qsk2a2feku5khdddm1okj0xfvhkmye670mka7sfo12061um5htte3q',
                        password: 'hxxhnod23l12gh1tiz5al556v1bn9zz4n9xqgtgzpcwfhnrp96rdj00nrwwzeku6s0rfqbklq7615kmfv768n0464ohl5yxe8925jprofjecba7ozsurfnfaprax3zsd8d0airw8shg8vzoo1a4adfjrzfqex4gn3taizm46xw07hfea8sun6amngtmmnce31auotu95jhd5yr3tvs2nc9jinjyzoco9gyg2eu1wk4ukoubxswmip4gte8n993u',
                        rememberToken: 'x32g10cwx1r4ktw7reeg2lp42honc58dnvy4dbxlxof0w898ec6610s5xliile5az80oqxe7fjm92imhx1z6rt0zeesb0laekkk91xo7d3c0930h3uwh7uh96n2abdpewuvkdgf0z522j8k89kmchccpt6x1w3zsb4as7rsg52ojxghwu6y12t33oi730eym2aiigjc1hs74aboxeznlwq9i5qanme2jcitq6ygrejeub06qo1wq02gp2w6k9cj',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('bbc14aea-623e-4df4-9efa-0de9d9231a5b');
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
                            surname
                            avatar
                            email
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
                    id: 'ab30ec49-3740-4875-b433-85bc7b52d937'
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
                            surname
                            avatar
                            email
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
                    id: 'bbc14aea-623e-4df4-9efa-0de9d9231a5b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('bbc14aea-623e-4df4-9efa-0de9d9231a5b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});