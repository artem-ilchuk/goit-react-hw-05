import s from "./Loader.module.css";
import { ProgressBar } from "react-loader-spinner";
import { MdOutlineWifiOff } from "react-icons/md";

const Loader = () => {
  return (
    <div className={s.container}>
      <ProgressBar
        height="100"
        width="400"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#FFFFFF"
        barColor="#00FFA1"
      />
      <div className={s.mes}>
        <MdOutlineWifiOff className={s.icon} />
        <p className={s.text}>Please wait loading...</p>
      </div>
    </div>
  );
};
export default Loader;
