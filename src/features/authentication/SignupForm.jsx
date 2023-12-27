import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useRegister } from "./useRegister";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { register: registerHook, isRegistering } = useRegister();

  function onSubmit(data) {
    registerHook(data, {
      onSettled: () => reset(),
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="First name" error={errors?.firstName?.message}>
        <Input
          type="text"
          id="firstName"
          disabled={isRegistering}
          {...register("firstName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Last name" error={errors?.lastName?.message}>
        <Input
          type="text"
          id="lastName"
          disabled={isRegistering}
          {...register("lastName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isRegistering}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Phone" error={errors?.phone?.message}>
        <Input
          type="text"
          id="phone"
          disabled={isRegistering}
          {...register("phone", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isRegistering}
          {...register("password", {
            required: "This field is required",
            minLength: { value: 8, message: "Password must of 8 characters" },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isRegistering}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={reset}
          variation="secondary"
          type="reset"
          disabled={isRegistering}
        >
          Cancel
        </Button>
        <Button disabled={isRegistering}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
