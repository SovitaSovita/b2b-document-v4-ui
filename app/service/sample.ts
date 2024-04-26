import ihttp from "../utils/xhttp";


export const sampleFetch = () => {
    const res = ihttp.post("/articles/list", {
        "dep_id": "1"
    });

    return res;
}