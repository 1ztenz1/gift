/** Editorial copy: FAQ, reviews, process and the gallery grid. */

export const faqs: { q: string; a: string; group: string }[] = [
  {
    group: "Ordering",
    q: "How do I place an order?",
    a: "Build your gift on the product page, add it to the bag, then hit Send on WhatsApp. That opens a chat with your full order already written out. Afni confirms availability, shares the payment details and starts work.",
  },
  {
    group: "Ordering",
    q: "Why does checkout go to WhatsApp instead of a card payment?",
    a: "Almost every order needs a short conversation first — a photo to work from, a colour to confirm, a delivery date to hit. Doing that on WhatsApp is faster than a form, and it means nothing is made before the details are right. Online payment is coming later this year.",
  },
  {
    group: "Ordering",
    q: "Is there a minimum order?",
    a: "Only on invitation cards, which start at twenty pieces so the batch stays consistent. Everything else can be ordered as a single piece.",
  },
  {
    group: "Ordering",
    q: "Can I order in bulk for a company or an event?",
    a: "Yes. Corporate hampers, wedding favours and event stationery are regular work here. From ten pieces the pricing changes, so message on WhatsApp with your quantity and budget and you will get a quote the same day.",
  },
  {
    group: "Customising",
    q: "The price changed when I picked an option. Is that the final price?",
    a: "The figure you see on the product page is what you pay for the gift itself, and it updates live as you choose. Delivery is added separately once the address is known, because it depends on weight and distance.",
  },
  {
    group: "Customising",
    q: "Can I ask for something that isn't on the site?",
    a: "That is most of what happens here. Use the Custom Order page to describe what you have in mind, or send a reference picture on WhatsApp. If it can be made by hand, it is probably possible.",
  },
  {
    group: "Customising",
    q: "How do I send my photographs?",
    a: "Place the order first, then send the images on WhatsApp to the same chat. Send the original file rather than a screenshot — print quality depends on it.",
  },
  {
    group: "Delivery",
    q: "How long will my order take?",
    a: "Each product page carries its own lead time, from two days for a bouquet to around eighteen for a bridal dupatta. Wedding season runs long, so book early. If you have a fixed date, say so up front and it will be worked around.",
  },
  {
    group: "Delivery",
    q: "Where do you deliver?",
    a: "All across India by courier, packed in padded boxes and tracked. Within Kerala, hand delivery can be arranged for fragile pieces and anything with fresh flowers.",
  },
  {
    group: "Delivery",
    q: "Can you deliver straight to the person receiving the gift?",
    a: "Yes, and it is done often. Give their address and a note, and the invoice is left out of the parcel so the gift arrives without a price on it.",
  },
  {
    group: "Care & returns",
    q: "Can I cancel or change my order?",
    a: "Freely, until work begins — usually within 24 hours of confirming. After that, personalised pieces cannot be cancelled, because a name has already been cut, lettered or embroidered.",
  },
  {
    group: "Care & returns",
    q: "What if it arrives damaged?",
    a: "Send photographs of the parcel and the piece on WhatsApp within 48 hours of delivery, and it will be remade or refunded. Courier damage is on the studio, not on you.",
  },
  {
    group: "Care & returns",
    q: "How do I look after a paper bouquet or a quilled frame?",
    a: "Keep both out of direct sunlight and away from damp. Dust the quilling with a soft dry brush. Paper roses can be reshaped with your fingers if they get squashed in transit.",
  },
];

export const testimonials: {
  name: string;
  location: string;
  body: string;
  product: string;
  rating: number;
}[] = [
  {
    name: "Rithika M.",
    location: "Kochi",
    body: "I ordered the shadow box for my parents' 25th and cried before they did. The detail in the cut layers is not something you can see properly in photos.",
    product: "Memory Shadow Box",
    rating: 5,
  },
  {
    name: "Fathima A.",
    location: "Kozhikode",
    body: "My nikkah nama is framed in the hall and every single person who visits asks about it. Afni got the Arabic lettering exactly right.",
    product: "Personalised Nikkah Nama",
    rating: 5,
  },
  {
    name: "Arjun P.",
    location: "Bengaluru",
    body: "Sent the 24-rose bouquet to Kerala from Bengaluru for an anniversary. Arrived on the day, nothing crushed, and it still looks new a year later.",
    product: "Velvet Rose Bouquet",
    rating: 5,
  },
  {
    name: "Sneha R.",
    location: "Thrissur",
    body: "Ordered forty invitation cards. The proof came back in two days and she changed the font twice without once making me feel like a nuisance.",
    product: "Handmade Invitation Card",
    rating: 5,
  },
  {
    name: "Nithin K.",
    location: "Thiruvananthapuram",
    body: "The chocolate bouquet was for my sister's result day. Whole family attacked it. Ordering again for Onam.",
    product: "Chocolate Bouquet",
    rating: 4,
  },
  {
    name: "Ayesha S.",
    location: "Malappuram",
    body: "My dupatta had my name worked into the border in Arabic. Fourteen days from order to delivery, right in the middle of wedding season.",
    product: "Hand-Embellished Bridal Dupatta",
    rating: 5,
  },
];

export const processSteps: { title: string; body: string }[] = [
  {
    title: "Choose and customise",
    body: "Pick a piece and build it on the product page — size, colours, extras, the message. The price updates as you go, so there is never a surprise at the end.",
  },
  {
    title: "Send it on WhatsApp",
    body: "Your bag becomes a written order in a WhatsApp chat. Afni confirms availability, the delivery date and the total, then shares payment details.",
  },
  {
    title: "Made by hand",
    body: "Work starts once payment is confirmed. Progress photos come through the same chat, and nothing is dispatched before you have seen it.",
  },
  {
    title: "Packed and sent",
    body: "Everything is padded, boxed and tracked. Fragile pieces within Kerala are hand delivered. Invoices are left out of gift parcels.",
  },
];

/** Gallery tiles. `span` drives the masonry layout. */
export const galleryItems: {
  id: string;
  caption: string;
  category: string;
  span: "tall" | "wide" | "square";
  motif:
    | "hamper"
    | "bouquet"
    | "chocolate"
    | "frame"
    | "shadowbox"
    | "dupatta"
    | "scroll"
    | "envelope"
    | "digital";
}[] = [
  { id: "g1", caption: "Grand hamper in midnight & gold", category: "Hampers", span: "tall", motif: "hamper" },
  { id: "g2", caption: "Fifty crimson roses, proposal size", category: "Bouquets", span: "square", motif: "bouquet" },
  { id: "g3", caption: "Nikkah nama, hand-gilded border", category: "Wedding", span: "wide", motif: "scroll" },
  { id: "g4", caption: "A3 shadow box with LED backlight", category: "Frames", span: "square", motif: "shadowbox" },
  { id: "g5", caption: "Christmas hamper with door wreath", category: "Hampers", span: "square", motif: "hamper" },
  { id: "g6", caption: "Bridal dupatta in deep maroon", category: "Wedding", span: "tall", motif: "dupatta" },
  { id: "g7", caption: "Chocolate bouquet, large", category: "Bouquets", span: "square", motif: "chocolate" },
  { id: "g8", caption: "Deckle-edge invitations with wax seals", category: "Wedding", span: "wide", motif: "envelope" },
  { id: "g9", caption: "Quilled name frame in jewel tones", category: "Frames", span: "square", motif: "frame" },
  { id: "g10", caption: "Botanical save the date", category: "Digital", span: "square", motif: "digital" },
  { id: "g11", caption: "Money bouquet, 101 notes", category: "Bouquets", span: "tall", motif: "bouquet" },
  { id: "g12", caption: "Couple portrait in brushed gold", category: "Frames", span: "square", motif: "frame" },
];
