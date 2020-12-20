import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IPartnerRepository } from '@hades/origen/partner/domain/partner.repository';
import { MockPartnerRepository } from '@hades/origen/partner/infrastructure/mock/mock-partner.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OrigenModule } from './../../../src/apps/origen/origen.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('partner', () =>
{
    let app: INestApplication;
    let repository: MockPartnerRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OrigenModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IPartnerRepository)
            .useClass(MockPartnerRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockPartnerRepository>module.get<IPartnerRepository>(IPartnerRepository);

        await app.init();
    });

    test(`/REST:POST origen/partner - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'b3do3h9din2myidz07yy7swx6yidb73t75r8vgshcrudorkh39s4idt6t3vd72wgkq2h2ub0ihhveiioabp80lu65er52d835a5xctu20uj1bisgki30alb5geujpyuvah2fzpqgrjc7v3vyxlq0cezmcdmsqyl3i8igwitq1m2lvmv7t3xizky592a5d3d40mdid8yqumaqkcnlq25zm4igdxm3kluei3k56622lxjekqi0m9qr6w7zz1r2nzi',
                socialNetworks: { "foo" : "bar" },
                description: 'Magnam quos tempora neque delectus saepe. Et qui accusamus dolorem non rem voluptatem magni laborum libero. Vel dolor amet maiores assumenda tempore harum. Unde est voluptas distinctio. Sed porro est id tenetur impedit aliquid.',
                excerpt: 'Et deleniti vitae. Aut quod nihil placeat. Voluptatem deleniti omnis explicabo et est recusandae aliquid. Necessitatibus quam adipisci delectus maxime alias sunt. Eos earum pariatur officiis. Exercitationem numquam nostrum labore vitae id.',
                email: '6pd5sli7hxrt6t9joq20lpea8ghoqhn0ykc2z88bi9ggcs91gilvcduncgacg26kv5snkqmm35rt1vm0nc50lxctgz5y0q7xdv9g7hw84miqztarckvd7pqf',
                phone: '6uuebwsokx03yug4g4pmjjcbdxkfxhok82y01gqlm0xooekbf4cp3fi0ux3h7b6entoe8016p566q62e0ieu9u4sl16sv80bbwy7y0vyzc4pszvloec76xaf',
                fax: 'dsc284ymch2li6cr66qo33md28prdutr2pg27pq65gggq3xvxhx0tlh9hfbz682pfvips72prur5mg7vzy3a0z19cyaz2pz4484fy5ryq6xx6yw5dst0190n',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: '44o6bx95zi',
                locality: '2fxtllhbxbws1lrb6j0s78vfw7a3rvjprkmx4ajhrr1bjb8692mp1rw0io8ynp50dtfemo2qsdlgtizveqgpy2chgoxlotmy71796oq7cfsilwfswkekkxydopuxp',
                address: '1qtd69oh09wqqpdd2c0bxjma6ulxfyxj4lwxy4hbefcokcv17vt5k2vzjrxon2p2x5nvvxnmyve256hb0v4azvmdhvq0abcaur79ykp8ogdlt96boplllylx4v1l9yt7v1hq8dk6360xcux6vaalrhimn8w4n1cydr3bmzbtiqao4q8dvzvnhnu1ee7qlpffs19b2maynmzz9ubikaj6cedylwge2tqx9dksgou2hlvtywpl8rczyhgqhfuciqg',
                latitude: 819.13,
                longitude: 78.95,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerId must be defined, can not be null');
            });
    });

    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                
                name: 'ne1qkaajefnr941q0koxrl8yckd4nfq7ztywox71zfnztuaqgcgqlirk7ef8y3nygdpp3woe9npb3nydc2grnmnfdttt2koxgvn40oh8jpiucqstc5vt6zccrw0ai06vw0hs65hz3kdk7g3tfc2tvtpy73eem9iuxx1uilk6c5yj7fzui8bxs0z3vzayl7dakk2iqe03wy1v7z1ynjfchwxfmfe9l8tq315eutm1zhy0uics3xxeic0q1ryyega',
                socialNetworks: { "foo" : "bar" },
                description: 'Facilis accusantium dolorum non quia dolores eveniet nihil. Animi expedita nulla in illo maiores sint est nostrum. Consequuntur consequatur et aliquam consequatur tempora et. Nulla fugit vitae voluptatem et blanditiis inventore quo. Dolorem quibusdam eius voluptas facere sed aut quo optio quos.',
                excerpt: 'Tempora consequatur asperiores maxime et dolor quasi dolorum dignissimos. Ab consequatur odit. Fugit quia impedit laborum cum hic dolores cupiditate quia voluptatum. Accusamus dolor quis. Eos architecto nihil earum est natus atque. Totam sit architecto maxime sint laudantium sed omnis velit.',
                email: 'rwuxiyx5prp4zk5nufjz3qhdo9gp7ovjycpgaypukb7ebshsueg6c3o0e7dkzhp33omui0urkjpuwqe6nlagzwiml59cqxi4w0b3xszu61njbla4m8hb3h34',
                phone: 'vk461tc0vt2tzfxbrn40bayyucvryq6317mvvmlgycu1jpe4fleje8ux51qoe4as9yififqqbcxuce2ss991at4eeje320y6f6yt25yn3466302nd9k56tqa',
                fax: 'zac9xyda9lb1ggsxircqkn0ew99c8iqe9iujpvf5z8trkjqa77jj6eck0jgtshn1n2zdlz0q9onoxv75x2fa6r8eupqzg8n9t35ulhlmwkqocwxo8gwahh84',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: 'mcl4iuedgb',
                locality: '6sk2lge9cw9i0fk86ol11ruxq7gkfrh6x0qt4kinq8qo82ijcg8zb44qtvp5h14k2mk86olafbrmm5ynl74xvujthbqvweawckoef0ty66akcafewhjlc8q68jthv',
                address: 'olq2avblgk8mwa1q4xree9qzyi0cea9mibsh2r126rso4vq31kcuoplzrwsgi2oevls2ck0oqs1shajnv12a9jtrzd0b9w02usn3rskimnlyoe6rqylut0eov0gf18lyjplfw53a1zq3iusx62ini0x026rjefo00pxv0cm1gxd7ma4zqrud23kv754sjsytxpoj984s71wdbvmtohe19bx8l37xmwh8b84y5e2zaxq7e1z2vb4ozz56ay0kltw',
                latitude: 169.02,
                longitude: 617.82,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: null,
                socialNetworks: { "foo" : "bar" },
                description: 'Accusantium pariatur in. Optio quisquam quia ut molestias sed. Voluptas ad hic vel nulla ducimus asperiores sed. Omnis fugit voluptatem omnis.',
                excerpt: 'Porro qui quam qui provident laboriosam. Sed et et consequatur enim deleniti ullam. Consequatur modi consectetur voluptatem reiciendis ullam ratione voluptas. Autem quia veniam quibusdam numquam et nostrum. Ea ut laboriosam ipsum.',
                email: 'tr1xjot5zrizqog5zejr5btfqh1t007gb4th6urgi617f2ir9au1shfhk4whyjilow9btdj2kkgom4vkr45uarm4lxelgyv984q2yqo5q936nb5i9opz50e4',
                phone: 's85is0kxf9xjjjdcsewwevr8azwbywre8dbgugwtarytvuetvakg1ogjn6a303sx9hhxibqilsb0civs9pbpdwmdpaxnwtdt4nh6qa87bpk073wk1duikbcw',
                fax: '4oqtsstyqai0nuw8kils1hodw1hiosjbfvd0nh8y7dmrpg4qbzbleixbb1tufy9bokz21hsm80ak2p5bfafsr5vcekywg982q5trzp8mdp3b76xcyy0cyo10',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: '0eesh65hq9',
                locality: 'mu02xy1zialy4ik6bfvudp4uy2i7a9qel415v9oueeypjp02wc2ibi6fmqdgjexpz7c22tc7l3srfw78hd33nz1exjmvl17cxmumpd9jz2q333aeyca13qr27t41c',
                address: '1jbr8dhs0m777x2kufarxmxjr1rbidf8tfzschido3nvh3bet14u6jq0mu1g2wu4gmfdbo0ud9o3ta89bm3vt4nhuf0jm3zpj5yqb2cc7c48fs4l0kflj2zm1oi84a7b5tjjv7acde12xael7gnz5frl4ds259jxjrx6fjvs84kkmbs9n6jceb7z7c7mx68broyymm5gp1e4yxn1syrz1zj2icpfktf9bn7p61yhcxuuth4dymvnmcrs4q5pc29',
                latitude: 63.45,
                longitude: 204.99,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerName must be defined, can not be null');
            });
    });

    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                
                socialNetworks: { "foo" : "bar" },
                description: 'Sit et ut eligendi omnis commodi enim nesciunt dolores. Et asperiores sit dicta laborum repellendus. Quam alias et voluptas consequatur aut sunt iure. Architecto atque eius eos vero sed est sequi in. Et autem et minima. Non quasi commodi eveniet quas eum atque dolorem placeat laboriosam.',
                excerpt: 'Laborum facilis id aut aut rem aut. Deleniti nesciunt totam soluta provident dolor. Et est possimus repellat odit. Voluptatem sequi officiis.',
                email: 'ly0et2czine85ejoy4n3ukpjbe2jqb6y7bw5w9th4y581u0pl5ihmnkzb4uyha92s4ixtly5aezgmgik0ame6gggivr659bgib07dlzctwv7xtmza7gmy9fe',
                phone: '0kfr5f9av4b5jnrudk5gnzkfc1dxt26tpm6v49nprzqruv33vtacku5m6v5232bg7ufv4oi414020hzg383b2nxs4536beph3jy0csf3mgd6b780eppbe72c',
                fax: 'd491z9vkg8z3ergbrw4xnmq2gw1m1kgq274efdmguoolxgopsg3qcsma4aaandtvvt3uvb7mr77m9quted0ao75svcyzor6po8wojl9ypemc3e088umy2ea4',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: 'gn9ojunzkh',
                locality: 'qt6okduh81ls1nogfc6dnrjijb0b4dmini30sdn1mnp0836i24cj7al2xqqz4qdni1ek1kzm1qk1kcqj2fxgrhvieimifqd27lzwtmok1f86ksv21sprzvodde7q6',
                address: 'i2jlmjzdoqzy2o6blyowf4wr8fg7gzg2rm894us9b04xz85ls59e1rog60z0avzb5gnvowl2idvjcssls0ufvlfgh5uy9osz22u32okvlz7krjlz7c8glvbvmx6dsdpv5lbjtilxnusazfkudakmne4w2jwba77ds0fbzie6pipekxv74v3f2aa55r5c2kawro0h4dajqlqwfe52ijf7figdjm2nk7hnvofji4v1wuxgktzqocms8sfg3ln5g60',
                latitude: 210.44,
                longitude: 470.87,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerCountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: 's2oc44z7x1ndnpukdzajvusnoqqvsera4zwo4eal092rhy2bhoiwui5zte84ewmfv5lt9ucqn9lywr0twtjfbbbv1fzj62bmg9aitg5ynsvfawt99v4c307t4ltdldq2wcf2bdudo3dxgo9zv48iyrnxetwlbthye0ba7eh1b0prxcn19q09512g76tjyhu47kxk7cwmz3b3cwx66s56fpbojcmyqprlk0ek9jpud4l6qctsxbsql5kyv3694vk',
                socialNetworks: { "foo" : "bar" },
                description: 'Labore officia voluptas porro. Iste officiis dolorum. Perspiciatis repellendus voluptatem ab quia necessitatibus alias est similique. Est quod dolores aut fugit. Tenetur quo mollitia quasi.',
                excerpt: 'Sit iste voluptatem non totam. Et tempore dolor corporis vitae iusto neque fuga. Quas et assumenda vero placeat voluptas libero voluptas voluptas. Ipsam et molestiae qui reiciendis animi voluptas ut. Dolorum voluptatibus eum enim enim sint sit id doloremque.',
                email: 'bcvlfqksg17j1tr5ley9xwcwf1vauuh38252avagesljfj22bcpea1ihbfz90ed120vrt3b9865ra5w0a5rbakjpi1oh8grlmcvydnvnyuzxg8u1w1xusdrk',
                phone: '9yqtifdxtjv9opy00mr9foo7ecfo6quvfcvrsgl4hse3ejkscr8zm4cp66akrxc4li2gxzsr2lmlu0aw9388xw3le7mej1pn0ktccnrn13ebin0hgqorwt1l',
                fax: 'web4j9stbfwl3124k5rdm1ywvdzzmlrfac5r4e81ja761tx88knb3w96xkoin9u4cwwwdnb6tv4tqw213zoh8gyb5xx590v8mc5k4z2mpot8nynirkijqyjr',
                countryCommonId: null,
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: 'rvrwjf3eem',
                locality: 'gebrcsjw6fsmc9sserpqtjkn30qsjg3rdu7x45mmj4ne8plm5kpkhyeq78or5vaisu0jn3o1ea3izi9mybwvq3z1ftatcx4gwsp3vnxcr5a9ov69puyoaycff42ev',
                address: 'ab83huq8hh5ncj6guji7fzr8qpq8o96u5tmto9bw50guy70oyzkmil04f41ffqpo0l0ix9ce3jqkqvnk9v5q712jn1kl3btnxfh02tyyrw3usij9dv1kalfo511nw230ddj561qhh9qjk8vreq2twd7ccqro52x2mon96gpp1rm9ftc54dc9kgr12sejzbs7k5zlkjtmn4uk299j0nub4byxxcv8f18wbzleqp63kwa8w9dem71luconspfnwne',
                latitude: 936.18,
                longitude: 834.50,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerCountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerCountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: 'bu1f18wjsr2jaco452lhirqa0b7nsqdul2aj1lm97f6g1e4kjvqawwcy0mwuqlws87rrs1w2vv1pss68pgbc8nnz856bvmza25ht06hn0z2e37qb5omupgoun95uklz6jsqwkccitd5xp4bjzf07zfyyogagkgbgiwqzf0xnyjyzyz5w2gpyctdi1wcsvkdntjf6ri9damwm0seg3977c7hy5p6px5xr7j6da9okjcay2dsirl2um5mcom74tjh',
                socialNetworks: { "foo" : "bar" },
                description: 'Odit vero cum quia voluptatem et illum error exercitationem. Qui eligendi est nesciunt fugiat accusamus in ea sit. Suscipit molestiae id eos voluptates. Ea in facere aut vel recusandae autem et explicabo fuga.',
                excerpt: 'Voluptatum amet nemo non. Sunt consectetur harum reiciendis est. Voluptatem ea aliquid nobis dolore velit tempore maxime aut. Officia veniam voluptatem deserunt.',
                email: '65r9isqr1j78j4c28678en9fk5f99dbpm7ad8d1oujbfjvvclrzfi1ohbokmfp3o0564crj37kqie3ssw1ziuqkyrl18qsoiixb3g0u37a422sajdch6gr41',
                phone: 'bsm13zal0bczvee1tterwukjx6bqnc97stx6wso1b8yjq02s1ltodzuo7rik1mk3on8d700q83qh3as8py1zk8yxv0ulcm6hw0hcbxa606c37tz6xtqsrf6e',
                fax: 'x3jbwckivoqzkm7h28bdk694qmd5pdv1n6qa5vlthffaqk5281poss5gfjrzd0w6gn7j6suhse2hplyd78hdl7uexmzscuowjyqohsxumqeq5nhqv2400t2j',
                
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: '7rgejys1qo',
                locality: 'qgwf54j8k5iiw4e3qwgfgptg3x3pm5z8u39tbgofgargudqejtvwmmbnzwe9lpy6rkjuq8fuwe5aef0d8z2fs2fq9yakdheza7mlrad3cdyonyaglas2cccltct8u',
                address: 'in1thro3hz6mi6pspqc73vn41tp93wqiva8z1y8zpf841ngcwq7m3qsv16pjarofm1vh2q6tq0rsaakfsp74ru78dv7zox906l6mj54et1p82rr6ve2b8erl6lq78vwov9hh5mwymxzzp775y8uygjfp5ozkdghy2bmnav39e4wp87emlmfa5fitvv3mdw1z72bmyzkzqg8m0knh98egkj3w9b8iyimn9ni12mgggpggkrksge97pjr34ttm0y6',
                latitude: 673.77,
                longitude: 217.19,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerCountryCommonId must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'dl1yttyuzf3zcf68kinumzrbsjnuruog7ki9q',
                name: '05b62zzjaxj2h9as7hq9jc74zfntcjazt4508fhiflfz0c2007xipu96wdjzdt4vxn5tpdka8hyu8zwk40kxix45de1qo0nf9sdslqlccgtwq8c44ecq40pgim4admj88984ce4yrqmigjkspqdz1via7w4swiefex31lnrobe6fkddi243rupczsuag4xr3t1wxvykzwjzm5efsmp9mr976qi57wvmd71ys2z79r4w3x8yjgqls37d8nio45s9',
                socialNetworks: { "foo" : "bar" },
                description: 'Alias dolorem quia qui distinctio unde. Ratione ipsa et. Ratione et atque magnam iure ullam id enim rerum. Sed aut quidem dolorem voluptatum quas reprehenderit illum in explicabo. Aut consequatur fugit labore.',
                excerpt: 'Dolore ut vel eos rerum nam numquam amet autem aperiam. Magnam at dolor quasi in. Dolorem pariatur excepturi at nulla enim nihil. Ad perferendis quo ratione adipisci tempora molestiae error quas. Accusamus at quo. Non ut laborum vero et nostrum et quibusdam.',
                email: 'htwgwq9cz4va53hnb2p351zfbt99k1rrkit08h6jgzpfjwowu95iz3kbr4po0u000zgwo5m4uw59hrctsrx06206bu2tvx1j3y1pdn6guie1lg5qyt889dat',
                phone: '188fk6k2mba1lnj1shz6b3y9opedxs6q0xdkxldqftmf56kw78j4pnucpus6ma3unwr94tfel9wx4o3wrn8rpy5od3vp7pn1le5dcecnee8fvnavdh83phiu',
                fax: '9evykq6nr9f7kpf0nxdb99mdqt6jupkh1hucog9mhdiv2kx5qwu2phfx8yuv98kmxp9acl33ju8wr9xl5rtl9av1p52obf3hms0wa4l0unrbtm0rzifcndbl',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: '3hwzqy8kct',
                locality: 'gdvfh2wf59h7scmxbtnfov7uya1q5lf6s0v5e1pxyloz85gt156o6k6vd86srle0rxxuycxjws5pwtksqbf3coe4z5h679xek1ho8tyrsf7ufgn1f7hohcbzeyp8d',
                address: 'be4wdcczso7htexa7vylmwrrh8g96o67g2s4zn1nykhhv0tikyr57ci9vcxe22i9nli15ltlsgerzh6dzluxvoj74ltier63ruz6dgdvohuyrww1308pwvxi8u4wg05vx0izuo42nthyacj6gfzsmaynmyn8dipaz4jkoi7ggna6vlnj9aaki008gmkjvrsjwju2uriygpusc48mbpyh2bckjrw9nrhgedtz8q9laqg7pgv4bdyu4m22xcjxz28',
                latitude: 160.60,
                longitude: 579.88,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerCountryCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: 'q3d54ouchx1f09dwqfsc3lnve5n502iws29kwl6gck1ih1ve7299n90qyy32orrv8et5jt8202rrzcdpn8txzk5ozmkg70kns6nxt8aicazm8b00wz6hfcur8rzy3w8diiwk052g8pbm9zrwj01m74hl7i1kclglr6itiwk8rw2i2xx3b0ej4k3acnzcbnj80ajgisoxvg4kaunnv8jl7tj011688py7auu04z9102xhm6k2mvh49eev4c4jjb9',
                socialNetworks: { "foo" : "bar" },
                description: 'Ipsa explicabo magnam doloribus quo labore. Culpa in possimus tempora consectetur deserunt minima et pariatur. Tempore odio hic quo enim qui. Dolore qui id eveniet iusto temporibus sapiente. Impedit magnam et. Sed molestias voluptatem deserunt.',
                excerpt: 'Veritatis fuga minus facilis rerum illo quas non. Dolores tempora eum magni eum. Nobis repellat repellat. Nihil voluptatibus eius aut dolores et. Ipsam sed est quis optio nam ea. Quo omnis autem porro autem natus culpa dolor explicabo.',
                email: '3977ixz2c8dnj2uqsbxr9ixngze5llkhszb9am4imp9345l68qnla0631w7b3d1w6k0x6dp47hf6d641mxk3giuo2oz0k8pj8ihonwcsui3j4r2duj5stl9p',
                phone: '7t3gzpckbtu93zyb8qdd4ritfuc4occofjx8shutjj0rn9ikdxtgzfuntibkobur95bsf1fwp8tw0zd2tbhv46pybdm805a9xepx8ijawriqf9qs3cfjepyt',
                fax: 'c5edmgrn2lxtwevfp8lbs2btnufff10m7bgv1v9dqoiquigwa5qw2ssrs8l8l9sgpbp8lvxop20dt7zvckn32bjuk02dtkbro6zhdkvx71rlw6jmpnn703db',
                countryCommonId: 'rel8ow6txgbzenhezvnik9czx8sxidutl0sqt',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: '0xukenjvxi',
                locality: '0jnrpe3554tayvnxtq79s46uy0mptdaibsbzuiotec6cjm2mn40u57q5fv6ctopf35dgu2p9pnyi1jj0fgvq093gigoz3bl9m3xlafw2d9s6kcpherrw9zusvtqyc',
                address: 'acshcvr9vui2blwmdke40ot67tntk5om5bp6bbat7p6o3nywcni4piel268r9up43893ks3c4yb0omsfock540k7urskbizw3x58bh9gcat52x1vtcy8gf5wyj4mr0h8u5op3880bo2ncu983xm4wfftwuii0n3jp5o4ufglmtpyu04ivjgksak07cymruw0r7hfvc9y4i7mj61slb80md473i89cgiesy2vxdfrq54bvi6vxty18md8x33fgd5',
                latitude: 8.44,
                longitude: 736.87,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerCountryCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: 'uftl5o79swbztcu9lksfe26hwl5o3m8j32ars9xlo5svvhihn1m0s6z44ir0nts4k6q2ikkayce9hjkf6sige12hd3kvv6tlt8oics3mszkhi6bwsp3hjqz9jpa1ppgkdy9zpglz0z3pm32ixp1n41q1pwkcjk0uejib8s3c07xtilx1bsbt7gviyqefnsq7ro2m220d248bl4htv380tee2nuyac4n2zzpk891cqvjwyoyffysqqfley3zlxud',
                socialNetworks: { "foo" : "bar" },
                description: 'Nesciunt ullam illum enim veritatis. Ullam dolores rerum quae ea. Necessitatibus dolorem aspernatur optio atque et adipisci fugiat numquam sunt. Temporibus aut consequuntur qui aperiam maiores. Dolorem enim saepe libero doloribus. Necessitatibus qui sint voluptatem praesentium itaque sit quo asperiores quibusdam.',
                excerpt: 'Voluptatibus quibusdam sint et nemo. Dolor praesentium et molestiae. Velit voluptatem ut aut.',
                email: '359av060yajcrmx9irxzqhky8mg5bdkmxqtwcenm9hywx3yjf17wwh0d6ajev7q8jibip22f8nz1ydks4zu8578c4b9u309b5561p6uub9vxgvd0frnk7ldq',
                phone: 'b1t4ge7z5fprs7iwzvvn1zylmefu18qhba9xiinnx8idlpwpcl8p00rl3pri4se23ve8mvatx2nhqtf3ay7sya2mv0vc6kv3fykf0vq0hvh31fxkopwep5wu',
                fax: 'k4jt54zrccbjlh73ynb0whoad7ercxqsd99nc5ritb2sk8k2k0f85jsa3fdvb2t2ysr23f2kg7mna2o0t341e3f8a8d8p8c9vrxbj59wz78gjsbrl12aanpu',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: 'p1qafwvuznuxasbqrcxbk8691gbwicdop3n5k',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: '8em3ejdovb',
                locality: 'on1enwvmukmiqat0gybv0llbh4ps318oslxov3f23kkjf5dm0zfdrrmzn5qukaejcm5ijshq4840b9pbdzwf4f7xfffdo31w31o3ghwl3ghou69xrpw8u5iny3qxv',
                address: '7cchd74fdcy401p4pb4exczzn63di2kbdmdcsd6kqjpe4ij7xj3u1tjqk4l643pc94bc7jy6hlfn3f5cb77uhepg6fv3ayc31e1rn83eiyb2mwntecum5obqunbmx928j7v8te5kwmtfus4bfvi7ew9zafv8wlq9rper6os5w3i9uq2ho46lno48l2upnquyluxf68eq4uk87zao9igy2n7jfjy6h3bugbicbedk3vyqpgclkun0hj2jo533mq8',
                latitude: 42.23,
                longitude: 154.56,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAdministrativeAreaLevel2Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: 'fu5eztrsvdasp0jyq4p2peju9eantctry64v3vqtmvpdq375ho5pqqzqlp9dp6csljte33m05x68zqin874spji5ymxep27nowvrivu610pbbsdft6sp56h0wgchppeholi3emofi58eood8of7of5zs84slavbb5gs6gltpmbrtc4q6yvvzwu2h3b9v2prmq9l2htc62fd9wfndeusmmtajv1qnte2ffa4o38hwd0te464o6kdo165mykvtnko',
                socialNetworks: { "foo" : "bar" },
                description: 'Odio sit est. Sint sint voluptatem corrupti consequuntur provident et non aut. Error facere maiores rerum delectus sit error corrupti ullam. Sunt eum vitae eius molestiae delectus.',
                excerpt: 'Sit consequatur magnam velit delectus repellendus qui aut eligendi. Excepturi ut in deserunt consequatur facere alias. Enim occaecati velit expedita at quam. Laboriosam pariatur possimus eaque qui magnam. Vitae ut incidunt saepe perferendis iure possimus laudantium.',
                email: 'eq6jnw56hw259v18gq004137mnl50e7foq40yvhc17u1i47frydtn4znoevz6o6w70gsin11qoiapbhneskdp8cejphtai0j36e21ungzdafvt6qwb4gyrq0',
                phone: 'njatkjd6vwrfwmve2u2tz4halq70ycw3dl9yjr8r8c6zctle8fwcvfkkbivpihea5n4l4b3ab0vc8z1ty2rpgd8ashpaesr7q3ubdcba01kumd61ayxjrr2f',
                fax: 'xnshc8s5nxuxh3kc16etwot399o3c8a1q5cu8uqr6lkrb76vgsb1giziwd8yfc18lt8kk5v2vz0oiougeq0yfajw2s16ybx7j12c18xucrtzhkttv0st050b',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '386g0aajdfv8hhg814kd30xragghl1s2jgt4q',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: 'octbgv1iqf',
                locality: 'kkagq6eppqeothlkuyg6h6zulz4xyw6fxl2fykwr00nv37dm30fklgqv38kgwb1kau3asguvy0fxweaajqf88swvkspumjfefhp8hbgt5znga6iy461lgce6ldayl',
                address: 'ealonc1m2gqymhouz2xc4jnydzq5q16eke5w42mfga02eou729ppxot8bhm2r9mxvesrrno5ovnn7vv1v1cc7l1qt9ohk4tol7uox1yxupd060rzr6ptu5btdqsx00kens8fr3jrnd7sq9wou79xpd5oc0ibfylgboaqj66cuyrt9onzqy9dinfpoy69ousxnldhvskjqi593i3e17972yjhekoasr8tmzl3lnsguxxqfsw8cahzz029c5h4hvk',
                latitude: 474.38,
                longitude: 119.07,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAdministrativeAreaLevel3Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: 'wyvqenh713cuzkaimlx8kwopyagj2pv2l5xe026fv4dim13qm7z1ogz3e9q93n4xrz7yjul9kxul808by7yel8tgp2097dfos7aqz237xykhzde3xtq1bhjtpmc0mgoadelmxoa2spotcymwdwdylu1xky4mhzg17z7rpdfo9797g0t00smcgyoxx5hsyi0gld39ro05sdsdz9hitlcusr7108b9vm98fr2skojml8j37n4eodcgiol8rb2tivq',
                socialNetworks: { "foo" : "bar" },
                description: 'Quas impedit et sit est libero rerum. Minus ad iusto et necessitatibus. Non quo dolores consectetur. Cum magnam est.',
                excerpt: 'Minus adipisci molestiae dolorum nisi omnis tempore quis. Ut ipsum et consectetur. Exercitationem voluptatem ex tempore molestiae voluptas. Porro esse occaecati blanditiis id sunt. Voluptatem aut enim et.',
                email: 'iwutns01uhm3hk1w9p7kx7ds27j1441wgdwg6a6g9k08ia8xlitp4yunifivyx1srn94x8we0zg9hj55p93mleilmssj6ur5teh9dsuuj7ouhuzsfs61wu75',
                phone: '4g74ul7u2yz28v4pmuwj5roebdgt9g4l7zdl88bfe6466dpukjlsb01t3v2zlemrloy79n5rxn84f2l5a537do243j6z4yutwz0mw5ks55xfh383qokqhd3b',
                fax: '3pp1jpy78t0x8c6vnypd5wm6fmljalgz2w7jnpmvqwb6vreaqno42cwtmwqk8hp0kvk79fec65l7c2xl9xchgi6pj7md640kthtwkorfkv4g39081pwi9ot4',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: 'l8gum6b7ug3xr9p8qd5k1tvig4fn5i5t2kvl4',
                zip: 'ump1gudp5q',
                locality: 'cocee3nc69sl9xdg6sejnvf4v6i5g0q357gecnk7vuztuti4n5b43diu785nj98ia998o8m7i0kcq8di2u0i4rvriyma5ya1ghg4007ju7hu5h3e3z35y042pp462',
                address: '1p8yojtvr51dkw0lzdvsb1defras5yres79b0ii8tj7wxnvll6zvxh9r0j4jc7ildkap5bhsaee80j7gw9hwzrgouxvvg66ms4qgn5ryeo0s78261rd5ol34h5shov3kyyieuw8nrmzmhp58e8ekbsu2ue3o3wd3fo0gx8yfh3yy9cqqmhsvdwjagua1t84ej6tnf4r7v5xmdurjsv7jr1q18mjg3c46s96rg4cbe69xxhvr8u682ocmosmx160',
                latitude: 848.01,
                longitude: 370.65,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAdministrativeAreaLevel3Id is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: '8yeuwnxzhrpodlkg1hi8t4bvovvic0i8vcqmkgpyln3volymqw6pnwws9g3nlw5dyi1a69w3samqt3i7anrsxlywzjhkyedtiyn5gihe2k44jzsik8zzj4w2sdw0acfbqnqsdbl6emed3nz0j33lei5kugmxjnqv1tvgwcz3bbfbphte590124gme9b4abqxex2offexn69w07a4yxfvcz9mc491of1ew39hrblu9x3gx8tg3oq5t2eflkjzqkcq',
                socialNetworks: { "foo" : "bar" },
                description: 'Velit sit sapiente totam facere aperiam repellendus. Officia ut similique cupiditate. Soluta est consequatur. Voluptates aut odit. Velit deserunt numquam inventore.',
                excerpt: 'Iusto omnis ipsa maxime eaque. Alias sit quo consequatur debitis voluptatem. Quod cumque aspernatur optio hic voluptas nam.',
                email: 'mv7sk6n8ffp2rf61pr5b33y3b1p1n5nw5ynwpxyex6qc30a5zb67c5dp063evgnf7dv7t9l9vmr9qgb8ttujmzm5c7te39ubz2u7p3omlxvvyvfcy50osbv3',
                phone: 'oecsdy0yjsscaxxfmdgecmcs7igt37d26zm6lictd3g0ex9uhcezwxi3m9iug264z6j0yzd9hxznc3eepjeo236un4sxcm9me0w4fuskj3d5x9mc3sokhwqz',
                fax: '084dd8xjum5g064olmr1xaps3ls72rwbw1s75nbl8hgw0jzylu7q7nb38nz3lk838fqtsxebxz14urrkc1bv84a6zgengkldncff1gvrezez0iylsw60e3zo',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: 'zfdstido9c',
                locality: '26o6i0unp1oy69apo7j0qdp9p0hmmjqzy81moil2z47fdxa7a9arb9xgz1wekphr6ju0hsk8guwa9e0gwjdrq6wk7x9irkuam72do9ro40jzaqghzsydsdc6rsti6',
                address: 'z7t8xa1afkb0ga0zgtr0iio50r768ycp1wlgw9f2v872jnvnxx5j6x59saga4wb6bmbmd1r65nmjpddkft4ktyuaqe5h7o1g6fewcoe7460ee6op3yeuz8zty0fbydzyq6ul22zzxsx01hh5bcrqo0eukpylj16cohuwvj2cdf3mp58n2l5hmnit7ou13kbrm45l5k9vqgxzyf0irusuy3f0p4n1dqwkytmdm93e2jwhioi7xr9shqwdb1f71t2',
                latitude: 105.51,
                longitude: 895.69,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: 'efmv6yrohiz53ajc1gndgzx1y8402ata7arsob15edwzw1crx719w3yvutgrdnxkqxx7vhlredam4j2hruui4n3rflx8stg0muwa52pro8q20h48xmkpq4ke7h8kojd7dj3f1nfxixxieptgqxuca1wivstnc5hxioqsgipmyjp4bt8yhq12yxidpkggcj25dhyegx5ewgw19rmcejyjvvpysu5n1zvwo99wm05bi8636z6a9ywoiiqf3dtihzi',
                socialNetworks: { "foo" : "bar" },
                description: 'Consequatur eos quae excepturi in qui est non. Est quia cumque et perspiciatis quo. Facilis deserunt eaque quia laborum. Quaerat dignissimos molestiae sit sequi dolor rerum.',
                excerpt: 'Sed voluptas quasi expedita. Quia dolorum ad aut occaecati. Consectetur aliquid quia voluptatem velit non et repudiandae.',
                email: 'ft8r7qje20hgqkfqqhuqs2gvj9saorzyslm1p9ex8buwigakczqx5j2189mq3v1it8hw7i65gios44akx9kp0iuotywf66mqihfhp2ltliai51q62bx56wut7',
                phone: '5hd04uzf7luv7jzlxrwmqu642jhmk5sfg9fomm8t3j65gj32vo6njkizpf7zy2gg2cjywn7b9dum3h9yaselii96hqr4a8h37vhprfs3x3bmvmxn8umawh2n',
                fax: 'e2lzq6v7ptbpykc5axu111wwqrhc7x12hsepwboct9y4amfyxxg0qei9998y2wodq7s00h3uxrbb97suc5cygpoid753hu7sl8zn73jyak6mushpfs63wj3p',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: 'v8gv0azso0',
                locality: 'xpprx3e69x1lbd8p8zvz9i9bu84yoazqfetz002nmbluz07i5qzvp7jy4a670dqi3tt369mp4w9s7xqoy6k9dlx6hwik31h2uo0212nz99erlfghxete450dlcste',
                address: '7zbq6tl1anf21c058ytvwbmpy5oohobzzhwq1u2x31m6gc0l0truj2mq55pa8drakrnhd4zc1p6lic9wfrmmhmyp1im2g5j37yqd2ndjcu21vqu9eibwoq36l8o3g6cfrss9ezzvajdwjln11kvgaguda96rutag68afnc4ynx2zp7rgkj3lfstybe2x1arh0jn2tbu111futc41srv8xvqk2vxdanj4p6bicuznuc33e6lon1jp5zo5ywquhyn',
                latitude: 341.37,
                longitude: 742.40,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerPhone is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: 'h164kkcolez88k60fyda773exgyxt3jurm7jaii31ngdjjwda5y2ytrac54gcmy5umew2lbgn2kx4dj6nzvzx307qucggev7trxx85p59t351yjrgq2srcl3vjl4ryh11lxbtz99oei85rsmgproj8m1zgij43smai03xz307nbklnmjbt373ruj11onwrrgp2r6m7gdtkysgzv3c2i92szh5re5k2rd8uynuwusa6wmv2b4aziijy8mwlkvjq7',
                socialNetworks: { "foo" : "bar" },
                description: 'Quod nam sit nam quia ut. Quia quia facilis accusamus qui ut ea. Nam a voluptatum. Cumque delectus laboriosam omnis explicabo neque nostrum dignissimos incidunt. Quidem nesciunt modi consequatur ut unde. Ut ut adipisci dolorem sit et facilis consectetur occaecati.',
                excerpt: 'Maiores hic voluptas exercitationem sit quibusdam. Velit qui est minus eius. Officia facilis qui quam dolores architecto. Consequuntur quo quis assumenda unde.',
                email: 'gfnx6hf4in580udctcn4cmo64zhb63nh5r09u9hjelbf964iblmmpppx93h5cnhe71a3ga6wdac4m44b21t4cbg8ywxjlntgbmad2dqyht07qzdu8h3tq1va',
                phone: 'i22jzo7x7hin4jee92qeyscm44zgulgu0fgkwzivqv3wfd0onk9w7upbh77z87asrj2jy989pcwgi43z22ek9xfxa2y01jkox6h56g6jfdy99h3evsghhzuem',
                fax: 'nxmsjpe183kvimw6c33tyugeyapjwrfi8abb3dfqzr005a98imvc6iejtp3vi2zelqzeo4ojwsgmuxvsgjvrek2j2o0poefdml60kvkeuazafr0um33bx53a',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: '15v90la7rp',
                locality: '5ivrqi9z08kqsynflquoh6ec1fcqjkgbgcok559s3b54j6m8s06j94rhvm0336k8lz9og8tqddxnnnlofu0cndb63wfnv8m4lvcvb7shgzh9rk6zh8g10eq7gmhta',
                address: 'f5coa9bhf4etiwphy7iyi7d3esxp0z7u7o34iahmaj21q0xdjxyehyrnniukt49feaawuchfcgk0hdns79aoyfmgvhvua2kshuwpv6ak0acrz3xgtcgiq0cve1igaexor5b3j3se20ai3kipqsjmwdkp6z381ojueebbcujmygaxddvzqhdc7ltlbcovuo4288wq58w4ufdqq0whxwer4c4bn9sdnnto80ckhmisvytrkdis1bc6qrofl94bj2b',
                latitude: 6.22,
                longitude: 833.76,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerPhone is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerFax is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: 'pcqcee0eji0pij27o0hhcflqijn5h4mcgeu35f1vj0gpfu6c61wd6hzm916kfemutpjvwckdg3dwrgo1tjjwkop1vscw6l9jrwhesmtatuvko46b3ge8vdi2jk8ka41fp445ufvhgbi4c3nwz2dn0bl9n8yq8agad0e5z42ty4c6887zr65f7nz0mmi0hr046g6x2ox8iu8vhprmy9wkwh2ncxvfpz3bgay9fbfu78f7pao3e8z5bw20zwv1o8m',
                socialNetworks: { "foo" : "bar" },
                description: 'Error quam aut ipsum. Culpa voluptatibus in excepturi. Sunt aliquam et et vel est. Ut ut voluptatum quisquam vero. Reprehenderit qui et quia iste corrupti quidem earum sit. Omnis dignissimos ratione pariatur.',
                excerpt: 'Nihil quis fugiat quia inventore fugit dolor omnis voluptatem. Nam odit nam occaecati accusamus quae in consequuntur. Quia fuga ipsam id possimus.',
                email: 'v770ksm081fqojekw6blgq8eqhjhh8capzvc1xgqix9fgxre6hnrm0xqa2gubj6onoy9pnhnwiyds4ub729y9dr69ng5bt5pmoh7wpou027mafrte6x57asn',
                phone: '0us8qreg4xa5xdjy5mxs8lkil0nxg4p87oj612k9y94raad6rkdtn0mrw5vnqidd5oz9rdprblsba1cacaof7we7jvgpavj6y9o2d5gf7pnkl7yikyoctwgq',
                fax: '8f290il1yurjp4ro8h0uwgllojvmvltockcfhptwhvvl9okpbi2141jnsiahbdm6k6j2qzp89utcxkf9lygv7eknml64n5kzqqt8t7tn32jzfut1ppu0xchmq',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: 'it2yykfnl7',
                locality: 'qbrl40gp7zcvj2innusr4q53cxwiq2npnz3ugwm10n91ipk9mc8uyaxtr66yu2xa9bcor0rsfbmhk0sgvwrime5pm8iu3l3as432p2j060sbkua8yzq6wfy10f0l7',
                address: 'vz3njdpro0cxosmjeziaolzw8i6lzap9atc0m5yn2vhafwcvbg51y4aeoh0vrg3oczd34mfoekfz4o4phs1xuzj2md9ghk9kkhk7w3yz0f72x76xi9434e5j2b5h9v6wqsq1p80lqurg5oum2utl3aqnypd4qxnjbovpfwaacoauvvhsyx0m9izrknrnl3mss5rhnz1nzqscpjvm16bhzx2tla70fa36cx5tj3p2dlkrla6zlum5r6d9okojeq3',
                latitude: 618.74,
                longitude: 888.65,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerFax is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerZip is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: '83am0j1dbxbxqrd786qxof990qqq4ev4naoxfnyv6s6ajg8sxyj23z88whib7awn8s92zfridrct388lhsdxa3e7sid5d9zu2q5jo2q094eglx3vlpbc5iechkkn0w16d9uy3068slzid3wmtl4ah9mzqs6wukp71uh7mypksnu72mukjzcyz98k0p07u90kyoyrbtwp6mvdab5b27km7m6rdsct9a2uxgm3odzb0tlkjhny6kwalyqhcosmamh',
                socialNetworks: { "foo" : "bar" },
                description: 'Non quo laborum. Quia deserunt placeat esse sunt. Iure quo minus esse. Voluptatem quia dolore corporis vel quia ducimus laboriosam. Maxime eum eos qui nemo doloribus sint est veniam. Tenetur distinctio nemo enim dicta voluptatem.',
                excerpt: 'Repellat similique rem ea et recusandae sapiente. Nihil sit deserunt et consectetur. Et repudiandae cumque dicta ullam eius eveniet nemo. Aut et officiis officia dolorem illum ab cumque ex est. Suscipit fuga quidem error necessitatibus omnis est.',
                email: 'd8tfyft0d38pvp0hw5wxhya0cchcaho6gjgxrnr5fgf5tto28rajz6zyisb5bfusdoygrpjnust6yqv4ztw7475v4e5y36w533lmbp3ytx8wtxfg4ge1hxrk',
                phone: '7wcyyl5jdp1snosxvk5qy7ipgm3ivga1k4kiro3w6xun8tua6at573jc6mnnn1k2i80f0ebhympezeqrq8qs4sxtu8l2b91yk74xqagud8rc8c2s0a1rlb4v',
                fax: 'fd8v0znpsxv9l3stcuk1p1wdjebk9pgbdouxxlehl1a51rp5gcuvl1uhqu55ysk5fq68tlbslq72muzmme7a0arl8nyfnrh5xsn6ea7kkq2awxzzv4vzchrh',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: '68ztd95ozrx',
                locality: '1grektcnbnuyyxcxmwntjebx17m9tgkdyxu58t63bpwmfe2brupgdfyyadgl3slzyehtqargd4p4ze0xvd6aqmc9ere8jnun139emdno3cecjo94jemklj3s47pxb',
                address: '2a80ro20cputqn1k9j3lae3ptlcb924slk3mys5g2cmnnzfvohlipscepjlqzzy4skgj9n0konteeop4tf4mpafkgiykc0h4tmi59vo5b22fdnipe610zb50395su56rk03cq8xxak5s1ejlcae4ktei69qumzr6ay861svo1uhiwtn6wmp1j4psvz6f6enxp2eb745qtkpwxixap6rzn64mxzjkuhv0h7mhqa4o3i3byptxsxh1abin2f0kd3m',
                latitude: 961.62,
                longitude: 673.09,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerZip is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerLocality is too large, has a maximum length of 125`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: 'dtb5nigrzbofbiznmfd64k3nkypfoytkqp4r84a0n94oh176tjzksndakizxwssx433vi13s4vk8d1cy8bki95nz2o2kq22eqi21c0dz39aerv7lmtxgzb3oybdyc0elra4ds7n7qlfvf3okp2c4pjec340frpomf59v9rutd98a1jfe6y3qf4kmwit7rtmkj2re8u1y3vbpaddtohf8km5t25ueffuw4j0idbai9mf3by004mna7h2dxmtgs7a',
                socialNetworks: { "foo" : "bar" },
                description: 'Ratione ratione voluptatem quam eaque iste commodi et perferendis. Odio delectus aperiam minima. Magni dignissimos modi et in possimus maiores sit. Corrupti consequatur rerum sed distinctio quod mollitia nobis temporibus. Repudiandae sit ex autem praesentium alias.',
                excerpt: 'Voluptas in voluptatem veniam explicabo nemo. Eos deserunt optio eveniet quis dolor est. Nulla voluptates ducimus. Omnis sed ut dolorem.',
                email: '26id0ivt9h2d4sywadlsl0vespdxz6kaly129io8wwp5h9d0q998l36ajjdipyurw5ayzuujs8pazwwl1pgv09pymp3bvncw2feaeul2js8rk64ehzsf58lv',
                phone: 'gj9x1furse3u3r5um4ro5zpvwrzziafhr0lxjhb903d70ir0owutd6s721j9lfydgu3laufkgbbm7jz0qm8vvcgmwcd5cses8dczcuhvdayvgrm9x8gpqrc1',
                fax: '765ajj5qxh00xj57dbynvnoug38silrjojs70ib2ogpiqu5bkzlnavnfxqvzrduaika3lcbdx7o5qlefdrdgu3sclix76q0s33v9997gh1nj1ahk47udbdgd',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: '31yr8b5chz',
                locality: 'qm3dw9i3fd5k0v1il0vcsuv73pvq0itgz77ffbqxruhwqn73exs2bnzb1i4mymfn9r0dsp9jet1t51nj9m1t0q264nm6qed9bhqtypeqh7w4aqti67tzmd18phjo7z',
                address: 'vyjvlff4p1ioklselnm0hj4mz5p33c8be1ht7tp6hip4o8zq6r8ylbatkkdrfua7oacc4dsd3z6t09pabb49mfoda1xibc59z32p6zqjowkjl4x609p8j02kkj28qga2bme5bw5relvdj33fn0v9ibd195blqi30kguxzv2p8i4cratkkf7xxzyyoyt09e9jhom2r2aexpxqeiesg5qwkvtf4dfaw1f1m40u0jxtorius6b3rxj3rtmz9j5z263',
                latitude: 828.55,
                longitude: 189.20,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerLocality is too large, has a maximum length of 125');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAddress is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: 'pjl7h2bisi8xn6ivi6axsb1d1zhbh8j3v0k74q5tzfej92kxsyb3lwpony6tcjofmu8x1ijrtbfoos4zorid2f86gvzxplii80uj6j9zn6auiugqgk99asfjn7m6ino1azr2z2ucqvj6hofcuc7ed39do1dprtkitv4nhib3pjvi5ww0zn175idv261a67ugfazd5sgznie8o7yslvxoj5f164qddjob9g95mwf6rm4ytzhclhufw2vcyk693pa',
                socialNetworks: { "foo" : "bar" },
                description: 'Expedita eligendi amet odio fuga nihil. Eaque voluptates occaecati unde eaque asperiores nihil nisi ullam. Libero sint eum facere non quis expedita sit minima quasi.',
                excerpt: 'Minus vitae voluptates sint sunt et odio numquam. Quia adipisci velit et est. Occaecati occaecati pariatur.',
                email: '775hnacl8ceruysqysqpzpmo15xmykdxyirne2p8g79ql2gvo2n1c4pi1izt4by2wukqfckjfys5me55vssu31hll2x40dabwixmibso1n5ide9ktraggzod',
                phone: 'iyqe3n6dv73y3xqazhskpwbb5n923xsnaxkmzftu3d7bzogbi7jawu8rb9z001b617wt7i5kruylszwcph960j47xfrowfledzx8ahyxnsz8by4hyyvu6ov7',
                fax: '39a5w2ka5ch226ypovj13c5ciak31k5pil4hvsvl0k07ofbmu13br9s59xgleeh10t4da1eckg5gnrbgzvko437790t3riqkzpba4h77ps5lprswj0dbsiok',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: 'mpa0w54z12',
                locality: '3hq9f059tyq5d29db1qhz2rv1cae4sj7m6m5y5g2j1ehl5qbo5by215dk4fh6s7gpavrj89temi8gyr1qi6ph1stwd9hrqfziaff0aknd7v0fjxdm8enryi9a339e',
                address: 'f55plz8gkt0700aagbbdvi02m5szmz19jbcqqn60kh6bc3rhzh8asaii4k0v49z0qbj79liuhz6dm33mhbrrr5xvv1nhjapvlctk37nxkrp1q18af1gs0i74ho1tnnxsig8wbvbtghcz9zq4twcbstlvcvyh39n2ry476bwzrjwutk91fm3mwm6yna3elifc02kw4xviu2kex1oi4fnazdaao1ve8ae2es3lxqguvv9f3luz8t2pfc29jbmi8frn',
                latitude: 861.84,
                longitude: 356.27,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAddress is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerLatitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: 'k6cda8xpoi495rjtfbubek3ya3qk9zewad0hzefksnw0cswac79ih6t35l1vu9jy5yr8tbb9dn6zr9y9vstunor6ya347d21pfqin53lt0216t9tl60ac838aljdr9zlrrfuqt246lqzk0e05xqstu2e5qkw1ljir6n8eq5f1mdjogy7wheqbc3p4yxri71iyjgpzhxsd73zr3i8ebzpyv8zp1jhgrn97f5d0a16d742pc6ympzeb7pzu6x73ef',
                socialNetworks: { "foo" : "bar" },
                description: 'Aliquid sit aut ut ratione architecto. Doloremque omnis rem ullam quam velit totam. Quis modi expedita ex dolorem enim.',
                excerpt: 'Reiciendis corrupti nihil ipsam non. Delectus tempore id vitae quos aut. Est provident earum molestiae. Eum veritatis molestiae deserunt. Soluta non et ipsam. Voluptatem architecto ullam qui laborum.',
                email: '6rwbm9xwmt7g7k7qavoblt6vz3qpd6njwfi8aop1v0ktfoxkw2wd26qgl0gh0gupv6qsxha2ytvilpvyth3fctdi93xnf98x0tk2u03qcm323csiu33imlls',
                phone: '77xgenu7ilv67j8xk4khxfg1qerpguhagp5bpf6immbfes49n31ozjg3gxlbzfb5gvag982z2m6f4pxooubj5edg8i38m44zo64j5dt3u7i8p6d860t8ds1r',
                fax: '4dgp7so4x5bly4w535w2hkan7jwt0ygto6c6c21agkgyqowc6bt07ffnfax192nb68sa8qvqcvlzp9f78kke7peqoy4i7wx4g86wsd0e67ygy318qjg1al1w',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: 'r2g3x76wtz',
                locality: 'nhjkbx4bclye036pirzoosee3ie8j7m0rfoayowoinbd4emz6u797fh2xbt8sqnrmimj6yl4jvti07to28j1wrj5dbayddm0c7i85zrchbrgum98gu4qsz0xliq72',
                address: 'pfzfgjkwipndoag17uxpz5x1ufpj46jr0exfadt2w3psg3xzafv6k5mzn0w0h24fumyx74brvx1lyonion7rcxowjxhok121kbpk9v5bphhldnxgo9fo228fxo22gr6qhxvltteky9wo48y5rotq5hf3n34xl3o68lohax1oth2db5kf3hsozztov1hxbqfwzxrobxqwtmvvsh5y824o2eh38pxy10mbvpl5u0db0qh5axfmttbdsai2w04j9yl',
                latitude: 892.16,
                longitude: 142.83,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerLatitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerLongitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: '43br2205f9lw29wq0pyjlvr48v6px0qcarulel6rj4u4p1uiprt4tnaeua2ptui9k2njl4zv3cmk54cz7hqrfkouz8xxobu6m0c830dkccb20tgzs8lm46u8jjcn1cjjp06wr3yu10w47u7jerdnr2hu2yggxrap3fmqormrgl4oyugexc1ezlx7nb89685if4to7b2u2gpf5v3n7vol3ssu61wr4lpvqzgxcdhubke4ywc6eafvrwurwd75ubg',
                socialNetworks: { "foo" : "bar" },
                description: 'Vel similique esse tempora aliquid odit natus. Maxime vero perferendis debitis sed quisquam tempore odit minima. Repellat in asperiores veritatis qui quae dolor rem quia expedita.',
                excerpt: 'Quas eos aut repellendus molestias quae. Et neque dolorem tempore qui architecto. Minima quaerat sapiente veniam accusantium. Odio et culpa non omnis. Quasi vero omnis debitis saepe eaque et nostrum atque. Earum quis esse illo.',
                email: 'qufyo6afs6u6lsey9h24xkq9ukf28oz8jhhgrr5rufxkf3fn66dqnianxwiv5irt6xl9rq73to83gmg1dmy9udzhlzdg9dikjdb1ye5nfzi7w62p1g85jhiw',
                phone: 'k96s8g5xze1popq6pt6so5vecdly6go6gpcrj7z0csukprtw9mulqczj53p96018te440ru19k60h6dmrjz113mf71nsev7g6e5tdey7if2nt8m0bs0zzaeh',
                fax: 'bbnc8d21mnmcbynve1l97y3qwgvfx9qmoa4iv18qutsayqmta4p2r57oz1lsvjpcogqqrvcntre9nafzzmx6vayyoyiwv2jy9kt1t3lpm78odhu3t4yo8v0m',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: 'cpzq1hkvt0',
                locality: 'yg3noc0xzz58b3itexc7u87o4ywyqhbjgqlsf4hhljdeitdete7qoci5v6aricr8g1lb24z67w516kia179eotcuvmctt8a26lzrbweue64dvnud1t5696u6elmch',
                address: 'e1sfyjljiff53jomyrv3xkuh2hfbwvpvz2insni6owun2hkdzmb233805vvsfy02hgrzg6e32koj0hsam4r05ut34z5im9zu90xm3ln3wd5du03dqfcaw0agi4758u1yn1ctidcfjn0cb8652y7zfw5dlwkoez0wzc5t2j2pm29nejgpn9457h0whoc1e80mji6lxi94m1puycjedjoo3n5ezlqhpj3bfff06zfv2x4n6r1bx6kyjujmab90xhi',
                latitude: 261.44,
                longitude: 286.11,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerLongitude is too large, has a maximum length of 17');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST origen/partner`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: 'stbfi3elh4b761uiu4j1h6b3kra9n1e2alhdxh056kyas5fb81vu2xz57uw5lptjznurkkn8m3zhfy4d53949d0o9c63e8yh4ywo9ndq8ku2qrawsy7omswtgrdsefnapzr1vgps3a42s1wdzyt72dyfzs4zpct56opnrv2amj2mn42ki2ogyhib28svcdrsln2zjvjxio7lp7uovh589ocmnvu3r55sd3yw4ldym5o33l9rulbfy8dxqrtbeu5',
                socialNetworks: { "foo" : "bar" },
                description: 'Possimus omnis quia maxime. Doloremque quis maiores sunt impedit ut mollitia. Voluptas tenetur molestias provident numquam aut officia magnam explicabo distinctio. Quia velit vitae hic inventore cumque labore occaecati deserunt quas.',
                excerpt: 'Et et quia qui ad ducimus commodi velit et sed. Ea illo alias cumque quidem vitae fugiat error perspiciatis. Necessitatibus ex ex quisquam suscipit vel qui magnam laborum. Nihil aut rerum nemo quia.',
                email: 'dsy54ui4ycblzej5cx1hfcyx23clkelrd520andnjlq1d8fhljh08x5sjlysu9jckcg876c8abgsl1dxc2dx5xkwxu4atpkoxift3l4slg7sto9z5axu6wl1',
                phone: 'g1lp1p9bfx3dy6qvfyn7gqy9zpiiqsb9wt9qpx3ajx5dyjtxf1j5ad8hcld838f1or6dixhil0khe10lugah1imusf9y6iqiykwzbmhyorj6a0ny4ly3abaw',
                fax: 'n9l5kdd6fjrm1sdwdrwcztxj84aw5ocrt4z8x1qc6e29xlxp6uin18jzwn1aq7vpwdrzenls3jpqggp2d1rdy44hsmd4an6ssxjnhh80kvdgzkb4yznmqctv',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: '0p6h9isnum',
                locality: 'i0zwuejy5jnpdamjhy3ynnmgqeu4j5tanm9y5emkoof38ee2rk3pwque7e94f3qs9btdkas3y6ctu1txp43nr8brvbasbaxrw4ugnc26nvy4qlc0crw9ume7mpbi4',
                address: 'jqbg4jzyvrjy0xjdfmyzgk6hgu2m8el23x1q0jmqzytaj78ew573rpkdzqhbyagtan2r33gahcbuov57drhrutvmt9igrc5rp7f7w32vopm20llw6qb78srzhskfuxssmy7cd0281e5yjd81tof4d9d3s2zp77jwspzxjz1dcju0efp8kqsjwo1of4iydo8r000afasf32yhs3fnqpttmdym08klfsg8v2kqxk21w3soczcflwso70spqrye2vk',
                latitude: 216.47,
                longitude: 706.14,
            })
            .expect(201);
    });

    test(`/REST:GET origen/partners/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partners/paginate')
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

    test(`/REST:GET origen/partner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'fd73b2bf-6f54-451c-9a3e-69fe7eda7e36'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET origen/partner`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '8307be3b-9e21-4a24-ba38-ab70db28330d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8307be3b-9e21-4a24-ba38-ab70db28330d'));
    });

    test(`/REST:GET origen/partner/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner/bab8a521-e433-4a1d-8b5d-ba2fa6879e0f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET origen/partner/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner/8307be3b-9e21-4a24-ba38-ab70db28330d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8307be3b-9e21-4a24-ba38-ab70db28330d'));
    });

    test(`/REST:GET origen/partners`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partners')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT origen/partner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cfc55a8a-f78c-485e-b7ed-3e31e87491a6',
                name: '0xyxrsxkg17kvxcj309dtwwcbq6n55dq5p1tt5a7oyz7f3e21vbjvdy4oah5z9yai1tkt0t72h6hjcwtk9tg8cefhuwr2aur2j83gtt1sy4bmus0hiyqabnyknualykgu41uq3hwciqe4c4lmpem5471dbn4rk6kef4u352zwkvmhamjq8mdjs0la0p52rghg6jx36xqex73l8xs4vlhefrm8dc8swm20gw5htfrlbxrvp1ee07jbajfjxyquui',
                socialNetworks: { "foo" : "bar" },
                description: 'Quod facere amet. Quo minus sint ipsam laudantium. Ea sapiente fugiat hic possimus asperiores delectus id. Dolor quidem odio fugiat consequatur blanditiis omnis in veniam.',
                excerpt: 'Numquam labore provident quis temporibus qui. Laboriosam debitis veritatis voluptatibus tenetur minus aut. Velit aperiam aperiam sed mollitia. Dolores repellat qui. Voluptate reprehenderit minus minus est sapiente et molestiae adipisci. Dolores voluptatem assumenda dolorem cumque quia dolor modi saepe.',
                email: 'u3x0thnn61v5wk4v8u9qlzsfn7fd6rk4vwz9o90gah4p832txcwafwnl0ek1pg2stmk0eg787kuzzju2or6whb9nnmp670vgrh3xomkic3yfxrw0k4qmi12j',
                phone: 'f5vftui0pg9eqijr4e8itfx9gf3f4ftgruqwymbphax9latbld3ier2jbvj0j2xsuupl5muzx4ll1zmasn0i7789kns57sy49k0ur49p2x6ia53sxwm0wbta',
                fax: '21y7q3q2q6xro4awoaa9wtk3dyrxjbenn3womjf4tj5x5w0cs34dsuddzdi3h26ryzi8dl9cdpr10o6dp4irznmwp2fzr2foox0c8g4s6l51mnwbqg7fg85v',
                countryCommonId: '70937232-8e14-4f13-ae09-e43742b3ef91',
                administrativeAreaLevel1Id: '6405e7aa-8218-4343-a19b-a1212c3cfc9f',
                administrativeAreaLevel2Id: '794e141a-d9d8-42e7-b889-d917e24fcd8e',
                administrativeAreaLevel3Id: '6943c8cc-2e74-4da9-8b78-22df73107e44',
                zip: '60kujr0b9a',
                locality: '8zsumf0z6oa1fio8ljx7yzby28297s7zkszzcal44ux9pz5u2d850n8dqpuw8r1u17hdxrgupt61moumsv8vjr48lo0lgfi9fysylmivs5p261v6hm0h0ljxik3jk',
                address: 'z8jqrhgwuey6nf43r0tb6eoxqzhrvj0fmx1jbc9oxr6tdmvk8c97kdxodjl3m9al1tf2g7x7oaappifl9e4yewodbrlwemcxh42qk3ve6yziwovlqw5l9ias50t9yphg62bha7ff3myw4tau2b0m9vcum6mqc2dp92j6czffgql8mx3qmd0bw8g05s91x3vistm0qrcwxuij7zim6kt9j8snc2610n6n4dcacaibo2b8k6pohwgy75mowpwubiz',
                latitude: 848.51,
                longitude: 801.24,
            })
            .expect(404);
    });

    test(`/REST:PUT origen/partner`, () => 
    {
        return request(app.getHttpServer())
            .put('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                
                id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                name: '3cysei3zcz1icasuc5n29409dfrlschund4kv25fbs9yh7tma6zgndbzsvl5z8kt3h5exg801n6oi0m4cjwpizal4x2ly6hvpj0cdm5rhi2rooemv2et869xb6vsu7qi9f33yytybp326tmyhax870b8yee8u5goi78v94ahwx3zfjp45s7k3j3sb654kh6u8egmuuu1osu6k89eb4fnrrhy3qp1knqd5wj4obwj9p026gu4cyztl23bsauc6cr',
                socialNetworks: { "foo" : "bar" },
                description: 'Harum nemo ut architecto et fugiat quam unde unde suscipit. Aut enim ipsa enim et. Dicta in voluptates qui. Nihil voluptate porro eligendi aliquam. Consequatur quo qui ut assumenda et sint deserunt.',
                excerpt: 'Dolor dolore molestiae eveniet. Illo nesciunt officia corrupti. Impedit nesciunt maiores quis at voluptatum placeat illo quo architecto. Ipsa architecto occaecati. Voluptatem aut enim perspiciatis. Sapiente ut quis ut eaque error aut.',
                email: 'ohuu9eiid7v62xbg0qsukn67vzmqxtzn4zuu6xw08kti22tf7j2eeo6x8ya52tsuiufmjuk7kuheo9kewwnkdkm6ap85fpptbrij9jkax8iwv2pzbzfa909q',
                phone: 'upp4ocs1hyi6cffm83i266uy1c83oaaqy44b3ct4ok34mg8q5h47r9v5ajs3v4kxl33wu09h4xfq85f01eageawgvbjkd72hgbuo8n72330z6m9dgmslv5cd',
                fax: 'tt6smgrojx8scdi9kbzp4ycc8ygr07ocu6csidxyimbffruir68gc0s60z2idkl9rzbnau7gtypvkzjlisolsz828a2wpoxinl32ie3qanwggt0emdrh0rbh',
                countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                zip: 'j3rozh9aph',
                locality: 'i6e1yjy9ytm98y8i15vmwkdkruw2hxhb3ow1arqy7g0ouojdze7dg9959npuol08c6hpl67fkiinkduxpzhgb1ffkala8yoyvfzxua6fs7gfn6r4qvfzzxqyajvpp',
                address: '47juhhhsllmfohkwzx7a0g4mbrkx0luqtb5uexkla1yar0gi7jve23mbj7ovsej6t9sv550z8au6lcp7mx8pl58sgls7e3gnctldgj2b8tvxs5ij3ds1nn6tgzzhi3p116j85hfk1t4vz7r7mzikkbefjti7yo3stfk6w082nno31rekawpvp0gylfwbuktzajz1w6o6zxn1uw3w4texzrnz1yh4bn4glndktshuhgzy9ole82sx23jz8kjlm5a',
                latitude: 382.12,
                longitude: 987.33,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8307be3b-9e21-4a24-ba38-ab70db28330d'));
    });

    test(`/REST:DELETE origen/partner/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/origen/partner/431bb339-aedc-4e65-b483-1ffd7353670b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE origen/partner/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/origen/partner/8307be3b-9e21-4a24-ba38-ab70db28330d')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL origenCreatePartner - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenCreatePartnerInput!)
                    {
                        origenCreatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
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

    test(`/GraphQL origenCreatePartner`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenCreatePartnerInput!)
                    {
                        origenCreatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'b915d067-114d-4c84-8f95-4869c7e9384b',
                        name: 'vaseliufw1cnpfsmm1el7m3p3u8x5xr2xmesmoly9vu4dvej8oii6pqbft83xijj8gmgm3p97miek5lvdajmuuu9q5he4z1orohq5efiy377w8yy8yp3lvg8eij4tv9nmviupqq9lldeek9h0e9czezx6y8q6rgo30nkzw0q5qpw3bpkutpjagm64ry0uycjs4435le19sk78jttgl48ncbux6miz6vp2nwxbvc6wxbc7w87uu0j3vuxfdmahpe',
                        socialNetworks: { "foo" : "bar" },
                        description: 'Non mollitia consequatur. Et adipisci sed quis possimus id qui aut. Non nam ipsam quisquam eveniet sed et. Rerum laboriosam dolor fugit saepe vero perspiciatis fugiat dolorem. Nam et qui exercitationem hic quia repellat perferendis. Et nesciunt enim est temporibus ut.',
                        excerpt: 'Iure et saepe distinctio dolorem perferendis. Fugit sunt laborum quo consequatur delectus. Nobis est similique vel. Placeat expedita fuga odio ratione tempore voluptas quam sapiente.',
                        email: 'rs69w9c38jf0ca2mri2716ivcson458u2q1yxs36w2n7o4zmxii60qs3l8s73dxr16yockaer06munw3zi36xetaztthj9xru720957mgiili17gbfnhx6yh',
                        phone: 'g0azbo3ors6s2f0qyk2ojajoe7zcr7v3no4b48hwdb34wwb5q4t1tk7kk6mxv4mf2wnjt794vq17sn38mqny5fw4c3iidzbr1vg1hisb0bwx5e3zo868bnjk',
                        fax: 'srcwwshv9w9d5ahr0pj3110yrk30s3sk4ozvg2llmg6vhiiwlolvtmsnbgdi8sf2yz6xsg6z9m87ye7gpkqbek23fewamq1rudw7rhs9vm8cor8hn6320h2q',
                        countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                        administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                        administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                        administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                        zip: 'eqnhajfawz',
                        locality: '74d1g4tkiiyq2p12782viiiuttji4usa21hdkk0xmi9nqxesdcjujnbzhjpdilhlpo9uhnqtaxi3qvd3itnborvbgkdo5fut197e3hpgbay5u9cn3m4q57dv35cn1',
                        address: 'xkmaitem8ay9c9vzpndevviy369x5sfp848q2ph5s76rsejvfr95twloeixtjsfsnvh9l3fs6wufqqzias3404g828rxct277cnhkiu8hogstuuekgpd202tdmugg0ladn3kdxmybty6m36t1j92h968us96kcv80d1em0iraconog1ewv7pt3mdbxyvbzzmfw0obk9rwn5a5yp6k4tu03ld5whvgbxwob3dzpse5k5597oqmkztlc6286g7ktm',
                        latitude: 154.06,
                        longitude: 134.08,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenCreatePartner).toHaveProperty('id', 'b915d067-114d-4c84-8f95-4869c7e9384b');
            });
    });

    test(`/GraphQL origenPaginatePartners`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        origenPaginatePartners (query:$query constraint:$constraint)
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
                expect(res.body.data.origenPaginatePartners.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.origenPaginatePartners.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.origenPaginatePartners.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL origenFindPartner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        origenFindPartner (query:$query)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
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
                            id: 'b6ab9aaa-5a8d-4f9d-afa8-d5ce40000462'
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

    test(`/GraphQL origenFindPartner`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        origenFindPartner (query:$query)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
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
                            id: '8307be3b-9e21-4a24-ba38-ab70db28330d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenFindPartner.id).toStrictEqual('8307be3b-9e21-4a24-ba38-ab70db28330d');
            });
    });

    test(`/GraphQL origenFindPartnerById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        origenFindPartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a4f0568f-0c71-4342-90a2-0fe46e3200c1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL origenFindPartnerById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        origenFindPartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8307be3b-9e21-4a24-ba38-ab70db28330d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenFindPartnerById.id).toStrictEqual('8307be3b-9e21-4a24-ba38-ab70db28330d');
            });
    });

    test(`/GraphQL origenGetPartners`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        origenGetPartners (query:$query)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.origenGetPartners.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL origenUpdatePartner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenUpdatePartnerInput!)
                    {
                        origenUpdatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '48f03cab-2637-4420-8cea-48a258f45a2d',
                        name: '0c1v0ffbd72tx6co01gbmjlknus4rqnq7jujzrsr7s2a3yuzr0pufjnt1gqqebcfsuewyx7haa3abrdnwqxc0dpq9o320ro5toyiuldpyqkguqlrfuvvzykrququlmz60jqxrcraz8z4mx0hiweytiiohq822zd70dg0hwk6lvwft23qruc389u66bgokzg37gqf8dqwc50jqtf0w8c2wbvudlvbxqua480ud2fa6huhrd2b1906ypad938wynh',
                        socialNetworks: { "foo" : "bar" },
                        description: 'Quisquam voluptas inventore dicta fugiat et. Distinctio occaecati tempora saepe voluptatibus. In cum quis impedit ullam omnis. Quia exercitationem inventore pariatur. Placeat ipsam nihil. Consequatur quo quia aliquam tempore libero ut ipsa.',
                        excerpt: 'Ad sit fugiat dolorem blanditiis corrupti. Mollitia in tempora commodi. Recusandae ipsum odit ut enim et ipsum.',
                        email: '23m96nhjw8bfpag636jpsah670lttqxks5avz1etl7fdcnnfalzkkcu8f4a9dy2qa6rv4f4fasfhikgobrcdd7kx59vgx7uvpb8vue1zo7tb1xg20ynwmfgi',
                        phone: 'owakgchassnifqymgfta2c7fyafbwhydwtczpcr6rm3ixzdvgd18wl34bdsk5j23zbw14tf2l1txpuo87tebvpdpwb3h08ghdfp8kgxzdur9f4ap4zwrkq85',
                        fax: 'z1ezmb46peolq8llr5vfqmy6d8palcqg7xqb1q2a90q9jqre88icngkq2azi3n0qkw4pjuc9tts73mk4pbxdboyfv3rtmuim738xpc0s5t23x9poxm6v0x0a',
                        countryCommonId: '4dc91dba-1b32-4222-afd8-522e343741fc',
                        administrativeAreaLevel1Id: '20bdb10e-2d81-442c-a254-13c89efcdecf',
                        administrativeAreaLevel2Id: '75a52d0f-c344-4a77-b92a-4f86d2065def',
                        administrativeAreaLevel3Id: 'c1cb0426-5a22-4973-a6df-c71320c700b5',
                        zip: 'lednc5tiij',
                        locality: 'cl9qq8z91p9r99es75a3it82jtk6gu59t5eabq53tmm7taum020aou7zamu8eywffh2tb82gl83rgtv80654bwqrgzdp5io4g2x0ejq58rz5xegdmrq760of6g9oy',
                        address: 'wtjlrhj0q3tbw7usazdjimhr0g3d4lcthq3nth1getdsymtob4t1vqr5u94jwne7i1s2vddtn5zlyodj7ygwil1xp3ndcq3apz7syjt0utur7mrehjksvb210j2oay9wk5hsun8hyovdhubwm4n7qz46urc7dhutssngei36dxst2rclac92dc67ozsov5tv9j6v0ngfu70s0jpa5kd586oaq4lyk1llyl116ifnl58phakj8uqhy89ts0s3ml6',
                        latitude: 239.02,
                        longitude: 465.24,
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

    test(`/GraphQL origenUpdatePartner`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenUpdatePartnerInput!)
                    {
                        origenUpdatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8307be3b-9e21-4a24-ba38-ab70db28330d',
                        name: '4nqmvwtk35d8aihobbsb93gx2kcd82llhexzyasrxlj072hvsffmfv9tjylskak4p5xtfd93a12936wjw4qouxn7vgj9nj1cmei3ewl773u9fv4hyp9na92ylaa8yeqeniv3zhmbcssc92ph8kd1ys5oxmfyp79hytu6scy9ca2fqenrywdjkprom7ys0ka88hk6y4nbz7i3eddvbtdqxk8mez0konxr2k4s8tzhdqp4pwxxirnnbndwbxmw98d',
                        socialNetworks: { "foo" : "bar" },
                        description: 'Doloribus vel sit cumque et aut. Dolores mollitia quia quia optio. Quo assumenda modi voluptatem quis asperiores pariatur. Est repudiandae magni dicta iste itaque non.',
                        excerpt: 'Qui consequatur accusantium asperiores provident qui. Amet consequuntur illo ut doloremque ut voluptatem tempore. Eum a delectus atque aut rerum debitis quibusdam ex eius. Voluptas in atque vel quibusdam minus. Ipsam commodi quia eius at. Praesentium voluptatem nulla voluptatibus facere labore mollitia.',
                        email: 's8gn3iehwciup8zbvkl4j7vjjnvp713gn4old1xo3ku7q2r04s49wwym1zr6vakunn81vkxofu98zksrujhk5y0ucoximrzfm7un1qrjmfqi5jxbt4b1c22m',
                        phone: 'xoradrln91lbz8jeitcpvgciypj669n3wa1hovawhr9x5hn5irovqvbbmn1osjbnnz1z642luz41qekjrrzfnk9qebtlhp6yo5szwv8gkw8fv9mofwv6hjqm',
                        fax: 'ait4670twy262s979bdv2kavt1gct31op6aqi4k9gpluvx6utsneyrs9dqwemth0p5vgrcsxq6ky65kgk4i41nk7t83j8rz7d34ojv6iz2zjeycahlhihac1',
                        countryCommonId: 'fbc0e32c-0c39-4935-87d8-4fed50676d83',
                        administrativeAreaLevel1Id: '1e4c259b-a9eb-40d1-a630-bfc6f64f2501',
                        administrativeAreaLevel2Id: '4040100c-ac75-4805-bdae-bc640eeebf58',
                        administrativeAreaLevel3Id: '4892651a-46cf-4437-a1db-414eb5a2a2aa',
                        zip: 'kaj0ll2sif',
                        locality: 'h9cb74lpypwf8uvzasicdyvclgmiyu48v7y1zcayfc8rd7ip03b9trice8uk70t6ocbmn9q3dcwqux2i5vyhvmyc1svhbto9sxvynwnehsj7qka0cvcwd3maxthy6',
                        address: 'p4tdfrht226osti1h61a3346n8bleqvtypjx12peme6gylr676ljy530iiral2ofbevnwd606lkfsltsor1395ru0vtjl1ji6gab6qa2pmya9bu2rbpljuv9t1wks90alw4ccghopw4bybf574e3zcpptc2lxdrm53bh0igcnt4pmucz01s25jd7hdwtfbrrqwn9doek5c2xprerk67ltdprrqq2pmbocz3nx03kmb0prpmaq5qux9ynr2a51dx',
                        latitude: 910.82,
                        longitude: 495.95,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenUpdatePartner.id).toStrictEqual('8307be3b-9e21-4a24-ba38-ab70db28330d');
            });
    });

    test(`/GraphQL origenDeletePartnerById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        origenDeletePartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1438f5ae-32ac-4ba8-89ad-f2ded60160f7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL origenDeletePartnerById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        origenDeletePartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8307be3b-9e21-4a24-ba38-ab70db28330d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenDeletePartnerById.id).toStrictEqual('8307be3b-9e21-4a24-ba38-ab70db28330d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});