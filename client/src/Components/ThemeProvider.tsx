import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:bg-[rgb(16,23,42)] dark:text-gray-200">
        {children}</div>
    </div>
  );
}

export default ThemeProvider;
