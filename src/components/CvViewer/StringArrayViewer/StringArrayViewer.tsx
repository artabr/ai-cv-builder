type StringArrayViewerProps = {
  items?: string[];
};

export const StringArrayViewer = ({ items = [] }: StringArrayViewerProps) => {
  return (
    <>
      {items.map((el) => (
        <h5 key={el}>{el}</h5>
      ))}
    </>
  );
};
