import { act, renderHook } from "@testing-library/react";
import { beforeEach, expect, it } from "vitest";
import { useCustomerFilters } from "../src/hooks/useCustomerFilters";

beforeEach(() => history.replaceState(null, "", "/"));

it("direct link", () => {
  history.replaceState(null, "", "/?status=active&region=north");
  const { result } = renderHook(useCustomerFilters);
  expect(result.current.filters).toMatchObject({
    status: "active",
    region: "north",
  });
});

it("reresh", () => {
  history.replaceState(null, "", "/?q=Avery");
  const first = renderHook(useCustomerFilters);
  first.unmount();
  const second = renderHook(useCustomerFilters);
  expect(second.result.current.filters.search).toBe("Avery");
});

it("browser back check", () => {
  const { result } = renderHook(useCustomerFilters);
  act(() => result.current.updateFilters({ status: "active" }));
  history.replaceState(null, "", "/");
  act(() => window.dispatchEvent(new PopStateEvent("popstate")));
  expect(result.current.filters.status).toBe("all");
});

it("clear all filters", () => {
  const { result } = renderHook(useCustomerFilters);
  act(() =>
    result.current.updateFilters({
      status: "active",
      region: "north",
      search: "Avery",
    }),
  );
  act(() => result.current.clearFilters());
  expect(result.current.filters).toEqual({
    status: "all",
    region: "all",
    search: "",
  });
  expect(location.search).toBe("");
});
