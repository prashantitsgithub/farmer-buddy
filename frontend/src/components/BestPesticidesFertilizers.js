import React, { useState } from 'react';

const Opportunities = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    // Herbicides
    {
      name: 'Glyphosate Herbicide (Credit 41 Extra)',
      img: 'https://images.openai.com/thumbnails/434c0f94494bf8508f8598367f4b64fd.jpeg',
      detailImg: 'https://images.openai.com/thumbnails/434c0f94494bf8508f8598367f4b64fd.jpeg',
      details: {
        brand: 'Nufarm Credit 41 Extra',
        size: '2.5 Gallon',
        form: 'Liquid Concentrate',
        target: 'Broadleaf and grassy weeds in soybeans, corn, and cotton',
        content: '41% glyphosate isopropylamine salt',
        dose: '2–4 L/ha'
      }
    },
    {
      name: '2,4-D Herbicide (Shriram)',
      img: 'https://agrosiaa.com/uploads/userdata/seller/752ae7bdbb96bf25280b55990570beabf2048ce0/product_images/5653831782d3547473c5abd3144809e3fc39d66e2512a029ca.jpg',
      detailImg: 'https://agrosiaa.com/uploads/userdata/seller/752ae7bdbb96bf25280b55990570beabf2048ce0/product_images/5653831782d3547473c5abd3144809e3fc39d66e2512a029ca.jpg',
      details: {
        brand: 'Shriram 2,4-D',
        size: '400 ml, 1 L',
        form: 'Water-Soluble Concentrate',
        target: 'Broadleaf weeds in maize, wheat, potato, and sugarcane',
        content: '58% 2,4-D dimethyl amine salt',
        dose: '330–2500 ml/acre'
      }
    },
    {
      name: 'Glyphosate Herbicide (Crop Glypho)',
      img: 'https://i.ebayimg.com/images/g/AsQAAOSwYcJgTvpG/s-l225.jpg',
      detailImg: 'https://i.ebayimg.com/images/g/AsQAAOSwYcJgTvpG/s-l225.jpg',
      details: {
        brand: 'Nagarjuna Crop Glypho',
        size: '250ml to 5L',
        form: 'Liquid Concentrate',
        target: 'All plant types including grasses, perennials, and woody plants',
        content: '41% glyphosate isopropylamine salt',
        dose: 'Refer to label for specific crops and weeds'
      }
    },
    {
      name: 'Glyphosate Herbicide (Glypho Super 54)',
      img: 'https://5.imimg.com/data5/SELLER/Default/2021/1/AE/LZ/TS/24448088/glypho-54-fertilizer-500x500.jpg',
      detailImg: 'https://5.imimg.com/data5/SELLER/Default/2021/1/AE/LZ/TS/24448088/glypho-54-fertilizer-500x500.jpg',
      details: {
        brand: 'Ratnakar Glypho Super 54',
        size: '700 ml, 1400 ml',
        form: 'Soluble Liquid (SL)',
        target: 'Narrow & Broad leaves, weeds',
        content: 'Glyphosate 54% SL',
        dose: '1400 ml per acre'
      }
    },
    {
      name: '2,4-D Herbicide (Grip-58)',
      img: 'https://5.imimg.com/data5/SELLER/Default/2020/10/WM/PZ/NU/104631070/2-4-d-amine-salt-58-sl-herbicide-1000x1000.jpg',
      detailImg: 'https://5.imimg.com/data5/SELLER/Default/2020/10/WM/PZ/NU/104631070/2-4-d-amine-salt-58-sl-herbicide-1000x1000.jpg',
      details: {
        brand: 'Pestchem Grip-58',
        size: 'Various sizes',
        form: 'Soluble Liquid (SL)',
        target: 'Broad leaved weeds in sorghum, maize, wheat, aquatic weeds, potato & non-cropped areas',
        content: '2,4-D Amine Salt 58% SL',
        dose: '400-1000 ml/acre'
      }
    },
    {
      name: 'Mesotrione + Atrazine Herbicide (Mesoblast)',
      img: 'https://th.bing.com/th/id/R.5805ccb02e3ba62bf46c60d5405b5f33?rik=kW894UdivmIAjw&riu=http%3a%2f%2fse.chinapesticidemanufacturer.com%2fuploads%2f202025238%2fatrazine-20-mesotrione-5-od55425478762.jpg&ehk=MIV0yzLtXXQC3WLoZFq6eAMtfpTPoR4o7%2bv%2fGtRj5tA%3d&risl=&pid=ImgRaw&r=0',
      detailImg: 'https://th.bing.com/th/id/R.5805ccb02e3ba62bf46c60d5405b5f33?rik=kW894UdivmIAjw&riu=http%3a%2f%2fse.chinapesticidemanufacturer.com%2fuploads%2f202025238%2fatrazine-20-mesotrione-5-od55425478762.jpg&ehk=MIV0yzLtXXQC3WLoZFq6eAMtfpTPoR4o7%2bv%2fGtRj5tA%3d&risl=&pid=ImgRaw&r=0',
      details: {
        brand: 'Ratnakar Mesoblast',
        size: '700 ml, 1400 ml',
        form: 'Suspension Concentrate (SC)',
        target: 'Grass and broadleaf weeds in maize & sugarcane',
        content: 'Mesotrione 2.27% + Atrazine 22.7% SC',
        dose: '1400 ml/acre'
      }
    },
    {
      name: 'Imazethapyr Herbicide (Soya Guard)',
      img: 'https://th.bing.com/th/id/OIP._ccPd93lJ6TsHZgXIkFfpAAAAA?rs=1&pid=ImgDetMain',
      detailImg: 'https://th.bing.com/th/id/OIP._ccPd93lJ6TsHZgXIkFfpAAAAA?rs=1&pid=ImgDetMain',
      details: {
        brand: 'Pestchem Soya Guard',
        size: 'Various sizes',
        form: 'Soluble Liquid (SL)',
        target: 'Major annual & perennial grass & broadleaf weeds',
        content: 'Imazethapyr 10% SL',
        dose: '1-1.5 L/ha'
      }
    },
    {
      name: 'Paraquat Dichloride Herbicide (Parazox)',
      img: 'https://5.imimg.com/data5/SELLER/Default/2022/5/UH/UU/IR/122104025/whatsapp-image-2022-05-27-at-2-47-54-pm-removebg-preview-1--500x500.png',
      detailImg: 'https://5.imimg.com/data5/SELLER/Default/2022/5/UH/UU/IR/122104025/whatsapp-image-2022-05-27-at-2-47-54-pm-removebg-preview-1--500x500.png',
      details: {
        brand: 'Pestchem Parazox',
        size: 'Various sizes',
        form: 'Soluble Liquid (SL)',
        target: 'Non-selective, contact, post-emergent herbicide',
        content: 'Paraquat Dichloride 24% SL',
        dose: '1.25-3 L/ha'
      }
    },
    {
      name: 'Pretilachlor Herbicide (Pilot)',
      img: 'https://agribegri.com/productimage/1ec363553c612a9730c991d2efc86997-06-22-23-16-19-44.webp',
      detailImg: 'https://agribegri.com/productimage/1ec363553c612a9730c991d2efc86997-06-22-23-16-19-44.webp',
      details: {
        brand: 'Coromandel Pilot',
        size: 'Various sizes',
        form: 'Emulsifiable Concentrate (EC)',
        target: 'Weeds in rice fields',
        content: 'Pretilachlor 50% EC',
        dose: 'Refer to label for specific crops and weeds'
      }
    },
    {
      name: 'Atrazine Herbicide (Microzine)',
      img: 'https://cdn.shopify.com/s/files/1/0198/8486/products/Atrazine_Gallon_a18f4f72-0a03-4d8c-b7f3-3688d3335fdf_580x@2x.jpg?v=1552409242',
      detailImg: 'https://cdn.shopify.com/s/files/1/0198/8486/products/Atrazine_Gallon_a18f4f72-0a03-4d8c-b7f3-3688d3335fdf_580x@2x.jpg?v=1552409242',
      details: {
        brand: 'Mahabir Bajrang Microzine',
        size: 'Various sizes',
        form: 'Wettable Powder (WP)',
        target: 'Weeds in maize and sugarcane',
        content: 'Atrazine 50% WP',
        dose: 'Refer to label for specific crops and weeds'
      }
    },
    // Insecticides
    {
      name: 'Chlorpyrifos Insecticide (Drishti)',
      img: 'https://australandagri.com.au/wp-content/uploads/2023/02/Chlorpyrifos.png',
      detailImg: 'https://australandagri.com.au/wp-content/uploads/2023/02/Chlorpyrifos.png',
      details: {
        brand: 'Drishti Biotech',
        size: '1 L',
        form: 'Emulsifiable Concentrate (EC)',
        target: 'Chewing, sucking, boring insects in cotton, rice, sugarcane',
        content: '50% Chlorpyrifos',
        dose: '1.5–2 ml/litre of water'
      }
    },
    {
      name: 'Imidacloprid Insecticide (Rallis Mida 20 SL)',
      img: 'https://th.bing.com/th/id/OIP.LvlURSv9XCWNcbm9-q5f9wAAAA?rs=1&pid=ImgDetMain',
      detailImg: 'https://th.bing.com/th/id/OIP.LvlURSv9XCWNcbm9-q5f9wAAAA?rs=1&pid=ImgDetMain',
      details: {
        brand: 'Rallis Mida 20 SL',
        size: '50 ml, 100 ml, 250 ml, 1 L',
        form: 'Soluble Liquid (SL)',
        target: 'Aphids, jassids, thrips, leaf miners, termites',
        content: '20% Imidacloprid',
        dose: 'Refer to label for specific crops and pests'
      }
    },
    {
      name: 'Azadirachtin Bio-Insecticide (AzaNeem-50000)',
      img: 'https://www.greenvisionindia.com/wp-content/uploads/2019/07/azaneem-50000.jpg',
      detailImg: 'https://www.greenvisionindia.com/wp-content/uploads/2019/07/azaneem-50000.jpg',
      details: {
        brand: 'Green Vision AzaNeem-50000®',
        size: 'Various sizes',
        form: 'Liquid',
        target: 'Sap-sucking, chewing, leaf-cutting insects, borers',
        content: '50,000 ppm Azadirachtin',
        dose: '0.5 ml/litre water'
      }
    },
    {
      name: 'Imidacloprid Insecticide (Crop Mida)',
      img: 'https://5.imimg.com/data5/SELLER/Default/2022/12/ZY/XQ/GV/13984261/copper-sulphate-1000x1000.jpeg',
      detailImg: 'https://5.imimg.com/data5/SELLER/Default/2022/12/ZY/XQ/GV/13984261/copper-sulphate-1000x1000.jpeg',
      details: {
        brand: 'Nagarjuna Crop Mida',
        size: '50ml, 100ml, 250ml, 500ml, 1L',
        form: 'Soluble Liquid (SL)',
        target: 'Sucking pests, leaf hoppers, aphids, thrips, white flies',
        content: '17.6% Imidacloprid',
        dose: 'Refer to label for specific crops and pests'
      }
    },
    {
      name: 'Triazophos Insecticide (Crop Tryzo)',
      img: 'https://tiimg.tistatic.com/fp/2/005/963/triazophos-40-ec-943.jpg',
      detailImg: 'https://tiimg.tistatic.com/fp/2/005/963/triazophos-40-ec-943.jpg',
      details: {
        brand: 'Nagarjuna Crop Tryzo',
        size: '250ml, 500ml, 1L, 5L',
        form: 'Emulsifiable Concentrate (EC)',
        target: 'Aphids, thrips, midges, beetles, larvae, cutworms, soil insects, mites',
        content: '40% Triazophos',
        dose: 'Refer to label for specific crops and pests'
      }
    },
    {
      name: 'Bacillus thuringiensis (Bt) Bio Insecticide (Biobit)',
      img: 'https://www.perfarelalbero.it/557177-home_default/biobit-df-insetticida-biologico-bacillus-thuringiensis-kurstaki-1kg.jpg',
      detailImg: 'https://www.perfarelalbero.it/557177-home_default/biobit-df-insetticida-biologico-bacillus-thuringiensis-kurstaki-1kg.jpg',
      details: {
        brand: 'Biobit',
        size: '100 gm, 500 gm',
        form: 'Wettable powder (WP)',
        target: 'Caterpillars, armyworms, corn borers',
        content: 'Bacillus thuringiensis var. kurstaki spores',
        dose: '500 gm/acre'
      }
    },
    {
      name: 'Dichlorvos Insecticide (DDVP 76 EC)',
      img: 'https://5.imimg.com/data5/EX/KI/MY-38654239/dichlorvos-76-500x500.jpg',
      detailImg: 'https://5.imimg.com/data5/EX/KI/MY-38654239/dichlorvos-76-500x500.jpg',
      details: {
        brand: 'Ambachem',
        size: '100 ml, 500 ml, 1 L',
        form: 'Emulsifiable Concentrate',
        target: 'Houseflies, mosquitoes, storage pests',
        content: '76% Dichlorvos',
        dose: '1 ml/litre'
      }
    },
    {
      name: 'Lambda-Cyhalothrin Insecticide (Karate)',
      img: 'https://filebroker-cdn.lazada.com.ph/kf/S0ad6aee59aba4e15a3b86561e9927115b.jpg',
      detailImg: 'https://filebroker-cdn.lazada.com.ph/kf/S0ad6aee59aba4e15a3b86561e9927115b.jpg',
      details: {
        brand: 'Syngenta Karate',
        size: '100 ml, 250 ml',
        form: 'Capsule Suspension (CS)',
        target: 'Moths, beetles, caterpillars',
        content: '5% Lambda-Cyhalothrin',
        dose: '300–400 ml/ha'
      }
    },
    {
      name: 'Permethrin Insecticide (Astro)',
      img: 'https://th.bing.com/th/id/OIP.T4MQK4bzBm43O3Cj-sholQHaJU?w=151&h=190&c=7&r=0&o=5&pid=1.7',
      detailImg: 'https://th.bing.com/th/id/OIP.T4MQK4bzBm43O3Cj-sholQHaJU?w=151&h=190&c=7&r=0&o=5&pid=1.7',
      details: {
        brand: 'FMC Astro',
        size: '500 ml, 1 L',
        form: 'Emulsifiable concentrate',
        target: 'Mites, fleas, ticks, flies',
        content: '25% Permethrin',
        dose: '1–2 ml/litre'
      }
    },
    {
      name: 'Pyrethrum Insecticide (PyGanic)',
      img: 'https://th.bing.com/th/id/OIP.zZw2KQ0P26B-xrBT1swAVwHaE8?w=298&h=199&c=7&r=0&o=5&pid=1.7',
      detailImg: 'https://th.bing.com/th/id/OIP.zZw2KQ0P26B-xrBT1swAVwHaE8?w=298&h=199&c=7&r=0&o=5&pid=1.7',
      details: {
        brand: 'PyGanic',
        size: '100 ml, 250 ml',
        form: 'Liquid',
        target: 'Mosquitoes, aphids, leafhoppers, soft-bodied insects',
        content: '1.4% Pyrethrins',
        dose: '1–2 ml/litre'
      }
    },
    // Fungicides
{
  name: 'Mancozeb Fungicide (Dithane M-45)',
  img: 'https://th.bing.com/th/id/OIP.GRd_MFZY0RDQl71DskE9_QAAAA?rs=1&pid=ImgDetMain',
  detailImg: 'https://th.bing.com/th/id/OIP.GRd_MFZY0RDQl71DskE9_QAAAA?rs=1&pid=ImgDetMain',
  details: {
    brand: 'Dithane M-45',
    size: '250 gm, 500 gm, 1 kg',
    form: 'Wettable Powder (WP)',
    target: 'Fungal diseases like early and late blight, anthracnose',
    content: '80% Mancozeb',
    dose: '2-3 gm/litre'
  }
},
{
  name: 'Copper Oxychloride Fungicide (Kocide 2000)',
  img: 'https://th.bing.com/th/id/OIP.qcSEhDg-fyzGBSMZl4xPIwHaHa?w=179&h=180&c=7&r=0&o=5&pid=1.7',
  detailImg: 'https://th.bing.com/th/id/OIP.qcSEhDg-fyzGBSMZl4xPIwHaHa?w=179&h=180&c=7&r=0&o=5&pid=1.7',
  details: {
    brand: 'Kocide 2000',
    size: '100 gm, 250 gm, 1 kg',
    form: 'Wettable Powder (WP)',
    target: 'Blights, downy mildew, fruit rots',
    content: '50% Copper Oxychloride',
    dose: '2 gm/litre'
  }
},
{
  name: 'Tebuconazole Fungicide (Folicur 250 EC)',
  img: 'https://th.bing.com/th/id/OIP.kUg94vYC54kk_1SNQoo7xAHaHa?w=184&h=184&c=7&r=0&o=5&pid=1.7',
  detailImg: 'https://th.bing.com/th/id/OIP.kUg94vYC54kk_1SNQoo7xAHaHa?w=184&h=184&c=7&r=0&o=5&pid=1.7',
  details: {
    brand: 'Folicur 250 EC',
    size: '100 ml, 250 ml, 1 L',
    form: 'Emulsifiable Concentrate (EC)',
    target: 'Leaf spot, rust, powdery mildew',
    content: '25% Tebuconazole',
    dose: '1–2 ml/litre'
  }
},
{
  name: 'Carbendazim Fungicide (Bavistin)',
  img: 'https://th.bing.com/th/id/OIP.jvwpIO_hfcs9fZQcO8_JlwAAAA?w=180&h=210&c=7&r=0&o=5&pid=1.7',
  detailImg: 'https://th.bing.com/th/id/OIP.jvwpIO_hfcs9fZQcO8_JlwAAAA?w=180&h=210&c=7&r=0&o=5&pid=1.7',
  details: {
    brand: 'Bavistin',
    size: '100 gm, 250 gm, 1 kg',
    form: 'Wettable Powder (WP)',
    target: 'Powdery mildew, anthracnose, root rot',
    content: '50% Carbendazim',
    dose: '1-2 gm/litre'
  }
},
{
  name: 'Chlorothalonil Fungicide (Bravo 720)',
  img: 'https://th.bing.com/th/id/OIP.83gSZyrOC3Y4v62wQPfApQHaHa?rs=1&pid=ImgDetMain',
  detailImg: 'https://th.bing.com/th/id/OIP.83gSZyrOC3Y4v62wQPfApQHaHa?rs=1&pid=ImgDetMain',
  details: {
    brand: 'Bravo 720',
    size: '250 ml, 1 L, 5 L',
    form: 'Emulsifiable Concentrate (EC)',
    target: 'Fungal diseases like late blight, downy mildew, rust',
    content: '72% Chlorothalonil',
    dose: '0.5–1 ml/litre'
  }
},
{
  name: 'Methyl Thiophanate Fungicide (Topsin-M)',
  img: 'https://th.bing.com/th/id/OIP.5NB6bkiOmSaOT90tqwRpMQHaHa?w=182&h=182&c=7&r=0&o=5&pid=1.7',
  detailImg: 'https://th.bing.com/th/id/OIP.5NB6bkiOmSaOT90tqwRpMQHaHa?w=182&h=182&c=7&r=0&o=5&pid=1.7',
  details: {
    brand: 'Topsin-M',
    size: '100 gm, 250 gm, 1 kg',
    form: 'Wettable Powder (WP)',
    target: 'Leaf spot, blight, anthracnose',
    content: '70% Methyl Thiophanate',
    dose: '1-2 gm/litre'
  }
},
{
  name: 'Azoxystrobin Fungicide (Amistar 250 SC)',
  img: 'https://th.bing.com/th/id/OIP.AKNtLTHtYzv2yMk84QWifAHaJg?w=135&h=180&c=7&r=0&o=5&pid=1.7',
  detailImg: 'https://th.bing.com/th/id/OIP.AKNtLTHtYzv2yMk84QWifAHaJg?w=135&h=180&c=7&r=0&o=5&pid=1.7',
  details: {
    brand: 'Amistar 250 SC',
    size: '250 ml, 500 ml, 1 L',
    form: 'Suspension Concentrate (SC)',
    target: 'Powdery mildew, downy mildew, leaf spot, rust',
    content: '25% Azoxystrobin',
    dose: '1-2 ml/litre'
  }
},
{
  name: 'Fluopyram Fungicide (Sercadis)',
  img: 'https://th.bing.com/th/id/OIP.TFKp03GVnwUh1VIUSiftJwHaEK?w=290&h=180&c=7&r=0&o=5&pid=1.7',
  detailImg: 'https://th.bing.com/th/id/OIP.TFKp03GVnwUh1VIUSiftJwHaEK?w=290&h=180&c=7&r=0&o=5&pid=1.7',
  details: {
    brand: 'Sercadis',
    size: '100 ml, 250 ml, 1 L',
    form: 'Suspension Concentrate (SC)',
    target: 'Late blight, fusarium wilt, powdery mildew',
    content: '10% Fluopyram',
    dose: '0.5-1 ml/litre'
  }
},
{
  name: 'Propiconazole Fungicide (Tilt 250 EC)',
  img: 'https://http2.mlstatic.com/D_NQ_NP_949323-MLM48886294693_012022-F.jpg',
  detailImg: 'https://http2.mlstatic.com/D_NQ_NP_949323-MLM48886294693_012022-F.jpg',
  details: {
    brand: 'Tilt 250 EC',
    size: '250 ml, 1 L',
    form: 'Emulsifiable Concentrate (EC)',
    target: 'Rust, blight, powdery mildew',
    content: '25% Propiconazole',
    dose: '1–2 ml/litre'
  }
},
{
  name: 'Difenoconazole Fungicide (Score 250 EC)',
  img: 'https://pestiless.com/wp-content/uploads/2021/03/Skor-250-EK-1L.jpg',
  detailImg: 'https://pestiless.com/wp-content/uploads/2021/03/Skor-250-EK-1L.jpg',
  details: {
    brand: 'Score 250 EC',
    size: '250 ml, 1 L',
    form: 'Emulsifiable Concentrate (EC)',
    target: 'Powdery mildew, leaf spots, rust',
    content: '25% Difenoconazole',
    dose: '1–2 ml/litre'
  }
},
// Fertilizers
{
  name: 'Urea Fertilizer (BASF)',
  img: 'https://th.bing.com/th/id/OIP.vDo-X1wVEXQuNWCYAE3aEQHaHa?w=199&h=200&c=7&r=0&o=5&pid=1.7',
  detailImg: 'https://th.bing.com/th/id/OIP.vDo-X1wVEXQuNWCYAE3aEQHaHa?w=199&h=200&c=7&r=0&o=5&pid=1.7',
  details: {
    brand: 'BASF Urea',
    size: '50 kg',
    form: 'Granular',
    target: 'All crops requiring nitrogen',
    content: '46% Nitrogen (N)',
    dose: '50-100 kg/ha'
  }
},
{
  name: 'Diammonium Phosphate (DAP) Fertilizer',
  img: 'https://th.bing.com/th/id/OIP._iR7KMHXb08kT7JfYfpEwgHaIw?w=150&h=180&c=7&r=0&o=5&pid=1.7',
  detailImg: 'https://th.bing.com/th/id/OIP._iR7KMHXb08kT7JfYfpEwgHaIw?w=150&h=180&c=7&r=0&o=5&pid=1.7',
  details: {
    brand: 'Nutrient DAP',
    size: '50 kg',
    form: 'Granular',
    target: 'Crops requiring phosphorus',
    content: '18% Nitrogen (N), 46% Phosphorus (P2O5)',
    dose: '50-75 kg/ha'
  }
},
{
  name: 'Potassium Chloride Fertilizer (KCl)',
  img: 'data:image/jpeg;base64,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',
  detailImg: 'data:image/jpeg;base64,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',
  details: {
    brand: 'FertiliPot KCl',
    size: '50 kg',
    form: 'Granular',
    target: 'Crops requiring potassium',
    content: '60% Potassium (K2O)',
    dose: '50-100 kg/ha'
  }
},
{
  name: 'Monoammonium Phosphate (MAP) Fertilizer',
  img: 'https://th.bing.com/th/id/OIP.b1bt7Oi3BF0qdeYanXXlpwHaJ4?w=136&h=182&c=7&r=0&o=5&pid=1.7',
  detailImg: 'https://th.bing.com/th/id/OIP.b1bt7Oi3BF0qdeYanXXlpwHaJ4?w=136&h=182&c=7&r=0&o=5&pid=1.7',
  details: {
    brand: 'AgriMap',
    size: '50 kg',
    form: 'Granular',
    target: 'Crops needing high phosphorus content',
    content: '11% Nitrogen (N), 52% Phosphorus (P2O5)',
    dose: '50-75 kg/ha'
  }
},
{
  name: 'Ammonium Nitrate Fertilizer',
  img: 'https://th.bing.com/th/id/OIP.949SHLQJQuZVtBt6t1mrXgHaHa?w=189&h=189&c=7&r=0&o=5&pid=1.7',
  detailImg: 'https://th.bing.com/th/id/OIP.949SHLQJQuZVtBt6t1mrXgHaHa?w=189&h=189&c=7&r=0&o=5&pid=1.7',
  details: {
    brand: 'AgriNitrate',
    size: '50 kg',
    form: 'Granular',
    target: 'Crops requiring nitrogen',
    content: '33% Nitrogen (N)',
    dose: '50-100 kg/ha'
  }
},
{
  name: 'Superphosphate Fertilizer (Single Superphosphate)',
  img: 'https://th.bing.com/th/id/OIP.PEdPl0PkddZjEfQ972eW5QHaI7?w=159&h=192&c=7&r=0&o=5&pid=1.7',
  detailImg: 'https://th.bing.com/th/id/OIP.PEdPl0PkddZjEfQ972eW5QHaI7?w=159&h=192&c=7&r=0&o=5&pid=1.7',
  details: {
    brand: 'AgriPhos',
    size: '50 kg',
    form: 'Granular',
    target: 'Crops requiring phosphorus',
    content: '18% Phosphorus (P2O5)',
    dose: '50-100 kg/ha'
  }
},
{
  name: 'Calcium Nitrate Fertilizer',
  img: 'https://i5.walmartimages.com/seo/Calcium-Nitrate-Fertilizer-1-Pound_46a0d67e-d2b3-4826-926f-78b428d90a64_1.fbb52d23caef0c9393192e1df4d247c1.jpeg',
  detailImg: 'https://i5.walmartimages.com/seo/Calcium-Nitrate-Fertilizer-1-Pound_46a0d67e-d2b3-4826-926f-78b428d90a64_1.fbb52d23caef0c9393192e1df4d247c1.jpeg',
  details: {
    brand: 'NutrientCal',
    size: '25 kg, 50 kg',
    form: 'Granular',
    target: 'Crops requiring calcium and nitrogen',
    content: '15% Nitrogen (N), 19% Calcium (Ca)',
    dose: '50-100 kg/ha'
  }
},
{
  name: 'Magnesium Sulfate Fertilizer (Epsom Salt)',
  img: 'https://th.bing.com/th/id/OIP.mI6nSt1ExsDOfi42xHbL8AHaHa?w=175&h=180&c=7&r=0&o=5&pid=1.7',
  detailImg: 'https://th.bing.com/th/id/OIP.mI6nSt1ExsDOfi42xHbL8AHaHa?w=175&h=180&c=7&r=0&o=5&pid=1.7',
  details: {
    brand: 'MagSulphate',
    size: '25 kg, 50 kg',
    form: 'Granular',
    target: 'Crops requiring magnesium and sulfur',
    content: '16% Magnesium (Mg), 13% Sulfur (S)',
    dose: '25-50 kg/ha'
  }
},
{
  name: 'NPK Fertilizer (15-15-15)',
  img: 'https://th.bing.com/th/id/OIP.eqcswV4TN7m3tItcO6o3iAHaJn?w=145&h=188&c=7&r=0&o=5&pid=1.7',
  detailImg: 'https://th.bing.com/th/id/OIP.eqcswV4TN7m3tItcO6o3iAHaJn?w=145&h=188&c=7&r=0&o=5&pid=1.7',
  details: {
    brand: 'AgriNPK',
    size: '25 kg, 50 kg',
    form: 'Granular',
    target: 'All crops requiring balanced nutrition',
    content: '15% Nitrogen (N), 15% Phosphorus (P2O5), 15% Potassium (K2O)',
    dose: '100-150 kg/ha'
  }
},
{
  name: 'Urea Ammonium Nitrate (UAN) Fertilizer',
  img: 'data:image/jpeg;base64,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',
  detailImg: 'data:image/jpeg;base64,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',
  details: {
    brand: 'AgriUAN',
    size: '200 L, 1000 L',
    form: 'Liquid',
    target: 'Crops requiring quick-release nitrogen',
    content: '28-32% Nitrogen (N)',
    dose: 'Apply as needed based on crop requirement'
  }
}    
  ];

  return (
    <div className="opportunities-container">
      

      <section className="opportunities">
        

        <div>
          <h2>🧪 Best Pesticides & Fertilizers</h2>
          <div><b>Herbicides, Insecticides, Fungicides, Fertilizers</b> </div>

          <div className="category-grid">
            {items.map((item, index) => (
              <div className="category-card" key={index} onClick={() => setSelectedItem(item)}>
                <img src={item.img} alt={item.name} />
                <h4>{item.name}</h4>
              </div>
            ))}
          </div>

          {selectedItem && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-content">
                  <button className="close-btn" onClick={() => setSelectedItem(null)}>
                    ✖
                  </button>
                  <h2>{selectedItem.name}</h2>
                  <img
                    src={selectedItem.detailImg}
                    alt={`${selectedItem.name} details`}
                    style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', marginBottom: '20px' }}
                  />

                  <table className="details-table">
                    <tbody>
                      <tr><td><strong>Brand</strong></td><td>{selectedItem.details.brand}</td></tr>
                      <tr><td><strong>Packaging Size</strong></td><td>{selectedItem.details.size}</td></tr>
                      <tr><td><strong>Form</strong></td><td>{selectedItem.details.form}</td></tr>
                      <tr><td><strong>Target</strong></td><td>{selectedItem.details.target}</td></tr>
                      <tr><td><strong>Content</strong></td><td>{selectedItem.details.content}</td></tr>
                      <tr><td><strong>Dose</strong></td><td>{selectedItem.details.dose}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Opportunities;
