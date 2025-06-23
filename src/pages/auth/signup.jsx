import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import with SSR disabled
const SignUpForm = dynamic(() => import("../../components/auth/SignUpForm"), {
   ssr: false,
   loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Setting up...</p>
         </div>
      </div>
   ),
});

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
            <link rel="icon" href="/assets/icons/abokiicon.svg" />
         </Head>
         <SignUpForm />
      </>
   );
}
