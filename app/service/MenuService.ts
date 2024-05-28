import ihttp from "../utils/xhttp";

export const getMenuSidebar = async () => {
    try {
        const response = await ihttp.post(`/menu/doc_menu_home_r01`);
        return response.data?.rec;
    } catch (error) {
        return error;
    }
}

