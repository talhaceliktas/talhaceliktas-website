import { create } from "zustand";

import {
  pages as initialPages,
  introIsVisible as intialIntroVisibleState,
  IDEisFullScreen as initialIDEFullScreenState,
} from "@/app/_utils/constants";

export const useStore = create((set) => ({
  openedPages: initialPages,
  introIsVisible: intialIntroVisibleState,
  ideIsFullScreen: initialIDEFullScreenState,
  changeIdeIsFullScreen: () =>
    set((state) => ({ ideIsFullScreen: !state.ideIsFullScreen })),
  resetOpenedPages: () => set(() => ({ openedPages: initialPages })),
  setIntroIsVisible: (value) => set(() => ({ introIsVisible: value })),
  addPage: (page) =>
    set((state) => {
      const pageLower = page.toLowerCase();

      if (state.openedPages.some((p) => p.toLowerCase() === pageLower)) {
        return state;
      }

      const formattedPage =
        pageLower.charAt(0).toUpperCase() + pageLower.slice(1);

      return { openedPages: [...state.openedPages, formattedPage] };
    }),
  removePage: (page, cb) =>
    set((state) => {
      const remaining = state.openedPages.filter(
        (p) => p.toLowerCase() !== page.toLowerCase(),
      );
      if (cb) cb(remaining);
      return { openedPages: remaining };
    }),
}));
