// Photo registry: every photo on the site, each used exactly once.
// All photos are from Pexels (free for commercial use, no attribution
// required; credited anyway here and in CREDITS.md). Served same-origin
// under /img as AVIF / WebP / JPEG, cropped per slot (lib/images.js).
//
// `alt` is the default description; decorative uses pass alt="".

export const PHOTOS = {
  // Home hero
  // Photo by ThisIsEngineering on Pexels: https://www.pexels.com/photo/woman-coding-on-computer-3861958/
  heroWork: {
    id: "3861958",
    alt: "Engineer writing code at a desk with two large monitors",
    credit: "ThisIsEngineering",
    source: "https://www.pexels.com/photo/woman-coding-on-computer-3861958/",
  },
  // Home: service cards
  // Photo by KATRIN BOLOVTSOVA on Pexels: https://www.pexels.com/photo/a-person-holding-a-smartphone-with-a-blank-screen-6373215/
  serviceApp: {
    id: "6373215",
    alt: "Hands holding a smartphone with a blank screen over a dark desk",
    credit: "KATRIN BOLOVTSOVA",
    source: "https://www.pexels.com/photo/a-person-holding-a-smartphone-with-a-blank-screen-6373215/",
  },
  // Photo by Lukas Blazek on Pexels: https://www.pexels.com/photo/close-up-photo-of-gray-laptop-577210/
  serviceWeb: {
    id: "577210",
    alt: "Laptop on a sofa showing a web dashboard with charts",
    credit: "Lukas Blazek",
    source: "https://www.pexels.com/photo/close-up-photo-of-gray-laptop-577210/",
  },
  // Photo by picjumbo.com on Pexels: https://www.pexels.com/photo/notebook-beside-the-iphone-on-table-196644/
  serviceUx: {
    id: "196644",
    alt: "Notebook with hand-drawn app wireframes beside a phone",
    credit: "picjumbo.com",
    source: "https://www.pexels.com/photo/notebook-beside-the-iphone-on-table-196644/",
  },
  // Photo by Artem Podrez on Pexels: https://www.pexels.com/photo/selective-focus-of-a-dualshock-7773745/
  serviceGame: {
    id: "7773745",
    alt: "Game controller lit by pink and purple light",
    credit: "Artem Podrez",
    source: "https://www.pexels.com/photo/selective-focus-of-a-dualshock-7773745/",
  },
  // Services page: detail sections
  // Photo by Firos nv on Pexels: https://www.pexels.com/photo/a-close-up-shot-of-a-smartphone-beside-a-laptop-8171308/
  serviceAppDetail: {
    id: "8171308",
    alt: "Smartphone on a stand next to a laptop with code on screen",
    credit: "Firos nv",
    source: "https://www.pexels.com/photo/a-close-up-shot-of-a-smartphone-beside-a-laptop-8171308/",
  },
  // Photo by luis gomes on Pexels: https://www.pexels.com/photo/close-up-photo-of-programming-of-codes-546819/
  serviceWebDetail: {
    id: "546819",
    alt: "Laptop screen showing web application source code",
    credit: "luis gomes",
    source: "https://www.pexels.com/photo/close-up-photo-of-programming-of-codes-546819/",
  },
  // Photo by Davide Baraldi on Pexels: https://www.pexels.com/photo/close-up-shot-of-an-ipad-11813187/
  serviceUxDetail: {
    id: "11813187",
    alt: "Tablet showing a hand-drawn landing page wireframe on a desk",
    credit: "Davide Baraldi",
    source: "https://www.pexels.com/photo/close-up-shot-of-an-ipad-11813187/",
  },
  // Photo by minhphuc .workspace on Pexels: https://www.pexels.com/photo/double-monitor-pc-setup-on-desk-18304033/
  serviceGameDetail: {
    id: "18304033",
    alt: "Dark desk with two monitors and a PC set up for game development",
    credit: "minhphuc .workspace",
    source: "https://www.pexels.com/photo/double-monitor-pc-setup-on-desk-18304033/",
  },
  // Home: industry cards (decorative backgrounds, empty alt)
  // Photo by Towfiqu barbhuiya on Pexels: https://www.pexels.com/photo/contactless-payment-with-credit-card-11009960/
  industryFintech: {
    id: "11009960",
    alt: "Contactless card payment on a card terminal",
    credit: "Towfiqu barbhuiya",
    source: "https://www.pexels.com/photo/contactless-payment-with-credit-card-11009960/",
  },
  // Photo by Tima Miroshnichenko on Pexels: https://www.pexels.com/photo/a-doctor-writing-a-diagnosis-5407218/
  industryHealthcare: {
    id: "5407218",
    alt: "Doctor taking notes beside a tablet showing a brain scan",
    credit: "Tima Miroshnichenko",
    source: "https://www.pexels.com/photo/a-doctor-writing-a-diagnosis-5407218/",
  },
  // Photo by Deybson Mallony on Pexels: https://www.pexels.com/photo/photo-of-a-clothing-store-4903412/
  industryRetail: {
    id: "4903412",
    alt: "Clothing store interior with racks and a checkout counter",
    credit: "Deybson Mallony",
    source: "https://www.pexels.com/photo/photo-of-a-clothing-store-4903412/",
  },
  // Photo by Jan van der Wolf on Pexels: https://www.pexels.com/photo/modern-urban-high-rise-architecture-against-blue-sky-33244441/
  industryRealEstate: {
    id: "33244441",
    alt: "Modern residential high-rise against a blue sky",
    credit: "Jan van der Wolf",
    source: "https://www.pexels.com/photo/modern-urban-high-rise-architecture-against-blue-sky-33244441/",
  },
  // About page: generic workspace scenes, no people (TODO(content): swap in real office photos when available)
  // Photo by Huy Phan on Pexels: https://www.pexels.com/photo/a-desk-with-a-computer-and-a-keyboard-on-it-27436633/
  aboutDesk: {
    id: "27436633",
    alt: "Tidy desk with a laptop, a monitor and a keyboard by a window",
    credit: "Huy Phan",
    source: "https://www.pexels.com/photo/a-desk-with-a-computer-and-a-keyboard-on-it-27436633/",
  },
  // Photo by Walls.io on Pexels: https://www.pexels.com/photo/sticky-notes-on-a-whiteboard-15543113/
  aboutPlanning: {
    id: "15543113",
    alt: "Flipchart covered in colored sticky notes",
    credit: "Walls.io",
    source: "https://www.pexels.com/photo/sticky-notes-on-a-whiteboard-15543113/",
  },
  // Photo by Pixabay on Pexels: https://www.pexels.com/photo/teacup-of-latte-on-saucer-beside-notebook-414565/
  aboutNotebook: {
    id: "414565",
    alt: "Laptop, notebook and a cup of latte on a desk, seen from above",
    credit: "Pixabay",
    source: "https://www.pexels.com/photo/teacup-of-latte-on-saucer-beside-notebook-414565/",
  },
  // Careers page (TODO(content): replace with real Opus Geeks team photos)
  // Photo by Tima Miroshnichenko on Pexels: https://www.pexels.com/photo/colleagues-having-a-meeting-5439478/
  careersWhiteboard: {
    id: "5439478",
    alt: "Colleagues planning with sticky notes on a whiteboard",
    credit: "Tima Miroshnichenko",
    source: "https://www.pexels.com/photo/colleagues-having-a-meeting-5439478/",
  },
  // Photo by Diva Plavalaguna on Pexels: https://www.pexels.com/photo/employees-sitting-on-the-chair-in-front-of-the-table-while-having-a-meeting-6147015/
  careersTable: {
    id: "6147015",
    alt: "Overhead view of a team working together at a wooden table",
    credit: "Diva Plavalaguna",
    source: "https://www.pexels.com/photo/employees-sitting-on-the-chair-in-front-of-the-table-while-having-a-meeting-6147015/",
  },
  // Photo by Edmond Dantès on Pexels: https://www.pexels.com/photo/people-working-at-the-office-8547344/
  careersOffice: {
    id: "8547344",
    alt: "Team talking through a project at an office table",
    credit: "Edmond Dant\u00e8s",
    source: "https://www.pexels.com/photo/people-working-at-the-office-8547344/",
  },
  // Blog covers
  // Photo by Andrey Matveev on Pexels: https://www.pexels.com/photo/comparative-display-of-two-modern-smartphones-34190305/
  blogNative: {
    id: "34190305",
    alt: "Two modern smartphones side by side showing their interfaces",
    credit: "Andrey Matveev",
    source: "https://www.pexels.com/photo/comparative-display-of-two-modern-smartphones-34190305/",
  },
  // Photo by Mikhail Nilov on Pexels: https://www.pexels.com/photo/man-holding-a-smartphone-and-a-credit-card-7534796/
  blogTrust: {
    id: "7534796",
    alt: "Person paying on a smartphone with a bank card in hand",
    credit: "Mikhail Nilov",
    source: "https://www.pexels.com/photo/man-holding-a-smartphone-and-a-credit-card-7534796/",
  },
  // Photo by Negative Space on Pexels: https://www.pexels.com/photo/computer-desk-laptop-stethoscope-48604/
  blogHipaa: {
    id: "48604",
    alt: "Laptop and stethoscope on a white desk",
    credit: "Negative Space",
    source: "https://www.pexels.com/photo/computer-desk-laptop-stethoscope-48604/",
  },
  // Photo by cottonbro studio on Pexels: https://www.pexels.com/photo/sticky-notes-on-the-task-board-wall-6804093/
  blogMvp: {
    id: "6804093",
    alt: "Task board with sticky notes in backlog, in progress and done columns",
    credit: "cottonbro studio",
    source: "https://www.pexels.com/photo/sticky-notes-on-the-task-board-wall-6804093/",
  },
  // Photo by cottonbro studio on Pexels: https://www.pexels.com/photo/arranged-cutouts-and-pencils-on-beige-surface-10202668/
  blogDesignSystems: {
    id: "10202668",
    alt: "Neutral color swatches lined up with pencils",
    credit: "cottonbro studio",
    source: "https://www.pexels.com/photo/arranged-cutouts-and-pencils-on-beige-surface-10202668/",
  },
  // Photo by Ivan S on Pexels: https://www.pexels.com/photo/person-shopping-online-7620626/
  blogRetail: {
    id: "7620626",
    alt: "Person shopping online on a laptop with a card and delivery boxes",
    credit: "Ivan S",
    source: "https://www.pexels.com/photo/person-shopping-online-7620626/",
  },
  // Portfolio: Mobile Banking App
  // Photo by Mikhail Nilov on Pexels: https://www.pexels.com/photo/a-woman-talking-on-the-phone-holding-a-credit-card-6969663/
  bankCover: {
    id: "6969663",
    alt: "Woman using a banking app on her phone while holding a card",
    credit: "Mikhail Nilov",
    source: "https://www.pexels.com/photo/a-woman-talking-on-the-phone-holding-a-credit-card-6969663/",
  },
  // Photo by KATRIN BOLOVTSOVA on Pexels: https://www.pexels.com/photo/a-person-with-a-smartphone-on-hand-6373205/
  bankDevice: {
    id: "6373205",
    alt: "Hand holding a smartphone over a dark desk",
    credit: "KATRIN BOLOVTSOVA",
    source: "https://www.pexels.com/photo/a-person-with-a-smartphone-on-hand-6373205/",
  },
  // Photo by Tima Miroshnichenko on Pexels: https://www.pexels.com/photo/person-holding-brown-credit-card-and-cellphone-5198284/
  bankCard: {
    id: "5198284",
    alt: "Person holding a bank card and a smartphone",
    credit: "Tima Miroshnichenko",
    source: "https://www.pexels.com/photo/person-holding-brown-credit-card-and-cellphone-5198284/",
  },
  // Portfolio: Patient Care Portal
  // Photo by Tima Miroshnichenko on Pexels: https://www.pexels.com/photo/a-doctor-on-the-video-call-8376207/
  healthCover: {
    id: "8376207",
    alt: "Doctor on a telehealth video call on a tablet",
    credit: "Tima Miroshnichenko",
    source: "https://www.pexels.com/photo/a-doctor-on-the-video-call-8376207/",
  },
  // Photo by Kaboompics.com on Pexels: https://www.pexels.com/photo/woman-wearing-headphones-having-videocall-on-laptop-7195123/
  healthNurse: {
    id: "7195123",
    alt: "Nurse with a headset on a video call with a patient",
    credit: "Kaboompics.com",
    source: "https://www.pexels.com/photo/woman-wearing-headphones-having-videocall-on-laptop-7195123/",
  },
  // Photo by Anna Shvets on Pexels: https://www.pexels.com/photo/people-on-a-video-call-4225920/
  healthCall: {
    id: "4225920",
    alt: "Patient on a video call with a doctor on a laptop",
    credit: "Anna Shvets",
    source: "https://www.pexels.com/photo/people-on-a-video-call-4225920/",
  },
  // Portfolio: E-Commerce Platform
  // Photo by Leeloo The First on Pexels: https://www.pexels.com/photo/hand-holding-a-card-8938663/
  shopCover: {
    id: "8938663",
    alt: "Shopper checking out on a laptop with a card and phone",
    credit: "Leeloo The First",
    source: "https://www.pexels.com/photo/hand-holding-a-card-8938663/",
  },
  // Photo by Polina Tankilevitch on Pexels: https://www.pexels.com/photo/delivery-boxes-over-a-carpet-on-the-floor-4440794/
  shopParcels: {
    id: "4440794",
    alt: "Three delivery boxes with shipping labels on a rug",
    credit: "Polina Tankilevitch",
    source: "https://www.pexels.com/photo/delivery-boxes-over-a-carpet-on-the-floor-4440794/",
  },
  // Photo by Tima Miroshnichenko on Pexels: https://www.pexels.com/photo/woman-holding-black-tablet-computer-6170399/
  shopWarehouse: {
    id: "6170399",
    alt: "Warehouse worker checking orders on a tablet",
    credit: "Tima Miroshnichenko",
    source: "https://www.pexels.com/photo/woman-holding-black-tablet-computer-6170399/",
  },
  // Portfolio: Property Listings Platform
  // Photo by Jakub Zerdzicki on Pexels: https://www.pexels.com/photo/real-estate-virtual-tour-mobile-photo-camera-app-27788631/
  propertyCover: {
    id: "27788631",
    alt: "Phone showing a property interior in a real estate app",
    credit: "Jakub Zerdzicki",
    source: "https://www.pexels.com/photo/real-estate-virtual-tour-mobile-photo-camera-app-27788631/",
  },
  // Photo by Alena Darmel on Pexels: https://www.pexels.com/photo/a-couple-looking-at-a-clipped-document-7641825/
  propertyReview: {
    id: "7641825",
    alt: "Agent reviewing a listing with a couple",
    credit: "Alena Darmel",
    source: "https://www.pexels.com/photo/a-couple-looking-at-a-clipped-document-7641825/",
  },
  // Photo by Doğan Alpaslan Demir on Pexels: https://www.pexels.com/photo/a-close-up-of-a-modern-apartment-building-27459248/
  propertyBuilding: {
    id: "27459248",
    alt: "Modern apartment building facade with balconies",
    credit: "Do\u011fan Alpaslan Demir",
    source: "https://www.pexels.com/photo/a-close-up-of-a-modern-apartment-building-27459248/",
  },
  // Portfolio: VR Training Simulator
  // Photo by Atlantic Ambience on Pexels: https://www.pexels.com/photo/bearded-man-using-virtual-reality-glasses-6848112/
  vrCover: {
    id: "6848112",
    alt: "Man wearing a VR headset lit by red and blue light",
    credit: "Atlantic Ambience",
    source: "https://www.pexels.com/photo/bearded-man-using-virtual-reality-glasses-6848112/",
  },
  // Photo by Eren Li on Pexels: https://www.pexels.com/photo/male-experiencing-virtual-reality-headset-on-street-7241583/
  vrControllers: {
    id: "7241583",
    alt: "Person using a VR headset with motion controllers",
    credit: "Eren Li",
    source: "https://www.pexels.com/photo/male-experiencing-virtual-reality-headset-on-street-7241583/",
  },
  // Photo by SHVETS production on Pexels: https://www.pexels.com/photo/a-man-using-a-vr-goggles-7562358/
  vrHands: {
    id: "7562358",
    alt: "Person in a VR headset reaching out with both hands",
    credit: "SHVETS production",
    source: "https://www.pexels.com/photo/a-man-using-a-vr-goggles-7562358/",
  },
  // Portfolio: Brand Design System
  // Photo by Egor Komarov on Pexels: https://www.pexels.com/photo/photo-of-a-laptop-screen-17279854/
  designCover: {
    id: "17279854",
    alt: "Laptop showing a dark interface with charts and controls",
    credit: "Egor Komarov",
    source: "https://www.pexels.com/photo/photo-of-a-laptop-screen-17279854/",
  },
  // Photo by Peter Olexa on Pexels: https://www.pexels.com/photo/palette-of-colors-14299950/
  designPalette: {
    id: "14299950",
    alt: "Fanned color palette cards",
    credit: "Peter Olexa",
    source: "https://www.pexels.com/photo/palette-of-colors-14299950/",
  },
  // Photo by Akshar Dave🌻 on Pexels: https://www.pexels.com/photo/a-person-holding-black-smartphone-11780441/
  designWireframe: {
    id: "11780441",
    alt: "Hand holding a phone prototype over paper wireframes",
    credit: "Akshar Dave\ud83c\udf3b",
    source: "https://www.pexels.com/photo/a-person-holding-black-smartphone-11780441/",
  },
};
