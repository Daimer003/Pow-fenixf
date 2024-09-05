import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect } from "react";

const AuthChecker: FC<PropsWithChildren> = ({children}) => {

    const { data: session} = useSession();
    const router = useRouter()

    useEffect(()=> {
        //@ts-ignore
        if(!session || session && !session.isValidUser){
            router.push("/");
        }
    },[session])

    return (
        <>{children}</>
    );
}

export default AuthChecker; 