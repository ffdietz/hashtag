const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CloudImageSchema = new Schema({
    asset_id: String,
    public_id: String,
    format: String,
    version: Number,
    resource_type: String,
    type: String,
    created_at: Date,
    bytes: Number,
    width: Number,
    height: Number,
    url: String,
    secure_url: String,
    ig_uploaded_at: String,
    image_metadata: { 
        ImageDescription: String,
        Keywords: String
    },
    colors: [{ String }],
    predominant: {
        google: [{ String }]
    },
    

    });

const CloudImage = mongoose.model('CloudImage', CloudImageSchema);
module.exports = CloudImage

const cloud_request_model_edited = 
{
    asset_id: "0e73e6c726c750a4e3db5a64f5bd1359",
    public_id: "2020-06-18_18.50.57_2334524738004511380_glaciargrey_xpgngq",
    format: "jpg",
    version: 1617662096,
    resource_type: "image",
    type: "upload",
    created_at: "2021-04-05T22:34:56Z",
    bytes: 171138,
    width: 1080,
    height: 1080,
    url: "http://res.cloudinary.com/dnpcf39vp/image/upload/v1617662096/2020-06-18_18.50.57_2334524738004511380_glaciargrey_xpgngq.jpg",
    secure_url: "https://res.cloudinary.com/dnpcf39vp/image/upload/v1617662096/2020-06-18_18.50.57_2334524738004511380_glaciargrey_xpgngq.jpg",
    next_cursor: "3def12a14a034d8fcad1eb2333d0e738849a8fcae5e5b4e714469e1e2d8602e5",
    image_metadata: {
        ImageDescription: "Contamos regressar em outubro a Argentina, Chile: Transpatagónica e Parque Tierra del Fuego- Fascinante travessia da Patagónia percorrendo os seus mais emblemáticos parques naturais, destacando o Torres del Paine e o Glaciares, onde iremos apreciar uma Natureza possante que nos oferecerá panoramas de enorme beleza. O nosso percurso irá levar-nos ao extremo sul e a embrenhar-nos no Parque Nacional da Terra do Fogo. Leia mais: clique no link da Bio ou consulte rotasdovento.com Duração: 18 dias de viagem, 9 de caminhada, 2 de navegação, 1 de kayak, 7 noites a acampar, 11 noites de estalagem/hotel. . . . . . . . . . #rotasdovento #patagonia #tierradelfuego #torresdelpaine #elcalafate #elchalten #peritomoreno #greyglacier #glaciargrey #ushuaia #cerrotore #fitzroy #cerrofitzroy #buenosaires #puertonatales #lagogrey #lagonordenskjöld #cuernosdelpaine",
        XPKeywords: "rotasdovento;patagonia;tierradelfuego;torresdelpaine;elcalafate;elchalten;peritomoreno;greyglacier;glaciargrey;ushuaia;cerrotore;fitzroy;cerrofitzroy;buenosaires;puertonatales;lagogrey;lagonordenskjöld;cuernosdelpaine",
    },
    colors: [
        [
        "#E0F7FB",
        16
        ],
        [
        "#D4CEC4",
        13.8
        ],
        [
        "#2F331D",
        9.6
        ],
        [
        "#373731",
        8.5
        ],
        [
        "#8E8578",
        6.4
        ],
        [
        "#3A3620",
        5
        ],
        [
        "#232226",
        5
        ],
        [
        "#89A7CB",
        3.6
        ],
        [
        "#8FB5D6",
        3.1
        ],
        [
        "#7C6F4F",
        2.9
        ],
        [
        "#111119",
        2.8
        ],
        [
        "#5B6E90",
        2.7
        ],
        [
        "#252926",
        2.5
        ],
        [
        "#737685",
        2
        ],
        [
        "#6C6940",
        1.8
        ],
        [
        "#ADBBD1",
        1.7
        ],
        [
        "#696B5A",
        1.6
        ],
        [
        "#2E1F1C",
        1.5
        ],
        [
        "#F9FDFC",
        1.4
        ],
        [
        "#62653E",
        1.2
        ],
        [
        "#191D03",
        1.1
        ],
        [
        "#211D04",
        0.8
        ],
        [
        "#2F080D",
        0.7
        ]
    ],
    predominant: {
    google: [
        [
        "white",
        31.1
        ],
        [
        "brown",
        22.4
        ],
        [
        "black",
        20.3
        ],
        [
        "gray",
        10.1
        ],
        [
        "teal",
        8.4
        ],
        [
        "blue",
        2.7
        ],
        [
        "red",
        0.7
        ]
    ],
    cloudinary: [
        [
        "white",
        31.1
        ],
        [
        "olive",
        22.4
        ],
        [
        "black",
        20.3
        ],
        [
        "lightblue",
        11.1
        ],
        [
        "gray",
        10.1
        ],
        [
        "red",
        0.7
        ]
    ]
    },
}

const cloud_request_model_original = 
{
    asset_id: "0e73e6c726c750a4e3db5a64f5bd1359",
    public_id: "2020-06-18_18.50.57_2334524738004511380_glaciargrey_xpgngq",
    format: "jpg",
    version: 1617662096,
    resource_type: "image",
    type: "upload",
    created_at: "2021-04-05T22:34:56Z",
    bytes: 171138,
    width: 1080,
    height: 1080,
    url: "http://res.cloudinary.com/dnpcf39vp/image/upload/v1617662096/2020-06-18_18.50.57_2334524738004511380_glaciargrey_xpgngq.jpg",
    secure_url: "https://res.cloudinary.com/dnpcf39vp/image/upload/v1617662096/2020-06-18_18.50.57_2334524738004511380_glaciargrey_xpgngq.jpg",
    next_cursor: "3def12a14a034d8fcad1eb2333d0e738849a8fcae5e5b4e714469e1e2d8602e5",
    derived: [],
    etag: "ce8d0482bbe91a461f6e695dcd51a247",
    image_metadata: {
        SpecialInstructions: "FBMD23000969010000f1420000dc5d00003c6d000071ea00001e430100027b010066e0010029330200068a0200",
        ImageDescription: "Contamos regressar em outubro a Argentina, Chile: Transpatagónica e Parque Tierra del Fuego- Fascinante travessia da Patagónia percorrendo os seus mais emblemáticos parques naturais, destacando o Torres del Paine e o Glaciares, onde iremos apreciar uma Natureza possante que nos oferecerá panoramas de enorme beleza. O nosso percurso irá levar-nos ao extremo sul e a embrenhar-nos no Parque Nacional da Terra do Fogo. Leia mais: clique no link da Bio ou consulte rotasdovento.com Duração: 18 dias de viagem, 9 de caminhada, 2 de navegação, 1 de kayak, 7 noites a acampar, 11 noites de estalagem/hotel. . . . . . . . . . #rotasdovento #patagonia #tierradelfuego #torresdelpaine #elcalafate #elchalten #peritomoreno #greyglacier #glaciargrey #ushuaia #cerrotore #fitzroy #cerrofitzroy #buenosaires #puertonatales #lagogrey #lagonordenskjöld #cuernosdelpaine",
        Artist: "",
        UserComment: "Contamos regressar em outubro a Argentina, Chile: Transpatagónica e Parque Tierra del Fuego- Fascinante travessia da Patagónia percorrendo os seus mais emblemáticos parques naturais, destacando o Torres del Paine e o Glaciares, onde iremos apreciar uma Natureza possante que nos oferecerá panoramas de enorme beleza. O nosso percurso irá levar-nos ao extremo sul e a embrenhar-nos no Parque Nacional da Terra do Fogo. Leia mais: clique no link da Bio ou consulte rotasdovento.com Duração: 18 dias de viagem, 9 de caminhada, 2 de navegação, 1 de kayak, 7 noites a acampar, 11 noites de estalagem/hotel. . . . . . . . . . #rotasdovento #patagonia #tierradelfuego #torresdelpaine #elcalafate #elchalten #peritomoreno #greyglacier #glaciargrey #ushuaia #cerrotore #fitzroy #cerrofitzroy #buenosaires #puertonatales #lagogrey #lagonordenskjöld #cuernosdelpaine",
        XPComment: "Contamos regressar em outubro a Argentina, Chile: Transpatagónica e Parque Tierra del Fuego- Fascinante travessia da Patagónia percorrendo os seus mais emblemáticos parques naturais, destacando o Torres del Paine e o Glaciares, onde iremos apreciar uma Natureza possante que nos oferecerá panoramas de enorme beleza. O nosso percurso irá levar-nos ao extremo sul e a embrenhar-nos no Parque Nacional da Terra do Fogo. Leia mais: clique no link da Bio ou consulte rotasdovento.com Duração: 18 dias de viagem, 9 de caminhada, 2 de navegação, 1 de kayak, 7 noites a acampar, 11 noites de estalagem/hotel. . . . . . . . . . #rotasdovento #patagonia #tierradelfuego #torresdelpaine #elcalafate #elchalten #peritomoreno #greyglacier #glaciargrey #ushuaia #cerrotore #fitzroy #cerrofitzroy #buenosaires #puertonatales #lagogrey #lagonordenskjöld #cuernosdelpaine",
        XPAuthor: "",
        XPKeywords: "rotasdovento;patagonia;tierradelfuego;torresdelpaine;elcalafate;elchalten;peritomoreno;greyglacier;glaciargrey;ushuaia;cerrotore;fitzroy;cerrofitzroy;buenosaires;puertonatales;lagogrey;lagonordenskjöld;cuernosdelpaine",
        JFIFVersion: "1.01",
        ResolutionUnit: "None",
        XResolution: "1",
        YResolution: "1",
        Colorspace: "RGB",
        DPI: "0"
    },
    illustration_score: 0,
    semi_transparent: false,
    grayscale: false,
    colors: [
        [
        "#E0F7FB",
        16
        ],
        [
        "#D4CEC4",
        13.8
        ],
        [
        "#2F331D",
        9.6
        ],
        [
        "#373731",
        8.5
        ],
        [
        "#8E8578",
        6.4
        ],
        [
        "#3A3620",
        5
        ],
        [
        "#232226",
        5
        ],
        [
        "#89A7CB",
        3.6
        ],
        [
        "#8FB5D6",
        3.1
        ],
        [
        "#7C6F4F",
        2.9
        ],
        [
        "#111119",
        2.8
        ],
        [
        "#5B6E90",
        2.7
        ],
        [
        "#252926",
        2.5
        ],
        [
        "#737685",
        2
        ],
        [
        "#6C6940",
        1.8
        ],
        [
        "#ADBBD1",
        1.7
        ],
        [
        "#696B5A",
        1.6
        ],
        [
        "#2E1F1C",
        1.5
        ],
        [
        "#F9FDFC",
        1.4
        ],
        [
        "#62653E",
        1.2
        ],
        [
        "#191D03",
        1.1
        ],
        [
        "#211D04",
        0.8
        ],
        [
        "#2F080D",
        0.7
        ]
    ],
    predominant: {
    google: [
        [
        "white",
        31.1
        ],
        [
        "brown",
        22.4
        ],
        [
        "black",
        20.3
        ],
        [
        "gray",
        10.1
        ],
        [
        "teal",
        8.4
        ],
        [
        "blue",
        2.7
        ],
        [
        "red",
        0.7
        ]
    ],
    cloudinary: [
        [
        "white",
        31.1
        ],
        [
        "olive",
        22.4
        ],
        [
        "black",
        20.3
        ],
        [
        "lightblue",
        11.1
        ],
        [
        "gray",
        10.1
        ],
        [
        "red",
        0.7
        ]
        ]
    },
    pages: 1,
    usage: { },
    original_filename: "2020-06-18 18.50.57 2334524738004511380_glaciargrey",
    rate_limit_allowed: 500,
    rate_limit_reset_at: "2021-05-14T11:00:00.000Z",
    rate_limit_remaining: 498
    }