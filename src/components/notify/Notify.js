import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import Alert from "./Alert";
import Loading from "./Loading";
import NotifyAdmin from "./NotifyAdmin";

function Notify() {
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.notify);

  const [showAlert, setShowAlert] = useState(false);
  const [showAdminNotify, setShowAdminNotify] = useState(false);

  useEffect(() => {
    if (notify.err || notify.success) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: {} });
      }, 1000);
      return () => clearTimeout(timer);
    }
    if(notify.notifyAdmin){
      setShowAdminNotify(true)
    }
  }, [notify.err, notify.success, notify.notifyAdmin, dispatch]);

  return (
    <div>
      {notify.loading && <Loading />}
      {showAlert && (
        <Alert
          msg={{
            title: notify.err ? "Error" : "Success",
            body: notify.err || notify.success,
          }}
          handleShow={() => {
            setShowAlert(false);
            dispatch({ type: GLOBALTYPES.NOTIFY, payload: {} });
          }}
          bgColor={notify.err ? "bg-danger" : "bg-success"}
        />
      )}
      {showAdminNotify && (
        <NotifyAdmin msg={notify.notifyAdmin} setShowAdminNotify={setShowAdminNotify}/>
      )}
    </div>
  );
}

export default Notify;
