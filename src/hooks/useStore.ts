import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Utilities
import type { AppDispatch, RootState } from "@store";

// NOTE: Use custom hooks instead of plain `useDispatch` and `useSelector`

/**
 * Redux dispatch helper (typed)
 *
 * @returns Redux dispatcher
 */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

/**
 * Redux selector helper (typed)
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
