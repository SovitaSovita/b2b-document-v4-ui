import ihttp from "../utils/xhttp";


export const GetAllDepartmentId = async (id: number) => {
    try {
        const response = await ihttp.get(`/department/AllDepartment`);
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
}