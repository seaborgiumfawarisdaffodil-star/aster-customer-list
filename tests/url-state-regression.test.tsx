import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useCustomerFilters } from "../src/hooks/useCustomerFilters";
import { DEFAULT_FILTERS } from "../src/data/filters";

describe("URL filter persistance", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  const mount = () => renderHook(() => useCustomerFilters());
  const activeNorth = {
    status: "active",
    region: "north",
    search: "",
  };

  it("restores a shared direct link", () => {
    window.history.replaceState({}, "", "/?status=active&region=north");
    const { result } = mount();
    expect(result.current.filters).toEqual(activeNorth);
  });

  it("restroe filters after a refresh remount", () => {
    window.history.replaceState({}, "", "/?status=active&region=north");
    const first = mount();
    first.unmount();
    const second = mount();
    expect(second.result.current.filters).toEqual(activeNorth);
  });

  it("restore state on browser history navigation", () => {
    const { result } = mount();
    act(() => result.current.updateFilters({ status: "active" }));
    const previousUrl = window.location.pathname + window.location.search;
    act(() => result.current.updateFilters({ region: "north" }));

    act(() => {
      window.history.replaceState({}, "", previousUrl);
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(result.current.filters).toEqual({
      status: "active",
      region: "all",
      search: "",
    });
  });
  it("clears status, region, search and URL", () => {
    const { result } = mount();
    act(() =>
      result.current.updateFilters({
        status: "active",
        region: "north",
        search: "Avery",
      }),
    );
    act(() => result.current.clearFilters());
    expect(result.current.filters).toEqual(DEFAULT_FILTERS);
    expect(window.location.search).toBe("");
  });
});
