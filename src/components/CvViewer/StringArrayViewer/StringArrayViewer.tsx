type HobbiesProps = {
  items?: string[];
};

export const StringArrayViewer = ({ items = [] }: HobbiesProps) => {
  return (
    <>
      {items.map((el) => (
        <h5 key={el}>{el}</h5>
      ))}
    </>
  );
};
