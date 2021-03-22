import {useContext} from "react";
import {TestContext} from "../../context/testContext";

const AboutPage = () => {
    const themeContext = useContext(TestContext);
    console.log("themeContext: ", themeContext);

    const handleChangeTheme = () => {
        themeContext.onChangeTheme(themeContext.theme === "light" ? "dark" : "light")
    }

    return (
        <>
            <h1>Page About</h1>
            <button onClick={handleChangeTheme}>Change Theme</button>
        </>
    );
}

export default AboutPage;