import './index.css';

const Notebook = ( { notebook } ) => {
  return (
    <div className="Notebook">
      <h3>{ notebook.name }</h3>
      <p>Id: { notebook._id }</p>
      <p>Date: { notebook.date }</p>
    </div>
  );
};

export default Notebook;
