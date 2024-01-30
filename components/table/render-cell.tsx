import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
// import { users } from "./data";

// interface Props {
//   user: (typeof users)[number];
//   columnKey: string | React.Key;
// }

export const RenderCell = ({ user, columnKey }: any) => {
  // @ts-ignore
  const cellValue = user[columnKey];
  switch (columnKey) {
    // case "name":
    //   return (
    //     <User
    //       avatarProps={{
    //         src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //       }}
    //       name={cellValue}
    //     >
    //       {user.email}
    //     </User>
    //   );
    case "role":
      return (
        <Chip size="sm" variant="flat" color={cellValue === "ADMIN" ? "success" : "warning"}>
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );
    case "gender":
      return (
        cellValue && (
          <Chip size="sm" variant="flat" color={cellValue === "MALE" ? "primary" : "secondary"}>
            <span className="capitalize text-xs">{cellValue}</span>
          </Chip>
        )
      );
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <div>
            <Tooltip content="Details">
              <button onClick={() => console.log("View user", user.id)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Edit user" color="secondary">
              <button onClick={() => console.log("Edit user", user.id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Delete user" color="danger" onClick={() => console.log("Delete user", user.id)}>
              <button>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return cellValue;
  }
};
