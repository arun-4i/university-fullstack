import LoginForm from "@/components/login/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="min-w-72">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>Or</span>
          <p>Don&apos;t have an account? Signup</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
