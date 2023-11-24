import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
    return (
        <SignUp
            afterSignUpUrl="/new-user"
            redirectUrl="/new-user"
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
        />
    )
}

export default SignUpPage