import { createContext, useContext, useState } from "react";
import axios from "axios";

interface Props {
  children: React.ReactNode;
}
interface WalletContextType {
  loading: boolean;
  err: boolean;
  url_qr: string;
  wallet_qr: string;
  xpub_qr: string;
  words: string[];
  data: any; // Adjust type based on expected data
  msg: string;
  hidden_words: string;
  randomise_fingerprint: string;
  randomised_qr_words: string;
  result: string;
  wordqr: string;
  // randomised_qr_words_img: string;
  useFetchXpub: (url: string, password: string) => Promise<string>;
  useFetchNewallet: (url: string, password: string) => Promise<any>; // Adjust the type as needed
  useFetchRandomise: (url: string, password: string) => Promise<string>;
  useFetchGenerateWalletQr: (url: string, password: string) => Promise<string>;
  useFetchGenerateUrlQr: (url: string, password: string) => Promise<string>;
  useFetchWordQr: (url: string, password: string, words: string[]) => Promise<string>;
  useFetchGenerateRandQrWords: (
    url: string,
    password: string
  ) => Promise<string>;
  // Add other properties here as needed
}
// const WalletContext = createContext<WalletContextType | null>(null);
// Define the context
const walletContext = createContext<WalletContextType | any>(null);

// Context Provider Component
export const WalletProvider: React.FC<Props> = ({ children }) => {
  // Shared states for all requests
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string | boolean>(false);
  const [url_qr, setUrlQr] = useState<string>("");
  const [wallet_qr, setWalletQr] = useState<string>("");
  const [xpub_qr, setXpub_qr] = useState<string>("");
  const [words, setWords] = useState<string>("");
  const [data, setData] = useState<Record<string, any>>({});
  const [msg, setMsg] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [wordqr, setWordQr] = useState<string>("");
  const [randomised_qr_words, setRandomisedQrWords] = useState<string>("");
  // const [randomised_qr_words_img, setRandomisedQrWordsImg] = useState<string>("");
  const [hidden_words, setHiddenWords] = useState<string>("");
  const [randomise_fingerprint, setRandomiseFingerprint] = useState<string>("");

  const useFetchXpub = async (url: string, password: string) => {
    // const [xpub_qr, setXpub_qr] = useState("");
    setLoading(true);
    try {
      const res: any = await axios.get(url, {
        headers: {
          Authorization: `${password}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      setXpub_qr(res.data.img_xpub);
      setWords(res.data.words);
    } catch (error) {
      setErr(true);
    }
    setLoading(false);
    return xpub_qr;
  };

  const useFetchNewallet = async (
    url: string,
    password: string,
    words: string[]
  ) => {
    // const [data, setData] = useState({});
    setLoading(true);
    try {
      const datax: any = {
        words: words,
      };
      const res = await axios.post(url, datax, {
        headers: {
          Authorization: `${password}`,
          "Content-Type": "application/json",
        },
      });
      setData(res.data);
    } catch (error) {
      setErr(true);
    }
    setLoading(false);
    return data;
  };

  const useFetchWordqr = async (
    url: string,
    password: string,
    words: string[]
  ) => {
    // const [data, setData] = useState({});
    setLoading(true);
    try {
      const datax: any = {
        words: words,
      };
      const res = await axios.post(url, datax, {
        headers: {
          Authorization: `${password}`,
          "Content-Type": "application/json",
        },
      });
      setWordQr(res.data.img_base64);
    } catch (error) {
      setErr(true);
    }
    setLoading(false);
    return data;
  };

  const useFetchRandomise = async (
    url: string,
    password: string,
    words: string[],
  ) => {
    // const [msg, setMsg] = useState("");
    setLoading(true);
    try {
      const data: any = {
        words: words,
      };
      const res = await axios.post(url, data, {
        headers: {
          Authorization: `${password}`,
        },
      });
      setMsg(res.data.img_randomised);
      setHiddenWords(res.data.hidden_words);
      setRandomiseFingerprint(res.data.fingerprint);
      setResult(res.data.hidden_words);
      // setRandomisedQrWordsImg(res.data.img_qr_base64);
    } catch (error) {
      setErr(true);
    }
    setLoading(false);
  };

  const useFetchGenerateWalletQr = async (
    url: string,
    password: string,
    wallet_name: string
  ) => {
    // const [wallet_qr, setWalletQr] = useState("");
    setLoading(true);
    try {
      const data: any = {
        wallet_name: wallet_name,
      };
      const res = await axios.post(url, data, {
        headers: {
          Authorization: `${password}`,
          "Content-Type": "application/json",
        },
      });
      setWalletQr(res.data.img_walletnme);
    } catch (error) {
      setErr(true);
    }
    setLoading(false);
    // return wallet_qr;
  };

  const useFetchGenerateUrlQr = async (url: string, password: string) => {
    setLoading(true);
    try {
      const data: any = {
        url: "https://seedcard.github.io/template/",
      };
      const res = await axios.post(url, data, {
        headers: {
          Authorization: `${password}`,
          "Content-Type": "application/json",
        },
      });
      setUrlQr(res.data.url_qr);
    } catch (error) {
      setErr(true);
    }
  }

  const useFetchGenerateRandQrWords = async (url: string, password: string, fingerprint1: string, cardissuer: string, result: string) => {
    setLoading(true);
    try {
      const data: any = {
        fingerprint1: fingerprint1,
        cardissuer: cardissuer,
        result: result,
      };
      const res = await axios.post(url, data, {
        headers: {
          Authorization: `${password}`,
          "Content-Type": "application/json",
        },
      });
      setRandomisedQrWords(res.data.img_qr_base64);
    } catch (error) {
      setErr(true);
    }
  }

  return (
    <walletContext.Provider
      value={{
        loading,
        err,
        url_qr,
        wallet_qr,
        xpub_qr,
        data,
        msg,
        words,
        hidden_words,
        randomise_fingerprint,
        randomised_qr_words,
        result,
        wordqr,
        // randomised_qr_words_img,
        useFetchXpub,
        useFetchNewallet,
        useFetchRandomise,
        useFetchGenerateWalletQr,
        useFetchGenerateUrlQr,
        useFetchGenerateRandQrWords,
        useFetchWordqr,
      }}
    >
      {children}
    </walletContext.Provider>
  );
};

// Custom hook to use the context
export const useWalletContext = () => useContext(walletContext);
// export const useWalletContext = () => {
//   const context = useContext(WalletContext);
//   if (!context) {
//     throw new Error("useWalletContext must be used within a WalletProvider");
//   }
//   return context;
// };
