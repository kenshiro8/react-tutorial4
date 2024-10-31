import React, { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [selectCategory, setSelectCategory] = useState("All");
  const [filteredData, setfilteredData] = useState(data);
  const [searchTerm, setSearchTem] = useState("");

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setfilteredData(data);
      });
  }, []);

  const handleCatedoryChange = (event) => {
    setSelectCategory(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTem(event.target.value);
  }

  const handleFilterClick = () => {
    const newFilteredData = data.filter(item => {
      const matchesCategory = selectCategory === "All" || item.type === selectCategory.toLowerCase();
      const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
    setfilteredData(newFilteredData);
  };

  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>
      <div>
        <aside>
          <form>
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select id="category" onChange={handleCatedoryChange}>
                <option>All</option>
                <option>Vegetables</option>
                <option>Meat</option>
                <option>Soup</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input type="text" id="searchTerm" placeholder="e.g. beans" value={searchTerm} onChange={handleSearchTermChange} />
            </div>
            <div>
              <button type="button" onClick={handleFilterClick}>Filter results</button>
            </div>
          </form>
        </aside>
        <main>
          {filteredData.map((item) => (
            <section className={item.type.toLowerCase()}>
              <h2>{item.name}</h2>
              <p>${item.price.toFixed(2)}</p>
              <img src={`/images/${item.image}`} alt={item.name} />
            </section>
          ))}
        </main>
      </div>
      <footer>
        <p>All icons found at the Noun Project:</p>
        <ul>
          <li>
            Bean can icon by{" "}
            <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            Vegetable icon by{" "}
            <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            Soup icon by{" "}
            <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            Meat Chunk icon by{" "}
            <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
          </li>
        </ul>
      </footer>
    </>
  );
}