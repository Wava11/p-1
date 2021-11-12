
export const submitPreferences = (preferences) =>
    fetch(
        "/api/preferences", {
        body: JSON.stringify(preferences),
        method: 'POST'
    });