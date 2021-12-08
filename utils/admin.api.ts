export const authenticateAdmin = async (password: string): Promise<boolean> => {
    const response = await fetch(`/api/authenticate?password=${password}`);
    return response.status !== 403;
}