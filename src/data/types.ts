/** Shape of the catalogue. Swapping the data source later means matching these types. */

export type Motif =
  | "hamper"
  | "bouquet"
  | "chocolate"
  | "frame"
  | "shadowbox"
  | "dupatta"
  | "scroll"
  | "envelope"
  | "digital";

export type OptionChoice = {
  id: string;
  label: string;
  /** Added to the unit price when selected. May be negative. */
  priceDelta: number;
  hint?: string;
  /** Hex colour — renders the choice as a swatch instead of a chip. */
  swatch?: string;
  soldOut?: boolean;
};

export type OptionGroup =
  | {
      id: string;
      type: "radio" | "swatch";
      label: string;
      helper?: string;
      choices: OptionChoice[];
      /** id of the choice selected on first load. */
      defaultChoice: string;
    }
  | {
      id: string;
      type: "addon";
      label: string;
      helper?: string;
      choices: OptionChoice[];
      /** ids checked on first load. */
      defaultChoices?: string[];
    }
  | {
      id: string;
      type: "text";
      label: string;
      helper?: string;
      placeholder: string;
      maxLength: number;
      /** Charged once when the field is filled in. */
      priceDelta: number;
      required?: boolean;
    };

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  motif: Motif;
  tagline: string;
  /** Unit price before any options, in whole rupees. */
  basePrice: number;
  /** Struck-through reference price. Omit when there is no discount. */
  compareAtPrice?: number;
  description: string;
  details: string[];
  leadTime: string;
  occasions: OccasionId[];
  optionGroups: OptionGroup[];
  /** Real photography, once available. Empty renders the illustrated tile. */
  images: string[];
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  rating: number;
  reviewCount: number;
  /** Minimum order quantity — invitation cards and similar are sold in sets. */
  minQuantity?: number;
};

export type CategoryId =
  | "hampers"
  | "bouquets"
  | "frames"
  | "wedding"
  | "digital";

export type OccasionId =
  | "birthday"
  | "anniversary"
  | "wedding"
  | "christmas"
  | "valentines"
  | "newborn"
  | "graduation"
  | "thank-you";
