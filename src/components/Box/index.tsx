import { FC, useEffect, useState } from "react";
import "./styles.css";

interface IBox {
  secret: string;
  index: number;
  chosenChar: string | null;
  usedLetters: string[];
  isClicked: boolean;
}

const Box: FC<IBox> = ({
  secret,
  index,
  chosenChar,
  usedLetters,
  isClicked,
}) => {
  const isLetterUsed = usedLetters.includes(secret.toLowerCase());
  const [shouldShowLetter, setShouldShowLetter] = useState<boolean>(false);

  useEffect(() => {
    if (isClicked) {
      const updatedLetter =
        isLetterUsed ||
        (chosenChar !== null &&
          chosenChar.toLowerCase() === secret.toLowerCase());
      setShouldShowLetter(!!updatedLetter);
    }
  }, [isLetterUsed, isClicked, chosenChar, secret]); //to ensure it doesn't show the character before submitting!

  const letterToShow = shouldShowLetter ? secret : "";

  return (
    <div key={index} className="box">
      {letterToShow}
    </div>
  );
};

export default Box;
