"use client"
import Front from "@/app/userflow/Front";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Create a script element for Tawk.to
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/673460094304e3196ae1c3b9/1ici9e9t9";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    // Append the script to the body
    document.body.appendChild(script);

  }, []);

  return (
    <>
      <Front />
    </>
  );
}
