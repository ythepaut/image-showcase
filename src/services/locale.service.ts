"use server";

import { defaultLocale } from "../config";

export async function getUserLocale() {
  return defaultLocale;
}
