import ihttp from "../utils/xhttp";


export const sampleFetch = () => {
    const res = ihttp.post("/admin/welcome", {});

    return res;
}