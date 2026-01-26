import { useEffect } from "react";

function AuthCallBack() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestToken = params.get("request_token");
    const approved = params.get("approved");

    console.log("Token:", requestToken);
    console.log("¿Aprobado?:", approved);

    if (approved == "true" && requestToken) {
    }
  }, []);

  return (
    <div>
      <p>Procesando autenticación...</p>
    </div>
  );
}
export default AuthCallBack;
