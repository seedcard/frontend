import { seed } from "../../assets";
import "./style.scss";

function Navbar() {
  return (
    <div>
      <div className="_navbar_container">
        <div className="flex justify-between items-center py-6">
          <img src={seed} alt="logo.png" className="h-14 w-auto" />
          <div className="flex items-center gap-6">
            <h1 className="text-white">WALLET GENERATOR v0.2</h1>
            <button>
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="black"
                  className="bi bi-info-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Navbar;
