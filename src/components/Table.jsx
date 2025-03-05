const Table = ({ headers, data, onEdit, onDelete, onAdd }) => (
    <table className="table table-striped mt-3">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((todo) => (
          <tr key={todo.id}>
            <td>{todo.userId}</td>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.completed ? "True" : "False"}</td>
            <td>
              <button onClick={() => onEdit(todo.id)} className="btn btn-sm btn-primary me-2">
                Edit
              </button>
              <button onClick={() => onDelete(todo.id)} className="btn btn-sm btn-danger me-2">
                Delete
              </button>
              <button onClick={() => onAdd(todo)} className="btn btn-sm btn-success">
                Add
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );


  export default Table;