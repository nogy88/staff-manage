"use client";
import { useQuery } from "@apollo/client";
import { Column } from "@/global/interfaces";
import { CustomTable } from "@/components/table/table";
import { AddUser } from "./add-user";
import { GET_USERS } from "@/graphql/queries";

const columns: Column[] = [
  { name: "ID", uid: "id" },
  { name: "EMAIL", uid: "email" },
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "PHONE", uid: "phone" },
  { name: "GENDER", uid: "gender" },
  { name: "ACTIONS", uid: "actions" },
];

export const Users = () => {
  const { data, loading, error } = useQuery(GET_USERS, {
    variables: { role: ["ADMIN", "EMPLOYEE"] },
  });

  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex justify-between">
        <h3 className="text-xl font-semibold">All Users</h3>

        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddUser />
        </div>
      </ul>
      <CustomTable columns={columns} users={data?.users} />
    </div>
  );
};
