import { prisma } from "@/lib/prisma";


/*
Aqui tem a versão antiga de "getSettingsColors"
export const getSettingsColors = async () => {
  return prisma.settings_colors.findMany({
    select: {
      name: true,
      value: true,
    },
  });
};
*/

export const getSettingsColors = async () => {
  const rows = await prisma.settings_colors.findMany();
  return rows.map((settings) => ({
    ...settings,
    calc_color: settings.calc_color.map(c => c ? c.toNumber() : null)
  }));
};

export type ColorsDBTypes = Awaited<ReturnType<typeof getSettingsColors>>[number];


export const getSettings = async () => prisma.settings.findMany();
