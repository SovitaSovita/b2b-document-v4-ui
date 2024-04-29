import exp from "constants";

export interface DepartmentList {
    dept_id    : number;
    dept_name   : String;
    dep_status : String;
    created_by : String;
    create_date: String;

}
export interface Department {
    rec : DepartmentList[];
}
