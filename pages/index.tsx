import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const sesion = await getSession(context);

  if (!sesion) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  return (
    <>
      <h1
        className="
        text-blue-500
        font-bold
        text-5xl
        "
      >
        Netflix Clone
      </h1>

      <button onClick={() => signOut()} className="bg-red-500 h-10 px-5 ">
        Logout
      </button>
    </>
  );
}
