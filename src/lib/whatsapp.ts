import { site } from "@/data/site";
import { formatPrice } from "./format";
import type { ResolvedItem } from "./cart";

const BASE = `https://wa.me/${site.whatsapp.number}`;

/** wa.me carries the draft message in `text`, URL-encoded. */
export const whatsappLink = (message: string) =>
  `${BASE}?text=${encodeURIComponent(message)}`;

/** Opens WhatsApp with no draft — used by the floating button. */
export const whatsappHello = (context?: string) =>
  whatsappLink(
    context
      ? `Hi Afni! I saw ${context} on your website and I have a question.`
      : `Hi Afni! I found you through your website and I have a question.`,
  );

export type CheckoutDetails = {
  name: string;
  phone: string;
  city: string;
  deliveryDate?: string;
  notes?: string;
  giftWrapNote?: string;
  deliverToRecipient: boolean;
  recipientName?: string;
  recipientAddress?: string;
};

const line = (label: string, value?: string) =>
  value && value.trim() ? `${label}: ${value.trim()}` : null;

/** The whole bag, written out as a message Afni can work straight from. */
export const buildOrderMessage = (
  items: ResolvedItem[],
  subtotal: number,
  details: CheckoutDetails,
): string => {
  const parts: string[] = [
    `*New order from ${site.name} website*`,
    "",
    `*Customer*`,
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `City: ${details.city}`,
  ];

  if (details.deliverToRecipient) {
    parts.push(
      "",
      `*Deliver directly to*`,
      details.recipientName ? `Name: ${details.recipientName}` : "Name: (to follow)",
      details.recipientAddress
        ? `Address: ${details.recipientAddress}`
        : "Address: (to follow)",
      "Please leave the invoice out of the parcel.",
    );
  }

  parts.push("", `*Order*`);

  items.forEach((item, index) => {
    parts.push(
      "",
      `${index + 1}. ${item.product.name} × ${item.price.quantity}`,
    );

    for (const priceLine of item.price.lines) {
      const amount =
        priceLine.amount === 0 ? "" : ` (${formatPrice(priceLine.amount)})`;
      parts.push(`   • ${priceLine.groupLabel}: ${priceLine.value}${amount}`);
    }

    parts.push(
      `   Unit: ${formatPrice(item.price.unitPrice)}  |  Line total: ${formatPrice(item.price.total)}`,
    );
  });

  parts.push(
    "",
    `*Subtotal: ${formatPrice(subtotal)}*`,
    "_Delivery is quoted separately once the address is confirmed._",
  );

  const extras = [
    line("Preferred delivery date", details.deliveryDate),
    line("Gift wrap note", details.giftWrapNote),
    line("Notes", details.notes),
  ].filter(Boolean);

  if (extras.length) parts.push("", `*Extra details*`, ...(extras as string[]));

  return parts.join("\n");
};

/** Single-product enquiry from a product page, before anything is in the bag. */
export const buildEnquiryMessage = (
  productName: string,
  configuration: { label: string; value: string }[],
  total: string,
): string =>
  [
    `Hi Afni! I would like to order the *${productName}*.`,
    "",
    ...configuration.map((c) => `• ${c.label}: ${c.value}`),
    "",
    `Total as configured: ${total}`,
    "",
    "Is this available, and how soon could it reach me?",
  ].join("\n");

export type CustomOrderDetails = {
  name: string;
  phone: string;
  giftType: string;
  occasion: string;
  budget: string;
  deadline: string;
  quantity: string;
  brief: string;
};

export const buildCustomOrderMessage = (d: CustomOrderDetails): string =>
  [
    `*Custom order request — ${site.name} website*`,
    "",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Type of gift: ${d.giftType}`,
    `Occasion: ${d.occasion}`,
    `Quantity: ${d.quantity}`,
    `Budget: ${d.budget}`,
    `Needed by: ${d.deadline}`,
    "",
    `*What I have in mind*`,
    d.brief,
  ].join("\n");

export const mailtoLink = (subject: string, body: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
