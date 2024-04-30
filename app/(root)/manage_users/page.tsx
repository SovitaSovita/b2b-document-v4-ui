import UserTable from "@/app/components/Manage_users/UserTable";
import { auth } from "@/app/lib/helper";



const page = () => {

  // const session = auth()
  // console.log({session});

  return (
    <>
      <UserTable/>
    </>
  );
};

export default page;





