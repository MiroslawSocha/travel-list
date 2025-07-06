import { useState } from "react";

const PackingList = ({ items, setItems }) => {
  const [sortBy, setSortBy] = useState("input");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "description") {
      return a.description.localeCompare(b.description);
    } else if (sortBy === "packed") {
      return a.packed - b.packed;
    } else {
      return a.id - b.id;
    }
  });

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  const handleToogglePacked = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };
  const handleDeleteAll = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  };
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.packed}
              onChange={() => handleToogglePacked(item.id)}
            />
            <span className={item.packed ? "packed" : ""}>
              {item.quantity} {item.description}
            </span>
            <button onClick={() => handleDelete(item.id)}>&times;</button>
          </li>
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleDeleteAll} disabled={!items.length}>
          Clear List
        </button>
      </div>
    </div>
  );
};

export default PackingList;
