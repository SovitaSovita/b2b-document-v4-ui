// import { v4 as uuidv4 } from 'uuid';


// // Function to generate a new UUID
// export function generateUniqueId(): string {
//     return uuidv4();
// }

export function isEmpty(obj: object) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}