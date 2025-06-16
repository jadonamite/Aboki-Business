import { SignUpForm } from "../../components/auth";
import Head from "next/head";

export default function SignUpPage() {
   return (
      <>
         <Head>
            <title>Sign Up - Aboki</title>
            <meta
               name="description"
               content="Create your Aboki account and empower your crypto business"
            />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <SignUpForm />
      </>
   );
}
