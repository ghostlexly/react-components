# Exemple d'utilisation

```jsx
import { useRouter } from "next/router";
import SecurityCode from "../../../components/security-code/security-code";
import { useMemo, useState } from "react";
import LoadingDotsComponent from "../../../components/loading-dots";
import { useAuth, useAxios } from "../../../helpers/ghostlexly-auth";
import { toast } from "react-toastify";

export default function ConfirmLoginCodePhone() {
  const router = useRouter();
  const { phone } = router.query;
  const [loading, setLoading] = useState(false);
  const [sendSmsAgainLoading, setSendSmsAgainLoading] = useState(false);
  const [waitTimer, setWaitTimer] = useState(0);
  const api = useAxios();
  const { signIn } = useAuth();

  const handleComplete = (code) => {
    setLoading(true);

    signIn("/api/login", { phone: phone, password: code })
      .then((res) => {
        router.push("/company/colipays");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Ce code de sécurité est invalide, veuillez réessayer.");
      });
  };

  const sendSmsAgain = () => {
    setSendSmsAgainLoading(true);

    setWaitTimer(60);

    api
      .post("/api/register", { phone: phone })
      .then((res) => {
        toast.success("Un nouveau code vous a été envoyé.");
        setWaitTimer(60);
      })
      .catch((err) => {
        toast.error("Un problème est survenu, veuillez réessayer plus tard.");
      });
  };

  useMemo(() => {
    if (setSendSmsAgainLoading === false) return false;

    if (waitTimer > 0) {
      setTimeout(() => {
        setWaitTimer(waitTimer - 1);
      }, 1000);
    } else if (waitTimer === 0) {
      setSendSmsAgainLoading(false);
    }
  }, [waitTimer]);

  return (
    <>
      <section className="bg-white">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-center text-primary-700 lg:text-4xl">Authentification</h1>

          <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 text-justify">
            Afin de vous authentificer, veuillez saisir le code de sécurité reçu par SMS à votre numéro de téléphone{" "}
            <b className={"text-primary-600"}>+{phone}</b>.
          </p>

          {loading ? (
            <LoadingDotsComponent />
          ) : (
            <SecurityCode
              containerClassName={"text-center"}
              className={
                "max-w-[50px] md:max-w-[65px] p-2 rounded-none border border-r-0 border-primary-600 text-center text-lg focus-visible:outline-primary-600 first:rounded-l-xl last:rounded-r-xl last:border"
              }
              onComplete={handleComplete}
            />
          )}

          {waitTimer === 0 && sendSmsAgainLoading && (
            <div className={"mt-3"}>
              <LoadingDotsComponent height={30} width={30} />
            </div>
          )}

          {waitTimer === 0 && !sendSmsAgainLoading && (
            <div className={"mt-3 text-center text-xs text-gray-400 cursor-pointer"}>
              <p onClick={sendSmsAgain}>Renvoyer un code</p>
            </div>
          )}

          {waitTimer > 0 && (
            <p className={"mt-3 text-center text-xs text-gray-400"}>
              Veuillez patienter {waitTimer}s, avant de demander un nouveau code..
            </p>
          )}
        </div>
      </section>
    </>
  );
}
```
