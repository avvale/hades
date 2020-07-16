import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '78cd6508-25a8-4a36-98ef-6fb6429f61df'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a772b249-2ff4-4223-b032-06f3fadff071'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'vg2odr8o6xjpvxx45t3a'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '403e3583-6131-44f3-b629-f66eef36176b'
    })
    channelId: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'qz9h6me5au5i0cd21lvpv3qz5rm4vrvm5ec4tg86b9n20wm0o10vp007sidynocicsjc15mgobmn3nr6n0ywonh5wik15lbalbap0c3cyah755szrvddebq6b4ve7o3phd836v3swd1llvgwcnv1c1wvio0za5b9'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'skcyyho1w80q08rvcxqjusy3af9xp45ejt2nxgsks9hbfiuuh1nrinxts6enmfc5jptu2f8iga5r7859r1im9ov04kvhhdz5j83pc02vqgtugrl7u5t46ykn6ojsbz1v5z7r2ubg4qwxknm3sd3gsl288nzvytng'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'xa8nsen896trbiox9316c7op82gyduw23haqr1kw6exte7zbt4rp0u7xf4mln1vedb0w0xz0pabetunbocohx6qfzfiyfa5nm7odr6txy6m2d8mnnohofmgkpjimsfh34mx383jum1ug29io44ft0rcixwt2c0ap'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'meuqt46za9r3wf4ii4u75ov88lcmmnjyfj5ocy3kaqa04n5irsxzh652y1qxgpgz5ddqim2a88w55pl96pfsyscl6azdr2ec6139sfq5nwhswk4s39zwwwl3fq55678f7z9o6rxj7fwxxef4ghohdb9kvu18qqzd'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'j7sy85jbbatz02w46qm2eo2n8kxm84ea2dp26dbmyzsz6dscwbxu2dl9i4y0ui7h0y4okxlvnh53cu8yq555nucvar5djuuyq4mmnwk9b8nrnpgimnlkf9eyybjhnlwhhzv3p4k9rlmafg5k00di4r1gyioqio7k'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '9d4rfsdzddo78qglnrdha7mdcm9dyegz52tcabny8b6dl8gb2jbdxi22y04mzy9qt79fx4q9xpxibvxtcnxx8l92nlpoaxiy45lhk926nshf495t0j975ri8pr6oa7ifpu4z67cf7r0j3n5nvaiwrd959m9qa5aq'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'nz8836iyxggieu0d9jgdn4od4oszff3lroekojv72h9oneavzwrj7new038ckz2n1uhrpu8hf5vvl0ohetu000oxe0fyd8msyhenwxsxcb3372bhjwduo28z40vznlcekh1audr05ajmnvgesa8vztfh7a2lmws9'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '2wdfogkuhjp8hjhgzmi7g0doddtvyvmmb23oico8dfn5xmjmkq6o66gbtxyqbovuvikq5ufvg0qceow2fwil158fgimysj4tubv0af2jo6f829l051juz1oby2lfiuo90zqqg9pdj2upe9ig8pdops4wrn6ptktei0t9hjkbp7t9qyffvgiz9hsg82u9vl92hlepi5mnoicigito4qiynr38gt028u5wofbwylt2pwhj480upi8f5fszdrd85mj'
    })
    parameterGroup: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '24ijdol1swjyfonpm92uq9gs5eqtq7c5ghid3u66svpvxlyg0e60g655xir9pt4ln9oc7ct0mvanmsb4qjipev9jmct8gdke7sgqqyhfccq3follssaayaesluiuiocg1xvp1ge5kb2g45dkcm7v4rl5anseo2ztpkraj69v2agkd23vnrn1v652i9e3zaajzkckfu1xibsednaqevjxkgdur83uhi7uf3h4jed4v0g2edvfp2cfdfcagzc605ig62d9lndd4mxpq6uqhgvsj0bh2h14ahqkodtr9t56q4myvmc90u385a4wvebh760i'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '694hv9hr9ou8dtkat0z08mtfyqnaa9tc00ifbrck8dob4hmp5vb2jddx3lq7odj34rjupyrf66jojkadox4szy3n60yuehtgx5g8kyuqd2ylvn36qxlbtxlpweu2lrsdid33pific4diy318vcnkowiiv5wmoi7o7h2rl6om2802etuv7mw5bmb82lrrbtg0gwkgqmetgi31k9r9tj0j8ihd1602qbxmr5skys4mpr22kbrybe7whja3x12gk7djqeucw6rb1cp7pguaq53vy43kmt7f7srf0db49bytl7y39phwb6vo8dg66scpej21'
    })
    parameterName: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 's122osf9cpybhcugy8ua57xct7b3pbf3khtno0qcoib3nvbzwvd3aj404w4zsiq81vseohje7rav53gczj29hh0n2sqezyeu2zobs1ekg4hpdxsn93zecdm9qip5wfarwyqwfq1a47m1eebk0rzlpq4av7nvfj9dp0iwmzc2o28oyq7bq70b20luh5bo83akj3uf7pz1ho6c1v7f2mhdzjrhnlttux7loy0ytbq8u1mrcmnr77l9szr0x4o1q5e7bdmv05155iyxvzkrd1wvqea2frbvkcatrul4et5fqz38nvdlv4k7v18vrhgh8rfdabed65f08qhpsa84mgrsp73mh08iu48shf1q12jf707cuicgb4rikwh04xdyi2wesrht27z4uyg0g8qf5ryee0usjhbqmjhxyaj5vf95yyo23ocjohyr3imsvv6nobsn0t8pv6n9ouh6vztr423nbaf6n04s31meb9c0xlzun8no4vhc4k86btnlbgh5pgc9vk0vj8kgytn1t780mupk68eaa6majon15h4apafhn1b9psya2nmzutetcj5nisw24fhqa2ts4zqfl6rt0sxax3mbw3g5t8ultuw0uy2ll5qzgqda3h3x0k164t9hru466kxu3i34ujbocmqlw620hjxv5khsguvio1j3zcq46bo4fjptcwj7joftvy1e6zhxys2vgn1d2gsdkdihhp2xkyezbzl15e9241ffyaptb5cygbmgsag97bn3ajd0oa8l98x31zzl23f9jafgh2t33lb6fgaicv1r3hittks27rhfyglf3x68jfyas8n3t628keo409tcgmpxnalx4ow8uptzynf90lj1ua8nb9j4d4q6iv89v6iism4ddhgk07rclq4x09x6kztj0afjjtx8fj2gavc08yohekw2zdcrdf2biyu81y0xw0c248nleffarhmecznyw4chj9kmk7r5bq2jca6p2sdjkqubttjjar8ttxk6l4rmsb46eq32llrs'
    })
    parameterValue: string;
    
}
