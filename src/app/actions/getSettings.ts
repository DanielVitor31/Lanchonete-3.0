import { prisma } from "@/lib/prisma";




export const getSettingsColors = async () => {
  return prisma.settings_colors.findMany({
    select: {
      name: true,
      value: true,
    },
  });
};

export const getSettings = async () =>  prisma.settings.findMany();
