import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      {/* NOTE: Change password is to be done later */}
      {/* FIXME: implement change password according to BE */}
      {/* <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row> */}
    </>
  );
}

export default Account;
