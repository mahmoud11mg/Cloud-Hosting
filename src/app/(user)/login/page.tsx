import LoginForm from "./LoginForm"

const LoginPage = () => {
  return (
    <section className="fix-height container m-auto px-7 flex items-center  justify-center ">
      <div className="m-auto bg-white rounded-lg p-5 w-full md:w-2/3 mt-6" >
        <h1 className="text-3xl font-bold to-gray-800 mb-5 animate-bounce"> Log In</h1>
        <LoginForm />
      </div>


    </section>
  )
}

export default LoginPage