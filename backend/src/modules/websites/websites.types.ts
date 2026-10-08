import type { Types } from "mongoose";
import type {
  WebsiteDocument,
  WebsiteStatus,
  WebsiteTheme,
} from "./websites.model.js";

export interface PublicWebsite {
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  slug: string;
  publicId: string;
  subscriptionId: string;
  status: WebsiteStatus;
  theme: WebsiteTheme;
  settings: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export function toPublicWebsite(doc: WebsiteDocument): PublicWebsite {
  return {
    id: doc._id.toString(),
    workspaceId: doc.workspaceId.toString(),
    name: doc.name,
    description: doc.description ?? null,
    slug: doc.slug,
    publicId: doc.publicId ?? "",
    subscriptionId: doc.subscriptionId ?? "",
    status: doc.status,
    theme: (doc.theme as WebsiteTheme) ?? {},
    settings: (doc.settings as Record<string, unknown>) ?? {},
    createdAt: doc.createdAt ?? new Date(),
    updatedAt: doc.updatedAt ?? new Date(),
  };
}

export function toPublicWebsiteFromLean(doc: {
  _id: Types.ObjectId;
  workspaceId: Types.ObjectId;
  name: string;
  description?: string | null;
  slug: string;
  publicId?: string;
  subscriptionId?: string;
  status: WebsiteStatus;
  theme?: WebsiteTheme;
  settings?: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}): PublicWebsite {
  return {
    id: doc._id.toString(),
    workspaceId: doc.workspaceId.toString(),
    name: doc.name,
    description: doc.description ?? null,
    slug: doc.slug,
    publicId: doc.publicId ?? "",
    subscriptionId: doc.subscriptionId ?? "",
    status: doc.status,
    theme: doc.theme ?? {},
    settings: doc.settings ?? {},
    createdAt: doc.createdAt ?? new Date(),
    updatedAt: doc.updatedAt ?? new Date(),
  };
}

export type { WebsiteStatus };
