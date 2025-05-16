interface Props {
  position: string;
}

export const Pointer = ({position}: Props) => {
    return (
      <div className={`w-4 h-4 bg-foreground rotate-45 relative ${position} z-0`} />
    );
  };