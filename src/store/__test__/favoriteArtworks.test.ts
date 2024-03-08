// import { act, renderHook } from "@testing-library/react-hooks";
// import { createJSONStorage } from "zustand/middleware";
// import { useArtworkStore } from "../favoriteArtwork";
//
// // Mock the sessionStorage
// const sessionStorageMock = (() => {
//   let store: Record<string, string> = {};
//   return {
//     getItem(key: string) {
//       return store[key] ?? null;
//     },
//     setItem(key: string, value: string) {
//       store[key] = value;
//     },
//     removeItem(key: string) {
//       delete store[key];
//     },
//     clear() {
//       store = {};
//     },
//   };
// })();
//
// Object.defineProperty(window, "sessionStorage", {
//   value: sessionStorageMock,
// });
//
// // Mock the JSON storage to use the mock sessionStorage
// const storage = createJSONStorage(() => sessionStorageMock);
//
// describe("useArtworkStore", () => {
//   beforeEach(() => {
//     window.sessionStorage.clear();
//     useArtworkStore.setState({ artworks: [] }, true);
//   });
//
//   it("should add an artwork to the store", () => {
//     const { result } = renderHook(() => useArtworkStore());
//     const artwork = { id: 1, title: "Artwork 1", image_id: "image1" }; // Simplified mock based on schema
//
//     act(() => {
//       result.current.addArtwork(artwork);
//     });
//
//     expect(result.current.artworks).toEqual([
//       {
//         id: artwork.id,
//         title: artwork.title,
//         image_id: artwork.image_id,
//       },
//     ]);
//   });
//
//   it("should remove an artwork from the store", () => {
//     const { result } = renderHook(() => useArtworkStore());
//     const artwork = { id: 1, title: "Artwork 1", image_id: "image1" }; // Simplified mock based on schema
//
//     act(() => {
//       result.current.addArtwork(artwork);
//       result.current.removeArtwork(artwork.id);
//     });
//
//     expect(result.current.artworks).toEqual([]);
//   });
//
//   it("should check if an artwork is in favorites", () => {
//     const { result } = renderHook(() => useArtworkStore());
//     const artwork = { id: 1, title: "Artwork 1", image_id: "image1" }; // Simplified mock based on schema
//
//     act(() => {
//       result.current.addArtwork(artwork);
//     });
//
//     expect(result.current.isInFavorites(artwork.id)).toBe(true);
//     expect(result.current.isInFavorites(999)).toBe(false);
//   });
// });

import { renderHook } from "@testing-library/react-hooks";
import { type Artwork, useArtworkStore } from "../favoriteArtwork";

describe("useArtworkStore", () => {
  it("should add an artwork to the favorites list", () => {
    const { result } = renderHook(() => useArtworkStore());

    const artwork: Artwork = {
      id: 1,
      title: "Test Artwork",
      image_id: "test-image-id",
    };

    result.current.addArtwork(artwork);

    expect(result.current.isInFavorites(Number(artwork.id))).toBeTruthy();
  });

  it("should remove an artwork from the favorites list", () => {
    const { result } = renderHook(() => useArtworkStore());

    const artwork: Artwork = {
      id: 1,
      title: "Test Artwork",
      image_id: "test-image-id",
    };

    result.current.addArtwork(artwork);
    result.current.removeArtwork(Number(artwork.id));

    expect(result.current.isInFavorites(Number(artwork.id))).toBeFalsy();
  });
});
