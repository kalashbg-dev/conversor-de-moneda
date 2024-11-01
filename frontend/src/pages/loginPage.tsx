import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthStore } from '../context/auth.store'
import * as yup from 'yup'

type Input = {
  username: string
  password: string
}

const schema = yup
  .object({
    username: yup.string().required().min(3),
    password: yup.string().required().min(8),
  })
  .required()

function LoginPage() {
  // get the login function from the store
  const login = AuthStore((state) => state.login)
  const loginError = AuthStore((state) => state.error)

  // use the useForm hook to handle the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  console.log(import.meta.env.VITE_APP_API_URL)

  // handle the form submission
  const onSubmit: SubmitHandler<Input> = (data) => {
    login(data.username, data.password)
  }
  return (
    <div>
      <h1>Login Page</h1>
      {loginError?.message && <p>{loginError.message}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('username')} />
        <p>{errors.username?.message}</p>
        <input type="text" {...register('password')} />
        <p>{errors.password?.message}</p>
        <input type="submit" />
      </form>
    </div>
  )
}

export default LoginPage
