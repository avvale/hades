import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IApplicationRepository } from '@hades/o-auth/application/domain/application.repository';
import { MockApplicationRepository } from '@hades/o-auth/application/infrastructure/mock/mock-application.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('application', () =>
{
    let app: INestApplication;
    let repository: MockApplicationRepository;

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
            .overrideProvider(IApplicationRepository)
            .useClass(MockApplicationRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/application - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '0u95vefpgr3cvh3cmd4fzn7nprsla52v065o7n350xneptfs1mc5cv9y2phhiksbokwwtpv904c9t9b189slsqiymfr8szqpjqczzs1995soh21943y3hf2lgwpa0iwzuz4a027zsn6d5b048d22cnggcy4m1a11l76rmmxf2qim0deqf8nnk7q5zrykliw5j9wqlx5pp7f1itdqq65u2gri9nn4cpzopulea9tcfb51gpykv2cevsg09fwa0oc',
                code: 'df4muzy2cbazwndeenna41cwtgfounng9wevnyjyjn1q2705x7',
                secret: '1lu0448k5ugt34bjd7f0zn31pjbgzqs0u15k7t1bbnnvuynk9s0r42bnfo837d04pea9s48yhm9byp2h8m8yuhy1oz',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                name: 'wsz2cfemhjepcoprwb0umkqowcc6a2k143ngl4eylt5h1vbtgocwc67utuvsi1qosicdlvoqp5sd0aiyo0rj13gy8i4e6vionqpl9hg38vwggo1rgy61e5ruym3ekovmvcj2wfpvmpq5d97dek1ytz67z1wffxwyi2dow8s6e5hyh34i1hn88vk2hl5ylrw7xqybyl8gosoy4z986b29lv9scrkke57tf0lzh9aplsu5h6jocl8ez5d2n7av859',
                code: '98xqt8ug761kcqrieveqm2huao1q36qkk8qfvgg07899g89ppl',
                secret: 'arz20owpda55oi8hb1calnqkmq771wqyinjspyum1qim9mduinbie07sfipbk230u2goxcf3tyqrmqabg60964ytj4',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '377bd301-496a-404f-8a18-8becf638b68f',
                name: null,
                code: 'g3c7tghk6o6n3xz4eefle9uqr5ieqiq8mtxm0cw2m1rxkd8q63',
                secret: 'k7sg92y89ciguhf2gwa0ulx4ymjt87u13brftb558lmbeo7hsnavxlynf8y8dvdebwmbij06owtcab8z6p6ny5ztfm',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '377bd301-496a-404f-8a18-8becf638b68f',
                
                code: '3c86yieno8ubd9w54wmzoo2ycg3rk7zoi68l2flxttakh22bgi',
                secret: 'lw8ypdfuqxauo3fjq3ge6mohfvygdrqgy42wzas0b6xq2rk92c4f847928klc2ukxlz10glfwbivmtu61jhmsyho3u',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '377bd301-496a-404f-8a18-8becf638b68f',
                name: 'w09kr1k84h24tuf5re5anbpsip3si2ap716n8g36xtdodoxynqwwg9t8r4v2pj1wtlxgu7pnervh2idl277zac228l1ctxpqvin97dei6ee0b0x7url0c0m318t0wozqw790mw1l7epvia942bb2ixn3qt4qo3m0dooktsvi1qt2pe64djne9rrrmleefwkzwevbsbzoz61ndpduu11pxthhec5juqgvh9py344x8dfq9aaifc04sdtzy4u3epo',
                code: null,
                secret: 'z7oov9d0ik2cm5ggft6yq3b5m5agqqi2wu8i7wppr24s1n8sg2itcg257vic3wdgyld5z1uzqw09mddhw8gl5rj7ox',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '377bd301-496a-404f-8a18-8becf638b68f',
                name: 'qliwa6nwrsfyjx5qmunmahom5z6wvw6358g25e20kyje7dma91ok0xhw675eoo564m5kholvrv42j9njce1sghx89v5m515yr1w24nfwf7yftj9m93osy5nem0s505gnr2678unugeq6duvjurqeu5wc6eh4x5q7aklc0aaarpwdjl3infffo0vrhmmfkqck2d0h1wztjhtuzu4wf8wfqcck85ixvl9y5nursb61ktw4r4zzf114b0xs63r362h',
                
                secret: '2ozedgc2r0neacw303l2qsi68w1rvx1xxcetkd65gnp1t7k1qfx3gkayl4u3pg88i0szlqpg4l3b28djbawnj94ilm',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '377bd301-496a-404f-8a18-8becf638b68f',
                name: 'h8sjy8snckxnq9xhqdjd17w0kbyk4bxzwwj7cgcset7cakk05u5nax3h4v7ivs7ya87r8zpo28dlvfrmhif6rqeugqwu1njje3vx1jfxenhegdfzsq3klnjc91c5xrlwwrdig67n1b92y459pgcy26n2z15ynt50pw9u8okgb7unm6mco8o53r85q2znsl5843i6d2o46vh502y6r5ck04sgbdab4oxc84k9o9762aym9cqcw6hefg2687rdsy5',
                code: 'twofromo027e0w6oigkw4itf8776v4wcxp5bcyfdy6bexdxatt',
                secret: null,
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '377bd301-496a-404f-8a18-8becf638b68f',
                name: 'rnag1y33yhxieezbo0fdg1gng4l01hlm9qkuuqbea6c3t2mdgy4ccqgmltu7zbi7z3o9v8q3kwx6tmwnjie0qczryd5ntgw8045c53142572z0394l6j8jyrcmuhy5g5d79wujxkwubic5436uu9fie9yyjjtzrdrzyam6s1nm4qxn8utxxx5kbzvqs3hpjd03crblssnzgfz38qbns0i5ipz1lqegv0rsojvq8sd8aybzah3w8hjlebjw134vi',
                code: '2q6w445u3b7pygwsepkavk0253t03u0v3gnwbfm1w4e93r6st5',
                
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '377bd301-496a-404f-8a18-8becf638b68f',
                name: 'om76fg7l6n35jn8rmg9kcgrre7c7yeb6kg6v41gqrvo26xs5zmor541rqa54xywz5st2swy9a22mlq98mtnzqte1oqww6l1ibdcgak68a7d4l6kn846zc210746o58057efil6zby0edkwz8opggpy1tfnh79cbkx6llznd8y8wgkn1fxhd0o7roov4z06cdiwee9bq3vcz1dar656zbodwk18507qrsmb28hn4acacp07c4xdwiqvikgzx0vt7',
                code: 'y6ieikvsgid6lwwvrkkpd8ayl4rwwgcvt7wgl677v49asz8o7z',
                secret: 'lso74ktothlllkmx7k36mf38z5ro5qiyhsewqoxr11pgujea3l96k1f9ug2jsedt826d38dm1xmbulrbo5wpwql932',
                isMaster: null,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '377bd301-496a-404f-8a18-8becf638b68f',
                name: 'iofuy4xc30f86jqujljhhd86osjxuin2meei2n6mhp91wrsm4qzld1xrxhnej7sldbz5pyb0id79voyuo62pntnyhd8mlf8sxlvni7sikhtira9vnjqn4qtbqfo0w7s1abmfiw78n5f6we9sqkn9gj8fkldk1kl9717g4c2pqs4bsh3kjmfteln975odip0s67vlowvjlsacok3bfv1l428v1a2bmkypbddllkho0si0xkiaayft4zzvl5j37nh',
                code: 'zaysizrppn0yuqxngwr52ymtagkcotb61mxeu1c6egrju5q3my',
                secret: 'p6hxkkwpmirrixhgp55tijn7d68hoy6omoxd3fxty81nevq36w1jhbol6fgkbzuqhrgwshsf2ur3ip9gojww9s43t8',
                
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'j24td2yrzyp31c64bzmpz8d86m3b4i5oxb2yb',
                name: 'q2jlte6x5cja3fblmqn9aewehp7eee1q0o5naho4gwswhzgkoq8va1oiy8nzasn3m49nbpdueig2bwzpb34i66j000m4np8ejczqyelpy5fz4u6m2pt8gq43v4irtymu4yz0p6mldipp73bw01ngqp4wres9ixk7az3z425q9hxsmlfpo8u4elr2pmk1xitledr1c70t2ayodvfvp0obj9z4ulm6ni75ialpfgwqqp9af2xkup40fztzzcxe9i9',
                code: 'qyc00xdx3qspbmwk35huopgfwq5fht1acuq4es8xpycz10c7e0',
                secret: '9hgl1h9plwc3djoof9e671spi6hqoyy3a6lmr1vr5mevxsb4zog4yovlr503znu5o9lhvg4rmgo889i42q2vgwhh77',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '377bd301-496a-404f-8a18-8becf638b68f',
                name: 'kkpbfjj8ecfgrq8ac8siy9ywseym6tpob7o1m3ps1qg8ffwi7kbj94mmrbvhsrtgibt4tfg60s4jf51qy3v9lfipr31yc2fxa31if60j4mtf0zy8hcvxv450aowe1tybtlh42oqkdb7ng056jvpcm81qzj91r52y9b43i176lat56vga71gxxwo9tkjvxw13ej68vltjteap3xcglkc7l4r3crxhzzjtd1npr0jczsk7t03jp99wdkdq307pieia',
                code: 'ao0ade6iozfkl9ij6t10kn6h24rkwswqxrf8oe4373vnppvubb',
                secret: 't4s22yhh2pwlejakp6l2mvim3tewbl9lu52s0ts0gt7itogwit28g5q61zcslxw8k6qu56wnrh288yxwrcwuqlrn40',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '377bd301-496a-404f-8a18-8becf638b68f',
                name: 'stewze80s2r42cc1wsj4dhbofpy022pdlewhcuagv8lwjgaxnljvjzcmhmo8mkuzyppgdjoj6sk1tkfcspdt24ewssy5pfkr6yn2h775wbn2kpqjxecwbetzgb3qa00n4j5mhfba75btvlvcnt7tradezj0xb16n7d9h6yu15nerbxie1ccddib9h7o2a5slexrjeg2gh7e6eyta80j7soznxzly1oco1vu7wizf1nw2t0mfla2k5phvuzss5ne',
                code: 'iegsumwjdrwz195hd9n7a0ig1alwg1mrgeufe9nywlg7hemt73f',
                secret: 'xxf4m90fq376xsq1vgade7wi6iuys8spkgjdtz69b4ztmi3ncoiag6ltutth8xhg6jxmibgebzvg9aumlu8wtt74d3',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '377bd301-496a-404f-8a18-8becf638b68f',
                name: '9x0qq2gxws2ik5gkljz9nmmkomqz78xizlrfr83vr84r9q57wk7ixxs6jwphky8ju6qxi0y77ntg5ckyu7r8ymrrg8gzoeqzp4eiskbslc75k0pvdpyqnt5l7hgug57npzvxg2pv944bx3x0o43uniagh0omp76zre03um04xr96tw37fap7c012e4ym043zybjc9sqzjws1h29zf64wgl34cs61bx9s0rrmgj6l7cq7wclr6648unesqlq0npd',
                code: 'dnzyd1s0w06z6vb1x0iic0vgr1tw9luligqsi34a9upsn6gvll',
                secret: '53tyijinj4rht69r2dekvfppz1re77txxxqquammnf4ob7gx2svao4sjmvbzvbk34aibr941u26ln2pw9z5h2j5rc7r',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret is too large, has a maximum length of 90');
            });
    });
    

    

    

    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '377bd301-496a-404f-8a18-8becf638b68f',
                name: 'jyz1t14j8pqnimrj8w9g85m6dg1tpo81wgb664836z26v0nx43kqlaegrjyhrk775wj0z2y2t6kdoy0h4u78jlxx1xkltqlf0pj5882m6pb4k0yj3v5i5imveoal9ja5eflprrbnrs8oj3lx58hd9f4tfwrduoyba7z9fo50oxbakz8fnfcb62rhkfcubevj9pekvlzo7gig5r5m4qgnhu4llspe4atnpn8h2ovup31x0nu8pu6rpntcli4h7d4',
                code: 'gh42dlj50dabqtvd6u7acdemhsh36barq4hzeksv8t5xgutjfh',
                secret: '4tn8tw7f77yu9f459iehaser1oh0zicc3w1bdbnb6hjcqwhy3zgg579kxrus5wrk3dbiy7xz5ojm9b5chsaqv1xui2',
                isMaster: 'true',
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '377bd301-496a-404f-8a18-8becf638b68f',
                name: 'd6peu22dji34hszhmh33r4opl3ihp488z6ayft380jy3r3be5nx5m8l5awsi90trhs7lz0fuorahftcqqlugndcgagyudnmmqzokzwingcqhta2i04dupwhum439lmvucz854qjlbc2m9tnxuinx4wv5bpflwfqlky4wn6ipadhip4h5o3c8kckp7229vzit3iomv9tn45cw94b1xgjnnq97j9h5311mxp39m3dvw3v7unb2ugg8r7936lv74on',
                code: 'qzo8o9keczqxltcylb5n86temt048axcvn4raxgeqzrcko3wxr',
                secret: '2fs7a8atzpyk6slcvqggl9ka0pbbfaknmjdwu2zikfm23jbtnlo982gv7jddqm7hn9jzo8yszrebo3r0m8b3tym9ap',
                isMaster: false,
                clientIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/applications/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications/paginate')
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

    test(`/REST:GET o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '8610d427-5eb4-481f-ab3a-6038bcc20f61'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '377bd301-496a-404f-8a18-8becf638b68f'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '377bd301-496a-404f-8a18-8becf638b68f'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/387684a9-d561-49e1-92e1-bef1e3acaf09')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/377bd301-496a-404f-8a18-8becf638b68f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '377bd301-496a-404f-8a18-8becf638b68f'));
    });

    test(`/REST:GET o-auth/applications`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: '0923dd4d-4c84-46d3-bd32-e3616ecdb39f',
                name: 'hsizg3jquw0wblmzh2b08jevcykcujicno59wcyxpagm7r1k0duet6p6n8heohclus6w532et17j33j735ot7bnaekk1y547h5b61y6v6effas1ualk06s2yhuinudboufvoub1dlynqf446ti82azskc82qlhug0pjw93rdc1pme175f4nlr1s8czea0zazlty25buy46uwqji8twdmfgvmbr76ba2e0njy5emgza9er194pqkdsv662yeo2t6',
                code: '9plxc5phzmbp1azx1bfgfxz5i9cw1sd2yjcamd8zpjol9hxdg1',
                secret: '9nh0tez396q4zc9i5rk7a7u4onnb6yilqx0qdqukxispjtlyzfao84j3lfmsbr1xs0ylq0ut8fs8rdqogpoixuw437',
                isMaster: false,
                clientIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: '377bd301-496a-404f-8a18-8becf638b68f',
                name: 'dxsy0lctedneigohr0p5i65x6b2wzywy4qs4jgqdi0ystokm3xnrym2piodzs7ypa7uirf0rhouihjcomkvdog95jfat51lbfz4g6f3jw9li9axqh2kwo07ameuoulj8biacspkd7pxjmpvizpoz0aj5zvkmjsfxkym5et1rgyciq92vba02x5as45fgvlbex7l5jg7kig3ye55q5wbzzr1ttvz8mq9qev7i31qzbf0oav39ss2m4bs4gntq98i',
                code: 'xw0ewaokcaugx6ikx5wm07j70hfrolb8xx7jh1xr060nnnfmb5',
                secret: 'wd4gaggqs39fr88m7vguco4irdli9rqvcayxz93al8wja30d2aalf8gt9s2rutfzm8gpox5e0t60wrim6vcyq33a2q',
                isMaster: true,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '377bd301-496a-404f-8a18-8becf638b68f'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/1f4b8321-3bad-4cd2-8a57-bb1a961a359f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/377bd301-496a-404f-8a18-8becf638b68f')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateApplication - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
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

    test(`/GraphQL oAuthCreateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'be2d61a4-3fcf-44fd-81c5-444004966c40',
                        name: 'fub5e3yhwggccd29us7kdt4wr2qfolnn0xc0qx2klz81qz8regd5n4lin4k32ds393028d8f70u0z5hdi48lvbl4zbkdfonf6jvs41t1y9xd88n317wfky3snaf427pytas7kvfp00err9j86ru6vgf1sspthih6aibhy1qbwd7a1v3xtk6mhb57dm576cjoyzhirbsjvzwy5a9g41wson0nmdyojxpzc5uzf6kqpyvfka5kaq533eaqug7kvmr',
                        code: 'd243aohzknnx998kr74uwnqm0mj0we4vxsahohhkhs857mo3av',
                        secret: '4km8r0pxs3e3bpjnki2qhno3ia4a3f1tak558u8t73yhd7gan1610qhgqcd6zbm64y37mh3fliku9ic35rx41ht79z',
                        isMaster: true,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', 'be2d61a4-3fcf-44fd-81c5-444004966c40');
            });
    });

    test(`/GraphQL oAuthPaginateApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateApplications (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateApplications.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            name
                            code
                            secret
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
                            id: 'cf5f22e8-4669-4d84-bf1e-b8e45641f93d'
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

    test(`/GraphQL oAuthFindApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            name
                            code
                            secret
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
                            id: '377bd301-496a-404f-8a18-8becf638b68f'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('377bd301-496a-404f-8a18-8becf638b68f');
            });
    });

    test(`/GraphQL oAuthFindApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f550ad51-16eb-4bc2-b73b-1233fe5280e9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindApplicationById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '377bd301-496a-404f-8a18-8becf638b68f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('377bd301-496a-404f-8a18-8becf638b68f');
            });
    });

    test(`/GraphQL oAuthGetApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetApplications (query:$query)
                        {   
                            id
                            name
                            code
                            secret
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
                for (const [index, value] of res.body.data.oAuthGetApplications.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '07b082b8-8340-4ac0-8503-0f3b132f5618',
                        name: 'tcn4at401x7e3ou87zn7z1z30dvez1cb013n424uhrizj7ywa1b7thb7sflmllgaub1azaynwbqlifwyonczjvr9i7ka9gp2lipnxb7wo54aczm8jeytat77o4uzjpovi4yz91x20htgtp67ew7ton3sfjx9weums1o5ipvupsl84eu6qty84spx1mq38zgryw5xlpnajofqb26f57go5hy02sm2bzi2wumao657mwn540w2ivc4f761lp877mn',
                        code: 'rhouct18rrwkpe01h9giqy6w5trbjeb85nw3e87hy0g8ouq13h',
                        secret: 'j0wsvki3j6da4mxjv27gp6zm1nv9wtubakt5xj416lhlzbgltq9uz57f8afb2xpq5isjfo5lf4uatfmluepv275775',
                        isMaster: false,
                        clientIds: [],
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

    test(`/GraphQL oAuthUpdateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '377bd301-496a-404f-8a18-8becf638b68f',
                        name: '3un1njhzm7mgo12h5yigykiqd0653woo70rkirwzdex11hpmglxybkp6kr8k8mnq2ma6fqe3lglocmda65nuxuar2ogdy7f4z0gdq3ylbovupyai4wz17c53ouezc6g3s5urqzqwwsk34kcn34pl7npbrd2lnm1zsi18rh0l4itya1c8ocq6gn74hzh3yw55vovxxek8z9ddb92xovqp4nnt60ib74shwlg6truooz4mjb8na8xhp942vik9y29',
                        code: 'w5uoq2wceh16p09npv64b22t8lo4e669l0fc86jwxyk2ivvjei',
                        secret: 'qvbo3u0p90wtczuvi1mhd53cwv651de0qkxgsfwuyyde4qfz719hf1qezxowzhwf95k53t7gw3kmv5u7c3c7uib9ax',
                        isMaster: true,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('377bd301-496a-404f-8a18-8becf638b68f');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c0f58830-b3d4-441a-bbe2-0f486d50654e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '377bd301-496a-404f-8a18-8becf638b68f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('377bd301-496a-404f-8a18-8becf638b68f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});