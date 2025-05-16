type SetNum = React.Dispatch<React.SetStateAction<number | null>>;
type SetString = React.Dispatch<React.SetStateAction<string | null>>;
type SetTurn = React.Dispatch<React.SetStateAction<0 | 1>>;
type Move = { name: string; power: number; accuracy: number };

export const PlayerToDemo = (
  setStaticHealth: SetNum,
  setAlertMessage: SetString,
  setTurn: SetTurn,
  move: Move
) => {
  setStaticHealth((prev) => prev! - move.power);
  setAlertMessage(`You attacked with ${move.name} for ${move.power} damage.`);
  setTimeout(() => setAlertMessage(null), 2000);
  setTurn(1);
};

export const DemoToPlayer = (
  setHealth: SetNum,
  setAlertMessage: SetString,
  setTurn: SetTurn,
  move: Move
) => {
  setHealth((prev) => prev! - move.power);
  setAlertMessage(`Enemy attacked with ${move.name} for ${move.power} damage.`);
  setTimeout(() => setAlertMessage(null), 2000);
  setTurn(0);
};

export const InvalidTurn = (setAlertMessage: SetString) => {
  setAlertMessage("Not your turn, please wait for the other player.");
  setTimeout(() => setAlertMessage(null), 2000);
};
