import { Navbar } from "../../Components";
import "./style.scss";
import { useState } from "react";
import { useWalletContext } from "../../Context/walletContext";

function Homepage() {
  const [password, setPassword] = useState("");
  const [walletName, setWalletName] = useState("");
  const [cardissuer, setCardIssuer] = useState("");
  const url: any =
    "https://seedcardmnemonicsgenerator-a9fd4fca1e25.herokuapp.com";

  const {
    url_qr,
    wallet_qr,
    xpub_qr,
    words,
    data,
    msg,
    // hidden_words,
    randomised_qr_words,
    randomise_fingerprint,
    // randomised_qr_words_img,
    result,
    wordqr,
    useFetchXpub,
    useFetchNewallet,
    useFetchRandomise,
    useFetchGenerateWalletQr,
    useFetchGenerateUrlQr,
    useFetchGenerateRandQrWords,
    useFetchWordqr,
  } = useWalletContext();

  const handleReload = () => {
    window.location.reload();
  };

  const GetWordqr = async () => {
    if (password == "" || cardissuer.length == 0)
      return alert("Password is required");
    await useFetchWordqr(`${url}/generateqr`, password, words);
  };

  const Getxpub = async () => {
    if (password == "" || cardissuer.length == 0)
      return alert("Password is required");
    await useFetchXpub(`${url}/xpub`, password);
  };
  const GenerateSeed = async () => {
    if (password == "" || cardissuer.length == 0)
      return alert("Password is required");
    await useFetchNewallet(`${url}/generatewallet`, password, words);
    console.log(data);
  };
  const Generateqr = async () => {
    if (password == "" || walletName.length != 16 || cardissuer.length == 0)
      return alert(
        "Password is required or wallet name should be 16 characters"
      );
    await useFetchGenerateWalletQr(
      `${url}/walletname_qr`,
      password,
      walletName
    );
  };

  const GetRandomise = async () => {
    if (password == "" || cardissuer.length == 0)
      return alert("Password is required");
    await useFetchRandomise(`${url}/randomise`, password, words);
  };

  const GetUrlQr = async () => {
    if (password == "" || cardissuer.length == 0)
      return alert(
        "Password is required or wallet name should be 16 characters"
      );
    await useFetchGenerateUrlQr(`${url}/url_qr`, password);
  };

  const GetRandomisedQrWords = async () => {
    if (password == "" || cardissuer.length == 0 || !randomise_fingerprint)
      return alert("Password is required");
    await useFetchGenerateRandQrWords(
      `${url}/op_return`,
      password,
      randomise_fingerprint,
      cardissuer,
      result
    );
    console.log({ randomised_qr_words: randomised_qr_words });
  };

  return (
    <div className="_homepage bg-black pb-10">
      <Navbar />
      <main className="main pt-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 _card_flex">
            <h1 className="text-white">ENTER CARD ISSUER</h1>
            <input
              onChange={(e) => setCardIssuer(e.target.value)}
              type="text"
              className="px-3 py-2 outline-none _card_iss"
              placeholder="XX"
            />
          </div>
          <div className="flex items-center gap-4 _card_flex">
            <h1 className="text-white">ENTER PASSWORD</h1>
            <input
              required
              type="text"
              placeholder="XXXXXX"
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 outline-none _card_iss"
            />
          </div>
        </div>

        {/* WALLET NAME */}
        <div className="flex items-center justify-between mt-8 _wallet_nme">
          <h1 className="text-white">ENTER CARD NAME</h1>
          <input
            type="text"
            placeholder="XX04A6787A4F1390"
            onChange={(e) => setWalletName(e.target.value)}
            className="px-3 py-2 outline-none _wallet_name"
          />
        </div>

        {/* XPUBQR */}
        <div className="flex justify-between items-center mt-14">
          <h1>CARD XPUB QR</h1>
          <div className="flex items-center gap-10 _qr_flex">
            <button onClick={Getxpub}>
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="black"
                  className="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </div>
            </button>
            <div
              style={{ width: "150px", height: "150px" }}
              className="bg-white"
            >
              <img
                src={`${
                  xpub_qr == "" || undefined
                    ? "qr.png"
                    : `data:image/png;base64,${xpub_qr}`
                }`}
                alt="qr.png"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* WORDQR */}
        <div className="flex justify-between items-center mt-14">
          <h1>WALLET 1 WORDS</h1>
          <div className="flex items-center gap-10 _qr_flex">
            <button onClick={GetWordqr}>
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="black"
                  className="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </div>
            </button>
            <div
              style={{ width: "150px", height: "150px" }}
              className="bg-white"
            >
              <img
                src={`${
                  wordqr == "" || undefined
                    ? "qr.png"
                    : `data:image/png;base64,${wordqr}`
                }`}
                alt="qr.png"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* SEEDQR */}
        <div className="flex justify-between items-center mt-8">
          <h1>CARD SEEDQR</h1>
          <div className="flex items-center gap-10 _qr_flex">
            <button onClick={GenerateSeed}>
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="black"
                  className="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </div>
            </button>
            <div
              style={{ width: "150px", height: "150px" }}
              className="bg-white"
            >
              <img
                src={`${
                  data == "" || undefined
                    ? "qr.png"
                    : `data:image/png;base64,${data.img_newallet}`
                }`}
                alt="qr.png"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* GENERATE WALLETQR */}
        <div className="flex justify-between items-center mt-8">
          <h1>CARD NAME QR</h1>
          <div className="flex items-center gap-10 _qr_flex">
            <button onClick={Generateqr}>
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="black"
                  className="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </div>
            </button>
            <div
              style={{ width: "150px", height: "150px" }}
              className="bg-white"
            >
              <img
                src={`${
                  wallet_qr == "" || undefined
                    ? "qr.png"
                    : `data:image/png;base64,${wallet_qr}`
                }`}
                alt="qr.png"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* FINGERPRINT DISPLAY CONTAINER */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex flex-col gap-4 items-center justify-center">
            <input
              value={`${
                !randomise_fingerprint || undefined
                  ? ""
                  : `${randomise_fingerprint}`
              }`}
              type="text"
              className="px-3 py-4 outline-none _card_iss"
              placeholder=""
            />
            <h1>FINGERPRINT P</h1>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <input
              value={`${
                !data.fingerprint2 || undefined ? "" : `${data.fingerprint2}`
              }`}
              type="text"
              className="px-3 py-4 outline-none _card_iss"
              placeholder=""
            />
            <h1>FINGERPRINT C</h1>
          </div>
        </div>

        {/* PATTERN SEED QR */}
        <div className="flex justify-between items-center mt-8">
          <h1>PATTERN SEED QR</h1>
          <div className="flex items-center gap-10 _qr_flex">
            <button onClick={GetRandomise}>
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="black"
                  className="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </div>
            </button>
            <div
              style={{ width: "150px", height: "150px" }}
              className="bg-white"
            >
              <img
                src={`${
                  msg == "" || undefined
                    ? "qr.png"
                    : `data:image/png;base64,${msg}`
                }`}
                alt="qr.png"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* RANDOMISATION */}
        {/* <div className=" mt-8">
          <div className="flex items-stretch justify-between gap-10 _qr_flex">
            <div className="flex flex-col items-center justify-center gap-8">
              <div
                style={{ width: "150px", height: "150px" }}
                className="bg-white"
              >
                <img src="" alt="qr.png" />
              </div>
              <h1>OP_RETURN PAYMENT</h1>
            </div>
            <button>
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="black"
                  className="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </div>
            </button>
            <div className="flex flex-col items-center justify-center gap-8">
              <div
                style={{ width: "150px", height: "150px" }}
                className="bg-white"
              >
                <img src="" alt="img.png" />
              </div>
              <h1>OP_RETURN TX</h1>
            </div>
          </div>
        </div> */}

        {/* IMAGE RANDOMISATION QR WORDS */}
        <div className="flex justify-between items-center mt-8">
          <h1>OP_RETURN MESSAGE</h1>
          <div className="flex items-center gap-10 _qr_flex">
            <button onClick={GetRandomisedQrWords}>
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="black"
                  className="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </div>
            </button>
            <div className="flex flex-col items-end justify-end gap-8">
              <div
                style={{ width: "150px", height: "150px" }}
                className="bg-white"
              >
                <img
                  src={`${
                    randomised_qr_words == "" || undefined
                      ? "qr.png"
                      : `data:image/png;base64,${randomised_qr_words}`
                  }`}
                  alt="qr.png"
                  className="h-full w-full"
                />
              </div>
            </div>
            {/* <div
              style={{ width: "150px", height: "150px" }}
              className="bg-white"
            >
              <img
                src={`${
                  randomised_qr_words == "" || undefined
                    ? "qr.png"
                    : `data:image/png;base64,${randomised_qr_words}`
                }`}
                alt="qr.png"
                className="h-full w-full"
              />
            </div> */}
          </div>
        </div>

        {/* PATTERN SEED QR */}
        <div className="flex justify-between items-center mt-8">
          <h1>CARD TEMPLATE URL</h1>
          <div className="flex items-center gap-10 _qr_flex">
            <button onClick={GetUrlQr}>
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="black"
                  className="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </div>
            </button>
            <div
              style={{ width: "150px", height: "150px" }}
              className="bg-white"
            >
              <img
                src={`${
                  url_qr == "" || undefined
                    ? "qr.png"
                    : `data:image/png;base64,${url_qr}`
                }`}
                alt="qr.png"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* RANDOMISATION */}
        {/* <div className="flex justify-between items-center mt-8">
          <h1>RANDOMISATION</h1>
          <div className="flex items-center gap-10 _qr_flex">
            <button onClick={GetRandomise}>
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="black"
                  className="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
              </div>
            </button>
            <input
              type="text"
              value={`${msg == "" || undefined ? "" : `${msg}`}`}
              className="px-3 py-2 outline-none _wallet_name"
              placeholder="3 / 11 / 12 / 2 / 1 / 10"
            />
          </div>
        </div> */}

        {/* RETURN MESSAGE */}
        {/* <div className="mt-16 flex flex-col gap-6 items-center justify-center">
          <input
            type="text"
            value={`${
              !data.fingerprint1 || cardissuer == "" || hidden_words == ""
                ? ""
                : data.fingerprint1 + "_" + cardissuer + "_" + hidden_words
            }`}
            className="w-full p-4"
            placeholder=" 39a103a7_MM_ decembermotheropenarchoxygeneternal
"
          />
          <h1>OP_RETURN MESSAGE</h1>
        </div> */}

        {/* RESTART BUTTON BOTTOM */}
        <div className="mt-20 flex flex-col gap-6 justify-center items-center">
          <button onClick={handleReload}>
            <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="black"
                className="bi bi-caret-up-fill"
                viewBox="0 0 16 16"
              >
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
              </svg>
            </div>
          </button>
          <h1>RESTART</h1>
        </div>
      </main>
    </div>
  );
}

export default Homepage;
