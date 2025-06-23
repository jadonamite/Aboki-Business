import { SignInForm } from "../../components/auth";
import Head from "next/head";

export default function SignInPage() {
   return (
      <>
         <Head>
            <title>Sign In - Aboki</title>
            <meta name="description" content="Sign in to your Aboki account" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/assets/icons/abokiicon.svg" />
         </Head>
         <SignInForm />
      </>
   );
}
