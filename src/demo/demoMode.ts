// Demo mode is entered via `?demo=1` on the URL. It is read exactly once, at module
// load time, and cached here so its value stays stable for the whole session even if
// the URL is later mutated (e.g. by history APIs) by something else.
const demoModeEnabled: boolean = new URLSearchParams(window.location.search).get("demo") === "1";

export const isDemoMode = (): boolean => demoModeEnabled;

// Exits demo mode by navigating back to the real landing page. A full navigation (rather
// than history.replaceState) is used deliberately: it drops `?demo=1` and guarantees a
// clean reload with no leftover in-memory demo state.
export const exitDemo = (): void => {
    window.location.href = "/";
};
