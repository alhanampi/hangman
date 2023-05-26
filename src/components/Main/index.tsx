/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import Box from "../Box";
import "./styles.css";

const Main: FC = () => {
  const secretWord: string = "synchrony";
  const splitWord: string[] = secretWord.split("");
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [chosenChar, setChosenChar] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [life, setLife] = useState<number>(5);
  const [won, setWon] = useState<boolean | null>(null);

  useEffect(() => {
    const allLettersPresent = splitWord.filter(
      (letter) => usedLetters.includes(letter)
    );

    if (allLettersPresent.length === splitWord.length) {
      setWon(true);
    }
  }, [usedLetters]);

  const sendChar = (e: FormEvent) => {
    e.preventDefault();

    const inputChar = chosenChar && chosenChar.toLowerCase();

    if (inputChar && /^[a-zA-Z]+$/.test(inputChar)) {
      const isLetterArr = splitWord.includes(inputChar);
      setLife((prevLife) => prevLife - (isLetterArr ? 0 : 1));

      if (life === 1 && !isLetterArr) {
        setWon(false);
      }

      setUsedLetters((prevUsedLetters) => [
        ...prevUsedLetters,
        inputChar.toLowerCase(),
      ]);
    }

    setChosenChar("");
    setIsClicked(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChosenChar(e.target.value);
    setIsClicked(false);
  };

  const reset = () => {
    setChosenChar("");
    setWon(null);
    setLife(5);
    setUsedLetters([]);
  };

  return (
    <div className="container">
      <h1>Hangman game</h1>
      <form onSubmit={sendChar}>
        {won === null ? (
          <div>
            <div className="boxContainer">
              {splitWord.map((secret, index) => (
                <Box
                  key={index}
                  secret={secret}
                  index={index}
                  chosenChar={chosenChar || ""}
                  usedLetters={usedLetters}
                  isClicked={isClicked}
                />
              ))}
            </div>
            <input
              value={chosenChar || ""}
              onChange={handleChange}
              maxLength={1}
              type="text"
            />
            <button className="try" type="submit">Try out this letter!</button>
            <p>Remaining Lives: {life}</p>
          </div>
        ) : won === true ? (
          <>
            <p>You won!</p>
            <button onClick={reset}>Restart</button>
          </>
        ) : (
          <>
            <p>You lost!</p>
            <button onClick={reset}>Restart</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Main;
