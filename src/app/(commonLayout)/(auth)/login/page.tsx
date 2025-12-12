/* eslint-disable @typescript-eslint/no-explicit-any */
import LoginForm from "@/components/LoginForm"; 

const LoginPage =async ({searchParams}:{searchParams:any}) => {
  const params = await searchParams
  
  return (
    <div className="flex min-h-screen items-center justify-center flex-col my-10">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm redirect={params.redirect}/>
      </div>
      <div className="bg-gray-50 shadow py-3 px-10 space-x-1 mt-7 rounded-3xl">
        <p>user: user@gmail.com</p>
        <p>user: host@gmail.com</p>
        <p>user: admin@gmail.com</p>
        <p>pass: 123456</p>
      </div>
    </div>
  );
};

export default LoginPage;
