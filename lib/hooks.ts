import { getcookie } from "./actions";
import { handleverify } from "../redux/features/authActions";
import { useAppDispatch } from "../redux/hooks";
import { formatDistanceToNow } from "date-fns";


export function useVerify () {

const dispatch = useAppDispatch();
  const verify = async () => {
    try {
      const token = await getcookie("access");
      if (token !== null) {
        dispatch(handleverify(token));
      }
    } catch (err) {
      console.error(err);
    }
  };

return verify


}



export function formatDate(date: string): string {
    const dateFromString = new Date(date);

    if (isNaN(dateFromString.getTime())) {
        return "Invalid date";
    }

    const time = formatDistanceToNow(dateFromString, { addSuffix: true });
    return time;
}

