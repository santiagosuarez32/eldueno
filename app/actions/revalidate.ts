"use server";

import { revalidatePath } from "next/cache";

export async function revalidateProperties() {
  revalidatePath("/");
  revalidatePath("/propiedades");
  revalidatePath("/propiedades/[id]");
}
