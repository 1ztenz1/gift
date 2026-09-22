import { site } from "./site";

/**
 * Starter policy copy. It reflects how the studio actually works, but the
 * owner should read it through and adjust before launch — these are the
 * terms customers will hold the business to.
 */

export type Policy = {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const policies: Policy[] = [
  {
    slug: "shipping",
    title: "Shipping & delivery",
    summary:
      "How long things take, what they cost to send, and what happens if a parcel goes missing.",
    updated: "September 2026",
    sections: [
      {
        heading: "Lead times",
        paragraphs: [
          "Every product page carries its own lead time, and it starts from the day payment is confirmed — not the day the order is placed. A bouquet takes two to three days. A bridal dupatta takes fourteen to eighteen. Personalised pieces that need a proof approved start their clock once you have approved it.",
          "Wedding season and the weeks before Christmas run longer than usual. If you have a fixed date, say so in the first message and you will be told honestly whether it can be met.",
        ],
      },
      {
        heading: "Delivery charges",
        paragraphs: [
          `Delivery is quoted separately once the address is known, because it depends on weight, size and distance. You will always see the figure and agree to it before paying. Orders over ₹3,000 ship free anywhere in India.`,
          `Within ${site.location}, fragile pieces and anything containing fresh flowers can be hand delivered instead of couriered. There is no charge for this in nearby towns.`,
        ],
      },
      {
        heading: "Tracking",
        paragraphs: [
          "A tracking number is sent on WhatsApp the moment a parcel is handed to the courier. If tracking has not updated for more than 48 hours, message and it will be chased from this end.",
        ],
      },
      {
        heading: "Sending directly to the recipient",
        paragraphs: [
          "Orders can be sent straight to the person receiving the gift. Tick the box at checkout and give their address. The invoice is left out of the parcel, so the gift arrives without a price on it, and a handwritten note can be included at no extra cost.",
        ],
      },
      {
        heading: "If something goes wrong in transit",
        paragraphs: [
          "Courier damage is the studio's problem, not yours. Send photographs of the outer parcel and the piece itself within 48 hours of delivery and it will be remade or refunded in full.",
          "Parcels marked delivered but not received are traced with the courier before anything is remade. This usually takes two to three working days.",
        ],
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns & cancellations",
    summary:
      "What can be cancelled, what cannot, and how refunds are handled on handmade work.",
    updated: "September 2026",
    sections: [
      {
        heading: "Cancelling before work starts",
        paragraphs: [
          "An order can be cancelled for a full refund at any point before work begins — in practice, within about 24 hours of confirming. Just say so on WhatsApp. Refunds go back the way the payment came, usually within three working days.",
        ],
      },
      {
        heading: "Once work has started",
        paragraphs: [
          "Personalised pieces cannot be cancelled after work begins, because a name has already been cut, lettered, quilled or embroidered and it cannot be sold to anyone else. This applies to name frames, nikkah nama, bridal dupattas, invitation batches and anything with a custom message.",
          "Non-personalised items can be cancelled up to the day before dispatch, minus the cost of any perishable contents already bought for your order.",
        ],
      },
      {
        heading: "If it arrives damaged or wrong",
        paragraphs: [
          "Photograph it and send the pictures within 48 hours of delivery. If it was damaged in transit, made incorrectly, or does not match what was agreed, it will be remade or refunded in full — your choice, and there is no charge for return postage.",
          "Because everything is handmade, small variations in colour, coil placement and finish are part of the work rather than a fault. Screens also render colours differently to paper and fabric.",
        ],
      },
      {
        heading: "Perishables",
        paragraphs: [
          "Hampers containing chocolate, cake or fresh flowers cannot be returned once delivered unless they arrived damaged or spoiled. Chocolate ships with a cold pack through the summer, but in extreme heat some softening is unavoidable.",
        ],
      },
      {
        heading: "How to start a return",
        paragraphs: [
          `Message ${site.whatsapp.display} on WhatsApp with your order details and photographs, or email ${site.email}. Every case is read by Afni personally.`,
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy policy",
    summary:
      "What this website collects, what the studio keeps, and who else sees it.",
    updated: "September 2026",
    sections: [
      {
        heading: "What this website stores",
        paragraphs: [
          "This site has no accounts, no logins and no server-side database. What you put in your bag is stored in your own browser using localStorage, so it is still there when you come back. It never leaves your device until you choose to send it.",
          "The forms on this site do not submit anywhere. They assemble a message and hand it to WhatsApp or your email app, and you decide whether to send it.",
        ],
      },
      {
        heading: "What the studio keeps",
        paragraphs: [
          "Once you send an order, the studio holds what you sent: your name, phone number, delivery address, any photographs you shared for the work, and the conversation itself. This is kept for as long as it is needed to make and deliver your order, and to handle any problem afterwards.",
          "Photographs you send for shadow boxes and portraits are used only for your piece. They are never posted publicly without asking you first, and they are deleted on request.",
        ],
      },
      {
        heading: "Who else sees your details",
        paragraphs: [
          "Couriers are given the delivery name, address and phone number, because they cannot deliver without them. Payment details are handled by your bank or UPI app and are never seen by the studio.",
          "Nothing is sold, rented or shared with advertisers. There is no marketing list unless you ask to be added to one.",
        ],
      },
      {
        heading: "WhatsApp and Instagram",
        paragraphs: [
          "Conversations on WhatsApp and Instagram are subject to Meta's own privacy terms, which are outside the studio's control. If you would rather not use either, email works just as well.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          `Ask at ${site.email} and you will be told what is held about you, have it corrected, or have it deleted. Requests are handled within seven days.`,
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of service",
    summary: "The agreement between you and the studio when you place an order.",
    updated: "September 2026",
    sections: [
      {
        heading: "Orders and prices",
        paragraphs: [
          "Prices shown on this site are for the gift itself and update live as you customise. Delivery is quoted separately. Prices may change over time, but the price agreed on WhatsApp is the price you pay for that order.",
          "An order becomes binding once it has been confirmed on WhatsApp and payment has been received. Until then, nothing is reserved and nothing is charged.",
        ],
      },
      {
        heading: "Handmade work",
        paragraphs: [
          "Everything sold here is made by hand, so no two pieces are identical. Slight differences in colour, placement and finish are expected and are not defects. Photographs on this site are a guide to style, not an exact specification.",
          "Where a product depends on seasonal stock — chocolate brands, flower varieties — the closest available equivalent is used, and you are told before dispatch if the difference is significant.",
        ],
      },
      {
        heading: "What you provide",
        paragraphs: [
          "If you send photographs, names, dates or text to be used in a piece, you confirm you have the right to use them. Check spellings carefully: work is made from exactly what you send, and re-making a piece because of a typo in the original brief is chargeable.",
          "Proofs are shared for approval on anything lettered or printed. Once you approve a proof, the batch is made from it.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Designs, illustrations and photographs created by the studio remain the studio's property. Commissioned work may be shown in the gallery and on Instagram unless you ask for it to be kept private — just say so when ordering.",
        ],
      },
      {
        heading: "Limits",
        paragraphs: [
          "The studio's liability for any order is limited to the amount paid for that order. Delays caused by couriers, weather or circumstances outside the studio's control are not grounds for compensation beyond a refund of the delivery charge.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of India, and any dispute falls under the jurisdiction of the courts of Kerala.",
        ],
      },
    ],
  },
];

export const getPolicy = (slug: string) =>
  policies.find((policy) => policy.slug === slug);
