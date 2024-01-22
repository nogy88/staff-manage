import React from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Controller, Form, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER } from "@/graphql/mutations";
import { GET_USER } from "@/graphql/queries";

// Replace this with your actual mutation definition

export const AddUser = (props: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: props.id },
  });

  const [createUser] = useMutation(CREATE_USER, {
    variables: { name },
    // refetchQueries: [{ query: GET_USER, variables: { id } }],
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

  const onSubmit = (data: any) => {
    // if (name === "") return alert("Please enter author name");
    createUser({ variables: { ...data } });
  };

  // const handleSubmit = async (values) => {
  //   try {
  //     await createUser({ variables: values });
  //     onOpenChange(false); // Close modal on successful creation
  //   } catch (err) {
  //     console.error(err); // Handle error appropriately
  //   }
  // };

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Add User
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add User</ModalHeader>
                <ModalBody>
                  <Form onSubmit={handleSubmit}>
                    <Controller
                      name={"Email"}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Input value={value} onChange={onChange} label={"Email"} />
                      )}
                    />
                    <Input label="Email" name="email" required />
                    <Input label="First Name" name="firstName" required />
                    <Input label="Last Name" name="lastName" required />
                    <Input label="Phone Number" name="phoneNumber" required />
                    <Input label="Password" type="password" name="password" required />
                    <Input label="Confirm Password" type="password" name="confirmPassword" required />
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" disabled={loading} onPress={handleSubmit}>
                    {loading ? "Adding..." : "Add User"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
};
