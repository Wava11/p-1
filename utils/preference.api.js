
export const updateUserPreferences = async (username, preferences) =>
    fetch(
        `/api/users/${username}/preferences`, {
        body: JSON.stringify(preferences),
        method: 'POST'
    });


export const getUserPreferences = async (username) => {
    const response = await fetch(`/api/users/${username}/preferences`);
    if (response.status == 200) {
        const responseJson = await response.json();
        console.log("status 200");
        return responseJson;
    } else {
        console.log("status not 200");
        return [];
    }
};