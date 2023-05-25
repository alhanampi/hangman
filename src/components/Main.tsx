/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import Box from "./Box";
import "../index.css";

const Main: FC = () => {
  //I'll have a word (synchrony) => make it an array
  //I can map that array to create each box
  //I can send the letter to each box
  //I can check on the tryChar button if the input letter === secret letter in the box => case insensitive
  //regexp to avoid not letter characters
  //if true, show letter, if false, life - 1
  //I can have a remaining letters => if it hits 0 when life !== 0 => win
  //if life === 0 => lose

  const secretWord: string = "synchrony";
  const splitWord: string[] = secretWord.split("");
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [chosenChar, setChosenChar] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  //if correct === true => should show char
  //if correct === false => life -1
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

    setChosenChar(""); // Clear the input field after submitting
    setIsClicked(true); //so that I don't see the char before submitting!
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
    <div>
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
            <button type="submit">Try out letter!</button>
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
