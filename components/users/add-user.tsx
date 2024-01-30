import React, { useState } from "react";
import {
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Textarea,
  ModalContent,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { Controller, Form, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER } from "@/graphql/mutations";
import { GET_USERS } from "@/graphql/queries";
import { content } from "./content";

export const AddUser = (props: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectDefault, setSelectDefault] = useState({});
  // const { data, loading, error } = useQuery(GET_USER, {
  //   variables: { id: props.id },
  // });

  const [createUser] = useMutation(CREATE_USER, {
    variables: {},
    refetchQueries: [{ query: GET_USERS, variables: { role: ["ADMIN", "EMPLOYEE"] } }],
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onCreateUser = async (data: any, event: any) => {
    // Extract the 'name' value from the form data
    const { email, password, role } = data;

    // Check if 'name' is empty before calling createUser
    if (email === "") {
      toast.error("Please enter email");
      return;
    } else if (password === "") {
      toast.error("Please enter password");
      return;
    } else if (role === "") {
      toast.error("Please enter role");
      return;
    }

    try {
      // Call your mutation or any other logic here
      await createUser({ variables: { input: { ...data } } });
      console.log("data", data);

      onOpenChange();
      initValues();

      toast.success("Амжилттай үүсгэлээ");
    } catch (err) {
      console.error(err); // Handle error appropriately
    }
  };

  const initValues = () => {
    reset({
      email: "",
      name: "",
      password: "",
      phone: "",
      address: "",
      birthday: "",
      gender: "",
      role: "",
    });
  };

  type FormItemType = "input" | "email" | "number" | "password" | "textarea" | "select" | "date" | string;

  interface FormItemProps {
    type: FormItemType;
    name: string;
    label: string;
    placeholder?: string;
    control: any;
    dtsrc?: { name: string; label: string }[];
  }

  const getFormItem = ({ type, name, label, placeholder, control, dtsrc }: FormItemProps): React.ReactElement => {
    switch (type) {
      case "input":
      case "email":
      case "number":
      case "password":
        return (
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input type={type} value={value} onChange={onChange} label={label} placeholder={placeholder} />
            )}
            key={name}
          />
        );
      case "textarea":
        return (
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Textarea value={value} onChange={onChange} label={label} placeholder={placeholder} />
            )}
            key={name}
          />
        );
      // case "select":
      //   return (
      //     <Select
      //       {...register("name")}
      //       isRequired
      //       label={label}
      //       className="w-full"
      //       selectedKeys={new Set([selectDefault[name] + ""])}
      //       onSelectionChange={(val) => {
      //         setSelectDefault({
      //           ...selectDefault,
      //           [name]: Array.from(val)[0],
      //         });
      //       }}
      //     >
      //       {dtsrc?.map((dt: { name: string; label: string }) => {
      //         return (
      //           <SelectItem key={dt.name} value={dt.name}>
      //             {dt.label}
      //           </SelectItem>
      //         );
      //       })}
      //     </Select>
      //   );
      case "date":
        return (
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Input
                  value={value}
                  onChange={(e) => onChange(e.target.value.slice(0, 10))}
                  label={label}
                  type="date"
                  placeholder={placeholder}
                />
              );
            }}
            key={name}
          />
        );
      default:
        <></>;
    }
  };

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Add User
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            initValues();
          }}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Add User</ModalHeader>
                <ModalBody>
                  <Form onSubmit={handleSubmit(createUser)} control={control} className="flex flex-col gap-4">
                    {content.map((cnt) => {
                      return getFormItem({
                        type: cnt.type,
                        name: cnt.name,
                        label: cnt.label,
                        placeholder: cnt.placeholder,
                        control: control,
                        dtsrc: cnt.dtsrc,
                      });
                    })}
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    // disabled={loading}
                    onPress={handleSubmit(createUser)}
                  >
                    {/* {loading ? "Adding..." : "Add User"} */}
                    Add User
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
