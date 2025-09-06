import { create } from "zustand";

const initialPages = ["About", "Portfolio", "Skills", "Contact"];
const intialIntroVisibleState = true;

export const useStore = create((set) => ({
  openedPages: initialPages,
  introIsVisible: intialIntroVisibleState,
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
